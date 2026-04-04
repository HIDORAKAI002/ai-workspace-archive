# خادم MCP للطقس

هذا نموذج لخادم MCP بلغة بايثون ينفذ أدوات الطقس مع استجابات وهمية. يمكن استخدامه كأساس لخادم MCP الخاص بك. يتضمن الميزات التالية:

- **أداة الطقس**: أداة توفر معلومات الطقس الوهمية بناءً على الموقع المعطى.
- **أداة استنساخ Git**: أداة تستنسخ مستودع Git إلى مجلد محدد.
- **أداة فتح VS Code**: أداة تفتح مجلداً في VS Code أو VS Code Insiders.
- **الاتصال بمنشئ الوكلاء**: ميزة تتيح لك ربط خادم MCP بمنشئ الوكلاء للاختبار وتصحيح الأخطاء.
- **التصحيح في [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ميزة تتيح لك تصحيح خادم MCP باستخدام MCP Inspector.

## البدء مع قالب خادم MCP للطقس

> **المتطلبات المسبقة**
>
> لتشغيل خادم MCP على جهاز التطوير المحلي الخاص بك، ستحتاج إلى:
>
> - [بايثون](https://www.python.org/)
> - [Git](https://git-scm.com/) (مطلوب لأداة git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) أو [VS Code Insiders](https://code.visualstudio.com/insiders/) (مطلوب لأداة open_in_vscode)
> - (*اختياري - إذا كنت تفضل uv*) [uv](https://github.com/astral-sh/uv)
> - [إضافة مصحح بايثون](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## إعداد البيئة

هناك طريقتان لإعداد البيئة لهذا المشروع. يمكنك اختيار أي منهما بناءً على تفضيلاتك.

> ملاحظة: قم بإعادة تحميل VSCode أو الطرفية للتأكد من استخدام Python للبيئة الافتراضية بعد إنشاء البيئة الافتراضية.

| الطريقة | الخطوات |
| -------- | ----- |
| باستخدام `uv` | 1. أنشئ البيئة الافتراضية: `uv venv` <br>2. نفّذ أمر VSCode "***Python: Select Interpreter***" واختر بايثون من البيئة الافتراضية التي أنشأتها <br>3. ثبّت التبعيات (بما في ذلك تبعيات التطوير): `uv pip install -r pyproject.toml --extra dev` |
| باستخدام `pip` | 1. أنشئ البيئة الافتراضية: `python -m venv .venv` <br>2. نفّذ أمر VSCode "***Python: Select Interpreter***" واختر بايثون من البيئة الافتراضية التي أنشأتها<br>3. ثبّت التبعيات (بما في ذلك تبعيات التطوير): `pip install -e .[dev]` | 

بعد إعداد البيئة، يمكنك تشغيل الخادم على جهاز التطوير المحلي عبر منشئ الوكلاء كعميل MCP للبدء:
1. افتح لوحة التصحيح في VS Code. اختر `Debug in Agent Builder` أو اضغط على `F5` لبدء تصحيح خادم MCP.
2. استخدم منشئ الوكلاء AI Toolkit لاختبار الخادم باستخدام [هذا الطلب](../../../../../../../../../../../open_prompt_builder). سيتم ربط الخادم تلقائياً بمنشئ الوكلاء.
3. انقر على `Run` لاختبار الخادم باستخدام الطلب.

**تهانينا**! لقد نجحت في تشغيل خادم MCP للطقس على جهاز التطوير المحلي الخاص بك عبر منشئ الوكلاء كعميل MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ما يتضمنه القالب

| المجلد / الملف| المحتويات                                   |
| ------------ | -------------------------------------------- |
| `.vscode`    | ملفات VSCode للتصحيح                         |
| `.aitk`      | إعدادات AI Toolkit                           |
| `src`        | الشيفرة المصدرية لخادم MCP للطقس             |

## كيفية تصحيح خادم MCP للطقس

> ملاحظات:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) هو أداة مطور بصرية لاختبار وتصحيح خوادم MCP.
> - تدعم جميع أوضاع التصحيح نقاط التوقف، لذا يمكنك إضافة نقاط توقف إلى كود تنفيذ الأداة.

## الأدوات المتاحة

### أداة الطقس
توفر أداة `get_weather` معلومات طقس وهمية لموقع محدد.

| المتغير | النوع | الوصف |
| --------- | ---- | ----------- |
| `location` | string | الموقع المطلوب الحصول على الطقس له (مثل اسم المدينة، الولاية، أو الإحداثيات) |

### أداة استنساخ Git
تقوم أداة `git_clone_repo` باستنساخ مستودع Git إلى مجلد محدد.

| المتغير | النوع | الوصف |
| --------- | ---- | ----------- |
| `repo_url` | string | عنوان URL لمستودع git لاستنساخه |
| `target_folder` | string | مسار المجلد الذي سيُستنسخ إليه المستودع |

تعيد الأداة كائن JSON يحتوي على:
- `success`: قيمة منطقية تشير إلى نجاح العملية
- `target_folder` أو `error`: مسار المستودع المستنسخ أو رسالة الخطأ

### أداة فتح VS Code
تقوم أداة `open_in_vscode` بفتح مجلد في تطبيق VS Code أو VS Code Insiders.

| المتغير | النوع | الوصف |
| --------- | ---- | ----------- |
| `folder_path` | string | مسار المجلد المراد فتحه |
| `use_insiders` | boolean (اختياري) | هل تستخدم VS Code Insiders بدلاً من VS Code العادي |

تعيد الأداة كائن JSON يحتوي على:
- `success`: قيمة منطقية تشير إلى نجاح العملية
- `message` أو `error`: رسالة تأكيد أو رسالة خطأ

| وضع التصحيح | الوصف | خطوات التصحيح |
| ---------- | ----------- | --------------- |
| منشئ الوكلاء | تصحيح خادم MCP في منشئ الوكلاء عبر AI Toolkit. | 1. افتح لوحة التصحيح في VS Code. اختر `Debug in Agent Builder` واضغط على `F5` لبدء التصحيح.<br>2. استخدم منشئ الوكلاء AI Toolkit لاختبار الخادم باستخدام [هذا الطلب](../../../../../../../../../../../open_prompt_builder). سيتم ربط الخادم تلقائياً بمنشئ الوكلاء.<br>3. انقر على `Run` لاختبار الخادم باستخدام الطلب. |
| MCP Inspector | تصحيح خادم MCP باستخدام MCP Inspector. | 1. ثبّت [Node.js](https://nodejs.org/)<br> 2. إعداد Inspector: `cd inspector` && `npm install` <br> 3. افتح لوحة التصحيح في VS Code. اختر `Debug SSE in Inspector (Edge)` أو `Debug SSE in Inspector (Chrome)`. اضغط F5 لبدء التصحيح.<br> 4. عند إطلاق MCP Inspector في المتصفح، انقر على زر `Connect` لربط هذا الخادم.<br> 5. بعدها يمكنك `List Tools`، اختيار أداة، إدخال المتغيرات، و`Run Tool` لتصحيح كود خادمك.<br> |

## المنافذ الافتراضية والتخصيصات

| وضع التصحيح | المنافذ | التعريفات | التخصيصات | ملاحظة |
| ---------- | ----- | ------------ | -------------- |-------------- |
| منشئ الوكلاء | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | حرّر [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) لتغيير المنافذ أعلاه. | لا يوجد |
| MCP Inspector | 3001 (الخادم); 5173 و3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | حرّر [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) لتغيير المنافذ أعلاه.| لا يوجد |

## الملاحظات

إذا كان لديك أي ملاحظات أو اقتراحات حول هذا القالب، يرجى فتح تقرير مشكلة على [مستودع AI Toolkit على GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**إخلاء المسؤولية**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى لتحقيق الدقة، يُرجى العلم بأن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. بالنسبة للمعلومات الهامة، يُوصى بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير خاطئ ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->