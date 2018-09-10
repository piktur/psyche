# frozen_string_literal: true

module Types

  class QueryType < ::GraphQL::Schema::Object

    graphql_name 'Query'

    field :node, field: ::GraphQL::Relay::Node.field

    field :nodes, field: ::GraphQL::Relay::Node.plural_field

    field :viewer, UserType, null: true, resolve: ->(_, _, ctx) { ctx[:viewer] }

    field :users, [UserType], null: false, resolve: ->(*) { ::User.all }

    field :user, UserType, null: false,
          resolve: ->(_, args, _) { ::Psyche['users.find'].call(args[:id]) } do
      argument :id, 'ID', required: true
    end

  end

end
