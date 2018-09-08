# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.safe_email }
    password { 'password' }

    trait :customer do
      role { 0 }
    end

    trait :clinic do
      role { 1 }
    end

    trait :clinician do
      role { 2 }
    end

    trait :admin do
      role { 3 }
    end
  end
end
