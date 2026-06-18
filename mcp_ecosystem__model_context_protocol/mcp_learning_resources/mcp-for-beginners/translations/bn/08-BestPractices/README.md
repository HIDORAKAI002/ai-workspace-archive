# MCP ডেভেলপমেন্ট সেরা অনুশীলনসমূহ

[![MCP Development Best Practices](../../../translated_images/bn/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(এই পাঠের ভিডিও দেখতে উপরের চিত্রে ক্লিক করুন)_

## পর্যালোচনা

এই পাঠটি উৎপাদন পরিবেশে MCP সার্ভার এবং ফিচার ডেভেলপমেন্ট, টেস্টিং, এবং ডিপ্লয়মেন্টের জন্য উন্নত সেরা অনুশীলনগুলোর উপর কেন্দ্রীভূত। MCP ইকোসিস্টেমগুলোর জটিলতা এবং গুরুত্ব বৃদ্ধি পাওয়ায় প্রতিষ্ঠিত প্যাটার্ন অনুসরণ করলে নির্ভরযোগ্যতা, রক্ষণযোগ্যতা এবং আন্তঃঅপারেবিলিটি নিশ্চিত হয়। এই পাঠটি বাস্তব MCP বাস্তবায়ন থেকে প্রাপ্ত ব্যবহারিক জ্ঞান একত্রিত করে আপনাকে শক্তিশালী, দক্ষ সার্ভার তৈরি করতে নির্দেশনা দেয় কার্যকরী রিসোর্স, প্রোম্পট এবং টুলস সহ।

## শেখার উদ্দেশ্যসমূহ

এই পাঠ শেষে আপনি পারবে:

- MCP সার্ভার এবং ফিচার ডিজাইনে শিল্পগত সেরা অনুশীলন প্রয়োগ করা
- MCP সার্ভারের জন্য ব্যাপক টেস্টিং কৌশল তৈরি করা
- জটিল MCP অ্যাপ্লিকেশনের জন্য দক্ষ, পুনঃব্যবহারযোগ্য ওয়ার্কফ্লো প্যাটার্ন ডিজাইন করা
- MCP সার্ভারে সঠিক ত্রুটি হ্যান্ডলিং, লগিং, এবং অবজারভেবিলিটি বাস্তবায়ন করা
- কর্মক্ষমতা, নিরাপত্তা, এবং রক্ষণযোগ্যতার জন্য MCP বাস্তবায়ন অপ্টিমাইজ করা

## MCP এর মূল নীতিমালা

নির্দিষ্ট বাস্তবায়ন অনুশীলনে প্রবেশ করার আগে, কার্যকর MCP ডেভেলপমেন্ট পরিচালনার মূল নীতিমালা বোঝা গুরুত্বপূর্ণ:

1. **প্রমিত কমিউনিকেশন**: MCP এর ভিত্তি হিসেবে JSON-RPC 2.0 ব্যবহার করে, যা সমস্ত বাস্তবায়নে অনুরোধ, প্রতিক্রিয়া, এবং ত্রুটি পরিচালনার জন্য ধারাবাহিক ফরম্যাট প্রদান করে।

2. **ইউজার-কেন্দ্রিক ডিজাইন**: সর্বদা MCP বাস্তবায়নে ব্যবহারকারীর সম্মতি, নিয়ন্ত্রণ এবং স্বচ্ছতাকে অগ্রাধিকার দিন।

3. **নিরাপত্তা প্রথমে**: প্রমাণীকরণ, অনুমোদন, যাচাই এবং রেট লিমিটিংসহ শক্তিশালী নিরাপত্তা ব্যবস্থা প্রয়োগ করুন।

4. **মডুলার আর্কিটেকচার**: MCP সার্ভারগুলি মডুলার পদ্ধতিতে ডিজাইন করুন, যেখানে প্রতিটি টুল এবং রিসোর্সের একটি স্পষ্ট, কেন্দ্রীভূত উদ্দেশ্য থাকে।

5. **স্টেটফুল সংযোগ**: একাধিক অনুরোধ জুড়ে অবস্থা রক্ষা করার MCP ক্ষমতা কাজে লাগিয়ে আরও সুসংহত এবং প্রসঙ্গ-সচেতন কথোপকথন তৈরি করুন।

## অফিসিয়াল MCP সেরা অনুশীলন

নিম্নলিখিত সেরা অনুশীলনসমূহ অফিসিয়াল Model Context Protocol ডকুমেন্টেশন থেকে নেওয়া হয়েছে:

### নিরাপত্তা সেরা অনুশীলন

1. **ব্যবহারকারীর সম্মতি এবং নিয়ন্ত্রণ**: ডেটা অ্যাক্সেস বা অপারেশন পরিচালনার আগে সর্বদা স্পষ্ট ব্যবহারকারীর সম্মতি প্রয়োজন। কী ডেটা শেয়ার করা হবে এবং কোন অ্যাকশন অনুমোদিত তা পরিষ্কার নিয়ন্ত্রণ প্রদান করুন।

2. **ডেটার গোপনীয়তা**: শুধুমাত্র স্পষ্ট সম্মতিসহ ব্যবহারকারীর ডেটা প্রকাশ করুন এবং উপযুক্ত অ্যাক্সেস নিয়ন্ত্রণ দিয়ে সুরক্ষা দিন। অবৈধ ডেটা প্রেরণ প্রতিরোধ করুন।

3. **টুল নিরাপত্তা**: কোনো টুল চালানোর আগে স্পষ্ট ব্যবহারকারীর সম্মতি নিন। ব্যবহারকারীরা টুলের কার্যকারিতা বুঝতে পারেন তা নিশ্চিত করুন এবং শক্তিশালী নিরাপত্তা সীমা প্রয়োগ করুন।

4. **টুল অনুমতি নিয়ন্ত্রণ**: একটি সেশনের সময় কোন টুলগুলি মডেল ব্যবহার করতে পারবে তা কনফিগার করুন, যাতে শুধুমাত্র স্পষ্ট অনুমোদিত টুলসমূহই অ্যাক্সেসযোগ্য হয়।

5. **প্রমাণীকরণ**: API কী, OAuth টোকেন, বা অন্যান্য নিরাপদ প্রমাণীকরণ পদ্ধতি ব্যবহার করে টুল, রিসোর্স, বা সংবেদনশীল অপারেশনে অ্যাক্সেস দেওয়ার আগে সঠিক প্রমাণীকরণ নিশ্চিত করুন।

6. **প্যারামিটার যাচাই**: সকল টুল কলের জন্য যাচাই প্রয়োজন যাতে অসংলগ্ন বা ক্ষতিকারক ইনপুট টুল বাস্তবায়নে পৌঁছানো না পারে।

7. **রেট লিমিটিং**: ক্ষতিকর ব্যবহার প্রতিরোধ এবং সার্ভার রিসোর্সের ন্যায্য ব্যবহার নিশ্চিত করতে রেট লিমিট প্রয়োগ করুন।

### বাস্তবায়ন সেরা অনুশীলন

1. **ক্ষমতা আলোচনাসভা**: সংযোগ স্থাপনকালে সমর্থিত ফিচার, প্রোটোকল ভার্সন, উপলব্ধ টুলস এবং রিসোর্স সম্পর্কিত তথ্য বিনিময় করুন।

2. **টুল ডিজাইন**: একাধিক সমস্যা মোকাবেলা করার পরিবর্তে একটি স্পষ্ট এবং কার্যকর টুল তৈরি করুন যা একটি কাজ ভালভাবে সামলাতে পারে।

3. **ত্রুটি হ্যান্ডলিং**: সমস্যা নির্ণয়ের জন্য স্ট্যান্ডার্ড ত্রুটি বার্তা এবং কোড বাস্তবায়ন করুন, ব্যর্থতা সৌম্যভাবে পরিচালনা করুন, এবং কার্যকর প্রতিক্রিয়া দিন।

4. **লগিং**: অডিট, ডিবাগিং এবং প্রোটোকল ইন্টারঅ্যাকশন সর্বদা মনিটর করার জন্য গঠনমূলক লগ কনফিগার করুন।

5. **প্রগ্রেস ট্র্যাকিং**: দীর্ঘস্থায়ী কাজগুলোর জন্য ব্যবহারকারী ইন্টারফেসকে প্রতিক্রিয়াশীল রাখার জন্য অগ্রগতি আপডেট রিপোর্ট করুন।

6. **রিকোয়েস্ট বাতিলকরণ**: প্রয়োজনীয় না বা দেরী হওয়া অনুরোধসমূহ বাতিল করার অনুমতি দিন।

## অতিরিক্ত রেফারেন্স

MCP সেরা অনুশীলনগুলোর সর্বশেষ তথ্যের জন্য দেখুন:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - নিরাপত্তা ঝুঁকি এবং প্রতিকারসমূহ
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - বাস্তব নিরাপত্তা প্রশিক্ষণ

## ব্যবহারিক বাস্তবায়ন উদাহরণসমূহ

### টুল ডিজাইন সেরা অনুশীলন

#### ১. একক দায়িত্ব নীতি

প্রত্যেক MCP টুলকে একটি পরিষ্কার, কেন্দ্রীভূত উদ্দেশ্য থাকতে হবে। একাধিক সমস্যা মোকাবেলার জন্য মনোলিথিক টুল তৈরি করার পরিবর্তে নির্দিষ্ট কাজের জন্য বিশেষায়িত টুল তৈরি করুন।

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

#### ২. ধারাবাহিক ত্রুটি হ্যান্ডলিং

তথ্যবহুল ত্রুটি বার্তা এবং উপযুক্ত পুনরুদ্ধার পদ্ধতি সহ শক্তিশালী ত্রুটি হ্যান্ডলিং বাস্তবায়ন করুন।

```python
# বিস্তৃত ত্রুটি পরিচালনার সাথে পাইথন উদাহরণ
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # পরামিতি যাচাইকরণ
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # নিরাপত্তা যাচাইকরণ
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # টাইমআউট সহ ডাটাবেস অপারেশন
                async with timeout(10):  # ১০ সেকেন্ডের টাইমআউট
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # সংযোগ ত্রুটিগুলি অতিমাত্রিক হতে পারে
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # ক্যোয়েরি ত্রুটিগুলি সম্ভবত ক্লায়েন্ট ত্রুটি
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # সরঞ্জাম-নির্দিষ্ট ত্রুটিগুলি পার হতে দিন
            raise
        except Exception as e:
            # অপ্রত্যাশিত ত্রুটিগুলির জন্য ক্যাচ-অল
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL ইনজেকশন সনাক্তকরণের বাস্তবায়ন
        pass
        
    def _log_error(self, message, error):
        # ত্রুটি লগিং-এর বাস্তবায়ন
        pass
```

#### ৩. প্যারামিটার যাচাই

অসঙ্গত বা ক্ষতিকারক ইনপুট প্রতিরোধ করতে সর্বদা প্যারামিটারগুলি সম্পূর্ণভাবে যাচাই করুন।

```javascript
// জাভাস্ক্রিপ্ট/টাইপস্ক্রিপ্ট উদাহরণ বিস্তারিত প্যারামিটার যাচাই সহ
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
    
    // ২. প্যারামিটারের ধরন যাচাই করুন
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
    
    // ৪. লেখার অপারেশনের জন্য কন্টেন্ট উপস্থিতি যাচাই করুন
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // ৫. পথ নিরাপত্তা যাচাই
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // যাচাইকৃত প্যারামিটারের ভিত্তিতে বাস্তবায়ন
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // পথ নিরাপত্তা যাচাইয়ের বাস্তবায়ন
    // ...
  }
}
```

### নিরাপত্তা বাস্তবায়ন উদাহরণসমূহ

#### ১. প্রমাণীকরণ এবং অনুমোদন

```java
// প্রমাণীকরণ এবং অনুমোদনের সাথে জাভা উদাহরণ
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
        // 1. প্রমাণীকরণ প্রেক্ষিত বের করুন
        String authToken = request.getContext().getAuthToken();
        
        // 2. ব্যবহারকারীকে প্রমাণীকরণ করুন
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. নির্দিষ্ট অপারেশনটির জন্য অনুমোদন যাচাই করুন
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. অনুমোদিত অপারেশনটি এগিয়ে নিয়ে যান
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

#### ২. রেট লিমিটিং

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

## টেস্টিং সেরা অনুশীলন

### ১. ইউনিট টেস্টিং MCP টুলস

আপনার টুলগুলোকে সম্পূর্ণ আলাদাভাবে পরীক্ষা করুন, বাহ্যিক নির্ভরশীলতা নকল করুন:

```typescript
// একটি টুল ইউনিট টেস্টের TypeScript উদাহরণ
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // একটি মক ওয়েদার সার্ভিস তৈরি করুন
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // মক নির্ভরশীলতা সহ টুল তৈরি করুন
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // সাজান
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // ক্রিয়া করুন
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // নিশ্চিত করুন
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // সাজান
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // ক্রিয়া করুন এবং নিশ্চিত করুন
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
        
        # টুল এক্সিকিউশন পরীক্ষা করুন
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

## পারফরম্যান্স অপ্টিমাইজেশন

### ১. ক্যাশিং কৌশল

প্রতিক্রিয়া সময় এবং রিসোর্স ব্যবহারের জন্য উপযুক্ত ক্যাশিং বাস্তবায়ন করুন:

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

#### ২. নির্ভরতা ইনজেকশন এবং পরীক্ষণযোগ্যতা

টুলগুলোকে তাদের নির্ভরশীলতা কনস্ট্রাক্টর ইনজেকশনের মাধ্যমে পেতে ডিজাইন করুন, যাতে সেগুলো টেস্টযোগ্য এবং কনফিগারযোগ্য হয়:

```java
// নির্ভরশীলতা ইনজেকশনের সঙ্গে জাভা উদাহরণ
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // কনস্ট্রাকটরের মাধ্যমে ইনজেক্ট করা নির্ভরশীলতাগুলো
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

#### ৩. কম্পোজেবল টুলস

গঠনমূলক ও জটিল ওয়ার্কফ্লো তৈরির জন্য টুলগুলোকে একত্রে ব্যবহার করার মতো ডিজাইন করুন:

```python
# পাইথন উদাহরণ যা সংযোজ্য টুলস দেখাচ্ছে
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # বাস্তবায়ন...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # এই টুলটি dataFetch টুলের ফলাফল ব্যবহার করতে পারে
    async def execute_async(self, request):
        # বাস্তবায়ন...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # এই টুলটি dataAnalysis টুলের ফলাফল ব্যবহার করতে পারে
    async def execute_async(self, request):
        # বাস্তবায়ন...
        pass

# এই টুলগুলো স্বাধীনভাবে অথবা একটি ওয়ার্কফ্লোর অংশ হিসাবে ব্যবহার করা যেতে পারে
```

### স্কিমা ডিজাইন সেরা অনুশীলন

স্কিমা হলো মডেল এবং আপনার টুলের চুক্তি। ভাল ডিজাইনের স্কিমা টুল ব্যবহারে উন্নতি আনে।

#### ১. পরিষ্কার প্যারামিটার বর্ণনা

প্রতিটি প্যারামিটারের জন্য সবসময় বর্ণনামূলক তথ্য অন্তর্ভুক্ত করুন:

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

#### ২. যাচাই বিধিনিষেধ

অবৈধ ইনপুট প্রতিরোধে যাচাই বিধিনিষেধ অন্তর্ভুক্ত করুন:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ইমেল বৈশিষ্ট্য ফরম্যাট যাচাইকরণের সাথে
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // বয়স বৈশিষ্ট্য সংখ্যাসূচক সীমাবদ্ধতার সাথে
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // বর্ণনামূলক বৈশিষ্ট্য
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

#### ৩. ধারাবাহিক রিটার্ন স্ট্রাকচার

ফলাফল মডেলদের জন্য সহজবোধ্য করতে আপনার প্রতিক্রিয়া কাঠামোতে ধারাবাহিকতা বজায় রাখুন:

```python
async def execute_async(self, request):
    try:
        # অনুরোধ প্রক্রিয়া করুন
        results = await self._search_database(request.parameters["query"])
        
        # সর্বদা একটি সামঞ্জস্যপূর্ণ কাঠামো প্রদান করুন
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

মোটামুটি বিশ্বাসযোগ্য MCP টুলের জন্য শক্তিশালী ত্রুটি হ্যান্ডলিং অত্যন্ত গুরুত্বপূর্ণ।

#### ১. সৌম্য ত্রুটি হ্যান্ডলিং

উপযুক্ত স্তরে ত্রুটি পরিচালনা করুন এবং তথ্যবহুল বার্তা দিন:

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

#### ২. গঠনমূলক ত্রুটি প্রতিক্রিয়া

সম্ভব হলে গঠনমূলক ত্রুটি তথ্য ফেরত দিন:

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
        
        // অন্যান্য এক্সসেপশনগুলি ToolExecutionException হিসাবে পুনরায় নিক্ষেপ করুন
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### ৩. পুনরায় চেষ্টা যুক্তি

অস্থায়ী ব্যর্থতার জন্য উপযুক্ত পুনরায় চেষ্টা লজিক বাস্তবায়ন করুন:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # সেকেন্ড
    
    while retry_count < max_retries:
        try:
            # বাহ্যিক এপিআই কল করুন
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # ধ্রুবক ব্যাকঅফ
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # অস্থায়ী নয় এমন ত্রুটি, পুনরায় চেষ্টা করবেন না
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### কর্মক্ষমতা অপ্টিমাইজেশন

#### ১. ক্যাশিং

ব্যয়বহুল অপারেশনের জন্য ক্যাশিং বাস্তবায়ন করুন:

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

I/O যুক্ত অপারেশনের জন্য অ্যাসিঙ্ক্রোনাস প্রোগ্রামিং প্যাটার্ন ব্যবহার করুন:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // দীর্ঘ সময় চলমান অপারেশনের জন্য, অবিলম্বে একটি প্রসেসিং আইডি ফেরত দিন
        String processId = UUID.randomUUID().toString();
        
        // অ্যাসিঙ্ক প্রক্রিয়াকরণ শুরু করুন
        CompletableFuture.runAsync(() -> {
            try {
                // দীর্ঘ সময় চলমান অপারেশন সম্পাদন করুন
                documentService.processDocument(documentId);
                
                // অবস্থা আপডেট করুন (সাধারণত একটি ডাটাবেজে সংরক্ষণ করা হয়)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // প্রসেস আইডি সহ অবিলম্বে উত্তর প্রদান করুন
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // সাথী অবস্থা পরীক্ষা সরঞ্জাম
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

ওভারলোড প্রতিরোধ করতে রিসোর্স থ্রটলিং বাস্তবায়ন করুন:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # প্রতি সেকেন্ডে ৫টি অনুরোধ অনুমতি দিন
            bucket_size=10        # ১০টি অনুরোধ পর্যন্ত বিস্ফোরণ অনুমতি দিন
        )
    
    async def execute_async(self, request):
        # পরীক্ষা করুন আমরা এগিয়ে যেতে পারি কিনা বা অপেক্ষা করতে হবে
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # যদি অপেক্ষা অনেক দীর্ঘ হয়
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # প্রয়োজনীয় বিলম্ব সময়ের জন্য অপেক্ষা করুন
                await asyncio.sleep(delay)
        
        # এক টোকেন ব্যবহার করুন এবং অনুরোধটি সম্পন্ন করুন
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
            
            # পরবর্তী টোকেন উপলব্ধ হওয়ার সময় গণনা করুন
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # অতিবাহিত সময়ের উপর ভিত্তি করে নতুন টোকেন যোগ করুন
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### নিরাপত্তা সেরা অনুশীলন

#### ১. ইনপুট যাচাই

সবসময় ইনপুট প্যারামিটার সম্পূর্ণ যাচাই করুন:

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
    // অনুরোধ থেকে ব্যবহারকারীর প্রসঙ্গ সংগ্রহ করুন
    UserContext user = request.getContext().getUserContext();
    
    // পরীক্ষা করুন ব্যবহারকারীর কাছে প্রয়োজনীয় অনুমতি আছে কিনা
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // নির্দিষ্ট সম্পদের জন্য, সেই সম্পদের অ্যাক্সেস পরীক্ষা করুন
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // টুলের কার্যনির্বাহ শুরু করুন
    // ...
}
```

#### ৩. সংবেদনশীল ডেটা হ্যান্ডলিং

সতর্কতার সাথে সংবেদনশীল ডেটা পরিচালনা করুন:

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
        
        # ব্যবহারকারীর তথ্য পান
        user_data = await self.user_service.get_user_data(user_id)
        
        # স্পষ্টভাবে অনুরোধ এবং অনুমোদিত না হলে সংবেদনশীল ক্ষেত্রগুলি ফিল্টার করুন
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # অনুরোধ প্রসঙ্গে অনুমোদন স্তর পরীক্ষা করুন
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # মূলটি পরিবর্তন এড়াতে একটি কপি তৈরি করুন
        redacted = user_data.copy()
        
        # নির্দিষ্ট সংবেদনশীল ক্ষেত্রগুলি লুকিয়ে দিন
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # নেস্টেড সংবেদনশীল তথ্য লুকিয়ে দিন
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP টুলসের জন্য টেস্টিং সেরা অনুশীলন

ব্যাপ্ত টেস্টিং নিশ্চিত করে MCP টুলগুলি সঠিকভাবে কাজ করে, প্রান্তিক অবস্থাগুলো হ্যান্ডেল করে, এবং সিস্টেমের সঙ্গে সঠিকভাবে ইন্টিগ্রেট করে।

### ইউনিট টেস্টিং

#### ১. প্রতিটি টুল আলাদাভাবে টেস্ট করুন

প্রতিটি টুলের কার্যকারিতার জন্য কেন্দ্রীভূত টেস্ট তৈরি করুন:

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

#### ২. স্কিমা যাচাই টেস্ট

স্কিমাগুলো বৈধ এবং সঠিকভাবে বিধিনিষেধ আরোপ করে তা পরীক্ষা করুন:

```java
@Test
public void testSchemaValidation() {
    // টুল ইনস্ট্যান্স তৈরি করুন
    SearchTool searchTool = new SearchTool();
    
    // স্কিমা পান
    Object schema = searchTool.getSchema();
    
    // যাচাইকরণের জন্য স্কিমাটি JSON-এ রূপান্তর করুন
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // যাচাই করুন স্কিমাটি বৈধ JSONSchema কিনা
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // বৈধ প্যারামিটার পরীক্ষা করুন
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // প্রয়োজনীয় প্যারামিটার অনুপস্থিত পরীক্ষা করুন
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // অবৈধ প্যারামিটার ধরণের পরীক্ষা করুন
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### ৩. ত্রুটি হ্যান্ডলিং টেস্ট

ত্রুটির অবস্থা জন্য নির্দিষ্ট টেস্ট তৈরি করুন:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # সাজান
    tool = ApiTool(timeout=0.1)  # খুব ছোট টাইমআউট
    
    # একটি অনুরোধ মক করুন যা টাইমআউট হবে
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # টাইমআউটের চেয়ে বেশি দীর্ঘ
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # কাজ করুন ও নিশ্চিত করুন
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ব্যতিক্রমের বার্তা যাচাই করুন
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # সাজান
    tool = ApiTool()
    
    # একটি রেট-সীমাবদ্ধ প্রতিক্রিয়া মক করুন
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
        
        # কাজ করুন ও নিশ্চিত করুন
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # যাচাই করুন ব্যতিক্রমে রেট লিমিট তথ্য রয়েছে কিনা
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### ইন্টিগ্রেশন টেস্টিং

#### ১. টুল চেইন টেস্টিং

প্রত্যাশিত সংমিশ্রণে একসাথে কাজ করা টুলগুলো পরীক্ষা করুন:

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

সম্পূর্ণ টুল রেজিস্ট্রেশন এবং কার্যকরী MCP সার্ভার পরীক্ষা করুন:

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
        // টুল রিকোয়েস্ট তৈরি করুন
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // রিকোয়েস্ট পাঠান এবং রেসপন্স যাচাই করুন
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // অবৈধ টুল রিকোয়েস্ট তৈরি করুন
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // অনুপস্থিত প্যারামিটার "b"
        request.put("parameters", parameters);
        
        // রিকোয়েস্ট পাঠান এবং ত্রুটি রেসপন্স যাচাই করুন
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### ৩. এন্ড-টু-এন্ড টেস্টিং

মডেল প্রোম্পট থেকে টুল কার্যকর করার সম্পূর্ণ ওয়ার্কফ্লো পরীক্ষা করুন:

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
    
    # মক আবহাওয়া সরঞ্জামের প্রতিক্রিয়া
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

### পারফরম্যান্স টেস্টিং

#### ১. লোড টেস্টিং

আপনার MCP সার্ভার কতগুলো একযোগে অনুরোধ পরিচালনা করতে পারে পরীক্ষা করুন:

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

চরম লোডের অধীনে সিস্টেম পরীক্ষা করুন:

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
    
    // টেস্ট প্ল্যান, থ্রেড গ্রুপ, স্যাম্পলারস ইত্যাদি তৈরি করুন
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
    assertTrue(summaryReport.getAverage() < 200); // গড় সাড়া সময় < ২০০মিলিসেকেন্ড
    assertTrue(summaryReport.getPercentile(90.0) < 500); // ৯০তম পারসেন্টাইল < ৫০০মিলিসেকেন্ড
}
```

#### ৩. মনিটরিং এবং প্রোফাইলিং

দীর্ঘমেয়াদী কর্মক্ষমতা বিশ্লেষণের জন্য মনিটরিং সেটআপ করুন:

```python
# একটি MCP সার্ভারের জন্য পর্যবেক্ষণ কনফিগার করুন
def configure_monitoring(server):
    # প্রোমিথিউস মেট্রিক্স সেট আপ করুন
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
    
    # মেট্রিক্স এন্ডপয়েন্ট উন্মুক্ত করুন
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP ওয়ার্কফ্লো ডিজাইন প্যাটার্নসমূহ

সুষ্ঠু ডিজাইনকৃত MCP ওয়ার্কফ্লো দক্ষতা, নির্ভরযোগ্যতা, এবং রক্ষণযোগ্যতা উন্নত করে। এখানে অনুসরণীয় প্রধান প্যাটার্নসমূহ:

### ১. টুলসের চেইন প্যাটার্ন

একাধিক টুলকে সিকোয়েন্সে সংযুক্ত করুন যেখানে প্রতিটি টুলের আউটপুট পরবর্তী টুলের ইনপুট হয়:

```python
# পাইথন চেইন অফ টুলস ইমপ্লিমেন্টেশন
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # ক্রমান্বয়ে কার্যকর করার জন্য টুল নামের তালিকা
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # চেইনের প্রত্যেকটি টুল কার্যকর করুন, পূর্বের ফলাফল পাস করে
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

একটি কেন্দ্রীয় টুল ব্যবহার করুন যা ইনপুট অনুসারে বিশেষায়িত টুলগুলিতে ডিসপ্যাচ করে:

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

### ৩. প্যারালাল প্রসেসিং প্যাটার্ন

কার্যকারিতার জন্য একযোগে একাধিক টুল চালান:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // ধাপ ১: ডেটাসেট মেটাডেটা আনা (সিনক্রোনাস)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // ধাপ ২: একাধিক বিশ্লেষণ একযোগে চালু করা
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
        
        // সব সমান্তরাল কাজ শেষ হওয়ার জন্য অপেক্ষা করুন
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // সম্পন্ন হওয়ার জন্য অপেক্ষা করুন
        
        // ধাপ ৩: ফলাফল একত্রিত করা
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // ধাপ ৪: সারাংশ রিপোর্ট তৈরি করা
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // সম্পূর্ণ ওয়ার্কফ্লো ফলাফল ফিরিয়ে দিন
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### ৪. ত্রুটি পুনরুদ্ধার প্যাটার্ন

টুল ব্যর্থতার জন্য সূক্ষ্ম বিকল্প ব্যবস্থা বাস্তবায়ন করুন:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # প্রথমে প্রধান সরঞ্জাম চেষ্টা করুন
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # ব্যর্থতার লগ করুন
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # দ্বিতীয়ক সরঞ্জামে যান
            try:
                # প্রতিস্থাপন সরঞ্জামের জন্য প্যারামিটার রূপান্তর করতে হতে পারে
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # উভয় সরঞ্জাম ব্যর্থ হয়েছে
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # এই বাস্তবায়ন নির্দিষ্ট সরঞ্জামগুলোর উপর নির্ভর করবে
        # এই উদাহরণের জন্য, আমরা শুধুমাত্র মূল প্যারামিটারগুলি ফিরিয়ে দেব
        return params

# উদাহরণ ব্যবহার
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # প্রধান (পেইড) আবহাওয়া এপিআই
        "basicWeatherService",    # অধিগমন (বিনামূল্যে) আবহাওয়া এপিআই
        {"location": location}
    )
```

### ৫. ওয়ার্কফ্লো কম্পোজিশন প্যাটার্ন

সহজ ওয়ার্কফ্লো গুলো যুক্ত করে জটিল ওয়ার্কফ্লো তৈরি করুন:

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

# MCP সার্ভার টেস্টিং: সেরা অনুশীলন এবং শীর্ষ টিপস

## পর্যালোচনা

বিশ্বস্ত, উচ্চ-মানের MCP সার্ভার ডেভেলপমেন্টে টেস্টিং একটি গুরুত্বপূর্ণ দিক। এই গাইডটি ইউনিট টেস্ট থেকে ইন্টিগ্রেশন টেস্ট এবং এন্ড-টু-এন্ড যাচাইকরণের মাধ্যমে আপনার MCP সার্ভারগুলি টেস্ট করার ব্যাপক সেরা অনুশীলন এবং টিপস প্রদান করে।

## কেন MCP সার্ভারের জন্য টেস্টিং জরুরি

MCP সার্ভার AI মডেল এবং ক্লায়েন্ট অ্যাপ্লিকেশনগুলোর মধ্যে গুরুত্বপূর্ণ মিডলওয়্যার হিসাবে কাজ করে। সম্পূর্ণ টেস্টিং নিশ্চিত করে:

- উৎপাদন পরিবেশে নির্ভরযোগ্যতা
- অনুরোধ এবং প্রতিক্রিয়ার সঠিক পরিচালনা
- MCP স্পেসিফিকেশনগুলোর সঠিক বাস্তবায়ন
- ব্যর্থতা এবং প্রান্তিক অবস্থার প্রতিরোধ ক্ষমতা
- বিভিন্ন লোডে ধারাবাহিক পারফরম্যান্স

## MCP সার্ভারের জন্য ইউনিট টেস্টিং

### ইউনিট টেস্টিং (ভিত্তি)

ইউনিট টেস্টগুলো আপনার MCP সার্ভারের পৃথক উপাদানগুলো আলাদাভাবে যাচাই করে।

#### কী টেস্ট করবেন

1. **রিসোর্স হ্যান্ডলারেরা**: প্রতিটি রিসোর্স হ্যান্ডলারের লজিক স্বাধীনভাবে পরীক্ষা করুন
2. **টুল বাস্তবায়ন**: বিভিন্ন ইনপুট দিয়ে টুল আচরণ যাচাই করুন
3. **প্রোম্পট টেমপ্লেট**: নিশ্চিত করুন প্রোম্পট টেমপ্লেট সঠিকভাবে রেন্ডার হয়
4. **স্কিমা যাচাই**: প্যারামিটার যাচাই লজিক পরীক্ষা করুন
5. **ত্রুটি হ্যান্ডলিং**: অবৈধ ইনপুটে ত্রুটি প্রতিক্রিয়া যাচাই করুন

#### ইউনিট টেস্টিং সেরা অনুশীলন

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
# পাইথনে একটি ক্যালকুলেটর টুলের জন্য উদাহরণ ইউনিট পরীক্ষা
def test_calculator_tool_add():
    # সাজান
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # কাজ করুন
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # নিশ্চিত করুন
    assert result["value"] == 12
```

### ইন্টিগ্রেশন টেস্টিং (মধ্য স্তর)

ইন্টিগ্রেশন টেস্ট MCP সার্ভারের উপাদানগুলোর পারস্পরিক ক্রিয়া যাচাই করে।

#### কী টেস্ট করবেন

1. **সার্ভার ইনিশিয়ালাইজেশন**: বিভিন্ন কনফিগারেশনের সঙ্গে সার্ভার স্টার্টআপ পরীক্ষা করুন
2. **রুট রেজিস্ট্রেশন**: নিশ্চিত করুন সব এন্ডপয়েন্ট ঠিকভাবে নিবন্ধিত হয়েছে
3. **রিকোয়েস্ট প্রক্রিয়াকরণ**: সম্পূর্ণ অনুরোধ-প্রতিক্রিয়া চক্র পরীক্ষা করুন
4. **ত্রুটি প্রোপাগেশন**: উপাদানসমূহে ত্রুটি সঠিকভাবে পরিচালিত হচ্ছে কিনা নিশ্চিত করুন
5. **প্রমাণীকরণ ও অনুমোদন**: নিরাপত্তা প্রক্রিয়া টেস্ট করুন

#### ইন্টিগ্রেশন টেস্টিং সেরা অনুশীলন

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

### এন্ড-টু-এন্ড টেস্টিং (শীর্ষ স্তর)

এন্ড-টু-এন্ড টেস্ট ক্লায়েন্ট থেকে সার্ভারের সম্পূর্ণ সিস্টেম আচরণ যাচাই করে।

#### কী টেস্ট করবেন

1. **ক্লায়েন্ট-সার্ভার যোগাযোগ**: সম্পূর্ণ অনুরোধ-প্রতিক্রিয়া চক্র পরীক্ষা করুন
2. **বাস্তব ক্লায়েন্ট SDK**: প্রকৃত ক্লায়েন্ট বাস্তবায়ন দিয়ে পরীক্ষা করুন
3. **লোডের অধীনে কর্মক্ষমতা**: একাধিক একযোগে অনুরোধে আচরণ যাচাই করুন
4. **ত্রুটি পুনরুদ্ধার**: ব্যর্থতা থেকে সিস্টেম পুনরুদ্ধার টেস্ট করুন
5. **দীর্ঘস্থায়ী অপারেশন**: স্ট্রিমিং এবং দীর্ঘ অপারেশন হ্যান্ডলিং যাচাই করুন

#### এন্ড-টু-এন্ড টেস্টিং সেরা অনুশীলন

```typescript
// টাইপস্ক্রিপ্টে ক্লায়েন্ট সহ উদাহরণ E2E পরীক্ষা
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // টেস্ট পরিবেশে সার্ভার শুরু করুন
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // কাজ করুন
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // নিশ্চিত করুন
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP টেস্টিং এর জন্য মকিং কৌশলসমূহ

মকিং টেস্টিং চলাকালে উপাদানগুলো পৃথক করার জন্য অপরিহার্য।

### মকের উপাদানসমূহ

1. **বাহ্যিক AI মডেল**: পূর্বানুমানযোগ্য টেস্টিংয়ের জন্য মডেল প্রতিক্রিয়া মক করুন
2. **বাহ্যিক সার্ভিস**: API নির্ভরশীলতাগুলো (ডাটাবেজ, তৃতীয় পক্ষ সার্ভিস) মক করুন
3. **প্রমাণীকরণ সার্ভিস**: পরিচয় প্রদানকারী মক করুন
4. **রিসোর্স প্রদানকারী**: ব্যয়বহুল রিসোর্স হ্যান্ডলার মক করুন

### উদাহরণ: AI মডেলের প্রতিক্রিয়া মকিং

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

## পারফরম্যান্স টেস্টিং

পারফরম্যান্স টেস্টিং উৎপাদন MCP সার্ভারের জন্য অত্যাবশ্যক।

### কী পরিমাপ করবেন

1. **লেটেন্সি**: অনুরোধের প্রতিক্রিয়া সময়
2. **থ্রুপুট**: প্রতি সেকেন্ডে পরিচালিত অনুরোধ
3. **রিসোর্স ব্যবহারের মাত্রা**: CPU, মেমোরি, নেটওয়ার্ক ব্যবহার
4. **একযোগে অনুরোধের হ্যান্ডলিং**: সমান্তরাল অনুরোধের সময় আচরণ
5. **স্কেলিং বৈশিষ্ট্য**: লোড বৃদ্ধি পেলে কর্মক্ষমতা

### পারফরম্যান্স টেস্টিং টুলসমূহ

- **k6**: ওপেন সোর্স লোড টেস্টিং টুল
- **JMeter**: ব্যাপক পারফরম্যান্স টেস্টিং
- **Locust**: পাইথনভিত্তিক লোড টেস্টিং
- **Azure Load Testing**: ক্লাউডভিত্তিক পারফরম্যান্স টেস্টিং

### উদাহরণ: k6 দিয়ে বেসিক লোড টেস্ট

```javascript
// MCP সার্ভারের লোড টেস্টিংয়ের জন্য k6 স্ক্রিপ্ট
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 ভার্চুয়াল ব্যবহারকারী
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

পরীক্ষাগুলো স্বয়ংক্রিয়করণ নিশ্চিত করে ধারাবাহিক গুণমান এবং দ্রুত প্রতিক্রিয়া চক্র।

### CI/CD ইন্টিগ্রেশন

1. **পুল রিকুয়েস্টে ইউনিট টেস্ট চালানো**: কোড পরিবর্তনে আগের কার্যকারিতা ক্ষতিগ্রস্থ হচ্ছে কিনা তা নিশ্চিত করুন
2. **স্টেজিং-এ ইন্টিগ্রেশন টেস্ট**: প্রি-প্রোডাকশন পরিবেশে ইন্টিগ্রেশন টেস্ট চালানো  
3. **পারফরমেন্স বেন্চমার্ক**: রিগ্রেশন ধরার জন্য পারফরমেন্স বেন্চমার্ক বজায় রাখা  
4. **সিকিউরিটি স্ক্যান**: পাইপলাইনের অংশ হিসাবে স্বয়ংক্রিয় সিকিউরিটি টেস্টিং  

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
  
## MCP স্পেসিফিকেশন সহ সম্মতি পরীক্ষণ

আপনার সার্ভার MCP স্পেসিফিকেশন সঠিকভাবে বাস্তবায়ন করছে কিনা যাচাই করুন।

### মূল সম্মতি ক্ষেত্রসমূহ

1. **API এন্ডপয়েন্টসমূহ**: প্রয়োজনীয় এন্ডপয়েন্টগুলো পরীক্ষা করুন (/resources, /tools ইত্যাদি)  
2. **রিকোয়েস্ট/রেসপন্স ফরম্যাট**: স্কিমা সম্মতি যাচাই করুন  
3. **এরর কোডসমূহ**: বিভিন্ন পরিস্থিতিতে সঠিক স্ট্যাটাস কোড যাচাই করুন  
4. **কন্টেন্ট টাইপসমূহ**: বিভিন্ন কন্টেন্ট টাইপ পরিচালনার পরীক্ষা করুন  
5. **অথেন্টিকেশন ফ্লো**: স্পেক-সঙ্গত অথ মেকানিজম যাচাই করুন  

### সম্মতি টেস্ট সুইট

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
  
## কার্যকর MCP সার্ভার টেস্টিংয়ের জন্য শীর্ষ ১০ টিপস

1. **টুল ডিফিনিশন আলাদাভাবে পরীক্ষা করুন**: টুল লজিক থেকে স্কিমা ডিফিনিশন আলাদাভাবে যাচাই করুন  
2. **প্যারামিটারাইজড টেস্ট ব্যবহার করুন**: বিভিন্ন ইনপুট সহ টুলগুলি পরীক্ষা করুন, বিশেষ করে এজ কেসসমূহ  
3. **এরর রেসপন্স চেক করুন**: সম্ভাব্য সব এরর কন্ডিশনের জন্য সঠিক এরর হ্যান্ডলিং যাচাই করুন  
4. **অথরাইজেশন লজিক পরীক্ষা করুন**: বিভিন্ন ইউজার রোলের জন্য সঠিক এক্সেস কন্ট্রোল নিশ্চিত করুন  
5. **টেস্ট কাভারেজ মনিটর করুন**: ক্রিটিক্যাল পাথ কোডের উচ্চ কাভারেজ লক্ষ্য করুন  
6. **স্ট্রিমিং রেসপন্স পরীক্ষা করুন**: স্ট্রিমিং কন্টেন্ট সঠিকভাবে পরিচালনার যাচাই করুন  
7. **নেটওয়ার্ক সমস্যা সিমুলেট করুন**: দুর্বল নেটওয়ার্ক কন্ডিশনে আচরণ পরীক্ষা করুন  
8. **রিসোর্স লিমিট টেস্ট করুন**: কোটা বা রেট লিমিট পৌঁছালে আচরণ যাচাই করুন  
9. **রিগ্রেশন টেস্ট অটোমেশন করুন**: প্রতিটি কোড পরিবর্তনের সাথে রানের জন্য একটি টেস্ট সুইট তৈরি করুন  
10. **টেস্ট কেস ডকুমেন্ট করুন**: টেস্ট সিচুয়েশন পরিষ্কারভাবে ডকুমেন্টেশন বজায় রাখুন  

## সাধারণ টেস্টিং ভুল

- **শুধুমাত্র সুখকর পথের ওপর অতিরিক্ত বিশ্বাস**: এরর কেসগুলো ভালভাবে পরীক্ষা করা উচিত  
- **পারফরমেন্স টেস্ট উপেক্ষা করা**: প্রোডাকশনে প্রভাব ফেলার আগে বটলনেক শনাক্ত করুন  
- **শুধুমাত্র আলাদাভাবে পরীক্ষা করা**: ইউনিট, ইন্টিগ্রেশন, এবং E2E টেস্ট একসঙ্গে করুন  
- **অপূর্ণ API কাভারেজ**: সব এন্ডপয়েন্ট এবং ফিচার পরীক্ষা করা নিশ্চিত করুন  
- **অসঙ্গত টেস্ট এনভায়রনমেন্ট**: ধারাবাহিক টেস্ট এনভায়রনমেন্টের জন্য কন্টেইনার ব্যবহারের পরামর্শ  

## উপসংহার

বিশ্বস্ত, উচ্চমানের MCP সার্ভারগুলোর উন্নয়নের জন্য একটি ব্যাপক টেস্টিং কৌশল খুবই জরুরি। এই গাইডে বর্ণিত সেরা অনুশীলন এবং টিপস বাস্তবায়ন করে, আপনি নিশ্চিত করতে পারবেন আপনার MCP ইমপ্লিমেন্টেশনগুলি সর্বোচ্চ মান, নির্ভরযোগ্যতা এবং পারফরমেন্স মেনে চলে।  

## মূল বিষয়গুলি

1. **টুল ডিজাইন**: একক দায়িত্ব নীতির অনুসরণ করুন, ডিপেনডেন্সি ইনজেকশন ব্যবহার করুন, এবং কম্পোজেবল ডিজাইন করুন  
2. **স্কিমা ডিজাইন**: পরিষ্কার, ভাল ডকুমেন্টেড স্কিমা তৈরি করুন এবং সঠিক ভ্যালিডেশন কনস্ট্রেন্টস প্রয়োগ করুন  
3. **এরর হ্যান্ডলিং**: নম্র এরর হ্যান্ডলিং, স্ট্রাকচার্ড এরর রেসপন্স এবং রিট্রাই লজিক বাস্তবায়ন করুন  
4. **পারফরমেন্স**: ক্যাশিং, অ্যাসিঙ্ক্রোনাস প্রসেসিং, এবং রিসোর্স থ্রোটলিং ব্যবহার করুন  
5. **সিকিউরিটি**: সম্পূর্ণ ইনপুট ভ্যালিডেশন, অথরাইজেশন চেক এবং সংবেদনশীল ডেটা হ্যান্ডলিং প্রয়োগ করুন  
6. **টেস্টিং**: ব্যাপক ইউনিট, ইন্টিগ্রেশন, এবং এন্ড-টু-এন্ড টেস্ট তৈরি করুন  
7. **ওয়ার্কফ্লো প্যাটার্ন**: চেইন, ডিস্টপ্যাচার, এবং প্যারালাল প্রসেসিং এর মত প্রতিষ্ঠিত প্যাটার্ন প্রয়োগ করুন  

## অনুশীলন

একটি MCP টুল এবং ওয়ার্কফ্লো ডিজাইন করুন যা একটি ডকুমেন্ট প্রোসেসিং সিস্টেমের জন্য:

1. বিভিন্ন ফরম্যাটের (PDF, DOCX, TXT) ডকুমেন্ট গ্রহণ করে  
2. ডকুমেন্ট থেকে টেক্সট এবং মূল তথ্য নিষ্কাশন করে  
3. ডকুমেন্টকে ধরণ এবং বিষয়বস্তু অনুযায়ী শ্রেণীবদ্ধ করে  
4. প্রতিটি ডকুমেন্টের সারাংশ তৈরি করে  

এই ক্ষেত্রের জন্য টুল স্কিমা, এরর হ্যান্ডলিং এবং একটি ওয়ার্কফ্লো প্যাটার্ন বাস্তবায়ন করুন যা সর্বোত্তম। চিন্তা করুন কিভাবে আপনি এই ইমপ্লিমেন্টেশনটিকে টেস্ট করবেন।  

## সম্পদ

1. সর্বশেষ উন্নয়ন সম্পর্কে আপডেট থাকার জন্য MCP কমিউনিটিতে যোগ দিন [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs)  
2. ওপেন-সোর্স [MCP প্রকল্পে](https://github.com/modelcontextprotocol) অবদান রাখুন  
3. আপনার নিজস্ব প্রতিষ্ঠানে MCP নীতিমালা প্রয়োগ করুন  
4. আপনার শিল্পের জন্য বিশেষায়িত MCP ইমপ্লিমেন্টেশনগুলি অনুসন্ধান করুন  
5. নির্দিষ্ট MCP বিষয়ের উপর উন্নত পাঠ্যক্রম গ্রহণ বিবেচনা করুন, যেমন মাল্টি-মোডাল ইন্টিগ্রেশন বা এন্টারপ্রাইজ অ্যাপ্লিকেশন ইন্টিগ্রেশন  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) এর মাধ্যমে শেখা নীতিমালা ব্যবহার করে নিজের MCP টুল এবং ওয়ার্কফ্লো বানানোর মাধ্যমে পরীক্ষা-নিরীক্ষা করুন  

## পরবর্তী ধাপ

পরবর্তী: [কেস স্টাডিজ](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->