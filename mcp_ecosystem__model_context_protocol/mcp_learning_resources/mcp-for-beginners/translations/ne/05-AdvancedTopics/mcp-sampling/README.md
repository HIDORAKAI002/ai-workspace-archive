> [बेउपयोग: २०२६-०७-२८ रिलिज क्याण्डिडेट](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# मोडेल कन्टेक्स्ट प्रोटोकलमा स्याम्प्लिङ

> **बेउपयोग सूचना:** `२०२६-०७-२८` MCP स्पेसिफिकेसन रिलिज क्याण्डिडेटले स्याम्प्लिङलाई बेउपयोग घोषणा गर्दछ र LLM प्रदायक एपीआईहरूसँग सिधा एकीकरणलाई प्राथमिकता दिन्छ। स्याम्प्लिङ `२०२५-११-२५` र कुनै पनि औपचारिक बेउपयोगको कम्तीमा पनि एक वर्षसम्म कार्यरत रहन्छ, त्यसैले यस पाठको सबै कुरा मान्य छन् - तर नयाँ सर्भर डिजाइनहरूले प्रतिस्थापन ढाँचाको मूल्यांकन गर्नुपर्छ। हेर्नुहोस् [MCP मा के परिवर्तन हुँदैछ: २०२६-०७-२८ रिलिज क्याण्डिडेट](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)।

स्याम्प्लिङ MCP को शक्तिशाली सुविधा हो जसले सर्भरहरूलाई क्लाइन्टमार्फत LLM समापनहरू अनुरोध गर्न अनुमति दिन्छ, जसले सुरक्षा र गोपनीयता कायम राख्दै जटिल एजेण्टिक व्यवहारहरू सक्षम पार्दछ। सही स्याम्प्लिङ कन्फिगरेसनले प्रतिक्रियाको गुणस्तर र प्रदर्शन में उल्लेखनीय सुधार गर्न सक्छ। MCP मोडेलहरूले टेक्स्ट कसरी निर्माण गर्छन् भन्ने नियन्त्रण गर्ने लागि एक मानकीकृत तरिका प्रदान गर्दछ, जसले र्यान्डमनेस, सिर्जनात्मकता, र सुसंगतता प्रभावित गर्ने निश्चित प्यारामिटरहरू समावेश गर्दछ।

## परिचय

यस पाठमा, हामी MCP अनुरोधहरूमा स्याम्प्लिङ प्यारामिटरहरू कसरी कन्फिगर गर्ने र स्याम्प्लिङको आधारभूत प्रोटोकल म्यानेकनि्स्महरू बुझ्नेछौं।

## सिकाइ उद्देश्यहरू

यस पाठको अन्त्यसम्म तपाईं सक्षम हुनुहुनेछ:

- MCP मा उपलब्ध मुख्य स्याम्प्लिङ प्यारामिटरहरू बुझ्ने।
- विभिन्न उपयोग केसहरूको लागि स्याम्प्लिङ प्यारामिटरहरू कन्फिगर गर्ने।
- पुनरुत्पादन योग्य परिणामहरूका लागि निर्धारक स्याम्प्लिङ लागू गर्ने।
- सन्दर्भ र प्रयोगकर्ता प्राथमिकताहरूका आधारमा स्याम्प्लिङ प्यारामिटरहरू गतिशील रूपमा समायोजन गर्ने।
- विभिन्न परिदृश्यहरूमा मोडेल प्रदर्शन सुधार गर्न स्याम्प्लिङ रणनीतिहरू लागू गर्ने।
- MCP का क्लाइन्ट-सर्भर प्रवाहमा स्याम्प्लिङ कसरी काम गर्छ बुझ्ने।

## MCP मा स्याम्प्लिङ कसरी काम गर्छ

MCP मा स्याम्प्लिङ प्रवाह यी चरणहरू पालना गर्छ:

१. सर्भरले क्लाइन्टलाई `sampling/createMessage` अनुरोध पठाउँछ
२. क्लाइन्टले अनुरोधको समीक्षा गर्छ र आवश्यक परिमार्जन गर्न सक्छ
३. क्लाइन्ट LLM बाट स्याम्पल गर्छ
४. क्लाइन्टले समापनको समीक्षा गर्छ
५. क्लाइन्टले परिणाम सर्भरलाई फिर्ता दिन्छ

यस मान्छे-इन-द-लूप डिजाइनले प्रयोगकर्तालाई LLM ले के देख्छ र उत्पादन गर्छ भन्नेमा नियन्त्रण कायम राख्छ।

## स्याम्प्लिङ प्यारामिटरहरू अवलोकन

MCP ले क्लाइन्ट अनुरोधहरूमा कन्फिगर गर्न सकिने निम्न स्याम्प्लिङ प्यारामिटरहरू परिभाषित गर्दछ:

| प्यारामिटर | विवरण | प्रायः क्षेत्रमा |
|-----------|-------------|---------------|
| `temperature` | टोकन चयनमा र्यान्डमनेस नियन्त्रण गर्छ | ०.० - १.० |
| `maxTokens` | अधिकतम टोकन संख्या उत्पादन गर्न | पूर्णांक मान |
| `stopSequences` | उत्पादन रोक्ने कस्टम अनुक्रमहरू | स्ट्रिङहरूको सुची |
| `metadata` | अतिरिक्त प्रदायक-विशिष्ट प्यारामिटरहरू | JSON वस्तु |

धेरै LLM प्रदायकहरूले `metadata` फिल्ड मार्फत अतिरिक्त प्यारामिटरहरू समर्थन गर्छन्, जसमा समावेश हुन सक्छ:

| सामान्य एक्सटेन्सन प्यारामिटर | विवरण | प्रायः क्षेत्रमा |
|-----------|-------------|---------------|
| `top_p` | न्युक्लियस स्याम्प्लिङ - टोकनहरूलाई शीर्ष संचयी संभावना सीमित गर्छ | ०.० - १.० |
| `top_k` | टोकन चयनलाई शीर्ष K विकल्पहरूमा सीमित गर्छ | १ - १०० |
| `presence_penalty` | हालसम्मको टेक्स्टमा उपस्थितिको आधारमा टोकनलाई दण्डित गर्छ | -२.० - २.० |
| `frequency_penalty` | हालसम्मको टेक्स्टमा आवृत्तिको आधारमा टोकनलाई दण्डित गर्छ | -२.० - २.० |
| `seed` | पुनरुत्पादन योग्य परिणामका लागि विशेष र्यान्डम सिड | पूर्णांक मान |

## उदाहरण अनुरोध ढाँचा

यहाँ MCP मा क्लाइन्टबाट स्याम्प्लिङ अनुरोध गर्ने उदाहरण छ:

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

## प्रतिक्रिया ढाँचा

क्लाइन्टले समापन परिणाम फिर्ता गर्छ:

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

## मान्छे इन द लूप नियन्त्रणहरु

MCP स्याम्प्लिङ मान्छे निगरानीको साथ डिजाइन गरिएको छ:

- **प्रॉम्प्टहरूको लागि**:
  - क्लाइन्टहरूले प्रयोगकर्तालाई प्रस्तावित प्रॉम्प्ट देखाउनुपर्छ
  - प्रयोगकर्ताले प्रॉम्प्टहरू संशोधन वा अस्वीकृत गर्न सक्ने हुनुपर्छ
  - सिस्टम प्रॉम्प्टहरू छनौट गर्न वा परिमार्जन गर्न सकिन्छ
  - सन्दर्भ समावेशीकरण क्लाइन्टद्वारा नियन्त्रण गरिन्छ

- **समापनहरूको लागि**:
  - क्लाइन्टहरूले प्रयोगकर्तालाई समापन देखाउनुपर्छ
  - प्रयोगकर्ताले समापनहरू संशोधन वा अस्वीकृत गर्न सक्ने हुनुपर्छ
  - क्लाइन्टहरूले समापनहरू छनौट गर्न वा परिमार्जन गर्न सक्छन्
  - प्रयोगकर्ताले कुन मोडेल प्रयोग गर्ने छनोट गर्छन्

यी सिद्धान्तहरूलाई ध्यानमा राख्दै, हामी विभिन्न प्रोग्रामिङ भाषाहरूमा स्याम्प्लिङ कसरी लागू गर्ने, र LLM प्रदायकहरूबीच सामान्य रूपमा समर्थन भएका प्यारामिटरहरूमा केन्द्रित भएर हेरौं।

## सुरक्षा विचारहरू

MCP मा स्याम्प्लिङ लागू गर्दा यी सुरक्षा राम्रो अभ्यासहरू विचार गर्नुहोस्:

- **सबै सन्देश सामग्री जाँच्नुहोस्** क्लाइन्टलाई पठाउनु अघि
- **प्रॉम्प्ट र समापनबाट संवेदनशील जानकारी सफा गर्नुहोस्**
- **दुरुपयोग रोक्न दर सीमा लागू गर्नुहोस्**
- **असामान्य ढाँचाहरूको लागि स्याम्प्लिङ प्रयोग अनुगमन गर्नुहोस्**
- **सुरक्षित प्रोटोकलहरू प्रयोग गरेर डाटा इन ट्रान्जिट एन्क्रिप्ट गर्नुहोस्**
- **प्रयोगकर्ता डाटा गोपनीयता सम्बन्धी लागू नियमहरू पालना गर्नुहोस्**
- **सुनिश्चितता र सुरक्षा लागि स्याम्प्लिङ अनुरोधहरू अडिट गर्नुहोस्**
- **उचित सीमा राखेर लागत जोखिम नियन्त्रण गर्नुहोस्**
- **स्याम्प्लिङ अनुरोधहरूको लागि टाइमआउट लागू गर्नुहोस्**
- **मोडेल त्रुटिहरूलाई सहजरूपमा ह्यान्डल गर्ने उचित फालब्याकहरू लागू गर्नुहोस्**

स्याम्प्लिङ प्यारामिटरहरूले भाषा मोडेलहरूको व्यवहारलाई राम्रोसँग ट्युन गर्ने अनुमति दिन्छ ताकि निर्धारक र सिर्जनात्मक आउटपुटबीचको इच्छित सन्तुलन हासिल गर्न सकियोस्।

विभिन्न प्रोग्रामिङ भाषाहरूमा यी प्यारामिटरहरू कसरी कन्फिगर गर्ने हेरौं।

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

माथिको कोडमा हामीले:

- निश्चित सर्भर URL सहित MCP क्लाइन्ट बनाएका छौं।
- `temperature`, `top_p`, र `top_k` जस्ता स्याम्प्लिङ प्यारामिटरहरू सहित अनुरोध कन्फिगर गरेका छौं।
- अनुरोध पठाएका छौं र उत्पन्न गरिएको टेक्स्ट प्रिन्ट गरेका छौं।
- प्रयोग गरेका छौं:
    - `allowedTools` जसले मोडेललाई उत्पादन गर्दा कुन उपकरण प्रयोग गर्न सकिन्छ निर्दिष्ट गर्छ। यस अवस्थामा हामीले `ideaGenerator` र `marketAnalyzer` उपकरणहरूलाई रचनात्मक एप आइडिया उत्पादनमा सहयोगका लागि अनुमति दिएका छौं।
    - `frequencyPenalty` र `presencePenalty` ले आउटपुटमा दोहोरिएकोता र विविधता नियन्त्रण गर्छन्।
    - `temperature` यूजरले आउटपुटको र्यान्डमनेस नियन्त्रण गर्न प्रयोग गर्दछ, उच्च मानले थप सिर्जनात्मक प्रतिक्रियामा लैजान्छ।
    - `top_p` ले टोकनहरूको चयन सीमित गर्छ जुन शीर्ष संचयी सम्भाव्यता मासलाई योगदान गर्छ, जसले उत्पन्न टेक्स्टको गुणस्तर सुधार गर्दछ।
    - `top_k` मोडेललाई शीर्ष K सम्भावित टोकनहरूमा सीमित गर्छ, जसले थप सुसंगत प्रतिक्रियाहरूमा मद्दत पुर्याउँछ।
    - `frequencyPenalty` र `presencePenalty` लाई प्रयोग गरेर उत्पन्न टेक्स्टमा दोहोरिने वा विविधता कम गर्न मद्दत गर्दछ।

# [JavaScript](#tab/javascript)

```javascript
// JavaScript उदाहरण: तापक्रम र शीर्ष-P नमुना विन्यास
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP क्लाइन्ट आरम्भ गर्नुहोस्
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // विभिन्न नमुना प्यारामिटरहरूसँग अनुरोध कन्फिगर गर्नुहोस्
  const creativeSampling = {
    temperature: 0.9,    // उच्च तापक्रम = बढी अनियमितता/रचनात्मकता
    topP: 0.92,          // शीर्ष ९२% सम्भावना द्रव्य भएका टोकनहरू विचार गर्नुहोस्
    frequencyPenalty: 0.6, // टोकन अनुक्रमहरूको पुनरावृत्ति घटाउनुहोस्
    presencePenalty: 0.4   // अहिलेसम्मको पाठमा देखा परेका टोकनहरूलाई दण्डित गर्नुहोस्
  };
  
  const factualSampling = {
    temperature: 0.2,    // कम तापक्रम = बढी निर्णायक/तथ्यात्मक
    topP: 0.85,          // अलिकति बढी केन्द्रित टोकन छनौट
    frequencyPenalty: 0.2, // न्यूनतम पुनरावृत्ति दण्ड
    presencePenalty: 0.1   // न्यूनतम उपस्थिती दण्ड
  };
  
  try {
    // विभिन्न नमुना विन्यासहरूसँग दुई अनुरोधहरू पठाउनुहोस्
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

माथिको कोडमा हामीले:

- सर्भर URL र API कुञ्जीसहित MCP क्लाइन्ट आरम्भ गरेका छौं।
- सिर्जनात्मक कार्यहरू र तथ्यगत कार्यहरूको लागि स्याम्प्लिङ प्यारामिटरहरूको दुई सेट कन्फिगर गरेका छौं।
- यी कन्फिगरेसनहरूसहित अनुरोधहरू पठाएका छौं, मोडेललाई प्रत्येक कार्यका लागि विशेष उपकरणहरू प्रयोग गर्न अनुमति दिएर।
- भिन्न स्याम्प्लिङ प्यारामिटरहरूको प्रभाव देखाउन उत्पन्न प्रतिक्रियाहरूलाई प्रिन्ट गरेका छौं।
- `allowedTools` प्रयोग गरी मोडेलले उत्पादनको क्रममा प्रयोग गर्न सक्ने उपकरण निर्दिष्ट गरेका छौं। यसमा हामीले रचनात्मक कार्यहरूका लागि `ideaGenerator` र `environmentalImpactTool` र तथ्यगत कार्यहरूका लागि `factChecker` र `dataAnalysisTool` अनुमति दिएका छौं।
- `temperature` प्रयोग गरी आउटपुटको र्यान्डमनेस नियन्त्रण गरेका छौं, जहाँ उच्च मानले थप सिर्जनात्मक प्रतिक्रियामा विकास हुन्छ।
- `top_p` प्रयोग गरी टोकन चयनलाई शीर्ष संचयी सम्भाव्यता मासमा सीमित गरेका छौं, जसले उत्पन्न टेक्स्टको गुणस्तर सुधार गर्दछ।
- दोहोरिएकोता घटाउन र आउटपुटमा विविधता बढाउन `frequencyPenalty` र `presencePenalty` प्रयोग गरेका छौं।
- मोडेललाई शीर्ष K सम्भावित टोकनहरूको सीमामा राख्न `top_k` प्रयोग गरेका छौं, जसले थप सुसंगत प्रतिक्रियाहरूमा सहयोग पुर्याउँछ।

---

## निर्धारक स्याम्प्लिङ

स्थिर आउटपुट आवश्यक पर्ने अनुप्रयोगहरूको लागि, निर्धारक स्याम्प्लिङले पुनरुत्पादन योग्य परिणाम सुनिश्चित गर्छ। यसले निश्चित र्यान्डम सिड प्रयोग गरेर र तापक्रम शून्यमा सेट गरेर त्यसो गर्छ।

विभिन्न प्रोग्रामिङ भाषाहरूमा निर्धारक स्याम्प्लिङ कसरी लागू गर्ने भन्ने तलको नमूना कार्यान्वयन हेरौं।

# [Java](#tab/java)

```java
// जाभा उदाहरण: स्थिर बीजारोपणका साथ निश्चित प्रतिक्रिया
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // निश्चित परिणामहरूको लागि स्थिर बीजारोपणको प्रयोग
        
        // स्थिर बीजारोपणको साथ पहिलो अनुरोध
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // अधिकतम निश्चितताको लागि शून्य तापक्रम
            .build();
            
        // उस्तै बीजारोपणको साथ दोस्रो अनुरोध
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // दुबै अनुरोधहरू कार्यान्वयन गर्नुहोस्
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // प्रतिक्रिया उस्तै बीजारोपण र तापक्रम=० का कारण समान हुनु पर्दछ
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

माथिको कोडमा हामीले:

- निर्दिष्ट सर्भर URL सहित MCP क्लाइन्ट बनाएका छौं।
- एउटै प्रॉम्प्ट, निश्चित सिड, र शून्य तापक्रम सहित दुई अनुरोधहरू कन्फिगर गरेका छौं।
- दुवै अनुरोधहरू पठाएका छौं र उत्पन्न टेक्स्ट प्रिन्ट गरेका छौं।
- निर्धारक स्याम्प्लिङ कन्फिगरेसनको कारण (समान सिड र तापक्रम) प्रतिक्रियाहरू समान छन् भन्ने देखाएका छौं।
- `setSeed` प्रयोग गरेर निश्चित र्यान्डम सिड निर्दिष्ट गरेका छौं, जसले मोडेललाई हरेक पटक एउटै इनपुटको लागि एउटै आउटपुट उत्पादन गर्न सुनिश्चित गर्छ।
- अधिकतम निर्धारकता सुनिश्चित गर्न `temperature`लाई शून्यमा सेट गरेका छौं, जसले मोडेललाई सबैभन्दा सम्भावित अर्को टोकन चयन गर्न र्यान्डमनेस नगर्न बाध्य पार्छ।

# [JavaScript](#tab/javascript-deterministic)

```javascript
// जाभास्क्रिप्ट उदाहरण: बीज नियन्त्रण संग निश्चित प्रतिक्रियाहरू
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // निश्चित बीज संग पहिलो अनुरोध
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // अधिकतम निश्चितताको लागि शुन्य तापमान
    });
    
    // समान बीज र तापमान सहित दोस्रो अनुरोध
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // भिन्न बीज तर समान तापमान सहित तेस्रो अनुरोध
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

माथिल्लो कोडमा हामीले:

- सर्भर URL सहित MCP क्लाइन्ट आरम्भ गरेका छौं।
- एउटै प्रॉम्प्ट, निश्चित सिड, र शून्य तापक्रम सहित दुई अनुरोधहरू कन्फिगर गरेका छौं।
- दुवै अनुरोधहरू पठाएका छौं र उत्पन्न टेक्स्ट प्रिन्ट गरेका छौं।
- निर्धारक स्याम्प्लिङ कन्फिगरेसनको कारण (समान सिड र तापक्रम) प्रतिक्रियाहरू समान छन् भन्ने देखाएका छौं।
- `seed` प्रयोग गरेर निश्चित र्यान्डम सिड निर्दिष्ट गरेका छौं, जसले मोडेललाई हरेक पटक एउटै इनपुटको लागि एउटै आउटपुट उत्पादन गर्न सुनिश्चित गर्छ।
- अधिकतम निर्धारकता सुनिश्चित गर्न `temperature`लाई शून्यमा सेट गरेका छौं, जसले मोडेललाई सबैभन्दा सम्भावित अर्को टोकन चयन गर्न र्यान्डमनेस नगर्न बाध्य पार्छ।
- तेस्रो अनुरोधका लागि फरक सिड प्रयोग गरेर देखाएका छौं कि सिड परिवर्तन गर्दा एउटै प्रॉम्प्ट र तापक्रम हुँदा पनि फरक आउटपुट आउँछ।

---

## गतिशील स्याम्प्लिङ कन्फिगरेसन

बुद्धिमान स्याम्प्लिङ प्रत्येक अनुरोधको सन्दर्भ र आवश्यकताका आधारमा प्यारामिटरहरू अनुकूल/parimirjan (adaptive) गर्छ। यसले कार्य प्रकार, प्रयोगकर्ता प्राथमिकताहरू, वा ऐतिहासिक प्रदर्शन अनुसार `temperature`, `top_p`, र दण्डहरू जस्ता प्यारामिटरहरू गतिशील रूपमा समायोजन गर्दछ।

चल्ती प्रोग्रामिङ भाषाहरूमा गतिशील स्याम्प्लिङ कसरी लागू गर्ने भन्ने हेरौं।

# [Python](#tab/python)

```python
# Python उदाहरण: अनुरोध सन्दर्भमा आधारित गतिशील नमूना चयन
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # फरक कार्य प्रकारहरूको लागि नमूना पूर्व निर्धारितहरू परिभाषित गर्नुहोस्
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # आधारपूर्व निर्धारित चयन गर्नुहोस्
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # प्रयोगकर्ता प्राथमिकताहरू उपलब्ध भएमा त्यसअनुसार अनुकूलित गर्नुहोस्
        if user_preferences:
            if "creativity_level" in user_preferences:
                # सिर्जनशीलता प्राथमिकता (1-10) अनुसार तापक्रम समायोजन गर्नुहोस्
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # चाहिएको प्रतिक्रिया विविधताको आधारमा top_p समायोजन गर्नुहोस्
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # अनुकूल नमूना प्यारामिटरहरूसँग अनुरोध सिर्जना गरी पठाउनुहोस्
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # पारदर्शिताको लागि नमूना मेटाडेटासहित प्रतिक्रिया फर्काउनुहोस्
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

माथिको कोडमा हामीले:

- `DynamicSamplingService` नामक क्लास निर्माण गरेका छौं जसले अनुकूल स्याम्प्लिङ व्यवस्थापन गर्छ।
- विभिन्न कार्य प्रकार (सिर्जनात्मक, तथ्यगत, कोड, विश्लेषणात्मक) लागि स्याम्प्लिङ प्रिसेटहरू परिभाषित गरेका छौं।
- कार्य प्रकारको आधारमा आधार स्याम्प्लिङ प्रिसेट चयन गरेका छौं।
- प्रयोगकर्ता प्राथमिकताहरू, जस्तै सिर्जनात्मकता स्तर र विविधता अनुसार स्याम्प्लिङ प्यारामिटरहरू समायोजन गरेका छौं।
- कन्फिगर गरिएको स्याम्प्लिङ प्यारामिटरहरूसहित अनुरोध पठाएका छौं।
- पारदर्शिताका लागि उत्पन्न टेक्स्टसँगै लागू स्याम्प्लिङ प्यारामिटरहरू र कार्य प्रकार फिर्ता दिएका छौं।
- `temperature` प्रयोग गरी आउटपुटको र्यान्डमनेस नियन्त्रण गरेका छौं, जहाँ उच्च मानले थप सिर्जनात्मक प्रतिक्रियामा लैजान्छ।
- `top_p` प्रयोग गरी टोकन चयनलाई शीर्ष संचयी सम्भाव्यता मासमा सीमित गरेका छौं, जसले उत्पन्न टेक्स्टको गुणस्तर सुधार गर्दछ।
- `frequency_penalty` प्रयोग गरी दोहोरिने घटाएर विविधता प्रोत्साहित गरेका छौं।
- `user_preferences` प्रयोग गरी प्रयोगकर्ताद्वारा परिभाषित सिर्जनात्मकता र विविधता स्तरमा आधारित स्याम्प्लिङ प्यारामिटरहरू अनुकूलन गरेका छौं।
- `task_type` प्रयोग गरी अनुरोधका लागि उपयुक्त स्याम्प्लिङ रणनीति निर्धारण गरेका छौं, जसले कार्यको प्रकृतिमा आधारित थप उपयुक्त प्रतिक्रियाहरू सम्भव पार्दछ।
- `send_request` विधि प्रयोग गरी कन्फिगर गरिएको प्रॉम्प्ट स्याम्प्लिङ प्यारामिटरहरूसँग पठाएका छौं, जसले मोडेललाई निर्दिष्ट आवश्यकताअनुसार टेक्स्ट उत्पन्न गर्न अनुमति दिन्छ।
- `generated_text` प्रयोग गरी मोडेलको प्रतिक्रिया प्राप्त गरेका छौं, जुन विश्लेषण वा प्रदर्शनका लागि स्याम्प्लिङ प्यारामिटरहरू र कार्य प्रकारसँगै फिर्ता गरिन्छ।
- `min` र `max` फंक्शनहरू प्रयोग गरेर प्रयोगकर्ता प्राथमिकताहरू मान्य दायरा भित्र सीमित गरेका छौं, अवैध स्याम्प्लिङ कन्फिगरेसन रोक्न।

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript उदाहरण: प्रयोगकर्ता सन्दर्भमा आधारित गतिशील स्याम्पलिङ कन्फिगरेसन
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // आधारभूत स्याम्पलिङ प्रोफाइलहरू परिभाषित गर्नुहोस्
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ऐतिहासिक प्रदर्शन ट्र्याक गर्नुहोस्
    this.performanceHistory = [];
  }
  
  // प्रॉम्प्टबाट कार्य प्रकार पत्ता लगाउनुहोस्
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // सरल अनुमाान पत्ता लगाउने विधि - ML वर्गीकरणसँग सुधार गर्न सकिन्छ
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
    
    // यदि स्पष्ट प्रकार पत्ता लागेन भने वार्तालापात्मकमा डिफल्ट गर्नुहोस्
    return 'conversational';
  }
  
  // सन्दर्भ र प्रयोगकर्ता प्राथमिकताहरूका आधारमा स्याम्पलिङ प्यारामिटरहरू गणना गर्नुहोस्
  getSamplingParameters(prompt, context = {}) {
    // कार्यको प्रकार पत्ता लगाउनुहोस्
    const taskType = this.detectTaskType(prompt, context);
    
    // आधार प्रोफाइल प्राप्त गर्नुहोस्
    let params = {...this.samplingProfiles[taskType]};
    
    // प्रयोगकर्ता प्राथमिकताहरूको आधारमा समायोजन गर्नुहोस्
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 बाट उपयुक्त तापमान दायरामा स्केल गर्नुहोस्
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // उच्च सटीकता मतलब कम topP (अधिक केन्द्रित चयन)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // उच्च स्थिरता मतलब कम सजायहरू
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // प्रदर्शन इतिहासबाट सिकिएको समायोजन लागू गर्नुहोस्
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // सरल अनुकुलन तर्क - थप परिष्कृत एल्गोरिदमसँग सुधार गर्न सकिन्छ
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // भर्खरको इतिहास मात्र विचार गर्नुहोस्
    
    if (relevantHistory.length > 0) {
      // औसत प्रदर्शन स्कोरहरू गणना गर्नुहोस्
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // यदि प्रदर्शन थ्रेसहोल्ड भन्दा तल छ भने, प्यारामिटरहरू समायोजन गर्नुहोस्
      if (avgScore < 0.7) {
        // सुरक्षित मानहरूतर्फ सानो समायोजन
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // भविष्यको समायोजनका लागि प्रदर्शन रेकर्ड गर्नुहोस्
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // प्रतिक्रिया गुणस्तरको 0-1 मूल्यांकन
    });
    
    // इतिहास साइज सीमित गर्नुहोस्
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // अनुकूलित स्याम्पलिङ प्यारामिटरहरू प्राप्त गर्नुहोस्
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // अनुकूलित प्यारामिटरहरूसँग अनुरोध पठाउनुहोस्
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // यदि प्रयोगकर्ताले प्रतिक्रिया दिन्छ भने, भविष्यको अनुकूलनका लागि रेकर्ड गर्नुहोस्
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

// उदाहरण प्रयोग
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // अनुकूलित प्रयोगकर्ता प्राथमिकतासँग सिर्जनात्मक कार्य
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // उच्च सृजनात्मकता (1-10)
          consistency: 3  // कम स्थिरता (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // कोड उत्पादन कार्य
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // कम सृजनात्मकता
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

माथिल्लो कोडमा हामीले:

- `AdaptiveSamplingManager` नामक क्लास बनाएका छौं जसले कार्य प्रकार र प्रयोगकर्ता प्राथमिकताका आधारमा गतिशील स्याम्प्लिङ व्यवस्थापन गर्छ।
- विभिन्न कार्य प्रकार (सिर्जनात्मक, तथ्यगत, कोड, वार्तालाप) का लागि स्याम्प्लिङ प्रोफाइल परिभाषित गरेका छौं।
- सरल उपायहरूले प्रॉम्प्टबाट कार्य प्रकार पत्ता लगाउने विधि लागू गरेका छौं।
- पत्ता लागेपछि कार्य प्रकार र प्रयोगकर्ता प्राथमिकताका आधारमा स्याम्प्लिङ प्यारामिटरहरू गणना गरेका छौं।
- ऐतिहासिक प्रदर्शनका आधारमा सिकेका समायोजनहरू लागू गरेर स्याम्प्लिङ प्यारामिटरहरू अनुकूलन गरेका छौं।
- भविष्यका समायोजनका लागि प्रदर्शन रेकर्ड गरेका छौं, जसले प्रणालीलाई विगतका अन्तरक्रियाबाट सिक्न सक्षम बनाउँछ।
- गतिशील रूपमा कन्फिगर गरिएको स्याम्प्लिङ प्यारामिटरहरूसहित अनुरोध पठाएका छौं र उत्पन्न टेक्स्ट थपिएका प्यारामिटरहरूसँग जनाएको कार्य प्रकार सहित फिर्ता गरेका छौं।
- प्रयोग गरेका छौं:
    - `userPreferences` जसले प्रयोगकर्ताद्वारा परिभाषित सिर्जनात्मकता, शुद्धता, र निरन्तरता स्तरमा आधारित स्याम्प्लिङ प्यारामिटरहरू अनुकूलन गर्न अनुमति दिन्छ।
    - `detectTaskType` जसले प्रॉम्प्टको आधारमा कार्यको प्रकृति निर्धारण गर्छ, र फरक प्रकारका अनुरोधहरूको लागि उपयुक्त स्याम्प्लिङ रणनीतिहरू लागू गर्न मद्दत गर्छ।
    - `recordPerformance` जसले उत्पन्न प्रतिक्रियाको प्रदर्शन लग गर्दछ, प्रणालीलाई समयसँगै अनुकूलन र सुधार गर्न सक्षम पार्दछ।
    - `applyLearnedAdjustments` जसले ऐतिहासिक प्रदर्शनको आधारमा स्याम्प्लिङ प्यारामिटरहरू परिवर्तन गर्छ, जसले मोडेललाई उच्च गुणस्तर प्रतिक्रिया उत्पादनमा सक्षम बनाउँछ।
    - `generateResponse` जसले adaptive स्याम्प्लिङसँग सम्पूर्ण प्रतिक्रिया निर्माण प्रक्रियालाई समाहित गर्छ, भिन्न प्रॉम्प्टहरू र सन्दर्भहरूका साथ सजिलो कल गर्न।
    - `allowedTools` जसले उत्पादन क्रममा मोडेलले कुन उपकरणहरू प्रयोग गर्न सक्ने निर्दिष्ट गर्छ, थप सन्दर्भ-सचेत प्रतिक्रियाहरूका लागि।
    - `feedbackScore` जसले प्रयोगकर्तालाई उत्पन्न प्रतिक्रियाको गुणस्तरमा प्रतिक्रिया दिने सुविधा दिन्छ, र समयसँगै मोडेल प्रदर्शन सुधार गर्न प्रयोग गर्न सकिन्छ।
    - `performanceHistory` जसले विगतका अन्तरक्रियाहरूको रेकर्ड राख्छ, जसले प्रणालीलाई विगतका सफलताहरू र असफलताबाट सिक्न सक्षम बनाउँछ।
    - `getSamplingParameters` जसले अनुरोधको सन्दर्भ अनुसार स्याम्प्लिङ प्यारामिटरहरू गतिशील रूपमा समायोजन गर्छ, थप लचिलो र प्रतिक्रियाशील मोडेल व्यवहारका लागि।
    - `detectTaskType` जसले प्रॉम्प्टको आधारमा कार्य वर्गीकरण गर्छ, र फरक प्रकारका अनुरोधहरूको लागि उपयुक्त स्याम्प्लिङ रणनीतिहरू लागू गर्न सक्षम बनाउँछ।
    - `samplingProfiles` जसले फरक कार्य प्रकारका लागि आधार स्याम्प्लिङ कन्फिगरेसनहरू परिभाषित गर्छ, अनुरोधको प्रकृतिका आधारमा छिटो समायोजनका लागि।

---

## अर्को के हो

- [5.7 स्केलिङ](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->