> [已废弃：2026-07-28 发布候选版本](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Model Context Protocol中的采样

> **废弃通知：** `2026-07-28` MCP规范发布候选版本标记采样为废弃，推荐直接集成LLM提供者API。采样在`2025-11-25`版本中仍然可用，并在任何正式废弃后至少持续一年，因此本课内容仍然有效—但新的服务器设计应评估替代方案。详见[ MCP的变化：2026-07-28发布候选版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

采样是MCP的一个强大功能，允许服务器通过客户端请求LLM完成，支持复杂的代理行为，同时保持安全和隐私。合适的采样配置可以显著提升响应质量和性能。MCP提供了标准化方式来控制模型生成文本，使用特定参数影响随机性、创造力和连贯性。

## 介绍

本课将探讨如何在MCP请求中配置采样参数，并理解采样的底层协议机制。

## 学习目标

通过本课，您将能够：

- 了解MCP中可用的主要采样参数。
- 为不同用例配置采样参数。
- 实现确定性采样以获得可复现结果。
- 根据上下文和用户偏好动态调整采样参数。
- 应用采样策略提升模型在各种场景下的性能。
- 理解采样在客户端-服务器流程中的工作方式。

## MCP中的采样工作原理

MCP的采样流程如下：

1. 服务器向客户端发送`sampling/createMessage`请求
2. 客户端审核请求并可进行修改
3. 客户端从LLM采样
4. 客户端审核完成结果
5. 客户端将结果返回给服务器

这种人机交互设计确保用户对LLM所见和生成的内容保持控制。

## 采样参数概览

MCP定义了以下可在客户端请求中配置的采样参数：

| 参数 | 描述 | 典型范围 |
|-----------|-------------|---------------|
| `temperature` | 控制标记选择的随机性 | 0.0 - 1.0 |
| `maxTokens` | 生成的最大标记数 | 整数值 |
| `stopSequences` | 遇到自定义序列时停止生成 | 字符串数组 |
| `metadata` | 额外的提供者特定参数 | JSON对象 |

许多LLM提供者通过`metadata`字段支持额外参数，可能包括：

| 常用扩展参数 | 描述 | 典型范围 |
|-----------|-------------|---------------|
| `top_p` | 核心采样-限制标记到累积概率顶端 | 0.0 - 1.0 |
| `top_k` | 限制标记选择到前K选项 | 1 - 100 |
| `presence_penalty` | 根据标记在文本中的出现情况进行惩罚 | -2.0 - 2.0 |
| `frequency_penalty` | 根据标记在文本中的频率进行惩罚 | -2.0 - 2.0 |
| `seed` | 指定随机种子以获得可复现结果 | 整数值 |

## 示例请求格式

以下是MCP中从客户端请求采样的示例：

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

## 响应格式

客户端返回完成结果：

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

## 人机交互控制

MCP采样设计体现人类监督原则：

- **对于提示：**
  - 客户端应向用户展示建议的提示
  - 用户应能修改或拒绝提示
  - 系统提示可被过滤或修改
  - 上下文包含由客户端控制

- **对于完成：**
  - 客户端应向用户展示完成结果
  - 用户应能修改或拒绝完成结果
  - 客户端可过滤或修改完成结果
  - 用户控制使用哪个模型

本着这些原则，接下来我们看如何在不同编程语言中实现采样，重点关注各LLM提供者普遍支持的参数。

## 安全考虑

实现MCP采样时，应考虑以下安全最佳实践：

- <strong>验证所有消息内容</strong>，确保安全后再发送给客户端
- <strong>清理提示和完成中的敏感信息</strong>
- <strong>实施速率限制</strong>以防滥用
- <strong>监控采样使用情况</strong>，检测异常模式
- <strong>使用安全协议加密传输中的数据</strong>
- <strong>根据相关法规处理用户数据隐私</strong>
- <strong>审计采样请求</strong>以确保合规与安全
- <strong>通过适当限制控制成本暴露</strong>
- <strong>为采样请求实现超时处理</strong>
- <strong>优雅处理模型错误</strong>，设置合适的降级方案

采样参数允许微调语言模型的行为，实现确定性与创造性输出的理想平衡。

下面展示如何在不同编程语言中配置这些参数。

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

以上代码中我们：

- 创建了一个指定服务器URL的MCP客户端。
- 配置了包含`temperature`、`top_p`和`top_k`等采样参数的请求。
- 发送请求并打印生成的文本。
- 使用了：
    - `allowedTools` 指定生成过程中允许模型使用的工具。在本例中允许了`ideaGenerator`和`marketAnalyzer`工具，协助生成创意应用想法。
    - `frequencyPenalty` 和 `presencePenalty` 控制输出的重复和多样性。
    - `temperature` 控制输出的随机性，值越高响应越具创造力。
    - `top_p` 限制标记选择为累积概率顶端的部分，提高生成文本质量。
    - `top_k` 限制模型选取概率最高的前K个标记，帮助生成更连贯内容。
    - `frequencyPenalty` 和 `presencePenalty` 进一步减少重复，鼓励文本多样性。

# [JavaScript](#tab/javascript)

```javascript
// JavaScript 示例：温度和Top-P采样配置
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // 初始化MCP客户端
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // 使用不同采样参数配置请求
  const creativeSampling = {
    temperature: 0.9,    // 温度越高 = 随机性/创造性越强
    topP: 0.92,          // 考虑累计概率质量为92%的词元
    frequencyPenalty: 0.6, // 减少词元序列的重复
    presencePenalty: 0.4   // 惩罚在文本中已出现的词元
  };
  
  const factualSampling = {
    temperature: 0.2,    // 温度越低 = 越确定/事实性越强
    topP: 0.85,          // 词元选择略微更集中
    frequencyPenalty: 0.2, // 最小重复惩罚
    presencePenalty: 0.1   // 最小出现惩罚
  };
  
  try {
    // 发送两个具有不同采样配置的请求
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

以上代码中我们：

- 使用服务器URL和API密钥初始化了MCP客户端。
- 配置了两套采样参数：一套用于创意任务，另一套用于事实任务。
- 发送带有这些配置的请求，允许模型分别针对不同任务使用特定工具。
- 打印生成的响应，展示不同采样参数的效果。
- 使用`allowedTools`声明模型可用工具，创意任务允许`ideaGenerator`和`environmentalImpactTool`，事实任务允许`factChecker`和`dataAnalysisTool`。
- 使用`temperature`控制输出随机性，高值带来更有创造力的回应。
- 使用`top_p`限制选取贡献较大概率的标记，提升生成质量。
- 使用`frequencyPenalty`和`presencePenalty`减低重复，促进多样性。
- 使用`top_k`限制模型选取概率最高的前K个标记，帮助生成更清晰回答。

---

## 确定性采样

对于需要一致输出的应用，确定性采样保证结果可复现。其做法是使用固定随机种子且设置温度为零。

以下示例展示了不同编程语言中确定性采样的实现。

# [Java](#tab/java)

```java
// Java 示例：使用固定种子的确定性响应
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // 使用固定种子以获得确定性结果
        
        // 使用固定种子的第一次请求
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // 零温度以实现最大程度的确定性
            .build();
            
        // 使用相同种子的第二次请求
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // 执行两个请求
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // 由于使用相同的种子且温度=0，响应应当相同
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

以上代码中我们：

- 创建了一个指定服务器URL的MCP客户端。
- 配置了两个请求，使用相同提示、固定种子及零温度。
- 发送这两个请求并打印生成文本。
- 演示了由于采样配置确定性（相同种子和温度），响应是完全一致的。
- 使用`setSeed`指定固定随机种子，确保相同输入每次生成相同输出。
- 将`temperature`设为零，保证最大确定性，模型总是选择最可能的下一个标记，没有随机性。

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript 示例：通过种子控制实现确定性响应
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // 第一次请求，使用固定种子
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // 温度设为零以实现最大确定性
    });
    
    // 第二次请求，使用相同的种子和温度
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // 第三次请求，使用不同的种子但相同的温度
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

以上代码中我们：

- 初始化了一个服务器URL的MCP客户端。
- 配置了两个请求，使用相同提示、固定种子及零温度。
- 发送请求并打印生成文本。
- 由于采样配置确定性（相同种子和温度），演示了响应相同。
- 使用`seed`指定固定随机种子，保证相同输入每次输出一致。
- 将`temperature`设置为零，保证最大确定性，模型只选最可能的下一个标记，无随机性。
- 第三个请求使用不同种子，展示改变种子会导致不同输出，即使提示和温度相同。

---

## 动态采样配置

智能采样会根据每个请求的上下文和需求动态调整参数。这意味着根据任务类型、用户偏好或历史表现动态调整温度、top_p和惩罚等参数。

下面展示了不同编程语言中动态采样的实现方式。

# [Python](#tab/python)

```python
# Python示例：基于请求上下文的动态采样
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # 为不同任务类型定义采样预设
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # 选择基础预设
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # 如果提供，基于用户偏好进行调整
        if user_preferences:
            if "creativity_level" in user_preferences:
                # 根据创造力偏好（1-10）缩放温度参数
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # 根据期望的响应多样性调整top_p
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # 创建并发送带有自定义采样参数的请求
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # 返回带有采样元数据的响应以保证透明度
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

以上代码中我们：

- 创建了一个管理自适应采样的`DynamicSamplingService`类。
- 定义了不同任务类型（创意、事实、代码、分析）的采样预设。
- 根据任务类型选择基础采样预设。
- 根据用户偏好，如创造力和多样性，调整采样参数。
- 使用动态配置的采样参数发送请求。
- 返回生成的文本及所用采样参数和任务类型以供透明查看。
- 使用`temperature`控制输出随机性，值越高越具创造力。
- 使用`top_p`限制标记选择至贡献头部累积概率，提高生成文本质量。
- 使用`frequency_penalty`减低重复，促进多样性。
- 使用`user_preferences`允许根据用户设置自定义采样参数，如创造力和多样性级别。
- 使用`task_type`确定适合请求的采样策略，基于任务特性实现更个性化响应。
- 通过`send_request`方法发送带配置参数的提示，确保模型按指定要求生成文本。
- 通过`generated_text`获取模型响应，连同采样参数和任务类型一并返回，便于后续分析显示。
- 使用`min`和`max`确保用户偏好处于有效范围，避免无效采样配置。

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript 示例：基于用户上下文的动态采样配置
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // 定义基础采样配置
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // 跟踪历史性能
    this.performanceHistory = [];
  }
  
  // 从提示中检测任务类型
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // 简单启发式检测 - 可通过机器学习分类增强
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
    
    // 如果未检测到明确类型，默认为对话型
    return 'conversational';
  }
  
  // 根据上下文和用户偏好计算采样参数
  getSamplingParameters(prompt, context = {}) {
    // 检测任务类型
    const taskType = this.detectTaskType(prompt, context);
    
    // 获取基础配置
    let params = {...this.samplingProfiles[taskType]};
    
    // 根据用户偏好调整
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 将1-10的规模转换为适当的温度范围
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // 更高精度意味着更低的topP（更集中选择）
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // 更高一致性意味着更低的惩罚
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // 应用从性能历史中学到的调整
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // 简单自适应逻辑 - 可用更复杂算法增强
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // 只考虑最近历史
    
    if (relevantHistory.length > 0) {
      // 计算平均性能得分
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // 如果性能低于阈值，调整参数
      if (avgScore < 0.7) {
        // 向更安全值轻微调整
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // 记录性能以便未来调整
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 对响应质量的0-1评分
    });
    
    // 限制历史大小
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // 获取优化后的采样参数
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // 使用优化参数发送请求
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // 如果用户提供反馈，记录以便未来优化
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

// 示例用法
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // 具有自定义用户偏好的创意任务
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // 高创意（1-10）
          consistency: 3  // 低一致性（1-10）
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // 代码生成任务
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // 低创意
          precision: 8,   // 高精度
          consistency: 9  // 高一致性
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

以上代码中我们：

- 创建了一个`AdaptiveSamplingManager`类，根据任务类型和用户偏好管理动态采样。
- 定义了不同任务类型（创意、事实、代码、会话）的采样配置文件。
- 实现了利用简单启发式方法从提示检测任务类型的方法。
- 计算了基于检测到的任务类型和用户偏好的采样参数。
- 应用了基于历史表现的学习调整以优化采样参数。
- 记录性能供未来调整，让系统从过去交互中学习。
- 发送带动态配置采样参数的请求，并返回生成文本以及应用参数和检测到的任务类型。
- 使用了：
    - `userPreferences` 允许基于用户自定义的创造力、精确性和一致性级别调整采样参数。
    - `detectTaskType` 通过提示判断任务性质，实现更个性化响应。
    - `recordPerformance` 记录生成响应性能，帮助系统适应和改进。
    - `applyLearnedAdjustments` 根据历史表现调整采样参数，提高模型生成高质量响应的能力。
    - `generateResponse` 封装了带自适应采样的响应生成流程，方便调用不同提示和上下文。
    - `allowedTools` 指定生成过程中模型可使用的工具，实现更具上下文感知的响应。
    - `feedbackScore` 允许用户对生成结果质量提供反馈，用于进一步优化模型表现。
    - `performanceHistory` 维护过往交互记录，使系统从成功和失败中学习。
    - `getSamplingParameters` 根据请求上下文动态调整采样参数，提升模型行为的灵活性与响应能力。
    - `detectTaskType` 基于提示分类任务，允许系统为不同请求应用合适采样策略。
    - `samplingProfiles` 定义了不同任务类型的基础采样配置，便于根据请求性质快速调整。

---

## 接下来

- [5.7 扩展](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->