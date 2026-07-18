# 🎯 使用 Azure OpenAI (Responses API) 的規劃與設計模式 (.NET)

## 📋 學習目標

本筆記本展示了如何使用 .NET 中的 Microsoft Agent Framework 與 Azure OpenAI (Responses API) 建立企業級的智能代理規劃與設計模式。您將學會創建能夠分解複雜問題、規劃多步解決方案並運用 .NET 企業功能執行複雜工作流程的智能代理。

## ⚙️ 先決條件與設定

**開發環境：**
- .NET 9.0 SDK 或更高版本
- Visual Studio 2022 或帶有 C# 擴充功能的 VS Code
- 一個包含 Azure OpenAI 資源與模型部署的 Azure 訂閱
- 安裝 Azure CLI — 使用 `az login` 登入

**所需依賴：**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**環境設定 (.env 文件)：**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## 執行程式碼

本課程包含一個 .NET 單檔案應用程式實作。執行方式如下：

```bash
# 使檔案可執行（Linux/macOS）
chmod +x 07-dotnet-agent-framework.cs

# 執行應用程式
./07-dotnet-agent-framework.cs
```

或使用 dotnet run 指令：

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## 程式碼實作

完整實作包含於 `07-dotnet-agent-framework.cs`，內容示範：

- 使用 DotNetEnv 載入環境設定
- 配置 Azure OpenAI 用戶端並透過 `GetChatClient().AsAIAgent()` 建立 AI 代理
- 定義用於計劃的結構化資料模型 (Plan 和 TravelPlan)，並採用 JSON 序列化
- 創建以 JSON 架構為輸出的結構化 AI 代理
- 執行具型別安全的規劃請求並回傳結果

## 核心概念

### 使用型別安全模型的結構化規劃

代理使用 C# 類別定義規劃輸出的結構：

```csharp
public class Plan
{
    [JsonPropertyName("assigned_agent")]
    public string? Assigned_agent { get; set; }

    [JsonPropertyName("task_details")]
    public string? Task_details { get; set; }
}

public class TravelPlan
{
    [JsonPropertyName("main_task")]
    public string? Main_task { get; set; }

    [JsonPropertyName("subtasks")]
    public IList<Plan> Subtasks { get; set; }
}
```

### 用於結構化輸出的 JSON 架構

代理設定回應必須符合 TravelPlan 架構：

```csharp
ChatClientAgentOptions agentOptions = new()
{
    Name = AGENT_NAME,
    Description = AGENT_INSTRUCTIONS,
    ChatOptions = new()
    {
        ResponseFormat = ChatResponseFormatJson.ForJsonSchema(
            schema: AIJsonUtilities.CreateJsonSchema(typeof(TravelPlan)),
            schemaName: "TravelPlan",
            schemaDescription: "Travel Plan with main_task and subtasks")
    }
};
```

### 規劃代理指令

代理作為協調者，委派任務給專門的子代理：

- FlightBooking：負責訂票及提供航班資訊
- HotelBooking：負責訂房及提供飯店資訊
- CarRental：負責租車及提供汽車租賃資訊
- ActivitiesBooking：負責預訂活動及提供活動資訊
- DestinationInfo：負責提供目的地資訊
- DefaultAgent：負責處理一般請求

## 預期輸出

執行代理旅遊規劃請求時，代理將分析請求並生成結構化計劃，並以符合 TravelPlan 架構的 JSON 格式，適當委派任務給專門代理。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->