# frozen_string_literal: true

require 'dry/container'

module Psyche

  # @note In non-production environments the container instance IS replaced on
  #   {Psyche.after_class_unload} to ensure any changes to the code base are applied.
  class Container

    include ::Dry::Container::Mixin

    # @return [void]
    def finalize!
      freeze if ::Rails.env.production?
    end

  end

end
