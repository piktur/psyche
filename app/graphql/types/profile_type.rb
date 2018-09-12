# frozen_string_literal: true

module Types

  class ProfileType < BaseObject

    graphql_name 'Profile'

    implements ::GraphQL::Relay::Node.interface

    global_id_field :id

    field :firstName, ::String, null: false
    field :lastName, ::String, null: false
    field :birthday, ::GraphQL::Types::ISO8601DateTime, null: true
    field :user, UserType, null: false
    field :address, AddressType, null: false
    field :contact, ContactType, null: false
    field :updatedAt, ::GraphQL::Types::ISO8601DateTime, null: false

  end

end
