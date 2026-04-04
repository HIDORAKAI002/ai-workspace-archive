# MCP विकासका उत्कृष्ट अभ्यासहरू

[![MCP Development Best Practices](../../../translated_images/ne/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(यो पाठको भिडियो हेर्न माथि चित्रमा क्लिक गर्नुहोस्)_

## अवलोकन

यस पाठले उत्पादन वातावरणमा MCP सर्भरहरू र सुविधाहरू विकास, परीक्षण, र परिनियोजन गर्नका लागि उन्नत उत्कृष्ट अभ्यासहरूमा ध्यान केन्द्रित गर्छ। MCP पारिस्थितिकी तंत्र जटिलता र महत्त्वमा बढ्दै जाँदा, स्थापित ढाँचाहरूको पालना गर्नाले विश्वसनीयता, मर्मतसम्भार योग्यता, र अन्तरसम्बन्धी सुनिश्चित गर्दछ। यो पाठले वास्तविक विश्वका MCP कार्यान्वयनहरूबाट प्राप्त व्यावहारिक ज्ञानलाई एकत्रित गरी प्रभावकारी स्रोतहरू, प्रॉम्प्टहरू, र उपकरणहरूसँग बलियो तथा कुशल सर्भरहरू सिर्जना गर्न तपाईंलाई मार्गदर्शन गर्दछ।

## सिकाइका उद्देश्यहरू

यस पाठको अन्त्यमा, तपाईं सक्षम हुनुहुनेछ:

- MCP सर्भर र सुविधा डिजाइनमा उद्योगका उत्कृष्ट अभ्यासहरू लागू गर्न
- MCP सर्भरहरूको लागि व्यापक परीक्षण रणनीतिहरू सिर्जना गर्न
- जटिल MCP अनुप्रयोगहरूको लागि कुशल, पुन: प्रयोगयोग्य कार्यप्रवाह ढाँचाहरू डिजाइन गर्न
- MCP सर्भरहरूमा उचित त्रुटि ह्यान्डलिङ, लगिङ, र अवलोकन क्षमता कार्यान्वयन गर्न
- कार्यक्षमता, सुरक्षा, र मर्मतयोग्यतालाई अनुकूलन गर्न MCP कार्यान्वयनहरू

## MCP कोर सिद्धान्तहरू

विशिष्ट कार्यान्वयन अभ्यासहरूमा जानुअघि, प्रभावकारी MCP विकासलाई मार्गदर्शन गर्ने मुख्य सिद्धान्तहरू बुझ्न महत्त्वपूर्ण छ:

1. **मानकीकृत सञ्चार**: MCP ले JSON-RPC 2.0 लाई आफ्नो आधारको रूपमा प्रयोग गर्छ, जुन निरन्तर अनुरोध, प्रतिक्रिया, र त्रुटि ह्यान्डलिङको लागि एक समान ढाँचा प्रदान गर्दछ।

2. **प्रयोगकर्ता-केन्द्रित डिजाइन**: MCP कार्यान्वयनहरूमा सदैव प्रयोगकर्ता सहमति, नियन्त्रण, र पारदर्शितालाई प्राथमिकता दिनुहोस्।

3. **सुरक्षा पहिलो**: प्रमाणिकरण, प्रमाणीकरण, प्रमाणीकरण, र दर सीमांकन सहित मजबूत सुरक्षा उपायहरू कार्यान्वयन गर्नुहोस्।

4. **मोडुलर आर्किटेक्चर**: प्रत्येक उपकरण र स्रोतसँग स्पष्ट, केन्द्रित उद्देश्य हुने गरी MCP सर्भरहरूलाई मोडुलर दृष्टिकोणले डिजाइन गर्नुहोस्।

5. **राज्यवान जडानहरू**: बहु अनुरोधहरूमा अवस्था कायम राख्ने MCP क्षमताको सदुपयोग गरी थप सुसंगत र सन्दर्भ-चेतन अन्तरक्रियाहरू सक्षम पार्नुहोस्।

## आधिकारिक MCP उत्कृष्ट अभ्यासहरू

तलका उत्कृष्ट अभ्यासहरू आधिकारिक मोडेल सन्दर्भ प्रोटोकल कागजातबाट निकालिएका छन्:

### सुरक्षा उत्कृष्ट अभ्यासहरू

1. **प्रयोगकर्ता सहमति र नियन्त्रण**: डाटा पहुँच वा अपरेसनहरू प्रदर्शन गर्नु अघि सदैव स्पष्ट प्रयोगकर्ता सहमति आवश्यक छ। कुन डाटा साझा हुन्छ र कुन क्रियाहरू अधिकृत छन् स्पष्ट नियन्त्रण प्रदान गर्नुहोस्।

2. **डाटा गोपनीयता**: स्पष्ट सहमति बिना प्रयोगकर्ता डाटा मात्र देखाउनुहोस् र उपयुक्त पहुँच नियन्त्रणका साथ सुरक्षा गर्नुहोस्। अनधिकृत डाटा प्रसारणबाट जोगिनुहोस्।

3. **उपकरण सुरक्षा**: कुनै उपकरण चलाउनु अघि स्पष्ट प्रयोगकर्ता सहमति आवश्यक छ। प्रयोगकर्ताहरूलाई प्रत्येक उपकरणको कार्यक्षमता बुझाउनुहोस् र मजबूत सुरक्षा सीमा लागू गर्नुहोस्।

4. **उपकरण अनुमति नियन्त्रण**: एक सत्रको क्रममा मोडललाई कुन उपकरणहरू प्रयोग गर्न अनुमति छ कन्फिगर गर्नुहोस्, जसले मात्र स्पष्ट रूपमा अधिकृत उपकरणहरू पहुँचयोग्य हुन्छन्।

5. **प्रमाणीकरण**: उपकरण, स्रोत, वा संवेदनशील अपरेसनहरूमा पहुँच दिनुअघि API कुञ्जी, OAuth टोकन, वा अन्य सुरक्षित प्रमाणीकरण विधिहरू प्रयोग गरी सही प्रमाणीकरण आवश्यक छ।

6. **प्यारामिटर मान्यकरण**: सबै उपकरण आह्वानहरूको लागि मान्यकरण लागू गरी बिग्रिएको वा दुर्भावनापूर्ण इनपुट उपकरण कार्यान्वयनसम्म पुग्नबाट रोक्नुहोस्।

7. **दर सीमांकन**: दुरुपयोग रोक्न र सर्भर स्रोतहरूको न्यायसंगत प्रयोग सुनिश्चित गर्न दर सीमांकन लागू गर्नुहोस्।

### कार्यान्वयन उत्कृष्ट अभ्यासहरू

1. **क्षमता सम्झौता**: जडान सेटअपको क्रममा समर्थन गरिएको सुविधाहरू, प्रोटोकल भर्सनहरू, उपलब्ध उपकरणहरू र स्रोतहरूको जानकारी विनिमय गर्नुहोस्।

2. **उपकरण डिजाइन**: केन्द्रित उपकरणहरू सिर्जना गर्नुहोस् जुन एक काम राम्रोसँग गर्छन्, बहु चासोहरू हेर्ने एकीकृत उपकरणहरूको सट्टा।

3. **त्रुटि ह्यान्डलिङ**: समस्या पहिचान गर्न, असफलताहरूलाई सहिष्णु पार्न, र क्रियाशील प्रतिक्रिया प्रदान गर्न मानकीकृत त्रुटि सन्देश र कोडहरू लागू गर्नुहोस्।

4. **लगिङ**: प्रोटोकल अन्तरक्रियाहरूको अडिटिङ, डिबगिङ, र अनुगमनको लागि संरचित लगहरू कन्फिगर गर्नुहोस्।

5. **प्रगति ट्र्याकिङ**: लामो समय चल्ने अपरेसनहरूका लागि प्रगति अपडेटहरू प्रतिवेदन गर्नुहोस् जसले प्रतिक्रियाशील प्रयोगकर्ता अन्तरफलक सक्षम पार्छ।

6. **अनुरोध रद्द गर्नु**: ग्राहकहरूले अब आवश्यक नभएको वा धेरै ढिलो भइरहेको इन-फ्लाइट अनुरोधहरू रद्द गर्न अनुमति दिनुहोस्।

## थप सन्दर्भहरू

MCP उत्कृष्ट अभ्यासहरूको सबैभन्दा नयाँ जानकारीका लागि, हेर्नुहोस्:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - सुरक्षा जोखिमहरू र उपशमनहरू
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - व्यावहारिक सुरक्षा प्रशिक्षण

## व्यवहारिक कार्यान्वयन उदाहरणहरू

### उपकरण डिजाइन उत्कृष्ट अभ्यासहरू

#### 1. एकल जिम्मेवारी सिद्धान्त

हरेक MCP उपकरणले स्पष्ट र केन्द्रित उद्देश्य राख्नुपर्छ। बहु चासोहरू ह्यान्डल गर्ने एकीकृत उपकरणहरू निर्माण गर्ने सट्टा, विशिष्ट कार्यहरूमा उत्कृष्टता देखाउने विशेषीकृत उपकरणहरू विकास गर्नुहोस्।

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

#### 2. सुसंगत त्रुटि ह्यान्डलिङ

सूचनात्मक त्रुटि सन्देशहरू र उपयुक्त पुन: प्राप्ति संयन्त्रहरूसहित robust त्रुटि ह्यान्डलिङ कार्यान्वयन गर्नुहोस्।

```python
# व्यापक त्रुटि व्यवस्थापनसहित Python उदाहरण
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # प्यारामिटर प्रमाणीकरण
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # सुरक्षा प्रमाणीकरण
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # समय सीमा सहित डाटाबेस अपरेसन
                async with timeout(10):  # १० सेकेन्ड समय सीमा
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # कनेक्शन त्रुटिहरू अस्थायी हुन सक्छन्
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # प्रश्न त्रुटिहरू सम्भवतः क्लाइन्ट त्रुटिहरू हुन्
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # टुल-विशेष त्रुटिहरूलाई जान दिनुहोस्
            raise
        except Exception as e:
            # अप्रत्याशित त्रुटिहरूको लागि सबै समात्ने
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL इन्जेक्सन पहिचान कार्यान्वयन
        pass
        
    def _log_error(self, message, error):
        # त्रुटि लगिङ कार्यान्वयन
        pass
```

#### 3. प्यारामिटर मान्यकरण

सदैव प्यारामिटरहरू विस्तारपूर्वक मान्य गर्नुहोस् जसले बिग्रिएको वा दुर्भावनापूर्ण इनपुटबाट बचाउछ।

```javascript
// विस्तृत प्यारामिटर प्रमाणीकरण सहितको JavaScript/TypeScript उदाहरण
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
    // १. प्यारामिटर उपस्थितिको प्रमाणीकरण गर्नुहोस्
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // २. प्यारामिटर प्रकारहरूको प्रमाणीकरण गर्नुहोस्
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // ३. प्यारामिटर मानहरूको प्रमाणीकरण गर्नुहोस्
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // ४. लेख्ने अपरेसनका लागि सामग्री उपस्थितिको प्रमाणीकरण गर्नुहोस्
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // ५. पथ सुरक्षा प्रमाणीकरण
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // प्रमाणीकरण गरिएका प्यारामिटरहरूको आधारमा कार्यान्वयन
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // पथ सुरक्षा जाँचको कार्यान्वयन
    // ...
  }
}
```

### सुरक्षा कार्यान्वयन उदाहरणहरू

#### 1. प्रमाणीकरण र प्रमाणीकरण

```java
// प्रमाणिकरण र प्राधिकरण सहितको जाभा उदाहरण
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // निर्भरता इंजेक्शन
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
        // १. प्रमाणिकरण सन्दर्भ निकाल्नुहोस्
        String authToken = request.getContext().getAuthToken();
        
        // २. प्रयोगकर्तालाई प्रमाणित गर्नुहोस्
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // ३. निर्दिष्ट सञ्चालनको लागि प्राधिकरण जाँच गर्नुहोस्
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // ४. प्राधिकृत सञ्चालनसँग अघि बढ्नुहोस्
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

#### 2. दर सीमांकन

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

## परीक्षण उत्कृष्ट अभ्यासहरू

### 1. MCP उपकरणको इकाई परीक्षण

सधैं तपाईंका उपकरणहरूलाई पृथक रूपमा परीक्षण गर्नुहोस्, बाह्य निर्भरतालाई मॉक गर्दै:

```typescript
// उपकरण एकाई परीक्षणको TypeScript उदाहरण
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // एक मॉक मौसम सेवा सिर्जना गर्नुहोस्
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // मॉक डिपेन्डेन्सीसहित उपकरण सिर्जना गर्नुहोस्
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // व्यवस्था गर्नुहोस्
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // क्रिया गर्नुहोस्
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // पुष्टि गर्नुहोस्
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // व्यवस्था गर्नुहोस्
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // क्रिया र पुष्टि गर्नुहोस्
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. एकीकरण परीक्षण

ग्राहक अनुरोधदेखि सर्भर प्रतिक्रियासम्म सम्पूर्ण फ्लो परीक्षण गर्नुहोस्:

```python
# पायथन एकीकरण परीक्षण उदाहरण
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # परीक्षण सर्भर सुरु गर्नुहोस्
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # क्लाइन्ट सिर्जना गर्नुहोस्
        client = McpClient("http://localhost:5000")
        
        # उपकरण पत्ता लगाउने परीक्षण गर्नुहोस्
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # उपकरण कार्यान्वयन परीक्षण गर्नुहोस्
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # प्रतिक्रिया प्रमाणित गर्नुहोस्
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # सफा गर्नुहोस्
        await server.stop()
```

## प्रदर्शन अनुकूलन

### 1. क्याचिङ रणनीतिहरू

ढिलोपन र स्रोत उपयोग कम गर्न उपयुक्त क्याचिङ कार्यान्वयन गर्नुहोस्:

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

#### 2. निर्भरता इन्जेक्सन र परीक्षणयोग्यता

निर्माणकर्ता इन्जेक्सनमार्फत उपकरणहरूलाई तिनीहरूको निर्भरता प्राप्त गर्ने गरी डिजाइन गर्नुहोस्, जसले तिनीहरूलाई परीक्षणयोग्य र कन्फिगरेबल बनाउँछ:

```java
// निर्भरता इन्जेक्शन सहितको जाभा उदाहरण
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // निर्भरता निर्माणकर्ता मार्फत इन्जेक्ट गरिएका छन्
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // उपकरण कार्यान्वयन
    // ...
}
```

#### 3. संयोज्य उपकरणहरू

अधिक जटिल कार्यप्रवाह सिर्जना गर्न सँगै संयोजन गर्न मिल्ने उपकरणहरू डिजाइन गर्नुहोस्:

```python
# कम्पोजेबल उपकरणहरू देखाउने Python उदाहरण
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # कार्यान्वयन...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # यो उपकरण dataFetch उपकरणका नतिजाहरू प्रयोग गर्न सक्छ
    async def execute_async(self, request):
        # कार्यान्वयन...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # यो उपकरण dataAnalysis उपकरणका नतिजाहरू प्रयोग गर्न सक्छ
    async def execute_async(self, request):
        # कार्यान्वयन...
        pass

# यी उपकरणहरू स्वतन्त्र रूपमा वा कार्यप्रवाहको भागको रूपमा प्रयोग गर्न सकिन्छ
```

### स्कीमा डिजाइन उत्कृष्ट अभ्यासहरू

स्कीमा मोडल र तपाईंको उपकरण बीचको करार हो। राम्रो डिजाइन गरिएको स्कीमाले उपकरण प्रयोगयोग्यतालाई सुधार गर्छ।

#### 1. स्पष्ट प्यारामिटर वर्णन

हरेक प्यारामिटरको लागि सधैं विवरणात्मक जानकारी समावेश गर्नुहोस्:

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

#### 2. मान्यकरण प्रतिबन्धहरू

अवैध इनपुट रोक्न मान्यकरण प्रतिबन्धहरू समावेश गर्नुहोस्:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // इमेल सम्पत्ति ढाँचा मान्यता सहित
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // उमेर सम्पत्ति संख्यात्मक सीमाहरू सहित
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // सूचीकृत सम्पत्ति
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

#### 3. सुसंगत रिटर्न संरचनाहरू

नतिजाहरूलाई मोडेलले सजिलै व्याख्या गर्न सँगै आफ्नो प्रतिक्रिया संरचनामा स्थिरता कायम गर्नुहोस्:

```python
async def execute_async(self, request):
    try:
        # अनुरोध प्रक्रियागत गर्नुहोस्
        results = await self._search_database(request.parameters["query"])
        
        # सधैं निरन्तर संरचना फर्काउनुहोस्
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

### त्रुटि ह्यान्डलिङ

विश्वसनीयताका लागि MCP उपकरणहरूको robuste त्रुटि ह्यान्डलिङ अत्यंत महत्वपूर्ण छ।

#### 1. सहनशील त्रुटि ह्यान्डलिङ

उपयुक्त स्तरहरूमा त्रुटिहरू ह्यान्डल गर्नुहोस् र सूचना दिने सन्देशहरू प्रदान गर्नुहोस्:

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

#### 2. संरचित त्रुटि प्रतिक्रिया

संभव भएमा संरचित त्रुटि जानकारी फर्काउनुहोस्:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // कार्यान्वयन
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
        
        // अन्य अपवादहरूलाई फेरि ToolExecutionException को रूपमा फ्याँक्नुहोस्
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. पुन: प्रयास तर्क

क्षणिक असफलताका लागि उपयुक्त पुन: प्रयास तर्क कार्यान्वयन गर्नुहोस्:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # सेकेन्डहरू
    
    while retry_count < max_retries:
        try:
            # बाह्य API कल गर्नुहोस्
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # घातीय ब्याकअफ
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # अस्थायी त्रुटि होइन, पुन: प्रयास नगर्नुहोस्
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### प्रदर्शन अनुकूलन

#### 1. क्याचिङ

महँगो अपरेसनहरूको लागि क्याचिङ लागू गर्नुहोस्:

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

#### 2. अप्रतिक्षित प्रशोधन

I/O-आधारित अपरेसनहरूको लागि अप्रतिक्षित प्रोग्रामिङ ढाँचाहरू प्रयोग गर्नुहोस्:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // लामो समयसम्म चल्ने अपरेसनहरूका लागि, तुरुन्तै प्रोसेसिङ ID फिर्ता गर्नुहोस्
        String processId = UUID.randomUUID().toString();
        
        // असिंक प्रोसेसिङ सुरु गर्नुहोस्
        CompletableFuture.runAsync(() -> {
            try {
                // लामो समयसम्म चल्ने अपरेसन गर्नुहोस्
                documentService.processDocument(documentId);
                
                // स्थिति अपडेट गर्नुहोस् (सामान्यतया डेटाबेसमा राखिने)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // प्रोसेस ID सहित तुरुन्त प्रतिक्रिया फिर्ता गर्नुहोस्
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // सहायक स्थिति जाँच उपकरण
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

#### 3. स्रोत थ्रॉटलिङ

अतिभार रोक्न स्रोत थ्रॉटलिङ लागू गर्नुहोस्:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # प्रति सेकेन्ड ५ अनुरोधहरू अनुमति दिनुहोस्
            bucket_size=10        # १० अनुरोधहरू सम्म उछालहरू अनुमति दिनुहोस्
        )
    
    async def execute_async(self, request):
        # हामी जारी राख्न सक्छौं कि प्रतीक्षा गर्न आवश्यक छ जाँच गर्नुहोस्
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # यदि प्रतीक्षा धेरै लामो छ
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # उपयुक्त ढिलाइ समयको लागि प्रतीक्षा गर्नुहोस्
                await asyncio.sleep(delay)
        
        # एउटा टोकन प्रयोग गरी अनुरोधसँग अगाडि बढ्नुहोस्
        self.rate_limiter.consume()
        
        # API कल गर्नुहोस्
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
            
            # अर्को टोकन उपलब्ध हुनुपर्ने समय गणना गर्नुहोस्
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # बितेको समयको आधारमा नयाँ टोकनहरू थप्नुहोस्
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### सुरक्षा उत्कृष्ट अभ्यासहरू

#### 1. इनपुट मान्यकरण

सधैं इनपुट प्यारामिटरहरू पूर्ण रूपमा मान्य गर्नुहोस्:

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

#### 2. प्रमाणीकरण चेकहरू

उचित प्रमाणीकरण चेकहरू लागू गर्नुहोस्:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // अनुरोधबाट उपयोगकर्ता सन्दर्भ प्राप्त गर्नुहोस्
    UserContext user = request.getContext().getUserContext();
    
    // उपयोगकर्तासँग आवश्यक अनुमति छ कि छैन जाँच गर्नुहोस्
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // विशिष्ट स्रोतहरूको लागि, सो स्रोतमा पहुँच छ कि छैन जाँच गर्नुहोस्
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // उपकरण कार्यान्वयन जारी राख्नुहोस्
    // ...
}
```

#### 3. संवेदनशील डाटा ह्यान्डलिङ

संवेदनशील डाटालाई सावधानीपूर्वक ह्यान्डल गर्नुहोस्:

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
        
        # प्रयोगकर्ता डेटा प्राप्त गर्नुहोस्
        user_data = await self.user_service.get_user_data(user_id)
        
        # संवेदनशील क्षेत्रहरूलाई फिल्टर गर्नुहोस् जबसम्म स्पष्ट रूपमा अनुरोध गरिँदैन र अनुमति दिइएको छैन
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # अनुरोध सन्दर्भमा अनुमति स्तर जाँच गर्नुहोस्
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # मूललाई परिवर्तन नगर्नको लागि प्रतिलिपि बनाउनुहोस्
        redacted = user_data.copy()
        
        # विशिष्ट संवेदनशील क्षेत्रहरूलाई रिड्याक्ट गर्नुहोस्
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # जटिल संवेदनशील डाटालाई रिड्याक्ट गर्नुहोस्
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP उपकरणहरूको लागि परीक्षण उत्कृष्ट अभ्यासहरू

व्यापक परीक्षणले सुनिश्चित गर्छ कि MCP उपकरणहरू ठीकसँग काम गर्छन्, किनारा केसहरू ह्यान्डल गर्छन्, र प्रणालीको बाँकी भागसँग सही रूपमा एकीकरण हुन्छन्।

### इकाई परीक्षण

#### 1. प्रत्येक उपकरणलाई पृथक रूपमा परीक्षण गर्नुहोस्

हरेक उपकरणको कार्यक्षमताको लागि केन्द्रित परीक्षणहरू सिर्जना गर्नुहोस्:

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

#### 2. स्कीमा मान्यकरण परीक्षण

स्कीमाहरू वैध छन् र प्रतिबन्धहरू सहि तरिकाले लागू गर्छन् भनी परीक्षण गर्नुहोस्:

```java
@Test
public void testSchemaValidation() {
    // उपकरण उदाहरण सिर्जना गर्नुहोस्
    SearchTool searchTool = new SearchTool();
    
    // स्कीमा प्राप्त गर्नुहोस्
    Object schema = searchTool.getSchema();
    
    // प्रमाणीकरणका लागि स्कीमालाई JSON मा रूपान्तरण गर्नुहोस्
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // स्कीमा मान्य JSONSchema हो कि छैन जाँच गर्नुहोस्
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // मान्य प्यारामिटरहरू परीक्षण गर्नुहोस्
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // आवश्यक प्यारामिटर हराएको परीक्षण गर्नुहोस्
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // अवैध प्यारामिटर प्रकार परीक्षण गर्नुहोस्
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. त्रुटि ह्यान्डलिङ परीक्षणहरू

त्रुटि अवस्थाहरूका लागि विशेष परीक्षणहरू सिर्जना गर्नुहोस्:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # मिलाउनुहोस्
    tool = ApiTool(timeout=0.1)  # धेरै छोटो टाइमआउट
    
    # टाइमआउट हुने अनुरोधलाई नक्कल गर्नुहोस्
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # टाइमआउट भन्दा लामो
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # कार्य गर्नुहोस् र प्रमाणित गर्नुहोस्
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवाद सन्देशको जाँच गर्नुहोस्
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # मिलाउनुहोस्
    tool = ApiTool()
    
    # दर-सीमित प्रतिक्रिया नक्कल गर्नुहोस्
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
        
        # कार्य गर्नुहोस् र प्रमाणित गर्नुहोस्
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवादमा दर सीमा जानकारी छ कि छैन जाँच गर्नुहोस्
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### एकीकरण परीक्षण

#### 1. उपकरण श्रृंखला परीक्षण

अपेक्षित संयोजनहरूमा सँगै काम गर्ने उपकरणहरू परीक्षण गर्नुहोस्:

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

#### 2. MCP सर्भर परीक्षण

पूर्ण उपकरण दर्ता र कार्यान्वयन सहित MCP सर्भर परीक्षण गर्नुहोस्:

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
        // डिस्कभरी इन्डपोइन्ट परिक्षण गर्नुहोस्
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // टुल अनुरोध सिर्जना गर्नुहोस्
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // अनुरोध पठाउनुहोस् र प्रतिक्रिया पुष्टि गर्नुहोस्
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // अमान्य टुल अनुरोध सिर्जना गर्नुहोस्
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" प्यारामिटर हराइरहेको छ
        request.put("parameters", parameters);
        
        // अनुरोध पठाउनुहोस् र त्रुटि प्रतिक्रिया पुष्टि गर्नुहोस्
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. अन्त्य-देखि-अन्त्य परीक्षण

मोडेल प्रॉम्प्टदेखि उपकरण कार्यान्वयनसम्म सम्पूर्ण कार्यप्रवाहहरू परीक्षण गर्नुहोस्:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # व्यवस्था गर्नुहोस् - MCP क्लाइन्ट र मक्स मोडेल सेट अप गर्नुहोस्
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # मक्स मोडेल प्रतिक्रियाहरू
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
    
    # मक्स मौसम उपकरण प्रतिक्रिया
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
        
        # क्रिया गर्नुहोस्
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # पुष्टि गर्नुहोस्
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### प्रदर्शन परीक्षण

#### 1. लोड परीक्षण

तपाईंको MCP सर्भरले कति समकक्ष अनुरोधहरू ह्यान्डल गर्न सक्छ परीक्षण गर्नुहोस्:

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

#### 2. तनाव परीक्षण

अत्यधिक लोड अन्तर्गत प्रणाली परीक्षण गर्नुहोस्:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // तनाव परीक्षणका लागि JMeter सेट अप गर्नुहोस्
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter परीक्षण योजना कन्फिगर गर्नुहोस्
    HashTree testPlanTree = new HashTree();
    
    // परीक्षण योजना, थ्रेड समूह, स्याम्पलरहरू आदि सिर्जना गर्नुहोस्
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // उपकरण कार्यान्वयनको लागि HTTP स्याम्पलर थप्नुहोस्
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // सुन्नेहरू थप्नुहोस्
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // परीक्षण चलाउनुहोस्
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // परिणामहरू प्रमाणित गर्नुहोस्
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // औसत प्रतिक्रिया समय < २००ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // ९० औं प्रतिशताइल < ५००ms
}
```

#### 3. अनुगमन र प्रोफाइलिङ

दीर्घकालीन प्रदर्शन विश्लेषणका लागि अनुगमन सेटअप गर्नुहोस्:

```python
# MCP सर्भरको लागि निगरानी कन्फिगर गर्नुहोस्
def configure_monitoring(server):
    # Prometheus मेट्रिक्स सेट अप गर्नुहोस्
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
    
    # टाइमिंग र मेट्रिक्स रेकर्ड गर्न मिडलवेयर थप्नुहोस्
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # मेट्रिक्स इन्डपोइन्ट एक्स्पोज गर्नुहोस्
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP कार्यप्रवाह डिजाइन ढाँचाहरू

राम्रो डिजाइन गरिएको MCP कार्यप्रवाहहरूले कार्यक्षमता, विश्वसनीयता, र मर्मतयोग्यतालाई सुधार गर्छ। यहाँ पालना गर्नुपर्ने मुख्य ढाँचाहरू छन्:

### 1. उपकरणहरूको श्रृंखला ढाँचा

अनेक उपकरणहरूलाई यस्तो अनुक्रममा जडान गर्नुहोस् जहाँ प्रत्येक उपकरणको आउटपुट अर्को इनपुट हुन्छ:

```python
# Python चेन अफ टूल्स कार्यान्वयन
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # अनुक्रममा सञ्चालन गर्न टूल नामहरूको सूची
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # चेनमा प्रत्येक टूल सञ्चालन गर्नुहोस्, अघिल्लो परिणाम पास गर्दै
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # परिणाम स्टोर गर्नुहोस् र अर्को टूलको इनपुटको रूपमा प्रयोग गर्नुहोस्
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# उदाहरण प्रयोग
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

### 2. डिस्प्याचर ढाँचा

केन्द्रीय उपकरण प्रयोग गर्नुहोस् जुन इनपुटको आधारमा विशेष उपकरणहरूमा प्रेषित गर्छ:

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

### 3. समान्तर प्रशोधन ढाँचा

कुशलताको लागि एकैसाथ धेरै उपकरणहरू कार्यान्वयन गर्नुहोस्:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // चरण १: डेटासेट मेटाडेटा फेच गर्नुहोस् (समक्रमिक)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // चरण २: धेरै विश्लेषणहरू समांतर रूपमा सुरु गर्नुहोस्
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
        
        // सबै समांतर कार्यहरू पूरा हुनेसम्म पर्खनुहोस्
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // पूरा हुने प्रतिक्षा गर्नुहोस्
        
        // चरण ३: परिणामहरू संयोजन गर्नुहोस्
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // चरण ४: सारांश रिपोर्ट तयार गर्नुहोस्
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // पूर्ण कार्यप्रवाह परिणाम फर्काउनुहोस्
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. त्रुटि पुन: प्राप्ति ढाँचा

उपकरण असफलताहरूका लागि सहनशील फालब्याकहरू कार्यान्वयन गर्नुहोस्:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # पहिलो प्राथमिक उपकरण प्रयास गर्नुहोस्
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # असफलता लग इन गर्नुहोस्
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # दोस्रो उपकरण प्रयोग गर्नुहोस्
            try:
                # फallback उपकरणका लागि प्यारामिटरहरू रूपान्तरण गर्न आवश्यक पर्न सक्छ
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # दुवै उपकरण असफल भए
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # यो कार्यान्वयन विशिष्ट उपकरणहरूमा निर्भर हुनेछ
        # यस उदाहरणका लागि, हामी मूल प्यारामिटरहरू फिर्ता गर्नेछौं
        return params

# उदाहरण प्रयोग
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # प्राथमिक (भुक्तानी गरिएको) मौसम API
        "basicWeatherService",    # फallback (निःशुल्क) मौसम API
        {"location": location}
    )
```

### 5. कार्यप्रवाह संयोजन ढाँचा

सरल कार्यप्रवाहहरू संयोजन गरेर जटिल कार्यप्रवाहहरू बनाउनुहोस्:

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

# MCP सर्भरहरू परीक्षण: उत्कृष्ट अभ्यास र शीर्ष सुझावहरू

## अवलोकन

परीक्षण विश्वसनीय, उच्च-गुणस्तर MCP सर्भरहरू विकास गर्ने महत्वपूर्ण पक्ष हो। यो मार्गदर्शिकाले तपाईंका MCP सर्भरहरू विकास जीवनचक्रभरि इकाई परीक्षणदेखि एकीकरण परीक्षण र अन्त्य-देखि-अन्त्य मान्यकरणसम्मका व्यापक उत्कृष्ट अभ्यास र सुझावहरू प्रदान गर्दछ।

## MCP सर्भरहरूको लागि परीक्षण किन महत्त्वपूर्ण छ

MCP सर्भरहरू AI मोडल र ग्राहक अनुप्रयोगहरू बीच महत्वपूर्ण मध्यस्थकर्ताका रूपमा काम गर्छन्। thorough परीक्षण सुनिश्चित गर्दछ:

- उत्पादन वातावरणमा विश्वसनीयता
- अनुरोध र प्रतिक्रिया सही ह्यान्डलिङ
- MCP विशिष्टताहरूको उचित कार्यान्वयन
- असफलता र किनारा केसहरूको विरुद्ध लचिलोपन
- विभिन्न लोड अन्तर्गत सुसंगत प्रदर्शन

## MCP सर्भरहरूको इकाई परीक्षण

### इकाई परीक्षण (आधार)

इकाई परीक्षणहरूले तपाईंको MCP सर्भरका व्यक्तिगत कम्पोनेन्टहरूलाई पृथक रूपमा प्रमाणित गर्छन्।

#### के परीक्षण गर्ने

1. **स्रोत ह्यान्डलरहरू**: प्रत्येक स्रोत ह्यान्डलरको तर्क स्वतन्त्र रूपमा परीक्षण गर्नुहोस्
2. **उपकरण कार्यान्वयनहरू**: विभिन्न इनपुटहरूसँग उपकरण व्यवहार सत्यापित गर्नुहोस्
3. **प्रॉम्प्ट टेम्पलेटहरू**: प्रॉम्प्ट टेम्पलेटहरू सहि तरिकाले र render हुन्छन् भन्ने सुनिश्चित गर्नुहोस्
4. **स्कीमा मान्यकरण**: प्यारामिटर मान्यकरण तर्क परीक्षण गर्नुहोस्
5. **त्रुटि ह्यान्डलिङ**: अमान्य इनपुटहरूको लागि त्रुटि प्रतिक्रिया पुष्टि गर्नुहोस्

#### इकाई परीक्षणका लागि उत्कृष्ट अभ्यासहरू

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
# Python मा क्याल्कुलेटर उपकरणको लागि उदाहरण एकाई परीक्षण
def test_calculator_tool_add():
    # व्यवस्था गर्नुहोस्
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # कार्य गर्नुहोस्
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # पुष्टि गर्नुहोस्
    assert result["value"] == 12
```

### एकीकरण परीक्षण (मध्य तह)

एकीकरण परीक्षणहरूले तपाईंको MCP सर्भरका कम्पोनेन्टहरू बीच अन्तरक्रियाहरू प्रमाणित गर्छन्।

#### के परीक्षण गर्ने

1. **सर्भर सुरु गर्नु**: विभिन्न कन्फिगरेसनहरूसँग सर्भर सुरु परीक्षण गर्नुहोस्
2. **रुट दर्ता**: सबै अन्त बिन्दुहरू सही रूपमा दर्ता गरिएको सुनिश्चित गर्नुहोस्
3. **अनुरोध प्रशोधन**: पूर्ण अनुरोध-प्रतिक्रिया चक्र परीक्षण गर्नुहोस्
4. **त्रुटि प्रसारण**: त्रुटिहरू कम्पोनेन्टहरूमा सही रुपमा ह्यान्डल हुन्छन् भनी सुनिश्चित गर्नुहोस्
5. **प्रमाणीकरण र प्रमाणीकरण**: सुरक्षा प्रणालीहरू परीक्षण गर्नुहोस्

#### एकीकरण परीक्षणका लागि उत्कृष्ट अभ्यासहरू

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

### अन्त्य-देखि-अन्त्य परीक्षण (शीर्ष तह)

अन्त्य-देखि-अन्त्य परीक्षणहरूले ग्राहकदेखि सर्भर सम्मको पूर्ण प्रणाली व्यवहार प्रमाणित गर्छन्।

#### के परीक्षण गर्ने

1. **ग्राहक-सर्भर सञ्चार**: पूर्ण अनुरोध-प्रतिक्रिया चक्रहरू परीक्षण गर्नुहोस्
2. **वास्तविक ग्राहक SDKs**: वास्तविक ग्राहक कार्यान्वयनहरूसँग परीक्षण गर्नुहोस्
3. **लोड अन्तर्गत प्रदर्शन**: बहुगुण concurrent अनुरोधहरूसँग व्यवहार जाँच गर्नुहोस्
4. **त्रुटि पुन: प्राप्ति**: असफलताबाट प्रणाली पुन: प्राप्ति परीक्षण गर्नुहोस्
5. **लामो समय चल्ने अपरेसनहरू**: स्ट्रिमिङ र लामो अपरेसनहरूको ह्यान्डलिङ पुष्टि गर्नुहोस्

#### E2E परीक्षणका लागि उत्कृष्ट अभ्यासहरू

```typescript
// TypeScript मा क्लाइन्टसँग उदाहरण E2E परीक्षण
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // टेस्ट वातावरणमा सर्भर सुरू गर्नुहोस्
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // क्रिया गर्नुहोस्
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // सुनिश्चित गर्नुहोस्
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP परीक्षणका लागि मॉकिङ रणनीतिहरू

मॉकिङ परीक्षणको क्रममा कम्पोनेन्टहरूलाई पृथक गर्न आवश्यक छ।

### मॉक गर्नुपर्ने कम्पोनेन्टहरू

1. **बाह्य AI मोडलहरू**: पूर्वानुमेय परीक्षणका लागि मोडल प्रतिक्रियाहरू मॉक गर्नुहोस्
2. **बाह्य सेवा**: API निर्भरतालाई मॉक गर्नुहोस् (डाटाबेस, तेस्रो-पक्ष सेवा)
3. **प्रमाणीकरण सेवा**: पहिचान प्रदायकहरू मॉक गर्नुहोस्
4. **स्रोत प्रदायकहरू**: महँगो स्रोत ह्यान्डलरहरू मॉक गर्नुहोस्

### उदाहरण: AI मोडल प्रतिक्रिया मॉकिङ

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
# unittest.mock सहित Python उदाहरण
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # mock कन्फिगर गर्नुहोस्
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # परीक्षणमा mock प्रयोग गर्नुहोस्
    server = McpServer(model_client=mock_model)
    # परीक्षण जारी राख्नुहोस्
```

## प्रदर्शन परीक्षण

प्रदर्शन परीक्षण उत्पादन MCP सर्भरहरूको लागि अत्यावश्यक छ।

### के मापन गर्ने

1. **ढिलाइ**: अनुरोधहरूको प्रतिक्रिया समय
2. **थ्रूपुट**: प्रति सेकेन्ड ह्यान्डल गरिएका अनुरोधहरू
3. **स्रोत उपयोग**: CPU, मेमोरी, नेटवर्क प्रयोग
4. **समकक्ष ह्यान्डलिङ**: समान्तर अनुरोधहरूमा व्यवहार
5. **स्केलिङ विशेषताहरू**: लोड बढ्दा प्रदर्शन

### प्रदर्शन परीक्षणका उपकरणहरू

- **k6**: खुला स्रोत लोड परीक्षण उपकरण
- **JMeter**: व्यापक प्रदर्शन परीक्षण
- **Locust**: प्याथन आधारित लोड परीक्षण
- **Azure Load Testing**: क्लाउड आधारित प्रदर्शन परीक्षण

### उदाहरण: k6 सँग आधारभूत लोड परीक्षण

```javascript
// MCP सर्भरको लोड परीक्षणका लागि k6 स्क्रिप्ट
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // १० भर्चुअल प्रयोगकर्ताहरू
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

## MCP सर्भरहरूको लागि परीक्षण स्वचालन

तपाईंका परीक्षणहरू स्वचालित बनाउँदा सुसंगत गुणस्तर र छिटो प्रतिक्रिया चक्र सुनिश्चित हुन्छ।

### CI/CD एकीकरण
1. **पुल रिक्वेस्टहरूमा युनिट परीक्षण चलाउनुहोस्**: कोड परिवर्तनहरूले हुने वर्तमान कार्यक्षमता नटुटोस् भनेर सुनिश्चित गर्नुहोस्  
2. **स्टेजिङमा एकिकरण परीक्षणहरू**: प्रि-प्रोडक्सन वातावरणहरूमा एकिकरण परीक्षणहरू चलाउनुहोस्  
3. **प्रदर्शन आधाररेखा**: प्रतिगमनहरू पत्ता लगाउन प्रदर्शन मापदण्डहरू कायम राख्नुहोस्  
4. **सुरक्षा स्क्यान**: पाइपलाइनको भागको रूपमा सुरक्षा परीक्षण स्वचालित गर्नुहोस्  

### उदाहरण CI पाइपलाइन (GitHub Actions)

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
  
## MCP विशिष्टताको साथ अनुपालनको लागि परीक्षण

तपाईंको सर्भरले सही रूपमा MCP विशिष्टता लागू गरेको छ कि छैन भनेर सत्यापन गर्नुहोस्।  

### प्रमुख अनुपालन क्षेत्रहरू

1. **API अन्तबिन्दुहरू**: आवश्यक अन्तबिन्दुहरू (/resources, /tools, आदि) परीक्षण गर्नुहोस्  
2. **अनुरोध/प्रतिक्रिया ढाँचा**: स्किमाको अनुपालन मान्य गर्नुहोस्  
3. **त्रुटि कोडहरू**: विभिन्न परिदृश्यहरूका लागि सही स्थिति कोडहरू प्रमाणित गर्नुहोस्  
4. **सामग्री प्रकारहरू**: विभिन्न सामग्री प्रकारहरूको ह्यान्डलिंग परीक्षण गर्नुहोस्  
5. **प्रमाणीकरण प्रक्रिया**: विशिष्टता-अनुपालन प्रमाणीकरण मेकानिज्महरू प्रमाणित गर्नुहोस्  

### अनुपालन परीक्षण सेट

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
  
## प्रभावकारी MCP सर्भर परीक्षणका लागि शीर्ष १० सुझावहरू

1. **टुल परिभाषाहरू अलग्गै परीक्षण गर्नुहोस्**: टुलको तर्कबाट स्वतन्त्र रूपमा स्किमा परिभाषाहरू प्रमाणित गर्नुहोस्  
2. **परिमाणित परीक्षणहरू प्रयोग गर्नुहोस्**: विभिन्न इनपुटहरू, जसमा एज केसहरू पनि छन्, सहित टुलहरू परीक्षण गर्नुहोस्  
3. **त्रुटि प्रतिक्रियाहरू जाँच गर्नुहोस्**: सबै सम्भावित त्रुटि अवस्थाहरूका लागि उचित त्रुटि ह्यान्डलिंग प्रमाणित गर्नुहोस्  
4. **प्राधिकरण तर्क परीक्षण गर्नुहोस्**: फरक प्रयोगकर्ता भूमिकाहरूका लागि उचित पहुँच नियन्त्रण सुनिश्चित गर्नुहोस्  
5. **परीक्षण कभरेज निगरानी गर्नुहोस्**: महत्वपूर्ण पथ कोडको उच्च कभरेज लक्ष्य राख्नुहोस्  
6. **स्ट्रिमिङ प्रतिक्रिया परीक्षण गर्नुहोस्**: स्ट्रिमिङ सामग्रीको उचित ह्यान्डलिंग प्रमाणित गर्नुहोस्  
7. **नेटवर्क समस्या नक्कल गर्नुहोस्**: कमजोर नेटवर्क अवस्थाहरूमा व्यवहार परीक्षण गर्नुहोस्  
8. **स्रोत सीमाहरू परीक्षण गर्नुहोस्**: कोटा वा दर सीमाहरू पुगेको अवस्थामा व्यवहार प्रमाणित गर्नुहोस्  
9. **प्रतिगमन परीक्षण स्वचालित गर्नुहोस्**: प्रत्येक कोड परिवर्तनमा चल्ने सेट तयार गर्नुहोस्  
10. **परीक्षण केसहरू दस्तावेज गर्नुहोस्**: परीक्षण परिदृश्यहरूको स्पष्ट दस्तावेजीकरण कायम राख्नुहोस्  

## सामान्य परीक्षण दोषहरू

- **खुसी मार्ग परीक्षणमा अत्यधिक निर्भरता**: त्रुटि केसहरू राम्ररी परीक्षण गर्न सुनिश्चित गर्नुहोस्  
- **प्रदर्शन परीक्षणलाई बेवास्ता गर्नु**: उत्पादनमा असर पर्नुअघि बाधाहरू पत्ता लगाउनुहोस्  
- **केवल पृथक रूपमा परीक्षण गर्नु**: युनिट, एकिकरण, र E2E परीक्षणहरू संयोजन गर्नुहोस्  
- **अधूरो API कभरेज**: सबै अन्तबिन्दुहरू र सुविधाहरू परीक्षण हुनु आवश्यक छ  
- **असंगत परीक्षण वातावरणहरू**: लगातार परीक्षण वातावरण सुनिश्चित गर्न कन्टेनरहरू प्रयोग गर्नुहोस्  

## निष्कर्ष

विश्वसनीय, उच्च-गुणस्तर MCP सर्भरहरू विकास गर्न व्यापक परीक्षण रणनीति आवश्यक छ। यस मार्गदर्शनमा उल्लिखित उत्तम अभ्यास र सुझावहरू लागू गरेर, तपाईंको MCP कार्यान्वयनहरूले उत्तम गुणस्तर, विश्वसनीयता, र प्रदर्शनका उच्चतम मानकहरू पूरा गर्लान्।  

## मुख्य सिकाइहरू

1. **टुल डिजाइन**: एकल जिम्मेवारी सिद्धान्त पछ्याउनुहोस्, निर्भरता इन्जेक्शन प्रयोग गर्नुहोस्, र संयोज्यताको लागि डिजाइन गर्नुहोस्  
2. **स्किमा डिजाइन**: स्पष्ट, राम्रो दस्तावेजीकृत स्किमाहरू सिर्जना गर्नुहोस् जुन उपयुक्त मान्यता सर्तहरू समेट्छ  
3. **त्रुटि ह्यान्डलिंग**: सुशील त्रुटि ह्यान्डलिंग, संरचित त्रुटि प्रतिक्रिया, र पुनः प्रयास तर्क लागू गर्नुहोस्  
4. **प्रदर्शन**: क्यासिङ, असिन्क्रोनस प्रक्रिया, र स्रोत थ्रोटलिङ प्रयोग गर्नुहोस्  
5. **सुरक्षा**: पूर्ण इनपुट मान्यकरण, प्राधिकरण जाँच, र संवेदनशील डाटा ह्यान्डलिंग लागू गर्नुहोस्  
6. **परीक्षण**: व्यापक युनिट, एकिकरण, र अन्त-देखि-अन्त परीक्षणहरू सिर्जना गर्नुहोस्  
7. **वर्कफ्लो ढाँचा**: चेन, डिस्प्याचरहरू, र समानान्तर प्रक्रिया जस्ता स्थापित ढाँचाहरू लागू गर्नुहोस्  

## अभ्यास

डकुमेन्ट प्रक्रिया प्रणालीका लागि MCP टुल र वर्कफ्लो डिजाइन गर्नुहोस् जसले:

1. बहु ढाँचाका कागजातहरू स्वीकार्छ (PDF, DOCX, TXT)  
2. कागजातहरूबाट पाठ र मुख्य जानकारी निकालेको छ  
3. कागजातहरूलाई प्रकार र सामग्रीका आधारमा वर्गीकृत गर्छ  
4. प्रत्येक कागजातको सारांश उत्पादन गर्छ  

टुल स्किमाहरू, त्रुटि ह्यान्डलिंग, र यो परिदृश्यका लागि उत्तम उपयुक्त वर्कफ्लो ढाँचाको कार्यान्वयन गर्नुहोस्। यस कार्यान्वयन कसरी परीक्षण गर्ने सोच्नुहोस्।  

## स्रोतहरू

1. [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) मा MCP समुदायमा सामेल भई नवीनतम विकासहरूलाई अपडेट रहनुहोस्  
2. खुला स्रोत [MCP परियोजनाहरू](https://github.com/modelcontextprotocol) मा योगदान गर्नुहोस्  
3. आफ्नो संगठनको AI पहलहरूमा MCP सिद्धान्तहरू लागू गर्नुहोस्  
4. आफ्नो उद्योगका लागि विशिष्ट MCP कार्यान्वयनहरू अन्वेषण गर्नुहोस्।  
5. मल्टि-मोडल एकिकरण वा उद्यम अनुप्रयोग एकिकरण जस्ता विशेष MCP विषयहरूमा उन्नत पाठ्यक्रमहरू लिन विचार गर्नुहोस्।  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) मार्फत सिकिएका सिद्धान्तहरू प्रयोग गरेर आफ्नै MCP टुल र वर्कफ्लोहरू बनाउने प्रयोग गर्नुहोस्  

## के छ अर्को

अर्को: [केस अध्ययनहरू](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरी अनुवाद गरिएको हो। हामी शुद्धताका लागि प्रयासरत छौं, तर कृपया जानकार हुनुहोस् कि स्वचालित अनुवादमा त्रुटि वा अशुद्धता हुन सक्दछ। मूल दस्तावेज यसको मूल भाषामा अधिकारप्राप्त स्रोत मानिनु पर्ने हुन्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानवीय अनुवादको सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलतफहमी वा गलत व्याख्याका लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->