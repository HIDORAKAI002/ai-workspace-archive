# Казус: Излагане на REST API в API Management като MCP сървър

Azure API Management е услуга, която предоставя портал върху вашите API крайни точки. Тя работи така, че Azure API Management действа като прокси пред вашите API и може да реши какво да прави с входящите заявки.

Като я използвате, добавяте множество функционалности като:

- **Сигурност**, може да използвате всичко от API ключове, JWT до управлявана самоличност.
- **Ограничаване на честотата**, страхотна функция е възможността да решите колко заявки да преминават за определено време. Това помага да се гарантира, че всички потребители имат отлично преживяване и че вашата услуга не се претоварва с искания.
- **Скалиране и балансиране на натоварването**. Може да настроите няколко крайни точки за балансиране на натоварването и да изберете как да се осъществи "балансирането".
- **AI функции като семантично кеширане**, лимитиранe на токени и мониторинг на токени и още. Това са отлични функции, които подобряват реактивността и помагат да следите разходите за токени. [Прочетете повече тук](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Защо MCP + Azure API Management?

Model Context Protocol бързо се превръща в стандарт за агентни AI приложения и за начина, по който се излагат инструменти и данни по консистентен начин. Azure API Management е естествен избор, когато имате нужда да "управлявате" API-та. MCP сървърите често се интегрират с други API-та, за да разрешават заявки към инструмент например. Затова съчетанието на Azure API Management и MCP има голям смисъл.

## Преглед

В този конкретен случай ще научим как да изложим API крайни точки като MCP сървър. По този начин можем лесно да направим тези крайни точки част от агентно приложение, като същевременно използваме и функционалностите на Azure API Management.

## Ключови функции

- Избирате крайните точки, които искате да изложите като инструменти.
- Допълнителните функции зависят от това какво конфигурирате в секцията с политики за вашето API. Тук ще ви покажем как може да добавите ограничаване на честотата.

## Предварителна стъпка: импортиране на API

Ако вече имате API в Azure API Management, чудесно, може да пропуснете тази стъпка. Ако не, разгледайте този линк, [импортиране на API в Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Излагане на API като MCP сървър

За да излагаме API крайни точки, следвайте следните стъпки:

1. Отидете в Azure портала на следния адрес <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> и навигирайте до вашия API Management инстанс.

1. В лявото меню изберете APIs > MCP Servers > + Създай нов MCP сървър.

1. В API изберете REST API, който искате да изложите като MCP сървър.

1. Изберете една или повече API операции, които да излагате като инструменти. Може да изберете всички операции или само конкретни.

    ![Изберете методи за излагане](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Изберете **Създай**.

1. Навигирайте до менюто **APIs** и **MCP Servers**, трябва да видите следното:

    ![Вижте MCP сървъра в основния прозорец](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP сървърът е създаден и API операциите са изложени като инструменти. MCP сървърът е изброен в панела MCP Servers. В колоната URL се показва крайна точка на MCP сървъра, която може да използвате за тестване или в клиентско приложение.

## По желание: Конфигуриране на политики

Azure API Management има основната концепция на политики, при които дефинирате различни правила за крайните си точки, като например ограничаване на честота или семантично кеширане. Тези политики се описват в XML.

Ето как можете да настроите политика за ограничаване на честотата за вашия MCP сървър:

1. В портала, под APIs, изберете **MCP Servers**.

1. Изберете MCP сървъра, който сте създали.

1. В лявото меню, под MCP, изберете **Policies**.

1. В редактора на политики добавете или редактирайте политиките, които искате да приложите към инструментите на MCP сървъра. Политиките са дефинирани във формат XML. Например, може да добавите политика за ограничаване на броя повиквания към инструментите на MCP сървъра (в този пример, 5 повиквания на 30 секунди за един клиентски IP адрес). Ето XML, който реално налага лимит:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Ето изображение на редактора на политики:

    ![Редактор на политики](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Опитайте

Нека се уверим, че нашият MCP сървър работи както се очаква.

За това ще използваме Visual Studio Code и GitHub Copilot в Agent режим. Ще добавим MCP сървъра в *mcp.json*. По този начин Visual Studio Code ще действа като клиент с агентни възможности и крайният потребител ще може да въвежда заявки и да взаимодейства със сървъра.

Ето как да добавим MCP сървъра във Visual Studio Code:

1. Използвайте командата MCP: **Add Server от Command Palette**.

1. Когато бъдете подканени, изберете типа на сървъра: **HTTP (HTTP или Server Sent Events)**.

1. Въведете URL адреса на MCP сървъра в API Management. Пример: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (за SSE крайна точка) или **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (за MCP крайна точка), обърнете внимание на разликата в транспорта - `/sse` или `/mcp`.

1. Въведете име на сървъра по ваше желание. Това не е критична стойност, но ще ви помогне да помните коя инстанция е този сървър.

1. Изберете дали да запишете конфигурацията в настройки на работното пространство или в потребителските настройки.

  - **Настройки на работно пространство** - Конфигурацията на сървъра се записва във файл .vscode/mcp.json, достъпен само в сегашното работно пространство.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    или ако изберете стрийминг HTTP за транспорт, ще е малко по-различно:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Потребителски настройки** - Конфигурацията на сървъра се добавя към глобалния ви *settings.json* файл и е достъпна във всички работни пространства. Конфигурацията изглежда приблизително по следния начин:

    ![Потребителски настройки](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Трябва също да добавите конфигурация, хедър, за да се уверите, че автентикацията към Azure API Management се извършва правилно. Използва се хедър наречен **Ocp-Apim-Subscription-Key**.

    - Ето как може да го добавите към settings:

    ![Добавяне на хедър за автентикация](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), това ще предизвика показване на диалог за въвеждане на API ключ, който може да намерите в Azure портала за вашия Azure API Management инстанс.

   - За да го добавите директно в *mcp.json*, може да сторите така:

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

### Използване на Agent режим

Сега всичко е настроено или в settings, или в *.vscode/mcp.json*. Нека опитаме.

Трябва да има икона за Инструменти, където са изброени изложените инструменти от вашия сървър:

![Инструменти от сървъра](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Кликнете на иконата за инструменти и трябва да видите списък с инструменти, както следва:

    ![Инструменти](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Въведете заявка в чата, за да задействате инструмента. Например, ако сте избрали инструмент за получаване на информация за поръчка, можете да попитате агента за поръчка. Ето примерна заявка:

    ```text
    get information from order 2
    ```

    Сега ще ви се покаже икона за инструменти с подканваща да продължите позвъняването към инструмента. Изберете да продължите, за да използвате инструмента, и ще видите резултат като следното:

    ![Резултат от заявката](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **това, което виждате, зависи от конфигурираните инструменти, но идеята е да получите текстов отговор като горния**

## Референции

Ето как може да научите повече:

- [Урок за Azure API Management и MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python пример: Сигурни отдалечени MCP сървъри с Azure API Management (експериментално)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Лаборатория за MCP клиентска авторизация](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Използвайте разширението Azure API Management за VS Code за импортиране и управление на API-та](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Регистрация и откриване на отдалечени MCP сървъри в Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Отлично хранилище, показващо много AI възможности с Azure API Management
- [AI Gateway работилници](https://azure-samples.github.io/AI-Gateway/)  Съдържа работилници с използване на Azure портал, който е страхотен начин да започнете да оценявате AI възможности.

## Какво следва

- Обратно към: [Преглед на казусите](./README.md)
- Напред: [Azure AI пътнически агенти](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводаческа услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля, имайте предвид, че автоматичните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия официален език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да било недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->