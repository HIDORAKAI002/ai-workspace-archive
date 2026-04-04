# Azure AI Agent Service Development

U ovom zadatku koristite alate Azure AI Agent servisa u [Microsoft Foundry portalu](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) kako biste kreirali agenta za rezervaciju letova. Agent će moći komunicirati s korisnicima i pružati informacije o letovima.

## Prerequisites

Za dovršetak ovog zadatka trebate sljedeće:
1. Azure račun s aktivnom pretplatom. [Otvorite račun besplatno](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Potrebne su vam dozvole za stvaranje Microsoft Foundry hub-a ili da vam netko stvori hub.
    - Ako je vaša uloga Contributor ili Owner, možete slijediti korake u ovom vodiču.

## Create an Microsoft Foundry hub

> **Napomena:** Microsoft Foundry je ranije bio poznat kao Azure AI Studio.

1. Slijedite ove smjernice iz [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) članka za stvaranje Microsoft Foundry hub-a.
2. Kada je vaš projekt stvoren, zatvorite sve prikazane savjete i pregledajte stranicu projekta u Microsoft Foundry portalu, koja bi trebala izgledati slično sljedećoj slici:

    ![Microsoft Foundry Project](../../../translated_images/hr/azure-ai-foundry.88d0c35298348c2f.webp)

## Deploy a model

1. U oknu s lijeve strane za svoj projekt, u odjeljku **Moji resursi**, odaberite stranicu **Modeli + krajnje točke**.
2. Na stranici **Modeli + krajnje točke**, na kartici **Model deployments**, u izborniku **+ Deploy model**, odaberite **Deploy base model**.
3. Pretražite model `gpt-4o-mini` na popisu, zatim ga odaberite i potvrdite.

    > **Napomena**: Smanjenje TPM pomaže izbjeći prekomjernu potrošnju kvote dostupne na pretplati koju koristite.

    ![Model Deployed](../../../translated_images/hr/model-deployment.3749c53fb81e18fd.webp)

## Create an agent

Sada kada ste rasporedili model, možete stvoriti agenta. Agent je konverzacijski AI model koji se može koristiti za interakciju s korisnicima.

1. U oknu s lijeve strane za svoj projekt, u odjeljku **Build & Customize**, odaberite stranicu **Agents**.
2. Kliknite **+ Create agent** za stvaranje novog agenta. U dijaloškom okviru **Agent Setup**:
    - Unesite ime za agenta, kao npr. `FlightAgent`.
    - Provjerite je li odabrano raspoređivanje modela `gpt-4o-mini` koje ste prethodno stvorili
    - Postavite **Instructions** prema uputi koju želite da agent slijedi. Evo primjera:
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
> Za detaljan prompt možete pogledati [this repository](https://github.com/ShivamGoyal03/RoamMind) za više informacija.
    
> Nadalje, možete dodati **Knowledge Base** i **Actions** kako biste unaprijedili sposobnosti agenta za pružanje više informacija i izvođenje automatiziranih zadataka na temelju zahtjeva korisnika. Za ovaj zadatak možete preskočiti ove korake.
    
![Agent Setup](../../../translated_images/hr/agent-setup.9bbb8755bf5df672.webp)

3. Za stvaranje novog multi-AI agenta jednostavno kliknite **New Agent**. Novo stvoreni agent tada će se prikazati na stranici Agents.


## Test the agent

Nakon stvaranja agenta, možete ga testirati kako biste vidjeli kako odgovara na upite korisnika u Microsoft Foundry portal playgroundu.

1. Na vrhu okna **Setup** za vašeg agenta odaberite **Try in playground**.
2. U oknu **Playground** možete komunicirati s agentom upisivanjem upita u chat prozor. Na primjer, možete tražiti od agenta da pretraži letove iz Seattlea za New York 28.

    > **Napomena**: Agent možda neće davati točne odgovore, jer se u ovom zadatku ne koriste podaci u stvarnom vremenu. Svrha je testirati sposobnost agenta da razumije i odgovori na upite korisnika na temelju zadanih uputa.

    ![Agent Playground](../../../translated_images/hr/agent-playground.dc146586de715010.webp)

3. Nakon testiranja agenta, možete ga dodatno prilagoditi dodavanjem više namjera, podataka za obuku i akcija kako biste unaprijedili njegove mogućnosti.

## Clean up resources

Kada završite s testiranjem agenta, možete ga izbrisati kako biste izbjegli dodatne troškove.
1. Otvorite [Azure portal](https://portal.azure.com) i pregledajte sadržaj grupe resursa u kojoj ste rasporedili hub resurse korištene u ovom zadatku.
2. Na alatnoj traci odaberite **Delete resource group**.
3. Unesite ime grupe resursa i potvrdite da je želite izbrisati.

## Resources

- [Microsoft Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Getting Started with Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Fundamentals of AI agents on Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Odricanje odgovornosti:
Ovaj dokument je preveden korištenjem AI usluge za prevođenje [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatizirani prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakve nesporazume ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->