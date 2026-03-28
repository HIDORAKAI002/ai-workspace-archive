/**
 * AgentFlow V2 Workflow Integration Test
 * Tests complete AgentFlow V2 workflows with multiple node types
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  AgentNodeConverter,
  ToolNodeConverter,
  CustomFunctionNodeConverter,
  SubflowNodeConverter,
} from '../../src/registry/converters/agentflow-v2.js';
import { IRNode, GenerationContext, CodeFragment } from '../../src/ir/types.js';

describe('AgentFlow V2 Workflow Integration', () => {
  let context: GenerationContext;

  beforeEach(() => {
    context = {
      mode: 'typescript',
      packageManager: 'npm',
      exportFormat: 'es6',
      target: 'node',
      version: '1.0.0',
      dependencies: new Set(),
      metadata: {
        flowName: 'advanced-agentflow-v2-workflow',
        version: '1.0.0',
        description: 'Advanced AgentFlow V2 workflow with all node types',
        author: 'Integration Test Suite',
        tags: ['test', 'agentflow-v2', 'workflow', 'integration'],
        timestamp: Date.now(),
      },
    };
  });

  describe('Complete Workflow Scenarios', () => {
    it('should generate a complete customer service workflow', () => {
      // Define a comprehensive customer service workflow
      const nodes: IRNode[] = [
        // Data preprocessing function
        {
          id: 'preprocess-1',
          type: 'customFunctionNode',
          data: {
            name: 'preprocessCustomerData',
            code: `
              const customerInfo = JSON.parse(input);
              return {
                ...customerInfo,
                priority: customerInfo.tier === 'premium' ? 'high' : 'normal',
                timestamp: Date.now(),
                preprocessed: true
              };
            `,
            async: false,
            enableLogging: true,
            validateInput: true,
            inputSchema: {
              tier: { type: 'string', description: 'Customer tier' },
              issue: { type: 'string', description: 'Customer issue' },
            },
            outputSchema: {
              priority: { type: 'string', description: 'Issue priority' },
              timestamp: { type: 'number', description: 'Processing timestamp' },
              preprocessed: { type: 'boolean', description: 'Preprocessing flag' },
            },
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 100, y: 100 },
            version: '1.0.0',
          },
        },

        // Knowledge base search tool
        {
          id: 'knowledge-tool-1',
          type: 'toolNode',
          data: {
            name: 'knowledge_search',
            description: 'Search customer service knowledge base',
            func: `
              function(query) {
                // Simulate knowledge base search
                const knowledge = {
                  'billing': 'For billing issues, please check your account dashboard or contact billing@company.com',
                  'technical': 'For technical issues, please try restarting the application or check our troubleshooting guide',
                  'general': 'For general inquiries, please visit our FAQ section or contact support@company.com'
                };
                
                const category = query.toLowerCase().includes('billing') ? 'billing' :
                              query.toLowerCase().includes('technical') ? 'technical' : 'general';
                              
                return {
                  category,
                  response: knowledge[category],
                  confidence: 0.85
                };
              }
            `,
            returnDirect: false,
            async: false,
            enableCaching: true,
            cacheSize: 100,
            enableLogging: true,
            timeout: 5000,
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 200, y: 200 },
            version: '1.0.0',
          },
        },

        // Email generation tool
        {
          id: 'email-tool-1',
          type: 'toolNode',
          data: {
            name: 'email_generator',
            description: 'Generate customer service email responses',
            func: `
              function(data) {
                const { customerInfo, knowledgeResponse } = JSON.parse(data);
                
                return {
                  to: customerInfo.email,
                  subject: 'Re: Your Support Request - ' + customerInfo.issue,
                  body: 'Dear ' + customerInfo.name + ',\\n\\n' +
                        'Thank you for contacting us regarding: ' + customerInfo.issue + '\\n\\n' +
                        knowledgeResponse.response + '\\n\\n' +
                        'If you need further assistance, please don\\'t hesitate to reach out.\\n\\n' +
                        'Best regards,\\nCustomer Service Team',
                  priority: customerInfo.priority,
                  category: knowledgeResponse.category
                };
              }
            `,
            returnDirect: false,
            async: false,
            enableRetry: true,
            maxRetries: 2,
            validateOutput: true,
            outputSchema: {
              to: { type: 'string', description: 'Recipient email' },
              subject: { type: 'string', description: 'Email subject' },
              body: { type: 'string', description: 'Email body' },
              priority: { type: 'string', description: 'Email priority' },
              category: { type: 'string', description: 'Issue category' },
            },
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 300, y: 200 },
            version: '1.0.0',
          },
        },

        // Main customer service agent
        {
          id: 'cs-agent-1',
          type: 'agentNode',
          data: {
            name: 'CustomerServiceAgent',
            llm: 'openai-gpt4',
            tools: ['knowledge_search', 'email_generator'],
            maxIterations: 5,
            verbose: true,
            agentType: 'openai-functions',
            planningStrategy: 'reactive',
            enableCallbacks: true,
            trackMetrics: true,
            enableErrorHandling: true,
            errorHandlingStrategy: 'continue',
            maxExecutionTime: 60000,
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 400, y: 100 },
            version: '1.0.0',
          },
        },

        // Quality assurance subflow
        {
          id: 'qa-subflow-1',
          type: 'subflowNode',
          data: {
            subflowId: 'quality-assurance-workflow',
            subflowName: 'qaValidation',
            parallel: false,
            enableErrorHandling: true,
            errorStrategy: 'fallback',
            fallbackSubflow: 'manual-review-workflow',
            enableMonitoring: true,
            trackDataFlow: true,
            timeout: 30000,
            inputMapping: {
              email: 'generatedEmail',
              customerData: 'originalCustomerData',
            },
            outputMapping: {
              approvedEmail: 'finalEmail',
              qaScore: 'qualityScore',
            },
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 500, y: 200 },
            version: '1.0.0',
          },
        },

        // Final processing function
        {
          id: 'finalize-1',
          type: 'customFunctionNode',
          data: {
            name: 'finalizeResponse',
            code: `
              const { email, qaScore, customerInfo } = input;
              
              // Log the interaction
              console.log('Customer service interaction completed:', {
                customer: customerInfo.name,
                issue: customerInfo.issue,
                priority: customerInfo.priority,
                qaScore: qaScore,
                timestamp: Date.now()
              });
              
              // Determine next actions
              const nextActions = [];
              if (qaScore < 0.8) {
                nextActions.push('schedule_manual_review');
              }
              if (customerInfo.priority === 'high') {
                nextActions.push('escalate_to_manager');
              }
              nextActions.push('send_email');
              
              return {
                finalEmail: email,
                nextActions: nextActions,
                interactionId: 'cs_' + Date.now(),
                status: 'completed',
                metrics: {
                  qaScore: qaScore,
                  processingTime: Date.now() - customerInfo.timestamp
                }
              };
            `,
            async: true,
            enableState: true,
            stateVariables: { interactionCount: 0 },
            enableMetrics: true,
            enableLogging: true,
            enableErrorHandling: true,
            errorStrategy: 'continue',
            timeout: 10000,
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 600, y: 100 },
            version: '1.0.0',
          },
        },
      ];

      // Convert all nodes
      const converters = {
        'customFunctionNode': new CustomFunctionNodeConverter(),
        'toolNode': new ToolNodeConverter(),
        'agentNode': new AgentNodeConverter(),
        'subflowNode': new SubflowNodeConverter(),
      };

      const allFragments: CodeFragment[] = [];
      const dependencies = new Set<string>();

      for (const node of nodes) {
        const converter = converters[node.type as keyof typeof converters];
        expect(converter).toBeDefined();
        expect(converter.canConvert(node)).toBe(true);

        const fragments = converter.convert(node, context);
        expect(fragments.length).toBeGreaterThan(0);
        
        allFragments.push(...fragments);
        
        const nodeDeps = converter.getDependencies(node, context);
        nodeDeps.forEach(dep => dependencies.add(dep));
      }

      // Verify we have all required fragment types
      const fragmentTypes = new Set(allFragments.map(f => f.type));
      expect(fragmentTypes.has('import')).toBe(true);
      expect(fragmentTypes.has('initialization')).toBe(true);

      // Verify we have fragments for each node
      const nodeIds = new Set(allFragments.map(f => f.nodeId));
      expect(nodeIds.size).toBe(nodes.length);

      // Verify dependencies include all necessary packages
      expect(dependencies.has('@langchain/core')).toBe(true);
      expect(dependencies.has('langchain')).toBe(true);

      // Check specific features based on node configurations
      const allCode = allFragments.map(f => f.content).join('\\n');
      
      // Should include validation imports for nodes that use schemas
      expect(allCode).toContain('zod');
      
      // Should include agent executor for the main agent
      expect(allCode).toContain('AgentExecutor');
      expect(allCode).toContain('createOpenAIFunctionsAgent');
      
      // Should include dynamic tools
      expect(allCode).toContain('DynamicTool');
      
      // Should include runnable components for functions and subflows
      expect(allCode).toContain('RunnableLambda');
      expect(allCode).toContain('RunnableSequence');
      
      // Should include error handling and monitoring features
      expect(allCode).toContain('error handling');
      expect(allCode).toContain('metrics');
      
      // Should include state management for stateful functions
      expect(allCode).toContain('state management');
    });

    it('should generate a parallel processing workflow', () => {
      const nodes: IRNode[] = [
        // Input preprocessing
        {
          id: 'split-input-1',
          type: 'customFunctionNode',
          data: {
            name: 'splitInput',
            code: `
              const data = JSON.parse(input);
              return {
                textData: data.filter(item => item.type === 'text'),
                imageData: data.filter(item => item.type === 'image'),
                videoData: data.filter(item => item.type === 'video')
              };
            `,
            async: false,
            enableLogging: true,
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 100, y: 100 },
            version: '1.0.0',
          },
        },

        // Parallel processing subflow
        {
          id: 'parallel-processing-1',
          type: 'subflowNode',
          data: {
            subflowId: 'parallel-media-processing',
            subflowName: 'parallelMediaProcessing',
            parallel: true,
            maxConcurrency: 3,
            failFast: false,
            collectResults: true,
            enableMonitoring: true,
            trackDataFlow: true,
            enableErrorHandling: true,
            errorStrategy: 'continue',
            timeout: 120000,
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 200, y: 100 },
            version: '1.0.0',
          },
        },

        // Results aggregation
        {
          id: 'aggregate-results-1',
          type: 'customFunctionNode',
          data: {
            name: 'aggregateResults',
            code: `
              const { textResults, imageResults, videoResults } = input;
              
              return {
                totalProcessed: (textResults?.length || 0) + (imageResults?.length || 0) + (videoResults?.length || 0),
                textCount: textResults?.length || 0,
                imageCount: imageResults?.length || 0,
                videoCount: videoResults?.length || 0,
                status: 'completed',
                timestamp: Date.now(),
                results: {
                  text: textResults || [],
                  images: imageResults || [],
                  videos: videoResults || []
                }
              };
            `,
            async: false,
            enableMetrics: true,
            enableLogging: true,
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 300, y: 100 },
            version: '1.0.0',
          },
        },
      ];

      const converters = {
        'customFunctionNode': new CustomFunctionNodeConverter(),
        'subflowNode': new SubflowNodeConverter(),
      };

      // Convert all nodes and verify parallel execution support
      for (const node of nodes) {
        const converter = converters[node.type as keyof typeof converters];
        expect(converter).toBeDefined();
        expect(converter.canConvert(node)).toBe(true);

        const fragments = converter.convert(node, context);
        expect(fragments.length).toBeGreaterThan(0);

        if (node.type === 'subflowNode') {
          const allCode = fragments.map(f => f.content).join('\\n');
          expect(allCode).toContain('parallel subflow execution');
          expect(allCode).toContain('RunnableParallel');
        }
      }
    });

    it('should generate a conditional workflow with fallbacks', () => {
      const nodes: IRNode[] = [
        // Input validation
        {
          id: 'validate-input-1',
          type: 'customFunctionNode',
          data: {
            name: 'validateInput',
            code: `
              const data = input;
              if (!data.userId) {
                throw new Error('User ID is required');
              }
              if (!data.action) {
                throw new Error('Action is required');
              }
              return { ...data, validated: true };
            `,
            async: false,
            enableErrorHandling: true,
            errorStrategy: 'fallback',
            fallbackValue: { error: 'Invalid input', validated: false },
            validateInput: true,
            inputSchema: {
              userId: { type: 'string', description: 'User identifier' },
              action: { type: 'string', description: 'Action to perform' },
            },
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 100, y: 100 },
            version: '1.0.0',
          },
        },

        // Conditional processing subflow
        {
          id: 'conditional-processing-1',
          type: 'subflowNode',
          data: {
            subflowId: 'conditional-user-action',
            subflowName: 'conditionalUserAction',
            enableConditional: true,
            conditionCode: 'input.validated === true && input.action === "premium_feature"',
            fallbackSubflow: 'basic-feature-workflow',
            enableErrorHandling: true,
            errorStrategy: 'fallback',
            enableRetry: true,
            maxRetries: 2,
            retryDelay: 1000,
            timeout: 30000,
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 200, y: 100 },
            version: '1.0.0',
          },
        },

        // Error handling tool
        {
          id: 'error-handler-1',
          type: 'toolNode',
          data: {
            name: 'error_handler',
            description: 'Handle workflow errors and generate appropriate responses',
            func: `
              function(errorData) {
                const { error, context } = JSON.parse(errorData);
                
                return {
                  handled: true,
                  errorType: error.type || 'unknown',
                  userMessage: 'We encountered an issue processing your request. Please try again later.',
                  logMessage: 'Error in workflow: ' + error.message,
                  shouldRetry: error.type === 'temporary',
                  escalate: error.type === 'critical'
                };
              }
            `,
            returnDirect: false,
            async: false,
            enableErrorHandling: true,
            enableLogging: true,
            timeout: 5000,
          },
          inputs: {},
          outputs: {},
          metadata: {
            position: { x: 300, y: 200 },
            version: '1.0.0',
          },
        },
      ];

      const converters = {
        'customFunctionNode': new CustomFunctionNodeConverter(),
        'subflowNode': new SubflowNodeConverter(),
        'toolNode': new ToolNodeConverter(),
      };

      // Convert all nodes and verify conditional and error handling features
      for (const node of nodes) {
        const converter = converters[node.type as keyof typeof converters];
        expect(converter).toBeDefined();
        expect(converter.canConvert(node)).toBe(true);

        const fragments = converter.convert(node, context);
        expect(fragments.length).toBeGreaterThan(0);

        const allCode = fragments.map(f => f.content).join('\\n');

        // Check for error handling features
        if (node.data.enableErrorHandling) {
          expect(allCode).toContain('error handling') || expect(allCode).toContain('catch');
        }

        // Check for conditional features in subflow
        if (node.type === 'subflowNode' && node.data.enableConditional) {
          expect(allCode).toContain('RunnableBranch') || expect(allCode).toContain('conditional');
        }

        // Check for retry features
        if (node.data.enableRetry) {
          expect(allCode).toContain('retry') || expect(allCode).toContain('Retry');
        }
      }
    });
  });

  describe('Workflow Dependencies and Compatibility', () => {
    it('should generate compatible dependencies across all node types', () => {
      const nodes: IRNode[] = [
        {
          id: 'agent-1',
          type: 'agentNode',
          data: {
            name: 'TestAgent',
            llm: 'openai-gpt4',
            tools: ['test-tool'],
            enableCallbacks: true,
            agentType: 'openai-functions',
          },
          inputs: {},
          outputs: {},
          metadata: { position: { x: 0, y: 0 }, version: '1.0.0' },
        },
        {
          id: 'tool-1',
          type: 'toolNode',
          data: {
            name: 'test-tool',
            func: 'function(x) { return x; }',
            async: true,
            inputSchema: { x: { type: 'string' } },
          },
          inputs: {},
          outputs: {},
          metadata: { position: { x: 0, y: 0 }, version: '1.0.0' },
        },
        {
          id: 'function-1',
          type: 'customFunctionNode',
          data: {
            name: 'test-function',
            code: 'return input;',
            enableContext: true,
            outputSchema: { result: { type: 'string' } },
          },
          inputs: {},
          outputs: {},
          metadata: { position: { x: 0, y: 0 }, version: '1.0.0' },
        },
        {
          id: 'subflow-1',
          type: 'subflowNode',
          data: {
            subflowId: 'test-subflow',
            enableMonitoring: true,
            enableErrorHandling: true,
          },
          inputs: {},
          outputs: {},
          metadata: { position: { x: 0, y: 0 }, version: '1.0.0' },
        },
      ];

      const converters = {
        'agentNode': new AgentNodeConverter(),
        'toolNode': new ToolNodeConverter(),
        'customFunctionNode': new CustomFunctionNodeConverter(),
        'subflowNode': new SubflowNodeConverter(),
      };

      const allDependencies = new Set<string>();

      for (const node of nodes) {
        const converter = converters[node.type as keyof typeof converters];
        const deps = converter.getDependencies(node, context);
        deps.forEach(dep => allDependencies.add(dep));
      }

      // Verify core dependencies are present
      expect(allDependencies.has('@langchain/core')).toBe(true);
      expect(allDependencies.has('langchain')).toBe(true);

      // Verify feature-specific dependencies
      expect(allDependencies.has('zod')).toBe(true); // For schema validation
      expect(allDependencies.has('@langchain/openai')).toBe(true); // For OpenAI agent
      expect(allDependencies.has('@langchain/core/callbacks')).toBe(true); // For callbacks/monitoring

      // Check that dependencies don't conflict
      const depArray = Array.from(allDependencies);
      const uniqueDeps = new Set(depArray);
      expect(uniqueDeps.size).toBe(depArray.length); // No duplicates
    });

    it('should generate consistent import patterns', () => {
      const node: IRNode = {
        id: 'test-1',
        type: 'customFunctionNode',
        data: {
          name: 'testFunction',
          code: 'return input;',
        },
        inputs: {},
        outputs: {},
        metadata: { position: { x: 0, y: 0 }, version: '1.0.0' },
      };

      const converter = new CustomFunctionNodeConverter();
      const fragments = converter.convert(node, context);

      const importFragments = fragments.filter(f => f.type === 'import');
      expect(importFragments.length).toBeGreaterThan(0);

      // Verify import syntax consistency
      for (const fragment of importFragments) {
        expect(fragment.content).toMatch(/^import\s+.*\s+from\s+['"][^'"]+['"];?$/m);
      }
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle large workflows efficiently', () => {
      // Create a large workflow with many nodes
      const nodes: IRNode[] = [];
      
      // Add 10 tool nodes
      for (let i = 0; i < 10; i++) {
        nodes.push({
          id: `tool-${i}`,
          type: 'toolNode',
          data: {
            name: `tool_${i}`,
            description: `Tool number ${i}`,
            func: `function(input) { return 'result_${i}: ' + input; }`,
            enableCaching: true,
          },
          inputs: {},
          outputs: {},
          metadata: { position: { x: i * 100, y: 100 }, version: '1.0.0' },
        });
      }

      // Add 5 custom functions
      for (let i = 0; i < 5; i++) {
        nodes.push({
          id: `function-${i}`,
          type: 'customFunctionNode',
          data: {
            name: `function_${i}`,
            code: `return { step: ${i}, result: input, timestamp: Date.now() };`,
            enableMetrics: true,
          },
          inputs: {},
          outputs: {},
          metadata: { position: { x: i * 100, y: 200 }, version: '1.0.0' },
        });
      }

      // Add 3 subflows
      for (let i = 0; i < 3; i++) {
        nodes.push({
          id: `subflow-${i}`,
          type: 'subflowNode',
          data: {
            subflowId: `subflow-${i}`,
            parallel: i % 2 === 0, // Alternate between parallel and sequential
            enableMonitoring: true,
          },
          inputs: {},
          outputs: {},
          metadata: { position: { x: i * 100, y: 300 }, version: '1.0.0' },
        });
      }

      // Add 2 agents
      for (let i = 0; i < 2; i++) {
        nodes.push({
          id: `agent-${i}`,
          type: 'agentNode',
          data: {
            name: `agent_${i}`,
            llm: 'openai-gpt4',
            tools: [`tool_${i}`, `tool_${i + 1}`],
            maxIterations: 3,
            trackMetrics: true,
          },
          inputs: {},
          outputs: {},
          metadata: { position: { x: i * 200, y: 400 }, version: '1.0.0' },
        });
      }

      expect(nodes.length).toBe(20); // 10 + 5 + 3 + 2

      const converters = {
        'toolNode': new ToolNodeConverter(),
        'customFunctionNode': new CustomFunctionNodeConverter(),
        'subflowNode': new SubflowNodeConverter(),
        'agentNode': new AgentNodeConverter(),
      };

      const startTime = Date.now();
      let totalFragments = 0;

      // Convert all nodes
      for (const node of nodes) {
        const converter = converters[node.type as keyof typeof converters];
        expect(converter).toBeDefined();
        
        const fragments = converter.convert(node, context);
        expect(fragments.length).toBeGreaterThan(0);
        totalFragments += fragments.length;
      }

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      // Performance assertions
      expect(totalFragments).toBeGreaterThan(20); // At least one fragment per node
      expect(processingTime).toBeLessThan(5000); // Should complete within 5 seconds
      
      console.log(`Processed ${nodes.length} nodes generating ${totalFragments} fragments in ${processingTime}ms`);
    });
  });
});