/**
 * Example: DuckDuckGo Search Tool Converter
 * 
 * This example demonstrates how the DuckDuckGoSearchConverter transforms
 * a Flowise duckDuckGoSearch node into LangChain TypeScript code.
 */

import { DuckDuckGoSearchConverter } from '../src/registry/converters/search-tool';
import { IRNode, GenerationContext } from '../src/ir/types';

// Example Flowise node for DuckDuckGo Search
const duckDuckGoNode: IRNode = {
  id: 'duckduckgo_123',
  type: 'duckDuckGoSearch',
  label: 'Web Search Tool',
  category: 'tool',
  inputs: [],
  outputs: [],
  parameters: [
    {
      name: 'maxResults',
      value: 5,
      type: 'number'
    },
    {
      name: 'searchParams',
      value: {
        region: 'us-en',
        safesearch: 'moderate',
        timeRange: 'd' // past day
      },
      type: 'object'
    },
    {
      name: 'timeout',
      value: 10000,
      type: 'number'
    }
  ],
  position: { x: 100, y: 200 },
  metadata: {
    description: 'Search the web using DuckDuckGo'
  }
};

// Create converter and generation context
const converter = new DuckDuckGoSearchConverter();
const context: GenerationContext = {
  target: 'typescript',
  outputDir: './output',
  options: {},
  metadata: {}
};

// Convert the node
const codeFragments = converter.convert(duckDuckGoNode, context);

// Display the generated code
console.log('Generated Code Fragments:\n');

codeFragments.forEach((fragment) => {
  console.log(`// ${fragment.type.toUpperCase()}: ${fragment.id}`);
  console.log(fragment.content);
  console.log();
});

// Example of complete generated code:
console.log('// Complete Example Usage:');
console.log(`
import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search';

// Initialize the DuckDuckGo search tool
const webSearchTool = new DuckDuckGoSearch({
  maxResults: 5,
  searchParams: {
    region: 'us-en',
    safesearch: 'moderate',
    timeRange: 'd'
  },
  timeout: 10000
});

// Use the tool in an agent or chain
async function searchExample() {
  const query = "LangChain TypeScript examples";
  const results = await webSearchTool.call(query);
  console.log("Search Results:", results);
}

// Example with default settings
const simpleSearchTool = new DuckDuckGoSearch({
  maxResults: 4  // Default value
});
`);