# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'application#index'

  post '/graphql', to: 'graphql#execute'

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end
end
