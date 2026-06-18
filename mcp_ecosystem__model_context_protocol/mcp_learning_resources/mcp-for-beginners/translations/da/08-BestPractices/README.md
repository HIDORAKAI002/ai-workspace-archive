# MCP Udviklings bedste praksis

[![MCP Development Best Practices](../../../translated_images/da/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Klik på billedet ovenfor for at se video af denne lektion)_

## Oversigt

Denne lektion fokuserer på avancerede bedste praksisser for udvikling, test og implementering af MCP-servere og funktioner i produktionsmiljøer. Efterhånden som MCP-økosystemer vokser i kompleksitet og betydning, sikrer følge af etablerede mønstre pålidelighed, vedligeholdelse og interoperabilitet. Denne lektion samler praktisk erfaring fra virkelige MCP-implementeringer for at vejlede dig i at skabe robuste, effektive servere med effektive ressourcer, prompts og værktøjer.

## Læringsmål

Ved slutningen af denne lektion vil du kunne:

- Anvende branchens bedste praksisser inden for MCP-server- og funktionsdesign
- Oprette omfattende teststrategier for MCP-servere
- Designe effektive, genanvendelige arbejdsflowmønstre til komplekse MCP-applikationer
- Implementere korrekt fejlhåndtering, logning og observabilitet i MCP-servere
- Optimere MCP-implementeringer for ydeevne, sikkerhed og vedligeholdelse

## MCP-kerneprincipper

Før vi dykker ned i specifikke implementeringsmetoder, er det vigtigt at forstå de grundlæggende principper, der styrer effektiv MCP-udvikling:

1. **Standardiseret kommunikation**: MCP bruger JSON-RPC 2.0 som fundament, hvilket giver et konsistent format for forespørgsler, responser og fejlhåndtering på tværs af alle implementeringer.

2. **Brugercentreret design**: Prioriter altid brugerens samtykke, kontrol og gennemsigtighed i dine MCP-implementeringer.

3. **Sikkerhed først**: Implementer robuste sikkerhedsforanstaltninger inklusive autentifikation, autorisation, validering og hastighedsbegrænsning.

4. **Modulær arkitektur**: Design dine MCP-servere med en modulær tilgang, hvor hvert værktøj og ressourcer har et klart, fokuseret formål.

5. **Stateful forbindelser**: Udnyt MCP's evne til at opretholde tilstand på tværs af flere forespørgsler for mere sammenhængende og kontekstbevidste interaktioner.

## Officielle MCP bedste praksisser

Følgende bedste praksisser er afledt af den officielle Model Context Protocol-dokumentation:

### Sikkerhedsbedste praksisser

1. **Brugersamtykke og kontrol**: Kræv altid eksplicit brugersamtykke inden adgang til data eller udførelse af operationer. Giv klar kontrol over, hvilke data der deles, og hvilke handlinger der er autoriseret.

2. **Dataprivatliv**: Eksponer kun brugerdata med eksplicit samtykke og beskyt det med passende adgangskontroller. Beskyt mod uautoriseret dataoverførsel.

3. **Værktøjssikkerhed**: Kræv eksplicit brugersamtykke inden kald af noget værktøj. Sørg for, at brugerne forstår hvert værktøjs funktionalitet og håndhæv robuste sikkerhedsgrænser.

4. **Værktøjstilladelsesstyring**: Konfigurer, hvilke værktøjer en model må bruge under en session, så kun eksplicit autoriserede værktøjer er tilgængelige.

5. **Autentifikation**: Kræv korrekt autentifikation inden adgang til værktøjer, ressourcer eller følsomme operationer ved brug af API-nøgler, OAuth-tokens eller andre sikre autentifikationsmetoder.

6. **Parameter-validering**: Håndhæv validering for alle værktøjskald for at forhindre fejlagtig eller skadelig input i at nå værktøjsimplementeringer.

7. **Hastighedsbegrænsning**: Implementer hastighedsbegrænsning for at forhindre misbrug og sikre fair brug af serverressourcer.

### Implementeringsbedste praksisser

1. **Kapabilitetsforhandling**: Udveksl under forbindelseopsætning information om understøttede funktioner, protokolversioner, tilgængelige værktøjer og ressourcer.

2. **Værktøjsdesign**: Skab fokuserede værktøjer, der gør én ting godt, i stedet for monolitiske værktøjer, der håndterer flere bekymringer.

3. **Fejlhåndtering**: Implementer standardiserede fejlkoder og -meddelelser til at hjælpe med at diagnosticere problemer, håndtere fejl yndefuldt og give brugbar feedback.

4. **Logning**: Konfigurer strukturerede logs til revision, fejlfinding og overvågning af protokolinteraktioner.

5. **Fremdriftssporing**: For langvarige operationer rapporter statusopdateringer for at muliggøre responsive brugerflader.

6. **Annullering af forespørgsler**: Tillad klienter at annullere igangværende forespørgsler, der ikke længere er nødvendige eller tager for lang tid.

## Yderligere referencer

For den mest opdaterede information om MCP bedste praksisser, henvises til:

- [MCP Dokumentation](https://modelcontextprotocol.io/)
- [MCP Specifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Sikkerhedsbedste praksisser](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sikkerhedsrisici og afbødninger
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhedstræning

## Praktiske implementeringseksempler

### Værktøjsdesign bedste praksisser

#### 1. Enkel Ansvarsprincip

Hvert MCP-værktøj bør have et klart, fokuseret formål. I stedet for at skabe monolitiske værktøjer, der forsøger at håndtere flere bekymringer, udvikl specialiserede værktøjer, som excellerer i specifikke opgaver.

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

#### 2. Konsistent fejlhåndtering

Implementer robust fejlhåndtering med informative fejlkoder og passende genopretningsmekanismer.

```python
# Python-eksempel med omfattende fejlhåndtering
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parameter validering
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Sikkerhedsvalidering
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Databaseoperation med timeout
                async with timeout(10):  # 10 sekunders timeout
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Forbindelsesfejl kan være midlertidige
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Forespørgselsfejl er sandsynligvis klientfejl
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Lad værktøjsspecifikke fejl passere
            raise
        except Exception as e:
            # Fange alle for uventede fejl
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementering af SQL-injektionsdetektion
        pass
        
    def _log_error(self, message, error):
        # Implementering af fejllogning
        pass
```

#### 3. Parameter-validering

Valider altid parametre grundigt for at forhindre fejlagtig eller skadelig input.

```javascript
// JavaScript/TypeScript eksempel med detaljeret parameter validering
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
    // 1. Valider parameter tilstedeværelse
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Valider parametertyper
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Valider parameterværdier
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Valider indholdstilstedeværelse for skriveoperation
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Validering af sti-sikkerhed
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementering baseret på validerede parametre
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementering af sti-sikkerhedskontrol
    // ...
  }
}
```

### Sikkerhedsimplementeringseksempler

#### 1. Autentifikation og autorisation

```java
// Java eksempel med autentificering og autorisation
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Afhængighedsinjektion
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
        // 1. Udtræk autentificeringskontekst
        String authToken = request.getContext().getAuthToken();
        
        // 2. Autentificer bruger
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Tjek autorisation for den specifikke operation
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Fortsæt med autoriseret operation
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

#### 2. Hastighedsbegrænsning

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

## Test bedste praksisser

### 1. Enhedstest af MCP-værktøjer

Test altid dine værktøjer isoleret, ved at mocke eksterne afhængigheder:

```typescript
// TypeScript eksempel på en værktøj enhedstest
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Opret en mock vejrservice
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Opret værktøjet med den mock afhængighed
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Arranger
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Udfør
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Bekræft
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Arranger
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Udfør og bekræft
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integrationstest

Test hele flowet fra klientforespørgsler til serverresponser:

```python
# Python integrations test eksempel
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Start en testserver
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Opret en klient
        client = McpClient("http://localhost:5000")
        
        # Test værktøjsopdagelse
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Test værktøjsudførelse
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Bekræft svar
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Ryd op
        await server.stop()
```

## Ydelsesoptimering

### 1. Cache-strategier

Implementer passende caching for at reducere latenstid og ressourceforbrug:

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

#### 2. Dependency Injection og testbarhed

Design værktøjer til at modtage deres afhængigheder via konstruktør-injektion, så de bliver testbare og konfigurerbare:

```java
// Java-eksempel med afhængighedsinjektion
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Afhængigheder injiceret gennem konstruktøren
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Værktøjsimplementering
    // ...
}
```

#### 3. Komponerbare værktøjer

Design værktøjer, der kan sammensættes for at skabe mere komplekse arbejdsgange:

```python
# Python-eksempel, der viser sammensættelige værktøjer
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementering...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Dette værktøj kan bruge resultater fra dataFetch-værktøjet
    async def execute_async(self, request):
        # Implementering...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Dette værktøj kan bruge resultater fra dataAnalysis-værktøjet
    async def execute_async(self, request):
        # Implementering...
        pass

# Disse værktøjer kan bruges uafhængigt eller som en del af en arbejdsproces
```

### Skemadesign bedste praksisser

Skemaet er kontrakten mellem modellen og dit værktøj. Veludformede skemaer fører til bedre brugervenlighed af værktøjet.

#### 1. Klare parameterbeskrivelser

Inddrag altid beskrivende information for hver parameter:

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

#### 2. Valideringsrestriktioner

Indsæt valideringsrestriktioner for at forhindre ugyldige inputs:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Email-egenskab med formatvalidering
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Alder-egenskab med numeriske begrænsninger
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Enumereret egenskab
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

#### 3. Konsistente returstrukturer

Oprethold konsistens i dine responsstrukturer for at gøre det nemmere for modeller at tolke resultater:

```python
async def execute_async(self, request):
    try:
        # Behandl forespørgsel
        results = await self._search_database(request.parameters["query"])
        
        # Returner altid en konsistent struktur
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

### Fejlhåndtering

Robust fejlhåndtering er afgørende for MCP-værktøjers pålidelighed.

#### 1. Yndefuld fejlhåndtering

Håndter fejl på passende niveauer og giv informative meddelelser:

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

#### 2. Strukturerede fejlsvar

Returner strukturerede fejloplysninger hvor muligt:

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
        
        // Kaster andre undtagelser igen som ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Genforsøgslogik

Implementer passende genforsøg ved midlertidige fejl:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekunder
    
    while retry_count < max_retries:
        try:
            # Kald ekstern API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Eksponentiel tilbagefald
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Ikke-transient fejl, prøv ikke igen
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Ydelsesoptimering

#### 1. Caching

Implementer caching for dyre operationer:

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

#### 2. Asynkron behandling

Brug asynkrone programmeringsmønstre for I/O-bundne operationer:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // For langevarende operationer returneres en behandling-ID med det samme
        String processId = UUID.randomUUID().toString();
        
        // Start asynkron behandling
        CompletableFuture.runAsync(() -> {
            try {
                // Udfør langevarende operation
                documentService.processDocument(documentId);
                
                // Opdater status (vil typisk blive gemt i en database)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Returner øjeblikkelig respons med proces-ID
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Følgesvend statuskontrolværktøj
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

#### 3. Ressourcestyring

Implementer ressourcestyring for at forhindre overbelastning:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Tillad 5 forespørgsler pr. sekund
            bucket_size=10        # Tillad spring op til 10 forespørgsler
        )
    
    async def execute_async(self, request):
        # Tjek om vi kan fortsætte eller skal vente
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Hvis ventetiden er for lang
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Vent den passende forsinkelsestid
                await asyncio.sleep(delay)
        
        # Forbrug en token og fortsæt med forespørgslen
        self.rate_limiter.consume()
        
        # Kald API
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
            
            # Beregn tid indtil næste token er tilgængelig
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Tilføj nye tokens baseret på forløbet tid
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Sikkerhedsbedste praksisser

#### 1. Inputvalidering

Valider altid inputparametre grundigt:

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

#### 2. Autorisationskontrol

Implementer korrekt autorisationskontrol:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Hent brugerkontekst fra anmodning
    UserContext user = request.getContext().getUserContext();
    
    // Kontroller om brugeren har de nødvendige tilladelser
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // For specifikke ressourcer, kontroller adgang til den pågældende ressource
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Fortsæt med værktøjets udførelse
    // ...
}
```

#### 3. Håndtering af følsomme data

Håndter følsomme data med omhu:

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
        
        # Hent brugerdata
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtrer følsomme felter, medmindre det eksplicit er anmodet om OG godkendt
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Tjek autorisationsniveau i anmodningskonteksten
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Opret en kopi for at undgå at ændre originalen
        redacted = user_data.copy()
        
        # Udelad specifikke følsomme felter
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Udelad indlejrede følsomme data
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Test bedste praksisser for MCP-værktøjer

Omfattende tests sikrer, at MCP-værktøjer fungerer korrekt, håndterer kanttilfælde og integreres ordentligt med resten af systemet.

### Enhedstest

#### 1. Test hvert værktøj isoleret

Opret fokuserede tests for hvert værktøjs funktionalitet:

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

#### 2. Skemavalideringstest

Test at skemaer er valide og håndhæver restriktioner korrekt:

```java
@Test
public void testSchemaValidation() {
    // Opret værktøjsinstans
    SearchTool searchTool = new SearchTool();
    
    // Hent skema
    Object schema = searchTool.getSchema();
    
    // Konverter skema til JSON til validering
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Valider at skemaet er gyldigt JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Test gyldige parametre
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Test manglende påkrævet parameter
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Test ugyldig parametertype
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Fejlhåndteringstests

Opret specifikke tests for fejltilstande:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Arranger
    tool = ApiTool(timeout=0.1)  # Meget kort timeout
    
    # Mock en forespørgsel der vil timeout
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Længere end timeout
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Udfør og bekræft
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verificer undtagelsesbesked
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Arranger
    tool = ApiTool()
    
    # Mock et svar med ratelimit
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
        
        # Udfør og bekræft
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verificer at undtagelsen indeholder ratelimit information
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integrationstest

#### 1. Værktøjskædetest

Test værktøjer der arbejder sammen i forventede kombinationer:

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

#### 2. MCP-servertest

Test MCP-serveren med fuld værktøjsregistrering og udførelse:

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
        // Test opdagelsesendepunktet
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Opret værktøjsanmodning
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Send anmodning og bekræft svar
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Opret ugyldig værktøjsanmodning
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Manglende parameter "b"
        request.put("parameters", parameters);
        
        // Send anmodning og bekræft fejlsvar
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-end-test

Test komplette arbejdsgange fra modelprompt til værktøjsudførelse:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Arranger - Opsæt MCP-klient og mock-model
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Mock-modelsvar
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
    
    # Mock-vejr værktøjs svar
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
        
        # Handling
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Påstand
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Ydelsestest

#### 1. Belastningstest

Test hvor mange samtidige forespørgsler din MCP-server kan håndtere:

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

#### 2. Stresstest

Test systemet under ekstrem belastning:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Opsæt JMeter til stresstest
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Konfigurer JMeter testplan
    HashTree testPlanTree = new HashTree();
    
    // Opret testplan, trådgruppe, samplere osv.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Tilføj HTTP-sampler til værktøjsudførelse
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Tilføj lyttere
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Kør test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Bekræft resultater
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Gennemsnitlig svartid < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. percentil < 500ms
}
```

#### 3. Overvågning og profilering

Opsæt overvågning til langsigtet ydelsesanalyse:

```python
# Konfigurer overvågning for en MCP-server
def configure_monitoring(server):
    # Opsæt Prometheus-metrikker
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
    
    # Tilføj middleware til tidsmåling og registrering af metrikker
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Eksponer metriks endepunktet
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP arbejdsgang designmønstre

Veludformede MCP-arbejdsgange øger effektivitet, pålidelighed og vedligeholdelse. Følgende nøglemønstre anbefales:

### 1. Kæde af værktøjer-mønstret

Forbind flere værktøjer i en sekvens, hvor hvert værktøjs output bliver input til næste:

```python
# Python implementering af værktøjskæde
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Liste over værktøjsnavne til at køre i rækkefølge
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Kør hvert værktøj i kæden og giv tidligere resultat videre
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Gem resultat og brug som input til næste værktøj
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Eksempel på anvendelse
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

### 2. Dispatcher-mønstret

Brug et centralt værktøj, der dirigerer til specialiserede værktøjer baseret på input:

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

### 3. Parallelle processer-mønstret

Udfør flere værktøjer samtidigt for effektivitet:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Trin 1: Hent datasætmetadata (synkront)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Trin 2: Start flere analyser parallelt
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
        
        // Vent på, at alle parallelle opgaver er fuldførte
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Vent på færdiggørelse
        
        // Trin 3: Kombiner resultater
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Trin 4: Generer sammenfattende rapport
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Returner komplet arbejdsprocesresultat
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Fejlrecovery-mønstret

Implementer yndefulde fallback-løsninger ved værktøjsfejl:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Prøv primært værktøj først
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Log fejlen
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Søg tilbagetrækning til sekundært værktøj
            try:
                # Parametre kan være nødt til at blive transformeret for tilbagetrækningsværktøj
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Begge værktøjer fejlede
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Denne implementering ville afhænge af de specifikke værktøjer
        # For dette eksempel returnerer vi bare de oprindelige parametre
        return params

# Eksempel på brug
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Primær (betalt) vejr-API
        "basicWeatherService",    # Tilbagetræknings- (gratis) vejr-API
        {"location": location}
    )
```

### 5. Workflow-kompositionsmønstret

Byg komplekse arbejdsgange ved at komponere enklere workflows:

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

# Test af MCP-servere: Bedste praksisser og top-tips

## Oversigt

Testning er en kritisk del af udvikling af pålidelige, høj-kvalitets MCP-servere. Denne guide giver omfattende bedste praksisser og tips til test af dine MCP-servere gennem hele udviklingscyklussen, fra enhedstest til integrationstest og end-to-end validering.

## Hvorfor testning er vigtigt for MCP-servere

MCP-servere fungerer som afgørende middleware mellem AI-modeller og klientapplikationer. Grundig test sikrer:

- Pålidelighed i produktionsmiljøer  
- Korrekt håndtering af forespørgsler og svar  
- Korrekt implementering af MCP-specifikationer  
- Robusthed mod fejl og kanttilfælde  
- Konsistent ydeevne under forskellige belastninger

## Enhedstest for MCP-servere

### Enhedstest (Grundlag)

Enhedstest verificerer individuelle komponenter af din MCP-server isoleret.

#### Hvad skal testes

1. **Ressourcehåndterere**: Test logikken for hver ressourcehåndterer uafhængigt  
2. **Værktøjsimplementeringer**: Verificer værktøjers adfærd med forskellige input  
3. **Promptskabeloner**: Sikr at promptskabeloner gengives korrekt  
4. **Skemavalidering**: Test parameter-valideringslogik  
5. **Fejlhåndtering**: Verificer fejlresponser ved ugyldige input  

#### Bedste praksisser for enhedstest

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
# Eksempel på enhedstest for et lommeregner værktøj i Python
def test_calculator_tool_add():
    # Arranger
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Udfør
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Bekræft
    assert result["value"] == 12
```

### Integrationstest (Midterlag)

Integrationstest verificerer interaktioner mellem komponenter i din MCP-server.

#### Hvad skal testes

1. **Serverinitialisering**: Test serveropstart med forskellige konfigurationer  
2. **Rute-registrering**: Verificer at alle endpoints er korrekt registreret  
3. **Forespørgselsbehandling**: Test hele forespørgsels-svar cyklussen  
4. **Fejlopsporing**: Sikr at fejl håndteres korrekt på tværs af komponenter  
5. **Autentifikation og autorisation**: Test sikkerhedsmekanismer

#### Bedste praksisser for integrationstest

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

### End-to-end test (Toplag)

End-to-end-tests verificerer den komplette systemadfærd fra klient til server.

#### Hvad skal testes

1. **Klient-server kommunikation**: Test komplette forespørgsels-svar cykler  
2. **Ægte klient-SDK'er**: Test med faktiske klientimplementeringer  
3. **Ydelse under belastning**: Verificer adfærd med flere samtidige forespørgsler  
4. **Fejlrecovery**: Test systemets genopretning efter fejl  
5. **Langvarige operationer**: Verificer håndtering af streaming og langvarige operationer

#### Bedste praksisser for E2E test

```typescript
// Eksempel på E2E test med en klient i TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Start server i testmiljø
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Handling
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Påstand
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mocking-strategier for MCP-test

Mocking er essentielt til at isolere komponenter under testning.

### Komponenter at mocke

1. **Eksterne AI-modeller**: Mock modelresponser for forudsigelig testning  
2. **Eksterne tjenester**: Mock API-afhængigheder (databaser, tredjeparts tjenester)  
3. **Autentifikationstjenester**: Mock identitetsudbydere  
4. **Ressourceudbydere**: Mock dyre ressourcehåndterere

### Eksempel: Mocking af et AI-model-respons

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
# Python eksempel med unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Konfigurer mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Brug mock i test
    server = McpServer(model_client=mock_model)
    # Fortsæt med test
```

## Ydelsestest

Ydelsestest er afgørende for produktions-MCP-servere.

### Hvad skal måles

1. **Latenstid**: Responstid for forespørgsler  
2. **Gennemløb**: Håndterede forespørgsler pr. sekund  
3. **Ressourceforbrug**: CPU, hukommelse, netværksbrug  
4. **Samtidig håndtering**: Adfærd ved parallelle forespørgsler  
5. **Skaleringskarakteristika**: Ydelse ved stigende belastning

### Værktøjer til ydelsestest

- **k6**: Open-source belastningstestværktøj  
- **JMeter**: Omfattende ydelsestest  
- **Locust**: Python-baseret belastningstest  
- **Azure Load Testing**: Cloud-baseret ydelsestest

### Eksempel: Grundlæggende belastningstest med k6

```javascript
// k6 script til belastningstest af MCP-server
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtuelle brugere
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

## Testautomatisering for MCP-servere

Automatisering af dine tests sikrer ensartet kvalitet og hurtigere feedback-løkker.

### CI/CD-integration

1. **Kør enhedstest ved pull requests**: Sikr at kodeændringer ikke bryder eksisterende funktionalitet
2. **Integrationstests i staging**: Kør integrationstests i pre-produktionsmiljøer  
3. **Ydelsesbaselines**: Vedligehold ydelsesbenchmarks for at opdage regressionsfejl  
4. **Sikkerhedsscanninger**: Automatiser sikkerhedstest som en del af pipelinen  

### Eksempel på CI-pipeline (GitHub Actions)

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
  
## Test for overholdelse af MCP-specifikationen

Bekræft at din server korrekt implementerer MCP-specifikationen.

### Centrale overholdelsesområder

1. **API-endepunkter**: Test nødvendige endepunkter (/resources, /tools osv.)  
2. **Request/Response-format**: Valider skemasamsvar  
3. **Fejlkoder**: Bekræft korrekte statuskoder for forskellige scenarier  
4. **Indholdstyper**: Test håndtering af forskellige indholdstyper  
5. **Autentificeringsflow**: Bekræft spec-kompatible autentificeringsmekanismer  

### Overholdelsestestsuite

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
  
## Top 10 tips til effektiv MCP-servertest

1. **Test værktøjsdefinitioner separat**: Bekræft skemadefinitioner uafhængigt af værktøjslogikken  
2. **Brug parametrede tests**: Test værktøjer med en række input, inklusive kanttilfælde  
3. **Kontroller fejlbesvarelser**: Bekræft korrekt fejlbehandling for alle mulige fejltilstande  
4. **Test autorisationslogik**: Sikr korrekt adgangskontrol for forskellige brugerroller  
5. **Overvåg testdækning**: Sigte efter høj dækning af kritisk sti-kode  
6. **Test streaming-responser**: Bekræft korrekt håndtering af streaming-indhold  
7. **Simuler netværksproblemer**: Test adfærd under dårlige netværksforhold  
8. **Test ressourcebegrænsninger**: Bekræft adfærd ved opnåelse af kvoter eller ratelimits  
9. **Automatiser regressionstests**: Byg en suite, der kører ved hver kodeændring  
10. **Dokumenter testcases**: Vedligehold klar dokumentation af testscenarier  

## Almindelige testfaldgruber

- **Overafhængighed af "happy path" testning**: Sørg for at teste fejlscenarier grundigt  
- **Overser ydelsestestning**: Identificer flaskehalse inden de påvirker produktion  
- **Tester kun isoleret**: Kombinér unit-, integrations- og end-to-end tests  
- **Ufuldstændig API-dækning**: Sikr at alle endepunkter og funktioner testes  
- **Inkonsistente testmiljøer**: Brug containere for at sikre konsistente testmiljøer  

## Konklusion

En omfattende teststrategi er afgørende for udvikling af pålidelige og høj-kvalitets MCP-servere. Ved at implementere bedste praksis og tips beskrevet i denne guide, kan du sikre, at dine MCP-implementeringer opfylder de højeste standarder for kvalitet, pålidelighed og ydeevne.  

## Vigtige pointer

1. **Værktøjsdesign**: Følg single responsibility-princippet, brug dependency injection, og design for komponerbarhed  
2. **Skemadesign**: Skab klare, veldokumenterede skemaer med korrekte valideringsbegrænsninger  
3. **Fejlhåndtering**: Implementer yndefuld fejlhåndtering, strukturerede fejlbesvarelser og genforsøg-logik  
4. **Ydeevne**: Brug caching, asynkron behandling og ressourcebegrænsning  
5. **Sikkerhed**: Anvend grundig inputvalidering, autorisationskontroller og håndtering af følsomme data  
6. **Testning**: Opret omfattende unit-, integrations- og end-to-end tests  
7. **Workflowsmønstre**: Anvend etablerede mønstre som chains, dispatchers og parallel behandling  

## Øvelse

Design et MCP-værktøj og workflow til et dokumentbehandlingssystem, der:

1. Accepterer dokumenter i flere formater (PDF, DOCX, TXT)  
2. Uddrager tekst og nøgleinformation fra dokumenterne  
3. Klassificerer dokumenter efter type og indhold  
4. Genererer et resume af hvert dokument  

Implementer værktøjsskemaerne, fejlhåndtering og et workflowmønster, der bedst passer til dette scenarie. Overvej hvordan du ville teste denne implementering.  

## Ressourcer  

1. Deltag i MCP-fællesskabet på [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) for at holde dig opdateret på de seneste udviklinger  
2. Bidrag til open source [MCP projekter](https://github.com/modelcontextprotocol)  
3. Anvend MCP-principper i din egen organisations AI-initiativer  
4. Udforsk specialiserede MCP-implementeringer til din branche  
5. Overvej avancerede kurser i specifikke MCP-emner, som multi-modal integration eller enterprise applikationsintegration  
6. Eksperimenter med at bygge dine egne MCP-værktøjer og workflows ved at bruge principperne lært gennem [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Hvad er det næste

Næste: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->