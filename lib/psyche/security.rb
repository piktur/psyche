# frozen_string_literal: true

module Psyche

  module Security

    extend ::ActiveSupport::Autoload

    autoload :Authentication
    autoload :Authorization
    autoload :Config
    autoload :Operations

    # SHOULD be raised when {Entity} not found/authorized
    #
    # @example
    #   if defined?(ActionController)
    #     class NotAuthorizedError < ::ActionController::ActionControllerError; end
    #   else
    #     class NotAuthorizedError < ::StandardError; end
    #   end
    NotAuthorizedError = ::Class.new(::StandardError)

    class << self

      # @return [Piktur::Security::Config]
      def config; Config.config; end

      # @return [Piktur::Support::Enum]
      def roles; ::Psyche.container['enum.authorization.roles']; end

      # @return [Class]
      def not_found_exception_class
        return ::Piktur::NotAuthorizedError unless
          (klass = ::Inflector.constantize(Config.not_found_exception_class_name))
        klass
      end

      # @return [void]
      def install # rubocop:disable MethodLength, AbcSize
        load ::File.expand_path('./security/authorization/roles.rb', __dir__)

        # Alias deeply nested constants
        ::Object.safe_const_set(:Policies, ::Module.new)
        ::Policies.safe_const_reset :Base, Authorization::Policy
        ::Psyche.safe_const_set :NotAuthorizedError, NotAuthorizedError
        safe_const_set :JWT, Authentication::Strategies::JWT

        ::Psyche.container.register('token_issuer', memoize: true) do
          JWT::Issuer.new(issuer: ::Rails.application.default_url_options[:host])
        end

        ::Psyche.container.register('authenticate', memoize: false) do

        end

        ::Psyche.container.register('authorize', memoize: false) do

        end
      end

    end

  end

end
