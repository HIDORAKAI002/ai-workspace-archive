# केस स्टडी: API व्यवस्थापनमा MCP सर्भरको रूपमा REST API खोल्नुहोस्

Azure API व्यवस्थापन, तपाईंको API अन्त्यबिन्दुहरूमाथि गेटवे प्रदान गर्ने सेवा हो। यसको काम Azure API व्यवस्थापनले तपाईंका API हरूको अगाडि प्रोक्सीको रूपमा काम गर्छ र आउने अनुरोधहरूलाई के गर्ने निर्णय गर्न सक्छ।

यसलाई प्रयोग गरेर, तपाईं धेरै सुविधाहरू थप्न सक्नुहुन्छ, जस्तै:

- **सुरक्षा**, तपाईं API कुञ्जीहरू, JWT देखि व्यवस्थापन गरिएको पहिचानसम्म सबै कुरा प्रयोग गर्न सक्नुहुन्छ।
- **दर सीमांकन**, राम्रो सुविधा भनेको कति कलहरू निश्चित समय युनिटमा अनुमति दिन सकिन्छ भन्ने निर्णय गर्न सकिनु हो। यसले सबै प्रयोगकर्ताहरूलाई राम्रो अनुभव सुनिश्चित गर्न मद्दत गर्दछ र तपाईंसँग सेवा अनुरोधहरूले थिचिएको छैन भन्ने कुरा पनि हो।
- **स्केलिङ र लोड ब्यालेन्सिङ**। तपाईं लोड सन्तुलन गर्न विभिन्न अन्त्यबिन्दुहरू सेटअप गर्न सक्नुहुन्छ र कसरी "लोड ब्यालेन्स" गर्ने निर्णय पनि गर्न सक्नुहुन्छ।
- **AI सुविधाहरू जस्तै सेम्यान्टिक क्यासिङ**, टोकन सीमा र टोकन अनुगमन तथा थप। यी उत्कृष्ट सुविधाहरूले प्रतिक्रिया क्षमता सुधार्छन् साथै तपाईंलाई टोकन खर्चमा नियन्त्रण राख्न मद्दत गर्छ। [यहाँ थप पढ्नुहोस्](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)।

## किन MCP + Azure API व्यवस्थापन?

मोडेल सन्दर्भ प्रोटोकल छिट्टै एजेन्टिक AI एपहरूको लागि मानक बन्ने क्रममा छ र उपकरण तथा डाटालाई सुसंगत तरिकाले कसरी खोल्ने भन्ने कुरा हो। Azure API व्यवस्थापन तब स्वाभाविक विकल्प हो जब तपाईंले API हरूलाई "व्यवस्थापन" गर्नुपर्ने हुन्छ। MCP सर्भरहरू प्रायः अन्य API हरूसँग एकीकरण गर्छन्, जस्तै उपकरणमा अनुरोध समाधान गर्न। त्यसैले Azure API व्यवस्थापन र MCP को संयोजन धेरै अर्थपूर्ण हुन्छ।

## सिंहावलोकन

यस विशेष प्रयोग केसमा हामी API अन्त्यबिन्दुहरूलाई MCP सर्भरको रूपमा खोल्न सिक्नेछौं। यसले गर्दा हामी यी अन्त्यबिन्दुहरूलाई एजेन्टिक एपको भाग बनाउन सजिलो हुन्छ र समानान्तरमा Azure API व्यवस्थापनका सुविधाहरूबाट पनि लाभान्वित हुन सक्छौं।

## मुख्य सुविधाहरू

- तपाईंले उपकरणहरूका रूपमा खोल्न चाहनुभएको अन्त्यबिन्दु विधिहरू चयन गर्नुहुन्छ।
- थप सुविधाहरू तपाईंले आफ्नो API को नीति खण्डमा के कन्फिगर गर्नु भयो त्यसमा निर्भर हुन्छ। यहाँ हामी तपाईंलाई कसरी दर सीमांकन थप गर्ने देखाउँछौं।

## प्रि-स्टेप: API आयात गर्नुहोस्

यदि तपाईंसँग Azure API व्यवस्थापनमा पहिले नै API छ भने राम्रो, त्यसैले तपाईं यो चरण छोड्न सक्नुहुन्छ। नभए, यो लिंक हेर्नुहोस्, [Azure API व्यवस्थापनमा API आयात गर्ने](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)।

## API लाई MCP सर्भरको रूपमा खोल्नुहोस्

API अन्त्यबिन्दुहरू खोल्न, यी चरणहरू पछ्याउनुहोस्:

1. Azure पोर्टलमा जानुहोस् र निम्न ठेगाना (<https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>) मा जानुहोस्। आफ्नो API व्यवस्थापन इन्स्ट्यान्समा जानुहोस्।

1. बाँयातर्फको मेनूमा, APIs > MCP Servers > + नयाँ MCP सर्भर सिर्जना गर्नुहोस् चयन गर्नुहोस्।

1. API मा, MCP सर्भरको रूपमा खोल्न एक REST API चयन गर्नुहोस्।

1. उपकरणहरूको रूपमा खोल्न एक वा बढी API अपरेसनहरू चयन गर्नुहोस्। तपाईले सबै अपरेसनहरू चयन गर्न सक्नुहुन्छ वा मात्र विशेष अपरेसनहरू।

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. **Create** चयन गर्नुहोस्।

1. मेनू विकल्प **APIs** र **MCP Servers** मा जानुहोस्, तपाईंले निम्न देख्नु पर्नेछ:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP सर्भर सिर्जना गरिएको छ र API अपरेसनहरू उपकरणहरूको रूपमा खोलिएको छ। MCP सर्भर MCP Servers प्यानमा सूचीबद्ध गरिएको छ। URL स्तम्भले तपाईँले परीक्षण वा क्लाइन्ट एप्लिकेशन भित्र कल गर्न सक्ने MCP सर्भरको अन्त्यबिन्दु देखाउँछन्।

## वैकल्पिक: नीतिहरू कन्फिगर गर्नुहोस्

Azure API व्यवस्थापनमा नीतिहरूको मूल अवधारणा छ जहाँ तपाईं आफ्नो अन्त्यबिन्दुहरूका लागि विभिन्न नियमहरू सेटअप गर्नुहुन्छ, जस्तै दर सीमांकन वा सेम्यान्टिक क्यासिङ। यी नीतिहरू XML मा लेखिएका छन्।

यहाँ तपाईं कसरी MCP सर्भरको दर सीमांकन नीति सेटअप गर्न सक्नुहुन्छ:

1. पोर्टलमा, APIs अन्तर्गत, **MCP Servers** चयन गर्नुहोस्।

1. तपाईंले सिर्जना गरेको MCP सर्भर चयन गर्नुहोस्।

1. बाँयातर्फको मेनूमा, MCP अन्तर्गत, **Policies** चयन गर्नुहोस्।

1. नीति सम्पादकमा, तपाईले MCP सर्भरका उपकरणहरूमा लागू गर्न चाहानुहुने नीतिहरू थप्नुहोस् वा सम्पादन गर्नुहोस्। नीतिहरू XML फारम्याटमा परिभाषित छन्। उदाहरणका लागि, तपाईंले MCP सर्भरका उपकरणहरूको कल सीमित गर्ने नीति थप्न सक्नुहुन्छ (यस उदाहरणमा, प्रत्येक क्लाइन्ट IP ठेगानाले ३० सेकेण्डमा ५ कॉल)। यस्तो XML कोड प्रयोग गर्न सकिन्छ:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    यहाँ नीति सम्पादकको छवि छ:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## प्रयास गर्नुहोस्

आउनुहोस् हाम्रो MCP सर्भर अपेक्षित रूपमा काम गरिरहेको छ कि भनेर सुनिश्चित गरौं।

यसका लागि, हामी Visual Studio Code र GitHub Copilot को Agent मोड प्रयोग गर्नेछौं। हामी MCP सर्भरलाई *mcp.json* मा थप्नेछौं। यसरी, Visual Studio Code एजेन्टिक क्षमताका साथ क्लाइन्टको रूपमा काम गर्नेछ र अन्तिम प्रयोगकर्ताहरूले प्रॉम्प्ट टाइप गरी उक्त सर्भरसँग अन्तरक्रिया गर्न सक्नेछन्।

Visual Studio Code मा MCP सर्भर थप्ने तरिका:

1. कमाण्ड प्यालेटबाट MCP: **Add Server कमाण्ड** प्रयोग गर्नुहोस्।

1. सोधिएको बेला सर्भर प्रकार चयन गर्नुहोस्: **HTTP (HTTP वा Server Sent Events)**।

1. MCP सर्भरको URL प्रविष्ट गर्नुहोस् जुन Azure API व्यवस्थापनमा छ। उदाहरण: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE अन्त्यबिन्दुका लागि) वा **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP अन्त्यबिन्दुका लागि), ध्यान दिनुहोस् कन्फिगर गरिएको यातायातमा `/sse` वा `/mcp` को भिन्नता छ।

1. तपाईँले रोजेको सर्भर ID प्रविष्ट गर्नुहोस्। यो महत्त्वपूर्ण मान होइन तर यसले तपाईँलाई कुन सर्भर इन्स्ट्यान्स हो सम्झन मद्दत गर्नेछ।

1. तपाईंले कन्फिगरेसनलाई आफ्नो कार्यक्षेत्र सेटिङहरू वा प्रयोगकर्ता सेटिङहरूमा बचत गर्न चयन गर्नुहोस्।

  - **कार्यक्षेत्र सेटिङहरू** - सर्भर कन्फिगरेसन एक .vscode/mcp.json फाइलमा मात्र बचत हुन्छ जुन हालको कार्यक्षेत्रमा उपलब्ध हुन्छ।

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    अथवा यदि तपाईंले स्ट्रिमिङ HTTP यातायात चयन गर्नुभयो भने यो थोरै फरक हुनेछ:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **प्रयोगकर्ता सेटिङहरू** - सर्भर कन्फिगरेसन तपाईँको ग्लोबल *settings.json* फाइलमा थपिन्छ र सबै कार्यक्षेत्रहरूमा उपलब्ध हुन्छ। कन्फिगरेसन यस प्रकार देखिन्छ:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. तपाईंले अथेन्टिकेसन सुनिश्चित गर्न कन्फिगरेसनमा हेडर थप्नुपर्ने हुन्छ। यसले **Ocp-Apim-Subscription-Key* नामक हेडर प्रयोग गर्छ।

    - यसलाई सेटिङहरूमा थप्ने तरिका:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), यसले API कुञ्जी मान सोध्न प्रॉम्प्ट देखाउनेछ जुन तपाईं Azure पोर्टलमा आफूले Azure API व्यवस्थापन इन्स्ट्यान्सका लागि पाउन सक्नुहुन्छ।

   - यसको सट्टा *mcp.json* मा थप्न चाहनुभयो भने यसरी थप्न सक्नुहुन्छ:

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

### एजेन्ट मोड प्रयोग गर्नुहोस्

अब हामी सेटिङहरूमा वा *.vscode/mcp.json* मा सबै तयार छौं। आउनुहोस् प्रयास गरौं।

त्यहाँ यस्तो उपकरण आइकन हुनु पर्छ जहाँ तपाईंको सर्भरबाट खुल्ला उपकरणहरू सूचीबद्ध हुन्छन्:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. उपकरण आइकनमा क्लिक गर्नुहोस् र तपाईंलाई यस प्रकार उपकरणहरूको सूची देखिनुपर्छ:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. उपकरण कल गर्न च्याटमा प्रॉम्प्ट प्रविष्ट गर्नुहोस्। उदाहरणका लागि, यदि तपाईंले अर्डर सम्बन्धी जानकारी लिन उपकरण चयन गर्नुभएको छ भने एजेन्टलाई अर्डर बारे सोध्न सक्नुहुन्छ। यहाँ एउटा उदाहरण प्रॉम्प्ट:

    ```text
    get information from order 2
    ```

    अब तपाईंलाई एक उपकरण आइकन प्रस्तुत गरिनेछ जुन उपकरण चलाउन अघि बढ्न सोध्छ। जारी राख्न चयन गर्नुस्, तपाईंले यसरी आउटपुट देख्नु पर्नेछ:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **माथि के देख्नुभएको छ, तपाईंले सेटअप गरेको उपकरणहरूमा निर्भर गर्दछ, तर उद्देश्य त्यस्तो पाठीय प्रतिक्रिया प्राप्त गर्नु हो।**


## सन्दर्भहरू

यहाँ थप सिक्ने तरिका:

- [Azure API व्यवस्थापन र MCP मा ट्यूटोरियल](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python नमूना: Azure API व्यवस्थापन प्रयोग गरेर रिमोट MCP सर्भरहरूलाई सुरक्षित गर्नु (प्रयोगात्मक)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP क्लाइन्ट प्राधिकरण प्रयोगशाला](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [VS Code का लागि Azure API व्यवस्थापन एक्सटेन्सन प्रयोग गरेर API हरू आयात र व्यवस्थापन गर्नुहोस्](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API सेन्टरमा रिमोट MCP सर्भरहरू दर्ता र पत्ता लगाउनुहोस्](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Azure API व्यवस्थापनसँग धेरै AI क्षमताहरू देखाउने उत्कृष्ट रिपो
- [AI Gateway कार्यशालाहरू](https://azure-samples.github.io/AI-Gateway/) Azure पोर्टल प्रयोग गर्ने कार्यशालाहरू, जुन AI क्षमताहरू मूल्यांकन गर्नको लागि राम्रो तरिका हो।

## के हुन्छ पछि

- फिर्ता जानुहोस्: [केस स्टडीहरू सिंहावलोकन](./README.md)
- अर्को: [Azure AI यात्रा एजेन्टहरू](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो कागजात AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी शुद्धताका लागि प्रयासरत छौं, तर कृपया ध्यान दिनुहोस् कि स्वचालित अनुवादमा त्रुटि वा अशुद्धता हुनसक्छ। मूल भाषा मा रहेको कागजातलाई प्राधिकृत स्रोत मानिनु पर्छ। महत्वपूर्ण जानकारीका लागि पेशेवर मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट हुने कुनै पनि गलतफहमी वा गलत व्याख्याका लागि हामी जिम्मेवार हौंँैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->