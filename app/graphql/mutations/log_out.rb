# frozen_string_literal: true

module Mutations

  class LogOut < ::GraphQL::Schema::RelayClassicMutation

    graphql_name 'LogOut'

    field :viewer, ::Types::ViewerType, null: false
    field :errors, [::Types::ErrorType, null: true], null: true

    def resolve(*)
      { viewer: ::Types::ViewerType::NULL }
    end

  end

end
