# Najlepsze praktyki rozwoju MCP

[![Najlepsze praktyki rozwoju MCP](../../../translated_images/pl/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Kliknij powyższy obrazek, aby obejrzeć wideo z tej lekcji)_

## Przegląd

Ta lekcja koncentruje się na zaawansowanych najlepszych praktykach dotyczących tworzenia, testowania i wdrażania serwerów i funkcji MCP w środowiskach produkcyjnych. W miarę jak ekosystemy MCP stają się coraz bardziej złożone i istotne, przestrzeganie ustalonych wzorców zapewnia niezawodność, łatwość konserwacji i interoperacyjność. Ta lekcja konsoliduje praktyczną wiedzę zdobytą podczas rzeczywistych implementacji MCP, aby pomóc Ci tworzyć solidne, wydajne serwery z efektywnymi zasobami, podpowiedziami i narzędziami.

## Cele nauki

Po zakończeniu tej lekcji będziesz potrafił:

- Zastosować najlepsze praktyki branżowe w projektowaniu serwerów i funkcji MCP
- Tworzyć kompleksowe strategie testowania serwerów MCP
- Projektować wydajne, wielokrotnego użytku wzorce przepływów pracy dla złożonych aplikacji MCP
- Wdrażać odpowiednie obsługi błędów, logowanie i obserwowalność w serwerach MCP
- Optymalizować implementacje MCP pod kątem wydajności, bezpieczeństwa i konserwowalności

## Podstawowe zasady MCP

Zanim przejdziesz do konkretnych zasad implementacji, ważne jest, aby zrozumieć podstawowe zasady kierujące skutecznym rozwojem MCP:

1. **Standaryzowana komunikacja**: MCP korzysta z JSON-RPC 2.0 jako podstawy, zapewniając spójny format żądań, odpowiedzi oraz obsługi błędów we wszystkich implementacjach.

2. **Projektowanie zorientowane na użytkownika**: Zawsze priorytetowo traktuj zgodę użytkownika, kontrolę i przejrzystość w swoich implementacjach MCP.

3. **Bezpieczeństwo przede wszystkim**: Wdrażaj solidne środki bezpieczeństwa, w tym uwierzytelnianie, autoryzację, walidację i ograniczanie liczby żądań.

4. **Architektura modułowa**: Projektuj serwery MCP w modularny sposób, gdzie każde narzędzie i zasób ma jasny, skoncentrowany cel.

5. **Połączenia stanowe**: Wykorzystuj zdolność MCP do utrzymywania stanu pomiędzy wieloma żądaniami dla bardziej spójnych i świadomych kontekstu interakcji.

## Oficjalne najlepsze praktyki MCP

Poniższe najlepsze praktyki pochodzą z oficjalnej dokumentacji Model Context Protocol:

### Najlepsze praktyki bezpieczeństwa

1. **Zgoda i kontrola użytkownika**: Zawsze wymagaj wyraźnej zgody użytkownika przed dostępem do danych lub wykonywaniem operacji. Zapewnij jasną kontrolę nad tym, jakie dane są udostępniane i które działania są autoryzowane.

2. **Prywatność danych**: Udostępniaj dane użytkownika tylko za wyraźną zgodą i chroń je odpowiednimi kontrolami dostępu. Zabezpieczaj przed nieautoryzowanym przesyłaniem danych.

3. **Bezpieczeństwo narzędzi**: Wymagaj wyraźnej zgody użytkownika przed wywołaniem jakiegokolwiek narzędzia. Upewnij się, że użytkownicy rozumieją funkcje każdego narzędzia i egzekwuj solidne granice bezpieczeństwa.

4. **Kontrola uprawnień narzędzi**: Konfiguruj, które narzędzia model może używać podczas sesji, zapewniając dostęp tylko do wyraźnie autoryzowanych narzędzi.

5. **Uwierzytelnianie**: Wymagaj odpowiedniego uwierzytelniania przed udzieleniem dostępu do narzędzi, zasobów lub wrażliwych operacji za pomocą kluczy API, tokenów OAuth lub innych bezpiecznych metod uwierzytelniania.

6. **Walidacja parametrów**: Wymuszaj walidację dla wszystkich wywołań narzędzi, aby zapobiec przekazaniu sfałszowanych lub złośliwych danych do implementacji narzędzi.

7. **Ograniczanie liczby żądań**: Wdrażaj ograniczenia liczby żądań, aby zapobiec nadużyciom i zapewnić uczciwe wykorzystanie zasobów serwera.

### Najlepsze praktyki implementacji

1. **Negocjacja możliwości**: Podczas nawiązywania połączenia wymieniaj informacje o obsługiwanych funkcjach, wersjach protokołu, dostępnych narzędziach i zasobach.

2. **Projektowanie narzędzi**: Twórz skoncentrowane narzędzia, które wykonują jedną rzecz dobrze, zamiast monolitycznych narzędzi obsługujących wiele aspektów.

3. **Obsługa błędów**: Wdrażaj ustandaryzowane komunikaty i kody błędów, które pomagają diagnozować problemy, obsługiwać błędy w sposób łagodny i dostarczać konstruktywne informacje zwrotne.

4. **Logowanie**: Konfiguruj strukturalne logi do audytu, debugowania i monitorowania interakcji protokołu.

5. **Śledzenie postępu**: Dla długotrwałych operacji raportuj aktualizacje postępu, aby umożliwić responsywny interfejs użytkownika.

6. **Anulowanie żądań**: Pozwól klientom anulować trwające żądania, które nie są już potrzebne lub zajmują zbyt dużo czasu.

## Dodatkowe źródła

Aby uzyskać najbardziej aktualne informacje o najlepszych praktykach MCP, zapoznaj się z:

- [Dokumentacja MCP](https://modelcontextprotocol.io/)
- [Specyfikacja MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repozytorium GitHub](https://github.com/modelcontextprotocol)
- [Najlepsze praktyki bezpieczeństwa](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Ryzyka bezpieczeństwa i środki zaradcze
- [Warsztat MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktyczne szkolenie z bezpieczeństwa

## Praktyczne przykłady implementacji

### Najlepsze praktyki projektowania narzędzi

#### 1. Zasada pojedynczej odpowiedzialności

Każde narzędzie MCP powinno mieć jasny, skoncentrowany cel. Zamiast tworzyć monolityczne narzędzia, które próbują obsłużyć wiele kwestii, rozwijaj specjalistyczne narzędzia, które doskonale radzą sobie z konkretnymi zadaniami.

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

#### 2. Spójna obsługa błędów

Wdrażaj solidną obsługę błędów z informacyjnymi komunikatami błędów i odpowiednimi mechanizmami odzyskiwania.

```python
# Przykład w Pythonie z kompleksową obsługą błędów
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Walidacja parametrów
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Walidacja bezpieczeństwa
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operacja na bazie danych z limitem czasu
                async with timeout(10):  # Limit czasu 10 sekund
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Błędy połączenia mogą być przejściowe
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Błędy zapytania prawdopodobnie są błędami klienta
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Pozwól przejść błędom specyficznym dla narzędzia
            raise
        except Exception as e:
            # Obsługa wszystkich nieoczekiwanych błędów
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementacja wykrywania wstrzyknięć SQL
        pass
        
    def _log_error(self, message, error):
        # Implementacja logowania błędów
        pass
```

#### 3. Walidacja parametrów

Zawsze dokładnie waliduj parametry, aby zapobiec przekazaniu niepoprawnych lub złośliwych danych.

```javascript
// Przykład JavaScript/TypeScript z szczegółową walidacją parametrów
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
    // 1. Walidacja obecności parametru
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Walidacja typów parametrów
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Walidacja wartości parametrów
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Walidacja obecności zawartości dla operacji zapisu
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Walidacja bezpieczeństwa ścieżki
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementacja oparta na zweryfikowanych parametrach
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementacja sprawdzania bezpieczeństwa ścieżki
    // ...
  }
}
```

### Przykłady implementacji bezpieczeństwa

#### 1. Uwierzytelnianie i autoryzacja

```java
// Przykład w Javie z uwierzytelnianiem i autoryzacją
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Wstrzykiwanie zależności
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
        // 1. Wyodrębnij kontekst uwierzytelniania
        String authToken = request.getContext().getAuthToken();
        
        // 2. Uwierzytelnij użytkownika
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Sprawdź autoryzację dla konkretnej operacji
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Kontynuuj z autoryzowaną operacją
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

#### 2. Ograniczanie liczby żądań

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

## Najlepsze praktyki testowania

### 1. Testowanie jednostkowe narzędzi MCP

Zawsze testuj narzędzia w izolacji, wykorzystując makiety (mocki) zależności zewnętrznych:

```typescript
// Przykład testu jednostkowego narzędzia w TypeScript
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Utwórz mock serwisu pogodowego
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Utwórz narzędzie z mock zależnością
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Przygotuj
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Wykonaj
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Sprawdź
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Przygotuj
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Wykonaj i sprawdź
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Testowanie integracyjne

Testuj pełny przebieg od żądań klienta do odpowiedzi serwera:

```python
# Przykład testu integracyjnego w Pythonie
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Uruchom serwer testowy
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Utwórz klienta
        client = McpClient("http://localhost:5000")
        
        # Przetestuj wykrywanie narzędzia
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Przetestuj wykonanie narzędzia
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Zweryfikuj odpowiedź
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Posprzątaj
        await server.stop()
```

## Optymalizacja wydajności

### 1. Strategie buforowania

Wdrażaj odpowiednie buforowanie, aby zmniejszyć opóźnienia i wykorzystanie zasobów:

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

#### 2. Wstrzykiwanie zależności i testowalność

Projektuj narzędzia tak, aby otrzymywały swoje zależności przez wstrzykiwanie w konstruktorze, co ułatwia testowanie i konfigurację:

```java
// Przykład Java z wstrzykiwaniem zależności
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Zależności wstrzykiwane przez konstruktor
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implementacja narzędzia
    // ...
}
```

#### 3. Komponowalne narzędzia

Projektuj narzędzia tak, aby można je było łączyć w celu tworzenia bardziej złożonych przepływów pracy:

```python
# Przykład Pythona pokazujący narzędzia kompozycyjne
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementacja...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # To narzędzie może korzystać z wyników narzędzia dataFetch
    async def execute_async(self, request):
        # Implementacja...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # To narzędzie może korzystać z wyników narzędzia dataAnalysis
    async def execute_async(self, request):
        # Implementacja...
        pass

# Te narzędzia mogą być używane niezależnie lub jako część przepływu pracy
```

### Najlepsze praktyki projektowania schematów

Schemat to kontrakt pomiędzy modelem a Twoim narzędziem. Dobrze zaprojektowane schematy prowadzą do lepszej użyteczności narzędzi.

#### 1. Jasne opisy parametrów

Zawsze dołączaj opisowe informacje dla każdego parametru:

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

#### 2. Ograniczenia walidacji

Uwzględnij ograniczenia walidacyjne, aby zapobiec nieprawidłowym danym wejściowym:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Właściwość e-mail z walidacją formatu
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Właściwość wieku z ograniczeniami numerycznymi
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Właściwość enumerowana
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

#### 3. Spójne struktury odpowiedzi

Utrzymuj spójność w strukturach odpowiedzi, aby ułatwić modelom interpretację wyników:

```python
async def execute_async(self, request):
    try:
        # Przetwarzaj żądanie
        results = await self._search_database(request.parameters["query"])
        
        # Zawsze zwracaj spójną strukturę
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

### Obsługa błędów

Solidna obsługa błędów jest kluczowa dla utrzymania niezawodności narzędzi MCP.

#### 1. Łagodna obsługa błędów

Obsługuj błędy na odpowiednich poziomach i dostarczaj informacyjne komunikaty:

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

#### 2. Strukturalne odpowiedzi błędów

Zwracaj strukturalne informacje o błędach, gdy jest to możliwe:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementacja
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
        
        // Ponowne wyrzucenie innych wyjątków jako ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Logika ponawiania prób

Wdrażaj odpowiednią logikę ponawiania prób dla błędów przejściowych:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # sekundy
    
    while retry_count < max_retries:
        try:
            # Wywołaj zewnętrzne API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Eksponencjalne opóźnienie zwrotne
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Błąd nietrwały, nie ponawiaj prób
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Optymalizacja wydajności

#### 1. Buforowanie

Wdrażaj buforowanie dla kosztownych operacji:

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

#### 2. Przetwarzanie asynchroniczne

Stosuj wzorce programowania asynchronicznego dla operacji blokujących I/O:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Dla operacji długotrwałych natychmiast zwróć identyfikator przetwarzania
        String processId = UUID.randomUUID().toString();
        
        // Rozpocznij asynchroniczne przetwarzanie
        CompletableFuture.runAsync(() -> {
            try {
                // Wykonaj operację długotrwałą
                documentService.processDocument(documentId);
                
                // Zaktualizuj status (zazwyczaj byłby przechowywany w bazie danych)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Zwroc natychmiastową odpowiedź z identyfikatorem procesu
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Narzędzie towarzyszące do sprawdzania statusu
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

#### 3. Ograniczanie zasobów

Wdrażaj ograniczenia zasobów, aby zapobiec przeciążeniu:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Zezwól na 5 żądań na sekundę
            bucket_size=10        # Zezwól na nagłe skoki do 10 żądań
        )
    
    async def execute_async(self, request):
        # Sprawdź, czy możemy kontynuować, czy trzeba czekać
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Jeśli czas oczekiwania jest zbyt długi
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Poczekaj odpowiedni czas opóźnienia
                await asyncio.sleep(delay)
        
        # Zużyj token i kontynuuj żądanie
        self.rate_limiter.consume()
        
        # Wywołaj API
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
            
            # Oblicz czas do kolejnego dostępnego tokena
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Dodaj nowe tokeny na podstawie upływającego czasu
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Najlepsze praktyki bezpieczeństwa

#### 1. Walidacja wejścia

Zawsze dokładnie waliduj parametry wejściowe:

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

#### 2. Kontrole autoryzacji

Wdrażaj właściwe kontrole autoryzacji:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Pobierz kontekst użytkownika z żądania
    UserContext user = request.getContext().getUserContext();
    
    // Sprawdź, czy użytkownik ma wymagane uprawnienia
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Dla określonych zasobów sprawdź dostęp do tego zasobu
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Kontynuuj wykonanie narzędzia
    // ...
}
```

#### 3. Obsługa danych wrażliwych

Obchodź się ostrożnie z danymi wrażliwymi:

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
        
        # Pobierz dane użytkownika
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtruj poufne pola, chyba że zostały wyraźnie zażądane I zatwierdzone
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Sprawdź poziom uprawnień w kontekście żądania
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Utwórz kopię, aby uniknąć modyfikowania oryginału
        redacted = user_data.copy()
        
        # Zatuszuj konkretne poufne pola
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Zatuszuj zagnieżdżone dane poufne
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Najlepsze praktyki testowania narzędzi MCP

Kompleksowe testowanie zapewnia prawidłowe działanie narzędzi MCP, obsługę przypadków granicznych oraz prawidłową integrację z resztą systemu.

### Testowanie jednostkowe

#### 1. Testuj każde narzędzie w izolacji

Twórz skoncentrowane testy funkcjonalności każdego narzędzia:

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

#### 2. Testowanie walidacji schematów

Testuj poprawność schematów i ich egzekwowanie ograniczeń:

```java
@Test
public void testSchemaValidation() {
    // Utwórz instancję narzędzia
    SearchTool searchTool = new SearchTool();
    
    // Pobierz schemat
    Object schema = searchTool.getSchema();
    
    // Przekonwertuj schemat na JSON do walidacji
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Sprawdź, czy schemat jest prawidłowym JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Przetestuj prawidłowe parametry
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Przetestuj brakujący wymagany parametr
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Przetestuj nieprawidłowy typ parametru
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Testy obsługi błędów

Twórz specyficzne testy dla sytuacji błędnych:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Ustaw
    tool = ApiTool(timeout=0.1)  # Bardzo krótki limit czasu
    
    # Zamockuj żądanie, które przekroczy limit czasu
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Dłużej niż limit czasu
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Wykonaj i potwierdź
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Sprawdź wiadomość wyjątku
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Ustaw
    tool = ApiTool()
    
    # Zamockuj odpowiedź z ograniczeniem szybkości
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
        
        # Wykonaj i potwierdź
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Sprawdź, czy wyjątek zawiera informacje o ograniczeniu szybkości
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Testowanie integracyjne

#### 1. Testowanie łańcucha narzędzi

Testuj narzędzia pracujące razem w oczekiwanych kombinacjach:

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

#### 2. Testowanie serwera MCP

Testuj serwer MCP z pełną rejestracją i wykonywaniem narzędzi:

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
        // Przetestuj punkt końcowy odkrywania
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Utwórz żądanie narzędzia
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Wyślij żądanie i zweryfikuj odpowiedź
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Utwórz nieprawidłowe żądanie narzędzia
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Brakujący parametr "b"
        request.put("parameters", parameters);
        
        // Wyślij żądanie i zweryfikuj odpowiedź błędu
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Testy end-to-end

Testuj kompletne przepływy od podpowiedzi modelu do wykonania narzędzia:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Ustaw - Skonfiguruj klienta MCP i model mock
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Odpowiedzi modelu mock
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
    
    # Odpowiedź narzędzia pogodowego mock
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
        
        # Działaj
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Sprawdź
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Testowanie wydajności

#### 1. Testy obciążeniowe

Testuj, ile równoczesnych żądań może obsłużyć Twój serwer MCP:

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

#### 2. Testy wytrzymałościowe

Testuj system pod ekstremalnym obciążeniem:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Skonfiguruj JMeter do testów obciążeniowych
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Skonfiguruj plan testów JMeter
    HashTree testPlanTree = new HashTree();
    
    // Utwórz plan testów, grupę wątków, próbniki itp.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Dodaj próbnika HTTP do wykonania narzędzia
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Dodaj nasłuchiwacze
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Uruchom test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Zweryfikuj wyniki
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Średni czas odpowiedzi < 200 ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. percentyl < 500 ms
}
```

#### 3. Monitorowanie i profilowanie

Konfiguruj monitorowanie dla długoterminowej analizy wydajności:

```python
# Skonfiguruj monitorowanie serwera MCP
def configure_monitoring(server):
    # Skonfiguruj metryki Prometheus
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
    
    # Dodaj middleware do mierzenia czasu i rejestrowania metryk
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Udostępnij punkt końcowy metryk
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Wzorce projektowe przepływów MCP

Dobrze zaprojektowane przepływy MCP poprawiają wydajność, niezawodność i konserwowalność. Oto kluczowe wzorce do stosowania:

### 1. Wzorzec łańcucha narzędzi

Łącz kilka narzędzi w sekwencję, gdzie wynik jednego narzędzia staje się wejściem dla kolejnego:

```python
# Implementacja łańcucha narzędzi w Pythonie
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Lista nazw narzędzi do wykonania w kolejności
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Wykonaj każde narzędzie w łańcuchu, przekazując poprzedni wynik
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Przechowaj wynik i użyj go jako dane wejściowe dla następnego narzędzia
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Przykład użycia
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

### 2. Wzorzec dyspozytora

Używaj centralnego narzędzia, które kieruje zapytania do wyspecjalizowanych narzędzi na podstawie danych wejściowych:

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

### 3. Wzorzec przetwarzania równoległego

Uruchamiaj wiele narzędzi jednocześnie dla efektywności:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Krok 1: Pobierz metadane zestawu danych (synchronizacja)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Krok 2: Uruchom wiele analiz równolegle
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
        
        // Poczekaj na zakończenie wszystkich zadań równoległych
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Czekaj na zakończenie
        
        // Krok 3: Połącz wyniki
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Krok 4: Wygeneruj raport podsumowujący
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Zwróć pełny wynik przepływu pracy
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Wzorzec odzyskiwania z błędów

Wdrażaj łagodne mechanizmy zapasowe dla awarii narzędzi:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Najpierw spróbuj narzędzia podstawowego
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Zaloguj błąd
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Przełącz się na narzędzie zapasowe
            try:
                # Może być konieczna transformacja parametrów dla narzędzia zapasowego
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Oba narzędzia nie powiodły się
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Ta implementacja zależałaby od konkretnych narzędzi
        # W tym przykładzie po prostu zwrócimy oryginalne parametry
        return params

# Przykład użycia
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Podstawowe (płatne) API pogodowe
        "basicWeatherService",    # Zapasowe (darmowe) API pogodowe
        {"location": location}
    )
```

### 5. Wzorzec komponowania przepływów

Buduj złożone przepływy pracy, komponując prostsze:

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

# Testowanie serwerów MCP: najlepsze praktyki i kluczowe wskazówki

## Przegląd

Testowanie jest krytycznym aspektem tworzenia niezawodnych, wysokiej jakości serwerów MCP. Niniejszy przewodnik dostarcza kompleksowych najlepszych praktyk i wskazówek dotyczących testowania serwerów MCP na wszystkich etapach rozwoju, od testów jednostkowych po testy integracyjne i walidację end-to-end.

## Dlaczego testowanie jest ważne w serwerach MCP

Serwery MCP pełnią kluczową rolę jako middleware pomiędzy modelami AI a aplikacjami klienckimi. Dokładne testowanie zapewnia:

- Niezawodność w środowiskach produkcyjnych
- Poprawne przetwarzanie żądań i odpowiedzi
- Właściwą implementację specyfikacji MCP
- Odporność na awarie i przypadki brzegowe
- Stałą wydajność przy różnych obciążeniach

## Testowanie jednostkowe serwerów MCP

### Testowanie jednostkowe (fundament)

Testy jednostkowe weryfikują pojedyncze komponenty serwera MCP w izolacji.

#### Co testować

1. **Obsługiwacze zasobów**: testuj logikę każdego obsługiwacza zasobów niezależnie
2. **Implementacje narzędzi**: sprawdzaj zachowanie narzędzi z różnymi wejściami
3. **Szablony podpowiedzi**: upewnij się, że szablony podpowiedzi renderują się poprawnie
4. **Walidacja schematów**: testuj logikę walidacji parametrów
5. **Obsługa błędów**: weryfikuj odpowiedzi na nieprawidłowe dane

#### Najlepsze praktyki testów jednostkowych

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
# Przykładowy test jednostkowy dla narzędzia kalkulator w Pythonie
def test_calculator_tool_add():
    # Przygotuj
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Wykonaj
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Sprawdź
    assert result["value"] == 12
```

### Testowanie integracyjne (warstwa środkowa)

Testy integracyjne sprawdzają interakcje między komponentami serwera MCP.

#### Co testować

1. **Inicjalizacja serwera**: testuj uruchamianie serwera z różnymi konfiguracjami
2. **Rejestracja tras**: sprawdzaj poprawną rejestrację wszystkich punktów końcowych
3. **Przetwarzanie żądań**: testuj pełny cykl żądanie-odpowiedź
4. **Propagacja błędów**: upewnij się, że błędy są właściwie obsługiwane między komponentami
5. **Uwierzytelnianie i autoryzacja**: testuj mechanizmy bezpieczeństwa

#### Najlepsze praktyki testów integracyjnych

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

### Testowanie end-to-end (warstwa najwyższa)

Testy end-to-end weryfikują zachowanie całego systemu od klienta do serwera.

#### Co testować

1. **Komunikacja klient-serwer**: testuj pełne cykle żądanie-odpowiedź
2. **Rzeczywiste SDK klientów**: testuj z rzeczywistymi implementacjami klienta
3. **Wydajność pod obciążeniem**: weryfikuj zachowanie przy wielu równoczesnych żądaniach
4. **Odzyskiwanie po błędach**: testuj przywracanie systemu po awariach
5. **Operacje długotrwałe**: weryfikuj obsługę strumieniowania i długich operacji

#### Najlepsze praktyki testów E2E

```typescript
// Przykładowy test E2E z klientem w TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Uruchom serwer w środowisku testowym
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Działanie
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Sprawdzenie oczekiwań
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Strategie makietowania (mocking) w testach MCP

Makietowanie jest niezbędne do izolowania komponentów podczas testów.

### Komponenty do makietowania

1. **Zewnętrzne modele AI**: makietuj odpowiedzi modeli dla przewidywalnego testowania
2. **Zewnętrzne usługi**: makietuj zależności API (bazy danych, usługi stron trzecich)
3. **Usługi uwierzytelniania**: makietuj dostawców tożsamości
4. **Dostawcy zasobów**: makietuj kosztowne obsługiwacze zasobów

### Przykład: makietowanie odpowiedzi modelu AI

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
# Przykład Pythona z unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Skonfiguruj mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Użyj mocka w teście
    server = McpServer(model_client=mock_model)
    # Kontynuuj test
```

## Testowanie wydajności

Testowanie wydajności jest kluczowe dla produkcyjnych serwerów MCP.

### Co mierzyć

1. **Opóźnienie**: czas odpowiedzi na żądania
2. **Przepustowość**: liczba obsłużonych żądań na sekundę
3. **Wykorzystanie zasobów**: użycie CPU, pamięci, sieci
4. **Obsługa współbieżności**: zachowanie przy równoległych żądaniach
5. **Charakterystyka skalowania**: wydajność przy rosnącym obciążeniu

### Narzędzia do testów wydajności

- **k6**: narzędzie open-source do testów obciążeniowych
- **JMeter**: kompleksowe testy wydajności
- **Locust**: testy obciążeniowe oparte na Pythonie
- **Azure Load Testing**: testy wydajności w chmurze

### Przykład: podstawowy test obciążeniowy z k6

```javascript
// skrypt k6 do testowania obciążenia serwera MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 użytkowników wirtualnych
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

## Automatyzacja testów serwerów MCP

Automatyzacja testów zapewnia stałą jakość i szybsze pętle informacji zwrotnych.

### Integracja CI/CD

1. **Uruchamiaj testy jednostkowe przy pull requestach**: upewnij się, że zmiany w kodzie nie psują istniejącej funkcjonalności
2. **Testy integracyjne w stagingu**: Uruchamiaj testy integracyjne w środowiskach przedprodukcyjnych  
3. **Bazowe wskaźniki wydajności**: Utrzymuj benchmarki wydajnościowe, aby wychwytywać regresje  
4. **Skanowanie bezpieczeństwa**: Automatyzuj testy bezpieczeństwa jako część pipeline'u  

### Przykładowy pipeline CI (GitHub Actions)

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

## Testowanie zgodności ze specyfikacją MCP

Zweryfikuj, czy Twój serwer poprawnie implementuje specyfikację MCP.

### Kluczowe obszary zgodności

1. **Punkty końcowe API**: Testuj wymagane endpointy (/resources, /tools, itd.)  
2. **Format żądania/odpowiedzi**: Weryfikuj zgodność ze schematem  
3. **Kody błędów**: Sprawdzaj poprawność kodów statusu dla różnych scenariuszy  
4. **Typy treści**: Testuj obsługę różnych typów treści  
5. **Proces uwierzytelniania**: Weryfikuj mechanizmy uwierzytelniania zgodne ze specyfikacją  

### Zestaw testów zgodności

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

## 10 najlepszych wskazówek do skutecznego testowania serwera MCP

1. **Testuj definicje narzędzi oddzielnie**: Weryfikuj definicje schematów niezależnie od logiki narzędzi  
2. **Używaj testów parametryzowanych**: Testuj narzędzia z różnorodnymi wejściami, w tym przypadkami brzegowymi  
3. **Sprawdzaj odpowiedzi błędów**: Weryfikuj prawidłową obsługę błędów we wszystkich możliwych przypadkach  
4. **Testuj logikę autoryzacji**: Zapewnij właściwą kontrolę dostępu dla różnych ról użytkowników  
5. **Monitoruj pokrycie testów**: Dąż do wysokiego pokrycia kodu krytycznych ścieżek  
6. **Testuj odpowiedzi streamingowe**: Weryfikuj prawidłową obsługę strumieniowanej treści  
7. **Symuluj problemy sieciowe**: Testuj zachowanie w warunkach słabego połączenia  
8. **Testuj limity zasobów**: Sprawdzaj zachowanie przy osiąganiu limitów kwot lub limitów zapytań  
9. **Automatyzuj testy regresji**: Buduj zestaw, który uruchamia się przy każdej zmianie kodu  
10. **Dokumentuj przypadki testowe**: Utrzymuj jasną dokumentację scenariuszy testowych  

## Typowe pułapki podczas testowania

- **Nadmierne poleganie na testach „happy path”**: Upewnij się, że testujesz dokładnie także przypadki błędów  
- **Ignorowanie testów wydajności**: Wykrywaj wąskie gardła zanim wpłyną na produkcję  
- **Testowanie wyłącznie w izolacji**: Łącz testy jednostkowe, integracyjne i end-to-end  
- **Niepełne pokrycie API**: Zapewnij testowanie wszystkich endpointów i funkcji  
- **Niespójne środowiska testowe**: Używaj kontenerów, aby zapewnić spójność środowisk testowych  

## Podsumowanie

Kompleksowa strategia testowania jest niezbędna do tworzenia niezawodnych, wysokiej jakości serwerów MCP. Wdrażając najlepsze praktyki i wskazówki zawarte w tym przewodniku, możesz mieć pewność, że Twoje implementacje MCP spełnią najwyższe standardy jakości, niezawodności i wydajności.  

## Kluczowe wnioski

1. **Projektowanie narzędzi**: Stosuj zasadę pojedynczej odpowiedzialności, używaj wstrzykiwania zależności i projektuj pod kątem kompozycyjności  
2. **Projektowanie schematu**: Twórz jasne, dobrze udokumentowane schematy z odpowiednimi ograniczeniami walidacji  
3. **Obsługa błędów**: Implementuj łagodne zarządzanie błędami, ustrukturyzowane odpowiedzi błędów oraz mechanizm ponawiania  
4. **Wydajność**: Korzystaj z cache'owania, asynchronicznego przetwarzania i ograniczania zasobów  
5. **Bezpieczeństwo**: Stosuj dokładną walidację danych wejściowych, kontrole autoryzacji oraz właściwą obsługę danych wrażliwych  
6. **Testowanie**: Twórz kompleksowe testy jednostkowe, integracyjne i end-to-end  
7. **Wzorce workflow**: Stosuj sprawdzone wzorce, takie jak łańcuchy, dispatcher i przetwarzanie równoległe  

## Ćwiczenie

Zaprojektuj narzędzie MCP oraz workflow dla systemu przetwarzania dokumentów, które:

1. Przyjmuje dokumenty w wielu formatach (PDF, DOCX, TXT)  
2. Ekstrahuje tekst i kluczowe informacje z dokumentów  
3. Klasyfikuje dokumenty według typu i zawartości  
4. Generuje podsumowanie każdego dokumentu  

Zaimplementuj schematy narzędzia, obsługę błędów oraz wzorzec workflow najlepiej odpowiadający temu scenariuszowi. Zastanów się, jak przetestowałbyś tę implementację.  

## Zasoby  

1. Dołącz do społeczności MCP na [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs), aby być na bieżąco z najnowszymi informacjami  
2. Wspieraj projekty open-source [MCP](https://github.com/modelcontextprotocol)  
3. Stosuj zasady MCP we własnych inicjatywach AI w swojej organizacji  
4. Poznaj specjalistyczne implementacje MCP dla swojej branży  
5. Rozważ udział w zaawansowanych kursach na wybrane tematy MCP, takie jak integracja multimodalna czy integracja aplikacji korporacyjnych  
6. Eksperymentuj z budowaniem własnych narzędzi i workflow MCP, korzystając z zasad przedstawionych w [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Co dalej

Następny rozdział: [Studia przypadków](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->