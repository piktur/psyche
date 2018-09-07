# frozen_string_literal: true

class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  def index
    render template: 'index'
  end

  private

    # @return [User]
    def current_user
      ::User.find_by(
        id: ::Psyche['token_issuer'].call(
          token: request.headers['Authorization'].split[-1]
        ).claims[:id]
      )
    end

end
