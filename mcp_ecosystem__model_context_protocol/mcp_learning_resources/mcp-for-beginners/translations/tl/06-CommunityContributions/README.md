# Komunidad at Mga Ambag

[![Paano Mag-ambag sa MCP: Mga Kasangkapan, Dokumento, Kodigo at Iba Pa](../../../translated_images/tl/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(I-click ang larawan sa itaas upang panoorin ang video ng leksyon na ito)_

## Pangkalahatang-ideya

Ang leksyon na ito ay nakatuon sa kung paano makisali sa komunidad ng MCP, mag-ambag sa ekosistema ng MCP, at sundin ang mga pinakamahusay na kasanayan para sa kolaboratibong pag-unlad. Mahalaga ang pag-unawa kung paano makibahagi sa mga bukas na proyekto ng MCP para sa mga nagnanais na hubugin ang hinaharap ng teknolohiyang ito.

## Mga Layunin ng Pagkatuto

Sa pagtatapos ng leksyon na ito, magagawa mong:

- Maunawaan ang estruktura ng komunidad at ekosistema ng MCP
- Makibahagi nang epektibo sa mga forum at talakayan ng komunidad ng MCP
- Mag-ambag sa mga open-source na repositoryo ng MCP
- Gumawa at magbahagi ng mga pasadyang kasangkapan at server ng MCP
- Sundin ang mga pinakamahusay na kasanayan para sa pag-unlad at kolaborasyon sa MCP
- Tuklasin ang mga mapagkukunan at framework ng komunidad para sa pag-unlad ng MCP

## Ang Ekosistema ng Komunidad ng MCP

Ang ekosistema ng MCP ay binubuo ng iba't ibang bahagi at kalahok na nagtutulungan upang isulong ang protocol.

### Pangunahing Bahagi ng Komunidad

1. **Mga Tagapangalaga ng Core Protocol**: Ang opisyal na [Model Context Protocol GitHub organization](https://github.com/modelcontextprotocol) ang nag-aalaga sa mga pangunahing espesipikasyon ng MCP at mga sanggunian ng implementasyon  
2. **Mga Tagalikha ng Kasangkapan**: Mga indibidwal at koponan na lumilikha ng mga kasangkapan at server para sa MCP  
3. **Mga Tagapagbigay ng Integrasyon**: Mga kumpanya na nag-iintegrate ng MCP sa kanilang mga produkto at serbisyo  
4. **Mga End User**: Mga developer at organisasyon na gumagamit ng MCP sa kanilang mga aplikasyon  
5. **Mga Kontribyutor**: Mga miyembro ng komunidad na nag-aambag ng kodigo, dokumentasyon, o iba pang mga mapagkukunan  

### Mga Mapagkukunan ng Komunidad

#### Opisyal na Mga Channel

- [MCP GitHub Organization](https://github.com/modelcontextprotocol)  
- [MCP Documentation](https://modelcontextprotocol.io/)  
- [MCP Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [GitHub Discussions](https://github.com/orgs/modelcontextprotocol/discussions)  
- [MCP Examples & Servers Repository](https://github.com/modelcontextprotocol/servers)  

#### Mga Mapagkukunang Pinamumunuan ng Komunidad

- [MCP Clients](https://modelcontextprotocol.io/clients) - Listahan ng mga client na sumusuporta sa integrasyon ng MCP  
- [Community MCP Servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - Lumalawak na listahan ng mga MCP server na binuo ng komunidad  
- [Awesome MCP Servers](https://github.com/wong2/awesome-mcp-servers) - Pinili at inayos na listahan ng mga MCP server  
- [PulseMCP](https://www.pulsemcp.com/) - Hub ng komunidad at newsletter para sa pagtuklas ng mga mapagkukunan ng MCP  
- [Discord Server](https://discord.gg/jHEGxQu2a5) - Makipag-ugnayan sa mga developer ng MCP  
- Mga pag-implementa ng SDK para sa partikular na mga wika  
- Mga blog post at tutorial  

## Pag-aambag sa MCP

### Mga Uri ng Ambag

Malugod na tinatanggap sa ekosistema ng MCP ang iba't ibang uri ng ambag:

1. **Ambag na Kodigo**:  
   - Mga pagpapahusay sa core protocol  
   - Pag-aayos ng bug  
   - Implementasyon ng mga kasangkapan at server  
   - Mga library para sa client/server sa iba't ibang wika  

2. **Dokumentasyon**:  
   - Pagpapabuti ng umiiral na dokumentasyon  
   - Paggawa ng mga tutorial at gabay  
   - Pagsasalin ng dokumentasyon  
   - Paggawa ng mga halimbawa at sample applications  

3. **Suporta sa Komunidad**:  
   - Pagsagot sa mga tanong sa mga forum at talakayan  
   - Pagsusuri at pag-uulat ng mga isyu  
   - Pag-oorganisa ng mga kaganapan ng komunidad  
   - Pag-mentor sa mga bagong kontribyutor  

### Proseso ng Pag-aambag: Core Protocol

Para mag-ambag sa core MCP protocol o mga opisyal na implementasyon, sundin ang mga prinsipyong ito mula sa [opisyal na alituntunin sa pag-aambag](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md):

1. **Simplicity at Minimalismo**: Mataas ang pamantayan ng espesipikasyon ng MCP para sa pagdagdag ng mga bagong konsepto. Mas madali ang pagdagdag kaysa sa pag-alis.  
2. **Konkretong Paraan**: Ang mga pagbabago sa espesipikasyon ay dapat nakabatay sa partikular na mga hamon sa implementasyon, hindi pulos haka-haka.  
3. **Mga Yugto ng Mungkahing Proyekto**:  
   - Tukuyin: Siyasatin ang problema, patunayan na kabilang ang ibang gumagamit ng MCP ay may katulad na isyu  
   - Prototype: Gumawa ng isang halimbawa ng solusyon at ipakita ang praktikal na aplikasyon nito  
   - Sulatin: Batay sa prototype, isulat ang mungkahing espesipikasyon  

### Pagsasaayos ng Kapaligiran sa Pag-unlad

```bash
# I-fork ang repositoryo
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# I-install ang mga dependencies
npm install

# Para sa mga pagbabago sa schema, i-validate at lumikha ng schema.json:
npm run check:schema:ts
npm run generate:schema

# Para sa mga pagbabago sa dokumentasyon
npm run check:docs
npm run format

# I-preview ang dokumentasyon lokal (opsyonal):
npm run serve:docs
```
  
### Halimbawa: Pag-ambag ng Pag-aayos ng Bug

```javascript
// Orihinal na code na may bug sa typescript-sdk
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Bug: Nawawalang validation ng property
  // Kasalukuyang implementasyon:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// Naayos na implementasyon sa isang kontribusyon
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Pinahusay na validation
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```
  
### Halimbawa: Pag-ambag ng Bagong Kasangkapan sa Standard Library

```python
# Halimbawang kontribusyon: Isang kasangkapang pangproseso ng datos na CSV para sa MCP standard library

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
            # Kunin ang mga parametro
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # Kunin ang datos ng CSV mula sa direktang datos o URL
            df = await self._get_dataframe(request)
            
            # Proseso batay sa hinihiling na operasyon
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
        # Kasama sa pagpapatupad ang iba't ibang mga transformasyon
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
  
### Mga Panuntunan sa Pag-aambag

Para magkaroon ng matagumpay na ambag sa MCP na mga proyekto:

1. **Magsimula sa Maliit**: Simulan sa dokumentasyon, pag-aayos ng bug, o maliliit na pagpapahusay  
2. **Sundin ang Patnubay sa Estilo**: Sundin ang istilo ng coding at mga konbensiyon ng proyekto  
3. **Sumulat ng Mga Pagsusuri**: Isama ang mga unit test para sa mga ambag sa kodigo  
4. **Idokumento ang Iyong Trabaho**: Magdagdag ng malinaw na dokumentasyon para sa mga bagong tampok o pagbabago  
5. **Mag-submit ng Targeted PRs**: Panatilihing nakatuon ang mga pull request sa isang isyu o tampok lamang  
6. **Makipag-ugnayan sa Feedback**: Maging maagap sa pagtugon sa feedback tungkol sa iyong mga ambag  

### Halimbawa ng Workflow ng Pag-aambag

```bash
# I-clone ang repositoryo
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# Gumawa ng bagong sangay para sa iyong kontribusyon
git checkout -b feature/my-contribution

# Gawin ang iyong mga pagbabago
# ...

# Patakbuhin ang mga pagsusulit upang masiguro na ang iyong mga pagbabago ay hindi sisira sa umiiral na functionality
npm test

# I-commit ang iyong mga pagbabago na may malinaw na mensahe
git commit -am "Fix validation in resource handler"

# I-push ang iyong sangay sa iyong fork
git push origin feature/my-contribution

# Gumawa ng pull request mula sa iyong sangay papunta sa pangunahing repositoryo
# Pagkatapos ay makipag-ugnayan sa feedback at ulitin ang iyong PR kung kinakailangan
```
  
## Paggawa at Pagbabahagi ng MCP Servers

Isa sa mga pinakamahalagang paraan ng pag-ambag sa ekosistema ng MCP ay ang paggawa at pagbabahagi ng mga pasadyang MCP server. Daiyan nang napakaraming mga server ang nabuo ng komunidad para sa iba't ibang serbisyo at gamit.

### Mga Framework sa Pag-develop ng MCP Server

Ilan sa mga framework na magpapadali sa pag-develop ng MCP server ay:

1. **Opisyal na SDKs** (ayon sa [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):  
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)  
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)  
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)  
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)  
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)  
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)  
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)  
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)  

2. **Mga Framework ng Komunidad**:  
   - [MCP-Framework](https://mcp-framework.com/) - Bumuo ng mga MCP server nang elegante at mabilis gamit ang TypeScript  
   - [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - Mga MCP server na nakabase sa annotation gamit ang Java  
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) - Framework ng Java para sa mga MCP server  
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) - Panimulang proyekto ng Next.js para sa mga MCP server  

### Pag-develop ng Mga Maibabahaging Kasangkapan

#### Halimbawa ng .NET: Paggawa ng Maibabahaging Pakete ng Kasangkapan

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
  
#### Halimbawa ng Java: Paggawa ng Maven Package para sa Mga Kasangkapan

```java
// pom.xml na konfigurasyon para sa isang maibabahaging MCP tool package
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
        // Depinisyon ng Iskema...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // Tawagan ang weather API
            Map<String, Object> forecast = getForecast(location, days);
            
            // Buuhin ang tugon
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // Ang implementasyon ay tatawag sa weather API
        // Pinapasimpleng halimbawa
        Map<String, Object> result = new HashMap<>();
        // Idagdag ang forecast na datos...
        return result;
    }
}

// Buuhin at i-publish gamit ang Maven
// mvn clean package
// mvn deploy
```
  
#### Halimbawa ng Python: Pag-publish ng PyPI Package

```python
# Estruktura ng direktoryo para sa isang PyPI package:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# Halimbawa ng setup.py
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

# Halimbawa ng implementasyon ng NLP tool (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # I-load ang modelo ng pagsusuri ng damdamin
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
            # Kuhanin ang mga parameter
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # Suriin ang damdamin
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # I-format ang resulta
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # Ibalik ang resulta
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# Para i-publish:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```
  
### Pagbabahagi ng Mga Pinakamahusay na Kasanayan

Kapag nagbabahagi ng mga kasangkapan ng MCP sa komunidad:

1. **Kumpletong Dokumentasyon**:  
   - Idokumento ang layunin, paggamit, at mga halimbawa  
   - Ipaliwanag ang mga parameter at mga return value  
   - Idokumento ang anumang panlabas na mga dependency  

2. **Paghawak ng Error**:  
   - Magpatupad ng matatag na error handling  
   - Magbigay ng kapaki-pakinabang na mga mensahe ng error  
   - Mahusay na paghahandle sa mga edge case  

3. **Pagsasaalang-alang sa Performance**:  
   - I-optimize para sa bilis at paggamit ng mga resources  
   - Magpatupad ng caching kapag angkop  
   - Isaalang-alang ang scalability  

4. **Seguridad**:  
   - Gumamit ng secure na mga API key at authentication  
   - Suriin at linisin ang mga input  
   - Magpatupad ng rate limiting para sa mga external API call  

5. **Pagsusuri**:  
   - Isama ang komprehensibong test coverage  
   - Subukan gamit ang iba't ibang uri ng input at mga edge case  
   - Idokumento ang mga proseso ng pagsusuri  

## Kolaborasyon ng Komunidad at Mga Pinakamahusay na Kasanayan

Mahalaga ang epektibong kolaborasyon para sa masiglang ekosistema ng MCP.

### Mga Channel ng Komunikasyon

- GitHub Issues at Discussions  
- Microsoft Tech Community  
- Discord at Slack channels  
- Stack Overflow (tag: `model-context-protocol` o `mcp`)  

### Pagsusuri ng Kodigo

Kapag nire-review ang mga ambag sa MCP:

1. **Kaluwagan**: Malinaw ba at mahusay ang dokumentasyon ng kodigo?  
2. **Katungtungan**: Gumagana ba ito ayon sa inaasahan?  
3. **Pagkakapare-pareho**: Sumusunod ba ito sa mga konbensiyon ng proyekto?  
4. **Kumpleto**: Kasama ba ang mga pagsusuri at dokumentasyon?  
5. **Seguridad**: Mayroon bang mga alalahanin sa seguridad?  

### Pagsasabay ng Bersyon

Kapag nagde-develop para sa MCP:

1. **Pagbubersyon ng Protocol**: Sundin ang bersyon ng MCP protocol na sinusuportahan ng iyong kasangkapan  
2. **Pagkakatugma sa Client**: Isaalang-alang ang backward compatibility  
3. **Pagkakatugma sa Server**: Sundin ang mga panuntunan para sa implementasyon ng server  
4. **Pagbabago na Nagwawasak**: Dokumentuhin nang malinaw ang anumang breaking changes  

## Halimbawa ng Proyektong Pangkomunidad: MCP Tool Registry

Isang mahalagang ambag ng komunidad ang maaaring pagbuo ng pampublikong talaan para sa mga kasangkapan ng MCP.

```python
# Halimbawa ng schema para sa isang community tool registry API

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# Mga modelo para sa tool registry
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

# FastAPI na aplikasyon para sa registry
app = FastAPI(title="MCP Tool Registry")

# Pansamantalang database para sa halimbawa na ito
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
  
## Pangunahing Mga Natutuhan

- Ang komunidad ng MCP ay magkakaiba-iba at tinatanggap ang iba’t ibang uri ng ambag  
- Ang pag-aambag sa MCP ay maaaring mula sa pagpapahusay ng core protocol hanggang sa paggawa ng mga pasadyang kasangkapan  
- Ang pagsunod sa mga patnubay sa pag-aambag ay nagpapabuti ng tsansa na tanggapin ang iyong PR  
- Ang paggawa at pagbabahagi ng mga kasangkapan ng MCP ay mahalagang paraan upang paunlarin ang ekosistema  
- Ang kolaborasyon ng komunidad ay mahalaga para sa paglago at pagpapabuti ng MCP  

## Pagsasanay

1. Kilalanin ang isang bahagi sa ekosistema ng MCP kung saan maaari kang mag-ambag batay sa iyong kakayahan at interes  
2. I-fork ang MCP repositoryo at mag-set up ng lokal na kapaligiran sa pag-unlad  
3. Gumawa ng maliit na pagpapahusay, pag-aayos ng bug, o kasangkapan na makikinabang ang komunidad  
4. Idokumento ang iyong kontribusyon na may mga angkop na pagsusuri at dokumentasyon  
5. Mag-submit ng pull request sa angkop na repositoryo  

## Karagdagang Mga Mapagkukunan

- [MCP Community Projects](https://github.com/topics/model-context-protocol)

---

## Ano ang Susunod

Susunod: [Lessons from Early Adoption](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:  
Ang dokumentong ito ay isinalin gamit ang serbisyong AI na pagsasalin [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na may kapangyarihan bilang pinagmulan ng impormasyon. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasaling-tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na maaaring magmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->