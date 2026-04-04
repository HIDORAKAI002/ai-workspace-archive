# Azure AI 代理服务开发

在本练习中，您将使用 [Microsoft Foundry 门户](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) 中的 Azure AI 代理服务工具创建一个航班预订代理。该代理将能够与用户交互并提供有关航班的信息。

## 先决条件

完成本练习，您需要以下内容：
1. 拥有带有有效订阅的 Azure 账户。[免费创建账户](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)。
2. 您需要有权限创建 Microsoft Foundry 集线器，或者有集线器为您创建。
    - 如果您的角色是 Contributor 或 Owner，您可以按照本教程中的步骤操作。

## 创建 Microsoft Foundry 集线器

> **注意：** Microsoft Foundry 前称为 Azure AI Studio。

1. 请遵循 [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) 博客文章中的指导，创建 Microsoft Foundry 集线器。
2. 创建项目后，关闭显示的任何提示，并查看 Microsoft Foundry 门户中的项目页面，页面应类似于下图：

    ![Microsoft Foundry Project](../../../translated_images/zh-CN/azure-ai-foundry.88d0c35298348c2f.webp)

## 部署模型

1. 在项目左侧窗格的 **我的资产** 部分，选择 **模型 + 端点** 页面。
2. 在 **模型 + 端点** 页面中，切换到 **模型部署** 选项卡，点击 **+ 部署模型** 菜单，选择 **部署基础模型**。
3. 在列表中搜索 `gpt-4o-mini` 模型，然后选择并确认。

    > **注意**：降低 TPM 参数有助于避免订阅中配额的过度使用。

    ![Model Deployed](../../../translated_images/zh-CN/model-deployment.3749c53fb81e18fd.webp)

## 创建代理

现在您已经部署了模型，可以创建代理。代理是一个对话式 AI 模型，可用于与用户互动。

1. 在项目左侧窗格的 **构建与自定义** 部分，选择 **代理** 页面。
2. 点击 **+ 创建代理** 来创建新代理。在 **代理设置** 对话框中：
    - 输入代理名称，例如 `FlightAgent`。
    - 确保选择了之前创建的 `gpt-4o-mini` 模型部署。
    - 根据您希望代理遵循的提示设置 **说明**。例如：
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
> 有关详细提示，您可以查看 [此仓库](https://github.com/ShivamGoyal03/RoamMind) 以获取更多信息。
    
> 此外，您可以添加 **知识库** 和 **操作** 来增强代理的能力，以根据用户请求提供更多信息和执行自动化任务。对于本练习，您可以跳过这些步骤。
    
![Agent Setup](../../../translated_images/zh-CN/agent-setup.9bbb8755bf5df672.webp)

3. 若要创建新的多 AI 代理，只需点击 **新建代理**。新创建的代理将出现在代理页面上。

## 测试代理

创建代理后，您可以在 Microsoft Foundry 门户的试玩区测试它如何响应用户查询。

1. 在代理的 **设置** 窗格顶部，选择 **在试玩区试用**。
2. 在 **试玩区** 窗格中，您可以通过在聊天窗口中输入查询与代理互动。例如，您可以询问代理查询 28 日从西雅图到纽约的航班。

    > **注意**：该代理可能不会提供准确的答复，因为本练习中没有使用实时数据。目的是测试代理根据所提供的说明理解和响应用户查询的能力。

    ![Agent Playground](../../../translated_images/zh-CN/agent-playground.dc146586de715010.webp)

3. 测试完代理后，您可以继续自定义，添加更多意图、训练数据和操作，以增强其功能。

## 清理资源

测试完成后，您可以删除代理以避免产生额外费用。
1. 打开 [Azure 门户](https://portal.azure.com)，查看您在本练习中部署集线器资源的资源组内容。
2. 在工具栏中，选择 **删除资源组**。
3. 输入资源组名称并确认删除。

## 资源

- [Microsoft Foundry 文档](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 门户](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio 入门](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 上的 AI 代理基础知识](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文件使用 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 进行翻译。虽然我们力求准确，但请注意，自动翻译可能会包含错误或不准确之处。以原文文件的母语版本为权威来源。对于关键信息，建议使用专业人工翻译。我们不对因使用本翻译而产生的任何误解或错误解读承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->