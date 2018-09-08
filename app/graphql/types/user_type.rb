# frozen_string_literal: true

module Types

  class UserType < ::GraphQL::Schema::Object

    graphql_name 'User'

    implements ::GraphQL::Relay::Node.interface

    global_id_field :id

    field :name, ::String, null: false
    field :email, ::String, null: false
    field :role, ::Integer, null: false
    field :profile, ProfileType, null: false
    field :updatedAt, ::GraphQL::Types::ISO8601DateTime, null: false

  end

end
