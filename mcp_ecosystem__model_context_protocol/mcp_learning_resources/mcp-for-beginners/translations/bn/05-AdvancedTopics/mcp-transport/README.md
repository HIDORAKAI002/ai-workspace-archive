# MCP কাস্টম ট্রান্সপোর্ট - উন্নত বাস্তবায়ন নির্দেশিকা

মডেল কনটেক্সট প্রটোকল (MCP) ট্রান্সপোর্ট প্রক্রিয়াগুলিতে নমনীয়তা প্রদান করে, যা বিশেষায়িত এন্টারপ্রাইজ পরিবেশের জন্য কাস্টম বাস্তবায়ন সক্ষম করে। এই উন্নত নির্দেশিকাটি Azure ইভেন্ট গ্রিড এবং Azure ইভেন্ট হাবস ব্যবহার করে কাস্টম ট্রান্সপোর্ট বাস্তবায়নের উদাহরণস্বরূপ, স্কেলযোগ্য, ক্লাউড-নেটিভ MCP সমাধানগুলি নির্মাণের জন্য অনুশীলনমূলক উদাহরণ অনুসন্ধান করে।

## পরিচিতি

যখন MCP এর স্ট্যান্ডার্ড ট্রান্সপোর্টসমূহ (stdio এবং HTTP স্ট্রিমিং) বেশিরভাগ ব্যবহারের জন্য উপযুক্ত, এন্টারপ্রাইজ পরিবেশগুলি প্রায়ই উন্নত স্কেলযোগ্যতা, নির্ভরযোগ্যতা, এবং বিদ্যমান ক্লাউড অবকাঠামোর সাথে একত্রিতকরণের জন্য বিশেষায়িত ট্রান্সপোর্ট প্রক্রিয়ার প্রয়োজন হয়। কাস্টম ট্রান্সপোর্ট MCP কে অ্যাসিনক্রোনাস যোগাযোগ, ইভেন্ট-চালিত আর্কিটেকচার, এবং বিতরণকৃত প্রসেসিংয়ের জন্য ক্লাউড-নেটিভ মেসেজিং সেবাসমূহ ব্যবহার করার ক্ষমতা দেয়।

এই পাঠটি সর্বশেষ MCP স্পেসিফিকেশন (2025-11-25), Azure মেসেজিং সেবা, এবং প্রতিষ্ঠিত এন্টারপ্রাইজ ইন্টিগ্রেশন প্যাটার্নের উপর ভিত্তি করে উন্নত ট্রান্সপোর্ট বাস্তবায়নগুলি অন্বেষণ করে।

### **MCP ট্রান্সপোর্ট স্থাপত্য**

**MCP স্পেসিফিকেশন থেকে (2025-11-25):**

- **স্ট্যান্ডার্ড ট্রান্সপোর্টস**: stdio (প্রস্তাবিত), HTTP স্ট্রিমিং (রিমোট পরিস্থিতির জন্য)
- **কাস্টম ট্রান্সপোর্টস**: যে কোনও ট্রান্সপোর্ট যা MCP মেসেজ বিনিময় প্রোটোকল বাস্তবায়ন করে
- **মেসেজ ফরম্যাট**: MCP-নির্দিষ্ট এক্সটেনশনের সাথে JSON-RPC 2.0
- **দ্বিমুখী যোগাযোগ**: বিজ্ঞপ্তি এবং প্রতিক্রিয়ার জন্য পূর্ণ ডুপ্লেক্স যোগাযোগ প্রয়োজন

## শেখার লক্ষ্যসমূহ

এই উন্নত পাঠটির শেষে, আপনি সক্ষম হবেন:

- **কাস্টম ট্রান্সপোর্ট প্রয়োজনীয়তা বুঝুন**: MCP প্রোটোকল যেকোনো ট্রান্সপোর্ট লেয়ারে বাস্তবায়ন করুন যেন এটি সঙ্গতিপূর্ণ থাকে
- **Azure Event Grid ট্রান্সপোর্ট নির্মাণ করুন**: সার্ভারলেস স্কেলেবিলিটির জন্য Azure Event Grid ব্যবহার করে ইভেন্ট-চালিত MCP সার্ভার তৈরি করুন
- **Azure Event Hubs ট্রান্সপোর্ট বাস্তবায়ন করুন**: রিয়েল-টাইম স্ট্রিমিংয়ের জন্য Azure Event Hubs ব্যবহার করে উচ্চ-থ্রুপুট MCP সমাধান ডিজাইন করুন
- **এন্টারপ্রাইজ প্যাটার্ন প্রয়োগ করুন**: বিদ্যমান Azure অবকাঠামো ও নিরাপত্তা মডেলের সাথে কাস্টম ট্রান্সপোর্ট একীকরণ করুন
- **ট্রান্সপোর্ট নির্ভরযোগ্যতা পরিচালনা করুন**: এন্টারপ্রাইজ পরিস্থিতির জন্য মেসেজ স্থায়িত্ব, অর্ডারিং, এবং ত্রুটি পরিচালনা বাস্তবায়ন করুন
- **পারফরমেন্স অপ্টিমাইজ করুন**: স্কেল, ল্যাটেন্সি, এবং থ্রুপুট প্রয়োজনীয়তার জন্য ট্রান্সপোর্ট সমাধান ডিজাইন করুন

## **ট্রান্সপোর্ট প্রয়োজনীয়তা**

### **MCP স্পেসিফিকেশন থেকে মূল প্রয়োজনীয়তা (2025-11-25):**

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

## **Azure Event Grid ট্রান্সপোর্ট বাস্তবায়ন**

Azure Event Grid একটি সার্ভারলেস ইভেন্ট রাউটিং সেবা প্রদান করে যা ইভেন্ট-চালিত MCP স্থাপত্যের জন্য আদর্শ। এই বাস্তবায়নটি দেখায় কিভাবে স্কেলযোগ্য, আলগা সংযুক্ত MCP সিস্টেম নির্মাণ করা যায়।

### **স্থাপত্যের ওভারভিউ**

```mermaid
graph TB
    Client[MCP ক্লায়েন্ট] --> EG[Azure ইভেন্ট গ্রিড]
    EG --> Server[MCP সার্ভার ফাংশন]
    Server --> EG
    EG --> Client
    
    subgraph "Azure পরিষেবাসমূহ"
        EG
        Server
        KV[কী ভল্ট]
        Monitor[অ্যাপ্লিকেশন ইনসাইটস]
    end
```

### **C# বাস্তবায়ন - Event Grid ট্রান্সপোর্ট**

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

### **TypeScript বাস্তবায়ন - Event Grid ট্রান্সপোর্ট**

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
    
    // ইভেন্ট-চালিত গ্রহণ Azure Functions এর মাধ্যমে
    onMessage(handler: (message: McpMessage) => Promise<void>): void {
        // বাস্তবায়ন Azure Functions Event Grid ট্রিগার ব্যবহার করবে
        // এটি ওয়েবহুক রিসিভারের জন্য একটি ধারণাগত ইন্টারফেস
    }
}

// Azure Functions বাস্তবায়ন
import { app, InvocationContext, EventGridEvent } from "@azure/functions";

app.eventGrid("mcpEventGridHandler", {
    handler: async (event: EventGridEvent, context: InvocationContext) => {
        try {
            const mcpMessage = event.data as McpMessage;
            
            // MCP বার্তা প্রক্রিয়া করুন
            const response = await mcpServer.processMessage(mcpMessage);
            
            // Event Grid এর মাধ্যমে উত্তর প্রেরণ করুন
            await transport.sendMessage(response);
            
        } catch (error) {
            context.error("Error processing MCP message:", error);
            throw error;
        }
    }
});
```

### **Python বাস্তবায়ন - Event Grid ট্রান্সপোর্ট**

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

# আজুর ফাংশনস ইমপ্লিমেন্টেশন
import azure.functions as func
import logging

def main(event: func.EventGridEvent) -> None:
    """Azure Functions Event Grid trigger for MCP messages"""
    try:
        # ইভেন্ট গ্রিড ইভেন্ট থেকে MCP মেসেজ পার্স করুন
        mcp_message = json.loads(event.get_body().decode('utf-8'))
        
        # MCP মেসেজ প্রক্রিয়াকরণ করুন
        response = process_mcp_message(mcp_message)
        
        # ইভেন্ট গ্রিডের মাধ্যমে উত্তর পাঠান
        # (ইমপ্লিমেন্টেশন নতুন ইভেন্ট গ্রিড ক্লায়েন্ট তৈরি করবে)
        
    except Exception as e:
        logging.error(f"Error processing MCP Event Grid message: {e}")
        raise
```

## **Azure Event Hubs ট্রান্সপোর্ট বাস্তবায়ন**

Azure Event Hubs উচ্চ-থ্রুপুট, রিয়েল-টাইম স্ট্রিমিং ক্ষমতা প্রদান করে এমন MCP পরিস্থিতিগুলির জন্য যেখানে কম ল্যাটেন্সি এবং উচ্চ মেসেজ ভলিউম দরকার।

### **স্থাপত্যের ওভারভিউ**

```mermaid
graph TB
    Client[MCP ক্লায়েন্ট] --> EH[Azure ইভেন্ট হাবস]
    EH --> Server[MCP সার্ভার]
    Server --> EH
    EH --> Client
    
    subgraph "ইভেন্ট হাবস বৈশিষ্ট্য"
        Partition[পার্টিশনিং]
        Retention[বার্তা সংরক্ষণ]
        Scaling[অটো স্কেলিং]
    end
    
    EH --> Partition
    EH --> Retention
    EH --> Scaling
```

### **C# বাস্তবায়ন - Event Hubs ট্রান্সপোর্ট**

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

### **TypeScript বাস্তবায়ন - Event Hubs ট্রান্সপোর্ট**

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
                        
                        // কমপক্ষে একবার ডেলিভারির জন্য চেকপয়েন্ট আপডেট করুন
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

### **Python বাস্তবায়ন - Event Hubs ট্রান্সপোর্ট**

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
        
        # MCP-নির্দিষ্ট বৈশিষ্ট্য যোগ করুন
        event_data.properties = {
            "messageType": message.get("method", "response"),
            "messageId": message.get("id"),
            "timestamp": "2025-01-14T10:30:00Z"  # প্রকৃত টাইমস্ট্যাম্প ব্যবহার করুন
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
                starting_position="-1"  # শুরু থেকে শুরু করুন
            )
    
    def _on_event_received(self, handler: Callable):
        """Internal event handler wrapper"""
        async def handle_event(partition_context, event):
            try:
                # ইভেন্ট হাবের ইভেন্ট থেকে MCP বার্তা পার্স করুন
                message_body = event.body_as_str(encoding='UTF-8')
                mcp_message = json.loads(message_body)
                
                # MCP বার্তা প্রক্রিয়া করুন
                await handler(mcp_message)
                
                # কমপক্ষে একবার ডেলিভারির জন্য চেকপয়েন্ট আপডেট করুন
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

## **উন্নত ট্রান্সপোর্ট প্যাটার্নস**

### **মেসেজ স্থায়িত্ব এবং নির্ভরযোগ্যতা**

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

### **ট্রান্সপোর্ট সিকিউরিটি ইন্টিগ্রেশন**

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

### **ট্রান্সপোর্ট মনিটরিং এবং অবজার্ভেবিলিটি**

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

## **এন্টারপ্রাইজ ইন্টিগ্রেশন পরিস্থিতি**

### **পরিস্থিতি ১: বিতরণকৃত MCP প্রসেসিং**

একাধিক প্রসেসিং নোড জুড়ে MCP অনুরোধ বিতরণের জন্য Azure Event Grid ব্যবহার:

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

### **পরিস্থিতি ২: রিয়েল-টাইম MCP স্ট্রিমিং**

উচ্চ-ফ্রিকোয়েন্সি MCP ইন্টারঅ্যাকশনের জন্য Azure Event Hubs ব্যবহার:

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

### **পরিস্থিতি ৩: হাইব্রিড ট্রান্সপোর্ট স্থাপত্য**

বিভিন্ন ব্যবহারের জন্য একাধিক ট্রান্সপোর্ট একত্রিতকরণ:

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

## **পারফরমেন্স অপ্টিমাইজেশন**

### **Event Grid-এর জন্য মেসেজ ব্যাচিং**

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

### **Event Hubs-এর জন্য পার্টিশনিং কৌশল**

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

## **কাস্টম ট্রান্সপোর্টের পরীক্ষা**

### **টেস্ট ডাবলসসহ ইউনিট টেস্টিং**

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

### **Azure Test Containers সহ ইন্টিগ্রেশন টেস্টিং**

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

## **সেরা অনুশীলন এবং নির্দেশিকা**

### **ট্রান্সপোর্ট ডিজাইন নীতিমালা**

1. **ইডেম্পোটেন্সী**: ডুপ্লিকেট গুলো পরিচালনার জন্য মেসেজ প্রসেসিং ইডেম্পোটেন্ট নিশ্চিত করুন
2. **ত্রুটি পরিচালনা**: ব্যাপক ত্রুটি পরিচালনা এবং ডেড লেটার কিউ বাস্তবায়ন করুন
3. **মনিটরিং**: বিস্তারিত টেলিমেট্রি এবং হেলথ চেক যোগ করুন
4. **নিরাপত্তা**: পরিচালিত পরিচয় এবং সর্বনিম্ন বিশেষাধিকার অ্যাক্সেস ব্যবহার করুন
5. **পারফরমেন্স**: আপনার নির্দিষ্ট ল্যাটেন্সি এবং থ্রুপুট প্রয়োজনীয়তার জন্য ডিজাইন করুন

### **Azure-নির্দিষ্ট সুপারিশসমূহ**

1. **পরিচিতি ব্যবস্থাপনা ব্যবহার করুন**: প্রোডাকশনে সংযোগ স্ট্রিং এড়িয়ে চলুন
2. **সার্কিট ব্রেকার বাস্তবায়ন করুন**: Azure সেবা আউটেজ থেকে সুরক্ষা নিশ্চিত করুন
3. **খরচ মনিটর করুন**: মেসেজ ভলিউম এবং প্রসেসিং খরচ ট্র্যাক করুন
4. **স্কেল পরিকল্পনা করুন**: পার্টিশনিং এবং স্কেলিং কৌশল প্রাথমিকভাবে ডিজাইন করুন
5. **পরিষ্কারভাবে পরীক্ষা করুন**: ব্যাপক পরীক্ষার জন্য Azure DevTest Labs ব্যবহার করুন

## **উপসংহার**

কাস্টম MCP ট্রান্সপোর্ট Azure এর মেসেজিং সেবা ব্যবহার করে শক্তিশালী এন্টারপ্রাইজ পরিস্থিতি সক্ষম করে। ইভেন্ট গ্রিড বা ইভেন্ট হাবস ট্রান্সপোর্টগুলি বাস্তবায়ন করে, আপনি স্কেলযোগ্য, নির্ভরযোগ্য MCP সমাধান তৈরি করতে পারবেন যা বিদ্যমান Azure অবকাঠামোর সাথে নির্বিঘ্নে একত্রিত হয়।

প্রদত্ত উদাহরণগুলি প্রোডাকশন-রেডি প্যাটার্ন প্রদর্শন করে যা MCP প্রোটোকল মেনটেইন করে এবং Azure এর সেরা অনুশীলন অনুসরণ করে কাস্টম ট্রান্সপোর্ট বাস্তবায়নের জন্য।

## **অতিরিক্ত সম্পদসমূহ**

- [MCP স্পেসিফিকেশন 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/)
- [Azure Event Grid ডকুমেন্টেশন](https://docs.microsoft.com/azure/event-grid/)
- [Azure Event Hubs ডকুমেন্টেশন](https://docs.microsoft.com/azure/event-hubs/)
- [Azure Functions Event Grid Trigger](https://docs.microsoft.com/azure/azure-functions/functions-bindings-event-grid)
- [Azure SDK for .NET](https://github.com/Azure/azure-sdk-for-net)
- [Azure SDK for TypeScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure SDK for Python](https://github.com/Azure/azure-sdk-for-python)

---

> *এই গাইডটি প্রোডাকশনের MCP সিস্টেমের জন্য ব্যবহারিক বাস্তবায়ন প্যাটার্নগুলিতে ফোকাস করে। আপনার নির্দিষ্ট প্রয়োজনীয়তা এবং Azure সেবা সীমাবদ্ধতার বিরুদ্ধে সর্বদা ট্রান্সপোর্ট বাস্তবায়ন যাচাই করুন।*
> **বর্তমান স্ট্যান্ডার্ড**: এই গাইডটি [MCP স্পেসিফিকেশন 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) ট্রান্সপোর্ট প্রয়োজনীয়তা এবং এন্টারপ্রাইজ পরিবেশের জন্য উন্নত ট্রান্সপোর্ট প্যাটার্ন প্রতিফলিত করে।


## পরবর্তী কী
- [6. সম্প্রদায়ের অবদানসমূহ](../../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->