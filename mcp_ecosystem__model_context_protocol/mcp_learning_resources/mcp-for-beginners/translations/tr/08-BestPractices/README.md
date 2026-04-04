# MCP Geliştirme En İyi Uygulamaları

[![MCP Development Best Practices](../../../translated_images/tr/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Bu dersin videosunu izlemek için yukarıdaki resme tıklayın)_

## Genel Bakış

Bu ders, üretim ortamlarında MCP sunucularını ve özelliklerini geliştirme, test etme ve dağıtma konusundaki ileri düzey en iyi uygulamalara odaklanmaktadır. MCP ekosistemleri karmaşıklık ve önem açısından büyürken, belirlenmiş desenleri takip etmek güvenilirlik, sürdürülebilirlik ve birlikte çalışabilirlik sağlar. Bu ders, gerçek dünya MCP uygulamalarından kazanılan pratik bilgileri bir araya getirerek güçlü, verimli sunucular oluşturmanız için etkili kaynaklar, istemler ve araçlarla rehberlik eder.

## Öğrenme Hedefleri

Bu dersin sonunda şunları yapabilirsiniz:

- MCP sunucu ve özellik tasarımında sektörün en iyi uygulamalarını uygulamak
- MCP sunucuları için kapsamlı test stratejileri oluşturmak
- Karmaşık MCP uygulamaları için verimli, yeniden kullanılabilir iş akışı desenleri tasarlamak
- MCP sunucularında uygun hata yönetimi, günlükleme ve gözlemlenebilirlik uygulamak
- MCP uygulamalarını performans, güvenlik ve sürdürülebilirlik açısından optimize etmek

## MCP Temel İlkeleri

Spesifik uygulama uygulamalarına geçmeden önce, etkili MCP geliştirmeyi yönlendiren temel ilkeleri anlamak önemlidir:

1. **Standardize Edilmiş İletişim**: MCP, tüm uygulamalarda tutarlı bir istek, yanıt ve hata yönetimi biçimi sağlayan JSON-RPC 2.0’ı temel alır.

2. **Kullanıcı Odaklı Tasarım**: MCP uygulamalarınızda her zaman kullanıcı onayını, kontrolünü ve şeffaflığı önceliklendirin.

3. **Öncelikle Güvenlik**: Kimlik doğrulama, yetkilendirme, doğrulama ve oran sınırlandırma dahil olmak üzere sağlam güvenlik önlemleri uygulayın.

4. **Modüler Mimari**: MCP sunucularınızı her araç ve kaynağın açık ve odaklanmış bir amaca sahip olduğu modüler bir yaklaşımla tasarlayın.

5. **Durumlu Bağlantılar**: Daha tutarlı ve bağlama duyarlı etkileşimler için MCP’nin birden çok istek boyunca durumu koruma yeteneğinden yararlanın.

## Resmi MCP En İyi Uygulamaları

Aşağıdaki en iyi uygulamalar resmi Model Context Protocol belgelerinden türetilmiştir:

### Güvenlik En İyi Uygulamaları

1. **Kullanıcı Onayı ve Kontrolü**: Veri erişimi veya işlem yapmadan önce her zaman açık kullanıcı onayı isteyin. Paylaşılan veriler ve yetkilendirilen işlemler üzerinde net kontrol sağlayın.

2. **Veri Gizliliği**: Yalnızca açık onayla kullanıcı verilerini açın ve uygun erişim kontrolleriyle koruyun. Yetkisiz veri iletimine karşı önlem alın.

3. **Araç Güvenliği**: Herhangi bir aracı çağırmadan önce açık kullanıcı onayı isteyin. Kullanıcıların her aracın işlevselliğini anlamasını sağlayın ve sağlam güvenlik sınırları uygulayın.

4. **Araç İzin Kontrolü**: Bir oturum sırasında modelin kullanabileceği araçları yapılandırarak yalnızca açıkça yetkilendirilmiş araçların erişilebilir olmasını sağlayın.

5. **Kimlik Doğrulama**: API anahtarları, OAuth tokenleri veya diğer güvenli kimlik doğrulama yöntemleri kullanarak araçlara, kaynaklara veya hassas işlemlere erişmeden önce uygun kimlik doğrulamasını zorunlu kılın.

6. **Parametre Doğrulama**: Araç çağrıları için kötü biçimlendirilmiş veya kötü niyetli girdi girişlerinin araç uygulamalarına ulaşmasını önlemek için doğrulama zorunlu kılın.

7. **Oran Sınırlandırma**: Kötüye kullanımı önlemek ve sunucu kaynaklarının adil kullanımını sağlamak için oran sınırlandırma uygulayın.

### Uygulama En İyi Uygulamaları

1. **Yetkinlik Müzakeresi**: Bağlantı kurulumu sırasında desteklenen özellikler, protokol sürümleri, mevcut araçlar ve kaynaklar hakkında bilgi alışverişinde bulunun.

2. **Araç Tasarımı**: Birden çok konuyu ele almaya çalışan monolitik araçlar yerine, tek işi iyi yapan odaklanmış araçlar oluşturun.

3. **Hata Yönetimi**: Sorunların teşhisi, hataların düzgün yönetimi ve uygulanabilir geri bildirim sağlamak için standartlaştırılmış hata mesajları ve kodları uygulayın.

4. **Günlükleme**: Protokol etkileşimlerini denetim, hata ayıklama ve izleme için yapılandırılmış günlükler yapılandırın.

5. **İlerleme Takibi**: Uzun süren işlemler için kullanıcı arayüzlerinin tepki verebilmesi adına ilerleme güncellemeleri raporlayın.

6. **İstek İptali**: İstemcilerin artık ihtiyaç duyulmayan veya çok uzun süren mevcut istekleri iptal etmesine izin verin.

## Ek Referanslar

MCP en iyi uygulamaları hakkında en güncel bilgiler için bkz.:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Güvenlik riskleri ve önlemler
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Uygulamalı güvenlik eğitimi

## Pratik Uygulama Örnekleri

### Araç Tasarımı En İyi Uygulamaları

#### 1. Tek Sorumluluk Prensibi

Her MCP aracı açık ve odaklanmış bir amaca sahip olmalıdır. Birden fazla konuyu ele almaya çalışan monolitik araçlar yerine, belirli görevlerde üstünleşen özel araçlar geliştirin.

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

#### 2. Tutarlı Hata Yönetimi

Bilgilendirici hata mesajları ve uygun kurtarma mekanizmalarıyla sağlam hata yönetimi uygulayın.

```python
# Kapsamlı hata yönetimi ile Python örneği
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Parametre doğrulama
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Güvenlik doğrulaması
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Zaman aşımı ile veritabanı işlemi
                async with timeout(10):  # 10 saniye zaman aşımı
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Bağlantı hataları geçici olabilir
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Sorgu hataları muhtemelen istemci hatalarıdır
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Araçlara özgü hataların geçmesine izin ver
            raise
        except Exception as e:
            # Beklenmeyen hatalar için genel yakalama
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL enjeksiyonu tespiti uygulaması
        pass
        
    def _log_error(self, message, error):
        # Hata kaydı uygulaması
        pass
```

#### 3. Parametre Doğrulama

Kötü biçimlendirilmiş veya kötü niyetli girdi girişlerini önlemek için parametreleri her zaman kapsamlı şekilde doğrulayın.

```javascript
// JavaScript/TypeScript örneği detaylı parametre doğrulaması ile
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
    // 1. Parametre varlığını doğrula
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Parametre tiplerini doğrula
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Parametre değerlerini doğrula
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Yazma işlemi için içerik varlığını doğrula
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Yol güvenliği doğrulaması
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Doğrulanmış parametrelere dayalı uygulama
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Yol güvenliği kontrolünün uygulanması
    // ...
  }
}
```

### Güvenlik Uygulama Örnekleri

#### 1. Kimlik Doğrulama ve Yetkilendirme

```java
// Kimlik doğrulama ve yetkilendirmeyle Java örneği
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Bağımlılık enjeksiyonu
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
        // 1. Kimlik doğrulama bağlamını çıkar
        String authToken = request.getContext().getAuthToken();
        
        // 2. Kullanıcıyı doğrula
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Belirli işlem için yetkilendirmeyi kontrol et
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Yetkilendirilmiş işlemle devam et
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

#### 2. Oran Sınırlandırma

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

## Test En İyi Uygulamaları

### 1. MCP Araçları için Birim Testi

Araçlarınızı her zaman izole olarak, dış bağımlılıkları taklit ederek test edin:

```typescript
// Bir araç birim testi için TypeScript örneği
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Sahte bir hava durumu servisi oluşturun
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Sahte bağımlılık ile aracı oluşturun
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Düzenle
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // İşlemi gerçekleştir
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Doğrula
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Düzenle
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // İşle ve doğrula
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Entegrasyon Testi

İstemci isteklerinden sunucu yanıtlarına kadar tam akışı test edin:

```python
# Python entegrasyon testi örneği
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Bir test sunucusu başlat
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Bir istemci oluştur
        client = McpClient("http://localhost:5000")
        
        # Araç keşfini test et
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Araç çalıştırmayı test et
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Yanıtı doğrula
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Temizle
        await server.stop()
```

## Performans Optimizasyonu

### 1. Önbellekleme Stratejileri

Gecikmeyi ve kaynak kullanımını azaltmak için uygun önbellekleme uygulayın:

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

#### 2. Bağımlılık Enjeksiyonu ve Test Edilebilirlik

Araçların bağımlılıklarını kurucu enjeksiyonu yoluyla alacak şekilde tasarlayın, böylece test edilebilir ve yapılandırılabilir hale gelirler:

```java
// Java bağımlılık enjeksiyonu ile örnek
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Bağımlılıklar yapıcı metod ile enjekte edildi
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Araç uygulaması
    // ...
}
```

#### 3. Birleşebilir Araçlar

Daha karmaşık iş akışları oluşturmak için bir araya getirilebilen araçlar tasarlayın:

```python
# Birleşebilir araçları gösteren Python örneği
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Uygulama...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Bu araç, dataFetch aracının sonuçlarını kullanabilir
    async def execute_async(self, request):
        # Uygulama...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Bu araç, dataAnalysis aracının sonuçlarını kullanabilir
    async def execute_async(self, request):
        # Uygulama...
        pass

# Bu araçlar bağımsız olarak veya bir iş akışının parçası olarak kullanılabilir
```

### Şema Tasarımı En İyi Uygulamaları

Şema, model ve aracınız arasındaki sözleşmedir. İyi tasarlanmış şemalar araç kullanılabilirliğini artırır.

#### 1. Açık Parametre Açıklamaları

Her parametre için açıklayıcı bilgi ekleyin:

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

#### 2. Doğrulama Kısıtlamaları

Geçersiz girdileri önlemek için doğrulama kısıtlamaları ekleyin:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Format doğrulamalı e-posta özelliği
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Sayısal kısıtlamalı yaş özelliği
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Numaralandırılmış özellik
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

#### 3. Tutarlı Yanıt Yapıları

Sonuçların modeller tarafından yorumlanmasını kolaylaştırmak için yanıt yapılarında tutarlılık sağlayın:

```python
async def execute_async(self, request):
    try:
        # İsteği işle
        results = await self._search_database(request.parameters["query"])
        
        # Her zaman tutarlı bir yapı döndür
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

### Hata Yönetimi

Güvenilirlik için MCP araçlarında sağlam hata yönetimi çok önemlidir.

#### 1. Zarif Hata Yönetimi

Hataları uygun seviyede yönetip bilgilendirici mesajlar sağlayın:

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

#### 2. Yapılandırılmış Hata Yanıtları

Mümkün olduğunda yapılandırılmış hata bilgisi döndürün:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Uygulama
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
        
        // Diğer istisnaları ToolExecutionException olarak yeniden fırlat
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Yeniden Deneme Mantığı

Geçici hatalar için uygun yeniden deneme mantığını uygulayın:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # saniyeler
    
    while retry_count < max_retries:
        try:
            # Harici API çağrısı yap
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Üssel geri çekilme
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Geçici olmayan hata, yeniden deneme yapma
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Performans Optimizasyonu

#### 1. Önbellekleme

Pahalı işlemler için önbellekleme uygulayın:

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

#### 2. Asenkron İşleme

G/Ç ağırlıklı işlemler için asenkron programlama desenlerini kullanın:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Uzun süren işlemler için, hemen bir işlem kimliği döndürün
        String processId = UUID.randomUUID().toString();
        
        // Asenkron işlemi başlat
        CompletableFuture.runAsync(() -> {
            try {
                // Uzun süren işlemi gerçekleştir
                documentService.processDocument(documentId);
                
                // Durumu güncelle (genellikle bir veritabanında saklanır)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // İşlem kimliği ile derhal yanıt döndür
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Yardımcı durum kontrol aracı
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

#### 3. Kaynak Kısıtlama

Aşırı yüklemeyi önlemek için kaynak kısıtlama uygulayın:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Saniyede 5 isteğe izin ver
            bucket_size=10        # 10 isteğe kadar patlamalara izin ver
        )
    
    async def execute_async(self, request):
        # Devam edip edemeyeceğimizi ya da beklememiz gerekip gerekmediğini kontrol et
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Eğer bekleme süresi çok uzunsa
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Uygun gecikme süresi için bekle
                await asyncio.sleep(delay)
        
        # Bir token tüket ve isteğe devam et
        self.rate_limiter.consume()
        
        # API'yi çağır
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
            
            # Sonraki tokenın ne zaman kullanılabilir olacağını hesapla
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Geçen zamana göre yeni tokenler ekle
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Güvenlik En İyi Uygulamaları

#### 1. Girdi Doğrulama

Girdi parametrelerini her zaman kapsamlı şekilde doğrulayın:

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

#### 2. Yetkilendirme Kontrolleri

Uygun yetkilendirme kontrollerini uygulayın:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // İstekten kullanıcı bağlamını al
    UserContext user = request.getContext().getUserContext();
    
    // Kullanıcının gerekli izinlere sahip olup olmadığını kontrol et
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Belirli kaynaklar için, o kaynağa erişimi kontrol et
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Araç yürütmesine devam et
    // ...
}
```

#### 3. Hassas Veri İşleme

Hassas verileri dikkatli şekilde işleyin:

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
        
        # Kullanıcı verisini al
        user_data = await self.user_service.get_user_data(user_id)
        
        # Duyarlı alanları açıkça talep edilmedikçe VE yetkilendirilmedikçe filtrele
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # İstek bağlamında yetki seviyesini kontrol et
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Orijinali değiştirmemek için bir kopya oluştur
        redacted = user_data.copy()
        
        # Belirli duyarlı alanları düzenle
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # İç içe geçmiş duyarlı verileri düzenle
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP Araçları İçin Test En İyi Uygulamaları

Kapsamlı test, MCP araçlarının doğru çalışmasını, uç durumları ele almasını ve sistemle düzgün entegrasyonunu sağlar.

### Birim Testleri

#### 1. Her Aracı İzole Test Et

Her aracın işlevselliği için odaklanmış testler oluşturun:

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

#### 2. Şema Doğrulama Testleri

Şemaların geçerli ve kısıtlamaları doğru uyguladığını test edin:

```java
@Test
public void testSchemaValidation() {
    // Araç örneği oluştur
    SearchTool searchTool = new SearchTool();
    
    // Şemayı al
    Object schema = searchTool.getSchema();
    
    // Doğrulama için şemayı JSON'a dönüştür
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Şemanın geçerli bir JSONSchema olduğunu doğrula
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Geçerli parametreleri test et
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Eksik zorunlu parametreyi test et
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Geçersiz parametre türünü test et
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Hata Yönetimi Testleri

Hata koşulları için özel testler oluşturun:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Düzenle
    tool = ApiTool(timeout=0.1)  # Çok kısa zaman aşımı
    
    # Zaman aşımına uğrayacak bir isteği taklit et
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Zaman aşımından daha uzun
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # İşle ve Doğrula
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # İstisna mesajını doğrula
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Düzenle
    tool = ApiTool()
    
    # Oran sınırlı bir yanıtı taklit et
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
        
        # İşle ve Doğrula
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # İstisnanın oran sınırı bilgisi içerdiğini doğrula
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Entegrasyon Testi

#### 1. Araç Zinciri Testi

Araçların beklenen kombinasyonlarda birlikte çalışmasını test edin:

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

#### 2. MCP Sunucu Testi

Tam araç kaydı ve yürütmesi ile MCP sunucusunu test edin:

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
        // Keşif uç noktasını test et
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Araç isteği oluştur
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // İsteği gönder ve yanıtı doğrula
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Geçersiz araç isteği oluştur
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" parametresi eksik
        request.put("parameters", parameters);
        
        // İsteği gönder ve hata yanıtını doğrula
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Uçtan Uca Test

Model isteminden araç yürütmesine kadar eksiksiz iş akışlarını test edin:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Düzenle - MCP istemcisini ve sahte modeli kur
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Sahte model yanıtları
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
    
    # Sahte hava aracı yanıtı
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
        
        # İşlem yap
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Doğrula
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Performans Testi

#### 1. Yük Testi

MCP sunucunuzun kaç eşzamanlı isteği karşılayabileceğini test edin:

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

#### 2. Stres Testi

Sistemi aşırı yüke tabi tutun:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Stres testi için JMeter kurun
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter test planını yapılandırın
    HashTree testPlanTree = new HashTree();
    
    // Test planı, thread grubu, örnekleyiciler vb. oluşturun
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Araç çalıştırma için HTTP örnekleyici ekleyin
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Dinleyiciler ekleyin
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Testi çalıştırın
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Sonuçları doğrulayın
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Ortalama yanıt süresi < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90. yüzdelik < 500ms
}
```

#### 3. İzleme ve Profiling

Uzun vadeli performans analizi için izleme kurun:

```python
# Bir MCP sunucusu için izlemeyi yapılandırın
def configure_monitoring(server):
    # Prometheus metriklerini kurun
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
    
    # Zamanlama ve metrik kaydı için ara katman ekleyin
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Metrik uç noktasını açığa çıkarın
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP İş Akışı Tasarım Desenleri

İyi tasarlanmış MCP iş akışları verimliliği, güvenilirliği ve sürdürülebilirliği artırır. İzlenecek temel desenler:

### 1. Araç Zinciri Deseni

Her aracın çıktısının bir sonraki aracın girdisi olduğu bir dizide birden fazla aracı bağlayın:

```python
# Python Araç Zinciri uygulaması
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Sırayla yürütülecek araç isimleri listesi
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Zincirdeki her aracı çalıştır, önceki sonucu geçir
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Sonucu sakla ve sonraki araç için girdi olarak kullan
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Örnek kullanım
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

### 2. Dağıtıcı (Dispatcher) Deseni

Girdiye göre uzmanlaşmış araçlara yönlendiren merkezi bir araç kullanın:

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

### 3. Paralel İşleme Deseni

Verimlilik için birden çok aracı eşzamanlı çalıştırın:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Adım 1: Veri kümesi meta verilerini al (eşzamanlı)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Adım 2: Birden fazla analizi paralel olarak başlat
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
        
        // Tüm paralel görevlerin tamamlanmasını bekle
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Tamamlanmayı bekle
        
        // Adım 3: Sonuçları birleştir
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Adım 4: Özet rapor oluştur
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Tam iş akışı sonucunu döndür
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Hata Kurtarma Deseni

Araç hataları için zarif geri dönüşler uygulayın:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Öncelikle birincil aracı dene
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Hata kaydını tut
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # İkincil araca geç
            try:
                # Yedek araç için parametreleri dönüştürmek gerekebilir
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Her iki araç da başarısız oldu
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Bu uygulama spesifik araçlara bağlı olacaktır
        # Bu örnek için orijinal parametreleri geri döndüreceğiz
        return params

# Örnek kullanım
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Birincil (ücretli) hava durumu API'si
        "basicWeatherService",    # Yedek (ücretsiz) hava durumu API'si
        {"location": location}
    )
```

### 5. İş Akışı Bileşimi Deseni

Daha basit iş akışlarını birleştirerek karmaşık iş akışları oluşturun:

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

# MCP Sunucularını Test Etme: En İyi Uygulamalar ve Önemli İpuçları

## Genel Bakış

Test etme, güvenilir ve yüksek kaliteli MCP sunucuları geliştirme sürecinin kritik bir parçasıdır. Bu rehber, birim testlerden entegrasyon testlerine ve uçtan uca doğrulamaya kadar MCP sunucularınızı geliştirme yaşam döngüsü boyunca test etmeniz için kapsamlı en iyi uygulamalar ve ipuçları sağlar.

## MCP Sunucuları İçin Test Neden Önemlidir

MCP sunucuları, yapay zeka modelleri ile istemci uygulamalar arasında kritik bir ara katman görevi görür. Titiz testler şunları sağlar:

- Üretim ortamlarında güvenilirlik
- İstek ve yanıtların doğru işlenmesi
- MCP spesifikasyonlarının doğru uygulanması
- Hatalara ve uç durumlara karşı dayanıklılık
- Çeşitli yükler altında tutarlı performans

## MCP Sunucuları İçin Birim Testi

### Birim Testi (Temel)

Birim testleri, MCP sunucunuzun bireysel bileşenlerini izole olarak doğrular.

#### Test Edilecekler

1. **Kaynak İşleyiciler**: Her kaynak işleyicinin mantığını bağımsız test edin
2. **Araç Uygulamaları**: Farklı girdilerle araç davranışını doğrulayın
3. **İstem Şablonları**: İstem şablonlarının doğru render edildiğinden emin olun
4. **Şema Doğrulaması**: Parametre doğrulama mantığını test edin
5. **Hata Yönetimi**: Geçersiz girdiler için hata yanıtlarını doğrulayın

#### Birim Testi En İyi Uygulamaları

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
# Python'da bir hesap makinesi aracı için örnek bir birim testi
def test_calculator_tool_add():
    # Düzenle
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Uygula
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Doğrula
    assert result["value"] == 12
```

### Entegrasyon Testi (Orta Katman)

Entegrasyon testleri, MCP sunucunuzun bileşenleri arasındaki etkileşimleri doğrular.

#### Test Edilecekler

1. **Sunucu Başlatma**: Çeşitli yapılandırmalarla sunucu başlatmayı test edin
2. **Yol Kaydı**: Tüm uç noktaların doğru kaydedildiğini doğrulayın
3. **İstek İşleme**: Tam istek-yanıt döngüsünü test edin
4. **Hata Yayılımı**: Hataların bileşenler arasında düzgün yönetildiğini sağlayın
5. **Kimlik Doğrulama & Yetkilendirme**: Güvenlik mekanizmalarını test edin

#### Entegrasyon Testi En İyi Uygulamaları

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

### Uçtan Uca Test (Üst Katman)

Uçtan uca testler, istemciden sunucuya tam sistem davranışını doğrular.

#### Test Edilecekler

1. **İstemci-Sunucu İletişimi**: Tam istek-yanıt döngülerini test edin
2. **Gerçek İstemci SDK’ları**: Gerçek istemci uygulamalarıyla test edin
3. **Yük Altında Performans**: Çoklu eşzamanlı isteklerle davranışı doğrulayın
4. **Hata Kurtarma**: Sistem hatalardan kurtulma yeteneğini test edin
5. **Uzun Süren İşlemler**: Akış ve uzun işlemlerin yönetimini doğrulayın

#### Uçtan Uca Test En İyi Uygulamaları

```typescript
// TypeScript'te bir istemci ile örnek E2E testi
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Test ortamında sunucuyu başlat
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // İşlem yap
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Doğrula
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP Testi İçin Mocklama Stratejileri

Mocklama, test sırasında bileşenleri izole etmek için gereklidir.

### Mocklanacak Bileşenler

1. **Dış AI Modelleri**: Öngörülebilir testler için model yanıtlarını mocklayın
2. **Dış Servisler**: API bağımlılıklarını (veritabanları, üçüncü taraf servisler) mocklayın
3. **Kimlik Doğrulama Servisleri**: Kimlik sağlayıcılarını mocklayın
4. **Kaynak Sağlayıcılar**: Pahalı kaynak işleyicileri mocklayın

### Örnek: AI Model Yanıtı Mocklama

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
# unittest.mock ile Python örneği
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Mock'u yapılandır
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Testte mock kullan
    server = McpServer(model_client=mock_model)
    # Teste devam et
```

## Performans Testi

Performans testi, üretim MCP sunucuları için kritik önemdedir.

### Ölçülecekler

1. **Gecikme**: İsteklerin yanıt süresi
2. **Verim**: Saniyede işlenen istek sayısı
3. **Kaynak Kullanımı**: CPU, bellek, ağ kullanımı
4. **Eşzamanlılık Yönetimi**: Paralel istekler altındaki davranış
5. **Ölçeklenebilirlik Özellikleri**: Yük arttıkça performans

### Performans Testi Araçları

- **k6**: Açık kaynak yük testi aracı
- **JMeter**: Kapsamlı performans testi
- **Locust**: Python tabanlı yük testi
- **Azure Load Testing**: Bulut tabanlı performans testi

### Örnek: k6 ile Temel Yük Testi

```javascript
// MCP sunucusunu yük testi için k6 betiği
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 sanal kullanıcı
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

## MCP Sunucuları İçin Test Otomasyonu

Testlerinizi otomatikleştirmek, tutarlı kalite ve daha hızlı geri bildirim sağlar.

### CI/CD Entegrasyonu

1. **Pull Request’lerde Birim Testleri Çalıştırın**: Kod değişikliklerinin mevcut işlevselliği bozmadığından emin olun  
2. **Staging Ortamında Entegrasyon Testleri**: Üretim öncesi ortamlarda entegrasyon testlerini çalıştırın  
3. **Performans Temelleri**: Gerilemeleri yakalamak için performans kıyaslamalarını koruyun  
4. **Güvenlik Taramaları**: Pipeline'ın bir parçası olarak güvenlik testlerini otomatikleştirin  

### Örnek CI Pipeline (GitHub Actions)

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
  
## MCP Spesifikasyonuna Uygunluk Testi  

Sunucunuzun MCP spesifikasyonunu doğru şekilde uyguladığını doğrulayın.  

### Ana Uygunluk Alanları  

1. **API Uç Noktaları**: Gerekli uç noktaları test edin (/resources, /tools, vb.)  
2. **İstek/Cevap Formatı**: Şema uyumluluğunu doğrulayın  
3. **Hata Kodları**: Çeşitli senaryolar için doğru durum kodlarını kontrol edin  
4. **İçerik Türleri**: Farklı içerik türlerinin işlenmesini test edin  
5. **Kimlik Doğrulama Akışı**: Spesifikasyona uygun kimlik doğrulama mekanizmalarını doğrulayın  

### Uygunluk Test Paketi  

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
  
## Etkili MCP Sunucu Testi İçin En İyi 10 İpucu  

1. **Araç Tanımlarını Ayrı Test Edin**: Araç mantığından bağımsız olarak şema tanımlarını doğrulayın  
2. **Parametreli Testler Kullanın**: Kenar durumlar dahil çeşitli girdilerle araçları test edin  
3. **Hata Yanıtlarını Kontrol Edin**: Tüm olası hata durumları için doğru hata yönetimini doğrulayın  
4. **Yetkilendirme Mantığını Test Edin**: Farklı kullanıcı rolleri için uygun erişim kontrolünü sağlayın  
5. **Test Kapsamını İzleyin**: Kritik yol kodunun yüksek kapsama hedefleyin  
6. **Akış Yanıtlarını Test Edin**: Akış içeriklerinin doğru şekilde işlenmesini doğrulayın  
7. **Ağ Problemlerini Simüle Edin**: Kötü ağ koşullarında davranışı test edin  
8. **Kaynak Sınırlarını Test Edin**: Kota veya hız sınırına ulaşıldığında davranışı doğrulayın  
9. **Regresyon Testlerini Otomatikleştirin**: Her kod değişikliğinde çalışan bir test paketi oluşturun  
10. **Test Senaryolarını Belgelendirin**: Test durumlarının net dokümantasyonunu tutun  

## Yaygın Test Hataları  

- **Sadece mutlu yol testine aşırı güvenmek**: Hata durumlarını da kapsamlı şekilde test edin  
- **Performans testlerini ihmal etmek**: Üretimi etkileyen darboğazları önceden tespit edin  
- **Yalnızca izole test yapmak**: Birim, entegrasyon ve uçtan uca testleri birleştirin  
- **Eksik API kapsamı**: Tüm uç noktaların ve özelliklerin test edildiğinden emin olun  
- **Tutarsız test ortamları**: Tutarlı test ortamları sağlamak için konteyner kullanın  

## Sonuç  

Kapsamlı bir test stratejisi, güvenilir ve yüksek kaliteli MCP sunucuları geliştirmek için esastır. Bu rehberde belirtilen en iyi uygulamaları ve ipuçlarını uygulayarak, MCP uygulamalarınızın en yüksek kalite, güvenilirlik ve performans standartlarını karşılamasını sağlayabilirsiniz.  

## Önemli Noktalar  

1. **Araç Tasarımı**: Tek sorumluluk prensibini uygulayın, bağımlılık enjeksiyonu kullanın ve bileşenlere uygun tasarım yapın  
2. **Şema Tasarımı**: Açık, iyi belgelenmiş şemalar oluşturun ve doğru doğrulama kısıtlamaları uygulayın  
3. **Hata Yönetimi**: Zarif hata yönetimi, yapılandırılmış hata yanıtları ve yeniden deneme mantığı uygulayın  
4. **Performans**: Önbellekleme, asenkron işleme ve kaynak sınırlamasını kullanın  
5. **Güvenlik**: Kapsamlı giriş doğrulaması, yetkilendirme kontrolleri ve hassas veri işleme uygulayın  
6. **Test**: Kapsamlı birim, entegrasyon ve uçtan uca testler oluşturun  
7. **İş Akışı Modelleri**: Zincirler, dağıtıcılalar ve paralel işleme gibi yerleşik modelleri uygulayın  

## Alıştırma  

Aşağıdaki özelliklere sahip bir belgeler işleme sistemi için bir MCP aracı ve iş akışı tasarlayın:  

1. Birden çok formatta belgeleri kabul eder (PDF, DOCX, TXT)  
2. Belgelerden metin ve anahtar bilgileri çıkarır  
3. Belgeleri tür ve içeriğe göre sınıflandırır  
4. Her belgenin özetini oluşturur  

Bu senaryoya en uygun araç şemalarını, hata yönetimini ve iş akışı modelini uygulayın. Bu uygulamayı nasıl test edeceğinizi düşünün.  

## Kaynaklar  

1. En son gelişmeleri takip etmek için MCP topluluğuna [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) üzerinden katılın  
2. Açık kaynak [MCP projelerine](https://github.com/modelcontextprotocol) katkıda bulunun  
3. Kendi kuruluşunuzun yapay zeka girişimlerinde MCP ilkelerini uygulayın  
4. Sektörünüz için özel MCP uygulamalarını keşfedin  
5. Çok modlu entegrasyon veya kurumsal uygulama entegrasyonu gibi belirli MCP konularında ileri seviye kurslar almayı değerlendirin  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) aracılığıyla öğrenilen ilkelerle kendi MCP araçlarınızı ve iş akışlarınızı oluşturmayı deneyin  

## Sırada Ne Var  

Sonraki: [Vaka Çalışmaları](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, yapay zeka çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstermemize rağmen, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayın. Orijinal belge, kendi ana dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu oluşabilecek yanlış anlamalar veya yanlış yorumlamalar nedeniyle sorumluluk kabul etmiyoruz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->