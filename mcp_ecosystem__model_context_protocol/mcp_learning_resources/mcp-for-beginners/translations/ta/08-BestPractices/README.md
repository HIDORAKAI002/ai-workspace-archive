# MCP மேம்பாட்டு சிறந்த நடைமுறைகள்

[![MCP Development Best Practices](../../../translated_images/ta/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(இந்த பாடத்தின் வீடியோக்களைப் பார்க்க மேற்குள்ள படத்தை சொடுக்கவும்)_

## பார்வை

இந்த பாடம் MCP சேவையகங்கள் மற்றும் அம்சங்களை உற்பத்தி சூழல்களில் உருவாக்கவும், சோதனையிடவும் மற்றும் போக்குவரத்தில் ஏற்றவும் முன்முனைவு சிறந்த நடைமுறைகளை நோக்கமாக்குகிறது. MCP சூழல்கள் பெரியபடியாகவும் முக்கியத்துவமாகவும் மாறும்போது, நிலைநிறுத்தப்பட்ட மாதிரிகள் நம்பகத்தன்மை, பராமரிப்புத்தன்மை மற்றும் தற்போதைய ஒருங்கிணைப்பை உறுதிசெய்கின்றன. இந்த பாடம் உண்மையான MCP அமலாக்கங்களிலிருந்து பெற்ற நடைமுறை ஞானத்தை ஒருங்கிணைக்கிறது, இதன் மூலம் வலுவான, திறமையான சேவையகங்களை செயல்திறன் வாய்ந்த வளங்கள், நிகழ்படிகள் மற்றும் கருவிகளுடன் உருவாக்க வழிகாட்டுகிறது.

## கற்றல் நோக்கங்கள்

இந்த பாடத்தின் முடிவில், நீங்கள் பின்வருவன செய்யக்கூடியதாக இருப்பீர்கள்:

- MCP சேவையகங்களின் மற்றும் அம்சங்களின் வடிவமைப்பில் தொழில்துறை சிறந்த நடைமுறைகளை பொருத்துக
- MCP சேவையகங்களுக்கான முழுமையான சோதனை நெறிமுறைகளை உருவாக்குக
- கடினமான MCP செயலிகளுக்கான திறமையான, மறுபயன்படக்கூடிய பணிகள் வடிவமைப்புக்களை வடிவமைக்கவும்
- MCP சேவையகங்களில் சரியான பிழை கையாள்தல், பதிவேற்றம் மற்றும் கண்காணிப்பை செயல்படுத்துக
- செயல்திறன், பாதுகாப்பு மற்றும் பராமரிப்புத்தன்மைக்காக MCP செயல்பாடுகளை மேம்படுத்துக

## MCP அடிப்படை கொள்கைகள்

சோதனை நடைமுறைகளை அமல்படுத்தும் முன், MCP மேம்பாட்டை வழிநடத்தும் அடிப்படை கொள்கைகளை புரிந்துகொள்வது முக்கியமானது:

1. **தரப்பட்ட தகவல் பரிமாற்றம்**: MCP அதன் அடித்தளமாக JSON-RPC 2.0-ஐ பயன்படுத்துகிறது, இது அனைத்து அமல்பாடுகளுக்கும் கோரிக்கைகள், பதில்கள் மற்றும் பிழை கையாள்தலுக்கான ஒரே மாதிரியான வடிவத்தை வழங்குகிறது.

2. **பயனர் மையமான வடிவமைப்பு**: உங்கள் MCP செயல்பாடுகளில் எப்போதும் பயனர் ஒப்புதலையும், கட்டுப்பாட்டையும், வெளிப்படைத்தன்மையையும் முன்னிலைப்படுத்துங்கள்.

3. **பாதுகாப்பு முதலில்**: அங்கீகாரம், அனுமதி, சரிபார்ப்பு மற்றும் முறை வரம்பிடல் உள்ளிட்ட வலுவான பாதுகாப்பு முறைகளை அமல்படுத்தவும்.

4. **அலகுபடுத்தப்பட்ட கட்டமைப்பு**: ஒவ்வொரு கருவி மற்றும் வளத்துக்கும் தெளிவான, கவனம் செலுத்தப்பட்ட நோக்கத்துடன் உங்கள் MCP சேவையகங்களை வடிவமைக்கவும்.

5. **நிலைமையுள்ள தொடர்புகள்**: பல கோரிக்கைகளுக்கு இடையே நிலையை கையாளும் MCP திறன்களைப் பயன்படுத்தி, மேலும் ஒற்றுமையான மற்றும் கருத்துநிலைத்த தொடர்புகளை ஏற்படுத்தவும்.

## அதிகாரபூர்வ MCP சிறந்த நடைமுறைகள்

பின்வரும் சிறந்த நடைமுறைகள் அதிகாரபூர்வ Model Context Protocol ஆவணத்திலிருந்து பெறப்பட்டவை:

### பாதுகாப்பு சிறந்த நடைமுறைகள்

1. **பயனர் ஒப்புதல் மற்றும் கட்டுப்பாடு**: தரவை அணுகுவதற்கு அல்லது செயல்களை மேற்கொள்ள முன் எப்போதும் நன்கு வெளிப்படுத்தப்பட்ட பயனர் ஒப்புதலை தேவைப்படுத்தவும். எந்த தரவு பகிரப்படுகிறது மற்றும் எந்த செயல்கள் அங்கீகாரம் பெற்றவை என்பதில் தெளிவான கட்டுப்பாடு வழங்கவும்.

2. **தரவு தனியுரிமை**: நன்கு வெளிப்படுத்தப்பட்ட ஒப்புதலுடன் மட்டுமே பயனர் தரவை வெளிப்படுத்து; பொருத்தமான அணுகல் கட்டுப்பாடுகளுடன் பாதுகாக்கவும். அனுமதி இல்லாத தரவு பரிமாற்றத்தைத் தடுக்கும்.

3. **கருவி பாதுகாப்பு**: எந்த கருவியினையும் இயக்குவதற்கு முன் நன்கு வெளிப்படுத்தப்பட்ட பயனர் ஒப்புதலைக் கேட்கவும். பயனர்கள் ஒவ்வொரு கருவியின் செயல்பாட்டை புரிந்து கொள்ளப்படுத்தவும் மற்றும் வலுவான பாதுகாப்பு எல்லைகளை அமல்படுத்தவும்.

4. **கருவி அனுமதி கட்டுப்பாடு**: ஒரு அமர்வின் போது எந்த கருவிகளை ஒரு மாதிரி பயன்படுத்த அனுமதிக்கப்படுகிறது என்பதை கட்டமைத்து, நன்கு வெளிப்படுத்தப்பட்ட அனுமதிக்கப்பட்ட கருவிகள் மட்டுமே அணுகக்கூடியதாக இருக்க அனுமதிக்கவும்.

5. **அங்கீகாரம்**: கருவிகள், வளங்கள் அல்லது உணர்திறன் வாய்ந்த செயல்பாடுகளுக்கு அணுகல் வழங்குவதற்கு முன் உரிய அங்கீகாரம் தேவைப்படுத்தவும்; API விசைகள், OAuth டோக்கன்கள் அல்லது பிற பாதுகாப்பான அங்கீகார முறைகளை பயன்படுத்தவும்.

6. **பரிமாண சரிபார்ப்பு**: அனைத்து கருவி அழைப்புகளுக்கும் பரிமாண சரிபார்ப்பை கடைபிடிக்கவும், இயந்திரவியல் அல்லது தீங்கான உள்ளீடு கருவி அமல்பாடுகளுக்கு சென்றுவிடாமல் தடுக்கும்.

7. **முறை வரம்பிடல்**: தவறான பயன்பாட்டைக் குறைக்கவும் மற்றும் சேவையக வளங்களின் சம உரிமையாளராக பயன்பாடு உறுதிசெய்யும் வகையில் முறை வரம்பிடலை அமல்படுத்தவும்.

### அமல்படுத்தல் சிறந்த நடைமுறைகள்

1. **சாதிக்கத்தகவு பேச்சுவார்த்தை**: இணைபிரியல்காலத்தில், ஆதரவு அளிக்கும் அம்சங்கள், நெறிமுறை பதிப்புகள், கிடைக்கும் கருவிகள் மற்றும் வளங்கள் குறித்த தகவலை பரிமாறிக்கொள்ளவும்.

2. **கருவி வடிவமைப்பு**: பல பிரச்சனைகளை கையாளும் ஒரு பெரிய கருவி பதிலாக, ஒரு விஷயத்தில் சிறப்பாக செயற்படும் கவனம் செலுத்தப்பட்ட கருவிகளை உருவாக்கவும்.

3. **பிழை கையாள்தல்**: பிரச்சனைகளை கண்டறிய உதவும், தோல்விகளை அறுமுறை கையாளும் மற்றும் செயல்திறனான கருத்துக்களை வழங்கும் தரப்பட்ட பிழை செய்திகள் மற்றும் குறியீடுகளை செயல்படுத்தவும்.

4. **பதிவேற்றம்**: கணக்கெடுப்பு, பிழைத்திருட்டு மற்றும் நெறிமுறை தொடர்புகளை கண்காணிக்கக் கட்டமைக்கப்பட்ட பதிவுகளை அமைக்கவும்.

5. **முன்னேற்ற கண்காணிப்பு**: நீண்டநேர செயல்பாடுகளுக்காக முன்னேற்றத்தைப் பற்றிய புதுப்பிப்புகளை வழங்கி பதிலளிக்கும் பயனர் இடைமுகங்களை இயக்கவும்.

6. **கோரிக்கை ரத்து**: தேவையற்ற அல்லது மிகவும் காலம் எடுத்துவரும் நடுவணத்தில் உள்ள கோரிக்கைகளை வாடிக்கையாளர்கள் ரத்து செய்ய அனுமதிக்கவும்.

## கூடுதல் குறிப்புகள்

MCP சிறந்த நடைமுறைகள் குறித்த தற்போதைய தகவலுக்கு பின்வருவனவைக் காணவும்:

- [MCP ஆவணம்](https://modelcontextprotocol.io/)
- [MCP விவரக்குறிப்பு (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub சேமிப்பகம்](https://github.com/modelcontextprotocol)
- [பாதுகாப்பு சிறந்த நடைமுறைகள்](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP முன்னணி 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - பாதுகாப்பு அபாயங்கள் மற்றும் சமாளிப்புகள்
- [MCP பாதுகாப்பு மாநாடு பணிமனை (Sherpa)](https://azure-samples.github.io/sherpa/) - செயன்முறை பாதுகாப்பு பயிற்சி

## நடைமுறை செயல்படுத்தல் உதாரணங்கள்

### கருவி வடிவமைப்பு சிறந்த நடைமுறைகள்

#### 1. ஒரே பொறுப்பு கொள்கை

ஒவ்வொரு MCP கருவிக்கும் தெளிவான, கவனம் செலுத்தப்பட்ட நோக்கமுள்ளதாய் இருக்க வேண்டும். பல பிரச்சனைகளை ஒரே கருவி கையாள முயலுவதற்குப் பதிலாக, குறிப்பிட்ட பணிகளில் சிறப்பாக செயல்படும் சிறப்பு கருவிகளை உருவாக்கவும்.

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

#### 2. உடன் பிழை கையாள்தல்

பொருத்தமான பிழை செய்திகள் மற்றும் மீட்பு முறைகளை கொண்ட வலுவான பிழை கையாள்தலை செயல்படுத்தவும்.

```python
# முழுமையான பிழை கையாளுதலுடன் கூடிய Python எடுத்துக்காட்டு
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # அளவுரு சரிபார்ப்பு
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # பாதுகாப்பு சரிபார்ப்பு
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # கால எல்லையுடன் தரவுத்தள செயல்பாடு
                async with timeout(10):  # 10 வினாடி கால எல்லை
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # இணைப்பு பிழைகள் தற்காலிகமாக இருக்கலாம்
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # கேள்வி பிழைகள் அதிகமாக வாடிக்கையாளர் பிழைகள்
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # கருவி-சார்ந்த பிழைகள் கடந்து செல்லட்டும்
            raise
        except Exception as e:
            # எதிர்பாராத பிழைகளுக்கான அனைத்தும் பிடித்தல்
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL சுழற்சி கண்டறிதலை செயல்படுத்தல்
        pass
        
    def _log_error(self, message, error):
        # பிழை பதிவு செயல்படுத்தல்
        pass
```

#### 3. பரிமாண சரிபார்ப்பு

தவறான அல்லது தீங்கான உள்ளீட்டை தடுக்கும் வகையில் எப்போதும் பரிமாணங்களை முழுமையாக சரிபார்க்கவும்.

```javascript
// விரிவான அளவுரு சரிபார்ப்புடன் JavaScript/TypeScript உதாரணம்
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
    // 1. அளவுரு இருப்பை சரிபார்க்கவும்
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. அளவுரு வகைகளை சரிபார்க்கவும்
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. அளவுரு மதிப்புகளை சரிபார்க்கவும்
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. எழுதும் செயல்பாட்டிற்கும் உள்ளடக்க இருப்பையும் சரிபார்க்கவும்
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. பாதை பாதுகாப்பு சரிபார்ப்பு
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // சரிபார்க்கப்பட்ட அளவுருக்களின் அடிப்படையில் செயலாக்கம்
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // பாதை பாதுகாப்பு சரிபார்ப்பின் செயலாக்கம்
    // ...
  }
}
```

### பாதுகாப்பு செயல்படுத்தல் உதாரணங்கள்

#### 1. அங்கீகாரம் மற்றும் அனுமதி

```java
// அங்கீகாரம் மற்றும் அனுமதியுடன் கூடிய ஜாவா உதாரணம்
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // சார்பு உட்சோபம்
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
        // 1. அங்கீகார சூழலை பெற்றெடு
        String authToken = request.getContext().getAuthToken();
        
        // 2. பயனரைக் கணக்கிடுக
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. குறிப்பிட்ட செயலுக்கான அனுமதியைச் சரிபார்
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. அனுமதிக்கப்பட்ட செயலுடன் முன்னெடு
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

#### 2. முறை வரம்பிடல்

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

## சோதனை சிறந்த நடைமுறைகள்

### 1. MCP கருவிகளுக்கான தனி சோதனை

கருவிகளை தனியாக சோதித்து, வெளியிடுந்து சார்ந்ததுக்களை உருவாக்குக:

```typescript
// TypeScript ஒரு கருவி யூனிட் தேர்வின் உதவிக்கு உதாரணம்
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ஒரு மோக் வானிலை சேவையை உருவாக்குங்கள்
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // மோக் சார்பு கொண்டு கருவியை உருவாக்குங்கள்
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // ஏற்பாடு செய்யும்
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // செயல் படுத்து
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // உறுதிப்படுத்து
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // ஏற்பாடு செய்யும்
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // செயல் படுத்தும் & உறுதிப்படுத்தும்
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. ஒருங்கிணைப்பு சோதனை

வாடிக்கையாளர் கோரிக்கைகளிலிருந்து சேவையக பதில்களுக்கு முழு ஓட்டத்தை சோதிக்கவும்:

```python
# Python ஒருங்கிணைப்பு சோதிப்பு உதாரணம்
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # ஒரு சோதனை சர்வரை தொடங்கு
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # ஒரு கிளையன்டை உருவாக்கு
        client = McpClient("http://localhost:5000")
        
        # கருவி கண்டுபிடிப்பை சோதிக்கவும்
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # கருவி இயக்கத்தை சோதிக்கவும்
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # பதிலை உறுதிப்படுத்தவும்
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # சுத்தப்படுத்தல்
        await server.stop()
```

## செயல்திறன் மேம்படுத்தல்

### 1. மாதிரிகை நெறிமுறைகள்

வந்திறுக்கும்மையும் வள பயன்பாட்டையும் குறைக்க பொருத்தமான மாதிரிகையை செயல்படுத்தவும்:

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

#### 2. சார்பு ஊட்டுதல் மற்றும் சோதனைக்குரியமை

கருவிகளுக்கு கட்டுமான ஊட்டுதலின் வழியாக சொந்த சார்புகளை வழங்குவதற்கான வடிவமைப்புக்களை செய்யவும், இதனால் அவை சோதிக்கக்கூடியதும் கட்டமைக்கக்கூடியதுமாக மாறுகின்றன:

```java
// சார்பு ஊட்டு உதவியுடன் ஜாவா எடுத்துக்காட்டு
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // கட்டுமானத்தின் மூலம் ஊட்டப்பட்ட சார்புகள்
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // கருவி அமல்படுத்தல்
    // ...
}
```

#### 3. ஒன்றிணைக்கக்கூடிய கருவிகள்

அதிகக் கடினமான பணிகளுக்கான பெரும் பணிமுறைகளை உருவாக்க ஒன்றிணைத்துக்கொள்ளக்கூடிய கருவிகளைக் வடிவமைக்கவும்:

```python
# பைதான் எடுத்துக்காட்டு கூட்டக்கூடிய கருவிகள் காட்டுகிறது
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # செயலாக்கம்...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # இந்த கருவி dataFetch கருவியின் முடிவுகளை பயன்படுத்தலாம்
    async def execute_async(self, request):
        # செயலாக்கம்...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # இந்த கருவி dataAnalysis கருவியின் முடிவுகளை பயன்படுத்தலாம்
    async def execute_async(self, request):
        # செயலாக்கம்...
        pass

# இந்தக் கருவிகள் தனித்தனியாக அல்லது ஒரு வேலைத் தொடரின் பகுதியாக பயன்படுத்தப்படலாம்
```

### திட்ட வடிவமைப்பு சிறந்த நடைமுறைகள்

திட்டம்இன்பது மாதிரிக்கும் உங்கள் கருவிக்கும் இடையேயான ஒப்பந்தமாகும். நன்றாக வடிவமைக்கப்பட்ட திட்டங்கள் சிறந்த கருவி பயன்படுத்துதலை தூண்டுகிறது.

#### 1. தெளிவான பரிமாண விளக்கங்கள்

ஒவ்வொரு பரிமாணத்திற்கும் விளக்க மிக்க தகவல்களை எப்பொழுதும் சேர்க்கவும்:

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

#### 2. சரிபார்ப்பு கட்டுப்பாடுகள்

தவறான உள்ளீடுகளைத் தடுக்கும் சரிபார்ப்பு கட்டுப்பாடுகளைச் சேர்க்கவும்:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // வடிவமைப்பு சரிபார்ப்பு கொண்ட மின்னஞ்சல் பண்பு
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // கணிதத்துக்கான வரம்புகளுடன் வயது பண்பு
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // எண்ணிய பண்பு
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

#### 3. ஒருமையாக மாற்றும் அமைப்புகள்

மாதிரிகள் முடிவுகளை விளக்கும் போது எளிதாக்கும் வகையில் பதிலளிப்பு அமைப்புகளில் ஒருமை நிரூபிக்கவும்:

```python
async def execute_async(self, request):
    try:
        # கோரிக்கையை செயலாக்கவும்
        results = await self._search_database(request.parameters["query"])
        
        # எப்போதும் ஒரே மாதிரியான கட்டமைப்பைத் திருப்பிச் செய்யவும்
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

### பிழை கையாள்தல்

MCP கருவிகளின் நம்பகத்தன்மை காப்பதற்காக வலுவான பிழை கையாள்தல் அவசியம்.

#### 1. சரியான முறையில் பிழைகளை கையாள்தல்

தகுந்த அடுக்குகளில் பிழைகளை கையாள்ந்து, விளக்கமான செய்திகளை வழங்கவும்:

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

#### 2. கட்டமைக்கப்பட்ட பிழை பதில்கள்

சாத்தியமான இடத்தில் கட்டமைக்கப்பட்ட பிழை தகவல்களை திருப்பி வழங்கவும்:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // அமல் படுத்தல்
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
        
        // மற்ற தவறுகளை ToolExecutionException ஆக மீண்டும் எறிதல்
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. மீண்டும் முயற்சி செய்யும் தந்திரம்

தற்காலிக தோல்விகளுக்கு பொருத்தமான மீண்டும் முயற்சி செய்யும் தந்திரங்களை செயல்படுத்தவும்:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # விநாடிகள்
    
    while retry_count < max_retries:
        try:
            # வெளிப்புற API ஐ அழைக்கவும்
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # எழுச்சி விகித கோளாறு
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # தற்காலிகமற்ற பிழை, மீண்டும் முயற்சிக்க வேண்டாம்
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### செயல்திறன் மேம்படுத்தல்

#### 1. மாதிரி வைத்தல்

சிதம்பரமான செயல்பாடுகளுக்காக மாதிரிபோட்டலை செயல்படுத்தவும்:

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

#### 2. முன்னிலை செயலாக்கம்

I/O சார்ந்த செயல்பாடுகளுக்காக முந்தைய இனங்காணும் நிரல்பாடுகளைப் பயன்படுத்தவும்:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // நீண்ட காலம் ஓடும் செயலிகளுக்காக, உடனடி செயலாக்க ID ஐ திருப்பிவிடு
        String processId = UUID.randomUUID().toString();
        
        // அசிங்க் செயல்பாட்டை தொடங்கு
        CompletableFuture.runAsync(() -> {
            try {
                // நீண்ட காலம் ஓடும் செயலியை செயற்படுத்து
                documentService.processDocument(documentId);
                
                // நிலையை புதுப்பி (இது வழக்கமாக தரவுத்தளத்தில் சேமிக்கப்படும்)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // செயலாக்க ID உடனடி பதிலை திருப்பி விடு
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // துணை நிலை சோதனை கருவி
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

#### 3. வள தாராளமறைவு

ஏற்றுமதியைத் தடுக்க வளத் தளர்வை செயல்படுத்தவும்:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # ஒவ்வொரு வினாடிக்கும் 5 கோரிக்கைகளை அனுமதிக்கவும்
            bucket_size=10        # 10 கோரிக்கைகள் வரை அதிர tiros
        )
    
    async def execute_async(self, request):
        # நாம் தொடரக்கூடியதா அல்லது காத்திருக்க வேண்டுமா என்பதை சரிபார்க்கவும்
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # காத்திருப்பது மிக நீண்டது என்றால்
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # சரியான தாமத நேரம் வரை காத்திருங்கள்
                await asyncio.sleep(delay)
        
        # ஒரு டோக்கனை பயன்படுத்தி கோரிக்கையை தொடரவும்
        self.rate_limiter.consume()
        
        # API ஐ அழைக்கவும்
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
            
            # அடுத்த டோக்கன் கிடைக்கும் வரை நேரத்தை கணக்கிடுக
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # கழிந்த நேரத்தின் அடிப்படையில் புதிய டோக்கன்களை சேர்க்கவும்
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### பாதுகாப்பு சிறந்த நடைமுறைகள்

#### 1. உள்ளீடு சரிபார்ப்பு

எப்பொழுதும் உள்ளீடுகளை முழுமையாக சரிபார்க்கவும்:

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

#### 2. அனுமதி சோதனைகள்

பொருத்தமான அனுமதி சோதனைகளை செயல்படுத்தவும்:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // கோரிக்கையில் இருந்து பயனர் சூழலைப் பெறுக
    UserContext user = request.getContext().getUserContext();
    
    // பயனருக்கு தேவையான அனுமதிகள் உள்ளதா என சரிபார்க்கவும்
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // குறிப்பிட்ட வளங்களுக்கு, அந்த வளத்திற்கு அணுகலைச் சரிபார்க்கவும்
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // கருவி இயக்கத்துடன் தொடரவும்
    // ...
}
```

#### 3. அனர்த்தமான தரவு கையாள்தல்

அனர்த்தமான தரவை கவனமாக கையாளவும்:

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
        
        # பயனர் தரவைப் பெறவும்
        user_data = await self.user_service.get_user_data(user_id)
        
        # வெளிப்படையாக கோரப்படாத மற்றும் அனுமதிக்கப்பட்டிராத உணர்ச்சிபூர்வமான புலங்களை வடிகட்டவும்
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # கோரிக்கை சூழலில் அனுமதி நிலையை சரிபார்க்கவும்
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # அசல் மாற்றப்படாதபடி ஒரு நகலை உருவாக்கவும்
        redacted = user_data.copy()
        
        # குறிப்பிட்ட உணர்ச்சிபூர்வமான புலங்களை மறைக்கவும்
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # உட்பட்ட உணர்ச்சிபூர்வமான தரவை மறைக்கவும்
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP கருவிகளுக்கான சோதனை சிறந்த நடைமுறைகள்

முழுமையான சோதனை MCP கருவிகள் சரியாக செயல்படுவதை, மூலையிடும் நிலைகளையும்.HandleEdgeCases மற்றும் சந்திக்கின்றனவை அவற்றுடன் முறையான ஒருங்கிணைப்பையும் உறுதி செய்கிறது.

### தனி சோதனை

#### 1. ஒவ்வொரு கருவியையும் தனியாக சோதனை செய்தல்

ஒவ்வொரு கருவியின் செயல்பாட்டிற்கும் கவனம் செலுத்திய சோதனைகளை உருவாக்கவும்:

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

#### 2. திட்ட சரிபார்ப்பு சோதனை

திட்டங்கள் செல்லுபடியானவை மற்றும் கட்டுப்பாடுகளை சரியாக பின்பற்றுகிறதா என சோதிக்கவும்:

```java
@Test
public void testSchemaValidation() {
    // கருவி உதாரணத்தை உருவாக்கவும்
    SearchTool searchTool = new SearchTool();
    
    // வடிவமைப்பை பெறுக
    Object schema = searchTool.getSchema();
    
    // சரிபார்க்க வடிவமைப்பை JSON ஆக மாற்றுக
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // வடிவமைப்பு செல்லுபடியாகும் JSONSchema என்று சரிபார்க்கவும்
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // செல்லுபடியாகும் அளவுருக்களை சோதிக்கவும்
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // தேவைப்பட்ட அளவுரு இல்லாமல் சோதிக்கவும்
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // தவறான அளவுரு வகையை சோதிக்கவும்
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. பிழை கையாள்தல் சோதனைகள்

பிழை நிலைகளுக்கான குறிப்பிட்ட சோதனைகளை உருவாக்கவும்:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # ஏற்பாடு செய்
    tool = ApiTool(timeout=0.1)  # மிகவும் குறுகிய கால அவகாசம்
    
    # காலாவதியான வேண்டுகோளை மோக் செய்
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # கால அவகாசத்தை விட நீண்டது
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # செயல் & உறுதி செய்
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # தவறு செய்தி சரிபார்
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # ஏற்பாடு செய்
    tool = ApiTool()
    
    # விகித-கட்டுப்படுத்தப்பட்ட பதிலை மோக் செய்
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
        
        # செயல் & உறுதி செய்
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # தவறுகளில் விகிதக் கட்டுப்பாடு தகவல் உள்ளதா என சரிபார்
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### ஒருங்கிணைப்பு சோதனை

#### 1. கருவி சங்கிலி சோதனை

எதிர்பார்க்கப்படும் இணைப்புகளில் கருவிகள் ஒன்றாக செயல்படுவதை சோதிக்கவும்:

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

#### 2. MCP சேவையக சோதனை

முழு கருவி பதிவு மற்றும் செயல்பாடுகளுடன் MCP சேவையகத்தை சோதிக்கவும்:

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
        // கண்டறிதல் முடிந்த இடத்தை சோதிக்கவும்
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // கருவி கோரிக்கையை உருவாக்கவும்
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // கோரிக்கையை அனுப்பி பதிலை சரிபார்க்கவும்
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // தவறான கருவி கோரிக்கையை உருவாக்கவும்
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" என்பதான அளவுரு காணவில்லை
        request.put("parameters", parameters);
        
        // கோரிக்கையை அனுப்பி பிழை பதிலை சரிபார்க்கவும்
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. முழுமையான சோதனை

மாதிரி நிகழ்படியில் இருந்து கருவி செயல்பாடுகளுக்கு முழுமையான பணிகள் ஓட்டங்களை சோதிக்கவும்:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # ஏற்பாடு செய்யவும் - MCP கிளையண்டையும் மொக் மாடலையும் அமைக்கவும்
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # மொக் மாடல் பதில்கள்
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
    
    # மொக் வானிலை கருவி பதில்
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
        
        # செயல் படுத்து
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # உறுதி செய்
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### செயல்திறன் சோதனை

#### 1. வழக்கு சோதனை

எவ்வளவு கூட்டணி கோரிக்கைகளை உங்கள் MCP சேவையகம் கையாள முடியும் என்பதைக் சோதிக்கவும்:

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

#### 2. அழுத்த சோதனை

கடைசிவரை அதிகபட்சச் சுமையில் அமைப்பை சோதிக்கவும்:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // மனஅழுத்தச் சோதனைக்காக JMeter அமைக்கவும்
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter சோதனைத் திட்டத்தை அமைக்கவும்
    HashTree testPlanTree = new HashTree();
    
    // சோதனைத் திட்டம், திருப்பு குழு, சாம்பிளர்கள் மற்றும் பிறவை உருவாக்கவும்
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // கருவி இயக்கத்திற்காக HTTP சாம்பிளரைச் சேர்க்கவும்
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // கேள்விப்பட்டவர்களைச் சேர்க்கவும்
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // சோதனையை இயக்கவும்
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // முடிவுகளை சரிபார்க்கவும்
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // சராசரி பதிலளிக்கும் நேரம் < 200மி.கா
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90வது விழுக்காடு < 500மி.கா
}
```

#### 3. கண்காணிப்பு மற்றும் செயல்திறன் ஆய்வு

நீண்டகால செயல்திறன் ஆய்விற்கு கண்காணிப்பை அமைக்கவும்:

```python
# MCP சர்வருக்கு கண்காணிப்பை அமைக்கவும்
def configure_monitoring(server):
    # Prometheus அளவுகோல்களை அமைக்கவும்
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
    
    # நேரம் மற்றும் அளவுகோல்களை பதிவுசெய்ய மிட்ல்வேர் சேர்க்கவும்
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # அளவுகோல் முடிச்சை வெளிப்படுத்தவும்
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP பணிவழி வடிவமைப்பு மாதிரிகள்

நன்றாக வடிவமைக்கப்பட்ட MCP பணிவழிகள் செயல்திறன், நம்பகத்தன்மை மற்றும் பராமரிப்புத்தன்மையை மேம்படுத்துகின்றன. பின்வரும் முக்கிய மாதிரிகளை பின்பற்றவும்:

### 1. கருவி சங்கிலி மாதிரி

ஒவ்வொரு கருவியின் வெளியீடு அடுத்ததன் உள்ளீடாக மாறும் வகையில் பல கருவிகளை தொடர் முறையில் இணைக்கவும்:

```python
# Python சரிசட்ட சாதனங்களின் அமல்படுத்தல்
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # வரிசைப்படியாக இயக்க வேண்டிய கருவிகளின் பெயர்களின் பட்டியல்
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # சரிசட்டத்தில் உள்ள ஒவ்வொரு கருவியையும் முன்னிருந்த முடிவை கொண்டு இயக்கவும்
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # முடிவை சேமித்து அடுத்த கருவிக்கான உள்ளீடாக பயன்படுத்தவும்
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# உதாரண பயன்பாடு
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

### 2. பகிரங்க பரிமாற்றி மாதிரி

உள்ளீடின் அடிப்படையில் சிறப்பு கருவிகளுக்கு பகிரங்கமாக பரிமாற்றியைப் பயன்படுத்தவும்:

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

### 3. 병렬 செயலாக்க மாதிரி

செயல்திறனை அதிகரிக்க ஒரே நேரத்தில் பல கருவிகளை இயக்கவும்:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // படி 1: தரவுத்தொகுப்பு மெட்டாடேட்டாவை (இணைப்பெழுத்து) பெற்றெடு
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // படி 2: பல விஸ்தாரமான பகுப்பாய்வுகளை ஒரே நேரத்தில் இயக்கு
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
        
        // அனைத்து ஒரே நேரத்தில் நடைபெறும் பணிகளும் முடிந்து விடும்வரை காத்திரு
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // முடிவடையும் வரை காத்திரு
        
        // படி 3: முடிவுகளை இணைத்தல்
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // படி 4: சுருக்க அறிக்கையை உருவாக்கு
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // முழுமையான வேலைநடை முடிவை திருப்பி கொடு
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. பிழை மீட்பு மாதிரி

கருவி தோல்விகளுக்கான சரியான fallback முறைகளை செயல்படுத்தவும்:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # முதன்மை கருவியை முதலில் முயற்சி செய்க
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # தோல்வியை பதிவு செய்க
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # இரண்டாம் நிலை கருவிக்கு திரும்பி செல்
            try:
                # திரும்பி செல்லும் கருவிக்கான அளவுருக்களை மாற்ற வேண்டியிருக்கும்
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # இரு கருவிகளும் தோற்றுவித்தன
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # இந்த நடைமுறை குறிப்பிட்ட கருவிகளின் மீது சார்ந்திருக்கும்
        # இந்த உதாரணத்திற்கு, நாம் அசல் அளவுருக்களை மட்டுமே திருப்பி கொடுப்போம்
        return params

# பயன்பாட்டுக்கான உதாரணம்
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # முதன்மை (செலவுள்ள) வானிலை API
        "basicWeatherService",    # திரும்பி செல்லும் (இலவச) வானிலை API
        {"location": location}
    )
```

### 5. பணிவழி ஒருங்கிணைப்பு மாதிரி

எளிய பணிவழிகளை ஒன்றிணைத்து கடினமான பணிவழிகளை கட்டமைக்கவும்:

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

# MCP சேவையக சோதனை: சிறந்த நடைமுறைகள் மற்றும் முக்கிய குறிப்புகள்

## பார்வை

நம்பகமான, உயர்தர MCP சேவையகங்களை உருவாக்குவதில் சோதனை ஒரு முக்கிய அம்சமாகும். இந்த வழிகாட்டி உங்கள் MCP சேவையகங்களை உருவாக்கும் முழு வாழ்க்கைச் சுற்றிலும் தனி சோதனைகள் முதல் ஒருங்கிணைப்பு சோதனைகள் மற்றும் முழுமையான சரிபார்ப்புவரையிலும் முழுமையான சிறந்த நடைமுறைகளையும் குறிப்பு வழிகளையும் வழங்குகிறது.

## MCP சேவையகங்களுக்கு சோதனை ஏன் முக்கியம்

MCP சேவையகங்கள் AI மாதிரிகள் மற்றும் வாடிக்கையாளர் செயலிகளுக்கு இடைநிலையமாக விளங்குகின்றன. முழுமையான சோதனை வழங்குவதை உறுதிசெய்கிறது:

- உற்பத்திச் சூழல்களில் நம்பகத்தன்மை
- கோரிக்கைகள் மற்றும் பதில்களை துல்லியமாக கையாள்தல்
- MCP குறிப்புக்கள் செயற்படுத்தல் சரியான முறையில்
- தோல்விகள் மற்றும் கடைசி நிலைகள் எதிர்நோக்கி நிலைத்தன்மை
- வெவ்வேறு சுமைகளின் கீழ் ஒருங்கிணைந்த செயல்திறன்

## MCP சேவையகங்களுக்கு தனிச்சோதனை

### தனிச்சோதனை (அடித்தளம்)

தனிச்சோதனைகள் உங்கள் MCP சேவையகத்தில் தனிப்பட்ட கூறுகளைக் தனியாகச் சோதிக்கின்றன.

#### எதை சோதிக்க வேண்டும்

1. **வில் கையாளர்கள்**: ஒவ்வொரு வள கையாளரின் நுணுக்கங்களை தனிப்படியாக சோதிக்கவும்
2. **கருவி அமல்பாடுகள்**: பல உள்ளீடுகளுடன் கருவி நடத்தைகளை சோதிக்கவும்
3. **நிகழ்படி வார்ப்புருக்கள்**: நிகழ்படி வார்ப்புருக்கள் சரியான முறையில் வெளியிடப்படுகிறதா என்பதை உறுதிசெய்க
4. **திட்ட சரிபார்ப்பு**: பரிமாணச் சரிபார்ப்பு நுணுக்கங்களை சோதிக்கவும்
5. **பிழை கையாள்தல்**: தவறான உள்ளீடுகளுக்கு பிழைப் பதில்களை பரிசோதிக்கவும்

#### தனிச்சோதனையின் சிறந்த நடைமுறைகள்

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
# பைதான் மொழியில் ஒரு கணக்கீடு கருவிக்கான உதாரண பிரிவு சோதனை
def test_calculator_tool_add():
    # ஏற்பாடு செய்
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # செயல்படுத்து
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # உறுதி செய்
    assert result["value"] == 12
```

### ஒருங்கிணைப்பு சோதனை (நடுத்தரம்)

ஒருங்கிணைப்பு சோதனைகள் உங்கள் MCP சேவையக கூறுகளுக்கிடையேயான தொடர்புகளை சோதிக்கின்றன.

#### எதை சோதிக்க வேண்டும்

1. **சேவையக தொடக்கம்**: பல அமைப்புகளுடன் சேவையகம் துவக்கத்தை சோதிக்கவும்
2. **பாதை பதிவு**: அனைத்து முடிவுகளில் சரியாக பதிவு செய்யப்பட்டுள்ளதா என்பது உறுதி செய்யவும்
3. **கோரிக்கை செயலாக்கம்**: முழு கோரிக்கை-பதில் சுற்றுவட்டத்தை சோதிக்கவும்
4. **பிழை பரவல்**: பிழைகள் கூறுகளுக்கு துரிதமாக கையாளப்படுகிறதா என்பதை உறுதி செய்யவும்
5. **அங்கீகாரம் மற்றும் அனுமதி**: பாதுகாப்பு மெக்கானிஸங்களைப் பரிசோதிக்கவும்

#### ஒருங்கிணைப்பு சோதனையின் சிறந்த நடைமுறைகள்

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

### முழுமையான சோதனை (குழுக்கு அடுக்கு)

முழுமையான சோதனைகள் வாடிக்கையாளர் இருந்து சேவையகத்துக்கான முழு அமைப்பின் செயல்பாட்டை உறுதிசெய்கின்றன.

#### எதை சோதிக்க வேண்டும்

1. **வாடிக்கையாளர்-சேவையக தொடர்பு**: முழு கோரிக்கை-பதில் சுற்றுவட்டங்களை சோதிக்கவும்
2. **உண்மை வாடிக்கையாளர் SDKகள்**: உண்மையான வாடிக்கையாளர் செயல்திறனுடன் சோதிக்கவும்
3. **சுமை கீழ் செயல்திறன்**: பல இணைந்த கோரிக்கைகளுடன் நடத்தை உறுதிசெய்க
4. **பிழை மீட்பு**: தோல்விகளில் இருந்து அமைப்பு மீட்பை சோதிக்கவும்
5. **நீண்டநேர செயல்பாடுகள்**: ஸ்ட்ரீமிங் மற்றும் நீண்ட செயல்பாடுகளின் கையாளுதலையும் உறுதிசெய்க

#### முழுமையான சோதனையின் சிறந்த நடைமுறைகள்

```typescript
// TypeScript இல் ஒரு கிளையண்டுடன் எடுத்துக்காட்டு E2E பரிசோதனை
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // பரிசோதனை சூழலில் சர்வரை துவக்கவும்
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // செயல்
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // உறுதி செய்
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP சோதனைக்கான உருவாக்கும் நெறிமுறைகள்

சோதனைக்காயும் கூறுகளை தனித்துவமாக்க முக்கியமாக உருவாக்குதல்கள் அவசியம்.

### உருவாக்கவேண்டிய கூறுகள்

1. **வெளிய AI மாதிரிகள்**: திடீரென முன்னோக்கி சோதனைக்கான மாதிரி பதில்களை உருவாக்கவும்
2. **வெளிய சேவைகள்**: API சார்ந்த விசைகளைக் ( தரவுத் தளம், மூன்றாம் பகுதி சேவைகள்) உருவாக்கவும்
3. **அங்கீகாரம் சேவைகள்**: அடையாள வழங்குநர்களை உருவாக்கவும்
4. **வள வழங்குநர்கள்**: அதிக செலவு வாய்ந்த வள கையாளர்களை உருவாக்கவும்

### உதாரணம்: AI மாதிரி பதிலுக்கு உருவாக்குதல்

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
# unittest.mock உடன் பைதான் உதாரணம்
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # மொக் கட்டமைக்கவும்
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # சோதனையில் மொக் பயன்படுத்தவும்
    server = McpServer(model_client=mock_model)
    # சோதனையை தொடரவும்
```

## செயல்திறன் சோதனை

செயல்திறன் சோதனை உற்பத்தி MCP சேவையகங்களுக்கு அவசியம்.

### அளவிட வேண்டியவை

1. **தாமதம்**: கோரிக்கைகளுக்கான பதிலளிக்கும் நேரம்
2. **வெளியீடு வீதம்**: ஒரேநிலையில் கையாளப்படும் கோரிக்கைக் களின் அளவு
3. **வள பயன்பாடு**: CPU, நினைவகம், நெட்வொர்க் பயன்பாடு
4. **இணைந்த கோரிக்கை நிர்வாகம்**: இணைந்த கோரிக்கைகளின் கீழ் நடத்தை
5. **வளவளர்ச்சி பண்புகள்**: அதிகரிக்கும் சுமைக்கு செயல் திறன்

### செயல்திறன் சோதனை கருவிகள்

- **k6**: திறந்த மூல சுமை சோதனை கருவி
- **JMeter**: முழுமையான செயல்திறன் சோதனை
- **Locust**: Python அடிப்படையிலான சுமை சோதனை
- **Azure Load Testing**: மேக அடிப்படையிலான செயல்திறன் சோதனை

### உதாரணம்: k6 உடன் அடிப்படைக் சுமை சோதனை

```javascript
// MCP சேவையகத்தை லோடு சோதிப்பதற்கான k6 ஸ்கிரிப்ட்
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 நிஜ பயனர்கள்
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

## MCP சேவையகங்களுக்கான சோதனை தானியக்கல்

உங்கள் சோதனைகளை தானியக்கப்படுத்துவது ஒரே மாதிரியானத் தரத்தையும், விரைவான பின்னூட்ட கொள்களை உறுதி செய்கிறது.

### தொடர் ஒருங்கிணைவு/தொடர் வெளியீடு ஒருங்கிணைப்பு

1. **கோப்பு கோரிக்கைகளில் தனிச்சோதனைகள் இயக்குக**: உள்ளது
2. **ஸ்டேஜிங்கில் ஒருங்கிணைப்பு சோதனைகள்**: முன்உற்பத்தி περι்ப்புகளில் ஒருங்கிணைப்பு சோதனைகளை இயக்கவும்  
3. **செயல்திறன் அடிப்படைகள்**: பின்னடைவை பிடிக்க செயல்திறன் தரநிலைகளை பராமரிக்கவும்  
4. **பாதுகாப்பு சோதனைகள்**: குழாய்த் தொடரின் ஒரு பகுதியாக பாதுகாப்பு சோதனைகளை தானாக இயக்கவும்  

### காட்டு CI குழாய் (GitHub Actions)

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
  
## MCP விவரக்குறிப்புடன் இணக்கமானதைக் கண்டு பிடித்தல்  
உங்கள் சர்வர் MCP விவரக்குறிப்பை சரியாக நடைமுறைப்படுத்துகிறதா என்பதை சரிபார்க்கவும்.

### முக்கிய இணக்கம் பகுதிகள்  

1. **API இறுதிப்புள்ளிகள்**: தேவையான இறுதிப்புள்ளிகள் (/resources, /tools, முதலியன) களை சோதிக்கவும்  
2. **கோரிக்கை/பதில் வடிவம்**: நிரல் உடன்பாடுகளை சரிபார்க்கவும்  
3. **தவறு குறியீடுகள்**: பல்வேறு சூழ்நிலைகளுக்கான சரியான நிலை குறியீடுகளை உறுதிப்படுத்தவும்  
4. **உள்ளடக்க வகைகள்**: பல்வேறு உள்ளடக்க வகைகளை கையாள்வதை சோதிக்கவும்  
5. **அங்கீகார ஓட்டம்**: விவரக்குறிப்பு-உறுப்பான அங்கீகார முறைகளை சரிபார்க்கவும்  

### இணக்கம் சோதனை தொகுப்பு  

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
  
## MCP சர்வர் சோதனைகளுக்கு சிறந்த 10 குறிப்பு  

1. **சோதனை கருவி வரையறைகளை தனியாகச் சோதிக்கவும்**: கருவி தர்க்கத்திலிருந்து திட்ட வரையறைகளை தனித்துவமாக உறுதிப்படுத்தவும்  
2. **பாராமெட்டரை கொண்ட சோதனைகளை பயன்படுத்தவும்**: பாயரான நிலைகளையும் சேர்த்து வெவ்வேறு உள்ளீடுகளுடன் கருவிகளை சோதிக்கவும்  
3. **தவறு பதில்களை சரிபார்க்கவும்**: அனைத்து சாத்திய தவறு சூழ்நிலைகளுக்கு சரியான தவறு கையாளுதலை உறுதிப்படுத்தவும்  
4. **அங்கீகார தர்க்கத்தை சோதிக்கவும்**: வெவ்வேறு பயனர் பங்குகளுக்கான சரியான அணுகல் கட்டுப்பாட்டை உறுதிப்படுத்தவும்  
5. **சோதனை கவர் பரப்பை கண்காணிக்கவும்**: முக்கிய பாதை குறியீட்டின் அதிகமான கவரையை நோக்கவும்  
6. **ஸ்ட்ரீமிங் பதில்களை சோதிக்கவும்**: ஸ்ட்ரீமிங் உள்ளடக்க கையாளுதலை சரிபார்க்கவும்  
7. **நெட்வொர்க் பிரச்சினைகளை உருவாக்கவும்**: மோசமான நெட்வொர்க் சூழலில் நடத்தை சோதிக்கவும்  
8. **வழிமுறை வரம்புகளை சோதிக்கவும்**: அளவுகோல்கள் அல்லது விகித வரம்புகள் சென்றடைந்தபோது நடத்தை சரிபார்க்கவும்  
9. **திரும்புமுனை சோதனைகளை தானாகச் செய்யவும்**: ஒவ்வொரு குறியீட்டுப்பெயர்ச் மாற்றத்துடனும் இயக்கும் தொகுப்பை உருவாக்கவும்  
10. **சோதனை வழக்குகளைக் கோப்பிடவும்**: சோதனை சூழ்நிலைகளின் தெளிவான ஆவணத் தளத்தை பராமரிக்கவும்  

## பொதுவான சோதனை தவறுகள்  

- **மகிழ்ச்சியான பாதை சோதனைமீது அதிக நம்பிக்கை**: தவறு வழக்குகளைச் முழுமையாக சோதிக்க உறுதிபடுத்தவும்  
- **செயல்திறன் சோதனையை தேவையற்றதாய் பார்க்கும் பழக்கம்**: உற்பத்திக்கு அதிகாரம் செல்லும் முன்பு தடங்களை கண்டறிக்கவும்  
- **வேறு சோதனைகளுடன் இணைக்காமல் தனியாக சோதிக்கிறதல்**: அலகு, ஒருங்கிணைப்பு மற்றும் கடைசி வரை சோதனைகளை சேர்க்கவும்  
- **முழுமையான API மூடுவது**: அனைத்து இறுதிப்புள்ளிகளும் மற்றும் பண்புகளும் சோதிக்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும்  
- **ஒருங்கிணைந்த சோதனை சூழல் இல்லாமை**: ஒரே மாதிரியாக சோதனை சூழலை நிரூபிக்க கொண்டெய்னர்களைப் பயன்படுத்தவும்  

## முடிவு  

நம்பகமான, உயர் தர MCP சர்வரில் உருவாக்க ஒரு விரிவான சோதனை கமரா அவசியம். இந்த வழிகாட்டியில் விளக்கிய சிறந்த நடைமுறைகள் மற்றும் குறிப்புகளை செயல்படுத்துவதன் மூலம், உங்கள் MCP நடைமுறைகள் மிக உயர்ந்த தரநிலைகளையும் நம்பகத்தன்மையையும் செயல்திறனையும் பூர்த்திசெய்யும்.  

## முக்கிய எடுத்துக்காட்டுகள்  

1. **கருவி வடிவமைப்பு**: ஒன்றுசேரின் பொறுப்பு 원칙த்தை பின்பற்றவும், சார்பு ஊது கொண்டு வரவும், ஒருங்கிணைக்கப்படக்கூடியவாறு வடிவமைக்கவும்  
2. **திட்டம் வடிவமைப்பு**: தெளிவான, நன்கு ஆவணப்படுத்தப்பட்ட திட்டங்களை சரியான சரிபார்ப்பு கட்டுப்பாடுகளுடன் உருவாக்கவும்  
3. **தவறு கையாளுதல்**: மென்மையான தவறு கையாளுதல், கட்டமைக்கப்பட்ட தவறு பதில்கள் மற்றும் மீண்டும் முயற்சி நடவடிக்கைகள் செயல்படுத்தவும்  
4. **செயல்திறன்**: காசிங், அசிங்க்ரோனஸ் செயலாக்கம் மற்றும் வள சீமைகளை பயன்படுத்தவும்  
5. **பாதுகாப்பு**: விரிவான உள்ளீட்டு சரிபார்த்தல், அங்கீகார சோதனை, மற்றும் حساس தரவுக் கையாளுதலைக் கையாளவும்  
6. **சோதனை**: முழுமையான அலகு, ஒருங்கிணைப்பு மற்றும் கடைசிவரை சோதனைகள் உருவாக்கவும்  
7. **வேலைசெய்யும் நெறிகள்**: சங்கிலிகள், பிரபலிப்பாளர்கள் மற்றும் மின்னணு செயலாக்க போன்ற நிலையான நெறிகளைப் பயன்படுத்தவும்  

## பயிற்சி  

பலவகை வடிவங்களில் (PDF, DOCX, TXT) ஆவணங்களை ஏற்கும் மற்றும் அவற்றிலிருந்து உரை மற்றும் முக்கிய தகவல்களை எடுக்குமாறு, வகை மற்றும் உள்ளடக்கத்தின் அடிப்படையில் ஆவணங்களை வகைப்படுத்தி ஒவ்வொரு ஆவணத்திற்கும் சுருக்கத்தை உருவாக்கும் ஒரு ஆவண செயலாக்க அமைப்புக்கான MCP கருவி மற்றும் வேலைசெய்யும் முறையை வடிவமைக்கவும். அத்துடன் கருவி திட்டங்கள், தவறு கையாளுதல் மற்றும் இந்த நிகழ்காலத்திற்கு சிறந்த வேலைசெய்யும் நடைமுறையை நடைமுறைப்படுத்தவும். இந்த நடைமுறையை உங்கள் சோதனை எவ்வாறு செய்யப்படும் என்பதையும் பரிசீலிக்கவும்.  

## வளங்கள்  

1. சமீபத்திய அப்டேட்களுக்காக [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) ல் MCP சமூவினுடன் சேர்ந்துகொள்ளவும்  
2. திறந்த மூல [MCP திட்டங்கள்](https://github.com/modelcontextprotocol) இல் பங்களிக்கவும்  
3. உங்கள் நிறுவனத்தின் AI முயற்சிகளில் MCP 원칙ங்களை பயன்படுத்தவும்  
4. உங்கள் துறைக்கான சிறப்பு MCP நடைமுறைகளை ஆராயவும்  
5. பலவகை ஒருங்கிணைப்பு அல்லது நிறுவன பயன்பாட்டு ஒருங்கிணைப்பு போன்ற विशिष்ட MCP தலைப்புகளில் விருத்த பாடங்களுக்காக பரிசீலிக்கவும்  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) மூலம் கற்ற MCP கருவிகள் மற்றும் வேலைசெய்யும் முறைகளை உருவாக்கி ஆராயவும்  

## அடுத்தது என்ன  

அடுத்தது: [வண்ணக்காட்சி ஆய்வுகள்](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->