# frozen_string_literal: true

module Psyche

  module Security

    module Authentication

      # HTTP Authentication strategies.
      # A Strategy SHOULD implement {Issuer}, {Consumer} and {Token}
      module Strategies

        extend ::ActiveSupport::Autoload

        autoload :JWT

      end

    end

  end

end
