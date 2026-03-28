/**
 * Phase 3B: Google Suite Tools - Comprehensive Test Suite
 * Tests for 100% Google Suite coverage implementation
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  GmailToolConverter,
  GoogleCalendarToolConverter,
  GoogleDriveToolConverter,
  GoogleDocsToolConverter,
  GoogleSheetsToolConverter,
} from '../../src/registry/converters/google-tools.js';
import {
  GoogleWorkspaceToolConverter,
  GoogleMeetToolConverter,
  GoogleFormsToolConverter,
} from '../../src/registry/converters/google-tools-extended.js';
import { IRNode, GenerationContext } from '../../src/ir/types.js';

// Helper function to create IRNode with proper structure
function createGoogleToolNode(
  id: string,
  type: string,
  label: string,
  params: Record<string, unknown>
): IRNode {
  return {
    id,
    type,
    label,
    category: 'tool',
    position: { x: 0, y: 0 },
    parameters: Object.entries(params).map(([name, value]) => ({
      name,
      value,
      type: typeof value === 'boolean' ? 'boolean' : 
            typeof value === 'number' ? 'number' :
            Array.isArray(value) ? 'array' :
            typeof value === 'object' ? 'object' : 'string'
    })),
    inputs: [],
    outputs: [],
  };
}

describe('Google Suite Tools Converters - Phase 3B', () => {
  let context: GenerationContext;

  beforeEach(() => {
    context = {
      outputLanguage: 'typescript',
      packageManager: 'npm',
      features: {
        streaming: false,
        errorHandling: true,
        testing: false,
        optimization: false,
      },
      generatedVariables: new Set(),
      imports: new Map(),
      configuration: {
        typescript: {
          target: 'ES2020',
          module: 'ESNext',
          strict: true,
        },
      },
    };
  });

  describe('Gmail Tool Converter', () => {
    let converter: GmailToolConverter;

    beforeEach(() => {
      converter = new GmailToolConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('gmailTool');
    });

    it('should convert basic Gmail node', () => {
      const node: IRNode = {
        id: 'gmail_1',
        type: 'gmailTool',
        label: 'Gmail Tool',
        category: 'tool',
        position: { x: 0, y: 0 },
        parameters: [
          { name: 'maxResults', value: 50, type: 'number' },
          { name: 'includeSpamTrash', value: false, type: 'boolean' },
          { name: 'enableFilters', value: true, type: 'boolean' },
          { name: 'clientId', value: 'test-client-id', type: 'string' },
          { name: 'clientSecret', value: 'test-client-secret', type: 'string' },
        ],
        inputs: [],
        outputs: [],
      };

      const fragments = converter.convert(node, context);
      expect(fragments).toHaveLength(3); // import, auth, init

      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment?.content).toContain('GmailTool');
      expect(importFragment?.content).toContain('google-auth-library');

      const authFragment = fragments.find(f => f.type === 'auth');
      expect(authFragment?.content).toContain('_auth');
      expect(authFragment?.content).toContain('test-client-id');

      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.content).toContain('new GmailTool');
      expect(initFragment?.content).toContain('maxResults: 50');
    });

    it('should generate correct dependencies', () => {
      const node = createGoogleToolNode('gmail_1', 'gmailTool', 'Gmail Tool', {});

      const dependencies = converter.getDependencies(node, context);
      expect(dependencies).toContain('googleapis');
      expect(dependencies).toContain('@langchain/community');
      expect(dependencies).toContain('google-auth-library');
      expect(dependencies).toContain('limiter');
    });
  });

  describe('Google Calendar Tool Converter', () => {
    let converter: GoogleCalendarToolConverter;

    beforeEach(() => {
      converter = new GoogleCalendarToolConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('googleCalendarTool');
    });

    it('should convert Calendar node with advanced features', () => {
      const node: IRNode = {
        id: 'calendar_1',
        type: 'googleCalendarTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Calendar Tool',
          parameters: {
            calendarId: 'primary',
            maxResults: 25,
            enableRecurrence: true,
            enableReminders: true,
            timezone: 'America/New_York',
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('GoogleCalendarTool');
      expect(initFragment?.code).toContain('enableRecurrence: true');
      expect(initFragment?.code).toContain('timezone: "America/New_York"');
    });
  });

  describe('Google Drive Tool Converter', () => {
    let converter: GoogleDriveToolConverter;

    beforeEach(() => {
      converter = new GoogleDriveToolConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('googleDriveTool');
    });

    it('should convert Drive node with file management features', () => {
      const node: IRNode = {
        id: 'drive_1',
        type: 'googleDriveTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Drive Tool',
          parameters: {
            maxResults: 100,
            includeItemsFromAllDrives: true,
            enableSharing: true,
            enableVersioning: true,
            orderBy: 'modifiedTime desc',
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('GoogleDriveTool');
      expect(initFragment?.code).toContain('includeItemsFromAllDrives: true');
      expect(initFragment?.code).toContain('enableSharing: true');
    });
  });

  describe('Google Docs Tool Converter', () => {
    let converter: GoogleDocsToolConverter;

    beforeEach(() => {
      converter = new GoogleDocsToolConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('googleDocsTool');
    });

    it('should convert Docs node with collaboration features', () => {
      const node: IRNode = {
        id: 'docs_1',
        type: 'googleDocsTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Docs Tool',
          parameters: {
            documentId: 'test-doc-id',
            enableCollaboration: true,
            includeComments: true,
            includeSuggestions: true,
            trackChanges: true,
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('GoogleDocsTool');
      expect(initFragment?.code).toContain('enableCollaboration: true');
      expect(initFragment?.code).toContain('trackChanges: true');
    });
  });

  describe('Google Sheets Tool Converter', () => {
    let converter: GoogleSheetsToolConverter;

    beforeEach(() => {
      converter = new GoogleSheetsToolConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('googleSheetsTool');
    });

    it('should convert Sheets node with automation features', () => {
      const node: IRNode = {
        id: 'sheets_1',
        type: 'googleSheetsTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Sheets Tool',
          parameters: {
            spreadsheetId: 'test-sheet-id',
            range: 'A1:Z1000',
            enableFormulas: true,
            enableCharts: true,
            batchUpdate: true,
            valueInputOption: 'USER_ENTERED',
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('GoogleSheetsToolV2');
      expect(initFragment?.code).toContain('enableFormulas: true');
      expect(initFragment?.code).toContain('batchUpdate: true');
    });
  });

  describe('Google Workspace Tool Converter', () => {
    let converter: GoogleWorkspaceToolConverter;

    beforeEach(() => {
      converter = new GoogleWorkspaceToolConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('googleWorkspaceTool');
    });

    it('should convert Workspace admin node', () => {
      const node: IRNode = {
        id: 'workspace_1',
        type: 'googleWorkspaceTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Workspace Tool',
          parameters: {
            domain: 'example.com',
            customerID: 'C12345678',
            enableUserManagement: true,
            enableGroupManagement: true,
            enableAuditLogs: true,
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('GoogleWorkspaceTool');
      expect(initFragment?.code).toContain('domain: "example.com"');
      expect(initFragment?.code).toContain('enableUserManagement: true');
    });
  });

  describe('Google Meet Tool Converter', () => {
    let converter: GoogleMeetToolConverter;

    beforeEach(() => {
      converter = new GoogleMeetToolConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('googleMeetTool');
    });

    it('should convert Meet node with video features', () => {
      const node: IRNode = {
        id: 'meet_1',
        type: 'googleMeetTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Meet Tool',
          parameters: {
            maxParticipants: 250,
            enableRecording: true,
            enableTranscription: true,
            enableBreakoutRooms: true,
            recordingFormat: 'mp4',
            transcriptionLanguage: 'en-US',
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('GoogleMeetTool');
      expect(initFragment?.code).toContain('maxParticipants: 250');
      expect(initFragment?.code).toContain('enableRecording: true');
      expect(initFragment?.code).toContain('enableBreakoutRooms: true');
    });
  });

  describe('Google Forms Tool Converter', () => {
    let converter: GoogleFormsToolConverter;

    beforeEach(() => {
      converter = new GoogleFormsToolConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('googleFormsTool');
    });

    it('should convert Forms node with automation features', () => {
      const node: IRNode = {
        id: 'forms_1',
        type: 'googleFormsTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Forms Tool',
          parameters: {
            formId: 'test-form-id',
            maxResponses: 1000,
            enableQuizMode: true,
            enableCollectEmail: true,
            responseValidation: true,
            autoSave: true,
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('GoogleFormsTool');
      expect(initFragment?.code).toContain('maxResponses: 1000');
      expect(initFragment?.code).toContain('enableQuizMode: true');
      expect(initFragment?.code).toContain('responseValidation: true');
    });
  });

  describe('Rate Limiting and Webhooks', () => {
    it('should generate rate limiting configuration for Gmail', () => {
      const converter = new GmailToolConverter();
      const node: IRNode = {
        id: 'gmail_rate_limit',
        type: 'gmailTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Gmail with Rate Limiting',
          parameters: {
            enableRateLimit: true,
            requestsPerSecond: 5,
            burstLimit: 25,
            retryOnQuota: true,
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const rateLimitFragment = fragments.find(f => f.type === 'rate-limiting');
      expect(rateLimitFragment?.code).toContain('RateLimiter');
      expect(rateLimitFragment?.code).toContain('tokensPerInterval: 5');
    });

    it('should generate webhook configuration for Calendar', () => {
      const converter = new GoogleCalendarToolConverter();
      const node: IRNode = {
        id: 'calendar_webhooks',
        type: 'googleCalendarTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Calendar with Webhooks',
          parameters: {
            enableWebhooks: true,
            webhookUrl: 'https://example.com/webhook',
            webhookSecret: 'secret-key',
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const webhookFragment = fragments.find(f => f.type === 'webhooks');
      expect(webhookFragment?.code).toContain('webhook');
      expect(webhookFragment?.code).toContain('verifySignature');
    });
  });

  describe('OAuth2 Authentication', () => {
    it('should handle service account authentication', () => {
      const converter = new GoogleDriveToolConverter();
      const node: IRNode = {
        id: 'drive_service_account',
        type: 'googleDriveTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Drive with Service Account',
          parameters: {
            serviceAccountKey: 'path/to/service-account.json',
            scopes: [
              'https://www.googleapis.com/auth/drive',
              'https://www.googleapis.com/auth/drive.file'
            ],
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const authFragment = fragments.find(f => f.type === 'auth');
      expect(authFragment?.code).toContain('serviceAccountKey');
      expect(authFragment?.code).toContain('drive.file');
    });

    it('should handle OAuth2 with refresh tokens', () => {
      const converter = new GoogleSheetsToolConverter();
      const node: IRNode = {
        id: 'sheets_oauth',
        type: 'googleSheetsTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Sheets with OAuth2',
          parameters: {
            clientId: 'oauth-client-id',
            clientSecret: 'oauth-client-secret',
            refreshToken: 'refresh-token',
            redirectUri: 'http://localhost:3000/callback',
          },
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const authFragment = fragments.find(f => f.type === 'auth');
      expect(authFragment?.code).toContain('oauth-client-id');
      expect(authFragment?.code).toContain('refresh-token');
      expect(authFragment?.code).toContain('tokens refreshed');
    });
  });

  describe('Error Handling', () => {
    it('should include error handling in initialization', () => {
      const converter = new GoogleWorkspaceToolConverter();
      const node: IRNode = {
        id: 'workspace_error_handling',
        type: 'googleWorkspaceTool',
        position: { x: 0, y: 0 },
        data: {
          label: 'Workspace with Error Handling',
          parameters: {},
        },
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment?.code).toContain('try {');
      expect(initFragment?.code).toContain('catch (error)');
      expect(initFragment?.code).toContain('error handler');
      expect(initFragment?.code).toContain('retry');
    });
  });

  describe('Integration Tests', () => {
    it('should work with all Google Suite tools together', () => {
      const converters = [
        new GmailToolConverter(),
        new GoogleCalendarToolConverter(),
        new GoogleDriveToolConverter(),
        new GoogleDocsToolConverter(),
        new GoogleSheetsToolConverter(),
        new GoogleWorkspaceToolConverter(),
        new GoogleMeetToolConverter(),
        new GoogleFormsToolConverter(),
      ];

      converters.forEach((converter, index) => {
        const node: IRNode = {
          id: `google_tool_${index}`,
          type: converter.flowiseType,
          position: { x: 0, y: 0 },
          data: {
            label: `Google Tool ${index}`,
            parameters: {
              clientId: 'test-client-id',
              clientSecret: 'test-client-secret',
            },
          },
          inputs: {},
          outputs: {},
        };

        const fragments = converter.convert(node, context);
        expect(fragments.length).toBeGreaterThan(0);

        const dependencies = converter.getDependencies(node, context);
        expect(dependencies).toContain('googleapis');
        expect(dependencies).toContain('@langchain/community');
      });
    });
  });
});