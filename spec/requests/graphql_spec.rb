require 'rails_helper'

RSpec.describe "POST /graphql", type: :request do
  let(:admin) { User.find_by(role: 3) }

  describe "authenticate" do
    it "responds with token" do
      query = %{
        mutation {
          authenticate(credentials: { email: "#{admin.email}", password: "password" }) {
            token
          }
        }
      }.squish!

      headers = {
        'Content-Type' => 'application/json'
      }

      post graphql_path, params: { query: query }.to_json, headers: headers

      token = Oj.load(response.body).dig('data', 'authenticate', 'token')
      user = User.find_by(id: Psyche['token_issuer'].call(token: token).claims['id'])

      expect(response).to have_http_status(200)
      expect(user).to eq(admin)
    end
  end

  describe "allUsers" do
    let(:token) { Psyche['token_issuer'].call(admin.to_jwt_claims).token }

    it "responds with a list of Users" do
      query = %{
        query {
          allUsers {
            id
          }
        }
      }.squish!

      headers = {
        'Authorization' => "Bearer #{token}",
        'Content-Type' => 'application/json'
      }

      post graphql_path, params: { query: query }.to_json, headers: headers

      users = Oj.load(response.body).dig('data', 'allUsers')

      expect(response).to have_http_status(200)
      expect(users).to be_a(Array)
    end
  end

end