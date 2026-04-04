# Azure AI ایجنٹ سروس کی ترقی

اس مشق میں، آپ Microsoft Foundry پورٹل (https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) میں Azure AI Agent سروس کے ٹولز استعمال کرتے ہوئے فلائٹ بکوکنگ کے لیے ایک ایجنٹ بنائیں گے۔ یہ ایجنٹ صارفین کے ساتھ بات چیت کر سکے گا اور پروازوں کے بارے میں معلومات فراہم کرے گا۔

## ضروریات

اس مشق کو مکمل کرنے کے لئے آپ کو درج ذیل چیزیں درکار ہیں:
1. ایک Azure اکاؤنٹ جس میں ایک فعال سبسکرپشن ہو۔ [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. آپ کے پاس Microsoft Foundry ہب بنانے کی اجازتیں ہونی چاہئیں یا کوئی ہب آپ کے لیے پہلے سے بنایا ہوا ہو۔
    - اگر آپ کا رول Contributor یا Owner ہے، تو آپ اس ٹیوٹوریل میں دیے گئے مراحل پر عمل کر سکتے ہیں۔

## Microsoft Foundry ہب بنائیں

> **نوٹ:** Microsoft Foundry پہلے Azure AI Studio کے نام سے جانا جاتا تھا۔

1. Microsoft Foundry کے اس بلاگ پوسٹ (https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) میں موجود ہدایات پر عمل کریں تاکہ ایک Microsoft Foundry ہب بنایا جا سکے۔
2. جب آپ کا پروجیکٹ بن جائے تو دکھائی جانے والی کسی بھی ٹپس کو بند کریں اور Microsoft Foundry پورٹل میں پروجیکٹ کے صفحے کا جائزہ لیں، جو مندرجہ ذیل تصویر جیسا دکھائی دے گا:

    ![مائیکروسافٹ فاونڈری پروجیکٹ](../../../translated_images/ur/azure-ai-foundry.88d0c35298348c2f.webp)

## ماڈل کو تعینات کریں

1. اپنے پروجیکٹ کے بائیں پین میں، **My assets** سیکشن میں، **Models + endpoints** صفحہ منتخب کریں۔
2. **Models + endpoints** صفحہ میں، **Model deployments** ٹیب میں، **+ Deploy model** مینو میں، **Deploy base model** منتخب کریں۔
3. فہرست میں `gpt-4o-mini` ماڈل تلاش کریں، پھر اسے منتخب کریں اور تصدیق کریں۔

    > **نوٹ**: TPM کو کم کرنے سے آپ جس سبسکرپشن کا استعمال کر رہے ہیں اس میں دستیاب کوٹا کے زیادہ استعمال سے بچنے میں مدد ملتی ہے۔

    ![ماڈل تعینات](../../../translated_images/ur/model-deployment.3749c53fb81e18fd.webp)

## ایجنٹ بنائیں

اب جب آپ نے ماڈل تعینات کر دیا ہے، تو آپ ایک ایجنٹ بنا سکتے ہیں۔ ایجنٹ ایک گفتگو پر مبنی AI ماڈل ہے جو صارفین کے ساتھ بات چیت کے لیے استعمال کیا جا سکتا ہے۔

1. اپنے پروجیکٹ کے بائیں پین میں، **Build & Customize** سیکشن میں، **Agents** صفحہ منتخب کریں۔
2. نیا ایجنٹ بنانے کے لیے **+ Create agent** پر کلک کریں۔ **Agent Setup** ڈائیلاگ باکس کے تحت:
    - ایجنٹ کے لیے ایک نام درج کریں، جیسے `FlightAgent`.
    - یقینی بنائیں کہ آپ نے پہلے جو `gpt-4o-mini` ماڈل ڈپلائمنٹ بنایا تھا وہ منتخب ہے
    - وہ **Instructions** سیٹ کریں جو آپ چاہتے ہیں کہ ایجنٹ ان پر عمل کرے۔ یہ ایک مثال ہے:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> مفصل پرامپٹس کے لیے، آپ مزید معلومات کے لیے [this repository](https://github.com/ShivamGoyal03/RoamMind) دیکھ سکتے ہیں۔
    
> مزید برآں، آپ ایجنٹ کی صلاحیتوں کو بڑھانے کے لیے **Knowledge Base** اور **Actions** شامل کر سکتے ہیں تاکہ صارف کے مطالبات کی بنیاد پر مزید معلومات فراہم کی جا سکیں اور خودکار کام کیے جا سکیں۔ اس مشق کے لیے، آپ ان مراحل کو چھوڑ سکتے ہیں۔
    
![ایجنٹ کی ترتیب](../../../translated_images/ur/agent-setup.9bbb8755bf5df672.webp)

3. نیا multi-AI ایجنٹ بنانے کے لیے بس **New Agent** پر کلک کریں۔ نیا بنایا گیا ایجنٹ پھر Agents صفحے پر دکھائی دے گا۔

## ایجنٹ کا معائنہ کریں

ایجنٹ بنانے کے بعد، آپ Microsoft Foundry پورٹل کے پلے گراؤنڈ میں اسے آزما سکتے ہیں تاکہ دیکھیں یہ صارف کے سوالات کا کس طرح جواب دیتا ہے۔

1. اپنے ایجنٹ کے **Setup** پین کے اوپر، **Try in playground** منتخب کریں۔
2. **Playground** پین میں، آپ چیٹ ونڈو میں سوالات ٹائپ کر کے ایجنٹ کے ساتھ بات چیت کر سکتے ہیں۔ مثال کے طور پر، آپ ایجنٹ سے کہہ سکتے ہیں کہ وہ Seattle سے New York کے لیے 28 تاریخ کی پروازیں تلاش کرے۔

    > **نوٹ**: چونکہ اس مشق میں حقیقی وقت کا ڈیٹا استعمال نہیں ہو رہا، اس لیے ایجنٹ درست جوابات فراہم نہ کرے۔ مقصد یہ ہے کہ ایجنٹ کی قابلیت کو جانچا جائے کہ وہ دی گئی ہدایات کی بنیاد پر صارف کے سوالات کو سمجھنے اور جواب دینے کے قابل ہے یا نہیں۔

    ![ایجنٹ پلے گراؤنڈ](../../../translated_images/ur/agent-playground.dc146586de715010.webp)

3. ایجنٹ کی جانچ کے بعد، آپ اس کی صلاحیتوں کو بڑھانے کے لیے مزید ارادے، ٹریننگ ڈیٹا، اور ایکشنز شامل کر کے اسے مزید حسبِ ضرورت بنا سکتے ہیں۔

## وسائل کی صفائی

جب آپ نے ایجنٹ کی جانچ مکمل کر لی ہو تو اضافی اخراجات سے بچنے کے لیے اسے حذف کر سکتے ہیں۔
1. [Azure portal](https://portal.azure.com) کھولیں اور اس ریسورس گروپ کے مواد دیکھیں جہاں آپ نے اس مشق میں استعمال ہونے والے ہب کے وسائل تعینات کیے تھے۔
2. ٹول بار میں، **Delete resource group** منتخب کریں۔
3. ریسورس گروپ کا نام درج کریں اور تصدیق کریں کہ آپ اسے حذف کرنا چاہتے ہیں۔

## وسائل

- [Microsoft Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Getting Started with Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Fundamentals of AI agents on Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
دستبرداری:
یہ دستاویز مصنوعی ذہانت (AI) کی ترجمہ سروس Co-op Translator (https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ ہم درستگی کے لیے کوشاں ہیں، تاہم براہِ کرم نوٹ کریں کہ خودکار تراجم میں غلطیاں یا غیر درستیاں ہو سکتی ہیں۔ اصل دستاویز کو اس کی مادری زبان میں حتمی اور معتبر ماخذ سمجھا جانا چاہیے۔ اہم معلومات کے لیے پیشہ ورانہ انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تعبیر کے لیے ہم ذمہ دار نہیں ہوں گے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->