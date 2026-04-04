# Uchunguzi wa Kesi: Weka wazi REST API ndani ya Usimamizi wa API kama seva ya MCP

Azure API Management, ni huduma inayotoa Mlangoni juu ya Miisho yako ya API. Jinsi inavyofanya kazi ni kwamba Azure API Management hutenda kama proksi mbele ya APIs zako na inaweza kuamua nini cha kufanya na maombi yanayoingia.

Kwa kuitumia, unaongeza huduma nyingi kama:

- **Usalama**, unaweza kutumia kila kitu kuanzia funguo za API, JWT hadi utambulisho ulioendeshwa.
- **Kudhibiti mzunguko wa maombi**, kipengele kizuri ni uwezo wa kuamua ni simu ngapi zinapokelewa kwa wakati fulani. Hii husaidia kuhakikisha watumiaji wote wana uzoefu mzuri na pia kwamba huduma yako haisababishwi na maombi mengi.
- **Kupandisha kiwango & Kusawazisha mzigo**. Unaweza kuweka idadi ya miisho ili kusawazisha mzigo na pia unaweza kuamua jinsi ya "kusawazisha mzigo".
- **Vipengele vya AI kama uhifadhi wa maana**, kikomo cha tokeni na ufuatiliaji wa tokeni na zaidi. Hivi ni vipengele bora vinavyoboresha majibu pamoja na kusaidia kufuatilia matumizi yako ya tokeni. [Soma zaidi hapa](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Kwa nini MCP + Azure API Management?

Model Context Protocol kwa haraka inakuwa kiwango cha kawaida kwa programu za AI za kiwakala na jinsi ya kuonyesha zana na data kwa njia inayoeleweka. Azure API Management ni chaguo la asili unapo hitaji "kusimamia" APIs. Seva za MCP mara nyingi huingiliana na APIs nyingine kutatua maombi kwa zana kwa mfano. Kwa hiyo kuunganisha Azure API Management na MCP kuna maana kubwa.

## Muhtasari

Katika kesi hii maalum tutajifunza jinsi ya kuweka wazi miisho ya API kama Seva ya MCP. Kwa kufanya hivi, tunaweza kwa urahisi kufanya miisho hii sehemu ya programu ya kiwakala pamoja na kutumia vipengele vya Azure API Management.

## Vipengele Muhimu

- Unaweka njia za endpoint unazotaka kuonyeshwa kama zana.
- Vipengele vya ziada unavyopata hutegemea kile unachobainisha katika sehemu ya sera kwa API yako. Lakini hapa tutaonyesha jinsi ya kuongeza udhibiti wa mzunguko wa maombi.

## Hatua ya awali: ingiza API

Kama tayari una API katika Azure API Management ni nzuri, basi unaweza kukwepa hatua hii. Ikiwa huna, angalia kiungo hiki, [kuingiza API katika Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Weka wazi API kama Seva ya MCP

Ili kutoa miisho ya API ya wazi, fuata hatua hizi:

1. Nenda kwenye Portal ya Azure na anwani ifuatayo <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Nenda kwenye mfano wako wa Usimamizi wa API.

1. Kwenye menyu ya kushoto, chagua APIs > MCP Servers > + Unda seva mpya ya MCP.

1. Katika API, chagua REST API kuonyeshwa kama seva ya MCP.

1. Chagua moja au zaidi ya Uendeshaji wa API kuonyeshwa kama zana. Unaweza kuchagua uendeshaji wote au uendeshaji maalum tu.

    ![Chagua njia za kuonyesha](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Chagua **Create**.

1. Nenda kwenye chaguo la menyu **APIs** na **MCP Servers**, unapaswa kuona yafuatayo:

    ![Tazama seva ya MCP katika dirisha kuu](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Seva ya MCP imetengenezwa na uendeshaji wa API zimeonyeshwa kama zana. Seva ya MCP imeorodheshwa katika dirisha la MCP Servers. Sehemu ya URL inaonyesha endpoint ya seva ya MCP ambayo unaweza kuitumia kwa majaribio au ndani ya programu ya mteja.

## Hiari: Sanidi sera

Azure API Management ina dhana kuu ya sera ambapo unaweka sheria tofauti kwa miisho yako kama kwa mfano kudhibiti mzunguko wa maombi au uhifadhi wa maana. Sera hizi zinaandikwa kwa XML.

Hili ni jinsi unavyoweza kuweka sera ya kudhibiti mzunguko wa maombi kwa seva yako ya MCP:

1. Kwenye portal, chini ya APIs, chagua **MCP Servers**.

1. Chagua seva ya MCP uliyoitengeneza.

1. Kwenye menyu ya kushoto, chini ya MCP, chagua **Policies**.

1. Katika mhariri wa sera, ongeza au hariri sera unazotaka zitatumike kwa zana za seva ya MCP. Sera hizi zimetafsiriwa kwa XML. Kwa mfano, unaweza kuongeza sera ya kuzuia simu nyingi kwa zana za seva ya MCP (mfano huu, simu 5 kwa kila sekunde 30 kwa anwani ya IP ya mteja). Hii ni XML itakayosababisha kudhibiti kiasi cha simu:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Hii ni picha ya mhariri wa sera:

    ![Mhariri wa sera](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)

## Jaribu

Tuhakikishe seva ya MCP inafanya kazi kama inavyotakiwa.

Kwa hili, tutatumia Visual Studio Code na GitHub Copilot na hali yake ya Wakili. Tutaongeza seva ya MCP kwenye faili *mcp.json*. Kwa kufanya hivyo, Visual Studio Code itatenda kama mteja mwenye uwezo wa kiwakala na watumiaji wa mwisho wataweza kuandika agizo na kuingiliana na seva hiyo.

Tazama jinsi ya kuongeza seva ya MCP katika Visual Studio Code:

1. Tumika amri ya MCP: **Add Server kutoka kwenye Command Palette**.

1. Ukishonyanyua, chagua aina ya seva: **HTTP (HTTP au Server Sent Events)**.

1. Weka URL ya seva ya MCP katika Usimamizi wa API. Mfano: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (kwa endpoint ya SSE) au **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (kwa endpoint ya MCP), angalia tofauti kati ya usafirishaji ni `/sse` au `/mcp`.

1. Ingiza kitambulisho cha seva kama unavyotaka. Hii si thamani muhimu lakini itakusaidia kukumbuka ni seva gani hii.

1. Chagua kama unataka kuhifadhi usanidi kwenye mipangilio ya eneo la kazi au mipangilio ya mtumiaji.

  - **Mipangilio ya eneo la kazi** - Usaidizi wa seva huhifadhiwa kwenye faili .vscode/mcp.json inayopatikana tu katika eneo la kazi la sasa.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    au kama utachagua usafirishaji wa HTTP kuendelea lazima iwe tofauti kidogo:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Mipangilio ya mtumiaji** - Usaidizi wa seva unaongezwa kwenye faili lako la *settings.json* la ulimwengu na unapatikana katika maeneo yote ya kazi. Usaidizi umefananishwa kama ifuatavyo:

    ![Mipangilio ya mtumiaji](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Pia unahitaji kuongeza usanidi, kichwa cha maombi ili kuhakikisha unathibitishwa vyema kuelekea Azure API Management. Inatumia kichwa kinachoitwa **Ocp-Apim-Subscription-Key**.

    - Hapa ni jinsi ya kuiongeza kwenye mipangilio:

    ![Kuongeza kichwa kwa uthibitisho](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), hii itasababisha kuonyeshwa kwa agizo kuomba thamani ya funguo ya API ambayo unaweza kuipata kwenye Portal ya Azure kwa mfano wako wa Azure API Management.

   - Ili kuongeza kwenye *mcp.json* badala yake, unaweza kuiongeza hivi:

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

### Tumia hali ya Wakili

Sasa tumejipanga vyote iwe kwenye mipangilio au katika *.vscode/mcp.json*. Tujaribu sasa.

Kuna ishara ya Zana kama hizi, ambapo zana zilizowekwa wazi kutoka seva zako zinaorodheshwa:

![Zana kutoka kwenye seva](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Bonyeza ishara ya zana na unapaswa kuona orodha ya zana kama ifuatavyo:

    ![Zana](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Ingiza agizo kwenye mazungumzo kuitisha zana. Kwa mfano, kama umechagua zana ya kupata taarifa kuhusu oda, unaweza kumuuliza wakili kuhusu oda. Hii mfano wa agizo:

    ```text
    get information from order 2
    ```

    Sasa utaonyeshwa na ishara ya zana ikikuuliza kuendelea kuitisha zana. Chagua kuendelea kuendesha zana, sasa unapaswa kuona matokeo kama ifuatavyo:

    ![Matokeo kutoka kwa agizo](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    ** kile unachokiona juu hutegemea zana ulizoweka, lakini wazo ni kwamba unapata jibu la maandishi kama lilivyo juu **

## Marejeleo

Hapa ni jinsi unavyoweza kujifunza zaidi:

- [Kozi ya Azure API Management na MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Mfano wa Python: Seva za MCP za mbali zilizo salama kwa kutumia Azure API Management (jaribio)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Maabara ya mamlaka za mteja wa MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Tumia nyongeza ya Azure API Management kwa VS Code kuingiza na kusimamia APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Jisajili na gundua seva za MCP za mbali katika Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [Mlango wa AI](https://github.com/Azure-Samples/AI-Gateway) Hifadhi nzuri inayonyesha uwezo mkubwa wa AI na Azure API Management
- [Warsha za Mlango wa AI](https://azure-samples.github.io/AI-Gateway/) Ina warsha zinazotumia Portal ya Azure, njia nzuri ya kuanza kutathmini uwezo wa AI.

## Nini Kifuatavyo

- Rudi kwa: [Muhtasari wa Uchunguzi wa Kesi](./README.md)
- Ifuatayo: [Wakala wa Safari wa Azure AI](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tangazo la Kutolewa Mbali**:  
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kwa usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati asili katika lugha yake ya asili inapaswa kuzingatiwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu ya binadamu inapendekezwa. Hatujawajibiki kwa kutoelewana au ufafanuzi mbaya unaotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->