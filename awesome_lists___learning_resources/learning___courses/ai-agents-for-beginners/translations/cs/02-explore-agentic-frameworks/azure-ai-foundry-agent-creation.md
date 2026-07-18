# Vývoj služby Microsoft Foundry Agent

V tomto cvičení použijete nástroje služby Microsoft Foundry Agent ve [portálu Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) k vytvoření agenta pro rezervaci letů. Agent bude schopen komunikovat s uživateli a poskytovat informace o letech.

## Požadavky

Pro dokončení tohoto cvičení potřebujete následující:
1. Účet Azure s aktivním předplatným. [Vytvořte si účet zdarma](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Potřebujete oprávnění k vytvoření centra Microsoft Foundry nebo mít jedno vytvořené pro vás.
    - Pokud máte roli Přispěvatele nebo Vlastníka, můžete postupovat podle kroků v tomto tutoriálu.

## Vytvoření centra Microsoft Foundry

> **Poznámka:** Microsoft Foundry byla dříve známá jako Azure AI Studio.

1. Postupujte podle pokynů v blogovém příspěvku [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) pro vytvoření centra Microsoft Foundry.
2. Po vytvoření projektu zavřete zobrazené tipy a prohlédněte si stránku projektu v portálu Microsoft Foundry, která by měla vypadat podobně jako na následujícím obrázku:

    ![Microsoft Foundry Project](../../../translated_images/cs/azure-ai-foundry.88d0c35298348c2f.webp)

## Nasazení modelu

1. V levém panelu vašeho projektu v části **Moje zdroje** vyberte stránku **Modely + koncové body**.
2. Na stránce **Modely + koncové body** v záložce **Nasazení modelů** v nabídce **+ Nasadit model** vyberte **Nasadit základní model**.
3. Vyhledejte model `gpt-4.1-mini` v seznamu, poté jej vyberte a potvrďte.

    > **Poznámka**: Snížení TPM pomáhá zabránit nadměrnému využití kvóty dostupné ve vašem předplatném.

    ![Model Deployed](../../../translated_images/cs/model-deployment.3749c53fb81e18fd.webp)

## Vytvoření agenta

Po nasazení modelu můžete vytvořit agenta. Agent je konverzační AI model, který lze použít k interakci s uživateli.

1. V levém panelu projektu v části **Vytvořit a přizpůsobit** vyberte stránku **Agenti**.
2. Klikněte na **+ Vytvořit agenta** pro vytvoření nového agenta. V dialogovém okně **Nastavení agenta**:
    - Zadejte jméno agenta, například `FlightAgent`.
    - Ujistěte se, že je vybrané dříve vytvořené nasazení modelu `gpt-4.1-mini`.
    - Nastavte **Pokyny** podle výzvy, kterou chcete, aby agent sledoval. Zde je příklad:
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
> Pro podrobnější prompt můžete pro více informací navštívit [tento repozitář](https://github.com/ShivamGoyal03/RoamMind).
    
> Dále můžete přidat **Znalostní databázi** a **Akce** pro rozšíření schopností agenta poskytovat více informací a provádět automatizované úkoly na základě požadavků uživatelů. Pro toto cvičení můžete tyto kroky vynechat.
    
![Agent Setup](../../../translated_images/cs/agent-setup.9bbb8755bf5df672.webp)

3. Pro vytvoření nového multi-AI agenta jednoduše klikněte na **Nový agent**. Nově vytvořený agent se poté zobrazí na stránce Agentů.


## Testování agenta

Po vytvoření agenta jej můžete otestovat, jak reaguje na dotazy uživatelů v portálu Microsoft Foundry v pracovním prostoru playgroundu.

1. V horní části panelu **Nastavení** vašeho agenta vyberte **Vyzkoušet v playgroundu**.
2. V panelu **Playground** můžete s agentem komunikovat psaním dotazů do okna chatu. Například můžete agenta požádat o vyhledání letů ze Seattlu do New Yorku na 28.

    > **Poznámka**: Agent nemusí poskytovat přesné odpovědi, protože v tomto cvičení nejsou využívána žádná aktuální data. Účelem je otestovat schopnost agenta porozumět dotazům a reagovat na ně na základě poskytnutých pokynů.

    ![Agent Playground](../../../translated_images/cs/agent-playground.dc146586de715010.webp)

3. Po otestování agenta jej můžete dále přizpůsobit přidáním více záměrů, tréninkových dat a akcí pro rozšíření jeho schopností.

## Úklid zdrojů

Po dokončení testování agenta jej můžete odstranit, abyste předešli dalším nákladům.
1. Otevřete [Azure portal](https://portal.azure.com) a zobrazte obsah skupiny prostředků, kde jste nasadili prostředky centra použité v tomto cvičení.
2. Na panelu nástrojů vyberte **Smazat skupinu prostředků**.
3. Zadejte název skupiny prostředků a potvrďte, že ji chcete smazat.

## Zdroje

- [Dokumentace Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Portál Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Začínáme s Microsoft Foundry](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Základy AI agentů na Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->