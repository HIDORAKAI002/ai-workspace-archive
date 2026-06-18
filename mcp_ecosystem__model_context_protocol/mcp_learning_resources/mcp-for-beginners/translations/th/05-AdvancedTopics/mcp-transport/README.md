# MCP Custom Transports - คู่มือการใช้งานขั้นสูง

โปรโตคอล Model Context (MCP) มอบความยืดหยุ่นในการใช้กลไกการส่งข้อมูล ช่วยให้สามารถใช้งานแบบกำหนดเองสำหรับสภาพแวดล้อมองค์กรพิเศษ คู่มือขั้นสูงนี้จะสำรวจการใช้งานการส่งข้อมูลแบบกำหนดเองโดยใช้ Azure Event Grid และ Azure Event Hubs เป็นตัวอย่างเชิงปฏิบัติสำหรับการสร้างโซลูชัน MCP ที่ปรับขนาดได้และเนทีฟบนคลาวด์

## บทนำ

ในขณะที่การส่งข้อมูลมาตรฐานของ MCP (stdio และ HTTP streaming) รองรับการใช้งานส่วนใหญ่ สภาพแวดล้อมองค์กรมักต้องการกลไกการส่งข้อมูลเฉพาะสำหรับความสามารถในการปรับขนาด ความน่าเชื่อถือ และการรวมระบบกับโครงสร้างพื้นฐานคลาวด์ที่มีอยู่ การส่งข้อมูลแบบกำหนดเองช่วยให้ MCP ใช้ประโยชน์จากบริการส่งข้อความเนทีฟบนคลาวด์สำหรับการสื่อสารแบบอะซิงโครนัส สถาปัตยกรรมที่ขับเคลื่อนด้วยเหตุการณ์ และการประมวลผลแบบกระจาย

บทเรียนนี้สำรวจการใช้งานการส่งข้อมูลขั้นสูงโดยอิงตามข้อกำหนด MCP ล่าสุด (2025-11-25) บริการส่งข้อความของ Azure และรูปแบบการรวมองค์กรที่ได้รับการยอมรับ

### **สถาปัตยกรรมการส่งข้อมูลของ MCP**

**จากข้อกำหนด MCP (2025-11-25):**

- **การส่งข้อมูลมาตรฐาน**: stdio (แนะนำ), HTTP streaming (สำหรับสถานการณ์ระยะไกล)
- **การส่งข้อมูลแบบกำหนดเอง**: การส่งข้อมูลใดก็ได้ที่ใช้งานโปรโตคอลแลกเปลี่ยนข้อความ MCP
- **รูปแบบข้อความ**: JSON-RPC 2.0 พร้อมส่วนขยายเฉพาะ MCP
- **การสื่อสารสองทิศทาง**: ต้องการการสื่อสารเต็มสองทางสำหรับการแจ้งเตือนและการตอบสนอง

## เป้าหมายการเรียนรู้

เมื่อจบบทเรียนขั้นสูงนี้ คุณจะสามารถ:

- **เข้าใจข้อกำหนดการส่งข้อมูลแบบกำหนดเอง**: ใช้งานโปรโตคอล MCP บนชั้นการส่งข้อมูลใดก็ได้อย่างสอดคล้องตามข้อกำหนด
- **สร้างการส่งข้อมูล Azure Event Grid**: สร้างเซิร์ฟเวอร์ MCP ขับเคลื่อนด้วยเหตุการณ์โดยใช้ Azure Event Grid สำหรับขยายแบบไม่มีเซิร์ฟเวอร์
- **ใช้งานการส่งข้อมูล Azure Event Hubs**: ออกแบบโซลูชัน MCP กำลังสูงโดยใช้ Azure Event Hubs สำหรับการสตรีมแบบเรียลไทม์
- **ประยุกต์ใช้รูปแบบองค์กร**: รวมการส่งข้อมูลแบบกำหนดเองกับโครงสร้างพื้นฐาน Azure และโมเดลความปลอดภัยที่มีอยู่
- **จัดการความน่าเชื่อถือของการส่งข้อมูล**: ใช้งานความทนทานของข้อความ การเรียงลำดับ และการจัดการข้อผิดพลาดสำหรับสถานการณ์องค์กร
- **เพิ่มประสิทธิภาพประสิทธิผล**: ออกแบบโซลูชันการส่งข้อมูลสำหรับความต้องการการขยายตัว ความหน่วง และอัตราการส่งข้อมูล

## **ข้อกำหนดการส่งข้อมูล**

### **ข้อกำหนดหลักจากข้อกำหนด MCP (2025-11-25):**

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

## **การใช้งานการส่งข้อมูล Azure Event Grid**

Azure Event Grid ให้บริการเส้นทางเหตุการณ์แบบไม่มีเซิร์ฟเวอร์ เหมาะสำหรับสถาปัตยกรรม MCP ที่ขับเคลื่อนด้วยเหตุการณ์ การใช้งานนี้แสดงวิธีการสร้างระบบ MCP ที่ปรับขนาดได้และเชื่อมโยงแบบหย่อน

### **ภาพรวมสถาปัตยกรรม**

```mermaid
graph TB
    Client[MCP ลูกค้า] --> EG[Azure Event Grid]
    EG --> Server[MCP เซิร์ฟเวอร์ฟังก์ชัน]
    Server --> EG
    EG --> Client
    
    subgraph "บริการของ Azure"
        EG
        Server
        KV[Key Vault]
        Monitor[Application Insights]
    end
```

### **การใช้งาน C# - การส่งข้อมูล Event Grid**

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

### **การใช้งาน TypeScript - การส่งข้อมูล Event Grid**

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
    
    // รับข้อมูลแบบขับเคลื่อนด้วยเหตุการณ์ผ่าน Azure Functions
    onMessage(handler: (message: McpMessage) => Promise<void>): void {
        // การใช้งานจะใช้ตัวทริกเกอร์ Event Grid ของ Azure Functions
        // นี่คืออินเทอร์เฟซแนวคิดสำหรับตัวรับ webhook
    }
}

// การใช้งาน Azure Functions
import { app, InvocationContext, EventGridEvent } from "@azure/functions";

app.eventGrid("mcpEventGridHandler", {
    handler: async (event: EventGridEvent, context: InvocationContext) => {
        try {
            const mcpMessage = event.data as McpMessage;
            
            // ประมวลผลข้อความ MCP
            const response = await mcpServer.processMessage(mcpMessage);
            
            // ส่งการตอบกลับผ่าน Event Grid
            await transport.sendMessage(response);
            
        } catch (error) {
            context.error("Error processing MCP message:", error);
            throw error;
        }
    }
});
```

### **การใช้งาน Python - การส่งข้อมูล Event Grid**

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

# การใช้งาน Azure Functions
import azure.functions as func
import logging

def main(event: func.EventGridEvent) -> None:
    """Azure Functions Event Grid trigger for MCP messages"""
    try:
        # แยกวิเคราะห์ข้อความ MCP จากเหตุการณ์ Event Grid
        mcp_message = json.loads(event.get_body().decode('utf-8'))
        
        # ประมวลผลข้อความ MCP
        response = process_mcp_message(mcp_message)
        
        # ส่งการตอบกลับกลับผ่าน Event Grid
        # (การใช้งานจะสร้างไคลเอนต์ Event Grid ใหม่)
        
    except Exception as e:
        logging.error(f"Error processing MCP Event Grid message: {e}")
        raise
```

## **การใช้งานการส่งข้อมูล Azure Event Hubs**

Azure Event Hubs ให้ความสามารถการสตรีมความเร็วสูงแบบเรียลไทม์ สำหรับสถานการณ์ MCP ที่ต้องการความหน่วงต่ำและปริมาณข้อความสูง

### **ภาพรวมสถาปัตยกรรม**

```mermaid
graph TB
    Client[MCP Client] --> EH[Azure Event Hubs]
    EH --> Server[MCP Server]
    Server --> EH
    EH --> Client
    
    subgraph "คุณสมบัติของ Event Hubs"
        Partition[การแบ่งพาร์ติชัน]
        Retention[การเก็บรักษาข้อความ]
        Scaling[การปรับขนาดอัตโนมัติ]
    end
    
    EH --> Partition
    EH --> Retention
    EH --> Scaling
```

### **การใช้งาน C# - การส่งข้อมูล Event Hubs**

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

### **การใช้งาน TypeScript - การส่งข้อมูล Event Hubs**

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
                        
                        // อัปเดตจุดตรวจสอบสำหรับการส่งอย่างน้อยหนึ่งครั้ง
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

### **การใช้งาน Python - การส่งข้อมูล Event Hubs**

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
        
        # เพิ่มคุณสมบัติเฉพาะของ MCP
        event_data.properties = {
            "messageType": message.get("method", "response"),
            "messageId": message.get("id"),
            "timestamp": "2025-01-14T10:30:00Z"  # ใช้เวลาประทับจริง
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
                starting_position="-1"  # เริ่มจากต้น
            )
    
    def _on_event_received(self, handler: Callable):
        """Internal event handler wrapper"""
        async def handle_event(partition_context, event):
            try:
                # แยกวิเคราะห์ข้อความ MCP จากเหตุการณ์ Event Hubs
                message_body = event.body_as_str(encoding='UTF-8')
                mcp_message = json.loads(message_body)
                
                # ประมวลผลข้อความ MCP
                await handler(mcp_message)
                
                # อัปเดตจุดตรวจสอบสำหรับการส่งซ้ำอย่างน้อยหนึ่งครั้ง
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

## **รูปแบบการส่งข้อมูลขั้นสูง**

### **ความทนทานและความน่าเชื่อถือของข้อความ**

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

### **การรวมความปลอดภัยของการส่งข้อมูล**

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

### **การตรวจสอบและการสังเกตของการส่งข้อมูล**

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

## **สถานการณ์การรวมระบบองค์กร**

### **สถานการณ์ที่ 1: การประมวลผล MCP แบบกระจาย**

ใช้ Azure Event Grid สำหรับกระจายคำขอ MCP ข้ามโหนดประมวลผลหลายตัว:

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

### **สถานการณ์ที่ 2: การสตรีม MCP แบบเรียลไทม์**

ใช้ Azure Event Hubs สำหรับการโต้ตอบ MCP ความถี่สูง:

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

### **สถานการณ์ที่ 3: สถาปัตยกรรมการส่งข้อมูลแบบไฮบริด**

ผสมผสานการส่งข้อมูลหลายแบบสำหรับกรณีใช้งานต่างๆ:

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

## **การเพิ่มประสิทธิภาพประสิทธิผล**

### **การจัดกลุ่มข้อความสำหรับ Event Grid**

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

### **กลยุทธ์การแบ่งพาร์ติชันสำหรับ Event Hubs**

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

## **การทดสอบการส่งข้อมูลแบบกำหนดเอง**

### **การทดสอบหน่วยด้วย Test Doubles**

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

### **การทดสอบแบบบูรณาการด้วย Azure Test Containers**

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

## **แนวทางปฏิบัติที่ดีที่สุดและคำแนะนำ**

### **หลักการออกแบบการส่งข้อมูล**

1. **Idempotency**: ตรวจสอบให้แน่ใจว่าการประมวลผลข้อความสามารถทำซ้ำได้โดยไม่เกิดผลลัพธ์ซ้ำซ้อน
2. **การจัดการข้อผิดพลาด**: ใช้งานการจัดการข้อผิดพลาดอย่างครอบคลุมและคิวข้อความเสีย
3. **การตรวจสอบ**: เพิ่มระบบเทเลเมทรีและการตรวจสุขภาพอย่างละเอียด
4. **ความปลอดภัย**: ใช้อัตลักษณ์ที่จัดการและการเข้าถึงที่มีสิทธิ์น้อยที่สุด
5. **ประสิทธิภาพ**: ออกแบบตามความต้องการเฉพาะของความหน่วงและอัตราการส่งข้อมูลของคุณ

### **คำแนะนำเฉพาะสำหรับ Azure**

1. **ใช้ Managed Identity**: หลีกเลี่ยงการใช้สตริงการเชื่อมต่อในสภาพแวดล้อมการผลิต
2. **ใช้งาน Circuit Breakers**: ป้องกันการขัดข้องของบริการ Azure
3. **ตรวจสอบค่าใช้จ่าย**: ติดตามปริมาณข้อความและค่าใช้จ่ายในการประมวลผล
4. **วางแผนการปรับขนาด**: ออกแบบการแบ่งพาร์ติชันและกลยุทธ์การปรับขนาดตั้งแต่เนิ่นๆ
5. **ทดสอบอย่างละเอียด**: ใช้ Azure DevTest Labs สำหรับการทดสอบอย่างครอบคลุม

## **บทสรุป**

การส่งข้อมูล MCP แบบกำหนดเองช่วยให้เกิดสถานการณ์องค์กรที่ทรงพลังโดยใช้บริการส่งข้อความของ Azure ด้วยการใช้งาน Event Grid หรือ Event Hubs คุณสามารถสร้างโซลูชัน MCP ที่ปรับขนาดได้ น่าเชื่อถือ และรวมเข้ากับโครงสร้างพื้นฐาน Azure ที่มีอยู่ได้อย่างราบรื่น

ตัวอย่างที่ให้ไว้แสดงรูปแบบที่พร้อมใช้จริงสำหรับการใช้งานการส่งข้อมูลแบบกำหนดเอง ขณะเดียวกันยังคงรักษาความสอดคล้องกับโปรโตคอล MCP และแนวทางปฏิบัติที่ดีที่สุดของ Azure

## **ทรัพยากรเพิ่มเติม**

- [ข้อกำหนด MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/)
- [เอกสาร Azure Event Grid](https://docs.microsoft.com/azure/event-grid/)
- [เอกสาร Azure Event Hubs](https://docs.microsoft.com/azure/event-hubs/)
- [Azure Functions Event Grid Trigger](https://docs.microsoft.com/azure/azure-functions/functions-bindings-event-grid)
- [Azure SDK สำหรับ .NET](https://github.com/Azure/azure-sdk-for-net)
- [Azure SDK สำหรับ TypeScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure SDK สำหรับ Python](https://github.com/Azure/azure-sdk-for-python)

---

> *คู่มือฉบับนี้มุ่งเน้นที่รูปแบบการใช้งานเชิงปฏิบัติสำหรับระบบ MCP ที่พร้อมใช้งานจริง ควรตรวจสอบการใช้งานการส่งข้อมูลให้สอดคล้องกับข้อกำหนดและข้อจำกัดของบริการ Azure ของคุณเสมอ*  
> **มาตรฐานปัจจุบัน**: คู่มือนี้สะท้อนข้อกำหนดการส่งข้อมูลและรูปแบบการส่งข้อมูลขั้นสูงสำหรับสภาพแวดล้อมองค์กร ตาม [ข้อกำหนด MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/)


## ต่อไป
- [6. การมีส่วนร่วมของชุมชน](../../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->