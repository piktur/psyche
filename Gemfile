# frozen_string_literal: true

source 'https://rubygems.org'
ruby ENV.fetch('RUBY_VERSION').sub('ruby-', '')

git_source(:github) { |repo| "https://github.com/#{repo}.git" }

gem 'piktur', git: 'https://github.com/piktur/piktur.git', branch: 'master'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 3.11'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker'

gem 'oj'

gem 'react-rails'

gem 'graphql'
gem 'graphiql-rails', group: :development

gem 'bcrypt'
gem 'jwt', '~> 2.1'
gem 'pundit', '~> 1.1'

gem 'dry-transaction'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

group :development, :test do
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'pry-stack_explorer'
  gem 'faker'
  gem 'factory_bot_rails'
end

group :test do
  gem 'piktur_spec', git: 'https://github.com/piktur/piktur_spec.git', branch: 'master'
  gem 'database_cleaner'
  gem 'rspec-rails'
  gem 'timecop'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
