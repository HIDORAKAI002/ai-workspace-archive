> [अप्रचलित: 2026-07-28 रिलीज़ कैंडिडेट](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# मॉडल कॉन्टेक्स्ट प्रोटोकॉल में सैम्पलिंग

> **अप्रचलित नोटिस:** `2026-07-28` MCP विनिर्देशन रिलीज़ कैंडिडेट सीधे LLM प्रदाता API के साथ एकीकरण के पक्ष में सैम्पलिंग को अप्रचलित घोषित करता है। सैम्पलिंग `2025-11-25` में काम करता रहता है और किसी भी औपचारिक अप्रचलन के बाद कम से कम एक साल तक वैध रहेगा, इसलिए इस पाठ में सब कुछ मान्य रहता है - लेकिन नए सर्वर डिज़ाइनों को प्रतिस्थापन पैटर्न का मूल्यांकन करना चाहिए। देखें [MCP में क्या बदल रहा है: 2026-07-28 रिलीज़ कैंडिडेट](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)।

सैम्पलिंग एक शक्तिशाली MCP सुविधा है जो सर्वरों को क्लाइंट के माध्यम से LLM पूर्णांक अनुरोध करने की अनुमति देती है, जिससे परिष्कृत एजेन्ट विधियों के साथ सुरक्षा और गोपनीयता बनी रहती है। सही सैम्पलिंग विन्यास प्रतिक्रिया की गुणवत्ता और प्रदर्शन में नाटकीय सुधार कर सकता है। MCP एक मानकीकृत तरीका प्रदान करता है जिससे मॉडल विशिष्ट मापदंडों के साथ टेक्स्ट उत्पन्न करता है जो यादृच्छिकता, रचनात्मकता, और संगति को प्रभावित करते हैं।

## परिचय

इस पाठ में, हम MCP अनुरोधों में सैम्पलिंग मापदंडों को कैसे विन्यस्त किया जाता है और सैम्पलिंग के अंतर्निहित प्रोटोकॉल यांत्रिकी को समझेंगे।

## सीखने के उद्देश्य

इस पाठ के अंत तक, आप सक्षम होंगे:

- MCP में उपलब्ध प्रमुख सैम्पलिंग मापदंडों को समझना।
- विभिन्न उपयोग मामलों के लिए सैम्पलिंग मापदंडों को विन्यस्त करना।
- पुनरुत्पादनीय परिणामों के लिए निर्धारक सैम्पलिंग को लागू करना।
- संदर्भ और उपयोगकर्ता प्राथमिकताओं के आधार पर सैम्पलिंग मापदंडों को गतिशील रूप से समायोजित करना।
- विभिन्न परिदृश्यों में मॉडल प्रदर्शन बढ़ाने के लिए सैम्पलिंग रणनीतियों को लागू करना।
- MCP के क्लाइंट-सर्वर प्रवाह में सैम्पलिंग कैसे काम करता है यह समझना।

## MCP में सैम्पलिंग कैसे काम करता है

MCP में सैम्पलिंग प्रवाह ये चरण अनुसरण करता है:

1. सर्वर `sampling/createMessage` अनुरोध क्लाइंट को भेजता है
2. क्लाइंट अनुरोध की समीक्षा करता है और इसे संशोधित कर सकता है
3. क्लाइंट LLM से सैम्पल करता है
4. क्लाइंट पूर्णांक की समीक्षा करता है
5. क्लाइंट परिणाम सर्वर को लौटाता है

यह मानव-इन-द-लूप डिज़ाइन सुनिश्चित करता है कि उपयोगकर्ता नियंत्रण में रहें कि LLM क्या देखता है और बनाता है।

## सैम्पलिंग मापदंडों का अवलोकन

MCP निम्न सैम्पलिंग मापदंड परिभाषित करता है जिन्हें क्लाइंट अनुरोधों में विन्यस्त किया जा सकता है:

| मापदंड | विवरण | सामान्य सीमा |
|-----------|-------------|---------------|
| `temperature` | टोकन चयन में यादृच्छिकता को नियंत्रित करता है | 0.0 - 1.0 |
| `maxTokens` | उत्पन्न करने के लिए अधिकतम टोकन की संख्या | पूर्णांक मान |
| `stopSequences` | कस्टम अनुक्रम जो पूर्णांक को रोकते हैं जब पाए जाते हैं | स्ट्रिंग्स की सूची |
| `metadata` | अतिरिक्त प्रदाता-विशिष्ट मापदंड | JSON वस्तु |

कई LLM प्रदाता `metadata` फ़ील्ड के माध्यम से अतिरिक्त मापदंडों का समर्थन करते हैं, जिनमें शामिल हो सकते हैं:

| सामान्य विस्तार मापदंड | विवरण | सामान्य सीमा |
|-----------|-------------|---------------|
| `top_p` | नाभिकीय सैम्पलिंग - टोकन को शीर्ष संचयी संभावना तक सीमित करता है | 0.0 - 1.0 |
| `top_k` | टोकन चयन को शीर्ष K विकल्पों तक सीमित करता है | 1 - 100 |
| `presence_penalty` | अब तक के टेक्स्ट में उनकी उपस्थिति के आधार पर टोकनों को दंडित करता है | -2.0 - 2.0 |
| `frequency_penalty` | अब तक के टेक्स्ट में उनकी आवृत्ति के आधार पर टोकनों को दंडित करता है | -2.0 - 2.0 |
| `seed` | पुनरुत्पादनीय परिणामों के लिए विशिष्ट यादृच्छिक बीज | पूर्णांक मान |

## उदाहरण अनुरोध प्रारूप

यहाँ MCP में क्लाइंट से सैम्पलिंग अनुरोध का एक उदाहरण है:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## प्रतिक्रिया प्रारूप

क्लाइंट एक पूर्णांक परिणाम लौटाता है:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## लूप में मानव नियंत्रण

MCP सैम्पलिंग मानव पर्यवेक्षण के साथ डिज़ाइन किया गया है:

- **प्रॉम्प्ट्स के लिए**:
  - क्लाइंट को प्रस्तावित प्रॉम्प्ट उपयोगकर्ताओं को दिखाना चाहिए
  - उपयोगकर्ता प्रॉम्प्ट को संशोधित या अस्वीकार कर सकें
  - सिस्टम प्रॉम्प्ट्स को फ़िल्टर या संशोधित किया जा सकता है
  - संदर्भ समावेशन क्लाइंट द्वारा नियंत्रित होता है

- **पूर्णांक के लिए**:
  - क्लाइंट को उपयोगकर्ताओं को पूर्णांक दिखाना चाहिए
  - उपयोगकर्ता पूर्णांक को संशोधित या अस्वीकार कर सकें
  - क्लाइंट पूर्णांक को फ़िल्टर या संशोधित कर सकते हैं
  - उपयोगकर्ता नियंत्रित करते हैं कि कौन सा मॉडल उपयोग किया जाता है

इन सिद्धांतों को ध्यान में रखते हुए, आइए देखें कि कैसे विभिन्न प्रोग्रामिंग भाषाओं में सैम्पलिंग को लागू किया जाए, विशेष रूप से उन मापदंडों पर ध्यान केंद्रित करते हुए जो आमतौर पर LLM प्रदाताओं द्वारा समर्थित हैं।

## सुरक्षा विचार

MCP में सैम्पलिंग लागू करते समय इन सुरक्षा सर्वोत्तम प्रथाओं पर विचार करें:

- **सभी संदेश सामग्री का सत्यापन करें** इसे क्लाइंट को भेजने से पहले
- **संवेदनशील जानकारी को साफ़ करें** प्रॉम्प्ट्स और पूर्णांक से
- **दुरुपयोग रोकने के लिए दर सीमाएं लागू करें**
- **असामान्य पैटर्न के लिए सैम्पलिंग उपयोग की निगरानी करें**
- **सुरक्षित प्रोटोकॉल का उपयोग कर डेटाट्रांसिट एन्क्रिप्ट करें**
- **संबंधित नियमों के अनुसार उपयोगकर्ता डेटा गोपनीयता को संभालें**
- **अनुपालन और सुरक्षा के लिए सैम्पलिंग अनुरोधों का ऑडिट करें**
- **उचित सीमाओं के साथ लागत जोखिम को नियंत्रित करें**
- **सैम्पलिंग अनुरोधों के लिए टाइमआउट लागू करें**
- **मॉडल त्रुटियों को उपयुक्त फॉलबैक के साथ संभालें**

सैम्पलिंग मापदंड भाषा मॉडलों के व्यवहार को ठीक से समायोजित करने की अनुमति देते हैं ताकि निर्धारक और रचनात्मक आउटपुट के बीच संतुलन प्राप्त किया जा सके।

आइए देखें कि इन मापदंडों को विभिन्न प्रोग्रामिंग भाषाओं में कैसे विन्यस्त किया जाए।

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

उपरोक्त कोड में हमने:

- विशिष्ट सर्वर URL के साथ एक MCP क्लाइंट बनाया।
- `temperature`, `top_p`, और `top_k` जैसे सैम्पलिंग मापदंडों के साथ एक अनुरोध विन्यस्त किया।
- अनुरोध भेजा और उत्पन्न टेक्स्ट प्रिंट किया।
- उपयोग किया:
    - `allowedTools` यह निर्दिष्ट करने के लिए कि मॉडल जनरेशन के दौरान किन टूल्स का उपयोग कर सकता है। इस मामले में, हमने रचनात्मक ऐप विचारों को उत्पन्न करने के लिए `ideaGenerator` और `marketAnalyzer` टूल्स की अनुमति दी।
    - `frequencyPenalty` और `presencePenalty` आउटपुट में 반복 और विविधता को नियंत्रित करने के लिए।
    - `temperature` आउटपुट की यादृच्छिकता को नियंत्रित करने के लिए, जहाँ उच्चतर मान अधिक रचनात्मक प्रतिक्रियाओं की ओर ले जाते हैं।
    - `top_p` टोकन चयन को शीर्ष संचयी संभावना द्रव्यमान में योगदान करने वाले टोकनों तक सीमित करने के लिए, जिससे उत्पन्न टेक्स्ट की गुणवत्ता बढ़ती है।
    - `top_k` मॉडल को शीर्ष K सबसे संभावित टोकनों तक सीमित करने के लिए, जो अधिक संगत प्रतिक्रियाएँ उत्पन्न करने में मदद कर सकता है।
    - `frequencyPenalty` और `presencePenalty` उत्पन्न टेक्स्ट में पुनरावृत्ति कम करने और विविधता को प्रोत्साहित करने के लिए।

# [JavaScript](#tab/javascript)

```javascript
// JavaScript उदाहरण: तापमान और टॉप-P सैम्पलिंग कॉन्फ़िगरेशन
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP क्लाइंट को प्रारंभ करें
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // विभिन्न सैम्पलिंग पैरामीटर्स के साथ अनुरोध कॉन्फ़िगर करें
  const creativeSampling = {
    temperature: 0.9,    // अधिक तापमान = अधिक यादृच्छिकता/रचनात्मकता
    topP: 0.92,          // टॉप 92% संभावना द्रव्यमान वाले टोकन पर विचार करें
    frequencyPenalty: 0.6, // टोकन अनुक्रमों की पुनरावृत्ति कम करें
    presencePenalty: 0.4   // उन टोकनों को दंडित करें जो अब तक टेक्स्ट में प्रकट हुए हैं
  };
  
  const factualSampling = {
    temperature: 0.2,    // कम तापमान = अधिक निश्चित/तथ्यात्मक
    topP: 0.85,          // थोड़ा अधिक केंद्रित टोकन चयन
    frequencyPenalty: 0.2, // न्यूनतम पुनरावृत्ति दंड
    presencePenalty: 0.1   // न्यूनतम उपस्थिति दंड
  };
  
  try {
    // विभिन्न सैम्पलिंग कॉन्फ़िगरेशनों के साथ दो अनुरोध भेजें
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

उपरोक्त कोड में हमने:

- सर्वर URL और API कुंजी के साथ एक MCP क्लाइंट इनिशियलाइज़ किया।
- दो सेट के सैम्पलिंग मापदंड विन्यस्त किए: एक रचनात्मक कार्यों के लिए और दूसरा तथ्यात्मक कार्यों के लिए।
- इन विन्यासों के साथ अनुरोध भेजे, जिससे मॉडल को प्रत्येक कार्य के लिए विशिष्ट टूल्स का उपयोग करने की अनुमति दी गई।
- उत्पन्न प्रतिक्रियाएँ प्रिंट कीं ताकि विभिन्न सैम्पलिंग मापदंडों के प्रभाव दर्शाए जा सकें।
- `allowedTools` का उपयोग किया यह निर्दिष्ट करने के लिए कि मॉडल जनरेशन के दौरान किन टूल्स का उपयोग कर सकता है। इस मामले में, हमने रचनात्मक कार्यों के लिए `ideaGenerator` और `environmentalImpactTool` तथा तथ्यात्मक कार्यों के लिए `factChecker` और `dataAnalysisTool` की अनुमति दी।
- आउटपुट की यादृच्छिकता को नियंत्रित करने के लिए `temperature` का उपयोग किया, जहाँ उच्च मूल्य अधिक रचनात्मक प्रतिक्रियाओं की ओर ले जाता है।
- `top_p` का उपयोग टोकन चयन को शीर्ष संचयी संभावना द्रव्यमान में योगदान करने वाले टोकनों तक सीमित करने के लिए किया, जिससे उत्पन्न टेक्स्ट की गुणवत्ता बढ़ी।
- आउटपुट में पुनरावृत्ति कम करने और विविधता प्रोत्साहित करने के लिए `frequencyPenalty` और `presencePenalty` का उपयोग किया।
- मॉडल को शीर्ष K सबसे संभावित टोकनों तक सीमित करने के लिए `top_k` का उपयोग किया, जिससे अधिक संगत प्रतिक्रियाएँ उत्पन्न करने में मदद मिली।

---

## निर्धारक सैम्पलिंग

ऐसे अनुप्रयोगों के लिए जो सुसंगत आउटपुट की आवश्यकता रखते हैं, निर्धारक सैम्पलिंग पुनरुत्पादनीय परिणाम सुनिश्चित करता है। यह एक निश्चित यादृच्छिक बीज का उपयोग कर और तापमान को शून्य पर सेट करके करता है।

नीचे दिए गए नमूना कार्यान्वयन पर विचार करें जो विभिन्न प्रोग्रामिंग भाषाओं में निर्धारक सैम्पलिंग को प्रदर्शित करता है।

# [Java](#tab/java)

```java
// जावा उदाहरण: निश्चित बीज के साथ निर्धारक प्रतिक्रियाएं
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // निर्धारक परिणामों के लिए एक निश्चित बीज का उपयोग करना
        
        // निश्चित बीज के साथ पहली अनुरोध
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // अधिकतम निर्धारण के लिए शून्य तापमान
            .build();
            
        // उसी बीज के साथ दूसरी अनुरोध
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // दोनों अनुरोध निष्पादित करें
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // प्रतिक्रियाएं समान बीज और तापमान=0 के कारण समान होनी चाहिए
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

उपरोक्त कोड में हमने:

- निर्दिष्ट सर्वर URL के साथ एक MCP क्लाइंट बनाया।
- समान प्रॉम्प्ट, निश्चित बीज, और शून्य तापमान के साथ दो अनुरोध विन्यस्त किए।
- दोनों अनुरोध भेजे और उत्पन्न टेक्स्ट प्रिंट किया।
- यह प्रदर्शित किया कि प्रतिक्रिया समान हैं क्योंकि सैम्पलिंग विन्यास (एक ही बीज और तापमान) का निर्धारक स्वभाव है।
- `setSeed` का उपयोग निश्चित यादृच्छिक बीज निर्दिष्ट करने के लिए किया, जिससे मॉडल हर बार समान इनपुट के लिए समान आउटपुट उत्पन्न करता है।
- अधिकतम निर्धारण सुनिश्चित करने के लिए `temperature` को शून्य पर सेट किया, अर्थात मॉडल हमेशा सबसे संभावित अगला टोकन यादृच्छिकता के बिना चुनेगा।

# [JavaScript](#tab/javascript-deterministic)

```javascript
// जावास्क्रिप्ट उदाहरण: बीज नियंत्रण के साथ निर्धारक प्रतिक्रियाएँ
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // निश्चित बीज के साथ पहली अनुरोध
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // अधिकतम निर्धारकता के लिए शून्य तापमान
    });
    
    // दूसरी अनुरोध वही बीज और तापमान के साथ
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // तीसरी अनुरोध अलग बीज लेकिन समान तापमान के साथ
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

उपरोक्त कोड में हमने:

- सर्वर URL के साथ एक MCP क्लाइंट इनिशियलाइज़ किया।
- समान प्रॉम्प्ट, निश्चित बीज, और शून्य तापमान के साथ दो अनुरोध विन्यस्त किए।
- दोनों अनुरोध भेजे और उत्पन्न टेक्स्ट प्रिंट किया।
- यह प्रदर्शित किया कि प्रतिक्रिया समान हैं क्योंकि सैम्पलिंग विन्यास (एक ही बीज और तापमान) का निर्धारक स्वभाव है।
- `seed` का उपयोग निश्चित यादृच्छिक बीज निर्दिष्ट करने के लिए किया, जिससे मॉडल हर बार समान इनपुट के लिए समान आउटपुट उत्पन्न करता है।
- अधिकतम निर्धारण सुनिश्चित करने के लिए `temperature` को शून्य पर सेट किया, अर्थात मॉडल हमेशा सबसे संभावित अगला टोकन यादृच्छिकता के बिना चुनेगा।
- तीसरे अनुरोध के लिए अलग बीज का उपयोग किया यह दिखाने के लिए कि बीज बदलने पर विभिन्न आउटपुट होते हैं, भले ही प्रॉम्प्ट और तापमान समान हों।

---

## गतिशील सैम्पलिंग विन्यास

बुद्धिमान सैम्पलिंग संदर्भ और प्रत्येक अनुरोध की आवश्यकताओं के आधार पर मापदंडों को समायोजित करता है। इसका मतलब है कार्य प्रकार, उपयोगकर्ता प्राथमिकताओं, या ऐतिहासिक प्रदर्शन के आधार पर तापमान, top_p, और दंडों को गतिशील रूप से समायोजित करना।

आइए देखें कि विभिन्न प्रोग्रामिंग भाषाओं में गतिशील सैम्पलिंग को कैसे लागू किया जा सकता है।

# [Python](#tab/python)

```python
# पायथन उदाहरण: अनुरोध संदर्भ के आधार पर गतिशील सैम्पलिंग
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # विभिन्न कार्य प्रकारों के लिए सैम्पलिंग प्रीसेट्स परिभाषित करें
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # बेस प्रीसेट चुनें
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # यदि प्रदान किया गया हो तो उपयोगकर्ता की प्राथमिकताओं के आधार पर समायोजित करें
        if user_preferences:
            if "creativity_level" in user_preferences:
                # रचनात्मकता की प्राथमिकता (1-10) के आधार पर तापमान को समायोजित करें
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # इच्छित प्रतिक्रिया विविधता के आधार पर top_p समायोजित करें
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # कस्टम सैम्पलिंग पैरामीटर के साथ अनुरोध बनाएं और भेजें
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # पारदर्शिता के लिए सैम्पलिंग मेटाडेटा के साथ प्रतिक्रिया लौटाएं
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

उपरोक्त कोड में हमने:

- एक `DynamicSamplingService` क्लास बनाया जो अनुकूली सैम्पलिंग का प्रबंधन करता है।
- विभिन्न कार्य प्रकारों (रचनात्मक, तथ्यात्मक, कोड, विश्लेषणात्मक) के लिए सैम्पलिंग प्रीसेट परिभाषित किए।
- कार्य प्रकार के आधार पर एक आधार सैम्पलिंग प्रीसेट चुना।
- उपयोगकर्ता प्राथमिकताओं जैसे रचनात्मकता स्तर और विविधता के आधार पर सैम्पलिंग मापदंड समायोजित किए।
- विन्यस्त सैम्पलिंग मापदंडों के साथ अनुरोध भेजा।
- उत्पन्न टेक्स्ट को पारदर्शिता के लिए लागू सैम्पलिंग मापदंडों और कार्य प्रकार के साथ लौटाया।
- आउटपुट की यादृच्छिकता को नियंत्रित करने के लिए `temperature` का उपयोग किया, जहाँ उच्चतर मान अधिक रचनात्मक प्रतिक्रियाओं की ओर ले जाते हैं।
- `top_p` टोकन चयन को शीर्ष संचयी संभावना द्रव्यमान में योगदान करने वाले टोकनों तक सीमित करने के लिए प्रयोग किया, जिससे उत्पन्न टेक्स्ट की गुणवत्ता बढ़ती है।
- आउटपुट में पुनरावृत्ति कम करने और विविधता प्रोत्साहित करने के लिए `frequency_penalty` का प्रयोग किया।
- उपयोगकर्ता-परिभाषित रचनात्मकता और विविधता स्तर के आधार पर सैम्पलिंग मापदंडों को अनुकूलित करने के लिए `user_preferences` का उपयोग किया।
- अनुरोध के लिए उपयुक्त सैम्पलिंग रणनीति निर्धारित करने के लिए `task_type` का उपयोग किया, जिससे कार्य की प्रकृति के आधार पर अधिक अनुकूल प्रतिक्रियाएँ मिल सकें।
- विन्यस्त सैम्पलिंग मापदंडों के साथ प्रॉम्प्ट भेजने के लिए `send_request` विधि का उपयोग किया, यह सुनिश्चित करते हुए कि मॉडल निर्दिष्ट आवश्यकताओं के अनुसार टेक्स्ट उत्पन्न करे।
- मॉडल की प्रतिक्रिया पुनः प्राप्त करने के लिए `generated_text` का उपयोग किया, जिसे सैम्पलिंग मापदंडों और कार्य प्रकार के साथ आगे विश्लेषण या प्रदर्शन के लिए लौटाया गया।
- उपयोगकर्ता प्राथमिकताओं को मान्य सीमाओं के भीतर दबाने के लिए `min` और `max` फ़ंक्शन का उपयोग किया, जिससे अमान्य सैम्पलिंग विन्यास रोका गया।

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript उदाहरण: उपयोगकर्ता संदर्भ के आधार पर गतिशील सैम्पलिंग कॉन्फ़िगरेशन
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // बेस सैम्पलिंग प्रोफाइल परिभाषित करें
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ऐतिहासिक प्रदर्शन ट्रैक करें
    this.performanceHistory = [];
  }
  
  // प्रॉम्प्ट से कार्य प्रकार का पता लगाएं
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // सरल ह्यूरिस्टिक पहचान - इसे ML वर्गीकरण के साथ बढ़ाया जा सकता है
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // यदि कोई स्पष्ट प्रकार नहीं है तो डिफ़ॉल्ट रूप से वार्तालापात्मक करें
    return 'conversational';
  }
  
  // संदर्भ और उपयोगकर्ता प्राथमिकताओं के आधार पर सैम्पलिंग पैरामीटर गणना करें
  getSamplingParameters(prompt, context = {}) {
    // कार्य के प्रकार का पता लगाएं
    const taskType = this.detectTaskType(prompt, context);
    
    // बेस प्रोफाइल प्राप्त करें
    let params = {...this.samplingProfiles[taskType]};
    
    // उपयोगकर्ता प्राथमिकताओं के आधार पर समायोजित करें
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 से उपयुक्त तापमान सीमा में स्केल करें
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // उच्च सटीकता का मतलब कम टॉपP (अधिक केंद्रित चयन)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // उच्च स्थिरता का मतलब कम दंड
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // प्रदर्शन इतिहास से सीखे गए समायोजन लागू करें
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // सरल अनुकूली तर्क - इसे और अधिक उन्नत एल्गोरिदम के साथ बढ़ाया जा सकता है
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // केवल हालिया इतिहास पर विचार करें
    
    if (relevantHistory.length > 0) {
      // औसत प्रदर्शन स्कोर गणना करें
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // यदि प्रदर्शन थ्रेशोल्ड से नीचे है, तो पैरामीटर समायोजित करें
      if (avgScore < 0.7) {
        // सुरक्षित मानों की ओर मामूली समायोजन
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // भविष्य के समायोजन के लिए प्रदर्शन रिकॉर्ड करें
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // प्रतिक्रिया गुणवत्ता का 0-1 रेटिंग
    });
    
    // इतिहास आकार सीमित करें
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // अनुकूलित सैम्पलिंग पैरामीटर प्राप्त करें
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // अनुकूलित पैरामीटर के साथ अनुरोध भेजें
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // यदि उपयोगकर्ता प्रतिक्रिया प्रदान करता है, तो भविष्य के अनुकूलन के लिए इसे रिकॉर्ड करें
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// उदाहरण उपयोग
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // कस्टम उपयोगकर्ता प्राथमिकताओं के साथ रचनात्मक कार्य
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // उच्च रचनात्मकता (1-10)
          consistency: 3  // कम स्थिरता (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // कोड जनरेशन कार्य
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // कम रचनात्मकता
          precision: 8,   // उच्च सटीकता
          consistency: 9  // उच्च स्थिरता
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

उपरोक्त कोड में हमने:

- एक `AdaptiveSamplingManager` क्लास बनाया जो कार्य प्रकार और उपयोगकर्ता प्राथमिकताओं के आधार पर गतिशील सैम्पलिंग का प्रबंधन करता है।
- विभिन्न कार्य प्रकारों (रचनात्मक, तथ्यात्मक, कोड, संवादात्मक) के लिए सैम्पलिंग प्रोफाइल परिभाषित किए।
- सरल हीयूरिस्टिक्स का उपयोग करके प्रॉम्प्ट से कार्य प्रकार पता लगाने की विधि लागू की।
- पता लगाए गए कार्य प्रकार और उपयोगकर्ता प्राथमिकताओं के आधार पर सैम्पलिंग मापदंडों की गणना की।
- ऐतिहासिक प्रदर्शन के आधार पर सैम्पलिंग मापदंडों को अनुकूलित करने के लिए सीखे हुए समायोजन लागू किए।
- भविष्य के समायोजनों के लिए प्रदर्शन रिकॉर्ड किया, जिससे प्रणाली पिछले इंटरैक्शन से सीख सके।
- गतिशील रूप से विन्यस्त सैम्पलिंग मापदंडों के साथ अनुरोध भेजे और लागू मापदंडों और पता लगाए गए कार्य प्रकार के साथ उत्पन्न टेक्स्ट लौटाया।
- उपयोग किया:
    - `userPreferences` उपयोगकर्ता-परिभाषित रचनात्मकता, सटीकता, और स्थिरता स्तरों के आधार पर सैम्पलिंग मापदंडों को कस्टमाइज़ करने की अनुमति देने के लिए।
    - `detectTaskType` प्रॉम्प्ट के आधार पर कार्य की प्रकृति निर्धारित करने के लिए, जिससे अधिक अनुकूल प्रतिक्रियाएँ मिल सकें।
    - `recordPerformance` उत्पन्न प्रतिक्रियाओं के प्रदर्शन को लॉग करने के लिए, जिससे प्रणाली समय के साथ अनुकूलित और सुधर सके।
    - `applyLearnedAdjustments` ऐतिहासिक प्रदर्शन के आधार पर सैम्पलिंग मापदंडों को संशोधित करने के लिए, मॉडल की उच्च गुणवत्ता वाली प्रतिक्रियाएँ उत्पन्न करने की क्षमता बढ़ाने के लिए।
    - `generateResponse` अनुकूली सैम्पलिंग के साथ प्रतिक्रिया उत्पन्न करने की पूरी प्रक्रिया को संक्षेप में प्रस्तुत करने के लिए, जिससे विभिन्न प्रॉम्प्ट और संदर्भों के साथ इसे कॉल करना आसान हो।
    - `allowedTools` यह निर्दिष्ट करने के लिए कि मॉडल जनरेशन के दौरान किन उपकरणों का उपयोग कर सकता है, जिससे अधिक संदर्भ-संज्ञानी प्रतिक्रियाएँ मिलें।
    - `feedbackScore` उपयोगकर्ताओं को उत्पन्न प्रतिक्रिया की गुणवत्ता पर प्रतिक्रिया प्रदान करने की अनुमति देने के लिए, जिसे समय के साथ मॉडल प्रदर्शन को और परिष्कृत करने के लिए उपयोग किया जा सकता है।
    - `performanceHistory` पिछले इंटरैक्शन का रिकॉर्ड बनाए रखने के लिए, जिससे प्रणाली पिछली सफलताओं और असफलताओं से सीख सके।
    - `getSamplingParameters` अनुरोध के संदर्भ के आधार पर सैम्पलिंग मापदंडों को गतिशील रूप से समायोजित करने के लिए, जिससे अधिक लचीला और उत्तरदायी मॉडल व्यवहार प्राप्त हो।
    - `detectTaskType` प्रॉम्प्ट के आधार पर कार्य वर्गीकरण करने के लिए, जिससे विभिन्न प्रकार के अनुरोधों के लिए उपयुक्त सैम्पलिंग रणनीतियाँ लागू की जा सकें।
    - `samplingProfiles` विभिन्न कार्य प्रकारों के लिए आधार सैम्पलिंग विन्यास परिभाषित करने के लिए, जिससे अनुरोध की प्रकृति के आधार पर त्वरित समायोजन संभव हो।

---

## आगे क्या है

- [5.7 स्केलिंग](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->