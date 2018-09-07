# frozen_string_literal: true

module Psyche

  class Transactions

    include ::Dry::Container::Mixin

    # @return [void]
    def finalize!
      freeze if ::Rails.env.production?
    end

  end

end
