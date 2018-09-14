# frozen_string_literal: true

module Mutations

  class LogOut < BaseMutation

    graphql_name 'LogOut'

    field :viewer, ::Types::ViewerType, null: false

    def resolve(*)
      { viewer: ::Viewer.new }
    end

  end

end
