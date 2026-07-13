# MCP Prilagođeni Transporti - Vodič za Naprednu Implementaciju

Protokol konteksta modela (Model Context Protocol, MCP) pruža fleksibilnost u mehanizmima prijenosa, omogućujući prilagođene implementacije za specijalizirana poduzeća. Ovaj napredni vodič istražuje prilagođene implementacije transporta koristeći Azure Event Grid i Azure Event Hubs kao praktične primjere za izgradnju skalabilnih, cloud-native MCP rješenja.

> **Gledajući unaprijed:** ovaj je vodič napisan prema **MCP specifikaciji 2025-11-25**, gdje se mora sačuvati redoslijed sesija zasebno za svaku sesiju (vidi Protokol poruka u nastavku). Kandidat za izdanje `2026-07-28` u potpunosti uklanja sesiju na razini protokola i zahtijeva `Mcp-Method`/`Mcp-Name` zaglavlja kako bi se pristupnici i prilagođeni transporti mogli usmjeravati po zahtjevu umjesto po sesiji. Vidi [Što se mijenja u MCP: Kandidat za izdanje 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Uvod

Iako standardni MCP transporti (stdio i HTTP streaming) pokrivaju većinu slučajeva upotrebe, okruženja poduzeća često zahtijevaju specijalizirane mehanizme transporta radi poboljšane skalabilnosti, pouzdanosti i integracije s postojećom cloud infrastrukturom. Prilagođeni transporti omogućuju MCP-u da koristi cloud-native usluge razmjene poruka za asinkronu komunikaciju, arhitekture vođene događajima i distribuiranu obradu.

Ova lekcija istražuje napredne implementacije transporta na temelju najnovije MCP specifikacije (2025-11-25), Azure usluga razmjene poruka i ustaljenih obrazaca integracije u poduzećima.

### **Arhitektura MCP Transporta**

**Iz MCP specifikacije (2025-11-25):**

- **Standardni transporti**: stdio (preporučeno), HTTP streaming (za udaljene scenarije)
- **Prilagođeni transporti**: Bilo koji transport koji implementira MCP protokol razmjene poruka
- **Format poruke**: JSON-RPC 2.0 s MCP-specifičnim proširenjima
- **Dvosmjerna komunikacija**: Potrebna je puna duplex komunikacija za obavijesti i odgovore

## Ciljevi učenja

Do kraja ove napredne lekcije moći ćete:

- **Razumjeti zahtjeve prilagođenog transporta**: Implementirati MCP protokol preko bilo kojeg sloja transporta uz održavanje sukladnosti
- **Izgraditi Azure Event Grid transport**: Kreirati MCP servere vođene događajima koristeći Azure Event Grid za bezposlužnu skalabilnost
- **Implementirati Azure Event Hubs transport**: Dizajnirati MCP rješenja visokog protoka koristeći Azure Event Hubs za streaming u stvarnom vremenu
- **Primijeniti obrasce poduzeća**: Integrirati prilagođene transporte s postojećom Azure infrastrukturom i sigurnosnim modelima
- **Rješavati pouzdanost transporta**: Implementirati trajnost poruka, redoslijed i rukovanje pogreškama za scenarije poduzeća
- **Optimizirati performanse**: Dizajnirati transportna rješenja za zahtjeve skalabilnosti, latencije i propusnosti

## **Zahtjevi transporta**

### **Osnovni zahtjevi iz MCP specifikacije (2025-11-25):**

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

## **Implementacija Azure Event Grid transporta**

Azure Event Grid pruža bezposlužnu uslugu usmjeravanja događaja idealnu za MCP arhitekture vođene događajima. Ova implementacija pokazuje kako izgraditi skalabilne, slabo povezane MCP sustave.

### **Pregled arhitekture**

```mermaid
graph TB
    Client[MCP Klijent] --> EG[Azure Event Grid]
    EG --> Server[MCP Server Funkcija]
    Server --> EG
    EG --> Client
    
    subgraph "Azure Usluge"
        EG
        Server
        KV[Key Vault]
        Monitor[Application Insights]
    end
```

### **Implementacija u C# - Event Grid transport**

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

### **Implementacija u TypeScript - Event Grid transport**

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
    
    // Primanje temeljeno na događajima putem Azure Functions
    onMessage(handler: (message: McpMessage) => Promise<void>): void {
        // Implementacija bi koristila Azure Functions Event Grid okidač
        // Ovo je konceptualno sučelje za primatelja webhooks
    }
}

// Implementacija u Azure Functions
import { app, InvocationContext, EventGridEvent } from "@azure/functions";

app.eventGrid("mcpEventGridHandler", {
    handler: async (event: EventGridEvent, context: InvocationContext) => {
        try {
            const mcpMessage = event.data as McpMessage;
            
            // Obradi MCP poruku
            const response = await mcpServer.processMessage(mcpMessage);
            
            // Pošalji odgovor putem Event Grid-a
            await transport.sendMessage(response);
            
        } catch (error) {
            context.error("Error processing MCP message:", error);
            throw error;
        }
    }
});
```

### **Implementacija u Pythonu - Event Grid transport**

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

# Implementacija Azure funkcija
import azure.functions as func
import logging

def main(event: func.EventGridEvent) -> None:
    """Azure Functions Event Grid trigger for MCP messages"""
    try:
        # Parsiraj MCP poruku iz Event Grid događaja
        mcp_message = json.loads(event.get_body().decode('utf-8'))
        
        # Obradi MCP poruku
        response = process_mcp_message(mcp_message)
        
        # Pošalji odgovor natrag putem Event Grid-a
        # (Implementacija bi kreirala novog Event Grid klijenta)
        
    except Exception as e:
        logging.error(f"Error processing MCP Event Grid message: {e}")
        raise
```

## **Implementacija Azure Event Hubs transporta**

Azure Event Hubs pruža sposobnosti streaminga visokog protoka i u stvarnom vremenu za MCP scenarije koji zahtijevaju nisku latenciju i veliki volumen poruka.

### **Pregled arhitekture**

```mermaid
graph TB
    Client[MCP Klijent] --> EH[Azure Event Hubs]
    EH --> Server[MCP Poslužitelj]
    Server --> EH
    EH --> Client
    
    subgraph "Značajke Event Hubsa"
        Partition[Particioniranje]
        Retention[Zadržavanje Poruka]
        Scaling[Automatsko Skaliranje]
    end
    
    EH --> Partition
    EH --> Retention
    EH --> Scaling
```

### **Implementacija u C# - Event Hubs transport**

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

### **Implementacija u TypeScript - Event Hubs transport**

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
                        
                        // Ažuriraj kontrolnu točku za najmanje jednom isporuku
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

### **Implementacija u Pythonu - Event Hubs transport**

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
        
        # Dodaj svojstva specifična za MCP
        event_data.properties = {
            "messageType": message.get("method", "response"),
            "messageId": message.get("id"),
            "timestamp": "2025-01-14T10:30:00Z"  # Koristi stvarni vremenski žig
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
                starting_position="-1"  # Počni od početka
            )
    
    def _on_event_received(self, handler: Callable):
        """Internal event handler wrapper"""
        async def handle_event(partition_context, event):
            try:
                # Parsiraj MCP poruku iz događaja Event Hubs
                message_body = event.body_as_str(encoding='UTF-8')
                mcp_message = json.loads(message_body)
                
                # Obradi MCP poruku
                await handler(mcp_message)
                
                # Ažuriraj kontrolnu točku za dostavu barem jednom
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

## **Napredni obrasci transporta**

### **Trajnost i pouzdanost poruka**

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

### **Integracija sigurnosti transporta**

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

### **Nadzor i promatranje transporta**

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

## **Scenariji integracije u poduzećima**

### **Scenarij 1: Distribuirana MCP obrada**

Korištenje Azure Event Grid za distribuiranje MCP zahtjeva preko više čvorova za obradu:

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

### **Scenarij 2: Streaming MCP u stvarnom vremenu**

Korištenje Azure Event Hubs za visokofrekventne MCP interakcije:

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

### **Scenarij 3: Hibridna arhitektura transporta**

Kombiniranje više transporta za različite slučajeve upotrebe:

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

## **Optimizacija performansi**

### **Grupiranje poruka za Event Grid**

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

### **Strategija particioniranja za Event Hubs**

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

## **Testiranje prilagođenih transporta**

### **Jedinično testiranje pomoću zamjena**

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

### **Integracijsko testiranje s Azure Test Containers**

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

## **Najbolje prakse i smjernice**

### **Principi dizajna transporta**

1. **Idempontnost**: Osigurajte da je obrada poruka idempotentna radi rukovanja dupliciranim porukama
2. **Rukovanje pogreškama**: Implementirajte sveobuhvatno rukovanje pogreškama i redove mrtvih slova (dead letter queues)
3. **Nadzor**: Dodajte detaljnu telemetriju i provjere zdravlja
4. **Sigurnost**: Koristite upravljane identitete i pristup s najmanjim potrebnim privilegijama
5. **Performanse**: Dizajnirajte u skladu s vašim specifičnim zahtjevima za latenciju i propusnost

### **Preporuke specifične za Azure**

1. **Koristite upravljani identitet**: Izbjegavajte nizove za povezivanje u produkciji
2. **Implementirajte prekidače kruga (Circuit Breakers)**: Zaštitite se od prekida usluga Azurea
3. **Pratite troškove**: Nadgledajte volumen poruka i troškove obrade
4. **Planirajte skaliranje**: Rano dizajnirajte strategije particioniranja i skaliranja
5. **Temeljito testirajte**: Koristite Azure DevTest Labs za sveobuhvatno testiranje

## **Zaključak**

Prilagođeni MCP transporti omogućuju snažne scenarije poduzeća koristeći Azure usluge razmjene poruka. Implementacijom Event Grid ili Event Hubs transporta, možete izgraditi skalabilna, pouzdana MCP rješenja koja se besprijekorno integriraju s postojećom Azure infrastrukturom.

Primjeri predstavljeni u vodiču pokazuju obrasce spremne za produkciju za implementaciju prilagođenih transporta uz održavanje usklađenosti s MCP protokolom i najboljim Azure praksama.

## **Dodatni resursi**

- [MCP Specifikacija 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/)
- [Azure Event Grid dokumentacija](https://docs.microsoft.com/azure/event-grid/)
- [Azure Event Hubs dokumentacija](https://docs.microsoft.com/azure/event-hubs/)
- [Okidač za Azure Functions Event Grid](https://docs.microsoft.com/azure/azure-functions/functions-bindings-event-grid)
- [Azure SDK za .NET](https://github.com/Azure/azure-sdk-for-net)
- [Azure SDK za TypeScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure SDK za Python](https://github.com/Azure/azure-sdk-for-python)

---

> *Ovaj vodič fokusira se na praktične obrasce implementacije za produkcijske MCP sustave. Uvijek validirajte implementacije transporta prema vašim specifičnim zahtjevima i ograničenjima Azure usluga.*
> **Trenutni standard**: Ovaj vodič odražava [MCP specifikaciju 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) u pogledu zahtjeva za transport i naprednih obrazaca transporta za enterprise okruženja.


## Što slijedi
- [6. Doprinosi zajednice](../../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->