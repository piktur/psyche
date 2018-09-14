# frozen_string_literal: true

class UnknownTypeError < ::StandardError

  def initialize(obj)
    super(obj.inspect)
  end

end

class PsycheSchema < GraphQL::Schema

  query(::Types::QueryType)

  mutation(::Types::MutationType)

  rescue_from(::ActiveRecord::RecordInvalid) do |err|
    err.record.errors.each_with_object([]) do |(attr, msg), obj|
      obj << {
        path:    ['attributes', ::Inflector.camelize(attr, false)],
        message: Array(msg).uniq
      }
    end.to_json
  end

  class << self

    # @return [String]
    def id_from_object(object, *)
      self::UniqueWithinType.encode(object.class.name, object.id)
    end

    # @return [Object]
    def object_from_id(id, ctx)
      klass, id = self::UniqueWithinType.decode(id)
      case klass
      when 'Viewer'
        ctx[:viewer][:user]
      else
        ::Inflector.constantize(klass)&.find(id)
      end
    end

    # @return [Class]
    def resolve_type(type, obj, _ctx)
      const = "#{type.graphql_name == 'Node' ? obj.class : type.graphql_name}Type"
      ::Inflector.constantize(const, ::Types, traverse: false) ||
        raise(::UnknownTypeError, obj)
    end

  end

end
