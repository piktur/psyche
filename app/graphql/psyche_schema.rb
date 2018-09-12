# frozen_string_literal: true

class PsycheSchema < GraphQL::Schema

  class UnknownTypeError < ::StandardError

    def initialize(obj)
      super(obj.inspect)
    end

  end

  query(::Types::QueryType)

  mutation(::Types::MutationType)

  rescue_from(::ActiveRecord::RecordInvalid) do |error|
    error.record.errors.each_with_object([]) do |(attr, msg), obj|
      obj << {
        path:    ['attributes', ::Inflector.camleize(attr, false)],
        message: Array(msg).uniq
      }
    end.to_json
  end

  class << self

    # @return [String]
    def id_from_object(object, type, ctx)
      case type.graphql_name
      when 'Viewer'
        self::UniqueWithinType.encode('User', ctx[:viewer][:user]&.id)
      else
        self::UniqueWithinType.encode(object.class.name, object.id)
      end
    end

    # @return [Object]
    def object_from_id(id, ctx)
      klass, id = self::UniqueWithinType.decode(id)
      case type.graphql_name
      when 'Viewer'
        ctx[:viewer][:user]
      else
        ::Inflector.constantize(klass)&.find(id)
      end
    end

    # @return [Class]
    def resolve_type(_type, obj, _ctx)
      ::Inflector.constantize("#{obj}Type", ::Types, traverse: false) ||
        raise(UnknownTypeError, obj)
    end

  end

end
