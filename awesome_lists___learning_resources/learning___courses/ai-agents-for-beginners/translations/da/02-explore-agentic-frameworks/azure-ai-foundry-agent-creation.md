# Azure AI Agent Service Development

I denne øvelse bruger du Azure AI Agent serviceværktøjerne i [Microsoft Foundry-portalen](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) til at oprette en agent til Flybookning. Agenten vil kunne interagere med brugere og give information om fly.

## Forudsætninger

For at gennemføre denne øvelse skal du have følgende:
1. En Azure-konto med et aktivt abonnement. [Opret en konto gratis](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Du skal have tilladelser til at oprette et Microsoft Foundry hub eller have et oprettet for dig.
    - Hvis din rolle er Bidragyder eller Ejer, kan du følge trinnene i denne vejledning.

## Opret et Microsoft Foundry hub

> **Note:** Microsoft Foundry blev tidligere kaldt Azure AI Studio.

1. Følg disse retningslinjer fra [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) blogindlægget for at oprette et Microsoft Foundry hub.
2. Når dit projekt er oprettet, luk alle tips der vises, og gennemgå projektsiden i Microsoft Foundry-portalen, som skulle ligne nedenstående billede:

    ![Microsoft Foundry Project](../../../translated_images/da/azure-ai-foundry.88d0c35298348c2f.webp)

## Udrul en model

1. I ruden til venstre for dit projekt, i sektionen **My assets**, vælg siden **Models + endpoints**.
2. På siden **Models + endpoints**, under fanen **Model deployments**, i menuen **+ Deploy model**, vælg **Deploy base model**.
3. Søg efter modellen `gpt-4o-mini` i listen, og vælg og bekræft den.

    > **Note**: At reducere TPM hjælper med at undgå overforbrug af kvoten tilgængelig i det abonnement, du bruger.

    ![Model Deployed](../../../translated_images/da/model-deployment.3749c53fb81e18fd.webp)

## Opret en agent

Nu hvor du har udrullet en model, kan du oprette en agent. En agent er en konverserende AI-model, der kan bruges til at interagere med brugere.

1. I ruden til venstre for dit projekt, under sektionen **Build & Customize**, vælg siden **Agents**.
2. Klik på **+ Create agent** for at oprette en ny agent. Under dialogboksen **Agent Setup**:
    - Indtast et navn til agenten, f.eks. `FlightAgent`.
    - Sørg for, at den tidligere oprettede modeludrulning `gpt-4o-mini` er valgt.
    - Angiv **Instructions** i henhold til den prompt, du vil have agenten til at følge. Her er et eksempel:
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
> For en detaljeret prompt kan du tjekke [dette repository](https://github.com/ShivamGoyal03/RoamMind) for mere information.
    
> Derudover kan du tilføje **Knowledge Base** og **Actions** for at forbedre agentens evner til at give mere information og udføre automatiserede opgaver baseret på brugerens anmodninger. Til denne øvelse kan du springe disse trin over.
    
![Agent Setup](../../../translated_images/da/agent-setup.9bbb8755bf5df672.webp)

3. For at oprette en ny multi-AI agent skal du blot klikke på **New Agent**. Den nyoprettede agent vil derefter blive vist på Agents-siden.

## Test agenten

Efter at have oprettet agenten kan du teste den for at se, hvordan den reagerer på brugerforespørgsler i Microsoft Foundry portalen playground.

1. Øverst i **Setup**-ruden for din agent skal du vælge **Try in playground**.
2. I **Playground**-ruden kan du interagere med agenten ved at skrive forespørgsler i chatvinduet. For eksempel kan du bede agenten om at søge efter fly fra Seattle til New York den 28.

    > **Note**: Agenten giver muligvis ikke nøjagtige svar, da der ikke bruges realtidsdata i denne øvelse. Formålet er at teste agentens evne til at forstå og svare på brugerhenvendelser baseret på de angivne instruktioner.

    ![Agent Playground](../../../translated_images/da/agent-playground.dc146586de715010.webp)

3. Efter testningen af agenten kan du yderligere tilpasse den ved at tilføje flere intents, træningsdata og handlinger for at forbedre dens funktioner.

## Ryd op i ressourcer

Når du er færdig med at teste agenten, kan du slette den for at undgå ekstra omkostninger.
1. Åbn [Azure-portalen](https://portal.azure.com) og se indholdet af ressourcegruppen, hvor du har udrullet hub-ressourcerne brugt i denne øvelse.
2. På værktøjslinjen skal du vælge **Delete resource group**.
3. Indtast navnet på ressourcegruppen og bekræft, at du vil slette den.

## Ressourcer

- [Microsoft Foundry dokumentation](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Kom godt i gang med Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Grundlæggende om AI-agenter på Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi stræber efter nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets modersmål bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår ved brug af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->