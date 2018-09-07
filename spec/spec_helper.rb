# frozen_string_literal: true

require 'piktur/spec/spec_helper'

Piktur::Spec.configure do |config|
  config.support = %w()
end

RSpec.configure do |config|

end

Piktur::Spec.init_coverage_reporting!

require_relative './support/psyche'
