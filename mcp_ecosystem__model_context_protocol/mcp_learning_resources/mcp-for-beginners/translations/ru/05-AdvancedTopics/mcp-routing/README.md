# Маршрутизация в протоколе контекста модели

Маршрутизация необходима для направления запросов к соответствующим моделям, инструментам или сервисам внутри экосистемы MCP.

## Введение

Маршрутизация в протоколе контекста модели (MCP) заключается в направлении запросов к наиболее подходящим моделям или сервисам на основе различных критериев, таких как тип содержимого, контекст пользователя и нагрузка на систему. Это обеспечивает эффективную обработку и оптимальное использование ресурсов.

## Цели обучения

В конце этого урока вы сможете:

- Понимать принципы маршрутизации в MCP.
- Реализовывать маршрутизацию на основе содержимого для направления запросов к специализированным сервисам.
- Применять интеллектуальные стратегии балансировки нагрузки для оптимизации использования ресурсов.
- Реализовывать динамическую маршрутизацию инструментов на основе контекста запросов.

## Маршрутизация на основе содержимого

Маршрутизация на основе содержимого направляет запросы к специализированным сервисам согласно содержимому запроса. Например, запросы, связанные с генерацией кода, могут быть направлены к специализированной модели кода, а творческие запросы — к модели креативного письма.

Рассмотрим пример реализации на разных языках программирования.

<details>
<summary>.NET</summary>

```csharp
// .NET Example: Content-based routing in MCP
public class ContentBasedRouter
{
    private readonly Dictionary<string, McpClient> _specializedClients;
    private readonly RoutingClassifier _classifier;
    
    public ContentBasedRouter()
    {
        // Initialize specialized clients for different domains
        _specializedClients = new Dictionary<string, McpClient>
        {
            ["code"] = new McpClient("https://code-specialized-mcp.com"),
            ["creative"] = new McpClient("https://creative-specialized-mcp.com"),
            ["scientific"] = new McpClient("https://scientific-specialized-mcp.com"),
            ["general"] = new McpClient("https://general-mcp.com")
        };
        
        // Initialize content classifier
        _classifier = new RoutingClassifier();
    }
    
    public async Task<McpResponse> RouteAndProcessAsync(string prompt, IDictionary<string, object> parameters = null)
    {
        // Classify the prompt to determine the best specialized service
        string category = await _classifier.ClassifyPromptAsync(prompt);
        
        // Get the appropriate client or fall back to general
        var client = _specializedClients.ContainsKey(category) 
            ? _specializedClients[category] 
            : _specializedClients["general"];
            
        Console.WriteLine($"Routing request to {category} specialized service");
        
        // Send request to the selected service
        return await client.SendPromptAsync(prompt, parameters);
    }
    
    // Simple classifier for routing decisions
    private class RoutingClassifier
    {
        public Task<string> ClassifyPromptAsync(string prompt)
        {
            prompt = prompt.ToLowerInvariant();
            
            if (prompt.Contains("code") || prompt.Contains("function") || 
                prompt.Contains("program") || prompt.Contains("algorithm"))
            {
                return Task.FromResult("code");
            }
            
            if (prompt.Contains("story") || prompt.Contains("creative") || 
                prompt.Contains("imagine") || prompt.Contains("design"))
            {
                return Task.FromResult("creative");
            }
            
            if (prompt.Contains("science") || prompt.Contains("research") || 
                prompt.Contains("analyze") || prompt.Contains("study"))
            {
                return Task.FromResult("scientific");
            }
            
            return Task.FromResult("general");
        }
    }
}
```

В приведённом выше коде мы:

- Создали класс `ContentBasedRouter`, который маршрутизирует запросы на основе содержимого подсказки.
- Инициализировали специализированных клиентов для разных областей (код, творчество, наука, общие).
- Реализовали простой классификатор, который определяет категорию подсказки и направляет её в соответствующий специализированный сервис.
- Использовали механизм резервного варианта для маршрутизации запросов к общему сервису, если специализированный сервис недоступен.
- Реализовали асинхронную обработку для эффективного выполнения запросов.
- Использовали словарь для сопоставления категорий содержимого с специализированными клиентами MCP.
- Реализовали простой классификатор, анализирующий подсказку и возвращающий соответствующую категорию.
- Использовали специализированного клиента для отправки запроса и получения ответа.
- Обработали случаи, когда подсказка не соответствует ни одной специализированной категории, маршрутизируя в общий сервис.

</details>

## Интеллектуальная балансировка нагрузки

Балансировка нагрузки оптимизирует использование ресурсов и обеспечивает высокую доступность сервисов MCP. Существуют разные способы реализации балансировки нагрузки, такие как круговая (round-robin), взвешенная по времени отклика или с учётом содержимого.

Рассмотрим пример реализации, использующей следующие стратегии:

- **Круговая (Round Robin)**: равномерно распределяет запросы между доступными серверами.
- **Взвешенная по времени отклика (Weighted Response Time)**: направляет запросы к серверам на основе среднего времени их отклика.
- **С учётом содержимого (Content-Aware)**: направляет запросы к специализированным серверам на базе содержимого запроса.

<details>
<summary>Java</summary>

```java
// Пример на Java: Интеллектуальное распределение нагрузки для MCP серверов
public class McpLoadBalancer {
    private final List<McpServerNode> serverNodes;
    private final LoadBalancingStrategy strategy;
    
    public McpLoadBalancer(List<McpServerNode> nodes, LoadBalancingStrategy strategy) {
        this.serverNodes = new ArrayList<>(nodes);
        this.strategy = strategy;
    }
    
    public McpResponse processRequest(McpRequest request) {
        // Выбрать лучший сервер на основе стратегии
        McpServerNode selectedNode = strategy.selectNode(serverNodes, request);
        
        try {
            // Направить запрос к выбранному узлу
            return selectedNode.processRequest(request);
        } catch (Exception e) {
            // Обработать сбой - реализовать логику повтора или резерва
            System.err.println("Error processing request on node " + selectedNode.getId() + ": " + e.getMessage());
            
            // Отметить узел как потенциально ненадежный
            selectedNode.recordFailure();
            
            // Попробовать следующий лучший узел в качестве резерва
            List<McpServerNode> remainingNodes = new ArrayList<>(serverNodes);
            remainingNodes.remove(selectedNode);
            
            if (!remainingNodes.isEmpty()) {
                McpServerNode fallbackNode = strategy.selectNode(remainingNodes, request);
                return fallbackNode.processRequest(request);
            } else {
                throw new RuntimeException("All MCP server nodes failed to process the request");
            }
        }
    }
    
    // Задача проверки состояния узла
    public void startHealthChecks(Duration interval) {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(() -> {
            for (McpServerNode node : serverNodes) {
                try {
                    boolean isHealthy = node.checkHealth();
                    System.out.println("Node " + node.getId() + " health status: " + 
                                      (isHealthy ? "HEALTHY" : "UNHEALTHY"));
                } catch (Exception e) {
                    System.err.println("Health check failed for node " + node.getId());
                    node.setHealthy(false);
                }
            }
        }, 0, interval.toMillis(), TimeUnit.MILLISECONDS);
    }
    
    // Интерфейс для стратегий балансировки нагрузки
    public interface LoadBalancingStrategy {
        McpServerNode selectNode(List<McpServerNode> nodes, McpRequest request);
    }
    
    // Стратегия кругового обхода
    public static class RoundRobinStrategy implements LoadBalancingStrategy {
        private AtomicInteger counter = new AtomicInteger(0);
        
        @Override
        public McpServerNode selectNode(List<McpServerNode> nodes, McpRequest request) {
            List<McpServerNode> healthyNodes = nodes.stream()
                .filter(McpServerNode::isHealthy)
                .collect(Collectors.toList());
            
            if (healthyNodes.isEmpty()) {
                throw new RuntimeException("No healthy nodes available");
            }
            
            int index = counter.getAndIncrement() % healthyNodes.size();
            return healthyNodes.get(index);
        }
    }
    
    // Стратегия взвешенного времени отклика
    public static class ResponseTimeStrategy implements LoadBalancingStrategy {
        @Override
        public McpServerNode selectNode(List<McpServerNode> nodes, McpRequest request) {
            return nodes.stream()
                .filter(McpServerNode::isHealthy)
                .min(Comparator.comparing(McpServerNode::getAverageResponseTime))
                .orElseThrow(() -> new RuntimeException("No healthy nodes available"));
        }
    }
    
    // Стратегия, учитывающая содержимое
    public static class ContentAwareStrategy implements LoadBalancingStrategy {
        @Override
        public McpServerNode selectNode(List<McpServerNode> nodes, McpRequest request) {
            // Определить характеристики запроса
            boolean isCodeRequest = request.getPrompt().contains("code") || 
                                   request.getAllowedTools().contains("codeInterpreter");
            
            boolean isCreativeRequest = request.getPrompt().contains("creative") || 
                                       request.getPrompt().contains("story");
            
            // Найти специализированные узлы
            Optional<McpServerNode> specializedNode = nodes.stream()
                .filter(McpServerNode::isHealthy)
                .filter(node -> {
                    if (isCodeRequest && node.getSpecialization().equals("code")) {
                        return true;
                    }
                    if (isCreativeRequest && node.getSpecialization().equals("creative")) {
                        return true;
                    }
                    return false;
                })
                .findFirst();
            
            // Вернуть специализированный узел или наименее загруженный узел
            return specializedNode.orElse(
                nodes.stream()
                    .filter(McpServerNode::isHealthy)
                    .min(Comparator.comparing(McpServerNode::getCurrentLoad))
                    .orElseThrow(() -> new RuntimeException("No healthy nodes available"))
            );
        }
    }
}
```

В приведённом выше коде мы:

- Создали класс `McpLoadBalancer`, который управляет списком узлов серверов MCP и маршрутизирует запросы на основе выбранной стратегии балансировки нагрузки.
- Реализовали разные стратегии балансировки: `RoundRobinStrategy`, `ResponseTimeStrategy` и `ContentAwareStrategy`.
- Использовали `ScheduledExecutorService` для периодической проверки состояния серверных узлов.
- Реализовали механизм проверки состояния, который помечает узлы как здоровые или нездоровые на основе их отклика.
- Обработали выполнение запросов с обработкой ошибок и логикой резервирования для обеспечения высокой доступности.
- Использовали класс `McpServerNode` для представления отдельных серверных узлов MCP, включая их состояние здоровья, среднее время отклика и текущую нагрузку.
- Реализовали класс `McpRequest` для инкапсуляции деталей запроса, таких как подсказка и разрешённые инструменты.
- Использовали потоки Java (Java Streams) для фильтрации и выбора узлов по состоянию здоровья и специализации.

</details>

## Динамическая маршрутизация инструментов

Маршрутизация инструментов гарантирует, что вызовы инструментов направляются к наиболее подходящему сервису, исходя из контекста. Например, вызов инструмента погоды может потребовать маршрутизации к региональной точке доступа на основе местоположения пользователя, а калькулятор может использовать конкретную версию API.

Рассмотрим пример реализации, демонстрирующий динамическую маршрутизацию инструментов на основе анализа запросов, региональных конечных точек и поддержки версий.

<details>
<summary>Python</summary>

```python
# Пример на Python: Динамическое маршрутизирование инструментов на основе анализа запроса
class McpToolRouter:
    def __init__(self):
        # Регистрация доступных конечных точек инструментов
        self.tool_endpoints = {
            "weatherTool": "https://weather-service.example.com/api",
            "calculatorTool": "https://calculator-service.example.com/compute",
            "databaseTool": "https://database-service.example.com/query",
            "searchTool": "https://search-service.example.com/search"
        }
        
        # Региональные конечные точки для глобального распределения
        self.regional_endpoints = {
            "us": {
                "weatherTool": "https://us-west.weather-service.example.com/api",
                "searchTool": "https://us.search-service.example.com/search"
            },
            "europe": {
                "weatherTool": "https://eu.weather-service.example.com/api",
                "searchTool": "https://eu.search-service.example.com/search"
            },
            "asia": {
                "weatherTool": "https://asia.weather-service.example.com/api",
                "searchTool": "https://asia.search-service.example.com/search"
            }
        }
        
        # Поддержка версионирования инструментов
        self.tool_versions = {
            "weatherTool": {
                "default": "v2",
                "v1": "https://weather-service.example.com/api/v1",
                "v2": "https://weather-service.example.com/api/v2",
                "beta": "https://weather-service.example.com/api/beta"
            }
        }
    
    async def route_tool_request(self, tool_name, parameters, user_context=None):
        """Route a tool request to the appropriate endpoint based on context"""
        endpoint = self._select_endpoint(tool_name, parameters, user_context)
        
        if not endpoint:
            raise ValueError(f"No endpoint available for tool: {tool_name}")
        
        # Выполнение фактического запроса к выбранной конечной точке
        return await self._execute_tool_request(endpoint, tool_name, parameters)
    
    def _select_endpoint(self, tool_name, parameters, user_context=None):
        """Select the most appropriate endpoint based on context"""
        # Базовая конечная точка из реестра
        if tool_name not in self.tool_endpoints:
            return None
            
        base_endpoint = self.tool_endpoints[tool_name]
        
        # Проверить необходимость использования конкретной версии инструмента
        if tool_name in self.tool_versions:
            version_info = self.tool_versions[tool_name]
            
            # Использовать указанную версию или по умолчанию
            requested_version = parameters.get("_version", version_info["default"])
            if requested_version in version_info:
                base_endpoint = version_info[requested_version]
        
        # Проверить маршрутизацию по региону, если известен регион пользователя
        if user_context and "region" in user_context:
            user_region = user_context["region"]
            
            if user_region in self.regional_endpoints:
                regional_tools = self.regional_endpoints[user_region]
                
                if tool_name in regional_tools:
                    # Использовать конечную точку, специфичную для региона
                    return regional_tools[tool_name]
        
        # Проверить требования к локализации данных
        if user_context and "data_residency" in user_context:
            # Здесь реализуется логика обеспечения нахождения данных в указанной юрисдикции
            pass
        
        # Проверить маршрутизацию на основе задержек
        if user_context and "latency_sensitive" in user_context and user_context["latency_sensitive"]:
            # Здесь реализуется логика выбора конечной точки с минимальной задержкой
            pass
            
        return base_endpoint
        
    async def _execute_tool_request(self, endpoint, tool_name, parameters):
        """Execute the actual tool request to the selected endpoint"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    endpoint,
                    json={"toolName": tool_name, "parameters": parameters},
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 200:
                        result = await response.json()
                        return result
                    else:
                        error_text = await response.text()
                        raise Exception(f"Tool execution failed: {error_text}")
        except Exception as e:
            # Реализовать логику повторных попыток или стратегию резервного варианта
            print(f"Error executing tool {tool_name} at {endpoint}: {str(e)}")
            raise
```

В приведённом выше коде мы:

- Создали класс `McpToolRouter`, который управляет маршрутизацией инструментов на основе анализа запросов, региональных конечных точек и поддержки версий.
- Зарегистрировали доступные конечные точки инструментов и региональные конечные точки для глобального распределения.
- Реализовали логику динамической маршрутизации, выбирая подходящую конечную точку исходя из контекста пользователя, таких как регион и требования по локализации данных.
- Реализовали поддержку версий для инструментов, позволяя пользователям указывать, какую версию инструмента они хотят использовать.
- Использовали асинхронные HTTP-запросы для вызова инструментов и обработки ответов.

</details>

## Архитектура выборки и маршрутизации в MCP

Выборка — критически важный компонент протокола контекста модели (MCP), позволяющий эффективно обрабатывать запросы и маршрутизировать их. Она включает анализ входящих запросов для определения наиболее подходящей модели или сервиса с учётом различных факторов, таких как тип содержимого, контекст пользователя и нагрузка на систему.

Выборка и маршрутизация могут быть объединены для создания надёжной архитектуры, которая оптимизирует использование ресурсов и обеспечивает высокую доступность. Процесс выборки используется для классификации запросов, а маршрутизация — для направления их к соответствующим моделям или сервисам.

Схема ниже иллюстрирует, как выборка и маршрутизация работают совместно в комплексной архитектуре MCP:

```mermaid
flowchart TB
    Client([Клиент MCP])
    
    subgraph "Обработка запроса"
        Router{Маршрутизатор запросов}
        Analyzer[Анализатор контента]
        Sampler[Конфигуратор выборки]
    end
    
    subgraph "Выбор сервера"
        LoadBalancer{Балансировщик нагрузки}
        ModelSelector[Селектор модели]
        ServerPool[(Пул серверов)]
    end
    
    subgraph "Обработка модели"
        ModelA[Специализированная модель A]
        ModelB[Специализированная модель B]
        ModelC[Общая модель]
    end
    
    subgraph "Выполнение инструментов"
        ToolRouter{Маршрутизатор инструментов}
        ToolRegistryA[(Основные инструменты)]
        ToolRegistryB[(Региональные инструменты)]
    end
    
    Client -->|Запрос| Router
    Router -->|Анализ| Analyzer
    Analyzer -->|Конфигурация| Sampler
    Router -->|Маршрутизация запроса| LoadBalancer
    LoadBalancer --> ServerPool
    ServerPool --> ModelSelector
    ModelSelector --> ModelA
    ModelSelector --> ModelB
    ModelSelector --> ModelC
    
    ModelA -->|Вызовы инструментов| ToolRouter
    ModelB -->|Вызовы инструментов| ToolRouter
    ModelC -->|Вызовы инструментов| ToolRouter
    
    ToolRouter --> ToolRegistryA
    ToolRouter --> ToolRegistryB
    
    ToolRegistryA -->|Результаты| ModelA
    ToolRegistryA -->|Результаты| ModelB
    ToolRegistryA -->|Результаты| ModelC
    ToolRegistryB -->|Результаты| ModelA
    ToolRegistryB -->|Результаты| ModelB
    ToolRegistryB -->|Результаты| ModelC
    
    ModelA -->|Ответ| Client
    ModelB -->|Ответ| Client
    ModelC -->|Ответ| Client
    
    style Client fill:#d5e8f9,stroke:#333
    style Router fill:#f9d5e5,stroke:#333
    style LoadBalancer fill:#f9d5e5,stroke:#333
    style ToolRouter fill:#f9d5e5,stroke:#333
    style ModelA fill:#c2f0c2,stroke:#333
    style ModelB fill:#c2f0c2,stroke:#333
    style ModelC fill:#c2f0c2,stroke:#333
```

## Что дальше

- [5.6 Sampling](../mcp-sampling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->