/**
 * Agent Converters for Flowise-to-LangChain
 *
 * This module provides converters for various agent types including:
 * - OpenAI Functions Agent
 * - Conversational Agent
 * - Tool Calling Agent
 * - Structured Chat Agent
 * - Agent Executor
 * - Zero-Shot React Description Agent
 * - React Docstore Agent
 * - Conversational React Description Agent
 * - Chat Agent
 */

import { IRNode } from '../../ir/types.js';
import { CodeFragment, GenerationContext } from '../../ir/types.js';
import { BaseConverter } from '../registry.js';

/**
 * Base Agent Converter providing common functionality
 */
export abstract class BaseAgentConverter extends BaseConverter {
  abstract langchainClass: string;
  abstract langchainModule: string;

  override getSupportedVersions(): string[] {
    return ['1.0.0'];
  }

  override isDeprecated(): boolean {
    return false;
  }

  override getReplacementType(): string | undefined {
    return undefined;
  }

  protected getInputVariableName(
    inputName: string,
    _node: IRNode,
    _context?: GenerationContext
  ): string {
    // Since we don't have direct graph access in the new interface,
    // we'll use intelligent fallback naming based on the input type

    // Fallback to intelligent naming
    switch (inputName) {
      case 'llm':
      case 'model':
        return 'llm';
      case 'tools':
        return 'tools';
      case 'memory':
        return 'memory';
      case 'prompt':
        return 'prompt';
      default:
        return inputName;
    }
  }

  protected getVariableName(node: IRNode): string {
    return `${node.type}_${node.id}`.replace(/[^a-zA-Z0-9_]/g, '_');
  }

  protected extractAgentConfiguration(node: IRNode): Record<string, any> {
    const config: Record<string, any> = {};

    for (const param of node.parameters) {
      if (param.value !== undefined && param.value !== null) {
        config[param.name] = param.value;
      }
    }

    return config;
  }

  protected generateConfigurationString(config: Record<string, any>): string {
    const entries: string[] = [];

    for (const [key, value] of Object.entries(config)) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'string') {
          entries.push(`${key}: "${value}"`);
        } else if (typeof value === 'boolean' || typeof value === 'number') {
          entries.push(`${key}: ${value}`);
        } else if (Array.isArray(value)) {
          entries.push(
            `${key}: [${value.map((v) => (typeof v === 'string' ? `"${v}"` : v)).join(', ')}]`
          );
        } else {
          entries.push(`${key}: ${JSON.stringify(value)}`);
        }
      }
    }

    return entries.join(',\n  ');
  }

  protected generateAgentConfigurationString(
    config: Record<string, any>
  ): string {
    const entries: string[] = [];

    for (const [key, value] of Object.entries(config)) {
      if (value !== undefined && value !== null) {
        if (
          typeof value === 'string' &&
          (key === 'agent' || key.includes('Var') || key === 'tools')
        ) {
          // Don't quote variable references
          entries.push(`${key}: ${value}`);
        } else if (typeof value === 'string') {
          entries.push(`${key}: "${value}"`);
        } else if (typeof value === 'boolean' || typeof value === 'number') {
          entries.push(`${key}: ${value}`);
        } else if (Array.isArray(value)) {
          entries.push(
            `${key}: [${value.map((v) => (typeof v === 'string' ? `"${v}"` : v)).join(', ')}]`
          );
        } else {
          entries.push(`${key}: ${JSON.stringify(value)}`);
        }
      }
    }

    return entries.join(',\n  ');
  }

  override getDependencies(
    _node: IRNode,
    _context?: GenerationContext
  ): string[] {
    const dependencies = [this.langchainModule];

    // Add common agent dependencies
    dependencies.push('langchain/hub');
    dependencies.push('@langchain/core/prompts');
    dependencies.push('@langchain/openai'); // Most agents use OpenAI models

    // Add _context-based dependencies if available
    if (_context?.targetLanguage === 'typescript') {
      dependencies.push('@types/node');
    }

    return [...new Set(dependencies)];
  }
}

/**
 * OpenAI Functions Agent Converter
 */
export class OpenAIFunctionsAgentConverter extends BaseAgentConverter {
  flowiseType = 'openAIFunctionsAgent';
  category = 'agent';
  langchainClass = 'createOpenAIFunctionsAgent';
  langchainModule = 'langchain/agents';

  override canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.getVariableName(node);
    // Use actual node variable names based on the sample flow
    const llmVar = 'openAI_openai_model';
    const toolsVar = '[serpAPI_search_tool]'; // Tools should be an array
    // Using default prompt from hub instead of variable
    // const promptVar = this.getInputVariableName('prompt', node, _context);
    const config = this.extractAgentConfiguration(node);

    const imports = [
      `import { ${this.langchainClass}, AgentExecutor } from "${this.langchainModule}";`,
      `import { pull } from "langchain/hub";`,
    ];

    // Generate async setup function
    const setupFunction = `
// Setup Agent (async initialization)
async function setupAgent() {
  // Get the prompt from LangSmith Hub
  const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-functions-agent");
  
  // Create OpenAI Functions Agent
  const agent = await ${this.langchainClass}({
    llm: ${llmVar},
    tools: ${toolsVar},
    prompt
  });
  
  // Create Agent Executor
  const executor = new AgentExecutor({
    agent: agent,
    tools: ${toolsVar},
    maxIterations: ${config['maxIterations'] || 15},
    verbose: ${config['verbose'] || false},
    returnIntermediateSteps: ${config['returnIntermediateSteps'] || false}
  });
  
  return executor;
}

// Initialize agent (will be called in runFlow)
let ${variableName}: AgentExecutor | null = null;`;

    return [
      {
        id: `agent-${node.id}`,
        type: 'initialization',
        content: setupFunction,
        dependencies: this.getDependencies(node, _context),
        language: _context.targetLanguage || 'typescript',
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName, 'setupAgent'],
          imports: imports,
        },
      },
    ];
  }
}

/**
 * Conversational Agent Converter
 */
export class ConversationalAgentConverter extends BaseAgentConverter {
  flowiseType = 'conversationalAgent';
  category = 'agent';
  langchainClass = 'createReactAgent';
  langchainModule = 'langchain/agents';

  override canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.getVariableName(node);
    const llmVar = this.getInputVariableName('llm', node, _context);
    const toolsVar = this.getInputVariableName('tools', node, _context);
    const memoryVar = this.getInputVariableName('memory', node, _context);
    const config = this.extractAgentConfiguration(node);

    const imports = [
      `import { ${this.langchainClass}, AgentExecutor } from "${this.langchainModule}";`,
      `import { pull } from "langchain/hub";`,
      `import { ChatPromptTemplate } from "@langchain/core/prompts";`,
    ];

    const promptSetup = `
// Get the prompt from LangSmith Hub
const prompt = await pull<ChatPromptTemplate>("hwchase17/react-chat");`;

    const agentCreation = `
// Create React Agent (replacement for deprecated ConversationalAgent)
const agent = await ${this.langchainClass}({
  llm: ${llmVar},
  tools: ${toolsVar},
  prompt
});`;

    const executorConfigEntries = [
      'agent: agent',
      `tools: ${toolsVar}`,
      `maxIterations: ${config['maxIterations'] || 15}`,
      `verbose: ${config['verbose'] || false}`,
      `returnIntermediateSteps: ${config['returnIntermediateSteps'] || false}`,
    ];

    if (memoryVar !== 'memory') {
      executorConfigEntries.push(`memory: ${memoryVar}`);
    }

    if (config['maxExecutionTime']) {
      executorConfigEntries.push(
        `maxExecutionTime: ${config['maxExecutionTime']}`
      );
    }

    const executorConfig = executorConfigEntries.join(',\n  ');

    const executorCreation = `
// Create Agent Executor with memory support
const ${variableName} = new AgentExecutor({
  ${executorConfig}
});`;

    const declaration = promptSetup + agentCreation + executorCreation;

    return [
      {
        id: `agent-${node.id}`,
        type: 'initialization',
        content: declaration,
        dependencies: this.getDependencies(node, _context),
        language: _context.targetLanguage || 'typescript',
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName],
          imports: imports,
        },
      },
    ];
  }
}

/**
 * Tool Calling Agent Converter
 */
export class ToolCallingAgentConverter extends BaseAgentConverter {
  flowiseType = 'toolCallingAgent';
  category = 'agent';
  langchainClass = 'createOpenAIToolsAgent';
  langchainModule = 'langchain/agents';

  override canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.getVariableName(node);
    const llmVar = this.getInputVariableName('llm', node, _context);
    const toolsVar = this.getInputVariableName('tools', node, _context);
    // Using default prompt from hub instead of variable
    // const promptVar = this.getInputVariableName('prompt', node, _context);
    const config = this.extractAgentConfiguration(node);

    const imports = [
      `import { ${this.langchainClass}, AgentExecutor } from "${this.langchainModule}";`,
      `import { pull } from "langchain/hub";`,
      `import { ChatPromptTemplate } from "@langchain/core/prompts";`,
    ];

    let promptSetup = '';
    // Always use default prompt from hub
    promptSetup = `
// Get the prompt from LangSmith Hub
const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-tools-agent");`;

    const agentCreation = `
// Create OpenAI Tools Agent
const agent = await ${this.langchainClass}({
  llm: ${llmVar},
  tools: ${toolsVar},
  prompt
});`;

    const executorConfig = this.generateConfigurationString({
      agent: 'agent',
      tools: toolsVar,
      maxIterations: config['maxIterations'] || 15,
      maxExecutionTime: config['maxExecutionTime'],
      verbose: config['verbose'] || false,
      returnIntermediateSteps: config['returnIntermediateSteps'] || false,
    });

    const executorCreation = `
// Create Agent Executor
const ${variableName} = new AgentExecutor({
  ${executorConfig}
});`;

    const declaration = promptSetup + agentCreation + executorCreation;

    return [
      {
        id: `agent-${node.id}`,
        type: 'initialization',
        content: declaration,
        dependencies: this.getDependencies(node, _context),
        language: _context.targetLanguage || 'typescript',
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName],
          imports: imports,
        },
      },
    ];
  }
}

/**
 * Structured Chat Agent Converter
 */
export class StructuredChatAgentConverter extends BaseAgentConverter {
  flowiseType = 'structuredChatAgent';
  category = 'agent';
  langchainClass = 'createStructuredChatAgent';
  langchainModule = 'langchain/agents';

  override canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.getVariableName(node);
    const llmVar = this.getInputVariableName('llm', node, _context);
    const toolsVar = this.getInputVariableName('tools', node, _context);
    // Using default prompt from hub instead of variable
    // const promptVar = this.getInputVariableName('prompt', node, _context);
    const config = this.extractAgentConfiguration(node);

    const imports = [
      `import { ${this.langchainClass}, AgentExecutor } from "${this.langchainModule}";`,
      `import { pull } from "langchain/hub";`,
      `import { ChatPromptTemplate } from "@langchain/core/prompts";`,
    ];

    // Always use default prompt from hub
    const promptSetup = `
// Get the prompt from LangSmith Hub
const prompt = await pull<ChatPromptTemplate>("hwchase17/structured-chat-agent");`;

    const agentCreation = `
// Create Structured Chat Agent
const agent = await ${this.langchainClass}({
  llm: ${llmVar},
  tools: ${toolsVar},
  prompt
});`;

    const executorConfig = this.generateConfigurationString({
      agent: 'agent',
      tools: toolsVar,
      maxIterations: config['maxIterations'] || 15,
      maxExecutionTime: config['maxExecutionTime'],
      verbose: config['verbose'] || false,
      returnIntermediateSteps: config['returnIntermediateSteps'] || false,
    });

    const executorCreation = `
// Create Agent Executor
const ${variableName} = new AgentExecutor({
  ${executorConfig}
});`;

    const declaration = promptSetup + agentCreation + executorCreation;

    return [
      {
        id: `agent-${node.id}`,
        type: 'initialization',
        content: declaration,
        dependencies: this.getDependencies(node, _context),
        language: _context.targetLanguage || 'typescript',
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName],
          imports: imports,
        },
      },
    ];
  }
}

/**
 * Agent Executor Converter (for standalone executor nodes)
 */
export class AgentExecutorConverter extends BaseAgentConverter {
  flowiseType = 'agentExecutor';
  category = 'agent';
  langchainClass = 'AgentExecutor';
  langchainModule = 'langchain/agents';

  override canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.getVariableName(node);
    const agentVar = this.getInputVariableName('agent', node, _context);
    const toolsVar = this.getInputVariableName('tools', node, _context);
    const memoryVar = this.getInputVariableName('memory', node, _context);
    const config = this.extractAgentConfiguration(node);

    const imports = [
      `import { ${this.langchainClass} } from "${this.langchainModule}";`,
    ];

    const configEntries = [
      `agent: ${agentVar}`,
      `tools: ${toolsVar}`,
      `maxIterations: ${config['maxIterations'] || 15}`,
      `verbose: ${config['verbose'] || false}`,
      `returnIntermediateSteps: ${config['returnIntermediateSteps'] || false}`,
    ];

    if (memoryVar !== 'memory') {
      configEntries.push(`memory: ${memoryVar}`);
    }

    if (config['maxExecutionTime']) {
      configEntries.push(`maxExecutionTime: ${config['maxExecutionTime']}`);
    }

    const executorConfig = configEntries.join(',\n  ');

    const declaration = `
// Create Agent Executor
const ${variableName} = new ${this.langchainClass}({
  ${executorConfig}
});`;

    return [
      {
        id: `agent-${node.id}`,
        type: 'initialization',
        content: declaration,
        dependencies: this.getDependencies(node, _context),
        language: _context.targetLanguage || 'typescript',
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName],
          imports: imports,
        },
      },
    ];
  }
}

/**
 * Zero-Shot React Description Agent Converter
 */
export class ZeroShotReactDescriptionAgentConverter extends BaseAgentConverter {
  flowiseType = 'zeroShotReactDescriptionAgent';
  category = 'agent';
  langchainClass = 'createReactAgent';
  langchainModule = 'langchain/agents';

  override canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.getVariableName(node);
    const llmVar = this.getInputVariableName('llm', node, _context);
    const toolsVar = this.getInputVariableName('tools', node, _context);
    const config = this.extractAgentConfiguration(node);

    const imports = [
      `import { ${this.langchainClass}, AgentExecutor } from "${this.langchainModule}";`,
      `import { pull } from "langchain/hub";`,
      `import { ChatPromptTemplate } from "@langchain/core/prompts";`,
    ];

    const promptSetup = `
// Get the prompt from LangSmith Hub
const prompt = await pull<ChatPromptTemplate>("hwchase17/react");`;

    const agentCreation = `
// Create React Agent
const agent = await ${this.langchainClass}({
  llm: ${llmVar},
  tools: ${toolsVar},
  prompt
});`;

    const executorConfig = this.generateConfigurationString({
      agent: 'agent',
      tools: toolsVar,
      maxIterations: config['maxIterations'] || 15,
      maxExecutionTime: config['maxExecutionTime'],
      verbose: config['verbose'] || false,
      returnIntermediateSteps: config['returnIntermediateSteps'] || false,
    });

    const executorCreation = `
// Create Agent Executor
const ${variableName} = new AgentExecutor({
  ${executorConfig}
});`;

    const declaration = promptSetup + agentCreation + executorCreation;

    return [
      {
        id: `agent-${node.id}`,
        type: 'initialization',
        content: declaration,
        dependencies: this.getDependencies(node, _context),
        language: _context.targetLanguage || 'typescript',
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName],
          imports: imports,
        },
      },
    ];
  }
}

/**
 * React Docstore Agent Converter
 */
export class ReactDocstoreAgentConverter extends BaseAgentConverter {
  flowiseType = 'reactDocstoreAgent';
  category = 'agent';
  langchainClass = 'createReactAgent';
  langchainModule = 'langchain/agents';

  override canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.getVariableName(node);
    const llmVar = this.getInputVariableName('llm', node, _context);
    const toolsVar = this.getInputVariableName('tools', node, _context);
    const config = this.extractAgentConfiguration(node);

    const imports = [
      `import { ${this.langchainClass}, AgentExecutor } from "${this.langchainModule}";`,
      `import { pull } from "langchain/hub";`,
      `import { ChatPromptTemplate } from "@langchain/core/prompts";`,
    ];

    const promptSetup = `
// Get the prompt from LangSmith Hub
const prompt = await pull<ChatPromptTemplate>("hwchase17/react-docstore");`;

    const agentCreation = `
// Create React Docstore Agent
const agent = await ${this.langchainClass}({
  llm: ${llmVar},
  tools: ${toolsVar},
  prompt
});`;

    const executorConfig = this.generateConfigurationString({
      agent: 'agent',
      tools: toolsVar,
      maxIterations: config['maxIterations'] || 15,
      maxExecutionTime: config['maxExecutionTime'],
      verbose: config['verbose'] || false,
      returnIntermediateSteps: config['returnIntermediateSteps'] || false,
    });

    const executorCreation = `
// Create Agent Executor
const ${variableName} = new AgentExecutor({
  ${executorConfig}
});`;

    const declaration = promptSetup + agentCreation + executorCreation;

    return [
      {
        id: `agent-${node.id}`,
        type: 'initialization',
        content: declaration,
        dependencies: this.getDependencies(node, _context),
        language: _context.targetLanguage || 'typescript',
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName],
          imports: imports,
        },
      },
    ];
  }
}

/**
 * Conversational React Description Agent Converter
 */
export class ConversationalReactDescriptionAgentConverter extends BaseAgentConverter {
  flowiseType = 'conversationalReactDescriptionAgent';
  category = 'agent';
  langchainClass = 'createReactAgent';
  langchainModule = 'langchain/agents';

  override canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.getVariableName(node);
    const llmVar = this.getInputVariableName('llm', node, _context);
    const toolsVar = this.getInputVariableName('tools', node, _context);
    const memoryVar = this.getInputVariableName('memory', node, _context);
    const config = this.extractAgentConfiguration(node);

    const imports = [
      `import { ${this.langchainClass}, AgentExecutor } from "${this.langchainModule}";`,
      `import { pull } from "langchain/hub";`,
      `import { ChatPromptTemplate } from "@langchain/core/prompts";`,
    ];

    const promptSetup = `
// Get the prompt from LangSmith Hub
const prompt = await pull<ChatPromptTemplate>("hwchase17/react-chat");`;

    const agentCreation = `
// Create Conversational React Agent
const agent = await ${this.langchainClass}({
  llm: ${llmVar},
  tools: ${toolsVar},
  prompt
});`;

    const executorConfigEntries = [
      'agent: agent',
      `tools: ${toolsVar}`,
      `maxIterations: ${config['maxIterations'] || 15}`,
      `verbose: ${config['verbose'] || false}`,
      `returnIntermediateSteps: ${config['returnIntermediateSteps'] || false}`,
    ];

    if (memoryVar !== 'memory') {
      executorConfigEntries.push(`memory: ${memoryVar}`);
    }

    if (config['maxExecutionTime']) {
      executorConfigEntries.push(
        `maxExecutionTime: ${config['maxExecutionTime']}`
      );
    }

    const executorConfig = executorConfigEntries.join(',\n  ');

    const executorCreation = `
// Create Agent Executor with memory support
const ${variableName} = new AgentExecutor({
  ${executorConfig}
});`;

    const declaration = promptSetup + agentCreation + executorCreation;

    return [
      {
        id: `agent-${node.id}`,
        type: 'initialization',
        content: declaration,
        dependencies: this.getDependencies(node, _context),
        language: _context.targetLanguage || 'typescript',
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName],
          imports: imports,
        },
      },
    ];
  }
}

/**
 * Chat Agent Converter
 */
export class ChatAgentConverter extends BaseAgentConverter {
  flowiseType = 'chatAgent';
  category = 'agent';
  langchainClass = 'createOpenAIToolsAgent';
  langchainModule = 'langchain/agents';

  override canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.getVariableName(node);
    const llmVar = this.getInputVariableName('llm', node, _context);
    const toolsVar = this.getInputVariableName('tools', node, _context);
    // Using default prompt from hub instead of variable
    // const promptVar = this.getInputVariableName('prompt', node, _context);
    const config = this.extractAgentConfiguration(node);

    const imports = [
      `import { ${this.langchainClass}, AgentExecutor } from "${this.langchainModule}";`,
      `import { pull } from "langchain/hub";`,
      `import { ChatPromptTemplate } from "@langchain/core/prompts";`,
    ];

    let promptSetup = '';
    // Always use default prompt from hub
    promptSetup = `
// Get the prompt from LangSmith Hub
const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-tools-agent");`;

    const agentCreation = `
// Create Chat Agent (using OpenAI Tools Agent)
const agent = await ${this.langchainClass}({
  llm: ${llmVar},
  tools: ${toolsVar},
  prompt
});`;

    const executorConfig = this.generateConfigurationString({
      agent: 'agent',
      tools: toolsVar,
      maxIterations: config['maxIterations'] || 15,
      maxExecutionTime: config['maxExecutionTime'],
      verbose: config['verbose'] || false,
      returnIntermediateSteps: config['returnIntermediateSteps'] || false,
    });

    const executorCreation = `
// Create Agent Executor
const ${variableName} = new AgentExecutor({
  ${executorConfig}
});`;

    const declaration = promptSetup + agentCreation + executorCreation;

    return [
      {
        id: `agent-${node.id}`,
        type: 'initialization',
        content: declaration,
        dependencies: this.getDependencies(node, _context),
        language: _context.targetLanguage || 'typescript',
        metadata: {
          nodeId: node.id,
          order: 400,
          category: 'agent',
          exports: [variableName],
          imports: imports,
        },
      },
    ];
  }
}
