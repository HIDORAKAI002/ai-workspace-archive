# Microsoft Foundry Agent Service -palvelun kehitys

Tässä harjoituksessa käytät Microsoft Foundry Agent Service -työkaluja [Microsoft Foundry -portaalissa](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) luodaksesi agentin lentovarauksia varten. Agentti pystyy vuorovaikuttamaan käyttäjien kanssa ja tarjoamaan tietoa lennoista.

## Vaatimukset

Harjoituksen suorittamiseksi tarvitset seuraavat:
1. Azure-tilin, jossa on aktiivinen tilaus. [Luo tili ilmaiseksi](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Sinulla tulee olla oikeudet luoda Microsoft Foundry -keskus tai sinun täytyy saada keskuksen luotu puolestasi.
    - Jos roolisi on Tekijä (Contributor) tai Omistaja (Owner), voit seurata tämän ohjeen vaiheita.

## Luo Microsoft Foundry -keskus

> **Huom:** Microsoft Foundry tunnettiin aiemmin Azure AI Studio -nimellä.

1. Noudata näitä ohjeita [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) -blogikirjoituksesta Microsoft Foundry -keskuksen luomiseksi.
2. Kun projektisi on luotu, sulje mahdolliset vinkit ja tarkastele projektisivua Microsoft Foundry -portaalissa, joka näyttää suunnilleen seuraavalta:

    ![Microsoft Foundry Project](../../../translated_images/fi/azure-ai-foundry.88d0c35298348c2f.webp)

## Ota käyttöön malli

1. Projektisi vasemman reunan ruudussa, kohdassa **My assets** valitse **Models + endpoints** -sivu.
2. **Models + endpoints** -sivulla, **Model deployments** -välilehdellä, kohtaa **+ Deploy model** ja valitse **Deploy base model**.
3. Etsi listasta `gpt-4.1-mini` -malli, valitse se ja vahvista.

    > **Huom:** TPM:n alentaminen auttaa välttämään tässä käytetyn tilauksen käytettävissä olevan kiintiön ylikäytön.

    ![Model Deployed](../../../translated_images/fi/model-deployment.3749c53fb81e18fd.webp)

## Luo agentti

Nyt kun olet ottanut mallin käyttöön, voit luoda agentin. Agentti on keskusteleva tekoälymalli, jota voidaan käyttää vuorovaikutukseen käyttäjien kanssa.

1. Projektisi vasemman reunan ruudussa, kohdassa **Build & Customize** valitse **Agents** -sivu.
2. Klikkaa **+ Create agent** luodaksesi uuden agentin. **Agent Setup** -valintaikkunassa:
    - Anna agentille nimi, kuten `FlightAgent`.
    - Varmista, että aiemmin luomasi `gpt-4.1-mini` -mallin käyttöönotto on valittuna
    - Aseta **Instructions** eli ohjeistus agentille sitä halutulla tavalla. Tässä esimerkki:
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
> Yksityiskohtaista kehotetta varten voit tutustua [tähän repositorioon](https://github.com/ShivamGoyal03/RoamMind) lisätietoja varten.
    
> Lisäksi voit lisätä **Knowledge Base** ja **Actions** parantaaksesi agentin kykyjä tarjota lisätietoa ja suorittaa automaattisia tehtäviä käyttäjän pyyntöjen pohjalta. Tässä harjoituksessa nämä vaiheet voi jättää väliin.
    
![Agent Setup](../../../translated_images/fi/agent-setup.9bbb8755bf5df672.webp)

3. Luo uusi monitekoälyagentti klikkaamalla **New Agent**. Uusi agentti näkyy sitten Agents-sivulla.


## Testaa agentti

Agentin luomisen jälkeen voit testata sitä nähdäksesi, miten se vastaa käyttäjän kyselyihin Microsoft Foundry -portaalin leikkikentällä.

1. Agentin **Setup**-ruudun yläosasta valitse **Try in playground**.
2. **Playground**-ruudussa voit vuorovaikuttaa agentin kanssa kirjoittamalla kyselyjä keskusteluikkunaan. Voit esimerkiksi pyytää agenttia etsimään lentoja Seattlesta New Yorkiin 28. päivälle.

    > **Huom**: Agentti ei välttämättä anna tarkkoja vastauksia, koska tässä harjoituksessa ei käytetä reaaliaikaista dataa. Tarkoituksena on testata agentin kykyä ymmärtää ja vastata käyttäjän kysymyksiin annettujen ohjeiden perusteella.

    ![Agent Playground](../../../translated_images/fi/agent-playground.dc146586de715010.webp)

3. Testauksen jälkeen voit edelleen räätälöidä agenttia lisäämällä siihen intenttejä, koulutusdataa ja toimintoja sen kykyjen parantamiseksi.

## Puhdista resurssit

Kun olet lopettanut agentin testaamisen, voit poistaa sen välttääksesi lisäkustannukset.
1. Avaa [Azure-portaali](https://portal.azure.com) ja tarkastele sitä resurssiryhmää, johon olet ottanut käytön harjoituksessa käytetyt keskuksen resurssit.
2. Valitse työkaluriviltä **Delete resource group**.
3. Syötä resurssiryhmän nimi ja vahvista, että haluat poistaa sen.

## Resurssit

- [Microsoft Foundryn dokumentaatio](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry -portaali](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Aloita Microsoft Foundryn kanssa](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Tekoälyagenttien perusteet Azuren avulla](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->