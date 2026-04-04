# Best Practice per lo Sviluppo MCP

[![Best Practice per lo Sviluppo MCP](../../../translated_images/it/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Clicca sull'immagine sopra per vedere il video di questa lezione)_

## Panoramica

Questa lezione si concentra sulle best practice avanzate per lo sviluppo, il testing e il deployment di server e funzionalità MCP in ambienti di produzione. Man mano che gli ecosistemi MCP crescono in complessità e importanza, seguire schemi consolidati garantisce affidabilità, manutenibilità e interoperabilità. Questa lezione consolida la saggezza pratica acquisita da implementazioni MCP reali per guidarti nella creazione di server robusti ed efficienti con risorse, prompt e strumenti efficaci.

## Obiettivi di Apprendimento

Alla fine di questa lezione, sarai in grado di:

- Applicare le best practice del settore nel design di server e funzionalità MCP
- Creare strategie di testing complete per server MCP
- Progettare schemi di workflow efficienti e riutilizzabili per applicazioni MCP complesse
- Implementare una corretta gestione degli errori, logging e osservabilità nei server MCP
- Ottimizzare le implementazioni MCP per prestazioni, sicurezza e manutenibilità

## Principi Fondamentali MCP

Prima di entrare nelle pratiche di implementazione specifiche, è importante comprendere i principi fondamentali che guidano uno sviluppo MCP efficace:

1. **Comunicazione Standardizzata**: MCP utilizza JSON-RPC 2.0 come base, fornendo un formato coerente per richieste, risposte e gestione degli errori in tutte le implementazioni.

2. **Design User-Centric**: Dai sempre priorità al consenso, al controllo e alla trasparenza dell’utente nelle tue implementazioni MCP.

3. **Sicurezza Prima di Tutto**: Implementa misure di sicurezza robuste includendo autenticazione, autorizzazione, validazione e limitazione della velocità.

4. **Architettura Modulare**: Progetta i tuoi server MCP con un approccio modulare, dove ogni strumento e risorsa ha uno scopo chiaro e focalizzato.

5. **Connessioni Stateful**: Sfrutta la capacità di MCP di mantenere lo stato attraverso più richieste per interazioni più coerenti e consapevoli del contesto.

## Best Practice Ufficiali MCP

Le seguenti best practice derivano dalla documentazione ufficiale del Model Context Protocol:

### Best Practice di Sicurezza

1. **Consenso e Controllo Utente**: Richiedi sempre consenso esplicito dell’utente prima di accedere ai dati o eseguire operazioni. Fornisci un controllo chiaro su quali dati sono condivisi e quali azioni sono autorizzate.

2. **Privacy dei Dati**: Esporre dati utente solo con consenso esplicito e proteggerli con controlli di accesso appropriati. Salvaguardare da trasmissioni di dati non autorizzate.

3. **Sicurezza degli Strumenti**: Richiedere consenso esplicito prima di invocare qualsiasi strumento. Assicurarsi che gli utenti comprendano la funzionalità di ogni strumento e applicare confini di sicurezza robusti.

4. **Controllo dei Permessi degli Strumenti**: Configurare quali strumenti un modello può usare durante una sessione, assicurando che siano accessibili solo gli strumenti autorizzati esplicitamente.

5. **Autenticazione**: Richiedere un’adeguata autenticazione prima di concedere accesso a strumenti, risorse o operazioni sensibili usando chiavi API, token OAuth o altri metodi sicuri.

6. **Validazione dei Parametri**: Applicare la validazione per tutte le invocazioni degli strumenti per evitare input malformati o malevoli nelle implementazioni di strumenti.

7. **Limitazione della Velocità (Rate Limiting)**: Implementare limitazioni per prevenire abusi e garantire un uso equo delle risorse del server.

### Best Practice di Implementazione

1. **Negoziazione delle Capacità**: Durante la configurazione della connessione, scambiarsi informazioni sulle funzionalità supportate, versioni del protocollo, strumenti e risorse disponibili.

2. **Design degli Strumenti**: Creare strumenti focalizzati che fanno bene una cosa, piuttosto che strumenti monolitici che gestiscono molteplici preoccupazioni.

3. **Gestione degli Errori**: Implementare messaggi di errore e codici standardizzati per aiutare a diagnosticare problemi, gestire errori con grazia e fornire feedback azionabili.

4. **Logging**: Configurare log strutturati per auditing, debugging e monitoraggio delle interazioni del protocollo.

5. **Tracciamento del Progresso**: Per operazioni a lunga durata, riportare aggiornamenti di progresso per abilitare interfacce utente reattive.

6. **Cancellazione delle Richieste**: Permettere ai client di cancellare richieste in corso che non sono più necessarie o che richiedono troppo tempo.

## Riferimenti Aggiuntivi

Per informazioni aggiornate sulle best practice MCP, consulta:

- [Documentazione MCP](https://modelcontextprotocol.io/)
- [Specifiche MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repository GitHub](https://github.com/modelcontextprotocol)
- [Best Practice di Sicurezza](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Rischi di sicurezza e mitigazioni
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formazione pratica sulla sicurezza

## Esempi Pratici di Implementazione

### Best Practice di Design degli Strumenti

#### 1. Principio di Responsabilità Unica

Ogni strumento MCP dovrebbe avere uno scopo chiaro e focalizzato. Invece di creare strumenti monolitici che cercano di gestire molteplici aspetti, sviluppa strumenti specializzati che eccellono in compiti specifici.

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

#### 2. Gestione Coerente degli Errori

Implementa una gestione robusta degli errori con messaggi informativi e meccanismi di recupero appropriati.

```python
# Esempio Python con gestione completa degli errori
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Validazione dei parametri
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Validazione della sicurezza
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operazione su database con timeout
                async with timeout(10):  # Timeout di 10 secondi
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Gli errori di connessione potrebbero essere transitori
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Gli errori di query sono probabilmente errori lato client
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Lascia passare gli errori specifici dello strumento
            raise
        except Exception as e:
            # Gestione generale per errori inaspettati
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementazione del rilevamento di SQL injection
        pass
        
    def _log_error(self, message, error):
        # Implementazione della registrazione degli errori
        pass
```

#### 3. Validazione dei Parametri

Valida sempre in modo approfondito i parametri per prevenire input malformati o malevoli.

```javascript
// Esempio JavaScript/TypeScript con validazione dettagliata dei parametri
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
    // 1. Validare la presenza del parametro
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Validare i tipi dei parametri
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Validare i valori dei parametri
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Validare la presenza di contenuto per l'operazione di scrittura
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Validazione della sicurezza del percorso
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementazione basata sui parametri validati
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementazione del controllo di sicurezza del percorso
    // ...
  }
}
```

### Esempi di Implementazione di Sicurezza

#### 1. Autenticazione e Autorizzazione

```java
// Esempio Java con autenticazione e autorizzazione
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Iniezione delle dipendenze
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
        // 1. Estrarre il contesto di autenticazione
        String authToken = request.getContext().getAuthToken();
        
        // 2. Autenticare l'utente
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Verificare l'autorizzazione per l'operazione specifica
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Procedere con l'operazione autorizzata
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

#### 2. Limitazione della Velocità

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

## Best Practice di Testing

### 1. Testing Unitario degli Strumenti MCP

Testa sempre i tuoi strumenti in isolamento, simulando dipendenze esterne:

```typescript
// Esempio di test unitario di uno strumento in TypeScript
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Crea un servizio meteo fittizio
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Crea lo strumento con la dipendenza fittizia
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Prepara
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Esegui
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Verifica
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Prepara
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Esegui e verifica
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Testing di Integrazione

Testa il flusso completo dalle richieste client alle risposte del server:

```python
# Esempio di test di integrazione Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Avvia un server di test
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Crea un client
        client = McpClient("http://localhost:5000")
        
        # Testa la scoperta degli strumenti
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Testa l'esecuzione dello strumento
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Verifica la risposta
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Pulisci
        await server.stop()
```

## Ottimizzazione delle Prestazioni

### 1. Strategie di Caching

Implementa caching adeguato per ridurre latenza e uso delle risorse:

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

#### 2. Dependency Injection e Testabilità

Progetta gli strumenti per ricevere le loro dipendenze tramite injection nel costruttore, rendendoli testabili e configurabili:

```java
// Esempio Java con iniezione delle dipendenze
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Dipendenze iniettate tramite costruttore
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implementazione dello strumento
    // ...
}
```

#### 3. Strumenti Componibili

Progetta strumenti che possano essere composti insieme per creare workflow più complessi:

```python
# Esempio Python che mostra strumenti componibili
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementazione...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Questo strumento può utilizzare i risultati dello strumento dataFetch
    async def execute_async(self, request):
        # Implementazione...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Questo strumento può utilizzare i risultati dello strumento dataAnalysis
    async def execute_async(self, request):
        # Implementazione...
        pass

# Questi strumenti possono essere utilizzati indipendentemente o come parte di un flusso di lavoro
```

### Best Practice di Design dello Schema

Lo schema è il contratto tra il modello e il tuo strumento. Schemi ben progettati portano a una migliore usabilità dello strumento.

#### 1. Descrizioni Chiare dei Parametri

Includi sempre informazioni descrittive per ogni parametro:

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

#### 2. Vincoli di Validazione

Includi vincoli di validazione per prevenire input non validi:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Proprietà email con convalida del formato
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Proprietà età con vincoli numerici
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Proprietà enumerata
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

#### 3. Strutture di Ritorno Consistenti

Mantieni coerenza nelle tue strutture di risposta per facilitare l’interpretazione dei risultati da parte dei modelli:

```python
async def execute_async(self, request):
    try:
        # Elabora la richiesta
        results = await self._search_database(request.parameters["query"])
        
        # Restituisci sempre una struttura coerente
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

### Gestione degli Errori

Una gestione robusta degli errori è cruciale per mantenere l’affidabilità degli strumenti MCP.

#### 1. Gestione Graziosa degli Errori

Gestisci gli errori a livelli appropriati e fornisci messaggi informativi:

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

#### 2. Risposte di Errore Strutturate

Ritorna informazioni di errore strutturate quando possibile:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementazione
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
        
        // Rilancia altre eccezioni come ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Logica di Ritento

Implementa logiche di ritento appropriate per errori transitori:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # secondi
    
    while retry_count < max_retries:
        try:
            # Chiamare API esterna
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Ritardo esponenziale
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Errore non transitorio, non riprovare
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Ottimizzazione delle Prestazioni

#### 1. Caching

Implementa caching per operazioni costose:

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

#### 2. Elaborazione Asincrona

Usa pattern di programmazione asincrona per operazioni I/O-bound:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Per operazioni a lunga durata, restituisci immediatamente un ID di elaborazione
        String processId = UUID.randomUUID().toString();
        
        // Avvia l'elaborazione asincrona
        CompletableFuture.runAsync(() -> {
            try {
                // Esegui un'operazione a lunga durata
                documentService.processDocument(documentId);
                
                // Aggiorna lo stato (normalmente verrebbe salvato in un database)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Restituisci una risposta immediata con l'ID del processo
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Strumento di controllo stato companion
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

#### 3. Throttling delle Risorse

Implementa throttling delle risorse per prevenire sovraccarichi:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Permettere 5 richieste al secondo
            bucket_size=10        # Permettere picchi fino a 10 richieste
        )
    
    async def execute_async(self, request):
        # Verificare se possiamo procedere o se dobbiamo aspettare
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Se l'attesa è troppo lunga
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Aspettare il tempo di ritardo appropriato
                await asyncio.sleep(delay)
        
        # Consumare un token e procedere con la richiesta
        self.rate_limiter.consume()
        
        # Chiamare l'API
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
            
            # Calcolare il tempo fino al prossimo token disponibile
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Aggiungere nuovi token basati sul tempo trascorso
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Best Practice di Sicurezza

#### 1. Validazione degli Input

Valida sempre in modo approfondito i parametri di input:

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

#### 2. Controlli di Autorizzazione

Implementa controlli di autorizzazione adeguati:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Ottieni il contesto utente dalla richiesta
    UserContext user = request.getContext().getUserContext();
    
    // Verifica se l'utente ha i permessi richiesti
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Per risorse specifiche, verifica l'accesso a quella risorsa
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Procedi con l'esecuzione dello strumento
    // ...
}
```

#### 3. Gestione dei Dati Sensibili

Gestisci con cura i dati sensibili:

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
        
        # Ottenere dati utente
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtrare campi sensibili a meno che non sia esplicitamente richiesto E autorizzato
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Verificare il livello di autorizzazione nel contesto della richiesta
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Creare una copia per evitare di modificare l'originale
        redacted = user_data.copy()
        
        # Censurare campi sensibili specifici
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Censurare dati sensibili nidificati
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Best Practice di Testing per Strumenti MCP

Un testing completo assicura che gli strumenti MCP funzionino correttamente, gestiscano i casi limite e si integrino correttamente con il resto del sistema.

### Testing Unitario

#### 1. Testa Ogni Strumento in Isolamento

Crea test mirati per le funzionalità di ogni strumento:

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

#### 2. Test di Validazione dello Schema

Verifica che gli schemi siano validi e applichino correttamente i vincoli:

```java
@Test
public void testSchemaValidation() {
    // Crea istanza dello strumento
    SearchTool searchTool = new SearchTool();
    
    // Ottieni schema
    Object schema = searchTool.getSchema();
    
    // Converti lo schema in JSON per la validazione
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Valida che lo schema sia un JSONSchema valido
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Testa parametri validi
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Testa parametro richiesto mancante
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Testa tipo di parametro non valido
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Test di Gestione degli Errori

Crea test specifici per condizioni di errore:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Disporre
    tool = ApiTool(timeout=0.1)  # Timeout molto breve
    
    # Simula una richiesta che scadrà
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Più lungo del timeout
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Agire e Verificare
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verificare il messaggio di eccezione
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Disporre
    tool = ApiTool()
    
    # Simula una risposta con limitazione di velocità
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
        
        # Agire e Verificare
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verificare che l'eccezione contenga informazioni sul limite di velocità
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Testing di Integrazione

#### 1. Test della Catena di Strumenti

Testa gli strumenti che lavorano insieme nelle combinazioni previste:

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

#### 2. Testing del Server MCP

Testa il server MCP con registrazione completa degli strumenti ed esecuzione:

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
        // Testare l'endpoint di scoperta
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Creare richiesta dello strumento
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Inviare la richiesta e verificare la risposta
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Creare richiesta dello strumento non valida
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Parametro mancante "b"
        request.put("parameters", parameters);
        
        // Inviare la richiesta e verificare la risposta di errore
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Testing End-to-End

Testa flussi completi dal prompt del modello all’esecuzione dello strumento:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Configura - Imposta il client MCP e il modello mock
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Risposte del modello mock
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
    
    # Risposta dello strumento meteo mock
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
        
        # Agisci
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Verifica
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Testing delle Prestazioni

#### 1. Load Testing

Testa quante richieste concorrenti il tuo server MCP può gestire:

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

#### 2. Stress Testing

Testa il sistema sotto carichi estremi:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Configura JMeter per il test di stress
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Configura il piano di test JMeter
    HashTree testPlanTree = new HashTree();
    
    // Crea piano di test, gruppo di thread, sampler, ecc.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Aggiungi sampler HTTP per l'esecuzione dello strumento
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Aggiungi listener
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Esegui il test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Valida i risultati
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Tempo di risposta medio < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90° percentile < 500ms
}
```

#### 3. Monitoraggio e Profilazione

Configura il monitoraggio per analisi delle prestazioni a lungo termine:

```python
# Configura il monitoraggio per un server MCP
def configure_monitoring(server):
    # Configura metriche Prometheus
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
    
    # Aggiungi middleware per temporizzazione e registrazione delle metriche
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Esporre l'endpoint delle metriche
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Pattern di Design dei Workflow MCP

Workflow MCP ben progettati migliorano efficienza, affidabilità e manutenibilità. Ecco i pattern chiave da seguire:

### 1. Pattern Catena di Strumenti

Collega più strumenti in sequenza dove l’output di ciascuno diventa input per il prossimo:

```python
# Implementazione della catena di strumenti in Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Elenco dei nomi degli strumenti da eseguire in sequenza
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Esegui ogni strumento nella catena, passando il risultato precedente
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Memorizza il risultato e usalo come input per il prossimo strumento
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Esempio di utilizzo
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

### 2. Pattern Dispatcher

Usa uno strumento centrale che distribuisce a strumenti specializzati basandosi sull’input:

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

### 3. Pattern di Elaborazione Parallela

Esegui più strumenti simultaneamente per efficienza:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Passo 1: Recupera i metadati del dataset (sincrono)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Passo 2: Avvia più analisi in parallelo
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
        
        // Attendi il completamento di tutti i task paralleli
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Attendi il completamento
        
        // Passo 3: Combina i risultati
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Passo 4: Genera il rapporto riepilogativo
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Restituisci il risultato completo del flusso di lavoro
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Pattern di Recupero dagli Errori

Implementa fallback graziosi per errori degli strumenti:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Prova prima lo strumento principale
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Registra il fallimento
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Passa allo strumento secondario
            try:
                # Potrebbe essere necessario trasformare i parametri per lo strumento di riserva
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Entrambi gli strumenti hanno fallito
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Questa implementazione dipenderebbe dagli strumenti specifici
        # Per questo esempio, restituiremo solo i parametri originali
        return params

# Esempio di utilizzo
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # API meteo primaria (a pagamento)
        "basicWeatherService",    # API meteo di riserva (gratuita)
        {"location": location}
    )
```

### 5. Pattern Composizione del Workflow

Costruisci workflow complessi componendo quelli più semplici:

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

# Testing dei Server MCP: Best Practice e Consigli Top

## Panoramica

Il testing è un aspetto critico dello sviluppo di server MCP affidabili e di alta qualità. Questa guida fornisce best practice e consigli completi per testare i tuoi server MCP durante tutto il ciclo di sviluppo, dai test unitari ai test di integrazione e convalida end-to-end.

## Perché il Testing è Importante per i Server MCP

I server MCP fungono da middleware cruciale tra modelli AI e applicazioni client. Un testing approfondito garantisce:

- Affidabilità in ambienti di produzione
- Gestione accurata di richieste e risposte
- Implementazione corretta delle specifiche MCP
- Resilienza contro errori e casi limite
- Prestazioni costanti sotto carichi vari

## Testing Unitario per Server MCP

### Testing Unitario (Fondamentale)

I test unitari verificano singoli componenti del server MCP in isolamento.

#### Cosa Testare

1. **Gestori di Risorse**: Testare la logica di ogni gestore di risorsa indipendentemente
2. **Implementazioni degli Strumenti**: Verificare il comportamento degli strumenti con diversi input
3. **Template di Prompt**: Assicurarsi che i template di prompt siano renderizzati correttamente
4. **Validazione dello Schema**: Testare la logica di validazione dei parametri
5. **Gestione degli Errori**: Verificare risposte di errore per input non validi

#### Best Practice per il Testing Unitario

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
# Esempio di test unitario per uno strumento calcolatrice in Python
def test_calculator_tool_add():
    # Prepara
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Agisci
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Verifica
    assert result["value"] == 12
```

### Testing di Integrazione (Livello Intermedio)

I test di integrazione verificano le interazioni tra i componenti del server MCP.

#### Cosa Testare

1. **Inizializzazione del Server**: Testare l’avvio del server con varie configurazioni
2. **Registrazione delle Rotte**: Verificare che tutti gli endpoint siano correttamente registrati
3. **Elaborazione delle Richieste**: Testare il ciclo completo richiesta-risposta
4. **Propagazione degli Errori**: Assicurare che gli errori siano gestiti correttamente tra i componenti
5. **Autenticazione e Autorizzazione**: Testare i meccanismi di sicurezza

#### Best Practice per il Testing di Integrazione

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

### Testing End-to-End (Livello Superiore)

I test end-to-end verificano il comportamento completo del sistema da client a server.

#### Cosa Testare

1. **Comunicazione Client-Server**: Testare cicli completi di richiesta-risposta
2. **SDK Client Reali**: Testare con implementazioni client reali
3. **Prestazioni sotto Carico**: Verificare il comportamento con più richieste concorrenti
4. **Recupero dagli Errori**: Testare il recupero del sistema da errori
5. **Operazioni a Lunga Durata**: Verificare la gestione di streaming e operazioni prolungate

#### Best Practice per il Testing E2E

```typescript
// Esempio di test E2E con un client in TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Avvia il server in ambiente di test
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Agisci
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Asserisci
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Strategie di Mocking per il Testing MCP

Il mocking è essenziale per isolare i componenti durante il testing.

### Componenti da Mockare

1. **Modelli AI Esterni**: Mock delle risposte dei modelli per un testing prevedibile
2. **Servizi Esterni**: Mock delle dipendenze API (database, servizi di terze parti)
3. **Servizi di Autenticazione**: Mock dei provider di identità
4. **Provider di Risorse**: Mock dei gestori di risorse costose

### Esempio: Mock di una Risposta di Modello AI

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
# Esempio Python con unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Configura il mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Usa il mock nel test
    server = McpServer(model_client=mock_model)
    # Continua con il test
```

## Testing delle Prestazioni

Il testing delle prestazioni è cruciale per server MCP in produzione.

### Cosa Misurare

1. **Latenza**: Tempo di risposta alle richieste
2. **Throughput**: Richieste gestite al secondo
3. **Utilizzo delle Risorse**: Uso di CPU, memoria, network
4. **Gestione della Concorrenza**: Comportamento sotto richieste parallele
5. **Caratteristiche di Scalabilità**: Prestazioni con l’aumento del carico

### Strumenti per il Testing delle Prestazioni

- **k6**: Strumento open-source per load testing
- **JMeter**: Testing completo delle prestazioni
- **Locust**: Load testing basato su Python
- **Azure Load Testing**: Testing delle prestazioni basato su cloud

### Esempio: Test di Carico Base con k6

```javascript
// script k6 per il test di carico del server MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 utenti virtuali
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

## Automazione dei Test per Server MCP

Automatizzare i test assicura qualità costante e cicli di feedback più rapidi.

### Integrazione CI/CD
1. **Eseguire test unitari sulle pull request**: Assicurarsi che le modifiche al codice non compromettano le funzionalità esistenti  
2. **Test di integrazione in staging**: Eseguire test di integrazione negli ambienti pre-produzione  
3. **Riferimenti di prestazioni**: Mantenere benchmark di prestazioni per individuare regressioni  
4. **Scansioni di sicurezza**: Automatizzare i test di sicurezza come parte della pipeline  

### Esempio di Pipeline CI (GitHub Actions)

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
  
## Test per la conformità con la specifica MCP

Verifica che il tuo server implementi correttamente la specifica MCP.

### Aree chiave di conformità

1. **Endpoint API**: Testare gli endpoint richiesti (/resources, /tools, ecc.)  
2. **Formato richiesta/risposta**: Validare la conformità dello schema  
3. **Codici di errore**: Verificare i codici di stato corretti per vari scenari  
4. **Tipi di contenuto**: Testare la gestione di diversi tipi di contenuto  
5. **Flusso di autenticazione**: Verificare i meccanismi di autenticazione conformi alla specifica  

### Suite di test di conformità

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
  
## Le 10 migliori pratiche per testare efficacemente un server MCP

1. **Testare le definizioni degli strumenti separatamente**: Verificare le definizioni dello schema indipendentemente dalla logica degli strumenti  
2. **Usare test parametrizzati**: Testare gli strumenti con una varietà di input, inclusi casi limite  
3. **Verificare le risposte di errore**: Assicurarsi che la gestione degli errori sia corretta in tutte le condizioni di errore possibili  
4. **Testare la logica di autorizzazione**: Garantire il controllo accessi corretto per diversi ruoli utente  
5. **Monitorare la copertura dei test**: Puntare a una copertura elevata del codice del percorso critico  
6. **Testare le risposte in streaming**: Verificare la corretta gestione dei contenuti in streaming  
7. **Simulare problemi di rete**: Testare il comportamento in condizioni di rete sfavorevoli  
8. **Testare i limiti delle risorse**: Verificare il comportamento a raggiungimento di quote o limiti di velocità  
9. **Automatizzare i test di regressione**: Costruire una suite che venga eseguita a ogni modifica del codice  
10. **Documentare i casi di test**: Mantenere una documentazione chiara degli scenari di test  

## Errori comuni nei test

- **Affidarsi troppo ai test del cammino positivo**: Assicurarsi di testare approfonditamente i casi di errore  
- **Ignorare i test di prestazioni**: Identificare i colli di bottiglia prima che impattino la produzione  
- **Testare solo in isolamento**: Combinare test unitari, di integrazione e end-to-end  
- **Copertura API incompleta**: Assicurarsi che tutti gli endpoint e le funzionalità siano testati  
- **Ambientazioni di test non coerenti**: Usare container per garantire ambienti di test coerenti  

## Conclusione

Una strategia di testing completa è essenziale per sviluppare server MCP affidabili e di alta qualità. Implementando le migliori pratiche e i suggerimenti illustrati in questa guida, puoi garantire che le tue implementazioni MCP soddisfino i più alti standard di qualità, affidabilità e prestazioni.  


## Punti chiave

1. **Progettazione degli strumenti**: Seguire il principio di responsabilità singola, usare l'iniezione delle dipendenze e progettare per la composabilità  
2. **Progettazione degli schemi**: Creare schemi chiari, ben documentati con opportune restrizioni di validazione  
3. **Gestione degli errori**: Implementare una gestione degli errori elegante, risposte strutturate e logica di ritentativo  
4. **Prestazioni**: Usare caching, elaborazione asincrona e limitazione delle risorse  
5. **Sicurezza**: Applicare una validazione approfondita degli input, controlli di autorizzazione e gestione dei dati sensibili  
6. **Testing**: Creare test unitari, di integrazione e end-to-end completi  
7. **Pattern di workflow**: Applicare pattern consolidati come catene, dispatcher e elaborazione in parallelo  

## Esercizio

Progetta uno strumento MCP e un workflow per un sistema di elaborazione documenti che:

1. Accetti documenti in più formati (PDF, DOCX, TXT)  
2. Estragga testo e informazioni chiave dai documenti  
3. Classifichi i documenti per tipo e contenuto  
4. Generi un riepilogo di ogni documento  

Implementa gli schemi dello strumento, la gestione degli errori e un pattern di workflow che meglio si adatti a questo scenario. Considera come testeresti questa implementazione.  

## Risorse

1. Unisciti alla comunità MCP su [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) per rimanere aggiornato sugli ultimi sviluppi  
2. Contribuisci a progetti open-source [MCP](https://github.com/modelcontextprotocol)  
3. Applica i principi MCP nelle iniziative di AI della tua organizzazione  
4. Esplora implementazioni MCP specializzate per il tuo settore  
5. Considera di seguire corsi avanzati su argomenti MCP specifici, come integrazione multimodale o integrazione di applicazioni enterprise  
6. Sperimenta costruendo i tuoi strumenti e workflow MCP utilizzando i principi appresi attraverso il [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Cosa c’è dopo

Prossimo: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione automatica [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire accuratezza, si prega di notare che le traduzioni automatiche possono contenere errori o inesattezze. Il documento originale nella sua lingua natale deve essere considerato la fonte autorevole. Per informazioni critiche si raccomanda la traduzione professionale umana. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall'uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->