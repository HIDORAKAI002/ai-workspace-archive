# Најбоље праксе развоја MCP-а

[![MCP Development Best Practices](../../../translated_images/sr/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Кликните на слику изнад да бисте погледали видео о овој лекцији)_

## Преглед

Ова лекција се фокусира на напредне најбоље праксе за развој, тестирање и објављивање MCP сервера и функција у продукционим окружењима. Како MCP екосистеми расту у сложености и значају, праћење утврђених образаца обезбеђује поузданост, одрживост и међупрозорност. Ова лекција окупља практичну мудрост стекнуту из имплементација MCP-а у стварном свету како би вас усмерила у креирању робусних, ефикасних сервера са ефикасним ресурсима, упутствима и алатима.

## Циљеви учења

На крају ове лекције, бићете у могућности да:

- Примените најбоље индустријске праксе у дизајну MCP сервера и функција  
- Креирате свеобухватне стратегије тестирања за MCP сервере  
- Дизајнирате ефикасне, поновно употребљиве обрасце радног тока за сложене MCP апликације  
- Имплементирате правилно руковање грешкама, евидентирање и посматрање у MCP серверима  
- Оптимизујете MCP имплементације за перформансе, безбедност и одрживост  

## Основни принципи MCP-а

Пре него што пређете на конкретне праксе имплементације, важно је разумети основне принципе који усмеравају ефикасан развој MCP-а:

1. **Стандарлизована комуникација**: MCP користи JSON-RPC 2.0 као основу, обезбеђујући конзистентан формат за захтеве, одговоре и руковање грешкама у свим имплементацијама.

2. **Кориснички оријентисан дизајн**: Увек имайте приоритет на пристанак корисника, контроли и транспарентности у вашим MCP имплементацијама.

3. **Безбедност на првом месту**: Имплементирајте робусне мере безбедности укључујући аутентификацију, ауторизацију, валидацију и ограничења учесталости.

4. **Модуларна архитектура**: Дизајнирајте своје MCP сервере као модуларна решења, где сваки алат и ресурс има јасну, фокусирана сврху.

5. **Стационарне везе**: Искористите способност MCP-а да одржава стање кроз више захтева за коherentније и контекстуално свесније интеракције.

## Званичне најбоље праксе MCP-а

Следеће најбоље праксе потичу из званичне документације Model Context Protocol:

### Најбоље праксе безбедности

1. **Пристанаци корисника и контрола**: Увек захтевајте јасан пристанак корисника пре приступа подацима или обављања операција. Обезбедите јасну контролу над тим који се подаци деле и које су акције овлашћене.

2. **Приватност података**: Изложите корисничке податке само уз јасан пристанак и заштитите их одговарајућим контролама приступа. Штитите од неовлашћеног преноса података.

3. **Безбедност алата**: Захтевајте јасан пристанак корисника пре позива било ког алата. Обезбедите да корисници разумеју функције сваког алата и примените робусне безбедносне границе.

4. **Контрола дозвола алата**: Конфигуришите које алате модел може користити током сесије, обезбеђујући да су приступачни само експлицитно овлашћени алати.

5. **Аутентификација**: Захтевајте исправну аутентификацију пре омогућавања приступа алатима, ресурсима или осетљивим операцијама коришћењем API кључева, OAuth токена или других безбедних метода аутентификације.

6. **Валидација параметара**: Спроводите валидацију за све позиве алата да спречите неважећи или злонамерни унос који долази до имплементација алата.

7. **Ограничење учесталости**: Имплементирајте ограничење учесталости да бисте спречили злоупотребу и обезбедили фер коришћење ресурса сервера.

### Најбоље праксе имплементације

1. **Преговарање о могућностима**: Током успостављања везе, размените информације о подржаним функцијама, верзијама протокола, расположивим алатима и ресурсима.

2. **Дизајн алата**: Креирајте фокусиране алате који раде једну ствар одлично, уместо монолитних алата који се баве више аспеката.

3. **Руковање грешкама**: Имплементирајте стандартизоване поруке и шифре грешака како бисте помогли у дијагностици проблема, руковању неуспесима и пружању корисних повратних информација.

4. **Евидентирање (логовање)**: Конфигуришите структуриране логове за ревизију, отклањање грешака и праћење интеракција протокола.

5. **Праћење напретка**: За дугорочне операције, извештавајте о напредку како бисте омогућили одзивни кориснички интерфејс.

6. **Отказивање захтева**: Омогућите клијентима да отказују захтеве у току који више нису потребни или трају предуго.

## Додатне референце

За најновије информације о најбољим праксама MCP-а, погледајте:

- [MCP документација](https://modelcontextprotocol.io/)
- [MCP спецификација (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub репозиторијум](https://github.com/modelcontextprotocol)
- [Најбоље праксе безбедности](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Топ 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Безбедносни ризици и мере
- [MCP Security Summit радионица (Sherpa)](https://azure-samples.github.io/sherpa/) - Практична обука безбедности

## Практични примери имплементације

### Најбоље праксе у дизајну алата

#### 1. Принцип једне одговорности

Сваком MCP алату треба дати јасну, фокусирану сврху. Уместо креирања монолитних алата који покушавају да реше више проблема, развијајте специјализоване алате који одлично обављају одређене задатке.

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

#### 2. Доследно руковање грешкама

Имплементирајте робусно руковање грешкама са информативним порукама и одговарајућим механизмима опоравка.

```python
# Python пример са свеобухватним руковањем грешкама
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
            
            # Безбедносна валидација
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Операција базе података са временским ограничењем
                async with timeout(10):  # Временско ограничење од 10 секунди
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Грешке у вези могу бити пролазне
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Грешке у упиту су вероватно грешке клијента
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Дозволи да грешке специфичне за алат прођу
            raise
        except Exception as e:
            # Свеобухватних за неочекиване грешке
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Имплементација детекције SQL инјекција
        pass
        
    def _log_error(self, message, error):
        # Имплементација евидентирања грешака
        pass
```

#### 3. Валидација параметара

Увек темељно проверавајте параметре како бисте спречили неважећи или злонамерни унос.

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
    // 1. Проверите присуство параметра
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Проверите типове параметара
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Проверите вредности параметара
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Проверите присуство садржаја за операцију уписа
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Провера безбедности путање
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Имплементација заснована на провереним параметрима
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Имплементација провере безбедности путање
    // ...
  }
}
```

### Примери имплементације безбедности

#### 1. Аутентификација и ауторизација

```java
// Јава пример са аутентификацијом и ауторизацијом
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Инјекција зависности
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
        // 1. Извучите контекст аутентификације
        String authToken = request.getContext().getAuthToken();
        
        // 2. Аутентификујте корисника
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Проверите ауторизацију за конкретну операцију
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Наставите са ауторизованом операцијом
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

#### 2. Ограничење учесталости

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

Увек тестирајте своје алате изоловано, користећи заваравање спољних зависности:

```typescript
// Пример TypeScript јединичног теста алата
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Креирај лажни сервис за временску прогнозу
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Креирај алат са лажном зависношћу
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
# Пример интеграционог теста у Пајтону
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
        
        # Потврди одговор
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Очисти окружење
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

#### 2. Инјекција зависности и тестабилност

Дизајнирајте алате да примају своје зависности преко конструктора, што их чини тестабилним и конфигурисаним:

```java
// Пример у Јава са убризгавањем зависности
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

Дизајнирајте алате који се могу компоновати за креирање сложенијих радних токова:

```python
# Пайтон пример показујући комбиноване алате
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Имплементација...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Овај алат може користити резултате са алата за преузимање података
    async def execute_async(self, request):
        # Имплементација...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Овај алат може користити резултате са алата за анализу података
    async def execute_async(self, request):
        # Имплементација...
        pass

# Ови алати се могу користити независно или као део радног тока
```

### Најбоље праксе дизајна шеме

Шема представља уговор између модела и вашег алата. Добро дизајниране шеме доводе до боље употребљивости алата.

#### 1. Јасни описи параметара

Увек укључите описне информације за сваки параметар:

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
    
    // Особина е-поште са валидацијом формата
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Особина старости са нумеричким ограничењима
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Енумеративна особина
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

#### 3. Доследне структуре повратка

Одржавајте конзистентност у вашим структурама одговора како бисте моделима олакшали интерпретацију резултата:

```python
async def execute_async(self, request):
    try:
        # Обради захтев
        results = await self._search_database(request.parameters["query"])
        
        # Увек враћај конзистентну структуру
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

Робусно руковање грешкама је кључно за очување поузданости MCP алата.

#### 1. Нежно руковање грешкама

Руководите грешкама на одговарајућем нивоу и пружајте информативне поруке:

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

Вратите структуриране информације о грешкама кад је могуће:

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

Имплементирајте одговарајућу логику поновних покушаја за трансјентне неуспехе:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # секунди
    
    while retry_count < max_retries:
        try:
            # Позови спољни API
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
            # Нетранзитна грешка, не покушавај поново
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

#### 2. Асинхрона обрада

Користите асинхроне програмске обрасце за I/O операције:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // За операције које трају дуго, одмах вратити ID обраде
        String processId = UUID.randomUUID().toString();
        
        // Започни асинхрону обраду
        CompletableFuture.runAsync(() -> {
            try {
                // Изврши дуготрајну операцију
                documentService.processDocument(documentId);
                
                // Ажурирај статус (обично би се чувао у бази података)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Вратити одмах одговор са ID процеса
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Помоћни алат за проверу статуса
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

Имплементирајте контролу оптерећења ресурса да спречите преоптерећење:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Дозволи 5 захтева у секунди
            bucket_size=10        # Дозволи таласе до 10 захтева
        )
    
    async def execute_async(self, request):
        # Провери да ли можемо да наставимо или треба да сачекамо
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Ако је чекање прелако дуго
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Сачекај одговарајуће време закаснења
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

Увек темељно проверавајте улазне параметре:

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

Имплементирајте исправне ауторизационе провере:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Узми контекст корисника из захтева
    UserContext user = request.getContext().getUserContext();
    
    // Провери да ли корисник има потребне дозволе
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // За посебне ресурсе, провери приступ том ресурсу
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Настави са извршењем алата
    // ...
}
```

#### 3. Руковање осетљивим подацима

Пажљиво поступајте са осетљивим подацима:

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
        
        # Преузми податке корисника
        user_data = await self.user_service.get_user_data(user_id)
        
        # Филтрирај осетљива поља осим ако није изричито затражено И овлашћено
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Провери ниво овлашћења у контексту захтева
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Направи копију да би се избегла измена оригинала
        redacted = user_data.copy()
        
        # Црвено означи одређена осетљива поља
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Црвено означи уграђене осетљиве податке
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Најбоље праксе тестирања MCP алата

Свеобухватно тестирање обезбеђује да MCP алати исправно функционишу, правилно руковају ивицама случајева и правилно се интегришу са остатком система.

### Јединично тестирање

#### 1. Тестирајте сваки алат изоловано

Направите фокусиране тестове за функционалност сваког алата:

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

Тестирајте да ли су шеме важеће и да исправно спроводе ограничења:

```java
@Test
public void testSchemaValidation() {
    // Направити инстанцу алата
    SearchTool searchTool = new SearchTool();
    
    // Узми шему
    Object schema = searchTool.getSchema();
    
    // Претворити шему у JSON за валидацију
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Валидација да ли је шема важећи JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Тестирати важеће параметре
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Тестирати недостајући обавезни параметар
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Тестирати неважећи тип параметра
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
    # Организуј
    tool = ApiTool(timeout=0.1)  # Врло кратко време исчекивања
    
    # Мокирај захтев који ће истећи
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Дуже од времена исчекивања
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Дејствуј и провери
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Потврди поруку о изузетку
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Организуј
    tool = ApiTool()
    
    # Мокирај одговор са ограничењем брзине
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
        
        # Дејствуј и провери
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Проверите да ли изузетак садржи информације о ограничењу брзине
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Интеграционо тестирање

#### 1. Тестирање ланца алата

Тестирајте како алати раде заједно у очекиваним комбинацијама:

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

Тестирајте MCP сервер са пуном регистрацијом и извршењем алата:

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
        // Тестирајте ендпоинт за откривање
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Направите захтев за алат
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Пошаљите захтев и проверите одговор
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Направите неисправан захтев за алат
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Недостаје параметар "b"
        request.put("parameters", parameters);
        
        // Пошаљите захтев и проверите одговор са грешком
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Е2Е тестирање

Тестирајте комплетне радне токове од упита модела до извршења алата:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Подеси - Постави MCP клијент и модел за симулацију
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Одговори симулираног модела
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
    
    # Одговор симулираног алата за временску прогнозу
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
        
        # Делуј
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Потврди
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Тестирање перформанси

#### 1. Тестирање оптерећења

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

#### 2. Тестирање под оптерећењем

Тестирајте систем под екстремним оптерећењем:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Подесите ЈМетер за стрес тестирање
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Конфигуришите ЈМетер план теста
    HashTree testPlanTree = new HashTree();
    
    // Креирајте план теста, групу нити, семплере итд.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Додајте ХТТП семплер за извршење алата
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
    
    // Потврдите резултате
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Просечно време одзива < 200мс
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90-ти процентил < 500мс
}
```

#### 3. Надгледање и профилисање

Поставите надзор за дугорочну анализу перформанси:

```python
# Конфигуришите мониторинг за MCP сервер
def configure_monitoring(server):
    # Поставите Prometheus метрике
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
    
    # Додајте посреднички софтвер за мерење времена и снимање метрика
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Обезбедите крајњу тачку за метрике
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Образци дизајна радних токова MCP-а

Добро осмишљени радни токови MCP-а побољшавају ефикасност, поузданост и одрживост. Ево кључних образаца које треба пратити:

### 1. Образац ланца алата

Повежите више алата у низ где излаз једног алата постаје улаз за следећи:

```python
# Имплементација Python ланца алата
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Листа имена алата која треба извршити узастопно
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Изврши сваки алат у ланцу, прослеђујући претходни резултат
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Сачувај резултат и користи га као улаз за следећи алат
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Пример коришћења
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

Користите централни алат који усмерава захтеве ка специјализованим алатима на основу уноса:

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
        
        // Чекај да се све паралелне задатке заврше
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

Имплементирајте нежне ретраргументације у случају грешака алата:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Прво покушајте основни алат
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
                # Обa алата су пропала
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Ова имплементација би зависила од конкретних алата
        # За овај пример, вратићемо само оригиналне параметре
        return params

# Пример употребе
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Главни (плаћени) временски API
        "basicWeatherService",    # Резервни (бесплатни) временски API
        {"location": location}
    )
```

### 5. Образац композиције радних токова

Градите сложене радне токове састављањем једноставнијих:

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

# Тестирање MCP сервера: најбоље праксе и врхунски савети

## Преглед

Тестирање је критичан аспект развоја поузданих, квалитетних MCP сервера. Овај водич пружа свеобухватне најбоље праксе и савете за тестирање ваших MCP сервера током целог развојног циклуса, од јединичних тестова до интеграционих и е2е валидација.

## Зашто је тестирање важно за MCP сервере

MCP сервери служе као важан посредник између AI модела и клијентских апликација. Темљно тестирање обезбеђује:

- Поузданост у продукционом окружењу  
- Тачну обраду захтева и одговора  
- Правилну имплементацију MCP спецификација  
- Отпорност на грешке и ивичне случајеве  
- Конзистентне перформансе под различитим оптерећењима  

## Јединично тестирање за MCP сервере

### Јединично тестирање (основа)

Јединични тестови проверaвају појединачне компоненте вашег MCP сервера изоловано.

#### Шта тестирати

1. **Оператери ресурса**: Тестирајте логику сваког оператера ресурса независно  
2. **Имплементације алата**: Проверите понашање алата са различитим уносима  
3. **Шаблони упита**: Обезбедите да се шаблони упита исправно приказују  
4. **Валидација шеме**: Тестирајте логику валидације параметара  
5. **Руковање грешкама**: Проверите одговоре на грешке за неважеће уносе  

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
    
    # Потврда
    assert result["value"] == 12
```

### Интеграционо тестирање (средњи слој)

Интеграциони тестови проверавају интеракције између компоненти вашег MCP сервера.

#### Шта тестирати

1. **Иницијализација сервера**: Тестирајте покретање сервера са различитим конфигурацијама  
2. **Регистрација рута**: Потврдите да су сви крајњи тачке правилно регистроване  
3. **Обрада захтева**: Тестирајте пун циклус захтева и одговора  
4. **Препознавање грешака**: Обезбедите да се грешке правилно преносе између компоненти  
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

### Е2Е тестирање (виши слој)

Е2Е тестови проверавају понашање комплетног система од клијента до сервера.

#### Шта тестирати

1. **Комуникација клијент-сервер**: Тестирајте комплетне захтев-одговор циклусе  
2. **Стварни клијентски SDK-ови**: Тестирајте са стварним клијентским имплементацијама  
3. **Перформансе под оптерећењем**: Потврдите понашање са више истовремених захтева  
4. **Опоравак од грешака**: Тестирајте опоравак система од кварова  
5. **Дуго трајуће операције**: Проверите руковање стримовањем и дуготрајним операцијама

#### Најбоље праксе за Е2Е тестирање

```typescript
// Пример Е2Е теста са клијентом у TypeScript-у
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Покрени сервер у тест окружењу
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
    
    // Провери
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Стратегије за замена током тестирања MCP-а

Замењивање (мокирање) је неопходно за изолацију компоненти током тестирања.

### Компоненте за замењивање

1. **Спољашњи AI модели**: Замена одговора модела за предвидљиво тестирање  
2. **Спољашње услуге**: Замена API зависности (базе података, услуге трећих страна)  
3. **Услуге аутентификације**: Замена провајдера идентитета  
4. **Провајдери ресурса**: Замена скупих оператера ресурса  

### Пример: Замена одговора AI модела

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
    # Конфигуришите mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Користите mock у тесту
    server = McpServer(model_client=mock_model)
    # Наставите са тестом
```

## Тестирање перформанси

Тестирање перформанси је критично за продукционе MCP сервере.

### Шта мерити

1. **Латенција**: Време одзива за захтеве  
2. **Пропусност**: Захтеви обрађени у секунду  
3. **Коришћење ресурса**: CPU, меморија, мрежа  
4. **Руководење истовременошћу**: Понашање при паралелним захтевима  
5. **Карактеристике скалабилности**: Перформансе по расту оптерећења  

### Алати за тестирање перформанси

- **k6**: Отворени алат за тестирање оптерећења  
- **JMeter**: Комплетно тестирање перформанси  
- **Locust**: Тестирање оптерећења засновано на Python-у  
- **Azure Load Testing**: Облак засновано тестирање перформанси  

### Пример: Основни тест оптерећења са k6

```javascript
// k6 скрипт за оптерећење тестирања MCP сервера
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 виртуелних корисника
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

## Аутоматизација тестова за MCP сервере

Аутоматизација ваших тестова обезбеђује конзистентан квалитет и брже повратне информације.

### Интеграција CI/CD  
1. **Покрени јединичне тестове на захтевима за повлачење**: Осигурајте да промене кода не нарушавају постојећу функционалност  
2. **Интеграциони тестови у претпроизводном окружењу**: Покрени интеграционе тестове у претпроизводним окружењима  
3. **Основна перформансе**: Одржавајте перформансе као референтне вредности за откривање регресија  
4. **Безбедносни скенирања**: Аутоматизујте безбедносно тестирање као део процеса

### Пример CI pipeline-а (GitHub Actions)

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

Проверите да ли ваш сервер исправно имплементира MCP спецификацију.

### Кључна подручја усклађености

1. **API крајње тачке**: Тестирајте потребне крајње тачке (/resources, /tools, итд.)  
2. **Формат захтева/одговора**: Потврдите усклађеност са схемом  
3. **Кодови грешака**: Верификујте исправне статус кодове за различите сценарије  
4. **Типови садржаја**: Тестирајте руковање различитим типовима садржаја  
5. **Ток аутентификације**: Верификујте механизме аутентификације у складу са спецификацијом

### Комплет тестова за усклађеност

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

1. **Тестирајте дефиниције алата посебно**: Проверавајте дефиниције шема независно од логике алата  
2. **Користите параметризоване тестове**: Тестирајте алате са разноврсним улазима, укључујући и ивичне случајеве  
3. **Провера одговора са грешкама**: Верификујте исправно руковање грешкама за све могуће услове грешки  
4. **Тестирајте логику ауторизације**: Осигурајте правилну контролу приступа за различите корисничке улоге  
5. **Пратите покривеност тестовима**: Тежите високој покривености критичних делова кода  
6. **Тестирајте стриминг одговоре**: Верификујте правилно руковање стриминг садржајем  
7. **Симулирајте проблеме мреже**: Тестирајте понашање при лошим мрежним условима  
8. **Тестирајте лимите ресурса**: Верификујте понашање при достижењу квота или ограничења брзине  
9. **Аутоматизујте регресионе тестове**: Конструишите комлпет тестова који се покрећу при свакој измени кода  
10. **Документирајте тест случајеве**: Одржавајте јасну документацију сценарија тестирања

## Уобичајене замке у тестирању

- **Прекомерно ослањање на тестирање „срећног пута“**: Обавезно тестирајте случајеве грешака детаљно  
- **Игнорисање перформансних тестова**: Идентификујте уске грла пре него што утичу на продукцију  
- **Тестирање само у изолацији**: Комбинујте јединичне, интеграционе и е2е тестове  
- **Неапсолутна покривеност API-ја**: Осигурајте да су све крајње тачке и функционалности тестиране  
- **Несагласна тест окружења**: Користите контејнере за доследна тест окружења

## Закључак

Свеобухватна стратегија тестирања је есенцијална за развој поузданих, висококвалитетних MCP сервера. Имплементирањем најбољих пракси и савета из овог водича можете осигурати да ваше MCP имплементације испуњавају највише стандарде квалитета, поузданости и перформанси.

## Кључне поуке

1. **Дизајн алата**: Пратите принцип једне одговорности, користите dependency injection, и дизајнирајте за композитност  
2. **Дизајн шеме**: Креирајте јасне, добро документоване шеме са правилним валидирајућим ограничењима  
3. **Руковање грешкама**: Имплементирајте глатко руковање грешкама, структуриране одговоре са грешкама, и логику поновног покушаја  
4. **Перформансе**: Користите кеширање, асинхрони обраду, и ограничење ресурса  
5. **Безбедност**: Примјењујте детаљну валидацију улаза, провере ауторизације, и руковање осетљивим подацима  
6. **Тестирање**: Креирајте свеобухватне јединичне, интеграционе, и енд-то-енд тестове  
7. **Обрасци радног тока**: Примјењујте проверене обрасце као што су ланци, dispatchers, и паралелна обрада

## Вежба

Дизајнирајте MCP алат и радни ток за систем обраде докумената који:

1. Прихвата документе у више формата (PDF, DOCX, TXT)  
2. Извлачи текст и кључне информације из докумената  
3. Класификује документе по типу и садржају  
4. Генерише резиме сваког документа  

Имплементирајте шеме алата, руковање грешкама и образац радног тока који најбоље одговара овом сценарију. Размислите како бисте тестирали ову имплементацију.

## Ресурси

1. Придружите се MCP заједници на [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) и будите у току са најновијим развојем  
2. Доприносите отвореним [MCP пројектима](https://github.com/modelcontextprotocol)  
3. Примјењујте MCP принципе у својим AI иницијативама у оквиру организације  
4. Истражите специјализоване MCP имплементације за вашу индустрију  
5. Размотрите напредне курсеве на одређене MCP теме, као што су мултимодална интеграција или интеграција пословних апликација  
6. Испробајте израду сопствених MCP алата и радних токова користећи принципе научене кроз [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

## Шта следи

Следеће: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Одрицање од одговорности**:
Овај документ је преведен коришћењем AI услуге за превођење [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо прецизности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитетним извором. За критичне информације препоручује се професионални људски превод. Не одговарамо за било каква неспоразума или погрешне тумачења која могу произаћи из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->