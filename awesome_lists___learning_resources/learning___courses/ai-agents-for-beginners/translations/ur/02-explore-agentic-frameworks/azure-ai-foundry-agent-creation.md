# مائیکروسافٹ فاؤنڈری ایجنٹ سروس کی ترقی

اس مشق میں، آپ مائیکروسافٹ فاؤنڈری ایجنٹ سروس کے اوزار استعمال کرتے ہوئے [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) میں فلائٹ بکنگ کے لیے ایک ایجنٹ بنائیں گے۔ یہ ایجنٹ صارفین کے ساتھ بات چیت کر سکے گا اور پروازوں کے بارے میں معلومات فراہم کرے گا۔

## پیشگی ضروریات

اس مشق کو مکمل کرنے کے لیے، آپ کو درج ذیل کی ضرورت ہے:
1. ایک Azure اکاؤنٹ جس کے ساتھ فعال سبسکرپشن ہو۔ [مفت اکاؤنٹ بنائیں](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. آپ کو مائیکروسافٹ فاؤنڈری ہب بنانے کی اجازت ہونی چاہیے یا کوئی ہب آپ کے لیے بنایا گیا ہو۔
    - اگر آپ کا کردار Contributor یا Owner ہے، تو آپ اس ٹیوٹوریل میں دیے گئے مراحل کی پیروی کر سکتے ہیں۔

## مائیکروسافٹ فاؤنڈری ہب بنائیں

> **نوٹ:** مائیکروسافٹ فاؤنڈری کو پہلے Azure AI Studio کے نام سے جانا جاتا تھا۔

1. مائیکروسافٹ فاؤنڈری ہب بنانے کے لیے [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) بلاگ پوسٹ میں دی گئی رہنمائی کی پیروی کریں۔
2. جب آپ کا پروجیکٹ بن جائے، تو کسی بھی قسم کی تجاویز کو بند کریں اور مائیکروسافٹ فاؤنڈری پورٹل میں پروجیکٹ صفحہ دیکھیں، جو درج ذیل تصویر کی طرح نظر آنا چاہیے:

    ![Microsoft Foundry Project](../../../translated_images/ur/azure-ai-foundry.88d0c35298348c2f.webp)

## ماڈل تعینات کریں

1. اپنے پروجیکٹ کے لیے بائیں پین میں، **My assets** سیکشن میں، **Models + endpoints** صفحہ منتخب کریں۔
2. **Models + endpoints** صفحہ میں، **Model deployments** ٹیب میں، **+ Deploy model** مینو سے **Deploy base model** منتخب کریں۔
3. فہرست میں `gpt-4.1-mini` ماڈل تلاش کریں، پھر اسے منتخب کریں اور تصدیق کریں۔

    > **نوٹ**: TPM کم کرنے سے آپ جس سبسکرپشن کا استعمال کر رہے ہیں، اس میں دستیاب کوٹہ کے زیادہ استعمال سے بچا جا سکتا ہے۔

    ![Model Deployed](../../../translated_images/ur/model-deployment.3749c53fb81e18fd.webp)

## ایک ایجنٹ بنائیں

اب جب کہ آپ نے ماڈل تعینات کر لیا ہے، آپ ایک ایجنٹ بنا سکتے ہیں۔ ایجنٹ ایک مکالماتی AI ماڈل ہے جسے صارفین کے ساتھ بات چیت کے لیے استعمال کیا جاتا ہے۔

1. اپنے پروجیکٹ کے لیے بائیں پین میں، **Build & Customize** سیکشن میں، **Agents** صفحہ منتخب کریں۔
2. نیا ایجنٹ بنانے کے لیے **+ Create agent** پر کلک کریں۔ **Agent Setup** ڈائیلاگ باکس میں:
    - ایجنٹ کے لیے ایک نام درج کریں، جیسے `FlightAgent`۔
    - اس بات کو یقینی بنائیں کہ آپ نے جو `gpt-4.1-mini` ماڈل تعینات کیا تھا، وہ منتخب ہے۔
    - **Instructions** کو اس مطابق سیٹ کریں جس پر آپ چاہتے ہیں کہ ایجنٹ عمل کرے۔ یہاں ایک مثال ہے:
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
> تفصیلی پرامپٹ کے لیے، آپ مزید معلومات کے لیے [اس ذخیرہ](https://github.com/ShivamGoyal03/RoamMind) کو دیکھ سکتے ہیں۔
    
> اس کے علاوہ، آپ ایجنٹ کی صلاحیتوں کو بہتر بنانے کے لیے **Knowledge Base** اور **Actions** بھی شامل کر سکتے ہیں تاکہ وہ مزید معلومات فراہم کرے اور صارف کے مطالبات کی بنیاد پر خودکار کام انجام دے۔ اس مشق کے لیے، آپ ان مراحل کو چھوڑ سکتے ہیں۔
    
![Agent Setup](../../../translated_images/ur/agent-setup.9bbb8755bf5df672.webp)

3. نیا ملٹی-AI ایجنٹ بنانے کے لیے صرف **New Agent** پر کلک کریں۔ نیا بنایا گیا ایجنٹ پھر Agents صفحہ پر ظاہر ہو جائے گا۔


## ایجنٹ کا ٹیسٹ کریں

ایجنٹ بنانے کے بعد، آپ مائیکروسافٹ فاؤنڈری پورٹل کے پلے گراؤنڈ میں صارف کے سوالات پر اس کے ردعمل کو آزما سکتے ہیں۔

1. اپنے ایجنٹ کی **Setup** پین کے اوپر، **Try in playground** منتخب کریں۔
2. **Playground** پین میں، آپ چیٹ ونڈو میں سوالات لکھ کر ایجنٹ سے بات چیت کر سکتے ہیں۔ مثال کے طور پر، آپ ایجنٹ سے 28 تاریخ کو سیئٹل سے نیو یارک کے لیے پروازیں تلاش کرنے کو کہہ سکتے ہیں۔

    > **نوٹ**: چونکہ اس مشق میں کوئی حقیقی وقت کا ڈیٹا استعمال نہیں ہو رہا، ایجنٹ درست جوابات فراہم نہیں کر سکتا۔ مقصد ایجنٹ کی صلاحیت کا امتحان لینا ہے کہ وہ صارف کے سوالات کو دی گئی ہدایات کی بنیاد پر سمجھ اور جواب دے سکے۔

    ![Agent Playground](../../../translated_images/ur/agent-playground.dc146586de715010.webp)

3. ایجنٹ کا ٹیسٹ کرنے کے بعد، آپ اسے مزید تخصیص دے سکتے ہیں جیسے مزید ارادے، تربیتی ڈیٹا، اور عمل شامل کرنا تاکہ اس کی صلاحیتوں کو بڑھایا جا سکے۔

## وسائل کی صفائی

جب آپ ایجنٹ کا ٹیسٹ ختم کر لیں، اضافی اخراجات سے بچنے کے لیے اسے حذف کر سکتے ہیں۔
1. [Azure portal](https://portal.azure.com) کھولیں اور وہ resource group دیکھیں جہاں آپ نے اس مشق میں استعمال ہونے والے ہب وسائل تعینات کیے تھے۔
2. ٹول بار پر، **Delete resource group** منتخب کریں۔
3. resource group کا نام درج کریں اور اسے حذف کرنے کی تصدیق کریں۔

## وسائل

- [Microsoft Foundry دستاویزات](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry پورٹل](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry کے ساتھ شروع کریں](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure پر AI ایجنٹس کی بنیادی باتیں](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->