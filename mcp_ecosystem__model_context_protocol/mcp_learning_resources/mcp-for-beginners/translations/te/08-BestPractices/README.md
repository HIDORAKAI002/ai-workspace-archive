# MCP అభివృద్ధి ఉత్తమ ఆచారాలు

[![MCP Development Best Practices](../../../translated_images/te/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(ఈ పాఠం వీడియోని చూడడానికి పై చిత్రాన్ని క్లిక్ చేయండి)_

## అవలోకనం

ఈ పాఠం ఉత్పత్తిపరమైన వాతావరణంలో MCP సర్వర్లను మరియు ఫీచర్లను అభివృద్ది చేయడం, పరీక్షించడం మరియు పంపిణీ చేయడంపై అధునాతన ఉత్తమ ఆచారాలను దృష్టిపెడుతుంది. MCP పర్యావరణాలు సంక్లిష్టత మరియు ప్రాముఖ్యతలో పెరుగుతున్నప్పుడు, స్థాపించబడిన నమూనాలను అనుసరించడం నమ్మదగినత, నిర్వహణ సౌలభ్యం మరియు పరస్పర చర్యను నిర్ధారిస్తుంది. ఈ పాఠం వాస్తవ ప్రపంచ MCP అమలుల నుండి సాంప్రదాయ జ్ఞానాన్ని సమీకరించి, సక్రమ వనరులు, ప్రాంప్ట్‌లు మరియు సాధనాలతో బలమైన, సమర్థవంతమైన సర్వర్లను సృష్టించడానికి మీరు గైడ్ చేస్తుంది.

## నేర్చుకునే లక్ష్యాలు

ఈ పాఠం చివర మీరు చేయగలుగుతారు:

- MCP సర్వర్ మరియు ఫీచర్ డిజైన్లో పరిశ్రమ ఉత్తమ ఆచారాలను వర్తించండి
- MCP సర్వర్ల కోసం సమగ్ర పరీక్షా వ్యూహాలను సృష్టించండి
- సంక్లిష్ట MCP అప్లికేషన్ల కోసం సమర్థవంతమైన, పున: ఉపయోగించదగిన వర్క్‌ఫ్లో నమూనాలను రూపొందించండి
- MCP సర్వర్లలో సరైన దోష నిర్వహణ, లాగింగ్ మరియు పరిశీలనను అమలు చేయండి
- పనితీరు, భద్రత మరియు నిర్వహణకు MCP అమలును ఆప్టిమైజ్ చేయండి

## MCP ప్రాథమిక సూత్రాలు

కనీసం అమలుకి ముందు, సమర్థవంతమైన MCP అభివృద్ధిని మార్గనిర్దేశం చేసే ప్రాథమిక సూత్రాలను అర్థం చేసుకోవడం ముఖ్యం:

1. **స్థిరీకృత కమ్యూనికేషన్**: MCP JSON-RPC 2.0 ని తన ఆధారంగా ఉపయోగిస్తుంది, అన్ని అమలులలో అభ్యర్థనలు, ప్రతిస్పందనలు మరియు దోష నిర్వహణకు ఎటువంటి నిరంతరమైన ఫార్మాట్ అందిస్తుంది.

2. **వినియోగదారుల కేంద్రిత రూపకల్పన**: మీ MCP అమలులలో ఎప్పుడూ వినియోగదారుల అంగీకారం, నియంత్రణ మరియు పారదర్శకతను ప్రాధాన్యం ఇవ్వండి.

3. **భద్రత మొదట**: ప్రామాణీకరణ, నిర్దేశనం, ధృవీకరణ మరియు రేటు పరిమితి సహా బలమైన భద్రతా చర్యలను అమలు చేయండి.

4. **మాడ్యూలర్ వాస్తుశిల్పం**: ప్రతి సాధనం మరియు వనరు స్పష్టమైన, లక్ష్యభరితమైన ఉద్దేశ్యంతో ఉండేలా మీ MCP సర్వర్లను మాడ్యూలర్ దృక్కోణంతో రూపొందించండి.

5. ** స్థితిగత సంబంధాలు **: అనేక అభ్యర్థనలు అంతటా స్థితిని నిర్వహించే MCP సామర్థ్యాన్ని ఉపయోగించుకోండి, ఇది మరింత సారూప్యత మరియు సందర్భానుసారుడైన పరస్పర చర్యలకు దారితీయుతుంది.

## అధికారిక MCP ఉత్తమ ఆచారాలు

క్రింద పేర్కొన్న ఉత్తమ ఆచారాలు అధికారిక మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ డాక్యుమెంటేషన్ నుండి పొందుపర్చబడినవి:

### భద్రత ఉత్తమ ఆచారాలు

1. **వినియోగదారుల అంగీకారం మరియు నియంత్రణ**: డేటా యాక్సెస్ చేయడానికి లేదా ఆపరేషన్లు నిర్వహించడానికి ఎప్పుడూ స్పష్టమైన వినియోగదారుల అంగీకారాన్ని తప్పనిసరిగా పొందండి. ఏ డేటా పంచబడుతుంది మరియు ఏ చర్యలు అనుమతించబడ్డాయి అన్న దానిపై స్పష్టమైన నియంత్రణని అందించండి.

2. **డేటా గోప్యత**: స్పష్టమైన అంగీకారం లేకుండా వినియోగదారుల డేటాను హ 공개 చేయవద్దు మరియు అధికారం లేని యాక్సెస్ నుండి దాన్ని రక్షించండి. అవాంఛనీయ డేటా ప్రసారాన్ని నివారించండి.

3. **సాధన భద్రత**: ఏ సాధనను పిలవడానికి వినియోగదారుల స్పష్టమైన అంగీకారం అవసరం. ప్రతి సాధన యొక్క కార్యాచరణను వినియోగదారులు అర్థం చేసుకోవాలని మరియు బలమైన భద్రతా సరిహద్దులను అమలు చేయండి.

4. **సాధన అనుమతి నియంత్రణ**: ఒక సెషన్ నడుస్తున్నప్పుడు మోడల్ ఉపయోగించదగిన సాధనలను కాన్ఫిగర్ చేయండి, కేవలం స్పష్టంగా అనుమతించబడిన సాధనలకే ప్రాప్యత ఉండేలా చేయండి.

5. **ప్రామాణీకరణ**: సాధనాలు, వనరులు లేదా సున్నితమైన ఆపరేషన్లకు యాక్సెస్ ఇవ్వడానికి సరైన ప్రామాణీకరణ చేయాలి, API కీలు, OAuth టోకెన్లు లేదా ఇతర భద్రమైన విధానాలు ఉపయోగించండి.

6. **పారామెటర్ ధృవీకరణ**: ఏదైనా సాధన పిలుపులకు తప్పు గల లేదా హానికారక ఇన్‌పుట్ రాకుండా ధృవీకరణను తప్పనిసరిగా అమలు చేయండి.

7. **రేటు పరిమితి**: దుర్వినియోగం నివారించడానికి మరియు సర్వర్ వనరుల సమాన వినియోగాన్ని నిర్ధారించడానికి రేటు పరిమితిని అమలు చేయండి.

### అమలు ఉత్తమ ఆచారాలు

1. **సామర్థ్యం చర్చింపు**: కనెక్షన్ సెటప్ సమయంలో, మద్దతు పొందిన ఫీచర్లు, ప్రోటోకాల్ సంస్కరణలు, అందుబాటులో ఉన్న సాధనాలు మరియు వనరుల గురించి సమాచారాన్ని మార్చుకోండి.

2. **సాధన రూపకల్పన**: ఒక్కో సాధనం ఒక ప్రత్యేక పనిని బాగా చేయాలని, అనేక అంశాలను హ్యాండిల్ చేసే పెద్ద సాధనలను మించిన విధంగా రూపకల్పన చేయండి.

3. **దోష నిర్వహణ**: సమస్యలను గుర్తించడానికి, విఫలాలను సౌమ్యంగా నిర్వహించడానికి మరియు చర్య తీసుకోవడానికి సరైన అభిప్రాయాన్ని అందించే దోష సందేశాలు మరియు కోడ్‌లను అమలు చేయండి.

4. **లాగింగ్**: ఆడిటింగ్, డీబగ్గింగ్ మరియు ప్రోటోకాల్ పరస్పరక్రియల మానిటరింగ్ కోసం నిర్మిత లాగ్లు సెట్ చేయండి.

5. **ప్రముఖత ట్రాకింగ్**: దీర్ఘకాలిక ఆపరేషన్ల కోసం పురోగతి అప్డేట్లను నివేదించండి, దీనివల్ల స్పందనాత్మక వినియోగదారుల ఇంటర్ఫేస్‌లను సక్రియం చేయవచ్చు.

6. **అభ్యర్థన రద్దు**: క్లైెంట్లు అవసరం లేకుండా పోయిన లేదా చాలా సేపు పట్టే ఇన్-ఫ్లైట్ అభ్యర్థనలను రద్దు చేసే వీలును కల్పించండి.

## అదనపు రిఫరెన్సులు

MCP ఉత్తమ ఆచారాలపై తాజా సమాచారానికి దయచేసి చూడండి:

- [MCP డాక్యుమెంటేషన్](https://modelcontextprotocol.io/)
- [MCP స్పెసిఫికేషన్ (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub రెపోసిటరీ](https://github.com/modelcontextprotocol)
- [భద్రత ఉత్తమ ఆచారాలు](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP టాప్ 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - భద్రతా ప్రమాదాలు మరియు నివారణలు
- [MCP భద్రతా శిఖర సమావేశం వర్క్‌షాప్ (Sherpa)](https://azure-samples.github.io/sherpa/) - హ్యాండ్స్-ఆన్ భద్రతా శిక్షణ

## ప్రాయోగిక అమల ఉదాహరణలు

### సాధన రూపకల్పన ఉత్తమ ఆచారాలు

#### 1. సింగిల్ రిస్పాన్స్‌బిలిటీ ప్రిన్సిపల్

ప్రతి MCP సాధనకు స్పష్టమైన, లక్ష్యభరితమైన అతిపెద్ద ఉద్దేశ్యం ఉండాలి. అనేక అంశాలను ఒకేసారి నిర్వహించేందుకు గల పెద్ద సాధనలు కాకుండా ప్రత్యేక పనులకు నైపుణ్యం కలిగిన సాధనాలను అభివృద్ధి చేయండి.

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

#### 2. సారూప్య దోష నిర్వహణ

సమగ్ర దోಷ నిర్వహణను సజావుగా అమలు చేయండి, ఇది సమాచారం ఇచ్చే దోష సందేశాలు మరియు సరైన పరిష్కార పద్ధతులను కలిగి ఉంటుంది.

```python
# విస్తృత లోపాల నిర్వహణతోపైథాన్ ఉదాహరణ
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # పారామీటర్ ధృవీకరణ
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # భద్రత ధృవీకరణ
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # టైమౌట్‌తో డేటాబేస్ ఆపరేషన్
                async with timeout(10):  # 10 సెకన్ల టైమౌట్
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # కనెక్షన్ లోపాలు తాత్కాలికమై ఉండవచ్చు
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # క్వెరీ లోపాలు సాధారణంగా క్లయింట్ లోపాలు
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # టూల్-ప్రత్యేక లోపాలు గడిపేవిధంగా సూచించండి
            raise
        except Exception as e:
            # అప్రతిష్టిత లోపాల కోసం సాధారణ పట్టుకోవడం
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL ఇంజెక్షన్ గుర్తింపు అమలు
        pass
        
    def _log_error(self, message, error):
        # లోపలాగింగ్ అమలు
        pass
```

#### 3. పారామెటర్ ధృవీకరణ

ఎప్పుడూ పారామితులను పూర్తిగా ధృవీకరించండి, దొర్లిపోయిన లేదా హానీకర ఇన్‌పుట్ ను నిరోధించడానికి.

```javascript
// వివిధ పరామితి సరైనతను నిర్ధారించుకునే JavaScript/TypeScript ఉదాహరణ
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
    // 1. పరామితి ఉన్నదో కాదో తనిఖీ చేయండి
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. పరామితి రకాల సమాచారాన్ని తనిఖీ చేయండి
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. పరామితి విలువలను తనిఖీ చేయండి
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. రచనా కార్యకలాపం కోసం కంటెంట్ ఉన్నదో తనిఖీ చేయండి
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. మార్గం భద్రత తనిఖీ
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // నిర్ధారించబడిన పరామితులపై అమలు
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // మార్గ భద్రత తనిఖీ అమలు
    // ...
  }
}
```

### భద్రత అమల ఉదాహరణలు

#### 1. ప్రామాణీకరణ మరియు నిర్దేశనం

```java
// ధృవీకరణ మరియు అనుమతితో Java ఉదాహరణ
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
        // 1. ధృవీకరణ సందర్భం తీసుకోండి
        String authToken = request.getContext().getAuthToken();
        
        // 2. వాడుకరిని ధృవీకరించండి
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. నిర్దిష్ట కార్యకలాపానికి అనుమతిని తనిఖీ చేయండి
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. అనుమతితో కూడిన కార్యకలాపంతో కొనసాగండి
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

#### 2. రేటు పరిమితి

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

## పరీక్షా ఉత్తమ ఆచారాలు

### 1. MCP సాధనాల యూనిట్ పరీక్ష

ఎప్పుడూ మీ సాధనాలను వేరే విధిగా, బాహ్య ఆధారాలు మాక్ చేస్తూ పరీక్షించండి:

```typescript
// టైప్‌స్క్రిప్ట్ ఉదాహరణగా టూల్ యూనిట్ టెస్ట్
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ఒక మాక్ వాతావరణ సేవ సృష్టించండి
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // మాక్ ఆధారితతో టూల్ సృష్టించండి
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // ఏర్పాటు చేయండి
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
    // ఏర్పాటు చేయండి
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // చర్య & నిర్ధారణ
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. ఇంటిగ్రేషన్ పరీక్ష

క్లైంట్ అభ్యర్థనల నుండి సర్వర్ ప్రతిస్పందనల వరకు పూర్తిగా ప్రవাহాన్ని పరీక్షించండి:

```python
# పైథాన్ సమ్మేళనం పరీక్ష ఉదాహరణ
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # పరీక్ష సర్వర్ ప్రారంభించండి
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # ఒక క్లయింట్ రూపొందించండి
        client = McpClient("http://localhost:5000")
        
        # టూల్ గుర్తింపు పరీక్షించండి
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # టూల్ నిర్వహణ పరీక్షించండి
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # ప్రతిస్పందనను ధృవీకరించండి
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # శుభ్రం చేయండి
        await server.stop()
```

## పనితీరు ఆప్టిమైజేషన్

### 1. క్యాషింగ్ వ్యూహాలు

విలంబం మరియు వనరు వినియోగం తగ్గించడానికి సరైన క్యాషింగ్ అమలు చేయండి:

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

#### 2. డిపెండెన్సీ ఇంజెక్షన్ మరియు పరీక్షించదగినత

సాధనాలు తమ ఆధారాలను కన్‌స్ట్రక్టర్ ఇంజెక్షన్ ద్వారా స్వీకరించేందుకు రూపకల్పన చేయండి, తద్వారా వాటిని పరీక్షించగల మరియు కాన్ఫిగర్డ్ చేయగలుగుతుంది:

```java
// డిపెండెన్సీ ఇంజెక్షన్‌తో జావా ఉదాహరణ
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // కన్‌స్ట్రక్టర్ ద్వారా డిపెండెన్సీలు ఇంజెక్ట్ చేయబడ్డాయి
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // ఉపకరణ అమలు
    // ...
}
```

#### 3. కంపోజబుల్ సాధనాలు

సంక్లిష్ట వర్క్‌ఫ్లోలను సృష్టించేందుకు కలిసి పనిచేసే సాధనాలను డిజైన్ చేయండి:

```python
# కాంపోజబుల్ టూల్స్ చూపించే పైథాన్ ఉదాహరణ
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # అమలుచేసింది...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # ఈ టూల్ dataFetch టూల్ నుంచి ఫలితాలను ఉపయోగించగలదు
    async def execute_async(self, request):
        # అమలుచేసింది...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # ఈ టూల్ dataAnalysis టూల్ నుంచి ఫలితాలను ఉపయోగించగలదు
    async def execute_async(self, request):
        # అమలుచేసింది...
        pass

# ఈ టూల్స్ స్వతంత్రంగా లేదా వర్క్‌ఫ్లో భాగంగా ఉపయోగించవచ్చు
```

### స్కీమా రూపకల్పన ఉత్తమ ఆచారాలు

స్కీమా మోడల్ మరియు మీ సాధన మధ్య ఒప్పందం. బాగా రూపకల్పన చేసిన స్కీమాలు మెరుగైన సాధన ఉపయోగకరతకు దారితీస్తాయి.

#### 1. క్లియర్ పారామెటర్ వివరణలు

ప్రతి పారామెటర్ కు వివరణాత్మక సమాచారాన్ని తప్పనిసరిగా చేర్చండి:

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

చెల్లని ఇన్‌పుట్లను నివారించేందుకు ధృవీకరణ పరిమితులను చేర్చండి:

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
    
    // ఎ న్యుమరేటెడ్ ప్రాపర్టీ
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

#### 3. సారూప్య తిరుగింపు నిర్మాణాలు

ఫలితాలను మోడల్లు సులభంగా అర్థం చేసుకునేలా మీరు మీ ప్రతిస్పందన నిర్మాణాలలో సారూప్యతను ఉంచండి:

```python
async def execute_async(self, request):
    try:
        # అభ్యర్థనను ప్రాసెస్ చేయండి
        results = await self._search_database(request.parameters["query"])
        
        # ఎప్పుడూ ఒక సTeslaభవమైన నిర్మాణాన్ని తిరిగి ఇవ్వండి
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

### దోష నిర్వహణ

నమ్మదగినతకు MCP సాధనాలలో బలమైన దోష నిర్వహణ అత్యావశ్యకం.

#### 1. సౌమ్య దోష నిర్వహణ

సరైన స్థాయిల వద్ద దోషాలను నిర్వహించి సమాచారం ఇచ్చే సందేశాలను అందించండి:

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

#### 2. నిర్మిత దోష ప్రతిస్పందనలు

సంభవిస్తే నిర్మిత దోష సమాచారాన్ని తిరిగి ఇవ్వండి:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // అమలు
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
        
        // ఇతర తప్పిదాలను ToolExecutionException గా మళ్ళీ విసరించండి
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. రీట్రై లాజిక్

క్షణిక విఫలాల కోసం సరైన రీట్రై లాజిక్ అమలు చేయండి:

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
                
            # ఘాతాంక విధానం వెనుకడుగు
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # తాత్కాలను కాని లోపం, పునఃప్రయత్నించకండి
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### పనితీరు ఆప్టిమైజేషన్

#### 1. క్యాషింగ్

ఖర్చు ఎక్కువ చేసే ఆపరేషన్ల కోసం క్యాషింగ్ అమలు చేయండి:

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

#### 2. అసింక్రనస్ ప్రాసెసింగ్

I/O ఆధారిత ఆపరేషన్ల కోసం అసింక్రనస్ ప్రోగ్రామింగ్ నమూనాలను ఉపయోగించండి:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // దీర్ఘకాలిక ప్రదర్శనల కోసం, వెంటనే ప్రాసెసింగ్ ID ను 반환 చేయండి
        String processId = UUID.randomUUID().toString();
        
        // అసింక్ ప్రాసెసింగ్ ప్రారంభించండి
        CompletableFuture.runAsync(() -> {
            try {
                // దీర్ఘకాలిక ఆపరేషన్ నిర్వహించండి
                documentService.processDocument(documentId);
                
                // స్థితిని నవీకరించండి (సాధారణంగా డేటాబేస్లో నిల్వ చేయబడుతుంది)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // ప్రాసెస్ IDతో వెంటనే ప్రతిస్పందన ఇవ్వండి
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // అనుబంధ స్థితి తనిఖీ సాధనం
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

#### 3. వనరు నియంత్రణ

అధిక బోజు నివారించేందుకు వనరు నియంత్రణ అమలు చేయండి:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # секунుకు 5 అభ్యర్థనలు అనుమతించండి
            bucket_size=10        # 10 అభ్యర్థనలు వరకు బర్స్ట్‌లు అనుమతించండి
        )
    
    async def execute_async(self, request):
        # మేము ముందుకు పోవచ్చో లేదో చెక్ చేయండి లేదా వేచివుండాలి
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # వేచివుండటం చాలా ఎక్కువగా ఉన్నట్లయితే
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # సరైన ఆలస్యం సమయం కోసం వేచి ఉండండి
                await asyncio.sleep(delay)
        
        # ఒక టోకెన్‌ను వినియోగించి అభ్యర్థనతో ముందుకు పోవండి
        self.rate_limiter.consume()
        
        # APIని కాల్ చేయండి
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
            
            # తదుపరి టోకెన్ అందుబాటులో ఉండే వరకు సమయాన్ని లెక్కించండి
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # గడిచిన సమయం ఆధారంగా కొత్త టోకెన్లను జోడించండి
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### భద్రత ఉత్తమ ఆచారాలు

#### 1. ఇన్‌పుట్ ధృవీకరణ

ఎప్పుడూ ఇన్‌పుట్ పారామితులను పూర్తిగా ధృవీకరించండి:

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

#### 2. నిర్దేశన తనిఖీలు

సరైన నిర్దేశన తనిఖీలను అమలు చేయండి:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // అభ్యర్థన నుండి వాడుకరి సందర్భాన్ని పొందండి
    UserContext user = request.getContext().getUserContext();
    
    // వాడుకరి అవసరమైన అనుమతులు కలిగి ఉన్నారా తెలుసుకోండి
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // నిర్దిష్ట వనరులకు సంప్రదించండి, ఆ వనరిపై ప్రాప్తిని తనిఖీ చేయండి
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // టూల్ అమలు కొనసాగించండి
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
        
        # వినియోగదారు డేటాను పొందండి
        user_data = await self.user_service.get_user_data(user_id)
        
        # స్పష్టంగా అభ్యర్థించబడి అనుమతించబడినప్పుడు మాత్రమే సున్నితమైన ఫీల్డ్స్‌ను వడపోత చేయండి
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # అభ్యర్థన প্রSandarbha లో అనుమతుల స్థాయి తనిఖీ చేయండి
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # అసలు దానిని మార్చకుండా ఉండేందుకు ఒక కాపీ సృష్టించండి
        redacted = user_data.copy()
        
        # నిర్దిష్ట సున్నితమైన ఫీల్డ్‌లను రెడాక్ట్ చేయండి
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # గుళికైన సున్నితమైన డేటాను రెడాక్ట్ చేయండి
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP సాధనాల పరీక్షా ఉత్తమ ఆచారాలు

సంపూర్తి పరీక్ష MCP సాధనాలు సక్రమంగా పనిచేస్తున్నదని, ఎడ్జ్ కేసులను హ్యాండిల్ చేస్తున్నదని, మరియు పర్యావరణంతో సక్రమంగా ఇంటిగ్రేట్ అవుతున్నదని నిర్ధారిస్తుంది.

### యూనిట్ పరీక్ష

#### 1. ప్రతీ సాధనను వేరుగా పరీక్షించండి

ప్రతి సాధన లక్షణానికి లక్ష్యంగా পরীক্ষలుపోచండి:

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

స్కీమాలు చెల్లుబాటుగా ఉన్నాయా మరియు పరిమితులను సరిగ్గా అమలు చేస్తున్నాయా అని పరీక్షించండి:

```java
@Test
public void testSchemaValidation() {
    // టూల్ ఉదాహరణ సృష్టించండి
    SearchTool searchTool = new SearchTool();
    
    // స్ధాపితాన్ని పొందండి
    Object schema = searchTool.getSchema();
    
    // ప్రమాణీకరణ కోసం స్ధాపితాన్ని JSON గా మార్చండి
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // స్ధాపితం సరైన JSONSchema కాబట్టి నిర్ధారించండి
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // సరైన పరామితులను పరీక్షించండి
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // తప్పిపోయిన అవసరమైన పరామితిని పరీక్షించండి
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // చెల్లని పరామితి రకం పరీక్షించండి
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. దోష నిర్వహణ పరీక్షలు

దోష పరిస్థితుల కోసం ప్రత్యేక పరీక్షలు సృష్టించండి:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # ఏర్పాటుచేయండి
    tool = ApiTool(timeout=0.1)  # చాలా చిన్న టైమ్ అవుట్
    
    # టైమ్ అవుట్ వచ్చే అభ్యర్థనను మాక్ చేయండి
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # టైమ్ అవుట్ కంటే ఎక్కువ
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # క్రియ & నిర్ధారణ
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ప్రత్యేకమైన సందేశాన్ని ధృవీకరించండి
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # ఏర్పాటుచేయండి
    tool = ApiTool()
    
    # రేటు పరిమితమైన ప్రతిస్పందనను మాక్ చేయండి
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
        
        # క్రియ & నిర్ధారణ
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ప్రత్యేకతలో రేటు పరిమితి సమాచారాన్ని ధృవీకరించండి
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### ఇంటిగ్రేషన్ పరీక్ష

#### 1. సాధన గొలుసు పరీక్ష

ఇష్టమైన సంయోగాల్లో సాధనాలు కలిసి పనిచేస్తున్నాయా అని పరీక్షించండి:

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

పూర్తి సాధన రిజిస్ట్రేషన్ మరియు అమలు తో MCP సర్వర్‌ను పరీక్షించండి:

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
        // కనుగొనే ఎండ్ పాయింట్ ని పరీక్షించండి
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
        
        // అభ్యర్థన పంపించి స్పందనను ధృవీకరించండి
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // చెల్లని టూల్ అభ్యర్థన సృష్టించండి
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" అనే పరామితి లేదు
        request.put("parameters", parameters);
        
        // అభ్యర్థన పంపించి దోష స్పందనను ధృవీకరించండి
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. చివరి నుండి చివరి వరకు పరీక్ష

మోడల్ ప్రాంప్ట్ నుండి సాధన అమలునవరకు పూర్తి వర్క్‌ఫ్లోలను పరీక్షించండి:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # ఏర్పాటు చేయండి - MCP క్లయింట్ మరియు మాక్ మోడల్ అమర్చండి
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
    
    # మాక్ వాతావరణ సాధనం ప్రతిస్పందన
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

### పనితీరు పరీక్ష

#### 1. లోడ్ పరీక్ష

మీ MCP సర్వర్ ఎంతమంది సమకాలీన అభ్యర్థనలను నిర్వహించగలదో పరీక్షించండి:

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

#### 2. స్ట్రెస్ పరీక్ష

అత్యంత భారమైన లోడ్ క్రింద వ్యవస్థను పరీక్షించండి:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // స్ట్రెస్ టెస్టింగ్ కోసం జెఎంర్టర్ సెట్ చేయండి
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // జెఎంర్టర్ టెస్ట్ ప్లాన్ కాన్ఫిగర్ చేయండి
    HashTree testPlanTree = new HashTree();
    
    // టెస్ట్ ప్లాన్, థ్రెడ్ గ్రూప్, సాంప్లర్లు మొదలైన వాటిని సృష్టించండి
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // టూల్ ఎగ్జిక్యూషన్ కోసం HTTP సాంప్లర్ జోడించండి
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // లిసనర్లు జోడించండి
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // పరీక్షను నడపండి
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // ఫలితాలను నిర్ధారించండి
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // సగటు ప్రతిస్పందన సమయం < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90వ శాతకం < 500ms
}
```

#### 3. మానిటరింగ్ మరియు ప్రొఫైలింగ్

దీర్ఘకాలిక పనితీరు విశ్లేషణ కోసం మానిటరింగ్ సెట్ చేయండి:

```python
# MCP సర్వర్ కోసం మానిటరింగ్ కానుగ్గు చేయండి
def configure_monitoring(server):
    # Prometheus మెట్రిక్స్ సెటప్ చేయండి
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
    
    # టైమింగ్ మరియు రికార్డింగ్ మెట్రిక్స్ కోసం మిడిల్వేర్ చేర్చండి
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # మెట్రిక్స్ ఎండ్పాయింట్‌ను ప్రదర్శించండి
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP వర్క్‌ఫ్లో రూపకల్పన నమూనాలు

బాగా రూపకల్పన చేయబడిన MCP వర్క్‌ఫ్లోలు సమర్థవంతత, నమ్మదగినత మరియు నిర్వహణ సౌలభ్యం పెంచుతాయి. అనుసరించవలసిన ముఖ్య నమూనాలు:

### 1. సాధనల గొలుసు నమూనా

ఒక శ్రేణిలో అనేక సాధనాలను కనెక్ట్ చేయండి, ప్రతీ సాధనం అవుట్పుట్ తరువాతి సాధన ఇన్‌పుట్ అవుతుంది:

```python
# పైథాన్ చైన్ ఆఫ్ టూల్స్ అమలు
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # వరుసగా అమలు చేయడానికి టూల్ పేర్ల జాబితా
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # చైన్‌లో ప్రతి టూల్‌ను ముందరి ఫలితాన్ని అందిస్తూ అమలు చేయండి
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # ఫలితాన్ని నిల్వ చేసుకుని తదుపరి టూల్‌కు ఇన్‌పుట్‌గా ఉపయోగించండి
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

### 2. డిస్పాచ్ నమూనా

ఇన్‌పుట్ ఆధారంగా ప్రత్యేక సాధనాలకు పంపిణీ చేసే కేంద్ర సాధనాన్ని ఉపయోగించండి:

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

సమర్థత కోసం అనేక సాధనాలను సమాంతరంగా అమలు చేయండి:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // దశ 1: డేటాసెట్ మెటాడేటా తీసుకోండి (సింక్రోనస్)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // దశ 2: పలు విశ్లేషణలను సమాంతరంగా ప్రారంభించండి
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
        
        // అన్ని సమాంతర పనులు పూర్తవడానికి కాపాడండి
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // పూర్తయ్యేవరకు వేచి ఉండండి
        
        // దశ 3: ఫలితాలను కలపండి
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // దశ 4: సారాంశ నివేదికను తయారు చేయండి
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // సంపూర్ణ వర్క్‌ఫ్లో ఫలితాన్ని తిరిగి ఇవ్వండి
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. దోష పునరుద్ధరణ నమూనా

సాధన విఫలాలకు సౌమ్య ప్రత్యామ్నాయాలను అమలు చేయండి:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # మొదటి సాధనం ప్రయత్నించండి
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # వైఫల్యాన్ని లాగ్ చేయండి
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # రెండవ సాధనం వైపు తిరగండి
            try:
                # తిరుగు సాధనం కోసం పరామితులను మార్పిడి చేయవలసి ఉంటుంది
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # రెండు సాధనాలు విఫలమయ్యాయి
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # ఈ అమలుపై ప్రత్యేక సాధనాలపై ఆధారపడి ఉంటుంది
        # ఈ ఉదాహరణలో, మనం మొదటి పరామితులను తిరిగి ఇస్తాము
        return params

# ఉదాహరణ ఉపయోగం
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # మొదటి (కట్టెల) వాతావరణ API
        "basicWeatherService",    # తిరుగు (ఉచిత) వాతావరణ API
        {"location": location}
    )
```

### 5. వర్క్‌ఫ్లో సంకలనం నమూనా

సంక్లిష్ట వర్క్‌ఫ్లోలను సరళమైన వాటిని కలిసి రూపొందించండి:

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

# MCP సర్వర్ల పరీక్ష: ఉత్తమ ఆచారాలు మరియు ముఖ్య సూచనలు

## అవలోకనం

పరీక్ష MCP సర్వర్లను నమ్మదగిన, ఉన్నత-నాణ్యత గలవి గా అభివృద్ధి చేయడంలో కీలక భాగం. ఈ గైడ్ మీ MCP సర్వర్లను అభివృద్ధి జీవనచక్రంలో యూనిట్ టెస్టులు, ఇంటిగ్రేషన్ టెస్టులు మరియు చివరి వరకు ధృవీకరణతో పరీక్షించడానికి సమగ్ర ఉత్తమ ఆచారాలను మరియు సూచనలను అందిస్తుంది.

## MCP సర్వర్ల కోసం పరీక్ష ఎందుకు ముఖ్యం

MCP సర్వర్లు AI మోడల్స్ మరియు క్లయింట్ అప్లికేషన్ల మధ్య ముఖ్య మిడ్‌లేయర్‌లుగా ఉంటాయి. పూర్తిగా పరీక్షించడం నిర్ధారిస్తుంది:

- ఉత్పత్తి వాతావరణాల్లో నమ్మకదగినత
- అభ్యర్థనలు మరియు ప్రతిస్పందనలను ఖచ్చితంగా నిర్వహణ
- MCP స్పెసిఫికేషన్ల సరైన అమలు
- విఫలాలు మరియు ఎడ్జ్ కేసులపై ప్రతిఘటన
- వివిధ లోడ్స్‌ద్వారా సారాణి పనితీరు

## MCP సర్వర్ల కోసం యూనిట్ పరీక్ష

### యూనిట్ పరీక్ష (మూలం)

యూనిట్ టెస్టులు మీ MCP సర్వర్ వ్యక్తిగత భాగాలను వేరుగా నిర్ధారిస్తాయి.

#### ఏమిటి పరీక్షించాలి

1. **వనరు హ్యాండ్లర్లు**: ప్రతి వనరు హ్యాండ్లర్ యొక్క లాజిక్‌ని స్వతంత్రంగా పరీక్షించండి
2. **సాధన అమలులు**: వివిధ ఇన్‌పుట్‌లతో సాధనల ప్రవర్తనను తెరవండి
3. **ప్రాంప్ట్ టెంప్లేట్లు**: ప్రాంప్ట్ టెంప్లేట్లు సరిగా రెండర్ అవుతాయా చూసుకోండి
4. **స్కీమా ధృవీకరణ**: పారామెటర్ ధృవీకరణ లాజిక్‌ను పరీక్షించండి
5. **దోష నిర్వహణ**: చెల్లని ఇన్‌పుట్‌లకు సంబంధించిన దోష ప్రతిస్పందనలను ధృవీకరించండి

#### యూనిట్ పరీక్షా ఉత్తమ ఆచారాలు

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
# పైథాన్‌లో క్యాల్క్యులేటర్ టూల్ కోసం ఉదాహరణ యూనిట్ పరీక్ష
def test_calculator_tool_add():
    # ఏర్పాటు చేయండి
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # అమలు చేయండి
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # నిర్ధారించండి
    assert result["value"] == 12
```

### ఇంటిగ్రేషన్ పరీక్ష (మధ్యస్థరం)

ఇంటిగ్రేషన్ టెస్టులు MCP సర్వర్ భాగాల మధ్య అంతర్జాలాలను ధృవీకరిస్తాయి.

#### ఏమిటి పరీక్షించాలి

1. **సర్వర్ ప్రారంభం**: వివిధ కాన్ఫిగరేషన్‌లతో సర్వర్ ప్రారంభ పోయినదా పరీక్షించండి
2. **రూట్ రిజిస్ట్రేషన్**: అన్ని ఎండ్‌పాయింట్లు సరైన రీతిలో రిజిస్టర్ అయ్యాయా చూసుకోండి
3. **అభ్యర్థన ప్రాసెసింగ్**: పూర్తి అభ్యర్థన-ప్రతిస్పందన సైకిల్‌ని పరీక్షించండి
4. **దోష ప్రబంధం**: భాగాల మధ్య దోషాలు సరిగా హ్యాండిల్ అయ్యాయా పరిశీలించండి
5. **ప్రామాణీకరణ & నిర్దేశనం**: భద్రతా వ్యవస్థలను పరీక్షించండి

#### ఇంటిగ్రేషన్ పరీక్షా ఉత్తమ ఆచారాలు

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

### చివరి నుండి చివరి వరకు పరీక్ష (టాప్ లేయర్)

ఈ పరీక్షలు క్లయింట్ నుండి సర్వర్ దాకా పూర్తి వ్యవస్థ ప్రవర్తనని ధృవీకరిస్తాయి.

#### ఏమిటి పరీక్షించాలి

1. **క్లయింట్-సర్వర్ కమ్యూనికేషన్**: పూర్తి అభ్యర్థన-ప్రతిస్పందన సైకిళ్ళను పరీక్షించండి
2. **నిజమైన క్లయింట్ SDKలు**: అసలు క్లయింట్ అమలులతో పరీక్షించండి
3. **లోడులో పనితీరు**: పలు సమకాలీన అభ్యర్థనలతో ప్రవర్తనను ధృవీకరించండి
4. **దోష పునరుద్ధరణ**: వ్యాధుల నుంచి వ్యవస్థ పునరుద్ధరణను పరీక్షించండి
5. **దీర్ఘకాల ఆపరేషన్లు**: స్ట్రీమింగ్ మరియు దీర్ఘకాల ఆపరేషన్ల నిర్వహణను ధృవీకరించండి

#### E2E పరీక్షా ఉత్తమ ఆచారాలు

```typescript
// టైప్ర్స్క్రిప్ట్‌లో కస్టమర్‌తో ఉదాహరణ E2E పరీక్ష
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // పరీక్షా వాతావరణంలో సర్వర్ ప్రారంభించండి
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

పరీక్ష సమయంలో భాగాలను వేరుగా చూసుకోవడానికి మాకింగ్ అవసరం.

### మాక్ చేయాల్సిన భాగాలు

1. **బాహ్య AI మోడల్స్**: నిర్ధారించదగిన పరీక్షలకు మోడల్ ప్రతిస్పందనలను మాక్ చేయండి
2. **బాహ్య సేవలు**: API ఆధారాలను (డేటాబేసులు, మూడవ పక్ష సేవలు) మాక్ చేయండి
3. **ప్రామాణీకరణ సేవలు**: గుర్తింపు ప్రొవైడర్లను మాక్ చేయండి
4. **వనరు ప్రొవైడర్లు**: ఖరీది పెద్ద వనరు హ్యాండ్లర్లను మాక్ చేయండి

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
    # మాక్‌ను కాన్ఫిగర్ చేయండి
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # పరీక్షలో మాక్‌ను ఉపయోగించండి
    server = McpServer(model_client=mock_model)
    # పరీక్షతో కొనసాగించండి
```

## పనితీరు పరీక్ష

ఉత్పత్తి MCP సర్వర్లకు పనితీరు పరీక్ష అవసరం.

### ఏమి కొలవాలి

1. **విలంబం**: అభ్యర్థనలకు ప్రతిస్పందించడానికి తీసుకునే సమయం
2. **త్రౌత్వు**: సెకనుకు ప్రాసెస్ అయ్యే అభ్యర్థనల సంఖ్య
3. **వనరు ఉపయోగం**: CPU, మెమరీ, నెట్‌వర్క్ వాడకం
4. **సమకాలీన నిర్వహణ**: సమాంతర అభ్యర్థనలలో ప్రవర్తన
5. **విస్తరణ లక్షణాలు**: లోడ్ పెరిగేప్పుడు పనితీరు

### పనితీరు పరీక్షా సాధనాలు

- **k6**: ఓపెన్-సోర్స్ లోడ్ పరీక్షా సాధనం
- **JMeter**: సమగ్ర పనితీరు పరీక్ష
- **Locust**: పైథాన్ ఆధారిత లోడ్ పరీక్ష
- **Azure Load Testing**: క్లౌడ్ ఆధారిత పనితీరు పరీక్ష

### ఉదాహరణ: k6 తో బేసిక్ లోడ్ టెస్ట్

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

## MCP సర్వర్ల కోసం టెస్ట్ ఆటోమేషన్

మీ పరీక్షలను ఆటోమేట్ చేయడం నిరంతర నాణ్యత మరియు వేగవంతమైన ఫీడ్‌బ్యాక్ లూపులను నిర్ధారిస్తుంది.

### CI/CD ఇంటిగ్రేషన్

1. **పుల్ రిక్వెస్టులపై యూనిట్ టెస్ట్లు నడపండి**: కోడ్ మార్పులు ఇప్పటికే ఉన్న విధానాన్ని బ్రేక్ చేస్తున్నట్లు కాకుండా చూసుకోండి
2. **స్టేజింగ్‌లో ఇంటిగ్రేషన్ పరీక్షలు**: ప్రీ-ప్రొడక్షన్ పరిసరాలలో ఇంటిగ్రేషన్ పరీక్షలు నిర్వహించండి
3. **ప్రదర్శన బేస్‌లైన్లు**: మళ్లింపు సమస్యలను గుర్తించడానికి పనితీరు ప్రమాణాలను నిర్వహించండి
4. **భద్రత స్కాన్లు**: పైప్లైన్ భాగంగా భద్రతా పరీక్షలను ఆటోమేట్చేయండి

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

## MCP స్పెసిఫికేషన్ నిర్దేశాలతో అనుకూలత కోసం పరీక్షలు

మీ సర్వర్ సరిగా MCP స్పెసిఫికేషన్‌ను అమలు చేస్తున్నదా అని నిర్ధారించుకోండి.

### కీలక అనుకూలత ప్రాంతాలు

1. **API ఎండ్‌పాయింట్లు**: అవసరమైన ఎండ్‌పాయింట్లను పరీక్షించండి (/resources, /tools, ఇతరాలు)
2. **రూపుమార్పు/ప్రత్యుత్తర ఫార్మాట్**: స్కీమా అనుకూలతను ధ్రువీకరించండి
3. **లోపం కోడ్లు**: వివిధ పరిస్థితులకు సరైన స్థితి కోడ్లు ఉన్నాయో లేదా అని పరీక్షించండి
4. **కంటెంట్ రకాలు**: వేరువేరు కంటెంట్ రకాల నిర్వహణను పరీక్షించండి
5. **పరిచయం ప్రవాహం**: స్పెసిఫికేషన్‌కు అనుగుణమైన ప్రమాణాల అథెంటికేషన్ విధానాలను ధ్రువీకరించండి

### అనుకూలత పరీక్ష సూట్

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

## MCP సర్వర్ సదుపాయంగా పరీక్షించడానికి టాప్ 10 సూచనలు

1. **పరికరం నిర్వచనాలను వేర్వేరు పరీక్షించండి**: పరికర లాజిక్ నుంచి స్కీమా నిర్వచనాలను స్వతంత్రంగా ధృవీకరించండి
2. **పరామితి పరీక్షలను ఉపయోగించండి**: వివిధ ఇన్‌పుట్లతో పరికరాలను, ఎడ్జ్ కేసులు సహా పరీక్షించండి
3. **లోపపు ప్రత్యుత్తరాలను తనిఖీ చేయండి**: అన్ని లోప పరిస్థితులకు సరైన లోప నిర్వహణ ఉందా అని ధృవీకరించండి
4. **అధికార పరీక్షల లాజిక్**: విభిన్న వినియోగదారు పాత్రలకి సరైన యాక్సెస్ నియంత్రణ ఉందో లేదో నిర్ధారించండి
5. **పరీక్ష కవరేజ్‌ను గమనించండి**: కీలక మార్గ కోడ్ పై ఎక్కువ కవరేజ్ లక్ష్యం పెట్టండి
6. **స్ట్రీమింగ్ ప్రత్యుత్తరాలను పరీక్షించండి**: స్ట్రీమింగ్ కంటెంట్‌ను సరైన రీతిలో నిర్వహిస్తున్నదా అని ధృవీకరించండి
7. **నెట్‌వర్క్ సమస్యలను అనుకరించండి**: తక్కువ నెట్‌వర్క్ పరిస్థితులలో వ్యవహారాన్ని పరీక్షించండి
8. **సాధన పరిమితులను పరీక్షించండి**: కోటాలు లేదా రేట్ పరిమితుల చేరుకున్నప్పుడు ప్రవర్తనను ధృవీకరించండి
9. **మళ్లింపు పరీక్షలను ఆటోమేట్చేయండి**: ప్రతి కోడ్ మార్పులో నడిచే సూట్‌ను నిర్మించండి
10. **పరీక్ష కేసులను డాక్యుమెంట్ చేయండి**: పరీక్ష పరిస్థితుల స్పష్టమైన డాక్యుమెంటేషన్‌ను నిర్వహించండి

## సాధారణ పరీక్ష లోపాలు

- **సంతోషమైన మార్గం పరీక్షలపై అధిక ఆధారపడటం**: లోపాల కేసులను పూర్తిగా పరీక్షించండి
- **పనితీరు పరీక్షలను పట్టించుకోకపోవడం**: ఉత్పత్తిపై ప్రభావితం కాకముందే బాటిల్‌నెక్స్ గుర్తించండి
- **మాత్రమే వేరుగా పరీక్షించడం**: యూనిట్, ఇంటిగ్రేషన్ మరియు ఎండ్-టు-ఎండ్ పరీక్షలను కలపండి
- **పూర్తి API కవరేజ్ లేకపోవడం**: అన్ని ఎండ్‌పాయింట్లు మరియు లక్షణాలు పరీక్షించబడ్డాయి అని నిర్ధారించుకోండి
- **పరీక్ష పరిసరాలలో అసమతుల్యత**: కంటైనర్లు ఉపయోగించి స్థిరమైన పరీక్ష పరిసరాలు కలిగి ఉండండి

## సమాప్తి

నమ్మకమైన, అధిక-నాణ్యత MCP సర్వర్లను అభివృద్ధి చేయడానికి సమగ్ర పరీక్షా వ్యూహం అవసరం. ఈ గైడ్‌లో పేర్కొన్న ఉత్తమ వ్యావహారాలు మరియు సూచనలను అమలు చేయడం ద్వారా మీ MCP అమలులు ఉన్నత నాణ్యత, నమ్మకదారత్వం మరియు పనితీరు ప్రమాణాలను తీరుతాయి.

## ముఖ్యమైన అంశాలు

1. **పరికర రూపకల్పన**: ఏకైక బాధ్యత సూత్రాన్ని అనుసరించండి, డిపెండెన్సీ ఇంజెక్షన్ ఉపయోగించి, కంపోజబిలిటీ కోసం రూపకల్పన చేయండి
2. **స్కీమా రూపకల్పన**: స్పష్టమైన, బాగా డాక్యుమెంటెడ్ స్కీమాలను సరైన ధృవీకరణ పరిమితులతో సృష్టించండి
3. **లోప నిర్వహణ**: మృదువైన లోప నిర్వహణ, నిర్మాణాత్మక లోప ప్రతిస్పందనలు మరియు రీట్రమ్ లాజిక్ అమలు చేయండి
4. **పనితీరు**: క్యాషింగ్, అసింక్రోనస్ ప్రాసెసింగ్ మరియు వనరుల త్రోట్ట్లింగ్ ఉపయోగించండి
5. **భద్రత**: కఠినమైన ఇన్‌పుట్ ధృవీకరణ, అధికార తనిఖీలు మరియు సున్నిత డేటా నిర్వహణను అమలు చేయండి
6. **పరీక్షలు**: విస్తృత యూనిట్, ఇంటిగ్రేషన్ మరియు ఎండ్-టు-ఎండ్ పరీక్షలను సృష్టించండి
7. **వర్క్‌ఫ్లో నమూనాలు**: చైన్లు, డిస్‌ప్యాచ్‌లు మరియు సమాంతర ప్రాసెసింగ్ వంటి స్థాపిత నమూనాలను అన్వయించండి

## వ్యాయామం

తదుపరి లక్షణాలు కలిగిన డాక్యుమెంట్ ప్రాసెసింగ్ వ్యవస్థ కోసం MCP పరికరం మరియు వర్క్‌ఫ్లో రూపకల్పన చేయండి:

1. బహుళ ఫార్మాట్లలో డాక్యుమెంట్లను (PDF, DOCX, TXT) స్వీకరించండి
2. డాక్యుమెంట్ల నుండి టెక్స్ మరియు కీలక సమాచారం తీయండి
3. డాక్యుమెంట్లను రకాలు మరియు కంటెంట్ ప్రకారం వర్గీకరించండి
4. ప్రతి డాక్యుమెంట్ యొక్క సారాంశం రూపొందించండి

ఈ సందర్భానికి సరిపోయే పరికరం స్కీమాలు, లోప నిర్వహణ మరియు వర్క్‌ఫ్లో నమూనాను అమలు చేయండి. మీరు ఈ అమలును ఎలా పరీక్షించేవాడో పరిశీలించండి.

## వనరులు 

1. కొత్త డెవలప్మెంట్‌లపై అప్డేట్ కావడానికి [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) లో MCP సముదాయంపై చేరండి
2. ఓపెన్ సోర్స్ [MCP ప్రాజెక్టులకు](https://github.com/modelcontextprotocol) సహాయం చేయండి
3. మీ సొంత సంస్థ AI ప్రారంభాలలో MCP సూత్రాలను వర్తింపచెయ్యండి
4. మీ పరిశ్రమ కోసం ప్రత్యేక MCP అమలులను అన్వేషించండి
5. బహు-మోడ్‌ల ఇంటిగ్రేషన్ లేదా సంస్థ అనువర్తన ఇంటిగ్రేషన్ వంటి ప్రత్యేక MCP విషయాలపై అధునాతన కోర్సులు తీసుకోవడం గురించి పరిశీలించండి
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) ద్వారా నేర్చుకున్న సూత్రాలతో మీ సొంత MCP పరికరాలు మరియు వర్క్‌ఫ్లోలను బిల్డ్ చేయడానికి ప్రయోగాలు చేయండి

## తదుపరి ఏమిటి

తదుపరి: [కేస్ స్టడీలు](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->