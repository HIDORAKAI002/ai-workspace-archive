# frozen_string_literal: true

module Firecrawl
  module Models
    # Response from starting an agent task.
    class AgentResponse
      attr_reader :success, :id, :error

      def initialize(data)
        @success = data["success"]
        @id = data["id"]
        @error = data["error"]
      end

      def to_s
        "AgentResponse{id=#{id}, success=#{success}}"
      end
    end
  end
end
