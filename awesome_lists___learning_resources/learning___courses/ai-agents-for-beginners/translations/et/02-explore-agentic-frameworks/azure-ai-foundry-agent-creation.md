# Azure AI Agent Service arendamine

Selles harjutuses kasutate Azure AI Agent teenuse tööriistu [Microsoft Foundry portaali](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) et luua agent lennupiletite broneerimiseks. Agent suudab suhelda kasutajatega ja anda teavet lendude kohta.

## Eeltingimused

Selle harjutuse lõpetamiseks vajate järgmist:
1. Azure konto aktiivse tellimusega. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Teil peavad olema õigused Microsoft Foundry hubi loomiseks või peab keegi selle teie jaoks looma.
    - Kui teie roll on Contributor või Owner, saate järgida samme selles õpetuses.

## Microsoft Foundry hubi loomine

> **Note:** Microsoft Foundry oli varem tuntud kui Azure AI Studio.

1. Järgige nende juhiseid Microsoft Foundry blogipostitusest ([Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)) Microsoft Foundry hubi loomiseks.
2. Kui teie projekt on loodud, sulgege kõik kuvatavad näpunäited ja vaadake läbi projekti lehte Microsoft Foundry portaalis, mis peaks sarnanema järgmisele pildile:

    ![Microsoft Foundry Project](../../../translated_images/et/azure-ai-foundry.88d0c35298348c2f.webp)

## Mudeli juurutamine

1. Projekti vasakul paanis, jaotises **Minu varad**, valige leht **Mudelite + lõpp-punktide**.
2. Lehel **Mudelite + lõpp-punktide**, vahekaardil **Mudeli juurutused**, menüüs **+ Deploy model** valige **Deploy base model**.
3. Otsige loendist `gpt-4o-mini` mudelit, valige see ja kinnitage.

    > **Note**: TPM-i vähendamine aitab vältida teie kasutatava tellimuse quota liigset kasutamist.

    ![Mudel juurutatud](../../../translated_images/et/model-deployment.3749c53fb81e18fd.webp)

## Agendi loomine

Nüüd, kui olete mudeli juurutanud, saate luua agendi. Agent on vestluslik tehisintellekti mudel, mida saab kasutada kasutajatega suhtlemiseks.

1. Projekti vasakul paanis, jaotises **Build & Customize**, valige leht **Agents**.
2. Klõpsake **+ Create agent**, et luua uus agent. Dialoogiboksis **Agent Setup**:
    - Sisestage agendi nimi, näiteks `FlightAgent`.
    - Veenduge, et valitud on varem loodud `gpt-4o-mini` mudeli juurutus
    - Määrake **Instructions** vastavalt promptile, mida soovite, et agent järgiks. Siin on näide:
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
> Üksikasjaliku prompti jaoks saate rohkem teavet vaadata [see hoidla](https://github.com/ShivamGoyal03/RoamMind).
    
> Lisaks võite lisada **Teadmistebaas** ja **Tegevused**, et laiendada agendi võimekust pakkuda rohkem teavet ja sooritada automatiseeritud ülesandeid vastavalt kasutaja taotlustele. Selle harjutuse jaoks võite neid samme vahele jätta.
    
![Agendi seadistamine](../../../translated_images/et/agent-setup.9bbb8755bf5df672.webp)

3. Uue multi-AI agendi loomiseks klõpsake lihtsalt **New Agent**. Väsinud agent kuvatakse seejärel Agents lehel.


## Agendi testimine

Pärast agendi loomist saate seda testida, et näha, kuidas see vastab kasutajaküsimustele Microsoft Foundry portaali mänguväljakus.

1. Agendi **Setup** paani ülaosas valige **Try in playground**.
2. Paneelis **Playground** saate agentiga suhelda, sisestades vestlusaknasse päringuid. Näiteks võite paluda agendil otsida lende Seattle'ist New Yorki 28. kuupäevaks.

    > **Note**: Agent ei pruugi anda täpseid vastuseid, kuna selles harjutuses ei kasutata reaalajas andmeid. Eesmärk on testida agendi suutlikkust mõista ja vastata kasutajapäringutele vastavalt antud juhistele.

    ![Agendi mänguväljak](../../../translated_images/et/agent-playground.dc146586de715010.webp)

3. Pärast agendi testimist saate seda edaspidi kohandada, lisades rohkem eesmärke (intents), treeningandmeid ja tegevusi, et parandada selle võimekust.

## Ressursside puhastamine

Kui olete agendi testimise lõpetanud, saate selle kustutada, et vältida täiendavaid kulusid.
1. Avage [Azure portaali](https://portal.azure.com) ja vaadake ressursside rühma sisu, kuhu te selle harjutuse jaoks hubi ressursid paigutasite.
2. Tööriistaribal valige **Delete resource group**.
3. Sisestage ressursside rühma nimi ja kinnitage, et soovite selle kustutada.

## Ressursid

- [Microsoft Foundry dokumentatsioon](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portaali](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Getting Started with Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Fundamentals of AI agents on Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Vastutusest loobumine:
See dokument on tõlgitud tehisintellekti tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi me püüame tagada täpsust, palun arvestage, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokumenti selle algkeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tulenevate arusaamatuste ega väärtõlgenduste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->