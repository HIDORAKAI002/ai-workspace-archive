# Студија случаја: Излагање REST API-ја у API Management као MCP сервер

Azure API Management је услуга која пружа Gateway изнад ваших API тачака. Ради тако што Azure API Management функционише као прокси испред ваших API-ја и може одлучити шта да уради са долазним захтевима.

Користећи га, добијате читав низ функција као што су:

- **Безбедност**, можете користити све од API кључева, JWT до управљаног идентитета.
- **Ограничење брзине**, одлична функција која вам омогућава да одлучите колико позива може проћи по одређеној временској јединици. Ово помаже да сви корисници имају одлично искуство, као и да ваша услуга не буде преоптерећена захтевима.
- **Скалирање и баланс оптерећења**. Можете подесити низ тачака за излаз како бисте распоредили оптерећење и такође можете одлучити како да „балансирате оптерећење“.
- **AI функције као семантичко кеширање**, лимит токена и праћење токена и још много тога. Ово су сјајне функције које побољшавају реактивност као и помажу да пратите трошкове токена. [Прочитајте више овде](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Зашто MCP + Azure API Management?

Model Context Protocol брзо постаје стандард за агентске AI апликације и начин излагања алата и података на доследан начин. Azure API Management је природан избор када треба да „управљате“ API-јима. MCP сервери често интегришу друге API-је како би решавали захтеве ка алату, на пример. Због тога комбинација Azure API Management и MCP има пуно смисла.

## Преглед

У овом конкретном случају употребе научићемо како да изложимо API тачке као MCP сервер. На овај начин можемо лако учинити ове тачке делу агентске апликације, уз коришћење функција Azure API Management-а.

## Кључне функције

- Изаберете методе крајњих тачака које желите да изложите као алате.
- Додатне функције које добијате зависе од тога шта конфигуришете у одељку политика за ваш API. Али овде ћемо вам показати како да додате ограничење брзине.

## Претходни корак: увоз API-ја

Ако већ имате API у Azure API Management, сјајно, онда можете прескочити овај корак. Ако не, погледајте овај линк, [увоз API-ја у Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Изложите API као MCP сервер

Да бисмо изложили API тачке, пратите следеће кораке:

1. Идите на Azure портал и следећу адресу <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Идите на вашу инстанцу API Management-а.

1. У левом менију изаберите APIs > MCP Servers > + Create new MCP Server.

1. У API-ју изаберите REST API који желите да изложите као MCP сервер.

1. Изаберите једну или више API операција које желите да изложите као алате. Можете изабрати све операције или само неке специфичне операције.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Изаберите **Create**.

1. Идите у мени опцију **APIs** и **MCP Servers**, требало би да видите следеће:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP сервер је креиран и API операције су изложене као алати. MCP сервер је наведен у панелу MCP Servers. Колона URL приказује крајњу тачку MCP сервера коју можете позвати за тестирање или унутар клијент апликације.

## Опционо: Конфигуришите политике

Azure API Management има основни концепт политика у којима подешавате различита правила за ваше крајње тачке као што је, на пример, ограничење брзине или семантичко кеширање. Ове политике су написане у XML-у.

Ево како можете поставити политику за ограничење брзине вашег MCP сервера:

1. На порталу, испод APIs, изаберите **MCP Servers**.

1. Изаберите MCP сервер који сте креирали.

1. У левом менију, испод MCP, изаберите **Policies**.

1. У едитору политика додајте или измените политике које желите да примените на алате MCP сервера. Политике су дефинисане у XML формату. На пример, можете додати политику за ограничење позива ка алатима MCP сервера (у овом примеру, 5 позива на 30 секунди по IP адреси клијента). Ево XML који ће изазвати ограничење брзине:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Ево и слике едитора политика:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Испробајте

Хајде да се уверимо да наш MCP сервер ради како треба.

За ово ћемо користити Visual Studio Code и GitHub Copilot и његов Agent мод. Додаћемо MCP сервер у *mcp.json* датотеку. На овај начин, Visual Studio Code ће функционисати као клијент са агентским могућностима, а крајњи корисници ће моћи да укуцају упит и интерагују са тим сервером.

Погледајмо како се додаје MCP сервер у Visual Studio Code:

1. Користите команду MCP: **Add Server из Command Palette-а**.

1. Када се затражи, изаберите тип сервера: **HTTP (HTTP или Server Sent Events)**.

1. Унесите URL MCP сервера у API Management-у. Пример: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (за SSE крајњу тачку) или **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (за MCP крајњу тачку), обратите пажњу на разлику у транспортима која је `/sse` или `/mcp`.

1. Унесите ID сервера по вашем избору. Ово није битна вредност, али ће вам помоћи да се сетите шта ова инстанца сервера представља.

1. Изаберите да ли да сачувате конфигурацију у подешавањима радног простора или корисничким подешавањима.

  - **Workspace settings** - Конфигурација сервера се чува у .vscode/mcp.json датотеци која је доступна само у тренутном радном простору.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    или ако изаберете стриминг HTTP као транспорт, биће нешто мало другачије:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - Конфигурација сервера се додаје у вашу глобалну *settings.json* датотеку и доступна је у свим радним просторима. Конфигурација изгледа слично као следеће:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Такође морате додати конфигурацију, заглавље како бисте осигурали правилну аутентификацију према Azure API Management-у. Користи се заглавље под називом **Ocp-Apim-Subscription-Key**.

    - Ево како га можете додати у подешавања:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), ово ће изазвати појављивање упита за унос вредности API кључа коју можете пронаћи у Azure порталу за вашу Azure API Management инстанцу.

   - Да бисте га додали у *mcp.json*, можете га додати овако:

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

### Користите Agent мод

Сада смо све подесили у подешавањима или у *.vscode/mcp.json*. Испробајмо.

Требало би да постоји иконица за алате као ова, где су наведени изложени алати са вашег сервера:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Кликните на иконицу алата и требало би да видите листу алата овако:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Унесите упит у ћаскање да позовете алат. На пример, ако сте изабрали алат за добијање информација о поруџбини, можете питати агента о поруџбини. Ево примера упита:

    ```text
    get information from order 2
    ```

    Сада ће вам бити приказана иконица за алате која тражи да наставите са позивом алата. Изаберите да наставите са коришћењем алата, и требало би да видите излаз као овде:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **оно што видите горе зависи од тога које сте алате поставили, али идеја је да добијете текстуални одговор као горе**


## Референце

Ево како можете сазнати више:

- [Туторијал о Azure API Management и MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python пример: Сигурни даљински MCP сервери користећи Azure API Management (експериментално)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP client authorization lab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Користите Azure API Management екстензију за VS Code за увоз и управљање API-јима](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Региструјте и откријте даљинске MCP сервере у Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Одличан репозиторијум који показује многе AI могућности са Azure API Management-ом
- [AI Gateway радионице](https://azure-samples.github.io/AI-Gateway/) Садржи радионице користећи Azure портал, што је одличан начин за почетак процене AI могућности.

## Шта следи

- Назад на: [Преглед студија случаја](./README.md)
- Следеће: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Одрицање од одговорности**:
Овај документ је преведен помоћу АИ преводилачке услуге [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, молимо вас имајте на уму да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику сматра се ауторитетним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешног тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->