# Microsoft Foundry Agent Service Development

Sa pagsasanay na ito, gagamitin mo ang mga tool ng Microsoft Foundry Agent Service sa [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) upang gumawa ng isang ahente para sa Flight Booking. Ang ahente ay makikipag-ugnayan sa mga gumagamit at magbibigay ng impormasyon tungkol sa mga flight.

## Mga Kinakailangan

Upang makumpleto ang pagsasanay na ito, kailangan mo ang mga sumusunod:
1. Isang Azure account na may aktibong subscription. [Gumawa ng libreng account](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Kailangan mo ng mga permiso upang gumawa ng Microsoft Foundry hub o magkaroon ng isa na ginawa para sa iyo.
    - Kung ang iyong tungkulin ay Contributor o Owner, maaari mong sundin ang mga hakbang sa tutorial na ito.

## Gumawa ng Microsoft Foundry hub

> **Note:** Ang Microsoft Foundry ay dating kilala bilang Azure AI Studio.

1. Sundin ang mga gabay mula sa [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) blog post para sa paggawa ng Microsoft Foundry hub.
2. Kapag nalikha na ang iyong proyekto, isara ang anumang mga tip na ipinapakita at suriin ang pahina ng proyekto sa Microsoft Foundry portal, na dapat ay kahawig ng sumusunod na imahe:

    ![Microsoft Foundry Project](../../../translated_images/tl/azure-ai-foundry.88d0c35298348c2f.webp)

## Mag-deploy ng modelo

1. Sa pane sa kaliwa para sa iyong proyekto, sa seksyon na **My assets**, piliin ang pahina na **Models + endpoints**.
2. Sa pahina ng **Models + endpoints**, sa tab na **Model deployments**, sa menu na **+ Deploy model**, piliin ang **Deploy base model**.
3. Hanapin ang modelong `gpt-4.1-mini` sa listahan, pagkatapos piliin ito at kumpirmahin.

    > **Note**: Ang pagbabawas ng TPM ay tumutulong upang maiwasan ang labis na paggamit ng quota na available sa subscription na iyong ginagamit.

    ![Model Deployed](../../../translated_images/tl/model-deployment.3749c53fb81e18fd.webp)

## Gumawa ng ahente

Ngayong na-deploy mo na ang modelo, maaari kang gumawa ng ahente. Ang ahente ay isang conversational AI model na magagamit para makipag-ugnayan sa mga gumagamit.

1. Sa pane sa kaliwa para sa iyong proyekto, sa seksyon na **Build & Customize**, piliin ang pahina na **Agents**.
2. I-click ang **+ Create agent** upang gumawa ng bagong ahente. Sa ilalim ng dialog box na **Agent Setup**:
    - Ilagay ang pangalan para sa ahente, tulad ng `FlightAgent`.
    - Siguraduhing ang deployment ng modelong `gpt-4.1-mini` na ginawa mo dati ay napili
    - Itakda ang **Instructions** ayon sa prompt na gusto mong sundin ng ahente. Narito ang isang halimbawa:
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
    
> Bukod pa rito, maaari kang magdagdag ng **Knowledge Base** at **Actions** upang mapahusay ang kakayahan ng ahente na magbigay ng higit pang impormasyon at magsagawa ng awtomatikong mga gawain base sa mga kahilingan ng gumagamit. Para sa pagsasanay na ito, maaari mong laktawan ang mga hakbang na ito.
    
![Agent Setup](../../../translated_images/tl/agent-setup.9bbb8755bf5df672.webp)

3. Upang gumawa ng bagong multi-AI agent, i-click lang ang **New Agent**. Ang bagong likha na ahente ay ipapakita sa pahina ng Agents.


## Subukan ang ahente

Pagkatapos likhain ang ahente, maaari mo itong subukan upang makita kung paano ito tumugon sa mga tanong ng gumagamit sa Microsoft Foundry portal playground.

1. Sa taas ng **Setup** pane para sa iyong ahente, piliin ang **Try in playground**.
2. Sa pane ng **Playground**, maaari kang makipag-ugnayan sa ahente sa pamamagitan ng pag-type ng mga tanong sa chat window. Halimbawa, maaari mong tanungin ang ahente na maghanap ng mga flight mula Seattle papuntang New York sa ika-28.

    > **Note**: Maaaring hindi magbigay ang ahente ng tumpak na mga sagot, dahil walang real-time na data na ginagamit sa pagsasanay na ito. Ang layunin ay subukan ang kakayahan ng ahente na maunawaan at tumugon sa mga tanong ng gumagamit base sa mga ibinigay na instruksyon.

    ![Agent Playground](../../../translated_images/tl/agent-playground.dc146586de715010.webp)

3. Pagkatapos subukan ang ahente, maaari mo pa itong i-customize sa pamamagitan ng pagdagdag ng mas maraming intents, training data, at actions upang mapahusay ang kakayahan nito.

## Linisin ang mga resources

Kapag natapos mo na ang pagsubok sa ahente, maaari mo itong tanggalin upang maiwasan ang karagdagang gastos.
1. Buksan ang [Azure portal](https://portal.azure.com) at tingnan ang laman ng resource group kung saan mo dineploy ang mga hub resources na ginamit sa pagsasanay na ito.
2. Sa toolbar, piliin ang **Delete resource group**.
3. Ilagay ang pangalan ng resource group at kumpirmahin na gusto mo itong tanggalin.

## Mga Resources

- [Dokumentasyon ng Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Pagsisimula sa Microsoft Foundry](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Mga Pangunahing Kaalaman tungkol sa mga AI agents sa Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->