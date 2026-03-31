# Разработка сервиса агентов Azure AI

В этом упражнении вы используете инструменты сервиса Azure AI Agent в портале [Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst), чтобы создать агента для бронирования авиабилетов. Агент сможет взаимодействовать с пользователями и предоставлять информацию о рейсах.

## Требования

Для выполнения этого упражнения вам потребуется следующее:
1. Учетная запись Azure с активной подпиской. [Создать учетную запись бесплатно](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Права на создание хаба Microsoft Foundry или наличие уже созданного для вас хаба.
    - Если ваша роль Contributor или Owner, вы можете следовать шагам в этом руководстве.

## Создание хаба Microsoft Foundry

> **Note:** Microsoft Foundry ранее назывался Azure AI Studio.

1. Следуйте этим рекомендациям из поста в блоге [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) для создания хаба Microsoft Foundry.
2. Когда ваш проект будет создан, закройте любые подсказки и просмотрите страницу проекта в портале Microsoft Foundry, которая должна выглядеть примерно как на следующем изображении:

    ![Проект Microsoft Foundry](../../../translated_images/ru/azure-ai-foundry.88d0c35298348c2f.webp)

## Развертывание модели

1. В панели слева вашего проекта в разделе **My assets** выберите страницу **Models + endpoints**.
2. На странице **Models + endpoints**, на вкладке **Model deployments**, в меню **+ Deploy model** выберите **Deploy base model**.
3. Найдите модель `gpt-4o-mini` в списке, затем выберите её и подтвердите выбор.

    > **Note**: Снижение TPM помогает не превышать квоту, доступную в используемой подписке.

    ![Модель развернута](../../../translated_images/ru/model-deployment.3749c53fb81e18fd.webp)

## Создание агента

Теперь, когда вы развернули модель, можно создать агента. Агент — это модель разговорного ИИ, которая может использоваться для взаимодействия с пользователями.

1. В панели слева вашего проекта в разделе **Build & Customize** выберите страницу **Agents**.
2. Нажмите **+ Create agent**, чтобы создать нового агента. В диалоговом окне **Agent Setup**:
    - Введите имя агента, например `FlightAgent`.
    - Убедитесь, что выбранное ранее развертывание модели `gpt-4o-mini` указано.
    - Установите **Instructions** в соответствии с подсказкой, которой вы хотите, чтобы следовал агент. Вот пример:
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
> Для подробной подсказки вы можете посмотреть [этот репозиторий](https://github.com/ShivamGoyal03/RoamMind) для получения дополнительной информации.
    
> Кроме того, вы можете добавить **Knowledge Base** и **Actions**, чтобы расширить возможности агента по предоставлению информации и выполнению автоматических задач на основе запросов пользователей. Для этого упражнения вы можете пропустить эти шаги.
    
![Настройка агента](../../../translated_images/ru/agent-setup.9bbb8755bf5df672.webp)

3. Чтобы создать нового мульти-ИИ агента, просто нажмите **New Agent**. Новый агент отобразится на странице Agents.


## Тестирование агента

После создания агента вы можете протестировать его, чтобы увидеть, как он отвечает на запросы пользователей в песочнице портала Microsoft Foundry.

1. В верхней части панели **Setup** для вашего агента выберите **Try in playground**.
2. В панели **Playground** вы можете взаимодействовать с агентом, вводя запросы в окне чата. Например, вы можете попросить агента поискать рейсы из Seattle в New York на 28-е.

    > **Note**: Агент может не давать точных ответов, так как в этом упражнении не используются данные в реальном времени. Цель — протестировать способность агента понимать и отвечать на запросы пользователей на основе предоставленных инструкций.

    ![Песочница агента](../../../translated_images/ru/agent-playground.dc146586de715010.webp)

3. После тестирования агента вы можете дополнительно настроить его, добавив больше намерений, обучающих данных и действий для расширения его возможностей.

## Очистка ресурсов

Когда закончите тестирование агента, вы можете удалить его, чтобы избежать дополнительных расходов.
1. Откройте [Azure portal](https://portal.azure.com) и просмотрите содержимое ресурсной группы, в которой вы развернули ресурсы хаба, использованные в этом упражнении.
2. На панели инструментов выберите **Delete resource group**.
3. Введите имя ресурсной группы и подтвердите, что вы хотите её удалить.

## Ресурсы

- [Документация Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Портал Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Начало работы с Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Основы агентов ИИ в Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Данный документ был переведён с помощью сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Хотя мы стремимся к точности, имейте в виду, что автоматические переводы могут содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для критически важной информации рекомендуется обращаться к профессиональному (человеческому) переводу. Мы не несем ответственности за любые недоразумения или неверные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->