# MCP Ontwikkelingsrichtlijnen

[![MCP Ontwikkelingsrichtlijnen](../../../translated_images/nl/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

## Overzicht

Deze les richt zich op geavanceerde best practices voor het ontwikkelen, testen en implementeren van MCP-servers en -functies in productieomgevingen. Naarmate MCP-ecosystemen in complexiteit en belang groeien, zorgt het volgen van vastgestelde patronen voor betrouwbaarheid, onderhoudbaarheid en interoperabiliteit. Deze les bundelt praktische kennis die is opgedaan uit MCP-implementaties in de echte wereld om je te begeleiden bij het creëren van robuuste, efficiënte servers met effectieve resources, prompts en tools.

## Leerdoelen

Aan het einde van deze les kun je:

- Industriële best practices toepassen bij het ontwerpen van MCP-servers en functies
- Uitgebreide teststrategieën voor MCP-servers creëren
- Efficiënte, herbruikbare workflowpatronen ontwerpen voor complexe MCP-toepassingen
- Juiste foutafhandeling, logging en observeerbaarheid implementeren in MCP-servers
- MCP-implementaties optimaliseren voor prestaties, beveiliging en onderhoudbaarheid

## Kernprincipes van MCP

Voordat we dieper ingaan op specifieke implementatiepraktijken, is het belangrijk de kernprincipes te begrijpen die effectieve MCP-ontwikkeling sturen:

1. **Gestandaardiseerde communicatie**: MCP gebruikt JSON-RPC 2.0 als basis, wat een consistent formaat biedt voor verzoeken, antwoorden en foutafhandeling in alle implementaties.

2. **Gebruikersgericht ontwerp**: Geef altijd prioriteit aan toestemming van de gebruiker, controle en transparantie in je MCP-implementaties.

3. **Beveiliging eerst**: Implementeer robuuste beveiligingsmaatregelen inclusief authenticatie, autorisatie, validatie en rate limiting.

4. **Modulaire architectuur**: Ontwerp je MCP-servers met een modulaire aanpak, waarbij elk hulpmiddel en resource een duidelijk, gericht doel heeft.

5. **Statevolle verbindingen**: Benut MCP’s mogelijkheid om status te behouden over meerdere verzoeken voor meer coherente en contextbewuste interacties.

## Officiële MCP Best Practices

De volgende best practices zijn afgeleid uit de officiële Model Context Protocol-documentatie:

### Beveiligingsbest practices

1. **Toestemming en controle gebruiker**: Vereis altijd expliciete toestemming van de gebruiker voordat je gegevens toegankelijk maakt of bewerkingen uitvoert. Bied duidelijke controle over welke gegevens worden gedeeld en welke acties zijn geautoriseerd.

2. **Gegevensprivacy**: Maak gebruikersgegevens alleen toegankelijk met expliciete toestemming en bescherm ze met passende toegangscontroles. Bescherm tegen ongeautoriseerde gegevensoverdracht.

3. **Veiligheid van hulpmiddelen**: Vereis expliciete toestemming van de gebruiker voordat een hulpmiddel wordt aangeroepen. Zorg dat gebruikers de functionaliteit van elk hulpmiddel begrijpen en handhaaf robuuste beveiligingsgrenzen.

4. **Toestemmingscontrole voor hulpmiddelen**: Configureer welke hulpmiddelen een model mag gebruiken tijdens een sessie, zodat alleen expliciet geautoriseerde hulpmiddelen toegankelijk zijn.

5. **Authenticatie**: Vereis juiste authenticatie voordat toegang wordt verleend tot hulpmiddelen, resources of gevoelige handelingen via API-sleutels, OAuth-tokens of andere veilige authenticatiemethoden.

6. **Parametervalidatie**: Voer validatie uit voor alle aanroepen van hulpmiddelen om te voorkomen dat verkeerd gevormde of kwaadaardige invoer bij de implementaties terechtkomt.

7. **Rate limiting**: Implementeer rate limiting om misbruik te voorkomen en eerlijk gebruik van serverresources te waarborgen.

### Implementatiebest practices

1. **Capabiliteitsonderhandeling**: Wissel tijdens het opzetten van de verbinding informatie uit over ondersteunde functies, protocoll versies, beschikbare hulpmiddelen en resources.

2. **Ontwerp van hulpmiddelen**: Maak gerichte hulpmiddelen die één ding goed doen, in plaats van monolithische hulpmiddelen die meerdere verantwoordelijkheden beheersen.

3. **Foutafhandeling**: Implementeer gestandaardiseerde foutmeldingen en codes om problemen te helpen diagnosticeren, falen gracieus af te handelen en bruikbare feedback te bieden.

4. **Logging**: Configureer gestructureerde logs voor auditing, debuggen en het monitoren van protocolinteracties.

5. **Voortgangstracking**: Rapporteer voortgangsupdates bij langlopende handelingen om responsieve gebruikersinterfaces mogelijk te maken.

6. **Annulering van verzoeken**: Sta cliënten toe om lopende verzoeken te annuleren die niet langer nodig zijn of te lang duren.

## Aanvullende documenten

Voor de meest recente informatie over MCP-best practices, raadpleeg:

- [MCP Documentatie](https://modelcontextprotocol.io/)
- [MCP Specificatie (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Beveiligingsbest practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Beveiligingsrisico's en mitigaties
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktische beveiligingstraining

## Praktische implementatievoorbeelden

### Best Practices voor Ontwerp van Hulpmiddelen

#### 1. Single Responsibility Principle

Elk MCP-hulpmiddel moet een duidelijk, gericht doel hebben. Ontwikkel gespecialiseerde hulpmiddelen die uitblinken in specifieke taken, in plaats van monolithische tools die meerdere verantwoordelijkheden proberen te combineren.

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

#### 2. Consistente foutafhandeling

Implementeer robuuste foutafhandeling met informatieve foutmeldingen en passende herstelmechanismen.

```python
# Python voorbeeld met uitgebreide foutafhandeling
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parametervalidatie
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Beveiligingsvalidatie
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Databasebewerking met time-out
                async with timeout(10):  # 10 seconden time-out
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Verbindingsfouten kunnen tijdelijk zijn
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Queryfouten zijn waarschijnlijk clientfouten
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Laat toolspecifieke fouten door
            raise
        except Exception as e:
            # Catch-all voor onverwachte fouten
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementatie van SQL-injectiedetectie
        pass
        
    def _log_error(self, message, error):
        # Implementatie van foutlogboekregistratie
        pass
```

#### 3. Parametervalidatie

Valideer parameters altijd grondig om verkeerd gevormde of kwaadaardige invoer te voorkomen.

```javascript
// JavaScript/TypeScript voorbeeld met gedetailleerde parametervalidatie
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
    // 1. Valideer aanwezigheid van parameters
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Valideer parameter types
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Valideer parameterwaarden
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Valideer aanwezigheid van inhoud voor schrijfoperatie
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Validatie van padveiligheid
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementatie gebaseerd op gevalideerde parameters
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementatie van padveiligheidscontrole
    // ...
  }
}
```

### Beveiligingsimplementatievoorbeelden

#### 1. Authenticatie en autorisatie

```java
// Java voorbeeld met authenticatie en autorisatie
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Dependency injection
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
        // 1. Haal authenticatiecontext op
        String authToken = request.getContext().getAuthToken();
        
        // 2. Verifieer gebruiker
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Controleer autorisatie voor de specifieke operatie
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Ga door met geautoriseerde operatie
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

#### 2. Rate limiting

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

## Testbest practices

### 1. Unit testen van MCP-hulpmiddelen

Test je hulpmiddelen altijd geïsoleerd en mock externe afhankelijkheden:

```typescript
// TypeScript voorbeeld van een tool unit test
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Maak een mock weer service
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Maak de tool met de mock afhankelijkheid
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Orden
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Handelen
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Bevestigen
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Orden
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Handelen & Bevestigen
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integratietesten

Test de volledige stroom van clientverzoeken naar serverantwoorden:

```python
# Python integratietestvoorbeeld
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Start een testserver
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Maak een client aan
        client = McpClient("http://localhost:5000")
        
        # Test zoekopdracht van hulpmiddel
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Test uitvoering van hulpmiddel
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Verifieer antwoord
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Opruimen
        await server.stop()
```

## Prestatieoptimalisatie

### 1. Cachingstrategieën

Implementeer passende caching om latentie en resourcegebruik te verminderen:

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

#### 2. Dependency Injection en testbaarheid

Ontwerp hulpmiddelen die hun afhankelijkheden via constructor-injectie ontvangen, waardoor ze testbaar en configureerbaar zijn:

```java
// Java-voorbeeld met afhankelijkheidsinjectie
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Afhankelijkheden geïnjecteerd via constructor
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Tool-implementatie
    // ...
}
```

#### 3. Composable tools

Ontwerp hulpmiddelen die gecombineerd kunnen worden om complexere workflows te creëren:

```python
# Python voorbeeld dat samenstelbare tools toont
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementatie...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Deze tool kan resultaten gebruiken van de dataFetch-tool
    async def execute_async(self, request):
        # Implementatie...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Deze tool kan resultaten gebruiken van de dataAnalysis-tool
    async def execute_async(self, request):
        # Implementatie...
        pass

# Deze tools kunnen onafhankelijk worden gebruikt of als onderdeel van een workflow
```

### Best Practices voor Schema-ontwerp

Het schema is het contract tussen het model en je hulpmiddel. Goed ontworpen schema’s leiden tot betere bruikbaarheid van hulpmiddelen.

#### 1. Duidelijke parameterbeschrijvingen

Voeg altijd beschrijvende informatie toe bij elke parameter:

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

#### 2. Validatiebeperkingen

Neem validatiebeperkingen op om ongeldige invoer te voorkomen:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // E-mail eigenschap met formaatvalidatie
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Leeftijd eigenschap met numerieke beperkingen
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Genummerde eigenschap
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

#### 3. Consistente retourstructuren

Houd consistentie in je antwoordstructuren aan om het voor modellen gemakkelijker te maken resultaten te interpreteren:

```python
async def execute_async(self, request):
    try:
        # Verzoek verwerken
        results = await self._search_database(request.parameters["query"])
        
        # Altijd een consistente structuur retourneren
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

### Foutafhandeling

Robuuste foutafhandeling is cruciaal om betrouwbaarheid van MCP-hulpmiddelen te waarborgen.

#### 1. Gracieuze foutafhandeling

Behandel fouten op passende niveaus en geef informatieve meldingen:

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

#### 2. Gestructureerde foutantwoorden

Retourneer gestructureerde foutinformatie waar mogelijk:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementatie
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
        
        // Gooi andere uitzonderingen opnieuw als ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Retry-logica

Implementeer correcte retry-logica voor tijdelijke fouten:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # seconden
    
    while retry_count < max_retries:
        try:
            # Externe API aanroepen
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Exponentiële terugval
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Niet-overgangsfout, niet opnieuw proberen
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Prestatieoptimalisatie

#### 1. Caching

Implementeer caching voor dure bewerkingen:

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

#### 2. Asynchrone verwerking

Gebruik asynchrone programmeerpatronen voor I/O-gebonden handelingen:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Voor langlopende bewerkingen onmiddellijk een verwerkings-ID retourneren
        String processId = UUID.randomUUID().toString();
        
        // Start asynchrone verwerking
        CompletableFuture.runAsync(() -> {
            try {
                // Voer langlopende bewerking uit
                documentService.processDocument(documentId);
                
                // Status bijwerken (wordt meestal opgeslagen in een database)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Geef onmiddellijke reactie terug met proces-ID
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Hulpmiddel voor het controleren van de status
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

#### 3. Resource throttling

Implementeer resource throttling om overbelasting te voorkomen:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Sta 5 aanvragen per seconde toe
            bucket_size=10        # Sta uitschieters toe tot 10 aanvragen
        )
    
    async def execute_async(self, request):
        # Controleer of we kunnen doorgaan of moeten wachten
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Als het wachten te lang is
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Wacht de juiste vertragingstijd af
                await asyncio.sleep(delay)
        
        # Verbruik een token en ga door met de aanvraag
        self.rate_limiter.consume()
        
        # Roep API aan
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
            
            # Bereken de tijd tot het volgende token beschikbaar is
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Voeg nieuwe tokens toe op basis van verstreken tijd
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Beveiligingsbest practices

#### 1. Validatie van invoer

Valideer altijd invoerparameters grondig:

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

#### 2. Autorisatiecontroles

Voer juiste autorisatiecontroles uit:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Verkrijg gebruikerscontext uit verzoek
    UserContext user = request.getContext().getUserContext();
    
    // Controleer of gebruiker de vereiste permissies heeft
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Controleer voor specifieke bronnen toegang tot die bron
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Ga door met uitvoering van het gereedschap
    // ...
}
```

#### 3. Verwerking van gevoelige data

Ga zorgvuldig om met gevoelige gegevens:

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
        
        # Gebruikersgegevens ophalen
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filter gevoelige velden tenzij expliciet opgevraagd EN geautoriseerd
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Controleer autorisatieniveau in de aanvraagcontext
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Maak een kopie om wijziging van het origineel te voorkomen
        redacted = user_data.copy()
        
        # Specifieke gevoelige velden redigeren
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Geneste gevoelige gegevens redigeren
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Testen Best Practices voor MCP-hulpmiddelen

Uitgebreid testen zorgt ervoor dat MCP-hulpmiddelen correct functioneren, randgevallen afhandelen en goed integreren met de rest van het systeem.

### Unit Testing

#### 1. Test elk hulpmiddel geïsoleerd

Maak gerichte tests voor de functionaliteit van elk hulpmiddel:

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

#### 2. Schema-validatie testen

Test of schema’s geldig zijn en beperkingen juist afdwingen:

```java
@Test
public void testSchemaValidation() {
    // Maak toolinstantie aan
    SearchTool searchTool = new SearchTool();
    
    // Haal schema op
    Object schema = searchTool.getSchema();
    
    // Zet schema om naar JSON voor validatie
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Valideer dat schema geldige JSONSchema is
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Test geldige parameters
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Test ontbrekende verplichte parameter
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Test ongeldig type parameter
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Foutafhandelingstests

Maak specifieke tests voor foutcondities:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Regelen
    tool = ApiTool(timeout=0.1)  # Zeer korte time-out
    
    # Imiteer een verzoek dat zal time-outen
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Langer dan de time-out
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Handelen & Bevestigen
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Controleer de uitzonderingstekst
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Regelen
    tool = ApiTool()
    
    # Imiteer een antwoord met snelheidslimiet
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
        
        # Handelen & Bevestigen
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Controleer of de uitzondering informatie over de snelheidslimiet bevat
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integratietesten

#### 1. Test ketens van hulpmiddelen

Test hulpmiddelen die samenwerken in verwachte combinaties:

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

#### 2. MCP-server testen

Test de MCP-server met volledige registratie en uitvoering van hulpmiddelen:

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
        // Test het ontdekkingseindpunt
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Maak toolverzoek aan
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Verstuur verzoek en verifieer antwoord
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Maak ongeldig toolverzoek aan
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Ontbrekende parameter "b"
        request.put("parameters", parameters);
        
        // Verstuur verzoek en verifieer foutantwoord
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-end testen

Test volledige workflows vanaf de modelprompt tot uitvoering van het hulpmiddel:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Regelen - MCP-client en mockmodel opzetten
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Mock model reacties
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
    
    # Mock weerhulpmiddel respons
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
        
        # Handelen
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Bevestigen
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Prestatie testen

#### 1. Load testen

Test hoeveel gelijktijdige verzoeken je MCP-server kan verwerken:

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

#### 2. Stress testen

Test het systeem onder extreme belasting:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Stel JMeter in voor stresstesten
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Configureer JMeter testplan
    HashTree testPlanTree = new HashTree();
    
    // Maak testplan, threadgroep, samplers, enz.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Voeg HTTP-sampler toe voor tooluitvoering
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Voeg luisteraars toe
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Voer test uit
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Valideer resultaten
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Gemiddelde responstijd < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90e percentiel < 500ms
}
```

#### 3. Monitoring en profiling

Stel monitoring in voor langdurige prestatieanalyse:

```python
# Configureer monitoring voor een MCP-server
def configure_monitoring(server):
    # Stel Prometheus-metricss in
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
    
    # Voeg middleware toe voor het timen en opnemen van metrics
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Maak een metrics-endpoint beschikbaar
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Ontwerp patronen voor MCP-workflows

Goed ontworpen MCP-workflows verbeteren efficiëntie, betrouwbaarheid en onderhoudbaarheid. Hier zijn belangrijke patronen om te volgen:

### 1. Chain of Tools patroon

Verbind meerdere hulpmiddelen in een keten waarbij de output van het ene hulpmiddel de input wordt voor de volgende:

```python
# Implementatie van Python Chain of Tools
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Lijst van toolnamen om achtereenvolgens uit te voeren
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Voer elke tool in de keten uit, waarbij het vorige resultaat wordt doorgegeven
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Resultaat opslaan en gebruiken als invoer voor de volgende tool
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Voorbeeld van gebruik
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

### 2. Dispatcher patroon

Gebruik een centraal hulpmiddel dat afhandelt naar gespecialiseerde hulpmiddelen op basis van invoer:

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

### 3. Parallelle verwerking patroon

Voer meerdere hulpmiddelen gelijktijdig uit voor efficiëntie:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Stap 1: Ophalen van datasetmetadata (synchroon)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Stap 2: Start meerdere analyses parallel
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
        
        // Wacht tot alle parallelle taken voltooid zijn
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Wacht op voltooiing
        
        // Stap 3: Combineer resultaten
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Stap 4: Genereer samenvattend rapport
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Retourneer het volledige workflowresultaat
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Foutherstel patroon

Implementeer gracieuze terugvallen bij falen van hulpmiddelen:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Probeer eerst het primaire hulpmiddel
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Log de fout
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Val terug op het secundaire hulpmiddel
            try:
                # Mogelijk moeten parameters worden getransformeerd voor het fallback-hulpmiddel
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Beide hulpmiddelen faalden
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Deze implementatie zou afhankelijk zijn van de specifieke hulpmiddelen
        # Voor dit voorbeeld geven we gewoon de oorspronkelijke parameters terug
        return params

# Voorbeeldgebruik
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Primaire (betaalde) weer-API
        "basicWeatherService",    # Fallback (gratis) weer-API
        {"location": location}
    )
```

### 5. Workflowcompositie patroon

Bouw complexe workflows door simpelere te combineren:

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

# MCP-servers testen: Best practices en top tips

## Overzicht

Testen is een cruciaal aspect van het ontwikkelen van betrouwbare, hoogwaardige MCP-servers. Deze gids biedt uitgebreide best practices en tips voor het testen van je MCP-servers gedurende de volledige ontwikkelingscyclus, van unittests tot integratietesten en end-to-end validatie.

## Waarom testen belangrijk is voor MCP-servers

MCP-servers fungeren als cruciale middleware tussen AI-modellen en clientapplicaties. Grondig testen zorgt voor:

- Betrouwbaarheid in productieomgevingen
- Nauwkeurige afhandeling van verzoeken en antwoorden
- Correcte implementatie van MCP-specificaties
- Weerbaarheid tegen fouten en randgevallen
- Consistente prestaties onder diverse belasting

## Unit testing voor MCP-servers

### Unit testing (Fundament)

Unit tests verifiëren individuele componenten van je MCP-server geïsoleerd.

#### Wat te testen

1. **Resource handlers**: Test de logica van elke resource handler afzonderlijk
2. **Implementaties van tools**: Verifieer het gedrag van tools met verschillende invoer
3. **Prompt-sjablonen**: Zorg dat prompt-sjablonen correct renderen
4. **Schema-validatie**: Test validatielogica van parameters
5. **Foutafhandeling**: Verifieer foutantwoorden bij ongeldige invoer

#### Best practices voor unit testing

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
# Voorbeeld eenheidstest voor een rekenmachine tool in Python
def test_calculator_tool_add():
    # Regelen
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Handelen
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Bevestigen
    assert result["value"] == 12
```

### Integratietesten (Middellaag)

Integratietesten verifiëren de interacties tussen componenten van je MCP-server.

#### Wat te testen

1. **Serverinitialisatie**: Test serveropstart met diverse configuraties
2. **Registeren van routes**: Verifieer dat alle endpoints correct geregistreerd zijn
3. **Verzoekverwerking**: Test de volledige verzoek-antwoordcyclus
4. **Foutpropagatie**: Zorg dat fouten correct worden doorgegeven tussen componenten
5. **Authenticatie en autorisatie**: Test beveiligingsmechanismen

#### Best practices voor integratietesten

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

### End-to-end testen (Bovenlaag)

End-to-end testen verifiëren het volledige systeemgedrag van client tot server.

#### Wat te testen

1. **Client-servercommunicatie**: Test volledige verzoek-antwoordcycli
2. **Echte client SDK’s**: Test met daadwerkelijke clientimplementaties
3. **Prestaties onder belasting**: Verifieer gedrag bij meerdere gelijktijdige verzoeken
4. **Foutherstel**: Test systeemherstel bij fouten
5. **Langlopende handelingen**: Verifieer afhandeling van streaming en lange processen

#### Best practices voor e2e-testen

```typescript
// Voorbeeld E2E-test met een client in TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Start server in testomgeving
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Actie
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Bevestigen
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mocking-strategieën voor MCP-testen

Mocking is essentieel om componenten te isoleren tijdens testen.

### Componenten om te mocken

1. **Externe AI-modellen**: Mock modelantwoorden voor voorspelbare testen
2. **Externe services**: Mock API-afhankelijkheden (databases, derde partijen)
3. **Authenticatieservices**: Mock identiteitsproviders
4. **Resourceproviders**: Mock dure resourcehandlers

### Voorbeeld: mocken van een AI-modelantwoord

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
# Python voorbeeld met unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Configureer mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Gebruik mock in test
    server = McpServer(model_client=mock_model)
    # Ga door met test
```

## Prestatie testen

Prestatie testen is cruciaal voor productie MCP-servers.

### Wat te meten

1. **Latentie**: Reactietijd voor verzoeken
2. **Doorvoer**: Verzoeken per seconde verwerkt
3. **Resourcegebruik**: CPU, geheugen, netwerkgebruik
4. **Gelijkwaardigheidsafhandeling**: Gedrag bij parallelle verzoeken
5. **Schaalbaarheidskenmerken**: Prestaties naarmate belasting toeneemt

### Tools voor prestatie testen

- **k6**: Open-source load testing tool
- **JMeter**: Uitgebreide prestatie testen
- **Locust**: Python-gebaseerde load testing
- **Azure Load Testing**: Cloud-gebaseerde prestatie testen

### Voorbeeld: basis load test met k6

```javascript
// k6-script voor loadtesten van MCP-server
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtuele gebruikers
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

## Testautomatisering voor MCP-servers

Het automatiseren van je tests zorgt voor consistente kwaliteit en snellere feedbackloops.

### CI/CD-integratie
1. **Voer unittests uit bij pull requests**: Zorg ervoor dat codewijzigingen bestaande functionaliteit niet breken  
2. **Integratietests in staging**: Voer integratietests uit in pre-productieomgevingen  
3. **Prestatie-baselines**: Onderhoud prestatienormen om regressies te detecteren  
4. **Beveiligingsscans**: Automatiseer beveiligingstests als onderdeel van de pipeline  

### Voorbeeld CI-pijplijn (GitHub Actions)

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
  
## Testen op naleving van de MCP-specificatie

Verifieer dat uw server de MCP-specificatie correct implementeert.

### Belangrijke nalevingsgebieden

1. **API-eindpunten**: Test de vereiste eindpunten (/resources, /tools, enz.)  
2. **Request/response-formaat**: Valideer klasseconformiteit  
3. **Foutcodes**: Verifieer juiste statuscodes voor verschillende scenario's  
4. **Inhoudstypen**: Test de verwerking van verschillende inhoudstypen  
5. **Authenticatiestroom**: Verifieer auth-mechanismen die voldoen aan de specificatie  

### Nalevings-testsuite

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
  
## Top 10 tips voor effectieve MCP-servertests

1. **Test tooldefinities apart**: Verifieer schema-definities onafhankelijk van de logic van de tool  
2. **Gebruik geparametriseerde tests**: Test tools met verschillende invoer, inclusief randgevallen  
3. **Controleer foutreacties**: Verifieer correcte foutafhandeling voor alle mogelijke foutcondities  
4. **Test autorisatielogica**: Zorg voor juiste toegangscontrole voor verschillende gebruikersrollen  
5. **Monitor testdekking**: Streef naar een hoge dekking van kritieke codepaden  
6. **Test streaming responses**: Verifieer juiste verwerking van streaminginhoud  
7. **Simuleer netwerkproblemen**: Test gedrag onder slechte netwerkomstandigheden  
8. **Test resource-limieten**: Verifieer gedrag bij het bereiken van quota of snelheidslimieten  
9. **Automatiseer regressietests**: Bouw een suite die bij elke codewijziging draait  
10. **Documenteer testgevallen**: Houd duidelijke documentatie bij van testscenario’s  

## Veelvoorkomende valkuilen bij testen

- **Te veel vertrouwen op happy path testing**: Zorg ervoor dat foutgevallen grondig worden getest  
- **Negeren van prestatietests**: Identificeer knelpunten voordat ze productie beïnvloeden  
- **Alleen isolatietests uitvoeren**: Combineer unit-, integratie- en end-to-end-tests  
- **Onvolledige API-dekking**: Zorg dat alle eindpunten en functies getest worden  
- **Inconsistente testomgevingen**: Gebruik containers voor consistente testomgevingen  

## Conclusie

Een uitgebreide teststrategie is essentieel voor het ontwikkelen van betrouwbare, hoogwaardige MCP-servers. Door het toepassen van de beste praktijken en tips uit deze gids kunt u ervoor zorgen dat uw MCP-implementaties voldoen aan de hoogste kwaliteits-, betrouwbaarheid- en prestatienormen.  

## Belangrijkste punten

1. **Toolontwerp**: Volg het single responsibility-principe, gebruik dependency injection en ontwerp voor samenstelbaarheid  
2. **Schema-ontwerp**: Maak heldere, goed gedocumenteerde schema's met de juiste validatiebeperkingen  
3. **Foutafhandeling**: Implementeer elegante foutafhandeling, gestructureerde foutreacties en retry-logica  
4. **Prestaties**: Gebruik caching, asynchrone verwerking en resource-throttling  
5. **Beveiliging**: Pas grondige invoervalidatie, autorisatiecontroles en omgang met gevoelige gegevens toe  
6. **Testen**: Maak uitgebreide unit-, integratie- en end-to-end-tests  
7. **Workflow-patronen**: Pas gevestigde patronen toe zoals chains, dispatchers en parallelle verwerking  

## Oefening

Ontwerp een MCP-tool en workflow voor een documentverwerkingssysteem dat:

1. Documenten in meerdere formaten accepteert (PDF, DOCX, TXT)  
2. Tekst en belangrijke informatie uit de documenten extraheert  
3. Documenten classificeert op type en inhoud  
4. Een samenvatting van elk document genereert  

Implementeer de toolschemas, foutafhandeling en een workflow-patroon dat het beste bij dit scenario past. Overweeg hoe u deze implementatie zou testen.  

## Bronnen

1. Word lid van de MCP-community op de [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) om op de hoogte te blijven van de laatste ontwikkelingen  
2. Draag bij aan open-source [MCP-projecten](https://github.com/modelcontextprotocol)  
3. Pas MCP-principes toe in de AI-initiatieven van uw eigen organisatie  
4. Verken gespecialiseerde MCP-implementaties voor uw branche  
5. Overweeg gevorderde cursussen over specifieke MCP-onderwerpen, zoals multi-modale integratie of enterprise-application integratie  
6. Experimenteer met het bouwen van uw eigen MCP-tools en workflows met behulp van de principes geleerd in de [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Wat volgt

Vervolg: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van AI-vertalingsservice [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het oorspronkelijke document in de originele taal wordt beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor enige misverstanden of verkeerde interpretaties voortvloeiend uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->