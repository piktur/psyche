# frozen_string_literal: true

class SignUp

  include ::Dry::Transaction

  step :build
  step :validate
  try :save, catch: ::ActiveRecord::RecordNotUnique
  tee :notify
  try :authenticate, catch: ::JWT::EncodeError

  private

    def build(email:, password:, **)
      Success(::User.new(email: email, password: password))
    end

    def validate(user)
      if user.validate
        Success(user)
      else
        Failure(user.errors.messages.map { |(attr, msg)| [attr, msg.uniq] })
      end
    end

    def save(user)
      user.save
    end

    # @todo Send notification to dev team
    def notify(*)
      true
    end

    def authenticate(user)
      [user, ::Psyche['token_issuer'].call(user.to_jwt_claims)]
    end

end
