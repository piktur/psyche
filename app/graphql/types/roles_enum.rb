# frozen_string_literal: true

module Types

  class RolesEnum < BaseEnum

    graphql_name 'Roles'

    ::Psyche['enum.authorization.roles'].each do |e|
      value e, owner: self
    end

  end

end
