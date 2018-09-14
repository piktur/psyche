# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Authenticate, type: :mutation do
  let(:operation_name) { 'AuthenticateMutation' }
  let(:context) do
    { viewer: { id: nil, user: nil, role: nil, token: nil, is_authenticated: nil } }
  end
  let(:query) do
    %{
      mutation AuthenticateMutation($input: AuthenticateInput!) {
        authenticate(input: $input) {
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

  context 'when user not found' do
    let(:variables) do
      { input: { email: 'unknown@example.com', password: 'password', clientMutationId: '' } }
    end
    let(:expected) do
      [
        {
          "path" => ['authenticate', 'user'].to_s,
          "message" => 'user not found'
        }
      ]
    end

    it 'should include not found error' do
      result = exec_query
      errors = result.dig('data', 'authenticate', 'errors')

      expect(errors == expected).to be(true)
    end
  end

  context 'when password incorret' do
    let(:variables) do
      { input: { email: 'admin@example.com', password: '', clientMutationId: '' } }
    end
    let(:expected) do
      [
        {
          "path" => ['attributes', 'password'].to_s,
          "message" => 'incorrect password'
        }
      ]
    end

    it 'should include authentication error' do
      result = exec_query
      errors = result.dig('data', 'authenticate', 'errors')

      expect(errors == expected).to be(true)
    end
  end

  context 'when password correct' do
    let(:variables) do
      { input: { email: 'admin@example.com', password: 'password', clientMutationId: '' } }
    end

    it 'should not include authentication error' do
      result = exec_query
      errors = result.dig('data', 'authenticate', 'errors')

      expect(errors).to be_blank
    end
  end

  context 'when token can not be generated' do
    let(:variables) do
      { input: { email: 'admin@example.com', password: 'password', clientMutationId: '' } }
    end
    let(:expected) do
      [
        {
          "path" => ['attributes', 'token'].to_s,
          "message" => 'could not authenticate'
        }
      ]
    end

    pending 'should include authentication error' do
      result = exec_query
      errors = result.dig('data', 'authenticate', 'errors')

      expect(errors == expected).to be(true)
    end
  end
end
