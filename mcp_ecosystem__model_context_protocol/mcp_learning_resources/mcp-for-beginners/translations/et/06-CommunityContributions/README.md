# Kogukond ja panused

[![Kuidas panustada MCP-sse: tööriistad, dokumendid, kood ja muu](../../../translated_images/et/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(Klõpsa ülaloleval pildil, et vaadata selle tunni videot)_

## Ülevaade

Selles tunnis keskendutakse MCP kogukonnaga suhtlemisele, panustamisele MCP ökosüsteemi ning parimatele tavadele koostöö arendamisel. Mõistmine, kuidas osaleda avatud lähtekoodiga MCP projektides, on oluline neile, kes soovivad kujundada selle tehnoloogia tulevikku.

## Õpieesmärgid

Selle tunni lõpuks oskad:

- Mõista MCP kogukonna ja ökosüsteemi struktuuri
- Osaleda tõhusalt MCP kogukonna foorumites ja aruteludes
- Panustada MCP avatud lähtekoodiga hoidlatesse
- Luua ja jagada kohandatud MCP tööriistu ja servereid
- Järgida MCP arendamise ja koostöö parimaid tavasid
- Leida kogukonna ressursse ja raamistikke MCP arenduseks

## MCP kogukonna ökosüsteem

MCP ökosüsteem koosneb erinevatest komponentidest ja osalejatest, kes teevad koostööd protokolli arendamiseks.

### Peamised kogukonna komponendid

1. **Põhiprotokolli hooldajad**: ametlik [Model Context Protocol GitHub organisatsioon](https://github.com/modelcontextprotocol) hooldab MCP põhispetsifikatsioone ja viite-implementatsioone
2. **Tööriistade arendajad**: üksikisikud ja meeskonnad, kes loovad MCP tööriistu ja servereid
3. **Integratsiooni pakkujad**: ettevõtted, kes integreerivad MCP oma toodetesse ja teenustesse
4. **Lõppkasutajad**: arendajad ja organisatsioonid, kes kasutavad MCP-d oma rakendustes
5. **Panustajad**: kogukonna liikmed, kes panustavad koodi, dokumentatsiooni või muid ressursse

### Kogukonna ressursid

#### Ametlikud kanalid

- [MCP GitHub organisatsioon](https://github.com/modelcontextprotocol)
- [MCP dokumentatsioon](https://modelcontextprotocol.io/)
- [MCP spetsifikatsioon](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub arutelud](https://github.com/orgs/modelcontextprotocol/discussions)
- [MCP näidiste ja serverite hoidla](https://github.com/modelcontextprotocol/servers)

#### Kogukonna loodud ressursid

- [MCP kliendid](https://modelcontextprotocol.io/clients) – MCP integratsioone toetavate klientide nimekiri
- [Kogukonna MCP serverid](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) – kasvav kogukonna poolt arendatud MCP serverite nimekiri
- [Awesome MCP serverid](https://github.com/wong2/awesome-mcp-servers) – kureeritud nimekiri MCP serveritest
- [PulseMCP](https://www.pulsemcp.com/) – kogukonna keskpunkt ja uudiskiri MCP ressursside avastamiseks
- [Discordi server](https://discord.gg/jHEGxQu2a5) – ühendus MCP arendajatega
- Keelespetsiifilised SDK implementatsioonid
- Blogipostitused ja juhendid

## Panustamine MCP-sse

### Panustamise liigid

MCP ökosüsteem tervitab erinevat tüüpi panuseid:

1. **Koodipanused**:
   - Põhiprotokolli täiustused
   - Vigade parandused
   - Tööriistade ja serverite implementatsioonid
   - Kliendi/serveri raamatukogud erinevates keeltes

2. **Dokumentatsioon**:
   - Oleva dokumentatsiooni parandamine
   - Juhendite ja õpetuste loomine
   - Dokumentatsiooni tõlkimine
   - Näidete ja proovirakenduste loomine

3. **Kogukonna tugi**:
   - Küsitlustele vastamine foorumites ja aruteludes
   - Testimine ja probleemide teatamine
   - Kogukonna ürituste korraldamine
   - Uute panustajate juhendamine

### Panustamise protsess: põhiprotokoll

Et panustada MCP põhiprotokolli või ametlikesse implementatsioonidesse, järgi neid põhimõtteid [ametlikust panustamise juhendist](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md):

1. **Lihtsus ja minimalistlikkus**: MCP spetsifikatsioon seab kõrge lati uute mõistete lisamiseks. Asju on lihtsam spetsifikatsioonist lisada kui eemaldada.

2. **Konkreetne lähenemine**: Spetsifikatsiooni muudatused peaksid põhinema kindlatel elluviimise väljakutsetel, mitte spekulatiivsetel ideedel.

3. **Pakkumise etapid**:
   - Määratle: Uuri probleemiruumi, veendu, et teistel MCP kasutajatel on sarnane probleem
   - Prototüüp: Ehita näidis lahendus ja näita selle praktilist rakendust
   - Kirjuta: Prototüübi põhjal kirjuta spetsifikatsiooni ettepanek

### Arenduskeskkonna seadistus

```bash
# Tee koopia hoidlast
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# Paigalda sõltuvused
npm install

# Shema muudatuste korral, valideeri ja genereeri schema.json:
npm run check:schema:ts
npm run generate:schema

# Dokumentatsiooni muudatuste jaoks
npm run check:docs
npm run format

# Eelvaata dokumentatsiooni lokaalselt (valikuline):
npm run serve:docs
```

### Näide: vigade paranduse panustamine

```javascript
// Originaalkood tüübiskript-moodulis veaga
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Viga: Puuduv atribuudi valideerimine
  // Praegune rakendus:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// Parandatud rakendus panuses
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Parendatud valideerimine
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### Näide: uue tööriista lisamine standardteeki

```python
# Näidiskontribuut: CSV andmetöötlustööriist MCP standardraamatukogule

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
            # Parameetrite väljavõtmine
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # Hangi CSV andmed kas otsesest andmest või URL-ilt
            df = await self._get_dataframe(request)
            
            # Töötle vastavalt nõutud operatsioonile
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
        # Rakendus hõlmaks erinevaid teisendusi
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

### Panustamise juhised

Eduka panuse tegemiseks MCP projektides:

1. **Alusta väikesest**: Alusta dokumentatsioonist, vigade parandustest või väikestest täiustustest
2. **Järgi stiilijuhendit**: Järgi projekti koodistiili ja konventsioone
3. **Kirjuta testid**: Lisa oma koodipanustele üksustestid
4. **Dokumenteeri oma töö**: Lisa uutele omadustele või muudatustele selge dokumentatsioon
5. **Esita sihitud PR-id**: Hoia pull request'id keskendunud ühele probleemile või funktsioonile
6. **Tee koostööd tagasisidega**: Ole vastuvõtlik oma panustele tulnud tagasisidele

### Näidispanuse töövoog

```bash
# Kopeeri hoidla
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# Loo uus haru oma panuse jaoks
git checkout -b feature/my-contribution

# Tee oma muudatused
# ...

# Käivita testid, et veenduda, et sinu muudatused ei riku olemasolevat funktsionaalsust
npm test

# Tee muudatuste commit kirjeldava sõnumiga
git commit -am "Fix validation in resource handler"

# Lükka oma haru oma fork'i
git push origin feature/my-contribution

# Tee oma harust pull request pea hoidlasse
# Seejärel võta vastu tagasisidet ja korda vajadusel oma PR-i
```

## MCP serverite loomine ja jagamine

Üks väärtuslikumaid viise MCP ökosüsteemi panustamiseks on kohandatud MCP serverite loomine ja jagamine. Kogukond on juba arendanud sadu servereid erinevate teenuste ja kasutusjuhtude jaoks.

### MCP serveri arendusraamistikud

Mitmed raamistikud aitavad lihtsustada MCP serverite arendust:

1. **Ametlikud SDK-d** (vastavad [MCP spetsifikatsioonile 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **Kogukonna raamistikud**:
   - [MCP-Framework](https://mcp-framework.com/) – ehita MCP servereid elegantselt ja kiiresti TypeScriptis
   - [MCP deklaratiivne Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) – annotatsioonipõhised MCP serverid Java abil
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) – Java raamistik MCP serveritele
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) – stardiprojekt MCP serveritele Next.js-i jaoks

### Jagatavate tööriistade arendus

#### .NET näide: jagatava tööriistapaketi loomine

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

#### Java näide: Maven-paketi loomine tööriistadele

```java
// pom.xml konfiguratsioon jagatava MCP tööriistapaketi jaoks
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
            <url>https://maven.pkg.github.com/kasutajanimi/mcp-weather-tools</url>
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
        // Skeemi definitsioon...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // Kutsuge ilm API-d
            Map<String, Object> forecast = getForecast(location, days);
            
            // Koosta vastus
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // Rakendus kutsuks ilm API-d
        // Lihtsustatud näide
        Map<String, Object> result = new HashMap<>();
        // Lisa ilmaprognoosi andmed...
        return result;
    }
}

// Koosta ja avalda kasutades Maveni
// mvn clean package
// mvn deploy
```

#### Python näide: PyPI paketi avaldamine

```python
# PyPI paketi kaustastruktuur:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# Näide setup.py-st
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

# Näide NLP tööriista rakendusest (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # Laadi sentimentanalüüsi mudel
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
            # Eemalda parameetrid
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # Analüüsi sentimenti
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # Vorminda tulemus
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # Tagasta tulemus
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# Avaldamiseks:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### Parimate tavade jagamine

MCP tööriistade jagamisel kogukonnaga:

1. **Täielik dokumentatsioon**:
   - Kirjelda eesmärki, kasutust ja näiteid
   - Selgita parameetreid ja tagastatavaid väärtusi
   - Dokumenteeri kõik välised sõltuvused

2. **Vigade käsitlemine**:
   - Rakenda tugev vigade käsitlemine
   - Paku kasulikke veateateid
   - Käsitle äärmusjuhtumeid hoolikalt

3. **Jõudluse kaalutlused**:
   - Optimeeri nii kiiruse kui ressursside kasutuse osas
   - Rakenda vajadusel vahemällu salvestamist
   - Mõtle skaleeritavusele

4. **Turvalisus**:
   - Kasuta turvalisi API võtmeid ja autentimist
   - Kontrolli ja puhasta sisendeid
   - Rakenda väliste API kõnede kiirusepiirangut

5. **Testimine**:
   - Lisa põhjalik testide katvus
   - Testi erinevate sisendite ja äärepuhuste korral
   - Dokumenteeri testide käigus toimuv

## Kogukonna koostöö ja parimad tavad

Tõhus koostöö on olulise tähtsusega MCP ökosüsteemi eduks.

### Suhtluskanalid

- GitHubi Issue'd ja arutelud
- Microsoft Tech Community
- Discordi ja Slacki kanalid
- Stack Overflow (silt: `model-context-protocol` või `mcp`)

### Koodikontrollid

MCP panuste ülevaatamisel:

1. **Selgus**: Kas kood on selge ja hästi dokumenteeritud?
2. **Õigsus**: Kas see töötab ootuspäraselt?
3. **Järjepidevus**: Kas see järgib projekti konventsioone?
4. **Täielikkus**: Kas testid ja dokumentatsioon on kaasatud?
5. **Turvalisus**: Kas esineb turvalisusega seotud muresid?

### Versioonide ühilduvus

MCP jaoks arendamisel:

1. **Protokolli versioonimine**: Järgi MCP protokolli versiooni, mida su tööriist toetab
2. **Kliendi ühilduvus**: Mõtle tagurpidi ühilduvusele
3. **Serveri ühilduvus**: Järgi serveri implementatsiooni juhiseid
4. **Katkestavad muudatused**: Dokumenteeri selgelt kõik katkestavad muudatused

## Näide kogukonna projektist: MCP tööriistade register

Oluline kogukonna panus võiks olla avaliku MCP tööriistade registri arendamine.

```python
# Näidisskeem kogukonna tööriistaregistri API jaoks

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# Tööriistaregistri mudelid
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

# Registeri FastAPI rakendus
app = FastAPI(title="MCP Tool Registry")

# Selle näite jaoks mälu-põhine andmebaas
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

## Peamised järeldused

- MCP kogukond on mitmekesine ja tervitab erinevat tüüpi panuseid
- Panustamine MCP-sse võib olla nii põhiprotokolli täiustused kui ka kohandatud tööriistad
- Panustamise juhiste järgimine suurendab PR aktsepteerimise tõenäosust
- MCP tööriistade loomine ja jagamine on väärtuslik viis ökosüsteemi rikastamiseks
- Kogukonna koostöö on MCP kasvu ja arengu jaoks hädavajalik

## Harjutus

1. Tuvasta MCP ökosüsteemis valdkond, kuhu sa saaksid oma oskuste ja huvide põhjal panustada
2. Hajuta MCP hoidla ja sea üles kohalik arenduskeskkond
3. Loo väike täiustus, vigade parandus või tööriist, mis tooks kasu kogukonnale
4. Dokumenteeri oma panus koos vajalike testide ja dokumentatsiooniga
5. Esita sobivasse hoidlas pull request

## Täiendavad ressursid

- [MCP kogukonnaprojektid](https://github.com/topics/model-context-protocol)

---

## Mis järgmiseks

Järgmine: [Õppetunnid varajasest kasutuselevõtust](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud kasutades tehisintellektil põhinevat tõlke teenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi püüdleme täpsuse poole, palun pidage meeles, et automaatsed tõlked võivad sisaldada vigu või ebatäpsusi. Algne dokument selle emakeeles tuleks pidada usaldusväärseks allikaks. Tähtsa teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tekkida võivate arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->