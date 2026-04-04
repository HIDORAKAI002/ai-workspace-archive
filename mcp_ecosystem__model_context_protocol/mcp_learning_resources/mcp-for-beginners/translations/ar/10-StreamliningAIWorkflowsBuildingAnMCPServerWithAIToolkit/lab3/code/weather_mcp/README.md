# خادم Weather MCP

هذا نموذج خادم MCP بلغة بايثون ينفذ أدوات الطقس مع استجابات وهمية. يمكن استخدامه كهيكل أساسي لإنشاء خادم MCP خاص بك. يتضمن الميزات التالية:

- **أداة الطقس**: أداة توفر معلومات الطقس الوهمية بناءً على الموقع المعطى.
- **الاتصال ب Agent Builder**: ميزة تتيح لك ربط خادم MCP بـ Agent Builder من أجل الاختبار وتصحيح الأخطاء.
- **تصحيح الأخطاء باستخدام [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ميزة تسمح لك بتصحيح خادم MCP باستخدام MCP Inspector.

## البدء باستخدام قالب Weather MCP Server

> **المتطلبات الأساسية**
>
> لتشغيل خادم MCP على جهاز التطوير المحلي الخاص بك، ستحتاج إلى:
>
> - [بايثون](https://www.python.org/)
> - (*اختياري - إذا كنت تفضل uv*) [uv](https://github.com/astral-sh/uv)
> - [امتداد Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## إعداد البيئة

هناك طريقتان لإعداد البيئة لهذا المشروع. يمكنك اختيار أي منهما بناءً على تفضيلاتك.

> ملاحظة: أعد تحميل VSCode أو الطرفية لضمان استخدام بايثون لبيئة العمل الافتراضية بعد إنشائها.

| النهج | الخطوات |
| -------- | ----- |
| استخدام `uv` | 1. إنشاء بيئة افتراضية: `uv venv` <br>2. تشغيل أمر VSCode "***Python: Select Interpreter***" واختر بايثون من البيئة الافتراضية التي تم إنشاؤها <br>3. تثبيت التبعيات (بما في ذلك تبعيات التطوير): `uv pip install -r pyproject.toml --extra dev` |
| استخدام `pip` | 1. إنشاء بيئة افتراضية: `python -m venv .venv` <br>2. تشغيل أمر VSCode "***Python: Select Interpreter***" واختر بايثون من البيئة الافتراضية التي تم إنشاؤها<br>3. تثبيت التبعيات (بما في ذلك تبعيات التطوير): `pip install -e .[dev]` |

بعد إعداد البيئة، يمكنك تشغيل الخادم على جهاز التطوير المحلي الخاص بك عبر Agent Builder كعميل MCP للبدء:
1. افتح لوحة تصحيح الأخطاء في VS Code. اختر `Debug in Agent Builder` أو اضغط `F5` لبدء تصحيح خادم MCP.
2. استخدم Agent Builder في AI Toolkit لاختبار الخادم باستخدام [هذا الطلب](../../../../../../../../../../../open_prompt_builder). سيتم توصيل الخادم تلقائيًا بـ Agent Builder.
3. انقر `Run` لاختبار الخادم باستخدام الطلب.

**تهانينا**! لقد قمت بتشغيل خادم Weather MCP بنجاح على جهاز التطوير المحلي الخاص بك عبر Agent Builder كعميل MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ماذا يتضمن القالب

| المجلد / الملف | المحتويات                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | ملفات VSCode لتصحيح الأخطاء                   |
| `.aitk`      | إعدادات لـ AI Toolkit                         |
| `src`        | شفرة المصدر لخادم Weather MCP Server          |

## كيفية تصحيح خادم Weather MCP

> ملاحظات:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) هو أداة تطوير مرئية لاختبار وتصحيح أخطاء خوادم MCP.
> - تدعم جميع أوضاع التصحيح نقاط التوقف، لذا يمكنك إضافة نقاط توقف إلى كود تنفيذ الأداة.

| وضع التصحيح | الوصف | خطوات التصحيح |
| ---------- | ----------- | --------------- |
| Agent Builder | تصحيح خادم MCP داخل Agent Builder عبر AI Toolkit. | 1. افتح لوحة تصحيح الأخطاء في VS Code. اختر `Debug in Agent Builder` واضغط `F5` لبدء تصحيح خادم MCP.<br>2. استخدم Agent Builder في AI Toolkit لاختبار الخادم باستخدام [هذا الطلب](../../../../../../../../../../../open_prompt_builder). سيتم توصيل الخادم تلقائيًا بـ Agent Builder.<br>3. انقر `Run` لاختبار الخادم باستخدام الطلب. |
| MCP Inspector | تصحيح خادم MCP باستخدام MCP Inspector. | 1. تثبيت [Node.js](https://nodejs.org/)<br> 2. إعداد Inspector: `cd inspector` && `npm install` <br> 3. افتح لوحة تصحيح الأخطاء في VS Code. اختر `Debug SSE in Inspector (Edge)` أو `Debug SSE in Inspector (Chrome)` واضغط F5 لبدء التصحيح.<br> 4. عند تشغيل MCP Inspector في المتصفح، انقر زر `Connect` لربط هذا الخادم MCP.<br> 5. بعدها يمكنك `List Tools`، اختيار أداة، إدخال المعلمات، و`Run Tool` لتصحيح كود الخادم الخاص بك.<br> |

## المنافذ الافتراضية والتخصيصات

| وضع التصحيح | المنافذ | التعريفات | التخصيصات | ملاحظة |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | قم بتحرير [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) لتغيير المنافذ أعلاه. | لا ينطبق |
| MCP Inspector | 3001 (الخادم)؛ 5173 و3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | قم بتحرير [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) لتغيير المنافذ أعلاه.| لا ينطبق |

## الملاحظات

إذا كان لديك أي ملاحظات أو اقتراحات حول هذا القالب، الرجاء فتح قضية على [مستودع AI Toolkit في GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى لتحقيق الدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الموثوق. للمعلومات الهامة، يوصى بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->