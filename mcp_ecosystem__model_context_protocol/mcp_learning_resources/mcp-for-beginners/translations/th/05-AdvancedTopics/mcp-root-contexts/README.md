> [เลิกใช้: ตัวอย่างเวอร์ชันปล่อย 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# MCP รากของบริบท

> **ประกาศเลิกใช้:** ตัวอย่างเวอร์ชันปล่อยสเปค MCP `2026-07-28` กำหนดให้ Roots เลิกใช้และแนะนำให้ใช้พารามิเตอร์เครื่องมือ, URI ของทรัพยากร, หรือการตั้งค่าเซิร์ฟเวอร์แทน Roots ยังคงทำงานในเวอร์ชัน `2025-11-25` และอย่างน้อยหนึ่งปีหลังการเลิกใช้ทางการ ดังนั้นเนื้อหาในบทเรียนนี้ยังคงใช้งานได้ - แต่การออกแบบเซิร์ฟเวอร์ใหม่ควรพิจารณารูปแบบการทดแทน ดูเพิ่มเติมที่ [What’s Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)

รากของบริบทเป็นแนวคิดพื้นฐานใน Model Context Protocol ที่ให้ชั้นที่คงทนสำหรับเก็บประวัติการสนทนาและสถานะร่วมกันในหลายคำขอและหลายเซสชัน

## บทนำ

ในบทเรียนนี้ เราจะสำรวจวิธีสร้าง จัดการ และใช้งานรากของบริบทใน MCP

## วัตถุประสงค์การเรียนรู้

เมื่อจบบทเรียนนี้ คุณจะสามารถ:

- เข้าใจวัตถุประสงค์และโครงสร้างของรากของบริบท
- สร้างและจัดการรากของบริบทโดยใช้ไลบรารีไคลเอนต์ MCP
- ใช้งานรากของบริบทในแอปพลิเคชัน .NET, Java, JavaScript และ Python
- ใช้รากของบริบทสำหรับการสนทนาแบบหลายรอบและการจัดการสถานะ
- นำแนวทางปฏิบัติที่ดีที่สุดสำหรับการจัดการรากของบริบทไปใช้งาน

## ทำความเข้าใจกับรากของบริบท

รากของบริบททำหน้าที่เป็นภาชนะที่เก็บประวัติและสถานะสำหรับชุดของปฏิสัมพันธ์ที่เกี่ยวข้องกัน ซึ่งช่วย:

- **การเก็บรักษาการสนทนา**: รักษาการสนทนาแบบหลายรอบอย่างสอดคล้อง
- **การจัดการหน่วยความจำ**: การจัดเก็บและเรียกคืนข้อมูลข้ามปฏิสัมพันธ์
- **การจัดการสถานะ**: การติดตามความคืบหน้าในกระบวนการซับซ้อน
- **การแชร์บริบท**: อนุญาตให้ไคลเอนต์หลายรายเข้าถึงสถานะการสนทนาเดียวกัน

ใน MCP รากของบริบทมีลักษณะสำคัญดังนี้:

- รากของบริบทแต่ละรายการมีตัวระบุเฉพาะ
- พวกมันสามารถเก็บประวัติการสนทนา, ความชอบของผู้ใช้, และเมตาดาทาอื่น ๆ
- สามารถสร้าง, เข้าถึง และเก็บถาวรได้ตามต้องการ
- สนับสนุนการควบคุมการเข้าถึงและสิทธิ์ในระดับละเอียด

## วงจรชีวิตของรากบริบท

```mermaid
flowchart TD
    A[สร้างบริบทราก] --> B[เริ่มต้นด้วยข้อมูลเมตา]
    B --> C[ส่งคำขอพร้อมรหัสบริบท]
    C --> D[อัปเดตบริบทด้วยผลลัพธ์]
    D --> C
    D --> E[จัดเก็บบริบทเมื่อเสร็จสิ้น]
```

## การทำงานกับรากของบริบท

นี่คือตัวอย่างวิธีสร้างและจัดการรากของบริบท

### ตัวอย่างการใช้งานใน C#

```csharp
// .NET Example: Root Context Management
using Microsoft.Mcp.Client;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

public class RootContextExample
{
    private readonly IMcpClient _client;
    private readonly IRootContextManager _contextManager;
    
    public RootContextExample(IMcpClient client, IRootContextManager contextManager)
    {
        _client = client;
        _contextManager = contextManager;
    }
    
    public async Task DemonstrateRootContextAsync()
    {
        // 1. Create a new root context
        var contextResult = await _contextManager.CreateRootContextAsync(new RootContextCreateOptions
        {
            Name = "Customer Support Session",
            Metadata = new Dictionary<string, string>
            {
                ["CustomerName"] = "Acme Corporation",
                ["PriorityLevel"] = "High",
                ["Domain"] = "Cloud Services"
            }
        });
        
        string contextId = contextResult.ContextId;
        Console.WriteLine($"Created root context with ID: {contextId}");
        
        // 2. First interaction using the context
        var response1 = await _client.SendPromptAsync(
            "I'm having issues scaling my web service deployment in the cloud.", 
            new SendPromptOptions { RootContextId = contextId }
        );
        
        Console.WriteLine($"First response: {response1.GeneratedText}");
        
        // Second interaction - the model will have access to the previous conversation
        var response2 = await _client.SendPromptAsync(
            "Yes, we're using containerized deployments with Kubernetes.", 
            new SendPromptOptions { RootContextId = contextId }
        );
        
        Console.WriteLine($"Second response: {response2.GeneratedText}");
        
        // 3. Add metadata to the context based on conversation
        await _contextManager.UpdateContextMetadataAsync(contextId, new Dictionary<string, string>
        {
            ["TechnicalEnvironment"] = "Kubernetes",
            ["IssueType"] = "Scaling"
        });
        
        // 4. Get context information
        var contextInfo = await _contextManager.GetRootContextInfoAsync(contextId);
        
        Console.WriteLine("Context Information:");
        Console.WriteLine($"- Name: {contextInfo.Name}");
        Console.WriteLine($"- Created: {contextInfo.CreatedAt}");
        Console.WriteLine($"- Messages: {contextInfo.MessageCount}");
        
        // 5. When the conversation is complete, archive the context
        await _contextManager.ArchiveRootContextAsync(contextId);
        Console.WriteLine($"Archived context {contextId}");
    }
}
```

ในโค้ดตัวอย่างก่อนหน้านี้ เราได้:

1. สร้างรากของบริบทสำหรับเซสชันฝ่ายสนับสนุนลูกค้า
1. ส่งข้อความหลายข้อความภายในบริบทนั้น เพื่อให้โมเดลสามารถรักษาสถานะได้
1. อัปเดตบริบทด้วยเมตาดาทาที่เกี่ยวข้องตามการสนทนา
1. ดึงข้อมูลบริบทเพื่อทำความเข้าใจประวัติการสนทนา
1. เก็บถาวรบริบทเมื่อการสนทนาเสร็จสิ้น

## ตัวอย่าง: การใช้งานรากของบริบทสำหรับการวิเคราะห์การเงิน

ในตัวอย่างนี้ เราจะสร้างรากของบริบทสำหรับเซสชันวิเคราะห์การเงิน พร้อมสาธิตวิธีรักษาสถานะในหลายปฏิสัมพันธ์

### ตัวอย่างการใช้งานใน Java

```java
// ตัวอย่าง Java: การใช้งาน Root Context
package com.example.mcp.contexts;

import com.mcp.client.McpClient;
import com.mcp.client.ContextManager;
import com.mcp.models.RootContext;
import com.mcp.models.McpResponse;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class RootContextsDemo {
    private final McpClient client;
    private final ContextManager contextManager;
    
    public RootContextsDemo(String serverUrl) {
        this.client = new McpClient.Builder()
            .setServerUrl(serverUrl)
            .build();
            
        this.contextManager = new ContextManager(client);
    }
    
    public void demonstrateRootContext() throws Exception {
        // สร้างเมตาดาต้าของบริบท
        Map<String, String> metadata = new HashMap<>();
        metadata.put("projectName", "Financial Analysis");
        metadata.put("userRole", "Financial Analyst");
        metadata.put("dataSource", "Q1 2025 Financial Reports");
        
        // 1. สร้าง root context ใหม่
        RootContext context = contextManager.createRootContext("Financial Analysis Session", metadata);
        String contextId = context.getId();
        
        System.out.println("Created context: " + contextId);
        
        // 2. การโต้ตอบครั้งแรก
        McpResponse response1 = client.sendPrompt(
            "Analyze the trends in Q1 financial data for our technology division",
            contextId
        );
        
        System.out.println("First response: " + response1.getGeneratedText());
        
        // 3. อัปเดตบริบทด้วยข้อมูลสำคัญที่ได้รับจากการตอบกลับ
        contextManager.addContextMetadata(contextId, 
            Map.of("identifiedTrend", "Increasing cloud infrastructure costs"));
        
        // การโต้ตอบครั้งที่สอง - ใช้บริบทเดียวกัน
        McpResponse response2 = client.sendPrompt(
            "What's driving the increase in cloud infrastructure costs?",
            contextId
        );
        
        System.out.println("Second response: " + response2.getGeneratedText());
        
        // 4. สร้างสรุปของเซสชันวิเคราะห์
        McpResponse summaryResponse = client.sendPrompt(
            "Summarize our analysis of the technology division financials in 3-5 key points",
            contextId
        );
        
        // เก็บสรุปลงในเมตาดาต้าของบริบท
        contextManager.addContextMetadata(contextId, 
            Map.of("analysisSummary", summaryResponse.getGeneratedText()));
            
        // ดึงข้อมูลบริบทที่อัปเดตแล้ว
        RootContext updatedContext = contextManager.getRootContext(contextId);
        
        System.out.println("Context Information:");
        System.out.println("- Created: " + updatedContext.getCreatedAt());
        System.out.println("- Last Updated: " + updatedContext.getLastUpdatedAt());
        System.out.println("- Analysis Summary: " + 
            updatedContext.getMetadata().get("analysisSummary"));
            
        // 5. จัดเก็บบริบทเมื่อเสร็จสิ้น
        contextManager.archiveContext(contextId);
        System.out.println("Context archived");
    }
}
```

ในโค้ดตัวอย่างก่อนหน้านี้ เราได้:

1. สร้างรากของบริบทสำหรับเซสชันวิเคราะห์ทางการเงิน
2. ส่งข้อความหลายข้อความภายในบริบทนั้น เพื่อให้โมเดลรักษาสถานะได้
3. อัปเดตบริบทด้วยเมตาดาทาที่เกี่ยวข้องตามการสนทนา
4. สร้างสรุปของเซสชันวิเคราะห์และเก็บไว้ในเมตาดาทาของบริบท
5. เก็บถาวรบริบทเมื่อการสนทนาเสร็จสิ้น

## ตัวอย่าง: การจัดการรากของบริบท

การจัดการรากของบริบทอย่างมีประสิทธิภาพสำคัญสำหรับการรักษาประวัติการสนทนาและสถานะ ด้านล่างคือตัวอย่างการใช้งานการจัดการรากของบริบท

### ตัวอย่างการใช้งานใน JavaScript

```javascript
// ตัวอย่าง JavaScript: การจัดการ MCP Root Contexts
const { McpClient, RootContextManager } = require('@mcp/client');

class ContextSession {
  constructor(serverUrl, apiKey = null) {
    // เริ่มต้นไคลเอนต์ MCP
    this.client = new McpClient({
      serverUrl,
      apiKey
    });
    
    // เริ่มต้นตัวจัดการบริบท
    this.contextManager = new RootContextManager(this.client);
  }
  
  /**
   * Create a new conversation context
   * @param {string} sessionName - Name of the conversation session
   * @param {Object} metadata - Additional metadata for the context
   * @returns {Promise<string>} - Context ID
   */
  async createConversationContext(sessionName, metadata = {}) {
    try {
      const contextResult = await this.contextManager.createRootContext({
        name: sessionName,
        metadata: {
          ...metadata,
          createdAt: new Date().toISOString(),
          status: 'active'
        }
      });
      
      console.log(`Created root context '${sessionName}' with ID: ${contextResult.id}`);
      return contextResult.id;
    } catch (error) {
      console.error('Error creating root context:', error);
      throw error;
    }
  }
  
  /**
   * Send a message in an existing context
   * @param {string} contextId - The root context ID
   * @param {string} message - The user's message
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - Response data
   */
  async sendMessage(contextId, message, options = {}) {
    try {
      // ส่งข้อความโดยใช้บริบทที่ระบุ
      const response = await this.client.sendPrompt(message, {
        rootContextId: contextId,
        temperature: options.temperature || 0.7,
        allowedTools: options.allowedTools || []
      });
      
      // จัดเก็บข้อมูลเชิงลึกที่สำคัญจากบทสนทนาได้ตามต้องการ
      if (options.storeInsights) {
        await this.storeConversationInsights(contextId, message, response.generatedText);
      }
      
      return {
        message: response.generatedText,
        toolCalls: response.toolCalls || [],
        contextId
      };
    } catch (error) {
      console.error(`Error sending message in context ${contextId}:`, error);
      throw error;
    }
  }
  
  /**
   * Store important insights from a conversation
   * @param {string} contextId - The root context ID
   * @param {string} userMessage - User's message
   * @param {string} aiResponse - AI's response
   */
  async storeConversationInsights(contextId, userMessage, aiResponse) {
    try {
      // สกัดข้อมูลเชิงลึกที่เป็นไปได้ (ในแอปจริงจะซับซ้อนกว่า)
      const combinedText = userMessage + "\n" + aiResponse;
      
      // วิธีง่าย ๆ ในการระบุข้อมูลเชิงลึกที่เป็นไปได้
      const insightWords = ["important", "key point", "remember", "significant", "crucial"];
      
      const potentialInsights = combinedText
        .split(".")
        .filter(sentence => 
          insightWords.some(word => sentence.toLowerCase().includes(word))
        )
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 10);
      
      // จัดเก็บข้อมูลเชิงลึกในข้อมูลเมตาของบริบท
      if (potentialInsights.length > 0) {
        const insights = {};
        potentialInsights.forEach((insight, index) => {
          insights[`insight_${Date.now()}_${index}`] = insight;
        });
        
        await this.contextManager.updateContextMetadata(contextId, insights);
        console.log(`Stored ${potentialInsights.length} insights in context ${contextId}`);
      }
    } catch (error) {
      console.warn('Error storing conversation insights:', error);
      // เป็นข้อผิดพลาดที่ไม่ร้ายแรง ดังนั้นจึงแค่บันทึกคำเตือน
    }
  }
  
  /**
   * Get summary information about a context
   * @param {string} contextId - The root context ID
   * @returns {Promise<Object>} - Context information
   */
  async getContextInfo(contextId) {
    try {
      const contextInfo = await this.contextManager.getContextInfo(contextId);
      
      return {
        id: contextInfo.id,
        name: contextInfo.name,
        created: new Date(contextInfo.createdAt).toLocaleString(),
        lastUpdated: new Date(contextInfo.lastUpdatedAt).toLocaleString(),
        messageCount: contextInfo.messageCount,
        metadata: contextInfo.metadata,
        status: contextInfo.status
      };
    } catch (error) {
      console.error(`Error getting context info for ${contextId}:`, error);
      throw error;
    }
  }
  
  /**
   * Generate a summary of the conversation in a context
   * @param {string} contextId - The root context ID
   * @returns {Promise<string>} - Generated summary
   */
  async generateContextSummary(contextId) {
    try {
      // ขอให้โมเดลสร้างสรุปบทสนทนาจนถึงตอนนี้
      const response = await this.client.sendPrompt(
        "Please summarize our conversation so far in 3-4 sentences, highlighting the main points discussed.",
        { rootContextId: contextId, temperature: 0.3 }
      );
      
      // จัดเก็บสรุปในข้อมูลเมตาของบริบท
      await this.contextManager.updateContextMetadata(contextId, {
        conversationSummary: response.generatedText,
        summarizedAt: new Date().toISOString()
      });
      
      return response.generatedText;
    } catch (error) {
      console.error(`Error generating context summary for ${contextId}:`, error);
      throw error;
    }
  }
  
  /**
   * Archive a context when it's no longer needed
   * @param {string} contextId - The root context ID
   * @returns {Promise<Object>} - Result of the archive operation
   */
  async archiveContext(contextId) {
    try {
      // สร้างสรุปสุดท้ายก่อนทำการเก็บถาวร
      const summary = await this.generateContextSummary(contextId);
      
      // เก็บถาวรบริบท
      await this.contextManager.archiveContext(contextId);
      
      return {
        status: "archived",
        contextId,
        summary
      };
    } catch (error) {
      console.error(`Error archiving context ${contextId}:`, error);
      throw error;
    }
  }
}

// ตัวอย่างการใช้งาน
async function demonstrateContextSession() {
  const session = new ContextSession('https://mcp-server-example.com');
  
  try {
    // 1. สร้างบริบทใหม่สำหรับการสนับสนุนผลิตภัณฑ์
    const contextId = await session.createConversationContext(
      'Product Support - Database Performance',
      {
        customer: 'Globex Corporation',
        product: 'Enterprise Database',
        severity: 'Medium',
        supportAgent: 'AI Assistant'
      }
    );
    
    // 2. ข้อความแรกในบทสนทนา
    const response1 = await session.sendMessage(
      contextId,
      "I'm experiencing slow query performance on our database cluster after the latest update.",
      { storeInsights: true }
    );
    console.log('Response 1:', response1.message);
    
    // ข้อความติดตามในบริบทเดียวกัน
    const response2 = await session.sendMessage(
      contextId,
      "Yes, we've already checked the indexes and they seem to be properly configured.",
      { storeInsights: true }
    );
    console.log('Response 2:', response2.message);
    
    // 3. รับข้อมูลเกี่ยวกับบริบท
    const contextInfo = await session.getContextInfo(contextId);
    console.log('Context Information:', contextInfo);
    
    // 4. สร้างและแสดงสรุปบทสนทนา
    const summary = await session.generateContextSummary(contextId);
    console.log('Conversation Summary:', summary);
    
    // 5. เก็บถาวรบริบทเมื่อเสร็จสิ้น
    const archiveResult = await session.archiveContext(contextId);
    console.log('Archive Result:', archiveResult);
    
    // 6. จัดการข้อผิดพลาดอย่างมีวิจารณญาณ
  } catch (error) {
    console.error('Error in context session demonstration:', error);
  }
}

demonstrateContextSession();
```

ในโค้ดตัวอย่างก่อนหน้านี้ เราได้:

1. สร้างรากของบริบทสำหรับการสนทนาฝ่ายสนับสนุนผลิตภัณฑ์ด้วยฟังก์ชัน `createConversationContext` ในกรณีนี้บริบทเกี่ยวกับปัญหาประสิทธิภาพฐานข้อมูล

1. ส่งข้อความหลายข้อความภายในบริบทนั้น เพื่อให้โมเดลรักษาสถานะด้วยฟังก์ชัน `sendMessage` ข้อความที่ส่งเกี่ยวกับประสิทธิภาพการค้นหาช้าที่และการตั้งค่าดัชนี

1. อัปเดตบริบทด้วยเมตาดาทาที่เกี่ยวข้องตามการสนทนา

1. สร้างสรุปของการสนทนาและเก็บไว้ในเมตาดาทาของบริบทด้วยฟังก์ชัน `generateContextSummary`

1. เก็บถาวรบริบทเมื่อการสนทนาเสร็จสิ้นด้วยฟังก์ชัน `archiveContext`

1. จัดการข้อผิดพลาดอย่างราบรื่นเพื่อให้มีความทนทาน

## รากบริบทสำหรับความช่วยเหลือแบบหลายรอบ

ในตัวอย่างนี้ เราจะสร้างรากของบริบทสำหรับเซสชันช่วยเหลือแบบหลายรอบ โดยสาธิตวิธีรักษาสถานะในหลายปฏิสัมพันธ์

### ตัวอย่างการใช้งานใน Python

```python
# ตัวอย่าง Python: รากฐานบริบทสำหรับการช่วยเหลือหลายรอบ
import asyncio
from datetime import datetime
from mcp_client import McpClient, RootContextManager

class AssistantSession:
    def __init__(self, server_url, api_key=None):
        self.client = McpClient(server_url=server_url, api_key=api_key)
        self.context_manager = RootContextManager(self.client)
    
    async def create_session(self, name, user_info=None):
        """Create a new root context for an assistant session"""
        metadata = {
            "session_type": "assistant",
            "created_at": datetime.now().isoformat(),
        }
        
        # เพิ่มข้อมูลผู้ใช้ถ้ามีการระบุ
        if user_info:
            metadata.update({f"user_{k}": v for k, v in user_info.items()})
            
        # สร้างบริบทหลัก
        context = await self.context_manager.create_root_context(name, metadata)
        return context.id
    
    async def send_message(self, context_id, message, tools=None):
        """Send a message within a root context"""
        # สร้างตัวเลือกพร้อมกับไอดีบริบท
        options = {
            "root_context_id": context_id
        }
        
        # เพิ่มเครื่องมือถ้ามีการระบุ
        if tools:
            options["allowed_tools"] = tools
        
        # ส่งคำสั่งภายในบริบท
        response = await self.client.send_prompt(message, options)
        
        # อัปเดตเมตาดาต้าของบริบทพร้อมความก้าวหน้าของการสนทนา
        await self.context_manager.update_context_metadata(
            context_id,
            {
                f"message_{datetime.now().timestamp()}": message[:50] + "...",
                "last_interaction": datetime.now().isoformat()
            }
        )
        
        return response
    
    async def get_conversation_history(self, context_id):
        """Retrieve conversation history from a context"""
        context_info = await self.context_manager.get_context_info(context_id)
        messages = await self.client.get_context_messages(context_id)
        
        return {
            "context_info": context_info,
            "messages": messages
        }
    
    async def end_session(self, context_id):
        """End an assistant session by archiving the context"""
        # สร้างคำสั่งสรุปก่อน
        summary_response = await self.client.send_prompt(
            "Please summarize our conversation and any key points or decisions made.",
            {"root_context_id": context_id}
        )
        
        # เก็บสรุปในเมตาดาต้า
        await self.context_manager.update_context_metadata(
            context_id,
            {
                "summary": summary_response.generated_text,
                "ended_at": datetime.now().isoformat(),
                "status": "completed"
            }
        )
        
        # จัดเก็บบริบท
        await self.context_manager.archive_context(context_id)
        
        return {
            "status": "completed",
            "summary": summary_response.generated_text
        }

# ตัวอย่างการใช้งาน
async def demo_assistant_session():
    assistant = AssistantSession("https://mcp-server-example.com")
    
    # 1. สร้างเซสชัน
    context_id = await assistant.create_session(
        "Technical Support Session",
        {"name": "Alex", "technical_level": "advanced", "product": "Cloud Services"}
    )
    print(f"Created session with context ID: {context_id}")
    
    # 2. การโต้ตอบครั้งแรก
    response1 = await assistant.send_message(
        context_id, 
        "I'm having trouble with the auto-scaling feature in your cloud platform.",
        ["documentation_search", "diagnostic_tool"]
    )
    print(f"Response 1: {response1.generated_text}")
    
    # การโต้ตอบครั้งที่สองในบริบทเดียวกัน
    response2 = await assistant.send_message(
        context_id,
        "Yes, I've already checked the configuration settings you mentioned, but it's still not working."
    )
    print(f"Response 2: {response2.generated_text}")
    
    # 3. ดึงประวัติ
    history = await assistant.get_conversation_history(context_id)
    print(f"Session has {len(history['messages'])} messages")
    
    # 4. สิ้นสุดเซสชัน
    end_result = await assistant.end_session(context_id)
    print(f"Session ended with summary: {end_result['summary']}")

if __name__ == "__main__":
    asyncio.run(demo_assistant_session())
```

ในโค้ดตัวอย่างก่อนหน้านี้ เราได้:

1. สร้างรากของบริบทสำหรับเซสชันสนับสนุนทางเทคนิคด้วยฟังก์ชัน `create_session` บริบทนี้รวมข้อมูลผู้ใช้เช่นชื่อและระดับเทคนิค

1. ส่งข้อความหลายข้อความภายในบริบทนั้น เพื่อให้โมเดลรักษาสถานะด้วยฟังก์ชัน `send_message` ข้อความที่ส่งเกี่ยวกับปัญหาฟีเจอร์การปรับขนาดอัตโนมัติ

1. ดึงประวัติการสนทนาด้วยฟังก์ชัน `get_conversation_history` ซึ่งให้ข้อมูลบริบทและข้อความ

1. สิ้นสุดเซสชันด้วยการเก็บถาวรบริบทและสร้างสรุปด้วยฟังก์ชัน `end_session` สรุปจับประเด็นสำคัญจากการสนทนา

## แนวทางปฏิบัติที่ดีที่สุดสำหรับรากของบริบท

นี่คือแนวทางปฏิบัติที่ดีที่สุดสำหรับการจัดการรากของบริบทอย่างมีประสิทธิภาพ:

- **สร้างบริบทที่เฉพาะเจาะจง**: สร้างรากของบริบทแยกสำหรับวัตถุประสงค์หรือโดเมนการสนทนาต่าง ๆ เพื่อรักษาความชัดเจน

- **กำหนดนโยบายหมดอายุ**: นำนโยบายมาใช้เพื่อเก็บถาวรหรือลบรากของบริบทเก่า เพื่อจัดการพื้นที่เก็บข้อมูลและปฏิบัติตามนโยบายการเก็บรักษาข้อมูล

- **เก็บเมตาดาทาที่เกี่ยวข้อง**: ใช้เมตาดาทาของบริบทเพื่อเก็บข้อมูลสำคัญเกี่ยวกับการสนทนาที่อาจมีประโยชน์ในภายหลัง

- **ใช้รหัสบริบทอย่างสม่ำเสมอ**: เมื่อสร้างบริบทแล้ว ใช้รหัสบริบทเดิมสำหรับคำขอที่เกี่ยวข้องทั้งหมดเพื่อรักษาความต่อเนื่อง

- **สร้างสรุป**: เมื่อบริบทมีขนาดใหญ่ ให้พิจารณาสร้างสรุปเพื่อจับข้อมูลสำคัญขณะบริหารขนาดบริบท

- **ใช้งานการควบคุมการเข้าถึง**: สำหรับระบบหลายผู้ใช้ ให้ติดตั้งการควบคุมการเข้าถึงที่เหมาะสมเพื่อรับประกันความเป็นส่วนตัวและความปลอดภัยของบริบทสนทนา

- **จัดการข้อจำกัดของบริบท**: ตระหนักถึงข้อจำกัดขนาดบริบทและวางกลยุทธ์สำหรับการจัดการการสนทนายาวมาก ๆ

- **เก็บถาวรเมื่อเสร็จสิ้น**: เก็บถาวรบริบทเมื่อการสนทนาเสร็จสิ้นเพื่อปล่อยทรัพยากรในขณะเดียวกันก็รักษาประวัติการสนทนาไว้

## ขั้นตอนถัดไป

- [5.5 การกำหนดเส้นทาง](../mcp-routing/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->