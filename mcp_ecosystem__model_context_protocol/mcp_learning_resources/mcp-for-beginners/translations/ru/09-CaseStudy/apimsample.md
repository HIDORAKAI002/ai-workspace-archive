# Кейc: Объявление REST API в Azure API Management как MCP сервер

Azure API Management — это сервис, предоставляющий шлюз поверх ваших конечных точек API. Как он работает: Azure API Management выступает в роли прокси перед вашими API и может решать, что делать с входящими запросами.

Используя его, вы получаете множество функций, таких как:

- **Безопасность**: можно использовать всё — от ключей API, JWT до управляемой идентичности.
- **Ограничение скорости**: отличная функция, позволяющая ограничивать количество вызовов в определённый промежуток времени. Это помогает обеспечить отличный опыт для всех пользователей и не допустить перегрузки вашего сервиса.
- **Масштабирование и балансировка нагрузки**. Можно настроить несколько конечных точек для распределения нагрузки, а также выбрать метод балансировки нагрузки.
- **Функции ИИ, такие как семантическое кэширование**, лимит токенов, мониторинг токенов и другие. Эти функции улучшают отзывчивость и помогают контролировать расходы на токены. [Подробнее здесь](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Почему MCP + Azure API Management?

Протокол Model Context Protocol быстро становится стандартом для агентских AI-приложений и способа консистентного объявления инструментов и данных. Azure API Management — естественный выбор, когда нужно «управлять» API. MCP серверы часто интегрируются с другими API для обработки запросов к инструментам, например. Поэтому сочетание Azure API Management и MCP вполне логично.

## Обзор

В этом конкретном примере мы научимся объявлять конечные точки API как MCP сервер. Таким образом, эти конечные точки легко становятся частью агентского приложения, одновременно используя возможности Azure API Management.

## Основные возможности

- Вы выбираете методы конечной точки, которые хотите объявить как инструменты.
- Дополнительные функции зависят от того, что вы настроите в разделе политик для вашего API. Здесь мы покажем, как добавить ограничение скорости.

## Предварительный шаг: импорт API

Если у вас уже есть API в Azure API Management, отлично, этот шаг можно пропустить. Если нет, ознакомьтесь с этим [руководством по импорту API в Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Объявление API как MCP Server

Чтобы объявить конечные точки API, выполните следующие действия:

1. Перейдите в Azure Portal по адресу <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>. Перейдите к вашему экземпляру API Management.

1. В левом меню выберите APIs > MCP Servers > + Create new MCP Server.

1. В разделе API выберите REST API, который хотите объявить как MCP сервер.

1. Выберите одну или несколько операций API для объявления как инструменты. Можно выбрать все операции или только конкретные.

    ![Выберите методы для объявления](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Нажмите **Create**.

1. Перейдите к меню **APIs** и **MCP Servers**, вы увидите следующее:

    ![Просмотр MCP Server в основном окне](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP сервер создан, а операции API объявлены как инструменты. MCP сервер отображается в панели MCP Servers. В столбце URL показан эндпоинт MCP сервера, который можно вызывать для тестирования или из клиентского приложения.

## Дополнительно: настройка политик

В Azure API Management основная концепция — политики, в которых вы задаёте различные правила для конечных точек, например ограничение скорости или семантическое кэширование. Политики описываются в XML.

Вот как настроить политику для ограничения скорости на вашем MCP сервере:

1. В портале под разделом APIs выберите **MCP Servers**.

1. Выберите созданный MCP сервер.

1. В левом меню под MCP выберите **Policies**.

1. В редакторе политик добавьте или измените политики для применения к инструментам MCP сервера. Политики задаются в формате XML. Например, можно добавить политику, ограничивающую вызовы к инструментам MCP сервера (в примере — 5 вызовов в 30 секунд на один IP клиента). Вот XML, который реализует ограничение скорости:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Вот изображение редактора политик:

    ![Редактор политик](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Попробуйте

Давайте убедимся, что наш MCP сервер работает как задумано.

Для этого используем Visual Studio Code и GitHub Copilot в режиме агента. Мы добавим MCP сервер в файл *mcp.json*. Так Visual Studio Code станет клиентом с агентскими возможностями, и конечные пользователи смогут вводить запросы и взаимодействовать с сервером.

Как добавить MCP сервер в Visual Studio Code:

1. Используйте команду MCP: **Add Server** из Command Palette.

1. При запросе выберите тип сервера: **HTTP (HTTP или Server Sent Events)**.

1. Введите URL MCP сервера в Azure API Management. Пример: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (для SSE endpoint) или **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (для MCP endpoint), обратите внимание на разницу транспорта: `/sse` или `/mcp`.

1. Введите ID сервера по вашему выбору. Это значение необязательно, но поможет запомнить, что это за экземпляр сервера.

1. Выберите, куда сохранить конфигурацию — в настройки рабочего пространства или пользователя.

  - **Настройки рабочего пространства** — конфигурация будет сохранена в файл .vscode/mcp.json, доступный только в текущем рабочем пространстве.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    или если вы выберете потоковый HTTP как транспорт, будет немного другое:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Настройки пользователя** — конфигурация добавляется в глобальный файл *settings.json* и доступна во всех рабочих пространствах. Конфигурация похожа на следующую:

    ![Настройка пользователя](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Также нужно добавить конфигурацию — заголовок для корректной аутентификации в Azure API Management. Используется заголовок **Ocp-Apim-Subscription-Key**.

    - Вот как можно добавить его в настройки:

    ![Добавление заголовка для аутентификации](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), после этого появится запрос на ввод значения API ключа, которое можно найти в Azure Portal для вашего экземпляра Azure API Management.

   - Если хотите добавить в файл *mcp.json*, используйте такую конструкцию:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Используем режим агента

Теперь всё настроено — либо в настройках, либо в *.vscode/mcp.json*. Давайте проверим.

Должна появиться иконка Инструменты, где будут перечислены доступные инструменты вашего сервера:

![Инструменты сервера](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Нажмите на иконку инструментов, вы увидите список инструментов:

    ![Инструменты](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Введите запрос в чат, чтобы вызвать инструмент. Например, если вы выбрали инструмент для получения информации о заказе, можно спросить агента про заказ. Пример запроса:

    ```text
    get information from order 2
    ```

    После этого появится иконка инструментов с предложением продолжить вызов инструмента. Нажмите для запуска. Вы увидите результат, примерно такой:

    ![Результат запроса](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **То, что вы видите, зависит от настроенных инструментов, однако идея в том, что вы получаете текстовый ответ, как показано выше.**


## Ссылки

Вот где можно узнать больше:

- [Учебник по Azure API Management и MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Пример на Python: Защита удалённых MCP серверов с использованием Azure API Management (экспериментально)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Лабораторная работа по авторизации MCP клиента](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Использование расширения Azure API Management для VS Code для импорта и управления API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Регистрация и обнаружение удалённых MCP серверов в Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) — отличный репозиторий, показывающий множество возможностей AI с Azure API Management
- [Мастер-классы AI Gateway](https://azure-samples.github.io/AI-Gateway/) — содержит мастер-классы с использованием Azure Portal, отличный способ начать оценивать возможности AI.

## Что дальше

- Вернуться к: [Обзор кейсов](./README.md)
- Далее: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:  
Этот документ был переведен с использованием AI-сервиса перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, обратите внимание, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для критически важной информации рекомендуется профессиональный перевод человеком. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->