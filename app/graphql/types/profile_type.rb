# frozen_string_literal: true

module Types

  class ProfileType < ::GraphQL::Schema::Object

    graphql_name 'Profile'

    implements ::GraphQL::Relay::Node.interface

    global_id_field :id

    field :firstName, String, required: true
    field :lastName, String, required: true
    field :birthday, DateTime
    field :user, UserType

  end

end
