# חקר מסגרת סוכני מיקרוסופט

![Agent Framework](../../../translated_images/he/lesson-14-thumbnail.90df0065b9d234ee.webp)

### מבוא

שיעור זה יכסה:

- הבנת מסגרת סוכני מיקרוסופט: תכונות מרכזיות וערך  
- חקר המושגים המרכזיים של מסגרת סוכני מיקרוסופט
- תבניות MAF מתקדמות: זרימות עבודה, מידלוור וזיכרון

## יעדי הלמידה

לאחר השלמת שיעור זה, תדע כיצד:

- לבנות סוכני בינה מלאכותית מוכנים לייצור באמצעות מסגרת סוכני מיקרוסופט
- ליישם את התכונות המרכזיות של מסגרת סוכני מיקרוסופט למקרי השימוש הסוכניים שלך
- להשתמש בתבניות מתקדמות כולל זרימות עבודה, מידלוור, ותצפית

## דוגמאות קוד 

דוגמאות קוד עבור [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) נמצאות במאגר זה תחת הקבצים `xx-python-agent-framework` ו- `xx-dotnet-agent-framework`.

## הבנת מסגרת סוכני מיקרוסופט

![Framework Intro](../../../translated_images/he/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) היא המסגרת המאוחדת של מיקרוסופט לבניית סוכני בינה מלאכותית. היא מציעה גמישות להתמודדות עם מגוון רחב של מקרי שימוש סוכניים כפי שנראה הן בסביבות ייצור והן במחקר, כולל:

- **אורקסטרציה סדרתית** בתרחישים בהם נדרשים זרימות עבודה שלב-אחר-שלב.
- **אורקסטרציה מקבילה** בתרחישים בהם הסוכנים צריכים להשלים משימות בו-זמנית.
- **אורקסטרציה של שיחות קבוצתיות** בתרחישים בהם סוכנים משתפים פעולה יחד על משימה אחת.
- **אורקסטרציית העברת משימות** בתרחישים בהם סוכנים מעבירים את המשימה זה לזה כשהמשימות המשניות הושלמו.
- **אורקסטרציית מגנטית** בתרחישים בהם סוכן מנהל יוצר ומעדכן רשימת משימות ומטפל בתיאום תת-סוכנים להשלמת המשימה.

כדי לספק סוכני בינה מלאכותית בייצור, MAF כוללת גם תכונות עבור:

- **תצפית** באמצעות OpenTelemetry, כשכל פעולה של סוכן ה-AI כולל קריאת כלי, שלבי אורקסטרציה, זרימות נימוקים ומעקב ביצועים דרך לוחות בקרה של Microsoft Foundry.
- **אבטחה** בהפעלת סוכנים מקומית על Microsoft Foundry הכוללת בקרות אבטחה כגון גישת מבוססת תפקיד, טיפול בנתונים פרטיים ובטיחות תוכן מובנית.
- **עמידות** מכיוון ששרשורי סוכנים וזרימות עבודה יכולים להשהות, לחדש ולהתאושש מטעויות מה שמאפשר תהליכים ארוכי טווח.
- **שליטה** כיוון שזרימות עבודה עם מעורבות אדם נתמכות כשמשימות מסומנות כהדורשות אישור אדם.

מסגרת סוכני מיקרוסופט גם מתמקדת באינטרופרביליות על ידי:

- **להיות בלתי תלויה בענן אחד** - סוכנים יכולים לרוץ במכולות, מקומית ועל פני עננים שונים.
- **להיות בלתי תלויה בספק** - סוכנים יכולים להיווצר דרך SDK מועדף שלך כולל Azure OpenAI ו-OpenAI
- **שילוב תקנים פתוחים** - סוכנים יכולים להשתמש בפרוטוקולים כגון Agent-to-Agent (A2A) ו-Model Context Protocol (MCP) כדי לגלות ולהשתמש בסוכנים וכלים אחרים.
- **תוספים ומחברים** - ניתן ליצור חיבורים לשירותי נתונים וזיכרון כגון Microsoft Fabric, SharePoint, Pinecone ו-Qdrant.

בואו נבחן כיצד תכונות אלה מיושמות על כמה מהמושגים המרכזיים במסגרת סוכני מיקרוסופט.

## מושגים מרכזיים של מסגרת סוכני מיקרוסופט

### סוכנים

![Agent Framework](../../../translated_images/he/agent-components.410a06daf87b4fef.webp)

**יצירת סוכנים**

יצירת סוכן נעשית על ידי הגדרת שירות האינפרנס (ספק LLM),  
סט הוראות לסוכן ה-AI לעקוב אחריהן, והקצאת `name`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

הדוגמה למעלה משתמשת ב- `Azure OpenAI` אך סוכנים יכולים להיווצר באמצעות מגוון שירותים כולל `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` APIs

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

או [MiniMax](https://platform.minimaxi.com/), המספק API תואם OpenAI עם חלונות הקשר גדולים (עד 204K טוקנים):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

או סוכנים מרוחקים באמצעות פרוטוקול A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**הרצת סוכנים**

סוכנים מורצים באמצעות המתודות `.run` או `.run_stream` לתגובות לא סטרימינג או סטרימינג.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

כל הרצת סוכן יכולה לכלול גם אפשרויות להתאמת פרמטרים כגון `max_tokens` בהם משתמש הסוכן, `tools` שהסוכן יכול לקרוא להם, ואפילו ה- `model` עצמו שנעשה בו שימוש עבור הסוכן.

זה שימושי במקרים בהם נדרשים דגמים או כלים ספציפיים להשלמת משימת המשתמש.

**כלים**

כלים יכולים להיות מוגדרים הן בעת הגדרת הסוכן:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# כאשר יוצרים ChatAgent ישירות

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

וגם בעת הרצת הסוכן:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # כלי המסופק רק להרצה זו )
```

**שרשורי סוכן**

שרשורי סוכן משמשים לטיפול בשיחות מרובות-סבבים. ניתן ליצור שרשורים באמצעות:

- שימוש ב- `get_new_thread()` המאפשר שמירת השרשור לאורך זמן
- יצירת שרשור באופן אוטומטי כאשר מריצים סוכן והשרשור קיים רק במהלך הריצה הנוכחית.

כדי ליצור שרשור, הקוד נראה כך:

```python
# צור נושא חדש.
thread = agent.get_new_thread() # הפעל את הסוכן עם הנושא.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

לאחר מכן ניתן לסריאליזציה את השרשור לשמירה לשימוש מאוחר יותר:

```python
# צור אשכול חדש.
thread = agent.get_new_thread() 

# הרץ את הסוכן עם האשכול.

response = await agent.run("Hello, how are you?", thread=thread) 

# סדר את האשכול לאחסון.

serialized_thread = await thread.serialize() 

# פרק את מצב האשכול לאחר הטעינה מהאחסון.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**מידלוור סוכן**

סוכנים מתקשרים עם כלים ו-LLM להשלמת משימות המשתמש. בתרחישים מסוימים, אנו רוצים לבצע או לעקוב אחרי אינטראקציה ביניהם. מידלוור של סוכן מאפשר זאת באמצעות:

*Middleware פונקציונלי*

מידלוור זה מאפשר לנו לבצע פעולה בין הסוכן לפונקציה/כלי שאליו הסוכן יקרא. דוגמה לשימוש היא רישום קריאות הפונקציה (לוגינג).

בקוד למטה `next` מגדיר האם יש לקרוא למידלוור הבא או לפונקציה עצמה.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # עיבוד מקדים: רישום לפני ביצוע הפונקציה
    print(f"[Function] Calling {context.function.name}")

    # המשך למידלוור או לביצוע הפונקציה הבא
    await next(context)

    # עיבוד שלאחר מכן: רישום אחרי ביצוע הפונקציה
    print(f"[Function] {context.function.name} completed")
```

*Middleware צ'אט*

מידלוור זה מאפשר לנו לבצע או לרשום פעולה בין הסוכן והבקשות בין ה-LLM.

זה כולל מידע חשוב כמו ה- `messages` שנשלחים לשירות הבינה המלאכותית.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # עיבוד מקדים: רישום לפני הקריאה ל-AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # המשך למידלוור הבא או לשירות ה-AI
    await next(context)

    # עיבוד לאחר הקריאה: רישום אחרי תגובת ה-AI
    print("[Chat] AI response received")

```

**זיכרון סוכן**

כפי שפורט בשיעור `Agentic Memory`, הזיכרון הוא מרכיב חשוב לאפשרות הסוכן לפעול בהקשרים שונים. MAF מציעה כמה סוגי זיכרונות:

*אחסון בזיכרון פנימי*

זהו הזיכרון שנשמר בשרשורים במהלך זמן ריצת היישום.

```python
# צור אשן חדשה.
thread = agent.get_new_thread() # הרץ את הסוכן עם האשן.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*הודעות מתמשכות*

זיכרון זה משמש לאחסון היסטוריית שיחה בין מפגשים שונים. הוא מוגדר באמצעות `chat_message_store_factory` :

```python
from agent_framework import ChatMessageStore

# צור מאגר הודעות מותאם אישית
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*זיכרון דינמי*

זיכרון זה מתווסף להקשר לפני הרצת הסוכנים. זיכרונות אלה יכולים להישמר בשירותים חיצוניים כגון mem0:

```python
from agent_framework.mem0 import Mem0Provider

# שימוש ב-Mem0 עבור יכולות זיכרון מתקדמות
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

**תצפית על סוכן**

תצפית חשובה לבניית מערכות סוכנים אמינות וניתנות לתחזוקה. MAF משתלבת עם OpenTelemetry כדי לספק מעקב ומדדים לתצפית טובה יותר.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # לעשות משהו
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### זרימות עבודה

MAF מציעה זרימות עבודה שהן שלבים מוגדרים מראש להשלמת משימה וכוללות סוכני AI כמרכיבים באותם השלבים.

זרימות עבודה מורכבות ממרכיבים שונים שמאפשרים זרימת שליטה טובה יותר. זרימות עבודה מאפשרות גם **אורקסטרציית סוכנים מרובה** ו- **נקודות בדיקה** לשמירת מצבי הזרימה.

המרכיבים המרכזיים של זרימת עבודה הם:

**מבצעים (Executors)**

מבצעים מקבלים הודעות קלט, מבצעים את המשימות שהוקצו להם, ואז מייצרים הודעת פלט. זה מקדם את זרימת העבודה להשלמת המשימה הגדולה יותר. מבצעים יכולים להיות סוכני AI או לוגיקה מותאמת אישית.

**קצוות (Edges)**

קצוות משמשים להגדרת זרימת ההודעות בזרימת עבודה. אלו יכולים להיות:

*קצוות ישירים* - חיבורים פשוטים אחד-על-אחד בין מבצעים:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*קצוות מותנים* - מופעלים לאחר שמתקיים תנאי מסוים. לדוגמה, כשהחדרים במלונות לא זמינים, מבצע יכול להציע אפשרויות אחרות.

*קצוות מבוססי-מקרה* - מנתבים הודעות למבצעים שונים בהתאם לתנאים מוגדרים. למשל, אם ללקוח הנסיעה יש גישת עדיפות, המשימות שלו יטופלו דרך זרימת עבודה אחרת.

*קצוות פיזור* - שולחים הודעה אחת למספר יעדים.

*קצוות איסוף* - אוספים מספר הודעות ממבצעים שונים ושולחים ליעד אחד.

**אירועים**

לשם תצפית טובה יותר בזרימות עבודה, MAF מציעה אירועים מובנים לביצוע כולל:

- `WorkflowStartedEvent`  - התחלת ביצוע זרימת העבודה
- `WorkflowOutputEvent` - זרימת העבודה מייצרת פלט
- `WorkflowErrorEvent` - זרימת העבודה נתקלת בשגיאה
- `ExecutorInvokeEvent`  - המבצע מתחיל לעבד
- `ExecutorCompleteEvent`  -  המבצע מסיים עיבוד
- `RequestInfoEvent` - בקשה הוצאה לפועל

## תבניות מתקדמות של MAF

הסעיפים לעיל מכסים את המושגים המרכזיים של מסגרת סוכני מיקרוסופט. כשאתה בונה סוכנים מורכבים יותר, הנה כמה תבניות מתקדמות לשקול:

- **קומפוזיציית מידלוור**: שרשרת של מספר מטפלי מידלוור (לוגינג, אימות, הגבלת קצב) באמצעות מידלוור פונקציה וצ'אט לשליטה מדויקת בהתנהגות הסוכן.
- **נקודות בדיקת זרימת עבודה**: השתמש באירועי זרימת עבודה וסריאליזציה לשמירה וממשכון תהליכי סוכן ארוכי טווח.
- **בחירת כלי דינמית**: שילוב RAG על תיאורי כלים עם רישום הכלים של MAF להצגת כלים רלוונטיים בלבד לשאילתה.
- **העברת סוכנים מרובים**: השתמש בקצוות זרימת עבודה וניתוב מותנה לאורקסטרציית העברות בין סוכנים מתמחים.

## אירוח סוכני LangChain / LangGraph על Microsoft Foundry

מסגרת סוכני מיקרוסופט היא **מסגרת-אינטרופרבילית** — אינך מוגבל לסוכנים שנכתבו עם MAF בלבד. אם יש לך סוכן שנבנה עם **LangChain** או **LangGraph**, תוכל להריץ אותו כסוכן **מונחס על Microsoft Foundry** כך ש-Foundry תתפעל את זמן הריצה, המפגשים, ההיקפים, הזהות ונקודות הקצה לפרוטוקול עבורך, בעוד שהלוגיקה של הסוכן נשארת ב-LangGraph.

זה מתבצע באמצעות החבילה `langchain_azure_ai.agents.hosting`, החשופה גרף LangGraph מקומפל על אותו פרוטוקולים בהם משתמשים סוכנים מונחים Foundry.

**1. התקן את חבילת ההארחה:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

תוספת `hosting` מתקינה את ספריות הפרוטוקול Foundry: `azure-ai-agentserver-responses` (נקודת הקצה התואמת OpenAI `/responses`) ו- `azure-ai-agentserver-invocations` (נקודת הקצה הכללית `/invocations`).

**2. בחר פרוטוקול אירוח:**

| Protocol | Host class | Endpoint | Use when |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | רוצה צ'אט תואם OpenAI, סטרימינג, היסטוריית תגובות, ושרשור שיחות — ברירת המחדל המומלצת לסוכנים שיחותיים. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | זקוק לצורת JSON מותאמת אישית, נקודת קצה בסגנון webhook, או עיבוד לא שיחותי. |

מכיוון ש**ממשק Responses הוא הממשק הראשי לפיתוח בסגנון סוכן ב-Foundry**, התחל עם `ResponsesHostServer` לרוב הסוכנים.

**3. הגדר משתני סביבה** (`az login` קודם כדי ש- `DefaultAzureCredential` יוכל לאמת):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

כשסוכן יפעל מאוחר יותר כסוכן מונחס ב-Foundry, הפלטפורמה תזריק אוטומטית את `FOUNDRY_PROJECT_ENDPOINT`.

**4. חשוף סוכן LangGraph דרך פרוטוקול Responses:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # כאן ChatOpenAI מכוון לנקודת הקצה התואמת ל-OpenAI (Responses) של פרוייקט Foundry.
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

הרץ את זה מקומית עם `python main.py`, ואז שלח בקשת Responses אל `http://localhost:8088/responses`.

**התנהגויות מפתח:**

- **שיחות**: לקוחות ממשיכים שיחה על ידי העברת `previous_response_id` או מזהה `conversation`. אם הגרף שלך מקומפל עם מנגנון LangGraph checkpointer, Foundry מקשרת את מצב השיחה לנקודת הבדיקה (השתמש במנגנון עמיד בייצור; `MemorySaver` טוב לבדיקה מקומית).
- **אדם בתווך**: אם הגרף שלך משתמש ב- LangGraph `interrupt()`, `ResponsesHostServer` מציג את ההפרעה הממתינה כפריט `function_call` / `mcp_approval_request` בתגובות, והלקוחות ממשיכים עם `function_call_output` / `mcp_approval_response` תואם.
- **פריסה ל-Foundry**: השתמש ב-Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (מקומי, דורש Docker), אחר כך `azd provision` ו- `azd deploy`. פריסת סוכן מונחס דורשת תפקיד **Foundry Project Manager**.

גרסה ניתנת להרצה של דוגמה זו נמצאת ב- [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). בשביל ההדרכה המלאה (פרוטוקול Invocations, סכמות בקשות מותאמות אישית, ופתרון בעיות), ראה [אירוח סוכני LangGraph כסוכנים מונחים Foundry](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## דוגמאות קוד 

דוגמאות קוד למסגרת סוכני מיקרוסופט ניתן למצוא במאגר זה תחת הקבצים `xx-python-agent-framework` ו- `xx-dotnet-agent-framework`.

## שאלות נוספות לגבי מסגרת סוכני מיקרוסופט?

הצטרף ל-[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) כדי להיפגש עם לומדים אחרים, להשתתף בשעות קבלה ולקבל מענה על שאלותיך בנוגע לסוכני AI.
## שיעור קודם

[זיכרון עבור סוכני בינה מלאכותית](../13-agent-memory/README.md)

## שיעור הבא

[בניית סוכני שימוש במחשב (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->