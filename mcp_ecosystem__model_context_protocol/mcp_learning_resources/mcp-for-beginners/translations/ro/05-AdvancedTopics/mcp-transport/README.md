# Transporturi Personalizate MCP - Ghid Avansat de Implementare

Protocolul Contextului Modelului (MCP) oferă flexibilitate în mecanismele de transport, permițând implementări personalizate pentru medii enterprise specializate. Acest ghid avansat explorează implementări de transport personalizate folosind Azure Event Grid și Azure Event Hubs ca exemple practice pentru construirea de soluții MCP scalabile și native cloud.

> **Privind spre viitor:** acest ghid este scris conform **Specificației MCP 2025-11-25**, unde ordonarea sesiunilor trebuie păstrată pentru fiecare sesiune (vedeți Protocolul Mesajelor mai jos). Kandidatul de lansare `2026-07-28` elimină complet sesiunea la nivel de protocol și necesită antete `Mcp-Method`/`Mcp-Name` astfel încât gateway-urile și transporturile personalizate să poată face rutarea per cerere în loc de per sesiune. Vedeți [Ce Se Schimbă în MCP: Kandidatul de Lansare 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Introducere

În timp ce transporturile standard MCP (stdio și streaming HTTP) acoperă majoritatea cazurilor de utilizare, mediile enterprise necesită adesea mecanisme de transport specializate pentru scalabilitate, fiabilitate și integrare îmbunătățite cu infrastructura cloud existentă. Transporturile personalizate permit MCP să valorifice servicii de mesagerie native cloud pentru comunicare asincronă, arhitecturi eveniment-driven și procesare distribuită.

Această lecție explorează implementări avansate de transport bazate pe specificația MCP cea mai recentă (2025-11-25), serviciile de mesagerie Azure și modele consacrate de integrare enterprise.

### **Arhitectura Transportului MCP**

**Din Specificația MCP (2025-11-25):**

- **Transporturi Standard**: stdio (recomandat), streaming HTTP (pentru scenarii la distanță)
- **Transporturi Personalizate**: Orice transport care implementează protocolul de schimb de mesaje MCP
- **Format Mesaje**: JSON-RPC 2.0 cu extensii specifice MCP
- **Comunicare Bidirecțională**: Comunicare full duplex necesară pentru notificări și răspunsuri

## Obiectivele De Învățare

La finalul acestei lecții avansate, vei putea să:

- **Înțelegi Cerințele Transporturilor Personalizate**: Implementează protocolul MCP peste orice strat de transport păstrând conformitatea
- **Construiești Transport Azure Event Grid**: Creează servere MCP event-driven utilizând Azure Event Grid pentru scalabilitate serverless
- **Implementezi Transport Azure Event Hubs**: Proiectează soluții MCP cu throughput ridicat folosind Azure Event Hubs pentru streaming în timp real
- **Aplici Modele Enterprise**: Integrează transporturile personalizate cu infrastructura Azure existentă și modele de securitate
- **Gestionezi Fiabilitatea Transportului**: Implementează durabilitatea mesajelor, ordonarea și tratarea erorilor în scenarii enterprise
- **Optimizezi Performanța**: Proiectează soluții de transport pentru cerințele de scală, latență și throughput

## **Cerințe Transport**

### **Cerințe de Bază din Specificația MCP (2025-11-25):**

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

## **Implementare Transport Azure Event Grid**

Azure Event Grid oferă un serviciu serverless de rutare a evenimentelor, ideal pentru arhitecturi MCP bazate pe evenimente. Această implementare demonstrează cum să construiești sisteme MCP scalabile și slab cuplate.

### **Prezentare Arhitectură**

```mermaid
graph TB
    Client[Client MCP] --> EG[Azure Event Grid]
    EG --> Server[Funcție Server MCP]
    Server --> EG
    EG --> Client
    
    subgraph "Servicii Azure"
        EG
        Server
        KV[Seif de Chei]
        Monitor[Application Insights]
    end
```

### **Implementare C# - Transport Event Grid**

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

### **Implementare TypeScript - Transport Event Grid**

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
    
    // Recepție bazată pe evenimente prin Azure Functions
    onMessage(handler: (message: McpMessage) => Promise<void>): void {
        // Implementarea ar folosi un declanșator Event Grid în Azure Functions
        // Aceasta este o interfață conceptuală pentru receptorul webhook
    }
}

// Implementare Azure Functions
import { app, InvocationContext, EventGridEvent } from "@azure/functions";

app.eventGrid("mcpEventGridHandler", {
    handler: async (event: EventGridEvent, context: InvocationContext) => {
        try {
            const mcpMessage = event.data as McpMessage;
            
            // Procesează mesajul MCP
            const response = await mcpServer.processMessage(mcpMessage);
            
            // Trimite răspunsul prin Event Grid
            await transport.sendMessage(response);
            
        } catch (error) {
            context.error("Error processing MCP message:", error);
            throw error;
        }
    }
});
```

### **Implementare Python - Transport Event Grid**

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

# Implementarea Azure Functions
import azure.functions as func
import logging

def main(event: func.EventGridEvent) -> None:
    """Azure Functions Event Grid trigger for MCP messages"""
    try:
        # Analizează mesajul MCP din evenimentul Event Grid
        mcp_message = json.loads(event.get_body().decode('utf-8'))
        
        # Procesează mesajul MCP
        response = process_mcp_message(mcp_message)
        
        # Trimite răspunsul înapoi prin Event Grid
        # (Implementarea ar crea un nou client Event Grid)
        
    except Exception as e:
        logging.error(f"Error processing MCP Event Grid message: {e}")
        raise
```

## **Implementare Transport Azure Event Hubs**

Azure Event Hubs oferă capabilități de streaming în timp real cu throughput ridicat pentru scenariile MCP ce necesită latență scăzută și volum mare de mesaje.

### **Prezentare Arhitectură**

```mermaid
graph TB
    Client[Client MCP] --> EH[Azure Event Hubs]
    EH --> Server[Server MCP]
    Server --> EH
    EH --> Client
    
    subgraph "Caracteristici Event Hubs"
        Partition[Partajare]
        Retention[Reținerea mesajelor]
        Scaling[Scalare automată]
    end
    
    EH --> Partition
    EH --> Retention
    EH --> Scaling
```

### **Implementare C# - Transport Event Hubs**

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

### **Implementare TypeScript - Transport Event Hubs**

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
                        
                        // Actualizează punctul de control pentru livrare cel puțin o dată
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

### **Implementare Python - Transport Event Hubs**

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
        
        # Adaugă proprietăți specifice MCP
        event_data.properties = {
            "messageType": message.get("method", "response"),
            "messageId": message.get("id"),
            "timestamp": "2025-01-14T10:30:00Z"  # Folosește timestamp-ul real
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
                starting_position="-1"  # Pornește de la început
            )
    
    def _on_event_received(self, handler: Callable):
        """Internal event handler wrapper"""
        async def handle_event(partition_context, event):
            try:
                # Parsează mesajul MCP din evenimentul Event Hubs
                message_body = event.body_as_str(encoding='UTF-8')
                mcp_message = json.loads(message_body)
                
                # Procesează mesajul MCP
                await handler(mcp_message)
                
                # Actualizează checkpoint-ul pentru livrare cel puțin o dată
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

## **Modele Avansate de Transport**

### **Durabilitatea și Fiabilitatea Mesajelor**

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

### **Integrarea Securității Transportului**

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

### **Monitorizarea și Observabilitatea Transportului**

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

## **Scenarii de Integrare Enterprise**

### **Scenariul 1: Procesare MCP Distribuită**

Utilizarea Azure Event Grid pentru distribuirea cererilor MCP către mai multe noduri de procesare:

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

### **Scenariul 2: Streaming MCP în timp real**

Utilizarea Azure Event Hubs pentru interacțiuni MCP de frecvență ridicată:

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

### **Scenariul 3: Arhitectură Hibridă de Transport**

Combinarea mai multor transporturi pentru cazuri de utilizare diferite:

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

## **Optimizarea Performanței**

### **Gruparea Mesajelor pentru Event Grid**

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

### **Strategia de Partiționare pentru Event Hubs**

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

## **Testarea Transporturilor Personalizate**

### **Testare Unită cu Obiecte Duble de Testare**

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

### **Testare de Integrare cu Containere Azure Test**

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

## **Cele Mai Bune Practici și Ghiduri**

### **Principiile Designului Transportului**

1. **Idempotentă**: Asigură procesarea idempotentă a mesajelor pentru a gestiona duplicatele
2. **Gestionare Erori**: Implementează gestionarea completă a erorilor și cozi dead letter
3. **Monitorizare**: Adaugă telemetrie detaliată și verificări de sănătate
4. **Securitate**: Utilizează identități gestionate și acces cu privilegiul minim necesar
5. **Performanță**: Proiectează pentru cerințele tale specifice de latență și throughput

### **Recomandări Specifice Azure**

1. **Folosește Identitate Gestionată**: Evită utilizarea stringurilor de conexiune în producție
2. **Implementează Circuit Breakers**: Protejează împotriva întreruperilor serviciilor Azure
3. **Monitorizează Costurile**: Urmărește volumul mesajelor și costurile de procesare
4. **Planifică pentru Scală**: Proiectează devreme strategiile de partiționare și scalare
5. **Testează Temeinic**: Folosește Azure DevTest Labs pentru testare cuprinzătoare

## **Concluzie**

Transporturile personalizate MCP permit scenarii puternice enterprise folosind serviciile de mesagerie Azure. Prin implementarea transporturilor Event Grid sau Event Hubs, poți construi soluții MCP scalabile și fiabile care se integrează perfect cu infrastructura Azure existentă.

Exemplele oferite demonstrează modele gata de producție pentru implementarea transporturilor personalizate, menținând conformitatea cu protocolul MCP și bunele practici Azure.

## **Resurse Suplimentare**

- [Specificația MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/)
- [Documentație Azure Event Grid](https://docs.microsoft.com/azure/event-grid/)
- [Documentație Azure Event Hubs](https://docs.microsoft.com/azure/event-hubs/)
- [Trigger Azure Functions Event Grid](https://docs.microsoft.com/azure/azure-functions/functions-bindings-event-grid)
- [SDK Azure pentru .NET](https://github.com/Azure/azure-sdk-for-net)
- [SDK Azure pentru TypeScript](https://github.com/Azure/azure-sdk-for-js)
- [SDK Azure pentru Python](https://github.com/Azure/azure-sdk-for-python)

---

> *Acest ghid se concentrează pe modele practice de implementare pentru sisteme MCP de producție. Validați întotdeauna implementările transporturilor conform cerințelor voastre specifice și limitărilor serviciilor Azure.*
> **Standard Actual**: Acest ghid reflectă [Specificația MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) privind cerințele transporturilor și modelele avansate de transport pentru mediile enterprise.


## Ce Urmează
- [6. Contribuții Comunitare](../../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->