# Bendruomenė ir indėliai

[![Kaip prisidėti prie MCP: įrankiai, dokumentacija, kodas ir dar daugiau](../../../translated_images/lt/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(Paspauskite aukščiau esantį vaizdą, kad peržiūrėtumėte šios pamokos vaizdo įrašą)_

## Apžvalga

Šioje pamokoje dėmesys skiriamas MCP bendruomenei, kaip prisijungti prie jos, kaip prisidėti prie MCP ekosistemos ir kaip laikytis geriausių praktikos taisyklių dirbant kartu. Žinios, kaip dalyvauti atvirojo kodo MCP projektuose, yra esminės tiems, kurie nori formuoti šios technologijos ateitį.

## Mokymosi tikslai

Šios pamokos pabaigoje sugebėsite:

- Suprasti MCP bendruomenės ir ekosistemos struktūrą
- Efektyviai dalyvauti MCP bendruomenės forumuose ir diskusijose
- Prisidėti prie atvirojo kodo MCP saugyklų
- Kurti ir dalytis individualiais MCP įrankiais ir serveriais
- Laikytis geriausių MCP kūrimo ir bendradarbiavimo praktikų
- Atrasti bendruomenės išteklius ir karkasus MCP kūrimui

## MCP bendruomenės ekosistema

MCP ekosistema susideda iš įvairių komponentų ir dalyvių, kurie bendradarbiauja siekdami tobulinti protokolą.

### Pagrindiniai bendruomenės komponentai

1. **Pagrindinio protokolo prižiūrėtojai**: Oficiali [Model Context Protocol GitHub organizacija](https://github.com/modelcontextprotocol) prižiūri pagrindines MCP specifikacijas ir atitikmenų įgyvendinimus
2. **Įrankių kūrėjai**: Asmenys ir komandos, kurios kuria MCP įrankius ir serverius
3. **Integracijos tiekėjai**: Įmonės, integruojančios MCP į savo produktus ir paslaugas
4. **Galutiniai naudotojai**: Kūrėjai ir organizacijos, naudojančios MCP savo programose
5. **Prisidėtojai**: Bendruomenės nariai, kurie prisideda kodu, dokumentacija ar kitais ištekliais

### Bendruomenės ištekliai

#### Oficialūs kanalai

- [MCP GitHub organizacija](https://github.com/modelcontextprotocol)
- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub diskusijos](https://github.com/orgs/modelcontextprotocol/discussions)
- [MCP pavyzdžių ir serverių saugykla](https://github.com/modelcontextprotocol/servers)

#### Bendruomenės iniciatyvos ištekliai

- [MCP klientai](https://modelcontextprotocol.io/clients) - MCP integracijas palaikančių klientų sąrašas
- [Bendruomenės MCP serveriai](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - Vis didėjantis bendruomenės sukurtų MCP serverių sąrašas
- [Awesome MCP serveriai](https://github.com/wong2/awesome-mcp-servers) - Atrinktas MCP serverių sąrašas
- [PulseMCP](https://www.pulsemcp.com/) - Bendruomenės centras ir naujienlaiškis MCP ištekliams atrasti
- [Remote OpenClaw](https://www.remoteopenclaw.com/) - Nemokamas MCP serverių, agentų įgūdžių ir priedų paieškos katalogas
- [Discord serveris](https://discord.gg/jHEGxQu2a5) - Susisiekite su MCP kūrėjais
- SDK įgyvendinimai specifinėse programavimo kalbose
- Tinklaraščio įrašai ir pamokos

## Prisidėjimas prie MCP

### Prisidėjimo tipai

MCP ekosistema priima įvairius prisidėjimo būdus:

1. **Kodo prisidėjimai**:
   - Pagrindinio protokolo patobulinimai
   - Klaidų taisymai
   - Įrankių ir serverių įgyvendinimai
   - Klientų/serverių bibliotekos įvairiomis kalbomis

2. **Dokumentacija**:
   - Esamos dokumentacijos gerinimas
   - Pamokų ir gidų kūrimas
   - Dokumentacijos vertimas
   - Pavyzdžių ir demonstracinių programėlių kūrimas

3. **Bendruomenės palaikymas**:
   - Atsakymas į klausimus forumuose ir diskusijose
   - Testavimas ir problemų pranešimas
   - Bendruomenės renginių organizavimas
   - Naujų prisidėtojų mentorystė

### Prisidėjimo procesas: Pagrindinis protokolas

Norint prisidėti prie pagrindinio MCP protokolo ar oficialių įgyvendinimų, laikykitės principų iš [oficialių prisidėjimo gairių](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md):

1. **Paprastumas ir minimalizmas**: MCP specifikacija kelia aukštus reikalavimus naujoms sąvokoms pridėti. Lengviau pridėti ką nors prie specifikacijos nei tai pašalinti.

2. **Konkreti prieiga**: Specifikacijos pakeitimai turi būti grindžiami konkrečiomis įgyvendinimo problemomis, o ne spekuliatyviomis idėjomis.

3. **Pasiūlymo etapai**:
   - Apibrėžimas: Tyrinėti problemos sritį, patvirtinti, kad kiti MCP naudotojai susiduria su panašia problema
   - Prototipas: Sukurti pavyzdinį sprendimą ir parodyti jo praktinį taikymą
   - Rašymas: Remiantis prototipu, parašyti specifikacijos pasiūlymą

### Plėtros aplinkos pasiruošimas

```bash
# Sukurkite saugią saugyklos kopiją
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# Įdiekite priklausomybes
npm install

# Schema pakeitimams patikrinkite ir sugeneruokite schema.json:
npm run check:schema:ts
npm run generate:schema

# Dokumentacijos pakeitimams
npm run check:docs
npm run format

# Peržiūrėkite dokumentaciją vietoje (neprivaloma):
npm run serve:docs
```

### Pavyzdys: klaidos taisymo prisidėjimas

```javascript
// Originalus kodas su klaida typescript-sdk
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Klaida: Trūksta savybės patvirtinimo
  // Dabartinė įgyvendinimo versija:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// Ištaisyta įgyvendinimo versija indėlyje
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Patobulintas patvirtinimas
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### Pavyzdys: naujo įrankio pridėjimas į standartinę biblioteką

```python
# Pavyzdinė žinutė: CSV duomenų apdorojimo įrankis MCP standartinei bibliotekai

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
            # Išgauti parametrus
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # Gauti CSV duomenis iš tiesioginių duomenų arba URL
            df = await self._get_dataframe(request)
            
            # Apdoroti pagal užklausą vykdomą operaciją
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
        # Įgyvendinimas apimtų įvairius transformavimus
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

### Prisidėjimo gairės

Norint sėkmingai prisidėti prie MCP projektų:

1. **Pradėkite nuo mažų dalykų**: pradėkite nuo dokumentacijos, klaidų taisymų arba mažų patobulinimų
2. **Laikykitės stiliaus gairių**: laikykitės projekto kodavimo stiliaus ir susitarimų
3. **Rašykite testus**: pridėkite vienetinius testus savo kodo pakeitimams
4. **Dokumentuokite savo darbą**: aiškiai dokumentuokite naujas funkcijas ar pakeitimus
5. **Siųskite tikslias PR**: laikykite pull requestus viename klausime ar funkcijoje
6. **Reaguokite į atsiliepimus**: būkite atviri ir reaguokite į pateiktus atsiliepimus

### Prisidėjimo darbas – pavyzdys

```bash
# Klonuokite saugyklą
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# Sukurkite naują šaką savo indėliui
git checkout -b feature/my-contribution

# Atlikite savo pakeitimus
# ...

# Paleiskite testus, kad įsitikintumėte, jog jūsų pakeitimai nesugriauna esamos funkcionalumo
npm test

# Padarykite įsipareigojimą su aprašomuoju pranešimu
git commit -am "Fix validation in resource handler"

# Išspauskite savo šaką į savo fork'ą
git push origin feature/my-contribution

# Sukurkite pull request'ą iš savo šakos į pagrindinę saugyklą
# Tada reaguokite į atsiliepimus ir, jei reikia, tobulinkite savo PR
```

## MCP serverių kūrimas ir dalijimasis

Vienas vertingiausių būdų prisidėti prie MCP ekosistemos – kurti ir dalytis individualiais MCP serveriais. Bendruomenė jau sukūrė šimtus serverių įvairioms paslaugoms ir panaudojimo atvejams.

### MCP serverių kūrimo karkasai

Yra keletas karkasų, kurie palengvina MCP serverių kūrimą:

1. **Oficialūs SDK** (atitinka [MCP specifikaciją 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **Bendruomenės karkasai**:
   - [MCP-Framework](https://mcp-framework.com/) - kurkite MCP serverius elegantiškai ir greitai TypeScript kalba
   - [MCP deklaratyvus Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - anotacijomis grįsti MCP serveriai su Java
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) - Java karkasas MCP serveriams
   - [Next.js MCP serverio šablonas](https://github.com/vercel-labs/mcp-for-next.js) - pradinio lygio Next.js projektas MCP serveriams

### Dalinimosi įrankiais plėtra

#### .NET pavyzdys: dalinamo įrankio paketo sukūrimas

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

#### Java pavyzdys: Maven paketo įrankiams sukūrimas

```java
// pom.xml konfigūracija dalinamam MCP įrankių paketu
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
        // Schemos apibrėžimas...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // Kvieskite orų API
            Map<String, Object> forecast = getForecast(location, days);
            
            // Sukurkite atsakymą
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // Įgyvendinimas kvies orų API
        // Supaprastintas pavyzdys
        Map<String, Object> result = new HashMap<>();
        // Pridėti prognozės duomenis...
        return result;
    }
}

// Konstravimas ir skelbimas naudojant Maven
// mvn clean package
// mvn deploy
```

#### Python pavyzdys: PyPI paketo publikavimas

```python
# Katalogo struktūra PyPI paketui:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# Pavyzdinė setup.py
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

# Pavyzdinė NLP įrankio įgyvendinimas (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # Įkelti nuotaikų analizės modelį
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
            # Išgauti parametrus
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # Atlikti nuotaikos analizę
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # Suformatuoti rezultatą
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # Grąžinti rezultatą
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# Norint paskelbti:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### Dalinimosi geriausios praktikos

Dalindamiesi MCP įrankiais su bendruomene:

1. **Išsami dokumentacija**:
   - Dokumentuokite paskirtį, naudojimą ir pavyzdžius
   - Paaiškinkite parametrus ir grąžinamas reikšmes
   - Dokumentuokite bet kokias išorines priklausomybes

2. **Klaidų valdymas**:
   - Įgyvendinkite patikimą klaidų valdymą
   - Pateikite naudingas klaidų žinutes
   - Tvarkykite kraštutinius atvejus sklandžiai

3. **Veikimo našumas**:
   - Optimizuokite tiek greitį, tiek išteklių naudojimą
   - Naudokite kešavimą, kai tai tinka
   - Apsvarstykite mastelio keitimą

4. **Saugumas**:
   - Naudokite saugius API raktus ir autentifikavimą
   - Validuokite ir valykite įvestis
   - Įgyvendinkite išorinių API kvietimų dažnio ribojimą

5. **Testavimas**:
   - Apimkite išsamų testavimą
   - Testuokite įvairioms įvestims ir kraštutinėms situacijoms
   - Dokumentuokite testavimo procedūras

## Bendruomenės bendradarbiavimas ir geriausios praktikos

Efektyvus bendradarbiavimas yra esminis klestinčiai MCP ekosistemai.

### Ryšių kanalai

- GitHub problemos ir diskusijos
- Microsoft Tech Community
- Discord ir Slack kanalai
- Stack Overflow (žymos: `model-context-protocol` arba `mcp`)

### Kodo apžvalgos

Peržiūrint MCP prisidėjimus:

1. **Aiškumas**: Ar kodas aiškus ir gerai dokumentuotas?
2. **Teisingumas**: Ar jis veikia kaip numatyta?
3. **Nuoseklumas**: Ar laikomasi projekto konvencijų?
4. **Užbaigtumas**: Ar yra testai ir dokumentacija?
5. **Saugumas**: Ar yra saugumo problemų?

### Versijų suderinamumas

Kuriant MCP:

1. **Protokolo versijavimas**: Laikykitės MCP protokolo versijos, kurią palaiko jūsų įrankis
2. **Klientų suderinamumas**: Apsvarstykite senesnių versijų suderinamumą
3. **Serverių suderinamumas**: Laikykitės serverio įgyvendinimo taisyklių
4. **Reikšmingi pakeitimai**: Aiškiai dokumentuokite bet kokius reikšmingus pakeitimus

## Bendruomenės projekto pavyzdys: MCP įrankių registras

Svarbus bendruomenės indėlis galėtų būti viešo MCP įrankių registro kūrimas.

```python
# Pavyzdinis bendruomenės įrankių registro API schema

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# Modeliai įrankių registrui
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

# FastAPI taikymas registrui
app = FastAPI(title="MCP Tool Registry")

# Atmintyje laikoma duomenų bazė šiam pavyzdžiui
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

## Pagrindinės išvados

- MCP bendruomenė yra įvairiapusė ir priima įvairius prisidėjimus
- Prisidėjimas prie MCP gali būti nuo pagrindinio protokolo tobulinimų iki individualių įrankių kūrimo
- Laikymasis prisidėjimo gairių padidina jūsų PR priėmimo galimybes
- MCP įrankių kūrimas ir dalijimasis yra vertingas būdas stiprinti ekosistemą
- Bendruomenės bendradarbiavimas yra būtinas MCP augimui ir tobulėjimui

## Užduotis

1. Nustatykite MCP ekosistemos sritį, kurioje galėtumėte prisidėti pagal savo įgūdžius ir pomėgius
2. Sukurkite MCP saugyklos fork’ą ir pasiruoškite vietinę kūrimo aplinką
3. Sukurkite mažą patobulinimą, klaidos taisymą arba įrankį, kuris būtų naudingas bendruomenei
4. Dokumentuokite savo indėlį su tinkamais testais ir dokumentacija
5. Pateikite pull request į reikiamą saugyklą

## Papildomi ištekliai

- [MCP bendruomenės projektai](https://github.com/topics/model-context-protocol)

---

## Kas toliau

Toliau: [Pamokos apie ankstyvą priėmimą](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->