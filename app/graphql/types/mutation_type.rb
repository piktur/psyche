# frozen_string_literal: true

module Types

  class MutationType < ::GraphQL::Schema::Object

    graphql_name 'Mutation'

    field :authenticate, mutation: ::Mutations::Authenticate
    field :signUp, mutation: ::Mutations::SignUp
    field :createProfile, mutation: ::Mutations::CreateProfile
    field :setup, mutation: ::Mutations::Setup

  end

end
