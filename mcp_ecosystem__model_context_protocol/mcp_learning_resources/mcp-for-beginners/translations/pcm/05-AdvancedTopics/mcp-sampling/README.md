> [DEPRECATED: 2026-07-28 RELEASE CANDIDATE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Sampling for Model Context Protocol

> **Deprecation notice:** di `2026-07-28` MCP specification release candidate don mark Sampling as deprecated, e say make we dey use direct integration with LLM provider APIs. Sampling still dey work for `2025-11-25` and at least one year after any official deprecation, so everything we dey teach for dis lesson still dey valid - but new server designs suppose check di replacement pattern. See [Wetin Dey Change for MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Sampling na powerful MCP feature wey allow servers to request LLM completions through di client, e dey enable sophisticated agentic behaviors while e still dey maintain security and privacy. Di correct sampling configuration fit improve response quality and performance well well. MCP dey provide one standardized way to control how models dey generate text with specific parameters wey go influence randomness, creativity, and coherence.

## Introduction

For dis lesson, we go explore how to configure sampling parameters for MCP requests and understand how di protocol mechanics wey dey for sampling dey work.

## Learning Objectives

By di time you finish dis lesson, you go sabi:

- Understand di main sampling parameters wey dey for MCP.
- Configure sampling parameters for different use cases dem.
- Implement deterministic sampling so dat results go dey consistent.
- Change sampling parameters dynamically based on context and wetin user like.
- Apply sampling strategies to make model performance better for different scenarios.
- Understand how sampling dey work for client-server flow of MCP.

## How Sampling Dey Work for MCP

Di sampling flow for MCP dey follow these steps dem:

1. Server dey send `sampling/createMessage` request go client
2. Client go check di request and fit change am
3. Client go sample from one LLM
4. Client go review di completion
5. Client go return di result go server

Dis human-in-the-loop design dey make sure say users still get control on top wetin di LLM go see and generate.

## Sampling Parameters Overview

MCP define these sampling parameters dem wey fit be configured for client requests:

| Parameter | Description | Typical Range |
|-----------|-------------|---------------|
| `temperature` | E dey control randomness for token selection | 0.0 - 1.0 |
| `maxTokens` | Maximum number tokens to generate | Integer value |
| `stopSequences` | Custom sequences wey go stop generation if dem show | Array of strings |
| `metadata` | Extra provider-specific parameters | JSON object |

Plenty LLM providers dey support extra parameters inside di `metadata` field, wey fit include:

| Common Extension Parameter | Description | Typical Range |
|-----------|-------------|---------------|
| `top_p` | Nucleus sampling - e dey limit tokens to top cumulative probability | 0.0 - 1.0 |
| `top_k` | E limit token selection to top K options | 1 - 100 |
| `presence_penalty` | E dey penalize tokens based on how dem don already dey for text | -2.0 - 2.0 |
| `frequency_penalty` | E dey penalize tokens based on how often dem don show for text | -2.0 - 2.0 |
| `seed` | Specific random seed so results fit reproduce | Integer value |

## Example Request Format

Here na example of how to request sampling from client for MCP:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## Response Format

Client go return completion result like this:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## Human in the Loop Controls

MCP sampling design dey involve human oversight as e be:

- **For prompts**:
  - Clients suppose show users di prompt wey dem wan propose
  - Users suppose fit change or reject prompts dem
  - System prompts fit get filtered or modified
  - Context inclusion na client dey control am

- **For completions**:
  - Clients suppose show users di completion
  - Users suppose fit change or reject completions
  - Clients fit filter or modify completions
  - Users dey control which model to use

With these principles dem, make we check how to implement sampling inside different programming languages, focusing on parameters wey many LLM providers dey support.

## Security Considerations

When you dey implement sampling for MCP, make you consider these security best practices dem:

- **Validate all message content** before you send am to client
- **Sanitize sensitive info** from prompts and completions
- **Implement rate limits** to avoid abuse
- **Monitor sampling usage** for any strange patterns
- **Encrypt data wey dey move** using secure protocols
- **Handle user data privacy** according to relevant rules
- **Audit sampling requests** for compliance and security
- **Control cost exposure** with correct limits
- **Implement timeouts** for sampling requests
- **Handle model errors well** with proper fallbacks

Sampling parameters dey allow fine-tune how language models behave to get the right balance between deterministic and creative outputs.

Make we check how to arrange these parameters inside different programming languages.

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

For di code we don see before, we don:

- Create one MCP client with specific server URL.
- Configure one request with sampling parameters like `temperature`, `top_p`, and `top_k`.
- Send di request and print the generated text.
- Use:
    - `allowedTools` to talk which tools di model fit use for di generation. For this case, we allow `ideaGenerator` and `marketAnalyzer` tools to help generate creative app ideas.
    - `frequencyPenalty` and `presencePenalty` to control how repetition and diversity dey happen for di output.
    - `temperature` to control how random di output go be, higher values mean more creative responses.
    - `top_p` to limit tokens to the ones wey get top cumulative probability mass, e dey improve di quality of generated text.
    - `top_k` to restrict the model to top K most probable tokens, wey fit make responses more coherent.
    - `frequencyPenalty` and `presencePenalty` to reduce repetition and support diversity for generated text.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript Example: Temperature and Top-P sampling configuration
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Start di MCP client
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Set up request wit different sampling parameters
  const creativeSampling = {
    temperature: 0.9,    // Higher temperature = more randomness/creativity
    topP: 0.92,          // Look tokens wey get top 92% probability mass
    frequencyPenalty: 0.6, // Make token sequences no too dey repeat
    presencePenalty: 0.4   // Punish tokens wey don show for di text so far
  };
  
  const factualSampling = {
    temperature: 0.2,    // Lower temperature = more deterministic/factual
    topP: 0.85,          // Small bit more focused token selection
    frequencyPenalty: 0.2, // Small small repetition penalty
    presencePenalty: 0.1   // Small small presence penalty
  };
  
  try {
    // Send two requests wit different sampling configurations
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

For di code we don see before, we don:

- Initialize one MCP client with server URL and API key.
- Configure two sets of sampling parameters: one for creative tasks and one for factual tasks.
- Send requests with these configurations, allow model use specific tools for each task.
- Print the generated responses to show how different sampling parameters dey affect am.
- Use `allowedTools` to specify which tools di model fit use for generation. For this case, we allow `ideaGenerator` and `environmentalImpactTool` for creative tasks, plus `factChecker` and `dataAnalysisTool` for factual tasks.
- Use `temperature` to control randomness for output, higher values mean more creative responses.
- Use `top_p` to limit token selection to the ones wey contribute to top cumulative probability mass, improving generated text quality.
- Use `frequencyPenalty` and `presencePenalty` to reduce repetition and encourage diversity for output.
- Use `top_k` to restrict model to top K most probable tokens, helping generate more coherent responses.

---

## Deterministic Sampling

For applications wey need consistent outputs, deterministic sampling dey make sure results fit reproduce every time. E dey do this by using fixed random seed and setting temperature to zero.

Make we check sample implementation below to show how deterministic sampling dey work for different programming languages.

# [Java](#tab/java)

```java
// Java Example: Deterministic responses wit fixed seed
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Using fixed seed for deterministic results
        
        // First request wit fixed seed
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Zero temperature for maximum determinism
            .build();
            
        // Second request wit di same seed
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Execute both requests
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Responses for dey identical because of di same seed and temperature=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

For di code we don see before, we don:

- Create MCP client with specified server URL.
- Configure two requests with same prompt, fixed seed, and zero temperature.
- Send both requests and print generated text.
- Show say responses dey identical because sampling setup be deterministic (same seed and temperature).
- Use `setSeed` to specify fixed random seed, make model dey generate same output every time for same input.
- Set `temperature` to zero to make sure determinism maximum, so model go always select di most probable next token without randomness.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript Example: Deterministic responses wit seed control
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // First request wit fixed seed
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Zero temperature make e get maximum determinism
    });
    
    // Second request wit di same seed and temperature
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Third request wit different seed but di same temperature
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

For di code we don see before, we don:

- Initialize MCP client with server URL.
- Configure two requests with same prompt, fixed seed, and zero temperature.
- Send both requests and print generated text.
- Show say responses dey identical because sampling setup be deterministic (same seed and temperature).
- Use `seed` to specify fixed random seed, make model dey generate same output every time for same input.
- Set `temperature` to zero to make sure determinism maximum, so model go always select most probable next token without randomness.
- Use different seed for third request to show say changing seed fit make output different, even with same prompt and temperature.

---

## Dynamic Sampling Configuration

Intelligent sampling dey adapt parameters based on context and wetin each request need. That mean e dey change parameters like temperature, top_p, and penalties according to task type, user preferences, or past performance.

Make we look how to implement dynamic sampling for different programming languages.

# [Python](#tab/python)

```python
# Python Example: Dynamic sampling based on request context
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Define sampling presets for different task types
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Select base preset
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Adjust based on user preferences if provided
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Scale temperature based on creativity preference (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Adjust top_p based on desired response diversity
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Create and send request with custom sampling parameters
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Return response with sampling metadata for transparency
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

For di code we don see before, we don:

- Create `DynamicSamplingService` class wey dey manage adaptive sampling.
- Define sampling presets for different task types (creative, factual, code, analytical).
- Select base sampling preset based on task type.
- Adjust sampling parameters based on user preferences, like creativity level and diversity.
- Send request with sampling parameters wey dynamically configured.
- Return generated text along with sampling parameters and task type for transparency.
- Use `temperature` to control randomness for output, higher values mean more creative responses.
- Use `top_p` to limit tokens to those wey contribute to top cumulative probability mass, enhancing generated text quality.
- Use `frequency_penalty` to reduce repetition and encourage diversity for output.
- Use `user_preferences` to allow customization of sampling parameters based on user-defined creativity and diversity levels.
- Use `task_type` to determine proper sampling strategy for request, allow better responses based on task nature.
- Use `send_request` method to send prompt with configured sampling parameters, make sure model generate text as requested.
- Use `generated_text` to get model response, then return am along with sampling parameters and task type for more analysis or display.
- Use `min` and `max` functions to make sure user preferences dey clamp inside valid range, avoid invalid sampling configurations.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript Exampul: Dynamic sampling konfigureshon we dem base on user context
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Define base sampling profiles
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Track historical performance
    this.performanceHistory = [];
  }
  
  // Detect task type from prompt
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Simple heuristic detection - fit beta improved wit ML classification
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // Default to conversational if no clear type dey detected
    return 'conversational';
  }
  
  // Calculate sampling parameters based on context and user preferences
  getSamplingParameters(prompt, context = {}) {
    // Detect the type of task
    const taskType = this.detectTaskType(prompt, context);
    
    // Get base profile
    let params = {...this.samplingProfiles[taskType]};
    
    // Adjust based on user preferences
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Scale from 1-10 to correct temperature range
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Higher precision mean say lower topP (more focused selection)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Higher consistency mean say lower penalties
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Apply learned adjustments from performance history
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Simple adaptive logic - fit beta improve wit more sophisticated algorithms
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Only consider recent history
    
    if (relevantHistory.length > 0) {
      // Calculate average performance scores
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // If performance dey below threshold, adjust parameters
      if (avgScore < 0.7) {
        // Slight adjustment towards safer values
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Record performance for future adjustments
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 rating of response quality
    });
    
    // Limit history size
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Get optimized sampling parameters
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Send request wit optimized parameters
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // If user provide feedback, record am for future optimization
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// Example usage
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Creative task wit custom user preferences
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // High creativity (1-10)
          consistency: 3  // Low consistency (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Code generation task
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Low creativity
          precision: 8,   // High precision
          consistency: 9  // High consistency
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

For di code we don see before, we don:

- Create `AdaptiveSamplingManager` class wey dey manage dynamic sampling based on task type and user preferences.
- Define sampling profiles for different task types (creative, factual, code, conversational).
- Implement method to detect task type from prompt using simple heuristics.
- Calculate sampling parameters based on detected task type and user preferences.
- Apply learned adjustments based on past performance to optimize sampling parameters.
- Record performance for future adjustments, allow system to learn from past interactions.
- Send requests with dynamically configured sampling parameters and return generated text along with applied parameters and detected task type.
- Use:
    - `userPreferences` to allow customization of sampling parameters based on user creativity, precision, and consistency levels.
    - `detectTaskType` to find out task nature from prompt, so system fit provide better responses.
    - `recordPerformance` to log how generated responses perform, so system fit adapt and improve over time.
    - `applyLearnedAdjustments` to change sampling parameters based on past performance, make model generate better responses.
    - `generateResponse` to do complete process of generating response with adaptive sampling, e easy to call with different prompts and context.
    - `allowedTools` to specify which tools model fit use during generation, allow better context-aware responses.
    - `feedbackScore` to allow users provide feedback on generated response quality, wey fit help refine model performance over time.
    - `performanceHistory` to keep record of past interactions, enable system to learn from success and failures.
    - `getSamplingParameters` to adjust sampling parameters dynamically based on request context, allow model behave more flexible and responsive.
    - `detectTaskType` to classify task based on prompt, help system apply correct sampling strategies for different requests.
    - `samplingProfiles` to define base sampling config for different tasks, help quick adjustments based on request nature.

---

## Wetin Next

- [5.7 Scaling](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->