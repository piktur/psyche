# frozen_string_literal: true

require 'spec_helper'
require 'active_support/time'
require 'timecop'

module Psyche

  ::RSpec.describe 'JSON Web Tokens' do
    def generate_rsa(size = 2048)
      ::OpenSSL::PKey::RSA.generate(size)
    end

    # @example ssl_cert('rsa-2048-private.pem')
    def ssl_cert(file)
      ::OpenSSL::PKey.read(::File.read(::File.join(CERT_PATH, file)))
    end

    def configure(&block)
      Security.safe_const_reset(:Config, ::Class.new(Security::Config))
        .configure(&block)
    end

    def decode(token, verification_options = EMPTY_OPTS)
      issuer.decode(token, verification_options)
    end

    def generate_token(payload = claims)
      issuer.encode(payload)
    end

    def generate_invalid_token(private_key, alg)
      ::JWT.encode(claims, private_key, alg)
    end

    before(:all) do
      ::Time.zone = 'Sydney'
    end

    let(:config) { Security.config }

    let(:hmac) { ::SecureRandom.hex(64) }
    let(:rsa_private) { generate_rsa(2048) }
    let(:rsa_public) { rsa_private.public_key }

    let(:hs256_token) { ::JWT.encode(claims, hmac, 'HS256') }
    let(:hs384_token) { ::JWT.encode(claims, hmac, 'HS384') }
    let(:hs512_token) { ::JWT.encode(claims, hmac, 'HS512') }
    let(:rs256_token) { ::JWT.encode(claims, rsa_private, 'RS256') }
    let(:rs384_token) { ::JWT.encode(claims, rsa_private, 'RS384') }
    let(:r512_token) { ::JWT.encode(claims, rsa_private, 'RS512') }
    let(:es256_private) {ssl_cert('ec256-private.pem') }
    let(:es256_public) { ssl_cert('ec256-public.pem') }
    let(:es384_private) { ssl_cert('ec384-private.pem') }
    let(:es384_public) { ssl_cert('ec384-public.pem') }
    let(:es512_private) { ssl_cert('ec512-private.pem') }
    let(:es512_public) { ssl_cert('ec512-public.pem') }

    let(:algorithm) { 'HS256' }
    let(:private_key) { hmac }
    let(:public_key) { nil }

    let(:issuer) { Security::JWT::Issuer.new(issuer: 'http://example.com') }
    let(:audience) { 'subscriber' }
    let(:expires_in) { 1.day }
    let(:claims) { { 'sub' => 0, 'aud' => audience, 'exp' => expires_in } }

    let(:algorithm) { 'HS256' }
    let(:private_key) { hmac }
    let(:public_key) { nil }
    let(:token) { hs256_token }

    before do
      configure do |config|
        config.jwt.signature_algorithm  = algorithm
        config.jwt.secret_signature_key = private_key
        config.jwt.public_key = public_key
      end
    end

    describe 'algorithm' do
      context 'when HS256' do
        let(:algorithm) { 'HS256' }
        let(:private_key) { hmac }
        let(:public_key) { nil }
        let(:token) { hs256_token }

        context 'when decoded' do
          it 'should validate algorithm' do
            invalid_token = generate_invalid_token(private_key, 'HS384')

            expect { issuer.decode(invalid_token) }.to raise_error(::JWT::IncorrectAlgorithm)
          end
        end

        it 'should encode with HS256' do
          encoded = issuer.encode(claims)
          decoded = issuer.decode(encoded.token)

          expect(decoded.header['alg']).to eq(algorithm)
        end

        it 'should decode with HS256' do
          decoded = issuer.decode(token)

          expect(decoded.header['alg']).to eq(algorithm)
        end
      end

      context 'when RS256' do
        let(:algorithm) { 'RS256' }
        let(:private_key) { rsa_private }
        let(:public_key) { rsa_public }
        let(:token) { rs256_token }

        context 'when decoded' do
          it 'should validate algorithm' do
            invalid_token = generate_invalid_token(hmac, 'HS384')

            expect { issuer.decode(invalid_token) }.to raise_error(::JWT::IncorrectAlgorithm)
          end
        end

        it 'should encode token with RS256 algo' do
          encoded = issuer.encode(claims)
          decoded = issuer.decode(encoded.token)

          expect(decoded.header['alg']).to eq(algorithm)
        end

        it 'should decode token with RS256 algo' do
          decoded = decode(token)

          expect(decoded.header['alg']).to eq(algorithm)
        end
      end if ENV['DEBUG']

      it 'should reject tokens with different algorithm' do
        invalid_token = generate_invalid_token(private_key, 'HS384')

        expect { decode(invalid_token) }.to raise_error(::JWT::IncorrectAlgorithm)
      end

      it 'should reject tokens with different signing key' do
        invalid_token = generate_invalid_token(::SecureRandom.hex(64), 'HS256')

        expect { decode(invalid_token) }.to raise_error(::JWT::VerificationError)
      end
    end

    describe "claims['sub']" do
      context 'when decoded' do
        it 'should include the given claims' do
          encoded = issuer.encode(claims)
          decoded = issuer.decode(encoded.token)

          expect(decoded.claims).to eq(claims)
        end
      end
    end

    describe "claims['exp']" do
      let(:expires_in) { 1.day }

      context 'when verification enabled' do
        before do
          configure do |config|
            config.jwt.expires_in = expires_in
            config.jwt.verify.exp = true
          end
        end

        it 'should be verified' do
          token = issuer.encode(claims).to_s

          ::Timecop.travel(expires_in + 1000) do
            expect { decode(token) }.to raise_error(::JWT::ExpiredSignature)
          end
        end

        context 'and absent' do
          it 'should include default expiry' do
            encoded = issuer.encode(claims)

            expect(encoded.claims['exp']).to eq(expires_in)
          end
        end

        context 'and present' do
          let(:expires_in) { 2.days }

          it 'should include given expiry' do
            encoded = issuer.encode(claims)

            expect(encoded.claims['exp']).to eq(expires_in)
          end
        end

        context 'and verification forcefully disabled' do
          it 'should be verified' do
            token = issuer.encode(claims).to_s
            verification_options = { verify_expiration: false }

            ::Timecop.travel(expires_in + 1000) do
              expect { decode(token, verification_options) }.to \
                raise_error(::JWT::ExpiredSignature)
            end
          end
        end
      end

      context 'when verification disabled' do
        before do
          configure do |config|
            config.jwt.expires_in = nil
            config.jwt.verify.exp = false
          end
        end

        it 'should NOT be verified' do
          token = issuer.encode(claims).to_s

          ::Timecop.travel(1.year.from_now) do
            expect { decode(token) }.not_to raise_error(::JWT::ExpiredSignature)
          end
        end

        context 'and present' do
          let(:expires_in) { 1000 }

          it 'should NOT be included' do
            encoded = issuer.encode(claims)

            expect(encoded.claims).not_to have_key('exp')
          end
        end

        context 'and absent' do
          it 'should NOT include default' do
            encoded = issuer.encode(claims)

            expect(encoded.claims).not_to have_key('exp')
          end
        end

        context 'and verification forcefully enabled' do
          let(:expires_in) { 1000 }

          it 'should NOT be verified' do
            token = issuer.encode(claims).to_s
            verification_options = { verify_expiration: true }

            ::Timecop.travel(expires_in + 1000) do
              expect { decode(token, verification_options) }.not_to \
                raise_error(::JWT::ExpiredSignature)
            end
          end
        end
      end
    end

    describe "claims['aud']" do
      let(:audience) { 'subscriber' }
      let(:expires_in) { 1000 }

      context 'when verification enabled' do
        before do
          configure do |config|
            config.jwt.audience = audience
            config.jwt.verify.aud = true
          end
        end

        context 'and present' do
          let(:audience) { %w(public subscriber) }

          it 'should be included' do
            encoded = issuer.encode(claims)

            expect(encoded.claims['aud']).to eq(audience)
          end
        end

        context 'and absent' do
          it 'should include default' do
            encoded = issuer.encode(claims)

            expect(encoded.claims['aud']).to eq(audience)
          end
        end

        context 'and verification forcefully disabled' do
          let(:audience) { 'invalid' }

          it 'should NOT be verified' do
            token = issuer.encode(claims).to_s
            verification_options = { verify_aud: false }

            expect { decode(token, verification_options) }.not_to raise_error(::JWT::InvalidAudError)
          end
        end
      end

      context 'when verification disabled' do
        before do
          configure do |config|
            config.jwt.verify.aud = false
          end
        end

        context 'and present' do
          let(:audience) { %w(public subscriber) }

          it 'should NOT be included' do
            encoded = issuer.encode(claims)

            expect(encoded.claims).not_to have_key('aud')
          end
        end

        context 'and absent' do
          it 'should NOT include default' do
            encoded = issuer.encode(claims)

            expect(encoded.claims).not_to have_key('aud')
          end
        end

        context 'and verification forcefully enabled' do
          let(:audience) { 'invalid' }

          it 'should be verified' do
            token = issuer.encode(claims).to_s
            verification_options = { verify_aud: true }

            expect { decode(token, verification_options) }.to raise_error(::JWT::InvalidAudError)
          end
        end
      end
    end

    describe '#to_json' do
      let(:token) { generate_token }

      context 'when expiry verification enabled' do
        before do
          configure do |config|
            config.jwt.expires_in = expires_in
            config.jwt.verify.exp = true
          end
        end

        let(:expires_in) { 1000 }
        let(:expires_at) { token.issued_at + expires_in }
        let(:json) do
          %{{"token":"#{token.to_s}","type":"Bearer","expires_in":#{expires_in},"expires_at":#{expires_at}}}
        end

        it { expect(json).to eq(token.to_json) }
      end

      context 'when expiry verification disabled' do
        before do
          configure { |config| config.jwt.verify.exp = false }
        end

        let(:json) do
          %{{"token":"#{token.to_s}","type":"Bearer"}}
        end

        it { expect(json).to eq(token.to_json) }
      end
    end
  end

end
