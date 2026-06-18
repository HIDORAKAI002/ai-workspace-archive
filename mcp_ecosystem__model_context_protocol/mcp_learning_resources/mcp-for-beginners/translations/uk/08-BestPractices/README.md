# MCP Кращі практики розробки

[![MCP Development Best Practices](../../../translated_images/uk/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Натисніть на зображення вище, щоб переглянути відео цього уроку)_

## Огляд

Цей урок зосереджений на передових кращих практиках розробки, тестування та розгортання серверів MCP і функцій у продуктивних середовищах. Оскільки екосистеми MCP зростають в складності та важливості, дотримання встановлених шаблонів забезпечує надійність, підтримуваність та взаємодію. Цей урок узагальнює практичну мудрість, отриману з реалізацій MCP у реальному світі, щоб допомогти вам створювати міцні, ефективні сервери з ефективними ресурсами, підказками та інструментами.

## Цілі навчання

До кінця цього уроку ви зможете:

- Застосовувати галузеві кращі практики у дизайні серверів та функцій MCP
- Створювати комплексні стратегії тестування для серверів MCP
- Проєктувати ефективні, багаторазові шаблони робочих процесів для складних MCP-додатків
- Впроваджувати належну обробку помилок, логування та спостережуваність у серверах MCP
- Оптимізувати реалізації MCP для продуктивності, безпеки та підтримуваності

## Основні принципи MCP

Перед тим, як переходити до конкретних практик реалізації, важливо зрозуміти основні принципи, які керують ефективною розробкою MCP:

1. **Стандартизована комунікація**: MCP використовує JSON-RPC 2.0 як основу, забезпечуючи консистентний формат для запитів, відповідей та обробки помилок у всіх реалізаціях.

2. **Орієнтація на користувача**: Завжди надавайте пріоритет згоді користувача, контролю та прозорості у ваших реалізаціях MCP.

3. **Безпека на першому місці**: Впроваджуйте міцні заходи безпеки, включаючи аутентифікацію, авторизацію, валідацію та обмеження частоти.

4. **Модульна архітектура**: Проєктуйте свої сервери MCP з модульним підходом, де кожен інструмент і ресурс має чітку, сфокусовану мету.

5. **Станоподібні з’єднання**: Використовуйте здатність MCP підтримувати стан між кількома запитами для більш послідовних та контекстно-залежних взаємодій.

## Офіційні кращі практики MCP

Наступні кращі практики походять з офіційної документації Model Context Protocol:

### Кращі практики безпеки

1. **Згода та контроль користувача**: Завжди вимагайте явної згоди користувача перед доступом до даних або виконанням операцій. Надавайте чіткий контроль над тим, які дані передаються і які дії авторизовані.

2. **Конфіденційність даних**: Відкривайте дані користувача лише за явної згоди та захищайте їх відповідними контролями доступу. Запобігайте несанкціонованій передачі даних.

3. **Безпека інструментів**: Вимагайте явної згоди користувача перед викликом будь-якого інструменту. Забезпечте розуміння користувачами функціональності кожного інструменту та встановіть міцні межі безпеки.

4. **Контроль дозволів інструментів**: Налаштовуйте, які інструменти модель може використовувати під час сесії, гарантуючи доступність лише явнозатверджених інструментів.

5. **Аутентифікація**: Вимагайте належної аутентифікації перед наданням доступу до інструментів, ресурсів або чутливих операцій за допомогою API-ключів, OAuth-токенів або інших безпечних методів аутентифікації.

6. **Валідація параметрів**: Забезпечуйте валідацію для всіх викликів інструментів, щоб запобігти передачі некоректних або шкідливих даних у реалізації інструментів.

7. **Обмеження частоти**: Впроваджуйте обмеження частоти, щоб запобігти зловживанням і забезпечити справедливе використання серверних ресурсів.

### Кращі практики реалізації

1. **Переговори можливостей**: Під час встановлення з’єднання обмінюйтеся інформацією про підтримувані функції, версії протоколу, доступні інструменти та ресурси.

2. **Проєктування інструментів**: Створюйте сфокусовані інструменти, які добре виконують одну задачу, а не монолітні інструменти, які охоплюють декілька функцій.

3. **Обробка помилок**: Впроваджуйте стандартизовані повідомлення про помилки та коди, щоб допомогти діагностувати проблеми, м’яко обробляти збої і надавати корисні відомості.

4. **Логування**: Налаштовуйте структуровані логи для аудиту, налагодження та моніторингу взаємодій протоколу.

5. **Відстеження прогресу**: Для тривалих операцій звітуйте про оновлення прогресу, щоб забезпечити чутливий користувацький інтерфейс.

6. **Скасування запитів**: Дозволяйте клієнтам скасовувати запити, що виконуються, якщо вони більше не потрібні або займають забагато часу.

## Додаткові посилання

Для отримання найактуальнішої інформації про кращі практики MCP звертайтеся до:

- [Документація MCP](https://modelcontextprotocol.io/)
- [Специфікація MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Репозиторій GitHub](https://github.com/modelcontextprotocol)
- [Кращі практики безпеки](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Топ 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – ризики безпеки та заходи їх усунення
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – практичне навчання з безпеки

## Приклади практичної реалізації

### Кращі практики проєктування інструментів

#### 1. Принцип єдиної відповідальності

Кожен інструмент MCP повинен мати чітку, сфокусовану мету. Замість створення монолітних інструментів, що намагаються охопити кілька функцій, розробляйте спеціалізовані інструменти, які відмінно виконують конкретні завдання.

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

#### 2. Послідовна обробка помилок

Впроваджуйте міцну обробку помилок з інформативними повідомленнями про помилки та відповідними механізмами відновлення.

```python
# Приклад Python з комплексною обробкою помилок
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Перевірка параметрів
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Перевірка безпеки
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Операція з базою даних з таймаутом
                async with timeout(10):  # Таймаут 10 секунд
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Помилки з'єднання можуть бути тимчасовими
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Помилки запиту ймовірно є помилками клієнта
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Дозволити проходження специфічних для інструменту помилок
            raise
        except Exception as e:
            # Загальний ловчик для несподіваних помилок
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Реалізація виявлення SQL-ін'єкцій
        pass
        
    def _log_error(self, message, error):
        # Реалізація логування помилок
        pass
```

#### 3. Валідація параметрів

Завжди ретельно валідуйте параметри, щоб запобігти передачі некоректних або шкідливих вхідних даних.

```javascript
// Приклад JavaScript/TypeScript з детальною перевіркою параметрів
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
    // 1. Перевірка наявності параметрів
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Перевірка типів параметрів
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Перевірка значень параметрів
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Перевірка наявності вмісту для операції запису
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Перевірка безпеки шляху
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Реалізація на основі перевірених параметрів
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Реалізація перевірки безпеки шляху
    // ...
  }
}
```

### Приклади реалізації безпеки

#### 1. Аутентифікація та авторизація

```java
// Приклад Java з автентифікацією та авторизацією
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Впровадження залежностей
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
        // 1. Отримати контекст автентифікації
        String authToken = request.getContext().getAuthToken();
        
        // 2. Аутентифікувати користувача
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Перевірити авторизацію для конкретної операції
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Продовжити виконання авторизованої операції
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

#### 2. Обмеження частоти

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

## Кращі практики тестування

### 1. Модульне тестування інструментів MCP

Завжди тестуйте свої інструменти в ізоляції, створюючи підроблені зовнішні залежності:

```typescript
// Приклад модульного тесту інструменту на TypeScript
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Створити мок сервіс погоди
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Створити інструмент з мок залежністю
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Підготовка
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Виконання
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Перевірка
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Підготовка
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Виконання та перевірка
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Інтеграційне тестування

Тестуйте повний потік від запитів клієнта до відповідей сервера:

```python
# Приклад інтеграційного тесту Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Запустити тестовий сервер
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Створити клієнта
        client = McpClient("http://localhost:5000")
        
        # Перевірити виявлення інструменту
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Перевірити виконання інструменту
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Перевірити відповідь
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Очистити ресурси
        await server.stop()
```

## Оптимізація продуктивності

### 1. Стратегії кешування

Впроваджуйте відповідне кешування для зниження затримок і використання ресурсів:

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

#### 2. Впровадження залежностей та тестованість

Проєктуйте інструменти так, щоб вони отримували свої залежності через ін’єкцію у конструктор, роблячи їх тестованими та конфігурованими:

```java
// Приклад Java з впровадженням залежностей
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Залежності впроваджуються через конструктор
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Реалізація інструменту
    // ...
}
```

#### 3. Компонуємі інструменти

Проєктуйте інструменти, які можна компонувати разом для створення більш складних робочих процесів:

```python
# Приклад на Python, що показує композиційні інструменти
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Реалізація...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Цей інструмент може використовувати результати інструменту dataFetch
    async def execute_async(self, request):
        # Реалізація...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Цей інструмент може використовувати результати інструменту dataAnalysis
    async def execute_async(self, request):
        # Реалізація...
        pass

# Ці інструменти можуть використовуватися окремо або як частина робочого процесу
```

### Кращі практики проєктування схем

Схема – це контракт між моделлю і вашим інструментом. Добре проєктовані схеми покращують зручність користування інструментами.

#### 1. Чіткі описи параметрів

Завжди включайте описову інформацію для кожного параметра:

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

#### 2. Обмеження валідації

Включайте обмеження валідації, щоб запобігти некоректним вхідним даним:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Властивість Email з перевіркою формату
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Властивість Вік з числовими обмеженнями
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Перелічувана властивість
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

#### 3. Послідовні структури відповіді

Підтримуйте консистентність у структурах відповідей, щоб моделям було легше інтерпретувати результати:

```python
async def execute_async(self, request):
    try:
        # Обробити запит
        results = await self._search_database(request.parameters["query"])
        
        # Завжди повертати послідовну структуру
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

### Обробка помилок

Міцна обробка помилок є ключовою для підтримки надійності інструментів MCP.

#### 1. М’яка обробка помилок

Обробляйте помилки на відповідних рівнях і надавайте інформативні повідомлення:

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

#### 2. Структуровані відповіді з помилками

Повертайте структуровану інформацію про помилки, якщо це можливо:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Реалізація
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
        
        // Повторно викинути інші виключення як ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Логіка повторних спроб

Впроваджуйте відповідну логіку повторних спроб для тимчасових збоїв:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # секунди
    
    while retry_count < max_retries:
        try:
            # Виклик зовнішнього API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Експоненційне збільшення часу очікування
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Нетранзитна помилка, не повторювати спробу
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Оптимізація продуктивності

#### 1. Кешування

Впроваджуйте кешування для дорогих операцій:

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

#### 2. Асинхронна обробка

Використовуйте патерни асинхронного програмування для операцій, обмежених ввід-виводом:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Для тривалих операцій негайно повернути ідентифікатор обробки
        String processId = UUID.randomUUID().toString();
        
        // Розпочати асинхронну обробку
        CompletableFuture.runAsync(() -> {
            try {
                // Виконати тривалу операцію
                documentService.processDocument(documentId);
                
                // Оновити статус (звичайно зберігається в базі даних)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Повернути негайну відповідь з ідентифікатором процесу
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Інструмент перевірки статусу-компаньйона
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

#### 3. Обмеження ресурсів

Впроваджуйте обмеження ресурсів, щоб уникнути перевантажень:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Дозволити 5 запитів за секунду
            bucket_size=10        # Дозволити сплески до 10 запитів
        )
    
    async def execute_async(self, request):
        # Перевірити, чи можемо продовжувати, чи потрібно чекати
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Якщо чекання занадто довге
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Чекати відповідний час затримки
                await asyncio.sleep(delay)
        
        # Використати токен і продовжити запит
        self.rate_limiter.consume()
        
        # Викликати API
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
            
            # Вирахувати час до доступності наступного токена
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Додати нові токени на основі витраченого часу
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Кращі практики безпеки

#### 1. Валідація введення

Завжди ретельно валідуйте вхідні параметри:

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

#### 2. Перевірки авторизації

Впроваджуйте належні перевірки авторизації:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Отримати контекст користувача з запиту
    UserContext user = request.getContext().getUserContext();
    
    // Перевірити, чи користувач має необхідні дозволи
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Для певних ресурсів перевірити доступ до цього ресурсу
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Продовжити виконання інструменту
    // ...
}
```

#### 3. Обробка чутливих даних

Уважно обробляйте чутливі дані:

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
        
        # Отримати дані користувача
        user_data = await self.user_service.get_user_data(user_id)
        
        # Фільтрувати конфіденційні поля, якщо їх явно не запитано та не надано дозвіл
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Перевірити рівень авторизації в контексті запиту
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Створити копію, щоб уникнути зміни оригіналу
        redacted = user_data.copy()
        
        # Замаскувати конкретні конфіденційні поля
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Замаскувати вкладені конфіденційні дані
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Кращі практики тестування інструментів MCP

Комплексне тестування забезпечує правильну роботу інструментів MCP, обробку крайніх випадків і коректну інтеграцію з системою.

### Модульне тестування

#### 1. Тестуйте кожен інструмент в ізоляції

Створюйте сфокусовані тести для функціональності кожного інструменту:

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

#### 2. Тестування валідації схем

Перевіряйте, що схеми коректні і належним чином накладають обмеження:

```java
@Test
public void testSchemaValidation() {
    // Створити екземпляр інструменту
    SearchTool searchTool = new SearchTool();
    
    // Отримати схему
    Object schema = searchTool.getSchema();
    
    // Конвертувати схему у JSON для валідації
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Перевірити, чи є схема дійсним JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Перевірити дійсні параметри
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Перевірити відсутній обов’язковий параметр
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Перевірити недійсний тип параметра
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Тести обробки помилок

Створюйте спеціфічні тести для ситуацій помилок:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Впорядкувати
    tool = ApiTool(timeout=0.1)  # Дуже короткий тайм-аут
    
    # Зімітувати запит, який перевищить час очікування
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Довше за тайм-аут
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Виконати та перевірити
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Перевірити повідомлення про виняток
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Впорядкувати
    tool = ApiTool()
    
    # Зімітувати відповідь з обмеженням швидкості
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
        
        # Виконати та перевірити
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Перевірити, що виняток містить інформацію про обмеження швидкості
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Інтеграційне тестування

#### 1. Тестування ланцюжків інструментів

Перевіряйте роботу інструментів у очікуваних комбінаціях:

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

#### 2. Тестування сервера MCP

Тестуйте сервер MCP з повною реєстрацією та виконанням інструментів:

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
        // Тестування кінцевої точки виявлення
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Створити запит інструменту
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Надіслати запит і перевірити відповідь
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Створити некоректний запит інструменту
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Відсутній параметр "b"
        request.put("parameters", parameters);
        
        // Надіслати запит і перевірити помилкову відповідь
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-End тестування

Тестуйте повні робочі процеси від підказки моделі до виконання інструменту:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Влаштувати - Налаштувати клієнта MCP і замінити модель
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Відповіді з моделлю-заглушкою
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
    
    # Відповідь інструменту погоди-заглушки
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
        
        # Виконати дію
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Перевірити твердження
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Тестування продуктивності

#### 1. Навантажувальне тестування

Тестуйте, скільки одночасних запитів може обробити ваш сервер MCP:

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

#### 2. Стрес-тестування

Тестуйте систему під екстремальним навантаженням:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Налаштуйте JMeter для стрес-тестування
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Налаштуйте план тестування JMeter
    HashTree testPlanTree = new HashTree();
    
    // Створіть план тестування, групу потоків, вибірки тощо
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Додайте HTTP-вибірку для виконання інструменту
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Додайте слухачів
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Запустіть тест
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Перевірте результати
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Середній час відгуку < 200 мс
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90-й процентиль < 500 мс
}
```

#### 3. Моніторинг і профілювання

Налаштуйте моніторинг для довготривалого аналізу продуктивності:

```python
# Налаштувати моніторинг для сервера MCP
def configure_monitoring(server):
    # Налаштувати метрики Prometheus
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
    
    # Додати проміжне програмне забезпечення для визначення часу та запису метрик
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Відкрити кінцеву точку метрик
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Шаблони проєктування робочих процесів MCP

Добре проєктовані робочі процеси MCP підвищують ефективність, надійність і підтримуваність. Ось ключові шаблони, яких слід дотримуватися:

### 1. Шаблон ланцюжка інструментів

З’єднуйте кілька інструментів у послідовність, де вихід одного інструменту стає входом для наступного:

```python
# Реалізація ланцюга інструментів Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Список імен інструментів для послідовного виконання
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Виконати кожен інструмент у ланцюгу, передаючи попередній результат
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Зберегти результат і використовувати як вхідні дані для наступного інструменту
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Приклад використання
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

### 2. Шаблон диспетчера

Використовуйте центральний інструмент, який направляє запити до спеціалізованих інструментів залежно від вхідних даних:

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

### 3. Шаблон паралельної обробки

Виконуйте кілька інструментів одночасно для підвищення ефективності:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Крок 1: Отримати метадані набору даних (синхронно)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Крок 2: Запустити кілька аналізів паралельно
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
        
        // Очікуйте завершення всіх паралельних завдань
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Очікуйте завершення
        
        // Крок 3: Об’єднати результати
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Крок 4: Згенерувати підсумковий звіт
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Повернути повний результат робочого процесу
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Шаблон відновлення після помилок

Впроваджуйте м’які відкатні механізми для випадків збоїв інструментів:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Спробуйте спочатку основний інструмент
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Зареєструйте помилку
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Перейдіть до резервного інструменту
            try:
                # Можливо, потрібно буде трансформувати параметри для резервного інструменту
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Обидва інструменти не спрацювали
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Ця реалізація залежатиме від конкретних інструментів
        # Для цього прикладу ми просто повернемо оригінальні параметри
        return params

# Приклад використання
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Основний (платний) API погоди
        "basicWeatherService",    # Резервний (безкоштовний) API погоди
        {"location": location}
    )
```

### 5. Шаблон композиції робочих процесів

Створюйте складні робочі процеси, компонуючи простіші:

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

# Тестування серверів MCP: Кращі практики та основні поради

## Огляд

Тестування — це критичний аспект розробки надійних, якісних серверів MCP. Цей посібник пропонує комплексні кращі практики та поради для тестування ваших серверів MCP протягом життєвого циклу розробки — від модульних тестів до інтеграційного тестування і валідації end-to-end.

## Чому тестування важливе для серверів MCP

Сервери MCP слугують важливим проміжним шаром між AI-моделями та клієнтськими додатками. Ретельне тестування забезпечує:

- Надійність у продуктивних середовищах
- Коректну обробку запитів та відповідей
- Правильну реалізацію специфікацій MCP
- Стійкість до збоїв і крайніх випадків
- Стабільну продуктивність під різним навантаженням

## Модульне тестування серверів MCP

### Модульне тестування (основа)

Модульні тести перевіряють окремі компоненти вашого сервера MCP в ізоляції.

#### Що тестувати

1. **Обробники ресурсів**: Тестуйте логіку кожного обробника ресурсів окремо
2. **Реалізації інструментів**: Перевіряйте поведінку інструментів з різними вхідними даними
3. **Шаблони підказок**: Переконуйтеся, що шаблони підказок правильно рендеряться
4. **Валідація схем**: Тестуйте логіку валідації параметрів
5. **Обробка помилок**: Перевіряйте відповіді з помилками для некоректних вхідних даних

#### Кращі практики модульного тестування

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
# Приклад модульного тесту для калькулятора на Python
def test_calculator_tool_add():
    # Підготовка
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Дія
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Перевірка
    assert result["value"] == 12
```

### Інтеграційне тестування (середній рівень)

Інтеграційні тести перевіряють взаємодію між компонентами вашого сервера MCP.

#### Що тестувати

1. **Ініціалізація сервера**: Тестуйте запуск сервера з різними конфігураціями
2. **Реєстрація маршрутів**: Переконуйтеся, що всі кінцеві точки правильно зареєстровані
3. **Обробка запитів**: Тестуйте повний цикл запиту-відповіді
4. **Поширення помилок**: Переконуйтеся, що помилки коректно обробляються між компонентами
5. **Аутентифікація та авторизація**: Тестуйте механізми безпеки

#### Кращі практики інтеграційного тестування

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

### End-to-End тестування (верхній рівень)

End-to-end тести перевіряють повну поведінку системи від клієнта до сервера.

#### Що тестувати

1. **Комунікація клієнт-сервер**: Тестуйте повні цикли запиту-відповіді
2. **Реальні SDK клієнтів**: Тестуйте з використанням реальних клієнтських реалізацій
3. **Продуктивність під навантаженням**: Перевіряйте поведінку з багатьма одночасними запитами
4. **Відновлення після помилок**: Тестуйте відновлення системи після збоїв
5. **Тривалі операції**: Переконуйтеся, що підтримується обробка потокових і тривалих операцій

#### Кращі практики E2E тестування

```typescript
// Приклад E2E тесту з клієнтом на TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Запустити сервер у тестовому середовищі
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Дія
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Перевірка
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Стратегії мокінгу для тестування MCP

Мокінг необхідний для ізоляції компонентів під час тестування.

### Компоненти для мокінгу

1. **Зовнішні AI-моделі**: Мокайте відповіді моделей для передбачуваного тестування
2. **Зовнішні сервіси**: Мокайте залежності API (бази даних, сторонні сервіси)
3. **Служби аутентифікації**: Мокайте провайдерів ідентичності
4. **Постачальники ресурсів**: Мокайте дорогі обробники ресурсів

### Приклад: Мокінг відповіді AI-моделі

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
# Приклад Python з unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Налаштуйте мок
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Використовуйте мок у тесті
    server = McpServer(model_client=mock_model)
    # Продовжуйте з тестом
```

## Тестування продуктивності

Тестування продуктивності критично для продуктивних серверів MCP.

### Що вимірювати

1. **Затримка**: Час відповіді на запити
2. **Пропускна здатність**: Кількість оброблених запитів за секунду
3. **Використання ресурсів**: CPU, пам’ять, мережа
4. **Обробка конкурентних запитів**: Поведінка під час паралельної обробки
5. **Характеристики масштабування**: Продуктивність при збільшенні навантаження

### Інструменти для тестування продуктивності

- **k6**: Відкритий інструмент для навантажувального тестування
- **JMeter**: Комплексне тестування продуктивності
- **Locust**: Навантажувальне тестування на Python
- **Azure Load Testing**: Хмарне тестування продуктивності

### Приклад: Базовий навантажувальний тест із k6

```javascript
// сценарій k6 для навантажувального тестування сервера MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 віртуальних користувачів
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

## Автоматизація тестування серверів MCP

Автоматизація тестів забезпечує стабільну якість і швидкий цикл зворотного зв’язку.

### Інтеграція CI/CD

1. **Запуск модульних тестів при pull request**: Переконуйтеся, що зміни в коді не порушують існуючу функціональність
2. **Інтеграційні тести на стадії підготовки**: Запускайте інтеграційні тести в передвиробничих середовищах  
3. **Базові показники продуктивності**: Підтримуйте еталони продуктивності, щоб виявляти регресії  
4. **Сканування безпеки**: Автоматизуйте тестування безпеки як частину конвеєра  

### Приклад конвеєра CI (GitHub Actions)

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
  
## Тестування відповідності специфікації MCP

Перевірте, чи ваш сервер правильно реалізує специфікацію MCP.

### Основні області відповідності

1. **API кінцеві точки**: Тестуйте необхідні кінцеві точки (/resources, /tools тощо)  
2. **Формат запиту/відповіді**: Перевіряйте відповідність схемі  
3. **Коди помилок**: Перевірте правильність кодів статусу для різних сценаріїв  
4. **Типи вмісту**: Тестуйте обробку різних типів контенту  
5. **Процес автентифікації**: Перевірте механізми автентифікації згідно зі специфікацією  

### Набір тестів на відповідність

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
  
## Топ 10 порад для ефективного тестування MCP сервера

1. **Окреме тестування визначень інструментів**: Перевіряйте схеми незалежно від логіки інструментів  
2. **Використання параметризованих тестів**: Тестуйте інструменти з різними вхідними даними, враховуючи крайні випадки  
3. **Перевірка помилкових відповідей**: Переконайтеся у правильній обробці помилок для всіх можливих ситуацій  
4. **Тестування логіки авторизації**: Забезпечте належний контроль доступу для різних ролей користувачів  
5. **Моніторинг покриття тестами**: Прагніть до високого покриття критичного коду  
6. **Тестування потокових відповідей**: Перевірте правильну обробку потокового контенту  
7. **Імітація проблем з мережею**: Перевірте поведінку в умовах поганого з’єднання  
8. **Тестування обмежень ресурсів**: Перевірте поведінку під час досягнення квот або лімітів  
9. **Автоматизація регресійних тестів**: Побудуйте набір тестів, що запускаються при кожній зміні коду  
10. **Документування тестових випадків**: Підтримуйте чітку документацію сценаріїв тестування  

## Поширені помилки при тестуванні

- **Занадто велика залежність від «щасливого шляху»**: Обов’язково ретельно тестуйте випадки помилок  
- **Ігнорування тестування продуктивності**: Виявляйте вузькі місця до їх появи в продуктиві  
- **Тестування лише в ізоляції**: Комбінуйте модульні, інтеграційні та end-to-end тести  
- **Неповне покриття API**: Переконайтеся, що всі кінцеві точки і функції протестовані  
- **Невідповідність тестових середовищ**: Використовуйте контейнери для забезпечення узгодженості середовищ  

## Висновок

Комплексна стратегія тестування є необхідною для створення надійних, високоякісних MCP серверів. Запроваджуючи найкращі практики й поради, описані в цьому посібнику, ви зможете забезпечити відповідність ваших реалізацій MCP найвищим стандартам якості, надійності та продуктивності.  


## Основні висновки

1. **Проєктування інструментів**: Дотримуйтесь принципу єдиної відповідальності, використовуйте dependency injection та проектуйте для композиції  
2. **Проєктування схем**: Створюйте чіткі, добре документовані схеми з правильними обмеженнями валідації  
3. **Обробка помилок**: Впроваджуйте граціозну обробку помилок, структуровані відповіді про помилки та логіку повторних спроб  
4. **Продуктивність**: Використовуйте кешування, асинхронну обробку та обмеження ресурсів  
5. **Безпека**: Застосовуйте ретельну валідацію вхідних даних, перевірки авторизації та обробку конфіденційних даних  
6. **Тестування**: Створюйте комплексні модульні, інтеграційні та кінцеві тести  
7. **Патерни робочих процесів**: Використовуйте встановлені патерни, такі як ланцюжки, диспетчери та паралельна обробка  

## Вправа

Проєктуйте MCP інструмент і робочий процес для системи обробки документів, що:

1. Приймає документи у кількох форматах (PDF, DOCX, TXT)  
2. Витягує текст і ключову інформацію з документів  
3. Класифікує документи за типом і змістом  
4. Генерує резюме кожного документа  

Реалізуйте схеми інструменту, обробку помилок і шаблон робочого процесу, який найкраще підходить для цього сценарію. Розгляньте, як ви тестуватимете цю реалізацію.  

## Ресурси

1. Приєднуйтеся до спільноти MCP на [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs), щоб бути в курсі останніх подій  
2. Робіть внесок у open-source [MCP проекти](https://github.com/modelcontextprotocol)  
3. Застосовуйте принципи MCP у власних AI ініціативах вашої організації  
4. Вивчайте спеціалізовані реалізації MCP для вашої галузі  
5. Розгляньте можливість проходження просунутих курсів з конкретних тем MCP, таких як мульти-модальна інтеграція чи інтеграція корпоративних застосунків  
6. Експериментуйте зі створенням власних MCP інструментів і робочих процесів, використовуючи принципи, які ви вивчили у [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Що далі

Далі: [Кейс-стаді](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->