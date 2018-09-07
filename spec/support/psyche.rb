# frozen_string_literal: true

require 'psyche'

RSpec.configure do |config|
  config.before(:all) do
    unless defined?(Rails) && Rails.application&.initialized?
      Psyche.container = Psyche::Container.new
    end
  end

  config.after(:all) do
    Psyche.container = nil
  end
end
