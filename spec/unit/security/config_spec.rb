# frozen_string_literal: true

require 'spec_helper'

module Psyche

  RSpec.describe Security::Config do
    subject { described_class.config }

    it { should respond_to(:not_found_exception_class_name) }

    it { should respond_to(:http_status_on_failure) }

    it { should respond_to(:jwt) }

    describe '#jwt' do
      subject { described_class.config.jwt }

      it { should respond_to(:expires_in) }

      it { should respond_to(:leeway) }

      it { should respond_to(:audience) }

      it { should respond_to(:verify) }

      describe '#verify' do
        subject { described_class.config.jwt.verify }

        it { should respond_to(:aud) }

        it { should respond_to(:exp) }

        it { should respond_to(:iss) }
      end

      it { should respond_to(:signature_algorithm) }

      it { should respond_to(:secret_signature_key) }

      it { should respond_to(:public_key) }
    end
  end

end
