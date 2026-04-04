# കേസ്സ് സ്റ്റഡി: API മാനേജ്മെന്റിൽ MCP സർവറായി REST API പ്രദർശിപ്പിക്കുക

Azure API Management, നിങ്ങളുടെ API എന്റ്പോയിന്റുകളുടെ മുകളിൽ ഗേറ്റ്വേ ആയി പ്രവർത്തിക്കുന്ന ഒരു സേവനമാണ്. ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു అంటే Azure API Management നിങ്ങളുടെ APIകൾക്ക് മുന്നിൽ പ്രോക്സിയായി പ്രവർത്തിച്ച് വരവുവരുന്ന അഭ്യർത്ഥനകളുമായി എന്ത് ചെയ്യണമെന്ന് തീരുമാനിക്കാം.

ഇത് ഉപയോഗിച്ച്, നിങ്ങൾക്ക് താഴെപ്പറയുന്ന ഫീച്ചറുകൾ ലഭ്യമാണ്:

- **സുരക്ഷ**, API കീകൾ, JWT മുതൽ മാനേജ്ഡ് ഐഡന്റിറ്റി വരെ എല്ലാം ഉപയോഗിക്കാം.
- **റേറ്റ് ലിമിറ്റിംഗ്**, ഒരു പ്രത്യേക സമയം ഘട്ടത്തിൽ എത്ര കോളുകൾ കടന്നുപോകണം എന്ന് തീരുമാനിക്കാൻ കഴിയുന്ന ഒരു ഉത്തമ ഫീച്ചറുകളിലൊന്നാണ് ഇത്. ഇത് എല്ലാ ഉപഭോക്താക്കൾക് നല്ല അനുഭവം ഉറപ്പാക്കാനും നിങ്ങളുടെ സേവനം അഭ്യർത്ഥനകളാൽ മുട്ടിപ്പോകാതെ ഉറപ്പാക്കാനും സഹായിക്കുന്നു.
- **സ്കേലിങ്ങ് & ലോഡ് ബാലൻസിംഗ്**. ചില എന്റ്പോയിന്റുകൾ സജ്ജീകരിച്ച് ലോഡ് തുല്യമായി ഷെയർ ചെയ്യാം, എങ്ങനെ "ലോഡ് ബാലൻസ്" ചെയ്യണമെന്നതും നിങ്ങൾക്ക് തീരുമാനിക്കാം.
- **സെമാന്റിക് കാഷിംഗ് പോലുള്ള AI ഫീച്ചറുകൾ**, ടോക്കൺ പരിധി, ടോക്കൺ നിരീക്ഷണം എന്നിവയും ഉൾപ്പെടെ. പ്രതികരണശേഷി മെച്ചപ്പെടുത്തുകയും ടോക്കൺ ചെലവ് നിയന്ത്രണത്തിൽ സഹായിക്കുകയും ചെയ്യുന്ന ഉത്തമ ഫീച്ചറുകളാണ് ഇവ. [കൂടുതൽ വായിക്ക täällä](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## MCP + Azure API Management എന്തുകൊണ്ട്?

Model Context Protocol (MCP) ഏജന്റിക് AI ആപ്പുകൾക്കും ഉപകരണങ്ങളും ഡേറ്റയും ഏകദേശ രീതിയിൽ പ്രദർശിപ്പിക്കാൻ വേഗത്തിൽ ഒരു സ്റ്റാൻഡർഡായി മാറുകയാണ്. APIകൾ "മാനേജുചെയ്യാൻ" നിങ്ങൾക്ക് ആവശ്യമുണ്ടെങ്കിൽ Azure API Management ഒരു സൗഭാഗ്യമാണ്. MCP സർവറുകൾ പലപ്പോഴും മറ്റ് APIകൾക്കൊപ്പം സമന്വയിപ്പിച്ച് ഉപകരണങ്ങൾക്കുള്ള അഭ്യർത്ഥനകൾ പൂര்த்தികരിക്കുന്നു. അതിനാൽ Azure API Management ഉം MCP യും ചേർന്ന് പ്രവർത്തിക്കുന്നത് ധാരാളം ഉപകാരപ്രദമാണ്.

## അവലോകനം

ഈ പ്രത്യേക കേസ്സ് സ്റ്റഡിയിൽ, നമ്മുടെ API എന്റ്പോയിന്റുകൾ MCP സർവറായി എങ്ങനെ പ്രദർശിപ്പിക്കാമെന്ന് പഠിക്കും. ഇതുവഴി, ഈ എന്റ്പോയിന്റുകൾ ഒരു ഏജന്റിക് ആപ്പിന്റെ ഭാഗമാക്കാനാകും, കൂടാതെ Azure API Management ന്റെ ഫീച്ചറുകളും ഉപയോഗിക്കാം.

## പ്രധാന ഫീച്ചറുകൾ

- നിങ്ങൾ പ്രദർശിപ്പിക്കാൻ ആഗ്രഹിക്കുന്ന എന്റ്പോയിന്റ് മെത്തഡുകൾ ടൂൾസായി തിരഞ്ഞെടുക്കാം.
- അധിക ഫീച്ചറുകൾ നിങ്ങളുടെ API നായി πολιസിയിൽ എങ്ങനെ സജ്ജീകരിക്കുന്നു എന്നതിനെ ആശ്രയിച്ചിരിക്കും. ഇവിടെ നാം റേറ്റ് ലിമിറ്റിംഗ് എങ്ങനെ ചേർക്കാമെന്ന് കാണിക്കും.

## പ്രീ-സ്റ്റെപ്പ്: API ഇറക്കുമതി ചെയ്യുക

നിങ്ങൾക്ക് Azure API Management ൽ ഒരു API ഇതിനകം ഉണ്ടെങ്കിൽ നന്നായി, ഈ വട്ടം പാസ്സ് ചെയ്ത് മുന്നോട്ടു പോവാം. ഇല്ലെങ്കിൽ, ഇതു നോക്കൂ, [Azure API Management ന് API ഇറക്കുമതി ചെയ്യുക](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## API MCP സർവറായി പ്രദർശിപ്പിക്കുക

API എന്റ്പോയിന്റുകൾ പ്രദർശിപ്പിക്കാൻ, താഴെപറയുന്ന ചുവടുകൾ പിന്തുടരുക:

1. Azure പോർട്ടലിൽ പ്രവേശിച്ച് താഴെക്കാണുന്ന വിലാസത്തിൽ जाएँ <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
നിങ്ങളുടെ API Management ഇൻസ്റ്റൻസ് കാണുക.

1. ഇടത് മെനുവിൽ APIs > MCP Servers > + Create new MCP Server തിരഞ്ഞെടുത്തു.

1. API ൽ MCP സർവറായി പ്രദർശിപ്പിക്കാൻ ഒരു REST API തിരഞ്ഞെടുക്കുക.

1. ടൂളുകൾ ആയി പ്രദർശിപ്പിക്കാൻ ഒരു അല്ലെങ്കിൽ അധിക API ഓപ്പറേഷനുകൾ തിരഞ്ഞെടുക്കുക. എല്ലാ ഓപ്പറേഷനുകളും അല്ലെങ്കിൽ ചില പ്രത്യേക ഓപ്പറേഷനുകൾ മാത്രം തിരഞ്ഞെടുക്കാം.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. **Create** തിരഞ്ഞെടുക്കുക.

1. മെനു ഓപ്ഷനുകളിൽ **APIs** மற்றும் **MCP Servers** ൽ പോകൂ, താഴെപറയുന്നവ കാണാൻ കഴിയും:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP സർവർ സൃഷ്ടിക്കപ്പെട്ടിട്ടുണ്ട്, API ഓപ്പറേഷനുകൾ ടൂളുകളായി പ്രദർശിപ്പിച്ചിട്ടുണ്ട്. MCP സർവർ MCP Servers പെയ്നിൽ പട്ടിക ചെയ്തിരിക്കുന്നു. URL കോളം MCP സർവറിന്റെ എന്റ്പോയിന്റ് കാണിക്കുന്നു, ഇത് ടെസ്റ്റിംഗിനും ക്ലയന്റ് അപ്ലിക്കേഷനിൽ ഉപയോഗിക്കുന്നതിനും ഉപയോഗിക്കാം.

## ഓപ്ഷണൽ: πολισίες ക്രമീകരിക്കുക

Azure API Management ന്റെ പ്രധാന ആശയം πολισίες ആണ്, ഇത് API എന്റ്പോയിന്റുകൾക്ക് വ്യത്യസ്ത നിയമങ്ങൾ സജ്ജീകരിക്കാനാകും, ഉദാഹരണത്തിന് റേറ്റ് ലിമിറ്റിംഗ് അല്ലെങ്കിൽ സെമാന്റിക് കാഷിംഗ്. πολισίες XML ഫോർമാറ്റിൽ എഴുതുന്നു.

ഞങ്ങൾ MCP സർവറിന്റെ റേറ്റ് ലിമിറ്റിംഗ് πολισία എങ്ങനെ സജ്ജീകരിക്കാമെന്ന് കാണുക:

1. പോർട്ടലിൽ APIs കീഴിൽ, **MCP Servers** തിരഞ്ഞെടുക്കുക.

1. നിങ്ങള്‍ സൃഷ്ടിച്ച MCP സർവർ തിരഞ്ഞെടുക്കുക.

1. ഇടതു മെനുവിൽ MCP കീഴിൽ **Policies** തിരഞ്ഞെടുക്കുക.

1. πολισία എഡിറ്ററിൽ MCP സർവറിന്റെ ടൂളുകളിലായി പ്രയോഗിക്കാൻ ആഗ്രഹിക്കുന്ന πολισίες ചേർക്കുക അല്ലെങ്കിൽ തിരുത്തുക. πολισίες XML ഫോർമാറ്റിൽ നിർവചിച്ചിട്ടുണ്ട്. ഉദാഹരണത്തിന്, MCP സർവറിന്റെ ടൂളുകളിലെ കോളുകൾ (ഈ ഉദാഹരണത്തിൽ, ഓരോ ക്ലയന്റ് IP വിലാസത്തിലായി 30 സെക്കൻറിൽ 5 കോളുകൾ) ലിമിറ്റ് ചെയ്യാനുള്ള πολισία ചേർക്കാം. ഇത് റേറ്റ് ലിമിറ്റ് ഉണ്ടാക്കുന്ന XML ആണ്:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    πολισία എഡിറ്ററിന്റെ ഒരു ചിത്രം ഇതാ:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## പരീക്ഷിച്ചുനോക്കുക

നമ്മുടെ MCP Server ഉദ്ദേശിച്ച പ്രകാരമാണ് പ്രവർത്തിക്കുന്നുണ്ടോ എന്ന് ഉറപ്പാക്കാം.

ഇതിനായി Visual Studio Code, GitHub Copilot ന്റെ ഏജന്റ് മോഡ് എന്നിവ ഉപയോഗിക്കും. MCP സർവർ *mcp.json* ൽ ചേർക്കാം. ഇതുവഴി Visual Studio Code ഏജന്റിക് കഴിവുകൾ ഉൾക്കൊള്ളുന്ന ക്ലയന്റ് ആയി പ്രവർത്തിക്കും, യൂസേഴ്സ് ഒരു പ്രോംപ്റ്റ് ടൈപ്പ് ചെയ്ത് സർവറുമായി ഇടപഴകാൻ കഴിയും.

Visual Studio Code ലെ MCP സർവർ ചേർക്കുന്നതെങ്ങനെ:

1. Command Palette നിന്നു MCP: **Add Server** കമാൻഡ് തിരഞ്ഞെടുക്കുക.

1. ചോദിക്കുമ്പോൾ സർവർ തരം തിരഞ്ഞെടുക്കുക: **HTTP (HTTP or Server Sent Events)**.

1. API Management ൽ MCP സർവറിന്റെ URL നൽകുക. ഉദാഹരണം: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE എന്റ്പോയിന്റിന്) അല്ലെങ്കിൽ **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP എന്റ്പോയിന്റിന്), ട്രാൻസ്പോർട്ടുകൾ തമ്മിലുള്ള വ്യത്യാസം `/sse` അല്ലെങ്കിൽ `/mcp` ആണെന്ന് ശ്രദ്ധിക്കുക.

1. നിങ്ങൾക്ക് ഇഷ്ടമുള്ള ഒരു സർവർ ഐഡി നൽകുക. ഇത് പ്രധാനപ്പെട്ട മൂല്യമല്ല, പക്ഷേ ഈ സർവർ ഇൻസ്റ്റൻസ് എന്താണെന്ന് ഓർക്കാൻ സഹായിക്കും.

1. കോൺഫിഗറേഷൻ നിങ്ങളുടെ വർക്ക്സ്‌പേസ് സജ്ജീകരണത്തിലോ യൂസർ സജ്ജീകരണത്തിലോ സേവ് ചെയ്യാൻ തിരഞ്ഞെടുക്കുക.

  - **വർക്ക്സ്‌പേസ് സജ്ജീകരണങ്ങൾ** - സർവർ കോൺഫിഗറേഷൻ .vscode/mcp.json ഫയൽ ആയി നിലവിലെ വർക്ക്സ്‌പേസിൽ മാത്രം സേവ് ചെയ്യും.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    അല്ലെങ്കിൽ, നിങ്ങൾ സ്ട്രീമിംഗ് HTTP ട്രാൻസ്പോർട്ട് തിരഞ്ഞെടുക്കുകയാണെങ്കിൽ ഇത് അല്പം വ്യത്യസ്തമായിരിക്കും:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **യൂസർ സജ്ജീകരണങ്ങൾ** - സർവർ കോൺഫിഗറേഷൻ നിങ്ങളുടെ ഗ്ലോബൽ *settings.json* ഫയലിൽ ചേർത്ത് എല്ലാ വർക്ക്സ്പേസുകളിലും ഉപയോഗിക്കാം. കോൺഫിഗറേഷൻ താഴെയുള്ള രീതിയിലാണ്:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Azure API Management ലേക്ക് ശരിയായി പ്രാമാണീകരണം ഉറപ്പാക്കാൻ ഒരു ഹെഡർ ഉൾപ്പെടുത്തേണ്ടതാണ്. ഇത് **Ocp-Apim-Subscription-Key** എന്ന ഹെഡർ ഉപയോഗിക്കുന്നു.

    - സജ്ജീകരണത്തിൽ ഇത് ചേർക്കുന്നത് എങ്ങനെ:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)  
    ഇത് API കീ മൂല്യം ചോദിക്കുന്ന പ്രോംപ്റ്റ് കാട്ടും, ഇത് Azure പോർട്ടലിൽ നിങ്ങളുടെ Azure API Management ഇൻസ്റ്റൻസിൽ നിന്നു കാണാം.

   - *mcp.json* ൽ ചേർക്കാൻ ഇത് ഇങ്ങനെ ചേർക്കാം:

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

### ഏജന്റ് മോഡ് ഉപയോഗിക്കുക

ഇപ്പോൾ ഞങ്ങൾ സജ്ജമാക്കിയിട്ടുണ്ട്, είτε settings-ൽ είτε *.vscode/mcp.json* ൽ. പരീക്ഷിച്ച് നോക്കാം.

ഉപരിതലത്തിൽ Tools ഐകോൺ ഉണ്ടാകണം, അവിടെ നിങ്ങളുടെ സർവറിൽ നിന്ന് പ്രദർശിപ്പിച്ച ടൂളുകൾ കാണാം:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Tools ഐകോൺ ക്ലിക്കുചെയ്യുക, താഴെപറഞ്ഞതുപോലെ ടൂൾസിന്റെ പട്ടിക കാണാം:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. ടൂൾ പ്രവർത്തിപ്പിക്കാൻ ചാറ്റിൽ ഒരു പ്രോംപ്റ്റ് നൽകുക. ഉദാഹരണത്തിന്, ഒരു ഓർഡറിനോട് ബന്ധപ്പെട്ടു വിവരങ്ങൾ എടുക്കാൻ ടൂൾ തിരഞ്ഞെടുത്തെങ്കിൽ, ഏജന്റിന് ഓർഡറിനെക്കുറിച്ച് ചോദിക്കാം. ഉദാഹരണ പ്രോംപ്റ്റ് ഇതാ:

    ```text
    get information from order 2
    ```

    ഇപ്പോൾ ടൂൾ ഉപയോഗിക്കാൻ നിങ്ങൾക്ക് ടൂൾ ഐക്കൺ കാണിക്കും. ഇത് ഉപയോഗിച്ച് ടൂൾ പ്രവർത്തിപ്പിച്ചാൽ, താഴെപറയുന്ന പോലെയുള്ള ഔട്ട്പുട്ട് കാണാം:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **മുകളിൽ നിങ്ങൾ തയ്യാറാക്കിയ ടൂളുകൾ അനുസരിച്ച് ഫലങ്ങൾ വ്യത്യസ്തമാകും, പക്ഷേ ആശയം നിങ്ങൾക്ക് ടെക്സ്റ്റ് അടിസ്ഥാനത്തിലുള്ള മറുപടി ലഭിക്കും എന്നതാണ്**


## റഫറൻസുകൾ

കൂടുതൽ പഠിക്കാനുള്ള വഴികൾ:

- [Azure API Management and MCP ലെ ട്യൂട്ടോറിയൽ](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python സാമ്പിൾ: Azure API Management ഉപയോഗിച്ച് സിക്യൂർ റിമോട്ട് MCP സർവർ (പ്രയോഭാഗികം)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP ക്ലയന്റ് ഔട്ടറൈസേഷൻ ലാബ്](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [VS Code ന് Azure API Management വിപുലീകരണം ഉപയോഗിച്ച് API കൾ ഇറക്കുമതിയും മാനേജുമെന്റും](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API Center ൽ റിമോട്ട് MCP സർവർ രജിസ്റ്റർ ചെയ്യുകയും കണ്ടെത്തുകയും ചെയ്യുക](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Azure API Management ന്റെ വിവിധ AI കഴിവുകൾ കാണിക്കുന്ന മികച്ച റെപ്പോ
- [AI Gateway വർക്ക്‌ഷോപ്പുകൾ](https://azure-samples.github.io/AI-Gateway/)  Azure പോർട്ടൽ ഉപയോഗിച്ച് നടക്കുന്ന വർക്ക്‌ഷോപ്പുകൾ, AI കഴിവുകൾ വിലയിരുത്താൻ മികച്ച മാർഗ്ഗമാണ്.

## അടുത്തത്

- മടങ്ങി: [Case Studies Overview](./README.md)
- അടുത്തത്: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ഡിസ്ക്ലെയിമർ**:  
ഈ യോഗ്യം [Co-op Translator](https://github.com/Azure/co-op-translator) എന്ന AI ഭാഷാന്തര സേവനം ഉപയോഗിച്ച് വിവർത്തനം ചെയ്തതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്ക് ശ്രമിച്ചാലും, ഓട്ടോമേറ്റഡ് വിവർത്തനങ്ങളിൽ പിശകുകൾ അല്ലെങ്കിൽ തെറ്റായ അർത്ഥങ്ങൾ ഉണ്ടാകാമെന്ന് ദയവായി ശ്രദ്ധിക്കുക. അസൽ ഡോക്യുമെന്റ് അതിന്റെ പ്രാഥമിക ഭാഷയിലുള്ളത് അതിന്റെ ആധിപത്യ ഉറവിടമായി കണക്കാക്കണം. പ്രധാന ആശയങ്ങൾക്കായി പ്രൊഫഷണൽ മാനവ ഭാഷാന്തരം ശുപാർശ ചെയ്യുന്നു. ഈ വിവർത്തനം ഉപയോഗിക്കുന്നതിൽ നിന്നുണ്ടാകുന്ന ഏതെങ്കിലും മറുപടികൾക്കും തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കും ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->