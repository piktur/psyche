# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'node', type: :graph do
  let(:object) { User.first }
  let(:gid) { id_from_object(object) }
  let(:variables) { {} }
  let(:type) { 'User' }
  let(:query) do
    %{
      query {
        node(id: "#{gid}") {
          id
          ... on #{type} {
            role
          }
        }
      }
    }
  end

  let(:expected) do
    {
      "data" => {
        "node" => {
          "id" => gid,
          "role" => object.role
        }
      }
    }
  end

  it do
    result = exec_query

    expect(result == expected).to be(true)
  end
end
