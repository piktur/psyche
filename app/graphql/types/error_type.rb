# frozen_string_literal: true

module Types

  # @see https://github.com/rmosolgo/graphql-ruby/blob/master/guides/mutations/mutation_errors.md
  class ErrorType < BaseObject

    graphql_name 'Error'

    field :message, String, null: false
    field :path, String, null: true

  end

end
