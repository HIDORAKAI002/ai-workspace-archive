# MCP fejlesztési legjobb gyakorlatok

[![MCP fejlesztési legjobb gyakorlatok](../../../translated_images/hu/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(A fenti képre kattintva megtekintheti az óra videóját)_

## Áttekintés

Ez az óra az MCP szerverek és funkciók fejlett legjobb gyakorlataira fókuszál a termelési környezetekben történő fejlesztés, tesztelés és telepítés során. Ahogy az MCP ökoszisztémák komplexitása és jelentősége növekszik, a bevett minták követése biztosítja a megbízhatóságot, karbantarthatóságot és interoperabilitást. Ez az óra a valós MCP megvalósítások során szerzett gyakorlati tudást egyesíti, hogy segítsen robusztus, hatékony szervereket létrehozni hatékony erőforrásokkal, promptokkal és eszközökkel.

## Tanulási célok

Ennek az órának a végére képes leszel:

- Iparági legjobb gyakorlatokat alkalmazni MCP szerverek és funkciók tervezésében
- Átfogó tesztelési stratégiákat kidolgozni MCP szerverek számára
- Hatékony, újrafelhasználható munkafolyamat mintákat tervezni összetett MCP alkalmazásokhoz
- Megfelelő hibakezelést, naplózást és megfigyelhetőséget megvalósítani MCP szerverekben
- Optimalizálni az MCP megvalósításokat teljesítmény, biztonság és karbantarthatóság szempontjából

## MCP alapelvek

Mielőtt konkrét megvalósítási gyakorlatokra térnénk rá, fontos megérteni azokat az alapelveket, melyek az effektív MCP fejlesztést vezérlik:

1. **Standardizált kommunikáció**: Az MCP JSON-RPC 2.0 alapú, egységes formátumot biztosít a kérelmek, válaszok és hibakezelés számára minden megvalósításban.

2. **Felhasználó-központú tervezés**: Mindig elsődleges a felhasználói beleegyezés, kontroll és átláthatóság az MCP megvalósítások során.

3. **Biztonság az első helyen**: Robusztus biztonsági intézkedések megvalósítása hitelesítéssel, jogosultságokkal, érvényesítéssel és a kérések korlátozásával.

4. **Moduláris architektúra**: MCP szerverek moduláris megközelítéssel tervezése, ahol minden eszköz és erőforrás egyértelmű, fókuszált célú.

5. **Állapotmegőrző kapcsolatok**: Az MCP képességének kihasználása az állapot fenntartására több kérésen át a koherensebb, kontextus-érzékeny interakciók érdekében.

## Hivatalos MCP legjobb gyakorlatok

A következő legjobb gyakorlatok a hivatalos Model Context Protocol dokumentációból származnak:

### Biztonsági legjobb gyakorlatok

1. **Felhasználói beleegyezés és kontroll**: Mindig kérj explicite felhasználói beleegyezést adatok eléréséhez vagy műveletek végrehajtásához. Biztosíts egyértelmű kontrollt arról, milyen adatokat osztanak meg és mely műveletek engedélyezettek.

2. **Adatvédelem**: Csak explicite beleegyezés mellett szolgáltass felhasználói adatokat, és védd azokat megfelelő hozzáférés-ellenőrzésekkel. Védd az adatok jogosulatlan átvitele ellen.

3. **Eszközbiztonság**: Kérj explicit felhasználói beleegyezést bármilyen eszköz meghívása előtt. Biztosítsd, hogy a felhasználók megértsék az adott eszköz funkcióját, és alkalmazz szigorú biztonsági határokat.

4. **Eszközengedély-kezelés**: Állítsd be, hogy milyen eszközöket használhat a modell egy munkamenet alatt, biztosítva, hogy csak explicit engedélyezett eszközök legyenek hozzáférhetők.

5. **Hitelesítés**: Kérj megfelelő hitelesítést az eszközökhöz, erőforrásokhoz vagy érzékeny műveletekhez való hozzáférés előtt API kulcsokkal, OAuth tokenekkel vagy más biztonságos hitelesítési módszerekkel.

6. **Paraméter ellenőrzés**: Érvényesíts minden eszköz-meghívást, hogy megakadályozd a hibás vagy rosszindulatú input bejutását az eszköz megvalósításába.

7. **Korlátozás sebessége**: Vezess be sebességkorlátozást az erőforrások tisztességes használata és a visszaélések megelőzése érdekében.

### Megvalósítási legjobb gyakorlatok

1. **Képességek egyeztetése**: Kapcsolódáskor cserélj információt a támogatott funkciókról, protokoll verziókról, elérhető eszközökről és erőforrásokról.

2. **Eszköztervezés**: Alkoss fókuszált eszközöket, melyek egy dolgot jól csinálnak, ne monolitikus eszközöket, amelyek több problémakört kezelnek.

3. **Hibakezelés**: Valósíts meg szabványosított hibaüzeneteket és kódokat, hogy segítsd a problémák diagnosztizálását, a hibák méltányos kezelését és a hasznos visszacsatolást.

4. **Naplózás**: Állíts be strukturált naplózást ellenőrzésre, hibakeresésre és protokoll-interakciók megfigyelésére.

5. **Folyamatkövetés**: Hosszú futású műveletek esetén jelentős előrehaladási állapotfrissítéseket szolgáltass a reaktív felhasználói felületekhez.

6. **Kérés törlés**: Engedd meg az ügyfeleknek, hogy megszakítsák a már nem szükséges vagy túl hosszú ideig tartó kérdéseket.

## További hivatkozások

A legfrissebb információkért az MCP legjobb gyakorlatokról fordulj a következőkhöz:

- [MCP dokumentáció](https://modelcontextprotocol.io/)
- [MCP specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub tárhely](https://github.com/modelcontextprotocol)
- [Biztonsági legjobb gyakorlatok](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Biztonsági kockázatok és ellenszerek
- [MCP biztonsági csúcstalálkozó workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Gyakorlati biztonsági képzés

## Gyakorlati megvalósítási példák

### Eszköztervezési legjobb gyakorlatok

#### 1. Egyszeres felelősség elve

Minden MCP eszköznek legyen egyértelmű, fókuszált célja. Monolitikus eszközök helyett fejlessz specializált eszközöket, melyek egy adott feladatban kiemelkedőek.

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

#### 2. Következetes hibakezelés

Valósíts meg robusztus hibakezelést informatív hibaüzenetekkel és megfelelő helyreállítási mechanizmusokkal.

```python
# Python példa átfogó hibakezeléssel
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Paraméter érvényesítés
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Biztonsági érvényesítés
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Adatbázis művelet időkorláttal
                async with timeout(10):  # 10 másodperces időkorlát
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # A kapcsolódási hibák átmenetiek lehetnek
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # A lekérdezési hibák valószínűleg kliens oldali hibák
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Eszközspecifikus hibákat átengedünk
            raise
        except Exception as e:
            # Általános elfogás váratlan hibák esetén
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL injekció felismerés megvalósítása
        pass
        
    def _log_error(self, message, error):
        # Hibaloggolás megvalósítása
        pass
```

#### 3. Paraméter ellenőrzés

Mindig alaposan ellenőrizd a paramétereket, hogy megakadályozd a hibás vagy rosszindulatú bemeneteket.

```javascript
// JavaScript/TypeScript példa részletes paraméter érvényesítéssel
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
    // 1. Paraméter jelenlétének ellenőrzése
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Paraméter típusainak ellenőrzése
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Paraméter értékeinek ellenőrzése
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Tartalom jelenlétének ellenőrzése írási művelethez
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Útvonal biztonságának ellenőrzése
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Megvalósítás az érvényesített paraméterek alapján
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Útvonal biztonságának ellenőrzésének megvalósítása
    // ...
  }
}
```

### Biztonsági megvalósítási példák

#### 1. Hitelesítés és jogosultságkezelés

```java
// Java példa hitelesítéssel és engedélyezéssel
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Függőség injektálás
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
        // 1. Hitelesítési kontextus kivonása
        String authToken = request.getContext().getAuthToken();
        
        // 2. Felhasználó hitelesítése
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Engedélyezés ellenőrzése az adott művelethez
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Engedélyezett művelet végrehajtása
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

#### 2. Sebességkorlátozás

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

## Tesztelési legjobb gyakorlatok

### 1. Egységtesztelés MCP eszközökhöz

Mindig teszteld az eszközöket izoláltan, külső függőségeket imitálva:

```typescript
// TypeScript példa egy eszköz egységtesztre
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Hozz létre egy hamis időjárás szolgáltatást
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Hozd létre az eszközt a hamis függőséggel
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Előkészítés
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Működtetés
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Ellenőrzés
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Előkészítés
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Működtetés és ellenőrzés
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integrációs tesztelés

Teszteld az egész folyamatot az ügyfél-kéréstől a szerver-válaszig:

```python
# Python integrációs teszt példa
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Teszt szerver indítása
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Ügyfél létrehozása
        client = McpClient("http://localhost:5000")
        
        # Eszköz felderítés tesztelése
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Eszköz végrehajtás tesztelése
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Válasz ellenőrzése
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Takarítás
        await server.stop()
```

## Teljesítmény-optimalizáció

### 1. Gyorsítótár stratégiák

Valósíts meg megfelelő gyorsítótárazást a késleltetés és erőforrás-használat csökkentésére:

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

#### 2. Függőség-injektálás és tesztelhetőség

Az eszközöket úgy tervezd, hogy a függőségeiket konstruktor injekcióval kapják, így tesztelhetőek és konfigurálhatóak legyenek:

```java
// Java példa függőség injektálással
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // A függőségek konstruktoron keresztül kerülnek befecskendezésre
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Eszköz implementáció
    // ...
}
```

#### 3. Összeépíthető eszközök

Tervezd meg az eszközöket úgy, hogy összeépíthetők legyenek komplexebb munkafolyamatok létrehozásához:

```python
# Python példa összetételre képes eszközökre
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Megvalósítás...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Ez az eszköz felhasználhatja a dataFetch eszköz eredményeit
    async def execute_async(self, request):
        # Megvalósítás...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Ez az eszköz felhasználhatja a dataAnalysis eszköz eredményeit
    async def execute_async(self, request):
        # Megvalósítás...
        pass

# Ezek az eszközök önállóan vagy munkafolyamat részeként is használhatók
```

### Sématervezési legjobb gyakorlatok

A séma a szerződés a modell és az eszközöd között. Jól megtervezett sémák jobb eszközhasználhatósághoz vezetnek.

#### 1. Egyértelmű paraméter leírások

Mindig tartalmazz leíró információkat minden paraméterhez:

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

#### 2. Érvényesítési korlátok

Adj meg érvényesítési korlátokat a hibás bemenetek elkerülésére:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // E-mail tulajdonság formátumellenőrzéssel
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Életkor tulajdonság numerikus korlátozásokkal
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Felsorolt tulajdonság
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

#### 3. Következetes válaszstruktúrák

Tartsd konzisztensen a válaszstruktúrákat, hogy a modellek könnyebben értelmezhessék az eredményeket:

```python
async def execute_async(self, request):
    try:
        # Kérés feldolgozása
        results = await self._search_database(request.parameters["query"])
        
        # Mindig visszaad egy következetes szerkezetet
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

### Hibakezelés

A robusztus hibakezelés kulcsfontosságú az MCP eszközök megbízhatóságának fenntartásához.

#### 1. Méltányos hibakezelés

Kezeld a hibákat megfelelő szinten, és adj informatív üzeneteket:

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

#### 2. Strukturált hibaválaszok

Adjon struktúrált hiba-információt lehetőség szerint:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Megvalósítás
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
        
        // Egyéb kivételek újradobása ToolExecutionException-ként
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Újrapróbálkozási logika

Valósíts meg megfelelő újrapróbálkozási mechanizmust átmeneti hibákra:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # másodpercek
    
    while retry_count < max_retries:
        try:
            # Külső API hívása
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Exponenciális visszatartás
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Nem átmeneti hiba, ne ismételje meg próbálkozást
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Teljesítmény-optimalizáció

#### 1. Gyorsítótárazás

Gyorsítótárazd a költséges műveleteket:

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

#### 2. Aszinkron feldolgozás

Használj aszinkron programozási mintákat I/O-kötött műveletekhez:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Hosszú ideig tartó műveletek esetén azonnal adjon vissza egy feldolgozási azonosítót
        String processId = UUID.randomUUID().toString();
        
        // Indítsa el az aszinkron feldolgozást
        CompletableFuture.runAsync(() -> {
            try {
                // Végezz el egy hosszú ideig tartó műveletet
                documentService.processDocument(documentId);
                
                // Frissítse az állapotot (általában adatbázisban tárolva)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Azonnali válasz visszaadása a folyamat azonosítójával
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Kísérő állapotellenőrző eszköz
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

#### 3. Erőforrás korlátozás

Valósíts meg erőforrás-korlátozást a túlterhelés megakadályozására:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Engedélyezze az 5 kérést másodpercenként
            bucket_size=10        # Engedélyezze a 10 kérésig terjedő kiugrásokat
        )
    
    async def execute_async(self, request):
        # Ellenőrizze, hogy folytathatjuk-e vagy várni kell
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Ha a várakozás túl hosszú
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Várjon a megfelelő késleltetési időre
                await asyncio.sleep(delay)
        
        # Használjon fel egy token-t és folytassa a kérést
        self.rate_limiter.consume()
        
        # Hívja meg az API-t
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
            
            # Számolja ki az időt a következő token elérhetőségéig
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Adjon hozzá új tokeneket az eltelt idő alapján
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Biztonsági legjobb gyakorlatok

#### 1. Bemenet ellenőrzése

Mindig alaposan ellenőrizd a bemeneti paramétereket:

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

#### 2. Jogosultság ellenőrzések

Valósíts meg megfelelő jogosultság ellenőrzéseket:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Felhasználói kontextus lekérése a kérésből
    UserContext user = request.getContext().getUserContext();
    
    // Ellenőrizze, hogy a felhasználónak megvannak-e a szükséges jogosultságai
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Meghatározott erőforrások esetén ellenőrizze az adott erőforráshoz való hozzáférést
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Folytassa az eszköz végrehajtását
    // ...
}
```

#### 3. Érzékeny adatok kezelése

Óvatosan kezeld az érzékeny adatokat:

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
        
        # Felhasználói adatok lekérése
        user_data = await self.user_service.get_user_data(user_id)
        
        # Érzékeny mezők szűrése, kivéve, ha kifejezetten kérik ÉS engedélyezik
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Engedélyezési szint ellenőrzése a kérés kontextusában
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Másolat készítése az eredeti módosításának elkerülése érdekében
        redacted = user_data.copy()
        
        # Meghatározott érzékeny mezők törlése
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Beágyazott érzékeny adatok törlése
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP eszközök tesztelésének legjobb gyakorlatai

Az átfogó tesztelés biztosítja, hogy az MCP eszközök helyesen működjenek, kezeljék a szélső eseteket, és megfelelően illeszkedjenek a rendszer többi részéhez.

### Egységtesztelés

#### 1. Minden eszköz izolált tesztelése

Készíts fókuszált teszteket minden eszköz funkcionalitására:

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

#### 2. Sémák érvényességének tesztelése

Teszteld, hogy a sémák érvényesek és megfelelően érvényesítik a korlátokat:

```java
@Test
public void testSchemaValidation() {
    // Eszköz példány létrehozása
    SearchTool searchTool = new SearchTool();
    
    // Séma lekérése
    Object schema = searchTool.getSchema();
    
    // Séma konvertálása JSON formátumba ellenőrzéshez
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Ellenőrizze, hogy a séma érvényes JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Érvényes paraméterek tesztelése
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Hiányzó kötelező paraméter tesztelése
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Érvénytelen paramétertípus tesztelése
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Hibakezelési tesztek

Készíts specifikus teszteket hibahelyzetekre:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Elrendezés
    tool = ApiTool(timeout=0.1)  # Nagyon rövid időkorlát
    
    # Egy kérés hamisítása, ami időtúllépést fog okozni
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Az időkorlátnál hosszabb
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Végrehajtás és ellenőrzés
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Ellenőrizze a kivétel üzenetét
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Elrendezés
    tool = ApiTool()
    
    # Egy sebességkorlátozott válasz hamisítása
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
        
        # Végrehajtás és ellenőrzés
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Ellenőrizze, hogy a kivétel tartalmazza-e a sebességkorlátozás információit
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integrációs tesztelés

#### 1. Eszközlánc tesztelés

Teszteld az eszközök várható kombinációkban való működését együtt:

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

#### 2. MCP szerver tesztelés

Teszteld az MCP szervert teljes eszközregisztrációval és futtatással:

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
        // Teszteld a felfedezési végpontot
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Eszközkérés létrehozása
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Küldd el a kérelmet és ellenőrizd a választ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Érvénytelen eszközkérés létrehozása
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Hiányzó "b" paraméter
        request.put("parameters", parameters);
        
        // Küldd el a kérelmet és ellenőrizd a hibaválaszt
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Végpontok közötti tesztelés

Teszteld az egész munkafolyamatokat a modell promptjától az eszköz végrehajtásáig:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Előkészítés - MCP kliens és hamis modell beállítása
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Hamis modell válaszok
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
    
    # Hamis időjárás eszköz válasz
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
        
        # Művelet végrehajtása
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Ellenőrzés
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Teljesítménytesztelés

#### 1. Terheléses teszt

Teszteld, hány egyidejű kérést képes kezelni az MCP szervered:

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

#### 2. Stressz teszt

Teszteld a rendszert extrém terhelés alatt:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Állítsa be a JMetert stresszteszteléshez
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Konfigurálja a JMeter teszt tervet
    HashTree testPlanTree = new HashTree();
    
    // Hozza létre a teszt tervet, szálcsoportot, mintavételezőket stb.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Adjon hozzá HTTP mintavételezőt az eszköz futtatásához
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Adjon hozzá hallgatókat
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Futtassa a tesztet
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Érvényesítse az eredményeket
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Átlagos válaszidő < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. percentilis < 500ms
}
```

#### 3. Megfigyelés és profilozás

Állíts be megfigyelést hosszú távú teljesítmény elemzéséhez:

```python
# Az MCP szerver monitorozásának konfigurálása
def configure_monitoring(server):
    # Prometheus metrikák beállítása
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
    
    # Köztes réteg hozzáadása az időméréshez és a metrikák rögzítéséhez
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Metrikák végpontjának elérhetővé tétele
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP munkafolyamat tervezési minták

Jól megtervezett MCP munkafolyamatok javítják a hatékonyságot, megbízhatóságot és karbantarthatóságot. Íme a követendő kulcs minták:

### 1. Eszközlánc minta

Kapcsolj össze több eszközt sorozatban, ahol az egyik eszköz kimenete a következő bemenete lesz:

```python
# Python Chain of Tools implementáció
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Eszköznevek listája, amelyeket sorrendben kell végrehajtani
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Minden eszközt végrehajt a láncban, átadva az előző eredményt
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Az eredményt tárolja és bemenetként használja a következő eszközhöz
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Példa használat
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

### 2. Központi irányító (dispatcher) minta

Használj központi eszközt, amely bemenet alapján irányít specializált eszközökhöz:

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

### 3. Párhuzamos feldolgozás minta

Hatékonyság érdekében futtass egyszerre több eszközt:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // 1. lépés: Adatkészlet metaadatainak lekérése (szinkron)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // 2. lépés: Több elemzés párhuzamos indítása
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
        
        // Várakozás az összes párhuzamos feladat befejezésére
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Várakozás a befejezésre
        
        // 3. lépés: Eredmények összekombinálása
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // 4. lépés: Összefoglaló jelentés készítése
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // A teljes munkafolyamat eredményének visszaadása
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Hibakezelő visszaesés minta

Valósíts meg méltányos visszaesési megoldásokat az eszközhibákra:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Először a fő eszközt próbáld ki
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Naplózd a hibát
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Visszaesés a másodlagos eszközre
            try:
                # Lehet, hogy át kell alakítani a paramétereket a visszaesési eszközhöz
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Mindkét eszköz sikertelen volt
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Ez a megvalósítás az adott eszközöktől függ
        # Ebben a példában csak az eredeti paramétereket adjuk vissza
        return params

# Példa használatra
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Elsődleges (fizetős) időjárás API
        "basicWeatherService",    # Visszaesési (ingyenes) időjárás API
        {"location": location}
    )
```

### 5. Munkafolyamat összetétel minta

Építs összetett munkafolyamatokat az egyszerűbbek összeépítésével:

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

# MCP szerverek tesztelése: legjobb gyakorlatok és top tippek

## Áttekintés

A tesztelés alapvető fontosságú a megbízható, magas minőségű MCP szerverek fejlesztésében. Ez az útmutató átfogó legjobb gyakorlatokat és tippeket nyújt MCP szervered teszteléséhez a fejlesztési ciklus minden szakaszában, az egységtesztektől az integrációs és végpontok közötti validációig.

## Miért fontos a tesztelés az MCP szervereknél?

Az MCP szerverek kulcsszereplők az AI modellek és az ügyfélt alkalmazások közötti köztes rétegként. Alapos tesztelés biztosítja:

- Megbízhatóságot termelési környezetben
- Pontos kérelmek és válaszok kezelését
- MCP specifikációk helyes megvalósítását
- Ellenállóságot hibák és szélső esetek ellen
- Konzisztens teljesítményt különböző terhelések mellett

## Egységtesztelés MCP szerverhez

### Egységtesztelés (Alap)

Az egységtesztek az MCP szerver egyes komponenseit izoláltan ellenőrzik.

#### Mit tesztelj?

1. **Erőforrás kezelők**: Teszteld külön-külön minden erőforrás kezelő logikáját
2. **Eszköz megvalósítások**: Ellenőrizd az eszközök viselkedését különböző bemenetekkel
3. **Prompt sablonok**: Győződj meg, hogy a prompt sablonok helyesen jelennek meg
4. **Sémaelvárás ellenőrzés**: Teszteld a paraméterek érvényesítési logikáját
5. **Hibakezelés**: Ellenőrizd a hibaválaszokat hibás bemenetek esetén

#### Egységtesztelési legjobb gyakorlatok

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
# Példa egységteszt egy számológép eszközhöz Pythonban
def test_calculator_tool_add():
    # Előkészítés
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Művelet végrehajtása
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Ellenőrzés
    assert result["value"] == 12
```

### Integrációs tesztelés (Középső réteg)

Az integrációs tesztek az MCP szerver komponenseinek együttműködését ellenőrzik.

#### Mit tesztelj?

1. **Szerverindítás**: Teszteld a szerver indítását különböző konfigurációkkal
2. **Útvonal regisztráció**: Ellenőrizd, hogy minden végpont helyesen regisztrált-e
3. **Kérés feldolgozás**: Teszteld a teljes kérés-válasz ciklust
4. **Hibák továbbítása**: Biztosítsd, hogy a hibák megfelelően kezelődnek komponensek között
5. **Hitelesítés és jogosultság**: Teszteld a biztonsági mechanizmusokat

#### Integrációs tesztelés legjobb gyakorlatai

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

### Végpontok közötti tesztelés (Felső réteg)

Az end-to-end tesztek a teljes rendszer viselkedését ellenőrzik kliens és szerver között.

#### Mit tesztelj?

1. **Kliens-szerver kommunikáció**: Teszteld a teljes kérés-válasz ciklusokat
2. **Valódi kliens SDK-k**: Teszteld tényleges kliens megvalósításokkal
3. **Terhelés alatti teljesítmény**: Ellenőrizd viselkedést több egyidejű kérés alatt
4. **Hibakezelés**: Teszteld a rendszer helyreállását hibák esetén
5. **Hosszú futású műveletek**: Ellenőrizd a streaming és hosszú műveletek kezelését

#### End-to-end tesztelés legjobb gyakorlatai

```typescript
// Példa E2E teszt egy klienssel TypeScript-ben
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Szerver indítása teszt környezetben
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Művelet
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Ellenőrzés
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mockolási stratégiák MCP teszteléshez

A mockolás elengedhetetlen a komponensek izolált teszteléséhez.

### Mockolandó komponensek

1. **Külső AI modellek**: Mockold a modell válaszokat kiszámítható teszthez
2. **Külső szolgáltatások**: Mockold az API függőségeket (adatbázisok, harmadik fél szolgáltatók)
3. **Hitelesítési szolgáltatások**: Mockold az identitás szolgáltatókat
4. **Erőforrás szolgáltatók**: Mockold a költséges erőforrás kezelőket

### Példa: AI modell válasz mockolása

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
# Python példa unittest.mock-kal
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Mock konfigurálása
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Mock használata a tesztben
    server = McpServer(model_client=mock_model)
    # Folytasd a teszttel
```

## Teljesítménytesztelés

A teljesítménytesztelés létfontosságú a termelési MCP szerverekhez.

### Mit mérj?

1. **Késleltetés**: Válaszidő kérések esetén
2. **Átbocsátóképesség**: Másodpercenként kezelt kérések száma
3. **Erőforrás-használat**: CPU, memória, hálózati használat
4. **Párhuzamos kezelés**: Viselkedés egyidejű kérések alatt
5. **Skálázási jellemzők**: Teljesítmény növekvő terhelés mellett

### Teljesítménytesztelő eszközök

- **k6**: Nyílt forráskódú terhelés tesztelő eszköz
- **JMeter**: Átfogó teljesítménytesztelés
- **Locust**: Python-alapú terhelés tesztelés
- **Azure Load Testing**: Felhő alapú teljesítmény tesztelés

### Példa: Alapvető terheléses teszt k6-al

```javascript
// k6 szkript az MCP szerver terheléses teszteléséhez
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtuális felhasználó
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

## Teszt automatizálás MCP szerverekhez

A tesztek automatizálása biztosítja az állandó minőséget és gyorsabb visszajelzést.

### CI/CD integráció
1. **Futtass Egységteszteket a Pull Requesteken**: Biztosítsd, hogy a kódváltoztatások ne törjék meg a meglévő funkciókat  
2. **Integrációs Tesztek a Staging Környezetben**: Fuss integrációs tesztek előgyártási környezetben  
3. **Teljesítmény Alapvonalak**: Tarts fenn teljesítményreferenciákat a regressziók észlelésére  
4. **Biztonsági Vizsgálatok**: Automatizáld a biztonsági teszteket a pipeline részeként  

### Példa CI Pipeline (GitHub Actions)

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

## Tesztelés az MCP specifikáció szerinti megfeleléshez

Ellenőrizd, hogy a szervered helyesen valósítja meg az MCP specifikációt.

### Fő Megfelelőségi Területek

1. **API Végpontok**: Teszteld a kötelező végpontokat (/resources, /tools, stb.)  
2. **Kérés/Válasz Formátum**: Érvényesítsd a séma szerinti megfelelést  
3. **Hibakódok**: Ellenőrizd a helyes státuszkódokat különböző esetekben  
4. **Tartalomtípusok**: Teszteld a különféle tartalomtípusok kezelését  
5. **Hitelesítési Folyamat**: Ellenőrizd a specifikációnak megfelelő hitelesítési mechanizmusokat  

### Megfelelőségi Tesztcsomag

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

## Top 10 Tipp Hatékony MCP Szerver Teszteléshez

1. **Teszteld a Tool Definíciókat Külön**: Ellenőrizd a séma definíciókat külön a tool logikától  
2. **Használj Paraméterezett Teszteket**: Teszteld az eszközöket változatos bemenetekkel, beleértve a szélsőséges eseteket is  
3. **Ellenőrizd a Hiba Válaszokat**: Biztosítsd a helyes hibakezelést az összes lehetséges hibakörülményre  
4. **Teszteld az Engedélyezési Logikát**: Biztosítsd a megfelelő hozzáférés-ellenőrzést különböző felhasználói szerepkörök esetén  
5. **Kövesd a Tesztlefedettséget**: Törekedj a magas lefedettségre a kritikus útvonalú kódoknál  
6. **Teszteld a Streaming Válaszokat**: Ellenőrizd a streaming tartalom helyes kezelését  
7. **Szimuláld a Hálózati Problémákat**: Teszteld a viselkedést gyenge hálózati feltételek mellett  
8. **Teszteld az Erőforrás Korlátokat**: Vizsgáld meg a viselkedést kvóták vagy sebességkorlátok elérésekor  
9. **Automatizáld a Regressziós Teszteket**: Építs ki egy tesztsorozatot, amely minden kódváltoztatáskor lefut  
10. **Dokumentáld a Teszteseteket**: Tarts fenn világos dokumentációt a tesztelési forgatókönyvekről  

## Gyakori Tesztelési Csapdák

- **Túlzott bizalom a sikeres útvonal tesztelésében**: Győződj meg róla, hogy alaposan teszteled a hibás eseteket is  
- **A teljesítménytesztelés figyelmen kívül hagyása**: Azonosítsd a szűk keresztmetszeteket még mielőtt azok a termelést érintenék  
- **Csak elszigetelt tesztelés**: Kombináld az egység-, integrációs és E2E teszteket  
- **Hiányos API lefedettség**: Biztosítsd, hogy minden végpont és funkció tesztelve legyen  
- **Inkonzisztens tesztkörnyezetek**: Használj konténereket a következetes tesztkörnyezet érdekében  

## Következtetés

Egy átfogó tesztelési stratégia elengedhetetlen megbízható, magas minőségű MCP szerverek fejlesztéséhez. A legjobb gyakorlatok és tippek megvalósításával biztosíthatod, hogy MCP megoldásaid a legmagasabb minőségi, megbízhatósági és teljesítményi elvárásoknak megfeleljenek.

## Fő Tanulságok

1. **Tool Tervezés**: Kövesd az egységfelelősség elvét, használj dependency injection-t, és tervezz összetételre alkalmas eszközöket  
2. **Séma Tervezés**: Készíts egyértelmű, jól dokumentált sémákat megfelelő validációs korlátozásokkal  
3. **Hibakezelés**: Valósíts meg szép hibakezelést, strukturált hiba-válaszokat és újrapróbálkozási logikát  
4. **Teljesítmény**: Használj cache-elést, aszinkron feldolgozást és erőforrás-korlátozást  
5. **Biztonság**: Alkalmazz alapos bemeneti érvényesítést, jogosultság ellenőrzéseket és érzékeny adatkezelést  
6. **Tesztelés**: Készíts átfogó egység-, integrációs és végpontok közötti teszteket  
7. **Munkafolyamat Minták**: Alkalmazz bevált mintákat, például láncokat, diszpécsereket és párhuzamos feldolgozást  

## Gyakorlat

Tervezz egy MCP tool-t és munkafolyamatot egy dokumentumfeldolgozó rendszerhez, amely:

1. Több formátumú dokumentumokat fogad (PDF, DOCX, TXT)  
2. Kinyeri a szöveget és a kulcsfontosságú információkat a dokumentumokból  
3. Osztályozza a dokumentumokat típus és tartalom szerint  
4. Készít összefoglalót minden dokumentumról  

Valósítsd meg az eszköz sémákat, a hibakezelést és egy munkafolyamat mintát, ami leginkább megfelel ennek a helyzetnek. Gondold át, hogyan tesztelnéd ezt a megvalósítást.

## Források

1. Csatlakozz az MCP közösséghez az [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) oldalon, hogy naprakész legyél a legújabb fejlesztésekről  
2. Adj hozzá nyílt forráskódú [MCP projektekhez](https://github.com/modelcontextprotocol)  
3. Alkalmazd az MCP elveket a saját szervezeted AI kezdeményezéseiben  
4. Fedezd fel az iparágadhoz specializált MCP implementációkat  
5. Fontold meg speciális MCP témakörök, például többmodalitás integráció vagy vállalati alkalmazás integráció fejlett tanfolyamainak elvégzését  
6. Kísérletezz saját MCP tool-ok és munkafolyamatok építésével a [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) útmutatón keresztül  

## Mi következik

Következő: [Esettanulmányok](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Nyilatkozat**:  
Ezt a dokumentumot az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével fordítottuk le. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum a saját nyelvén tekintendő hiteles forrásnak. Kritikus információk esetén szakmai, emberi fordítást javaslunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely a fordítás használatából ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->