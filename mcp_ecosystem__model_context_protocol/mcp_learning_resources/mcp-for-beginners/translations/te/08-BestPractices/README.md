# MCP అభివృద్ధి ఉత్తమ అభ్యాసాలు

[![MCP అభివృద్ధి ఉత్తమ అభ్యాసాలు](../../../translated_images/te/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(ఈ పాఠం యొక్క వీడియోను వీక్షించడానికి పై చిత్రం క్లిక్ చేయండి)_

## అవలోకనం

ఈ పాఠం ప్రొడక్షన్ వాతావరణాలలో MCP సర్వర్‌లు మరియు ఫీచర్లను అభివృద్ధి చేయడం, పరీక్షించడం మరియు డిప్లాయ్ చేయడం కోసం ఆధునిక ఉత్తమ అభ్యాసాలపై केंद्रితం. MCP ఎకోసిస్టమ్స్ సంక్లిష్టత మరియు ప్రాధాన్యత పెరుగుతుండగా, స్థిరీకృత నమూనాలను అనుసరించడం విశ్వసనీయత, నిర్వహణ సౌకర్యం, మరియు పరస్పర కిర్తనను నిర్ధారిస్తుంది. ఈ పాఠం వాస్తవ ప్రపంచ MCP అమలు నుండి స్వీకరించిన ప్రాణవন্তమైన జ్ఞానం మీకు బలమైన, సమర్ధవంతమైన సర్వరులను సమర్థవంతమైన వనరులు, ప్రాంప్ట్స్, మరియు టూల్స్ తో సృష్టించడంలో మార్గదర్శకం చేస్తుంది.

## నేర్చుకోవాల్సిన లక్ష్యాలు

ఈ పాఠం ముగిసేముందు, మీరు చేయగలుగుతారు:

- MCP సర్వర్ మరియు ఫీచర్ డిజైన్‌లో పరిశ్రమ ఉత్తమ అభ్యాసాలను ప్రయోగించడం
- MCP సర్వర్ల కొరకు సమగ్ర పరీక్షా వ్యూహాలను సృష్టించడం
- సంక్లిష్ట MCP అనువర్తనాలకు సమర్ధవంతమైన, పునరుపయోగయోగ్య వర్క్‌ఫ్లో నమూనాలను రూపకల్పన చేయడం
- MCP సర్వర్లలో సరైన లోప నిర్వహణ, లాగింగ్, మరియు పరిశీలనను అమలు చేయడం
- ప్రదర్శన, భద్రత, మరియు నిర్వహణ సౌకర్యం కొరకు MCP అమలులను ఆప్టిమైజ్ చేయడం

## MCP ప్రాథమిక సూత్రాలు

స్పష్టమైన అమలు అభ్యాసాలపై దృష్టి పెట్టేముందు, సమర్థవంతమైన MCP అభివృద్ధిని మార్గనిర్దేశకం చేసే ప్రాథమిక సూత్రాలను అర్థం చేసుకోవడం ముఖ్యం:

1. **ప్రామాణికీకృత కమ్యూనికేషన్**: MCP తన ప్రాతిపదికగా JSON-RPC 2.0 ను ఉపయోగిస్తుంది, ఇది అన్ని అమలుల వరుసలో అభ్యర్థనలు, ప్రతిస్పందనలు, మరియు లోప నిర్వహణ కొరకు సुस్పష్టం స్థిరమైన ఫార్మాట్ ను అందిస్తుంది.

2. **వినియోగదారుడు కేంద్రీకృత డిజైన్**: మీ MCP అమలుల్లో ఎల్లప్పుడూ వినియోగదారుని అనుమతి, నియంత్రణ, మరియు పారదర్శకతను ప్రాధాన్యం ఇవ్వండి.

3. **భద్రత మొదట**: ప్రామాణీకరణ, అనుమతి, ధృవీకరణ మరియు రేట్ పరిమితులు సహా పటిష్టమైన భద్రతా చర్యలను అమలు చేయండి.

4. **మాడ్యులర్ ఆర్కిటెక్చర్**: ప్రతి టూల్ మరియు వనరు స్పష్టమైన, కేంద్రీకృత ప్రయోజనంతో మీ MCP సర్వర్లను మాడ్యులర్ విధానంలో డిజైన్ చేయండి.

5. **స్టేట్ఫుల్ కనెక్షన్లు**: అనేక అభ్యర్థనలలో స్థితిని నిలబెట్టుకునే MCP సామర్థ్యాన్ని ఉపయోగించి మరింత సబంధిత, సార్వత్రిక ఇంటరాక్షన్లను పొందండి.

## అధికారిక MCP ఉత్తమ అభ్యాసాలు

కింది ఉత్తమ అభ్యాసాలు అధికారిక Model Context Protocol డాక్యుమెంటేషన్ నుండి తీసుకోబడింది:

### భద్రత ఉత్తమ అభ్యాసాలు

1. **వినియోగదారుని అనుమతి మరియు నియంత్రణ**: డేటాను యాక్సెస్ చేయడం లేదా ఆపరేషన్లు చేయడం ముందు స్పష్టమైన వినియోగదారుని అనుమతిని ఎల్లప్పుడూ అవసరమవుతుంది. ఏ డేటా షేర్ అవుతుంది మరియు ఏ కార్యాచరణలు అనుమతించబడతాయో స్పష్టమైన నియంత్రణను ఇవ్వండి.

2. **డేటా గోప్యత**: స్పష్టమైన అనుమతి ఉన్నప్పుడు మాత్రమే వినియోగదారుని డేటాను బహిర్గతం చేయండి మరియు తగిన యాక్సెస్ నియంత్రణలతో దాన్ని రక్షించండి. అనధికార డేటా ప్రసారం నుండి రక్షించండి.

3. **టూల్ భద్రత**: ఏ టూల్‌ను పిలవడానికి ముందు స్పష్టమైన వినియోగదారుని అనుమతిని అవసరం చేయండి. వినియోగదారులు ప్రతి టూల్ యొక్క పనితీరును అర్థం చేసుకోవడానికి నిర్ధారించండి మరియు పటిష్ట భద్రతా సరిహద్దులను అమలు చేయండి.

4. **టూల్ అనుమతి నియంత్రణ**: సెషన్ సమయంలో ఏ టూల్స్‌ను మోడల్ ఉపయోగించగలదో ఆక్రమణ చేయండి, స్పష్టంగా అనుమతించబడిన టూల్స్ మాత్రమే యాక్సెస్ చేయగలుగుతాయని నిర్ధారించండి.

5. **ప్రామాణీకరణ**: టూల్స్, వనరులు, లేదా సున్నితమైన ఆపరేషన్ల యాక్సెస్ కోసం సరైన ప్రామాణీకరణ అవసరం (API కీలు, OAuth టోకెన్లు లేదా ఇతర భద్రతా విధానాలు ఉపయోగించడం).

6. **పరామితి ధృవీకరణ**: టూల్ పిలుపు సమస్త పరామితుల ధృవీకరణను పటిష్టంగా అమలు చేయాలి, తద్వారా తప్పు గల లేదా దుష్టమైన ఇన్పుట్ టూల్ అమలు వరకు చేరకుండా ఉండుగాక.

7. **రేట్ పరిమితి**: దుర్వినియోగాన్ని నివారించడానికి మరియు సర్వర్ వనరుల న్యాయమైన వినియోగాన్ని నిర్ధారించడానికి రేట్ పరిమితిని అమలు చేయండి.

### అమలు ఉత్తమ అభ్యాసాలు

1. **సామర్థ్యం చర్చింపు**: కనెక్షన్ సెటప్ సమయంలో, మద్దతిచ్చే ఫీచర్లు, ప్రోటోకాల్ వెర్షన్లు, అందుబాటులో ఉన్న టూల్స్ మరియు వనరుల గురించి సమాచారాన్ని మార్చుకోండి.

2. **టూల్ డిజైన్**: బహୁ విష‌యాలను నిర్వహించే మోనోలిథిక్ టూల్స్ కాకుండా ఒక పని బాగా చేసే కేంద్రీకృత టూల్స్ సృష్టించండి.

3. **లోప నిర్వహణ**: సమస్యలను గుర్తించడానికి, వైఫల్యాలను సాఫీగా నిర్వహించేందుకు, మరియు చర్య తీసుకునే సూచనలు అందించడానికి ప్రామాణిక లోప సందేశాలు మరియు కోడులను అమలు చేయండి.

4. **లాగింగ్**: ఆడిటింగ్, డీబగ్గింగ్, మరియు ప్రోటోకాల్ ఇంటరాక్షన్ల మానిటరింగ్ కొరకు నిర్మాణాత్మక లాగ్స్ ను ఆకృతీకరించండి.

5. **ప్రగతి ట్రాకింగ్**: దీర్ఘకాలిక ఆపరేషన్ల కొరకు ప్రగతి నవీకరణలను నివేదించండి, తద్వారా స్పందన ఫలకాలను సాధ్యం అవుతుంది.

6. **అభ్యర్థన రద్దు**: వినియోగదారులకు అవసరం kalada లేదా ఎక్కువసేపు సాగుతున్న అభ్యర్థనలను రద్దు చేసే అవకాశం కల్పించండి.

## అదనపు సూచనలు

MCP ఉత్తమ అభ్యాసాలతో తాజా సమాచారాన్ని పొందడానికి, ఈ లింకులను చూడండి:

- [MCP డాక్యుమెంటేషన్](https://modelcontextprotocol.io/)
- [MCP స్పెసిఫికేషన్ (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub రిపోజిటరీ](https://github.com/modelcontextprotocol)
- [భద్రత ఉత్తమ అభ్యాసాలు](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP టాప్ 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - భద్రత రిస్కులు మరియు నివారణలు
- [MCP భద్రత శిఖరం వర్క్‌షాప్ (షెర్పా)](https://azure-samples.github.io/sherpa/) - చేతనైన భద్రత శిక్షణ

## ప్రయోగాత్మక అమలు ఉదాహరణలు

### టూల్ డిజైన్ ఉత్తమ అభ్యాసాలు

#### 1. ఏకైక బాధ్యత సూత్రం

ప్రతి MCP టూల్ స్పష్టమైన మరియు కేంద్రీకృత ప్రయోజనాన్ని కలిగి ఉండాలి. బహుగుణాల కలిగిన మోనోలిథిక్ టూల్స్ సృష్టించడం కాకుండా నిర్దిష్ట పనుల్లో నైపుణ్యం కలిగిన ప్రత్యేక టూల్‌లు అభివృద్ధి చేయండి.

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

#### 2. సుస్పృష్త లోప నిర్వహణ

సూచనాత్మక లోప సందేశాలు మరియు తగిన రీకవరీ అల్గోరిథమ్స్ తో పటిష్ట లోప నిర్వహణను అమలు చేయండి.

```python
# విస్తృతమైన లోపాల నిర్వహణతో పైథాన్ ఉదాహరణ
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # పారామెటర్ ధృవీకరణ
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # భద్రత ధృవీకరణ
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # సమయ పరిమితితో డేటాబేస్ ఆపరేషన్
                async with timeout(10):  # 10 సెకన్ల సమయ పరిమితి
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # కనెక్షన్ లోపాలు తారుమారు కావచ్చు
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # క్వెరీ లోపాలు సాధారణంగా క్లయింట్ లోపాలు
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # టూల్-స్పెసిఫిక్ లోపాలను దాట nucchandi
            raise
        except Exception as e:
            # అనూహ్య లోపాల కోసం క్యాచ్-ఆల్
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL ఇంజెక్షన్ గుర్తింపు అమలు
        pass
        
    def _log_error(self, message, error):
        # లోపాల లాగ్ చేయడం అమలు
        pass
```

#### 3. పరామితి ధృవీకరణ

తప్పుడు లేదా దుష్టమైన ఇన్పుట్ నివారణ కోసం ఎల్లప్పుడూ సరైన పరామితుల ధృవీకరణ చేయండి.

```javascript
// వివరమైన పారామితి ధృవీకరణతో JavaScript/TypeScript ఉదాహరణ
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
    // 1. పారామితి ఉనికిని ధృవీకరించండి
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. పారామితి రకాలను ధృవీకరించండి
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. పారామితి విలువలను ధృవీకరించండి
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. రాయడానికి కంటెంట్ ఉనికిని ధృవీకరించండి
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. మార్గం భద్రత ధృవీకరణ
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // ధృవీకరించిన పారామితుల ఆధారంగా అమలు
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // మార్గ భద్రత తనిఖీ అమలు
    // ...
  }
}
```

### భద్రత అమలు ఉదాహరణలు

#### 1. ప్రామాణీకరణ మరియు అనుమతి

```java
// ధృవీకరణ మరియు అధికార ప్రాధికారంతో జావా ఉదాహరణ
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // డిపెండెన్సీ ఇంజెక్షన్
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
        // 1. ధృవీకరణ సందర్భాన్ని వెలికితీసుకోండి
        String authToken = request.getContext().getAuthToken();
        
        // 2. వినియోగదారుని ధృవీకరించండి
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. నిర్దిష్ట చర్యకు అధికారాన్ని తనిఖీ చేయండి
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. అనుమతిచ్చిన చర్యతో కొనసాగండి
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

#### 2. రేట్ పరిమితి

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

## పరీక్షా ఉత్తమ అభ్యాసాలు

### 1. MCP టూల్లు యూనిట్ పరీక్షలు

మీ టూల్స్‌ను ఏకాంతంగా పరీక్షించండి, బాహ్య ఆధారాలను మాక్ చేసి:

```typescript
// టైప్‌స్క్రిప్ట్ టూల్ యూనిట్ టెస్ట్ ఉదాహరణ
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ఒక మాక్ వాతావరణ సేవను సృష్టించండి
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // మాక్ డిపెండెన్సీతో టూల్‌ను సృష్టించండి
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // ఏర్పాటుచేయండి
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // చర్య తీసుకోండి
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // నిర్ధారించండి
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // ఏర్పాటుచేయండి
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // చర్య & నిర్ధారించండి
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. ఇంటిగ్రేషన్ పరీక్ష

క్లయింట్ అభ్యర్థనల నుండి సర్వర్ స్పందన వరకు పూర్తి ప్రవాహాన్ని పరీక్షించండి:

```python
# పైథాన్ ఇంటిగ్రేషన్ పరీక్ష ఉదాహరణ
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # పరీక్ష సర్వర్ ప్రారంభించండి
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # క్లయింట్ సృష్టించండి
        client = McpClient("http://localhost:5000")
        
        # టూల్ కనుగొనడం పరీక్షించండి
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # టూల్ అమలు పరీక్షించండి
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # ప్రతిస్పందనను నిర్ధారించండి
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # శుభ్రపరచండి
        await server.stop()
```

## పనితీరు ఆప్టిమైజేషన్

### 1. క్యాచింగ్ వ్యూహాలు

విలంబాన్ని తగ్గించడానికి మరియు వనరు వినియోగాన్ని తక్కువ చేయడానికి తగిన క్యాచింగ్ అమలు చేయండి:

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

#### 2. డిపెండెన్సీ ఇంజెక్షన్ మరియు పరీక్షాపరత

టూల్స్‌ను వారి ఆధారాలను కన్‌స్ట్రక్టర్ ఇంజెక్షన్ ద్వారా అందుకోవడంతో రూపకల్పన చేయండి, తద్వారా అవి పరీక్షించగలిగే మరియు కాన్ఫిగర్ చేయదగినవి అవుతాయి:

```java
// డిపెండెన్సీ ఇంజెక్షన్‌తో జావా ఉదాహరణ
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // డిపెండెన్సీలు కన్స్ట్రక్టర్ ద్వారా ఇంజెక్ట్ చేయబడతాయి
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // టూల్ అమలు
    // ...
}
```

#### 3. కాంపోజబుల్ టూల్స్

మరింత సంక్లిష్ట వర్క్‌ఫ్లోలను సృష్టించడానికి పలు టూల్స్ ను కలిపి డిజైన్ చేయండి:

```python
# కలగజేసుకునే సాధనాలను చూపించే పైథాన్ ఉదాహరణ
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # అమలు...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # ఈ సాధనం dataFetch సాధనంలోని ఫలితాలను ఉపయోగించవచ్చు
    async def execute_async(self, request):
        # అమలు...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # ఈ సాధనం dataAnalysis సాధనంలోని ఫలితాలను ఉపయోగించవచ్చు
    async def execute_async(self, request):
        # అమలు...
        pass

# ఈ సాధనాలను స్వతంత్రంగా లేదా వర్క్‌ఫ్లో భాగంగా ఉపయోగించవచ్చు
```

### స్కీమా డిజైన్ ఉత్తమ అభ్యాసాలు

స్కీమా మోడల్ మరియు మీ టూల్ మధ్య ఒప్పందం. బాగా రూపకల్పించబడిన స్కీమాలు మెరుగైన టూల్ వినియోగదారుల అనుభవానికి దారితీయుతాయి.

#### 1. స్పష్టమైన పరామితి వివరణలు

ప్రతి పరామితి కొరకు వివరణాత్మక సమాచారాన్ని ఎప్పుడూ చేర్చండి:

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

#### 2. ధృవీకరణ పరిమితులు

చెల్లని ఇన్పుట్‌లను నివారించడానికి ధృవీకరణ పరిమితులు పొందుపరచండి:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ఫార్మాట్ ధృవీకరణతో ఇమెయిల్ ప్రాపర్టీ
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // సంఖ్యా పరిమితులతో వయస్సు ప్రాపర్టీ
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // ఎన్యూమరేటెడ్ ప్రాపర్టీ
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

#### 3. సుస్పృష్త రిటర్న్ స్ట్రక్చర్లు

మోడల్స్ ఫలితాలను సులభంగా అర్థం చేసుకోవడానికి మీ ప్రతిస్పందన నిర్మాణాలలో స్థిరత్వాన్ని కలిగి ఉండండి:

```python
async def execute_async(self, request):
    try:
        # అభ్యర్థనను ప్రాసెస్ చేయండి
        results = await self._search_database(request.parameters["query"])
        
        # ఎల్లప్పుడూ ఒక సాదృశ్యమైన నిర్మాణాన్ని తిరిగి ఇవ్వండి
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

### లోప నిర్వహణ

పటిష్ట లోప నిర్వహణ MCP టూల్స్ విశ్వసనీయతకు అత్యవసరం.

#### 1. సాఫీ లోప నిర్వహణ

సరైన స్థాయిల్లో లోపాలను నిర్వహించి, సమాచారపూర్వక సందేశాలను అందించండి:

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

#### 2. నిర్మాణాత్మక లోప ప్రతిస్పందనలు

సంభవిస్తే నిర్మాణాత్మక లోప సమాచారాన్ని రిటర్న్ చేయండి:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // అమలయు
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
        
        // ఇతర తప్పిదాలను ToolExecutionException గా మళ్లీ వేయండి
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. రీట్రై లాజిక్

తాత్కాలిక వైఫల్యాలకు సరైన రీట్రై లాజిక్ ను అమలు చేయండి:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # సెకన్లు
    
    while retry_count < max_retries:
        try:
            # బాహ్య API ను పిలవండి
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # ఘాతాంక్ తిరుగు వ్యవస్థ
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # తాత్కాలిక కాని పొరపాటు, మళ్లీ ప్రయత్నించకండి
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### పనితీరు ఆప్టిమైజేషన్

#### 1. క్యాచింగ్

ఖర్చైన ఆపరేషన్ల కొరకు క్యాచింగ్ అమలు చేయండి:

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

#### 2. అసింక్రోనస్ ప్రాసెసింగ్

I/O ఆధారిత ఆపరేషన్ల కొరకు అసింక్రోనస్ ప్రోగ్రామింగ్ నమూనాలను వినియోగించండి:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // దీర్ఘకాలం నడిచించే ఆపరేషన్‌ల కోసం, ప్రోసెస్ ఐడిని తక్షణం తిరిగి ఇవ్వండి
        String processId = UUID.randomUUID().toString();
        
        // అసింక్రోనస్ ప్రోసెసింగ్ ప్రారంభించండి
        CompletableFuture.runAsync(() -> {
            try {
                // దీర్ఘకాలం నడిచే ఆపరేషన్ చేయండి
                documentService.processDocument(documentId);
                
                // స్థితిని నవీకరించండి (సాధారణంగా ఇది డేటాబేస్‌లో నిల్వ ఉంటుందా)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // ప్రోసెస్ ID‌తో తక్షణ స్పందనను తిరిగి ఇవ్వండి
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // సహచర స్థితి తనిఖీ సాధనం
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

#### 3. వనరు త్రోట్‌లింగ్

ఓవర్‌లోడ్ నివారించడానికి వనరు త్రోట్‌లింగ్ అమలు చేయండి:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # ప్రతిసెకను 5 అభ్యర్థనలను అనుమతించండి
            bucket_size=10        # 10 అభ్యర్థనల వరకు సంచలనాలను అనుమతించండి
        )
    
    async def execute_async(self, request):
        # ముందుకు సాగవచ్చా లేదా వేచుయ్యాలసిన అంశమో చూడండి
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # వేచుయ్యడం చాలా దీర్ఘమైతే
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # సరైన ఆలస్యం సమయానికి వేచుయ్యండి
                await asyncio.sleep(delay)
        
        # ఒక టోకన్‌ను ఉపయోగించి అభ్యర్థనను కొనసాగించండి
        self.rate_limiter.consume()
        
        # API ను పిలవండి
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
            
            # తదుపరి టోకన్ అందుబాటులోకి రాబోయే వరకు సమయాన్ని లెక్కించండి
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # గడిచిన సమయానికి ఆధారంగా కొత్త టోకన్లను జోడించండి
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### భద్రత ఉత్తమ అభ్యాసాలు

#### 1. ఇన్పుట్ ధృవీకరణ

ఇన్పుట్ పరామితులను ఎల్లప్పుడూ సుతారుగా ధృవీకరించండి:

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

#### 2. అనుమతి తనిఖీలు

సరైన అనుమతి తనిఖీలను అమలు చేయండి:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // అభ్యర్థన నుండి వినియోగదారు సందర్భం పొందండి
    UserContext user = request.getContext().getUserContext();
    
    // వినియోగదారుకు కావలసిన అనుమతులు ఉన్నాయా అని తనిఖీ చేయండి
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // నిర్దిష్ట వనరుల కోసం, ఆ వనరుపై 접근ాన్ని తనిఖీ చేయండి
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // టూల్ నిర్వహణతో ముందుకు సాగండి
    // ...
}
```

#### 3. సున్నితమైన డేటా నిర్వహణ

సున్నితమైన డేటాను జాగ్రత్తగా నిర్వహించండి:

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
        
        # వినియోగదారు డేటా పొందండి
        user_data = await self.user_service.get_user_data(user_id)
        
        # స్పష్టంగా అభ్యర్థించబడినప్పటి మరియు అనుమతించబడినప్పటి వరకు భావుక సమాచారాన్ని వడగట్టి తీసేయండి
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # అభ్యర్థన సందర్భంలో అనుమతి స్థాయిని తనిఖీ చేయండి
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # అసలు మార్చకుండా ఉండేందుకు ప్రతిలిపి సృష్టించండి
        redacted = user_data.copy()
        
        # నిర్దిష్ట భావుక సమాచారాన్ని తొలగించండి
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # లోపలని భావుక సమాచారాన్ని తొలగించండి
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP టూల్ల కొరకు పరీక్షా ఉత్తమ అభ్యాసాలు

సమగ్ర పరీక్ష MCP టూల్స్ సక్రమంగా పనిచేసేలా, ఎడ్జ్ కేసులను నిర్వహించేలా మరియు వ్యవస్థతో బాగా ఇంటిగ్రేట్ అయ్యేలా నిర్ధారిస్తుంది.

### యూనిట్ పరీక్షలు

#### 1. ప్రతి టూల్ ని ఏకాంతంగా పరీక్షించండి

ప్రతి టూల్ యొక్క ఫంక్షనాలిటీ కొరకు కేంద్రీకృత పరీక్షలను సృష్టించండి:

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

#### 2. స్కీమా ధృవీకరణ పరీక్ష

స్కీమాలు చెల్లని విధంగా ఉండకూడదని మరియు పరిమితులను సరైన రీతిలో అమలు చేస్తాయో పరీక్షించండి:

```java
@Test
public void testSchemaValidation() {
    // టూల్ ఉదాహరణను సృష్టించండి
    SearchTool searchTool = new SearchTool();
    
    // స్కీమాను పొందండి
    Object schema = searchTool.getSchema();
    
    // నిర్ధారణ కోసం స్కీమాను JSON గా మార్చండి
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // స్కీమా సరైన JSONSchema కాదో లేదో నిర్ధారించండి
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // సరైన పారామితులను పరీక్షించండి
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // తప్పిపోయిన అవసరమైన పారామితిని పరీక్షించండి
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // తప్పు పారామితి రకాన్ని పరీక్షించండి
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. లోప నిర్వహణ పరీక్షలు

లోపాల పరిస్థితుల కొరకు ప్రత్యేక పరీక్షలను సృష్టించండి:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # అమర్చుకోండి
    tool = ApiTool(timeout=0.1)  # చాలా తక్కువ టైమ్ అవుట్
    
    # టైమ్ అవుట్ అయ్యే అభ్యర్థనని మాక్ చేయండి
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # టైమ్ అవుట్ కంటే ఎక్కువ
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # చర్య & నిర్ధారించండి
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # తప్పిద సందేశాన్ని తనిఖీ చేయండి
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # అమర్చుకోండి
    tool = ApiTool()
    
    # రేట్-లిమిటెడ్ స్పందనను మాక్ చేయండి
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
        
        # చర్య & నిర్ధారించండి
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # తప్పిదంలో రేట్ లిమిట్ సమాచారం ఉందని తనిఖీ చేయండి
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### ఇంటిగ్రేషన్ పరీక్ష

#### 1. టూల్ చైన్ పరీక్ష

ప్రత్యర్థీ పరిస్థితుల్లో టూల్స్ కలిసి పనిచేసేలా పరీక్షించండి:

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

#### 2. MCP సర్వర్ పరీక్ష

పూర్తి టూల్ రిజిస్ట్రేషన్ మరియు నడపబడిన MCP సర్వర్ ను పరీక్షించండి:

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
        // డిస్కవరీ ఎండ్పాయింట్‌ను పరీక్షించండి
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // టూల్ అభ్యర్థన సృష్టించండి
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // అభ్యర్థన పంపించి ప్రతిస్పందనను నిర్ధారించండి
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // చెల్లని టూల్ అభ్యర్థనను సృష్టించండి
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" అనే పరామితి లేదు
        request.put("parameters", parameters);
        
        // అభ్యర్థన పంపించి లోపం ప్రతిస్పందనను నిర్ధారించండి
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. ఎండ్-టు-ఎండ్ పరీక్ష

మోడల్ ప్రాంప్ట్ నుండి టూల్ నడపుట వరకు పూర్తి వర్క్‌ఫ్లోలను పరీక్షించండి:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # అమర్చండి - MCP క్లయింట్ మరియు మాక్ మోడల్ సెట్ చేయండి
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # మాక్ మోడల్ ప్రతిస్పందనలు
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
    
    # మాక్ వాతావరణ టూల్ ప్రతిస్పందన
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
        
        # చర్య తీసుకోండి
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # నిర్ధారించండి
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### పనితీరు పరీక్షలు

#### 1. లోడ్ టెస్టింగ్

మీ MCP సర్వర్ ఎంత concurrent అభ్యర్థనలను నిర్వహించగలదో పరీక్షించండి:

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

#### 2. స్ట్రెస్ టెస్టింగ్

అత్యంత లోడ్ కింద వ్యవస్థను పరీక్షించండి:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // స్రెస్సు పరీక్ష కోసం JMeter ను సెట్ చేయండి
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter పరీక్ష ప్లాన్ ను కాన్ఫిగర్ చేయండి
    HashTree testPlanTree = new HashTree();
    
    // పరీక్ష ప్లాన్, థ్రెడ్ గ్రూప్, శ్యాంప్లర్స్ మొదలైనవి సృష్టించండి
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // టూల్ అమలు కోసం HTTP శ్యాంప్లర్ ను జోడించండి
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // లిసనర్స్ ను జోడించండి
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // పరీక్షను నడపండి
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // ఫలితాలను ధృవీకరించండి
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // సగటు స్పందనా సమయం < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90 వ శాతం < 500ms
}
```

#### 3. మానిటరింగ్ మరియు ప్రొఫైలింగ్

దీర్ఘకాలిక పనితీరు విశ్లేషణ కొరకు మానిటరింగ్ సెట్ చేయండి:

```python
# MCP సర్వర్ కోసం పర్యవేక్షణ సెట్ చేయండి
def configure_monitoring(server):
    # Prometheus మెట్రిక్స్‌ను సెట్ చేయండి
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
    
    # టైమింగ్ మరియు రికార్డింగ్ మెట్రిక్స్ కోసం మిడిల్వేర్‌ను జోడించండి
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # మెట్రిక్స్ ఎండ్పాయింట్‌ను ప్రదర్శించండి
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP వర్క్‌ఫ్లో డిజైన్ నమూనాలు

బాగా రూపకల్పన చేసిన MCP వర్క్‌ఫ్లోలు సామర్థ్యం, విశ్వసనీయత, మరియు నిర్వహణ సౌకర్యాన్ని మెరుగుపరుస్తాయి. అనుసరించవలసిన ప్రధాన నమూనాలు:

### 1. టూల్ శ్రేణి నమూనా

చిరునామా వరుసలో అనేక టూల్స్ కనెక్ట్ చేయండి, ప్రతి టూల్ అవుట్‌పుట్ తదుపరి టూల్ ఇన్పుట్ అవుతుంది:

```python
# పైథాన్ చైన్ ఆఫ్ టూల్స్ అమలు
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # వరుసగా అమలు చేయడానికి టూల్ పేర్ల జాబితా
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # చైల్లో ప్రతి టూల్ ను అమలు చేయండి, ముందటి ఫలితాన్ని పాసు చేయండి
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # ఫలితాన్ని నిల్వ చేసి తదుపరి టూల్ కోసం ఇన్‌పుట్‌లాగా ఉపయోగించండి
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# ఉదాహరణ ఉపయోగం
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

### 2. డిస్పాచర్ నమూనా

ఇన్‌పుట్ ఆధారంగా ప్రత్యేక టూల్స్‌కు పంపిణీ చేసే సెంట్రల్ టూల్ ఉపయోగించండి:

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

### 3. సమాంతర ప్రాసెసింగ్ నమూనా

సామర్థ్యం కోసం అనేక టూల్స్‌ను ఒకేసారి నడపండి:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // దశ 1: డేటాసెట్ మెటాడేటాను పొందండి (సమకాలీనంగా)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // దశ 2: బహుళ విశ్లేషణలను సమాంతరంగా ప్రారంభించండి
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
        
        // అన్ని సమాంతర పనులు పూర్తి కాని వరకు వేచి ఉండండి
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // ముగింపు కోసం వేచి ఉండండి
        
        // దశ 3: ఫలితాలను కలపండి
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // దశ 4: సారాంశ నివేదికను సృష్టించండి
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // పూర్తి వర్క్‌ఫ్లో ఫలితాన్ని తిరిగి ఇవ్వండి
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. లోప పునరుద్ధరణ నమూనా

టూల్ వైఫల్యాల కోసం సాఫీగాFallbacks అమలు చేయండి:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # మొదటి టూల్‌ని ప్రయత్నించండి
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # విఫలతను లాగ్ చేయండి
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # ద్వితీయ టూల్‌కి మళ్లించండి
            try:
                # ఫాల్‌జాక్ టూల్ కోసం పారామితులను మార్చడం అవసరం కావచ్చు
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # రెండు టూల్స్ విఫలమయ్యాయి
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # ఈ అమలు నిర్దిష్ట టూల్స్‌పై ఆధారపడి ఉంటుంది
        # ఈ ఉదాహరణలో, మేము కేవలం మూల పారామితులను తిరిగి ఇస్తాము
        return params

# ఉదాహరణ వాడకం
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # ప్రాథమిక (చెల్లింపు) వాతావరణ API
        "basicWeatherService",    # ఫాల్‌జాక్ (ఉచితం) వాతావరణ API
        {"location": location}
    )
```

### 5. వర్క్‌ఫ్లో కాంపోజిషన్ నమూనా

సరళమైన వాటిని కలిపి సంక్లిష్ట వర్క్‌ఫ్లోలను రూపొందించండి:

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

# MCP సర్వర్‌ల పరీక్ష: ఉత్తమ అభ్యాసాలు మరియు తక్కువ సూచనలు

## అవలోకనం

పరీక్షలు విశ్వసనీయమైన, ఉన్నత-నాణ్యత MCP సర్వర్ల అభివృద్ధిలో కీలక భాగం. ఈ గైడ్ MCP సర్వర్లను అభివృద్ధి జీవనచక్రంలో యూనిట్ పరీక్షలు నుండి ఇంటిగ్రేషన్ పరీక్షలు మరియు ఎండ్-టు-ఎండ్ ధృవీకరణ వరకు విస్తృత ఉత్తమ అభ్యాసాలు మరియు సలహాలను అందిస్తుంది.

## MCP సర్వర్ల కొరకు పరీక్ష ఎందుకు ముఖ్యం

MCP సర్వర్లు AI మోడల్స్ మరియు క్లయింట్ అనువర్తనాల మధ్య కీలక మిడిల్వేర్ గా పనిచేస్తాయి. పూర్వ పరిశీలన నిర్ధారిస్తుంది:

- ఉత్పత్తి వాతావరణాలలో విశ్వసనీయత
- అభ్యర్థనల మరియు ప్రతిస్పందనల ఖచ్చితమైన నిర్వహణ
- MCP స్పెసిఫికేషన్ల సరైన అమలు
- వైఫల్యాలు మరియు ఎడ్జ్ కేసుల నుండి సంఘటన
- వైవిధ్యమైన లోడ్ల క్రింద స్థిరమైన పనితీరు

## MCP సర్వర్ల కొరకు యూనిట్ పరీక్షలు

### యూనిట్ పరీక్షలు (మూలాధారం)

యూనిట్ పరీక్షలు మీ MCP సర్వర్ యొక్క వ్యక్తిగత భాగాలను ఏకాంతంగా ధృవీకరిస్తాయి.

#### ఏమి పరీక్షించాలి

1. **వనరు హ్యాండ్లర్లు**: ప్రతి వనరు హ్యాండ్లర్ యొక్క లాజిక్‌ను స్వతంత్రంగా పరీక్షించండి
2. **టూల్ అమలు**: వివిధ ఇన్పుట్‌లతో టూల్ ప్రవర్తనను ధృవీకరించండి
3. **ప్రాంప్ట్ టెంప్లేట్లు**: ప్రాంప్ట్ టెంప్లేట్లు సరిగా రేండర్ అవుతాయో నిర్ధారించండి
4. **స్కీమా ధృవీకరణ**: పరామితి ధృవీకరణ లాజిక్ ని పరీక్షించండి
5. **లోప నిర్వహణ**: చెల్లని ఇన్పుట్‌లకు లోప ప్రతిస్పందనలను ధృవీకరించండి

#### యూనిట్ పరీక్షల ఉత్తమ అభ్యాసాలు

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
# పైథాన్‌లో ఒక క్యాల్క్యులేటర్ టూల్ కోసం ఉదాహరణ యూనిట్ టెస్ట్
def test_calculator_tool_add():
    # ఏర్పాటుచేయండి
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # చర్య తీసుకోండి
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # నిర్ధారించండి
    assert result["value"] == 12
```

### ఇంటిగ్రేషన్ పరీక్ష (మధ్యస్థర)

ఇంటిగ్రేషన్ పరీక్షలు MCP సర్వర్ భాగాల పరస్పర చర్యలను ధృవీకరిస్తాయి.

#### ఏమి పరీక్షించాలి

1. **సర్వర్ ప్రారంభం**: వివిధ కాన్ఫిగరేషన్లతో సర్వర్ స్టార్టప్ ను పరీక్షించండి
2. **రూట్ రిజిస్ట్రేషన్**: అన్ని ఎండ్పాయింట్లు సక్రమంగా నమోదు చేయబడ్డాయో ధృవీకరించండి
3. **అభ్యర్థన ప్రాసెసింగ్**: పూర్తి అభ్యర్థన-ప్రతిస్పందన చక్రం పరీక్షించండి
4. **లోప వ్యాప్తి**: భాగాల మధ్య లోపాలు సక్రమంగా నిర్వర్తించబడ్డాయో నిర్ధారించండి
5. **ప్రామాణీకరణ & అనుమతి**: భద్రతా యంత్రాంగాలను పరీక్షించండి

#### ఇంటిగ్రేషన్ పరీక్షల ఉత్తమ అభ్యాసాలు

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

### ఎండ్-టు-ఎండ్ పరీక్షలు (ఉన్నత స్థాయి)

ఎండ్-టు-ఎండ్ పరీక్షలు క్లయింట్ మరియు సర్వర్ మధ్య పూర్తి వ్యవస్థ ప్రవర్తనను ధృవీకరిస్తాయి.

#### ఏమి పరీక్షించాలి

1. **క్లయింట్-సర్వర్ కమ్యూనికేషన్**: పూర్తి అభ్యర్థన-ప్రతిస్పందన చక్రాలను పరీక్షించండి
2. **వాస్తవ క్లయింట్ SDKలు**: వాస్తవ క్లయింట్ అమలులతో పరీక్షించండి
3. **లోడ్ క్రింద పనితీరు**: బహుళ సమాంతర అభ్యర్థనలతో ప్రవర్తన ధృవీకరించండి
4. **లోప పునరుద్ధరణ**: వైఫల్యాల నుండి వ్యవస్థ పునరుద్ధరణను పరీక్షించండి
5. **దీర్ఘకాలిక ఆపరేషన్లు**: స్ట్రీమింగ్ మరియు దీర్ఘకాలిక ఆపరేషన్ల నిర్వహణను ధృవీకరించండి

#### E2E పరీక్షల ఉత్తమ అభ్యాసాలు

```typescript
// TypeScriptలో క్లయింట్‌తో ఉదాహరణ E2E పరీక్ష
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // పరీక్ష పర్యావరణంలో సర్వర్ ప్రారంభించండి
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // చర్య తీసుకోండి
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // నిర్ధారించండి
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP పరీక్ష కోసం మాకింగ్ వ్యూహాలు

పరీక్ష సమయంలో భాగాలను విడగొట్టడానికి మాకింగ్ అవసరం.

### మాక్ చేయవలసిన భాగాలు

1. **బాహ్య AI మోడల్స్**: ఊహించదగిన పరీక్ష కోసం మోడల్ ప్రతిస్పందనలను మాక్ చేయండి
2. **బాహ్య సేవలు**: API ఆధారాలను (డేటాబేసులు, ఉత్పత్తి-తృతీయ సేవలు) మాక్ చేయండి
3. **ప్రామాణీకరణ సేవలు**: గుర్తింపు ప్రదాతలను మాక్ చేయండి
4. **వనరు ప్రొవైడర్స్**: ఖచ్చితమైన వనరు హ్యాండ్లర్లను మాక్ చేయండి

### ఉదాహరణ: AI మోడల్ ప్రతిస్పందన మాకింగ్

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
# Python ఉదాహరణ unittest.mock తో
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # మాక్ ను కాన్ఫిగర్ చేయండి
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # పరీక్షలో మాక్ ఉపయోగించండి
    server = McpServer(model_client=mock_model)
    # పరీక్షతో కొనసాగించండి
```

## పనితీరు పరీక్ష

ఉత్పత్తి MCP సర్వర్ల కొరకు పనితీరు పరీక్ష అమిత ముఖ్యం.

### ఏమి కొలవాలి

1. **విలంబం**: అభ్యర్థనలకు స్పందన సమయం
2. ** throughput**: ప్ర‌తి సెకను నిర్వహించే అభ్యర్థ‌న‌ల సంఖ్య
3. **వనరు వినియోగం**: CPU, మెమోరీ, నెట్‌వర్క్ వినియోగం
4. **సమాంతర నిర్వహణ**: సమాంతర అభ్యర్థనల క్రింద ప్రవర్తన
5. **విస్తరణ లక్షణాలు**: లోడ్ పెరిగే కొద్దీ పనితీరు

### పనితీరు పరీక్ష కొరకు సాధనాలు

- **k6**: ఓపెన్-సోర్స్ లోడ్ పరీక్ష సాధనం
- **జెమీటర్**: సమగ్ర పనితీరు పరీక్ష
- **లోకస్ట్**: పైథాన్ ఆధారిత లోడ్ పరీక్ష
- **Azure లోడ్ టెస్టింగ్**: క్లౌడ్ ఆధారిత పనితీరు పరీక్ష

### ఉదాహరణ: k6 తో ప్రాథమిక లోడ్ టెస్ట్

```javascript
// MCP సర్వర్ లోడ్ టెస్టింగ్ కోసం k6 స్క్రిప్ట్
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 వర్చువల్ యూజర్స్
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

## MCP సర్వర్ల కొరకు పరీక్షా ఆటోమేషన్

మీ పరీక్షలను ఆటోమేట్ చేయడం సత్వర ఫీడ్బ్యాక్ లూపులు మరియు స్థిరమైన నాణ్యతను నిర్ధారిస్తుంది.

###_ci/cd_ సమాఖ్య
1. **పుల్ రిక్వెస్టుల‌పై యూనిట్ టెస్టులు నడపడం**: కోడ్ మార్పులు ప్రస్తుతం ఉన్న ఫంక్షనాలిటీని భగ్నం చేయకుండా చూడండి  
2. **స్టేజింగ్‌లో ఇంటిగ్రేషన్ టెస్టులు**: ప్రి-ప్రొడక్షన్ వాతావరణాలలో ఇంటిగ్రేషన్ టెస్టులు నడపండి  
3. **పర్ఫార్మెన్స్ బేస్లైన్లు**: తిరిగి రావడాన్ని పట్టించుకునేందుకు పనితీరు ప్రమాణాలు నిర్వహించండి  
4. **సెక్యూరిటీ స్కాన్లు**: పైప్లైన్‌లో భాగంగా సెక్యూరిటీ టెస్టింగ్‌ను ఆటోమేట్ చేయండి  

### ఉదాహరణ CI పైప్లైన్ (GitHub Actions)

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
  
## MCP స్పెసిఫికేషన్ అనుగుణంగా టెస్టింగ్

మీ సర్వర్ సరిగా MCP స్పెసిఫికేషన్‌ను అమలు చేస్తున్నదని నిర్ధారించండి.  

### ముఖ్య అనుగుణత ప్రాంతాలు

1. **API ఎండ్‌పాయింట్లు**: అవసరమైన ఎండ్‌పాయింట్లను (/resources, /tools, మొదలైనవి) టెస్ట్ చేయండి  
2. **రిక్వెస్ట్/ఠికాణా ఫార్మాట్**: స్కీమా అనుగుణతను ధృవీకరించండి  
3. **లోప కోడ్స్**: వివిధ సందర్భాల కోసం సరైన స్థితి కోడ్లను పరిశీలించండి  
4. **కంటెంట్ రకాలు**: వివిధ కంటెంట్ రకాల నిర్వహణను టెస్ట్ చేయండి  
5. **ప్రామాణీకరణ ఫ్లో**: స్పెసిఫికేషన్ అనుగుణమే అయిన auth విధానాలను ధృవీకరించండి  

### అనుగుణత టెస్ట్ సూట్

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
  
## ప్రభావవంతమైన MCP సర్వర్ టెస్టింగ్ కోసం టాప్ 10 చిట్కాలు

1. **టూల్ నిర్వచనాలను వైద్యంగా టెస్ట్ చేయండి**: టూల్ లాజిక్ నుండి ప్రామాణిక నిర్వచనాలను స్వతంత్రంగా ధృవీకరించండి  
2. **పారామెటర్‌తో కూడిన టెస్టులను ఉపయోగించండి**: వివిధ ఇన్పుట్లు, ఎడ్జ్ కేసులు సహా టూల్స్‌ను టెస్ట్ చేయండి  
3. **లోప ప్రతిస్పందనలను తనిఖీ చేయండి**: అన్ని దోష పరిస్థితులకూ సరైన లోప నిర్వహణను ధృవీకరించండి  
4. **అధికార లాజిక్‌ను టెస్ట్ చేయండి**: వివిధ యూజర్ పాత్రలకు సరైన యాక్సెస్ నియంత్రణను నిర్ధారించండి  
5. **టెస్ట్ కవరేజ్‌ను పర్యవేక్షించండి**: కీలక మార్గం కోడ్ కవచం ఎక్కువగా ఉండేలా చూడండి  
6. **స్ట్రీమింగ్ ప్రతిస్పందనలను టెస్ట్ చేయండి**: స్ట్రీమింగ్ కంటెంట్ సరిగ్గా నిర్వహించబడుతున్నదని ధృవీకరించండి  
7. **నెట్‌వర్క్ సమస్యలను అనుకరించండి**: చెడు నెట్‌వర్క్ పరిస్థితుల కింద ప్రవర్తనను పరీక్షించండి  
8. **రిసోర్స్ లిమిట్లను టెస్ట్ చేయండి**: క్వోటాలు లేదా రేట్ లిమిట్లను చేరుకున్నప్పుడు ప్రవర్తనను తనిఖీ చేయండి  
9. **రిజ్రెషన్ టెస్టులను ఆటోమేట్ చేయండి**: ప్రతి కోడ్ మార్పుపై నడిచే సూట్‌ని నిర్మించండి  
10. **టెస్ట్ కేసులను డాక్యుమెంట్ చేయండి**: టెస్ట్ సందర్భాల స్పష్టమైన డాక్యుమెంటేషన్‌ను నిర్వహించండి  

## సాధారణ టెస్టింగ్ పొరపాట్లు

- **హ్యాపీ పాత్ టెస్టింగ్‌పై అధిక ఆధారపడటం**: లోప కేసులను పూర్తిగా పరీక్షించండి  
- **పర్ఫార్మెన్స్ టెస్టింగ్‌ను ఉన్ముఖ్యం చేయడం**: ప్రొడక్షన్‌కు తగులుతున్న ముందు బాటిల్ నెక్స్ గుర్తించండి  
- **ఏకైకంగా మాత్రమే టెస్టింగ్ చేసుకోవడం**: యూనిట్, ఇంటిగ్రేషన్, మరియు E2E టెస్టులను కలుపుకోండి  
- **అపూర్ణ API కవరేజ్**: అన్ని ఎండ్‌పాయింట్లు మరియు ఫీచర్‌లు పరీక్షించబడ్డాయని చూసుకోండి  
- **సంక్లిష్టమైన టెస్ట్ వాతావరణాలు**: సాంకేతిక వాతావరణాలు స్థిరంగా ఉండాలంటే కంటైనర్లను ఉపయోగించండి  

## ముగింపు

అంతటా విస్తృతమైన టెస్టింగ్ వ్యూహం విశ్వసనీయమైన, ఉన్నత-నాణ్యత MCP సర్వర్లను అభివృద్ధి చేయడానికి ముఖ్యమైనది. ఈ మార్గదర్శకంలోని ఉత్తమ ఆచారాలు, చిట్కాలను అమలు చేయడం ద్వారా, మీరు మీ MCP అమలు నాణ్యత, విశ్వసనీయత మరియు పనితీరు పరంగా అత్యున్నత ప్రమాణాలతో ఉండేలా చూడవచ్చు.  

## ముఖ్యమైన సంగ్రహాలు

1. **టూల్ డిజైన్**: ఒక్కో బాధ్యత సూత్రాన్ని అనుసరించండి, డిపెండెన్సీ ఇంజెక్షన్ ఉపయోగించండి, మరియు సమ్మిళితంగా డిజైన్ చేయండి  
2. **స్కీమా డిజైన్**: స్పష్టమైన, బాగా డాక్యుమెంట్ చేసిన స్కీమాలను సరైన చెలామణీ పరిమితులతో సృష్టించండి  
3. **లోప నిర్వహణ**: శ్రేయస్కరమైన లోప నిర్వహణ, నిర్మిత లోప ప్రతిస్పందనలతో పాటు రీట్రై లాజిక్ అమలు చేయండి  
4. **పర్ఫార్మెన్స్**: క్యాచింగ్, అసింక్రోనస్ ప్రక్రియ, మరియు వనరుల నియంత్రణ ఉపయోగించండి  
5. **సెక్యూరిటీ**: సుదీర్ఘ ఇన్పుట్ ధృవీకరణ, అధికార తనిఖీలు, మరియు సంభేదనీయ డేటా నిర్వహణను వర్తింపజేయండి  
6. **టెస్టింగ్**: పూర్తిగా యూనిట్, ఇంటిగ్రేషన్, మరియు ఎండ్-టు-ఎండ్ టెస్టులను సృష్టించండి  
7. **వర్క్‌ఫ్లో నమూనాలు**: చైన్స్, డిస్పాచర్లు, మరియు సమాంతర ప్రక్రియ వంటి స్థిరమైన నమూనాలను వర్తింపజేయండి  

## వ్యాయామం

ఒక డాక్యుమెంట్ ప్రాసెసింగ్ సిస్టమ్ కోసం MCP టూల్ మరియు వర్క్‌ఫ్లో డిజైన్ చేయండి, ఇది:

1. పలు ఫార్మాట్లలో (PDF, DOCX, TXT) డాక్యుమెంట్లను స్వీకరించాలి  
2. డాక్యుమెంట్ల నుండి టెక్స్ట్ మరియు ముఖ్య సమాచారాన్ని తీసుకోవాలి  
3. డాక్యుమెంట్లను రకం మరియు కంటెంట్ ద్వారా వర్గీకరించాలి  
4. ప్రతి డాక్యుమెంటుకు ఒక సారాంశం సృష్టించాలి  

ఈ సన్నివేశానికి అనుగుణంగా టూల్ స్కీమాలు, లోప నిర్వహణ, మరియు వర్క్‌ఫ్లో నమూనాను అమలు చేయండి. ఈ అమలును మీరు ఎలా పరీక్షిస్తారో పరిగణనలోకి తీసుకోండి.  

## వనరులు

1. తాజా అభివృద్ధులపై అప్డేట్ పొందటానికి [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs)లో MCP కమ్యూనిటీలో చేరండి  
2. ఓపెన్-సోర్స్ [MCP ప్రాజెక్టుల](https://github.com/modelcontextprotocol)కు సహకరించండి  
3. మీ సంస్థ యొక్క AI కార్యక్రమాలలో MCP సూత్రాలను వర్తింపజేయండి  
4. మీ పరిశ్రమ కోసం ప్రత్యేక MCP అమలులను అన్వేషించండి  
5. బహురూప సమ్మేళనం లేదా సంస్థాపన అనువర్తన సమ్మేళనం వంటి ప్రత్యేక MCP విషయాలపై ప్రगत కోర్సులు తీసుకోవాలని ఆలోచించండి  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) ద్వారా నేర్చుకున్న సూత్రాలతో మీ స్వంత MCP టూల్స్ మరియు వర్క్‌ఫ్లోలను రూపొందించడానికి ప్రయోగాలు చెయ్యండి  

## తదనంతరం

తరువాత: [కేస్ స్టడీస్](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్పష్టత**:
ఈ పత్రాన్ని AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించారు. మేము సరైన అనువాదానికి ప్రయత్నిస్తున్నప్పటికీ, స్వయంచాలక అనువాదాల్లో పొరపాట్లు లేదా అపరిశుద్ధతలు ఉండవచ్చు. అసలు పత్రం native భాషలో ఉన్నది అధికారిక వనరుగా పరిగణించవలెను. సంక్లిష్ట సమాచారం కోసం ప్రొఫెషనల్ మానవ అనువాదం చేయించుకోవడం మంచిది. ఈ అనువాదం వలన కలిగే ఏవైనా తప్పుదోవలు లేదా అర్థగందరగోళాలకు మేము జవాబుదారులేమిటి కాదు.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->