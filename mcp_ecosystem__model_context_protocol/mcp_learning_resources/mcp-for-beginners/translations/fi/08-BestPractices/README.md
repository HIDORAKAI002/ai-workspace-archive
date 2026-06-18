# MCP:n kehityksen parhaat käytännöt

[![MCP Development Best Practices](../../../translated_images/fi/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Napsauta yllä olevaa kuvaa katsoaksesi tämän oppitunnin videon)_

## Yleiskatsaus

Tässä oppitunnissa keskitytään edistyneisiin parhaisiin käytäntöihin MCP-palvelinten ja -ominaisuuksien kehittämisessä, testaamisessa ja käyttöönotossa tuotantoympäristöissä. MCP-ekosysteemien kasvaessa monimutkaisemmiksi ja merkityksellisemmiksi, vakiintuneiden mallien noudattaminen takaa luotettavuuden, ylläpidettävyyden ja yhteensopivuuden. Tämä oppitunti kokoaa käytännön viisautta, joka on saatu todellisista MCP-toteutuksista, opastaakseen sinua luomaan vahvoja, tehokkaita palvelimia toimivilla resursseilla, kehotteilla ja työkaluilla.

## Oppimistavoitteet

Tämän oppitunnin lopussa osaat:

- Soveltaa alan parhaita käytäntöjä MCP-palvelinten ja ominaisuuksien suunnittelussa
- Luoda kattavia testausstrategioita MCP-palvelimille
- Suunnitella tehokkaita, uudelleenkäytettäviä työnkulkujen malleja monimutkaisille MCP-sovelluksille
- Toteuttaa asianmukaista virheenkäsittelyä, lokitusta ja havaittavuutta MCP-palvelimissa
- Optimoida MCP-toteutukset suorituskyvyn, turvallisuuden ja ylläpidettävyyden kannalta

## MCP:n ydinperiaatteet

Ennen kuin sukelletaan yksityiskohtaisiin toteutuskäytäntöihin, on tärkeää ymmärtää MCP-kehityksen keskeiset periaatteet:

1. **Standardoitu viestintä**: MCP perustuu JSON-RPC 2.0 -protokollaan, joka tarjoaa johdonmukaisen muodon pyyntöihin, vastauksiin ja virheenkäsittelyyn kaikissa toteutuksissa.

2. **Käyttäjäkeskeinen suunnittelu**: Priorisoi aina käyttäjän suostumus, hallinta ja läpinäkyvyys MCP-toteutuksissasi.

3. **Turvallisuus ensin**: Toteuta vahvoja turvallisuustoimia, kuten tunnistus, valtuutus, validointi ja käytön rajoitus.

4. **Modulaarinen arkkitehtuuri**: Suunnittele MCP-palvelimesi modulaarisesti siten, että jokaisella työkalulla ja resurssilla on selkeä ja tarkoin rajattu tarkoitus.

5. **Tilalliset yhteydet**: Hyödynnä MCP:n kykyä ylläpitää tilaa useiden pyyntöjen yli johdonmukaisempien ja kontekstia ymmärtävien vuorovaikutusten mahdollistamiseksi.

## Viralliset MCP:n parhaat käytännöt

Seuraavat parhaat käytännöt perustuvat viralliseen Model Context Protocol -dokumentaatioon:

### Turvallisuuden parhaat käytännöt

1. **Käyttäjän suostumus ja hallinta**: Vaadi aina nimenomainen käyttäjän suostumus ennen tietojen käyttöä tai toimien suorittamista. Tarjoa selkeä hallinta siitä, mitä tietoja jaetaan ja mitä toimintoja valtuutetaan.

2. **Tietosuoja**: Paljasta käyttäjätietoja vain nimenomaisella suostumuksella ja suojaa niitä asianmukaisilla käyttöoikeusvalvonnalla. Estä luvattomat tiedonsiirrot.

3. **Työkalujen turvallisuus**: Vaadi käyttäjän selvä suostumus ennen minkä tahansa työkalun kutsumista. Varmista, että käyttäjät ymmärtävät kunkin työkalun toiminnallisuuden ja toteuta vahvat turvallisuusrajat.

4. **Työkalulupien hallinta**: Määritä, mitä työkaluja malli saa käyttää istunnon aikana siten, että vain nimenomaisesti valtuutetut työkalut ovat saatavilla.

5. **Tunnistus**: Vaadi asianmukaista tunnistautumista ennen työkalujen, resurssien tai arkaluontoisten toimintojen käyttöä käyttäen API-avaimia, OAuth-tokeneja tai muita turvallisia tunnistusmenetelmiä.

6. **Parametrien validointi**: Pakota validointi kaikille työkalukutsuissa, jotta virheelliset tai haitalliset syötteet eivät pääse työkalutoteutuksiin.

7. **Käytön rajoitus**: Toteuta käytön rajoituksia väärinkäytön estämiseksi ja palvelinresurssien reilun käytön takaamiseksi.

### Toteutuksen parhaat käytännöt

1. **Ominaisuuksien neuvottelu**: Yhteyden muodostuksen yhteydessä vaihdetaan tietoa tuetuista ominaisuuksista, protokollaversioista, saatavilla olevista työkaluista ja resursseista.

2. **Työkalujen suunnittelu**: Luo tarkasti kohdistettuja työkaluja, jotka tekevät yhden asian hyvin, sen sijaan että tekisit yleiskäyttöisiä työkaluja, jotka käsittelevät useita asioita.

3. **Virheenkäsittely**: Toteuta standardoidut virheilmoitukset ja -koodit, jotka auttavat ongelmien diagnosoinnissa, virheiden hallinnassa ja tarjoavat toimivia palautteita.

4. **Lokitus**: Määritä rakenteelliset lokit auditointia, virheenkorjausta ja protokollan vuorovaikutuksen valvontaa varten.

5. **Etenemisen seuranta**: Pitkissä operaatioissa raportoi edistymistietoja, jotta käyttöliittymät voivat reagoida joustavasti.

6. **Pyyntöjen peruuttaminen**: Salli asiakkaiden peruuttaa kesken olevat pyynnöt, joita ei enää tarvita tai jotka kestävät liian kauan.

## Lisäviitteet

Ajantasaisimman tiedon saamiseksi MCP:n parhaista käytännöistä tutustu seuraaviin lähteisiin:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turvallisuusriskit ja niiden ehkäisy
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Käytännön turvallisuuskoulutus

## Käytännön toteutusesimerkkejä

### Työkalusuunnittelun parhaat käytännöt

#### 1. Yhden vastuun periaate

Jokaisella MCP-työkalulla tulee olla selkeä ja tarkastettu tarkoitus. Kehitä erikoistuneita työkaluja, jotka ovat erinomaisia tietyissä tehtävissä, sen sijaan että loisit monoliittisia työkaluja, jotka yrittävät kattaa useita osa-alueita.

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

#### 2. Johdonmukainen virheenkäsittely

Toteuta vahva virheenkäsittely informatiivisilla virheilmoituksilla ja asianmukaisilla palautumismekaniikoilla.

```python
# Python-esimerkki laajalla virheenkäsittelyllä
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parametrien validointi
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Turvallisuuden tarkastus
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
                # Yhteysvirheet voivat olla ohimeneviä
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Kyselyvirheet ovat todennäköisesti asiakasvirheitä
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Anna työkalukohtaisten virheiden läpäistä
            raise
        except Exception as e:
            # Kaikki odottamattomat virheet kiinni
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL-injektioiden tunnistuksen toteutus
        pass
        
    def _log_error(self, message, error):
        # Virhelokin toteutus
        pass
```

#### 3. Parametrien validointi

Validoi aina parametrit huolellisesti estääksesi virheelliset tai haitalliset syötteet.

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
    
    // 4. Varmista sisällön olemassaolo kirjoitustoiminnossa
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Polun turvallisuuden validointi
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Toteutus validoitujen parametrien perusteella
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Polun turvallisuustarkistuksen toteutus
    // ...
  }
}
```

### Turvallisuuden toteutusesimerkkejä

#### 1. Tunnistus ja valtuutus

```java
// Java-esimerkki todennuksella ja valtuutuksella
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Riippuvuussijoitus
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
        // 1. Pura todennus konteksti
        String authToken = request.getContext().getAuthToken();
        
        // 2. Todennus käyttäjä
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Tarkista valtuutus tietylle toiminnolle
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Jatka valtuutetulla toiminnolla
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

#### 2. Käytön rajoitus

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

Testaa työkalut eristetysti, käyttäen ulkopuolisten riippuvuuksien jäljittelyä:

```typescript
// TypeScript-esimerkki työkalun yksikkötestistä
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Luo simuloitu sääpalvelu
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Luo työkalu simuloidulla riippuvuudella
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
    
    // Vahvista
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Järjestä
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Toimi ja vahvista
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integraatiotestaus

Testaa koko virta asiakkaan pyynnöistä palvelimen vastauksiin:

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
        
        # Testaa työkalujen löytyminen
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

Toteuta sopiva välimuisti viiveen ja resurssien käytön vähentämiseksi:

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

#### 2. Riippuvuuksien injektointi ja testattavuus

Suunnittele työkalut niin, että niiden riippuvuudet annetaan konstruktorin kautta, mikä tekee niistä testattavia ja konfiguroitavia:

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

Suunnittele työkaluja, joita voi yhdistää monimutkaisempien työnkulkujen luomiseksi:

```python
# Python-esimerkki yhdisteltävistä työkaluista
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

#### 1. Selkeät parametrien kuvaukset

Sisällytä aina kuvaavia tietoja jokaiselle parametrille:

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
    
    // Sähköpostiominaisuus, jossa muodon validointi
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

#### 3. Johdonmukaiset palauterakenteet

Pidä vastausrakenteet johdonmukaisina, jotta mallit voivat tulkita tuloksia helpommin:

```python
async def execute_async(self, request):
    try:
        # Käsittele pyyntö
        results = await self._search_database(request.parameters["query"])
        
        # Palauta aina yhdenmukainen rakenne
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

Vahva virheenkäsittely on tärkeää MCP-työkalujen luotettavuuden ylläpitämiseksi.

#### 1. Sulava virheenkäsittely

Käsittele virheitä sopivilla tasoilla ja tarjoa informatiivisia viestejä:

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

Palauta rakennevirheitä koskevat tiedot mahdollisuuksien mukaan:

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

#### 3. Uudelleenyritinlogiikka

Toteuta asianmukainen uudelleenyrittomekanismi tilapäisille virheille:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekuntia
    
    while retry_count < max_retries:
        try:
            # Kutsu ulkoista API:a
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Eksponentiaalinen takaisinperuutus
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Ei-tilapäinen virhe, älä yritä uudelleen
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Suorituskyvyn optimointi

#### 1. Välimuisti

Toteuta välimuistit kalliille operaatioille:

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

Hyödynnä asynkronisia ohjelmointimalleja I/O-sidonnaisiin operaatioihin:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Pitkään kestävissä toiminnoissa palauta käsittelytunnus välittömästi
        String processId = UUID.randomUUID().toString();
        
        // Aloita asynkroninen käsittely
        CompletableFuture.runAsync(() -> {
            try {
                // Suorita pitkään kestävä operaatio
                documentService.processDocument(documentId);
                
                // Päivitä tila (tallennetaan tyypillisesti tietokantaan)
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
    
    // Kumppani tilan tarkistustyökalu
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

Toteuta resurssien rajoitus ylikuormituksen ehkäisemiseksi:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Salli 5 pyyntöä sekunnissa
            bucket_size=10        # Salli äkilliset piikit, enintään 10 pyyntöä
        )
    
    async def execute_async(self, request):
        # Tarkista, voimmeko jatkaa vai täytyykö odottaa
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Jos odotus on liian pitkä
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Odota sopiva viive
                await asyncio.sleep(delay)
        
        # Käytä token ja jatka pyyntöä
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
            
            # Laske aika seuraavaan tokenin saatavuuteen
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

### Turvallisuuden parhaat käytännöt

#### 1. Syötteiden validointi

Validoi aina syötteiden parametrit huolellisesti:

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

#### 2. Valtuutustarkistukset

Toteuta asianmukaiset valtuutustarkistukset:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Hanki käyttäjän konteksti pyynnöstä
    UserContext user = request.getContext().getUserContext();
    
    // Tarkista, onko käyttäjällä vaaditut käyttöoikeudet
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Tietyille resursseille tarkista pääsy kyseiseen resurssiin
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Jatka työkalun suoritusta
    // ...
}
```

#### 3. Arkaluonteisten tietojen käsittely

Käsittele arkaluonteisia tietoja huolellisesti:

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
        
        # Suodata arkaluonteiset kentät, ellei niitä erikseen pyydetä JA valtuuteta
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Tarkista valtuutustaso pyyntöyhteydessä
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Luo kopio, jotta alkuperäistä ei muokata
        redacted = user_data.copy()
        
        # Peitä tietyt arkaluonteiset kentät
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Peitä sisäkkäiset arkaluonteiset tiedot
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP-työkalujen testauksen parhaat käytännöt

Kattava testaus varmistaa, että MCP-työkalut toimivat oikein, käsittelevät reunatapaukset ja integroituvat oikein osaksi järjestelmää.

### Yksikkötestaus

#### 1. Testaa jokainen työkalu erikseen

Laadi kohdennettuja testejä kunkin työkalun toiminnallisuudelle:

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

#### 2. Skeeman validointitestaus

Testaa, että skeemat ovat voimassa ja toteuttavat rajoitteet oikein:

```java
@Test
public void testSchemaValidation() {
    // Luo työkaluinstanssi
    SearchTool searchTool = new SearchTool();
    
    // Hae skeema
    Object schema = searchTool.getSchema();
    
    // Muunna skeema JSON-muotoon validointia varten
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Vahvista, että skeema on kelvollinen JSONSchema
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
    
    // Testaa virheellinen parametrityyppi
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Virheenkäsittelyn testit

Laadi erityisiä testejä virhetilanteille:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Järjestä
    tool = ApiTool(timeout=0.1)  # Erittäin lyhyt aikakatkaisu
    
    # Mallinna pyyntö, joka aikakatkaistaan
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Pidempi kuin aikakatkaisu
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Toimi & Varmista
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Varmista poikkeuksen viesti
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Järjestä
    tool = ApiTool()
    
    # Mallinna rajoitetun vasteen
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
        
        # Toimi & Varmista
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Varmista, että poikkeus sisältää rajoitustiedot
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integraatiotestaus

#### 1. Työkaluketjun testaus

Testaa työkalujen yhteistoiminta odotetuissa yhdistelmissä:

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

Testaa MCP-palvelin kokonaisella työkalurekisteröinnillä ja -suorituksella:

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
        // Testaa discoverypiste
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
        
        // Lähetä pyyntö ja varmista vastaus
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
        
        // Lähetä pyyntö ja varmista virhevaste
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Päätä päähän -testaus

Testaa täydelliset työnkulut mallikehotteesta työkalun suoritukseen:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Järjestä - Asenna MCP-asiakas ja mallin simulointi
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Mallin simuloidut vastaukset
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
    
    # Säätiedon työkalun simuloitu vastaus
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
        
        # Vahvista
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Suorituskykytestaus

#### 1. Kuormitustestaus

Testaa kuinka monta rinnakkaista pyyntöä MCP-palvelimesi pystyy käsittelemään:

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

#### 2. Rasitustestaus

Testaa järjestelmän suorituskyky erittäin kuormitetussa tilassa:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Määritä JMeter kuormitustestaukseen
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Konfiguroi JMeter testisuunnitelma
    HashTree testPlanTree = new HashTree();
    
    // Luo testisuunnitelma, säie ryhmä, näytteenottajat, jne.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Lisää HTTP-näytteenottaja työkalun suorittamiseksi
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
    assertTrue(summaryReport.getAverage() < 200); // Keskimääräinen vasteaika < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. prosenttipiste < 500ms
}
```

#### 3. Valvonta ja profilointi

Ota käyttöön valvonta pitkäaikaisen suorituskyvyn analysoimiseksi:

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
    
    # Lisää välikerros ajastamista ja mittareiden tallentamista varten
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Julkaise mittaripäätepiste
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP:n työnkulun suunnittelumallit

Hyvin suunnitellut MCP-työnkulut parantavat tehokkuutta, luotettavuutta ja ylläpidettävyyttä. Tässä avainmallit, joita kannattaa noudattaa:

### 1. Työkaluketjumalli

Yhdistä useita työkaluja peräkkäin niin, että jokaisen työkalun tulos toimii seuraavan syötteenä:

```python
# Python-työkaluketjun toteutus
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Suoritettavien työkalujen nimilista
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Suorita jokainen työkalu ketjussa, välittäen edellinen tulos
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

### 2. Lähettäjä-malli

Käytä keskitettyä työkalua, joka ohjaa syötteen perusteella erikoistuneisiin työkaluihin:

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
        
        // Odota, että kaikki rinnakkaiset tehtävät valmistuvat
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
        
        // Palauta koko työnkulun tulos
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Virheeseen palautumismalli

Toteuta sulavat vararatkaisut työkalujen virheiden varalle:

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
            # Kirjaa epäonnistuminen
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Siirry varatyökaluun
            try:
                # Saattaa olla tarpeen muuttaa parametreja varatyökalua varten
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
        # Tämä toteutus riippuu käytettävistä työkaluista
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

Testaus on keskeinen osa luotettavien, korkealaatuisten MCP-palvelinten kehitystä. Tämä opas tarjoaa kattavat parhaat käytännöt ja vinkit MCP-palvelinten testaamiseen kehityksen kaikissa vaiheissa, yksikkötesteistä integraatiotesteihin ja päästä päähän -varmennuksiin.

## Miksi testaus on tärkeää MCP-palvelimille

MCP-palvelimet toimivat tärkeinä välikerroksina tekoälymallien ja asiakasohjelmien välillä. Perusteellinen testaus varmistaa:

- Luotettavuuden tuotantoympäristöissä
- Tarkkuuden pyyntöjen ja vastausten käsittelyssä
- MCP-määritysten asianmukaisen toteutuksen
- Resilienssin virheitä ja reunatapauksia vastaan
- Johdonmukaisen suorituskyvyn erilaisilla kuormilla

## Yksikkötestaus MCP-palvelimille

### Yksikkötestaus (perusta)

Yksikkötestit tarkistavat MCP-palvelimen yksittäisiä komponentteja erillään.

#### Mitä testata

1. **Resurssien käsittelijät**: Testaa jokaisen resurssin käsittelijän logiikka erikseen
2. **Työkalutoteutukset**: Varmista työkalujen käyttäytyminen eri syötteillä
3. **Kehotemallit**: Varmista kehotemallien oikea renderöinti
4. **Skeeman validointi**: Testaa parametrien validointilogiikkaa
5. **Virheenkäsittely**: Tarkista virhevastausten oikeellisuus virheellisissä syötteissä

#### Parhaat käytännöt yksikkötestauksessa

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
# Esimerkkiyksikkötesti Python-kirjanpitotyökalulle
def test_calculator_tool_add():
    # Järjestely
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Toimi
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Varmista
    assert result["value"] == 12
```

### Integraatiotestaus (välitaso)

Integraatiotestit tarkastavat MCP-palvelimen komponenttien yhteistoimintaa.

#### Mitä testata

1. **Palvelimen käynnistys**: Testaa palvelimen käynnistys eri asetuksilla
2. **Reittien rekisteröinti**: Varmista, että kaikki päätepisteet on rekisteröity oikein
3. **Pyyntöjen käsittely**: Testaa täydellinen pyyntö-vastaus -sykli
4. **Virheiden leviäminen**: Varmista virheiden asianmukainen käsittely eri komponenteissa
5. **Tunnistus ja valtuutus**: Testaa turvallisuusmekanismeja

#### Parhaat käytännöt integraatiotestauksessa

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

### Päätä päähän -testaus (ylätaso)

Päättää päähän -testit tarkistavat koko järjestelmän toiminnan asiakkaasta palvelimeen.

#### Mitä testata

1. **Asiakas-palvelin -viestintä**: Testaa täydelliset pyyntö-vastaus -syklit
2. **Todelliset asiakas-SDK:t**: Testaa oikeilla asiakastoteutuksilla
3. **Suorituskyky kuormassa**: Varmista käyttäytyminen useiden samanaikaisten pyyntöjen aikana
4. **Virheestä palautuminen**: Testaa järjestelmän palautumista virhetilanteista
5. **Pitkät operaatiot**: Varmista streaming- ja pitkien operaatioiden käsittely

#### Parhaat käytännöt päättää päähän -testauksessa

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
    
    // Varmista
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mockausstrategiat MCP-testaukseen

Mockaus on oleellinen komponenttien eristämiseksi testauksen aikana.

### Komponentit, jotka kannattaa mokata

1. **Ulkoiset tekoälymallit**: Mokaamalla mallin vastaukset ennustettaviksi testiä varten
2. **Ulkoiset palvelut**: Mokaamalla API-riippuvuudet (tietokannat, kolmannen osapuolen palvelut)
3. **Tunnistuspalvelut**: Mokaamalla identiteetin tarjoajat
4. **Resurssien tarjoajat**: Mokaamalla kalliita resurssikäsittelijöitä

### Esimerkki: Tekoälymallin vastauksen mockaus

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
# Python-esimerkki unittest.mock-kirjastolla
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Määritä mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Käytä mockia testissä
    server = McpServer(model_client=mock_model)
    # Jatka testin kanssa
```

## Suorituskykytestaus

Suorituskykytestaus on ratkaisevaa tuotantoon tarkoitettujen MCP-palvelimien kohdalla.

### Mitä mitata

1. **Viive**: Vastausaika pyynnöille
2. **Läpäisykyky**: Käsiteltyjen pyyntöjen määrä sekunnissa
3. **Resurssien käyttö**: CPU:n, muistin, verkon käyttö
4. **Rinnakkaiskäsittely**: Käyttäytyminen rinnakkaisissa pyynnöissä
5. **Skaalautuvuus**: Suorituskyky kuorman kasvaessa

### Työkalut suorituskykytestaukseen

- **k6**: Avoimen lähdekoodin kuormitustestaustyökalu
- **JMeter**: Kattava suorituskykytestaus
- **Locust**: Python-pohjainen kuormitustestaus
- **Azure Load Testing**: Pilvipohjainen suorituskykytestaus

### Esimerkki: Peruskuormitustesti k6:lla

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

## Testiautomaation käyttö MCP-palvelimissa

Testien automatisointi varmistaa johdonmukaisen laadun ja nopeammat palautesilmukat.

### CI/CD-integraatio

1. **Suorita yksikkötestit Pull Requestien yhteydessä**: Varmista, ettei koodimuutokset riko olemassa olevaa toiminnallisuutta
2. **Integraatiotestit staging-ympäristössä**: Suorita integraatiotestejä esituotantoympäristöissä  
3. **Suorituskyvyn vertailuarvot**: Ylläpidä suorituskykymittareita regressioiden havaitsemiseksi  
4. **Turvallisuusskannaukset**: Automatisoi turvallisuustestaus osana putkea  

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
  
## Yhteensopivuustestaus MCP-määrityksen kanssa

Varmista, että palvelimesi toteuttaa MCP-määrityksen oikein.

### Keskeiset yhteensopivuusalueet

1. **API-päätepisteet**: Testaa vaaditut päätepisteet (/resources, /tools, jne.)  
2. **Pyyntö/vastausrakenne**: Varmista skeemavaatimusten noudattaminen  
3. **Virhekoodit**: Vahvista oikeat tilakoodit eri tilanteissa  
4. **Sisältötyypit**: Testaa erilaisten sisältötyyppien käsittely  
5. **Autentikointiprosessi**: Vahvista määrityksen mukaiset tunnistusmekanismit  

### Yhteensopivuustestauspaketti

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
  
## Top 10 vinkkiä tehokkaaseen MCP-palvelintestaukseen

1. **Testaa työkalumääritykset erikseen**: Vahvista skeemamääritykset itsenäisesti työkalulogikasta  
2. **Käytä parametrisoituja testejä**: Testaa työkaluja erilaisilla syötteillä, mukaan lukien ääripäät  
3. **Tarkista virhevastaudet**: Varmista virheenkäsittely kaikissa mahdollisissa virhetapauksissa  
4. **Testaa valtuutuslogiikkaa**: Varmista pääsynhallinta eri käyttäjärooleille  
5. **Seuraa testikattavuutta**: Pyri kattavaan testaukseen tärkeimmälle koodipolulle  
6. **Testaa suoratoistovastauksia**: Vahvista suoratoiston oikea käsittely  
7. **Simuloi verkkohäiriöitä**: Testaa toiminta heikoissa verkkoyhteyksissä  
8. **Testaa resurssirajoja**: Vahvista toiminta, kun saavutetaan kiintiöt tai rajoitukset  
9. **Automatisoi regressiotestit**: Rakenna testiportaali, joka suoritetaan jokaisen koodimuutoksen yhteydessä  
10. **Dokumentoi testitapaukset**: Pidä selkeä dokumentaatio testiskenaariosta  

## Yleisiä testauksen sudenkuoppia

- **Liiallinen luottamus onnistuviin skenaarioihin**: Testaa virhetapaukset huolellisesti  
- **Suorituskyvyn testaamisen laiminlyönti**: Tunnista pullonkaulat ennen tuotannon vaikutuksia  
- **Testaus vain eristäytyneesti**: Yhdistä yksikkö-, integraatio- ja loppukäyttötestit  
- **Epäyhtenäinen API-kattavuus**: Varmista, että kaikki päätepisteet ja ominaisuudet on testattu  
- **Epäjohdonmukaiset testiympäristöt**: Käytä kontteja varmistaaksesi yhtenäiset testiympäristöt  

## Yhteenveto

Kattava testausstrategia on olennainen luotettavien, korkealaatuisten MCP-palvelimien kehittämisessä. Noudattamalla tässä oppaassa esitettyjä parhaita käytäntöjä ja vinkkejä voit varmistaa, että MCP-toteutuksesi täyttävät korkeimmat laatu-, luotettavuus- ja suorituskykystandardit.

## Keskeiset opit

1. **Työkalun suunnittelu**: Noudata yhden vastuun periaatetta, käytä riippuvuuden injektiota ja suunnittele koostettavaksi  
2. **Skeeman suunnittelu**: Luo selkeitä, hyvin dokumentoituja skeemoja, joissa on asianmukaiset validointirajoitteet  
3. **Virheenkäsittely**: Toteuta hallittu virheenkäsittely, rakenteelliset virhevastaukset ja uudelleenyrittomekanismit  
4. **Suorituskyky**: Käytä välimuistia, asynkronista käsittelyä ja resurssien rajoituksia  
5. **Turvallisuus**: Käytä perusteellista syötteiden validointia, valtuutustarkastuksia ja arkaluonteisten tietojen käsittelyä  
6. **Testaus**: Luo kattavat yksikkö-, integraatio- ja loppukäyttötestit  
7. **Työnkulkujen mallit**: Käytä hyväksi todettuja malleja, kuten ketjut, välittäjät ja rinnakkainen käsittely  

## Harjoitus

Suunnittele MCP-työkalu ja työnkulku asiakirjojen käsittelyjärjestelmälle, joka:

1. Hyväksyy asiakirjat useissa formaateissa (PDF, DOCX, TXT)  
2. Uuttaa tekstin ja keskeiset tiedot asiakirjoista  
3. Luokittelee asiakirjat tyypin ja sisällön mukaan  
4. Tuottaa yhteenvetoja jokaisesta asiakirjasta  

Toteuta työkalun skeemat, virheenkäsittely ja työnkulun malli, joka sopii parhaiten tähän käyttötapaukseen. Pohdi myös, miten testaisit toteutuksen.

## Resurssit

1. Liity MCP-yhteisöön [Microsoft Foundry Discord Communityssä](https://aka.ms/foundrydevs) pysyäksesi ajan tasalla uusimmista kehityksistä  
2. Osallistu avoimen lähdekoodin [MCP-projekteihin](https://github.com/modelcontextprotocol)  
3. Sovella MCP-periaatteita oman organisaatiosi tekoälyhankkeissa  
4. Tutustu erikoistuneisiin MCP-toteutuksiin omalla toimialallasi  
5. Harkitse edistyneiden kurssien suorittamista tiettyjen MCP-aiheiden, kuten monimuotoisen integraation tai yrityssovellusintegraation, osalta  
6. Kokeile omien MCP-työkalujen ja työnkulkujen rakentamista oppimiesi periaatteiden pohjalta hyödyntäen [Hands on Labia](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Mitä seuraavaksi

Seuraava: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->