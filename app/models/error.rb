# frozen_string_literal: true

Error = ::Class.new do
  attr_reader :path, :message

  def initialize(*args, **options)
    @message = args.pop
    @path = args.map { |e| ::Inflector.camelize(e, false) }
    @node = options[:node] || 'attributes'
  end

  def as_json
    { path: [@node, *@path], message: @message }
  end
  alias_method :to_hash, :as_json
end
