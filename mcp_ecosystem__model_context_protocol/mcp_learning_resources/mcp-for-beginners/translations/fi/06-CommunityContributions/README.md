# Yhteisö ja panostukset

[![Kuinka osallistua MCP:hen: Työkalut, dokumentaatio, koodi ja muuta](../../../translated_images/fi/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(Napsauta yllä olevaa kuvaa katsellaksesi tämän oppitunnin videota)_

## Yleiskatsaus

Tämä oppitunti keskittyy siihen, miten osallistua MCP-yhteisöön, tehdä panostuksia MCP-ekosysteemiin ja noudattaa parhaimpia käytäntöjä yhteiskehityksessä. Ymmärrys siitä, miten osallistua avoimen lähdekoodin MCP-projekteihin, on olennaista niille, jotka haluavat muokata tämän teknologian tulevaisuutta.

## Oppimistavoitteet

Tämän oppitunnin lopuksi osaat:

- Ymmärtää MCP-yhteisön ja ekosysteemin rakenteen
- Osallistua tehokkaasti MCP-yhteisön foorumeihin ja keskusteluihin
- Tehdä panostuksia MCP:n avoimen lähdekoodin arkistoihin
- Luoda ja jakaa mukautettuja MCP-työkaluja ja -palvelimia
- Noudattaa MCP-kehityksen ja yhteistyön parhaita käytäntöjä
- Löytää yhteisön resursseja ja kehyksiä MCP-kehitykseen

## MCP-yhteisöekosysteemi

MCP-ekosysteemi koostuu useista komponenteista ja toimijoista, jotka työskentelevät yhdessä protokollan kehittämiseksi.

### Keskeiset yhteisökomponentit

1. **Ydinprotokollan ylläpitäjät**: Virallinen [Model Context Protocol GitHub -organisaatio](https://github.com/modelcontextprotocol) ylläpitää MCP:n ydintarkoituksia ja referenssitoteutuksia
2. **Työkalujen kehittäjät**: Yksityishenkilöt ja tiimit, jotka luovat MCP-työkaluja ja -palvelimia
3. **Integraattoritoimittajat**: Yritykset, jotka integroivat MCP:n tuotteisiinsa ja palveluihinsa
4. **Loppukäyttäjät**: Kehittäjät ja organisaatiot, jotka käyttävät MCP:tä sovelluksissaan
5. **Panostajat**: Yhteisön jäsenet, jotka tuottavat koodia, dokumentaatiota tai muita resursseja

### Yhteisön resurssit

#### Viralliset kanavat

- [MCP GitHub -organisaatio](https://github.com/modelcontextprotocol)
- [MCP-dokumentaatio](https://modelcontextprotocol.io/)
- [MCP-määritys](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub-keskustelut](https://github.com/orgs/modelcontextprotocol/discussions)
- [MCP-esimerkit ja palvelimet -arkisto](https://github.com/modelcontextprotocol/servers)

#### Yhteisön ylläpitämät resurssit

- [MCP-asiakasohjelmat](https://modelcontextprotocol.io/clients) – Lista asiakasohjelmista, jotka tukevat MCP-integraatioita
- [Yhteisön MCP-palvelimet](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) – Kasvava lista yhteisön kehittämistä MCP-palvelimista
- [Awesome MCP -palvelimet](https://github.com/wong2/awesome-mcp-servers) – Valikoitu lista MCP-palvelimista
- [PulseMCP](https://www.pulsemcp.com/) – Yhteisökeskittymä ja uutiskirje MCP-resurssien löytämiseen
- [Discord-palvelin](https://discord.gg/jHEGxQu2a5) – Yhdistä MCP-kehittäjiin
- Kielenmukaiset SDK-toteutukset
- Blogikirjoitukset ja opetusohjelmat

## Osallistuminen MCP:hen

### Panostustyypit

MCP-ekosysteemi toivottaa tervetulleiksi monenlaiset panostukset:

1. **Koodipanokset**:
   - Ydintarkoituksen parannukset
   - Virheiden korjaukset
   - Työkalujen ja palvelinten toteutukset
   - Asiakas-/palvelinkirjastot eri kielillä

2. **Dokumentaatio**:
   - Olemassa olevan dokumentaation parantaminen
   - Opetusmateriaalien ja oppaiden luominen
   - Dokumentaation kääntäminen
   - Esimerkkien ja näytesovellusten luominen

3. **Yhteisötuki**:
   - Kysymysten vastaaminen foorumeilla ja keskusteluissa
   - Testaus ja vikailmoitukset
   - Yhteisötapahtumien järjestäminen
   - Uusien panostajien mentorointi

### Panostusprosessi: Ydintarkoitus

Ydintarkoitukseen tai virallisiin toteutuksiin osallistumiseksi noudata näitä periaatteita [virallisesta panostusohjeistuksesta](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md):

1. **Yksinkertaisuus ja minimalismi**: MCP-määrityksessä on korkea kynnys uusien käsitteiden lisäämiselle. On helpompi lisätä asioita määritykseen kuin poistaa niitä.

2. **Konkreettinen lähestymistapa**: Määritysmuutosten tulee perustua konkreettisiin toteutushaasteisiin, ei spekulatiivisiin ideoihin.

3. **Ehdotuksen vaiheet**:
   - Määrittele: Tutki ongelmakenttää, varmista, että muillakin MCP-käyttäjillä on sama ongelma
   - Prototyyppi: Rakenna esimerkkiratkaisu ja osoita sen käytännön soveltuvuus
   - Kirjoita: Prototyypin pohjalta laadi määritysehdotus

### Kehitysympäristön asetukset

```bash
# Haarauta repositorio
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# Asenna riippuvuudet
npm install

# Skeemamuutoksille, validoi ja luo schema.json:
npm run check:schema:ts
npm run generate:schema

# Dokumentaatiomuutoksille
npm run check:docs
npm run format

# Esikatsele dokumentaatiota paikallisesti (valinnainen):
npm run serve:docs
```

### Esimerkki: Virheenkorjauksen panostaminen

```javascript
// Alkuperäinen koodi, jossa on virhe typescript-sdk:ssä
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Virhe: Puuttuva ominaisuuden validointi
  // Nykyinen toteutus:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// Korjattu toteutus kontribuutiossa
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // Parannettu validointi
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### Esimerkki: Uuden työkalun lisääminen vakiokirjastoon

```python
# Esimerkkipanostus: CSV-datan käsittelytyökalu MCP-standardi kirjastolle

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
            # Poimi parametrit
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # Hae CSV-data joko suoraan datasta tai URL-osoitteesta
            df = await self._get_dataframe(request)
            
            # Käsittele pyydetyn toiminnon perusteella
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
        # Toteutus sisältäisi erilaisia muunnoksia
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

### Panostusohjeet

Menestyksellisen panostuksen tekemiseksi MCP-projekteihin:

1. **Aloita pienestä**: Aloita dokumentaatiosta, virheiden korjauksista tai pienistä parannuksista
2. **Noudata tyyliopasta**: Noudata projektin koodityyliä ja käytäntöjä
3. **Kirjoita testit**: Sisällytä yksikkötestit koodipanoksiisi
4. **Dokumentoi työsi**: Lisää selkeä dokumentaatio uusista ominaisuuksista tai muutoksista
5. **Lähetä kohdistettuja PR:itä**: Pidä vetopyynnöt keskittyneinä yhteen asiaan tai ominaisuuteen
6. **Osallistu palautteeseen**: Ole vastaanottavainen saamallesi palautteelle

### Esimerkkipanosprosessi

```bash
# Kopioi varasto
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# Luo uusi haara panoksellesi
git checkout -b feature/my-contribution

# Tee muutoksesi
# ...

# Aja testit varmistaaksesi, ettei muutoksesi riko olemassa olevaa toiminnallisuutta
npm test

# Tee commit kuvauksellisella viestillä
git commit -am "Fix validation in resource handler"

# Pushaa haarasi omaan forkkiisi
git push origin feature/my-contribution

# Luo pull request haarastasi päävarastoon
# Osallistu sitten palautteeseen ja tee tarvittaessa muutoksia PR:ään
```

## MCP-palvelinten luominen ja jakaminen

Yksi arvokkaimmista tavoista panostaa MCP-ekosysteemiin on luoda ja jakaa omia MCP-palvelimia. Yhteisö on jo kehittänyt satoja palvelimia erilaisiin palveluihin ja käyttötarkoituksiin.

### MCP-palvelimien kehityskehykset

Useita kehyksiä on saatavilla MCP-palvelimien kehityksen helpottamiseksi:

1. **Viralliset SDK:t** (yhteensopivat [MCP-määrityksen 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) kanssa):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **Yhteisön kehykset**:
   - [MCP-Framework](https://mcp-framework.com/) – Rakenna MCP-palvelimia sulavasti ja nopeasti TypeScriptillä
   - [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) – Merkintäpohjaiset MCP-palvelimet Javalla
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) – Java-kehys MCP-palvelimille
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) – Aloitusprojekti MCP-palvelimille Next.js:llä

### Jakokelpoisten työkalujen kehittäminen

#### .NET-esimerkki: Jaettavan työkalupaketin luominen

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

#### Java-esimerkki: Maven-paketin luominen työkaluja varten

```java
// pom.xml-konfiguraatio jaettavalle MCP-työkalupaketille
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
            <url>https://maven.pkg.github.com/käyttäjänimi/mcp-weather-tools</url>
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
        // Skeeman määrittely...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // Kutsu sää-API
            Map<String, Object> forecast = getForecast(location, days);
            
            // Rakenna vastaus
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // Toteutus kutsuisi sää-APIa
        // Yksinkertaistettu esimerkki
        Map<String, Object> result = new HashMap<>();
        // Lisää ennustetiedot...
        return result;
    }
}

// Rakenna ja julkaise Mavenilla
// mvn clean package
// mvn deploy
```

#### Python-esimerkki: PyPI-paketin julkaisu

```python
# Hakemistorakenne PyPI-pakettia varten:
# mcp_nlp_tools/
# ├── LICENSE
# ├── README.md
# ├── setup.py
# ├── mcp_nlp_tools/
# │   ├── __init__.py
# │   ├── sentiment_tool.py
# │   └── translation_tool.py

# Esimerkki setup.py
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

# Esimerkki NLP-työkalun toteutuksesta (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # Lataa tunnes analyysin malli
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
            # Erota parametrit
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # Analysoi tunne
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # Muotoile tulos
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # Palauta tulos
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# Julkaistaksesi:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### Jakamisen parhaat käytännöt

Kun jaat MCP-työkaluja yhteisölle:

1. **Täydellinen dokumentaatio**:
   - Kuvaa tarkoitus, käyttö ja esimerkit
   - Selitä parametrit ja paluuarvot
   - Dokumentoi ulkoiset riippuvuudet

2. **Virheiden käsittely**:
   - Toteuta luotettava virheenkäsittely
   - Tarjoa hyödyllisiä virheilmoituksia
   - Käsittele reunatapaukset sulavasti

3. **Suorituskykylähestymistavat**:
   - Optimoi sekä nopeuden että resurssien käytön suhteen
   - Toteuta välimuistitus tarvittaessa
   - Huomioi skaalausmahdollisuudet

4. **Tietoturva**:
   - Käytä turvallisia API-avaimia ja autentikointia
   - Tarkista ja puhdista syötteet
   - Toteuta kutsujen rajoitus ulkoisiin API:in

5. **Testaus**:
   - Sisällytä kattava testauksen kattavuus
   - Testaa eri syöte- ja reunatapauksilla
   - Dokumentoi testausmenettelyt

## Yhteisön yhteistyö ja parhaat käytännöt

Tehokas yhteistyö on avain menestyvään MCP-ekosysteemiin.

### Viestintäkanavat

- GitHub-ongelmat ja keskustelut
- Microsoft Tech Community
- Discord- ja Slack-kanavat
- Stack Overflow (tunniste: `model-context-protocol` tai `mcp`)

### Koodikatselmukset

MCP-panosten katselmoinnissa:

1. **Selkeys**: Onko koodi selkeää ja hyvin dokumentoitua?
2. **Oikeellisuus**: Toimiiko se odotetusti?
3. **Johdonmukaisuus**: Noudataanko projektin käytäntöjä?
4. **Täydellisyys**: Sisältääkö se testit ja dokumentaation?
5. **Turvallisuus**: Onko turvallisuus huomioitu?

### Versiokompatibiliteetti

MCP:lle kehitettäessä:

1. **Protokollan versiointi**: Noudata työkalusi tukemaa MCP-protokollaversiota
2. **Asiakaskompatibiliteetti**: Huomioi taaksepäin yhteensopivuus
3. **Palvelinkompatibiliteetti**: Noudata palvelintoteutusohjeita
4. **Rikkoivat muutokset**: Dokumentoi selkeästi kaikki rikkovat muutokset

## Esimerkkiyhteisöprojekti: MCP-työkalujen rekisteri

Tärkeä yhteisön panos voisi olla julkisen rekisterin kehittäminen MCP-työkaluille.

```python
# Esimerkkimalli yhteisötyökalujen rekisterin API:lle

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# Mallit työkalurekisterille
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

# FastAPI-sovellus rekisterille
app = FastAPI(title="MCP Tool Registry")

# Muistipohjainen tietokanta tähän esimerkkiin
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

## Keskeiset opit

- MCP-yhteisö on monimuotoinen ja toivottaa tervetulleiksi erilaiset panostustyypit
- MCP:hen osallistuminen voi olla ydintarkoituksen parannuksista mukautettuihin työkaluihin
- Panostusohjeiden noudattaminen parantaa vetopyyntösi hyväksymismahdollisuuksia
- MCP-työkalujen luominen ja jakaminen vahvistaa ekosysteemiä merkittävästi
- Yhteisön yhteistyö on elintärkeää MCP:n kasvulle ja kehitykselle

## Harjoitus

1. Tunnista MCP-ekosysteemistä alue, jossa voisit tehdä panostuksen taitojesi ja kiinnostuksesi perusteella
2. Tee fork MCP-arkistosta ja asenna paikallinen kehitysympäristö
3. Tee pieni parannus, virheenkorjaus tai työkalu, josta yhteisö hyötyy
4. Dokumentoi panoksesi asianmukaisilla testeillä ja dokumentaatiolla
5. Lähetä vetopyyntö sopivaan arkistoon

## Lisäresurssit

- [MCP-yhteisöprojektit](https://github.com/topics/model-context-protocol)

---

## Mitä seuraavaksi

Seuraavaksi: [Lessons from Early Adoption](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty tekoälykäännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattikäännöksissä saattaa esiintyä virheitä tai epätarkkuuksia. Alkuperäistä asiakirjaa sen alkuperäiskielellä tulee pitää virallisena lähteenä. Tärkeissä asioissa suositellaan ammattimaisen ihmiskääntäjän käyttöä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->