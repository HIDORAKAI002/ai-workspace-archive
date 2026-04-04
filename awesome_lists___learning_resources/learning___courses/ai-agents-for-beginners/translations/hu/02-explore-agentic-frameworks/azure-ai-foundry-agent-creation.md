# Azure AI Agent Service fejlesztése

Ebben a gyakorlatban az Azure AI Agent service eszközeit használja a [Microsoft Foundry portálon](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) egy repülőjegy-foglaláshoz készült ügynök létrehozásához. Az ügynök képes lesz felhasználókkal kommunikálni és információt nyújtani a járatokról.

## Előfeltételek

A gyakorlat elvégzéséhez a következők szükségesek:
1. Egy Azure-fiók aktív előfizetéssel. [Regisztráljon ingyenes fiókot](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Jogosultságok, hogy létrehozhasson egy Microsoft Foundry hubot, vagy legyen Önnek létrehozva egy.
    - Ha a szerepköre Contributor vagy Owner, követheti a jelen útmutató lépéseit.

## Microsoft Foundry hub létrehozása

> **Megjegyzés:** A Microsoft Foundry korábban Azure AI Studio néven volt ismert.

1. Kövesse a [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) bejegyzés útmutatásait egy Microsoft Foundry hub létrehozásához.
2. Amikor a projekt létrejött, zárja be a megjelenő tippeket, és tekintse át a projektoldalt a Microsoft Foundry portálon, amely hasonlóan kell kinézzen az alábbi képhez:

    ![Microsoft Foundry projekt](../../../translated_images/hu/azure-ai-foundry.88d0c35298348c2f.webp)

## Egy modell telepítése

1. A projekt bal oldali ablaktábláján, a **My assets** részben válassza a **Models + endpoints** oldalt.
2. A **Models + endpoints** oldalon, a **Model deployments** fülön, a **+ Deploy model** menüben válassza a **Deploy base model** lehetőséget.
3. Keresse meg a `gpt-4o-mini` modellt a listában, majd válassza ki és erősítse meg a telepítést.

    > **Megjegyzés**: A TPM csökkentése segít elkerülni az Ön által használt előfizetésben rendelkezésre álló kvóta túlzott felhasználását.

    ![Modell telepítve](../../../translated_images/hu/model-deployment.3749c53fb81e18fd.webp)

## Egy ügynök létrehozása

Most, hogy telepített egy modellt, létrehozhat egy ügynököt. Az ügynök egy beszélgető AI modell, amely felhasználókkal való interakcióra használható.

1. A projekt bal oldali ablaktábláján, a **Build & Customize** részben válassza az **Agents** oldalt.
2. Kattintson a **+ Create agent** gombra egy új ügynök létrehozásához. Az **Agent Setup** párbeszédpanelen:
    - Adjon nevet az ügynöknek, például `FlightAgent`.
    - Győződjön meg róla, hogy a korábban létrehozott `gpt-4o-mini` modelltelepítés van kiválasztva
    - Állítsa be a **Utasításokat** (Instructions) az alapján, hogy milyen promptot szeretne, hogy az ügynök kövessen. Íme egy példa:
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
> Részletes promptért megtekintheti [ezt a repozitóriumot](https://github.com/ShivamGoyal03/RoamMind) további információkért.
    
> Továbbá hozzáadhat **Tudásbázist** és **Műveleteket**, hogy bővítse az ügynök képességeit további információ nyújtására és automatizált feladatok végrehajtására a felhasználói kérések alapján. Ebben a gyakorlatban ezeket a lépéseket kihagyhatja.
    
![Ügynök beállítása](../../../translated_images/hu/agent-setup.9bbb8755bf5df672.webp)

3. Új multi-AI ügynök létrehozásához egyszerűen kattintson a **Új ügynök** gombra. Az újonnan létrehozott ügynök ezután megjelenik az Ügynökök oldalon.


## Az ügynök tesztelése

Az ügynök létrehozása után kipróbálhatja, hogyan reagál a felhasználói lekérdezésekre a Microsoft Foundry portál playgroundjában.

1. Az ügynök **Setup** ablaktáblájának tetején válassza a **Try in playground** lehetőséget.
2. A **Playground** ablaktáblában a csevegőablakba gépelve léphet interakcióba az ügynökkel. Például megkérheti az ügynököt, hogy keressen járatokat Seattle és New York között a 28-ára.

    > **Megjegyzés**: Az ügynök pontatlan válaszokat adhat, mivel ebben a gyakorlatban nem használnak valós idejű adatokat. A cél az, hogy tesztelje az ügynök képességét a felhasználói lekérdezések megértésére és megválaszolására az adott utasítások alapján.

    ![Ügynök próbapad](../../../translated_images/hu/agent-playground.dc146586de715010.webp)

3. Az ügynök tesztelése után tovább testreszabhatja azt több szándék, tanítóadat és művelet hozzáadásával a képességeinek növeléséhez.

## Erőforrások törlése

Miután befejezte az ügynök tesztelését, törölheti azt, hogy elkerülje a további költségeket.
1. Nyissa meg az [Azure portált](https://portal.azure.com) és tekintse meg annak az erőforráscsoportnak a tartalmát, ahol a hub erőforrásokat telepítette ebben a gyakorlatban.
2. Az eszköztáron válassza a **Delete resource group** lehetőséget.
3. Adja meg az erőforráscsoport nevét, és erősítse meg, hogy törölni kívánja azt.

## Források

- [Microsoft Foundry dokumentáció](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portál](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio kezdő útmutató](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [AI-ügynökök alapjai az Azure-on](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősségkizárás**:
Ez a dokumentum a [Co-op Translator](https://github.com/Azure/co-op-translator) mesterséges intelligencia alapú fordító szolgáltatásával készült. Bár törekszünk a pontosságra, kérjük, vegye figyelembe, hogy az automatizált fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti, anyanyelvi dokumentum tekintendő hiteles forrásnak. Kritikus információk esetén professzionális, emberi fordítást javaslunk. Nem vállalunk felelősséget a jelen fordítás használatából eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->