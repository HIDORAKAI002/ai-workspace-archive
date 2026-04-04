# Azure AI Agent Service Development

Tässä harjoituksessa käytät Azure AI Agent -palvelun työkaluja [Microsoft Foundry -portaalissa](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) luodaksesi agentin lentovarauksia varten. Agentti pystyy kommunikoimaan käyttäjien kanssa ja tarjoamaan tietoa lennoista.

## Edellytykset

Harjoituksen suorittamiseksi tarvitset seuraavat:
1. Azure-tilin, jolla on aktiivinen tilaus. [Luo tili ilmaiseksi](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Sinulla tulee olla oikeudet luoda Microsoft Foundry -keskittymä tai sellainen on luotava sinulle.
    - Jos roolisi on Contributor tai Owner, voit seurata tämän oppaan ohjeita.

## Luo Microsoft Foundry -keskittymä

> **Huom:** Microsoft Foundry tunnettiin aiemmin nimellä Azure AI Studio.

1. Noudata näitä ohjeita [Microsoft Foundryn](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) blogikirjoituksesta Microsoft Foundry -keskittymän luomiseksi.
2. Kun projektisi on luotu, sulje kaikki näkyviin tulevat vinkit ja tarkista Microsoft Foundry -portaalin projektisivu, joka näyttää suunnilleen seuraavalta kuvalta:

    ![Microsoft Foundry Project](../../../translated_images/fi/azure-ai-foundry.88d0c35298348c2f.webp)

## Ota malli käyttöön

1. Vasemman paneelin projektissasi, valitse **My assets** -osiosta **Models + endpoints** -sivu.
2. **Models + endpoints** -sivulla, **Model deployments** -välilehdellä, valitse **+ Deploy model** -valikosta **Deploy base model**.
3. Etsi listasta `gpt-4o-mini`-malli, valitse se ja vahvista.

    > **Huom**: TPM:n (tokens per minute) vähentäminen auttaa välttämään käyttöoikeuden liiallista kulutusta tilauksessasi.

    ![Model Deployed](../../../translated_images/fi/model-deployment.3749c53fb81e18fd.webp)

## Luo agentti

Kun olet ottanut mallin käyttöön, voit luoda agentin. Agentti on keskusteleva tekoälymalli, jolla voi olla vuorovaikutusta käyttäjien kanssa.

1. Vasemman paneelin projektissasi, valitse **Build & Customize** -osiosta **Agents**-sivu.
2. Klikkaa **+ Create agent** luodaksesi uuden agentin. Valintaikkunassa **Agent Setup**:
    - Anna agentille nimi, esimerkiksi `FlightAgent`.
    - Varmista, että olet valinnut aiemmin luomasi `gpt-4o-mini`-mallin käyttöönoton.
    - Määrittele **Instructions** ohjeet, joita agentin tulee noudattaa. Tässä on esimerkki:
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
> Yksityiskohtaisemman ohjeistuksen löydät tästä [tietovarastosta](https://github.com/ShivamGoyal03/RoamMind).
    
> Voit myös lisätä agentin kyvykkyyksien parantamiseksi **Knowledge Base** ja **Actions** -toimintoja tarjotaksesi lisätietoa ja suorittaaksesi automatisoituja tehtäviä käyttäjän pyyntöjen perusteella. Tässä harjoituksessa voit ohittaa nämä vaiheet.
    
![Agent Setup](../../../translated_images/fi/agent-setup.9bbb8755bf5df672.webp)

3. Uuden monipuolisen AI-agentin luomiseen klikkaa **New Agent**. Vastaluotu agentti näkyy sitten Agents-sivulla.

## Testaa agenttia

Agentin luomisen jälkeen voit testata sen vastausta käyttäjäkyselyihin Microsoft Foundryn portaalin leikkikentässä.

1. Agenttisi **Setup**-paneelin yläosassa valitse **Try in playground**.
2. **Playground**-paneelissa voit keskustella agentin kanssa kirjoittamalla kyselyjä chat-ikkunaan. Esimerkiksi pyydä agenttia etsimään lentoja Seattlesta New Yorkiin 28. päivänä.

    > **Huom**: Agentti ei välttämättä anna tarkkoja vastauksia, koska tässä harjoituksessa ei käytetä reaaliaikaista dataa. Tarkoituksena on testata agentin kykyä ymmärtää ja vastata ohjeissa annettuihin käyttäjäkyselyihin.

    ![Agent Playground](../../../translated_images/fi/agent-playground.dc146586de715010.webp)

3. Agentin testaamisen jälkeen voit mukauttaa sitä edelleen lisäämällä intentioita, koulutusdataa ja toimintoja sen kyvykkyyksien parantamiseksi.

## Puhdista resurssit

Kun olet lopettanut agentin testaamisen, voit poistaa sen välttääksesi lisäkustannuksia.
1. Avaa [Azure-portaali](https://portal.azure.com) ja katso resurssiryhmän sisältö, johon loit tässä harjoituksessa käyttämäsi keskittymäresurssit.
2. Valitse työkaluriviltä **Delete resource group**.
3. Kirjoita resurssiryhmän nimi ja vahvista, että haluat poistaa sen.

## Resurssit

- [Microsoft Foundryn dokumentaatio](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry -portaali](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Aloittaminen Azure AI Studion kanssa](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azurella toimivien tekoälyagenttien perusteet](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty tekoälypohjaisella käännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä tiedoissa suositellaan ammattimaisen ihmiskääntäjän käyttöä. Emme vastaa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->