# frozen_string_literal: true

Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :allUsers, types[Types::UserType] do
    resolve ->(*) { User.all }
  end
end
