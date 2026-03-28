# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-04-03

### Fixed

- Removed circular dependency in package.json that caused version resolution issues
- Fixed location format handling to properly support multi-region formats like "US"
- Improved error handling for different location format specifications
- Default region set to "EU"

## [1.0.0] - 2024-12-13

### Breaking Changes
- Switch from positional to named command-line arguments
  - Old: `mcp-server-bigquery project-id location`
  - New: `mcp-server-bigquery --project-id project-id --location location`

### Added
- Service account authentication support via `--key-file` parameter
- Stronger read-only validation using regex to detect forbidden SQL commands
- Explicit view support with clear labeling in resource listings
- Enhanced logging to show both table and view counts
- Project logo and improved visual documentation

### Changed
- Improved README with clearer setup instructions and MCP context
- Updated configuration examples for Claude Desktop
- Enhanced npm publish workflow with version validation
- Reorganized documentation for better user experience

### Fixed
- Updated Claude Desktop config paths in developer setup guide

## [0.1.0] - 2024-12-04

### Added
- Initial release of BigQuery MCP server
- Read-only access to BigQuery datasets
- Support for executing SQL queries with 1GB billing limit
- Authentication via Google Cloud CLI
- Table schema information access
- MIT License file

### Changed
- Updated package configuration and dependencies
- Improved README documentation with correct configuration examples

### Dependencies
- Added @modelcontextprotocol/sdk: 0.6.0
- Added @google-cloud/bigquery: ^7.3.0
- Added development dependencies: shx and typescript

[1.0.3]: <https://github.com/ergut/mcp-bigquery-server/compare/v1.0.0...v1.0.3>
[1.0.0]: https://github.com/ergut/mcp-bigquery-server/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/ergut/mcp-bigquery-server/releases/tag/v0.1.0