> [已棄用：2026-07-28 發行候選版本](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Model Context Protocol 中的採樣

> **棄用通知：** `2026-07-28` MCP 規範發行候選版本標記採樣為棄用，推薦改用與大型語言模型提供者 API 的直接整合。採樣在 `2025-11-25` 版本及正式棄用後至少一年內仍繼續有效，因此本課程內容依然有效——但新的伺服器設計應評估替代方案。詳見 [MCP 變更內容：2026-07-28 發行候選版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

採樣是 MCP 的一項強大功能，允許伺服器透過用戶端請求大型語言模型完成，啟用複雜的代理行為，同時保持安全與隱私。適當的採樣配置能顯著提升回應品質與效能。MCP 提供標準化方式控制模型產生文本的方式，設置影響隨機性、創造力與連貫性的特定參數。

## 介紹

本課程將探討如何在 MCP 請求中配置採樣參數，以及理解採樣的協定機制。

## 學習目標

完成本課程後，您將能夠：

- 理解 MCP 中可用的重要採樣參數。
- 為不同使用情境配置採樣參數。
- 實現確定性採樣以取得可重現的結果。
- 根據上下文與用戶偏好動態調整採樣參數。
- 應用採樣策略以提升模型於各種場景下的效能。
- 理解 MCP 用戶端與伺服器之間採樣的工作流程。

## MCP 中採樣的運作方式

MCP 採樣流程依序如下：

1. 伺服器向用戶端發送 `sampling/createMessage` 請求
2. 用戶端審查請求並可進行修改
3. 用戶端從大型語言模型抽樣
4. 用戶端審查完成結果
5. 用戶端回傳結果給伺服器

此人機互動設計確保使用者掌控大型語言模型的輸入與輸出內容。

## 採樣參數總覽

MCP 定義以下可於用戶端請求中配置的採樣參數：

| 參數 | 說明 | 典型範圍 |
|-----------|-------------|---------------|
| `temperature` | 控制標記選擇的隨機性 | 0.0 - 1.0 |
| `maxTokens` | 最大產生的標記數量 | 整數值 |
| `stopSequences` | 遇到自訂停止序列即停止生成 | 字串陣列 |
| `metadata` | 其他提供者特定參數 | JSON 物件 |

許多大型語言模型提供者透過 `metadata` 欄位支援額外參數，可能包含：

| 常見擴展參數 | 說明 | 典型範圍 |
|-----------|-------------|---------------|
| `top_p` | 核心採樣法——限制標記於最高累積機率質量 | 0.0 - 1.0 |
| `top_k` | 限制標記選擇於前 K 大選項 | 1 - 100 |
| `presence_penalty` | 根據標記出現與否進行懲罰 | -2.0 - 2.0 |
| `frequency_penalty` | 根據標記出現頻率進行懲罰 | -2.0 - 2.0 |
| `seed` | 指定隨機種子以重現結果 | 整數值 |

## 範例請求格式

以下為一次 MCP 用戶端請求採樣的範例：

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

## 回應格式

用戶端回傳完成結果：

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

## 人機互動監控

MCP 採樣設計強調有人監管：

- **針對提示詞：**
  - 用戶端應向使用者展示擬定的提示詞
  - 使用者應能修改或拒絕提示詞
  - 系統提示詞可被過濾或修改
  - 上下文納入由用戶端控制

- **針對完成結果：**
  - 用戶端應向使用者展示完成結果
  - 使用者應能修改或拒絕完成結果
  - 用戶端可過濾或修改完成結果
  - 使用者可控制所使用的模型

有此原則基礎下，接著我們將看如何在不同程式語言實作採樣，重點為大型語言模型提供者普遍支援的參數。

## 安全注意事項

實作 MCP 採樣時，請考慮以下安全最佳實踐：

- <strong>驗證所有訊息內容</strong> 後再傳送給用戶端
- <strong>對提示詞與完成結果敏感資訊進行淨化</strong>
- <strong>實施速率限制</strong> 防止濫用
- <strong>監控採樣使用狀況</strong> 偵測異常模式
- <strong>傳輸資料加密</strong> 使用安全協定
- <strong>根據相關法規處理用戶資料隱私</strong>
- <strong>審計採樣請求</strong> 以符合法規與安全需求
- <strong>控制成本暴露</strong> 設置適當限額
- <strong>實施採樣請求逾時機制</strong>
- <strong>妥善處理模型錯誤</strong> 並設置適當備援

採樣參數允許微調語言模型行為，以達成確定性與創意輸出的理想平衡。

接著我們將看如何在不同程式語言配置這些參數。

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

在前述程式碼中，我們已經：

- 建立一個具特定伺服器 URL 的 MCP 用戶端。
- 配置了包含 `temperature`、`top_p` 與 `top_k` 等採樣參數的請求。
- 傳送請求並印出產生的文本。
- 使用：
    - `allowedTools` 指定模型在生成時可使用的工具。本例允許 `ideaGenerator` 和 `marketAnalyzer` 工具協助生成創意應用構思。
    - `frequencyPenalty` 與 `presencePenalty` 控制輸出重複度與多樣性。
    - `temperature` 控制輸出的隨機性，較高值帶來更具創造性的回應。
    - `top_p` 限制標記選擇於累計最高機率群，提高生成文本品質。
    - `top_k` 限制模型於前 K 高機率標記，協助生成更連貫的回應。
    - `frequencyPenalty` 與 `presencePenalty` 避免重複並促進文本多樣性。

# [JavaScript](#tab/javascript)

```javascript
// JavaScript 範例：溫度及Top-P取樣配置
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // 初始化 MCP 客戶端
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // 使用不同取樣參數配置請求
  const creativeSampling = {
    temperature: 0.9,    // 溫度越高 = 越多隨機性/創意
    topP: 0.92,          // 考慮累積機率質量達到92%的詞元
    frequencyPenalty: 0.6, // 減少詞元序列重複
    presencePenalty: 0.4   // 懲罰已經出現過的詞元
  };
  
  const factualSampling = {
    temperature: 0.2,    // 溫度越低 = 越具決定性/事實性
    topP: 0.85,          // 稍微更專注的詞元選擇
    frequencyPenalty: 0.2, // 最小重複懲罰
    presencePenalty: 0.1   // 最小出現懲罰
  };
  
  try {
    // 使用不同取樣配置發送兩個請求
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

在前述程式碼中，我們已經：

- 初始化一個帶有伺服器 URL 與 API 金鑰的 MCP 用戶端。
- 配置兩組採樣參數：一組用於創意任務，另一組用於事實核查任務。
- 使用這些配置發送請求，允許模型針對每個任務使用特定工具。
- 印出生成的回應以展示不同採樣參數的效果。
- 使用 `allowedTools` 指定模型在生成時可使用的工具。本例中創意任務允許 `ideaGenerator` 和 `environmentalImpactTool`，事實核查任務允許 `factChecker` 和 `dataAnalysisTool`。
- 使用 `temperature` 控制輸出隨機性，較高值帶來更具創造性的回應。
- 使用 `top_p` 限制標記選擇於累計最高機率群，提高生成文本品質。
- 使用 `frequencyPenalty` 與 `presencePenalty` 減少重複並促進輸出多樣性。
- 使用 `top_k` 限制模型於前 K 高機率標記，協助生成更連貫的回應。

---

## 確定性採樣

對於需要結果一致的應用，確定性採樣可確保結果可重現。其作法是使用固定的隨機種子並將溫度設為零。

以下範例展示如何在不同程式語言實作確定性採樣。

# [Java](#tab/java)

```java
// Java 範例：使用固定種子獲得確定性回應
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // 使用固定種子以獲得確定性結果
        
        // 使用固定種子的第一次請求
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // 設定溫度為零以達至最大確定性
            .build();
            
        // 使用同一種子的第二次請求
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // 執行兩個請求
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // 由於相同的種子及溫度=0，回應應該相同
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

在前述程式碼中，我們已經：

- 建立一個指定伺服器 URL 的 MCP 用戶端。
- 配置兩個使用相同提示詞、固定種子與零溫度的請求。
- 傳送兩個請求並列印生成文字。
- 展示因採樣配置確定性（同種子及溫度）而回應相同。
- 使用 `setSeed` 指定固定隨機種子，確保模型對相同輸入每次生成相同輸出。
- 將 `temperature` 設為零以確保最大確定性，即模型總是選擇最可能的下一個標記，不帶隨機性。

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript 示例：使用種子控制的確定性回應
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // 使用固定種子的第一次請求
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // 使用零溫度以達到最大確定性
    });
    
    // 使用相同種子和溫度的第二次請求
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // 使用不同種子但相同溫度的第三次請求
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

在前述程式碼中，我們已經：

- 初始化一個帶伺服器 URL 的 MCP 用戶端。
- 配置兩個使用相同提示詞、固定種子與零溫度的請求。
- 傳送兩個請求並列印生成文字。
- 展示因採樣配置確定性（同種子及溫度）而回應相同。
- 使用 `seed` 指定固定隨機種子，確保模型對相同輸入每次生成相同輸出。
- 將 `temperature` 設為零以確保最大確定性，即模型總是選擇最可能的下一個標記，不帶隨機性。
- 對第三個請求使用不同的種子，展示變更種子會產生不同輸出，即使提示詞與溫度相同。

---

## 動態採樣配置

智慧採樣會根據每次請求的上下文和需求調整參數。意味著根據任務類型、使用者偏好或歷史效能動態調整如溫度、top_p 及懲罰等參數。

讓我們看看如何在不同程式語言實作動態採樣。

# [Python](#tab/python)

```python
# Python 範例：基於請求上下文的動態取樣
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # 為不同任務類型定義取樣預設
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # 選擇基本預設
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # 如有提供，根據用戶偏好進行調整
        if user_preferences:
            if "creativity_level" in user_preferences:
                # 根據創意偏好（1-10）調整溫度參數
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # 根據期望的回應多樣性調整 top_p
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # 建立並發送具自訂取樣參數的請求
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # 回傳含取樣元資料的回應以增加透明度
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

在前述程式碼中，我們已經：

- 建立一個管理適應性採樣的 `DynamicSamplingService` 類別。
- 定義不同任務類型（創意、事實核查、程式碼、分析）的採樣預設。
- 根據任務類型選擇基礎採樣預設。
- 根據使用者偏好如創造力和多樣性調整採樣參數。
- 傳送帶有動態配置採樣參數的請求。
- 回傳生成文本，附帶使用的採樣參數與任務類型以供透明檢視。
- 使用 `temperature` 控制輸出隨機性，較高數值帶來更具創造性的回應。
- 使用 `top_p` 限制標記選擇於最高累積概率質量，提高生成文本品質。
- 使用 `frequency_penalty` 減少重複並促進多樣性。
- 使用 `user_preferences` 允許依用戶自定義創造力和多樣性層級來定製採樣參數。
- 使用 `task_type` 決定適合請求的採樣策略，根據任務性質提供更量身定制的回應。
- 使用 `send_request` 方法發送帶配置採樣參數的提示詞，確保模型按指定要求生成文本。
- 使用 `generated_text` 取得模型回應並連同採樣參數及任務類型回傳，方便進一步分析或顯示。
- 使用 `min` 和 `max` 函數確保使用者偏好在有效範圍內，防止無效採樣配置。

# [JavaScript 動態](#tab/javascript-dynamic)

```javascript
// JavaScript 範例：根據用戶情境動態取樣配置
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // 定義基礎取樣設定檔
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // 追蹤歷史表現
    this.performanceHistory = [];
  }
  
  // 從提示辨識任務類型
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // 簡單啟發式偵測 - 可用機器學習分類增強
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
    
    // 若未偵測到明確類型，預設為對話型
    return 'conversational';
  }
  
  // 根據情境和用戶喜好計算取樣參數
  getSamplingParameters(prompt, context = {}) {
    // 偵測任務類型
    const taskType = this.detectTaskType(prompt, context);
    
    // 取得基礎設定檔
    let params = {...this.samplingProfiles[taskType]};
    
    // 根據用戶喜好調整
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 將 1-10 縮放到合適的溫度範圍
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // 精確度越高，topP 越低（選擇越集中）
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // 一致性越高，懲罰越低
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // 套用從表現歷史中學習的調整
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // 簡單自適應邏輯 - 可用更複雜演算法增強
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // 僅考慮近期歷史
    
    if (relevantHistory.length > 0) {
      // 計算平均表現分數
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // 若表現低於門檻，調整參數
      if (avgScore < 0.7) {
        // 輕微調整至較安全的值
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // 記錄表現供未來調整使用
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 回應品質評分
    });
    
    // 限制歷史大小
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // 取得最佳化取樣參數
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // 使用最佳化參數發送請求
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // 若用戶提供回饋，記錄以便未來優化
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

// 範例用法
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // 創意任務與自訂用戶喜好
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // 高創意（1-10）
          consistency: 3  // 低一致性（1-10）
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // 程式碼生成任務
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // 低創意
          precision: 8,   // 高精確度
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

在前述程式碼中，我們已經：

- 建立管理動態採樣的 `AdaptiveSamplingManager` 類別，根據任務類型和使用者偏好調整。
- 定義不同任務類型（創意、事實核查、程式碼、對話）的採樣配置。
- 實作簡單啟發式方法偵測提示詞的任務類型。
- 根據偵測到的任務類型和使用者偏好計算採樣參數。
- 根據歷史效能應用學習的調整，優化採樣參數。
- 紀錄效能以供未來調整，使系統能從過去互動中學習。
- 傳送動態配置採樣參數的請求，回傳生成文本及應用參數與偵測的任務類型。
- 使用：
    - `userPreferences` 允許根據用戶定義的創造力、精確度和一致性層級定製採樣參數。
    - `detectTaskType` 根據提示詞判斷任務性質，實現更量身定制的回應。
    - `recordPerformance` 紀錄生成回應的效能，使系統能隨時間調整與提升。
    - `applyLearnedAdjustments` 根據歷史效能修改採樣參數，加強模型產生高品質回應的能力。
    - `generateResponse` 封裝整個以自適應採樣生成回應的流程，便於針對不同提示詞和上下文呼叫。
    - `allowedTools` 指定模型生成時可使用的工具，允許更具情境感知的回應。
    - `feedbackScore` 讓使用者提供生成回應品質反饋，可用以持續優化模型表現。
    - `performanceHistory` 保存過去互動紀錄，讓系統從先前成功和失敗經驗學習。
    - `getSamplingParameters` 根據請求上下文動態調整採樣參數，使模型行為更靈活、回應更具適應性。
    - `detectTaskType` 基於提示詞分類任務，讓系統針對不同類型請求應用適當採樣策略。
    - `samplingProfiles` 為不同任務類型定義基礎採樣配置，使調整更快捷方便。

---

## 後續內容

- [5.7 擴展規模](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->