# تبدیلیوں کی تاریخ

**AI Agents for Beginners** کورس میں تمام اہم تبدیلیاں اس فائل میں دستاویزی ہیں۔

## [ریلیز] — 2026-07-13

یہ ریلیز دو نئے اسباق شامل کرتی ہے جو تعیناتی کے مرحلے کو مکمل کرتے ہیں — ایجنٹس کو Microsoft Foundry تک بڑھانا اور ایک واحد ورک سٹیشن تک کمی کرنا — اس کے علاوہ ایک سموک ٹیسٹ پائپ لائن، تازہ شدہ کورس نیویگیشن، نئے سیکھنے والوں کی صلاحیتیں، اور اپ ڈیٹڈ برانڈنگ۔

### شامل کی گئی

- **سبق 16 — Microsoft Foundry کے ساتھ قابل توسیع ایجنٹس کی تعیناتی۔** نیا سبق [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) اور قابل عمل نوٹ بُک [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) جس میں ایک پروڈکشن کسٹمر-سپورٹ ایجنٹ بنایا گیا ہے (اوزار، RAG، یادداشت، ماڈل راؤٹنگ، ردعمل کی کیچنگ، انسانی منظوری، ایک جائزہ دروازہ، اور OpenTelemetry ٹریسنگ)، ساتھ ہی ڈویلپمنٹ/تعیناتی/رن ٹائم Mermaid ڈایاگرامز، علم کی جانچ، ایک اسائنمنٹ، اور ایک چیلنج۔
- **سبق 17 — Foundry Local اور Qwen کے ساتھ مقامی AI ایجنٹس کی تخلیق۔** نیا سبق [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) اور نوٹ بُک [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) جو ایک مکمل طور پر ڈیوائس پر انجینئرنگ اسسٹنٹ بناتا ہے (Qwen فنکشن کالنگ فاؤنڈری لوکل کے ذریعے، سینڈ باکسڈ فائل ٹولز، مقامی RAG Chroma کے ساتھ، اختیاری مقامی MCP کے ساتھ)، اور مقامی-صرف / مقامی-RAG / ٹول کالنگ ڈایاگرامز، علم کی جانچ، ایک اسائنمنٹ، اور ایک چیلنج شامل ہیں۔
- **سموک ٹیسٹ پائپ لائن۔** نیا [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) ورک فلو [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) کے ساتھ ہر سبق کے لیے کیٹلاگز [tests/](./tests/README.md) میں موجود ہیں جو اسباق 01، 04، 05، اور 16 میں تیار ہونے والے ایجنٹس کو ٹیسٹ کرتے ہیں، اور ایک انڈیکس README جو ہر کیٹلاگ کو اس کے سبق اور ہوسٹڈ ایجنٹ کے نام سے جوڑتا ہے۔ سبق 16 میں "سموک ٹیسٹ کے ساتھ تعینات ایجنٹ کی تصدیق" کا سیکشن شامل کیا گیا؛ اسباق 01/04/05 میں ایک اختیاری سموک ٹیسٹ پوائنٹر شامل کیا گیا۔
- **سیکھنے والوں کی صلاحیتیں۔** نئے ایجنٹ کی صلاحیتیں `.agents/skills/` کے تحت: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md)، [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (سبق 16 اور 17 کی رہنمائی کو پیک کرتا ہے)، اور [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (Microsoft Foundry / Azure OpenAI لائیو سیٹ اپ کے خلاف نوٹ بُک نمونوں کی تصدیق کا طریقہ)۔
- **نوٹ بُک ویلیڈیشن رنر۔** نیا [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) جو ہر Python نوٹ بُک کو headlessly `nbconvert` کے ساتھ اجرا کرتا ہے اور PASS/FAIL میٹرکس (اور `results.json`) پرنٹ کرتا ہے۔ یہ خود بخود رپو روٹ اور پائتھون کو پہچانتا ہے، غیر کورس نوٹ بُکس (`.venv`, `site-packages`, `translations`, skill template assets) اور `.NET` نوٹ بُکس کو ڈیفالٹ کے طور پر خارج کرتا ہے، اور `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, اور `-Python` کو سپورٹ کرتا ہے۔
- **کورس نیویگیشن۔** اسباق 11–15 میں پچھلے/اگلے سبق کے روابط شامل کیے گئے (جو پہلے غائب تھے) تاکہ پورا کورس 00 → 18 دونوں سمتوں میں جڑی ہوئی ہو۔
- **نئے تھمبنلز۔** اسباق 16 اور 17 کے لئے سبق کے تھمبنلز، اور تازہ شدہ رپوزیٹری سوشل امیج [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (جو اب دو نئے اسباق اور `aka.ms/ai-agents-beginners` URL کی تشہیر کرتا ہے)۔
- **انحصاریاں** ([requirements.txt](../../requirements.txt)): سبق 17 کے لیے `foundry-local-sdk` اور `chromadb` شامل کیے گئے۔

### تبدیلیاں

- **مین [README.md](./README.md)** سبق کی فہرست: اب سبق 16 اور 17 اپنی مواد سے منسلک ہیں (پہلے "جلد آ رہا ہے" لکھا ہوتا تھا)؛ رپوزیٹری کی تصویر کو `repo-thumbnailv3.png` میں اپ ڈیٹ کیا گیا۔
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: سبق بہ سبق رہنما اور سیکھنے کے راستوں میں سبق 16 اور 17 شامل کیے گئے، اور "سموک ٹیسٹ کے ساتھ تعینات ایجنٹس کی تصدیق" کا سیکشن شامل کیا گیا۔
- **[AGENTS.md](./AGENTS.md)**: سبق کی تعداد/تشریح کو اپ ڈیٹ کیا گیا (00–18)، سموک ٹیسٹنگ کی تصدیق کا سیکشن شامل کیا گیا، اور سبق 16/17 کے مثال ناموں کو شامل کیا گیا۔
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "پچھلا سبق" اب سبق 17 کی طرف اشارہ کرتا ہے (جو پہلے سبق 15 تھا)، چین کو بند کرتا ہے۔
- **معیاری ماڈل حوالہ جات نان ڈیپریکیٹڈ ماڈلز پر۔** پورے کورس میں `gpt-4o` / `gpt-4o-mini` کے تمام حوالہ جات (دستاویزات، `.env.example`, Python/.NET نوٹ بُکس اور نمونے) کو `gpt-4.1-mini` سے بدل دیا گیا — `gpt-4o` (تمام ورژنز) 2026 میں ریٹائر ہو رہا ہے۔ سبق 16 کا ماڈل راؤٹنگ مثال `gpt-4.1-mini` (چھوٹا) اور `gpt-4.1` (بڑا) کے استعمال سے چھوٹے/بڑے فرق کو برقرار رکھتا ہے۔ پائتھون نوٹ بکس اب ماڈل کو سخت کوڈنگ کے بجائے ماحول کی متغیرات (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) سے منتخب کرتے ہیں۔

### نوٹس اور معروف حدود

- **لائیو Azure کے خلاف نہیں چلایا گیا۔** نئے اسباق کے نوٹ بکس تعلیمی نمونے ہیں؛ انہیں اپنے Microsoft Foundry / Foundry Local سیٹ اپ کے خلاف چلائیں اور تصدیق کریں۔ سموک ٹیسٹ ورک فلو کے لیے ضروری ہے کہ سبق کا ایجنٹ تعینات کریں اور Azure OIDC سیکریٹس (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) کو **Azure AI User** رول کے ساتھ Foundry پروجیکٹ دائرہ میں ترتیب دیں۔
- **سبق 17 صرف مقامی ہے۔** اس کا Foundry Responses اینڈ پوائنٹ نہیں ہے، اس لئے سموک ٹیسٹ عمل قابل اطلاق نہیں ہے؛ اسے اپنے ورک سٹیشن پر نوٹ بُک چلانے سے تصدیق کریں۔

## [ریلیز] — 2026-07-06

یہ ریلیز کورس کو **Azure OpenAI Responses API** پر منتقل کرتا ہے، پروڈکٹ کے نام Microsoft Foundry اور Microsoft Agent Framework (MAF) پر معیاری کرتا ہے، GitHub Models کو ریٹائر کرتا ہے، SDK ورژنز کو اپ ڈیٹ کرتا ہے، اور مقامی ماڈلز اور دوسرے فریم ورکس کو Foundry پر ہوسٹ کرنے سے متعلق نیا مواد شامل کرتا ہے۔

### شامل کی گئی

- **مائیگریشن کی مہارت** — `.agents/skills/` میں [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) ایجنٹ اسکل انسٹال کی گئی (Azure-Samples/azure-openai-to-responses سے)، اس کے حوالہ جات اور سکینر اسکرپٹ سمیت۔
- **Foundry Local (ماڈلز کو ڈیوائس پر چلائیں)** — [00-course-setup/README.md](./00-course-setup/README.md) میں نیا "متبادل فراہم کنندہ: Foundry Local" سیکشن، جس میں انسٹالیشن (`winget` / `brew`)، `foundry model run`, `foundry-local-sdk`، اور Microsoft Agent Framework کے ساتھ `FoundryLocalManager` کو `OpenAIChatClient` کے ذریعے جوڑنے کا احاطہ ہے۔
- **Microsoft Foundry پر LangChain / LangGraph ایجنٹس کی میزبانی** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) میں نیا سیکشن اور قابل عمل نمونہ [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) جو `langchain-azure-ai[hosting]` اور `ResponsesHostServer` (`/responses` پروٹوکول) استعمال کرتا ہے، Microsoft Learn کی بنیاد پر۔
- **Microsoft Project Opal** — [15-browser-use/README.md](./15-browser-use/README.md) میں نیا "حقیقی دنیا کی مثال: Microsoft Project Opal" سیکشن، Opal کو ایک انٹرپرائز کمپیوٹر-استعمال ایجنٹ کے طور پر فریم کرتا ہے اور کورس تصورات (انسان-اندر-لوپ، اعتماد/سیکیورٹی، منصوبہ بندی، صلاحیتیں) کے ساتھ میپ کرتا ہے۔
- **دوسری سبق 02 Python مثال** — [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) شامل کی گئی (دیکھیے "تبدیلیاں" — سابقہ Semantic Kernel نوٹ بُک سے مائیگریٹ کی گئی) اور اسے سبق کے README میں لنک کیا گیا۔
- **ماڈلز اور فراہم کنندگان** سیکشن [STUDY_GUIDE.md](./STUDY_GUIDE.md) میں شامل کیا گیا۔

### تبدیلیاں

- **Chat Completions → Responses API (Python).** ماڈل کو براہ راست کال کرنے والے نمونے Chat Completions سے Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`) پر منتقل کیے گئے، `OpenAI` کلائنٹ کو Azure OpenAI کے مستحکم `/openai/v1/` اینڈ پوائنٹ کے خلاف استعمال کیا گیا (کوئی `api_version` نہیں)۔ متاثرہ نمونوں میں شامل ہیں:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — مکمل فنکشن کالنگ واک تھرو (ٹول سکیمہ کو Responses فارمیٹ میں فلیٹ کیا، ٹول نتائج `function_call_output`, `max_output_tokens` وغیرہ کے طور پر واپس کیے گئے)۔
- **GitHub Models → Azure OpenAI.** GitHub Models اب ختم ہو رہا ہے (جولائی 2026 میں ریٹائر ہو گا) اور Responses API کو سپورٹ نہیں کرتا۔ تمام GitHub Models کوڈ راستے Python اور .NET نمونوں میں Azure OpenAI / Microsoft Foundry میں تبدیل کیے گئے:
  - پائتھون: سبق 08 ورک فلو نوٹ بکس (`01`–`03`)، سبق 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`)۔
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + ساتھ والی `.md` دستاویزات، اور سبق 08 کے dotNET ورک فلو نوٹ بکس/`.md` (`01`–`03`) اب `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` کو `AzureCliCredential` کے ساتھ استعمال کرتے ہیں۔
- **Semantic Kernel → Microsoft Agent Framework.** سابقہ `02-semantic-kernel.ipynb` کو Microsoft Agent Framework کے ساتھ Azure OpenAI (Responses API) استعمال کرنے کے لیے دوبارہ لکھا گیا اور `02-python-agent-framework-azure-openai.ipynb` کے نام سے تبدیل کیا گیا۔
- **`FoundryChatClient` + `as_agent` پر معیاری کیا گیا۔** README اور نوٹ بُک کوڈ جس میں `AzureAIProjectAgentProvider` کا حوالہ تھا، اسے سبق 01 اور فریم ورک کے اپنے نمونوں کے ذریعہ استعمال ہونے والے نمونے پر معیاری کیا گیا: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` کے ساتھ `provider.as_agent(...)`۔ سبق 02–14 کے READMEs اور نوٹ بکس (مثلاً سبق 13 کی یادداشت، تمام سبق 14 نوٹ بکس، `11-agentic-protocols/code_samples/github-mcp/app.py`) میں اپ ڈیٹ کیا گیا۔
- **پروڈکٹ کے نام کا معیار بنایا گیا۔** انگریزی مواد میں پورے کے پورے تبدیل کیا گیا:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (بدلاؤ نہیں: "Azure OpenAI", "Azure AI Search", "Azure AI Inference" اور ماحول کی متغیرات کے نام۔)
- **انحصاریاں** ([requirements.txt](../../requirements.txt)):
  - `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0` کو پن کیا گیا۔
  - `openai>=1.108.1` (Responses API کے لیے کم از کم) کو پن کیا گیا۔
  - `azure-ai-inference` کو ہٹا دیا گیا (صرف مائیگریٹ کیے ہوئے GitHub Models نمونوں میں استعمال ہوتا تھا)۔
- **ماحول کی ترتیب** ([.env.example](../../.env.example)): GitHub Models کے متغیرات (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`) کو ہٹا دیا گیا؛ `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, اور اختیاری `AZURE_OPENAI_API_KEY` شامل کیے گئے؛ نام کو Microsoft Foundry کے مطابق اپ ڈیٹ کیا گیا۔
- **دستاویزات** — [00-course-setup/README.md](./00-course-setup/README.md)، [AGENTS.md](./AGENTS.md)، [README.md](./README.md)، اور [STUDY_GUIDE.md](./STUDY_GUIDE.md) کو اوپر دی گئی تبدیلیوں کے مطابق اپ ڈیٹ کیا گیا (ماحول کی متغیرات سیٹ کرنا، تصدیقی اسنیپٹ، فراہم کنندہ کی رہنمائی، نام)۔

### ہٹایا گیا

- GitHub Models کے آن بورڈنگ مراحل اور ماحول کی متغیرات کو سیٹ اپ دستاویزات سے ہٹا دیا گیا (جو Azure OpenAI / Microsoft Foundry سے متبادل ہو گئے ہیں)۔

### سیکیورٹی / پرائیویسی (عوامی اشتراک صفائی)

- Jupyter نوٹ بکس کے اجرا سے جڑے آؤٹ پٹس صاف کیے گئے جن میں حقیقی **Azure سبسکرپشن ID**، وسائل کے گروپ / وسائل کے نام، اور Bing کنکشن ID لیک ہو رہی تھی، نیز ڈویلپر کے **مقامی فائل راستے اور صارف نام** شامل ہیں، درج ذیل میں:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- تصدیق کی گئی کہ ٹریک کیے گئے انگریزی مواد میں کوئی API کیز، ٹوکنز، سبسکرپشن IDs، یا ذاتی راستے باقی نہیں ہیں (جو `GITHUB_TOKEN` حوالہ جات ہیں وہ ورک فلو میں GitHub Actions کا ٹوکن اور لیسن 11 کے سیٹ اپ میں GitHub MCP سرور PAT ہیں — دونوں جائز اور GitHub Models سے غیر متعلق)۔

### نوٹس اور معروف محدودیتیں

- **چلایا یا مرتب نہیں کیا گیا۔** یہ تعلیمی نمونے API/ناموں کی درستگی کے لیے اپ ڈیٹ کیے گئے ہیں؛ انہیں لائیو Azure وسائل کے خلاف نہیں چلایا گیا، اور .NET کے نمونے اس ماحول میں مرتب نہیں کیے گئے۔ اپنی Microsoft Foundry / Azure OpenAI کی تعیناتی کے خلاف تصدیق کریں۔
- **ماڈل تعیناتی کو Responses API کی حمایت کرنی چاہیے۔** ایسی تعیناتی استعمال کریں جیسے کہ `gpt-4.1-mini`، `gpt-4.1`، یا `gpt-5.x` ماڈل۔ پرانے ماڈلز بنیادی Responses فعالیت کی حمایت کرتے ہیں لیکن ہر خصوصیت نہیں۔
- **ایجنٹ-فریم ورک کا ورژن۔** نمونے تازہ ترین MAF (`>=1.10.0`) کو ہدف بناتے ہیں۔ معیاری ایجنٹ تخلیق کال `client.as_agent(...)` ہے؛ APIs کو فریم ورک کی شائع شدہ دستاویزات اور ایک انسٹال شدہ بلڈ کے خلاف تصدیق کیا گیا۔ اگر آپ مختلف ورژن استعمال کرتے ہیں تو طریقہ کار کی دستیابی کی تصدیق کریں (`as_agent` بمقابلہ `create_agent`)۔
- **لیسن 08 ورک فلو نوٹ بک 04** ارادی طور پر `AzureAIAgentClient` (جو `agent-framework-azure-ai` سے ہے) رکھتا ہے کیونکہ یہ Microsoft Foundry Agent Service کے میزبان ٹولز استعمال کرتا ہے (Bing grounding، code interpreter)؛ یہ پہلے ہی Responses پر مبنی ہے۔
- **.NET کی ڈیفالٹ تعیناتی۔** دو لیسن 08 ڈاٹ نیٹ ورک فلو نمونے پہلے ایک مخصوص ماڈل کو ہارڈ کوڈ کرتے تھے؛ وہ اب `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`) پر ڈیفالٹ کرتے ہیں۔ اگر کوئی نمونہ ملٹی موڈل/وژن ان پٹ پر منحصر ہے، تو `AZURE_OPENAI_DEPLOYMENT` کو مناسب ماڈل پر سیٹ کریں۔
- **Foundry Local** ایک OpenAI-مطابق **Chat Completions** اینڈ پوائنٹ مہیا کرتا ہے اور لوکل ڈیولپمنٹ کے لیے ہے؛ مکمل Responses API خصوصیات کے لیے Azure OpenAI / Microsoft Foundry استعمال کریں۔

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->