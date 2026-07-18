# Microsoft Foundry ügynökszolgáltatás fejlesztése

Ebben a gyakorlatban a Microsoft Foundry ügynökszolgáltatás eszközeit használod a [Microsoft Foundry portálon](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) egy Ügynök létrehozásához a Repülőjegy Foglaláshoz. Az ügynök képes lesz kommunikálni a felhasználókkal és információkat szolgáltatni a járatokról.

## Előfeltételek

A gyakorlat befejezéséhez szükséged van a következőkre:
1. Egy Azure fiók aktív előfizetéssel. [Regisztrálj ingyen](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Jogosultságod kell legyen Microsoft Foundry hub létrehozására vagy legyen létrehozva számodra egy.
    - Ha a szereped Contributor vagy Owner, követheted a jelen útmutató lépéseit.

## Microsoft Foundry hub létrehozása

> **Megjegyzés:** A Microsoft Foundryt korábban Azure AI Studiónak hívták.

1. Kövesd a [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) blogbejegyzés irányelveit egy Microsoft Foundry hub létrehozásához.
2. Amikor a projekt létrejött, zárj be minden megjelenő tippet, és tekintsd át a projektoldalt a Microsoft Foundry portálon, amely hasonló lesz az alábbi képhez:

    ![Microsoft Foundry Project](../../../translated_images/hu/azure-ai-foundry.88d0c35298348c2f.webp)

## Modell telepítése

1. A bal oldali panelen a projektnél a **My assets** részben válaszd a **Models + endpoints** oldalt.
2. A **Models + endpoints** oldalon a **Model deployments** fülön a **+ Deploy model** menüben válaszd a **Deploy base model** lehetőséget.
3. Keresd ki a `gpt-4.1-mini` modellt a listában, majd válaszd ki és erősítsd meg.

    > **Megjegyzés**: A TPM csökkentése segít elkerülni az előfizetésedben rendelkezésre álló kvóta túlzott használatát.

    ![Model Deployed](../../../translated_images/hu/model-deployment.3749c53fb81e18fd.webp)

## Ügynök létrehozása

Miután telepítettél egy modellt, létrehozhatsz egy ügynököt. Az ügynök egy konverzációs MI modell, amely képes a felhasználókkal való interakcióra.

1. A bal oldali panelen a projektnél a **Build & Customize** részben válaszd az **Agents** oldalt.
2. Kattints a **+ Create agent** gombra egy új ügynök létrehozásához. Az **Agent Setup** párbeszédpanelen:
    - Írj be egy nevet az ügynöknek, például `FlightAgent`.
    - Győződj meg róla, hogy a korábban létrehozott `gpt-4.1-mini` modell telepítés ki van választva.
    - Állítsd be az **Utasításokat** (Instructions) a kívánt prompt szerint, amit az ügynöknek követnie kell. Íme egy példa:
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
> Részletes promptért tekintsd meg [ezt a tárolót](https://github.com/ShivamGoyal03/RoamMind) további információért.
    
> Ezen felül adhatsz hozzá **Tudásbázist** (Knowledge Base) és **Műveleteket** (Actions), hogy növeld az ügynök képességeit, több információt szolgáltatva és automatizált feladatokat végezve a felhasználói kérések alapján. Ehhez a gyakorlathoz ezeket a lépéseket kihagyhatod.
    
![Agent Setup](../../../translated_images/hu/agent-setup.9bbb8755bf5df672.webp)

3. Új multi-MI ügynök létrehozásához egyszerűen kattints az **Új ügynök** (New Agent) gombra. Az újonnan létrehozott ügynök meg fog jelenni az Agents oldalon.


## Ügynök tesztelése

Az ügynök létrehozása után tesztelheted, hogyan válaszol a felhasználói kérdésekre a Microsoft Foundry portál játszóterén.

1. Az ügynök **Beállítás** (Setup) paneljének tetején válaszd a **Try in playground** lehetőséget.
2. A **Playground** panelen a csevegőablakba írt kérdésekkel kommunikálhatsz az ügynökkel. Például megkérheted az ügynököt, hogy keressen járatokat Seattle és New York között a 28-ára.

    > **Megjegyzés**: Az ügynök nem feltétlenül ad pontos válaszokat, mivel ebben a gyakorlatban nem használnak valós idejű adatokat. A cél az, hogy teszteld az ügynök képességét a felhasználói kérdések értelmezésére és megválaszolására az adott utasítások alapján.

    ![Agent Playground](../../../translated_images/hu/agent-playground.dc146586de715010.webp)

3. A tesztelést követően az ügynök további személyre szabásához adhatsz hozzá több szándékot (intents), tanító adatot és műveleteket (actions) a képességeinek fejlesztésére.

## Erőforrások eltávolítása

Ha befejezted az ügynök tesztelését, törölheted azt, hogy elkerüld a további költségeket.
1. Nyisd meg az [Azure portált](https://portal.azure.com) és nézd meg annak az erőforráscsoportnak a tartalmát, ahova a gyakorlat során telepítetted a hub erőforrásokat.
2. Az eszköztáron válaszd a **Erőforráscsoport törlése** (Delete resource group) lehetőséget.
3. Add meg az erőforráscsoport nevét, és erősítsd meg a törlést.

## Erőforrások

- [Microsoft Foundry dokumentáció](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portál](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry kezdőknek](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure MI ügynökök alapjai](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->