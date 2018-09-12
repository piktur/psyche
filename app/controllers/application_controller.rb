# frozen_string_literal: true

class ApplicationController < ActionController::Base

  def index
    render template: 'index'
  end

  private

    # @return [String]
    def _token
      _, @_token = request.headers['Authorization']&.split(' ')
      @_token
    end

    # @return [User, nil]
    def current_user
      _token && @_current_user = ::User.find_by(
        id: ::Psyche['token_issuer'].call(token: _token).claims['id']
      )
    end

end
