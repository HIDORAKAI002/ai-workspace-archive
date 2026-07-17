> [非推奨: 2026-07-28 リリース候補](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Model Context Protocol におけるサンプリング

> **非推奨通知:** `2026-07-28` の MCP 仕様リリース候補では、Sampling は直接的なLLMプロバイダーAPIとの統合を推奨するため非推奨とされました。Samplingは `2025-11-25` で動作を継続し、正式な非推奨から少なくとも1年間は使用可能なので、このレッスンの内容は有効ですが、新しいサーバーデザインは置き換えパターンを検討してください。詳細は [MCPの変更点：2026-07-28 リリース候補](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)をご覧ください。

Samplingは、クライアントを通じてサーバーがLLM補完を要求できる強力なMCP機能であり、高度なエージェント的動作を可能にしつつ、セキュリティとプライバシーを維持します。適切なサンプリング設定は応答品質とパフォーマンスを劇的に向上させます。MCPは、ランダム性、創造性、一貫性に影響を与える特定のパラメータでモデルのテキスト生成を制御する標準化された方法を提供します。

## はじめに

本レッスンでは、MCPリクエストにおけるサンプリングパラメータの設定方法と、サンプリングの基礎プロトコルの仕組みを探ります。

## 学習目標

このレッスンを終えると、以下ができるようになります：

- MCPで利用可能な主要なサンプリングパラメータを理解する
- 様々なユースケースに応じてサンプリングパラメータを設定する
- 再現可能な結果のために決定論的サンプリングを実装する
- コンテキストやユーザーの好みに基づいてサンプリングパラメータを動的に調整する
- 様々なシナリオでモデルパフォーマンス向上のためにサンプリング戦略を適用する
- MCPのクライアントサーバーフローでサンプリングがどのように機能するか理解する

## MCPにおけるサンプリングの仕組み

MCPのサンプリングフローは以下のステップに従います：

1. サーバーがクライアントに `sampling/createMessage` リクエストを送信
2. クライアントがリクエストを確認し、必要に応じて変更
3. クライアントがLLMからサンプリング
4. クライアントが補完結果を確認
5. クライアントが結果をサーバーに返す

このヒューマン・イン・ザ・ループ設計により、ユーザーはLLMが見る内容と生成する内容のコントロール権を保ちます。

## サンプリングパラメータ概要

MCPはクライアントリクエストで設定可能な以下のサンプリングパラメータを定義しています：

| パラメータ | 説明 | 典型的な範囲 |
|-----------|------|------------|
| `temperature` | トークン選択のランダム性を制御 | 0.0 - 1.0 |
| `maxTokens` | 生成する最大トークン数 | 整数値 |
| `stopSequences` | 生成停止のトリガーとなるカスタムシーケンス | 文字列配列 |
| `metadata` | 追加のプロバイダー特有パラメータ | JSONオブジェクト |

多くのLLMプロバイダーは `metadata` フィールドを通じて追加のパラメータをサポートしており、以下が含まれる場合があります：

| 共通拡張パラメータ | 説明 | 典型的な範囲 |
|-----------|------|------------|
| `top_p` | ニュークリウスサンプリング - トークンを上位累積確率に制限 | 0.0 - 1.0 |
| `top_k` | トークン選択を上位K件に制限 | 1 - 100 |
| `presence_penalty` | 既出トークンへのペナルティ | -2.0 - 2.0 |
| `frequency_penalty` | トークン出現頻度によるペナルティ | -2.0 - 2.0 |
| `seed` | 再現可能な結果を得るための特定の乱数シード | 整数値 |

## リクエスト例フォーマット

以下はMCPでクライアントにサンプリングを要求する例です：

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

## レスポンスフォーマット

クライアントは補完結果を返します：

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

## ヒューマン・イン・ザ・ループの制御

MCPサンプリングは人間の監督を念頭に設計されています：

- <strong>プロンプトの場合</strong>：
  - クライアントはユーザーに提案されたプロンプトを表示すべき
  - ユーザーはプロンプトを修正または拒否できるべき
  - システムプロンプトはフィルターや修正が可能
  - コンテキストの含有はクライアントが制御

- <strong>補完の場合</strong>：
  - クライアントはユーザーに補完結果を表示すべき
  - ユーザーは補完を修正または拒否できるべき
  - クライアントは補完をフィルタリングまたは修正できる
  - 使用モデルはユーザーが制御

これらの原則を踏まえて、異なるプログラミング言語での実装例を見ていきましょう。共通してLLMプロバイダーでサポートされるパラメータに焦点を当てます。

## セキュリティの考慮事項

MCPのサンプリング実装時に留意すべきセキュリティのベストプラクティス：

- <strong>すべてのメッセージ内容を検証</strong>した上でクライアントに送信
- <strong>プロンプトと補完から機微情報を除去</strong>
- <strong>不正利用防止のためレート制限を実装</strong>
- <strong>異常パターンのサンプリング使用状況を監視</strong>
- <strong>安全なプロトコルでデータ転送を暗号化</strong>
- <strong>関連規制に従いユーザーデータのプライバシーを扱う</strong>
- <strong>コンプライアンスとセキュリティのためサンプリングリクエストを監査</strong>
- <strong>コスト管理のため適切な制限を設ける</strong>
- <strong>サンプリングリクエストにタイムアウトを設定</strong>
- <strong>モデルエラーを適切に処理しフォールバックを実装</strong>

サンプリングパラメータは、モデルの決定論的かつ創造的な出力のバランスを調整することを可能にします。

これらのパラメータを異なるプログラミング言語で設定する方法を見てみましょう。

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

先のコードでは以下を行っています：

- 特定のサーバーURLでMCPクライアントを作成
- `temperature`、`top_p`、`top_k`などのサンプリングパラメータを使いリクエストを設定
- リクエストを送信し生成されたテキストを表示
- 以下を使用：
    - `allowedTools` で生成中にモデルが利用できるツールを指定。ここでは `ideaGenerator` と `marketAnalyzer` を許可し、創造的なアプリアイデアの生成を支援。
    - `frequencyPenalty` と `presencePenalty` による出力の繰り返し抑制と多様性促進。
    - `temperature` により出力のランダム性を制御。値が高いほど創造的な応答。
    - `top_p` によって上位累積確率に貢献するトークンの選択を制限し、生成テキストの質を向上。
    - `top_k` によって最も確率の高い上位Kトークンにモデルの選択を制限し、より一貫性のある応答生成に寄与。
    - `frequencyPenalty` と `presencePenalty` により繰り返しを減らし、多様性を促進。

# [JavaScript](#tab/javascript)

```javascript
// JavaScriptの例：温度およびTop-Pサンプリング設定
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCPクライアントを初期化する
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // 異なるサンプリングパラメータでリクエストを設定する
  const creativeSampling = {
    temperature: 0.9,    // 温度が高いほどランダム性や創造性が増す
    topP: 0.92,          // 上位92％の確率質量を持つトークンを考慮する
    frequencyPenalty: 0.6, // トークンの繰り返しを減らす
    presencePenalty: 0.4   // これまでのテキストに出現したトークンをペナルティする
  };
  
  const factualSampling = {
    temperature: 0.2,    // 温度が低いほど決定的で事実的になる
    topP: 0.85,          // やや集中したトークン選択
    frequencyPenalty: 0.2, // 最小限の繰り返しペナルティ
    presencePenalty: 0.1   // 最小限の出現ペナルティ
  };
  
  try {
    // 異なるサンプリング設定で2つのリクエストを送信する
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

先のコードでは以下を行っています：

- サーバーURLとAPIキーでMCPクライアントを初期化
- 創造的タスク用と事実タスク用に2つのサンプリングパラメータセットを構成
- これら設定でリクエストを送り、モデルがそれぞれのタスク用に特定ツールを利用可能に
- 生成された応答を出力し、異なるサンプリングパラメータの効果を実証
- `allowedTools` を使用し、生成中にモデルが利用可能なツールを指定。ここでは創造的タスクに `ideaGenerator` と `environmentalImpactTool`、事実タスクに `factChecker` と `dataAnalysisTool` を許可。
- `temperature` により出力のランダム性を制御。値が高いほど創造的な応答。
- `top_p` により上位累積確率に貢献するトークンの選択を制限し、生成テキストの質を向上。
- `frequencyPenalty` と `presencePenalty` によって繰り返しを抑制し、多様性を促進。
- `top_k` によりモデルの選択を確率上位Kトークンに制限し、一貫性のある応答を助ける。

---

## 決定論的サンプリング

一貫した出力が必要なアプリケーションでは、決定論的サンプリングにより再現可能性を保証します。その方法は固定の乱数シードを使い、temperatureをゼロに設定することです。

以下のサンプル実装で、異なるプログラミング言語における決定論的サンプリングを示します。

# [Java](#tab/java)

```java
// Javaの例：固定シードによる決定的応答
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // 決定的な結果のために固定シードを使用
        
        // 固定シードによる最初のリクエスト
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // 最大の決定性のために温度をゼロに設定
            .build();
            
        // 同じシードによる2回目のリクエスト
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // 両方のリクエストを実行
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // 同じシードとtemperature=0のため、応答は同一であるべきです
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

先のコードでは以下を行っています：

- 指定したサーバーURLでMCPクライアントを作成
- 同じプロンプト、固定シード、温度ゼロの2つのリクエストを設定
- 両方のリクエストを送信し生成テキストを表示
- シードと温度が同じため、返答が同一になる決定論的性を示した
- `setSeed` を使い固定乱数シードを指定し、同じ入力で同じ出力を生成
- `temperature` をゼロに設定し最大の決定論性を保証。モデルは常に最も確率の高い次のトークンを選択しランダム性なし。

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScriptの例：シード制御による決定的な応答
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // 固定シードでの最初のリクエスト
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // 最大の決定性のためのゼロ温度
    });
    
    // 同じシードと温度での2回目のリクエスト
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // 異なるシードだが同じ温度での3回目のリクエスト
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

先のコードでは以下を行っています：

- サーバーURLでMCPクライアントを初期化
- 同じプロンプト、固定シード、温度ゼロの2つのリクエストを設定
- 両リクエストを送信し生成テキストを表示
- シードと温度が同じため、返答が同一になる決定論的性を示した
- `seed` を使い固定乱数シードを指定し、同じ入力で同じ出力を生成
- `temperature` をゼロに設定し最大の決定論性を保証。モデルは常に最も確率の高い次のトークンを選択しランダム性なし。
- 3つ目のリクエストでは異なるシードを使い、同じプロンプトと温度でも異なる出力になることを示した。

---

## 動的サンプリング設定

インテリジェントなサンプリングは、リクエストごとのコンテキストと要件に基づいてパラメータを適応的に調整します。つまり、タスクの種類、ユーザーの好み、過去のパフォーマンスに応じてtemperature、top_p、ペナルティなどのパラメータを動的に変えます。

以下に、異なるプログラミング言語で動的サンプリングを実装する方法を紹介します。

# [Python](#tab/python)

```python
# Pythonの例：リクエストコンテキストに基づく動的サンプリング
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # 異なるタスクタイプのためのサンプリングプリセットを定義
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # 基本プリセットを選択
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # ユーザーの好みがあればそれに基づいて調整
        if user_preferences:
            if "creativity_level" in user_preferences:
                # 創造性の好み（1-10）に基づいて温度をスケーリング
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # 希望する応答の多様性に基づいてtop_pを調整
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # カスタムサンプリングパラメータでリクエストを作成し送信
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # 透明性のためにサンプリングメタデータ付きで応答を返す
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

先のコードでは以下を行っています：

- 適応的サンプリングを管理する `DynamicSamplingService` クラスを作成
- 創造的、事実、コード、分析といった異なるタスクタイプのサンプリングプリセットを定義
- タスクタイプに基づいてベースのサンプリングプリセットを選択
- 創造性や多様性のユーザー設定に基づいてサンプリングパラメータを調整
- 動的に設定されたサンプリングパラメータでリクエストを送信
- 生成されたテキストと共に適用されたサンプリングパラメータやタスクタイプを返却して透明性を確保
- `temperature` を使いランダム性を制御。値が高いとより創造的な応答。
- `top_p` によって上位累積確率に貢献するトークンの選択を制限し、生成テキストの質を向上。
- 再現性を高めるために `frequency_penalty` を利用し繰り返し抑制と多様性促進。
- ユーザーの創造性や多様性レベルの設定に合わせて `user_preferences` を使用しパラメータをカスタマイズ。
- `task_type` を使いリクエストの性質に最適なサンプリング戦略を決定。
- `send_request` メソッドで設定済みのサンプリングパラメータ付きでプロンプトを送信し、モデルが指定要件に沿ったテキストを生成。
- `generated_text` でモデルの応答を取得し、分析や表示用にパラメータとタスクタイプと共に返却。
- ユーザー設定が有効範囲内であることを保証するため `min` と `max` 関数でクランプ処理を行う。

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScriptの例: ユーザーコンテキストに基づく動的サンプリング設定
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // 基本のサンプリングプロファイルを定義する
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // 過去のパフォーマンスを追跡する
    this.performanceHistory = [];
  }
  
  // プロンプトからタスクの種類を検出する
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // シンプルなヒューリスティック検出 - ML分類で強化可能
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
    
    // 明確な種類が検出されなければ対話型をデフォルトとする
    return 'conversational';
  }
  
  // コンテキストとユーザーの好みに基づいてサンプリングパラメータを計算する
  getSamplingParameters(prompt, context = {}) {
    // タスクの種類を検出する
    const taskType = this.detectTaskType(prompt, context);
    
    // 基本プロファイルを取得する
    let params = {...this.samplingProfiles[taskType]};
    
    // ユーザーの好みに応じて調整する
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1から10の範囲を適切な温度範囲にスケールする
        params.temperature = 0.1 + (creativity * 0.09); // 0.1〜1.0
      }
      
      if (precision !== undefined) {
        // 精度が高いほどtopPは低く（より集中した選択）
        params.topP = 1.0 - (precision * 0.05); // 0.5〜1.0
      }
      
      if (consistency !== undefined) {
        // 一貫性が高いほどペナルティは低くなる
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1〜0.9
      }
    }
    
    // パフォーマンス履歴から学習した調整を適用する
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // シンプルな適応ロジック - より洗練されたアルゴリズムで強化可能
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // 最近の履歴のみを考慮する
    
    if (relevantHistory.length > 0) {
      // 平均パフォーマンススコアを計算する
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // パフォーマンスが閾値を下回る場合はパラメータを調整する
      if (avgScore < 0.7) {
        // より安全な値に向けてわずかに調整する
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // 将来の調整のためにパフォーマンスを記録する
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // 応答品質の0から1の評価
    });
    
    // 履歴のサイズを制限する
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // 最適化されたサンプリングパラメータを取得する
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // 最適化パラメータでリクエストを送信する
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // ユーザーからフィードバックがあれば将来の最適化のために記録する
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

// 使用例
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // カスタムユーザー設定の創造的なタスク
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // 高い創造性（1-10）
          consistency: 3  // 低い一貫性（1-10）
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // コード生成タスク
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // 低い創造性
          precision: 8,   // 高い精度
          consistency: 9  // 高い一貫性
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

先のコードでは以下を行っています：

- タスクタイプとユーザー設定に基づく動的サンプリングを管理する `AdaptiveSamplingManager` クラスを作成
- 創造的、事実、コード、会話の異なるタスクタイプ向けにサンプリングプロファイルを定義
- シンプルなヒューリスティクスでプロンプトからタスクタイプを検出するメソッドを実装
- 検出されたタスクタイプとユーザー設定に基づいてサンプリングパラメータを計算
- 過去のパフォーマンスに基づく学習調整を適用してサンプリングパラメータを最適化
- 過去のやり取りを記録しシステムの学習に活用
- 動的に設定されたサンプリングパラメータでリクエストを送信し、適用パラメータと検出されたタスクタイプ付きで生成テキストを返却
- 使用したもの：
    - `userPreferences` でユーザーが定義した創造性、正確性、一貫性レベルに基づきパラメータをカスタマイズ可能
    - `detectTaskType` でプロンプトからタスク類型を判断し適切な応答を得る
    - `recordPerformance` で生成応答のパフォーマンスを記録しシステムの継続的改善を実現
    - `applyLearnedAdjustments` で過去の実績から学んだ調整をパラメータに適用し高品質応答を強化
    - `generateResponse` で適応型サンプリングを使った応答生成プロセスをまとめ、様々なプロンプトやコンテキストに簡単に使用可能
    - `allowedTools` で生成時に使用できるツールを指定し、より文脈に即した応答を実現
    - `feedbackScore` でユーザーから生成応答の品質に関するフィードバックを受け、それを元にパフォーマンス改善
    - `performanceHistory` で過去のやり取りを記録し成功/失敗から学習
    - `getSamplingParameters` でリクエストのコンテキストに応じてサンプリングパラメータを動的に調整し柔軟なモデル動作を実現
    - `detectTaskType` でプロンプトに基づきタスクを分類し、各種リクエストに適したサンプリング戦略を適用
    - `samplingProfiles` で異なるタスクタイプの基礎サンプリング構成を定義し、リクエストの性質に応じて迅速に調整可能

---

## 次のステップ

- [5.7 スケーリング](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->