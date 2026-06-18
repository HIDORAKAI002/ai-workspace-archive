# Најбоље праксе за развој MCP-а

[![MCP Development Best Practices](../../../translated_images/sr/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Кликните на слику изнад да гледате видео овог часа)_

## Преглед

Овај час се фокусира на напредне најбоље праксе за развој, тестирање и распоређивање MCP сервера и функција у продукционом окружењу. Како MCP екосистеми расту у сложености и важности, праћење успостављених образаца обезбеђује поузданост, одрживост и међусобну повезивост. Овај час консолидује практичну мудрост стечену кроз стварне имплементације MCP-а како би вас упутио у креирање робусних, ефикасних сервера са ефикасним ресурсима, упутствима и алатима.

## Циљеви учења

До краја овог часа, моћи ћете да:

- Примените најбоље индустријске праксе у дизајну MCP сервера и функција
- Креирате свеобухватне стратегије тестирања за MCP сервере
- Дизајнирате ефикасне, поново употребљиве шаблоне радних токова за сложене MCP апликације
- Имплементирате исправно руковање грешкама, логовање и надгледање у MCP серверима
- Оптимизујете MCP имплементације за перформансе, безбедност и одрживост

## Основни принципи MCP-а

Пре него што уђемо у конкретне праксе имплементације, важно је разумети основне принципе који воде ефикасан развој MCP-а:

1. **Стандардизована комуникација**: MCP користи JSON-RPC 2.0 као основу, обезбеђујући конзистентан формат захтева, одговора и руковања грешкама у свим имплементацијама.

2. **Дизајн усмерен на корисника**: Увек дајте приоритет сагласности, контроли и транспарентности корисника у вашим MCP имплементацијама.

3. **Безбедност на првом месту**: Имплементирајте робусне безбедносне мере укључујући аутентификацију, ауторизацију, валидацију и ограничавање стопе приступа.

4. **Модуларна архитектура**: Дизајнирајте MCP сервере модуларно, где сваки алат и ресурс имају јасну, фокусирану сврху.

5. **Стејтфул конекције**: Искористите способност MCP-а да одржава стање између више захтева ради конзистентнијих и контекстуално свесних интеракција.

## Званичне најбоље праксе MCP-а

Следеће најбоље праксе потичу из званичне документације Model Context Protocola:

### Најбоље праксе за безбедност

1. **Сагласност и контрола корисника**: Увек захтевајте експлицитну сагласност корисника пре приступа подацима или извођења операција. Обезбедите јасну контролу над тим који подаци се деле и које акције су овлашћене.

2. **Приватност података**: Изложите корисничке податке само уз експлицитну сагласност и заштитите их одговарајућим контролама приступа. Заштитите се од неовлашћеног преноса података.

3. **Безбедност алата**: Захтевајте експлицитну сагласност корисника пре позива било ког алата. Осигурајте да корисници разумеју функционалност сваког алата и спроведите робусне безбедносне границе.

4. **Контрола дозвола алата**: Конфигуришите које алате модел сме да користи током сесије, осигуравајући приступ само експлицитно овлашћеним алатима.

5. **Аутентификација**: Захтевајте исправну аутентификацију пре него што омогућите приступ алатима, ресурсима или осетљивим операцијама, користећи API кључеве, OAuth токене или друге безбедне методе аутентификације.

6. **Валидација параметара**: Спроведите валидацију за све позиве алата како бисте спречили да лош унос или злонамерни подаци стигну до имплементација алата.

7. **Ограничавање стопе приступа**: Имплементирајте ограничавање стопе приступа како бисте спречили злоупотребу и обезбедили фер коришћење ресурса сервера.

### Најбоље праксе имплементације

1. **Преговарање о могућностима**: Током успостављања везе размените информације о подржаним функцијама, верзијама протокола, доступним алатима и ресурсима.

2. **Дизајн алата**: Креирајте фокусиране алате који добро обављају једну ствар, уместо монолитних алата који обрађују више аспеката.

3. **Руковање грешкама**: Имплементирајте стандаризоване поруке и кодове грешака како бисте помогли у дијагностици проблема, грациозно руковали неуспесима и обезбедили корисне повратне информације.

4. **Логовање**: Конфигуришите структуриране логове за ревизију, дебаговање и праћење интеракција протокола.

5. **Праћење напретка**: За дуготрајне операције пријављујте ажурирања напретка како би се омогућили одзивни кориснички интерфејси.

6. **Отказивање захтева**: Омогућите клијентима да отказују тренутне захтеве који више нису потребни или трају превише дуго.

## Додатне референце

За најновије информације о најбољим праксама MCP-а, погледајте:

- [МCP документација](https://modelcontextprotocol.io/)
- [MCP спецификација (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub репозиторијум](https://github.com/modelcontextprotocol)
- [Безбедносне најбоље праксе](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Безбедносни ризици и ублажавања
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Практична обука о безбедности

## Примери практичне имплементације

### Најбоље праксе дизајна алата

#### 1. Принцип једне одговорности

Сваки MCP алат треба да има јасну, фокусирану сврху. Уместо да креирате монолитне алате који покушавају да обраде више аспеката, развијајте специјализоване алате који извршавају одређене задатке одлично.

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

#### 2. Конзистентно руковање грешкама

Имплементирајте робусно руковање грешкама са информативним порукама о грешкама и одговарајућим механизмима за опоравак.

```python
# Питхон пример са свеобухватним руковањем грешкама
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Валидација параметара
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Валидација безбедности
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Рад са базом података са временским ограничењем
                async with timeout(10):  # Временско ограничење од 10 секунди
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Грешке конекције могу бити привремене
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Грешке у упитима су вероватно грешке клијента
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Пустити да грешке специфичне за алат прођу
            raise
        except Exception as e:
            # Универзално хватање неочекиваних грешака
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Имплементација детекције SQL инјекције
        pass
        
    def _log_error(self, message, error):
        # Имплементација евидентирања грешака
        pass
```

#### 3. Валидација параметара

Увек темељно валидајте параметре како бисте спречили лош унос или злонамерни податак.

```javascript
// JavaScript/TypeScript пример са детаљном провером параметара
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
    // 1. Проверити присуство параметра
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Проверити типове параметара
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Проверити вредности параметара
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Проверити присуство садржаја за операцију уписа
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Проверити безбедност путање
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Имплементација на основу проверених параметара
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Имплементација провере безбедности путање
    // ...
  }
}
```

### Примери безбедносне имплементације

#### 1. Аутентификација и ауторизација

```java
// Јава пример са аутентификацијом и ауторизацијом
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Убризгавање зависности
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
        // 1. Извлачење контекста аутентификације
        String authToken = request.getContext().getAuthToken();
        
        // 2. Аутентификовати корисника
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Проверити ауторизацију за конкретну операцију
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Наставити са овлашћеном операцијом
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

#### 2. Ограничење стопе приступа

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

## Најбоље праксе тестирања

### 1. Јединично тестирање MCP алата

Увек тестирајте алате одвојено, као икење спољних зависности:

```typescript
// Примерак јединичног теста за алат у TypeScript-у
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Креирај мок услугу за време
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Креирај алат са мок зависношћу
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Припреми
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Изврши
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Потврди
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Припреми
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Изврши и потврди
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Интеграционо тестирање

Тестирајте комплетан ток од захтева клијента до одговора сервера:

```python
# Пример интеграционог теста у Пајтон-у
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Покрени тест сервер
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Креирај клијента
        client = McpClient("http://localhost:5000")
        
        # Тестирај откривање алата
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Тестирај извршавање алата
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Верификуј одговор
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Очисти ресурсе
        await server.stop()
```

## Оптимизација перформанси

### 1. Стратегије кеширања

Имплементирајте одговарајуће кеширање како бисте смањили латенцију и коришћење ресурса:

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

#### 2. Убризгавање зависности и тестабилност

Дизајнирајте алате да примају своје зависности преко конструктора, чинећи их тестабилним и конфигуришућим:

```java
// Јава пример са убризгавањем зависности
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Зависности убризгане кроз конструктор
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Имплементација алата
    // ...
}
```

#### 3. Компонентни алати

Дизајнирајте алате који се могу састављати за креирање сложенијих радних токова:

```python
# Python пример који показује композитне алате
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Имплементација...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Овај алат може користити резултате алата за преузимање података
    async def execute_async(self, request):
        # Имплементација...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Овај алат може користити резултате алата за анализу података
    async def execute_async(self, request):
        # Имплементација...
        pass

# Ови алати могу да се користе самостално или као део радног процеса
```

### Најбоље праксе дизајна шеме

Шема је уговор између модела и вашег алата. Добро дизајниране шеме доводе до боље употребљивости алата.

#### 1. Јасни описи параметара

Увек укључујте описне информације за сваки параметар:

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

#### 2. Ограничења валидације

Укључите ограничења валидације да спречите неважеће уносе:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Својство е-поште са валидацијом формата
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Својство за старост са нумеричким ограничењима
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Енумерирано својство
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

#### 3. Конзистентне структуре повратка

Одржавајте конзистентност у структурама одговора како би модели лакше интерпретирали резултате:

```python
async def execute_async(self, request):
    try:
        # Обради захтев
        results = await self._search_database(request.parameters["query"])
        
        # Увек враћај доследну структуру
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

### Руковање грешкама

Робусно руковање грешкама је кључно да би MCP алати били поуздани.

#### 1. Грациозно руковање грешкама

Руковање грешкама на одговарајућим нивоима и обезбеђивање информативних порука:

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

#### 2. Структурирани одговори о грешкама

Враћајте структуриранe информацијe о грешкама кад је могуће:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Имплементација
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
        
        // Поново баци друге изузетке као ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Логика поновног покушаја

Имплементирајте одговарајућу логику поновног покушаја за пролазне неуспехе:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # секунде
    
    while retry_count < max_retries:
        try:
            # Позови спољашњи API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Експоненцијално одлагање
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Нетранзијентна грешка, не покушавај поново
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Оптимизација перформанси

#### 1. Кеширање

Имплементирајте кеширање за скупе операције:

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

#### 2. Асиметрично обрађивање

Користите асинхроне програмске образце за I/O операције:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // За дуготрајне операције, одмах вратите ID обраде
        String processId = UUID.randomUUID().toString();
        
        // Покрени асинхрону обраду
        CompletableFuture.runAsync(() -> {
            try {
                // Изврши дуготрајну операцију
                documentService.processDocument(documentId);
                
                // Ажурирај статус (обично се чува у бази података)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Врати тренутни одговор са ID процеса
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Алат за праћење статуса пратитеља
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

#### 3. Ограничење ресурса

Имплементирајте ограничење ресурса да спречите преоптерећење:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Дозволи 5 захтева у секунди
            bucket_size=10        # Дозволи набујање до 10 захтева
        )
    
    async def execute_async(self, request):
        # Проверити да ли можемо наставити или морамо чекати
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Ако је чекање превише дуго
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Чекај одговарајуће време кашњења
                await asyncio.sleep(delay)
        
        # Потроши један токен и настави са захтевом
        self.rate_limiter.consume()
        
        # Позови API
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
            
            # Израчунај време до следећег доступног токена
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Додај нове токене на основу протеклог времена
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Најбоље праксе безбедности

#### 1. Валидација уноса

Увек темељно валидајте улазне параметре:

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

#### 2. Провере ауторизације

Имплементирајте исправне провере ауторизације:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Добијање корисничког контекста из захтева
    UserContext user = request.getContext().getUserContext();
    
    // Провера да ли корисник има потребне дозволе
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // За одређене ресурсе, провери приступ том ресурсу
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Настави са извршењем алата
    // ...
}
```

#### 3. Руковање осетљивим подацима

Пажљиво руковати осетљивим подацима:

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
        
        # Преузми корисничке податке
        user_data = await self.user_service.get_user_data(user_id)
        
        # Филтрирај осетљива поља осим ако нису изричито затражена И овлашћена
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Провери ниво овлашћења у контексту захтева
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Креирај копију да би се избегла измена оригинала
        redacted = user_data.copy()
        
        # Црвени специјална осетљива поља
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Црвени угнежђене осетљиве податке
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Најбоље праксе тестирања MCP алата

Свеобухватно тестирање осигурава да MCP алати исправно функционишу, правилно обрађују случајеве ивице и интегришу се са остатком система.

### Јединично тестирање

#### 1. Тестирајте сваки алат одвојено

Креирајте фокусиране тестове за функционалност сваког алата:

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

#### 2. Тестирање валидације шеме

Тестирајте да ли су шеме валидне и правилно примењују ограничења:

```java
@Test
public void testSchemaValidation() {
    // Креирај инстанцу алата
    SearchTool searchTool = new SearchTool();
    
    // Добава шему
    Object schema = searchTool.getSchema();
    
    // Претвори шему у JSON за валидацију
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Потврди да је шема валидан JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Тестирај важеће параметре
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Тестирај недостатак обавезног параметра
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Тестирај неважећи тип параметра
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Тестови руковања грешкама

Креирајте специфичне тестове за услове грешака:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Организујте
    tool = ApiTool(timeout=0.1)  # Веома кратко време истека
    
    # Измамити захтев који ће истећи
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Дуже од времена истека
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Делујте и потврдите
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Проверите поруку о изузетку
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Организујте
    tool = ApiTool()
    
    # Измамити одговор са ограничењем учесталости
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
        
        # Делујте и потврдите
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Проверите да ли изузетак садржи информацију о ограничењу учесталости
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Интеграционо тестирање

#### 1. Тестирање ланца алата

Тестирајте алате који раде заједно у очекиваним комбинацијама:

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

#### 2. Тестирање MCP сервера

Тестирајте MCP сервер са комплетном регистрацијом и извршењем алата:

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
        // Тестирај крајњу тачку откривања
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Креирај захтев за алат
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Пошаљи захтев и провери одговор
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Креирај неприхватљив захтев за алат
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Недостаје параметар "b"
        request.put("parameters", parameters);
        
        // Пошаљи захтев и провери одговор са грешком
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Енд-то-енд тестирање

Тестирајте комплетне токове од упита модела до извршења алата:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Подесити - Подесити MCP клијента и мок модел
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Одговори мок модела
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
    
    # Одговор мок алатке за време
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
        
        # Акција
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Потврда
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Тестирање перформанси

#### 1. Тест оптерећења

Тестирајте колико истовремених захтева ваш MCP сервер може да обради:

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

#### 2. Стрес тестирање

Тестирајте систем под екстремним оптерећењем:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Подесите ЈМетер за стрес тестирање
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Конфигуришите план теста ЈМетер-а
    HashTree testPlanTree = new HashTree();
    
    // Креирајте план теста, групу нитова, семплере, итд.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Додајте HTTP семплер за извршавање алата
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Додајте слушаоце
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Покрените тест
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Верификујте резултате
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Просечно време одговора < 200мс
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90-ти процентил < 500мс
}
```

#### 3. Надгледање и профилисање

Подесите надгледање за дугорочну анализу перформанси:

```python
# Конфигуришите праћење за MCP сервер
def configure_monitoring(server):
    # Подесите Prometheus метрике
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
    
    # Додајте middleware за мерење времена и снимање метрика
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Објавите крајњу тачку за метрике
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Образци дизајна MCP радног тока

Добро дизајнирани MCP радни токови побољшавају ефикасност, поузданост и одрживост. Ево кључних образаца које треба следити:

### 1. Образац ланца алата

Повежите више алата у низу где излаз једног алата постаје улаз за следећи:

```python
# Имплементација Python ланца алата
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Листа имена алата који се извршавају узастопно
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Изврши сваки алат у ланцу, прослеђујући резултат претходног
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Сачувај резултат и користи га као улаз за следећи алат
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Пример употребе
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

### 2. Образац диспечера

Користите централни алат који усмерава на специјализоване алате на основу уноса:

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

### 3. Образац паралелне обраде

Извршавајте више алата истовремено ради ефикасности:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Корак 1: Преузми метаподатке скупа података (синхроно)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Корак 2: Покрени више анализа паралелно
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
        
        // Чекај да сви паралелни задаци заврше
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Чекај на завршетак
        
        // Корак 3: Комбинуј резултате
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Корак 4: Генериши резиме извештај
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Врати комплетан резултат радног процеса
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Образац опоравка од грешака

Имплементирајте грациозне резервне опције за неуспехе алата:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Прво испробајте примарни алат
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Запишите неуспех
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Прелазак на секундарни алат
            try:
                # Можда ће бити потребно трансформисати параметре за алат за резерву
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Обa алата су зашкрипала
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Ова имплементација зависи од специфичних алата
        # За овај пример, вратићемо само оригиналне параметре
        return params

# Пример коришћења
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Примарни (плаћени) временски API
        "basicWeatherService",    # Резервни (бесплатни) временски API
        {"location": location}
    )
```

### 5. Образац композиције радног тока

Креирајте сложене радне токове састављањем једноставнијих:

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

# Тестирање MCP сервера: најбоље праксе и савети

## Преглед

Тестирање је критичан аспект развоја поузданих, квалитетних MCP сервера. Овај водич пружа свеобухватне најбоље праксе и савете за тестирање ваших MCP сервера током развојног циклуса, од јединичних тестова до интеграционих тестова и енд-то-енд валидација.

## Зашто тестирање има значаја за MCP сервере

MCP сервери служе као кључни посредници између AI модела и клијентских апликација. Темељно тестирање обезбеђује:

- Поузданост у продукционим окружењима
- Тачно рукуовање захтевима и одговорима
- Исправну имплементацију MCP спецификација
- Отпорност на неуспехе и случајеве ивице
- Конзистентне перформансе при различитим оптерећењима

## Јединично тестирање за MCP сервере

### Јединично тестирање (основа)

Јединични тестови проверавају појединачне компоненте вашег MCP сервера изоловано.

#### Шта тестирати

1. **Руковаоци ресурса**: Тестирајте логику сваког руковаоца ресурса појединачно
2. **Имплементација алата**: Проверите понашање алата са разним уносима
3. **Обрасци упита**: Осигурајте да обрасци упита правилно раде
4. **Валидација шеме**: Тестирајте логику валидације параметара
5. **Руковање грешкама**: Проверите одговоре на погрешне уносе

#### Најбоље праксе за јединично тестирање

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
# Пример јединичног теста за калкулаторски алат у Питону
def test_calculator_tool_add():
    # Припрема
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Извршење
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Тврђење
    assert result["value"] == 12
```

### Интеграционо тестирање (средњи ниво)

Интеграциони тестови проверавају интеракције између компоненти вашег MCP сервера.

#### Шта тестирати

1. **Иницијализација сервера**: Тестирајте покретање сервера са различитим конфигурацијама
2. **Регистрација рута**: Проверите да ли су сви ендпоинти исправно регистровани
3. **Обрада захтева**: Тестирајте целокупан циклус захтев-одговор
4. **Пропагација грешака**: Обезбедите исправно руковање грешкама кроз компоненте
5. **Аутентификација и ауторизација**: Тестирајте безбедносне механизме

#### Најбоље праксе за интеграционо тестирање

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

### Енд-то-енд тестирање (горњи слој)

Енд-то-енд тестови проверавају комплетно понашање система од клијента до сервера.

#### Шта тестирати

1. **Комуникација клијент-сервер**: Тестирајте комплетне захтев-одговор циклусе
2. **Прави клијентски SDK-ови**: Тестирајте са стварним клијентским имплементацијама
3. **Перформансе под оптерећењем**: Проверите понашање при више истовремених захтева
4. **Опоравак од грешака**: Тестирајте опоравак система од неуспеха
5. **Дуготрајне операције**: Проверите обраду стриминга и дугих операција

#### Најбоље праксе за енд-то-енд тестирање

```typescript
// Пример E2E теста са клијентом у TypeScript-у
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Покрени сервер у тест окруженју
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Изврши
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Потврди
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Стратегије имитирања за MCP тестирање

Имитирање (mocking) је неопходно за изоловање компоненти током тестирања.

### Компоненте за имитирање

1. **Спољни AI модели**: Имитирате одговоре модела за предвидљиво тестирање
2. **Спољне услуге**: Имитирате API зависности (базе података, сервисе трећих страна)
3. **Аутентификационе услуге**: Имитирате провајдере идентитета
4. **Пружаоци ресурса**: Имитирате скупе руковаоце ресурса

### Пример: Имитирање одговора AI модела

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
# Питхон пример са unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Конфигуришите мок
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Користите мок у тесту
    server = McpServer(model_client=mock_model)
    # Наставите са тестом
```

## Тестирање перформанси

Тестирање перформанси је кључно за продукционе MCP сервере.

### Шта мерити

1. **Латенција**: Време одговора на захтеве
2. **Пропусност**: Број обрађених захтева у секунди
3. **Коришћење ресурса**: CPU, меморија, мрежа
4. **Обрада паралелних захтева**: Понашање под паралелним захтевима
5. **Карактеристике скалирања**: Перформансе при увећању оптерећења

### Алати за тестирање перформанси

- **k6**: Отворени алат за тестирање оптерећења
- **JMeter**: Свеобухватно тестирање перформанси
- **Locust**: Тестирање оптерећења засновано на Python-у
- **Azure Load Testing**: Облачно тестирање перформанси

### Пример: Основни тест оптерећења са k6

```javascript
// к6 скрипт за оптерећење тестирања MCP сервера
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 виртуалних корисника
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

## Аутоматизација тестирања MCP сервера

Аутоматизација ваших тестова осигурава конзистентан квалитет и брже повратне информације.

### Интеграција CI/CD

1. **Покретање јединичних тестова на pull request-овима**: Обезбедите да промене у коду не квари постојећу функционалност
2. **Интеграциони тестови у стрејџингу**: Покрените интеграционе тестове у предпроизводним окружењима  
3. **Перформанс базе**: Одржавајте перформансне референтне вредности како бисте уочили регресије  
4. **Безбедносне скенирања**: Аутоматизујте безбедносно тестирање као део пипејна

### Пример CI пипејна (GitHub Actions)

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
  
## Тестирање усклађености са MCP спецификацијом

Проверите да ваш сервер исправно имплементира MCP спецификацију.

### Кључна подручја усклађености

1. **API крајње тачке**: Тестирајте потребне крајње тачке (/resources, /tools, итд.)  
2. **Формат захтева/одговора**: Потврдите усклађеност са шемом  
3. **Кодови грешака**: Проверите исправне статус кодове за различите сценарије  
4. **Типови садржаја**: Тестирајте обраду различитих типова садржаја  
5. **Аутентификациони ток**: Потврдите механизме аутентификације у складу са спецификацијом

### Тестни скуп за усклађеност

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
  
## Топ 10 савета за ефикасно тестирање MCP сервера

1. **Тестирајте дефиниције алата појединачно**: Проверавајте дефиниције шеме независно од логике алата  
2. **Користите параметризоване тестове**: Тестирајте алате са разноврсним уносима, укључујући и граничне случајеве  
3. **Провера одговора на грешке**: Потврдите исправну обраду грешака за све могуће услове грешке  
4. **Тестирајте логику ауторизације**: Обезбедите правилну контролу приступа за различите улоге корисника  
5. **Праћење покривености тестова**: Тежите ка великој покривености критичних делова кода  
6. **Тестирајте одговоре у стриму**: Потврдите исправну обраду стриминг садржаја  
7. **Симулација мрежних проблема**: Тестирајте понашање у условима лоше мреже  
8. **Тестирајте лимите ресурса**: Потврдите понашање приликом достижавања квота или лимита брзине  
9. **Аутоматизујте регресионе тестове**: Креирајте скуп који се покреће при свакој промени кода  
10. **Документујте тест сценарије**: Одржавајте јасну документацију тест случајева

## Уобичајене замке у тестирању

- **Превелика ослањања на срећни пут тестирања**: Обавезно темељно тестирајте случајеве грешака  
- **Игнорисање тестирања перформанси**: Идентификујте уске грла пре него што утичу на продукцију  
- **Тестирање само у изолацији**: Комбинујте јединичне, интеграционе и E2E тестове  
- **Непотпуна покривеност API-ја**: Осигурајте да су све крајње тачке и функције тестиране  
- **Недоследна окружења за тестирање**: Користите контејнере како бисте обезбедили доследна окружења за тестирање

## Закључак

Свеобухватна тест стратегија је суштинска за развој поузданих и висококвалитетних MCP сервера. Имплементирајући најбоље праксе и савете наведене у овом водичу, можете осигурати да ваше MCP имплементације испуњавају највише стандарде квалитета, поузданости и перформанси.

## Кључне појединости

1. **Дизајн алата**: Пратите принцип једне одговорности, користите dependency injection и дизајнирајте за композицију  
2. **Дизајн шема**: Креирајте јасне, добро докуменатоване шеме са адекватним валидирајућим ограничењима  
3. **Обрада грешака**: Имплементирајте елегантну обраду грешака, структуриране одговоре на грешке и логику поновног покушаја  
4. **Перформансе**: Користите кеширање, асинхрону обраду и контролу ресурса  
5. **Безбедност**: Примените темељну валидацију уноса, провере ауторизације и управљање осетљивим подацима  
6. **Тестирање**: Креирајте свеобухватне јединичне, интеграционе и енд-то-енд тестове  
7. **Обрасци радног тока**: Примени установљене обрасце као што су ланац, dispatcher-и и паралелна обрада

## Вежба

Дизајнирајте MCP алат и радни ток за систем обраде докумената који:

1. Прима документе у више формата (PDF, DOCX, TXT)  
2. Извлачи текст и кључне информације из докумената  
3. Класификује документе по типу и садржају  
4. Генерише резиме за сваки документ

Имплементирајте шеме алата, обраду грешака и образац радног тока који најбоље одговара овом сценарију. Размислите како бисте тестирали ову имплементацију.

## Ресурси

1. Придружите се MCP заједници на [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) да будете у току са најновијим развојима  
2. Доприносите пројектима отвореног кода [MCP пројекти](https://github.com/modelcontextprotocol)  
3. Примените MCP принципе у иницијативама вештачке интелигенције у својој организацији  
4. Истражите специјализоване MCP имплементације за своју индустрију.  
5. Размотрите напредне курсеве о специфичним MCP темама, као што су мулти-модална интеграција или ентерпрајз интеграција апликација.  
6. Испробајте прављење својих MCP алата и радних токова користећи принципе научене на [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

## Шта следи

Следеће: [Студије случаја](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->