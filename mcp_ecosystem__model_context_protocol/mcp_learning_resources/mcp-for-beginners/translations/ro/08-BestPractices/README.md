# Cele mai bune practici pentru dezvoltarea MCP

[![Cele mai bune practici pentru dezvoltarea MCP](../../../translated_images/ro/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Click pe imaginea de mai sus pentru a viziona videoclipul lecției)_

## Prezentare generală

Această lecție se concentrează pe cele mai bune practici avansate pentru dezvoltarea, testarea și implementarea serverelor și funcționalităților MCP în medii de producție. Pe măsură ce ecosistemele MCP devin tot mai complexe și importante, urmarea modelelor stabilite asigură fiabilitate, întreținere și interoperabilitate. Această lecție consolidează înțelepciunea practică obținută din implementările MCP din lumea reală pentru a vă ghida în crearea unor servere robuste, eficiente, cu resurse, solicitări și unelte eficiente.

## Obiective de învățare

La finalul acestei lecții, veți fi capabil să:

- Aplicați cele mai bune practici din industrie în proiectarea serverelor și funcționalităților MCP
- Creați strategii cuprinzătoare de testare pentru serverele MCP
- Proiectați modele eficiente, reutilizabile de workflow pentru aplicații MCP complexe
- Implementați gestionarea corectă a erorilor, logarea și observabilitatea în serverele MCP
- Optimizați implementările MCP pentru performanță, securitate și întreținere

## Principii de bază MCP

Înainte de a aborda practica specifică a implementării, este important să înțelegeți principiile de bază care ghidează dezvoltarea eficientă MCP:

1. **Comunicare standardizată**: MCP folosește JSON-RPC 2.0 ca bază, oferind un format consecvent pentru cereri, răspunsuri și gestionarea erorilor în toate implementările.

2. **Design centrat pe utilizator**: Prioritizați întotdeauna consimțământul, controlul și transparența utilizatorului în implementările MCP.

3. **Securitate înainte de toate**: Implementați măsuri robuste de securitate, inclusiv autentificare, autorizare, validare și limitare a ratei.

4. **Arhitectură modulară**: Proiectați serverele MCP cu o abordare modulară, în care fiecare unealtă și resursă are un scop clar și focusat.

5. **Conexiuni stateful**: Valorificați capacitatea MCP de a menține starea pe mai multe cereri pentru interacțiuni mai coerente și conștiente de context.

## Cele mai bune practici oficiale MCP

Următoarele cele mai bune practici sunt derivate din documentația oficială Model Context Protocol:

### Cele mai bune practici de securitate

1. **Consimțământul și controlul utilizatorului**: Solicitați întotdeauna consimțământ explicit al utilizatorului înainte de a accesa date sau a efectua operațiuni. Oferiți control clar asupra datelor partajate și acțiunilor autorizate.

2. **Confidențialitatea datelor**: Expuneți datele utilizatorului doar cu consimțământ explicit și protejați-le cu controale adecvate de acces. Protejați-vă împotriva transmiterii neautorizate a datelor.

3. **Siguranța uneltelor**: Solicitați consimțământ explicit al utilizatorului înainte de a apela orice unealtă. Asigurați-vă că utilizatorii înțeleg funcționalitatea fiecărei unelte și impuneți limite robuste de securitate.

4. **Controlul permisiunilor uneltelor**: Configurați care unelte pot fi utilizate de un model în timpul unei sesiuni, asigurând că doar uneltele explicit autorizate sunt accesibile.

5. **Autentificare**: Solicitați autentificare corespunzătoare înainte de a acorda acces la unelte, resurse sau operațiuni sensibile folosind chei API, token-uri OAuth sau alte metode sigure.

6. **Validarea parametrilor**: Impuneți validarea pentru toate invocările de unelte pentru a preveni input-ul neformatat corect sau malițios să ajungă la implementarea uneltelor.

7. **Limitarea ratei**: Implementați limitarea ratei pentru a preveni abuzurile și pentru a asigura utilizarea corectă a resurselor serverului.

### Cele mai bune practici de implementare

1. **Negocierea capabilităților**: În timpul configurării conexiunii, schimbați informații despre caracteristicile suportate, versiuni de protocol, unelte și resurse disponibile.

2. **Proiectarea uneltelor**: Creați unelte focusate care fac bine un singur lucru, în loc de unelte monolitice care gestionează mai multe preocupări.

3. **Gestionarea erorilor**: Implementați mesaje și coduri standardizate de eroare pentru a ajuta la diagnosticarea problemelor, gestionarea grațioasă a eșecurilor și oferirea de feedback acționabil.

4. **Logare**: Configurați log-uri structurate pentru auditare, depanare și monitorizarea interacțiunilor protocolului.

5. **Urmărirea progresului**: Pentru operațiuni de durată lungă, raportați actualizări de progres pentru a permite interfețe responsabile cu utilizatorul.

6. **Anularea cererii**: Permiteți clienților să anuleze cererile aflate în zbor care nu mai sunt necesare sau durează prea mult.

## Referințe suplimentare

Pentru cele mai actualizate informații despre cele mai bune practici MCP, consultați:

- [Documentația MCP](https://modelcontextprotocol.io/)
- [Specificația MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repository GitHub](https://github.com/modelcontextprotocol)
- [Cele mai bune practici de securitate](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riscuri de securitate și măsuri de atenuare
- [Workshop Summit MCP de securitate (Sherpa)](https://azure-samples.github.io/sherpa/) - Instruire practică în securitate

## Exemple practice de implementare

### Cele mai bune practici de design al uneltelor

#### 1. Principiul responsabilității unice

Fiecare unealtă MCP trebuie să aibă un scop clar și concentrat. În loc să creați unelte monolitice care încearcă să gestioneze mai multe aspecte, dezvoltați unelte specializate care excelează la sarcini specifice.

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

#### 2. Gestionare consecventă a erorilor

Implementați gestionarea robustă a erorilor cu mesaje informative și mecanisme corespunzătoare de recuperare.

```python
# Exemplu Python cu gestionare completă a erorilor
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Validarea parametrilor
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Validarea securității
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operațiune pe baza de date cu expirare de timp
                async with timeout(10):  # Timp de expirare de 10 secunde
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Erorile de conexiune pot fi tranzitorii
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Erorile de interogare sunt probabil erori client
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Lăsați erorile specifice instrumentului să treacă
            raise
        except Exception as e:
            # Captură generală pentru erori neașteptate
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementare a detectării injecției SQL
        pass
        
    def _log_error(self, message, error):
        # Implementare a jurnalizării erorilor
        pass
```

#### 3. Validarea parametrilor

Validați întotdeauna parametrii temeinic pentru a preveni input-uri neformatate corect sau malițioase.

```javascript
// Exemplu JavaScript/TypeScript cu validare detaliată a parametrilor
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
    // 1. Validarea prezenței parametrului
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Validarea tipurilor parametrilor
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Validarea valorilor parametrilor
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Validarea prezenței conținutului pentru operațiunea de scriere
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Validarea securității căii
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementare bazată pe parametrii validați
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementarea verificării securității căii
    // ...
  }
}
```

### Exemple de implementare a securității

#### 1. Autentificare și autorizare

```java
// Exemplu Java cu autentificare și autorizare
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Injecție de dependențe
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
        // 1. Extrage contextul de autentificare
        String authToken = request.getContext().getAuthToken();
        
        // 2. Autentifică utilizatorul
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Verifică autorizarea pentru operația specifică
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Continuă cu operația autorizată
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

#### 2. Limitarea ratei

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

## Cele mai bune practici de testare

### 1. Testarea unitară a uneltelor MCP

Testați întotdeauna uneltele în izolare, simulând dependențele externe:

```typescript
// Exemplu TypeScript de test unitar pentru un instrument
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Creează un serviciu meteo simulativ
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Creează instrumentul cu dependența simulată
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Aranjează
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Acționează
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Verifică
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Aranjează
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Acționează și verifică
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Testarea de integrare

Testați fluxul complet de la cererile clientului la răspunsurile serverului:

```python
# Exemplu de test de integrare Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Porniți un server de test
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Creați un client
        client = McpClient("http://localhost:5000")
        
        # Testați descoperirea instrumentelor
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Testați execuția instrumentelor
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Verificați răspunsul
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Curățare
        await server.stop()
```

## Optimizarea performanței

### 1. Strategii de caching

Implementați caching adecvat pentru a reduce latența și consumul de resurse:

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

#### 2. Injecția dependențelor și testabilitatea

Proiectați uneltele să primească dependențele prin injecție în constructor, făcându-le testabile și configurabile:

```java
// Exemplu Java cu injecție de dependență
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Dependențele sunt injectate prin constructor
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implementarea uneltei
    // ...
}
```

#### 3. Unelte compozabile

Proiectați unelte care pot fi compuse împreună pentru a crea workflow-uri mai complexe:

```python
# Exemplu Python care arată instrumente compozabile
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementare...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Acest instrument poate folosi rezultatele de la instrumentul dataFetch
    async def execute_async(self, request):
        # Implementare...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Acest instrument poate folosi rezultatele de la instrumentul dataAnalysis
    async def execute_async(self, request):
        # Implementare...
        pass

# Aceste instrumente pot fi utilizate independent sau ca parte a unui flux de lucru
```

### Cele mai bune practici de design al schemelor

Schema este contractul între model și unealta dvs. Schemele bine concepute conduc la o utilizare mai bună a uneltelor.

#### 1. Descrieri clare ale parametrilor

Includeți întotdeauna informații descriptive pentru fiecare parametru:

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

#### 2. Constrângeri de validare

Includeți constrângeri de validare pentru a preveni input-urile invalide:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Proprietate email cu validare de format
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Proprietate vârstă cu constrângeri numerice
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Proprietate enumerată
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

#### 3. Structuri consistente de returnare

Mențineți consistența în structurile de răspuns pentru a facilita interpretarea rezultatelor de către modele:

```python
async def execute_async(self, request):
    try:
        # Procesează cererea
        results = await self._search_database(request.parameters["query"])
        
        # Întotdeauna returnează o structură consistentă
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

### Gestionarea erorilor

Gestionarea robustă a erorilor este crucială pentru uneltele MCP pentru a menține fiabilitatea.

#### 1. Gestionarea grațioasă a erorilor

Gestionați erorile la niveluri adecvate și oferiți mesaje informative:

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

#### 2. Răspunsuri structurate pentru erori

Returnați informații structurate despre erori atunci când este posibil:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementare
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
        
        // Aruncă din nou alte excepții ca ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Logica de retry

Implementați o logică corespunzătoare de reîncercare pentru erori tranzitorii:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # secunde
    
    while retry_count < max_retries:
        try:
            # Apelează API extern
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Reîncercare exponențială
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Eroare non-tranzitorie, nu reîncerca
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Optimizarea performanței

#### 1. Caching

Implementați caching pentru operațiuni costisitoare:

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

#### 2. Procesare asincronă

Folosiți modele de programare asincronă pentru operațiunile dependente de I/O:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Pentru operațiuni de durată lungă, returnați imediat un ID de procesare
        String processId = UUID.randomUUID().toString();
        
        // Porniți procesarea asincronă
        CompletableFuture.runAsync(() -> {
            try {
                // Executați operațiunea de durată lungă
                documentService.processDocument(documentId);
                
                // Actualizați starea (de obicei ar fi stocată într-o bază de date)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Returnați răspuns imediat cu ID-ul procesului
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Instrument de verificare a stării asociat
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

#### 3. Limitarea resurselor

Implementați limitarea resurselor pentru a preveni suprasolicitarea:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Permite 5 cereri pe secundă
            bucket_size=10        # Permite explozii de până la 10 cereri
        )
    
    async def execute_async(self, request):
        # Verifică dacă putem continua sau trebuie să așteptăm
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Dacă așteptarea este prea lungă
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Așteaptă timpul corespunzător de întârziere
                await asyncio.sleep(delay)
        
        # Consumă un token și continuă cu cererea
        self.rate_limiter.consume()
        
        # Apelează API-ul
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
            
            # Calculează timpul până când un nou token este disponibil
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Adaugă tokenuri noi bazate pe timpul scurs
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Cele mai bune practici de securitate

#### 1. Validarea input-ului

Validați întotdeauna temeinic parametrii de intrare:

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

#### 2. Verificări de autorizare

Implementați verificări corecte de autorizare:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Obține contextul utilizatorului din cerere
    UserContext user = request.getContext().getUserContext();
    
    // Verifică dacă utilizatorul are permisiunile necesare
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Pentru resurse specifice, verifică accesul la acea resursă
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Continuă cu executarea instrumentului
    // ...
}
```

#### 3. Gestionarea datelor sensibile

Gestionați cu grijă datele sensibile:

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
        
        # Obține datele utilizatorului
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtrează câmpurile sensibile decât dacă sunt cerute explicit ȘI autorizate
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Verifică nivelul de autorizare în contextul cererii
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Creează o copie pentru a evita modificarea originalului
        redacted = user_data.copy()
        
        # Cenzurează câmpurile sensibile specifice
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Cenzurează datele sensibile imbricate
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Cele mai bune practici de testare pentru uneltele MCP

Testarea cuprinzătoare asigură că uneltele MCP funcționează corect, gestionează cazurile-limită și se integrează corect cu restul sistemului.

### Testarea unitară

#### 1. Testați fiecare unealtă în izolare

Creați teste focusate pe funcționalitatea fiecărei unelte:

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

#### 2. Testarea validării schemei

Testați dacă schemele sunt valide și aplică corect constrângerile:

```java
@Test
public void testSchemaValidation() {
    // Creează o instanță a uneltei
    SearchTool searchTool = new SearchTool();
    
    // Obține schema
    Object schema = searchTool.getSchema();
    
    // Conversia schemei în JSON pentru validare
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Validarea dacă schema este un JSONSchema valid
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Testarea parametrilor valizi
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Testarea parametrului necesar lipsă
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Testarea tipului de parametru invalid
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Teste pentru gestionarea erorilor

Creați teste specifice pentru condițiile de eroare:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Aranjează
    tool = ApiTool(timeout=0.1)  # Timeout foarte scurt
    
    # Simulează o cerere care va expira
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Mai lung decât timeout-ul
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Acționează și afirmă
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verifică mesajul excepției
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Aranjează
    tool = ApiTool()
    
    # Simulează un răspuns limitat pe bază de rată
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
        
        # Acționează și afirmă
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verifică dacă excepția conține informații despre limita de rată
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Testarea de integrare

#### 1. Testarea lanțului de unelte

Testați uneltele care lucrează împreună în combinații așteptate:

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

#### 2. Testarea serverului MCP

Testați serverul MCP cu înregistrare completă a uneltelor și execuție:

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
        // Testați punctul de descoperire
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Creați cererea pentru instrument
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Trimiteți cererea și verificați răspunsul
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Creați o cerere pentru instrument invalid
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Lipsă parametrul "b"
        request.put("parameters", parameters);
        
        // Trimiteți cererea și verificați răspunsul de eroare
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Testarea end-to-end

Testați workflow-uri complete de la promptul modelului până la execuția uneltei:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Aranjează - Configurare client MCP și model simulant
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Răspunsuri model simulant
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
    
    # Răspuns instrument meteo simulant
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
        
        # Acționează
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Afirmă
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Testarea performanței

#### 1. Testarea încărcării

Testați câte cereri concurente poate gestiona serverul MCP:

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

#### 2. Testarea de stres

Testați sistemul sub sarcini extreme:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Configurați JMeter pentru testarea la stres
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Configurați planul de testare JMeter
    HashTree testPlanTree = new HashTree();
    
    // Creați planul de testare, grupul de fire, sampler-ele etc.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Adăugați sampler HTTP pentru execuția instrumentului
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Adăugați ascultători
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Rulați testul
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Validați rezultatele
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Timpul mediu de răspuns < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // Percentila 90 < 500ms
}
```

#### 3. Monitorizare și profilare

Configurați monitorizarea pentru analiza performanței pe termen lung:

```python
# Configurează monitorizarea pentru un server MCP
def configure_monitoring(server):
    # Configurează metrici Prometheus
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
    
    # Adaugă middleware pentru măsurarea timpului și înregistrarea metricilor
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Expune endpoint-ul pentru metrici
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Modele de design pentru workflow MCP

Workflow-urile MCP bine proiectate îmbunătățesc eficiența, fiabilitatea și întreținerea. Iată modele cheie de urmat:

### 1. Modelul lanț de unelte

Conectați mai multe unelte în secvență unde ieșirea unei unelte devine intrarea celei următoare:

```python
# Implementarea lanțului de instrumente Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Listă de nume de instrumente de executat în secvență
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Execută fiecare instrument din lanț, transmitând rezultatul anterior
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Stochează rezultatul și îl folosește ca intrare pentru următorul instrument
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Exemplu de utilizare
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

### 2. Modelul dispatcher

Folosiți o unealtă centrală care direcționează către unelte specializate bazat pe input:

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

### 3. Modelul procesării paralele

Executați simultan mai multe unelte pentru eficiență:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Pasul 1: Preluare metadata a setului de date (sincron)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Pasul 2: Lansarea mai multor analize în paralel
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
        
        // Așteptați finalizarea tuturor sarcinilor paralele
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Așteptați finalizarea
        
        // Pasul 3: Combinarea rezultatelor
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Pasul 4: Generarea raportului sumar
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Returnați rezultatul complet al fluxului de lucru
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Modelul de recuperare a erorilor

Implementați fallback-uri grațioase pentru eșecurile uneltelor:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Încearcă mai întâi instrumentul principal
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Înregistrează eșecul
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Recurge la instrumentul secundar
            try:
                # Este posibil să fie nevoie să transformi parametrii pentru instrumentul de rezervă
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Ambele instrumente au eșuat
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Această implementare ar depinde de instrumentele specifice
        # Pentru acest exemplu, vom returna doar parametrii originali
        return params

# Exemplu de utilizare
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # API meteorologic principal (plătit)
        "basicWeatherService",    # API meteorologic de rezervă (gratuit)
        {"location": location}
    )
```

### 5. Modelul compoziției workflow-ului

Construiți workflow-uri complexe prin compunerea unor workflow-uri mai simple:

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

# Testarea serverelor MCP: Cele mai bune practici și sfaturi de top

## Prezentare generală

Testarea este un aspect critic pentru dezvoltarea serverelor MCP fiabile și de înaltă calitate. Acest ghid oferă cele mai bune practici și sfaturi cuprinzătoare pentru testarea serverelor MCP pe tot parcursul ciclului de dezvoltare, de la teste unitare la teste de integrare și validare end-to-end.

## De ce este importantă testarea pentru serverele MCP

Serverele MCP servesc ca middleware esențial între modelele AI și aplicațiile client. Testarea temeinică asigură:

- Fiabilitate în mediile de producție
- Gestionarea exactă a cererilor și răspunsurilor
- Implementarea corectă a specificațiilor MCP
- Reziliență împotriva eșecurilor și cazurilor-limită
- Performanță consistentă sub diverse sarcini

## Testarea unitară pentru serverele MCP

### Testarea unitară (fundație)

Testele unitare verifică componente individuale ale serverului MCP în izolare.

#### Ce trebuie testat

1. **Handleri de resurse**: Testați logica fiecărui handler de resurse independent
2. **Implementări de unelte**: Verificați comportamentul uneltelor cu diverse intrări
3. **Șabloane de prompt**: Asigurați-vă că șabloanele de prompt redau corect
4. **Validarea schemei**: Testați logica de validare a parametrilor
5. **Gestionarea erorilor**: Verificați răspunsurile la erori pentru intrări invalide

#### Cele mai bune practici pentru testarea unitară

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
# Exemplu de test unitar pentru un instrument calculator în Python
def test_calculator_tool_add():
    # Aranjează
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Acționează
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Asigură-te
    assert result["value"] == 12
```

### Testarea de integrare (stratul mediu)

Testele de integrare verifică interacțiunile dintre componentele serverului MCP.

#### Ce trebuie testat

1. **Inițializarea serverului**: Testați pornirea serverului cu diverse configurații
2. **Înregistrarea rutelor**: Verificați dacă toate endpoint-urile sunt înregistrate corect
3. **Procesarea cererilor**: Testați ciclul complet cerere-răspuns
4. **Propagarea erorilor**: Asigurați-vă că erorile sunt gestionate corect între componente
5. **Autentificare și autorizare**: Testați mecanismele de securitate

#### Cele mai bune practici pentru testarea de integrare

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

### Testarea end-to-end (stratul superior)

Testele end-to-end verifică comportamentul complet al sistemului de la client la server.

#### Ce trebuie testat

1. **Comunicarea client-server**: Testați ciclurile complete cerere-răspuns
2. **SDK-uri reale pentru client**: Testați cu implementări reale de client
3. **Performanța sub sarcină**: Verificați comportamentul cu cereri concurente multiple
4. **Recuperarea după erori**: Testați recuperarea sistemului după eșecuri
5. **Operațiuni de durată lungă**: Verificați gestionarea streaming-ului și operațiunilor lungi

#### Cele mai bune practici pentru testarea end-to-end

```typescript
// Exemplu de test E2E cu un client în TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Porniți serverul în mediul de testare
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Acțiune
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Afirmare
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Strategii de mocking pentru testarea MCP

Mocking-ul este esențial pentru izolarea componentelor în timpul testării.

### Componente de mock-uit

1. **Modele AI externe**: Mock-uiți răspunsurile modelelor pentru testare predictibilă
2. **Servicii externe**: Mock-uiți dependențele API (baze de date, servicii terțe)
3. **Servicii de autentificare**: Mock-uiți furnizorii de identitate
4. **Provideri de resurse**: Mock-uiți handlerii de resurse costisitoare

### Exemplu: Mock-uit răspunsul unui model AI

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
# Exemplu Python cu unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Configurează mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Folosește mock în test
    server = McpServer(model_client=mock_model)
    # Continuă cu testul
```

## Testarea performanței

Testarea performanței este crucială pentru serverele MCP în producție.

### Ce trebuie măsurat

1. **Latența**: Timpul de răspuns pentru cereri
2. **Throughput-ul**: Cererile gestionate pe secundă
3. **Utilizarea resurselor**: CPU, memorie, trafic de rețea
4. **Gestionarea concurenței**: Comportamentul sub cereri paralele
5. **Caracteristicile scalării**: Performanța pe măsură ce crește sarcina

### Unelte pentru testarea performanței

- **k6**: Unealtă open-source pentru testarea încărcării
- **JMeter**: Testare cuprinzătoare a performanței
- **Locust**: Testare de încărcare bazată pe Python
- **Azure Load Testing**: Testare cloud a performanței

### Exemplu: Test de încărcare de bază cu k6

```javascript
// Script k6 pentru testarea încărcării serverului MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 utilizatori virtuali
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

## Automatizarea testării pentru serverele MCP

Automatizarea testelor asigură calitate consecventă și bucle de feedback mai rapide.

### Integrarea CI/CD
1. **Rulați teste unitare pe Pull Requests**: Asigurați-vă că modificările codului nu strică funcționalitatea existentă  
2. **Teste de integrare în Staging**: Rulați teste de integrare în mediile pre-producție  
3. **Baze de referință pentru performanță**: Mențineți repere de performanță pentru a detecta regresiile  
4. **Scanări de securitate**: Automatizați testarea securității ca parte a pipeline-ului  

### Exemplu de pipeline CI (GitHub Actions)

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
  
## Testare pentru Conformitatea cu Specificația MCP  

Verificați dacă serverul dvs. implementează corect specificația MCP.  

### Domenii cheie de conformitate  

1. **Puncte finale API**: Testați punctele finale necesare (/resources, /tools etc.)  
2. **Formatul Cerere/Răspuns**: Validarea conformității cu schema  
3. **Coduri de eroare**: Verificați codurile de stare corecte pentru diverse scenarii  
4. **Tipuri de conținut**: Testați manipularea diferitelor tipuri de conținut  
5. **Fluxul de autentificare**: Verificați mecanismele de autentificare conforme cu specificația  

### Suita de teste pentru conformitate  

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
  
## Top 10 sfaturi pentru testarea eficientă a serverului MCP  

1. **Testați definițiile uneltelor separat**: Verificați definițiile schemelor independent de logica uneltelor  
2. **Folosiți teste parametrizate**: Testați uneltele cu o varietate de intrări, inclusiv cazuri-limită  
3. **Verificați răspunsurile de eroare**: Asigurați o gestionare corectă a erorilor pentru toate condițiile posibile  
4. **Testați logica de autorizare**: Asigurați controlul accesului adecvat pentru diverse roluri de utilizatori  
5. **Monitorizați acoperirea testelor**: Țintiți o acoperire ridicată a codului critic  
6. **Testați răspunsurile în flux**: Verificați manipularea corectă a conținutului streaming  
7. **Simulați probleme de rețea**: Testați comportamentul în condiții de rețea slabă  
8. **Testați limitele resurselor**: Verificați comportamentul la atingerea cotelor sau limitărilor de viteză  
9. **Automatizați testele de regresie**: Construiți o suită care se execută la fiecare modificare de cod  
10. **Documentați cazurile de test**: Mențineți o documentație clară a scenariilor de test  

## Capcane comune în testare  

- **Supradependența de testarea căii fericite**: Asigurați testarea completă a cazurilor de eroare  
- **Ignorarea testării performanței**: Identificați blocajele înainte să afecteze producția  
- **Testarea doar în izolare**: Combinați teste unitare, de integrare și end-to-end  
- **Acoperire incompletă a API-ului**: Asigurați testarea tuturor punctelor finale și caracteristicilor  
- **Mediile de testare inconsistente**: Folosiți containere pentru a asigura medii de testare consistente  

## Concluzie  

O strategie de testare cuprinzătoare este esențială pentru dezvoltarea serverelor MCP fiabile și de înaltă calitate. Implementând cele mai bune practici și sfaturile prezentate în acest ghid, puteți asigura că implementările MCP respectă cele mai înalte standarde de calitate, fiabilitate și performanță.  

## Puncte cheie de reținut  

1. **Proiectarea uneltelor**: Respectați principiul responsabilității unice, folosiți injecția de dependențe și proiectați pentru compostabilitate  
2. **Proiectarea schemelor**: Creați scheme clare, bine documentate, cu constrângeri de validare adecvate  
3. **Gestionarea erorilor**: Implementați o gestionare delicată a erorilor, răspunsuri de eroare structurate și logică de retry  
4. **Performanța**: Folosiți caching, procesare asincronă și limitarea resurselor  
5. **Securitatea**: Aplicați validări riguroase de intrări, verificări de autorizare și manipularea datelor sensibile  
6. **Testarea**: Creați teste unitare, de integrare și end-to-end cuprinzătoare  
7. **Modele de flux de lucru**: Aplicați modele consacrate precum lanțuri, dispatchere și procesare paralelă  

## Exercițiu  

Proiectați o unealtă MCP și un flux de lucru pentru un sistem de procesare a documentelor care:  

1. Acceptă documente în formate multiple (PDF, DOCX, TXT)  
2. Extrage text și informații cheie din documente  
3. Clasifică documentele după tip și conținut  
4. Generează un rezumat pentru fiecare document  

Implementați schemele uneltei, gestionarea erorilor și un model de flux de lucru potrivit pentru acest scenariu. Luați în considerare modul în care ați testa această implementare.  

## Resurse  

1. Alăturați-vă comunității MCP pe [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) pentru a fi la curent cu ultimele noutăți  
2. Contribuiți la proiecte open-source [MCP](https://github.com/modelcontextprotocol)  
3. Aplicați principiile MCP în inițiativele AI ale organizației dvs.  
4. Explorați implementări MCP specializate pentru industria dvs.  
5. Luați în considerare cursuri avansate pe subiecte MCP specifice, precum integrarea multimodală sau integrarea aplicațiilor enterprise.  
6. Experimentați construind propriile unelte și fluxuri de lucru MCP folosind principiile învățate prin [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Ce urmează  

Următorul: [Studii de caz](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinarea răspunderii**:  
Acest document a fost tradus utilizând serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim să asigurăm acuratețea, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autoritară. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm nicio răspundere pentru eventualele neînțelegeri sau interpretări greșite care pot rezulta din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->