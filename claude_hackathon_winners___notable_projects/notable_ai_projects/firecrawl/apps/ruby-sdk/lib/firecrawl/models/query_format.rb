# frozen_string_literal: true

module Firecrawl
  module Models
    # Query format for asking a question about page content.
    class QueryFormat
      MODE_FREEFORM = "freeform"
      MODE_DIRECT_QUOTE = "directQuote"

      attr_reader :prompt, :mode

      def initialize(prompt:, mode: nil)
        unless mode.nil? || [MODE_FREEFORM, MODE_DIRECT_QUOTE].include?(mode)
          raise ArgumentError, "query mode must be 'freeform' or 'directQuote'"
        end

        @prompt = prompt
        @mode = mode
      end

      def to_h
        {
          "type" => "query",
          "prompt" => prompt,
          "mode" => mode,
        }.compact
      end

      def type
        "query"
      end
    end
  end
end
