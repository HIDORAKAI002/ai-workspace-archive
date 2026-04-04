# केस स्टडी: MCP सर्वर के रूप में API प्रबंध में REST API को एक्सपोज़ करें

Azure API Management, एक सेवा है जो आपके API एंडपॉइंट्स के ऊपर एक गेटवे प्रदान करती है। इसका काम इस प्रकार है कि Azure API Management आपके APIs के सामने एक प्रॉक्सी की तरह कार्य करता है और इनकमिंग अनुरोधों के साथ क्या करना है, यह तय कर सकता है।

इसे उपयोग करके, आप निम्नलिखित कई फीचर्स जोड़ते हैं:

- **सुरक्षा**, आप API keys, JWT से लेकर managed identity तक सब कुछ उपयोग कर सकते हैं।
- **रेट लिमिटिंग**, एक शानदार फीचर यह है कि आप तय कर सकते हैं कि किसी निश्चित समय इकाई में कितनी कॉल्स गुजर सकती हैं। इससे यह सुनिश्चित होता है कि सभी उपयोगकर्ताओं को बेहतरीन अनुभव मिले और आपकी सेवा अनुरोधों से अभिभूत न हो।
- **स्केलिंग और लोड बैलेंसिंग**। आप कई एंडपॉइंट्स सेट कर सकते हैं ताकि लोड को संतुलित किया जा सके और आप यह भी तय कर सकते हैं कि "लोड बैलेंसिंग" कैसे हो।
- **AI फीचर्स जैसे सेमांटिक कैशिंग**, टोकन लिमिट और टोकन मॉनिटरिंग और भी बहुत कुछ। ये शानदार फीचर्स प्रतिक्रिया क्षमता को बेहतर बनाते हैं और आपकी टोकन खर्च पर नजर रखने में मदद करते हैं। [अधिक पढ़ें यहाँ](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)। 

## MCP + Azure API Management क्यों?

Model Context Protocol तेजी से एजेंटिक AI ऐप्स के लिए एक मानक बनता जा रहा है और टूल्स तथा डेटा को संगत तरीके से एक्सपोज़ करने का तरीका है। जब आपको APIs "प्रबंधित" करने की जरूरत होती है तो Azure API Management स्वाभाविक विकल्प है। MCP सर्वर अक्सर अनुरोधों को किसी टूल के लिए हल करने हेतु अन्य APIs के साथ इंटीग्रेट होते हैं। इसलिए Azure API Management और MCP को संयोजित करना बहुत समझदारी है।

## अवलोकन

इस विशिष्ट उपयोग मामले में हम सीखेंगे कि API एंडपॉइंट्स को MCP सर्वर के रूप में कैसे एक्सपोज़ करें। ऐसा करके, हम इन एंडपॉइंट्स को एजेंटिक ऐप का हिस्सा आसानी से बना सकते हैं साथ ही Azure API Management के फीचर्स का लाभ उठा सकते हैं।

## मुख्य फीचर्स

- आप उन एंडपॉइंट मेथड्स का चयन करते हैं जिन्हें आप टूल्स के रूप में एक्सपोज़ करना चाहते हैं।
- अतिरिक्त फीचर्स इस बात पर निर्भर करते हैं कि आप अपने API के लिए नीति अनुभाग में क्या कॉन्फ़िगर करते हैं। लेकिन यहाँ हम दिखाएंगे कि कैसे आप रेट लिमिटिंग जोड़ सकते हैं।

## पूर्व-चरण: API आयात करें

यदि आपके पास पहले से Azure API Management में एक API है तो बढ़िया, आप इस कदम को छोड़ सकते हैं। यदि नहीं, तो इस लिंक को देखें, [Azure API Management में API आयात करना](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)।

## MCP सर्वर के रूप में API को एक्सपोज़ करें

API एंडपॉइंट्स को एक्सपोज़ करने के लिए, निम्न चरणों का पालन करें:

1. Azure पोर्टल पर जाएं और इस पते पर जाएं <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
अपने API Management उदाहरण पर नेविगेट करें।

1. बाईं मेनू में, APIs > MCP Servers > + Create new MCP Server चुनें।

1. API में, MCP सर्वर के रूप में एक्सपोज़ करने के लिए एक REST API चुनें।

1. एक या अधिक API ऑपरेशन चुनें जिन्हें टूल्स के रूप में एक्सपोज़ करना है। आप सभी ऑपरेशंस या केवल कुछ विशेष ऑपरेशंस चुन सकते हैं।

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. **Create** चुनें।

1. मेनू विकल्प **APIs** और **MCP Servers** पर नेविगेट करें, आपको निम्न दिखना चाहिए:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP सर्वर बनाया गया है और API ऑपरेशन टूल्स के रूप में एक्सपोज़ किए गए हैं। MCP सर्वर MCP Servers पेन में सूचीबद्ध है। URL कॉलम MCP सर्वर का एंडपॉइंट दिखाता है जिसे आप परीक्षण या क्लाइंट एप्लिकेशन के भीतर कॉल कर सकते हैं।

## वैकल्पिक: नीतियाँ कॉन्फ़िगर करें

Azure API Management में नीतियों का मूल विचार है जहाँ आप अपने एंडपॉइंट्स के लिए विभिन्न नियम सेट करते हैं जैसे कि रेट लिमिटिंग या सेमांटिक कैशिंग। ये नीतियाँ XML में लिखी जाती हैं।

यहाँ बताया गया है कि आप अपनी MCP सर्वर के लिए रेट लिमिटिंग नीति कैसे सेट कर सकते हैं:

1. पोर्टल में, APIs के तहत, **MCP Servers** चुनें।

1. अपने बनाए हुए MCP सर्वर का चयन करें।

1. बाएं मेनू में, MCP के तहत, **Policies** चुनें।

1. नीति संपादक में, आप उन नीतियों को जोड़ें या संपादित करें जिन्हें आप MCP सर्वर के टूल्स पर लागू करना चाहते हैं। नीतियाँ XML फॉर्मेट में परिभाषित होती हैं। उदाहरण के लिए, आप एक नीति जोड़ सकते हैं जो MCP सर्वर के टूल्स (इस उदाहरण में, हर क्लाइंट IP पते पर 30 सेकंड में 5 कॉल्स) के लिए कॉल्स को सीमित करती है। यह XML कोड रेट लिमिटिंग लागू करेगा:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    यहाँ नीति संपादक की एक छवि है:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## इसे आज़माएं

आइए सुनिश्चित करें कि हमारा MCP Server इच्छित रूप से काम कर रहा है।

इसके लिए, हम Visual Studio Code और GitHub Copilot तथा इसके एजेंट मोड का उपयोग करेंगे। हम MCP सर्वर को *mcp.json* में जोड़ेंगे। ऐसा करने से, Visual Studio Code एजेंटिक क्षमताओं के साथ एक क्लाइंट की तरह कार्य करेगा और अंतिम उपयोगकर्ता एक प्रॉम्प्ट टाइप करके उक्त सर्वर के साथ इंटरैक्ट कर सकेंगे।

देखते हैं, Visual Studio Code में MCP सर्वर जोड़ने के लिए:

1. कमांड पैलेट से MCP: **Add Server कमांड का उपयोग करें**।

1. पूछे जाने पर, सर्वर प्रकार चुनें: **HTTP (HTTP या Server Sent Events)**।

1. API Management में MCP सर्वर का URL दर्ज करें। उदाहरण: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE एंडपॉइंट के लिए) या **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP एंडपॉइंट के लिए), देखें कि ट्रांसपोर्ट में फर्क `/sse` या `/mcp` है।

1. अपनी पसंद का सर्वर ID दर्ज करें। यह कोई महत्वपूर्ण मान नहीं है लेकिन आपको याद रखने में मदद करेगा कि यह सर्वर उदाहरण क्या है।

1. तय करें कि आप कॉन्फ़िगरेशन को अपने वर्कस्पेस सेटिंग्स या यूजर सेटिंग्स में सेव करना चाहते हैं।

  - **वर्कस्पेस सेटिंग्स** - सर्वर कॉन्फ़िगरेशन केवल वर्तमान वर्कस्पेस में उपलब्ध .vscode/mcp.json फ़ाइल में सेव होती है।

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    या यदि आप ट्रांसपोर्ट के रूप में स्ट्रीमिंग HTTP चुनते हैं तो यह थोड़ा अलग होगा:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **यूजर सेटिंग्स** - सर्वर कॉन्फिगरेशन आपके वैश्विक *settings.json* फ़ाइल में जोड़ी जाती है और सभी वर्कस्पेस में उपलब्ध होती है। कॉन्फ़िगरेशन कुछ इस तरह दिखता है:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. आपको एक हेडर भी जोड़ना होगा ताकि यह Azure API Management के लिए सही तरीके से प्रमाणित हो सके। यह एक हेडर का उपयोग करता है जिसका नाम है **Ocp-Apim-Subscription-Key**।

    - इसे सेटिंग्स में जोड़ने का तरीका यहाँ है:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), इससे एक प्रॉम्प्ट दिखाई देगा जो आपसे API key मान पूछेगा जो आप Azure Portal में अपने Azure API Management उदाहरण के लिए पा सकते हैं।

   - इसे *mcp.json* में जोड़ने के लिए, आप इसे इस तरह जोड़ सकते हैं:

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

### एजेंट मोड का उपयोग करें

अब हम सेटिंग्स में या *.vscode/mcp.json* में तैयार हैं। चलिए इसे आजमाते हैं।

ऐसा कोई टूल्स आइकन होना चाहिए जहाँ आपके सर्वर से एक्सपोज़ किए गए टूल्स सूचीबद्ध हों:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. टूल्स आइकन पर क्लिक करें और आपको टूल्स की एक सूची दिखनी चाहिए, कुछ इस प्रकार:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. टूल को कॉल करने के लिए चैट में प्रॉम्प्ट दर्ज करें। उदाहरण के लिए, यदि आपने किसी टूल को ऑर्डर के बारे में जानकारी प्राप्त करने के लिए चुना है, तो आप एजेंट से ऑर्डर के बारे में पूछ सकते हैं। यहां एक उदाहरण प्रॉम्प्ट है:

    ```text
    get information from order 2
    ```

    अब आपको एक टूल्स आइकन के साथ प्रस्तुत किया जाएगा जो आपसे टूल कॉल करने के लिए आगे बढ़ने को कहेगा। टूल चलाने के लिए चयन करें, अब आपको निम्न आउटपुट देखना चाहिए:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **आप ऊपर जो देखते हैं वह आपके द्वारा सेट अप किए गए टूल्स पर निर्भर करता है, लेकिन विचार यह है कि आपको उपरोक्त की तरह एक टेक्स्टुअल प्रतिक्रिया मिलती है।**


## संदर्भ

अधिक जानने के लिए, यहां कुछ लिंक दिए गए हैं:

- [Azure API Management और MCP पर टुटोरियल](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python नमूना: Azure API Management का उपयोग करके सुरक्षित रिमोट MCP सर्वर (प्रयोगात्मक)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP क्लाइंट प्राधिकरण लैब](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [VS कोड के लिए Azure API Management एक्सटेंशन का उपयोग करके APIs को आयात और प्रबंधित करें](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API Center में रिमोट MCP सर्वर पंजीकृत और खोजें](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) एक बेहतरीन रिपोजिटरी जो Azure API Management के साथ कई AI क्षमताएँ दिखाती है
- [AI Gateway कार्यशालाएँ](https://azure-samples.github.io/AI-Gateway/) Azure पोर्टल का उपयोग करते हुए कार्यशालाएँ, जो AI क्षमताओं का मूल्यांकन शुरू करने का एक शानदार तरीका है।

## अगला क्या है

- वापस जाएं: [केस स्टडीज ओवरव्यू](./README.md)
- अगला: [Azure AI ट्रैवल एजेंट्स](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयासरत हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्राधिकारी स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->