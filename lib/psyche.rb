# frozen_string_literal: true

module Psyche

  extend ::ActiveSupport::Autoload

  autoload :Container
  autoload :Security
  autoload :Operations
  autoload :Transactions

  # Setup utilities and aliases
  ::Piktur.install(self, containerize: true)

  class << self

    # @!attribute [rw] transactions
    #   @return [Dry::Container]
    attr_writer :transactions

    def transactions
      @transactions = Transactions.new
    end

    # @return [void]
    def boot!
      require 'psyche/transactions'

      # In non-production environments cached container instance(s) will be replaced
      # {.after_class_unload}.
      self.container = Container.new
      self.transactions = Transactions.new

      Security.install

      # Finalize the container instance once everything is loaded
      [container, transactions].map(&:finalize!)
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
      self.transactions = Transactions.new

      Security.install
    end

    # @return [void]
    def to_run
      # @todo
    end

    # @return [void]
    def to_complete
      # Finalize the container instance(s) once everything is loaded
      [container, transactions].map(&:finalize!)
    end

  end

end
