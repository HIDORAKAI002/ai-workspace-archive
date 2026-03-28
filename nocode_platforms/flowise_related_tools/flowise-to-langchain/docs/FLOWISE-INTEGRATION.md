# Flowise API Integration Guide

## Overview

The Flowise integration allows you to directly import chatflows and agentflows from your Flowise instance into the converter for seamless LangChain code generation. This eliminates the need to manually export and upload JSON files.

## Features

- **Direct API Connection**: Connect to any Flowise instance with API access
- **Flow Browser**: Browse, search, and filter available flows
- **Bulk Import**: Import multiple flows simultaneously
- **Flow Preview**: Preview flow details before importing
- **Secure Storage**: Encrypted API key storage
- **Real-time Status**: Connection monitoring and health checks
- **Error Recovery**: Robust error handling with retry mechanisms

## Setup Instructions

### 1. Configure Flowise Instance

Ensure your Flowise instance has API access enabled:

```bash
# For self-hosted Flowise, ensure API is accessible
# Default: http://localhost:3000

# For cloud Flowise, use your instance URL
# Example: https://your-instance.flowiseai.com
```

### 2. Generate API Key

1. Log into your Flowise instance
2. Navigate to **Settings** → **API Keys**
3. Generate a new API key with appropriate permissions:
   - **Read**: Required for browsing and importing flows
   - **Write**: Optional for future features

### 3. Configure Integration

1. Open the Flowise Converter application
2. Navigate to **Settings** → **Flowise Configuration**
3. Enter your configuration:
   - **Server URL**: Your Flowise instance URL
   - **API Key**: The generated API key
4. Click **Test Connection** to verify setup
5. Save configuration

## Using the Integration

### Browsing Flows

1. Navigate to **Workspace** → **Flowise Integration**
2. Flows will automatically load from your configured instance
3. Use the search and filter options to find specific flows:
   - **Search**: Filter by flow name or description
   - **Category**: Filter by flow category
   - **Status**: Filter by deployment status
   - **Visibility**: Filter by public/private flows

### Importing Flows

#### Single Flow Import

1. Click on any flow card to open the preview
2. Review flow details:
   - Node count and complexity
   - Categories and tags
   - Last updated date
   - Compatibility status
3. Click **Import Flow** to begin import
4. Monitor progress in the import wizard
5. Access imported flow in the workspace

#### Bulk Import

1. Enable bulk selection mode
2. Select multiple flows using checkboxes
3. Click **Import Selected** (maximum 10 flows per batch)
4. Monitor bulk import progress
5. Review import summary

### Flow Preview

The preview modal provides comprehensive flow information:

- **Metadata**: Name, description, category, dates
- **Structure**: Node count, edge count, complexity analysis
- **Compatibility**: Supported/unsupported node types
- **Validation**: Flow integrity and format checks

## Configuration Options

### Advanced Settings

Access advanced configuration via **Settings** → **Flowise Configuration** → **Advanced**:

- **Connection Timeout**: API request timeout (default: 10 seconds)
- **Retry Attempts**: Number of retry attempts for failed requests (default: 3)
- **Cache Duration**: How long to cache flow listings (default: 5 minutes)
- **Rate Limiting**: Requests per minute limit (default: 60)

### Environment Variables

For production deployments, configure via environment variables:

```bash
# Flowise instance URL
NEXT_PUBLIC_FLOWISE_URL=https://your-flowise.com

# API key (server-side only)
FLOWISE_API_KEY=your-api-key-here

# Optional: Override default settings
FLOWISE_TIMEOUT=15000
FLOWISE_MAX_RETRIES=5
FLOWISE_CACHE_TTL=300000
```

## Security Considerations

### API Key Security

- **Encryption**: API keys are encrypted using AES-256-GCM with browser fingerprinting
- **Storage**: Encrypted keys stored in browser localStorage
- **Transmission**: All requests use HTTPS with secure headers
- **Rotation**: Regularly rotate API keys for enhanced security

### Access Control

- Use API keys with minimal required permissions
- Consider creating dedicated API keys for the converter
- Monitor API key usage in Flowise logs
- Revoke unused or compromised keys immediately

### Network Security

- Ensure Flowise instance uses HTTPS in production
- Configure appropriate CORS policies
- Use VPN or private networks for internal instances
- Monitor network traffic for suspicious activity

## Troubleshooting

### Connection Issues

**Problem**: "Failed to connect to Flowise instance"

**Solutions**:
1. Verify server URL is correct and accessible
2. Check API key validity and permissions
3. Ensure Flowise instance is running
4. Check network connectivity and firewall settings
5. Verify CORS configuration allows requests

**Problem**: "Authentication failed"

**Solutions**:
1. Regenerate API key in Flowise
2. Check API key format and special characters
3. Verify API key permissions
4. Clear browser storage and reconfigure

### Import Issues

**Problem**: "Flow import failed"

**Solutions**:
1. Check flow compatibility status
2. Verify flow format and structure
3. Try importing individual flows instead of bulk
4. Check converter logs for detailed error messages

**Problem**: "Some nodes are unsupported"

**Solutions**:
1. Review compatibility warnings in preview
2. Update converter to latest version
3. Check documentation for supported node types
4. Consider manual conversion for unsupported nodes

### Performance Issues

**Problem**: "Slow flow loading"

**Solutions**:
1. Check network latency to Flowise instance
2. Reduce cache TTL for more frequent updates
3. Use pagination for large flow libraries
4. Clear cache and refresh flow list

## API Reference

### Supported Endpoints

The integration uses the following Flowise API endpoints:

- `GET /api/v1/chatflows` - List all chatflows
- `GET /api/v1/chatflows/{id}` - Get specific chatflow
- `GET /api/v1/agentflows` - List all agentflows  
- `GET /api/v1/agentflows/{id}` - Get specific agentflow
- `GET /api/v1/health` - Health check

### Request Format

All requests include:
- `Authorization: Bearer {api-key}` header
- `Content-Type: application/json` header
- Request timeout and retry logic
- Rate limiting compliance

### Response Handling

The client handles various response scenarios:
- **200 OK**: Successful responses with data
- **401 Unauthorized**: Invalid or expired API key
- **404 Not Found**: Flow or endpoint not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server-side errors

## Best Practices

### Performance Optimization

1. **Caching**: Enable flow list caching for better performance
2. **Pagination**: Use search and filters to reduce data transfer
3. **Batch Operations**: Import multiple flows in batches
4. **Connection Pooling**: Reuse connections for multiple requests

### Error Handling

1. **Graceful Degradation**: Handle API unavailability gracefully
2. **User Feedback**: Provide clear error messages and recovery options
3. **Retry Logic**: Implement exponential backoff for transient errors
4. **Logging**: Log integration events for debugging

### Monitoring

1. **Health Checks**: Monitor Flowise instance availability
2. **Performance Metrics**: Track import success rates and timing
3. **Error Rates**: Monitor and alert on high error rates
4. **Usage Analytics**: Track feature adoption and usage patterns

## Migration Guide

### From Manual Export/Import

1. Configure Flowise integration as described above
2. Test connection and browse existing flows
3. Import flows directly instead of manual export
4. Update workflows to use integrated import process

### Batch Migration

For migrating many flows:

1. Use bulk import feature for efficiency
2. Start with smaller batches to verify process
3. Monitor import success rates
4. Handle any compatibility issues systematically

## Changelog

### v2.1.0 (Latest)
- Added bulk import functionality
- Enhanced flow preview with compatibility checking
- Improved error handling and retry logic
- Added advanced configuration options

### v2.0.0
- Initial Flowise integration release
- Basic flow import and preview
- API key encryption and secure storage
- Connection testing and validation

## Support

For technical support:

1. Check troubleshooting section above
2. Review converter logs for detailed error information
3. Verify Flowise instance configuration
4. Submit issues with detailed reproduction steps

For feature requests:
- Submit enhancement requests with use case descriptions
- Include examples of desired functionality
- Provide feedback on existing features

## Related Documentation

- [Flowise API Documentation](https://docs.flowiseai.com/api)
- [Converter Configuration Guide](./CONFIGURATION.md)
- [Security Best Practices](./SECURITY.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)