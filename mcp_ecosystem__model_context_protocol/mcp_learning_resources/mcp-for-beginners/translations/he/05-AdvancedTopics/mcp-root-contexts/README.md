> [מיושן: מועמד לגרסת שחרור 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# הקשרים שורשיים ב-MCP

> **הודעת אי-תוקף:** מועמד להפקת מפרט MCP מ-`2026-07-28` מסמן את השורשים כמיושנים לטובת פרמטרים של כלי, URI של משאבים או תצורת שרת. השורשים ממשיכים לפעול ב-`2025-11-25` ולפחות שנה לאחר כל אי-תוקף פורמלי, כך שכל מה בשיעור זה נשאר תקף - אבל עיצובי שרת חדשים צריכים להעריך את תבנית ההחלפה. ראה [מה משתנה ב-MCP: מועמד להפקת 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

הקשרים שורשיים הם מושג בסיסי בפרוטוקול הקשרי המודל שמספק שכבה מתמשכת לשמירת היסטוריית שיחה ומצב משותף על פני מספר בקשות ומפגשים.

## מבוא

בשיעור זה, נחקור כיצד ליצור, לנהל ולהשתמש בהקשרים שורשיים ב-MCP.

## מטרות הלמידה

בסוף שיעור זה, תוכל:

- להבין את המטרה והמבנה של הקשרים שורשיים
- ליצור ולנהל הקשרים שורשיים באמצעות ספריות לקוח של MCP
- ליישם הקשרים שורשיים ביישומי .NET, Java, JavaScript ו-Python
- לנצל הקשרים שורשיים לשיחות מרובות סבבים ולניהול מצב
- ליישם נהלי עבודה מומלצים לניהול הקשרים שורשיים

## הבנת הקשרים שורשיים

הקשרים שורשיים משמשים כמכלים שמכילים את ההיסטוריה והמצב של סדרת אינטראקציות קשורות. הם מאפשרים:

- **התמדה בשיחה**: שמירה על שיחות מרובות סבבים קוהרנטיות
- **ניהול זיכרון**: אחסון ושליפת מידע לאורך אינטראקציות
- **ניהול מצב**: מעקב אחרי התקדמות בתזרימי עבודה מורכבים
- **שיתוף הקשר**: מתן גישה למספר לקוחות למצב השיחה האחיד

ב-MCP, להקשרים שורשיים יש את המאפיינים המרכזיים הבאים:

- לכל הקשר שורשי יש מזהה ייחודי.
- הם יכולים להכיל היסטוריית שיחה, העדפות משתמש ומטה-נתונים נוספים.
- ניתן ליצור, לגשת ולארכיב אותם לפי הצורך.
- הם תומכים בשליטה גישה ובתית מורכבת והרשאות.

## מחזור חיים של הקשר שורשי

```mermaid
flowchart TD
    A[צור הקשר שורש] --> B[אתחל עם מטה-נתונים]
    B --> C[שלח בקשות עם מזהה ההקשר]
    C --> D[עדכן את ההקשר עם התוצאות]
    D --> C
    D --> E[ארכב את ההקשר כשהוא הושלם]
```

## עבודה עם הקשרים שורשיים

הנה דוגמה כיצד ליצור ולנהל הקשרים שורשיים.

### יישום ב-C#

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

בקוד שניתן לעיל:

1. יצרנו קשר שורשי למפגש תמיכת לקוחות.
1. שלחנו מספר הודעות בתוך אותו הקשר, ואפשרנו למודל לשמור על המצב.
1. עדכנו את ההקשר עם מטה-נתונים רלוונטיים בהתבסס על השיחה.
1. שלפנו מידע מההקשר כדי להבין את היסטוריית השיחה.
1. ארכיבנו את ההקשר כאשר השיחה הושלמה.

## דוגמה: יישום הקשר שורשי לניתוח פיננסי

בדוגמה זו, ניצור קשר שורשי למפגש ניתוח פיננסי, נדגים כיצד לשמור על מצב כשמתבצעות אינטראקציות מרובות.

### יישום ב-Java

```java
// דוגמה ב-Java: יישום הקשר שורש
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
        // צור מטא-נתוני הקשר
        Map<String, String> metadata = new HashMap<>();
        metadata.put("projectName", "Financial Analysis");
        metadata.put("userRole", "Financial Analyst");
        metadata.put("dataSource", "Q1 2025 Financial Reports");
        
        // 1. צור הקשר שורש חדש
        RootContext context = contextManager.createRootContext("Financial Analysis Session", metadata);
        String contextId = context.getId();
        
        System.out.println("Created context: " + contextId);
        
        // 2. אינטראקציה ראשונה
        McpResponse response1 = client.sendPrompt(
            "Analyze the trends in Q1 financial data for our technology division",
            contextId
        );
        
        System.out.println("First response: " + response1.getGeneratedText());
        
        // 3. עדכן את ההקשר עם מידע חשוב שהתקבל מהתגובה
        contextManager.addContextMetadata(contextId, 
            Map.of("identifiedTrend", "Increasing cloud infrastructure costs"));
        
        // אינטראקציה שנייה - שימוש באותו הקשר
        McpResponse response2 = client.sendPrompt(
            "What's driving the increase in cloud infrastructure costs?",
            contextId
        );
        
        System.out.println("Second response: " + response2.getGeneratedText());
        
        // 4. הפק סיכום של מושב הניתוח
        McpResponse summaryResponse = client.sendPrompt(
            "Summarize our analysis of the technology division financials in 3-5 key points",
            contextId
        );
        
        // אחסן את הסיכום במטא-נתוני ההקשר
        contextManager.addContextMetadata(contextId, 
            Map.of("analysisSummary", summaryResponse.getGeneratedText()));
            
        // קבל מידע מעודכן של ההקשר
        RootContext updatedContext = contextManager.getRootContext(contextId);
        
        System.out.println("Context Information:");
        System.out.println("- Created: " + updatedContext.getCreatedAt());
        System.out.println("- Last Updated: " + updatedContext.getLastUpdatedAt());
        System.out.println("- Analysis Summary: " + 
            updatedContext.getMetadata().get("analysisSummary"));
            
        // 5. ארכב את ההקשר כשהעבודה הושלמה
        contextManager.archiveContext(contextId);
        System.out.println("Context archived");
    }
}
```

בקוד שניתן לעיל:

1. יצרנו קשר שורשי למפגש ניתוח פיננסי.
2. שלחנו מספר הודעות בתוך אותו הקשר, ואפשרנו למודל לשמור על המצב.
3. עדכנו את ההקשר עם מטה-נתונים רלוונטיים בהתבסס על השיחה.
4. הפקנו סיכום של הפגישה ושמרנו אותו במטה-נתוני ההקשר.
5. ארכיבנו את ההקשר כאשר השיחה הושלמה.

## דוגמה: ניהול הקשר שורשי

ניהול יעיל של הקשרים שורשיים הוא חיוני לשמירת היסטוריית שיחה ומצב. להלן דוגמה כיצד ליישם ניהול הקשר שורשי.

### יישום ב-JavaScript

```javascript
// דוגמת JavaScript: ניהול הקשרים שורשיים של MCP
const { McpClient, RootContextManager } = require('@mcp/client');

class ContextSession {
  constructor(serverUrl, apiKey = null) {
    // אתחל את הלקוח של MCP
    this.client = new McpClient({
      serverUrl,
      apiKey
    });
    
    // אתחל את מנהל ההקשר
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
      // שלח את ההודעה תוך שימוש בהקשר שצוין
      const response = await this.client.sendPrompt(message, {
        rootContextId: contextId,
        temperature: options.temperature || 0.7,
        allowedTools: options.allowedTools || []
      });
      
      // ניתן לאחסן תובנות חשובות מהשיחה
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
      // חילוץ תובנות פוטנציאליות (באפליקציה אמיתית יהיה יותר מתוחכם)
      const combinedText = userMessage + "\n" + aiResponse;
      
      // מבחן פשוט לזיהוי תובנות פוטנציאליות
      const insightWords = ["important", "key point", "remember", "significant", "crucial"];
      
      const potentialInsights = combinedText
        .split(".")
        .filter(sentence => 
          insightWords.some(word => sentence.toLowerCase().includes(word))
        )
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 10);
      
      // אחסן תובנות במטא-דאטה של ההקשר
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
      // שגיאה לא קריטית, אז רק תרשום אזהרה
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
      // בקש מהמודל ליצור סיכום של השיחה עד כה
      const response = await this.client.sendPrompt(
        "Please summarize our conversation so far in 3-4 sentences, highlighting the main points discussed.",
        { rootContextId: contextId, temperature: 0.3 }
      );
      
      // אחסן את הסיכום במטא-דאטה של ההקשר
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
      // צור סיכום סופי לפני הארכיון
      const summary = await this.generateContextSummary(contextId);
      
      // ארכב את ההקשר
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

// דוגמת שימוש
async function demonstrateContextSession() {
  const session = new ContextSession('https://mcp-server-example.com');
  
  try {
    // 1. צור הקשר חדש לשיחת תמיכת מוצרים
    const contextId = await session.createConversationContext(
      'Product Support - Database Performance',
      {
        customer: 'Globex Corporation',
        product: 'Enterprise Database',
        severity: 'Medium',
        supportAgent: 'AI Assistant'
      }
    );
    
    // 2. ההודעה הראשונה בשיחה
    const response1 = await session.sendMessage(
      contextId,
      "I'm experiencing slow query performance on our database cluster after the latest update.",
      { storeInsights: true }
    );
    console.log('Response 1:', response1.message);
    
    // הודעת המשך באותו הקשר
    const response2 = await session.sendMessage(
      contextId,
      "Yes, we've already checked the indexes and they seem to be properly configured.",
      { storeInsights: true }
    );
    console.log('Response 2:', response2.message);
    
    // 3. קבל מידע על ההקשר
    const contextInfo = await session.getContextInfo(contextId);
    console.log('Context Information:', contextInfo);
    
    // 4. צור והצג סיכום השיחה
    const summary = await session.generateContextSummary(contextId);
    console.log('Conversation Summary:', summary);
    
    // 5. ארכב את ההקשר בסיום
    const archiveResult = await session.archiveContext(contextId);
    console.log('Archive Result:', archiveResult);
    
    // 6. טיפל בשגיאות בחן
  } catch (error) {
    console.error('Error in context session demonstration:', error);
  }
}

demonstrateContextSession();
```

בקוד שניתן לעיל:

1. יצרנו קשר שורשי לשיחת תמיכה במוצר עם הפונקציה `createConversationContext`. במקרה זה, ההקשר עוסק בבעיות ביצוע של מסד הנתונים.

1. שלחנו מספר הודעות בתוך ההקשר, ואפשרנו למודל לשמור על המצב באמצעות הפונקציה `sendMessage`. ההודעות שנשלחות עוסקות בביצועים איטיים של שאילתות ובקביעת אינדקס.

1. עדכנו את ההקשר עם מטה-נתונים מתאימים בהתבסס על השיחה.

1. הפקנו סיכום של השיחה ושמרנו אותו במטה-נתוני ההקשר עם הפונקציה `generateContextSummary`.

1. ארכיבנו את ההקשר כאשר השיחה הושלמה עם הפונקציה `archiveContext`.

1. טיפלנו בשגיאות בשיקול דעת להבטחת עמידות.

## הקשר שורשי לסיוע מרובה סבבים

בדוגמה זו, ניצור קשר שורשי למפגש סיוע מרובה סבבים, נדגים כיצד לשמור על מצב לאורך אינטראקציות מרובות.

### יישום ב-Python

```python
# דוגמה בפייתון: הקשר שורש לעזרה רב-פנית
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
        
        # הוסף מידע על המשתמש אם סופק
        if user_info:
            metadata.update({f"user_{k}": v for k, v in user_info.items()})
            
        # צור את הקשר השורש
        context = await self.context_manager.create_root_context(name, metadata)
        return context.id
    
    async def send_message(self, context_id, message, tools=None):
        """Send a message within a root context"""
        # צור אפשרויות עם מזהה ההקשר
        options = {
            "root_context_id": context_id
        }
        
        # הוסף כלים אם צוינו
        if tools:
            options["allowed_tools"] = tools
        
        # שלח את ההנחייה בתוך ההקשר
        response = await self.client.send_prompt(message, options)
        
        # עדכן את המטה-נתונים של ההקשר עם התקדמות השיחה
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
        # הפק הנחיית סיכום ראשונה
        summary_response = await self.client.send_prompt(
            "Please summarize our conversation and any key points or decisions made.",
            {"root_context_id": context_id}
        )
        
        # שמור את הסיכום במטה-נתונים
        await self.context_manager.update_context_metadata(
            context_id,
            {
                "summary": summary_response.generated_text,
                "ended_at": datetime.now().isoformat(),
                "status": "completed"
            }
        )
        
        # ארכב את ההקשר
        await self.context_manager.archive_context(context_id)
        
        return {
            "status": "completed",
            "summary": summary_response.generated_text
        }

# דוגמה לשימוש
async def demo_assistant_session():
    assistant = AssistantSession("https://mcp-server-example.com")
    
    # 1. צור סשן
    context_id = await assistant.create_session(
        "Technical Support Session",
        {"name": "Alex", "technical_level": "advanced", "product": "Cloud Services"}
    )
    print(f"Created session with context ID: {context_id}")
    
    # 2. אינטראקציה ראשונה
    response1 = await assistant.send_message(
        context_id, 
        "I'm having trouble with the auto-scaling feature in your cloud platform.",
        ["documentation_search", "diagnostic_tool"]
    )
    print(f"Response 1: {response1.generated_text}")
    
    # אינטראקציה שנייה באותו הקשר
    response2 = await assistant.send_message(
        context_id,
        "Yes, I've already checked the configuration settings you mentioned, but it's still not working."
    )
    print(f"Response 2: {response2.generated_text}")
    
    # 3. קבל היסטוריה
    history = await assistant.get_conversation_history(context_id)
    print(f"Session has {len(history['messages'])} messages")
    
    # 4. סגור את הסשן
    end_result = await assistant.end_session(context_id)
    print(f"Session ended with summary: {end_result['summary']}")

if __name__ == "__main__":
    asyncio.run(demo_assistant_session())
```

בקוד שניתן לעיל:

1. יצרנו קשר שורשי למפגש תמיכה טכנית עם הפונקציה `create_session`. ההקשר כולל מידע על המשתמש כמו שם ורמת טכניות.

1. שלחנו מספר הודעות בתוך ההקשר, ואפשרנו למודל לשמור על המצב באמצעות הפונקציה `send_message`. ההודעות עוסקות בבעיות בתכונת האוטו-סקיילינג.

1. שלפנו היסטוריית שיחה עם הפונקציה `get_conversation_history`, המספקת מידע והודעות על ההקשר.

1. סיימנו את המפגש על ידי ארכיב ההקשר והפקת סיכום עם הפונקציה `end_session`. הסיכום תופס נקודות מפתח מהשיחה.

## נהלי עבודה מומלצים להקשרים שורשיים

להלן כמה נהלים מומלצים לניהול תקין של הקשרים שורשיים:

- **יצירת הקשרים ממוקדים**: צור הקשרים שורשיים נפרדים למטרות שיחה שונות או תחומים לשמירה על בהירות.

- **קבע מדיניות פקיעה**: יישם מדיניות לארכיבת או מחיקת הקשרים ישנים לניהול אחסון ועמידה במדיניות שמירת נתונים.

- **אחסן מטה-נתונים רלוונטיים**: השתמש במטה-נתוני ההקשר לאחסון מידע חשוב מהשיחה שעשוי להיות שימושי בעתיד.

- **השתמש במזהי הקשר בעקביות**: ברגע שנוצר קשר, השתמש במזהה שלו בעקביות עבור כל הבקשות הקשורות לשמירה על רצף.

- **ייצר סיכומים**: כאשר הקשר גדל, שקול לייצר סיכומים לתפיסת המידע החיוני תוך ניהול גודל ההקשר.

- **יישם בקרות גישה**: במערכות רב-משתמשיות, יישם בקרות גישה נאותות להבטחת פרטיות וביטחון של הקשרים שורשיים.

- **טפל במגבלות ההקשר**: היה מודע למגבלות גודל ההקשר ויישם אסטרטגיות להתמודדות עם שיחות ארוכות מאוד.

- **ארכיב עם סיום**: ארכב קשרים כאשר השיחות מסתיימות כדי לשחרר משאבים תוך שמירת היסטוריית השיחה.

## מה הלאה

- [5.5 ניתוב](../mcp-routing/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->