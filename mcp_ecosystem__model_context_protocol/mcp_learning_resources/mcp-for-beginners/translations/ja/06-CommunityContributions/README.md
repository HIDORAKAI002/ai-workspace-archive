# コミュニティと貢献

[![MCPへの貢献方法：ツール、ドキュメント、コードなど](../../../translated_images/ja/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(上の画像をクリックするとこのレッスンのビデオが視聴できます)_

## 概要

このレッスンでは、MCPコミュニティへの関わり方、MCPエコシステムへの貢献方法、および共同開発のベストプラクティスに焦点を当てます。オープンソースのMCPプロジェクトに参加する方法を理解することは、この技術の未来を形作ろうとする人々にとって不可欠です。

## 学習目標

このレッスンを終える頃には、以下ができるようになります：

- MCPコミュニティとエコシステムの構造を理解する
- MCPコミュニティフォーラムや議論に効果的に参加する
- MCPのオープンソースリポジトリに貢献する
- カスタムのMCPツールやサーバーを作成・共有する
- MCPの開発と共同作業におけるベストプラクティスを守る
- MCP開発のためのコミュニティリソースとフレームワークを発見する

## MCPコミュニティエコシステム

MCPエコシステムは、プロトコルを進歩させるために協力する様々なコンポーネントと参加者から成り立っています。

### 主要なコミュニティコンポーネント

1. <strong>コアプロトコルのメンテナ</strong>: 公式の [Model Context Protocol GitHub組織](https://github.com/modelcontextprotocol) はコアMCP仕様とリファレンス実装を管理しています
2. <strong>ツール開発者</strong>: MCPツールやサーバーを作成する個人やチーム
3. <strong>統合プロバイダー</strong>: 自社製品やサービスにMCPを統合する企業
4. <strong>エンドユーザー</strong>: MCPをアプリケーションに使用する開発者や組織
5. <strong>貢献者</strong>: コード、ドキュメント、その他のリソースを提供するコミュニティメンバー

### コミュニティリソース

#### 公式チャネル

- [MCP GitHub組織](https://github.com/modelcontextprotocol)
- [MCPドキュメント](https://modelcontextprotocol.io/)
- [MCP仕様](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHubディスカッション](https://github.com/orgs/modelcontextprotocol/discussions)
- [MCP例とサーバーリポジトリ](https://github.com/modelcontextprotocol/servers)

#### コミュニティ主導のリソース

- [MCPクライアント](https://modelcontextprotocol.io/clients) - MCP統合をサポートするクライアントの一覧
- [コミュニティMCPサーバー](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - コミュニティ開発のMCPサーバーの増え続ける一覧
- [Awesome MCP Servers](https://github.com/wong2/awesome-mcp-servers) - 厳選されたMCPサーバーリスト
- [PulseMCP](https://www.pulsemcp.com/) - MCPリソースを発見するためのコミュニティハブ＆ニュースレター
- [Remote OpenClaw](https://www.remoteopenclaw.com/) - 無料で検索可能なMCPサーバー、エージェントスキル、プラグインのディレクトリ
- [Discordサーバー](https://discord.gg/jHEGxQu2a5) - MCP開発者と繋がる
- 言語別SDK実装
- ブログ投稿やチュートリアル

## MCPへの貢献

### 貢献の種類

MCPエコシステムは様々な種類の貢献を歓迎します：

1. <strong>コード貢献</strong>：
   - コアプロトコルの強化
   - バグ修正
   - ツールやサーバーの実装
   - 異なる言語でのクライアント／サーバーライブラリ

2. <strong>ドキュメント</strong>：
   - 既存ドキュメントの改善
   - チュートリアルやガイドの作成
   - ドキュメントの翻訳
   - 例やサンプルアプリケーションの作成

3. <strong>コミュニティサポート</strong>：
   - フォーラムやディスカッションでの質問回答
   - テストと問題報告
   - コミュニティイベントの開催
   - 新規貢献者のメンタリング

### 貢献プロセス：コアプロトコル

コアMCPプロトコルや公式実装に貢献するには、[公式貢献ガイドライン](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md)にある以下の原則に従います：

1. <strong>シンプルさとミニマリズム</strong>：MCP仕様は新しい概念の追加に高いハードルを設けています。仕様から要素を削除するよりも追加する方が簡単です。

2. <strong>具体的なアプローチ</strong>：仕様変更は、推測に基づくアイデアではなく、具体的な実装課題に基づいて行うべきです。

3. <strong>提案の段階</strong>：
   - 定義：問題領域を探り、他のMCPユーザーも類似の問題に直面していることを検証
   - プロトタイプ：例となる解決策を構築し、実用例を示す
   - 書面化：プロトタイプに基づいて仕様提案を書き起こす

### 開発環境のセットアップ

```bash
# リポジトリをフォークする
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# 依存関係をインストールする
npm install

# スキーマの変更の場合、検証して schema.json を生成する：
npm run check:schema:ts
npm run generate:schema

# ドキュメントの変更の場合
npm run check:docs
npm run format

# ドキュメントをローカルでプレビュー（任意）：
npm run serve:docs
```

### 例：バグ修正への貢献

```javascript
// typescript-sdkのバグを含む元のコード
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // バグ: プロパティ検証の欠落
  // 現在の実装:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// コントリビューションで修正された実装
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // 検証の改善
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### 例：標準ライブラリへの新しいツールの貢献

```python
# 例としての貢献：MCP標準ライブラリ向けのCSVデータ処理ツール

from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
import pandas as pd
import io
import json
from typing import Dict, Any, List, Optional

class CsvProcessingTool(Tool):
    """
    Tool for processing and analyzing CSV data.
    
    This tool allows models to extract information from CSV files,
    run basic analysis, and convert data between formats.
    """
    
    def get_name(self):
        return "csvProcessor"
        
    def get_description(self):
        return "Processes and analyzes CSV data"
    
    def get_schema(self):
        return {
            "type": "object",
            "properties": {
                "csvData": {
                    "type": "string", 
                    "description": "CSV data as a string"
                },
                "csvUrl": {
                    "type": "string",
                    "description": "URL to a CSV file (alternative to csvData)"
                },
                "operation": {
                    "type": "string",
                    "enum": ["summary", "filter", "transform", "convert"],
                    "description": "Operation to perform on the CSV data"
                },
                "filterColumn": {
                    "type": "string",
                    "description": "Column to filter by (for filter operation)"
                },
                "filterValue": {
                    "type": "string",
                    "description": "Value to filter for (for filter operation)"
                },
                "outputFormat": {
                    "type": "string",
                    "enum": ["json", "csv", "markdown"],
                    "default": "json",
                    "description": "Output format for the processed data"
                }
            },
            "oneOf": [
                {"required": ["csvData", "operation"]},
                {"required": ["csvUrl", "operation"]}
            ]
        }
    
    async def execute_async(self, request: ToolRequest) -> ToolResponse:
        try:
            # パラメータを抽出する
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # 直接データまたはURLからCSVデータを取得する
            df = await self._get_dataframe(request)
            
            # 要求された操作に基づいて処理する
            result = {}
            
            if operation == "summary":
                result = self._generate_summary(df)
            elif operation == "filter":
                column = request.parameters.get("filterColumn")
                value = request.parameters.get("filterValue")
                if not column:
                    raise ToolExecutionException("filterColumn is required for filter operation")
                result = self._filter_data(df, column, value)
            elif operation == "transform":
                result = self._transform_data(df, request.parameters)
            elif operation == "convert":
                result = self._convert_format(df, output_format)
            else:
                raise ToolExecutionException(f"Unknown operation: {operation}")
            
            return ToolResponse(result=result)
        
        except Exception as e:
            raise ToolExecutionException(f"CSV processing failed: {str(e)}")
    
    async def _get_dataframe(self, request: ToolRequest) -> pd.DataFrame:
        """Gets a pandas DataFrame from either CSV data or URL"""
        if "csvData" in request.parameters:
            csv_data = request.parameters.get("csvData")
            return pd.read_csv(io.StringIO(csv_data))
        elif "csvUrl" in request.parameters:
            csv_url = request.parameters.get("csvUrl")
            return pd.read_csv(csv_url)
        else:
            raise ToolExecutionException("Either csvData or csvUrl must be provided")
    
    def _generate_summary(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Generates a summary of the CSV data"""
        return {
            "columns": df.columns.tolist(),
            "rowCount": len(df),
            "columnCount": len(df.columns),
            "numericColumns": df.select_dtypes(include=['number']).columns.tolist(),
            "categoricalColumns": df.select_dtypes(include=['object']).columns.tolist(),
            "sampleRows": json.loads(df.head(5).to_json(orient="records")),
            "statistics": json.loads(df.describe().to_json())
        }
    
    def _filter_data(self, df: pd.DataFrame, column: str, value: str) -> Dict[str, Any]:
        """Filters the DataFrame by a column value"""
        if column not in df.columns:
            raise ToolExecutionException(f"Column '{column}' not found")
            
        filtered_df = df[df[column].astype(str).str.contains(value)]
        
        return {
            "originalRowCount": len(df),
            "filteredRowCount": len(filtered_df),
            "data": json.loads(filtered_df.to_json(orient="records"))
        }
    
    def _transform_data(self, df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
        """Transforms the data based on parameters"""
        # 実装には様々な変換が含まれる予定です
        return {
            "status": "success",
            "message": "Transformation applied"
        }
    
    def _convert_format(self, df: pd.DataFrame, format: str) -> Dict[str, Any]:
        """Converts the DataFrame to different formats"""
        if format == "json":
            return {
                "data": json.loads(df.to_json(orient="records")),
                "format": "json"
            }
        elif format == "csv":
            return {
                "data": df.to_csv(index=False),
                "format": "csv"
            }
        elif format == "markdown":
            return {
                "data": df.to_markdown(),
                "format": "markdown"
            }
        else:
            raise ToolExecutionException(f"Unsupported output format: {format}")
```

### 貢献のガイドライン

MCPプロジェクトへ成功裏に貢献するために：

1. <strong>小さく始める</strong>：ドキュメント、バグ修正、小さな改善から始める
2. <strong>スタイルガイドに従う</strong>：プロジェクトのコーディングスタイルや規約を守る
3. <strong>テストを書く</strong>：コード貢献にはユニットテストを含める
4. <strong>作業のドキュメント化</strong>：新機能や変更点を明確に記述する
5. <strong>対象を絞ったプルリクエストを送る</strong>：プルリクは単一の課題や機能に集中させる
6. <strong>フィードバックに対応する</strong>：貢献に対するフィードバックに積極的に対応する

### 貢献ワークフローの例

```bash
# リポジトリをクローンする
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# 貢献のために新しいブランチを作成する
git checkout -b feature/my-contribution

# 変更を加える
# ...

# 変更が既存の機能を壊していないかテストを実行する
npm test

# 説明的なメッセージとともに変更をコミットする
git commit -am "Fix validation in resource handler"

# ブランチをフォークにプッシュする
git push origin feature/my-contribution

# ブランチからメインリポジトリへのプルリクエストを作成する
# その後、フィードバックに応じてプルリクエストを改善する
```

## MCPサーバーの作成と共有

MCPエコシステムに貢献する最も価値ある方法の一つは、カスタムMCPサーバーを作成し共有することです。コミュニティはすでに多様なサービスやユースケース向けに数百のサーバーを開発しています。

### MCPサーバー開発フレームワーク

MCPサーバー開発を簡素化するいくつかのフレームワークがあります：

1. **公式SDK**（[MCP仕様2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)に準拠）：
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. <strong>コミュニティフレームワーク</strong>：
   - [MCP-Framework](https://mcp-framework.com/) - TypeScriptでエレガントかつ迅速にMCPサーバーを構築
   - [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - Javaでアノテーション駆動のMCPサーバー
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) - JavaフレームワークによるMCPサーバー開発
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) - MCPサーバー用のスターターNext.jsプロジェクト

### 共有可能なツールの開発

#### .NET例：共有可能なツールパッケージの作成

```csharp
// Create a new .NET library project
// dotnet new classlib -n McpFinanceTools

using Microsoft.Mcp.Tools;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;

namespace McpFinanceTools
{
    // Stock quote tool
    public class StockQuoteTool : IMcpTool
    {
        private readonly HttpClient _httpClient;
        
        public StockQuoteTool(HttpClient httpClient = null)
        {
            _httpClient = httpClient ?? new HttpClient();
        }
        
        public string Name => "stockQuote";
        public string Description => "Gets current stock quotes for specified symbols";
        
        public object GetSchema()
        {
            return new {
                type = "object",
                properties = new {
                    symbol = new { 
                        type = "string",
                        description = "Stock symbol (e.g., MSFT, AAPL)" 
                    },
                    includeHistory = new { 
                        type = "boolean",
                        description = "Whether to include historical data",
                        default = false
                    }
                },
                required = new[] { "symbol" }
            };
        }
        
        public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
        {
            // Extract parameters
            string symbol = request.Parameters.GetProperty("symbol").GetString();
            bool includeHistory = false;
            
            if (request.Parameters.TryGetProperty("includeHistory", out var historyProp))
            {
                includeHistory = historyProp.GetBoolean();
            }
            
            // Call external API (example)
            var quoteResult = await GetStockQuoteAsync(symbol);
            
            // Add historical data if requested
            if (includeHistory)
            {
                var historyData = await GetStockHistoryAsync(symbol);
                quoteResult.Add("history", historyData);
            }
            
            // Return formatted result
            return new ToolResponse {
                Result = JsonSerializer.SerializeToElement(quoteResult)
            };
        }
        
        private async Task<Dictionary<string, object>> GetStockQuoteAsync(string symbol)
        {
            // Implementation would call a real stock API
            // This is a simplified example
            return new Dictionary<string, object>
            {
                ["symbol"] = symbol,
                ["price"] = 123.45,
                ["change"] = 2.5,
                ["percentChange"] = 1.2,
                ["lastUpdated"] = DateTime.UtcNow
            };
        }
        
        private async Task<object> GetStockHistoryAsync(string symbol)
        {
            // Implementation would get historical data
            // Simplified example
            return new[]
            {
                new { date = DateTime.Now.AddDays(-7).Date, price = 120.25 },
                new { date = DateTime.Now.AddDays(-6).Date, price = 122.50 },
                new { date = DateTime.Now.AddDays(-5).Date, price = 121.75 }
                // More historical data...
            };
        }
    }
}

// Create package and publish to NuGet
// dotnet pack -c Release
// dotnet nuget push bin/Release/McpFinanceTools.1.0.0.nupkg -s https://api.nuget.org/v3/index.json -k YOUR_API_KEY
```

#### Java例：ツール用Mavenパッケージの作成

```java
// 共有可能なMCPツールパッケージのためのpom.xml設定
<!-- 
<project>
    <groupId>com.example</groupId>
    <artifactId>mcp-weather-tools</artifactId>
    <version>1.0.0</version>
    
    <dependencies>
        <dependency>
            <groupId>com.mcp</groupId>
            <artifactId>mcp-server</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>
    
    <distributionManagement>
        <repository>
            <id>github</id>
            <name>GitHub Packages</name>
            <url>https://maven.pkg.github.com/username/mcp-weather-tools</url>
        </repository>
    </distributionManagement>
</project>
-->

package com.example.mcp.weather;

import com.mcp.tools.Tool;
import com.mcp.tools.ToolRequest;
import com.mcp.tools.ToolResponse;
import com.mcp.tools.ToolExecutionException;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

public class WeatherForecastTool implements Tool {
    private final HttpClient httpClient;
    private final String apiKey;
    
    public WeatherForecastTool(String apiKey) {
        this.httpClient = HttpClient.newHttpClient();
        this.apiKey = apiKey;
    }
    
    @Override
    public String getName() {
        return "weatherForecast";
    }
    
    @Override
    public String getDescription() {
        return "Gets weather forecast for a specified location";
    }
    
    @Override
    public Object getSchema() {
        Map<String, Object> schema = new HashMap<>();
        // スキーマ定義...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // 天気APIを呼び出す
            Map<String, Object> forecast = getForecast(location, days);
            
            // レスポンスを構築する
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // 実装は天気APIを呼び出します
        // 簡略化された例
        Map<String, Object> result = new HashMap<>();
        // 予報データを追加...
        return result;
    }
}

// Mavenを使ってビルドおよび公開する
// mvn clean package
// mvn deploy
```

#### Python例：PyPIパッケージの公開

```python
# PyPIパッケージのディレクトリ構造:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# setup.pyの例
"""
from setuptools import setup, find_packages

setup(
    name="mcp_nlp_tools",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "mcp_server>=1.0.0",
        "transformers>=4.0.0",
        "torch>=1.8.0"
    ],
    author="Your Name",
    author_email="your.email@example.com",
    description="MCP tools for natural language processing tasks",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/username/mcp_nlp_tools",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
)
"""

# NLPツールの例の実装（sentiment_tool.py）
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # 感情分析モデルを読み込む
        self.sentiment_analyzer = pipeline("sentiment-analysis", model=model_name)
    
    def get_name(self):
        return "sentimentAnalysis"
        
    def get_description(self):
        return "Analyzes the sentiment of text, classifying it as positive or negative"
    
    def get_schema(self):
        return {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string", 
                    "description": "The text to analyze for sentiment"
                },
                "includeScore": {
                    "type": "boolean",
                    "description": "Whether to include confidence scores",
                    "default": True
                }
            },
            "required": ["text"]
        }
    
    async def execute_async(self, request: ToolRequest) -> ToolResponse:
        try:
            # パラメーターを抽出する
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # 感情を分析する
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # 結果をフォーマットする
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # 結果を返す
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# 公開するには:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### ベストプラクティスの共有

MCPツールをコミュニティと共有するときは：

1. <strong>完全なドキュメント</strong>：
   - 目的、使い方、例を文書化する
   - パラメーターや戻り値を説明する
   - 外部依存関係を記載する

2. <strong>エラーハンドリング</strong>：
   - 堅牢なエラーハンドリングを実装する
   - 役立つエラーメッセージを提供する
   - エッジケースを適切に処理する

3. <strong>パフォーマンスの考慮</strong>：
   - 速度とリソース使用の両面で最適化する
   - 適切にキャッシュを実装する
   - スケーラビリティを考慮する

4. <strong>セキュリティ</strong>：
   - 安全なAPIキーや認証を使用する
   - 入力の検証とサニタイズを行う
   - 外部API呼び出しのレートリミティングを実装する

5. <strong>テスト</strong>：
   - 包括的なテストカバレッジを含める
   - 異なる入力タイプやエッジケースでテストする
   - テスト手順をドキュメント化する

## コミュニティ協力とベストプラクティス

効果的な協力は繁栄するMCPエコシステムの鍵です。

### コミュニケーションチャネル

- GitHubのIssueとディスカッション
- Microsoft Tech Community
- DiscordとSlackチャネル
- Stack Overflow（タグ：`model-context-protocol` または `mcp`）

### コードレビュー

MCPの貢献をレビューするときは：

1. <strong>明確さ</strong>：コードは明確かつ十分に文書化されているか？
2. <strong>正確さ</strong>：期待通りに動作するか？
3. <strong>一貫性</strong>：プロジェクトの規約に沿っているか？
4. <strong>完全性</strong>：テストやドキュメントは含まれているか？
5. <strong>セキュリティ</strong>：セキュリティ上の懸念はないか？

### バージョン互換性

MCPの開発においては：

1. <strong>プロトコルのバージョニング</strong>：ツールがサポートするMCPプロトコルのバージョンに従う
2. <strong>クライアント互換性</strong>：後方互換性を考慮する
3. <strong>サーバー互換性</strong>：サーバー実装ガイドラインに従う
4. <strong>破壊的変更</strong>：破壊的変更があれば明確にドキュメント化する

## コミュニティプロジェクトの例：MCPツールレジストリ

重要なコミュニティ貢献の一つとして、MCPツールの公開レジストリの開発があります。

```python
# コミュニティツール登録APIの例のスキーマ

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# ツール登録のモデル
class ToolSchema(BaseModel):
    """JSON Schema for a tool"""
    type: str
    properties: dict
    required: List[str] = []

class ToolRegistration(BaseModel):
    """Information for registering a tool"""
    name: str = Field(..., description="Unique name for the tool")
    description: str = Field(..., description="Description of what the tool does")
    version: str = Field(..., description="Semantic version of the tool")
    schema: ToolSchema = Field(..., description="JSON Schema for tool parameters")
    author: str = Field(..., description="Author of the tool")
    repository: Optional[HttpUrl] = Field(None, description="Repository URL")
    documentation: Optional[HttpUrl] = Field(None, description="Documentation URL")
    package: Optional[HttpUrl] = Field(None, description="Package URL")
    tags: List[str] = Field(default_factory=list, description="Tags for categorization")
    examples: List[dict] = Field(default_factory=list, description="Example usage")

class Tool(ToolRegistration):
    """Tool with registry metadata"""
    id: uuid.UUID = Field(default_factory=uuid.uuid4)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
    updated_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
    downloads: int = Field(default=0)
    rating: float = Field(default=0.0)
    ratings_count: int = Field(default=0)

# 登録用のFastAPIアプリケーション
app = FastAPI(title="MCP Tool Registry")

# この例のためのインメモリデータベース
tools_db = {}

@app.post("/tools", response_model=Tool)
async def register_tool(tool: ToolRegistration):
    """Register a new tool in the registry"""
    if tool.name in tools_db:
        raise HTTPException(status_code=400, detail=f"Tool '{tool.name}' already exists")
    
    new_tool = Tool(**tool.dict())
    tools_db[tool.name] = new_tool
    return new_tool

@app.get("/tools", response_model=List[Tool])
async def list_tools(tag: Optional[str] = None):
    """List all registered tools, optionally filtered by tag"""
    if tag:
        return [tool for tool in tools_db.values() if tag in tool.tags]
    return list(tools_db.values())

@app.get("/tools/{tool_name}", response_model=Tool)
async def get_tool(tool_name: str):
    """Get information about a specific tool"""
    if tool_name not in tools_db:
        raise HTTPException(status_code=404, detail=f"Tool '{tool_name}' not found")
    return tools_db[tool_name]

@app.delete("/tools/{tool_name}")
async def delete_tool(tool_name: str):
    """Delete a tool from the registry"""
    if tool_name not in tools_db:
        raise HTTPException(status_code=404, detail=f"Tool '{tool_name}' not found")
    del tools_db[tool_name]
    return {"message": f"Tool '{tool_name}' deleted"}
```

## 重要なポイント

- MCPコミュニティは多様で、様々な種類の貢献を歓迎しています
- MCPへの貢献はコアプロトコルの改善からカスタムツールまで多岐にわたります
- 貢献ガイドラインに従うことでPRの採用率が向上します
- MCPツールの作成と共有はエコシステムを強化する価値ある方法です
- コミュニティ協力はMCPの成長と改善に不可欠です

## 演習

1. 自分のスキルや興味に基づき、MCPエコシステムで貢献できそうな領域を特定する
2. MCPリポジトリをフォークし、ローカルの開発環境を設定する
3. コミュニティに役立つ小さな改善、バグ修正、またはツールを作成する
4. 適切なテストとドキュメントを添えて貢献内容を記録する
5. 対応するリポジトリにプルリクエストを提出する

## 追加リソース

- [MCPコミュニティプロジェクト](https://github.com/topics/model-context-protocol)

---

## 次のステップ

次へ: [初期導入からの教訓](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->