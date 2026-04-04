# Azure AI Agent Service Development

Sa ehersisyong ito, gagamitin mo ang mga kasangkapan ng Azure AI Agent service sa [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) upang gumawa ng isang agent para sa Flight Booking. Ang agent ay makikipag-ugnayan sa mga gumagamit at magbibigay ng impormasyon tungkol sa mga flight.

## Mga Kinakailangan

Upang makumpleto ang ehersisyong ito, kailangan mo ang mga sumusunod:
1. Isang Azure account na may aktibong subscription. [Gumawa ng libreng account](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Kailangan mo ng mga pahintulot upang gumawa ng Microsoft Foundry hub o magkaroon ng isa na ginawa para sa iyo.
    - Kung ang iyong papel ay Contributor o Owner, maaari mong sundin ang mga hakbang sa tutorial na ito.

## Gumawa ng Microsoft Foundry hub

> **Note:** Ang Microsoft Foundry ay dating kilala bilang Azure AI Studio.

1. Sundin ang mga patnubay mula sa [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) blog post para sa paggawa ng Microsoft Foundry hub.
2. Kapag nagawa na ang iyong proyekto, isara ang anumang tips na ipinapakita at repasuhin ang pahina ng proyekto sa Microsoft Foundry portal, na dapat ay kahawig ng sumusunod na larawan:

    ![Microsoft Foundry Project](../../../translated_images/tl/azure-ai-foundry.88d0c35298348c2f.webp)

## Mag-deploy ng modelo

1. Sa pane sa kaliwa para sa iyong proyekto, sa seksyon ng **My assets**, piliin ang pahina na **Models + endpoints**.
2. Sa pahina ng **Models + endpoints**, sa tab na **Model deployments**, sa menu na **+ Deploy model**, piliin ang **Deploy base model**.
3. Hanapin ang `gpt-4o-mini` na modelo sa listahan, pagkatapos ay piliin ito at kumpirmahin.

    > **Note**: Ang pagbawas ng TPM ay nakakatulong upang maiwasan ang labis na paggamit ng quota na available sa subscription na iyong ginagamit.

    ![Model Deployed](../../../translated_images/tl/model-deployment.3749c53fb81e18fd.webp)

## Gumawa ng agent

Ngayon na na-deploy mo na ang modelo, maaari kang gumawa ng agent. Ang agent ay isang conversational AI model na maaaring gamitin upang makipag-ugnayan sa mga gumagamit.

1. Sa pane sa kaliwa para sa iyong proyekto, sa seksyon na **Build & Customize**, piliin ang pahina ng **Agents**.
2. I-click ang **+ Create agent** upang gumawa ng bagong agent. Sa ilalim ng dialog box na **Agent Setup**:
    - Ilagay ang pangalan ng agent, tulad ng `FlightAgent`.
    - Tiyaking ang `gpt-4o-mini` na model deployment na ginawa mo dati ay naka-select.
    - Itakda ang **Instructions** ayon sa prompt na nais mong sundin ng agent. Narito ang isang halimbawa:
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
> Para sa mas detalyadong prompt, maaari mong tingnan ang [repository na ito](https://github.com/ShivamGoyal03/RoamMind) para sa karagdagang impormasyon.
    
> Bukod dito, maaari kang magdagdag ng **Knowledge Base** at **Actions** upang mapahusay ang kakayahan ng agent na magbigay ng mas maraming impormasyon at magsagawa ng awtomatikong mga gawain base sa kahilingan ng user. Para sa ehersisyong ito, maaari mong laktawan ang mga hakbang na ito.
    
![Agent Setup](../../../translated_images/tl/agent-setup.9bbb8755bf5df672.webp)

3. Upang gumawa ng bagong multi-AI agent, i-click lamang ang **New Agent**. Ang bagong gawaing agent ay ipapakita naman sa pahina ng Agents.


## Subukan ang agent

Pagkatapos gumawa ng agent, maaari mo itong subukan upang makita kung paano ito tumutugon sa mga tanong ng gumagamit sa Microsoft Foundry portal playground.

1. Sa itaas ng **Setup** pane para sa iyong agent, piliin ang **Try in playground**.
2. Sa pane ng **Playground**, maaari kang makipag-ugnayan sa agent sa pamamagitan ng pag-type ng mga query sa chat window. Halimbawa, maaari mong hilingin sa agent na maghanap ng mga flight mula Seattle papuntang New York sa ika-28.

    > **Note**: Maaaring hindi magbigay ang agent ng tumpak na mga sagot, dahil walang real-time na datos na ginagamit sa ehersisyong ito. Ang layunin ay subukan ang kakayanan ng agent na maunawaan at tumugon sa mga query ng user base sa mga instruction na binigay.

    ![Agent Playground](../../../translated_images/tl/agent-playground.dc146586de715010.webp)

3. Pagkatapos subukan ang agent, maaari mo pa itong i-customize nang higit pa sa pamamagitan ng pagdagdag ng mas maraming intents, training data, at actions upang mapabuti ang kakayahan nito.

## Linisin ang mga resources

Kapag natapos mo na ang pagsubok sa agent, maaari mo itong tanggalin upang maiwasan ang karagdagang gastos.
1. Buksan ang [Azure portal](https://portal.azure.com) at tingnan ang nilalaman ng resource group kung saan mo dineploy ang mga hub resources na ginamit sa ehersisyo.
2. Sa toolbar, piliin ang **Delete resource group**.
3. I-enter ang pangalan ng resource group at kumpirmahin na nais mo itong tanggalin.

## Mga Resources

- [Microsoft Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Getting Started with Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Fundamentals of AI agents on Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagsasabi ng Paunawa**:
Ang dokumentong ito ay isinalin gamit ang AI translation service na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakibatid na maaaring magkaroon ng mga pagkakamali o hindi pagkakatugma sa awtomatikong pagsasalin. Ang orihinal na dokumento sa kanyang sariling wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasaling-tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->