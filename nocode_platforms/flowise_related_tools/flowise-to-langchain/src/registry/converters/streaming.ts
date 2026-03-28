/**
 * Streaming Converters
 *
 * Converts Flowise streaming nodes into LangChain streaming implementations
 */

import { BaseConverter } from '../registry.js';
import {
  IRNode,
  CodeFragment,
  GenerationContext,
  CodeReference,
} from '../../ir/types.js';

/**
 * Streaming LLM Converter
 * Adds streaming capabilities to LLM responses
 */
export class StreamingLLMConverter extends BaseConverter {
  readonly flowiseType = 'streamingLLM';
  readonly category = 'streaming';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'streaming_llm');
    const modelName = this.getParameterValue(
      node,
      'modelName',
      'gpt-3.5-turbo'
    );
    const temperature = this.getParameterValue(node, 'temperature', 0.7);
    const streaming = this.getParameterValue(node, 'streaming', true);
    const apiKey = this.getParameterValue(
      node,
      'openAIApiKey',
      'process.env.OPENAI_API_KEY'
    );

    const imports = this.generateImport('@langchain/openai', ['ChatOpenAI']);

    const implementation = `const ${variableName} = new ChatOpenAI({
  modelName: ${this.formatParameterValue(modelName)},
  temperature: ${temperature},
  streaming: ${streaming},
  openAIApiKey: ${apiKey === 'process.env.OPENAI_API_KEY' ? apiKey : this.formatParameterValue(apiKey)},
  callbacks: [
    {
      handleLLMNewToken(token: string) {
        // Handle streaming tokens
        process.stdout.write(token);
      }
    }
  ]
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/openai'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/openai'];
  }
}

/**
 * Streaming Chain Converter
 * Adds streaming capabilities to chains
 */
export class StreamingChainConverter extends BaseConverter {
  readonly flowiseType = 'streamingChain';
  readonly category = 'streaming';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'streaming_chain');
    const verbose = this.getParameterValue(node, 'verbose', false);

    // Get references to connected nodes
    const llmInput = node.inputs?.find((input) => input.id === 'llm');
    const promptInput = node.inputs?.find((input) => input.id === 'prompt');

    const llmRefResult = llmInput ? _context.getReference?.(llmInput) : null;
    const promptRefResult = promptInput
      ? _context.getReference?.(promptInput)
      : null;

    if (!llmRefResult) {
      throw new Error(
        `StreamingChain node ${node.id} is missing required llm input`
      );
    }
    if (!promptRefResult) {
      throw new Error(
        `StreamingChain node ${node.id} is missing required prompt input`
      );
    }

    const llmRef = llmRefResult as CodeReference;
    const promptRef = promptRefResult as CodeReference;

    const imports = this.generateImport('langchain/chains', ['LLMChain']);

    const implementation = `const ${variableName} = new LLMChain({
  llm: ${llmRef.exportedAs},
  prompt: ${promptRef.exportedAs},
  verbose: ${verbose},
  callbacks: [
    {
      handleChainStart(chain: any, inputs: any) {
        console.log('Chain started:', chain.name);
      },
      handleChainEnd(outputs: any) {
        console.log('Chain completed');
      },
      handleLLMNewToken(token: string) {
        process.stdout.write(token);
      }
    }
  ]
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['langchain/chains'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [llmRef.fragmentId, promptRef.fragmentId],
        node.id,
        1,
        {
          exports: [variableName],
          llm: llmRef.exportedAs,
          prompt: promptRef.exportedAs,
        }
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['langchain/chains'];
  }
}

/**
 * Streaming Agent Converter
 * Adds streaming capabilities to agents
 */
export class StreamingAgentConverter extends BaseConverter {
  readonly flowiseType = 'streamingAgent';
  readonly category = 'streaming';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'streaming_agent');
    const maxIterations = this.getParameterValue(node, 'maxIterations', 10);
    const verbose = this.getParameterValue(node, 'verbose', true);

    // Get references to connected nodes
    const agentInput = node.inputs?.find((input) => input.id === 'agent');
    const toolsInput = node.inputs?.find((input) => input.id === 'tools');

    const agentRefResult = agentInput
      ? _context.getReference?.(agentInput)
      : null;
    const toolsRefResult = toolsInput
      ? _context.getReference?.(toolsInput)
      : null;

    if (!agentRefResult) {
      throw new Error(
        `StreamingAgent node ${node.id} is missing required agent input`
      );
    }
    if (!toolsRefResult) {
      throw new Error(
        `StreamingAgent node ${node.id} is missing required tools input`
      );
    }

    const agentRef = agentRefResult as CodeReference;
    const toolsRef = toolsRefResult as CodeReference;

    const imports = this.generateImport('langchain/agents', ['AgentExecutor']);

    const implementation = `const ${variableName} = new AgentExecutor({
  agent: ${agentRef.exportedAs},
  tools: ${toolsRef.exportedAs},
  maxIterations: ${maxIterations},
  verbose: ${verbose},
  callbacks: [
    {
      handleAgentAction(action: any) {
        console.log('Agent action:', action.tool, action.toolInput);
      },
      handleAgentEnd(action: any) {
        console.log('Agent finished');
      },
      handleLLMNewToken(token: string) {
        process.stdout.write(token);
      }
    }
  ]
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['langchain/agents'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [agentRef.fragmentId, toolsRef.fragmentId],
        node.id,
        1,
        {
          exports: [variableName],
          agent: agentRef.exportedAs,
          tools: toolsRef.exportedAs,
        }
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['langchain/agents'];
  }
}

/**
 * Real-time Streaming Converter
 * Advanced streaming with real-time updates
 */
export class RealTimeStreamingConverter extends BaseConverter {
  readonly flowiseType = 'realTimeStreaming';
  readonly category = 'streaming';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'realtime_streaming');
    const bufferSize = this.getParameterValue(node, 'bufferSize', 1);
    const flushInterval = this.getParameterValue(node, 'flushInterval', 100);

    const imports = this.generateImport('@langchain/core/runnables', [
      'RunnablePassthrough',
    ]);

    const implementation = `const ${variableName} = RunnablePassthrough.assign({
  streamingResponse: async (input: any) => {
    const stream = await llm.stream(input.question);
    let buffer = '';
    let tokenCount = 0;
    
    for await (const chunk of stream) {
      buffer += chunk.content;
      tokenCount++;
      
      // Flush buffer every ${bufferSize} tokens or ${flushInterval}ms
      if (tokenCount >= ${bufferSize}) {
        console.log('Streaming chunk:', buffer);
        buffer = '';
        tokenCount = 0;
      }
    }
    
    // Flush remaining buffer
    if (buffer) {
      console.log('Final chunk:', buffer);
    }
    
    return buffer;
  }
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['@langchain/core/runnables'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }
}

/**
 * WebSocket Streaming Converter
 * WebSocket-based streaming for real-time web applications
 */
export class WebSocketStreamingConverter extends BaseConverter {
  readonly flowiseType = 'webSocketStreaming';
  readonly category = 'streaming';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'websocket_streaming');
    const port = this.getParameterValue(node, 'port', 8080);
    const path = this.getParameterValue(node, 'path', '/stream');

    const imports = this.generateImport(
      'ws',
      ['WebSocket', 'WebSocketServer'],
      false
    );

    const implementation = `const ${variableName} = new WebSocketServer({ 
  port: ${port},
  path: ${this.formatParameterValue(path)}
});

${variableName}.on('connection', (ws: WebSocket) => {
  console.log('Client connected for streaming');
  
  ws.on('message', async (message: string) => {
    try {
      const input = JSON.parse(message);
      const stream = await llm.stream(input.question);
      
      for await (const chunk of stream) {
        ws.send(JSON.stringify({
          type: 'token',
          content: chunk.content,
          timestamp: Date.now()
        }));
      }
      
      ws.send(JSON.stringify({
        type: 'end',
        timestamp: Date.now()
      }));
    } catch (error) {
      ws.send(JSON.stringify({
        type: 'error',
        message: error.message,
        timestamp: Date.now()
      }));
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['ws'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['ws', '@types/ws'];
  }
}

/**
 * Server-Sent Events Streaming Converter
 * SSE-based streaming for web applications
 */
export class SSEStreamingConverter extends BaseConverter {
  readonly flowiseType = 'sseStreaming';
  readonly category = 'streaming';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'sse_streaming');
    const endpoint = this.getParameterValue(node, 'endpoint', '/api/stream');
    const headers = this.getParameterValue(node, 'headers', {});

    const imports = this.generateImport(
      'express',
      ['Express', 'Request', 'Response'],
      false
    );

    const implementation = `const ${variableName} = (app: Express) => {
  app.get(${this.formatParameterValue(endpoint)}, async (req: Request, res: Response) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
      ...${JSON.stringify(headers)}
    });
    
    const question = req.query.question as string;
    
    try {
      const stream = await llm.stream(question);
      
      for await (const chunk of stream) {
        res.write(\`data: \${JSON.stringify({
          type: 'token',
          content: chunk.content,
          timestamp: Date.now()
        })}\\n\\n\`);
      }
      
      res.write(\`data: \${JSON.stringify({
        type: 'end',
        timestamp: Date.now()
      })}\\n\\n\`);
      
    } catch (error) {
      res.write(\`data: \${JSON.stringify({
        type: 'error',
        message: error.message,
        timestamp: Date.now()
      })}\\n\\n\`);
    }
    
    res.end();
  });
};`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['express'],
        node.id,
        0
      ),
      this.createCodeFragment(
        `${node.id}_implementation`,
        'initialization',
        implementation,
        [],
        node.id,
        1
      ),
    ];
  }

  override getDependencies(): string[] {
    return ['express', '@types/express'];
  }
}
