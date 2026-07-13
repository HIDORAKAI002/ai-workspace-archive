# Заједница и доприноси

[![Како допринети MCP-у: Алати, документација, код и још много тога](../../../translated_images/sr/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(Кликните на слику горе да бисте погледали видео о овој лекцији)_

## Преглед

Ова лекција се фокусира на начин како се укључити у MCP заједницу, допринети MCP екосистему и пратити најбоље праксе за колаборативни развој. Разумевање како учествовати у отвореним MCP пројектима је од суштинског значаја за оне који желе да обликују будућност ове технологије.

## Циљеви учења

До краја ове лекције, моћи ћете да:

- Разумете структуру MCP заједнице и екосистема
- Ефикасно учествујете у MCP форумима и дискусијама
- Доприносите отвореним репозиторијумима MCP-а
- Креирате и делите прилагођене MCP алате и сервере
- Пратите најбоље праксе за MCP развој и сарадњу
- Откријете ресурсе и оквире за развој у заједници MCP-a

## MCP екосистем заједнице

MCP екосистем се састоји од разних компоненти и учесника који заједно раде на напретку протокола.

### Кључне компоненте заједнице

1. **Одржаваоци основног протокола**: Званична [Model Context Protocol GitHub организација](https://github.com/modelcontextprotocol) одржава основне MCP спецификације и референтне имплементације
2. **Развијачи алата**: Појединци и тимови који креирају MCP алате и сервере
3. **Пружaоци интеграција**: Компаније које интегришу MCP у своје производе и услуге
4. **Крајњи корисници**: Развијачи и организације које користе MCP у својим апликацијама
5. **Приложиоци**: Чланови заједнице који доприносе кодом, документацијом или другим ресурсима

### Ресурси заједнице

#### Званични канали

- [MCP GitHub организација](https://github.com/modelcontextprotocol)
- [MCP документација](https://modelcontextprotocol.io/)
- [MCP спецификација](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub дискусије](https://github.com/orgs/modelcontextprotocol/discussions)
- [Репозиторијум примера и сервера MCP](https://github.com/modelcontextprotocol/servers)

#### Ресурси које покреће заједница

- [MCP клијенти](https://modelcontextprotocol.io/clients) - Листа клијената који подржавају MCP интеграције
- [MCP сервери заједнице](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - Растућа листа MCP сервера које је развила заједница
- [Сјајни MCP сервери](https://github.com/wong2/awesome-mcp-servers) - Курирана листа MCP сервера
- [PulseMCP](https://www.pulsemcp.com/) - Центар за заједницу и билтен за откривање MCP ресурса
- [Remote OpenClaw](https://www.remoteopenclaw.com/) - Бесплатни претраживи директоријум MCP сервера, вештина агената и додатака
- [Discord сервер](https://discord.gg/jHEGxQu2a5) - Повежите се са MCP развијачима
- SDK имплементације специфичне за језике
- Блогови и туторијали

## Допринос MCP-у

### Врсте доприноса

MCP екосистем поздравља разне типове доприноса:

1. **Кодни доприноси**:
   - Побољшања основног протокола
   - Исправке грешака
   - Имплементације алата и сервера
   - Клијент/сервер библиотеке на различитим језицима

2. **Документација**:
   - Побољшање постојеће документације
   - Креирање туторијала и водича
   - Превођење документације
   - Креирање примера и узорака апликација

3. **Подршка за заједницу**:
   - Одговарање на питања на форумима и дискусијама
   - Тестирање и пријављивање проблема
   - Организовање догађаја заједнице
   - Менторство нових доприноса

### Процес доприноса: Основни протокол

Да бисте допринели основном MCP протоколу или службеним имплементацијама, пратите ове принципе из [званичних смерница за допринос](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md):

1. **Једноставност и минимализам**: MCP спецификација поставља високе стандарде за додавање нових концепата. Лакше је нешто додати спецификацији него уклонити.

2. **Конкретан приступ**: Промене специфkацije треба да буду базиране на конкретним изазовима имплементације, а не на спекулативним идејама.

3. **Фазе предлога**:
   - Дефинисање: Истражите проблемски простор, потврдите да други MCP корисници имају сличан проблем
   - Прототип: Направите пример решења и прикажите његову практичну примену
   - Писање: На основу прототипа напишите предлог специфkације

### Постављање развојног окружења

```bash
# Форкуј репозиторијум
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# Инсталирај зависности
npm install

# За промене шеме, валидација и генерисање schema.json:
npm run check:schema:ts
npm run generate:schema

# За промене документације
npm run check:docs
npm run format

# Прегледај документацију локално (опционо):
npm run serve:docs
```

### Пример: Допринос исправком грешке

```javascript
// Оригинални код са грешком у typescript-sdk
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Грешка: Недостаје валидација особине
  // Тренутна имплементација:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// Исправљена имплементација у доприносу
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Побољшана валидација
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### Пример: Допринос новим алатом у стандардној библиотеци

```python
# Пример доприноса: Алат за обраду CSV података за МЦП стандардну библиотеку

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
            # Извучите параметре
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # Узмите CSV податке из директних података или URL-а
            df = await self._get_dataframe(request)
            
            # Обрада на основу тражене операције
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
        # Имплементација би укључивала различите трансформације
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

### Смернице за допринос

За успешан допринос MCP пројектима:

1. **Почните мало**: Почните са документацијом, исправкама грешака или малим побољшањима
2. **Пратите стилске смернице**: Придржавајте се стила кодирања и конвенција пројекта
3. **Пишете тестове**: Укључите јединичне тестове за ваш код
4. **Документујте свој рад**: Додајте јасну документацију за нове функције или промене
5. **Пошаљите циљане PR-ове**: Држите захтеве за извлачење фокусираним на један проблем или функцију
6. **Ангажујте се око повратних информација**: Будите одговорни на повратне информације о вашим доприносима

### Пример радног тока доприноса

```bash
# Клонирајте репозиторијум
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# Креирајте нову грану за свој допринос
git checkout -b feature/my-contribution

# Направите своје измене
# ...

# Покрените тестове да бисте осигурали да ваше измене не кваре постојећу функционалност
npm test

# Комитујте своје измене са описном поруком
git commit -am "Fix validation in resource handler"

# Пошаљите своју грану на свој форк
git push origin feature/my-contribution

# Креирајте pull request са своје гране ка главном репозиторијуму
# Потом се ангажујте са повратним информацијама и по потреби дорађујте ваш PR
```

## Креирање и дељење MCP сервера

Један од највреднијих начина доприноса MCP екосистему је креирање и дељење прилагођених MCP сервера. Заједница је већ развила стотине сервера за различите услуге и примене.

### Оквири за развој MCP сервера

Доступно је неколико оквира који поједностављују развој MCP сервера:

1. **Званични SDK-ови** (усклађени са [MCP спецификацијом 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **Заједнички оквири**:
   - [MCP-Framework](https://mcp-framework.com/) - Креирајте MCP сервере са елеганцијом и брзином у TypeScript-у
   - [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - MCP сервери вођени анотацијама у Јави
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) - Јава оквир за MCP сервере
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) - Стартер Next.js пројекат за MCP сервере

### Развјање алата за дељење

#### .NET пример: Креирање пакета за дељење алата

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

#### Јава пример: Креирање Maven пакета за алате

```java
// конфигурација pom.xml за дељиви MCP алат пакет
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
        // Дефиниција шеме...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // Позив временске API
            Map<String, Object> forecast = getForecast(location, days);
            
            // Изградња одговора
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // Имплементација би позвала временски API
        // Поједностављени пример
        Map<String, Object> result = new HashMap<>();
        // Додај податке о прогнозу...
        return result;
    }
}

// Изградња и објављивање коришћењем Maven
// mvn clean package
// mvn deploy
```

#### Python пример: Објављивање PyPI пакета

```python
# Структура директоријума за PyPI пакет:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# Пример setup.py
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

# Пример имплементације NLP алата (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # Учитај модел за анализу сентимента
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
            # Извучи параметре
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # Анализирај сентимент
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # Форматирај резултат
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # Врати резултат
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# За објављивање:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### Дељење најбољих пракси

Када делите MCP алате са заједницом:

1. **Потпуна документација**:
   - Документујте сврху, употребу и примере
   - Објасните параметре и повратне вредности
   - Документујте све спољашње зависности

2. **Руковање грешкама**:
   - Имплементирајте робустно руковање грешкама
   - Обезбедите корисне поруке о грешкама
   - Грациозно поднесите крајње случајеве

3. **Перформансе**:
   - Оптимизујте и за брзину и за коришћење ресурса
   - Имплементирајте кеширање када је то прикладно
   - Размотrite меру проширивости

4. **Безбедност**:
   - Користите сигурне API кључеве и аутентификацију
   - Валидација и санација улаза
   - Имплементирајте ограничење броја позива спољашњих API-ја

5. **Тестирање**:
   - Укључите свеобухватно покриће тестовима
   - Тестирајте са различитим типовима уноса и крајњим случајевима
   - Документујте поступке тестирања

## Сарадња у заједници и најбоље праксе

Ефикасна сарадња је кључ раста MCP екосистема.

### Канали комуникације

- GitHub Issues и дискусије
- Microsoft Tech Community
- Discord и Slack канали
- Stack Overflow (ознака: `model-context-protocol` или `mcp`)

### Прегледи кода

При прегледу MCP доприноса:

1. **Јасноћа**: Да ли је код јасан и добро документован?
2. **Точност**: Да ли ради како се очекује?
3. **Доследност**: Да ли прати конвенције пројекта?
4. **Комплетност**: Да ли укључује тестове и документацију?
5. **Безбедност**: Постоје ли безбедносни проблеми?

### Компатибилност верзија

При развоју за MCP:

1. **Верзионисање протокола**: Придржавајте се верзије MCP протокола коју ваш алат подржава
2. **Компатибилност клијента**: Разматрајте уназадну компатибилност
3. **Компатибилност сервера**: Пратите смернице имплементације сервера
4. **Прекидне промене**: Јасно документујте све прекидне промене

## Пример заједничког пројекта: Регистар MCP алата

Важан допринос заједнице могао би бити развој јавног регистра за MCP алате.

```python
# Пример шеме за API регистра алата за заједницу

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# Модели за регистар алата
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

# FastAPI апликација за регистар
app = FastAPI(title="MCP Tool Registry")

# У меморији база података за овај пример
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

## Кључне поенте

- MCP заједница је разнолика и поздравља разне врсте доприноса
- Допринос MCP-у може укључивати побољшања основног протокола као и прилагођене алате
- Поштивање смерница за допринос повећава шансе да ваш PR буде прихваћен
- Креирање и дељење MCP алата је вредан начин за унапређење екосистема
- Сарадња у заједници је пресудна за раст и побољшање MCP-а

## Вежба

1. Идентификујте област у MCP екосистему у којој можете направити допринос на основу ваших вештина и интересовања
2. Форкујте MCP репозиторијум и поставите локално развојно окружење
3. Креирајте мало побољшање, исправку грешке или алат који ће користити заједници
4. Документујте свој допринос са одговарајућим тестовима и документацијом
5. Пошаљите pull request у одговарајући репозиторијум

## Додатни ресурси

- [Пројекти MCP заједнице](https://github.com/topics/model-context-protocol)

---

## Шта следи

Следеће: [Лекције из ране примене](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->