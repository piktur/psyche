# frozen_string_literal: true

module Types

  class MutationType < BaseObject

    graphql_name 'Mutation'

    field :authenticate, mutation: ::Mutations::Authenticate
    field :signUp, mutation: ::Mutations::SignUp
    field :logOut, mutation: ::Mutations::LogOut
    field :createProfile, mutation: ::Mutations::CreateProfile
    field :setup, mutation: ::Mutations::Setup

  end

end
