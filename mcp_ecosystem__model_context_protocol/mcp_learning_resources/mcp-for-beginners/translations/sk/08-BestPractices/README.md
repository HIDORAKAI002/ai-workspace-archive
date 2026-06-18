# Najlepšie postupy vývoja MCP

[![Najlepšie postupy vývoja MCP](../../../translated_images/sk/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Kliknite na obrázok vyššie pre zobrazenie videa tejto lekcie)_

## Prehľad

Táto lekcia sa zameriava na pokročilé najlepšie postupy pre vývoj, testovanie a nasadzovanie MCP serverov a funkcií v produkčných prostrediach. Ako sa ekosystémy MCP stávajú zložitejšími a významnejšími, dodržiavanie zavedených vzorov zabezpečuje spoľahlivosť, udržiavateľnosť a interoperabilitu. Táto lekcia konsoliduje praktickú múdrosť získanú z reálnych implementácií MCP, aby vás viedla pri tvorbe robustných, efektívnych serverov s účinnými zdrojmi, výzvami a nástrojmi.

## Ciele učenia

Na konci tejto lekcie budete schopní:

- Aplikovať najlepšie priemyselné postupy pri návrhu MCP serverov a funkcií
- Vytvárať komplexné testovacie stratégie pre MCP servery
- Navrhovať efektívne a znovupoužiteľné workflow vzory pre komplexné MCP aplikácie
- Implementovať správne spracovanie chýb, zaznamenávanie a pozorovateľnosť MCP serverov
- Optimalizovať implementácie MCP z hľadiska výkonu, bezpečnosti a udržiavateľnosti

## Základné princípy MCP

Pred sústredením sa na konkrétne implementačné postupy je dôležité pochopiť základné princípy, ktoré vedú efektívny vývoj MCP:

1. **Štandardizovaná komunikácia**: MCP používa JSON-RPC 2.0 ako svoj základ, poskytujúci konzistentný formát pre požiadavky, odpovede a spracovanie chýb vo všetkých implementáciách.

2. **Zameranie na používateľa**: Vždy uprednostňujte súhlas, kontrolu a transparentnosť používateľa vo vašich implementáciách MCP.

3. **Bezpečnosť na prvom mieste**: Implementujte robustné bezpečnostné opatrenia vrátane autentifikácie, autorizácie, validácie a obmedzovania rýchlosti.

4. **Modulárna architektúra**: Navrhnite svoje MCP servery modulárne, pričom každý nástroj a zdroj má jasný, zameraný účel.

5. **Stavové pripojenia**: Využite schopnosť MCP udržiavať stav naprieč viacerými požiadavkami pre koherentnejšie a kontextovo uvedomelejšie interakcie.

## Oficiálne najlepšie postupy MCP

Nasledujúce najlepšie postupy sú odvodené z oficiálnej dokumentácie Model Context Protocol:

### Najlepšie bezpečnostné postupy

1. **Súhlas a kontrola používateľa**: Vždy vyžadujte výslovný súhlas používateľa pred prístupom k údajom alebo vykonávaním operácií. Poskytnite jasnú kontrolu nad tým, ktoré údaje sa zdieľajú a ktoré akcie sú autorizované.

2. **Ochrana súkromia údajov**: Zobrazujte používateľské údaje len s výslovným súhlasom a chráňte ich vhodnou kontrolou prístupu. Zabezpečte ochranu proti neoprávnenému prenosu údajov.

3. **Bezpečnosť nástrojov**: Vyžadujte výslovný súhlas používateľa pred vyvolaním akéhokoľvek nástroja. Zabezpečte, aby používatelia rozumeli funkciám každého nástroja a vynúťte robustné bezpečnostné hranice.

4. **Kontrola oprávnení nástrojov**: Konfigurujte, ktoré nástroje môže model počas relácie používať, aby mali prístup len výslovne autorizované nástroje.

5. **Autentifikácia**: Vyžadujte správnu autentifikáciu pred poskytnutím prístupu k nástrojom, zdrojom alebo citlivým operáciám pomocou API kľúčov, OAuth tokenov alebo iných bezpečných autentifikačných metód.

6. **Validácia parametrov**: Vynúťte validáciu všetkých vyvolaní nástrojov, aby sa zabránilo chybným alebo škodlivým vstupom, ktoré by mohli dospieť k implementáciám nástrojov.

7. **Obmedzenie rýchlosti**: Implementujte obmedzenie rýchlosti, aby ste predišli zneužívaniu a zabezpečili spravodlivé využívanie serverových zdrojov.

### Najlepšie implementačné postupy

1. **Vyjednávanie schopností**: Počas nastavovania pripojenia vymieňajte informácie o podporovaných funkciách, verziách protokolu, dostupných nástrojoch a zdrojoch.

2. **Návrh nástrojov**: Vytvárajte zamerané nástroje, ktoré robia jednu vec dobre, namiesto monolitických nástrojov riešiacich viaceré záležitosti.

3. **Spracovanie chýb**: Implementujte štandardizované chybové správy a kódy, ktoré pomáhajú diagnostikovať problémy, elegantne riešiť zlyhania a poskytovať akčné spätné väzby.

4. **Zaznamenávanie**: Konfigurujte štruktúrované logy pre audit, ladenie a monitorovanie interakcií protokolu.

5. **Sledovanie pokroku**: Pre dlhšie bežiace operácie hláste aktualizácie pokroku, aby umožnili responzívne používateľské rozhrania.

6. **Zrušenie požiadavky**: Umožnite klientom zrušiť požiadavky, ktoré už nie sú potrebné alebo trvajú príliš dlho.

## Ďalšie odkazy

Pre najaktuálnejšie informácie o najlepších postupoch MCP sa obráťte na:

- [MCP Dokumentácia](https://modelcontextprotocol.io/)
- [Špecifikácia MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitár](https://github.com/modelcontextprotocol)
- [Najlepšie bezpečnostné postupy](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – bezpečnostné riziká a opatrenia
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – praktický bezpečnostný tréning

## Praktické príklady implementácie

### Najlepšie postupy návrhu nástrojov

#### 1. Princíp jedinej zodpovednosti

Každý MCP nástroj by mal mať jasne zameraný účel. Namiesto tvorby monolitických nástrojov, ktoré sa snažia riešiť viaceré záležitosti, vyvíjajte špecializované nástroje vynikajúce v konkrétnych úlohách.

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

#### 2. Konzistentné spracovanie chýb

Implementujte robustné spracovanie chýb s informatívnymi chybovými správami a vhodnými mechanizmami zotavenia.

```python
# Python príklad s komplexným spracovaním chýb
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Overenie parametrov
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Bezpečnostné overenie
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operácia s databázou s časovým limitom
                async with timeout(10):  # Časový limit 10 sekúnd
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Chyby pripojenia môžu byť dočasné
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Chyby dopytu sú pravdepodobne chyby klienta
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Nechajte prejsť chyby špecifické pre nástroj
            raise
        except Exception as e:
            # Zachytenie všetkých neočakávaných chýb
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementácia detekcie SQL injekcií
        pass
        
    def _log_error(self, message, error):
        # Implementácia zaznamenávania chýb
        pass
```

#### 3. Validácia parametrov

Vždy dôkladne validujte parametre, aby ste predišli chybným alebo škodlivým vstupom.

```javascript
// Príklad v JavaScript/TypeScript s podrobnou validáciou parametrov
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
    // 1. Overenie prítomnosti parametra
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Overenie typov parametrov
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Overenie hodnôt parametrov
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Overenie prítomnosti obsahu pre operáciu zápisu
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Overenie bezpečnosti cesty
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementácia založená na overených parametroch
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementácia kontroly bezpečnosti cesty
    // ...
  }
}
```

### Príklady implementácie bezpečnosti

#### 1. Autentifikácia a autorizácia

```java
// Príklad v Jave s autentifikáciou a autorizáciou
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Vstrekovanie závislostí
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
        // 1. Extrahovať kontext autentifikácie
        String authToken = request.getContext().getAuthToken();
        
        // 2. Autentifikovať používateľa
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Skontrolovať autorizáciu pre konkrétnu operáciu
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Pokračovať s autorizovanou operáciou
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

#### 2. Obmedzenie rýchlosti

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

## Najlepšie testovacie postupy

### 1. Jednotkové testovanie MCP nástrojov

Vždy testujte svoje nástroje izolovane, pomocou mockovania externých závislostí:

```typescript
// Príklad jednotkového testu nástroja v TypeScripte
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Vytvorte falošnú službu počasia
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Vytvorte nástroj s falošnou závislosťou
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Pripravte
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Vykonajte
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Overte
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Pripravte
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Vykonajte a overte
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integračné testovanie

Testujte kompletný tok od požiadaviek klienta až po odpovede servera:

```python
# Príklad integračného testu v Pythone
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Spustiť testovací server
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Vytvoriť klienta
        client = McpClient("http://localhost:5000")
        
        # Otestovať zistenie nástroja
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Otestovať spustenie nástroja
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Overiť odpoveď
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Vyčistiť prostredie
        await server.stop()
```

## Optimalizácia výkonu

### 1. Stratégií kešovania

Implementujte vhodné kešovanie na zníženie latencie a využitia zdrojov:

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

#### 2. Injekcia závislostí a testovateľnosť

Navrhujte nástroje tak, aby prijímali svoje závislosti cez konštruktor, čím sú testovateľné a konfigurovateľné:

```java
// Príklad v Jave s injektovaním závislostí
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Závislosti injektované cez konštruktor
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implementácia nástroja
    // ...
}
```

#### 3. Kompozitné nástroje

Navrhujte nástroje, ktoré je možné skladať spolu pre tvorbu komplexnejších pracovných procesov:

```python
# Príklad v Pythone ukazujúci skladateľné nástroje
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementácia...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Tento nástroj môže použiť výsledky z nástroja dataFetch
    async def execute_async(self, request):
        # Implementácia...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Tento nástroj môže použiť výsledky z nástroja dataAnalysis
    async def execute_async(self, request):
        # Implementácia...
        pass

# Tieto nástroje môžu byť použité samostatne alebo ako súčasť pracovného postupu
```

### Najlepšie praktiky návrhu schémy

Schéma je zmluva medzi modelom a vašim nástrojom. Dobre navrhnuté schémy vedú k lepšej použiteľnosti nástrojov.

#### 1. Jasné popisy parametrov

Vždy zahrňte popisné informácie pre každý parameter:

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

#### 2. Overovacie obmedzenia

Zahrňte overovacie obmedzenia na zabránenie neplatných vstupov:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Vlastnosť e-mailu s overením formátu
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Vlastnosť veku s číselnými obmedzeniami
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Vlastnosť so zoznamom hodnôt
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

#### 3. Konzistentné návratové štruktúry

Udržiavajte konzistentnosť vo svojich odpovediach, aby modely ľahšie interpretovali výsledky:

```python
async def execute_async(self, request):
    try:
        # Spracovať požiadavku
        results = await self._search_database(request.parameters["query"])
        
        # Vždy vrátiť konzistentnú štruktúru
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

### Spracovanie chýb

Robustné spracovanie chýb je kľúčové pre spoľahlivosť MCP nástrojov.

#### 1. Elegantné spracovanie chýb

Chyby spracovávajte na vhodných úrovniach a poskytujte informatívne správy:

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

#### 2. Štruktúrované chybové odpovede

Keď je to možné, vracajte štruktúrované informácie o chybách:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementácia
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
        
        // Znova vyvolajte ostatné výnimky ako ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Logika opakovania

Implementujte vhodnú logiku opakovania pre prechodné zlyhania:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekundy
    
    while retry_count < max_retries:
        try:
            # Zavolať externé API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Exponenciálne oneskorenie
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Netemporárna chyba, nesnažte sa znova
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Optimalizácia výkonu

#### 1. Kešovanie

Implementujte kešovanie pre nákladné operácie:

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

#### 2. Asynchrónne spracovanie

Používajte asynchrónne programovacie vzory pre I/O viazané operácie:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Pre dlhodobé operácie okamžite vráťte ID spracovania
        String processId = UUID.randomUUID().toString();
        
        // Spustiť asynchrónne spracovanie
        CompletableFuture.runAsync(() -> {
            try {
                // Vykonať dlhodobú operáciu
                documentService.processDocument(documentId);
                
                // Aktualizovať stav (obyčajne by sa ukladalo v databáze)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Vrátiť okamžitú odpoveď s ID procesu
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Nástroj na kontrolu stavu companion
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

#### 3. Obmedzovanie zdrojov

Implementujte obmedzovanie zdrojov, aby ste predišli preťaženiu:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Povoliť 5 požiadaviek za sekundu
            bucket_size=10        # Povoliť nárazy až do 10 požiadaviek
        )
    
    async def execute_async(self, request):
        # Skontrolovať, či môžeme pokračovať alebo je potrebné čakať
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Ak je čakanie príliš dlhé
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Počkajte príslušný čas oneskorenia
                await asyncio.sleep(delay)
        
        # Spotrebovať token a pokračovať v požiadavke
        self.rate_limiter.consume()
        
        # Zavolať API
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
            
            # Vypočítať čas do dostupnosti ďalšieho tokenu
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Pridať nové tokeny na základe uplynutého času
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Najlepšie bezpečnostné postupy

#### 1. Overovanie vstupov

Vždy dôkladne validujte vstupné parametre:

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

#### 2. Kontroly autorizácie

Implementujte správne kontroly autorizácie:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Získať používateľský kontext z požiadavky
    UserContext user = request.getContext().getUserContext();
    
    // Skontrolujte, či má používateľ požadované povolenia
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Pre špecifické zdroje skontrolujte prístup k tomuto zdroju
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Pokračujte vo vykonávaní nástroja
    // ...
}
```

#### 3. Spracovanie citlivých údajov

Zachádzajte s citlivými údajmi opatrne:

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
        
        # Získať údaje používateľa
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtrovať citlivé polia, pokiaľ nie sú výslovne vyžadované A autorizované
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Skontrolovať úroveň autorizácie v kontexte požiadavky
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Vytvoriť kópiu, aby sa predišlo úpravám originálu
        redacted = user_data.copy()
        
        # Cenzurovať konkrétne citlivé polia
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Cenzurovať vnorené citlivé údaje
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Najlepšie testovacie postupy pre MCP nástroje

Komplexné testovanie zabezpečuje, že MCP nástroje fungujú správne, spracovávajú hraničné prípady a správne sa integrujú so zvyškom systému.

### Jednotkové testovanie

#### 1. Testujte každý nástroj izolovane

Vytvárajte zamerané testy pre funkčnosť každého nástroja:

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

#### 2. Testovanie validácie schémy

Testujte, že schémy sú platné a správne vynucujú obmedzenia:

```java
@Test
public void testSchemaValidation() {
    // Vytvoriť inštanciu nástroja
    SearchTool searchTool = new SearchTool();
    
    // Získať schému
    Object schema = searchTool.getSchema();
    
    // Prekonvertovať schému na JSON pre validáciu
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Overiť, či je schéma platným JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Otestovať platné parametre
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Otestovať chýbajúci povinný parameter
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Otestovať neplatný typ parametra
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Testy spracovania chýb

Vytvárajte špecifické testy pre chybové podmienky:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Usporiadať
    tool = ApiTool(timeout=0.1)  # Veľmi krátky časový limit
    
    # Simulovať požiadavku, ktorá vyprší časový limit
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Dlhšie ako časový limit
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Vykonať a overiť
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Overiť správu výnimky
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Usporiadať
    tool = ApiTool()
    
    # Simulovať odpoveď s obmedzením rýchlosti
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
        
        # Vykonať a overiť
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Overiť, že výnimka obsahuje informácie o obmedzení rýchlosti
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integračné testovanie

#### 1. Testovanie reťazca nástrojov

Testujte nástroje spolupracujúce v očakávaných kombináciách:

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

#### 2. Testovanie MCP servera

Testujte MCP server s kompletnou registráciou a vykonávaním nástrojov:

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
        // Otestujte endpoint objavovania
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Vytvoriť požiadavku na nástroj
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Odoslať požiadavku a overiť odpoveď
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Vytvoriť neplatnú požiadavku na nástroj
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Chýbajúci parameter "b"
        request.put("parameters", parameters);
        
        // Odoslať požiadavku a overiť chybovú odpoveď
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-end testovanie

Testujte kompletné pracovné postupy od výzvy modelu po vykonanie nástroja:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Usporiadať - Nastaviť MCP klienta a model mock
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Odozvy modelu mock
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
    
    # Odozva nástroja počasia mock
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
        
        # Akcia
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Overiť
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Výkonnostné testovanie

#### 1. Testovanie záťaže

Testujte, koľko súčasných požiadaviek dokáže váš MCP server zvládnuť:

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

#### 2. Stresové testovanie

Testujte systém pod extrémnou záťažou:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Nastavte JMeter na záťažové testovanie
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Nakonfigurujte testovací plán JMeter
    HashTree testPlanTree = new HashTree();
    
    // Vytvorte testovací plán, skupinu vlákien, vzorkovače atď.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Pridajte HTTP vzorkovač na vykonanie nástroja
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Pridajte poslucháčov
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Spustite test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Overte výsledky
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Priemerný čas odozvy < 200 ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. percentil < 500 ms
}
```

#### 3. Monitorovanie a profilovanie

Nastavte monitorovanie pre dlhodobú analýzu výkonu:

```python
# Konfigurácia monitoringu pre MCP server
def configure_monitoring(server):
    # Nastaviť metriky Prometheus
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
    
    # Pridať middleware pre meranie času a zaznamenávanie metrík
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Sprístupniť endpoint pre metriky
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Vzory návrhu pracovných postupov MCP

Dobre navrhnuté pracovné postupy MCP zlepšujú efektivitu, spoľahlivosť a udržiavateľnosť. Tu sú kľúčové vzory, ktoré treba dodržiavať:

### 1. Vzor reťazenia nástrojov

Prepojte viacero nástrojov v sekvencii, kde výstup jedného nástroja sa stáva vstupom pre ďalší:

```python
# Implementácia reťazca nástrojov v Pythone
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Zoznam názvov nástrojov na vykonanie v poradí
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Vykonajte každý nástroj v reťazci, odovzdávajúc predchádzajúci výsledok
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Uložte výsledok a použite ho ako vstup pre ďalší nástroj
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Príklad použitia
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

### 2. Vzor dispatcher

Použite centrálny nástroj, ktorý podľa vstupu smeruje k špecializovaným nástrojom:

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

### 3. Vzor paralelného spracovania

Súbežne vykonávajte viacero nástrojov pre efektivitu:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Krok 1: Získať metaúdaje datasetu (synchrónne)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Krok 2: Spustiť viacnásobné analýzy paralelne
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
        
        // Počkajte na dokončenie všetkých paralelných úloh
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Počkajte na dokončenie
        
        // Krok 3: Skombinovať výsledky
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Krok 4: Vygenerovať súhrnnú správu
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Vrátiť kompletný výsledok pracovného postupu
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Vzor obnovy po chybe

Implementujte elegantné náhradné riešenia pri zlyhaní nástrojov:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Najskôr vyskúšajte primárny nástroj
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Zaznamenajte zlyhanie
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Prepnúť na sekundárny nástroj
            try:
                # Môže byť potrebné transformovať parametre pre náhradný nástroj
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Obe nástroje zlyhali
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Táto implementácia by závisela od konkrétnych nástrojov
        # Pre tento príklad iba vrátime pôvodné parametre
        return params

# Príklad použitia
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Primárne (platené) API počasia
        "basicWeatherService",    # Náhradné (bezplatné) API počasia
        {"location": location}
    )
```

### 5. Vzor skladania pracovných postupov

Stavajte komplexné pracovné postupy skladajúc jednoduchšie:

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

# Testovanie MCP serverov: Najlepšie postupy a najdôležitejšie tipy

## Prehľad

Testovanie je kritický aspekt vývoja spoľahlivých, vysoko kvalitných MCP serverov. Tento sprievodca poskytuje komplexné najlepšie postupy a tipy pre testovanie vašich MCP serverov počas vývojového cyklu, od jednotkových testov až po integračné testy a end-to-end validáciu.

## Prečo je testovanie dôležité pre MCP servery

MCP servery slúžia ako kľúčové middleware medzi AI modelmi a klientskymi aplikáciami. Dôkladné testovanie zabezpečuje:

- Spoľahlivosť v produkčných prostrediach
- Presné spracovanie požiadaviek a odpovedí
- Správne implementovanie špecifikácií MCP
- Odolnosť voči zlyhaniam a hraničným prípadoch
- Konzistentný výkon pri rôznych záťažiach

## Jednotkové testovanie MCP serverov

### Jednotkové testovanie (základ)

Jednotkové testy overujú jednotlivé komponenty vášho MCP servera izolovane.

#### Čo testovať

1. **Spracovatelia zdrojov**: Testujte logiku každého spracovateľa zdrojov samostatne
2. **Implementácie nástrojov**: Overte správanie nástrojov pre rôzne vstupy
3. **Šablóny výziev**: Zaistite správne vykreslenie šablón výziev
4. **Validácia schémy**: Testujte logiku validácie parametrov
5. **Spracovanie chýb**: Overte odpovede chýb pre neplatné vstupy

#### Najlepšie postupy pre jednotkové testovanie

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
# Príklad jednotkového testu pre kalkulačnú pomôcku v Pythone
def test_calculator_tool_add():
    # Priprav
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Zakonaj
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Over
    assert result["value"] == 12
```

### Integračné testovanie (stredná vrstva)

Integračné testy overujú interakcie medzi komponentmi vášho MCP servera.

#### Čo testovať

1. **Inicializácia servera**: Testujte štart servera s rôznymi konfiguráciami
2. **Registrácia trás**: Overte, že všetky endpointy sú správne zaregistrované
3. **Spracovanie požiadaviek**: Testujte kompletný cyklus požiadavka-odpoveď
4. **Propagácia chýb**: Zaistite správne spracovanie chýb naprieč komponentmi
5. **Autentifikácia a autorizácia**: Testujte bezpečnostné mechanizmy

#### Najlepšie postupy pre integračné testovanie

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

### End-to-end testovanie (vrchná vrstva)

End-to-end testy overujú kompletné správanie systému od klienta po server.

#### Čo testovať

1. **Komunikácia klient-server**: Testujte kompletné cykly požiadavka-odpoveď
2. **Skutočné klientske SDK**: Testujte so skutočnými klientskymi implementáciami
3. **Výkon pri záťaži**: Overte správanie pri viacerých súbežných požiadavkách
4. **Obnova po chybe**: Testujte zotavenie systému po zlyhaniach
5. **Dlhodobé operácie**: Overte spracovanie streamovania a dlhých operácií

#### Najlepšie postupy pre E2E testovanie

```typescript
// Príklad E2E testu s klientom v TypeScripte
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Spustite server v testovacom prostredí
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Vykonať
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Overiť
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Stratégie mockovania pre testovanie MCP

Mockovanie je nevyhnutné na izolovanie komponentov počas testovania.

### Komponenty na mockovanie

1. **Externé AI modely**: Mockujte odpovede modelov pre predvídateľné testovanie
2. **Externé služby**: Mockujte API závislosti (databázy, služby tretích strán)
3. **Autentifikačné služby**: Mockujte poskytovateľov identity
4. **Poskytovatelia zdrojov**: Mockujte nákladné spracovatelia zdrojov

### Príklad: Mockovanie odpovede AI modelu

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
# Príklad v Pythone s unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Konfiguruj mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Použi mock v teste
    server = McpServer(model_client=mock_model)
    # Pokračuj v teste
```

## Výkonnostné testovanie

Výkonnostné testovanie je kľúčové pre produkčné MCP servery.

### Čo merať

1. **Latencia**: Čas odozvy pre požiadavky
2. **Priepustnosť**: Počet spracovaných požiadaviek za sekundu
3. **Využitie zdrojov**: CPU, pamäť, sieťové využitie
4. **Spracovanie súbežnosti**: Správanie pri paralelných požiadavkách
5. **Schopnosti škálovania**: Výkon pri zvyšovaní záťaže

### Nástroje pre výkonnostné testovanie

- **k6**: Open-source nástroj na testovanie záťaže
- **JMeter**: Komplexné výkonnostné testovanie
- **Locust**: Python založené testovanie záťaže
- **Azure Load Testing**: Cloudové výkonnostné testovanie

### Príklad: Základný load test pomocou k6

```javascript
// k6 skript pre záťažové testovanie MCP servera
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtuálnych používateľov
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

## Automatizácia testovania MCP serverov

Automatizácia testov zabezpečuje konzistentnú kvalitu a rýchle spätné väzby.

### Integrácia CI/CD

1. **Spúšťajte jednotkové testy pri pull requestoch**: Zaistite, že zmeny v kóde nepoškodia existujúcu funkcionalitu
2. **Integračné testy v stagingu**: Spúšťajte integračné testy v predprodukčných prostrediach  
3. **Výkonnostné referenčné hodnoty**: Udržiavajte výkonové benchmarky na zachytenie regresií  
4. **Bezpečnostné skeny**: Automatizujte bezpečnostné testovanie ako súčasť pipeline  

### Príklad CI pipeline (GitHub Actions)

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

## Testovanie zhody so špecifikáciou MCP

Overte, či váš server správne implementuje špecifikáciu MCP.

### Kľúčové oblasti zhody

1. **API koncové body**: Testujte požadované koncové body (/resources, /tools, atď.)  
2. **Formát požiadaviek/odpovedí**: Validujte súlad so schémou  
3. **Chybové kódy**: Overte správne stavové kódy pre rôzne scenáre  
4. **Typy obsahu**: Testujte spracovanie rôznych typov obsahu  
5. **Autentifikačný tok**: Overte autentifikačné mechanizmy v súlade so špecifikáciou  

### Testovací balík zhody

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

## Top 10 tipov pre efektívne testovanie MCP servera

1. **Testujte definície nástrojov samostatne**: Overte schémy nezávisle od logiky nástroja  
2. **Používajte parametrové testy**: Testujte nástroje s rôznymi vstupmi vrátane hraničných prípadov  
3. **Kontrolujte chybové odpovede**: Overte správne spracovanie chýb pre všetky potenciálne chyby  
4. **Testujte autorizačnú logiku**: Zaistite správnu kontrolu prístupu pre rôzne používateľské roly  
5. **Monitorujte pokrytie testami**: Usilujte sa o vysoké pokrytie kritických častí kódu  
6. **Testujte streamované odpovede**: Overte správne spracovanie streamovaného obsahu  
7. **Simulujte sieťové problémy**: Testujte správanie pri zlých sieťových podmienkach  
8. **Testujte limity zdrojov**: Overte správanie pri dosiahnutí kvót alebo limitov rýchlosti  
9. **Automatizujte regresné testy**: Vytvorte balík testov, ktorý sa spúšťa pri každej zmene kódu  
10. **Dokumentujte testovacie prípady**: Udržiavajte jasnú dokumentáciu testovacích scenárov  

## Bežné chyby pri testovaní

- **Prílišná závislosť na testovaní bezproblémových scenárov**: Dôkladne testujte aj chybové prípady  
- **Ignorovanie výkonového testovania**: Identifikujte úzke miesta skôr, než ovplyvnia produkciu  
- **Testovanie len izolovane**: Kombinujte unit, integračné a end-to-end testy  
- **Neúplné pokrytie API**: Zaistite testovanie všetkých koncových bodov a funkcií  
- **Nekonzistentné testovacie prostredia**: Používajte kontajnery na zabezpečenie konzistentnosti prostredí  

## Záver

Komplexná testovacia stratégia je nevyhnutná pre vývoj spoľahlivých, kvalitných MCP serverov. Implementovaním osvedčených postupov a tipov z tohto návodu môžete zabezpečiť, že vaše implementácie MCP budú spĺňať najvyššie štandardy kvality, spoľahlivosti a výkonu.  

## Kľúčové poznatky

1. **Dizajn nástrojov**: Dodržiavajte princíp jedinej zodpovednosti, používajte dependency injection a navrhujte pre skladajúcnosť  
2. **Dizajn schém**: Vytvárajte jasné, dobre zdokumentované schémy s vhodnými validačnými obmedzeniami  
3. **Spracovanie chýb**: Implementujte elegantné spracovanie chýb, štruktúrované chybové odpovede a retry logiku  
4. **Výkon**: Používajte caching, asynchrónne spracovanie a obmedzovanie zdrojov  
5. **Bezpečnosť**: Aplikujte dôkladnú validáciu vstupov, kontrolu autorizácie a spracovanie citlivých údajov  
6. **Testovanie**: Vytvárajte komplexné unit, integračné a end-to-end testy  
7. **Vzory pracovných tokov**: Aplikujte zaužívané vzory ako reťazce, dispatchery a paralelné spracovanie  

## Cvičenie

Navrhnite MCP nástroj a pracovný tok pre systém spracovania dokumentov, ktorý:

1. Prijíma dokumenty v rôznych formátoch (PDF, DOCX, TXT)  
2. Extrahuje text a kľúčové informácie z dokumentov  
3. Klasifikuje dokumenty podľa typu a obsahu  
4. Generuje zhrnutie každého dokumentu  

Implementujte schémy nástrojov, spracovanie chýb a vzor pracovného toku, ktorý najlepšie vyhovuje tomuto scenáru. Zvážte, ako by ste túto implementáciu testovali.  

## Zdroje

1. Pridajte sa ku komunite MCP na [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs), aby ste zostali informovaní o najnovších novinkách  
2. Prispievajte do open-source [MCP projektov](https://github.com/modelcontextprotocol)  
3. Aplikujte princípy MCP vo vlastných AI iniciatívach vašej organizácie  
4. Preskúmajte špecializované implementácie MCP pre váš priemysel  
5. Zvážte absolvovanie pokročilých kurzov o konkrétnych témach MCP, ako je multimodálna integrácia alebo integrácia podnikových aplikácií  
6. Experimentujte s tvorbou vlastných MCP nástrojov a pracovných tokov podľa princípov naučených v rámci [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Čo nasleduje

Ďalej: [Prípadové štúdie](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->