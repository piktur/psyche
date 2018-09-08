# frozen_string_literal: true

module Types

  class TokenType < ::GraphQL::Schema::Object

    graphql_name 'Token'

    field :token, ::String, null: false
    field :type, ::String, null: false
    field :expires_in, ::Integer, null: false
    field :expires_at, ::Integer, null: false

  end

end
