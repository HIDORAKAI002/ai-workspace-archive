/**
 * @module chatwithattachment.integration.test
 * 
 * Integration tests for file content injection that call the actual LLM APIs.
 * These tests verify file content understanding by injecting file content directly into prompts
 * using the <file></file> marker pattern and the regular ChatDriver API.
 * 
 * These tests require API keys to be set for the providers being tested:
 * - OPENAI_API_KEY for OpenAI
 * - AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT for Azure OpenAI
 * - GOOGLE_GEMINI_API_KEY for Google Gemini
 */

// Copyright (c) 2025, 2026 Jon Verrier

import { describe, it, after } from 'mocha';
import { expect } from 'expect';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ChatDriverFactory, EModelProvider, EModel, EVerbosity, ChatWithAttachmentDriverFactory, IChatTableJson } from '../src/entry';
import { CHAT_WITH_ATTACHMENT_TEST_PROVIDERS, createChatWithAttachmentDrivers, TEST_TIMEOUT_MS } from './ChatWithAttachmentTestConfig';

/**
 * Returns the appropriate timeout for a test based on the provider.
 * kGoogleGemini tests use 120s timeout, others use the default TEST_TIMEOUT_MS.
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module contains end-to-end integration tests that verify large language models can understand injected file content and structured table data using the regular chat APIs. It targets multiple providers and requires real API keys (OpenAI, Azure OpenAI, Google Gemini). Tests inject file text directly into prompts using a <file></file> marker and also pass table JSON to attachment-aware drivers.
// 
// The module builds chat drivers per provider via ChatDriverFactory and createChatWithAttachmentDrivers from the test config. It selects providers using CHAT_WITH_ATTACHMENT_TEST_PROVIDERS and adjusts timeouts with getTestTimeout, giving Google Gemini a longer limit. It uses driver.getModelResponse to assert comprehension of small text files and a generated 10-page (~20KB) markdown document. Helpers include extractFileContent (Buffer or string), injectFileIntoPrompt, createTestFile, generate10PageMarkdown, and cleanup in an after hook.
// 
// Table JSON tests construct realistic and simple IChatTableJson payloads (e.g., financial report tables) and assert numeric reasoning and selection. Key imports: mocha’s describe/it/after, expect assertions, fs/path/os for files, and SDK symbols ChatDriverFactory, EModelProvider, EModel, EVerbosity, ChatWithAttachmentDriverFactory, IChatTableJson.
// ===End StrongAI Generated Comment===
const getTestTimeout = (provider: EModelProvider): number => {
   return provider === EModelProvider.kGoogleGemini ? 120000 : TEST_TIMEOUT_MS;
};

// Create drivers for all test providers
const factory = new ChatDriverFactory();
const providers = CHAT_WITH_ATTACHMENT_TEST_PROVIDERS;
const drivers = providers.map(provider => {
   try {
      return factory.create(EModel.kLarge, provider);
   } catch (error) {
      // If provider initialization fails (e.g., missing API key), return null
      // Tests will skip providers that fail to initialize
      return null;
   }
});
const attachmentDrivers = createChatWithAttachmentDrivers(EModel.kLarge);

/**
 * Extracts text content from file data in various formats.
 */
function extractFileContent(data: Buffer | string): string {
   if (typeof data === 'string') {
      return data;
   } else if (Buffer.isBuffer(data)) {
      return data.toString('utf8');
   } else {
      throw new Error(`Unsupported file data type: ${typeof data}`);
   }
}

/**
 * Injects file content into a prompt with <file></file> markers.
 */
function injectFileIntoPrompt(prompt: string, fileContent: string): string {
   return prompt.replace('<file></file>', `<file>${fileContent}</file>`);
}

describe('File Content Injection Integration Tests', () => {
   // Known test file names for cleanup
   const testFileNames = [
      'motor-racing-integration-test.txt',
      'gardening-integration-test.txt',
      'markdown-10pages-integration-test.txt'
   ];

   /**
    * Creates or reuses a temporary test file with the specified content in system temp directory
    */
   const createTestFile = (filename: string, content: string): string => {
      const filePath = path.join(os.tmpdir(), filename);
      if (!fs.existsSync(filePath)) {
         fs.writeFileSync(filePath, content, 'utf8');
      }
      return filePath;
   };

   /**
    * Generates a realistic 10-page markdown file (~20KB) simulating a docx converted to markdown.
    * Each page contains approximately 2000 characters of markdown content.
    */
   const generate10PageMarkdown = (): string => {
      const pages: string[] = [];
      
      for (let page = 1; page <= 10; page++) {
         pages.push(`# Page ${page}\n\n`);
         pages.push(`## Introduction\n\n`);
         pages.push(`This is page ${page} of a document that was converted from a Word document (docx) to markdown format. `);
         pages.push(`The content includes various markdown elements such as headers, paragraphs, lists, and code blocks.\n\n`);
         
         pages.push(`### Section ${page}.1: Content Details\n\n`);
         pages.push(`Here is some detailed content for page ${page}. This paragraph contains information about `);
         pages.push(`various topics that might appear in a typical document. The text includes multiple sentences `);
         pages.push(`and covers different aspects of the subject matter.\n\n`);
         
         pages.push(`#### Subsection ${page}.1.1\n\n`);
         pages.push(`- **Item 1**: This is the first bullet point with some important information.\n`);
         pages.push(`- **Item 2**: This is the second bullet point with additional details.\n`);
         pages.push(`- **Item 3**: This is the third bullet point that completes the list.\n\n`);
         
         pages.push(`#### Subsection ${page}.1.2\n\n`);
         pages.push(`Here is a code block example:\n\n`);
         pages.push(`\`\`\`typescript\n`);
         pages.push(`function example${page}() {\n`);
         pages.push(`   return "This is page ${page} code";\n`);
         pages.push(`}\n`);
         pages.push(`\`\`\`\n\n`);
         
         pages.push(`### Section ${page}.2: Additional Information\n\n`);
         pages.push(`This section provides more context and details about the topic. It includes multiple paragraphs `);
         pages.push(`with varying lengths to simulate realistic document structure. The content is designed to `);
         pages.push(`represent what you might find in a typical business or technical document.\n\n`);
         
         pages.push(`**Key Points for Page ${page}:**\n\n`);
         pages.push(`1. First important point about the content\n`);
         pages.push(`2. Second important point with more details\n`);
         pages.push(`3. Third important point that summarizes the section\n\n`);
         
         pages.push(`> This is a blockquote that emphasizes an important concept on page ${page}.\n\n`);
         
         pages.push(`### Section ${page}.3: Summary\n\n`);
         pages.push(`In summary, page ${page} contains structured markdown content that represents a typical `);
         pages.push(`document page. The content includes headers, paragraphs, lists, code blocks, and other `);
         pages.push(`markdown elements that would be found in a converted document.\n\n`);
         
         pages.push(`---\n\n`);
      }
      
      const content = pages.join('');
      // Ensure we're close to 20KB (20,000 characters)
      const targetSize = 20000;
      if (content.length < targetSize) {
         // Pad with additional content if needed
         const padding = '\n\nAdditional content to reach target size. '.repeat(
            Math.ceil((targetSize - content.length) / 40)
         );
         return content + padding.substring(0, targetSize - content.length);
      } else if (content.length > targetSize) {
         // Truncate if slightly over
         return content.substring(0, targetSize);
      }
      return content;
   };

   /**
    * Clean up temporary test files after all tests complete
    */
   after(() => {
      // Clean up temporary test files
      testFileNames.forEach(filename => {
         const filePath = path.join(os.tmpdir(), filename);
         try {
            if (fs.existsSync(filePath)) {
               fs.unlinkSync(filePath);
               console.log(`Cleaned up test file: ${filename}`);
            }
         } catch (error) {
            console.warn(`Failed to clean up test file ${filename}:`, error);
         }
      });
   });

   // Run tests for each provider
   providers.forEach((provider, index) => {
      const driver = drivers[index];
      
      // Skip tests if driver failed to initialize (e.g., missing API key)
      if (!driver) {
         console.warn(`Skipping tests for ${provider} - driver initialization failed (likely missing API key)`);
         return;
      }

      const providerName = provider === EModelProvider.kOpenAI ? 'OpenAI' 
         : provider === EModelProvider.kAzureOpenAI ? 'Azure OpenAI'
         : provider === EModelProvider.kGoogleGemini ? 'Google Gemini'
         : provider === EModelProvider.kDefault ? 'Default'
         : String(provider);

      describe(`${providerName} - File Content Understanding Tests`, () => {
         it('understands motor racing file content', async () => {
            const filePath = createTestFile('motor-racing-integration-test.txt', 'This file is about motor racing.');
            const fileContent = fs.readFileSync(filePath, 'utf8');

            const userPrompt = 'What is this file about? Answer in one sentence. <file></file>';
            const promptWithFile = injectFileIntoPrompt(userPrompt, fileContent);

            const result = await driver.getModelResponse(
               undefined,
               promptWithFile,
               EVerbosity.kMedium
            );

            expect(result.toLowerCase()).toMatch(/motor/);
            expect(result.toLowerCase()).toMatch(/racing/);
         }).timeout(getTestTimeout(provider));

         it('understands gardening file content and does not mention motor racing', async () => {
            const filePath = createTestFile('gardening-integration-test.txt', 'This file is about gardening.');
            const fileContent = fs.readFileSync(filePath, 'utf8');

            const userPrompt = 'What is this file about? Answer in one sentence. <file></file>';
            const promptWithFile = injectFileIntoPrompt(userPrompt, fileContent);

            const result = await driver.getModelResponse(
               undefined,
               promptWithFile,
               EVerbosity.kMedium
            );

            expect(result.toLowerCase()).toMatch(/garden/);
            expect(result.toLowerCase()).not.toMatch(/motor.*racing|racing.*motor/);
         }).timeout(getTestTimeout(provider));
      });

      describe(`${providerName} - Markdown File Content Injection Tests (10 pages, ~20KB)`, () => {
         const markdownContent = generate10PageMarkdown();
         const markdownSizeBytes = Buffer.from(markdownContent, 'utf8').length;

         it('injects markdown file content from Buffer format', async () => {
            const fileBuffer = Buffer.from(markdownContent, 'utf8');
            const fileContent = extractFileContent(fileBuffer);

            const userPrompt = 'How many pages are in this document? Answer with just the number. <file></file>';
            const promptWithFile = injectFileIntoPrompt(userPrompt, fileContent);

            const result = await driver.getModelResponse(
               undefined,
               promptWithFile,
               EVerbosity.kMedium
            );

            // Should successfully process the file content
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
         }).timeout(getTestTimeout(provider));

         it('injects markdown file content from string format', async () => {
            const userPrompt = 'What is the main topic of this document? Answer in one sentence. <file></file>';
            const promptWithFile = injectFileIntoPrompt(userPrompt, markdownContent);

            const result = await driver.getModelResponse(
               undefined,
               promptWithFile,
               EVerbosity.kMedium
            );

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
         }).timeout(getTestTimeout(provider));

         it('injects markdown file content and processes large files', async () => {
            const userPrompt = 'Summarize the first page of this document in one sentence. <file></file>';
            const promptWithFile = injectFileIntoPrompt(userPrompt, markdownContent);

            const result = await driver.getModelResponse(
               undefined,
               promptWithFile,
               EVerbosity.kMedium
            );

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
         }).timeout(getTestTimeout(provider));

         it('injects markdown file content with different prompts', async () => {
            const userPrompt = 'What type of document is this? Answer in one word. <file></file>';
            const promptWithFile = injectFileIntoPrompt(userPrompt, markdownContent);

            const result = await driver.getModelResponse(
               undefined,
               promptWithFile,
               EVerbosity.kMedium
            );

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
         }).timeout(getTestTimeout(provider));

         it('verifies markdown file size is approximately 20KB', () => {
            const sizeBytes = Buffer.from(markdownContent, 'utf8').length;
            const sizeKB = sizeBytes / 1024;
            
            // Should be approximately 20KB (allow some variance)
            expect(sizeBytes).toBeGreaterThan(19000); // At least 19KB
            expect(sizeBytes).toBeLessThan(21000);     // At most 21KB
            expect(sizeKB).toBeCloseTo(20, 0);         // Approximately 20KB
            
            console.log(`Markdown file size: ${sizeKB.toFixed(2)}KB (${sizeBytes} bytes)`);
         });

         it('saves markdown test file to disk for inspection', () => {
            const filePath = createTestFile('markdown-10pages-integration-test.txt', markdownContent);
            const savedContent = fs.readFileSync(filePath, 'utf8');
            const savedSize = fs.statSync(filePath).size;
            
            expect(savedContent).toBe(markdownContent);
            expect(savedSize).toBe(markdownSizeBytes);
            expect(fs.existsSync(filePath)).toBe(true);
         });
      });
   });

   // Table JSON Integration Tests
   providers.forEach((provider, index) => {
      const driver = attachmentDrivers[index];
      
      // Skip tests if driver failed to initialize (e.g., missing API key)
      if (!driver) {
         console.warn(`Skipping tests for ${provider} - driver initialization failed (likely missing API key)`);
         return;
      }

      const providerName = provider === EModelProvider.kOpenAI ? 'OpenAI' 
         : provider === EModelProvider.kAzureOpenAI ? 'Azure OpenAI'
         : provider === EModelProvider.kGoogleGemini ? 'Google Gemini'
         : provider === EModelProvider.kDefault ? 'Default'
         : String(provider);

      describe(`${providerName} - Table JSON Integration Tests`, () => {
         /**
          * Generates realistic table JSON that simulates LlamaParse output.
          * This represents a typical financial report with multiple tables.
          */
         const generateFinancialTableJson = (): IChatTableJson => {
            return {
               name: 'Financial Report Tables',
               description: 'Tables extracted from Q1 2024 financial report',
               data: [
                  {
                     table: 'Revenue Summary',
                     page: 1,
                     rows: [
                        { quarter: 'Q1 2024', revenue: 1250000, growth: '12%' },
                        { quarter: 'Q4 2023', revenue: 1115000, growth: '8%' },
                        { quarter: 'Q1 2023', revenue: 1032000, growth: '5%' }
                     ]
                  },
                  {
                     table: 'Expense Breakdown',
                     page: 2,
                     rows: [
                        { category: 'Salaries', amount: 450000, percentage: '36%' },
                        { category: 'Marketing', amount: 200000, percentage: '16%' },
                        { category: 'Operations', amount: 150000, percentage: '12%' },
                        { category: 'Other', amount: 450000, percentage: '36%' }
                     ]
                  },
                  {
                     table: 'Profit Analysis',
                     page: 3,
                     rows: [
                        { metric: 'Gross Profit', value: 800000, margin: '64%' },
                        { metric: 'Operating Profit', value: 500000, margin: '40%' },
                        { metric: 'Net Profit', value: 380000, margin: '30.4%' }
                     ]
                  }
               ]
            };
         };

         /**
          * Generates a simple table JSON for basic testing.
          */
         const generateSimpleTableJson = (): IChatTableJson => {
            return {
               name: 'Product Inventory',
               data: {
                  products: [
                     { id: 'P001', name: 'Widget A', stock: 150, price: 29.99 },
                     { id: 'P002', name: 'Widget B', stock: 75, price: 49.99 },
                     { id: 'P003', name: 'Widget C', stock: 200, price: 19.99 }
                  ]
               }
            };
         };

         it('processes table JSON and understands revenue data', async () => {
            const tableJson = generateFinancialTableJson();

            const result = await driver.getModelResponse(
               'You are a financial analyst. Analyze the provided table data.',
               'What was the revenue for Q1 2024? Answer with just the number.',
               EVerbosity.kMedium,
               undefined,
               tableJson
            );

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            // Should mention the revenue amount (1250000 or 1.25M or similar)
            expect(result).toMatch(/1250000|1[.,]25\s*[Mm]|1250/);
         }).timeout(getTestTimeout(provider));

         it('processes table JSON and calculates totals', async () => {
            const tableJson = generateFinancialTableJson();

            const result = await driver.getModelResponse(
               'You are a financial analyst.',
               'What is the total of all expense categories? Answer with just the number.',
               EVerbosity.kMedium,
               undefined,
               tableJson
            );

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            // Total expenses: 450000 + 200000 + 150000 + 450000 = 1250000
            // Accept formats: 1250000, 1,250,000, 1.25M, 1,25M, 1250k, etc.
            expect(result.replace(/,/g, '')).toMatch(/1250000|1[.,]25\s*[Mm]|1250/);
         }).timeout(getTestTimeout(provider));

         it('processes table JSON and identifies highest value', async () => {
            const tableJson = generateSimpleTableJson();

            const result = await driver.getModelResponse(
               'You are an inventory manager.',
               'Which product has the highest stock level? Answer with just the product ID.',
               EVerbosity.kMedium,
               undefined,
               tableJson
            );

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            // Widget C has the highest stock (200)
            expect(result.toLowerCase()).toMatch(/p003|widget\s*c/);
         }).timeout(getTestTimeout(provider));

         it('processes table JSON without description', async () => {
            const tableJson: IChatTableJson = {
               name: 'Simple Data',
               data: { temperature: 72, humidity: 45, pressure: 1013 }
            };

            const result = await driver.getModelResponse(
               'You are a data analyst.',
               'What is the temperature value? Answer with just the number.',
               EVerbosity.kMedium,
               undefined,
               tableJson
            );

            expect(result).toBeDefined();
            expect(result).toMatch(/72/);
         }).timeout(getTestTimeout(provider));

         it('processes complex nested table JSON structure', async () => {
            const tableJson: IChatTableJson = {
               name: 'Multi-Level Tables',
               description: 'Complex nested table structure',
               data: {
                  report: {
                     metadata: { year: 2024, quarter: 'Q1' },
                     tables: [
                        {
                           name: 'Sales by Region',
                           data: [
                              { region: 'North', sales: 500000 },
                              { region: 'South', sales: 300000 },
                              { region: 'East', sales: 400000 },
                              { region: 'West', sales: 350000 }
                           ]
                        },
                        {
                           name: 'Top Products',
                           data: [
                              { product: 'Product A', units: 1000, revenue: 50000 },
                              { product: 'Product B', units: 800, revenue: 40000 }
                           ]
                        }
                     ]
                  }
               }
            };

            const result = await driver.getModelResponse(
               'You are a business analyst.',
               'What is the total sales across all regions? Answer with just the number.',
               EVerbosity.kMedium,
               undefined,
               tableJson
            );

            expect(result).toBeDefined();
            // Total: 500000 + 300000 + 400000 + 350000 = 1550000
            // Accept formats: 1550000, 1,550,000, 1.55M, 1,55M, 1550k, etc.
            expect(result.replace(/,/g, '')).toMatch(/1550000|1[.,]55\s*[Mm]|1550/);
         }).timeout(getTestTimeout(provider));

         it('processes table JSON with array of simple objects', async () => {
            const tableJson: IChatTableJson = {
               name: 'Employee List',
               data: [
                  { name: 'Alice', department: 'Engineering', salary: 120000 },
                  { name: 'Bob', department: 'Sales', salary: 95000 },
                  { name: 'Charlie', department: 'Engineering', salary: 130000 }
               ]
            };

            const result = await driver.getModelResponse(
               'You are an HR analyst.',
               'How many employees are in Engineering? Answer with just the number.',
               EVerbosity.kMedium,
               undefined,
               tableJson
            );

            expect(result).toBeDefined();
            expect(result).toMatch(/2/);
         }).timeout(getTestTimeout(provider));

         it('handles empty table JSON gracefully', async () => {
            const tableJson: IChatTableJson = {
               name: 'Empty Table',
               data: []
            };

            const result = await driver.getModelResponse(
               'You are a data analyst.',
               'What data is in the table? Answer in one sentence.',
               EVerbosity.kMedium,
               undefined,
               tableJson
            );

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
         }).timeout(getTestTimeout(provider));
      });
   });
});

