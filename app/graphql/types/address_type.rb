# frozen_string_literal: true

module Types

  class AddressType < BaseObject

    graphql_name 'Address'

    implements ::GraphQL::Relay::Node.interface

    global_id_field :id

    field :street, [::String], null: false
    field :city, ::String, null: false
    field :state, ::String, null: false
    field :country, ::String, null: false
    field :postcode, ::String, null: false

  end

end
