# Community en Bijdragen

[![How to Contribute to MCP: Tools, Docs, Code and More](../../../translated_images/nl/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

## Overzicht

Deze les richt zich op hoe je betrokken kunt raken bij de MCP-community, kunt bijdragen aan het MCP-ecosysteem en best practices voor gezamenlijke ontwikkeling kunt volgen. Begrijpen hoe je kunt deelnemen aan open-source MCP-projecten is essentieel voor degenen die de toekomst van deze technologie willen vormgeven.

## Leerdoelen

Aan het einde van deze les kun je:

- De structuur van de MCP-community en het ecosysteem begrijpen
- Effectief deelnemen aan MCP-communityforums en discussies
- Bijdragen aan MCP open-source repositories
- Eigen MCP-tools en servers maken en delen
- Best practices voor MCP-ontwikkeling en samenwerking volgen
- Communitybronnen en frameworks voor MCP-ontwikkeling ontdekken

## Het MCP Community Ecosysteem

Het MCP-ecosysteem bestaat uit verschillende componenten en deelnemers die samenwerken om het protocol vooruit te helpen.

### Belangrijke Communitycomponenten

1. **Core Protocol Onderhouders**: De officiële [Model Context Protocol GitHub-organisatie](https://github.com/modelcontextprotocol) onderhoudt de kern MCP-specificaties en referentie-implementaties
2. **Toolontwikkelaars**: Individuen en teams die MCP-tools en servers creëren
3. **Integratieaanbieders**: Bedrijven die MCP integreren in hun producten en diensten
4. **Eindgebruikers**: Ontwikkelaars en organisaties die MCP gebruiken in hun applicaties
5. **Bijdragers**: Communityleden die code, documentatie of andere bronnen bijdragen

### Communitybronnen

#### Officiële Kanalen

- [MCP GitHub-organisatie](https://github.com/modelcontextprotocol)
- [MCP Documentatie](https://modelcontextprotocol.io/)
- [MCP Specificatie](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Discussies](https://github.com/orgs/modelcontextprotocol/discussions)
- [MCP Voorbeelden & Servers Repository](https://github.com/modelcontextprotocol/servers)

#### Community-gedreven Bronnen

- [MCP Clients](https://modelcontextprotocol.io/clients) - Lijst van clients die MCP-integraties ondersteunen
- [Community MCP Servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - Groeiende lijst van door de community ontwikkelde MCP-servers
- [Awesome MCP Servers](https://github.com/wong2/awesome-mcp-servers) - Geselecteerde lijst van MCP-servers
- [PulseMCP](https://www.pulsemcp.com/) - Communityhub & nieuwsbrief voor het ontdekken van MCP-bronnen
- [Discord Server](https://discord.gg/jHEGxQu2a5) - Maak verbinding met MCP-ontwikkelaars
- Taal-specifieke SDK-implementaties
- Blogposts en tutorials

## Bijdragen aan MCP

### Soorten Bijdragen

Het MCP-ecosysteem verwelkomt verschillende soorten bijdragen:

1. **Codebijdragen**:
   - Verbeteringen van het kernprotocol
   - Bugfixes
   - Implementaties van tools en servers
   - Client/server bibliotheken in verschillende talen

2. **Documentatie**:
   - Het verbeteren van bestaande documentatie
   - Het creëren van tutorials en handleidingen
   - Het vertalen van documentatie
   - Het maken van voorbeelden en voorbeeldapplicaties

3. **Communityondersteuning**:
   - Vragen beantwoorden op forums en discussies
   - Testen en issues rapporteren
   - Organiseren van community-evenementen
   - Mentorschap voor nieuwe bijdragers

### Bijdrageproces: Kernprotocol

Om bij te dragen aan het kern MCP-protocol of officiële implementaties, volg deze principes uit de [officiële bijdragerichtlijnen](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md):

1. **Eenvoud en Minimalisme**: De MCP-specificatie hanteert een hoge standaard voor het toevoegen van nieuwe concepten. Het is makkelijker om dingen aan een specificatie toe te voegen dan ze te verwijderen.

2. **Concrete Aanpak**: Wijzigingen in de specificatie moeten gebaseerd zijn op specifieke implementatie-uitdagingen, niet op speculatieve ideeën.

3. **Fasen van een Voorstel**:
   - Definieer: Verken het probleemgebied, bevestig dat andere MCP-gebruikers een vergelijkbaar probleem ervaren
   - Prototype: Bouw een voorbeeldoplossing en toon het praktische gebruik aan
   - Schrijf: Gebaseerd op het prototype, schrijf een voorstel voor de specificatie

### Ontwikkelomgeving Instellen

```bash
# Fork de repository
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# Installeer afhankelijkheden
npm install

# Voor schemawijzigingen, valideer en genereer schema.json:
npm run check:schema:ts
npm run generate:schema

# Voor documentatiewijzigingen
npm run check:docs
npm run format

# Bekijk documentatie lokaal (optioneel):
npm run serve:docs
```

### Voorbeeld: Bijdragen van een Bugfix

```javascript
// Originele code met bug in de typescript-sdk
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Bug: Ontbrekende eigenschapsvalidatie
  // Huidige implementatie:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// Gefixeerde implementatie in een bijdrage
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Verbeterde validatie
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### Voorbeeld: Een Nieuwe Tool Bijdragen aan de Standaardbibliotheek

```python
# Voorbeeldbijdrage: Een CSV-gegevensverwerkingstool voor de MCP-standaardbibliotheek

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
            # Parameters extraheren
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # Verkrijg CSV-gegevens van directe data of URL
            df = await self._get_dataframe(request)
            
            # Verwerken op basis van de gevraagde bewerking
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
        # Implementatie zou verschillende transformaties omvatten
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

### Bijdrageregelgeving

Om een succesvolle bijdrage te leveren aan MCP-projecten:

1. **Begin Klein**: Begin met documentatie, bugfixes of kleine verbeteringen
2. **Volg de Stijlrichtlijnen**: Houd je aan de codeerstijl en conventies van het project
3. **Schrijf Tests**: Voeg unittests toe voor je codebijdragen
4. **Documenteer Je Werk**: Voeg duidelijke documentatie toe voor nieuwe functies of wijzigingen
5. **Dien Gericht PR’s in**: Houd pull requests gericht op één probleem of functie
6. **Ga om met Feedback**: Reageer adequaat op feedback over je bijdragen

### Voorbeeld Workflow voor Bijdragen

```bash
# Clone de repository
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# Maak een nieuwe branch aan voor je bijdrage
git checkout -b feature/my-contribution

# Breng je wijzigingen aan
# ...

# Voer tests uit om te zorgen dat je wijzigingen de bestaande functionaliteit niet breken
npm test

# Commit je wijzigingen met een beschrijvende boodschap
git commit -am "Fix validation in resource handler"

# Push je branch naar je fork
git push origin feature/my-contribution

# Maak een pull request aan van je branch naar de hoofdrepository
# Ga vervolgens in op feedback en werk je PR bij indien nodig
```

## MCP Servers Maken en Delen

Een van de meest waardevolle manieren om bij te dragen aan het MCP-ecosysteem is het maken en delen van aangepaste MCP-servers. De community heeft al honderden servers ontwikkeld voor diverse diensten en gebruikssituaties.

### MCP Server Ontwikkelframeworks

Verschillende frameworks zijn beschikbaar om de ontwikkeling van MCP-servers te vereenvoudigen:

1. **Officiële SDK’s** (gealigneerd met [MCP Specificatie 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **Community Frameworks**:
   - [MCP-Framework](https://mcp-framework.com/) - Bouw MCP-servers met elegantie en snelheid in TypeScript
   - [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - Annotation-gestuurde MCP-servers met Java
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) - Java-framework voor MCP-servers
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) - Starter Next.js-project voor MCP-servers

### Ontwikkelen van Deelbare Tools

#### .NET Voorbeeld: Maken van een Deelbaar Toolpakket

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

#### Java Voorbeeld: Maken van een Maven-pakket voor Tools

```java
// pom.xml-configuratie voor een deelbaar MCP-hulpprogrammapakket
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
            <url>https://maven.pkg.github.com/gebruikersnaam/mcp-weather-tools</url>
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
        // Schema-definitie...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // Roep weer-API aan
            Map<String, Object> forecast = getForecast(location, days);
            
            // Bouw antwoord op
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // Implementatie zou weer-API aanroepen
        // Vereenvoudigd voorbeeld
        Map<String, Object> result = new HashMap<>();
        // Voeg voorspelde gegevens toe...
        return result;
    }
}

// Bouw en publiceer met Maven
// mvn clean package
// mvn deploy
```

#### Python Voorbeeld: Uitbrengen van een PyPI-pakket

```python
# Mapstructuur voor een PyPI-pakket:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# Voorbeeld setup.py
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

# Voorbeeld implementatie van een NLP-tool (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # Laad het sentimentanalysemodel
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
            # Haal parameters op
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # Analyseer sentiment
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # Formatteer resultaat
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # Keer resultaat terug
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# Om te publiceren:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### Best Practices bij Delen

Bij het delen van MCP-tools met de community:

1. **Volledige Documentatie**:
   - Documenteer doel, gebruik en voorbeelden
   - Leg parameters en retourwaarden uit
   - Documenteer eventuele externe afhankelijkheden

2. **Foutafhandeling**:
   - Implementeer robuuste foutafhandeling
   - Bied nuttige foutmeldingen
   - Handel randgevallen netjes af

3. **Prestatie-overwegingen**:
   - Optimaliseer voor snelheid en resourcegebruik
   - Implementeer caching waar gepast
   - Houd rekening met schaalbaarheid

4. **Beveiliging**:
   - Gebruik veilige API-sleutels en authenticatie
   - Valideer en reinig invoer
   - Implementeer rate limiting voor externe API-aanroepen

5. **Testen**:
   - Zorg voor uitgebreide testdekking
   - Test met verschillende invoertypen en randgevallen
   - Documenteer testprocedures

## Community Samenwerking en Best Practices

Effectieve samenwerking is essentieel voor een bloeiend MCP-ecosysteem.

### Communicatiekanalen

- GitHub Issues en Discussies
- Microsoft Tech Community
- Discord- en Slack-kanalen
- Stack Overflow (tag: `model-context-protocol` of `mcp`)

### Code Reviews

Bij het reviewen van MCP-bijdragen:

1. **Duidelijkheid**: Is de code helder en goed gedocumenteerd?
2. **Correctheid**: Werkt het zoals verwacht?
3. **Consistentie**: Volgt het de projectconventies?
4. **Volledigheid**: Zijn tests en documentatie inbegrepen?
5. **Beveiliging**: Zijn er beveiligingsproblemen?

### Versiecompatibiliteit

Bij het ontwikkelen voor MCP:

1. **Protocolversie**: Houd je aan de MCP-protocolversie die jouw tool ondersteunt
2. **Clientcompatibiliteit**: Houd rekening met backward compatibility
3. **Servercompatibiliteit**: Volg serverimplementatierichtlijnen
4. **Breaking Changes**: Documenteer duidelijk breaking changes

## Voorbeeld Communityproject: MCP Tool Registry

Een belangrijke communitybijdrage kan het ontwikkelen van een openbaar register voor MCP-tools zijn.

```python
# Voorbeeldschema voor een community toolregister API

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# Modellen voor het toolregister
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

# FastAPI-toepassing voor het register
app = FastAPI(title="MCP Tool Registry")

# In-memory database voor dit voorbeeld
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

## Belangrijkste Inzichten

- De MCP-community is divers en verwelkomt verschillende soorten bijdragen
- Bijdragen aan MCP kan variëren van kernprotocolverbeteringen tot aangepaste tools
- Het volgen van bijdrage-richtlijnen vergroot de kans dat je PR wordt geaccepteerd
- Het maken en delen van MCP-tools is een waardevolle manier om het ecosysteem te verbeteren
- Community samenwerking is essentieel voor groei en verbetering van MCP

## Oefening

1. Identificeer een gebied in het MCP-ecosysteem waar jij een bijdrage zou kunnen leveren op basis van je vaardigheden en interesses
2. Fork de MCP-repository en zet een lokale ontwikkelomgeving op
3. Maak een kleine verbetering, bugfix of tool die de community zou helpen
4. Documenteer je bijdrage met passende tests en documentatie
5. Dien een pull request in bij de juiste repository

## Extra Bronnen

- [MCP Community Projecten](https://github.com/topics/model-context-protocol)

---

## Wat Nu

Volgende: [Lessons from Early Adoption](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel wij streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal dient als de gezaghebbende bron te worden beschouwd. Voor kritieke informatie wordt een professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor misverstanden of verkeerde interpretaties voortvloeiend uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->