# frozen_string_literal: true

module Resolvers

  class Authenticate < GraphQL::Function

    argument :credentials, !Types::CredentialsType

    type do
      name 'Token'

      field :token, types.String
      field :type, types.String
      field :expires_in, types.Int
      field :expires_at, types.Int
    end

    def call(_opts, args, _ctx)
      input = args[:credentials]

      return if input.nil?

      return unless (user = User.find_by(email: input[:email]))

      generate_token(user.to_jwt_claims) if user.authenticate(input[:password])
    end

    private

      def generate_token(claims)
        Psyche['token_issuer'].call(claims)
      end

  end

end
