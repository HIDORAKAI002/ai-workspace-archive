# MCP arenduse parimad tavad

[![MCP Development Best Practices](../../../translated_images/et/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Klõpsake ülaloleval pildil, et vaadata selle tunni videot)_

## Ülevaade

See õppetund keskendub edasijõudnutele mõeldud parimatele praktikatele MCP serverite ja funktsioonide arendamises, testimises ja tootmiskeskkonnas juurutamises. MCP ökosüsteemide kasvades keerukamaks ja olulisemaks tagab kehtivate mustrite järgimine usaldusväärsuse, hooldatavuse ja omavahelise koostalitluse. See õppetund koondab praktilisi teadmisi reaalsest maailmast MCP rakendustest, et aidata teil luua tugevaid, tõhusaid servereid tõhusate ressursside, üleskutsete ja tööriistadega.

## Õpieesmärgid

Selle tunni lõpuks suudate:

- Rakendada tööstuse parimaid tavasid MCP serveri ja funktsioonide kujundamisel
- Luua põhjalikke testimisstrateegiaid MCP serverite jaoks
- Kujundada tõhusaid, taaskasutatavaid töövoo mustreid keerukate MCP rakenduste jaoks
- Rakendada sobivat veahaldust, logimist ja jälgitavust MCP serverites
- Optimeerida MCP rakendusi jõudluse, turvalisuse ja hooldatavuse jaoks

## MCP põhialused

Enne konkreetsete rakenduspraktikate käsitlemist on oluline mõista tuumprintsiipides, mis juhivad tõhusat MCP arendust:

1. **Standardiseeritud suhtlus**: MCP kasutab aluseks JSON-RPC 2.0, mis kindlustab ühtse vormingus päringute, vastuste ja veahalduse kõigi rakenduste puhul.

2. **Kasutajakeskne disain**: Pange alati esikohale kasutaja nõusolek, kontroll ja läbipaistvus oma MCP rakendustes.

3. **Turvalisus esikohal**: Rakendage tugevaid turvameetmeid, sealhulgas autentimist, autoriseerimist, valideerimist ja kiirusepiiranguid.

4. **Moodulaarne arhitektuur**: Kujundage oma MCP serverid moodulitena, kus iga tööriista ja ressursi eesmärk on selge ja keskendunud.

5. **Seisundipõhised ühendused**: Kasutage MCP suutlikkust säilitada olekut mitmete päringute vahel, et tagada järjepidevamad ja kontekstiteadlikud suhtlused.

## Ametlikud MCP parimad tavad

Järgmised parimad tavad on tuletatud ametlikust Model Context Protocol dokumentatsioonist:

### Turvalisuse parimad tavad

1. **Kasutajanõusolek ja kontroll**: Nõudke alati kasutajalt selget nõusolekut enne andmete ligipääsu või toimingute tegemist. Pakuge selget kontrolli selle üle, milliseid andmeid jagatakse ja millised toimingud on lubatud.

2. **Andmete privaatsus**: Avaldage kasutaja andmeid ainult selge nõusoleku korral ja kaitske neid sobivate ligipääsukontrollidega. Kaitske volitamata andmeedastuse eest.

3. **Tööriistade turvalisus**: Nõudke kasutaja poolset selget nõusolekut enne mis tahes tööriista kutsumist. Tagage, et kasutajad mõistavad iga tööriista funktsionaalsust ning/ja rakendage tugevaid turvapiire.

4. **Tööriistade õiguste kontroll**: Konfigureerige, milliseid tööriistu mudel sessiooni jooksul kasutada tohib, tagades, et ainult selgelt autoriseeritud tööriistad on kättesaadavad.

5. **Autentimine**: Nõudke korrektset autentimist enne tööriistade, ressursside või tundlike toimingute ligipääsu andmist, kasutades API võtmeid, OAuth-tunnuseid või muid turvalisi autentimismeetodeid.

6. **Parameetrite valideerimine**: Rakendage valideerimine kõigi tööriistakutsete juures, et takistada vigase või pahatahtliku sisendi jõudmist tööriistadesse.

7. **Kiirusepiirangud**: Rakendage kiirusepiiranguid, et vältida kuritarvitamist ja tagada serveri ressursside õiglane kasutus.

### Rakenduse parimad tavad

1. **Võimekuse läbirääkimine**: Ühenduse loomise ajal vahetage infot toetatud funktsioonide, protokolli versioonide, saadavate tööriistade ja ressursside kohta.

2. **Tööriista disain**: Looge keskendunud tööriistad, mis teevad ühe töö hästi, mitte monoliitsed tööriistad, mis käsitlevad palju erinevaid küsimusi.

3. **Veahaldus**: Rakendage standardiseeritud veateateid ja koode, mis aitavad diagnoosida probleeme, käidelda tõrkeid ladusalt ja pakkuda tegutsemisjuhiseid.

4. **Logimine**: Konfigureerige struktureeritud logid auditeerimiseks, silumiseks ja protokolli suhtluse jälgimiseks.

5. **Töö edenemise jälgimine**: Pikkade toimingute puhul teavitage edenemise uuendustega, et võimaldada reageerivaid kasutajaliideseid.

6. **Päringu tühistamine**: Lubage klientidel tühistada pooleli olevaid päringuid, mida enam ei vajata või mis võtavad liiga kaua aega.

## Lisaviited

Kõige värskemate MCP parimate tavade info jaoks vaadake:

- [MCP dokumentatsioon](https://modelcontextprotocol.io/)
- [MCP spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHubi hoidla](https://github.com/modelcontextprotocol)
- [Turvalisuse parimad tavad](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turvariskid ja leevendused
- [MCP Security Summit töötoa (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktiline turvalisuse koolitus

## Praktilised rakendusnäited

### Tööriista disaini parimad tavad

#### 1. Ainsuse vastutuse põhimõte

Igal MCP tööriistal peaks olema selge ja keskendunud eesmärk. Monoliitlaste tööriistade asemel, mis üritavad käsitleda mitut aspekti, arendage spetsialiseeritud tööriistu, mis on kindlad konkreetsetes ülesannetes.

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

#### 2. Järjepidev veahaldus

Rakendage tugevat veahaldust informatiivsete veateadete ja sobivate taastemehhanismidega.

```python
# Pythoni näide põhjaliku veahaldamisega
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parameetri valideerimine
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Turvalisuse valideerimine
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Andmebaasi toiming ajapiiranguga
                async with timeout(10):  # 10 sekundi ajapiirang
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Ühenduse vead võivad olla ajutised
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Päringuvead on tõenäoliselt kliendivead
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Lasta tööriistapõhistel vigadel läbi minna
            raise
        except Exception as e:
            # Kõikide ootamatute vigade püüdja
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL-süüteo tuvastuse teostus
        pass
        
    def _log_error(self, message, error):
        # Vigade logimise teostus
        pass
```

#### 3. Parameetrite valideerimine

Valideerige parameetreid alati põhjalikult, et vältida vigast või pahatahtlikku sisendit.

```javascript
// JavaScript/TypeScript näide koos üksikasjaliku parameetrite valideerimisega
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
    // 1. Kontrolli parameetri olemasolu
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Kontrolli parameetri tüüpe
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Kontrolli parameetri väärtusi
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Kontrolli sisu olemasolu kirjutusoperatsiooni jaoks
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Tee turvalisuse kontroll
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Rakendus valideeritud parameetrite põhjal
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Tee turvalisuse kontrolli rakendus
    // ...
  }
}
```

### Turvalisuse rakendusnäited

#### 1. Autentimine ja autoriseerimine

```java
// Java näide autentimise ja autoriseerimisega
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Sõltuvuse süstimine
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
        // 1. Autentimiskonteksti eraldamine
        String authToken = request.getContext().getAuthToken();
        
        // 2. Kasutaja autentimine
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Konkreetse toimingu autoriseerimise kontrollimine
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Jätkamine autoriseeritud toiminguga
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

#### 2. Kiirusepiirangud

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

## Testimise parimad tavad

### 1. Üksiktööriista testimine

Testige oma tööriistu alati isoleeritult, jäljendades väliseid sõltuvusi:

```typescript
// TypeScript näide tööriista üksustestist
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Loo ilmaprojektor
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Loo tööriist koos võltsimiskohustusega
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Korralda
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Tegutse
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Kinnita
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Korralda
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Tegutse ja katsu
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integratsioonitestimine

Testige kogu päringute ja vastuste voogu:

```python
# Python'i integratsioonitesti näide
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Käivita testiserver
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Loo klient
        client = McpClient("http://localhost:5000")
        
        # Testi tööriista avastamist
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Testi tööriista käivitamist
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Kontrolli vastust
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Puhasta pärast testi
        await server.stop()
```

## Jõudluse optimeerimine

### 1. Vahemälustrateegiad

Rakendage sobiv vahemälu, et vähendada latentsust ja ressursikasutust:

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

#### 2. Sõltuvuste süstimine ja testitavus

Kujundage tööriistad nii, et nende sõltuvusi saab edastada konstruktorite kaudu, mis teeb need testimiseks ja konfigureerimiseks sobivaks:

```java
// Java näide sõltuvussüstiga
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Sõltuvused süstitud konstruktor läbi
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Tööriista rakendus
    // ...
}
```

#### 3. Koostöövõimelised tööriistad

Kujundage tööriistad, mida saab omavahel kombineerida keerukamate töövoogude loomiseks:

```python
# Python näide, mis näitab kooskasutatavaid tööriistu
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Rakendus...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # See tööriist saab kasutada andmete päringu tööriistast saadud tulemusi
    async def execute_async(self, request):
        # Rakendus...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # See tööriist saab kasutada andmeanalüüsi tööriistast saadud tulemusi
    async def execute_async(self, request):
        # Rakendus...
        pass

# Neid tööriistu saab kasutada sõltumatult või töövoo osana
```

### Skeemi disaini parimad tavad

Skeem on leping mudeli ja teie tööriista vahel. Hea kujundusega skeemid parandavad tööriista kasutatavust.

#### 1. Selged parameetrite kirjeldused

Lisage alati iga parameetri kohta kirjeldav info:

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

#### 2. Valideerimispiirangud

Lisage valideerimispiiranguid, et vältida kehtetuid sisendeid:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // E-posti atribuut koos formaadi valideerimisega
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Vanuse atribuut numbriliste piirangutega
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Loetletud atribuut
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

#### 3. Järjepidevad vastustruktuurid

Hoidke vastustes järjepidevus, et mudelitel oleks lihtsam tulemusi tõlgendada:

```python
async def execute_async(self, request):
    try:
        # Töötle päringut
        results = await self._search_database(request.parameters["query"])
        
        # Alati tagasta järjepidev struktuur
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

### Veahaldus

Tugev veahaldus on MCP tööriistade usaldusväärsuse säilitamiseks oluline.

#### 1. Ladus veakäsitlus

Käsitlege vigu sobivatel tasemetel ja andke informatiivseid teadeteid:

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

#### 2. Struktureeritud vea vastused

Tagastage võimalusel struktureeritud veateavet:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Teostus
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
        
        // Viska teised erandid uuesti kui ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Uuskatsetamise loogika

Rakendage sobivat uuuskatsetamise loogikat ajutiste tõrgete puhul:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekundid
    
    while retry_count < max_retries:
        try:
            # Kutsu väline API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Eksponentsiaalne tagasilükkamine
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Mitte-ajutine viga, ära proovi uuesti
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Jõudluse optimeerimine

#### 1. Vahemälu

Rakendage vahemälu ressurssimahukate toimingute puhul:

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

#### 2. Asünkroonne töötlemine

Kasutage sisend-/väljunditoimingute puhul asünkroonseid programmeerimismustreid:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Pikaajaliste toimingute puhul tagastage kohe töötlemise ID
        String processId = UUID.randomUUID().toString();
        
        // Alustage asünkroonset töötlemist
        CompletableFuture.runAsync(() -> {
            try {
                // Tehke pikaajaline toiming
                documentService.processDocument(documentId);
                
                // Uuendage staatust (tavaliselt salvestatakse see andmebaasi)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Tagastage viivitamatu vastus protsessi ID-ga
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Kaaslane staatusekontrolli tööriist
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

#### 3. Ressursside piiramine

Rakendage ressursipiiranguid koormuse vältimiseks:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Luba 5 päringut sekundis
            bucket_size=10        # Luba kuni 10 päringut ühekordseteks tippudeks
        )
    
    async def execute_async(self, request):
        # Kontrolli, kas saame jätkata või peame ootama
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Kui ooteaeg on liiga pikk
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Oota sobiva viivituse aja
                await asyncio.sleep(delay)
        
        # Tarbi token ja alusta päringut
        self.rate_limiter.consume()
        
        # Kutsu API-d
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
            
            # Arvuta aeg järgmise tokeni vabastamiseni
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Lisa uusi tokenid läbitud aja põhjal
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Turvalisuse parimad tavad

#### 1. Sisendite valideerimine

Valideerige sisendparameetreid alati põhjalikult:

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

#### 2. Autoriseerimiskontrollid

Rakendage korrektsed autoriseerimiskontrollid:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Hankige kasutaja kontekst päringust
    UserContext user = request.getContext().getUserContext();
    
    // Kontrollige, kas kasutajal on vajalikud õigused
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Teatud ressursside puhul kontrollige juurdepääsu sellele ressursile
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Jätkake tööriista täitmisega
    // ...
}
```

#### 3. Tundlike andmete käitlemine

Käsitlege tundlikke andmeid hoolikalt:

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
        
        # Hangi kasutajaandmed
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtreeri tundlikud väljad, kui neid pole selgesõnaliselt nõutud JA volitatud
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Kontrolli volitusastet päringu kontekstis
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Loo koopia, et vältida originaali muutmist
        redacted = user_data.copy()
        
        # Tsenseeri konkreetsed tundlikud väljad
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Tsenseeri pesastatud tundlikud andmed
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP tööriistade testimise parimad tavad

Põhjalik testimine tagab, et MCP tööriistad toimivad korrektselt, käitlevad äärejuhtumeid ja integreeruvad korrektselt süsteemiga.

### Üksiktestimine

#### 1. Testige iga tööriista eraldatult

Looge keskendunud testid iga tööriista funktsionaalsuse jaoks:

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

#### 2. Skeemi valideerimise testid

Testige, et skeemid on kehtivad ja nõuavad korrektselt piiranguid:

```java
@Test
public void testSchemaValidation() {
    // Loo tööriista eksemplar
    SearchTool searchTool = new SearchTool();
    
    // Hangi skeem
    Object schema = searchTool.getSchema();
    
    // Muuda skeem JSON-iks valideerimiseks
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Kontrolli, kas skeem on kehtiv JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Testi kehtivaid parameetreid
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Testi puuduvat kohustuslikku parameetrit
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Testi vigast parameetri tüüpi
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Veahaldustestid

Looge spetsiifilised testid vigade juhtumite jaoks:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Korralda
    tool = ApiTool(timeout=0.1)  # Väga lühike ajalõpp
    
    # Pettusepäringu loomine, mis aegub
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Pikem kui ajalõpp
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Tegutse ja kontrolli
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Kontrolli erandi sõnumit
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Korralda
    tool = ApiTool()
    
    # Pettuse vastus, millel on kiiruspiirang
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
        
        # Tegutse ja kontrolli
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Kontrolli, et erand sisaldab kiiruspiirangu teavet
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integratsioonitestimine

#### 1. Tööriistade ahela testimine

Testige tööriistade koostööd ootuspärastes kooslustes:

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

#### 2. MCP serveri testimine

Testige MCP serverit täieliku tööriistade registreerimise ja käitamisega:

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
        // Testi avastamise lõpp-punkti
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Loo tööriista päring
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Saada päring ja kontrolli vastust
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Loo kehtetu tööriista päring
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Puuduv parameeter "b"
        request.put("parameters", parameters);
        
        // Saada päring ja kontrolli veateadet
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Lõpuni testimine

Testige täielikke töövooge mudeli üleskutsest tööriistade käivitamiseni:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Seadista - korda MCP klient ja näidismudel
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Näidismudeli vastused
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
    
    # Näidismudeli vastus ilmavahendile
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
        
        # Tegutse
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Tõesta
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Jõudlustestimine

#### 1. Koormustestid

Testige, kui palju samaaegseid päringuid teie MCP server suudab töödelda:

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

#### 2. Pingetestid

Testige süsteemi äärmusliku koormuse all:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Häälesta JMeter koormustestiks
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Koosta JMeter testiplaan
    HashTree testPlanTree = new HashTree();
    
    // Loo testiplaan, niidugrupp, proovijad jne.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Lisa HTTP proovija tööriista käivitamiseks
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Lisa kuulajad
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Käivita test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Kontrolli tulemusi
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Keskmine vastuse aeg < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. protsentiil < 500ms
}
```

#### 3. Jälgimine ja profileerimine

Seadistage jälgimine pikaajalise jõudluse analüüsiks:

```python
# Konfigureeri järelevalve MCP serveri jaoks
def configure_monitoring(server):
    # Sea üles Prometheuse mõõdikud
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
    
    # Lisa vahendustarkvara ajastamise ja mõõdikute salvestamise jaoks
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Avalikusta mõõdikute lõpp-punkt
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP töövoo disaini mustrid

Hästi kavandatud MCP töövood parandavad tõhusust, usaldusväärsust ja hooldatavust. Siin on peamised mustrid, mida järgida:

### 1. Tööriistade jada muster

Ühendage mitu tööriista järjestikku, kus iga tööriista väljund saab järgmise sisendiks:

```python
# Pythoni tööriistade ahelate teostus
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Käideldavate tööriistade nimede nimekiri
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Käivita iga tööriist ahelas, andes eelneva tulemuse
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Salvesta tulemus ja kasuta järgmise tööriista sisendina
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Näidise kasutamine
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

### 2. Saadetaja muster

Kasutage keskset tööriista, mis suunab sisendi põhjal spetsialiseeritud tööriistadele:

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

### 3. Paralleelle töötlemise muster

Käivitage mitu tööriista paralleelselt efektiivsuse tõstmiseks:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Samm 1: Hangi andmekogu metaandmed (sünkroonne)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Samm 2: Käivita mitu analüüsi paralleelselt
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
        
        // Oota kuni kõik paralleelsed ülesanded lõpule jõuavad
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Oota lõpetamist
        
        // Samm 3: Ühenda tulemused
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Samm 4: Loo kokkuvõtlik aruanne
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Tagasta kogu töövoo tulemus
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Vigade taastekke muster

Rakendage ladusaid tagavaralahendusi tööriistade tõrgete korral:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Proovi esmalt põhitööriista
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Logi ebaõnnestumine
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Lülitu varutööriistale
            try:
                # Võib vaja minna parameetrite teisendamist varutööriistale
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Mõlemad tööriistad ebaõnnestusid
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # See rakendus sõltub spetsiifilistest tööriistadest
        # Selles näites tagastame lihtsalt algsed parameetrid
        return params

# Näite kasutamine
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Põhitööriist (tasuline) ilmaprognoosi API
        "basicWeatherService",    # Varutööriist (tasuta) ilmaprognoosi API
        {"location": location}
    )
```

### 5. Töövoo koostamise muster

Looge keerukad töövood lihtsamate kombineerimisel:

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

# MCP serverite testimine: parimad tavad ja tipptõed

## Ülevaade

Testimine on usaldusväärsete ja kvaliteetsete MCP serverite arendamisel kriitilise tähtsusega. See juhend pakub põhjalikke parimaid tavasid ja nõuandeid MCP serverite testimiseks kogu arendusprotsessi vältel, alates üksikutest testidest kuni integratsiooni- ja lõputestideni.

## Miks MCP serverite testimine on oluline

MCP serverid toimivad olulise vahekihina tehisintellektimudelite ja kliendirakenduste vahel. Põhjalik testimine tagab:

- Usaldusväärsuse tootmiskeskkonnas
- Täpse päringute ja vastuste käsitlemise
- MCP spetsifikatsioonide korrektse rakendamise
- Tõrgete ja äärejuhtumite kindla taluvuse
- Järjepideva jõudluse erinevate koormuste all

## MCP serverite üksiktestimine

### Üksiktestimine (alus)

Üksiktestid kontrollivad üksikute MCP serveri komponentide funktsionaalsust isoleeritult.

#### Mida testida

1. **Ressursside käsitlejad**: Testige iga ressursi käsitleja loogikat iseseisvalt
2. **Tööriistade rakendused**: Kontrollige tööriistade käitumist erinevate sisenditega
3. **Üleskutse mallid**: Veenduge, et üleskutse mallid renderduvad korrektselt
4. **Skeemi valideerimine**: Testige parameetrite valideerimise loogikat
5. **Veahaldus**: Kontrollige vigaste sisendite puhul antud veavastuseid

#### Üksiktestimise parimad tavad

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
# Näide üksustest kalkulaatori tööriista jaoks Pythoni keeles
def test_calculator_tool_add():
    # Korralda
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Tegutse
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Kontrolli
    assert result["value"] == 12
```

### Integratsioonitestimine (kesktase)

Integratsioonitestid kontrollivad MCP serveri komponentide omavahelisi suhtlusi.

#### Mida testida

1. **Serveri käivitamine**: Testige serveri algust erinevate konfiguratsioonidega
2. **Teede registreerimine**: Kontrollige, et kõik lõpp-punktid on korrektselt registreeritud
3. **Päringu töötlemine**: Testige täismahus päringu-vastuse tsüklit
4. **Veateate levitamine**: Veenduge, et vead käsitletakse korrektselt komponentide vahel
5. **Autentimine ja autoriseerimine**: Testige turvamehhanisme

#### Integratsioonitestimise parimad tavad

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

### Lõpuni testimine (kõrge tase)

Lõpuni testid kontrollivad täielikku süsteemi toimimist kliendilt serverini.

#### Mida testida

1. **Klient-serveri suhtlus**: Testige täielikke päringu-vastuse tsükleid
2. **Reaalsed kliendi SDKd**: Testige tegelike kliendi rakendustega
3. **Jõudlus koormuse all**: Kontrollige käitumist mitme samaaegse päringu korral
4. **Vigadest taastumine**: Testige süsteemi taaskäivitumist tõrgete korral
5. **Pikkade toimingute käsitlemine**: Kontrollige voogude ja pikkade operatsioonide haldust

#### Lõpuni testimise parimad tavad

```typescript
// Näide E2E test kliendiga TypeScriptis
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Käivita server testkeskkonnas
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Tegevus
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Kinnitus
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP testimisel kasutatavad jäljendamisstrateegiad

Jäljendamine on vajalik komponentide isoleeritud testimiseks.

### Komponendid, mida jäljendada

1. **Välised AI mudelid**: Jäljendage mudelite vastuseid ettearvamiseks testimisel
2. **Välised teenused**: Jäljendage API sõltuvusi (andmebaasid, kolmandate osapoolte teenused)
3. **Autentimisteenused**: Jäljendage identiteediteenuseid
4. **Ressursipakkujad**: Jäljendage ressursimahukaid käsitlejaid

### Näide: AI mudeli vastuse jäljendamine

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
# Pythoni näide kasutades unittest.mock'i
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Määra mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Kasuta mock'i testis
    server = McpServer(model_client=mock_model)
    # Jätka testi with
```

## Jõudlustestimine

Jõudlustestimine on tootmiseks mõeldud MCP serverite puhul hädavajalik.

### Mida mõõta

1. **Latentsus**: Päringute vastamise aeg
2. ** Läbilaskevõime**: Töödeldud päringute arv sekundis
3. **Ressursside kasutus**: CPU, mälu, võrgu koormus
4. **Konkurentsivõime käsitlemine**: Käitumine paralleelsete päringute korral
5. **Skaalautuvuse omadused**: Jõudlus koormuse suurenemisel

### Jõudlustestimise tööriistad

- **k6**: Avatud lähtekoodiga koormustestimise tööriist
- **JMeter**: Kõikehõlmav jõudlustestimine
- **Locust**: Pythonipõhine koormustestimine
- **Azure Load Testing**: Pilvepõhine jõudlustestimine

### Näide: Lihtne koormustest k6-ga

```javascript
// k6 skript MCP serveri koormustestimiseks
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtuaalkasutajat
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

## Testimise automatiseerimine MCP serverite jaoks

Testide automatiseerimine tagab järjepideva kvaliteedi ja kiirem tagasiside.

### CI/CD integratsioon

1. **Käivitage üksiktestid pull-taotluste puhul**: Veenduge, et koodimuudatused ei riku olemasolevat funktsionaalsust
2. **Integreerimistestid etappides**: Käivita integreerimisteste eelpõhikeskkondades  
3. **Tulemuste võrdlusjooned**: Säilita jõudlusnäitajad regressioonide avastamiseks  
4. **Turvakontrollid**: Automaatne turvatestimine kui osa torujuhtmest  

### Näidispipelini CI (GitHub Actions)

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
  
## MCP spetsifikatsiooni järgimise testimine

Kontrolli, kas sinu server rakendab MCP spetsifikatsiooni korrektselt.

### Peamised vastavusvaldkonnad

1. **API lõpp-punktid**: Testi nõutud lõpp-punkte (/resources, /tools jne)  
2. **Päringu/Vastuse formaat**: Kontrolli skeemi järgimist  
3. **Veakoodi koodid**: Kontrolli õigete staatuskoodide kasutamist erinevates olukordades  
4. **Sisu tüübid**: Testi erinevate sisutüüpide käsitlemist  
5. **Autentimisläbivool**: Kontrolli spetsifikatsioonile vastavaid autentimismehhanisme  

### Vastavustestide komplekt

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
  
## Top 10 nippi tõhusaks MCP-serveri testimiseks

1. **Testi tööriistade definitsioone eraldi**: Kontrolli skeemi definitsioone eraldi tööriista loogikast  
2. **Kasuta parameetriseeritud teste**: Testi tööriistu mitmesuguste sisenditega, sealhulgas piirjuhtumitega  
3. **Kontrolli veavastuseid**: Kontrolli veakäsitluse korrektsust kõigi võimalike veatingimuste korral  
4. **Testeeri autoriseerimisloogikat**: Veendu korrektses juurdepääsukontrollis eri kasutajarollide jaoks  
5. **Jälgi testide katvust**: Püüa saavutada kõrge katvus kriitilises koodirajas  
6. **Testeeri voogvastuseid**: Kontrolli voogeva sisu õiget käsitlemist  
7. **Simulaadi võrguprobleeme**: Testi käitumist kehvade võrgutingimuste korral  
8. **Testeeri ressursside piire**: Kontrolli käitumist kvantiteedi- või kiiruspiirangute saavutamisel  
9. **Automatiseeri regressioonitestid**: Loo komplekt, mis jookseb iga koodimuudatuse korral  
10. **Dokumenteeri testjuhtumid**: Hoia teststsenaariumite selget dokumentatsiooni  

## Levinumad testimisvead

- **Liigne kindlus õnnestumiste testimises**: Veendu, et veakorras juhtumid on põhjalikult testitud  
- **Jõudluse testimise eiramine**: Leia kitsaskohad enne, kui need tootmises toime tulevad  
- **Testimine ainult isoleeritult**: Kombineeri üksustestid, integreerimistestid ja lõpp-kokku-lõpuni testid  
- **API katvuse puudulikkus**: Veendu, et kõik lõpp-punktid ja funktsioonid on testitud  
- **Ebajärjekindlad testikeskkonnad**: Kasuta konteinerite abi, et tagada järjepidev testikeskkond  

## Kokkuvõte

Terviklik testimisstrateegia on oluline usaldusväärsete ja kvaliteetsete MCP serverite arendamisel. Parimate tavade ja käesolevas juhendis toodud nõuannete rakendamise kaudu saad tagada, et sinu MCP rakendused vastavad kõrgeimatele kvaliteedi, töökindluse ja jõudluse standarditele.  

## Peamised õppetunnid

1. **Tööriista disain**: Järgi ühekohustuse põhimõtet, kasuta sõltuvussüstimist ning planeeri komponendiühenduvust  
2. **Skeemi disain**: Loo selged, hästi dokumenteeritud skeemid sobivate valideerimiskontraktidega  
3. **Veakäsitlus**: Rakenda sujuva veakäsitluse, struktureeritud veavastuste ning taaskäivituse loogikat  
4. **Jõudlus**: Kasuta vahemällu salvestamist, asünkroonset töötlemist ning ressursside piiranguid  
5. **Turvalisus**: Rakenda põhjalikku sisendi valideerimist, autoriseerimiskontrolle ja tundliku info käsitlemist  
6. **Testimine**: Loo põhjalikud üksuse-, integreerimis- ja lõpp-kokku-lõpuni testid  
7. **Töövoo mustrid**: Kasuta tunnustatud mustreid nagu ahelad, saadikud ja paralleeltöötlus  

## Harjutus

Disaini MCP tööriist ja töövoog dokumenditöötlussüsteemile, mis:

1. Võtab vastu dokumente mitmes formaadis (PDF, DOCX, TXT)  
2. Eristab tekstist ja võtmetest dokumentidest olulist teavet  
3. Klassifitseerib dokumendid tüübi ja sisu järgi  
4. Koostab iga dokumendi kokkuvõtte  

Rakenda tööriista skeemid, veakäsitlus ja sobiv töövoomuster. Mõtle, kuidas sa selle rakenduse testiksid.  

## Ressursid 

1. Liitu MCP kogukonnaga [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs), et olla kursis viimaste arengutega  
2. Panusta avatud lähtekoodiga [MCP projektidesse](https://github.com/modelcontextprotocol)  
3. Rakenda MCP printsiipide oma organisatsiooni tehisintellekti algatustes  
4. Uuri valdkonnapõhiseid MCP rakendusi  
5. Mõtle edasiarenduskursustele spetsiifilistel MCP teemadel, nagu multimodaalne integreerimine või ettevõtte rakenduste integratsioon  
6. Katseta enda MCP tööriistade ja töövoogude loomist printsiipide abil, mida õpid läbi [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Mis tuleb edasi

Järgmine: [Juhtumiuuringud](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->