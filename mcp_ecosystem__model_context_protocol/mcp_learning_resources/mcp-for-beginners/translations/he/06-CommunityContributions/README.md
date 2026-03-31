# קהילה ותרומות

[![איך לתרום ל- MCP: כלים, תיעוד, קוד ועוד](../../../translated_images/he/07.1179f6de46ff196e.webp)](https://youtu.be/v1pvCYAWpRE)

_(לחץ על התמונה למעלה כדי לצפות בסרטון של השיעור הזה)_

## סקירה כללית

שיעור זה מתמקד כיצד להשתתף בקהילת MCP, לתרום לאקוסיסטם של MCP, ולעקוב אחר שיטות עבודה מומלצות לפיתוח שיתופי. הבנת הדרך להשתתף בפרויקטים של MCP בקוד פתוח היא חיונית עבור אלו המעוניינים לעצב את עתיד הטכנולוגיה הזאת.

## מטרות הלמידה

בסיום השיעור תוכל:

- להבין את מבנה הקהילה והאקוסיסטם של MCP
- להשתתף בצורה אפקטיבית בפורומים ודיונים של קהילת MCP
- לתרום למאגרי הקוד הפתוח של MCP
- ליצור ולשתף כלים ושרתים מותאמים אישית של MCP
- לעקוב אחר שיטות עבודה מומלצות לפיתוח ושיתוף ב-MCP
- לגלות משאבים ומסגרות קהילתיות לפיתוח MCP

## האקוסיסטם של קהילת MCP

האקוסיסטם של MCP מורכב מרכיבים ומשתתפים שונים שעובדים יחד לקידום הפרוטוקול.

### רכיבי הקהילה המרכזיים

1. **אחראים על פרוטוקול הליבה**: ארגון GitHub הרשמי של [Model Context Protocol](https://github.com/modelcontextprotocol) מנהל את המפרטים הראשיים והיישומים ההתייחסותיים של MCP
2. **מפתחי כלים**: יחידים וצוותים שיוצרים כלים ושרתים ל-MCP
3. **ספקי אינטגרציה**: חברות שמשלבות את MCP במוצרים ובשירותים שלהן
4. **משתמשים סופיים**: מפתחים וארגונים שמשתמשים ב-MCP באפליקציות שלהם
5. **תורמים**: חברי קהילה שתורמים קוד, תיעוד או משאבים אחרים

### משאבים קהילתיים

#### ערוצים רשמיים

- [ארגון MCP ב-GitHub](https://github.com/modelcontextprotocol)
- [תיעוד MCP](https://modelcontextprotocol.io/)
- [מפרט MCP](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [דיונים ב-GitHub](https://github.com/orgs/modelcontextprotocol/discussions)
- [מאגר דוגמאות ושרתים של MCP](https://github.com/modelcontextprotocol/servers)

#### משאבים בהובלת הקהילה

- [לקוחות MCP](https://modelcontextprotocol.io/clients) - רשימה של לקוחות התומכים באינטגרציות MCP
- [שרתים קהילתיים של MCP](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) - רשימה מתפתחת של שרתים שפותחו על ידי הקהילה
- [שרתים מצוינים של MCP](https://github.com/wong2/awesome-mcp-servers) - רשימה נבחרת של שרתי MCP
- [PulseMCP](https://www.pulsemcp.com/) - מרכז קהילתי ועלון גיליון לגילוי משאבים של MCP
- [שרת דיסקורד](https://discord.gg/jHEGxQu2a5) - התחברו עם מפתחי MCP
- מימושי SDK לשפות שונות
- פוסטים בבלוג וסרטוני הדרכה

## תרומה ל-MCP

### סוגי התרומות

האקו-סיסטם של MCP מקבל בברכה סוגים שונים של תרומות:

1. **תרומות קוד**:
   - שיפורים בפרוטוקול הליבה
   - תיקוני באגים
   - יישומי כלים ושרתים
   - ספריות לקוח/שרת בשפות שונות

2. **תיעוד**:
   - שיפור תיעוד קיים
   - יצירת הדרכות ומדריכים
   - תרגום תיעוד
   - יצירת דוגמאות ואפליקציות לדוגמה

3. **תמיכה בקהילה**:
   - מענה לשאלות בפורומים ובדיונים
   - בדיקות ודיווח על בעיות
   - ארגון אירועים קהילתיים
   - חונכות לתורמים חדשים

### תהליך התרומה: פרוטוקול הליבה

כדי לתרום לפרוטוקול הליבה של MCP או ליישומים הרשמיים, עקוב אחרי העקרונות מתוך [הנחיות התרומה הרשמיות](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/CONTRIBUTING.md):

1. **פשטות ומינימליזם**: מפרט MCP מכתיב רף גבוה להוספת מושגים חדשים. קל יותר להוסיף דברים למפרט מאשר להסיר.

2. **גישה קונקרטית**: שינויים במפרט צריכים להתבסס על אתגרים יישומיים ספציפיים, לא על ספקולציות.

3. **שלבי הצעת פתרון**:
   - הגדרה: חקר את הבעיה, ואימות שיתר משתמשי MCP נתקלים בבעיה דומה
   - פרוטוטייפ: בנה דוגמה והראה את השימוש המעשי שלה
   - כתיבה: בהתבסס על הפרוטוטייפ, כתוב הצעת מפרט

### הגדרת סביבת הפיתוח

```bash
# פורק את המאגר
git clone https://github.com/YOUR-USERNAME/modelcontextprotocol.git
cd modelcontextprotocol

# התקן תלותיות
npm install

# עבור שינויים בסכמה, אשר וצרף schema.json:
npm run check:schema:ts
npm run generate:schema

# עבור שינויים בתיעוד
npm run check:docs
npm run format

# הצג תיעוד במחשב המקומי (אופציונלי):
npm run serve:docs
```

### דוגמה: תרומת תיקון באג

```javascript
// קוד מקורי עם באג ב-typescript-sdk
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // באג: חסר אימות תכונה
  // מימוש נוכחי:
  const hasName = 'name' in resource;
  const hasSchema = 'schema' in resource;
  
  return hasName && hasSchema;
}

// מימוש מתוקן בתרומה
export function validateResource(resource: unknown): resource is MCPResource {
  if (!resource || typeof resource !== 'object') {
    return false;
  }
  
  // שיפור באימות
  const hasName = 'name' in resource && typeof (resource as MCPResource).name === 'string';
  const hasSchema = 'schema' in resource && typeof (resource as MCPResource).schema === 'object';
  const hasDescription = !('description' in resource) || typeof (resource as MCPResource).description === 'string';
  
  return hasName && hasSchema && hasDescription;
}
```

### דוגמה: תרומת כלי חדש לספרייה סטנדרטית

```python
# דוגמת תרומה: כלי לעיבוד נתוני CSV לספריית הסטנדרט MCP

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
            # חילוץ פרמטרים
            operation = request.parameters.get("operation")
            output_format = request.parameters.get("outputFormat", "json")
            
            # קבלת נתוני CSV מגליון ישיר או כתובת URL
            df = await self._get_dataframe(request)
            
            # עיבוד בהתאם לפעולה המבוקשת
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
        # המימוש יכלול טרנספורמציות שונות
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

### הנחיות תרומה

כדי להצליח לתרום לפרויקטים של MCP:

1. **התחל קטן**: התחל בתיעוד, תיקוני באגים, או שיפורים קטנים
2. **עקוב אחר מדריך הסגנון**: שמור על סגנון קוד וקונבנציות הפרויקט
3. **כתוב בדיקות**: כלל בדיקות יחידה לתרומות הקוד שלך
4. **תעד את עבודתך**: הוסף תיעוד ברור לתכונות חדשות או שינויים
5. **הגש בקשות משיכה ממוקדות**: שמור על בקשות משיכה ממוקדות לסוגיה או תכונה אחת
6. **שיתוף פעולה עם משוב**: היה תגובתי למשוב על התרומות שלך

### דוגמה לזרימת עבודה לתרומה

```bash
# שכפול המאגר
git clone https://github.com/modelcontextprotocol/typescript-sdk.git
cd typescript-sdk

# צור סניף חדש לתרומתך
git checkout -b feature/my-contribution

# בצע את השינויים שלך
# ...

# הרץ בדיקות כדי לוודא שהשינויים שלך לא שוברים פונקציונליות קיימת
npm test

# בצע התחייבות לשינויים שלך עם הודעה מתארת
git commit -am "Fix validation in resource handler"

# דחוף את הסניף שלך לפורק שלך
git push origin feature/my-contribution

# צור בקשת מיזוג מהסניף שלך למאגר הראשי
# לאחר מכן, התייחס למשוב וחזור על בקשת המיזוג לפי הצורך
```

## יצירת ושיתוף שרתי MCP

אחת הדרכים החשובות לתרום לאקוסיסטם MCP היא ליצור ולשתף שרתי MCP מותאמים אישית. הקהילה כבר פיתחה מאות שרתים לשירותים ואפשרויות שימוש שונות.

### מסגרות לפיתוח שרתי MCP

זמינות כמה מסגרות שמפשטות את פיתוח שרתי MCP:

1. **SDK רשמיים** (תואמים עם [מפרט MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
   - [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
   - [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
   - [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)
   - [Go SDK](https://github.com/modelcontextprotocol/go-sdk)
   - [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
   - [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
   - [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk)
   - [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk)

2. **מסגרות קהילתיות**:
   - [MCP-Framework](https://mcp-framework.com/) - בניית שרתי MCP ביופי ומהירות ב-TypeScript
   - [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) - שרתי MCP מונעי אנוטציות עם Java
   - [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) - מסגרת Java לשרתי MCP
   - [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) - פרויקט התחלה ב-Next.js לשרתי MCP

### פיתוח כלים לשיתוף

#### דוגמת .NET: יצירת חבילת כלים לשיתוף

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

#### דוגמת Java: יצירת חבילת Maven לכלים

```java
// קובץ תצורה pom.xml לחבילת כלי MCP שניתן לשתף
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
        // הגדרת סכימה...
        return schema;
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        try {
            String location = request.getParameters().get("location").asText();
            int days = request.getParameters().has("days") ? 
                request.getParameters().get("days").asInt() : 3;
            
            // קריאה ל-API מזג האוויר
            Map<String, Object> forecast = getForecast(location, days);
            
            // בניית תגובה
            return new ToolResponse.Builder()
                .setResult(forecast)
                .build();
        } catch (Exception ex) {
            throw new ToolExecutionException("Weather forecast failed: " + ex.getMessage(), ex);
        }
    }
    
    private Map<String, Object> getForecast(String location, int days) {
        // יישום שיקרא ל-API מזג האוויר
        // דוגמה מפושטת
        Map<String, Object> result = new HashMap<>();
        // הוסף נתוני תחזית...
        return result;
    }
}

// בנייה ופרסום באמצעות Maven
// mvn clean package
// mvn deploy
```

#### דוגמת Python: פרסום חבילת PyPI

```python
# מבנה תיקיות עבור חבילת PyPI:
# mcp_nlp_tools/
# ├── רישיון
# ├── קובץ README.md
# ├── קובץ setup.py
# ├── תיקיית mcp_nlp_tools/
# │   ├── הקובץ __init__.py
# │   ├── קובץ sentiment_tool.py
# │   └── קובץ translation_tool.py

# דוגמה לקובץ setup.py
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

# דוגמה ליישום כלי NLP (sentiment_tool.py)
from mcp_tools import Tool, ToolRequest, ToolResponse, ToolExecutionException
from transformers import pipeline
import torch

class SentimentAnalysisTool(Tool):
    """MCP tool for sentiment analysis of text"""
    
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        # טען את מודל ניתוח הסנטימנט
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
            # חילוץ פרמטרים
            text = request.parameters.get("text")
            include_score = request.parameters.get("includeScore", True)
            
            # נתח את הסנטימנט
            sentiment_result = self.sentiment_analyzer(text)[0]
            
            # עיצוב התוצאה
            result = {
                "sentiment": sentiment_result["label"],
                "text": text
            }
            
            if include_score:
                result["score"] = sentiment_result["score"]
            
            # החזר את התוצאה
            return ToolResponse(result=result)
            
        except Exception as e:
            raise ToolExecutionException(f"Sentiment analysis failed: {str(e)}")

# לפרסום:
# python setup.py sdist bdist_wheel
# python -m twine upload dist/*
```

### שיתוף שיטות עבודה מומלצות

בעת שיתוף כלים של MCP עם הקהילה:

1. **תיעוד מלא**:
   - תעד מטרות, שימוש, ודוגמאות
   - הסבר פרמטרים וערכי החזרה
   - תעד תלות חיצונית במידת הצורך

2. **ניהול שגיאות**:
   - יישם טיפול שגיאות מקיף
   - ספק הודעות שגיאה מועילות
   - טיפול במקרים קיצוניים בצורה אלגנטית

3. **שיקולי ביצועים**:
   - אופטימיזציה למהירות ולשימוש במשאבים
   - יישם מטמון במידת הצורך
   - שקול קנה מידה

4. **אבטחה**:
   - השתמש במפתחות API מאובטחים ואימות
   - אמת ונקה קלטים
   - יישם הגבלת קצב לקריאות חיצוניות

5. **בדיקות**:
   - כלל כיסוי בדיקות מקיף
   - בדוק עם סוגי קלט שונים ומקרים קיצוניים
   - תעד את נהלי הבדיקה

## שיתוף פעולה קהילתי ושיטות עבודה מומלצות

שיתוף פעולה אפקטיבי הוא מפתח לאקוסיסטם MCP משגשג.

### ערוצי תקשורת

- נושאים ודיונים ב-GitHub
- קהילת Microsoft Tech
- ערוצי Discord ו-Slack
- Stack Overflow (תג: `model-context-protocol` או `mcp`)

### ביקורות קוד

בעת סקירת תרומות ל-MCP:

1. **בהירות**: האם הקוד ברור ומתועד היטב?
2. **תקינות**: האם הוא עובד כמצופה?
3. **עקביות**: האם הוא עוקב אחרי קונבנציות הפרויקט?
4. **שלימות**: האם כלולים בדיקות ותיעוד?
5. **אבטחה**: האם קיימות סוגיות אבטחה?

### תאימות לגרסאות

בעת פיתוח ל-MCP:

1. **גרסת פרוטוקול**: הישמע לגרסת הפרוטוקול שהכלי שלך תומך בה
2. **תאימות לקוחות**: שקול תאימות לאחור
3. **תאימות שרתים**: עקוב אחר הנחיות יישום שרתים
4. **שינויים לא תואמים**: תעד שינויים שבורים בבירור

## פרויקט קהילתי לדוגמה: רישום כלים של MCP

תרומה קהילתית חשובה יכולה להיות פיתוח רישום ציבורי לכלי MCP.

```python
# דוגמת סכימה לממשק API של רישום כלים קהילתי

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
import datetime
import uuid

# מודלים לרישום הכלים
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

# אפליקציית FastAPI לרישום
app = FastAPI(title="MCP Tool Registry")

# בסיס נתונים בזיכרון לדוגמה הזו
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

## נקודות מפתח

- קהילת MCP מגוונת ומקבלת מגוון תרומות
- תרומה ל-MCP יכולה לכלול שיפורי פרוטוקול ועד כלים מותאמים אישית
- הקפדה על הנחיות תרומה משפרת את הסיכוי לאישור בקשות משיכה
- יצירה ושיתוף של כלים ל-MCP הם דרך חשובה להעשיר את האקוסיסטם
- שיתוף פעולה קהילתי חיוני לצמיחה ושיפור MCP

## תרגיל

1. זהה תחום באקו-סיסטם של MCP שבו תוכל לתרום בהתאם לכישורים ותחומי העניין שלך
2. ספר את מאגר ה-MCP והקם סביבת פיתוח מקומית
3. צור שיפור קטן, תיקון באג, או כלי שישפר את הקהילה
4. תעד את תרומתך עם בדיקות ותיעוד נאותים
5. הגש בקשת משיכה למאגר המתאים

## משאבים נוספים

- [פרויקטים קהילתיים של MCP](https://github.com/topics/model-context-protocol)

---

## מה הלאה

הבא: [שיעורים מאימוץ מוקדם](../07-LessonsfromEarlyAdoption/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:  
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). אף שאנו שואפים לדיוק, יש לזכור כי תרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. המסמך המקורי בשפת המקור שלו הוא המקור הרשמי והמהימן. למידע קריטי מומלץ להשתמש בתרגום מקצועי של אדם. איננו נושאים באחריות על כל אי הבנות או פרשנויות שגויות הנובעות מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->