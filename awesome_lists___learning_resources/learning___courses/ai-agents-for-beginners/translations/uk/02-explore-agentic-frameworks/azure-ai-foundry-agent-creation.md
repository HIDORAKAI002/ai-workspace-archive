# Розробка служби агентів Azure AI

У цьому практичному завданні ви використовуєте інструменти служби Azure AI Agent у [порталі Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst), щоб створити агента для бронювання авіарейсів. Агент зможе взаємодіяти з користувачами та надавати інформацію про рейси.

## Необхідні умови

Щоб виконати це завдання, вам потрібні такі ресурси:
1. Обліковий запис Azure з активною підпискою. [Створіть обліковий запис безкоштовно](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Вам потрібні дозволи для створення хаба Microsoft Foundry або щоб його створили за вас.
    - Якщо ваша роль — Contributor або Owner, ви можете виконати кроки в цьому підручнику.

## Створення хаба Microsoft Foundry

> **Примітка:** Microsoft Foundry раніше називався Azure AI Studio.

1. Дотримуйтесь інструкцій з допису в блозі [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) щодо створення хаба Microsoft Foundry.
2. Коли ваш проєкт буде створено, закрийте поради, що відображаються, і перегляньте сторінку проєкту в порталі Microsoft Foundry, яка має виглядати приблизно як на наведеному зображенні:

    ![Проєкт Microsoft Foundry](../../../translated_images/uk/azure-ai-foundry.88d0c35298348c2f.webp)

## Розгортання моделі

1. У панелі ліворуч для вашого проєкту в розділі **My assets** виберіть сторінку **Models + endpoints**.
2. На сторінці **Models + endpoints**, на вкладці **Model deployments**, у меню **+ Deploy model** виберіть **Deploy base model**.
3. Знайдіть у списку модель `gpt-4o-mini`, потім виберіть її та підтвердіть.

    > **Примітка**: Зменшення TPM допомагає уникнути надмірного використання квоти в підписці, яку ви використовуєте.

    ![Модель розгорнута](../../../translated_images/uk/model-deployment.3749c53fb81e18fd.webp)

## Створення агента

Тепер, коли ви розгорнули модель, можна створити агента. Агент — це модель розмовного ШІ, яка може використовуватися для взаємодії з користувачами.

1. У панелі ліворуч для вашого проєкту в розділі **Build & Customize** виберіть сторінку **Agents**.
2. Клацніть **+ Create agent**, щоб створити нового агента. У діалоговому вікні **Agent Setup**:
    - Введіть назву агента, наприклад `FlightAgent`.
    - Переконайтеся, що вибрано розгортання моделі `gpt-4o-mini`, яке ви створили раніше.
    - Встановіть **Instructions** відповідно до підказки, якій ви хочете, щоб агент слідував. Ось приклад:
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
> Для детальної підказки ви можете переглянути [цей репозиторій](https://github.com/ShivamGoyal03/RoamMind) для отримання додаткової інформації.
    
> Крім того, ви можете додати **Базу знань** та **Дії**, щоб розширити можливості агента для надання більшої інформації та виконання автоматизованих завдань на основі запитів користувачів. У цьому завданні ці кроки можна пропустити.
    
![Налаштування агента](../../../translated_images/uk/agent-setup.9bbb8755bf5df672.webp)

3. Щоб створити нового мульти-ШІ агента, просто натисніть **New Agent**. Новостворений агент потім відобразиться на сторінці Agents.

## Тестування агента

Після створення агента ви можете протестувати його, щоб побачити, як він відповідає на запити користувачів у пісочниці порталу Microsoft Foundry.

1. У верхній частині панелі **Setup** для вашого агента виберіть **Try in playground**.
2. У панелі **Playground** ви можете взаємодіяти з агентом, вводячи запити в вікні чату. Наприклад, ви можете попросити агента знайти рейси з Seattle до New York на 28-го числа.

    > **Примітка**: Агент може надавати неточні відповіді, оскільки в цьому завданні не використовуються дані в реальному часі. Мета — перевірити здатність агента розуміти та відповідати на запити користувачів на основі наданих інструкцій.

    ![Плейграунд агента](../../../translated_images/uk/agent-playground.dc146586de715010.webp)

3. Після тестування агента ви можете додатково налаштувати його, додаючи більше намірів (intents), тренувальних даних та дій, щоб підвищити його можливості.

## Очищення ресурсів

Коли ви завершите тестування агента, ви можете видалити його, щоб уникнути додаткових витрат.
1. Відкрийте [портал Azure](https://portal.azure.com) і перегляньте вміст групи ресурсів, де ви розгорнули ресурси хаба, використані в цьому завданні.
2. На панелі інструментів виберіть **Delete resource group**.
3. Введіть назву групи ресурсів і підтвердіть, що хочете її видалити.

## Ресурси

- [Документація Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Портал Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Початок роботи з Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Основи агентів ШІ в Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Спільнота Azure AI у Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Відмова від відповідальності:
Цей документ перекладено за допомогою сервісу перекладу на основі ШІ Co-op Translator (https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, зверніть увагу, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ його рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний переклад, виконаний людиною. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->