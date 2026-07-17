> [पुराना झाला: 2026-07-28 रिलीज उमेदवार](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# मॉडेल कॉन्टेक्स्ट प्रोटोकॉलमध्ये सॅम्पलिंग

> **पुरातन सूचना:** `2026-07-28` MCP तपशील रिलीज उमेदवार सॅम्पलिंगला थेट LLM प्रदाता API सह एकत्रीकरणाच्या बाजूने जुनाट म्हणून चिन्हांकित करतो. सॅम्पलिंग `2025-11-25` मध्ये आणि कोणत्याही औपचारिक पुरातनतेनंतर किमान एक वर्षासाठी कार्यरत राहतो, त्यामुळे या धड्यातील सर्व काही वैध आहे - परंतु नवीन सर्व्हर डिझाइन्सने बदलण्याचा नमुना तपासला पाहिजे. पाहा [MCP मध्ये काय बदलत आहे: 2026-07-28 रिलीज उमेदवार](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

सॅम्पलिंग हा एक शक्तिशाली MCP वैशिष्ट्य आहे जो सर्व्हर्सना क्लायंटद्वारे LLM पूर्णतांसाठी विनंती करण्याची परवानगी देतो, ज्यामुळे सुरक्षितता आणि गोपनीयता राखत कुशल एजंटिक वर्तन शक्य होते. योग्य सॅम्पलिंग कॉन्फिगरेशन प्रतिसाद गुणवत्ता आणि कार्यप्रदर्शन सुधारू शकते. MCP मॉडेल्सना विशिष्ट परिमाणांसह मजकूर निर्माण नियंत्रित करण्याचा एक प्रमाणित मार्ग पुरवतो, जो यादृच्छिकता, सर्जनशीलता आणि सुसंगततेवर प्रभाव टाकतो.

## परिचय

या धड्यात, आपण MCP विनंत्यांमध्ये सॅम्पलिंग परिमाणे कशी कॉन्फिगर करायची आणि सॅम्पलिंगची अंतर्निहित प्रोटोकॉल यंत्रणा समजून घेऊ.

## शिक्षण उद्दिष्टे

या धड्याच्या शेवटी, तुम्ही सक्षम असाल:

- MCP मध्ये उपलब्ध मुख्य सॅम्पलिंग परिमाणे समजून घेणे.
- विविध वापर प्रकरणांसाठी सॅम्पलिंग परिमाणे कॉन्फिगर करणे.
- पुनरुत्पादनीय निकालांसाठी निर्धार्य सॅम्पलिंग लागू करणे.
- संदर्भ आणि वापरकर्त्याच्या पसंतीनुसार सॅम्पलिंग परिमाणे गतिशीलपणे समायोजित करणे.
- विविध परिस्थितींमध्ये मॉडेल कार्यप्रदर्शन सुधारण्यासाठी सॅम्पलिंग धोरणे लागू करणे.
- MCP च्या क्लायंट-सर्व्हर प्रवाहामध्ये सॅम्पलिंग कसे कार्य करते हे समजून घेणे.

## MCP मध्ये सॅम्पलिंग कसे कार्य करते

MCP मधील सॅम्पलिंग प्रवाह हे खालील पावले अनुसरतो:

1. सर्व्हर क्लायंटला `sampling/createMessage` विनंती पाठवतो
2. क्लायंट विनंती पुनरावलोकन करतो आणि ती बदलू शकतो
3. क्लायंट LLM कडून सॅम्पलिंग करतो
4. क्लायंट पूर्णतांची पुनरावलोकन करतो
5. क्लायंट निकाल सर्व्हरकडे परत पाठवतो

हा मानव-इन-द-लूप डिझाइन वापरकर्त्यांना LLM जे पाहते आणि तयार करते यावर नियंत्रण राखण्याची खात्री देतो.

## सॅम्पलिंग परिमाणे अवलोकन

MCP खालील सॅम्पलिंग परिमाणे परिभाषित करतो जी क्लायंट विनंत्यांमध्ये कॉन्फिगर केली जाऊ शकतात:

| परिमाण | वर्णन | सामान्य श्रेणी |
|-----------|-------------|---------------|
| `temperature` | टोकन निवडमधील यादृच्छिकता नियंत्रित करते | 0.0 - 1.0 |
| `maxTokens` | निर्माण करण्यासाठी जास्तीत जास्त टोकन संख्या | पूर्णांक मूल्य |
| `stopSequences` | सानुकूल अनुक्रम जे पूर्णता थांबवतात जेव्हा ते येतात | स्ट्रिंग्जची यादी |
| `metadata` | अतिरिक्त प्रदाता-विशिष्ट परिमाणे | JSON ऑब्जेक्ट |

अनेक LLM प्रदाते `metadata` क्षेत्राद्वारे अतिरिक्त परिमाणे समर्थन देतात, ज्यामध्ये समाविष्ट असू शकतात:

| सामान्य विस्तार परिमाण | वर्णन | सामान्य श्रेणी |
|-----------|-------------|---------------|
| `top_p` | न्यूक्लियस सॅम्पलिंग - टोकन्सना शीर्ष संचित संभाव्यता पर्यंत मर्यादित करते | 0.0 - 1.0 |
| `top_k` | टोकन निवड शीर्ष K पर्यायांपर्यंत मर्यादित करते | 1 - 100 |
| `presence_penalty` | आतापर्यंत मजकुरामध्ये त्यांच्या उपस्थितीवर आधारित टोकन्सला दंडित करते | -2.0 - 2.0 |
| `frequency_penalty` | आतापर्यंत मजकुरातील त्यांचा वारंवारतेवर आधारित टोकन्सला दंडित करते | -2.0 - 2.0 |
| `seed` | पुनरुत्पादनीय निकालांसाठी विशिष्ट यादृच्छिक बीज | पूर्णांक मूल्य |

## उदाहरण विनंती स्वरूप

येथे MCP मध्ये क्लायंटकडून सॅम्पलिंगची विनंती करण्याचे उदाहरण आहे:

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

## प्रतिसाद स्वरूप

क्लायंट एक पूर्णता निकाल परत करतो:

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

## मानव-इन-द-लूप नियंत्रण

MCP सॅम्पलिंग मानवी देखरेखीच्या दृष्टीने डिझाइन केले आहे:

- **प्रॉम्प्टसाठी**:
  - क्लायंट्सना वापरकर्त्यांना प्रस्तावित प्रॉम्प्ट दाखवण्याची परवानगी आहे
  - वापरकर्ते प्रॉम्प्ट बदलू किंवा नाकारू शकतात
  - सिस्टीम प्रॉम्प्ट्स फिल्टर किंवा बदलता येतात
  - संदर्भ समावेश क्लायंट नियंत्रित करतो

- **पूर्णतांसाठी**:
  - क्लायंट्स वापरकर्त्यांना पूर्णता दाखवतात
  - वापरकर्ते पूर्णता बदलू किंवा नाकारू शकतात
  - क्लायंट्स पूर्णता फिल्टर किंवा बदलू शकतात
  - वापरकर्ता कोणते मॉडेल वापरायचे ते नियंत्रित करतो

या तत्त्वांनुसार, आपण वेगवेगळ्या प्रोग्रामिंग भाषांमध्ये सॅम्पलिंग कसे अंमलात आणायचे ते पाहू, विशेषतः LLM प्रदात्यांमध्ये सामान्यतः समर्थित परिमाणांवर लक्ष केंद्रित करून.

## सुरक्षा विचार

MCP मध्ये सॅम्पलिंग अंमलबजावणी करताना या सुरक्षा सर्वोत्तम प्रथा लक्षात ठेवा:

- सर्व संदेश सामग्रीची पुष्टी करा क्लायंटला पाठवण्यापूर्वी
- प्रॉम्प्ट्स आणि पूर्णतेमधून संवेदनशील माहिती स्वच्छ करा
- गैरवापर टाळण्यासाठी दर मर्यादा अंमलात आणा
- असामान्य नमुन्यांसाठी सॅम्पलिंग वापराचे निरीक्षण करा
- सुरक्षित प्रोटोकॉल वापरून ट्रान्झिटमधील डेटा एन्क्रिप्ट करा
- संबंधित नियमांनुसार वापरकर्त्याचा डेटा गोपनीयता हाताळा
- अनुपालन व सुरक्षा साठी सॅम्पलिंग विनंत्यांचे लेखा परीक्षण करा
- योग्य मर्यादांद्वारे खर्चाचे नियंत्रण करा
- सॅम्पलिंग विनंत्यांसाठी टाइमआउट्स लागू करा
- योग्य फॉलबॅक्ससह मॉडेल त्रुटी सौम्यपणे हाताळा

सॅम्पलिंग परिमाणे भाषा मॉडेल्सच्या वर्तनाला सूक्ष्मरित्या नियंत्रित करतात जेणेकरून निश्चित आणि सर्जनशील आउटपुट यांच्यात योग्य समतोल साधता येईल.

वेगवेगळ्या प्रोग्रामिंग भाषांमध्ये हे परिमाणे कसे कॉन्फिगर करायचे ते पाहू.

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

मागील कोडमध्ये आपण:

- विशिष्ट सर्व्हर URL सह MCP क्लायंट तयार केला आहे.
- `temperature`, `top_p`, आणि `top_k` सारख्या सॅम्पलिंग परिमाणांसह विनंती कॉन्फिगर केली आहे.
- विनंती पाठवली आणि निर्मित मजकूर प्रिंट केला.
- वापरले:
    - `allowedTools` वापरून मॉडेलला जनरेटिव्ह अ‍ॅप कल्पना निर्माण करण्यासाठी `ideaGenerator` आणि `marketAnalyzer` टूल्स वापरण्याची परवानगी दिली.
    - पुनरावृत्ती आणि विविधता नियंत्रित करण्यासाठी `frequencyPenalty` आणि `presencePenalty`.
    - आउटपुटची यादृच्छिकता नियंत्रित करण्यासाठी `temperature`, जिथे जास्त मूल्ये अधिक सर्जनशील प्रतिसादाकडे नेतात.
    - जनरेट केलेल्या मजकूराच्या गुणवत्तेसाठी टोकन्सची निवड शीर्ष संचित संभाव्यता अंतरगत मर्यादित करण्यासाठी `top_p`.
    - अधिक सुसंगत प्रतिसादांसाठी मॉडेलला शीर्ष K सर्वात संभाव्य टोकन्सपर्यंत मर्यादित करण्यासाठी `top_k`.
    - पुनरावृत्ती कमी करण्यासाठी आणि विविधता वाढवण्यासाठी `frequencyPenalty` आणि `presencePenalty`.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript उदाहरण: तापमान आणि टॉप-P सॅम्पलिंग कॉन्फिगरेशन
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP क्लायंट प्रारंभ करा
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // वेगळ्या सॅम्पलिंग पॅरामीटर्ससह विनंती कॉन्फिगर करा
  const creativeSampling = {
    temperature: 0.9,    // जास्त तापमान = अधिक यादृच्छिकता/सर्जनशीलता
    topP: 0.92,          // टॉप ९२% शक्यता मास असलेल्या टोकन्सचा विचार करा
    frequencyPenalty: 0.6, // टोकन अनुक्रमांची पुनरावृत्ती कमी करा
    presencePenalty: 0.4   // आतापर्यंत मजकुरात आलेल्या टोकन्सवर दंड लावा
  };
  
  const factualSampling = {
    temperature: 0.2,    // कमी तापमान = अधिक निश्चित/तथ्यात्मक
    topP: 0.85,          // किंचित अधिक केंद्रीकृत टोकन निवड
    frequencyPenalty: 0.2, // न्यूनतम पुनरावृत्ती दंड
    presencePenalty: 0.1   // न्यूनतम उपस्थिती दंड
  };
  
  try {
    // वेगळ्या सॅम्पलिंग कॉन्फिगरेशनसह दोन विनंत्या पाठवा
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

मागील कोडमध्ये आपण:

- सर्व्हर URL आणि API की सह MCP क्लायंट प्रारंभ केला आहे.
- दोन संच सॅम्पलिंग परिमाणांचे कॉन्फिगर केले: एक सर्जनशील कार्यांसाठी आणि दुसरा तथ्यात्मक कार्यांसाठी.
- या कॉन्फिगरेशनसह विनंत्या पाठवल्या, मॉडेलला प्रत्येक कार्यासाठी विशिष्ट टूल्स वापरण्याची परवानगी दिली.
- विविध सॅम्पलिंग परिमाणांचे प्रभाव दाखवण्यासाठी निर्मित प्रतिसाद प्रिंट केला.
- `allowedTools` वापरून मॉडेलला जनरेटिव्ह कार्यांसाठी `ideaGenerator` आणि `environmentalImpactTool`, आणि तथ्यात्मक कार्यांसाठी `factChecker` आणि `dataAnalysisTool` वापरण्याची परवानगी दिली.
- आउटपुटची यादृच्छिकता नियंत्रित करण्यासाठी `temperature`, जिथे जास्त मूल्ये अधिक सर्जनशील प्रतिसादाकडे नेतात.
- टोकन निवड शीर्ष संचित संभाव्यता पर्यंत मर्यादित करण्यासाठी `top_p`, जे जनरेट केलेल्या मजकूराची गुणवत्ता सुधारते.
- पुनरावृत्ती कमी करण्यासाठी आणि विविधता प्रोत्साहित करण्यासाठी `frequencyPenalty` आणि `presencePenalty`.
- मॉडेलला शीर्ष K सर्वात संभाव्य टोकन्सपर्यंत मर्यादित करण्यासाठी `top_k`, जे अधिक सुसंगत प्रतिसाद तयार करण्यात मदत करते.

---

## निर्धार्य सॅम्पलिंग

सातत्यपूर्ण आउटपुटची आवश्यकता असलेल्या अनुप्रयोगांसाठी, निर्धार्य सॅम्पलिंग पुनरुत्पादनीय निकालांकरिता खात्री करतो. हे सुनिश्चित करण्यासाठी तो निश्चित यादृच्छिक बीज वापरतो आणि तापमान शून्यावर सेट करतो.

वेगवेगळ्या प्रोग्रामिंग भाषांमध्ये निर्धार्य सॅम्पलिंग कसे कार्यान्वित करायचे याचे उदाहरण पाहू.

# [Java](#tab/java)

```java
// Java उदाहरण: निश्चित बीजे सह निश्चित प्रतिसाद
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // निश्चित निकालांसाठी निश्चित बियाणे वापरणे
        
        // निश्चित बीजासह प्रथम विनंती
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // जास्तीत जास्त निश्चिततेसाठी शून्य तापमान
            .build();
            
        // त्याच बीजासह दुसरी विनंती
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // दोन्ही विनंत्यांचे कार्यान्वयन करा
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // समान बीज आणि तापमान=0 असल्यामुळे प्रतिसाद 동일 असावेत
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

मागील कोडमध्ये आपण:

- निर्दिष्ट सर्व्हर URL सह MCP क्लायंट तयार केला आहे.
- समान प्रॉम्प्ट, निश्चित बीज, आणि शून्य तापमानासह दोन विनंत्या कॉन्फिगर केल्या आहेत.
- दोन्ही विनंत्या पाठवल्या आणि निर्मित मजकूर प्रिंट केला.
- सॅम्पलिंग कॉन्फिगरेशनची निर्धारक स्वभावामुळे प्रतिसाद एकसारखे असल्याचे दाखवले (समान बीज आणि तापमान).
- `setSeed` वापरून निश्चित यादृच्छिक बीज निर्दिष्ट केला, ज्यामुळे मॉडेल प्रत्येक वेळी त्याच इनपुटसाठी समान आउटपुट निर्माण करते.
- अधिकतम निर्धार्यता सुनिश्चित करण्यासाठी तापमान शून्यावर सेट केले, म्हणजे मॉडेल नेहमी सर्वाधिक संभाव्य पुढील टोकन निवडेल.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// जावास्क्रिप्ट उदाहरण: बीज नियंत्रणासह निश्चित प्रतिसाद
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // स्थिर बीजासह पहिला विनंती
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // जास्तीत जास्त निश्चिततेसाठी शून्य तापमान
    });
    
    // समान बीज आणि तापमानासह दुसरी विनंती
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // वेगवेगळ्या बीजासह पण समान तापमानासह तिसरी विनंती
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

मागील कोडमध्ये आपण:

- सर्व्हर URL सह MCP क्लायंट प्रारंभ केला आहे.
- समान प्रॉम्प्ट, निश्चित बीज, आणि शून्य तापमानासह दोन विनंत्या कॉन्फिगर केल्या आहेत.
- दोन्ही विनंत्या पाठवल्या आणि निर्मित मजकूर प्रिंट केला.
- सॅम्पलिंग कॉन्फिगरेशनची निर्धारक स्वभावामुळे प्रतिसाद एकसारखे असल्याचे दाखवले (समान बीज आणि तापमान).
- `seed` वापरून निश्चित यादृच्छिक बीज निर्दिष्ट केला, ज्यामुळे मॉडेल प्रत्येक वेळी त्याच इनपुटसाठी समान आउटपुट निर्माण करते.
- अधिकतम निर्धार्यता सुनिश्चित करण्यासाठी तापमान शून्यावर सेट केले, म्हणजे मॉडेल नेहमी सर्वाधिक संभाव्य पुढील टोकन निवडेल.
- तिसऱ्या विनंतीसाठी वेगळे बीज वापरले, जे दाखवते की बीज बदलल्यास, जरी प्रॉम्प्ट आणि तापमान समान असले तरी, आउटपुट वेगवेगळे येतात.

---

## गतिशील सॅम्पलिंग कॉन्फिगरेशन

बुद्धिमान सॅम्पलिंग प्रत्येक विनंतीच्या संदर्भ आणि आवश्यकतांनुसार परिमाणे समायोजित करते. याचा अर्थ कार्य प्रकार, वापरकर्ता प्राधान्ये किंवा ऐतिहासिक कार्यक्षमतेनुसार तापमान, top_p, आणि दंड यांसारखे परिमाणे गतिशीलपणे समायोजित करणे होय.

वेगवेगळ्या प्रोग्रामिंग भाषांमध्ये गतिशील सॅम्पलिंग कसे अंमलात आणायचे ते पाहू.

# [Python](#tab/python)

```python
# Python उदाहरणः विनंती संदर्भावर आधारित गतिशील सॅम्पलिंग
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # विविध कार्य प्रकारांसाठी सॅम्पलिंग प्रीसेट्स परिभाषित करा
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # बेस प्रीसेट निवडा
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # दिल्यास वापरकर्ता प्राधान्यांनुसार समायोजित करा
        if user_preferences:
            if "creativity_level" in user_preferences:
                # सर्जनशीलता प्राधान्यांनुसार तापमान प्रमाण (1-10) स्केल करा
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # अपेक्षित प्रतिसाद विविधतेनुसार top_p समायोजित करा
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # सानुकूल सॅम्पलिंग पॅरामीटर्ससह विनंती तयार करा आणि पाठवा
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # पारदर्शकतेसाठी सॅम्पलिंग मेटाडेटासह प्रतिसाद परत करा
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

मागील कोडमध्ये आपण:

- अ‍ॅडॅप्टिव्ह सॅम्पलिंग व्यवस्थापित करणारी `DynamicSamplingService` क्लास तयार केली आहे.
- विविध कार्य प्रकारांसाठी (सर्जनशील, तथ्यात्मक, कोड, विश्लेषणात्मक) सॅम्पलिंग प्रीसेट्स परिभाषित केल्या.
- कार्य प्रकारावर आधारित बेस सॅम्पलिंग प्रीसेट निवडली.
- वापरकर्ता प्राधान्यानुसार, जसे की सर्जनशीलता आणि विविधता, सॅम्पलिंग परिमाणे समायोजित केली.
- गतिशीलरीत्या कॉन्फिगर केलेल्या सॅम्पलिंग परिमाणांसह विनंती पाठवली.
- निर्मित मजकूर परत केला तसेच पारदर्शकतेसाठी लागू केलेल्या सॅम्पलिंग परिमाणे आणि कार्य प्रकारही परत केले.
- आउटपुटची यादृच्छिकता नियंत्रित करण्यासाठी `temperature` वापरली, जिथे जास्त किंमती अधिक सर्जनशील प्रतिसादाकडे नेतात.
- उत्कृष्ट मजकूर गुणवत्तेसाठी `top_p` वापरून टोकन निवड मर्यादित केली.
- पुनरावृत्ती कमी करण्यासाठी आणि विविधता प्रोत्साहित करण्यासाठी `frequency_penalty` वापरली.
- वापरकर्त्याच्या पसंतनुसार सॅम्पलिंग परिमाणे सानुकूल करण्यासाठी `user_preferences` वापरली.
- विनंतीसाठी योग्य सॅम्पलिंग धोरण ठरविण्यासाठी `task_type` वापरला, ज्यामुळे कार्याच्या प्रकृतीनुसार अधिक अनुकूल प्रतिसाद संभवतो.
- कॉन्फिगर केलेल्या सॅम्पलिंग परिमाणांसह प्रॉम्प्ट पाठवण्यासाठी `send_request` पद्धत वापरली, ज्यामुळे मॉडेल निर्दिष्ट आवश्यकतांनुसार मजकूर तयार करते.
- मॉडेल प्रतिसाद मिळविण्यासाठी `generated_text` वापरला, जो नंतर सॅम्पलिंग परिमाणे आणि कार्य प्रकारासह परत केला जातो.
- वापरकर्त्याच्या पसंती प्रमाणे वैध श्रेणीत क्लॅम्प करण्यासाठी `min` आणि `max` फंक्शन्स वापरल्या.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript उदाहरण: वापरकर्ता संदर्भावर आधारित गतिशील सॅम्पलिंग कॉन्फिगरेशन
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // बेस सॅम्पलिंग प्रोफाइल परिभाषित करा
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ऐतिहासिक कामगिरी ट्रॅक करा
    this.performanceHistory = [];
  }
  
  // प्रॉम्प्टवरून कार्य प्रकार शोधा
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // सोपी अनुमानात्मक शोध - ML वर्गीकरणाने सुधारली जाऊ शकते
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
    
    // जर स्पष्ट प्रकार आढळला नाही तर संवादात्मक म्हणून डीफॉल्ट करा
    return 'conversational';
  }
  
  // संदर्भ आणि वापरकर्ता प्राधान्यांनुसार सॅम्पलिंग पॅरामिटर्स गणना करा
  getSamplingParameters(prompt, context = {}) {
    // कार्य प्रकार शोधा
    const taskType = this.detectTaskType(prompt, context);
    
    // बेस प्रोफाइल मिळवा
    let params = {...this.samplingProfiles[taskType]};
    
    // वापरकर्ता प्राधान्यांनुसार समायोजित करा
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 वरून योग्य तापमान श्रेणीत प्रमाणित करा
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // उच्च अचूकता म्हणजे कमी topP (अधिक केन्द्रित निवड)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // उच्च सुसंगतता म्हणजे कमी दंड
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // कामगिरी इतिहासातून शिकलेले समायोजन लागू करा
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // सोपा अनुकूली लॉजिक - अधिक प्रगत अल्गोरिदमसह सुधारता येऊ शकतो
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // केवळ अलीकडील इतिहासच विचारात घ्या
    
    if (relevantHistory.length > 0) {
      // मध्यम कामगिरी गुण विश्लेषण करा
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // जर कामगिरी थ्रेशोल्डपेक्षा खाली असेल तर पॅरामिटर्स समायोजित करा
      if (avgScore < 0.7) {
        // सुरक्षित मूल्यांकडे सौम्य समायोजन
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // भविष्यातील समायोजनासाठी कामगिरी नोंदवा
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // प्रतिसाद गुणवत्ता 0-1 रेटिंग
    });
    
    // इतिहास आकार मर्यादित करा
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ऑप्टिमाइझ केलेले सॅम्पलिंग पॅरामिटर्स मिळवा
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ऑप्टिमाइझ पॅरामिटर्ससह विनंती पाठवा
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // वापरकर्ता अभिप्राय दिल्यास भविष्यातील ऑप्टिमायझेशनसाठी नोंदवा
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

// उदाहरण वापर
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // सर्जनशील कार्य सानुकूल वापरकर्ता प्राधान्यांसह
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // उच्च सर्जनशीलता (1-10)
          consistency: 3  // कमी सुसंगतता (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // कोड निर्मिती कार्य
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // कमी सर्जनशीलता
          precision: 8,   // उच्च अचूकता
          consistency: 9  // उच्च सुसंगतता
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

मागील कोडमध्ये आपण:

- कार्य प्रकार आणि वापरकर्ता प्राधान्यानुसार गतिशील सॅम्पलिंग व्यवस्थापित करणारी `AdaptiveSamplingManager` क्लास तयार केली.
- विविध कार्य प्रकारांसाठी सॅम्पलिंग प्रोफाइल्स परिभाषित केल्या (सर्जनशील, तथ्यात्मक, कोड, संभाषण).
- साध्या ह्युरिस्टिक्स वापरून प्रॉम्प्टमधून कार्य प्रकार ओळखण्याची पद्धत अंमलात आणली.
- शोधलेल्या कार्य प्रकार आणि वापरकर्ता प्राधिकत्यांवर आधारित सॅम्पलिंग परिमाणे गणना केली.
- ऐतिहासिक कार्यक्षमतेवर आधारित शिकलेल्या समायोजनांचा वापर करून सॅम्पलिंग परिमाणे सुधारीत केली.
- भविष्यातील समायोजनांसाठी कार्यक्षमतेचे नोंद ठेवली, ज्यामुळे सिस्टम पूर्वीच्या संवादांवरून शिकते.
- गतिशीलरीत्या कॉन्फिगर केलेल्या सॅम्पलिंग परिमाणांसह विनंत्या पाठवल्या आणि लागू केलेल्या परिमाणे तसेच ओळखलेल्या कार्य प्रकारांसह निर्मित मजकूर परत केला.
- वापरले:
    - वापरकर्त्याने परिभाषित सर्जनशीलता, अचूकता आणि सातत्य स्तरांवर आधारित सॅम्पलिंग परिमाणे सानुकूल करण्यासाठी `userPreferences`.
    - प्रॉम्प्टवरून कार्याचा प्रकार ठरवण्यासाठी `detectTaskType`, ज्यामुळे विविध प्रकारांच्या विनंत्यांसाठी योग्य सॅम्पलिंग धोरणे लागू केली जातात.
    - प्रणालीला पूर्वीच्या प्रतिसादांच्या कार्यक्षमतेची नोंद ठेवण्यासाठी `recordPerformance`, ज्यामुळे वेळेनुसार सुधारणा शक्य होतात.
    - ऐतिहासिक कार्यक्षमतेवर आधारित सॅम्पलिंग परिमाणे बदलण्यासाठी `applyLearnedAdjustments`, ज्यामुळे उच्च-गुणवत्तेच्या प्रतिसादांची निर्मिती सुधारते.
    - वेगवेगळ्या प्रॉम्प्ट आणि संदर्भांसह सोपे कॉल करण्यासाठी संपूर्ण प्रक्रियेला `generateResponse` मध्ये संलग्न केले.
    - निर्मित प्रतिसादासाठी कोणते टूल्स वापरू शकतात ते निर्दिष्ट करण्यासाठी `allowedTools`, ज्यामुळे अधिक संदर्भ-जागरूक प्रतिसाद संभवतो.
    - वापरकर्त्यांना निर्मित प्रतिसादाच्या गुणवत्तेबाबत अभिप्राय देण्याची परवानगी देण्यासाठी `feedbackScore`, ज्याचा वापर मॉडेलच्या कार्यक्षमतेत सुधारणा करण्यासाठी होतो.
    - भूतपूर्व संवादांची नोंद ठेवण्यासाठी `performanceHistory`, ज्याद्वारे सिस्टम यशस्वी आणि अयशस्वी अनुभवांवरून शिकते.
    - विनंतीच्या संदर्भावर आधारित सॅम्पलिंग परिमाणे गतिशीलरित्या समायोजित करण्यासाठी `getSamplingParameters`, ज्यामुळे मॉडेलचे वर्तन अधिक लवचीक व प्रतिसादी बनते.
    - प्रॉम्प्टवर आधारित कार्य प्रकार वर्गीकृत करण्यासाठी `detectTaskType`, ज्यामुळे विविध प्रकारच्या विनंत्यांसाठी योग्य सॅम्पलिंग धोरणे लागू होतात.
    - विविध कार्य प्रकारांसाठी बेस सॅम्पलिंग कॉन्फिगरेशन असल्यामुळे वेगवान समायोजन शक्य करणारे `samplingProfiles`.

---

## पुढे काय

- [5.7 स्केलिंग](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->