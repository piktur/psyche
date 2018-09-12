# frozen_string_literal: true

class User < ApplicationRecord

  has_secure_password

  has_one :profile

  validates :email, presence: true

  def initialize(*)
    super
    self[:role] ||= ::Psyche['enum.authorization.roles'].default.to_i unless persisted?
  end

  # @return [Enum::Value]
  def role
    ::Psyche['enum.authorization.roles'][self[:role]]
  end

  # @return [Hash{Symbol=>Object}]
  def to_jwt_claims
    { id: id, role: role }
  end

end
