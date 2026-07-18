# راه‌اندازی دوره

## معرفی

این درس به نحوه اجرای نمونه‌های کد این دوره می‌پردازد.

## پیوستن به دیگر یادگیرندگان و دریافت کمک

قبل از اینکه شروع به کلون کردن مخزن خود کنید، به [کانال Discord هوش مصنوعی برای مبتدی‌ها](https://aka.ms/ai-agents/discord) بپیوندید تا در راه‌اندازی، پرسش‌های مربوط به دوره یا ارتباط با دیگر یادگیرندگان کمک دریافت کنید.

## کلون یا فورک این مخزن

برای شروع، لطفاً مخزن گیت‌هاب را کلون یا فورک کنید. این کار نسخه‌ای از محتوای دوره را برای شما ایجاد می‌کند تا بتوانید کد را اجرا، تست و تغییر دهید!

این کار را می‌توانید با کلیک روی لینک <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">فورک کردن مخزن</a> انجام دهید.

اکنون باید نسخه فورک شده خود از این دوره را در لینک زیر داشته باشید:

![مخزن فورک شده](../../../translated_images/fa/forked-repo.33f27ca1901baa6a.webp)

### کلون سطحی (توصیه‌شده برای کارگاه / Codespaces)

   > وقتی کل تاریخچه کامل و تمام فایل‌ها را دانلود می‌کنید، مخزن کامل می‌تواند بزرگ (~3 گیگابایت) باشد. اگر فقط کارگاه را شرکت می‌کنید یا فقط به چند پوشه درس نیاز دارید، کلون سطحی (یا کلون پراکنده) با قطع تاریخچه و/یا صرف‌نظر از بلاپ‌ها از بیشتر این دانلود جلوگیری می‌کند.

#### کلون سطحی سریع — تاریخچه حداقلی، تمام فایل‌ها

`<your-username>` را در دستورات زیر با URL فورک خود (یا URL اصلی اگر ترجیح می‌دهید) جایگزین کنید.

برای کلون کردن فقط جدیدترین تاریخچه کامیت (دانلود کم):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

برای کلون یک شاخه خاص:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### کلون جزئی (پراکنده) — حداقل بلاپ‌ها + فقط پوشه‌های انتخابی

این روش از کلون جزئی و sparse-checkout استفاده می‌کند (نیازمند Git 2.25+ و توصیه شده با Git مدرن با پشتیبانی کلون جزئی):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

وارد پوشه مخزن شوید:

```bash|powershell
cd ai-agents-for-beginners
```

سپس مشخص کنید کدام پوشه‌ها را می‌خواهید (مثال زیر دو پوشه را نشان می‌دهد):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

پس از کلون و تایید فایل‌ها، اگر فقط به فایل‌ها نیاز دارید و می‌خواهید فضا آزاد کنید (بدون تاریخچه گیت)، لطفاً متادیتای مخزن را پاک کنید (💀 غیرقابل برگشت — تمام عملکردهای Git را از دست می‌دهید: کامیت‌ها، پول‌ها، پوش‌ها و دسترسی به تاریخچه).

```bash
# زد‌شل/باش
rm -rf .git
```

```powershell
# پاورشل
Remove-Item -Recurse -Force .git
```

#### استفاده از GitHub Codespaces (توصیه‌شده برای جلوگیری از دانلودهای بزرگ محلی)

- یک Codespace جدید برای این مخزن از طریق [رابط کاربری GitHub](https://github.com/codespaces) بسازید.  

- در ترمینال Codespace ایجاد شده، یکی از دستورات کلون سطحی/پراکنده بالا را اجرا کنید تا فقط پوشه‌های درس مورد نیاز را به فضای کاری Codespace بیاورد.
- اختیاری: پس از کلون داخل Codespaces، برای آزادسازی فضا، پوشه .git را پاک کنید (دستورات پاکسازی بالا را ببینید).
- توجه: اگر ترجیح می‌دهید مخزن را مستقیماً در Codespaces باز کنید (بدون کلون اضافه)، توجه داشته باشید Codespaces محیط devcontainer را می‌سازد و ممکن است بیشتر از نیاز شما منابع تخصیص دهد. کلون یک نسخه سطحی در داخل Codespace تازه کنترل بیشتری روی استفاده از دیسک به شما می‌دهد.

#### نکات

- همیشه URL کلون را با فورک خود جایگزین کنید اگر می‌خواهید ویرایش یا کامیت کنید.
- اگر بعداً به تاریخچه یا فایل‌های بیشتری نیاز داشتید، می‌توانید آنها را بازیابی کنید یا sparse-checkout را برای افزودن پوشه‌های بیشتر تنظیم کنید.

## اجرای کد

این دوره مجموعه‌ای از دفترچه‌های جیوپیتر (Jupyter Notebooks) ارائه می‌دهد که می‌توانید برای کسب تجربه عملی در ساخت عوامل هوش مصنوعی اجرا کنید.

نمونه‌های کد از **Microsoft Agent Framework (MAF)** با `FoundryChatClient` استفاده می‌کنند، که از طریق **Microsoft Foundry** به **Microsoft Foundry Agent Service V2** (API پاسخ‌ها) متصل می‌شود.

همه دفترچه‌های پایتون با برچسب `*-python-agent-framework.ipynb` مشخص شده‌اند.

## نیازمندی‌ها

- پایتون 3.12+
  - **نکته:** اگر پایتون 3.12 ندارید، حتما نصب کنید. سپس محیط مجازی (venv) خود را با python3.12 بسازید تا نسخه‌های صحیح از فایل requirements.txt نصب شوند.
  
    >مثال

    ساخت دایرکتوری محیط مجازی پایتون:

    ```bash|powershell
    python -m venv venv
    ```

    سپس محیط venv را برای:

    ```bash
    # زدش/باش
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- دات‌نت 10+: برای نمونه کدهای دات‌نت، حتما [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) یا نسخه بالاتر نصب کنید. سپس نسخه دات‌نت خود را بررسی کنید:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — برای احراز هویت مورد نیاز است. از [aka.ms/installazurecli](https://aka.ms/installazurecli) نصب کنید.
- **اشتراک آزور** — برای دسترسی به Microsoft Foundry و Microsoft Foundry Agent Service.
- **پروژه Microsoft Foundry** — پروژه با مدل مستقر شده (مثلاً `gpt-4.1-mini`). مرحله [1](#مرحله-1-ساخت-پروژه-microsoft-foundry) را ببینید.

ما فایلی با نام `requirements.txt` در ریشه این مخزن قرار داده‌ایم که حاوی همه بسته‌های پایتون لازم برای اجرای نمونه کدهاست.

شما می‌توانید با اجرای دستور زیر در ترمینال در ریشه مخزن آن‌ها را نصب کنید:

```bash|powershell
pip install -r requirements.txt
```

توصیه می‌شود برای جلوگیری از تداخل و مشکلات، یک محیط مجازی پایتون بسازید و استفاده کنید.

## راه‌اندازی VSCode

مطمئن شوید که در VSCode از نسخه درست پایتون استفاده می‌کنید.

![تصویر](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## راه‌اندازی Microsoft Foundry و Microsoft Foundry Agent Service

### مرحله 1: ساخت پروژه Microsoft Foundry

برای اجرای دفترچه‌ها، به یک هاب و پروژه Microsoft Foundry با یک مدل مستقر شده نیاز دارید.

1. به [ai.azure.com](https://ai.azure.com) بروید و با حساب Azure خود وارد شوید.
2. یک **هاب** بسازید (یا از هاب موجود استفاده کنید). ببینید: [مروری بر منابع هاب](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. در هاب، یک **پروژه** ایجاد کنید.
4. از **Models + Endpoints** → **Deploy model** یک مدل (مثلاً `gpt-4.1-mini`) مستقر کنید.

### مرحله 2: دریافت نقطه انتهایی پروژه و نام استقرار مدل

از پروژه خود در پرتال Microsoft Foundry:

- **نقطه انتهایی پروژه** — به صفحه **Overview** بروید و URL انتهایی را کپی کنید.

![رشته اتصال پروژه](../../../translated_images/fa/project-endpoint.8cf04c9975bbfbf1.webp)

- **نام استقرار مدل** — به **Models + Endpoints** بروید، مدل مستقر شده خود را انتخاب کنید و نام **Deployment** را یادداشت کنید (مثلاً `gpt-4.1-mini`).

### مرحله 3: ورود به Azure با `az login`

همه دفترچه‌ها برای احراز هویت از **`AzureCliCredential`** استفاده می‌کنند — کلید API نیازی نیست. این نیازمند ورود شما از طریق Azure CLI است.

1. **Azure CLI را نصب کنید** اگر قبلاً انجام نداده‌اید: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **وارد شوید** با اجرای:

    ```bash|powershell
    az login
    ```

    یا اگر در محیط ریموت/Codespace بدون مرورگر هستید:

    ```bash|powershell
    az login --use-device-code
    ```

3. اگر خواسته شد، **اشتراک خود را انتخاب کنید** — اشتراکی که پروژه Foundry شما روی آن است را انتخاب کنید.

4. **تأیید کنید** که وارد شده‌اید:

    ```bash|powershell
    az account show
    ```

> **چرا `az login`؟** دفترچه ها با استفاده از `AzureCliCredential` از پکیج `azure-identity` احراز هویت می‌کنند. این به این معنی است که جلسه Azure CLI شما اعتبارنامه‌ها را فراهم می‌کند — در فایل `.env` شما دیگر کلید API یا راز نیست. این یک [بهترین روش امنیتی](https://learn.microsoft.com/azure/developer/ai/keyless-connections) است.

### مرحله 4: ساخت فایل `.env`

فایل نمونه را کپی کنید:

```bash
# زد شل / بش
cp .env.example .env
```

```powershell
# پاورشل
Copy-Item .env.example .env
```

فایل `.env` را باز کنید و این دو مقدار را پر کنید:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| متغیر | محل پیدا کردن |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | پرتال Foundry → پروژه شما → صفحه **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | پرتال Foundry → **Models + Endpoints** → نام مدل مستقر شده شما |

برای بیشتر درس‌ها همین کافی است! دفترچه‌ها به طور خودکار از طریق جلسه‌ی `az login` شما احراز هویت می‌شوند.

### مرحله 5: نصب وابستگی‌های پایتون

```bash|powershell
pip install -r requirements.txt
```

توصیه می‌کنیم این را داخل محیط مجازی که ساخته‌اید اجرا کنید.

## راه‌اندازی اضافی برای درس ۵ (Agentic RAG)

درس ۵ از **Azure AI Search** برای تولید مبتنی بر بازیابی استفاده می‌کند. اگر قصد اجرای آن درس را دارید، این متغیرها را به فایل `.env` خود اضافه کنید:

| متغیر | محل پیدا کردن |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | پرتال آزور → منبع **Azure AI Search** شما → صفحه **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | پرتال آزور → منبع **Azure AI Search** شما → **Settings** → **Keys** → کلید اولیه مدیریت |

## راه‌اندازی اضافی برای درس‌هایی که مستقیماً Azure OpenAI را فرا می‌خوانند (درس‌های ۶ و ۸)

برخی دفترچه‌ها در درس‌های ۶ و ۸ مستقیماً **Azure OpenAI** را فرا می‌خوانند (با استفاده از **Responses API**) به جای اینکه از طریق پروژه Microsoft Foundry بروند. این نمونه‌ها قبلاً از GitHub Models استفاده می‌کردند که منسوخ شده است (بازنشستگی در ژوئیه ۲۰۲۶) و از Responses API پشتیبانی نمی‌کند. اگر قصد اجرای این نمونه‌ها را دارید، این متغیرها را به فایل `.env` اضافه کنید:

| متغیر | محل پیدا کردن |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | پرتال آزور → منبع **Azure OpenAI** شما → **Keys and Endpoint** → Endpoint (مثلاً `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | نام مدل مستقر شده شما (مثلاً `gpt-4.1-mini`) که Responses API را پشتیبانی می‌کند |
| `AZURE_OPENAI_API_KEY` | اختیاری — فقط اگر احراز هویت بر مبنای کلید به جای `az login` / شناسه Entra دارید |

> Responses API از نقطه انتهایی پایدار `/openai/v1/` استفاده می‌کند، بنابراین نیازی به `api-version` نیست. برای استفاده از احراز هویت بدون کلید شناسه Entra با `az login` وارد شوید.

## ارائه‌دهنده جایگزین: MiniMax (سازگار با OpenAI)

[MiniMax](https://platform.minimaxi.com/) مدل‌های بزرگ-متنی (تا ۲۰۴ هزار توکن) را از طریق API سازگار با OpenAI ارائه می‌دهد. چون `OpenAIChatClient` فریمورک Microsoft Agent با هر نقطه انتهایی سازگار با OpenAI کار می‌کند، می‌توانید MiniMax را به جای Azure OpenAI یا OpenAI استفاده کنید.

این متغیرها را به فایل `.env` خود اضافه کنید:

| متغیر | محل پیدا کردن |
|----------|-----------------|
| `MINIMAX_API_KEY` | [پلتفرم MiniMax](https://platform.minimaxi.com/) → کلیدهای API |
| `MINIMAX_BASE_URL` | مقدار پیش‌فرض `https://api.minimax.io/v1` |
| `MINIMAX_MODEL_ID` | نام مدل برای استفاده (مثلاً `MiniMax-M3`) |

**مدل‌های نمونه**: `MiniMax-M3` (توصیه شده)، `MiniMax-M2.7`، `MiniMax-M2.7-highspeed` (پاسخ‌های سریع‌تر). نام مدل‌ها و دسترسی آنها ممکن است با گذشت زمان تغییر کنند، و دسترسی به مدل خاصی ممکن است به حساب یا منطقه شما بستگی داشته باشد — برای لیست کنونی به [پلتفرم MiniMax](https://platform.minimaxi.com/) مراجعه کنید. اگر `MiniMax-M3` برای حساب شما در دسترس نیست، `MINIMAX_MODEL_ID` را به مدلی که دسترسی دارید تنظیم کنید (مثلاً `MiniMax-M2.7`).

نمونه کدهایی که از `OpenAIChatClient` استفاده می‌کنند (مثل فرآیند رزرو هتل درس ۱۴) به طور خودکار پیکربندی MiniMax شما را وقتی `MINIMAX_API_KEY` تنظیم شده است، تشخیص داده و استفاده می‌کنند.

## ارائه‌دهنده جایگزین: Foundry Local (اجرای مدل‌ها روی دستگاه)

[Foundry Local](https://foundrylocal.ai) یک محیط اجرای سبک است که مدل‌های زبان را **کاملاً روی دستگاه خودتان** دانلود، مدیریت و سرو می‌کند از طریق API سازگار با OpenAI — بدون ابری، بدون اشتراک آزور و بدون کلید API. گزینه عالی برای توسعه آفلاین، آزمایش بدون هزینه ابر یا حفظ داده‌ها روی دستگاه است.

چون `OpenAIChatClient` در فریمورک Microsoft Agent با هر نقطه انتهایی سازگار با OpenAI کار می‌کند، Foundry Local جایگزین محلی برای Azure OpenAI است.

**۱. نصب Foundry Local**

```bash
# ویندوز
winget install Microsoft.FoundryLocal

# مک‌اواس
brew install foundrylocal
```

**۲. دانلود و اجرای یک مدل** (این همچنین سرویس محلی را راه‌اندازی می‌کند):

```bash
foundry model list          # مدل‌های موجود را مشاهده کنید
foundry model run phi-4-mini
```

**۳. نصب SDK پایتون** برای کشف نقطه انتهای محلی:

```bash
pip install foundry-local-sdk
```

**۴. پیکربندی Microsoft Agent Framework برای مدل محلی شما:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# مدل را به صورت محلی دانلود (در صورت نیاز) و ارائه می‌دهد، سپس نقطه پایان/پورت را پیدا می‌کند.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # مثلاً http://localhost:<port>/v1
    api_key=manager.api_key,        # همیشه برای Foundry Local "not-required" است
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **توجه:** Foundry Local یک نقطه انتهایی **Chat Completions** سازگار با OpenAI ارائه می‌دهد. از آن برای توسعه محلی و سناریوهای آفلاین استفاده کنید. برای مجموعه کامل ویژگی‌های **Responses API** (گفتگوهای حالت‌دار، ارکستراسیون ابزارهای عمیق و توسعه به سبک عامل) به Azure OpenAI یا پروژه Microsoft Foundry در درس‌ها مراجعه کنید. مستندات [Foundry Local](https://foundrylocal.ai) را برای کاتالوگ مدل‌ها و پشتیبانی پلتفرم کنونی ببینید.


## راه‌اندازی اضافی برای درس ۸ (روند کار Bing Grounding)

دفترچه روند کاری شرطی در درس ۸ از **Bing grounding** از طریق Microsoft Foundry استفاده می‌کند. اگر قصد دارید آن نمونه را اجرا کنید، این متغیر را به فایل `.env` خود اضافه کنید:

| متغیر | محل یافتن |
|----------|-----------------|
| `BING_CONNECTION_ID` | پرتال Microsoft Foundry → پروژه شما → **مدیریت** → **منابع متصل** → اتصال Bing شما → شناسه اتصال را کپی کنید |

## رفع اشکال

### خطاهای تأیید گواهی SSL در macOS

اگر در macOS هستید و با خطایی مانند روبرو شدید:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

این یک مشکل شناخته شده در پایتون روی macOS است که گواهی‌های SSL سیستم به صورت خودکار مورد اعتماد قرار نمی‌گیرند. راه‌حل‌های زیر را به ترتیب امتحان کنید:

**گزینه ۱: اجرای اسکریپت نصب گواهی‌های پایتون (توصیه شده)**

```bash
# نسخه پایتون نصب‌شده خود را به جای 3.XX قرار دهید (مثلاً 3.12 یا 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**گزینه ۲: استفاده از `connection_verify=False` در دفترچه شما (فقط برای دفترچه‌های GitHub Models)**

در دفترچه درس ۶ (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`)، راه‌حلی که کامنت شده است قبلاً گنجانده شده است. هنگام ایجاد کلاینت، `connection_verify=False` را از حالت کامنت خارج کنید:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # اگر با خطاهای گواهی‌نامه مواجه شدید، اعتبارسنجی SSL را غیرفعال کنید
)
```

> **⚠️ هشدار:** غیرفعال کردن تأیید SSL (`connection_verify=False`) امنیت را کاهش می‌دهد زیرا اعتبارسنجی گواهی را رد می‌کند. از این فقط به عنوان راه‌حل موقت در محیط‌های توسعه استفاده کنید، هرگز در محیط تولید.

**گزینه ۳: نصب و استفاده از `truststore`**

```bash
pip install truststore
```

سپس این موارد را در بالای دفترچه یا اسکریپت خود قبل از انجام هرگونه تماس شبکه اضافه کنید:

```python
import truststore
truststore.inject_into_ssl()
```

## گیر کرده‌اید؟

اگر در اجرای این راه‌اندازی مشکلی داشتید، به <a href="https://discord.gg/kzRShWzttr" target="_blank">دیسکورد انجمن Azure AI</a> بپیوندید یا <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">یک مسئله ایجاد کنید</a>.

## درس بعدی

اکنون آماده اجرای کد این دوره هستید. یادگیری خوبی درباره دنیای هوش مصنوعی عامل‌ها داشته باشید!

[معرفی به عامل‌های هوش مصنوعی و موارد استفاده آنها](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->