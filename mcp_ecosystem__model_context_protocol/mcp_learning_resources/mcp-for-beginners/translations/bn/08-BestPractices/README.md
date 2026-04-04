# MCP উন্নয়নের শ্রেষ্ঠ অনুশীলনসমূহ

[![MCP Development Best Practices](../../../translated_images/bn/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(এই পাঠের ভিডিও দেখতে উপরের ছবিতে ক্লিক করুন)_

## পর্যালোচনা

এই পাঠটি MCP সার্ভার এবং ফিচারগুলি উৎপাদন পরিবেশে উন্নয়ন, পরীক্ষা এবং স্থাপনের উন্নত শ্রেষ্ঠ অনুশীলনগুলোর উপর মনোযোগ দেয়। যেহেতু MCP ইকোসিস্টেমগুলি জটিলতা ও গুরুত্বে বৃদ্ধি পাচ্ছে, প্রতিষ্ঠিত প্যাটার্ন অনুসরণ করা নির্ভরযোগ্যতা, রক্ষণাবেক্ষণযোগ্যতা এবং আন্তঃঅপারেবিলিটি নিশ্চিত করে। এই পাঠটি বাস্তব MCP বাস্তবায়ন থেকে প্রাপ্ত প্রায়োগিক জ্ঞানের সমন্বয়, যা আপনাকে শক্তিশালী, দক্ষ সার্ভার তৈরি করতে সহায়তা করবে কার্যকর রিসোর্স, প্রম্পট এবং টুলস ব্যবহার করে।

## শেখার উদ্দেশ্যসমূহ

এই পাঠের শেষে, আপনি সক্ষম থাকবেন:

- MCP সার্ভার এবং ফিচার ডিজাইন করার ক্ষেত্রে শিল্পের শ্রেষ্ঠ অনুশীলন প্রয়োগ করতে
- MCP সার্ভারগুলোর ব্যাপক পরীক্ষা কৌশল তৈরি করতে
- জটিল MCP অ্যাপ্লিকেশনগুলোর জন্য দক্ষ, পুনর্ব্যবহারযোগ্য ওয়ার্কফ্লো প্যাটার্ন ডিজাইন করতে
- MCP সার্ভারগুলোতে সঠিক ত্রুটি হ্যান্ডলিং, লগিং এবং পর্যবেক্ষণশীলতা বাস্তবায়ন করতে
- কর্মদক্ষতা, নিরাপত্তা এবং রক্ষণাবেক্ষণযোগ্যতার দিক থেকে MCP বাস্তবায়ন অপ্টিমাইজ করতে

## MCP মূল নীতিমালা

নির্দিষ্ট বাস্তবায়ন অনুশীলনে ডুব দেওয়ার আগে, কার্যকর MCP উন্নয়নের দিশানির্দেশক মূল নীতিমালা বোঝা গুরুত্বপূর্ণ:

১. **মানকৃত যোগাযোগ**: MCP JSON-RPC 2.0 কে ভিত্তি হিসেবে ব্যবহার করে, যা সমস্ত বাস্তবায়নে অনুরোধ, প্রতিক্রিয়া এবং ত্রুটি হ্যান্ডলিংয়ের জন্য একটি সামঞ্জস্যপূর্ণ ফর্ম্যাট প্রদান করে।

২. **ব্যবহারকারী-কেন্দ্রিক ডিজাইন**: MCP বাস্তবায়নগুলিতে সর্বদা ব্যবহারকারীর সম্মতি, নিয়ন্ত্রণ এবং স্বচ্ছতাকে অগ্রাধিকার দিন।

৩. **নিরাপত্তা সর্বোচ্চ অগ্রাধিকার**: প্রমাণীকরণ, অনুমোদন, যাচাইকরণ এবং রেট সীমাবদ্ধতা সহ শক্তিশালী সুরক্ষা ব্যবস্থা বাস্তবায়ন করুন।

৪. **মডুলার আর্কিটেকচার**: MCP সার্ভার ডিজাইন করুন মডুলার পদ্ধতিতে, যেখানে প্রতিটি টুল এবং রিসোর্সের একটি সুস্পষ্ট, কেন্দ্রীভূত উদ্দেশ্য থাকে।

৫. **স্থিতিসম্পন্ন সংযোগ**: MCP এর ক্ষমতা ব্যবহার করুন একাধিক অনুরোধ জুড়ে অবস্থা বজায় রাখার জন্য, যা আরও সংহত এবং প্রসঙ্গ-সচেতন ইন্টারঅ্যাকশনের সুবিধা দেয়।

## অফিসিয়াল MCP শ্রেষ্ঠ অনুশীলনসমূহ

নিম্নলিখিত শ্রেষ্ঠ অনুশীলনসমূহ অফিসিয়াল Model Context Protocol ডকুমেন্টেশন থেকে নেওয়া হয়েছে:

### নিরাপত্তা শ্রেষ্ঠ অনুশীলনসমূহ

১. **ব্যবহারকারী সম্মতি এবং নিয়ন্ত্রণ**: ডেটা অ্যাক্সেস বা অপারেশন সম্পাদনের আগে সর্বদা স্পষ্ট ব্যবহারকারী সম্মতি প্রয়োজন। কোন ডেটা শেয়ার করা হবে এবং কোন কাজ অনুমোদিত হবে, তা স্পষ্ট নিয়ন্ত্রণ প্রদান করুন।

২. **ডেটা গোপনীয়তা**: শুধুমাত্র স্পষ্ট সম্মতি থাকা ব্যবহারকারীর ডেটা প্রকাশ করুন এবং যথাযথ প্রবেশাধিকার নিয়ন্ত্রণ দিয়ে সুরক্ষিত রাখুন। অবৈধ ডেটা সম্প্রচারের বিরুদ্ধে সুরক্ষা দিন।

৩. **টুল সুরক্ষা**: যেকোন টুল ব্যবহারের আগে স্পষ্ট ব্যবহারকারী সম্মতি প্রয়োজন। ব্যবহারকারীর প্রতি টুলের কার্যকারিতা বোঝাতে নিশ্চিত করুন এবং শক্তিশালী নিরাপত্তা সীমানা প্রয়োগ করুন।

৪. **টুল অনুমতি নিয়ন্ত্রণ**: কোন টুল একটি সেশনের সময় ব্যবহারের অনুমতি আছে তা কনফিগার করুন, যাতে শুধুমাত্র স্পষ্ট অনুমোদিত টুলগুলি প্রবেশযোগ্য হয়।

৫. **প্রমাণীকরণ**: টুল, রিসোর্স, অথবা সংবেদনশীল অপারেশনে প্রবেশের আগে উপযুক্ত প্রমাণীকরণ প্রয়োজন, যেমন API কী, OAuth টোকেন, অথবা অন্যান্য নিরাপদ প্রমাণীকরণ পদ্ধতি।

৬. **প্যারামিটার যাচাইকরণ**: সকল টুল কলের জন্য যাচাইকরণ বাধ্যতামূলক করুন যাতে ভুল বা দূর্বৃত্তিমূলক ইনপুট টুল বাস্তবায়নে পৌঁছাতে না পারে।

৭. **রেট সীমাবদ্ধতা**: অপব্যবহার প্রতিরোধ করতে এবং সার্ভারের সম্পদের ন্যায়সম্মত ব্যবহার নিশ্চিত করতে রেট সীমাবদ্ধতা প্রয়োগ করুন।

### বাস্তবায়ন শ্রেষ্ঠ অনুশীলনসমূহ

১. **ক্ষমতা আলাপনোচ্ছেদ**: সংযোগ সেটআপের সময়, সমর্থিত ফিচার, প্রটোকল ভার্শন, উপলব্ধ টুল এবং রিসোর্স সম্পর্কিত তথ্য বিনিময় করুন।

২. **টুল ডিজাইন**: মনোলিথিক টুলের পরিবর্তে এমন ফোকাসড টুল তৈরি করুন যেগুলো একটি কাজ দক্ষতার সাথে করে।

৩. **ত্রুটি হ্যান্ডলিং**: সমস্যা নির্ণয়, ব্যর্থতা সুন্দরভাবে হ্যান্ডল করা এবং ব্যবহারযোগ্য প্রতিক্রিয়া সরবরাহের জন্য মানকৃত ত্রুটি বার্তা ও কোড বাস্তবায়ন করুন।

৪. **লগিং**: প্রটোকল ইন্টারঅ্যাকশনের অডিট, ডিবাগ এবং পর্যবেক্ষণের জন্য কাঠামোবদ্ধ লগ কনফিগার করুন।

৫. **অগ্রগতি শ্রুতিকরণ**: দীর্ঘমেয়াদী অপারেশনের জন্য অগ্রগতি রিপোর্ট করুন যাতে দ্রুত প্রতিক্রিয়াশীল ইউজার ইন্টারফেস তৈরি করা যায়।

৬. **অনুরোধ বাতিলকরণ**: ক্লায়েন্টদের এমন অনুরোধ বাতিল করার ক্ষমতা দিন যা আর দরকার নেই বা অত্যন্ত সময় নিচ্ছে।

## অতিরিক্ত রেফারেন্সসমূহ

MCP শ্রেষ্ঠ অনুশীলন সম্পর্কে সর্বশেষ তথ্যের জন্য দেখুন:

- [MCP ডকুমেন্টেশন](https://modelcontextprotocol.io/)
- [MCP স্পেসিফিকেশন (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub রিপোজিটরি](https://github.com/modelcontextprotocol)
- [নিরাপত্তা শ্রেষ্ঠ অনুশীলন](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - নিরাপত্তা ঝুঁকি এবং প্রতিকার
- [MCP নিরাপত্তা সম্মেলন কর্মশালা (Sherpa)](https://azure-samples.github.io/sherpa/) - হাতে কলমে নিরাপত্তা প্রশিক্ষণ

## বাস্তবায়নের উদাহরণসমূহ

### টুল ডিজাইন শ্রেষ্ঠ অনুশীলনসমূহ

#### ১. একক দায়িত্ব নীতি

প্রত্যেক MCP টুলের একটি সুস্পষ্ট, কেন্দ্রীভূত উদ্দেশ্য থাকা উচিত। একাধিক দায়িত্ব পরিচালনার চেষ্টা করে মনোলিথিক টুল তৈরি করার পরিবর্তে, নির্দিষ্ট কাজগুলোর জন্য বিশেষায়িত টুল তৈরি করুন।

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

#### ২. সঙ্গত ত্রুটি হ্যান্ডলিং

তথ্যবহুল ত্রুটি বার্তা এবং উপযুক্ত পুনরুদ্ধার প্রক্রিয়া সহ শক্তিশালী ত্রুটি হ্যান্ডলিং বাস্তবায়ন করুন।

```python
# ব্যাপক ত্রুটি পরিচালনার সাথে পাইথন উদাহরণ
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # প্যারামিটার যাচাই
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # নিরাপত্তা যাচাই
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # টাইমআউট সহ ডাটাবেস অপারেশন
                async with timeout(10):  # ১০ সেকেন্ড টাইমআউট
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # সংযোগ ত্রুটিগুলো সাময়িক হতে পারে
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # প্রশ্ন ত্রুটিগুলো সম্ভবত ক্লায়েন্ট ত্রুটি
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # টুল-নির্দিষ্ট ত্রুটিগুলো পার হয়ে যেতে দিন
            raise
        except Exception as e:
            # অপ্রত্যাশিত ত্রুটির জন্য ক্যাচ-অল
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # এসকিউএল ইনজেকশন সনাক্তকরণের বাস্তবায়ন
        pass
        
    def _log_error(self, message, error):
        # ত্রুটি লগিংয়ের বাস্তবায়ন
        pass
```

#### ৩. প্যারামিটার যাচাইকরণ

চরম সতর্কতার সাথে প্যারামিটারগুলি যাচাই করুন যাতে ভুল বা দূর্বৃত্তিমূলক ইনপুট প্রতিরোধ হয়।

```javascript
// JavaScript/TypeScript উদাহরণ বিস্তারিত প্যারামিটার যাচাইকরণের সাথে
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
    // ১. প্যারামিটারের উপস্থিতি যাচাই করুন
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // ২. প্যারামিটারের ধরনের যাচাই করুন
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // ৩. প্যারামিটারের মান যাচাই করুন
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // ৪. লেখার অপারেশনের জন্য বিষয়বস্তুর উপস্থিতি যাচাই করুন
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // ৫. পাথ নিরাপত্তা যাচাইকরণ
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // যাচাই করা প্যারামিটার ভিত্তিক বাস্তবায়ন
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // পাথ নিরাপত্তা চেকের বাস্তবায়ন
    // ...
  }
}
```

### নিরাপত্তা বাস্তবায়ন উদাহরণসমূহ

#### ১. প্রমাণীকরণ এবং অনুমোদন

```java
// প্রমাণীকরণ এবং অনুমোদন সহ জাভা উদাহরণ
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // ডিপেনডেন্সি ইনজেকশন
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
        // ১. প্রমাণীকরণ প্রসঙ্গ নিষ্কাশন করুন
        String authToken = request.getContext().getAuthToken();
        
        // ২. ব্যবহারকারীকে প্রমাণীকরণ করুন
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // ৩. নির্দিষ্ট অপারেশনের জন্য অনুমোদন পরীক্ষা করুন
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // ৪. অনুমোদিত অপারেশনের সাথে এগিয়ে যান
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

#### ২. রেট সীমাবদ্ধতা

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

## পরীক্ষা করার শ্রেষ্ঠ অনুশীলনসমূহ

### ১. MCP টুলগুলোর ইউনিট টেস্টিং

সর্বদা আপনার টুলগুলোকে বিচ্ছিন্নভাবে পরীক্ষা করুন, বাহ্যিক নির্ভরশীলতাগুলোকে নকল করুন:

```typescript
// একটি টুল ইউনিট টেস্টের টাইপস্ক্রিপ্ট উদাহরণ
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // একটি মক আবহাওয়া সেবা তৈরি করুন
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // মক ডিপেন্ডেন্সি সহ টুল তৈরি করুন
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // বিন্যস্ত করা
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // কাজ করা
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // নিশ্চিত করা
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // বিন্যস্ত করা
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // কাজ করা এবং নিশ্চিত করা
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### ২. ইন্টিগ্রেশন টেস্টিং

ক্লায়েন্ট অনুরোধ থেকে সার্ভার প্রতিক্রিয়া পর্যন্ত সম্পূর্ণ প্রবাহ পরীক্ষা করুন:

```python
# পাইথন ইন্টিগ্রেশন টেস্ট উদাহরণ
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # একটি টেস্ট সার্ভার শুরু করুন
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # একটি ক্লায়েন্ট তৈরি করুন
        client = McpClient("http://localhost:5000")
        
        # টুল আবিষ্কার পরীক্ষা করুন
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # টুল কার্যকরীতা পরীক্ষা করুন
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # প্রতিক্রিয়া যাচাই করুন
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # পরিষ্কার করুন
        await server.stop()
```

## কর্মক্ষমতা অপ্টিমাইজেশন

### ১. ক্যাশিং কৌশল

দেরি এবং সম্পদ ব্যবহার কমাতে উপযুক্ত ক্যাশিং প্রয়োগ করুন:

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

#### ২. নির্ভরতা ইনজেকশন এবং পরীক্ষা সক্ষमता

কনস্ট্রাকটর ইনজেকশনের মাধ্যমে টুলগুলোর নির্ভরতা প্রদান করুন, যাতে সেগুলো পরীক্ষা এবং কনফিগারযোগ্য হয়:

```java
// ডিপেন্ডেন্সি ইনজেকশনের সাথে জাভা উদাহরণ
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // কনস্ট্রাক্টরের মাধ্যমে ডিপেন্ডেন্সি ইনজেক্ট করা হয়েছে
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // টুল বাস্তবায়ন
    // ...
}
```

#### ৩. সংযোজ্য টুলস

সম্প্রসারিত ও জটিল ওয়ার্কফ্লো তৈরির জন্য কম্পোজেবল টুল ডিজাইন করুন:

```python
# পাইথন উদাহরণ যা কম্পোজেবল টুলগুলি প্রদর্শন করে
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # বাস্তবায়ন...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # এই টুলটি dataFetch টুল থেকে ফলাফল ব্যবহার করতে পারে
    async def execute_async(self, request):
        # বাস্তবায়ন...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # এই টুলটি dataAnalysis টুল থেকে ফলাফল ব্যবহার করতে পারে
    async def execute_async(self, request):
        # বাস্তবায়ন...
        pass

# এই টুলগুলি স্বাধীনভাবে বা ওয়ার্কফ্লোর অংশ হিসাবে ব্যবহার করা যেতে পারে
```

### স্কিমা ডিজাইন শ্রেষ্ঠ অনুশীলনসমূহ

স্কিমা হল মডেল এবং আপনার টুলের মধ্যে চুক্তি। সুসংহত স্কিমা টুল ব্যবহারের সুবিধা বৃদ্ধি করে।

#### ১. স্পষ্ট প্যারামিটার বিবরণ

প্রত্যেক প্যারামিটারের জন্য বর্ণনামূলক তথ্য অন্তর্ভুক্ত করুন:

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

#### ২. যাচাইকরণ বিধিনিষেধ

ভুল ইনপুট প্রতিরোধে যাচাইকরণ বিধিনিষেধ অন্তর্ভুক্ত করুন:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ইমেইল প্রপার্টি ফরম্যাট যাচাইসহ
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // বয়স প্রপার্টি সংখ্যাসূচক শর্তাবলীর সাথে
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // এনামারেটেড প্রপার্টি
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

#### ৩. সঙ্গতিপূর্ণ রিটার্ন কাঠামো

মডেলদের ফলাফল ব্যাখ্যা করা সহজ করার জন্য আপনার প্রতিক্রিয়ার গঠন সঙ্গতিপূর্ণ রাখুন:

```python
async def execute_async(self, request):
    try:
        # অনুরোধ প্রক্রিয়া করুন
        results = await self._search_database(request.parameters["query"])
        
        # সর্বদা একটি সঙ্গতিপূর্ণ কাঠামো ফেরত দিন
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

### ত্রুটি হ্যান্ডলিং

MCP টুলগুলোর নির্ভরযোগ্যতা বজায় রাখার জন্য শক্তিশালী ত্রুটি হ্যান্ডলিং অপরিহার্য।

#### ১. মার্জিত ত্রুটি হ্যান্ডলিং

উপযুক্ত স্তরে ত্রুটি হ্যান্ডলিং করুন এবং তথ্যবহুল বার্তা প্রদান করুন:

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

#### ২. কাঠামোবদ্ধ ত্রুটি প্রতিক্রিয়া

সম্ভব হলে কাঠামোবদ্ধ ত্রুটি তথ্য রিটার্ন করুন:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // বাস্তবায়ন
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
        
        // অন্যান্য ব্যতিক্রমগুলোকে ToolExecutionException হিসেবে পুনঃফেলে দিন
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### ৩. পুনরায় চেষ্টা করার যুক্তি

স্থায়ী ব্যর্থতার জন্য উপযুক্ত রিট্রাই লজিক বাস্তবায়ন করুন:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # সেকেন্ড
    
    while retry_count < max_retries:
        try:
            # বাহ্যিক API কল করুন
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # গুণগত পশ্চাদপসরণ
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # অস্থায়ী নয় এমন ত্রুটি, পুনরায় চেষ্টা করবেন না
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### কর্মক্ষমতা অপ্টিমাইজেশন

#### ১. ক্যাশিং

ব্যয়বহুল অপারেশনের জন্য ক্যাশিং প্রয়োগ করুন:

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

#### ২. অ্যাসিঙ্ক্রোনাস প্রসেসিং

I/O-সীমাবদ্ধ অপারেশনের জন্য অ্যাসিঙ্ক্রোনাস প্রোগ্রামিং প্যাটার্ন ব্যবহার করুন:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // দীর্ঘমেয়াদী অপারেশনের জন্য, একটি প্রক্রিয়াকরণ আইডি অবিলম্বে ফেরত দিন
        String processId = UUID.randomUUID().toString();
        
        // অ্যাসিঙ্ক প্রসেসিং শুরু করুন
        CompletableFuture.runAsync(() -> {
            try {
                // দীর্ঘমেয়াদী অপারেশন সম্পাদন করুন
                documentService.processDocument(documentId);
                
                // স্ট্যাটাস আপডেট করুন (সাধারণত একটি ডাটাবেজে সংরক্ষণ করা হয়)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // প্রক্রিয়া আইডি সহ অবিলম্বে প্রতিক্রিয়া ফেরত দিন
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // সঙ্গী স্ট্যাটাস চেক টুল
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

#### ৩. রিসোর্স থ্রটলিং

ওভারলোড প্রতিরোধে রিসোর্স থ্রটলিং প্রয়োগ করুন:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # প্রতি সেকেন্ডে ৫টি অনুরোধ অনুমোদন করুন
            bucket_size=10        # ১০টি অনুরোধ পর্যন্ত বিস্ফোরণ অনুমোদন করুন
        )
    
    async def execute_async(self, request):
        # পরীক্ষা করুন আমরা এগিয়ে যেতে পারি কি না বা অপেক্ষা করতে হবে
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # যদি অপেক্ষা সময় খুব বেশি হয়
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # প্রয়োজনীয় বিলম্বের জন্য অপেক্ষা করুন
                await asyncio.sleep(delay)
        
        # একটি টোকেন ব্যবহার করুন এবং অনুরোধটি সম্পন্ন করুন
        self.rate_limiter.consume()
        
        # API কল করুন
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
            
            # পরবর্তী টোকেন উপলব্ধ হওয়া পর্যন্ত সময় গণনা করুন
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # অতীত সময়ের ভিত্তিতে নতুন টোকেন যোগ করুন
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### নিরাপত্তা শ্রেষ্ঠ অনুশীলনসমূহ

#### ১. ইনপুট যাচাইকরণ

সর্বদা ইনপুট প্যারামিটার কঠোরভাবে যাচাই করুন:

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

#### ২. অনুমোদন পরীক্ষা

সঠিক অনুমোদন পরীক্ষা বাস্তবায়ন করুন:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // রিকোয়েস্ট থেকে ব্যবহারকারীর প্রসঙ্গ নিন
    UserContext user = request.getContext().getUserContext();
    
    // ব্যবহারকারীর প্রয়োজনীয় অনুমতি আছে কি না তা পরীক্ষা করুন
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // নির্দিষ্ট সম্পদের জন্য, সেই সম্পদে প্রবেশাধিকার পরীক্ষা করুন
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // টুলের কার্যক্রম চালিয়ে যান
    // ...
}
```

#### ৩. সংবেদনশীল ডেটা হ্যান্ডলিং

সংবেদনশীল ডেটা সতর্কতার সাথে পরিচালনা করুন:

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
        
        # ব্যবহারকারীর তথ্য নিন
        user_data = await self.user_service.get_user_data(user_id)
        
        # স্পষ্টভাবে অনুরোধ এবং অনুমোদিত না হলে সংবেদনশীল ক্ষেত্র ফিল্টার করুন
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # অনুরোধ প্রসঙ্গে অনুমোদন স্তর পরীক্ষা করুন
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # মূলটি পরিবর্তন এড়াতে একটি অনুলিপি তৈরি করুন
        redacted = user_data.copy()
        
        # নির্দিষ্ট সংবেদনশীল ক্ষেত্রগুলি গোপন করুন
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # সংবেদনশীল সন্নিবেশিত ডেটা গোপন করুন
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP টুলের জন্য পরীক্ষা করার শ্রেষ্ঠ অনুশীলন

ব্যাপক পরীক্ষা নিশ্চিত করে MCP টুল সঠিকভাবে কাজ করে, প্রান্তিক পরিস্থিতি সামলে এবং সিস্টেমের বাকি অংশের সাথে সুষ্ঠুভাবে একত্রিত হয়।

### ইউনিট টেস্টিং

#### ১. প্রতিটি টুল আলাদাভাবে পরীক্ষা করুন

প্রত্যেক টুলের কার্যকারিতার জন্য ফোকাসড টেস্ট তৈরি করুন:

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

#### ২. স্কিমা যাচাইকরণ পরীক্ষা

স্কিমাগুলোর বৈধতা এবং বিধিনিষেধ সঠিকভাবে প্রয়োগ হচ্ছে কিনা পরীক্ষা করুন:

```java
@Test
public void testSchemaValidation() {
    // টুল ইনস্ট্যান্স তৈরি করুন
    SearchTool searchTool = new SearchTool();
    
    // স্কিমা পান
    Object schema = searchTool.getSchema();
    
    // যাচাইকরণের জন্য স্কিমা JSON এ রূপান্তর করুন
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // যাচাই করুন স্কিমা বৈধ JSONSchema কিনা
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // বৈধ প্যারামিটার পরীক্ষা করুন
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // অনুপস্থিত প্রয়োজনীয় প্যারামিটার পরীক্ষা করুন
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // অবৈধ প্যারামিটার টাইপ পরীক্ষা করুন
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### ৩. ত্রুটি হ্যান্ডলিং টেস্ট

ত্রুটির শর্তগুলোর জন্য নির্দিষ্ট পরীক্ষা তৈরি করুন:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # বিন্যস্ত করুন
    tool = ApiTool(timeout=0.1)  # খুব সংক্ষিপ্ত টাইমআউট
    
    # এমন একটি অনুরোধের নকল তৈরি করুন যা টাইমআউট হবে
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # টাইমআউটের চেয়ে দীর্ঘ
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # কার্যকর করুন এবং নিশ্চিত করুন
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ব্যতিক্রমের বার্তা যাচাই করুন
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # বিন্যস্ত করুন
    tool = ApiTool()
    
    # একটি রেট-সীমাবদ্ধ প্রতিক্রিয়ার নকল তৈরি করুন
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
        
        # কার্যকর করুন এবং নিশ্চিত করুন
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # যাচাই করুন ব্যতিক্রমে রেট সীমা সম্পর্কিত তথ্য আছে কিনা
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### ইন্টিগ্রেশন টেস্টিং

#### ১. টুল চেইন টেস্টিং

টুলগুলো প্রত্যাশিত সংমিশ্রণে একত্রে কাজ করছে কিনা পরীক্ষা করুন:

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

#### ২. MCP সার্ভার টেস্টিং

পুরো টুল রেজিস্ট্রেশন ও কার্যকররণসহ MCP সার্ভার পরীক্ষা করুন:

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
        // ডিসকভারি এন্ডপয়েন্ট পরীক্ষা করুন
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // টুল অনুরোধ তৈরি করুন
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // অনুরোধ পাঠান এবং প্রতিক্রিয়া যাচাই করুন
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // অবৈধ টুল অনুরোধ তৈরি করুন
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" প্যারামিটার অনুপস্থিত
        request.put("parameters", parameters);
        
        // অনুরোধ পাঠান এবং ত্রুটি প্রতিক্রিয়া যাচাই করুন
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### ৩. শেষ থেকে শেষ পরীক্ষা

মডেল প্রম্পট থেকে টুল কার্যকররণ পর্যন্ত সম্পূর্ণ ওয়ার্কফ্লো পরীক্ষা করুন:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # সাজান - MCP ক্লায়েন্ট এবং মক মডেল সেট আপ করুন
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # মক মডেল প্রতিক্রিয়া
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
    
    # মক আবহাওয়া টুল প্রতিক্রিয়া
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
        
        # কাজ করুন
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # নিশ্চিত করুন
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### কর্মক্ষমতা পরীক্ষা

#### ১. লোড টেস্টিং

আপনার MCP সার্ভার কতগুলো সমান্তরাল অনুরোধ পরিচালনা করতে পারে তা পরীক্ষা করুন:

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

#### ২. স্ট্রেস টেস্টিং

চরম লোডে সিস্টেমের পরীক্ষা করুন:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // স্ট্রেস টেস্টিংয়ের জন্য JMeter সেট আপ করুন
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter টেস্ট প্ল্যান কনফিগার করুন
    HashTree testPlanTree = new HashTree();
    
    // টেস্ট প্ল্যান, থ্রেড গ্রুপ, স্যাম্পলার ইত্যাদি তৈরি করুন
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // টুল এক্সিকিউশনের জন্য HTTP স্যাম্পলার যোগ করুন
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // লিসেনার যোগ করুন
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // টেস্ট চালান
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // ফলাফল যাচাই করুন
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // গড় প্রতিক্রিয়া সময় < ২০০মিলিসেকেন্ড
    assertTrue(summaryReport.getPercentile(90.0) < 500); // ৯০তম শতাংশ < ৫০০মিলিসেকেন্ড
}
```

#### ৩. পর্যবেক্ষণ এবং প্রোফাইলিং

দীর্ঘমেয়াদী কর্মক্ষমতা বিশ্লেষণের জন্য পর্যবেক্ষণ ব্যবস্থা করুন:

```python
# একটি MCP সার্ভারের জন্য মনিটরিং কনফিগার করুন
def configure_monitoring(server):
    # Prometheus মেট্রিক্স সেট আপ করুন
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
    
    # টাইমিং এবং মেট্রিক্স রেকর্ড করার জন্য মিডলওয়্যার যোগ করুন
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # মেট্রিক্স এন্ডপয়েন্ট এক্সপোজ করুন
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP ওয়ার্কফ্লো ডিজাইন প্যাটার্নসমূহ

ভাল ডিজাইনকৃত MCP ওয়ার্কফ্লো দক্ষতা, নির্ভরযোগ্যতা এবং রক্ষণাবেক্ষণ সহজ করে। নিম্নলিখিত মূল প্যাটার্নগুলো অনুসরণ করুন:

### ১. টুল চেইন প্যাটার্ন

একাধিক টুলকে এমন সিরিজে সংযুক্ত করুন যেখানে প্রতিটি টুলের আউটপুট পরবর্তী টুলের ইনপুট হয়:

```python
# পাইথন টুল চেইনের বাস্তবায়ন
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # ধারাবাহিকভাবে সম্পাদনার জন্য টুল নামের তালিকা
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # চেইনের প্রতিটি টুল সম্পাদনা করুন, আগের ফলাফল পাঠিয়ে
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # ফলাফল সংরক্ষণ করুন এবং পরবর্তী টুলের ইনপুট হিসাবে ব্যবহার করুন
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# উদাহরণ ব্যবহার
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

### ২. ডিসপ্যাচার প্যাটার্ন

একটি কেন্দ্রীয় টুল ব্যবহার করুন যা ইনপুট অনুযায়ী বিশেষায়িত টুলগুলোতে ডেলিগেট করে:

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

### ৩. সমান্তরাল প্রক্রিয়াকরণ প্যাটার্ন

কার্যকারিতার জন্য একসাথে একাধিক টুল চালান:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // ধাপ ১: ডেটাসেট মেটাডেটা সংগ্রহ করুন (সিঙ্ক্রোনাস)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // ধাপ ২: একাধিক বিশ্লেষণ সমান্তরালে চালান
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
        
        // সমস্ত সমান্তরাল কাজ সম্পন্ন হওয়ার জন্য অপেক্ষা করুন
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // সম্পূর্ণ হওয়ার জন্য অপেক্ষা করুন
        
        // ধাপ ৩: ফলাফল সংযুক্ত করুন
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // ধাপ ৪: সারাংশ রিপোর্ট তৈরি করুন
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // সম্পূর্ণ ওয়ার্কফ্লো ফলাফল ফেরত দিন
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### ৪. ত্রুটি পুনরুদ্ধার প্যাটার্ন

টুল ব্যর্থতার জন্য মার্জিত বিকল্প ব্যবস্থা বাস্তবায়ন করুন:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # প্রথমে প্রাথমিক টুল চেষ্টা করুন
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # ব্যর্থতার লগ করুন
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # বিকল্প টুলে ফিরে যান
            try:
                # বিকল্প টুলের জন্য প্যারামিটার রূপান্তর প্রয়োজন হতে পারে
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # উভয় টুল ব্যর্থ হয়েছে
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # এই বাস্তবায়ন নির্দিষ্ট টুলের উপর নির্ভর করবে
        # এই উদাহরণে, আমরা কেবল মূল প্যারামিটারগুলি ফিরিয়ে দেব
        return params

# উদাহরণ ব্যবহার
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # প্রাথমিক (পেইড) আবহাওয়া API
        "basicWeatherService",    # বিকল্প (ফ্রি) আবহাওয়া API
        {"location": location}
    )
```

### ৫. ওয়ার্কফ্লো কম্পোজিশন প্যাটার্ন

সহজ ওয়ার্কফ্লোগুলোকে একত্র করে জটিল ওয়ার্কফ্লো তৈরি করুন:

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

# MCP সার্ভার পরীক্ষা: শ্রেষ্ঠ অনুশীলন এবং সেরা টিপস

## পর্যালোচনা

টেস্টিং হল নির্ভরযোগ্য, উচ্চমানসম্পন্ন MCP সার্ভার উন্নয়নের একটি গুরুত্বপূর্ণ অংশ। এই গাইডটি MCP সার্ভার উন্নয়নের জীবনচক্র জুড়ে ইউনিট টেস্ট থেকে ইন্টিগ্রেশন টেস্ট এবং শেষ থেকে শেষ বৈধকরণ পর্যন্ত ব্যাপক শ্রেষ্ঠ অনুশীলন ও পরামর্শ প্রদান করে।

## কেন MCP সার্ভারের জন্য টেস্টিং গুরুত্বপূর্ণ

MCP সার্ভারগুলো AI মডেল এবং ক্লায়েন্ট অ্যাপ্লিকেশনের মধ্যে গুরুত্বপূর্ণ মধ্যস্ত ভূমিকা পালন করে। সুষ্ঠু টেস্টিং নিশ্চিত করে:

- উৎপাদন পরিবেশে নির্ভরযোগ্যতা
- অনুরোধ এবং প্রতিক্রিয়ার সঠিক পরিচালনা
- MCP স্পেসিফিকেশন সঠিক বাস্তবায়ন
- ব্যর্থতা এবং প্রান্তিক পরিস্থিতিতে স্থিতিস্থাপকতা
- বিভিন্ন লোডে ধারাবাহিক কর্মক্ষমতা

## MCP সার্ভারের জন্য ইউনিট টেস্টিং

### ইউনিট টেস্টিং (মূলে স্তর)

ইউনিট টেস্ট MCP সার্ভারের পৃথক উপাদানগুলো আলাদাভাবে যাচাই করে।

#### কী পরীক্ষা করবেন

১. **রিসোর্স হ্যান্ডলার**: প্রতিটি রিসোর্স হ্যান্ডলার লজিক স্বতন্ত্রভাবে পরীক্ষা করুন  
২. **টুল বাস্তবায়ন**: বিভিন্ন ইনপুট দিয়ে টুলের আচরণ যাচাই করুন  
৩. **প্রম্পট টেমপ্লেট**: নিশ্চিত করুন প্রম্পট টেমপ্লেট সঠিকভাবে রেন্ডার হয়  
৪. **স্কিমা যাচাইকরণ**: প্যারামিটার যাচাইকরণ লজিক পরীক্ষা করুন  
৫. **ত্রুটি হ্যান্ডলিং**: ভুল ইনপুটের জন্য ত্রুটি প্রতিক্রিয়া যাচাই করুন  

#### ইউনিট টেস্টিংয়ের শ্রেষ্ঠ অনুশীলনসমূহ

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
# পাইথনে একটি ক্যালকুলেটর টুলের জন্য উদাহরণ ইউনিট টেস্ট
def test_calculator_tool_add():
    # পরিকল্পনা করো
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # কাজ করো
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # নিশ্চিত করো
    assert result["value"] == 12
```

### ইন্টিগ্রেশন টেস্টিং (মধ্য স্তর)

ইন্টিগ্রেশন টেস্ট MCP সার্ভারের উপাদানগুলোর পরস্পর ক্রিয়া যাচাই করে।

#### কী পরীক্ষা করবেন

১. **সার্ভার ইনিশিয়ালাইজেশন**: বিভিন্ন কনফিগারেশন নিয়ে সার্ভার স্টার্টআপ পরীক্ষা করুন  
২. **রুট রেজিস্ট্রেশন**: নিশ্চিত করুন সব এন্ডপয়েন্ট সঠিকভাবে রেজিস্টার হয়েছে  
৩. **অনুরোধ প্রক্রিয়াকরণ**: অনুরোধ-প্রতিক্রিয়া চক্র সম্পূর্ণরূপে পরীক্ষা করুন  
৪. **ত্রুটি প্রচারণা**: উপাদানগুলোর মধ্যে ত্রুটি সুষ্ঠু হ্যান্ডলিং যাচাই করুন  
৫. **প্রমাণীকরণ ও অনুমোদন**: সুরক্ষা ব্যবস্থা পরীক্ষা করুন  

#### ইন্টিগ্রেশন টেস্টিংয়ের শ্রেষ্ঠ অনুশীলনসমূহ

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

### শেষ থেকে শেষ টেস্টিং (সর্বোচ্চ স্তর)

শেষ থেকে শেষ টেস্ট ক্লায়েন্ট থেকে সার্ভার পর্যন্ত সম্পূর্ণ সিস্টেমের আচরণ যাচাই করে।

#### কী পরীক্ষা করবেন

১. **ক্লায়েন্ট-সার্ভার যোগাযোগ**: সম্পূর্ণ অনুরোধ-প্রতিক্রিয়া চক্র পরীক্ষা করুন  
২. **বাস্তব ক্লায়েন্ট SDK**: বাস্তব ক্লায়েন্ট বাস্তবায়ন নিয়ে পরীক্ষা করুন  
৩. **লোডে কর্মক্ষমতা**: একাধিক সমান্তরাল অনুরোধের অধীনে আচরণ যাচাই করুন  
৪. **ত্রুটি পুনরুদ্ধার**: ব্যর্থতা থেকে সিস্টেম পুনরুদ্ধার পরীক্ষা করুন  
৫. **দীর্ঘমেয়াদী অপারেশন**: স্ট্রিমিং এবং দীর্ঘ অপারেশন হ্যান্ডলিং যাচাই করুন  

#### শেষ থেকে শেষ টেস্টিংয়ের শ্রেষ্ঠ অনুশীলনসমূহ

```typescript
// টাইপস্ক্রিপ্টে ক্লায়েন্ট সহ উদাহরণ E2E পরীক্ষা
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // পরীক্ষার পরিবেশে সার্ভার শুরু করুন
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // ক্রিয়াকলাপ
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // নিশ্চিত করা
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP টেস্টিংয়ের জন্য মকিং কৌশল

মকিং ব্যবহৃত হয় পরীক্ষার সময় উপাদানগুলিকে বিচ্ছিন্ন করার জন্য।

### মক করার উপাদানসমূহ

১. **বাহ্যিক AI মডেল**: পূর্বনির্ধারিত ফলাফলের জন্য মডেল প্রতিক্রিয়া মক করুন  
২. **বাহ্যিক সার্ভিস**: API নির্ভরশীলতা যেমন ডেটাবেস, তৃতীয় পক্ষের সার্ভিস মক করুন  
৩. **প্রমাণীকরণ সার্ভিস**: পরিচয় প্রদানকারী মক করুন  
৪. **রিসোর্স প্রদানকারী**: ব্যয়বহুল রিসোর্স হ্যান্ডলার মক করুন  

### উদাহরণ: AI মডেল প্রতিক্রিয়া মকিং

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
# unittest.mock সহ পাইথন উদাহরণ
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # মক কনফিগার করুন
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # টেস্টে মক ব্যবহার করুন
    server = McpServer(model_client=mock_model)
    # টেস্ট চালিয়ে যান
```

## কর্মক্ষমতা পরীক্ষা

কর্মক্ষমতা পরীক্ষা উৎপাদন MCP সার্ভারের জন্য অপরিহার্য।

### কী পরিমাপ করবেন

১. **প্রতিবেদন সময়**: অনুরোধের প্রতিক্রিয়া সময়  
২. **থ্রুপুট**: প্রতি সেকেন্ডে পরিচালিত অনুরোধের সংখ্যা  
৩. **সম্পদ ব্যবহার**: CPU, মেমরি, নেটওয়ার্ক ব্যবহার  
৪. **সমান্তরাল পরিচালনা**: সমান্তরাল অনুরোধের সময় আচরণ  
৫. **স্কেলিং বৈশিষ্ট্য**: লোড বৃদ্ধির সাথে কর্মক্ষমতা  

### কর্মক্ষমতা পরীক্ষার টুলস

- **k6**: ওপেন-সোর্স লোড টেস্টিং টুল  
- **JMeter**: ব্যাপক কর্মক্ষমতা পরীক্ষা টুল  
- **Locust**: পাইথন ভিত্তিক লোড টেস্টিং  
- **Azure Load Testing**: ক্লাউড-ভিত্তিক কর্মক্ষমতা পরীক্ষা  

### উদাহরণ: k6 দিয়ে বেসিক লোড টেস্ট

```javascript
// এমসিপি সার্ভারের লোড টেস্টিংয়ের জন্য k6 স্ক্রিপ্ট
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // ১০টি ভার্চুয়াল ব্যবহারকারী
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

## MCP সার্ভারের জন্য টেস্ট অটোমেশন

পরীক্ষাগুলো স্বয়ংক্রিয়করণ নিশ্চিত করে ধারাবাহিক মান এবং দ্রুত প্রতিক্রিয়া।

### CI/CD ইন্টিগ্রেশন
1. **পুল রিকোয়েস্টে ইউনিট টেস্ট চালান**: নিশ্চিত করুন কোড পরিবর্তনগুলি বিদ্যমান কার্যকারিতা ভাঙে না
2. **স্টেজিং-এ ইন্টিগ্রেশন টেস্ট**: প্রি-প্রোডাকশন পরিবেশে ইন্টিগ্রেশন টেস্ট চালান
3. **পারফরমেন্স বেসলাইন**: রিগ্রেশনের জন্য পারফরমেন্স বেঞ্চমার্ক বজায় রাখুন
4. **সিকিউরিটি স্ক্যান**: পাইপলাইনটির অংশ হিসেবে স্বয়ংক্রিয় সিকিউরিটি পরীক্ষা করুন

### উদাহরণ CI পাইপলাইন (GitHub Actions)

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

## MCP স্পেসিফিকেশনের সাথে কমপ্লায়েন্সের জন্য টেস্টিং

আপনার সার্ভার MCP স্পেসিফিকেশন সঠিকভাবে বাস্তবায়ন করছে কিনা যাচাই করুন।

### মূল কমপ্লায়েন্স ক্ষেত্রসমূহ

1. **API এন্ডপয়েন্ট**: প্রয়োজনীয় এন্ডপয়েন্ট (/resources, /tools, ইত্যাদি) টেস্ট করুন
2. **রিকোয়েস্ট/রেসপন্স ফরম্যাট**: স্কিমা কমপ্লায়েন্স যাচাই করুন
3. **এরর কোড**: বিভিন্ন পরিস্থিতির জন্য সঠিক স্ট্যাটাস কোড নিশ্চিত করুন
4. **কনটেন্ট টাইপস**: বিভিন্ন কনটেন্ট টাইপের হ্যান্ডলিং টেস্ট করুন
5. **অথেনটিকেশন ফ্লো**: স্পেক-কমপ্লায়েন্ট অথ মেকানিজম নিশ্চিত করুন

### কমপ্লায়েন্স টেস্ট স্যুট

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

## কার্যকর MCP সার্ভার টেস্টিংয়ের শীর্ষ ১০ টিপস

1. **টেস্ট টুল ডেফিনিশন আলাদা করে টেস্ট করুন**: টুল লজিক থেকে স্কিমা ডেফিনিশন স্বাধীনভাবে যাচাই করুন
2. **প্যারামিটারাইজড টেস্ট ব্যবহার করুন**: বিভিন্ন ইনপুটসহ, প্রান্তিক কেসসহ টুল টেস্ট করুন
3. **এরর রেসপন্স যাচাই করুন**: সমস্ত সম্ভাব্য এরর কন্ডিশনের জন্য সঠিক এরর হ্যান্ডলিং নিশ্চিত করুন
4. **অথরাইজেশন লজিক টেস্ট করুন**: ভিন্ন ইউজার রোলের জন্য সঠিক অ্যাক্সেস কন্ট্রোল নিশ্চিত করুন
5. **টেস্ট কভারেজ মনিটর করুন**: গুরুত্বপূর্ণ পথের কোডের উচ্চ কভারেজ লক্ষ্য করুন
6. **স্ট্রিমিং রেসপন্স টেস্ট করুন**: স্ট্রিমিং কনটেন্টের সঠিক হ্যান্ডলিং যাচাই করুন
7. **নেটওয়ার্ক সমস্যা সিমুলেট করুন**: দুর্বল নেটওয়ার্ক অবস্থায় আচরণ পরীক্ষা করুন
8. **রিসোর্স সীমা পরীক্ষা করুন**: কোটা বা রেট সীমায় পৌঁছানোর সময় আচরণ যাচাই করুন
9. **রিগ্রেশন টেস্ট স্বয়ংক্রিয় করুন**: প্রতিটি কোড পরিবর্তনে চলার জন্য একটি স্যুট তৈরি করুন
10. **টেস্ট কেস ডকুমেন্ট করুন**: টেস্ট সিনারিওগুলোর স্পষ্ট ডকুমেন্টেশন বজায় রাখুন

## সাধারণ টেস্টিং জটিলতা

- **শুধু সফল পথের টেস্টিং-এ অতিরিক্ত নির্ভরশীলতা**: ভুলের ক্ষেত্রগুলি সম্পূর্ণ পরীক্ষিত করুন
- **পারফরমেন্স টেস্ট উপেক্ষা করা**: প্রোডাকশনে প্রভাব ফেলার আগে বটলনেক শনাক্ত করুন
- **শুধু বিচ্ছিন্নভাবে টেস্ট করা**: ইউনিট, ইন্টিগ্রেশন ও E2E টেস্ট একসাথে চালান
- **অসম্পূর্ণ API কভারেজ**: সব এন্ডপয়েন্ট এবং ফিচার টেস্ট করা নিশ্চিত করুন
- **অসঙ্গত টেস্ট পরিবেশ**: ধারাবাহিক টেস্ট পরিবেশ নিশ্চিত করতে কন্টেইনার ব্যবহার করুন

## উপসংহার

একটি বিস্তৃত টেস্টিং প্ল্যান নির্ভরযোগ্য, উচ্চমানের MCP সার্ভার ডেভেলপমেন্টের জন্য অপরিহার্য। এই গাইডে বর্ণিত সেরা অনুশীলন ও টিপস অনুসরণ করে, আপনি নিশ্চিত করতে পারবেন আপনার MCP বাস্তবায়নগুলি গুণমান, নির্ভরযোগ্যতা এবং পারফরমেন্সের সর্বোচ্চ মান পূরণ করে।


## প্রধান শিখনীয় বিষয়াবলী

1. **টুল ডিজাইন**: একক দায়িত্ব নীতি অনুসরণ করুন, ডিপেন্ডেন্সি ইনজেকশন ব্যবহার করুন, এবং কম্পোজেবিলিটির জন্য ডিজাইন করুন
2. **স্কিমা ডিজাইন**: স্পষ্ট, সু-ডকুমেন্টেড স্কিমা তৈরি করুন সঠিক ভ্যালিডেশন শর্তাবলীসহ
3. **এরর হ্যান্ডলিং**: মসৃণ এরর হ্যান্ডলিং, সংকাঠিত এরর রেসপন্স এবং রিট্রাই লজিক বাস্তবায়ন করুন
4. **পারফরমেন্স**: ক্যাশিং, অ্যাসিঙ্ক্রোনাস প্রসেসিং এবং রিসোর্স থ্রটলিং ব্যবহার করুন
5. **সিকিউরিটি**: ব্যাপক ইনপুট ভ্যালিডেশন, অথরাইজেশন চেক ও সংবেদনশীল ডেটা হ্যান্ডলিং প্রয়োগ করুন
6. **টেস্টিং**: বিস্তৃত ইউনিট, ইন্টিগ্রেশন এবং এন্ড-টু-এন্ড টেস্ট তৈরি করুন
7. **ওয়ার্কফ্লো প্যাটার্ন**: চেইন, ডিপ্যাচার ও প্যারালাল প্রসেসিংয়ের মত প্রতিষ্ঠিত প্যাটার্ন প্রয়োগ করুন

## ব্যায়াম

একটি MCP টুল এবং ওয়ার্কফ্লো ডিজাইন করুন যা একটি ডকুমেন্ট প্রসেসিং সিস্টেমের জন্য:

1. একাধিক ফরম্যাটে ডকুমেন্ট গ্রহণ করে (PDF, DOCX, TXT)
2. ডকুমেন্ট থেকে টেক্সট ও মূল তথ্য আহরণ করে
3. ডকুমেন্টের ধরন ও বিষয়বস্তু অনুযায়ী শ্রেণীবদ্ধ করে
4. প্রতিটি ডকুমেন্টের সারসংক্ষেপ তৈরি করে

টুল স্কিমা, এরর হ্যান্ডলিং এবং এই পরিস্থিতির জন্য উপযুক্ত ওয়ার্কফ্লো প্যাটার্ন বাস্তবায়ন করুন। এই বাস্তবায়ন কীভাবে টেস্ট করবেন তা বিবেচনা করুন।

## রিসোর্সসমূহ

1. সর্বশেষ উন্নয়নের খবর পাওয়ার জন্য [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) তে MCP কমিউনিটিতে যোগ দিন
2. ওপেন-সোর্স [MCP প্রকল্পগুলি](https://github.com/modelcontextprotocol) এ অবদান রাখুন
3. আপনার সংস্থার AI প্রকল্পে MCP নীতি প্রয়োগ করুন
4. আপনার শিল্পের জন্য বিশেষায়িত MCP বাস্তবায়নগুলি অন্বেষণ করুন
5. মাল্টি-মোডাল ইন্টিগ্রেশন বা এন্টারপ্রাইজ অ্যাপ্লিকেশন ইন্টিগ্রেশনের মত নির্দিষ্ট MCP বিষয়ের উপর উন্নত কোর্স নিতে বিবেচনা করুন
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) থেকে শেখা নীতিগুলির মাধ্যমে নিজস্ব MCP টুল ও ওয়ার্কফ্লো তৈরি করে পরীক্ষা করুন

## পরবর্তী ধাপ

পরবর্তী: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**দ্রষ্টব্য**:  
এই ডকুমেন্টটি AI অনুবাদ সেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। আমরা যথাসাধ্য সঠিকতার চেষ্টা করি, তবে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথি তার নিজস্ব ভাষায় সবচেয়ে বিশ্বস্ত উৎস হিসেবে বিবেচনা করা উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ পরামর্শযোগ্য। এই অনুবাদের ব্যবহারে সৃষ্ট কোনো ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->