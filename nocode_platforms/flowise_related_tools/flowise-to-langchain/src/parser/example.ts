/**
 * Example usage of the Flowise JSON Parser
 */

import {
  FlowiseParser,
  parseFlowiseJson,
  quickParse,
  validate,
} from './index.js';

// Example Flowise JSON data
const exampleFlow = {
  nodes: [
    {
      id: 'node1',
      position: { x: 100, y: 100 },
      type: 'customNode',
      data: {
        id: 'node1',
        label: 'OpenAI GPT-4',
        version: 2,
        name: 'openAI',
        type: 'openAI',
        baseClasses: ['BaseLanguageModel'],
        category: 'llm',
        description: 'OpenAI GPT-4 language model',
        inputParams: [
          {
            label: 'Temperature',
            name: 'temperature',
            type: 'number',
            default: 0.7,
            min: 0,
            max: 1,
          },
        ],
        inputAnchors: [],
        inputs: {
          temperature: 0.7,
        },
        outputAnchors: [
          {
            id: 'output1',
            name: 'output',
            label: 'BaseLanguageModel',
            type: 'BaseLanguageModel',
          },
        ],
      },
    },
  ],
  edges: [],
  chatflow: {
    id: 'example-flow',
    name: 'Example Flow',
    flowData: '{}',
    deployed: false,
    isPublic: false,
    apikeyid: '',
    createdDate: '2024-01-01T00:00:00.000Z',
    updatedDate: '2024-01-01T00:00:00.000Z',
  },
};

async function demonstrateParser(): Promise<void> {
  console.log('🚀 Flowise JSON Parser Demo\n');

  // 1. Basic parsing
  console.log('📋 1. Basic Parsing');
  const basicResult = await parseFlowiseJson(JSON.stringify(exampleFlow));
  console.log(`Success: ${basicResult.success}`);
  console.log(`Nodes: ${basicResult.metadata.nodeCount}`);
  console.log(`Edges: ${basicResult.metadata.edgeCount}`);
  console.log(`Parse time: ${basicResult.metadata.parseTime.toFixed(2)}ms\n`);

  // 2. Quick validation
  console.log('⚡ 2. Quick Validation');
  const quickResult = await quickParse(JSON.stringify(exampleFlow));
  console.log(`Valid: ${quickResult.success}\n`);

  // 3. Detailed validation
  console.log('🔍 3. Detailed Validation');
  const validationResult = await validate(JSON.stringify(exampleFlow));
  console.log(`Valid: ${validationResult.isValid}`);
  console.log(`Errors: ${validationResult.errors.length}`);
  console.log(`Warnings: ${validationResult.warnings.length}\n`);

  // 4. Parser with options
  console.log('⚙️ 4. Parser with Custom Options');
  const customParser = new FlowiseParser({
    includeWarnings: true,
    autoDetectVersion: true,
    minimal: false,
  });

  const customResult = await customParser.parseString(
    JSON.stringify(exampleFlow)
  );
  console.log(`Success: ${customResult.success}`);
  console.log(
    `Detected version: ${customResult.metadata.flowiseVersion || 'unknown'}`
  );
  console.log(`Complexity: ${customResult.metadata.complexity}`);
  console.log(`Warnings: ${customResult.warnings.length}\n`);

  // 5. Error handling demo
  console.log('❌ 5. Error Handling Demo');
  const invalidJson = '{ "nodes": [{ "invalid": }], "edges": [] }';
  const errorResult = await parseFlowiseJson(invalidJson);
  console.log(`Success: ${errorResult.success}`);
  if (!errorResult.success) {
    console.log(`Error type: ${errorResult.errors[0]?.type}`);
    console.log(`Error message: ${errorResult.errors[0]?.message}`);
  }
}

// Run the demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateParser().catch(console.error);
}

export { demonstrateParser };
