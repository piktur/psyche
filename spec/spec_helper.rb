# frozen_string_literal: true

require 'piktur/spec/spec_helper'

Piktur::Spec.configure do |config|
  config.support = %w()
end

require_relative './support/helpers.rb'

RSpec.configure do |config|
  for t in [:graph, :mutation, :query]
    config.include Graph::Helpers, type: t
  end
end

Piktur::Spec.init_coverage_reporting!

require_relative './support/psyche'
