# frozen_string_literal: true

module Types

  class TokenType < ::GraphQL::Schema::Object

    graphql_name 'Token'

    field :token, ::String, null: false
    field :type, ::String, null: false
    field :expiresIn, ::Integer, null: false
    field :expiresAt, ::Integer, null: false

  end

end
