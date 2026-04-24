# חקר מסגרת הסוכן של מיקרוסופט

![Agent Framework](../../../translated_images/he/lesson-14-thumbnail.90df0065b9d234ee.webp)

### מבוא

השיעור הזה יכסה:

- הבנת מסגרת הסוכן של מיקרוסופט: תכונות מפתח וערך  
- חקר המושגים המרכזיים של מסגרת הסוכן של מיקרוסופט
- דפוסי MAF מתקדמים: תרחישי עבודה, Middleware וזיכרון

## מטרות למידה

לאחר השלמת שיעור זה, תדע כיצד:

- לבנות סוכני AI מוכנים לייצור באמצעות מסגרת הסוכן של מיקרוסופט
- להחיל את התכונות המרכזיות של מסגרת הסוכן של מיקרוסופט על מקרים שימוש סוכןיים שלך
- להשתמש בדפוסים מתקדמים כולל תרחישי עבודה, middleware וניטור

## דוגמאות קוד

דוגמאות קוד עבור [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) נמצאות במאגר זה תחת הקבצים `xx-python-agent-framework` ו-`xx-dotnet-agent-framework`.

## הבנת מסגרת הסוכן של מיקרוסופט

![Framework Intro](../../../translated_images/he/framework-intro.077af16617cf130c.webp)

[מסגרת הסוכן של מיקרוסופט (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) היא המסגרת המאוחדת של מיקרוסופט לבניית סוכני AI. היא מציעה גמישות לטיפול במגוון רחב של מקרים שימוש סוכןיים שנצפים הן בסביבת ייצור והן במחקר, כולל:

- **תזמור סוכן סדרתי** בתרחישים שבהם נדרשים תרחישי עבודה שלב אחר שלב.
- **תזמור מקביל** בתרחישים שבהם סוכנים צריכים להשלים משימות במקביל.
- **תזמור שיחת קבוצה** בתרחישים שבהם סוכנים יכולים לשתף פעולה יחד על אותה משימה.
- **תזמור העברה** בתרחישים שבהם סוכנים מעבירים את המשימה זה לזה כאשר תתי-המשימות הושלמו.
- **תזמור מגנטי** בתרחישים שבהם סוכן מנהל יוצר ומשנה רשימת משימות ומטפל בתיאום בין תת-סוכנים להשלמת המשימה.

כדי לספק סוכני AI בייצור, MAF כוללת גם תכונות עבור:

- **ניטור** באמצעות שימוש ב-OpenTelemetry שבו כל פעולה של סוכן ה-AI כולל קריאת כלים, שלבי תזמור, זרמי הסקה וניטור ביצועים דרך לוחות המחוונים של Microsoft Foundry.
- **אבטחה** באמצעות אירוח סוכנים באופן מקומי ב-Microsoft Foundry הכולל בקרות אבטחה כמו גישה מבוססת תפקידים, טיפול בנתונים פרטיים ובטיחות תוכן מובנית.
- **עמידות** מכיוון ששרשורי סוכן וזרמי עבודה יכולים להיעצר, לחדש ולשקם שגיאות, מה שמאפשר תהליכים ארוכי טווח.
- **שליטה** מאחר וזרמי עבודה עם מעורבות אדם נתמכים כאשר משימות מסומנות כדרושות אישור אנושי.

מסגרת הסוכן של מיקרוסופט מתמקדת גם ביכולת הפעולה הבין-מערכתית על ידי:

- **היותה בלתי תלויה בענן** - סוכנים יכולים לפעול במכולות, באתר ועל פני מספר עננים שונים.
- **היותה בלתי תלויה בספק** - סוכנים יכולים להיווצר דרך SDK מועדף כולל Azure OpenAI ו-OpenAI.
- **אינטגרציה עם תקנים פתוחים** - סוכנים יכולים להשתמש בפרוטוקולים כגון Agent-to-Agent (A2A) ו-Model Context Protocol (MCP) כדי לגלות ולהשתמש בסוכנים וכלים אחרים.
- **תוספים ומחברים** - ניתן לחבר לשירותי נתונים וזיכרון כמו Microsoft Fabric, SharePoint, Pinecone ו-Qdrant.

בואו נראה כיצד תכונות אלו מיושמות על חלק מהמושגים המרכזיים של מסגרת הסוכן של מיקרוסופט.

## מושגי מפתח של מסגרת הסוכן של מיקרוסופט

### סוכנים

![Agent Framework](../../../translated_images/he/agent-components.410a06daf87b4fef.webp)

**יצירת סוכנים**

יצירת סוכן נעשית על-ידי הגדרת שירות ההסקה (ספק LLM), מערך הוראות לסוכן ה-AI לעקוב אחריהם ושם מוענק:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```
  
הדוגמה למעלה משתמשת ב-`Azure OpenAI` אך ניתן ליצור סוכנים באמצעות מגוון שירותים כולל `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```
  
API-ים של OpenAI `Responses` ו-`ChatCompletion`

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```
  
```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```
  
או [MiniMax](https://platform.minimaxi.com/) המספק API תואם OpenAI עם חלונות הקשר גדולים (עד 204K טוקנים):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```
  
או סוכנים מרוחקים באמצעות פרוטוקול A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```
  
**הרצת סוכנים**

סוכנים מורצים באמצעות שיטות `.run` או `.run_stream` לתגובות שאינן שידור או שידור.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```
  
```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```
  
לכל הרצת סוכן ניתן להגדיר אפשרויות להתאמת פרמטרים כמו `max_tokens` שבהם הסוכן משתמש, `tools` שהסוכן יכול לקרוא להם, ואפילו את `model` עצמו שמשמש את הסוכן.

זה שימושי במקרים בהם נדרשים מודלים או כלים ספציפיים להשלמת משימת המשתמש.

**כלים**

ניתן להגדיר כלים גם בעת הגדרת הסוכן:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# כאשר יוצרים סוכן שיחה באופן ישיר

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```
  
וגם בעת הרצת הסוכן:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # הכלי ניתן לשימוש לריצה זו בלבד )
```
  
**שרשורי סוכן**

שרשורי סוכן משמשים לטיפול בשיחות רב-סבביות. שרשורים יכולים להיווצר באמצעות:

- שימוש ב-`get_new_thread()` שמאפשר לשמור את השרשור לאורך זמן  
- יצירת שרשור אוטומטית בעת הרצת סוכן כאשר השרשור נשמר רק במהלך ההרצה הנוכחית.

ליצירת שרשור, הקוד נראה כך:

```python
# צור תסריט חדש.
thread = agent.get_new_thread() # הפעל את הסוכן עם התסריט.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```
  
ניתן אז לסדר את השרשור לשמירה לשימוש מאוחר יותר:

```python
# ליצור אשף חדש.
thread = agent.get_new_thread() 

# להריץ את הסוכן עם האשף.

response = await agent.run("Hello, how are you?", thread=thread) 

# לסדר את האשף לאחסון.

serialized_thread = await thread.serialize() 

# לנתח את מצב האשף לאחר טעינה מהאחסון.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```
  
**Middleware של סוכן**

סוכנים מתקשרים עם כלים ו-LLMs להשלמת משימות המשתמש. בתרחישים מסוימים, אנו רוצים לבצע או לעקוב אחרי הפעולות במהלך האינטראקציות הללו. Middleware של סוכן מאפשר לעשות זאת באמצעות:

*Middleware פונקציונלי*

Middleware זה מאפשר לנו לבצע פעולה בין הסוכן לבין פונקציה/כלי שהוא קורא לה. דוגמה לשימוש היא רישום קריאות הפונקציה.

בקוד למטה, `next` מגדיר האם יש לקרוא ל-middleware הבא או לפונקציה עצמה.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # עיבוד מקדים: רישום לפני ביצוע הפונקציה
    print(f"[Function] Calling {context.function.name}")

    # המשך למידלוור הבא או לביצוע הפונקציה
    await next(context)

    # עיבוד לאחר הביצוע: רישום אחרי ביצוע הפונקציה
    print(f"[Function] {context.function.name} completed")
```
  
*Middleware לשיחה*

Middleware זה מאפשר לבצע או לרשום פעולה בין הסוכן לבין הבקשות בין ה-LLM.

זה כולל מידע חשוב כמו ה-`messages` שנשלחים לשירות ה-AI.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # עיבוד מקדים: רישום לפני קריאת ה-AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # המשך לשכבת הביניים הבאה או לשירות ה-AI
    await next(context)

    # עיבוד לאחר מכן: רישום לאחר תגובת ה-AI
    print("[Chat] AI response received")

```
  
**זיכרון סוכן**

כפי שכוסה בשיעור `Agentic Memory`, הזיכרון הוא אלמנט חשוב לאפשר לסוכן לפעול בהקשרים שונים. ל-MAF יש מספר סוגי זיכרון:

*אחסון בזיכרון השרשור*

זהו הזיכרון המאוחסן בשרשורים במהלך זמן ריצת האפליקציה.

```python
# צור אשכול חדש.
thread = agent.get_new_thread() # הפעל את הסוכן עם האשכול.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```
  
*הודעות מתמשכות*

זיכרון זה משמש לשמירת היסטוריית שיחות בין מושבים שונים. הוא מוגדר באמצעות `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# צור מחסן הודעות מותאם אישית
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```
  
*זיכרון דינמי*

זיכרון זה נוסף להקשר לפני שהסוכנים מורצים. זיכרונות אלה יכולים להישמר בשירותים חיצוניים כגון mem0:

```python
from agent_framework.mem0 import Mem0Provider

# שימוש ב-Mem0 ליכולות זיכרון מתקדמות
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
  
**ניטור סוכן**

ניטור חשוב לבניית מערכות סוכן אמינות וניתנות לתחזוקה. MAF משתלב עם OpenTelemetry כדי לספק מעקב ומדדים לניטור טוב יותר.

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
  
### תרחישי עבודה

MAF מציעה תרחישי עבודה שהם שלבים מוגדרים מראש להשלמת משימה וכוללים סוכני AI כרכיבים בשלבים אלו.

תרחישי העבודה מורכבים ממרכיבים שונים המאפשרים זרימת שליטה טובה יותר. תרחישי העבודה גם מאפשרים **תזמור רב-סוכני** ו**שמירת נקודות בדיקה** לשמירת מצבי תרחיש העבודה.

המרכיבים המרכזיים של תרחיש עבודה הם:

**מבצעים (Executors)**

המבצעים מקבלים הודעות קלט, מבצעים את המשימות שהוקצו להם ואז מפיקים הודעת פלט. זה מזיז את תרחיש העבודה קדימה לעבר השלמת המשימה הרחבה יותר. המבצעים יכולים להיות סוכן AI או לוגיקה מותאמת אישית.

**קצוות (Edges)**

קצוות משמשים להגדרת זרימת ההודעות בתרחיש העבודה. אלה יכולים להיות:

*קצוות ישירים* - חיבורים פשוטים אחד לאחד בין המבצעים:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```
  
*קצוות מותנים* - מופעלים לאחר שמתקיים תנאי מסוים. לדוגמה, כאשר חדרי מלון אינם זמינים, מבצע יכול להציע אפשרויות אחרות.

*קצוות של מקרה-מחליף (Switch-case)* - מנתבים הודעות למבצעים שונים בהתבסס על תנאים שהוגדרו. לדוגמה, אם ללקוח טיולים יש גישה עדיפות ומשימותיו יטופלו בתרחיש עבודה אחר.

*קצוות פיזור (Fan-out)* - שולחים הודעה אחת למספר יעדים.

*קצוות איסוף (Fan-in)* - אוספים מספר הודעות ממבצעים שונים ושולחים ליעד אחד.

**אירועים**

כדי לספק ניטור משופר של תרחישי העבודה, MAF מציעה אירועים מובנים לביצוע כולל:

- `WorkflowStartedEvent`  - התחלת ביצוע תרחיש העבודה  
- `WorkflowOutputEvent` - תרחיש העבודה מייצר פלט  
- `WorkflowErrorEvent`  - תרחיש העבודה נתקל בשגיאה  
- `ExecutorInvokeEvent`  - המבצע מתחיל לעבד  
- `ExecutorCompleteEvent`  -  המבצע מסיים עיבוד  
- `RequestInfoEvent` - בקשה הוצאה לפועל  

## דפוסי MAF מתקדמים

הסעיפים שלמעלה מכסים את מושגי המפתח של מסגרת הסוכן של מיקרוסופט. ככל שתבנה סוכנים מורכבים יותר, הנה כמה דפוסים מתקדמים לשקול:

- **הרכבת Middleware**: שרשר מספר מטפלי middleware (רישום, אימות, הגבלת קצב) באמצעות middleware פונקציונלי ושיחת middleware לשליטה מדויקת על התנהגות הסוכן.
- **שמירת נקודות בדיקה בתרחישי עבודה**: השתמש באירועי תרחישי עבודה ובסידור נתונים כדי לשמור ולחדש תהליכים ארוכי טווח של סוכנים.
- **בחירת כלים דינמית**: שילוב RAG מעל תיאורי כלים עם הרשמת הכלים ב-MAF להצגת כלים רלוונטיים בלבד לפי שאילתה.
- **העברת משימות בין סוכנים מרובים**: השתמש בקצוות תרחישי עבודה וניתוב מותנה לתזמר העברות בין סוכנים מומחים.

## דוגמאות קוד

דוגמאות קוד למסגרת הסוכן של מיקרוסופט נמצאות במאגר זה תחת הקבצים `xx-python-agent-framework` ו-`xx-dotnet-agent-framework`.

## יש לך עוד שאלות על מסגרת הסוכן של מיקרוסופט?

הצטרף ל-[Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) כדי להיפגש עם לומדים אחרים, להשתתף בשעות קבלה ולקבל מענה על שאלותיך בנושא סוכני AI.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתר**:  
מסמך זה תורגם באמצעות שירות התרגום האוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש להיות מודעים לכך שתירגומים אוטומטיים עלולים להכיל שגיאות או אי דיוקים. יש להתייחס למסמך המקורי בשפתו המקורית כמקור הסמכותי. עבור מידע קריטי מומלץ להשתמש בתרגום מקצועי שנעשה על ידי אדם. איננו אחראים לכל אי הבנה או פרשנות שגויה הנובעות משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->