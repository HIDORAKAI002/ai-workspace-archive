# خادم MCP الخاص بالطقس

هذا نموذج لخادم MCP بلغة بايثون ينفذ أدوات الطقس مع استجابات وهمية. يمكن استخدامه كهيكل أساسي لخادم MCP الخاص بك. ويشمل الميزات التالية:

- **أداة الطقس**: أداة تقدم معلومات الطقس وهمية بناءً على الموقع المعطى.
- **الاتصال بمنشئ الوكيل**: ميزة تسمح لك بتوصيل خادم MCP بمنشئ الوكيل للاختبار وتصحيح الأخطاء.
- **التصحيح في [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ميزة تتيح لك تصحيح خادم MCP باستخدام MCP Inspector.

## البدء بنموذج خادم MCP الخاص بالطقس

> **المتطلبات الأساسية**
>
> لتشغيل خادم MCP على جهازك المحلي للتطوير، ستحتاج إلى:
>
> - [بايثون](https://www.python.org/)
> - (*اختياري - إذا كنت تفضل uv*) [uv](https://github.com/astral-sh/uv)
> - [امتداد مصحح بايثون](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## إعداد البيئة

هناك طريقتان لإعداد البيئة لهذا المشروع. يمكنك اختيار أي منهما وفقاً لتفضيلك.

> ملاحظة: أعد تحميل VSCode أو الطرفية للتأكد من استخدام بايثون البيئة الافتراضية بعد إنشائها.

| الطريقة | الخطوات |
| -------- | ----- |
| باستخدام `uv` | 1. إنشاء البيئة الافتراضية: `uv venv` <br>2. تشغيل أمر VSCode "***Python: Select Interpreter***" واختيار بايثون من البيئة الافتراضية المنشأة <br>3. تثبيت الاعتمادات (بما في ذلك اعتماديات التطوير): `uv pip install -r pyproject.toml --extra dev` |
| باستخدام `pip` | 1. إنشاء البيئة الافتراضية: `python -m venv .venv` <br>2. تشغيل أمر VSCode "***Python: Select Interpreter***" واختيار بايثون من البيئة الافتراضية المنشأة<br>3. تثبيت الاعتمادات (بما في ذلك اعتماديات التطوير): `pip install -e .[dev]` |

بعد إعداد البيئة، يمكنك تشغيل الخادم على جهازك المحلي للتطوير عبر منشئ الوكيل كعميل MCP للبدء:
1. افتح لوحة التصحيح في VS Code. اختر `Debug in Agent Builder` أو اضغط `F5` لبدء تصحيح خادم MCP.
2. استخدم Microsoft Foundry Toolkit Agent Builder لاختبار الخادم مع [هذا النص](../../../../../../../../../../../open_prompt_builder). سيتم توصيل الخادم تلقائياً بمنشئ الوكيل.
3. انقر على `Run` لاختبار الخادم باستخدام النص.

**تهانينا**! لقد قمت بتشغيل خادم MCP الخاص بالطقس بنجاح على جهازك المحلي عبر منشئ الوكيل كعميل MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## المحتويات المدرجة في النموذج

| المجلد / الملف | المحتويات                                      |
| -------------- | --------------------------------------------- |
| `.vscode`      | ملفات VSCode الخاصة بالتصحيح                   |
| `.aitk`        | إعدادات Microsoft Foundry Toolkit             |
| `src`          | شفرة المصدر لخادم MCP الخاص بالطقس             |

## كيفية تصحيح خادم MCP الخاص بالطقس

> ملاحظات:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) هو أداة بصرية للمطورين لاختبار وتصحيح خوادم MCP.
> - جميع أوضاع التصحيح تدعم نقاط التوقف، لذا يمكنك إضافة نقاط توقف إلى شفرة تنفيذ الأداة.

| وضع التصحيح | الوصف | خطوات التصحيح |
| ------------ | --------- | -------------- |
| منشئ الوكيل | تصحيح خادم MCP في منشئ الوكيل عبر Microsoft Foundry Toolkit. | 1. افتح لوحة التصحيح في VS Code. اختر `Debug in Agent Builder` واضغط `F5` لبدء تصحيح خادم MCP.<br>2. استخدم Microsoft Foundry Toolkit Agent Builder لاختبار الخادم مع [هذا النص](../../../../../../../../../../../open_prompt_builder). سيتم توصيل الخادم تلقائياً بمنشئ الوكيل.<br>3. انقر على `Run` لاختبار الخادم باستخدام النص. |
| MCP Inspector | تصحيح خادم MCP باستخدام MCP Inspector. | 1. قم بتثبيت [Node.js](https://nodejs.org/)<br> 2. إعداد Inspector: `cd inspector` && `npm install` <br> 3. افتح لوحة التصحيح في VS Code. اختر `Debug SSE in Inspector (Edge)` أو `Debug SSE in Inspector (Chrome)`. اضغط F5 لبدء التصحيح.<br> 4. عند تشغيل MCP Inspector في المتصفح، انقر على زر `Connect` لتوصيل هذا الخادم MCP.<br> 5. بعدها يمكنك `List Tools`، اختيار أداة، إدخال المعلمات، و`Run Tool` لتصحيح شفرة الخادم.<br> |

## المنافذ الافتراضية والتخصيصات

| وضع التصحيح | المنافذ | التعريفات | التخصيصات | ملاحظة |
| ------------ | ------- | --------- | --------- | -------- |
| منشئ الوكيل | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | حرر [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) لتغيير المنافذ السابقة. | لا يوجد |
| MCP Inspector | 3001 (الخادم); 5173 و 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | حرر [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) لتغيير المنافذ السابقة. | لا يوجد |

## الملاحظات

إذا كانت لديك أية ملاحظات أو اقتراحات لهذا النموذج، يرجى فتح مسألة على [مستودع Microsoft Foundry Toolkit على GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->