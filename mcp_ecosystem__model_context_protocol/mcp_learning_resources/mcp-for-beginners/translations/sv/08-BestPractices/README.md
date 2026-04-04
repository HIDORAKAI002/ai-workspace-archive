# MCP Utvecklingsbästa praxis

[![MCP Development Best Practices](../../../translated_images/sv/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Klicka på bilden ovan för att se videon för denna lektion)_

## Översikt

Denna lektion fokuserar på avancerade bästa praxis för att utveckla, testa och distribuera MCP-servrar och funktioner i produktionsmiljöer. Eftersom MCP-ekosystemen växer i komplexitet och betydelse säkerställer följande av etablerade mönster tillförlitlighet, underhållbarhet och interoperabilitet. Denna lektion sammanställer praktisk visdom från verkliga MCP-implementationer för att vägleda dig i att skapa robusta, effektiva servrar med effektiva resurser, prompts och verktyg.

## Läromål

I slutet av denna lektion kommer du att kunna:

- Tillämpa branschens bästa praxis vid design av MCP-servrar och funktioner
- Skapa omfattande teststrategier för MCP-servrar
- Designa effektiva, återanvändbara arbetsflödesmönster för komplexa MCP-applikationer
- Implementera korrekt felhantering, loggning och observerbarhet i MCP-servrar
- Optimera MCP-implementationer för prestanda, säkerhet och underhållbarhet

## MCP Kärnprinciper

Innan du dyker in i specifika implementationspraxis är det viktigt att förstå kärnprinciperna som styr effektiv MCP-utveckling:

1. **Standardiserad kommunikation**: MCP använder JSON-RPC 2.0 som grund, vilket ger ett konsekvent format för förfrågningar, svar och felhantering i alla implementationer.

2. **Användarcentrerad design**: Prioritera alltid användarens samtycke, kontroll och transparens i dina MCP-implementationer.

3. **Säkerhet först**: Implementera robusta säkerhetsåtgärder inklusive autentisering, auktorisation, validering och hastighetsbegränsning.

4. **Modulär arkitektur**: Designa dina MCP-servrar med ett modulärt tillvägagångssätt, där varje verktyg och resurs har ett tydligt, fokuserat syfte.

5. **Tillståndsbevarande anslutningar**: Utnyttja MCP:s förmåga att bibehålla tillstånd över flera förfrågningar för mer sammanhängande och kontextmedvetna interaktioner.

## Officiella MCP Bästa Praxis

Följande bästa praxis är hämtade från den officiella dokumentationen för Model Context Protocol:

### Säkerhetsbästa praxis

1. **Användarsamtycke och kontroll**: Kräv alltid uttryckligt användarsamtycke innan data nås eller operationer utförs. Ge tydlig kontroll över vilken data som delas och vilka åtgärder som är auktoriserade.

2. **Datasekretess**: Exponera endast användardata med uttryckligt samtycke och skydda den med lämpliga åtkomstkontroller. Skydda mot obehörig dataöverföring.

3. **Verktygssäkerhet**: Kräv uttryckligt användarsamtycke innan ett verktyg anropas. Säkerställ att användare förstår varje verktygs funktionalitet och genomför robusta säkerhetsgränser.

4. **Verktygstillståndskontroll**: Konfigurera vilka verktyg en modell får använda under en session, så att endast uttryckligen auktoriserade verktyg är tillgängliga.

5. **Autentisering**: Kräv korrekt autentisering innan åtkomst ges till verktyg, resurser eller känsliga operationer genom API-nycklar, OAuth-token eller andra säkra autentiseringsmetoder.

6. **Parameter validering**: Tillämpa validering för alla verktygsanrop för att förhindra att felaktig eller skadlig input når verktygsimplementationerna.

7. **Hastighetsbegränsning**: Implementera hastighetsbegränsning för att förhindra missbruk och säkerställa rättvis användning av serverresurser.

### Implementationsbästa praxis

1. **Kapabilitetsförhandling**: Under anslutningsuppsättning, byt information om stödda funktioner, protokollversioner, tillgängliga verktyg och resurser.

2. **Verktygsdesign**: Skapa fokuserade verktyg som gör en sak väl, istället för monolitiska verktyg som hanterar flera bekymmer.

3. **Felhantering**: Implementera standardiserade felmeddelanden och koder för att hjälpa till att diagnostisera problem, hantera fel gracefully och ge åtgärdbara återkopplingar.

4. **Loggning**: Konfigurera strukturerade loggar för revision, felsökning och övervakning av protokollinteraktioner.

5. **Framstegsrapportering**: För långvariga operationer, rapportera framstegsuppdateringar för att möjliggöra responsiva användargränssnitt.

6. **Avbrytning av förfrågningar**: Tillåt klienter att avbryta pågående förfrågningar som inte längre behövs eller tar för lång tid.

## Ytterligare Referenser

För den mest uppdaterade informationen om MCP bästa praxis, se:

- [MCP Dokumentation](https://modelcontextprotocol.io/)
- [MCP Specifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Säkerhetsbästa praxis](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Säkerhetsrisker och åtgärder
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk säkerhetsträning

## Praktiska Implementationsexempel

### Verktygsdesign Bästa Praxis

#### 1. Enskilt Ansvarsprincip

Varje MCP-verktyg bör ha ett tydligt, fokuserat syfte. Istället för att skapa monolitiska verktyg som försöker hantera flera ansvarsområden, utveckla specialiserade verktyg som excellerar på specifika uppgifter.

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

#### 2. Konsekvent Felhantering

Implementera robust felhantering med informativa felmeddelanden och lämpliga återhämtningsmekanismer.

```python
# Python-exempel med omfattande felhantering
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parametervalidering
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Säkerhetsvalidering
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Databasoperation med timeout
                async with timeout(10):  # 10 sekunders timeout
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Anslutningsfel kan vara tillfälliga
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Frågefel är sannolikt klientfel
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Låt verktygsspecifika fel passera
            raise
        except Exception as e:
            # Fångst för oväntade fel
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementering av SQL-injektionsdetektion
        pass
        
    def _log_error(self, message, error):
        # Implementering av fel-loggning
        pass
```

#### 3. Parameter Validering

Validera alltid parametrar noggrant för att förhindra felaktig eller skadlig input.

```javascript
// JavaScript/TypeScript-exempel med detaljerad parametervalidering
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
    // 1. Validera att parameter finns
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Validera parametertyper
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Validera parametervärden
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Validera innehålls närvaro för skrivoperation
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Sökvägsäkerhetskontroll
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementering baserad på validerade parametrar
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementering av sökvägsäkerhetskontroll
    // ...
  }
}
```

### Säkerhetsimplementations Exempel

#### 1. Autentisering och Auktorisation

```java
// Java-exempel med autentisering och auktorisering
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Beroendeinjektion
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
        // 1. Extrahera autentiseringskontext
        String authToken = request.getContext().getAuthToken();
        
        // 2. Autentisera användare
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Kontrollera auktorisering för den specifika operationen
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Fortsätt med auktoriserad operation
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

#### 2. Hastighetsbegränsning

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

## Testbästa Praxis

### 1. Enhetstestning av MCP-verktyg

Testa alltid dina verktyg isolerat, mocka externa beroenden:

```typescript
// TypeScript-exempel på ett enhetstest för ett verktyg
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Skapa en mock-väderservice
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Skapa verktyget med den mockade beroendet
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Förbered
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Utför
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Verifiera
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Förbered
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Utför & verifiera
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integrationstestning

Testa hela flödet från klientförfrågningar till serversvar:

```python
# Python integrations testexempel
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Starta en testserver
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Skapa en klient
        client = McpClient("http://localhost:5000")
        
        # Testa verktygsupptäckt
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Testa verktygsexekvering
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Verifiera svar
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Rensa upp
        await server.stop()
```

## Prestandaoptimering

### 1. Cache-strategier

Implementera lämplig cache för att minska latens och resursanvändning:

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

#### 2. Dependency Injection och Testbarhet

Designa verktyg för att ta emot sina beroenden via konstruktörsinjektion, vilket gör dem testbara och konfigurerbara:

```java
// Java-exempel med beroendeinjektion
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Beroenden injiceras via konstruktorn
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Verktygsimplementation
    // ...
}
```

#### 3. Komponerbara Verktyg

Designa verktyg som kan kombineras för att skapa mer komplexa arbetsflöden:

```python
# Python-exempel som visar komponerbara verktyg
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementering...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Det här verktyget kan använda resultat från dataFetch-verktyget
    async def execute_async(self, request):
        # Implementering...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Det här verktyget kan använda resultat från dataAnalysis-verktyget
    async def execute_async(self, request):
        # Implementering...
        pass

# Dessa verktyg kan användas oberoende eller som en del av ett arbetsflöde
```

### Schemandesign Bästa Praxis

Schemat är kontraktet mellan modellen och ditt verktyg. Väl designade scheman leder till bättre verktygsanvändbarhet.

#### 1. Tydliga Parameterbeskrivningar

Inkludera alltid beskrivande information för varje parameter:

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

#### 2. Valideringsbegränsningar

Inkludera valideringsbegränsningar för att förhindra ogiltig input:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // E-postegenskap med formatvalidering
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Åldersegenskap med numeriska begränsningar
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Enumererad egenskap
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

#### 3. Konsekventa Returstrukturer

Bibehåll konsekvens i dina svarstrukturer för att underlätta modellernas tolkning av resultat:

```python
async def execute_async(self, request):
    try:
        # Bearbeta förfrågan
        results = await self._search_database(request.parameters["query"])
        
        # Returnera alltid en konsekvent struktur
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

### Felhantering

Robust felhantering är avgörande för MCP-verktyg för att upprätthålla tillförlitlighet.

#### 1. Graciös felhantering

Hantera fel på lämpliga nivåer och ge informativa meddelanden:

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

#### 2. Strukturerade felresponser

Returnera strukturerad felinformation när det är möjligt:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementering
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
        
        // Kasta om andra undantag som ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Retry-logik

Implementera lämplig retry-logik för tillfälliga fel:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekunder
    
    while retry_count < max_retries:
        try:
            # Anropa extern API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Exponentiell backoff
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Icketransient fel, försök inte igen
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Prestandaoptimering

#### 1. Caching

Implementera caching för kostsamma operationer:

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

#### 2. Asynkron bearbetning

Använd asynkrona programmeringsmönster för I/O-bundna operationer:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // För långvariga operationer, returnera ett bearbetnings-ID omedelbart
        String processId = UUID.randomUUID().toString();
        
        // Starta asynkron bearbetning
        CompletableFuture.runAsync(() -> {
            try {
                // Utför långvarig operation
                documentService.processDocument(documentId);
                
                // Uppdatera status (skulle vanligtvis lagras i en databas)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Returnera omedelbart svar med process-ID
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Kompanjon-verktyg för statuskontroll
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

#### 3. Resursthrottling

Implementera resursthrottling för att förhindra överbelastning:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Tillåt 5 förfrågningar per sekund
            bucket_size=10        # Tillåt toppar upp till 10 förfrågningar
        )
    
    async def execute_async(self, request):
        # Kontrollera om vi kan fortsätta eller behöver vänta
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Om väntan är för lång
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Vänta den lämpliga fördröjningstiden
                await asyncio.sleep(delay)
        
        # Använd en token och fortsätt med förfrågan
        self.rate_limiter.consume()
        
        # Anropa API
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
            
            # Beräkna tid tills nästa token är tillgänglig
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Lägg till nya tokens baserat på förfluten tid
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Säkerhetsbästa praxis

#### 1. Inmatningsvalidering

Validera alltid ingångsparametrar noggrant:

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

#### 2. Auktorisationskontroller

Implementera korrekta auktorisationskontroller:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Hämta användarkontext från förfrågan
    UserContext user = request.getContext().getUserContext();
    
    // Kontrollera om användaren har nödvändiga behörigheter
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // För specifika resurser, kontrollera åtkomst till den resursen
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Fortsätt med verktygets körning
    // ...
}
```

#### 3. Hantering av känslig data

Hantera känslig data varsamt:

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
        
        # Hämta användardata
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtrera känsliga fält om de inte uttryckligen begärs OCH är auktoriserade
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Kontrollera auktoriseringsnivå i förfrågningskontexten
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Skapa en kopia för att undvika att ändra originalet
        redacted = user_data.copy()
        
        # Dölja specifika känsliga fält
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Dölja nästlad känslig data
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Testbästa praxis för MCP-verktyg

Omfattande testning säkerställer att MCP-verktyg fungerar korrekt, hanterar kantfall och integreras ordentligt med resten av systemet.

### Enhetstestning

#### 1. Testa varje verktyg isolerat

Skapa fokuserade tester för varje verktygs funktionalitet:

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

#### 2. Schema Valideringstester

Testa att scheman är giltiga och tillämpar begränsningar korrekt:

```java
@Test
public void testSchemaValidation() {
    // Skapa verktygsinstans
    SearchTool searchTool = new SearchTool();
    
    // Hämta schema
    Object schema = searchTool.getSchema();
    
    // Konvertera schema till JSON för validering
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Validera att schema är giltig JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Testa giltiga parametrar
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Testa saknad obligatorisk parameter
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Testa ogiltig parametertyp
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Felhanteringstester

Skapa specifika tester för felvillkor:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Ordna
    tool = ApiTool(timeout=0.1)  # Mycket kort timeout
    
    # Mocka en förfrågan som kommer att time out
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Längre än timeout
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Utför & Verifiera
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verifiera undantagsmeddelande
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Ordna
    tool = ApiTool()
    
    # Mocka ett svar med hastighetsbegränsning
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
        
        # Utför & Verifiera
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verifiera att undantaget innehåller information om hastighetsbegränsning
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integrationstestning

#### 1. Verktygskedjetestning

Testa verktyg som arbetar tillsammans i förväntade kombinationer:

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

#### 2. MCP-servertestning

Testa MCP-servern med full verktygsregistrering och exekvering:

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
        // Testa upptäcktsändpunkten
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Skapa verktygsförfrågan
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Skicka förfrågan och verifiera svar
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Skapa ogiltig verktygsförfrågan
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Saknat parameter "b"
        request.put("parameters", parameters);
        
        // Skicka förfrågan och verifiera felmeddelande
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-end-testning

Testa kompletta arbetsflöden från modellsprompt till verktygsexekvering:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Ordna - Ställ in MCP-klient och mockmodell
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Mockmodellens svar
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
    
    # Mocksvaret från väderverktyget
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
        
        # Utför
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Bekräfta
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Prestandatestning

#### 1. Belastningstestning

Testa hur många samtidiga förfrågningar din MCP-server kan hantera:

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

#### 2. Stresstestning

Testa systemet under extrem belastning:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Ställ in JMeter för stresstestning
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Konfigurera JMeter-testplan
    HashTree testPlanTree = new HashTree();
    
    // Skapa testplan, trådgrupp, samplers, etc.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Lägg till HTTP-sampler för verktygskörning
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Lägg till lyssnare
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Kör test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Validera resultat
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Genomsnittlig svarstid < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90:e percentil < 500ms
}
```

#### 3. Övervakning och Profilering

Sätt upp övervakning för långsiktig prestandaanalys:

```python
# Konfigurera övervakning för en MCP-server
def configure_monitoring(server):
    # Ställ in Prometheus-metriker
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
    
    # Lägg till middleware för tidsmätning och inspelning av metrik
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Exponera metrikändpunkt
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP Arbetsflödesdesignmönster

Väl designade MCP-arbetsflöden förbättrar effektivitet, tillförlitlighet och underhållbarhet. Här är viktiga mönster att följa:

### 1. Verktygskedjemönster

Koppla ihop flera verktyg i en sekvens där varje verktygs utdata blir indatan för nästa:

```python
# Python-implementering av verktygskedja
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Lista över verktygsnamn att köra i följd
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Kör varje verktyg i kedjan, skicka föregående resultat
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Spara resultat och använd som indata för nästa verktyg
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Exempel på användning
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

### 2. Dispatcher-mönster

Använd ett centralt verktyg som dispatchar till specialiserade verktyg baserat på input:

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

### 3. Parallellbearbetningsmönster

Exekvera flera verktyg samtidigt för effektivitet:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Steg 1: Hämta datasetmetadata (synkront)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Steg 2: Starta flera analyser parallellt
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
        
        // Vänta på att alla parallella uppgifter ska slutföras
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Vänta på slutförande
        
        // Steg 3: Kombinera resultat
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Steg 4: Generera sammanfattande rapport
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Returnera komplett arbetsflödesresultat
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Felåterställningsmönster

Implementera graciösa fallback-lösningar för verktygsfel:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Försök med primär verktyg först
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Logga misslyckandet
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Fall tillbaka till sekundär verktyg
            try:
                # Kan behöva omvandla parametrar för fallback-verktyget
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Båda verktygen misslyckades
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Denna implementering skulle bero på de specifika verktygen
        # För detta exempel returnerar vi bara de ursprungliga parametrarna
        return params

# Exempel på användning
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Primär (betald) väder-API
        "basicWeatherService",    # Fallback (gratis) väder-API
        {"location": location}
    )
```

### 5. Arbetsflödessammansättningsmönster

Bygg komplexa arbetsflöden genom att komponera enklare:

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

# Testning av MCP-servrar: Bästa praxis och topp-tips

## Översikt

Testning är en kritisk aspekt av att utveckla pålitliga, högkvalitativa MCP-servrar. Denna guide ger omfattande bästa praxis och tips för testning av dina MCP-servrar genom hela utvecklingslivscykeln, från enhetstester till integrationstester och end-to-end-validering.

## Varför testning är viktigt för MCP-servrar

MCP-servrar fungerar som kritisk middleware mellan AI-modeller och klientapplikationer. Grundlig testning säkerställer:

- Tillförlitlighet i produktionsmiljöer
- Korrekt hantering av förfrågningar och svar
- Korrekt implementering av MCP-specifikationer
- Motståndskraft mot fel och kantfall
- Konsekvent prestanda under olika belastningar

## Enhetstestning för MCP-servrar

### Enhetstester (Grundläggande)

Enhetstester verifierar individuella komponenter i din MCP-server isolerat.

#### Vad som ska testas

1. **Resurshanterare**: Testa varje resurshanterares logik oberoende
2. **Verktygsimplementationer**: Verifiera verktygets beteende med olika indata
3. **Promptmallar**: Säkerställ att promptmallar renderas korrekt
4. **Schema-validering**: Testa parameter-valideringslogik
5. **Felhantering**: Verifiera felresponser för ogiltig indata

#### Bästa praxis för enhetstestning

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
# Exempel på enhetstest för ett kalkylatorverktyg i Python
def test_calculator_tool_add():
    # Förbered
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Agera
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Verifiera
    assert result["value"] == 12
```

### Integrationstester (Mellanlager)

Integrationstester verifierar interaktioner mellan komponenter i din MCP-server.

#### Vad som ska testas

1. **Serverinitiering**: Testa serverstart med olika konfigurationer
2. **Routregistrering**: Verifiera att alla endpoints är korrekt registrerade
3. **Förfrågningsbearbetning**: Testa hela förfrågnings-svarscykeln
4. **Felförökning**: Säkerställ att fel hanteras korrekt över komponenter
5. **Autentisering & Auktorisation**: Testa säkerhetsmekanismer

#### Bästa praxis för integrationstestning

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

### End-to-end-tester (Övergripande lager)

End-to-end-tester verifierar hela systemets beteende från klient till server.

#### Vad som ska testas

1. **Klient-server-kommunikation**: Testa kompletta förfrågnings-svarscykler
2. **Riktiga klient-SDK:er**: Testa med faktiska klientimplementationer
3. **Prestanda under belastning**: Verifiera beteende med flera samtidiga förfrågningar
4. **Felåterställning**: Testa systemets återhämtning från fel
5. **Långvariga operationer**: Verifiera hantering av streaming och långa operationer

#### Bästa praxis för E2E-testning

```typescript
// Exempel på E2E-test med en klient i TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Starta server i testmiljö
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Utför
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Verifiera
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mockningsstrategier för MCP-testning

Mockning är avgörande för att isolera komponenter under testning.

### Komponenter att mocka

1. **Extern AI-modell**: Mocka modellresponser för förutsägbar testning
2. **Externa tjänster**: Mocka API-beroenden (databaser, tredjepartstjänster)
3. **Autentiseringstjänster**: Mocka identitetsleverantörer
4. **Resursleverantörer**: Mocka kostsamma resurshanterare

### Exempel: Mocka ett AI-modellsvar

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
# Python-exempel med unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Konfigurera mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Använd mock i test
    server = McpServer(model_client=mock_model)
    # Fortsätt med test
```

## Prestandatestning

Prestandatestning är avgörande för produktions-MCP-servrar.

### Vad att mäta

1. **Latens**: Responstid för förfrågningar
2. **Genomströmning**: Hanterade förfrågningar per sekund
3. **Resursanvändning**: CPU, minne, nätverksanvändning
4. **Samtidighetshantering**: Beteende under parallella förfrågningar
5. **Skalningsegenskaper**: Prestanda när belastningen ökar

### Verktyg för prestandatestning

- **k6**: Öppen källkodsverktyg för belastningstestning
- **JMeter**: Omfattande prestandatestning
- **Locust**: Python-baserad belastningstestning
- **Azure Load Testing**: Molnbaserad prestandatestning

### Exempel: Enkel belastningstest med k6

```javascript
// k6-skript för lasttestning av MCP-server
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtuella användare
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

## Testautomatisering för MCP-servrar

Automatisering av dina tester säkerställer konsekvent kvalitet och snabbare återkopplingsloopar.

### CI/CD Integration
1. **Kör enhetstester på pull requests**: Säkerställ att kodändringar inte bryter befintlig funktionalitet  
2. **Integrationstester i staging**: Kör integrationstester i förproduktionsmiljöer  
3. **Prestandabaserlinjer**: Behåll prestandabakgrund för att fånga regressioner  
4. **Säkerhetsskanningar**: Automatisera säkerhetstestning som en del av pipelinen  

### Exempel på CI-pipeline (GitHub Actions)

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

## Testning för efterlevnad av MCP-specifikation

Verifiera att din server korrekt implementerar MCP-specifikationen.

### Viktiga områden för efterlevnad

1. **API-endpoints**: Testa obligatoriska endpoints (/resources, /tools, etc.)  
2. **Begäran/svar-format**: Validera schemaefterlevnad  
3. **Fel-koder**: Kontrollera korrekta statuskoder för olika scenarier  
4. **Innehållstyper**: Testa hantering av olika innehållstyper  
5. **Autentiseringsflöde**: Verifiera autentiseringsmekanismer enligt specifikationen  

### Testsvit för efterlevnad

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

## Topp 10 tips för effektiv MCP-servertestning

1. **Testa verktygsdefinitioner separat**: Verifiera schema-definitioner oberoende av verktygslogik  
2. **Använd parameteriserade tester**: Testa verktyg med olika ingångar, inklusive kantfall  
3. **Kontrollera felrespons**: Verifiera korrekt felhantering för alla tänkbara felvillkor  
4. **Testa auktorisationslogik**: Säkerställ korrekt åtkomstkontroll för olika användarroller  
5. **Övervaka testtäckning**: Sikta på hög täckning av kritisk kodväg  
6. **Testa strömningssvar**: Verifiera korrekt hantering av strömmande innehåll  
7. **Simulera nätverksproblem**: Testa beteende vid dåliga nätverksförhållanden  
8. **Testa resursgränser**: Verifiera beteende när kvoter eller hastighetsbegränsningar uppnås  
9. **Automatisera regressionstester**: Bygg en svit som körs vid varje kodändring  
10. **Dokumentera testfall**: Underhåll tydlig dokumentation av testscenarier  

## Vanliga fällor vid testning

- **Överdrivet förlitande på lyckade flöden**: Se till att testa felärenden noggrant  
- **Ignorera prestandatestning**: Identifiera flaskhalsar innan de påverkar produktion  
- **Testning i isolering endast**: Kombinera enhets-, integrations- och end-to-end-tester  
- **Ofullständig API-täckning**: Säkerställ att alla endpoints och funktioner testas  
- **Inkonsistenta testmiljöer**: Använd containers för att garantera konsekventa testmiljöer  

## Slutsats

En omfattande teststrategi är avgörande för att utveckla pålitliga, högkvalitativa MCP-servrar. Genom att implementera bästa praxis och tips i denna guide kan du säkerställa att dina MCP-implementationer uppfyller de högsta kraven på kvalitet, tillförlitlighet och prestanda.  

## Viktiga slutsatser

1. **Verktygsdesign**: Följ principen om ett ansvar, använd dependency injection och designa för sammansättbarhet  
2. **Schemadesign**: Skapa tydliga, väl dokumenterade scheman med lämpliga valideringsvillkor  
3. **Felhantering**: Implementera smidig felhantering, strukturerade felresponser och retry-logik  
4. **Prestanda**: Använd cachelagring, asynkron bearbetning och resurshantering  
5. **Säkerhet**: Applicera grundlig indata-validering, auktorisationskontroller och hantering av känslig data  
6. **Testning**: Skapa omfattande enhets-, integrations- och end-to-end-tester  
7. **Arbetsflödesmönster**: Använd etablerade mönster som kedjor, dispatchers och parallell bearbetning  

## Övning

Designa ett MCP-verktyg och arbetsflöde för ett dokumenthanteringssystem som:

1. Tar emot dokument i flera format (PDF, DOCX, TXT)  
2. Extraherar text och nyckelinformation från dokumenten  
3. Klassificerar dokument efter typ och innehåll  
4. Genererar en sammanfattning av varje dokument  

Implementera verktygsscheman, felhantering och ett arbetsflödesmönster som passar detta scenario. Fundera på hur du skulle testa denna implementation.  

## Resurser 

1. Gå med i MCP-communityn på [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) för att hålla dig uppdaterad om senaste utvecklingen  
2. Bidra till open-source [MCP-projekt](https://github.com/modelcontextprotocol)  
3. Tillämpa MCP-principer i din egen organisations AI-initiativ  
4. Utforska specialiserade MCP-implementationer för din bransch  
5. Överväg att gå avancerade kurser om specifika MCP-ämnen, såsom multimodal integration eller företagsapplikationsintegration  
6. Experimentera med att bygga egna MCP-verktyg och arbetsflöden med principerna från [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Vad händer härnäst

Nästa: [Fallstudier](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet bör du vara medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För viktig information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår vid användning av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->