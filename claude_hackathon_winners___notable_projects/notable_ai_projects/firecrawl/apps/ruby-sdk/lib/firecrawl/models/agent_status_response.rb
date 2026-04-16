# frozen_string_literal: true

module Firecrawl
  module Models
    # Status response for monitoring agent tasks.
    class AgentStatusResponse
      attr_reader :status, :data, :credits_used, :expires_at

      def initialize(raw)
        @status = raw["status"]
        @data = raw["data"]
        @credits_used = raw["creditsUsed"]
        @expires_at = raw["expiresAt"]
      end

      def done?
        %w[completed failed cancelled].include?(status)
      end

      def to_s
        "AgentStatusResponse{status=#{status}}"
      end
    end
  end
end
