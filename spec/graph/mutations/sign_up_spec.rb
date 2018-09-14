# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::SignUp, type: :mutation do
  let(:operation_name) { 'SignUpMutation' }
  let(:context) do
    { viewer: { id: nil, user: nil, role: nil, token: nil, is_authenticated: nil } }
  end
  let(:query) do
    %{
      mutation SignUpMutation($input: SignUpInput!) {
        signUp(input: $input) {
          viewer {
            token
            role
          }
          user {
            role
          }
          errors {
            path
            message
          }
        }
      }
    }
  end

  context 'when invalid' do
    let(:variables) do
      { input: { email: '', password: '', clientMutationId: '' } }
    end
    let(:expected) do
      [
        {
          "path" => ['attributes', 'password'].to_s,
          "message" => 'can\'t be blank'
        }, {
          "path" => ['attributes', 'email'].to_s,
          "message" => 'can\'t be blank'
        }
      ]
    end

    it 'should include validation errors' do
      result = exec_query
      errors = result.dig('data', 'signUp', 'errors')

      expect(errors == expected).to be(true)
    end
  end

  context 'when duplicate email' do
    let(:variables) do
      { input: { email: 'admin@example.com', password: 'password', clientMutationId: '' } }
    end
    let(:expected) do
      [
        {
          "path" => ['attributes', 'email'].to_s,
          "message" => 'email already exists'
        }
      ]
    end

    it 'should include unicity error' do
      result = exec_query
      errors = result.dig('data', 'signUp', 'errors')

      expect(errors == expected).to be(true)
    end
  end

  context 'when could not authenticate' do
    let(:variables) do
      { input: { email: 'admin@example.com', password: 'password', clientMutationId: '' } }
    end
    let(:expected) do
      [
        {
          "path" => ['attributes', 'email'].to_s,
          "message" => 'could not authenticate'
        }
      ]
    end

    pending 'should include authentication error' do
      result = exec_query
      errors = result.dig('data', 'signUp', 'errors')

      expect(errors == expected).to be(true)
    end
  end
end
