# MCP Vlastní přenosy - Pokročilý průvodce implementací

Model Context Protocol (MCP) poskytuje flexibilitu v komunikačních mechanizmech, což umožňuje vlastní implementace pro specializovaná podniková prostředí. Tento pokročilý průvodce zkoumá vlastní implementace přenosů na praktických příkladech využívajících Azure Event Grid a Azure Event Hubs pro vytváření škálovatelných, cloudově-nativních řešení MCP.

> **Pohled do budoucna:** tento průvodce je napsán podle **MCP specifikace 2025-11-25**, kde musí být zachováno pořadí zpráv v rámci jedné relace (viz Protokol zpráv níže). Release candidate `2026-07-28` zcela odstraňuje úroveň relace na protokolu a vyžaduje hlavičky `Mcp-Method`/`Mcp-Name`, aby brány a vlastní přenosy mohly směrovat na úrovni jednotlivých požadavků místo relací. Viz [Co se mění v MCP: Release Candidate 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Úvod

Zatímco standardní přenosy MCP (stdio a HTTP streaming) pokrývají většinu běžných případů, podniková prostředí často vyžadují specializované přenosové mechanismy pro lepší škálovatelnost, spolehlivost a integraci se stávající cloudovou infrastrukturou. Vlastní přenosy umožňují MCP využívat nativní cloudové messaging služby pro asynchronní komunikaci, event-driven architektury a distribuované zpracování.

Tato lekce zkoumá pokročilé implementace přenosů založené na nejnovější MCP specifikaci (2025-11-25), Azure messaging službách a osvědčených podnikově integračních vzorcích.

### **Architektura MCP přenosů**

**Z MCP specifikace (2025-11-25):**

- **Standardní přenosy**: stdio (doporučeno), HTTP streaming (pro vzdálené scénáře)
- **Vlastní přenosy**: jakýkoli přenos, který implementuje MCP protokol výměny zpráv
- **Formát zpráv**: JSON-RPC 2.0 s MCP-specifickými rozšířeními
- **Obousměrná komunikace**: požadována plně duplexní komunikace pro notifikace a odpovědi

## Cíle učení

Na konci této pokročilé lekce budete schopni:

- **Porozumět požadavkům na vlastní přenosy**: implementovat MCP protokol nad libovolnou transportní vrstvou při zachování souladu
- **Vybudovat přenos pomocí Azure Event Grid**: vytvářet event-driven MCP servery pro serverless škálovatelnost
- **Implementovat přenos pomocí Azure Event Hubs**: navrhnout MCP řešení s vysokou propustností využívající Azure Event Hubs pro streamování v reálném čase
- **Aplikovat podnikové vzory**: integrovat vlastní přenosy s existující Azure infrastrukturou a bezpečnostními modely
- **Zajistit spolehlivost přenosu**: implementovat trvalost zpráv, pořadí a zpracování chyb pro podniková prostředí
- **Optimalizovat výkon**: navrhovat přenosová řešení podle požadavků na škálovatelnost, latenci a propustnost

## **Požadavky na přenosy**

### **Základní požadavky z MCP specifikace (2025-11-25):**

```yaml
Message Protocol:
  format: "JSON-RPC 2.0 with MCP extensions"
  bidirectional: "Full duplex communication required"
  ordering: "Message ordering must be preserved per session"
  
Transport Layer:
  reliability: "Transport MUST handle connection failures gracefully"
  security: "Transport MUST support secure communication"
  identification: "Each session MUST have unique identifier"
  
Custom Transport:
  compliance: "MUST implement complete MCP message exchange"
  extensibility: "MAY add transport-specific features"
  interoperability: "MUST maintain protocol compatibility"
```

## **Implementace přenosu pomocí Azure Event Grid**

Azure Event Grid poskytuje serverless službu směrování událostí ideální pro event-driven MCP architektury. Tato implementace ukazuje, jak vytvořit škálovatelné, volně spojené MCP systémy.

### **Přehled architektury**

```mermaid
graph TB
    Client[MCP klient] --> EG[Azure Event Grid]
    EG --> Server[Funkce MCP serveru]
    Server --> EG
    EG --> Client
    
    subgraph "Azure služby"
        EG
        Server
        KV[Key Vault]
        Monitor[Application Insights]
    end
```

### **Implementace v C# - přenos Event Grid**

```csharp
using Azure.Messaging.EventGrid;
using Microsoft.Extensions.Azure;
using System.Text.Json;

public class EventGridMcpTransport : IMcpTransport
{
    private readonly EventGridPublisherClient _publisher;
    private readonly string _topicEndpoint;
    private readonly string _clientId;
    
    public EventGridMcpTransport(string topicEndpoint, string accessKey, string clientId)
    {
        _publisher = new EventGridPublisherClient(
            new Uri(topicEndpoint), 
            new AzureKeyCredential(accessKey));
        _topicEndpoint = topicEndpoint;
        _clientId = clientId;
    }
    
    public async Task SendMessageAsync(McpMessage message)
    {
        var eventGridEvent = new EventGridEvent(
            subject: $"mcp/{_clientId}",
            eventType: "MCP.MessageReceived",
            dataVersion: "1.0",
            data: JsonSerializer.Serialize(message))
        {
            Id = Guid.NewGuid().ToString(),
            EventTime = DateTimeOffset.UtcNow
        };
        
        await _publisher.SendEventAsync(eventGridEvent);
    }
    
    public async Task<McpMessage> ReceiveMessageAsync(CancellationToken cancellationToken)
    {
        // Event Grid is push-based, so implement webhook receiver
        // This would typically be handled by Azure Functions trigger
        throw new NotImplementedException("Use EventGridTrigger in Azure Functions");
    }
}

// Azure Function for receiving Event Grid events
[FunctionName("McpEventGridReceiver")]
public async Task<IActionResult> HandleEventGridMessage(
    [EventGridTrigger] EventGridEvent eventGridEvent,
    ILogger log)
{
    try
    {
        var mcpMessage = JsonSerializer.Deserialize<McpMessage>(
            eventGridEvent.Data.ToString());
        
        // Process MCP message
        var response = await _mcpServer.ProcessMessageAsync(mcpMessage);
        
        // Send response back via Event Grid
        await _transport.SendMessageAsync(response);
        
        return new OkResult();
    }
    catch (Exception ex)
    {
        log.LogError(ex, "Error processing Event Grid MCP message");
        return new BadRequestResult();
    }
}
```

### **Implementace v TypeScript - přenos Event Grid**

```typescript
import { EventGridPublisherClient, AzureKeyCredential } from "@azure/eventgrid";
import { McpTransport, McpMessage } from "./mcp-types";

export class EventGridMcpTransport implements McpTransport {
    private publisher: EventGridPublisherClient;
    private clientId: string;
    
    constructor(
        private topicEndpoint: string,
        private accessKey: string,
        clientId: string
    ) {
        this.publisher = new EventGridPublisherClient(
            topicEndpoint,
            new AzureKeyCredential(accessKey)
        );
        this.clientId = clientId;
    }
    
    async sendMessage(message: McpMessage): Promise<void> {
        const event = {
            id: crypto.randomUUID(),
            source: `mcp-client-${this.clientId}`,
            type: "MCP.MessageReceived",
            time: new Date(),
            data: message
        };
        
        await this.publisher.sendEvents([event]);
    }
    
    // Přijímání řízené událostmi pomocí Azure Functions
    onMessage(handler: (message: McpMessage) => Promise<void>): void {
        // Implementace by použila spouštěč Event Grid pro Azure Functions
        // Toto je konceptuální rozhraní pro příjemce webhooku
    }
}

// Implementace pro Azure Functions
import { app, InvocationContext, EventGridEvent } from "@azure/functions";

app.eventGrid("mcpEventGridHandler", {
    handler: async (event: EventGridEvent, context: InvocationContext) => {
        try {
            const mcpMessage = event.data as McpMessage;
            
            // Zpracovat zprávu MCP
            const response = await mcpServer.processMessage(mcpMessage);
            
            // Odeslat odpověď přes Event Grid
            await transport.sendMessage(response);
            
        } catch (error) {
            context.error("Error processing MCP message:", error);
            throw error;
        }
    }
});
```

### **Implementace v Python - přenos Event Grid**

```python
from azure.eventgrid import EventGridPublisherClient, EventGridEvent
from azure.core.credentials import AzureKeyCredential
import asyncio
import json
from typing import Callable, Optional
import uuid
from datetime import datetime

class EventGridMcpTransport:
    def __init__(self, topic_endpoint: str, access_key: str, client_id: str):
        self.client = EventGridPublisherClient(
            topic_endpoint, 
            AzureKeyCredential(access_key)
        )
        self.client_id = client_id
        self.message_handler: Optional[Callable] = None
    
    async def send_message(self, message: dict) -> None:
        """Send MCP message via Event Grid"""
        event = EventGridEvent(
            data=message,
            subject=f"mcp/{self.client_id}",
            event_type="MCP.MessageReceived",
            data_version="1.0"
        )
        
        await self.client.send(event)
    
    def on_message(self, handler: Callable[[dict], None]) -> None:
        """Register message handler for incoming events"""
        self.message_handler = handler

# Implementace Azure Functions
import azure.functions as func
import logging

def main(event: func.EventGridEvent) -> None:
    """Azure Functions Event Grid trigger for MCP messages"""
    try:
        # Zpracovat MCP zprávu z události Event Grid
        mcp_message = json.loads(event.get_body().decode('utf-8'))
        
        # Zpracovat MCP zprávu
        response = process_mcp_message(mcp_message)
        
        # Odeslat odpověď zpět přes Event Grid
        # (Implementace by vytvořila nového klienta Event Grid)
        
    except Exception as e:
        logging.error(f"Error processing MCP Event Grid message: {e}")
        raise
```

## **Implementace přenosu pomocí Azure Event Hubs**

Azure Event Hubs poskytuje vysokopropustné streamovací schopnosti v reálném čase pro MCP scénáře vyžadující nízkou latenci a vysoký objem zpráv.

### **Přehled architektury**

```mermaid
graph TB
    Client[MCP klient] --> EH[Azure Event Hubs]
    EH --> Server[MCP server]
    Server --> EH
    EH --> Client
    
    subgraph "Funkce Event Hubs"
        Partition[Particionování]
        Retention[Uchovávání zpráv]
        Scaling[Automatické škálování]
    end
    
    EH --> Partition
    EH --> Retention
    EH --> Scaling
```

### **Implementace v C# - přenos Event Hubs**

```csharp
using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Producer;
using Azure.Messaging.EventHubs.Consumer;
using System.Text;

public class EventHubsMcpTransport : IMcpTransport, IDisposable
{
    private readonly EventHubProducerClient _producer;
    private readonly EventHubConsumerClient _consumer;
    private readonly string _consumerGroup;
    private readonly CancellationTokenSource _cancellationTokenSource;
    
    public EventHubsMcpTransport(
        string connectionString, 
        string eventHubName,
        string consumerGroup = "$Default")
    {
        _producer = new EventHubProducerClient(connectionString, eventHubName);
        _consumer = new EventHubConsumerClient(
            consumerGroup, 
            connectionString, 
            eventHubName);
        _consumerGroup = consumerGroup;
        _cancellationTokenSource = new CancellationTokenSource();
    }
    
    public async Task SendMessageAsync(McpMessage message)
    {
        var messageBody = JsonSerializer.Serialize(message);
        var eventData = new EventData(Encoding.UTF8.GetBytes(messageBody));
        
        // Add MCP-specific properties
        eventData.Properties.Add("MessageType", message.Method ?? "response");
        eventData.Properties.Add("MessageId", message.Id);
        eventData.Properties.Add("Timestamp", DateTimeOffset.UtcNow);
        
        await _producer.SendAsync(new[] { eventData });
    }
    
    public async Task StartReceivingAsync(
        Func<McpMessage, Task> messageHandler)
    {
        await foreach (PartitionEvent partitionEvent in _consumer.ReadEventsAsync(
            _cancellationTokenSource.Token))
        {
            try
            {
                var messageBody = Encoding.UTF8.GetString(
                    partitionEvent.Data.EventBody.ToArray());
                var mcpMessage = JsonSerializer.Deserialize<McpMessage>(messageBody);
                
                await messageHandler(mcpMessage);
            }
            catch (Exception ex)
            {
                // Handle deserialization or processing errors
                Console.WriteLine($"Error processing message: {ex.Message}");
            }
        }
    }
    
    public void Dispose()
    {
        _cancellationTokenSource?.Cancel();
        _producer?.DisposeAsync().AsTask().Wait();
        _consumer?.DisposeAsync().AsTask().Wait();
        _cancellationTokenSource?.Dispose();
    }
}
```

### **Implementace v TypeScript - přenos Event Hubs**

```typescript
import { 
    EventHubProducerClient, 
    EventHubConsumerClient, 
    EventData 
} from "@azure/event-hubs";

export class EventHubsMcpTransport implements McpTransport {
    private producer: EventHubProducerClient;
    private consumer: EventHubConsumerClient;
    private isReceiving = false;
    
    constructor(
        private connectionString: string,
        private eventHubName: string,
        private consumerGroup: string = "$Default"
    ) {
        this.producer = new EventHubProducerClient(
            connectionString, 
            eventHubName
        );
        this.consumer = new EventHubConsumerClient(
            consumerGroup,
            connectionString,
            eventHubName
        );
    }
    
    async sendMessage(message: McpMessage): Promise<void> {
        const eventData: EventData = {
            body: JSON.stringify(message),
            properties: {
                messageType: message.method || "response",
                messageId: message.id,
                timestamp: new Date().toISOString()
            }
        };
        
        await this.producer.sendBatch([eventData]);
    }
    
    async startReceiving(
        messageHandler: (message: McpMessage) => Promise<void>
    ): Promise<void> {
        if (this.isReceiving) return;
        
        this.isReceiving = true;
        
        const subscription = this.consumer.subscribe({
            processEvents: async (events, context) => {
                for (const event of events) {
                    try {
                        const messageBody = event.body as string;
                        const mcpMessage: McpMessage = JSON.parse(messageBody);
                        
                        await messageHandler(mcpMessage);
                        
                        // Aktualizovat kontrolní bod pro alespoň jedno doručení
                        await context.updateCheckpoint(event);
                    } catch (error) {
                        console.error("Error processing Event Hubs message:", error);
                    }
                }
            },
            processError: async (err, context) => {
                console.error("Event Hubs error:", err);
            }
        });
    }
    
    async close(): Promise<void> {
        this.isReceiving = false;
        await this.producer.close();
        await this.consumer.close();
    }
}
```

### **Implementace v Python - přenos Event Hubs**

```python
from azure.eventhub import EventHubProducerClient, EventHubConsumerClient
from azure.eventhub import EventData
import json
import asyncio
from typing import Callable, Dict, Any
import logging

class EventHubsMcpTransport:
    def __init__(
        self, 
        connection_string: str, 
        eventhub_name: str,
        consumer_group: str = "$Default"
    ):
        self.producer = EventHubProducerClient.from_connection_string(
            connection_string, 
            eventhub_name=eventhub_name
        )
        self.consumer = EventHubConsumerClient.from_connection_string(
            connection_string,
            consumer_group=consumer_group,
            eventhub_name=eventhub_name
        )
        self.is_receiving = False
    
    async def send_message(self, message: Dict[str, Any]) -> None:
        """Send MCP message via Event Hubs"""
        event_data = EventData(json.dumps(message))
        
        # Přidejte vlastnosti specifické pro MCP
        event_data.properties = {
            "messageType": message.get("method", "response"),
            "messageId": message.get("id"),
            "timestamp": "2025-01-14T10:30:00Z"  # Použijte aktuální časové razítko
        }
        
        async with self.producer:
            event_data_batch = await self.producer.create_batch()
            event_data_batch.add(event_data)
            await self.producer.send_batch(event_data_batch)
    
    async def start_receiving(
        self, 
        message_handler: Callable[[Dict[str, Any]], None]
    ) -> None:
        """Start receiving MCP messages from Event Hubs"""
        if self.is_receiving:
            return
        
        self.is_receiving = True
        
        async with self.consumer:
            await self.consumer.receive(
                on_event=self._on_event_received(message_handler),
                starting_position="-1"  # Začněte od začátku
            )
    
    def _on_event_received(self, handler: Callable):
        """Internal event handler wrapper"""
        async def handle_event(partition_context, event):
            try:
                # Analyzujte zprávu MCP z události Event Hubs
                message_body = event.body_as_str(encoding='UTF-8')
                mcp_message = json.loads(message_body)
                
                # Zpracujte zprávu MCP
                await handler(mcp_message)
                
                # Aktualizujte kontrolní bod pro doručení alespoň jednou
                await partition_context.update_checkpoint(event)
                
            except Exception as e:
                logging.error(f"Error processing Event Hubs message: {e}")
        
        return handle_event
    
    async def close(self) -> None:
        """Clean up transport resources"""
        self.is_receiving = False
        await self.producer.close()
        await self.consumer.close()
```

## **Pokročilé vzory přenosů**

### **Trvalost a spolehlivost zpráv**

```csharp
// Implementing message durability with retry logic
public class ReliableTransportWrapper : IMcpTransport
{
    private readonly IMcpTransport _innerTransport;
    private readonly RetryPolicy _retryPolicy;
    
    public async Task SendMessageAsync(McpMessage message)
    {
        await _retryPolicy.ExecuteAsync(async () =>
        {
            try
            {
                await _innerTransport.SendMessageAsync(message);
            }
            catch (TransportException ex) when (ex.IsRetryable)
            {
                // Log and retry
                throw;
            }
        });
    }
}
```

### **Integrace bezpečnosti přenosu**

```csharp
// Integrating Azure Key Vault for transport security
public class SecureTransportFactory
{
    private readonly SecretClient _keyVaultClient;
    
    public async Task<IMcpTransport> CreateEventGridTransportAsync()
    {
        var accessKey = await _keyVaultClient.GetSecretAsync("EventGridAccessKey");
        var topicEndpoint = await _keyVaultClient.GetSecretAsync("EventGridTopic");
        
        return new EventGridMcpTransport(
            topicEndpoint.Value.Value,
            accessKey.Value.Value,
            Environment.MachineName
        );
    }
}
```

### **Monitorování a pozorovatelnost přenosu**

```csharp
// Adding telemetry to custom transports
public class ObservableTransport : IMcpTransport
{
    private readonly IMcpTransport _transport;
    private readonly ILogger _logger;
    private readonly TelemetryClient _telemetryClient;
    
    public async Task SendMessageAsync(McpMessage message)
    {
        using var activity = Activity.StartActivity("MCP.Transport.Send");
        activity?.SetTag("transport.type", "EventGrid");
        activity?.SetTag("message.method", message.Method);
        
        var stopwatch = Stopwatch.StartNew();
        
        try
        {
            await _transport.SendMessageAsync(message);
            
            _telemetryClient.TrackDependency(
                "EventGrid",
                "SendMessage",
                DateTime.UtcNow.Subtract(stopwatch.Elapsed),
                stopwatch.Elapsed,
                true
            );
        }
        catch (Exception ex)
        {
            _telemetryClient.TrackException(ex);
            throw;
        }
    }
}
```

## **Podnikové integrační scénáře**

### **Scénář 1: Distribuované MCP zpracování**

Využití Azure Event Grid k distribuci MCP požadavků mezi více zpracovatelských uzlů:

```yaml
Architecture:
  - MCP Client sends requests to Event Grid topic
  - Multiple Azure Functions subscribe to process different tool types
  - Results aggregated and returned via separate response topic
  
Benefits:
  - Horizontal scaling based on message volume
  - Fault tolerance through redundant processors
  - Cost optimization with serverless compute
```

### **Scénář 2: Streamování MCP v reálném čase**

Využití Azure Event Hubs pro vysoce frekventované MCP interakce:

```yaml
Architecture:
  - MCP Client streams continuous requests via Event Hubs
  - Stream Analytics processes and routes messages
  - Multiple consumers handle different aspect of processing
  
Benefits:
  - Low latency for real-time scenarios
  - High throughput for batch processing
  - Built-in partitioning for parallel processing
```

### **Scénář 3: Hybridní architektura přenosů**

Kombinace více přenosů pro různé případy použití:

```csharp
public class HybridMcpTransport : IMcpTransport
{
    private readonly IMcpTransport _realtimeTransport; // Event Hubs
    private readonly IMcpTransport _batchTransport;    // Event Grid
    private readonly IMcpTransport _fallbackTransport; // HTTP Streaming
    
    public async Task SendMessageAsync(McpMessage message)
    {
        // Route based on message characteristics
        var transport = message.Method switch
        {
            "tools/call" when IsRealtime(message) => _realtimeTransport,
            "resources/read" when IsBatch(message) => _batchTransport,
            _ => _fallbackTransport
        };
        
        await transport.SendMessageAsync(message);
    }
}
```

## **Optimalizace výkonu**

### **Hromadné zpracování zpráv pro Event Grid**

```csharp
public class BatchingEventGridTransport : IMcpTransport
{
    private readonly List<McpMessage> _messageBuffer = new();
    private readonly Timer _flushTimer;
    private const int MaxBatchSize = 100;
    
    public async Task SendMessageAsync(McpMessage message)
    {
        lock (_messageBuffer)
        {
            _messageBuffer.Add(message);
            
            if (_messageBuffer.Count >= MaxBatchSize)
            {
                _ = Task.Run(FlushMessages);
            }
        }
    }
    
    private async Task FlushMessages()
    {
        List<McpMessage> toSend;
        lock (_messageBuffer)
        {
            toSend = new List<McpMessage>(_messageBuffer);
            _messageBuffer.Clear();
        }
        
        if (toSend.Any())
        {
            var events = toSend.Select(CreateEventGridEvent);
            await _publisher.SendEventsAsync(events);
        }
    }
}
```

### **Strategie partitioningu pro Event Hubs**

```csharp
public class PartitionedEventHubsTransport : IMcpTransport
{
    public async Task SendMessageAsync(McpMessage message)
    {
        // Partition by client ID for session affinity
        var partitionKey = ExtractClientId(message);
        
        var eventData = new EventData(JsonSerializer.SerializeToUtf8Bytes(message))
        {
            PartitionKey = partitionKey
        };
        
        await _producer.SendAsync(new[] { eventData });
    }
}
```

## **Testování vlastních přenosů**

### **Jednotkové testování s testovacími dvojičkami**

```csharp
[Test]
public async Task EventGridTransport_SendMessage_PublishesCorrectEvent()
{
    // Arrange
    var mockPublisher = new Mock<EventGridPublisherClient>();
    var transport = new EventGridMcpTransport(mockPublisher.Object);
    var message = new McpMessage { Method = "tools/list", Id = "test-123" };
    
    // Act
    await transport.SendMessageAsync(message);
    
    // Assert
    mockPublisher.Verify(
        x => x.SendEventAsync(
            It.Is<EventGridEvent>(e => 
                e.EventType == "MCP.MessageReceived" &&
                e.Subject == "mcp/test-client"
            )
        ),
        Times.Once
    );
}
```

### **Integrační testování s Azure Test Containers**

```csharp
[Test]
public async Task EventHubsTransport_IntegrationTest()
{
    // Using Testcontainers for integration testing
    var eventHubsContainer = new EventHubsContainer()
        .WithEventHub("test-hub");
    
    await eventHubsContainer.StartAsync();
    
    var transport = new EventHubsMcpTransport(
        eventHubsContainer.GetConnectionString(),
        "test-hub"
    );
    
    // Test message round-trip
    var sentMessage = new McpMessage { Method = "test", Id = "123" };
    McpMessage receivedMessage = null;
    
    await transport.StartReceivingAsync(msg => {
        receivedMessage = msg;
        return Task.CompletedTask;
    });
    
    await transport.SendMessageAsync(sentMessage);
    await Task.Delay(1000); // Allow for message processing
    
    Assert.That(receivedMessage?.Id, Is.EqualTo("123"));
}
```

## **Nejlepší postupy a směrnice**

### **Zásady návrhu přenosu**

1. **Idempotentnost**: Zajistěte idempotentní zpracování zpráv pro zvládání duplicit
2. **Zpracování chyb**: Implementujte komplexní zpracování chyb a dead letter fronty
3. **Monitorování**: Přidejte podrobnou telemetrii a kontroly stavu
4. **Bezpečnost**: Používejte spravované identity a princip nejmenších práv
5. **Výkon**: Navrhujte podle specifických požadavků na latenci a propustnost

### **Azure-specifická doporučení**

1. **Používejte spravovanou identitu**: vyhněte se connection stringům v produkci
2. **Implementujte vypínače obvodů**: chraňte se před výpadky Azure služeb
3. **Sledujte náklady**: monitorujte objem zpráv a náklady na zpracování
4. **Plánujte škálování**: časně navrhněte partitioning a škálovací strategie
5. **Důkladně testujte**: využívejte Azure DevTest Labs pro komplexní testování

## **Závěr**

Vlastní MCP přenosy umožňují silné podnikově orientované scénáře využívající Azure messaging služby. Implementací přenosů Event Grid nebo Event Hubs můžete vybudovat škálovatelná, spolehlivá MCP řešení, která se hladce integrují s existující Azure infrastrukturou.

Uvedené příklady demonstrují výrobně připravené vzory implementace vlastních přenosů při zachování souladu s MCP protokolem a osvědčených praktik Azure.

## **Další zdroje**

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/)
- [Dokumentace Azure Event Grid](https://docs.microsoft.com/azure/event-grid/)
- [Dokumentace Azure Event Hubs](https://docs.microsoft.com/azure/event-hubs/)
- [Azure Functions Event Grid Trigger](https://docs.microsoft.com/azure/azure-functions/functions-bindings-event-grid)
- [Azure SDK pro .NET](https://github.com/Azure/azure-sdk-for-net)
- [Azure SDK pro TypeScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure SDK pro Python](https://github.com/Azure/azure-sdk-for-python)

---

> *Tento průvodce se zaměřuje na praktické implementační vzory pro produkční MCP systémy. Vždy ověřujte implementace přenosů vůči svým specifickým požadavkům a limitům Azure služeb.*
> **Aktuální standard**: Tento průvodce odráží [MCP specifikaci 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) požadavky na přenosy a pokročilé přenosové vzory pro podniková prostředí.


## Co dál
- [6. Příspěvky komunity](../../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->