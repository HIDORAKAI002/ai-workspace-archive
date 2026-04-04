# MCP Най-добри практики за разработка

[![MCP Development Best Practices](../../../translated_images/bg/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Кликнете върху изображението по-горе, за да гледате видеото на този урок)_

## Преглед

Този урок се фокусира върху напреднали най-добри практики за разработка, тестване и внедряване на MCP сървъри и функционалности в производствени среди. С нарастването на сложността и значимостта на MCP екосистемите, спазването на утвърдени модели гарантира надеждност, поддръжка и съвместимост. Този урок обединява практическа мъдрост, натрупана от реални MCP внедрявания, за да ви напътства в създаването на здрави, ефективни сървъри с ефективни ресурси, подкани и инструменти.

## Учебни цели

Към края на този урок ще можете да:

- Прилагате индустриални най-добри практики в дизайна на MCP сървъри и функционалности
- Създавате изчерпателни стратегии за тестване на MCP сървъри
- Проектирате ефективни, преползваеми модели на работни потоци за сложни MCP приложения
- Прилагате правилно обработване на грешки, логване и наблюдаемост в MCP сървъри
- Оптимизирате MCP имплементации за производителност, сигурност и поддръжка

## Основни принципи на MCP

Преди да навлезем в конкретни практики за имплементиране, е важно да разберете основните принципи, които ръководят ефективната разработка на MCP:

1. **Стандартизирана комуникация**: MCP използва JSON-RPC 2.0 като своя основа, предоставяйки последователен формат за заявки, отговори и обработка на грешки във всички имплементации.

2. **Потребителски ориентиран дизайн**: Винаги поставяйте на първо място съгласието, контрола и прозрачността за потребителя във вашите MCP реализации.

3. **Сигурност на първо място**: Прилагайте здрави мерки за сигурност, включително автентикация, авторизация, валидиране и контрол на честотата на заявки.

4. **Модулна архитектура**: Проектирайте MCP сървърите си с модулен подход, където всеки инструмент и ресурс има ясна, фокусирана цел.

5. **Свързвания със състояние**: Използвайте възможността на MCP да поддържа състояние между множество заявки за по-кохерентни и контекстно осъзнати взаимодействия.

## Официални най-добри практики за MCP

Следващите най-добри практики са извлечени от официалната документация на Model Context Protocol:

### Най-добри практики за сигурност

1. **Съгласие и контрол на потребителя**: Винаги изисквайте изрично съгласие от потребителя преди достъп до данни или изпълнение на операции. Предоставяйте ясен контрол над споделяните данни и разрешените действия.

2. **Поверителност на данните**: Излагайте потребителски данни само с изрично съгласие и ги защитете с подходящи контролни механизми за достъп. Предпазвайте от неразрешена трансмисия на данни.

3. **Безопасност на инструментите**: Изисквайте изрично съгласие от потребителя преди използване на който и да е инструмент. Уверете се, че потребителите разбират функционалността на всеки инструмент и налагайте здрави мерки за сигурност.

4. **Контрол върху разрешенията на инструментите**: Конфигурирайте кои инструменти моделът може да използва по време на сесия, като гарантирате достъп само до изрично разрешени инструменти.

5. **Автентикация**: Изисквайте правилна автентикация преди предоставяне на достъп до инструменти, ресурси или чувствителни операции чрез API ключове, OAuth токени или други защитени методи за автентикация.

6. **Валидиране на параметри**: Налагайте валидиране за всички извиквания на инструменти, за да предотвратите получаването на некоректен или злонамерен вход към реализациите на инструментите.

7. **Контрол на честотата (rate limiting)**: Прилагайте контрол на честотата на заявките, за да предотвратите злоупотреби и да осигурите справедливо използване на сървърните ресурси.

### Най-добри практики при имплементация

1. **Договорка на възможности**: По време на установяване на връзка обменяйте информация за поддържаните функции, версии на протокола, налични инструменти и ресурси.

2. **Дизайн на инструментите**: Създавайте фокусирани инструменти, които вършат едно нещо добре, а не монолитни, обработващи множество функционалности.

3. **Обработка на грешки**: Имплементирайте стандартизирани съобщения и кодове за грешки, за да помогнете при диагностициране, справяне с неуспехи и предоставяне на полезна обратна връзка.

4. **Логване**: Конфигурирайте структурирани дневници за одит, отстраняване на грешки и мониторинг на протоколните взаимодействия.

5. **Проследяване на напредъка**: За дълги операции докладвайте актуализации на напредъка, за да се осигури отзивчив потребителски интерфейс.

6. **Отмяна на заявки**: Позволете на клиентите да отменят изчакващи заявки, които вече не са необходими или отнемат прекалено много време.

## Допълнителни препратки

За най-актуална информация относно MCP най-добрите практики, вижте:

- [MCP Документация](https://modelcontextprotocol.io/)
- [MCP Спецификация (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Репозитори](https://github.com/modelcontextprotocol)
- [Най-добри практики за сигурност](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Топ 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Рискове за сигурността и мерки
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Практическо обучение по сигурност

## Примери за практически имплементации

### Най-добри практики за дизайн на инструменти

#### 1. Принцип на една отговорност

Всяко MCP средство трябва да има ясна, фокусирана цел. Вместо да създавате монолитни инструменти, които се опитват да обработват множество задачи, разработвайте специализирани инструменти, които са отлични в конкретни задачи.

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

#### 2. Последователна обработка на грешки

Прилагайте здрава обработка на грешки с информативни съобщения и подходящи механизми за възстановяване.

```python
# Пример на Python с цялостна обработка на грешки
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Валидиране на параметри
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Проверка на сигурността
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Операция с база данни с времево ограничение
                async with timeout(10):  # Времево ограничение от 10 секунди
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Грешките при връзка може да са временни
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Грешките в заявките вероятно са клиентски грешки
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Оставете грешките, специфични за инструмента, да преминат
            raise
        except Exception as e:
            # Универсална обработка за неочаквани грешки
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Имплементация на откриване на SQL инжекции
        pass
        
    def _log_error(self, message, error):
        # Имплементация на логване на грешки
        pass
```

#### 3. Валидиране на параметри

Винаги валидирайте параметрите подробно, за да предотвратите некоректен или злонамерен вход.

```javascript
// Пример на JavaScript/TypeScript с подробна проверка на параметрите
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
    // 1. Проверка за наличието на параметъра
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Проверка на типовете на параметрите
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Проверка на стойностите на параметрите
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Проверка за наличието на съдържание за операция за запис
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Проверка за безопасност на пътя
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Имплементация базирана на проверени параметри
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Имплементация на проверка за безопасност на пътя
    // ...
  }
}
```

### Примери за имплементация на сигурността

#### 1. Автентикация и авторизация

```java
// Пример на Java с удостоверяване и оторизация
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Внедряване на зависимости
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
        // 1. Извличане на контекста за удостоверяване
        String authToken = request.getContext().getAuthToken();
        
        // 2. Удостоверяване на потребителя
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Проверка на оторизация за конкретната операция
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Продължаване с оторизираната операция
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

#### 2. Контрол на честотата

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

## Най-добри практики за тестване

### 1. Юнит тестове за MCP инструменти

Винаги тествайте инструментите си изолирано, използвайки мокиране на външни зависимости:

```typescript
// Пример на TypeScript за модулен тест на инструмент
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Създаване на мок услуга за времето
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Създаване на инструмента с мок зависимост
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Подготовка
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Изпълнение
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Утвърждаване
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Подготовка
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Изпълнение и утвърждаване
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Интеграционни тестове

Тествайте целия поток от заявки на клиента до отговорите на сървъра:

```python
# Пример за интеграционен тест на Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Стартиране на тестов сървър
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Създаване на клиент
        client = McpClient("http://localhost:5000")
        
        # Тест на откриване на инструмент
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Тест на изпълнение на инструмент
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Проверка на отговора
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Почистващи действия
        await server.stop()
```

## Оптимизация на производителността

### 1. Стратегии за кеширане

Прилагайте подходящо кеширане, за да намалите латентността и използването на ресурси:

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

#### 2. Инжектиране на зависимости и тестване

Проектирайте инструментите така, че да получават зависимостите си чрез конструктор, за да са тестируеми и конфигурируеми:

```java
// Пример на Java с инжектиране на зависимости
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Зависимостите са инжектирани чрез конструктор
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Имплементация на инструмент
    // ...
}
```

#### 3. Комбинируеми инструменти

Проектирайте инструменти, които могат да се комбинират, за да създават по-сложни работни потоци:

```python
# Пример на Python, показващ съставими инструменти
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Имплементация...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Този инструмент може да използва резултати от инструмента dataFetch
    async def execute_async(self, request):
        # Имплементация...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Този инструмент може да използва резултати от инструмента dataAnalysis
    async def execute_async(self, request):
        # Имплементация...
        pass

# Тези инструменти могат да се използват независимо или като част от работен процес
```

### Най-добри практики за дизайн на схеми

Схемата е договорът между модела и вашия инструмент. Добре проектираните схеми водят до по-добра използваемост на инструмента.

#### 1. Ясни описания на параметрите

Винаги включвайте описателна информация за всеки параметър:

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

#### 2. Ограничения за валидиране

Включвайте ограничения за валидиране, за да предотвратите невалидни входове:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Свойство за имейл с валидиране на формата
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Свойство за възраст с числови ограничения
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Изброимо свойство
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

#### 3. Последователни структури на отговорите

Поддържайте последователност в структурата на отговорите, за да улесните интерпретацията на резултатите от моделите:

```python
async def execute_async(self, request):
    try:
        # Обработете заявката
        results = await self._search_database(request.parameters["query"])
        
        # Винаги връщайте последователна структура
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

### Обработка на грешки

Здрава обработка на грешки е критична за MCP инструментите, за да поддържат надеждност.

#### 1. Гладко обработване на грешки

Обработвайте грешки на подходящи нива и предоставяйте информативни съобщения:

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

#### 2. Структурирани отговори при грешки

Връщайте структурирана информация за грешки, когато е възможно:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Имплементация
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
        
        // Прехвърлете повторно други изключения като ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Логика за повторни опити

Прилагайте подходяща логика за повторни опити при временни неуспехи:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # секунди
    
    while retry_count < max_retries:
        try:
            # Извикайте външен API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Експоненциално изчакване
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Нетранзиентна грешка, не опитвайте отново
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Оптимизация на производителността

#### 1. Кеширане

Прилагайте кеширане за скъпи операции:

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

#### 2. Асинхронна обработка

Използвайте асинхронни модели на програмиране за операции, зависещи от I/O:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // За дългосрочни операции, върнете идентификатор на процеса незабавно
        String processId = UUID.randomUUID().toString();
        
        // Стартирайте асинхронна обработка
        CompletableFuture.runAsync(() -> {
            try {
                // Извършете дългосрочна операция
                documentService.processDocument(documentId);
                
                // Актуализирайте статуса (обикновено се съхранява в база данни)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Върнете незабавен отговор с идентификатор на процеса
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Инструмент за проверка на статус companion
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

#### 3. Ограничаване на ресурсите

Въвеждайте ограничаване на ресурсите, за да предотвратите претоварване:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Позволява 5 заявки в секунда
            bucket_size=10        # Позволява изблици до 10 заявки
        )
    
    async def execute_async(self, request):
        # Проверете дали можем да продължим или трябва да изчакаме
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Ако чакането е твърде дълго
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Изчакайте подходящото време за забавяне
                await asyncio.sleep(delay)
        
        # Използвайте токен и продължете със заявката
        self.rate_limiter.consume()
        
        # Извикайте API
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
            
            # Изчислете времето до следващия наличен токен
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Добавете нови токени въз основа на изминалото време
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Най-добри практики за сигурност

#### 1. Валидиране на входни данни

Винаги валидирайте подробно входните параметри:

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

#### 2. Проверки за авторизация

Прилагайте правилни проверки за авторизация:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Вземете потребителския контекст от заявката
    UserContext user = request.getContext().getUserContext();
    
    // Проверете дали потребителят има необходимите разрешения
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // За специфични ресурси, проверете достъпа до този ресурс
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Продължете с изпълнението на инструмента
    // ...
}
```

#### 3. Обработка на чувствителни данни

Обработвайте чувствителните данни внимателно:

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
        
        # Вземане на данни за потребителя
        user_data = await self.user_service.get_user_data(user_id)
        
        # Филтриране на чувствителни полета, освен ако не са изрично поискани И упълномощени
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Проверка на нивото на упълномощаване в контекста на заявката
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Създаване на копие, за да се избегне модифицирането на оригинала
        redacted = user_data.copy()
        
        # Замъгляване на конкретни чувствителни полета
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Замъгляване на вложени чувствителни данни
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Най-добри практики за тестване на MCP инструменти

Изчерпателното тестване гарантира, че MCP инструментите функционират правилно, обработват краените случаи и се интегрират коректно с останалата система.

### Юнит тестване

#### 1. Тествайте всеки инструмент поотделно

Създавайте фокусирани тестове за функционалността на всеки инструмент:

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

#### 2. Тестване на валидиране на схеми

Тествайте валидността на схемите и правилното прилагане на ограниченията:

```java
@Test
public void testSchemaValidation() {
    // Създаване на инстанция на инструмента
    SearchTool searchTool = new SearchTool();
    
    // Вземи схема
    Object schema = searchTool.getSchema();
    
    // Преобразуване на схемата в JSON за валидиране
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Проверка на схемата дали е валиден JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Тест на валидни параметри
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Тест на липсващ задължителен параметър
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Тест на невалиден тип параметър
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Тестове за обработка на грешки

Създавайте специфични тестове за грешкови случаи:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Подредете
    tool = ApiTool(timeout=0.1)  # Много кратък таймаут
    
    # Мокирайте заявка, която ще изтече времето
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # По-дълго от таймаута
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Действие и проверка
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Проверете съобщението за изключение
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Подредете
    tool = ApiTool()
    
    # Мокирайте отговор с ограничение на честотата
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
        
        # Действие и проверка
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Проверете дали изключението съдържа информация за ограничението на честотата
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Интеграционно тестване

#### 1. Тестване на верига от инструменти

Тествайте инструменти, работещи заедно в очаквани комбинации:

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

#### 2. Тестване на MCP сървър

Тествайте MCP сървъра с пълна регистрация и изпълнение на инструменти:

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
        // Тествайте края на откриването
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Създаване на заявка за инструмент
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Изпратете заявката и проверете отговора
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Създаване на невалидна заявка за инструмент
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Липсващ параметър "b"
        request.put("parameters", parameters);
        
        // Изпратете заявката и проверете отговора за грешка
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Крайно-до-крайно тестване

Тествайте пълните работни потоци от подкани на модела до изпълнение на инструменти:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Настройте - Конфигуриране на MCP клиент и макетиран модел
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Отговори на макетиран модел
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
    
    # Отговор на макетиран инструмент за времето
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
        
        # Действие
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Потвърждение
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Тестове за производителност

#### 1. Тестове на натоварване

Тествайте колко едновременно сочат заявки може да обработи MCP сървърът ви:

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

#### 2. Стрес тестове

Тествайте системата при екстремни натоварвания:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Настройте JMeter за стрес тестиране
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Конфигурирайте тестовия план на JMeter
    HashTree testPlanTree = new HashTree();
    
    // Създайте тестов план, група нишки, семплъри и др.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Добавете HTTP семплър за изпълнение на инструмента
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Добавете слушатели
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Стартирайте теста
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Валидирайте резултатите
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Средно време за отговор < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90-ти перцентил < 500ms
}
```

#### 3. Мониторинг и профилиране

Настройте мониторинг за дългосрочен анализ на производителността:

```python
# Конфигурирайте наблюдение за MCP сървър
def configure_monitoring(server):
    # Настройте метрики за Prometheus
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
    
    # Добавете междинен софтуер за измерване на време и записване на метрики
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Разкрийте крайна точка за метрики
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Дизайнерски модели на работни потоци за MCP

Добре проектираните MCP работни потоци подобряват ефективността, надеждността и поддръжката. Ето ключови модели, които да следвате:

### 1. Модел верига от инструменти

Свържете множество инструменти в поредица, където изходът на един инструмент става вход за следващия:

```python
# Имплементация на верига от инструменти в Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Списък с имена на инструменти за изпълнение последователно
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Изпълнете всеки инструмент във веригата, като подавате предишния резултат
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Запазете резултата и го използвайте като вход за следващия инструмент
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Пример за използване
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

### 2. Модел на диспечер

Използвайте централен инструмент, който насочва към специализирани инструменти според входа:

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

### 3. Модел паралелна обработка

Изпълнявайте множество инструменти едновременно за повишаване на ефективността:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Стъпка 1: Извличане на метаданни за набора от данни (синхронно)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Стъпка 2: Стартиране на множество анализи паралелно
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
        
        // Изчакайте всички паралелни задачи да завършат
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Изчакайте завършването
        
        // Стъпка 3: Обединяване на резултатите
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Стъпка 4: Генериране на обобщен доклад
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Връщане на пълния резултат от работния процес
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Модел за възстановяване при грешки

Прилагайте плавни резервни опции при неуспехи на инструментите:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Опитайте първо основния инструмент
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Запишете неуспеха
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Използвайте резервен инструмент
            try:
                # Може да се наложи преобразуване на параметрите за резервния инструмент
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # И двата инструмента не успяха
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Тази реализация зависи от конкретните инструменти
        # За този пример просто ще върнем оригиналните параметри
        return params

# Пример за използване
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Основен (платен) API за времето
        "basicWeatherService",    # Резервен (безплатен) API за времето
        {"location": location}
    )
```

### 5. Модел за композиция на работни потоци

Изграждайте сложни работни потоци чрез комбиниране на по-прости:

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

# Тестване на MCP сървъри: Най-добри практики и основни съвети

## Преглед

Тестването е критичен аспект от разработката на надеждни, висококачествени MCP сървъри. Това ръководство предоставя изчерпателни най-добри практики и съвети за тестване на MCP сървърите през целия цикъл на разработка — от юнит тестове, през интеграционни, до крайно-до-крайна валидация.

## Защо тестването е важно за MCP сървъри

MCP сървърите служат като критичен посредник между AI модели и клиентски приложения. Задълбоченото тестване гарантира:

- Надеждност в производствени среди  
- Точно обработване на заявки и отговори  
- Коректна имплементация на MCP спецификациите  
- Устойчивост на грешки и краените случаи  
- Консистентна производителност при различни натоварвания  

## Юнит тестване за MCP сървъри

### Юнит тестване (основа)

Юнит тестовете проверяват отделни компоненти на вашия MCP сървър изолирано.

#### Какво да тествате

1. **Обработващи ресурси**: Тествайте логиката на всеки обработващ ресурс независимо  
2. **Интерфейси на инструменти**: Проверете поведението на инструментите с различни входове  
3. **Шаблони на подкани**: Уверете се, че шаблоните се визуализират коректно  
4. **Валидиране на схеми**: Тестване на логиката за валидиране на параметри  
5. **Обработка на грешки**: Проверка на отговорите при невалидни входове  

#### Най-добри практики при юнит тестване

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
# Примерен модулен тест за калкулаторен инструмент в Python
def test_calculator_tool_add():
    # Подготовка
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Действие
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Проверка
    assert result["value"] == 12
```

### Интеграционно тестване (средно ниво)

Интеграционните тестове проверяват взаимодействието между компонентите на MCP сървъра.

#### Какво да тествате

1. **Инициализация на сървъра**: Тествайте стартирането на сървъра с различни конфигурации  
2. **Регистрация на маршрути**: Проверката на коректна регистрация на всички крайни точки  
3. **Обработка на заявки**: Тествайте пълния цикъл заявка-отговор  
4. **Разпространение на грешки**: Гарантиране на правилното обработване на грешки между компонентите  
5. **Автентикация и авторизация**: Тест на механизми за сигурност  

#### Най-добри практики при интеграционно тестване

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

### Крайно-до-крайно тестване (горно ниво)

Крайно-до-крайното тестване потвърждава пълното поведение на системата от клиента до сървъра.

#### Какво да тествате

1. **Комуникация клиент-сървър**: Тест на пълните цикли заявка-отговор  
2. **Реални клиентски SDK**: Тест с истински клиентски реализации  
3. **Производителност при натоварване**: Проверка на поведението при множество едновременни заявки  
4. **Възстановяване при грешки**: Тест на възстановяване на системата след провали  
5. **Дългосрочни операции**: Проверка на обработката на стрийминг и дълги операции  

#### Най-добри практики при E2E тестване

```typescript
// Пример за E2E тест с клиент на TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Стартиране на сървър в тестова среда
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Действие
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Проверка
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Стратегии за мокиране при MCP тестване

Мокиране е необходимост за изолиране на компоненти по време на тестване.

### Компоненти за мокиране

1. **Външни AI модели**: Мокирайте отговорите на моделите за предвидими тестове  
2. **Външни услуги**: Мокирайте зависимости от API (бази данни, трети услуги)  
3. **Услуги за автентикация**: Мокирайте доставчици на идентичност  
4. **Доставчици на ресурси**: Мокирайте скъпи обработващи ресурси  

### Пример: Мокиране на отговор на AI модел

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
# Пример на Python с unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Конфигуриране на mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Използване на mock в тест
    server = McpServer(model_client=mock_model)
    # Продължаване с тест
```

## Тестване на производителността

Тестването на производителността е критично за продукционни MCP сървъри.

### Какво да измервате

1. **Латентност**: Време за отговор на заявки  
2. **Пропускателна способност**: Заявки, обработвани в секунда  
3. **Използване на ресурси**: CPU, памет, мрежа  
4. **Обработка на едновременно изпълнение**: Поведение при паралелни заявки  
5. **Характеристики на скалиране**: Производителност при нарастващо натоварване  

### Инструменти за тестване на производителност

- **k6**: Отворен инструмент за тестове на натоварване  
- **JMeter**: Изчерпателно тестване на производителност  
- **Locust**: Python-базиран инструмент за тестване на натоварване  
- **Azure Load Testing**: Облачна услуга за тестване на производителност  

### Пример: Основен тест на натоварване с k6

```javascript
// сценарий k6 за тестване на натоварване на MCP сървър
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 виртуални потребители
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

## Автоматизация на тестовете за MCP сървъри

Автоматизирането на тестовете гарантира постоянство в качеството и по-бърза обратна връзка.

### Интеграция в CI/CD
1. **Изпълнение на модулни тестове при pull заявки**: Уверете се, че промените в кода не нарушават съществуващата функционалност
2. **Интеграционни тестове в Staging**: Изпълнявайте интеграционни тестове в предпроизводствени среди
3. **Бенчмаркове за производителност**: Поддържайте показатели за производителност, за да засичате регресии
4. **Сканирания за сигурност**: Автоматизирайте тестовете за сигурност като част от pipeline-а

### Примерен CI pipeline (GitHub Actions)

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

## Тест за съответствие със спецификацията MCP

Проверете дали вашият сървър правилно имплементира спецификацията MCP.

### Ключови области за съответствие

1. **API крайни точки**: Тествайте задължителните крайни точки (/resources, /tools и др.)
2. **Формат заявка/отговор**: Валидирайте съответствието със схемата
3. **Кодове за грешки**: Проверете коректните статус кодове за различни сценарии
4. **Типове съдържание**: Тествайте поведението при различни типове съдържание
5. **Поток за автентикация**: Проверете спазването на спецификацията за механизми за автентикация

### Тестови пакет за съответствие

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

## Топ 10 съвета за ефективно тестване на MCP сървър

1. **Тествайте дефинициите на инструментите отделно**: Проверете схемите независимо от логиката на инструментите
2. **Използвайте параметризирани тестове**: Тествайте инструментите с разнообразни входни данни, включително гранични случаи
3. **Проверявайте отговорите при грешки**: Проверете правилното обработване на грешки при всички възможни условия
4. **Тествайте логиката за авторизация**: Уверете се в правилния контрол на достъп за различни роли
5. **Наблюдавайте покритието на тестовете**: Стремете се към високо покритие на критичния код
6. **Тествайте стриймващи отговори**: Проверете правилното обработване на стрийминг съдържание
7. **Симулирайте мрежови проблеми**: Тествайте поведението при лоши мрежови условия
8. **Тествайте ресурсните лимити**: Проверете поведението при достигане на квоти или ограничения на скоростта
9. **Автоматизирайте регресионните тестове**: Създайте пакет, който се изпълнява при всяка промяна на кода
10. **Документирайте тестовите случаи**: Поддържайте ясна документация на тестовите сценарии

## Чести грешки при тестване

- **Прекалена зависимост от "happy path" тестове**: Уверете се, че тествате и случаите с грешки изчерпателно
- **Игнориране на тестовете за производителност**: Откривайте тесни места преди те да засегнат продукцията
- **Тестване само в изолация**: Комбинирайте модулни, интеграционни и E2E тестове
- **Непълно покритие на API**: Уверете се, че всички крайни точки и функции са тествани
- **Несъгласувани тестови среди**: Използвайте контейнери за осигуряване на последователни среди за тестове

## Заключение

Цялостната тестова стратегия е съществена за разработването на надеждни, качествени MCP сървъри. Като приложите най-добрите практики и съвети от този наръчник, можете да гарантирате, че вашите MCP имплементации отговарят на най-високите стандарти за качество, надеждност и производителност.

## Основни изводи

1. **Дизайн на инструментите**: Следвайте принципа за единствена отговорност, използвайте dependency injection и дизайн за композиционност
2. **Дизайн на схемите**: Създавайте ясни, добре документирани схеми с подходящи валидиращи ограничения
3. **Обработка на грешки**: Имплементирайте елегантна обработка на грешки, структуриран отговор при грешки и логика за повтори
4. **Производителност**: Използвайте кеширане, асинхронна обработка и ограничаване на ресурсите
5. **Сигурност**: Прилагайте обстойна валидация на входящите данни, проверки за авторизация и защита на чувствителните данни
6. **Тестване**: Създавайте изчерпателни модулни, интеграционни и End-to-End тестове
7. **Работни модели**: Използвайте утвърдени модели като вериги, диспатчъри и паралелна обработка

## Упражнение

Проектирайте MCP инструмент и работен процес за система за обработка на документи, която:

1. Приема документи в различни формати (PDF, DOCX, TXT)
2. Извлича текст и ключова информация от документите
3. Класифицира документите по тип и съдържание
4. Генерира резюме на всеки документ

Имплементирайте схемите на инструмента, обработката на грешки и работния модел, който най-добре отговаря на този сценарий. Обмислете как бихте тествали тази имплементация.

## Ресурси

1. Присъединете се към MCP общността в [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs), за да бъдете в течение с най-новите развития
2. Допринасяйте за отворени източници [MCP проекти](https://github.com/modelcontextprotocol)
3. Прилагайте MCP принципите във вашите AI инициативи в организацията
4. Разгледайте специализирани MCP имплементации за вашата индустрия.
5. Помислете да преминете напреднали курсове по специфични MCP теми като мултимодална интеграция или интеграция на корпоративни приложения.
6. Експериментирайте с изграждане на свои MCP инструменти и работни процеси чрез принципите, изучени в [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

## Какво следва

Следва: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:  
Този документ е преведен с помощта на AI преводаческа услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля, имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Не носим отговорност за никакви недоразумения или погрешни тълкувания, възникнали в резултат на използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->