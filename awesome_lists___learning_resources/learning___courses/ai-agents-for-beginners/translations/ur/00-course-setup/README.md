# کورس سیٹ اپ  

## تعارف  

یہ سبق اس بات کا احاطہ کرے گا کہ اس کورس کے کوڈ نمونوں کو کیسے چلایا جائے۔  

## دوسرے سیکھنے والوں میں شامل ہوں اور مدد حاصل کریں  

اپنے ریپو کو کلون کرنے سے پہلے، سیٹ اپ میں مدد، کورس کے بارے میں سوالات، یا دوسرے سیکھنے والوں سے رابطہ کرنے کے لیے [AI Agents For Beginners Discord چینل](https://aka.ms/ai-agents/discord) میں شامل ہوں۔  

## اس ریپو کو کلون یا فورک کریں  

شروع کرنے کے لیے، براہ کرم GitHub ریپوزٹری کو کلون یا فورک کریں۔ اس سے آپ کو کورس کے مواد کا اپنا ورژن مل جائے گا تاکہ آپ کوڈ کو چلا، جانچ اور تبدیل کر سکیں!  

یہ <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">ریپو کو فورک کرنے</a> کے لنک پر کلک کر کے کیا جا سکتا ہے۔  

اب آپ کے پاس اس کورس کا اپنا فورک کیا ہوا ورژن اس درج ذیل لنک پر ہونا چاہیے:  

![Forked Repo](../../../translated_images/ur/forked-repo.33f27ca1901baa6a.webp)  

### شالو کلون (ورکشاپ / کوڈ اسپیسز کے لیے سفارش کی گئی)  

> جب آپ مکمل ہسٹری اور تمام فائلیں ڈاؤن لوڈ کرتے ہیں تو پورا ریپوزٹری بڑا ہو سکتا ہے (~3 GB)۔ اگر آپ صرف ورکشاپ میں شرکت کر رہے ہیں یا صرف چند سبق فولڈرز کی ضرورت ہے، شالو کلون (یا اسپارس کلون) تاریخ کو مختصر کر کے اور/یا بلابز کو چھوڑ کر زیادہ تر ڈاؤن لوڈ سے بچاتا ہے۔  

#### فوری شالو کلون — کم سے کم ہسٹری، تمام فائلیں  

نیچے دیئے گئے کمانڈز میں `<your-username>` کو اپنے فورک کے URL (یا اپ اسٹریم URL اگر آپ ترجیح دیتے ہیں) سے تبدیل کریں۔  

صرف تازہ ترین کمیٹ ہسٹری کلون کرنے کے لیے (چھوٹا ڈاؤن لوڈ):  

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```
  
کسی مخصوص برانچ کو کلون کرنے کے لیے:  

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```
  
#### جزوی (اسپارس) کلون — کم از کم بلابز + صرف منتخب فولڈرز  

یہ جزوی کلون اور اسپارس چیک آؤٹ استعمال کرتا ہے (Git 2.25+ کی ضرورت ہے اور سفارش کی جاتی ہے کہ جدید Git جزوی کلون کی حمایت کے ساتھ ہو):  

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```
  
ریپو فولڈر میں جائیں:  

```bash|powershell
cd ai-agents-for-beginners
```
  
پھر بتائیں کہ آپ کون سے فولڈرز چاہتے ہیں (ذیل میں مثال میں دو فولڈرز دکھائے گئے ہیں):  

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```
  
کلون کرنے اور فائلز کی تصدیق کے بعد، اگر آپ کو صرف فائلیں چاہیے اور آپ جگہ خالی کرنا چاہتے ہیں (کوئی git ہسٹری نہیں)، تو براہ کرم ریپوزٹری میٹا ڈیٹا کو حذف کر دیں (💀 ناقابل واپسی — آپ تمام Git فعالیت کھو دیں گے: کوئی کمیٹ، پل، پوش، یا ہسٹری تک رسائی نہیں ہوگی)۔  

```bash
# زی ش/باش
rm -rf .git
```
  
```powershell
# پاور شیل
Remove-Item -Recurse -Force .git
```
  
#### GitHub Codespaces کا استعمال (مقامی بڑے ڈاؤن لوڈ سے بچنے کے لیے سفارش کی جاتی ہے)  

- اس ریپو کے لیے [GitHub UI](https://github.com/codespaces) کے ذریعے نیا Codespace بنائیں۔  

- نۓ بنائے ہوئے Codespace کے ٹرمینل میں، اوپر دی گئی شالو/اسپارس کلون کمانڈز میں سے ایک چلائیں تاکہ صرف آپ کے مطلوبہ سبق فولڈرز Codespace ورک اسپیس میں آئیں۔  
- اختیاری: Codespaces کے اندر کلون کرنے کے بعد، اضافی جگہ خالی کرنے کے لیے .git کو حذف کریں (اوپر حذف کرنے کے کمانڈ دیکھیں)۔  
- نوٹ: اگر آپ ریپو کو براہ راست Codespaces میں کھولنا چاہتے ہیں (اضافی کلون کے بغیر)، تو جانیں کہ Codespaces ڈیولپمنٹ کنٹینر ماحول ترتیب دیتا ہے اور ممکنہ طور پر آپ کی ضرورت سے زیادہ کچھ مہیا کر سکتا ہے۔ ایک تازہ Codespace میں شالو کلون کاپی آپ کو ڈسک کی استعمال پر زیادہ کنٹرول دیتی ہے۔  

#### ٹپس  

- اگر آپ ترمیم یا کمیٹ کرنا چاہتے ہیں تو ہمیشہ کلون URL کو اپنے فورک سے تبدیل کریں۔  
- اگر آپ کو بعد میں مزید ہسٹری یا فائلز کی ضرورت ہو تو آپ انہیں فیچ کر سکتے ہیں یا اسپارس چیک آؤٹ کو مزید فولڈرز شامل کرنے کے لیے ایڈجسٹ کر سکتے ہیں۔  

## کوڈ چلانا  

یہ کورس Jupyter Notebooks کا ایک سلسلہ پیش کرتا ہے جسے آپ تجرباتی طور پر چلا سکتے ہیں تاکہ AI ایجنٹس بنانے کا عملی تجربہ حاصل ہو۔  

کوڈ سیمپلز میں **Microsoft Agent Framework (MAF)** استعمال ہوتا ہے جس میں `FoundryChatClient` شامل ہے، جو **Microsoft Foundry Agent Service V2** (Responses API) کے ذریعے **Microsoft Foundry** سے جڑتا ہے۔  

تمام Python نوٹ بکس `*-python-agent-framework.ipynb` کے طور پر لیبل کی گئی ہیں۔  

## ضروریات  

- Python 3.12+  
  - **نوٹ**: اگر آپ کے پاس Python3.12 انسٹال نہیں ہے تو اسے انسٹال کرنا یقینی بنائیں۔ پھر python3.12 استعمال کرتے ہوئے اپنا venv بنائیں تاکہ requirements.txt فائل سے درست ورژن انسٹال ہوں۔  
  
    >مثال  

    Python venv ڈائریکٹری بنائیں:  

    ```bash|powershell
    python -m venv venv
    ```
  
    پھر venv انوائرنمنٹ کو فعال کریں:  

    ```bash
    # زش/باش
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```
  
- .NET 10+: اگر سیمپل کوڈز میں .NET استعمال ہو رہا ہو، تو یقینی بنائیں کہ [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) یا اس سے بعد کا ورژن انسٹال ہو۔ پھر اپنا انسٹال شدہ .NET SDK ورژن چیک کریں:  

    ```bash|powershell
    dotnet --list-sdks
    ```
  
- **Azure CLI** — تصدیق کے لیے ضروری ہے۔ اسے [aka.ms/installazurecli](https://aka.ms/installazurecli) سے انسٹال کریں۔  
- **Azure Subscription** — Microsoft Foundry اور Microsoft Foundry Agent Service تک رسائی کے لیے۔  
- **Microsoft Foundry Project** — ایک پروجیکٹ جس میں ایک تعینات ماڈل ہو (مثلاً `gpt-4.1-mini`)۔ دیکھیں [Step 1](#مرحلہ-1-microsoft-foundry-پروجیکٹ-بنائیں) ذیل میں۔  

ہم نے اس ریپوزٹری کی روٹ میں `requirements.txt` فائل شامل کی ہے جس میں وہ تمام ضروری Python پیکجز ہیں جو کوڈ نمونوں کو چلانے کے لیے درکار ہیں۔  

آپ انہیں ریپوزٹری کی روٹ میں ٹرمینل پر نیچے دیا گیا کمانڈ چلا کر انسٹال کر سکتے ہیں:  

```bash|powershell
pip install -r requirements.txt
```
  
ہم سفارش کرتے ہیں کہ ممکنہ تصادم اور مسائل سے بچنے کے لیے Python ورچوئل انوائرنمنٹ بنائیں۔  

## VSCode سیٹ اپ کریں  

یقینی بنائیں کہ آپ VSCode میں صحیح Python ورژن استعمال کر رہے ہیں۔  

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)  

## Microsoft Foundry اور Microsoft Foundry Agent Service سیٹ اپ کریں  

### مرحلہ 1: Microsoft Foundry پروجیکٹ بنائیں  

آپ کو نوٹ بکس چلانے کے لیے ایک Microsoft Foundry **ہب** اور **پروجیکٹ** کی ضرورت ہے جس میں ایک تعینات ماڈل ہو۔  

1. [ai.azure.com](https://ai.azure.com) پر جائیں اور اپنے Azure اکاؤنٹ سے سائن ان کریں۔  
2. ایک **ہب** بنائیں (یا کسی موجودہ کا استعمال کریں)۔ دیکھیں: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)۔  
3. ہب کے اندر ایک **پروجیکٹ** بنائیں۔  
4. **Models + Endpoints** → **Deploy model** سے ایک ماڈل (مثال کے طور پر `gpt-4.1-mini`) تعینات کریں۔  

### مرحلہ 2: اپنے پروجیکٹ کا اینڈپوائنٹ اور ماڈل تعیناتی کا نام حاصل کریں  

Microsoft Foundry پورٹل میں اپنے پروجیکٹ سے:  

- **Project Endpoint** — **Overview** صفحے پر جائیں اور اینڈپوائنٹ URL کی کاپی کریں۔  

![Project Connection String](../../../translated_images/ur/project-endpoint.8cf04c9975bbfbf1.webp)  

- **Model Deployment Name** — **Models + Endpoints** پر جائیں، اپنے تعینات ماڈل کو منتخب کریں، اور **Deployment name** نوٹ کریں (جیسے `gpt-4.1-mini`)۔  

### مرحلہ 3: `az login` کے ذریعے Azure میں سائن ان کریں  

تمام نوٹ بکس تصدیق کے لیے **`AzureCliCredential`** استعمال کرتے ہیں — کوئی API کیز کی ضرورت نہیں۔ اس کے لیے آپ Azure CLI کے ذریعے سائن ان ہوں۔  

1. اگر آپ نے Azure CLI انسٹال نہیں کی تو انسٹال کریں: [aka.ms/installazurecli](https://aka.ms/installazurecli)  

2. درج ذیل کمانڈ چلائیں:  

    ```bash|powershell
    az login
    ```
  
    اگر آپ ریموٹ/Codespace ماحول میں ہیں بغیر براؤزر کے:  

    ```bash|powershell
    az login --use-device-code
    ```
  
3. اگر پرامپٹ ہو تو اپنی سبسکرپشن منتخب کریں — وہ جس میں آپ کا Foundry پروجیکٹ شامل ہو۔  

4. تصدیق کریں کہ آپ سائن ان ہیں:  

    ```bash|powershell
    az account show
    ```
  
> **`az login` کیوں؟** نوٹ بکس `azure-identity` پیکیج کے ذریعے `AzureCliCredential` استعمال کرتے ہوئے تصدیق کرتے ہیں۔ اس کا مطلب ہے کہ آپ کا Azure CLI سیشن اسناد فراہم کرتا ہے — کوئی API کیز یا راز `.env` فائل میں نہیں ہوتے۔ یہ ایک [سیکیورٹی کی بہترین مشق](https://learn.microsoft.com/azure/developer/ai/keyless-connections) ہے۔  

### مرحلہ 4: اپنی `.env` فائل بنائیں  

نمونہ فائل کو کاپی کریں:  

```bash
# زی ش / باش
cp .env.example .env
```
  
```powershell
# پاور شیل
Copy-Item .env.example .env
```
  
`.env` کھولیں اور یہ دو اقدار درج کریں:  

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```
  
| ویری ایبل | کہاں ملے گا |  
|----------|--------------|  
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry پورٹل → آپ کا پروجیکٹ → **Overview** صفحہ |  
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry پورٹل → **Models + Endpoints** → آپ کے تعینات ماڈل کا نام |  

زیادہ تر اسباق کے لیے بس اتنا کافی ہے! نوٹ بکس خودکار طور پر آپ کے `az login` سیشن کے ذریعے تصدیق کر لیں گی۔  

### مرحلہ 5: Python Dependencies انسٹال کریں  

```bash|powershell
pip install -r requirements.txt
```
  
ہم سفارش کرتے ہیں کہ آپ اسے پہلے بنائی گئی ورچوئل انوائرنمنٹ کے اندر چلائیں۔  

## سبق 5 کے اضافی سیٹ اپ (Agentic RAG)  

سبق 5 میں **Azure AI Search** ریٹریول آگمینٹڈ جنریشن کے لیے استعمال ہوتا ہے۔ اگر آپ وہ سبق چلانے کا ارادہ رکھتے ہیں، تو اپنی `.env` فائل میں یہ ویری ایبلز شامل کریں:  

| ویری ایبل | کہاں ملے گا |  
|----------|--------------|  
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure پورٹل → آپ کا **Azure AI Search** ریسورس → **Overview** → URL |  
| `AZURE_SEARCH_API_KEY` | Azure پورٹل → آپ کا **Azure AI Search** ریسورس → **Settings** → **Keys** → پرائمری ایڈمن کی |  

## ان اسباق کے لیے اضافی سیٹ اپ جو Azure OpenAI کو براہ راست کال کرتے ہیں (سبق 6 اور 8)  

سبق 6 اور 8 کے کچھ نوٹ بکس **Azure OpenAI** کو براہ راست (Responses API استعمال کرتے ہوئے) کال کرتے ہیں، بجائے Microsoft Foundry پروجیکٹ کے۔ یہ نمونے پہلے GitHub Models استعمال کرتے تھے، جو اب بند کیے جا رہے ہیں (جولائی 2026 میں ریٹائر ہو رہا ہے) اور Responses API کی حمایت نہیں کرتے۔ اگر آپ ان نمونوں کو چلانے کا ارادہ رکھتے ہیں، تو اپنی `.env` فائل میں یہ ویری ایبلز شامل کریں:  

| ویری ایبل | کہاں ملے گا |  
|----------|--------------|  
| `AZURE_OPENAI_ENDPOINT` | Azure پورٹل → آپ کا **Azure OpenAI** ریسورس → **Keys and Endpoint** → اینڈپوائنٹ (مثلاً `https://<your-resource>.openai.azure.com`) |  
| `AZURE_OPENAI_DEPLOYMENT` | آپ کے تعینات ماڈل کا نام (مثلاً `gpt-4.1-mini`) جو Responses API کو سپورٹ کرتا ہو |  
| `AZURE_OPENAI_API_KEY` | اختیاری — صرف اگر آپ کی-بیسڈ آتھ استعمال کرتے ہیں بجائے `az login` / Entra ID کے |  

> Responses API مستحکم `/openai/v1/` اینڈپوائنٹ استعمال کرتا ہے، لہٰذا `api-version` کی ضرورت نہیں۔ بغیر کی کے Entra ID آتھ کے لیے `az login` سے سائن ان کریں۔  

## متبادل پرووائیڈر: MiniMax (OpenAI سے ہم آہنگ)  

[MiniMax](https://platform.minimaxi.com/) بڑی کانٹیکسٹ ماڈلز (204K ٹوکنز تک) OpenAI-ہم آہنگ API کے ذریعے فراہم کرتا ہے۔ چونکہ Microsoft Agent Framework کا `OpenAIChatClient` کسی بھی OpenAI-ہم آہنگ اینڈپوائنٹ کے ساتھ کام کرتا ہے، آپ MiniMax کو Azure OpenAI یا OpenAI کا متبادل کے طور پر استعمال کر سکتے ہیں۔  

اپنی `.env` فائل میں یہ ویری ایبلز شامل کریں:  

| ویری ایبل | کہاں ملے گا |  
|----------|--------------|  
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |  
| `MINIMAX_BASE_URL` | `https://api.minimax.io/v1` استعمال کریں (ڈیفالٹ ویلیو) |  
| `MINIMAX_MODEL_ID` | استعمال کے لیے ماڈل کا نام (مثلاً `MiniMax-M3`) |  

**مثال کے طور پر ماڈلز**: `MiniMax-M3` (سفارش شدہ)، `MiniMax-M2.7`، `MiniMax-M2.7-highspeed` (تیز تر جوابات)۔ ماڈلز کے نام اور دستیابی وقت کے ساتھ بدل سکتے ہیں، اور کسی ماڈل تک رسائی آپ کے اکاؤنٹ یا علاقے پر منحصر ہو سکتی ہے — موجودہ فہرست کے لیے [MiniMax Platform](https://platform.minimaxi.com/) دیکھیں۔ اگر `MiniMax-M3` آپ کے اکاؤنٹ کے لیے دستیاب نہیں ہے، تو `MINIMAX_MODEL_ID` کو اس ماڈل سے سیٹ کریں جس کی آپ کو رسائی ہو (مثلاً `MiniMax-M2.7`)۔  

جو کوڈ سیمپلز `OpenAIChatClient` استعمال کرتے ہیں (مثلاً سبق 14 ہوٹل بکنگ ورک فلو) جب `MINIMAX_API_KEY` سیٹ ہو گا تو خود بخود آپ کی MiniMax کنفیگریشن کو پہچان کر استعمال کریں گے۔  

## متبادل پرووائیڈر: Foundry Local (ڈیواس پر ماڈلز چلائیں)  

[Foundry Local](https://foundrylocal.ai) ایک ہلکا پھلکا رن ٹائم ہے جو زبان کے ماڈلز کو **آپ کے اپنے کمپیوٹر پر مکمل طور پر** ڈاؤن لوڈ، منیج، اور فراہم کرتا ہے OpenAI-ہم آہنگ API کے ذریعے — کوئی کلاؤڈ، کوئی Azure سبسکرپشن، اور کوئی API کیز نہیں۔ یہ آف لائن ڈیولپمنٹ، بغیر کلاؤڈ خرچے کے تجربہ کرنے، یا ڈیٹا کو اپنے آلے پر رکھنے کے لیے بہترین ہے۔  

چونکہ Microsoft Agent Framework کا `OpenAIChatClient` کسی بھی OpenAI-ہم آہنگ اینڈپوائنٹ کے ساتھ کام کرتا ہے، Foundry Local Azure OpenAI کا مقامی متبادل ہے۔  

**1. Foundry Local انسٹال کریں**  

```bash
# ونڈوز
winget install Microsoft.FoundryLocal

# میک او ایس
brew install foundrylocal
```
  
**2. ماڈل ڈاؤن لوڈ کریں اور چلائیں** (یہ مقامی سروس بھی شروع کر دے گا):  

```bash
foundry model list          # دستیاب ماڈلز دیکھیں
foundry model run phi-4-mini
```
  
**3. Python SDK انسٹال کریں** جو مقامی اینڈپوائنٹ کو دریافت کرنے کے لیے استعمال ہوتا ہے:  

```bash
pip install foundry-local-sdk
```
  
**4. Microsoft Agent Framework کو اپنے مقامی ماڈل کی طرف اشارہ کریں:**  

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# ماڈل کو (اگر ضرورت ہو تو) ڈاؤن لوڈ کرتا ہے اور مقامی طور پر فراہم کرتا ہے، پھر اینڈ پوائنٹ/پورٹ کو تلاش کرتا ہے۔
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # مثلاً http://localhost:<port>/v1
    api_key=manager.api_key,        # Foundry Local کے لیے ہمیشہ "ضرورت نہیں"
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```
  
> **نوٹ:** Foundry Local OpenAI-ہم آہنگ **Chat Completions** اینڈپوائنٹ فراہم کرتا ہے۔ اسے مقامی ڈیولپمنٹ اور آف لائن حالات کے لیے استعمال کریں۔ مکمل **Responses API** خصوصیات (حالت دار گفتگو، گہری ٹول آرکیسٹریشن، اور ایجنٹ طرز کی ترقی) کے لیے، Azure OpenAI یا Microsoft Foundry پروجیکٹ کا استعمال کریں جیسا کہ اسباق میں دکھایا گیا ہے۔ موجودہ ماڈل کیٹلاگ اور پلیٹ فارم سپورٹ کے لیے [Foundry Local دستاویزات](https://foundrylocal.ai) دیکھیں۔  


## سبق 8 کے لیے اضافی ترتیبات (بنگ گراؤنڈنگ ورک فلو)

سبق 8 میں کنڈیشنل ورک فلو نوٹ بک **بنگ گراؤنڈنگ** کا استعمال کرتی ہے جو Microsoft Foundry کے ذریعے ہے۔ اگر آپ اس نمونے کو چلانے کا ارادہ رکھتے ہیں تو اپنی `.env` فائل میں یہ ویری ایبل شامل کریں:

| ویری ایبل | کہاں سے تلاش کریں |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry پورٹل → آپ کا پروجیکٹ → **Management** → **Connected resources** → آپ کا Bing کنکشن → کنکشن ID کو کاپی کریں |

## مسائل کا حل

### macOS پر SSL سرٹیفکیٹ تصدیق کی غلطیاں

اگر آپ macOS استعمال کر رہے ہیں اور درج ذیل جیسی خرابی کا سامنا کر رہے ہیں:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

یہ macOS پر Python کے ساتھ ایک معروف مسئلہ ہے جہاں سسٹم کے SSL سرٹیفکیٹس خود بخود معتبر نہیں سمجھے جاتے۔ درج ذیل حل کو ترتیب وار آزمایں:

**آپشن 1: Python کا Install Certificates اسکرپٹ چلائیں (مشورہ دیا جاتا ہے)**

```bash
# اپنے نصب کردہ پائتھن ورژن کے ساتھ 3.XX کو بدلیں (مثلاً، 3.12 یا 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**آپشن 2: اپنی نوٹ بک میں `connection_verify=False` استعمال کریں (صرف GitHub Models نوٹ بکس کے لیے)**

سبق 6 کی نوٹ بک (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) میں ایک کمنٹس کے ذریعے مسئلے کا حل پہلے سے موجود ہے۔ کلائنٹ بناتے وقت `connection_verify=False` کو ان کمنٹس سے نکالیں:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # اگر آپ کو سرٹیفکیٹ کی خرابیوں کا سامنا ہو تو SSL کی تصدیق کو غیر فعال کریں
)
```

> **⚠️ انتباہ:** SSL تصدیق کو غیر فعال کرنا (`connection_verify=False`) سیکیورٹی کم کردیتا ہے کیونکہ سرٹیفکیٹ کی جانچ کو بائی پاس کر دیتا ہے۔ اس کا استعمال صرف ترقیاتی ماحول میں وقتی حل کے طور پر کریں، پیداوار میں کبھی نہیں۔

**آپشن 3: `truststore` انسٹال کریں اور استعمال کریں**

```bash
pip install truststore
```

پھر اپنی نوٹ بک یا اسکرپٹ کے شروع میں کوئی بھی نیٹ ورک کال کرنے سے پہلے یہ شامل کریں:

```python
import truststore
truststore.inject_into_ssl()
```

## کہیں پھنس گئے ہیں؟

اگر آپ کو اس ترتیب کو چلانے میں کوئی مسئلہ ہو تو ہمارے <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> میں شامل ہوں یا <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">ایک مسئلہ بنائیں</a>۔

## اگلا سبق

آپ اب اس کورس کے لیے کوڈ چلانے کے لیے تیار ہیں۔ AI ایجنٹس کی دنیا کے بارے میں مزید سیکھنے کے لیے خوش رہیں! 

[AI ایجنٹس اور ایجنٹ استعمال کے کیسز کا تعارف](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->