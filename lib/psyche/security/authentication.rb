# frozen_string_literal: true

module Psyche

  module Security

    # @see Strategies::JWT
    module Authentication

      extend ::ActiveSupport::Autoload

      autoload :Strategies

    end

  end

end
