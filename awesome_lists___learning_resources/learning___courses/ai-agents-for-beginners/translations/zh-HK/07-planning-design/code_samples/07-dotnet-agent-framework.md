# 🎯 使用 Azure OpenAI（回應 API）進行規劃與設計模式（.NET）

## 📋 學習目標

此筆記本展示了使用 Microsoft Agent Framework 在 .NET 與 Azure OpenAI（回應 API）中構建智能代理的企業級規劃和設計模式。您將學習如何創建能夠分解複雜問題、規劃多步驟解決方案並利用 .NET 企業功能執行複雜工作流程的代理。

## ⚙️ 預備條件與設定

**開發環境：**
- .NET 9.0 SDK 或更高版本
- Visual Studio 2022 或搭配 C# 擴充的 VS Code
- 具備 Azure 訂閱且有 Azure OpenAI 資源與模型部署
- Azure CLI — 使用 `az login` 登入

**必要相依套件：**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**環境設定（.env 檔案）：**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## 執行程式碼

本課程包含一個 .NET 單一檔案應用程式實作。執行方式如下：

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

完整實作位於 `07-dotnet-agent-framework.cs`，內容展示：

- 使用 DotNetEnv 載入環境設定
- 配置 Azure OpenAI 用戶端並利用 `GetChatClient().AsAIAgent()` 創建 AI 代理
- 定義結構化資料模型（Plan 和 TravelPlan），並使用 JSON 序列化
- 創建具結構化輸出且利用 JSON schema 的 AI 代理
- 使用型別安全響應執行規劃請求

## 主要概念

### 使用型別安全模型的結構化規劃

代理使用 C# 類別來定義規劃輸出的結構：

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

### 結構化輸出的 JSON Schema

代理配置為回傳符合 TravelPlan schema 的回應：

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

代理充當協調者，將任務委派給專門的子代理：

- FlightBooking：負責訂票及提供航班資訊
- HotelBooking：負責訂房及提供飯店資訊
- CarRental：負責租車及提供租車資訊
- ActivitiesBooking：負責預訂活動及提供活動資訊
- DestinationInfo：負責提供目的地資訊
- DefaultAgent：負責處理一般請求

## 預期輸出

當您執行代理並提出旅遊規劃請求時，它會分析請求並生成符合 TravelPlan schema、包含適當任務分配給專門代理的結構化規劃，並以 JSON 格式呈現。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->