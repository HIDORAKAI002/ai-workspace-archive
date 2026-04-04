# MCP Development Best Practices

[![MCP Development Best Practices](../../../translated_images/my/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Click the image above to view video of this lesson)_

## Overview

ဤသင်ခန်းစာ၌ MCP ဆာဗာများနှင့် features များကို production ပတ်ဝန်းကျင်များတွင် တည်ဆောက်၊ စစ်ဆေးနှင့် ဖြန့်ချိရာတွင် ရှိသော အဆင့်မြင့် အကောင်းဆုံး လုပ်ထုံးလုပ်နည်းများကို အာရုံစိုက်ပြသသည်။ MCP စနစ်များသည် တိုင်းပြည်တိုးတက်လာပြီး အရေးပါမှုများပြားလာသည့်အခါ ကျင့်သုံးနည်းများသည် ယုံကြည်စိတ်ချရမှု၊ ပြုပြင်ထိန်းသိမ်းနိုင်မှုနှင့် အပြန်အလှန် ဆက်သွယ်နိုင်မှုတို့ကို သေချာစေရန် အရေးပါသည်။ ဤသင်ခန်းစာသည် MCP အကောင်အထည်ဖော်မှုများမှ ရရှိသော အတွေ့အကြုံဆိုင်ရာ ဗဟုသုတများကို စုစည်း၍ တည်ငြိမ်၍ ထိရောက်သော ဆာဗာများ၊ အရင်းအမြစ်များ၊ prompt များနှင့် ကိရိယာများကို ဖန်တီးရာတွင် ဦးဆောင်လမ်းညွှန်ပေးသည်။

## Learning Objectives

ဤသင်ခန်းစာ၏ အဆုံးတွင် သင်မှာ အောက်ပါအရာများကို နားလည်အသုံးချနိုင်ပါမည်-

- MCP ဆာဗာနှင့် features ဒီဇိုင်းတွင် စက်မှုလုပ်ငန်း၏ အကောင်းဆုံးကျင့်သုံးနည်းများ ထည့်သွင်းအသုံးပြုခြင်း
- MCP ဆာဗာများအတွက် စုံလင်သော စစ်ဆေးခြင်း မဟာဗျူဟာများ ဖန်တီးနိုင်ခြင်း
- စွမ်းဆောင်ရည်မြင့် MCP အပလီကေးရှင်းများအတွက် ထိရောက်ပြီး ပြန်လည်အသုံးပြုနိုင်သော Workflow patterns များ ဒီဇိုင်းဆွဲခြင်း
- MCP ဆာဗာများအတွင်း မှားယွင်းမှုများကို ဖြေရှင်းခြင်း၊ မှတ်တမ်းတင်ခြင်းနှင့် ကြည့်ရှုခြင်း ကို မှန်ကန်စွာ ဆောင်ရွက်ခြင်း
- စွမ်းဆောင်ရည်၊ လုံခြုံမှုနှင့် ပြုပြင်ထိန်းသိမ်းမှုအတွက် MCP ကို 최적화 ပြုလုပ်ခြင်း

## MCP Core Principles

အထူး implementation ကျင့်သုံးနည်းများကို ဆက်လက်ရှုမည့်အတွက် MCP ဖွံ့ဖြိုးတိုးတက်မှု အတွက် လမ်းညွှန်သော အခြေခံသဘောတရားများကို နားလည်ထားသင့်သည်-

1. **စံနှုန်းတကျ ဆက်သွယ်မှု**: MCP သည် JSON-RPC 2.0 ကို အခြေခံပြီး အချက်ပေး၊ တုံ့ပြန်ခြင်းနှင့် မှားယွင်းမှုကို ဆက်တိုက်တမ်းတပြိုင်နက် စံချိန်တမ်းအားဖြင့် အသုံးပြုပါသည်။

2. **အသုံးပြုသူ ဦးစားပေး ဒီဇိုင်း**: MCP implementation တွင် အသုံးပြုသူ၏ သဘောတူညီမှု၊ ထိန်းချုပ်မှု နှင့် ပြတ်သားမှုကို အမြဲ ဦးစားပေးပါ။

3. **လုံခြုံရေး အရင်ဆုံး**: အတည်ပြုခြင်း၊ ခွင့်ပြုခြင်း၊ တန်မှတ်ချက်စစ်ဆေးခြင်းနှင့် မျှသာ သတ်မှတ်ထားသော အားလုံးကန့်သတ်ချက်များကို ရေရှည် ခိုင်မာသော လုံခြုံရေး နည်းလမ်းများဖြင့် တည်ဆောက်ပါ။

4. **ပိုင်းစိတ်ထားသော ဖွဲ့စည်းတည်ဆောက်မှု**: MCP ဆာဗာကို တစ်စိတ်တစ်ပိုင်း အနေဖြင့် ဒီဇိုင်းဆွဲပြီး ကိရိယာနှင့် အရင်းအမြစ်တိုင်းသည် ဖော်ပြထားသော ရည်ရွယ်ချက်ရှင်းလင်းမှုရှိစေရန် ပြုလုပ်ပါ။

5. **အခြေနေထားချိတ်ဆက်မှုများ**: MCP ၏ အချက်အလက်တောင်းဆိုမှုများအတွင်း မျိုးစုံ လုပ်ဆောင်ချက်များအပေါ် အခြားအချက်အလက်များကို တစ်ဦးနောက်တစ်ဦး ဆက်ခံထား သွားနိုင်စေရန် အခြေခံထားသည်။

## Official MCP Best Practices

အောက်ပါအကောင်းဆုံးကျင့်သုံးနည်းများကို Model Context Protocol အတည်ပြုစာတမ်းမှ ရယူထားသည်-

### Security Best Practices

1. **အသုံးပြုသူ သဘောတူညီမှုနှင့် ထိန်းချုပ်မှု**: ဒေတာ အသုံးပြုခွင့်အား ရှင်းလင်းရှိပြီး အသုံးပြုခွင့် ရရှိမှသာ မည်သည့် operation မတိုင်းကိုမဆို ပြုလုပ်ရန် လိုအပ်သည်။ မည်သည့် ဒေတာ များကို မည်သူချမှတ်နိုင်ပြီး မည်သည့် လုပ်ဆောင်မှုများ ခွင့်ပြုထားသည်ကို သေချာ ရှင်းလင်း ထားရမည်။

2. **ဒေတာ ပုဂ္ဂလိကရေး**: အသုံးပြုသူ၏ သဘောတူညီမှုရရှိမှသာ ဒေတာ ပြသပေးကာ အကာအကွယ်များအတွင်း ထိန်းသိမ်းရန်။ ခွင့်မရှိ ဒေတာ ပေးပို့မှုမှ ကာကွယ်ရန်။

3. **ကိရိယာ လုံခြုံရေး**: မည်သည့်ကိရိယာကို အသုံးပြုမည်ဆို တစ်ဦးချင်း အသုံးပြုသူ၏ သဘောတူညီမှု ရရှိရန် လိုအပ်သည်။ တစ်ခုချင်း၏ လုပ်ဆောင်ချက်များကို အသုံးပြုသူ နားလည်ပြီး လုံခြုံစွာ ကန့်သတ်ထားခြင်း။

4. **ကိရိယာ ခွင့်ပြုမှု ထိန်းချုပ်မှု**: မိုဒယ်တစ်ခုကို ရက်တာတစ်ခုအတွင်း အသုံးပြုခွင့် ရရှိထားသော ကိရိယာများကို သတ်မှတ်ရန်။

5. **အတည်ပြုခြင်း**: ကိရိယာ၊ အရင်းအမြစ်များ သို့မဟုတ် တူးတွဲ လုပ်ဆောင်ချက် အရန် လုံခြုံစိတ်ချရသော ဝင်ရောက်ခွင့် ရရှိရန် API key, OAuth token များ သုံးပြီး သင့်တင့်သော အတည်ပြုခြင်း ပုံစံများကို ချမှတ်ပါ။

6. **ပါရာမီတာ စစ်ဆေးမှု**: ကိရိယာ အသုံးပြုမှုတိုင်းကို အမှားမရှိစေဖို့၊ မဟုတ်ကောင်းတဲ့ ထည့်သွင်းချက်မှ ကာကွယ်ရန် အပြည့်အစုံ စစ်ဆေးမှု လုပ်ပါ။

7. **နှုန်းထားကန့်သတ်မှု**: ဆာဗာ အရင်းအမြစ်များကို ျဖန့်ဝေရန် ချိုးဖောက်မှုမှကာကွယ်ပြီး သင့်တော်သော အသုံးပြုမှုကို သေချာစေပါ။

### Implementation Best Practices

1. **စွမ်းရည် ညှိနှိုင်းမှု**: ချိတ်ဆက်ခြင်း အစအဆင့်တွင် အားပေး features များ၊ protocol ဗားရှင်းများ၊ အသုံးပြုနိုင်သော ကိရိယာနှင့် အရင်းအမြစ်များအကြောင်း ဖြန့်ဝေကြပါ။

2. **ကိရိယာ ဒီဇိုင်း**: အလုပ်သီးသန့် အတိအကျ ပြုလုပ်၍ ခွဲခြား ဆောင်ရွက်သည့် ကိရိယာများ ဖန်တီးပါ၊ မတူညီသော တာဝန်များဖြေရှင်းသည့် ကိရိယာ တစ်ခုတည်း မဟုတ်ရ။

3. **မှားယွင်းမှု ဖြေရှင်းမှု**: ပြဿနာ ရှာဖွေရန်၊ အစွန်းရောက်မှုများကို ထိရောက်စွာ ကိုင်တွယ်ရန် နှင့် လိုက်လျောညီမှုရှိသော ပြန်လည်သတိပေးချက်များ ပေးရန် စံနှုန်းတကျ အမှားစာကို ပေးပါ။

4. **မှတ်တမ်းတင်ခြင်း**: auditing, debugging, protocol ဆက်ဆံရေးများ စောင့်ကြည့်ရန် ဖော်ပြမှုတကျ လုပ်ထားသော log များကို ညှိနှိုင်းပါ။

5. **တိုးတက်မှု စောင့်ကြည့်မှု**: အချိန်ကြာရှည် လုပ်ငန်းဆောင်တာ များအတွက် တိုးတက်မှု အခြေအနေများ ကြေညာ ပေးကာ အသုံးပြုသူ အင်တာဖေ့စ်ကို တုံ့ပြန်နိုင်စေပါ။

6. **တောင်းဆိုမှု ဖျက်သိမ်းခြင်း**: အသုံးပြုသူများသည် မလိုအပ်တော့သော သို့မဟုတ် ကြာရှည်နေသော အကြောင်းကြားချက်များကို ဖျက်သိမ်းနိုင်ဖို့ ခွင့်ပြုပါ။

## Additional References

MCP အကောင်းဆုံးကျင့်သုံးနည်းများအတွက် နောက်ဆုံးအသိပညာများ ရယူလိုပါက-

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - လုံခြုံရေး ရင်းမြစ်နှင့် ကာကွယ်မှုများ
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - လက်တွေ့ လုံခြုံရေး သင်တန်း

## Practical Implementation Examples

### Tool Design Best Practices

#### 1. Single Responsibility Principle

MCP ကိရိယာ တစ်ခုချင်းစီတွင် ရည်ရွယ်ချက် သေချာ ပြတ်သားစေသင့်သည်။ အလုပ် အနှစ်သက် မပါဘဲ မတူညီသော အရာများ ကိုင်တွယ်သော ကိရိယာကြီးများ ဖန်တီးခြင်းမပြုဘဲ တစ်ခုချင်းစီ အထူးပြုလုပ်ထားသော ကိရိယာများ ဖန်တီးပါ။

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

သတိပေးချက်များ ရှင်းလင်းပြီး ပြန်လည်ကောင်းမွန်စွာ ကုစားနိုင်သော error handling ကို ပြုလုပ်ပါ။

```python
# အပြည့်အစုံ အမှားကိုင်တွယ်မှုနှင့် Python ဥပမာ
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # ပါရာမီတာအတည်ပြုမှု
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # လုံခြုံရေးအတည်ပြုမှု
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # ဝက်ဘ်ဆာဗာနဲ့တိုင်အချိန်ကို ချိန်ညှိထားပြီး ဒေတာဘေ့စ် လည်ပတ်မှု
                async with timeout(10):  # ၁၀ စက္ကန့် တိုင်အချိန်
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # ချိတ်ဆက်မှုအမှားများသည် ခွဲခြားသက်တမ်းပေါ်မူတည်နိုင်သည်
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # အမေးအဖြေ အမှားများသည် ဖောက်သည်မှ ဖြစ်နိုင်သည်
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # ကိရိယာကိုယ်ပိုင် အမှားများကို ဖြတ်သွားစေပါ
            raise
        except Exception as e:
            # မမျှော်လင့်ထားသော အမှားများကို ဖမ်းယူခြင်း
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL ထိုးထွင်းမှု စစ်ဆေးရေး အကောင်အထည်ဖော်မှု
        pass
        
    def _log_error(self, message, error):
        # အမှားမှတ်တမ်းရေးရန် အကောင်အထည်ဖော်မှု
        pass
```

#### 3. Parameter Validation

အမှား မြည်သော သို့မဟုတ် နစ်နာရောဂါသည့် input များ ရောက်ရှိရန် မဖြစ်စေရန် ပါရာမီတာများကို အမြဲ စစ်ဆေးပါ။

```javascript
// JavaScript/TypeScript နမူနာ၊ အသေးစိတ်ပါးပါး ပါရာမီတာ စစ်ဆေးခြင်းနှင့်အတူ
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
    // 1. ပါရာမီတာ တက်ရှိမှုကို စစ်ဆေးပါ
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. ပါရာမီတာ အမျိုးအစားများကို စစ်ဆေးပါ
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. ပါရာမီတာ တန်ဖိုးများကို စစ်ဆေးပါ
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. ရေးသားမှု လုပ်ငန်းအတွက် အကြောင်းအရာတက်ရှိမှုကို စစ်ဆေးပါ
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. လမ်းကြောင်းလုံခြုံမှု စစ်ဆေးမှု
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // စစ်ဆေးပြီး ပါရာမီတာများအပေါ် မူတည်၍ အကောင်အထည်ဖော်ခြင်း
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // လမ်းကြောင်းလုံခြုံမှု စစ်ဆေးမှု အကောင်အထည်ဖော်ခြင်း
    // ...
  }
}
```

### Security Implementation Examples

#### 1. Authentication and Authorization

```java
// အတည်ပြုခြင်းနှင့် ခွင့်ပြုချက်ပေးခြင်းပါဝင်သော Java နမူနာ
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // မူပိုင်ခွင့်ထည့်သွင်းခြင်း
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
        // ၁။ အတည်ပြုခြင်း အကြောင်းအရာကို ခွဲထုတ်ပါ
        String authToken = request.getContext().getAuthToken();
        
        // ၂။ အသုံးပြုသူကို အတည်ပြုပါ
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // ၃။ သတ်မှတ်ထားသော လုပ်ငန်းစဉ်အတွက် ခွင့်ပြုချက်ကို စစ်ဆေးပါ
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // ၄။ ခွင့်ပြုထားသော လုပ်ငန်းစဉ်ဖြင့် ဆက်လက်လုပ်ဆောင်ပါ
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

သင့်ကိရိယာများကို သီးခြားစမ်းသပ်ပြီး အပြင်Dependencies များကို မော်ကွန်းလုပ်ပါ-

```typescript
// TypeScript နမူနာအဖြစ်ကိရိယာယူနစ်စမ်းသပ်မှု
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // မိုက်ခ်ဖောက်လှမ်းရာ မိုးလေဝသဝန်ဆောင်မှု တစ်ခုဖန်တီးပါ
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // မိုက်ခ်မီဆ်ကြောင့် ကိရိယာကို ဖန်တီးပါ
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // စီစဉ်သည်
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // လုပ်ဆောင်သည်
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // အတည်ပြုသည်
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // စီစဉ်သည်
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // လုပ်ဆောင်ခြင်းနှင့် အတည်ပြုခြင်း
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integration Testing

Client တောင်းဆိုမှုများမှ ဆာဗာ တုံ့ပြန်မှုများသို့ အလုပ်လည်ပတ်မှု အားလုံးကို စမ်းသပ်ပါ-

```python
# Python ပေါင်းစည်းစမ်းသပ်မှု ဥပမာ
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # စမ်းသပ်မှုဆာဗာကို စတင်ရန်
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # client တစ်ခု ဖန်တီးရန်
        client = McpClient("http://localhost:5000")
        
        # ကိရိယာရှာဖွေမှု စမ်းသပ်ရန်
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # ကိရိယာအလုပ်လုပ်မှု စမ်းသပ်ရန်
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # တုံ့ပြန်မှုကို အတည်ပြုရန်
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # သန့်ရှင်းရေးလုပ်ရန်
        await server.stop()
```

## Performance Optimization

### 1. Caching Strategies

ကျယ်ပြန့်သည့် တုံ့ပြန်မှု အချိန် လျှော့ချပွားရန် နှင့် အရင်းအမြစ် အသုံးပြုမှု လျော့ချရန် သင့်တော်သော cache ကို အသုံးပြုပါ-

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

ကိရိယာများကို constructor injection ဖြင့် အခြေခံနိုင်ရန် ဒီဇိုင်းဆွဲပြီး စမ်းသပ်ရန် နေရာရစေပါ-

```java
// Dependency injection ကို အသုံးပြုသော Java ဥပမာ
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Constructor မှတဆင့် ကြိုးပမ်းချိတ်ဆက်မှုများ ထည့်သွင်းထားသည်
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // ကိရိယာ အကောင်အထည်ဖော်မှု
    // ...
}
```

#### 3. Composable Tools

ပိုပြီးရှုပ်ထွေးသော workflow များ ဖန်တီးနိုင်ရန် ကိရိယာများကို ပေါင်းစည်းအသုံးပြုနိုင်စေရန် ဒီဇိုင်းဆွဲပါ-

```python
# Python ဥပမာ - ပေါင်းစပ်အသုံးပြုနိုင်သော ကိရိယာများ ပြသခြင်း
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # အကောင်အထည်ဖော်ခြင်း...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # ဤကိရိယာသည် dataFetch ကိရိယာမှ ရလာဒ်များကိုအသုံးပြုနိုင်သည်
    async def execute_async(self, request):
        # အကောင်အထည်ဖော်ခြင်း...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # ဤကိရိယာသည် dataAnalysis ကိရိယာမှ ရလာဒ်များကိုအသုံးပြုနိုင်သည်
    async def execute_async(self, request):
        # အကောင်အထည်ဖော်ခြင်း...
        pass

# ဤကိရိယာများကို လွတ်လပ်စွာ သုံးနိုင်သလို workflow ၏ အစိတ်အပိုင်းအဖြစ်လည်း အသုံးပြုနိုင်သည်
```

### Schema Design Best Practices

Schema သည် မိုဒယ်နှင့် သင့်ကိရိယာတို့အကြား စာချုပ်တစ်ခုဖြစ်သည်။ အကောင်းဆုံး schema များသည် ကိရိယာ အသုံးပြုမှုကို ပိုမိုကောင်းမွန်စေပါသည်။

#### 1. Clear Parameter Descriptions

ပါရာမီတာတိုင်းအတွက် ဖော်ပြချက် အပြည့်အစုံပါရှိစေရန်-

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

မမှန်ကန်သော input များအားကာကွယ်နိုင်ရန် စစ်ဆေးမှု ကန့်သတ်ချက်များထည့်ပါ-

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ပုံစံစစ်ဆေးမှုဖြင့် အီးမေးလ် အင်္ဂါရပ်
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // နံပါတ် ကြောင့် အဓိပ္ပါယ်သတ်မှတ်ထားသော အသက် အင်္ဂါရပ်
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // ရွေးချယ်ထားသော အင်္ဂါရပ်
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

မိုဒယ်များ အတွက် ရလဒ် အသိအမှတ်ပြုရ အဆင်ပြေစေရန် ပြန်လည်ပေးပုံများကို တစဉ်တည်းထားပါ-

```python
async def execute_async(self, request):
    try:
        # တောင်းဆိုမှုကို အလုပ်လုပ်ပါ
        results = await self._search_database(request.parameters["query"])
        
        # အမြဲတမ်း တူညီသော ဖွဲ့စည်းမှုကို ပြန်လည်ပေးပါ
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

MCP ကိရိယာများ အတွက် ယုံကြည်စိတ်ချရမှု ပြန်လည်ထူထောင်ရန် အမှားစနစ်တကျ ကောင်းမွန်စွာ ဖြေရှင်းရမည်။

#### 1. Graceful Error Handling

အမှားများကို ပြဿနာလျော့ပါးစေရန် အသင့်တော်တဲ့ အဆင့်များတွင် ကိုင်တွယ်ပြီး သတိပေးစာများ ဖော်ပြပါ-

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

အပြည့်အစုံ error မှတ်တမ်းများ ပြန်ပေးနိုင်ပါက သာမန် error message ထက်ပိုကောင်းသည်-

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // အကောင်အထည်ဖော်ခြင်း
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
        
        // အခြားသော exception များကို ToolExecutionException အဖြစ် ထပ်မံပစ်ပေးခြင်း
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Retry Logic

တစ်ခါခါဖြစ်နိုင်သော အတိုကြာပြန်လည်ပြင်ဆင်မှုများအတွက် retry logic ကို ထည့်သွင်းပါ-

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # စက္ကန့်များ
    
    while retry_count < max_retries:
        try:
            # အပြင် API ကိုခေါ်ရန်
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # အဆင့်တိုးနည်း ပြန်ကြိုးပမ်းမှု
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # သက်တမ်းမကုန်သော အမှား၊ ပြန်ကြိုးမပမ်းပါနဲ့
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Performance Optimization

#### 1. Caching

စျေးကြီးပြီး လုပ်ဆောင်ရခက်သော ဖောင်ရှင်များအတွက် cache ကို အသုံးပြုပါ-

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

I/O ခက်ခဲမှုရှိသောလုပ်ငန်းများအတွက် asynchronous programming နည်းလမ်းများ အသုံးပြုပါ-

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // ရေရှည်တိုးနေသော လုပ်ဆောင်မှုများအတွက်၊ လုပ်ဆောင်မှု ID ကို ချက်ချင်းပြန်ပေးပါ
        String processId = UUID.randomUUID().toString();
        
        // အဆင့်မြှင့် async လုပ်ဆောင်မှုကို စတင်ပါ
        CompletableFuture.runAsync(() -> {
            try {
                // ရေရှည်တိုးနေသော လုပ်ဆောင်မှုကို ဆောင်ရွက်ပါ
                documentService.processDocument(documentId);
                
                // အခြေအနေကို အပ်ဒိတ်လုပ်ပါ (သာမန္အားဖြင့် ဒေတာဘေ့စ်ထဲတွင် သိမ်းဆည်းထားသည်)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // လုပ်ဆောင်မှု ID ဖြင့် ချက်ချင်းတုံ့ပြန်ချက် ပေးပါ
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // မိတ်ဖက်အခြေအနေ စစ်ဆေးရေးကိရိယာ
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

ပိုလွန်သော လုပ်ဆောင်မှုကြောင့် ဆာဗာ ပုံမှန်လုပ်ဆောင်မှု ထိခိုက်မှုမဖြစ်အောင် resource throttling ကို ဆောင်ရွက်ပါ-

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # စက္ကန့်တိုင်း ၅ ခုတောင်းဆိုခွင့် ပြုသည်
            bucket_size=10        # တောင်းဆိုမှု ၁၀ ခုအထိ တစ်ပြိုင်နက်တင်ခွင့်ပြုသည်
        )
    
    async def execute_async(self, request):
        # ဆက်လက်လုပ်ဆောင်နိုင်မလား သို့မဟုတ် စောင့်ဆိုင်းရမလား စစ်ဆေးပါ
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # စောင့်ဆိုင်းချိန် ရှည်လွန်နေပါက
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # သင့်တော်သော မှီကာချိန်အထိ စောင့်ဆိုင်းပါ
                await asyncio.sleep(delay)
        
        # တိုကင်တစ်ခု သုံးပြီး တောင်းဆိုမှု ဆက်လက်လုပ်ဆောင်ပါ
        self.rate_limiter.consume()
        
        # API ကို ခေါ်ယူပါ
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
            
            # နောင်တစ်ကြိမ်တိုကင်ရရှိရန် ကျန်ချိန်ကို တွက်ချက်ပါ
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # ဖြတ်သန်းခဲ့သောအချိန်အရ နယူးတိုကင်များကို ထည့်သွင်းပါ
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Security Best Practices

#### 1. Input Validation

အချက်အလက်များကို သေချာစွာ စစ်ဆေးပါ-

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

မှန်ကန်သော ခွင့်ပြုချက် စစ်ဆေးမှုများပြုလုပ်ပါ-

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // တောင်းဆိုမှုမှ အသုံးပြုသူစနစ်အခြေအနေကို ရယူပါ
    UserContext user = request.getContext().getUserContext();
    
    // အသုံးပြုသူတွင် လိုအပ်သော ခွင့်ပြုချက်များ ရှိမရှိ စစ်ဆေးပါ
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // သတ်မှတ်ထားသော အရင်းအမြစ်များအတွက်၊ ထိုအရင်းအမြစ်သို့ ဝင်ရောက်ခွင့်ရှိမရှိ စစ်ဆေးပါ
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // ကိရိယာ အကောင်အထည်ဖော်မှု ဆက်လက်လုပ်ဆောင်ပါ
    // ...
}
```

#### 3. Sensitive Data Handling

အရေးကြီးသော ဒေတာများကို သေချာစွာ ကျောမွမ်းထိန်းသိမ်းပါ-

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
        
        # အသုံးပြုသူဒေတာကိုရယူပါ
        user_data = await self.user_service.get_user_data(user_id)
        
        # ထူးခြားစိတ်ဝင်စားဖွယ်အားလုံးကို တောင်းဆိုခြင်းနှင့် ခွင့်ပြုထားသည်မှသာ စစ်ထုတ်ပါ
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # တောင်းဆိုမှုအခြေအနေတွင် ခွင့်ပြုမှုအဆင့်ကို စစ်ဆေးပါ
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # မူရင်းကို ပြောင်းလဲခြင်းမှ ကာကွယ်ရန် မိတ္တူတစ်ခု ဖန်တီးပါ
        redacted = user_data.copy()
        
        # ထူးခြားစိတ်ဝင်စားဖွယ် အကြောင်းအရာများကို ဖျက်စီးပါ
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # အတွင်းထဲရှိ ထူးခြားစိတ်ဝင်စားဖွယ် ဒေတာများကို ဖျက်စီးပါ
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Testing Best Practices for MCP Tools

စုံလင်သော စမ်းသပ်မှုများက MCP tools များမှန်ကန်စွာ လုပ်ဆောင်နိုင်ခြင်း၊ အထွေထွေကိစ္စများကို ကိုင်တွယ်နိုင်ခြင်းနှင့် စနစ်နှင့် ပေါင်းစပ်မှု မှန်ကန်မှု အားလုံးကို သေချာစေပါသည်။

### Unit Testing

#### 1. Test Each Tool in Isolation

ကိရိယာ တစ်ခုချင်းစီ၏ လုပ်ဆောင်ချက်များအတွက် အာရုံစိုက်စမ်းသပ်မှုများ ဖန်တီးပါ-

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

Schema များသည် မှန်ကန်ပြီး ကန့်သတ်ချက်များကို မှန်ကန်စွာ လုပ်ဆောင်နိုင်ရေး စမ်းသပ်ပါ-

```java
@Test
public void testSchemaValidation() {
    // ကိရိယာအထွက်ကိုဖန်တီးပါ
    SearchTool searchTool = new SearchTool();
    
    // စကီးမားကိုယူပါ
    Object schema = searchTool.getSchema();
    
    // စကီးမားကိုအတည်ပြုရန် JSON အဖြစ်ပြောင်းပါ
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // စကီးမားသည်တရားဝင် JSONSchema ဖြစ်ကြောင်းအတည်ပြုပါ
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // တရားဝင်ပါရာမီတာများကိုစမ်းသပ်ပါ
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // လိုအပ်သောပါရာမီတာပျောက်ဆုံးနေမှုကိုစမ်းသပ်ပါ
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // အကြောင်းမဲ့ပါရာမီတာအမျိုးအစားကိုစမ်းသပ်ပါ
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Error Handling Tests

အမှား ဖြစ်ရာနေရာများအတွက် ပိုမိုသီးခြားစမ်းသပ်မှုများ ဖန်တီးပါ-

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # စီစဉ်ပါ
    tool = ApiTool(timeout=0.1)  # အချိန်ကုန်သက်တမ်းအလွန်တိုတောင်းသည်
    
    # အချိန်ကုန်လွန်မည့် တောင်းဆိုမှုကို မော်ခ်လုပ်ပါ
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # အချိန်ကုန်သက်တမ်းထက် ကြာရှည်သည်
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # လုပ်ဆောင်ပြီး သေချာစစ်ဆေးပါ
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # exception မက်ဆေ့ကို စစ်ဆေးပါ
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # စီစဉ်ပါ
    tool = ApiTool()
    
    # အမြန်နှုန်းကန့်သတ်ချက်ရှိသည့် တုံ့ပြန်မှုကို မော်ခ်လုပ်ပါ
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
        
        # လုပ်ဆောင်ပြီး သေချာစစ်ဆေးပါ
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # exception တွင် အမြန်နှုန်းကန့်သတ်ချက်အချက်အလက်ပါဝင်ပါသည်ကို စစ်ဆေးပါ
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integration Testing

#### 1. Tool Chain Testing

မျှော်မှန်းထားသည့် ပေါင်းစပ်ကို အသုံးပြုပြီး ကိရိယာများ ပူးပေါင်းလုပ်ဆောင်မှုများ ကို စမ်းသပ်ပါ-

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

အပြည့်အစုံ ကိရိယာ မှတ်ပုံတင်ခြင်းနဲ့ လုပ်ဆောင်မှုအတွက် MCP ဆာဗာကို စမ်းသပ်ပါ-

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
        // ရှာဖွေရေးအဆုံးအဖြတ်ကို စမ်းသပ်ပါ
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // ကိရိယာ တောင်းဆိုမှုအား ဖန်တီးပါ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // တောင်းဆိုချက် ပို့ပြီး အဖြေကို အတည်ပြုပါ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // မှားယွင်းသော ကိရိယာ တောင်းဆိုမှု ဖန်တီးပါ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" ပါရာမီတာ ပျောက်နေပါသည်
        request.put("parameters", parameters);
        
        // တောင်းဆိုချက် ပို့ပြီး အမှား ဖြစ်ပေါ်မှုအဖြေကို အတည်ပြုပါ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-End Testing

မော်ဒယ် prompt မှ ကိရိယာ အကောင်အထည်ဖော်ခြင်းအထိ စီးရီးလုံး လုပ်ငန်းစဉ်များ စမ်းသပ်ပါ-

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # စီစဉ်ခြင်း - MCP client နှင့် မော်ဒယ် မော်က့်များကို သတ်မှတ်ခြင်း
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # မော်ဒယ် မော်က့်တုံ့ပြန်ချက်များ
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
    
    # မိုးလေဝသကိရိယာ တုံ့ပြန်ချက် မော်က့်
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
        
        # အက်ဆက် (လုပ်ဆောင်ခြင်း)
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # အတည်ပြုခြင်း
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Performance Testing

#### 1. Load Testing

MCP ဆာဗာမှ တစ်ပြိုင်နက် တောင်းဆိုချက်သုံးစွဲသူ အရေအတွက်ကို စမ်းသပ်ပါ-

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

စနစ်အား အလွန်အထူး ပန့်ပယ်မှု (load) အောက်တွင် စမ်းသပ်ပါ-

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // စနစ်ဖိအားစမ်းသပ်မှုအတွက် JMeter ကို စတင်ပြင်ဆင်ပါ
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter စမ်းသပ်မှုအစီအစဉ်ကို ပြင်ဆင်ပါ
    HashTree testPlanTree = new HashTree();
    
    // စမ်းသပ်မှုအစီအစဉ်၊ thread group၊ samplers စသည်ဖြင့် ပြုလုပ်ပါ
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // ကိရိယာရှိ HTTP sampler ကို ထည့်ပါ
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // နားထောင်သူများထည့်ပါ
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // စမ်းသပ်မှုကို ဖြင့်ပါ
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // ရလဒ်များကို စစ်ဆေးသေချာပါ
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // ပျမ်းမျှတုံ့ပြန်မှုအချိန် < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90th percentile < 500ms
}
```

#### 3. Monitoring and Profiling

ရှည်လျားမည့် စွမ်းဆောင်ရည် ခွဲခြမ်းစိတ်ဖြာမှုနှင့် စောင့်ကြည့်မှု အစီအစဉ်များ ချမှတ်ပါ-

```python
# MCP ဆာဗာအတွက် မွန်နီတာလုပ်ရန် စီစဉ်ပါ
def configure_monitoring(server):
    # Prometheus များအတွက် မက်ထရစ်များ သတ်မှတ်ပါ
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
    
    # အချိန်ကြာမြင့်မှုနှင့် မက်ထရစ်များ မှတ်တမ်းတင်ရန် middleware ထည့်ပါ
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # မက်ထရစ်များ အဆုံးခန်းကို ဖော်ပြပါ
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP Workflow Design Patterns

အဆင်ပြေ၊ ယုံကြည်စိတ်ချရမှုရှိပြီး ထိန်းသိမ်းထိန်းချုပ်ရလွယ်သော MCP workflow များ ဖန်တီးရာတွင် အရေးပါသော patterns များအောက်တွင်ရှိသည်-

### 1. Chain of Tools Pattern

ကိရိယာအများအပြားကို တစ်စိတ်တစ်ပိုင်း စဉ်ဆက်တိုက် ချိတ်ဆက်ပါ၊ တစ်ခု၏ ထုတ်ကုန်သည် နောက်တစ်ခု၏ input ဖြစ်ပါစေ-

```python
# Python Chain of Tools တည်ဆောက်မှု
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # အဆက်လိုက် အလုပ်လုပ်ရန် ကိရိယာအမည်စာရင်း
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # စပ်ဆက်ထားသော ကိရိယာတိုင်းကို အလုပ်လုပ်စေပြီး ယခင်ရလဒ်ကို ပေးပို့ပါ
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # ရလဒ်ကို သိမ်းဆည်းပြီး နောက်ထပ်ကိရိယာအတွက် ထည့်သွင်းဖြစ်အောင် အသုံးပြုပါ
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# ตัวอย่างการใช้งาน
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

ထိပ်တန်းကိရိယာတစ်ခု အသုံးပြုပြီး input တစ်ခုအပေါ် မူတည်ကာ အထူးပြု ကိရိယာများ သို့ ဖြန့်ဝေပါ-

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

ထိရောက်မှုအတွက် ကိရိယာများ ကို တပြိုင်နက်မှာ လုပ်ဆောင်ပါ-

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // အဆင့် ၁: ဒေတာစုစည်းမှု မိုက်တက်ဒေတာကို ယူပါ (အစဉ်အလာအတိုင်း)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // အဆင့် ၂: သွင်ပြင်ဆင်ခြင်းများကို 병렬ဖြင့် စတင်ပြုလုပ်ပါ
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
        
        // 병렬လုပ်ငန်းအားလုံးပြီးဆုံးသည်အထိ စောင့်ဆိုင်းပါ
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // ပြီးဆုံးမှုအထိ စောင့်ဆိုင်းပါ
        
        // အဆင့် ၃: ရလဒ်များ ပေါင်းစပ်ပါ
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // အဆင့် ၄: အကျဉ်းချုပ်အစီရင်ခံစာ ထုတ်လုပ်ပါ
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // အပြည့်အစုံ လုပ်ငန်းစဉ်ရလဒ်ကို ပြန်လည်ပေးပါ
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Error Recovery Pattern

ကိရိယာများ ပျက်စီးမှုဖြစ်ပါက ကြယ်ပွင့် ယူပေးခြင်းဖြင့် ပြန်လည်ကောင်းမွန်စေပါ-

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # ပထမဆုံး အဓိကကိရိယာကို စမ်းကြည့်ပါ
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # အချက်အလက္ ပြတ်တင်းမှုကို မှတ်တမ်းတင်ပါ
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # ဒုတိယ ကိရိယာသို့ ပြန်လည်ရောက်ပါ
            try:
                # ပြန်လည်အသုံးပြုမည့် ကိရိယာအတွက် အချက်အလက်များကို ပြောင်းလဲရန် လိုအပ်နိုင်သည်
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # ကိရိယာ နှစ်ခုလုံး မအောင်မြင်ပါ
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # ဒီအကောင်အထည်ဖော်မှုသည် အထူးသီး သန့် ကိရိယာများပေါ် မူတည်နိုင်သည်
        # ဤနမူနာတွင် အစစ်အမှန် ပါရာမီတာများကို ပြန်လည်ပေးပို့မည် ဖြစ်သည်
        return params

# ဥပမာ အသုံးပြုမှု
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # ပထမ (ကြေးရှိသော) ရာသီဥတု API
        "basicWeatherService",    # ပြန်လည်အသုံးပြုမှု (အခမဲ့) ရာသီဥတု API
        {"location": location}
    )
```

### 5. Workflow Composition Pattern

ရိုးရိုးလမ်းကြောင်း များကို ပေါင်းစပ်ခြင်းဖြင့် နောက်ဆုံးရလဒ် မှန်ကန်သော ရှုပ်ထွေးသော workflows ဖန်တီးပါ-

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

စစ်ဆေးမှုသည် ယုံကြည်စိတ်ချရပြီး အရည်အသွေးမြင့် MCP ဆာဗာများ ဖွံ့ဖြိုးတိုးတက်မှု အတွက် အရေးကြီးသော အစိတ်အပိုင်းဖြစ်သည်။ ဤ လမ်းညွှန်မှာ unit test မှ စတင်၍ integration test နှင့် end-to-end စစ်ဆေးမှုများ အထိ MCP ဆာဗာ စမ်းသပ်မှုအတွက် စုံလင်သော အကောင်းဆုံးနည်းလမ်းများနှင့် အတော်အသင့် အကြံပြုချက်များ ပါဝင်သည်။

## Why Testing Matters for MCP Servers

MCP ဆာဗာများသည် AI model များနှင့် client application များအကြား အရေးပါသော middleware အဖြစ် တာဝန်ယူသည်။ သေချာစွာ စမ်းသပ်ခြင်းဖြင့်-

- production နေရာများ၌ ယုံကြည်မှုရှိမှု
- တောင်းဆိုမှု နှင့် တုံ့ပြန်မှု များကို မှန်ကန် ကျင့်သုံးမှု
- MCP specification များ အတိုင်း အကောင်အထည်ဖော်မှုမှန်ကန်မှု
- မှားယွင်းမှု နှင့် အထူးကိစ္စများမှ လွတ်မြောက်နိုင်မှု
- ဖောက်ခွဲခြင်းဆိုင်ရာ စွမ်းဆောင်ရည် တည်ငြိမ်မှု

တို့ကို အာမခံပေးသည်။

## Unit Testing for MCP Servers

### Unit Testing (Foundation)

Unit test များအား တစ်စိတ်တစ်ပိုင်း အလိုအလျောက် MCP ဆာဗာ အစိတ်အပိုင်းများကို လေ့လာစစ်ဆေးရန် အသုံးပြုသည်။

#### What to Test

1. **Resource Handlers**: တစ်ခုချင်း resource handler လုပ်ငန်းစဉ်များကို သီးခြား စမ်းသပ်ပါ
2. **Tool Implementations**: ကိရိယာလုပ်ဆောင်ချက်များကို input များစုံစမ်းပီး စစ်ဆေးပါ
3. **Prompt Templates**: prompt template များသည် မှန်ကန်စွာ ဖော်ပြထားချက်ရှိမှု
4. **Schema Validation**: ပါရာမီတာ စစ်ဆေးမှုသိပ္ပံကို စစ်ဆေးပါ
5. **Error Handling**: input မှားယွင်းမှုများအတွက် မှားယွင်းချက် ပြန်ကြားမှု ပြည့်စုံမှု

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
# Python တွင် ကိန်းဂဏန်းတွက်စက်ကိရိယာအတွက် ဥပမာယူနစ်စမ်းသပ်မှု
def test_calculator_tool_add():
    # စီစဉ်မည်
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # လုပ်ဆောင်မည်
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # သေချာစစ်ဆေးမည်
    assert result["value"] == 12
```

### Integration Testing (Middle Layer)

Integration test များသည် MCP ဆာဗာတွင်း မျိုးစုံ အစိတ်အပိုင်းများ ဆက်စပ်မှုကို စမ်းသပ်သည်။

#### What to Test

1. **Server Initialization**: အမျိုးမျိုးသော ပုံစံများဖြင့် ဆာဗာစတင်မှု စမ်းသပ်ပါ
2. **Route Registration**: endpoints အားလုံးအမှန်တည်နေမှု စစ်ဆေးပါ
3. **Request Processing**: တောင်းဆိုမှု- တုံ့ပြန်မှု လည်ပတ်မှု စုစုပေါင်း စမ်းသပ်ပါ
4. **Error Propagation**: အမှားများကို component များအတွင်းမှ ပြန်လည်ဆက်သွယ်မှု စစ်ဆေးပါ
5. **Authentication & Authorization**: လုံခြုံရေး စနစ်များ စမ်းသပ်ပါ

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

End-to-end test များသည် client မှ ဆာဗာအထိ စနစ်တစ်ခုလုံး၏ အပြုအမူကို စစ်ဆေးသည်။

#### What to Test

1. **Client-Server Communication**: တောင်းဆိုမှု-တုံ့ပြန်မှု စနစ်တွဲလုံး စမ်းသပ်ပါ
2. **Real Client SDKs**: အမှန်တကယ် client အသုံးပြုမှု စမ်းသပ်ပါ
3. **Performance Under Load**: မျိုးစုံ တောင်းဆိုမှုများ ရောက်ရှိစဉ် စွမ်းဆောင်ရည်စစ်ဆေးမှု
4. **Error Recovery**: ပြဿနာမဖြစ်နေသော အခြေအနေကို ပြန်လည်ဖော်ထုတ်ခြင်း စမ်းသပ်ပါ
5. **Long-Running Operations**: streaming နှင့် ကြာရှည်သော လုပ်ငန်းစဉ်ကို စစ်ဆေးပါ

#### Best Practices for E2E Testing

```typescript
// TypeScript ဖြင့် client တစ်ခုနှင့် ဥပမာ E2E စမ်းသပ်ချက်
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // စမ်းသပ်မှုပတ်ဝန်းကျင်တွင် server ကို စတင်ပါ
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // လုပ်ဆောင်ပါ
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // အတည်ပြုချက်ပေးပါ
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mocking Strategies for MCP Testing

Mocking သည် စမ်းသပ်မှုအတွင်း component များကို သီးခြားထားပြီး စမ်းသပ်ရာ အသုံးပြုသည်။

### Components to Mock

1. **External AI Models**: predictable စမ်းသပ်မှုအတွက် model response များကို mock လုပ်ပါ
2. **External Services**: APIs, database နှင့် အခြား service များကို mock လုပ်ပါ
3. **Authentication Services**: ကိုယ်ပိုင်သွားလာမှုအတွက် ကွန်တိန်နာများ mock လုပ်ပါ
4. **Resource Providers**: စရိတ်ကြီး resource handler များကို mock လုပ်ပါ

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
# unittest.mock ဖြင့် Python ဥပမာ
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # mock ကို ဆက်တင်ပြုလုပ်ရန်
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # စမ်းသပ်မှုတွင် mock ကို အသုံးပြုရန်
    server = McpServer(model_client=mock_model)
    # စမ်းသပ်မှုကို ဆက်လက်ဆောင်ရွက်ရန်
```

## Performance Testing

Performance testing သည် MCP ဆာဗာများအတွက် မအရေးမကြီးနိုင်သော အချက်ဖြစ်သည်။

### What to Measure

1. **Latency**: တုံ့ပြန်ချိန်
2. **Throughput**: တစ်စက္ကန့်လျှင် ထိန်းသိမ်းနိုင်သော တောင်းဆိုမှု ပမာဏ
3. **Resource Utilization**: CPU, စွမ်းအား မှတ်ဉာဏ် နှင့် ကွန်ယက်အသုံးပြုမှု
4. **Concurrency Handling**: တပြိုင်နက်တောင်းဆိုမှုများ gain ဖြစ်နိုင်မှု စမ်းသပ်
5. **Scaling Characteristics**: Load တိုးလာသည်နှင့်အမျှ စွမ်းဆောင်ရည်

### Tools for Performance Testing

- **k6**: လွတ်လပ်သော load testing tool
- **JMeter**: စုံလင်မှုရှိသည့် performance test tool
- **Locust**: Python အခြေခံ load testing
- **Azure Load Testing**: Cloud based performance test

### Example: Basic Load Test with k6

```javascript
// MCP ဆာဗာအတွက် k6 စမ်းသပ်မှု စာရွက်
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // ၁၀ ဗာချျဝယ်အသုံးပြုသူများ
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

စမ်းသပ်မှုများကို အလိုအလျှောက်လုပ်ခြင်းဖြင့် အရည်အသွေး မပြောင်းလဲဘဲ အမြန် feedback လည်ပတ်မှုကို ရရှိစေပါသည်။

### CI/CD Integration
1. **Pull Requests များတွင် Unit စမ်းသပ်မှုများ လုပ်ဆောင်ရန်**: ကုဒ်ပြင်ဆင်မှုများသည် ယေဘူယျလုပ်ဆောင်မှုများ မပျက်စီးစေစေနိုင်ရန် သေချာစေရန်
2. **Staging တွင် Integration စမ်းသပ်မှုများ**: အသုံးပြုမှုမတိုင်မီ ပတ်ဝန်းကျင်များတွင် Integration စမ်းသပ်မှုများ လုပ်ဆောင်ရန်
3. **လုပ်ဆောင်မှု ဒီဂရီများ ထိန်းသိမ်းခြင်း**: နောက်ပြန်ဘေးနှိုးမှုများ ဖော်ထုတ်ရန် လုပ်ဆောင်မှု များကို တည်ငြိမ်စွာ ထိန်းသိမ်းရန်
4. **စောင့်ကြပ်ရေး စစ်ဆေးမှုများ**: pipeline ၏ အစိတ်အပိုင်းတစ်ခုအဖြစ် လုံခြုံရေး စစ်ဆေးမှုများကို အလိုအလျောက် စနစ်တကျ လုပ်ဆောင်ရန်

### သက်သေ CI Pipeline (GitHub Actions)

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

## MCP စနစ်သတ်မှတ်ချက်နှင့် ကိုက်ညီမှု စစ်ဆေးခြင်း

သင်၏ server သည် MCP စနစ်သတ်မှတ်ချက်ကို မှန်ကန်စွာ ဆောင်ရွက်နေကြောင်း အတည်ပြုပါ။

### အဓိက ကိုက်ညီမှု ဘာသာရပ်များ

1. **API အဆုံးအနောက်များ**: လိုအပ်သော အဆုံးအနောက်များ (/resources, /tools, စသည်) ကို စမ်းသပ်ပါ
2. **တောင်းဆိုမှု/တုံ့ပြန်မှု ဖော်မတ်**: schema ကို ကိုက်ညီမှုအတိုင်း စစ်ဆေးပါ
3. **အမှားကုဒ်များ**: အခြေအနေ မျိုးစုံအတွက် မှန်ကန်သော အခြေအနေကုဒ်များကို အတည်ပြုပါ
4. **အကြောင်းအရာ အမျိုးအစားများ**: အမျိုးမျိုးသော အကြောင်းအရာအမျိုးအစားများကို ကိုင်တွယ်မှု စမ်းသပ်ပါ
5. **အတည်ပြုခြင်း စနစ်**: စနစ်သတ်မှတ်ချက်နှင့် ကိုက်ညီသော authentication မက်ခန်းနစ်များကို အတည်ပြုပါ

### ကိုက်ညီမှု စမ်းသပ်မှု စုံလင်မှု

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

## MCP Server စမ်းသပ်မှု အောင်မြင်ရန် ထိပ်တန်း ၁၀ ချက်

1. **စမ်းသပ်မှုကိရိယာ တွေကို သီးခြားစမ်းသပ်ပါ**: ကိရိယာ တရားဝင် မဟုတ်သော schema သတ်မှတ်ချက်များကို တစ်ကိုယ်တည်း စစ်ဆေးပါ
2. **Parameter များပါဝင်သော စမ်းသပ်မှုများ အသုံးပြုပါ**: အမျိုးမျိုးသော Input များနှင့် အထိပ်တန်း များပါဝင်သော ပုံသေနည်းများဖြင့် ကိရိယာများကို စမ်းသပ်ပါ
3. **အမှားတုံ့ပြန်မှုများကို စစ်ဆေးပါ**: ဖြစ်နိုင်သော အမှား အခြေအနေများအားလုံးအတွက် မှန်ကန်သော အမှား ကိုင်တွယ်မှုရှိစေရန်စမ်းသပ်ပါ
4. **ခွင့်ပြုခွင့် စနစ် စမ်းသပ်ပါ**: အသုံးပြုသူ အဆင့်အတန်း အမျိုးမျိုးကို မွေးမြူသော လုံခြုံရေး ထိန်းချုပ်မှုရှိမရှိ အတည်ပြုပါ
5. **စမ်းသပ်မှု ဖုံးလွှမ်းမှုကို စောင့်ကြည့်ပါ**: အရေးကြီးသော ကုဒ် လမ်းကြောင်းများမှ အမြင့်ဆုံး ဖုံးလွှမ်းမှု ရရှိရန် ကြိုးစားပါ
6. **ထွက်ပေါက်ရေစီးတုံ့ပြန်မှုများ စမ်းသပ်ပါ**: Streaming အကြောင်းအရာ များကို မနောက်ကျဘဲ မှန်ကန်စွာ ကိုင်တွယ်ခြင်းကို စစ်ဆေးပါ
7. **ကွန်ယက် ပြဿနာများ ကိုလိုက်နာစမ်းသပ်ပါ**: ဆိုးရွားသော ကွန်ယက် အခြေအနေ များတွင် စနစ်၏ လုပ်ဆောင်မှုကို စမ်းသပ်ပါ
8. **အရင်းအမြစ် ကန့်သတ်ချက် စမ်းသပ်ပါ**: နံပါတ်နှုန်း သို့မဟုတ် အမြန်နှုန်း ကန့်သတ်ချက်များ ရောက်ရှိသောအခါ ဂေါ်လုပ်မှုကို စစ်ဆေးပါ
9. **နောက်ပြန်စမ်းသပ်မှုများကို အလိုအလျောက်လုပ်စွမ်းမှု ဖန်တီးပါ**: ကုဒ် ပြင်ဆင်မှုတိုင်းတွင် ပြုလုပ်ရန် ခြုံငုံစမ်းသပ်မှုများ ထည့်သွင်းပါ
10. **စမ်းသပ်မှု ကိစ္စများကို စာတမ်းထဲ မှတ်တမ်းတင်ပါ**: စမ်းသပ်မှု အခြေအနေများကို ပြတ်သားရှင်းလင်းစွာ မှတ်တမ်းတင်ထားပါ

## ပုံမှန် ဖြစ်ပေါ်သော စမ်းသပ်မှု အခက်အခဲများ

- **အောင်မြင်သော လမ်းကြောင်း စမ်းသပ်မှုတွင် အလွန် များပြားစွာထားရှိခြင်း**: အမှား ဖြစ်နိုင်ချေများကို အပြည့်အဝ စမ်းသပ်ပေးပါ
- **လုပ်ဆောင်မှု စမ်းသပ်မှုကို မအလေးထားခြင်း**: ထုတ်လုပ်မှုကို ထိခိုက်ခွင့်မရအောင် ပြဿနာများကို ကြိုတင် ဖော်ထုတ်ပါ
- **တစ်ကိုယ်တည်း စမ်းသပ်မှုများသာ လုပ်ခြင်း**: Unit, Integration နှင့် E2E စမ်းသပ်မှုများ စုပေါင်းအသုံးပြုပါ
- **API ဖုံးလွှမ်းမှု မပြည့်မှီခြင်း**: အဆုံးအနောက်နှင့် လုပ်ဆောင်ချက်အားလုံးကို စမ်းသပ်ပေးပါ
- **စမ်းသပ်မှု ပတ်ဝန်းကျင် မတိကျမှန်ကန်မှု**: တူညီသော စမ်းသပ်မှု ပတ်ဝန်းကျင်များ ဖန်တီးရန် containers အသုံးပြုပါ

## နိဂုံးချုပ်

ယုံကြည်စိတ်ချရပြီး၊ အရည်အသွေးမြင့် MCP server များ ဖွံ့ဖြိုးတည်ဆောက်ရန် လုံးဝလိုအပ်သော စမ်းသပ်မှု မဟာဗျူဟာ ဖြစ်ပါသည်။ ဤ လမ်းညွှန်စာအုပ်တွင် ဖော်ပြထားသော အကောင်းဆုံး လေ့ကျင့်မှုများနှင့် အကြံပြုချက်များကို အကောင်အထည်ဖော်ခြင်းအားဖြင့် သင်၏ MCP တွင် အရည်အသွေး၊ ယုံကြည်စိတ်ချရမှုနှင့် လုပ်ဆောင်မှု မြင့်မားမှုများကို အလွန်ကောင်းမွန်စေမည်ဖြစ်သည်။

## အဓိက သတိပြုရန် အချက်များ

1. **ကိရိယာ ဒီဇိုင်း**: တစ်ခုချင်း တာဝန်ယူမှု 원칙ကို လိုက်နာပါ၊ dependency injection ကို အသုံးပြုပါ၊ နှင့် composability အတွက် ဒီဇိုင်းဆွဲပါ
2. **Schema ဒီဇိုင်း**: ပေါ်လွင်ရှင်းလင်းပြီး စနစ်တကျ မှတ်တမ်းထားသည့် schemas များကို ဖန်တီးပါ၊ မှန်ကန်သော သတ်မှတ်ချက်များဖြင့် အတည်ပြုပါ
3. **အမှား ကိုင်တွယ်မှု**: ဖက်ဖက်လှလှအမှားကိုင်တွယ်မှု၊ ဖွဲ့စည်းထားသော အမှား တုံ့ပြန်မှုများ နှင့် ပြန်လည်ကြိုးစားခြင်း logic ကို အကောင်အထည်ဖော်ပါ
4. **လုပ်ဆောင်မှု**: cache အသုံးပြုခြင်း၊ အဆင့်ဆင့် လုပ်ငန်းစဉ်များနှင့် အရင်းအမြစ် ထိန်းချုပ်မှုကို အသုံးပြုပါ
5. **လုံခြုံရေး**: input အတည်ပြုချက် ပြည့်စုံစွာ ဆောင်ရွက်ခြင်း၊ ခွင့်ပြုချက် စစ်ဆေးခြင်း၊ နှင့် sensitive data ကို ကောင်းမွန်စွာ ကိုင်တွယ်ဆောင်ရွက်ခြင်း
6. **စမ်းသပ်မှု**: အပြည့်အစုံ Unit၊ Integration နှင့် end-to-end စမ်းသပ်မှုများ ဖန်တီးပါ
7. **လုပ်ငန်းစဉ် များ**: စံထား patterns များဖြစ်သော chains, dispatchers နှင့် parallel processing များကို အသုံးပြုပါ

## လေ့ကျင့်ခန်း

စာရွက်စာတမ်း အမျိုးအစားများ (PDF, DOCX, TXT) အမျိုးမျိုးကို လက်ခံပြီး စာရွက်စာတမ်းမှ စာသားနှင့် အဓိကအချက်များ ထုတ်ယူသည့် MCP tool နှင့် လုပ်ငန်းစဉ်တစ်ခု ဒီဇိုင်းဆွဲပါ။  
3. စာရွက်စာတမ်းများကို အမျိုးအစားနှင့် အကြောင်းအရာအရ ခွဲခြားခြင်း  
4. စာရွက်စာတမ်းတစ်ခုစီ၏ အနှိပ်ကို ထုတ်ပေးခြင်း  

အဆိုပါ အခြေအနေတွင် သင်အသုံးပြုသင့်သည့် tool schema များ၊ အမှားကိုင်တွယ်မှုနှင့် workflow pattern ကို အကောင်အထည်ဖော်ပါ။ ဤ အကောင်အထည်ဖော်မှုကို မည်သို့ စမ်းသပ်မည်ဆိုသည်ကိုလည်း စဉ်းစားပါ။

## ရင်းမြစ်များ

1. MCP အသိုင်းအဝိုင်းကို [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) တွင် လက်ရှိ ဖွံ့ဖြိုးတိုးတက်မှုများအပေါ် အမြဲတမ်း အပ်ဒိတ် ရယူရန်  
2. [MCP ပရောဂျက်များ](https://github.com/modelcontextprotocol) သို့ ပံ့ပိုးမှု ပေးပါ  
3. သင်၏ အဖွဲ့အစည်း၏ AI လုပ်ငန်းများတွင် MCP 원칙များကို အသုံးပြုပါ  
4. သက်ဆိုင်ရာ စက်မှုလုပ်ငန်းများအတွက် အထူးပြု MCP အကောင်အထည်ဖော်မှုများကို လေ့လာပါ  
5. multi-modal integration သို့မဟုတ် enterprise application integration ကဲ့သို့ အထူး MCP သင်ခန်းစာများကို ဆက်လက် တက်ရောက်မှတ်သားနိုင်ပါသည်  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) မှ တစ်ဆက်တည်း သင်ယူထားသော 원칙များကို အားဖြင့် MCP ကိရိယာများနှင့် workflow များကို ကိုယ်တိုင် တည်ဆောက်မှု စမ်းသပ်ပါ  

## နောက်တစ်ခု

နောက်တစ်ခု: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ချက်ပြောချက်**:
ဤစာတမ်းကို AI ဘာသာပြန်ရေးဝန်ဆောင်မှုဖြစ်သည့် [Co-op Translator](https://github.com/Azure/co-op-translator) ကူညီပြီးဘာသာပြန်ထားခြင်းဖြစ်ပါသည်။ ကျွန်ုပ်တို့သည်မှန်ကန်မှုအတွက်ကြိုးစားသော်လည်း အလိုအလျောက်ဘာသာပြန်မှုတွင် အမှားများ သို့မဟုတ်မှန်ကန်မှုနည်းပါးမှုများ ဖြစ်ပေါ်နိုင်ကြောင်း ကျေးဇူးပြု၍ သိရှိပါစေ။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ တရားဝင်အရာအဖြစ်ယူဆသင့်ပါသည်။ အရေးပါတ်သော သတင်းအချက်အလက်များအတွက် နိုင်ငံတကာ လူသားဘာသာပြန်ပညာရှင်မှ ဘာသာပြန်ခြင်းကို အကြံပေးပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုရာမှ ဖြစ်ပေါ်လာနိုင်သည့် နားလည်မှု သို့မဟုတ် မမှန်ကန်မှုများအတွက် ကျွန်ုပ်တို့သည် တာဝန်မယူပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->