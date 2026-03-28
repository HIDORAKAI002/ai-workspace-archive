/**
 * Google Suite Tools Extended Converters - PHASE 3B: Additional Tools for 100% Coverage
 *
 * Additional Google Suite integrations for comprehensive business workflow automation
 * Supports Workspace Admin, Meet, Forms, and advanced automation features
 */

import { BaseConverter } from '../registry.js';
import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';

/**
 * Base Google Tool converter with common OAuth2 functionality
 */
abstract class BaseGoogleToolExtendedConverter extends BaseConverter {
  readonly category = 'google-tool';

  protected generateGoogleToolConfiguration(
    node: IRNode,
    _context: GenerationContext
  ): {
    imports: string[];
    packageName: string;
    className: string;
    config: Record<string, unknown>;
    auth: Record<string, unknown>;
    webhooks?: Record<string, unknown>;
    rateLimiting?: Record<string, unknown>;
  } {
    return {
      imports: this.getRequiredImports(),
      packageName: this.getPackageName(),
      className: this.getClassName(),
      config: this.extractToolConfig(node),
      auth: this.extractAuthConfig(node),
      webhooks: this.extractWebhookConfig(node),
      rateLimiting: this.extractRateLimitingConfig(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractToolConfig(node: IRNode): Record<string, unknown>;
  protected abstract getGoogleService(): string;
  protected abstract getDefaultScopes(): string[];

  protected extractAuthConfig(node: IRNode): Record<string, unknown> {
    const auth: Record<string, unknown> = {};

    // Enhanced OAuth2 configuration with multiple auth methods
    const clientId = this.getParameterValue(
      node,
      'clientId',
      'process.env.GOOGLE_CLIENT_ID'
    );
    const clientSecret = this.getParameterValue(
      node,
      'clientSecret',
      'process.env.GOOGLE_CLIENT_SECRET'
    );
    const refreshToken = this.getParameterValue(
      node,
      'refreshToken',
      'process.env.GOOGLE_REFRESH_TOKEN'
    );
    const accessToken = this.getParameterValue(node, 'accessToken', '');
    const serviceAccountKey = this.getParameterValue(
      node,
      'serviceAccountKey',
      'process.env.GOOGLE_SERVICE_ACCOUNT_KEY'
    );
    const scopes = this.getParameterValue(
      node,
      'scopes',
      this.getDefaultScopes()
    );
    const redirectUri = this.getParameterValue(
      node,
      'redirectUri',
      'process.env.GOOGLE_REDIRECT_URI'
    );

    auth.clientId =
      clientId === 'process.env.GOOGLE_CLIENT_ID'
        ? clientId
        : this.formatParameterValue(clientId);
    auth.clientSecret =
      clientSecret === 'process.env.GOOGLE_CLIENT_SECRET'
        ? clientSecret
        : this.formatParameterValue(clientSecret);
    auth.refreshToken =
      refreshToken === 'process.env.GOOGLE_REFRESH_TOKEN'
        ? refreshToken
        : this.formatParameterValue(refreshToken);
    auth.redirectUri =
      redirectUri === 'process.env.GOOGLE_REDIRECT_URI'
        ? redirectUri
        : this.formatParameterValue(redirectUri);

    if (accessToken) {
      auth.accessToken = this.formatParameterValue(accessToken);
    }

    if (serviceAccountKey !== 'process.env.GOOGLE_SERVICE_ACCOUNT_KEY') {
      auth.serviceAccountKey = this.formatParameterValue(serviceAccountKey);
    }

    auth.scopes = Array.isArray(scopes) ? scopes : [scopes];

    return auth;
  }

  protected extractWebhookConfig(node: IRNode): Record<string, unknown> {
    const webhooks: Record<string, unknown> = {};

    const webhookUrl = this.getParameterValue(node, 'webhookUrl', '');
    const enableWebhooks = this.getParameterValue(
      node,
      'enableWebhooks',
      false
    );
    const webhookSecret = this.getParameterValue(
      node,
      'webhookSecret',
      'process.env.GOOGLE_WEBHOOK_SECRET'
    );

    if (enableWebhooks && webhookUrl) {
      webhooks.enabled = true;
      webhooks.url = this.formatParameterValue(webhookUrl);
      webhooks.secret =
        webhookSecret === 'process.env.GOOGLE_WEBHOOK_SECRET'
          ? webhookSecret
          : this.formatParameterValue(webhookSecret);
    }

    return webhooks;
  }

  protected extractRateLimitingConfig(node: IRNode): Record<string, unknown> {
    const rateLimiting: Record<string, unknown> = {};

    const enableRateLimit = this.getParameterValue(
      node,
      'enableRateLimit',
      true
    );
    const requestsPerSecond = this.getParameterValue(
      node,
      'requestsPerSecond',
      10
    );
    const burstLimit = this.getParameterValue(node, 'burstLimit', 50);
    const retryOnQuota = this.getParameterValue(node, 'retryOnQuota', true);

    if (enableRateLimit) {
      rateLimiting.enabled = true;
      rateLimiting.requestsPerSecond = requestsPerSecond;
      rateLimiting.burstLimit = burstLimit;
      rateLimiting.retryOnQuota = retryOnQuota;
    }

    return rateLimiting;
  }

  convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(
      node,
      `google_${this.getGoogleService()}`
    );
    const config = this.generateGoogleToolConfiguration(node, context);
    const fragments: CodeFragment[] = [];

    // Enhanced imports with additional dependencies
    const allImports = [...config.imports, 'GoogleAuth', 'jwt', 'RateLimiter'];
    fragments.push(
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        this.generateEnhancedImports(config.packageName, allImports),
        [config.packageName, 'google-auth-library', 'googleapis'],
        node.id,
        1
      )
    );

    // Enhanced auth configuration with error handling
    if (Object.keys(config.auth).length > 0) {
      const authCode = this.generateEnhancedAuthCode(config.auth, variableName);
      fragments.push(
        this.createCodeFragment(
          `${node.id}_auth`,
          'declaration',
          authCode,
          ['google-auth', 'oauth2'],
          node.id,
          30
        )
      );
    }

    // Rate limiting configuration
    if (config.rateLimiting && Object.keys(config.rateLimiting).length > 0) {
      const rateLimitCode = this.generateRateLimitingCode(
        config.rateLimiting,
        variableName
      );
      fragments.push(
        this.createCodeFragment(
          `${node.id}_rate_limit`,
          'declaration',
          rateLimitCode,
          ['rate-limiter'],
          node.id,
          40
        )
      );
    }

    // Webhook configuration
    if (config.webhooks && Object.keys(config.webhooks).length > 0) {
      const webhookCode = this.generateWebhookCode(
        config.webhooks,
        variableName
      );
      fragments.push(
        this.createCodeFragment(
          `${node.id}_webhooks`,
          'declaration',
          webhookCode,
          ['webhooks'],
          node.id,
          50
        )
      );
    }

    // Enhanced tool initialization with error handling and validation
    const configStr = this.generateEnhancedConfigurationString(
      config.config,
      variableName
    );
    const initCode = this.generateEnhancedInitializationCode(
      config.className,
      configStr,
      variableName
    );

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        [config.className],
        node.id,
        100
      )
    );

    return fragments;
  }

  protected generateEnhancedAuthCode(
    auth: Record<string, unknown>,
    variableName: string
  ): string {
    const authEntries = Object.entries(auth);
    if (authEntries.length === 0) return '';

    const authConfig = authEntries
      .map(([key, value]) => {
        return `  ${key}: ${value}`;
      })
      .join(',\n');

    return `// Enhanced Google OAuth2 Authentication with error handling
const ${variableName}_auth = {
${authConfig}
};

// Initialize Google Auth client with automatic token refresh
const ${variableName}_authClient = new GoogleAuth({
  scopes: ${variableName}_auth.scopes,
  credentials: {
    client_id: ${variableName}_auth.clientId,
    client_secret: ${variableName}_auth.clientSecret,
    refresh_token: ${variableName}_auth.refreshToken,
    redirect_uri: ${variableName}_auth.redirectUri
  }
});

// Handle authentication errors and token refresh
${variableName}_authClient.on('tokens', (tokens) => {
  console.log('Google Auth tokens refreshed:', tokens.access_token ? 'Success' : 'Failed');
});`;
  }

  protected generateRateLimitingCode(
    rateLimiting: Record<string, unknown>,
    variableName: string
  ): string {
    if (!rateLimiting.enabled) return '';

    return `// Rate limiting configuration for Google API calls
const ${variableName}_rateLimiter = new RateLimiter({
  tokensPerInterval: ${rateLimiting.requestsPerSecond},
  interval: 1000, // 1 second
  fireImmediately: true
});

// Burst protection
const ${variableName}_burstLimiter = new RateLimiter({
  tokensPerInterval: ${rateLimiting.burstLimit},
  interval: 60000 // 1 minute
});`;
  }

  protected generateWebhookCode(
    webhooks: Record<string, unknown>,
    variableName: string
  ): string {
    if (!webhooks.enabled) return '';

    return `// Webhook configuration for real-time Google API updates
const ${variableName}_webhooks = {
  url: ${webhooks.url},
  secret: ${webhooks.secret},
  enabled: true,
  
  // Webhook verification helper
  verifySignature: (payload, signature) => {
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', ${webhooks.secret})
      .update(payload)
      .digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }
};`;
  }

  protected generateEnhancedConfigurationString(
    config: Record<string, unknown>,
    variableName: string
  ): string {
    const entries = Object.entries(config);
    if (entries.length === 0) return '{}';

    const configPairs = entries.map(([key, value]) => {
      return `${key}: ${this.formatParameterValue(value)}`;
    });

    return `{
  // Enhanced configuration with validation
  ${configPairs.join(',\n  ')},
  
  // Authentication client
  auth: ${variableName}_authClient,
  
  // Error handling configuration
  retry: {
    retries: 3,
    retryCondition: (error) => {
      return error.code === 'ECONNRESET' || 
             error.code === 'ETIMEDOUT' ||
             (error.response && error.response.status >= 500);
    },
    retryDelay: (retryCount) => Math.pow(2, retryCount) * 1000
  },
  
  // Request interceptor for rate limiting
  requestInterceptor: async (config) => {
    if (${variableName}_rateLimiter) {
      await ${variableName}_rateLimiter.removeTokens(1);
    }
    if (${variableName}_burstLimiter) {
      await ${variableName}_burstLimiter.removeTokens(1);
    }
    return config;
  }
}`;
  }

  protected generateEnhancedInitializationCode(
    className: string,
    configStr: string,
    variableName: string
  ): string {
    return `// Enhanced ${className} initialization with comprehensive error handling
try {
  const ${variableName} = new ${className}(${configStr});
  
  // Add global error handler
  ${variableName}.on('error', (error) => {
    console.error('Google ${className} error:', error.message);
    // Implement custom error handling logic here
  });
  
  // Add success logging
  console.log('Google ${className} initialized successfully');
  
} catch (error) {
  console.error('Failed to initialize Google ${className}:', error.message);
  throw new Error(\`Google ${className} initialization failed: \${error.message}\`);
}`;
  }

  protected generateEnhancedImports(
    packageName: string,
    imports: string[]
  ): string {
    const importStatements = [
      `import { ${imports.filter((imp) => !['GoogleAuth', 'jwt', 'RateLimiter'].includes(imp)).join(', ')} } from '${packageName}';`,
      "import { GoogleAuth } from 'google-auth-library';",
      "import { RateLimiter } from 'limiter';",
      "import * as jwt from 'jsonwebtoken';",
    ];

    return importStatements.join('\n');
  }
}

/**
 * Google Workspace Admin Tool Converter
 * Admin and user management automation
 */
export class GoogleWorkspaceToolConverter extends BaseGoogleToolExtendedConverter {
  readonly flowiseType = 'googleWorkspaceTool';

  protected getRequiredImports(): string[] {
    return ['GoogleWorkspaceTool', 'DirectoryAPI', 'AdminSDK'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/google_workspace';
  }

  protected getClassName(): string {
    return 'GoogleWorkspaceTool';
  }

  protected getGoogleService(): string {
    return 'workspace';
  }

  protected extractToolConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Enhanced Google Workspace configuration for admin operations
    const domain = this.getParameterValue(node, 'domain', '');
    const customerID = this.getParameterValue(node, 'customerID', '');
    const maxResults = this.getParameterValue(node, 'maxResults', 100);
    const includeDeletedUsers = this.getParameterValue(
      node,
      'includeDeletedUsers',
      false
    );
    const includeGroups = this.getParameterValue(node, 'includeGroups', true);
    const includeOrgUnits = this.getParameterValue(
      node,
      'includeOrgUnits',
      true
    );
    const enableUserManagement = this.getParameterValue(
      node,
      'enableUserManagement',
      false
    );
    const enableGroupManagement = this.getParameterValue(
      node,
      'enableGroupManagement',
      false
    );
    const enableDeviceManagement = this.getParameterValue(
      node,
      'enableDeviceManagement',
      false
    );
    const enableReporting = this.getParameterValue(
      node,
      'enableReporting',
      true
    );
    const enableAuditLogs = this.getParameterValue(
      node,
      'enableAuditLogs',
      true
    );
    const adminRoles = this.getParameterValue(node, 'adminRoles', []);

    if (domain) {
      config.domain = domain;
    }

    if (customerID) {
      config.customerID = customerID;
    }

    config.maxResults = maxResults;
    config.includeDeletedUsers = includeDeletedUsers;
    config.includeGroups = includeGroups;
    config.includeOrgUnits = includeOrgUnits;
    config.enableUserManagement = enableUserManagement;
    config.enableGroupManagement = enableGroupManagement;
    config.enableDeviceManagement = enableDeviceManagement;
    config.enableReporting = enableReporting;
    config.enableAuditLogs = enableAuditLogs;

    if (Array.isArray(adminRoles) && adminRoles.length > 0) {
      config.adminRoles = adminRoles;
    }

    return config;
  }

  protected getDefaultScopes(): string[] {
    return [
      'https://www.googleapis.com/auth/admin.directory.user.readonly',
      'https://www.googleapis.com/auth/admin.directory.group.readonly',
      'https://www.googleapis.com/auth/admin.directory.orgunit.readonly',
      'https://www.googleapis.com/auth/admin.reports.audit.readonly',
      'https://www.googleapis.com/auth/admin.directory.user',
      'https://www.googleapis.com/auth/admin.directory.group',
    ];
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return [
      'googleapis',
      '@langchain/community',
      'google-auth-library',
      'limiter',
      'jsonwebtoken',
      'crypto',
    ];
  }
}

/**
 * Google Meet Tool Converter
 * Video conferencing integration and automation
 */
export class GoogleMeetToolConverter extends BaseGoogleToolExtendedConverter {
  readonly flowiseType = 'googleMeetTool';

  protected getRequiredImports(): string[] {
    return ['GoogleMeetTool', 'MeetAPI'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/google_meet';
  }

  protected getClassName(): string {
    return 'GoogleMeetTool';
  }

  protected getGoogleService(): string {
    return 'meet';
  }

  protected extractToolConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Enhanced Google Meet configuration for video conferencing
    const spaceType = this.getParameterValue(node, 'spaceType', 'MEETING_ROOM');
    const maxParticipants = this.getParameterValue(
      node,
      'maxParticipants',
      100
    );
    const enableRecording = this.getParameterValue(
      node,
      'enableRecording',
      false
    );
    const enableTranscription = this.getParameterValue(
      node,
      'enableTranscription',
      false
    );
    const enableBreakoutRooms = this.getParameterValue(
      node,
      'enableBreakoutRooms',
      false
    );
    const enableChat = this.getParameterValue(node, 'enableChat', true);
    const enableScreenShare = this.getParameterValue(
      node,
      'enableScreenShare',
      true
    );
    const enableWaitingRoom = this.getParameterValue(
      node,
      'enableWaitingRoom',
      false
    );
    const requireModerator = this.getParameterValue(
      node,
      'requireModerator',
      false
    );
    const allowExternalParticipants = this.getParameterValue(
      node,
      'allowExternalParticipants',
      true
    );
    const recordingFormat = this.getParameterValue(
      node,
      'recordingFormat',
      'mp4'
    );
    const transcriptionLanguage = this.getParameterValue(
      node,
      'transcriptionLanguage',
      'en-US'
    );
    const timezone = this.getParameterValue(node, 'timezone', 'UTC');

    config.spaceType = spaceType;
    config.maxParticipants = maxParticipants;
    config.enableRecording = enableRecording;
    config.enableTranscription = enableTranscription;
    config.enableBreakoutRooms = enableBreakoutRooms;
    config.enableChat = enableChat;
    config.enableScreenShare = enableScreenShare;
    config.enableWaitingRoom = enableWaitingRoom;
    config.requireModerator = requireModerator;
    config.allowExternalParticipants = allowExternalParticipants;
    config.recordingFormat = recordingFormat;
    config.transcriptionLanguage = transcriptionLanguage;
    config.timezone = timezone;

    return config;
  }

  protected getDefaultScopes(): string[] {
    return [
      'https://www.googleapis.com/auth/meetings.space.created',
      'https://www.googleapis.com/auth/meetings.space.readonly',
      'https://www.googleapis.com/auth/calendar.events',
    ];
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return [
      'googleapis',
      '@langchain/community',
      'google-auth-library',
      'limiter',
      'jsonwebtoken',
      'crypto',
    ];
  }
}

/**
 * Google Forms Tool Converter
 * Forms creation and response automation
 */
export class GoogleFormsToolConverter extends BaseGoogleToolExtendedConverter {
  readonly flowiseType = 'googleFormsTool';

  protected getRequiredImports(): string[] {
    return ['GoogleFormsTool', 'FormsAPI'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/google_forms';
  }

  protected getClassName(): string {
    return 'GoogleFormsTool';
  }

  protected getGoogleService(): string {
    return 'forms';
  }

  protected extractToolConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Enhanced Google Forms configuration for form automation
    const formId = this.getParameterValue(node, 'formId', '');
    const includeGridInfo = this.getParameterValue(
      node,
      'includeGridInfo',
      false
    );
    const includeFormResponses = this.getParameterValue(
      node,
      'includeFormResponses',
      true
    );
    const maxResponses = this.getParameterValue(node, 'maxResponses', 1000);
    const enableCollectEmail = this.getParameterValue(
      node,
      'enableCollectEmail',
      false
    );
    const enableLimitOneResponse = this.getParameterValue(
      node,
      'enableLimitOneResponse',
      false
    );
    const enableProgressBar = this.getParameterValue(
      node,
      'enableProgressBar',
      true
    );
    const enableShuffleQuestions = this.getParameterValue(
      node,
      'enableShuffleQuestions',
      false
    );
    const enableQuizMode = this.getParameterValue(
      node,
      'enableQuizMode',
      false
    );
    const publishingSummary = this.getParameterValue(
      node,
      'publishingSummary',
      false
    );
    const confirmationMessage = this.getParameterValue(
      node,
      'confirmationMessage',
      ''
    );
    const customClosedFormMessage = this.getParameterValue(
      node,
      'customClosedFormMessage',
      ''
    );
    const responseValidation = this.getParameterValue(
      node,
      'responseValidation',
      true
    );
    const autoSave = this.getParameterValue(node, 'autoSave', true);
    const allowResponseEditing = this.getParameterValue(
      node,
      'allowResponseEditing',
      false
    );

    if (formId) {
      config.formId = formId;
    }

    config.includeGridInfo = includeGridInfo;
    config.includeFormResponses = includeFormResponses;
    config.maxResponses = maxResponses;
    config.enableCollectEmail = enableCollectEmail;
    config.enableLimitOneResponse = enableLimitOneResponse;
    config.enableProgressBar = enableProgressBar;
    config.enableShuffleQuestions = enableShuffleQuestions;
    config.enableQuizMode = enableQuizMode;
    config.publishingSummary = publishingSummary;
    config.responseValidation = responseValidation;
    config.autoSave = autoSave;
    config.allowResponseEditing = allowResponseEditing;

    if (confirmationMessage) {
      config.confirmationMessage = confirmationMessage;
    }

    if (customClosedFormMessage) {
      config.customClosedFormMessage = customClosedFormMessage;
    }

    return config;
  }

  protected getDefaultScopes(): string[] {
    return [
      'https://www.googleapis.com/auth/forms.body.readonly',
      'https://www.googleapis.com/auth/forms.responses.readonly',
      'https://www.googleapis.com/auth/forms.body',
      'https://www.googleapis.com/auth/forms.responses',
    ];
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return [
      'googleapis',
      '@langchain/community',
      'google-auth-library',
      'limiter',
      'jsonwebtoken',
      'crypto',
    ];
  }
}
