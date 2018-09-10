# frozen_string_literal: true

require 'psyche'

RSpec.configure do |config|
  config.before(:suite) do
    Psyche.boot! unless defined?(Rails) && Rails.application&.initialized?
  end

  config.after(:suite) do
    Psyche.container = nil
    Psyche.operations = nil
    Psyche.transactions = nil
  end
end
