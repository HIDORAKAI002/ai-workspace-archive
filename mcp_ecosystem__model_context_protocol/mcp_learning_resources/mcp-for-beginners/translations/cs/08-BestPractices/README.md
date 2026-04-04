# Nejlepší postupy vývoje MCP

[![Nejlepší postupy vývoje MCP](../../../translated_images/cs/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Klikněte na obrázek výše pro zobrazení videa této lekce)_

## Přehled

Tato lekce se zaměřuje na pokročilé nejlepší postupy pro vývoj, testování a nasazení MCP serverů a funkcí v produkčních prostředích. Jak MCP ekosystémy rostou na složitosti a významu, dodržování zavedených vzorů zajišťuje spolehlivost, udržovatelnost a interoperabilitu. Tato lekce konsoliduje praktickou zkušenost získanou z reálných implementací MCP, která vás provede vytvářením robustních, efektivních serverů s účinnými zdroji, výzvami a nástroji.

## Výukové cíle

Na konci této lekce budete schopni:

- Uplatnit průmyslové nejlepší postupy při návrhu MCP serverů a funkcí
- Vytvořit komplexní testovací strategie pro MCP servery
- Navrhnout efektivní, znovupoužitelné vzory pracovních postupů pro složité MCP aplikace
- Implementovat správné zpracování chyb, protokolování a sledovatelnost v MCP serverech
- Optimalizovat implementace MCP pro výkon, zabezpečení a udržovatelnost

## Základní principy MCP

Než se pustíte do konkrétních implementačních praktik, je důležité pochopit základní principy, které vedou efektivní vývoj MCP:

1. **Standardizovaná komunikace**: MCP používá JSON-RPC 2.0 jako svůj základ, který poskytuje konzistentní formát pro požadavky, odpovědi a zpracování chyb ve všech implementacích.

2. **Návrh zaměřený na uživatele**: Vždy upřednostňujte souhlas uživatele, kontrolu a transparentnost ve svých implementacích MCP.

3. **Bezpečnost na prvním místě**: Implementujte robustní bezpečnostní opatření včetně autentizace, autorizace, validace a omezení rychlosti.

4. **Modulární architektura**: Navrhujte své MCP servery modulárně, kde každý nástroj a zdroj má jasný a zaměřený účel.

5. **Stavové připojení**: Využívejte schopnost MCP udržovat stav přes více požadavků pro koherentnější a kontextově uvědomělé interakce.

## Oficiální nejlepší postupy MCP

Následující nejlepší postupy jsou odvozeny z oficiální dokumentace Model Context Protocol:

### Nejlepší bezpečnostní postupy

1. **Souhlas a kontrola uživatele**: Vždy vyžadujte explicitní souhlas uživatele před přístupem k datům nebo prováděním operací. Poskytněte jasnou kontrolu nad tím, jaká data jsou sdílena a jaké akce jsou autorizovány.

2. **Ochrana soukromí dat**: Sdílejte uživatelská data pouze s explicitním souhlasem a chraňte je odpovídajícími přístupovými kontrolami. Zabraňte neoprávněnému přenosu dat.

3. **Bezpečnost nástrojů**: Vyžadujte explicitní souhlas uživatele před vyvoláním jakéhokoli nástroje. Zajistěte, aby uživatelé rozuměli funkčnosti jednotlivých nástrojů a vynucujte robustní bezpečnostní hranice.

4. **Řízení oprávnění nástrojů**: Konfigurujte, které nástroje může model během relace používat, aby byly přístupné pouze explicitně autorizované nástroje.

5. **Autentizace**: Vyžadujte řádnou autentizaci před udělením přístupu k nástrojům, zdrojům nebo citlivým operacím za použití API klíčů, OAuth tokenů nebo jiných bezpečných metod autentizace.

6. **Validace parametrů**: Vynucujte validaci všech vyvolání nástrojů, aby se zabránilo přijetí nesprávných nebo škodlivých vstupů do implementací nástrojů.

7. **Omezení rychlosti**: Implementujte omezení rychlosti, aby se zabránilo zneužití a zajistilo spravedlivé používání zdrojů serveru.

### Nejlepší implementační postupy

1. **Vyjednávání schopností**: Při navazování spojení vyměňujte informace o podporovaných funkcích, verzích protokolu, dostupných nástrojích a zdrojích.

2. **Návrh nástrojů**: Vytvářejte zaměřené nástroje, které dělají jednu věc dobře, místo monolitických nástrojů, které řeší více problémů.

3. **Zpracování chyb**: Implementujte standardizované chybové zprávy a kódy, pomáhající diagnostikovat problémy, elegantně zvládat selhání a poskytovat akční zpětnou vazbu.

4. **Protokolování**: Konfigurujte strukturované záznamy pro auditování, ladění a monitorování interakcí protokolu.

5. **Sledování průběhu**: U dlouhotrvajících operací hlaste aktualizace průběhu pro umožnění responzivních uživatelských rozhraní.

6. **Zrušení požadavků**: Umožněte klientům zrušit probíhající požadavky, které již nejsou potřeba nebo trvají příliš dlouho.

## Další odkazy

Pro nejaktuálnější informace o nejlepších postupech MCP se podívejte na:

- [Dokumentace MCP](https://modelcontextprotocol.io/)
- [Specifikace MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitář](https://github.com/modelcontextprotocol)
- [Nejlepší bezpečnostní postupy](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Bezpečnostní rizika a opatření
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktický bezpečnostní trénink

## Praktické příklady implementace

### Nejlepší postupy při návrhu nástrojů

#### 1. Princip jediné odpovědnosti

Každý nástroj MCP by měl mít jasný, zaměřený účel. Místo vytváření monolitických nástrojů, které pokouší řešit více záležitostí, vyvíjejte specializované nástroje, které excelují v konkrétních úlohách.

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

#### 2. Konzistentní zpracování chyb

Implementujte robustní zpracování chyb s informativními chybovými zprávami a vhodnými mechanismy obnovy.

```python
# Příklad v Pythonu s komplexním zpracováním chyb
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Validace parametrů
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Bezpečnostní validace
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operace s databází s časovým omezením
                async with timeout(10):  # Časový limit 10 sekund
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Chyby připojení mohou být přechodné
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Chyby dotazu jsou pravděpodobně chyby klienta
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Nechat průchod chybám specifickým pro nástroj
            raise
        except Exception as e:
            # Záchyt všech neočekávaných chyb
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementace detekce SQL injekce
        pass
        
    def _log_error(self, message, error):
        # Implementace zaznamenávání chyb
        pass
```

#### 3. Validace parametrů

Vždy pečlivě validujte parametry, abyste zabránili nesprávnému nebo škodlivému vstupu.

```javascript
// Příklad JavaScript/TypeScript s podrobnou validací parametrů
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
    // 1. Validace přítomnosti parametru
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Validace typů parametrů
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Validace hodnot parametrů
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Validace přítomnosti obsahu pro operaci zápisu
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Validace bezpečnosti cesty
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementace založená na validovaných parametrech
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementace kontroly bezpečnosti cesty
    // ...
  }
}
```

### Příklady implementace zabezpečení

#### 1. Autentizace a autorizace

```java
// Příklad v Javě s autentizací a autorizací
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Vstřikování závislostí
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
        // 1. Extrahujte kontext autentizace
        String authToken = request.getContext().getAuthToken();
        
        // 2. Ověřte uživatele
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Zkontrolujte autorizaci pro konkrétní operaci
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Pokračujte s autorizovanou operací
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

#### 2. Omezení rychlosti

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

## Nejlepší postupy testování

### 1. Jednotkové testování nástrojů MCP

Vždy testujte své nástroje izolovaně, pomocí mockování externích závislostí:

```typescript
// Příklad jednotkového testu nástroje v TypeScriptu
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Vytvořit simulovanou službu počasí
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Vytvořit nástroj s falešnou závislostí
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Uspořádat
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Akce
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Ověřit
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Uspořádat
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Akce a ověření
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integrační testování

Testujte kompletní tok od požadavků klienta po odpovědi serveru:

```python
# Příklad integračního testu v Pythonu
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Spusťte testovací server
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Vytvořte klienta
        client = McpClient("http://localhost:5000")
        
        # Otestujte nalezení nástroje
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Otestujte spuštění nástroje
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Ověřte odpověď
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Vyčistěte prostředí
        await server.stop()
```

## Optimalizace výkonu

### 1. Strategie cachování

Implementujte vhodné cachování ke snížení latence a využití zdrojů:

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

#### 2. Injektáž závislostí a testovatelnost

Navrhujte nástroje tak, aby přijímaly své závislosti přes konstruktorovou injektáž, což je činí testovatelnými a konfigurovatelnými:

```java
// Příklad v Javě s injektáží závislostí
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Závislosti injektovány přes konstruktor
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implementace nástroje
    // ...
}
```

#### 3. Kompozitní nástroje

Navrhujte nástroje, které lze skládat dohromady pro vytvoření složitějších pracovních postupů:

```python
# Příklad v Pythonu ukazující složitelné nástroje
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementace...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Tento nástroj může využívat výsledky nástroje dataFetch
    async def execute_async(self, request):
        # Implementace...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Tento nástroj může využívat výsledky nástroje dataAnalysis
    async def execute_async(self, request):
        # Implementace...
        pass

# Tyto nástroje lze používat samostatně nebo jako součást pracovního postupu
```

### Nejlepší postupy návrhu schématu

Schéma je smlouva mezi modelem a vaším nástrojem. Dobře navržená schémata vedou k lepší použitelnosti nástrojů.

#### 1. Jasné popisy parametrů

Vždy zahrnujte popisné informace u každého parametru:

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

#### 2. Omezující validace

Zahrnujte validační omezení, aby se zabránilo neplatným vstupům:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Vlastnost emailu s validací formátu
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Vlastnost věku s číselnými omezeními
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Vlastnost s výčtovým typem
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

#### 3. Konzistentní návratové struktury

Udržujte konzistenci ve struktuře odpovědí, aby modely snadněji interpretovaly výsledky:

```python
async def execute_async(self, request):
    try:
        # Zpracovat požadavek
        results = await self._search_database(request.parameters["query"])
        
        # Vždy vrátit konzistentní strukturu
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

### Zpracování chyb

Robustní zpracování chyb je zásadní pro zachování spolehlivosti nástrojů MCP.

#### 1. Elegantní zpracování chyb

Zpracovávejte chyby na vhodných úrovních a poskytněte informativní zprávy:

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

#### 2. Strukturované chybové odpovědi

Pokud možno, vracejte strukturované chybové informace:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementace
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
        
        // Přehodit ostatní výjimky jako ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Logika opakování

Implementujte vhodnou logiku opakování u přechodných selhání:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekundy
    
    while retry_count < max_retries:
        try:
            # Zavolat externí API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Exponenciální čekání
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Netřetvaná chyba, nepokračovat v pokusu
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Optimalizace výkonu

#### 1. Cachování

Implementujte cachování u nákladných operací:

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

#### 2. Asynchronní zpracování

Používejte asynchronní programovací vzory pro I/O operace:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Pro dlouhotrvající operace okamžitě vraťte ID zpracování
        String processId = UUID.randomUUID().toString();
        
        // Spusťte asynchronní zpracování
        CompletableFuture.runAsync(() -> {
            try {
                // Proveďte dlouhotrvající operaci
                documentService.processDocument(documentId);
                
                // Aktualizujte stav (obvykle by byl uložen v databázi)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Vraťte okamžitou odpověď s ID procesu
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Nástroj pro kontrolu stavu partnera
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

#### 3. Řízení zdrojů

Implementujte řízení zdrojů, aby se zabránilo přetížení:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Povolit 5 požadavků za sekundu
            bucket_size=10        # Povolit nárazy až 10 požadavků
        )
    
    async def execute_async(self, request):
        # Zkontrolovat, zda můžeme pokračovat nebo je třeba čekat
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Pokud je čekání příliš dlouhé
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Čekat po příslušnou dobu zpoždění
                await asyncio.sleep(delay)
        
        # Spotřebovat token a pokračovat s požadavkem
        self.rate_limiter.consume()
        
        # Zavolat API
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
            
            # Vypočítat čas do dostupnosti dalšího tokenu
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Přidat nové tokeny na základě uplynulého času
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Nejlepší bezpečnostní postupy

#### 1. Validace vstupu

Vždy důkladně validujte vstupní parametry:

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

#### 2. Kontroly autorizace

Implementujte správné kontroly autorizace:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Získat uživatelský kontext z požadavku
    UserContext user = request.getContext().getUserContext();
    
    // Zkontrolovat, zda má uživatel požadovaná oprávnění
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Pro specifické zdroje zkontrolovat přístup k tomuto zdroji
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Pokračovat ve vykonávání nástroje
    // ...
}
```

#### 3. Práce s citlivými daty

S citlivými daty nakládejte opatrně:

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
        
        # Získat uživatelská data
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtrovat citlivá pole pokud nejsou výslovně požadována A autorizována
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Zkontrolovat úroveň autorizace v kontextu požadavku
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Vytvořit kopii, aby nedošlo k úpravě originálu
        redacted = user_data.copy()
        
        # Cenzurovat specifická citlivá pole
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Cenzurovat vnořená citlivá data
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Nejlepší postupy testování nástrojů MCP

Komplexní testování zajišťuje, že nástroje MCP fungují správně, zvládají okrajové případy a správně se integrují se zbytkem systému.

### Jednotkové testování

#### 1. Testujte každý nástroj izolovaně

Vytvářejte zaměřené testy na funkčnost každého nástroje:

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

#### 2. Testování validace schématu

Testujte, že schémata jsou platná a správně vynucují omezení:

```java
@Test
public void testSchemaValidation() {
    // Vytvořit instanci nástroje
    SearchTool searchTool = new SearchTool();
    
    // Získat schéma
    Object schema = searchTool.getSchema();
    
    // Převést schéma do JSON pro validaci
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Ověřit, že schéma je platný JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Otestovat platné parametry
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Otestovat chybějící povinný parametr
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Otestovat neplatný typ parametru
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Testy zpracování chyb

Vytvářejte specifické testy pro chybové stavy:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Uspořádat
    tool = ApiTool(timeout=0.1)  # Velmi krátký timeout
    
    # Mockovat požadavek, který vyprší časový limit
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Delší než timeout
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Proveď a ověř
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Ověřit zprávu výjimky
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Uspořádat
    tool = ApiTool()
    
    # Mockovat odpověď s omezením rychlosti
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
        
        # Proveď a ověř
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Ověřit, že výjimka obsahuje informace o omezení rychlosti
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integrační testování

#### 1. Testování řetězce nástrojů

Testujte spolupráci nástrojů v očekávaných kombinacích:

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

#### 2. Testování MCP serveru

Testujte MCP server s plnou registrací a prováděním nástrojů:

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
        // Otestujte koncový bod pro zjišťování
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Vytvořte požadavek nástroje
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Odešlete požadavek a ověřte odpověď
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Vytvořte neplatný požadavek nástroje
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Chybějící parametr "b"
        request.put("parameters", parameters);
        
        // Odešlete požadavek a ověřte chybovou odpověď
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-End testování

Testujte kompletní pracovní toky od výzvy modelu po vykonání nástrojů:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Uspořádat - Nastavit MCP klienta a simulovat model
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Simulovat odpovědi modelu
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
    
    # Simulovat odpověď nástroje počasí
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
        
        # Jednat
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Ověřit
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Výkonové testování

#### 1. Zátěžové testování

Testujte, kolik současných požadavků váš MCP server zvládne:

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

#### 2. Stresové testování

Testujte systém pod extrémní zátěží:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Nastavte JMeter pro stresové testování
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Nakonfigurujte testovací plán JMeteru
    HashTree testPlanTree = new HashTree();
    
    // Vytvořte testovací plán, skupinu vláken, vzorkovače atd.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Přidejte HTTP vzorkovač pro spuštění nástroje
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Přidejte posluchače
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Spusťte test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Ověřte výsledky
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Průměrná doba odezvy < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. percentil < 500ms
}
```

#### 3. Monitorování a profilování

Nastavte monitorování pro dlouhodobou analýzu výkonu:

```python
# Nakonfigurujte monitorování pro server MCP
def configure_monitoring(server):
    # Nastavte metriky Prometheus
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
    
    # Přidejte middleware pro měření času a zaznamenávání metrik
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Zveřejněte endpoint metrik
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Vzory návrhu pracovních postupů MCP

Dobře navržené MCP pracovní postupy zlepšují efektivitu, spolehlivost a udržovatelnost. Zde jsou klíčové vzory k dodržení:

### 1. Vzorec řetězení nástrojů

Propojte více nástrojů v sekvenci, kde výstup jednoho nástroje se stává vstupem pro další:

```python
# Implementace řetězce nástrojů v Pythonu
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Seznam názvů nástrojů k provedení za sebou
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Proveďte každý nástroj v řetězci, předávající předchozí výsledek
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Uložte výsledek a použijte ho jako vstup pro další nástroj
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Příklad použití
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

### 2. Vzorec dispečera

Použijte centrální nástroj, který podle vstupu směruje na specializované nástroje:

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

### 3. Vzorec paralelního zpracování

Provádějte více nástrojů současně pro efektivitu:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Krok 1: Získat metadata datového souboru (synchronně)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Krok 2: Spustit více analýz paralelně
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
        
        // Počkat na dokončení všech paralelních úkolů
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Počkat na dokončení
        
        // Krok 3: Sloučit výsledky
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Krok 4: Vygenerovat souhrnnou zprávu
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Vrátit konečný výsledek pracovního postupu
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Vzorec obnovení po chybě

Implementujte elegantní záložní scénáře při selhání nástrojů:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Nejprve vyzkoušejte primární nástroj
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Zaznamenejte selhání
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Přepněte na sekundární nástroj
            try:
                # Možná bude potřeba transformovat parametry pro záložní nástroj
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Oba nástroje selhaly
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Tato implementace by závisela na konkrétních nástrojích
        # Pro tento příklad pouze vrátíme původní parametry
        return params

# Ukázka použití
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Primární (placené) API počasí
        "basicWeatherService",    # Záložní (zdarma) API počasí
        {"location": location}
    )
```

### 5. Vzorec skládání pracovních postupů

Budujte složité pracovní postupy skládáním jednodušších:

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

# Testování MCP serverů: Nejlepší postupy a hlavní tipy

## Přehled

Testování je klíčovým aspektem vývoje spolehlivých, kvalitních MCP serverů. Tento průvodce poskytuje komplexní nejlepší postupy a tipy pro testování vašich MCP serverů během celého vývojového cyklu, od jednotkových testů přes integrační testy až po end-to-end ověřování.

## Proč je testování důležité pro MCP servery

MCP servery slouží jako klíčový middleware mezi AI modely a klientskými aplikacemi. Důkladné testování zajišťuje:

- Spolehlivost v produkčních prostředích
- Přesné zpracování požadavků a odpovědí
- Správnou implementaci specifikací MCP
- Odolnost vůči selháním a okrajovým případům
- Konzistentní výkon za různých zátěží

## Jednotkové testování MCP serverů

### Jednotkové testování (základ)

Jednotkové testy ověřují jednotlivé komponenty vašeho MCP serveru izolovaně.

#### Co testovat

1. **Obsluha zdrojů**: Testujte logiku každého handleru zdrojů samostatně
2. **Implementace nástrojů**: Ověřte chování nástrojů s různými vstupy
3. **Šablony výzev**: Zajistěte správné zpracování šablon výzev
4. **Validace schématu**: Testujte logiku validace parametrů
5. **Zpracování chyb**: Ověřte chybové odpovědi na neplatné vstupy

#### Nejlepší postupy pro jednotkové testování

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
# Příklad jednotkového testu pro kalkulační nástroj v Pythonu
def test_calculator_tool_add():
    # Připravit
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Provést
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Ověřit
    assert result["value"] == 12
```

### Integrační testování (střední vrstva)

Integrační testy ověřují interakce mezi komponentami vašeho MCP serveru.

#### Co testovat

1. **Inicializace serveru**: Testujte spuštění serveru s různými konfiguracemi
2. **Registrace tras**: Ověřte, že všechny endpointy jsou správně registrované
3. **Zpracování požadavků**: Testujte kompletní cyklus požadavek-odpověď
4. **Propagace chyb**: Zajistěte správné zpracování chyb napříč komponentami
5. **Autentizace a autorizace**: Testujte bezpečnostní mechanismy

#### Nejlepší postupy pro integrační testování

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

### End-to-End testování (vrchní vrstva)

End-to-end testy ověřují chování celého systému od klienta po server.

#### Co testovat

1. **Komunikace klient-server**: Testujte kompletní cykly požadavků a odpovědí
2. **Reálné klientské SDK**: Testujte s opravdovými implementacemi klientů
3. **Výkon při zátěži**: Ověřte chování při více současných požadavcích
4. **Obnova po chybě**: Testujte zotavení systému po selháních
5. **Dlouhotrvající operace**: Ověřte zpracování streamování a dlouhých operací

#### Nejlepší postupy pro E2E testování

```typescript
// Příklad E2E testu s klientem v TypeScriptu
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Spuštění serveru v testovacím prostředí
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Akce
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Ověření
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Strategie mockování pro testování MCP

Mockování je nezbytné pro izolaci komponent během testování.

### Komponenty k mockování

1. **Externí AI modely**: Mockujte odpovědi modelů pro předvídatelné testování
2. **Externí služby**: Mockujte API závislosti (databáze, služby třetích stran)
3. **Autentizační služby**: Mockujte identity providery
4. **Poskytovatelé zdrojů**: Mockujte nákladné handlers zdrojů

### Příklad: Mockování odpovědi AI modelu

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
# Příklad Pythonu s unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Nastavit mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Použijte mock v testu
    server = McpServer(model_client=mock_model)
    # Pokračovat s testem
```

## Výkonové testování

Výkonové testování je klíčové pro produkční MCP servery.

### Co měřit

1. **Latence**: Čas odezvy na požadavky
2. **Propustnost**: Počet zpracovaných požadavků za sekundu
3. **Využití zdrojů**: Využití CPU, paměti, síťového připojení
4. **Zpracování paralelních požadavků**: Chování při paralelních požadavcích
5. **Schopnost škálování**: Výkon při zvyšující se zátěži

### Nástroje pro výkonové testování

- **k6**: Open-source nástroj pro zátěžové testování
- **JMeter**: Komplexní testování výkonu
- **Locust**: Python-based nástroj pro zátěžové testování
- **Azure Load Testing**: Cloudové výkonové testování

### Příklad: Základní zátěžový test s k6

```javascript
// k6 skript pro zátěžové testování serveru MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtuálních uživatelů
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

## Automatizace testů pro MCP servery

Automatizace testů zajišťuje konzistentní kvalitu a rychlejší zpětnou vazbu.

### Integrace CI/CD
1. **Spuštění jednotkových testů na pull requestech**: Zajistěte, aby změny kódu neporušily stávající funkčnost  
2. **Integrační testy ve stagingu**: Spouštějte integrační testy v předprodukčních prostředích  
3. **Výkonnostní základny**: Udržujte výkonnostní benchmarky pro zachycení regresí  
4. **Bezpečnostní skeny**: Automatizujte bezpečnostní testování jako součást pipeline  

### Ukázkový CI pipeline (GitHub Actions)  

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
  
## Testování shody se specifikací MCP  

Ověřte, že váš server správně implementuje specifikaci MCP.  

### Klíčové oblasti shody  

1. **API koncové body**: Testujte požadované koncové body (/resources, /tools, atd.)  
2. **Formát požadavků/odpovědí**: Validujte shodu se schématem  
3. **Chybové kódy**: Ověřte správné status kódy pro různé scénáře  
4. **Typy obsahu**: Testujte zpracování různých typů obsahu  
5. **Autentizační tok**: Ověřte autentizační mechanismy podle specifikace  

### Testovací sada pro shodu  

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
  
## Top 10 tipů pro efektivní testování MCP serveru  

1. **Testujte definice nástrojů samostatně**: Ověřte definice schémat nezávisle na logice nástrojů  
2. **Používejte parametrizované testy**: Testujte nástroje s různými vstupy, včetně okrajových případů  
3. **Kontrolujte chybové odpovědi**: Ověřte správnou obsluhu chyb ve všech možných situacích  
4. **Testujte logiku autorizace**: Zajistěte správnou kontrolu přístupu pro různé uživatelské role  
5. **Sledujte pokrytí testy**: Usilujte o vysoké pokrytí kritických částí kódu  
6. **Testujte streamované odpovědi**: Ověřte správné zpracování streamovaného obsahu  
7. **Simulujte síťové problémy**: Testujte chování při špatných síťových podmínkách  
8. **Testujte limity zdrojů**: Ověřte chování při dosažení kvót nebo limitů rychlosti  
9. **Automatizujte regresní testy**: Vytvořte sadu, která se spouští při každé změně kódu  
10. **Dokumentujte testovací případy**: Udržujte jasnou dokumentaci testovacích scénářů  

## Běžné chyby při testování  

- **Přílišné spoléhání na testování správné cesty**: Pečlivě testujte i chybové případy  
- **Ignorování testování výkonu**: Identifikujte úzká místa dříve, než ovlivní produkci  
- **Testování pouze izolovaně**: Kombinujte jednotkové, integrační a koncové (E2E) testy  
- **Neúplné pokrytí API**: Zajistěte testování všech koncových bodů a funkcí  
- **Nekonzistentní testovací prostředí**: Používejte kontejnery pro konzistentní prostředí  

## Závěr  

Komplexní testovací strategie je nezbytná pro vývoj spolehlivých a kvalitních MCP serverů. Implementací osvědčených postupů a tipů popsaných v této příručce můžete zajistit, že vaše MCP implementace splní nejvyšší standardy kvality, spolehlivosti a výkonu.  

## Klíčové poznatky  

1. **Návrh nástrojů**: Dodržujte princip jediné odpovědnosti, používejte dependency injection a navrhujte pro skladebnost  
2. **Návrh schémat**: Vytvářejte jasná, dobře dokumentovaná schémata se správnými validačními omezeními  
3. **Zpracování chyb**: Implementujte elegantní zpracování chyb, strukturované chybové odpovědi a logiku opakování  
4. **Výkon**: Využívejte cache, asynchronní zpracování a omezení zdrojů  
5. **Bezpečnost**: Aplikujte důkladné ověřování vstupu, kontroly autorizace a zacházení s citlivými daty  
6. **Testování**: Vytvářejte komplexní jednotkové, integrační a end-to-end testy  
7. **Vzorové pracovní postupy**: Aplikujte zavedené vzory jako řetězce, dispečery a paralelní zpracování  

## Cvičení  

Navrhněte MCP nástroj a workflow pro systém zpracování dokumentů, který:  

1. Přijímá dokumenty ve více formátech (PDF, DOCX, TXT)  
2. Extrahuje text a klíčové informace z dokumentů  
3. Klasifikuje dokumenty podle typu a obsahu  
4. Generuje shrnutí každého dokumentu  

Implementujte schémata nástroje, zpracování chyb a workflow vzor, který nejlépe vyhovuje tomuto scénáři. Zvažte, jak byste tuto implementaci testovali.  

## Zdroje  

1. Připojte se ke komunitě MCP na [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) a buďte informováni o nejnovějším vývoji  
2. Přispívejte do open-source [MCP projektů](https://github.com/modelcontextprotocol)  
3. Aplikujte principy MCP ve vlastních AI iniciativách vaší organizace  
4. Prozkoumejte specializované MCP implementace pro váš průmysl  
5. Zvažte absolvování pokročilých kurzů na konkrétní témata MCP, jako je multimodální integrace nebo integrace podnikových aplikací  
6. Experimentujte s tvorbou vlastních MCP nástrojů a workflow podle principů naučených v [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Co bude dál  

Další: [Případové studie](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:
Tento dokument byl přeložen pomocí služby automatického překladu [Co-op Translator](https://github.com/Azure/co-op-translator). I když usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho rodném jazyce by měl být považován za autoritativní zdroj. Pro důležité informace doporučujeme profesionální lidský překlad. Nejsme odpovědní za jakékoliv nedorozumění nebo mylné výklady vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->