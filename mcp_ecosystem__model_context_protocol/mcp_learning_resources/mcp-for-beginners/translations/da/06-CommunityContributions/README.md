# Community and Contributions

[![How to Contribute to MCP: Tools, Docs, Code and More](../../../translated_images/da/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(Klik på billedet ovenfor for at se videoen til denne lektion)_

## Overview

Denne lektion fokuserer på, hvordan man engagerer sig i MCP-fællesskabet, bidrager til MCP-økosystemet og følger bedste praksis for samarbejdsudvikling. Det er vigtigt at forstå, hvordan man deltager i open source MCP-projekter for dem, der ønsker at forme fremtiden for denne teknologi.

## Learning Objectives

Ved slutningen af denne lektion vil du kunne:

- Forstå strukturen i MCP-fællesskabet og økosystemet
- Deltage effektivt i MCP-fællesskabsfora og diskussioner
- Bidrage til MCP open source-repositorier
- Oprette og dele brugerdefinerede MCP-værktøjer og servere
- Følge bedste praksis for MCP-udvikling og samarbejde
- Opleve fællesskabsressourcer og frameworks til MCP-udvikling

## The MCP Community Ecosystem

MCP-økosystemet består af forskellige komponenter og deltagere, der arbejder sammen for at fremme protokollen.

### Key Community Components

1. **Core Protocol Maintainers**: Den officielle [Model Context Protocol GitHub-organisation](https://github.com/modelcontextprotocol) vedligeholder de centrale MCP-specifikationer og referenceimplementeringer
2. **Tool Developers**: Personer og teams, der skaber MCP-værktøjer og servere
3. **Integration Providers**: Virksomheder, der integrerer MCP i deres produkter og tjenester
4. **End Users**: Udviklere og organisationer, der bruger MCP i deres applikationer
5. **Contributors**: Fællesskabsmedlemmer, der bidrager med kode, dokumentation eller andre ressourcer

### Community Resources

#### Official Channels

- [MCP GitHub Organization](https://github.com/modelcontextprotocol)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Discussions](https://github.com/orgs/modelcontextprotocol/discussions)
- [MCP Examples & Servers Repository](https://github.com/modelcontextprotocol/servers)

#### Community-Driven Resources

- [MCP Clients](https://modelcontextprotocol.io/clients) - Liste over klienter, der understøtter MCP-integrationer
- [Community MCP Servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - Voksende liste af community-udviklede MCP-servere
- [Awesome MCP Servers](https://github.com/wong2/awesome-mcp-servers) - Kurateret liste over MCP-servere
- [PulseMCP](https://www.pulsemcp.com/) - Community hub & nyhedsbrev til at opdage MCP-ressourcer
- [Remote OpenClaw](https://www.remoteopenclaw.com/) - Gratis søgbar katalog over MCP-servere, agentfærdigheder og plugins
- [Discord Server](https://discord.gg/jHEGxQu2a5) - Forbind med MCP-udviklere
- Sprog-specifikke SDK-implementeringer
- Blogindlæg og vejledninger

## Contributing to MCP

### Types of Contributions

MCP-økosystemet byder på forskellige typer bidrag:

1. **Code Contributions**:
   - Forbedringer af kerneprotokollen
   - Fejlrettelser
   - Implementering af værktøjer og servere
   - Klient/server-biblioteker i forskellige sprog

2. **Documentation**:
   - Forbedring af eksisterende dokumentation
   - Oprettelse af tutorials og vejledninger
   - Oversættelse af dokumentation
   - Oprettelse af eksempler og prøveapplikationer

3. **Community Support**:
   - Besvare spørgsmål på fora og i diskussioner
   - Test og rapportering af problemer
   - Organisering af fællesskabsarrangementer
   - Mentorering af nye bidragydere

### Contribution Process: Core Protocol

For at bidrage til kernemcp-protokollen eller officielle implementeringer, følg disse principper fra de [officielle bidragsretningslinjer](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md):

1. **Simplicity and Minimalism**: MCP-specifikationen opretholder en høj standard for tilføjelse af nye koncepter. Det er nemmere at tilføje ting til en specifikation end at fjerne dem.

2. **Concrete Approach**: Ændringer i specifikationen bør baseres på konkrete implementeringsudfordringer, ikke spekulative ideer.

3. **Stages of a Proposal**:
   - Define: Udforsk problemområdet, bekræft at andre MCP-brugere står over for samme problem
   - Prototype: Byg en eksempel-løsning og vis dens praktiske anvendelse
   - Write: Ud fra prototypen skriv et specifikationsforslag

### Development Environment Setup

```bash
# Opret en fork af depotet
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# Installer afhængigheder
npm install

# For skemændringer, valider og generer schema.json:
npm run check:schema:ts
npm run generate:schema

# For dokumentationsændringer
npm run check:docs
npm run format

# Forhåndsvis dokumentation lokalt (valgfrit):
npm run serve:docs
```

### Example: Contributing a Bug Fix

```javascript
// Original kode med fejl i typescript-sdk
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Fejl: Manglende egenskabsvalidering
  // Nuværende implementering:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// Rettet implementering i et bidrag
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Forbedret validering
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### Example: Contributing a New Tool to the Standard Library

```python
# Eksempel på bidrag: Et CSV-databehandlingsværktøj til MCP-standardbiblioteket

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
            # Udtræk parametre
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # Hent CSV-data fra enten direkte data eller URL
            df = await self._get_dataframe(request)
            
            # Behandl baseret på den anmodede operation
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
        # Implementeringen vil inkludere forskellige transformationer
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

### Contribution Guidelines

For at lave et succesfuldt bidrag til MCP-projekter:

1. **Start Small**: Begynd med dokumentation, fejlrettelser eller små forbedringer
2. **Follow the Style Guide**: Overhold projektets kodestandarder og konventioner
3. **Write Tests**: Inkluder enhedstest for dine kodebidrag
4. **Document Your Work**: Tilføj klar dokumentation for nye funktioner eller ændringer
5. **Submit Targeted PRs**: Hold pull requests fokuseret på et enkelt problem eller funktion
6. **Engage with Feedback**: Vær lydhør over for feedback på dine bidrag

### Example Contribution Workflow

```bash
# Klon depotet
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# Opret en ny gren til dit bidrag
git checkout -b feature/my-contribution

# Lav dine ændringer
# ...

# Kør tests for at sikre, at dine ændringer ikke ødelægger eksisterende funktionalitet
npm test

# Commit dine ændringer med en beskrivende besked
git commit -am "Fix validation in resource handler"

# Push din gren til din fork
git push origin feature/my-contribution

# Opret en pull request fra din gren til hoveddepotet
# Engagér dig derefter i feedback og iterer på din PR efter behov
```

## Creating and Sharing MCP Servers

En af de mest værdifulde måder at bidrage til MCP-økosystemet er ved at oprette og dele brugerdefinerede MCP-servere. Fællesskabet har allerede udviklet hundredevis af servere til forskellige tjenester og anvendelsestilfælde.

### MCP Server Development Frameworks

Flere frameworks er tilgængelige for at forenkle udviklingen af MCP-servere:

1. **Official SDKs** (tilpasset [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **Community Frameworks**:
   - [MCP-Framework](https://mcp-framework.com/) - Byg MCP-servere med elegance og fart i TypeScript
   - [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - Annotation-drevne MCP-servere med Java
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) - Java-framework til MCP-servere
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) - Starter Next.js-projekt til MCP-servere

### Developing Shareable Tools

#### .NET Example: Creating a Shareable Tool Package

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

#### Java Example: Creating a Maven Package for Tools

```java
// pom.xml konfiguration for en delbar MCP værktøjspakke
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
        // Skema definition...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // Kald vejr API
            Map<String, Object> forecast = getForecast(location, days);
            
            // Byg svar
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // Implementeringen ville kalde vejr API
        // Forenklet eksempel
        Map<String, Object> result = new HashMap<>();
        // Tilføj prognosedata...
        return result;
    }
}

// Byg og publicer med Maven
// mvn clean package
// mvn deploy
```

#### Python Example: Publishing a PyPI Package

```python
# Mappestruktur for en PyPI-pakke:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# Eksempel på setup.py
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

# Eksempel på implementering af NLP-værktøj (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # Indlæs sentimentanalysemodellen
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
            # Udtræk parametre
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # Analyser sentiment
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # Formater resultat
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # Returner resultat
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# For at publicere:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### Sharing Best Practices

Når du deler MCP-værktøjer med fællesskabet:

1. **Complete Documentation**:
   - Dokumenter formål, brug og eksempler
   - Forklar parametre og returværdier
   - Dokumenter eventuelle eksterne afhængigheder

2. **Error Handling**:
   - Implementer robust fejlhåndtering
   - Giv nyttige fejlbeskeder
   - Håndter kanttilfælde yndefuldt

3. **Performance Considerations**:
   - Optimer både hastighed og ressourceforbrug
   - Implementer caching, hvor det er relevant
   - Overvej skalerbarhed

4. **Security**:
   - Brug sikre API-nøgler og godkendelse
   - Validér og rens input
   - Implementer rate limiting for eksterne API-kald

5. **Testing**:
   - Inkluder omfattende testdækning
   - Test med forskellige inputtyper og kanttilfælde
   - Dokumenter testprocedurer

## Community Collaboration and Best Practices

Effektivt samarbejde er nøglen til et blomstrende MCP-økosystem.

### Communication Channels

- GitHub Issues og Discussions
- Microsoft Tech Community
- Discord og Slack-kanaler
- Stack Overflow (tag: `model-context-protocol` eller `mcp`)

### Code Reviews

Ved gennemgang af MCP-bidrag:

1. **Clarity**: Er koden klar og godt dokumenteret?
2. **Correctness**: Fungerer den som forventet?
3. **Consistency**: Følger den projektets konventioner?
4. **Completeness**: Er tests og dokumentation inkluderet?
5. **Security**: Er der nogen sikkerhedsproblemer?

### Version Compatibility

Ved udvikling til MCP:

1. **Protocol Versioning**: Overhold den MCP-protokolversion, dit værktøj understøtter
2. **Client Compatibility**: Overvej bagudkompatibilitet
3. **Server Compatibility**: Følg serverimplementeringsretningslinjer
4. **Breaking Changes**: Dokumentér klart eventuelle brydende ændringer

## Example Community Project: MCP Tool Registry

Et vigtigt fællesskabsbidrag kunne være at udvikle et offentligt register over MCP-værktøjer.

```python
# Eksempel på skema til et API for et fællesskabs-værktøjsregister

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# Modeller til værktøjsregisteret
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

# FastAPI applikation til registret
app = FastAPI(title="MCP Tool Registry")

# Hukommelsesdatabase til dette eksempel
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

## Key Takeaways

- MCP-fællesskabet er mangfoldigt og byder på forskellige typer bidrag
- At bidrage til MCP kan spænde fra forbedringer af kerneprotokollen til brugerdefinerede værktøjer
- At følge bidragsretningslinjerne øger chancerne for, at din PR bliver accepteret
- At skabe og dele MCP-værktøjer er en værdifuld måde at styrke økosystemet på
- Fællesskabssamarbejde er essentielt for MCP’s vækst og forbedring

## Exercise

1. Identificer et område i MCP-økosystemet, hvor du kan yde et bidrag baseret på dine færdigheder og interesser
2. Fork MCP-repositoriet og sæt et lokalt udviklingsmiljø op
3. Opret en lille forbedring, fejlrettelse eller værktøj, som vil gavne fællesskabet
4. Dokumenter dit bidrag med passende tests og dokumentation
5. Send en pull request til det relevante repository

## Additional Resources

- [MCP Community Projects](https://github.com/topics/model-context-protocol)

---

## What's Next

Næste: [Lessons from Early Adoption](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->