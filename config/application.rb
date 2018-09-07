# frozen_string_literal: true

require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
require 'sprockets/railtie'
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Psyche

  class Application < Rails::Application

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Don't generate system test files.
    config.generators.system_tests = nil

    rake_tasks do
      ::Dir['lib/tasks/**/*.rake'].each { |f| load f }
    end

    initializer 'psyche.boot', before: :run_prepare_callbacks do
      require_relative '../lib/psyche.rb'
      ::Psyche.boot!
    end

    reloader.to_prepare do
      ::Psyche.to_prepare
    end

    reloader.before_class_unload do
      ::Psyche.before_class_unload
    end

    reloader.after_class_unload do
      ::Psyche.after_class_unload
    end

    reloader.to_run do
      ::Psyche.to_run
    end

    reloader.to_complete do
      ::Psyche.to_complete
    end

  end

end
