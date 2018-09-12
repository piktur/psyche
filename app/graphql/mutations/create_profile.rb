# frozen_string_literal: true

module Mutations

  class CreateProfile < ::GraphQL::Schema::RelayClassicMutation

    graphql_name 'CreateProfile'

    argument :firstName, ::String, required: true
    argument :lastName, ::String, required: true
    argument :birthday, ::GraphQL::Types::ISO8601DateTime, required: false

    field :profile, ::Types::ProfileType, null: false
    field :errors, [::Types::ErrorType, null: true], null: true

    def resolve(input)
      ::Psyche['profiles.create'].call(
        user: context[:viewer][:user],
        **input.except(:client_mutation_id, :clientMutationId)
      )
    end

  end

end
