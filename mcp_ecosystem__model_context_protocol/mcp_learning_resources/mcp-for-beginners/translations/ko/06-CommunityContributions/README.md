# 커뮤니티 및 기여

[![MCP 기여 방법: 도구, 문서, 코드 등](../../../translated_images/ko/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(위 이미지를 클릭하면 이 강의의 영상을 볼 수 있습니다)_

## 개요

이 강의는 MCP 커뮤니티와 교류하는 방법, MCP 생태계에 기여하는 방법, 협업 개발을 위한 모범 사례를 따르는 방법에 중점을 둡니다. 오픈 소스 MCP 프로젝트에 참여하는 방법을 이해하는 것은 이 기술의 미래를 형성하려는 사람들에게 필수적입니다.

## 학습 목표

이 강의를 마치면 다음을 할 수 있습니다:

- MCP 커뮤니티와 생태계 구조 이해하기
- MCP 커뮤니티 포럼과 토론에 효과적으로 참여하기
- MCP 오픈 소스 저장소에 기여하기
- 맞춤형 MCP 도구 및 서버 생성 및 공유하기
- MCP 개발 및 협업을 위한 모범 사례 따르기
- MCP 개발을 위한 커뮤니티 자원과 프레임워크 발견하기

## MCP 커뮤니티 생태계

MCP 생태계는 프로토콜을 발전시키기 위해 함께 작업하는 다양한 구성 요소와 참여자로 구성되어 있습니다.

### 주요 커뮤니티 구성 요소

1. **핵심 프로토콜 유지 관리자**: 공식 [Model Context Protocol GitHub 조직](https://github.com/modelcontextprotocol)이 핵심 MCP 사양과 참조 구현을 유지합니다
2. **도구 개발자**: MCP 도구와 서버를 만드는 개인 및 팀
3. **통합 제공자**: MCP를 자사 제품 및 서비스에 통합하는 회사
4. **최종 사용자**: MCP를 애플리케이션에 사용하는 개발자 및 조직
5. <strong>기여자</strong>: 코드, 문서 또는 기타 자원을 기여하는 커뮤니티 구성원

### 커뮤니티 자원

#### 공식 채널

- [MCP GitHub 조직](https://github.com/modelcontextprotocol)
- [MCP 문서](https://modelcontextprotocol.io/)
- [MCP 사양](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 토론](https://github.com/orgs/modelcontextprotocol/discussions)
- [MCP 예제 및 서버 저장소](https://github.com/modelcontextprotocol/servers)

#### 커뮤니티 주도 자원

- [MCP 클라이언트](https://modelcontextprotocol.io/clients) - MCP 통합을 지원하는 클라이언트 목록
- [커뮤니티 MCP 서버](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - 커뮤니티가 개발한 MCP 서버 목록
- [Awesome MCP 서버](https://github.com/wong2/awesome-mcp-servers) - 엄선된 MCP 서버 목록
- [PulseMCP](https://www.pulsemcp.com/) - MCP 자원 발견을 위한 커뮤니티 허브 및 뉴스레터
- [Remote OpenClaw](https://www.remoteopenclaw.com/) - MCP 서버, 에이전트 스킬, 플러그인의 무료 검색 가능 디렉터리
- [Discord 서버](https://discord.gg/jHEGxQu2a5) - MCP 개발자들과 연결
- 언어별 SDK 구현
- 블로그 게시글과 튜토리얼

## MCP에 기여하기

### 기여 유형

MCP 생태계는 다양한 유형의 기여를 환영합니다:

1. **코드 기여**:
   - 핵심 프로토콜 향상
   - 버그 수정
   - 도구 및 서버 구현
   - 다양한 언어의 클라이언트/서버 라이브러리

2. <strong>문서화</strong>:
   - 기존 문서 개선
   - 튜토리얼 및 가이드 작성
   - 문서 번역
   - 예제 및 샘플 애플리케이션 작성

3. **커뮤니티 지원**:
   - 포럼 및 토론에서 질문 답변
   - 테스트 및 문제 보고
   - 커뮤니티 이벤트 조직
   - 신규 기여자 멘토링

### 기여 프로세스: 핵심 프로토콜

핵심 MCP 프로토콜이나 공식 구현에 기여하려면 [공식 기여 가이드라인](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md)에 제시된 원칙을 따르십시오:

1. **단순성과 미니멀리즘**: MCP 사양은 새 개념 추가에 엄격합니다. 규격에 뭔가를 추가하는 것은 제거하는 것보다 쉽습니다.

2. **구체적 접근법**: 사양 변경은 추측이 아닌 특정 구현 도전 과제에 근거해야 합니다.

3. **제안 단계**:
   - 정의: 문제 영역 탐색, 다른 MCP 사용자도 유사한 문제를 갖는지 확인
   - 프로토타입: 예제 솔루션 구축 및 실제 적용 시연
   - 작성: 프로토타입을 바탕으로 사양 제안서 작성

### 개발 환경 설정

```bash
# 저장소를 포크하세요
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# 의존성을 설치하세요
npm install

# 스키마 변경 시, schema.json을 검증하고 생성하세요:
npm run check:schema:ts
npm run generate:schema

# 문서 변경을 위한
npm run check:docs
npm run format

# 문서를 로컬에서 미리 보기(선택 사항):
npm run serve:docs
```

### 예제: 버그 수정 기여

```javascript
// 타입스크립트 SDK에서 버그가 있는 원본 코드
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // 버그: 속성 검증 누락
  // 현재 구현:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// 기여에서 수정된 구현
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // 개선된 검증
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### 예제: 표준 라이브러리에 새 도구 기여

```python
# 예시 기여: MCP 표준 라이브러리를 위한 CSV 데이터 처리 도구

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
            # 매개변수 추출
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # 직접 데이터 또는 URL에서 CSV 데이터 가져오기
            df = await self._get_dataframe(request)
            
            # 요청된 작업에 따라 처리
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
        # 구현에는 다양한 변환이 포함될 것임
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

### 기여 지침

MCP 프로젝트에 성공적으로 기여하려면:

1. **작게 시작하기**: 문서, 버그 수정, 작은 개선으로 시작하세요
2. **스타일 가이드 따르기**: 프로젝트 코딩 스타일과 규칙 준수
3. **테스트 작성**: 코드 기여에 단위 테스트 포함
4. **작업 문서화**: 새 기능이나 변경 사항을 명확히 문서화
5. **명확한 PR 제출**: 하나의 이슈나 기능에 집중된 풀 리퀘스트 제출
6. **피드백에 대응**: 기여에 대한 피드백에 적극적으로 응답

### 예제 기여 워크플로우

```bash
# 저장소를 클론하세요
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# 기여를 위한 새 브랜치를 만드세요
git checkout -b feature/my-contribution

# 변경사항을 만드세요
# ...

# 변경사항이 기존 기능을 깨뜨리지 않는지 확인하기 위해 테스트를 실행하세요
npm test

# 설명이 포함된 메시지와 함께 변경사항을 커밋하세요
git commit -am "Fix validation in resource handler"

# 브랜치를 포크에 푸시하세요
git push origin feature/my-contribution

# 메인 저장소로부터 브랜치에 대한 풀 리퀘스트를 만드세요
# 그런 다음 피드백에 참여하고 필요에 따라 PR을 반복하세요
```

## MCP 서버 생성 및 공유

MCP 생태계에 기여하는 가장 가치 있는 방법 중 하나는 맞춤형 MCP 서버를 생성하고 공유하는 것입니다. 커뮤니티는 이미 다양한 서비스와 사용 사례를 위한 수백 개의 서버를 개발했습니다.

### MCP 서버 개발 프레임워크

MCP 서버 개발을 단순화하기 위한 여러 프레임워크가 있습니다:

1. **공식 SDK** ([MCP 사양 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)에 부합):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **커뮤니티 프레임워크**:
   - [MCP-Framework](https://mcp-framework.com/) - TypeScript로 우아하고 빠르게 MCP 서버 구축
   - [MCP 선언적 Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - Java로 주석 기반 MCP 서버
   - [Quarkus MCP 서버 SDK](https://github.com/quarkiverse/quarkus-mcp-server) - MCP 서버용 Java 프레임워크
   - [Next.js MCP 서버 템플릿](https://github.com/vercel-labs/mcp-for-next.js) - MCP 서버용 Next.js 시작 프로젝트

### 공유 가능한 도구 개발

#### .NET 예제: 공유 가능한 도구 패키지 생성

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

#### Java 예제: 도구용 Maven 패키지 생성

```java
// 공유 가능한 MCP 도구 패키지용 pom.xml 구성
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
        // 스키마 정의...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // 날씨 API 호출
            Map<String, Object> forecast = getForecast(location, days);
            
            // 응답 생성
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // 구현은 날씨 API를 호출합니다
        // 단순화된 예제
        Map<String, Object> result = new HashMap<>();
        // 예보 데이터 추가...
        return result;
    }
}

// Maven을 사용하여 빌드 및 배포
// mvn clean package
// mvn deploy
```

#### Python 예제: PyPI 패키지 배포

```python
# PyPI 패키지용 디렉토리 구조:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# setup.py 예시
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

# NLP 도구 구현 예시 (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # 감정 분석 모델 로드
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
            # 매개변수 추출
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # 감정 분석
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # 결과 형식 지정
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # 결과 반환
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# 배포 방법:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### 모범 사례 공유

MCP 도구를 커뮤니티와 공유할 때:

1. **완전한 문서화**:
   - 목적, 사용법, 예제 문서화
   - 매개변수와 반환 값 설명
   - 외부 종속성 문서화

2. **오류 처리**:
   - 견고한 오류 처리 구현
   - 유용한 오류 메시지 제공
   - 모서리 케이스를 부드럽게 처리

3. **성능 고려**:
   - 속도와 자원 사용 모두 최적화
   - 적절할 때 캐싱 구현
   - 확장성 고려

4. <strong>보안</strong>:
   - 안전한 API 키와 인증 사용
   - 입력 값 검증 및 정화
   - 외부 API 호출에 속도 제한 구현

5. <strong>테스트</strong>:
   - 포괄적인 테스트 범위 포함
   - 다양한 입력 유형과 모서리 케이스 테스트
   - 테스트 절차 문서화

## 커뮤니티 협업 및 모범 사례

효과적인 협업은 번성하는 MCP 생태계의 핵심입니다.

### 소통 채널

- GitHub 이슈 및 토론
- Microsoft 기술 커뮤니티
- Discord 및 Slack 채널
- Stack Overflow (태그: `model-context-protocol` 또는 `mcp`)

### 코드 리뷰

MCP 기여 검토 시:

1. <strong>명확성</strong>: 코드가 명확하고 잘 문서화되어 있나요?
2. <strong>정확성</strong>: 예상대로 작동하나요?
3. <strong>일관성</strong>: 프로젝트 규칙을 따르나요?
4. <strong>완전성</strong>: 테스트와 문서가 포함되어 있나요?
5. <strong>보안</strong>: 보안 문제는 없나요?

### 버전 호환성

MCP 개발 시:

1. **프로토콜 버전 관리**: 도구가 지원하는 MCP 프로토콜 버전을 준수
2. **클라이언트 호환성**: 이전 버전 호환성 고려
3. **서버 호환성**: 서버 구현 지침 준수
4. **브레이킹 변경 사항**: 브레이킹 변경 사항 명확히 문서화

## 예제 커뮤니티 프로젝트: MCP 도구 레지스트리

중요한 커뮤니티 기여는 MCP 도구를 위한 공개 레지스트리를 개발하는 것입니다.

```python
# 커뮤니티 도구 등록 API를 위한 예제 스키마

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# 도구 등록을 위한 모델들
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

# 등록을 위한 FastAPI 애플리케이션
app = FastAPI(title="MCP Tool Registry")

# 이 예제를 위한 메모리 내 데이터베이스
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

## 주요 요점

- MCP 커뮤니티는 다양하며 다양한 유형의 기여를 환영합니다
- MCP에 기여하는 범위는 핵심 프로토콜 향상에서 맞춤 도구 제작까지 다양합니다
- 기여 지침을 따르면 PR 승인 가능성이 높아집니다
- MCP 도구 생성 및 공유는 생태계 강화에 가치 있는 방법입니다
- 커뮤니티 협업은 MCP 성장과 개선에 필수적입니다

## 연습

1. 자신의 기술과 관심사에 기반해 MCP 생태계에서 기여할 수 있는 영역을 식별하세요
2. MCP 저장소를 포크하고 로컬 개발 환경을 설정하세요
3. 커뮤니티에 도움이 될 작은 개선, 버그 수정, 도구를 만드세요
4. 적절한 테스트와 문서와 함께 기여 내용을 기록하세요
5. 적절한 저장소에 풀 리퀘스트를 제출하세요

## 추가 자료

- [MCP 커뮤니티 프로젝트](https://github.com/topics/model-context-protocol)

---

## 다음 단계

다음: [초기 채택에서 얻은 교훈](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->