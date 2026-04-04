# MCP-Entwicklungs-Best-Practices

[![MCP-Entwicklungs-Best-Practices](../../../translated_images/de/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Klicken Sie auf das obige Bild, um das Video zu dieser Lektion anzusehen)_

## Überblick

Diese Lektion konzentriert sich auf fortgeschrittene Best Practices für die Entwicklung, das Testen und den Einsatz von MCP-Servern und -Funktionen in Produktionsumgebungen. Da MCP-Ökosysteme an Komplexität und Bedeutung zunehmen, sorgt die Einhaltung etablierter Muster für Zuverlässigkeit, Wartbarkeit und Interoperabilität. Diese Lektion fasst praktische Erkenntnisse aus realen MCP-Implementierungen zusammen, um Sie bei der Erstellung robuster, effizienter Server mit effektiven Ressourcen, Eingabeaufforderungen und Tools zu unterstützen.

## Lernziele

Am Ende dieser Lektion werden Sie in der Lage sein:

- Branchenbest Practices im Design von MCP-Servern und -Funktionen anzuwenden
- Umfassende Teststrategien für MCP-Server zu erstellen
- Effiziente, wiederverwendbare Workflow-Muster für komplexe MCP-Anwendungen zu entwerfen
- Eine ordnungsgemäße Fehlerbehandlung, Protokollierung und Beobachtbarkeit in MCP-Servern umzusetzen
- MCP-Implementierungen zur Optimierung von Leistung, Sicherheit und Wartbarkeit zu gestalten

## MCP-Kernprinzipien

Bevor wir in spezifische Implementierungspraktiken eintauchen, ist es wichtig, die Kernprinzipien zu verstehen, die eine wirksame MCP-Entwicklung leiten:

1. **Standardisierte Kommunikation**: MCP verwendet JSON-RPC 2.0 als Grundlage und bietet ein konsistentes Format für Anfragen, Antworten und Fehlerbehandlung in allen Implementierungen.

2. **Benutzerzentriertes Design**: Priorisieren Sie stets die Zustimmung, Kontrolle und Transparenz der Nutzer in Ihren MCP-Implementierungen.

3. **Sicherheit zuerst**: Implementieren Sie robuste Sicherheitsmaßnahmen einschließlich Authentifizierung, Autorisierung, Validierung und Ratenbegrenzung.

4. **Modulare Architektur**: Gestalten Sie Ihre MCP-Server modular, wobei jedes Tool und jede Ressource eine klare, fokussierte Aufgabe hat.

5. **Zustandsbehaftete Verbindungen**: Nutzen Sie die Fähigkeit von MCP, über mehrere Anfragen hinweg Zustand zu bewahren, für kohärentere und kontextbewusstere Interaktionen.

## Offizielle MCP-Best Practices

Die folgenden Best Practices stammen aus der offiziellen Model Context Protocol-Dokumentation:

### Sicherheits-Best Practices

1. **Benutzereinwilligung und Kontrolle**: Fordern Sie immer explizite Einwilligung des Benutzers ein, bevor Sie auf Daten zugreifen oder Operationen durchführen. Bieten Sie klare Kontrolle darüber, welche Daten geteilt und welche Aktionen autorisiert werden.

2. **Datenschutz**: Stellen Sie sicher, dass Benutzerdaten nur mit ausdrücklicher Zustimmung offengelegt und durch passende Zugriffssteuerungen geschützt werden. Verhindern Sie unbefugte Datenübertragungen.

3. **Werkzeugsicherheit**: Erfordern Sie eine explizite Benutzereinwilligung, bevor ein Werkzeug aufgerufen wird. Sorgen Sie dafür, dass Benutzer die Funktionalität jedes Werkzeugs verstehen und erzwingen Sie robuste Sicherheitsgrenzen.

4. **Werkzeug-Berechtigungskontrolle**: Konfigurieren Sie, welche Werkzeuge ein Modell während einer Sitzung verwenden darf, so dass nur ausdrücklich autorisierte Werkzeuge zugänglich sind.

5. **Authentifizierung**: Erfordern Sie eine ordnungsgemäße Authentifizierung vor dem Zugriff auf Werkzeuge, Ressourcen oder sensible Operationen mittels API-Schlüsseln, OAuth-Tokens oder anderen sicheren Authentifizierungsmethoden.

6. **Parameter-Validierung**: Erzwingen Sie Validierung bei allen Werkzeugaufrufen, um zu verhindern, dass fehlerhafte oder bösartige Eingaben an die Werkzeugimplementierung gelangen.

7. **Ratenbegrenzung**: Implementieren Sie Ratenbegrenzung, um Missbrauch zu verhindern und eine faire Nutzung der Serverressourcen sicherzustellen.

### Implementierungs-Best Practices

1. **Fähigkeitsverhandlung**: Tauschen Sie während des Verbindungsaufbaus Informationen über unterstützte Funktionen, Protokollversionen, verfügbare Werkzeuge und Ressourcen aus.

2. **Werkzeug-Design**: Entwickeln Sie fokussierte Werkzeuge, die eine Aufgabe gut erfüllen, statt monolithische Werkzeuge, die mehrere Aspekte gleichzeitig behandeln.

3. **Fehlerbehandlung**: Implementieren Sie standardisierte Fehlermeldungen und Codes, um Probleme zu diagnostizieren, Fehler elegant zu behandeln und umsetzbares Feedback zu geben.

4. **Protokollierung**: Konfigurieren Sie strukturierte Logs für Audit-, Debug- und Überwachungszwecke bei Protokollinteraktionen.

5. **Fortschrittsverfolgung**: Berichten Sie bei langlaufenden Operationen Fortschrittsupdates, um reaktionsfähige Benutzeroberflächen zu ermöglichen.

6. **Anfrage-Abbruch**: Ermöglichen Sie Clients, laufende Anfragen abzubrechen, die nicht mehr benötigt werden oder zu lange dauern.

## Weitere Referenzen

Für die aktuellsten Informationen zu MCP-Best Practices siehe:

- [MCP-Dokumentation](https://modelcontextprotocol.io/)
- [MCP-Spezifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Sicherheits-Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Sicherheitsrisiken und Gegenmaßnahmen
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktisches Sicherheitstraining

## Praktische Implementierungsbeispiele

### Werkzeug-Design Best Practices

#### 1. Single Responsibility Principle

Jedes MCP-Werkzeug sollte eine klare, fokussierte Aufgabe haben. Statt monolithischer Werkzeuge, die mehrere Bereiche abdecken, entwickeln Sie spezialisierte Werkzeuge, die bestimmte Aufgaben besonders gut erfüllen.

```csharp
// A focused tool that does one thing well
public class WeatherForecastTool : ITool
{
    private readonly IWeatherService _weatherService;
    
    public WeatherForecastTool(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }
    
    public string Name => "weatherForecast";
    public string Description => "Gets weather forecast for a specific location";
    
    public ToolDefinition GetDefinition()
    {
        return new ToolDefinition
        {
            Name = Name,
            Description = Description,
            Parameters = new Dictionary<string, ParameterDefinition>
            {
                ["location"] = new ParameterDefinition
                {
                    Type = ParameterType.String,
                    Description = "City or location name"
                },
                ["days"] = new ParameterDefinition
                {
                    Type = ParameterType.Integer,
                    Description = "Number of forecast days",
                    Default = 3
                }
            },
            Required = new[] { "location" }
        };
    }
    
    public async Task<ToolResponse> ExecuteAsync(IDictionary<string, object> parameters)
    {
        var location = parameters["location"].ToString();
        var days = parameters.ContainsKey("days") 
            ? Convert.ToInt32(parameters["days"]) 
            : 3;
            
        var forecast = await _weatherService.GetForecastAsync(location, days);
        
        return new ToolResponse
        {
            Content = new List<ContentItem>
            {
                new TextContent(JsonSerializer.Serialize(forecast))
            }
        };
    }
}
```

#### 2. Konsistente Fehlerbehandlung

Implementieren Sie robuste Fehlerbehandlung mit informativen Fehlermeldungen und passenden Wiederherstellungsmechanismen.

```python
# Python-Beispiel mit umfassender Fehlerbehandlung
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parameterüberprüfung
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Sicherheitsüberprüfung
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Datenbankoperation mit Zeitlimit
                async with timeout(10):  # 10 Sekunden Zeitlimit
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Verbindungsfehler könnten vorübergehend sein
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Abfragefehler sind wahrscheinlich Clientfehler
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Tool-spezifische Fehler durchlassen
            raise
        except Exception as e:
            # Allgemeiner Fang für unerwartete Fehler
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Umsetzung der SQL-Injektionserkennung
        pass
        
    def _log_error(self, message, error):
        # Umsetzung der Fehlerprotokollierung
        pass
```

#### 3. Parameter-Validierung

Validieren Sie Parameter stets gründlich, um fehlerhafte oder bösartige Eingaben zu vermeiden.

```javascript
// JavaScript/TypeScript-Beispiel mit detaillierter Parameterüberprüfung
class FileOperationTool {
  getName() {
    return "fileOperation";
  }
  
  getDescription() {
    return "Performs file operations like read, write, and delete";
  }
  
  getDefinition() {
    return {
      name: this.getName(),
      description: this.getDescription(),
      parameters: {
        operation: {
          type: "string",
          description: "Operation to perform",
          enum: ["read", "write", "delete"]
        },
        path: {
          type: "string",
          description: "File path (must be within allowed directories)"
        },
        content: {
          type: "string",
          description: "Content to write (only for write operation)",
          optional: true
        }
      },
      required: ["operation", "path"]
    };
  }
  
  async execute(parameters) {
    // 1. Überprüfung der Parameteranwesenheit
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Überprüfung der Parametertypen
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Überprüfung der Parameterwerte
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Überprüfung des Inhalts für Schreibvorgang
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Validierung der Pfadsicherheit
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementierung basierend auf validierten Parametern
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementierung der Pfadsicherheitsprüfung
    // ...
  }
}
```

### Sicherheits-Implementierungsbeispiele

#### 1. Authentifizierung und Autorisierung

```java
// Java-Beispiel mit Authentifizierung und Autorisierung
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Abhängigkeitsinjektion
    public SecureDataAccessTool(
            AuthenticationService authService,
            AuthorizationService authzService,
            DataService dataService) {
        this.authService = authService;
        this.authzService = authzService;
        this.dataService = dataService;
    }
    
    @Override
    public String getName() {
        return "secureDataAccess";
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        // 1. Authentifizierungskontext extrahieren
        String authToken = request.getContext().getAuthToken();
        
        // 2. Benutzer authentifizieren
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Autorisierung für die spezifische Operation überprüfen
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Mit der autorisierten Operation fortfahren
        try {
            switch (operation) {
                case "read":
                    Object data = dataService.getData(dataId, user.getId());
                    return ToolResponse.success(data);
                case "update":
                    JsonNode newData = request.getParameters().get("newData");
                    dataService.updateData(dataId, newData, user.getId());
                    return ToolResponse.success("Data updated successfully");
                default:
                    return ToolResponse.error("Unsupported operation: " + operation);
            }
        } catch (Exception e) {
            return ToolResponse.error("Operation failed: " + e.getMessage());
        }
    }
}
```

#### 2. Ratenbegrenzung

```csharp
// C# rate limiting implementation
public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IMemoryCache _cache;
    private readonly ILogger<RateLimitingMiddleware> _logger;
    
    // Configuration options
    private readonly int _maxRequestsPerMinute;
    
    public RateLimitingMiddleware(
        RequestDelegate next,
        IMemoryCache cache,
        ILogger<RateLimitingMiddleware> logger,
        IConfiguration config)
    {
        _next = next;
        _cache = cache;
        _logger = logger;
        _maxRequestsPerMinute = config.GetValue<int>("RateLimit:MaxRequestsPerMinute", 60);
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        // 1. Get client identifier (API key or user ID)
        string clientId = GetClientIdentifier(context);
        
        // 2. Get rate limiting key for this minute
        string cacheKey = $"rate_limit:{clientId}:{DateTime.UtcNow:yyyyMMddHHmm}";
        
        // 3. Check current request count
        if (!_cache.TryGetValue(cacheKey, out int requestCount))
        {
            requestCount = 0;
        }
        
        // 4. Enforce rate limit
        if (requestCount >= _maxRequestsPerMinute)
        {
            _logger.LogWarning("Rate limit exceeded for client {ClientId}", clientId);
            
            context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
            context.Response.Headers.Add("Retry-After", "60");
            
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Rate limit exceeded",
                message = "Too many requests. Please try again later.",
                retryAfterSeconds = 60
            });
            
            return;
        }
        
        // 5. Increment request count
        _cache.Set(cacheKey, requestCount + 1, TimeSpan.FromMinutes(2));
        
        // 6. Add rate limit headers
        context.Response.Headers.Add("X-RateLimit-Limit", _maxRequestsPerMinute.ToString());
        context.Response.Headers.Add("X-RateLimit-Remaining", (_maxRequestsPerMinute - requestCount - 1).ToString());
        
        // 7. Continue with the request
        await _next(context);
    }
    
    private string GetClientIdentifier(HttpContext context)
    {
        // Implementation to extract API key or user ID
        // ...
    }
}
```

## Test-Best Practices

### 1. Unit-Testing von MCP-Werkzeugen

Testen Sie Ihre Werkzeuge immer isoliert und mocken Sie externe Abhängigkeiten:

```typescript
// TypeScript-Beispiel eines Einheitstests für ein Werkzeug
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Erstelle einen Mock-Wetterdienst
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Erstelle das Werkzeug mit der gemockten Abhängigkeit
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Arrange (Vorbereiten)
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Act (Ausführen)
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Assert (Überprüfen)
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Arrange (Vorbereiten)
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Act & Assert (Ausführen & Überprüfen)
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integrationstests

Testen Sie den gesamten Ablauf von Client-Anfragen bis zu Server-Antworten:

```python
# Beispiel für einen Python-Integrationstest
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Einen Testserver starten
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Einen Client erstellen
        client = McpClient("http://localhost:5000")
        
        # Werkzeugerkennung testen
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Werkzeugausführung testen
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Antwort überprüfen
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Aufräumen
        await server.stop()
```

## Performance-Optimierung

### 1. Caching-Strategien

Implementieren Sie angemessenes Caching, um Latenzen und Ressourcenverbrauch zu reduzieren:

```csharp
// C# example with caching
public class CachedWeatherTool : ITool
{
    private readonly IWeatherService _weatherService;
    private readonly IDistributedCache _cache;
    private readonly ILogger<CachedWeatherTool> _logger;
    
    public CachedWeatherTool(
        IWeatherService weatherService,
        IDistributedCache cache,
        ILogger<CachedWeatherTool> logger)
    {
        _weatherService = weatherService;
        _cache = cache;
        _logger = logger;
    }
    
    public string Name => "weatherForecast";
    
    public async Task<ToolResponse> ExecuteAsync(IDictionary<string, object> parameters)
    {
        var location = parameters["location"].ToString();
        var days = Convert.ToInt32(parameters.GetValueOrDefault("days", 3));
        
        // Create cache key
        string cacheKey = $"weather:{location}:{days}";
        
        // Try to get from cache
        string cachedForecast = await _cache.GetStringAsync(cacheKey);
        if (!string.IsNullOrEmpty(cachedForecast))
        {
            _logger.LogInformation("Cache hit for weather forecast: {Location}", location);
            return new ToolResponse
            {
                Content = new List<ContentItem>
                {
                    new TextContent(cachedForecast)
                }
            };
        }
        
        // Cache miss - get from service
        _logger.LogInformation("Cache miss for weather forecast: {Location}", location);
        var forecast = await _weatherService.GetForecastAsync(location, days);
        string forecastJson = JsonSerializer.Serialize(forecast);
        
        // Store in cache (weather forecasts valid for 1 hour)
        await _cache.SetStringAsync(
            cacheKey,
            forecastJson,
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
            });
        
        return new ToolResponse
        {
            Content = new List<ContentItem>
            {
                new TextContent(forecastJson)
            }
        };
    }
}
```

#### 2. Dependency Injection und Testbarkeit

Gestalten Sie Werkzeuge so, dass sie ihre Abhängigkeiten über Konstruktorinjektion erhalten, wodurch sie testbar und konfigurierbar werden:

```java
// Java-Beispiel mit Dependency Injection
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Abhängigkeiten werden über den Konstruktor injiziert
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Werkzeugimplementierung
    // ...
}
```

#### 3. Komponierbare Werkzeuge

Entwerfen Sie Werkzeuge, die zusammengesetzt werden können, um komplexere Workflows zu erstellen:

```python
# Python-Beispiel, das kombinierbare Werkzeuge zeigt
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementierung...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Dieses Werkzeug kann Ergebnisse des dataFetch-Werkzeugs verwenden
    async def execute_async(self, request):
        # Implementierung...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Dieses Werkzeug kann Ergebnisse des dataAnalysis-Werkzeugs verwenden
    async def execute_async(self, request):
        # Implementierung...
        pass

# Diese Werkzeuge können unabhängig oder als Teil eines Workflows verwendet werden
```

### Schema-Design Best Practices

Das Schema stellt den Vertrag zwischen Modell und Ihrem Werkzeug dar. Gut gestaltete Schemata führen zu besserer Nutzbarkeit der Werkzeuge.

#### 1. Klare Parameterbeschreibungen

Fügen Sie stets beschreibende Informationen für jeden Parameter hinzu:

```csharp
public object GetSchema()
{
    return new {
        type = "object",
        properties = new {
            query = new { 
                type = "string", 
                description = "Search query text. Use precise keywords for better results." 
            },
            filters = new {
                type = "object",
                description = "Optional filters to narrow down search results",
                properties = new {
                    dateRange = new { 
                        type = "string", 
                        description = "Date range in format YYYY-MM-DD:YYYY-MM-DD" 
                    },
                    category = new { 
                        type = "string", 
                        description = "Category name to filter by" 
                    }
                }
            },
            limit = new { 
                type = "integer", 
                description = "Maximum number of results to return (1-50)",
                default = 10
            }
        },
        required = new[] { "query" }
    };
}
```

#### 2. Validierungsregeln

Inkludieren Sie Validierungsvorgaben, um ungültige Eingaben zu vermeiden:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // E-Mail-Eigenschaft mit Formatvalidierung
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Alterseigenschaft mit numerischen Einschränkungen
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Aufzählungseigenschaft
    Map<String, Object> subscription = new HashMap<>();
    subscription.put("type", "string");
    subscription.put("enum", Arrays.asList("free", "basic", "premium"));
    subscription.put("default", "free");
    subscription.put("description", "Subscription tier");
    
    properties.put("email", email);
    properties.put("age", age);
    properties.put("subscription", subscription);
    
    schema.put("properties", properties);
    schema.put("required", Arrays.asList("email"));
    
    return schema;
}
```

#### 3. Konsistente Rückgabestrukturen

Halten Sie die Konsistenz Ihrer Antwortstrukturen ein, damit Modelle Ergebnisse leichter interpretieren können:

```python
async def execute_async(self, request):
    try:
        # Anfrage verarbeiten
        results = await self._search_database(request.parameters["query"])
        
        # Immer eine konsistente Struktur zurückgeben
        return ToolResponse(
            result={
                "matches": [self._format_item(item) for item in results],
                "totalCount": len(results),
                "queryTime": calculation_time_ms,
                "status": "success"
            }
        )
    except Exception as e:
        return ToolResponse(
            result={
                "matches": [],
                "totalCount": 0,
                "queryTime": 0,
                "status": "error",
                "error": str(e)
            }
        )
    
def _format_item(self, item):
    """Ensures each item has a consistent structure"""
    return {
        "id": item.id,
        "title": item.title,
        "summary": item.summary[:100] + "..." if len(item.summary) > 100 else item.summary,
        "url": item.url,
        "relevance": item.score
    }
```

### Fehlerbehandlung

Robuste Fehlerbehandlung ist entscheidend für zuverlässige MCP-Werkzeuge.

#### 1. Elegante Fehlerbehandlung

Behandeln Sie Fehler auf angemessenen Ebenen und bieten Sie informative Meldungen:

```csharp
public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
{
    try
    {
        string fileId = request.Parameters.GetProperty("fileId").GetString();
        
        try
        {
            var fileData = await _fileService.GetFileAsync(fileId);
            return new ToolResponse { 
                Result = JsonSerializer.SerializeToElement(fileData) 
            };
        }
        catch (FileNotFoundException)
        {
            throw new ToolExecutionException($"File not found: {fileId}");
        }
        catch (UnauthorizedAccessException)
        {
            throw new ToolExecutionException("You don't have permission to access this file");
        }
        catch (Exception ex) when (ex is IOException || ex is TimeoutException)
        {
            _logger.LogError(ex, "Error accessing file {FileId}", fileId);
            throw new ToolExecutionException("Error accessing file: The service is temporarily unavailable");
        }
    }
    catch (JsonException)
    {
        throw new ToolExecutionException("Invalid file ID format");
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Unexpected error in FileAccessTool");
        throw new ToolExecutionException("An unexpected error occurred");
    }
}
```

#### 2. Strukturierte Fehlerantworten

Geben Sie nach Möglichkeit strukturierte Fehlerinformationen zurück:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementierung
    } catch (Exception ex) {
        Map<String, Object> errorResult = new HashMap<>();
        
        errorResult.put("success", false);
        
        if (ex instanceof ValidationException) {
            ValidationException validationEx = (ValidationException) ex;
            
            errorResult.put("errorType", "validation");
            errorResult.put("errorMessage", validationEx.getMessage());
            errorResult.put("validationErrors", validationEx.getErrors());
            
            return new ToolResponse.Builder()
                .setResult(errorResult)
                .build();
        }
        
        // Andere Ausnahmen als ToolExecutionException erneut auslösen
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Wiederholungslogik

Implementieren Sie geeignete Wiederholungsmechanismen für temporäre Fehler:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # Sekunden
    
    while retry_count < max_retries:
        try:
            # Externe API aufrufen
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Exponentielles Zurücksetzen
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Nicht-transienter Fehler, nicht erneut versuchen
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Performance-Optimierung

#### 1. Caching

Implementieren Sie Caching für rechenintensive Operationen:

```csharp
public class CachedDataTool : IMcpTool
{
    private readonly IDatabase _database;
    private readonly IMemoryCache _cache;
    
    public CachedDataTool(IDatabase database, IMemoryCache cache)
    {
        _database = database;
        _cache = cache;
    }
    
    public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
    {
        var query = request.Parameters.GetProperty("query").GetString();
        
        // Create cache key based on parameters
        var cacheKey = $"data_query_{ComputeHash(query)}";
        
        // Try to get from cache first
        if (_cache.TryGetValue(cacheKey, out var cachedResult))
        {
            return new ToolResponse { Result = cachedResult };
        }
        
        // Cache miss - perform actual query
        var result = await _database.QueryAsync(query);
        
        // Store in cache with expiration
        var cacheOptions = new MemoryCacheEntryOptions()
            .SetAbsoluteExpiration(TimeSpan.FromMinutes(15));
            
        _cache.Set(cacheKey, JsonSerializer.SerializeToElement(result), cacheOptions);
        
        return new ToolResponse { Result = JsonSerializer.SerializeToElement(result) };
    }
    
    private string ComputeHash(string input)
    {
        // Implementation to generate stable hash for cache key
    }
}
```

#### 2. Asynchrone Verarbeitung

Verwenden Sie asynchrone Programmiermuster für I/O-gebundene Operationen:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Für lang andauernde Vorgänge sofort eine Verarbeitungs-ID zurückgeben
        String processId = UUID.randomUUID().toString();
        
        // Asynchrone Verarbeitung starten
        CompletableFuture.runAsync(() -> {
            try {
                // Lang andauernde Operation ausführen
                documentService.processDocument(documentId);
                
                // Status aktualisieren (wird typischerweise in einer Datenbank gespeichert)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Sofortige Antwort mit Prozess-ID zurückgeben
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Begleitendes Statusprüfungswerkzeug
    public class ProcessStatusTool implements Tool {
        @Override
        public ToolResponse execute(ToolRequest request) {
            String processId = request.getParameters().get("processId").asText();
            ProcessStatus status = processStatusRepository.getStatus(processId);
            
            return new ToolResponse.Builder().setResult(status).build();
        }
    }
}
```

#### 3. Ressourcenbegrenzung

Setzen Sie Ressourcen-Throttling ein, um Überlastungen zu verhindern:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Erlaube 5 Anfragen pro Sekunde
            bucket_size=10        # Erlaube Spitzenwerte bis zu 10 Anfragen
        )
    
    async def execute_async(self, request):
        # Prüfe, ob wir fortfahren können oder warten müssen
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Wenn das Warten zu lang ist
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Warte die entsprechende Verzögerungszeit ab
                await asyncio.sleep(delay)
        
        # Verbrauche ein Token und fahre mit der Anfrage fort
        self.rate_limiter.consume()
        
        # Rufe API auf
        result = await self._call_api(request.parameters)
        return ToolResponse(result=result)

class TokenBucketRateLimiter:
    def __init__(self, tokens_per_second, bucket_size):
        self.tokens_per_second = tokens_per_second
        self.bucket_size = bucket_size
        self.tokens = bucket_size
        self.last_refill = time.time()
        self.lock = asyncio.Lock()
    
    async def get_delay_time(self):
        async with self.lock:
            self._refill()
            if self.tokens >= 1:
                return 0
            
            # Berechne Zeit bis zum nächsten verfügbaren Token
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Füge neue Token basierend auf der verstrichenen Zeit hinzu
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Sicherheits-Best Practices

#### 1. Eingabevalidierung

Prüfen Sie Eingabeparameter stets sorgfältig:

```csharp
public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
{
    // Validate parameters exist
    if (!request.Parameters.TryGetProperty("query", out var queryProp))
    {
        throw new ToolExecutionException("Missing required parameter: query");
    }
    
    // Validate correct type
    if (queryProp.ValueKind != JsonValueKind.String)
    {
        throw new ToolExecutionException("Query parameter must be a string");
    }
    
    var query = queryProp.GetString();
    
    // Validate string content
    if (string.IsNullOrWhiteSpace(query))
    {
        throw new ToolExecutionException("Query parameter cannot be empty");
    }
    
    if (query.Length > 500)
    {
        throw new ToolExecutionException("Query parameter exceeds maximum length of 500 characters");
    }
    
    // Check for SQL injection attacks if applicable
    if (ContainsSqlInjection(query))
    {
        throw new ToolExecutionException("Invalid query: contains potentially unsafe SQL");
    }
    
    // Proceed with execution
    // ...
}
```

#### 2. Autorisierungsprüfungen

Führen Sie ordnungsgemäße Autorisierungsprüfungen durch:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Benutzerkontext aus der Anfrage abrufen
    UserContext user = request.getContext().getUserContext();
    
    // Überprüfen, ob der Benutzer die erforderlichen Berechtigungen hat
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Für bestimmte Ressourcen den Zugriff auf diese Ressource prüfen
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Mit der Ausführung des Werkzeugs fortfahren
    // ...
}
```

#### 3. Behandlung sensibler Daten

Gehen Sie sorgsam mit sensiblen Daten um:

```python
class SecureDataTool(Tool):
    def get_schema(self):
        return {
            "type": "object",
            "properties": {
                "userId": {"type": "string"},
                "includeSensitiveData": {"type": "boolean", "default": False}
            },
            "required": ["userId"]
        }
    
    async def execute_async(self, request):
        user_id = request.parameters["userId"]
        include_sensitive = request.parameters.get("includeSensitiveData", False)
        
        # Benutzerdaten abrufen
        user_data = await self.user_service.get_user_data(user_id)
        
        # Sensible Felder filtern, es sei denn, sie werden ausdrücklich angefordert UND sind autorisiert
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Überprüfe die Autorisierungsstufe im Anfragekontext
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Erstelle eine Kopie, um die Originaldaten nicht zu verändern
        redacted = user_data.copy()
        
        # Spezifische sensible Felder schwärzen
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Verschachtelte sensible Daten schwärzen
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Test-Best Practices für MCP-Werkzeuge

Umfassende Tests stellen sicher, dass MCP-Werkzeuge korrekt funktionieren, Randfälle behandeln und sich richtig in das Gesamtsystem integrieren.

### Unit-Testing

#### 1. Testen Sie jedes Werkzeug isoliert

Erstellen Sie fokussierte Tests für die Funktionalität jedes Werkzeugs:

```csharp
[Fact]
public async Task WeatherTool_ValidLocation_ReturnsCorrectForecast()
{
    // Arrange
    var mockWeatherService = new Mock<IWeatherService>();
    mockWeatherService
        .Setup(s => s.GetForecastAsync("Seattle", 3))
        .ReturnsAsync(new WeatherForecast(/* test data */));
    
    var tool = new WeatherForecastTool(mockWeatherService.Object);
    
    var request = new ToolRequest(
        toolName: "weatherForecast",
        parameters: JsonSerializer.SerializeToElement(new { 
            location = "Seattle", 
            days = 3 
        })
    );
    
    // Act
    var response = await tool.ExecuteAsync(request);
    
    // Assert
    Assert.NotNull(response);
    var result = JsonSerializer.Deserialize<WeatherForecast>(response.Result);
    Assert.Equal("Seattle", result.Location);
    Assert.Equal(3, result.DailyForecasts.Count);
}

[Fact]
public async Task WeatherTool_InvalidLocation_ThrowsToolExecutionException()
{
    // Arrange
    var mockWeatherService = new Mock<IWeatherService>();
    mockWeatherService
        .Setup(s => s.GetForecastAsync("InvalidLocation", It.IsAny<int>()))
        .ThrowsAsync(new LocationNotFoundException("Location not found"));
    
    var tool = new WeatherForecastTool(mockWeatherService.Object);
    
    var request = new ToolRequest(
        toolName: "weatherForecast",
        parameters: JsonSerializer.SerializeToElement(new { 
            location = "InvalidLocation", 
            days = 3 
        })
    );
    
    // Act & Assert
    var exception = await Assert.ThrowsAsync<ToolExecutionException>(
        () => tool.ExecuteAsync(request)
    );
    
    Assert.Contains("Location not found", exception.Message);
}
```

#### 2. Schema-Validierungstests

Testen Sie, dass Schemata gültig sind und Einschränkungen korrekt durchsetzen:

```java
@Test
public void testSchemaValidation() {
    // Werkzeuginstanz erstellen
    SearchTool searchTool = new SearchTool();
    
    // Schema abrufen
    Object schema = searchTool.getSchema();
    
    // Schema zur Validierung in JSON umwandeln
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Überprüfen, ob das Schema gültiges JSONSchema ist
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Gültige Parameter testen
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Fehlenden erforderlichen Parameter testen
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Ungültigen Parametertyp testen
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Fehlerbehandlungstests

Erstellen Sie spezifische Tests für Fehlerfälle:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Anordnen
    tool = ApiTool(timeout=0.1)  # Sehr kurze Zeitüberschreitung
    
    # Ein Request simulieren, der abläuft
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Länger als Zeitüberschreitung
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Ausführen & Prüfen
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Ausnahme-Nachricht verifizieren
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Anordnen
    tool = ApiTool()
    
    # Eine rate-limiting Antwort simulieren
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            status=429,
            headers={"Retry-After": "2"},
            body=json.dumps({"error": "Rate limit exceeded"})
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Ausführen & Prüfen
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Überprüfen, ob Ausnahme Information zur Rate-Limitierung enthält
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integrationstests

#### 1. Testing der Werkzeugkette

Testen Sie Werkzeuge, die in voraussichtlichen Kombinationen zusammenarbeiten:

```csharp
[Fact]
public async Task DataProcessingWorkflow_CompletesSuccessfully()
{
    // Arrange
    var dataFetchTool = new DataFetchTool(mockDataService.Object);
    var analysisTools = new DataAnalysisTool(mockAnalysisService.Object);
    var visualizationTool = new DataVisualizationTool(mockVisualizationService.Object);
    
    var toolRegistry = new ToolRegistry();
    toolRegistry.RegisterTool(dataFetchTool);
    toolRegistry.RegisterTool(analysisTools);
    toolRegistry.RegisterTool(visualizationTool);
    
    var workflowExecutor = new WorkflowExecutor(toolRegistry);
    
    // Act
    var result = await workflowExecutor.ExecuteWorkflowAsync(new[] {
        new ToolCall("dataFetch", new { source = "sales2023" }),
        new ToolCall("dataAnalysis", ctx => new { 
            data = ctx.GetResult("dataFetch"),
            analysis = "trend" 
        }),
        new ToolCall("dataVisualize", ctx => new {
            analysisResult = ctx.GetResult("dataAnalysis"),
            type = "line-chart"
        })
    });
    
    // Assert
    Assert.NotNull(result);
    Assert.True(result.Success);
    Assert.NotNull(result.GetResult("dataVisualize"));
    Assert.Contains("chartUrl", result.GetResult("dataVisualize").ToString());
}
```

#### 2. MCP-Server-Tests

Testen Sie den MCP-Server mit vollständiger Werkzeugregistrierung und Ausführung:

```java
@SpringBootTest
@AutoConfigureMockMvc
public class McpServerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    public void testToolDiscovery() throws Exception {
        // Teste den Discovery-Endpunkt
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Erstelle Werkzeuganfrage
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Sende Anfrage und überprüfe Antwort
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Erstelle ungültige Werkzeuganfrage
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Fehlender Parameter "b"
        request.put("parameters", parameters);
        
        // Sende Anfrage und überprüfe Fehlermeldung
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-End-Tests

Testen Sie komplette Workflows vom Modell-Prompt bis zur Werkzeug-Ausführung:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Anordnen - MCP-Client und Mock-Modell einrichten
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Mock-Modellantworten
    mock_model = MockLanguageModel([
        MockResponse(
            "What's the weather in Seattle?",
            tool_calls=[{
                "tool_name": "weatherForecast",
                "parameters": {"location": "Seattle", "days": 3}
            }]
        ),
        MockResponse(
            "Here's the weather forecast for Seattle:\n- Today: 65°F, Partly Cloudy\n- Tomorrow: 68°F, Sunny\n- Day after: 62°F, Rain",
            tool_calls=[]
        )
    ])
    
    # Mock-Wetter-Tool-Antwort
    with aioresponses() as mocked:
        mocked.post(
            "http://localhost:5000/mcp/execute",
            payload={
                "result": {
                    "location": "Seattle",
                    "forecast": [
                        {"date": "2023-06-01", "temperature": 65, "conditions": "Partly Cloudy"},
                        {"date": "2023-06-02", "temperature": 68, "conditions": "Sunny"},
                        {"date": "2023-06-03", "temperature": 62, "conditions": "Rain"}
                    ]
                }
            }
        )
        
        # Ausführen
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Überprüfen
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Performance-Tests

#### 1. Lasttests

Testen Sie, wie viele gleichzeitige Anfragen Ihr MCP-Server bewältigt:

```csharp
[Fact]
public async Task McpServer_HandlesHighConcurrency()
{
    // Arrange
    var server = new McpServer(
        name: "TestServer",
        version: "1.0",
        maxConcurrentRequests: 100
    );
    
    server.RegisterTool(new FastExecutingTool());
    await server.StartAsync();
    
    var client = new McpClient("http://localhost:5000");
    
    // Act
    var tasks = new List<Task<McpResponse>>();
    for (int i = 0; i < 1000; i++)
    {
        tasks.Add(client.ExecuteToolAsync("fastTool", new { iteration = i }));
    }
    
    var results = await Task.WhenAll(tasks);
    
    // Assert
    Assert.Equal(1000, results.Length);
    Assert.All(results, r => Assert.NotNull(r));
}
```

#### 2. Stresstests

Testen Sie das System unter extremer Last:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // JMeter für Stresstests einrichten
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter-Testplan konfigurieren
    HashTree testPlanTree = new HashTree();
    
    // Testplan, Thread-Gruppe, Sampler usw. erstellen
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // HTTP-Sampler für die Ausführung des Tools hinzufügen
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Listener hinzufügen
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Test ausführen
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Ergebnisse validieren
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Durchschnittliche Antwortzeit < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. Perzentil < 500ms
}
```

#### 3. Monitoring und Profiling

Richten Sie Überwachung für langfristige Leistungsanalysen ein:

```python
# Überwachung für einen MCP-Server konfigurieren
def configure_monitoring(server):
    # Prometheus-Metriken einrichten
    prometheus_metrics = {
        "request_count": Counter("mcp_requests_total", "Total MCP requests"),
        "request_latency": Histogram(
            "mcp_request_duration_seconds", 
            "Request duration in seconds",
            buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 2.5, 5.0, 10.0]
        ),
        "tool_execution_count": Counter(
            "mcp_tool_executions_total", 
            "Tool execution count",
            labelnames=["tool_name"]
        ),
        "tool_execution_latency": Histogram(
            "mcp_tool_duration_seconds", 
            "Tool execution duration in seconds",
            labelnames=["tool_name"],
            buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 2.5, 5.0, 10.0]
        ),
        "tool_errors": Counter(
            "mcp_tool_errors_total",
            "Tool execution errors",
            labelnames=["tool_name", "error_type"]
        )
    }
    
    # Middleware zur Zeitmessung und Aufzeichnung von Metriken hinzufügen
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Metriken-Endpunkt bereitstellen
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP-Workflow-Designmuster

Gut gestaltete MCP-Workflows steigern Effizienz, Zuverlässigkeit und Wartbarkeit. Hier sind zentrale Muster:

### 1. Kette von Werkzeugen

Verknüpfen Sie mehrere Werkzeuge in einer Reihenfolge, bei der die Ausgabe eines Werkzeugs als Eingabe für das nächste dient:

```python
# Python-Implementierung der Werkzeugkette
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Liste der auszuführenden Werkzeugnamen in der Reihenfolge
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Führe jedes Werkzeug in der Kette aus und übergebe das vorherige Ergebnis
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Ergebnis speichern und als Eingabe für das nächste Werkzeug verwenden
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Beispielhafte Verwendung
data_processing_chain = ChainWorkflow([
    "dataFetch",
    "dataCleaner",
    "dataAnalyzer",
    "dataVisualizer"
])

result = await data_processing_chain.execute(
    mcp_client,
    {"source": "sales_database", "table": "transactions"}
)
```

### 2. Dispatcher-Muster

Nutzen Sie ein zentrales Werkzeug, das basierend auf Input spezialisierte Werkzeuge ansteuert:

```csharp
public class ContentDispatcherTool : IMcpTool
{
    private readonly IMcpClient _mcpClient;
    
    public ContentDispatcherTool(IMcpClient mcpClient)
    {
        _mcpClient = mcpClient;
    }
    
    public string Name => "contentProcessor";
    public string Description => "Processes content of various types";
    
    public object GetSchema()
    {
        return new {
            type = "object",
            properties = new {
                content = new { type = "string" },
                contentType = new { 
                    type = "string",
                    enum = new[] { "text", "html", "markdown", "csv", "code" }
                },
                operation = new { 
                    type = "string",
                    enum = new[] { "summarize", "analyze", "extract", "convert" }
                }
            },
            required = new[] { "content", "contentType", "operation" }
        };
    }
    
    public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
    {
        var content = request.Parameters.GetProperty("content").GetString();
        var contentType = request.Parameters.GetProperty("contentType").GetString();
        var operation = request.Parameters.GetProperty("operation").GetString();
        
        // Determine which specialized tool to use
        string targetTool = DetermineTargetTool(contentType, operation);
        
        // Forward to the specialized tool
        var specializedResponse = await _mcpClient.ExecuteToolAsync(
            targetTool,
            new { content, options = GetOptionsForTool(targetTool, operation) }
        );
        
        return new ToolResponse { Result = specializedResponse.Result };
    }
    
    private string DetermineTargetTool(string contentType, string operation)
    {
        return (contentType, operation) switch
        {
            ("text", "summarize") => "textSummarizer",
            ("text", "analyze") => "textAnalyzer",
            ("html", _) => "htmlProcessor",
            ("markdown", _) => "markdownProcessor",
            ("csv", _) => "csvProcessor",
            ("code", _) => "codeAnalyzer",
            _ => throw new ToolExecutionException($"No tool available for {contentType}/{operation}")
        };
    }
    
    private object GetOptionsForTool(string toolName, string operation)
    {
        // Return appropriate options for each specialized tool
        return toolName switch
        {
            "textSummarizer" => new { length = "medium" },
            "htmlProcessor" => new { cleanUp = true, operation },
            // Options for other tools...
            _ => new { }
        };
    }
}
```

### 3. Parallele Verarbeitung

Führen Sie mehrere Werkzeuge simultan aus für mehr Effizienz:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Schritt 1: Holen Sie die Metadaten des Datensatzes ab (synchron)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Schritt 2: Starten Sie mehrere Analysen parallel
        CompletableFuture<ToolResponse> statisticalAnalysis = CompletableFuture.supplyAsync(() ->
            mcpClient.executeTool("statisticalAnalysis", Map.of(
                "datasetId", datasetId,
                "type", "comprehensive"
            ))
        );
        
        CompletableFuture<ToolResponse> correlationAnalysis = CompletableFuture.supplyAsync(() ->
            mcpClient.executeTool("correlationAnalysis", Map.of(
                "datasetId", datasetId,
                "method", "pearson"
            ))
        );
        
        CompletableFuture<ToolResponse> outlierDetection = CompletableFuture.supplyAsync(() ->
            mcpClient.executeTool("outlierDetection", Map.of(
                "datasetId", datasetId,
                "sensitivity", "medium"
            ))
        );
        
        // Warten Sie, bis alle parallelen Aufgaben abgeschlossen sind
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Warten Sie auf den Abschluss
        
        // Schritt 3: Ergebnisse zusammenführen
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Schritt 4: Zusammenfassenden Bericht erstellen
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Komplettes Workflow-Ergebnis zurückgeben
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Fehlerwiederherstellungsmuster

Implementieren Sie elegante Ausweichlösungen bei Werkzeug-Fehlern:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Versuchen Sie zuerst das primäre Werkzeug
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Fehler protokollieren
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Auf sekundäres Werkzeug zurückgreifen
            try:
                # Möglicherweise müssen Parameter für das Fallback-Werkzeug transformiert werden
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Beide Werkzeuge sind fehlgeschlagen
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Diese Implementierung würde von den spezifischen Werkzeugen abhängen
        # Für dieses Beispiel geben wir einfach die ursprünglichen Parameter zurück
        return params

# Beispielverwendung
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Primäre (kostenpflichtige) Wetter-API
        "basicWeatherService",    # Fallback (kostenlose) Wetter-API
        {"location": location}
    )
```

### 5. Workflow-Kompositionsmuster

Bauen Sie komplexe Workflows durch Kombination einfacherer zusammen:

```csharp
public class CompositeWorkflow : IWorkflow
{
    private readonly List<IWorkflow> _workflows;
    
    public CompositeWorkflow(IEnumerable<IWorkflow> workflows)
    {
        _workflows = new List<IWorkflow>(workflows);
    }
    
    public async Task<WorkflowResult> ExecuteAsync(WorkflowContext context)
    {
        var results = new Dictionary<string, object>();
        
        foreach (var workflow in _workflows)
        {
            var workflowResult = await workflow.ExecuteAsync(context);
            
            // Store each workflow's result
            results[workflow.Name] = workflowResult;
            
            // Update context with the result for the next workflow
            context = context.WithResult(workflow.Name, workflowResult);
        }
        
        return new WorkflowResult(results);
    }
    
    public string Name => "CompositeWorkflow";
    public string Description => "Executes multiple workflows in sequence";
}

// Example usage
var documentWorkflow = new CompositeWorkflow(new IWorkflow[] {
    new DocumentFetchWorkflow(),
    new DocumentProcessingWorkflow(),
    new InsightGenerationWorkflow(),
    new ReportGenerationWorkflow()
});

var result = await documentWorkflow.ExecuteAsync(new WorkflowContext {
    Parameters = new { documentId = "12345" }
});
```

# Testen von MCP-Servern: Best Practices und Top-Tipps

## Überblick

Tests sind ein kritischer Aspekt bei der Entwicklung zuverlässiger, qualitativ hochwertiger MCP-Server. Dieser Leitfaden liefert umfassende Best Practices und Tipps zum Testen Ihrer MCP-Server während des gesamten Entwicklungszyklus, von Unit-Tests bis zu Integrationstests und End-to-End-Validierung.

## Warum Tests für MCP-Server wichtig sind

MCP-Server fungieren als entscheidende Middleware zwischen KI-Modellen und Client-Anwendungen. Umfassende Tests gewährleisten:

- Zuverlässigkeit in Produktionsumgebungen
- Korrekte Behandlung von Anfragen und Antworten
- Einhaltung der MCP-Spezifikationen
- Robustheit gegenüber Ausfällen und Randfällen
- Konsistente Leistungsfähigkeit unter verschiedenen Lasten

## Unit-Testing für MCP-Server

### Unit Testing (Grundlage)

Unit-Tests prüfen einzelne Komponenten Ihres MCP-Servers isoliert.

#### Was zu testen ist

1. **Ressourcen-Handler**: Testen Sie die Logik jedes Ressourcen-Handlers unabhängig
2. **Werkzeugimplementierungen**: Verifizieren Sie das Verhalten der Werkzeuge mit unterschiedlichen Eingaben
3. **Prompt-Vorlagen**: Stellen Sie sicher, dass Prompt-Vorlagen korrekt gerendert werden
4. **Schema-Validierung**: Testen Sie die Parameter-Validierungslogik
5. **Fehlerbehandlung**: Prüfen Sie Fehlerantworten bei ungültigen Eingaben

#### Best Practices für Unit-Tests

```csharp
// Example unit test for a calculator tool in C#
[Fact]
public async Task CalculatorTool_Add_ReturnsCorrectSum()
{
    // Arrange
    var calculator = new CalculatorTool();
    var parameters = new Dictionary<string, object>
    {
        ["operation"] = "add",
        ["a"] = 5,
        ["b"] = 7
    };
    
    // Act
    var response = await calculator.ExecuteAsync(parameters);
    var result = JsonSerializer.Deserialize<CalculationResult>(response.Content[0].ToString());
    
    // Assert
    Assert.Equal(12, result.Value);
}
```

```python
# Beispiel für einen Unit-Test eines Taschenrechner-Tools in Python
def test_calculator_tool_add():
    # Anordnen
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Ausführen
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Überprüfen
    assert result["value"] == 12
```

### Integrationstests (Mittlere Ebene)

Integrationstests überprüfen die Interaktion zwischen den Komponenten Ihres MCP-Servers.

#### Was zu testen ist

1. **Server-Initialisierung**: Testen Sie den Serverstart mit verschiedenen Konfigurationen
2. **Routen-Registrierung**: Prüfen Sie, dass alle Endpunkte korrekt registriert sind
3. **Anfrageverarbeitung**: Testen Sie den vollständigen Anfrage-Antwort-Zyklus
4. **Fehlerausbreitung**: Stellen Sie sicher, dass Fehler korrekt zwischen Komponenten behandelt werden
5. **Authentifizierung & Autorisierung**: Testen Sie Sicherheitsmechanismen

#### Best Practices für Integrationstests

```csharp
// Example integration test for MCP server in C#
[Fact]
public async Task Server_ProcessToolRequest_ReturnsValidResponse()
{
    // Arrange
    var server = new McpServer();
    server.RegisterTool(new CalculatorTool());
    await server.StartAsync();
    
    var request = new McpRequest
    {
        Tool = "calculator",
        Parameters = new Dictionary<string, object>
        {
            ["operation"] = "multiply",
            ["a"] = 6,
            ["b"] = 7
        }
    };
    
    // Act
    var response = await server.ProcessRequestAsync(request);
    
    // Assert
    Assert.NotNull(response);
    Assert.Equal(McpStatusCodes.Success, response.StatusCode);
    // Additional assertions for response content
    
    // Cleanup
    await server.StopAsync();
}
```

### End-to-End-Tests (Obere Ebene)

End-to-End-Tests prüfen das komplette Systemverhalten von Client bis Server.

#### Was zu testen ist

1. **Client-Server-Kommunikation**: Testen Sie vollständige Anfrage-Antwort-Zyklen
2. **Echte Client-SDKs**: Testen Sie mit echten Client-Implementierungen
3. **Leistung unter Last**: Prüfen Sie das Verhalten bei vielen gleichzeitigen Anfragen
4. **Fehlerwiederherstellung**: Testen Sie die Systemwiederherstellung nach Ausfällen
5. **Langlaufende Operationen**: Verifizieren Sie den Umgang mit Streaming und langen Operationen

#### Best Practices für End-to-End-Tests

```typescript
// Beispiel E2E-Test mit einem Client in TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Server in der Testumgebung starten
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Handlung
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Überprüfen
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mocking-Strategien für MCP-Tests

Mocking ist essenziell, um Komponenten isoliert während der Tests zu prüfen.

### Zu mockende Komponenten

1. **Externe KI-Modelle**: Mocken Sie Modellantworten für vorhersehbare Tests
2. **Externe Dienste**: Mocken Sie API-Abhängigkeiten (Datenbanken, Drittanbieterdienste)
3. **Authentifizierungsdienste**: Mocken Sie Identitätsanbieter
4. **Ressourcenanbieter**: Mocken Sie ressourcenintensive Ressourcen-Handler

### Beispiel: Mocken einer KI-Modell-Antwort

```csharp
// C# example with Moq
var mockModel = new Mock<ILanguageModel>();
mockModel
    .Setup(m => m.GenerateResponseAsync(
        It.IsAny<string>(),
        It.IsAny<McpRequestContext>()))
    .ReturnsAsync(new ModelResponse { 
        Text = "Mocked model response",
        FinishReason = FinishReason.Completed
    });

var server = new McpServer(modelClient: mockModel.Object);
```

```python
# Python-Beispiel mit unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Mock konfigurieren
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Mock im Test verwenden
    server = McpServer(model_client=mock_model)
    # Mit dem Test fortfahren
```

## Performanztests

Performanztests sind entscheidend für produktive MCP-Server.

### Was zu messen ist

1. **Latenz**: Antwortzeit für Anfragen
2. **Durchsatz**: Verarbeitete Anfragen pro Sekunde
3. **Ressourcennutzung**: CPU-, Speicher- und Netzwerkverbrauch
4. **Gleichzeitige Verarbeitung**: Verhalten bei parallelen Anfragen
5. **Skalierungseigenschaften**: Leistung bei steigender Last

### Tools für Performanztests

- **k6**: Open-Source-Lasttest-Tool
- **JMeter**: Umfassende Performanztests
- **Locust**: Lasttests in Python
- **Azure Load Testing**: Cloud-basierte Performanztests

### Beispiel: Einfacher Lasttest mit k6

```javascript
// k6-Skript zum Lasttest des MCP-Servers
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtuelle Benutzer
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    tool: 'calculator',
    parameters: {
      operation: 'add',
      a: Math.floor(Math.random() * 100),
      b: Math.floor(Math.random() * 100)
    }
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token'
    },
  };

  const res = http.post('http://localhost:5000/api/tools/invoke', payload, params);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

## Testautomatisierung für MCP-Server

Die Automatisierung Ihrer Tests sorgt für gleichbleibende Qualität und schnellere Feedbackzyklen.

### CI/CD-Integration
1. **Unit-Tests bei Pull Requests ausführen**: Stellen Sie sicher, dass Codeänderungen die bestehende Funktionalität nicht beeinträchtigen  
2. **Integrationstests in der Staging-Umgebung**: Führen Sie Integrationstests in Vorproduktionsumgebungen durch  
3. **Performanz-Benchmarks**: Pflegen Sie Leistungsbenchmarks, um Regressionen zu erkennen  
4. **Sicherheitsscans**: Automatisieren Sie Sicherheitstests als Teil der Pipeline  

### Beispiel CI-Pipeline (GitHub Actions)

```yaml
name: MCP Server Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Runtime
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: '8.0.x'
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --no-restore
    
    - name: Unit Tests
      run: dotnet test --no-build --filter Category=Unit
    
    - name: Integration Tests
      run: dotnet test --no-build --filter Category=Integration
      
    - name: Performance Tests
      run: dotnet run --project tests/PerformanceTests/PerformanceTests.csproj
```
  
## Tests zur Einhaltung der MCP-Spezifikation

Überprüfen Sie, ob Ihr Server die MCP-Spezifikation korrekt implementiert.

### Wichtige Compliance-Bereiche

1. **API-Endpunkte**: Testen Sie die erforderlichen Endpunkte (/resources, /tools, etc.)  
2. **Anfrage-/Antwortformat**: Validieren Sie die Schema-Konformität  
3. **Fehlercodes**: Überprüfen Sie die korrekten Statuscodes für verschiedene Szenarien  
4. **Content-Typen**: Testen Sie die Verarbeitung unterschiedlicher Content-Typen  
5. **Authentifizierungsablauf**: Verifizieren Sie spezifikationskonforme Authentifizierungsmechanismen  

### Compliance-Test-Suite

```csharp
[Fact]
public async Task Server_ResourceEndpoint_ReturnsCorrectSchema()
{
    // Arrange
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", "Bearer test-token");
    
    // Act
    var response = await client.GetAsync("http://localhost:5000/api/resources");
    var content = await response.Content.ReadAsStringAsync();
    var resources = JsonSerializer.Deserialize<ResourceList>(content);
    
    // Assert
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    Assert.NotNull(resources);
    Assert.All(resources.Resources, resource => 
    {
        Assert.NotNull(resource.Id);
        Assert.NotNull(resource.Type);
        // Additional schema validation
    });
}
```
  
## Top 10 Tipps für effektives MCP-Server-Testing

1. **Testen Sie Tool-Definitionen separat**: Überprüfen Sie Schema-Definitionen unabhängig von der Tool-Logik  
2. **Verwenden Sie parametrisierte Tests**: Testen Sie Tools mit verschiedenen Eingaben, inklusive Randfällen  
3. **Prüfen Sie Fehlerantworten**: Vergewissern Sie sich einer ordnungsgemäßen Fehlerbehandlung für alle möglichen Fehlerfälle  
4. **Testen Sie Autorisierungslogik**: Stellen Sie sicher, dass für verschiedene Benutzerrollen der richtige Zugriffskontrolle angewandt wird  
5. **Überwachen Sie die Testabdeckung**: Zielen Sie auf eine hohe Abdeckung kritischer Codepfade ab  
6. **Testen Sie Streaming-Antworten**: Verifizieren Sie die korrekte Behandlung von Streaming-Inhalten  
7. **Simulieren Sie Netzwerkprobleme**: Testen Sie das Verhalten unter schlechten Netzwerkbedingungen  
8. **Testen Sie Ressourcengrenzen**: Überprüfen Sie das Verhalten bei Erreichen von Quoten oder Rate Limits  
9. **Automatisieren Sie Regressionstests**: Erstellen Sie eine Test-Suite, die bei jeder Codeänderung ausgeführt wird  
10. **Dokumentieren Sie Testfälle**: Pflegen Sie klare Dokumentationen der Testszenarien  

## Häufige Testfallen

- **Übermäßiges Verlassen auf Happy-Path-Tests**: Stellen Sie sicher, Fehlerfälle gründlich zu testen  
- **Ignorieren von Performanztests**: Identifizieren Sie Engpässe bevor sie die Produktion beeinträchtigen  
- **Nur isolierte Tests**: Kombinieren Sie Unit-, Integrations- und End-to-End-Tests  
- **Unvollständige API-Abdeckung**: Stellen Sie sicher, dass alle Endpunkte und Funktionen getestet werden  
- **Inkonsistente Testumgebungen**: Nutzen Sie Container für konsistente Testumgebungen  

## Fazit

Eine umfassende Teststrategie ist entscheidend für die Entwicklung zuverlässiger, qualitativ hochwertiger MCP-Server. Durch die Umsetzung der in diesem Leitfaden dargestellten Best Practices und Tipps stellen Sie sicher, dass Ihre MCP-Implementierungen höchste Anforderungen an Qualität, Zuverlässigkeit und Leistung erfüllen.  

## Wichtige Erkenntnisse

1. **Tool-Design**: Befolgen Sie das Prinzip der Single Responsibility, verwenden Sie Dependency Injection und entwerfen Sie für Komponierbarkeit  
2. **Schema-Design**: Erstellen Sie klare, gut dokumentierte Schemas mit passenden Validierungsregeln  
3. **Fehlerbehandlung**: Implementieren Sie eine geschmeidige Fehlerbehandlung, strukturierte Fehlerantworten und eine Retry-Logik  
4. **Performance**: Nutzen Sie Caching, asynchrone Verarbeitung und Ressourcenbegrenzung  
5. **Sicherheit**: Wenden Sie gründliche Input-Validierung, Autorisierungsprüfungen und den Umgang mit sensiblen Daten an  
6. **Testing**: Erstellen Sie umfassende Unit-, Integrations- und End-to-End-Tests  
7. **Workflow-Patterns**: Wenden Sie bewährte Muster wie Chains, Dispatchers und parallele Verarbeitung an  

## Übung

Entwerfen Sie ein MCP-Tool und Workflow für ein Dokumentenverarbeitungssystem, das:

1. Dokumente in mehreren Formaten akzeptiert (PDF, DOCX, TXT)  
2. Text und Schlüsselinformationen aus den Dokumenten extrahiert  
3. Dokumente nach Typ und Inhalt klassifiziert  
4. Eine Zusammenfassung jedes Dokuments erzeugt  

Implementieren Sie die Tool-Schemas, Fehlerbehandlung und ein Workflow-Muster, das am besten zu diesem Szenario passt. Überlegen Sie auch, wie Sie diese Implementierung testen würden.  

## Ressourcen 

1. Treten Sie der MCP-Community im [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) bei, um über die neuesten Entwicklungen auf dem Laufenden zu bleiben  
2. Tragen Sie zu Open-Source-[MCP-Projekten](https://github.com/modelcontextprotocol) bei  
3. Wenden Sie MCP-Prinzipien in den KI-Initiativen Ihrer eigenen Organisation an  
4. Entdecken Sie spezialisierte MCP-Implementierungen für Ihre Branche  
5. Ziehen Sie in Erwägung, Fortgeschrittenenkurse zu spezifischen MCP-Themen wie Multi-Modal-Integration oder Enterprise Application Integration zu belegen  
6. Experimentieren Sie mit dem Aufbau eigener MCP-Tools und Workflows anhand der im [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) erlernten Prinzipien  

## Was kommt als Nächstes

Weiter zu: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:  
Dieses Dokument wurde mithilfe des KI-Übersetzungsdienstes [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir um Genauigkeit bemüht sind, können automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten. Das ursprüngliche Dokument in seiner Originalsprache gilt als maßgebliche Quelle. Für kritische Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Nutzung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->