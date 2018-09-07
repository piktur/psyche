# frozen_string_literal: true

class GraphqlController < ApplicationController

  def execute # rubocop:disable MethodLength
    render json: ::PsycheSchema.execute(
      params[:query],
      variables:      normalize(params[:variables]),
      context:        {
        current_user: current_user
      },
      operation_name: params[:operationName]
    )
  rescue StandardError => e
    raise(e) unless ::Rails.env.development?
    handle_error(e)
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
          {}
        end
      when ::Hash, ::ActionController::Parameters
        input
      when nil
        {}
      else
        raise ::ArgumentError, "Unexpected parameter: #{input}"
      end
    end

    def handle_error(err)
      logger.error(err.message)
      logger.error(err.backtrace.join("\n"))

      render(
        json:   {
          error: { message: err.message, backtrace: err.backtrace },
          data:  {}
        },
        status: :internal_server_error
      )
    end

end
