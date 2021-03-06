# frozen_string_literal: true

module Psyche

  extend ::ActiveSupport::Autoload

  autoload :Container
  autoload :Security
  autoload :Operations

  # Setup utilities and aliases
  ::Piktur.install(self, containerize: true)

  class << self

    # @!attribute [rw] transactions
    #   @return [Dry::Container]
    attr_writer :transactions

    # @!attribute [rw] operations
    #   @return [Dry::Container]
    attr_writer :operations

    def operations
      @operations ||= Operations.new
    end

    # @return [void]
    def boot!
      require 'psyche/operations'

      # In non-production environments cached container instance(s) will be replaced
      # {.after_class_unload}.
      self.container = Container.new
      self.operations = Operations.new

      Security.install

      # Finalize the container instance once everything is loaded
      operations.finalize!
      container.merge(operations)
    end

    # @return [void]
    def to_prepare
      # @todo
    end

    # @return [void]
    def before_class_unload
      # @todo
    end

    # @return [void]
    def after_class_unload
      # Rebuild container instances
      self.container = Container.new
      self.operations = Operations.new

      Security.install
    end

    # @return [void]
    def to_run
      # @todo
    end

    # @return [void]
    def to_complete
      # Finalize the container instance(s) once everything is loaded
      operations.finalize!
      container.merge(operations)
    end

  end

end
