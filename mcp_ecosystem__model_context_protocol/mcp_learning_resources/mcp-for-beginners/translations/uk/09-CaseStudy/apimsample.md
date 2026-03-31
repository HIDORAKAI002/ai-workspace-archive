# Кейс: Відкриття REST API в Azure API Management як MCP сервер

Azure API Management — це сервіс, що надає шлюз поверх ваших API-ендпоінтів. Як це працює: Azure API Management виступає як проксі перед вашими API та вирішує, що робити з вхідними запитами.

Використовуючи його, ви отримуєте багато додаткових можливостей, таких як:

- **Безпека**: можна використовувати все — від API ключів, JWT до керованих ідентичностей.
- **Обмеження швидкості**: чудова функція, що дозволяє контролювати кількість викликів за певний інтервал часу. Це допомагає забезпечити гарний досвід усім користувачам і уникнути перевантажень вашого сервісу.
- **Масштабування та балансування навантаження**. Можна налаштувати кілька кінцевих точок для розподілу навантаження і обрати спосіб "балансування" навантаження.
- **AI-функції, такі як семантичне кешування**, обмеження токенів, моніторинг токенів і більше. Ці функції покращують швидкість відгуку і допомагають контролювати витрати токенів. [Докладніше тут](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Чому MCP + Azure API Management?

Model Context Protocol швидко стає стандартом для агентських AI-додатків і способу послідовного відкриття інструментів і даних. Azure API Management — природний вибір, коли потрібно "керувати" API. MCP сервери часто інтегруються з іншими API для обробки запитів до інструментів, наприклад. Тому комбінація Azure API Management і MCP є логічною.

## Огляд

У цьому конкретному кейсі ми навчимося відкривати API-ендпоінти як MCP сервер. Це дасть змогу легко інтегрувати ці ендпоінти до агентського додатку, користуючись при цьому можливостями Azure API Management.

## Ключові можливості

- Ви вибираєте, які методи ендпоінтів хочете відкрити як інструменти.
- Додаткові можливості залежать від налаштувань політик для вашого API. Тут ми покажемо, як додати обмеження швидкості.

## Попередній крок: імпорт API

Якщо у вас вже є API в Azure API Management — прекрасно, цей крок можна пропустити. Якщо ні, ознайомтеся з посиланням: [імпорт API в Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Відкриття API як MCP сервер

Щоб відкрити API-ендпоінти, виконайте такі кроки:

1. Перейдіть до Azure Portal за адресою <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>
   Перейдіть до вашого екземпляру Azure API Management.

1. У лівому меню оберіть APIs > MCP Servers > + Create new MCP Server.

1. У API виберіть REST API, який хочете відкрити як MCP сервер.

1. Виберіть одну чи декілька операцій API, які відкриєте як інструменти. Можна вибрати всі операції або лише конкретні.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Оберіть **Create**.

1. Перейдіть до меню **APIs** > **MCP Servers**, ви побачите таке:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP сервер створено, а операції API відкрито як інструменти. MCP сервер відображається у списку MCP Servers. У стовпці URL вказана кінцева точка MCP сервера, яку можна викликати для тестування або у клієнтському додатку.

## За бажанням: налаштування політик

Azure API Management використовує політики — основну концепцію, де ви налаштовуєте правила для ендпоінтів, наприклад обмеження швидкості або семантичне кешування. Політики описуються в XML.

Ось як можна налаштувати політику, щоб обмежити швидкість для вашого MCP сервера:

1. У порталі відкрийте APIs > **MCP Servers**.

1. Оберіть створений MCP сервер.

1. У лівому меню під MCP оберіть **Policies**.

1. У редакторі політик додайте або відредагуйте політики, які хочете застосувати до інструментів MCP сервера. Політики задані у форматі XML. Наприклад, можна додати політику для обмеження викликів до інструментів MCP сервера (у прикладі 5 викликів за 30 секунд на IP клієнта). Ось XML, що реалізує це обмеження:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Ось зображення редактора політик:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Спробуємо

Переконаємося, що наш MCP Сервер працює як треба.

Для цього ми використаємо Visual Studio Code і GitHub Copilot в режимі агента. Ми додамо MCP сервер до файлу *mcp.json*. Таким чином Visual Studio Code буде виступати клієнтом з агентними можливостями, а кінцеві користувачі зможуть вводити запити й взаємодіяти з сервером.

Давайте побачимо, як додати MCP сервер у Visual Studio Code:

1. Виконайте команду MCP: **Add Server command з Command Palette**.

1. Коли з'явиться вибір, оберіть тип сервера: **HTTP (HTTP або Server Sent Events)**.

1. Введіть URL MCP сервера в Azure API Management. Наприклад: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (для SSE) або **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (для MCP), зверніть увагу на різницю в `/sse` або `/mcp`.

1. Введіть ID сервера на свій вибір. Це не критично, але допоможе вам згадати, що це за екземпляр сервера.

1. Оберіть, куди зберігати конфігурацію — в налаштуваннях робочої області чи користувача.

  - **Workspace settings** — конфігурація сервера зберігається у файлі .vscode/mcp.json, доступному лише у поточній робочій області.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    Якщо обрати стрімінг HTTP як транспорт, буде незначна різниця:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** — конфігурація додається до глобального файлу *settings.json* і доступна у всіх робочих областях. Конфігурація виглядає приблизно так:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Також потрібно додати конфігурацію заголовка, щоб коректно автентифікуватися в Azure API Management. Використовується заголовок **Ocp-Apim-Subscription-Key**.

    - Ось як додати його до налаштувань:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), це призведе до появи запиту ввести значення API ключа, який можна знайти у порталі Azure для екземпляру Azure API Management.

   - Для додавання в *mcp.json*, додайте так:

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

### Використання режиму агента

Тепер ми все налаштували — у налаштуваннях або у *.vscode/mcp.json*. Спробуємо.

Поруч має бути іконка Tools, де відображаються відкриті інструменти сервера:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Натисніть іконку Tools, має відкритися список інструментів:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Введіть запит у чат, щоб викликати інструмент. Наприклад, якщо ви вибрали інструмент для отримання інформації про замовлення, можна запитати агента про замовлення. Ось приклад запиту:

    ```text
    get information from order 2
    ```

    Тепер з’явиться іконка інструментів, що запросить підтвердження виклику інструменту. Підтвердіть запуск — ви побачите результат, наприклад:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **що саме ви побачите, залежить від налаштованих інструментів, але ідея в тому, щоб отримати текстову відповідь, як на зображенні вище**


## Посилання

Ось де можна дізнатися більше:

- [Покроковий посібник з Azure API Management і MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Приклад на Python: Захищені віддалені MCP сервери з Azure API Management (експериментальний)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Лабораторія авторизації клієнтів MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Використання розширення Azure API Management для VS Code для імпорту та керування API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Реєстрація та відкриття віддалених MCP серверів в Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Відмінне репо, що демонструє багато можливостей штучного інтелекту з Azure API Management
- [Майстер-класи AI Gateway](https://azure-samples.github.io/AI-Gateway/) Містить воркшопи з Azure Portal — чудовий спосіб оцінити AI можливості.

## Що далі

- Назад до: [Огляд кейсів](./README.md)
- Далі: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу автоматичного перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, зверніть увагу, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ його рідною мовою слід вважати офіційним джерелом інформації. Для критично важливої інформації рекомендується звертатися до професійного людського перекладу. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->