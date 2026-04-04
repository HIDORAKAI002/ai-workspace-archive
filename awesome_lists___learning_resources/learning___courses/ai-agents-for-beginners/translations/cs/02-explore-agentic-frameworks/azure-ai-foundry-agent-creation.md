# Vývoj služby Azure AI Agent

V tomto cvičení použijete nástroje služby Azure AI Agent v [Microsoft Foundry portálu](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) k vytvoření agenta pro rezervaci letů. Agent bude schopný komunikovat s uživateli a poskytovat informace o letech.

## Předpoklady

K dokončení tohoto cvičení potřebujete následující:
1. Azure účet s aktivním předplatným. [Vytvořte si účet zdarma](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Potřebujete oprávnění k vytvoření hubu Microsoft Foundry nebo mít jeden vytvořený pro vás.
    - Pokud je vaše role Přispěvatel nebo Vlastník, můžete postupovat podle kroků v tomto tutoriálu.

## Vytvoření hubu Microsoft Foundry

> **Poznámka:** Microsoft Foundry byl dříve známý jako Azure AI Studio.

1. Řiďte se pokyny z příspěvku na blogu [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) pro vytvoření hubu Microsoft Foundry.
2. Po vytvoření projektu zavřete jakékoliv zobrazené tipy a prohlédněte si stránku projektu v portálu Microsoft Foundry, která by měla vypadat podobně jako na následujícím obrázku:

    ![Microsoft Foundry Project](../../../translated_images/cs/azure-ai-foundry.88d0c35298348c2f.webp)

## Nasazení modelu

1. V levém panelu vašeho projektu vyberte v sekci **Moje zdroje** stránku **Modely + koncové body**.
2. Na stránce **Modely + koncové body** v záložce **Nasazení modelů**, v menu **+ Nasadit model**, vyberte **Nasadit základní model**.
3. Vyhledejte model `gpt-4o-mini` v seznamu, poté jej vyberte a potvrďte.

    > **Poznámka**: Snížení TPM pomáhá zabránit nadměrnému využívání kvóty dostupné ve vašem předplatném.

    ![Model Deployed](../../../translated_images/cs/model-deployment.3749c53fb81e18fd.webp)

## Vytvoření agenta

Nyní, když máte nasazený model, můžete vytvořit agenta. Agent je konverzační AI model, který lze použít ke komunikaci s uživateli.

1. V levém panelu vašeho projektu vyberte v sekci **Vytvořit a přizpůsobit** stránku **Agentí**.
2. Klikněte na **+ Vytvořit agenta** pro vytvoření nového agenta. V dialogovém okně **Nastavení agenta**:
    - Zadejte název agenta, například `FlightAgent`.
    - Ujistěte se, že je vybrané nasazení modelu `gpt-4o-mini`, které jste vytvořili dříve.
    - Nastavte **Pokyny** podle promptu, který chcete, aby agent dodržoval. Zde je příklad:
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
> Pro podrobný prompt můžete navštívit [toto úložiště](https://github.com/ShivamGoyal03/RoamMind) pro více informací.
    
> Navíc můžete přidat **Znalostní bázi** a **Akce** pro rozšíření možností agenta poskytovat více informací a vykonávat automatizované úkoly na základě požadavků uživatelů. Pro toto cvičení můžete tyto kroky přeskočit.
    
![Agent Setup](../../../translated_images/cs/agent-setup.9bbb8755bf5df672.webp)

3. Pro vytvoření nového multi-AI agenta jednoduše klikněte na **Nový agent**. Nově vytvořený agent bude poté zobrazen na stránce Agentů.


## Otestujte agenta

Po vytvoření agenta jej můžete otestovat, jak reaguje na dotazy uživatelů v prostředí Microsoft Foundry portálu.

1. V horní části panelu **Nastavení** vašeho agenta vyberte **Vyzkoušet v playgroundu**.
2. V panelu **Playground** můžete komunikovat s agentem zadáváním dotazů do chatovacího okna. Například můžete požádat agenta, aby vyhledal lety z Seattle do New Yorku na 28. den.

    > **Poznámka**: Agent nemusí poskytovat přesné odpovědi, protože v tomto cvičení nejsou použita žádná data v reálném čase. Cílem je otestovat schopnost agenta porozumět a reagovat na uživatelské dotazy podle poskytnutých pokynů.

    ![Agent Playground](../../../translated_images/cs/agent-playground.dc146586de715010.webp)

3. Po otestování agenta jej můžete dále přizpůsobit přidáním více záměrů, tréninkových dat a akcí pro rozšíření jeho schopností.

## Vyčištění zdrojů

Po dokončení testování agenta jej můžete smazat, abyste předešli dalším nákladům.
1. Otevřete [Azure portál](https://portal.azure.com) a zobrazte obsah skupiny zdrojů, kde jste nasadili zdroje hubu použitého v tomto cvičení.
2. Na panelu nástrojů vyberte **Smazat skupinu zdrojů**.
3. Zadejte název skupiny zdrojů a potvrďte její smazání.

## Zdroje

- [Dokumentace Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portál](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Začínáme s Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Základy AI agentů na Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože se snažíme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho rodném jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo chybné výklady vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->