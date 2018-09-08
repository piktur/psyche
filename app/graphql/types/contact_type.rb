# frozen_string_literal: true

module Types

  class ContactType < ::GraphQL::Schema::Object

    graphql_name 'Contact'

    implements ::GraphQL::Relay::Node.interface

    global_id_field :id

    field :phone, ::String, null: false

  end

end
