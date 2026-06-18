# MCP विकास सर्वोत्तम प्रथाएँ

[![MCP Development Best Practices](../../../translated_images/hi/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(इस पाठ का वीडियो देखने के लिए ऊपर की छवि पर क्लिक करें)_

## अवलोकन

यह पाठ उत्पादन वातावरण में MCP सर्वर और फीचर्स के विकास, परीक्षण, और परिनियोजन के लिए उन्नत सर्वोत्तम प्रथाओं पर केंद्रित है। जैसे-जैसे MCP पारिस्थितिकी प्रणालियाँ जटिलता और महत्व में बढ़ती हैं, स्थापित पैटर्न का पालन विश्वसनीयता, रखरखाव योग्यता, और पारस्परिक संचालन सुनिश्चित करता है। यह पाठ वास्तविक दुनिया के MCP कार्यान्वयन से प्राप्त व्यावहारिक ज्ञान को संकलित करता है ताकि आप प्रभावी संसाधनों, प्रॉम्‍ट्स, और उपकरणों के साथ मजबूत, कुशल सर्वर बनाने में मार्गदर्शन कर सकें।

## सीखने के उद्देश्य

इस पाठ के अंत तक, आप सक्षम होंगे:

- MCP सर्वर और फीचर डिज़ाइन में उद्योग की सर्वोत्तम प्रथाओं को लागू करना
- MCP सर्वरों के लिए व्यापक परीक्षण रणनीतियाँ बनाना
- जटिल MCP अनुप्रयोगों के लिए प्रभावी, पुन: प्रयोज्य वर्कफ़्लो पैटर्न डिज़ाइन करना
- MCP सर्वरों में उचित त्रुटि प्रबंधन, लॉगिंग, और अवलोकनीयता लागू करना
- प्रदर्शन, सुरक्षा, और रखरखाव योग्यता के लिए MCP कार्यान्वयन का अनुकूलन करना

## MCP मूल सिद्धांत

विशिष्ट कार्यान्वयन प्रथाओं में जाने से पहले, प्रभावी MCP विकास को मार्गदर्शित करने वाले मूल सिद्धांतों को समझना महत्वपूर्ण है:

1. **मानकीकृत संचार**: MCP JSON-RPC 2.0 का उपयोग अपनी नींव के रूप में करता है, जो सभी कार्यान्वयनों में अनुरोध, प्रतिक्रिया, और त्रुटि प्रबंधन के लिए एक सुसंगत प्रारूप प्रदान करता है।

2. **उपयोगकर्ता-केंद्रित डिज़ाइन**: हमेशा अपने MCP कार्यान्वयनों में उपयोगकर्ता की सहमति, नियंत्रण, और पारदर्शिता को प्राथमिकता दें।

3. **सुरक्षा पहले**: प्रमाणीकरण, अधिकरण, सत्यापन, और दर सीमित करने सहित मजबूत सुरक्षा उपाय लागू करें।

4. **मॉड्यूलर आर्किटेक्चर**: अपने MCP सर्वरों को मॉड्यूलर दृष्टिकोण से डिज़ाइन करें, जहाँ प्रत्येक उपकरण और संसाधन का स्पष्ट, केंद्रित उद्देश्य हो।

5. **राज्ययुक्त कनेक्शन**: अधिक सुसंगत और संदर्भ-जागरूक इंटरैक्शन के लिए कई अनुरोधों के बीच MCP की स्थिति बनाए रखने की क्षमता का लाभ उठाएं।

## आधिकारिक MCP सर्वोत्तम प्रथाएँ

निम्नलिखित सर्वोत्तम प्रथाएँ आधिकारिक मॉडल संदर्भ प्रोटोकॉल दस्तावेज़ीकरण से निकाली गई हैं:

### सुरक्षा सर्वोत्तम प्रथाएँ

1. **उपयोगकर्ता की सहमति और नियंत्रण**: डेटा तक पहुँचने या संचालन करने से पहले हमेशा स्पष्ट उपयोगकर्ता सहमति आवश्यक करें। साझा किए जाने वाले डेटा और अधिकृत क्रियाओं पर स्पष्ट नियंत्रण प्रदान करें।

2. **डेटा गोपनीयता**: केवल स्पष्ट सहमति के साथ उपयोगकर्ता डेटा की पहुँच दें और उपयुक्त पहुँच नियंत्रण के साथ इसे सुरक्षित रखें। अनधिकृत डेटा संचरण से सुरक्षा करें।

3. **उपकरण सुरक्षा**: किसी भी उपकरण को कॉल करने से पहले स्पष्ट उपयोगकर्ता सहमति आवश्यक करें। सुनिश्चित करें कि उपयोगकर्ता प्रत्येक उपकरण की कार्यक्षमता को समझें और मजबूत सुरक्षा सीमाएँ लागू करें।

4. **उपकरण अनुमति नियंत्रण**: किसी सेशन के दौरान मॉडल को किन उपकरणों का उपयोग करने की अनुमति है, इसे कॉन्फ़िगर करें, यह सुनिश्चित करते हुए कि केवल स्पष्ट रूप से अधिकृत उपकरण सुलभ हों।

5. **प्रमाणीकरण**: उपकरणों, संसाधनों, या संवेदनशील संचालन की पहुँच देने से पहले उचित प्रमाणीकरण आवश्यक करें, जैसे API कुंजी, OAuth टोकन, या अन्य सुरक्षित प्रमाणीकरण विधियों का उपयोग।

6. **पैरामीटर सत्यापन**: सभी उपकरण कॉल के लिए सत्यापन लागू करें ताकि विकृत या दुर्भावनापूर्ण इनपुट उपकरण कार्यान्वयन तक न पहुँच सके।

7. **दर सीमित करना**: दुरुपयोग को रोकने और सर्वर संसाधनों के उचित उपयोग को सुनिश्चित करने के लिए दर सीमितीकरण लागू करें।

### कार्यान्वयन सर्वोत्तम प्रथाएँ

1. **क्षमता वार्ता**: कनेक्शन सेटअप के दौरान, समर्थित फीचर्स, प्रोटोकॉल संस्करण, उपलब्ध उपकरणों और संसाधनों की जानकारी का आदान-प्रदान करें।

2. **उपकरण डिज़ाइन**: एक बार में एक काम अच्छे से करने वाले केंद्रित उपकरण बनाएं, बजाय इसके कि बहु-चिंताओं को संभालने वाले एकात्मक उपकरणों के।

3. **त्रुटि प्रबंधन**: समस्या निदान में मदद के लिए मानकीकृत त्रुटि संदेश और कोड लागू करें, असफलताओं को सहजता से संभालें, और क्रियाशील प्रतिक्रिया प्रदान करें।

4. **लॉगिंग**: ऑडिट, डिबगिंग, और प्रोटोकॉल इंटरैक्शन की निगरानी के लिए संरचित लॉग कॉन्फ़िगर करें।

5. **प्रगति ट्रैकिंग**: लंबे चलने वाले ऑपरेशनों के लिए, प्रतिक्रियाशील उपयोगकर्ता इंटरफेस सक्षम करने हेतु प्रगति अपडेट रिपोर्ट करें।

6. **अनुरोध रद्दीकरण**: क्लाइंट्स को उन लंबित अनुरोधों को रद्द करने की अनुमति दें जो अब आवश्यक नहीं हैं या अधिक समय ले रहे हैं।

## अतिरिक्त संदर्भ

MCP सर्वोत्तम प्रथाओं पर सबसे अद्यतन जानकारी के लिए देखें:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - सुरक्षा जोखिम और निवारण
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - व्यावहारिक सुरक्षा प्रशिक्षण

## व्यावहारिक कार्यान्वयन उदाहरण

### उपकरण डिज़ाइन सर्वोत्तम प्रथाएँ

#### 1. एकल जिम्मेदारी सिद्धांत

प्रत्येक MCP उपकरण का एक स्पष्ट, केंद्रित उद्देश्य होना चाहिए। कई चिंताओं को संभालने वाले एकात्मक उपकरण बनाने के बजाय, विशिष्ट कार्यों में उत्कृष्ट विशेषज्ञ उपकरण विकसित करें।

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

#### 2. सुसंगत त्रुटि प्रबंधन

सूचनात्मक त्रुटि संदेशों और उपयुक्त पुनर्प्राप्ति तंत्र के साथ मजबूत त्रुटि प्रबंधन लागू करें।

```python
# व्यापक त्रुटि हैंडलिंग के साथ पायथन उदाहरण
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # पैरामीटर सत्यापन
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # सुरक्षा सत्यापन
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # टाइमआउट के साथ डेटाबेस ऑपरेशन
                async with timeout(10):  # 10 सेकंड का टाइमआउट
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # कनेक्शन त्रुटियाँ अस्थायी हो सकती हैं
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # क्वेरी त्रुटियाँ संभवतः ग्राहक त्रुटियाँ हैं
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # टूल-विशिष्ट त्रुटियों को गुजरने दें
            raise
        except Exception as e:
            # अप्रत्याशित त्रुटियों के लिए समग्र पकड़
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL इंजेक्शन डिटेक्शन का कार्यान्वयन
        pass
        
    def _log_error(self, message, error):
        # त्रुटि लॉगिंग का कार्यान्वयन
        pass
```

#### 3. पैरामीटर सत्यापन

विकृत या दुर्भावनापूर्ण इनपुट को रोकने के लिए हमेशा पैरामीटर की पूरी तरह से जांच करें।

```javascript
// विस्तृत पैरामीटर सत्यापन के साथ JavaScript/TypeScript उदाहरण
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
    // 1. पैरामीटर की उपस्थिति सत्यापित करें
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. पैरामीटर प्रकार सत्यापित करें
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. पैरामीटर मान सत्यापित करें
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. लिखने के ऑपरेशन के लिए सामग्री की उपस्थिति सत्यापित करें
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. पथ सुरक्षा सत्यापन
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // सत्यापित पैरामीटर के आधार पर कार्यान्वयन
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // पथ सुरक्षा जांच का कार्यान्वयन
    // ...
  }
}
```

### सुरक्षा कार्यान्वयन उदाहरण

#### 1. प्रमाणीकरण और अधिकरण

```java
// प्रमाणीकरण और प्राधिकरण के साथ जावा उदाहरण
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
        // 1. प्रमाणीकरण संदर्भ निकाले
        String authToken = request.getContext().getAuthToken();
        
        // 2. उपयोगकर्ता को प्रमाणित करें
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. विशिष्ट ऑपरेशन के लिए प्राधिकरण की जाँच करें
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. अधिकृत ऑपरेशन के साथ आगे बढ़ें
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

#### 2. दर सीमित करना

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

## परीक्षण सर्वोत्तम प्रथाएँ

### 1. MCP उपकरणों का यूनिट परीक्षण

हमेशा अपने उपकरणों का पृथक रूप से परीक्षण करें, बाहरी निर्भरताओं का मॉकिंग करें:

```typescript
// टाइपस्क्रिप्ट टूल यूनिट टेस्ट का उदाहरण
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // एक नकली मौसम सेवा बनाएं
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // नकली निर्भरता के साथ टूल बनाएं
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // व्यवस्थित करें
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // कार्य करें
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // सुनिश्चित करें
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // व्यवस्थित करें
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // कार्य करें और सुनिश्चित करें
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. एकीकरण परीक्षण

क्लाइंट अनुरोधों से लेकर सर्वर प्रतिक्रियाओं तक पूर्ण प्रवाह का परीक्षण करें:

```python
# पायथन इंटीग्रेशन परीक्षण उदाहरण
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # एक परीक्षण सर्वर शुरू करें
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # एक क्लाइंट बनाएं
        client = McpClient("http://localhost:5000")
        
        # टूल खोज का परीक्षण करें
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # टूल निष्पादन का परीक्षण करें
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # प्रतिक्रिया सत्यापित करें
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # साफ़-सफाई करें
        await server.stop()
```

## प्रदर्शन अनुकूलन

### 1. कैशिंग रणनीतियाँ

लेटेंसी और संसाधन उपयोग को कम करने के लिए उपयुक्त कैशिंग लागू करें:

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

#### 2. निर्भरता इंजेक्शन और परीक्षणीयता

निर्माता इंजेक्शन के माध्यम से अपनी निर्भरताओं को प्राप्त करने के लिए उपकरण डिज़ाइन करें, जिससे वे परीक्षण योग्य और विन्यास योग्य हों:

```java
// निर्भरता इंजेक्शन के साथ जावा उदाहरण
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // कंस्ट्रक्टर के माध्यम से इंजेक्ट की गई निर्भरताएँ
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

#### 3. संयोज्य उपकरण

ऐसे उपकरण डिज़ाइन करें जिन्हें मिलाकर अधिक जटिल वर्कफ़्लो बनाए जा सकें:

```python
# कंपोजेबल टूल्स दिखाने वाला पायथन उदाहरण
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # कार्यान्वयन...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # यह टूल dataFetch टूल के परिणामों का उपयोग कर सकता है
    async def execute_async(self, request):
        # कार्यान्वयन...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # यह टूल dataAnalysis टूल के परिणामों का उपयोग कर सकता है
    async def execute_async(self, request):
        # कार्यान्वयन...
        pass

# इन टूल्स का स्वतंत्र रूप से या वर्कफ़्लो के हिस्से के रूप में उपयोग किया जा सकता है
```

### स्कीमा डिज़ाइन सर्वोत्तम प्रथाएँ

स्कीमा मॉडल और आपके उपकरण के बीच समझौता है। अच्छी तरह डिज़ाइन किए गए स्कीमा बेहतर उपकरण उपयोगिता देते हैं।

#### 1. स्पष्ट पैरामीटर विवरण

प्रत्येक पैरामीटर के लिए वर्णनात्मक जानकारी हमेशा शामिल करें:

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

#### 2. सत्यापन बाधाएँ

अवैध इनपुट को रोकने के लिए सत्यापन बाधाएँ शामिल करें:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // प्रारूप सत्यापन के साथ ईमेल गुण
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // संख्यात्मक प्रतिबंधों के साथ आयु गुण
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // सूचीबद्ध गुण
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

#### 3. सुसंगत प्रत्यावर्तन संरचनाएँ

अपने प्रतिक्रिया संरचनाओं में स्थिरता बनाए रखें ताकि मॉडल परिणामों की बेहतर व्याख्या कर सकें:

```python
async def execute_async(self, request):
    try:
        # अनुरोध को संसाधित करें
        results = await self._search_database(request.parameters["query"])
        
        # हमेशा एक सुसंगत संरचना लौटाएं
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

### त्रुटि प्रबंधन

विश्वसनीयता बनाए रखने के लिए MCP उपकरणों में मजबूत त्रुटि प्रबंधन अत्यंत आवश्यक है।

#### 1. सहज त्रुटि प्रबंधन

उचित स्तरों पर त्रुटियों को संभालें और सूचनात्मक संदेश प्रदान करें:

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

#### 2. संरचित त्रुटि प्रतिक्रियाएँ

संभावित होने पर संरचित त्रुटि जानकारी लौटाएं:

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
        
        // अन्य अपवादों को ToolExecutionException के रूप में पुनः फेंकें
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. पुनः प्रयास तर्क

क्षणिक विफलताओं के लिए उपयुक्त पुनः प्रयास तर्क लागू करें:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # सेकंड
    
    while retry_count < max_retries:
        try:
            # बाहरी API कॉल करें
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # घातीय बैकऑफ
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # गैर-अस्थायी त्रुटि, पुनः प्रयास न करें
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### प्रदर्शन अनुकूलन

#### 1. कैशिंग

महंगे ऑपरेशनों के लिए कैशिंग लागू करें:

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

#### 2. असिंक्रोनस प्रोसेसिंग

I/O-संबंधित ऑपरेशनों के लिए असिंक्रोनस प्रोग्रामिंग पैटर्न का उपयोग करें:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // लंबे समय तक चलने वाले ऑपरेशनों के लिए, तुरंत प्रोसेसिंग ID लौटाएं
        String processId = UUID.randomUUID().toString();
        
        // असिंक्रोनस प्रोसेसिंग शुरू करें
        CompletableFuture.runAsync(() -> {
            try {
                // लंबे समय तक चलने वाला ऑपरेशन करें
                documentService.processDocument(documentId);
                
                // स्थिति अपडेट करें (आमतौर पर डेटाबेस में संग्रहीत की जाती है)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // प्रोसेस ID के साथ तुरंत प्रतिक्रिया लौटाएं
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // साथ-साथ स्थिति जांच उपकरण
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

#### 3. संसाधन थ्रॉटलिंग

ओवरलोड को रोकने के लिए संसाधन थ्रॉटलिंग लागू करें:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # प्रति सेकंड 5 अनुरोध की अनुमति दें
            bucket_size=10        # 10 अनुरोध तक अचानक वृद्धि की अनुमति दें
        )
    
    async def execute_async(self, request):
        # जांचें कि क्या हम आगे बढ़ सकते हैं या प्रतीक्षा करनी है
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # यदि प्रतीक्षा बहुत लंबी है
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # उपयुक्त विलंब समय के लिए प्रतीक्षा करें
                await asyncio.sleep(delay)
        
        # एक टोकन का उपयोग करें और अनुरोध के साथ आगे बढ़ें
        self.rate_limiter.consume()
        
        # एपीआई कॉल करें
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
            
            # अगला टोकन उपलब्ध होने तक का समय गणना करें
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # बीते समय के आधार पर नए टोकन जोड़ें
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### सुरक्षा सर्वोत्तम प्रथाएँ

#### 1. इनपुट सत्यापन

हमेशा इनपुट पैरामीटर की पूरी तरह जांच करें:

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

#### 2. अधिकरण जांच

उचित अधिकरण जांच लागू करें:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // अनुरोध से उपयोगकर्ता संदर्भ प्राप्त करें
    UserContext user = request.getContext().getUserContext();
    
    // जांचें कि उपयोगकर्ता के पास आवश्यक अनुमतियाँ हैं या नहीं
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // विशिष्ट संसाधनों के लिए, उस संसाधन तक पहुँच जांचें
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // उपकरण निष्पादन के साथ आगे बढ़ें
    // ...
}
```

#### 3. संवेदनशील डेटा प्रबंधन

संवेदनशील डेटा को सावधानीपूर्वक संभालें:

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
        
        # उपयोगकर्ता डेटा प्राप्त करें
        user_data = await self.user_service.get_user_data(user_id)
        
        # सटीक अनुरोध और अधिकृत होने तक संवेदनशील फ़ील्ड्स को फ़िल्टर करें
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # अनुरोध संदर्भ में अधिकृत स्तर जांचें
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # मूल को संशोधित करने से बचने के लिए एक प्रति बनाएं
        redacted = user_data.copy()
        
        # विशिष्ट संवेदनशील फ़ील्ड्स को छिपाएं
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # नेस्टेड संवेदनशील डेटा को छिपाएं
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP उपकरणों के लिए परीक्षण सर्वोत्तम प्रथाएँ

व्यापक परीक्षण सुनिश्चित करता है कि MCP उपकरण सही ढंग से कार्य करें, एज केस संभालें, और सिस्टम के बाकी हिस्सों के साथ उचित समाकलन करें।

### यूनिट परीक्षण

#### 1. प्रत्येक उपकरण का पृथक परीक्षण करें

प्रत्येक उपकरण की कार्यक्षमता के लिए केंद्रित परीक्षण बनाएं:

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

#### 2. स्कीमा सत्यापन परीक्षण

परीक्षण करें कि स्कीमा वैध हैं और बाधाएँ उचित रूप से लागू हैं:

```java
@Test
public void testSchemaValidation() {
    // टूल उदाहरण बनाएं
    SearchTool searchTool = new SearchTool();
    
    // स्कीमा प्राप्त करें
    Object schema = searchTool.getSchema();
    
    // मान्यता के लिए स्कीमा को JSON में कनवर्ट करें
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // मान्य करें कि स्कीमा वैध JSONSchema है
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // वैध पैरामीटर का परीक्षण करें
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // आवश्यक पैरामीटर की कमी का परीक्षण करें
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // अमान्य पैरामीटर प्रकार का परीक्षण करें
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. त्रुटि प्रबंधन परीक्षण

त्रुटि स्थितियों के लिए विशिष्ट परीक्षण बनाएं:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # व्यवस्थित करें
    tool = ApiTool(timeout=0.1)  # बहुत कम समय सीमा
    
    # एक अनुरोध का मॉक करें जो समय पर समाप्त हो जाएगा
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # समय सीमा से लंबा
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # क्रियान्वयन और सत्यापन करें
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवाद संदेश सत्यापित करें
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # व्यवस्थित करें
    tool = ApiTool()
    
    # एक सीमित दर वाली प्रतिक्रिया का मॉक करें
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
        
        # क्रियान्वयन और सत्यापन करें
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # सत्यापित करें कि अपवाद में दर सीमा की जानकारी है
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### एकीकरण परीक्षण

#### 1. उपकरण श्रृंखला परीक्षण

अपेक्षित संयोजनों में एक साथ काम करने वाले उपकरणों का परीक्षण करें:

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

#### 2. MCP सर्वर परीक्षण

पूरी उपकरण पंजीकरण और निष्पादन के साथ MCP सर्वर का परीक्षण करें:

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
        // डिस्कवरी एंडपॉइंट का परीक्षण करें
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // टूल अनुरोध बनाएं
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // अनुरोध भेजें और प्रतिक्रिया सत्यापित करें
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // अमान्य टूल अनुरोध बनाएँ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // पैरामीटर "b" गायब है
        request.put("parameters", parameters);
        
        // अनुरोध भेजें और त्रुटि प्रतिक्रिया सत्यापित करें
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. एंड-टू-एंड परीक्षण

मॉडल प्रॉम्‍ट से लेकर उपकरण निष्पादन तक पूर्ण वर्कफ़्लो का परीक्षण करें:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # व्यवस्था - MCP क्लाइंट और मॉक मॉडल सेट करें
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # मॉक मॉडल प्रतिक्रियाएँ
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
    
    # मॉक वेदर टूल प्रतिक्रिया
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
        
        # क्रिया करें
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # पुष्टि करें
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### प्रदर्शन परीक्षण

#### 1. लोड परीक्षण

परीक्षण करें कि आपका MCP सर्वर कितने समवर्ती अनुरोधों को संभाल सकता है:

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

अत्यधिक लोड के तहत सिस्टम का परीक्षण करें:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // स्ट्रेस परीक्षण के लिए JMeter सेट करें
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter परीक्षण योजना कॉन्फ़िगर करें
    HashTree testPlanTree = new HashTree();
    
    // परीक्षण योजना, थ्रेड समूह, सैम्पलर आदि बनाएं
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // टूल निष्पादन के लिए HTTP सैम्पलर जोड़ें
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // लिसनर्स जोड़ें
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // परीक्षण चलाएं
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // परिणाम सत्यापित करें
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // औसत प्रतिक्रिया समय < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90वां पर्सेंटाइल < 500ms
}
```

#### 3. निगरानी और प्रोफाइलिंग

दीर्घकालिक प्रदर्शन विश्लेषण के लिए निगरानी सेटअप करें:

```python
# एक MCP सर्वर के लिए निगरानी कॉन्फ़िगर करें
def configure_monitoring(server):
    # Prometheus मीट्रिक सेट करें
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
    
    # समय निर्धारण और मीट्रिक रिकॉर्डिंग के लिए मध्यवर्ती सॉफ़्टवेयर जोड़ें
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # मीट्रिक एंडपॉइंट को उजागर करें
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP वर्कफ़्लो डिज़ाइन पैटर्न

अच्छी तरह डिज़ाइन किए गए MCP वर्कफ़्लो दक्षता, विश्वसनीयता, और रखरखाव योग्यता में सुधार करते हैं। अनुसरण करने के लिए यहाँ मुख्य पैटर्न हैं:

### 1. उपकरणों की श्रृंखला पैटर्न

कई उपकरणों को इस तरह अनुक्रम में कनेक्ट करें जहाँ प्रत्येक उपकरण का आउटपुट अगले के लिए इनपुट बन जाए:

```python
# पाइथन चेन ऑफ़ टूल्स कार्यान्वयन
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # क्रम में चलाने के लिए टूल नामों की सूची
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # चेन में प्रत्येक टूल चलाएं, पिछले परिणाम को पास करें
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # परिणाम संग्रहीत करें और अगले टूल के लिए इनपुट के रूप में उपयोग करें
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# उदाहरण उपयोग
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

### 2. डिस्पैचर पैटर्न

एक केंद्रीय उपकरण का उपयोग करें जो इनपुट के आधार पर विशेषज्ञ उपकरणों को निर्देशित करे:

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

### 3. समानांतर प्रसंस्करण पैटर्न

दक्षता के लिए कई उपकरणों को एक साथ निष्पादित करें:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // चरण 1: डेटासेट मेटाडेटा प्राप्त करें (सिंक्रोनस)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // चरण 2: कई विश्लेषण समानांतर में शुरू करें
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
        
        // सभी समानांतर कार्यों के पूरा होने तक प्रतीक्षा करें
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // पूरा होने तक प्रतीक्षा करें
        
        // चरण 3: परिणामों को मिलाएं
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // चरण 4: सारांश रिपोर्ट तैयार करें
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // पूर्ण वर्कफ़्लो परिणाम लौटाएं
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. त्रुटि पुनर्प्राप्ति पैटर्न

उपकरण विफलताओं के लिए सहज फॉलबैक लागू करें:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # पहले प्राथमिक उपकरण का प्रयास करें
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # विफलता को लॉग करें
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # द्वितीयक उपकरण पर वापस जाएं
            try:
                # वापस लौटने वाले उपकरण के लिए पैरामीटर को परिवर्तित करने की आवश्यकता हो सकती है
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # दोनों उपकरण विफल हो गए
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # यह क्रियान्वयन विशिष्ट उपकरणों पर निर्भर करेगा
        # इस उदाहरण के लिए, हम केवल मूल पैरामीटर वापस करेंगे
        return params

# उदाहरण उपयोग
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # प्राथमिक (भुगतान किए गए) मौसम एपीआई
        "basicWeatherService",    # बैकअप (मुफ्त) मौसम एपीआई
        {"location": location}
    )
```

### 5. वर्कफ़्लो संयोजन पैटर्न

सरल वर्कफ़्लो को मिलाकर जटिल वर्कफ़्लो बनाएं:

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

# MCP सर्वरों का परीक्षण: सर्वोत्तम प्रथाएँ और शीर्ष सुझाव

## अवलोकन

परीक्षण विश्वसनीय, उच्च गुणवत्ता वाले MCP सर्वर विकसित करने का एक महत्वपूर्ण पक्ष है। यह मार्गदर्शिका विकास जीवनचक्र भर में यूनिट परीक्षणों से लेकर एकीकरण परीक्षणों और एंड-टू-एंड सत्यापन तक आपके MCP सर्वरों के परीक्षण के लिए व्यापक सर्वोत्तम प्रथाएँ और सुझाव प्रदान करती है।

## MCP सर्वरों के लिए परीक्षण क्यों आवश्यक है

MCP सर्वर AI मॉडल्स और क्लाइंट अनुप्रयोगों के बीच महत्वपूर्ण मध्यस्थ के रूप में कार्य करते हैं। गहन परीक्षण सुनिश्चित करता है:

- उत्पादन परिवेशों में विश्वसनीयता
- अनुरोधों और प्रतिक्रियाओं का सटीक प्रबंधन
- MCP विनिर्देशों का उचित कार्यान्वयन
- विफलताओं और एज केस के खिलाफ लचीलापन
- विभिन्न लोड के तहत सुसंगत प्रदर्शन

## MCP सर्वरों के लिए यूनिट परीक्षण

### यूनिट परीक्षण (बुनियादी)

यूनिट परीक्षण आपके MCP सर्वर के व्यक्तिगत घटकों की पृथक जाँच करते हैं।

#### क्या परीक्षण करें

1. **संसाधन हैंडलर**: प्रत्येक संसाधन हैंडलर के तर्क का स्वतंत्र परीक्षण करें
2. **उपकरण कार्यान्वयन**: विभिन्न इनपुट के साथ उपकरण व्यवहार सत्यापित करें
3. **प्रॉम्‍ट टेम्पलेट्स**: सुनिश्चित करें कि प्रॉम्‍ट टेम्पलेट्स सही ढंग से प्रस्तुत हों
4. **स्कीमा सत्यापन**: पैरामीटर सत्यापन तर्क का परीक्षण करें
5. **त्रुटि प्रबंधन**: अवैध इनपुट के लिए त्रुटि प्रतिक्रियाओं का परीक्षण करें

#### यूनिट परीक्षण के लिए सर्वोत्तम प्रथाएँ

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
# पाइथन में एक कैलकुलेटर टूल के लिए उदाहरण यूनिट टेस्ट
def test_calculator_tool_add():
    # व्यवस्था करें
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # क्रिया करें
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # सत्यापित करें
    assert result["value"] == 12
```

### एकीकरण परीक्षण (मध्य स्तर)

एकीकरण परीक्षण आपके MCP सर्वर के घटकों के बीच इंटरैक्शन को सत्यापित करते हैं।

#### क्या परीक्षण करें

1. **सर्वर आरंभिकरण**: विभिन्न विन्यास के साथ सर्वर स्टार्टअप का परीक्षण करें
2. **रूट पंजीकरण**: सुनिश्चित करें कि सभी एंडपॉइंट्स सही ढंग से पंजीकृत हैं
3. **अनुरोध प्रक्रिया**: पूर्ण अनुरोध-प्रतिक्रिया चक्र का परीक्षण करें
4. **त्रुटि प्रसार**: सुनिश्चित करें कि त्रुटियाँ सभी घटकों में ठीक से संभाली जाती हैं
5. **प्रमाणीकरण और अधिकरण**: सुरक्षा तंत्रों का परीक्षण करें

#### एकीकरण परीक्षण के लिए सर्वोत्तम प्रथाएँ

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

### एंड-टू-एंड परीक्षण (शीर्ष स्तर)

एंड-टू-एंड परीक्षण क्लाइंट से सर्वर तक संपूर्ण सिस्टम व्यवहार को सत्यापित करते हैं।

#### क्या परीक्षण करें

1. **क्लाइंट-सर्वर संचार**: पूर्ण अनुरोध-प्रतिक्रिया चक्र का परीक्षण करें
2. **वास्तविक क्लाइंट SDKs**: वास्तविक क्लाइंट कार्यान्वयन के साथ परीक्षण करें
3. **लोड के तहत प्रदर्शन**: कई समवर्ती अनुरोधों के साथ व्यवहार सत्यापित करें
4. **त्रुटि पुनर्प्राप्ति**: विफलताओं से सिस्टम पुनर्प्राप्ति का परीक्षण करें
5. **लंबे चलने वाले ऑपरेशन**: स्ट्रीमिंग और लंबी प्रक्रियाओं की हैंडलिंग सत्यापित करें

#### एंड-टू-एंड परीक्षण के लिए सर्वोत्तम प्रथाएँ

```typescript
// टाइपस्क्रिप्ट में क्लाइंट के साथ उदाहरण E2E टेस्ट
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // परीक्षण पर्यावरण में सर्वर शुरू करें
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // क्रिया करें
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // पुष्टि करें
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP परीक्षण के लिए मॉकिंग रणनीतियाँ

मॉकिंग परीक्षण के दौरान घटकों को पृथक करने के लिए आवश्यक है।

### मॉक करने वाले घटक

1. **बाहरी AI मॉडल्स**: पूर्वानुमानित परीक्षण के लिए मॉडल प्रतिक्रियाओं को मॉक करें
2. **बाहरी सेवाएँ**: API निर्भरताओं (डेटाबेस, थर्ड पार्टी सेवाएँ) को मॉक करें
3. **प्रमाणीकरण सेवाएँ**: पहचान प्रदाताओं को मॉक करें
4. **संसाधन प्रदाता**: महंगे संसाधन हैंडलर्स को मॉक करें

### उदाहरण: AI मॉडल प्रतिक्रिया का मॉकिंग

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
# Python unittest.mock के साथ उदाहरण
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # मॉक कॉन्फ़िगर करें
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # परीक्षण में मॉक का उपयोग करें
    server = McpServer(model_client=mock_model)
    # परीक्षण के साथ जारी रखें
```

## प्रदर्शन परीक्षण

प्रदर्शन परीक्षण उत्पादन MCP सर्वरों के लिए महत्वपूर्ण है।

### क्या मापें

1. **लेटेंसी**: अनुरोधों के लिए प्रतिक्रिया समय
2. **थ्रुपुट**: प्रति सेकंड हैंडल किए गए अनुरोध
3. **संसाधन उपयोग**: CPU, मेमोरी, नेटवर्क उपयोग
4. **समवर्ती हैंडलिंग**: समानांतर अनुरोधों के तहत व्यवहार
5. **स्केलिंग विशेषताएँ**: लोड बढ़ने पर प्रदर्शन

### प्रदर्शन परीक्षण के उपकरण

- **k6**: खुला स्रोत लोड परीक्षण उपकरण
- **JMeter**: व्यापक प्रदर्शन परीक्षण
- **Locust**: पायथन आधारित लोड परीक्षण
- **Azure Load Testing**: क्लाउड आधारित प्रदर्शन परीक्षण

### उदाहरण: k6 के साथ बुनियादी लोड टेस्ट

```javascript
// MCP सर्वर के लिए लोड टेस्टिंग के लिए k6 स्क्रिप्ट
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 वर्चुअल यूजर्स
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

## MCP सर्वरों के लिए परीक्षण स्वचालन

अपने परीक्षणों को स्वचालित करना सुनिश्चित करता है सुसंगत गुणवत्ता और तेज प्रतिक्रिया चक्र।

### CI/CD एकीकरण

1. **पुल अनुरोधों पर यूनिट परीक्षण चलाएं**: सुनिश्चित करें कि कोड परिवर्तन मौजूदा कार्यक्षमता को बाधित न करें
2. **स्टेजिंग में एकीकरण परीक्षण**: प्री-प्रोडक्शन वातावरणों में एकीकरण परीक्षण चलाएं  
3. **प्रदर्शन मानक**: रिग्रेशन पकड़ने के लिए प्रदर्शन बेंचमार्क बनाए रखें  
4. **सुरक्षा स्कैन**: पाइपलाइन के हिस्से के रूप में सुरक्षा परीक्षण स्वचालित करें  

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
  
## MCP विनिर्देशन के अनुपालन के लिए परीक्षण

सुनिश्चित करें कि आपका सर्वर MCP विनिर्देशन को सही ढंग से लागू करता है।

### महत्वपूर्ण अनुपालन क्षेत्र

1. **API एंडपॉइंट्स**: आवश्यक एंडपॉइंट्स (/resources, /tools आदि) का परीक्षण करें  
2. **अनुरोध/प्रतिक्रिया प्रारूप**: स्कीमा अनुपालन मान्य करें  
3. **त्रुटि कोड**: विभिन्न परिस्थितियों के लिए सही स्थिति कोड सत्यापित करें  
4. **सामग्री के प्रकार**: विभिन्न सामग्री प्रकारों के हैंडलिंग का परीक्षण करें  
5. **प्रमाणीकरण प्रवाह**: विनिर्देशन-अनुपालक प्रमाणीकरण तंत्र सत्यापित करें  

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
  
## प्रभावी MCP सर्वर परीक्षण के लिए शीर्ष 10 सुझाव

1. **उपकरण परिभाषाओं का स्वतंत्र परीक्षण करें**: उपकरण तर्क से स्वतंत्र रूप से स्कीमा परिभाषाओं की पुष्टि करें  
2. **पैरामीटर वाले परीक्षण उपयोग करें**: विभिन्न इनपुट्स, जिसमें एज मामलों भी शामिल हैं, के साथ उपकरणों का परीक्षण करें  
3. **त्रुटि प्रतिक्रियाओं की जांच करें**: सभी संभव त्रुटि स्थितियों के लिए उचित त्रुटि प्रबंधन सत्यापित करें  
4. **प्राधिकरण तर्क का परीक्षण करें**: विभिन्न उपयोगकर्ता भूमिकाओं के लिए उचित एक्सेस नियंत्रण सुनिश्चित करें  
5. **टेस्ट कवरेज पर निगरानी रखें**: महत्वपूर्ण पथ कोड के उच्च कवरेज का लक्ष्य रखें  
6. **स्ट्रीमिंग प्रतिक्रियाओं का परीक्षण करें**: स्ट्रीमिंग सामग्री के सही हैंडलिंग की पुष्टि करें  
7. **नेटवर्क समस्याओं का अनुकरण करें**: खराब नेटवर्क परिस्थितियों में परीक्षण करें  
8. **संसाधन सीमाओं का परीक्षण करें**: कोटा या दर सीमाओं तक पहुंचने पर व्यवहार सत्यापित करें  
9. **रिग्रेशन परीक्षण स्वचालित करें**: ऐसे सूट बनाएं जो प्रत्येक कोड परिवर्तन पर चले  
10. **परीक्षण मामलों का दस्तावेजीकरण करें**: परीक्षण परिदृश्यों का स्पष्ट दस्तावेज़ बनाए रखें  

## सामान्य परीक्षण त्रुटियां

- **सुखद पथ परीक्षण पर अधिक निर्भरता**: त्रुटि मामलों का पूरा परीक्षण करना सुनिश्चित करें  
- **प्रदर्शन परीक्षण की अनदेखी**: उत्पादन को प्रभावित करने से पहले बाधाओं की पहचान करें  
- **केवल पृथक परीक्षण करना**: यूनिट, एकीकरण, और E2E परीक्षणों को मिलाएं  
- **अपूर्ण API कवरेज**: सुनिश्चित करें कि सभी एंडपॉइंट्स और सुविधाओं का परीक्षण किया गया हो  
- **असंगत परीक्षण वातावरण**: निरंतर परीक्षण पर्यावरण सुनिश्चित करने के लिए कंटेनरों का उपयोग करें  

## निष्कर्ष

एक व्यापक परीक्षण रणनीति विश्वसनीय, उच्च गुणवत्ता वाले MCP सर्वरों के विकास के लिए आवश्यक है। इस गाइड में उल्लिखित सर्वोत्तम प्रथाओं और सुझावों को लागू करके, आप सुनिश्चित कर सकते हैं कि आपकी MCP कार्यांवितियां उच्चतम गुणवत्ता, विश्वसनीयता, और प्रदर्शन मानकों को पूरा करें।  

## मुख्य निष्कर्ष

1. **उपकरण डिजाइन**: एकल जिम्मेदारी सिद्धांत का पालन करें, डिपेंडेंसी इंजेक्शन का उपयोग करें, और संयोज्य डिज़ाइन के लिए डिजाइन करें  
2. **स्कीमा डिजाइन**: स्पष्ट, अच्छी तरह से प्रलेखित स्कीमा बनाएं जिनमें उचित सत्यापन प्रतिबंध हों  
3. **त्रुटि प्रबंधन**: अनुग्रहपूर्ण त्रुटि प्रबंधन, संरचित त्रुटि प्रतिक्रियाएं, और पुन: प्रयास तर्क लागू करें  
4. **प्रदर्शन**: कैशिंग, असिंक्रोनस प्रोसेसिंग, और संसाधन थ्रॉटलिंग का उपयोग करें  
5. **सुरक्षा**: व्यापक इनपुट सत्यापन, प्राधिकरण जांच, और संवेदनशील डेटा प्रबंधन लागू करें  
6. **परीक्षण**: व्यापक यूनिट, एकीकरण, और एंड-टू-एंड परीक्षण बनाएं  
7. **वर्कफ़्लो पैटर्न**: स्थापित पैटर्न जैसे कि चेन, डिस्पैचर, और समानांतर प्रोसेसिंग लागू करें  

## अभ्यास

एक MCP उपकरण और वर्कफ़्लो डिज़ाइन करें जो एक दस्तावेज़ प्रसंस्करण प्रणाली के लिए है जिसमें:  

1. विभिन्न प्रारूपों (PDF, DOCX, TXT) में दस्तावेज़ स्वीकार किए जाते हैं  
2. दस्तावेज़ों से पाठ और मुख्य जानकारी निकाली जाती है  
3. दस्तावेज़ों को उनके प्रकार और सामग्री के आधार पर वर्गीकृत किया जाता है  
4. प्रत्येक दस्तावेज़ का सारांश उत्पन्न किया जाता है  

उपकरण स्कीमा, त्रुटि प्रबंधन, और ऐसे वर्कफ़्लो पैटर्न को लागू करें जो इस परिदृश्य के लिए सबसे उपयुक्त हों। सोचें कि आप इस कार्यांविती का परीक्षण कैसे करेंगे।  

## संसाधन

1. नवीनतम विकासों के बारे में अपडेट रहने के लिए [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) में MCP समुदाय से जुड़ें  
2. ओपन-सोर्स [MCP परियोजनाओं](https://github.com/modelcontextprotocol) में योगदान दें  
3. अपनी संगठन की AI पहलों में MCP सिद्धांत लागू करें  
4. अपने उद्योग के लिए विशेष MCP कार्यानों का पता लगाएं  
5. मल्टी-मोडल इंटिग्रेशन या एंटरप्राइज एप्लिकेशन इंटिग्रेशन जैसे विशिष्ट MCP विषयों पर उन्नत पाठ्यक्रम लेने पर विचार करें  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) के माध्यम से सीखे गए सिद्धांतों का उपयोग करके अपने स्वयं के MCP उपकरण और वर्कफ़्लो का निर्माण करें  

## आगे क्या है

आगे: [केस स्टडी](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->