> [已棄用：2026-07-28 發行候選版本](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Model Context Protocol 中的取樣

> **棄用通知：** `2026-07-28` MCP 規範發行候選版本標記取樣為棄用，建議改為直接整合 LLM 供應商 API。取樣在 `2025-11-25` 版本以及正式棄用後至少一年內仍將運作，因此本課程內容仍然有效 — 但新的服務器設計應評估替代模式。請參閱[ MCP 變更內容：2026-07-28 發行候選版本](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

取樣是 MCP 的強大功能，允許服務器透過用戶端向 LLM 請求完成內容，實現複雜的代理行為，同時維持安全和隱私。適當的取樣配置能顯著提升回應品質和效能。MCP 提供標準化的方式，透過特定參數控制模型生成文字的隨機性、創造力與連貫性。

## 介紹

本課程將探討如何在 MCP 請求中配置取樣參數，並理解取樣的協議機制。

## 學習目標

完成本課程後，您將能夠：

- 理解 MCP 中可用的主要取樣參數。
- 為不同使用場景配置取樣參數。
- 實作可重複的確定性取樣。
- 根據情境及使用者喜好動態調整取樣參數。
- 應用取樣策略提升模型效能於各種情境。
- 理解 MCP 客戶端-服務器流程中取樣的運作方式。

## MCP 中的取樣運作方式

MCP 中的取樣流程如下：

1. 服務器發送 `sampling/createMessage` 請求給客戶端
2. 客戶端審查並可修改該請求
3. 客戶端從 LLM 進行取樣
4. 客戶端審查生成結果
5. 客戶端將結果回傳給服務器

此人機互動的設計確保使用者能控制 LLM 所看到及生成的內容。

## 取樣參數總覽

MCP 定義以下可於客戶端請求中配置的取樣參數：

| 參數 | 說明 | 典型範圍 |
|-----------|-------------|---------------|
| `temperature` | 控制標記選擇的隨機性 | 0.0 - 1.0 |
| `maxTokens` | 最大生成標記數量 | 整數值 |
| `stopSequences` | 遇到即停止生成的自訂序列 | 字串陣列 |
| `metadata` | 額外的供應商特定參數 | JSON 物件 |

許多 LLM 供應商透過 `metadata` 欄位支援附加參數，可能包含：

| 常見擴展參數 | 說明 | 典型範圍 |
|-----------|-------------|---------------|
| `top_p` | 核心取樣 - 限制標記於累積概率最高部分 | 0.0 - 1.0 |
| `top_k` | 限制標記於前 K 個選項 | 1 - 100 |
| `presence_penalty` | 根據文本中已出現頻率懲罰標記 | -2.0 - 2.0 |
| `frequency_penalty` | 根據文本中標記頻率懲罰標記 | -2.0 - 2.0 |
| `seed` | 指定隨機種子以確保結果可重複 | 整數值 |

## 請求示例格式

以下為 MCP 中向客戶端請求取樣的範例：

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

客戶端回傳完成結果：

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

## 人機監督控制

MCP 取樣設計中包含人工監督：

- <strong>對於提示語</strong>：
  - 客戶端應向使用者展示建議提示
  - 使用者應能修改或拒絕提示
  - 系統提示可被過濾或修改
  - 上下文包含由客戶端控管

- <strong>對於完成結果</strong>：
  - 客戶端應向使用者展示完成結果
  - 使用者應能修改或拒絕完成結果
  - 客戶端可過濾或修改完成結果
  - 使用者控管所使用的模型

根據這些原則，以下將介紹在不同程式語言中如何實作取樣，重點放在各大 LLM 供應商常支援的參數。

## 安全考量

在 MCP 中實作取樣時，請注意以下安全最佳實務：

- <strong>驗證所有訊息內容</strong> 後才發送給客戶端
- <strong>淨化提示與完成內容中的敏感資訊</strong>
- <strong>實施速率限制</strong> 防止濫用
- <strong>監控取樣使用</strong> 以偵測異常行為
- <strong>使用安全協定加密資料傳輸</strong>
- <strong>依相關規則處理使用者資料隱私</strong>
- <strong>審核取樣請求</strong> 以確保合規與安全
- <strong>控管成本暴露</strong> 設定適當限制
- <strong>對取樣請求實施逾時機制</strong>
- <strong>妥善處理模型錯誤</strong> 並設定適當備援

取樣參數允許細調語言模型的行為，以在確定性與創造性輸出間達到所需平衡。

接下來示範如何在不同程式語言中配置這些參數。

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

在以上程式碼中我們：

- 建立一個以特定服務器 URL 的 MCP 客戶端。
- 配置包含 `temperature`、`top_p` 和 `top_k` 的取樣參數的請求。
- 發送請求並印出生成的文字。
- 使用了：
    - `allowedTools` 指定模型生成過程中可使用的工具。本例中允許 `ideaGenerator` 與 `marketAnalyzer` 協助產生創意應用點子。
    - `frequencyPenalty` 與 `presencePenalty` 控制生成文本中重複性與多樣性。
    - `temperature` 控制輸出的隨機性，值越高回應越具創造性。
    - `top_p` 限制選擇標記於具最高累積概率的部分，提高生成文字品質。
    - `top_k` 限制模型於機率最高的 K 個標記中選擇，有助生成更連貫回應。
    - `frequencyPenalty` 與 `presencePenalty` 重複列出，強調其在降低重複與鼓勵多樣性中的作用。

# [JavaScript](#tab/javascript)

```javascript
// JavaScript 範例：溫度及 Top-P 採樣配置
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // 初始化 MCP 客戶端
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // 使用不同的採樣參數配置請求
  const creativeSampling = {
    temperature: 0.9,    // 更高的溫度 = 更多隨機性/創意性
    topP: 0.92,          // 考慮包含頂部 92% 機率質量的標記
    frequencyPenalty: 0.6, // 減少標記序列重複
    presencePenalty: 0.4   // 懲罰迄今在文本中出現過的標記
  };
  
  const factualSampling = {
    temperature: 0.2,    // 較低的溫度 = 更具決定性/事實性
    topP: 0.85,          // 較專注的標記選擇
    frequencyPenalty: 0.2, // 最低的重複懲罰
    presencePenalty: 0.1   // 最低的出現懲罰
  };
  
  try {
    // 發送兩個具有不同採樣配置的請求
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

在以上程式碼中我們：

- 使用服務器 URL 和 API 金鑰初始化 MCP 客戶端。
- 配置兩組取樣參數：一組用於創意任務，另一組用於事實查證任務。
- 使用這些配置發送請求，允許模型針對不同任務使用特定工具。
- 列印生成的回應以展示不同取樣參數的效果。
- 使用 `allowedTools` 指定模型生成過程中可使用的工具。本例中創意任務允許 `ideaGenerator` 與 `environmentalImpactTool`，事實任務允許 `factChecker` 與 `dataAnalysisTool`。
- 使用 `temperature` 控制生成輸出的隨機性，值越高回應越具創造性。
- 使用 `top_p` 限制選擇標記於具最高累積概率的部分，提高生成文字品質。
- 使用 `frequencyPenalty` 與 `presencePenalty` 降低輸出中的重複性並鼓勵多樣性。
- 使用 `top_k` 限制模型於機率最高的 K 個標記中選擇，有助生成更連貫回應。

---

## 確定性取樣

對需確保輸出一致的應用，確定性取樣可保證結果可重複。實現方式為使用固定隨機種子並將溫度設為零。

以下示範不同程式語言中實現確定性取樣的範例。

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
            .setTemperature(0.0) // 零溫度以獲得最大確定性
            .build();
            
        // 使用相同種子的第二次請求
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // 執行兩個請求
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // 由於相同的種子和 temperature=0，回應應該相同
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

在以上程式碼中我們：

- 建立指定服務器 URL 的 MCP 客戶端。
- 配置兩個請求，使用相同提示語、固定種子和零溫度。
- 發送這兩個請求並列印生成結果。
- 展示如何由於取樣配置的確定性（相同種子與溫度），兩次回應相同。
- 使用 `setSeed` 指定固定隨機種子，確保模型在相同輸入下每次皆生成相同輸出。
- 將 `temperature` 設為零以確保最大程度的確定性，模型總是選擇機率最高的下一標記，無隨機性。

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
    // 第一次請求使用固定種子
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // 溫度設為零以達到最大確定性
    });
    
    // 第二次請求使用相同的種子和溫度
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // 第三次請求使用不同的種子但相同的溫度
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

在以上程式碼中我們：

- 初始化帶服務器 URL 的 MCP 客戶端。
- 配置兩個使用相同提示語、固定種子及零溫度的請求。
- 發送兩個請求並印出生成文字。
- 展示兩次回應由於取樣配置的確定性（相同種子及溫度）而相同。
- 使用 `seed` 指定固定隨機種子，確保在相同輸入下模型永遠輸出相同結果。
- 將 `temperature` 設為零以保證最高確定性，模型將總是選擇最可能的下個標記，無隨機性。
- 對第三次請求使用不同種子，以示改變種子即使在相同提示語和溫度下也會產生不同輸出。

---

## 動態取樣配置

智慧取樣會根據每次請求的上下文與需求調整參數。換言之，會根據任務類型、使用者喜好或歷史效能動態調整 `temperature`、`top_p` 與懲罰參數。

讓我們看看如何在不同程式語言中實作動態取樣。

# [Python](#tab/python)

```python
# Python 範例：根據請求上下文進行動態取樣
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
        
        # 選擇基礎預設
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
        
        # 建立並發送帶有自訂取樣參數的請求
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # 返回帶有取樣元數據的回應以確保透明度
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

在以上程式碼中我們：

- 建立管理適應性取樣的 `DynamicSamplingService` 類別。
- 定義適用於不同任務類型（創意、事實、程式碼、分析）的取樣預設參數。
- 根據任務類型選擇基礎取樣預設。
- 依使用者喜好調整取樣參數，如創造力與多樣性。
- 傳送帶有動態配置取樣參數的請求。
- 回傳生成文字以及所用取樣參數和任務類型，以增加透明度。
- 使用 `temperature` 控制輸出隨機性，值越高回應越具創造性。
- 使用 `top_p` 限制選擇標記於最高累積概率的部分，提高生成品質。
- 使用 `frequency_penalty` 降低重複並鼓勵多樣性。
- 使用 `user_preferences` 允許根據使用者定義的創造力與多樣性等級自訂取樣參數。
- 使用 `task_type` 確定適合的取樣策略，根據任務性質提供更合適回應。
- 使用 `send_request` 方法送出提示語及取樣參數，確保模型依指定需求生成文字。
- 使用 `generated_text` 取得模型回應，並隨取樣參數和任務類型回傳以利後續分析或展示。
- 使用 `min` 和 `max` 函數確保使用者喜好值在有效範圍內，避免無效取樣配置。

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript 範例：根據用戶情境的動態採樣配置
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // 定義基本採樣配置檔案
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
    
    // 簡單啟發式偵測 - 可透過機器學習分類強化
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
    
    // 若未偵測到明確類型，預設為對話類型
    return 'conversational';
  }
  
  // 根據情境和用戶偏好計算採樣參數
  getSamplingParameters(prompt, context = {}) {
    // 偵測任務類型
    const taskType = this.detectTaskType(prompt, context);
    
    // 取得基本配置檔案
    let params = {...this.samplingProfiles[taskType]};
    
    // 根據用戶偏好進行調整
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 將 1-10 的比例轉換為適當的溫度範圍
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // 精確度越高意味著 topP 越低（選擇更集中）
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // 一致性越高意味著懲罰越低
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // 套用從表現歷史中學到的調整
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // 簡單的自適應邏輯 - 可藉由更複雜的演算法強化
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
    // 記錄表現以供未來調整
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 0-1 的回應品質評分
    });
    
    // 限制歷史大小
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // 取得最佳化的採樣參數
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // 使用最佳化參數發送請求
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // 若用戶提供回饋，記錄以供未來優化
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
    // 具有自訂用戶偏好的創意任務
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // 高創意 (1-10)
          consistency: 3  // 低一致性 (1-10)
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

在以上程式碼中我們：

- 創建一個 `AdaptiveSamplingManager` 類別，根據任務類型與使用者喜好管理動態取樣。
- 定義適用於不同任務類型（創意、事實、程式碼、對話）的取樣配置檔。
- 實作根據提示語使用簡單啟發式檢測任務類型的方法。
- 計算取樣參數，基於所偵測的任務類型及使用者喜好。
- 根據歷史效能套用學習調整，以優化取樣參數。
- 記錄效能以利未來調整，讓系統從過去互動中學習。
- 發送動態配置取樣參數的請求，並回傳生成文字及應用參數和偵測任務類型。
- 使用了：
    - `userPreferences` 允許依使用者定義的創造力、精確性與一致性等級自訂取樣參數。
    - `detectTaskType` 根據提示語判斷任務性質，提供更適合的回應。
    - `recordPerformance` 紀錄生成回應效能，讓系統能持續調整與改善。
    - `applyLearnedAdjustments` 基於歷史表現調整取樣參數，提升回應品質。
    - `generateResponse` 封裝整體流程，便於針對不同提示和上下文調用動態取樣生成回應。
    - `allowedTools` 指定模型在生成過程中可用的工具，使回應更具上下文感知。
    - `feedbackScore` 允許使用者對生成品質提供反饋，助於模型性能持續優化。
    - `performanceHistory` 保存過去互動紀錄，使系統從成功與失敗中學習。
    - `getSamplingParameters` 根據請求上下文動態調整取樣參數，使模型行為更靈活。
    - `detectTaskType` 根據提示分類任務，讓系統對不同請求套用合適取樣策略。
    - `samplingProfiles` 定義不同任務類型的基礎取樣配置，方便依任務性質快速調整。

---

## 下一步

- [5.7 擴展](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->