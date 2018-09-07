# frozen_string_literal: true

module Psyche

  module Security

    module Authorization

      Support::Enum.new(:roles, namespace: self) do
        register
        i18n_scope :authorization

        default :customer
        value   :clinic
        value   :clinician
        value   :admin

        finalize
      end

    end

  end

end
