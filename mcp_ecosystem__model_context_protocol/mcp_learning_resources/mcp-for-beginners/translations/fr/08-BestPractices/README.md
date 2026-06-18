# Meilleures pratiques pour le développement MCP

[![Meilleures pratiques pour le développement MCP](../../../translated_images/fr/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Cliquez sur l'image ci-dessus pour voir la vidéo de cette leçon)_

## Vue d'ensemble

Cette leçon se concentre sur les meilleures pratiques avancées pour le développement, les tests et le déploiement des serveurs et fonctionnalités MCP en environnement de production. À mesure que les écosystèmes MCP gagnent en complexité et en importance, suivre des modèles établis garantit la fiabilité, la maintenabilité et l'interopérabilité. Cette leçon consolide la sagesse pratique acquise lors d’implémentations MCP réelles pour vous guider dans la création de serveurs robustes et efficaces avec des ressources, des invites et des outils performants.

## Objectifs d'apprentissage

À la fin de cette leçon, vous serez capable de :

- Appliquer les meilleures pratiques industrielles dans la conception des serveurs et fonctionnalités MCP
- Créer des stratégies complètes de test pour les serveurs MCP
- Concevoir des modèles de workflows efficaces et réutilisables pour des applications MCP complexes
- Mettre en œuvre une gestion appropriée des erreurs, des journaux et de l’observabilité dans les serveurs MCP
- Optimiser les implémentations MCP pour les performances, la sécurité et la maintenabilité

## Principes fondamentaux du MCP

Avant d'entrer dans les pratiques spécifiques d’implémentation, il est important de comprendre les principes fondamentaux qui guident un développement MCP efficace :

1. **Communication normalisée** : MCP utilise JSON-RPC 2.0 comme base, fournissant un format cohérent pour les requêtes, réponses et gestion des erreurs dans toutes les implémentations.

2. **Conception centrée utilisateur** : Toujours privilégier le consentement, le contrôle et la transparence pour les utilisateurs dans vos implémentations MCP.

3. **Sécurité d'abord** : Mettre en place des mesures de sécurité robustes incluant l’authentification, l’autorisation, la validation et la limitation des taux.

4. **Architecture modulaire** : Concevoir vos serveurs MCP de manière modulaire, où chaque outil et ressource a une finalité claire et ciblée.

5. **Connexions avec état** : Tirer parti de la capacité de MCP à maintenir l’état à travers plusieurs requêtes pour des interactions plus cohérentes et contextuelles.

## Meilleures pratiques officielles du MCP

Les bonnes pratiques suivantes sont issues de la documentation officielle du Model Context Protocol :

### Meilleures pratiques de sécurité

1. **Consentement et contrôle utilisateurs** : Toujours exiger un consentement explicite de l’utilisateur avant d’accéder aux données ou d’exécuter des opérations. Fournir un contrôle clair sur les données partagées et sur les actions autorisées.

2. **Confidentialité des données** : Ne divulguer les données utilisateur qu’avec un consentement explicite et les protéger par des contrôles d’accès appropriés. Protéger contre la transmission de données non autorisée.

3. **Sécurité des outils** : Exiger le consentement explicite avant d’invoquer un outil. S’assurer que les utilisateurs comprennent la fonction de chaque outil et appliquer des frontières de sécurité robustes.

4. **Contrôle des permissions des outils** : Configurer quels outils un modèle peut utiliser durant une session, en garantissant que seuls les outils explicitement autorisés sont accessibles.

5. **Authentification** : Exiger une authentification appropriée avant d’accorder l’accès aux outils, ressources ou opérations sensibles via des clés API, tokens OAuth ou autres méthodes sécurisées.

6. **Validation des paramètres** : Appliquer une validation pour toutes les invocations d’outils afin d’éviter que des entrées malformées ou malveillantes n’atteignent les implémentations d’outils.

7. **Limitation des taux** : Mettre en œuvre une limitation des taux pour prévenir les abus et garantir un usage équitable des ressources serveur.

### Meilleures pratiques d’implémentation

1. **Négociation des capacités** : Lors de la mise en place de la connexion, échanger des informations sur les fonctionnalités supportées, versions du protocole, outils et ressources disponibles.

2. **Conception des outils** : Créer des outils ciblés qui font bien une tâche spécifique, plutôt que des outils monolithiques traitant plusieurs préoccupations.

3. **Gestion des erreurs** : Mettre en place des messages et codes d’erreur standardisés pour faciliter le diagnostic, gérer les échecs avec grâce et fournir des retours exploitables.

4. **Journalisation** : Configurer des journaux structurés pour l’audit, le débogage et la surveillance des interactions du protocole.

5. **Suivi de progression** : Pour les opérations longues, rapporter des mises à jour de progression pour permettre des interfaces utilisateur réactives.

6. **Annulation des requêtes** : Autoriser les clients à annuler des requêtes en cours qui ne sont plus nécessaires ou prennent trop de temps.

## Références supplémentaires

Pour les informations les plus récentes sur les meilleures pratiques MCP, consultez :

- [Documentation MCP](https://modelcontextprotocol.io/)
- [Spécification MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Dépôt GitHub](https://github.com/modelcontextprotocol)
- [Meilleures pratiques de sécurité](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [Top 10 sécuritaire OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Risques de sécurité et atténuations
- [Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formation pratique en sécurité

## Exemples pratiques d’implémentation

### Meilleures pratiques de conception d’outils

#### 1. Principe de responsabilité unique

Chaque outil MCP doit avoir une finalité claire et ciblée. Plutôt que de créer des outils monolithiques qui tentent de gérer plusieurs préoccupations, développez des outils spécialisés qui excellent dans des tâches spécifiques.

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

#### 2. Gestion cohérente des erreurs

Implémentez une gestion des erreurs robuste avec des messages d'erreur informatifs et des mécanismes de récupération appropriés.

```python
# Exemple Python avec gestion complète des erreurs
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Validation des paramètres
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Validation de sécurité
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Opération de base de données avec délai d'attente
                async with timeout(10):  # Délai d'attente de 10 secondes
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Les erreurs de connexion peuvent être transitoires
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Les erreurs de requête sont probablement des erreurs côté client
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Laisser passer les erreurs spécifiques à l'outil
            raise
        except Exception as e:
            # Capturer toutes les erreurs inattendues
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Implémentation de la détection d'injection SQL
        pass
        
    def _log_error(self, message, error):
        # Implémentation de la journalisation des erreurs
        pass
```

#### 3. Validation des paramètres

Validez toujours les paramètres minutieusement pour éviter les entrées malformées ou malveillantes.

```javascript
// Exemple JavaScript/TypeScript avec validation détaillée des paramètres
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
    // 1. Valider la présence des paramètres
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Valider les types des paramètres
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Valider les valeurs des paramètres
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Valider la présence de contenu pour l'opération d'écriture
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Validation de la sécurité du chemin
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Implémentation basée sur les paramètres validés
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Implémentation de la vérification de la sécurité du chemin
    // ...
  }
}
```

### Exemples d’implémentation de sécurité

#### 1. Authentification et autorisation

```java
// Exemple Java avec authentification et autorisation
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Injection de dépendances
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
        // 1. Extraire le contexte d'authentification
        String authToken = request.getContext().getAuthToken();
        
        // 2. Authentifier l'utilisateur
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Vérifier l'autorisation pour l'opération spécifique
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Procéder à l'opération autorisée
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

#### 2. Limitation des taux

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

## Meilleures pratiques de test

### 1. Tests unitaires des outils MCP

Testez toujours vos outils isolément, en simulant les dépendances externes :

```typescript
// Exemple TypeScript d'un test unitaire d'outil
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Créer un service météo simulé
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Créer l'outil avec la dépendance simulée
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Préparer
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Exécuter
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Vérifier
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Préparer
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Exécuter et vérifier
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Tests d’intégration

Testez le flux complet depuis les requêtes client jusqu’aux réponses serveur :

```python
# Exemple de test d'intégration Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Démarrer un serveur de test
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Créer un client
        client = McpClient("http://localhost:5000")
        
        # Tester la découverte d'outil
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Tester l'exécution de l'outil
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Vérifier la réponse
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Nettoyer
        await server.stop()
```

## Optimisation des performances

### 1. Stratégies de mise en cache

Implémentez une mise en cache appropriée pour réduire la latence et l’utilisation des ressources :

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

#### 2. Injection de dépendances et testabilité

Concevez les outils pour recevoir leurs dépendances via injection dans le constructeur, les rendant testables et configurables :

```java
// Exemple Java avec injection de dépendances
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Dépendances injectées via le constructeur
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Implémentation de l'outil
    // ...
}
```

#### 3. Outils composables

Concevez des outils pouvant être assemblés pour créer des workflows plus complexes :

```python
# Exemple Python montrant des outils composables
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Implémentation...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Cet outil peut utiliser les résultats de l'outil dataFetch
    async def execute_async(self, request):
        # Implémentation...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Cet outil peut utiliser les résultats de l'outil dataAnalysis
    async def execute_async(self, request):
        # Implémentation...
        pass

# Ces outils peuvent être utilisés indépendamment ou dans le cadre d'un flux de travail
```

### Meilleures pratiques de conception de schéma

Le schéma est le contrat entre le modèle et votre outil. Des schémas bien conçus améliorent l’utilisabilité des outils.

#### 1. Descriptions claires des paramètres

Incluez toujours des informations descriptives pour chaque paramètre :

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

#### 2. Contraintes de validation

Incluez des contraintes de validation pour prévenir les entrées invalides :

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Propriété Email avec validation du format
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Propriété Age avec contraintes numériques
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Propriété énumérée
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

#### 3. Structures de retour cohérentes

Maintenez la cohérence dans vos structures de réponse pour faciliter l’interprétation des résultats par les modèles :

```python
async def execute_async(self, request):
    try:
        # Traiter la demande
        results = await self._search_database(request.parameters["query"])
        
        # Toujours retourner une structure cohérente
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

### Gestion des erreurs

Une gestion robuste des erreurs est cruciale pour la fiabilité des outils MCP.

#### 1. Gestion élégante des erreurs

Gérez les erreurs aux niveaux appropriés et fournissez des messages informatifs :

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

#### 2. Réponses d’erreur structurées

Retournez des informations d’erreur structurées lorsque c’est possible :

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Mise en œuvre
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
        
        // Relancer d'autres exceptions sous forme de ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Logique de nouvelle tentative

Mettez en place une logique de nouvelle tentative appropriée pour les échecs transitoires :

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # secondes
    
    while retry_count < max_retries:
        try:
            # Appeler l'API externe
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Repli exponentiel
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Erreur non transitoire, ne pas réessayer
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Optimisation des performances

#### 1. Mise en cache

Implémentez la mise en cache pour les opérations coûteuses :

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

#### 2. Traitement asynchrone

Utilisez des modèles de programmation asynchrone pour les opérations liées aux entrées/sorties :

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Pour les opérations de longue durée, retourner immédiatement un ID de traitement
        String processId = UUID.randomUUID().toString();
        
        // Démarrer le traitement asynchrone
        CompletableFuture.runAsync(() -> {
            try {
                // Effectuer une opération de longue durée
                documentService.processDocument(documentId);
                
                // Mettre à jour le statut (serait généralement stocké dans une base de données)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Retourner une réponse immédiate avec l'ID de processus
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Outil compagnon de vérification de statut
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

#### 3. Régulation des ressources

Mettez en place une régulation des ressources pour prévenir les surcharges :

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Autoriser 5 requêtes par seconde
            bucket_size=10        # Autoriser des rafales jusqu'à 10 requêtes
        )
    
    async def execute_async(self, request):
        # Vérifier si nous pouvons continuer ou devons attendre
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Si l'attente est trop longue
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Attendre le délai approprié
                await asyncio.sleep(delay)
        
        # Consommer un jeton et procéder à la requête
        self.rate_limiter.consume()
        
        # Appeler l'API
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
            
            # Calculer le temps jusqu'au prochain jeton disponible
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Ajouter de nouveaux jetons en fonction du temps écoulé
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Meilleures pratiques de sécurité

#### 1. Validation des entrées

Validez toujours soigneusement les paramètres d’entrée :

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

#### 2. Vérifications d’autorisation

Mettez en œuvre des contrôles d’autorisation appropriés :

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Obtenir le contexte utilisateur à partir de la requête
    UserContext user = request.getContext().getUserContext();
    
    // Vérifier si l'utilisateur a les permissions requises
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Pour des ressources spécifiques, vérifier l'accès à cette ressource
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Procéder à l'exécution de l'outil
    // ...
}
```

#### 3. Gestion des données sensibles

Manipulez les données sensibles avec précaution :

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
        
        # Obtenir les données utilisateur
        user_data = await self.user_service.get_user_data(user_id)
        
        # Filtrer les champs sensibles sauf si explicitement demandés ET autorisés
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Vérifier le niveau d'autorisation dans le contexte de la requête
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Créer une copie pour éviter de modifier l'original
        redacted = user_data.copy()
        
        # Caviarder des champs sensibles spécifiques
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Caviarder des données sensibles imbriquées
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Meilleures pratiques de test des outils MCP

Un test complet garantit que les outils MCP fonctionnent correctement, gèrent les cas limites et s’intègrent bien au reste du système.

### Tests unitaires

#### 1. Tester chaque outil en isolation

Créez des tests ciblés pour les fonctionnalités de chaque outil :

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

#### 2. Tests de validation de schéma

Testez que les schémas sont valides et appliquent correctement les contraintes :

```java
@Test
public void testSchemaValidation() {
    // Créer une instance d'outil
    SearchTool searchTool = new SearchTool();
    
    // Obtenir le schéma
    Object schema = searchTool.getSchema();
    
    // Convertir le schéma en JSON pour validation
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Valider que le schéma est un JSONSchema valide
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Tester les paramètres valides
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Tester le paramètre requis manquant
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Tester le type de paramètre invalide
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Tests de gestion des erreurs

Créez des tests spécifiques pour les conditions d’erreur :

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Disposer
    tool = ApiTool(timeout=0.1)  # Délai d'attente très court
    
    # Simuler une requête qui expirera
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Plus long que le délai d'attente
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Agir et affirmer
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Vérifier le message d'exception
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Disposer
    tool = ApiTool()
    
    # Simuler une réponse limitée en débit
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
        
        # Agir et affirmer
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Vérifier que l'exception contient des informations sur la limite de débit
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Tests d’intégration

#### 1. Tests de chaînes d’outils

Testez les outils fonctionnant ensemble dans les combinaisons attendues :

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

#### 2. Tests du serveur MCP

Testez le serveur MCP avec l’enregistrement complet des outils et leur exécution :

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
        // Tester le point de terminaison de découverte
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Créer une requête d'outil
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Envoyer la requête et vérifier la réponse
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Créer une requête d'outil invalide
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Paramètre "b" manquant
        request.put("parameters", parameters);
        
        // Envoyer la requête et vérifier la réponse d'erreur
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Tests de bout en bout

Testez des workflows complets depuis l’invite du modèle jusqu’à l’exécution des outils :

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Arrange - Configurer le client MCP et le modèle simulé
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Réponses du modèle simulé
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
    
    # Réponse de l'outil météo simulé
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
        
        # Agir
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Affirmer
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Tests de performance

#### 1. Tests de charge

Testez combien de requêtes simultanées votre serveur MCP peut gérer :

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

#### 2. Tests de résistance

Testez le système sous une charge extrême :

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Configurer JMeter pour les tests de charge
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Configurer le plan de test JMeter
    HashTree testPlanTree = new HashTree();
    
    // Créer le plan de test, groupe de threads, échantillonneurs, etc.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Ajouter un échantillonneur HTTP pour l'exécution de l'outil
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Ajouter des auditeurs
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Exécuter le test
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Valider les résultats
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Temps de réponse moyen < 200 ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90e percentile < 500 ms
}
```

#### 3. Surveillance et profilage

Configurez une surveillance pour l’analyse des performances sur le long terme :

```python
# Configurer la surveillance pour un serveur MCP
def configure_monitoring(server):
    # Configurer les métriques Prometheus
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
    
    # Ajouter un middleware pour le chronométrage et l'enregistrement des métriques
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Exposer le point de terminaison des métriques
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Modèles de conception de workflows MCP

Des workflows MCP bien conçus améliorent l’efficacité, la fiabilité et la maintenabilité. Voici les principaux modèles à suivre :

### 1. Modèle chaîne d’outils

Connectez plusieurs outils en séquence où la sortie d’un outil devient l’entrée du suivant :

```python
# Implémentation de la chaîne d'outils Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Liste des noms d'outils à exécuter en séquence
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Exécuter chaque outil dans la chaîne, en passant le résultat précédent
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Stocker le résultat et l'utiliser comme entrée pour l'outil suivant
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Exemple d'utilisation
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

### 2. Modèle répartiteur

Utilisez un outil central qui répartit vers des outils spécialisés en fonction de l’entrée :

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

### 3. Modèle de traitement parallèle

Exécutez plusieurs outils simultanément pour plus d’efficacité :

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Étape 1 : Récupérer les métadonnées du jeu de données (synchrone)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Étape 2 : Lancer plusieurs analyses en parallèle
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
        
        // Attendre que toutes les tâches parallèles soient terminées
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Attendre la fin
        
        // Étape 3 : Combiner les résultats
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Étape 4 : Générer le rapport résumé
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Retourner le résultat complet du flux de travail
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Modèle de récupération d’erreur

Mettez en place des solutions de repli élégantes en cas d’échec d’outils :

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Essayez d'abord l'outil principal
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Enregistrez l'échec
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Revenir à l'outil secondaire
            try:
                # Il pourrait être nécessaire de transformer les paramètres pour l'outil de secours
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Les deux outils ont échoué
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Cette implémentation dépendrait des outils spécifiques
        # Pour cet exemple, nous retournerons simplement les paramètres originaux
        return params

# Exemple d'utilisation
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # API météo principale (payante)
        "basicWeatherService",    # API météo de secours (gratuite)
        {"location": location}
    )
```

### 5. Modèle de composition de workflow

Construisez des workflows complexes en composant des workflows plus simples :

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

# Test des serveurs MCP : meilleures pratiques et conseils clés

## Vue d'ensemble

Le test est une partie critique du développement de serveurs MCP fiables et de haute qualité. Ce guide propose des meilleures pratiques complètes et des conseils pour tester vos serveurs MCP tout au long du cycle de développement, des tests unitaires aux tests d’intégration et aux validations de bout en bout.

## Pourquoi les tests sont importants pour les serveurs MCP

Les serveurs MCP servent de middleware crucial entre les modèles d’IA et les applications clientes. Des tests approfondis garantissent :

- La fiabilité en environnement de production
- La gestion précise des requêtes et réponses
- La bonne implémentation des spécifications MCP
- La résilience face aux pannes et cas limites
- Des performances constantes sous diverses charges

## Tests unitaires pour les serveurs MCP

### Tests unitaires (fondation)

Les tests unitaires vérifient les composants individuels de votre serveur MCP en isolation.

#### Ce qu’il faut tester

1. **Gestionnaires de ressources** : Tester logiquement chaque gestionnaire de ressource indépendamment
2. **Implémentations d’outils** : Vérifier le comportement des outils avec diverses entrées
3. **Modèles d’invites** : S’assurer que les modèles d’invites s’affichent correctement
4. **Validation de schéma** : Tester la logique de validation des paramètres
5. **Gestion des erreurs** : Vérifier les réponses d’erreur pour les entrées invalides

#### Meilleures pratiques pour les tests unitaires

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
# Exemple de test unitaire pour un outil calculatrice en Python
def test_calculator_tool_add():
    # Préparer
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Agir
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Vérifier
    assert result["value"] == 12
```

### Tests d’intégration (couche intermédiaire)

Les tests d’intégration vérifient les interactions entre les composants de votre serveur MCP.

#### Ce qu’il faut tester

1. **Initialisation du serveur** : Tester le démarrage du serveur avec différentes configurations
2. **Enregistrement des routes** : Vérifier que tous les points de terminaison sont correctement enregistrés
3. **Traitement des requêtes** : Tester le cycle complet requête-réponse
4. **Propagation des erreurs** : S’assurer que les erreurs sont bien gérées entre les composants
5. **Authentification & autorisation** : Tester les mécanismes de sécurité

#### Meilleures pratiques pour les tests d’intégration

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

### Tests de bout en bout (couche supérieure)

Les tests de bout en bout vérifient le comportement complet du système du client au serveur.

#### Ce qu’il faut tester

1. **Communication client-serveur** : Tester des cycles complets de requêtes/réponses
2. **SDKs clients réels** : Tester avec des implémentations client réelles
3. **Performances sous charge** : Vérifier le comportement avec plusieurs requêtes simultanées
4. **Récupération après erreur** : Tester la reprise du système après échecs
5. **Opérations longues** : Vérifier la gestion des flux et opérations longues

#### Meilleures pratiques pour les tests E2E

```typescript
// Exemple de test E2E avec un client en TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Démarrer le serveur en environnement de test
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Action
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Assertion
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Stratégies de simulation (mocking) pour les tests MCP

Le mocking est essentiel pour isoler les composants pendant les tests.

### Composants à simuler

1. **Modèles AI externes** : Simuler les réponses des modèles pour des tests prévisibles
2. **Services externes** : Simuler les dépendances API (bases de données, services tiers)
3. **Services d’authentification** : Simuler les fournisseurs d’identités
4. **Fournisseurs de ressources** : Simuler les gestionnaires de ressources coûteux

### Exemple : simulation d’une réponse de modèle AI

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
# Exemple Python avec unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Configurer le mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Utiliser le mock dans le test
    server = McpServer(model_client=mock_model)
    # Continuer avec le test
```

## Tests de performance

Les tests de performance sont cruciaux pour les serveurs MCP en production.

### Ce qu’il faut mesurer

1. **Latence** : Temps de réponse des requêtes
2. **Débit** : Nombre de requêtes traitées par seconde
3. **Utilisation des ressources** : CPU, mémoire, usage réseau
4. **Gestion de la concurrence** : Comportement sous requêtes parallèles
5. **Caractéristiques d’évolutivité** : Performance avec l’augmentation de la charge

### Outils pour les tests de performance

- **k6** : Outil open-source de test de charge
- **JMeter** : Tests de performance complets
- **Locust** : Test de charge basé sur Python
- **Azure Load Testing** : Tests de performance cloud

### Exemple : test de charge basique avec k6

```javascript
// script k6 pour le test de charge du serveur MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 utilisateurs virtuels
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

## Automatisation des tests pour les serveurs MCP

Automatiser vos tests garantit une qualité cohérente et des boucles de rétroaction plus rapides.

### Intégration CI/CD

1. **Lancer les tests unitaires sur les pull requests** : Garantir que les modifications du code ne cassent pas les fonctionnalités existantes
2. **Tests d'intégration en staging** : Exécuter des tests d'intégration dans des environnements de pré-production  
3. **Références de performance** : Maintenir des benchmarks de performance pour détecter les régressions  
4. **Analyses de sécurité** : Automatiser les tests de sécurité dans le cadre du pipeline  

### Exemple de pipeline CI (GitHub Actions)

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
  
## Tests de conformité à la spécification MCP  

Vérifiez que votre serveur implémente correctement la spécification MCP.  

### Principaux domaines de conformité  

1. **Points d'API** : Tester les endpoints requis (/resources, /tools, etc.)  
2. **Format des requêtes/réponses** : Valider la conformité au schéma  
3. **Codes d'erreur** : Vérifier les codes d'état corrects pour différents scénarios  
4. **Types de contenu** : Tester la gestion des différents types de contenu  
5. **Flux d'authentification** : Vérifier les mécanismes d'authentification conformes à la spécification  

### Suite de tests de conformité  

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
  
## Top 10 des conseils pour tester efficacement un serveur MCP  

1. **Tester les définitions d'outils séparément** : Vérifier les définitions de schéma indépendamment de la logique de l'outil  
2. **Utiliser des tests paramétrés** : Tester les outils avec une variété d'entrées, y compris des cas limites  
3. **Vérifier les réponses d'erreur** : S'assurer d'une bonne gestion des erreurs pour toutes les conditions possibles  
4. **Tester la logique d'autorisation** : Garantir un contrôle d'accès correct selon les rôles utilisateurs  
5. **Surveiller la couverture des tests** : Viser une couverture élevée du code des chemins critiques  
6. **Tester les réponses en streaming** : Vérifier la gestion correcte du contenu en streaming  
7. **Simuler des problèmes réseau** : Tester le comportement sous conditions réseau dégradées  
8. **Tester les limites de ressources** : Vérifier le comportement lors de l'atteinte des quotas ou limites de débit  
9. **Automatiser les tests de régression** : Construire une suite qui s'exécute à chaque changement de code  
10. **Documenter les cas de test** : Maintenir une documentation claire des scénarios de test  

## Pièges courants dans les tests  

- **S'appuyer excessivement sur les tests de chemin heureux** : Veiller à bien tester les cas d'erreur  
- **Ignorer les tests de performance** : Identifier les goulots d'étranglement avant la production  
- **Tester uniquement en isolation** : Combiner tests unitaires, d’intégration et de bout en bout  
- **Couverture API incomplète** : S'assurer que tous les endpoints et fonctionnalités sont testés  
- **Environnements de test incohérents** : Utiliser des conteneurs pour garantir la cohérence des environnements de test  

## Conclusion  

Une stratégie de test complète est essentielle pour développer des serveurs MCP fiables et de haute qualité. En appliquant les meilleures pratiques et conseils présentés dans ce guide, vous pouvez garantir que vos implémentations MCP respectent les standards les plus élevés de qualité, fiabilité et performance.  

## Points clés à retenir  

1. **Conception d'outil** : Suivre le principe de responsabilité unique, utiliser l'injection de dépendances et concevoir pour la composabilité  
2. **Conception des schémas** : Créer des schémas clairs, bien documentés avec des contraintes de validation appropriées  
3. **Gestion des erreurs** : Implémenter une gestion élégante des erreurs, des réponses d'erreur structurées et une logique de nouvelle tentative  
4. **Performance** : Utiliser la mise en cache, le traitement asynchrone et la limitation des ressources  
5. **Sécurité** : Appliquer une validation rigoureuse des entrées, des contrôles d'autorisation et la gestion des données sensibles  
6. **Tests** : Créer des tests unitaires, d'intégration et de bout en bout complets  
7. **Modèles de flux de travail** : Appliquer des modèles établis comme les chaînes, les répartiteurs et le traitement parallèle  

## Exercice  

Concevez un outil MCP et un flux de travail pour un système de traitement de documents qui :  

1. Accepte des documents dans plusieurs formats (PDF, DOCX, TXT)  
2. Extrait le texte et les informations clés des documents  
3. Classe les documents par type et contenu  
4. Génère un résumé de chaque document  

Implémentez les schémas d'outils, la gestion des erreurs et un modèle de flux de travail qui conviennent le mieux à ce scénario. Réfléchissez à la manière dont vous testeriez cette implémentation.  

## Ressources  

1. Rejoignez la communauté MCP sur le [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) pour rester informé des dernières évolutions  
2. Contribuez aux projets open-source [MCP](https://github.com/modelcontextprotocol)  
3. Appliquez les principes MCP dans les initiatives IA de votre organisation  
4. Explorez des implémentations MCP spécialisées pour votre secteur  
5. Envisagez de suivre des cours avancés sur des sujets MCP spécifiques, comme l’intégration multimodale ou l’intégration applicative d’entreprise  
6. Expérimentez la création de vos propres outils et flux de travail MCP en suivant les principes appris via le [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## Et ensuite  

Suivant : [Études de cas](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->