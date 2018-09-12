# frozen_string_literal: true

module Mutations

  class SignUp < ::GraphQL::Schema::RelayClassicMutation

    graphql_name 'SignUp'

    argument :email, ::String, required: true
    argument :password, ::String, required: true

    field :viewer, ::Types::ViewerType, null: false
    field :user, ::Types::UserType, null: false
    field :errors, [::Types::ErrorType, null: true], null: true

    def resolve(credentials)
      ::Psyche['sign_up'].call(credentials)
    end

  end

end
