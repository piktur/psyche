# frozen_string_literal: true

module Types

  class ErrorType < BaseObject

    graphql_name 'Error'

    field :message, String, null: false
    field :path, String, null: true

  end

end
