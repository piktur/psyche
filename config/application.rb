# frozen_string_literal: true

require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
require 'sprockets/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Psyche

  class Application < Rails::Application

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    config.generators do |g|
      g.system_tests = nil
      g.template_engine     :slim
      g.integration_tool    :rspec
      g.test_framework      :rspec, fixture: true
      g.fixture_replacement :factory_bot, dir: 'spec/factories'
      g.request_specs       false
      g.view_specs          false
      g.helper_specs        false
      g.controller_specs    false
      g.routing_specs       false
      g.helper              false
      g.stylesheets         false
      g.javascripts         false
    end

    rake_tasks do
      ::Dir['lib/tasks/**/*.rake'].each { |f| load f }
    end

    routes.default_url_options = {
      locale:   ::I18n.locale,
      host:     ::ENV['HTTP_HOST'],
      port:     ::ENV['PORT'],
      protocol: ::Rails.env.production? ? 'https' : 'http'
    }

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
