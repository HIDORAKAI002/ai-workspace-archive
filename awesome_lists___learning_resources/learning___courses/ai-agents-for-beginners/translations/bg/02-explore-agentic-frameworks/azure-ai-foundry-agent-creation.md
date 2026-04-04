# Разработка на услуга Azure AI Agent

В това упражнение използвате инструментите на услугата Azure AI Agent в портала [Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst), за да създадете агент за резервация на полети. Агентът ще може да взаимодейства с потребителите и да предоставя информация за полети.

## Изисквания

За да завършите това упражнение, ви трябват следните неща:
1. Акаунт в Azure с активен абонамент. [Създайте акаунт безплатно](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Трябва да имате разрешения за създаване на Microsoft Foundry hub или някой да ви го създаде.
    - Ако вашата роля е Contributor или Owner, можете да следвате стъпките в това ръководство.

## Създаване на Microsoft Foundry hub

> **Забележка:** Microsoft Foundry преди беше известен като Azure AI Studio.

1. Следвайте тези насоки от публикацията в блога на [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) за създаване на Microsoft Foundry hub.
2. Когато проектът ви бъде създаден, затворете всички показани съвети и прегледайте страницата на проекта в портала Microsoft Foundry, която трябва да изглежда подобно на следното изображение:

    ![Microsoft Foundry Project](../../../translated_images/bg/azure-ai-foundry.88d0c35298348c2f.webp)

## Разгръщане на модел

1. В панела вляво за вашия проект, в секцията **My assets**, изберете страницата **Models + endpoints**.
2. В страницата **Models + endpoints**, в раздела **Model deployments**, в менюто **+ Deploy model** изберете **Deploy base model**.
3. Потърсете модела `gpt-4o-mini` в списъка, след което го изберете и потвърдете.

    > **Забележка**: Намаляването на TPM помага да се избегне прекомерно използване на квотата, налична в абонамента, който използвате.

    ![Model Deployed](../../../translated_images/bg/model-deployment.3749c53fb81e18fd.webp)

## Създаване на агент

Сега, след като сте разположили модел, можете да създадете агент. Агентът е разговорен AI модел, който може да се използва за взаимодействие с потребителите.

1. В панела вляво за вашия проект, в секцията **Build & Customize**, изберете страницата **Agents**.
2. Кликнете **+ Create agent** за да създадете нов агент. В диалоговия прозорец **Agent Setup**:
    - Въведете име за агента, например `FlightAgent`.
    - Уверете се, че разположеният от вас по-рано модел `gpt-4o-mini` е избран.
    - Задайте **Instructions** според подканата, която искате агентът да следва. Ето пример:
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
> За подробна подканваща фраза можете да разгледате [това хранилище](https://github.com/ShivamGoyal03/RoamMind) за повече информация.
    
> Освен това можете да добавите **Knowledge Base** и **Actions**, за да подобрите възможностите на агента да предоставя по-голям обем информация и да извършва автоматизирани задачи според заявките на потребителите. За това упражнение можете да пропуснете тези стъпки.
    
![Agent Setup](../../../translated_images/bg/agent-setup.9bbb8755bf5df672.webp)

3. За да създадете нов мулти-AI агент, просто кликнете **New Agent**. Новосъздаденият агент ще се покаже на страницата Agents.

## Тествайте агента

След като създадете агента, можете да го тествате, за да видите как отговаря на запитвания на потребителите в плейграунда на портала Microsoft Foundry.

1. В горната част на панела **Setup** за вашия агент изберете **Try in playground**.
2. В панела **Playground** можете да взаимодействате с агента, като въвеждате въпроси в прозореца за чат. Например, можете да поискате от агента да търси полети от Сиатъл до Ню Йорк на 28-ми.

    > **Забележка**: Агентът може да не дава точни отговори, тъй като в това упражнение не се използват данни в реално време. Целта е да се тества способността на агента да разбира и отговаря на запитванията на потребителите въз основа на предоставените инструкции.

    ![Agent Playground](../../../translated_images/bg/agent-playground.dc146586de715010.webp)

3. След теста можете да персонализирате агента, като добавите още намерения, тренировъчни данни и действия за подобряване на неговите възможности.

## Почистване на ресурсите

След като сте приключили с тестването на агента, можете да го изтриете, за да избегнете допълнителни разходи.
1. Отворете [портала Azure](https://portal.azure.com) и прегледайте съдържанието на групата ресурси, където разположихте ресурсите на хъба, използвани в това упражнение.
2. В лентата с инструменти изберете **Delete resource group**.
3. Въведете името на групата ресурси и потвърдете, че искате да я изтриете.

## Ресурси

- [Документация на Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Портал Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Запознаване с Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Основи на AI агентите в Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с използване на AI преводаческа услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля, имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->