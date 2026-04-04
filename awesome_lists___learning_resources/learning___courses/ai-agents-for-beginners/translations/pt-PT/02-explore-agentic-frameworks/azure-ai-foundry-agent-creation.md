# Desenvolvimento do Azure AI Agent Service

Neste exercício, utiliza as ferramentas do serviço Azure AI Agent no [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) para criar um agente de reserva de voos. O agente será capaz de interagir com os utilizadores e fornecer informação sobre voos.

## Pré-requisitos

Para completar este exercício, necessita do seguinte:
1. Uma conta Azure com uma subscrição ativa. [Crie uma conta gratuitamente](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Necessita de permissões para criar um hub Microsoft Foundry ou que alguém o crie por si.
    - Se o seu papel for Contributor ou Owner, pode seguir os passos neste tutorial.

## Criar um hub Microsoft Foundry

> **Nota:** O Microsoft Foundry era anteriormente conhecido como Azure AI Studio.

1. Siga estas diretrizes do blogue [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) para criar um hub Microsoft Foundry.
2.  Quando o seu projeto for criado, feche quaisquer dicas exibidas e reveja a página do projeto no portal Microsoft Foundry, que deverá ter uma aparência semelhante à imagem seguinte:

    ![Projeto Microsoft Foundry](../../../translated_images/pt-PT/azure-ai-foundry.88d0c35298348c2f.webp)

## Implantar um modelo

1. No painel à esquerda do seu projeto, na secção **My assets**, selecione a página **Models + endpoints**.
2. Na página **Models + endpoints**, no separador **Model deployments**, no menu **+ Deploy model**, selecione **Deploy base model**.
3. Procure o modelo `gpt-4o-mini` na lista e, em seguida, selecione-o e confirme.

    > **Nota**: Reduzir o TPM ajuda a evitar o uso excessivo da quota disponível na subscrição que está a utilizar.

    ![Modelo Implementado](../../../translated_images/pt-PT/model-deployment.3749c53fb81e18fd.webp)

## Criar um agente

Agora que implantou um modelo, pode criar um agente. Um agente é um modelo de IA conversacional que pode ser usado para interagir com os utilizadores.

1. No painel à esquerda do seu projeto, na secção **Build & Customize**, selecione a página **Agents**.
2. Clique em **+ Create agent** para criar um novo agente. No diálogo **Agent Setup**:
    - Introduza um nome para o agente, por exemplo `FlightAgent`.
    - Certifique-se de que a implantação do modelo `gpt-4o-mini` que criou anteriormente está selecionada
    - Defina as **Instructions** conforme o prompt que pretende que o agente siga. Aqui está um exemplo:
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
> Para um prompt detalhado, pode consultar [este repositório](https://github.com/ShivamGoyal03/RoamMind) para mais informações.
    
> Além disso, pode adicionar **Knowledge Base** e **Actions** para ampliar as capacidades do agente de fornecer mais informação e executar tarefas automáticas com base nos pedidos dos utilizadores. Para este exercício, pode saltar estes passos.
    
![Configuração do Agente](../../../translated_images/pt-PT/agent-setup.9bbb8755bf5df672.webp)

3. Para criar um novo agente multi-AI, clique em **New Agent**. O agente recém-criado será então apresentado na página Agents.


## Testar o agente

Depois de criar o agente, pode testá-lo para ver como responde às perguntas dos utilizadores no playground do portal Microsoft Foundry.

1. No topo do painel **Setup** do seu agente, selecione **Try in playground**.
2. No painel **Playground**, pode interagir com o agente escrevendo perguntas na janela de chat. Por exemplo, pode pedir ao agente para procurar voos de Seattle para Nova Iorque no dia 28.

    > **Nota**: O agente pode não fornecer respostas precisas, uma vez que não são utilizados dados em tempo real neste exercício. O objetivo é testar a capacidade do agente de entender e responder às questões dos utilizadores com base nas instruções fornecidas.

    ![Playground do Agente](../../../translated_images/pt-PT/agent-playground.dc146586de715010.webp)

3. Após testar o agente, pode personalizá-lo mais adicionando mais intenções, dados de treino e ações para melhorar as suas capacidades.

## Limpar recursos

Quando terminar de testar o agente, pode eliminá-lo para evitar incorrer em custos adicionais.
1. Abra o [Azure portal](https://portal.azure.com) e consulte o conteúdo do grupo de recursos onde implantou os recursos do hub usados neste exercício.
2. Na barra de ferramentas, selecione **Delete resource group**.
3. Introduza o nome do grupo de recursos e confirme que pretende eliminá-lo.

## Recursos

- [Documentação do Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Portal Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Primeiros passos com o Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Fundamentos dos agentes de IA no Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Discord do Azure AI](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso legal**:
Este documento foi traduzido utilizando o serviço de tradução automática por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos empenhemos na exatidão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original, na sua língua nativa, deve ser considerado a fonte autoritativa. Para informação crítica, recomenda-se uma tradução humana profissional. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações erradas decorrentes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->