# 🎯 Azure OpenAI (Responses API) を使った計画とデザインパターン (.NET)

## 📋 学習目標

このノートブックでは、.NET の Microsoft Agent Framework と Azure OpenAI (Responses API) を用いたインテリジェントエージェント構築のためのエンタープライズグレードの計画とデザインパターンを紹介します。複雑な問題の分解、マルチステップソリューションの計画、そして .NET のエンタープライズ機能を用いた高度なワークフローの実行ができるエージェントの作成方法を学びます。

## ⚙️ 前提条件とセットアップ

**開発環境:**
- .NET 9.0 SDK 以上
- Visual Studio 2022 または C# 拡張機能付き VS Code
- Azure OpenAI リソースとモデルデプロイを持つ Azure サブスクリプション
- Azure CLI — `az login` でログイン

**必要な依存関係:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**環境設定 (.env ファイル):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## コードの実行

本レッスンでは .NET Single File App の実装を含みます。実行するには:

```bash
# ファイルを実行可能にする（Linux/macOS）
chmod +x 07-dotnet-agent-framework.cs

# アプリケーションを実行する
./07-dotnet-agent-framework.cs
```

または dotnet run コマンドを使います:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## コード実装

完全な実装は `07-dotnet-agent-framework.cs` にあり、以下を示しています:

- DotNetEnv を使った環境設定の読み込み
- Azure OpenAI クライアントを設定し、`GetChatClient().AsAIAgent()` を使って AI エージェントを作成
- JSON シリアル化を用いた構造化データモデル (Plan と TravelPlan) の定義
- JSON スキーマを使った構造化出力の AI エージェント作成
- 型安全な応答による計画リクエストの実行

## 主要な概念

### 型安全モデルによる構造化計画

エージェントは C# クラスを用いて計画の出力構造を定義します:

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

### 構造化出力のための JSON スキーマ

エージェントは TravelPlan スキーマに準拠した応答を返すよう設定されています:

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

### 計画エージェントの指示

エージェントは調整役として振る舞い、専門のサブエージェントにタスクを委任します:

- FlightBooking: フライトの予約および情報提供
- HotelBooking: ホテルの予約および情報提供
- CarRental: 車の予約およびレンタル情報提供
- ActivitiesBooking: アクティビティの予約および情報提供
- DestinationInfo: 目的地情報の提供
- DefaultAgent: 一般的なリクエストの処理

## 期待される出力

旅行計画のリクエストでエージェントを実行すると、リクエストを解析し、専門エージェントへの適切なタスク割り当てを含む構造化された計画を TravelPlan スキーマに準拠した JSON 形式で生成します。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->