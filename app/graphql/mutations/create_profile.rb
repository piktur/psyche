# frozen_string_literal: true

module Mutations

  class CreateProfile < ::GraphQL::Schema::RelayClassicMutation

    graphql_name 'CreateProfile'

    argument :firstName, ::String, required: true
    argument :lastName, ::String, required: true
    argument :birthday, ::GraphQL::Types::ISO8601DateTime, required: false

    field :profile, ::Types::ProfileType, null: false
    field :user, ::Types::UserType, null: false
    field :errors, [::Types::ErrorType, null: true], null: true

    def resolve(input)
      ::Psyche['profile.create'].call(user: context.viewer, **input)
    end

  end

end
