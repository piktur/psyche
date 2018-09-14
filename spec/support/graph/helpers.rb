# frozen_string_literal: true

module Graph
  module Helpers
    def exec_query
      ::PsycheSchema.execute(
        query,
        variables: respond_to?(:variables) && variables || {},
        context: respond_to?(:context) && context || {},
        operation_name: respond_to?(:operation_name) && operation_name || nil
      )
    end

    def id_from_object(object)
      ::PsycheSchema.id_from_object(object)
    end
  end
end
