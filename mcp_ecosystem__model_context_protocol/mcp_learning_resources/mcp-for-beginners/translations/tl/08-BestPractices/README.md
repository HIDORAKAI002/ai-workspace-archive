# MCP Development Best Practices

[![MCP Development Best Practices](../../../translated_images/tl/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(I-click ang larawan sa itaas upang makita ang video ng leksyong ito)_

## Overview

Ang leksyong ito ay nakatuon sa mga advanced na best practices para sa pag-develop, pag-test, at pag-deploy ng MCP servers at mga tampok sa mga production environment. Habang lumalaki ang mga MCP ecosystem sa pagiging kumplikado at kahalagahan, ang pagsunod sa mga itinatag na pattern ay nagsisiguro ng pagiging maaasahan, madaling mapanatili, at interoperability. Pinagsasama-sama ng leksyong ito ang praktikal na karunungan na nakuha mula sa mga tunay na MCP implementations upang gabayan ka sa paglikha ng matatag, epektibong mga server na may mahusay na mga resources, prompts, at mga tool.

## Learning Objectives

Sa pagtatapos ng leksyong ito, magagawa mo ang mga sumusunod:

- I-apply ang mga best practices sa industriya sa disenyo ng MCP server at mga tampok
- Gumawa ng komprehensibong mga estratehiya sa testing para sa MCP servers
- Magdisenyo ng epektibo at reusable na mga workflow pattern para sa mga kumplikadong MCP application
- Magpatupad ng wastong error handling, pag-log, at obserbability sa MCP servers
- I-optimize ang mga MCP implementation para sa performance, seguridad, at pagiging mapanatili

## MCP Core Principles

Bago sumabak sa mga espesipikong kasanayan sa implementasyon, mahalagang maunawaan ang mga pangunahing prinsipyo na gumagabay sa epektibong pag-develop ng MCP:

1. **Standardized Communication**: Ginagamit ng MCP ang JSON-RPC 2.0 bilang pundasyon nito, na nagbibigay ng pare-parehong format para sa mga request, response, at error handling sa lahat ng implementasyon.

2. **User-Centric Design**: Laging unahin ang pahintulot ng user, kontrol, at transparency sa iyong mga MCP implementation.

3. **Security First**: Magpatupad ng matibay na mga panukalang pangseguridad kabilang ang authentication, authorization, validation, at rate limiting.

4. **Modular Architecture**: Disenyo ang iyong mga MCP server gamit ang modular na lapit, kung saan bawat tool at resource ay may malinaw at pokus na layunin.

5. **Stateful Connections**: Samantalahin ang kakayahan ng MCP na mapanatili ang estado sa maraming mga request para sa mas magkakaugnay at kontekstuwal na mga interaksyon.

## Official MCP Best Practices

Ang mga sumusunod na best practices ay nagmula sa opisyal na dokumentasyon ng Model Context Protocol:

### Security Best Practices

1. **User Consent and Control**: Laging humingi ng tahasang pahintulot ng user bago ma-access ang data o magsagawa ng mga operasyon. Magbigay ng malinaw na kontrol kung anong data ang ibabahagi at alin sa mga aksyon ang pinahihintulutan.

2. **Data Privacy**: Ilahad lamang ang data ng user kapag may tahasang pahintulot at protektahan ito gamit ang angkop na mga access control. Siguraduhing hindi makakalusot ang hindi awtorisadong paglipat ng data.

3. **Tool Safety**: Kailangan ang tahasang pahintulot ng user bago tumawag ng anumang tool. Tiyakin na nauunawaan ng mga user ang functionality ng bawat tool at ipatupad ang mahigpit na hangganan sa seguridad.

4. **Tool Permission Control**: I-configure kung alin sa mga tool ang pinayagan gamitin ng modelo habang sesyon, tinitiyak na tanging mga tahasang awtorisadong tool lang ang ma-access.

5. **Authentication**: Kailangan ang wastong authentication bago payagan ang access sa mga tool, resources, o sensitibong operasyon gamit ang API keys, OAuth tokens, o iba pang secure na pamamaraan ng authentication.

6. **Parameter Validation**: Ipatupad ang pagpapatunay ng lahat ng tool invocation upang maiwasan ang maling format o malisyosong input na makarating sa implementasyon ng tool.

7. **Rate Limiting**: Magpatupad ng rate limiting upang maiwasan ang pang-aabuso at masiguro ang patas na paggamit ng mga resource ng server.

### Implementation Best Practices

1. **Capability Negotiation**: Sa panahon ng pag-set up ng koneksyon, palitan ang impormasyon tungkol sa mga sinusuportahang tampok, mga bersyon ng protocol, mga magagamit na tool, at mga resource.

2. **Tool Design**: Gumawa ng mga tool na may pokus at mahusay sa iisang gawain, sa halip na mga monolitikong tool na humahawak ng maraming bagay.

3. **Error Handling**: Magpatupad ng standardized na mga mensahe at code ng error upang makatulong sa diagnosis ng mga isyu, mahusay na paghawak ng pagkabigo, at pagbibigay ng kapaki-pakinabang na feedback.

4. **Logging**: I-configure ang mga structured log para sa auditing, debugging, at pagmomonitor ng protocol interactions.

5. **Progress Tracking**: Para sa mga long-running na operasyon, mag-ulat ng mga update sa progreso upang maging mas responsive ang user interfaces.

6. **Request Cancellation**: Payagan ang mga kliyente na kanselahin ang mga in-flight na request na hindi na kailangan o masyadong matagal.

## Additional References

Para sa pinaka-napapanahong impormasyon sa mga MCP best practices, sumangguni sa:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Mga panganib sa seguridad at mga mitigasyon
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on na pagsasanay sa seguridad

## Practical Implementation Examples

### Tool Design Best Practices

#### 1. Single Responsibility Principle

Bawat MCP tool ay dapat may malinaw at pokus na layunin. Sa halip na gumawa ng mga monolitikong tool na sumusubukang hawakan ang maraming bagay, bumuo ng mga espesyal na tool na mahusay sa partikular na mga gawain.

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

#### 2. Consistent Error Handling

Magpatupad ng matibay na error handling na may mga impormatibong mensahe ng error at angkop na mga mekanismo sa pag-recover.

```python
# Halimbawa ng Python na may komprehensibong paghawak ng error
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Pagpapatunay ng parameter
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Pagpapatunay sa seguridad
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operasyon sa database na may timeout
                async with timeout(10):  # 10 segundong timeout
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Maaaring pansamantala ang mga error sa koneksyon
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Malamang client errors ang mga error sa query
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Hayaan dumaan ang mga error na tukoy sa tool
            raise
        except Exception as e:
            # Pangkalahatang panghuli para sa mga hindi inaasahang error
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementasyon ng pagtuklas ng SQL injection
        pass
        
    def _log_error(self, message, error):
        # Implementasyon ng pag-log ng error
        pass
```

#### 3. Parameter Validation

Laging suriin nang mabuti ang mga parameter upang maiwasan ang maling format o malisyosong input.

```javascript
// Halimbawa ng JavaScript/TypeScript na may detalyadong beripikasyon ng mga parameter
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
    // 1. Beripikahin ang presensya ng parameter
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Beripikahin ang mga uri ng parameter
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Beripikahin ang mga halaga ng parameter
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Beripikahin ang presensya ng nilalaman para sa operasyon ng pagsulat
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Beripikasyon ng kaligtasan ng path
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementasyon base sa mga beripikadong parameter
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementasyon ng tseke sa kaligtasan ng path
    // ...
  }
}
```

### Security Implementation Examples

#### 1. Authentication and Authorization

```java
// Halimbawa ng Java na may pagpapatotoo at awtorisasyon
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Pag-inject ng dependency
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
        // 1. Kunin ang konteksto ng pagpapatotoo
        String authToken = request.getContext().getAuthToken();
        
        // 2. Patotohanan ang gumagamit
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Suriin ang awtorisasyon para sa partikular na operasyon
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Magpatuloy sa awtorisadong operasyon
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

#### 2. Rate Limiting

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

## Testing Best Practices

### 1. Unit Testing MCP Tools

Laging i-test ang iyong mga tool nang hiwalay, gamit ang pag-mock ng mga panlabas na dependency:

```typescript
// Halimbawa ng TypeScript para sa unit test ng isang tool
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Gumawa ng mock na serbisyo ng panahon
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Gumawa ng tool gamit ang mock na dependency
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Ayusin
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Gawin
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Siguraduhin
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Ayusin
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Gawin at Siguraduhin
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integration Testing

I-test ang kumpletong daloy mula sa mga request ng kliyente hanggang sa mga response ng server:

```python
# Halimbawa ng pagsasama ng pagsubok sa Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Simulan ang isang test server
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Gumawa ng kliyente
        client = McpClient("http://localhost:5000")
        
        # Subukan ang pagtuklas ng tool
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Subukan ang pagpapatupad ng tool
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Suriin ang tugon
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Linisin
        await server.stop()
```

## Performance Optimization

### 1. Caching Strategies

Magpatupad ng angkop na caching upang mabawasan ang latency at paggamit ng resource:

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

#### 2. Dependency Injection and Testability

Idisenyo ang mga tool upang tanggapin ang kanilang mga dependency sa pamamagitan ng constructor injection, na ginagawang madali silang i-test at i-configure:

```java
// Halimbawa ng Java na may dependency injection
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Mga dependency na ini-inject sa pamamagitan ng constructor
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implementasyon ng kasangkapan
    // ...
}
```

#### 3. Composable Tools

Idisenyo ang mga tool na maaaring pagsamahin upang lumikha ng mas kumplikadong workflow:

```python
# Halimbawa sa Python na nagpapakita ng mga kasangkapang maaaring pag-ugnayin
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Pagpapatupad...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Ang kasangkapang ito ay maaaring gumamit ng mga resulta mula sa kasangkapang dataFetch
    async def execute_async(self, request):
        # Pagpapatupad...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Ang kasangkapang ito ay maaaring gumamit ng mga resulta mula sa kasangkapang dataAnalysis
    async def execute_async(self, request):
        # Pagpapatupad...
        pass

# Ang mga kasangkapang ito ay maaaring gamitin nang mag-isa o bilang bahagi ng isang workflow
```

### Schema Design Best Practices

Ang schema ang kontrata sa pagitan ng modelo at ng iyong tool. Ang maayos na disenyo ng mga schema ay nagreresulta sa mas mahusay na paggamit ng tool.

#### 1. Clear Parameter Descriptions

Palaging isama ang mga nakapagpapaliwanag na impormasyon para sa bawat parameter:

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

#### 2. Validation Constraints

Isama ang mga limitasyon sa pagpapatunay upang maiwasan ang mga invalid na input:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Katangian ng email na may pag-validate ng format
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Katangian ng edad na may mga numerikong limitasyon
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Katangiang may bilang na pagpipilian
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

#### 3. Consistent Return Structures

Panatilihin ang pagkakapare-pareho sa mga istruktura ng iyong mga tugon upang maging mas madali para sa mga modelo na bigyang-kahulugan ang mga resulta:

```python
async def execute_async(self, request):
    try:
        # Proseso ng kahilingan
        results = await self._search_database(request.parameters["query"])
        
        # Laging ibalik ang pare-parehong istruktura
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

### Error Handling

Mahalaga ang matibay na error handling para mapanatili ang katatagan ng mga MCP tool.

#### 1. Graceful Error Handling

Hawakan ang mga error sa angkop na mga antas at magbigay ng impormatibong mga mensahe:

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

#### 2. Structured Error Responses

Magbalik ng naka-istrukturang impormasyon tungkol sa error kung maaari:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementasyon
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
        
        // Muling itapon ang ibang mga eksepsyon bilang ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Retry Logic

Magpatupad ng angkop na retry logic para sa mga pansamantalang pagkabigo:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # segundo
    
    while retry_count < max_retries:
        try:
            # Tawagan ang panlabas na API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Eksponensiyal na pagtindi ng paghihintay
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Hindi pansamantalang error, huwag subukang muli
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Performance Optimization

#### 1. Caching

Magpatupad ng caching para sa mga mamahaling operasyon:

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

#### 2. Asynchronous Processing

Gamitin ang mga asynchronous programming pattern para sa mga I/O-bound na operasyon:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Para sa mga operasyon na tumatagal, agad na ibalik ang isang processing ID
        String processId = UUID.randomUUID().toString();
        
        // Simulan ang async na pagproseso
        CompletableFuture.runAsync(() -> {
            try {
                // Isagawa ang operasyon na tumatagal
                documentService.processDocument(documentId);
                
                // I-update ang status (karaniwang iniimbak sa isang database)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Ibalik ang agarang tugon na may process ID
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Kasamang kasangkapan para sa pagsuri ng status
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

#### 3. Resource Throttling

Magpatupad ng throttling ng resource upang maiwasan ang labis na load:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Pahintulutan ang 5 kahilingan kada segundo
            bucket_size=10        # Pahintulutan ang mga biglaan hanggang 10 kahilingan
        )
    
    async def execute_async(self, request):
        # Suriin kung maaari na tayong magpatuloy o kailangang maghintay
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Kung masyadong mahaba ang paghihintay
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Maghintay para sa angkop na oras ng pagkaantala
                await asyncio.sleep(delay)
        
        # Gumamit ng isang token at magpatuloy sa kahilingan
        self.rate_limiter.consume()
        
        # Tawagin ang API
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
            
            # Kalkulahin ang oras hanggang sa maging available ang susunod na token
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Magdagdag ng mga bagong token base sa lumipas na oras
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Security Best Practices

#### 1. Input Validation

Laging suriin nang mabuti ang mga input parameter:

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

#### 2. Authorization Checks

Magpatupad ng wastong mga pagsusuri sa authorization:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Kunin ang konteksto ng user mula sa kahilingan
    UserContext user = request.getContext().getUserContext();
    
    // Suriin kung ang user ay may kinakailangang mga pahintulot
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Para sa mga partikular na resources, suriin ang access sa resource na iyon
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Magpatuloy sa pagpapatupad ng tool
    // ...
}
```

#### 3. Sensitive Data Handling

Mag-ingat sa paghawak ng sensitibong data:

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
        
        # Kunin ang datos ng gumagamit
        user_data = await self.user_service.get_user_data(user_id)
        
        # Salain ang mga sensitibong patlang maliban kung tahasang hiningi AT awtorisado
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Suriin ang antas ng awtorisasyon sa konteksto ng kahilingan
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Gumawa ng kopya upang maiwasang baguhin ang orihinal
        redacted = user_data.copy()
        
        # Burahin ang mga partikular na sensitibong patlang
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Burahin ang mga nakapaloob na sensitibong datos
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Testing Best Practices for MCP Tools

Ang komprehensibong testing ay nagsisiguro na ang mga MCP tool ay gumagana nang tama, humahawak ng mga edge case, at maayos na nakikipag-integrate sa natitirang bahagi ng sistema.

### Unit Testing

#### 1. Test Each Tool in Isolation

Gumawa ng mga nakatuong tests para sa functionality ng bawat tool:

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

#### 2. Schema Validation Testing

I-test na ang mga schema ay valid at maayos na nagpapatupad ng mga limitasyon:

```java
@Test
public void testSchemaValidation() {
    // Gumawa ng instance ng tool
    SearchTool searchTool = new SearchTool();
    
    // Kunin ang schema
    Object schema = searchTool.getSchema();
    
    // I-convert ang schema sa JSON para sa beripikasyon
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Suriin kung ang schema ay valid na JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Subukan ang mga wastong parametro
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Subukan ang nawawalang kailangang parametro
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Subukan ang di-wastong uri ng parametro
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Error Handling Tests

Gumawa ng espesipikong mga tests para sa mga kondisyon ng error:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Ayusin
    tool = ApiTool(timeout=0.1)  # Napakaikling timeout
    
    # Mock ng isang kahilingan na magti-timeout
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Mas mahaba kaysa sa timeout
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Gawin at Patunayan
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Suriin ang mensahe ng exception
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Ayusin
    tool = ApiTool()
    
    # Mock ng response na may limitasyong rate
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
        
        # Gawin at Patunayan
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Suriin kung ang exception ay naglalaman ng impormasyon tungkol sa limitasyon ng rate
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integration Testing

#### 1. Tool Chain Testing

I-test ang mga tool na nagtutulungan sa inaasahang mga kombinasyon:

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

#### 2. MCP Server Testing

I-test ang MCP server na may kompletong pagrerehistro at pagpapatupad ng tool:

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
        // Subukan ang discovery endpoint
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Gumawa ng kahilingan para sa tool
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Ipadala ang kahilingan at i-verify ang tugon
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Gumawa ng maling kahilingan para sa tool
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Nawawalang parameter na "b"
        request.put("parameters", parameters);
        
        // Ipadala ang kahilingan at i-verify ang tugon ng error
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-End Testing

I-test ang kumpletong mga workflow mula sa model prompt hanggang tool execution:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Ayusin - I-set up ang MCP client at mock model
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Mock na mga tugon ng modelo
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
    
    # Mock na tugon ng weather tool
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
        
        # Gawin
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Patunayan
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Performance Testing

#### 1. Load Testing

I-test kung gaano karaming sabay-sabay na request ang kayang hawakan ng iyong MCP server:

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

I-test ang sistema sa ilalim ng matinding load:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // I-set up ang JMeter para sa stress testing
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // I-configure ang test plan ng JMeter
    HashTree testPlanTree = new HashTree();
    
    // Gumawa ng test plan, thread group, samplers, atbp.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Magdagdag ng HTTP sampler para sa pagpapatakbo ng tool
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Magdagdag ng mga listener
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Patakbuhin ang test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // I-validate ang mga resulta
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Karaniwang oras ng tugon < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90th percentile < 500ms
}
```

#### 3. Monitoring and Profiling

Mag-setup ng monitoring para sa pang-matagalang pagsusuri ng performance:

```python
# I-configure ang pagmamanman para sa isang MCP server
def configure_monitoring(server):
    # Isaayos ang mga sukatan ng Prometheus
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
    
    # Magdagdag ng middleware para sa pagsukat ng oras at pagre-record ng mga sukatan
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Ipakita ang endpoint ng mga sukatan
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP Workflow Design Patterns

Ang maayos na disenyo ng MCP workflows ay nagpapabuti sa kahusayan, pagiging maaasahan, at pagiging mapanatili. Narito ang mga pangunahing pattern na dapat sundin:

### 1. Chain of Tools Pattern

Ikonekta ang maraming tool sa isang sunud-sunod na pagkakasunod-sunod kung saan ang output ng bawat tool ay nagiging input para sa susunod:

```python
# Implementasyon ng Python Chain of Tools
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Listahan ng mga pangalan ng tool na isasagawa nang sunud-sunod
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Isagawa ang bawat tool sa chain, ipinapasa ang naunang resulta
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # I-imbak ang resulta at gamitin bilang input para sa susunod na tool
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Halimbawa ng paggamit
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

### 2. Dispatcher Pattern

Gumamit ng isang sentral na tool na nagpapadala sa mga espesyal na tool batay sa input:

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

### 3. Parallel Processing Pattern

Isagawa ang maramihang tool nang sabay-sabay para sa kahusayan:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Hakbang 1: Kunin ang metadata ng dataset (synchronous)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Hakbang 2: Ilunsad ang maraming pagsusuri nang sabay-sabay
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
        
        // Maghintay na matapos ang lahat ng mga sabayang gawain
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Maghintay sa pagkumpleto
        
        // Hakbang 3: Pagsamahin ang mga resulta
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Hakbang 4: Gumawa ng buod ng ulat
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Ibalik ang kumpletong resulta ng workflow
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Error Recovery Pattern

Magpatupad ng maayos na fallback para sa mga pagkabigo ng tool:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Subukan muna ang pangunahing kasangkapan
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # I-log ang kabiguan
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Lumipat sa pangalawang kasangkapan
            try:
                # Maaaring kailanganing baguhin ang mga parameter para sa pangalawang kasangkapan
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Parehong nabigo ang mga kasangkapan
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Ang implementasyong ito ay depende sa mga tiyak na kasangkapan
        # Sa halimbawa na ito, ibabalik lang natin ang orihinal na mga parameter
        return params

# Halimbawang paggamit
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Pangunahing (bayad) na weather API
        "basicWeatherService",    # Pangalawang (libreng) weather API
        {"location": location}
    )
```

### 5. Workflow Composition Pattern

Bumuo ng mga kumplikadong workflow sa pamamagitan ng pagsasama ng mga mas simpleng workflow:

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

# Testing MCP Servers: Best Practices and Top Tips

## Overview

Ang testing ay isang mahalagang aspeto ng pag-develop ng maaasahan at mataas na kalidad na MCP servers. Ang gabay na ito ay nagbibigay ng komprehensibong mga best practice at tip para sa pag-test ng iyong MCP servers sa buong lifecycle ng pag-develop, mula sa unit tests hanggang integration tests at end-to-end na pag-validate.

## Why Testing Matters for MCP Servers

Ang mga MCP server ay nagsisilbing kritikal na middleware sa pagitan ng AI models at mga client application. Ang masusing testing ay nagsisiguro ng:

- Pagiging maaasahan sa production environment
- Tumpak na paghawak ng mga request at response
- Wastong implementasyon ng mga espesipikasyon ng MCP
- Tibay laban sa mga pagkabigo at edge case
- Konsistenteng performance sa ilalim ng iba't ibang load

## Unit Testing for MCP Servers

### Unit Testing (Foundation)

Sinusuri ng unit tests ang mga indibidwal na bahagi ng iyong MCP server nang hiwalay.

#### What to Test

1. **Resource Handlers**: I-test nang hiwalay ang lohika ng bawat resource handler
2. **Tool Implementations**: Suriin ang pag-uugali ng tool gamit ang iba't ibang input
3. **Prompt Templates**: Siguruhing tama ang pag-render ng mga prompt template
4. **Schema Validation**: I-test ang lohika sa pagpapatunay ng parameter
5. **Error Handling**: Suriin ang mga tugon sa error para sa mga invalid na input

#### Best Practices for Unit Testing

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
# Halimbawa ng unit test para sa isang calculator tool sa Python
def test_calculator_tool_add():
    # Ayusin
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Gawin
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Patunayan
    assert result["value"] == 12
```

### Integration Testing (Middle Layer)

Sinusuri ng integration tests ang mga interaksyon sa pagitan ng mga bahagi ng iyong MCP server.

#### What to Test

1. **Server Initialization**: I-test ang pagsisimula ng server gamit ang iba't ibang configuration
2. **Route Registration**: Suriin na ang lahat ng endpoint ay maayos na narehistro
3. **Request Processing**: I-test ang buong cycle ng request at response
4. **Error Propagation**: Siguraduhing maayos ang paghawak ng mga error sa buong bahagi
5. **Authentication & Authorization**: I-test ang mga mekanismo ng seguridad

#### Best Practices for Integration Testing

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

### End-to-End Testing (Top Layer)

Sinusuri ng end-to-end tests ang buong pag-uugali ng sistema mula client hanggang server.

#### What to Test

1. **Client-Server Communication**: I-test ang kumpletong cycle ng request at response
2. **Real Client SDKs**: I-test gamit ang totoong mga client implementation
3. **Performance Under Load**: Suriin ang pag-uugali sa maraming sabay-sabay na request
4. **Error Recovery**: I-test ang pagbawi ng sistema mula sa mga pagkabigo
5. **Long-Running Operations**: Suriin ang paghawak ng streaming at mahahabang operasyon

#### Best Practices for E2E Testing

```typescript
// Halimbawang E2E test gamit ang client sa TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Simulan ang server sa test na kapaligiran
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Gawin
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Patunayan
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mocking Strategies for MCP Testing

Mahalaga ang mocking para sa paghihiwalay ng mga bahagi habang nagte-test.

### Components to Mock

1. **External AI Models**: I-mock ang mga tugon ng modelo para sa predictable na testing
2. **External Services**: I-mock ang mga API dependency (mga database, third-party na serbisyo)
3. **Authentication Services**: I-mock ang mga tagapagbigay ng identidad
4. **Resource Providers**: I-mock ang mga mamahaling resource handler

### Example: Mocking an AI Model Response

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
# Halimbawa ng Python gamit ang unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # I-configure ang mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Gamitin ang mock sa pagsusuri
    server = McpServer(model_client=mock_model)
    # Magpatuloy sa pagsusuri
```

## Performance Testing

Mahalaga ang performance testing para sa mga production MCP server.

### What to Measure

1. **Latency**: Oras ng tugon para sa mga request
2. **Throughput**: Bilang ng mga request na na-handle kada segundo
3. **Resource Utilization**: Paggamit ng CPU, memorya, at network
4. **Concurrency Handling**: Pag-uugali sa sabay-sabay na mga request
5. **Scaling Characteristics**: Performance habang tumataas ang load

### Tools for Performance Testing

- **k6**: Open-source load testing tool
- **JMeter**: Komprehensibong performance testing
- **Locust**: Python-based load testing
- **Azure Load Testing**: Cloud-based performance testing

### Example: Basic Load Test with k6

```javascript
// k6 na script para sa pagsubok ng load sa MCP server
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtual na mga gumagamit
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

## Test Automation for MCP Servers

Ang pag-automate ng iyong mga tests ay nagsisiguro ng konsistenteng kalidad at mas mabilis na feedback loops.

### CI/CD Integration

1. **Magpatakbo ng Unit Tests sa Pull Requests**: Tiyaking hindi nasisira ang umiiral na functionality sa mga pagbabago sa code  
2. **Integration Tests sa Staging**: Patakbuhin ang integration tests sa mga pre-production na kapaligiran  
3. **Performance Baselines**: Panatilihin ang mga pamantayan sa performance upang matukoy ang mga regression  
4. **Security Scans**: I-automate ang security testing bilang bahagi ng pipeline  

### Halimbawa ng CI Pipeline (GitHub Actions)  

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
  
## Pagsusuri para sa Pagsunod sa MCP Specification  

Suriin na ang iyong server ay wasto na ipinatupad ang MCP specification.  

### Mga Pangunahing Lugar ng Pagsunod  

1. **API Endpoints**: Subukan ang mga kinakailangang endpoints (/resources, /tools, atbp.)  
2. **Request/Response Format**: Siguraduhing sumusunod sa schema  
3. **Error Codes**: Tiyaking tama ang status codes para sa iba't ibang senaryo  
4. **Content Types**: Subukan ang paghawak sa iba't ibang uri ng content  
5. **Authentication Flow**: Siguraduhin ang mga mekanismong auth ay sumusunod sa spec  

### Compliance Test Suite  

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
  
## Nangungunang 10 mga Tip para sa Epektibong Pagsubok ng MCP Server  

1. **Subukan nang hiwalay ang Mga Kahulugan ng Tool**: I-verify ang mga schema definitions nang hiwalay mula sa tool logic  
2. **Gumamit ng Parameterized Tests**: Subukan ang mga tool gamit ang iba't ibang input, kabilang ang mga edge cases  
3. **Suriin ang Mga Response ng Error**: Siguraduhing tama ang paghawak ng error para sa lahat ng posibleng kondisyon ng error  
4. **Subukan ang Authorization Logic**: Tiyakin ang wastong access control para sa iba't ibang user roles  
5. **Subaybayan ang Test Coverage**: Sikaping makamit ang mataas na coverage ng critical path code  
6. **Subukan ang Streaming Responses**: Siguraduhin ang tamang paghawak ng streaming content  
7. **Gayahin ang Mga Isyu sa Network**: Subukan ang pag-uugali sa panahon ng hindi magandang kondisyon ng network  
8. **Subukan ang Mga Limitasyon sa Resource**: Tiyakin ang pag-uugali kapag naabot ang quotas o rate limits  
9. **I-automate ang Regression Tests**: Bumuo ng suite na tumatakbo sa bawat pagbabago sa code  
10. **Dokumentasyon ng Test Cases**: Panatilihin ang malinaw na dokumentasyon ng mga test scenarios  

## Mga Karaniwang Pagkakamali sa Pagsubok  

- **Sobrang pagtitiwala sa happy path testing**: Siguraduhing masusing sinusubukan ang mga kaso ng error  
- **Pagsawalang-bahala sa performance testing**: Tukuyin ang mga bottleneck bago makaapekto sa production  
- **Pagsubok lamang nang hiwalay**: Pagsamahin ang unit, integration, at E2E tests  
- **Hindi kumpletong coverage ng API**: Siguraduhing nasusubukan ang lahat ng endpoints at features  
- **Hindi magkakatugmang mga test environment**: Gamitin ang mga container para matiyak ang pare-parehong test environment  

## Konklusyon  

Napakahalaga ng isang komprehensibong testing strategy para sa pag-develop ng maaasahan at mataas na kalidad na MCP servers. Sa pamamagitan ng pagpapatupad ng mga pinakamahusay na praktis at mga tip na inilatag sa gabay na ito, masisiguro mong ang iyong MCP implementations ay nakakatugon sa pinakamataas na pamantayan ng kalidad, pagiging maaasahan, at performance.  

## Pangunahing Mga Punto  

1. **Disenyo ng Tool**: Sundin ang single responsibility principle, gamitin ang dependency injection, at magdisenyo para sa composability  
2. **Disenyo ng Schema**: Gumawa ng malinaw at may dokumentasyong mga schema na may angkop na validation constraints  
3. **Paghawak ng Error**: Ipatupad ang maayos na paghawak ng error, istrukturadong mga error response, at retry logic  
4. **Performance**: Gamitin ang caching, asynchronous processing, at resource throttling  
5. **Seguridad**: Mag-apply ng masusing input validation, authorization checks, at paghawak ng sensitibong data  
6. **Pagsubok**: Lumikha ng komprehensibong unit, integration, at end-to-end tests  
7. **Mga Pattern ng Workflow**: Mag-apply ng mga established na pattern tulad ng chains, dispatchers, at parallel processing  

## Ehersisyo  

Magdisenyo ng MCP tool at workflow para sa isang document processing system na:  

1. Tumanggap ng mga dokumento sa iba't ibang format (PDF, DOCX, TXT)  
2. Kunin ang teksto at mahahalagang impormasyon mula sa mga dokumento  
3. Iklasipika ang mga dokumento ayon sa uri at nilalaman  
4. Bumuo ng buod para sa bawat dokumento  

Ipatupad ang mga schema ng tool, paghawak ng error, at isang workflow pattern na pinakaangkop sa senaryong ito. Isaalang-alang kung paano mo susubukan ang implementasyon na ito.  

## Mga Sanggunian  

1. Sumali sa MCP community sa [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) upang manatiling updated sa mga pinakabagong developments  
2. Mag-ambag sa open-source [MCP projects](https://github.com/modelcontextprotocol)  
3. I-apply ang mga prinsipyo ng MCP sa mga inisyatibo ng iyong sariling organisasyon sa AI  
4. Tuklasin ang mga espesyal na implementasyon ng MCP para sa iyong industriya  
5. Isaalang-alang ang pagkuha ng mga advanced na kurso sa mga partikular na paksa ng MCP, tulad ng multi-modal integration o enterprise application integration  
6. Mag-eksperimento sa paggawa ng iyong sariling MCP tools at workflows gamit ang mga prinsipyong natutunan sa [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Ano ang Susunod  

Susunod: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:
Ang dokumentong ito ay isinalin gamit ang AI translation service na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat nagsusumikap kami na maging tumpak, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasaling-tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na maaaring magmula sa paggamit ng pagsasalin na ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->