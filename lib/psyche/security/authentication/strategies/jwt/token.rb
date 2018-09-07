# frozen_string_literal: true

require 'jwt'

module Psyche

  module Security

    module Authentication

      module Strategies

        module JWT

          # @!attribute [rw] claims
          #   @return [Hash]
          # @!attribute [rw] header
          #   @return [Hash]
          # @!attribute [rw] token
          #   @return [String]
          # @!attribute [rw] issued_at
          #   @return [Integer]
          Token = ::Struct.new(:claims, :header, :token, :issued_at) do
            include Config

            # @return [String]
            def type
              'Bearer'
            end

            # Includes expiry to support client token refresh strategy
            # @see https://auth0.com/docs/api/authentication#client-credentials
            #
            # @param [Hash] options
            #
            # @option options [Array<String>] :except
            #
            # @return [Hash{String => Object}]
            def serializable_hash(except: EMPTY_ARRAY, **)
              {
                'token' => token,
                'type' => type # HTTP Authentication Strategy
              }.tap do |h|
                if verify_expiration?
                  h['expires_in'] = expires_in # TTL
                  h['expires_at'] = expires_at
                end

                except.each { |k| h.delete(k) } if except.present?
              end
            end

            # @return [Hash]
            def to_json(options = EMPTY_OPTS)
              serializable_hash(options).to_json
            end

            # @!method to_s
            #   @return [String]
            alias_method :to_s, :token
          end

        end

      end

    end

  end

end
