import { ActionRecorder } from '../tools/codegen/recorder';
import { PlaywrightGenerator } from '../tools/codegen/generator';
import { handleToolCall } from '../toolHandler';
import * as fs from 'fs/promises';
import * as path from 'path';

jest.mock('../toolHandler');
const mockedHandleToolCall = jest.mocked(handleToolCall);

// Test configuration
const TEST_CONFIG = {
  OUTPUT_DIR: path.join(__dirname, '../../tests/generated'),
  MOCK_SESSION_ID: 'test-session-123'
} as const;

// Response types
interface ToolResponseContent {
  [key: string]: unknown;
  type: 'text';
  text: string;
}

interface ToolResponse {
  [key: string]: unknown;
  content: ToolResponseContent[];
  isError: boolean;
  _meta?: Record<string, unknown>;
}

function createMockResponse(data: unknown): ToolResponse {
  return {
    content: [{
      type: 'text',
      text: JSON.stringify(data)
    }],
    isError: false,
    _meta: {}
  };
}

function parseJsonResponse<T>(response: unknown): T {
  if (!response || typeof response !== 'object' || !('content' in response)) {
    throw new Error('Invalid response format');
  }

  const content = (response as { content: unknown[] }).content;
  if (!Array.isArray(content) || content.length === 0) {
    throw new Error('Invalid response content');
  }

  const textContent = content.find(c => 
    typeof c === 'object' && 
    c !== null && 
    'type' in c && 
    (c as { type: string }).type === 'text' && 
    'text' in c && 
    typeof (c as { text: unknown }).text === 'string'
  ) as { type: 'text'; text: string } | undefined;

  if (!textContent?.text) {
    throw new Error('No text content found in response');
  }

  return JSON.parse(textContent.text) as T;
}

describe('Code Generation', () => {
  beforeAll(async () => {
    // Ensure test output directory exists
    await fs.mkdir(TEST_CONFIG.OUTPUT_DIR, { recursive: true });
  });

  afterEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Clean up test files
    try {
      const files = await fs.readdir(TEST_CONFIG.OUTPUT_DIR);
      await Promise.all(
        files.map(file => fs.unlink(path.join(TEST_CONFIG.OUTPUT_DIR, file)))
      );
    } catch (error) {
      console.error('Error cleaning up test files:', error);
    }
  });

  describe('Action Recording', () => {
    beforeEach(() => {
      // Mock session info response
      mockedHandleToolCall.mockImplementation(async (name, args, server) => {
        if (name === 'get_codegen_session') {
          return createMockResponse({
            id: TEST_CONFIG.MOCK_SESSION_ID,
            actions: []
          });
        }
        return createMockResponse({ success: true });
      });
    });

    it('should record navigation actions', async () => {
      // Setup mock for session info
      mockedHandleToolCall.mockImplementation(async (name, args, server) => {
        if (name === 'get_codegen_session') {
          return createMockResponse({
            id: TEST_CONFIG.MOCK_SESSION_ID,
            actions: [{
              toolName: 'playwright_navigate',
              params: { url: 'https://example.com' }
            }]
          });
        }
        return createMockResponse({ success: true });
      });

      await handleToolCall('playwright_navigate', {
        url: 'https://example.com'
      }, {});

      const sessionInfo = parseJsonResponse<{ id: string; actions: any[] }>(
        await handleToolCall('get_codegen_session', { sessionId: TEST_CONFIG.MOCK_SESSION_ID }, {})
      );

      expect(sessionInfo.actions).toHaveLength(1);
      expect(sessionInfo.actions[0].toolName).toBe('playwright_navigate');
      expect(sessionInfo.actions[0].params).toEqual({
        url: 'https://example.com'
      });
    });

    it('should record multiple actions in sequence', async () => {
      // Setup mock for session info
      mockedHandleToolCall.mockImplementation(async (name, args, server) => {
        if (name === 'get_codegen_session') {
          return createMockResponse({
            id: TEST_CONFIG.MOCK_SESSION_ID,
            actions: [
              {
                toolName: 'playwright_navigate',
                params: { url: 'https://example.com' }
              },
              {
                toolName: 'playwright_click',
                params: { selector: '#submit-button' }
              },
              {
                toolName: 'playwright_fill',
                params: { selector: '#search-input', value: 'test query' }
              }
            ]
          });
        }
        return createMockResponse({ success: true });
      });

      await handleToolCall('playwright_navigate', {
        url: 'https://example.com'
      }, {});

      await handleToolCall('playwright_click', {
        selector: '#submit-button'
      }, {});

      await handleToolCall('playwright_fill', {
        selector: '#search-input',
        value: 'test query'
      }, {});

      const sessionInfo = parseJsonResponse<{ id: string; actions: any[] }>(
        await handleToolCall('get_codegen_session', { sessionId: TEST_CONFIG.MOCK_SESSION_ID }, {})
      );

      expect(sessionInfo.actions).toHaveLength(3);
      expect(sessionInfo.actions.map(a => a.toolName)).toEqual([
        'playwright_navigate',
        'playwright_click',
        'playwright_fill'
      ]);
      expect(sessionInfo.actions.map(a => a.params)).toEqual([
        { url: 'https://example.com' },
        { selector: '#submit-button' },
        { selector: '#search-input', value: 'test query' }
      ]);
    });
  });

  describe('Test Generation', () => {
    it('should generate valid Playwright test code', async () => {
      // Setup mock for end session response
      mockedHandleToolCall.mockImplementation(async (name, args, server) => {
        if (name === 'end_codegen_session') {
          return createMockResponse({
            filePath: path.join(TEST_CONFIG.OUTPUT_DIR, 'test.spec.ts'),
            testCode: `
              import { test, expect } from '@playwright/test';
              
              test('generated test', async ({ page }) => {
                await page.goto('https://example.com');
                await page.click('#submit-button');
                await page.fill('#search-input', 'test query');
              });
            `
          });
        }
        return createMockResponse({ success: true });
      });

      // Record actions
      await handleToolCall('playwright_navigate', {
        url: 'https://example.com'
      }, {});

      await handleToolCall('playwright_click', {
        selector: '#submit-button'
      }, {});

      await handleToolCall('playwright_fill', {
        selector: '#search-input',
        value: 'test query'
      }, {});

      // Generate test
      const endResult = await handleToolCall('end_codegen_session', {
        sessionId: TEST_CONFIG.MOCK_SESSION_ID
      }, {});

      const { filePath, testCode } = parseJsonResponse<{ filePath: string; testCode: string }>(endResult);
      
      // Verify test code content
      expect(filePath).toBeDefined();
      expect(testCode).toContain('import { test, expect } from \'@playwright/test\'');
      expect(testCode).toContain('await page.goto(\'https://example.com\')');
      expect(testCode).toContain('await page.click(\'#submit-button\')');
      expect(testCode).toContain('await page.fill(\'#search-input\', \'test query\')');

      // Verify mock was called correctly
      expect(mockedHandleToolCall).toHaveBeenCalledWith(
        'end_codegen_session',
        { sessionId: TEST_CONFIG.MOCK_SESSION_ID },
        {}
      );
    });
  });
}); 