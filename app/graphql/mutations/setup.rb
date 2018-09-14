# frozen_string_literal: true

module Mutations

  class Setup < BaseMutation

    ROLES = ::Psyche['enum.authorization.roles'].keys
    private_constant :ROLES

    graphql_name 'Setup'
    description 'Internal API, exports mock data'

    argument :validFor, ::Integer, required: false

    ROLES.each do |role|
      field "#{role}_token".to_sym, ::String, null: true
    end

    def resolve(*)
      ROLES.each_with_object({}) do |e, a|
        email = "#{e}@example.com"
        user = ::User.find_by(email: email) ||
          ::User.create(email: email, password: 'password')
        a["#{e}_token"] = ::Psyche['token_issuer'].call(user.to_jwt_claims)
      end
    end

  end

end
