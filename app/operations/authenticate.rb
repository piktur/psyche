# frozen_string_literal: true

AuthenticationError = ::Class.new(::StandardError)

class Authenticate

  include ::Dry::Transaction

  try :find, catch: ::ActiveRecord::RecordNotFound
  try :authenticate, catch: [::AuthenticationError, ::JWT::EncodeError]

  private

    def find(email:, password:, **)
      user = ::User.find_by!(email: email)
      [user, password]
    end

    def authenticate(input)
      user, password = input
      return [user, ::Psyche['token_issuer'].call(user.to_jwt_claims)] if
        user.authenticate(password)
      raise ::AuthenticationError
    end

end
