# frozen_string_literal: true

class PsycheSchema < GraphQL::Schema

  class UnknownTypeError < ::StandardError

    def initialize(obj)
      super(obj.inspect)
    end

  end

  query(::Types::QueryType)
  mutation(::Types::MutationType)

  class << self

    # @return [String]
    def id_from_object(object, _type_definition, _query_ctx)
      self::UniqueWithinType.encode(object.class.name, object.id)
    end

    # @return [Object]
    def object_from_id(id, _query_ctx)
      klass, id = self::UniqueWithinType.decode(id)
      ::Inflector.constantize(klass).find(id)
    end

    # @return [Class]
    def resolve_type(_type, obj, _ctx)
      case obj
      when User then ::Types::UserType
      else raise(UnknownTypeError, obj)
      end
    end

  end

end
