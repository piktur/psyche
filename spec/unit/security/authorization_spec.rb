# frozen_string_literal: true

# rubocop:disable DoubleNegation

require 'spec_helper'

module Psyche

  RSpec.describe Security::Authorization do
    subject(:enum) { Psyche.container['enum.authorization.roles'] }

    let(:roles) do
      %i(
        customer
        clinic
        clinician
        admin
      )
    end

    describe 'enum' do
      it { expect(enum).to include(*roles) }
    end

    describe described_class::Predicates do
      Test::User = Struct.new(:role)

      Test::Policy = Struct.new(:entity, :object) do
        include Psyche::Security::Authorization::Predicates
      end

      let(:bogus) { Test::User.new('foo') }

      def entity
        Test::User.new(enum[__callee__].to_i)
      end
      alias customer entity
      alias clinic entity
      alias clinician entity
      alias admin entity

      context 'when #entity.role invalid' do
        describe '#admin?' do
          let(:policy) { Test::Policy.new(bogus, :model) }

          it { expect(policy.admin?).to be(false) }
        end
      end

      context 'when #entity is an Admin' do
        describe '#admin?' do
          let(:policy) { Test::Policy.new(admin, :model) }

          it { expect(policy.admin?).to be(true) }
        end
      end

      context 'when #entity is a Customer' do
        describe '#customer?' do
          let(:policy) { Test::Policy.new(customer, :model) }

          it { expect(policy.customer?).to be(true) }

          it { expect(policy.admin?).to be(false) }
        end
      end

      context 'when #entity is a Clinic' do
        describe '#clinic?' do
          let(:policy) { Test::Policy.new(clinic, :model) }

          it { expect(policy.clinic?).to be(true) }

          it { expect(policy.admin?).to be(false) }
        end
      end

      context 'when #entity is a Clinician' do
        describe '#clinician?' do
          let(:policy) { Test::Policy.new(clinician, :model) }

          it { expect(policy.clinician?).to be(true) }

          it { expect(policy.admin?).to be(false) }
        end
      end
    end
  end

end
