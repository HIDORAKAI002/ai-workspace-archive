> [مهمَل: مرشح الإصدار 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# سياقات الجذر في MCP

> **تنويه التوقف:** ترشيح إصدار مواصفة MCP `2026-07-28` يمثل إشارة إلى تقادم الجذور لصالح معلمات الأدوات، عناوين الموارد، أو تهيئة الخادم. تستمر الجذور في العمل في `2025-11-25` ولمدة لا تقل عن عام بعد أي إيقاف رسمي، لذا يبقى كل شيء في هذا الدرس صالحًا - لكن يجب على تصميمات الخوادم الجديدة تقييم نمط الاستبدال. انظر [ما الذي يتغير في MCP: مرشح إصدار 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

سياقات الجذر هي مفهوم أساسي في بروتوكول سياق النموذج يوفر طبقة دائمة للحفاظ على تاريخ المحادثة والحالة المشتركة عبر عدة طلبات وجلسات.

## مقدمة

في هذا الدرس، سوف نستكشف كيفية إنشاء وإدارة واستخدام سياقات الجذر في MCP.

## أهداف التعلم

بحلول نهاية هذا الدرس، ستتمكن من:

- فهم غرض وهيكل سياقات الجذر
- إنشاء وإدارة سياقات الجذر باستخدام مكتبات عميل MCP
- تنفيذ سياقات الجذر في تطبيقات .NET، Java، JavaScript، وPython
- استخدام سياقات الجذر للمحادثات متعددة الأدوار وإدارة الحالة
- تطبيق أفضل الممارسات لإدارة سياقات الجذر

## فهم سياقات الجذر

تعمل سياقات الجذر كحاويات تحتوي على التاريخ والحالة لسلسلة من التداخلات ذات الصلة. تسمح بـ:

- **استمرارية المحادثة**: الحفاظ على محادثات متعددة الأدوار متماسكة
- **إدارة الذاكرة**: تخزين واسترجاع المعلومات عبر التداخلات
- **إدارة الحالة**: تتبع التقدم في سير العمل المعقد
- **مشاركة السياق**: السماح لعدة عملاء بالوصول إلى نفس حالة المحادثة

في MCP، تتميز سياقات الجذر بالخصائص الأساسية التالية:

- كل سياق جذر له معرف فريد.
- يمكن أن تحتوي على تاريخ المحادثة وتفضيلات المستخدم وبيانات وصفية أخرى.
- يمكن إنشاؤها والوصول إليها وأرشفتها حسب الحاجة.
- تدعم تحكمًا دقيقًا في الوصول والأذونات.

## دورة حياة سياق الجذر

```mermaid
flowchart TD
    A[إنشاء السياق الجذري] --> B[التهيئة باستخدام بيانات التعريف]
    B --> C[إرسال الطلبات مع معرف السياق]
    C --> D[تحديث السياق بالنتائج]
    D --> C
    D --> E[أرشفة السياق عند الاكتمال]
```

## العمل مع سياقات الجذر

إليك مثال على كيفية إنشاء وإدارة سياقات الجذر.

### تنفيذ C#

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

في الكود السابق قمنا بـ:

1. إنشاء سياق جذر لجلسة دعم العملاء.
1. إرسال رسائل متعددة ضمن ذلك السياق، مما يسمح للنموذج بالحفاظ على الحالة.
1. تحديث السياق ببيانات وصفية ذات صلة بناءً على المحادثة.
1. استرجاع معلومات السياق لفهم تاريخ المحادثة.
1. أرشفة السياق عند اكتمال المحادثة.

## مثال: تنفيذ سياق الجذر لتحليل مالي

في هذا المثال، سنقوم بإنشاء سياق جذر لجلسة تحليل مالي، موضحين كيفية الحفاظ على الحالة عبر عدة تداخلات.

### تنفيذ Java

```java
// مثال جافا: تنفيذ السياق الجذري
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
        // إنشاء بيانات وصفية للسياق
        Map<String, String> metadata = new HashMap<>();
        metadata.put("projectName", "Financial Analysis");
        metadata.put("userRole", "Financial Analyst");
        metadata.put("dataSource", "Q1 2025 Financial Reports");
        
        // 1. إنشاء سياق جذري جديد
        RootContext context = contextManager.createRootContext("Financial Analysis Session", metadata);
        String contextId = context.getId();
        
        System.out.println("Created context: " + contextId);
        
        // 2. التفاعل الأول
        McpResponse response1 = client.sendPrompt(
            "Analyze the trends in Q1 financial data for our technology division",
            contextId
        );
        
        System.out.println("First response: " + response1.getGeneratedText());
        
        // 3. تحديث السياق بالمعلومات المهمة التي تم الحصول عليها من الاستجابة
        contextManager.addContextMetadata(contextId, 
            Map.of("identifiedTrend", "Increasing cloud infrastructure costs"));
        
        // التفاعل الثاني - باستخدام نفس السياق
        McpResponse response2 = client.sendPrompt(
            "What's driving the increase in cloud infrastructure costs?",
            contextId
        );
        
        System.out.println("Second response: " + response2.getGeneratedText());
        
        // 4. إنشاء ملخص لجلسة التحليل
        McpResponse summaryResponse = client.sendPrompt(
            "Summarize our analysis of the technology division financials in 3-5 key points",
            contextId
        );
        
        // تخزين الملخص في البيانات الوصفية للسياق
        contextManager.addContextMetadata(contextId, 
            Map.of("analysisSummary", summaryResponse.getGeneratedText()));
            
        // الحصول على معلومات السياق المحدثة
        RootContext updatedContext = contextManager.getRootContext(contextId);
        
        System.out.println("Context Information:");
        System.out.println("- Created: " + updatedContext.getCreatedAt());
        System.out.println("- Last Updated: " + updatedContext.getLastUpdatedAt());
        System.out.println("- Analysis Summary: " + 
            updatedContext.getMetadata().get("analysisSummary"));
            
        // 5. أرشفة السياق عند الانتهاء
        contextManager.archiveContext(contextId);
        System.out.println("Context archived");
    }
}
```

في الكود السابق، قمنا بـ:

1. إنشاء سياق جذر لجلسة تحليل مالي.
2. إرسال رسائل متعددة ضمن ذلك السياق، مما يسمح للنموذج بالحفاظ على الحالة.
3. تحديث السياق ببيانات وصفية ذات صلة بناءً على المحادثة.
4. إنشاء ملخص لجلسة التحليل وتخزينه في بيانات وصفية للسياق.
5. أرشفة السياق عند اكتمال المحادثة.

## مثال: إدارة سياق الجذر

إدارة سياقات الجذر بفعالية أمر بالغ الأهمية للحفاظ على تاريخ المحادثة والحالة. أدناه مثال على كيفية تنفيذ إدارة سياق الجذر.

### تنفيذ JavaScript

```javascript
// مثال جافا سكريبت: إدارة سياقات الجذر MCP
const { McpClient, RootContextManager } = require('@mcp/client');

class ContextSession {
  constructor(serverUrl, apiKey = null) {
    // تهيئة عميل MCP
    this.client = new McpClient({
      serverUrl,
      apiKey
    });
    
    // تهيئة مدير السياق
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
      // إرسال الرسالة باستخدام السياق المحدد
      const response = await this.client.sendPrompt(message, {
        rootContextId: contextId,
        temperature: options.temperature || 0.7,
        allowedTools: options.allowedTools || []
      });
      
      // تخزين الرؤى المهمة من المحادثة بشكل اختياري
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
      // استخراج الرؤى المحتملة (في تطبيق حقيقي، سيكون ذلك أكثر تعقيدًا)
      const combinedText = userMessage + "\n" + aiResponse;
      
      // قاعدة بسيطة لتحديد الرؤى المحتملة
      const insightWords = ["important", "key point", "remember", "significant", "crucial"];
      
      const potentialInsights = combinedText
        .split(".")
        .filter(sentence => 
          insightWords.some(word => sentence.toLowerCase().includes(word))
        )
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 10);
      
      // تخزين الرؤى في بيانات التعريف الخاصة بالسياق
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
      // خطأ غير حرج، لذا قم فقط بتسجيل تحذير
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
      // طلب من النموذج إنشاء ملخص للمحادثة حتى الآن
      const response = await this.client.sendPrompt(
        "Please summarize our conversation so far in 3-4 sentences, highlighting the main points discussed.",
        { rootContextId: contextId, temperature: 0.3 }
      );
      
      // تخزين الملخص في بيانات التعريف الخاصة بالسياق
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
      // إنشاء ملخص نهائي قبل الأرشفة
      const summary = await this.generateContextSummary(contextId);
      
      // أرشفة السياق
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

// مثال للاستخدام
async function demonstrateContextSession() {
  const session = new ContextSession('https://mcp-server-example.com');
  
  try {
    // 1. إنشاء سياق جديد لمحادثة دعم المنتج
    const contextId = await session.createConversationContext(
      'Product Support - Database Performance',
      {
        customer: 'Globex Corporation',
        product: 'Enterprise Database',
        severity: 'Medium',
        supportAgent: 'AI Assistant'
      }
    );
    
    // 2. الرسالة الأولى في المحادثة
    const response1 = await session.sendMessage(
      contextId,
      "I'm experiencing slow query performance on our database cluster after the latest update.",
      { storeInsights: true }
    );
    console.log('Response 1:', response1.message);
    
    // رسالة متابعة في نفس السياق
    const response2 = await session.sendMessage(
      contextId,
      "Yes, we've already checked the indexes and they seem to be properly configured.",
      { storeInsights: true }
    );
    console.log('Response 2:', response2.message);
    
    // 3. الحصول على معلومات حول السياق
    const contextInfo = await session.getContextInfo(contextId);
    console.log('Context Information:', contextInfo);
    
    // 4. إنشاء وعرض ملخص المحادثة
    const summary = await session.generateContextSummary(contextId);
    console.log('Conversation Summary:', summary);
    
    // 5. أرشفة السياق عند الانتهاء
    const archiveResult = await session.archiveContext(contextId);
    console.log('Archive Result:', archiveResult);
    
    // 6. التعامل مع أي أخطاء بسلاسة
  } catch (error) {
    console.error('Error in context session demonstration:', error);
  }
}

demonstrateContextSession();
```

في الكود السابق قمنا بـ:

1. إنشاء سياق جذر لمحادثة دعم المنتج باستخدام الدالة `createConversationContext`. في هذه الحالة، السياق يتعلق بمشاكل أداء قاعدة البيانات.

1. إرسال عدة رسائل ضمن ذلك السياق، مما يسمح للنموذج بالحفاظ على الحالة باستخدام الدالة `sendMessage`. الرسائل المرسلة عن بطء أداء الاستعلام وتكوين الفهرس.

1. تحديث السياق ببيانات وصفية ذات صلة بناءً على المحادثة.

1. توليد ملخص للمحادثة وتخزينه في بيانات وصفية للسياق باستخدام الدالة `generateContextSummary`.

1. أرشفة السياق عند اكتمال المحادثة باستخدام الدالة `archiveContext`.

1. التعامل مع الأخطاء بسلاسة لضمان المتانة.

## سياق الجذر للمساعدة متعددة الأدوار

في هذا المثال، سنقوم بإنشاء سياق جذر لجلسة مساعدة متعددة الأدوار، موضحين كيفية الحفاظ على الحالة عبر عدة تداخلات.

### تنفيذ Python

```python
# مثال بايثون: السياق الجذري للمساعدة متعددة الأدوار
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
        
        # أضف معلومات المستخدم إذا تم توفيرها
        if user_info:
            metadata.update({f"user_{k}": v for k, v in user_info.items()})
            
        # إنشاء السياق الجذري
        context = await self.context_manager.create_root_context(name, metadata)
        return context.id
    
    async def send_message(self, context_id, message, tools=None):
        """Send a message within a root context"""
        # إنشاء الخيارات باستخدام معرف السياق
        options = {
            "root_context_id": context_id
        }
        
        # أضف الأدوات إذا تم تحديدها
        if tools:
            options["allowed_tools"] = tools
        
        # أرسل الموجه ضمن السياق
        response = await self.client.send_prompt(message, options)
        
        # تحديث بيانات التعريف الخاصة بالسياق مع تقدم المحادثة
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
        # إنشاء موجه الملخص أولاً
        summary_response = await self.client.send_prompt(
            "Please summarize our conversation and any key points or decisions made.",
            {"root_context_id": context_id}
        )
        
        # تخزين الملخص في بيانات التعريف
        await self.context_manager.update_context_metadata(
            context_id,
            {
                "summary": summary_response.generated_text,
                "ended_at": datetime.now().isoformat(),
                "status": "completed"
            }
        )
        
        # أرشفة السياق
        await self.context_manager.archive_context(context_id)
        
        return {
            "status": "completed",
            "summary": summary_response.generated_text
        }

# مثال على الاستخدام
async def demo_assistant_session():
    assistant = AssistantSession("https://mcp-server-example.com")
    
    # 1. إنشاء الجلسة
    context_id = await assistant.create_session(
        "Technical Support Session",
        {"name": "Alex", "technical_level": "advanced", "product": "Cloud Services"}
    )
    print(f"Created session with context ID: {context_id}")
    
    # 2. التفاعل الأول
    response1 = await assistant.send_message(
        context_id, 
        "I'm having trouble with the auto-scaling feature in your cloud platform.",
        ["documentation_search", "diagnostic_tool"]
    )
    print(f"Response 1: {response1.generated_text}")
    
    # التفاعل الثاني في نفس السياق
    response2 = await assistant.send_message(
        context_id,
        "Yes, I've already checked the configuration settings you mentioned, but it's still not working."
    )
    print(f"Response 2: {response2.generated_text}")
    
    # 3. الحصول على السجل
    history = await assistant.get_conversation_history(context_id)
    print(f"Session has {len(history['messages'])} messages")
    
    # 4. إنهاء الجلسة
    end_result = await assistant.end_session(context_id)
    print(f"Session ended with summary: {end_result['summary']}")

if __name__ == "__main__":
    asyncio.run(demo_assistant_session())
```

في الكود السابق قمنا بـ:

1. إنشاء سياق جذر لجلسة دعم فني باستخدام الدالة `create_session`. يتضمن السياق معلومات المستخدم مثل الاسم والمستوى الفني.

1. إرسال عدة رسائل ضمن ذلك السياق، مما يسمح للنموذج بالحفاظ على الحالة باستخدام الدالة `send_message`. الرسائل المرسلة عن مشكلات في ميزة التوسع التلقائي.

1. استرجاع تاريخ المحادثة باستخدام الدالة `get_conversation_history` التي توفر معلومات وسياق الرسائل.

1. إنهاء الجلسة عن طريق أرشفة السياق وتوليد ملخص باستخدام الدالة `end_session`. يحفظ الملخص النقاط الرئيسية من المحادثة.

## أفضل ممارسات سياق الجذر

إليك بعض أفضل الممارسات لإدارة سياقات الجذر بفعالية:

- **إنشاء سياقات مركزة**: أنشئ سياقات جذر منفصلة لأغراض أو مجالات محادثة مختلفة للحفاظ على الوضوح.

- **تحديد سياسات انتهاء الصلاحية**: طبق سياسات لأرشفة أو حذف السياقات القديمة لإدارة التخزين والامتثال لسياسات الاحتفاظ بالبيانات.

- **تخزين البيانات الوصفية ذات الصلة**: استخدم بيانات وصفية للسياق لتخزين معلومات مهمة عن المحادثة قد تكون مفيدة لاحقًا.

- **استخدام معرفات السياق بشكل متسق**: بمجرد إنشاء السياق، استخدم معرفه باستمرار لجميع الطلبات ذات الصلة للحفاظ على الاستمرارية.

- **إنشاء ملخصات**: عندما يكبر السياق، فكر في إنشاء ملخصات لالتقاط المعلومات الأساسية مع إدارة حجم السياق.

- **تطبيق التحكم في الوصول**: في أنظمة متعددة المستخدمين، طبق ضوابط وصول مناسبة لضمان خصوصية وأمان سياقات المحادثة.

- **التعامل مع قيود السياق**: كن على علم بحدود حجم السياق وطبق استراتيجيات للتعامل مع المحادثات الطويلة جدًا.

- **الأرشفة عند الاكتمال**: أرشف السياقات عند اكتمال المحادثات لتحرير الموارد مع الحفاظ على تاريخ المحادثة.

## ما التالي

- [5.5 التوجيه](../mcp-routing/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->