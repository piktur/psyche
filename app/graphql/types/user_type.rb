# frozen_string_literal: true

module Types

  class UserType < ::GraphQL::Schema::Object

    graphql_name 'User'

    implements ::GraphQL::Relay::Node.interface

    global_id_field :id

    field :name, String, null: false
    field :email, String, null: false

  end

end
