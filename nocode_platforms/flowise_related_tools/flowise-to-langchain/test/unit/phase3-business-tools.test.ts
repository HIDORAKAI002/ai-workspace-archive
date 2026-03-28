/**
 * Phase 3 Business Tools Converter Tests
 * 
 * Comprehensive tests for all business tool converters including:
 * - Jira (project management)
 * - Stripe (payment processing) 
 * - Airtable (database/CRM)
 * - Notion (knowledge management)
 * - Slack (team communication)
 * - HubSpot (CRM and marketing)
 * - Salesforce (enterprise CRM)
 * - Microsoft Teams (enterprise communication)
 * - Asana (project management)
 */

import { describe, test, expect, beforeEach } from '@jest/globals';
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
} from '../../src/registry/converters/business-tools.js';
import type { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('Business Tools Converters', () => {
  let context: GenerationContext;

  // Helper function to create test nodes
  const createTestNode = (
    id: string,
    type: string,
    label: string,
    parameters: Array<{ name: string; value: any }> = [],
    category: IRNode['category'] = 'tool'
  ): IRNode => ({
    id,
    type,
    label,
    category,
    inputs: [],
    outputs: [],
    parameters,
    position: { x: 100, y: 100 },
    metadata: {
      version: '1.0.0',
    },
  });

  beforeEach(() => {
    context = {
      mode: 'typescript',
      packageManager: 'npm',
      exportFormat: 'es6',
      target: 'node',
      version: '1.0.0',
      dependencies: new Set(),
      metadata: {
        flowName: 'test-flow',
        version: '1.0.0',
        description: 'Test flow for business tools',
        author: 'Test Suite',
        tags: ['test', 'business-tools'],
        timestamp: Date.now(),
      },
    };
  });

  describe('JiraToolConverter', () => {
    let converter: JiraToolConverter;

    beforeEach(() => {
      converter = new JiraToolConverter();
    });

    test('should have correct properties', () => {
      expect(converter.flowiseType).toBe('jiraTool');
      expect(converter.category).toBe('business-tool');
      expect(converter.toolType).toBe('jira');
      expect(converter.businessCategory).toBe('project-management');
    });

    test('should convert jira tool with full configuration', () => {
      const node = createTestNode('jira_1', 'jiraTool', 'Jira Tool', [
        { name: 'jiraUrl', value: 'https://company.atlassian.net' },
        { name: 'username', value: 'user@company.com' },
        { name: 'apiToken', value: 'jira_token_123' },
        { name: 'projectKey', value: 'PROJ' },
        { name: 'canCreateIssue', value: true },
        { name: 'canUpdateIssue', value: true },
        { name: 'canSearchIssues', value: true },
        { name: 'issueTypes', value: ['Task', 'Bug', 'Story'] },
        { name: 'customFields', value: { priority: 'customfield_10001' } },
        { name: 'notificationsEnabled', value: true }
      ]);

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2); // import and init
      
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment?.code).toContain('JiraAPIWrapper');
      expect(importFragment?.code).toContain('@langchain/community/tools/jira');
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment).toBeDefined();
      expect(initFragment?.code).toContain('jira_tool_jira_tool');
      expect(initFragment?.code).toContain('JiraAPIWrapper');
    });

    test('should get correct dependencies', () => {
      const node = createTestNode('jira_1', 'jiraTool', 'Jira Tool');

      const deps = converter.getDependencies(node, context);
      expect(deps).toContain('@langchain/core');
      expect(deps).toContain('@langchain/community');
      expect(deps).toContain('jira-client');
      expect(deps).toContain('node-jira-client');
    });

    test('should validate configuration correctly', () => {
      const validNode = createTestNode('jira_1', 'jiraTool', 'Jira Tool', [
        { name: 'apiKey', value: 'test-key' }
      ]);

      const invalidNode = createTestNode('jira_2', 'jiraTool', 'Jira Tool', []);

      expect(converter.canConvert(validNode)).toBe(true);
      expect(converter.canConvert(invalidNode)).toBe(false);
    });
  });

  describe('StripeToolConverter', () => {
    let converter: StripeToolConverter;

    beforeEach(() => {
      converter = new StripeToolConverter();
    });

    test('should have correct properties', () => {
      expect(converter.flowiseType).toBe('stripeTool');
      expect(converter.category).toBe('business-tool');
      expect(converter.toolType).toBe('stripe');
      expect(converter.businessCategory).toBe('payment');
    });

    test('should convert stripe tool with full configuration', () => {
      const node = createTestNode('stripe_1', 'stripeTool', 'Stripe Tool', [
        { name: 'apiKey', value: 'sk_test_123' },
        { name: 'capabilities', value: ['createPaymentIntent', 'retrievePaymentIntent', 'listTransactions'] },
        { name: 'testMode', value: true },
        { name: 'webhooksEnabled', value: true },
        { name: 'currency', value: 'USD' }
      ]);

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment?.code).toContain('StripeAPIWrapper');
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('stripe_tool_stripe_tool');
    });
  });

  describe('AirtableToolConverter', () => {
    let converter: AirtableToolConverter;

    beforeEach(() => {
      converter = new AirtableToolConverter();
    });

    test('should have correct properties', () => {
      expect(converter.flowiseType).toBe('airtableTool');
      expect(converter.category).toBe('business-tool');
      expect(converter.toolType).toBe('airtable');
      expect(converter.businessCategory).toBe('database');
    });

    test('should convert airtable tool correctly', () => {
      const node = createTestNode('airtable_1', 'airtableTool', 'Airtable Tool', [
        { name: 'apiKey', value: 'key123' },
        { name: 'baseId', value: 'appXYZ' },
        { name: 'tables', value: ['Contacts', 'Deals'] }
      ]);

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('AirtableAPIWrapper');
    });
  });

  describe('NotionToolConverter', () => {
    let converter: NotionToolConverter;

    beforeEach(() => {
      converter = new NotionToolConverter();
    });

    test('should have correct properties', () => {
      expect(converter.flowiseType).toBe('notionTool');
      expect(converter.category).toBe('business-tool');
      expect(converter.toolType).toBe('notion');
      expect(converter.businessCategory).toBe('knowledge');
    });

    test('should convert notion tool correctly', () => {
      const node = createTestNode('notion_1', 'notionTool', 'Notion Tool', [
        { name: 'apiKey', value: 'secret_123' },
        { name: 'databaseIds', value: ['db1', 'db2'] },
        { name: 'capabilities', value: ['queryDatabase', 'createPage'] }
      ]);

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      expect(fragments[0].code).toContain('NotionAPIWrapper');
    });
  });

  describe('SlackToolConverter', () => {
    let converter: SlackToolConverter;

    beforeEach(() => {
      converter = new SlackToolConverter();
    });

    test('should have correct properties', () => {
      expect(converter.flowiseType).toBe('slackTool');
      expect(converter.category).toBe('business-tool');
      expect(converter.toolType).toBe('slack');
      expect(converter.businessCategory).toBe('communication');
    });

    test('should convert slack tool correctly', () => {
      const node = createTestNode('slack_1', 'slackTool', 'Slack Tool', [
        { name: 'apiKey', value: 'xoxb-123' },
        { name: 'channels', value: ['general', 'random'] },
        { name: 'capabilities', value: ['sendMessage', 'uploadFile'] }
      ]);

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      expect(fragments[0].code).toContain('SlackAPIWrapper');
    });
  });

  describe('HubSpotToolConverter', () => {
    let converter: HubSpotToolConverter;

    beforeEach(() => {
      converter = new HubSpotToolConverter();
    });

    test('should have correct properties', () => {
      expect(converter.flowiseType).toBe('hubspotTool');
      expect(converter.category).toBe('business-tool');
      expect(converter.toolType).toBe('hubspot');
      expect(converter.businessCategory).toBe('crm');
    });

    test('should convert hubspot tool correctly', () => {
      const node = createTestNode('hubspot_1', 'hubspotTool', 'HubSpot Tool', [
        { name: 'apiKey', value: 'pk_123' },
        { name: 'capabilities', value: ['createContact', 'updateDeal'] }
      ]);

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      expect(fragments[0].code).toContain('HubSpotAPIWrapper');
    });
  });

  describe('SalesforceToolConverter', () => {
    let converter: SalesforceToolConverter;

    beforeEach(() => {
      converter = new SalesforceToolConverter();
    });

    test('should have correct properties', () => {
      expect(converter.flowiseType).toBe('salesforceTool');
      expect(converter.category).toBe('business-tool');
      expect(converter.toolType).toBe('salesforce');
      expect(converter.businessCategory).toBe('crm');
    });

    test('should convert salesforce tool correctly', () => {
      const node = createTestNode('sf_1', 'salesforceTool', 'Salesforce Tool', [
        { name: 'apiKey', value: 'token_123' },
        { name: 'instanceUrl', value: 'https://myorg.salesforce.com' },
        { name: 'objects', value: ['Account', 'Contact', 'Lead'] }
      ]);

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      expect(fragments[0].code).toContain('SalesforceAPIWrapper');
    });
  });

  describe('MicrosoftTeamsToolConverter', () => {
    let converter: MicrosoftTeamsToolConverter;

    beforeEach(() => {
      converter = new MicrosoftTeamsToolConverter();
    });

    test('should have correct properties', () => {
      expect(converter.flowiseType).toBe('microsoftTeamsTool');
      expect(converter.category).toBe('business-tool');
      expect(converter.toolType).toBe('teams');
      expect(converter.businessCategory).toBe('communication');
    });

    test('should convert teams tool correctly', () => {
      const node = createTestNode('teams_1', 'microsoftTeamsTool', 'Teams Tool', [
        { name: 'apiKey', value: 'token_123' },
        { name: 'teams', value: ['Engineering', 'Sales'] }
      ]);

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      expect(fragments[0].code).toContain('TeamsAPIWrapper');
    });
  });

  describe('AsanaToolConverter', () => {
    let converter: AsanaToolConverter;

    beforeEach(() => {
      converter = new AsanaToolConverter();
    });

    test('should have correct properties', () => {
      expect(converter.flowiseType).toBe('asanaTool');
      expect(converter.category).toBe('business-tool');
      expect(converter.toolType).toBe('asana');
      expect(converter.businessCategory).toBe('project-management');
    });

    test('should convert asana tool correctly', () => {
      const node = createTestNode('asana_1', 'asanaTool', 'Asana Tool', [
        { name: 'apiKey', value: 'token_123' },
        { name: 'workspaces', value: ['workspace1'] },
        { name: 'projects', value: ['project1', 'project2'] }
      ]);

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      expect(fragments[0].code).toContain('AsanaAPIWrapper');
    });
  });
});