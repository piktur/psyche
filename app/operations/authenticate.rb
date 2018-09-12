# frozen_string_literal: true

class Authenticate

  def call(input)
    user = ::User.find_by(email: input[:email])

    if user&.authenticate(input[:password])
      {
        viewer: {
          token: token(user.to_jwt_claims),
          role: user.role,
          user: user,
          is_authenticated: true
        },
        user: user
      }
    else
      {
        viewer: ::Types::ViewerType::NULL,
        errors: [{ path: %w(attributes password), message: 'Invalid password' }]
      }
    end
  rescue ::JWT::Error => err
    raise ::GraphQL::ExecutionError, err.message
  end

  private

    def token(claims)
      ::Psyche['token_issuer'].call(claims).token
    end

end
