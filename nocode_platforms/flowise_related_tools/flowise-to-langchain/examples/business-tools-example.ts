/**
 * Business Tools Integration Example
 * 
 * Demonstrates how to use all business tool converters
 * for enterprise workflow automation.
 */

import {
  JiraToolConverter,
  StripeToolConverter,
  AirtableToolConverter,
  NotionToolConverter,
  SlackToolConverter,
  HubSpotToolConverter,
  SalesforceToolConverter,
  MicrosoftTeamsToolConverter,
  AsanaToolConverter
} from '../src/registry/converters/business-tools.js';
import type { FlowiseNode, ConversionContext } from '../src/types/index.js';

// ============================================================================
// Business Tools Integration Examples
// ============================================================================

/**
 * Example Flowise configurations for all business tools
 */
const businessToolExamples = {
  // Project Management - Jira
  jira: {
    id: 'jira_project_mgmt',
    data: {
      name: 'jiraTool',
      inputs: {
        jiraUrl: 'https://company.atlassian.net',
        username: 'automation@company.com',
        apiToken: process.env.JIRA_API_TOKEN,
        projectKey: 'AI',
        canCreateIssue: true,
        canUpdateIssue: true,
        canSearchIssues: true,
        issueTypes: ['Task', 'Bug', 'Story', 'Epic'],
        customFields: {
          priority: 'customfield_10001',
          epic: 'customfield_10002',
          storyPoints: 'customfield_10003'
        },
        notificationsEnabled: true,
        notificationEvents: ['issue_created', 'issue_updated', 'issue_assigned']
      }
    },
    position: { x: 100, y: 100 },
    type: 'customNode'
  } as FlowiseNode,

  // Payment Processing - Stripe
  stripe: {
    id: 'stripe_payments',
    data: {
      name: 'stripeTool',
      inputs: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        apiVersion: '2023-10-16',
        defaultCurrency: 'usd',
        paymentMethods: ['card', 'bank_transfer', 'apple_pay', 'google_pay'],
        canCreatePayment: true,
        canRefundPayment: true,
        canRetrievePayment: true,
        canListPayments: true,
        canManageCustomers: true,
        canManageSubscriptions: true,
        validateWebhooks: true,
        allowedOrigins: ['https://company.com', 'https://app.company.com']
      }
    },
    position: { x: 200, y: 100 },
    type: 'customNode'
  } as FlowiseNode,

  // Database/CRM - Airtable
  airtable: {
    id: 'airtable_crm',
    data: {
      name: 'airtableTool',
      inputs: {
        personalAccessToken: process.env.AIRTABLE_API_KEY,
        baseId: 'appXYZ123ABC',
        tableId: 'tblABC123XYZ',
        view: 'Grid view',
        maxRecords: 100,
        pageSize: 50,
        fieldMappings: {
          name: 'Name',
          email: 'Email',
          company: 'Company',
          status: 'Lead Status',
          score: 'Lead Score'
        },
        canCreateRecord: true,
        canUpdateRecord: true,
        canDeleteRecord: false,
        canListRecords: true,
        canBulkOperations: true,
        dateFormat: 'YYYY-MM-DD',
        timeZone: 'America/New_York'
      }
    },
    position: { x: 300, y: 100 },
    type: 'customNode'
  } as FlowiseNode,

  // Knowledge Management - Notion
  notion: {
    id: 'notion_knowledge',
    data: {
      name: 'notionTool',
      inputs: {
        integrationToken: process.env.NOTION_INTEGRATION_TOKEN,
        notionVersion: '2022-06-28',
        databaseId: 'db123ABC456',
        pageId: 'page789XYZ012',
        parentPageId: 'parentABC123',
        canCreatePage: true,
        canUpdatePage: true,
        canDeletePage: false,
        canQueryDatabase: true,
        canSearchPages: true,
        canManageBlocks: true,
        useRichText: true,
        convertToMarkdown: true,
        preserveCodeBlocks: true,
        workspaceId: 'ws_ABCDEF123',
        workspaceType: 'workspace'
      }
    },
    position: { x: 400, y: 100 },
    type: 'customNode'
  } as FlowiseNode,

  // Team Communication - Slack
  slack: {
    id: 'slack_communication',
    data: {
      name: 'slackTool',
      inputs: {
        botToken: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        appToken: process.env.SLACK_APP_TOKEN,
        defaultChannel: '#ai-automation',
        allowedChannels: ['#ai-automation', '#dev-team', '#general'],
        canSendMessage: true,
        canUpdateMessage: true,
        canReadMessages: true,
        canManageChannels: false,
        canUploadFiles: true,
        canReact: true,
        useMarkdown: true,
        allowMentions: true,
        supportThreads: true,
        supportAttachments: true,
        botName: 'AI Assistant',
        botEmoji: ':robot_face:',
        unfurlLinks: true,
        unfurlMedia: false,
        messageEvents: ['message', 'app_mention'],
        handleAppMentions: true,
        handleReactions: true
      }
    },
    position: { x: 500, y: 100 },
    type: 'customNode'
  } as FlowiseNode,

  // CRM and Marketing - HubSpot
  hubspot: {
    id: 'hubspot_crm',
    data: {
      name: 'hubspotTool',
      inputs: {
        accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
        portalId: '12345678',
        canManageContacts: true,
        canManageCompanies: true,
        canManageDeals: true,
        canManageTickets: true,
        canManageLists: true,
        canManageEmails: true,
        canRunReports: true,
        defaultOwner: 'automation@company.com',
        defaultPipeline: 'default',
        defaultLeadStatus: 'new',
        defaultContactLifecycle: 'lead',
        enableEmailCampaigns: true,
        enableLeadScoring: true,
        enableAutomation: true,
        bidirectionalSync: true,
        realTimeSync: false,
        batchSize: 100,
        customProperties: {
          leadSource: 'ai_source',
          leadScore: 'ai_lead_score',
          lastActivity: 'last_ai_interaction'
        }
      }
    },
    position: { x: 600, y: 100 },
    type: 'customNode'
  } as FlowiseNode,

  // Enterprise CRM - Salesforce
  salesforce: {
    id: 'salesforce_enterprise',
    data: {
      name: 'salesforceTool',
      inputs: {
        username: process.env.SALESFORCE_USERNAME,
        password: process.env.SALESFORCE_PASSWORD,
        securityToken: process.env.SALESFORCE_SECURITY_TOKEN,
        clientId: process.env.SALESFORCE_CLIENT_ID,
        clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
        loginUrl: 'https://login.salesforce.com',
        apiVersion: '58.0',
        canManageAccounts: true,
        canManageContacts: true,
        canManageLeads: true,
        canManageOpportunities: true,
        canManageCases: true,
        canRunReports: true,
        canExecuteApex: false,
        canBulkOperations: true,
        maxQueryResults: 2000,
        useSandbox: false,
        retrieveCustomFields: true,
        retrievePicklistValues: true,
        retrieveValidationRules: false,
        accountFieldMappings: {
          name: 'Name',
          website: 'Website',
          industry: 'Industry'
        },
        contactFieldMappings: {
          firstName: 'FirstName',
          lastName: 'LastName',
          email: 'Email'
        }
      }
    },
    position: { x: 700, y: 100 },
    type: 'customNode'
  } as FlowiseNode,

  // Enterprise Communication - Microsoft Teams
  microsoftTeams: {
    id: 'teams_enterprise',
    data: {
      name: 'microsoftTeamsTool',
      inputs: {
        tenantId: process.env.TEAMS_TENANT_ID,
        clientId: process.env.TEAMS_CLIENT_ID,
        clientSecret: process.env.TEAMS_CLIENT_SECRET,
        canSendMessage: true,
        canCreateChannel: false,
        canManageMembers: false,
        canScheduleCalls: false
      }
    },
    position: { x: 800, y: 100 },
    type: 'customNode'
  } as FlowiseNode,

  // Project Management - Asana
  asana: {
    id: 'asana_projects',
    data: {
      name: 'asanaTool',
      inputs: {
        accessToken: process.env.ASANA_ACCESS_TOKEN,
        canCreateTask: true,
        canUpdateTask: true,
        canCreateProject: true,
        canManageTeams: false
      }
    },
    position: { x: 900, y: 100 },
    type: 'customNode'
  } as FlowiseNode
};

/**
 * Conversion context for examples
 */
const exampleContext: ConversionContext = {
  flowiseVersion: '1.0.0',
  targetFramework: 'langchain',
  options: {},
  globalConfig: {},
  nodeMap: new Map(),
  errors: [],
  warnings: []
};

/**
 * Demonstrate conversion of all business tools
 */
async function demonstrateBusinessToolConversions() {
  console.log('🏢 Business Tools Integration Demo\n');

  // Initialize all converters
  const converters = {
    jira: new JiraToolConverter(),
    stripe: new StripeToolConverter(),
    airtable: new AirtableToolConverter(),
    notion: new NotionToolConverter(),
    slack: new SlackToolConverter(),
    hubspot: new HubSpotToolConverter(),
    salesforce: new SalesforceToolConverter(),
    microsoftTeams: new MicrosoftTeamsToolConverter(),
    asana: new AsanaToolConverter()
  };

  // Convert each business tool
  for (const [toolName, converter] of Object.entries(converters)) {
    const exampleNode = businessToolExamples[toolName as keyof typeof businessToolExamples];
    
    console.log(`📊 Converting ${toolName.toUpperCase()} Tool:`);
    console.log(`   Node Type: ${converter.flowiseType}`);
    console.log(`   Category: ${converter.category}`);
    console.log(`   Business Category: ${(converter as any).businessCategory}`);
    
    if (converter.canConvert(exampleNode)) {
      const result = await converter.convert(exampleNode, exampleContext);
      
      if (result.success) {
        console.log(`   ✅ Conversion successful`);
        console.log(`   📦 Dependencies: ${result.dependencies?.join(', ')}`);
        console.log(`   🔧 Config keys: ${Object.keys(result.config).join(', ')}`);
        
        if (result.config.capabilities) {
          const enabledCapabilities = Object.entries(result.config.capabilities)
            .filter(([_, enabled]) => enabled)
            .map(([capability, _]) => capability);
          console.log(`   🎯 Capabilities: ${enabledCapabilities.join(', ')}`);
        }
      } else {
        console.log(`   ❌ Conversion failed: ${result.error}`);
      }
    } else {
      console.log(`   ⚠️  Cannot convert this node`);
    }
    
    console.log('');
  }
}

/**
 * Create a comprehensive business workflow
 */
async function createBusinessWorkflow() {
  console.log('🔄 Creating Comprehensive Business Workflow\n');

  const workflow = {
    name: 'AI-Powered Business Automation',
    description: 'End-to-end business process automation using AI and business tools',
    steps: [
      {
        tool: 'jira',
        action: 'Create project tracking for customer requests',
        config: businessToolExamples.jira.data.inputs
      },
      {
        tool: 'slack',
        action: 'Send notification to team about new project',
        config: businessToolExamples.slack.data.inputs
      },
      {
        tool: 'airtable',
        action: 'Store customer data and project details',
        config: businessToolExamples.airtable.data.inputs
      },
      {
        tool: 'notion',
        action: 'Create knowledge base entry for project',
        config: businessToolExamples.notion.data.inputs
      },
      {
        tool: 'hubspot',
        action: 'Update CRM with customer interaction',
        config: businessToolExamples.hubspot.data.inputs
      },
      {
        tool: 'stripe',
        action: 'Process payment if applicable',
        config: businessToolExamples.stripe.data.inputs
      },
      {
        tool: 'salesforce',
        action: 'Sync with enterprise CRM',
        config: businessToolExamples.salesforce.data.inputs
      }
    ]
  };

  console.log(`Workflow: ${workflow.name}`);
  console.log(`Description: ${workflow.description}`);
  console.log(`Steps: ${workflow.steps.length}\n`);

  workflow.steps.forEach((step, index) => {
    console.log(`Step ${index + 1}: ${step.action}`);
    console.log(`   Tool: ${step.tool.toUpperCase()}`);
    console.log(`   Capabilities: ${Object.keys(step.config).filter(key => key.startsWith('can')).length} features`);
    console.log('');
  });
}

/**
 * Environment variables required for business tools
 */
const requiredEnvVars = {
  jira: ['JIRA_API_TOKEN'],
  stripe: ['STRIPE_SECRET_KEY', 'STRIPE_PUBLISHABLE_KEY', 'STRIPE_WEBHOOK_SECRET'],
  airtable: ['AIRTABLE_API_KEY'],
  notion: ['NOTION_INTEGRATION_TOKEN'],
  slack: ['SLACK_BOT_TOKEN', 'SLACK_SIGNING_SECRET'],
  hubspot: ['HUBSPOT_ACCESS_TOKEN'],
  salesforce: [
    'SALESFORCE_USERNAME', 
    'SALESFORCE_PASSWORD', 
    'SALESFORCE_SECURITY_TOKEN',
    'SALESFORCE_CLIENT_ID',
    'SALESFORCE_CLIENT_SECRET'
  ],
  microsoftTeams: ['TEAMS_TENANT_ID', 'TEAMS_CLIENT_ID', 'TEAMS_CLIENT_SECRET'],
  asana: ['ASANA_ACCESS_TOKEN']
};

/**
 * Check environment setup
 */
function checkEnvironmentSetup() {
  console.log('🔧 Environment Setup Check\n');

  let allConfigured = true;

  for (const [tool, envVars] of Object.entries(requiredEnvVars)) {
    console.log(`${tool.toUpperCase()} Tool:`);
    
    for (const envVar of envVars) {
      const isSet = !!process.env[envVar];
      console.log(`   ${isSet ? '✅' : '❌'} ${envVar}: ${isSet ? 'Set' : 'Not set'}`);
      if (!isSet) allConfigured = false;
    }
    
    console.log('');
  }

  if (allConfigured) {
    console.log('🎉 All environment variables are configured!');
  } else {
    console.log('⚠️  Some environment variables are missing. Please configure them for full functionality.');
  }

  return allConfigured;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Business Tools Integration Example\n');
  console.log('=' .repeat(60));
  
  // Check environment
  const envConfigured = checkEnvironmentSetup();
  console.log('=' .repeat(60));
  
  // Demonstrate conversions
  await demonstrateBusinessToolConversions();
  console.log('=' .repeat(60));
  
  // Create workflow
  await createBusinessWorkflow();
  console.log('=' .repeat(60));
  
  console.log('✨ Business Tools Integration Demo Complete!');
  
  if (!envConfigured) {
    console.log('\n📋 Next Steps:');
    console.log('1. Configure the missing environment variables');
    console.log('2. Test individual tool integrations');
    console.log('3. Build your custom business workflow');
  }
}

// Run the demo
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export {
  businessToolExamples,
  exampleContext,
  demonstrateBusinessToolConversions,
  createBusinessWorkflow,
  requiredEnvVars,
  checkEnvironmentSetup
};