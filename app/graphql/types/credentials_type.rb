# frozen_string_literal: true

Types::CredentialsType = GraphQL::InputObjectType.define do
  name 'Credentials'

  argument :email, !types.String
  argument :password, !types.String
end
