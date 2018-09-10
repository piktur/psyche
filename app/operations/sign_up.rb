# frozen_string_literal: true

class SignUp

  def call(input)
    user = ::User.new(email: input[:email], password: input[:password])
    user.save!

    { user: user, token: token(user.to_jwt_claims), errors: nil }
  rescue ::StandardError => err
    case err
    when ::ActiveRecord::RecordInvalid
      errors = user.errors.map do |attribute, message|
        { path: ['attributes', ::Inflector.camelize(attribute, false)], message: message }
      end
    when ::PG::UniqueViolation
      errors = [{ path: ['attributes', :email], message: "#{email} already exists" }]
    else
      raise ::GraphQL::ExecutionError, err.message
    end

    { user: user, errors: errors }
  end

  private

    def token(claims)
      ::Psyche['token_issuer'].call(claims).token
    end

end
