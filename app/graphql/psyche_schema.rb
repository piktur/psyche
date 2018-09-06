# frozen_string_literal: true

PsycheSchema = GraphQL::Schema.define do
  mutation(Types::MutationType)
  query(Types::QueryType)
end

# Generate Relay compatible schema
module RelaySchemaHelpers

  # @return [Pathname]
  SCHEMA_DIR = ::Rails.root.join('app/javascript/packs')
  # @return [String]
  SCHEMA_PATH = ::File.join(SCHEMA_DIR, 'schema.json')

  # @return [void]
  def execute_introspection_query
    ::Rails.cache.fetch(checksum) do
      ::PsycheSchema.execute(::GraphQL::Introspection::INTROSPECTION_QUERY)
    end
  end

  # @return [String]
  def checksum
    files = ::Dir['app/graphql/**/*.rb']
    content = files.map { |f| ::File.read(f) }.join
    ::Digest::SHA256.hexdigest(content).to_s
  end

  # Dump Schema on start/reload
  #
  # @return [String]
  def dump_schema
    ::FileUtils.mkdir_p(SCHEMA_DIR)
    result = schema

    return if ::File.exist?(SCHEMA_PATH) && ::File.read(SCHEMA_PATH) == result

    ::File.write(SCHEMA_PATH, result)
  end

  private

    # @return [String]
    def schema
      ::Oj.pretty_print(::PsycheSchema.execute_introspection_query)
    end

end
private_constant :RelaySchemaHelpers

PsycheSchema.extend RelaySchemaHelpers
