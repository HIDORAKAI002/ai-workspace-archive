# အမှုလေ့လာမှု: API Management တွင် REST API ကို MCP ဆာဗာအဖြစ်ဖော်ထုတ်ခြင်း

Azure API Management သည် သင့် API အဆင့်အတန်းများအပေါ်တွင် Gateway ကိုပေးသော ဝန်ဆောင်မှုတစ်ခုဖြစ်သည်။ ၎င်း၏လည်ပတ်ပုံမှာ Azure API Management သည် သင့် API များရှေ့တွင် proxy အဖြစ် လုပ်ဆောင်ပြီး လာရောက်သောတောင်းဆိုမှုများအပေါ် သတ်မှတ်ချက်များကို ဆုံးဖြတ်ပေးသည်။

ဒါကိုသုံးခြင်းဖြင့် နောက်ထပ် အင်္ဂါရပ်များ ဤအတိုင်း ထည့်သွင်းနိုင်သည်-

- **လုံခြုံရေး** — API key, JWT မှ managed identity အထိ အားလုံးကို အသုံးပြုနိုင်သည်။
- **rate limiting** — เวลาတစ်ခုနှုန်းတွင် ခေါ်ဆိုမှုများပိုက်ဆံမပြတ်လုပ်ဆောင်နိုင်မှုရရှိခြင်းဖြင့် အသုံးပြုသူအားလုံးအတွက် အတွေ့အကြုံကောင်းမွန်စေရန်နှင့် ဝန်ဆောင်မှုကို တောင်းဆိုမှုများမများလွန်လွန်းခြင်းမှ ကာကွယ်နိုင်သည်။
- **Scaling နှင့် Load balancing** — နောက်ခံစာရင်းဝင်များအရေအတွက်ကို သတ်မှတ်ပြီး load ကို ညှိနိုင်ပြီး "load balance" ကို ဘယ်လိုလုပ်မလဲကိုလည်း သတ်မှတ်နိုင်သည်။
- **AI အင်္ဂါရပ်များဖြစ်သော semantic caching, token limit နှင့် token monitoring အပါအဝင် အခြားစွမ်းရည်များ** — ၎င်းသည် တုံ့ပြန်မှုမြန်ဆန်စေပြီး token အသုံးအဆောင်ကို ထိန်းသိမ်းရန် ကူညီသည်။ [ပိုပြီးဖတ်ရှုရန်](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)။

## MCP နှင့် Azure API Management ထည့်သွင်းသုံးစွဲခြင်း ဘာကြောင့်?

Model Context Protocol သည် agentic AI applications များအတွက် စံနမူနာအနေဖြင့် မြန်ဆန်စွာပြောင်းလဲလာပြီး တူညီသော နည်းလမ်းဖြင့် စက်မှုစီမံခန့်ခွဲမှုများနှင့် အချက်အလက်များဖော်ထုတ်ပုံကို သတ်မှတ်ပေးသည်။ Azure API Management သည် API များကို စီမံရန် သဘာဝရွေးချယ်မှုဖြစ်သည်။ MCP ဆာဗာများသည် အခြား API များနှင့် ပေါင်းစည်း၍ တောင်းဆိုမှုများကို ကိရိယာတစ်ခုအား ဖြေရှင်းပေးပါသည်။ ထို့ကြောင့် Azure API Management နှင့် MCP ကို ပေါင်းစည်းခြင်းမှာ အကြောင်းပြချက်များမပြတ်ပဲ ဖြစ်ပါသည်။

## အနှစ်ချုပ်

ဤအသုံးချမှုတွင် API endpoints များကို MCP ဆာဗာအနေနှင့် ဖော်ထုတ်ပုံကို သင်ယူပါမည်။ ဒီလိုလုပ်ခြင်းဖြင့် ၎င်း endpoints များကို အလွယ်တကူ agentic အက်ပ်တစ်ခု၏ အစိတ်အပိုင်းအဖြစ် အသုံးပြုနိုင်ပြီး Azure API Management မှ အင်္ဂါရပ်များကိုလည်း အသုံးပြုနိုင်ပါသည်။

## အဓိက အင်္ဂါရပ်များ

- သင့်ထုတ်ဖော်လိုသည့် endpoint method များကို ရွေးချယ်နိုင်သည်။
- သင်၏ API အတွက် policy အပိုင်းတွင် ပြင်ဆင်သည့် အခြေအနေ ပေါ်မူတည်၍ ထပ်ဆောင်းအင်္ဂါရပ်များ ရရှိမည်ဖြစ်သည်။ ဒီမှာ rate limiting ကို ထည့်သွင်းလိုက်မည်။

## ကြိုတင်ဆောင်ရွက်မှု - API တစ်ခုကို တင်သွင်းခြင်း

Azure API Management တွင် API ရှိပြီးသားဖြစ်ပါက စတင်ခြင်းမလိုပါ။ မရှိပါက [importing an API to Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api) ကို ဖတ်ရှုကြည့်ပါ။

## API ကို MCP ဆာဗာအဖြစ်ဖော်ထုတ်ခြင်း

API endpoints များဖော်ထုတ်ရန် အောက်ပါအဆင့်များကို လိုက်နာပါ-

1. Azure Portal (<https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>) သို့ ဝင်ရောက်၍ သင့် API Management instance သို့ သွားပါ။

1. ဘယ်ဘက် menu တွင် APIs > MCP Servers > + Create new MCP Server ကို ရွေးချယ်ပါ။

1. API တွင် MCP ဆာဗာအဖြစ် ဖော်ထုတ်လိုသော REST API ကို ရွေးချယ်ပါ။

1. Tool များအဖြစ် ဖော်ထုတ်လိုသည့် API Operations တစ်ခု သို့မဟုတ် များစွာကို ရွေးချယ်ပါ။ တစ်ခုခုသို့မဟုတ် အားလုံးကို ရွေးချယ်နိုင်သည်။

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. **Create** ကို ရွေးချယ်ပါ။

1. **APIs** နှင့် **MCP Servers** မီနူးများသို့ သွားပါ။ အောက်ပါအတိုင်း ပေါ်လာသည်-

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP ဆာဗာ ဖန်တီးပြီး API operations များကို tools အဖြစ် ဖော်ထုတ်ထားသည်။ MCP ဆာဗာသည် MCP Servers ပေးနယ်တွင် စာရင်းသွင်းထားပြီး URL ကော်လံတွင် စမ်းသပ်ရန် သို့မဟုတ် client application တွင် အသုံးပြုရန်ခေါ်ဆိုနိုင်သည့် endpoint ကို ပြသည်။

## ကြိုက်နှစ်သက်လျှင် - policy များ တပ်ဆင်ခြင်း

Azure API Management တွင် သင်၏ endpoints များအတွက် သတ်မှတ်ချက် အမျိုးမျိုးကို ရေးသားနိုင်သည့် policies အကြီးအကျယ်ရှိပြီး ဥပမာအားဖြင့် rate limiting သို့မဟုတ် semantic caching စသည့် ဆုံးဖြတ်ချက်များကို XML ဖြင့် ဖော်ပြထားသည်။

MCP Server အတွက် rate limit ကို ဖန်တီးရန် နမူနာ-

1. ပိုတော့လ်တွင် APIs အောက်မှ **MCP Servers** ကို ရွေးချယ်ပါ။

1. ဖန်တီးထားသော MCP ဆာဗာကို ရွေးချယ်ပါ။

1. ဘယ်ဘက် menu တွင် MCP အောက်မှ **Policies** ကို ရွေးပါ။

1. policy editor တွင် MCP ဆာဗာ၏ tools များအပေါ် သတ်မှတ်လိုသည့် policies များကို ထည့်သွင်း သို့မဟုတ် ပြင်ဆင်ပါ။ နမူနာအနေဖြင့် MCP server tools များအား နာရီခြား ၃၀ စက္ကန့်အတွင်း client IP address တစ်ခုလျှင် ၅ ခေါ်ဆိုမှု သာခွင့်ပြုမည်ဖြစ်သော rate limiting policy ပါသော XML ကို ထည့်သွင်းနိုင်သည်။

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    policy editor ၏ ရုပ်ပုံ-

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## စမ်းသပ်ကြည့်ခြင်း

MCP ဆာဗာသည် မိမိရည်ရွယ်ထားသလို လည်ပတ်နေသည်မှာ သေချာစေရန်လုပ်မည်။

ဤအတွက် Visual Studio Code နှင့် GitHub Copilot ၏ Agent mode ကို အသုံးပြုသွားမည်။ MCP ဆာဗာကို *mcp.json* မှတည့်တည့်ထည့်သွင်းပြီး Visual Studio Code သည် agentic လုပ်ဆောင်ချက်များပါသော client အဖြစ် လုပ်ဆောင်မည်ဖြစ်ပြီး အသုံးပြုသူများသည် prompt ရိုက်ထည့်ကာ ဆာဗာနှင့် အပြန်အလှန်ဆက်သွယ်နိုင်မည်။

Visual Studio Code တွင် MCP ဆာဗာ ထည့်ရန်အဆင့်များ-

1. Command Palette မှ MCP: **Add Server command** ကို အသုံးပြုပါ။

1. server ပုံစံအမျိုးအစားကို ပြအပ်မည့်အခါ၊ **HTTP (HTTP or Server Sent Events)** ကို ရွေးပါ။

1. API Management တွင် MCP ဆာဗာ URL ကို ထည့်သွင်းပါ။ ဥပမာ- **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE endpoint အတွက်) သို့မဟုတ် **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP endpoint အတွက်) — သင့်အား `/sse` နှင့် `/mcp` လမ်းကြောင်းကွဲခြားမှုကို သတိပြုပါ။

1. သင်သတ်မှတ်လိုသော server ID တစ်ခုကို ထည့်ပါ။ ယင်းသည် အရေးကြီးကျယ်ကျယ်သော တန်ဖိုးမဟုတ်ပါ၊ သင်၏ server instance ကို မှတ်မိရန် ကူညီပါလိမ့်မည်။

1. configuration ကို workspace settings သို့မဟုတ် user settings တွင် သိမ်းဆည်းမယ် ဆိုသည့် ရွေးချယ်မှုကို သတ်မှတ်ပါ။

  - **Workspace settings** — server configuration ကို .vscode/mcp.json ဖိုင်အဖြစ် လုပ်ဆောင်သော workspace တွင်သာ သိမ်းဆည်းသည်။

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    streaming HTTP လမ်းကြောင်းဖြင့် ပို့ဆောင်ရန် ရွေးလျှင် နည်းနည်း ကွဲပြားပါလိမ့်မည်-

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** — server configuration ကို သင့် global *settings.json* ဖိုင်တွင် ထည့်သွင်းပြီး workspace အားလုံးတွင် အသုံးပြုနိုင်သည်။ configuration ပုံစံမှာ အောက်ပါအတိုင်း ဖြစ်သည်-

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Azure API Management ဆီသို့ မှန်ကန်စွာ Authenticate ရန် header တစ်ခု ထည့်သွင်းရန် လိုအပ်သည်။ **Ocp-Apim-Subscription-Key** ဟုခေါ်သော header ကို အသုံးပြုသည်။

    - settings တွင် ထည့်သွင်းသည့် နည်း-

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)၊ ၎င်းဟာ အတည်ပြုရေး API key တစ်ခုအတွက် prompt ကို ဖေါ်ပြပေးပြီး သင် Azure Portal တွင် API Management instance တည်ရှိရာမှ key ကို ယူနိုင်မည်။

    - *mcp.json* ထဲသို့ ထည့်သွင်းလိုလျှင်၊ အောက်ပါ အတိုင်းနှင့်တူညီစွာ ထည့်နိုင်သည်-

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

### Agent mode ကို အသုံးပြုခြင်း

အခုတော့ settings သို့မဟုတ် *.vscode/mcp.json* တွင် အားလုံး ပြင်ဆင်ပြီး ဖြစ်ပြီ။ စမ်းသပ်ကြည့်ကြရအောင် -

Tools အိုင်ကွန်တစ်ခု အောက်ပါအတိုင်း ကိုယ်စားပြုလိုက်ပါ၊ ထို Tools တွင် သင့်ဆာဗာတွင် exposed tools များ စာရင်းပြထားသည်-

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. tools icon ကို နှိပ်ပြီး tool များစာရင်းကို မြင်ရမှာဖြစ်သည်-

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. chat box သို့ prompt တစ်ခု ထည့်ပြီး tool ကို ခေါ်ဆောင်ပါ။ ဥပမာ - အော်ဒါတစ်ခုအကြောင်း စုံစမ်းမေးမြန်းမည်ဆိုပါက agent အား အော်ဒါအကြောင်း မေးမြန်းနိုင်သည်။ နမူနာ prompt ဒီမှာ -

    ```text
    get information from order 2
    ```

    သင်သည် tools အိုင်ကွန်းတစ်ခုကို ပြသသွားပြီး tool ကို ဆက်လက်ခေါ်ရန် မေးမြန်းမည်။ ဆက်လက်အသုံးပြုရန် ရွေးချယ်ပါက အောက်ပါအတိုင်း ထွက်ပေါ်မှုကို တွေ့ရမည်-

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **အထက်ပါ အကြောင်းအရာသည် သင့်တပ်ဆင်ထားသော tool များပေါ် မူတည်သော်လည်း စကားလုံးဖြင့် တုံ့ပြန်မှု တစ်မျိုးကို သိမ်းဆည်းပေးလိမ့်မည်**


## ကိုးကားချက်များ

ပိုမိုလေ့လာလိုပါက-

- [Azure API Management နှင့် MCP ပေါ်တွင် သင်ခန်းစာ](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python နမူနာ - Azure API Management ဖြင့် Remote MCP servers လုံခြုံစွာ သုံးခြင်း (Experimental)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP client authorization lab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [VS Code အတွက် Azure API Management extension ဖြင့် API များကို မိတ်ဆက်၊ စီမံခန့်ခွဲခြင်း](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API Center တွင် remote MCP servers ကို မှတ်ပုံတင် စူးစမ်းခြင်း](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) — Azure API Management နှင့်အတူ AI စွမ်းဆောင်မှုများပြသထားသည့် ဂိုဒေါင်ကြီး
- [AI Gateway workshops](https://azure-samples.github.io/AI-Gateway/) — Azure Portal ကို အသုံးပြု၍ AI စွမ်းဆောင်မှုများ စစ်ဆေးတတ်ရန် စတင်သင်ကြားမှုများပါရှိသည်။

## နောက်တစ်ဆင့်မှာ

- နောက်သို့ သွားရန် - [Case Studies Overview](./README.md)
- နောက်တစ်ခု - [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**အသိပေးချက်**  
ဤစာရွက်စာတမ်းကို AI ဘာသာပြန်ဆရာ Co-op Translator (https://github.com/Azure/co-op-translator) မှတခြား ဘာသာပြန်ခြင်းဖြင့် ပြန်ဆိုထားပါသည်။ တိကျမှုအတွက် ကြိုးစားပေမယ့် အလိုအလျောက်ဘာသာပြန်ခြင်းသည် မွားယွင်းမှုများ သို့မဟုတ် အမှားအယွင်းများ ပါဝင်နိုင်ပါသည်။ မူလစာရွက်စာတမ်းကို မိခင်ဘာသာဖြင့်သာ အတည်ပြုသော အရင်းအမြစ်အဖြစ်ယူဆရန် လိုအပ်ပါသည်။ အရေးကြီးသော သတင်းအချက်အလက်များအတွက် လူ့ဘာသာပြန်ကျွမ်းကျင်သူ၏ ဘာသာပြန်မှုကို တိုက်တွန်းပါသည်။ ဤဘာသာပြန်မှု အသုံးပြုမှုကြောင့် ဖြစ်ပေါ်လာနိုင်သည့် အနားမလွတ်မှု သို့မဟုတ် မှားယွင်းသဘောအယူများအတွက် ကျွန်ုပ်တို့ ဥပဒေရည်မှန်းချက် မပါဝင်ပါကြောင်း အသိပေးအပ်လိုက်ပါသည်။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->