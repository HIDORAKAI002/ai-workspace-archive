[![اچھی AI ایجنٹس کیسے ڈیزائن کریں](../../../translated_images/ur/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(اس سبق کی ویڈیو دیکھنے کے لیے اوپر تصویر پر کلک کریں)_

# ٹول یوز ڈیزائن پیٹرن

ٹولز دلچسپ ہیں کیونکہ وہ AI ایجنٹس کو وسیع تر صلاحیتوں کی اجازت دیتے ہیں۔ ایجنٹ کے پاس محدود تعداد میں اعمال کرنے کی صلاحیت کے بجائے، ایک ٹول شامل کرکے، ایجنٹ اب وسیع اقسام کے اعمال انجام دے سکتا ہے۔ اس باب میں، ہم ٹول یوز ڈیزائن پیٹرن دیکھیں گے، جو بیان کرتا ہے کہ AI ایجنٹس مخصوص ٹولز کو اپنے مقاصد کے حصول کے لیے کیسے استعمال کر سکتے ہیں۔

## تعارف

اس سبق میں، ہم مندرجہ ذیل سوالات کے جوابات تلاش کر رہے ہیں:

- ٹول یوز ڈیزائن پیٹرن کیا ہے؟
- اسے کن استعمالات پر لاگو کیا جا سکتا ہے؟
- ڈیزائن پیٹرن کو نافذ کرنے کے لیے کون سی عناصر/بلڈنگ بلاکس درکار ہیں؟
- قابل اعتماد AI ایجنٹس بنانے کے لیے ٹول یوز ڈیزائن پیٹرن استعمال کرنے کے خاص پہلو کیا ہیں؟

## سیکھنے کے مقاصد

اس سبق کو مکمل کرنے کے بعد، آپ اس قابل ہوں گے:

- ٹول یوز ڈیزائن پیٹرن اور اس کے مقصد کی تعریف کریں۔
- ایسے استعمال کے معاملات کی نشاندہی کریں جہاں ٹول یوز ڈیزائن پیٹرن قابل اطلاق ہے۔
- ڈیزائن پیٹرن کو نافذ کرنے کے لیے ضروری اہم عناصر کو سمجھیں۔
- اس ڈیزائن پیٹرن کو استعمال کرتے ہوئے AI ایجنٹس میں اعتماد کی ضمانت دینے کے پہلوؤں کو پہچانیں۔

## ٹول یوز ڈیزائن پیٹرن کیا ہے؟

**ٹول یوز ڈیزائن پیٹرن** LLMs کو بیرونی ٹولز کے ساتھ متعامل ہونے کی صلاحیت دینے پر مرکوز ہے تاکہ مخصوص مقاصد حاصل کیے جا سکیں۔ ٹولز وہ کوڈ ہوتے ہیں جو ایجنٹ کی طرف سے اعمال انجام دینے کے لیے چلائے جا سکتے ہیں۔ ایک ٹول ایک سادہ فنکشن ہو سکتا ہے جیسے کیلکولیٹر، یا کوئی تھرڈ پارٹی سروس کے لیے API کال جیسا کہ اسٹاک پرائس دیکھنا یا موسم کی پیش گوئی کرنا۔ AI ایجنٹس کے سیاق و سباق میں، ٹولز کو ماڈل کی طرف سے بنائے گئے فنکشن کالز کے جواب میں چلانے کے لیے ڈیزائن کیا جاتا ہے۔

## کن استعمالات پر لاگو ہو سکتا ہے؟

AI ایجنٹس پیچیدہ کام مکمل کرنے، معلومات حاصل کرنے، یا فیصلے کرنے کے لیے ٹولز کا فائدہ اٹھا سکتے ہیں۔ ٹول یوز ڈیزائن پیٹرن اکثر ایسے حالات میں استعمال ہوتا ہے جہاں بیرونی نظاموں کے ساتھ متحرک تعامل کی ضرورت ہوتی ہے، جیسے ڈیٹا بیسز، ویب سروسز، یا کوڈ انٹر پریٹرز۔ یہ صلاحیت کئی مختلف استعمالات کے لیے مفید ہے، بشمول:

- **متحرک معلومات کی بازیافت:** ایجنٹس بیرونی APIs یا ڈیٹا بیسز سے تازہ ترین ڈیٹا حاصل کر سکتے ہیں (مثلاً، ڈیٹا تجزیہ کے لیے SQLite ڈیٹا بیس سے سوال کرنا، اسٹاک کی قیمتیں یا موسمی معلومات حاصل کرنا)۔
- **کوڈ اجرا اور انٹرپریٹیشن:** ایجنٹس ریاضی کے مسائل حل کرنے، رپورٹس تیار کرنے، یا سمیولیشن کرنے کے لیے کوڈ یا اسکرپٹس چلا سکتے ہیں۔
- **ورک فلو آٹو میشن:** ٹاسک شیڈولرز، ای میل سروسز، یا ڈیٹا پائپ لائنز جیسے ٹولز کو شامل کر کے بار بار یا کثیر مرحلوں والے ورک فلو کو خودکار بنانا۔
- **کسٹمر سپورٹ:** ایجنٹس CRM سسٹمز، ٹکٹنگ پلیٹ فارمز، یا نالج بیسز کے ساتھ بات چیت کر کے صارف کے سوالات کا حل نکال سکتے ہیں۔
- **مواد کی تخلیق اور تدوین:** ایجنٹس گرامر چیکرز، متن کے خلاصے، یا مواد کی حفاظتی جانچ کے ٹولز کا استعمال کر کے مواد بنانے کے کاموں میں مدد دے سکتے ہیں۔

## ٹول یوز ڈیزائن پیٹرن کو نافذ کرنے کے لیے کن عناصر/بلڈنگ بلاکس کی ضرورت ہوتی ہے؟

یہ بلڈنگ بلاکس AI ایجنٹ کو وسیع اقسام کے کام انجام دینے کے قابل بناتے ہیں۔ آئیے دیکھتے ہیں ٹول یوز ڈیزائن پیٹرن کو نافذ کرنے کے لیے کن کلیدی عناصر کی ضرورت ہے:

- **فنکشن/ٹول اسکیمہ**: دستیاب ٹولز کی تفصیلی تعریفیں، جن میں فنکشن کا نام، مقصد، درکار پیرامیٹرز، اور متوقع نتائج شامل ہیں۔ یہ اسکیمہ LLM کو سمجھنے میں مدد دیتا ہے کہ کون سے ٹولز دستیاب ہیں اور درست درخواستیں کیسے بنائیں۔

- **فنکشن ایکزیکیوشن لاجک**: صارف کے ارادے اور بات چیت کے سیاق و سباق کی بنیاد پر ٹولز کب اور کیسے کال کیے جائیں، اس پر حکمرانی کرتا ہے۔ اس میں پلانر ماڈیولز، روٹنگ میکانزمز، یا کنڈیشنل فلو شامل ہو سکتے ہیں جو ٹول کے استعمال کو متحرک طور پر طے کرتے ہیں۔

- **میسج ہینڈلنگ سسٹم**: وہ کمپونینٹس جو صارف کی ان پٹس، LLM کے جوابات، ٹول کالز، اور ٹول آؤٹ پٹ کے درمیان بات چیت کو سنبھالتے ہیں۔

- **ٹول انٹیگریشن فریم ورک**: وہ انفراسٹرکچر جو ایجنٹ کو مختلف ٹولز سے جوڑتا ہے، چاہے وہ سادہ فنکشن ہوں یا پیچیدہ بیرونی سروسز۔

- **ایرر ہینڈلنگ اور ویلیڈیشن**: ٹول چلانے میں ناکامیوں کو سنبھالنے، پیرامیٹرز کی جانچ کرنے، اور غیر متوقع جوابات کو منظم کرنے کے میکانزم۔

- **اسٹیٹ مینجمنٹ**: بات چیت کے سیاق و سباق، پچھلی ٹول تعاملات، اور مستقل ڈیٹا کو ٹریک کرتا ہے تاکہ متعدد مرحلوں والی بات چیت کے دوران تسلسل برقرار رہے۔

اب، آئیے فنکشن/ٹول کالنگ کو مزید تفصیل سے دیکھتے ہیں۔
 
### فنکشن/ٹول کالنگ

فنکشن کالنگ وہ بنیادی طریقہ ہے جس سے ہم بڑے زبان کے ماڈلز (LLMs) کو ٹولز کے ساتھ بات چیت کرنے کے قابل بناتے ہیں۔ آپ اکثر 'فنکشن' اور 'ٹول' کو باری باری استعمال ہوتے دیکھیں گے کیونکہ 'فنکشنز' (دوبارہ قابل استعمال کوڈ کے بلاکس) وہ 'ٹولز' ہیں جنہیں ایجنٹس کام انجام دینے کے لیے استعمال کرتے ہیں۔ کسی فنکشن کے کوڈ کو چلانے کے لیے، LLM کو صارف کی درخواست کو فنکشن کی تفصیل کے ساتھ موازنہ کرنا ہوتا ہے۔ یہ کام کرنے کے لیے، ایک اسکیمہ جس میں تمام دستیاب فنکشنز کی تفصیلات ہوتی ہیں، LLM کو بھیجا جاتا ہے۔ LLM پھر سب سے مناسب فنکشن منتخب کر کے اس کا نام اور دلائل واپس کرتا ہے۔ منتخب فنکشن چلایا جاتا ہے، اس کا جواب LLM کو بھیجا جاتا ہے، جو صارف کی درخواست کا جواب دینے کے لیے اس معلومات کا استعمال کرتا ہے۔

ڈویلپرز کے لیے ایجنٹس کے لیے فنکشن کالنگ نافذ کرنے کے لیے آپ کو چاہیے ہوگا:

1. ایک ایسا LLM ماڈل جو فنکشن کالنگ کو سپورٹ کرتا ہو
2. فنکشن کی تفصیلات پر مشتمل اسکیمہ
3. ہر بیان شدہ فنکشن کے لیے کوڈ

آئیے سان فرانسسکو میں موجودہ وقت معلوم کرنے کی مثال استعمال کریں تاکہ وضاحت ہو سکے:

1. **ایک فنکشن کالنگ کو سپورٹ کرنے والا LLM شروع کریں:**

    تمام ماڈلز فنکشن کالنگ کو سپورٹ نہیں کرتے، لہذا یہ یقینی بنانا ضروری ہے کہ آپ جو LLM استعمال کر رہے ہیں وہ کرتا ہے۔     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> فنکشن کالنگ کی حمایت کرتا ہے۔ ہم Azure OpenAI کے خلاف OpenAI کلائنٹ شروع کر سکتے ہیں **Responses API** کے ذریعے (مستحکم `/openai/v1/` اینڈ پوائنٹ — کسی `api_version` کی ضرورت نہیں)۔

    ```python
    # آزور اوپن ای آئی کے لیے اوپن ای آئی کلائنٹ کو انیشیئلائز کریں (Responses API، v1 اینڈپوائنٹ)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **فنکشن اسکیمہ بنائیں**:

    اگلا ہم ایک JSON اسکیمہ تعریف کریں گے جس میں فنکشن کا نام، فنکشن کیا کرتا ہے کی وضاحت، اور فنکشن کے پیرامیٹرز کے نام اور وضاحتیں شامل ہوں گی۔
    پھر ہم اس اسکیمہ کو کلائنٹ کو بھیجیں گے جو پہلے بنایا گیا، ساتھ ہی صارف کی درخواست بھیجیں گے کہ سان فرانسسکو کا وقت معلوم کیا جائے۔ قابل غور بات یہ ہے کہ جو واپس آتا ہے وہ **ٹول کال** ہوتا ہے، سوال کا حتمی جواب نہیں۔ جیسا کہ پہلے ذکر کیا گیا، LLM اس فنکشن کا نام واپس کرتا ہے جسے اس نے کام کے لیے منتخب کیا ہے، اور وہ دلائل جو اس کو دیے جائیں گے۔

    ```python
    # ماڈل کے پڑھنے کے لیے فنکشن کی وضاحت (Responses API فلیٹ ٹول فارمیٹ)
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
  
    # ابتدائی صارف کا پیغام
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # پہلی API کال: ماڈل سے کہیں کہ فنکشن استعمال کرے
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API ٹول کالز کو function_call اشیاء کی صورت میں response.output میں واپس کرتا ہے۔
    # انہیں بات چیت میں شامل کریں تاکہ ماڈل کو اگلے مرحلے پر مکمل سیاق و سباق ملے۔
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **کام انجام دینے کے لیے درکار فنکشن کوڈ:**

    اب جب LLM نے منتخب کر لیا ہے کہ کون سا فنکشن چلایا جائے گا، تو اس کام کو انجام دینے کے لیے کوڈ کو نافذ اور چلانا ہوگا۔
    ہم Python میں موجودہ وقت حاصل کرنے کا کوڈ نافذ کر سکتے ہیں۔ ہمیں یہ بھی کوڈ لکھنا ہوگا جو response_message سے نام اور دلائل نکالے تاکہ حتمی نتیجہ ملے۔

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
    # فنکشن کالز کو ہینڈل کریں
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # ٹول کے نتیجے کو function_call_output آئٹم کے طور پر واپس کریں
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # دوسرا API کال: ماڈل سے حتمی جواب حاصل کریں
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

فنکشن کالنگ زیادہ تر، اگر تمام نہیں تو، ایجنٹ ٹول یوز ڈیزائن کا دل ہے، تاہم اسے صفر سے نافذ کرنا کبھی کبھار چیلنج ہو سکتا ہے۔
جیسا کہ ہم نے [سبق 2](../../../02-explore-agentic-frameworks) میں سیکھا، ایجنٹک فریم ورکس ہمیں پہلے سے بنے ہوئے بلڈنگ بلاکس فراہم کرتے ہیں تاکہ ٹول یوز کو نافذ کیا جا سکے۔
 
## ایجنٹک فریم ورکس کے ساتھ ٹول یوز کی مثالیں

یہاں کچھ مثالیں ہیں کہ آپ مختلف ایجنٹک فریم ورکس کا استعمال کرتے ہوئے ٹول یوز ڈیزائن پیٹرن کیسے نافذ کر سکتے ہیں:

### مائیکروسافٹ ایجنٹ فریم ورک

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">مائیکروسافٹ ایجنٹ فریم ورک</a> AI ایجنٹس بنانے کے لیے ایک اوپن سورس فریم ورک ہے۔ یہ فنکشن کالنگ کے عمل کو آسان بناتا ہے کیونکہ آپ ٹولز کو Python فنکشنز کے طور پر `@tool` ڈیکوریٹر کے ساتھ تعریف کر سکتے ہیں۔ فریم ورک ماڈل اور آپ کے کوڈ کے درمیان بات چیت کو سنبھالتا ہے۔ یہ `FoundryChatClient` کے ذریعے پہلے سے تیار شدہ ٹولز جیسے فائل سرچ اور کوڈ انٹرپریٹر تک رسائی بھی فراہم کرتا ہے۔

درج ذیل گرافک مائیکروسافٹ ایجنٹ فریم ورک کے ساتھ فنکشن کالنگ کے عمل کی وضاحت کرتی ہے:

![فنکشن کالنگ](../../../translated_images/ur/functioncalling-diagram.a84006fc287f6014.webp)

مائیکروسافٹ ایجنٹ فریم ورک میں، ٹولز ڈیکوریٹڈ فنکشنز کے طور پر تعریف کیے جاتے ہیں۔ ہم پہلے دیکھی گئی `get_current_time` فنکشن کو `@tool` ڈیکوریٹر استعمال کرکے ایک ٹول میں تبدیل کر سکتے ہیں۔ فریم ورک خود بخود فنکشن اور اس کے پیرامیٹرز کو سیریلائز کرے گا، اور LLM کو بھیجنے کے لیے اسکیمہ بنائے گا۔

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# کلائنٹ بنائیں
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# ایک ایجنٹ بنائیں اور ٹول کے ساتھ چلائیں
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### مائیکروسافٹ فاؤنڈری ایجنٹ سروس

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">مائیکروسافٹ فاؤنڈری ایجنٹ سروس</a> ایک جدید ایجنٹک فریم ورک ہے جو ڈویلپرز کو محفوظ طریقے سے اعلی معیار کے اور توسیع پذیر AI ایجنٹس بنانے، تعینات کرنے، اور اسکیل کرنے کی صلاحیت فراہم کرتا ہے بغیر بنیادی کمپیوٹ اور اسٹوریج وسائل کا انتظام کرنے کی ضرورت کے۔ یہ خاص طور پر ادارہ جاتی ایپلیکیشنز کے لیے مفید ہے کیونکہ یہ ایک مکمل طور پر منظم سروس ہے جس میں ادارہ جاتی معیار کی سیکیورٹی ہوتی ہے۔

LLM API کے ساتھ براہ راست ترقی کے مقابلے میں، مائیکروسافٹ فاؤنڈری ایجنٹ سروس کچھ فوائد فراہم کرتی ہے، جن میں شامل ہیں:

- خودکار ٹول کالنگ – ٹول کال دیکھنے، ٹول چلانے، اور جواب سنبھالنے کی ضرورت نہیں؛ یہ سب کچھ سرور سائڈ پر ہوتا ہے
- محفوظ طریقے سے منظم ڈیٹا – اپنی بات چیت کی حالت کو خود منظم کرنے کی بجائے، آپ تمام مطلوبہ معلومات ذخیرہ کرنے کے لیے تھریڈز پر انحصار کر سکتے ہیں
- تیار شدہ ٹولز – ایسے ٹولز جو آپ کو اپنے ڈیٹا ذرائع کے ساتھ رابطہ کرنے دیتے ہیں، جیسے Bing، Azure AI Search، اور Azure Functions۔

مائیکروسافٹ فاؤنڈری ایجنٹ سروس میں دستیاب ٹولز کو دو زمروں میں تقسیم کیا جا سکتا ہے:

1. نالج ٹولز:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing سرچ کے ساتھ گراؤنڈنگ</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">فائل سرچ</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI سرچ</a>

2. ایکشن ٹولز:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">فنکشن کالنگ</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">کوڈ انٹرپریٹر</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI تعریف شدہ ٹولز</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

ایجنٹ سروس ہمیں ان ٹولز کو بطور `toolset` استعمال کرنے کی اجازت دیتی ہے۔ یہ `threads` کا بھی استعمال کرتی ہے جو ایک مخصوص گفتگو کے پیغامات کی تاریخ کو ٹریک کرتے ہیں۔

تصور کریں کہ آپ Contoso نامی کمپنی میں ایک سیلز ایجنٹ ہیں۔ آپ ایک ایسا مکالماتی ایجنٹ بنانا چاہتے ہیں جو آپ کے سیلز ڈیٹا کے بارے میں سوالات کے جواب دے سکے۔

درج ذیل تصویر دکھاتی ہے کہ آپ مائیکروسافٹ فاؤنڈری ایجنٹ سروس کو استعمال کرتے ہوئے اپنے سیلز ڈیٹا کا تجزیہ کیسے کر سکتے ہیں:

![ایجنٹک سروس عملی طور پر](../../../translated_images/ur/agent-service-in-action.34fb465c9a84659e.webp)

ان ٹولز میں سے کسی کو استعمال کرنے کے لیے، ہم ایک کلائنٹ بنا سکتے ہیں اور ایک ٹول یا ٹول سیٹ کی تعریف کر سکتے ہیں۔ عملی نفاذ کے لیے ہم یہ Python کوڈ استعمال کر سکتے ہیں۔ LLM ٹول سیٹ کو دیکھ کر فیصلہ کرے گا کہ صارف کی درخواست کے مطابق صارف کے بنائے گئے فنکشن `fetch_sales_data_using_sqlite_query` یا پہلے سے بنا ہوا کوڈ انٹرپریٹر استعمال کیا جائے۔

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query فنکشن جو fetch_sales_data_functions.py فائل میں مل سکتا ہے۔
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# ٹول سیٹ کو شروع کریں
toolset = ToolSet()

# فنکشن کال کرنے والے ایجنٹ کو fetch_sales_data_using_sqlite_query فنکشن کے ساتھ شروع کریں اور اسے ٹول سیٹ میں شامل کریں
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# کوڈ انٹرپریٹر ٹول کو شروع کریں اور اسے ٹول سیٹ میں شامل کریں۔
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## قابل اعتماد AI ایجنٹس بنانے کے لیے ٹول یوز ڈیزائن پیٹرن استعمال کرنے کے خاص پہلو کیا ہیں؟

LLMs کی طرف سے متحرک طور پر پیدا ہونے والے SQL کے بارے میں ایک عام تشویش سیکورٹی ہے، خاص طور پر SQL انجیکشن یا نقصان دہ اعمال کے خطرے جیسے کہ ڈیٹا بیس کو نقصان پہنچانا یا اس میں چھیڑ چھاڑ کرنا۔ اگرچہ یہ خدشات جائز ہیں، لیکن انہیں ڈیٹا بیس کے رسائی اجازتوں کو مناسب طریقے سے ترتیب دے کر مؤثر طریقے سے کم کیا جا سکتا ہے۔ زیادہ تر ڈیٹا بیسز کے لیے اس کا مطلب ہے کہ ڈیٹا بیس کو صرف پڑھنے کے قابل (read-only) ترتیب دیا جائے۔ PostgreSQL یا Azure SQL جیسی ڈیٹا بیس سروسز کے لیے، ایپ کو صرف پڑھنے کے (SELECT) رول تفویض کیا جانا چاہیے۔

ایپ کو محفوظ ماحول میں چلانا مزید تحفظ فراہم کرتا ہے۔ ادارہ جاتی حالات میں، ڈیٹا عام طور پر عملیاتی نظاموں سے نکال کر پڑھنے کے قابل ڈیٹا بیس یا ڈیٹا ویئرہاؤس میں منتقل کیا جاتا ہے جس میں صارف دوست اسکیمہ ہوتا ہے۔ یہ طریقہ کار یقینی بناتا ہے کہ ڈیٹا محفوظ، کارکردگی اور رسائی کے لیے بہتر ہے، اور ایپ کو محدود، صرف پڑھنے کی رسائی حاصل ہے۔

## نمونہ کوڈز

- Python: [ایجنٹ فریم ورک](./code_samples/04-python-agent-framework.ipynb)
- .NET: [ایجنٹ فریم ورک](./code_samples/04-dotnet-agent-framework.md)

## ٹول یوز ڈیزائن پیٹرن کے بارے میں مزید سوالات ہیں؟

دوسرے سیکھنے والوں سے ملنے، آفیس آورز میں شرکت کرنے اور اپنے AI ایجنٹس کے سوالات کا جواب پانے کے لیے [مائیکروسافٹ فاؤنڈری ڈسکارڈ](https://discord.com/invite/ATgtXmAS5D) میں شامل ہوں۔

## اضافی وسائل

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI ایجنٹس سروس ورکشاپ</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer ملٹی-ایجنٹ ورکشاپ</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">مائیکروسافٹ ایجنٹ فریم ورک کا جائزہ</a>


## اس ایجنٹ کا سمُوک ٹیسٹنگ (اختیاری)

جب آپ [سبق 16](../16-deploying-scalable-agents/README.md) میں ایجنٹ تعینات کرنا سیکھ لیں، تو آپ اس سبق کے `TravelToolAgent` کو سمُوک ٹیسٹ کر سکتے ہیں (کیا یہ اب بھی اپنے ٹولز کو کال کرتا ہے اور جواب دیتا ہے؟) [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) کے ساتھ۔ اسے چلانے کے طریقہ کے لیے [`tests/README.md`](../tests/README.md) دیکھیں۔

## پچھلا سبق

[ایجینٹک ڈیزائن پیٹرنز کو سمجھنا](../03-agentic-design-patterns/README.md)

## اگلا سبق

[ایجینٹک RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->