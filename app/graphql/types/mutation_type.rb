# frozen_string_literal: true

module Types

  class MutationType < ::GraphQL::Schema::Object

    graphql_name 'Mutation'

    field :authenticate, function: ::Resolvers::Authenticate.new

  end

end
