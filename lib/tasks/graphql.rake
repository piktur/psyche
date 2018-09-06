# frozen_string_literal: true

require 'graphql/rake_task'

GraphQL::RakeTask.new(
  schema_name:  'PsycheSchema',
  directory:    'app/javascript/packs',
  idl_outfile:  'schema.graphql',
  json_outfile: 'schema.json',
  dependencies: [:environment]
) do |t|
  t.namespace = 'psyche'
end
