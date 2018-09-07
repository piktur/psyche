# frozen_string_literal: true

class User < ApplicationRecord

  has_secure_password

  validates :email, presence: true

  # @return [Hash{Symbol=>Object}]
  def to_jwt_claims
    { id: id, role: role }
  end

end
