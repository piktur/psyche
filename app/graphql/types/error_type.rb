# frozen_string_literal: true

module Types

  class ErrorType < ::GraphQL::Schema::Object

    graphql_name 'Error'

    field :message, String, null: false
    field :path, String, null: true

  end

end
