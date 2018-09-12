# frozen_string_literal: true

module Types

  class UserType < BaseObject

    graphql_name 'User'

    implements ::GraphQL::Relay::Node.interface

    global_id_field :id

    field :email, ::String, null: false
    field :role, ::Integer, null: false
    field :profile, ProfileType, null: true
    field :updatedAt, ::GraphQL::Types::ISO8601DateTime, null: false

  end

end
