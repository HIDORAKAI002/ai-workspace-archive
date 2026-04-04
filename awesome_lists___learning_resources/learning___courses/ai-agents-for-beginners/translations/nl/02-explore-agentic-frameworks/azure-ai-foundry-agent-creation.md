# Azure AI Agent Service-ontwikkeling

In deze oefening gebruikt u de Azure AI Agent service-tools in het [Microsoft Foundry-portaal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) om een agent voor het boeken van vluchten te maken. De agent kan met gebruikers communiceren en informatie geven over vluchten.

## Vereisten

Om deze oefening te voltooien, heeft u het volgende nodig:
1. Een Azure-account met een actieve abonnement. [Maak gratis een account aan](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. U heeft toestemming nodig om een Microsoft Foundry-hub aan te maken of er een voor u te laten aanmaken.
    - Als uw rol Contributor of Owner is, kunt u de stappen in deze handleiding volgen.

## Maak een Microsoft Foundry-hub aan

> **Opmerking:** Microsoft Foundry heette voorheen Azure AI Studio.

1. Volg deze richtlijnen uit de [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) blogpost om een Microsoft Foundry-hub aan te maken.
2.  Wanneer uw project is aangemaakt, sluit dan eventuele getoonde tips en bekijk de projectpagina in het Microsoft Foundry-portaal, die er ongeveer zo uit zou moeten zien:

    ![Microsoft Foundry Project](../../../translated_images/nl/azure-ai-foundry.88d0c35298348c2f.webp)

## Implementeer een model

1. Klik in het linkerpaneel van uw project in de sectie **My assets** op de pagina **Models + endpoints**.
2. Op de pagina **Models + endpoints**, op het tabblad **Model deployments**, kiest u in het menu **+ Deploy model** voor **Deploy base model**.
3. Zoek in de lijst naar het model `gpt-4o-mini` en selecteer en bevestig dit.

    > **Opmerking**: Het verlagen van de TPM helpt overmatig gebruik van de quota in het abonnement dat u gebruikt te voorkomen.

    ![Model Deployed](../../../translated_images/nl/model-deployment.3749c53fb81e18fd.webp)

## Maak een agent aan

Nu u een model hebt geïmplementeerd, kunt u een agent maken. Een agent is een conversatiemodel dat kan worden gebruikt om met gebruikers te communiceren.

1. Klik in het linkerpaneel van uw project in de sectie **Build & Customize** op de pagina **Agents**.
2. Klik op **+ Create agent** om een nieuwe agent te maken. In het dialoogvenster **Agent Setup**:
    - Voer een naam in voor de agent, bijvoorbeeld `FlightAgent`.
    - Zorg ervoor dat de eerder aangemaakte model-implementatie `gpt-4o-mini` is geselecteerd.
    - Stel de **Instructions** in volgens de instructies die u wilt dat de agent volgt. Hier is een voorbeeld:
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
> Voor een gedetailleerde prompt kunt u kijken in [deze repository](https://github.com/ShivamGoyal03/RoamMind) voor meer informatie.
    
> Bovendien kunt u **Knowledge Base** en **Actions** toevoegen om de mogelijkheden van de agent uit te breiden zodat hij meer informatie kan geven en geautomatiseerde taken kan uitvoeren op basis van gebruikersverzoeken. Voor deze oefening kunt u deze stappen overslaan.
    
![Agent Setup](../../../translated_images/nl/agent-setup.9bbb8755bf5df672.webp)

3. Om een nieuwe multi-AI-agent te maken, klikt u gewoon op **New Agent**. De nieuw aangemaakte agent wordt dan weergegeven op de Agents-pagina.


## Test de agent

Na het maken van de agent kunt u deze testen om te zien hoe hij reageert op gebruikersvragen in het Microsoft Foundry-portaal speelveld.

1. Selecteer bovenaan het paneel **Setup** voor uw agent de optie **Try in playground**.
2. In het paneel **Playground** kunt u met de agent communiceren door vragen te typen in het chatvenster. U kunt de agent bijvoorbeeld vragen om te zoeken naar vluchten van Seattle naar New York op de 28e.

    > **Opmerking**: De agent geeft mogelijk geen accurate antwoorden, omdat er in deze oefening geen realtime gegevens worden gebruikt. Het doel is om de vaardigheid van de agent te testen om gebruikersvragen te begrijpen en erop te reageren op basis van de gegeven instructies.

    ![Agent Playground](../../../translated_images/nl/agent-playground.dc146586de715010.webp)

3. Na het testen van de agent kunt u deze verder aanpassen door meer intenties, trainingsgegevens en acties toe te voegen om de mogelijkheden te verbeteren.

## Opruimen van resources

Als u klaar bent met het testen van de agent, kunt u deze verwijderen om extra kosten te voorkomen.
1. Open het [Azure-portaal](https://portal.azure.com) en bekijk de inhoud van de resourcegroep waar u de hub resources hebt geïmplementeerd die in deze oefening zijn gebruikt.
2. Klik op de werkbalk op **Delete resource group**.
3. Voer de naam van de resourcegroep in en bevestig dat u deze wilt verwijderen.

## Bronnen

- [Microsoft Foundry-documentatie](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry-portaal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Aan de slag met Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Basisprincipes van AI-agenten op Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het oorspronkelijke document in de originele taal dient als de gezaghebbende bron te worden beschouwd. Voor belangrijke informatie wordt een professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->