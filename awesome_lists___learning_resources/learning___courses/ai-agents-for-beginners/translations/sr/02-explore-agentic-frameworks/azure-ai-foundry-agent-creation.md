# Развој Azure AI агента

У овом задатку, користите алате сервиса Azure AI Agent у [Microsoft Foundry порталу](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) да бисте креирали агента за резервацију летова. Агент ће моћи да комуницира са корисницима и пружа информације о летовима.

## Захтеви

Да бисте завршили овај задатак, потребно вам је следеће:
1. Azure налог са активном претплатом. [Направите налог бесплатно](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Потребна вам је дозвола за креирање Microsoft Foundry хаба или да вам неко направи.
    - Ако сте у улози Contributor или Owner, можете пратити кораке у овом туторијалу.

## Креирање Microsoft Foundry хаба

> **Белешка:** Microsoft Foundry је претходно био познат као Azure AI Studio.

1. Пратити ове смернице из [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) блог поста за креирање Microsoft Foundry хаба.
2. Када је пројекат креиран, затворите све приказане савете и прегледајте страницу пројекта у Microsoft Foundry порталу, која би требало да изгледа слично као на следећој слици:

    ![Microsoft Foundry Project](../../../translated_images/sr/azure-ai-foundry.88d0c35298348c2f.webp)

## Деплојовање модела

1. У левом панелу вашег пројекта, у секцији **My assets**, изаберите страницу **Models + endpoints**.
2. На страници **Models + endpoints**, у табу **Model deployments**, у менију **+ Deploy model**, изаберите **Deploy base model**.
3. Потражите модел `gpt-4o-mini` у листи, затим га изаберите и потврдите.

    > **Белешка**: Смањивање TPM помаже да се избегне пречесто коришћење квоте која вам стоји на располагању у претплати коју користите.

    ![Model Deployed](../../../translated_images/sr/model-deployment.3749c53fb81e18fd.webp)

## Креирање агента

Сада када сте деплојовали модел, можете креирати агента. Агент је разговорни AI модел који се користи за интеракцију са корисницима.

1. У левом панелу вашег пројекта, у секцији **Build & Customize**, изаберите страницу **Agents**.
2. Кликните **+ Create agent** да бисте креирали новог агента. У дијалошком прозору **Agent Setup**:
    - Унесите име агента, на пример `FlightAgent`.
    - Уверите се да је изабран `gpt-4o-mini` модел деплојован раније.
    - Подесите **Instructions** у складу са упутствима која желите да агент прати. Ево примера:
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
> За детаљнији упит, можете погледати [овaj репозиторијум](https://github.com/ShivamGoyal03/RoamMind) за више информација.
    
> Поред тога, можете додати **Knowledge Base** и **Actions** да бисте повећали могућности агента да пружи више информација и извршава аутоматизоване задатке на основу захтева корисника. За овај задатак, ове кораке можете прескочити.
    
![Agent Setup](../../../translated_images/sr/agent-setup.9bbb8755bf5df672.webp)

3. Да бисте креирали новог мулти-AI агента, једноставно кликните **New Agent**. Новокреирани агент ће се појавити на страници Agents.


## Тестирање агента

Након креирања агента, можете га тестирати да видите како одговара на упите корисника у Microsoft Foundry портал playground-у.

1. На врху панела **Setup** за вашег агента, изаберите **Try in playground**.
2. У панели **Playground**, можете комуницирати са агентом тако што ћете унети упите у прозор за чат. На пример, можете питати агента да потражи летове са Сијетла до Њујорка 28. у месецу.

    > **Белешка**: Агент можда неће давати тачне одговоре, јер се у овом задатку не користе подаци у реалном времену. Сврха је тестирати способност агента да разуме и одговара на корисничке упите у складу са датим упутствима.

    ![Agent Playground](../../../translated_images/sr/agent-playground.dc146586de715010.webp)

3. Након тестирања агента, можете га додатно прилагодити додавањем више намера, података за тренинг и акција да повећате његове могућности.

## Чишћење ресурса

Када завршите са тестирањем агента, можете га обрисати да бисте избегли додатне трошкове.
1. Отворите [Azure портал](https://portal.azure.com) и прегледајте садржај групе ресурса у којој сте деплојовали ресурсе хаба коришћене у овом задатку.
2. На траци са алаткама изаберите **Delete resource group**.
3. Унесите име групе ресурса и потврдите да желите да је избришете.

## Ресурси

- [Microsoft Foundry документација](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry портал](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Почетак рада са Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Основе AI агената на Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Искључење одговорности**:
Овај документ је преведен помоћу AI преводилачке услуге [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматизовани преводи могу садржати грешке или нетачности. Оригинални документ на свом изворном језику треба сматрати коначним и поузданим извором. За критичне информације препоручује се професионални људски превод. Ниједна одговорност није преузета за неспоразуме или погрешне интерпретације настале коришћењем овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->