# MCP vystymo geriausios praktikos

[![MCP Development Best Practices](../../../translated_images/lt/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Spustelėkite paveikslėlį aukščiau, kad peržiūrėtumėte šios pamokos vaizdo įrašą)_

## Apžvalga

Ši pamoka skirta pažangiausioms geriausioms praktikoms, susijusioms su MCP serverių ir funkcijų kūrimu, testavimu ir diegimu gamybinėse aplinkose. Kadangi MCP ekosistemos auga ir tampa sudėtingesnės bei svarbesnės, laikymasis nustatytų modelių užtikrina patikimumą, priežiūrą ir tarpusavio suderinamumą. Ši pamoka apjungia praktinę išmintį, įgytą iš realaus pasaulio MCP įgyvendinimų, kad padėtų sukurti patikimus, efektyvius serverius su veiksmingais ištekliais, užklausomis ir įrankiais.

## Mokymosi tikslai

Pamokos pabaigoje galėsite:

- Taikyti pramonės geriausias praktikas MCP serverių ir funkcijų projektavime
- Kurti išsamias MCP serverių testavimo strategijas
- Projektuoti efektyvius, pakartotinai naudojamus darbo srauto modelius sudėtingoms MCP programoms
- Įgyvendinti tinkamą klaidų tvarkymą, žurnalavimą ir stebimą MCP serveriuose
- Optimizuoti MCP įgyvendinimus našumo, saugumo ir priežiūros aspektu

## Pagrindiniai MCP principai

Prieš gilindamiesi į konkrečias įgyvendinimo praktikas, svarbu suprasti pagrindinius principus, kurie vadovauja efektyviam MCP vystymui:

1. **Standartizuota komunikacija**: MCP naudoja JSON-RPC 2.0 kaip pagrindą, užtikrinant nuoseklią užklausų, atsakymų ir klaidų tvarkymo formatą visuose įgyvendinimuose.

2. **Vartotojo poreikiai pirmoje vietoje**: Visada prioritetu laikykite vartotojo sutikimą, valdymą ir skaidrumą savo MCP įgyvendinimuose.

3. **Saugumo prioritetas**: Įgyvendinkite tvirtas saugumo priemones, įskaitant autentifikaciją, autorizaciją, validavimą ir užklausų dažnio ribojimą.

4. **Modulinė architektūra**: Projektuokite MCP serverius moduline prieiga, kur kiekvienas įrankis ir išteklius turi aiškią, specializuotą paskirtį.

5. **Būsena palaikančios jungtys**: Pasinaudokite MCP gebėjimu išlaikyti būseną per kelias užklausas, siekiant darnesnių ir kontekstui jautresnių sąveikų.

## Oficialios MCP geriausios praktikos

Toliau pateiktos geriausios praktikos yra iš oficialios Model Context Protocol dokumentacijos:

### Saugumo geriausios praktikos

1. **Vartotojo sutikimas ir valdymas**: Visada reikalaukite aiškaus vartotojo sutikimo prieš prieigą prie duomenų ar operacijų vykdymą. Užtikrinkite aiškų valdymą, kokie duomenys yra bendrinami ir kokios operacijos leidžiamos.

2. **Duomenų privatumas**: Rodoma vartotojo informacija tik su aiškiu sutikimu ir apsaugota tinkamomis prieigos kontrolėmis. Apsaugokite nuo neteisėtos duomenų perdavimo.

3. **Įrankių saugumas**: Reikalaukite aiškaus vartotojo sutikimo prieš bet kokios įrankio funkcijos kvietimą. Užtikrinkite, kad vartotojai supranta kiekvienos priemonės veiklą ir laikykitės tvirtų saugumo ribų.

4. **Įrankių leidimų valdymas**: Konfigūruokite, kuriuos įrankius modelis gali naudoti sesijos metu, užtikrindami prieinamumą tik tiems, kurie yra aiškiai autorizuoti.

5. **Autentifikacija**: Reikalaukite tinkamos autentifikacijos prieš suteikiant prieigą prie įrankių, išteklių arba jautrių operacijų naudojant API raktus, OAuth žetonus ar kitas saugias autentifikacijos priemones.

6. **Parametrų validacija**: Užtikrinkite visų įrankių kvietimų parametrų validaciją, kad būtų išvengta klaidingų ar kenkėjiškų įvesties duomenų pateikimo.

7. **Užklausų dažnio ribojimas**: Įgyvendinkite užklausų dažnio ribojimą, kad būtų išvengta piktnaudžiavimo ir užtikrintas sąžiningas serverio išteklių naudojimas.

### Įgyvendinimo geriausios praktikos

1. **Galimybių derybos**: Prisijungimo metu mainykitės informacija apie palaikomas funkcijas, protokolo versijas, prieinamus įrankius ir išteklius.

2. **Įrankių projektavimas**: Kurkite specializuotus įrankius, gerai atlikiančius vieną užduotį, o ne monolitiškus įrankius, kurie apima kelis klausimus.

3. **Klaidų tvarkymas**: Įgyvendinkite standartizuotus klaidų pranešimus ir kodus, kad būtų lengviau diagnozuoti problemas, palankiai valdyti sutrikimus ir teikti naudingą informaciją.

4. **Žurnalo registravimas**: Konfigūruokite struktūruotus žurnalus audito, derinimo ir protokolo sąveikų stebėjimui.

5. **Progreso stebėjimas**: Ilgai trunkančioms operacijoms teikite pažangos atnaujinimus, kad būtų galima sukurti reaguojančią vartotojo sąsają.

6. **Užklausų atšaukimas**: Leiskite klientams atšaukti nebereikalingas arba per ilgai trunkančias užklausas.

## Papildomi šaltiniai

Norėdami gauti naujausią informaciją apie MCP geriausias praktikas, žiūrėkite:

- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub saugykla](https://github.com/modelcontextprotocol)
- [Saugumo geriausios praktikos](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Saugumo rizikos ir jų mažinimas
- [MCP saugumo viršūnių susitikimo seminaras (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktiniai saugumo mokymai

## Praktinių įgyvendinimų pavyzdžiai

### Įrankių projektavimo geriausios praktikos

#### 1. Vienos atsakomybės principas

Kiekvienas MCP įrankis turėtų turėti aiškią, specializuotą paskirtį. Vietoje monolitiškų įrankių, kurie bando spręsti kelis klausimus, kurkite specializuotus įrankius, puikiai atliekantčius konkrečias užduotis.

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

#### 2. Nuoseklus klaidų tvarkymas

Įgyvendinkite patikimą klaidų tvarkymą su informatyviais klaidų pranešimais ir tinkamomis atkūrimo priemonėmis.

```python
# Python pavyzdys su išsamiu klaidų tvarkymu
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parametrų patikrinimas
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Saugumo patikrinimas
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Duomenų bazės operacija su laiko limitu
                async with timeout(10):  # 10 sekundžių laiko limitas
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Ryšio klaidos gali būti laikinos
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Užklausos klaidos greičiausiai yra kliento klaidos
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Leisti praeiti įrankiams būdingoms klaidoms
            raise
        except Exception as e:
            # Visiems netikėtiems klaidoms gaudyti
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL injekcijos aptikimo įgyvendinimas
        pass
        
    def _log_error(self, message, error):
        # Klaidos registravimo įgyvendinimas
        pass
```

#### 3. Parametrų validacija

Visada kruopščiai tikrinkite parametrus, kad išvengtumėte netaisyklingų ar kenkėjiškų įrašų.

```javascript
// JavaScript/TypeScript pavyzdys su detalia parametru patikra
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
    // 1. Patikrinti parametro buvimą
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Patikrinti parametro tipus
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Patikrinti parametro reikšmes
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Patikrinti turinio buvimą rašymo operacijai
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Kelio saugumo patikra
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Įgyvendinimas remiantis patikrintais parametrais
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Kelio saugumo patikros įgyvendinimas
    // ...
  }
}
```

### Saugumo įgyvendinimo pavyzdžiai

#### 1. Autentifikacija ir autorizacija

```java
// Java pavyzdys su autentifikavimu ir autorizacija
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Priklausomybių injekcija
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
        // 1. Išgauti autentifikavimo kontekstą
        String authToken = request.getContext().getAuthToken();
        
        // 2. Autentifikuoti vartotoją
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Patikrinti autorizaciją konkrečiai operacijai
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Tęsti leidžiamą operaciją
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

#### 2. Užklausų dažnio ribojimas

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

## Testavimo geriausios praktikos

### 1. Vienetinis MCP įrankių testavimas

Visada testuokite įrankius izoliuotai, panaudodami išorines priklausomybes imituojančius metodus:

```typescript
// TypeScript įrankio vieneto testo pavyzdys
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Sukurkite imituojamą oro sąlygų tarnybą
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Sukurkite įrankį su imituojama priklausomybe
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Paruošimas
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Veiksmas
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Patikrinimas
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Paruošimas
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Veiksmas ir patikrinimas
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integracinis testavimas

Testuokite visą procesą nuo kliento užklausų iki serverio atsakymų:

```python
# Pythono integracijos testo pavyzdys
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Paleisti testavimo serverį
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Sukurti klientą
        client = McpClient("http://localhost:5000")
        
        # Patikrinti įrankio paiešką
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Patikrinti įrankio vykdymą
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Patvirtinti atsakymą
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Išvalyti
        await server.stop()
```

## Našumo optimizavimas

### 1. Talpyklos strategijos

Įgyvendinkite tinkamą talpyklą, kad sumažintumėte delsą ir išteklių naudojimą:

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

#### 2. Priklausomybių injekcija ir testavimas

Projektuokite įrankius taip, kad jų priklausomybės būtų tiekiamos per konstruktorių, kas užtikrina testuojamumą ir konfigūruojamumą:

```java
// Java pavyzdys su priklausomybių injekcija
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Priklausomybės injekuojamos per konstruktorių
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Įrankio įgyvendinimas
    // ...
}
```

#### 3. Komponuojami įrankiai

Projektuokite įrankius, kurie gali būti sudedami kartu sudėtingesniems darbo srautams kurti:

```python
# Python pavyzdys, rodantis sudedamus įrankius
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Įgyvendinimas...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Šis įrankis gali naudoti rezultatus iš dataFetch įrankio
    async def execute_async(self, request):
        # Įgyvendinimas...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Šis įrankis gali naudoti rezultatus iš dataAnalysis įrankio
    async def execute_async(self, request):
        # Įgyvendinimas...
        pass

# Šie įrankiai gali būti naudojami nepriklausomai arba kaip darbo eiga
```

### Schemos projektavimo geriausios praktikos

Schema yra sutartis tarp modelio ir įrankio. Gerai suprojektuotos schemos leidžia geriau naudoti įrankius.

#### 1. Aiškūs parametrų aprašymai

Visada pateikite aprašomą informaciją kiekvienam parametrui:

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

#### 2. Validavimo apribojimai

Pridėkite validavimo taisykles, kad išvengtumėte netinkamos įvesties:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // El. pašto savybė su formato patikrinimu
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Amžiaus savybė su skaitmeniniais apribojimais
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Išvardinta savybė
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

#### 3. Nuoseklios atsakymų struktūros

Išlaikykite atsakymų struktūros nuoseklumą, kad modeliams būtų lengviau interpretuoti rezultatus:

```python
async def execute_async(self, request):
    try:
        # Apdoroti užklausą
        results = await self._search_database(request.parameters["query"])
        
        # Visada grąžinti nuoseklią struktūrą
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

### Klaidų tvarkymas

Tvirtas klaidų tvarkymas yra būtinas MCP įrankių patikimumui užtikrinti.

#### 1. Švelnus klaidų tvarkymas

Tvarkykite klaidas tinkamame lygyje ir teikite informatyvius pranešimus:

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

#### 2. Struktūruoti klaidų atsakymai

Grąžinkite struktūzuotą klaidų informaciją, kai tik įmanoma:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Įgyvendinimas
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
        
        // Permetami kiti išimtys kaip ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Pakartotinio bandymo logika

Įgyvendinkite tinkamą pakartotinio bandymo logiką laikiniems sutrikimams:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekundės
    
    while retry_count < max_retries:
        try:
            # Iškvieskite išorinį API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Eksponentinis atidėjimas
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Ne laikinė klaida, nebandyti dar kartą
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Našumo optimizavimas

#### 1. Talpyklos naudojimas

Įgyvendinkite talpyklą brangioms operacijoms:

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

#### 2. Asinchroninis apdorojimas

Naudokite asinchroninius programavimo modelius I / O operacijoms:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Ilgai trunkančioms operacijoms grąžinkite apdorojimo ID iš karto
        String processId = UUID.randomUUID().toString();
        
        // Pradėti asinchroninį apdorojimą
        CompletableFuture.runAsync(() -> {
            try {
                // Vykdyti ilgai trunkančią operaciją
                documentService.processDocument(documentId);
                
                // Atnaujinti būseną (įprastai būtų saugoma duomenų bazėje)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Grąžinti momentinį atsakymą su proceso ID
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Pagalbinis būsenos tikrinimo įrankis
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

#### 3. Išteklių ribojimas

Įgyvendinkite išteklių ribojimą, kad išvengtumėte perkrovos:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Leisti 5 užklausas per sekundę
            bucket_size=10        # Leisti trumpalaikius šuolius iki 10 užklausų
        )
    
    async def execute_async(self, request):
        # Patikrinti, ar galime tęsti, ar reikia palaukti
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Jei laukimas per ilgas
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Palaukti tinkamą delsos laiką
                await asyncio.sleep(delay)
        
        # Panaudoti žetoną ir tęsti užklausą
        self.rate_limiter.consume()
        
        # Kvieskite API
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
            
            # Apskaičiuoti laiką iki kito žetono prieinamumo
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Pridėti naujus žetonus pagal prabėgusį laiką
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Saugumo geriausios praktikos

#### 1. Įvesties validacija

Visada kruopščiai tikrinkite įvesties parametrus:

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

#### 2. Autorizacijos patikrinimai

Įgyvendinkite tinkamus autorizacijos patikrinimus:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Gauti vartotojo kontekstą iš užklausos
    UserContext user = request.getContext().getUserContext();
    
    // Patikrinti, ar vartotojas turi reikiamas teises
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Konkretų išteklių atveju, patikrinti prieigą prie to ištekliaus
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Tęsti įrankio vykdymą
    // ...
}
```

#### 3. Jautrių duomenų tvarkymas

Atsargiai tvarkykite jautrius duomenis:

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
        
        # Gauti vartotojo duomenis
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtruoti jautrius laukus, nebent aiškiai prašoma IR leidžiama
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Patikrinti autorizacijos lygį užklausos kontekste
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Sukurti kopiją, kad nebūtų modifikuojamas originalas
        redacted = user_data.copy()
        
        # Ištrinti konkrečius jautrius laukus
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Ištrinti įdėtus jautrius duomenis
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP įrankių testavimo geriausios praktikos

Išsamus testavimas užtikrina, kad MCP įrankiai veiktų teisingai, tvarkytų kampinius atvejus ir tinkamai integruotųsi su sistema.

### Vienetinis testavimas

#### 1. Testuokite kiekvieną įrankį izoliuotai

Kurkite specializuotus testus kiekvienos funkcijos patikrinimui:

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

#### 2. Schemos validavimo testavimas

Testuokite, ar schemos yra galiojančios ir tinkamai taiko apribojimus:

```java
@Test
public void testSchemaValidation() {
    // Sukurti įrankio egzempliorių
    SearchTool searchTool = new SearchTool();
    
    // Gauti schemą
    Object schema = searchTool.getSchema();
    
    // Konvertuoti schemą į JSON tikrinimui
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Patikrinti, ar schema yra galiojantis JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Išbandyti galiojančius parametrus
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Išbandyti trūkstamą privalomą parametrą
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Išbandyti neteisingą parametro tipą
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Klaidos tvarkymo testai

Kurkite konkrečius testus klaidų sąlygoms:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Sutvarkyti
    tool = ApiTool(timeout=0.1)  # Labai trumpas laiko limitas
    
    # Imituoti užklausą, kuri baigsis laiko limitu
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Ilgesnis nei laiko limitas
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Veiksmas ir patvirtinimas
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Patikrinti klaidos pranešimą
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Sutvarkyti
    tool = ApiTool()
    
    # Imituoti atsakymą su apribotu užklausų dažniu
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
        
        # Veiksmas ir patvirtinimas
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Patikrinti, ar klaida turi informaciją apie užklausų apribojimą
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integracinis testavimas

#### 1. Įrankių grandinės testavimas

Testuokite įrankių darbą kartu numatytose kombinacijose:

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

#### 2. MCP serverio testavimas

Testuokite MCP serverį su pilna įrankių registracija ir vykdymu:

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
        // Išbandyti atradimo galinį tašką
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Sukurti įrankio užklausą
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Išsiųsti užklausą ir patikrinti atsakymą
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Sukurti negaliojančią įrankio užklausą
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Trūksta parametro "b"
        request.put("parameters", parameters);
        
        // Išsiųsti užklausą ir patikrinti klaidos atsakymą
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Pilnas darbo srauto testavimas

Testuokite visą darbo eigą nuo modelio užklausos iki įrankio vykdymo:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Suorganizuokite - paruoškite MCP klientą ir imituokite modelį
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Modelio atsakymai-maketai
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
    
    # Oro sąlygų įrankio atsakymas-maketas
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
        
        # Veiksmas
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Patvirtinti
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Našumo testavimas

#### 1. Apkrovos testavimas

Testuokite, kiek lygiagretų užklausų gali apdoroti jūsų MCP serveris:

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

#### 2. Įtampos testavimas

Testuokite sistemą esant ekstremalioms apkrovoms:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Paruošti JMeter streso testavimui
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Konfigūruoti JMeter testo planą
    HashTree testPlanTree = new HashTree();
    
    // Sukurti testo planą, gijos grupę, imtuvus ir kt.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Pridėti HTTP imtuvą įrankio vykdymui
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Pridėti klausytojus
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Vykdyti testą
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Patikrinti rezultatus
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Vidutinis atsako laikas < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90-asis procentilis < 500ms
}
```

#### 3. Stebėjimas ir profiliavimas

Nustatykite stebėjimą ilgalaikiam našumo analizei:

```python
# Konfigūruoti monitoringo sistemą MCP serveriui
def configure_monitoring(server):
    # Nustatyti Prometheus metrų surinkimą
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
    
    # Pridėti tarpinę programinę įrangą laikui matuoti ir metrų įrašymui
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Atidaryti metrų galinį tašką
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP darbo srautų dizaino modeliai

Gerai suprojektuoti MCP darbo srautai pagerina efektyvumą, patikimumą ir priežiūrą. Štai pagrindiniai modeliai:

### 1. Įrankių grandinės modelis

Suveskite kelis įrankius sekoje taip, kad vieno įrankio išvestis tampa kito įvestimi:

```python
# Python įrankių grandinės įgyvendinimas
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Vykdomų įrankių pavadinimų sąrašas seka
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Vykdykite kiekvieną įrankį grandinėje, perduodant ankstesnį rezultatą
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Išsaugokite rezultatą ir naudokite kaip įvestį kitam įrankiui
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Pavyzdinis naudojimas
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

### 2. Siuntėjo modelis

Naudokite centrinį įrankį, kuris nukreipia į specializuotus įrankius pagal įvestį:

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

### 3. Lygiagretus apdorojimo modelis

Vykdykite kelis įrankius vienu metu efektyvumui didinti:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // 1 žingsnis: Gauti duomenų rinkinio metaduomenis (sinchroniškai)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // 2 žingsnis: Paleisti kelias analizes lygiagrečiai
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
        
        // Palaukti, kol visos lygiagrečios užduotys bus atliktos
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Palaukti užbaigimo
        
        // 3 žingsnis: Apjungti rezultatus
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // 4 žingsnis: Generuoti santraukos ataskaitą
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Grąžinti visą darbo eigą rezultatą
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Klaidos atkūrimo modelis

Įgyvendinkite švelnius pakaitinius variantus įrankių gedimų atveju:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Pirmiausia pabandykite pagrindinį įrankį
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Užfiksuokite klaidą
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Persijunkite į atsarginį įrankį
            try:
                # Gali prireikti transformuoti parametrus atsarginiam įrankiui
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Abu įrankiai nepavyko
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Ši įgyvendinimo detalė priklausys nuo konkrečių įrankių
        # Šiame pavyzdyje tiesiog grąžinsime originalius parametrus
        return params

# Naudojimo pavyzdys
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Pagrindinis (mokamas) orų API
        "basicWeatherService",    # Atsarginis (nemokamas) orų API
        {"location": location}
    )
```

### 5. Darbo srautų komponavimo modelis

Kurti sudėtingus darbo srautus komponuojant paprastesnius:

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

# MCP serverių testavimas: geriausios praktikos ir svarbiausios rekomendacijos

## Apžvalga

Testavimas yra svarbi kuriant patikimus, aukštos kokybės MCP serverius dalis. Ši vadovė pateikia išsamias geriausias praktikas ir patarimus MCP serverių testavimui kūrimo ciklo metu – nuo vienetinių iki integracinių testų ir galutinės patikros.

## Kodėl testavimas svarbus MCP serveriams

MCP serveriai yra svarbus programinės įrangos sluoksnis tarp AI modelių ir kliento programų. Kruopštus testavimas užtikrina:

- Patikimumą gamybinėje aplinkoje
- Tikslų užklausų ir atsakymų tvarkymą
- Tinkamą MCP specifikacijų įgyvendinimą
- Atsparumą gedimams ir kampiniams atvejams
- Nuoseklų veikimą esant įvairiai apkrovai

## Vienetinis MCP serverio testavimas

### Vienetinis testavimas (pagrindas)

Vienetiniai testai tikrina atskirus MCP serverio komponentus izoliuotai.

#### Ką testuoti

1. **Išteklių tvarkyklės**: testuoti kiekvieno išteklių valdiklio logiką atskirai  
2. **Įrankių įgyvendinimai**: tikrinti įrankių elgseną su įvairiomis įvestimis  
3. **Užklausų šablonai**: užtikrinti, kad užklausų šablonai būtų tinkamai sugeneruoti  
4. **Schemos validacija**: testuoti parametrų validavimo logiką  
5. **Klaidų tvarkymas**: tikrinti klaidų atsakymus neleistinoms įvestims  

#### Vienetinių testų geriausios praktikos

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
# Pavyzdinis vieneto testas skaičiuotuvo įrankiui Python kalboje
def test_calculator_tool_add():
    # Paruošimas
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Veiksmas
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Patikrinimas
    assert result["value"] == 12
```
  
### Integracinis testavimas (vidurinis lygmuo)

Integraciniai testai tikrina MCP serverio komponentų sąveiką.

#### Ką testuoti

1. **Serverio inicializavimas**: testuoti serverio paleidimą su įvairiomis konfigūracijomis  
2. **Maršrutų registracija**: užtikrinti, kad visi maršrutai būtų teisingai registruoti  
3. **Užklausų apdorojimas**: testuoti visą užklausų atsakymų ciklą  
4. **Klaidų plitimas**: užtikrinti klaidų tvarkymą tarp komponentų  
5. **Autentifikacija ir autorizacija**: testuoti saugumo mechanizmus  

#### Integracinių testų geriausios praktikos

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
  
### Pilnas sistemos testavimas (viršutinis lygmuo)

Pilni sistemos testai tikrina visą elgseną nuo kliento iki serverio.

#### Ką testuoti

1. **Kliento ir serverio komunikacija**: testuoti visą užklausų atsakymų ciklą  
2. **Tikri kliento SDK**: testuoti tikrais kliento įgyvendinimais  
3. **Našumas esant apkrovai**: stebėti elgseną su daug kelių užklausų lygiagrečiai  
4. **Klaidų atkūrimas**: testuoti sistemos atkūrimą po gedimų  
5. **Ilgai trunkančios operacijos**: užtikrinti srautinio apdorojimo ir ilgų operacijų palaikymą  

#### E2E testų geriausios praktikos

```typescript
// Pavyzdinis E2E testas su klientu TypeScript kalba
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Paleisti serverį testavimo aplinkoje
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Veiksmas
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Patvirtinimas
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```
  
## MCP testavimo imitavimo strategijos

Imitavimas yra būtinas komponentų izoliacijai testavimo metu.

### Komponentai, kuriuos galima imituoti

1. **Išoriniai AI modeliai**: imituokite modelio atsakymus patikimam testavimui  
2. **Išorinės paslaugos**: imituokite API priklausomybes (duomenų bazes, trečiųjų šalių paslaugas)  
3. **Autentifikacijos paslaugos**: imituokite tapatybės tiekėjus  
4. **Išteklių tiekėjai**: imituokite brangių išteklių tvarkykles  

### Pavyzdys: AI modelio atsakymo imitavimas

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
# Python pavyzdys su unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Konfigūruoti maketą
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Naudoti maketą teste
    server = McpServer(model_client=mock_model)
    # Tęsti testą
```
  
## Našumo testavimas

Našumo testavimas yra itin svarbus MCP serveriams gamyboje.

### Ką matuoti

1. **Vėlavimas**: užklausų atsakymo laikas  
2. **Perdavimo efektyvumas**: užklausų skaičius per sekundę  
3. **Išteklių naudojimas**: CPU, atminties, tinklo naudojimas  
4. **Lygiagretus apdorojimas**: elgsena vykdant kelias užklausas vienu metu  
5. **Mastelio keitimo savybės**: našumas didėjant apkrovai  

### Našumo testavimo įrankiai

- **k6**: atviro kodo apkrovos testavimo įrankis  
- **JMeter**: išsamus našumo testavimas  
- **Locust**: Python pagrindu veikiantis apkrovos testavimas  
- **Azure Load Testing**: debesų pagrindu atliktas testavimas  

### Pavyzdys: Paprastas apkrovos testas su k6

```javascript
// k6 scenarijus MCP serverio apkrovos testavimui
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtualių vartotojų
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
  
## MCP serverių testavimo automatizavimas

Testų automatizavimas užtikrina nuoseklią kokybę ir spartesnį grįžtamąjį ryšį.

### CI/CD integracija
1. **Vykdykite vienetinius testus prie traukimo prašymų**: Užtikrinkite, kad kodo pakeitimai nesugriautų esamos funkcionalumo
2. **Integracijos testai testavimo aplinkoje**: Vykdykite integracijos testus priešprodukcinėse aplinkose
3. **Veikimo rodiklių bazės**: Palaikykite veikimo bazinius rodiklius regresijų nustatymui
4. **Saugumo skanavimas**: Automatizuokite saugumo testavimą kaip pipeline dalį

### CI pavyzdžio pipeline (GitHub Actions)

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

## Atitikties MCP specifikacijai testavimas

Patikrinkite, ar jūsų serveris teisingai įgyvendina MCP specifikaciją.

### Pagrindinės atitikties sritys

1. **API galiniai taškai**: Testuokite privalomus galinius taškus (/resources, /tools ir kt.)
2. **Užklausos/atsakymo formatas**: Patikrinkite schemos atitiktį
3. **Klaidos kodai**: Patikrinkite teisingus statuso kodus įvairioms situacijoms
4. **Turinio tipai**: Testuokite skirtingų turinio tipų apdorojimą
5. **Autentifikacijos srautas**: Patikrinkite specifikacijai atitinkančias autentifikacijos mechanizmus

### Atitikties testavimo rinkinys

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

## 10 pagrindinių patarimų efektyviam MCP serverio testavimui

1. **Įrankių apibrėžimus testuokite atskirai**: Patikrinkite schemos apibrėžimus nepriklausomai nuo įrankių logikos
2. **Naudokite parametrizuotus testus**: Testuokite įrankius su įvairiomis įvestimis, įskaitant kraštutinius atvejus
3. **Tikrinti klaidų atsakymus**: Patikrinkite teisingą klaidų tvarkymą visoms galimoms klaidų sąlygoms
4. **Testuoti autorizacijos logiką**: Užtikrinkite tinkamą prieigos kontrolę skirtingiems naudotojų vaidmenims
5. **Stebėkite testų aprėptį**: Siekite aukštos kritinio kodo kelio aprėpties
6. **Testuokite srautinčius atsakymus**: Patikrinkite teisingą srautinio turinio apdorojimą
7. **Simuliuokite tinklo problemas**: Testuokite elgseną prastomis tinklo sąlygomis
8. **Testuokite išteklių ribas**: Patikrinkite elgseną pasiekiant kvotas ar greičio apribojimus
9. **Automatizuokite regresijos testus**: Sukurkite rinkinį, kuris vykdomas prie kiekvieno kodo pakeitimo
10. **Dokumentuokite testų atvejus**: Palaikykite aiškią testavimo scenarijų dokumentaciją

## Dažnos testavimo klaidos

- **Per didelis pasikliautis sėkmingo kelio testavimu**: Būtinai kruopščiai testuokite klaidų atvejus
- **Ignoruojamas veikimo testavimas**: Nustatykite apribojimus prieš juos paveikiant produkciją
- **Testavimas tik izoliuotai**: Derinkite vienetinius, integracijos ir end-to-end testus
- **Nepilnas API aprėptis**: Užtikrinkite, kad visi galiniai taškai ir funkcijos būtų ištestuoti
- **Nenuoseklios testavimo aplinkos**: Naudokite konteinerius nuosekioms testavimo aplinkoms užtikrinti

## Išvada

Išsami testavimo strategija yra būtina kuriant patikimus, aukštos kokybės MCP serverius. Įgyvendindami šiame gide aprašytas geriausias praktikas ir patarimus, galite užtikrinti, kad jūsų MCP įgyvendinimai atitinka aukščiausius kokybės, patikimumo ir veikimo standartus.


## Pagrindinės išvados

1. **Įrankio dizainas**: Vadovaukitės vienos atsakomybės principu, naudokite priklausomybių injekciją ir projektuokite sudėtinumui
2. **Schemų dizainas**: Kurkite aiškias, gerai dokumentuotas schemas su tinkamomis validacijos ribomis
3. **Klaidų tvarkymas**: Įgyvendinkite sklandų klaidų tvarkymą, struktūrizuotus klaidų atsakymus ir pakartotinio bandymo logiką
4. **Veikimas**: Naudokite kešavimą, asinchroninį apdorojimą ir išteklių ribojimą
5. **Saugumas**: Taikykite kruopščią įvesties validaciją, autorizacijos patikrinimus ir jautrių duomenų tvarkymą
6. **Testavimas**: Kurkite išsamius vienetinius, integracijos ir end-to-end testus
7. **Darbo srauto modeliai**: Naudokite įsitvirtinusius modelius, tokius kaip grandinės, paskirstytojai ir lygiagretus apdorojimas

## Užduotis

Sukurkite MCP įrankį ir darbo srautą dokumentų apdorojimo sistemai, kuri:

1. Priima dokumentus keliais formatais (PDF, DOCX, TXT)
2. Ištraukia tekstą ir pagrindinę informaciją iš dokumentų
3. Klasifikuoja dokumentus pagal tipą ir turinį
4. Generuoja kiekvieno dokumento santrauką

Įgyvendinkite įrankių schemas, klaidų tvarkymą ir darbo srauto modelį, kuris geriausiai tinka šiam scenarijui. Apsvarstykite, kaip testuotumėte šį įgyvendinimą.

## Ištekliai

1. Prisijunkite prie MCP bendruomenės [Azure AI Foundry Discord bendruomenėje](https://aka.ms/foundrydevs), kad sužinotumėte naujausius atnaujinimus
2. Prisidėkite prie atviro kodo [MCP projektų](https://github.com/modelcontextprotocol)
3. Taikykite MCP principus savo įmonės DI iniciatyvose
4. Tyrinėkite specializuotus MCP įgyvendinimus savo pramonės šakoms
5. Apsvarstykite pažangių kursų lankymą apie konkrečias MCP temas, pavyzdžiui, daugiarūšės integraciją ar įmonių taikomųjų programų integraciją
6. Eksperimentuokite kurdami savo MCP įrankius ir darbo srautus naudodamiesi peržiūrėtomis taisyklėmis per [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

## Kas toliau

Toliau: [Atvejų studijos](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba yra laikomas autoritetingu šaltiniu. Kritinei informacijai rekomenduojama naudoti profesionalų žmogaus vertimą. Mes neatsakome už jokias nesusipratimus ar neteisingas interpretacijas, kilusias naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->