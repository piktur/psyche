# frozen_string_literal: true

module Types

  class ViewerType < BaseObject

    graphql_name 'Viewer'

    implements ::GraphQL::Relay::Node.interface

    global_id_field :id

    field :token, ::String, null: true
    field :role, ::Integer, null: true
    field :user, UserType, null: true
    field :is_authenticated, ::GraphQL::Types::Boolean, null: false

  end

end
