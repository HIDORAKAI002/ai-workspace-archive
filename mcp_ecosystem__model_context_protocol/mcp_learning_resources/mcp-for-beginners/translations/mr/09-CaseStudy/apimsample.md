# केस स्टडी: API व्यवस्थापनात REST API चे MCP सर्व्हर म्हणून प्रकटीकरण करा

Azure API Management ही एक सेवा आहे जी आपल्या API एंडपॉइंटवर गेटवे प्रदान करते. याचे कार्य असं आहे की Azure API Management आपल्या APIs च्या समोर प्रॉक्सी सारखे काम करते आणि येणाऱ्या विनंत्यांसाठी काय करायचे ते ठरवते.

त्याचा वापर करून, आपण खालीलप्रमाणे अनेक वैशिष्ट्ये जोडू शकता:

- **सुरक्षा**, आपण API कीज, JWT पासून व्यवस्थापित ओळखपर्यंत सर्वकाही वापरू शकता.
- **दर मर्यादिती**, एक उत्तम वैशिष्ट्य म्हणजे ठराविक कालखंडात किती कॉल्स पार पाडता येतील हे ठरविणे. यामुळे सर्व वापरकर्त्यांना उत्तम अनुभव मिळतो आणि तसेच आपल्या सेवेला विनंत्यांनी ओबडलं जाण्यापासून बचाव होतो.
- **स्केलिंग आणि लोड बॅलेंसिंग**. आपण लोड बॅलेंस करण्यासाठी अनेक एंडपॉइंट सेट करू शकता आणि "लोड बॅलेंस" कसे करायचे हे देखील ठरवू शकता.
- **AI वैशिष्ट्ये जसे की सेमँटिक कॅशिंग**, टोकन मर्यादा आणि टोकन मॉनिटरिंग आणि बरेच काही. ही वैशिष्ट्ये प्रतिसादक्षमता सुधारतात तसेच आपल्या टोकन खर्चावर लक्ष ठेवण्यास मदत करतात. [येथे अधिक वाचा](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## का MCP + Azure API व्यवस्थापन?

मॉडेल कॉन्टेक्स्ट प्रोटोकॉल (Model Context Protocol) हे एजेंटिक AI अॅप्स साठी लवकरच एक मानक होत आहे आणि साधने व डेटा सुसंगत पद्धतीने प्रकटीकरण करण्यासाठी वापरले जाते. API व्यवस्थापनासाठी Azure API Management एक निसर्गरूपाने निवड आहे. MCP सर्व्हर्स अनेकदा विनंत्या साधनात मार्गदर्शित करण्यासाठी दुसऱ्या APIs शी समाकलित होतात. त्यामुळे Azure API Management आणि MCP चे संयोजन खूप अर्थपूर्ण आहे.

## सारांश

या विशिष्ट वापर प्रकरणात आपण API एंडपॉइंट्सना MCP सर्व्हर म्हणून प्रकटीत करणे शिकू. अशा प्रकारे, आपण हे एंडपॉइंट्स सहज एजेंटिक अॅपचा भाग बनवू शकू आणि त्याचबरोबर Azure API Management चे वैशिष्ट्ये देखील वापरू शकू.

## मुख्य वैशिष्ट्ये

- आपण तुम्हाला ज्या एंडपॉइंट पद्धतींसह साधने म्हणून प्रकटीत करायचे आहे ती निवडता.
- अतिरिक्त वैशिष्ट्ये ही तुमच्या API साठी धोरण विभागात जे सेट करता त्यावर अवलंबून आहेत. परंतु येथे आपण दर मर्यादिती कशी जोडायची हे दाखवू.

## पूर्व टप्पा: API आयात करा

जर तुमच्याकडे आधीच Azure API Management मध्ये API असेल तर छान, तुम्ही हा टप्पा वगळू शकता. नसेल तर, या लिंकवर पाहा, [Azure API Management मध्ये API आयात करणे](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## API MCP सर्व्हर म्हणून प्रकटीत करा

API एंडपॉइंट्सना प्रकटीत करण्यासाठी, खालील चरणांचे पालन करा:

1. Azure पोर्टलवर जा आणि या पत्त्यावर जा <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
तुमच्या API Management उदाहरणाकडे जा.

1. डाव्या मेनूमध्ये, APIs > MCP Servers > + Create new MCP Server निवडा.

1. API मध्ये, MCP सर्व्हर म्हणून प्रकटीत करण्यासाठी REST API निवडा.

1. एक किंवा अधिक API ऑपरेशन्स साधने म्हणून प्रकटीत करण्यासाठी निवडा. तुम्ही सर्व ऑपरेशन्स किंवा फक्त विशिष्ट ऑपरेशन्स निवडू शकता.

    ![प्रकटीत करण्यासाठी पद्धती निवडा](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. **Create** वर क्लिक करा.

1. मेनू पर्याय **APIs** आणि **MCP Servers** कडे जा, तुम्हाला खालील दिसेल:

    ![मुख्य पॅनेलमध्ये MCP सर्व्हर पहा](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP सर्व्हर तयार झाला आहे आणि API ऑपरेशन्स साधने म्हणून प्रकटीत झाले आहेत. MCP सर्व्हर MCP Servers पॅनेलमध्ये सूचीबद्ध आहे. URL स्तंभात MCP सर्व्हरचा एंडपॉइंट दिसतो ज्याला तुम्ही चाचणीसाठी किंवा क्लायंट अॅप्लिकेशनमध्ये कॉल करू शकता.

## ऐच्छिक: धोरणे कॉन्फिगर करा

Azure API Management मध्ये प्राथमिक संकल्पना म्हणून धोरणे (policies) आहेत जिथे तुम्ही तुमच्या एंडपॉइंटसाठी वेगवेगळे नियम सेट करता, उदा. दर मर्यादिती किंवा सेमॅंटिक कॅशिंग. ही धोरणे XML मध्ये तयार केली जातात.

तुमच्या MCP सर्व्हरच्या दर मर्यादितीसाठी धोरण कसे सेट करायचे ते पाहूया:

1. पोर्टलमध्ये, APIs अंतर्गत, **MCP Servers** निवडा.

1. तुम्ही तयार केलेल्या MCP सर्व्हर निवडा.

1. डाव्या मेनूमध्ये, MCP अंतर्गत, **Policies** निवडा.

1. धोरण संपादकात, तुम्हाला लागू करायच्या धोरणांना जोडा किंवा संपादित करा. धोरणे XML स्वरूपात परिभाषित केलेली असतात. उदाहरणार्थ, तुम्ही कॉल्सवर मर्यादा घालणारे धोरण जोडू शकता (या उदाहरणात, ५ कॉल प्रति ३० सेकंद प्रति क्लायंट IP). अशा दर मर्यादितीसाठी XML:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    धोरण संपादकाची प्रतिमा येथे आहे:

    ![धोरण संपादक](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## ते चचावा

आता आपल्या MCP सर्व्हरचे योग्य प्रकारे कार्य होते हे सुनिश्चित करूया.

यासाठी आपण Visual Studio Code आणि GitHub Copilot चा एजंट मोड वापरणार आहोत. आपण MCP सर्व्हर *mcp.json* मध्ये जोडू. यामुळे Visual Studio Code एजंट क्षमतांसह क्लायंट प्रमाणे काम करेल आणि अंतिम वापरकर्ते प्रॉम्प्ट टाकून सर्व्हरशी संवाद साधू शकतील.

Visual Studio Code मध्ये MCP सर्व्हर कसा जोडायचा ते पाहू:

1. Command Palette मधून MCP: **Add Server आदेश** वापरा.

1. विचारले तर, सर्व्हर प्रकार निवडा: **HTTP (HTTP किंवा Server Sent Events)**.

1. API व्यवस्थापनातील MCP सर्व्हरचा URL प्रविष्ट करा. उदाहरणार्थ: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE एंडपॉइंटसाठी) किंवा **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP एंडपॉइंटसाठी), ट्रान्सपोर्टमधील फरक लक्षात घ्या: `/sse` किंवा `/mcp`.

1. तुमच्या पसंतीचा सर्व्हर आयडी प्रविष्ट करा. हा महत्वाचा नाही परंतु त्याद्वारे तुम्हाला ह्या सर्व्हरच्या उदाहरणाची ओळख होईल.

1. कॉन्फिगरेशन आपल्या वर्कस्पेस सेटिंग्जमध्ये किंवा युजर सेटिंग्जमध्ये जतन करायचे का ते निवडा.

  - **वर्कस्पेस सेटिंग्ज** - सर्व्हर कॉन्फिगरेशन फक्त सद्य वर्कस्पेससाठी उपलब्ध `.vscode/mcp.json` फाईलमध्ये जतन होते.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    किंवा जर तुम्ही HTTP स्ट्रिमिंग ट्रान्सपोर्ट निवडले तर थोडे वेगळे असेल:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **युजर सेटिंग्ज** - सर्व्हर कॉन्फिगरेशन तुमच्या जागतिक *settings.json* फाईलमध्ये जोडले जाते आणि सर्व वर्कस्पेसेस मध्ये उपलब्ध असते. कॉन्फिगरेशन खालीलप्रमाणे दिसते:

    ![युजर सेटिंग्स](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. तुम्हाला कॉन्फिगरेशनमध्ये एक हेडर देखील जोडायचा आहे ज्यामुळे Azure API Management कडे योग्यरित्या प्रमाणीकरण होईल. हे **Ocp-Apim-Subscription-Key** नावाचा हेडर वापरते.

    - सेटिंग्ज मध्ये तो कसा जोडायचा:

    ![प्रमाणीकरणासाठी हेडर जोडणे](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), यामुळे API कीची किमत विचारणारा प्रॉम्प्ट दिसेल, जी तुम्हाला Azure पोर्टलमध्ये Azure API Management उदाहरणासाठी उपलब्ध असेल.

   - *mcp.json* मध्ये जोडायचे असल्यास, अशी जोडणी करा:

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

### एजंट मोड वापरा

आता आपण सेटिंग्जमध्ये किंवा *.vscode/mcp.json* मध्ये पूर्णपणे सेटअप केले आहे. आता ते चाचावा.

तुमच्या सर्व्हरमध्ये प्रकटीत केलेली साधने यादीसहित स्वारस्यपूर्ण "टूल्स" आयकॉन असायला हवा:

![सर्व्हरच्या टूल्स](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. टूल्स आयकॉन क्लिक करा, तुम्हाला खालीलप्रमाणे साधनांची यादी दिसेल:

    ![साधने](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. टूल कॉल करण्यासाठी चॅटमध्ये प्रॉम्प्ट टाका. उदाहरणार्थ, जर तुम्ही एखादे साधन ऑर्डर माहिती मिळवण्यासाठी निवडले असेल, तर एजंटला ऑर्डरबद्दल विचारू शकता. खालीलप्रमाणे एक उदाहरण प्रॉम्प्ट:

    ```text
    get information from order 2
    ```

    तुम्हाला आता टूल्सचा आयकॉन दिसेल आणि टूल कॉल करण्यासाठी विचारेल. टूल चालू ठेवण्यासाठी निवडा, तुम्हाला खालीलप्रमाणे आउटपुट दिसेल:

    ![प्रॉम्प्टचा परिणाम](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **तुम्हाला जे दिसेल ते तुमच्यासाठी सेट केलेल्या साधनांवर अवलंबून आहे, पण मुख्य मुद्दा म्हणजे तुम्हाला वरीलप्रमाणे लेखी प्रतिसाद मिळतो.**


## संदर्भ

अधिक कसे शिकू शकता ते येथे आहे:

- [Azure API Management आणि MCP वर ट्युटोरियल](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python नमुना: Azure API Management वापरून सुरक्षित रिमोट MCP सर्व्हर्स (प्रायोगिक)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP क्लायंट परवाना लॅब](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [VS Code साठी Azure API Management एक्स्टेंशन वापरून API आयात व व्यवस्थापन](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API Center मध्ये रिमोट MCP सर्व्हर नोंदणी आणि शोध](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Azure API Management सह अनेक AI क्षमता दाखवणारे उत्कृष्ट रेपो
- [AI Gateway कार्यशाळा](https://azure-samples.github.io/AI-Gateway/) Azure पोर्टल वापरून कार्यशाळांचा समावेश, AI क्षमता तपासण्यास उत्तम मार्ग.

## पुढे काय

- मागे जा: [केस स्टडीजचा सारांश](./README.md)
- पुढे: [Azure AI ट्रॅव्हल एजंट्स](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**इशारा**:
हा दस्तऐवज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित करण्यात आला आहे. आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात ठेवा की स्वयंचलित अनुवादांमध्ये चुका किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या स्थानिक भाषेमध्ये अधिकृत स्रोत मानला गेला पाहिजे. महत्त्वाच्या माहितीसाठी व्यावसायिक मानवी अनुवादाची शिफारस केली जाते. या अनुवादाच्या वापरामुळे होणाऱ्या कोणत्याही गैरसमजुतीसाठी किंवा चुकीच्या अर्थसाधनेसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->