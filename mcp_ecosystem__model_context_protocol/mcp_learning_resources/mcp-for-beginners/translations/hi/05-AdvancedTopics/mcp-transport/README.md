# MCP कस्टम ट्रांसपोर्ट्स - उन्नत कार्यान्वयन मार्गदर्शिका

मॉडल कॉन्टेक्स्ट प्रोटोकॉल (MCP) ट्रांसपोर्ट मेकेनिज्म में लचीलापन प्रदान करता है, जिससे विशेष उद्यम वातावरण के लिए कस्टम कार्यान्वयन संभव होते हैं। यह उन्नत मार्गदर्शिका Azure Event Grid और Azure Event Hubs का उपयोग करते हुए कस्टम ट्रांसपोर्ट कार्यान्वयन का व्यावहारिक उदाहरण प्रस्तुत करती है, जो स्केलेबल, क्लाउड-नेटिव MCP समाधानों के निर्माण के लिए है।

> **आगे देखते हुए:** यह मार्गदर्शिका **MCP विशिष्टता 2025-11-25** के अनुरूप लिखी गई है, जहाँ सत्र क्रम को प्रति सत्र संरक्षित करना आवश्यक है (नीचे संदेश प्रोटोकॉल देखें)। `2026-07-28` रिलीज़ उम्मीदवार में प्रोटोकॉल-स्तर का सत्र पूरी तरह से हटा दिया गया है और `Mcp-Method`/`Mcp-Name` हेडर्स की आवश्यकता होती है ताकि गेटवे और कस्टम ट्रांसपोर्ट अनुरोध-स्तर पर मार्गदर्शन कर सकें न कि सत्र-स्तर पर। देखें [MCP में क्या बदल रहा है: 2026-07-28 रिलीज़ उम्मीदवार](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)।

## परिचय

जबकि MCP के मानक ट्रांसपोर्ट (stdio और HTTP स्ट्रीमिंग) अधिकांश उपयोग मामलों को सेवा देते हैं, उद्यम वातावरण में अक्सर बेहतर स्केलेबिलिटी, विश्वसनीयता, और मौजूद क्लाउड इन्फ्रास्ट्रक्चर के साथ एकीकरण के लिए विशिष्ट ट्रांसपोर्ट मेकेनिज्म की आवश्यकता होती है। कस्टम ट्रांसपोर्ट MCP को एसिंक्रोनस संचार, इवेंट-ड्रिवन आर्किटेक्चर, और वितरित प्रोसेसिंग के लिए क्लाउड-नेटिव मैसेजिंग सेवाओं का लाभ उठाने में सक्षम बनाते हैं।

यह पाठ MCP विशिष्टता (2025-11-25), Azure मैसेजिंग सेवाओं, और स्थापित उद्यम एकीकरण पैटर्न्स पर आधारित उन्नत ट्रांसपोर्ट कार्यान्वयन का अन्वेषण करता है।

### **MCP ट्रांसपोर्ट आर्किटेक्चर**

**MCP विशिष्टता (2025-11-25) से:**

- **मानक ट्रांसपोर्ट्स**: stdio (सिफारिश), HTTP स्ट्रीमिंग (दूरस्थ प्रसंग के लिए)
- **कस्टम ट्रांसपोर्ट्स**: कोई भी ट्रांसपोर्ट जो MCP संदेश विनिमय प्रोटोकॉल को लागू करता हो
- **संदेश प्रारूप**: JSON-RPC 2.0 MCP-विशिष्ट एक्सटेंशन्स के साथ
- **द्वि-दिशात्मक संचार**: सूचनाओं और प्रतिक्रियाओं के लिए पूर्ण द्विदिश संचार आवश्यक

## सीखने के उद्देश्य

इस उन्नत पाठ के अंत तक, आप सक्षम होंगे:

- **कस्टम ट्रांसपोर्ट आवश्यकताओं को समझना**: किसी भी ट्रांसपोर्ट लेयर पर MCP प्रोटोकॉल को लागू करना और अनुपालन बनाए रखना
- **Azure Event Grid ट्रांसपोर्ट बनाना**: Azure Event Grid का उपयोग करके इवेंट-ड्रिवन MCP सर्वर बनाना ताकि सर्वरलेस स्केलेबिलिटी हो
- **Azure Event Hubs ट्रांसपोर्ट लागू करना**: Azure Event Hubs का उपयोग करके उच्च-थ्रूपुट MCP समाधान डिज़ाइन करना, वास्तविक समय स्ट्रीमिंग के लिए
- **उद्यम पैटर्न लागू करना**: मौजूदा Azure इन्फ्रास्ट्रक्चर और सुरक्षा मॉडल के साथ कस्टम ट्रांसपोर्ट को एकीकृत करना
- **ट्रांसपोर्ट विश्वसनीयता संभालना**: उद्यम परिदृश्यों के लिए संदेश स्थायित्व, क्रमबद्धता, और त्रुटि प्रबंधन लागू करना
- **प्रदर्शन अनुकूलन**: स्केल, विलंब समय, और थ्रूपुट आवश्यकताओं के लिए ट्रांसपोर्ट समाधान डिज़ाइन करना

## **ट्रांसपोर्ट आवश्यकताएँ**

### **MCP विशिष्टता (2025-11-25) से मूल आवश्यकताएँ:**

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

## **Azure Event Grid ट्रांसपोर्ट कार्यान्वयन**

Azure Event Grid एक सर्वरलेस इवेंट रूटिंग सेवा प्रदान करता है, जो इवेंट-ड्रिवन MCP आर्किटेक्चर के लिए आदर्श है। यह कार्यान्वयन दिखाता है कि कैसे स्केलेबल, सहज loosely-coupled MCP सिस्टम बनाएँ।

### **आर्किटेक्चर अवलोकन**

```mermaid
graph TB
    Client[MCP क्लाइंट] --> EG[Azure ईवेंट ग्रिड]
    EG --> Server[MCP सर्वर फंक्शन]
    Server --> EG
    EG --> Client
    
    subgraph "Azure सेवाएँ"
        EG
        Server
        KV[की वॉल्ट]
        Monitor[एप्लिकेशन इनसाइट्स]
    end
```

### **C# कार्यान्वयन - Event Grid ट्रांसपोर्ट**

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

### **TypeScript कार्यान्वयन - Event Grid ट्रांसपोर्ट**

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
    
    // इवेंट-चालित रिसीव Azure Functions के माध्यम से
    onMessage(handler: (message: McpMessage) => Promise<void>): void {
        // कार्यान्वयन Azure Functions Event Grid ट्रिगर का उपयोग करेगा
        // यह वेबहुक रिसीवर के लिए एक अवधारणात्मक इंटरफेस है
    }
}

// Azure Functions कार्यान्वयन
import { app, InvocationContext, EventGridEvent } from "@azure/functions";

app.eventGrid("mcpEventGridHandler", {
    handler: async (event: EventGridEvent, context: InvocationContext) => {
        try {
            const mcpMessage = event.data as McpMessage;
            
            // MCP संदेश को संसाधित करें
            const response = await mcpServer.processMessage(mcpMessage);
            
            // Event Grid के माध्यम से प्रतिक्रिया भेजें
            await transport.sendMessage(response);
            
        } catch (error) {
            context.error("Error processing MCP message:", error);
            throw error;
        }
    }
});
```

### **Python कार्यान्वयन - Event Grid ट्रांसपोर्ट**

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

# Azure Functions कार्यान्वयन
import azure.functions as func
import logging

def main(event: func.EventGridEvent) -> None:
    """Azure Functions Event Grid trigger for MCP messages"""
    try:
        # Event Grid इवेंट से MCP संदेश पार्स करें
        mcp_message = json.loads(event.get_body().decode('utf-8'))
        
        # MCP संदेश प्रक्रिया करें
        response = process_mcp_message(mcp_message)
        
        # प्रतिक्रिया वापस Event Grid के माध्यम से भेजें
        # (कार्यान्वयन नया Event Grid क्लाइंट बनाएगा)
        
    except Exception as e:
        logging.error(f"Error processing MCP Event Grid message: {e}")
        raise
```

## **Azure Event Hubs ट्रांसपोर्ट कार्यान्वयन**

Azure Event Hubs MCP परिदृश्यों के लिए उच्च-थ्रूपुट, वास्तविक समय स्ट्रीमिंग क्षमताएँ प्रदान करता है जहाँ कम विलंबता और उच्च संदेश संख्या आवश्यक है।

### **आर्किटेक्चर अवलोकन**

```mermaid
graph TB
    Client[MCP क्लाइंट] --> EH[Azure इवेंट हब्स]
    EH --> Server[MCP सर्वर]
    Server --> EH
    EH --> Client
    
    subgraph "इवेंट हब्स फीचर्स"
        Partition[विभाजन]
        Retention[संदेश संरक्षण]
        Scaling[स्वतः स्केलिंग]
    end
    
    EH --> Partition
    EH --> Retention
    EH --> Scaling
```

### **C# कार्यान्वयन - Event Hubs ट्रांसपोर्ट**

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

### **TypeScript कार्यान्वयन - Event Hubs ट्रांसपोर्ट**

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
                        
                        // कम से कम एक बार डिलीवरी के लिए चेकपॉइंट अपडेट करें
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

### **Python कार्यान्वयन - Event Hubs ट्रांसपोर्ट**

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
        
        # MCP-विशिष्ट गुण जोड़ें
        event_data.properties = {
            "messageType": message.get("method", "response"),
            "messageId": message.get("id"),
            "timestamp": "2025-01-14T10:30:00Z"  # वास्तविक टाइमस्टैम्प का उपयोग करें
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
                starting_position="-1"  # शुरुआत से शुरू करें
            )
    
    def _on_event_received(self, handler: Callable):
        """Internal event handler wrapper"""
        async def handle_event(partition_context, event):
            try:
                # ईवेंट हब्स ईवेंट से MCP संदेश पार्स करें
                message_body = event.body_as_str(encoding='UTF-8')
                mcp_message = json.loads(message_body)
                
                # MCP संदेश प्रोसेस करें
                await handler(mcp_message)
                
                # कम से कम एक बार डिलीवरी के लिए चेकपॉइंट अपडेट करें
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

## **उन्नत ट्रांसपोर्ट पैटर्न**

### **संदेश स्थायित्व और विश्वसनीयता**

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

### **ट्रांसपोर्ट सुरक्षा एकीकरण**

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

### **ट्रांसपोर्ट निगरानी और अवलोकन**

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

## **उद्यम एकीकरण परिदृश्य**

### **परिदृश्य 1: वितरित MCP प्रोसेसिंग**

MCP अनुरोधों को Azure Event Grid के माध्यम से कई प्रोसेसिंग नोड्स में वितरित करना:

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

### **परिदृश्य 2: वास्तविक समय MCP स्ट्रीमिंग**

उच्च-आवृत्ति MCP इंटरैक्शन के लिए Azure Event Hubs का उपयोग:

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

### **परिदृश्य 3: हाइब्रिड ट्रांसपोर्ट आर्किटेक्चर**

विभिन्न उपयोग मामलों के लिए कई ट्रांसपोर्ट्स का संयोजन:

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

## **प्रदर्शन अनुकूलन**

### **Event Grid के लिए संदेश बॅचिंग**

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

### **Event Hubs के लिए पार्टिशनिंग रणनीति**

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

## **कस्टम ट्रांसपोर्ट के लिए परीक्षण**

### **टेस्ट डबल्स के साथ यूनिट टेस्टिंग**

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

### **Azure टेस्ट कंटेनर्स के साथ एकीकरण परीक्षण**

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

## **सर्वोत्तम अभ्यास और दिशानिर्देश**

### **ट्रांसपोर्ट डिज़ाइन सिद्धांत**

1. **इडेम्पोटेंसी**: डुप्लिकेट्स को संभालने के लिए संदेश प्रोसेसिंग को इडेम्पोटेंट बनाएं
2. **त्रुटि प्रबंधन**: व्यापक त्रुटि प्रबंधन और डेड लेटर कतारों को लागू करें
3. **निगरानी**: विस्तृत टेलीमेट्री और हेल्थ चेक जोड़ें
4. **सुरक्षा**: प्रबंधित पहचान और न्यूनतम विशेषाधिकार एक्सेस का उपयोग करें
5. **प्रदर्शन**: अपनी विशिष्ट विलंबता और थ्रूपुट आवश्यकताओं के लिए डिज़ाइन करें

### **Azure-विशिष्ट सिफारिशें**

1. **प्रबंधित पहचान का उपयोग करें**: प्रोडक्शन में कनेक्शन स्ट्रिंग से बचें
2. **सर्किट ब्रेकर्स लागू करें**: Azure सेवा आउटेज से सुरक्षा के लिए
3. **लागतों की निगरानी करें**: संदेश मात्रा और प्रोसेसिंग लागतों को ट्रैक करें
4. **स्केलिंग की योजना बनाएं**: प्रारंभ में पार्टिशनिंग और स्केलिंग रणनीतियाँ डिज़ाइन करें
5. **गहन परीक्षण करें**: व्यापक परीक्षण के लिए Azure DevTest Labs का उपयोग करें

## **निष्कर्ष**

कस्टम MCP ट्रांसपोर्ट Azure की मैसेजिंग सेवाओं का उपयोग करके शक्तिशाली उद्यम परिदृश्यों को सक्षम बनाते हैं। Event Grid या Event Hubs ट्रांसपोर्ट को लागू करके, आप स्केलेबल, विश्वसनीय MCP समाधान बना सकते हैं जो मौजूदा Azure इन्फ्रास्ट्रक्चर के साथ निर्बाध एकीकृत होते हैं।

प्रदत्त उदाहरण MCP प्रोटोकॉल अनुपालन और Azure सर्वोत्तम प्रथाओं को बनाए रखते हुए कस्टम ट्रांसपोर्ट कार्यान्वयन के लिए उत्पादन-तैयार पैटर्न दिखाते हैं।

## **अतिरिक्त संसाधन**

- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/)
- [Azure Event Grid Documentation](https://docs.microsoft.com/azure/event-grid/)
- [Azure Event Hubs Documentation](https://docs.microsoft.com/azure/event-hubs/)
- [Azure Functions Event Grid Trigger](https://docs.microsoft.com/azure/azure-functions/functions-bindings-event-grid)
- [Azure SDK for .NET](https://github.com/Azure/azure-sdk-for-net)
- [Azure SDK for TypeScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure SDK for Python](https://github.com/Azure/azure-sdk-for-python)

---

> *यह मार्गदर्शिका उत्पादन MCP सिस्टम के लिए व्यावहारिक कार्यान्वयन पैटर्न पर केंद्रित है। अपने विशिष्ट आवश्यकताओं और Azure सेवा सीमाओं के विरुद्ध ट्रांसपोर्ट कार्यान्वयन को हमेशा सत्यापित करें।*
> **वर्तमान मानक**: यह मार्गदर्शिका [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) ट्रांसपोर्ट आवश्यकताओं और उद्यम वातावरण के लिए उन्नत ट्रांसपोर्ट पैटर्न को दर्शाती है।


## आगे क्या है
- [6. Community Contributions](../../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->