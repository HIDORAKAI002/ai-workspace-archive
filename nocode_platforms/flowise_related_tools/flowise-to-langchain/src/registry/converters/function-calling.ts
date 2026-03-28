/**
 * Enhanced Function Calling Converters
 *
 * Converts Flowise function calling nodes into advanced LangChain function calling implementations
 */

import { BaseConverter } from '../registry.js';
import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';

/**
 * Enhanced OpenAI Functions Agent Converter
 * Advanced function calling with custom tools and validation
 */
export class EnhancedOpenAIFunctionsAgentConverter extends BaseConverter {
  readonly flowiseType = 'enhancedOpenAIFunctionsAgent';
  readonly category = 'function-calling';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(
      node,
      'enhanced_functions_agent'
    );
    const maxIterations = this.getParameterValue(node, 'maxIterations', 15);
    const verbose = this.getParameterValue(node, 'verbose', true);
    const returnIntermediateSteps = this.getParameterValue(
      node,
      'returnIntermediateSteps',
      true
    );
    const functionTimeout = this.getParameterValue(
      node,
      'functionTimeout',
      30000
    );
    const enableParallelCalling = this.getParameterValue(
      node,
      'enableParallelCalling',
      true
    );

    const imports = this.generateImport('langchain/agents', [
      'createOpenAIFunctionsAgent',
      'AgentExecutor',
    ]);

    const implementation = `// Enhanced OpenAI Functions Agent with validation and error handling
async function ${variableName}Setup() {
  const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-functions-agent");
  
  // Enhanced tools with validation and timeout
  const enhancedTools = tools.map(tool => ({
    ...tool,
    call: async (input: string) => {
      try {
        // Add timeout to tool calls
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Tool timeout')), ${functionTimeout})
        );
        
        const resultPromise = tool.call(input);
        const result = await Promise.race([resultPromise, timeoutPromise]);
        
        // Validate tool output
        if (typeof result !== 'string') {
          console.warn(\`Tool \${tool.name} returned non-string result:, result\`);
          return JSON.stringify(result);
        }
        
        return result;
      } catch (error) {
        console.error(\`Tool \${tool.name} failed:, error\`);
        return \`Error: \${error.message}\`;
      }
    }
  }));
  
  const agent = await createOpenAIFunctionsAgent({
    llm: llm,
    tools: enhancedTools,
    prompt: prompt
  });
  
  const executor = new AgentExecutor({
    agent: agent,
    tools: enhancedTools,
    maxIterations: ${maxIterations},
    verbose: ${verbose},
    returnIntermediateSteps: ${returnIntermediateSteps},
    handleParsingErrors: true,
    ${
      enableParallelCalling
        ? `
    // Enable parallel function calling for OpenAI models that support it
    handleParallelToolCalls: async (toolCalls: any[]) => {
      const results = await Promise.allSettled(
        toolCalls.map(async (call) => {
          const tool = enhancedTools.find(t => t.name === call.name);
          if (!tool) throw new Error(\`Tool \${call.name} not found\`);
          return await tool.call(call.arguments);
        })
      );
      
      return results.map((result, index) => ({
        toolCallId: toolCalls[index].id,
        result: result.status === 'fulfilled' ? result.value : \`Error: \${result.reason}\`
      }));
    },
    `
        : ''
    }
    callbacks: [
      {
        handleAgentAction: (action: any) => {
          console.log(\`🔧 Tool: \${action.tool} | Input: \${action.toolInput}\`);
        },
        handleAgentEnd: (action: any) => {
          console.log(\`✅ Agent completed: \${action.returnValues.output}\`);
        },
        handleToolStart: (tool: any, input: string) => {
          console.log(\`🚀 Starting tool \${tool.name} with input: \${input}\`);
        },
        handleToolEnd: (output: string) => {
          console.log(\`🎯 Tool completed with output: \${output.substring(0, 100)}...\`);
        },
        handleToolError: (error: Error) => {
          console.error(\`❌ Tool error: \${error.message}\`);
        }
      }
    ]
  });
  
  return executor;
}

const ${variableName} = await ${variableName}Setup();`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['langchain/agents', 'langchain/hub', '@langchain/core/prompts'],
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
    return ['langchain/agents', 'langchain/hub', '@langchain/core/prompts'];
  }
}

/**
 * Structured Output Function Converter
 * Function calling with structured output validation using Zod schemas
 */
export class StructuredOutputFunctionConverter extends BaseConverter {
  readonly flowiseType = 'structuredOutputFunction';
  readonly category = 'function-calling';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'structured_function');
    const functionName = this.getParameterValue(
      node,
      'functionName',
      'processData'
    );
    const outputSchema = this.getParameterValue(node, 'outputSchema', {});
    const description = this.getParameterValue(
      node,
      'description',
      'Process data with structured output'
    );

    const imports = this.generateImport('zod', ['z'], true);

    const implementation = `// Structured output function with Zod validation
import { ChatOpenAI } from "@langchain/openai";

const outputSchema = z.object({
  ${Object.entries(outputSchema || {})
    .map(([key, type]) => `${key}: z.${type}(),`)
    .join('\n  ')}
});

const ${variableName} = async (input: string) => {
  const llm = new ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0,
  });

  const functionSchema = {
    name: "${functionName}",
    description: "${description}",
    parameters: {
      type: "object",
      properties: {
        ${Object.entries(outputSchema || {})
          .map(
            ([key, type]) =>
              `${key}: { type: "${type}", description: "The ${key} field" }`
          )
          .join(',\n        ')}
      },
      required: [${Object.keys(outputSchema || {})
        .map((k) => `"${k}"`)
        .join(', ')}]
    }
  };

  const response = await llm.call(
    [{
      role: "user",
      content: input
    }],
    {
      functions: [functionSchema],
      function_call: { name: "${functionName}" }
    }
  );

  // Extract and validate function call result
  if (response.additional_kwargs?.function_call) {
    const functionArgs = JSON.parse(response.additional_kwargs.function_call.arguments);
    
    try {
      // Validate against Zod schema
      const validatedOutput = outputSchema.parse(functionArgs);
      return validatedOutput;
    } catch (error) {
      console.error('Schema validation failed:', error);
      throw new Error(\`Invalid function output: \${error.message}\`);
    }
  }
  
  throw new Error('No function call in response');
};`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['zod', '@langchain/openai'],
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
    return ['zod', '@langchain/openai'];
  }
}

/**
 * Multi-Step Function Chain Converter
 * Chain multiple function calls together with dependency resolution
 */
export class MultiStepFunctionChainConverter extends BaseConverter {
  readonly flowiseType = 'multiStepFunctionChain';
  readonly category = 'function-calling';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'multi_step_chain');
    const functions = this.getParameterValue(node, 'functions', []);
    const maxSteps = this.getParameterValue(node, 'maxSteps', 10);
    // Parallel execution support for multi-step chains
    // const allowParallel = this.getParameterValue(node, 'allowParallel', true);

    const imports = this.generateImport('@langchain/core/runnables', [
      'RunnableSequence',
    ]);

    const implementation = `// Multi-step function chain with dependency resolution
const ${variableName} = RunnableSequence.from([
  {
    planExecution: async (input: { task: string }) => {
      // Use LLM to plan function execution steps
      const planningPrompt = \`Break down this task into function calls:
Task: \${input.task}

Available functions:
${(functions || []).map((f: any) => `- ${f.name}: ${f.description}`).join('\n')}

Create a step-by-step execution plan:\`;

      const plan = await llm.call(planningPrompt);
      
      // Parse plan into executable steps
      const steps = plan.split('\\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().substring(1).trim())
        .slice(0, ${maxSteps});
      
      return { steps, originalTask: input.task };
    }
  },
  {
    executeSteps: async (input: { steps: string[]; originalTask: string }) => {
      const results = [];
      const context = { originalTask: input.originalTask };
      
      for (let i = 0; i < input.steps.length; i++) {
        const step = input.steps[i];
        console.log(\`🔄 Executing step \${i + 1}: \${step}\`);
        
        try {
          // Determine which function to call for this step
          const functionCallPrompt = \`Based on this step and context, make a function call:
Step: \${step}
Context: \${JSON.stringify(context)}
Previous results: \${JSON.stringify(results)}

Which function should be called and with what parameters?\`;

          const functionCall = await llm.call(functionCallPrompt, {
            functions: functions.map((f: any) => ({
              name: f.name,
              description: f.description,
              parameters: f.parameters
            })),
            function_call: "auto"
          });

          if (functionCall.additional_kwargs?.function_call) {
            const { name, arguments: args } = functionCall.additional_kwargs.function_call;
            const func = functions.find((f: any) => f.name === name);
            
            if (func) {
              const result = await func.implementation(JSON.parse(args));
              results.push({ step, function: name, result });
              
              // Update context with result
              context[\`step_\${i + 1}_result\`] = result;
            }
          }
        } catch (error) {
          console.error(\`❌ Step \${i + 1} failed:, error\`);
          results.push({ step, error: error.message });
        }
      }
      
      return { results, context };
    }
  },
  {
    synthesizeResults: async (input: { results: any[]; context: any }) => {
      // Use LLM to synthesize final answer from all results
      const synthesisPrompt = \`Synthesize a final answer from these function call results:
Original task: \${input.context.originalTask}

Results:
\${input.results.map((r, i) => \`\${i + 1}. \${r.step}: \${r.result || r.error}\`).join('\\n')}

Final answer:\`;

      const finalAnswer = await llm.call(synthesisPrompt);
      
      return {
        answer: finalAnswer,
        executionTrace: input.results,
        context: input.context
      };
    }
  }
]);`;

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
 * Function Call Validator Converter
 * Validates function calls before execution with safety checks
 */
export class FunctionCallValidatorConverter extends BaseConverter {
  readonly flowiseType = 'functionCallValidator';
  readonly category = 'function-calling';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'function_validator');
    const allowedFunctions = this.getParameterValue(
      node,
      'allowedFunctions',
      []
    );
    const maxParameterLength = this.getParameterValue(
      node,
      'maxParameterLength',
      1000
    );
    const sanitizeInputs = this.getParameterValue(node, 'sanitizeInputs', true);

    const imports = this.generateImport(
      'validator',
      ['escape', 'isLength'],
      false
    );

    const implementation = `// Function call validator with security and safety checks
const ${variableName} = {
  validateFunctionCall: (functionCall: any) => {
    const { name, arguments: args } = functionCall;
    
    // Check if function is in allowed list
    if (${JSON.stringify(allowedFunctions)}.length > 0 && !${JSON.stringify(allowedFunctions)}.includes(name)) {
      throw new Error(\`Function '\${name}' is not in allowed functions list\`);
    }
    
    // Validate argument structure
    if (typeof args !== 'object' || args === null) {
      throw new Error('Function arguments must be a valid object');
    }
    
    // Check parameter lengths
    for (const [key, value] of Object.entries(args)) {
      if (typeof value === 'string' && value.length > ${maxParameterLength}) {
        throw new Error(\`Parameter '\${key}' exceeds maximum length of ${maxParameterLength} characters\`);
      }
    }
    
    ${
      sanitizeInputs
        ? `
    // Sanitize string inputs
    const sanitizedArgs = {};
    for (const [key, value] of Object.entries(args)) {
      if (typeof value === 'string') {
        sanitizedArgs[key] = escape(value);
      } else {
        sanitizedArgs[key] = value;
      }
    }
    
    return { name, arguments: sanitizedArgs };
    `
        : `
    return { name, arguments: args };
    `
    }
  },
  
  validateFunctionOutput: (output: any, expectedSchema?: any) => {
    // Check for dangerous content in output
    if (typeof output === 'string') {
      const dangerousPatterns = [
        /<script[^>]*>.*?<\\/script>/gi,
        /javascript:/gi,
        /on\\w+\\s*=/gi
      ];
      
      for (const pattern of dangerousPatterns) {
        if (pattern.test(output)) {
          console.warn('Potentially dangerous content detected in function output');
          return output.replace(pattern, '[FILTERED]');
        }
      }
    }
    
    // Validate against expected schema if provided
    if (expectedSchema && typeof expectedSchema === 'object') {
      try {
        // Simple schema validation
        for (const [key, type] of Object.entries(expectedSchema)) {
          if (output[key] === undefined) {
            throw new Error(\`Missing required field: \${key}\`);
          }
          
          if (typeof output[key] !== type) {
            throw new Error(\`Field '\${key}' should be of type \${type}, got \${typeof output[key]}\`);
          }
        }
      } catch (error) {
        console.error('Output validation failed:', error);
        throw error;
      }
    }
    
    return output;
  },
  
  createSecureExecutor: (functions: any[]) => {
    return async (functionCall: any) => {
      try {
        // Validate the function call
        const validatedCall = this.validateFunctionCall(functionCall);
        
        // Find and execute the function
        const func = functions.find(f => f.name === validatedCall.name);
        if (!func) {
          throw new Error(\`Function '\${validatedCall.name}' not found\`);
        }
        
        // Execute with timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Function execution timeout')), 30000)
        );
        
        const executionPromise = func.call(validatedCall.arguments);
        const result = await Promise.race([executionPromise, timeoutPromise]);
        
        // Validate output
        const validatedResult = this.validateFunctionOutput(result, func.outputSchema);
        
        return validatedResult;
      } catch (error) {
        console.error('Secure function execution failed:', error);
        throw error;
      }
    };
  }
};`;

    return [
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        imports,
        ['validator'],
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
    return ['validator'];
  }
}

/**
 * Function Call Router Converter
 * Routes function calls based on intent classification
 */
export class FunctionCallRouterConverter extends BaseConverter {
  readonly flowiseType = 'functionCallRouter';
  readonly category = 'function-calling';

  convert(node: IRNode, _context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(node, 'function_router');
    const routingRules = this.getParameterValue(node, 'routingRules', {});
    const defaultFunction = this.getParameterValue(
      node,
      'defaultFunction',
      'general'
    );

    const imports = this.generateImport('@langchain/core/runnables', [
      'RunnableBranch',
    ]);

    const implementation = `// Function call router with intent classification
const ${variableName} = RunnableBranch.from([
  ${Object.entries(routingRules || {})
    .map(
      ([intent, functions]) => `
  [
    // Condition: Check if input matches ${intent} intent
    async (input: { query: string }) => {
      const classificationPrompt = \`Classify the intent of this query:
Query: \${input.query}

Intent options: ${Object.keys(routingRules || {}).join(', ')}

Intent:\`;
      
      const classification = await llm.call(classificationPrompt);
      return classification.toLowerCase().trim() === '${intent}';
    },
    
    // Action: Route to ${intent} functions
    {
      executeFunctions: async (input: { query: string }) => {
        const availableFunctions = ${JSON.stringify(functions)};
        
        // Select best function for this intent
        const selectionPrompt = \`Given this ${intent} query, which function should be called?
Query: \${input.query}

Available functions:
\${availableFunctions.map((f: any) => \`- \${f.name}: \${f.description}\`).join('\\n')}

Function to call:\`;

        const selection = await llm.call(selectionPrompt, {
          functions: availableFunctions,
          function_call: "auto"
        });

        if (selection.additional_kwargs?.function_call) {
          const { name, arguments: args } = selection.additional_kwargs.function_call;
          const func = availableFunctions.find((f: any) => f.name === name);
          
          if (func) {
            console.log(\`🎯 Routing to \${name} for \${intent} intent\`);
            return await func.implementation(JSON.parse(args));
          }
        }
        
        throw new Error(\`No suitable function found for \${intent} intent\`);
      }
    }
  ]
  `
    )
    .join(',')},
  
  // Default case
  [
    () => true, // Always matches as fallback
    {
      executeDefault: async (input: { query: string }) => {
        console.log(\`🔄 Using default function: ${defaultFunction}\`);
        
        // Route to default function
        const defaultPrompt = \`Handle this general query:
Query: \${input.query}

Response:\`;
        
        return await llm.call(defaultPrompt);
      }
    }
  ]
]);`;

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
