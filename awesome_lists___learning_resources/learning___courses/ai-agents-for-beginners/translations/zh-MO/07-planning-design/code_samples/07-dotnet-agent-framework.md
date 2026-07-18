# 🎯 使用 Azure OpenAI（Responses API）進行規劃與設計模式（.NET）

## 📋 學習目標

本筆記本示範了使用 .NET 中的 Microsoft Agent Framework 及 Azure OpenAI（Responses API）構建智能代理的企業級規劃與設計模式。您將學習如何創建能分解複雜問題、規劃多步解決方案並運用 .NET 企業功能執行複雜工作流程的代理。

## ⚙️ 前置條件與設定

**開發環境：**
- .NET 9.0 SDK 或更高版本
- Visual Studio 2022 或安裝 C# 擴充功能的 VS Code
- 擁有 Azure 訂閱，並且建立了 Azure OpenAI 資源及模型部署
- 作業 Azure CLI — 使用 `az login` 登入

**所需依賴項：**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**環境配置 (.env 檔案)：**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## 執行程式碼

本課程包含 .NET 單一檔案應用程式實作。執行方式：

```bash
# 令檔案可執行（Linux/macOS）
chmod +x 07-dotnet-agent-framework.cs

# 執行應用程式
./07-dotnet-agent-framework.cs
```

或使用 dotnet run 指令：

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## 程式碼實作

完整實作位於 `07-dotnet-agent-framework.cs`，示範以下內容：

- 使用 DotNetEnv 載入環境配置
- 設定 Azure OpenAI 用戶端並透過 `GetChatClient().AsAIAgent()` 建立 AI 代理
- 定義結構化資料模型（Plan 和 TravelPlan）並序列化為 JSON
- 利用 JSON schema 建立帶結構化輸出的 AI 代理
- 執行具有類型安全回應的規劃請求

## 核心概念

### 使用類型安全模型進行結構化規劃

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

代理配置為返回符合 TravelPlan 架構的回應：

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

### 規劃代理指示

代理擔任協調者角色，委派任務給專門子代理：

- FlightBooking：負責訂票及提供航班資訊
- HotelBooking：負責訂房及提供酒店資訊
- CarRental：負責租車及提供租車資訊
- ActivitiesBooking：負責預訂活動及提供活動資訊
- DestinationInfo：負責提供目的地資訊
- DefaultAgent：負責處理一般請求

## 預期輸出

執行帶有旅行規劃請求的代理時，代理會分析請求並產生結構化計劃，將適當任務分配給專門代理，並以符合 TravelPlan 架構的 JSON 格式回傳。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->