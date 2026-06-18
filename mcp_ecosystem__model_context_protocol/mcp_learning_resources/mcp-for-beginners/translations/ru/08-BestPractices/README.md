# Лучшие методы разработки MCP

[![Лучшие методы разработки MCP](../../../translated_images/ru/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Нажмите на изображение выше, чтобы посмотреть видео этого урока)_

## Обзор

Этот урок посвящён передовым лучшим практикам разработки, тестирования и развертывания MCP серверов и функций в продуктивных средах. По мере того как экосистемы MCP становятся всё более сложными и важными, следование установленным шаблонам обеспечивает надёжность, удобство поддержки и совместимость. В этом уроке собрана практическая мудрость, полученная из реальных внедрений MCP, чтобы помочь вам создавать надёжные, эффективные серверы с продуманными ресурсами, подсказками и инструментами.

## Цели обучения

К концу этого урока вы сможете:

- Применять отраслевые лучшие практики при проектировании MCP серверов и функций
- Создавать комплексные стратегии тестирования MCP серверов
- Проектировать эффективные, повторно используемые шаблоны рабочих процессов для сложных MCP приложений
- Реализовывать корректную обработку ошибок, логирование и наблюдаемость в MCP серверах
- Оптимизировать реализации MCP для производительности, безопасности и удобства поддержки

## Основные принципы MCP

Прежде чем перейти к конкретным практикам реализации, важно понять основные принципы, которые направляют эффективную разработку MCP:

1. **Стандартизированная коммуникация**: MCP использует JSON-RPC 2.0 в качестве основы, обеспечивая единый формат запросов, ответов и обработки ошибок во всех реализациях.

2. **Ориентация на пользователя**: Всегда ставьте во главу угла согласие пользователя, контроль и прозрачность в ваших реализациях MCP.

3. **Безопасность прежде всего**: Реализуйте надёжные меры безопасности, включая аутентификацию, авторизацию, валидацию и ограничение частоты запросов.

4. **Модульная архитектура**: Стройте ваши MCP серверы с модульным подходом, где каждый инструмент и ресурс выполняет чётко определённую, сфокусированную функцию.

5. **Состояние соединения**: Используйте возможность MCP сохранять состояние между несколькими запросами для более связных и контекстно осознанных взаимодействий.

## Официальные лучшие практики MCP

Следующие лучшие практики основаны на официальной документации протокола Model Context Protocol:

### Лучшие практики по безопасности

1. **Согласие и контроль пользователя**: Всегда требуйте явного согласия пользователя перед доступом к данным или выполнением операций. Обеспечьте чёткий контроль над тем, какие данные передаются и какие действия разрешены.

2. **Конфиденциальность данных**: Делитесь пользовательскими данными только с явного согласия и защищайте их с помощью соответствующих механизмов доступа. Защищайте от несанкционированной передачи данных.

3. **Безопасность инструментов**: Требуйте явного согласия пользователя перед вызовом любого инструмента. Обеспечьте понимание пользователем функционала каждого инструмента и поддерживайте надёжные границы безопасности.

4. **Управление разрешениями для инструментов**: Настраивайте, какие инструменты модель может использовать за сессию, гарантируя доступ только к явно разрешённым инструментам.

5. **Аутентификация**: Требуйте правильную аутентификацию перед предоставлением доступа к инструментам, ресурсам или чувствительным операциям, используя API ключи, OAuth токены или другие безопасные методы.

6. **Валидация параметров**: Обязательное проведение валидации для всех вызовов инструментов, чтобы предотвратить передачу искажённых или вредоносных данных.

7. **Ограничение частоты запросов**: Реализуйте ограничение частоты запросов, чтобы предотвратить злоупотребления и обеспечить справедливое использование ресурсов сервера.

### Лучшие практики по реализации

1. **Переговоры о возможностях**: При установлении соединения обменивайтесь информацией о поддерживаемых функциях, версиях протокола, доступных инструментах и ресурсах.

2. **Проектирование инструментов**: Создавайте сфокусированные инструменты, которые хорошо выполняют одну задачу, а не монолитные, пытающиеся охватить несколько функций.

3. **Обработка ошибок**: Внедряйте стандартизированные сообщения и коды ошибок для диагностики проблем, корректной обработки сбоев и предоставления действенной обратной связи.

4. **Логирование**: Настраивайте структурированные логи для аудита, отладки и мониторинга взаимодействий по протоколу.

5. **Отслеживание прогресса**: Для долгих операций сообщайте о ходе выполнения для поддержки отзывчивого пользовательского интерфейса.

6. **Отмена запросов**: Позволяйте клиентам отменять текущие запросы, которые больше не нужны или выполняются слишком долго.

## Дополнительные ссылки

Для самой актуальной информации о лучших практиках MCP обращайтесь к:

- [Документация MCP](https://modelcontextprotocol.io/)
- [Спецификация MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Репозиторий GitHub](https://github.com/modelcontextprotocol)
- [Лучшие практики по безопасности](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Топ 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Риски безопасности и способы их смягчения
- [Мастер-класс по безопасности MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) – Практическое обучение безопасности

## Примеры практической реализации

### Лучшие практики проектирования инструментов

#### 1. Принцип единственной ответственности

Каждый MCP инструмент должен иметь чёткую, сфокусированную цель. Вместо создания монолитных инструментов, пытающихся охватить несколько задач, создавайте специализированные инструменты, которые отлично справляются с конкретными задачами.

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

#### 2. Последовательная обработка ошибок

Реализуйте надёжную обработку ошибок с информативными сообщениями и соответствующими механизмами восстановления.

```python
# Пример на Python с комплексной обработкой ошибок
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Проверка параметров
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Проверка безопасности
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Операция с базой данных с тайм-аутом
                async with timeout(10):  # Тайм-аут 10 секунд
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Ошибки соединения могут быть временными
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Ошибки запроса, вероятно, ошибки клиента
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Позволить пройти ошибкам, специфичным для инструмента
            raise
        except Exception as e:
            # Общий перехват для неожиданных ошибок
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Реализация обнаружения SQL-инъекций
        pass
        
    def _log_error(self, message, error):
        # Реализация логирования ошибок
        pass
```

#### 3. Валидация параметров

Всегда тщательно проверяйте параметры, чтобы предотвратить передачу искажённых или вредоносных данных.

```javascript
// Пример на JavaScript/TypeScript с подробной проверкой параметров
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
    // 1. Проверка наличия параметра
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Проверка типов параметров
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Проверка значений параметров
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Проверка наличия содержимого для операции записи
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Проверка безопасности пути
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Реализация на основе проверенных параметров
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Реализация проверки безопасности пути
    // ...
  }
}
```

### Примеры реализации безопасности

#### 1. Аутентификация и авторизация

```java
// Пример на Java с аутентификацией и авторизацией
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Внедрение зависимостей
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
        // 1. Извлечь контекст аутентификации
        String authToken = request.getContext().getAuthToken();
        
        // 2. Аутентифицировать пользователя
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Проверить авторизацию для конкретной операции
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Продолжить с авторизованной операцией
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

#### 2. Ограничение частоты запросов

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

## Лучшие практики тестирования

### 1. Модульное тестирование MCP инструментов

Всегда тестируйте инструменты изолированно, используя заглушки для внешних зависимостей:

```typescript
// Пример модульного теста инструмента на TypeScript
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Создать фальшивый сервис погоды
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Создать инструмент с фальшивой зависимостью
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
    
    // Выполнение
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Проверка
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Подготовка
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Выполнение и проверка
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Интеграционное тестирование

Проверяйте полный поток от запросов клиента до ответов сервера:

```python
# Пример интеграционного теста на Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Запустить тестовый сервер
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Создать клиент
        client = McpClient("http://localhost:5000")
        
        # Проверить обнаружение инструмента
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Проверить выполнение инструмента
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Проверить ответ
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Очистка данных
        await server.stop()
```

## Оптимизация производительности

### 1. Стратегии кэширования

Реализуйте подходящее кэширование для снижения задержек и расхода ресурсов:

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

#### 2. Внедрение зависимостей и тестируемость

Проектируйте инструменты так, чтобы их зависимости передавались через конструктор, облегчая тестирование и конфигурацию:

```java
// Пример на Java с внедрением зависимостей
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Зависимости внедряются через конструктор
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Реализация инструмента
    // ...
}
```

#### 3. Композиция инструментов

Проектируйте инструменты, которые можно комбинировать для создания более сложных рабочих процессов:

```python
# Пример на Python, показывающий составные инструменты
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Реализация...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Этот инструмент может использовать результаты инструмента dataFetch
    async def execute_async(self, request):
        # Реализация...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Этот инструмент может использовать результаты инструмента dataAnalysis
    async def execute_async(self, request):
        # Реализация...
        pass

# Эти инструменты могут использоваться независимо или как часть рабочего процесса
```

### Лучшие практики проектирования схем

Схема — это контракт между моделью и вашим инструментом. Хорошо спроектированные схемы улучшают удобство использования инструментов.

#### 1. Чёткие описания параметров

Всегда включайте описательные данные для каждого параметра:

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

#### 2. Ограничения валидации

Добавляйте ограничения валидации для предотвращения некорректных входных данных:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Свойство электронной почты с проверкой формата
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Свойство возраста с числовыми ограничениями
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Перечисляемое свойство
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

#### 3. Последовательные структуры ответов

Поддерживайте согласованность в структурах ответов, чтобы модель могла проще интерпретировать результаты:

```python
async def execute_async(self, request):
    try:
        # Обработать запрос
        results = await self._search_database(request.parameters["query"])
        
        # Всегда возвращать согласованную структуру
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

### Обработка ошибок

Надёжная обработка ошибок важна для поддержания надежности MCP инструментов.

#### 1. Грациозная обработка ошибок

Обрабатывайте ошибки на соответствующих уровнях и предоставляйте информативные сообщения:

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

#### 2. Структурированные ответы об ошибках

Возвращайте структурированную информацию об ошибках, когда это возможно:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Реализация
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
        
        // Повторно выбросить другие исключения как ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Логика повторных попыток

Реализуйте логику повторных попыток для временных сбоев:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # секунды
    
    while retry_count < max_retries:
        try:
            # Вызов внешнего API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Экспоненциальный откат
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Нетранзитная ошибка, не повторять попытку
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Оптимизация производительности

#### 1. Кэширование

Реализуйте кэширование для затратных операций:

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

#### 2. Асинхронная обработка

Используйте асинхронные шаблоны программирования для операций, связанных с вводом/выводом:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Для длительных операций немедленно возвращайте идентификатор обработки
        String processId = UUID.randomUUID().toString();
        
        // Запустите асинхронную обработку
        CompletableFuture.runAsync(() -> {
            try {
                // Выполните длительную операцию
                documentService.processDocument(documentId);
                
                // Обновите статус (обычно хранится в базе данных)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Верните немедленный ответ с идентификатором процесса
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Инструмент для проверки статуса компаньона
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

#### 3. Ограничение использования ресурсов

Реализуйте ограничения ресурсов, чтобы предотвратить перегрузку:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Разрешить 5 запросов в секунду
            bucket_size=10        # Разрешить всплески до 10 запросов
        )
    
    async def execute_async(self, request):
        # Проверить, можем ли продолжить или нужно ждать
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Если время ожидания слишком долгое
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Подождать соответствующее время задержки
                await asyncio.sleep(delay)
        
        # Израсходовать токен и продолжить с запросом
        self.rate_limiter.consume()
        
        # Вызвать API
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
            
            # Вычислить время до появления следующего токена
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Добавить новые токены в зависимости от прошедшего времени
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Лучшие практики безопасности

#### 1. Валидация входных данных

Всегда тщательно проверяйте входные параметры:

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

#### 2. Проверки авторизации

Реализуйте корректные проверки авторизации:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Получить контекст пользователя из запроса
    UserContext user = request.getContext().getUserContext();
    
    // Проверить, имеет ли пользователь необходимые разрешения
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Для конкретных ресурсов проверить доступ к этому ресурсу
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Продолжить выполнение инструмента
    // ...
}
```

#### 3. Обработка чувствительных данных

Обращайтесь с чувствительными данными осторожно:

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
        
        # Получить данные пользователя
        user_data = await self.user_service.get_user_data(user_id)
        
        # Фильтровать конфиденциальные поля, если они не запрошены явно И разрешены
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Проверить уровень авторизации в контексте запроса
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Создать копию, чтобы избежать изменения оригинала
        redacted = user_data.copy()
        
        # Зашифровать конкретные конфиденциальные поля
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Зашифровать вложенные конфиденциальные данные
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Лучшие практики тестирования MCP инструментов

Всеобъемлющее тестирование гарантирует корректную работу MCP инструментов, обработку крайних случаев и правильную интеграцию с остальной системой.

### Модульное тестирование

#### 1. Тестирование каждого инструмента в изоляции

Создавайте сфокусированные тесты функционала каждого инструмента:

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

#### 2. Тестирование валидации схем

Проверяйте валидность схем и корректное применение ограничений:

```java
@Test
public void testSchemaValidation() {
    // Создать экземпляр инструмента
    SearchTool searchTool = new SearchTool();
    
    // Получить схему
    Object schema = searchTool.getSchema();
    
    // Преобразовать схему в JSON для валидации
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Проверить, что схема является допустимым JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Проверить корректные параметры
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Проверить отсутствие обязательного параметра
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Проверить неверный тип параметра
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Тесты обработки ошибок

Создавайте специальные тесты для ситуаций с ошибками:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Организовать
    tool = ApiTool(timeout=0.1)  # Очень короткий тайм-аут
    
    # Смоделировать запрос, который превысит время ожидания
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Дольше, чем тайм-аут
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Выполнить и проверить
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Проверить сообщение исключения
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Организовать
    tool = ApiTool()
    
    # Смоделировать ответ с ограничением скорости
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
        
        # Выполнить и проверить
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Проверить, что исключение содержит информацию об ограничении скорости
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Интеграционное тестирование

#### 1. Тестирование цепочек инструментов

Проверяйте работу инструментов в ожидаемых комбинациях:

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

#### 2. Тестирование MCP сервера

Проверяйте MCP сервер с полной регистрацией и выполнением инструментов:

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
        // Протестировать конечную точку обнаружения
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Создать запрос инструмента
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Отправить запрос и проверить ответ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Создать неверный запрос инструмента
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Отсутствует параметр "b"
        request.put("parameters", parameters);
        
        // Отправить запрос и проверить ответ с ошибкой
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Сквозное тестирование

Тестируйте полные рабочие процессы от подсказки модели до выполнения инструмента:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Настройка - настройка клиента MCP и мок-модели
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Мок ответы модели
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
    
    # Мок ответ инструмента погоды
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
        
        # Выполнить
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Проверить
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Тестирование производительности

#### 1. Нагрузочное тестирование

Проверяйте, сколько одновременных запросов способен обрабатывать MCP сервер:

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

#### 2. Стресс-тестирование

Тестируйте систему при экстремальной нагрузке:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Настройка JMeter для стресс-тестирования
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Настроить план тестирования JMeter
    HashTree testPlanTree = new HashTree();
    
    // Создать план тестирования, группу потоков, семплеры и т.д.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Добавить HTTP-семплер для выполнения инструмента
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Добавить слушателей
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Запустить тест
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Проверить результаты
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Среднее время отклика < 200мс
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90-й процентиль < 500мс
}
```

#### 3. Мониторинг и профилирование

Настраивайте мониторинг для долгосрочного анализа производительности:

```python
# Настроить мониторинг для сервера MCP
def configure_monitoring(server):
    # Настроить метрики Prometheus
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
    
    # Добавить промежуточное ПО для измерения времени и записи метрик
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Открыть конечную точку метрик
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Шаблоны проектирования рабочих процессов MCP

Хорошо спроектированные рабочие процессы MCP улучшают эффективность, надёжность и удобство поддержки. Вот ключевые шаблоны для применения:

### 1. Шаблон цепочки инструментов

Связывайте несколько инструментов в последовательность, где выходные данные одного являются входными для следующего:

```python
# Реализация цепочки инструментов на Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Список имен инструментов для последовательного выполнения
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Выполнить каждый инструмент в цепочке, передавая предыдущий результат
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Сохранить результат и использовать его как ввод для следующего инструмента
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Пример использования
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

Используйте центральный инструмент, который направляет запросы к специализированным инструментам в зависимости от входных данных:

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

### 3. Шаблон параллельной обработки

Выполняйте несколько инструментов одновременно для повышения эффективности:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Шаг 1: Получить метаданные набора данных (синхронно)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Шаг 2: Запустить несколько анализов параллельно
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
        
        // Дождаться завершения всех параллельных задач
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Дождаться завершения
        
        // Шаг 3: Объединить результаты
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Шаг 4: Сгенерировать итоговый отчет
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Вернуть полный результат рабочего процесса
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Шаблон восстановления после ошибок

Реализуйте грациозные альтернативные пути при сбоях инструментов:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Сначала попробуйте основной инструмент
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Зафиксировать ошибку
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Перейти к второстепенному инструменту
            try:
                # Возможно, потребуется преобразовать параметры для запасного инструмента
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Оба инструмента не сработали
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Эта реализация будет зависеть от конкретных инструментов
        # Для этого примера мы просто вернем исходные параметры
        return params

# Пример использования
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Основной (платный) API погоды
        "basicWeatherService",    # Запасной (бесплатный) API погоды
        {"location": location}
    )
```

### 5. Шаблон композиции рабочих процессов

Стройте сложные рабочие процессы, комбинируя более простые:

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

# Тестирование MCP серверов: лучшие практики и основные советы

## Обзор

Тестирование — ключевой аспект разработки надёжных, качественных MCP серверов. Это руководство содержит исчерпывающие лучшие практики и советы по тестированию ваших MCP серверов на всех этапах разработки — от модульных тестов до интеграционных и сквозных проверок.

## Почему тестирование важно для MCP серверов

MCP серверы выступают важным промежуточным звеном между AI моделями и клиентскими приложениями. Тщательное тестирование обеспечивает:

- Надёжность в продуктивной среде
- Корректную обработку запросов и ответов
- Соответствие спецификациям MCP
- Устойчивость к сбоям и крайним ситуациям
- Стабильную производительность при различных нагрузках

## Модульное тестирование MCP серверов

### Модульное тестирование (базовый уровень)

Модульные тесты проверяют отдельные компоненты MCP сервера в изоляции.

#### Что тестировать

1. **Обработчики ресурсов**: тестируйте логику каждого обработчика ресурса отдельно
2. **Реализации инструментов**: проверяйте поведение инструментов с разными входными данными
3. **Шаблоны подсказок**: убедитесь, что шаблоны подсказок корректно рендерятся
4. **Валидация схем**: тестируйте логику валидации параметров
5. **Обработка ошибок**: проверяйте ответные сообщения при некорректных входных данных

#### Лучшие практики модульного тестирования

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
# Пример модульного теста для калькулятора на Python
def test_calculator_tool_add():
    # Подготовка
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Выполнение
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Проверка
    assert result["value"] == 12
```

### Интеграционное тестирование (средний уровень)

Интеграционные тесты проверяют взаимодействие между компонентами MCP сервера.

#### Что тестировать

1. **Инициализация сервера**: тестируйте запуск сервера с разными конфигурациями
2. **Регистрация маршрутов**: проверяйте корректную регистрацию всех эндпоинтов
3. **Обработка запросов**: тестируйте полный цикл запрос-ответ
4. **Передача ошибок**: убеждайтесь, что ошибки корректно распространяются между компонентами
5. **Аутентификация и авторизация**: тестируйте механизмы безопасности

#### Лучшие практики интеграционного тестирования

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

### Сквозное тестирование (высокий уровень)

Сквозные тесты проверяют поведение всей системы от клиента до сервера.

#### Что тестировать

1. **Связь клиент-сервер**: проверяйте полные циклы запрос-ответ
2. **Реальные клиентские SDK**: тестируйте с использованием реальных клиентских реализаций
3. **Производительность под нагрузкой**: проверяйте поведение при множественных одновременных запросах
4. **Восстановление после ошибок**: тестируйте восстановление системы после сбоев
5. **Долгие операции**: проверяйте поддержку стриминга и длительных операций

#### Лучшие практики сквозного тестирования

```typescript
// Пример E2E теста с клиентом на TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Запустить сервер в тестовой среде
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
    
    // Проверка утверждений
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Стратегии создания моков для тестирования MCP

Создание заглушек необходимо для изоляции компонентов во время тестирования.

### Компоненты для мокирования

1. **Внешние AI модели**: мокируйте ответы моделей для предсказуемого тестирования
2. **Внешние сервисы**: мокируйте API-зависимости (базы данных, сторонние сервисы)
3. **Сервисы аутентификации**: мокируйте провайдеров идентификации
4. **Поставщики ресурсов**: мокируйте затратные обработчики ресурсов

### Пример: мокирование ответа AI модели

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
    # Настроить мок
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Использовать мок в тесте
    server = McpServer(model_client=mock_model)
    # Продолжить тест
```

## Тестирование производительности

Тестирование производительности критично для продуктивных MCP серверов.

### Что измерять

1. **Задержка**: время отклика на запросы
2. **Пропускная способность**: количество обработанных запросов в секунду
3. **Использование ресурсов**: загрузка CPU, памяти, сети
4. **Обработка одновременных запросов**: поведение при параллельных запросах
5. **Масштабируемость**: производительность при росте нагрузки

### Инструменты для тестирования производительности

- **k6**: инструмент open-source для нагрузочного тестирования
- **JMeter**: комплексное тестирование производительности
- **Locust**: нагрузочное тестирование на Python
- **Azure Load Testing**: облачное тестирование производительности

### Пример: базовый нагрузочный тест с k6

```javascript
// сценарий k6 для нагрузочного тестирования сервера MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 виртуальных пользователей
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

## Автоматизация тестирования MCP серверов

Автоматизация тестов обеспечивает постоянное качество и более быстрый цикл обратной связи.

### Интеграция CI/CD

1. **Запуск модульных тестов по Pull Request**: убеждайтесь, что изменения кода не ломают существующий функционал
2. **Интеграционные тесты на стадии подготовки**: Запускайте интеграционные тесты в предпродакшн-средах  
3. **Базовые показатели производительности**: Поддерживайте эталонные показатели производительности для выявления регрессий  
4. **Сканирование безопасности**: Автоматизируйте тестирование безопасности как часть конвейера  

### Пример CI-конвейера (GitHub Actions)

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
  
## Тестирование соответствия спецификации MCP

Проверьте, что ваш сервер корректно реализует спецификацию MCP.

### Основные области соответствия

1. **API-эндпоинты**: Тестируйте необходимые эндпоинты (/resources, /tools и т.д.)  
2. **Формат запросов/ответов**: Проверяйте соответствие схемам  
3. **Коды ошибок**: Проверяйте правильность статусов для разных сценариев  
4. **Типы контента**: Тестируйте обработку различных типов контента  
5. **Процесс аутентификации**: Проверяйте механизмы аутентификации в соответствии с требованиями спецификации  

### Набор тестов на соответствие

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
  
## Топ 10 советов для эффективного тестирования сервера MCP

1. **Тестируйте определения инструментов отдельно**: Проверяйте схемы независимо от логики инструментов  
2. **Используйте параметризованные тесты**: Тестируйте инструменты с разнообразными входными данными, включая крайние случаи  
3. **Проверяйте ответы с ошибками**: Убедитесь в правильной обработке всех возможных ошибок  
4. **Тестируйте логику авторизации**: Обеспечьте корректный контроль доступа для разных ролей пользователей  
5. **Следите за покрытием тестами**: Стремитесь к высокому покрытию критически важного кода  
6. **Тестируйте потоковые ответы**: Проверяйте правильную обработку потокового контента  
7. **Симулируйте сетевые проблемы**: Проверяйте поведение при проблемах с сетью  
8. **Тестируйте лимиты ресурсов**: Проверяйте поведение при достижении квот или ограничений по скорости  
9. **Автоматизируйте регрессионное тестирование**: Создайте набор тестов, который запускается при каждом изменении кода  
10. **Документируйте тест-кейсы**: Поддерживайте чёткую документацию сценариев тестирования  

## Распространённые ошибки при тестировании

- **Чрезмерное упование на успешные сценарии**: Обязательно тщательно тестируйте случаи с ошибками  
- **Пренебрежение тестированием производительности**: Выявляйте узкие места до выхода в продакшн  
- **Тестирование только в изоляции**: Используйте сочетание юнит-, интеграционных и сквозных тестов  
- **Неполное покрытие API**: Убедитесь, что все эндпоинты и функции протестированы  
- **Несогласованность тестовых сред**: Используйте контейнеры для стабильной среды тестирования  

## Заключение

Продуманная стратегия тестирования необходима для разработки надёжных и качественных серверов MCP. Следуя практикам и советам, приведённым в этом руководстве, вы обеспечите, что ваши реализации MCP соответствуют самым высоким стандартам качества, надёжности и производительности.

## Ключевые выводы

1. **Проектирование инструментов**: Следуйте принципу единственной ответственности, используйте внедрение зависимостей и проектируйте со способностью к композиции  
2. **Проектирование схем**: Создавайте понятные, хорошо документированные схемы с правильными ограничениями валидации  
3. **Обработка ошибок**: Реализуйте корректную обработку ошибок, структурированные ответы и логику повторных попыток  
4. **Производительность**: Используйте кэширование, асинхронную обработку и регулирование ресурсов  
5. **Безопасность**: Внедряйте тщательную проверку входных данных, проверки авторизации и защиту чувствительных данных  
6. **Тестирование**: Создавайте комплексные юнит-, интеграционные и сквозные тесты  
7. **Паттерны рабочих процессов**: Применяйте устоявшиеся шаблоны, такие как цепочки, диспетчеры и параллельная обработка  

## Задание

Разработайте инструмент MCP и рабочий процесс для системы обработки документов, который:

1. Принимает документы в нескольких форматах (PDF, DOCX, TXT)  
2. Извлекает текст и ключевую информацию из документов  
3. Классифицирует документы по типу и содержанию  
4. Создаёт краткое резюме каждого документа  

Реализуйте схемы инструментов, обработку ошибок и шаблон рабочего процесса, подходящий для этого сценария. Подумайте, как вы будете тестировать эту реализацию.

## Ресурсы

1. Присоединяйтесь к сообществу MCP на [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs), чтобы быть в курсе последних событий  
2. Вносите вклад в открытые [проекты MCP](https://github.com/modelcontextprotocol)  
3. Применяйте принципы MCP в AI-инициативах вашей организации  
4. Изучайте специализированные реализации MCP для вашей отрасли  
5. Рассмотрите возможность прохождения продвинутых курсов по темам MCP, таким как мультимодальная интеграция или интеграция корпоративных приложений  
6. Экспериментируйте с созданием собственных инструментов и рабочих процессов MCP, используя принципы, изученные в [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Что дальше

Далее: [Кейсы](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->