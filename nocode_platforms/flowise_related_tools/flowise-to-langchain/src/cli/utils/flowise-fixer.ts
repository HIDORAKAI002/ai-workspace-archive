import { ValidationResult } from '../types.js';

/**
 * Utility functions to automatically fix common issues in Flowise exports
 */

export async function fixFlowiseIssues(
  flowiseData: any,
  validationResult: ValidationResult
): Promise<any | null> {
  if (!validationResult.fixable || validationResult.errors.length === 0) {
    return null;
  }

  console.log('Attempting to fix Flowise export issues...');

  let fixedData = JSON.parse(JSON.stringify(flowiseData)); // Deep clone
  let fixesApplied = 0;

  try {
    for (const error of validationResult.errors) {
      switch (error.code) {
        case 'MISSING_PROPERTY':
          if (error.path?.includes('nodes') && !fixedData.nodes) {
            fixedData.nodes = [];
            fixesApplied++;
            console.log('✅ Added missing nodes array');
          }
          if (error.path?.includes('edges') && !fixedData.edges) {
            fixedData.edges = [];
            fixesApplied++;
            console.log('✅ Added missing edges array');
          }
          break;

        case 'MISSING_NODE_PROPERTY':
          if (fixedData.nodes && Array.isArray(fixedData.nodes)) {
            fixedData.nodes.forEach((node: any, index: number) => {
              if (error.path?.includes(`[${index}]`)) {
                if (!node.id) {
                  node.id = `node_${index}_${Date.now()}`;
                  fixesApplied++;
                  console.log(`✅ Added missing ID to node ${index}`);
                }
                if (!node.type) {
                  node.type = 'UnknownNode';
                  fixesApplied++;
                  console.log(`✅ Added default type to node ${index}`);
                }
                if (!node.data) {
                  node.data = {};
                  fixesApplied++;
                  console.log(`✅ Added missing data object to node ${index}`);
                }
              }
            });
          }
          break;

        case 'MISSING_EDGE_PROPERTY':
          if (fixedData.edges && Array.isArray(fixedData.edges)) {
            // Remove edges that are missing required properties and can't be fixed
            fixedData.edges = fixedData.edges.filter(
              (edge: any, index: number) => {
                if (error.path?.includes(`[${index}]`)) {
                  if (!edge.source || !edge.target) {
                    console.log(
                      `⚠️  Removed invalid edge ${index} (missing source/target)`
                    );
                    fixesApplied++;
                    return false;
                  }
                }
                return true;
              }
            );
          }
          break;

        case 'INVALID_EDGE_REFERENCE':
          if (
            fixedData.edges &&
            fixedData.nodes &&
            Array.isArray(fixedData.edges) &&
            Array.isArray(fixedData.nodes)
          ) {
            const nodeIds = fixedData.nodes
              .map((n: any) => n.id)
              .filter(Boolean);

            // Remove edges with invalid references
            fixedData.edges = fixedData.edges.filter((edge: any) => {
              if (
                !nodeIds.includes(edge.source) ||
                !nodeIds.includes(edge.target)
              ) {
                console.log(
                  `⚠️  Removed edge with invalid reference: ${edge.source} -> ${edge.target}`
                );
                fixesApplied++;
                return false;
              }
              return true;
            });
          }
          break;

        case 'EMPTY_NODE_DATA':
          if (fixedData.nodes && Array.isArray(fixedData.nodes)) {
            fixedData.nodes.forEach((node: any, index: number) => {
              if (
                error.path?.includes(`[${index}]`) &&
                node.data &&
                Object.keys(node.data).length === 0
              ) {
                // Add some default data based on node type
                node.data = getDefaultNodeData(node.type);
                fixesApplied++;
                console.log(
                  `✅ Added default data to node ${index} (${node.type})`
                );
              }
            });
          }
          break;

        case 'INVALID_NODE_ID':
          if (fixedData.nodes && Array.isArray(fixedData.nodes)) {
            fixedData.nodes.forEach((node: any, index: number) => {
              if (
                error.path?.includes(`[${index}]`) &&
                (!node.id || node.id.length === 0)
              ) {
                node.id = `node_${node.type || 'unknown'}_${index}_${Date.now()}`;
                fixesApplied++;
                console.log(`✅ Fixed invalid ID for node ${index}`);
              }
            });
          }
          break;
      }
    }

    // Additional automatic fixes
    fixedData = applyAdditionalFixes(fixedData);

    if (fixesApplied > 0) {
      console.log(`✅ Applied ${fixesApplied} fixes to Flowise export`);
      return fixedData;
    } else {
      console.log('⚠️  No fixable issues found');
      return null;
    }
  } catch (error) {
    console.log('❌ Error applying fixes:', (error as Error).message);
    return null;
  }
}

function getDefaultNodeData(nodeType: string): Record<string, any> {
  const defaults: Record<string, any> = {
    ChatOpenAI: {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1000,
    },
    OpenAI: {
      model: 'text-davinci-003',
      temperature: 0.7,
      maxTokens: 1000,
    },
    PromptTemplate: {
      template: 'Hello {input}',
      inputVariables: ['input'],
    },
    LLMChain: {
      prompt: '',
      llm: '',
    },
    ConversationChain: {
      llm: '',
      memory: '',
    },
    BufferMemory: {
      memoryKey: 'chat_history',
      returnMessages: true,
    },
    VectorStoreRetriever: {
      vectorStore: '',
      searchType: 'similarity',
      k: 4,
    },
    TextSplitter: {
      chunkSize: 1000,
      chunkOverlap: 200,
    },
  };

  return (
    defaults[nodeType] || {
      name: nodeType,
      description: `Auto-generated default data for ${nodeType}`,
    }
  );
}

function applyAdditionalFixes(data: any): any {
  const fixed = { ...data };

  try {
    // Ensure metadata exists
    if (!fixed.metadata) {
      fixed.metadata = {
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        fixedBy: 'flowise-to-langchain-fixer',
      };
    }

    // Ensure nodes have position data for visualization
    if (fixed.nodes && Array.isArray(fixed.nodes)) {
      fixed.nodes.forEach((node: any, index: number) => {
        if (!node.position) {
          node.position = {
            x: (index % 5) * 200,
            y: Math.floor(index / 5) * 150,
          };
        }
      });
    }

    // Sort edges by source node for better readability
    if (fixed.edges && Array.isArray(fixed.edges)) {
      fixed.edges.sort((a: any, b: any) => {
        if (a.source === b.source) {
          return a.target.localeCompare(b.target);
        }
        return a.source.localeCompare(b.source);
      });
    }

    // Remove duplicate edges
    if (fixed.edges && Array.isArray(fixed.edges)) {
      const seen = new Set();
      fixed.edges = fixed.edges.filter((edge: any) => {
        const key = `${edge.source}->${edge.target}`;
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
    }

    // Ensure node IDs are unique
    if (fixed.nodes && Array.isArray(fixed.nodes)) {
      const seenIds = new Set();
      fixed.nodes.forEach((node: any, index: number) => {
        if (seenIds.has(node.id)) {
          node.id = `${node.id}_duplicate_${index}`;
        }
        seenIds.add(node.id);
      });
    }

    return fixed;
  } catch (error) {
    console.log(
      'Warning: Error applying additional fixes:',
      (error as Error).message
    );
    return data;
  }
}

export function generateFixReport(originalData: any, fixedData: any): string {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      originalNodes: originalData.nodes?.length || 0,
      fixedNodes: fixedData.nodes?.length || 0,
      originalEdges: originalData.edges?.length || 0,
      fixedEdges: fixedData.edges?.length || 0,
    },
    fixes: [] as string[],
  };

  // Compare and document changes
  if (originalData.nodes?.length !== fixedData.nodes?.length) {
    report.fixes.push(
      `Node count changed: ${originalData.nodes?.length || 0} -> ${fixedData.nodes?.length || 0}`
    );
  }

  if (originalData.edges?.length !== fixedData.edges?.length) {
    report.fixes.push(
      `Edge count changed: ${originalData.edges?.length || 0} -> ${fixedData.edges?.length || 0}`
    );
  }

  if (!originalData.metadata && fixedData.metadata) {
    report.fixes.push('Added missing metadata');
  }

  return JSON.stringify(report, null, 2);
}
