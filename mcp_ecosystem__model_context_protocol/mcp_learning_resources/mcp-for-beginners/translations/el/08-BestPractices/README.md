# Καλύτερες Πρακτικές Ανάπτυξης MCP

[![Καλύτερες Πρακτικές Ανάπτυξης MCP](../../../translated_images/el/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Κάντε κλικ στην εικόνα παραπάνω για να δείτε το βίντεο αυτής της ενότητας)_

## Επισκόπηση

Αυτή η ενότητα εστιάζει σε προχωρημένες καλύτερες πρακτικές για την ανάπτυξη, δοκιμή και ανάπτυξη MCP servers και λειτουργιών σε παραγωγικά περιβάλλοντα. Καθώς τα οικοσυστήματα MCP γίνονται πιο πολύπλοκα και σημαντικά, η τήρηση καθιερωμένων προτύπων εξασφαλίζει αξιοπιστία, διαχειρισιμότητα και διαλειτουργικότητα. Αυτή η ενότητα συγκεντρώνει πρακτική σοφία από πραγματικές υλοποιήσεις MCP για να σας καθοδηγήσει στη δημιουργία ανθεκτικών, αποδοτικών servers με αποτελεσματικούς πόρους, προτροπές και εργαλεία.

## Στόχοι Μάθησης

Στο τέλος αυτής της ενότητας, θα μπορείτε να:

- Εφαρμόζετε βέλτιστες πρακτικές του κλάδου στον σχεδιασμό MCP servers και λειτουργιών
- Δημιουργείτε ολοκληρωμένες στρατηγικές δοκιμών για MCP servers
- Σχεδιάζετε αποδοτικά, επαναχρησιμοποιούμενα πρότυπα ροής εργασίας για πολύπλοκες εφαρμογές MCP
- Υλοποιείτε σωστή διαχείριση σφαλμάτων, καταγραφής και παρατηρησιμότητας σε MCP servers
- Βελτιστοποιείτε υλοποιήσεις MCP για απόδοση, ασφάλεια και διαχειρισιμότητα

## Βασικές Αρχές MCP

Πριν εμβαθύνετε σε συγκεκριμένες πρακτικές υλοποίησης, είναι σημαντικό να κατανοήσετε τις βασικές αρχές που καθοδηγούν την αποτελεσματική ανάπτυξη MCP:

1. **Τυποποιημένη Επικοινωνία**: Το MCP χρησιμοποιεί JSON-RPC 2.0 ως θεμέλιο, παρέχοντας μια συνεπή μορφή για αιτήσεις, απαντήσεις και διαχείριση σφαλμάτων σε όλες τις υλοποιήσεις.

2. **Σχεδιασμός με επίκεντρο τον Χρήστη**: Προτεραιοποιήστε πάντα τη συγκατάθεση, τον έλεγχο και τη διαφάνεια προς τον χρήστη στις υλοποιήσεις MCP σας.

3. **Ασφάλεια Πρώτα**: Υλοποιήστε ισχυρά μέτρα ασφαλείας όπως αυθεντικοποίηση, αδειοδότηση, επικύρωση και περιορισμό ρυθμού.

4. **Μοντέλο Αρχιτεκτονικής**: Σχεδιάστε τους MCP servers σας με μοντέρνα προσέγγιση, όπου κάθε εργαλείο και πόρος έχει σαφή και εστιασμένο σκοπό.

5. **Κατάσταση Συνδέσεων**: Εκμεταλλευτείτε την ικανότητα του MCP να διατηρεί κατάσταση σε πολλαπλά αιτήματα για πιο συνεκτικές και συμφραζόμενες αλληλεπιδράσεις.

## Επίσημες Καλύτερες Πρακτικές MCP

Οι ακόλουθες καλύτερες πρακτικές προέρχονται από την επίσημη τεκμηρίωση του Model Context Protocol:

### Καλύτερες Πρακτικές Ασφάλειας

1. **Συγκατάθεση Χρήστη και Έλεγχος**: Απαιτείται πάντα ρητή συγκατάθεση χρήστη πριν την πρόσβαση σε δεδομένα ή εκτέλεση ενεργειών. Παρέχετε σαφή έλεγχο σε ποια δεδομένα κοινοποιούνται και ποιες ενέργειες εξουσιοδοτούνται.

2. **Ιδιωτικότητα Δεδομένων**: Αποκαλύπτετε δεδομένα χρήστη μόνο με ρητή συγκατάθεση και τα προστατεύετε με κατάλληλους ελέγχους πρόσβασης. Προστατευτείτε έναντι μη εξουσιοδοτημένης μετάδοσης δεδομένων.

3. **Ασφάλεια Εργαλείων**: Απαιτείτε ρητή συγκατάθεση χρήστη πριν την εκκίνηση οποιουδήποτε εργαλείου. Διασφαλίζετε ότι οι χρήστες κατανοούν τη λειτουργικότητα κάθε εργαλείου και εφαρμόζετε ισχυρά όρια ασφάλειας.

4. **Έλεγχος Άδειας Εργαλείων**: Διαμορφώνετε ποια εργαλεία επιτρέπεται να χρησιμοποιεί ένα μοντέλο κατά τη διάρκεια μιας συνεδρίας, διασφαλίζοντας πρόσβαση μόνο σε ρητά εξουσιοδοτημένα εργαλεία.

5. **Αυθεντικοποίηση**: Απαιτείται σωστή αυθεντικοποίηση πριν τη χορήγηση πρόσβασης σε εργαλεία, πόρους ή ευαίσθητες λειτουργίες μέσω API keys, OAuth tokens ή άλλων ασφαλών μεθόδων αυθεντικοποίησης.

6. **Επικύρωση Παραμέτρων**: Εφαρμόζετε επικύρωση για όλες τις κλήσεις εργαλείων ώστε να αποτρέψετε τη μετάδοση κακοσχηματισμένων ή κακόβουλων εισόδων στην υλοποίηση εργαλείων.

7. **Περιορισμός Ρυθμού**: Εφαρμόζετε περιορισμό ρυθμού για την αποτροπή κακής χρήσης και εξασφάλιση δίκαιης χρήσης των πόρων του server.

### Καλύτερες Πρακτικές Υλοποίησης

1. **Διαπραγμάτευση Δυνατοτήτων**: Κατά τη ρύθμιση σύνδεσης, ανταλλάσσετε πληροφορίες για υποστηριζόμενες λειτουργίες, εκδόσεις πρωτοκόλλου, διαθέσιμα εργαλεία και πόρους.

2. **Σχεδιασμός Εργαλείων**: Δημιουργείτε εστιασμένα εργαλεία που κάνουν ένα πράγμα καλά, αντί για μονολιθικά εργαλεία που χειρίζονται πολλαπλές ανησυχίες.

3. **Διαχείριση Σφαλμάτων**: Υλοποιείτε τυποποιημένα μηνύματα και κωδικούς σφαλμάτων για να διευκολύνουν τη διάγνωση, την ομαλή διαχείριση αποτυχιών και την παροχή χρήσιμων ανατροφοδοτήσεων.

4. **Καταγραφή**: Διαμορφώνετε δομημένα logs για έλεγχο, αποσφαλμάτωση και παρακολούθηση αλληλεπιδράσεων πρωτοκόλλου.

5. **Παρακολούθηση Προόδου**: Για λειτουργίες μεγάλης διάρκειας, αναφέρετε ενημερώσεις προόδου για να ενεργοποιήσετε αλληλεπίδραση με ανταπόκριση χρήστη.

6. **Ακύρωση Αιτήσεων**: Επιτρέπετε στους πελάτες να ακυρώνουν αιτήσεις που βρίσκονται σε εξέλιξη και δεν είναι πλέον απαραίτητες ή διαρκούν υπερβολικά.

## Πρόσθετες Αναφορές

Για τις πιο πρόσφατες πληροφορίες σχετικά με τις καλύτερες πρακτικές MCP, ανατρέξτε σε:

- [Τεκμηρίωση MCP](https://modelcontextprotocol.io/)
- [Προδιαγραφή MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Αποθετήριο GitHub](https://github.com/modelcontextprotocol)
- [Καλύτερες Πρακτικές Ασφάλειας](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Κίνδυνοι ασφάλειας και αντιμετώπιση
- [Εργαστήριο Ασφάλειας MCP Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Πρακτική εκπαίδευση ασφάλειας

## Παραδείγματα Πρακτικών Υλοποίησης

### Καλύτερες Πρακτικές Σχεδίασης Εργαλείων

#### 1. Αρχή Μοναδικής Ευθύνης

Κάθε εργαλείο MCP πρέπει να έχει σαφή, εστιασμένο σκοπό. Αντί να δημιουργείτε μονολιθικά εργαλεία που επιχειρούν να χειριστούν πολλαπλές ανησυχίες, αναπτύξτε εξειδικευμένα εργαλεία που διαπρέπουν σε συγκεκριμένες εργασίες.

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

#### 2. Συνεπής Διαχείριση Σφαλμάτων

Υλοποιήστε ισχυρή διαχείριση σφαλμάτων με ενημερωτικά μηνύματα σφαλμάτων και κατάλληλα μηχανισμούς ανάκτησης.

```python
# Παράδειγμα Python με εκτενή διαχείριση σφαλμάτων
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Επικύρωση παραμέτρων
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Επικύρωση ασφαλείας
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Λειτουργία βάσης δεδομένων με χρονικό όριο
                async with timeout(10):  # Χρονικό όριο 10 δευτερολέπτων
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Τα σφάλματα σύνδεσης μπορεί να είναι προσωρινά
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Τα σφάλματα ερωτήματος είναι πιθανώς σφάλματα πελάτη
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Αφήστε τα σφάλματα ειδικά για το εργαλείο να περάσουν
            raise
        except Exception as e:
            # Γενική σύλληψη για απρόβλεπτα σφάλματα
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Υλοποίηση ανίχνευσης SQL injection
        pass
        
    def _log_error(self, message, error):
        # Υλοποίηση καταγραφής σφαλμάτων
        pass
```

#### 3. Επικύρωση Παραμέτρων

Επικυρώνετε πάντα διεξοδικά τις παραμέτρους για να αποτρέψετε κακοσχηματισμένες ή κακόβουλες εισόδους.

```javascript
// Παράδειγμα JavaScript/TypeScript με λεπτομερή επικύρωση παραμέτρων
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
    // 1. Επικύρωση παρουσίας παραμέτρου
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Επικύρωση τύπων παραμέτρων
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Επικύρωση τιμών παραμέτρων
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Επικύρωση παρουσίας περιεχομένου για λειτουργία εγγραφής
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Επικύρωση ασφάλειας διαδρομής
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Υλοποίηση βασισμένη σε επικυρωμένες παραμέτρους
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Υλοποίηση έλεγχου ασφάλειας διαδρομής
    // ...
  }
}
```

### Παραδείγματα Υλοποίησης Ασφάλειας

#### 1. Αυθεντικοποίηση και Αδειοδότηση

```java
// Παράδειγμα Java με έλεγχο ταυτότητας και εξουσιοδότηση
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Εισαγωγή εξαρτήσεων
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
        // 1. Εξαγωγή πλαισίου ελέγχου ταυτότητας
        String authToken = request.getContext().getAuthToken();
        
        // 2. Αυθεντικοποίηση χρήστη
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Έλεγχος εξουσιοδότησης για τη συγκεκριμένη λειτουργία
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Συνέχεια με εξουσιοδοτημένη λειτουργία
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

#### 2. Περιορισμός Ρυθμού

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

## Καλύτερες Πρακτικές Δοκιμών

### 1. Μονάδα Δοκιμής Εργαλείων MCP

Δοκιμάζετε πάντα τα εργαλεία σας απομονωμένα, χρησιμοποιώντας mock εξωτερικών εξαρτήσεων:

```typescript
// Παράδειγμα TypeScript για μονάδα δοκιμής εργαλείου
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Δημιουργία ψεύτικης υπηρεσίας καιρού
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Δημιουργία του εργαλείου με την ψεύτικη εξάρτηση
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Προετοιμασία
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Εκτέλεση
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Επιβεβαίωση
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Προετοιμασία
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Εκτέλεση και Επιβεβαίωση
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Ολοκληρωμένη Δοκιμή

Δοκιμάστε ολόκληρη τη ροή από αιτήματα πελάτη έως απαντήσεις server:

```python
# Παράδειγμα δοκιμής ολοκλήρωσης Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Εκκίνηση ενός διακομιστή δοκιμών
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Δημιουργία πελάτη
        client = McpClient("http://localhost:5000")
        
        # Δοκιμή ανίχνευσης εργαλείων
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Δοκιμή εκτέλεσης εργαλείων
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Επαλήθευση απάντησης
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Καθαρισμός
        await server.stop()
```

## Βελτιστοποίηση Απόδοσης

### 1. Στρατηγικές Cache

Υλοποιήστε κατάλληλη cache για μείωση λανθάνουσας κατάστασης και χρήσης πόρων:

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

#### 2. Ενεση Εξαρτήσεων και Δοκιμασιμότητα

Σχεδιάστε εργαλεία ώστε να λαμβάνουν τις εξαρτήσεις τους μέσω injection κατασκευαστή, κάνοντάς τα δοκιμάσιμα και παραμετροποιήσιμα:

```java
// Παράδειγμα Java με ενέσιμη εξάρτηση
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Εξαρτήσεις που εγχύονται μέσω κατασκευαστή
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Υλοποίηση εργαλείου
    // ...
}
```

#### 3. Συνθετά Εργαλεία

Σχεδιάστε εργαλεία που μπορούν να συντεθούν μαζί για τη δημιουργία πιο σύνθετων ροών εργασίας:

```python
# Παράδειγμα Python που δείχνει συνθέσιμα εργαλεία
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Υλοποίηση...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Αυτό το εργαλείο μπορεί να χρησιμοποιήσει αποτελέσματα από το εργαλείο dataFetch
    async def execute_async(self, request):
        # Υλοποίηση...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Αυτό το εργαλείο μπορεί να χρησιμοποιήσει αποτελέσματα από το εργαλείο dataAnalysis
    async def execute_async(self, request):
        # Υλοποίηση...
        pass

# Αυτά τα εργαλεία μπορούν να χρησιμοποιηθούν ανεξάρτητα ή ως μέρος μιας ροής εργασίας
```

### Καλύτερες Πρακτικές Σχεδίασης Σχήματος

Το σχήμα είναι η σύμβαση μεταξύ μοντέλου και εργαλείου σας. Καλά σχεδιασμένα σχήματα οδηγούν σε καλύτερη χρήση των εργαλείων.

#### 1. Σαφείς Περιγραφές Παραμέτρων

Περιλαμβάνετε πάντα περιγραφικές πληροφορίες για κάθε παράμετρο:

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

#### 2. Περιορισμοί Επικύρωσης

Περιλαμβάνετε περιορισμούς επικύρωσης για αποτροπή μη έγκυρων εισόδων:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Ιδιότητα email με έλεγχο μορφής
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Ιδιότητα ηλικίας με αριθμητικούς περιορισμούς
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Καταγεγραμμένη ιδιότητα
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

#### 3. Συνεπείς Δομές Επιστροφής

Διατηρείτε συνέπεια στις δομές απάντησης για ευκολότερη ερμηνεία από τα μοντέλα:

```python
async def execute_async(self, request):
    try:
        # Επεξεργασία αιτήματος
        results = await self._search_database(request.parameters["query"])
        
        # Να επιστρέφει πάντα μια συνεπή δομή
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

### Διαχείριση Σφαλμάτων

Ισχυρή διαχείριση σφαλμάτων είναι κρίσιμη για την αξιοπιστία των εργαλείων MCP.

#### 1. Ομαλή Διαχείριση Σφαλμάτων

Χειριστείτε τα σφάλματα στα κατάλληλα επίπεδα και παρέχετε ενημερωτικά μηνύματα:

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

#### 2. Δομημένες Απαντήσεις Σφαλμάτων

Επιστρέψτε δομημένες πληροφορίες σφαλμάτων όπου είναι δυνατόν:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Υλοποίηση
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
        
        // Επαναρίψη άλλων εξαιρέσεων ως ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Λογική Επανάληψης

Υλοποιήστε κατάλληλη λογική επανάληψης σε προσωρινές αποτυχίες:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # δευτερόλεπτα
    
    while retry_count < max_retries:
        try:
            # Κλήση εξωτερικού API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Εκθετική αναμονή επανεκκίνησης
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Μη προσωρινό σφάλμα, μη προσπαθήσετε ξανά
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Βελτιστοποίηση Απόδοσης

#### 1. Cache

Υλοποιήστε cache για δαπανηρές λειτουργίες:

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

#### 2. Ασύγχρονη Επεξεργασία

Χρησιμοποιήστε προγραμματιστικά πρότυπα ασύγχρονης εκτέλεσης για λειτουργίες I/O:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Για διεργασίες μεγάλης διάρκειας, επιστρέψτε αμέσως ένα αναγνωριστικό επεξεργασίας
        String processId = UUID.randomUUID().toString();
        
        // Ξεκινήστε την ασύγχρονη επεξεργασία
        CompletableFuture.runAsync(() -> {
            try {
                // Εκτελέστε διεργασία μεγάλης διάρκειας
                documentService.processDocument(documentId);
                
                // Ενημερώστε την κατάσταση (συνήθως θα αποθηκευόταν σε βάση δεδομένων)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Επιστρέψτε άμεση απάντηση με το αναγνωριστικό της διεργασίας
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Εργαλείο ελέγχου κατάστασης συνοδού
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

#### 3. Περιορισμός Πόρων

Υλοποιήστε περιορισμό χρήσης πόρων για αποφυγή υπερφόρτωσης:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Επιτρέπονται 5 αιτήματα ανά δευτερόλεπτο
            bucket_size=10        # Επιτρέπονται εκρήξεις έως 10 αιτήματα
        )
    
    async def execute_async(self, request):
        # Ελέγξτε αν μπορούμε να προχωρήσουμε ή πρέπει να περιμένουμε
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Αν η αναμονή είναι πολύ μεγάλη
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Περιμένετε τον κατάλληλο χρόνο καθυστέρησης
                await asyncio.sleep(delay)
        
        # Καταναλώστε ένα διακριτικό και προχωρήστε με το αίτημα
        self.rate_limiter.consume()
        
        # Κλήση API
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
            
            # Υπολογίστε τον χρόνο μέχρι το επόμενο διαθέσιμο διακριτικό
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Προσθέστε νέα διακριτικά βάσει του περασμένου χρόνου
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Καλύτερες Πρακτικές Ασφάλειας

#### 1. Επικύρωση Εισόδου

Επικυρώνετε πάντα διεξοδικά τις παραμέτρους εισόδου:

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

#### 2. Ελέγχοι Αδειοδότησης

Υλοποιήστε σωστούς ελέγχους αδειοδότησης:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Λήψη πλαισίου χρήστη από το αίτημα
    UserContext user = request.getContext().getUserContext();
    
    // Έλεγχος αν ο χρήστης έχει τα απαιτούμενα δικαιώματα
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Για συγκεκριμένους πόρους, έλεγχος πρόσβασης σε αυτόν τον πόρο
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Προχωρήστε με την εκτέλεση του εργαλείου
    // ...
}
```

#### 3. Διαχείριση Ευαίσθητων Δεδομένων

Χειριστείτε προσεκτικά ευαίσθητα δεδομένα:

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
        
        # Λάβετε δεδομένα χρήστη
        user_data = await self.user_service.get_user_data(user_id)
        
        # Φιλτράρετε ευαίσθητα πεδία εκτός εάν ζητηθούν ρητά ΚΑΙ είναι εξουσιοδοτημένα
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Ελέγξτε το επίπεδο εξουσιοδότησης στο πλαίσιο του αιτήματος
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Δημιουργήστε ένα αντίγραφο για να αποφύγετε την τροποποίηση του πρωτοτύπου
        redacted = user_data.copy()
        
        # Αποκρύψτε συγκεκριμένα ευαίσθητα πεδία
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Αποκρύψτε εμφωλευμένα ευαίσθητα δεδομένα
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Καλύτερες Πρακτικές Δοκιμών για Εργαλεία MCP

Η ολοκληρωμένη δοκιμή εξασφαλίζει ότι τα εργαλεία MCP λειτουργούν σωστά, χειρίζονται ακραίες περιπτώσεις και ενσωματώνονται σωστά με το υπόλοιπο σύστημα.

### Μονάδα Δοκιμής

#### 1. Δοκιμάστε Κάθε Εργαλείο Απομονωμένα

Δημιουργήστε εστιασμένες δοκιμές για τη λειτουργικότητα κάθε εργαλείου:

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

#### 2. Δοκιμή Επικύρωσης Σχήματος

Ελέγξτε ότι τα σχήματα είναι έγκυρα και εφαρμόζουν σωστά περιορισμούς:

```java
@Test
public void testSchemaValidation() {
    // Δημιουργία στιγμιότυπου εργαλείου
    SearchTool searchTool = new SearchTool();
    
    // Λήψη σχήματος
    Object schema = searchTool.getSchema();
    
    // Μετατροπή σχήματος σε JSON για επικύρωση
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Επικύρωση ότι το σχήμα είναι έγκυρο JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Δοκιμή έγκυρων παραμέτρων
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Δοκιμή απουσίας απαιτούμενης παραμέτρου
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Δοκιμή άκυρου τύπου παραμέτρου
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Δοκιμές Διαχείρισης Σφαλμάτων

Δημιουργήστε συγκεκριμένες δοκιμές για καταστάσεις σφάλματος:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Τακτοποίηση
    tool = ApiTool(timeout=0.1)  # Πολύ σύντομο χρονικό όριο
    
    # Μίμηση ενός αιτήματος που θα λήξει ο χρόνος του
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Πιο μεγάλο από το χρονικό όριο
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Εκτέλεση & Επιβεβαίωση
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Επαλήθευση μηνύματος εξαίρεσης
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Τακτοποίηση
    tool = ApiTool()
    
    # Μίμηση απάντησης με περιορισμό ρυθμού
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
        
        # Εκτέλεση & Επιβεβαίωση
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Επαλήθευση ότι η εξαίρεση περιέχει πληροφορίες για το όριο ρυθμού
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Ολοκληρωμένη Δοκιμή

#### 1. Δοκιμή Αλυσιδωτής Λειτουργίας Εργαλείων

Δοκιμάστε εργαλεία που λειτουργούν μαζί σε αναμενόμενους συνδυασμούς:

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

#### 2. Δοκιμή MCP Server

Δοκιμάστε το MCP server με πλήρη εγγραφή και εκτέλεση εργαλείων:

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
        // Δοκιμάστε το endpoint ανακάλυψης
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Δημιουργία αιτήματος εργαλείου
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Αποστολή αιτήματος και επαλήθευση απόκρισης
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Δημιουργία μη έγκυρου αιτήματος εργαλείου
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Λείπει η παράμετρος "b"
        request.put("parameters", parameters);
        
        // Αποστολή αιτήματος και επαλήθευση απόκρισης σφάλματος
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Ολική Δοκιμή

Δοκιμάστε ολοκληρωμένες ροές εργασίας από προτροπή μοντέλου έως εκτέλεση εργαλείου:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Τακτοποίηση - Ρύθμιση του πελάτη MCP και του υποδειγματικού μοντέλου
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Απεικόνιση απαντήσεων μοντέλου
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
    
    # Απεικόνιση απάντησης εργαλείου καιρού
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
        
        # Εκτέλεση
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Επιβεβαίωση
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Δοκιμή Απόδοσης

#### 1. Δοκιμή Φορτίου

Δοκιμάστε πόσα ταυτόχρονα αιτήματα μπορεί να διαχειριστεί ο MCP server σας:

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

#### 2. Δοκιμή Αντοχής

Δοκιμάστε το σύστημα υπό ακραίο φορτίο:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Ρυθμίστε το JMeter για δοκιμές φόρτου
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Διαμορφώστε το σχέδιο δοκιμής του JMeter
    HashTree testPlanTree = new HashTree();
    
    // Δημιουργήστε σχέδιο δοκιμής, ομάδα νημάτων, δειγματολήπτες κ.λπ.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Προσθέστε HTTP δειγματολήπτη για εκτέλεση εργαλείου
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Προσθέστε ακροατές
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Εκτελέστε τη δοκιμή
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Επαληθεύστε τα αποτελέσματα
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Μέσος χρόνος απόκρισης < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90ο εκατοστημόριο < 500ms
}
```

#### 3. Παρακολούθηση και Ανάλυση

Ρυθμίστε παρακολούθηση για μακροχρόνια ανάλυση απόδοσης:

```python
# Ρυθμίστε την παρακολούθηση για έναν διακομιστή MCP
def configure_monitoring(server):
    # Ρυθμίστε μετρικές Prometheus
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
    
    # Προσθέστε ενδιάμεσο λογισμικό για χρονισμό και καταγραφή μετρικών
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Αποκαλύψτε το σημείο τερματισμού μετρικών
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Πρότυπα Σχεδίασης Ροών Εργασίας MCP

Οι καλά σχεδιασμένες ροές εργασίας MCP βελτιώνουν αποδοτικότητα, αξιοπιστία και διαχειρισιμότητα. Ακολουθούν βασικά πρότυπα:

### 1. Πρότυπο Αλυσιδωτής Ροής Εργαλείων

Συνδέστε πολλαπλά εργαλεία σε ακολουθία όπου η έξοδος κάθε εργαλείου γίνεται είσοδος για το επόμενο:

```python
# Υλοποίηση αλυσίδας εργαλείων Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Λίστα με ονόματα εργαλείων προς εκτέλεση κατά σειρά
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Εκτέλεση κάθε εργαλείου στην αλυσίδα, μεταβιβάζοντας το προηγούμενο αποτέλεσμα
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Αποθήκευση αποτελέσματος και χρήση ως είσοδος για το επόμενο εργαλείο
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Παράδειγμα χρήσης
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

### 2. Πρότυπο Dispatcher

Χρησιμοποιήστε ένα κεντρικό εργαλείο που διανέμει σε εξειδικευμένα εργαλεία βάσει εισόδου:

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

### 3. Πρότυπο Παράλληλης Επεξεργασίας

Εκτελέστε πολλαπλά εργαλεία ταυτόχρονα για αποδοτικότητα:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Βήμα 1: Ανάκτηση μεταδεδομένων συνόλου δεδομένων (σύγχρονο)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Βήμα 2: Εκκίνηση πολλαπλών αναλύσεων παράλληλα
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
        
        // Αναμονή για την ολοκλήρωση όλων των παράλληλων εργασιών
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Αναμονή για ολοκλήρωση
        
        // Βήμα 3: Συνδυασμός αποτελεσμάτων
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Βήμα 4: Δημιουργία συνοπτικής αναφοράς
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Επιστροφή του πλήρους αποτελέσματος της ροής εργασίας
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Πρότυπο Ανάκτησης από Σφάλματα

Υλοποιήστε ομαλές εναλλακτικές λύσεις σε αποτυχίες εργαλείων:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Δοκιμάστε πρώτα το κύριο εργαλείο
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Καταγράψτε την αποτυχία
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Επιστροφή στο εφεδρικό εργαλείο
            try:
                # Ίσως χρειαστεί να μετασχηματίσετε τις παραμέτρους για το εφεδρικό εργαλείο
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Και τα δύο εργαλεία απέτυχαν
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Αυτή η υλοποίηση θα εξαρτηθεί από τα συγκεκριμένα εργαλεία
        # Για αυτό το παράδειγμα, θα επιστρέψουμε απλώς τις αρχικές παραμέτρους
        return params

# Παράδειγμα χρήσης
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # Κύριο (επί πληρωμή) API καιρού
        "basicWeatherService",    # Εφεδρικό (δωρεάν) API καιρού
        {"location": location}
    )
```

### 5. Πρότυπο Σύνθεσης Ροών Εργασίας

Δημιουργήστε σύνθετες ροές εργασίας συνθέτοντας απλούστερες:

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

# Δοκιμή MCP Servers: Καλύτερες Πρακτικές και Κορυφαίες Συμβουλές

## Επισκόπηση

Η δοκιμή αποτελεί κρίσιμο στοιχείο για την ανάπτυξη αξιόπιστων, υψηλής ποιότητας MCP servers. Αυτός ο οδηγός παρέχει ολοκληρωμένες καλύτερες πρακτικές και συμβουλές για τη δοκιμή των MCP servers σας καθ' όλη τη διάρκεια ανάπτυξης, από δοκιμές μονάδας έως ολοκληρωμένες και end-to-end επικυρώσεις.

## Γιατί η Δοκιμή είναι Σημαντική για τους MCP Servers

Οι MCP servers λειτουργούν ως ουσιαστικό ενδιάμεσο λογισμικό μεταξύ μοντέλων AI και πελατειακών εφαρμογών. Η διεξοδική δοκιμή εξασφαλίζει:

- Αξιοπιστία σε παραγωγικά περιβάλλοντα
- Ακριβή διαχείριση αιτήσεων και απαντήσεων
- Σωστή υλοποίηση προδιαγραφών MCP
- Ανθεκτικότητα σε αποτυχίες και ακραίες περιπτώσεις
- Συνεπή απόδοση υπό διάφορα φορτία

## Δοκιμή Μονάδας για MCP Servers

### Δοκιμή Μονάδας (Βάση)

Οι δοκιμές μονάδας επαληθεύουν τα επιμέρους στοιχεία του MCP server σας απομονωμένα.

#### Τι να Δοκιμάσετε

1. **Διαχειριστές Πόρων**: Δοκιμάστε ανεξάρτητα τη λογική κάθε διαχειριστή πόρου  
2. **Υλοποιήσεις Εργαλείων**: Επαληθεύστε τη συμπεριφορά των εργαλείων με διάφορες εισόδους  
3. **Πρότυπα Προτροπών**: Βεβαιωθείτε ότι τα πρότυπα προτροπών αποδίδονται σωστά  
4. **Επικύρωση Σχήματος**: Δοκιμάστε τη λογική επικύρωσης παραμέτρων  
5. **Διαχείριση Σφαλμάτων**: Επαληθεύστε τις απαντήσεις σφαλμάτων για μη έγκυρες εισόδους

#### Καλύτερες Πρακτικές για Δοκιμές Μονάδας

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
# Παράδειγμα δοκιμής μονάδας για ένα εργαλείο αριθμομηχανής σε Python
def test_calculator_tool_add():
    # Διάταξη
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Εκτέλεση
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Επιβεβαίωση
    assert result["value"] == 12
```

### Ολοκληρωμένη Δοκιμή (Μεσαίο Επίπεδο)

Οι ολοκληρωμένες δοκιμές επαληθεύουν τις αλληλεπιδράσεις μεταξύ των στοιχείων του MCP server σας.

#### Τι να Δοκιμάσετε

1. **Εκκίνηση Server**: Δοκιμάστε την εκκίνηση του server με διάφορες ρυθμίσεις  
2. **Εγγραφή Διαδρομών**: Επαληθεύστε ότι όλα τα endpoints είναι σωστά καταχωρημένα  
3. **Διαχείριση Αιτήσεων**: Δοκιμάστε πλήρη κύκλο αίτησης-απάντησης  
4. **Διασπορά Σφαλμάτων**: Βεβαιωθείτε ότι τα σφάλματα διαχειρίζονται σωστά σε όλα τα στοιχεία  
5. **Αυθεντικοποίηση & Αδειοδότηση**: Δοκιμάστε μηχανισμούς ασφαλείας

#### Καλύτερες Πρακτικές για Ολοκληρωμένη Δοκιμή

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

### Δοκιμή End-to-End (Ανώτερο Επίπεδο)

Οι δοκιμές end-to-end επαληθεύουν τη συμπεριφορά ολόκληρου του συστήματος από πελάτη έως server.

#### Τι να Δοκιμάσετε

1. **Επικοινωνία Πελάτη-Server**: Δοκιμάστε πλήρεις κύκλους αίτησης-απάντησης  
2. **Πραγματικά SDK Πελάτη**: Δοκιμάστε με πραγματικές υλοποιήσεις πελατών  
3. **Απόδοση Υπό Φόρτο**: Επαληθεύστε τη συμπεριφορά με πολλαπλές ταυτόχρονες αιτήσεις  
4. **Ανάκτηση από Σφάλματα**: Δοκιμάστε την ανάκτηση του συστήματος από αποτυχίες  
5. **Λειτουργίες Μεγάλης Διάρκειας**: Επαληθεύστε τη διαχείριση streaming και μακροχρόνιων λειτουργιών

#### Καλύτερες Πρακτικές για Δοκιμή E2E

```typescript
// Παράδειγμα E2E δοκιμής με έναν πελάτη σε TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Εκκίνηση διακομιστή σε περιβάλλον δοκιμής
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Εκτέλεση
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Επιβεβαίωση
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Στρατηγικές Mocking για Δοκιμές MCP

Το mocking είναι απαραίτητο για την απομόνωση στοιχείων κατά τη δοκιμή.

### Συστατικά που θα Mockάρετε

1. **Εξωτερικά Μοντέλα AI**: Mock απαντήσεις μοντέλων για προβλέψιμη δοκιμή  
2. **Εξωτερικές Υπηρεσίες**: Mock API εξαρτήσεις (βάσεις δεδομένων, υπηρεσίες τρίτων)  
3. **Υπηρεσίες Αυθεντικοποίησης**: Mock παρόχους ταυτοποίησης  
4. **Πάροχοι Πόρων**: Mock δαπανηρούς διαχειριστές πόρων

### Παράδειγμα: Mock απάντησης μοντέλου AI

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
# Παράδειγμα Python με unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Διαμόρφωση mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Χρήση mock στη δοκιμή
    server = McpServer(model_client=mock_model)
    # Συνεχίστε με τη δοκιμή
```

## Δοκιμή Απόδοσης

Η δοκιμή απόδοσης είναι καθοριστική για παραγωγικούς MCP servers.

### Τι να Μετρήσετε

1. **Καθυστέρηση**: Χρόνος απόκρισης στα αιτήματα  
2. **Διαμεταγωγή**: Αιτήματα που διαχειρίζονται ανά δευτερόλεπτο  
3. **Χρήση Πόρων**: Χρήση CPU, μνήμης, δικτύου  
4. **Διαχείριση Συγχρονισμού**: Συμπεριφορά σε παράλληλα αιτήματα  
5. **Χαρακτηριστικά Κλιμάκωσης**: Απόδοση με αύξηση φορτίου

### Εργαλεία για Δοκιμή Απόδοσης

- **k6**: Εργαλείο φόρτωσης ανοιχτού κώδικα  
- **JMeter**: Ολοκληρωμένη δοκιμή απόδοσης  
- **Locust**: Δοκιμή φόρτωσης βασισμένη σε Python  
- **Azure Load Testing**: Δοκιμή απόδοσης στο cloud

### Παράδειγμα: Βασική Δοκιμή Φόρτου με k6

```javascript
// σενάριο k6 για δοκιμή φόρτου διακομιστή MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 εικονικοί χρήστες
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

## Αυτοματοποίηση Δοκιμών για MCP Servers

Η αυτοματοποίηση των δοκιμών εξασφαλίζει συνεπή ποιότητα και γρηγορότερους κύκλους ανατροφοδότησης.

### Ενσωμάτωση CI/CD
1. **Εκτέλεση Μονάδων Ελέγχου σε Αιτήματα Pull**: Εξασφαλίστε ότι οι αλλαγές κώδικα δεν διακόπτουν την υπάρχουσα λειτουργικότητα  
2. **Δοκιμές Ενσωμάτωσης σε Στάδιο Δοκιμών**: Εκτελέστε δοκιμές ενσωμάτωσης σε προπαραγωγικά περιβάλλοντα  
3. **Βάσεις Απόδοσης**: Διατηρήστε σημεία αναφοράς απόδοσης για την ανίχνευση υποβιβασμών  
4. **Έλεγχοι Ασφαλείας**: Αυτοματοποιήστε τους ελέγχους ασφαλείας ως μέρος της ροής εργασίας  

### Παράδειγμα CI Pipeline (GitHub Actions)

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
  
## Έλεγχος Συμμόρφωσης με τις Προδιαγραφές MCP

Επαληθεύστε ότι ο διακομιστής σας υλοποιεί σωστά τις προδιαγραφές MCP.

### Σημαντικοί Τομείς Συμμόρφωσης

1. **Σημεία Άκρου API**: Δοκιμάστε τα απαιτούμενα σημεία άκρου (/resources, /tools, κτλ.)  
2. **Μορφή Αιτήματος/Απάντησης**: Επαληθεύστε τη συμμόρφωση με το σχήμα  
3. **Κωδικοί Σφάλματος**: Βεβαιωθείτε για σωστούς κωδικούς κατάστασης για διάφορα σενάρια  
4. **Τύποι Περιεχομένου**: Δοκιμάστε τη διαχείριση διαφορετικών τύπων περιεχομένου  
5. **Ροή Ταυτοποίησης**: Επαληθεύστε μηχανισμούς ταυτοποίησης σύμφωνα με τις προδιαγραφές  

### Σύνολο Δοκιμών Συμμόρφωσης

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
  
## Top 10 Συμβουλές για Αποτελεσματικό Έλεγχο Διακομιστών MCP  

1. **Δοκιμάστε Ξεχωριστά τους Ορισμούς Εργαλείων**: Επαληθεύστε τους ορισμούς σχήματος ξεχωριστά από τη λογική εργαλείων  
2. **Χρησιμοποιήστε Παραμετροποιημένες Δοκιμές**: Ελέγξτε τα εργαλεία με ποικιλία εισόδων, συμπεριλαμβανομένων ακραίων περιπτώσεων  
3. **Ελέγξτε τις Απαντήσεις Σφάλματος**: Βεβαιωθείτε για σωστή διαχείριση σφαλμάτων για όλες τις πιθανές καταστάσεις  
4. **Δοκιμάστε τη Λογική Εξουσιοδότησης**: Εξασφαλίστε σωστό έλεγχο πρόσβασης για διαφορετικούς ρόλους χρηστών  
5. **Παρακολουθήστε την Κάλυψη των Δοκιμών**: Στοχεύστε σε υψηλή κάλυψη για κώδικα κρίσιμης διαδρομής  
6. **Δοκιμάστε Ροές Streaming**: Επαληθεύστε σωστή διαχείριση περιεχομένου συνεχούς ροής  
7. **Προσομοιώστε Προβλήματα Δικτύου**: Δοκιμάστε τη συμπεριφορά υπό κακές συνθήκες δικτύου  
8. **Δοκιμάστε Όρια Πόρων**: Επαληθεύστε τη συμπεριφορά όταν επιτυγχάνονται όρια ή ποσοστώσεις  
9. **Αυτοματοποιήστε Δοκιμές Υποβιβασμού**: Δημιουργήστε σύνολο που εκτελείται σε κάθε αλλαγή κώδικα  
10. **Τεκμηριώστε τις Περιπτώσεις Δοκιμής**: Διατηρήστε ξεκάθαρη τεκμηρίωση σεναρίων δοκιμών  

## Συνήθη Σφάλματα στον Έλεγχο

- **Υπερβολική εξάρτηση από δοκιμές ομαλής διαδρομής**: Φροντίστε να ελέγχετε τα σφάλματα διεξοδικά  
- **Αγνόηση των δοκιμών απόδοσης**: Εντοπίστε σημεία συμφόρησης πριν επηρεάσουν την παραγωγή  
- **Δοκιμές μόνο σε απομόνωση**: Συνδυάστε μονάδες, ενσωμάτωση και end-to-end δοκιμές  
- **Ανεπαρκής κάλυψη API**: Εξασφαλίστε ότι όλα τα σημεία άκρου και οι λειτουργίες ελέγχονται  
- **Ασυνεπή περιβάλλοντα δοκιμής**: Χρησιμοποιήστε κοντέινερ για συνεπή περιβάλλοντα δοκιμών  

## Συμπέρασμα

Μια ολοκληρωμένη στρατηγική δοκιμών είναι απαραίτητη για την ανάπτυξη αξιόπιστων, ποιοτικών διακομιστών MCP. Εφαρμόζοντας τις βέλτιστες πρακτικές και συμβουλές που περιγράφονται σε αυτόν τον οδηγό, μπορείτε να εξασφαλίσετε ότι οι υλοποιήσεις MCP σας πληρούν τα υψηλότερα πρότυπα ποιότητας, αξιοπιστίας και απόδοσης.  

## Βασικά Σημεία

1. **Σχεδιασμός Εργαλείων**: Ακολουθήστε την αρχή της μίας ευθύνης, χρησιμοποιήστε ένεση εξαρτήσεων και σχεδιάστε για συνθετότητα  
2. **Σχεδιασμός Σχήματος**: Δημιουργήστε σαφή, καλά τεκμηριωμένα σχήματα με κατάλληλους περιορισμούς επικύρωσης  
3. **Διαχείριση Σφαλμάτων**: Υλοποιήστε ομαλή διαχείριση σφαλμάτων, δομημένες απαντήσεις σφαλμάτων και λογική επανάληψης  
4. **Απόδοση**: Χρησιμοποιήστε caching, ασύγχρονη επεξεργασία και ρυθμιστική διαχείριση πόρων  
5. **Ασφάλεια**: Εφαρμόστε εκτενή επικύρωση εισόδου, ελέγχους εξουσιοδότησης και διαχείριση ευαίσθητων δεδομένων  
6. **Δοκιμές**: Δημιουργήστε ολοκληρωμένες μονάδες, ενσωμάτωσης και end-to-end δοκιμές  
7. **Πρότυπα Ροής Εργασιών**: Εφαρμόστε καθιερωμένα πρότυπα όπως αλυσίδες, δρομολογητές και παράλληλη επεξεργασία  

## Άσκηση

Σχεδιάστε ένα εργαλείο MCP και ροή εργασίας για ένα σύστημα επεξεργασίας εγγράφων που:

1. Δέχεται έγγραφα σε πολλαπλές μορφές (PDF, DOCX, TXT)  
2. Εξάγει κείμενο και βασικές πληροφορίες από τα έγγραφα  
3. Ταξινομεί τα έγγραφα κατά τύπο και περιεχόμενο  
4. Δημιουργεί περίληψη για κάθε έγγραφο  

Υλοποιήστε τα σχήματα εργαλείων, τη διαχείριση σφαλμάτων και ένα πρότυπο ροής εργασίας που ταιριάζει καλύτερα σε αυτό το σενάριο. Σκεφτείτε πώς θα δοκιμάζατε αυτή την υλοποίηση.  

## Πόροι

1. Ενταχθείτε στην κοινότητα MCP στο [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) για να μένετε ενημερωμένοι για τις τελευταίες εξελίξεις  
2. Συνεισφέρετε σε ανοιχτού κώδικα [MCP projects](https://github.com/modelcontextprotocol)  
3. Εφαρμόστε τις αρχές MCP στις πρωτοβουλίες AI της δικής σας οργάνωσης  
4. Εξερευνήστε εξειδικευμένες υλοποιήσεις MCP για τον κλάδο σας.  
5. Σκεφτείτε να παρακολουθήσετε εξελιγμένα μαθήματα σε συγκεκριμένα θέματα MCP, όπως πολυτροπική ενσωμάτωση ή ενσωμάτωση επιχειρησιακών εφαρμογών.  
6. Πειραματιστείτε με τη δημιουργία των δικών σας εργαλείων και ροών MCP χρησιμοποιώντας τις αρχές που μάθατε μέσω του [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Τι Ακολουθεί

Επόμενο: [Case Studies](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης μέσω τεχνητής νοημοσύνης [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ καταβάλλουμε κάθε προσπάθεια για ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις μπορεί να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη γλώσσα του θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρωπογενής μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->