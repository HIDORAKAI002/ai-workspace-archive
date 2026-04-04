# Najbolje prakse razvoja MCP-a

[![Najbolje prakse razvoja MCP-a](../../../translated_images/hr/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Kliknite na sliku gore za pregled videa ove lekcije)_

## Pregled

Ova lekcija fokusira se na napredne najbolje prakse za razvoj, testiranje i implementaciju MCP servera i značajki u produkcijskim okruženjima. Kako MCP ekosustavi rastu u složenosti i važnosti, pridržavanje utvrđenih obrazaca osigurava pouzdanost, održivost i interoperabilnost. Ova lekcija konsolidira praktičnu mudrost stečenu iz stvarnih implementacija MCP-a kako bi vas vodila u kreiranju robusnih, učinkovitih servera s učinkovitim resursima, promptovima i alatima.

## Ciljevi učenja

Do kraja ove lekcije bit ćete u stanju:

- Primijeniti industrijske najbolje prakse u dizajnu MCP servera i značajki
- Kreirati sveobuhvatne strategije testiranja za MCP servere
- Dizajnirati učinkovite, višekratno upotrebljive obrasce tijeka rada za složene MCP aplikacije
- Implementirati ispravno rukovanje pogreškama, zapisivanje i promatranje u MCP serverima
- Optimizirati MCP implementacije za performanse, sigurnost i održivost

## Temeljna načela MCP-a

Prije nego što zaronimo u specifične prakse implementacije, važno je razumjeti temeljna načela koja vode učinkoviti razvoj MCP-a:

1. **Standardizirana komunikacija**: MCP koristi JSON-RPC 2.0 kao temelj, pružajući dosljedan format za zahtjeve, odgovore i rukovanje pogreškama kroz sve implementacije.

2. **Dizajn usmjeren na korisnika**: Uvijek stavite na prvo mjesto pristanak, kontrolu i transparentnost korisnika u vašim MCP implementacijama.

3. **Sigurnost na prvom mjestu**: Implementirajte robusne sigurnosne mjere uključujući autentifikaciju, autorizaciju, validaciju i ograničavanje stope.

4. **Modularna arhitektura**: Dizajnirajte svoje MCP servere modularno, gdje svaki alat i resurs ima jasno, fokusirano značenje.

5. **Stanje veza**: Iskoristite sposobnost MCP-a da održava stanje kroz više zahtjeva za koherentnije i kontekstualno osviještene interakcije.

## Službene najbolje prakse MCP-a

Sljedeće najbolje prakse izvedene su iz službene dokumentacije Model Context Protocola:

### Najbolje sigurnosne prakse

1. **Pristanak i kontrola korisnika**: Uvijek zahtijevajte izričiti pristanak korisnika prije pristupa podacima ili obavljanja operacija. Omogućite jasnu kontrolu nad podacima koji se dijele i koje su radnje ovlaštene.

2. **Privatnost podataka**: Izložite korisničke podatke samo uz izričiti pristanak i zaštitite ih odgovarajućim kontrolama pristupa. Štitite od neovlaštenog prijenosa podataka.

3. **Sigurnost alata**: Zahtijevajte izričiti pristanak korisnika prije pozivanja bilo kojeg alata. Osigurajte da korisnici razumiju funkcionalnost svakog alata i nametnite robusne sigurnosne granice.

4. **Kontrola dozvola alata**: Konfigurirajte koji alati model može koristiti tijekom sesije, osiguravajući da su dostupni samo izričito ovlašteni alati.

5. **Autentifikacija**: Zahtijevajte ispravnu autentifikaciju prije dopuštanja pristupa alatima, resursima ili osjetljivim operacijama koristeći API ključeve, OAuth tokene ili druge sigurne metode autentifikacije.

6. **Validacija parametara**: Provodite validaciju za sva pozivanja alata kako biste spriječili da pogrešno ili zlonamjerno uneseni podaci dođu do implementacija alata.

7. **Ograničenje stope**: Implementirajte ograničenje stope kako biste spriječili zloupotrebu i osigurali poštenu upotrebu serverskih resursa.

### Najbolje prakse implementacije

1. **Pregovaranje o mogućnostima**: Tokom uspostavljanja veze, razmjenjujte informacije o podržanim značajkama, verzijama protokola, dostupnim alatima i resursima.

2. **Dizajn alata**: Kreirajte fokusirane alate koji rade jednu stvar dobro, umjesto monolitnih alata koji rješavaju više pitanja.

3. **Rukovanje pogreškama**: Implementirajte standardizirane poruke o pogreškama i kodove kako biste pomogli u dijagnostici problema, elegantno rukovali kvarovima i pružili korisne povratne informacije.

4. **Zapisivanje**: Konfigurirajte strukturirane zapise za reviziju, otklanjanje pogrešaka i nadgledanje interakcija protokola.

5. **Praćenje napretka**: Za dugotrajne operacije, izvještavajte o napretku kako biste omogućili responzivne korisničke sučelja.

6. **Otkazivanje zahtjeva**: Dopustite klijentima otkazivanje zahtjeva u letu koji više nisu potrebni ili traju predugo.

## Dodatne reference

Za najsvježije informacije o najboljim praksama MCP-a pogledajte:

- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitorij](https://github.com/modelcontextprotocol)
- [Sigurnosne najbolje prakse](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sigurnosni rizici i ublažavanja
- [MCP Security Summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična sigurnosna obuka

## Primjeri praktične implementacije

### Najbolje prakse dizajna alata

#### 1. Način jedne odgovornosti

Svaki MCP alat treba imati jasno, fokusirano značenje. Umjesto da stvarate monolitne alate koji pokušavaju rješavati više problema, razvijajte specijalizirane alate koji su izvrsni u određenim zadacima.

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

#### 2. Dosljedno rukovanje pogreškama

Implementirajte robusno rukovanje pogreškama s informativnim porukama o pogreškama i odgovarajućim mehanizmima oporavka.

```python
# Primjer u Pythonu s sveobuhvatnim upravljanjem pogreškama
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Validacija parametara
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Sigurnosna validacija
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operacija baze podataka s vremenom isteka
                async with timeout(10):  # Timeout od 10 sekundi
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Greške veze mogu biti privremene
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Greške upita su vjerojatno korisničke pogreške
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Dopusti da specifične greške alata prođu
            raise
        except Exception as e:
            # Opći zahvat za neočekivane greške
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementacija detekcije SQL injekcija
        pass
        
    def _log_error(self, message, error):
        # Implementacija zapisivanja pogrešaka
        pass
```

#### 3. Validacija parametara

Uvijek temeljito validirajte parametre kako biste spriječili pogrešan ili zlonamjeran unos.

```javascript
// JavaScript/TypeScript primjer s detaljnom provjerom parametara
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
    // 1. Provjeri prisutnost parametra
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Provjeri tipove parametara
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Provjeri vrijednosti parametara
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Provjeri prisutnost sadržaja za operaciju pisanja
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Provjera sigurnosti puta
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementacija temeljena na provjerenim parametrima
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementacija provjere sigurnosti puta
    // ...
  }
}
```

### Primjeri implementacije sigurnosti

#### 1. Autentifikacija i autorizacija

```java
// Java primjer s autentifikacijom i autorizacijom
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Injektiranje ovisnosti
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
        // 1. Izdvoji kontekst autentifikacije
        String authToken = request.getContext().getAuthToken();
        
        // 2. Autentificiraj korisnika
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Provjeri autorizaciju za specifičnu operaciju
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Nastavi s autoriziranom operacijom
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

#### 2. Ograničenje stope

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

## Najbolje prakse za testiranje

### 1. Jedinično testiranje MCP alata

Uvijek testirajte svoje alate izolirano, koristeći mockiranje vanjskih ovisnosti:

```typescript
// Primjer jedinicnog testa alata u TypeScriptu
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Kreiraj lažnu uslugu vremenske prognoze
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Kreiraj alat s lažnom ovisnošću
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Pripremi
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Izvrši
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Provjeri
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Pripremi
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Izvrši i provjeri
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integracijsko testiranje

Testirajte cijeli tijek od zahtjeva klijenta do odgovora servera:

```python
# Primjer integracijskog testa u Pythonu
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Pokreni testni poslužitelj
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Kreiraj klijenta
        client = McpClient("http://localhost:5000")
        
        # Testiraj otkrivanje alata
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Testiraj izvršavanje alata
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Provjeri odgovor
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Očisti nakon testa
        await server.stop()
```

## Optimizacija performansi

### 1. Strategije predmemoriranja

Implementirajte odgovarajuće predmemoriranje za smanjenje latencije i upotrebe resursa:

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

#### 2. Injektiranje ovisnosti i testabilnost

Dizajnirajte alate da primaju svoje ovisnosti putem konstruktor injekcije, što ih čini testabilnim i konfigurabilnim:

```java
// Java primjer s injekcijom ovisnosti
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Ovisnosti umetnute kroz konstruktor
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implementacija alata
    // ...
}
```

#### 3. Složivi alati

Dizajnirajte alate koji se mogu složiti zajedno za kreiranje složenijih tijekova rada:

```python
# Python primjer koji pokazuje alate koji se mogu sastavljati
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementacija...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Ovaj alat može koristiti rezultate alata dataFetch
    async def execute_async(self, request):
        # Implementacija...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Ovaj alat može koristiti rezultate alata dataAnalysis
    async def execute_async(self, request):
        # Implementacija...
        pass

# Ovi alati se mogu koristiti nezavisno ili kao dio radnog procesa
```

### Najbolje prakse dizajna sheme

Shema je ugovor između modela i vašeg alata. Dobro dizajnirane sheme vode do bolje upotrebljivosti alata.

#### 1. Jasni opisi parametara

Uvijek uključite opisne informacije za svaki parametar:

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

#### 2. Ograničenja validacije

Uključite validacijske kontrole kako biste spriječili nevažeće unose:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Email svojstvo s provjerom formata
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Dob svojstvo s numeričkim ograničenjima
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Enumerirano svojstvo
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

#### 3. Dosljedne strukture odgovora

Održavajte dosljednost u strukturama odgovora kako biste olakšali modelima interpretaciju rezultata:

```python
async def execute_async(self, request):
    try:
        # Obradi zahtjev
        results = await self._search_database(request.parameters["query"])
        
        # Uvijek vrati dosljednu strukturu
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

### Rukovanje pogreškama

Robusno rukovanje pogreškama ključno je za alat MCP-a kako bi održao pouzdanost.

#### 1. Elegantan odgovor na pogreške

Rukujte pogreškama na odgovarajućim razinama i pružite informativne poruke:

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

#### 2. Strukturirani odgovori na pogreške

Vratite strukturirane informacije o pogreškama kad je moguće:

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
        
        // Ponovno baci druge iznimke kao ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Logika ponovnog pokušaja

Implementirajte odgovarajuću logiku ponovnog pokušaja za prolazne kvarove:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekunde
    
    while retry_count < max_retries:
        try:
            # Pozovi vanjski API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Eksponencijalno odgađanje
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Nepovratan error, ne pokušavaj ponovno
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Optimizacija performansi

#### 1. Predmemoriranje

Implementirajte predmemoriranje za skupe operacije:

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

#### 2. Asinkrono procesiranje

Koristite asinkrone obrasce programiranja za operacije vezane uz unos-izlaz:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Za dugotrajne operacije, odmah vratite ID obrade
        String processId = UUID.randomUUID().toString();
        
        // Pokrenite asinhronu obradu
        CompletableFuture.runAsync(() -> {
            try {
                // Izvršite dugotrajnu operaciju
                documentService.processDocument(documentId);
                
                // Ažurirajte status (obično se sprema u bazu podataka)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Vratite trenutni odgovor s ID-jem procesa
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Alat za provjeru statusa pratitelja
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

#### 3. Ograničenje resursa

Implementirajte ograničenja resursa kako biste spriječili preopterećenje:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Dopusti 5 zahtjeva u sekundi
            bucket_size=10        # Dopusti iznenadne skokove do 10 zahtjeva
        )
    
    async def execute_async(self, request):
        # Provjeri možemo li nastaviti ili treba pričekati
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Ako je čekanje predugo
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Pričekaj odgovarajuće vrijeme kašnjenja
                await asyncio.sleep(delay)
        
        # Pojedi jedan token i nastavi sa zahtjevom
        self.rate_limiter.consume()
        
        # Pozovi API
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
            
            # Izračunaj vrijeme do dostupnosti sljedećeg tokena
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Dodaj nove tokene na temelju proteklog vremena
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Najbolje prakse sigurnosti

#### 1. Validacija unosa

Uvijek temeljito validirajte ulazne parametre:

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

#### 2. Provjere autorizacije

Implementirajte odgovarajuće provjere autorizacije:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Dobavi korisnički kontekst iz zahtjeva
    UserContext user = request.getContext().getUserContext();
    
    // Provjeri ima li korisnik potrebne ovlasti
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Za specifične resurse, provjeri pristup tom resursu
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Nastavi s izvođenjem alata
    // ...
}
```

#### 3. Rukovanje osjetljivim podacima

Pažljivo rukujte osjetljivim podacima:

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
        
        # Dohvati korisničke podatke
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtriraj osjetljiva polja osim ako nisu izričito zatražena I ovlaštena
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Provjeri razinu ovlaštenja u kontekstu zahtjeva
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Kreiraj kopiju kako bi se izbjeglo mijenjanje originala
        redacted = user_data.copy()
        
        # Cenzuriraj određena osjetljiva polja
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Cenzuriraj ugniježđene osjetljive podatke
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Najbolje prakse testiranja MCP alata

Sveobuhvatno testiranje osigurava ispravan rad MCP alata, rukovanje rubnim slučajevima i pravilnu integraciju sa sustavom.

### Jedinično testiranje

#### 1. Testirajte svaki alat izolirano

Kreirajte fokusirane testove za funkcionalnost svakog alata:

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

#### 2. Test validacije shema

Testirajte jesu li sheme valjane i pravilno provode ograničenja:

```java
@Test
public void testSchemaValidation() {
    // Kreiraj instancu alata
    SearchTool searchTool = new SearchTool();
    
    // Dohvati shemu
    Object schema = searchTool.getSchema();
    
    // Pretvori shemu u JSON za validaciju
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Validiraj da je shema valjani JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Testiraj valjane parametre
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Testiraj nedostajući obavezni parametar
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Testiraj nevažeći tip parametra
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Testovi rukovanja pogreškama

Kreirajte specifične testove za uvjete pogreške:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Poredaj
    tool = ApiTool(timeout=0.1)  # Vrlo kratak timeout
    
    # Lažiraj zahtjev koji će istek vremena
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Dulje od timeouta
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Izvrši i provjeri
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Provjeri poruku iznimke
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Poredaj
    tool = ApiTool()
    
    # Lažiraj odgovor s ograničenjem brzine
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
        
        # Izvrši i provjeri
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Provjeri sadrži li iznimka informacije o ograničenju brzine
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integracijsko testiranje

#### 1. Testiranje lanca alata

Testirajte alate koji rade zajedno u očekivanim kombinacijama:

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

#### 2. Test MCP servera

Testirajte MCP server s potpunom registracijom i izvršenjem alata:

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
        // Testiraj krajnju točku otkrivanja
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Izradi zahtjev za alat
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Pošalji zahtjev i provjeri odgovor
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Izradi nevažeći zahtjev za alat
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Nedostaje parametar "b"
        request.put("parameters", parameters);
        
        // Pošalji zahtjev i provjeri odgovor s pogreškom
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Kraj-na-kraj testiranje

Testirajte kompletne tijekove od prompta modela do izvršenja alata:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Postavi - Konfiguriraj MCP klijenta i lažni model
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Lažni odgovori modela
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
    
    # Lažni odgovor alata za vremensku prognozu
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
        
        # Izvrši
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Provjeri
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Testiranje performansi

#### 1. Test opterećenja

Testirajte koliko istovremenih zahtjeva vaš MCP server može podnijeti:

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

#### 2. Test stresa

Testirajte sustav pod ekstremnim opterećenjem:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Postavite JMeter za stresno testiranje
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Konfigurirajte JMeter testni plan
    HashTree testPlanTree = new HashTree();
    
    // Kreirajte testni plan, grupu dretvi, uzorkivače itd.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Dodajte HTTP uzorkivač za izvođenje alata
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Dodajte slušače
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Pokrenite test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Provjerite rezultate
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Prosječno vrijeme odziva < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. percentil < 500ms
}
```

#### 3. Praćenje i profiliranje

Postavite praćenje za dugoročne analize performansi:

```python
# Konfigurirajte nadzor za MCP poslužitelj
def configure_monitoring(server):
    # Postavite Prometheus metrike
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
    
    # Dodajte middleware za praćenje vremena i bilježenje metrika
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Izložite krajnju točku metrika
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Obrasci dizajna MCP tijekova rada

Dobro dizajnirani MCP tijekovi rada poboljšavaju učinkovitost, pouzdanost i održivost. Evo ključnih obrazaca koje treba slijediti:

### 1. Obrazac lanca alata

Povežite više alata u niz gdje izlaz jednog alata postaje unos za sljedeći:

```python
# Implementacija Python lanca alata
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Popis naziva alata za izvršavanje u nizu
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Izvršite svaki alat u lancu, prosljeđujući prethodni rezultat
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Spremi rezultat i koristi ga kao ulaz za sljedeći alat
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Primjer korištenja
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

### 2. Obrazac dispečera

Koristite centralni alat koji usmjerava na specijalizirane alate na temelju unosa:

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

### 3. Obrazac paralelne obrade

Istovremeno izvršite više alata radi učinkovitosti:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Korak 1: Dohvati metapodatke skupa podataka (sinkrono)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Korak 2: Pokreni više analiza paralelno
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
        
        // Pričekaj da svi paralelni zadaci završe
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Pričekaj završetak
        
        // Korak 3: Kombiniraj rezultate
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Korak 4: Generiraj sažetak izvještaja
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Vrati kompletan rezultat tijeka rada
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Obrazac oporavka od pogrešaka

Implementirajte elegantne alternative za neuspjehe alata:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Najprije pokušajte s glavnim alatom
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Zabilježite neuspjeh
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Pređite na rezervni alat
            try:
                # Možda će biti potrebno transformirati parametre za rezervni alat
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Oba alata su neuspjela
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Ova implementacija ovisit će o specifičnim alatima
        # Za ovaj primjer, vratit ćemo samo izvornike parametre
        return params

# Primjer upotrebe
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Primarni (plaćeni) vremenski API
        "basicWeatherService",    # Rezervni (besplatni) vremenski API
        {"location": location}
    )
```

### 5. Obrazac kompozicije tijeka rada

Izgradite složene tijekove rada kompozicijom jednostavnijih:

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

# Testiranje MCP servera: Najbolje prakse i vrhunski savjeti

## Pregled

Testiranje je ključni aspekt razvoja pouzdanih, visokokvalitetnih MCP servera. Ovaj vodič pruža sveobuhvatne najbolje prakse i savjete za testiranje vaših MCP servera kroz cijeli razvojni ciklus, od jediničnih testova do integracijskih testova i end-to-end validacije.

## Zašto je testiranje važno za MCP servere

MCP serveri služe kao ključni međusloj između AI modela i klijentskih aplikacija. Temeljito testiranje osigurava:

- Pouzdanost u produkcijskim okruženjima
- Precizno rukovanje zahtjevima i odgovorima
- Ispravnu implementaciju MCP specifikacija
- Otpornost na kvarove i rubne slučajeve
- Dosljedne performanse pod različitim opterećenjima

## Jedinično testiranje za MCP servere

### Jedinično testiranje (temelj)

Jedinični testovi provjeravaju pojedinačne komponente vašeg MCP servera izolirano.

#### Što testirati

1. **Handleri resursa**: Testirajte logiku svakog handlera resursa neovisno
2. **Implementacije alata**: Provjerite ponašanje alata s različitim ulazima
3. **Predlošci promptova**: Osigurajte da se predlošci promptova pravilno prikazuju
4. **Validacija shema**: Testirajte logiku validacije parametara
5. **Rukovanje pogreškama**: Provjerite odgovore na pogreške za nevažeće unose

#### Najbolje prakse jediničnog testiranja

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
# Primjer jedinicnog testa za alat kalkulator u Pythonu
def test_calculator_tool_add():
    # Priprema
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Izvedba
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Potvrda
    assert result["value"] == 12
```

### Integracijsko testiranje (srednji sloj)

Integracijski testovi provjeravaju interakcije između komponenti vašeg MCP servera.

#### Što testirati

1. **Inicijalizacija servera**: Testirajte pokretanje servera s različitim konfiguracijama
2. **Registracija ruta**: Provjerite jesu li svi endpointi pravilno registrirani
3. **Obrada zahtjeva**: Testirajte kompletan ciklus zahtjev-odgovor
4. **Propagacija pogrešaka**: Osigurajte pravilno rukovanje pogreškama među komponentama
5. **Autentifikacija i autorizacija**: Testirajte sigurnosne mehanizme

#### Najbolje prakse integracijskog testiranja

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

### End-to-End testiranje (gornji sloj)

End-to-end testovi provjeravaju kompletno ponašanje sustava od klijenta do servera.

#### Što testirati

1. **Komunikacija klijent-server**: Testirajte kompletne cikluse zahtjev-odgovor
2. **Pravi klijentski SDK-ovi**: Testirajte s stvarnim klijentskim implementacijama
3. **Performanse pod opterećenjem**: Provjerite ponašanje pri višestrukim istovremenim zahtjevima
4. **Oporavak od pogrešaka**: Testirajte oporavak sustava od kvarova
5. **Dugotrajne operacije**: Provjerite rukovanje streamingom i dugotrajnim operacijama

#### Najbolje prakse za E2E testiranje

```typescript
// Primjer E2E testa s klijentom u TypeScriptu
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Pokreni server u testnom okruženju
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Izvrši akciju
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Provjeri
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Strategije mockiranja za MCP testiranje

Mockiranje je ključno za izolaciju komponenti tijekom testiranja.

### Komponente za mockirati

1. **Vanjski AI modeli**: Mockirajte odgovore modela za predvidljivo testiranje
2. **Vanjske usluge**: Mockirajte API ovisnosti (baze podataka, usluge trećih strana)
3. **Usluge autentifikacije**: Mockirajte pružatelje identiteta
4. **Pružatelji resursa**: Mockirajte skupe resursne handlere

### Primjer: Mockiranje odgovora AI modela

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
# Python primjer s unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Konfiguriraj mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Upotrijebi mock u testu
    server = McpServer(model_client=mock_model)
    # Nastavi s testom
```

## Testiranje performansi

Testiranje performansi ključno je za produkcijske MCP servere.

### Što mjeriti

1. **Latencija**: Vrijeme odgovora na zahtjeve
2. **Propusnost**: Broj obrađenih zahtjeva u sekundi
3. **Iskorištenost resursa**: CPU, memorija, mreža
4. **Rukovanje paralelizmom**: Ponašanje pri paralelnim zahtjevima
5. **Karakteristike skaliranja**: Performanse sa rastućim opterećenjem

### Alati za testiranje performansi

- **k6**: Open-source alat za testiranje opterećenja
- **JMeter**: Sveobuhvatno testiranje performansi
- **Locust**: Python bazirano testiranje opterećenja
- **Azure Load Testing**: Cloud bazirano testiranje performansi

### Primjer: Osnovni test opterećenja s k6

```javascript
// k6 skripta za testiranje opterećenja MCP poslužitelja
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtualnih korisnika
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

## Automacija testova za MCP servere

Automatizacija vaših testova osigurava dosljednu kvalitetu i brže povratne informacije.

### Integracija s CI/CD-om
1. **Pokretanje jedinčnih testova na Pull zahtjevima**: Osigurajte da promjene u kodu ne prekidaju postojeću funkcionalnost  
2. **Integracijski testovi u Staging okruženju**: Pokrenite integracijske testove u predprodukcijskim okruženjima  
3. **Performansne referentne vrijednosti**: Održavajte performansne pokazatelje kako biste uočili regresije  
4. **Sigurnosni skenovi**: Automatizirajte sigurnosno testiranje kao dio pipeline-a

### Primjer CI Pipelinea (GitHub Actions)

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

## Testiranje usklađenosti sa MCP specifikacijom

Provjerite pravilnu implementaciju MCP specifikacije na vašem serveru.

### Ključna područja usklađenosti

1. **API krajnje točke**: Testirajte obavezne krajnje točke (/resources, /tools, itd.)  
2. **Format zahtjeva/odgovora**: Validirajte usklađenost sa shemom  
3. **Kodovi pogrešaka**: Provjerite ispravne statusne kodove za različite scenarije  
4. **Tipovi sadržaja**: Testirajte rukovanje različitim tipovima sadržaja  
5. **Autentikacijski tok**: Provjerite autorizacijske mehanizme u skladu sa specifikacijom

### Skup testova usklađenosti

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

## Top 10 savjeta za učinkovito testiranje MCP servera

1. **Testirajte definicije alata zasebno**: Provjerite definicije sheme neovisno o logici alata  
2. **Koristite parametarske testove**: Testirajte alate s različitim ulazima, uključujući rubne slučajeve  
3. **Provjerite odgovore na pogreške**: Osigurajte pravilno rukovanje svim mogućim pogreškama  
4. **Testirajte logiku autorizacije**: Osigurajte pravilnu kontrolu pristupa za različite korisničke uloge  
5. **Pratite pokrivenost testova**: Ciljajte visoku pokrivenost kritičnog koda  
6. **Testirajte streaming odgovore**: Provjerite ispravno rukovanje streaming sadržajem  
7. **Simulirajte mrežne probleme**: Testirajte ponašanje u uvjetima loše mreže  
8. **Testirajte ograničenja resursa**: Provjerite ponašanje kod dostizanja kvota ili ograničenja brzine  
9. **Automatizirajte regresijske testove**: Izgradite skupinu testova koji se pokreću pri svakoj promjeni koda  
10. **Dokumentirajte testne slučajeve**: Održavajte jasnu dokumentaciju scenarija testiranja

## Uobičajene pogreške u testiranju

- **Preveliko oslanjanje na sretan put testiranja**: Obavezno temeljito testirajte i slučajeve pogrešaka  
- **Ignoriranje testiranja performansi**: Identificirajte uska grla prije nego što utječu na produkciju  
- **Testiranje samo u izolaciji**: Kombinirajte jedinčne, integracijske i E2E testove  
- **Nepotpuna pokrivenost API-ja**: Osigurajte da su sve krajnje točke i značajke testirane  
- **Nekonzistentna testna okruženja**: Koristite kontejnere za osiguranje konzistentnosti testnog okruženja

## Zaključak

Sveobuhvatna strategija testiranja ključna je za razvoj pouzdanih, visokokvalitetnih MCP servera. Primjenom najboljih praksi i savjeta iz ovog vodiča, možete osigurati da vaše MCP implementacije zadovoljavaju najviše standarde kvalitete, pouzdanosti i performansi.

## Ključne spoznaje

1. **Dizajn alata**: Pridržavajte se principa jedne odgovornosti, koristite injekciju ovisnosti i dizajnirajte za sastavljivost  
2. **Dizajn sheme**: Izradite jasne, dobro dokumentirane sheme s odgovarajućim ograničenjima validacije  
3. **Rukovanje pogreškama**: Implementirajte graciozno rukovanje pogreškama, strukturirane odgovore na pogreške i logiku ponovnog pokušaja  
4. **Performanse**: Koristite keširanje, asinkrono procesiranje i ograničenje resursa  
5. **Sigurnost**: Primijenite temeljitu validaciju unosa, provjere autorizacije i rukovanje osjetljivim podacima  
6. **Testiranje**: Izradite sveobuhvatne jedinčne, integracijske i end-to-end testove  
7. **Obrasci radnih tokova**: Primijenite uspostavljene obrasce poput lanaca, dispatchera i paralelnog procesiranja

## Vježba

Dizajnirajte MCP alat i radni tok za sustav obrade dokumenata koji:

1. Prima dokumente u različitim formatima (PDF, DOCX, TXT)  
2. Izvlači tekst i ključne informacije iz dokumenata  
3. Klasificira dokumente prema tipu i sadržaju  
4. Generira sažetak svakog dokumenta

Implementirajte sheme alata, rukovanje pogreškama i obrazac radnog toka koji najbolje odgovara ovom scenariju. Razmotrite kako biste testirali ovu implementaciju.

## Resursi

1. Pridružite se MCP zajednici na [Azure AI Foundry Discord zajednica](https://aka.ms/foundrydevs) kako biste bili u tijeku s najnovijim razvojem  
2. Sudjelujte u open-source [MCP projektima](https://github.com/modelcontextprotocol)  
3. Primijenite MCP principe u inicijativama AI vaše organizacije  
4. Istražite specijalizirane MCP implementacije za vašu industriju  
5. Razmislite o pohađanju naprednih tečajeva o specifičnim MCP temama, poput višemodalne integracije ili integracije poslovnih aplikacija  
6. Eksperimentirajte s izradom vlastitih MCP alata i radnih tokova koristeći principe naučene kroz [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Što slijedi

Sljedeće: [Studije slučaja](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument preveden je pomoću AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo osigurati točnost, molimo imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati službenim i autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni prijevod od strane ljudskog prevoditelja. Ne snosimo odgovornost za bilo kakva nesporazuma ili pogrešne interpretacije koje mogu proizaći iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->