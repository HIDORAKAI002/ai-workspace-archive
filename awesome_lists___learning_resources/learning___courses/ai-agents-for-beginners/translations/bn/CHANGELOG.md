# পরিবর্তনলগ্ন

**AI Agents for Beginners** কোর্সের সমস্ত উল্লেখযোগ্য পরিবর্তন এই ফাইলে ডকুমেন্ট করা হয়েছে।

## [মুক্তিপ্রাপ্ত] — ২০২৬-০৭-১৩

এই রিলিজে দুটি নতুন পাঠ যোগ হয়েছে যা ডিপ্লয়মেন্ট অর্ক সম্পূর্ণ করে — Microsoft Foundry তে এজেন্ট স্কেল করা এবং একটি একক ওয়ার্কস্টেশনে নামানো — পাশাপাশি একটি স্মোক-টেস্ট পাইপলাইন, রিফ্রেশড কোর্স নেভিগেশন, নতুন শিক্ষার্থী দক্ষতা এবং আপডেট হওয়া ব্র্যান্ডিং।

### যোগ করা হয়েছে

- **পাঠ ১৬ — Microsoft Foundry দিয়ে স্কেলযোগ্য এজেন্ট ডিপ্লয় করা।** নতুন পাঠ [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) এবং চালানোর উপযোগী নোটবুক [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) যা একটি প্রোডাকশন কাস্টমার-সাপোর্ট এজেন্ট তৈরি করে (টুলস, RAG, মেমোরি, মডেল রুটিং, রেসপন্স ক্যাশিং, মানব অনুমোদন, একটি ইভ্যালুয়েশন গেট, ও OpenTelemetry ট্রেজিং), ডেভেলপমেন্ট/ডিপ্লয়মেন্ট/রানটাইম মার্চেড ডায়াগ্রামসহ, একটি নলেজ চেক, একটি অ্যাসাইনমেন্ট, এবং একটি চ্যালেঞ্জ।
- **পাঠ ১৭ — Foundry Local এবং Qwen দিয়ে স্থানীয় AI এজেন্ট তৈরি করা।** নতুন পাঠ [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) এবং নোটবুক [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) যা সম্পূর্ণভাবে ডিভাইস-অভ্যন্তরে একটি ইঞ্জিনিয়ারিং অ্যাসিস্ট্যান্ট তৈরি করে (Foundry Local এর মাধ্যমে Qwen ফাংশন কলিং, স্যান্ডবক্সড ফাইল টুলস, Chroma সহ স্থানীয় RAG, ঐচ্ছিক স্থানীয় MCP সহ), স্থানীয়-মাত্র / স্থানীয়-RAG / টুল-কলিং ডায়াগ্রামসহ, একটি নলেজ চেক, একটি অ্যাসাইনমেন্ট, এবং একটি চ্যালেঞ্জ।
- **স্মোক-টেস্ট পাইপলাইন।** নতুন [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) ওয়ার্কফ্লো [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) এবং পাঠ ০১, ০৪, ০৫, এবং ১৬ এর ডিপ্লয়েবল এজেন্টের জন্য প্রতি-পাঠ ক্যাটালগ [tests/](./tests/README.md) এর অধীনে, একটি ইনডেক্স README যা প্রতিটি ক্যাটালগকে তার পাঠ এবং হোস্টেড এজেন্ট নামের সাথে ম্যাপ করে। পাঠ ১৬ এ একটি "স্মোক টেস্ট দিয়ে ডিপ্লয় করা এজেন্ট যাচাই" বিভাগ যোগ হয়েছে; পাঠ ০১/০৪/০৫ এ একটি ঐচ্ছিক স্মোক-টেস্ট পয়েন্টার যোগ হয়েছে।
- **শিক্ষার্থী দক্ষতা।** নতুন এজেন্ট স্কিল `.agents/skills/`-এ: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (পাঠ ১৬ ও ১৭ নির্দেশনা সংকলন), এবং [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (Microsoft Foundry / Azure OpenAI সেটআপের বিরুদ্ধে নোটবুক স্যাম্পল যাচাই করার উপায়)।
- **নোটবুক যাচাই রানার।** নতুন [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) যা `nbconvert` দিয়ে প্রতিটি পাইথন নোটবুক হেডলেসভাবে চালায় এবং PASS/FAIL ম্যাট্রিক্স প্রিন্ট করে (সাথে `results.json`)। এটি রেপো রুট ও পাইথন স্বয়ংক্রিয়ভাবে সনাক্ত করে, ডিফল্টরূপে নন-কোর্স নোটবুকগুলি (যেমন `.venv`, `site-packages`, `translations`, স্কিল টেমপ্লেট এসেট) এবং `.NET` নোটবুক বাদ দেয়, এবং `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, এবং `-Python` সমর্থন করে।
- **কোর্স নেভিগেশন।** পাঠ ১১-১৫ এ পূর্ববর্তী/পরবর্তী পাঠ লিঙ্ক যুক্ত করা হয়েছে (আগে অনুপস্থিত ছিল) যাতে পুরো কোর্স ০০ → ১৮ উভয় দিকে চেইন হয়।
- **নতুন থাম্বনেইল।** পাঠ ১৬ ও ১৭ এর জন্য পাঠ থাম্বনেইল, এবং আপডেটেড রিপোজিটরি সোশ্যাল ইমেজ [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (এখন দুই নতুন পাঠ এবং `aka.ms/ai-agents-beginners` URL বিজ্ঞাপন সহ)।
- **নির্ভরতা** ([requirements.txt](../../requirements.txt)): পাঠ ১৭ এর জন্য `foundry-local-sdk` এবং `chromadb` যোগ করা হয়েছে।

### পরিবর্তিত

- **মেইন [README.md](./README.md)** পাঠ টেবিল: পাঠ ১৬ ও ১৭ এখন তাদের বিষয়বস্তুতে লিঙ্ক করে (আগে "শীঘ্রই আসছে"); রিপোজিটরি ইমেজ `repo-thumbnailv3.png` এ আপডেট করা হয়েছে।
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: পাঠ ১৬ ও ১৭ পাঠ-দ্বারা-পাঠ গাইড এবং শিক্ষণ পথ স্বেচ্ছাসেবক যুক্ত এবং "স্মোক টেস্ট দিয়ে ডিপ্লয় করা এজেন্ট যাচাই" বিভাগ যোগ করা হয়েছে।
- **[AGENTS.md](./AGENTS.md)**: পাঠ সংখ্যা/বর্ণনা (০০–১৮) আপডেট করা হয়েছে, স্মোক-টেস্ট যাচাই বিভাগ যুক্ত হয়েছে, এবং পাঠ ১৬/১৭ এর নমুনা-নামকরণ উদাহরণ যোগ করা হয়েছে।
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "পূর্ববর্তী পাঠ" এখন পাঠ ১৭ নির্দেশ করে (আগে ছিল পাঠ ১৫), চেইন বন্ধ হয়।
- **অপচয় হওয়া নয় এমন মডেলগুলির উপর স্ট্যান্ডার্ডাইজড মডেল রেফারেন্স।** কোর্স জুড়ে সমস্ত `gpt-4o` / `gpt-4o-mini` রেফারেন্স (ডকুমেন্ট, `.env.example`, পাইথন/.NET নোটবুক ও নমুনা) `gpt-4.1-mini` দিয়ে প্রতিস্থাপিত হয়েছে — `gpt-4o` (সব সংস্করণ) ২০২৬ সালে অবসর নিচ্ছে। পাঠ ১৬ এর মডেল রুটিং উদাহরণে ছোট/বড় কনট্রাস্ট ধরে রাখা হয়েছে `gpt-4.1-mini` (ছোট) ও `gpt-4.1` (বড়) ব্যবহার করে। পাইথন নোটবুক এখন মডেল পরিবেশ ভেরিয়েবল থেকে নির্বাচন করে (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`), সরাসরি মডেল নাম হার্ডকোড না করে।

### নোট ও পরিচিত সীমাবদ্ধতা

- **লাইভ Azure এর বিরুদ্ধে চালানো হয়নি।** নতুন পাঠের নোটবুকগুলি শিক্ষামূলক নমুনা; নিজস্ব Microsoft Foundry / Foundry Local সেটআপে এগুলি চালিয়ে যাচাই করুন। স্মোক-টেস্ট ওয়ার্কফ্লোতে পাঠের এজেন্ট ডিপ্লয় এবং Azure OIDC সিক্রেটস (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) Foundry প্রকল্প স্কোপে **Azure AI User** রোল দিয়ে কনফিগার করা প্রয়োজন।
- **পাঠ ১৭ শুধুমাত্র স্থানীয়।** এটি কোন Foundry Responses এন্ডপয়েন্ট নেই, ফলে স্মোক-টেস্ট অ্যাকশন প্রযোজ্য নয়; নোটবুকটি আপনার ওয়ার্কস্টেশনে চালিয়ে যাচাই করুন।

## [মুক্তিপ্রাপ্ত] — ২০২৬-০৭-০৬

এই রিলিজে কোর্সটি **Azure OpenAI Responses API** তে স্থানান্তর করা হয়েছে, পণ্য নামকরণের স্ট্যান্ডার্ড Microsoft Foundry এবং Microsoft Agent Framework (MAF) তে করা হয়েছে, GitHub Models অবসরপ্রাপ্ত হয়েছে, SDK সংস্করণ আপডেট হয়েছে, এবং স্থানীয় মডেল ও Foundry তে অন্যান্য ফ্রেমওয়ার্ক হোস্টিং বিষয়ে নতুন বিষয়বস্তু যোগ হয়েছে।

### যোগ করা হয়েছে

- **মাইগ্রেশন স্কিল** — [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) এজেন্ট স্কিল (যা [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses) থেকে এসেছে) `.agents/skills/`-এ ইনস্টল করা হয়েছে, যার রেফারেন্স ও স্ক্যানার স্ক্রিপ্ট সহ।
- **Foundry Local (ডিভাইসে মডেল চালান)** — [00-course-setup/README.md](./00-course-setup/README.md) এ নতুন "বিকল্প প্রোভাইডার: Foundry Local" বিভাগ যা ইনস্টল (`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, এবং Microsoft Agent Framework এ `OpenAIChatClient` এর মাধ্যমে `FoundryLocalManager` ওয়্যারিং কভার করে।
- **Microsoft Foundry তে LangChain / LangGraph এজেন্ট হোস্টিং** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) এ নতুন সেকশন এবং চালানোযোগ্য নমুনা [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) যা `langchain-azure-ai[hosting]` ও `ResponsesHostServer` (`/responses` প্রটোকল) ব্যবহার করে, [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) ভিত্তিক।
- **Microsoft Project Opal** — [15-browser-use/README.md](./15-browser-use/README.md) এ নতুন "বাস্তব জীবনের উদাহরণ: Microsoft Project Opal" বিভাগ যা Opal কে একটি এন্টারপ্রাইজ কম্পিউটার ব্যবহার এজেন্ট হিসেবে ফ্রেমিং করে এবং কোর্স ধারণার সাথে ম্যাপ করে (মানব-ইন-দ্য-লুপ, বিশ্বাস/নিরাপত্তা, পরিকল্পনা, দক্ষতা)।
- **দ্বিতীয় পাঠ ০২ পাইথন নমুনা** — [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) যোগ করা হয়েছে (দেখুন "পরিবর্তিত" — পূর্বের Semantic Kernel নোটবুক থেকে মাইগ্রেট করা) এবং তা পাঠের README তে লিঙ্ক করা হয়েছে।
- **Models and Providers** সেকশন [STUDY_GUIDE.md](./STUDY_GUIDE.md) এ যোগ করা হয়েছে।

### পরিবর্তিত

- **চ্যাট কমপ্লিশন থেকে Responses API (পাইথন)।** সরাসরি মডেল কল করা নমুনাগুলি Chat Completions থেকে Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`) এ মাইগ্রেট করা হয়েছে, `OpenAI` ক্লায়েন্ট ব্যবহার করে স্থিতিশীল Azure OpenAI `/openai/v1/` এন্ডপয়েন্টে (কোন `api_version` নেই)। প্রভাবিত নমুনাগুলির মধ্যে রয়েছে:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — সম্পূর্ণ ফাংশন-কলিং ওয়াকথ্রু (টুল স্কিমা Responses ফরম্যাটে ফ্ল্যাটেন করা, টুল ফলাফল `function_call_output`, `max_output_tokens` ইত্যাদি হিসেবে ফেরত)।
- **GitHub Models → Azure OpenAI।** GitHub Models অবসরপ্রাপ্ত (**জুলাই ২০২৬** এ অবসর) এবং Responses API সমর্থন করে না। সমস্ত GitHub Models কোডপাথ Azure OpenAI / Microsoft Foundry তে রূপান্তরিত হয়েছে পাইথন এবং .NET নমুনাগুলিতে:
  - পাইথন: পাঠ ০৮ এর ওয়ার্কফ্লো নোটবুক (`০১`–`০৩`), পাঠ ১৪ (`১৪-handoff`, `১৪-human-loop`, `hotel_booking_workflow_sample.py`)।
  - .NET: `০১`–`০৪`, `০৭`, `০৮` `*-dotnet-agent-framework.cs` এবং সঙ্গী `.md` ডকস, এবং পাঠ ০৮ এ dotNET ওয়ার্কফ্লো নোটবুক / `.md` (`০১`–`০৩`) এখন `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` `AzureCliCredential` এর সাথে ব্যবহার করে।
- **Semantic Kernel → Microsoft Agent Framework।** পূর্বের `02-semantic-kernel.ipynb` পুনঃলিখন করে Microsoft Agent Framework এবং Azure OpenAI (Responses API) ব্যবহার করে `02-python-agent-framework-azure-openai.ipynb` নামে পুনঃনামকরণ করা হয়েছে।
- **`FoundryChatClient` + `as_agent` এ স্ট্যান্ডার্ডাইজড।** README এবং নোটবুক কোড যা `AzureAIProjectAgentProvider` উল্লেখ করত, তা পাঠ ০১ ও ফ্রেমওয়ার্কের নমুনাগুলির স্বীকৃত প্যাটার্ন `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` ও `provider.as_agent(...)` অনুসরণ করে স্ট্যান্ডার্ড করা হয়েছে। এটি পাঠ ০২–১৪ এর README ও নোটবুকগুলিতে আপডেট করা হয়েছে (যেমন, পাঠ ১৩ মেমোরি, সব পাঠ ১৪ নোটবুক, `11-agentic-protocols/code_samples/github-mcp/app.py`)।
- **পণ্য নামকরণ।** ইংরেজি বিষয়বস্তুজুড়ে পুনঃনামকরণ করা হয়েছে:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (অপরিবর্তিত: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", এবং পরিবেশ-ভেরিয়েবল নামগুলি।)
- **নির্ভরতা** ([requirements.txt](../../requirements.txt)):
  - `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0` পিন করা হয়েছে।
  - Responses API এর জন্য নূন্যতম `openai>=1.108.1` পিন করা হয়েছে।
  - `azure-ai-inference` সরিয়ে ফেলা হয়েছে (যা শুধু মাইগ্রেটেড GitHub Models নমুনাগুলিতেই ব্যবহৃত হয়)।
- **পরিবেশ কনফিগারেশন** ([.env.example](../../.env.example)): GitHub Models ভেরিয়েবলগুলি (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`) সরিয়ে ফেলা হয়েছে; `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` এবং ঐচ্ছিক `AZURE_OPENAI_API_KEY` যোগ করা হয়েছে; Microsoft Foundry নামকরণ আপডেট করা হয়েছে।
- **ডকস** — উপরের জন্য [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), এবং [STUDY_GUIDE.md](./STUDY_GUIDE.md) আপডেট করা হয়েছে (সেটআপ env ভেরিয়েবল, যাচাইকরণ স্নিপেট, প্রোভাইডার নির্দেশিকা, নামকরণ)।

### অপসৃত

- GitHub Models অনবোর্ডিং ধাপ ও পরিবেশ ভেরিয়েবলগুলি সেটআপ ডকস থেকে সরিয়ে ফেলা হয়েছে (যা Azure OpenAI / Microsoft Foundry দ্বারা প্রতিস্থাপিত)।

### নিরাপত্তা / গোপনীয়তা (সার্বজনীন শেয়ারিং ক্লিনআপ)

- আসল **Azure সাবস্ক্রিপশন আইডি**, রিসোর্স-গ্রুপ / রিসোর্স নাম এবং Bing সংযোগ আইডি কে ফাঁস হওয়া সহ, ডেভেলপার **স্থানীয় ফাইল পাথ ও ব্যবহারকারীর নাম** সহ Jupyter নোটবুক এক্সিকিউশন আউটপুট ক্লিয়ার করা হয়েছে:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- যাচাই করা হয়েছে যে কোনো API কী, টোকেন, সাবস্ক্রিপশন আইডি, বা ব্যক্তিগত পথ ট্র্যাক করা ইংরেজি সামগ্রীতে অবশিষ্ট নেই (অবশিষ্ট `GITHUB_TOKEN` রেফারেন্সগুলি ওয়ার্কফ্লোতে GitHub Actions টোকেন এবং পাঠ ১১ সেটআপে GitHub MCP সার্ভারের PAT — উভয়ই বৈধ এবং GitHub মডেলগুলির সাথে সম্পর্কিত নয়)।

### নোট এবং পরিচিত সীমাবদ্ধতা

- **চালানো বা কম্পাইল করা হয়নি।** এগুলো API/নামকরণের সঠিকতার জন্য আপডেট করা শিক্ষামূলক উদাহরণ; এগুলো লাইভ আজুর রিসোর্সের বিরুদ্ধে চালানো হয়নি, এবং .NET উদাহরণগুলি এই পরিবেশে কম্পাইল করা হয়নি। নিজের Microsoft Foundry / Azure OpenAI স্থাপনার বিরুদ্ধে যাচাই করুন।
- **মডেল স্থাপনায় Responses API সমর্থন করতে হবে।** `gpt-4.1-mini`, `gpt-4.1`, বা `gpt-5.x` মডেলের মতো একটি স্থাপন ব্যবহার করুন। পুরনো মডেলগুলি Responses এর মূল কার্যকারিতা সমর্থন করে কিন্তু সব বৈশিষ্ট্য সমর্থন করে না।
- **এজেন্ট-ফ্রেমওয়ার্ক সংস্করণ।** উদাহরণগুলি সর্বশেষ MAF (`>=1.10.0`) লক্ষ্য করে। স্বীকৃত এজেন্ট-তৈরির কল হলো `client.as_agent(...)`; API গুলো ফ্রেমওয়ার্কের প্রকাশিত ডকস এবং ইনস্টলকৃত বিল্ড এর বিরুদ্ধে যাচাই করা হয়েছে। অন্য কোনো সংস্করণ পিন করলে, পদ্ধতির উপলব্ধতা নিশ্চিত করুন (`as_agent` বনাম `create_agent`)।
- **লেসন ০৮ ওয়ার্কফ্লো নোটবুক ০৪** ইচ্ছাকৃতভাবে `AzureAIAgentClient` (যা `agent-framework-azure-ai` থেকে) ব্যবহার করছে কারণ এটি Microsoft Foundry Agent Service হোস্টেড টুলস (Bing grounding, কোড ইন্টারপ্রিটার) ব্যবহার করে; এটি ইতিমধ্যে Responses ভিত্তিক।
- **.NET ডিফল্ট স্থাপন।** দুইটি লেসন ০৮ dotNET ওয়ার্কফ্লো উদাহরণ পূর্বে একটি নির্দিষ্ট মডেল হার্ডকোড করেছিল; এখন তারা ডিফল্টভাবে `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`) ব্যবহার করে। যদি কোনো উদাহরণ মাল্টিমোডাল/ভিশন ইনপুটের উপর নির্ভরশীল হয়, তবে `AZURE_OPENAI_DEPLOYMENT` একটি উপযুক্ত মডেলে সেট করুন।
- **Foundry Local** একটি OpenAI-সঙ্গে সামঞ্জস্যপূর্ণ **Chat Completions** এন্ডপয়েন্ট প্রদান করে এবং স্থানীয় বিকাশের জন্য উদ্দেশ্যভূক্ত; পুরো Responses API বৈশিষ্ট্য সেটের জন্য Azure OpenAI / Microsoft Foundry ব্যবহার করুন।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->