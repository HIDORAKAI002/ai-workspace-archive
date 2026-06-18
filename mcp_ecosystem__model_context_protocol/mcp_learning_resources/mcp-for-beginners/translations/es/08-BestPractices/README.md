# Mejores Prácticas para el Desarrollo de MCP

[![Mejores Prácticas para el Desarrollo de MCP](../../../translated_images/es/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Haz clic en la imagen de arriba para ver el video de esta lección)_

## Visión general

Esta lección se enfoca en las mejores prácticas avanzadas para desarrollar, probar y desplegar servidores y funciones MCP en entornos de producción. A medida que los ecosistemas MCP crecen en complejidad e importancia, seguir patrones establecidos garantiza confiabilidad, mantenibilidad e interoperabilidad. Esta lección consolida la sabiduría práctica adquirida de implementaciones reales de MCP para guiarte en la creación de servidores robustos y eficientes con recursos, indicaciones y herramientas efectivas.

## Objetivos de aprendizaje

Al final de esta lección, podrás:

- Aplicar las mejores prácticas de la industria en el diseño de servidores y funciones MCP
- Crear estrategias de prueba completas para servidores MCP
- Diseñar patrones de flujo de trabajo eficientes y reutilizables para aplicaciones MCP complejas
- Implementar manejo adecuado de errores, registro y observabilidad en servidores MCP
- Optimizar implementaciones MCP para rendimiento, seguridad y mantenibilidad

## Principios Básicos de MCP

Antes de profundizar en prácticas específicas de implementación, es importante comprender los principios básicos que guían el desarrollo efectivo de MCP:

1. **Comunicación Estandarizada**: MCP utiliza JSON-RPC 2.0 como base, proporcionando un formato consistente para solicitudes, respuestas y manejo de errores en todas las implementaciones.

2. **Diseño Centrado en el Usuario**: Siempre prioriza el consentimiento, control y transparencia del usuario en tus implementaciones MCP.

3. **Seguridad Primero**: Implementa medidas de seguridad robustas que incluyan autenticación, autorización, validación y limitación de tasa.

4. **Arquitectura Modular**: Diseña tus servidores MCP con un enfoque modular, donde cada herramienta y recurso tenga un propósito claro y enfocado.

5. **Conexiones Stateful**: Aprovecha la capacidad de MCP para mantener estado a través de múltiples solicitudes para interacciones más coherentes y conscientes del contexto.

## Mejores Prácticas Oficiales de MCP

Las siguientes mejores prácticas se derivan de la documentación oficial del Protocolo de Contexto de Modelo:

### Mejores Prácticas de Seguridad

1. **Consentimiento y Control de Usuario**: Siempre requiere consentimiento explícito del usuario antes de acceder a datos o realizar operaciones. Proporciona control claro sobre qué datos se comparten y qué acciones están autorizadas.

2. **Privacidad de Datos**: Exponer datos del usuario solo con consentimiento explícito y protegerlos con controles de acceso apropiados. Salvaguarda contra la transmisión no autorizada de datos.

3. **Seguridad en Herramientas**: Requiere consentimiento explícito del usuario antes de invocar cualquier herramienta. Asegura que los usuarios entiendan la funcionalidad de cada herramienta y aplica límites de seguridad robustos.

4. **Control de Permisos de Herramientas**: Configura qué herramientas puede usar un modelo durante una sesión, asegurando que solo las herramientas explícitamente autorizadas sean accesibles.

5. **Autenticación**: Requiere autenticación adecuada antes de otorgar acceso a herramientas, recursos u operaciones sensibles mediante claves API, tokens OAuth u otros métodos seguros.

6. **Validación de Parámetros**: Aplica validación para todas las invocaciones de herramientas para impedir que entradas mal formadas o maliciosas lleguen a las implementaciones.

7. **Limitación de Tasa**: Implementa limitación de tasa para prevenir abusos y asegurar uso justo de los recursos del servidor.

### Mejores Prácticas de Implementación

1. **Negociación de Capacidades**: Durante la configuración de la conexión, intercambia información sobre características soportadas, versiones del protocolo, herramientas y recursos disponibles.

2. **Diseño de Herramientas**: Crea herramientas enfocadas que hagan bien una tarea, en lugar de herramientas monolíticas que manejan múltiples preocupaciones.

3. **Manejo de Errores**: Implementa mensajes de error y códigos estandarizados para ayudar a diagnosticar problemas, manejar fallos con gracia y proporcionar retroalimentación accionable.

4. **Registro (Logging)**: Configura logs estructurados para auditoría, depuración y monitoreo de las interacciones del protocolo.

5. **Seguimiento de Progreso**: Para operaciones de larga duración, informa actualizaciones de progreso para habilitar interfaces de usuario responsivas.

6. **Cancelación de Solicitudes**: Permite a los clientes cancelar solicitudes en curso que ya no sean necesarias o que tomen demasiado tiempo.

## Referencias Adicionales

Para la información más actualizada sobre mejores prácticas MCP, consulta:

- [Documentación MCP](https://modelcontextprotocol.io/)
- [Especificación MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositorio GitHub](https://github.com/modelcontextprotocol)
- [Mejores Prácticas de Seguridad](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riesgos de seguridad y mitigaciones
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Entrenamiento práctico en seguridad

## Ejemplos Prácticos de Implementación

### Mejores Prácticas en Diseño de Herramientas

#### 1. Principio de Responsabilidad Única

Cada herramienta MCP debe tener un propósito claro y enfocado. En lugar de crear herramientas monolíticas que intenten manejar múltiples preocupaciones, desarrolla herramientas especializadas que destaquen en tareas específicas.

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

#### 2. Manejo Consistente de Errores

Implementa manejo robusto de errores con mensajes informativos y mecanismos de recuperación apropiados.

```python
# Ejemplo de Python con manejo de errores completo
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Validación de parámetros
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Validación de seguridad
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Operación de base de datos con tiempo de espera
                async with timeout(10):  # Tiempo de espera de 10 segundos
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Los errores de conexión podrían ser transitorios
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Los errores de consulta probablemente son errores del cliente
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Dejar pasar los errores específicos de la herramienta
            raise
        except Exception as e:
            # Captura general para errores inesperados
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implementación de detección de inyección SQL
        pass
        
    def _log_error(self, message, error):
        # Implementación de registro de errores
        pass
```

#### 3. Validación de Parámetros

Valida siempre los parámetros exhaustivamente para prevenir entradas mal formadas o maliciosas.

```javascript
// Ejemplo de JavaScript/TypeScript con validación detallada de parámetros
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
    // 1. Validar la presencia del parámetro
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Validar los tipos de los parámetros
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Validar los valores de los parámetros
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Validar la presencia de contenido para la operación de escritura
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Validación de seguridad de la ruta
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implementación basada en parámetros validados
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implementación de la verificación de seguridad de la ruta
    // ...
  }
}
```

### Ejemplos de Implementación de Seguridad

#### 1. Autenticación y Autorización

```java
// Ejemplo de Java con autenticación y autorización
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Inyección de dependencias
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
        // 1. Extraer contexto de autenticación
        String authToken = request.getContext().getAuthToken();
        
        // 2. Autenticar usuario
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Verificar autorización para la operación específica
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Proceder con la operación autorizada
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

#### 2. Limitación de Tasa

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

## Mejores Prácticas de Pruebas

### 1. Pruebas Unitarias de Herramientas MCP

Siempre prueba tus herramientas en aislamiento, simulando dependencias externas:

```typescript
// Ejemplo en TypeScript de una prueba unitaria de una herramienta
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Crear un servicio meteorológico simulado
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Crear la herramienta con la dependencia simulada
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Preparar
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Ejecutar
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Afirmar
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Preparar
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Ejecutar y afirmar
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Pruebas de Integración

Prueba el flujo completo desde las solicitudes del cliente hasta las respuestas del servidor:

```python
# Ejemplo de prueba de integración en Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Iniciar un servidor de prueba
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Crear un cliente
        client = McpClient("http://localhost:5000")
        
        # Probar el descubrimiento de herramientas
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Probar la ejecución de herramientas
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Verificar la respuesta
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Limpiar resultados
        await server.stop()
```

## Optimización de Rendimiento

### 1. Estrategias de Caché

Implementa caché apropiada para reducir latencia y uso de recursos:

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

#### 2. Inyección de Dependencias y Testabilidad

Diseña herramientas para recibir sus dependencias mediante inyección por constructor, haciéndolas testeables y configurables:

```java
// Ejemplo en Java con inyección de dependencias
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Dependencias inyectadas a través del constructor
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implementación de la herramienta
    // ...
}
```

#### 3. Herramientas Componibles

Diseña herramientas que puedan combinarse para crear flujos de trabajo más complejos:

```python
# Ejemplo de Python que muestra herramientas componibles
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implementación...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Esta herramienta puede usar resultados de la herramienta dataFetch
    async def execute_async(self, request):
        # Implementación...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Esta herramienta puede usar resultados de la herramienta dataAnalysis
    async def execute_async(self, request):
        # Implementación...
        pass

# Estas herramientas pueden usarse de forma independiente o como parte de un flujo de trabajo
```

### Mejores Prácticas en Diseño de Esquemas

El esquema es el contrato entre el modelo y tu herramienta. Los esquemas bien diseñados conducen a mejor usabilidad de la herramienta.

#### 1. Descripciones Claras de Parámetros

Incluye siempre información descriptiva para cada parámetro:

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

#### 2. Restricciones de Validación

Incluye restricciones de validación para evitar entradas inválidas:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Propiedad de correo electrónico con validación de formato
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Propiedad de edad con restricciones numéricas
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Propiedad enumerada
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

#### 3. Estructuras de Retorno Consistentes

Mantén la consistencia en las estructuras de respuesta para facilitar la interpretación de resultados por parte de los modelos:

```python
async def execute_async(self, request):
    try:
        # Procesar solicitud
        results = await self._search_database(request.parameters["query"])
        
        # Siempre devolver una estructura consistente
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

### Manejo de Errores

El manejo robusto de errores es crucial para que las herramientas MCP mantengan confiabilidad.

#### 1. Manejo de Errores con Gracia

Maneja los errores en niveles apropiados y proporciona mensajes informativos:

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

#### 2. Respuestas de Error Estructuradas

Retorna información de error estructurada cuando sea posible:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Implementación
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
        
        // Relanzar otras excepciones como ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Lógica de Reintento

Implementa lógica adecuada de reintentos para fallos transitorios:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # segundos
    
    while retry_count < max_retries:
        try:
            # Llamar a la API externa
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Retroceso exponencial
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Error no transitorio, no reintentar
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Optimización de Rendimiento

#### 1. Caché

Implementa caché para operaciones costosas:

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

#### 2. Procesamiento Asíncrono

Usa patrones de programación asíncrona para operaciones de E/S:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Para operaciones de larga duración, devolver un ID de procesamiento inmediatamente
        String processId = UUID.randomUUID().toString();
        
        // Iniciar procesamiento asíncrono
        CompletableFuture.runAsync(() -> {
            try {
                // Realizar operación de larga duración
                documentService.processDocument(documentId);
                
                // Actualizar estado (típicamente se almacenaría en una base de datos)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Devolver respuesta inmediata con ID de proceso
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Herramienta complementaria para verificar estado
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

#### 3. Limitación de Recursos

Implementa limitación de recursos para prevenir sobrecarga:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Permitir 5 solicitudes por segundo
            bucket_size=10        # Permitir ráfagas de hasta 10 solicitudes
        )
    
    async def execute_async(self, request):
        # Comprobar si podemos proceder o necesitamos esperar
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Si la espera es demasiado larga
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Esperar el tiempo de retraso apropiado
                await asyncio.sleep(delay)
        
        # Consumir un token y proceder con la solicitud
        self.rate_limiter.consume()
        
        # Llamar a la API
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
            
            # Calcular el tiempo hasta que el siguiente token esté disponible
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Añadir nuevos tokens según el tiempo transcurrido
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Mejores Prácticas de Seguridad

#### 1. Validación de Entrada

Valida siempre los parámetros de entrada de forma exhaustiva:

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

#### 2. Comprobaciones de Autorización

Implementa comprobaciones correctas de autorización:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Obtener el contexto del usuario de la solicitud
    UserContext user = request.getContext().getUserContext();
    
    // Verificar si el usuario tiene los permisos requeridos
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Para recursos específicos, verificar el acceso a ese recurso
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Proceder con la ejecución de la herramienta
    // ...
}
```

#### 3. Manejo de Datos Sensibles

Maneja los datos sensibles con cuidado:

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
        
        # Obtener datos del usuario
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtrar campos sensibles a menos que se solicite explícitamente Y esté autorizado
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Verificar el nivel de autorización en el contexto de la solicitud
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Crear una copia para evitar modificar el original
        redacted = user_data.copy()
        
        # Redactar campos sensibles específicos
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Redactar datos sensibles anidados
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Mejores Prácticas de Pruebas para Herramientas MCP

Las pruebas exhaustivas garantizan que las herramientas MCP funcionen correctamente, manejen casos límite e integren adecuadamente con el resto del sistema.

### Pruebas Unitarias

#### 1. Prueba Cada Herramienta en Aislamiento

Crea pruebas enfocadas para la funcionalidad de cada herramienta:

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

#### 2. Pruebas de Validación de Esquemas

Prueba que los esquemas sean válidos y apliquen correctamente las restricciones:

```java
@Test
public void testSchemaValidation() {
    // Crear instancia de la herramienta
    SearchTool searchTool = new SearchTool();
    
    // Obtener esquema
    Object schema = searchTool.getSchema();
    
    // Convertir esquema a JSON para validación
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Validar que el esquema sea un JSONSchema válido
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Probar parámetros válidos
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Probar parámetro requerido faltante
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Probar tipo de parámetro inválido
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Pruebas de Manejo de Errores

Crea pruebas específicas para condiciones de error:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Organizar
    tool = ApiTool(timeout=0.1)  # Tiempo de espera muy corto
    
    # Simular una solicitud que expirará
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Más largo que el tiempo de espera
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Actuar y afirmar
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verificar el mensaje de la excepción
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Organizar
    tool = ApiTool()
    
    # Simular una respuesta con límite de tasa
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
        
        # Actuar y afirmar
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Verificar que la excepción contiene información del límite de tasa
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Pruebas de Integración

#### 1. Pruebas de Cadena de Herramientas

Prueba herramientas trabajando juntas en combinaciones esperadas:

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

#### 2. Pruebas del Servidor MCP

Prueba el servidor MCP con registro y ejecución completa de herramientas:

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
        // Probar el endpoint de descubrimiento
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Crear solicitud de herramienta
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Enviar solicitud y verificar respuesta
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Crear solicitud de herramienta no válida
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Falta el parámetro "b"
        request.put("parameters", parameters);
        
        // Enviar solicitud y verificar respuesta de error
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Pruebas de Extremo a Extremo

Prueba flujos completos desde la indicación del modelo hasta la ejecución de la herramienta:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Organizar - Configurar cliente MCP y modelo simulado
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Respuestas del modelo simulado
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
    
    # Respuesta de la herramienta meteorológica simulada
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
        
        # Actuar
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Afirmar
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Pruebas de Rendimiento

#### 1. Pruebas de Carga

Prueba cuántas solicitudes concurrentes puede manejar tu servidor MCP:

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

#### 2. Pruebas de Estrés

Prueba el sistema bajo carga extrema:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Configurar JMeter para pruebas de estrés
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Configurar el plan de pruebas de JMeter
    HashTree testPlanTree = new HashTree();
    
    // Crear plan de pruebas, grupo de hilos, muestreadores, etc.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Agregar muestreador HTTP para ejecución de herramienta
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Agregar escuchas
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Ejecutar prueba
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Validar resultados
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Tiempo promedio de respuesta < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // Percentil 90 < 500ms
}
```

#### 3. Monitoreo y Perfilamiento

Configura monitoreo para análisis de rendimiento a largo plazo:

```python
# Configurar monitoreo para un servidor MCP
def configure_monitoring(server):
    # Configurar métricas de Prometheus
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
    
    # Agregar middleware para temporizar y registrar métricas
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Exponer punto final de métricas
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Patrones de Diseño de Flujos de Trabajo MCP

Los flujos de trabajo MCP bien diseñados mejoran eficiencia, confiabilidad y mantenibilidad. Aquí están los patrones clave a seguir:

### 1. Patrón Cadena de Herramientas

Conecta múltiples herramientas en secuencia donde la salida de cada herramienta se convierte en la entrada para la siguiente:

```python
# Implementación de la Cadena de Herramientas en Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Lista de nombres de herramientas para ejecutar en secuencia
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Ejecutar cada herramienta en la cadena, pasando el resultado anterior
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Almacenar el resultado y usarlo como entrada para la siguiente herramienta
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Ejemplo de uso
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

### 2. Patrón Despachador

Usa una herramienta central que despache a herramientas especializadas según la entrada:

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

### 3. Patrón de Procesamiento en Paralelo

Ejecuta múltiples herramientas simultáneamente para mayor eficiencia:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Paso 1: Obtener metadatos del conjunto de datos (síncrono)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Paso 2: Ejecutar múltiples análisis en paralelo
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
        
        // Esperar a que todas las tareas paralelas se completen
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Esperar a la finalización
        
        // Paso 3: Combinar resultados
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Paso 4: Generar informe resumen
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Devolver resultado completo del flujo de trabajo
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Patrón de Recuperación de Errores

Implementa reintentos o alternativas graciosas para fallos de herramientas:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Intenta primero con la herramienta principal
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Registra el fallo
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Recurre a la herramienta secundaria
            try:
                # Puede ser necesario transformar los parámetros para la herramienta de respaldo
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Ambas herramientas fallaron
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Esta implementación dependería de las herramientas específicas
        # Para este ejemplo, solo devolveremos los parámetros originales
        return params

# Ejemplo de uso
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # API climática primaria (de pago)
        "basicWeatherService",    # API climática de respaldo (gratuita)
        {"location": location}
    )
```

### 5. Patrón de Composición de Flujos de Trabajo

Construye flujos complejos componiendo flujos más simples:

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

# Pruebas de Servidores MCP: Mejores Prácticas y Consejos Clave

## Visión General

Las pruebas son un aspecto crítico para desarrollar servidores MCP confiables y de alta calidad. Esta guía proporciona mejores prácticas y consejos completos para probar tus servidores MCP durante todo el ciclo de desarrollo, desde pruebas unitarias hasta pruebas de integración y validación de extremo a extremo.

## Por qué las pruebas son importantes para servidores MCP

Los servidores MCP funcionan como middleware crucial entre modelos de IA y aplicaciones cliente. Las pruebas exhaustivas aseguran:

- Fiabilidad en entornos de producción
- Manejo preciso de solicitudes y respuestas
- Implementación adecuada de las especificaciones MCP
- Resiliencia ante fallos y casos límite
- Rendimiento consistente bajo diversas cargas

## Pruebas Unitarias para Servidores MCP

### Pruebas Unitarias (Base)

Las pruebas unitarias verifican componentes individuales de tu servidor MCP en aislamiento.

#### Qué probar

1. **Manejadores de Recursos**: Prueba la lógica de cada manejador de recursos independientemente
2. **Implementaciones de Herramientas**: Verifica el comportamiento de la herramienta con diferentes entradas
3. **Plantillas de Indicación**: Asegúrate que las plantillas de indicaciones se rendericen correctamente
4. **Validación de Esquemas**: Prueba la lógica de validación de parámetros
5. **Manejo de Errores**: Verifica respuestas de error para entradas inválidas

#### Mejores Prácticas para pruebas unitarias

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
# Ejemplo de prueba unitaria para una herramienta calculadora en Python
def test_calculator_tool_add():
    # Preparar
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Actuar
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Afirmar
    assert result["value"] == 12
```

### Pruebas de Integración (Capa Media)

Las pruebas de integración verifican las interacciones entre componentes de tu servidor MCP.

#### Qué probar

1. **Inicialización del Servidor**: Prueba el arranque del servidor con varias configuraciones
2. **Registro de Rutas**: Verifica que todos los endpoints estén correctamente registrados
3. **Procesamiento de Solicitudes**: Prueba el ciclo completo solicitud-respuesta
4. **Propagación de Errores**: Asegura que los errores se manejen correctamente entre componentes
5. **Autenticación y Autorización**: Prueba los mecanismos de seguridad

#### Mejores Prácticas para pruebas de integración

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

### Pruebas de Extremo a Extremo (Capa Superior)

Las pruebas de extremo a extremo verifican el comportamiento completo del sistema desde el cliente hasta el servidor.

#### Qué probar

1. **Comunicación Cliente-Servidor**: Prueba ciclos completos de solicitud-respuesta
2. **SDKs de Clientes Reales**: Prueba con implementaciones reales de clientes
3. **Rendimiento Bajo Carga**: Verifica comportamiento con múltiples solicitudes concurrentes
4. **Recuperación ante Errores**: Prueba recuperación del sistema ante fallos
5. **Operaciones de Larga Duración**: Verifica el manejo de streaming y operaciones prolongadas

#### Mejores Prácticas para pruebas E2E

```typescript
// Ejemplo de prueba E2E con un cliente en TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Iniciar servidor en entorno de prueba
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Actuar
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Afirmar
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Estrategias de Mocking para Pruebas MCP

El mocking es esencial para aislar componentes durante las pruebas.

### Componentes a simular

1. **Modelos de IA externos**: Simula respuestas del modelo para pruebas predecibles
2. **Servicios externos**: Simula dependencias API (bases de datos, servicios de terceros)
3. **Servicios de autenticación**: Simula proveedores de identidad
4. **Proveedores de recursos**: Simula manejadores de recursos costosos

### Ejemplo: Simulación de respuesta de modelo IA

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
# Ejemplo de Python con unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Configurar mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Usar mock en la prueba
    server = McpServer(model_client=mock_model)
    # Continuar con la prueba
```

## Pruebas de Rendimiento

Las pruebas de rendimiento son cruciales para servidores MCP en producción.

### Qué medir

1. **Latencia**: Tiempo de respuesta para solicitudes
2. **Rendimiento (Throughput)**: Solicitudes manejadas por segundo
3. **Uso de Recursos**: Uso de CPU, memoria, red
4. **Manejo de Concurrencia**: Comportamiento bajo solicitudes paralelas
5. **Características de Escalabilidad**: Rendimiento conforme aumenta la carga

### Herramientas para pruebas de rendimiento

- **k6**: Herramienta open-source para pruebas de carga
- **JMeter**: Pruebas de rendimiento completas
- **Locust**: Pruebas de carga basadas en Python
- **Azure Load Testing**: Pruebas de rendimiento basadas en la nube

### Ejemplo: Prueba básica de carga con k6

```javascript
// script k6 para pruebas de carga del servidor MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 usuarios virtuales
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

## Automatización de Pruebas para Servidores MCP

Automatizar tus pruebas asegura calidad consistente y ciclos de retroalimentación más rápidos.

### Integración CI/CD

1. **Ejecutar pruebas unitarias en Pull Requests**: Asegura que cambios en el código no rompan funcionalidades existentes
2. **Pruebas de Integración en Staging**: Ejecutar pruebas de integración en entornos de preproducción  
3. **Líneas Base de Rendimiento**: Mantener puntos de referencia de rendimiento para detectar regresiones  
4. **Escaneos de Seguridad**: Automatizar pruebas de seguridad como parte del pipeline  

### Ejemplo de Pipeline CI (GitHub Actions)

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
  
## Pruebas de Cumplimiento con la Especificación MCP

Verifique que su servidor implemente correctamente la especificación MCP.

### Áreas Clave de Cumplimiento

1. **Endpoints API**: Probar los endpoints requeridos (/resources, /tools, etc.)  
2. **Formato de Solicitud/Respuesta**: Validar el cumplimiento del esquema  
3. **Códigos de Error**: Verificar los códigos de estado correctos para varios escenarios  
4. **Tipos de Contenido**: Probar el manejo de diferentes tipos de contenido  
5. **Flujo de Autenticación**: Verificar mecanismos de autenticación conformes a la especificación  

### Suite de Pruebas de Cumplimiento

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
  
## Las 10 Mejores Consejos para el Testing Efectivo de Servidores MCP

1. **Probar Definiciones de Herramientas por Separado**: Verificar definiciones de esquema independientemente de la lógica de la herramienta  
2. **Usar Pruebas Parametrizadas**: Probar herramientas con una variedad de entradas, incluidos casos extremos  
3. **Comprobar Respuestas de Error**: Verificar el manejo adecuado de errores para todas las condiciones posibles  
4. **Probar la Lógica de Autorización**: Asegurar un control de acceso adecuado para diferentes roles de usuario  
5. **Monitorear la Cobertura de Pruebas**: Apuntar a una alta cobertura del código de ruta crítica  
6. **Probar Respuestas por Streaming**: Verificar el manejo correcto de contenido en streaming  
7. **Simular Problemas de Red**: Probar comportamiento bajo condiciones de red deficientes  
8. **Probar Límites de Recursos**: Verificar comportamiento al alcanzar cuotas o límites de tasa  
9. **Automatizar Pruebas de Regresión**: Construir una suite que se ejecute con cada cambio de código  
10. **Documentar los Casos de Prueba**: Mantener documentación clara de los escenarios de prueba  

## Errores Comunes en las Pruebas

- **Exceso de confianza en pruebas del camino feliz**: Asegúrese de probar exhaustivamente los casos de error  
- **Ignorar las pruebas de rendimiento**: Identificar cuellos de botella antes de que afecten producción  
- **Probar solo en aislamiento**: Combinar pruebas unitarias, de integración y end-to-end  
- **Cobertura incompleta de API**: Asegurarse de que todos los endpoints y funcionalidades estén probados  
- **Entornos de prueba inconsistentes**: Usar contenedores para garantizar entornos de prueba consistentes  

## Conclusión

Una estrategia de pruebas integral es esencial para desarrollar servidores MCP confiables y de alta calidad. Al implementar las mejores prácticas y consejos descritos en esta guía, puede asegurarse de que sus implementaciones MCP cumplan con los más altos estándares de calidad, confiabilidad y rendimiento.

## Puntos Clave

1. **Diseño de Herramientas**: Seguir el principio de responsabilidad única, usar inyección de dependencias y diseñar para la composibilidad  
2. **Diseño de Esquemas**: Crear esquemas claros, bien documentados con restricciones de validación apropiadas  
3. **Manejo de Errores**: Implementar manejo de errores elegante, respuestas de error estructuradas y lógica de reintentos  
4. **Rendimiento**: Usar caché, procesamiento asíncrono y control de recursos  
5. **Seguridad**: Aplicar validación exhaustiva de entradas, verificaciones de autorización y manejo de datos sensibles  
6. **Testing**: Crear pruebas unitarias, de integración y end-to-end completas  
7. **Patrones de Workflow**: Aplicar patrones establecidos como cadenas, despachadores y procesamiento en paralelo  

## Ejercicio

Diseñe una herramienta MCP y un flujo de trabajo para un sistema de procesamiento de documentos que:

1. Acepte documentos en múltiples formatos (PDF, DOCX, TXT)  
2. Extraiga texto y la información clave de los documentos  
3. Clasifique los documentos por tipo y contenido  
4. Genere un resumen de cada documento  

Implemente los esquemas de la herramienta, manejo de errores y un patrón de flujo de trabajo que mejor se adapte a este escenario. Considere cómo probaría esta implementación.

## Recursos

1. Únase a la comunidad MCP en el [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) para estar al día con los últimos desarrollos  
2. Contribuya a los proyectos open-source [MCP](https://github.com/modelcontextprotocol)  
3. Aplique los principios MCP en las iniciativas de IA de su propia organización  
4. Explore implementaciones especializadas de MCP para su industria  
5. Considere tomar cursos avanzados sobre temas específicos de MCP, como integración multimodal o integración de aplicaciones empresariales  
6. Experimente construyendo sus propias herramientas y flujos MCP usando los principios aprendidos en el [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Qué Sigue

Siguiente: [Estudios de Caso](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->