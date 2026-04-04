# Najboljše prakse MCP razvoja

[![MCP Development Best Practices](../../../translated_images/sl/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Kliknite zgornjo sliko za ogled videa te lekcije)_

## Pregled

Ta lekcija se osredotoča na napredne najboljše prakse za razvoj, testiranje in uvajanje MCP strežnikov in funkcij v produkcijskih okoljih. Ko MCP ekosistemi rastejo v kompleksnosti in pomembnosti, sledenje uveljavljenim vzorcem zagotavlja zanesljivost, vzdržljivost in interoperabilnost. Ta lekcija združuje praktične izkušnje, pridobljene z izvedbo MCP v resničnem svetu, da vas vodi pri ustvarjanju robustnih, učinkovitih strežnikov z učinkovitimi viri, pozivi in orodji.

## Cilji učenja

Ob koncu te lekcije boste lahko:

- Uporabljali industrijske najboljše prakse pri načrtovanju MCP strežnikov in funkcij
- Ustvarili celovite strategije testiranja za MCP strežnike
- Načrtovali učinkovite, ponovno uporabne vzorce delovnih tokov za kompleksne MCP aplikacije
- Implementirali ustrezno ravnanje z napakami, beleženje in opazovanje v MCP strežnikih
- Optimizirali implementacije MCP za zmogljivost, varnost in vzdržljivost

## Osnovna načela MCP

Preden se poglobite v specifične implementacijske prakse, je pomembno razumeti osnovna načela, ki vodijo učinkoviti razvoj MCP:

1. **Standardizirana komunikacija**: MCP uporablja JSON-RPC 2.0 kot osnovo, ki zagotavlja dosleden format za zahteve, odgovore in obravnavo napak v vseh implementacijah.

2. **Uporabniško usmerjen dizajn**: Vedno dajte prednost soglasju, nadzoru in preglednosti uporabnikov v svojih implementacijah MCP.

3. **Varnost na prvem mestu**: Implementirajte robustne varnostne ukrepe, vključno z avtentikacijo, avtorizacijo, validacijo in omejevanjem hitrosti.

4. **Modularna arhitektura**: Načrtujte svoje MCP strežnike z modularnim pristopom, kjer ima vsako orodje in vir jasen, osredotočen namen.

5. **Povezave s stanjem**: Izkoristite sposobnost MCP za ohranjanje stanja med več zahtevami za bolj koherentne in kontekstno ozaveščene interakcije.

## Uradne najboljše prakse MCP

Naslednje najboljše prakse izhajajo iz uradne dokumentacije Model Context Protocol:

### Varnostne najboljše prakse

1. **Soglasje uporabnika in kontrola**: Vedno zahtevajte izrecno soglasje uporabnika, preden dostopate do podatkov ali izvajate operacije. Zagotovite jasen nadzor nad tem, kateri podatki so deljeni in katere akcije so pooblaščene.

2. **Zasebnost podatkov**: Uporabite podatke uporabnika le z izrecnim soglasjem in jih zaščitite z ustreznimi kontrolami dostopa. Zaščitite pred nepooblaščenim prenosom podatkov.

3. **Varnost orodij**: Zahtevajte izrecno soglasje uporabnika pred klicem kakršnegakoli orodja. Poskrbite, da uporabniki razumejo funkcionalnost vsakega orodja in uveljavljajte robustne varnostne meje.

4. **Nadzor dovoljenj za orodja**: Konfigurirajte, katera orodja lahko model uporablja med sejo, tako da so dostopna le izrecno pooblaščena orodja.

5. **Avtentikacija**: Zahtevajte ustrezno avtentikacijo pred dodelitvijo dostopa do orodij, virov ali občutljivih operacij z uporabo API ključev, OAuth žetonov ali drugih varnih metod avtentikacije.

6. **Validacija parametrov**: Uveljavljajte validacijo za vse klice orodij, da preprečite, da bi napačni ali zlonamerni vnosi dosegli implementacije orodij.

7. **Omejevanje hitrosti**: Implementirajte omejevanje hitrosti za preprečitev zlorab in zagotavljanje pravične uporabe strežniških virov.

### Najboljše prakse implementacije

1. **Pogajanje zmogljivosti**: Med vzpostavitvijo povezave izmenjajte informacije o podprtih funkcijah, različicah protokola, razpoložljivih orodjih in virih.

2. **Načrtovanje orodij**: Ustvarite osredotočena orodja, ki opravljajo eno stvar dobro, namesto monolitnih orodij, ki obravnavajo več zadev.

3. **Obravnava napak**: Implementirajte standardizirana sporočila o napakah in kode za lažjo diagnozo težav, prijazno rokovanje z napakami in zagotavljanje akcijskih povratnih informacij.

4. **Beleženje**: Konfigurirajte strukturirane dnevnike za revizijo, razhroščevanje in spremljanje interakcij protokola.

5. **Spremljanje napredka**: Za dolgotrajne operacije poročajte o posodobitvah napredka, da omogočite odziven uporabniški vmesnik.

6. **Preklic zahtev**: Dovolite odjemalcem preklicati trenutno izvedene zahteve, ki niso več potrebne ali trajajo predolgo.

## Dodatne reference

Za najnovejše informacije o najboljših praksah MCP glejte:

- [MCP Dokumentacija](https://modelcontextprotocol.io/)
- [MCP Specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repozitorij](https://github.com/modelcontextprotocol)
- [Varnostne najboljše prakse](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Varnostna tveganja in omilitve
- [Delo na delavnici MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična varnostna usposabljanja

## Primeri praktične implementacije

### Najboljše prakse pri načrtovanju orodij

#### 1. Načelo enotne odgovornosti

Vsako MCP orodje naj ima jasen in osredotočen namen. Namesto ustvarjanja monolitnih orodij, ki skušajo obravnavati več zadev, razvijajte specializirana orodja, ki so odlična za določene naloge.

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

#### 2. Konsistentna obravnava napak

Implementirajte robustno obravnavo napak z informativnimi sporočili o napakah in ustreznimi mehanizmi za obnovitev.

```python
# Python primer s celovitim ravnanjem z napakami
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Validacija parametrov
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Varnostna validacija
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operacija z bazo podatkov s časovno omejitvijo
                async with timeout(10):  # Časovna omejitev 10 sekund
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Napake povezave so lahko začasne
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Napake poizvedb so verjetno napake na strani odjemalca
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Naj specifične napake orodij prehajajo
            raise
        except Exception as e:
            # Zajetje vseh nepričakovanih napak
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementacija zaznavanja SQL injekcij
        pass
        
    def _log_error(self, message, error):
        # Implementacija beleženja napak
        pass
```

#### 3. Validacija parametrov

Vedno temeljito validirajte parametre, da preprečite napačne ali zlonamerne vnose.

```javascript
// Primer JavaScript/TypeScript z podrobno validacijo parametrov
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
    // 1. Preveri prisotnost parametra
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Preveri tipe parametrov
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Preveri vrednosti parametrov
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Preveri prisotnost vsebine za pisalno operacijo
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Validacija varnosti poti
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementacija na podlagi validiranih parametrov
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementacija preverjanja varnosti poti
    // ...
  }
}
```

### Primeri varnostnih implementacij

#### 1. Avtentikacija in avtorizacija

```java
// Java primer z avtentikacijo in avtorizacijo
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Vbrizgavanje odvisnosti
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
        // 1. Izvleček avtentikacijskega konteksta
        String authToken = request.getContext().getAuthToken();
        
        // 2. Avtentikacija uporabnika
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Preverjanje avtorizacije za določeno operacijo
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Nadaljujte z avtorizirano operacijo
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

#### 2. Omejevanje hitrosti

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

## Najboljše prakse testiranja

### 1. Enotno testiranje MCP orodij

Vedno testirajte svoja orodja izolirano, z lažnimi zunanjimi odvisnostmi:

```typescript
// Primer enotnega testa orodja v TypeScriptu
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Ustvari lažno vremensko storitev
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Ustvari orodje z lažno odvisnostjo
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Pripravi
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Izvedi
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Potrdi
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Pripravi
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Izvedi in potrdi
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integracijsko testiranje

Testirajte celoten proces od zahtev odjemalca do odgovorov strežnika:

```python
# Primer Python integracijskega testa
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Zaženi testni strežnik
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Ustvari odjemalca
        client = McpClient("http://localhost:5000")
        
        # Preizkusi odkritje orodja
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Preizkusi zagon orodja
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Preveri odziv
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Počisti
        await server.stop()
```

## Optimizacija zmogljivosti

### 1. Strategije predpomnjenja

Implementirajte ustrezno predpomnjenje za zmanjšanje latence in porabe virov:

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

#### 2. Vbrizgavanje odvisnosti in testabilnost

Načrtujte orodja tako, da prejemajo svoje odvisnosti prek konstruktorja, kar omogoča testabilnost in konfigurabilnost:

```java
// Java primer z odvisnostno injekcijo
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Odvisnosti vstavljene prek konstruktorja
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implementacija orodja
    // ...
}
```

#### 3. Sestavljiva orodja

Načrtujte orodja, ki jih je mogoče sestaviti za ustvarjanje kompleksnejših delovnih tokov:

```python
# Python primer, ki prikazuje sestavljive orodja
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementacija...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # To orodje lahko uporablja rezultate orodja dataFetch
    async def execute_async(self, request):
        # Implementacija...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # To orodje lahko uporablja rezultate orodja dataAnalysis
    async def execute_async(self, request):
        # Implementacija...
        pass

# Ta orodja se lahko uporabljajo neodvisno ali kot del delovnega toka
```

### Najboljše prakse načrtovanja shem

Shema je pogodba med modelom in vašim orodjem. Dobro načrtovane sheme izboljšajo uporabnost orodij.

#### 1. Jasni opisi parametrov

Vedno vključite opisne informacije za vsak parameter:

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

#### 2. Omejitve validacije

Vključite omejitve validacije, da preprečite neveljavne vnose:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Lastnost elektronske pošte z validacijo formata
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Lastnost starosti z numeričnimi omejitvami
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Enumerirana lastnost
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

#### 3. Konsistentne strukture povratnih odgovorov

Vzdržujte konsistenco v strukturah odgovorov, da modelom olajšate interpretacijo rezultatov:

```python
async def execute_async(self, request):
    try:
        # Obdelaj zahtevo
        results = await self._search_database(request.parameters["query"])
        
        # Vedno vrni dosledno strukturo
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

### Obravnava napak

Robustna obravnava napak je ključna za ohranjanje zanesljivosti MCP orodij.

#### 1. Prijazno ravnanje z napakami

Ravnajte z napakami na ustreznih nivojih in nudite informativna sporočila:

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

#### 2. Strukturirani odgovori o napakah

Po potrebi vračajte strukturirane informacije o napakah:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementacija
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
        
        // Ponovno zavrzi druge izjeme kot ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Logika ponovnih poskusov

Implementirajte ustrezno logiko ponovnih poskusov za začasne napake:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekunde
    
    while retry_count < max_retries:
        try:
            # Pokliči zunanji API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Eksponentna ponovna poizvedba
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Neprehodna napaka, ne poskušaj znova
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Optimizacija zmogljivosti

#### 1. Predpomnjenje

Implementirajte predpomnjenje za drage operacije:

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

#### 2. Asinhrono procesiranje

Uporabljajte asinhrone programske vzorce za I/O-operacije:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Za dolgotrajne operacije takoj vrnite ID postopka
        String processId = UUID.randomUUID().toString();
        
        // Začnite asinhrono obdelavo
        CompletableFuture.runAsync(() -> {
            try {
                // Izvedite dolgotrajno operacijo
                documentService.processDocument(documentId);
                
                // Posodobite status (ponavadi se shrani v podatkovno bazo)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Vrni takojšen odgovor z ID-jem postopka
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Orodje za preverjanje statusa spremljevalca
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

#### 3. Omejevanje virov

Implementirajte omejevanje virov, da preprečite preobremenitev:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Dovoli 5 zahtevkov na sekundo
            bucket_size=10        # Dovoli sunke do 10 zahtevkov
        )
    
    async def execute_async(self, request):
        # Preveri, ali lahko nadaljujemo ali moramo počakati
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Če je čakanje predolgo
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Počakaj ustrezen čas zamika
                await asyncio.sleep(delay)
        
        # Porabi žeton in nadaljuj z zahtevkom
        self.rate_limiter.consume()
        
        # Pokliči API
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
            
            # Izračunaj čas do razpoložljivosti naslednjega žetona
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Dodaj nove žetone glede na pretečeni čas
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Najboljše varnostne prakse

#### 1. Validacija vnosa

Vedno temeljito validirajte vhodne parametre:

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

#### 2. Preverjanje avtorizacije

Implementirajte pravilne preverjanja avtorizacije:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Pridobi uporabniški kontekst iz zahteve
    UserContext user = request.getContext().getUserContext();
    
    // Preveri, ali ima uporabnik zahtevana dovoljenja
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Za določene vire preveri dostop do tega vira
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Nadaljuj z izvajanjem orodja
    // ...
}
```

#### 3. Ravnanje z občutljivimi podatki

Ravnajte previdno z občutljivimi podatki:

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
        
        # Pridobi uporabniške podatke
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtriraj občutljiva polja, razen če niso izrecno zahtevana IN odobrena
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Preveri raven avtorizacije v kontekstu zahteve
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Ustvari kopijo, da ne spremeniš originala
        redacted = user_data.copy()
        
        # Zamegli določena občutljiva polja
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Zamegli gnezdene občutljive podatke
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Najboljše prakse testiranja MCP orodij

Celovito testiranje zagotavlja pravilno delovanje MCP orodij, obravnavo robnih primerov in pravilno integracijo s preostalim sistemom.

### Enotno testiranje

#### 1. Testirajte vsako orodje izolirano

Ustvarite osredotočene teste za funkcionalnost vsakega orodja:

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

#### 2. Testiranje validacije shem

Testirajte, da so sheme veljavne in pravilno uveljavljajo omejitve:

```java
@Test
public void testSchemaValidation() {
    // Ustvari primerek orodja
    SearchTool searchTool = new SearchTool();
    
    // Pridobi shemo
    Object schema = searchTool.getSchema();
    
    // Pretvori shemo v JSON za validacijo
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Preveri, če je shema veljaven JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Preizkusi veljavne parametre
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Preizkusi manjkajoči obvezni parameter
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Preizkusi neveljaven tip parametra
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Testi obravnave napak

Ustvarite specifične teste za stanja napak:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Pripravi
    tool = ApiTool(timeout=0.1)  # Zelo kratek časovni omejitev
    
    # Naredi imitacijo zahteve, ki bo potekla
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Daljši od časovne omejitve
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Izvedi in preveri
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Preveri sporočilo izjeme
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Pripravi
    tool = ApiTool()
    
    # Naredi imitacijo odgovora z omejitvijo hitrosti
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
        
        # Izvedi in preveri
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Preveri, ali izjema vsebuje informacije o omejitvi hitrosti
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integracijsko testiranje

#### 1. Testiranje verige orodij

Testirajte orodja, ki delujejo skupaj v pričakovanih kombinacijah:

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

#### 2. Testiranje MCP strežnika

Testirajte MCP strežnik s popolno registracijo in izvajanjem orodij:

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
        // Preizkusi točko za odkrivanje
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Ustvari zahtevo orodja
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Pošlji zahtevo in preveri odgovor
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Ustvari neveljavno zahtevo orodja
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Manjkajoči parameter "b"
        request.put("parameters", parameters);
        
        // Pošlji zahtevo in preveri odgovor z napako
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-end testiranje

Testirajte celovite delovne tokove od poziva modela do izvajanja orodij:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Priprava - Nastavi MCP odjemalca in model ponarejanja
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Odgovori modela ponarejanja
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
    
    # Odgovor orodja za vremensko napovedovanje ponarejanja
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
        
        # Izvedba
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Preverjanje
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Testiranje zmogljivosti

#### 1. Testiranje obremenitve

Testirajte, koliko sočasnih zahtev lahko vaš MCP strežnik obdeluje:

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

#### 2. Testiranje obremenitvenih konic

Testirajte sistem pod ekstremno obremenitvijo:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Nastavite JMeter za stresno testiranje
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Konfigurirajte načrt testa JMeter
    HashTree testPlanTree = new HashTree();
    
    // Ustvarite načrt testa, skupino niti, vzorčnike itd.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Dodajte HTTP vzorčnik za izvajanje orodja
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Dodajte poslušalce
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Zaženite test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Preverite rezultate
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Povprečni čas odziva < 200 ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. percentil < 500 ms
}
```

#### 3. Spremljanje in profiliranje

Vzpostavite spremljanje za dolgoročne analize zmogljivosti:

```python
# Konfigurirajte spremljanje za MCP strežnik
def configure_monitoring(server):
    # Nastavite Prometheus meritve
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
    
    # Dodajte vmesno programsko opremo za merjenje časa in beleženje meritev
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Izpostavite konec točke meritev
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Vzorci načrtovanja delovnih tokov MCP

Dobro zasnovani delovni tokovi MCP izboljšujejo učinkovitost, zanesljivost in vzdržljivost. Tu so ključni vzorci za sledenje:

### 1. Vzorec verige orodij

Povežite več orodij v zaporedju, kjer izhod vsakega orodja postane vhod za naslednjega:

```python
# Implementacija Python verige orodij
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Seznam imen orodij za izvajanje v zaporedju
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Izvedi vsako orodje v verigi, pri čemer se uporablja prejšnji rezultat
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Shrani rezultat in ga uporabi kot vhod za naslednje orodje
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Primer uporabe
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

### 2. Vzorec razpošiljevalca

Uporabite osrednje orodje, ki na podlagi vhoda razpošilja specializiranim orodjem:

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

### 3. Vzorec vzporednega procesiranja

Sočasno izvajajte več orodij za učinkovitost:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Korak 1: Pridobi metapodatke nabora podatkov (sinhrono)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Korak 2: Zaženi več analiz vzporedno
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
        
        // Počakaj, da se vse vzporedne naloge dokončajo
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Počakaj na dokončanje
        
        // Korak 3: Združi rezultate
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Korak 4: Ustvari povzetek poročila
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Vrni celoten rezultat delovnega toka
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Vzorec okrevanja po napaki

Implementirajte prijazne nadomestne rešitve za neuspehe orodij:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Najprej poskusi prvi orodje
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Zabeleži napako
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Uporabi nadomestno orodje
            try:
                # Morda bo treba spremeniti parametre za nadomestno orodje
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Obe orodji sta odpovedali
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Ta implementacija bi bila odvisna od specifičnih orodij
        # Za ta primer bomo preprosto vrnili izvirne parametre
        return params

# Primer uporabe
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Primarni (plačljivi) vremenski API
        "basicWeatherService",    # Nadomestni (brezplačni) vremenski API
        {"location": location}
    )
```

### 5. Vzorec sestave delovnih tokov

Gradite kompleksne delovne tokove s sestavljanjem preprostejših:

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

# Testiranje MCP strežnikov: najboljše prakse in glavne napotke

## Pregled

Testiranje je ključen vidik razvoja zanesljivih, kakovostnih MCP strežnikov. Ta vodnik ponuja celovite najboljše prakse in nasvete za testiranje vaših MCP strežnikov skozi celoten razvojni cikel, od enotnih testov do integracijskih testov in celovite validacije.

## Zakaj je testiranje pomembno za MCP strežnike

MCP strežniki služijo kot ključna vmesna plast med AI modeli in odjemalskimi aplikacijami. Temeljito testiranje zagotavlja:

- Zanesljivost v produkcijskih okoljih
- Natančno obravnavo zahtev in odgovorov
- Pravilno implementacijo MCP specifikacij
- Odpornost proti napakam in robnim primerom
- Konsistentno zmogljivost pri različnih obremenitvah

## Enotno testiranje MCP strežnikov

### Enotno testiranje (osnova)

Enotni testi preverjajo posamezne komponente vašega MCP strežnika izolirano.

#### Kaj testirati

1. **Obdelovalci virov**: Neodvisno testirajte logiko vsakega obdelovalca virov
2. **Implementacije orodij**: Preverite vedenje orodij z različnimi vnosi
3. **Predloge pozivov**: Zagotovite pravilno upodobitev predlog pozivov
4. **Validacija shem**: Testirajte logiko validate parametrov
5. **Obravnava napak**: Preverite odgovore na napake za neveljavne vnose

#### Najboljše prakse enotnega testiranja

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
# Primer enotnega testa za orodje kalkulator v Pythonu
def test_calculator_tool_add():
    # Pripravi
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Izvedi
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Preveri
    assert result["value"] == 12
```

### Integracijsko testiranje (srednji sloj)

Integracijski testi preverjajo interakcije med komponentami vašega MCP strežnika.

#### Kaj testirati

1. **Zagon strežnika**: Testirajte zagon strežnika z različnimi konfiguracijami
2. **Registracija poti**: Preverite, da so vse končne točke pravilno registrirane
3. **Obdelava zahtev**: Testirajte celoten cikel zahteva-odgovor
4. **Propagacija napak**: Zagotovite pravilno obravnavo napak med komponentami
5. **Avtentikacija in avtorizacija**: Testirajte varnostne mehanizme

#### Najboljše prakse integracijskega testiranja

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

### End-to-end testiranje (zgornji sloj)

End-to-end testi preverjajo celotno vedenje sistema od odjemalca do strežnika.

#### Kaj testirati

1. **Komunikacija odjemalec-strežnik**: Testirajte celotne cikle zahteva-odgovor
2. **Pravi SDK-ji odjemalca**: Testirajte z dejanskimi implementacijami odjemalcev
3. **Zmogljivost pod obremenitvijo**: Preverite vedenje pri več sočasnih zahtevah
4. **Okrevanje po napakah**: Testirajte okrevanje sistema po napakah
5. **Dolgotrajne operacije**: Preverite obravnavo pretakanja in dolgih operacij

#### Najboljše prakse za E2E testiranje

```typescript
// Primer E2E testa s klientom v TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Zaženi strežnik v testnem okolju
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Izvedi
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Preveri
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Strategije lažnega izvajanja (mocking) za testiranje MCP

Lažno izvajanje je nujno za izolacijo komponent med testiranjem.

### Komponente za lažno izvajanje

1. **Zunanji AI modeli**: Lažno izvajajte odgovore modelov za predvidljivo testiranje
2. **Zunanje storitve**: Lažno izvajajte API odvisnosti (baze podatkov, storitve tretjih oseb)
3. **Avtentikacijske storitve**: Lažno izvajajte ponudnike identitete
4. **Ponudniki virov**: Lažno izvajajte drage upravljalce virov

### Primer: Lažno izvajanje odgovora AI modela

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
# Primer Python s unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Konfigurirajte maketo
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Uporabite maketo v testu
    server = McpServer(model_client=mock_model)
    # Nadaljujte s testom
```

## Testiranje zmogljivosti

Testiranje zmogljivosti je ključno za produkcijske MCP strežnike.

### Kaj meriti

1. **Zakasnitev**: Čas odgovora na zahteve
2. **Prekožljivost**: Število obdelanih zahtev na sekundo
3. **Poraba virov**: Uporaba CPU, pomnilnika, omrežja
4. **Obravnava sočasnosti**: Vedenje pod vzporednimi zahtevami
5. **Značilnosti skaliranja**: Zmogljivost ob naraščajoči obremenitvi

### Orodja za testiranje zmogljivosti

- **k6**: orodje za testiranje obremenitve odprte kode
- **JMeter**: celovito testiranje zmogljivosti
- **Locust**: Python osnovano orodje za testiranje obremenitve
- **Azure Load Testing**: oblačno testiranje zmogljivosti

### Primer: Osnovni test obremenitve s k6

```javascript
// k6 skripta za obremenitveno testiranje MCP strežnika
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtualnih uporabnikov
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

## Avtomatizacija testov za MCP strežnike

Avtomatizacija testov zagotavlja stalno kakovost in hitrejše povratne informacije.

### Integracija CI/CD
1. **Zaženi enotne teste za pull requeste**: Zagotovi, da spremembe kode ne pokvarijo obstoječe funkcionalnosti  
2. **Integracijski testi v predprodukciji**: Zaženi integracijske teste v okoljih pred produkcijo  
3. **Referenčne točke zmogljivosti**: Ohrani merila zmogljivosti za odkrivanje regresij  
4. **Varnostni pregledi**: Avtomatiziraj varnostno testiranje kot del procesa  

### Primer CI cevovoda (GitHub Actions)

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
  
## Testiranje skladnosti s specifikacijo MCP

Preveri, da tvoj strežnik pravilno implementira specifikacijo MCP.

### Ključna področja skladnosti

1. **API končne točke**: Testiraj zahtevane končne točke (/resources, /tools itd.)  
2. **Format zahteve/odgovora**: Validiraj skladnost s shemo  
3. **Kode napak**: Preveri pravilne statusne kode za različne scenarije  
4. **Vrste vsebine**: Testiraj ravnanje z različnimi vrstami vsebine  
5. **Avtentikacijski potek**: Preveri mehanizme avtentikacije skladne s specifikacijo  

### Paket testov skladnosti

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
  
## Top 10 nasvetov za učinkovito testiranje MCP strežnika

1. **Ločeno testiraj definicije orodij**: Preveri definicije shem neodvisno od logike orodja  
2. **Uporabi parametrične teste**: Testiraj orodja z različnimi vhodnimi podatki, vključno z mejami  
3. **Preveri odzive ob napakah**: Preveri pravilno obravnavo napak za vse možne napake  
4. **Testiraj logiko avtorizacije**: Zagotovi ustrezno kontrolo dostopa za različne uporabniške vloge  
5. **Nadzoruj pokritost testov**: Ciljaj na visoko pokritost kritične kode  
6. **Testiraj pretočne odzive**: Preveri pravilno ravnanje s pretočno vsebino  
7. **Simuliraj težave v omrežju**: Testiraj vedenje pri slabih omrežnih pogojih  
8. **Testiraj omejitve virov**: Preveri vedenje ob doseganju kvot ali omejitev hitrosti  
9. **Avtomatiziraj regresijske teste**: Zgradi paket, ki se zažene ob vsaki spremembi kode  
10. **Dokumentiraj testne primere**: Ohrani jasno dokumentacijo testnih scenarijev  

## Pogoste pasti pri testiranju

- **Prevelika zanašanja na teste "srečne poti"**: Poskrbi za temeljito testiranje napak  
- **Ignoriranje testov zmogljivosti**: Prepoznaj ozka grla preden vplivajo na produkcijo  
- **Testiranje samo v izolaciji**: Kombiniraj enotne, integracijske in E2E teste  
- **Nepopolna pokritost API-jev**: Zagotovi testiranje vseh končnih točk in funkcij  
- **Nekonsistentna testna okolja**: Uporabi kontejnere za zagotovitev konsistentnih testnih okolij  

## Zaključek

Celovita testna strategija je ključna za razvoj zanesljivih, visokokakovostnih MCP strežnikov. Z implementacijo najboljših praks in nasvetov iz tega vodiča lahko zagotoviš, da tvoje MCP implementacije dosegajo najvišje standarde kakovosti, zanesljivosti in zmogljivosti.  

## Ključne ugotovitve

1. **Oblikovanje orodij**: Sledi načelu enotne odgovornosti, uporabi injekcijo odvisnosti in načrtuj za sestavljivost  
2. **Oblikovanje shem**: Ustvari jasne, dobro dokumentirane sheme s pravilnimi validacijskimi omejitvami  
3. **Ravnanje z napakami**: Implementiraj elegantno ravnanje z napakami, strukturirane odzive in logiko ponavljanja  
4. **Zmogljivost**: Uporabi predpomnilnik, asinhrono obdelavo in omejevanje virov  
5. **Varnost**: Uporabi temeljito validacijo vhodnih podatkov, preverjanje avtorizacije in obravnavo občutljivih podatkov  
6. **Testiranje**: Ustvari celovite enotne, integracijske in end-to-end teste  
7. **Vzorec delovnih tokov**: Uporabi uveljavljene vzorce kot so verige, usmerjevalniki in vzporedna obdelava  

## Vaja

Oblikuj MCP orodje in delovni tok za sistem obdelave dokumentov, ki:

1. Sprejema dokumente v več formatih (PDF, DOCX, TXT)  
2. Izlušči besedilo in ključne informacije iz dokumentov  
3. Klasificira dokumente po vrsti in vsebini  
4. Ustvari povzetek vsakega dokumenta  

Implementiraj sheme orodij, ravnanje z napakami in vzorec delovnega toka, ki najbolj ustreza temu scenariju. Razmisli, kako bi to implementacijo testiral.  

## Viri  

1. Pridruži se skupnosti MCP na [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) za najnovejše novice  
2. Prispevaj k odprtokodnim [MCP projektom](https://github.com/modelcontextprotocol)  
3. Uporabi principe MCP v AI iniciativah svoje organizacije  
4. Razišči specializirane MCP implementacije za svojo panogo  
5. Razmisli o naprednih tečajih na specifične teme MCP, kot sta večmodalna integracija ali integracija poslovnih aplikacij  
6. Eksperimentiraj z izgradnjo lastnih MCP orodij in delovnih tokov z uporabo principov, naučenih v [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Kaj sledi

Naprej: [Primeri primerov](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo storitve za strojno prevajanje AI [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da samodejni prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku velja za avtentičen vir. Za ključne informacije priporočamo strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne razlage, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->