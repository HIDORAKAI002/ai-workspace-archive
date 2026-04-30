# frozen_string_literal: true

module Firecrawl
  module Models
    # Options for scraping a single URL.
    class ScrapeOptions
      FIELDS = %i[
        formats headers include_tags exclude_tags only_main_content
        timeout wait_for mobile parsers actions location
        skip_tls_verification remove_base64_images block_ads proxy
        max_age store_in_cache lockdown integration
      ].freeze

      attr_reader(*FIELDS)

      def initialize(**kwargs)
        FIELDS.each { |f| instance_variable_set(:"@#{f}", kwargs[f]) }
        @skip_tls_verification = false if @skip_tls_verification.nil?
      end

      def to_h
        {
          "formats" => formats,
          "headers" => headers,
          "includeTags" => include_tags,
          "excludeTags" => exclude_tags,
          "onlyMainContent" => only_main_content,
          "timeout" => timeout,
          "waitFor" => wait_for,
          "mobile" => mobile,
          "parsers" => parsers,
          "actions" => actions,
          "location" => location.is_a?(Hash) ? location : location&.to_h,
          "skipTlsVerification" => skip_tls_verification,
          "removeBase64Images" => remove_base64_images,
          "blockAds" => block_ads,
          "proxy" => proxy,
          "maxAge" => max_age,
          "storeInCache" => store_in_cache,
          "lockdown" => lockdown,
          "integration" => integration,
        }.compact
      end
    end
  end
end
