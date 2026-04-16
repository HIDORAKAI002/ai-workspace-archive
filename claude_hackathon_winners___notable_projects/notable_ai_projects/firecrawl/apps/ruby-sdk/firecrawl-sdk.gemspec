# frozen_string_literal: true

require_relative "lib/firecrawl/version"

Gem::Specification.new do |spec|
  spec.name = "firecrawl-sdk"
  spec.version = Firecrawl::VERSION
  spec.authors = ["Firecrawl"]
  spec.email = ["hello@firecrawl.dev"]

  spec.summary = "Ruby SDK for the Firecrawl v2 web scraping API"
  spec.description = "A type-safe Ruby client for the Firecrawl v2 API. " \
                     "Supports scraping, crawling, batch scraping, URL mapping, " \
                     "web search, and AI agent operations."
  spec.homepage = "https://github.com/mendableai/firecrawl"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.0.0"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/mendableai/firecrawl/tree/main/apps/ruby-sdk"
  spec.metadata["changelog_uri"] = "https://github.com/mendableai/firecrawl/releases"
  spec.metadata["rubygems_mfa_required"] = "true"

  spec.files = Dir["lib/**/*.rb", "LICENSE", "README.md"]
  spec.require_paths = ["lib"]
end
