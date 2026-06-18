# MCP विकासासाठी सर्वोत्तम पद्धती

[![MCP विकासासाठी सर्वोत्तम पद्धती](../../../translated_images/mr/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(वरील प्रतिमेवर क्लिक करून या धड्याचा व्हिडिओ पाहा)_

## आढावा

हा धडा उत्पादन वातावरणात MCP सर्व्हर्स आणि वैशिष्ट्ये विकसित, चाचणी आणि तैनात करण्यासाठी प्रगत सर्वोत्तम पद्धतींवर लक्ष केंद्रित करतो. जसे जसे MCP पर्यावरण जटिल आणि महत्त्वपूर्ण होत आहे, तितकेच स्थापित नमुने अनुसरणे विश्वासार्हता, देखभालयोग्यता आणि परस्परसंबंध सुनिश्चित करते. हा धडा वास्तविक जगातील MCP अंमलबजावणीमधून मिळालेली व्यावहारिक ज्ञान एकत्र करतो जेणेकरून तुम्ही प्रभावी संसाधने, प्रांप्ट आणि साधने वापरून मजबूत आणि कार्यक्षम सर्व्हर्स तयार करू शकाल.

## शिकण्याचे उद्दिष्टे

या धड्याच्या शेवटी, तुम्ही सक्षम असाल:

- MCP सर्व्हर आणि वैशिष्ट्यांच्या डिझाइनमध्ये उद्योगातील सर्वोत्तम पद्धती लागू करणे
- MCP सर्व्हरसाठी सर्वसमावेशक चाचणी धोरणे तयार करणे
- जटिल MCP अनुप्रयोगांसाठी कार्यक्षम, पुनरावृत्ती करण्यायोग्य वर्कफ्लो नमुने डिझाइन करणे
- MCP सर्व्हरमध्ये योग्य त्रुटी हाताळणी, लॉगिंग आणि निरीक्षण कार्यान्वित करणे
- कार्यक्षमता, सुरक्षा आणि देखभालता सुधारण्यासाठी MCP अंमलबजावणी ऑप्टिमाइझ करणे

## MCP मुख्य तत्त्वे

विशिष्ट अंमलबजावणी पद्धतींमध्ये जाण्याआधी, अशा कोर तत्त्वांना समजून घेणे महत्वाचे आहे जे प्रभावी MCP विकासाला मार्गदर्शन करतात:

1. **मानकीकृत संवाद**: MCP हे JSON-RPC 2.0 या आधारावर वापरते, जे विनंत्या, प्रतिसाद आणि त्रुटी हाताळणीसाठी सर्व अंमलबजावणींमध्ये सातत्यपूर्ण स्वरूप प्रदान करते.

2. **वापरकर्ता-केंद्रित डिझाइन**: नेहमी वापरकर्त्याचा संमती, नियंत्रण आणि पारदर्शकता प्राधान्य द्या.

3. **सुरक्षा प्रथम**: प्रमाणीकरण, प्राधिकरण, वैधता, आणि दर मर्यादित करण्यासह मजबूत सुरक्षा उपाय अंमलात आणा.

4. **मॉड्यूलर आर्किटेक्चर**: प्रत्येक साधन आणि संसाधनास स्पष्ट, लक्ष केंद्रित उद्दिष्ट प्राप्त करण्यासाठी तुमचे MCP सर्व्हर मॉड्यूलर पद्धतीने डिझाइन करा.

5. **स्थितीपूर्ण कनेक्शन्स**: अनेक विनंत्यांमध्ये स्थिती राखण्याची MCP क्षमता वापरा ज्याने अधिक सुसंगत आणि संदर्भ समजून घेतलेले संवाद शक्य होतात.

## अधिकृत MCP सर्वोत्तम पद्धती

खालील सर्वोत्तम पद्धती Model Context Protocol दस्तऐवजातून घेतलेले आहेत:

### सुरक्षा सर्वोत्तम पद्धती

1. **वापरकर्ता संमती आणि नियंत्रण**: डेटा प्रवेश करण्यापूर्वी किंवा ऑपरेशन्स करण्यापूर्वी नेहमी स्पष्ट वापरकर्ता संमती मागा. कोणता डेटा शेअर केला जातो आणि कोणती क्रिया अधिकृत आहे यावर स्पष्ट नियंत्रण द्या.

2. **डेटा गोपनीयता**: फक्त स्पष्ट संमतीनेच वापरकर्ता डेटा उघडा आणि योग्य प्रवेश नियंत्रणांनी त्याचे रक्षण करा. अनधिकृत डेटा ट्रान्समिशनपासून बचाव करा.

3. **साधन सुरक्षितता**: कोणतेही साधन वापरण्यापूर्वी स्पष्ट वापरकर्ता संमती आवश्यक आहे. वापरकर्त्यांना प्रत्येक साधनाच्या कार्यपद्धतीचा समज द्या आणि मजबूत सुरक्षा मर्यादा लागू करा.

4. **साधन परवानगी नियंत्रण**: सत्रादरम्यान कोणी कोणती साधने वापरू शकते याचे नियोजन करा, जेणेकरून फक्त स्पष्टपणे अधिकृत साधने उपलब्ध असतील.

5. **प्रमाणीकरण**: साधने, संसाधने किंवा संवेदनशील ऑपरेशन्ससाठी प्रवेश देण्याआधी योग्य प्रमाणीकरण आवश्यक आहे, जसे API कीज, OAuth टोकन्स किंवा इतर सुरक्षित प्रमाणीकरण पद्धती.

6. **परिमाण वैधता**: सर्व साधन कॉलसाठी वैधता लागू करा जेणेकरून खराब किंवा हानिकारक इनपुट्स साधन अंमलबजावणीपर्यंत पोहोचू नयेत.

7. **दर मर्यादित करणे**: गैरवापर टाळण्यासाठी आणि सर्व्हर संसाधनांचा न्याय्य वापर सुनिश्चित करण्यासाठी दर मर्यादा लागू करा.

### अंमलबजावणी सर्वोत्तम पद्धती

1. **क्षमता वाटाघाटी**: कनेक्शन सेटअप दरम्यान समर्थित वैशिष्ट्ये, प्रोटोकॉल आवृत्त्या, उपलब्ध साधने आणि संसाधने याबाबत माहिती देवाणघेवाण करा.

2. **साधन डिझाइन**: प्रत्येक साधनाने एकच ठराविक काम अगदी चांगल्या प्रकारे करावे, एका विशाल साधनाऐवजी जे अनेक समस्या हाताळते.

3. **त्रुटी हाताळणी**: त्रुटी संदेश आणि कोडसाठी मानकीकृत पद्धत अंमलात आणा जे शोधणे, निराकरण करणे आणि उपयोगी फीडबॅक देणे सोपे करतात.

4. **लॉगिंग**: प्रोटोकॉल संवादांसाठी ऑडिटिंग, डिबगिंग आणि देखरेख करण्यासाठी संरचित लॉग्स कॉन्फिगर करा.

5. **प्रगती ट्रॅकिंग**: दीर्घकालीन ऑपरेशन्ससाठी प्रगती सुधारित करत वापरकर्त्यांना प्रतिसाद देण्यायोग्य UI सक्षम करा.

6. **विनंती रद्द करणे**: क्लायंट्सना आवश्यकता कमी झालेल्या किंवा खूप वेळ घेत असलेल्या विनंत्या रद्द करण्यास अनुमती द्या.

## अतिरिक्त संदर्भ

MCP सर्वोत्तम पद्धतींवरील नवीनतम माहितीसाठी, खालील स्त्रोत पहा:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - सुरक्षा धोके आणि प्रतिबंध उपाय
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - हाताळणीसाठी सुरक्षा प्रशिक्षण

## व्यावहारिक अंमलबजावणी उदाहरणे

### साधन डिझाइन सर्वोत्तम पद्धती

#### 1. एकल जबाबदारी तत्त्व

प्रत्येक MCP साधनाकडे स्पष्ट आणि लक्ष केंद्रित उद्दिष्ट असावे. एकच साधन अनेक बाबी हाताळण्याऐवजी विशिष्ट कार्यात उत्कृष्ट असलेली खास साधने विकसित करा.

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

#### 2. सुसंगत त्रुटी हाताळणी

सूचनात्मक त्रुटी संदेश आणि योग्य पुनर्प्राप्ती तंत्रांसह मजबूत त्रुटी हाताळणी अंमलात आणा.

```python
# संपूर्ण त्रुटी हाताळणीसह पायथन उदाहरण
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # पॅरामीटरची प्रमाणीकरण
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # सुरक्षा प्रमाणीकरण
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # टाइमआउटसह डेटाबेस ऑपरेशन
                async with timeout(10):  # १० सेकंदांचा टाइमआउट
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
                # क्वेरी त्रुटी बहुधा ग्राहक त्रुटी असतात
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # टूल-विशिष्ट त्रुटी पार जाऊ द्या
            raise
        except Exception as e:
            # अनपेक्षित त्रुटींसाठी सर्वसमावेशक कैद
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL इंजेक्शन शोधण्याची अंमलबजावणी
        pass
        
    def _log_error(self, message, error):
        # त्रुटी लॉगिंगची अंमलबजावणी
        pass
```

#### 3. परिमाण वैधता

नेहमीच परिमाणे नीट तपासा जेणेकरून खराब किंवा हानिकारक इनपुट टाळले जाईल.

```javascript
// JavaScript/TypeScript उदाहरण सविस्तर पॅरामीटर वैधतेसह
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
    // 1. पॅरामीटर अस्तित्वाची पडताळणी करा
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. पॅरामीटर प्रकारांची पडताळणी करा
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. पॅरामीटर मूल्यांची पडताळणी करा
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. लेखन ऑपरेशनसाठी सामग्रीचं अस्तित्व तपासा
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. मार्ग सुरक्षा पडताळणी
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // पडताळण्यात आलेल्या पॅरामीटर्सवर आधारित अंमलबजावणी
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // मार्ग सुरक्षा तपासणीची अंमलबजावणी
    // ...
  }
}
```

### सुरक्षा अंमलबजावणी उदाहरणे

#### 1. प्रमाणीकरण आणि प्राधिकरण

```java
// प्रमाणीकरण आणि प्राधिकरणासह जावा उदाहरण
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
        // 1. प्रमाणीकरण संदर्भ काढा
        String authToken = request.getContext().getAuthToken();
        
        // 2. वापरकर्त्याचे प्रमाणीकरण करा
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

#### 2. दर मर्यादित करणे

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

### 1. MCP साधनांसाठी युनिट चाचणी

तुमची साधने वेगळेपणाने चाचणी करा, बाह्य अवलंबित्वांचे मॉक वापरा:

```typescript
// टाइपस्क्रिप्ट साधन युनिट टेस्टचे उदाहरण
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // एक मॉक हवामान सेवा तयार करा
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // मॉक अवलंबित्वासह साधन तयार करा
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // आयोजित करा
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // क्रिया करा
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // पुष्टी करा
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // आयोजित करा
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // क्रिया करा आणि पुष्टी करा
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. इंटिग्रेशन चाचणी

क्लायंटच्या विनंत्यांपासून सर्व्हरच्या प्रतिसादांपर्यंत पूर्ण प्रवाह तपासा:

```python
# पाइथन इंटिग्रेशन चाचणी उदाहरण
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # चाचणी सर्व्हर सुरू करा
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # क्लायंट तयार करा
        client = McpClient("http://localhost:5000")
        
        # साधन शोध चाचणी करा
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # साधन कार्यान्वयन चाचणी करा
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

## कार्यक्षमता सुधारणा

### 1. कॅशिंग धोरणे

उशीर कमी करण्यासाठी आणि संसाधन वापर कमी करण्यासाठी योग्य कॅशिंग वापरा:

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

#### 2. अवलंबित्व इंजेक्शन आणि चाचणीयोग्यता

अवलंब्यता कन्स्ट्रक्टर इंजेक्शनद्वारे मिळतील अशा प्रकारे साधने डिझाइन करा, ज्यामुळे ती चाचणीयोग्य आणि कॉन्फिगरेबल होतील:

```java
// अवलंबित्व इंजेक्शनसह जावा उदाहरण
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // कन्स्ट्रक्टरद्वारे इंजेक्ट केलेली अवलंबित्वे
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // उपकरण अंमलबजावणी
    // ...
}
```

#### 3. संयोज्य साधने

अधिक जटील वर्कफ्लो तयार करण्यासाठी एकत्रीत करू शकतील अशा साधनांचे डिझाइन करा:

```python
# पाइथन उदाहरण दर्शवित आहे संयोज्य साधने
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # अंमलबजावणी...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # हे साधन dataFetch साधनाच्या निकालांचा उपयोग करू शकते
    async def execute_async(self, request):
        # अंमलबजावणी...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # हे साधन dataAnalysis साधनाच्या निकालांचा उपयोग करू शकते
    async def execute_async(self, request):
        # अंमलबजावणी...
        pass

# ही साधने स्वतंत्रपणे किंवा वर्कफ्लोचा भाग म्हणून वापरली जाऊ शकतात
```

### स्कीमा डिझाइन सर्वोत्तम पद्धती

स्कीमा हे मॉडेल आणि तुमच्या साधनांमधील करार आहे. चांगल्या डिझाइन केलेल्या स्कीमा मुळे साधनांचा उपयोग अधिक सुलभ होतो.

#### 1. स्पष्ट परिमाण वर्णनं

प्रत्येक परिमाणासाठी नेहमी वर्णनात्मक माहिती समाविष्ट करा:

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

#### 2. वैधता निर्बंध

अवैध इनपुट टाळण्यासाठी वैधता निर्बंध समाविष्ट करा:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // स्वरूप तपासणीसह ईमेल मालमत्ता
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // संख्यात्मक निर्बंधांसह वय मालमत्ता
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // गणात्मक मालमत्ता
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

#### 3. सुसंगत परताव्याची रचना

मॉडेल्सना परिणाम समजून घेणे सोपे व्हावे म्हणून प्रतिक्रिया रचनेत सातत्य ठेवा:

```python
async def execute_async(self, request):
    try:
        # विनंती प्रक्रिया करा
        results = await self._search_database(request.parameters["query"])
        
        # नेहमी एकसंध रचना परत करा
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

MCP साधनांसाठी विश्वासार्हता टिकवण्यासाठी मजबूत त्रुटी हाताळणी आवश्यक आहे.

#### 1. सौम्य त्रुटी हाताळणी

योग्य स्तरांवर त्रुटी हाताळा आणि उपयुक्त संदेश द्या:

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

शक्य तेव्हा संरचित त्रुटी माहिती परत करा:

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
        
        // इतर अपवाद ToolExecutionException म्हणून पुन्हा फेकणे
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. पुनर्प्रयत्न लॉजिक

तात्पुरत्या अयशस्वीतेसाठी योग्य पुनर्प्रयत्न तंत्र अंमलात आणा:

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
                
            # घातांक मागे
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # नॉन-ट्रांझिअंट त्रुटी, पुन्हा प्रयत्न करू नका
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### कार्यक्षमता सुधारणा

#### 1. कॅशिंग

महागड्या ऑपरेशन्ससाठी कॅशिंग लागू करा:

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

I/O-बंधित ऑपरेशन्ससाठी असिंक्रोनस प्रोग्रॅमिंग पॅटर्न वापरा:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // दीर्घकालीन ऑपरेशन्ससाठी, लगेच एक प्रक्रिया आयडी परत करा
        String processId = UUID.randomUUID().toString();
        
        // असिंक्रोनस प्रक्रिया सुरू करा
        CompletableFuture.runAsync(() -> {
            try {
                // दीर्घकालीन ऑपरेशन करा
                documentService.processDocument(documentId);
                
                // स्थिती अद्ययावत करा (साधारणपणे डेटाबेसमध्ये संग्रहित केली जाते)
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
    
    // सहकार्य स्थिती तपासणी साधन
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

ओव्हरलोड टाळण्यासाठी संसाधन नियंत्रण अंमलात आणा:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # प्रति सेकंद ५ विनंत्या मान्य करा
            bucket_size=10        # १० विनंत्यांपर्यंतची झटपट वाढ मान्य करा
        )
    
    async def execute_async(self, request):
        # आपण पुढे जाऊ शकतो का किंवा थांबावे लागेल का ते तपासा
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # जर थांबा खूप लंबा असेल
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # योग्य विलंब वेळेसाठी थांबा
                await asyncio.sleep(delay)
        
        # एक टोकन वापरा आणि विनंतीसह पुढे जा
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
            
            # पुढील टोकन उपलब्ध होईपर्यंतचा वेळ मोजा
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # गेल्या वेळेनुसार नवीन टोकन्स जोडा
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### सुरक्षा सर्वोत्तम पद्धती

#### 1. इनपुट वैधता

नेहमी इनपुट परिमाणांचे नीट तपासणी करा:

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

योग्य प्राधिकरण तपासणी करा:

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
    
    // साधनाचे कार्यान्वयन सुरू ठेवा
    // ...
}
```

#### 3. संवेदनशील डेटा हाताळणी

संवेदनशील डेटा काळजीपूर्वक हाताळा:

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
        
        # वापरकर्त्याचा डेटा मिळवा
        user_data = await self.user_service.get_user_data(user_id)
        
        # स्पष्टपणे विनंती केल्याशिवाय आणि अधिकृत नसल्याशिवाय संवेदनशील क्षेत्रे फिल्टर करा
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # विनंती संदर्भात अधिकृतता पातळी तपासा
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # मूळ बदलण्यापासून टाळण्यासाठी कॉपी तयार करा
        redacted = user_data.copy()
        
        # विशिष्ट संवेदनशील क्षेत्रे लपवा
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # नेस्टेड संवेदनशील डेटा लपवा
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP साधनांसाठी चाचणी सर्वोत्तम पद्धती

व्यापक चाचणी सुनिश्चित करते की MCP साधने योग्यरित्या कार्य करतात, टोकांचे प्रकरणे हाताळतात आणि प्रणालीशी योग्यरित्या समाकलित होतात.

### युनिट चाचणी

#### 1. प्रत्येक साधन स्वतंत्रपणे चाचणी करा

प्रत्येक साधनाच्या कार्यक्षमतेसाठी लक्ष केंद्रित चाचण्या तयार करा:

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

#### 2. स्कीमा वैधता चाचणी

स्कीमा योग्य आहेत आणि निर्बंधांची योग्य अंमलबजावणी करतात अशी चाचणी करा:

```java
@Test
public void testSchemaValidation() {
    // टूल उदाहरण तयार करा
    SearchTool searchTool = new SearchTool();
    
    // युक्ती मिळवा
    Object schema = searchTool.getSchema();
    
    // प्रमाणीकरणासाठी युक्ती JSON मध्ये रूपांतरित करा
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // युक्ती वैध JSONSchema आहे की नाही हे तपासा
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // वैध पॅरामीटर्स तपासा
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // आवश्यक पॅरामीटर गहाळ आहे का ते तपासा
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

#### 3. त्रुटी हाताळणी चाचणी

विशिष्ट त्रुटी परिस्थितींसाठी चाचण्या तयार करा:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # व्यवस्था करा
    tool = ApiTool(timeout=0.1)  # खूप छोटा टाइमआउट
    
    # टाइमआउट होणारी विनंती मॉक करा
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # टाइमआउट पेक्षा जास्त वेळ
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # क्रिया करा आणि पडताळणी करा
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवाद संदेशाची खात्री करा
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
        
        # क्रिया करा आणि पडताळणी करा
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवादात दरमर्यादा माहिती असल्याची खात्री करा
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### इंटिग्रेशन चाचणी

#### 1. साधन साखळी चाचणी

अपेक्षित संयोजनेत साधने एकत्र काम करत आहेत का ते तपासा:

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

पूर्ण साधन नोंदणी आणि अंमलबजावणीसह MCP सर्व्हर तपासा:

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
        // डिस्कव्हरी एंडपॉइंट तपासा
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
        
        // विनंती पाठवा आणि प्रतिसाद पडताळा
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // अमान्य टूल विनंती तयार करा
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" पॅरामीटर गायब आहे
        request.put("parameters", parameters);
        
        // विनंती पाठवा आणि त्रुटी प्रतिसाद पडताळा
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. अखेरपर्यंत चाचणी

मॉडेल प्रांप्टपासून साधन अंमलबजावणीकडे संपूर्ण वर्कफ्लो तपासा:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # व्यवस्थापित करा - MCP क्लायंट आणि मॉक मॉडेल सेट करा
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
    
    # मॉक हवामान साधन प्रतिसाद
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

तुमचा MCP सर्व्हर किती समांतर विनंत्या हाताळू शकतो ते तपासा:

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

#### 2. ताण चाचणी

अत्यंत भाराखालील प्रणाली तपासा:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // स्ट्रेस टेस्टिंगसाठी JMeter सेट करा
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter चा टेस्ट प्लॅन कॉन्फिगर करा
    HashTree testPlanTree = new HashTree();
    
    // टेस्ट प्लॅन, थ्रेड ग्रुप, सॅम्पलर्स इत्यादी तयार करा
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
    
    // टेस्ट चालवा
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // निकालांची पडताळणी करा
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // सरासरी प्रतिसाद वेळ < २००ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // ९०व्या टक्क्याचा प्रतिसाद वेळ < ५००ms
}
```

#### 3. निरीक्षण आणि प्रोफाइलिंग

दीर्घकालीन कार्यक्षमता विश्लेषणासाठी निरीक्षण सेटअप करा:

```python
# MCP सर्वरसाठी मॉनिटरिंग कॉन्फिगर करा
def configure_monitoring(server):
    # Prometheus मेट्रिक्स सेट अप करा
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
    
    # टायमिंग आणि मेट्रिक्स रेकॉर्डिंगसाठी मिडलवेअर जोडा
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # मेट्रिक्स एंडपॉइंट उघडा
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP वर्कफ्लो डिझाइन नमुने

चांगल्या डिझाइन केलेले MCP वर्कफ्लो कार्यक्षमता, विश्वासार्हता आणि देखभालता सुधारतात. येथे काही महत्वाचे नमुने दिले आहेत:

### 1. साधनांची साखळी नमुना

एका उपकरणांच्या मालिकेत एक उपकरणाचा आउटपुट पुढील उपकरणासाठी इनपुट बनतो:

```python
# Python चेन ऑफ टूल्स अंमलबजावणी
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # अनुक्रमे चालविण्यासाठी टूल नावे यादी
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # साखळीतील प्रत्येक टूल चालवा, मागील निकाल पाठविताना
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # निकाल संग्रहित करा आणि पुढील टूलसाठी इनपुट म्हणून वापरा
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# उदाहरण वापर
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

एक केंद्रीय साधन वापरा जे इनपुटवर आधारित विशेषज्ञ साधनांना द्यते:

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

कार्यक्षमतेसाठी अनेक साधने एकाच वेळी चालवा:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // चरण 1: डेटासेट मेटाडेटा मिळवा (समक्रमित)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // चरण 2: अनेक विश्लेषणे समांतर प्रारंभ करा
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
        
        // सर्व समांतर कार्य पूर्ण होईपर्यंत प्रतीक्षा करा
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // पूर्णतेची प्रतीक्षा करा
        
        // चरण 3: निकाल एकत्र करा
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // चरण 4: सारांश अहवाल तयार करा
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // संपूर्ण कार्यप्रवाहाचा निकाल परत करा
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. त्रुटी पुनर्प्राप्ती नमुना

साधने अयशस्वी झाल्यास सौम्य फॉलबॅक लागू करा:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # प्राथमिक साधन प्रथम वापरून पहा
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # अपयश लॉग करा
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # दुसऱ्या साधनावर अवलंबून रहा
            try:
                # फॉलबॅक साधनासाठी परिमाणे रूपांतरित करावी लागू शकतात
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # दोन्ही साधने अपयशी झाली
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # ही अंमलबजावणी विशिष्ट साधनांवर अवलंबून असेल
        # या उदाहरणासाठी, आपण मूळ परिमाणे परत करू
        return params

# उदाहरण वापर
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # प्राथमिक (पैशाने) हवामान API
        "basicWeatherService",    # फॉलबॅक (मुफ्त) हवामान API
        {"location": location}
    )
```

### 5. वर्कफ्लो संयोजन नमुना

सोप्या वर्कफ्लो एकत्र करून जटिल वर्कफ्लो तयार करा:

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

# MCP सर्व्हर्सची चाचणी: सर्वोत्तम पद्धती आणि सर्वोच्च टिपा

## आढावा

चाचणी ही विश्वासार्ह, उच्च-गुणवत्तेचे MCP सर्व्हर विकसित करण्याचा एक महत्त्वाचा भाग आहे. या मार्गदर्शकात युनिट चाचण्यांपासून अखेरपर्यंतच्या पडताळणीपर्यंत तुमच्या MCP सर्व्हरच्या चाचणीसाठी सर्वसमावेशक सर्वोत्तम पद्धती आणि टिपा दिल्या आहेत.

## MCP सर्व्हर्ससाठी चाचणीचे महत्त्व

MCP सर्व्हर AI मॉडेल आणि क्लायंट अनुप्रयोगांमधील महत्वाचे मिडलवेअर म्हणून काम करतात. सखोल चाचणी सुनिश्चित करते:

- उत्पादन पर्यावरणात विश्वासार्हता
- विनंत्या आणि प्रतिसाद योग्य हाताळणी
- MCP तपशीलांची योग्य अंमलबजावणी
- अयशस्वी आणि टोकाचे प्रकरणे यांविरुद्ध टिकाऊपणा
- विविध भाराखाली सातत्यपूर्ण कार्यक्षमता

## MCP सर्व्हरसाठी युनिट चाचणी

### युनिट चाचणी (मूलाधार)

युनिट चाचणी तुमच्या MCP सर्व्हरचे वैयक्तिक घटक स्वतंत्रपणे तपासते.

#### काय तपासायचे

1. **संसाधन हाताळणारे**: प्रत्येक संसाधन हाताळणाऱ्याचा लॉजिक स्वतंत्रपणे तपासा
2. **साधन अंमलबजावणी**: विविध इनपुटसह साधन वर्तन तपासा
3. **प्रांप्ट टेम्पलेट्स**: प्रांप्ट टेम्पलेट्स योग्यरित्या रेंडर होतात याची खात्री करा
4. **स्कीमा वैधता**: परिमाण वैधता लॉजिक तपासा
5. **त्रुटी हाताळणी**: अवैध इनपुटसाठी त्रुटी प्रतिसाद तपासा

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
# पाइथनमधील कॅल्क्युलेटर टूलसाठी उदाहरण युनिट टेस्ट
def test_calculator_tool_add():
    # व्यवस्थित करा
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # क्रिया करा
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # खात्री करा
    assert result["value"] == 12
```

### इंटिग्रेशन चाचणी (मधली पातळी)

इंटिग्रेशन चाचणी तुमच्या MCP सर्व्हरच्या घटकांमधील संवाद तपासते.

#### काय तपासायचे

1. **सर्व्हर प्रारंभ**: विविध कॉन्फिगरेशनसह सर्व्हर सुरू होत आहे का ते तपासा
2. **रूट नोंदणी**: सर्व एंडपॉइंट योग्यरित्या नोंदणीकृत आहेत की नाही हे सुनिश्चित करा
3. **विनंती प्रक्रिया**: पूर्ण विनंती-प्रतिसाद चक्र तपासा
4. **त्रुटी प्रसरण**: घटकांमध्ये त्रुटी योग्यरित्या हाताळल्या जात आहेत का तपासा
5. **प्रमाणीकरण आणि प्राधिकरण**: सुरक्षा यंत्रणा तपासा

#### इंटिग्रेशन चाचणीसाठी सर्वोत्तम पद्धती

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

### अखेरपर्यंतची चाचणी (वरची पातळी)

अखेरपर्यंतची चाचणी क्लायंटपासून सर्व्हरपर्यंत संपूर्ण प्रणालीचे वर्तन तपासते.

#### काय तपासायचे

1. **क्लायंट-सर्व्हर संवाद**: पूर्ण विनंती-प्रतिसाद चक्र तपासा
2. **खरे क्लायंट SDKs**: प्रत्यक्ष क्लायंट अंमलबजावणीसह चाचणी करा
3. **भारी ओझ्याखाली कार्यक्षमता**: एकाच वेळी अनेक विनंत्यांसह वर्तन तपासा
4. **त्रुटी पुनर्प्राप्ती**: अयशस्वीतेनंतर प्रणाली पुनर्प्राप्ती तपासा
5. **दीर्घकालीन ऑपरेशन्स**: स्ट्रीमिंग आणि लांब ऑपरेशन्सची हाताळणी तपासा

#### अखेरपर्यंत चाचणीसाठी सर्वोत्तम पद्धती

```typescript
// TypeScript मध्ये क्लायंटसह उदाहरण E2E चाचणी
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // चाचणी वातावरणात सर्व्हर सुरु करा
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // क्रियाशील व्हा
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

चाचणी दरम्यान घटक वेगळे करण्यासाठी मॉकिंग आवश्यक आहे.

### मोकिन्गसाठी घटक

1. **बाह्य AI मॉडेल्स**: पूर्वानुमान योग्य असतील म्हणून मॉक मॉडेल प्रतिसाद
2. **बाह्य सेवा**: API अवलंबित्व मॉक करा (डेटाबेस, तृतिय पक्ष सेवा)
3. **प्रमाणीकरण सेवा**: ओळख प्रदाते मॉक करा
4. **संसाधन प्रदाते**: महागडे संसाधन हाताळणारे मॉक करा

### उदाहरण: AI मॉडेल प्रतिसाद मॉक करणे

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
# यूनिटटेस्ट.mock सह पायथन उदाहरण
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # मॉक कॉन्फिगर करा
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # चाचणीमध्ये मॉक वापरा
    server = McpServer(model_client=mock_model)
    # चाचणी सुरू ठेवा
```

## कार्यक्षमता चाचणी

उत्पादन MCP सर्व्हर साठी कार्यक्षमता चाचणी अत्यंत महत्वाची आहे.

### काय मोजायचे

1. **प्रतिसाद वेळ (Latency)**: विनंत्यांसाठी प्रतिसाद वेळ
2. **थ्रूपुट**: प्रति सेकंद हाताळल्या जाणार्‍या विनंत्या
3. **संसाधन वापर**: CPU, मेमरी, नेटवर्क उपयोग
4. **समांतर विनंती हाताळणी**: समांतर विनंत्यांखालील वर्तन
5. **स्केलिंग वैशिष्ट्ये**: भार वाढल्यावर कार्यक्षमता

### कार्यक्षमता चाचणी साधने

- **k6**: मुक्त स्रोत लोड चाचणी साधन
- **JMeter**: व्यापक कार्यक्षमता चाचणी
- **Locust**: Python आधारित लोड चाचणी
- **Azure Load Testing**: क्लाउड-आधारित कार्यक्षमता चाचणी

### उदाहरण: k6 सह मूलभूत लोड चाचणी

```javascript
// MCP सर्व्हरसाठी लोड चाचणीसाठी k6 स्क्रिप्ट
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 आभासी वापरकर्ता
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

## MCP सर्व्हरसाठी चाचणी ऑटोमेशन

चाचण्या स्वयंचलित केल्याने सातत्यपूर्ण गुणवत्ता आणि जलद अभिप्राय मिळतात.

### CI/CD एकत्रीकरण

1. **पुल रिक्वेस्टवर युनिट चाचण्या चालवा**: कोड बदल्यामुळे विद्यमान कार्यक्षमता तुटू नये याची खात्री करा
2. **स्टेजिंगमधील इंटिग्रेशन चाचण्या**: प्री-प्रॉडक्शन पर्यावरणांमध्ये इंटिग्रेशन चाचण्या चालवा  
3. **कामगिरी बेसलाईन्स**: रिग्रेशन पकडण्यासाठी कामगिरी मापदंड राखा  
4. **सुरक्षा स्कॅन्स**: पाईपलाइनचा भाग म्हणून सुरक्षा चाचणी ऑटोमेट करा  

### उदाहरण CI पाईपलाइन (GitHub Actions)

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
  
## MCP स्पेसिफिकेशनशी अनुपालनासाठी चाचणी

आपला सर्व्हर योग्यरित्या MCP स्पेसिफिकेशन अंमलात आणतो का हे पडताळा.

### महत्त्वाच्या अनुपालन क्षेत्रे

1. **API एंडपॉइंट्स**: आवश्यक एंडपॉइंट्सची चाचणी करा (/resources, /tools, इत्यादी)  
2. **विनंती/उत्तर स्वरूप**: स्कीमा अनुपालनाची पडताळणी करा  
3. **त्रुटी कोड**: विविध परिस्थितींमध्ये योग्य स्थिती कोड पडताळा  
4. **कंटेंट प्रकार**: वेगवेगळ्या कंटेंट प्रकारांची हाताळणी तपासा  
5. **प्रमाणीकरण प्रवाह**: स्पेक-आधारित प्रमाणीकरण यंत्रणा पडताळणी करा  

### अनुपालन चाचणी सूट

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
  
## प्रभावी MCP सर्व्हर चाचणीसाठी टॉप 10 टिपा

1. **टूल डिफिनिशन्स स्वतंत्रपणे चाचणी**: टूल लॉजिकपासून स्वतंत्रपणे स्कीमा डिफिनिशन्स पडताळा  
2. **पॅरामीट्राइज्ड चाचणी वापरा**: विविध इनपुटसह टूल्सची चाचणी करा, एज केससहित  
3. **त्रुटी प्रतिसाद तपासा**: शक्य असलेल्या सर्व त्रुटी स्थितीसाठी योग्य हाताळणी पडताळा  
4. **अधिकार लॉजिक चाचणी करा**: विविध वापरकर्ता भूमिका साठी योग्य प्रवेश नियंत्रण सुनिश्चित करा  
5. **चाचणी कव्हरेज निरीक्षण करा**: महत्त्वाच्या मार्गातील कोडचा उच्च कव्हरेज ध्येय ठेवा  
6. **स्ट्रीमिंग प्रतिसाद चाचणी करा**: स्ट्रीमिंग कंटेंटची योग्य हाताळणी पडताळा  
7. **नेटवर्क समस्यांचे अनुकरण करा**: खराब नेटवर्क परिस्थितीत वर्तन तपासा  
8. **संसाधन मर्यादा चाचणी करा**: कोटा किंवा दरमर्यादा गाठल्यावर वर्तन पडताळा  
9. **रिग्रेशन चाचण्या ऑटोमेट करा**: प्रत्येक कोड बदलावर चालणारी सूट तयार करा  
10. **चाचणी प्रकरणे दस्तऐवजीकरण करा**: चाचणी परिस्थितींचे स्पष्ट दस्तऐवजीकरण सांभाळा  

## सामान्य चाचणी गमावणाऱ्या चुका

- **केवळ सुखद मार्गावर भर देणे**: त्रुटी प्रकरणांची सखोल चाचणी करा  
- **कामगिरी चाचणी दुर्लक्षित करणे**: उत्पादनावर परिणाम होण्यापूर्वी अडचणी ओळखा  
- **केवळ वेगळी चाचणी करणे**: यूनिट, इंटिग्रेशन आणि E2E चाचण्या एकत्र करा  
- **अपूर्ण API कव्हरेज**: सर्व एंडपॉइंट्स आणि फिचर्सची चाचणी सुनिश्चित करा  
- **असुसंगत चाचणी पर्यावरणे**: सुसंगत चाचणी पर्यावरणासाठी कंटेनर्स वापरा  

## निष्कर्ष

एक जबाबदार, उच्च-गुणवत्तेचा MCP सर्व्हर विकसित करण्यासाठी सर्वसमावेशक चाचणी धोरण आवश्यक आहे. या मार्गदर्शकातील सर्वोत्तम पद्धती आणि टिपा अंमलात आणून, आपण आपल्या MCP अंमलबजावणींना सर्वोच्च दर्जा, विश्वसनीयता आणि कामगिरी यांची खात्री देऊ शकता.  

## मुख्य गोष्टी लक्षात ठेवण्यासारख्या

1. **टूल डिझाइन**: सिंगल रेस्पॉन्सिबिलिटी प्रिन्सिपलचा अवलंब करा, डिपेंडन्सी इंजेक्शन वापरा, आणि संयोजकतेसाठी डिझाइन करा  
2. **स्कीमा डिझाइन**: स्पष्ट, चांगल्या प्रकारे दस्तऐवजीकृत स्कीमास तयार करा ज्यात योग्य पडताळणी बंधने असतील  
3. **त्रुटी हाताळणी**: सौम्य त्रुटी हाताळणी, संरचित त्रुटी प्रतिसाद, आणि पुनर्प्रयास लॉजिक अंमलात आणा  
4. **कामगिरी**: कॅशिंग, असिंक्रोनस प्रक्रिया, आणि संसाधन थ्रॉटलिंग वापरा  
5. **सुरक्षा**: समग्र इनपुट पडताळणी, अधिकृत तपासणी, आणि संवेदनशील डेटा हाताळणी करा  
6. **चाचणी**: व्यापक युनिट, इंटिग्रेशन आणि एंड-टू-एंड चाचण्या तयार करा  
7. **कार्यप्रवाह पॅटर्न्स**: चेन, डिस्पॅचर आणि समानांतर प्रक्रिया यांसारखे स्थापित पॅटर्न वापरा  

## सराव

म्हणून असा एक MCP टूल आणि कार्यप्रवाह डिझाइन करा जो दस्तऐवज प्रक्रिया प्रणालीसाठी योग्य आहे ज्यामुळे:

1. अनेक स्वरूपांमध्ये दस्तऐवज स्वीकारतो (PDF, DOCX, TXT)  
2. दस्तऐवजांकडून मजकूर आणि मुख्य माहिती काढतो  
3. दस्तऐवज प्रकार आणि सामग्रीनुसार वर्गीकरण करतो  
4. प्रत्येक दस्तऐवजाचा सारांश तयार करतो  

टूल स्कीमास, त्रुटी हाताळणी, आणि या परिस्थितीसाठी सर्वोत्तम कार्यप्रवाह पॅटर्न अंमलात आणा. आपण या अंमलबजावणीची कशी चाचणी घ्याल याचा विचार करा.  

## संसाधने  

1. [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) वर MCP समुदायात सामील व्हा आणि ताज्या विकासांबद्दल अद्ययावत रहा  
2. मुक्त स्त्रोत [MCP प्रोजेक्ट्स](https://github.com/modelcontextprotocol) मध्ये योगदान द्या  
3. आपल्या संस्थेच्या AI उपक्रमांमध्ये MCP तत्त्वांचा वापर करा  
4. आपल्या उद्योगासाठी विशेष MCP अंमलबजावणी एक्सप्लोर करा  
5. मल्टि-मॉडल इंटिग्रेशन किंवा एंटरप्राइझ अनुप्रयोग इंटिग्रेशनसारख्या विशिष्ट MCP विषयांवर प्रगत कोर्सेस घेण्याचा विचार करा  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) द्वारे शिकलेल्या तत्त्वांचा वापर करून स्वतःचे MCP टूल्स आणि कार्यप्रवाह तयार करण्याचा प्रयोग करा  

## पुढे काय आहे

पुढे: [केस स्टडीज](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->