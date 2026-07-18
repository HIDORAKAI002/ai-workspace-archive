[![כיצד לעצב סוכני AI טובים](../../../translated_images/he/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(לחץ על התמונה למעלה כדי לצפות בסרטון של השיעור הזה)_

# תבנית עיצוב שימוש בכלים

כלים הם מעניינים כי הם מאפשרים לסוכני AI להחזיק בטווח רחב יותר של יכולות. במקום שהסוכן יוכל לבצע רק סט פעולות מוגבל, על ידי הוספת כלי, הסוכן כעת יכול לבצע טווח רחב של פעולות. בפרק זה נבחן את תבנית העיצוב של שימוש בכלים, המתארת כיצד סוכני AI יכולים להשתמש בכלים מסוימים כדי להשיג את יעדיהם.

## הקדמה

בשיעור זה אנו מנסים לענות על השאלות הבאות:

- מהי תבנית העיצוב של שימוש בכלים?
- באילו מקרים ניתן ליישם אותה?
- מהם האלמנטים/אבני הבניין הדרושים ליישום תבנית העיצוב?
- מהי ההתייחסות המיוחדת לשימוש בתבנית העיצוב של שימוש בכלים לבניית סוכני AI אמינים?

## מטרות הלמידה

לאחר סיום שיעור זה, תוכל:

- להגדיר את תבנית העיצוב של שימוש בכלים ואת מטרתה.
- לזהות מקרים בהם ניתן ליישם את תבנית העיצוב של שימוש בכלים.
- להבין את האלמנטים המרכזיים הדרושים ליישום תבנית העיצוב.
- לזהות שיקולים להבטחת אמינות בסוכני AI המשתמשים בתבנית העיצוב הזו.

## מהי תבנית העיצוב של שימוש בכלים?

**תבנית העיצוב של שימוש בכלים** מתמקדת במתן היכולת ל-LLM לקיים אינטראקציה עם כלים חיצוניים להשגת יעדים ספציפיים. כלים הם קוד שניתן להפעיל על ידי סוכן לביצוע פעולות. כלי יכול להיות פונקציה פשוטה כמו מחשבון, או קריאת API לשירות צד שלישי כמו חיפוש מחיר מניות או תחזית מזג אוויר. בהקשר של סוכני AI, כלים מתוכננים להיות מופעלים על ידי סוכנים בתגובה ל**קריאות פונקציה שנוצרו על ידי המודל**.

## באילו מקרים ניתן ליישם אותה?

סוכני AI יכולים לנצל כלים כדי להשלים משימות מורכבות, לאחזר מידע או לקבל החלטות. תבנית העיצוב של שימוש בכלים משמשת לעיתים קרובות בתרחישים שדורשים אינטראקציה דינמית עם מערכות חיצוניות, כגון מסדי נתונים, שירותי רשת או מפרשי קוד. יכולת זו שימושית למספר מקרים שונים, כולל:

- **אחזור מידע דינמי:** סוכנים יכולים לשאול APIs חיצוניים או מסדי נתונים לאיסוף נתונים מעודכנים (לדוגמה, שאילתא למסד נתונים SQLite לניתוח נתונים, אחזור מחירי מניות או מידע על מזג אוויר).
- **ביצוע ופרשנות קוד:** סוכנים יכולים להריץ קוד או סקריפטים לפתירת בעיות מתמטיות, יצירת דוחות או ביצוע סימולציות.
- **אוטומציה של זרימות עבודה:** אוטומציה של זרימות עבודה חוזרות או מרובות שלבים על ידי שילוב כלים כמו מתזמנים למשימות, שירותי דואר אלקטרוני או צנרת נתונים.
- **תמיכה בלקוחות:** סוכנים יכולים לקיים אינטראקציה עם מערכות CRM, פלטפורמות כרטוס או בסיסי ידע לפתרון שאלות משתמשים.
- **יצירה ועריכה של תוכן:** סוכנים יכולים לנצל כלים כמו בודקי דקדוק, מסכמים טקסטואליים או מעריכי בטיחות תוכן כדי לסייע במשימות יצירת תוכן.

## מהם האלמנטים/אבני הבניין הדרושים ליישום תבנית העיצוב של שימוש בכלים?

אבני בניין אלו מאפשרות לסוכן AI לבצע טווח רחב של משימות. נבחן את האלמנטים המרכזיים הדרושים ליישום תבנית העיצוב של שימוש בכלים:

- **סכמות פונקציות/כלים:** הגדרות מפורטות של כלים זמינים, כולל שם הפונקציה, מטרתה, פרמטרים נדרשים ופלטים צפויים. סכמות אלו מאפשרות ל-LLM להבין אילו כלים זמינים ואיך לבנות בקשות תקינות.

- **לוגיקת ביצוע פונקציות:** מגדירה מתי וכיצד הכלים מופעלים בהתאם לכוונת המשתמש ולהקשר השיחה. זה עשוי לכלול מודולים לתכנון, מנגנוני ניתוב או זרומים מותנים שמחליטים על השימוש בכלים בדינמיות.

- **מערכת טיפול בהודעות:** רכיבים המנהלים את זרימת השיחה בין קלטים של משתמש, תגובות LLM, קריאות לכלים ופלטים מכלים.

- **מסגרת אינטגרציה של כלים:** תשתית שמחברת את הסוכן לכלים שונים, בין אם הם פונקציות פשוטות או שירותים חיצוניים מורכבים.

- **טיפול בשגיאות ואימות:** מנגנונים לטיפול בכשלונות בביצוע כלים, אימות פרמטרים וניהול תגובות לא צפויות.

- **ניהול מצב:** עוקב אחרי הקשר השיחה, אינטראקציות קודמות עם כלים ונתונים מתמשכים כדי להבטיח עקביות לאורך אינטראקציות מרובות סבבים.

לאחר מכן, נבחן לפרטים את קריאת פונקציות/כלים.
 
### קריאת פונקציות/כלים

קריאת פונקציות היא הדרך העיקרית שאנו מאפשרים למודלים שפתיים גדולים (LLMs) לקיים אינטראקציה עם כלים. לעיתים קרובות תראה ש'פונקציה' ו'כלי' משמשים לסירוגין כיוון ש'פונקציות' (בלוקים של קוד שניתן להשתמש בהם חוזר) הן ה'כלים' שסוכנים משתמשים בהם לביצוע משימות. כדי שקוד פונקציה יקרא, ה-LLM צריך להשוות את בקשת המשתמש לתיאור הפונקציות. לשם כך, סכמת JSON המכילה את תיאורי כל הפונקציות הזמינות נשלחת ל-LLM. ה-LLM בוחר את הפונקציה המתאימה ביותר למשימה ומחזיר את שמה והארגומנטים. הפונקציה שנבחרה מופעלת, תגובתה נשלחת חזרה ל-LLM, שמנצל את המידע להגיב לבקשת המשתמש.

למפתחים שרוצים ליישם קריאת פונקציות לסוכנים, תזדקקו ל:

1. מודל LLM שתומך בקריאת פונקציות
2. סכמת JSON המכילה תיאורי פונקציות
3. הקוד עבור כל פונקציה שמתואר

נשתמש בדוגמה של קבלת הזמן הנוכחי בעיר להמחשה:

1. **אתחול דגם LLM שתומך בקריאת פונקציות:**

    לא כל הדגמים תומכים בקריאת פונקציות, לכן חשוב לבדוק שה-LLM שבו אתם משתמשים אכן תומך. <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> תומך בקריאת פונקציות. ניתן להתחיל בהפעלת ה-OpenAI client נגד Azure OpenAI **Responses API** (נקודת קצה יציבה `/openai/v1/` — אין צורך ב`api_version`).

    ```python
    # לאתחל את לקוח OpenAI עבור Azure OpenAI (ממשק API לתגובות, נקודת קצה v1)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **יצירת סכמת פונקציה**:

    לאחר מכן נגדיר סכמת JSON המכילה את שם הפונקציה, תיאור מה הפונקציה עושה, ושמות ותיאורים של הפרמטרים שלה.
    לאחר מכן נעביר את הסכמה הזו ללקוח שהוגדר קודם, יחד עם בקשת המשתמש לקבלת הזמן בסן פרנסיסקו. חשוב לציין כי **קריאת כלי** היא התוצאה שמוחזרת, **ולא** התשובה הסופית לשאלה. כפי שצוין קודם, ה-LLM מחזיר את שם הפונקציה שנבחרה למשימה, ואת הפרמטרים שיועברו לה.

    ```python
    # תיאור פונקציה לקריאת המודל (פורמט כלי שטוח של ממשק API לתגובות)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # הודעת המשתמש ההתחלתית
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # קריאת API ראשונה: בקש מהמודל להשתמש בפונקציה
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # ממשק ה-API של התגובות מחזיר קריאות לכלים כפריטי function_call ב-response.output.
    # הוסף אותם לשיחה כדי שלמודל יהיה הקשר מלא בסיבוב הבא.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **קוד הפונקציה הדרוש לביצוע המשימה:**

    עכשיו כש-LLM בחר איזו פונקציה יש להריץ, צריך לממש ולהפעיל את הקוד שמבצע את המשימה.
    נוכל לממש את הקוד לקבלת הזמן הנוכחי בפייתון. כמו כן, נצטרך לכתוב קוד לחלץ שם ופטרמטרים מהתגובה לקבלת התוצאה הסופית.

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # טיפול בקריאות לפונקציה
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # החזר את התוצאה של הכלי כפריט output_call_function
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # קריאת API שנייה: קבל את התגובה הסופית מהדגם
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

קריאת פונקציות היא במרכז רוב, אם לא כל, תבניות העיצוב של שימוש בכלים עם סוכנים, אולם מימוש שלה מאפס יכול להיות מאתגר לפעמים.
כפי שלמדנו ב[שיעור 2](../../../02-explore-agentic-frameworks), מסגרות סוכנים מספקות לנו אבני בניין מוכנות לבניית שימוש בכלים.
 
## דוגמאות לשימוש בכלים עם מסגרות סוכנים

הנה כמה דוגמאות לאופן בו ניתן ליישם את תבנית העיצוב של שימוש בכלים באמצעות מסגרות סוכנים שונות:

### מסגרת סוכן של מיקרוסופט

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">מסגרת סוכן של מיקרוסופט</a> היא מסגרת AI בקוד פתוח לבניית סוכני AI. היא מפשטת את התהליך של שימוש בקריאות פונקציות באמצעות הגדרת כלים כפונקציות פייתון עם התגית `@tool`. המסגרת מנהלת את התקשורת בינך לבין המודל והקוד שלך. בנוסף, היא מספקת גישה לכלים מוכנים מראש כמו חיפוש קבצים ומפרש קוד דרך `FoundryChatClient`.

התרשים הבא ממחיש את תהליך קריאת פונקציות במסגרת סוכן של מיקרוסופט:

![קריאת פונקציות](../../../translated_images/he/functioncalling-diagram.a84006fc287f6014.webp)

במסגרת סוכן של מיקרוסופט, כלים מוגדרים כפונקציות עם תגית דקורטור. נוכל להמיר את הפונקציה `get_current_time` שראינו קודם לכלי באמצעות הדקורטור `@tool`. המסגרת תקלוט אוטומטית את הפונקציה ופרמטריה, ותיצור את הסכמה לשליחה ל-LLM.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# צור את הלקוח
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# צור סוכן והרץ עם הכלי
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### שירות סוכן Foundry של מיקרוסופט

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">שירות סוכן Foundry של מיקרוסופט</a> היא מסגרת סוכנים חדשה יותר שנועדה לאפשר למפתחים לבנות לפרוס ולהרחיב סוכני AI איכותיים ובטוחים ללא צורך לנהל משאבי חישוב ואחסון בסיסיים. היא מאוד שימושית לאפליקציות ארגוניות מכיוון שהיא שירות מנוהל לחלוטין עם אבטחת דרג ארגונית.

בהשוואה לפיתוח ישיר עם API של LLM, שירות סוכן Foundry של מיקרוסופט מציע מספר יתרונות, כולל:

- קריאת כלי אוטומטית – אין צורך לנתח קריאות כלי, להפעיל את הכלי ולטפל בתגובה; כל זה נעשה כעת בצד השרת
- ניהול מאובטח של נתונים – במקום לנהל את מצב השיחה בעצמך, ניתן להסתמך על Threads לשמירת כל המידע הדרוש
- כלים מוכנים לשימוש – כלים שניתן להשתמש בהם לאינטראקציה עם מקורות הנתונים שלך, כמו Bing, Azure AI Search, ו-Azure Functions.

הכלים הזמינים בשירות סוכן Foundry של מיקרוסופט ניתן לחלק לשתי קטגוריות:

1. כלים ידע:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">רקע באמצעות חיפוש Bing</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">חיפוש קבצים</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">חיפוש Azure AI</a>

2. כלים לפעולות:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">קריאת פונקציות</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">מפרש קוד</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">כלים המוגדרים באמצעות OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

השירות מאפשר לנו להשתמש בכלים אלו יחד כ'toolset'. בנוסף, הוא משתמש ב`threads` לשמירת היסטוריית הודעות משיחה מסוימת.

דמיין שאתה סוכן מכירות בחברה בשם Contoso. ברצונך לפתח סוכן שיחה שיכול לענות על שאלות בנוגע לנתוני המכירות שלך.

התמונה הבאה ממחישה כיצד תוכל להשתמש בשירות סוכן Foundry של מיקרוסופט לניתוח נתוני המכירות שלך:

![שירות סוכני פעולה](../../../translated_images/he/agent-service-in-action.34fb465c9a84659e.webp)

כדי להשתמש בכלים אלו עם השירות, ניתן ליצור לקוח ולהגדיר כלי או סט כלים. ליישום מעשי נשתמש בקוד פייתון הבא. ה-LLM יוכל לבחון את ה-toolset ולבחור האם להשתמש בפונקציה שיצר המשתמש, `fetch_sales_data_using_sqlite_query`, או במפרש הקוד המובנה, בהתאם לבקשת המשתמש.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # פונקציית fetch_sales_data_using_sqlite_query שניתן למצוא בקובץ fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# אתחול ערכת כלים
toolset = ToolSet()

# אתחול סוכן קריאת פונקציות עם פונקציית fetch_sales_data_using_sqlite_query והוספתה לערכת הכלים
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# אתחול כלי מתרגם הקוד והוספתו לערכת הכלים.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## מהם השיקולים המיוחדים לשימוש בתבנית העיצוב של שימוש בכלים לבניית סוכני AI אמינים?

חשש נפוץ עם SQL שנוצר דינמית על ידי LLM הוא אבטחה, במיוחד סיכון להזרקת SQL או פעולות זדוניות, כמו מחיקה או זיוף מסד הנתונים. אמנם חששות אלו נכונים, הם ניתנים להפחתה באופן יעיל על ידי קביעת הרשאות גישה למסד הנתונים בצורה נכונה. עבור רוב מסדי הנתונים זה כרוך בהגדרת מסד הנתונים לקריאה בלבד. עבור שירותי מסד נתונים כמו PostgreSQL או Azure SQL, האפליקציה צריכה לקבל תפקיד קריאה בלבד (SELECT).

הרצת האפליקציה בסביבה מאובטחת מחזקת את ההגנה. בתרחישים ארגוניים, הנתונים בדרך כלל מופקים ומומרחים ממערכות תפעוליות למסד נתונים לקריאה בלבד או מחסן נתונים עם סכמת שימוש נוחה. גישה זו מוודאת שהנתונים בטוחים, מותאמים לביצועים ולנגישות, ושהאפליקציה מוגבלת לגישה לקריאה בלבד.

## דוגמאות קוד

- פייתון: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## יש לך שאלות נוספות אודות תבניות העיצוב של שימוש בכלים?

הצטרף ל[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) כדי לפגוש לומדים נוספים, להשתתף בשעות משרד ולקבל תשובות לשאלות בנוגע לסוכני AI.

## משאבים נוספים

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">סדנת שירות סוכני Azure AI</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">סדנת סוכנים מרובי סוכנים Contoso Creative Writer</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">סקירת מסגרת סוכני מיקרוסופט</a>


## בדיקת עשן לסוכן זה (אופציונלי)

לאחר שלמדת לפרוס סוכנים ב-[שיעור 16](../16-deploying-scalable-agents/README.md), תוכל לבצע בדיקת עשן על `TravelToolAgent` של השיעור הזה (האם הוא עדיין מפעיל את הכלים שלו ועונה?) באמצעות [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). עיין ב-[`tests/README.md`](../tests/README.md) כדי ללמוד איך להריץ את זה.

## השיעור הקודם

[הבנת דפוסי עיצוב סוכניים](../03-agentic-design-patterns/README.md)

## השיעור הבא

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->