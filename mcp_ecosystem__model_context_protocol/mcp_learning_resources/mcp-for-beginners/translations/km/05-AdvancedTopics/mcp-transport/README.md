# MCP ការដឹកជញ្ចូនផ្ទាល់ខ្លួន - មគ្គុទេសក៍អនុវត្តខ្ពស់

ប្រព័ន្ធ Protocol Context Model (MCP) ផ្តល់ភាពបត់បែនក្នុងមេកានិចដឹកជញ្ជូន ដែលអនុញ្ញាតឱ្យមានការអនុវត្តផ្ទាល់ខ្លួនសម្រាប់បរិយាកាសសហគ្រាសជាក់លាក់។ មគ្គុទេសក៍ខ្ពស់នេះស្វែងយល់អំពីការអនុវត្តការដឹកជញ្ជូនផ្ទាល់ខ្លួនដោយប្រើ Azure Event Grid និង Azure Event Hubs ជាឧទាហរណ៍ជាក់ស្តែងសម្រាប់កំណត់ស្ថាបនាដំណោះស្រាយ MCP ជាក្លោតធីវធម្មជាតិដែលអាចស្កេលបាន។

> **មើលទៅមុខ:** មគ្គុទេសក៍នេះត្រូវបានសរសេរតាម **MCP Specification 2025-11-25** ដែលការរៀបចំលំដាប់វគ្គត្រូវតែផ្តល់ការការពារតាមវគ្គមួយៗ (មើល Protocol សារ ខាងក្រោម)។ កំណែបញ្ចេញ `2026-07-28` លុបចេញទាំងសព្វវគ្គនៅកម្រិត protocol ហើយទាមទារក្បាលសារ `Mcp-Method`/`Mcp-Name` ដើម្បីឲ្យទីផ្សា និងការដឹកជញ្ជូនផ្ទាល់ខ្លួនអាចបញ្ជូនតាមសំណើមួយៗដោយមិនតាមវគ្គមួយៗទៀត។ មើល [មានអ្វីប្រែប្រួលនៅ MCP៖ កំណែបញ្ចេញ 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)។

## ការណែនាំ

ខណៈដែលការដឹកជញ្ចូនស្តង់ដារ MCP (stdio និង HTTP streaming) អាចបម្រើការប្រើប្រាស់ភាគច្រើន វប្បធម៌សហគ្រាសជាច្រើនតែងតែទាមទារមេកានិចដឹកជញ្ជូនជាក់លាក់សម្រាប់ការកែលម្អការស្កែល, ភាពទំនុកចិត្ត, និងការរួមបញ្ចូលជាមួយរចនាសម្ព័ន្ធពពកដែលមានស្រាប់។ ការដឹកជញ្ជូនផ្ទាល់ខ្លួនអនុញ្ញាតឲ្យ MCP ប្រើសេវារបស់សារ cloud-native សម្រាប់ការទំនាក់ទំនងមិន đồngពេល, រោងចក្រោតមូលដ្ឋានតាមព្រឹត្តិការណ៍, និងការដំណើរការចែកចាយ។

មេរៀននេះស្វែងយល់អំពីការអនុវត្តការដឹកជញ្ជូនខ្ពស់ដែលផ្អែកលើព័ត៌មាន MCP ចុងក្រោយ (2025-11-25), សេវាសាររបស់ Azure, និងគំរូរៀបចំសហគ្រាសដែលបានបង្កើតឡើង។

### **ស្ថាបត្យកម្មដឹកជញ្ជូន MCP**

**ពី MCP Specification (2025-11-25):**

- **ការដឹកជញ្ជូនស្តង់ដារ**: stdio (ណែនាំ), HTTP streaming (សម្រាប់ស្ថានភាពពីចម្ងាយ)
- **ការដឹកជញ្ជូនផ្ទាល់ខ្លួន**: ណាមួយដែលអនុវត្ត protocol ផ្លាស់ប្តូរសារអ្នក MCP
- **ទ្រង់ទ្រាយសារ**: JSON-RPC 2.0 ជាមួយការពង្រីកផ្ទាល់ខ្លួនដោយ MCP
- **ការទំនាក់ទំនងទ្វេផ្លូវ**: ទំនាក់ទំនង duplex ពេញលេញត្រូវការសម្រាប់ការជូនដំណឹង និងការឆ្លើយតប

## គោលបំណងរៀន

នៅចុងក្រោយនៃមេរៀនខ្ពស់នេះ អ្នកនឹងអាច:

- **យល់ពីតម្រូវការដឹកជញ្ជូនផ្ទាល់ខ្លួន**: អនុវត្ត protocol MCP លើស្រទាប់ដឹកជញ្ជូនណាមួយ ខណៈដែលរក្សាការអនុវត្តគោលការណ៍
- **បង្កើត Azure Event Grid Transport**: បង្កើតម៉ាស៊ីនបម្រើ MCP ដំណើរការតាមព្រឹត្តិការណ៍ដោយប្រើ Azure Event Grid សម្រាប់ការស្កែលគ្មានម៉ាស៊ីន
- **អនុវត្ត Azure Event Hubs Transport**: រចនាដំណោះស្រាយ MCP ថាមពលខ្ពស់ដោយប្រើ Azure Event Hubs សម្រាប់ការផ្សាយផ្ទាល់ពេលវេលាពិតប្រាកដ
- **អនុវត្តគំរូសហគ្រាស**: រួមបញ្ចូលការដឹកជញ្ជូនផ្ទាល់ខ្លួនជាមួយរចនាសម្ព័ន្ធ Azure និងគំរូសុវត្ថិភាពដែលមានស្រាប់
- **ដោះស្រាយភាពទំនុកចិត្តនៃការដឹកជញ្ជូន**: អនុវត្តការរឹតបន្តឹងសារចាំ, លំដាប់ និងការគ្រប់គ្រងកំហុសសម្រាប់ស្ថានភាពសហគ្រាស
- **បង្កើនប្រសិទ្ធភាព**: រចនាដំណោះស្រាយដឹកជញ្ជូនសម្រាប់តម្រូវការស្កែល, ពេលបង្ហាញ និងថាមពលផ្ទេរ

## **តម្រូវការដឹកជញ្ជូន**

### **តម្រូវការស្នូលពី MCP Specification (2025-11-25):**

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

## **អនុវត្តផ្សព្វផ្សាយ Azure Event Grid**

Azure Event Grid ផ្តល់សេវាកម្មផ្លូវចែកតំបន់ដំណើរការអ៊ីវ៉ង់គ្មានម៉ាស៊ីន ដែលល្អសម្រាប់ស្ថាបត្យកម្ម MCP ដំណើរការតាមព្រឹត្តិការណ៍។ ការអនុវត្តនេះបង្ហាញពីរបៀបកសាងប្រព័ន្ធ MCP ដែលអាចស្កែលបាន និងភ្ជាប់បានយ៉ាងទាប។

### **ទិដ្ឋភាពស្ថាបត្យកម្ម**

```mermaid
graph TB
    Client[អតិថិជន MCP] --> EG[បណ្ដាញព្រឹត្តិការណ៍ Azure]
    EG --> Server[មុខងារ​ម៉ាស៊ីន​បម្រើ MCP]
    Server --> EG
    EG --> Client
    
    subgraph "សេវាកម្ម Azure"
        EG
        Server
        KV[ស្រុកចំណង]
        Monitor[ការយល់ដឹងពីកម្មវិធី]
    end
```

### **ការអនុវត្ត C# - ផ្សព្វផ្សាយ Event Grid**

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

### **ការអនុវត្ត TypeScript - ផ្សព្វផ្សាយ Event Grid**

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
    
    // ទទួលបានដោយបើកហេតុវិធីតាមរយៈ Azure Functions
    onMessage(handler: (message: McpMessage) => Promise<void>): void {
        // ការអនុវត្តន៍នឹងប្រើ Azure Functions Event Grid trigger
        // នេះគឺជាចំណុចផ្ដាច់មុខសម្រាប់កម្មវិធីទទួល webhook
    }
}

// ការអនុវត្ត Azure Functions
import { app, InvocationContext, EventGridEvent } from "@azure/functions";

app.eventGrid("mcpEventGridHandler", {
    handler: async (event: EventGridEvent, context: InvocationContext) => {
        try {
            const mcpMessage = event.data as McpMessage;
            
            // ដំណើរការប្រែសារម៉ាស៊ីន MCP
            const response = await mcpServer.processMessage(mcpMessage);
            
            // ផ្ញើការឆ្លើយតបតាមរយៈ Event Grid
            await transport.sendMessage(response);
            
        } catch (error) {
            context.error("Error processing MCP message:", error);
            throw error;
        }
    }
});
```

### **ការអនុវត្ត Python - ផ្សព្វផ្សាយ Event Grid**

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

# ការអនុវត្ត Azure Functions
import azure.functions as func
import logging

def main(event: func.EventGridEvent) -> None:
    """Azure Functions Event Grid trigger for MCP messages"""
    try:
        # វិភាគសារជា MCP ពីព្រឹត្តិការណ៍ Event Grid
        mcp_message = json.loads(event.get_body().decode('utf-8'))
        
        # ដំណើរការសារជា MCP
        response = process_mcp_message(mcp_message)
        
        # ផ្ញើការឆ្លើយតបត្រឡប់វិញតាមរយៈ Event Grid
        # (ការអនុវត្តនឹងបង្កើតអ្នកអតិថិជន Event Grid ថ្មី)
        
    except Exception as e:
        logging.error(f"Error processing MCP Event Grid message: {e}")
        raise
```

## **អនុវត្តផ្សព្វផ្សាយ Azure Event Hubs**

Azure Event Hubs ផ្តល់នូវសមត្ថភាពផ្សាយផ្ទាល់ពេលវេលាពិតប្រាកដមានថាមពលខ្ពស់សម្រាប់ស្ថានភាព MCP ការទាមទារពេលយឺតតិច និងបរិមាណសារខ្ពស់។

### **ទិដ្ឋភាពស្ថាបត្យកម្ម**

```mermaid
graph TB
    Client[អតិថិជន MCP] --> EH[Azure Event Hubs]
    EH --> Server[ម៉ាស៊ីនបម្រើ MCP]
    Server --> EH
    EH --> Client
    
    subgraph "លក្ខណៈពិសេស Event Hubs"
        Partition[ការបែងចែកផ្នែក]
        Retention[ការរក្សាទុកសារជាពេលវែង]
        Scaling[ការពង្រីកដោយស្វ័យប្រវត្តិ]
    end
    
    EH --> Partition
    EH --> Retention
    EH --> Scaling
```

### **ការអនុវត្ត C# - ផ្សព្វផ្សាយ Event Hubs**

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

### **ការអនុវត្ត TypeScript - ផ្សព្វផ្សាយ Event Hubs**

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
                        
                        // បន្ទាន់សម័យចំណុចត្រួតពិនិត្យសម្រាប់ការដឹកជញ្ជូនយ៉ាងហោចណាស់មួយ​ដង
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

### **ការអនុវត្ត Python - ផ្សព្វផ្សាយ Event Hubs**

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
        
        # បន្ថែមគុណលក្ខណៈជាក់លាក់ MCP
        event_data.properties = {
            "messageType": message.get("method", "response"),
            "messageId": message.get("id"),
            "timestamp": "2025-01-14T10:30:00Z"  # ប្រើម៉ោងពិត
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
                starting_position="-1"  # ចាប់ផ្តើមពីដើម
            )
    
    def _on_event_received(self, handler: Callable):
        """Internal event handler wrapper"""
        async def handle_event(partition_context, event):
            try:
                # ផ្ទៀងផ្ទាត់សារ MCP ពីព្រឹត្តិការណ៍ Event Hubs
                message_body = event.body_as_str(encoding='UTF-8')
                mcp_message = json.loads(message_body)
                
                # ដំណើរការសារ MCP
                await handler(mcp_message)
                
                # បន្ទាន់សម័យចំណុចមើលសម្រាប់ការបញ្ជូនយ៉ាងហោចណាស់មួយដង
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

## **គំរូដឹកជញ្ជូនខ្ពស់**

### **ភាពរឹងមាំនិងភាពទំនុកចិត្តរបស់សារ**

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

### **ការរួមបញ្ចូលសុវត្ថិភាពការដឹកជញ្ជូន**

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

### **ការតាមដាន និងការមើលឃើញការដឹកជញ្ជូន**

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

## **ស្ថានភាពការរួមបញ្ចូលសហគ្រាស**

### **ស្ថានភាព ១: ការដំណើរការចែកចាយ MCP**

ប្រើ Azure Event Grid ដើម្បីចែកចាយសំណើ MCP តាមរយៈចំណុចដំណើរការច្រើន៖

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

### **ស្ថានភាព ២: ផ្សព្វផ្សាយ MCP ពេលវេលាពិតប្រាកដ**

ប្រើ Azure Event Hubs សម្រាប់ប្រតិកម្ម MCP ប្រកបដោយកម្រិតខ្ពស់៖

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

### **ស្ថានភាព ៣: ស្ថាបត្យកម្មដឹកជញ្ជូនចម្រុះ**

បញ្ចូលការដឹកជញ្ជូនច្រើនសម្រាប់ការប្រើប្រាស់ខុសគ្នា៖

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

## **បង្កើនប្រសិទ្ធភាពសមត្ថភាព**

### **ការប្រមូលសារដើម្បីផ្ញើម្ដងសម្រាប់ Event Grid**

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

### **យុទ្ធសាស្រ្តបែងចែកសម្រាប់ Event Hubs**

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

## **ការធ្វើតេស្តការដឹកជញ្ជូនផ្ទាល់ខ្លួន**

### **ការធ្វើតេស្តអង្គភាពជាមួយ Test Doubles**

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

### **ការធ្វើតេស្តរួមជាមួយ Azure Test Containers**

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

## **អនុវត្តហេតុការណ៍ល្អបំផុត និងនីតិវិធីជាដើម**

### **គោលការណ៍រចនាដឹកជញ្ជូន**

1. **ភាពអាចត្រូវបានធ្វើឡើងម្តងទៀត (Idempotency)**: ធានាថាការដំណើរការសារជាអត្តនោមិត្តដើម្បីដោះស្រាយករណីចម្លង
2. **ការគ្រប់គ្រងកំហុស**: អនុវត្តការគ្រប់គ្រងកំហុសម៉ឺងម៉ាត់ និងកាលេបក្រឡាចាញ់
3. **ការតាមដាន**: បន្ថែមយោបល់លំអិត និងការត្រួតពិនិត្យសុខភាព
4. **សុវត្ថិភាព**: ប្រើសមត្ថភាពតំណាងគ្រប់គ្រង និងការចូលប្រើតិចតួចបំផុត
5. **សមត្ថភាព**: រចនាសម្រាប់តម្រូវការពេលយឺត និងថាមពលផ្ទេរដែលជាក់លាក់របស់អ្នក

### **ការណែនាំជាក់លាក់សម្រាប់ Azure**

1. **ប្រើអត្តសញ្ញាណគ្រប់គ្រង**: ជៀសវាងខ្សែការតភ្ជាប់នៅក្នុងផលិតកម្ម
2. **អនុវត្តឧបករណ៍រាំងខ្ទប់សៀគ្វី**: ការពារករណីបរាជ័យសេវាកម្ម Azure
3. **តាមដានចំណាយ**: តាមដានបរិមាណសារ និងចំណាយដំណើរការ
4. **រៀបចំសម្រាប់ការស្កែល**: រចនាយុទ្ធសាស្រ្តបែងចែក និងស្កែលទុកមុន
5. **ធ្វើតេស្តយ៉ាងពេញលេញ**: ប្រើ Azure DevTest Labs សម្រាប់ការធ្វើតេស្តទូលំទូលាយ

## **សេចក្ដីសន្និដ្ឋាន**

ការដឹកជញ្ជូន MCP ផ្ទាល់ខ្លួនអនុញ្ញាតអោយមានស្ថានភាពសហគ្រាសមានថាមពលខ្ពស់ដោយប្រើសេវាសាររបស់ Azure។ ដោយអនុវត្តការដឹកជញ្ជូន Event Grid ឬ Event Hubs អ្នកអាចបង្កើតដំណោះស្រាយ MCP ដែលអាចស្កែលបាន និងទុកចិត្តបាន ដែលរួមបញ្ចូលជាសំរួលជាមួយរចនាសម្ព័ន្ធ Azure ដែលមានស្រាប់។

ឧទាហរណ៍ដែលផ្តល់ជូនបង្ហាញពីគំរូដែលមានភាពត្រៀមរួច Production សម្រាប់ការអនុវត្តការដឹកជញ្ជូនផ្ទាល់ខ្លួន ខណៈដែលរក្សាការអនុវត្តតាម protocol MCP និងការណែនាំល្អបំផុតរបស់ Azure។

## **ធនធានបន្ថែម**

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/)
- [Azure Event Grid Documentation](https://docs.microsoft.com/azure/event-grid/)
- [Azure Event Hubs Documentation](https://docs.microsoft.com/azure/event-hubs/)
- [Azure Functions Event Grid Trigger](https://docs.microsoft.com/azure/azure-functions/functions-bindings-event-grid)
- [Azure SDK for .NET](https://github.com/Azure/azure-sdk-for-net)
- [Azure SDK for TypeScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure SDK for Python](https://github.com/Azure/azure-sdk-for-python)

---

> *មគ្គុទេសក៍នេះផ្តោតលើគំរូអនុវត្តសកម្មភាពសម្រាប់ប្រព័ន្ធ MCP សម្រាប់ផលិតកម្ម។ តែងតែពិនិត្យការអនុវត្តដឹកជញ្ជូនទៅនឹងតម្រូវការពិសេសរបស់អ្នក និងកំណត់កំរិតសេវាកម្ម Azure។*
> **ស្តង់ដារបច្ចុប្បន្ន**: មគ្គុទេសក៍នេះបង្ហាញពីតម្រូវការដឹកជញ្ជូននិងគំរូដឹកជញ្ជូនខ្ពស់សម្រាប់បរិយាកាសសហគ្រាសតាម [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/)។


## ជំហានបន្ទាប់
- [6. ដំណោយឱ្យសហគមន៍](../../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->