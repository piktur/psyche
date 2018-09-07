# frozen_string_literal: true

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :authenticate, function: Resolvers::Authenticate.new
end
