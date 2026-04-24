# راه‌اندازی دوره

## مقدمه

این درس نحوه اجرای نمونه کدهای این دوره را پوشش می‌دهد.

## به دیگر یادگیرندگان بپیوندید و کمک بگیرید

قبل از شروع به کلون کردن مخزن خود، به کانال [AI Agents For Beginners Discord](https://aka.ms/ai-agents/discord) بپیوندید تا در تنظیمات، سوالات مربوط به دوره یا ارتباط با دیگر یادگیرندگان کمک بگیرید.

## کلون یا فورک این مخزن

برای شروع، لطفاً مخزن گیت‌هاب را کلون یا فورک کنید. این کار نسخهٔ شخصی خود از مطالب دوره را ایجاد می‌کند تا بتوانید کد را اجرا، آزمون و تنظیم کنید!

این کار با کلیک روی لینک <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">فورک مخزن</a> انجام می‌شود.

اکنون باید نسخهٔ فورک شده خود از این دوره را در لینک زیر داشته باشید:

![Forked Repo](../../../translated_images/fa/forked-repo.33f27ca1901baa6a.webp)

### کلون کم‌عمق (توصیه شده برای کارگاه / Codespaces)

> مخزن کامل ممکن است بزرگ (~۳ گیگابایت) باشد هنگام دانلود تمام سابقه و فایل‌ها. اگر فقط در کارگاه شرکت می‌کنید یا فقط به چند پوشه درس نیاز دارید، کلون کم‌عمق (یا کلون پراکنده) با قطع تاریخچه و/یا کاهش بارهای داده بیشتر از دانلود بزرگ جلوگیری می‌کند.

#### کلون کم‌عمق سریع — تاریخچه حداقلی، تمام فایل‌ها

در دستورات زیر `<your-username>` را با آدرس فورک خود (یا آدرس اصلی اگر ترجیح می‌دهید) جایگزین کنید.

برای کلون فقط تاریخچه آخرین کامیت (دانلود کوچک):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

برای کلون شاخهٔ خاص:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### کلون جزئی (پراکنده) — حداقل بارهای داده + فقط پوشه‌های انتخابی

این روش از کلون جزئی و sparse-checkout استفاده می‌کند (نیاز به گیت 2.25+ و گیت مدرن با پشتیبانی کلون جزئی دارد):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

به پوشه مخزن بروید:

```bash|powershell
cd ai-agents-for-beginners
```

سپس مشخص کنید کدام پوشه‌ها را می‌خواهید (مثال زیر دو پوشه را نشان می‌دهد):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

بعد از کلون کردن و بررسی فایل‌ها، اگر فقط به فایل‌ها نیاز دارید و می‌خواهید فضا آزاد کنید (بدون تاریخچه گیت)، لطفاً متادیتای مخزن را حذف کنید (💀غیرقابل بازگشت — تمام عملکردهای Git از جمله کامیت، پول، پوش و دسترسی به تاریخچه را از دست خواهید داد).

```bash
# زد شل / بش
rm -rf .git
```

```powershell
# پاورشل
Remove-Item -Recurse -Force .git
```

#### استفاده از GitHub Codespaces (توصیه می‌شود برای جلوگیری از دانلودهای بزرگ محلی)

- یک کداسپیس جدید برای این مخزن از طریق [رابط کاربری GitHub](https://github.com/codespaces) ایجاد کنید.

- در ترمینال کداسپیس جدید، یکی از دستورات کلون کم‌عمق/پراکنده بالا را اجرا کنید تا فقط پوشه‌های درسی که نیاز دارید وارد فضای کاری کداسپیس شود.
- اختیاری: بعد از کلون در Codespaces، برای آزادسازی فضا، پوشه .git را پاک کنید (دستورات حذف در بالا آمده است).
- توجه: اگر ترجیح می‌دهید مخزن را مستقیماً در Codespaces باز کنید (بدون کلون اضافه)، دقت کنید Codespaces محیط devcontainer را می‌سازد و ممکن است بیش از نیاز شما منابع فراهم کند. کلون نسخه کم‌عمق داخل Codespace تازه کنترل بیشتری روی مصرف دیسک می‌دهد.

#### نکات

- همیشه آدرس کلون را با فورک خود جایگزین کنید اگر می‌خواهید ویرایش/کامیت کنید.
- اگر بعداً به تاریخچه یا فایل‌های بیشتر نیاز داشتید، می‌توانید آنها را فراخوانی کنید یا sparse-checkout را تنظیم کنید تا پوشه‌های اضافی را شامل شود.

## اجرای کد

این دوره مجموعه‌ای از نوت‌بوک‌های Jupyter ارائه می‌دهد که می‌توانید برای کسب تجربه عملی در ساخت عوامل هوش مصنوعی اجرا کنید.

نمونه کدها از **Microsoft Agent Framework (MAF)** با `AzureAIProjectAgentProvider` استفاده می‌کنند، که به **Azure AI Agent Service V2** (API پاسخ‌ها) از طریق **Microsoft Foundry** متصل می‌شود.

تمام نوت‌بوک‌های پایتون با `*-python-agent-framework.ipynb` برچسب‌گذاری شده‌اند.

## نیازمندی‌ها

- پایتون 3.12+
  - **توجه**: اگر پایتون 3.12 نصب ندارید، آن را نصب کنید. سپس venv خود را با python3.12 ایجاد کنید تا نسخه‌های صحیح از فایل requirements.txt نصب شود.
  
    >مثال

    ایجاد پوشه محیط مجازی پایتون:

    ```bash|powershell
    python -m venv venv
    ```

    سپس برای فعال کردن محیط venv:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: برای کدهای نمونه استفاده شده در دات‌نت، مطمئن شوید [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) یا بالاتر نصب شده است. سپس نسخه نصب شده .NET SDK خود را بررسی کنید:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — برای احراز هویت لازم است. از [aka.ms/installazurecli](https://aka.ms/installazurecli) نصب کنید.
- **اشتراک Azure** — برای دسترسی به Microsoft Foundry و Azure AI Agent Service.
- **پروژه Microsoft Foundry** — پروژه‌ای با مدلی مستقر شده (مثلاً `gpt-4o`). نگاه کنید به [مرحله ۱](#مرحله-۱-ایجاد-پروژه-microsoft-foundry) پایین.

ما فایل `requirements.txt` را در ریشه مخزن قرار داده‌ایم که شامل تمام بسته‌های پایتون لازم برای اجرای نمونه‌هاست.

می‌توانید با اجرای دستور زیر در ترمینال و در ریشه مخزن آنها را نصب کنید:

```bash|powershell
pip install -r requirements.txt
```

پیشنهاد می‌کنیم محیط مجازی پایتون بسازید تا از تعارض‌ها و مشکلات جلوگیری شود.

## راه‌اندازی VSCode

مطمئن شوید که در VSCode از نسخه درست پایتون استفاده می‌کنید.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## راه‌اندازی Microsoft Foundry و Azure AI Agent Service

### مرحله ۱: ایجاد پروژه Microsoft Foundry

برای اجرای نوت‌بوک‌ها نیاز به **هاب** و **پروژه** Azure AI Foundry با مدلی مستقر دارید.

۱. به [ai.azure.com](https://ai.azure.com) بروید و با حساب Azure خود وارد شوید.
۲. یک **هاب** ایجاد کنید (یا از یکی موجود استفاده کنید). ببینید: [نمای کلی منابع هاب](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
۳. درون هاب، یک **پروژه** بسازید.
۴. یک مدل را از **Models + Endpoints** → **Deploy model** مستقر کنید (مثلاً `gpt-4o`).

### مرحله ۲: دریافت انتهای پروژه و نام استقرار مدل

از پروژه خود در پرتال Microsoft Foundry:

- **انتهای پروژه** — به صفحه **Overview** بروید و URL انتها را کپی کنید.

![Project Connection String](../../../translated_images/fa/project-endpoint.8cf04c9975bbfbf1.webp)

- **نام استقرار مدل** — به **Models + Endpoints** بروید، مدل مستقر خود را انتخاب کنید و نام **Deployment** (مثلاً `gpt-4o`) را یادداشت کنید.

### مرحله ۳: ورود به Azure با فرمان `az login`

تمام نوت‌بوک‌ها برای احراز هویت از **`AzureCliCredential`** استفاده می‌کنند — نیازی به مدیریت کلیدهای API نیست. این مستلزم ورود شما از طریق Azure CLI است.

۱. **Azure CLI را نصب کنید** اگر نصب ندارید: [aka.ms/installazurecli](https://aka.ms/installazurecli)

۲. **وارد شوید** با اجرای:

    ```bash|powershell
    az login
    ```

    یا اگر در محیط دور از میز/کداسپیس بدون مرورگر هستید:

    ```bash|powershell
    az login --use-device-code
    ```

۳. **اشتراک خود را انتخاب کنید** اگر خواسته شد — اشتراکی که پروژه Foundry شما است را انتخاب کنید.

۴. **تأیید کنید** که وارد شده‌اید:

    ```bash|powershell
    az account show
    ```

> **چرا `az login`؟** نوت‌بوک‌ها با استفاده از `AzureCliCredential` از بسته `azure-identity` احراز هویت می‌کنند. این یعنی جلسه Azure CLI شما اعتبارنامه‌ها را فراهم می‌کند — بدون کلید API یا اسرار در فایل `.env`. این یک [بهترین روش امنیتی](https://learn.microsoft.com/azure/developer/ai/keyless-connections) است.

### مرحله ۴: ساخت فایل `.env`

فایل نمونه را کپی کنید:

```bash
# زد شل/بش
cp .env.example .env
```

```powershell
# پاورشل
Copy-Item .env.example .env
```

فایل `.env` را باز کنید و این دو مقدار را پر کنید:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| متغیر | محل یافتن |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | پرتال Foundry → پروژه شما → صفحه **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | پرتال Foundry → **Models + Endpoints** → نام مدل مستقر شده‌تان |

همین! برای بیشتر درس‌ها نوت‌بوک‌ها به صورت خودکار از طریق جلسه `az login` شما احراز هویت می‌کنند.

### مرحله ۵: نصب وابستگی‌های پایتون

```bash|powershell
pip install -r requirements.txt
```

پیشنهاد می‌کنیم این کار را داخل محیط مجازی که قبلاً ساختید انجام دهید.

## راه‌اندازی اضافی برای درس ۵ (Agentic RAG)

درس ۵ از **Azure AI Search** برای تولید تقویت‌شده بازیابی استفاده می‌کند. اگر قصد اجرای آن درس را دارید، این متغیرها را به فایل `.env` خود اضافه کنید:

| متغیر | محل یافتن |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | پرتال Azure → منبع **Azure AI Search** شما → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | پرتال Azure → منبع **Azure AI Search** شما → **Settings** → **Keys** → کلید اصلی ادمین |

## راه‌اندازی اضافی برای درس ۶ و درس ۸ (مدل‌های GitHub)

برخی نوت‌بوک‌ها در درس‌های ۶ و ۸ به جای Azure AI Foundry از **مدل‌های GitHub** استفاده می‌کنند. اگر قصد اجرای آن نمونه‌ها را دارید، این متغیرها را به فایل `.env` اضافه کنید:

| متغیر | محل یافتن |
|----------|-----------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | از `https://models.inference.ai.azure.com` (مقدار پیش‌فرض) استفاده کنید |
| `GITHUB_MODEL_ID` | نام مدل مورد استفاده (مثلاً `gpt-4o-mini`) |

## ارائه‌دهنده جایگزین: MiniMax (سازگار با OpenAI)

[MiniMax](https://platform.minimaxi.com/) مدل‌های با زمینه بزرگ (تا ۲۰۴ هزار نشانه) را از طریق API سازگار با OpenAI ارائه می‌دهد. از آنجا که `OpenAIChatClient` در Microsoft Agent Framework با هر نقطه انتهایی سازگار با OpenAI کار می‌کند، می‌توانید MiniMax را به عنوان جایگزینی برای مدل‌های GitHub یا OpenAI استفاده کنید.

این متغیرها را به فایل `.env` خود اضافه کنید:

| متغیر | محل یافتن |
|----------|-----------------|
| `MINIMAX_API_KEY` | [پلتفرم MiniMax](https://platform.minimaxi.com/) → کلیدهای API |
| `MINIMAX_BASE_URL` | از `https://api.minimax.io/v1` (مقدار پیش‌فرض) استفاده کنید |
| `MINIMAX_MODEL_ID` | نام مدل مورد استفاده (مثلاً `MiniMax-M2.7`) |

**مدل‌های موجود**: `MiniMax-M2.7` (توصیه شده)، `MiniMax-M2.7-highspeed` (پاسخ‌های سریع‌تر)

نمونه کدهایی که `OpenAIChatClient` را استفاده می‌کنند (مثلاً جریان کاری رزرو هتل درس ۱۴) به طور خودکار تنظیمات MiniMax شما را وقتی `MINIMAX_API_KEY` تنظیم شده تشخیص و استفاده خواهند کرد.

## راه‌اندازی اضافی برای درس ۸ (جریان کاری Bing Grounding)

نوت‌بوک جریان کاری شرطی در درس ۸ از **Bing grounding** از طریق Azure AI Foundry استفاده می‌کند. اگر قصد اجرای این نمونه را دارید، این متغیر را به فایل `.env` اضافه کنید:

| متغیر | محل یافتن |
|----------|-----------------|
| `BING_CONNECTION_ID` | پرتال Azure AI Foundry → پروژه شما → **مدیریت** → **منابع متصل شده** → اتصال Bing شما → شناسه اتصال را کپی کنید |

## عیب‌یابی

### خطاهای اعتبارسنجی گواهی SSL در macOS

اگر در macOS با اروری مانند زیر مواجه شدید:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

این یک مشکل شناخته شده با پایتون در macOS است که گواهی‌های SSL سیستم به طور خودکار اعتماد نمی‌شوند. راه‌حل‌های زیر را به ترتیب امتحان کنید:

**گزینه ۱: اجرای اسکریپت نصب گواهی‌های Python (توصیه شده)**

```bash
# نسخه پایتون نصب شده خود را جایگزین 3.XX کنید (برای مثال، 3.12 یا 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**گزینه ۲: استفاده از `connection_verify=False` در نوت‌بوک خود (فقط برای نوت‌بوک‌های مدل‌های GitHub)**

در نوت‌بوک درس ۶ (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`)، یک راه‌حل موقت کامنت‌شده وجود دارد. هنگام ساخت کلاینت، `connection_verify=False` را از حالت کامنت خارج کنید:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # در صورت مواجهه با خطاهای گواهی، تأیید SSL را غیرفعال کنید
)
```

> **⚠️ هشدار:** غیرفعال کردن اعتبارسنجی SSL (`connection_verify=False`) امنیت را کاهش می‌دهد زیرا اعتبارسنجی گواهی را رد می‌کند. این فقط به عنوان راه‌حل موقت در محیط توسعه استفاده شود، هرگز در محیط تولید.

**گزینه ۳: نصب و استفاده از `truststore`**

```bash
pip install truststore
```

سپس این را در بالای نوت‌بوک یا اسکریپت قبل از هر فراخوانی شبکه قرار دهید:

```python
import truststore
truststore.inject_into_ssl()
```

## گیر کرده‌اید؟

اگر در اجرای این راه‌اندازی مشکلی داشتید، به <a href="https://discord.gg/kzRShWzttr" target="_blank">کانال Discord جامعه Azure AI</a> بپیوندید یا <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">یک مسئله ایجاد کنید</a>.

## درس بعدی

اکنون آماده‌اید کد این دوره را اجرا کنید. با آرزوی موفقیت در یادگیری دنیای عوامل هوش مصنوعی!

[مقدمه‌ای بر عوامل هوش مصنوعی و موارد استفاده آن‌ها](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:  
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است حاوی خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری آن باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما مسئول هیچ گونه سوء تفاهم یا تفسیر نادرستی که از استفاده این ترجمه ناشی شود، نیستیم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->