# MCP-kehityksen parhaat käytännöt

[![MCP-kehityksen parhaat käytännöt](../../../translated_images/fi/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Napsauta yllä olevaa kuvaa nähdäksesi tämän oppitunnin videon)_

## Yleiskatsaus

Tämä oppitunti keskittyy edistyneisiin parhaisiin käytäntöihin MCP-palvelimien ja ominaisuuksien kehittämisessä, testaamisessa ja käyttöönotossa tuotantoympäristöissä. MCP-ekosysteemien kasvaessa monimutkaisuudeltaan ja merkitykseltään, vakiintuneiden mallien noudattaminen varmistaa luotettavuuden, ylläpidettävyyden ja yhteentoimivuuden. Tämä oppitunti kokoaa käytännön viisautta todellisista MCP-toteutuksista, ohjaten sinua luomaan vankkoja, tehokkaita palvelimia toimivilla resursseilla, kehotteilla ja työkaluilla.

## Oppimistavoitteet

Oppitunnin lopussa osaat:

- Soveltaa alan parhaita käytäntöjä MCP-palvelinten ja ominaisuuksien suunnittelussa
- Luoda kattavat testausstrategiat MCP-palvelimille
- Suunnitella tehokkaita, uudelleenkäytettäviä työnkulkuja monimutkaisiin MCP-sovelluksiin
- Toteuttaa asianmukainen virheenkäsittely, lokitus ja havaittavuus MCP-palvelimissa
- Optimoida MCP-toteutukset suorituskyvyn, tietoturvan ja ylläpidettävyyden osalta

## MCP:n ydinkohdat

Ennen syventymistä spesifisiin toteutuskäytäntöihin on tärkeää ymmärtää MCP-kehitystä ohjaavat ydinkohdat:

1. **Standardoitu viestintä**: MCP perustuu JSON-RPC 2.0:aan tarjoten yhdenmukaisen rakenteen pyynnöille, vastauksille ja virheenkäsittelylle kaikissa toteutuksissa.

2. **Käyttäjäkeskeinen suunnittelu**: Priorisoi aina käyttäjän suostumus, hallinta ja läpinäkyvyys MCP-toteutuksissasi.

3. **Tietoturva ensin**: Toteuta vahvat suojaustoimenpiteet, mukaan lukien tunnistus, valtuutus, validointi ja nopeusrajoitukset.

4. **Modulaarinen arkkitehtuuri**: Suunnittele MCP-palvelimesi modulaarisesti niin, että jokaisella työkalulla ja resurssilla on selkeä ja tarkoin määritelty tarkoitus.

5. **Tilaa ylläpitävät yhteydet**: Hyödynnä MCP:n kykyä ylläpitää tilaa monien pyyntöjen välillä johdonmukaisempia ja kontekstuaalisesti tietoisempia vuorovaikutuksia varten.

## Viralliset MCP:n parhaat käytännöt

Seuraavat parhaat käytännöt on johdettu virallisesta Model Context Protocol -dokumentaatiosta:

### Tietoturvan parhaat käytännöt

1. **Käyttäjän suostumus ja hallinta**: Vaadi aina käyttäjän selkeä suostumus ennen tietojen käyttöä tai toimien suorittamista. Tarjoa selkeä ohjaus siihen, mitä tietoja jaetaan ja mitkä toimenpiteet ovat sallittuja.

2. **Tietosuoja**: Näytä käyttäjätiedot vain selkeällä suostumuksella ja suojaa ne asianmukaisin käyttöoikeuksin. Estä luvaton tiedonsiirto.

3. **Työkalujen turvallisuus**: Vaadi käyttäjän yksiselitteinen suostumus ennen kunkin työkalun kutsumista. Varmista, että käyttäjät ymmärtävät kunkin työkalun toiminnallisuuden ja täytä vahvat suojarajat.

4. **Työkalujen käyttöoikeuksien hallinta**: Määritä, mitä työkaluja malli saa käyttää istunnon aikana, varmistaen, että vain nimenomaisesti valtuutetut työkalut ovat käytettävissä.

5. **Tunnistus**: Vaadi asianmukainen tunnistautuminen ennen pääsyn myöntämistä työkaluihin, resursseihin tai arkaluonteisiin toimintoihin käyttämällä API-avaimia, OAuth-tunnuksia tai muita turvallisia tunnistusmenetelmiä.

6. **Parametrien validointi**: Pakota validointi kaikille työkalukutsuissa estääksesi vääränmuotoisen tai haitallisen syötteen päätymisen työkalutoteutuksiin.

7. **Nopeusrajoitukset**: Ota käyttöön nopeusrajoitukset väärinkäytön estämiseksi ja palvelinresurssien oikeudenmukaisen käytön turvaamiseksi.

### Toteutuksen parhaat käytännöt

1. **Kyvykkyyksien neuvottelu**: Yhteyden muodostuksen aikana vaihdetaan tietoa tuetuista ominaisuuksista, protokollaversioista, käytettävissä olevista työkaluista ja resursseista.

2. **Työkalusuunnittelu**: Luo tarkasti kohdennettuja työkaluja, jotka tekevät yhden asian hyvin, älä monoliittisia työkaluja, jotka hoitavat useita tehtäviä.

3. **Virheenkäsittely**: Toteuta standardoidut virheilmoitukset ja koodit ongelmien diagnosoimiseksi, epäonnistumisten pehmeään käsittelyyn ja toteuttavaan palautteeseen.

4. **Lokitus**: Määritä rakenteelliset lokit auditointia, debuggausta ja protokollaintegraatioiden valvontaa varten.

5. **Edistymisen seuranta**: Pitkissä operaatioissa raportoi edistymistiedot joustavien käyttöliittymien mahdollistamiseksi.

6. **Pyyntöjen peruutus**: Salli asiakkaille kesken olevien tarpeettomien tai viivästyvien pyyntöjen peruutus.

## Lisäviitteet

Ajantasaisimman tiedon MCP:n parhaista käytännöistä löydät:

- [MCP-dokumentaatio](https://modelcontextprotocol.io/)
- [MCP-määritelmä (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub-repositorio](https://github.com/modelcontextprotocol)
- [Tietoturvan parhaat käytännöt](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Tietoturvariskit ja niiden torjunta
- [MCP Security Summit -työpaja (Sherpa)](https://azure-samples.github.io/sherpa/) – Käytännön tietoturvakoulutus

## Käytännön toteutusesimerkit

### Työkalusuunnittelun parhaat käytännöt

#### 1. Yhden vastuun periaate

Jokaisella MCP-työkalulla tulee olla selkeä ja tarkoin rajattu tarkoitus. Tee erikoistuneita työkaluja, jotka ovat erinomaisia tietyissä tehtävissä, älä monoliittisia työkaluja, jotka käsittelevät monia asioita.

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

#### 2. Yhtenäinen virheenkäsittely

Toteuta vankka virheenkäsittely informatiivisilla virheilmoituksilla ja asianmukaisilla palautumismekanismeilla.

```python
# Python-esimerkki kattavalla virheenkäsittelyllä
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parametrin validointi
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Turvallisuusvalidointi
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Tietokantaoperaatio aikakatkaisulla
                async with timeout(10):  # 10 sekunnin aikakatkaisu
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Yhteysvirheet voivat olla tilapäisiä
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Kyselyvirheet ovat todennäköisesti asiakasvirheitä
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Anna työkalukohtaisten virheiden kulkea läpi
            raise
        except Exception as e:
            # Kaiken kattava odottamattomien virheiden käsittely
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL-injektion havaitsemisen toteutus
        pass
        
    def _log_error(self, message, error):
        # Virhelokin toteutus
        pass
```

#### 3. Parametrien validointi

Tarkista parametrit aina huolellisesti estääksesi vääränmuotoisen tai haitallisen syötteen.

```javascript
// JavaScript/TypeScript-esimerkki yksityiskohtaisella parametrien validoinnilla
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
    // 1. Varmista parametrin olemassaolo
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Varmista parametrien tyypit
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Varmista parametrien arvot
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Varmista sisällön olemassaolo kirjoitusoperaatiota varten
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Polun turvallisuuden validointi
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Toteutus perustuen validoituihin parametreihin
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Polun turvallisuustarkistuksen toteutus
    // ...
  }
}
```

### Tietoturvan toteutusesimerkit

#### 1. Tunnistus ja valtuutus

```java
// Java-esimerkki todennuksella ja valtuutuksella
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Riippuvuuden injektointi
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
        // 1. Ulosota todennus kontekstista
        String authToken = request.getContext().getAuthToken();
        
        // 2. Todennetaan käyttäjä
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Tarkista valtuutus tietylle toimenpiteelle
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Jatka valtuutetulla toimenpiteellä
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

#### 2. Nopeusrajoitus

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

## Testauksen parhaat käytännöt

### 1. Yksikkötestaus MCP-työkaluille

Testaa työkalusi aina eristetysti, käyttämällä ulkoisten riippuvuuksien mockauksia:

```typescript
// TypeScript-esimerkki työkalun yksikkötestistä
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Luo väärennetty sääpalvelu
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Luo työkalu väärennetyn riippuvuuden kanssa
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Järjestä
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Toimi
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Varmista
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Järjestä
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Toimi ja varmista
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integraatiotestaus

Testaa koko prosessi asiakaspyynnöstä palvelimen vastaukseen:

```python
# Python-integraatiotestin esimerkki
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Käynnistä testipalvelin
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Luo asiakas
        client = McpClient("http://localhost:5000")
        
        # Testaa työkalun löytäminen
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Testaa työkalun suoritus
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Vahvista vastaus
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Siivoa jäljet
        await server.stop()
```

## Suorituskyvyn optimointi

### 1. Välimuististrategiat

Ota käyttöön sopivat välimuistit latenssin ja resurssien käytön vähentämiseksi:

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

#### 2. Riippuvuuksien injektio ja testattavuus

Suunnittele työkalut vastaanottamaan riippuvuudet konstruktori-injektion kautta, tehden niistä testattavia ja määriteltäviä:

```java
// Java-esimerkki riippuvuuden injektiolla
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Riippuvuudet injektoidaan konstruktorin kautta
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Työkalun toteutus
    // ...
}
```

#### 3. Komponoitavat työkalut

Suunnittele työkaluja, joita voidaan yhdistellä monimutkaisempien työnkulkujen luomiseksi:

```python
# Python-esimerkki, joka näyttää koostettavat työkalut
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Toteutus...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Tämä työkalu voi käyttää dataFetch-työkalun tuloksia
    async def execute_async(self, request):
        # Toteutus...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Tämä työkalu voi käyttää dataAnalysis-työkalun tuloksia
    async def execute_async(self, request):
        # Toteutus...
        pass

# Näitä työkaluja voidaan käyttää itsenäisesti tai osana työnkulkua
```

### Skeeman suunnittelun parhaat käytännöt

Skeema on sopimus mallin ja työkalusi välillä. Hyvin suunnitellut skeemat parantavat työkalun käytettävyyttä.

#### 1. Selkeät parametri-kuvaukset

Lisää aina kuvailevaa tietoa jokaisesta parametrista:

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

#### 2. Validointirajoitteet

Sisällytä validointirajoitteet estämään virheelliset syötteet:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Sähköpostiominaisuus, jossa on muotoilun tarkistus
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Ikäominaisuus numeerisilla rajoituksilla
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Lueteltu ominaisuus
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

#### 3. Yhtenäiset vastausrakenteet

Pidä vastausrakenteet yhdenmukaisina helpottaaksesi mallien tulkintaa:

```python
async def execute_async(self, request):
    try:
        # Käsittele pyyntö
        results = await self._search_database(request.parameters["query"])
        
        # Palauta aina johdonmukainen rakenne
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

### Virheenkäsittely

Vankka virheenkäsittely on olennaista MCP-työkalujen luotettavuuden ylläpitämiseksi.

#### 1. Pehmeä virheenkäsittely

Käsittele virheitä asianmukaisilla tasoilla ja anna informatiivisia viestejä:

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

#### 2. Rakenteelliset virhevastaukset

Palauta rakenteellista virhetietoa aina kun mahdollista:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Toteutus
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
        
        // Heitä muut poikkeukset uudelleen ToolExecutionExceptionina
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Uudelleenyrityskäytännöt

Toteuta sopiva uudelleenyritystoiminnallisuus tilapäisten virheiden varalle:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekunnit
    
    while retry_count < max_retries:
        try:
            # Kutsu ulkoista APIa
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Eksponentiaalinen takaisinkytkentä
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Ei-ohimenevä virhe, älä yritä uudelleen
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Suorituskyvyn optimointi

#### 1. Välimuisti

Ota käyttöön välimuisti raskaille operaatioille:

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

#### 2. Asynkroninen käsittely

Hyödynnä asynkronisia ohjelmointimalleja I/O-raskaisissa toiminnoissa:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Pitkään kestäville toiminnoille palauta käsittelytunnus välittömästi
        String processId = UUID.randomUUID().toString();
        
        // Aloita asynkroninen käsittely
        CompletableFuture.runAsync(() -> {
            try {
                // Suorita pitkään kestävä operaatio
                documentService.processDocument(documentId);
                
                // Päivitä status (tyypillisesti tallennetaan tietokantaan)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Palauta välitön vastaus prosessitunnuksella
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Kumppanien status-tarkistustyökalu
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

#### 3. Resurssien rajoitus

Toteuta resurssien kulunvalvonta ylikuormituksen estämiseksi:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Salli 5 pyyntöä sekunnissa
            bucket_size=10        # Salli yllätystilanteet jopa 10 pyyntöön
        )
    
    async def execute_async(self, request):
        # Tarkista, voimmeko jatkaa vai pitääkö odottaa
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Jos odotus on liian pitkä
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Odota sopiva viiveaika
                await asyncio.sleep(delay)
        
        # Kuluta token ja jatka pyyntöä
        self.rate_limiter.consume()
        
        # Kutsu API
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
            
            # Laske aika seuraavaan saatavilla olevaan tokeniin
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Lisää uusia tokeneita kuluneen ajan perusteella
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Tietoturvan parhaat käytännöt

#### 1. Syötteen validointi

Tarkista syöteparametrit aina huolellisesti:

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

#### 2. Valtuutustarkastukset

Toteuta asianmukaiset valtuutustarkastukset:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Hae käyttäjän konteksti pyynnöstä
    UserContext user = request.getContext().getUserContext();
    
    // Tarkista, onko käyttäjällä vaaditut oikeudet
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Tarkista tiettyjen resurssien kohdalla pääsy kyseiseen resurssiin
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Jatka työkalun suorittamista
    // ...
}
```

#### 3. Arkaluonteisten tietojen käsittely

Käsittele arkaluonteista dataa tarkasti:

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
        
        # Hae käyttäjätiedot
        user_data = await self.user_service.get_user_data(user_id)
        
        # Suodata arkaluontoiset kentät ellei niitä erikseen pyydetä JA hyväksytä
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Tarkista valtuutustaso pyyntöympäristöstä
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Luo kopio välttääksesi alkuperäisen muokkaamisen
        redacted = user_data.copy()
        
        # Peitä tietyt arkaluontoiset kentät
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Peitä sisäkkäiset arkaluontoiset tiedot
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP-työkalujen testauksen parhaat käytännöt

Kattava testaus varmistaa MCP-työkalujen oikean toiminnan, reunatapaukset ja asianmukaisen integraation järjestelmään.

### Yksikkötestaus

#### 1. Testaa kukin työkalu erikseen

Luo tarkkoja testejä kunkin työkalun toiminnolle:

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

#### 2. Skeemavalidoinnin testaus

Testaa, että skeemat ovat valideja ja toteuttavat rajoitteet asianmukaisesti:

```java
@Test
public void testSchemaValidation() {
    // Luo työkalun ilmentymä
    SearchTool searchTool = new SearchTool();
    
    // Hae skeema
    Object schema = searchTool.getSchema();
    
    // Muunna skeema JSON-muotoon validoitavaksi
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Varmista, että skeema on kelvollinen JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Testaa kelvolliset parametrit
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Testaa puuttuva pakollinen parametri
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Testaa virheellinen parametrin tyyppi
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Virheenkäsittelytestit

Laadi erityisiä testejä virhetilanteille:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Järjestä
    tool = ApiTool(timeout=0.1)  # Erittäin lyhyt aikakatkaisu
    
    # Simuloi pyyntö, joka aikakatkeaa
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Pidempi kuin aikakatkaisu
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Toimi ja väitä
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Tarkista poikkeusviesti
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Järjestä
    tool = ApiTool()
    
    # Simuloi rajoitettu vaste
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
        
        # Toimi ja väitä
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Varmista, että poikkeus sisältää rajoitustiedot
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integraatiotestaus

#### 1. Työkaluketjutestaus

Testaa työkalujen yhteistoimintaa odotetuissa yhdistelmissä:

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

#### 2. MCP-palvelimen testaus

Testaa MCP-palvelin täydellisellä työkalujen rekisteröinnillä ja suorittamisella:

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
        // Testaa löytöpiste
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Luo työkalupyyntö
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Lähetä pyyntö ja tarkista vastaus
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Luo virheellinen työkalupyyntö
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Puuttuva parametri "b"
        request.put("parameters", parameters);
        
        // Lähetä pyyntö ja tarkista virhevaste
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-end -testaus

Testaa koko työnkulut mallikehotteesta työkalun suorittamiseen:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Järjestä - Aseta MCP-asiakas ja tee mallin simulointi
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Simuloi mallin vastaukset
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
    
    # Simuloi säätyökalun vastaus
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
        
        # Toimi
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Varmista
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Suorituskykytestaus

#### 1. Kuormitustestaus

Testaa, kuinka monta rinnakkaista pyyntöä MCP-palvelimesi kykenee käsittelemään:

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

#### 2. Stressitestaus

Testaa järjestelmä äärikuormituksen alla:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Aseta JMeter kuormitustestiä varten
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Määritä JMeter-testisuunnitelma
    HashTree testPlanTree = new HashTree();
    
    // Luo testisuunnitelma, säikeiden ryhmä, otokset jne.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Lisää HTTP-otanta työkalun suorittamiseksi
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Lisää kuuntelijat
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Suorita testi
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Vahvista tulokset
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Keskimääräinen vastausaika < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. persentiili < 500ms
}
```

#### 3. Valvonta ja profilointi

Ota käyttöön valvonta pitkän aikavälin suorituskykyanalyysiä varten:

```python
# Määritä valvonta MCP-palvelimelle
def configure_monitoring(server):
    # Määritä Prometheus-mittarit
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
    
    # Lisää middleware ajastusta ja mittareiden tallentamista varten
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Tarjoa mittareiden päätepiste
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP-työnkulkumallit

Hyvin suunnitellut MCP-työnkulut tehostavat tehokkuutta, luotettavuutta ja ylläpidettävyyttä. Tässä keskeiset mallit:

### 1. Työkaluketjumalli

Kytke työkalut peräkkäin niin, että yhden työkalun tulos on seuraavan syöte:

```python
# Python-työkaluketjun toteutus
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Suoritettavien työkalujen nimet listana
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Suorita jokainen työkalu ketjussa, välitä edellinen tulos
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Tallenna tulos ja käytä syötteenä seuraavalle työkalulle
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Esimerkkikäyttö
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

### 2. Lähettäjämalli

Käytä keskitettyä työkalua, joka lähettää syötteen erikoistyökaluille:

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

### 3. Rinnakkaiskäsittelymalli

Suorita useita työkaluja samanaikaisesti tehokkuuden lisäämiseksi:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Vaihe 1: Hae aineiston metatiedot (synkroninen)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Vaihe 2: Käynnistä useita analyyseja rinnakkain
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
        
        // Odota kaikkien rinnakkaisten tehtävien valmistumista
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Odota valmistumista
        
        // Vaihe 3: Yhdistä tulokset
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Vaihe 4: Luo yhteenvetoraportti
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Palauta kokonainen työnkulun tulos
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Virheen palautumismalli

Toteuta pehmeät vararatkaisumallit työkalujen epäonnistumisien varalle:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Kokeile ensin ensisijaista työkalua
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Kirjaa virhe
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Siirry varatyökaluun
            try:
                # Saattaa olla tarpeen muuntaa parametreja varatyökalulle
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Molemmat työkalut epäonnistuivat
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Tämä toteutus riippuisi kyseisistä työkaluista
        # Tässä esimerkissä palautamme vain alkuperäiset parametrit
        return params

# Esimerkkikäyttö
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Ensisijainen (maksullinen) sää-API
        "basicWeatherService",    # Varatyökalu (ilmainen) sää-API
        {"location": location}
    )
```

### 5. Työnkulun koostamismalli

Rakenna monimutkaisia työnkulkuja yhdistämällä yksinkertaisempia:

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

# MCP-palvelinten testaus: parhaat käytännöt ja vinkit

## Yleiskatsaus

Testaus on keskeinen osa luotettavien, korkealaatuisten MCP-palvelimien kehitystä. Tämä opas tarjoaa kattavat parhaat käytännöt ja vinkit MCP-palvelimiesi testaamiseen koko kehitysprosessin ajan, yksikkötesteistä integraatiotesteihin ja loppukäyttäjän validointiin.

## Miksi testaus on tärkeää MCP-palvelimille

MCP-palvelimet toimivat tärkeänä välikerroksena tekoälymallien ja asiakassovellusten välillä. Huolellinen testaus varmistaa:

- Luotettavuuden tuotantoympäristöissä
- Tarkkuuden pyyntöjen ja vastausten käsittelyssä
- MCP-määrittelyjen oikean toteutuksen
- Kestävyyden virheitä ja reunatapauksia vastaan
- Johdonmukaisen suorituskyvyn eri kuormissa

## Yksikkötestaus MCP-palvelimille

### Yksikkötestaus (Perusta)

Yksikkötestit tarkistavat MCP-palvelimen komponenttien toiminnan eristyksissä.

#### Mitä testata

1. **Resurssinkäsittelijät**: Testaa jokaisen resurssinkäsittelijän logiikka erikseen
2. **Työkalutoteutukset**: Tarkista työkalujen toimintaa eri syötteillä
3. **Kehottelupohjat**: Varmista kehotteiden oikea renderöinti
4. **Skeemavalidointi**: Testaa parametrien validointilogiikka
5. **Virheenkäsittely**: Vahvista virhevastaukset virheellisille syötteille

#### Yksikkötestauksen parhaat käytännöt

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
# Esimerkki yksikkötestistä laskin työkalulle Pythonissa
def test_calculator_tool_add():
    # Järjestä
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Toimi
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Vahvista
    assert result["value"] == 12
```

### Integraatiotestaus (Välikerros)

Integraatiotestit tarkistavat MCP-palvelimen komponenttien väliset vuorovaikutukset.

#### Mitä testata

1. **Palvelimen käynnistys**: Testaa palvelimen aloitus eri konfiguraatioilla
2. **Reittien rekisteröinti**: Varmista, että kaikki päätepisteet on rekisteröity oikein
3. **Pyynnön käsittely**: Testaa koko pyyntö-vastaus -syklin toimivuus
4. **Virheiden välitys**: Varmista, että virheet käsitellään oikein komponenttien välillä
5. **Tunnistus ja valtuutus**: Testaa tietoturvamekanismit

#### Integraatiotestauksen parhaat käytännöt

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

### End-to-end -testaus (Ylin kerros)

End-to-end -testit tarkistavat koko järjestelmän toiminnan asiakkaalta palvelimelle.

#### Mitä testata

1. **Asiakas-palvelin -kommunikaatio**: Testaa kokonaiset pyyntö-vastaus-kiertoja
2. **Aitojen SDK:iden käyttö**: Testaa oikeilla asiakasjärjestelmillä
3. **Suorituskyky kuormituksessa**: Tarkista toimintakyky monilla rinnakkaispyynnöillä
4. **Virhepalautus**: Testaa järjestelmän palaaminen virheistä
5. **Pitkäkestoiset operaatiot**: Varmista suoratoisto- ja pitkien toimintojen käsittely

#### End-to-end -testauksen parhaat käytännöt

```typescript
// Esimerkki E2E-testaus asiakkaalla TypeScriptissä
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Käynnistä palvelin testausympäristössä
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Toimi
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Vahvista
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mockausstrategiat MCP-testauksessa

Mockaus on välttämätöntä komponenttien eristykseen testeissä.

### Mockattavat komponentit

1. **Ulkoiset tekoälymallit**: Mockaa mallivastaukset ennustettavaa testausta varten
2. **Ulkoiset palvelut**: Mockaa API-riippuvuudet (tietokannat, kolmannen osapuolen palvelut)
3. **Tunnistuspalvelut**: Mockaa identiteetin tarjoajat
4. **Resurssitoimittajat**: Mockaa kustannustehokkaat resurssinkäsittelijät

### Esimerkki: tekoälymallin vastauksen mockaus

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
# Python-esimerkki unittest.mockilla
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Määritä mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Käytä mockia testissä
    server = McpServer(model_client=mock_model)
    # Jatka testillä
```

## Suorituskykytestaus

Suorituskykytestaus on tärkeää tuotantokelpoisille MCP-palvelimille.

### Mitä mitata

1. **Viive**: Vastausaika pyynnöille
2. **Kapasiteetti**: Käsitellyt pyynnöt sekunnissa
3. **Resurssien käyttö**: CPU, muisti, verkon käyttö
4. **Rinnakkaisuuden hallinta**: Käytös samanaikaisten pyyntöjen kanssa
5. **Skaalautuvuus**: Suorituskyky kuormituksen kasvaessa

### Työkalut suorituskykytestaukseen

- **k6**: Avoimen lähdekoodin kuormitustestaustyökalu
- **JMeter**: Kattava suorituskykytestaus
- **Locust**: Python-pohjainen kuormitustestaus
- **Azure Load Testing**: Pilvipohjainen suorituskykytestaus

### Esimerkki: peruskuormitustesti k6:lla

```javascript
// k6-skripti MCP-palvelimen kuormitustestaukseen
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtuaalista käyttäjää
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

## Testiautomaatiot MCP-palvelimille

Testien automaatio varmistaa johdonmukaisen laadun ja nopeammat palautesilmukat.

### CI/CD-integraatio
1. **Suorita yksikkötestit pull-pyynnöissä**: Varmista, etteivät koodimuutokset riko olemassa olevaa toiminnallisuutta  
2. **Integraatiotestit esituotannossa**: Suorita integraatiotestit ennen tuotantoympäristöä  
3. **Suorituskykymittarit**: Ylläpidä suorituskykytasoja regressioiden havaitsemiseksi  
4. **Turvatarkastukset**: Automatisoi turvallisuustestaus osana putkea  

### Esimerkki CI-putkesta (GitHub Actions)

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
  
## MCP-määrityksen vaatimustenmukaisuuden testaus

Varmista, että palvelimesi toteuttaa MCP-määrityksen oikein.

### Keskeiset vaatimustenmukaisuuden osa-alueet

1. **API-päätepisteet**: Testaa vaaditut päätepisteet (/resources, /tools jne.)  
2. **Pyyntö-/vastausmuoto**: Vahvista skeemanmukaisuus  
3. **Virhekoodit**: Tarkista oikeat tilakoodit eri tilanteissa  
4. **Sisältötyypit**: Testaa eri sisältötyyppien käsittely  
5. **Todennusprosessi**: Vahvista määrityksen mukaiset todennusmekanismit  

### Vaatimustenmukaisuustestauspaketti

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
  
## Top 10 vinkkiä tehokkaaseen MCP-palvelimen testaukseen

1. **Testaa työkalumääritelmät erikseen**: Vahvista skeemat erillään työkalulogiiikasta  
2. **Käytä parametrisoituja testejä**: Testaa työkaluja erilaisilla syötteillä, myös ääritapauksilla  
3. **Tarkista virhevastausten käsittely**: Varmista asianmukainen virheenkäsittely kaikissa tunnetuissa virhetilanteissa  
4. **Testaa valtuutuslogiikka**: Varmista asianmukainen pääsynhallinta eri käyttäjärooleille  
5. **Seuraa testikattavuutta**: Pyri kattavaan testaukseen kriittisimmällä koodireitillä  
6. **Testaa suoratoistovastauksia**: Tarkista suoratoiston asianmukainen käsittely  
7. **Simuloi verkkohäiriöitä**: Testaa käyttäytyminen huonoissa verkkoyhteyksissä  
8. **Testaa resurssirajoituksia**: Tarkista toiminta määrärajojen tai nopeusrajoitusten ylittyessä  
9. **Automatisoi regressiotestit**: Rakenna testipaketti, joka suoritetaan jokaisessa koodimuutoksessa  
10. **Dokumentoi testitapaukset**: Pidä selkeät dokumentaatiot testinäkymistä  

## Yleisiä testauksen sudenkuoppia

- **Liiallinen luottamus onnistuneisiin polkuihin**: Muista testata virhetapaukset perusteellisesti  
- **Suorituskykytestaamisen laiminlyönti**: Tunnista pullonkaulat ennen tuotantovaikutuksia  
- **Testaaminen vain eristyksissä**: Yhdistä yksikkö-, integraatio- ja loppukäyttötestit  
- **Puuttellinen API-kattavuus**: Varmista, että kaikki päätepisteet ja ominaisuudet testataan  
- **Epätasaiset testausympäristöt**: Käytä kontteja testausympäristön yhdenmukaisuuden varmistamiseksi  

## Yhteenveto

Kattava testausstrategia on olennaista luotettavien, korkealaatuisten MCP-palvelimien kehityksessä. Parhaiden käytäntöjen ja tässä oppaassa esitettyjen vinkkien avulla voit varmistaa, että MCP-toteutuksesi täyttävät korkeimmat laatu-, luotettavuus- ja suorituskykystandardit.  

## Keskeiset opit

1. **Työkalun suunnittelu**: Noudata yksittäisen vastuun periaatetta, käytä riippuvuussuihkutusta ja suunnittele yhdisteltävyys mielessä  
2. **Skeeman suunnittelu**: Luo selkeät, hyvin dokumentoidut skeemat asianmukaisilla validointirajoituksilla  
3. **Virheenkäsittely**: Toteuta siisti virheenkäsittely, rakenteelliset virhevastaukset ja uudelleenyrittämislogiikka  
4. **Suorituskyky**: Käytä välimuistia, asynkronista käsittelyä ja resurssien rajoittamista  
5. **Turvallisuus**: Käytä perusteellista syötteiden validointia, valtuutustarkastuksia ja arkaluonteisen datan käsittelyä  
6. **Testaus**: Luo kattavat yksikkö-, integraatio- ja loppukäyttötestit  
7. **Työnkulkujen mallit**: Sovella tunnettuja malleja kuten ketjuja, lähetinjärjestelmiä ja rinnakkaiskäsittelyä  

## Harjoitus

Suunnittele MCP-työkalu ja työnkulku asiakirjojen käsittelyjärjestelmälle, joka:

1. Hyväksyy asiakirjat useissa muodoissa (PDF, DOCX, TXT)  
2. Uuttoi tekstiä ja keskeisiä tietoja asiakirjoista  
3. Luokittelee asiakirjat tyypin ja sisällön mukaan  
4. Tuottaa yhteenvedon kustakin asiakirjasta  

Toteuta työkalun skeemat, virheenkäsittely ja työnkulku, joka soveltuu parhaiten tähän tapaukseen. Pohdi myös, miten testaisit tämän toteutuksen.  

## Resurssit

1. Liity MCP-yhteisöön [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) -sivustolla pysyäksesi ajan tasalla viimeisimmistä kehityksistä  
2. Osallistu avoimen lähdekoodin [MCP-projekteihin](https://github.com/modelcontextprotocol)  
3. Sovella MCP-periaatteita oman organisaatiosi tekoälyhankkeissa  
4. Tutki alan erikoistuneita MCP-toteutuksia  
5. Harkitse edistyneitä kursseja MCP:n erityisaiheista, kuten monimodaalinen integraatio tai yrityssovellusten integraatio  
6. Kokeile rakentaa omia MCP-työkaluja ja työnkulkuja [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) -oppaan oppeja hyödyntäen  

## Seuraava

Seuraava: [Tapaustutkimukset](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta ole hyvä ja huomioi, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on katsottava auktoriteettiseksi lähteeksi. Tärkeissä tiedoissa suositellaan ammattilaisen tekemää ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä mahdollisesti aiheutuvista väärinymmärryksistä tai virhetulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->