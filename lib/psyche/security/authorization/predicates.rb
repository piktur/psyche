# frozen_string_literal: true

module Psyche

  module Security

    module Authorization

      # | Entity             | Criteria                    | Policy                          |
      # |--------------------|-----------------------------|---------------------------------|
      # | `Customer`         | {Authorization.roles}[0]    | `CustomerPolicy`                |
      # | `Clinic`           | {Authorization.roles}[1]    | `ClinicPolicy`                  |
      # | `Clinician`        | {Authorization.roles}[2]    | `ClinicianPolicy`               |
      # | `Admin`            | {Authorization.roles}[3]    | `AdminPolicy`                   |
      #
      module Predicates

        # @return [String]
        NOT_IMPLEMENTED_MSG = <<~MSG
          `%s` MUST implement `#entity` and return an `Object` responding to `#role`
        MSG
        private_constant :NOT_IMPLEMENTED_MSG

        def self.included(base)
          raise(StandardError, format(NOT_IMPLEMENTED_MSG, base)) unless
            base.method_defined?(:entity)
        end

        # @return [Boolean]
        def admin?
          entity.role == roles.admin
        end

        # @return [Boolean]
        def customer?
          entity.role == roles.customer
        end

        # @return [Boolean]
        def clinic?
          entity.role == roles.clinic
        end

        # @return [Boolean]
        def clinician?
          entity.role == roles.clinician
        end

        # @return [Psyche::Support::Enum]
        private def roles; ::Psyche::Security.roles; end

      end

    end

  end

end
