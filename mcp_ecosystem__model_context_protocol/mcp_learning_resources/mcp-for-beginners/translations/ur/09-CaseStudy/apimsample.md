# کیس اسٹڈی: API مینجمنٹ میں REST API کو MCP سرور کے طور پر ظاہر کرنا

Azure API Management، ایک سروس ہے جو آپ کے API Endpoints کے اوپر گیٹ وے فراہم کرتی ہے۔ اس کا کام اس طرح ہے کہ Azure API Management آپ کے APIs کے سامنے ایک پراکسی کی طرح کام کرتا ہے اور آنے والی درخواستوں کے ساتھ کیا کرنا ہے اس کا فیصلہ کر سکتا ہے۔

اس کا استعمال کرکے، آپ کو کئی خصوصیات کا فائدہ حاصل ہوتا ہے جیسے:

- **سیکیورٹی**، آپ API keys، JWT سے لے کر managed identity تک سب کچھ استعمال کر سکتے ہیں۔
- **ریٹ لمٹنگ**، ایک زبردست خصوصیت یہ ہے کہ آپ فیصلہ کر سکتے ہیں کہ ایک مخصوص وقت کی مدت میں کتنی کالز ہونے دی جائیں۔ یہ یقینی بنانے میں مدد دیتا ہے کہ تمام صارفین کا تجربہ بہتر ہو اور آپ کی سروس درخواستوں سے overwhelm نہ ہو۔
- **اسکیلنگ اور لوڈ بیلنسنگ**۔ آپ endpoints کی تعداد سیٹ اپ کر سکتے ہیں تاکہ لوڈ متوازن ہو اور آپ یہ بھی فیصلہ کر سکتے ہیں کہ "load balance" کیسے کرنا ہے۔
- **AI خصوصیات جیسے semantic caching، token limit، token monitoring اور مزید**۔ یہ زبردست خصوصیات ہیں جو جوابدہی کو بہتر کرتی ہیں اور آپ کو اپنے ٹوکن کے خرچ پر نظر رکھنے میں مدد دیتی ہیں۔ [یہاں مزید پڑھیں](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)۔

## کیوں MCP + Azure API Management؟

Model Context Protocol تیزی سے ایجنٹک AI ایپس کے لیے ایک معیار بنتا جا رہا ہے اور ٹولز اور ڈیٹا کو مستقل انداز میں ظاہر کرنے کا طریقہ ہے۔ Azure API Management ایک قدرتی انتخاب ہے جب آپ کو APIs "manage" کرنی ہوں۔ MCP سرورز اکثر دیگر APIs کے ساتھ انضمام کرتے ہیں تاکہ درخواستوں کو کسی ٹول تک پہنچا سکیں مثال کے طور پر۔ لہٰذا Azure API Management اور MCP کے امتزاج کا بہت مطلب نکلتا ہے۔

## جائزہ

اس مخصوص استعمال کے کیس میں ہم سیکھیں گے کہ API endpoints کو MCP سرور کے طور پر کیسے ظاہر کیا جائے۔ ایسا کرکے، ہم ان endpoints کو آسانی سے ایک ایجنٹک ایپ کا حصہ بنا سکتے ہیں جبکہ Azure API Management کی خصوصیات سے بھی فائدہ اٹھا سکتے ہیں۔

## اہم خصوصیات

- آپ وہ endpoint طریقے منتخب کرتے ہیں جنہیں آپ ٹولز کے طور پر ظاہر کرنا چاہتے ہیں۔
- اضافی خصوصیات آپ کے API کی پالیسی سیکشن میں جو آپ ترتیب دیتے ہیں اس پر منحصر ہیں۔ لیکن یہاں ہم آپ کو دکھائیں گے کہ ریٹ لمٹنگ کیسے شامل کریں۔

## پری اسٹیپ: ایک API کو امپورٹ کریں

اگر آپ کے پاس پہلے سے Azure API Management میں API موجود ہے تو بہت اچھا، آپ اس مرحلے کو چھوڑ سکتے ہیں۔ اگر نہیں، تو اس لنک کو دیکھیں، [Azure API Management میں API کو امپورٹ کرنا](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)۔

## API کو MCP سرور کے طور پر ظاہر کریں

API endpoints کو ظاہر کرنے کے لیے، ان مراحل پر عمل کریں:

1. Azure پورٹل پر جائیں اور یہ پتہ پر جائیں <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
اپنی API Management انسٹینس پر جائیں۔

1. بائیں مینو میں، APIs > MCP Servers > + Create new MCP Server منتخب کریں۔

1. API میں، ایک REST API منتخب کریں جسے MCP سرور کے طور پر ظاہر کرنا ہے۔

1. ایک یا زیادہ API Operations منتخب کریں جو ٹولز کے طور پر ظاہر ہوں۔ آپ تمام آپریشنز یا صرف مخصوص آپریشنز منتخب کر سکتے ہیں۔

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. **Create** منتخب کریں۔

1. مینو آپشن **APIs** اور **MCP Servers** پر جائیں، آپ کو درج ذیل نظر آنا چاہیے:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP سرور تخلیق ہو چکا ہے اور API آپریشنز کو ٹولز کے طور پر ظاہر کر دیا گیا ہے۔ MCP سرور MCP Servers پین میں فہرست شدہ ہے۔ URL کالم MCP سرور کے endpoint کو دکھاتا ہے جسے آپ ٹیسٹنگ یا کلائنٹ ایپلیکیشن کے اندر کال کر سکتے ہیں۔

## اختیاری: پالیسیوں کی ترتیب

Azure API Management میں پالیسیاں کا بنیادی تصور موجود ہے جہاں آپ اپنے endpoints کے لیے مختلف قواعد سیٹ کرتے ہیں جیسے کہ ریٹ لمٹنگ یا semantic caching۔ یہ پالیسیاں XML میں لکھی جاتی ہیں۔

یہاں بتایا گیا ہے کہ آپ اپنی MCP سرور کے لیے ریٹ لمٹنگ کی پالیسی کیسے سیٹ کر سکتے ہیں:

1. پورٹل میں، APIs کے نیچے **MCP Servers** منتخب کریں۔

1. وہ MCP سرور منتخب کریں جو آپ نے بنایا ہے۔

1. بائیں مینو میں MCP کے تحت، **Policies** منتخب کریں۔

1. پالیسی ایڈیٹر میں، وہ پالیسیاں شامل یا ترمیم کریں جو آپ MCP سرور کے ٹولز پر لاگو کرنا چاہتے ہیں۔ پالیسیاں XML فارمیٹ میں بیان کی جاتی ہیں۔ مثال کے طور پر، آپ ایک پالیسی شامل کر سکتے ہیں جو MCP سرور کے ٹولز کے لیے کالز کی حد لگائے (اس مثال میں، 30 سیکنڈ میں ہر کلائنٹ IP ایڈریس کے لیے 5 کالز)۔ یہ XML ہے جو ریٹ لمٹنگ کرے گا:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    پالیسی ایڈیٹر کی ایک تصویر یہ ہے:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## آزمائیں

آئیے یقینی بنائیں کہ ہمارا MCP سرور جیسا مطلوب ہے ویسا کام کر رہا ہے۔

اس کے لیے، ہم Visual Studio Code اور GitHub Copilot اور اس کے Agent موڈ کا استعمال کریں گے۔ ہم MCP سرور کو *mcp.json* میں شامل کریں گے۔ ایسا کرکے، Visual Studio Code ایک کلائنٹ کی طرح کام کرے گا جس میں ایجنٹک صلاحیتیں ہیں اور حتمی صارف ایک پرامپٹ لکھ کر اس سرور کے ساتھ بات چیت کر سکیں گے۔

دیکھتے ہیں کہ MCP سرور کو Visual Studio Code میں کیسے شامل کیا جائے:

1. Command Palette سے MCP: **Add Server کمانڈ استعمال کریں**۔

1. جب کہا جائے، سرور کی قسم منتخب کریں: **HTTP (HTTP یا Server Sent Events)**۔

1. API Management میں MCP سرور کا URL درج کریں۔ مثال: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE endpoint کے لیے) یا **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP endpoint کے لیے)، فرق یہ ہے کہ ٹرانسپورٹس کے درمیان `/sse` یا `/mcp` ہوگا۔

1. اپنی مرضی کا سرور ID درج کریں۔ یہ اہم قدر نہیں ہے لیکن آپ کو یاد رکھنے میں مدد دے گا کہ یہ سرور انسٹانس کیا ہے۔

1. منتخب کریں کہ کنفیگریشن ورک اسپیس سیٹنگز میں محفوظ کرنی ہے یا یوزر سیٹنگز میں۔

  - **ورک اسپیس سیٹنگز** - سرور کی کنفیگریشن صرف موجودہ ورک اسپیس میں ایک .vscode/mcp.json فائل میں محفوظ ہوگی۔

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    یا اگر آپ HTTP سٹریمنگ کو بطور ٹرانسپورٹ منتخب کرتے ہیں تو یہ تھوڑا مختلف ہوگا:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **یوزر سیٹنگز** - سرور کی کنفیگریشن آپ کی گلوبل *settings.json* فائل میں شامل کی جائے گی اور تمام ورک اسپیسز میں دستیاب ہوگی۔ کنفیگریشن کچھ اس طرح ہوگی:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. آپ کو ایک کنفیگریشن ہیڈر بھی شامل کرنا ہوگا تاکہ صحیح طریقے سے Azure API Management کی تصدیق کر سکے۔ یہ ایک ہیڈر استعمال کرتا ہے جس کا نام **Ocp-Apim-Subscription-Key* ہے۔

    - یہاں بتایا گیا ہے کہ آپ اسے سیٹنگز میں کیسے شامل کر سکتے ہیں:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)، یہ آپ سے API key ویلیو پوچھنے کے لیے پرامپٹ دکھائے گا جو آپ Azure پورٹل میں اپنی Azure API Management انسٹینس سے حاصل کر سکتے ہیں۔

   - اگر آپ اسے *mcp.json* میں شامل کرنا چاہیں، تو آپ اسے اس طرح شامل کر سکتے ہیں:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### ایجنٹ موڈ استعمال کریں

اب ہم یا تو سیٹنگز میں یا *.vscode/mcp.json* میں مکمل طور پر تیار ہیں۔ آئیے اسے آزمائیں۔

ٹولز آئیکن کچھ اس طرح ہونا چاہیے، جہاں آپ کے سرور سے ظاہر کیے گئے ٹولز کی فہرست ہوگی:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. ٹولز آئیکن پر کلک کریں اور آپ کو ٹولز کی فہرست اس طرح نظر آئے گی:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. چیٹ میں ایک پرامپٹ درج کریں تاکہ ٹول کو بلایا جا سکے۔ مثال کے طور پر، اگر آپ نے ایک ٹول منتخب کیا ہے جو کسی آرڈر کی معلومات دیتا ہے، تو آپ ایجنٹ سے آرڈر کے بارے میں پوچھ سکتے ہیں۔ یہاں ایک مثال پرامپٹ ہے:

    ```text
    get information from order 2
    ```

    آپ کو اب ایک ٹولز آئیکن دکھائی دے گا جو آپ سے ٹول کال کرنے کی اجازت طلب کرے گا۔ جاری رکھنے کے لیے منتخب کریں، آپ کو اب نتیجہ کچھ اس طرح نظر آئے گا:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **آپ کو جو اوپر نظر آتا ہے وہ آپ نے جو ٹولز سیٹ اپ کیے ہیں اس پر منحصر ہے، لیکن خیال یہ ہے کہ آپ کو ایک تحریری جواب ملے جیسا کہ اوپر ہے۔**


## حوالہ جات

یہاں آپ مزید سیکھ سکتے ہیں:

- [Azure API Management اور MCP پر ٹیوٹوریل](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python نمونہ: Azure API Management کے ذریعے محفوظ ریموٹ MCP سرورز (تجربی)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP کلائنٹ آتھرائزیشن لیب](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Azure API Management ایکسٹینشن برائے VS Code کا استعمال کرکے APIs کو امپورٹ اور مینیج کریں](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API Center میں ریموٹ MCP سرورز کو رجسٹر اور دریافت کریں](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) ایک شاندار ریپوزٹری ہے جو Azure API Management کے ساتھ کئی AI صلاحیتیں دکھاتی ہے
- [AI Gateway ورکشاپس](https://azure-samples.github.io/AI-Gateway/) Azure پورٹل استعمال کرتے ہوئے ورکشاپس فراہم کرتی ہے، جو AI صلاحیتوں کو جانچنے کا بہترین طریقہ ہے۔

## اگلا کیا ہے

- واپس جائیں: [کیس اسٹڈیز جائزہ](./README.md)
- اگلا: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:  
اس دستاویز کا ترجمہ اے آئی ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے کیا گیا ہے۔ اگرچہ ہم درستگی کی کوشش کرتے ہیں، براہ کرم نوٹ کریں کہ خودکار ترجموں میں غلطیاں یا اغلاط ہو سکتی ہیں۔ اصل دستاویز اپنی مادری زبان میں مستند ماخذ سمجھا جانا چاہیے۔ اہم معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ ہم اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کے ذمہ دار نہیں ہیں۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->