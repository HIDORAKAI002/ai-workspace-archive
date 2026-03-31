# Case Study: I-expose ang REST API sa API Management bilang isang MCP server

Ang Azure API Management, ay isang serbisyo na nagbibigay ng Gateway sa ibabaw ng iyong mga API Endpoints. Gumagana ito sa paraang ang Azure API Management ay kumikilos bilang proxy sa harap ng iyong mga API at maaaring magdesisyon kung ano ang gagawin sa mga papasok na kahilingan.

Sa paggamit nito, makakakuha ka ng maraming mga tampok tulad ng:

- **Seguridad**, maaari mong gamitin ang lahat mula sa API keys, JWT hanggang sa managed identity.
- **Rate limiting**, isang mahusay na tampok ay ang kakayahang magdesisyon kung ilan ang tawag na papayagang dumaan kada takdang yunit ng oras. Nakakatulong ito upang matiyak na lahat ng gumagamit ay magkakaroon ng magandang karanasan at upang hindi ma-overwhelm ang iyong serbisyo ng mga kahilingan.
- **Scaling & Load balancing**. Maaari kang mag-set up ng maraming endpoints upang hatiin ang load at maaari mo ring piliin kung paano ito "load balance". 
- **Mga AI features tulad ng semantic caching**, token limit at token monitoring at iba pa. Ito ay mga mahusay na tampok na nagpapahusay ng responsiveness pati na rin tumutulong sa iyo na kontrolin ang iyong paggamit ng token. [Magbasa pa dito](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities). 

## Bakit MCP + Azure API Management?

Ang Model Context Protocol ay mabilis na nagiging standard para sa mga agentic AI app at kung paano i-expose ang mga tools at data sa isang consistent na paraan. Ang Azure API Management ay natural na pagpipilian kapag kailangan mong "pamamahalaan" ang mga API. Madalas na nag-iintegrate ang mga MCP Servers sa iba pang mga API upang lutasin ang mga kahilingan sa isang tool halimbawa. Kaya ang pagsasama ng Azure API Management at MCP ay may malaking saysay.

## Pangkalahatang-ideya

Sa espesipikong use case na ito matututuhan natin kung paano i-expose ang mga API endpoints bilang isang MCP Server. Sa paggawa nito, madali nating magagawang bahagi ang mga endpoints ng isang agentic app habang nagagamit din ang mga tampok mula sa Azure API Management.

## Mga Pangunahing Tampok

- Pinipili mo ang mga endpoint methods na nais mong i-expose bilang mga tools.
- Ang mga karagdagang tampok ay nakadepende sa kung ano ang iyong kino-configure sa policy section para sa iyong API. Ngunit dito ipapakita namin kung paano magdagdag ng rate limiting.

## Pre-step: mag-import ng API

Kung mayroon ka nang API sa Azure API Management, ayos na, maaari mo nang laktawan ang hakbang na ito. Kung wala pa, tingnan ang link na ito, [pag-import ng API sa Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## I-expose ang API bilang MCP Server

Para i-expose ang API endpoints, sundin natin ang mga hakbang na ito:

1. Pumunta sa Azure Portal sa sumusunod na address <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
Pumunta sa iyong API Management instance.

1. Sa kaliwang menu, piliin ang APIs > MCP Servers > + Create new MCP Server.

1. Sa API, piliin ang isang REST API na i-eexpose bilang MCP server.

1. Piliin ang isa o higit pang API Operations na ie-expose bilang mga tools. Maaari mong piliin lahat ng operations o mga tiyak na operations lamang.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Piliin ang **Create**.

1. Pumunta sa menu option na **APIs** at **MCP Servers**, makikita mo ang sumusunod:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Nabuo na ang MCP server at ang mga API operations ay na-expose bilang mga tools. Nakalista ang MCP server sa MCP Servers pane. Ipinapakita ng URL column ang endpoint ng MCP server na maaari mong tawagan para sa testing o sa loob ng isang client application.

## Opsyonal: Mag-configure ng mga policy

Ang Azure API Management ay may pangunahing konsepto ng mga policy kung saan nagse-set up ka ng iba't ibang mga patakaran para sa iyong endpoints tulad ng halimbawa rate limiting o semantic caching. Ang mga policy na ito ay naia-author sa XML.

Ganito ka makakapag-setup ng policy para mag-rate limit sa iyong MCP Server:

1. Sa portal, sa ilalim ng APIs, piliin ang **MCP Servers**.

1. Piliin ang MCP server na iyong ginawa.

1. Sa kaliwang menu, sa ilalim ng MCP, piliin ang **Policies**.

1. Sa policy editor, idagdag o i-edit ang mga policy na gusto mong i-apply sa mga tool ng MCP server. Ang mga policy ay nakasaad sa XML format. Halimbawa, maaari kang magdagdag ng policy para limitahan ang mga tawag sa mga tool ng MCP server (sa halimbawa na ito, 5 tawag kada 30 segundo kada client IP address). Narito ang XML na magpapatupad ng rate limit:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Narito ang larawan ng policy editor:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Subukan ito

Tiyakin nating gumagana nang maayos ang ating MCP Server.

Para dito, gagamit tayo ng Visual Studio Code at GitHub Copilot sa Agent mode nito. Idadagdag natin ang MCP server sa isang *mcp.json* na file. Sa paggawa nito, ang Visual Studio Code ay gagana bilang client na may agentic capabilities at makakapag-type ang mga end user ng prompt upang makipag-interact sa nasabing server.

Ganito ang paraan para idagdag ang MCP server sa Visual Studio Code:

1. Gamitin ang MCP: **Add Server command mula sa Command Palette**.

1. Kapag nagprompt, piliin ang server type: **HTTP (HTTP o Server Sent Events)**.

1. Ilagay ang URL ng MCP server sa API Management. Halimbawa: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (para sa SSE endpoint) o **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (para sa MCP endpoint), pansinin ang pagkakaiba sa pagitan ng mga transport ay `/sse` o `/mcp`.

1. Maglagay ng server ID na iyong pinili. Hindi ito isang mahalagang halaga pero makakatulong ito upang maalala mo kung anong server instance ito.

1. Piliin kung i-save ang configuration sa workspace settings o user settings.

  - **Workspace settings** - Ang server configuration ay sine-save sa isang .vscode/mcp.json file na available lamang sa kasalukuyang workspace.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    o kung pipiliin mo ang streaming HTTP bilang transport, medyo magkakaiba ito ng kaunti:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - Ang server configuration ay idaragdag sa iyong global *settings.json* file at available ito sa lahat ng workspaces. Ganito ang itsura ng configuration:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Kailangan mo ring magdagdag ng configuration, isang header upang matiyak ang tamang authentication patungo sa Azure API Management. Gumagamit ito ng header na tinatawag na **Ocp-Apim-Subscription-Key*.

    - Ganito mo ito maidagdag sa settings:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), magpapakita ito ng prompt para hilingin ang halaga ng API key na makikita mo sa Azure Portal para sa iyong Azure API Management instance.

   - Para idagdag ito sa *mcp.json* imbes na settings, maaari mo itong ilagay ng ganito:

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

### Gamitin ang Agent mode

Naka-set up na tayo sa alinman sa settings o sa *.vscode/mcp.json*. Subukan natin ito.

Dapat may makita kang Tools icon ganito, kung saan nakalista ang mga na-expose na tools mula sa iyong server:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. I-click ang tools icon at makikita mo ang isang listahan ng tools ganito:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Maglagay ng prompt sa chat para tawagan ang tool. Halimbawa, kung pinili mo ang tool upang makakuha ng impormasyon tungkol sa isang order, maaari mong tanungin ang agent tungkol sa isang order. Narito ang isang halimbawa ng prompt:

    ```text
    get information from order 2
    ```

    Ipapakita sa iyo ngayon ang isang tools icon na magtatanong kung gusto mong ipagpatuloy ang pagtawag ng tool. Piliin ang pagpapatuloy, makikita mo na ngayon ang output ganito:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **ang makikita mo sa ibabaw ay depende sa mga tools na na-set up mo, pero ang idea ay makakakuha ka ng tekstuwal na tugon tulad ng nasa itaas**


## Mga Sanggunian

Ganito mo maaaring matuto ng higit pa:

- [Tutorial sa Azure API Management at MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python sample: Secure remote MCP servers gamit ang Azure API Management (experimental)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP client authorization lab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Gamitin ang Azure API Management extension para sa VS Code upang mag-import at mag-manage ng mga API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Magrehistro at magdiscovery ng remote MCP servers sa Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Mahusay na repositoryo na nagpapakita ng maraming kakayahan ng AI gamit ang Azure API Management
- [AI Gateway workshops](https://azure-samples.github.io/AI-Gateway/)  Naglalaman ng mga workshops gamit ang Azure Portal, na isang mahusay na paraan upang simulan ang pagsusuri sa mga kakayahan ng AI.

## Ano ang Susunod

- Balik sa: [Case Studies Overview](./README.md)
- Susunod: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paalala**:  
Ang dokumentong ito ay isinalin gamit ang AI translation service na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat aming pinagsisikapang maging tumpak ang pagsasalin, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o di-katumpakan. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na opisyal na sanggunian. Para sa mahahalagang impormasyon, inirerekumenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot para sa anumang hindi pagkakaintindihan o maling interpretasyon na maaaring idulot ng paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->