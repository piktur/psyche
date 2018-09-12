# frozen_string_literal: true

module Mutations

  class Authenticate < ::GraphQL::Schema::RelayClassicMutation

    graphql_name 'Authenticate'

    argument :email, ::String, required: true
    argument :password, ::String, required: true

    field :viewer, ::Types::ViewerType, null: false
    field :user, ::Types::UserType, null: true
    field :errors, [::Types::ErrorType, null: true], null: true

    def resolve(credentials)
      ::Psyche['authenticate'].call(credentials)
    end

  end

end
