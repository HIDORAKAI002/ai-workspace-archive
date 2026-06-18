# MCP kūrimo geriausios praktikos

[![MCP kūrimo geriausios praktikos](../../../translated_images/lt/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Spustelėkite aukščiau pateiktą paveikslėlį, kad peržiūrėtumėte šios pamokos vaizdo įrašą)_

## Apžvalga

Ši pamoka skirta pažangioms geriausioms praktikoms, susijusioms su MCP serverių ir funkcijų kūrimu, testavimu ir diegimu gamybinėse aplinkose. Kadangi MCP ekosistemos vis sudėtingesnės ir svarbesnės, laikymasis nustatytų modelių užtikrina patikimumą, prižiūrimumą ir tarpusavio suderinamumą. Ši pamoka apima praktinę patirtį, sukauptą realiose MCP įdiegimuose, padedant jums kurti nepažeidžiamus, efektyvius serverius su veiksmingais ištekliais, užklausomis ir įrankiais.

## Mokymosi tikslai

Pamokos pabaigoje galėsite:

- Taikyti pramonės geriausias praktikas MCP serverių ir funkcijų kūrime
- Kurti išsamias MCP serverių testavimo strategijas
- Kurti efektyvius, pakartotinai naudojamus darbo srautų modelius sudėtingoms MCP programoms
- Įgyvendinti tinkamą klaidų valdymą, registravimą ir observavimą MCP serveriuose
- Optimizuoti MCP įgyvendinimus dėl našumo, saugumo ir prižiūrimumo

## MCP pagrindinės principai

Prieš pasineriant į konkrečias įgyvendinimo praktikas, svarbu suprasti pagrindinius principus, kurie vadovauja veiksmingam MCP kūrimui:

1. **Standartizuotas ryšys**: MCP naudoja JSON-RPC 2.0 kaip pagrindą, užtikrinant nuoseklią užklausų, atsakymų ir klaidų valdymo formą visuose įgyvendinimuose.

2. **Vartotojo poreikių prioritetas**: Visada teikite prioritetą vartotojo sutikimui, kontrolei ir skaidrumui savo MCP įgyvendinimuose.

3. **Saugumas pirmiausia**: Įgyvendinkite tvirtas saugumo priemones, įskaitant autentifikaciją, autorizavimą, patikrinimą ir ribojimą pagal dažnį.

4. **Modulinė architektūra**: Kurkite MCP serverius moduliariai, kur kiekvienas įrankis ir išteklius turi aiškią, tikslinę paskirtį.

5. **Būsena palaikantys ryšiai**: Pasinaudokite MCP gebėjimu palaikyti būseną per kelias užklausas, kad užtikrintumėte darnesnę ir kontekstu pagrįstą sąveiką.

## Oficialios MCP geriausios praktikos

Toliau pateiktos geriausios praktikos yra iš oficialios Model Context Protocol dokumentacijos:

### Saugumo geriausios praktikos

1. **Vartotojo sutikimas ir kontrolė**: Visada reikalaukite aiškaus vartotojo sutikimo prieš prieigą prie duomenų ar operacijų vykdymą. Užtikrinkite aiškią kontrolę, kokie duomenys dalijami ir kokios veiksmai autorizuoti.

2. **Duomenų privatumas**: Rodomas tik aiškiai sutikti vartotojo duomenys ir apsaugokite juos tinkamais prieigos valdymo mechanizmais. Apsaugokite nuo nesankcionuoto duomenų perdavimo.

3. **Įrankių sauga**: Prieš kviečiant bet kurį įrankį, visada reikalaukite aiškaus vartotojo sutikimo. Užtikrinkite, kad vartotojai suprastų kiekvieno įrankio funkcionalumą ir įgyvendinkite tvirtas saugumo ribas.

4. **Įrankių leidimų valdymas**: Konfigūruokite, kokius įrankius modelis gali naudoti sesijos metu, užtikrindami, kad galima pasiekti tik aiškiai autorizuotus įrankius.

5. **Autentifikacija**: Prieigai prie įrankių, išteklių ar jautrių operacijų reikalaukite tinkamos autentifikacijos naudojant API raktus, OAuth žetonus ar kitas saugias autentifikacijos priemones.

6. **Parametro validacija**: Visiems įrankių iškvietimams taikykite validaciją, kad nebūtų perduota netinkama ar kenksminga informacija į įrankių įgyvendinimus.

7. **Dažnio ribojimas**: Įgyvendinkite dažnio ribojimą, kad apsaugotumėte nuo piktnaudžiavimo ir užtikrintumėte serverio išteklių sąžiningą naudojimą.

### Įgyvendinimo geriausios praktikos

1. **Galimybių derinimas**: Prijungiant mainykitės informacija apie palaikomas funkcijas, protokolo versijas, prieinamus įrankius ir išteklius.

2. **Įrankių projektavimas**: Kurkite specializuotus įrankius, kurie atlieka vieną užduotį gerai vietoj monolitinių, kurie tvarko daug skirtingų aspektų.

3. **Klaidų valdymas**: Įgyvendinkite standartizuotas klaidų žinutes ir kodus, padedančius diagnozuoti problemas, tvarkyti klaidas sklandžiai ir pateikti veiksmingą atsakymą.

4. **Registravimas**: Nustatykite struktūrizuotą registravimą audito, derinimo ir protokolo sąveikų stebėsenai.

5. **Progreso sekimas**: Ilgai trunkančiose operacijose praneškite apie pažangą, kad būtų užtikrinta ypač jautri vartotojo sąsaja.

6. **Užklausos atšaukimas**: Leiskite klientams atšaukti užklausas, kurios nebereikalingos arba užtrunka per ilgai.

## Papildomi šaltiniai

Naujausią informaciją apie MCP geriausias praktikas rasite:

- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub saugykla](https://github.com/modelcontextprotocol)
- [Saugumo geriausios praktikos](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Saugumo rizikos ir jų šalinimas
- [MCP Saugumo viršūnių susitikimo dirbtuvės (Sherpa)](https://azure-samples.github.io/sherpa/) – praktinis saugumo mokymas

## Praktiniai įgyvendinimo pavyzdžiai

### Įrankių projektavimo geriausios praktikos

#### 1. Vieno atsakomybės principas

Kiekvienas MCP įrankis turi turėti aiškią, specializuotą paskirtį. Vietoje monolitinių įrankių, kurie bando spręsti daug skirtingų klausimų, kurkite specializuotus įrankius, kurie puikiai atlieka konkrečias užduotis.

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

#### 2. Nuoseklus klaidų valdymas

Įgyvendinkite tvirtą klaidų valdymą su informatyviomis klaidų žinutėmis ir tinkamomis atkūrimo priemonėmis.

```python
# Python pavyzdys su išsamiu klaidų valdymu
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parametrų tikrinimas
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Saugumo tikrinimas
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
                # Užklausos klaidos tikėtina yra kliento klaidos
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Leisti įrankiui specifines klaidas praeiti
            raise
        except Exception as e:
            # Bendras fiksavimas netikėtoms klaidoms
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL injekcijos nustatymo įgyvendinimas
        pass
        
    def _log_error(self, message, error):
        # Klaidos žurnalo įgyvendinimas
        pass
```

#### 3. Parametrų validacija

Visada kruopščiai validuokite parametrus, kad būtų išvengta netinkamos ar kenksmingos įvesties.

```javascript
// JavaScript/TypeScript pavyzdys su detalia valida parametrų tikrinimu
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

#### 1. Autentifikacija ir autorizavimas

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
        // 1. Ištraukti autentifikavimo kontekstą
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
        
        // 4. Vykdyti autorizuotą operaciją
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

#### 2. Dažnio ribojimas

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

Visada testuokite įrankius izoliuotai, naudodami imitacijas išorinėms priklausomybėms:

```typescript
// TypeScript įrankio vieneto testavimo pavyzdys
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Sukurti melagingą oro sąlygų paslaugą
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Sukurti įrankį su melagingu priklausomybės objektu
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Paruošti
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Veikti
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Patvirtinti
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Paruošti
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Veikti ir patvirtinti
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integracinis testavimas

Testuokite pilna srautą nuo kliento užklausų iki serverio atsakymų:

```python
# Python integracijos testų pavyzdys
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Paleisti testų serverį
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Sukurti klientą
        client = McpClient("http://localhost:5000")
        
        # Išbandyti įrankio radimą
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Išbandyti įrankio vykdymą
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Patikrinti atsakymą
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Sutvarkyti po testų
        await server.stop()
```

## Našumo optimizavimas

### 1. Talpyklos (caching) strategijos

Įgyvendinkite tinkamą talpyklos naudojimą, kad sumažintumėte delsą ir išteklių sąnaudas:

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

Kurti įrankius, kurie gauna priklausomybes per konstruktorių, kad būtų testuojami ir konfigūruojami:

```java
// Java pavyzdys su priklausomybių injekcija
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Priklausomybės įšvirkščiuojamos per konstruktorių
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

Projektuokite įrankius taip, kad juos būtų galima komponuoti kartu, kuriant sudėtingesnius darbo srautus:

```python
# Python pavyzdys, rodantis sudedamus įrankius
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Įgyvendinimas...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Šis įrankis gali naudoti dataFetch įrankio rezultatus
    async def execute_async(self, request):
        # Įgyvendinimas...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Šis įrankis gali naudoti dataAnalysis įrankio rezultatus
    async def execute_async(self, request):
        # Įgyvendinimas...
        pass

# Šie įrankiai gali būti naudojami nepriklausomai arba kaip darbo eigos dalis
```

### Schemos projektavimo geriausios praktikos

Schema yra sutartis tarp modelio ir jūsų įrankio. Gerai suprojektuotos schemos pagerina įrankio naudojimo patogumą.

#### 1. Aiškūs parametrų aprašymai

Visada įtraukite aprašomąją informaciją kiekvienam parametrui:

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

#### 2. Validacijos apribojimai

Įtraukite validacijos apribojimus, kad būtų išvengta neteisingos įvesties:

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
    
    // Amžiaus savybė su skaitiniais apribojimais
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

#### 3. Nuoseklios grąžinimo struktūros

Išlaikykite nuoseklumą atsakymų struktūrose, kad modeliams būtų lengviau interpretuoti rezultatus:

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

### Klaidų valdymas

Tvirtas klaidų valdymas yra kritiškai svarbus MCP įrankiams patikimumo palaikymui.

#### 1. Sklandus klaidų tvarkymas

Tvarkykite klaidas tinkamu lygiu ir pateikite informatyvias žinutes:

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

#### 2. Struktūrizuoti klaidų atsakymai

Kiek įmanoma, grąžinkite struktūrizuotą klaidų informaciją:

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
        
        // Perkrauti kitas išimtis kaip ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Pakartotinių bandymų logika

Įgyvendinkite tinkamą pakartotinių bandymų logiką laikiniems gedimams:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekundės
    
    while retry_count < max_retries:
        try:
            # Skambinti išoriniam API
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
            # Netemporinė klaida, bandyti iš naujo nereikia
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Našumo optimizavimas

#### 1. Talpyklos naudojimas

Įgyvendinkite talpyklą reikalaujančioms daugybę resursų operacijoms:

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

Naudokite asinchroninius programavimo modelius I/O pagrįstoms operacijoms:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Ilgai trunkančioms operacijoms iškart grąžinkite apdorojimo ID
        String processId = UUID.randomUUID().toString();
        
        // Pradėti asinchroninį apdorojimą
        CompletableFuture.runAsync(() -> {
            try {
                // Atlikti ilgai trunkančią operaciją
                documentService.processDocument(documentId);
                
                // Atnaujinti būseną (dažniausiai saugoma duomenų bazėje)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Grąžinti tiesioginį atsakymą su procesų ID
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Papildomas būsenos tikrinimo įrankis
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

Įgyvendinkite išteklių ribojimą, kad išvengtumėte apkrovos:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Leidžiama 5 užklausos per sekundę
            bucket_size=10        # Leidžiama pikai iki 10 užklausų
        )
    
    async def execute_async(self, request):
        # Patikrinkite, ar galime tęsti, ar reikia laukti
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Jei laukti per ilgai
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Palaukite tinkamą vėlavimo laiką
                await asyncio.sleep(delay)
        
        # Suvartokite žetoną ir tęskite užklausą
        self.rate_limiter.consume()
        
        # Iškvieskite API
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
            
            # Apskaičiuokite laiką iki kito žetono prieinamumo
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Pridėkite naujus žetonus pagal praėjusį laiką
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Saugumo geriausios praktikos

#### 1. Įvesties validacija

Visada kruopščiai validuokite įvesties parametrus:

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
    
    // Konkretiems ištekliams patikrinti prieigą prie to ištekliaus
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Tęsti įrankio vykdymą
    // ...
}
```

#### 3. Jautrių duomenų tvarkymas

Tvarkykite jautrius duomenis atsargiai:

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
        
        # Filtruoti jautrius laukus, nebent tai būtų aiškiai prašoma IR autorizuota
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Patikrinti autorizacijos lygį užklausos kontekste
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Sukurti kopiją, kad nebūtų keičiama originali versija
        redacted = user_data.copy()
        
        # Užtušuoti konkrečius jautrius laukus
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Užtušuoti įdėtus jautrius duomenis
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Testavimo geriausios praktikos MCP įrankiams

Išsamus testavimas užtikrina, kad MCP įrankiai veiktų tinkamai, tvarkytų kraštutinius atvejus ir tinkamai integruotųsi su likusia sistema.

### Vienetinis testavimas

#### 1. Testuokite kiekvieną įrankį izoliuotai

Sukurkite specializuotus testus kiekvienos įrankio funkcijoms:

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

#### 2. Schemos validacijos testavimas

Testuokite, ar schemos yra galiojančios ir tinkamai taiko apribojimus:

```java
@Test
public void testSchemaValidation() {
    // Sukurkite įrankio egzempliorių
    SearchTool searchTool = new SearchTool();
    
    // Gaukite schemą
    Object schema = searchTool.getSchema();
    
    // Konvertuokite schemą į JSON validacijai
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Patikrinkite, ar schema yra galiojantis JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Išbandykite galiojančius parametrus
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Išbandykite trūkstamą privalomą parametrą
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Išbandykite netinkamą parametro tipą
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Klaidos valdymo testai

Sukurkite specifinius testus klaidų sąlygoms:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Surinkti
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
        
        # Vykdyti ir patvirtinti
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Patikrinti išimties pranešimą
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Surinkti
    tool = ApiTool()
    
    # Imituoti greičio ribojimo atsakymą
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
        
        # Vykdyti ir patvirtinti
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Patikrinti, ar išimtis turi greičio ribojimo informaciją
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integracinis testavimas

#### 1. Įrankių grandinės testavimas

Testuokite įrankius dirbančius kartu numatytomis kombinacijomis:

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

Testuokite MCP serverį su pilnu įrankių registravimu ir vykdymu:

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
        
        // Siųsti užklausą ir patikrinti atsakymą
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Sukurti neteisingą įrankio užklausą
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Trūksta parametro "b"
        request.put("parameters", parameters);
        
        // Siųsti užklausą ir patikrinti klaidos atsakymą
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Pabaigos iki pabaigos testavimas

Testuokite pilnus darbo srautus nuo modelio užklausos iki įrankio vykdymo:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Tvarkyti - Nustatyti MCP klientą ir imituoti modelį
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Imituoti modelio atsakymus
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
    
    # Imituoti oro sąlygų įrankio atsakymą
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
        
        # Veikti
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

Testuokite, kiek lygiagrečių užklausų gali apdoroti jūsų MCP serveris:

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

#### 2. Streso testavimas

Testuokite sistemą esant ekstremaliai apkrovai:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Paruošti JMeter stresiniam testavimui
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Konfigūruoti JMeter testavimo planą
    HashTree testPlanTree = new HashTree();
    
    // Sukurti testavimo planą, gijų grupę, mėgintuvėlius ir pan.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Pridėti HTTP mėgintuvėlį įrankio vykdymui
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

#### 3. Stebėsena ir profiliavimas

Nustatykite stebėseną ilgalaikei našumo analizei:

```python
# Konfigūruoti MCP serverio stebėjimą
def configure_monitoring(server):
    # Nustatyti Prometheus metrikas
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
    
    # Pridėti tarpinę programinę įrangą, skirtą laiko matavimui ir metrikų registravimui
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Atidengti metrikų galinį tašką
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP darbo srautų projektavimo modeliai

Gerai suprojektuoti MCP darbo srautai pagerina efektyvumą, patikimumą ir prižiūrimumą. Čia pateikti svarbūs modeliai, kurių verta laikytis:

### 1. Įrankių grandinės modelis

Jungia kelis įrankius nuosekliai, kur kiekvieno įrankio išvestis tampa kito įvestimi:

```python
# Python įrankių grandinės įgyvendinimas
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Įrankių pavadinimų sąrašas, kuriuos vykdyti iš eilės
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Vykdyti kiekvieną grandinės įrankį, perduodant ankstesnį rezultatą
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Išsaugoti rezultatą ir naudoti kaip įvestį kitam įrankiui
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Pavyzdžio naudojimas
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

### 2. Išsiuntėjo modelis

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

Vykdykite kelis įrankius vienu metu siekiant efektyvumo:

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
        
        // 2 žingsnis: Paleisti kelias analizės lygiagrečiai
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
        
        // Laukti, kol visos lygiagrečios užduotys bus baigtos
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Laukti užbaigimo
        
        // 3 žingsnis: Sujungti rezultatus
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // 4 žingsnis: Generuoti santraukos ataskaitą
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Grąžinti pilną darbo eigos rezultatą
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Klaidų atstatymo modelis

Įgyvendinkite sklandžius atsarginius variantus įrankių gedimams:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Pirmiausia išbandykite pagrindinį įrankį
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Užfiksuokite nesėkmę
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Pereikite prie atsarginio įrankio
            try:
                # Gali prireikti transformuoti parametrus atsarginio įrankio atveju
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
        # Ši implementacija priklausytų nuo konkrečių įrankių
        # Šiame pavyzdyje tiesiog grąžinsime originalius parametrus
        return params

# Pavyzdinis naudojimas
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Pagrindinis (mokamas) oro sąlygų API
        "basicWeatherService",    # Atsarginis (nemokamas) oro sąlygų API
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

# MCP serverių testavimas: geriausios praktikos ir svarbiausi patarimai

## Apžvalga

Testavimas yra kritiškai svarbi MCP serverių kūrimo dalis, siekiant užtikrinti patikimumą ir aukštą kokybę. Šis vadovas pateikia išsamias geriausias praktikas ir patarimus MCP serverių testavimui viso kūrimo ciklo metu – nuo vienetinių testų iki integracinių ir pilno veikimo patikrinimų.

## Kodėl testavimas svarbus MCP serveriams

MCP serveriai yra svarbus posistemis tarp dirbtinio intelekto modelių ir klientų programėlių. Kruopštus testavimas užtikrina:

- Patikimumą gamybos aplinkose
- Teisingą užklausų ir atsakymų apdorojimą
- Tinkamą MCP specifikacijų įgyvendinimą
- Atsparumą gedimams ir ribinėms situacijoms
- Nuoseklų našumą įvairiomis apkrovomis

## Vienetiniai MCP serverių testai

### Vienetinis testavimas (pagrindas)

Vienetiniai testai tikrina atskirus jūsų MCP serverio komponentus izoliuotai.

#### Ką testuoti

1. **Išteklių tvarkytuvai**: Testuokite kiekvieno išteklių tvarkytuvo logiką atskirai
2. **Įrankių įgyvendinimai**: Tikrinkite įrankių elgseną su įvairiomis įvestimis
3. **Užklausų šablonai**: Užtikrinkite, kad šablonai teisingai atvaizduojami
4. **Schemos validacija**: Testuokite parametrų validavimo logiką
5. **Klaidų valdymas**: Tikrinkite klaidų atsakymus netinkamai įvestai informacijai

#### Vienetinio testavimo geriausios praktikos

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
    # Paruošti
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Vykdyti
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Patvirtinti
    assert result["value"] == 12
```

### Integracinis testavimas (tarpinis sluoksnis)

Integraciniai testai tikrina sąveikas tarp MCP serverio komponentų.

#### Ką testuoti

1. **Serverio paleidimas**: Testuokite serverio startavimą su skirtingomis konfigūracijomis
2. **Maršrutų registravimas**: Patikrinkite, ar visi galiniai taškai tinkamai užregistruoti
3. **Užklausų apdorojimas**: Testuokite visą užklausų-atsakymų ciklą
4. **Klaidų perdavimas**: Užtikrinkite, kad klaidos teisingai valdomos tarp komponentų
5. **Autentifikacija ir autorizacija**: Testuokite saugumo mechanizmus

#### Integracinio testavimo geriausios praktikos

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

### Pabaigos iki pabaigos testavimas (viršutinis sluoksnis)

Pabaigos iki pabaigos testai tikrina pilną sistemos elgseną nuo kliento iki serverio.

#### Ką testuoti

1. **Kliento ir serverio komunikacija**: Testuokite pilnus užklausų-atsakymų ciklus
2. **Tikri klientų SDK**: Testuokite su tikrais klientų įgyvendinimais
3. **Našumas apkrovos sąlygomis**: Patikrinkite elgseną su daugeliu lygiagrečių užklausų
4. **Klaidų atstatymas**: Testuokite sistemos atkūrimą po gedimų
5. **Ilgai trunkančios operacijos**: Patikrinkite srautinio ir ilgai trunkančio apdorojimo tvarkymą

#### Pabaigos iki pabaigos testavimo geriausios praktikos

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
    
    // Patikrinimas
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP testavimo imitavimo strategijos

Testavimo izoliacijai būtina naudoti imitacijas.

### Kuriuos komponentus imituoti

1. **Išoriniai DI modeliai**: Imituokite modelio atsakymus prognozuojamam testavimui
2. **Išorinės paslaugos**: Imituokite API priklausomybes (duomenų bazes, trečiųjų šalių paslaugas)
3. **Autentifikacijos paslaugos**: Imituokite identiteto tiekėjus
4. **Išteklių teikėjai**: Imituokite brangius išteklių tvarkytuvus

### Pavyzdys: DI modelio atsakymo imitavimas

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
    # Sukonfigūruokite imitaciją
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Naudokite imitaciją teste
    server = McpServer(model_client=mock_model)
    # Tęskite testą
```

## Našumo testavimas

Našumo testavimas yra būtinas gamybos MCP serveriams.

### Ką matuoti

1. **Uždelsimas**: Užklausos atsako laikas
2. **Pralaidumas**: Užklausų kiekis per sekundę
3. **Išteklių naudojimas**: CPU, atminties, tinklo naudojimas
4. **Lygiagrečių užklausų valdymas**: Elgsena vykdant lygiagrečiai
5. **Mastelio keitimo charakteristikos**: Našumas didėjant apkrovai

### Našumo testavimo įrankiai

- **k6**: Atviro kodo apkrovos testavimo įrankis
- **JMeter**: Išsamus našumo testavimas
- **Locust**: Į Python pagrįstas apkrovos testavimas
- **Azure apkrovos testavimas**: Debesų našumo testavimas

### Pavyzdys: Pagrindinis apkrovos testas su k6

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

## Testų automatizavimas MCP serveriams

Testų automatizavimas užtikrina nuoseklią kokybę ir greitesnį atsiliepimų ciklą.

### CI/CD integracija

1. **Vienetinių testų vykdymas pull request'uose**: Užtikrinkite, kad kodo pakeitimai nesugadintų esamos funkcionalumo
2. **Integraciniai testai etape**: Vykdykite integracinius testus priešprodukcinėse aplinkose  
3. **Veikimo pagrindai**: Išlaikykite veikimo rodiklių ribas regresijų nustatymui  
4. **Saugumo skenavimai**: Automatizuokite saugumo testavimą kaip proceso dalį  

### Pavyzdinė CI grandinė (GitHub Actions)

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
2. **Užklausos/atsakymo formatas**: Patikrinkite schemos atitikimą  
3. **Klaidų kodai**: Patvirtinkite taisyklingus būsenos kodus įvairioms situacijoms  
4. **Turinio tipai**: Testuokite skirtingų turinio tipų apdorojimą  
5. **Autentifikacijos srautas**: Patikrinkite specifikacijai pritaikytas autentifikacijos mechanizmus  

### Atitikties testų rinkinys

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
2. **Naudokite parametrinius testus**: Testuokite įrankius su įvairiais įėjimais, įskaitant kraštutinius atvejus  
3. **Tikrinkite klaidų atsakymus**: Patvirtinkite tinkamą klaidų tvarkymą visoms galimoms klaidų situacijoms  
4. **Testuokite autorizacijos logiką**: Užtikrinkite tinkamą prieigos kontrolę skirtingoms naudotojų rolėms  
5. **Stebėkite testų aprėptį**: Siekite aukštos kritinių kodo kelių aprėpties  
6. **Testuokite srautinius atsakymus**: Patvirtinkite tinkamą srautinio turinio apdorojimą  
7. **Simuliuokite tinklo problemas**: Testuokite elgseną esant prastam tinklui  
8. **Testuokite resursų apribojimus**: Patikrinkite elgesį pasiekus kvotas ar tempimo ribas  
9. **Automatizuokite regresijos testus**: Sukurkite rinkinį, kuris paleidžiamas su kiekvienu kodo pakeitimu  
10. **Dokumentuokite testų atvejus**: Išlaikykite aiškią testavimo scenarijų dokumentaciją  

## Dažnos testavimo klaidos

- **Per didelis pasikliaujamumas sėkmingais atvejais**: Būtinai kruopščiai testuokite klaidų atvejus  
- **Ignoruojamas veikimo testavimas**: Nustatykite kliūtis prieš jas paveikiant gamybą  
- **Testavimas tik izoliuotai**: Kombinuokite vienetinius, integracinius ir E2E testus  
- **Nevisiška API aprėptis**: Užtikrinkite, kad visi galiniai taškai ir funkcijos būtų ištestuoti  
- **Nenuoseklūs testų aplinkos nustatymai**: Naudokite konteinerius vienodai testavimo aplinkai užtikrinti  

## Išvada

Išsami testavimo strategija yra būtina norint kurti patikimus, aukštos kokybės MCP serverius. Įgyvendindami geriausias praktikas ir patarimus iš šio vadovo, galite užtikrinti, kad jūsų MCP sprendimai atitiktų aukščiausius kokybės, patikimumo ir veikimo standartus.  

## Svarbiausios mintys

1. **Įrankių dizainas**: Vadovaukitės vienos atsakomybės principu, naudokite priklausomybių injekciją ir projektuokite sudedamumui  
2. **Schemų kūrimas**: Kurkite aiškias, gerai dokumentuotas schemas su tinkamomis validacijos sąlygomis  
3. **Klaidų tvarkymas**: Įgyvendinkite gražų klaidų tvarkymą, struktūruotus klaidų atsakymus ir pakartotinio bandymo logiką  
4. **Veikimo kokybė**: Naudokite talpyklavimą, asinchroninį apdorojimą ir resursų ribojimą  
5. **Sauga**: Taikykite nuodugnų įvesties validavimą, autorizacijos patikrinimus ir jautrių duomenų tvarkymą  
6. **Testavimas**: Kurkite išsamius vienetinius, integracinius ir end-to-end testus  
7. **Darbo eigos modeliai**: Naudokite įprastus modelius kaip grandinės, siuntėjai ir lygiagretus apdorojimas  

## Užduotis

Sukurkite MCP įrankį ir darbo eigą dokumentų apdorojimo sistemai, kuri:  

1. Priima dokumentus keliais formatais (PDF, DOCX, TXT)  
2. Ištraukia tekstą ir svarbią informaciją iš dokumentų  
3. Klasifikuoja dokumentus pagal tipą ir turinį  
4. Generuoja dokumentų santraukas  

Įgyvendinkite įrankių schemas, klaidų tvarkymą ir darbo eigos modelį, kuris geriausiai tinka šiai situacijai. Apsvarstykite, kaip testuotumėte šią įgyvendinimą.  

## Ištekliai  

1. Prisijunkite prie MCP bendruomenės [Microsoft Foundry Discord bendruomenėje](https://aka.ms/foundrydevs), kad pasitikrintumėte naujausią informaciją  
2. Dalyvaukite atvirojo kodo [MCP projektuose](https://github.com/modelcontextprotocol)  
3. Taikykite MCP principus savo organizacijos DI iniciatyvose  
4. Tyrinėkite specializuotus MCP sprendimus savo pramonės šakai  
5. Svarstykite pažangių kursų apie specifines MCP temas, pvz., daugiamodulinę integraciją arba įmonių programų integraciją  
6. Eksperimentuokite kurdami savo MCP įrankius ir darbo eigas naudodami principus, išmoktas per [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Kas toliau

Toliau: [Atvejų analizės](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->