> [已棄用：2026-07-28 釋出候選版](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Model Context Protocol 中的取樣

> **棄用通知：**`2026-07-28` MCP 規範釋出候選版標記取樣為棄用，改用與大型語言模型提供者 API 的直接整合。取樣在 `2025-11-25` 版本仍可使用，且在任何正式棄用後至少持續一年，因此本課程所述內容仍有效，但新的伺服器設計應評估取代方案。詳見 [MCP 變更內容：2026-07-28 釋出候選版](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

取樣是 MCP 強大的功能，允許伺服器透過客戶端向大型語言模型請求完成結果，使代理行為更為複雜同時維持安全與隱私。適當的取樣設定能顯著提升回應品質與效能。MCP 提供標準化方式，以具體參數控制模型生成文本的隨機性、創造力及連貫性。

## 介紹

本課程將探討如何在 MCP 請求中配置取樣參數，並了解取樣的底層協議運作機制。

## 學習目標

完成本課程後，你將能夠：

- 理解 MCP 中可用的主要取樣參數。
- 為不同使用案例配置取樣參數。
- 實作確定性取樣以生成可重現結果。
- 根據上下文與用戶偏好動態調整取樣參數。
- 應用取樣策略以增強模型在各種情境下的表現。
- 理解取樣在 MCP 客戶端-伺服器流程中的運作方式。

## MCP 中取樣的運作機制

MCP 中的取樣流程包含以下步驟：

1. 伺服器發送 `sampling/createMessage` 請求到客戶端
2. 客戶端審核請求並可修改
3. 客戶端從大型語言模型取樣
4. 客戶端審核完成結果
5. 客戶端將結果返回伺服器

此人為迴路設計確保用戶掌控大型語言模型所接觸與生成的內容。

## 取樣參數概述

MCP 定義了以下可在客戶端請求中配置的取樣參數：

| 參數 | 說明 | 常見範圍 |
|-----------|-------------|---------------|
| `temperature` | 控制詞元選擇的隨機性 | 0.0 - 1.0 |
| `maxTokens` | 最大生成詞元數 | 整數值 |
| `stopSequences` | 遇到則停止生成的自訂序列 | 字串陣列 |
| `metadata` | 其他提供者特定的參數 | JSON 物件 |

許多大型語言模型提供者支援透過 `metadata` 欄位配置額外參數，可能包括：

| 常見擴展參數 | 說明 | 常見範圍 |
|-----------|-------------|---------------|
| `top_p` | 核心取樣 - 限制在最高累積機率範圍的詞元 | 0.0 - 1.0 |
| `top_k` | 限制選擇在前 K 個機率最高的詞元 | 1 - 100 |
| `presence_penalty` | 根據詞元在文本中出現與否懲罰使用 | -2.0 - 2.0 |
| `frequency_penalty` | 根據詞元在文本中頻率懲罰使用 | -2.0 - 2.0 |
| `seed` | 指定隨機種子以產生可重現的結果 | 整數值 |

## 範例請求格式

以下是一個 MCP 中從客戶端請求取樣的範例：

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

客戶端返回完成結果：

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

## 人為監控迴路控制

MCP 取樣設計有人工監控在內：

- <strong>針對提示詞</strong>：
  - 客戶端應向用戶展示建議的提示詞
  - 用戶應能修改或拒絕提示詞
  - 系統提示詞可被過濾或修改
  - 上下文包含由客戶端掌控

- <strong>針對完成結果</strong>：
  - 客戶端應向用戶展示完成內容
  - 用戶可修改或拒絕完成內容
  - 客戶端可過濾或修改完成內容
  - 用戶控制使用哪個模型

在這些原則下，我們來看如何用不同程式語言實作取樣，重點關注多數大型語言模型供應商支援的參數。

## 安全考量

實作 MCP 取樣時，請考慮以下安全最佳實踐：

- <strong>驗證所有訊息內容</strong> 再發送給客戶端
- <strong>對提示詞與完成內容中的敏感資訊清理</strong>
- <strong>實施速率限制</strong> 防止濫用
- <strong>監控取樣使用</strong> 以偵測異常模式
- <strong>使用安全協議加密傳輸資料</strong>
- <strong>依相關法規處理用戶資料隱私</strong>
- <strong>審計取樣請求</strong> 確保遵循規範及安全
- <strong>控制成本風險</strong> 設定適當限制
- <strong>為取樣請求實作逾時機制</strong>
- <strong>妥善處理模型錯誤</strong> 並採取適當補救機制

取樣參數能微調語言模型行為，達成確定性與創造力輸出間理想的平衡。

現在我們來看看如何在不同程式語言中配置這些參數。

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

之前的程式碼中，我們：

- 建立了帶有特定伺服器 URL 的 MCP 客戶端。
- 配置了如 `temperature`、`top_p`、`top_k` 等取樣參數。
- 發送請求並印出生成的文本。
- 使用了：
    - `allowedTools` 指定生成過程中模型可使用的工具，本例允許 `ideaGenerator` 和 `marketAnalyzer` 工具協助產生創意應用點子。
    - `frequencyPenalty` 與 `presencePenalty` 控制輸出的重複率與多樣性。
    - `temperature` 控制輸出隨機性，值越高生成越具創造力。
    - `top_p` 限制選擇的詞元只包含對累積機率貢獻最大的部分，提高生成文本品質。
    - `top_k` 將模型限制於最多 K 個最可能詞元，有助於產生更連貫回應。
    - `frequencyPenalty` 與 `presencePenalty` 降低重複並促進多樣性。

# [JavaScript](#tab/javascript)

```javascript
// JavaScript 範例：溫度與頂部機率採樣配置
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // 初始化 MCP 用戶端
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // 使用不同採樣參數配置請求
  const creativeSampling = {
    temperature: 0.9,    // 溫度越高 = 隨機性／創造力越高
    topP: 0.92,          // 考慮機率質量前 92% 的標記
    frequencyPenalty: 0.6, // 減少標記序列的重複
    presencePenalty: 0.4   // 對已出現於文本中的標記加以懲罰
  };
  
  const factualSampling = {
    temperature: 0.2,    // 溫度越低 = 趨於決定性／事實性
    topP: 0.85,          // 稍微更聚焦的標記選擇
    frequencyPenalty: 0.2, // 最小的重複懲罰
    presencePenalty: 0.1   // 最小的存在懲罰
  };
  
  try {
    // 以不同採樣配置發送兩個請求
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

在上述程式碼中，我們：

- 初始化了帶伺服器 URL 和 API 金鑰的 MCP 客戶端。
- 配置了兩組取樣參數：一組用於創意任務，另一組用於事實性任務。
- 以這些配置發送請求，允許模型在每種任務中使用指定工具。
- 印出生成的回應，展示不同取樣參數的效果。
- 使用 `allowedTools` 指定生成過程中模型可用的工具，創意任務允許 `ideaGenerator` 和 `environmentalImpactTool`，事實任務允許 `factChecker` 和 `dataAnalysisTool`。
- 使用 `temperature` 控制輸出的隨機性，數值越高創造力越強。
- 使用 `top_p` 限制選擇詞元只包含對累積機率最大貢獻部分，提高文本品質。
- 使用 `frequencyPenalty` 和 `presencePenalty` 減少重複並鼓勵多樣性。
- 使用 `top_k` 限制模型只選擇排名前 K 的高機率詞元，有助於生成更連貫的回應。

---

## 確定性取樣

針對需要一致輸出的應用，確定性取樣確保結果可重現。其做法是使用固定隨機種子並將溫度設定為零。

現在讓我們看以下範例實作，演示不同程式語言中的確定性取樣。

# [Java](#tab/java)

```java
// Java 範例：使用固定種子產生決定性回應
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // 使用固定種子以取得決定性結果
        
        // 第一次使用固定種子的請求
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // 設定溫度為零以達到最高決定性
            .build();
            
        // 第二次使用相同種子的請求
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // 執行兩個請求
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // 由於種子相同且溫度為0，回應應該相同
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

之前的程式碼中，我們：

- 創建了帶有特定伺服器 URL 的 MCP 客戶端。
- 配置了兩個以相同提示詞、固定種子及零溫度的請求。
- 發送兩個請求並印出生成的文本。
- 證明回應相同，因為取樣設定的確定性（同種子及溫度）。
- 使用 `setSeed` 指定固定隨機種子，確保模型對相同輸入每次產出相同結果。
- 將 `temperature` 設為零，確保最大確定性，模型始終選擇最可能的下一詞元而無隨機性。

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript 範例：使用種子控制的確定性回應
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

在先前程式碼中，我們：

- 初始化了帶伺服器 URL 的 MCP 客戶端。
- 配置了兩個以相同提示詞、固定種子及零溫度的請求。
- 發送兩個請求並印出生成的文本。
- 證明回應相同，因為取樣設定的確定性（同種子及溫度）。
- 使用 `seed` 指定固定隨機種子，確保模型對相同輸入每次產出相同結果。
- 將 `temperature` 設為零，確保最大確定性，模型始終選擇最可能的下一詞元而無隨機性。
- 第三個請求使用不同種子，展示即使提示詞與溫度相同，變更種子也會導致不同輸出。

---

## 動態取樣配置

智能取樣會根據每個請求的上下文和需求調整參數，即動態修改溫度、top_p 與懲罰等參數，依任務型態、用戶偏好或歷史表現調整。

現在讓我們看看如何在不同程式語言中實作動態取樣。

# [Python](#tab/python)

```python
# Python 範例：根據請求上下文動態取樣
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # 定義不同任務類型的取樣預設值
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # 選擇基礎預設值
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # 如果有提供，根據用戶偏好進行調整
        if user_preferences:
            if "creativity_level" in user_preferences:
                # 根據創意偏好（1-10）調整溫度參數
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # 根據期望的回應多樣性調整 top_p
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # 使用自訂取樣參數建立並發送請求
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # 回傳包含取樣元資料以確保透明度的回應
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

在上述程式碼中，我們：

- 創建了管理自適應取樣的 `DynamicSamplingService` 類別。
- 定義了針對不同任務型態（創意、事實、程式碼、分析）的取樣預設值。
- 根據任務型態選擇基底取樣預設。
- 根據用戶偏好（如創造力及多樣性）調整取樣參數。
- 使用動態配置的取樣參數發送請求。
- 返回生成文本及使用的取樣參數與任務型態以利透明化。
- 使用 `temperature` 控制輸出隨機性，值越高創造力越強。
- 使用 `top_p` 限制選擇詞元只包含對累積機率最大貢獻部分，提高文本品質。
- 使用 `frequency_penalty` 降低重複並促進多樣性。
- 用 `user_preferences` 允許基於用戶定義的創造力與多樣性等級自訂取樣參數。
- 根據 `task_type` 決定該請求適用的取樣策略，以基於任務性質提供更合適回應。
- 使用 `send_request` 方法以配置的取樣參數傳送提示詞，確保模型依指定要求生成文本。
- 使用 `generated_text` 取得模型回應，並連同取樣參數及任務型態一併返回以供進一步分析或展示。
- 使用 `min` 與 `max` 函數確保用戶偏好值在有效範圍內，防止無效取樣設定。

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript 範例：根據用戶情境的動態取樣配置
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // 定義基本取樣設定檔
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // 追蹤歷史表現
    this.performanceHistory = [];
  }
  
  // 從提示中偵測任務類型
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // 簡單的啟發式偵測 - 可透過機器學習分類強化
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
    
    // 若無明確類型，預設為對話型
    return 'conversational';
  }
  
  // 根據情境和用戶偏好計算取樣參數
  getSamplingParameters(prompt, context = {}) {
    // 偵測任務類型
    const taskType = this.detectTaskType(prompt, context);
    
    // 取得基本設定檔
    let params = {...this.samplingProfiles[taskType]};
    
    // 根據用戶偏好調整
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 將 1-10 等級尺度轉換至適當的溫度範圍
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // 精確度越高，topP 越低（選擇更聚焦）
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // 一致性越高，罰分越低
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // 應用從表現歷史中學習的調整
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // 簡單的自適應邏輯 - 可使用更複雜的算法強化
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // 僅考慮近期歷史
    
    if (relevantHistory.length > 0) {
      // 計算平均表現分數
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // 若表現低於閾值，調整參數
      if (avgScore < 0.7) {
        // 輕微調整至較安全的值
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // 紀錄表現以供未來調整
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 回應品質的 0-1 評分
    });
    
    // 限制歷史大小
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // 取得優化後的取樣參數
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // 使用優化參數發送請求
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // 若用戶提供回饋，紀錄以供未來優化
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

// 範例使用
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // 具自訂用戶偏好的創意任務
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

在上述程式碼中，我們：

- 創建了根據任務類型和用戶偏好管理動態取樣的 `AdaptiveSamplingManager` 類別。
- 定義了針對不同任務類型（創意、事實、程式碼、對話）的取樣設定。
- 實作了使用簡單啟發式方法從提示詞檢測任務類型的方法。
- 根據偵測出的任務類型與用戶偏好計算取樣參數。
- 根據歷史表現應用學習到的調整優化取樣參數。
- 記錄過往表現以便未來調整，使系統能從過去交互中學習。
- 發送動態配置的取樣參數請求並返回生成文本，連同所用參數及偵測到的任務類型。
- 使用了：
    - `userPreferences` 允許基於用戶定義的創造力、精確度及一致性等級自訂取樣參數。
    - `detectTaskType` 根據提示詞判斷任務性質；從而針對不同請求提供更符合的回應。
    - `recordPerformance` 記錄生成回應的表現，讓系統能適應並提升表現。
    - `applyLearnedAdjustments` 根據歷史表現修改取樣參數，提升模型生成優質回應的能力。
    - `generateResponse` 封裝整個流程，使用自適應取樣生成回應，使得可輕鬆呼叫不同提示詞和上下文。
    - `allowedTools` 指定模型生成過程中可使用的工具，使回應更具上下文感知。
    - `feedbackScore` 允許用戶對生成回應品質進行反饋，進而持續改善模型表現。
    - `performanceHistory` 保存過往交互紀錄，使系統能從成功與失敗中學習。
    - `getSamplingParameters` 根據請求上下文動態調整取樣參數，令模型行為更靈活、響應更即時。
    - `detectTaskType` 分類提示詞所屬任務，讓系統對不同類型請求套用合適取樣策略。
    - `samplingProfiles` 定義各任務類型的基底取樣配置，便於根據請求性質迅速調整。

---

## 接下來的內容

- [5.7 擴展](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->