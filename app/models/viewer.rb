# frozen_string_literal: true

Viewer = ::Struct.new(:user, :token) do
  def id; user&.id; end

  def role; user&.role; end

  def authenticated?; user.present?; end
  alias_method :is_authenticated, :authenticated?

  def as_json
    {
      id: id,
      user: user,
      token: token,
      role: role,
      is_authenticated: authenticated?
    }
  end
  alias_method :to_hash, :as_json
  alias_method :to_h, :to_hash
end
