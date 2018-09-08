# frozen_string_literal: true

unless User.exists?
  FactoryBot.create_list(:user, 1, :admin)
  FactoryBot.create_list(:user, 2, :customer)
  FactoryBot.create_list(:user, 2, :clinic)
  FactoryBot.create_list(:user, 2, :clinician)
end
