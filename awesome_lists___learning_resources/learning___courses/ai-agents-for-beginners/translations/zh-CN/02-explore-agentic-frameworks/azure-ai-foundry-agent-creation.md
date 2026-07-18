# Microsoft Foundry 代理服务开发

在本练习中，您将使用 [Microsoft Foundry 门户](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) 中的 Microsoft Foundry 代理服务工具来创建一个航班预订代理。该代理将能够与用户互动并提供航班相关信息。

## 前提条件

要完成本练习，您需要以下内容：
1. 一个具有活动订阅的 Azure 账户。 [免费创建账户](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)。
2. 您需要有权限创建 Microsoft Foundry 集线器，或者已有人为您创建好。
    - 如果您的角色是参与者或所有者，可按照本教程中的步骤操作。

## 创建 Microsoft Foundry 集线器

> **注意:** Microsoft Foundry 以前称为 Azure AI Studio。

1. 请参考 [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) 博客文章中的指南，创建 Microsoft Foundry 集线器。
2. 项目创建完成后，关闭任何显示的提示，并查看 Microsoft Foundry 门户中的项目页面，应该类似如下图片：

    ![Microsoft Foundry Project](../../../translated_images/zh-CN/azure-ai-foundry.88d0c35298348c2f.webp)

## 部署模型

1. 在项目左侧面板的 <strong>我的资产</strong> 部分，选择 **模型 + 终端** 页面。
2. 在 **模型 + 终端** 页面中，切换到 <strong>模型部署</strong> 标签页，在 **+ 部署模型** 菜单中选择 <strong>部署基础模型</strong>。
3. 在列表中搜索 `gpt-4.1-mini` 模型，选择并确认。

    > <strong>注意</strong>: 降低 TPM 有助于避免过度使用您所用订阅中的配额。

    ![Model Deployed](../../../translated_images/zh-CN/model-deployment.3749c53fb81e18fd.webp)

## 创建代理

现在您已经部署了一个模型，就可以创建代理了。代理是可用于与用户交互的对话式 AI 模型。

1. 在项目左侧面板的 <strong>构建与自定义</strong> 部分，选择 <strong>代理</strong> 页面。
2. 点击 **+ 创建代理** 新建代理。在 <strong>代理设置</strong> 对话框中：
    - 输入代理名称，例如 `FlightAgent`。
    - 确保先前创建的 `gpt-4.1-mini` 模型部署被选中。
    - 按照您希望代理遵循的提示设置 <strong>说明</strong>。示例如下：
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
> 有关详细提示，您可以查看[这个仓库](https://github.com/ShivamGoyal03/RoamMind)获取更多信息。
    
> 此外，您还可以添加 <strong>知识库</strong> 和 <strong>操作</strong> 来增强代理的能力，以根据用户请求提供更多信息和执行自动任务。此练习可以跳过这些步骤。
    
![Agent Setup](../../../translated_images/zh-CN/agent-setup.9bbb8755bf5df672.webp)

3. 若要创建新的多 AI 代理，只需点击 <strong>新建代理</strong>。新建代理将在代理页面显示。


## 测试代理

创建代理后，您可以在 Microsoft Foundry 门户的游乐场测试代理对用户查询的响应。

1. 在代理的 <strong>设置</strong> 面板顶部，选择 <strong>在游乐场中试用</strong>。
2. 在 <strong>游乐场</strong> 面板的聊天窗口中，您可以与代理互动。例如，询问代理在28日从西雅图飞往纽约的航班情况。

    > <strong>注意</strong>: 由于本练习未使用实时数据，代理可能不会提供准确回复。目的是测试代理基于指令理解和响应用户查询的能力。

    ![Agent Playground](../../../translated_images/zh-CN/agent-playground.dc146586de715010.webp)

3. 测试代理后，您可以通过添加更多意图、训练数据和操作进一步定制代理，增强其功能。

## 清理资源

测试完成后，您可以删除代理以避免产生额外费用。
1. 打开 [Azure 门户](https://portal.azure.com)，查看您在本练习中用于部署集线器资源的资源组内容。
2. 在工具栏上选择 <strong>删除资源组</strong>。
3. 输入资源组名称，并确认删除。

## 相关资源

- [Microsoft Foundry 文档](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 门户](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 入门](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 上 AI 代理基础](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->