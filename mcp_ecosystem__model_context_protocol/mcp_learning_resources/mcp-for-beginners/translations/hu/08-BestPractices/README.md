# MCP Fejlesztési Legjobb Gyakorlatok

[![MCP Fejlesztési Legjobb Gyakorlatok](../../../translated_images/hu/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Kattintson a fenti képre a lecke videójának megtekintéséhez)_

## Áttekintés

Ez a lecke a MCP szerverek és funkciók fejlesztésének, tesztelésének és éles környezetbe történő telepítésének fejlett legjobb gyakorlataira összpontosít. Ahogy az MCP ökoszisztémák növekednek komplexitásban és jelentőségben, a bevett minták követése biztosítja a megbízhatóságot, karbantarthatóságot és interoperabilitást. Ez a lecke a valódi MCP megvalósításokból származó gyakorlati bölcsességet összegzi, hogy irányt mutasson erős, hatékony szerverek létrehozásához hatékony erőforrásokkal, promptokkal és eszközökkel.

## Tanulási Célok

A lecke végére képes lesz:

- Ipari legjobb gyakorlatokat alkalmazni MCP szerverek és funkciók tervezésében
- Átfogó tesztelési stratégiákat létrehozni MCP szerverekhez
- Hatékony, újrafelhasználható munkafolyamat mintákat tervezni összetett MCP alkalmazásokhoz
- Megfelelő hibakezelést, naplózást és megfigyelhetőséget megvalósítani MCP szerverekben
- Optimalizálni az MCP megvalósításokat teljesítmény, biztonság és karbantarthatóság szempontjából

## MCP Alapelvek

Mielőtt belevágnánk a konkrét megvalósítási gyakorlatokba, fontos megérteni azokat az alapelveket, amelyek hatékony MCP fejlesztést irányítanak:

1. **Szabványosított Kommunikáció**: Az MCP JSON-RPC 2.0 alapokra épül, egységes formát biztosítva a kérések, válaszok és hibakezeléshez minden megvalósításban.

2. **Felhasználóközpontú Tervezés**: Mindig a felhasználó beleegyezését, irányítását és átláthatóságát helyezze előtérbe az MCP megvalósítások során.

3. **Biztonság Elsőként**: Erős biztonsági intézkedéseket alkalmazzon, beleértve a hitelesítést, jogosultságokat, validációt és a lekérések korlátozását.

4. **Moduláris Architektúra**: Az MCP szervereit moduláris módon tervezze meg, ahol minden eszköznek és erőforrásnak világos, fókuszált célja van.

5. **Állapotmegőrző Kapcsolatok**: Használja ki az MCP azon képességét, hogy több kérésen át fenntartsa az állapotot a koherensebb és kontextusérzékeny interakciókhoz.

## Hivatalos MCP Legjobb Gyakorlatok

Az alábbi legjobb gyakorlatok a hivatalos Model Context Protocol dokumentációból származnak:

### Biztonsági Legjobb Gyakorlatok

1. **Felhasználói Beleegyezés és Irányítás**: Mindig kérjen kifejezett felhasználói beleegyezést adat hozzáféréshez vagy műveletek végrehajtásához. Biztosítsa a világos kontrollt arról, hogy milyen adatokat osztanak meg és mely műveletek engedélyezettek.

2. **Adatvédelem**: Csak kifejezett beleegyezés alapján tegye elérhetővé a felhasználói adatokat, és védje őket megfelelő hozzáférési szabályozással. Védekezzen az illetéktelen adatküldés ellen.

3. **Eszközbiztonság**: Az eszközök használata előtt kérjen kifejezett felhasználói beleegyezést. Biztosítsa, hogy a felhasználók értsék az egyes eszközök funkcióit, és érvényesítsen erős biztonsági határokat.

4. **Eszköz Engedélyezés Szabályozása**: Állítsa be, hogy a modell a munkamenet alatt mely eszközökhöz férhet hozzá, biztosítva, hogy csak kifejezetten engedélyezett eszközökhöz legyen hozzáférés.

5. **Hitelesítés**: Proper hitelesítést követeljen az eszközökhöz, erőforrásokhoz vagy érzékeny műveletekhez való hozzáféréskor, API kulcsok, OAuth tokenek vagy más biztonságos hitelesítési módszerek használatával.

6. **Paraméter Érvényesítés**: Követeljen paramétervalidációt az összes eszköz hívásakor, hogy elkerülje a hibás vagy rosszindulatú bemenet szerverekhez jutását.

7. **Lekérés Korlátozás (Rate Limiting)**: Vezessen be lekéréskorlátozást a visszaélések megakadályozására és a szerver erőforrások méltányos használatának biztosítására.

### Megvalósítási Legjobb Gyakorlatok

1. **Képesség Egyeztetés**: Kapcsolódáskor cseréljék ki az információkat a támogatott funkciókról, protokoll verziókról, elérhető eszközökről és erőforrásokról.

2. **Eszköz Tervezés**: Készítsen fókuszált eszközöket, amelyek egy dolgot jól csinálnak, ahelyett, hogy monolitikus eszközök több problémát is kezelnének.

3. **Hibakezelés**: Alkalmazzon szabványosított hibaüzeneteket és kódokat a problémák diagnosztizálására, a hibák elegáns kezelésére és cselekvési visszajelzés nyújtására.

4. **Naplózás**: Állítson be strukturált naplózást auditáláshoz, hibakereséshez és a protokoll interakciók monitorozásához.

5. **Haladás Követése**: Hosszú futású műveletek esetén jelentse a haladás frissítéseket a reagáló felhasználói felületekhez.

6. **Kérés Megszakítás**: Engedje meg az ügyfeleknek a már nem szükséges vagy túl sokáig tartó élő kérések törlését.

## További Hivatkozások

A legfrissebb információkért az MCP legjobb gyakorlatokról tekintse meg:

- [MCP Dokumentáció](https://modelcontextprotocol.io/)
- [MCP Specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub tárhely](https://github.com/modelcontextprotocol)
- [Biztonsági legjobb gyakorlatok](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Biztonsági kockázatok és enyhítések
- [MCP Biztonsági Csúcstalálkozó Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Gyakorlati biztonsági képzés

## Gyakorlati Megvalósítási Példák

### Eszköz Tervezési Legjobb Gyakorlatok

#### 1. Egyetlen Felelősség Elve

Minden MCP eszköznek világos, fókuszált céllal kell rendelkeznie. Ahelyett, hogy monolitikus eszközöket készítene, amelyek több problémát próbálnak kezelni, fejlesszen specializált eszközöket, amelyek egy adott feladatot kiválóan végeznek el.

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

#### 2. Következetes Hibakezelés

Valósítson meg erős hibakezelést informatív hibaüzenetekkel és megfelelő helyreállítási mechanizmusokkal.

```python
# Python példa átfogó hibakezeléssel
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Paraméter ellenőrzés
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Biztonsági ellenőrzés
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
            # Eszközspecifikus hibák engedése
            raise
        except Exception as e:
            # Összes váratlan hiba elkapása
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL injection észlelés megvalósítása
        pass
        
    def _log_error(self, message, error):
        # Hibák naplózásának megvalósítása
        pass
```

#### 3. Paraméter Érvényesítés

Mindig alaposan ellenőrizze a paramétereket, hogy megakadályozza a hibás vagy rosszindulatú bemenetet.

```javascript
// JavaScript/TypeScript példa részletes paraméterellenőrzéssel
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
    
    // 2. Paramétertípusok ellenőrzése
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Paraméterértékek ellenőrzése
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
    
    // Megvalósítás ellenőrzött paraméterek alapján
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Útvonal biztonságellenőrzés megvalósítása
    // ...
  }
}
```

### Biztonsági Megvalósítási Példák

#### 1. Hitelesítés és Jogosultságkezelés

```java
// Java példa hitelesítéssel és jogosultságkezeléssel
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Függőséginjektálás
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
        // 1. Hitelesítési kontextus kinyerése
        String authToken = request.getContext().getAuthToken();
        
        // 2. Felhasználó hitelesítése
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Jogosultság ellenőrzése a konkrét művelethez
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Folytatás a jogosult művelettel
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

#### 2. Lekérések Korlátozása

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

## Tesztelési Legjobb Gyakorlatok

### 1. Egységtesztelés MCP Eszközöknél

Mindig tesztelje eszközeit izoláltan, külső függőségek szimulálásával (mock):

```typescript
// TypeScript példa egy eszköz egységtesztre
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Hozz létre egy hamis időjárási szolgáltatást
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
    
    // Működés
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
    
    // Működés és ellenőrzés
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integrációs Tesztelés

Tesztelje a teljes folyamatot ügyfél kérésétől a szerver válaszáig:

```python
# Python integrációs teszt példa
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Tesztszerver indítása
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

## Teljesítmény Optimalizálás

### 1. Gyorsítótárazási Stratégiák

Alkalmazzon megfelelő gyorsítótárazást a késleltetés és erőforrás-felhasználás csökkentéséhez:

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

#### 2. Függőség Befecskendezés és Tesztelhetőség

Tervezze meg úgy az eszközöket, hogy azok konstruktor befecskendezéssel kapják a függőségeiket, így tesztelhetőek és konfigurálhatóak legyenek:

```java
// Java példa függőség-injektálással
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // A függőségek a konstruktoron keresztül kerülnek beadásra
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

#### 3. Összeépíthető Eszközök

Tervezzen olyan eszközöket, amelyek egymással összekapcsolhatók, bonyolultabb munkafolyamatok kialakításához:

```python
# Python példa kompozit eszközök bemutatására
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Megvalósítás...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Ez az eszköz használhatja a dataFetch eszköz eredményeit
    async def execute_async(self, request):
        # Megvalósítás...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Ez az eszköz használhatja a dataAnalysis eszköz eredményeit
    async def execute_async(self, request):
        # Megvalósítás...
        pass

# Ezek az eszközök önállóan vagy munkafolyamat részeként is használhatók
```

### Sématervezési Legjobb Gyakorlatok

A séma a szerződés a modell és az Ön eszköze között. A jól megtervezett sémák jobb eszközhasználhatósághoz vezetnek.

#### 1. Világos Paraméter Leírások

Mindig tartalmazzon leíró információkat minden paraméterhez:

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

#### 2. Érvényesítési Korlátozások

Foglaltasson érvényesítési korlátokat az érvénytelen bemenetek elkerülésére:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Email tulajdonság formátum validációval
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Életkor tulajdonság numerikus korlátokkal
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Enumerált tulajdonság
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

#### 3. Következetes Visszatérési Szerkezetek

Tartsa következetesen a válaszstruktúrákat, hogy a modellek könnyebben értelmezhessék az eredményeket:

```python
async def execute_async(self, request):
    try:
        # Kérés feldolgozása
        results = await self._search_database(request.parameters["query"])
        
        # Mindig adj vissza konzisztens struktúrát
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

Az erős hibakezelés kulcsfontosságú az MCP eszközök megbízhatóságának megőrzéséhez.

#### 1. Elegáns Hibakezelés

Kezelje a hibákat megfelelő szinteken és nyújtson informatív üzeneteket:

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

#### 2. Strukturált Hibaválaszok

Amikor lehetséges, adjon vissza strukturált hibainformációkat:

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
        
        // Más kivételek újbóli dobása ToolExecutionException-ként
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Újrapróbálkozási Logika

Valósítson meg megfelelő újrapróbálkozási logikát átmeneti hibák esetére:

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
                
            # Exponenciális visszaesés
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Nem átmeneti hiba, ne próbálkozzon újra
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Teljesítmény Optimalizálás

#### 1. Gyorsítótárazás

Alkalmazzon gyorsítótárazást költséges műveletekhez:

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

#### 2. Aszinkron Feldolgozás

Használjon aszinkron programozási mintákat I/O-kötött műveletekhez:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Hosszú ideig tartó műveletekhez azonnal térjen vissza egy feldolgozási azonosítóval
        String processId = UUID.randomUUID().toString();
        
        // Indítsa el az aszinkron feldolgozást
        CompletableFuture.runAsync(() -> {
            try {
                // Végezze el a hosszú ideig tartó műveletet
                documentService.processDocument(documentId);
                
                // Frissítse az állapotot (általában adatbázisban tárolják)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Azonnali választ ad vissza a folyamat azonosítójával
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Társ állapotellenőrző eszköz
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

#### 3. Erőforrás Szabályozás (Throttling)

Valósítson meg erőforrás szabályozást a túlterhelés elkerülésére:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Engedélyezzen 5 kérést másodpercenként
            bucket_size=10        # Engedélyezzen akár 10 kérésig terjedő kiugrásokat
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
                # Várjon a megfelelő késleltetési időt
                await asyncio.sleep(delay)
        
        # Fogyasszon el egy tokent és folytassa a kérés feldolgozását
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
        
        # Adjon hozzá új tokeneket a eltelt idő alapján
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Biztonsági Legjobb Gyakorlatok

#### 1. Bemeneti Érvényesítés

Mindig alaposan ellenőrizze a bemeneti paramétereket:

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

#### 2. Jogosultság Ellenőrzések

Valósítson meg megfelelő jogosultság ellenőrzéseket:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Felhasználói kontextus lekérése a kérésből
    UserContext user = request.getContext().getUserContext();
    
    // Ellenőrizze, hogy a felhasználónak megvannak-e a szükséges engedélyei
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Egyes erőforrások esetén ellenőrizze az adott erőforráshoz való hozzáférést
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Folytassa az eszköz végrehajtását
    // ...
}
```

#### 3. Érzékeny Adatok Kezelése

Kezelje körültekintően az érzékeny adatokat:

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
        
        # Szűrje ki az érzékeny mezőket, kivéve ha kifejezetten kérték ÉS engedélyezték
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Ellenőrizze az engedélyezési szintet a kérés kontextusában
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Másolat készítése az eredeti módosításának elkerülése érdekében
        redacted = user_data.copy()
        
        # Adott érzékeny mezők átszerkesztése
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Beágyazott érzékeny adatok átszerkesztése
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Tesztelési Legjobb Gyakorlatok MCP Eszközökhöz

Az átfogó tesztelés biztosítja, hogy az MCP eszközök helyesen működnek, kezelik a szélsőséges eseteket, és megfelelően integrálódnak a rendszer többi részébe.

### Egységtesztelés

#### 1. Minden Eszköz Tesztelése Izoláltan

Készítsen fókuszált teszteket minden eszköz funkcionalitására:

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

#### 2. Séma Érvényesítési Tesztek

Tesztelje, hogy a sémák érvényesek és megfelelően érvényesítik a korlátokat:

```java
@Test
public void testSchemaValidation() {
    // Eszköz példány létrehozása
    SearchTool searchTool = new SearchTool();
    
    // Séma lekérése
    Object schema = searchTool.getSchema();
    
    // Séma JSON formátumba alakítása az érvényesítéshez
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Ellenőrizze, hogy a séma érvényes JSONSchema-e
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

#### 3. Hibakezelési Tesztek

Készítsen specifikus teszteket hibahelyzetekre:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Elrendezés
    tool = ApiTool(timeout=0.1)  # Nagyon rövid időkorlát
    
    # Egy időtúllépéssel járó kérés szimulálása
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Az időkorlátnál hosszabb
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Működés és állítás
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Ellenőrizze a kivétel üzenetét
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Elrendezés
    tool = ApiTool()
    
    # Egy korlátozott sebességű választ szimulálni
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
        
        # Működés és állítás
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Ellenőrizze, hogy a kivétel tartalmazza-e a sebességkorlát információkat
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integrációs Tesztelés

#### 1. Eszköz lánc Tesztelése

Tesztelje, hogy az eszközök az elvárt kombinációkban működnek együtt:

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

#### 2. MCP Szerver Tesztelése

Tesztelje az MCP szervert teljes eszköz regisztrációval és futtatással:

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
        
        // Küldd el a kérést és ellenőrizd a választ
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
        
        // Küldd el a kérést és ellenőrizd a hibaválaszt
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-End Tesztelés

Tesztelje az egész munkafolyamatot a modell promptjától az eszköz végrehajtásáig:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Rendezés - MCP kliens és modell hamisítása
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Modell válaszok hamisítása
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
    
    # Időjárás eszköz válaszának hamisítása
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

#### 1. Terhelés Teszt

Tesztelje, hány párhuzamos kérést képes kezelni az MCP szervere:

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

#### 2. Stressz Teszt

Tesztelje a rendszert extrém terhelés alatt:

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
    assertTrue(summaryReport.getAverage() < 200); // Átlagos válaszidő < 200 ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. percentilis < 500 ms
}
```

#### 3. Monitorozás és Profilozás

Állítson be monitorozást hosszútávú teljesítmény elemzéshez:

```python
# Állítsa be a megfigyelést egy MCP szerverhez
def configure_monitoring(server):
    # Konfigurálja a Prometheus metrikákat
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
    
    # Adjon hozzá köztes réteget az időméréshez és a metrikák rögzítéséhez
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Tegye elérhetővé a metrikák végpontját
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP Munkafolyamat Tervezési Minták

A jól megtervezett MCP munkafolyamatok javítják a hatékonyságot, megbízhatóságot és karbantarthatóságot. Íme a követendő kulcsfontosságú minták:

### 1. Eszközlánc Minta

Fűzzön össze több eszközt úgy, hogy az egyes eszközök kimenete legyen a következő bemenete:

```python
# Python eszközlánc megvalósítása
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Az eszközök nevének listája a sorozatos végrehajtáshoz
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Végrehajtja a lánc minden eszközét, az előző eredményt továbbadva
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Eredmény tárolása és bemenetként használata a következő eszközhöz
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Példamutató használat
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

### 2. Központi Elosztó Minta

Használjon központi eszközt, mely a bemenet alapján specializált eszközökhöz irányít:

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

### 3. Párhuzamos Feldolgozás Minta

Futtasson több eszközt egyszerre a hatékonyság érdekében:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // 1. lépés: Adatkészlet metaadatok lekérése (szinkron)
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
        
        // 3. lépés: Eredmények összefésülése
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

### 4. Hibahelyreállítás Minta

Valósítson meg elegáns tartalék megoldásokat eszközhibák esetén:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Először próbáld meg az elsődleges eszközt
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Naplózd a hibát
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Váltás a másodlagos eszközre
            try:
                # Előfordulhat, hogy át kell alakítani a paramétereket a tartalék eszközhöz
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
        # Ez a megvalósítás a konkrét eszközöktől függene
        # Ebben a példában egyszerűen visszaadjuk az eredeti paramétereket
        return params

# Használati példa
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Elsődleges (fizetős) időjárás API
        "basicWeatherService",    # Tartalék (ingyenes) időjárás API
        {"location": location}
    )
```

### 5. Munkafolyamat Összeállítás Minta

Építsen bonyolult munkafolyamatokat egyszerűbbek összekapcsolásával:

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

# MCP Szerverek Tesztelése: Legjobb Gyakorlatok és Legjobb Tippek

## Áttekintés

A tesztelés kritikus része a megbízható, magas minőségű MCP szerverek fejlesztésének. Ez az útmutató átfogó legjobb gyakorlatokat és tippeket nyújt MPC szerverei teszteléséhez a fejlesztési életciklus során, az egységtesztektől az integrációs tesztekig és az end-to-end validációig.

## Miért Fontos a Tesztelés MCP Szerverekhez

Az MCP szerverek kulcsfontosságú köztes rétegként szolgálnak az AI modellek és az ügyfélalkalmazások között. Az alapos tesztelés biztosítja:

- Megbízhatóságot éles környezetben
- Kérések és válaszok pontos kezelését
- Megfelelő MCP specifikációk megvalósítását
- Ellenálló képességet hibák és szélsőséges helyzetek esetén
- Következetes teljesítményt különféle terhelések alatt

## Egységtesztelés MCP Szerverekhez

### Egységtesztelés (Alap)

Az egységtesztek az MCP szerver egyes komponenseit izoláltan ellenőrzik.

#### Mit Kell Tesztelni

1. **Erőforrás Kezelők**: Tesztelje külön-külön minden erőforrás kezelő logikáját
2. **Eszköz Megvalósítások**: Ellenőrizze az eszköz viselkedését különböző bemenetekkel
3. **Prompt Sablonok**: Biztosítsa, hogy a prompt sablonok helyesen renderelődnek
4. **Séma Érvényesítés**: Tesztelje a paraméter validációt
5. **Hibakezelés**: Vizsgálja a hibaválaszokat érvénytelen bemenet esetén

#### Legjobb Gyakorlatok az Egységteszteléshez

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
    
    # Végrehajtás
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Ellenőrzés
    assert result["value"] == 12
```

### Integrációs Tesztelés (Középszint)

Az integrációs tesztek az MCP szerver komponenseinek egymás közti kölcsönhatásait vizsgálják.

#### Mit Kell Tesztelni

1. **Szerver Indítás**: Tesztelje a szerver indulását különféle konfigurációkkal
2. **Útvonal Regisztráció**: Vizsgálja, hogy minden végpont helyesen van-e regisztrálva
3. **Kérés Feldolgozás**: Tesztelje a teljes kérés-válasz ciklust
4. **Hibák Átadása**: Biztosítsa, hogy a hibák megfelelően terjednek a komponensek között
5. **Hitelesítés és Jogosultság**: Tesztelje a biztonsági mechanizmusokat

#### Legjobb Gyakorlatok az Integrációs Teszteléshez

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

### End-to-End Tesztelés (Felső Szint)

Az end-to-end tesztek az egész rendszer viselkedését vizsgálják az ügyféltől a szerverig.

#### Mit Kell Tesztelni

1. **Ügyfél-Szerver Kommunikáció**: Tesztelje a teljes kérés-válasz ciklust
2. **Valódi Ügyfél SDK-k**: Tesztelje tényleges ügyfél megvalósításokkal
3. **Teljesítmény Terhelés Alatt**: Ellenőrizze a viselkedést több párhuzamos kérés esetén
4. **Hibahelyreállítás**: Tesztelje a rendszer visszaállását hibákból
5. **Hosszú Műveletek**: Vizsgálja a streaming és hosszú futású műveletek kezelését

#### Legjobb Gyakorlatok az E2E Teszthez

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

## Mockolási Stratégiák MCP Tesztekhez

A mockolás elengedhetetlen a komponensek izolált teszteléséhez.

### Mockolandó Komponensek

1. **Külső AI Modellek**: Mockolja a modell válaszokat kiszámítható teszteléshez
2. **Külső Szolgáltatások**: Mock API függőségeket (adatbázisok, harmadik fél szolgáltatások)
3. **Hitelesítési Szolgáltatók**: Mockolja az azonosító szolgáltatókat
4. **Erőforrás Szolgáltatók**: Mockolja a költséges erőforrás kezelőket

### Példa: AI Modell Válasz Mockolása

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
# Python példa unittest.mock használatával
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Mock beállítása
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Mock használata a tesztben
    server = McpServer(model_client=mock_model)
    # Folytatás a teszttel
```

## Teljesítménytesztelés

A teljesítményteszt elengedhetetlen az MCP szerverek éles környezetben való működéséhez.

### Mit Mérjünk

1. **Késleltetés**: Válaszidő kérésekre
2. **Áteresztőképesség**: Másodpercenként kezelt kérések száma
3. **Erőforrás Használat**: CPU, memória, hálózat használat
4. **Párhuzamos Kezelés**: Viselkedés párhuzamos kérések alatt
5. **Skálázási Jellemzők**: Teljesítmény terhelés növekedésével

### Teljesítménytesztelő Eszközök

- **k6**: Nyílt forráskódú terhelés tesztelő eszköz
- **JMeter**: Átfogó teljesítménytesztelés
- **Locust**: Python alapú terhelés tesztelő
- **Azure Load Testing**: Felhőalapú teljesítménytesztelés

### Példa: Alap Terhelés Teszt k6-tal

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

## Tesztautomatizálás MCP Szerverekhez

A tesztek automatizálása biztosítja a következetes minőséget és gyorsabb visszacsatolást.

### CI/CD Integráció

1. **Egységtesztek futtatása Pull Request-eknél**: Biztosítsa, hogy a kódváltozások nem törik meg a meglévő funkcionalitást
2. **Integrációs tesztek a staging környezetben**: Futtass integrációs teszteket előgyártási környezetekben  
3. **Teljesítmény alapvonalak**: Tarts fenn teljesítménybeli mérőszámokat a regressziók kiszűrésére  
4. **Biztonsági szkennelés**: Automatizáld a biztonsági tesztelést a pipeline részeként  

### Példa CI pipeline (GitHub Actions)

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
  
## MCP specifikációnak való megfelelés tesztelése

Ellenőrizd, hogy a szervered helyesen valósítja-e meg az MCP specifikációt.

### Fő megfelelési területek

1. **API végpontok**: Teszteld a szükséges végpontokat (/resources, /tools, stb.)  
2. **Kérés/válasz formátum**: Érvényesítsd a séma megfelelőségét  
3. **Hibakódok**: Ellenőrizd a megfelelő státuszkódokat különféle helyzetekben  
4. **Tartalomtípusok**: Teszteld a különböző tartalomtípusok kezelését  
5. **Hitelesítési folyamat**: Ellenőrizd a szabványnak megfelelő hitelesítési mechanizmusokat  

### Megfelelőségi teszt csomag

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
  
## Top 10 tipp hatékony MCP szerver teszteléshez

1. **Eszközdefiníciók külön tesztelése**: Ellenőrizd a séma definíciókat függetlenül az eszköz logikájától  
2. **Paraméterezett tesztek használata**: Teszteld az eszközöket különféle bemenetekkel, beleértve szélsőséges eseteket is  
3. **Hibaválaszok ellenőrzése**: Biztosítsd a megfelelő hibakezelést minden lehetséges hibakörülmény esetén  
4. **Engedélyezési logika tesztelése**: Győződj meg a megfelelő hozzáférés-vezérlésről különböző felhasználói szerepek esetén  
5. **Tesztlefedettség nyomon követése**: Tűzz ki magas lefedettséget a kritikus kódutakra  
6. **Streaming válaszok tesztelése**: Ellenőrizd a streaming tartalom helyes kezelését  
7. **Hálózati problémák szimulálása**: Teszteld a viselkedést rossz hálózati körülmények között  
8. **Erőforrás-korlátok tesztelése**: Ellenőrizd a viselkedést kvóták vagy korlátok elérése esetén  
9. **Regressziós tesztek automatizálása**: Készíts tesztcsomagot, amely minden kódváltoztatáskor lefut  
10. **Teszt esetek dokumentálása**: Tarts fenn világos dokumentációt a tesztszcenáriókról  

## Gyakori tesztelési buktatók

- **Túlzott bizalom a hibátlan út tesztelésében**: Győződj meg róla, hogy alaposan teszteled a hibás eseteket  
- **Teljesítmény tesztelés figyelmen kívül hagyása**: Azonosítsd a szűk keresztmetszeteket, mielőtt azok a produkciót érintenék  
- **Csak izolált tesztelés**: Kombináld az egység-, integrációs és végpontok közötti (E2E) teszteket  
- **Hiányos API lefedettség**: Biztosítsd, hogy minden végpontot és funkciót leteszteltél  
- **Inkonzisztens tesztkörnyezetek**: Használj konténereket az egységes tesztkörnyezet érdekében  

## Összegzés

Egy átfogó tesztelési stratégia elengedhetetlen a megbízható, magas minőségű MCP szerverek fejlesztéséhez. A jelen útmutatóban ismertetett legjobb gyakorlatok és tippek alkalmazásával biztosíthatod, hogy MCP implementációid a legmagasabb minőségi, megbízhatósági és teljesítménybeli követelményeknek megfeleljenek.  

## Főbb tanulságok

1. **Eszköztervezés**: Kövesd az egy felelősség elvét, használd a dependency injection-t és tervezd meg az összefűzhetőséget  
2. **Sématervezés**: Készíts világos, jól dokumentált sémákat megfelelő érvényesítési korlátokkal  
3. **Hibakezelés**: Valósíts meg kifinomult hibakezelést, strukturált hibaválaszokat és újrapróbálkozási logikát  
4. **Teljesítmény**: Használj gyorsítótárazást, aszinkron feldolgozást és erőforrás-korlátozást  
5. **Biztonság**: Alkalmaz alapos bemeneti érvényesítést, hozzáférés-ellenőrzést és érzékeny adatok kezelését  
6. **Tesztelés**: Készíts átfogó egység-, integrációs és end-to-end teszteket  
7. **Munkafolyamat minták**: Alkalmaz bevált mintákat, mint láncok, diszpécserek és párhuzamos feldolgozás  

## Gyakorlat

Tervezd meg egy MCP eszközt és munkafolyamatot egy dokumentumfeldolgozó rendszerhez, amely:

1. Több formátumban fogad dokumentumokat (PDF, DOCX, TXT)  
2. Kinyeri a szöveget és kulcsinformációkat a dokumentumokból  
3. Osztályozza a dokumentumokat típus és tartalom szerint  
4. Generál egy összefoglalót minden dokumentumhoz  

Valósítsd meg az eszköz sémákat, a hibakezelést, és a legmegfelelőbb munkafolyamat-mintát ehhez az esetre. Fontold meg, hogyan tesztelnéd ezt az implementációt.  

## Források

1. Csatlakozz az MCP közösséghez a [Microsoft Foundry Discord közösségben](https://aka.ms/foundrydevs), hogy naprakész legyél a legújabb fejlesztésekről  
2. Vegyél részt az open-source [MCP projektekben](https://github.com/modelcontextprotocol)  
3. Alkalmazd az MCP elveket a saját szervezeted AI kezdeményezéseiben  
4. Fedezz fel iparágad számára specializált MCP implementációkat  
5. Fontold meg, hogy haladó tanfolyamokat vegyél adott MCP témákban, például multimodális integráció vagy vállalati alkalmazás integráció  
6. Kísérletezz saját MCP eszközök és munkafolyamatok építésével a [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) segítségével  

## Mi jön ezután

Következő: [Esettanulmányok](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->