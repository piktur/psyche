# frozen_string_literal: true

Errors = ::Class.new do
  attr_reader :errors

  def initialize(*errors)
    @errors = errors
  end

  def as_json
    { errors: @errors.map(&:as_json) }
  end
  alias_method :to_hash, :as_json
end
