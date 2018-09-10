# frozen_string_literal: true

class Authenticate

  def call(input)
    user = ::User.find_by(email: input[:email])

    if user&.authenticate(input[:password])
      { user: user, token: token(user.to_jwt_claims) }
    else
      { errors: [{ path: %w(attributes password), message: 'Invalid password' }] }
    end
  end

  private

    def token(claims)
      ::Psyche['token_issuer'].call(claims).token
    end

end
