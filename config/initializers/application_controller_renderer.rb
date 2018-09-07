# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

ActiveSupport::Reloader.to_prepare do
  ApplicationController.renderer.defaults.update(
    locale:    I18n.locale,
    http_host: ENV['HTTP_HOST'],
    https:     Rails.env.production?
  )
end
