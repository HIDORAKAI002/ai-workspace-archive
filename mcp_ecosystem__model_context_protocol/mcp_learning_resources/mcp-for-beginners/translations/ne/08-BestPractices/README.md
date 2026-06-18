# MCP विकासका उत्तम अभ्यासहरू

[![MCP विकासका उत्तम अभ्यासहरू](../../../translated_images/ne/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(यस पाठको भिडियो हेर्न माथिको तस्बिरमा क्लिक गर्नुहोस्)_

## अवलोकन

यस पाठले उत्पादन वातावरणमा MCP सर्भरहरू र सुविधाहरू विकास, परीक्षण, र सञ्चालन गर्ने उन्नत उत्तम अभ्यासहरूमा केन्द्रित छ। MCP इकोसिस्टमहरूको जटिलता र महत्व बढ्दै गए संगै, स्थापित ढाँचा पालन गर्दा विश्वसनीयता, मर्मतसम्भारयोग्यता, र अन्तर सञ्चालन सुनिश्चित हुन्छ। यस पाठले वास्तविक MCP कार्यान्वयनबाट प्राप्त व्यावहारिक ज्ञानलाई एकत्रित गरेर तपाईलाई प्रभावकारी स्रोतहरू, संकेतहरू, र उपकरणहरूसँग बलियो, दक्ष सर्भरहरू सिर्जना गर्न मार्गदर्शन गर्दछ।

## अध्ययन उद्देश्यहरू

यस पाठको अन्त्यसम्म, तपाईले सक्षम हुनुहुनेछ:

- MCP सर्भर र सुविधा डिजाइनमा उद्योगको उत्तम अभ्यासहरू लागू गर्न
- MCP सर्भरहरूको लागि समग्र परीक्षण रणनीतिहरू सिर्जना गर्न
- जटिल MCP अनुप्रयोगहरूका लागि दक्ष, पुर्नउपयोगयोग्य कार्यप्रवाह ढाँचाहरू डिजाइन गर्न
- MCP सर्भरहरूमा उचित गल्ती ह्यान्डलिंग, लगिङ, र अवलोकन क्षमता लागू गर्न
- प्रदर्शन, सुरक्षा, र मर्मतसम्भारयोग्यताका लागि MCP कार्यान्वयनहरू अनुकूलित गर्न

## MCP कोर सिद्धान्तहरू

विशिष्ट कार्यान्वयन अभ्यासहरूमा प्रवेश गर्नु अघि, प्रभावकारी MCP विकासलाई मार्गदर्शन गर्ने कोर सिद्धान्तहरू बुझ्नु महत्वपूर्ण छ:

1. **मानकीकृत सञ्चार**: MCP ले JSON-RPC 2.0 लाई आधारको रूपमा प्रयोग गर्दछ, जसले सबै कार्यान्वयनमा अनुरोध, प्रतिक्रिया, र गल्ती ह्यान्डलिंगका लागि सुसंगत ढाँचा प्रदान गर्दछ।

2. **प्रयोगकर्ता-केन्द्रित डिजाइन**: तपाईका MCP कार्यान्वयनहरूमा सधैं प्रयोगकर्ताको सहमति, नियन्त्रण, र पारदर्शितामा प्राथमिकता दिनुहोस्।

3. **पहिलो सुरक्षा**: प्रमाणीकरण, अधिकृतता, प्रमाणीकरण, र दर सीमांकन सहित दिगो सुरक्षा उपायहरू लागू गर्नुहोस्।

4. **मोड्युलर वास्तुकला**: तपाईका MCP सर्भरहरू मोड्युलर तरिकाले डिजाइन गर्नुहोस्, जहाँ प्रत्येक उपकरण र स्रोतको स्पष्ट, केन्द्रित उद्देश्य हुन्छ।

5. **राज्यपूर्ण जडानहरू**: अधिक सुसंगत र सन्दर्भ-सचेत अन्तरक्रियाहरूका लागि बहु अनुरोधहरूमा राज्य कायम राख्ने MCP को क्षमता उपयोग गर्नुहोस्।

## आधिकारिक MCP उत्तम अभ्यासहरू

तलका उत्तम अभ्यासहरू आधिकारिक मोडेल सन्दर्भ प्रोटोकल कागजातबाट निकालेका छन्:

### सुरक्षा उत्तम अभ्यासहरू

1. **प्रयोगकर्ता सहमति र नियन्त्रण**: डेटा पहुँच गर्न वा संचालन गर्नुअघि सधैं स्पष्ट प्रयोगकर्ता सहमति आवश्यक छ। के डेटा साझा गरिन्छ र कुन क्रियाहरू अधिकृत छन् भन्ने स्पष्ट नियन्त्रण प्रदान गर्नुहोस्।

2. **डेटा गोप्यता**: प्रयोगकर्ताको स्पष्ट सहमति बिना डेटा प्रकट नगर्ने र उचित पहुँच नियन्त्रणसँग सुरक्षित गर्ने। अनधिकृत डेटा प्रसारणबाट सुरक्षा गर्ने।

3. **उपकरण सुरक्षा**: कुनै उपकरण सम्हाल्नु अघि स्पष्ट प्रयोगकर्ता सहमति आवश्यक छ। प्रयोगकर्ताले प्रत्येक उपकरणको कार्यक्षमता बुझ्ने सुनिश्चित गर्नुहोस् र दिगो सुरक्षा सीमा लागू गर्नुहोस्।

4. **उपकरण अनुमति नियन्त्रण**: सत्रमा मोडेललाई कुन उपकरण प्रयोग गर्न अनुमति छ भनेर सेटिङ गर्नुहोस्, केवल स्पष्ट रूपमा अधिकृत उपकरणहरू पहुँचयोग्य हुने गरी।

5. **प्रमाणीकरण**: उपकरणहरू, स्रोतहरू, वा संवेदनशील कार्यहरूमा पहुँच दिने अघि उचित प्रमाणीकरण आवश्यक परेमा API कुञ्जी, OAuth टोकन, वा अन्य सुरक्षित प्रमाणीकरण विधिहरू प्रयोग गर्नुहोस्।

6. **प्यारामिटर प्रमाणीकरण**: सबै उपकरण आह्वानहरूको लागि प्रमाणीकरण लागू गर्नुहोस् ताकि बिग्रिएको वा दुष्ट इनपुट उपकरण कार्यान्वयनसम्म पुग्न नदियोस्।

7. **दर सीमांकन**: दुरुपयोग रोक्न र सर्भर स्रोतहरूको निष्पक्ष प्रयोग सुनिश्चित गर्न दर सीमांकन कार्यान्वयन गर्नुहोस्।

### कार्यान्वयन उत्तम अभ्यासहरू

1. **क्षमता समायोजन**: जडान सेटअपको समयमा समर्थित सुविधाहरू, प्रोटोकल संस्करणहरू, उपलब्ध उपकरणहरू र स्रोतहरूसँग सम्बन्धित सूचना विनिमय गर्नुहोस्।

2. **उपकरण डिजाइन**: एकाइ उपकरणहरू सिर्जना गर्नुहोस् जुन एउटै कार्यलाई राम्ररी सञ्चालन गर्छ, बहुविध विषयहरूलाई सम्हाल्ने मोनोलिथिक उपकरणहरू भन्दा।

3. **गल्ती ह्यान्डलिंग**: असफलताहरूलाई दिगो ढङ्गले ह्यान्डल गर्न, समस्या विश्लेषण गर्न र कार्यान्वयनीय प्रतिक्रिया प्रदान गर्न मानकीकृत त्रुटि सन्देशहरू र कोडहरू कार्यान्वयन गर्नुहोस्।

4. **लगिङ**: प्रोटोकल अन्तरक्रिया अडिट, डिबग, र अनुगमनका लागि संरचित लगहरू सेटअप गर्नुहोस्।

5. **प्रगति ट्रयाकिङ**: लामो समय चल्ने अपरेशनहरूको लागि प्रगति अद्यावधिकहरू रिपोर्ट गरेर प्रतिक्रियाशील प्रयोगकर्ता अन्तरफलक सक्षम गर्नुहोस्।

6. **अनुरोध रद्द गर्ने सुविधा**: अब आवश्यक नभएको वा धेरै समय लिइरहेका अनुरोधहरूमा क्लाइन्टहरूले रद्द गर्न अनुमति दिनुहोस्।

## थप सन्दर्भहरू

MCP उत्तम अभ्यासहरूको सबैभन्दा अद्यावधिक जानकारीका लागि हेर्नुहोस्:

- [MCP दस्तावेज़ीकरण](https://modelcontextprotocol.io/)
- [MCP विनिर्देशन (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub रिपोजिटरी](https://github.com/modelcontextprotocol)
- [सुरक्षा उत्तम अभ्यासहरू](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP शीर्ष १०](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - सुरक्षा जोखिम र रोकथामहरू
- [MCP सुरक्षा सम्मेलन कार्यशाला (शेर्पा)](https://azure-samples.github.io/sherpa/) - व्यावहारिक सुरक्षा तालिम

## व्यावहारिक कार्यान्वयन उदाहरणहरू

### उपकरण डिजाइन उत्तम अभ्यासहरू

#### १. एकल उत्तरदायित्व सिद्धान्त

हरेक MCP उपकरणको स्पष्ट, केन्द्रित उद्देश्य हुनु आवश्यक छ। बहुविध विषयहरू सम्हाल्न खोज्ने मोनोलिथिक उपकरणहरू भन्दा विशेषीकृत उपकरणहरू विकास गर्नुहोस् जसले विशेष कार्यहरूमा उत्कृष्टता हासिल गर्छ।

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

#### २. सुसंगत गल्ती ह्यान्डलिंग

जानकारीमूलक त्रुटि सन्देशहरू र उपयुक्त पुन: प्राप्ति यन्त्रहरूसहित बलियो गल्ती ह्यान्डलिंग कार्यान्वयन गर्नुहोस्।

```python
# व्यापक त्रुटि ह्यान्डलिङ सहितको Python उदाहरण
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
                # टाइमआउट सहितको डाटाबेस अपरेसन
                async with timeout(10):  # १० सेकेन्ड टाइमआउट
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # जडान त्रुटिहरू अस्थायी हुन सक्छन्
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # क्वेरी त्रुटिहरू सम्भवतः क्लाइन्ट त्रुटिहरू हुन्
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # उपकरण-विशेष त्रुटिहरूलाई जान दिनुहोस्
            raise
        except Exception as e:
            # अप्रत्याशित त्रुटिहरूको लागि समात्नुहोस्
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL इन्जेक्शन पत्ता लगाउने कार्यान्वयन
        pass
        
    def _log_error(self, message, error):
        # त्रुटि लगिङ कार्यान्वयन
        pass
```

#### ३. प्यारामिटर प्रमाणीकरण

बिग्रिएको वा दुष्ट इनपुटलाई रोक्न प्यारामिटरहरू सदैव व्यापक रूपमा प्रमाणीकरण गर्नुहोस्।

```javascript
// विस्तृत प्यारामिटर प्रमाणीकरण सहित JavaScript/TypeScript उदाहरण
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
    // 1. प्यारामिटर उपस्थिति प्रमाणीकरण गर्नुहोस्
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. प्यारामिटर प्रकार प्रमाणीकरण गर्नुहोस्
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. प्यारामिटर मान प्रमाणीकरण गर्नुहोस्
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. लेखन अपरेशनको लागि सामग्री उपस्थिति प्रमाणीकरण गर्नुहोस्
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. मार्ग सुरक्षा प्रमाणीकरण
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // प्रमाणीकरण गरिएका प्यारामिटरहरूमा आधारित कार्यान्वयन
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // मार्ग सुरक्षा जाँचको कार्यान्वयन
    // ...
  }
}
```

### सुरक्षा कार्यान्वयन उदाहरणहरू

#### १. प्रमाणीकरण र अधिकृतता

```java
// प्रमाणिकरण र प्राधिकरणसहितको जाभा उदाहरण
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // निर्भरता इन्जेक्शन
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
        
        // ३. विशेष अपरेशनको लागि प्राधिकरण जाँच गर्नुहोस्
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // ४. अधिकृत अपरेशनसँग अघि बढ्नुहोस्
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

#### २. दर सीमांकन

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

## परीक्षण उत्तम अभ्यासहरू

### १. MCP उपकरणहरूको एकाइ परीक्षण

आफ्ना उपकरणहरूलाई पृथक रूपमा टेस्ट गर्नुहोस्, बाह्य निर्भरताहरूलाई मॉक गरेर:

```typescript
// टाइपस्क्रिप्ट उपकरण युनिट परीक्षणको उदाहरण
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // मोक मौसम सेवा सिर्जना गर्नुहोस्
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // मोक निर्भरता सहित उपकरण सिर्जना गर्नुहोस्
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
    
    // कार्य गर्नुहोस्
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
    
    // कार्य र पुष्टि गर्नुहोस्
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### २. एकीकरण परीक्षण

क्लाइन्ट अनुरोधदेखि सर्भर प्रतिक्रियासम्मको पूरा प्रवाह परीक्षण गर्नुहोस्:

```python
# पाइथन एकीकरण टेस्ट उदाहरण
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # टेस्ट सर्भर सुरु गर्नुहोस्
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # क्लाइन्ट निर्माण गर्नुहोस्
        client = McpClient("http://localhost:5000")
        
        # उपकरण पत्ता लगाउने टेस्ट
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # उपकरण सञ्चालनको टेस्ट
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # प्रतिक्रिया प्रमाणीकरण गर्नुहोस्
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # सफाई गर्नुहोस्
        await server.stop()
```

## प्रदर्शन अनुकूलन

### १. क्याचिङ रणनीतिहरू

ढिलाइ कम गर्न र स्रोत खपत घटाउन उपयुक्त क्याचिङ कार्यान्वयन गर्नुहोस्:

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

#### २. निर्भरता इंजेक्शन र परीक्षणयोग्यता

निर्माता इंजेक्शनमार्फत निर्भरताहरू प्राप्त गर्न उपकरणहरू डिजाइन गर्नुहोस् जसले तिनलाई परीक्षणयोग्य र संरचनायोग्य बनाउँछ:

```java
// देपेन्डेन्सी इन्जेक्सनसहितको जाभा उदाहरण
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // कन्स्ट्रक्टर मार्फत देपेन्डेन्सीहरू इन्जेक्ट गरियो
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

#### ३. संयोज्य उपकरणहरू

अझ जटिल कार्यप्रवाहहरू बनाउन उपकरणहरू संयोजन योग्य बनाउन डिजाइन गर्नुहोस्:

```python
# कम्पोजेबल उपकरणहरू देखाउँदै पाइथन उदाहरण
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # कार्यान्वयन...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # यो उपकरणले dataFetch उपकरणबाट प्राप्त परिणामहरू प्रयोग गर्न सक्छ
    async def execute_async(self, request):
        # कार्यान्वयन...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # यो उपकरणले dataAnalysis उपकरणबाट प्राप्त परिणामहरू प्रयोग गर्न सक्छ
    async def execute_async(self, request):
        # कार्यान्वयन...
        pass

# यी उपकरणहरू स्वतन्त्र रूपमा वा कार्यप्रवाहको भागको रूपमा प्रयोग गर्न सकिन्छ
```

### स्किमा डिजाइन उत्तम अभ्यासहरू

स्किमा मोडेल र तपाईँको उपकरण बीचको सम्झौता हो। राम्रो डिजाइन गरिएका स्किमाहरूले उपकरणको प्रयोगयोग्यता सुधार्छन्।

#### १. स्पष्ट प्यारामिटर विवरणहरू

हरेक प्यारामिटरको लागि वर्णनात्मक जानकारी सधैं समावेश गर्नुहोस्:

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

#### २. प्रमाणीकरण सीमा

अवैध इनपुट रोक्न प्रमाणीकरण सीमा समावेश गर्नुहोस्:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ढाँचा प्रमाणीकरणसहित इमेल गुण
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // सङ्ख्यात्मक सिमाहरू सहित उमेर गुण
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // क्रमागत गुण
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

#### ३. सुसंगत फर्काउने संरचनाहरू

मोडेलहरूले परिणामहरू सजिलै व्याख्या गर्न सकून् भनेर आफ्ना प्रतिक्रिया संरचनामा सुसंगतता कायम राख्नुहोस्:

```python
async def execute_async(self, request):
    try:
        # अनुरोध प्रक्रिया गर्नुहोस्
        results = await self._search_database(request.parameters["query"])
        
        # सधैं एक सुसंगत संरचना फर्काउनुहोस्
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

### गल्ती ह्यान्डलिंग

बलियो गल्ती ह्यान्डलिंगले MCP उपकरणहरूको विश्वसनीयता कायम राख्न महत्त्वपूर्ण छ।

#### १. सुगम गल्ती ह्यान्डलिंग

उपयुक्त तहहरूमा गल्तीहरू ह्यान्डल गरेर जानकारीमूलक सन्देशहरू प्रदान गर्नुहोस्:

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

#### २. संरचित त्रुटि प्रतिक्रिया

संभावित अवस्थामा संरचित त्रुटि जानकारी फर्काउनुहोस्:

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
        
        // अन्य अपवादहरूलाई ToolExecutionException को रूपमा पुन: थ्रो गर्नुहोस्
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### ३. पुन: प्रयास तर्क

अस्थायी असफलताहरूका लागि उपयुक्त पुन: प्रयास तर्क कार्यान्वयन गर्नुहोस्:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # सेकेन्ड
    
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
            # अस्थायी नभएको त्रुटि, पुन: प्रयास नगर्नुहोस्
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### प्रदर्शन अनुकूलन

#### १. क्याचिङ

महँगो अपरेसनहरूको लागि क्याचिङ कार्यान्वयन गर्नुहोस्:

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

#### २. असिन्क्रोनस प्रशोधन

I/O-आधारित अपरेशनहरूको लागि असिन्क्रोनस प्रोग्रामिङ ढाँचाहरू प्रयोग गर्नुहोस्:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // लामो समयसम्म चल्ने कार्यहरूको लागि, तुरुन्तै प्रक्रिया ID फिर्ता गर्नुहोस्
        String processId = UUID.randomUUID().toString();
        
        // एसिन्क प्रोसेसिङ सुरु गर्नुहोस्
        CompletableFuture.runAsync(() -> {
            try {
                // लामो समयसम्म चल्ने कार्य गर्नुहोस्
                documentService.processDocument(documentId);
                
                // स्थिति अपडेट गर्नुहोस् (सामान्यतया डेटाबेसमा संग्रह गरिन्छ)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // प्रक्रिया ID सहित तुरुन्त प्रतिक्रिया फिर्ता गर्नुहोस्
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // साथीसँगको स्थिति जाँच उपकरण
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

#### ३. स्रोत थ्रॉटलिङ

अतिभार रोक्न स्रोत थ्रॉटलिङ कार्यान्वयन गर्नुहोस्:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # सेकेन्डमा ५ अनुरोधहरू अनुमति दिनुहोस्
            bucket_size=10        # १० अनुरोधसम्म आकस्मिक बढ़ोत्तरी अनुमति दिनुहोस्
        )
    
    async def execute_async(self, request):
        # हामी अघि बढ्न सक्छौँ कि पर्खनु पर्छ जाँच गर्नुहोस्
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # यदि पर्खाइ धेरै लामो छ भने
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # उपयुक्त ढिलाइ समयसम्म पर्खनुहोस्
                await asyncio.sleep(delay)
        
        # एउटा टोकन प्रयोग गरी अनुरोधसँग अघि बढ्नुहोस्
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
            
            # अर्को टोकन उपलब्ध हुन समय गणना गर्नुहोस्
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

### सुरक्षा उत्तम अभ्यासहरू

#### १. इनपुट प्रमाणीकरण

सधैं प्यारामिटरहरू पूर्ण रूपमा प्रमाणीकरण गर्नुहोस्:

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

#### २. अधिकृतता परीक्षण

उचित अधिकृतता परीक्षणहरू लागू गर्नुहोस्:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // अनुरोधबाट प्रयोगकर्ता सन्दर्भ प्राप्त गर्नुहोस्
    UserContext user = request.getContext().getUserContext();
    
    // प्रयोगकर्तासँग आवश्यक अनुमति छ कि छैन जाँच गर्नुहोस्
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // विशिष्ट स्रोतहरूको लागि, सो स्रोतमा पहुँच छ कि छैन जाँच गर्नुहोस्
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // उपकरण कार्यान्वयनसँग अघि बढ्नुहोस्
    // ...
}
```

#### ३. संवेदनशील डेटा ह्यान्डलिंग

संवेदनशील डेटालाई सावधानीपूर्वक ह्यान्डल गर्नुहोस्:

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
        
        # स्पष्ट रूपमा अनुरोध गरिएको र अधिकृत नभएसम्म संवेदनशील क्षेत्रहरू फिल्टर गर्नुहोस्
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # अनुरोध सन्दर्भमा अधिकृत स्तर जाँच गर्नुहोस्
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # मूललाई परिवर्तन नगर्न प्रतिलिपि सिर्जना गर्नुहोस्
        redacted = user_data.copy()
        
        # विशिष्ट संवेदनशील क्षेत्रहरू रातो गर्नुहोस्
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # नेस्ट गरिएको संवेदनशील डेटा रातो गर्नुहोस्
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP उपकरणहरूको लागि परीक्षण उत्तम अभ्यासहरू

सम्पूर्ण परीक्षणले सुनिश्चित गर्दछ कि MCP उपकरणहरू ठीकसँग काम गर्दछन्, किनाराका केसहरू नियन्त्रण गर्दछन् र प्रणालीको बाँकी भागसँग ठीकसँग एकीकृत हुन्छन्।

### एकाइ परीक्षण

#### १. प्रत्येक उपकरणलाई पृथक रूपमा टेस्ट गर्नुहोस्

हरेक उपकरणको कार्यक्षमताका लागि केन्द्रित परीक्षणहरू सिर्जना गर्नुहोस्:

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

#### २. स्किमा प्रमाणीकरण परीक्षण

स्किमाहरू मान्य छन् र सीमाहरू उपयुक्त रूपमा लागू छन् भन्ने टेस्ट गर्नुहोस्:

```java
@Test
public void testSchemaValidation() {
    // उपकरण उदाहरण सिर्जना गर्नुहोस्
    SearchTool searchTool = new SearchTool();
    
    // स्कीमा प्राप्त गर्नुहोस्
    Object schema = searchTool.getSchema();
    
    // प्रमाणीकरणको लागि स्कीमालाई JSON मा रूपान्तरण गर्नुहोस्
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // स्कीमा मान्य JSONSchema हो कि होइन भनेर प्रमाणीकरण गर्नुहोस्
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // मान्य प्यारामिटरहरू परीक्षण गर्नुहोस्
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // आवश्यक प्यारामिटर हराइरहेको परीक्षण गर्नुहोस्
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // अमान्य प्यारामिटर प्रकार परीक्षण गर्नुहोस्
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### ३. गल्ती ह्यान्डलिंग परीक्षण

गल्ती अवस्थाहरूका लागि विशेष परीक्षणहरू सिर्जना गर्नुहोस्:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # व्यवस्थापन गर्नुहोस्
    tool = ApiTool(timeout=0.1)  # धेरै छोटो टाइमआउट
    
    # टाईमआउट हुने अनुरोध मक्क गर्नुहोस्
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # टाइमआउट भन्दा लामो
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # कार्य गर्नुहोस् र पुष्टि गर्नुहोस्
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवाद सन्देश पुष्टि गर्नुहोस्
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # व्यवस्थापन गर्नुहोस्
    tool = ApiTool()
    
    # दर सीमित प्रतिक्रिया मक्क गर्नुहोस्
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
        
        # कार्य गर्नुहोस् र पुष्टि गर्नुहोस्
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवादमा दर सीमा जानकारी छ कि छैन जाँच गर्नुहोस्
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### एकीकरण परीक्षण

#### १. उपकरण श्रृंखला परीक्षण

अपेक्षित संयोजनहरूमा उपकरणहरू सँगसँगै काम गर्ने टेस्ट गर्नुहोस्:

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

#### २. MCP सर्भर परीक्षण

पूर्ण उपकरण दर्ता र कार्यान्वयनसहित MCP सर्भर परीक्षण गर्नुहोस्:

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
        // डिस्कवरी एन्डपोइन्ट परीक्षण गर्नुहोस्
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // उपकरण अनुरोध सिर्जना गर्नुहोस्
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // अनुरोध पठाउनुहोस् र प्रतिक्रिया सत्यापित गर्नुहोस्
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // अवैध उपकरण अनुरोध सिर्जना गर्नुहोस्
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" प्यारामिटर हराइरहेको छ
        request.put("parameters", parameters);
        
        // अनुरोध पठाउनुहोस् र त्रुटि प्रतिक्रिया सत्यापित गर्नुहोस्
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### ३. अन्तदेखि-अन्त परीक्षण

मोडेल संकेतदेखि उपकरण कार्यान्वयनसम्म पूरा कार्यप्रवाह परीक्षण गर्नुहोस्:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # आयोजन गर्नुहोस् - MCP क्लाइंट र मोक मोडेल सेट गर्नुहोस्
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # मोक मोडेल प्रतिक्रियाहरू
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
    
    # मोक मौसम उपकरण प्रतिक्रिया
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
        
        # कार्य गर्नुहोस्
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

#### १. लोड परीक्षण

तपाईको MCP सर्भर कति धेरै एक साथ अनुरोधहरू हातेमालो गर्न सक्छ परीक्षण गर्नुहोस्:

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

#### २. तनाव परीक्षण

अत्यधिक लोड अन्तर्गत प्रणाली परीक्षण गर्नुहोस्:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // तनाव परीक्षणका लागि JMeter सेटअप गर्नुहोस्
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
    
    // लिस्नरहरू थप्नुहोस्
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // परीक्षण चलाउनुहोस्
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // परिणामहरू मान्य गर्नुहोस्
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // औसत प्रतिक्रिया समय < २००ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // ९० औं पर्सेन्टाइल < ५००ms
}
```

#### ३. अनुगमन र प्रोफाइलिङ

दीर्घकालीन प्रदर्शन विश्लेषणका लागि अनुगमन सेटअप गर्नुहोस्:

```python
# एक MCP सर्भरको लागि अनुगमन कन्फिगर गर्नुहोस्
def configure_monitoring(server):
    # Prometheus मेट्रिक्स सेटअप गर्नुहोस्
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
    
    # टाइमिङ र मेट्रिक्स रेकर्ड गर्ने मिडलवेयर थप्नुहोस्
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # मेट्रिक्स एन्डपोइन्ट एक्स्पोज गर्नुहोस्
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP कार्यप्रवाह डिजाइन ढाँचाहरू

राम्रो डिजाइन गरिएका MCP कार्यप्रवाहहरूले दक्षता, विश्वसनीयता, र मर्मतसम्भारयोग्यतालाई सुधार गर्छ। यहाँ अनुसरण गर्ने मुख्य ढाँचाहरू छन्:

### १. उपकरणहरूको श्रृंखला ढाँचा

धेरै उपकरणहरूलाई अनुक्रममा जडान गर्नुहोस् जहाँ प्रत्येक उपकरणको आउटपुट अर्को उपकरणको इनपुट हुन्छ:

```python
# पाइथन चेन अफ टूल्स कार्यान्वयन
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # अनुक्रममा कार्यान्वयन गर्न टुल नामहरूको सूची
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # चेनमा प्रत्येक टुल कार्यान्वयन गर्नुहोस्, अघिल्लो परिणाम पास गर्दै
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # परिणाम भण्डारण गर्नुहोस् र अर्को टुलको इनपुटको रूपमा प्रयोग गर्नुहोस्
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

### २. डिस्प्याचर ढाँचा

इनपुटको आधारमा विशेषीकृत उपकरणहरूमा मार्गदर्शन गर्ने केन्द्रित उपकरण प्रयोग गर्नुहोस्:

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

### ३. समानान्तर प्रशोधन ढाँचा

दक्षताको लागि एकैपटक धेरै उपकरणहरूको कार्यान्वयन गर्नुहोस्:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // कदम १: डेटासेट मेटाडाटा प्राप्त गर्नुहोस् (समानान्तर)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // कदम २: धेरै विश्लेषणहरू समानान्तर रूपमा सुरु गर्नुहोस्
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
        
        // सबै समानान्तर कार्यहरू पूरा हुनु पर्खनुहोस्
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // पूरा हुनु पर्खनुहोस्
        
        // कदम ३: परिणामहरू संयोजन गर्नुहोस्
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // कदम ४: सारांश रिपोर्ट तयार गर्नुहोस्
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // पूर्ण कार्यप्रवाहको परिणाम फिर्ता गर्नुहोस्
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### ४. गल्ती पुनःप्राप्ति ढाँचा

उपकरण असफलताहरूमा सुगम फ्यालब्याक कार्यान्वयन गर्नुहोस्:

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
            
            # दोस्रो उपकरणमा फर्कनुहोस्
            try:
                # फर्कनुपर्ने उपकरणका लागि प्यारामिटरहरू परिवर्तन गर्नुपर्ने हुन सक्छ
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # दुवै उपकरणहरू असफल भए
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # यो कार्यान्वयन विशिष्ट उपकरणहरूमा निर्भर हुनेछ
        # यस उदाहरणका लागि, हामी केवल मूल प्यारामिटरहरू फर्काउनेछौं
        return params

# उदाहरण प्रयोग
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # प्राथमिक (भुक्तानी गरिएको) मौसम API
        "basicWeatherService",    # दोस्रो (निःशुल्क) मौसम API
        {"location": location}
    )
```

### ५. कार्यप्रवाह संयोजन ढाँचा

सरल कार्यप्रवाहहरू संयोजन गरेर जटिल कार्यप्रवाहहरू निर्माण गर्नुहोस्:

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

# MCP सर्भरहरू परीक्षण: उत्तम अभ्यासहरू र शीर्ष सुझावहरू

## अवलोकन

मजबुत, उच्च गुणस्तरका MCP सर्भरहरू विकास गर्ने क्रममा परीक्षण एक महत्वपूर्ण पक्ष हो। यस मार्गदर्शिकाले विकास जीवनचक्रभरि तपाईँका MCP सर्भरहरूको परीक्षणका लागि समग्र उत्तम अभ्यासहरू र सुझावहरू प्रदान गर्दछ, एकाइ परीक्षणदेखि एकीकरण परीक्षण र अन्तदेखि-अन्त परीक्षणसम्म।

## किन MCP सर्भरहरूको परीक्षण आवश्यक छ?

MCP सर्भरहरूले AI मोडेलहरू र क्लाइन्ट अनुप्रयोगहरूबीच महत्वपूर्ण माध्यम भूमिका निर्वाह गर्छन्। व्यापक परीक्षणले सुनिश्चित गर्दछ:

- उत्पादन वातावरणमा विश्वसनीयता
- अनुरोध र प्रतिक्रिया शुद्ध ह्यान्डलिंग
- MCP विनिर्देशनको उचित कार्यान्वयन
- असफलता र किनाराका केसहरूमा दृढता
- विभिन्न भारहरूमा सुसंगत प्रदर्शन

## MCP सर्भरहरूको एकाइ परीक्षण

### एकाइ परीक्षण (आधार तह)

एकाइ परीक्षणले तपाईँका MCP सर्भरका व्यक्तिगत कम्पोनेन्टहरूलाई पृथक रूपमा जाँच गर्छ।

#### के परीक्षण गर्ने

1. **स्रोत ह्यान्डलरहरू**: हरेक स्रोत ह्यान्डलरको तर्कलाई स्वतन्त्र रूपमा परीक्षण गर्नुहोस्
2. **उपकरण कार्यान्वयनहरू**: विभिन्न इनपुटहरूसँग उपकरणको व्यवहार प्रमाणित गर्नुहोस्
3. **संकेत फाँट**: सुनिश्चित गर्नुहोस् संकेत फाँटहरू सही रूपमा देखिन्छन्
4. **स्किमा प्रमाणीकरण**: प्यारामिटर प्रमाणीकरण तर्कलाई परीक्षण गर्नुहोस्
5. **गल्ती ह्यान्डलिंग**: अवैध इनपुटहरूको लागि त्रुटि प्रतिक्रिया पुष्टि गर्नुहोस्

#### एकाइ परीक्षणका लागि उत्तम अभ्यासहरू

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
# Python मा क्याल्कुलेटर उपकरणको लागि उदाहरण यूनिट परीक्षण
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
    
    # सुनिश्चित गर्नुहोस्
    assert result["value"] == 12
```

### एकीकरण परीक्षण (मध्य तह)

एकीकरण परीक्षणले तपाईँको MCP सर्भरका कम्पोनेन्टहरूबीच अन्तरक्रियाहरूको पुष्टि गर्छ।

#### के परीक्षण गर्ने

1. **सर्भर सुरु गर्ने प्रक्रिया**: विभिन्न कन्फिगरेसनहरूसँग सर्भर सुरुवात परीक्षण गर्नुहोस्
2. **मार्ग दर्ता**: सबै अन्तबिन्दुहरू सही रूपमा दर्ता भएका छन् भन्ने सुनिश्चित गर्नुहोस्
3. **अनुरोध प्रशोधन**: पूर्ण अनुरोध-प्रतिक्रिया चक्र परीक्षण गर्नुहोस्
4. **गल्ती प्रसारण**: कम्पोनेन्टहरूबीच गल्तीहरू ठीकसँग ह्यान्डल भइरहेका छन् हेर्नुहोस्
5. **प्रमाणीकरण र अधिकृतता**: सुरक्षा यन्त्रहरू परीक्षण गर्नुहोस्

#### एकीकरण परीक्षणका लागि उत्तम अभ्यासहरू

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

### अन्तदेखि-अन्त परीक्षण (शीर्ष तह)

अन्तदेखि-अन्त परीक्षणले क्लाइन्टदेखि सर्भरसम्म सम्पूर्ण प्रणाली व्यवहार परीक्षण गर्छ।

#### के परीक्षण गर्ने

1. **क्लाइन्ट-सर्भर सञ्चार**: पूर्ण अनुरोध-प्रतिक्रिया चक्र परीक्षण गर्नुहोस्
2. **वास्तविक क्लाइन्ट SDKs**: वास्तविक क्लाइन्ट कार्यान्वयनहरूसँग परीक्षण गर्नुहोस्
3. **लोड अन्तर्गत प्रदर्शन**: धेरै समानान्तर अनुरोधहरूसँग व्यवहार पुष्टि गर्नुहोस्
4. **गल्ती पुनःप्राप्ति**: असफलताबाट प्रणाली पुन: प्राप्ति परीक्षण गर्नुहोस्
5. **लामो समय चल्ने अपरेसनहरू**: स्ट्रिमिङ र लामो समयका अपरेसनको ह्यान्डलिंग पुष्टि गर्नुहोस्

#### अन्तदेखि-अन्त परीक्षणका लागि उत्तम अभ्यासहरू

```typescript
// TypeScript मा क्लाइन्टसँग उदाहरण E2E परीक्षण
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // परीक्षण वातावरणमा सर्भर सुरु गर्नुहोस्
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // कार्य गर्नुहोस्
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

मॉकिङ परीक्षणको समयमा कम्पोनेन्टहरू पृथक बनाउन आवश्यक छ।

### मॉक गर्नुपर्ने कम्पोनेन्टहरू

1. **बाह्य AI मोडेलहरू**: पूर्वानुमानयोग्य परीक्षणका लागि मोडेल प्रतिक्रियाहरू मॉक गर्नुहोस्
2. **बाह्य सेवा**: API निर्भरताहरू (डेटाबेस, तेस्रो पक्ष सेवा) मॉक गर्नुहोस्
3. **प्रमाणीकरण सेवा**: पहिचान प्रदायकहरू मॉक गर्नुहोस्
4. **स्रोत प्रदायकहरू**: महँगो स्रोत ह्यान्डलरहरू मॉक गर्नुहोस्

### उदाहरण: AI मोडेल प्रतिक्रिया मॉकिङ

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
    # मॉक सेटअप गर्नुहोस्
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # परीक्षणमा मॉक प्रयोग गर्नुहोस्
    server = McpServer(model_client=mock_model)
    # परीक्षण जारी राख्नुहोस्
```

## प्रदर्शन परीक्षण

प्रदर्शन परीक्षण उत्पादन MCP सर्भरहरूको लागि अत्यावश्यक छ।

### के मापन गर्ने

1. **ढिलाइ**: अनुरोधहरूको प्रतिक्रिया समय
2. **थ्रूपुट**: प्रति सेकेण्ड व्यवस्थापन गरिएका अनुरोधहरू
3. **स्रोत उपयोग**: CPU, मेमोरी, नेटवर्क उपयोग
4. **समांतर ह्यान्डलिंग**: समानान्तर अनुरोधहरूमा व्यवहार
5. **स्केलिङ विशेषताहरू**: लोड बढ्दा प्रदर्शन

### प्रदर्शन परीक्षणका लागि उपकरणहरू

- **k6**: खुला स्रोत लोड परीक्षण उपकरण
- **JMeter**: समग्र प्रदर्शन परीक्षण
- **Locust**: पाइथन आधारित लोड परीक्षण
- **Azure Load Testing**: क्लाउड-आधारित प्रदर्शन परीक्षण

### उदाहरण: k6 सँग आधारभूत लोड टेस्ट

```javascript
// MCP सर्भरको लोड परीक्षणको लागि k6 स्क्रिप्ट
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // १० भर्चुअल प्रयोगकर्ता
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

तपाईका परीक्षणहरू स्वचालित बनाएर गुणस्तर निरन्तरता र छिटो प्रतिक्रिया सुनिश्चित गर्नुहोस्।

### CI/CD एकीकरण

1. **पुल अनुरोधहरूमा एकाइ परीक्षणहरू चलाउनुहोस्**: कोड परिवर्तनले अस्तित्वमा रहेका कार्यक्षमताहरू बिग्रन्छ भन्ने नहोस्
2. **स्टेजिङमा एकीकरण परीक्षणहरू**: प्रि-प्रोडक्सन वातावरणहरूमा एकीकरण परीक्षणहरू चलाउनुहोस्  
3. **प्रदर्शन आधाररेखा**: रिग्रेसनहरू पक्रन प्रदर्शन मापदण्डहरू कायम राख्नुहोस्  
4. **सुरक्षा स्क्यानहरू**: पाइपलाइनको भागको रूपमा सुरक्षा परीक्षण स्वचालित गर्नुहोस्  

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
  
## MCP विनिर्देशनसँग अनुपालनको लागि परीक्षण

तपाईंको सर्भरले सही रूपमा MCP विनिर्देशन लागू गरेको छ कि छैन भेरिफाइ गर्नुहोस्।

### प्रमुख अनुपालन क्षेत्रहरू

1. **API एन्डप्वाइन्टहरू**: आवश्यक एन्डप्वाइन्टहरू परीक्षण गर्नुहोस् (/resources, /tools, आदि)  
2. **अनुरोध/प्रतिक्रिया ढाँचा**: स्किमा अनुपालन मान्य पार्नुहोस्  
3. **त्रुटि कोडहरू**: विभिन्न परिदृश्यहरूको लागि सही स्थिति कोडहरू भेरिफाइ गर्नुहोस्  
4. **सामग्री प्रकारहरू**: विभिन्न सामग्री प्रकारहरूको ह्यान्डलिङ परीक्षण गर्नुहोस्  
5. **प्रमाणीकरण फ्लो**: विनिर्देशन-सम्बन्धित प्रमाणीकरण यन्त्रहरू भेरिफाइ गर्नुहोस्  

### अनुपालन परीक्षण सूट

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
  
## प्रभावकारी MCP सर्भर परीक्षणका लागि शीर्ष 10 सुझावहरू

1. **परीक्षण उपकरण परिभाषाहरू अलग अलग गर्नुहोस्**: उपकरण तर्कबाट स्किमा परिभाषाहरू स्वतन्त्र रूपमा भेरिफाइ गर्नुहोस्  
2. **परिमित परीक्षणहरू प्रयोग गर्नुहोस्**: विविध इनपुटहरू सहित उपकरणहरू परीक्षण गर्नुहोस्, किनाराका मामिलाहरू पनि समावेश गरेर  
3. **त्रुटि प्रतिक्रियाहरू जाँच गर्नुहोस्**: सबै सम्भावित त्रुटि अवस्थाहरूमा उचित त्रुटि ह्यान्डलिङ भेरिफाइ गर्नुहोस्  
4. **अधिकरण तर्क परीक्षण गर्नुहोस्**: विभिन्न प्रयोगकर्ता भूमिकाहरूको लागि उचित पहुँच नियन्त्रण सुनिश्चित गर्नुहोस्  
5. **परीक्षण कभरेज निगरानी गर्नुहोस्**: महत्वपूर्ण मार्ग कोडको उच्च कभरेजको लक्ष्य राख्नुहोस्  
6. **स्ट्रिमिङ प्रतिक्रियाहरू परीक्षण गर्नुहोस्**: स्ट्रिमिङ सामग्रीको उचित ह्यान्डलिङ भेरिफाइ गर्नुहोस्  
7. **नेटवर्क समस्याहरू सिमुलेट गर्नुहोस्**: खराब नेटवर्क अवस्थाहरूमा व्यवहार परीक्षण गर्नुहोस्  
8. **स्रोत सीमा परीक्षण गर्नुहोस्**: कोटा वा दर सीमाहरू पुगेपछि व्यवहार भेरिफाइ गर्नुहोस्  
9. **रिग्रेसन परीक्षण स्वचालित गर्नुहोस्**: हरेक कोड परिवर्तनमा चल्ने सूट बनाउनुहोस्  
10. **परीक्षण केसहरू दस्तावेज गर्नुहोस्**: परीक्षण परिदृश्यहरूको स्पष्ट दस्तावेजीकरण कायम गर्नुहोस्  

## सामान्य परीक्षण समस्याहरू

- **खुसी मार्ग परीक्षणमा अत्यधिक निर्भरता**: त्रुटि केसहरू पूर्ण रूपमा परीक्षण गर्न निश्चित हुनुहोस्  
- **प्रदर्शन परीक्षण बेवास्ता गर्नुहोस्**: उत्पादनमा प्रभाव पर्ने अघिनै बोटलनेक्सहरू पहिचान गर्नुहोस्  
- **अलग अलग मात्र परीक्षण गर्नुहोस्**: इकाई, एकीकरण, र E2E परीक्षणहरू संयोजन गर्नुहोस्  
- **अपूर्ण API कभरेज**: सबै एन्डप्वाइन्टहरू र सुविधाहरू परीक्षण भएको सुनिश्चित गर्नुहोस्  
- **असंगत परीक्षण वातावरणहरू**: निश्चित परीक्षण वातावरणहरूको लागि कन्टेनरहरू प्रयोग गर्नुहोस्  

## निष्कर्ष

विश्वसनीय, उच्च गुणस्तरको MCP सर्भर विकासका लागि व्यापक परीक्षण रणनीति आवश्यक छ। यस गाइडमा उल्लिखित उत्कृष्ट अभ्यासहरू र सुझावहरू कार्यान्वयन गरेर, तपाईंको MCP कार्यान्वयनहरूले सबैभन्दा उच्च गुणस्तर, विश्वसनीयता, र प्रदर्शन मापदण्डहरू पुरा गर्छन् भन्ने सुनिश्चित गर्न सकिन्छ।  

## मुख्य सिकाइहरू

1. **उपकरण डिजाइन**: एकल जिम्मेवारी सिद्धान्त पालन गर्नुहोस्, निर्भरता इंजेक्शन प्रयोग गर्नुहोस्, र संयोजनीयताको लागि डिजाइन गर्नुहोस्  
2. **स्किमा डिजाइन**: स्पष्ट, राम्रोसँग दस्तावेज गरिएको स्किमा बनाउनुहोस् जसमा उचित मान्यकरण प्रतिबन्धहरू हुनेछन्  
3. **त्रुटि ह्यान्डलिङ**: सुव्यवस्थित त्रुटि ह्यान्डलिङ, संरचित त्रुटि प्रतिक्रियाहरू, र पुन: प्रयास तर्क लागू गर्नुहोस्  
4. **प्रदर्शन**: क्यासिङ, एसिंक्रोनस प्रसंस्करण, र स्रोत थ्रोटलिङ प्रयोग गर्नुहोस्  
5. **सुरक्षा**: विस्तृत इनपुट मान्यकरण, अधिकरण जाँचहरू, र संवेदनशील डाटा ह्यान्डलिङ लागू गर्नुहोस्  
6. **परीक्षण**: व्यापक इकाई, एकीकरण, र अन्त्य-देखि-अन्त्य परीक्षणहरू सिर्जना गर्नुहोस्  
7. **वर्कफ्लो ढाँचा**: चेनहरू, डिस्प्याचरहरू, र समानान्तर प्रसंस्करण जस्ता स्थापित ढाँचाहरू लागू गर्नुहोस्  

## अभ्यास

कागजात प्रशोधन प्रणालीको लागि MCP उपकरण र वर्कफ्लो डिजाइन गर्नुहोस् जसले:

1. बहु ढाँचाहरूमा (PDF, DOCX, TXT) कागजातहरू स्वीकार गर्दछ  
2. कागजातबाट पाठ र मुख्य जानकारी निकाल्छ  
3. कागजातहरू प्रकार र सामग्री अनुसार वर्गीकृत गर्दछ  
4. प्रत्येक कागजातको सारांश सिर्जना गर्दछ  

सबै भन्दा उपयुक्त उपकरण स्किमाहरू, त्रुटि ह्यान्डलिङ, र वर्कफ्लो ढाँचाहरू कार्यान्वयन गर्नुहोस्। तपाईं यस कार्यान्वयनलाई कसरी परीक्षण गर्नुहुनेछ भन्ने पनि विचार गर्नुहोस्।  

## स्रोतहरू

1. नयाँ विकासहरूमा अपडेट रहन [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) मा MCP समुदायसँग सम्मिलित हुनुहोस्  
2. खुला स्रोत [MCP परियोजनाहरू](https://github.com/modelcontextprotocol) मा योगदान गर्नुहोस्  
3. आफ्नो संस्थाको AI पहलहरूमा MCP सिद्धान्तहरू लागू गर्नुहोस्  
4. आफ्नो उद्योगका लागि विशेष MCP कार्यान्वयनहरू अन्वेषण गर्नुहोस्  
5. बहु-मोडल एकीकरण वा एन्त्रप्राइज एप्लिकेशन एकीकरण जस्ता विशिष्ट MCP विषयमा उन्नत पाठ्यक्रमहरू लिन विचार गर्नुहोस्  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) मार्फत सिकेको सिद्धान्त प्रयोग गरेर आफ्नै MCP उपकरण र वर्कफ्लोहरू निर्माण गर्ने प्रयास गर्नुहोस्  

## के आउँदै छ

अर्को: [केस अध्ययनहरू](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->