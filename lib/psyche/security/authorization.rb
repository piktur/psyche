# frozen_string_literal: true

module Psyche

  module Security

    module Authorization

      extend ActiveSupport::Autoload

      autoload :Policy
      autoload :Predicates

    end

  end

end
