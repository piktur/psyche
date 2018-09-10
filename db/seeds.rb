# frozen_string_literal: true

unless User.exists?
  credentials = ->(role) { { email: "#{role}@example.com", password: 'password' } }
  FactoryBot.create_list(:user, 1, :admin, credentials.('admin'))
  FactoryBot.create_list(:user, 1, :customer, credentials.('customer'))
  FactoryBot.create_list(:user, 1, :clinic, credentials.('clinic'))
  FactoryBot.create_list(:user, 1, :clinician, credentials.('clinician'))
end
