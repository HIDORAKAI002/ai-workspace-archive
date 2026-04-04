# دراسة حالة: عرض REST API في إدارة واجهات برمجة التطبيقات كخادم MCP

تعد إدارة واجهات برمجة التطبيقات في Azure خدمة توفر بوابة فوق نقاط نهاية API الخاصة بك. كيف تعمل هو أن إدارة واجهات برمجة التطبيقات في Azure تعمل كوكيل أمام واجهات برمجة التطبيقات الخاصة بك ويمكنها أن تقرر ما يجب فعله مع الطلبات الواردة.

باستخدامها، تضيف مجموعة كاملة من الميزات مثل:

- **الأمان**، يمكنك استخدام كل شيء بدءًا من مفاتيح API، JWT إلى الهوية المُدارة.
- **تحديد معدل الاستخدام**، ميزة رائعة هي القدرة على تحديد عدد المكالمات التي تمر خلال وحدة زمنية معينة. يساعد هذا في ضمان حصول جميع المستخدمين على تجربة رائعة وكذلك عدم تحميل خدمتك بطلبات زائدة.
- **المقاييس وتوزيع الأحمال**. يمكنك إعداد عدد من نقاط النهاية لتوزيع الأحمال ويمكنك أيضًا تحديد كيفية "توزيع الأحمال".
- **ميزات الذكاء الاصطناعي مثل التخزين المؤقت الدلالي**، حد الرموز ومراقبة الرموز والمزيد. هذه ميزات رائعة تحسن الاستجابة وكذلك تساعدك على تتبع إنفاق الرموز. [اقرأ المزيد هنا](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities). 

## لماذا MCP + إدارة واجهات برمجة التطبيقات في Azure؟

بروتوكول سياق النموذج (Model Context Protocol) أصبح سريعًا معيارًا لتطبيقات الذكاء الاصطناعي الوكيلية وكيفية عرض الأدوات والبيانات بطريقة متسقة. تُعد إدارة واجهات برمجة التطبيقات في Azure خيارًا طبيعيًا عندما تحتاج إلى "إدارة" واجهات برمجة التطبيقات. غالبًا ما تدمج خوادم MCP مع واجهات برمجة التطبيقات الأخرى لحل الطلبات إلى أداة على سبيل المثال. لذلك فإن الجمع بين إدارة واجهات برمجة التطبيقات في Azure وMCP منطقي جدًا.

## نظرة عامة

في هذه الحالة المحددة سنتعلم كيفية عرض نقاط نهاية API كخادم MCP. من خلال القيام بذلك، يمكننا بسهولة جعل هذه النقاط جزءًا من تطبيق وكيل الذكاء الاصطناعي مع الاستفادة أيضًا من ميزات إدارة واجهات برمجة التطبيقات في Azure.

## الميزات الرئيسية

- تختار طرق النقاط النهاية التي تريد عرضها كأدوات.
- تعتمد الميزات الإضافية التي تحصل عليها على ما تقوم بتكوينه في قسم السياسات لواجهة برمجة التطبيقات الخاصة بك. ولكن هنا سنريك كيفية إضافة تحديد معدل الاستخدام.

## الخطوة التمهيدية: استيراد واجهة برمجة التطبيقات

إذا كان لديك واجهة برمجة تطبيقات في إدارة واجهات برمجة التطبيقات في Azure بالفعل، فهذا رائع، يمكنك تخطي هذه الخطوة. إذا لم يكن الأمر كذلك، راجع هذا الرابط، [استيراد واجهة برمجة التطبيقات إلى إدارة واجهات برمجة التطبيقات في Azure](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## عرض API كخادم MCP

لعرض نقاط نهاية API، لنتبع هذه الخطوات:

1. انتقل إلى بوابة Azure والعنوان التالي <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
انتقل إلى مثال إدارة واجهة برمجة التطبيقات الخاص بك.

1. في القائمة اليسرى، اختر APIs > MCP Servers > + إنشاء خادم MCP جديد.

1. في API، اختر REST API لعرضه كخادم MCP.

1. اختر عملية أو أكثر من عمليات API لعرضها كأدوات. يمكنك اختيار جميع العمليات أو عمليات محددة فقط.

    ![اختر الطرق للعرض](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. اختر **إنشاء**.

1. انتقل إلى خيار القائمة **APIs** و **MCP Servers**، يجب أن ترى التالي:

    ![عرض خادم MCP في الجزء الرئيسي](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    تم إنشاء خادم MCP وعُرضت عمليات API كأدوات. يظهر خادم MCP في لوحة خوادم MCP. تعرض عمود URL نقطة نهاية خادم MCP التي يمكنك الاتصال بها للاختبار أو داخل تطبيق عميل.

## اختياري: تكوين السياسات

لدى إدارة واجهات برمجة التطبيقات في Azure مفهوم أساسي للسياسات حيث تقوم بإعداد قواعد مختلفة لنقاط النهاية مثل تحديد معدل الاستخدام أو التخزين المؤقت الدلالي. تُكتب هذه السياسات بصيغة XML.

إليك كيفية إعداد سياسة لتحديد معدل استخدام خادم MCP الخاص بك:

1. في البوابة، ضمن APIs، اختر **MCP Servers**.

1. اختر خادم MCP الذي أنشأته.

1. في القائمة اليسرى، ضمن MCP، اختر **Policies**.

1. في محرر السياسات، أضف أو حرر السياسات التي تريد تطبيقها على أدوات خادم MCP. السياسات معرّفة بصيغة XML. على سبيل المثال، يمكنك إضافة سياسة لتحديد مكالمات أدوات خادم MCP (في هذا المثال، 5 مكالمات خلال 30 ثانية لكل عنوان IP للعميل). إليك XML سيسبب هذا التحديد:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    إليك صورة لمحرر السياسات:

    ![محرر السياسات](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## جربها

لنتأكد من أن خادم MCP الخاص بنا يعمل كما هو مقصود.

لهذا، سنستخدم Visual Studio Code وGitHub Copilot ووضع الوكيل الخاص به. سنضيف خادم MCP إلى ملف *mcp.json*. من خلال القيام بذلك، سيعمل Visual Studio Code كعميل بقدرات وكيلية وسيتمكن المستخدمون النهائيون من كتابة مطالبات والتفاعل مع الخادم المذكور.

لنرَ كيف نضيف خادم MCP في Visual Studio Code:

1. استخدم أمر MCP: **إضافة خادم من لوحة الأوامر**.

1. عند الطلب، اختر نوع الخادم: **HTTP (HTTP أو Server Sent Events)**.

1. أدخل عنوان URL الخاص بخادم MCP في إدارة واجهات برمجة التطبيقات. مثال: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (لنقطة نهاية SSE) أو **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (لنقطة نهاية MCP)، لاحظ الفرق بين وسائل النقل وهو `/sse` أو `/mcp`.

1. أدخل معرف الخادم الذي تختاره. هذه قيمة غير مهمة لكنها ستساعدك على تذكّر ما هو مثيل هذا الخادم.

1. اختر ما إذا كنت ترغب في حفظ التكوين في إعدادات مساحة العمل أو إعدادات المستخدم.

  - **إعدادات مساحة العمل** - يتم حفظ تكوين الخادم في ملف .vscode/mcp.json المتاح فقط في مساحة العمل الحالية.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    أو إذا اخترت HTTP بالتدفق كوسيلة نقل سيكون مختلفًا قليلاً:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **إعدادات المستخدم** - يتم إضافة تكوين الخادم إلى ملف *settings.json* العالمي الخاص بك ومتاحة في جميع مساحات العمل. يبدو التكوين مشابهًا لما يلي:

    ![إعدادات المستخدم](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. تحتاج أيضًا إلى إضافة تكوين، رأس للتأكد من المصادقة بشكل صحيح نحو إدارة واجهات برمجة التطبيقات في Azure. يستخدم رأسًا يسمى **Ocp-Apim-Subscription-Key**.

    - إليك كيفية إضافته إلى الإعدادات:

    ![إضافة رأس للمصادقة](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)، هذا سيؤدي إلى عرض رسالة تطلب قيمة مفتاح API التي يمكنك العثور عليها في بوابة Azure لمثيل إدارة واجهات برمجة التطبيقات في Azure الخاص بك.

   - لإضافته إلى *mcp.json* بدلًا من ذلك، يمكنك إضافته كالتالي:

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

### استخدم وضع الوكيل

الآن أصبح كل شيء معدًا إما في الإعدادات أو في *.vscode/mcp.json*. لنجربها.

يجب أن يكون هناك أيقونة أدوات كما يلي، حيث تُدرج الأدوات المعروضة من خادمك:

![أدوات من الخادم](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. انقر على أيقونة الأدوات ويجب أن ترى قائمة بالأدوات كما يلي:

    ![الأدوات](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. أدخل مطلبًا في الدردشة لاستدعاء الأداة. على سبيل المثال، إذا اخترت أداة للحصول على معلومات حول طلب، يمكنك سؤال الوكيل عن طلب. إليك مطلبًا نموذجيًا:

    ```text
    get information from order 2
    ```

    ستُعرض لك الآن أيقونة أدوات تطلب منك المتابعة لاستدعاء أداة. اختر المتابعة لتشغيل الأداة، ويجب أن ترى الآن إخراجًا كما يلي:

    ![نتيجة من المطلب](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **ما تراه أعلاه يعتمد على الأدوات التي قمت بإعدادها، لكن الفكرة هي أنك تحصل على استجابة نصية كما هو موضح أعلاه**


## المراجع

إليك كيفية معرفة المزيد:

- [دليل حول إدارة واجهات برمجة التطبيقات في Azure وMCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [عينة Python: تأمين خوادم MCP البعيدة باستخدام إدارة واجهات برمجة التطبيقات في Azure (تجريبية)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [مختبر تفويض العميل MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [استخدم امتداد Azure API Management لـ VS Code لاستيراد وإدارة APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [تسجيل واكتشاف خوادم MCP البعيدة في Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [بوابة الذكاء الاصطناعي](https://github.com/Azure-Samples/AI-Gateway) مستودع رائع يعرض العديد من قدرات الذكاء الاصطناعي مع إدارة واجهات برمجة التطبيقات في Azure
- [ورش عمل بوابة الذكاء الاصطناعي](https://azure-samples.github.io/AI-Gateway/) تحتوي على ورش عمل باستخدام بوابة Azure، وهي طريقة رائعة لبدء تقييم قدرات الذكاء الاصطناعي.

## ما هو التالي

- العودة إلى: [نظرة عامة على دراسات الحالة](./README.md)
- التالي: [وكلاء السفر في Azure AI](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**إخلاء المسؤولية**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى لتحقيق الدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو معلومات غير دقيقة. يجب اعتبار المستند الأصلي بلغته الأصلية هو المصدر الموثوق به. وللمعلومات الحساسة أو الهامة، يُنصح بالاعتماد على ترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->