# Comunitatea și Contribuțiile

[![Cum să contribui la MCP: Unelte, Documentație, Cod și altele](../../../translated_images/ro/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(Click pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_

## Prezentare generală

Această lecție se concentrează pe modul de a te implica în comunitatea MCP, de a contribui la ecosistemul MCP și de a urma cele mai bune practici pentru dezvoltarea colaborativă. Înțelegerea modului de participare la proiectele open-source MCP este esențială pentru cei care doresc să modeleze viitorul acestei tehnologii.

## Obiective de învățare

La finalul acestei lecții, vei putea:

- Înțelege structura comunității și ecosistemului MCP
- Participa eficient în forumurile și discuțiile comunității MCP
- Contribui la depozitele open-source MCP
- Crea și împărtăși unelte și servere MCP personalizate
- Urma cele mai bune practici pentru dezvoltarea și colaborarea MCP
- Descoperi resurse și cadre comunitare pentru dezvoltarea MCP

## Ecosistemul Comunității MCP

Ecosistemul MCP este format din diverse componente și participanți care lucrează împreună pentru a avansa protocolul.

### Componente Cheie ale Comunității

1. **Menținătorii Protocolului de Bază**: Organizația oficială [Model Context Protocol GitHub](https://github.com/modelcontextprotocol) menține specificațiile de bază MCP și implementările de referință
2. **Dezvoltatori de Unelte**: Persoane și echipe care creează unelte și servere MCP
3. **Furnizori de Integrare**: Companii care integrează MCP în produsele și serviciile lor
4. **Utilizatori Finali**: Dezvoltatori și organizații care folosesc MCP în aplicațiile lor
5. **Contribuitori**: Membri ai comunității care contribuie cu cod, documentație sau alte resurse

### Resurse Comunitare

#### Canale Oficiale

- [Organizația MCP pe GitHub](https://github.com/modelcontextprotocol)
- [Documentația MCP](https://modelcontextprotocol.io/)
- [Specificația MCP](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Discuții GitHub](https://github.com/orgs/modelcontextprotocol/discussions)
- [Depozitul cu Exemple & Servere MCP](https://github.com/modelcontextprotocol/servers)

#### Resurse Comunitare

- [Clienți MCP](https://modelcontextprotocol.io/clients) - Listă de clienți care suportă integrări MCP
- [Servere MCP Comunitare](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - Listă în creștere de servere MCP dezvoltate de comunitate
- [Awesome MCP Servers](https://github.com/wong2/awesome-mcp-servers) - Listă curată de servere MCP
- [PulseMCP](https://www.pulsemcp.com/) - Hub comunitar și newsletter pentru descoperirea resurselor MCP
- [Server Discord](https://discord.gg/jHEGxQu2a5) - Conectează-te cu dezvoltatorii MCP
- Implementări SDK specifice limbajelor
- Postări pe blog și tutoriale

## Contribuind la MCP

### Tipuri de Contribuții

Ecosistemul MCP primește cu brațele deschise diverse tipuri de contribuții:

1. **Contribuții de Cod**:
   - Îmbunătățiri ale protocolului de bază
   - Remedierea erorilor
   - Implementarea de unelte și servere
   - Biblioteci client/server în diferite limbaje

2. **Documentație**:
   - Îmbunătățirea documentației existente
   - Crearea de tutoriale și ghiduri
   - Traducerea documentației
   - Crearea de exemple și aplicații demo

3. **Suport Comunitar**:
   - Răspuns la întrebări în forumuri și discuții
   - Testarea și raportarea problemelor
   - Organizarea de evenimente comunitare
   - Mentorat pentru noii contribuitori

### Procesul de Contribuție: Protocolul de Bază

Pentru a contribui la protocolul MCP de bază sau implementările oficiale, urmează aceste principii din [guideline-urile oficiale de contribuție](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md):

1. **Simplitate și Minimalism**: Specificația MCP menține un nivel înalt pentru adăugarea de noi concepte. Este mai ușor să adaugi lucruri într-o specificație decât să le elimini.

2. **Abordare Concretă**: Modificările specificației trebuie să se bazeze pe provocări specifice de implementare, nu pe idei speculative.

3. **Etapele unei Propuneri**:
   - Definire: Explorează problema, validează dacă alți utilizatori MCP întâmpină aceeași problemă
   - Prototip: Construiește o soluție exemplu și demonstrează aplicabilitatea sa practică
   - Scriere: Pe baza prototipului, scrie o propunere de specificație

### Configurarea Mediului de Dezvoltare

```bash
# Creează un fork al depozitului
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# Instalează dependențele
npm install

# Pentru modificările schemei, validează și generează schema.json:
npm run check:schema:ts
npm run generate:schema

# Pentru modificările documentației
npm run check:docs
npm run format

# Previzualizează documentația local (opțional):
npm run serve:docs
```

### Exemplu: Contribuirea unei Corecții de Bug

```javascript
// Cod original cu eroare în typescript-sdk
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Eroare: Lipsă validare proprietate
  // Implementare curentă:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// Implementare corectată într-o contribuție
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Validare îmbunătățită
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### Exemplu: Contribuirea unei Unelte noi în Librăria Standard

```python
# Exemplu de contribuție: Un instrument de procesare a datelor CSV pentru biblioteca standard MCP

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
            # Extrage parametrii
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # Preia date CSV fie din date directe, fie din URL
            df = await self._get_dataframe(request)
            
            # Procesează pe baza operațiunii solicitate
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
        # Implementarea ar include diverse transformări
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

### Linii Ghid pentru Contribuții

Pentru a realiza o contribuție reușită la proiectele MCP:

1. **Începe Mic**: Începe cu documentația, remedierea bug-urilor sau îmbunătățiri mici
2. **Respectă Ghidul de Stil**: Urmează stilul de cod și convențiile proiectului
3. **Scrie Teste**: Include teste unitare pentru codul tău
4. **Documentează Lucrările**: Adaugă documentație clară pentru caracteristici noi sau modificări
5. **Trimite PR-uri Țintite**: Menține pull request-urile focalizate pe o singură problemă sau caracteristică
6. **Implică-te cu Feedback-ul**: Fii receptiv la feedback-ul privind contribuțiile tale

### Exemplu de Flux de Lucru pentru Contribuție

```bash
# Clonează depozitul
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# Creează un nou branch pentru contribuția ta
git checkout -b feature/my-contribution

# Fă modificările tale
# ...

# Rulează testele pentru a te asigura că modificările tale nu stricăm funcționalitatea existentă
npm test

# Comite modificările tale cu un mesaj descriptiv
git commit -am "Fix validation in resource handler"

# Trimite branch-ul tău către fork-ul tău
git push origin feature/my-contribution

# Creează o cerere de pull din branch-ul tău către depozitul principal
# Apoi implică-te cu feedback-ul și iterează asupra PR-ului tău după cum este necesar
```

## Crearea și Partajarea Serverelor MCP

Una dintre cele mai valoroase modalități de a contribui la ecosistemul MCP este crearea și partajarea de servere MCP personalizate. Comunitatea a dezvoltat deja sute de servere pentru diverse servicii și cazuri de utilizare.

### Cadre de Dezvoltare pentru Servere MCP

Sunt disponibile mai multe cadre pentru a simplifica dezvoltarea serverelor MCP:

1. **SDK-uri Oficiale** (aliniate cu [Specificația MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **Cadre Comunitare**:
   - [MCP-Framework](https://mcp-framework.com/) - Construiește servere MCP cu eleganță și viteză în TypeScript
   - [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - Servere MCP bazate pe adnotări în Java
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) - Cadru Java pentru servere MCP
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) - Proiect starter Next.js pentru servere MCP

### Dezvoltarea Uneltelor Partajabile

#### Exemplu .NET: Crearea unui Pachet de Unelte Partajabile

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

#### Exemplu Java: Crearea unui Pachet Maven pentru Unelte

```java
// configurație pom.xml pentru un pachet de unelte MCP partajabil
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
        // Definiția schemei...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // Apelează API-ul meteo
            Map<String, Object> forecast = getForecast(location, days);
            
            // Construiește răspunsul
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // Implementarea ar apela API-ul meteo
        // Exemplu simplificat
        Map<String, Object> result = new HashMap<>();
        // Adaugă datele prognozei...
        return result;
    }
}

// Construiește și publică folosind Maven
// mvn clean package
// mvn deploy
```

#### Exemplu Python: Publicarea unui Pachet PyPI

```python
# Structura directoarelor pentru un pachet PyPI:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# Exemplu setup.py
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

# Exemplu de implementare a unui instrument NLP (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # Încarcă modelul de analiză a sentimentului
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
            # Extrage parametrii
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # Analizează sentimentul
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # Formatează rezultatul
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # Returnează rezultatul
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# Pentru a publica:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### Practici Recomandate pentru Distribuire

Când partajezi unelte MCP cu comunitatea:

1. **Documentație Completă**:
   - Documentează scopul, utilizarea și exemplele
   - Explică parametrii și valorile de retur
   - Documentează orice dependențe externe

2. **Gestionarea Erorilor**:
   - Implementează tratarea robustă a erorilor
   - Oferă mesaje de eroare utile
   - Gestionează elegant cazurile-limită

3. **Considerații de Performanță**:
   - Optimizează atât viteza, cât și utilizarea resurselor
   - Implementează caching atunci când este cazul
   - Ia în considerare scalabilitatea

4. **Securitate**:
   - Folosește chei API și autentificare securizate
   - Validează și sanitizează inputurile
   - Implementează limitarea ratei pentru apelurile API externe

5. **Testare**:
   - Include o acoperire largă a testelor
   - Testează cu diferite tipuri de input și cazuri-limită
   - Documentează procedurile de testare

## Colaborare Comunitară și Cele Mai Bune Practici

Colaborarea eficientă este cheia unui ecosistem MCP prosper.

### Canale de Comunicare

- Probleme și Discuții pe GitHub
- Microsoft Tech Community
- Canale Discord și Slack
- Stack Overflow (tag: `model-context-protocol` sau `mcp`)

### Revizuirea Codului

Când revizuiești contribuțiile MCP:

1. **Claritate**: Este codul clar și bine documentat?
2. **Corectitudine**: Funcționează conform așteptărilor?
3. **Consistență**: Urmează convențiile proiectului?
4. **Completitudine**: Sunt incluse teste și documentație?
5. **Securitate**: Există preocupări legate de securitate?

### Compatibilitatea Versiunilor

Când dezvolți pentru MCP:

1. **Versionarea Protocolului**: Respectă versiunea protocolului MCP suportată de uneltele tale
2. **Compatibilitatea Clientului**: Ia în considerare compatibilitatea inversă
3. **Compatibilitatea Serverului**: Urmează ghidurile de implementare server
4. **Modificări Breaking**: Documentează clar orice modificări care rup compatibilitatea

## Exemplu de Proiect Comunitar: Registrul de Unelte MCP

O contribuție importantă a comunității ar putea fi dezvoltarea unui registru public pentru uneltele MCP.

```python
# Exemplu de schemă pentru un API de registru de unelte comunitar

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# Modele pentru registrul de unelte
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

# Aplicație FastAPI pentru registru
app = FastAPI(title="MCP Tool Registry")

# Bază de date în memorie pentru acest exemplu
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

## Puncte Cheie

- Comunitatea MCP este diversă și primește cu brațele deschise diverse tipuri de contribuții
- Contribuțiile MCP pot varia de la îmbunătățiri ale protocolului de bază până la unelte personalizate
- Urmarea ghidurilor de contribuție crește șansele ca PR-ul să fie acceptat
- Crearea și partajarea uneltelor MCP este o modalitate valoroasă de a îmbunătăți ecosistemul
- Colaborarea comunitară este esențială pentru creșterea și îmbunătățirea MCP

## Exercițiu

1. Identifică o zonă în ecosistemul MCP unde ai putea contribui pe baza abilităților și intereselor tale
2. Fork-uiește depozitul MCP și configurează un mediu local de dezvoltare
3. Creează o mică îmbunătățire, corecție de bug sau unealtă benefică pentru comunitate
4. Documentează contribuția ta cu teste și documentație corespunzătoare
5. Trimite un pull request către depozitul corespunzător

## Resurse Suplimentare

- [Proiecte Comunitare MCP](https://github.com/topics/model-context-protocol)

---

## Ce urmează

Următorul: [Lecții din adopția timpurie](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși depunem eforturi pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un traducător uman. Nu ne asumăm răspunderea pentru eventualele neînțelegeri sau interpretări greșite apărute ca urmare a utilizării acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->