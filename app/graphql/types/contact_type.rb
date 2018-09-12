# frozen_string_literal: true

module Types

  class ContactType < BaseObject

    graphql_name 'Contact'

    implements ::GraphQL::Relay::Node.interface

    global_id_field :id

    field :phone, ::String, null: false

  end

end
