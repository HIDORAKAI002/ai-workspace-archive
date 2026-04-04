# Azure AI Agent Service kūrimas

Šiame pratime naudojate Azure AI Agent paslaugų įrankius [Microsoft Foundry portale](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst), kad sukurtumėte agentą skrydžių užsakymui. Agentas galės bendrauti su vartotojais ir teikti informaciją apie skrydžius.

## Prieš pradedant

Norėdami įvykdyti šį pratimą, jums reikia:
1. Azure paskyros su aktyvia prenumerata. [Sukurkite paskyrą nemokamai](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Turite turėti leidimus sukurti Microsoft Foundry centrą arba turėti jį sukurtą.
    - Jei jūsų vaidmuo yra Vėliau ar Savininkas, galite sekti šio mokymo veiksmus.

## Sukurkite Microsoft Foundry centrą

> **Pastaba:** Microsoft Foundry anksčiau buvo vadinamas Azure AI Studio.

1. Sekite šias gaires iš [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) tinklaraščio įrašo apie Microsoft Foundry centro kūrimą.
2. Kai projektas bus sukurtas, uždarykite rodomus patarimus ir peržiūrėkite projekto puslapį Microsoft Foundry portale, kuris turėtų atrodyti panašiai kaip žemiau pateikta nuotrauka:

    ![Microsoft Foundry Project](../../../translated_images/lt/azure-ai-foundry.88d0c35298348c2f.webp)

## Įdiekite modelį

1. Kairėje projekto srityje, skiltyje **My assets**, pasirinkite puslapį **Models + endpoints**.
2. Puslapyje **Models + endpoints**, skiltyje **Model deployments**, meniu **+ Deploy model** pasirinkite **Deploy base model**.
3. Sąraše suraskite modelį `gpt-4o-mini`, tada pasirinkite jį ir patvirtinkite.

    > **Pastaba**: Mažinant TPM padeda išvengti prenumeratos kvotos viršijimo.

    ![Model Deployed](../../../translated_images/lt/model-deployment.3749c53fb81e18fd.webp)

## Sukurkite agentą

Dabar, kai modelis įdiegtas, galite sukurti agentą. Agentas yra pokalbių AI modelis, kuris gali bendrauti su vartotojais.

1. Kairėje projekto srityje, skiltyje **Build & Customize**, pasirinkite puslapį **Agents**.
2. Spustelėkite **+ Create agent**, kad sukurtumėte naują agentą. Lange **Agent Setup**:
    - Įveskite agento pavadinimą, pavyzdžiui, `FlightAgent`.
    - Įsitikinkite, kad pasirinktas anksčiau sukurtas modelio diegimas `gpt-4o-mini`.
    - Nustatykite **Instructions** pagal užduotį, kurios agentas turi laikytis. Štai pavyzdys:
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
> Išsamesniam užduoties aprašymui galite pasižiūrėti [šį repozitorijų](https://github.com/ShivamGoyal03/RoamMind) daugiau informacijos.

> Be to, galite pridėti **Knowledge Base** ir **Actions**, kad pagerintumėte agento galimybes teikti daugiau informacijos ir vykdyti automatizuotas užduotis pagal vartotojų užklausas. Šiam pratimui šių žingsnių galite praleisti.

![Agent Setup](../../../translated_images/lt/agent-setup.9bbb8755bf5df672.webp)

3. Norėdami sukurti naują kelių AI agentų, tiesiog spustelėkite **New Agent**. Naujas agentas bus rodomas Agents puslapyje.

## Agentų testavimas

Sukūrus agentą, galite jį išbandyti, kad pamatytumėte, kaip jis atsako į vartotojų užklausas Microsoft Foundry portalo žaidimų aikštelėje.

1. Viršuje jūsų agento skiltyje **Setup**, pasirinkite **Try in playground**.
2. Skiltyje **Playground** galite bendrauti su agentu įvesdami užklausas pokalbių lange. Pavyzdžiui, galite paprašyti agento surasti skrydžius iš Sietlo į Niujorką 28 dienai.

    > **Pastaba**: Agentas gali nepateikti tikslių atsakymų, nes šio pratybų metu nenaudojami realaus laiko duomenys. Tikslas yra išbandyti agento gebėjimą suprasti ir reaguoti į vartotojų užklausas pagal pateiktas instrukcijas.

    ![Agent Playground](../../../translated_images/lt/agent-playground.dc146586de715010.webp)

3. Išbandę agentą, galite toliau jį pritaikyti pridėdami daugiau ketinimų, mokymo duomenų ir veiksmų, kad pagerintumėte jo galimybes.

## Išvalykite išteklius

Kai baigsite testuoti agentą, galite jį ištrinti, kad išvengtumėte papildomų išlaidų.
1. Atidarykite [Azure portalą](https://portal.azure.com) ir peržiūrėkite išteklių grupės turinį, kur įdiegėte centro išteklius šiam pratimui.
2. Įrankių juostoje pasirinkite **Delete resource group**.
3. Įveskite išteklių grupės pavadinimą ir patvirtinkite, kad norite ją ištrinti.

## Ištekliai

- [Microsoft Foundry dokumentacija](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portalas](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Pradžia su Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure AI agentų pagrindai](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:  
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogaus vertimą. Mes neatsakome už bet kokius nesusipratimus ar neteisingus aiškinimus, kilusius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->