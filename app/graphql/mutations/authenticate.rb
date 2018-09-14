# frozen_string_literal: true

module Mutations

  class Authenticate < BaseMutation

    graphql_name 'Authenticate'

    argument :email, ::String, required: true
    argument :password, ::String, required: true

    field :viewer, ::Types::ViewerType, null: false
    field :user, ::Types::UserType, null: true

    def resolve(credentials) # rubocop:disable AbcSize, MethodLength
      ::Psyche['authenticate'].call(credentials) do |m|
        m.success do |(user, token)|
          { viewer: ::Viewer.new(user, token.token), user: user }
        end

        viewer = { viewer: ::Viewer.new }

        m.failure(:find) do |err|
          errors = Errors.new(Error.new('user', 'user not found', node: 'authenticate'))

          { **viewer, **errors }
        end

        m.failure(:authenticate) do |err|
          errors = case err
          when ::AuthenticationError
            Errors.new(Error.new('password', 'incorrect password'))
          when ::JWT::EncodeError
            Errors.new(Error.new('token', 'could not authenticate'))
          end

          { **viewer, **errors }
        end

        m.failure do |err|
          raise ::GraphQL::ExecutionError, err.message, ast_node: context.ast_node
        end
      end
    end

  end

end
