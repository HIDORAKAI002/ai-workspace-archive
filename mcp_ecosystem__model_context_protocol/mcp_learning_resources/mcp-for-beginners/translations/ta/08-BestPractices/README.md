# MCP வளர்ச்சி சிறந்த நடைமுறைகள்

[![MCP Development Best Practices](../../../translated_images/ta/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(இந்த பாடத்தின் வீடியோக்களை காண மேற்கண்ட படத்தை கிளிக் செய்யவும்)_

## கண்ணோட்டம்

இந்த பாடம் MCP சேவையகங்கள் மற்றும் அம்சங்களை தயாரிப்பதில், சோதிப்பதில், மற்றும் உற்பத்தி சூழல்களில் பிரயோஜனப்படுத்துவதில் முன்னேற்ற சிறந்த நடைமுறைகளுக்கு கவனம் செலுத்துகிறது. MCP சுற்றுச்சூழல்கள் சிக்கலானதும் முக்கியத்துவம்சேர்ந்ததும் ஆகிவரும் போது, நெறிமுறை முறைகளை பின்பற்றுவது நம்பகத்தன்மை, பராமரிப்பு திறன் மற்றும் தொடர்பு திறனைக் காக்கிறது. உண்மையான MCP அமல்படுத்தல்கள் மூலம் கிடைத்த நடைமுறை அறிவுத்தொகுப்புகளை இந்த பாடம் ஒருங்கிணைத்து, பயனுள்ள வளங்கள், ஊக்கங்கள் மற்றும் கருவிகளுடன் வலிமையான, திறமையான சேவையகங்களை உருவாக்க வழிகாட்டி செய்கிறது.

## கற்றல் இலக்குகள்

இந்த பாடத்தின் இறுதியில், நீங்கள் இயல்பாக:

- MCP சேவையக மற்றும் அம்ச வடிவமைப்பில் தொழில் நுட்ப சிறந்த நடைமுறைகளை பின்பற்றலாம்
- MCP சேவையகங்களுக்கு விரிவான சோதனை திட்டங்களை உருவாக்கலாம்
- சிக்கலான MCP பயன்பாடுகள் için திறமையான, மீண்டும் பயன்படுத்தக்கூடிய பணிமுறை வடிவங்களை வடிவமைக்கலாம்
- MCP சேவையகங்களில் சரியான பிழை கைப்பிடிப்பு, பதிவு மற்றும் கண்காணிப்புகளை செயல்படுத்தலாம்
- செயல்திறன், பாதுகாப்பு மற்றும் பராமரிப்பு திறன் கொண்ட MCP செயல்பாட்டை மேம்படுத்தலாம்

## MCP அடிப்படை கோட்பாடுகள்

குறிப்பிட்ட அமல்படுத்தல் நடைமுறைகளுக்கு நுழைவதற்கு முன், செயல்திறன் உள்ள MCP வளர்ச்சி வழிகாட்டும் அடிப்படை கோட்பாடுகளை புரிந்து கொள்ள வேண்டும்:

1. **முறைப்படுத்தப்பட்ட தொடர்பு**: MCP அதன் அடிப்படையாக JSON-RPC 2.0 ஐ பயன்படுத்துகிறது, அனைத்து செயல்பாடுகளிலும் கோரிக்கைகள், பதில்கள் மற்றும் பிழை கைப்பிடிப்புக்கு ஒரே மாதிரியான வடிவமைப்பை வழங்குகிறது.

2. **பயனர் மையமான வடிவமைப்பு**: எப்போதும் பயனர் ஒப்புதலும் கட்டுப்பாடு மற்றும் வெளிப்படைத்தன்மை MCP செயல்பாடுகளில் முன்னிலைப்படுத்த வேண்டும்.

3. **பாதுகாப்பு முதலில்**: அடையாளம் నిరூபிப்பு, அங்கீகாரம், சரிபார்த்தல் மற்றும் விகித வரம்புக்குள் காலை ஆகிய பாதுகாப்பு நடவடிக்கைகளை வலுவாக செயல்படுத்துக.

4. **தொகுதி கட்டமைப்பு**: ஒவ்வொரு கருவியும் மற்றும் வளமும் தெளிவான, கவனமான நோக்கத்துடன் MCP சேவையகங்களை வடிவமைக்கவும்.

5. **நிலை சார்ந்த இணைப்புகள்**: பல கோரிக்கைகளுக்கு இடையேயான நிலையை பராமரிக்கும் MCP திறனை பயன்படுத்தி இணக்கமான மற்றும் சூழல் அறிவுடன் பரிமாற்றங்களை மேம்படுத்துக.

## அதிகாரபூர்வ MCP சிறந்த நடைமுறைகள்

பின்வரும் சிறந்த நடைமுறைகள் அதிகாரபூர்வ Model Context Protocol ஆவணத்திலிருந்து பெறப்பட்டவை:

### பாதுகாப்பு சிறந்த நடைமுறைகள்

1. **பயனர் ஒப்புதல் மற்றும் கட்டுப்பாடு**: தரவு அணுகல் அல்லது செயல்பாடுகளை செய்வதற்கு முன் எப்போதும் தெளிவான பயனர் ஒப்புதலை கோருங்கள். பகிரப்படும் தரவு மற்றும் அங்கீகரிக்கப்பட்ட செயல்பாடுகளுக்கு தெளிவான கட்டுப்பாடு வழங்குக.

2. **தரவு தனியுரிமை**: தெளிவான ஒப்புதலுடன் மட்டுமே பயனர் தரவுகளை வெளிப்படுத்தவும், சரியான அணுகல் கட்டுப்பாடுகளால் பாதுகாக்கவும். அனுமதியில்லாத தரவு பரிமாற்றம் எதிர்கொள்ள பாதுகாப்புக.

3. **கருவிகள் பாதுகாப்பு**: எந்த கருவியையும் இயக்குவதற்கு முன் தெளிவான பயனர் ஒப்புதலை தேவையாக்கவும். ஒவ்வொரு கருவியின் செயல்பாட்டை பயனர்கள் புரிந்து கொள்வதை உறுதிப்படுத்தவும் மற்றும் வலுவான பாதுகாப்பு எல்லைகளை அமுல்படுத்தவும்.

4. **கருவி அனுமதி கட்டுப்பாடு**: ஒரு அமர்வில் மாடல் பயன்படுத்த அனுமதிக்கப்பட்ட கருவிகளை அமைக்க, தெளிவாக அங்கீகரிக்கப்பட்ட கருவிகள் மட்டுமே கிடைக்க வேண்டியது உறுதி செய்யவும்.

5. **அடையாளம் சரிபார்ப்பு**: கருவிகள், வளங்கள் அல்லது நுணுக்கமான செயல்பாடுகளுக்கு அணுகுவதற்கு முன் சரியான அடையாளம் சரிபார்ப்பை API விசைகள், OAuth டோக்கன்கள் அல்லது பிற பாதுகாப்பான முறைகள் மூலம் கோர்‌க்கவும்.

6. **பொறிமுறை சரிபார்ப்பு**: முறைகேடான அல்லது தீங்கு செய்கின்ற உள்ளீடுகள் கருவி அமல்படுத்தல்களைத் தாக்காமல் அனைத்து கருவி அழைப்புகளுக்கும் சரிபார்ப்பை அமுல்படுத்தல்.

7. **விகித வரம்பு**: சேவை வளங்களின் முற்றுப்புள்ளியாக சீரான மற்றும் நியாயமான பயன்பாட்டை உறுதி செய்யப் பழுக்கு தடுக்கும் விகித வரம்பை அமுல்படுத்தல்.

### அமல்படுத்தல் சிறந்த நடைமுறைகள்

1. **திறன் பேச்சுவார்த்தை**: இணைப்பு அமைப்பின் போது ஆதரவு பெறும் அம்சங்கள், நெறிமுறை பதிப்புகள், கிடைக்கும் கருவிகள் மற்றும் வளங்கள் குறித்து தகவலை பரிமாறுக.

2. **கருவி வடிவமைப்பு**: பல செயல்பாடுகளை கையாளும் ஒரே கருவிகளுக்கு பதிலாக, ஒரு விஷயத்தில் சிறந்த கவனம் செலுத்தும் கருவிகளை உருவாக்குக.

3. **பிழை கைப்பிடிப்பு**: பிழைகளை கண்டறியும், தோல்விகளை மென்மையாக கையாளும் மற்றும் செயல்திறனான பின்னூட்டங்களை வழங்கும் ஒருங்கிணைந்த பிழை தகவல் மற்றும் குறியீடுகளை செயல்படுத்துக.

4. **பதிவு**: ஆராய்ச்சி, பிழைதிறப்பு மற்றும் நெறிமுறைக் தொடர்புகளை கண்காணிப்பதற்கான கட்டமைக்கப்பட்ட பதிவுகளை அமைக்கவும்.

5. **முன்னேற்ற கண்காணிப்பு**: நீண்ட நேர செயல்பாடுகளுக்கு, பயனர் இடைமுகங்களை பதிலளிப்பதற்கு முன்னேற்றத்தை அறிவிக்கவும்.

6. **கோரிக்கை நிறுத்தல்**: தேவையில்லை거나 நிரம்புதற்கிடையான கோரிக்கைகளை வாடிக்கையாளர்கள் ரத்து செய்ய அனுமதி வழங்குக.

## கூடுதல் குறிப்பு

சமீபத்திய MCP சிறந்த நடைமுறைகளுக்கு கீழ்காணும் வளங்களைப் பார்வையிடவும்:

- [MCP ஆவணங்கள்](https://modelcontextprotocol.io/)
- [MCP விவரக்குறிப்பு (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub களஞ்சியம்](https://github.com/modelcontextprotocol)
- [பாதுகாப்பு சிறந்த நடைமுறைகள்](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - பாதுகாப்பு ஆபத்துகள் மற்றும் தடைகள்
- [MCP பாதுகாப்பு மாநாடு பயிற்சி (Sherpa)](https://azure-samples.github.io/sherpa/) - கைமுறை பாதுகாப்பு பயிற்சி

## நடைமுறை அமல்படுத்தல் உதாரணங்கள்

### கருவி வடிவமைப்பு சிறந்த நடைமுறைகள்

#### 1. தனி பொறுப்பு கோட்பாடு

ஒவ்வொரு MCP கருவிக்கும் தெளிவான, கவனமாகும் நோக்கம் இருக்க வேண்டும். பல பிரச்சனைகளை கையாளும் ஒருங்கிணைந்த கருவிகளுக்குப் பதிலாக, குறிப்பிட்ட பணிகளில் சிறப்பு பெற்ற கருவிகளை உருவாக்குக.

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

#### 2. ஒரே மாதிரி பிழை கைப்பிடிப்பு

விவரமான பிழை செய்திகள் மற்றும் சரியான மீட்பு நடைமுறைகளுடன் வலுவான பிழை கைப்பிடிப்பை செயல்படுத்தவும்.

```python
# முழுமையான பிழை கையாளுதலுடன் Python உதாரணம்
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
                # காலவரையறையுடன் தரவுத்தள செயல்பாடு
                async with timeout(10):  # 10 வினாடி காலவரையறு
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
                # விசாரணை பிழைகள் அதிகமாக கிளையண்ட் பிழைகள்
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # கருவி-குறுந்தொடர்புடைய பிழைகளை அனுமதி தருக
            raise
        except Exception as e:
            # எதிர்பாராத பிழைகளுக்கு பொதுவான பிடிப்பு
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL ஊடுருவல் கண்டறிதலின் நடைமுறை
        pass
        
    def _log_error(self, message, error):
        # பிழை பதிவேட்டின் நடைமுறை
        pass
```

#### 3. தொழிற் பாத்திரப்பட்ட சரிபார்ப்பு

தவறான அல்லது தீங்கு விளைவிக்கும் உள்ளீடுகளை தடுக்கும் வகையில் தொழிற் பாத்திரப்பட்ட சரிபார்ப்பை எப்போதும் செய்யவும்.

```javascript
// விரிவான அளவுரு சரிபார்ப்பு உடன் JavaScript/TypeScript உதாரணம்
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
    
    // 4. எழுதும் செயலுக்கு உள்ளடக்க உரிய இருப்பைச் சரிபார்க்கவும்
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. பாதை பாதுகாப்பு சரிபார்ப்பு
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // சரிபார்க்கப்பட்ட அளவுருக்கள் அடிப்படையில் நடைமுறைப்படுத்தல்
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // பாதை பாதுகாப்பு சரிபார்ப்பின் நடைமுறைப்படுத்தல்
    // ...
  }
}
```

### பாதுகாப்பு அமல்படுத்தல் உதாரணங்கள்

#### 1. அடையாளம் நிரூபித்தல் மற்றும் அங்கீகாரம்

```java
// அங்கீகாரம் மற்றும் அனுமதி உடன் ஜாவா உதாரணம்
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // சார்ப்புக் குறி ஊட்டல்
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
        // 1. அங்கீகார சூழலைப் பெறுக
        String authToken = request.getContext().getAuthToken();
        
        // 2. பயனரை அங்கீகரிக்கவும்
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. குறிப்பிட்ட செயலுக்கான அனுமதியைச் சரிபார்க்கவும்
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. அனுமதி பெற்ற செயலுடன் முன்னெடுங்கள்
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

#### 2. விகித வரம்பு

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

## சோதனை சிறந்த நடைமுறை

### 1. தனித்தனி சோதனை MCP கருவிகள்

உங்கள் கருவிகளை தனித்தனியாகவும் வெளிப்புற சார்புகளை வேடிக்கையிடும் முறையிலும் எப்போதும் சோதிக்கவும்:

```typescript
// ஒரு கருவி யூனிட் சோதனைக்கு TypeScript உதாரணம்
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ஒரு மோக் வானிலை சேவையை உருவாக்கவும்
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // மோக் சாரப்படுத்தலுடன் கருவியை உருவாக்கவும்
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // ஏற்பாடு செய்யவும்
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // செயல்படுத்து
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
    // ஏற்பாடு செய்யவும்
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // செயல்படுத்து மற்றும் உறுதிப்படுத்து
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. ஒருங்கிணைந்த சோதனை

வாடிக்கையாளர் கோரிக்கைகளிலிருந்து சேவையக பதில்களுக்கு முழுமையான பணியை சோதிக்கவும்:

```python
# பைதான் ஒருங்கிணைப்பு சோதனை உதாரணம்
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # சோதனை சேவையகம் துவக்கு
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # ஒரு கிளையன்டை உருவாக்கு
        client = McpClient("http://localhost:5000")
        
        # கருவி கண்டறிதலை சோதி
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # கருவி இயக்கத்தை சோதி
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # பதிலை சரிபார்க்கவும்
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # ஒழுங்குபடுத்து
        await server.stop()
```

## செயல்திறன் மேம்படுத்தல்

### 1. கேச்சிங் தந்திரங்கள்

காலதாமதத்தை குறைக்கும் மற்றும் வள பயன்பாட்டை குறைக்கும் வகையில் பொருத்தமான கேச்சிங்கை செயல்படுத்தல்:

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

#### 2. சார்புரிமை ஊட்டம் மற்றும் சோதனை திறன்

கருவிகள் தங்கள் சார்புகளை கட்டமைப்பாளர் ஊட்ட மூலமாகப் பெறும் முறையில் வடிவமைக்கப்பட வேண்டும், இதனால் அவை சோதிக்கக்கூடியதும் அமைக்கக்கூடியதுமானவை ஆகின்றன:

```java
// சார்பு நிரப்பல் உடன் ஜாவா எடுத்துக்காட்டு
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // கட்டுமான செயலி மூலம் சார்புகள் நிரப்பப்படுகின்றன
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // கருவி அமலாக்கம்
    // ...
}
```

#### 3. சேர்க்கக்கூடிய கருவிகள்

அனைத்துக் கருவிகளையும் சேர்த்துக் கூட்டி மிகவும் சிக்கலான பணிமுறைகளை உருவாக்கக்கூடிய வகையில் வடிவமைக்கவும்:

```python
# Python எடுத்துக்காட்டு கூட்டுக்கூடிய கருவிகளை காட்டுகிறது
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # நடைமுறைப்படுத்தல்...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # இந்த கருவி dataFetch கருவியின் முடிவுகளை பயன்படுத்தலாம்
    async def execute_async(self, request):
        # நடைமுறைப்படுத்தல்...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # இந்த கருவி dataAnalysis கருவியின் முடிவுகளை பயன்படுத்தலாம்
    async def execute_async(self, request):
        # நடைமுறைப்படுத்தல்...
        pass

# இந்த கருவிகள் தனி முறையிலும் அல்லது வேலைநெறியின் பகுதியாகவும் பயன்படுத்தலாம்
```

### திட்ட வடிவமைப்பு சிறந்த நடைமுறைகள்

திட்டம் என்பது மாடல் மற்றும் உங்கள் கருவியின் இடையேயான ஒப்பந்தம் ஆகும். நன்றாக வடிவமைக்கப்பட்ட திட்டங்கள் கருவி பயன்பாட்டை மேம்படுத்துகின்றன.

#### 1. தெளிவான தொழிற் பாத்திர விளக்கங்கள்

ஒவ்வொரு தொழிற் பாத்திரத்திற்கும் விளக்கக் குறிப்பு எப்போதும் சேர்க்கவும்:

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

தவறான உள்ளீடுகளைத் தடுக்கும் வகையில் சரிபார்ப்பு கட்டுப்பாடுகளை நுழைத்தல்:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // வடிவமைப்பு சரிபார்ப்புடன் மின்னஞ்சல் சொத்துகள்
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // எண் கட்டளைகளுடன் வயது சொத்துகள்
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // விவரம் செய்யப்பட்ட சொத்துகள்
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

#### 3. ஒரே மாதிரி பதில் அமைப்புகள்

மாடல்களுக்கு விளைவுகளை தெளிவாக்கும் முறையில் பதில்கள் ஒரே மாதிரியாக இருக்க வேண்டும்:

```python
async def execute_async(self, request):
    try:
        # கோரிக்கையை செயலாக்கு
        results = await self._search_database(request.parameters["query"])
        
        # எப்போதும் ஒரே மாதிரியான அமைப்பை திருப்பி அனுப்பு
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

### பிழை கைப்பிடிப்பு

MCP கருவிகளுக்கு நம்பகத்தன்மை காக்க வலுவான பிழை கைப்பிடிப்பு அவசியம்.

#### 1. மென்மையான பிழை கைப்பிடிப்பு

சமயசீரான நிலைகளில் பிழைகளை கையாளவும் மற்றும் விளக்கக் குறிப்புகளை வழங்கவும்:

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

சாத்தியமானபோது கட்டமைக்கப்பட்ட பிழை தகவலை வழங்கவும்:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // செயல்படுத்தல்
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
        
        // பிற தவறுகள் ToolExecutionException ஆக மீண்டும் வீசவும்
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. மீண்டும் முயற்சி செயல்

தற்காலிக தோல்விகளுக்கு பொருத்தமான மீண்டும் முயற்சி நிலையை செயல்படுத்துக:

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
                
            # எக்ஸ்போனென்ஷியல் பேக்க்அஃப்
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # அசாதாரண பிழை, மீண்டும் முயற்சி செய்ய வேண்டாம்
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### செயல்திறன் மேம்படுத்தல்

#### 1. கேச்சிங்

மேலோங்கி இயங்கும் பணிகளுக்கு கேச்சிங்கை செயல்படுத்தவும்:

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

#### 2. அசைன்க்ரனஸ் செயலாக்கம்

I/O சார்ந்த பணிகளுக்கு அசைன்க்ரனஸ் நிரலாக்க முறைகளை பயன்படுத்தவும்:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // நீண்டநேர செயல்பாடுகளுக்கு, உடனடி செயலாக்க ID ஐ திருப்பிக் கொடு
        String processId = UUID.randomUUID().toString();
        
        // அசிங்க் செயலாக்கத்தை தொடங்கு
        CompletableFuture.runAsync(() -> {
            try {
                // நீண்டநேர செயல்பாட்டை நிறைவேற்று
                documentService.processDocument(documentId);
                
                // நிலையை புதுப்பி (அதிகமாக ஒரு தரவுத்தளத்தில் சேமிக்கப்படும்)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // செயலாக்க ID உடன் உடனடி பதிலை வழங்கு
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // துணை நிலை சரிபார்ப்பு கருவி
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

#### 3. வள தடுப்பு

அதிவேகத்திலிருந்து பாதுகாப்பாக வள தடுப்பை பயன்படுத்தவும்:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # இரண்டு வினாடிக்கு 5 கோரிக்கைகள் அங்கீகாரம் செய்யவும்
            bucket_size=10        # 10 கோரிக்கைகள் வரை கூட்டு அனுமதி
        )
    
    async def execute_async(self, request):
        # Proceed செய்யக்கூடியதா அல்லது காத்திருப்பதா என்பது சரிபார்க்கவும்
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # காத்திருக்கும் காலம் மிகவும் நீண்டதாக இருந்தால்
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # பொருத்தமான இடைவெளி நேரத்திற்கு காத்திருக்கவும்
                await asyncio.sleep(delay)
        
        # ஒரு டோக்கனை பயன்படுத்தி கோரிக்கையை தொடரவும்
        self.rate_limiter.consume()
        
        # API-ஐ அழைக்கவும்
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
        
        # கடந்த நேரத்தின் அடிப்படையில் புதிய டோக்கன்களைச் சேர்க்கவும்
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### பாதுகாப்பு சிறந்த நடைமுறைகள்

#### 1. உள்ளீடு சரிபார்ப்பு

உள்ளீடு தொழிற் பாத்திரங்களை அடிக்கடி பரிசோதிக்கவும்:

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

#### 2. அங்கீகாரம் சோதனைகள்

உரிய அங்கீகாரம் சோதனைகளை செயல்படுத்தவும்:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // கோரிக்கையிலிருந்து பயனர் சூழலைப் பெறுக
    UserContext user = request.getContext().getUserContext();
    
    // பயனரிடம் தேவையான அனுமதிகள் உள்ளதா என்று சரிபார்க்கவும்
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // குறிப்பிட்ட வளங்களுக்கு, அந்த வரலாற்றிற்கு அணுகலை சரிபார்க்கவும்
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // கருவி செயலாக்கத்தை தொடரவும்
    // ...
}
```

#### 3. நுணுக்கமான தரவு கையாளல்

நுணுக்கமான தரவுகளை கவனமாக கையாளவும்:

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
        
        # பயனர் தரவைக் காண்க
        user_data = await self.user_service.get_user_data(user_id)
        
        # தெளிவாக கோரப்பட்டதும் அங்கீகாரம் பெற்றதும் இல்லையெனில் நுணுக்கமான புலங்களை வடிகட்டி வெளியிடுக
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # கோரிக்கை சூழலில் அங்கீகார நிலையைச் சரிபார்க்கவும்
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # அசல் பதிப்பை மாற்றாமல் இருக்க நகலை உருவாக்கவும்
        redacted = user_data.copy()
        
        # குறிப்பிட்ட நுணுக்கமான புலங்களை மறைக்கவும்
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # உட்பட நுணுக்கமான தரவை மறைக்கவும்
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP கருவிகள் சோதனை சிறந்த நடைமுறைகள்

விரிவான சோதனைகள் MCP கருவிகள் சரியாக இயங்குவதை, முனை நிலை கையாளலை மற்றும் மொத்த அமைப்புடன் இணைப்பை உறுதிப்படுத்துகிறது.

### தனித்தனி சோதனை

#### 1. ஒவ்வொரு கருவியையும் தனி முறையில் சோதிக்கவும்

ஒவ்வொரு கருவியின் செயல்பாட்டுக்கு கவனம் செலுத்தி சோதனைகளை உருவாக்கவும்:

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

திட்டங்கள் செல்லுபடியாகும் மற்றும் கட்டுப்பாடுகளை சரியாக அமுல்படுத்தும் என்பதை சோதிக்கவும்:

```java
@Test
public void testSchemaValidation() {
    // கருவி உதாரணம் உருவாக்கவும்
    SearchTool searchTool = new SearchTool();
    
    // வார்ப்புருவைப் பெறவும்
    Object schema = searchTool.getSchema();
    
    // சரிபார்க்க JSON ஆக வார்ப்புருவை மாற்றவும்
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // வார்ப்புரு செல்லுபடியாகும் JSONSchema ஆக இருக்கிறதா என்று சரிபார்க்கவும்
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // செல்லுபடியாகும் அளவுருக்கள் சோதனை செய்யவும்
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // அவசியமான அளவுரு இல்லாமல் சோதனை செய்யவும்
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // தவறான அளவுரு வகையை சோதனை செய்யவும்
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. பிழை கைப்பிடிப்பு சோதனைகள்

குறிப்பிட்ட பிழை நிலைகளுக்கு சோதனைகளை உருவாக்கவும்:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # ஒழுங்குபடுத்தவும்
    tool = ApiTool(timeout=0.1)  # மிகவும் குறுகிய நேரவிட்டு
    
    # நேரவிட்டு ஆகும் கோரிக்கையை மாக் செய்க
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # நேரவிட்டை விட நீளம்
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # செயல் & உறுதிப்படும்
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # தவறான செய்தியை உறுதிப்படுத்தவும்
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # ஒழுங்குபடுத்தவும்
    tool = ApiTool()
    
    # ஒரு வீத வரம்பு கொண்ட பதிலை மாக் செய்க
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
        
        # செயல் & உறுதிப்படும்
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # தவறு செய்தி வீத வரம்பு தகவலை கொண்டிருக்கிறது என்பதை உறுதிப்படுத்தவும்
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### ஒருங்கிணைந்த சோதனை

#### 1. கருவி சங்கிலி சோதனை

எதிர்பாராத இணைப்புகளில் கருவிகள் இணைந்து செயல்படுவதை சோதிக்கவும்:

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

சம்பூர்ண கருவி பதிவு மற்றும் செயலாக்கத்துடன் MCP சேவையகத்தை சோதிக்கவும்:

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
        // கண்டுபிடிப்பு முனையத்தை சோதிக்கவும்
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
        // "b" என்னும் பரிமாணம் இல்லை
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

#### 3. முடிவு முதல் முடிவுவரை சோதனை

மாடல் ஊக்கமிடல் முதல் கருவியின் செயல்பாடு வரை முழுமையான பணிமுறையை சோதிக்கவும்:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # ஒழுங்குபடுத்து - MCP கிளையன்ட் மற்றும் மொக் மாதிரியை அமைக்கு
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # மொக் மாதிரி பதில்கள்
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
    
    # மொக் காலநிலை கருவி பதில்
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
        
        # செயல்
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

#### 1. பாரம் சோதனை

எத்தனை ஒருங்கிணைந்த கோரிக்கைகளை உங்கள் MCP சேவையகங்கள் கையாள முடியும் என சோதிக்கவும்:

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

மிகக் கடுமையான பாரத்தை அமைப்பில் வைக்கவும் சோதிக்கவும்:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // மன அழுத்தம் சோதனைக்காக JMeter ஐ செட் அப் செய்க
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter சோதனை திட்டத்தை உள்ளமைக்கவும்
    HashTree testPlanTree = new HashTree();
    
    // சோதனை திட்டம், திரெட் குழு, சம்பிளர்கள் ஆகியவற்றை உருவாக்கவும்
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // கருவி செயல்பாட்டிற்கான HTTP சம்பிளரை சேர்க்கவும்
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // சுவாரஸ்யர்களை சேர்க்கவும்
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // சோதனையை இயக்குக
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // முடிவுகளைச் சரிபார்க்கவும்
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // சராசரி பதிலளிக்கும் நேரம் < 200மி உ
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90வது சதவீதம் < 500மி உ
}
```

#### 3. கண்காணிப்பு மற்றும் சுய பற்றாள்பு

நீண்ட கால செயல்திறன் மதிப்பீட்டிற்கான கண்காணிப்பை அமைக்கவும்:

```python
# ஒரு MCP சேவையகத்திற்கு கண்காணிப்பை குறியீடு செய்யவும்
def configure_monitoring(server):
    # Prometheus அளவுருக்களை அமைக்கவும்
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
    
    # நேரம் எடுத்துக்கொள்ள மற்றும் அளவுருக்களை பதிவு செய்ய மிடில் வேர் சேர்க்கவும்
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # அளவுருக்கள் தொடுப்பை வெளிப்படுத்தவும்
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP பணிமுறை வடிவமைப்பு மாதிரிகள்

நன்றாக வடிவமைக்கப்பட்ட MCP பணிமுறைகள் செயல்திறன், நம்பகத்தன்மை மற்றும் பராமரிப்பு திறனை மேம்படுத்துகின்றன. பின்வரும் முக்கிய மாதிரிகளை பின்பற்றவும்:

### 1. கருவிகள் சங்கிலி மாதிரி

ஒவ்வொரு கருவியின் வெளியீடு அடுத்த கருவிக்கு உள்ளீடாக மாறுகின்ற வரிசையில் பல கருவிகளை இணையாக்கவும்:

```python
# Python சீரியல் டூல்ஸ் செயல்படுத்தல்
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # தொடர்ச்சியில் செயல்படுத்தும் கருவி பெயர்கள் பட்டியல்
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # தொடர் ஒவ்வொரு கருவியையும் இயக்கவும், முந்தைய முடிவைத் தெரிவிக்கவும்
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # முடிவைச் சேமித்து அடுத்த கருவிக்காக உள்ளீடாகப் பயன்படுத்தவும்
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# எடுத்துக்காட்டு பயன்பாடு
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

### 2. பகிர்மானி மாதிரி

உள்ளீட்டை அடிப்படையாகக் கொண்டு சிறப்பு செய்யப்பட்ட கருவிகளுக்கு பகிர்மானி கருவியைப் பயன்படுத்துக:

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

### 3. இணை கோலாகல செயலாக்கம்

ஆற்றலைச் செயல்திறம்படுத்த பல கருவிகளை ஒரே நேரத்தில் இயக்கு:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // படி 1: தரவுத்தொகை மெடாடேட்டாவை பெறு (ஒத்திசைவு)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // படி 2: பல விசாரணைகளை ஒரே நேரத்தில் தொடங்கு
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
        
        // அனைத்து 병ியல் பணிகளும் முடிந்த வரை காத்திரு
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // முடிவை காத்திரு
        
        // படி 3: முடிவுகளை ஒன்றிணை
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // படி 4: சுருக்கமான அறிக்கையை உருவாக்கு
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // முழுமையான பணிநிரலின் முடிவை திருப்பி கொடு
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. பிழை மீட்பு மாதிரி

கருவிகளில் தோல்விகள் நேருமானால் மென்மையான மீட்புகளை செயல்படுத்துக:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # முதன்மை கருவியை முதலில் முயற்சிக்கவும்
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # தோல்வியை பதிவு செய்யவும்
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # மாற்று கருவிக்கு கிருமிக்கவும்
            try:
                # மாற்று கருவிக்கான அளவுருக்களை மாற்ற வேண்டியிருக்கலாம்
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # இரண்டு கருவிகளும் தோல்வியடைந்தன
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # இந்த அமலாக்கம் குறிப்பிடப்பட்ட கருவிகளுக்கே சார்ந்திருக்கும்
        # இந்த எடுத்துக்காட்டிற்கு, நாம் முதலில் உள்ள அளவுருக்களை திரும்ப தருவோம்
        return params

# உதாரண பயன்பாடு
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # முதன்மை (பணம் கொடுக்கப்படும்) வானிலை API
        "basicWeatherService",    # மாற்று (இலவச) வானிலை API
        {"location": location}
    )
```

### 5. பணிமுறை சேர்க்கை மாதிரி

சுலபமான பணிமுறைகளை சேர்க்கையாக்கி சிக்கலான பணிமுறைகளை உருவாக்கு:

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

# MCP சேவையகங்கள் சோதனை: சிறந்த நடைமுறைகள் மற்றும் சிறந்த நுட்பங்கள்

## கண்ணோட்டம்

நம்பகமான, உயர்தர MCP சேவையகங்களை உருவாக்குவதில் சோதனை என்பது மிகவும் முக்கியமான அமசமாகும். இந்த வழிகாட்டி உற்பத்தி வாழ்நாள் முழுவதும், தனித்தனி சோதனைகளிலிருந்து ஒருங்கிணைந்த சோதனைகள் மற்றும் முடிவு முதல் முடிவுவரை செல்லும் சரிபார்ப்புகளுக்கு MCP சேவையகங்கள் சோதனைக்கு முழுமையான சிறந்த நடைமுறைகள் மற்றும் குறிப்புகளை வழங்குகிறது.

## MCP சேவையகங்களுக்கு சோதனை ஏன் முக்கியம்

MCP சேவையகங்கள் AI மாடல்களுக்கும் வாடிக்கையாளர் பயன்பாடுகளுக்கும் இடையில் முக்கிய மிடில் வேர் ஆகும். முழுமையான சோதனைகள் உறுதிப்படுத்துகின்றன:

- உற்பத்தி சூழலில் நம்பகத்தன்மை
- கோரிக்கைகள் மற்றும் பதில்களை சுத்தமாக கையாளல்
- MCP விவரக்குறிப்புகளை சரியாக அமல் செய்தல்
- தோல்விகள் மற்றும் முனை நிலைகளுக்கு எதிர்ப்பு திறன்
- பல்வேறு பாரங்களில் ஒரே மாதிரியான செயல்திறன்

## MCP சேவையகங்களுக்கு தனித்தனி சோதனை

### தனித்தனி சோதனை (அடிப்பு)

தனித்தனி சோதனைகள் உங்கள் MCP சேவையகத்தின் தனித்தனி கூறுகளை தனிமையாகச் சோதிக்கின்றன.

#### என்ன சோதிக்க வேண்டும்

1. **வள முகவர்கள்**: ஒவ்வொரு வள முகவரின் தர்க்கத்தை தனிப்படியாக சோதிக்கவும்
2. **கருவி செயல்பாடுகள்**: பல்வேறு உள்ளீடுகளுடன் கருவிகளின் நடத்தை சரிபார்க்கவும்
3. **ஊக்க வந்தைகள்**: ஊக்க வார்ப்புருக்கள் சரியாக காண்பிக்கப்படுகின்றனவா என்று உறுதிப்படுத்தவும்
4. **திட்ட சரிபார்ப்பு**: தொழிற் பாத்திர சரிபார்ப்பைச் சோதிக்கவும்
5. **பிழை கைப்பிடிப்பு**: தவறான உள்ளீடுகளுக்கு பிழை பதில்களை பரிசோதிக்கவும்

#### தனித்தனி சோதனை சிறந்த நடைமுறைகள்

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
# பைதானில் கால்குலேட்டர் கருவிக்கான உதாரண யூனிட் சோதனை
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

### ஒருங்கிணைந்த சோதனை (மத்திய அடுக்கு)

ஒருங்கிணைந்த சோதனைகள் உங்கள் MCP சேவையகத்தின் கூறுகளுக்கிடையேயான தொடர்புகளை சரிபார்க்கின்றன.

#### என்ன சோதிக்க வேண்டும்

1. **சேவையகத் துவக்கம்**: பல்வேறு கட்டமைப்புகளுடன் சேவையக துவக்கத்தை சோதிக்கவும்
2. **பாதை பதிவு**: அனைத்து முடிவுகளை சரியாக பதிவு செய்துள்ளதா என்று உறுதிப்படுத்து
3. **கோரிக்கை செயலாக்கம்**: முழு கோரிக்கை-பதில் சுழற்சியை சோதனை செய்யவும்
4. **பிழை பரப்புதல்**: கூறுகளுக்கு இடையேயான பிழைகள் சரியாக கையாளப்படுகிறதா என்று உறுதிப்படுத்து
5. **அடையாளம் மற்றும் அங்கீகாரம்**: பாதுகாப்பு முறைகளை சோதிக்கவும்

#### ஒருங்கிணைந்த சோதனை சிறந்த நடைமுறைகள்

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

### முடிவிலி சோதனை (மேல் அடுக்கு)

முடிவிலி சோதனைகள் வாடிக்கையாளர் முதல் சேவையகத்திற்கான முழு அமைப்பின் நடத்தை சரிபார்க்கின்றன.

#### என்ன சோதிக்க வேண்டும்

1. **வாடிக்கையாளர்-சேவையக தொடர்பு**: முழு கோரிக்கை-பதில் சுழற்சிகளைச் சோதனை செய்யவும்
2. **உண்மை வாடிக்கையாளர் SDK கள்**: நிஜ வாடிக்கையாளர் செயலாக்கங்களுடன் சோதிக்கவும்
3. **பாரத்தில் செயல்திறன்**: பல ஒருங்கிணைந்த கோரிக்கைகளுடன் நடத்தை சொல்லவும்
4. **பிழை மீட்பு**: தோல்விகளில் இருந்து அமைப்பு மீட்கப்படுகிறதா என்று சோதிக்கவும்
5. **நீண்டநேர செயல்பாடுகள்**: ஸ்ட்ரீமிங் மற்றும் நீண்ட செயல்பாடுகளின் கையாளல் சோதனை செய்யவும்

#### E2E சோதனை சிறந்த நடைமுறைகள்

```typescript
// TypeScript-இல் ஒரு கிளையண்டுடன் எடுத்துக்காட்டு E2E சோதனை
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // சோதனை சூழலில் சர்வரை துவக்கு
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
    
    // உறுதிப்படுத்து
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP சோதனைக்கு வேடிக்கைக்கூறுகள்

வகுப்புகளுக்கு இடமாற்றம் செய்யும் போது மூலக்கூறுகளை தனிமைப்படுத்தவே வேடிக்கைக்கூறுகள் அவசியம்.

### பூஞ்சையிட வேண்டிய கூறுகள்

1. **வெளியுற AI மாடல்கள்**: கண்காணிக்கப்பட்ட சோதனைக்கு மாடல் பதில்களை வேடிக்கையாக மாற்றுக
2. **வெளியுற சேவைகள்**: API சார்புகளை (தரவுத்தளம், மூன்றாம் பக்கம் சேவைகள்) வேடிக்கையாக மாற்றுக
3. **அடையாள சேவைகள்**: அடையாள வழங்குநர்களை வேடிக்கையாக மாற்றுக
4. **வள வழங்குநர்கள்**: அதிக விலை உள்ள வள முகவர்களை வேடிக்கையாக மாற்றுக

### உதாரணம்: AI மாடல் பதிலை வேடிக்கப்படுத்தல்

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
# Python எடுத்துக்காட்டு unittest.mock உடன்
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # மாக் அமைக்கவும்
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # சோதனையில் மாக் பயன்படுத்தவும்
    server = McpServer(model_client=mock_model)
    # சோதனையுடன் தொடர்ந்து செயல்படவும்
```

## செயல்திறன் சோதனை

உற்பத்தி MCP சேவையகங்களுக்கு செயல்திறன் சோதனை முக்கியம்.

### என்ன அளவிட வேண்டும்

1. **தாமதம்**: கோரிக்கைகளுக்கான பதிலளிக்கும் வேகம்
2. **தொகுதி**: ஒரு விநாடிக்கு கையாளும் கோரிக்கைகள்
3. **வள பயன்பாடு**: CPU, நினைவகம், நெட்வொர்க் பயன்பாடு
4. **ஒரே நேர கோரிக்கை கையாளல்**: இணை கோரிக்கைகளில் நடத்தை
5. **தோற்றத்தின் பண்புகள்**: பாரம் அதிகரிக்கும் போது செயல்திறன்

### செயல்திறன் சோதனை கருவிகள்

- **k6**: திறந்த மூல பார சோதனை கருவி
- **JMeter**: விரிவான செயல்திறன் சோதனை
- **Locust**: Python அடிப்படையிலான பார சோதனை
- **Azure Load Testing**: மேகத்தில் செயல்திறன் சோதனை

### உதாரணம்: k6 உடன் அடிப்படைக் பார சோதனை

```javascript
// MCP சேவையகத்தை மொத்த சுமை பரிசோதனை செய்ய k6 ஸ்கிரிப்ட்
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 மெய்நிகர் பயனர்கள்
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

## MCP சேவையகங்களுக்கான சோதனை தானியக்கமயமாக்கல்

உங்கள் சோதனைகளை தானியக்கமாக்குவதன் மூலம் தொடர்ச்சியான தரமாகும் மற்றும் வேகமான பின்னூட்ட சுழற்சிகளை உறுதிப்படுத்தலாம்.

### CI/CD ஒருங்கிணைப்பு
1. **புல் கோரிக்கைகள் மீது யூனிட் சோதனைகள் இயக்குக**: கோடு மாற்றங்கள் தற்போதைய செயல்பாடுகளை முறையாக செயல்படுத்துவதை உறுதி செய்க
2. **ஸ்டேஜிங் பகுதியில் ஒருங்கிணைவு சோதனைகள்**: முன்னெண்ணிக்கை சூழல்களில் ஒருங்கிணைவு சோதனைகள் இயக்குக
3. **செயல்திறன் அடிப்படைகள்**: மீள்பார்வை நிகழ்வுகளை கண்டறிய செயல்திறன் அடிப்படைகளை பாதுகாப்புக
4. **பாதுகாப்பு ஸ்கேன்**: குழாயின் ஒரு பகுதியாக பாதுகாப்பு சோதனையை தானாக இயக்குக

### உதாரண CI குழாய் (GitHub Actions)

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

## MCP குறிப்புக்கு ஏற்ப சோதனை

உங்கள் செர்வர் MCP குறிப்பை சரியாக செயல்படுத்துகிறதா என்பதை சரிபார்க்கவும்.

### முக்கிய அமத்தீன பகுதிகள்

1. **API முடிவிலிகள்**: தேவையான முடிவிலிகளைக் சோதிக்கவும் (/resources, /tools, எனன)
2. **கோரிக்கை/பதிலளி வடிவம்**: உரிமைமுறை ஒற்றுமை சரிபார்க்கவும்
3. **பிழை குறியீடுகள்**: பல்வேறு நிலைகளிற்கு சரியான நிலை குறியீடுகளை உறுதிப்படுத்துக
4. **உள்ளடக்க வகைகள்**: வெவ்வேறு உள்ளடக்க வகைகளை கையாள்வதை சோதிக்கவும்
5. **அங்கீகார முறை**: குறிப்புக்கு ஏற்ப அங்கீகரிப்பு முறைகளை உறுதிப்படுத்துக

### ஒற்றுமை சோதனைத் தொகுப்பு

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

## MCP செர்வர் சோதனைக்கு சிறந்த 10 குறிப்பு

1. **கருவி வரையறைகளை தனித்தனியாக சோதிக்கவும்**: கருவி தர்க்கத்திலிருந்து தனித்தனியே கொள்கை வரையறைகளை உறுதிப்படுத்தவும்
2. **அளவுரு கொண்ட சோதனைகளை பயன்படுத்துக**: பலவித உள்ளீடுகளுடன் கருவிகளை சோதிக்கவும், அதில் மிகைவான நிலைகளும் அடக்கம்
3. **பிழை பதில்களைச் சரிபார்க்கவும்**: அனைத்து சாத்தியமான பிழை நிலைகளுக்கும் சரியான பிழை கையாளலை உறுதிப்படுத்துக
4. **அங்கீகார எழுதுவரிசையை சோதிக்கவும்**: வெவ்வேறு பயனர் பங்குகளுக்கான சரியான அணுகல் கட்டுப்பாட்டை உறுதிப்படுத்துக
5. **சோதனை வரம்பைக் கண்காணிக்கவும்**: முக்கிய வழிக்கடத்தல் கோடை அதிகமாக உள்ளதா என்பதை நோக்கு
6. **ஸ்ட்ரீமிங் பதில்களை சோதிக்கவும்**: ஸ்ட்ரீமிங் உள்ளடக்கத்தைச் சரியான முறையில் கையாள்வதை உறுதிப்படுத்துக
7. **நெட்வொர்க் சிக்கல்களை ஒப்பநிலை படுத்துக**: மோசமான நெட்வொர்க் சூழ்நிலைகளில் நடத்தை சோதிக்கவும்
8. **வள வரம்புகளை சோதிக்கவும்**: அளவுருக்கள் அல்லது வீத வரம்புகளை அடைந்தபோது நடத்தை உறுதி செய்க
9. **மீள்பார்வை சோதனைகளை தானாக இயக்குக**: ஒவ்வொரு கோடு மாற்றத்திலும் இயங்கும் தொகுப்பை உருவாக்குக
10. **சோதனை வழக்குகளை ஆவணப்படுத்தவும்**: சோதனை நிலைகளின் தெளிவான ஆவணங்களை பராமரிக்கவும்

## பொதுவான சோதனை குறுக்கீடுகள்

- **மகிழ்ச்சி வழிக்கான சோதனையில் மிகை நம்பிக்கை**: பிழை நிலையில் கூட நன்கு சோதிக்க வேண்டும்
- **செயல்திறன் சோதனையை புறக்கணித்தல்**: உற்பத்தி பாதிக்குமுன் தடைகள் கண்டறியப்பட வேண்டும்
- **தனித்தனிப்பாக மட்டும் சோதனை செய்வது**: யூனிட், ஒருங்கிணைவு, மற்றும் E2E சோதனைகளை ஒன்றோடு ஒன்று இணைக்கவும்
- **குறைந்த API கவனிப்பாடு**: அனைத்து முடிவுகளும் மற்றும் அம்சங்களும் சோதிக்கப்பட்டுள்ளன என்பதை உறுதிப்படுத்துக
- **ஒற்றைமையற்ற சோதனை சூழல்கள்**: ஒரே மாதிரியாக சோதனை சூழல்களை உறுதிப்படுத்த கன்டெயினர்களைப் பயன்படுத்துக

## முடிவு

நம்பகமான, உயர் தரமான MCP செர்வர்களை அமல்படுத்துவதற்கு முழுமையான சோதனை நிலைப் பார்வை அவசியம். இந்த வழிகாட்டியில் கொடுக்கப்பட்ட சிறந்த பழக்க வழக்கங்கள் மற்றும் குறிப்புகளை பின்பற்றி, உங்கள் MCP அமலாக்கங்கள் தரம், நம்பகத்தன்மை மற்றும் செயல்திறன் ஆகிய உயர்ந்த தரக்கோள்களை பூர்த்தி செய்யலாம்.


## முக்கிய எடுத்துக்காட்டுகள்

1. **கருவி வடிவமைப்பு**: தனிப்பட்ட பொறுப்புக் கோட்பாட்டை பின்பற்றி, சாராம்சச் செருகல்களைப் பயன்படுத்தி, தொகுக்கக்கூடிய முறையில் வடிவமைக்கவும்
2. **கொள்கை வடிவமைப்பு**: தெளிவான, நன்கு ஆவணப்படுத்தப்பட்ட கொள்கைகள் உருவாக்கவும் மற்றும் சரியான உறுதிப்படுத்தல் கட்டுப்பாடுகளை வைக்கவும்
3. **பிழை கையாளல்**: மென்மையான பிழை கையாளல், கட்டமைக்கப்பட்ட பிழை பதில்கள், மற்றும் மீண்டும் முயற்சி செய்யும் முறைமைகளை அமல்படுத்தவும்
4. **செயல்திறன்**: கேஷிங், அசிங்ககமான செயலாக்கம், மற்றும் வள கட்டுப்பாட்டை பயன்படுத்தவும்
5. **பாதுகாப்பு**: விரிவான உள்ளீடு சரிபார்ப்பு, அங்கீகார சோதனைகள் மற்றும் நுணுக்கத் தரவு கையாளலை பாய்ச்சவும்
6. **சோதனை**: முழுமையான யூனிட், ஒருங்கிணைப்பு மற்றும் இறுதிப் புள்ளி சோதனைகளை உருவாக்கவும்
7. **வேலைபாடு பிராணல்கள்**: சங்கிலிகள், அனுப்புநர்கள், மற்றும் ஒத்த செயலாக்கம் போன்ற நிலையான பிராணல்களைப் பயன்படுத்தவும்

## பயிற்சி

ஒரு ஆவண செயலாக்க அமைப்புக்கான MCP கருவி மற்றும் வேலைப்பாட்டை வடிவமைக்கவும், அது:

1. பல வடிவங்களில் ஆவணங்களை ஏற்கிறது (PDF, DOCX, TXT)
2. ஆவணங்களிலிருந்து உரையும் முக்கியத் தகவல்களையும் எடுக்கின்றது
3. ஆவணங்களை வகை மற்றும் உள்ளடக்கத்தின் அடிப்படையில் வகைப்படுத்துகின்றது
4. ஒவ்வொரு ஆவணத்தின் சுருக்கத்தையும் உருவாக்குகின்றது

கருவி கொள்கைகள், பிழை கையாளல் மற்றும் இந்த சூழலுக்கு ஏற்ற வேலைப்பாடு முறைமையை அமல்படுத்தவும். இந்த அமல்பாட்டை எப்படி சோதிப்பீர்கள் என நினைவில் வையுங்கள்.

## வளங்கள்

1. சமீபத்திய வளர்ச்சிகளைப் பற்றி அறிவதற்கு [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) இல் MCP சமூகத்தில் சேரவும்
2. திறந்த மூல [MCP திட்டங்களில்](https://github.com/modelcontextprotocol) பங்களிக்கவும்
3. உங்கள் நிறுவனத்தின் AI முயற்சிகளில் MCP கொள்கைகளை பயன்படுத்தவும்
4. உங்கள் தொழில்துறைக்கான சிறப்பு MCP அமல்பாடுகளை ஆராயவும்
5. பல்வேறு MCP தலைப்புகளில் முன்னேறிய பாடத்திட்டங்களை எடுத்துக்கொள்ள பரிந்துரைக்கப்படுகின்றது, உதாரணமாக மல்டிமோடல் ஒருங்கிணைவு அல்லது நிறுவன பயன்பாட்டு ஒருங்கிணைவு
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) மூலம் கற்ற MCP கருவிகள் மற்றும் வேலைப்பாடுகளை உருவாக்கி முயற்சியிடவும்

## அடுத்து என்ன

அடுத்து: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாம் துல்லியத்திற்காக முயலினாலும், தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை தயவுசெய்து கவனத்தில் கொள்ளுங்கள். அசல் ஆவணம் அதன் சொந்த மொழியிலேயே அதிகாரப்பூர்வ மூலமாகக் கருதப்பட வேண்டும். முக்கியமான தகவலுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பை பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பின் பயன்படுத்தியதனால் ஏற்படும் எந்தவொரு தவறான புரிதல்களுக்கும் அல்லது தவறான விளக்கங்களுக்கும் நாங்கள் பொறுப்பற்றவராக இருக்கிறோம்.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->