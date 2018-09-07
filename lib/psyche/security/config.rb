# frozen_string_literal: true

require 'dry-configurable'

module Psyche

  module Security

    # Provides thread safe configuration.
    class Config

      extend ::Dry::Configurable

      # @!attribute [rw] not_found_exception_class_name
      #   Exception to raise when entity `User` instance not found
      #   @return [String]
      setting(:not_found_exception_class_name, 'Psyche::NotAuthorizedError', reader: true, &:to_s)

      # @!attribute [rw] http_status_on_failure
      #   HTTP response code sent on failure, 404 Not Found, or 401 Unauthorized
      #   @return [Integer]
      setting(:http_status_on_failure, 404, reader: true)

      setting(:jwt, reader: true) do
        # @!attribute [rw] expires_in
        #   @note Token will not expire if nil
        #
        #   **exp** identifies the expiration time on or after which the JWT **MUST
        #   NOT** be accepted for processing. The current date/time MUST be before the
        #   expiration date/time listed in the exp claim.
        #
        #   **MAY** provide for some small leeway, usually no more than a few minutes, to
        #   accomodate clock skew. Its value **MUST** be a number containing a NumericDate
        #   value
        #
        #   @return [ActiveSupport::Duration, Integer]
        setting(:expires_in, 1.day, &:to_i)

        # @!attribute expires_in
        #   @return [ActiveSupport::Duration, Integer]
        setting(:leeway, 30.seconds, &:to_i)

        # @!attribute [rw] audience
        #   @return [Array<String>, String]
        setting(:audience) do |value|
          if value.is_a?(::Array)
            def value.default; self[0]; end
            value.freeze
          else
            value
          end
        end

        # @!attribute [rw] verify
        #   @return [Boolean]
        setting(:verify) do
          # @!attribute [rw] aud
          #   @return [Boolean]
          setting(:aud)
          # @!attribute [rw] exp
          #   @return [Boolean]
          setting(:exp)
          # @!attribute [rw] aud
          #   @return [Boolean]
          setting(:iss)
        end

        # @!attribute [rw] signature_algorithm
        #   The cryptographic algorithm used to sign the token.
        #   @return [String]
        setting(:signature_algorithm, 'HS256', &:to_s)

        # @!attribute [rw] secret_signature_key
        #   The secret key used to sign tokens.
        #   This key must be preserved between server sessions; existing tokens will be not be valid
        #   if the signing key altered.
        #   @return [String, Proc]
        setting(
          :secret_signature_key,
          ENV.fetch('SECRET_KEY_BASE') { Rails.application.secrets[:secret_key_base] }
        )

        # @!attribute [rw] public_key
        #   The public key used to decode tokens. Only required for assymettric algorithms.
        #   Symmetric algorithms HS256 use the same key to sign and verify a token.
        #   @return [String]
        setting(:public_key)
      end

    end

  end

end
