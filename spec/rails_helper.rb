# frozen_string_literal: true

require 'piktur/spec/spec_helper'

Piktur::Spec.init_coverage_reporting!(rails: true)

require 'piktur/spec/rails_helper'
require 'database_cleaner'

RSpec.configure do |config|
  config.prepend_before(:suite) do
    DatabaseCleaner.strategy = :transaction
    Rails.application.load_seed
  end

  config.before(:all) do
    DatabaseCleaner.start
  end

  config.after(:all) do
    DatabaseCleaner.clean
  end

  config.use_transactional_fixtures = false
end
