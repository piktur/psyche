# frozen_string_literal: true

module Psyche

  module Security

    module Authentication

      module Strategies

        module JWT

          # :nodoc
          module Config

            # @return [Integer] the **Time To Live (TTL)**
            def expires_in; config.expires_in; end

            # @return [Integer]
            def expires_at; issued_at + expires_in; end

            private

              # @return [Dry::Configurable::Class]
              def config; Security.config.jwt; end

              # @return [Object]
              def private_key; config.secret_signature_key; end

              # @return [Object]
              def public_key; config.public_key; end

              # @return [String]
              def algorithm; config.signature_algorithm; end

              # @return [Integer]
              def audience; config.audience; end

              # @return [Integer]
              def leeway; config.leeway.to_i; end

              # @return [Boolean]
              def verify_expiration?; config.verify.exp; end

              # @return [Boolean]
              def verify_audience?; config.verify.aud; end

              # @return [Boolean]
              def verify_issuer?; config.verify.iss; end

          end

        end

      end

    end

  end

end
