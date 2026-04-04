# కేసు స్టడీ: API మేనేజ్‌మెంట్‌లో REST API ని MCP సర్వర్‌గా ప్రదర్శించడం

Azure API Management అనేది మీ API ఎండ్‌పాయింట్లపై గేట్వేను అందించే ఒక సేవ. ఇది ఎలా పనిచేస్తుందంటే Azure API Management మీ APIs ముందు ప్రాక్సీగా పనిచేస్తుంది మరియు వచ్చే అభ్యర్థనలపై ఏం చేయాలో నిర్ణయించవచ్చు.

దీనినుపయోగించడం ద్వారా, మీరు ఇలాంటి అనేక ఫీచర్‌లను జోడించవచ్చు:

- **భద్రత**, మీరు API కీలు, JWT నుండి మేనేజ్డ్ ఐడెంటిటీ వరకు అన్నీ ఉపయోగించవచ్చు.
- **రేటు పరిమితి**, ఒక మంచి ఫీచర్ ఏమిటంటే, నిర్దిష్ట సమయ యూనిట్‌కి ఎంతమంది కాల్లు గమ్యస్థానం చేరుకోవాలో నిర్ణయించే అవకాశం. ఇది అన్ని వినియోగదారులకు మంచి అనుభవం కల్పించడంలో సహాయపడుతుంది మరియు మీ సేవ అభ్యర్థనలతో ఓవర్‌లోడెడ్ కానివ్వదు.
- **స్కేలింగ్ & లోడ్ బ్యాలెన్సింగ్**. మీరు లోడ్‌ను సమతుల్యం చేసే కొద్దిమంది ఎండ్‌పాయింట్లను సెట్ చేయవచ్చు మరియు "లోడ్ బ్యాలెన్స్" ఎలా చేయాలో కూడా నిర్ణయించవచ్చు.
- **సెమాంటిక్ క్యాచింగ్**, టోకెన్ పరిమితి, టోకెన్ మానిటరింగ్ వంటి AI ఫీచర్లు. ఇవి రెస్పాన్స్ టైమ్ మెరుగుపరచడంలో మంచి ఫీచర్‌లు మరియు మీ టోకెన్ ఖర్చులపై మీరు పర్యవేక్షణ ఉంచడంలో సహాయపడతాయి. [ఇక్కడ చదవండి](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## ఎందుకు MCP + Azure API Management?

మోడెల్ కాంటెక్స్ట్ ప్రోటోకాల్(agentic AI apps మరియు consistent గా టూల్స్, డేటాను ప్రదర్శించే విధానం కోసం త్వరగా ఒక ప్రమాణంగా మారుతోంది). Azure API Management మీరు APIలను "మేనేజ్" చేయడానికి సహజమైన ఎంపిక. MCP సర్వర్లు సాధారణంగా ఇతర APIలతో అనుసంధానం చేసి టూల్స్ సేకరణకు అభ్యర్థనలు పరిష్కరిస్తాయి. కాబట్టి Azure API Management మరియు MCP సంయోజన మేలు చేస్తుంది.

## సమీక్ష

ఈ ప్రత్యేక ఉపయోగపు సందర్భంలో, మనం API ఎండ్‌పాయింట్లను MCP సర్వర్‌గా ప్రదర్శించడం నేర్చుకుంటాం. దీని ద్వారా, ఈ ఎండ్‌పాయింట్లు agentic యాప్ భాగంగా సులభంగా ఉండగలవు మరియు Azure API Management యొక్క ఫీచర్లు కూడా పొందుతాం.

## ప్రధాన ఫీచర్లు

- మీరు టూల్‌లుగా ప్రదర్శించాలని కోరుకున్న ఎండ్‌పాయింట్ పద్ధతులను ఎంచుకోవచ్చు.
- మీరు పొందే అదనపు ఫీచర్లు మీ API కోసం పాలసీ సెక్షన్‌లో కోర్మాటివ్గా ఉండ్ దాని ఆధారపడి ఉంటాయి. కానీ ఇక్కడ మనం రేటు పరిమితిని ఎలా జోడించాలో చూపిస్తాం.

## ముందస్తు దశ: APIని దిగుమతి చేసుకోండి

మీరు ఇప్పటికే Azure API Managementలో API ఉంటే బాగుంటుంది, ఆ డ్యాప్ విడవచ్చు. లేకపోతే ఈ లింక్ చూడండి, [Azure API Managementకి API దిగుమతి చేసుకోవడం](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## MCP సర్వర్‌గా APIను ప్రదర్శించండి

API ఎండ్‌పాయింట్లను ప్రదర్శించడానికి, ఈ దశలను అనుసరించండి:

1. Azure పోర్టల్‌కు వెళ్లి ఈ చిరునామా <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> లోకి వెళ్లండి  
మీ API మేనేజ్‌మెంట్ ఇన్స్టన్స్‌కు వెళ్లండి.

1. ఎడమ మెను నుండి APIs > MCP Servers > + Create new MCP Server ఎంచుకోండి.

1. API లో MCP సర్వర్‌గా ప్రదర్శించడానికి ఒక REST APIని ఎంచుకోండి.

1. ఒకటి లేదా ఎక్కువ API ఆపరేషన్స్‌ని టూల్‌లుగా ప్రదర్శించడానికి ఎంచుకోండి. మీరు అన్ని ఆపరేషన్స్ లేదా నిర్దిష్ట ఆపరేషన్స్ మాత్రమే ఎంచుకోవచ్చు.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. **Create** ఎంచుకోండి.

1. **APIs** మరియు **MCP Servers** మెనూ ఆప్షన్లకు వెళ్లండి, మీరు క్రింది దృశ్యం చూడగలరు:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP సర్వర్ సృష్టించబడింది మరియు API ఆపరేషన్స్ టూల్‌లుగా ప్రదర్శించబడ్డాయి. MCP సర్వర్ MCP Servers ప్యాన్‌లో నమోదు చేయబడింది. URL కాలమ్ MCP సర్వర్ ఎండ్‌పాయింట్ చూపిస్తుంది, మీరు పరీక్షించడానికి లేదా క్లయింట్ యాప్‌లో ఉపయోగించవచ్చు.

## ఐచ్ఛికం: పాలసీలను కాన్ఫిగర్ చేయండి

Azure API Managementలో పాలసీల ప్రధాన కాన్సెప్ట్ ఉంది, దీని ద్వారా మీరు మీ ఎండ్‌పాయింట్లకి భిన్నమైన నియమాలను వేయవచ్చు, ఉదాహరణకు రేటు పరిమితి లేదా సెమాంటిక్ క్యాచింగ్ వంటి. ఈ పాలసీలు XMLలో రచించబడతాయి.

ఇక్కడ MCP సర్వర్ రేటు పరిమితి కోసం పాలసీ ఎలా సెట్ చేయాలో ఉంది:

1. పోర్టల్‌లో, APIs క్రింద, **MCP Servers** ఎంచుకోండి.

1. మీ సృష్టించిన MCP సర్వర్ ఎంచుకోండి.

1. ఎడమ మెనూలో MCP క్రింద **Policies** ఎంచుకోండి.

1. పాలసీ ఎడిటర్‌లో మీరు MCP సర్వర్ టూల్స్‌కు వర్తింప జేయదలచిన పాలసీలను జోడించండి లేదా మార్చండి. పాలసీలు XML ఫార్మాట్‌లో నిర్వచించబడతాయి. ఉదాహరణకు, మీరు MCP సర్వర్ టూల్స్‌కు కాల్స్ పరిమితి పెట్టేందుకు పాలసీ జోడించవచ్చు (ఈ ఉదాహరణలో, ప్రతి క్లయింట్ IP ఆక్రస్‌కు 30 సెకన్లకు 5 కాల్లు). అడిగిన XML ఇలా ఉంటుంది:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```
  
    పాలసీ ఎడిటర్ ఇమేజ్ ఇక్కడ:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## ప్రయత్నిది

మన MCP సర్వర్ ఆశించినట్లుగా పనిచేస్తుందో లేదో చూసుకుందాం.

ఇందుకోసం మేము Visual Studio Code మరియు GitHub Copilot మరియు దాని Agent మోడ్‌ను ఉపయోగిస్తాము. మేము MCP సర్వర్‌ని *mcp.json*లో జోడిస్తాము. దీని వల్ల Visual Studio Code ఏజెంటిక్ సామర్థ్యాలతో క్లయింట్‌గా పనిచేస్తుంది మరియు ఉపయోగించే వాడుకరులు ప్రాంప్ట్ టైప్ చేసి ఆ సర్వర్‌తో కమ్యూనికేట్ చేయగలరు.

Visual Studio Codeలో MCP సర్వర్ ఎలా జోడించాలో చూద్దాం:

1. కమాండ్ ప్యాలెట్ నుండి MCP: **Add Server** ఆజ్ఞను ఉపయోగించండి.

1. ప్రాంప్ట్ వచ్చినప్పుడు సర్వర్ రకం ఎంచుకోండి: **HTTP (HTTP or Server Sent Events)**.

1. API Managementలో MCP సర్వర్ URLను ఎంటర్ చేయండి. ఉదా: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE ఎండ్‌పాయింట్ కోసం) లేదా **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP ఎండ్‌పాయింట్ కోసం), ఇక్కడ ట్రాన్స్‌పోర్ట్‌లో భేదం `/sse` లేదా `/mcp` ఉంటుంది.

1. మీ ఇష్టాని సర్వర్ ID ను ఎంటర్ చేయండి. ఇది ముఖ్యమైన విలువ కాదు, కానీ ఈ సర్వర్ ఇన్స్టెన్స్ ఏదో గుర్తుచేసుకోవడానికి ఇది ఉపయోగపడుతుంది.

1. కాన్ఫిగరేషన్‌ను వర్క్‌స్పేస్ సెట్టింగ్స్ లేదా యూజర్ సెట్టింగ్స్‌కి సేవ్ చేయడం ఎంచుకోండి.

  - **వర్క్‌స్పేస్ సెట్టింగ్స్** - సర్వర్ కాన్ఫిగరేషన్ .vscode/mcp.json ఫైల్‌కి సేవ్ అవుతుంది మరియు ప్రస్తుత వర్క్‌స్పేస్‌లో మాత్రమే అందుబాటులో ఉంటుంది.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    లేదా మీరు స్ట్రీమింగ్ HTTPని ట్రాన్స్‌పోర్ట్‌గా ఎంచుకుంటే కాస్త భిన్నంగా ఉంటుంది:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **యూజర్ సెట్టింగ్స్** - సర్వర్ కాన్ఫిగరేషన్ మీ గ్లోబల్ *settings.json* ఫైల్‌లో జోడించబడుతుంది మరియు అన్ని వర్క్‌స్పేస్‌లలో అందుబాటులో ఉంటుంది. కాన్ఫిగరేషన్ ఇలా ఉంటుంది:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. అదనంగా మీరు Azure API Management వైపుకి సరైన ఆటోమేటిక్ ఆధికారాన్ని కల్పించేందుకు ఒక హెడర్ జోడించాలి. ఇది **Ocp-Apim-Subscription-Key* అనే హెడర్ ఉపయోగిస్తుంది.

    - మీరు హెడర్‌ను సెట్టింగ్స్‌లో ఇలా జోడించవచ్చు:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), ఇది API కీ విలువ కోసం ఒక ప్రాంప్ట్ చూపిస్తుంది, మీరు Azure పోర్టల్‌లో మీ Azure API Management ఇన్స్టెన్స్ కోసం దీనిని కనుగొనవచ్చు.

   - మీరు దీనిని *mcp.json*లో జోడించాలనుకుంటే, ఈ విధంగా జోడించవచ్చు:

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

### ఏజెంట్ మోడ్ ఉపయోగించండి

ఇప్పుడు మనం సెట్టింగ్స్ లేదా *.vscode/mcp.json*లో అన్ని సెట్ అయ్యింది. ఈ క్రింది విధంగా ప్రయత్నిస్తాం.

టూల్‌లు కనిపించే ఐకాన్ ఉండాలి, మీ సర్వర్ నుంచి ప్రదర్శించబడిన టూల్‌ల జాబితా ఇలాగే ఉంటుంది:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. టూల్స్ ఐకాన్ క్లిక్ చేయండి, టూల్‌ల జాబితా కనిపిస్తుంది:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. టూల్‌ను కాల్ చేయడానికి చాట్‌లో ఒక ప్రాంప్ట్ ఎంటర్ చేయండి. ఉదాహరణకు, మీరు ఆర్డర్ గురించి సమాచారం పొందటానికి ఒక టూల్ ఎంచుకున్నట్లయితే, ఏజెంట్‌కు ఆ ఆర్డర్ గురించి అడగవచ్చు. ఈ క్రింది ప్రాంప్ట్ ఒక ఉదాహరణ:

    ```text
    get information from order 2
    ```

    మీరు ఇప్పుడు టూల్స్ ఐకాన్‌తో ప్రాంప్ట్ చేయబడతారు, టూల్‌ను కొనసాగించి రన్ చేయాలని అడుగుతుంది. టూల్‌ను కొనసాగించడానికి ఎంచుకోండి, మీరు క్రింది లాంటి అవుట్‌పుట్ చూడగలరు:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **మీరు పైగా ఎటువంటి టూల్స్ సెట్ చేసుకున్నారో దానినుపై ఇది ఆధారపడి ఉంటుంది, కానీ భావన ఏమిటంటే మీరు పాఠ్యస్పద ప్రతిస్పందన పొందగలరు**


## రిఫరెన్సులు

మరింతగా తెలుసుకోవడానికి ఇలా చేయండి:

- [Azure API Management మరియు MCPపై ట్యుటోరియల్](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python ఉదాహరణ: Azure API Management ఉపయోగించి రిమోట్ MCP సర్వర్లను సురక్షితం చేయడం (ప్రయోగాత్మక)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP క్లయింట్ ఆథరైజేషన్ ల్యాబ్](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Visual Studio Code కోసం Azure API Management ఎక్స్టెన్షన్ ఉపయోగించి APIs దిగుమతి చేయడం మరియు నిర్వహించడం](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API Centerలో రిమోట్ MCP సర్వర్లను నమోదు చేసి అన్వేషించడం](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI గేట్వే](https://github.com/Azure-Samples/AI-Gateway) Azure API Managementతో అనేక AI సామర్థ్యాలను చూపించే గొప్ప రెపో
- [AI గేట్వే వర్క్‌షాప్స్](https://azure-samples.github.io/AI-Gateway/) Azure పోర్టల్ ఉపయోగించి వర్క్‌షాప్స్, ఇది AI సామర్థ్యాలను అంచనా వేయడంలో మంచి మార్గం.

## తర్వాత ఏమి

- తిరిగి: [కేసు స్టడీస్ సమీక్ష](./README.md)
- తర్వాత: [Azure AI ట్రావెల్ ఏజెంట్లు](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**వివరణాత్మక సమాచారంలో**:  
ఈ పత్రాన్ని AI అనువాద సేవ అయిన [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించారు. మేము సరైనత కోసం శ్రమిస్తేనూ, ఆటోమేటెడ్ అనువాదాల్లో తప్పులు లేదా గందరగోళాలు ఉండవచ్చు. అసలు పత్రం దాని స్థానిక భాషలో అధికారిక మూలంగా పరిగణించాలి. ముఖ్యమైన సమాచారానికి వృత్తిపరమైన మానవ అనువాదాన్ని సూచిస్తాము. ఈ అనువాదం ఉపయోగంతో ఏర్పడే ఏదైనా అపార్థాలు లేదా తప్పుదారులు జరిగితే, వాటికి మేము బాధ్యులు కాదు.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->