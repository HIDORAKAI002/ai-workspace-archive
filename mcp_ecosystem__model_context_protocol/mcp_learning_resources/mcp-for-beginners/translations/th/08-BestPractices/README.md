# MCP Development Best Practices

[![MCP Development Best Practices](../../../translated_images/th/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(คลิกที่ภาพด้านบนเพื่อดูวิดีโอบทเรียนนี้)_

## Overview

บทเรียนนี้เน้นไปที่แนวทางปฏิบัติที่ดีที่สุดระดับสูงสำหรับการพัฒนา ทดสอบ และปรับใช้เซิร์ฟเวอร์ MCP และฟีเจอร์ต่างๆ ในสภาพแวดล้อมการผลิต เมื่อระบบนิเวศ MCP มีความซับซ้อนและมีความสำคัญมากขึ้น การปฏิบัติตามรูปแบบที่กำหนดไว้จะช่วยให้มั่นใจได้ถึงความน่าเชื่อถือ ความง่ายในการบำรุงรักษา และความสามารถในการทำงานร่วมกัน บทเรียนนี้รวบรวมปัญญาที่ได้จากการใช้งานจริงของ MCP เพื่อแนะนำคุณในการสร้างเซิร์ฟเวอร์ที่แข็งแกร่ง มีประสิทธิภาพ พร้อมทรัพยากร คำถาม และเครื่องมือที่มีประสิทธิผล

## Learning Objectives

เมื่อสิ้นสุดบทเรียนนี้ คุณจะสามารถ:

- นำแนวทางปฏิบัติที่ดีที่สุดในอุตสาหกรรมไปใช้ในการออกแบบเซิร์ฟเวอร์และฟีเจอร์ MCP
- สร้างกลยุทธ์การทดสอบอย่างครอบคลุมสำหรับเซิร์ฟเวอร์ MCP
- ออกแบบรูปแบบการทำงานที่มีประสิทธิภาพและนำกลับมาใช้ใหม่ได้สำหรับแอปพลิเคชัน MCP ที่ซับซ้อน
- นำเทคนิคการจัดการข้อผิดพลาด การบันทึก และการสังเกตการณ์ที่เหมาะสมมาใช้กับเซิร์ฟเวอร์ MCP
- ปรับแต่งการใช้งาน MCP ให้มีประสิทธิภาพ ความปลอดภัย และง่ายต่อการบำรุงรักษา

## MCP Core Principles

ก่อนเข้าสู่แนวทางปฏิบัติการใช้งานเฉพาะ ควรเข้าใจหลักการสำคัญที่เป็นแนวทางสำหรับการพัฒนา MCP อย่างมีประสิทธิผล:

1. **การสื่อสารที่มาตรฐาน**: MCP ใช้ JSON-RPC 2.0 เป็นพื้นฐาน ให้รูปแบบที่สม่ำเสมอสำหรับคำขอ การตอบกลับ และการจัดการข้อผิดพลาดในทุกการใช้งาน

2. **การออกแบบโดยเน้นผู้ใช้เป็นศูนย์กลาง**: ให้ความสำคัญกับความยินยอมของผู้ใช้ การควบคุม และความโปร่งใสในการใช้งาน MCP ของคุณเสมอ

3. **ความปลอดภัยเป็นอันดับแรก**: นำมาตรการความปลอดภัยที่แข็งแกร่งมาใช้ รวมทั้งการพิสูจน์ตัวตน การอนุญาต การตรวจสอบความถูกต้อง และการจำกัดอัตราการใช้งาน

4. **สถาปัตยกรรมแบบโมดูลาร์**: ออกแบบเซิร์ฟเวอร์ MCP ให้มีโครงสร้างแบบโมดูลาร์ โดยที่แต่ละเครื่องมือและทรัพยากรมีวัตถุประสงค์ชัดเจน

5. **การเชื่อมต่อที่เก็บสถานะได้**: ใช้ความสามารถของ MCP ในการรักษาสถานะระหว่างคำขอหลายครั้ง เพื่อให้เกิดการโต้ตอบที่ชัดเจนและรู้บริบทมากขึ้น

## Official MCP Best Practices

แนวทางปฏิบัติที่ดีที่สุดต่อไปนี้อ้างอิงจากเอกสารทางการของโปรโตคอล Model Context:

### Security Best Practices

1. **ความยินยอมและการควบคุมของผู้ใช้**: ต้องได้รับความยินยอมอย่างชัดเจนจากผู้ใช้ก่อนเข้าถึงข้อมูลหรือดำเนินการใดๆ ให้ควบคุมอย่างโปร่งใสว่าข้อมูลใดถูกแชร์และการกระทำใดได้รับอนุญาต

2. **ความเป็นส่วนตัวของข้อมูล**: เปิดเผยข้อมูลของผู้ใช้เฉพาะเมื่อได้รับความยินยอมชัดเจน และปกป้องข้อมูลด้วยการควบคุมการเข้าถึงที่เหมาะสม ป้องกันการส่งข้อมูลโดยไม่ได้รับอนุญาต

3. **ความปลอดภัยของเครื่องมือ**: ต้องได้รับความยินยอมจากผู้ใช้ก่อนเรียกใช้เครื่องมือใดๆ ให้แน่ใจว่าผู้ใช้เข้าใจฟังก์ชันของแต่ละเครื่องมือและบังคับใช้ขอบเขตความปลอดภัยที่แข็งแกร่ง

4. **การควบคุมสิทธิ์การใช้เครื่องมือ**: กำหนดว่าเครื่องมือใดบ้างที่โมเดลสามารถใช้ในช่วงการใช้งาน เพื่อให้เข้าถึงเฉพาะเครื่องมือที่ได้รับอนุญาตเท่านั้น

5. **การพิสูจน์ตัวตน**: ต้องมีการพิสูจน์ตัวตนที่เหมาะสมก่อนอนุญาตการเข้าถึงเครื่องมือ ทรัพยากร หรือการดำเนินการที่มีความละเอียดอ่อน เช่น API keys, OAuth tokens หรือวิธีอื่นที่ปลอดภัย

6. **การตรวจสอบพารามิเตอร์**: บังคับใช้การตรวจสอบตรวจวัดสำหรับการเรียกใช้เครื่องมือทั้งหมดเพื่อป้องกันการป้อนข้อมูลที่ผิดรูปหรือเป็นอันตรายเข้าสู่การใช้งานเครื่องมือ

7. **การจำกัดอัตราการใช้งาน**: นำการจำกัดอัตรามาใช้เพื่อป้องกันการละเมิดและรับประกันการใช้ทรัพยากรเซิร์ฟเวอร์ที่เป็นธรรม

### Implementation Best Practices

1. **การเจรจาความสามารถ**: ในช่วงตั้งค่าการเชื่อมต่อ ให้แลกเปลี่ยนข้อมูลเกี่ยวกับฟีเจอร์ที่สนับสนุน รุ่นโปรโตคอล เครื่องมือ และทรัพยากรที่มี

2. **การออกแบบเครื่องมือ**: สร้างเครื่องมือที่มุ่งเน้นไปที่งานเดียวอย่างดี แทนที่จะเป็นเครื่องมือขนาดใหญ่ที่ดูแลหลายเรื่องพร้อมกัน

3. **การจัดการข้อผิดพลาด**: ใช้ข้อความและรหัสข้อผิดพลาดที่เป็นมาตรฐานเพื่อช่วยวินิจฉัยปัญหา จัดการความล้มเหลวอย่างเหมาะสม และให้ข้อมูลย้อนกลับเชิงปฏิบัติได้

4. **การบันทึกข้อมูล**: ตั้งค่าการบันทึกแบบมีโครงสร้างเพื่อการตรวจสอบ การดีบัก และการเฝ้าดูแลการโต้ตอบของโปรโตคอล

5. **การติดตามความคืบหน้า**: สำหรับการดำเนินการที่ใช้เวลานาน ให้รายงานความคืบหน้าเพื่อสนับสนุนส่วนติดต่อผู้ใช้ที่ตอบสนองได้ดี

6. **การยกเลิกคำขอ**: อนุญาตให้ไคลเอนต์ยกเลิกคำขอที่กำลังดำเนินการซึ่งไม่จำเป็นอีกต่อไปหรือใช้เวลานานเกินไป

## Additional References

สำหรับข้อมูลล่าสุดเกี่ยวกับแนวทางปฏิบัติที่ดีที่สุดของ MCP โปรดดูที่:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - ความเสี่ยงด้านความปลอดภัยและวิธีลดความเสี่ยง
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - การฝึกอบรมเชิงปฏิบัติด้านความปลอดภัย

## Practical Implementation Examples

### Tool Design Best Practices

#### 1. Single Responsibility Principle

เครื่องมือ MCP แต่ละชิ้นควรมีวัตถุประสงค์ที่ชัดเจนและเฉพาะเจาะจง แทนที่จะสร้างเครื่องมือขนาดใหญ่ที่พยายามจัดการหลายเรื่อง พัฒนาเครื่องมือเฉพาะด้านที่เก่งในงานเฉพาะ

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

ใช้การจัดการข้อผิดพลาดที่แข็งแกร่งพร้อมข้อความข้อผิดพลาดที่ให้ข้อมูลและกลไกการกู้คืนที่เหมาะสม

```python
# ตัวอย่าง Python พร้อมการจัดการข้อผิดพลาดอย่างครอบคลุม
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # การตรวจสอบพารามิเตอร์
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # การตรวจสอบความปลอดภัย
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # การดำเนินการฐานข้อมูลพร้อมเวลาหมดอายุ
                async with timeout(10):  # หมดเวลาภายใน 10 วินาที
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # ข้อผิดพลาดในการเชื่อมต่ออาจเป็นแบบชั่วคราว
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # ข้อผิดพลาดในการสืบค้นน่าจะเป็นข้อผิดพลาดของลูกค้า
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # ปล่อยให้ข้อผิดพลาดเฉพาะเครื่องมือผ่านไป
            raise
        except Exception as e:
            # จับข้อผิดพลาดที่ไม่คาดคิดทั้งหมด
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # การใช้งานการตรวจจับการโจมตีแบบ SQL injection
        pass
        
    def _log_error(self, message, error):
        # การใช้งานการบันทึกข้อผิดพลาด
        pass
```

#### 3. Parameter Validation

ตรวจสอบพารามิเตอร์อย่างละเอียดเสมอเพื่อป้องกันข้อมูลที่ผิดรูปหรือเป็นอันตราย

```javascript
// ตัวอย่าง JavaScript/TypeScript พร้อมการตรวจสอบพารามิเตอร์อย่างละเอียด
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
    // 1. ตรวจสอบการมีอยู่ของพารามิเตอร์
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. ตรวจสอบชนิดของพารามิเตอร์
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. ตรวจสอบค่าของพารามิเตอร์
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. ตรวจสอบการมีเนื้อหาสำหรับการเขียน
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. ตรวจสอบความปลอดภัยของเส้นทาง
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // การทำงานตามพารามิเตอร์ที่ผ่านการตรวจสอบ
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // การตรวจสอบความปลอดภัยของเส้นทาง
    // ...
  }
}
```

### Security Implementation Examples

#### 1. Authentication and Authorization

```java
// ตัวอย่าง Java พร้อมการตรวจสอบสิทธิ์และการอนุญาต
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // การฉีดพึ่งพิง
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
        // 1. ดึงข้อมูลบริบทการตรวจสอบสิทธิ์ออกมา
        String authToken = request.getContext().getAuthToken();
        
        // 2. ตรวจสอบสิทธิ์ผู้ใช้
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. ตรวจสอบสิทธิ์ในการทำงานเฉพาะ
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. ดำเนินการกับงานที่ได้รับอนุญาต
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

ทดสอบเครื่องมือแยกกันเสมอโดยจำลองการพึ่งพาภายนอก:

```typescript
// ตัวอย่างการทดสอบหน่วยเครื่องมือด้วย TypeScript
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // สร้างบริการสภาพอากาศจำลอง
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // สร้างเครื่องมือพร้อมความขึ้นต่อจำลอง
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // จัดเตรียม
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // ดำเนินการ
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // ตรวจสอบ
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // จัดเตรียม
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // ดำเนินการ & ตรวจสอบ
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Integration Testing

ทดสอบการไหลข้อมูลทั้งหมดตั้งแต่คำขอของไคลเอนต์ถึงการตอบกลับของเซิร์ฟเวอร์:

```python
# ตัวอย่างการทดสอบการผสานรวม Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # เริ่มต้นเซิร์ฟเวอร์ทดสอบ
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # สร้างไคลเอนต์
        client = McpClient("http://localhost:5000")
        
        # ทดสอบการค้นหาเครื่องมือ
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # ทดสอบการใช้งานเครื่องมือ
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # ตรวจสอบการตอบกลับ
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # ทำความสะอาด
        await server.stop()
```

## Performance Optimization

### 1. Caching Strategies

ใช้การแคชที่เหมาะสมเพื่อลดความหน่วงและการใช้ทรัพยากร:

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

ออกแบบเครื่องมือให้รับการพึ่งพาผ่านคอนสตรัคเตอร์อินเจกชัน เพื่อให้ง่ายต่อการทดสอบและตั้งค่า:

```java
// ตัวอย่าง Java พร้อมการฉีดพึ่งพา
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // พึ่งพาถูกฉีดผ่านคอนสตรัคเตอร์
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // การใช้งานเครื่องมือ
    // ...
}
```

#### 3. Composable Tools

ออกแบบเครื่องมือที่สามารถประกอบรวมกันเพื่อสร้างเวิร์กโฟลว์ที่ซับซ้อนมากขึ้น:

```python
# ตัวอย่าง Python ที่แสดงเครื่องมือที่สามารถประกอบกันได้
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # การใช้งาน...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # เครื่องมือนี้สามารถใช้ผลลัพธ์จากเครื่องมือดึงข้อมูล (dataFetch) ได้
    async def execute_async(self, request):
        # การใช้งาน...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # เครื่องมือนี้สามารถใช้ผลลัพธ์จากเครื่องมือวิเคราะห์ข้อมูล (dataAnalysis) ได้
    async def execute_async(self, request):
        # การใช้งาน...
        pass

# เครื่องมือเหล่านี้สามารถใช้แยกกันหรือเป็นส่วนหนึ่งของกระบวนการทำงานได้
```

### Schema Design Best Practices

สคีมาเป็นสัญญาระหว่างโมเดลกับเครื่องมือของคุณ สคีมาที่ออกแบบดีช่วยให้เครื่องมือใช้งานง่ายขึ้น

#### 1. Clear Parameter Descriptions

รวมข้อมูลอธิบายสำหรับแต่ละพารามิเตอร์เสมอ:

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

เพิ่มข้อจำกัดการตรวจสอบเพื่อป้องกันข้อมูลป้อนเข้าผิด:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // คุณสมบัติอีเมลพร้อมการตรวจสอบรูปแบบ
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // คุณสมบัติอายุพร้อมข้อจำกัดเชิงตัวเลข
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // คุณสมบัติแบบระบุค่าจำกัด
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

รักษาความสม่ำเสมอในโครงสร้างการตอบกลับเพื่อให้ง่ายต่อการตีความผลลัพธ์ของโมเดล:

```python
async def execute_async(self, request):
    try:
        # ประมวลผลคำขอ
        results = await self._search_database(request.parameters["query"])
        
        # ส่งคืนโครงสร้างที่สม่ำเสมอเสมอ
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

การจัดการข้อผิดพลาดที่แข็งแกร่งมีความสำคัญต่อการรักษาความน่าเชื่อถือของเครื่องมือ MCP

#### 1. Graceful Error Handling

จัดการข้อผิดพลาดในระดับที่เหมาะสมและให้ข้อความข้อมูล:

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

ส่งคืนข้อมูลข้อผิดพลาดที่มีโครงสร้างเมื่อเป็นไปได้:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // การดำเนินการ
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
        
        // โยนข้อยกเว้นอื่น ๆ ใหม่เป็น ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Retry Logic

ใช้ตรรกะการลองใหม่ที่เหมาะสมกับความล้มเหลวชั่วคราว:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # วินาที
    
    while retry_count < max_retries:
        try:
            # เรียกใช้ API ภายนอก
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # การหน่วงเวลาย้อนกลับแบบทวีคูณ
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # ข้อผิดพลาดที่ไม่ชั่วคราว, อย่าลองใหม่
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Performance Optimization

#### 1. Caching

ใช้แคชสำหรับการดำเนินการที่มีค่าใช้จ่ายสูง:

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

ใช้รูปแบบการเขียนโปรแกรมแบบอะซิงโครนัสสำหรับการดำเนินการที่เกี่ยวกับ I/O:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // สำหรับการดำเนินการที่ใช้เวลานาน ให้คืนค่า ID การประมวลผลทันที
        String processId = UUID.randomUUID().toString();
        
        // เริ่มการประมวลผลแบบอะซิงโครนัส
        CompletableFuture.runAsync(() -> {
            try {
                // ดำเนินการที่ใช้เวลานาน
                documentService.processDocument(documentId);
                
                // อัปเดตสถานะ (โดยปกติจะถูกจัดเก็บในฐานข้อมูล)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // คืนค่าตอบกลับทันทีพร้อมกับ ID กระบวนการ
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // เครื่องมือตรวจสอบสถานะคู่มือ
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

นำการจำกัดทรัพยากรมาป้องกันการใช้งานเกินขนาด:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # อนุญาตให้ส่งคำขอ 5 ครั้งต่อวินาที
            bucket_size=10        # อนุญาตการระเบิดสูงสุด 10 คำขอ
        )
    
    async def execute_async(self, request):
        # ตรวจสอบว่าเราสามารถดำเนินการต่อได้หรือจำเป็นต้องรอ
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # หากการรอนานเกินไป
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # รอเวลาที่เหมาะสม
                await asyncio.sleep(delay)
        
        # ใช้โทเค็นหนึ่งตัวและดำเนินการคำขอ
        self.rate_limiter.consume()
        
        # เรียกใช้ API
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
            
            # คำนวณเวลาจนกว่าโทเค็นถัดไปจะพร้อมใช้งาน
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # เพิ่มโทเค็นใหม่ตามเวลาที่ผ่านไป
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Security Best Practices

#### 1. Input Validation

ตรวจสอบพารามิเตอร์อินพุตอย่างละเอียดเสมอ:

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

ใช้การตรวจสอบสิทธิ์ที่เหมาะสม:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // รับบริบทผู้ใช้จากคำขอ
    UserContext user = request.getContext().getUserContext();
    
    // ตรวจสอบว่าผู้ใช้มีสิทธิ์ที่จำเป็นหรือไม่
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // สำหรับทรัพยากรเฉพาะ, ตรวจสอบการเข้าถึงทรัพยากรนั้น
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // ดำเนินการต่อกับการทำงานของเครื่องมือ
    // ...
}
```

#### 3. Sensitive Data Handling

จัดการข้อมูลที่มีความละเอียดอ่อนอย่างระมัดระวัง:

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
        
        # ดึงข้อมูลผู้ใช้
        user_data = await self.user_service.get_user_data(user_id)
        
        # กรองฟิลด์ที่ละเอียดอ่อนเว้นแต่จะมีการร้องขอและได้รับอนุญาตอย่างชัดเจน
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # ตรวจสอบระดับการอนุญาตในบริบทของคำขอ
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # สร้างสำเนาเพื่อหลีกเลี่ยงการแก้ไขต้นฉบับ
        redacted = user_data.copy()
        
        # ลบข้อมูลในฟิลด์ที่ละเอียดอ่อนบางอย่าง
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # ลบข้อมูลที่ละเอียดอ่อนที่ซ้อนอยู่
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Testing Best Practices for MCP Tools

การทดสอบที่ครอบคลุมช่วยให้มั่นใจว่าเครื่องมือ MCP ทำงานถูกต้อง จัดการกรณีขอบได้ และทำงานร่วมกับระบบอื่นได้อย่างเหมาะสม

### Unit Testing

#### 1. Test Each Tool in Isolation

สร้างการทดสอบเฉพาะสำหรับฟังก์ชันของแต่ละเครื่องมือ:

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

ทดสอบว่าสคีมาใช้งานได้และบังคับใช้ข้อจำกัดได้อย่างถูกต้อง:

```java
@Test
public void testSchemaValidation() {
    // สร้างอินสแตนซ์ของเครื่องมือ
    SearchTool searchTool = new SearchTool();
    
    // รับสคีมา
    Object schema = searchTool.getSchema();
    
    // แปลงสคีมาเป็น JSON เพื่อการตรวจสอบ
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // ตรวจสอบว่าสคีมาเป็น JSONSchema ที่ถูกต้อง
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // ทดสอบพารามิเตอร์ที่ถูกต้อง
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // ทดสอบพารามิเตอร์ที่จำเป็นหายไป
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // ทดสอบพารามิเตอร์ที่มีประเภทไม่ถูกต้อง
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Error Handling Tests

สร้างการทดสอบเฉพาะสำหรับเงื่อนไขข้อผิดพลาด:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # จัดเรียง
    tool = ApiTool(timeout=0.1)  # หมดเวลาอย่างรวดเร็ว
    
    # จำลองคำขอที่จะหมดเวลา
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # นานกว่าระยะเวลาที่กำหนด
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # ดำเนินการ & ตรวจสอบ
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ตรวจสอบข้อความข้อผิดพลาด
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # จัดเรียง
    tool = ApiTool()
    
    # จำลองการตอบกลับที่ถูกจำกัดอัตรา
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
        
        # ดำเนินการ & ตรวจสอบ
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ตรวจสอบว่าข้อผิดพลาดมีข้อมูลจำกัดอัตราไหม
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Integration Testing

#### 1. Tool Chain Testing

ทดสอบการทำงานของเครื่องมือร่วมกันในชุดคาดหวัง:

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

ทดสอบเซิร์ฟเวอร์ MCP พร้อมการลงทะเบียนและการเรียกใช้งานเครื่องมือแบบครบถ้วน:

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
        // ทดสอบจุดค้นหา
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // สร้างคำขอเครื่องมือ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // ส่งคำขอและตรวจสอบการตอบกลับ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // สร้างคำขอเครื่องมือที่ไม่ถูกต้อง
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // ขาดพารามิเตอร์ "b"
        request.put("parameters", parameters);
        
        // ส่งคำขอและตรวจสอบการตอบกลับข้อผิดพลาด
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. End-to-End Testing

ทดสอบเวิร์กโฟลว์ทั้งหมดตั้งแต่คำถามโมเดลจนถึงการรันเครื่องมือ:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # จัดเตรียม - ตั้งค่าไคลเอ็นต์ MCP และโมเดลจำลอง
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # ตอบกลับโมเดลจำลอง
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
    
    # ตอบกลับเครื่องมือพยากรณ์อากาศจำลอง
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
        
        # ดำเนินการ
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # ยืนยันผล
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Performance Testing

#### 1. Load Testing

ทดสอบจำนวนคำขอที่เซิร์ฟเวอร์ MCP ของคุณจัดการพร้อมกันได้:

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

ทดสอบระบบภายใต้ภาระมากจนเกินไป:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // ตั้งค่า JMeter สำหรับการทดสอบความเครียด
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // กำหนดแผนการทดสอบ JMeter
    HashTree testPlanTree = new HashTree();
    
    // สร้างแผนการทดสอบ กลุ่มเธรด ตัวอย่างการทดสอบ ฯลฯ
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // เพิ่มตัวอย่าง HTTP สำหรับการดำเนินการเครื่องมือ
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // เพิ่มตัวฟัง
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // รันการทดสอบ
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // ตรวจสอบผลลัพธ์
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // เวลาในการตอบสนองเฉลี่ย < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // ค่าร้อยละ 90 < 500ms
}
```

#### 3. Monitoring and Profiling

ตั้งค่าการเฝ้าดูและวิเคราะห์ประสิทธิภาพระยะยาว:

```python
# กำหนดค่าการตรวจสอบสำหรับเซิร์ฟเวอร์ MCP
def configure_monitoring(server):
    # ตั้งค่าเมตริกของ Prometheus
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
    
    # เพิ่มมิดเดิลแวร์สำหรับการจับเวลาและบันทึกเมตริก
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # แสดงจุดเชื่อมต่อเมตริก
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP Workflow Design Patterns

เวิร์กโฟลว์ MCP ที่ออกแบบอย่างดีจะช่วยเพิ่มประสิทธิภาพ ความน่าเชื่อถือ และความง่ายในการบำรุงรักษา นี่คือรูปแบบสำคัญที่ควรปฏิบัติ:

### 1. Chain of Tools Pattern

เชื่อมต่อเครื่องมือหลายตัวเป็นลำดับ โดยผลลัพธ์ของแต่ละเครื่องมือจะเป็นอินพุตของเครื่องมือต่อไป:

```python
# การใช้งานโซ่เครื่องมือใน Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # รายชื่อชื่อเครื่องมือที่จะดำเนินการตามลำดับ
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # ดำเนินการแต่ละเครื่องมือในโซ่ โดยส่งผลลัพธ์ก่อนหน้า
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # เก็บผลลัพธ์และใช้เป็นอินพุตสำหรับเครื่องมือต่อไป
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

ใช้เครื่องมือกลางที่แจกจ่ายไปยังเครื่องมือเฉพาะตามอินพุต:

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

รันเครื่องมือหลายตัวพร้อมกันเพื่อเพิ่มประสิทธิภาพ:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // ขั้นตอนที่ 1: ดึงข้อมูลเมตาของชุดข้อมูล (แบบซิงโครนัส)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // ขั้นตอนที่ 2: เริ่มการวิเคราะห์หลายรายการพร้อมกัน
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
        
        // รอให้ทุกงานขนานเสร็จสิ้น
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // รอให้เสร็จสิ้น
        
        // ขั้นตอนที่ 3: รวมผลลัพธ์
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // ขั้นตอนที่ 4: สร้างรายงานสรุป
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // คืนค่าผลลัพธ์การทำงานทั้งหมด
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Error Recovery Pattern

ใช้การสำรองที่นุ่มนวลเมื่อเครื่องมือเกิดข้อผิดพลาด:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # ลองเครื่องมือหลักก่อน
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # บันทึกความล้มเหลว
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # หันไปใช้เครื่องมือสำรอง
            try:
                # อาจต้องแปลงพารามิเตอร์สำหรับเครื่องมือสำรอง
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # เครื่องมือทั้งสองล้มเหลว
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # การใช้งานนี้จะขึ้นอยู่กับเครื่องมือแต่ละชนิด
        # สำหรับตัวอย่างนี้ เราจะคืนค่าพารามิเตอร์เดิม
        return params

# ตัวอย่างการใช้งาน
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # API สภาพอากาศหลัก (แบบชำระเงิน)
        "basicWeatherService",    # API สภาพอากาศสำรอง (แบบฟรี)
        {"location": location}
    )
```

### 5. Workflow Composition Pattern

สร้างเวิร์กโฟลว์ที่ซับซ้อนโดยประกอบเวิร์กโฟลว์ที่ง่ายกว่าเข้าด้วยกัน:

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

การทดสอบเป็นส่วนสำคัญของการพัฒนาเซิร์ฟเวอร์ MCP ที่น่าเชื่อถือและมีคุณภาพสูง คู่มือนี้ให้แนวทางปฏิบัติและเคล็ดลับที่ครอบคลุมสำหรับการทดสอบเซิร์ฟเวอร์ MCP ของคุณตลอดวัฏจักรการพัฒนา ตั้งแต่การทดสอบหน่วยไปจนถึงการทดสอบแบบบูรณาการและการตรวจสอบแบบครบวงจร

## Why Testing Matters for MCP Servers

เซิร์ฟเวอร์ MCP ทำหน้าที่เป็นตัวกลางสำคัญระหว่างโมเดล AI กับแอปพลิเคชันลูกค้า การทดสอบอย่างละเอียดช่วยรับประกันว่า:

- มีความน่าเชื่อถือในสภาพแวดล้อมการผลิต
- การจัดการคำขอและตอบกลับถูกต้องแม่นยำ
- การใช้งานตามข้อกำหนด MCP เป็นไปอย่างถูกต้อง
- มีความทนทานต่อข้อผิดพลาดและกรณีขอบ
- ประสิทธิภาพสม่ำเสมอภายใต้ภาระการใช้งานที่หลากหลาย

## Unit Testing for MCP Servers

### Unit Testing (Foundation)

การทดสอบหน่วยจะตรวจสอบส่วนประกอบต่างๆ ของเซิร์ฟเวอร์ MCP อย่างแยกกัน

#### What to Test

1. **Resource Handlers**: ทดสอบตรรกะของตัวจัดการทรัพยากรแต่ละตัวอย่างเป็นอิสระ
2. **Tool Implementations**: ตรวจสอบพฤติกรรมของเครื่องมือด้วยข้อมูลอินพุตหลากหลาย
3. **Prompt Templates**: ตรวจสอบให้แน่ใจว่าแม่แบบข้อความแสดงผลถูกต้อง
4. **Schema Validation**: ทดสอบตรรกะการตรวจสอบพารามิเตอร์
5. **Error Handling**: ตรวจสอบการตอบกลับข้อผิดพลาดสำหรับข้อมูลป้อนเข้าไม่ถูกต้อง

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
# ตัวอย่างการทดสอบหน่วยสำหรับเครื่องมือเครื่องคิดเลขในภาษา Python
def test_calculator_tool_add():
    # จัดเตรียม
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # ดำเนินการ
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # ตรวจสอบผลลัพธ์
    assert result["value"] == 12
```

### Integration Testing (Middle Layer)

การทดสอบแบบบูรณาการจะตรวจสอบการโต้ตอบระหว่างส่วนประกอบต่างๆ ของเซิร์ฟเวอร์ MCP

#### What to Test

1. **Server Initialization**: ทดสอบการเริ่มต้นเซิร์ฟเวอร์ด้วยการตั้งค่าต่างๆ
2. **Route Registration**: ตรวจสอบว่าเส้นทางทั้งหมดถูกลงทะเบียนอย่างถูกต้อง
3. **Request Processing**: ทดสอบวัฏจักรคำขอและตอบกลับอย่างครบถ้วน
4. **Error Propagation**: ตรวจสอบให้แน่ใจว่าข้อผิดพลาดถูกจัดการอย่างเหมาะสมในทุกส่วนประกอบ
5. **Authentication & Authorization**: ทดสอบกลไกความปลอดภัย

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

การทดสอบแบบครบวงจรจะตรวจสอบพฤติกรรมระบบทั้งหมดตั้งแต่ไคลเอนต์ถึงเซิร์ฟเวอร์

#### What to Test

1. **Client-Server Communication**: ทดสอบวัฏจักรคำขอ-ตอบครบถ้วน
2. **Real Client SDKs**: ทดสอบด้วยการใช้งานไคลเอนต์จริง
3. **Performance Under Load**: ตรวจสอบพฤติกรรมเมื่อมีคำขอพร้อมกันหลายรายการ
4. **Error Recovery**: ทดสอบการฟื้นตัวของระบบจากความล้มเหลว
5. **Long-Running Operations**: ตรวจสอบการจัดการการสตรีมและการดำเนินการระยะยาว

#### Best Practices for E2E Testing

```typescript
// ตัวอย่างการทดสอบ E2E กับไคลเอนต์ใน TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // เริ่มต้นเซิร์ฟเวอร์ในสภาพแวดล้อมทดสอบ
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // ทำการดำเนินการ
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // ยืนยันผลลัพธ์
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Mocking Strategies for MCP Testing

การใช้ม็อกช่วยแยกส่วนประกอบระหว่างการทดสอบ

### Components to Mock

1. **External AI Models**: ม็อกการตอบสนองของโมเดลเพื่อการทดสอบที่คาดเดาได้
2. **External Services**: ม็อกการพึ่งพา API (ฐานข้อมูล บริการภายนอก)
3. **Authentication Services**: ม็อกผู้ให้บริการพิสูจน์ตัวตน
4. **Resource Providers**: ม็อกตัวจัดการทรัพยากรที่มีต้นทุนสูง

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
# ตัวอย่าง Python พร้อม unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # กำหนดค่า mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # ใช้ mock ในการทดสอบ
    server = McpServer(model_client=mock_model)
    # ดำเนินการต่อด้วยการทดสอบ
```

## Performance Testing

การทดสอบประสิทธิภาพมีความสำคัญอย่างยิ่งสำหรับเซิร์ฟเวอร์ MCP ในการผลิต

### What to Measure

1. **Latency**: เวลาตอบสนองสำหรับคำขอ
2. **Throughput**: จำนวนคำขอต่อวินาทีที่จัดการได้
3. **Resource Utilization**: การใช้ CPU หน่วยความจำ และเครือข่าย
4. **Concurrency Handling**: พฤติกรรมเมื่อรับคำขอพร้อมกันหลายรายการ
5. **Scaling Characteristics**: ประสิทธิภาพตามภาระที่เพิ่มขึ้น

### Tools for Performance Testing

- **k6**: เครื่องมือทดสอบโหลดแบบโอเพ่นซอร์ส
- **JMeter**: เครื่องมือทดสอบประสิทธิภาพแบบครอบคลุม
- **Locust**: เครื่องมือทดสอบโหลดที่เขียนด้วย Python
- **Azure Load Testing**: การทดสอบประสิทธิภาพบนคลาวด์

### Example: Basic Load Test with k6

```javascript
// สคริปต์ k6 สำหรับทดสอบโหลดเซิร์ฟเวอร์ MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // ผู้ใช้เสมือน 10 คน
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

การทำให้การทดสอบเป็นอัตโนมัติช่วยรับประกันคุณภาพอย่างสม่ำเสมอและทำให้ได้รับผลตอบกลับเร็วขึ้น

### CI/CD Integration
1. **รัน Unit Tests บน Pull Requests**: ตรวจสอบให้แน่ใจว่าการเปลี่ยนแปลงโค้ดไม่ทำให้ฟังก์ชันการทำงานเดิมเสียหาย  
2. **Integration Tests ใน Staging**: รัน integration tests ในสภาพแวดล้อมก่อนการผลิต  
3. **Performance Baselines**: รักษาเกณฑ์ประสิทธิภาพเพื่อจับข้อถดถอย  
4. **Security Scans**: ทำการทดสอบความปลอดภัยโดยอัตโนมัติเป็นส่วนหนึ่งของ pipeline  

### ตัวอย่าง CI Pipeline (GitHub Actions)

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
  
## การทดสอบเพื่อความสอดคล้องกับข้อกำหนด MCP  

ตรวจสอบให้แน่ใจว่าเซิร์ฟเวอร์ของคุณใช้งานข้อกำหนด MCP อย่างถูกต้อง  

### พื้นที่สำคัญของความสอดคล้อง  

1. **API Endpoints**: ทดสอบ endpoints ที่จำเป็น (/resources, /tools, ฯลฯ)  
2. **รูปแบบคำขอ/คำตอบ**: ตรวจสอบความสอดคล้องของ schema  
3. **รหัสข้อผิดพลาด**: ตรวจสอบรหัสสถานะที่ถูกต้องสำหรับสถานการณ์ต่างๆ  
4. **ประเภทเนื้อหา**: ทดสอบการจัดการประเภทเนื้อหาต่างๆ  
5. **กระบวนการ Authentication**: ตรวจสอบกลไกการพิสูจน์ตัวตนที่สอดคล้องกับข้อกำหนด  

### ชุดทดสอบความสอดคล้อง  

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
  
## 10 เคล็ดลับสำหรับการทดสอบเซิร์ฟเวอร์ MCP อย่างมีประสิทธิภาพ  

1. **ทดสอบคำจำกัดความเครื่องมือแยกจากกัน**: ตรวจสอบคำจำกัดความ schema แยกจากตรรกะเครื่องมือ  
2. **ใช้ Parameterized Tests**: ทดสอบเครื่องมือด้วยข้อมูลเข้าแบบหลากหลาย รวมถึงกรณีขอบ  
3. **ตรวจสอบคำตอบข้อผิดพลาด**: ตรวจสอบการจัดการข้อผิดพลาดที่ถูกต้องสำหรับเงื่อนไขข้อผิดพลาดทั้งหมด  
4. **ทดสอบตรรกะการอนุญาต**: ตรวจสอบการควบคุมการเข้าถึงสำหรับบทบาทผู้ใช้ต่างๆ  
5. **ติดตามความครอบคลุมการทดสอบ**: ตั้งเป้าความครอบคลุมสูงของโค้ดเส้นทางสำคัญ  
6. **ทดสอบการตอบสนองแบบสตรีม**: ตรวจสอบการจัดการเนื้อหาสตรีมที่ถูกต้อง  
7. **จำลองปัญหาเครือข่าย**: ทดสอบพฤติกรรมภายใต้เงื่อนไขเครือข่ายที่ไม่ดี  
8. **ทดสอบขีดจำกัดทรัพยากร**: ตรวจสอบพฤติกรรมเมื่อถึงโควตาหรือข้อจำกัดอัตรา  
9. **ทำการทดสอบถดถอยโดยอัตโนมัติ**: สร้างชุดทดสอบที่รันทุกครั้งเมื่อมีการเปลี่ยนแปลงโค้ด  
10. **จัดทำเอกสารกรณีทดสอบ**: รักษาเอกสารชัดเจนของสถานการณ์การทดสอบ  

## ข้อผิดพลาดในการทดสอบที่พบบ่อย  

- **พึ่งพาการทดสอบเส้นทางที่ดีเกินไป**: ตรวจสอบให้แน่ใจว่าทดสอบกรณีข้อผิดพลาดอย่างละเอียด  
- **ละเลยการทดสอบประสิทธิภาพ**: ระบุคอขวดก่อนที่จะส่งผลต่อการผลิต  
- **ทดสอบแยกเดี่ยวเท่านั้น**: รวมการทดสอบหน่วย, การบูรณาการ, และการทดสอบแบบ End-to-End  
- **ความครอบคลุม API ไม่สมบูรณ์**: ตรวจสอบให้แน่ใจว่าทดสอบ endpoints และฟีเจอร์ทั้งหมด  
- **สภาพแวดล้อมทดสอบไม่สอดคล้องกัน**: ใช้คอนเทนเนอร์เพื่อให้แน่ใจว่าสภาพแวดล้อมทดสอบสอดคล้องกัน  

## สรุป  

กลยุทธ์การทดสอบที่ครอบคลุมเป็นสิ่งจำเป็นสำหรับการพัฒนาเซิร์ฟเวอร์ MCP ที่เชื่อถือได้และคุณภาพสูง ด้วยการใช้แนวทางปฏิบัติที่ดีที่สุดและเคล็ดลับที่ระบุไว้ในคู่มือนี้ คุณสามารถมั่นใจได้ว่า MCP ที่คุณใช้งานจะได้มาตรฐานสูงสุดในด้านคุณภาพ ความน่าเชื่อถือ และประสิทธิภาพ  

## สิ่งที่ควรจดจำ  

1. **การออกแบบเครื่องมือ**: ปฏิบัติตามหลักการความรับผิดชอบเดี่ยว, ใช้ dependency injection และออกแบบให้สามารถประกอบชิ้นส่วนได้  
2. **การออกแบบ Schema**: สร้าง schema ที่ชัดเจน พร้อมเอกสาร และมีข้อจำกัดการตรวจสอบที่เหมาะสม  
3. **การจัดการข้อผิดพลาด**: ใช้การจัดการข้อผิดพลาดอย่างมีมารยาท, การตอบสนองข้อผิดพลาดที่มีโครงสร้าง และตรรกะการลองใหม่  
4. **ประสิทธิภาพ**: ใช้การแคช, การประมวลผลแบบไม่ซิงโครนัส และการจำกัดทรัพยากร  
5. **ความปลอดภัย**: ใช้การตรวจสอบข้อมูลเข้าอย่างละเอียด, การตรวจสอบสิทธิ์เข้าถึง และการจัดการข้อมูลที่ละเอียดอ่อน  
6. **การทดสอบ**: สร้างการทดสอบแบบหน่วย, การบูรณาการ และแบบ end-to-end ที่ครอบคลุม  
7. **รูปแบบของ Workflow**: ใช้รูปแบบที่ได้รับการพิสูจน์ เช่น chains, dispatchers และการประมวลผลแบบขนาน  

## แบบฝึกหัด  

ออกแบบเครื่องมือ MCP และ workflow สำหรับระบบประมวลเอกสารที่:  

1. รับเอกสารในหลายรูปแบบ (PDF, DOCX, TXT)  
2. ดึงข้อความและข้อมูลสำคัญจากเอกสาร  
3. จัดประเภทเอกสารตามประเภทและเนื้อหา  
4. สร้างสรุปของแต่ละเอกสาร  

ใช้งาน schema เครื่องมือ, การจัดการข้อผิดพลาด และรูปแบบ workflow ที่เหมาะสมที่สุดสำหรับสถานการณ์นี้ คิดว่าคุณจะทดสอบการใช้งานนี้อย่างไร  

## แหล่งข้อมูล  

1. เข้าร่วมชุมชน MCP ที่ [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) เพื่อรับข้อมูลอัปเดตล่าสุด  
2. มีส่วนร่วมในโครงการ [MCP แบบโอเพนซอร์ส](https://github.com/modelcontextprotocol)  
3. นำหลักการ MCP ไปใช้ในโครงการ AI ขององค์กรของคุณเอง  
4. สำรวจการใช้งาน MCP เฉพาะสำหรับอุตสาหกรรมของคุณ  
5. พิจารณาเรียนหลักสูตรขั้นสูงในหัวข้อ MCP เฉพาะ เช่น การผสมผสานข้อมูลหลายรูปแบบ หรือการผสานแอปพลิเคชันองค์กร  
6. ทดลองสร้างเครื่องมือและ workflow MCP ของคุณเองโดยใช้หลักการที่เรียนรู้ผ่าน [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## ต่อไป  

ถัดไป: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ข้อจำกัดความรับผิดชอบ**:  
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลด้วยปัญญาประดิษฐ์ [Co-op Translator](https://github.com/Azure/co-op-translator) แม้ว่าเราจะพยายามให้ความถูกต้องสูงสุด แต่โปรดทราบว่าการแปลอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางถือเป็นแหล่งข้อมูลที่น่าเชื่อถือที่สุด สำหรับข้อมูลสำคัญแนะนำให้ใช้บริการแปลโดยมนุษย์มืออาชีพ เราจะไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความผิดใด ๆ ที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->