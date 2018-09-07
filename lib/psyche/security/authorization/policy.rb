# frozen_string_literal: true

module Psyche

  module Security

    module Authorization

      # @abstract Subclasses must implement {#authorized?}.
      #   The implementation must test that {#entity} has permission to perform action or
      #   read/write {#object}. It **SHOULD** return the `Boolean` result.
      #
      class Policy

        # @!attribute [rw] entity
        #   @return [User::Base]
        attr_accessor :entity

        # @!attribute [rw] object
        #   @example
        #     @object ||= (n = self.class.to_s)[n.rindex('::') + 2..-7].to_sym
        #   @return [Symbol]
        attr_accessor :object

        include Authorization::Predicates

        # @param [ApplicationStruct] entity
        # @param [Object, Array<Object>] object
        def initialize(entity, object)
          @entity = entity
          @object = object
        end

        # @raise [NotImplementedError]
        # @return [void]
        def authorized?
          raise ::NotImplementedError, "#{self.class} must implement `#authorized?`"
        end

      end

    end

  end

end
