# frozen_string_literal: true

module Mutations

  class BaseMutation < ::GraphQL::Schema::RelayClassicMutation

    field :errors, [::Types::ErrorType, null: true], null: true

  end

end
