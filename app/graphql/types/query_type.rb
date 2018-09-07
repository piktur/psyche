# frozen_string_literal: true

module Types

  class QueryType < ::GraphQL::Schema::Object

    graphql_name 'Query'

    field :node, field: ::GraphQL::Relay::Node.field
    field :nodes, field: ::GraphQL::Relay::Node.plural_field

    field :allUsers, [UserType], null: true, resolve: ->(*) { User.all }

  end

end
