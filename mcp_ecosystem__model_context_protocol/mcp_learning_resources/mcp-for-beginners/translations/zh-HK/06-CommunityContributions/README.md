# 社群與貢獻

[![如何貢獻 MCP：工具、文件、程式碼及更多](../../../translated_images/zh-HK/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(點擊上方圖片觀看本課程影片)_

## 概覽

本課程重點在於如何參與 MCP 社群、貢獻 MCP 生態系統，以及遵循協作開發的最佳實踐。了解如何參與開源 MCP 專案，對於希望塑造此技術未來的人來說至關重要。

## 學習目標

課程結束後，你將能夠：

- 了解 MCP 社群與生態系統的結構
- 有效參與 MCP 社群論壇與討論
- 貢獻 MCP 開源代碼庫
- 建立並分享自訂 MCP 工具與伺服器
- 遵循 MCP 開發與協作的最佳實踐
- 探索 MCP 開發的社群資源與框架

## MCP 社群生態系統

MCP 生態系統包含多個組成部分與參與者，共同推動協議的進展。

### 主要社群組成

1. **核心協議維護者**：官方的 [Model Context Protocol GitHub 組織](https://github.com/modelcontextprotocol) 維護核心 MCP 規範與參考實作
2. **工具開發者**：個人或團隊建立 MCP 工具與伺服器
3. **整合提供者**：將 MCP 整合到其產品與服務中的公司
4. **終端使用者**：在應用程式中使用 MCP 的開發者與組織
5. **貢獻者**：貢獻程式碼、文件或其他資源的社群成員

### 社群資源

#### 官方管道

- [MCP GitHub 組織](https://github.com/modelcontextprotocol)
- [MCP 文件](https://modelcontextprotocol.io/)
- [MCP 規範](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 討論](https://github.com/orgs/modelcontextprotocol/discussions)
- [MCP 範例與伺服器代碼庫](https://github.com/modelcontextprotocol/servers)

#### 社群驅動資源

- [MCP 客戶端](https://modelcontextprotocol.io/clients) - 支援 MCP 整合的客戶端列表
- [社群 MCP 伺服器](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - 持續成長的社群開發 MCP 伺服器清單
- [Awesome MCP 伺服器](https://github.com/wong2/awesome-mcp-servers) - 精選 MCP 伺服器列表
- [PulseMCP](https://www.pulsemcp.com/) - 社群中心與電子報，供發掘 MCP 資源
- [Discord 伺服器](https://discord.gg/jHEGxQu2a5) - 與 MCP 開發者連結
- 特定語言的 SDK 實作
- 部落格文章與教學

## 貢獻 MCP

### 貢獻類型

MCP 生態系統歡迎多種貢獻類型：

1. **程式碼貢獻**：
   - 核心協議改進
   - 錯誤修正
   - 工具與伺服器實作
   - 不同語言的客戶端／伺服器函式庫

2. **文件**：
   - 改善現有文件
   - 撰寫教學與指引
   - 文件翻譯
   - 撰寫範例與範本應用程式

3. **社群支援**：
   - 回答論壇與討論中的問題
   - 測試與回報問題
   - 組織社群活動
   - 指導新貢獻者

### 核心協議的貢獻流程

欲對核心 MCP 協議或官方實作貢獻，請遵循[官方貢獻指南](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md)中的原則：

1. **簡潔與極簡主義**：MCP 規範對新增概念標準維持高門檻。新增比刪除容易。

2. **具體方法**：規範變更需基於具體實作問題，不是推測性想法。

3. **提案階段**：
   - 定義：探討問題範疇，確認其他 MCP 用戶也面臨相同問題
   - 原型：建立範例解決方案，展示其實際應用
   - 撰寫：根據原型撰寫規範提案

### 開發環境設定

```bash
# 分叉儲存庫
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# 安裝依賴項
npm install

# 對於架構變更，驗證並生成 schema.json：
npm run check:schema:ts
npm run generate:schema

# 對於文件變更
npm run check:docs
npm run format

# 本地預覽文件（可選）：
npm run serve:docs
```

### 範例：貢獻錯誤修正

```javascript
// 原始代碼中 typescript-sdk 的錯誤
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // 錯誤：缺少屬性驗證
  // 目前實現：
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// 貢獻中的修正實現
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // 改進的驗證
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### 範例：向標準函式庫貢獻新工具

```python
# 示例貢獻：MCP標準庫的CSV數據處理工具

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
            # 提取參數
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # 從直接資料或URL中獲取CSV數據
            df = await self._get_dataframe(request)
            
            # 根據請求的操作進行處理
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
        # 實作將包含各種轉換
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

### 貢獻指南

成功貢獻 MCP 專案的建議：

1. **從小處開始**：可先從文件、錯誤修正或小改進著手
2. **遵循風格指南**：遵守專案的程式碼風格與慣例
3. **撰寫測試**：為程式碼貢獻包含單元測試
4. **文件描述**：清楚紀錄新功能或變更
5. **提交精確的 PR**：讓拉取請求聚焦單一議題或功能
6. **回應回饋**：積極回應貢獻的反饋意見

### 範例貢獻工作流程

```bash
# 複製該倉庫
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# 為你的貢獻建立一個新分支
git checkout -b feature/my-contribution

# 進行你的修改
# ...

# 運行測試以確保你的修改不會破壞現有功能
npm test

# 以具描述性的訊息提交你的修改
git commit -am "Fix validation in resource handler"

# 將你的分支推送到你的分叉倉庫
git push origin feature/my-contribution

# 從你的分支向主倉庫創建合併請求
# 接著回應反饋並根據需要反覆修改你的合併請求
```

## 創建與分享 MCP 伺服器

貢獻 MCP 生態系統最有價值的方式之一是創建並分享自訂 MCP 伺服器。社群已開發數百個伺服器，涵蓋多種服務及使用案例。

### MCP 伺服器開發框架

可簡化 MCP 伺服器開發的幾個框架：

1. **官方 SDK**（符合 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)）：
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **社群框架**：
   - [MCP-Framework](https://mcp-framework.com/) - 使用 TypeScript 以優雅且迅速構建 MCP 伺服器
   - [MCP 宣告式 Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - 基於註解的 Java MCP 伺服器
   - [Quarkus MCP 伺服器 SDK](https://github.com/quarkiverse/quarkus-mcp-server) - Java MCP 伺服器框架
   - [Next.js MCP 伺服器範本](https://github.com/vercel-labs/mcp-for-next.js) - MCP 伺服器的啟動 Next.js 專案

### 開發可分享工具

#### .NET 範例：建立可分享的工具套件

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

#### Java 範例：建立工具的 Maven 套件

```java
// pom.xml 配置用於可分享的 MCP 工具包
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
        // 架構定義…
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // 調用天氣 API
            Map<String, Object> forecast = getForecast(location, days);
            
            // 建立回應
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // 實現會調用天氣 API
        // 簡化範例
        Map<String, Object> result = new HashMap<>();
        // 添加預報資料…
        return result;
    }
}

// 使用 Maven 建置和發佈
// mvn clean package
// mvn deploy
```

#### Python 範例：發佈 PyPI 套件

```python
# PyPI 套件的目錄結構：
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# setup.py 範例
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

# NLP 工具實作範例 (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # 載入情感分析模型
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
            # 抽取參數
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # 分析情感
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # 格式化結果
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # 回傳結果
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# 發佈流程：
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### 分享最佳實踐

在與社群分享 MCP 工具時：

1. **完整文件**：
   - 記錄用途、使用方法與範例
   - 說明參數與回傳值
   - 說明所有外部依賴

2. **錯誤處理**：
   - 實作健全的錯誤處理
   - 提供有用的錯誤訊息
   - 妥善處理邊緣狀況

3. **效能考量**：
   - 優化速度與資源使用
   - 適當實作快取
   - 思考擴展性

4. **安全**：
   - 使用安全的 API 金鑰與驗證
   - 驗證並淨化輸入
   - 對外部 API 呼叫實施速率限制

5. **測試**：
   - 包含完整測試覆蓋
   - 測試不同輸入類型與邊緣案例
   - 文件化測試程序

## 社群協作與最佳實踐

有效協作是繁榮 MCP 生態系統的關鍵。

### 溝通管道

- GitHub Issues 與 Discussions
- Microsoft 技術社群
- Discord 與 Slack 頻道
- Stack Overflow（標籤：`model-context-protocol` 或 `mcp`）

### 程式碼審查

審查 MCP 貢獻時：

1. **清晰度**：程式碼是否清楚且有良好文件？
2. **正確性**：程式是否按預期運作？
3. **一致性**：符合專案慣例嗎？
4. **完整性**：包含測試與文件了嗎？
5. **安全性**：存在安全顧慮嗎？

### 版本相容性

開發 MCP 工具時：

1. **協議版本控制**：遵守工具支援的 MCP 協議版本
2. **客戶端相容性**：考慮向下相容性
3. **伺服器相容性**：遵循伺服器實作指引
4. **重大變更**：明確記錄任何重大變更

## 社群範例專案：MCP 工具登錄

一個重要的社群貢獻是開發 MCP 工具的公共登錄庫。

```python
# 社區工具登記 API 的示例架構

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# 工具登記的模型
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

# 登記用的 FastAPI 應用程式
app = FastAPI(title="MCP Tool Registry")

# 這個示例的記憶體資料庫
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

## 主要重點

- MCP 社群多元，歡迎多種貢獻
- 貢獻內容涵蓋核心協議改進至自訂工具
- 遵循貢獻指南可提升 PR 通過機會
- 創建與分享 MCP 工具是提升生態系統的寶貴途徑
- 社群協作對 MCP 的成長與改進至關重要

## 練習

1. 根據你的技能與興趣，找出 MCP 生態系統中可貢獻的領域
2. 分叉 MCP 代碼庫並建立本地開發環境
3. 創建可造福社群的小改進、錯誤修正或工具
4. 用適當測試與文件記錄你的貢獻
5. 向相關代碼庫提交拉取請求

## 額外資源

- [MCP 社群專案](https://github.com/topics/model-context-protocol)

---

## 接下來

下一課：[早期採用的教訓](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件乃使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。雖然我們致力於準確性，請注意自動翻譯可能包含錯誤或不準確之處。原始文件的原文版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用此翻譯而引起的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->