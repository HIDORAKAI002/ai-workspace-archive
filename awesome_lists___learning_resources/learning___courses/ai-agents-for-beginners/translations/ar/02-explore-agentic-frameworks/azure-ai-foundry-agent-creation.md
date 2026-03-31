# تطوير خدمة وكيل Azure AI

في هذا التمرين، تستخدم أدوات خدمة وكيل Azure AI في [بوابة Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) لإنشاء وكيل لحجز الرحلات الجوية. سيكون الوكيل قادرًا على التفاعل مع المستخدمين وتقديم معلومات حول الرحلات.

## المتطلبات الأساسية

لإكمال هذا التمرين، تحتاج إلى ما يلي:
1. حساب Azure مع اشتراك نشط. [إنشاء حساب مجاني](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. تحتاج إلى أذونات لإنشاء مركز Microsoft Foundry أو أن يتم إنشاؤه لك.
    - إذا كان دورك هو المساهم أو المالك، يمكنك اتباع الخطوات في هذا الدليل.

## إنشاء مركز Microsoft Foundry

> **ملاحظة:** كان يُعرف Microsoft Foundry سابقًا باسم Azure AI Studio.

1. اتبع هذه الإرشادات من منشور المدونة الخاص بـ [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) لإنشاء مركز Microsoft Foundry.
2. عند إنشاء مشروعك، أغلق أي نصائح تظهر وراجع صفحة المشروع في بوابة Microsoft Foundry، والتي ينبغي أن تبدو مشابهة للصورة التالية:

    ![مشروع Microsoft Foundry](../../../translated_images/ar/azure-ai-foundry.88d0c35298348c2f.webp)

## نشر نموذج

1. في اللوحة على اليسار لمشروعك، في قسم **الأصول الخاصة بي**، حدد صفحة **النماذج + النقاط الطرفية**.
2. في صفحة **النماذج + النقاط الطرفية**، في علامة التبويب **نشر النماذج**، في قائمة **+ نشر نموذج**، حدد **نشر نموذج أساسي**.
3. ابحث عن نموذج `gpt-4o-mini` في القائمة، ثم حدده وأكد اختياره.

    > **ملاحظة**: تقليل TPM يساعد على تجنب الإفراط في استخدام الحصة المتاحة في الاشتراك الذي تستخدمه.

    ![النموذج المنشور](../../../translated_images/ar/model-deployment.3749c53fb81e18fd.webp)

## إنشاء وكيل

الآن بعد أن نشرت نموذجًا، يمكنك إنشاء وكيل. الوكيل هو نموذج ذكاء اصطناعي محادثة يمكن استخدامه للتفاعل مع المستخدمين.

1. في اللوحة على اليسار لمشروعك، في قسم **البناء والتخصيص**، حدد صفحة **الوكلاء**.
2. انقر على **+ إنشاء وكيل** لإنشاء وكيل جديد. ضمن مربع حوار **إعداد الوكيل**:
    - أدخل اسمًا للوكيل، مثل `FlightAgent`.
    - تأكد من تحديد نشر نموذج `gpt-4o-mini` الذي قمت بإنشائه سابقًا.
    - عيّن **التعليمات** حسب الموجه الذي تريد أن يتبعه الوكيل. إليك مثالًا:
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
> [!ملاحظة]
> للحصول على موجه مفصل، يمكنك الاطلاع على [هذا المستودع](https://github.com/ShivamGoyal03/RoamMind) لمزيد من المعلومات.
    
> علاوة على ذلك، يمكنك إضافة **قاعدة المعرفة** و**الإجراءات** لتعزيز قدرات الوكيل لتقديم المزيد من المعلومات وأداء مهام آلية بناءً على طلبات المستخدم. في هذا التمرين، يمكنك تخطي هذه الخطوات.
    
![إعداد الوكيل](../../../translated_images/ar/agent-setup.9bbb8755bf5df672.webp)

3. لإنشاء وكيل متعدد الذكاء الاصطناعي جديد، ما عليك سوى النقر على **وكيل جديد**. سيتم عرض الوكيل الذي تم إنشاؤه حديثًا على صفحة الوكلاء.

## اختبار الوكيل

بعد إنشاء الوكيل، يمكنك اختباره لمعرفة كيفية استجابته لاستفسارات المستخدمين في ملعب بوابة Microsoft Foundry.

1. في أعلى لوحة **الإعداد** لوكيلك، حدد **التجربة في الملعب**.
2. في لوحة **الملعب**، يمكنك التفاعل مع الوكيل عن طريق كتابة الأسئلة في نافذة الدردشة. على سبيل المثال، يمكنك أن تطلب من الوكيل البحث عن رحلات من سياتل إلى نيويورك في 28 من الشهر.

    > **ملاحظة**: قد لا يقدّم الوكيل ردودًا دقيقة، حيث لا يتم استخدام بيانات الوقت الحقيقي في هذا التمرين. الهدف هو اختبار قدرة الوكيل على فهم والاستجابة لاستفسارات المستخدم بناءً على التعليمات المقدمة.

    ![ملعب الوكيل](../../../translated_images/ar/agent-playground.dc146586de715010.webp)

3. بعد اختبار الوكيل، يمكنك تخصيصه أكثر بإضافة المزيد من النوايا وبيانات التدريب والإجراءات لتعزيز قدراته.

## تنظيف الموارد

عند الانتهاء من اختبار الوكيل، يمكنك حذفه لتجنب تكبد تكاليف إضافية.
1. افتح [بوابة Azure](https://portal.azure.com) واستعرض محتويات مجموعة الموارد حيث نشرت الموارد الخاصة بالمركز المستخدمة في هذا التمرين.
2. على شريط الأدوات، حدد **حذف مجموعة الموارد**.
3. أدخل اسم مجموعة الموارد و أكد أنك تريد حذفها.

## الموارد

- [توثيق Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [بوابة Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [البدء مع Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [أساسيات وكلاء الذكاء الاصطناعي على Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:  
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى جاهدين للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية هو المصدر الموثوق. للمعلومات الهامة، يُنصح بالترجمة البشرية المهنية. نحن غير مسؤولين عن أي سوء فهم أو تحريف ينشأ عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->