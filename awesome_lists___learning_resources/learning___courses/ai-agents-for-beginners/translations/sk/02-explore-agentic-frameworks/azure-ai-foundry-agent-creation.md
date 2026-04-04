# Vývoj služby Azure AI Agent

V tomto cvičení používate nástroje služby Azure AI Agent v [portáli Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) na vytvorenie agenta pre Rezerváciu letu. Agent bude schopný komunikovať s používateľmi a poskytovať informácie o letoch.

## Požiadavky

Na dokončenie tohto cvičenia potrebujete nasledovné:
1. Azure účet s aktívnym predplatným. [Vytvorte si účet zadarmo](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Potrebujete oprávnenia na vytvorenie Microsoft Foundry hubu alebo mať jeden vytvorený pre vás.
    - Ak ste priradení ako Kontributor alebo Vlastník, môžete nasledovať kroky v tomto návode.

## Vytvorenie Microsoft Foundry hubu

> **Poznámka:** Microsoft Foundry bol predtým známy ako Azure AI Studio.

1. Dodržte tieto pokyny z [blogového príspevku Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) na vytvorenie Microsoft Foundry hubu.
2. Keď je váš projekt vytvorený, zatvorte všetky zobrazené tipy a prehliadnite si stránku projektu v portáli Microsoft Foundry, ktorá by mala vyzerať podobne ako na nasledujúcom obrázku:

    ![Microsoft Foundry Project](../../../translated_images/sk/azure-ai-foundry.88d0c35298348c2f.webp)

## Nasadenie modelu

1. V ľavom paneli vášho projektu v sekcii **Moje aktíva** vyberte stránku **Modely + koncové body**.
2. Na stránke **Modely + koncové body**, na karte **Nasadenia modelov**, v ponuke **+ Nasadiť model** vyberte **Nasadiť základný model**.
3. Vyhľadajte v zozname model `gpt-4o-mini`, potom ho vyberte a potvrďte.

    > **Poznámka**: Zníženie TPM pomáha vyhnúť sa nadmernému využívaniu kvóty dostupnej vo vašom predplatnom.

    ![Model Deployed](../../../translated_images/sk/model-deployment.3749c53fb81e18fd.webp)

## Vytvorenie agenta

Keď ste nasadili model, môžete vytvoriť agenta. Agent je konverzačný AI model, ktorý umožňuje interakciu s používateľmi.

1. V ľavom paneli vášho projektu, v sekcii **Vytvárať a prispôsobiť**, vyberte stránku **Agenti**.
2. Kliknite na **+ Vytvoriť agenta** na vytvorenie nového agenta. V dialógovom okne **Nastavenie agenta**:
    - Zadajte meno pre agenta, napríklad `FlightAgent`.
    - Uistite sa, že je vybraný nasadený model `gpt-4o-mini`, ktorý ste predtým vytvorili.
    - Nastavte **Inštrukcie** podľa výzvy, ktorú chcete, aby agent nasledoval. Tu je príklad:
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
> Pre podrobnú výzvu si môžete pozrieť [tento repozitár](https://github.com/ShivamGoyal03/RoamMind) pre viac informácií.
    
> Okrem toho môžete pridať **Znalostnú bázu** a **Akcie** na rozšírenie schopností agenta poskytovať viac informácií a vykonávať automatizované úlohy na základe požiadaviek používateľa. Pre toto cvičenie môžete tieto kroky vynechať.
    
![Agent Setup](../../../translated_images/sk/agent-setup.9bbb8755bf5df672.webp)

3. Ak chcete vytvoriť nového multi-AI agenta, jednoducho kliknite na **Nový agent**. Novovytvorený agent sa potom zobrazí na stránke Agentov.


## Testovanie agenta

Po vytvorení agenta ho môžete otestovať, ako reaguje na otázky používateľov v sandbaxe portálu Microsoft Foundry.

1. V hornej časti panela **Nastavenie** pre vášho agenta vyberte **Vyskúšať v sandboxe**.
2. V paneli **Playground** môžete komunikovať s agentom pri písaní otázok do chatovacieho okna. Napríklad môžete požiadať agenta, aby vyhľadal lety zo Seattle do New Yorku 28-teho.

    > **Poznámka**: Agent nemusí poskytovať presné odpovede, pretože v tomto cvičení sa nepoužívajú žiadne dáta v reálnom čase. Cieľom je otestovať schopnosť agenta porozumieť a reagovať na požiadavky používateľov na základe zadaných inštrukcií.

    ![Agent Playground](../../../translated_images/sk/agent-playground.dc146586de715010.webp)

3. Po otestovaní agenta ho môžete ďalej prispôsobiť pridaním ďalších zámerov, tréningových dát a akcií na rozšírenie jeho schopností.

## Vyčistenie zdrojov

Keď dokončíte testovanie agenta, môžete ho odstrániť, aby ste predišli ďalším nákladom.
1. Otvorte [Azure portál](https://portal.azure.com) a zobrazte obsah skupiny prostriedkov, kde ste nasadili hubové prostriedky použité v tomto cvičení.
2. Na paneli nástrojov vyberte **Odstrániť skupinu prostriedkov**.
3. Zadajte meno skupiny prostriedkov a potvrďte, že ju chcete odstrániť.

## Zdroje

- [Dokumentácia Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Portál Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Začíname s Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Základy AI agentov na Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zrieknutie sa zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, prosím, vezmite na vedomie, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nedorozumenia alebo nesprávne výklady vyplývajúce z používania tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->