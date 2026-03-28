/**
 * Business Tools Converters - Enterprise workflow integration tools
 *
 * Comprehensive business tool converters for project management,
 * payment processing, database/CRM, knowledge management,
 * team communication, and enterprise CRM systems.
 */

import { BaseConverter } from '../registry.js';
import type {
  IRNode,
  CodeFragment,
  GenerationContext,
} from '../../ir/types.js';

// ============================================================================
// Base Business Tool Converter
// ============================================================================

/**
 * Base class for all business tool converters
 */
abstract class BaseBusinessToolConverter extends BaseConverter {
  readonly category = 'business-tool';
  readonly priority = 5;

  abstract readonly toolType: string;
  abstract readonly businessCategory:
    | 'project-management'
    | 'payment'
    | 'database'
    | 'knowledge'
    | 'communication'
    | 'crm';

  /**
   * Common business tool validation
   */
  protected validateBusinessToolConfig(node: IRNode): boolean {
    const data = node.parameters;

    if (!data || !Array.isArray(data)) {
      return false;
    }

    // Check for essential business tool properties
    const hasApiKey = data.some((p) =>
      ['apiKey', 'api_key', 'token', 'credentials'].includes(p.name)
    );
    const hasConfiguration = data.some((p) =>
      ['configuration', 'config'].includes(p.name)
    );
    const hasName = data.some((p) => ['name', 'toolName'].includes(p.name));

    return hasApiKey || hasConfiguration || hasName;
  }

  /**
   * Extract inputs from node parameters
   */
  protected extractInputs(node: IRNode): Record<string, any> {
    const inputs: Record<string, any> = {};

    if (node.parameters && Array.isArray(node.parameters)) {
      node.parameters.forEach((param) => {
        inputs[param.name] = param.value;
      });
    }

    return inputs;
  }

  /**
   * Generate business tool dependencies
   */
  protected getBusinessToolDependencies(toolType: string): string[] {
    const baseDeps = ['@langchain/core', '@langchain/community'];

    switch (toolType) {
      case 'jira':
        return [...baseDeps, 'jira-client', 'node-jira-client'];
      case 'stripe':
        return [...baseDeps, 'stripe'];
      case 'airtable':
        return [...baseDeps, 'airtable'];
      case 'notion':
        return [...baseDeps, '@notionhq/client'];
      case 'slack':
        return [...baseDeps, '@slack/web-api'];
      case 'hubspot':
        return [...baseDeps, '@hubspot/api-client'];
      case 'salesforce':
        return [...baseDeps, 'jsforce', 'salesforce-api'];
      default:
        return baseDeps;
    }
  }

  /**
   * Generate common business tool configuration
   */
  protected generateBusinessToolConfig(
    node: IRNode,
    _context: GenerationContext,
    toolSpecificConfig: any = {}
  ): Record<string, any> {
    const inputs = this.extractInputs(node);

    return {
      _type: this.toolType,
      name: inputs['name'] || inputs['toolName'] || this.toolType,
      description:
        inputs['description'] || `${this.toolType} business tool integration`,
      ...toolSpecificConfig,
      // Authentication
      apiKey: inputs['apiKey'] || inputs['api_key'] || inputs['token'],
      credentials: inputs['credentials'],
      // Configuration
      configuration: inputs['configuration'] || inputs['config'],
      // Tool metadata
      toolMetadata: {
        category: this.businessCategory,
        toolType: this.toolType,
        enterprise: true,
        businessTool: true,
      },
    };
  }

  /**
   * Helper to create business tool code fragments
   */
  protected createBusinessToolFragments(
    node: IRNode,
    config: Record<string, any>,
    toolClass: string,
    importPath: string
  ): CodeFragment[] {
    const fragments: CodeFragment[] = [];
    const nodeId = node.id;

    // Import fragment
    fragments.push(
      this.createCodeFragment(
        `import-${nodeId}`,
        'import',
        `import { ${toolClass} } from '${importPath}';`,
        [importPath],
        nodeId,
        0
      )
    );

    // Configuration fragment
    fragments.push(
      this.createCodeFragment(
        `config-${nodeId}`,
        'declaration',
        `const ${node.id}Config = ${JSON.stringify(config, null, 2)};`,
        [],
        nodeId,
        1
      )
    );

    // Initialization fragment
    fragments.push(
      this.createCodeFragment(
        `init-${nodeId}`,
        'initialization',
        `const ${node.id} = new ${toolClass}(${node.id}Config);`,
        [],
        nodeId,
        2
      )
    );

    return fragments;
  }
}

// ============================================================================
// Jira Tool Converter - Project Management
// ============================================================================

class JiraToolConverter extends BaseBusinessToolConverter {
  readonly flowiseType = 'jiraTool';
  readonly langchainType = 'JiraTool';
  readonly toolType = 'jira';
  readonly businessCategory = 'project-management' as const;

  override canConvert(node: IRNode): boolean {
    return (
      node.type === 'jiraTool' ||
      node.type === 'jira' ||
      this.validateBusinessToolConfig(node)
    );
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const inputs = this.extractInputs(node);

    const config = this.generateBusinessToolConfig(node, context, {
      // Jira-specific configuration
      jiraUrl: inputs['jiraUrl'] || inputs['baseUrl'] || inputs['host'],
      username: inputs['username'] || inputs['email'],
      apiToken: inputs['apiToken'] || inputs['token'],
      projectKey: inputs['projectKey'] || inputs['project'],

      // Jira capabilities
      capabilities: {
        createIssue: inputs['canCreateIssue'] !== false,
        updateIssue: inputs['canUpdateIssue'] !== false,
        searchIssues: inputs['canSearchIssues'] !== false,
        getIssue: inputs['canGetIssue'] || false,
        deleteIssue: inputs['canDeleteIssue'] || false,
        manageProjects: inputs['canManageProjects'] || false,
        manageUsers: inputs['canManageUsers'] || false,
      },

      // Issue type mappings
      issueTypes: inputs['issueTypes'] || ['Task', 'Bug', 'Story', 'Epic'],

      // Custom fields
      customFields: inputs['customFields'] || {},

      // Workflow configuration
      workflows: inputs['workflows'] || [],

      // Notification settings
      notifications: {
        enabled: inputs['notificationsEnabled'] !== false,
        events: inputs['notificationEvents'] || [
          'issue_created',
          'issue_updated',
        ],
      },
    });

    return this.createBusinessToolFragments(
      node,
      config,
      'JiraTool',
      '@langchain/community/tools/jira'
    );
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    return this.getBusinessToolDependencies('jira');
  }
}

// ============================================================================
// Stripe Tool Converter - Payment Processing
// ============================================================================

class StripeToolConverter extends BaseBusinessToolConverter {
  readonly flowiseType = 'stripeTool';
  readonly langchainType = 'StripeTool';
  readonly toolType = 'stripe';
  readonly businessCategory = 'payment' as const;

  override canConvert(node: IRNode): boolean {
    return (
      node.type === 'stripeTool' ||
      node.type === 'stripe' ||
      this.validateBusinessToolConfig(node)
    );
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const inputs = this.extractInputs(node);

    const config = this.generateBusinessToolConfig(node, context, {
      // Stripe-specific configuration
      secretKey: inputs['secretKey'] || inputs['apiKey'],
      publishableKey: inputs['publishableKey'],
      webhookSecret: inputs['webhookSecret'],
      apiVersion: inputs['apiVersion'] || '2023-10-16',

      // Stripe capabilities
      capabilities: {
        createPayment: inputs['canCreatePayment'] !== false,
        refundPayment: inputs['canRefundPayment'] !== false,
        retrievePayment: inputs['canRetrievePayment'] !== false,
        listPayments: inputs['canListPayments'] !== false,
        manageCustomers: inputs['canManageCustomers'] !== false,
        manageProducts: inputs['canManageProducts'] || false,
        manageSubscriptions: inputs['canManageSubscriptions'] || false,
        handleWebhooks: inputs['canHandleWebhooks'] || false,
      },

      // Payment configuration
      currency: inputs['defaultCurrency'] || 'usd',
      paymentMethods: inputs['paymentMethods'] || ['card', 'bank_transfer'],

      // Customer settings
      customerDefaults: {
        taxExempt: inputs['customerTaxExempt'] || 'none',
        invoiceSettings: inputs['customerInvoiceSettings'] || {},
      },

      // Webhook configuration
      webhookEndpoints: inputs['webhookEndpoints'] || [],

      // Security settings
      security: {
        validateWebhooks: inputs['validateWebhooks'] !== false,
        allowedOrigins: inputs['allowedOrigins'] || [],
      },
    });

    return this.createBusinessToolFragments(
      node,
      config,
      'StripeTool',
      '@langchain/community/tools/stripe'
    );
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    return this.getBusinessToolDependencies('stripe');
  }
}

// ============================================================================
// Airtable Tool Converter - Database/CRM
// ============================================================================

class AirtableToolConverter extends BaseBusinessToolConverter {
  readonly flowiseType = 'airtableTool';
  readonly langchainType = 'AirtableTool';
  readonly toolType = 'airtable';
  readonly businessCategory = 'database' as const;

  override canConvert(node: IRNode): boolean {
    return (
      node.type === 'airtableTool' ||
      node.type === 'airtable' ||
      this.validateBusinessToolConfig(node)
    );
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const inputs = this.extractInputs(node);

    const config = this.generateBusinessToolConfig(node, context, {
      // Airtable-specific configuration
      apiKey: inputs['personalAccessToken'] || inputs['apiKey'],
      baseId: inputs['baseId'] || inputs['base'],
      tableId: inputs['tableId'] || inputs['table'],

      // Airtable capabilities
      capabilities: {
        createRecord: inputs['canCreateRecord'] !== false,
        updateRecord: inputs['canUpdateRecord'] !== false,
        deleteRecord: inputs['canDeleteRecord'] || false,
        listRecords: inputs['canListRecords'] !== false,
        getRecord: inputs['canGetRecord'] !== false,
        bulkOperations: inputs['canBulkOperations'] || false,
      },

      // Field mappings
      fieldMappings: inputs['fieldMappings'] || {},

      // View configuration
      view: inputs['view'] || inputs['viewName'],

      // Filtering and sorting
      filterFormula: inputs['filterFormula'],
      sort: inputs['sort'] || [],

      // Pagination
      maxRecords: inputs['maxRecords'] || 100,
      pageSize: inputs['pageSize'] || 20,

      // Data transformation
      transformations: {
        dateFormat: inputs['dateFormat'] || 'YYYY-MM-DD',
        timeZone: inputs['timeZone'] || 'UTC',
        numberFormat: inputs['numberFormat'] || 'decimal',
      },
    });

    return this.createBusinessToolFragments(
      node,
      config,
      'AirtableTool',
      '@langchain/community/tools/airtable'
    );
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    return this.getBusinessToolDependencies('airtable');
  }
}

// ============================================================================
// Notion Tool Converter - Knowledge Management
// ============================================================================

class NotionToolConverter extends BaseBusinessToolConverter {
  readonly flowiseType = 'notionTool';
  readonly langchainType = 'NotionTool';
  readonly toolType = 'notion';
  readonly businessCategory = 'knowledge' as const;

  override canConvert(node: IRNode): boolean {
    return (
      node.type === 'notionTool' ||
      node.type === 'notion' ||
      this.validateBusinessToolConfig(node)
    );
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const inputs = this.extractInputs(node);

    const config = this.generateBusinessToolConfig(node, context, {
      // Notion-specific configuration
      auth: inputs['integrationToken'] || inputs['apiKey'],
      notionVersion: inputs['notionVersion'] || '2022-06-28',

      // Notion capabilities
      capabilities: {
        createPage: inputs['canCreatePage'] !== false,
        updatePage: inputs['canUpdatePage'] !== false,
        deletePage: inputs['canDeletePage'] || false,
        queryDatabase: inputs['canQueryDatabase'] !== false,
        createDatabase: inputs['canCreateDatabase'] || false,
        updateDatabase: inputs['canUpdateDatabase'] || false,
        searchPages: inputs['canSearchPages'] !== false,
        manageBlocks: inputs['canManageBlocks'] || false,
      },

      // Database configuration
      databaseId: inputs['databaseId'],

      // Page configuration
      pageId: inputs['pageId'],
      parentPageId: inputs['parentPageId'],

      // Content formatting
      formatting: {
        richText: inputs['useRichText'] !== false,
        markdown: inputs['convertToMarkdown'] || false,
        codeBlocks: inputs['preserveCodeBlocks'] !== false,
      },

      // Query configuration
      filter: inputs['filter'] || {},
      sorts: inputs['sorts'] || [],

      // Workspace settings
      workspace: {
        id: inputs['workspaceId'],
        type: inputs['workspaceType'] || 'workspace',
      },
    });

    return this.createBusinessToolFragments(
      node,
      config,
      'NotionTool',
      '@langchain/community/tools/notion'
    );
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    return this.getBusinessToolDependencies('notion');
  }
}

// ============================================================================
// Slack Tool Converter - Team Communication
// ============================================================================

class SlackToolConverter extends BaseBusinessToolConverter {
  readonly flowiseType = 'slackTool';
  readonly langchainType = 'SlackTool';
  readonly toolType = 'slack';
  readonly businessCategory = 'communication' as const;

  override canConvert(node: IRNode): boolean {
    return (
      node.type === 'slackTool' ||
      node.type === 'slack' ||
      this.validateBusinessToolConfig(node)
    );
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const inputs = this.extractInputs(node);

    const config = this.generateBusinessToolConfig(node, context, {
      // Slack-specific configuration
      token: inputs['botToken'] || inputs['apiKey'],
      signingSecret: inputs['signingSecret'],
      appToken: inputs['appToken'],

      // Slack capabilities
      capabilities: {
        sendMessage: inputs['canSendMessage'] !== false,
        updateMessage: inputs['canUpdateMessage'] !== false,
        deleteMessage: inputs['canDeleteMessage'] || false,
        readMessages: inputs['canReadMessages'] !== false,
        manageChannels: inputs['canManageChannels'] || false,
        manageUsers: inputs['canManageUsers'] || false,
        fileUpload: inputs['canUploadFiles'] || false,
        reactions: inputs['canReact'] || false,
      },

      // Channel configuration
      defaultChannel: inputs['defaultChannel'] || '#general',
      allowedChannels: inputs['allowedChannels'] || [],

      // Message formatting
      formatting: {
        markdown: inputs['useMarkdown'] !== false,
        mentions: inputs['allowMentions'] !== false,
        threads: inputs['supportThreads'] !== false,
        attachments: inputs['supportAttachments'] !== false,
      },

      // Bot configuration
      botSettings: {
        name: inputs['botName'] || 'LangChain Bot',
        emoji: inputs['botEmoji'] || ':robot_face:',
        unfurlLinks: inputs['unfurlLinks'] !== false,
        unfurlMedia: inputs['unfurlMedia'] !== false,
      },

      // Event handling
      events: {
        messageEvents: inputs['messageEvents'] || ['message'],
        appMentions: inputs['handleAppMentions'] !== false,
        reactions: inputs['handleReactions'] || false,
      },
    });

    return this.createBusinessToolFragments(
      node,
      config,
      'SlackTool',
      '@langchain/community/tools/slack'
    );
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    return this.getBusinessToolDependencies('slack');
  }
}

// ============================================================================
// HubSpot Tool Converter - CRM and Marketing
// ============================================================================

class HubSpotToolConverter extends BaseBusinessToolConverter {
  readonly flowiseType = 'hubspotTool';
  readonly langchainType = 'HubSpotTool';
  readonly toolType = 'hubspot';
  readonly businessCategory = 'crm' as const;

  override canConvert(node: IRNode): boolean {
    return (
      node.type === 'hubspotTool' ||
      node.type === 'hubspot' ||
      this.validateBusinessToolConfig(node)
    );
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const inputs = this.extractInputs(node);

    const config = this.generateBusinessToolConfig(node, context, {
      // HubSpot-specific configuration
      accessToken: inputs['accessToken'] || inputs['apiKey'],
      portalId: inputs['portalId'] || inputs['hubId'],

      // HubSpot capabilities
      capabilities: {
        manageContacts: inputs['canManageContacts'] !== false,
        manageCompanies: inputs['canManageCompanies'] !== false,
        manageDeals: inputs['canManageDeals'] !== false,
        manageTickets: inputs['canManageTickets'] || false,
        manageLists: inputs['canManageLists'] || false,
        manageEmails: inputs['canManageEmails'] || false,
        runReports: inputs['canRunReports'] || false,
        manageWorkflows: inputs['canManageWorkflows'] || false,
      },

      // CRM configuration
      crmSettings: {
        defaultOwner: inputs['defaultOwner'],
        pipeline: inputs['defaultPipeline'],
        leadStatus: inputs['defaultLeadStatus'],
        contactLifecycle: inputs['defaultContactLifecycle'],
      },

      // Marketing configuration
      marketingSettings: {
        emailCampaigns: inputs['enableEmailCampaigns'] || false,
        leadScoring: inputs['enableLeadScoring'] || false,
        automation: inputs['enableAutomation'] || false,
      },

      // Data synchronization
      sync: {
        bidirectional: inputs['bidirectionalSync'] || false,
        realTime: inputs['realTimeSync'] || false,
        batchSize: inputs['batchSize'] || 100,
      },

      // Custom properties
      customProperties: inputs['customProperties'] || {},

      // Webhooks
      webhooks: {
        enabled: inputs['webhooksEnabled'] || false,
        url: inputs['webhookUrl'],
        events: inputs['webhookEvents'] || [],
      },
    });

    return this.createBusinessToolFragments(
      node,
      config,
      'HubSpotTool',
      '@langchain/community/tools/hubspot'
    );
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    return this.getBusinessToolDependencies('hubspot');
  }
}

// ============================================================================
// Salesforce Tool Converter - Enterprise CRM
// ============================================================================

class SalesforceToolConverter extends BaseBusinessToolConverter {
  readonly flowiseType = 'salesforceTool';
  readonly langchainType = 'SalesforceTool';
  readonly toolType = 'salesforce';
  readonly businessCategory = 'crm' as const;

  override canConvert(node: IRNode): boolean {
    return (
      node.type === 'salesforceTool' ||
      node.type === 'salesforce' ||
      this.validateBusinessToolConfig(node)
    );
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const inputs = this.extractInputs(node);

    const config = this.generateBusinessToolConfig(node, context, {
      // Salesforce-specific configuration
      username: inputs['username'],
      password: inputs['password'],
      securityToken: inputs['securityToken'],
      clientId: inputs['clientId'] || inputs['consumerKey'],
      clientSecret: inputs['clientSecret'] || inputs['consumerSecret'],
      loginUrl: inputs['loginUrl'] || 'https://login.salesforce.com',
      apiVersion: inputs['apiVersion'] || '58.0',

      // Salesforce capabilities
      capabilities: {
        manageAccounts: inputs['canManageAccounts'] !== false,
        manageContacts: inputs['canManageContacts'] !== false,
        manageLeads: inputs['canManageLeads'] !== false,
        manageOpportunities: inputs['canManageOpportunities'] !== false,
        manageCases: inputs['canManageCases'] || false,
        runReports: inputs['canRunReports'] || false,
        executeApex: inputs['canExecuteApex'] || false,
        bulkOperations: inputs['canBulkOperations'] || false,
      },

      // SOQL configuration
      soql: {
        maxResults: inputs['maxQueryResults'] || 2000,
        defaultFields: inputs['defaultFields'] || [],
        includeDeleted: inputs['includeDeleted'] || false,
      },

      // Sandbox configuration
      sandbox: {
        enabled: inputs['useSandbox'] || false,
        url: inputs['sandboxUrl'],
      },

      // Custom objects
      customObjects: inputs['customObjects'] || {},

      // Field mappings
      fieldMappings: {
        account: inputs['accountFieldMappings'] || {},
        contact: inputs['contactFieldMappings'] || {},
        lead: inputs['leadFieldMappings'] || {},
        opportunity: inputs['opportunityFieldMappings'] || {},
      },

      // Metadata configuration
      metadata: {
        retrieveCustomFields: inputs['retrieveCustomFields'] !== false,
        retrievePicklistValues: inputs['retrievePicklistValues'] !== false,
        retrieveValidationRules: inputs['retrieveValidationRules'] || false,
      },
    });

    return this.createBusinessToolFragments(
      node,
      config,
      'SalesforceTool',
      '@langchain/community/tools/salesforce'
    );
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    return this.getBusinessToolDependencies('salesforce');
  }
}

// ============================================================================
// Additional Business Tool Converters
// ============================================================================

/**
 * Microsoft Teams Tool Converter - Enterprise Communication
 */
class MicrosoftTeamsToolConverter extends BaseBusinessToolConverter {
  readonly flowiseType = 'microsoftTeamsTool';
  readonly langchainType = 'MicrosoftTeamsTool';
  readonly toolType = 'microsoftTeams';
  readonly businessCategory = 'communication' as const;

  override canConvert(node: IRNode): boolean {
    return (
      node.type === 'microsoftTeamsTool' ||
      node.type === 'microsoftTeams' ||
      node.type === 'teams' ||
      this.validateBusinessToolConfig(node)
    );
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const inputs = this.extractInputs(node);

    const config = this.generateBusinessToolConfig(node, context, {
      // Teams-specific configuration
      tenantId: inputs['tenantId'],
      clientId: inputs['clientId'],
      clientSecret: inputs['clientSecret'],

      // Teams capabilities
      capabilities: {
        sendMessage: inputs['canSendMessage'] !== false,
        createChannel: inputs['canCreateChannel'] || false,
        manageMembers: inputs['canManageMembers'] || false,
        scheduleCallS: inputs['canScheduleCalls'] || false,
      },
    });

    return this.createBusinessToolFragments(
      node,
      config,
      'MicrosoftTeamsTool',
      '@langchain/community/tools/microsoft_teams'
    );
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    return [...this.getBusinessToolDependencies('teams'), '@azure/msal-node'];
  }
}

/**
 * Asana Tool Converter - Project Management
 */
class AsanaToolConverter extends BaseBusinessToolConverter {
  readonly flowiseType = 'asanaTool';
  readonly langchainType = 'AsanaTool';
  readonly toolType = 'asana';
  readonly businessCategory = 'project-management' as const;

  override canConvert(node: IRNode): boolean {
    return (
      node.type === 'asanaTool' ||
      node.type === 'asana' ||
      this.validateBusinessToolConfig(node)
    );
  }

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const inputs = this.extractInputs(node);

    const config = this.generateBusinessToolConfig(node, context, {
      // Asana-specific configuration
      accessToken: inputs['accessToken'] || inputs['apiKey'],

      // Asana capabilities
      capabilities: {
        createTask: inputs['canCreateTask'] !== false,
        updateTask: inputs['canUpdateTask'] !== false,
        createProject: inputs['canCreateProject'] || false,
        manageTeams: inputs['canManageTeams'] || false,
      },
    });

    return this.createBusinessToolFragments(
      node,
      config,
      'AsanaTool',
      '@langchain/community/tools/asana'
    );
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    return [...this.getBusinessToolDependencies('asana'), 'asana'];
  }
}

// ============================================================================
// Exports
// ============================================================================

export const BUSINESS_TOOL_CONVERTERS = [
  JiraToolConverter,
  StripeToolConverter,
  AirtableToolConverter,
  NotionToolConverter,
  SlackToolConverter,
  HubSpotToolConverter,
  SalesforceToolConverter,
  MicrosoftTeamsToolConverter,
  AsanaToolConverter,
];

// Export all converters
export {
  BaseBusinessToolConverter,
  JiraToolConverter,
  StripeToolConverter,
  AirtableToolConverter,
  NotionToolConverter,
  SlackToolConverter,
  HubSpotToolConverter,
  SalesforceToolConverter,
  MicrosoftTeamsToolConverter,
  AsanaToolConverter,
};
