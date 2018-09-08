# frozen_string_literal: true

module Types

  class CredentialsType < ::GraphQL::Schema::InputObject

    graphql_name 'Credentials'

    argument :email, ::String, required: true
    argument :password, ::String, required: true

  end

end
