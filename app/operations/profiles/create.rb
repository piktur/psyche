# frozen_string_literal: true

module Profiles

  class Create

    def call(input)
      profile = ::Profile.new(input)
      profile.save!
      { profile: profile }
    rescue ::StandardError => err
      case err
      when ::ActiveRecord::RecordInvalid
        errors = profile.errors.map do |attribute, message|
          { path: ['attributes', ::Inflector.camelize(attribute, false)], message: message }
        end
      else
        raise ::GraphQL::ExecutionError, err.message
      end

      { profile: profile, errors: errors }
    end

  end

end
