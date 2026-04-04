# Azure AI Agent Service Development

For dis exercise, you go use di Azure AI Agent service tools for di [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) to create agent for Flight Booking. Di agent go fit interact with users and give information about flights.

## Prerequisites

To complete dis exercise, you need di next tins:
1. Azure account wey get active subscription. [Create account for free](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. You need permission to create Microsoft Foundry hub or make dem create one for you.
    - If your role be Contributor or Owner, you fit follow di steps for dis tutorial.

## Create Microsoft Foundry hub

> **Note:** Microsoft Foundry before na Azure AI Studio dem dey call am.

1. Follow dis guideline from di [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) blog post to create Microsoft Foundry hub.
2. When your project don create, close any tips wey show and check di project page for Microsoft Foundry portal, e go look like dis picture:

    ![Microsoft Foundry Project](../../../translated_images/pcm/azure-ai-foundry.88d0c35298348c2f.webp)

## Deploy model

1. For di left pane for your project, for **My assets** section, select **Models + endpoints** page.
2. For **Models + endpoints** page, for **Model deployments** tab, for **+ Deploy model** menu, select **Deploy base model**.
3. Find di `gpt-4o-mini` model for di list, then select am and confirm.

    > **Note**: Make you reduce TPM so dat e no go consume too much quota wey your subscription get.

    ![Model Deployed](../../../translated_images/pcm/model-deployment.3749c53fb81e18fd.webp)

## Create agent

Now wey you don deploy model, you fit create agent. Agent na conversational AI model wey fit interact with users.

1. For di left pane for your project, for **Build & Customize** section, select **Agents** page.
2. Click **+ Create agent** to create new agent. For **Agent Setup** dialog box:
    - Put name for di agent, like `FlightAgent`.
    - Make sure say di `gpt-4o-mini` model deployment wey you create before dey selected.
    - Set **Instructions** base on di prompt wey you want di agent to follow. Example dey below:
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
> If you want detailed prompt, fit check [this repository](https://github.com/ShivamGoyal03/RoamMind) for more info.
    
> You fit also add **Knowledge Base** and **Actions** to make di agent sabi more and fit do automated tasks based on wetin user request. For dis exercise, you fit skip dis steps.
    
![Agent Setup](../../../translated_images/pcm/agent-setup.9bbb8755bf5df672.webp)

3. To create new multi-AI agent, just click **New Agent**. Di new agent go show for Agents page.

## Test agent

After you create di agent, you fit test am to see how e go respond to user questions for Microsoft Foundry portal playground.

1. For di top of **Setup** pane of your agent, select **Try in playground**.
2. For **Playground** pane, you fit yarn to di agent by typing questions for chat window. For example, fit ask di agent to find flights from Seattle to New York for 28th.

    > **Note**: Di agent no too dey give exact answer because no real-time data dey use for dis exercise. Di aim na to test how di agent fit understand and respond to user questions based on di instructions wey you give.

    ![Agent Playground](../../../translated_images/pcm/agent-playground.dc146586de715010.webp)

3. After you test di agent, you fit still add more intents, training data, and actions to make am better.

## Clean up resources

When you finish test di agent, you fit delete am make you no dey pay extra money.
1. Open [Azure portal](https://portal.azure.com) and look di resource group wey you deploy di hub resources for dis exercise.
2. For toolbar, select **Delete resource group**.
3. Put resource group name and confirm say you want delete am.

## Resources

- [Microsoft Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Getting Started with Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Fundamentals of AI agents on Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate by AI translation service wey dem dey call [Co-op Translator](https://github.com/Azure/co-op-translator). Even though we dey try make am correct, abeg make you sabi say machine translation fit get some mistakes or no too correct. Di original document wey dey im own language na im be correct source. For important matter, e better make human expert translate am. We no go responsible for any wrong understanding or wahala wey fit come from using dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->