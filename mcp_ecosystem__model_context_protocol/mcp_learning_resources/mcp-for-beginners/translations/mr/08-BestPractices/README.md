# MCP विकास सर्वोत्तम पद्धती

[![MCP विकास सर्वोत्तम पद्धती](../../../translated_images/mr/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(या धड्याच्या व्हिडिओसाठी वर दिलेल्या प्रतिमेक्लिक करा)_

## आढावा

हा धडा उत्पादन वातावरणात MCP सर्व्हर्स आणि वैशिष्ट्ये विकसित करणे, चाचणी घेणे आणि तैनात करण्यासाठी प्रगत सर्वोत्तम पद्धतींवर लक्ष केंद्रित करतो. MCP परिसंस्था जसे जास्तीच्या गुंतागुंतीच्या आणि महत्त्वाच्या बनतात, तसेच स्थापित नमुन्यांचे पालन केल्यामुळे विश्वासार्हता, देखभालयोग्यता आणि परस्परसंवाद सुनिश्चित होतो. हा धडा वास्तविक जगातील MCP अंमलबजावणींपासून प्राप्त व्यावहारिक ज्ञान एकत्र करतो जेणेकरून प्रभावी संसाधने, प्रॉम्प्ट्स आणि साधने वापरुन आपण मजबूत, कार्यक्षम सर्व्हर्स तयार करू शकता.

## शिकण्याची उद्दिष्टे

या धड्याच्या शेवटी, आपण करू शकाल:

- MCP सर्व्हर आणि वैशिष्ट्य डिझाइनमध्ये उद्योगातील सर्वोत्तम पद्धती लागू करणे
- MCP सर्व्हर साठी व्यापक चाचणी धोरणे तयार करणे
- गुंतागुंतीच्या MCP अनुप्रयोगांसाठी कार्यक्षम, पुनर्वापरयोग्य वर्कफ्लो नमुने डिझाइन करणे
- MCP सर्व्हरमध्ये योग्य त्रुटी हाताळणी, लॉगिंग आणि निरीक्षण लागू करणे
- कार्यक्षमता, सुरक्षा आणि देखभालयोग्यता साठी MCP अंमलबजावणी अनुकूलित करणे

## MCP मुख्य तत्त्वे

विशिष्ट अंमलबजावणी पद्धतीत प्रवेश करण्यापूर्वी, प्रभावी MCP विकासासाठी मार्गदर्शक मुख्य तत्त्वे समजून घेणे महत्त्वाचे आहे:

1. **मानकीकृत संवाद**: MCP ची पायाभूत बिघड सुरु करण्यासाठी JSON-RPC 2.0 वापरतो, जे विनंत्या, प्रतिसाद आणि त्रुटी हाताळणी साठी सर्व अंमलबजावणींमध्ये सुसंगत स्वरूप प्रदान करते.

2. **वापरकर्ता-केंद्रित डिझाईन**: आपल्या MCP अंमलबजावणीत नेहमी वापरकर्त्याची संमती, नियंत्रण आणि पारदर्शकता प्राधान्य द्या.

3. **सुरक्षितता प्रथम**: प्रमाणीकरण, प्राधिकरण, प्रमाणीकरण, आणि दर मर्यादिती यांसहित मजबूत सुरक्षा उपाय अंमलात आणा.

4. **मॉड्युलर आर्किटेक्चर**: आपल्या MCP सर्व्हर्सचे डिझाईन असे करा की प्रत्येक साधन आणि संसाधनाचे स्पष्ट, केंद्रित हेतू असावेत.

5. **स्थितीपूर्ण संपर्क**: अधिक सुसंगत आणि संदर्भासह संवादासाठी MCP ची अनेक विनंत्यांमधील स्थिती राखण्याची क्षमता वापरा.

## अधिकृत MCP सर्वोत्तम पद्धती

खालील सर्वोत्तम पद्धती Model Context Protocol च्या अधिकृत दस्तऐवजापासून घेतल्या आहेत:

### सुरक्षा सर्वोत्तम पद्धती

1. **वापरकर्ता संमती आणि नियंत्रण**: डेटा प्रवेश किंवा ऑपरेशन्स करण्यापूर्वी नेहमी स्पष्ट वापरकर्ता संमतीची गरज भरा. कोणता डेटा सामायिक केला जातो आणि कोणते क्रिया अधिकृत आहेत हे स्पष्ट नियंत्रण द्या.

2. **डेटा गोपनीयता**: वापरकर्त्याच्या स्पष्ट संमतीनेच डेटा उघडा आणि योग्य प्रवेश नियंत्रणांसह त्याचे रक्षण करा. अनधिकृत डेटा प्रसाराविरोधात संरक्षण करा.

3. **साधन सुरक्षितता**: कोणतेही साधन चालविण्यापूर्वी स्पष्ट वापरकर्ता संमतीची आवश्यकता भरा. वापरकर्त्यांना प्रत्येक साधनाची कार्यक्षमता समजून घेण्यासाठी सुनिश्चित करा आणि मजबूत सुरक्षा सीमा अंमलात आणा.

4. **साधन परवानगी नियंत्रण**: सेशन दरम्यान कोणती साधने वापरता येतील हे कॉन्फिगर करा, जेणेकरुन फक्त स्पष्टपणे अधिकृत साधनांसाठी प्रवेश असेल.

5. **प्रमाणीकरण**: API की, OAuth टोकन किंवा इतर सुरक्षित प्रमाणीकरण पद्धती वापरून साधने, संसाधने किंवा संवेदनशील ऑपरेशन्ससाठी योग्य प्रमाणीकरण आवश्यक आहे.

6. **परामीटर प्रमाणीकरण**: सर्व साधन कॉल्ससाठी प्रमाणीकरण लागू करा जेणेकरून बांधकाम खराब होणारी किंवा खराब हेतूचे इनपुट साधनांपर्यंत पोहोचू नये.

7. **दर मर्यादिती**: दुरुपयोग टाळण्यासाठी आणि सर्व्हर संसाधनांच्या न्याय्य वापरासाठी दर मर्यादिती लागू करा.

### अंमलबजावणी सर्वोत्तम पद्धती

1. **क्षमता वाटाघाटी**: कनेक्शन स्थापनेदरम्यान समर्थित वैशिष्ट्ये, प्रोटोकॉल आवृत्त्या, उपलब्ध साधने आणि संसाधनांची माहिती विनिमय करा.

2. **साधन डिझाईन**: monolithic साधने ज्यामध्ये अनेक चिंता हाताळल्या जातात त्याऐवजी एकच कार्य नीट पार पाडणारी केंद्रित साधने तयार करा.

3. **त्रुटी हाताळणी**: समस्या शोधण्यासाठी, अपयश सौम्यतेने हाताळण्यासाठी आणि उपयुक्त अभिप्राय देण्यासाठी मानक त्रुटी संदेश आणि कोड अंमलात आणा.

4. **लॉगिंग**: प्रोटोकॉलच्या संवादाचा लेखा-जोखा, डीबगिंग आणि निरीक्षणासाठी संरचित लॉग कॉन्फिगर करा.

5. **प्रगती ट्रॅकिंग**: दीर्घकालीन ऑपरेशन्ससाठी प्रगती अद्यतने द्या ज्यामुळे संवेदनशील वापरकर्ता इंटरफेस सक्षम होतात.

6. **विनंती रद्द करा**: जे विनंती इन-फ्लाइट आहेत आणि आता आवश्यक नाहीत किंवा फार वेळ घेत आहेत त्यांना क्लायंट्स रद्द करू शकतात.

## अतिरिक्त संदर्भ

MCP सर्वोत्तम पद्धतींसाठी ताजी माहिती साठी पाहा:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - सुरक्षा धोके आणि प्रतिबंध
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - हाताळणी सुरक्षा प्रशिक्षण

## व्यावहारिक अंमलबजावणी उदाहरणे

### साधन डिझाईन सर्वोत्तम पद्धती

#### 1. एकल जबाबदारी तत्त्व

प्रत्येक MCP साधनाचे स्पष्ट, केंद्रित उद्दिष्ट असावे. एकाच वेळी अनेक चिंता हाताळणाऱ्या monolithic साधनांच्या ऐवजी विशिष्ट कामे करणारी विशेषीकृत साधने विकसित करा.

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

#### 2. सातत्यपूर्ण त्रुटी हाताळणी

सुस्पष्ट त्रुटी संदेश आणि योग्य पुनर्प्राप्ती यंत्रणा यांसह मजबूत त्रुटी हाताळणी अंमलात आणा.

```python
# सर्वसमावेशक त्रुटी हाताळणीसहित Python उदाहरण
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # पॅरामीटर प्रमाणीकरण
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # सुरक्षा प्रमाणीकरण
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # टाइमआउटसह डेटाबेस ऑपरेशन
                async with timeout(10):  # 10 सेकंदांचा टाइमआउट
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # कनेक्शन त्रुटी तात्पुरत्या असू शकतात
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # क्वेरी त्रुटी बहुतेक ग्राहकांच्या त्रुटी आहेत
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # साधन-विशिष्ट त्रुटींना परवानगी द्या
            raise
        except Exception as e:
            # अनपेक्षित त्रुटींसाठी सर्वकाही पकडा
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL इंजेक्शन शोधण्याची अंमलबजावणी
        pass
        
    def _log_error(self, message, error):
        # त्रुटी नोंदणीची अंमलबजावणी
        pass
```

#### 3. परामीटर प्रमाणीकरण

त्रुटीपूर्ण किंवा दुष्ट इनपुट टाळण्यासाठी नेहमी परामीटर काळजीपूर्वक प्रमाणीकरण करा.

```javascript
// तपशीलवार पॅरामीटर प्रमाणीकरणासह JavaScript/TypeScript उदाहरण
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
    // 1. पॅरामीटर उपस्थितीचे प्रमाणीकरण करा
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. पॅरामीटर प्रकारांचे प्रमाणीकरण करा
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. पॅरामीटर मूल्यांचे प्रमाणीकरण करा
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. लेखन क्रियेसाठी मजकूर उपस्थितीचे प्रमाणीकरण करा
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. पथ सुरक्षा प्रमाणीकरण
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // प्रमाणीकरण केलेल्या पॅरामीटर्सवर आधारित अंमलबजावणी
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // पथ सुरक्षा तपासणीची अंमलबजावणी
    // ...
  }
}
```

### सुरक्षा अंमलबजावणी उदाहरणे

#### 1. प्रमाणीकरण आणि प्राधिकरण

```java
// प्रामाणीकरण आणि प्राधिकरणासह Java उदाहरण
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // अवलंबित्व इंजेक्शन
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
        // 1. प्रामाणीकरण संदर्भ काढा
        String authToken = request.getContext().getAuthToken();
        
        // 2. वापरकर्त्याचा प्रामाणीकरण करा
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. विशिष्ट ऑपरेशनसाठी प्राधिकरण तपासा
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. अधिकृत ऑपरेशनसह पुढे जा
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

#### 2. दर मर्यादिती

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

## चाचणी सर्वोत्तम पद्धती

### 1. एकक चाचणी MCP साधनांसाठी

आपली साधने स्वतंत्रपणे चाचणी घ्या, बाह्य अवलंबनांचे मॉकिंग करा:

```typescript
// टाइपस्क्रिप्ट उदाहरण उपकरण युनिट चाचणीचे
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // एक मॉक हवामान सेवा तयार करा
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // मॉक अवलंबित्वासह उपकरण तयार करा
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // आयोजन करा
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // कृती करा
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // खात्री करा
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // आयोजन करा
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // कृती करा आणि खात्री करा
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. एकत्रीकरण चाचणी

क्लायंट मागण्या ते सर्व्हर प्रतिसाद यांची संपूर्ण प्रक्रिया चाचणी करा:

```python
# पायथन एकत्रीकरण चाचणी उदाहरण
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # चाचणी सर्व्हर सुरू करा
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # एक क्लायंट तयार करा
        client = McpClient("http://localhost:5000")
        
        # साधन शोधण्याची चाचणी करा
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # साधन अंमलबजावणीची चाचणी करा
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # प्रतिसादाची पडताळणी करा
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # साफसफाई करा
        await server.stop()
```

## कार्यक्षमता अनुकूलन

### 1. कॅशिंग धोरणे

विलंब आणि संसाधन वापर कमी करण्यासाठी योग्य कॅशिंग लागू करा:

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

#### 2. डिपेंडन्सी इंजेक्शन आणि चाचणीयोग्यता

साधने त्यांच्या निर्भरता कन्स्ट्रक्टर इंजेक्शनमार्फत मिळवतील असे डिझाइन करा, ज्यामुळे ती चाचणीयोग्य आणि कॉन्फिगरेबल होतील:

```java
// dependency injection सह Java उदाहरण
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // constructor द्वारे dependencies चे इन्जेक्शन
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // साधन अंमलबजावणी
    // ...
}
```

#### 3. कंपोजेबल साधने

जास्त गुंतागुंतीचे वर्कफ्लो तयार करण्यासाठी साधने एकत्र करून डिझाइन करा:

```python
# कंपोजेबल साधने दाखवणारे पायथन उदाहरण
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # अमलबजावणी...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # हा साधन dataFetch साधनाच्या निकालांचा उपयोग करू शकतो
    async def execute_async(self, request):
        # अमलबजावणी...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # हा साधन dataAnalysis साधनाच्या निकालांचा उपयोग करू शकतो
    async def execute_async(self, request):
        # अमलबजावणी...
        pass

# हे साधने स्वतंत्रपणे किंवा कार्यप्रवाहाचा भाग म्हणून वापरली जाऊ शकतात
```

### स्कीमा डिझाईन सर्वोत्तम पद्धती

स्कीमा हा मॉडेल आणि आपल्या साधनातील करार आहे. चांगले डिझाइन केलेले स्कीमा साधन वापरास अधिक सुलभ करतात.

#### 1. स्पष्ट परामीटर वर्णने

प्रत्येक परामीटरसाठी वर्णन संबंधी माहिती नेहमी समाविष्ट करा:

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

#### 2. प्रमाणीकरण मर्यादा

अवैध इनपुट प्रतिबंधासाठी प्रमाणीकरण मर्यादा समाविष्ट करा:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // स्वरूप पडताळणीसह ईमेल मालमत्ता
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // संख्यात्मक अटींसह वयाचे वैशिष्ट्य
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // एन्युमरेटेड मालमत्ता
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

#### 3. सातत्यपूर्ण प्रतिसाद संरचना

मॉडेलना निकाल समजावून घ्यण्यास सोपे व्हावे म्हणून तुमच्या प्रतिसाद संरचनांमध्ये सातत्य राखा:

```python
async def execute_async(self, request):
    try:
        # विनंती प्रक्रिया करा
        results = await self._search_database(request.parameters["query"])
        
        # नेहमी सातत्यपूर्ण रचना परत करा
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

### त्रुटी हाताळणी

MCP साधनांची विश्वासार्हता राखण्यासाठी मजबूत त्रुटी हाताळणी अत्यावश्यक आहे.

#### 1. सुखद त्रुटी हाताळणी

योग्य पातळीवर त्रुटी हाताळा आणि माहितीपूर्ण संदेश द्या:

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

#### 2. संरचित त्रुटी प्रतिसाद

संभाव्य असल्यास संरचित त्रुटी माहिती परत द्या:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // अंमलबजावणी
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
        
        // इतर अपवादांना ToolExecutionException म्हणून पुन्हा उछाला
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. पुनर्प्रयत्न तंत्रज्ञान

अस्थायी अपयशांसाठी योग्य पुनर्प्रयत्न तंत्रज्ञान अंमलात आणा:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # सेकंद
    
    while retry_count < max_retries:
        try:
            # बाह्य API कॉल करा
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # घातांकी परतावा
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # अस्थायी त्रुटी नाही, पुनः प्रयत्न करू नका
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### कार्यक्षमता अनुकूलन

#### 1. कॅशिंग

खर्चिक ऑपरेशन्ससाठी कॅशिंग लागू करा:

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

#### 2. असिंक्रोनस प्रक्रिया

I/O-बाधित ऑपरेशन्ससाठी असिंक्रोनस प्रोग्रामिंग पॅटर्न वापरा:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // दीर्घकालीन ऑपरेशन्ससाठी, त्वरित प्रक्रिया आयडी परत करा
        String processId = UUID.randomUUID().toString();
        
        // असिंक्रोनस प्रक्रिया सुरू करा
        CompletableFuture.runAsync(() -> {
            try {
                // दीर्घकालीन ऑपरेशन करा
                documentService.processDocument(documentId);
                
                // स्थिती अद्यतनित करा (सामान्यतः डेटाबेसमध्ये संग्रहित केली जाते)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // प्रक्रिया आयडीसह त्वरित प्रतिसाद परत करा
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // साथीदार स्थिती तपासणी साधन
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

#### 3. संसाधन नियंत्रण

ओव्हरलोड टाळण्यासाठी संसाधन नियंत्रण लागू करा:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # प्रती सेकंद 5 विनंत्यांना परवानगी द्या
            bucket_size=10        # 10 विनंत्यांपर्यंत अचानक वाढीस परवानगी द्या
        )
    
    async def execute_async(self, request):
        # आपण पुढे जाऊ शकतो का किंवा थांबावे लागेल का ते तपासा
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # जर थांबण्याचा वेळ खूप जास्त असेल
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # योग्य विलंब वेळेसाठी थांबा
                await asyncio.sleep(delay)
        
        # एका टोकनचा वापर करा आणि विनंतीसह पुढे चालू ठेवा
        self.rate_limiter.consume()
        
        # API कॉल करा
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
            
            # पुढील टोकन उपलब्ध होईपर्यंतचा वेळ गणना करा
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # गेल्या वेळेनुसार नवीन टोकन जोडा
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### सुरक्षा सर्वोत्तम पद्धती

#### 1. इनपुट प्रमाणीकरण

इनपुट परामीटर्स नेहमी काळजीपूर्वक प्रमाणीकरण करा:

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

#### 2. प्राधिकरण तपासणी

योग्य प्राधिकरण तपासणी अंमलात आणा:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // विनंतीमधून वापरकर्ता संदर्भ मिळवा
    UserContext user = request.getContext().getUserContext();
    
    // वापरकर्त्याकडे आवश्यक परवानग्या आहेत का ते तपासा
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // विशिष्ट संसाधनांसाठी, त्या संसाधनाचा प्रवेश तपासा
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // साधन कार्यान्वयनास पुढे जा
    // ...
}
```

#### 3. संवेदनशील डेटा हाताळणी

संवेदनशील डेटाच्या हाताळणीमध्ये काळजी घ्या:

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
        
        # वापरकर्ता डेटा मिळवा
        user_data = await self.user_service.get_user_data(user_id)
        
        # स्पष्टपणे विनंती AND अधिकृत नसल्यास संवेदनशील फील्ड फिल्टर करा
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # विनंती संदर्भात प्राधिकरण स्तर तपासा
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # मूळ मध्ये बदल होऊ नये यासाठी कॉपी तयार करा
        redacted = user_data.copy()
        
        # विशिष्ट संवेदनशील फील्ड रेडॅक्ट करा
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # अंतर्गत संवेदनशील डेटा रेडॅक्ट करा
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP साधनांसाठी चाचणी सर्वोत्तम पद्धती

व्यापक चाचणी सुनिश्चित करते की MCP साधने योग्य प्रकारे काम करतात, कोपऱ्याच्या केसेस हाताळतात आणि सिस्टमशी योग्यरित्या एकत्र येतात.

### एकक चाचणी

#### 1. प्रत्येक साधन स्वतंत्र चाचणी करा

प्रत्येक साधनाच्या कार्यक्षमतेसाठी केंद्रित चाचण्या तयार करा:

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

#### 2. स्कीमा प्रमाणीकरण चाचणी

स्कीमा वैध आहेत आणि योग्य पद्धतीने मर्यादा लादतात का ते चाचणी करा:

```java
@Test
public void testSchemaValidation() {
    // साधन उदाहरण तयार करा
    SearchTool searchTool = new SearchTool();
    
    // योजना मिळवा
    Object schema = searchTool.getSchema();
    
    // पडताळणीसाठी योजना JSON मध्ये रूपांतरित करा
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // योजना वैध JSONSchema आहे का ते पडताळा
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // वैध पॅरामिटर्स तपासा
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // आवश्यक पॅरामीटर गायब असल्याचे तपासा
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // अवैध पॅरामीटर प्रकार तपासा
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. त्रुटी हाताळणी चाचण्या

विशिष्ट त्रुटी परिस्थितीसाठी चाचण्या तयार करा:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # व्यवस्था करा
    tool = ApiTool(timeout=0.1)  # खूप लहान टाइमआउट
    
    # टाइमआउट होईल असा विनंती मॉक करा
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # टाइमआउटपेक्षा जास्त वेळ
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # कृती करा आणि पडताळणी करा
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवाद संदेशाची पुष्टी करा
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # व्यवस्था करा
    tool = ApiTool()
    
    # दरमर्यादित प्रतिसाद मॉक करा
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
        
        # कृती करा आणि पडताळणी करा
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवादात दरमर्यादा माहिती आहे का ते तपासा
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### एकत्रिकरण चाचणी

#### 1. साधन साखळी चाचणी

अपेक्षित संयोजनांत साधने एकत्र काम करत असल्याची चाचणी करा:

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

#### 2. MCP सर्व्हर चाचणी

पूर्ण साधन नोंदणी आणि अंमलबजावणीसह MCP सर्व्हर चाचणी करा:

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
        // शोध एन्डपॉईंटची चाचणी करा
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // टूल विनंती तयार करा
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // विनंती पाठवा आणि प्रतिसाद तपासा
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // अवैध टूल विनंती तयार करा
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" हा पॅरामीटर गहाळ आहे
        request.put("parameters", parameters);
        
        // विनंती पाठवा आणि त्रुटी प्रतिसाद तपासा
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. एंड-टू-एंड चाचणी

मॉडेल प्रॉम्प्ट ते साधन कार्यान्वयन या संपूर्ण वर्कफ्लोची चाचणी करा:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # सेट अप करा - MCP क्लायंट आणि मॉक मॉडेल सेट करा
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # मॉक मॉडेल प्रतिसाद
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
    
    # मॉक हवामान टूल प्रतिसाद
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
        
        # क्रिया करा
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # निश्चित करा
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### कार्यक्षमता चाचणी

#### 1. लोड चाचणी

आपल्या MCP सर्व्हरवर किती एकाचवेळी विनंती करणे शक्य आहे ते चाचणी करा:

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

#### 2. तणाव चाचणी

अत्यंत लोडखाली प्रणालीची चाचणी करा:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // स्ट्रेस चाचणीसाठी JMeter सेट करा
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter चाचणी योजना कॉन्फिगर करा
    HashTree testPlanTree = new HashTree();
    
    // चाचणी योजना, थ्रेड गट, सॅम्पलर्स इत्यादी तयार करा
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // टूल अंमलबजावणीसाठी HTTP सॅम्पलर जोडा
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // लिसनर्स जोडा
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // चाचणी चालवा
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // निकालांची पडताळणी करा
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // सरासरी प्रतिसाद वेळ < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90वा टक्केवारी < 500ms
}
```

#### 3. निरीक्षण आणि प्रोफाइलिंग

दीर्घकालीन कार्यक्षमता विश्लेषणासाठी निरीक्षण सेटअप करा:

```python
# MCP सर्व्हरसाठी मॉनिटरिंग सेट करा
def configure_monitoring(server):
    # Prometheus मेट्रिक्स सेट करा
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
    
    # वेळ मोजण्यासाठी आणि मेट्रिक्स रेकॉर्ड करण्यासाठी मिडलवेअर जोडा
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # मेट्रिक्स एन्डपॉइंट उघडा
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP वर्कफ्लो डिझाईन नमुने

चांगले डिझाइन केलेल्या MCP वर्कफ्लोमुळे कार्यक्षमता, विश्वासार्हता आणि देखभालयोग्यता सुधारते. येथे अनुसरण करण्यासाठी प्रमुख नमुने आहेत:

### 1. साधने साखळी नमुना

अनेक साधने अशा अनुक्रमात जोडा जिथे प्रत्येक साधनाचा आउटपुट पुढीलला इनपुट बनतो:

```python
# Python चेन ऑफ टूल्ज अंमलबजावणी
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # अनुक्रमाने चालवण्यासाठी टूल नावांची यादी
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # चेनमधील प्रत्येक टूल चालवा, मागील निकाल पास करत
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # निकाल साठवा आणि पुढील टूलसाठी इनपुट म्हणून वापरा
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# उदाहरण वापराचे
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

### 2. डिस्पॅचर नमुना

इनपुटच्या आधारावर विशिष्ट साधनांकडे डिस्पॅच करणारे केंद्रीकृत साधन वापरा:

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

### 3. समांतर प्रक्रिया नमुना

कार्यक्षमता वाढवण्यासाठी अनेक साधने एकाच वेळी चालवा:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // पायरी 1: डेटासेट मेटाडेटा मिळवा (सिंक्रोनस)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // पायरी 2: अनेक विश्लेषणे समांतर चालवा
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
        
        // सर्व समांतर कार्य पूर्ण होईपर्यंत वाट पहा
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // पूर्णत्वासाठी वाट पहा
        
        // पायरी 3: निकाल एकत्र करा
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // पायरी 4: सारांश अहवाल तयार करा
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // संपूर्ण वर्कफ्लो परिणाम परत करा
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. त्रुटी पुनर्प्राप्ती नमुना

साधन अपयशासाठी सुखद फॉलबॅक अंमलात आणा:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # प्रथम प्राथमिक साधन वापरून पहा
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # अपयश लॉग करा
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # दुय्यम साधन वापरून पहा
            try:
                # फॉलबॅक साधनासाठी पॅरामीटर्स ट्रान्सफॉर्म करावे लागू शकतात
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # दोन्ही साधने अयशस्वी झाली
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # ही अंमलबजावणी विशिष्ट साधनांवर अवलंबून असेल
        # या उदाहरणासाठी, आपण केवळ मूळ पॅरामीटर्स परत करू
        return params

# उदाहरण वापर
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # प्राथमिक (पैसे भरलेले) हवामान API
        "basicWeatherService",    # फॉलबॅक (मोफत) हवामान API
        {"location": location}
    )
```

### 5. वर्कफ्लो कंपोजीशन नमुना

सोप्या वर्कफ्लो एकत्र करून जास्त गुंतागुंतीची वर्कफ्लो तयार करा:

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

# MCP सर्व्हर्सची चाचणी: सर्वोत्तम पद्धती आणि टॉप सूचना

## आढावा

चाचणी ही विश्वासार्ह, उच्च-गुणवत्तेच्या MCP सर्व्हर्सच्या विकासाचा महत्त्वाचा भाग आहे. हा मार्गदर्शक आपल्या MCP सर्व्हर्सच्या विकास जीवनचक्रात युनिट चाचण्यांपासून एकत्रिकरण चाचण्यांपर्यंत आणि एंड-टू-एंड प्रमाणीकरणापर्यंत सर्वसमावेशक सर्वोत्तम पद्धती आणि सूचना प्रदान करतो.

## MCP सर्व्हर्ससाठी चाचणी का महत्त्वाची आहे

MCP सर्व्हर्स AI मॉडेल्स आणि क्लायंट अनुप्रयोगांमधील महत्वाचा मिडलवेयर म्हणून काम करतात. सखोल चाचणी सुनिश्चित करते:

- उत्पादन वातावरणात विश्वासार्हता
- विनंत्या आणि प्रतिसादांची अचूक हाताळणी
- MCP विनिर्देशांची योग्य अंमलबजावणी
- अपयश आणि कोपऱ्याच्या प्रकरणांविरुद्ध टिकाऊपणा
- विविध लोड अंतर्गत सातत्यपूर्ण कार्यक्षमता

## MCP सर्व्हर्ससाठी युनिट चाचणी

### युनिट चाचणी (पायाभूत)

युनिट चाचण्यांमध्ये आपल्या MCP सर्व्हरचे वेगळे घटक स्वतंत्रपणे तपासले जातात.

#### काय चाचणी कराल

1. **संसाधन हँडलर्स**: प्रत्येक संसाधन हँडलरच्या तार्किकतेची स्वतंत्रपणे चाचणी करा
2. **साधन अंमलबजावणी**: विविध इनपुटसह साधनांच्या वर्तनाचे परीक्षण करा
3. **प्रॉम्प्ट टेम्प्लेट्स**: प्रॉम्प्ट टेम्प्लेट योग्यरित्या रेंडर होतात का याची खात्री करा
4. **स्कीमा प्रमाणीकरण**: परामीटर प्रमाणीकरण लॉजिकची चाचणी करा
5. **त्रुटी हाताळणी**: अवैध इनपुटसाठी त्रुटी प्रतिसादांचे परीक्षण करा

#### युनिट चाचणीसाठी सर्वोत्तम पद्धती

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
# पायथॉनमधील कॅल्क्युलेटर साधनासाठी उदाहरण युनिट चाचणी
def test_calculator_tool_add():
    # व्यवस्था करा
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # कृती करा
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # खात्री करा
    assert result["value"] == 12
```

### एकत्रिकरण चाचणी (मध्य पातळी)

एकत्रिकरण चाचणीमध्ये आपल्या MCP सर्व्हरच्या घटकांमधील परस्परसंवाद तपासले जातात.

#### काय चाचणी कराल

1. **सर्व्हर प्रारंभ**: विविध कॉन्फिगरेशनसह सर्व्हर सुरु करण्याची चाचणी करा
2. **रूट नोंदणी**: सर्व API एंडपॉइंट्स योग्यरित्या नोंदणीकृत आहेत का याची तपासणी करा
3. **विनंती प्रक्रिया**: पूर्ण विनंती-प्रतिसाद सायकल तपासा
4. **त्रुटी प्रसार**: घटकांदरम्यान त्रुटी योग्यरित्या हाताळल्या जातात का याची खात्री करा
5. **प्रमाणीकरण आणि प्राधिकरण**: सुरक्षा यंत्रणा तपासा

#### एकत्रिकरण चाचणीसाठी सर्वोत्तम पद्धती

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

### एंड-टू-एंड चाचणी (वरची पातळी)

एंड-टू-एंड चाचणीमध्ये क्लायंट पासून सर्व्हरपर्यंत संपूर्ण प्रणालीचे वर्तन तपासले जाते.

#### काय चाचणी कराल

1. **क्लायंट-सर्व्हर संवाद**: संपूर्ण विनंती-प्रतिसाद सायकल तपासा
2. **खरे क्लायंट SDKs**: वास्तविक क्लायंट अंमलबजावणीसह चाचणी करा
3. **लोड अंतर्गत कार्यक्षमता**: अनेक एकाचवेळी विनंतीसह वर्तन तपासा
4. **त्रुटी पुनर्प्राप्ती**: अपयशांपासून प्रणाली पुनर्प्राप्ती तपासा
5. **दीर्घकालीन ऑपरेशन्स**: स्ट्रीमिंग आणि दीर्घकालीन ऑपरेशन्सचे हाताळणी तपासा

#### एंड-टू-एंड चाचणीसाठी सर्वोत्तम पद्धती

```typescript
// Typescript मध्ये क्लायंटसह उदाहरण E2E चाचणी
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // चाचणी वातावरणात सर्व्हर प्रारंभ करा
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // क्रिया करा
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // पुष्टी करा
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP चाचणीसाठी मॉकिंग धोरणे

मॉकिंग चाचणी दरम्यान घटक वेगळे करण्यासाठी आवश्यक आहे.

### घटक मॉक करण्यासाठी

1. **बाह्य AI मॉडेल्स**: विश्वासार्ह चाचणीसाठी मॉडेल प्रतिसाद मॉक करा
2. **बाह्य सेवा**: API अवलंबन (डेटाबेस, तृतीय-पक्ष सेवा) मॉक करा
3. **प्रमाणीकरण सेवा**: ओळख प्रदात्यांचे मॉकिंग करा
4. **संसाधन प्रदाते**: महागडे संसाधन हँडलर्स मॉक करा

### उदाहरण: AI मॉडेल प्रतिसादाचे मॉकिंग

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
# unittest.mock सह Python उदाहरण
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # मॉक कॉन्फिगर करा
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # चाचणीमध्ये मॉक वापरा
    server = McpServer(model_client=mock_model)
    # चाचणीसह सुरू ठेवा
```

## कार्यक्षमता चाचणी

उत्पादन MCP सर्व्हर्ससाठी कार्यक्षमतेची चाचणी अत्यावश्यक आहे.

### काय मोजाल

1. **विलंब**: विनंत्यांसाठी प्रतिसाद वेळ
2. **थ्रूपुट**: प्रति सेकंद हाताळलेली विनंत्या
3. **संसाधन वापर**: CPU, स्मृती, नेटवर्क वापर
4. **समांतर हाताळणी**: समांतर विनंत्यांखाली वर्तन
5. **स्केलिंग वैशिष्ट्ये**: भार वाढल्यावर कार्यक्षमता

### कार्यक्षमता चाचणीसाठी साधने

- **k6**: मुक्त स्रोत लोड टेस्टिंग साधन
- **JMeter**: व्यापक कार्यक्षमता चाचणी
- **Locust**: पायथन-आधारित लोड टेस्टिंग
- **Azure Load Testing**: क्लाऊड-आधारित कार्यक्षमता चाचणी

### उदाहरण: k6 सह मूलभूत लोड टेस्ट

```javascript
// MCP सर्व्हरसाठी लोड टेस्टिंगसाठी k6 स्क्रिप्ट
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 आभासी वापरकर्ते
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

## MCP सर्व्हर्ससाठी चाचणी ऑटोमेशन

आपल्या चाचण्या स्वयंचलित केल्यामुळे गुणवत्ता सातत्यपूर्ण राहते आणि अभिप्राय साखळी जलद होते.

### CI/CD एकत्रीकरण
1. **पुल रिक्वेस्टवर युनिट टेस्ट चालवा**: खात्री करा की कोड बदलांमुळे विद्यमान कार्यक्षमता बिघडू नये
2. **स्टेजिंगमध्ये इंटिग्रेशन टेस्ट**: प्री-प्रॉडक्शन वातावरणात इंटिग्रेशन टेस्ट चालवा
3. **परफॉर्मन्स बेसलाइन**: परफॉर्मन्स मापदंड राखा जेणेकरून पुनरावृत्ती पकडता येईल
4. **सुरक्षा स्कॅन्स**: पाइपलाइनचा भाग म्हणून सुरक्षा चाचणी स्वयंचलित करा

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

## MCP स्पेसिफिकेशनशी अनुरूपतेसाठी चाचणी

तुमचा सर्व्हर योग्यरित्या MCP स्पेसिफिकेशनची अंमलबजावणी करतो याची पडताळणी करा.

### मुख्य अनुरूपता क्षेत्रे

1. **API एंडपॉइंट्स**: आवश्यक एंडपॉइंट्सची चाचणी करा (/resources, /tools, इत्यादी)
2. **विनंती/प्रतिसाद स्वरूप**: स्कीमा अनुरूपतेची पडताळणी करा
3. **त्रुटी कोड**: विविध परिस्थितींमध्ये योग्य स्थिती कोड तपासा
4. **सामग्री प्रकार**: वेगवेगळ्या सामग्री प्रकारांच्या हाताळणीची चाचणी करा
5. **प्रमाणीकरण प्रवाह**: स्पेक-आधारित प्रमाणीकरण यंत्रणांची पडताळणी करा

### अनुरूपता चाचणी संच

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

## परिणामकारक MCP सर्व्हर चाचणीसाठी टॉप 10 टिप्स

1. **टूल व्याख्याने स्वतंत्रपणे तपासा**: स्कीमा व्याख्यांना टूल लॉजिकपासून वेगळे पडताळा
2. **पॅरामेटरायझड टेस्ट वापरा**: टूल्सना विविध इनपुट्ससह, विशेषतः एज केसांसह तपासा
3. **त्रुटी प्रतिसाद तपासा**: सर्व संभाव्य त्रुटी परिस्थितीसाठी योग्य त्रुटी हाताळणीची पडताळणी करा
4. **प्राधिकरण लॉजिक तपासा**: वेगवेगळ्या वापरकर्त्यांच्या भूमिकांसाठी योग्य प्रवेश नियंत्रण सुनिश्चित करा
5. **चाचणी कव्हरेज मॉनिटर करा**: महत्त्वाच्या मार्गांवरील उच्च कव्हरेज साध्य करा
6. **स्ट्रीमिंग प्रतिसाद तपासा**: स्ट्रीमिंग सामग्रीची योग्य हाताळणी पडताळा
7. **नेटवर्क समस्या सिम्युलेट करा**: खराब नेटवर्क परिस्थितीत वर्तनाची चाचणी करा
8. **संसाधन मर्यादा तपासा**: कोटा किंवा दर मर्यादा पूर्ण केल्यावर वर्तन तपासा
9. **पुनरावृत्ती चाचण्या स्वयंचलित करा**: प्रत्येक कोड बदलावर चालणारा संच तयार करा
10. **चाचणी प्रकरणे डॉ큐मेंट करा**: चाचणी परिस्थितींची स्पष्ट माहिती ठेवा

## सामान्य चाचणीतील अडचणी

- **खुशहाल मार्गावर अति अवलंबित्व**: त्रुटी प्रकरणांची पूर्ण तपासणी करा
- **परफॉर्मन्स चाचणी दुर्लक्षित करणे**: उत्पादनावर परिणाम होण्यापूर्वी अडथळे ओळखा
- **फक्त स्वतंत्रपणे चाचणी करणे**: युनिट, इंटिग्रेशन आणि E2E चाचण्यांचे संयोजन करा
- **अपूर्ण API कव्हरेज**: सर्व एंडपॉइंट्स आणि वैशिष्ट्यांची चाचणी सुनिश्चित करा
- **असमान चाचणी वातावरणे**: एकसारखे वातावरण सुनिश्चित करण्यासाठी कंटेनर वापरा

## निष्कर्ष

विश्वसनीय, उच्च-गुणवत्तेचे MCP सर्व्हर विकसित करण्यासाठी व्यापक चाचणी धोरण आवश्यक आहे. या मार्गदर्शनात दिलेल्या सर्वोत्तम पद्धती आणि टिप्स लागू करून, आपली MCP अंमलबजावण्या गुणवत्ता, विश्वसनीयता आणि कार्यक्षमता या उच्चतम मानकांसाठी पात्र ठरतील.

## मुख्य मुद्दे

1. **टूल डिझाइन**: एकच जबाबदारी तत्त्व पाळा, डिपेंडन्सी इंजेक्शन वापरा, आणि संयोज्यता यासाठी डिझाइन करा
2. **स्कीमा डिझाइन**: स्पष्ट, नीटदर्शविलेले स्कीमा तयार करा ज्यामध्ये योग्य प्रमाणीकरण निर्बंध असतील
3. **त्रुटी हाताळणी**: सुसंवादी त्रुटी हाताळणी, संरचित त्रुटी प्रतिसाद, आणि पुन्हा प्रयत्न लॉजिक लागू करा
4. **परफॉर्मन्स**: कॅशिंग, असिंक्रोनस प्रक्रिया, आणि संसाधन मर्यादा वापरा
5. **सुरक्षा**: पूर्ण इनपुट प्रमाणीकरण, प्राधिकरण तपासणी, आणि संवेदनशील डेटा हाताळणी करा
6. **चाचणी**: संपूर्ण युनिट, इंटिग्रेशन, आणि एंड-टू-एंड चाचण्या तयार करा
7. **वर्कफ्लो नमुने**: साखळी, डिस्पॅचर्स, आणि समांतर प्रक्रिया यांसारखे प्रस्थापित नमुने वापरा

## व्यायाम

एक दस्तऐवज प्रक्रिया प्रणालीसाठी MCP टूल आणि वर्कफ्लो डिझाइन करा जे:

1. अनेक स्वरूपातील दस्तऐवज स्वीकारते (PDF, DOCX, TXT)
2. दस्तऐवजातून मजकूर आणि मुख्य माहिती काढते
3. दस्तऐवजांचे प्रकार आणि सामग्रीनुसार वर्गीकरण करते
4. प्रत्येक दस्तऐवजाचा सारांश तयार करते

टूल स्कीमा, त्रुटी हाताळणी, आणि या परिस्थितीसाठी सर्वोत्तम उपयुक्त वर्कफ्लो नमुना अंमलात आणा. आपण ही अंमलबजावणी कशी चाचणी कराल याचा विचार करा.

## संसाधने

1. MCP समुदायात सामील व्हा [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) येथे टिकून राहण्यासाठी 
2. मुक्त-स्रोत [MCP प्रकल्पांमध्ये योगदान द्या](https://github.com/modelcontextprotocol)
3. आपल्या संस्थेच्या AI पुढाकारांमध्ये MCP तत्त्वे लागू करा
4. आपल्या उद्योगासाठी विशेष MCP अंमलबजावण्या शोधा.
5. मल्टी-मॉडाल इंटिग्रेशन किंवा एंटरप्राईज अ‍ॅप्लिकेशन इंटिग्रेशनसारख्या विशिष्ट MCP विषयांवर प्रगत कोर्सेस घ्या.
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) मधील तत्त्वे वापरून स्वतःचे MCP टूल्स आणि वर्कफ्लो तयार करण्याचा प्रयोग करा

## पुढे काय

पुढे: [केस स्टडीज](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) वापरून भाषांतरित केला गेला आहे. आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात ठेवा की स्वयंचलित भाषांतरांमध्ये चुका किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या स्थानिक भाषेत अधिकृत स्रोत मानला जावा. महत्त्वाची माहिती असल्यास व्यावसायिक मानवी भाषांतर करण्याची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गोंधळ किंवा गैरसमजासाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->