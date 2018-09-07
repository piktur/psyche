# frozen_string_literal: true

require 'jwt'

module Psyche

  module Security

    module Authentication

      module Strategies

        # Implements [JSON Web Token (JWT) RFC 7519](https://tools.ietf.org/html/rfc7519)
        #
        # @example
        #   host   = Rails.application.default_url_options[:host]
        #   issuer = Security::JWT::Issuer.new(issuer: host)
        #   user   = User.first || FactoryBot.create(:user, password: 'password')
        #   token  = issuer.call(claims: user.to_jwt_claims).token
        #
        # @see User#find_by_credentials
        # @see User::InstanceMethods#find_by_jwt_claims
        # @see https://github.com/jwt/ruby-jwt ruby-jwt
        module JWT

          extend ::ActiveSupport::Autoload

          autoload :Config
          autoload :Issuer
          autoload :Token

        end

      end

    end

  end

end
