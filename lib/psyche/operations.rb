# frozen_string_literal: true

module Psyche

  class Operations

    include ::Dry::Container::Mixin

    def self.new(*)
      super.tap do |container|
        container.register('authenticate', memoize: true) { ::Authenticate.new }
        container.register('sign_up', memoize: true) { ::SignUp.new }
        container.register('users.find', memoize: true) { ::User.method(:find) }
        container.register('profiles.create', memoize: true) { ::Profiles::Create.new }
      end
    end

    # @return [void]
    def finalize!
      freeze if ::Rails.env.production?
    end

  end

end
