# MCP ការអភិវឌ្ឍន៍អនុវត្តល្អបំផុត

[![MCP Development Best Practices](../../../translated_images/km/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(ចុចលើរូបភាពខាងលើដើម្បីមើលវីដេអូថ្នាក់រៀននេះ)_

## ទិដ្ឋភាពទូលំទូលាយ

មេរៀននេះផ្តោតលើអនុវត្តល្អបំផុតជាន់ខ្ពស់សម្រាប់ការអភិវឌ្ឍ, ការធ្វើតេស្ត, និងការដាក់ MCP ម៉ាស៊ីនបម្រើ និងមុខងារនៅបរិស្ថានផលិត។ នៅពេលដែលបរិស្ថាន MCP កើនឡើងភាពស្មុគស្មាញ និងសារៈសំខាន់, ការតាមដានលំនាំដែលបានបង្កើតជាស្ថាពរជាភាគចម្បងធានាបាននូវភាពទុកចិត្ត, ការថែរក្សា និងការជាមួយគ្នាដោយរួម។ មេរៀននេះបង្រួមបញ្ញាជាក់ស្តែងដែលបានទទួលពីការអនុវត្ត MCP ផ្នែកពិតប្រាកដ ដើម្បីណែនាំអ្នកក្នុងការបង្កើតម៉ាស៊ីនបម្រើរឹងមាំ, ប្រសើរជាមួយធនធានមានប្រសិទ្ធភាព, ការបញ្ជូនស្គ្រីប និងឧបករណ៍។

## គោលបំណងការសិក្សា

នៅចុងបញ្ចប់មេរៀននេះ អ្នកនឹងអាច៖

- ផ្ទេរអនុវត្តល្អបំផុតឧស្សាហកម្មក្នុងការរចនាម៉ាស៊ីនបម្រើ MCP និងមុខងារ
- បង្កើតយុទ្ធសាស្ត្រសាកល្បងពេញលេញសម្រាប់ម៉ាស៊ីនបម្រើ MCP
- រចនាគំរូដំណើរការដែលមានប្រសិទ្ធភាព និងអាច재ប្រើសម្រាប់កម្មវិធី MCP ដែលស្មុគស្មាញ
- អនុវត្តការដោះស្រាយកំហុសដែលត្រឹមត្រូវ, ការកត់ត្រា និងការបង្កើតភាពអាចមើលឃើញក្នុងម៉ាស៊ីនបម្រើ MCP
- បង្កើតអនុវត្ត MCP ដើម្បីបង្កើនប្រសិទ្ធិភាព, សុវត្ថិភាព និងការថែរក្សា

## គោលការណ៍មូលដ្ឋាន MCP

មុននឹងចូលទៅក្នុងការអនុវត្តជាក់លាក់ ជារឿងសំខាន់ក្នុងការយល់ដឹងពីគោលការណ៍មូលដ្ឋានដែលណែនាំអភិវឌ្ឍ MCP ដែលមានប្រសិទ្ធភាព៖

1. **ការទំនាក់ទំនងដែលបានស្តង់ដារ**: MCP ប្រើ JSON-RPC 2.0 ជាគ្រោងមូលដ្ឋានរបស់វា ផ្ដល់ការប្រភេទនៃសំណើ, ពត៌មានតបតប, និងការដោះស្រាយកំហុសនៅរវាងការអនុវត្តទាំងអស់។

2. **ការរចនាម្តោងទៅលើអ្នកប្រើ**: តែងតែផ្តល់អាទិភាពដល់ការយល់ព្រម អំណាចគ្រប់គ្រង និងភាពច្បាស់លាស់របស់អ្នកប្រើនៅក្នុងអនុវត្ត MCP របស់អ្នក។

3. **សុវត្ថិភាពជាដំបូន្មាន**: អនុវត្តវិធានសុវត្ថិភាពរឹងមាំ រួមមាន ការផ្ទៀងផ្ទាត់, អនុញ្ញាត, ការត្រួតពិនិត្យ និងកំណត់អត្រា។

4. **អាគារម៉ូឌុល**: រចនាម៉ាស៊ីនបម្រើ MCP របស់អ្នកជាមួយវិធីសាស្ត្រម៉ូឌុលដែលអនុញ្ញាតឲ្យឧបករណ៍ និងធនធាននីមួយៗមានគោលបំណងច្បាស់លាស់និងផ្តោតសំខាន់។

5. **ការតភ្ជាប់ដែលមានស្ថានភាព**: ប្រើប្រាស់សមត្ថភាពរបស់ MCP ក្នុងការរក្សាស្ថានភាពតាមរយៈសំណើច្រើនដើម្បីមានការតបស្នងថ្លៃថ្លា និងមានបរិបទច្បាស់លាស់។

## អនុវត្តល្អបំផុត MCP ផ្លូវការជាធម្មតា

អនុវត្តល្អបំផុតខាងក្រោមត្រូវបានបង្កើតចេញពីឯកសារផ្លូវការរបស់ Model Context Protocol៖

### អនុវត្តល្អបំផុតសុវត្ថិភាព

1. **ការយល់ព្រម និងការគ្រប់គ្រងអ្នកប្រើ**: តែងតែទាមទារឲ្យមានការយល់ព្រមច្បាស់លាស់ពីអ្នកប្រើមុនពេលចូលប្រើទិន្នន័យ ឬអនុវត្តប្រតិបត្តិការ។ ផ្ដល់ការគ្រប់គ្រងច្បាស់លាស់លើទិន្នន័យដែលត្រូវចែករំលែក និងសកម្មភាពដែលអនុញ្ញាត។

2. **ភាពឯកជនទិន្នន័យ**: បើកបង្ហាញទិន្នន័យអ្នកប្រើតែប៉ុណ្ណោះជាមួយការយល់ព្រមដោយច្បាស់លាស់ ហើយការពារវាជាមួយការត្រួតពិនិត្យចូលដំណើរការ។ ការពារការបញ្ជូនទិន្នន័យដោយមិនមានអាជ្ញាបណ្ណ។

3. **សុវត្ថិភាពឧបករណ៍**: ត្រូវការយល់ព្រមច្បាស់លាស់ពីអ្នកប្រើមុនហៅឧបករណ៍ណាមួយ។ ប្រាកដថាអ្នកប្រើយល់ដឹងពីមុខងាររបស់ឧបករណ៍នីមួយៗ និងអនុវត្តសុវត្ថិភាពដែនកំណត់យ៉ាងរឹងមាំ។

4. **ការគ្រប់គ្រងការអនុញ្ញាតឧបករណ៍**: កំណត់ឧបករណ៍ដែលគំរូប្រើនអាចប្រើបាននៅពេលកំណត់សម័យ ដើម្បីធានាថាឧបករណ៍ដែលបានអនុញ្ញាតតែប៉ុណ្ណោះអាចចូលប្រើបាន។

5. **ការផ្ទៀងផ្ទាត់**: ត្រូវការផ្ទៀងផ្ទាត់ត្រឹមត្រូវមុនពេលផ្ដល់ការចូលប្រើឧបករណ៍, ធនធាន ឬប្រតិបត្តិការស្ងើចស្ងាត់ ដោយប្រើកូនសោ API, សំបុត្រ OAuth ឬវិធីសាស្ត្រផ្ទៀងផ្ទាត់សុវត្ថិភាពផ្សេងទៀត។

6. **ការត្រួតពិនិត្យប៉ារ៉ាម៉ែត្រ**: អនុវត្តការត្រួតពិនិត្យសម្រាប់ការហៅឧបករណ៍ទាំងអស់ ដើម្បីទប់ស្កាត់ការបញ្ចូលខូចឬឧបានជាចោរកម្មឲ្យមិនទៅដល់ការអនុវត្តឧបករណ៍។

7. **កំណត់អត្រា**: អនុវត្តកំណត់អត្រាដើម្បីទប់ស្កាត់ការការប្រើប្រាស់តែងតែ និងធានាការប្រើប្រាស់ធនធានម៉ាស៊ីនបម្រើយ៉ាងសមរម្យ។
  
### អនុវត្តល្អបំផុតការអនុវត្តន៍

1. **ការពិភាក្សាសមត្ថភាព**: នៅពេលដំណើរការតភ្ជាប់ បម្លែងពត៌មានអំពីមុខងារដែលគាំទ្រ, កំណែពិពណ៌នា, ឧបករណ៍ និងធនធានដែលមាន។

2. **ការរចនា ឧបករណ៍**: បង្កើតឧបករណ៍ដែលផ្តោតលើការធ្វើរឿងមួយឲ្យល្អ ឱ្យហួសពីការធ្វើឧបករណ៍គ្មានរចនានៅលើបញ្ហាច្រើន។

3. **ការដោះស្រាយកំហុស**: អនុវត្តសារ និងកូដកំហុសដែលគោរពស្តង់ដា ដើម្បីជួយពិចារណាបញ្ហា, ដោះស្រាយការបរាជ័យយ៉ាងរលូន, និងផ្ដល់មតិយោបល់ដែលអាចអនុវត្តបាន។

4. **ការកត់ត្រា**: កំណត់កំណត់ត្រាតាមរចនាសម្ព័ន្ធ សម្រាប់ការត្រួតពិនិត្យវិសោធនកម្ម និងតាមដានប្រតិបត្តិការពិពណ៌នា។

5. **ការតាមដានវឌ្ឍនភាព**: សម្រាប់ប្រតិបត្តការដំណើរយូរអង្វែង រាយការណ៍បច្ចុប្បន្នភាពដើម្បីអនុញ្ញាតឲ្យមានមុខងារឆាប់ប្រតិបត្តិដល់អ្នកប្រើ។

6. **ការលប់បោះបង់សំណើ**: អនុញ្ញាតិឲ្យអតិថិជនបោះបង់សំណើដែលដំណើរការនៅពេលបច្ចុប្បន្ន ដែលពុំចាំបាច់ឬយឺតពេក។

##ឯកសារបន្ថែម

សម្រាប់ព័ត៌មានទាន់សម័យបំផុតអំពីអនុវត្តល្អបំផុត MCP សូមយោងទៅកាន់៖

- [ឯកសារ MCP](https://modelcontextprotocol.io/)
- [លក្ខណៈពិសេស MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [ឃ្លាំង GitHub](https://github.com/modelcontextprotocol)
- [អនុវត្តល្អបំផុតសុវត្ថិភាព](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - គ្រោះថ្នាក់សុវត្ថិភាព និងការពារ
- [សិក្ខាសាលាសុវត្ថិភាព MCP Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - បណ្តុះបណ្តាលសុវត្ថិភាពជាក់ស្តែង

## ឧទាហរណ៍អនុវត្តជាក់ស្តែង

### អនុវត្តល្អបំផុតការរចនា ឧបករណ៍

#### 1. គោលការណ៍ភារកិច្ចតែមួយ

ឧបករណ៍ MCP មួយៗគួរតែមានគោលបំណងច្បាស់លាស់និងផ្តោតសំខាន់។ មិនត្រូវបានបង្កើតឧបករណ៍បែបមូនូលីតិចដែលព្យាយាមដោះស្រាយបញ្ហាច្រើនទេ ត្រូវបង្កើតឧបករណ៍ឯកទេសដែលអាចធ្វើរឿងជាក់លាក់បានល្អ។

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

#### 2. ការដោះស្រាយកំហុសយ៉ាងជាប់ទីតាំង

អនុវត្តការដោះស្រាយកំហុសរឹងមាំជាមួយសារារាយការណ៍កំហុសពេញលេញ និងវិធានការស្ដារឡើងវិញត្រឹមត្រូវ។

```python
# ឧទាហរណ៍ Python ជាមួយនឹងការគ្រប់គ្រងកំហុសយ៉ាងទូលំទូលាយ
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # ការផ្ទៀងផ្ទាត់ប៉ារ៉ាម៉ែត្រ
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # ការផ្ទៀងផ្ទាត់សន្តិសុខ
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # ប្រតិបត្តិការមូលដ្ឋានទិន្នន័យដែលមានពេលផុតកំណត់
                async with timeout(10):  # ពេលផុតកំណត់ ១០ វិនាទី
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # កំហុសការតភ្ជាប់អាចជាការបណ្ដាលមុន
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # កំហុសសំណួរអាចជាកំហុសពីភាគីអតិថិជន
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # អនុញ្ញាតឱ្យកំហុសពាក់ព័ន្ធនឹងឧបករណ៍បន្តទៅ
            raise
        except Exception as e:
            # ចាប់កំហុសទាំងអស់សម្រាប់កំហុសមិនរំពឹងទុក
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # ការអនុវត្តភាពរកឃើញការចូល SQL មិនសម្រួល
        pass
        
    def _log_error(self, message, error):
        # ការអនុវត្តរាយការណ៍កំហុស
        pass
```

#### 3. ការត្រួតពិនិត្យប៉ារ៉ាម៉ែត្រ

តែងតែត្រួតពិនិត្យប៉ារ៉ាម៉ែត្រយ៉ាងម៉ត់ចត់ ដើម្បីទប់ស្កាត់ការបញ្ចូលខុសឬឧបានចោរកម្ម។

```javascript
// ឧទាហរណ៍ JavaScript/TypeScript ជាមួយការផ្ទៀងផ្ទាត់ប៉ារ៉ាម៉ែត្រយ៉ាងលម្អិត
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
    // 1. ផ្ទៀងផ្ទាត់ការមានប៉ារ៉ាម៉ែត្រ
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. ផ្ទៀងផ្ទាត់ប្រភេទប៉ារ៉ាម៉ែត្រ
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. ផ្ទៀងផ្ទាត់តម្លៃប៉ារ៉ាម៉ែត្រ
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. ផ្ទៀងផ្ទាត់ការមានមាតិកាសម្រាប់ប្រតិបត្តិការសរសេរ
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. ផ្ទៀងផ្ទាត់សុវត្ថិភាពផ្លូវ
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // ការអនុវត្តដោយផ្អែកលើប៉ារ៉ាម៉ែត្រដែលបានផ្ទៀងផ្ទាត់
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // ការអនុវត្តន៍សម្រាប់ការត្រួតពិនិត្យសុវត្ថិភាពផ្លូវ
    // ...
  }
}
```

###ឧទាហរណ៍អនុវត្តសុវត្ថិភាព

#### 1. ការផ្ទៀងផ្ទាត់ និងអនុញ្ញាត

```java
// ឧទាហរណ៍ Java ជាមួយការផ្ទៀងផ្ទាត់ និងការអនុញ្ញាតិ
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // ការចាក់បង្ហាប់ការពឹងផ្អែក
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
        // 1. ដកយកបរិបទផ្ទៀងផ្ទាត់
        String authToken = request.getContext().getAuthToken();
        
        // 2. ផ្ទៀងផ្ទាត់អ្នកប្រើ
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. ពិនិត្យការអនុញ្ញាតសម្រាប់ប្រតិបត្តិការពិសេស
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. បន្តជាមួយប្រតិបត្តិការដែលមានអនុញ្ញាត
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

#### 2. កំណត់អត្រា

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

## អនុវត្តល្អបំផុតសម្រាប់ការធ្វើតេស្ត

### 1. សាកល្បងឧបករណ៍ MCP ជាឯករាជ្យ

តែងតែធ្វើតេស្តឧបករណ៍របស់អ្នកក្នងមួយឯកតាមួយ ដោយប្រើការលេងតួរផ្ទាល់ខ្លួននៃផ្នែកខាងក្រៅ៖

```typescript
// ឧទាហរណ៍ TypeScript នៃការធ្វើតេស្តឯកត្តាសម្ភារៈ
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // បង្កើតសេវាកម្មអាកាសធាតុប្រើសំខាន់
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // បង្កើតឧបករណ៍ជាមួយការពឹងផ្អែកប្រើសំខាន់
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // តំរូវការ
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // ប្រតិបត្តិ
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // បញ្ជាក់
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // តំរូវការ
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // ប្រតិបត្តិ និងបញ្ជាក់
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. សាកល្បងការបញ្ចូល

ធ្វើតេស្តលំហូរការបញ្ចូលពេញលេញពីសំណើរអតិថិជនទៅការឆ្លើយតបម៉ាស៊ីនបម្រើ៖

```python
# ឧទាហរណ៍បញ្ចូលការតេស្ត Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # ចាប់ផ្តើមម៉ាស៊ីនមេតេស្ត
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # បង្កើតអ្នកអតិថិជន
        client = McpClient("http://localhost:5000")
        
        # បញ្ចាក់ការរកឧបករណ៍
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # បញ្ចាក់ការប្រតិបត្ដិឧបករណ៍
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # ពិនិត្យការឆ្លើយតប
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # សំអាតការងារ
        await server.stop()
```

## ការបង្កើនប្រសិទ្ធភាព

### 1. ប្រើយុទ្ធសាស្ត្រការចងចាំ

អនុវត្តការចងចាំដែលសមរម្យ ដើម្បីកាត់បន្ថយការពន្យាពេល និងការប្រើប្រាស់ធនធាន៖

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

#### 2. ការបញ្ចូលការពឹងផ្អែក និងការធ្វើតេស្តបាន

រចនាឧបករណ៍ឲ្យទទួលការពឹងផ្អែករបស់ខ្លួនតាមរយៈការបញ្ចូលកម្មង់ ដែលធ្វើឲ្យវាធ្វើតេស្តបាន និងអាចកំណត់បាន៖

```java
// ឧទាហរណ៍ Java ជាមួយការចាក់បញ្ចូលអាស្រ័យកិច្ច
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // អាស្រ័យកិច្ចត្រូវបានចាក់បញ្ចូលតាមរយៈកុងស្ត្រាក់ទ័រ
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // ការអនុវត្តឧបករណ៍
    // ...
}
```

#### 3. ឧបករណ៍ដែលអាចផ្សំគ្នា

រចនាឧបករណ៍ដែលអាចផ្សំគ្នា ដើម្បីបង្កើតដំណើរការស្មុគស្មាញជាងមុន៖

```python
# ឧទាហរណ៍ Python បង្ហាញឧបករណ៍អាចត្រូវបានផ្សំគ្នា
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # ការអនុវត្តន៍...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # ឧបករណ៍នេះអាចប្រើលទ្ធផលពីឧបករណ៍ dataFetch
    async def execute_async(self, request):
        # ការអនុវត្តន៍...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # ឧបករណ៍នេះអាចប្រើលទ្ធផលពីឧបករណ៍ dataAnalysis
    async def execute_async(self, request):
        # ការអនុវត្តន៍...
        pass

# ឧបករណ៍ទាំងនេះអាចប្រើបានដោយឯករាជ្យ ឬជាផ្នែកមួយនៃដំណើរការងារ
```

### អនុវត្តល្អបំផុតការរចនាតារាង

តារាងគឺជា​ពាក្យសន្យារវាងគំរូបំរើនិងឧបករណ៍របស់អ្នក។ តារាងដែលបានរចនាយ៉ាងល្អនាំឲ្យមានភាពងាយស្រួលក្នុងការប្រើប្រាស់ឧបករណ៍កាន់តែប្រសើរ។

#### 1. ពិពណ៌នាប៉ារ៉ាម៉ែត្រដែលច្បាស់លាស់

តែងតែលាយព័ត៍មានពិពណ៌នាសម្រាប់ប៉ារ៉ាម៉ែត្រនីមួយៗ៖

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

#### 2. ការកំណត់កំណត់ត្រាត្រួតពិនិត្យ

រួមបញ្ចូលការកំណត់កំណត់ត្រា ដើម្បីទប់ស្កាត់ការបញ្ចូលមិនត្រឹមត្រូវ៖

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ទ្រង់ទ្រាយអ៊ីមែលជាមួយការត្រួតពិនិត្យទ្រង់ទ្រាយ
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // ទ្រង់ទ្រាយអាយុជាមួយកំណត់លេខ
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // ទ្រង់ទ្រាយដែលប្រើប្រាស់បញ្ជីជ្រើសរើស
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

#### 3. រចនាសម្ព័ន្ធតបឆ្លើយដែលស៊ាំថ្មម

រក្សាទុកភាពស្របគ្នានៅក្នុងរចនាសម្ព័ន្ធចម្លើយ ដើម្បីធ្វើឱ្យមានភាពងាយស្រួលសម្រាប់គំរូបំរើក្នុងការបកស្រាយលទ្ធផល៖

```python
async def execute_async(self, request):
    try:
        # ដំណើរការសំណើ
        results = await self._search_database(request.parameters["query"])
        
        # តែងតែបង្រួមត្រឡប់តទៅរចនាសម្ព័ន្ធដដែល
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

### ការដោះស្រាយកំហុស

ការដោះស្រាយកំហុសរឹងមាំមានសារៈសំខាន់សម្រាប់ឧបករណ៍ MCP ដើម្បីរក្សាភាពទុកចិត្ត។

#### 1. ការដោះស្រាយកំហុសដោយប្រសិទ្ធភាព

ដោះស្រាយកំហុសនៅកម្រិតត្រឹមត្រូវ និងផ្ដល់សារពហុព័ត៌មាន៖

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

#### 2. ចម្លើយកំហុសរចនាសម្ព័ន្ធ

ត្រឡប់ព័ត៌មានកំហុសតាមរចនាសម្ព័ន្ធប្រសិនបើអាចធ្វើបាន៖

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // ការអនុវត្ត
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
        
        // បោះបង់វិញករណីកើតកំហុសផ្សេងទៀតជារូបភាព ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. លក្ខខណ្ឌចម្លងថយក្រោយ

អនុវត្តលក្ខខណ្ឌចម្លងថយក្រោយសមរម្យសម្រាប់ការបរាជ័យចៃដន្យ៖

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # វិនាទី
    
    while retry_count < max_retries:
        try:
            # ហៅ API ខាងក្រៅ
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # ការថយក្រោយអង្គគុណ
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # បំរែបំរួលមិនមែនជាបណ្តោះអាសន្ន មិនត្រូវព្យាយាមម្តងទៀត
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### ការបង្កើនប្រសិទ្ធភាព

#### 1. ការចងចាំ

អនុវត្តការចងចាំសម្រាប់ប្រតិបត្តិការឈឺថ្លើម៖

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

#### 2. ការគ្រប់គ្រងអសិនក្រោន

ប្រើលំនាំកម្មវិធីអសិនក្រោនសម្រាប់ប្រតិបត្តិការដែលពាក់ព័ន្ធនឹង I/O៖

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // សម្រាប់ប្រតិបត្តិការដែលរយៈពេលយូរ សូមត្រឡប់ ID ការដំណើរការឡើងវិញភ្លាមៗ
        String processId = UUID.randomUUID().toString();
        
        // ចាប់ផ្តើមដំណើរការជាអាស៊ីនក្រោយ
        CompletableFuture.runAsync(() -> {
            try {
                // អនុវត្តប្រតិបត្តិការដែលរយៈពេលយូរ
                documentService.processDocument(documentId);
                
                // ធ្វើបច្ចុប្បន្នភាពស្ថានភាព (ភាគច្រើននឹងត្រូវរក្សាទុកក្នុងមូលដ្ឋានទិន្នន័យ)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // ត្រឡប់នូវការឆ្លើយតបភ្លាមៗជាមួយ ID ការដំណើរការ
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // ឧបករណ៍ពិនិត្យស្ថានភាពរួមហើយ
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

#### 3. ការរារាំងធនធាន

អនុវត្តការរារាំងធនធាន ដើម្បីទប់ស្កាត់ការចំរូងផ្ទុកពេក៖

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # អនុញ្ញាតអោយមានសំនើរ 5 ក្នុងមួយវិនាទី
            bucket_size=10        # អនុញ្ញាតអោយមានការប្រមូលផ្តុំរហូតដល់ 10 សំនើរ
        )
    
    async def execute_async(self, request):
        # ពិនិត្យមើលថាតើយើងអាចបន្តរឺត្រូវរង់ចាំ
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # ប្រសិនបើការរង់ចាំយូរពេក
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # រង់ចាំរយៈពេលដែលសមរម្យ
                await asyncio.sleep(delay)
        
        # ប្រើប្រាស់ស្លាកកូដមួយហើយបន្តសំនើរ
        self.rate_limiter.consume()
        
        # ហៅ API
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
            
            # គណនាពេលវេលាដល់ពេលម៉ាស៊ីនស្លាកកូដមួយចេញមក
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # បន្ថែមស្លាកកូដថ្មីៗដោយផ្អែកលើពេលវេលាដែលបានឆ្លងកាត់
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### អនុវត្តល្អបំផុតសុវត្ថិភាព

#### 1. ការត្រួតពិនិត្យបញ្ចូល

តែងតែត្រួតពិនិត្យប៉ារ៉ាម៉ែត្របញ្ចូលយ៉ាងម៉ត់ចត់៖

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

#### 2. ការត្រួតពិនិត្យការអនុញ្ញាត

អនុវត្តការត្រួតពិនិត្យការអនុញ្ញាតត្រឹមត្រូវ៖

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // ទទួលបានបទContextអ្នកប្រើពីសំណើ
    UserContext user = request.getContext().getUserContext();
    
    // ពិនិត្យមើលថាតើអ្នកប្រើមានសិទ្ធិគ្រប់គ្រាន់ហើយឬទេ
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // សម្រាប់ធនធានជាក់លាក់ ពិនិត្យមើលការចូលដំណើរការទៅធនធាននោះ
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // បន្តការប្រតិបត្តិការឧបករណ៍
    // ...
}
```

#### 3. ការដោះស្រាយទិន្នន័យសំភារៈ

ដោះស្រាយទិន្នន័យសំភារៈយ៉ាងប្រុងប្រយ័ត្ន៖

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
        
        # ទទួលបានទិន្នន័យអ្នកប្រើ
        user_data = await self.user_service.get_user_data(user_id)
        
        # ត្រង់វាលដែលមានភាពសំងាត់ក្រៅតែបានស្នើសុំព្រមទទួលអនុញ្ញាត
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # ពិនិត្យកម្រិតអនុញ្ញាតនៅបរិបទសំណើរ
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # បង្កើតចម្លងមួយដើម្បីជៀសវាងកែប្រែដើម
        redacted = user_data.copy()
        
        # លុបទិន្នន័យមានភាពសំងាត់ជាក់លាក់
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # លុបទិន្នន័យមានភាពសំងាត់ក្នុងរង
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## អនុវត្តល្អបំផុតសម្រាប់ការធ្វើតេស្តឧបករណ៍ MCP

ការធ្វើតេស្តពេញលេញធានាថាឧបករណ៍ MCP ធ្វើការបានត្រឹមត្រូវ ដោះស្រាយករណីចុងក្រោយ និងចូលរួមបានត្រឹមត្រូវជាមួយប្រព័ន្ធផ្សេងទៀត។

### សាកល្បងឯកតា

#### 1. សាកល្បងឧបករណ៍មួយៗដោយឯករាជ្យ

បង្កើតតេស្តផ្តោតសំខាន់សម្រាប់មុខងារនីមួយៗនៃឧបករណ៍៖

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

#### 2. សាកល្បងការត្រួតពិនិត្យតារាង

សាកល្បងឱ្យប្រាកដថាតារាងត្រឹមត្រូវ និងបំពេញកំណត់ត្រារួចរាល់៖

```java
@Test
public void testSchemaValidation() {
    // បង្កើតឧបករណ៍
    SearchTool searchTool = new SearchTool();
    
    // ទទួលយកស្គីម
    Object schema = searchTool.getSchema();
    
    // បំប្លែងស្គីមទៅ JSON សម្រាប់ពិនិត្យតម្លៃ
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // ពិនិត្យស្គីមថា ជា JSONSchema ដែលត្រឹមត្រូវ
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // សាកល្បងប៉ារាម៉ែត្រ ដែលមានតម្លៃត្រឹមត្រូវ
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // សាកល្បងប៉ារាម៉ែត្រ ដែលខ្វះ
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // សាកល្បងប្រភេទប៉ារាម៉ែត្រ មិនត្រឹមត្រូវ
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. តេស្តការដោះស្រាយកំហុស

បង្កើតតេស្តជាក់លាក់សម្រាប់ស្ថានភាពកំហុស៖

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # រៀបចំ
    tool = ApiTool(timeout=0.1)  # ពេលវេលា​កំណត់​ខ្លីណាស់
    
    # បង្កើតសំណើមួយដែលនឹងពុំឆាប់ចេញ
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # យឺតជាងពេលវេលា​កំណត់
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # សកម្មភាព និងបញ្ជាក់
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ពិនិត្យសារការកើតករណីលើកលែង
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # រៀបចំ
    tool = ApiTool()
    
    # បង្កើតចម្លើយដែលមានការកំណត់អត្រា
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
        
        # សកម្មភាព និងបញ្ជាក់
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # ពិនិត្យការលើកលែងមានព័ត៌មានអំពីការកំណត់អត្រា
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### សាកល្បងការបញ្ចូល

#### 1. សាកល្បងខ្សែឧបករណ៍

សាកល្បងឧបករណ៍ធ្វើការជាមួយគ្នាក្នុងលំនាំដែលរំពឹងទុក៖

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

#### 2. សាកល្បងម៉ាស៊ីនបម្រើ MCP

សាកល្បងម៉ាស៊ីនបម្រើ MCP ជាមួយការចុះឈ្មោះ និងការប្រតិបត្តិការ ឧបករណ៍ពេញលេញ៖

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
        // សាកល្បងចុងក្រោយរកឃើញ
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // បង្កើតការស្នើសុំឧបករណ៍
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // ផ្ញើសំណើ និងផ្ទៀងផ្ទាត់ចម្លើយ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // បង្កើតសំណើឧបករណ៍មិនត្រឹមត្រូវ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // ប៉ារ៉ាម៉ែត្រ "b" ខ្វះ
        request.put("parameters", parameters);
        
        // ផ្ញើសំណើ និងផ្ទៀងផ្ទាត់ចម្លើយកំហុស
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. សាកល្បងពីចាប់ផ្តើមដល់បញ្ចប់

សាកល្បងដំណើរការពេញលេញពីផ្ទាំងបង្ហាញម៉ូដែលដល់ការប្រតិបត្តឧបករណ៍៖

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # រៀបចំ - ស្ថាបនាអតិថិជន MCP និងម៉ូដែលគំនុំ
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # តបស្នងម៉ូដែលគំនុំ
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
    
    # តបសងឧបករណ៍អាកាសធាតុគំនុំ
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
        
        # ពិនិត្យ
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # បញ្ជាក់ទុក
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### សាកល្បងប្រសិទ្ធភាព

#### 1. សាកល្បងផ្ទុក

សាកល្បងបរិមាណសំណើដែលម៉ាស៊ីនបម្រើ MCP អាចដំណើរការ៖

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

#### 2. សាកល្បងសំពាធ

សាកល្បងប្រព័ន្ធនៅក្រោមបន្ទុកខ្លាំង៖

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // តំឡើង JMeter សម្រាប់ការបញ្ចេញសម្ពាធ
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // កំណត់ផែនការប្រឡង JMeter
    HashTree testPlanTree = new HashTree();
    
    // បង្កើតផែនការប្រឡង ក្រុមថ្រែត និងសេម​ភើរៗ
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // បន្ថែមសេមភើរនៃ HTTP សម្រាប់ការប្រតិបត្តិឧបករណ៍
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // បន្ថែមអ្នកស្ដាប់
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // ប្រតិបត្តិការប្រឡង
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // ផ្ទៀងផ្ទាត់លទ្ធផល
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // ពេលវេលាឆ្លើយតបមធ្យម < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // ភាគរយទី ៩០ < 500ms
}
```

#### 3. តាមដាន និងវិភាគ

រៀបចំការតាមដានសម្រាប់វិភាគប្រសិទ្ធភាពរយៈពេលវែង៖

```python
# កំណត់ការត្រួតពិនិត្យសម្រាប់ម៉ាស៊ែរកម្ម MCP
def configure_monitoring(server):
    # តម្លើងម៉ែត្រអំពី Prometheus
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
    
    # បន្ថែម middleware សម្រាប់ពេលវេលា និងការចុះបញ្ជីម៉ែត្រ
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # បង្ហាញចំណុចចុះបញ្ជីម៉ែត្រ
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## គំរូរចនាដំណើរការ MCP

ដំណើរការ MCP ដែលបានរចនាយ៉ាងល្អ បង្កើនប្រសិទ្ធភាព, ភាពទុកចិត្ត និងភាពងាយក្នុងការថែទាំ។ នេះជាគំរូសំខាន់ៗដែលត្រូវអនុវត្ត៖

### 1. គំរូខ្សែឧបករណ៍

ភ្ជាប់ឧបករណ៍ច្រើនជាលំដាប់ ទីនេះផលិតផលចេញនៃឧបករណ៍មួយក្លាយជាការបញ្ចូលសម្រាប់ឧបករណ៍បន្ទាប់៖

```python
# អនុវត្តខ្សែឧបករណ៍ Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # បញ្ជីឈ្មោះឧបករណ៍សម្រាប់អនុវត្តទៅតាមលំដាប់
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # អនុវត្តឧបករណ៍នីមួយៗក្នុងខ្សែ ដោយបញ្ជូនលទ្ធផលមុន
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # រក្សាទុកលទ្ធផលនិងប្រើជាinputសម្រាប់ឧបករណ៍បន្ទាប់
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# ឧទាហរណ៍ការប្រើប្រាស់
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

### 2. គំរូផ្ញើបញ្ជា

ប្រើឧបករណ៍មួយកណ្តាលដែលផ្ញើទៅឧបករណ៍ឯកទេសជាមួយការបញ្ចូល៖

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

### 3. គំរូបញ្ចូលជាមួយប្រតិបត្តិការដ៏ច្រើនតែមួយពេល

ដំណើរការឧបករណ៍ជាច្រើនទៅវិញទៅមក ដើម្បីបង្កើនប្រសិទ្ធភាព៖

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // ជំហានទី 1: ទាញយកព័ត៌មានមេតាដាតាឈុតទិន្នន័យ (សមកាលិកា)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // ជំហានទី 2: ចាប់ផ្តើមវិភាគច្រើនជាសងមុខគ្នា
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
        
        // រង់ចាំអោយការងារសងមុខគ្រប់យ៉ាងបញ្ចប់
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // រង់ចាំការបញ្ចប់
        
        // ជំហានទី 3: លាយលទ្ធផល
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // ជំហានទី 4: បង្កើតរបាយការណ៍សង្ខេប
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // បញ្ជូនលទ្ធផលដំណើរការសរុបចេញ
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. គំរូស្ដារឡើងវិញកំហុស

អនុវត្តវិធីសាស្ត្រស្ដារឡើងវិញយ៉ាងរលូនសម្រាប់ករណីឧបករណ៍បរាជ័យ៖

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # ព្យាយាមឧបករណ៏មូលដ្ឋាន ជាសិន
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # កត់ត្រាការបរាជ័យ
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # វាលែងជួយទៅឧបករណ៏ប្រយោគទីពីរ
            try:
                # អាចត្រូវការបំលាស់ប្ដូរពារ៉ាម៉ែត្រសម្រាប់ឧបករណ៏ជំនួស
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # ទាំងពីរឧបករណ៏បរាជ័យទាំងស្រុង
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # ការអនុវត្តនេះនឹងអាស្រ័យលើឧបករណ៏ជាក់លាក់
        # សម្រាប់ឧទាហរណ៍នេះ, យើងនឹងត្រឹមតែត្រឡប់មកពីពារ៉ាម៉ែត្រដើមប៉ុណ្ណោះ
        return params

# ឧទាហរណ៍នៃការប្រើប្រាស់
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # API អាកាសធាតុ(mដែលផ្តល់គ្រប់គ្រង) ជាសិន
        "basicWeatherService",    # API អាកាសធាតុជំនួស (ឥតគិតថ្លៃ)
        {"location": location}
    )
```

### 5. គំរូបង្កើតដំណើរការ

សង់ដំណើរការស្មុគស្មាញដោយផ្សំនូវដំណើរការងាយៗ៖

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

# ការធ្វើតេស្តម៉ាស៊ីនបម្រើ MCP៖ អនុវត្តល្អបំផុត និងគន្លឹះសំខាន់ៗ

## ទិដ្ឋភាពទូលំទូលាយ

ការធ្វើតេស្តគឺជាផ្នែកសំខាន់នៃការអភិវឌ្ឍម៉ាស៊ីនបម្រើ MCP ដែលទូលំទូលាយ និងមានគុណភាព។ មគ្គុទេសក៍នេះផ្តល់អនុវត្តល្អបំផុត និងគន្លឹះសម្រាប់ការធ្វើតេស្តម៉ាស៊ីនបម្រើ MCP របស់អ្នកក្នុងរយៈពេលអភិវឌ្ឍ, ចាប់តាំងពីតេស្តឯកតា ដល់តេស្តបញ្ចូល និងតេស្តពីចាប់ផ្តើមដល់បញ្ចប់។

## ហេតុអ្វីបានជាការធ្វើតេស្តមានសារៈសំខាន់សម្រាប់ម៉ាស៊ីនបម្រើ MCP

ម៉ាស៊ីនបម្រើ MCP បំរើជាស្រទាប់កណ្តាលនៅចន្លោះគំរូ AI និងកម្មវិធីអតិថិជន។ ការធ្វើតេស្តយ៉ាងខ្ជាប់ខ្ជួនធានា៖

- ភាពទុកចិត្តនៅក្នុងបរិស្ថានផលិត
- ការដោះស្រាយត្រឹមត្រូវនៃសំណើ និងការឆ្លើយតប
- ការអនុវត្តត្រឹមត្រូវនៃលក្ខខណ្ឌ MCP
- អាចធន់ទ្រាំនឹងករណីបរាជ័យ និងករណីគួរឱ្យចាប់អារម្មណ៍
- ប្រសិទ្ធិភាពស៊ីសង្វាក់នៅក្រោមបន្ទុកផ្សេងៗ

## តេស្តឯកតាសម្រាប់ម៉ាស៊ីនបម្រើ MCP

### តេស្តឯកតា (មូលដ្ឋាន)

តេស្តឯកតា ផ្ទៀងផ្ទាត់ផ្នែកឯកត្តិមួយៗនៃម៉ាស៊ីនបម្រើ MCP របស់អ្នកដោយឯករាជ្យ។

#### អ្វីដែលត្រូវសាកល្បង

1. **អ្នកចាត់គ្រប់គ្រងធនធាន**: សាកល្បងវិញ្ញាសាអ្នកចាត់គ្រប់គ្រងធនធាននីមួយៗដោយឡែក
2. **ការអនុវត្តឧបករណ៍**: ពិនិត្យអាកប្បកិរិយាឧបករណ៍ជាមួយបញ្ចូលថែមតារាងផ្សេងៗ
3. **ទំព័រផ្ទាំងបង្ហាញ**: ធានាថាទំព័រផ្ទាំងបង្ហាញបង្ហាញបានត្រឹមត្រូវ
4. **ត្រួតពិនិត្យតារាង**: សាកល្បងត្រួតពិនិត្យប៉ារ៉ាម៉ែត្របានត្រឹមត្រូវ
5. **ការដោះស្រាយកំហុស**: ពិនិត្យចម្លើយកំហុសសម្រាប់បញ្ចូលមិនត្រឹមត្រូវ

#### អនុវត្តល្អបំផុតសម្រាប់តេស្តឯកតា

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
# ឧទាហរណ៍តេស្តឯកតាសម្រាប់ឧបករណ៍គណនាគ្រាន់តែជាភាសា Python
def test_calculator_tool_add():
    # រៀបចំ
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # ធ្វើព្រម
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # ធ្វើការបញ្ជាក់
    assert result["value"] == 12
```

### តេស្តបញ្ចូល (ស្រទាប់កណ្តាល)

តេស្តបញ្ចូលផ្ទៀងផ្ទាត់ប្រតិបត្តិការចូលរវាងផ្នែកនានានៃម៉ាស៊ីនបម្រើ MCP របស់អ្នក។

#### អ្វីដែលត្រូវសាកល្បង

1. **ការចាប់ផ្តើមម៉ាស៊ីនបម្រើ**: សាកល្បងចាប់ផ្តើមម៉ាស៊ីនបម្រើជាមួយការកំណត់ផ្សេងៗ
2. **ការចុះបញ្ជីផ្លូវ**: ពិនិត្យអោយប្រាកដថាចំណុចចូលទាំងអស់ត្រូវបានចុះបញ្ជីត្រឹមត្រូវ
3. **ការប្រតិបត្តិការសំណើ**: សាកល្បងរំលងសំណើ-ចម្លើយពេញលេញ
4. **ការបន្តផ្ទេរកំហុស**: ធានាថាកំហុសត្រូវបានដោះស្រាយត្រឹមត្រូវក្នុងផ្នែកផ្សេងៗ
5. **ការផ្ទៀងផ្ទាត់ និងការអនុញ្ញាត**: សាកល្បងមេកានិចសុវត្ថិភាព

#### អនុវត្តល្អបំផុតសម្រាប់តេស្តបញ្ចូល

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

### តេស្តពីចាប់ផ្តើមដល់បញ្ចប់ (ស្រទាប់លើ)

តេស្តពីចាប់ផ្តើមដល់បញ្ចប់ ផ្ទៀងផ្ទាត់អាកប្បកិរិយាប្រព័ន្ធពេញលេញពីអតិថិជនទៅម៉ាស៊ីនបម្រើ។

#### អ្វីដែលត្រូវសាកល្បង

1. **ការទំនាក់ទំនងអតិថិជន-ម៉ាស៊ីនបម្រើ**: សាកល្បងលំហូរសំណើ-ចម្លើយពេញលេញ
2. **SDK អតិថិជនពិតប្រាកដ**: សាកល្បងជាមួយការអនុវត្តអតិថិជនពិតប្រាកដ
3. **ប្រសិទ្ធភាពក្រោមបន្ទុក**: ពិនិត្យអាកប្បកិរិយាជាមួយសំណើច្រើនរួមគ្នា
4. **ការស្ដារឡើងវិញកំហុស**: សាកល្បងការស្ដារឡើងវិញប្រព័ន្ធពីការបរាជ័យ
5. **ប្រតិបត្តិការយូរអង្វែង**: ពិនិត្យការគ្រប់គ្រងស្ទ្រីម និងប្រតិបត្តិការយូរអង្វែង

#### អនុវត្តល្អបំផុតសម្រាប់តេស្តពីចាប់ផ្តើមដល់បញ្ចប់

```typescript
// ឧទាហរណ៍ការប្រឡង E2E ជាមួយអតិថិជននៅក្នុង TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // បើកម៉ាស៊ីនបម្រើក្នុងបរិបទសាកល្បង
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // សកម្មភាព
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // ផ្ទៀងផ្ទាត់
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## យុទ្ធសាស្ត្រលេងតួសម្រាប់ការធ្វើតេស្ត MCP

ការលេងតួជាសារសំខាន់សម្រាប់ការបំបែកផ្នែកក្នុងពេលធ្វើតេស្ត។

### ផ្នែកដែលត្រូវតែលេងតួ

1. **គំរូបំរើ AI ខាងក្រៅ**: លេងតួចម្លើយគំរូបំរើសម្រាប់ការធ្វើតេស្តដែលអាចទាយទុកបាន
2. **សេវាកម្មខាងក្រៅ**: លេងតួការព្យាបាល API (មូលដ្ឋានទិន្នន័យ, សេវាកម្មភាគីទីបី)
3. **សេវាកម្មផ្ទៀងផ្ទាត់**: លេងតួអ្នកផ្តល់អត្តសញ្ញាណ
4. **អ្នកផ្គត់ផ្គង់ធនធាន**: លេងតួអ្នកចាត់ថែធនធានដែលថ្លៃថ្នូរ

### ឧទាហរណ៍: លេងតួចម្លើយគំរូបំរើ AI

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
# គំរូ Python ជាមួយ unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # កំណត់ការសម្រួល mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # ប្រើ mock ក្នុងការប្រឡង
    server = McpServer(model_client=mock_model)
    # បន្តជាមួយការប្រឡង
```

## តេស្តប្រសិទ្ធភាព

ការធ្វើតេស្តប្រសិទ្ធភាពមានសារៈសំខាន់សម្រាប់ម៉ាស៊ីនបម្រើ MCP នៅក្នុងផលិតកម្ម។

### អ្វីដែលត្រូវវាស់វែង

1. **ពេលវេលាទទួលចម្លើយ**: ពេលវេលាឆ្លើយតបសម្រាប់សំណើ
2. **ចំនួនសំណើក្នុងមួយវិនាទី**: ចំនួនសំណើដែលដំណើរការបានក្នុងមួយវិនាទី
3. **ការប្រើប្រាស់ធនធាន**: CPU, អង្គចងចាំ, ការប្រើប្រាស់បណ្តាញ
4. **ការគ្រប់គ្រងសំណើរជាមួយគ្នា**: អាកប្បកិរិយាដូចម្តេចនៅក្រោមសំណើបង្ហោះជាច្រើន
5. **លក្ខណៈបណ្តោយឈានដល់**: ការបង្ហាញប្រសិទ្ធភាពជាមួយការបន្ថែមបន្ទុក

### ឧបករណ៍សម្រាប់តេស្តប្រសិទ្ធភាព

- **k6**: ឧបករណ៍ធ្វើតេស្តបង្ហោះប្រភពបើក
- **JMeter**: សាកល្បងប្រសិទ្ធភាពទូលំទូលាយ
- **Locust**: ឧបករណ៍ធ្វើតេស្តបង្ហោះផ្អែកលើ Python
- **Azure Load Testing**: ការធ្វើតេស្តប្រសិទ្ធភាពនៅលើមេឃ

### ឧទាហរណ៍: តេស្តបង្ហោះមូលដ្ឋានជាមួយ k6

```javascript
// ស្គ្រីប k6 សម្រាប់ការធ្វើតេស្តផ្ទុកម៉ាស៊ីនមេ MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // អ្នកប្រើប្រាស់មកពីប្រព័ន្ធវេចខ្ចប់ 10 នាក់
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

## អូតូម៉ាទិនសម្រាប់តេស្តម៉ាស៊ីនបម្រើ MCP

ការអូតូម៉ាទិនតេស្តរបស់អ្នកធានាគុណភាពបានឯកភាព និងរហ័សនូវដំណើរការផ្ទាល់តាមរយៈករណីប្រតិបត្តិ។

### សមាសភាព CI/CD

1. **រត់តេស្តឯកតា នៅពេល Pull Requests**: ធានាថាការកែប្រែកូដមិនបំបែកមុខងារដែលមានរួចដែលមានរួចនៅហើយ សូមបន្តបញ្ជូនសំណើផ្លាស់ប្តូរឡើង។


2. **ការតេស្តការរួមបញ្ចូលនៅក្នុង Staging**៖ បញ្ជាថ្ងៃអ្នកធ្វើតេស្តការរួមបញ្ចូលនៅក្នុងបរិបទមុនផលិតកម្ម  
3. **មូលដ្ឋានការប្រតិបត្តិការណ៍**៖ រក្សាទុកស្តង់ដារប្រតិបត្តិការណ៍ដើម្បីចាប់យកការធ្លាក់ចុះ  
4. **ការស្កេនសុវត្ថិភាព**៖ ធ្វើតេស្តសុវត្ថិភាពដោយស្វ័យប្រវត្តិជាផ្នែកមួយនៃជួរផ្លូវ  

### ឧទាហរណ៍គន្លង CI (GitHub Actions)

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
  
## ការធ្វើតេស្តការអនុលោមតាមលក្ខណៈ MCP

ផ្ទៀងផ្ទាត់ម៉ាស៊ីនមេរបស់អ្នកថាបានអនុវត្តលក្ខណៈ MCP យ៉ាងត្រឹមត្រូវ។

### តំបន់អនុលោមសំខាន់ៗ

1. **ចំណុចបញ្ចប់ API**៖ តេស្តចំណុចបញ្ចប់ដែលត្រូវការ (/resources, /tools, ល។)  
2. **ទ្រង់ទ្រាយសំណើ/ចម្លើយ**៖ ផ្ទៀងផ្ទាត់ការអនុលោមស្គីម៉ា  
3. **កូដកំហុស**៖ ផ្ទៀងផ្ទាត់កូដស្ថានភាពត្រឹមត្រូវសម្រាប់ស្ថានភាពផ្សេងៗ  
4. **ប្រភេទមាតិកា**៖ តេស្តការដំណើរការប្រភេទមាតិកានានា  
5. **ដំណើរការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ**៖ ផ្ទៀងផ្ទាត់មេកានិចផ្ទៀងផ្ទាត់តាមលក្ខណៈជាម៉ារូង  

### សំណុំនៃការធ្វើតេស្តអនុលោម

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
  
## លំនាំ ១០ មុខសម្រាប់ការធ្វើតេស្តម៉ាស៊ីនមេ MCP ដោយមានប្រសិទ្ធភាព

1. **តេស្តការបកផ្សាយឧបករណ៍ដោយឡែក**៖ ផ្ទៀងផ្ទាត់ការបកផ្សាយស្គីម៉ាដោយឯករាជ្យពីចំណូលចិត្តឧបករណ៍  
2. **ប្រើតេស្តដែលមានប៉ារ៉ាម៉ែត្រ**៖ តេស្តឧបករណ៍ជាមួយបញ្ចូលចម្រាស់នានា រួមមានករណីគំរូនិងកំណត់ជ្រុង  
3. **ពិនិត្យចម្លើយកំហុស**៖ ផ្ទៀងផ្ទាត់ការដំណើរការបានត្រឹមត្រូវនៃកំហុសគ្រប់ស្ថានភាព  
4. **តេស្តត្រូវនេះសិទ្ធិ**៖ ត្រួតពិនិត្យការត្រួតពិនិត្យការចូលប្រើគ្រប់តួនាទីអ្នកប្រើ  
5. **ត្រួតពិនិត្យការគ្របដណ្តប់ការធ្វើតេស្ត**៖ គោលដៅការគ្របដណ្តប់ខ្ពស់លើកូដផ្លូវសំខាន់  
6. **តេស្តចម្លើយផ្សាយបន្ត**៖ ផ្ទៀងផ្ទាត់ការដំណើរការប្រកបដោយភាពត្រឹមត្រូវនៃមាតិកាបញ្ជូនជាបន្ត  
7. **សម្រួលបញ្ហាបណ្ដាញ**៖ តេស្តអ្វីកើតឡើងក្រោមលក្ខខណ្ឌបណ្ដាញអន់  
8. **តេស្តកំណត់ធនធាន**៖ ផ្ទៀងផ្ទាត់អាកប្បកិរិយា​ពេលឈានដល់គោលដៅឬកំណត់អត្រា  
9. **ធ្វើតេស្តបង្វិលម្តងទៀតដោយស្វ័យប្រវត្តិ**៖ បង្កើតសំណុំតេស្តដែលរត់នៅពេលមានការផ្លាស់ប្តូរកូដរាល់ដង  
10. **ចងក្រងឯកសារករណីតេស្ត**៖ រក្សាឯកសារបញ្ជាក់ច្បាស់ពីស្ថានភាពតេស្ត  

## បញ្ហាប្រឈមក្នុងការធ្វើតេស្តធម្មតា

- **ផ្អែកលើផ្លូវសប្បាយជ្រាលជ្រៅ**៖ ធ្វើការតេស្តករណីកំហុសយ៉ាងពេញលេញ  
- **មិនបានយកចិត្តទុកដាក់ការធ្វើតេស្តប្រសិទ្ធភាព**៖ ស្វែងរកកន្លែងឈឺចាប់មុនវាខូចខាតផលិតកម្ម  
- **តេស្តដោយឯកាស្ថានតែម្ដង**៖ ផ្សំគ្នារវាងតេស្តឯកតា, តេស្តរួមបញ្ចូល, និងតេស្តចុងក្រោយ  
- **ការគ្របដណ្តប់ API មិនពេញលេញ**៖ ប្រាកដថាចំណុចបញ្ចប់ និងលក្ខណៈគ្រប់ឆ្វេងត្រូវបានធ្វើតេស្ត  
- **បរិបទតេស្តមិនស្របគ្នា**៖ ប្រើcontainers ដើម្បីធានាបរិបទតេស្តស្របគ្នា  

## បញ្ចប់

យុទ្ធសាស្រ្តធ្វើតេស្តគ្រប់លំដាប់គឺជាប្រភេទមួយដែលចាំបាច់សម្រាប់ការអភិវឌ្ឍម៉ាស៊ីនមេ MCP ដែលទុកចិត្តបាន និងមានគុណភាពខ្ពស់។ ដោយអនុវត្តន៍ការអនុវត្តល្អបំផុតនិងយោបល់ដែលបានលើកឡើងក្នុងមគ្គុទេសក៍នេះ អ្នកអាចធានាបានថាការអនុវត្ត MCP របស់អ្នក បំពេញតាមស្តង់ដាគុណភាព, ភាពទុកចិត្ត, និងការប្រតិបត្ដិការឿងដ៏ល្អបំផុត។  

## ចំណុចសំខាន់ដែលត្រូវយកចិត្តទុកដាក់

1. **ការរចនាឧបករណ៍**៖ អនុវត្តគោលការណ៍ភារកិច្ចតែមួយ, ប្រើ dependency injection, និងរចនាដើម្បីមានភាពផ្សំ  
2. **ការរចនាស្គីម៉ា**៖ បង្កើតស្គីម៉ាដែលច្បាស់លាស់ និងមានឯកសារពិពណ៌នាលម្អិតជាមួយកំណត់ផ្ទៀងផ្ទាត់ត្រឹមត្រូវ  
3. **ការដំណើរការកំហុស**៖ អនុវត្តការដំណើរការកំហុសយ៉ាងរាបសារ, ចម្លើយកំហុសដែលមានរចនាសម្ព័ន្ធ, និងយុទ្ធសាស្រ្ត retry  
4. **ប្រសិទ្ធភាព**៖ ប្រើ caching, ដំណើរការអាស៊ីនខណៈ (asynchronous), និងកំណត់ធនធាន  
5. **សុវត្ថិភាព**៖ អនុវត្តការផ្ទៀងផ្ទាត់បញ្ចូលយ៉ាងម៉ត់ចត់, ការត្រួតពិនិត្យអនុញ្ញាត, និងការដំណើរការទិន្នន័យដែលមានភាពប្រញាប់ពេល  
6. **ការធ្វើតេស្ត**៖ បង្កើតតេស្តឯកតា, តេស្តការរួមបញ្ចូល និងតេស្តចុងក្រោយដោយទូលំទូលាយ  
7. **លំនាំធ្វើការងារ**៖ អនុវត្តលំនាំដែលបានកំណត់ស្ដង់ដារដូចជា ខ្សែ, dispatchers, និងដំណើរការរួមសមមាឌ  

## ប្រអប់ហ្វឹកហាត់

រចនាឧបករណ៍ MCP និងលំនាំធ្វើការងារ សម្រាប់ប្រព័ន្ធដំណើរការឯកសារ ដែល៖

1. ទទួលឯកសារជាប្រភេទច្រើន (PDF, DOCX, TXT)  
2. ផ្ទុកអត្ថបទ និងព័ត៌មានសំខាន់ពីឯកសារ  
3. ចាត់ថ្នាក់ឯកសារតាមប្រភេទ និងមាតិកា  
4. បង្កើតសង្ខេបឯកសារនីមួយៗ  

អនុវត្តស្គីម៉ាឧបករណ៍, ការចាត់ការកំហុស, និងលំនាំធ្វើការងារដែលសមស្របបំផុតសម្រាប់ស្ថានភាពនេះ។ ពិចារណាវិធីដែលអ្នកនឹងធ្វើតេស្តអនុវត្តន៍នេះ។  

## ប្រភពទិន្នន័យ

1. ចូលរួមសហគមន៍ MCP នៅលើ [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) ដើម្បីទទួលបានព័ត៌មានថ្មីៗ  
2. ឧបត្ថម្ភគម្រោងមូលដ្ឋានបើក [MCP projects](https://github.com/modelcontextprotocol)  
3. អនុវត្តគោលការណ៍ MCP ក្នុងស្ថាប័ន AI របស់អង្គភាពរបស់អ្នក  
4. ស្វែងយល់អំពីការអនុវត្ត MCP ជាពិសេសសម្រាប់ឧស្សាហកម្មរបស់អ្នក  
5. ពិចារណាទៅចូលរួមវគ្គខ្ពស់ជាពិសេសមុខផ្សេងៗទាក់ទងនឹង MCP ដូចជា ការរួមបញ្ចូលម៉ូដ្យុលាជាច្រើន ឬ ការរួមបញ្ចូលកម្មវិធីអាជីវកម្ម  
6. សាកល្បងបង្កើតឧបករណ៍ MCP និងលំនាំធ្វើការងារដោយផ្អែកលើគោលការណ៍ដែលរៀនក្នុង [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## តើបន្ទាប់មានអ្វី

បន្ទាប់៖ [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->