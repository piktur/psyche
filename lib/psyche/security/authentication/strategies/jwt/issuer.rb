# frozen_string_literal: true

module Psyche

  module Security

    module Authentication

      module Strategies

        module JWT

          # @see https://github.com/jwt/ruby-jwt#algorithms-and-usage
          class Issuer

            include Config

            # @!attribute [r] issuer
            #   @return [URI::Generic]
            attr_reader :issuer

            # @!attribute [rw] issued_at
            #   @return [Integer]
            attr_reader :issued_at

            # @!attribute [r] decode_key
            #   @return [String, OpenSSL::PKey::PKey]
            attr_reader :decode_key

            # @!attribute [r] encode_key
            #   @return [String, OpenSSL::PKey::PKey]
            attr_reader :encode_key

            # @param [String] issuer
            #
            # @raise [JWT::EncodeError] if {#public_key} nil and algorithm is asymmetric
            def initialize(issuer: Rails.application.routes.default_url_options[:host])
              raise ::JWT::EncodeError, "#{algorithm} public key undefined" if
                public_key.nil? && !algorithm?(:Hmac)

              @issuer = issuer
              @encode_key = key(private_key)
              @decode_key = algorithm?(:Hmac) ? @encode_key : key(public_key)
            end

            # @param [String] token
            # @param [Hash] verification_options
            # @param [Hash] claims
            #
            # @return [self]
            def call(token: nil, verification_options: EMPTY_OPTS, **claims)
              if token
                decode(token, verification_options)
              else
                encode(claims)
              end
            end

            # @param [String] token
            # @param [Hash] options
            #
            # @return [Token]
            def decode(token, options = EMPTY_OPTS)
              Token.new(
                *::JWT.decode(token, decode_key, true, verification_options(options)),
                token
              ).tap { |obj| obj.issued_at = obj.claims['iat'] }
            end

            # @param [Hash] claims
            #
            # @return [Token]
            def encode(claims)
              @issued_at = ::Time.zone.now.to_i

              Token.new(
                claims = merge_claims(claims),
                nil,
                ::JWT.encode(claims, encode_key, algorithm),
                @issued_at
              )
            end

            private

              # @return [Boolean]
              def algorithm?(type)
                ::JWT::Algos.const_get(type.capitalize, false)::SUPPORTED.include?(algorithm)
              end

              # @param [OpenSSL::PKey, Proc]
              #
              # @return [String]
              def key(value)
                case value
                when ::String then value
                when ::Proc then value.call
                when ::OpenSSL::PKey::PKey then value
                end
              end

              # @see https://tools.ietf.org/html/rfc7519#section-4 JWT claims
              #
              # @note Use String keys
              #
              # @return [Hash]
              def merge_claims(claims)
                claims.tap do |h|
                  verify_expiration? ? (h['exp'] ||= expires_at) : h.delete('exp')
                  verify_audience? ? (h['aud'] ||= audience.default) : h.delete('aud')
                  verify_issuer? ? (h['iss'] = issuer) : h.delete('iss')
                  # h['iat'] = issued_at
                  # h['sub'] = {}
                  # h['nbf'] = issued_at + (10 * 86_400)
                  # h['jti'] = ::SecureRandom.uuid
                end
              end

              # Returns a Hash of claim verification constraints.
              #
              # @see https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/
              #   Tokens **MUST BE** rejected if 'alg' != {#algorithm}
              #
              # @note JWT::Verify expects Symbol keys
              #
              # @return [Hash]
              def verification_options(options) # rubocop:disable AbcSize, MethodLength
                { algorithm: algorithm }.tap do |h|
                  if (h[:verify_aud] = options.fetch(:verify_aud) { verify_audience? })
                    h[:aud] = config.audience
                  end

                  if (h[:verify_iss] = options.fetch(:verify_iss) { verify_issuer? })
                    h[:iss] = issuer
                  end

                  if (h[:verify_expiration] = options.fetch(:verify_iss) { verify_expiration? })
                    # If {#verify_expiration?} and {config.leeway} > 0, the duration will be
                    # added to `exp` to accommodate possible transfer delay.
                    h[:exp_leeway] = leeway unless leeway.zero?
                  end
                end
              end

          end

        end

      end

    end

  end

end
