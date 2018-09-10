# frozen_string_literal: true

class ApplicationController < ActionController::Base

  def index
    render template: 'index'
  end

  private

    # @return [User, nil]
    def current_user
      _, token = request.headers['Authorization']&.split(' ')

      return if token.blank?

      ::User.find_by(
        id: ::Psyche['token_issuer'].call(token: token).claims[:id]
      )
    end

end
