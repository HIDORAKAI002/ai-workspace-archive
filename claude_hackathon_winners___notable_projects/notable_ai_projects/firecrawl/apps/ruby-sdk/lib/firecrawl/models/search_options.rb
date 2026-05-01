# frozen_string_literal: true

module Firecrawl
  module Models
    # Options for a web search request.
    class SearchOptions
      FIELDS = %i[
        sources categories include_domains exclude_domains limit tbs location
        ignore_invalid_urls timeout scrape_options integration
      ].freeze

      attr_reader(*FIELDS)

      def initialize(**kwargs)
        FIELDS.each { |f| instance_variable_set(:"@#{f}", kwargs[f]) }
      end

      def to_h
        {
          "sources" => sources,
          "categories" => categories,
          "includeDomains" => include_domains,
          "excludeDomains" => exclude_domains,
          "limit" => limit,
          "tbs" => tbs,
          "location" => location,
          "ignoreInvalidURLs" => ignore_invalid_urls,
          "timeout" => timeout,
          "scrapeOptions" => scrape_options&.to_h,
          "integration" => integration,
        }.compact
      end
    end
  end
end
