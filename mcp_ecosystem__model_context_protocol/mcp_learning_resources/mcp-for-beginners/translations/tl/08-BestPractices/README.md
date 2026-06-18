# MCP Development Best Practices

[![MCP Development Best Practices](../../../translated_images/tl/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(I-click ang larawan sa itaas upang mapanood ang video ng araling ito)_

## Overview

Ang araling ito ay nakatuon sa mga advanced na pinakamahusay na gawain para sa pagbuo, pagsubok, at pag-deploy ng mga MCP server at mga tampok sa mga production environment. Habang lumalaki ang kompleksidad at kahalagahan ng mga MCP ecosystem, ang pagsunod sa mga itinatag na pattern ay nagsisiguro ng pagiging maaasahan, madaling mapanatili, at interoperable. Pinagsasama-sama ng araling ito ang praktikal na karunungan mula sa mga totoong implementasyon ng MCP upang gabayan ka sa paglikha ng matibay, mahusay na mga server na may epektibong mga resources, prompts, at mga tool.

## Learning Objectives

Sa pagtatapos ng araling ito, magagawa mong:

- Ipatupad ang mga pinakamahusay na pamantayan sa industriya sa disenyo ng MCP server at tampok
- Gumawa ng komprehensibong mga estratehiya sa pagsubok para sa mga MCP server
- Magdisenyo ng mahusay at magagamit muli na mga workflow pattern para sa komplikadong mga MCP application
- Magpatupad ng tamang paghawak ng error, pag-log, at obserbabilidad sa mga MCP server
- I-optimize ang mga implementasyon ng MCP para sa performance, seguridad, at maintainability

## MCP Core Principles

Bago sumisid sa mga tiyak na praksis sa implementasyon, mahalagang maunawaan ang mga pangunahing prinsipyo na gumagabay sa epektibong pag-develop ng MCP:

1. **Standardized Communication**: Ginagamit ng MCP ang JSON-RPC 2.0 bilang pundasyon nito, na nagbibigay ng pare-parehong format para sa mga request, response, at paghawak ng error sa lahat ng implementasyon.

2. **User-Centric Design**: Laging unahin ang pahintulot, kontrol, at transparency ng user sa iyong mga implementasyon ng MCP.

3. **Security First**: Magpatupad ng matatag na mga hakbang sa seguridad kabilang na ang authentication, authorization, validation, at rate limiting.

4. **Modular Architecture**: Disenyohin ang iyong mga MCP server gamit ang modular na pamamaraan, kung saan bawat tool at resource ay may malinaw at nakatuong layunin.

5. **Stateful Connections**: Gamitin ang kakayahan ng MCP na mapanatili ang estado sa maraming mga request para sa mas magkakaugnay at kontekstong-pansin na mga interaksyon.

## Official MCP Best Practices

Ang mga sumusunod na pinakamahusay na praxis ay hango mula sa opisyal na dokumentasyon ng Model Context Protocol:

### Security Best Practices

1. **User Consent and Control**: Laging humingi ng malinaw na pahintulot ng user bago i-access ang data o magsagawa ng mga operasyon. Magbigay ng malinaw na kontrol kung anong data ang ibinabahagi at anong mga gawain ang pinahihintulutan.

2. **Data Privacy**: Ipakita lamang ang data ng user kapag may malinaw na pahintulot at protektahan ito gamit ang akmang mga access control. Ingatan laban sa hindi awtorisadong transmisyon ng data.

3. **Tool Safety**: Hilingin ang malinaw na pahintulot ng user bago gamitin ang anumang tool. Siguraduhing nauunawaan ng mga user ang functionality ng bawat tool at ipatupad ang matatag na mga hangganan ng seguridad.

4. **Tool Permission Control**: I-configure kung alin sa mga tool ang pinapayagan ng modelo na gamitin sa isang sesyon, tinitiyak na tanging ang mga hayagang pinahintulutang tool lamang ang maa-access.

5. **Authentication**: Hilingin ang tamang authentication bago bigyan ng access sa mga tool, resource, o sensitibong operasyon gamit ang mga API key, OAuth token, o iba pang secure na pamamaraan ng authentication.

6. **Parameter Validation**: Ipatupad ang validation para sa lahat ng pagtawag ng tool upang pigilan ang mala-malawak o malisyosong input na makarating sa implementasyon ng tool.

7. **Rate Limiting**: Magpatupad ng rate limiting upang maiwasan ang abusong paggamit at matiyak ang patas na paggamit ng mga resource ng server.

### Implementation Best Practices

1. **Capability Negotiation**: Sa panahon ng pag-setup ng koneksyon, magpalitan ng impormasyon tungkol sa mga suportadong tampok, bersyon ng protocol, magagamit na mga tool, at mga resource.

2. **Tool Design**: Gumawa ng mga naka-tutok na tool na mahusay sa isang gawain kaysa sa mga monolitikong tool na humahawak ng maraming usapin.

3. **Error Handling**: Magpatupad ng standardized na mga mensahe ng error at mga code upang makatulong sa pag-diagnose ng mga isyu, maayos na paghawak ng mga pagkabigo, at pagbibigay ng kapaki-pakinabang na feedback.

4. **Logging**: I-configure ang mga istrakturadong log para sa auditing, debugging, at pagmomonitor ng mga interaksyon sa protocol.

5. **Progress Tracking**: Para sa mga mahabang operasyon, mag-ulat ng mga update ng progreso upang payagan ang mga responsive na user interface.

6. **Request Cancellation**: Payagan ang mga kliyente na kanselahin ang mga kasalukuyang kahilingang hindi na kailangan o masyadong matagal.

## Additional References

Para sa pinakabagong impormasyon tungkol sa pinakamahusay na mga praksis ng MCP, sumangguni sa:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Mga panganib sa seguridad at mga mitigasyon
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on na pagsasanay sa seguridad

## Practical Implementation Examples

### Tool Design Best Practices

#### 1. Single Responsibility Principle

Dapat ang bawat MCP tool ay may malinaw at nakatutok na layunin. Sa halip na gumawa ng monolitikong mga tool na sumusubok hawakan ang maraming usapin, bumuo ng mga espesyal na tool na mahusay sa partikular na mga gawain.

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

Magpatupad ng matatag na paghawak ng error na may nagbibigay-informasyong mga mensahe ng error at tamang mga mekanismo ng pag-recover.

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
            
            # Pagpapatunay ng seguridad
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operasyon sa database na may timeout
                async with timeout(10):  # 10 segundo ang timeout
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Ang mga error sa koneksyon ay maaaring pansamantala
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Ang mga error sa query ay malamang client errors
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Hayaan ang mga tool-specific na error na dumaan
            raise
        except Exception as e:
            # Pangkalahatang panghuli para sa hindi inaasahang mga error
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Pagpapatupad ng pagtuklas ng SQL injection
        pass
        
    def _log_error(self, message, error):
        # Pagpapatupad ng paglog ng error
        pass
```

#### 3. Parameter Validation

Laging maingat na i-validate ang mga parameter upang maiwasan ang mala-malawak o malisyosong input.

```javascript
// Halimbawa ng JavaScript/TypeScript na may detalyadong beripikasyon ng parameter
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
    
    // Pagpapatupad base sa mga beripikadong parameter
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Pagpapatupad ng pag-check ng kaligtasan ng path
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
    
    // Dependency injection
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
        
        // 2. Patunayan ang gumagamit
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
        
        // 4. Ipatuloy ang awtorisadong operasyon
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

Laging subukin ang iyong mga tool nang hiwalay, gamit ang mocking ng mga panlabas na dependencies:

```typescript
// Halimbawa ng unit test ng tool sa TypeScript
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
    
    // Tiyakin
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Ayusin
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Gawin at tiyakin
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integration Testing

Subukin ang buong daloy mula sa mga kahilingan ng kliyente hanggang sa mga tugon ng server:

```python
# Halimbawa ng pagsasama ng pagsubok sa Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Simulan ang test server
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Gumawa ng client
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
        # Linisin ang mga gamit
        await server.stop()
```

## Performance Optimization

### 1. Caching Strategies

Magpatupad ng angkop na caching upang mabawasan ang latency at paggamit ng mga resource:

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

Disenyohin ang mga tool upang matanggap ang kanilang dependencies sa pamamagitan ng constructor injection, na ginagawa silang easily testable at configurable:

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
    
    // Implementasyon ng tool
    // ...
}
```

#### 3. Composable Tools

Disenyohin ang mga tool na maaaring pagsamahin upang makalikha ng mas kumplikadong mga workflow:

```python
# Halimbawa ng Python na nagpapakita ng mga kasangkapang maaaring pagsamahin
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementasyon...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Maaaring gamitin ng kasangkapang ito ang mga resulta mula sa kasangkapang dataFetch
    async def execute_async(self, request):
        # Implementasyon...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Maaaring gamitin ng kasangkapang ito ang mga resulta mula sa kasangkapang dataAnalysis
    async def execute_async(self, request):
        # Implementasyon...
        pass

# Maaaring gamitin ang mga kasangkapang ito nang mag-isa o bilang bahagi ng isang workflow
```

### Schema Design Best Practices

Ang schema ang kontrata sa pagitan ng modelo at ng iyong tool. Ang mga mahusay na disenyo ng schema ay nagreresulta sa mas mahusay na usability ng tool.

#### 1. Clear Parameter Descriptions

Laging magsama ng naglalarawang impormasyon para sa bawat parameter:

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

Isama ang mga validation constraints upang pigilan ang mga invalid na input:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Katangian ng Email na may pag-validate ng format
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Katangian ng Edad na may mga numerong limitasyon
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Napiling katangian
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

Panatilihin ang consistency sa iyong mga estruktura ng tugon upang mapadali ang pag-intindi ng mga resulta ng mga modelo:

```python
async def execute_async(self, request):
    try:
        # Proseso ng kahilingan
        results = await self._search_database(request.parameters["query"])
        
        # Laging magbalik ng pare-parehong istruktura
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

Mahalaga ang matatag na paghawak ng error para mapanatili ang pagiging maaasahan ng mga MCP tool.

#### 1. Graceful Error Handling

Ihawak ang mga error sa angkop na mga antas at magbigay ng impormatibong mga mensahe:

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

Magbalik ng istrakturadong impormasyon ng error kung maaari:

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
        
        // Muling itapon ang ibang mga eksepsiyon bilang ToolExecutionException
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
                
            # Eksponentiyal na pagbalik
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Hindi pansamantalang error, huwag subukan muli
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Performance Optimization

#### 1. Caching

Magpatupad ng caching para sa mga operasyong mahal:

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

Gumamit ng mga pattern ng asynchronous programming para sa mga operasyon na nakabatay sa I/O:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Para sa mga operasyong tumatagal, agad na ibalik ang isang processing ID
        String processId = UUID.randomUUID().toString();
        
        // Simulan ang async na pagproseso
        CompletableFuture.runAsync(() -> {
            try {
                // Isagawa ang operasyong tumatagal
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
    
    // Kasamang tool para sa pag-check ng status
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

Magpatupad ng pag-throttle sa mga resource upang maiwasan ang sobrang load:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Payagan ang 5 kahilingan bawat segundo
            bucket_size=10        # Payagan ang biglaang pagsabog hanggang 10 kahilingan
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
        
        # Gumamit ng isang token at ipagpatuloy ang kahilingan
        self.rate_limiter.consume()
        
        # Tawagan ang API
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
        
        # Magdagdag ng bagong mga token base sa lumipas na oras
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Security Best Practices

#### 1. Input Validation

Laging suriin nang mabuti ang mga input na parameter:

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

Magpatupad ng tamang pagsusuri sa awtorisasyon:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Kunin ang konteksto ng gumagamit mula sa kahilingan
    UserContext user = request.getContext().getUserContext();
    
    // Suriin kung ang gumagamit ay may kinakailangang mga pahintulot
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

Humawak nang maingat sa sensitibong data:

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
        
        # Kumuha ng datos ng gumagamit
        user_data = await self.user_service.get_user_data(user_id)
        
        # Salain ang mga sensitibong patlang maliban kung hayagang hiniling AT pinahintulutan
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Suriin ang antas ng awtorisasyon sa konteksto ng kahilingan
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Gumawa ng kopya upang maiwasang mabago ang orihinal
        redacted = user_data.copy()
        
        # Itago ang mga partikular na sensitibong patlang
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Itago ang nakapaloob na sensitibong datos
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Testing Best Practices for MCP Tools

Ang komprehensibong pagsubok ay nagsisiguro na ang mga MCP tool ay tamang gumagana, nahahandle ang mga edge case, at tamang nakikipag-integrate sa iba pang bahagi ng sistema.

### Unit Testing

#### 1. Test Each Tool in Isolation

Gumawa ng nakatutok na pagsubok para sa bawat functionality ng tool:

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

Subukin na ang mga schema ay wasto at maayos na pumapatupad ng mga constraints:

```java
@Test
public void testSchemaValidation() {
    // Lumikha ng halimbawa ng tool
    SearchTool searchTool = new SearchTool();
    
    // Kumuha ng schema
    Object schema = searchTool.getSchema();
    
    // I-convert ang schema sa JSON para sa beripikasyon
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // I-beripika kung ang schema ay wastong JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Subukan ang wastong mga parameter
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Subukan ang nawawalang kinakailangang parameter
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Subukan ang di-wastong uri ng parameter
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Error Handling Tests

Gumawa ng mga espesipikong pagsubok para sa mga kondisyon ng error:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Ayusin
    tool = ApiTool(timeout=0.1)  # Napakaikling timeout
    
    # Gawing panlilinlang ang isang kahilingan na mauubos ang oras
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Mas mahaba kaysa timeout
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Gawin at Patunayan
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Suriin ang mensahe ng eksepsyon
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Ayusin
    tool = ApiTool()
    
    # Gawing panlilinlang ang isang tugon na may limitasyon sa rate
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
        
        # Suriin kung ang eksepsyon ay naglalaman ng impormasyon tungkol sa limitasyon ng rate
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integration Testing

#### 1. Tool Chain Testing

Subukin ang mga tool na nagtutulungan sa inaasahang mga kumbinasyon:

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

Subukin ang MCP server na may buong pagrehistro at pagpapatupad ng mga tool:

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
        
        // Ipadala ang kahilingan at suriin ang tugon
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Gumawa ng invalid na kahilingan para sa tool
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Nawawalang parameter na "b"
        request.put("parameters", parameters);
        
        // Ipadala ang kahilingan at suriin ang tugon sa error
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-End Testing

Subukin ang buong workflow mula sa prompt ng modelo hanggang sa pagpapatupad ng tool:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Ayusin - I-set up ang MCP client at i-mock ang modelo
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # I-mock ang mga tugon ng modelo
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
    
    # I-mock ang tugon ng tool sa panahon
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

Subukin kung ilan ang sabay-sabay na kahilingan na kaya ng iyong MCP server:

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

Subukin ang sistema sa ilalim ng matinding load:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // I-set up ang JMeter para sa pagsubok ng stress
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // I-configure ang plano ng pagsubok ng JMeter
    HashTree testPlanTree = new HashTree();
    
    // Gumawa ng plano ng pagsubok, thread group, samplers, atbp.
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
    
    // Magdagdag ng mga tagapakinig
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Patakbuhin ang pagsubok
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // I-validate ang mga resulta
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Karaniwang oras ng tugon < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90th percentile < 500ms
}
```

#### 3. Monitoring and Profiling

Mag-set up ng monitoring para sa pangmatagalang pagsusuri ng performance:

```python
# I-configure ang pagmamanman para sa isang MCP server
def configure_monitoring(server):
    # I-set up ang Prometheus metrics
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
    
    # Magdagdag ng middleware para sa pagtala at pagbabantay ng metrics
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # I-expose ang metrics endpoint
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP Workflow Design Patterns

Ang mga maayos na disenyo ng MCP workflow ay nagpapabuti ng kahusayan, pagiging maaasahan, at kakayahang mapanatili. Narito ang mga mahahalagang pattern na sundin:

### 1. Chain of Tools Pattern

Ikonekta ang maraming tool sa isang sunod-sunod na proseso kung saan ang output ng isang tool ay nagiging input ng susunod:

```python
# Implementasyon ng Chain of Tools sa Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Listahan ng mga pangalan ng tool na isasagawa nang sunud-sunod
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Isagawa ang bawat tool sa chain, ipinapasa ang naunang resulta
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Itago ang resulta at gamitin bilang input para sa susunod na tool
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

Gumamit ng sentral na tool na gumagabay sa mga espesyalisadong tool batay sa input:

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

Isagawa ang maraming tool nang sabay para sa kahusayan:

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
        
        // Maghintay hanggang makumpleto ang lahat ng sabayang gawain
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Maghintay hanggang matapos
        
        // Hakbang 3: Pagsamahin ang mga resulta
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Hakbang 4: Gumawa ng buod na ulat
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

Magpatupad ng mahinahong mga fallback para sa pagkabigo ng mga tool:

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
            # Itala ang pagkabigo
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Lumipat sa pangalawang kasangkapan
            try:
                # Maaaring kailanganin na baguhin ang mga parameter para sa kasangkapang fallback
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
        # Ang pagpapatupad na ito ay naka-depende sa mga tiyak na kasangkapan
        # Para sa halimbawang ito, ibabalik lang namin ang orihinal na mga parameter
        return params

# Halimbawa ng paggamit
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Pangunahing (may bayad) na weather API
        "basicWeatherService",    # Pangalawang (libreng) weather API
        {"location": location}
    )
```

### 5. Workflow Composition Pattern

Buuin ang kumplikadong mga workflow sa pamamagitan ng pagsasama ng mas payak na mga workflow:

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

Ang pagsubok ay isang kritikal na aspeto sa pag-develop ng mga maaasahan at mataas na kalidad na MCP server. Ang gabay na ito ay nagbibigay ng komprehensibong pinakamahusay na prakisis at mga tip para sa pagsubok ng iyong mga MCP server sa buong lifecycle ng pag-develop, mula sa unit test hanggang integration test at end-to-end validation.

## Why Testing Matters for MCP Servers

Ang mga MCP server ay nagsisilbing mahalagang middleware sa pagitan ng mga AI model at mga client application. Ang masusing pagsubok ay nagsisiguro ng:

- Katatagan sa mga production environment
- Tumpak na paghawak ng mga kahilingan at tugon
- Tamang implementasyon ng mga specifikasyon ng MCP
- Tibay laban sa mga pagkabigo at edge cases
- Pare-parehong performance sa ilalim ng iba't ibang mga load

## Unit Testing for MCP Servers

### Unit Testing (Foundation)

Ang mga unit test ay nagvaverify ng bawat indibiduwal na bahagi ng iyong MCP server nang hiwalay.

#### What to Test

1. **Resource Handlers**: Subukin nang hiwalay ang lohika ng bawat resource handler
2. **Tool Implementations**: Beripikahin ang ugali ng tool gamit ang iba't ibang input
3. **Prompt Templates**: Siguraduhing tama ang rendering ng mga prompt template
4. **Schema Validation**: Subukin ang lohika ng validation ng mga parameter
5. **Error Handling**: Beripikahin ang mga tugon sa error para sa mga maling input

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
# Halimbawang unit test para sa isang calculator tool sa Python
def test_calculator_tool_add():
    # Ayusin
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Kumilos
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Patunayan
    assert result["value"] == 12
```

### Integration Testing (Middle Layer)

Sinusuri ng integration test ang mga interaksyon sa pagitan ng mga bahagi ng iyong MCP server.

#### What to Test

1. **Server Initialization**: Subukin ang pagsisimula ng server gamit ang iba't ibang mga configuration
2. **Route Registration**: Siguraduhing lahat ng mga endpoint ay tama ang pagrehistro
3. **Request Processing**: Subukin ang buong cycle ng kahilingan-tugon
4. **Error Propagation**: Siguraduhing maayos ang paghawak ng mga error sa iba't ibang bahagi
5. **Authentication & Authorization**: Subukin ang mga mekanismo ng seguridad

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

Sinusuri ng end-to-end tests ang buong pag-uugali ng sistema mula sa client hanggang sa server.

#### What to Test

1. **Client-Server Communication**: Subukin ang buong cycle ng kahilingan at tugon
2. **Real Client SDKs**: Subukin gamit ang totoong mga implementasyon ng client
3. **Performance Under Load**: Beripikahin ang pag-uugali ng sistema sa maraming sabay-sabay na kahilingan
4. **Error Recovery**: Subukin ang pagbangon ng sistema matapos ang mga pagkabigo
5. **Long-Running Operations**: Siguraduhing maayos ang paghawak sa streaming at mahahabang operasyon

#### Best Practices for E2E Testing

```typescript
// Halimbawang E2E test na may kliyente sa TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Simulan ang server sa test environment
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

Ang mocking ay mahalaga para sa paghiwalay ng mga bahagi sa panahon ng pagsubok.

### Components to Mock

1. **External AI Models**: Gumamit ng mock na tugon ng modelo para sa predictable na pagsubok
2. **External Services**: Mock ang mga API dependency (database, third-party services)
3. **Authentication Services**: Mock ang mga identity provider
4. **Resource Providers**: Mock ang mga mahal na resource handler

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
    
    # Gamitin ang mock sa test
    server = McpServer(model_client=mock_model)
    # Ipagpatuloy ang test
```

## Performance Testing

Mahalaga ang performance testing para sa mga production MCP server.

### What to Measure

1. **Latency**: Oras ng pagtugon para sa mga kahilingan
2. **Throughput**: Bilang ng mga kahilingan na hawak kada segundo
3. **Resource Utilization**: Paggamit ng CPU, memorya, network
4. **Concurrency Handling**: Pag-uugali sa ilalim ng sabay-sabay na mga kahilingan
5. **Scaling Characteristics**: Performance habang tumataas ang load

### Tools for Performance Testing

- **k6**: Open-source na kasangkapan para sa load testing
- **JMeter**: Komprehensibong performance testing
- **Locust**: Load testing na batay sa Python
- **Azure Load Testing**: Cloud-based na performance testing

### Example: Basic Load Test with k6

```javascript
// k6 script para sa load testing ng MCP server
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 virtual na gumagamit
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

Ang automation ng mga pagsubok ay nagsisiguro ng consistent na kalidad at mas mabilis na pagbibigay ng feedback.

### CI/CD Integration

1. **Run Unit Tests on Pull Requests**: Siguraduhing hindi nasisira ang umiiral na functionality sa mga pagbabago ng code
2. **Mga Pagsubok sa Integrasyon sa Staging**: Patakbuhin ang mga pagsubok sa integrasyon sa mga pre-production na kapaligiran  
3. **Mga Baseline ng Performance**: Panatilihin ang mga benchmark ng performance upang mahuli ang mga regression  
4. **Mga Security Scan**: Awtomatikong isagawa ang security testing bilang bahagi ng pipeline  

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

Suriin kung tama ang pagpapatupad ng iyong server sa MCP specification.

### Mga Pangunahing Lugar ng Pagsunod

1. **Mga API Endpoint**: Subukan ang mga kinakailangang endpoints (/resources, /tools, atbp.)  
2. **Format ng Request/Response**: I-validate ang pagsunod sa schema  
3. **Mga Error Code**: Suriin ang tamang status codes para sa iba't ibang mga senaryo  
4. **Mga Uri ng Nilalaman**: Subukan ang paghawak ng iba't ibang uri ng nilalaman  
5. **Daloy ng Authentication**: Suriin ang mga mekanismong auth na sumusunod sa spec  

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
  
## Nangungunang 10 Tips para sa Mabisang Pagsubok ng MCP Server

1. **Subukan ang mga Depinisyon ng Tool nang Hiwa-hiwalay**: Suriin ang mga schema definition nang hiwalay mula sa lohika ng tool  
2. **Gumamit ng Parameterized Tests**: Subukan ang mga tool gamit ang iba’t ibang input, kasama ang mga edge case  
3. **Suriin ang mga Tugon sa Error**: Siguraduhing tama ang paghawak ng error para sa lahat ng posibleng kondisyon ng error  
4. **Subukan ang Lohika ng Awtorisasyon**: Tiyakin ang tamang control sa access para sa iba’t ibang tungkulin ng user  
5. **Subaybayan ang Saklaw ng Pagsubok**: Sikaping mataas ang coverage ng critical path code  
6. **Subukan ang Streaming Responses**: Suriin ang tamang paghawak ng streaming content  
7. **Gayahin ang mga Isyu sa Network**: Subukan ang pag-uugali sa mahina o sirang network  
8. **Subukan ang Mga Limitasyon ng Resource**: Suriin ang pag-uugali kapag naabot ang mga quota o rate limits  
9. **Awtomatikong Pagsubok ng Regression**: Gumawa ng suite na tumatakbo sa bawat pagbabago ng code  
10. **Idokumento ang mga Test Case**: Panatilihin ang malinaw na dokumentasyon ng mga senaryo ng pagsubok  

## Mga Karaniwang Pagkakamali sa Pagsubok

- **Sobrang pagtitiwala sa happy path testing**: Siguraduhing puspusang subukan ang mga kaso ng error  
- **Hindi pagtuon sa performance testing**: Tuklasin ang mga bottleneck bago makaapekto sa production  
- **Pagsubok na nag-iisa lamang**: Pagsamahin ang unit, integration, at E2E tests  
- **Hindi kumpletong coverage ng API**: Siguraduhing nasubukan lahat ng endpoints at features  
- **Hindi consistent na mga kapaligiran sa pagsubok**: Gumamit ng mga container upang matiyak ang consistent na kapaligiran sa pagsubok  

## Konklusyon

Isang komprehensibong stratehiya sa pagsubok ang mahalaga para sa pagbuo ng maaasahan at mataas na kalidad na MCP server. Sa pamamagitan ng pagpapatupad ng pinakamahusay na mga kasanayan at mga tip na nakasaad sa gabay na ito, masisiguro mong matutugunan ng iyong mga implementasyon ng MCP ang pinakamataas na pamantayan ng kalidad, pagiging maaasahan, at performance.  

## Mga Pangunahing Punto

1. **Disenyo ng Tool**: Sundin ang prinsipyo ng single responsibility, gumamit ng dependency injection, at magdisenyo para sa composability  
2. **Disenyo ng Schema**: Gumawa ng malinaw at maayos na dokumentadong mga schema na may tamang mga validation constraint  
3. **Paghawak ng Error**: Magpatupad ng maayos na paghawak ng error, istrakturadong mga tugon sa error, at retry logic  
4. **Performance**: Gumamit ng caching, asynchronous processing, at resource throttling  
5. **Seguridad**: Ipatupad ang masusing input validation, mga tseke sa awtorisasyon, at tamang paghawak ng sensitibong data  
6. **Pagsubok**: Gumawa ng komprehensibong unit, integration, at end-to-end na mga pagsubok  
7. **Mga Pattern sa Workflow**: Ipatupad ang mga kilalang pattern tulad ng chains, dispatchers, at parallel processing  

## Ehersisyo

Magdisenyo ng isang MCP tool at workflow para sa isang sistema ng pagproseso ng dokumento na:

1. Tumanggap ng mga dokumento sa iba’t ibang format (PDF, DOCX, TXT)  
2. Kunin ang teksto at mga pangunahing impormasyon mula sa mga dokumento  
3. Iklasipika ang mga dokumento ayon sa uri at nilalaman  
4. Gumawa ng buod ng bawat dokumento  

Ipapatupad ang mga schema ng tool, paghawak ng error, at isang workflow pattern na pinakaangkop sa senaryong ito. Isaalang-alang kung paano mo susubukan ang implementasyong ito.  

## Mga Resources

1. Sumali sa MCP community sa [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) upang manatiling updated sa mga pinakabagong balita  
2. Mag-ambag sa open-source na [MCP projects](https://github.com/modelcontextprotocol)  
3. Ipatupad ang mga prinsipyo ng MCP sa sariling AI initiatives ng iyong organisasyon  
4. Tuklasin ang mga espesyal na implementasyon ng MCP para sa iyong industriya  
5. Isaalang-alang ang pagkuha ng mga advanced na kurso sa mga partikular na paksa ng MCP, tulad ng multi-modal integration o enterprise application integration  
6. Subukan ang pagbuo ng sarili mong mga MCP tool at workflow gamit ang mga prinsipyong natutunan sa pamamagitan ng [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Ano ang Susunod

Susunod: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->