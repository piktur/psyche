# frozen_string_literal: true

class GraphqlController < ApplicationController

  def execute # rubocop:disable AbcSize, MethodLength
    render json: ::PsycheSchema.execute(
      params[:query],
      variables: normalize(params[:variables]),
      context: {
        viewer: ::Viewer.new(current_user, _token).as_json
      },
      operation_name: params[:operationName]
    )
  rescue ::StandardError, ::GraphQL::RuntimeTypeError => err
    raise(err) unless ::Rails.env.development?
    handle_error(err)
  end

  private

    # Handle form data, JSON body, or a blank value
    #
    # @raise [ArgumentError]
    #
    # @return [Hash]
    def normalize(input) # rubocop:disable MethodLength
      case input
      when ::String
        if input.present?
          normalize(::Oj.load(input))
        else
          ::Psyche::EMPTY_HASH
        end
      when ::Hash, ::ActionController::Parameters
        input
      when nil
        ::Psyche::EMPTY_HASH
      else
        raise ::ArgumentError, "Unexpected parameter: #{input}"
      end
    end

    def handle_error(err)
      logger.error(err.message)
      logger.error(err.backtrace.join("\n"))

      render(
        json: {
          errors: [{ message: err.message, backtrace: err.backtrace }],
          data: {}
        },
        status: :internal_server_error
      )
    end

end
