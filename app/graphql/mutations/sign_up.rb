# frozen_string_literal: true

module Mutations

  class SignUp < BaseMutation

    graphql_name 'SignUp'

    argument :email, ::String, required: true
    argument :password, ::String, required: true

    field :viewer, ::Types::ViewerType, null: false
    field :user, ::Types::UserType, null: true

    def resolve(credentials) # rubocop:disable AbcSize, MethodLength
      ::Psyche['sign_up'].call(credentials) do |m|
        m.success do |(user, token)|
          { viewer: ::Viewer.new(user, token.token), user: user }
        end

        viewer = { viewer: ::Viewer.new }

        m.failure(:validate) do |err|
          errors = Errors.new(*err.flat_map { |(k, v)| v.map { |e| Error.new(k, e) } }).as_json

          { **viewer, **errors }
        end

        m.failure(:save) do |err|
          errors = Errors.new(Error.new('email', 'email already exists')).as_json

          { **viewer, **errors }
        end

        m.failure(:authenticate) do |err|
          errors = Errors.new(Error.new('token', 'could not authenticate')).as_json

          { **viewer, **errors }
        end

        m.failure do |err|
          raise ::GraphQL::ExecutionError, err.message, ast_node: context.ast_node
        end
      end
    end

  end

end
