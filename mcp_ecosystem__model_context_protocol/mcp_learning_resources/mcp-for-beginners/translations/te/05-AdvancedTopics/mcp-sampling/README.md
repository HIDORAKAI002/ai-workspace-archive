# మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ లో శాంప్లింగ్

శాంప్లింగ్ అనేది శక్తివంతమైన MCP లక్షణం, ఇది సర్వర్లు క్లయింట్ ద్వారా LLM కంప్లీషన్స్‌ను అభ్యర్థించడానికి అనుమతిస్తుంది, భద్రత మరియు గోప్యతను కాపాడుకుంటూ సాంకీర్తిక ఏజెంటిక్ ప్రవర్తనలను సాధిస్తుంది. సరైన శాంప్లింగ్ కాన్ఫిగరేషన్ స్పందన నాణ్యత మరియు పనితీరును గణనీయంగా మెరుగుపరుస్తుంది. MCP నిర్దిష్ట పారామితులు ఉపయోగించి మోడల్స్ ఎలా వచనం ఉత్పత్తి చేస్తాయనే నియంత్రణ కోసం ప్రమాణీకృత మార్గాన్ని అందిస్తుంది, వీటివల్ల యాదృచ్చికత్వం, సృజనాత్మకత మరియు సమగ్రత ప్రభావితం అవుతాయి.

## పరిచయం

ఈ పాఠంలో, మేము MCP అభ్యర్థనల్లో శాంప్లింగ్ పారామితులను ఎలా కాన్ఫిగర్ చేయాలో మరియు శాంప్లింగ్ యొక్క ప్రాథమిక ప్రోటోకాల్ మెకానిక్స్‌ను గ్రహించనున్నాము.

## నేర్చుకునే లక్ష్యాలు

ఈ పాఠం ముగింపు వరకు, మీరు చేయగలరు:

- MCPలో అందుబాటులో ఉన్న ప్రధాన శాంప్లింగ్ పారామితులను అర్థం చేసుకోవడం.
- వివిధ ఉపయోగాల కోసం శాంప్లింగ్ పారామితులను కాన్ఫిగర్ చేయడం.
- పునరుత్పాదక ఫలితాల కోసం డిటర్మినిస్టిక్ శాంప్లింగ్‌ను అమలు చేయడం.
- సందర్భం మరియు వినియోగదారుల ప్రాధాన్యాల ఆధారంగా శాంప్లింగ్ పారామితులను గమనీయంగా సర్దుబాటు చేయడం.
- వివిధ పరిస్థితుల్లో మోడల్ పనితీరును మెరుగుపరచడానికి శాంప్లింగ్ వ్యూహాలను వర్తింపజేయడం.
- MCP యొక్క క్లయింట్-సర్వర్ ప్రవాహంలో శాంప్లింగ్ ఎలా పనిచేస్తుందో అర్థం చేసుకోవడం.

## MCPలో శాంప్లింగ్ ఎలా పనిచేస్తుంది

MCPలో శాంప్లింగ్ ప్రవాహం ఈ దశలను అనుసరిస్తుంది:

1. సర్వర్ `sampling/createMessage` అభ్యర్థనను క్లయింట్‌కు పంపిస్తుంది
2. క్లయింట్ అభ్యర్థనను సమీక్షించి దానిని మార్చుకోవచ్చు
3. క్లయింట్ LLM నుండి శాంపుల్ చేస్తుంది
4. క్లయింట్ కంప్లీషన్‌ను సమీక్షిస్తుంది
5. క్లయింట్ ఫలితాన్ని సర్వర్‌కి తిరిగి పంపిస్తుంది

ఈ "మానవ-ఇన్-ది-లూప్" డిజైన్ వినియోగదారులు LLM చూస్తున్నది మరియు ఉత్పత్తి చేస్తున్నదాన్ని నియంత్రించడాన్ని నిర్ధారిస్తుంది.

## శాంప్లింగ్ పారామితుల అవలోకనం

MCP క్రింది శాంప్లింగ్ పారామితులను నిర్వచిస్తుంది, ఇవి క్లయింట్ అభ్యర్థనల్లో కాన్ఫిగర్ చేయవచ్చు:

| పారామిటర్ | వివరణ | సాధారణ పరిధి |
|-----------|-------------|---------------|
| `temperature` | టోకెన్ ఎంపికలో యాదృచ్చికతను నియంత్రిస్తుంది | 0.0 - 1.0 |
| `maxTokens` | ఉత్పత్తి చేయాల్సిన గరిష్ట టోకెన్ల సంఖ్య | పూర్తి సంఖ్య |
| `stopSequences` | కనిపించినప్పుడు ఉత్పత్తిని ఆపే అనుకూల క్రమాలు | స్ట్రింగ్‌లతో కూడిన అర్రే |
| `metadata` | అదనపు ప్రొవైడర్-స్పెసిఫిక్ పారామితులు | JSON ఆబ్జెక్ట్ |

అనేక LLM ప్రొవైడర్లు `metadata` ఫీల్డ్ ద్వారా అదనపు పారామితులను మద్దతుగా ఇస్తారు, వీటిలో ఉండవచ్చు:

| సాధారణ ఎక్స్‌టెన్షన్ పారామీటర్ | వివరణ | సాధారణ పరిధి |
|-----------|-------------|---------------|
| `top_p` | న్యూక్లియస్ శాంప్లింగ్ - టోకెన్లు టాప్ కూడిన సాంఘిక సాదృశ్యతకి పరిమితం | 0.0 - 1.0 |
| `top_k` | టోకెన్ ఎంపికను టాప్ K ఎంపికలకు పరిమితం చేస్తుంది | 1 - 100 |
| `presence_penalty` | ఇప్పటివరకూ ఉన్న వచనంలో టోకెన్ ప్రస్తుతి ఆధారంగా శిక్షిస్తుంది | -2.0 - 2.0 |
| `frequency_penalty` | ఇప్పటివరకూ ఉన్న వచనంలో టోకెన్ సాంద్రత ఆధారంగా శిక్షిస్తుంది | -2.0 - 2.0 |
| `seed` | పునరుత్పాదక ఫలితాల కోసం ప్రత్యేక యాదృచ్చిక బీపు | పూర్తి సంఖ్య |

## ఉదాహరణ అభ్యర్థన ఫార్మాట్

MCPలో క్లయింట్ నుండి శాంప్లింగ్ అభ్యర్థించడం యొక్క ఉదాహరణ ఇక్కడ ఉంది:

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

## ప్రతిస్పందన ఫార్మాట్

క్లయింట్ కంప్లీషన్ ఫలితాన్ని తిరిగి ఇస్తుంది:

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

## మానవ నియంత్రణలు

MCP శాంప్లింగ్ మానవ పర్యవేక్షణతో డిజైన్ చేయబడి ఉంటుంది:

- **ప్రాంప్ట్స్ కోసం**:
  - క్లయింట్లు యూజర్లకు ప్రతిపాదించిన ప్రాంప్ట్ చూపించాలి
  - యూజర్లు ప్రాంప్ట్‌లను మార్చగలుగాలి లేదా తిరస్కరించగలుగాలి
  - సిస్టమ్ ప్రాంప్ట్‌లు ఫిల్టర్ చేయబడవచ్చు లేదా మార్చబడవచ్చు
  - సందర్భం చేర్చడం క్లయింట్ ద్వారా నియంత్రించబడుతుంది

- **కంప్లీషన్స్ కోసం**:
  - క్లయింట్లు యూజర్లకు కంప్లీషన్ చూపించాలి
  - యూజర్లు కంప్లీషన్‌లను మార్చగలగాలి లేదా తిరస్కరించగలగాలి
  - క్లయింట్లు కంప్లీషన్‌లను ఫిల్టర్ చేయగలవు లేదా మార్చగలవు
  - యూజర్లు వాడే మోడల్‌ను నియంత్రిస్తారు

ఈ సూత్రాలను దృష్టిలో ఉంచుకుని, మేము వివిధ ప్రోగ్రామింగ్ భాషల్లో సాధారణంగా మద్దతున్న మోడల్ ప్రొవైడర్లలో శాంప్లింగ్‌ను ఎలా అమలు చేయాలో పరిశీలిద్దాం.

## భద్రత పరిగణనలు

MCPలో శాంప్లింగ్‌ను అమలు చేస్తప్పుడు ఈ భద్రత ఉత్తమ పద్ధతులను పరిగణించాలి:

- **అన్ని సందేశ కంటెంట్ సరైనదిగా ధృవీకరించండి** క్లయింట్‌కు పంపించడానికి ముందు
- **సున్నిత సమాచారం శుభ్రీకరణ** ప్రాంప్ట్‌లు మరియు కంప్లీషన్‌ల నుండి
- **వాడకాన్ని నియంత్రించడానికి రేట్ పరిమితులను అమలు చేయండి**
- **అసాధారణ నమూనాల కోసం శాంప్లింగ్ ఉపయోగాన్ని పర్యవేక్షించండి**
- **డేటాను సురక్షిత ప్రోటోకాల్స్ తో రహదారి లో సంకేతలేఖనం చేయండి**
- **సంబంధిత నియమాల ప్రకారం వినియోగదారుల గోప్యత నిర్వహణ**
- **సామర్థ్య మరియు భద్రత కోసం శాంప్లింగ్ అభ్యర్థనల ఆడిట్ చేయండి**
- **చెల్లింపు వ్యయాన్ని నియంత్రించడానికి సరైన పరిమితులతో నియంత్రణ చేయండి**
- **శాంప్లింగ్ అభ్యర్థనలకు టైమ్ అవుట్లు అమలు చేయండి**
- **మోడల్ లో తప్పులని సున్నితంగా నిర్వహించండి సరైన పునరుద్ధరణలతో**

శాంప్లింగ్ పారామితులు భాషా మోడల్స్ ప్రవర్తనను సున్నితంగా ట్యూన్ చేయడానికి అనుమతిస్తూ, డిటర్మినిస్టిక్ మరియు సృజనాత్మక అవుట్‌పుట్ల మధ్య ఇష్టమైన సమతుల్యాన్ని సాధిస్తాయి.

ఈ పారామితులను వివిధ ప్రోగ్రామింగ్ భాషల్లో ఎలా కాన్ఫిగర్ చేయాలో చూద్దాం.

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

ముందువచ్చిన కోడ్లో మనం:

- ఒక MCP క్లయింట్ను నిర్దిష్ట సర్వర్ URLతో సృష్టించాము.
- `temperature`, `top_p`, మరియు `top_k` వంటి శాంప్లింగ్ పారామితులతో ఒక అభ్యర్థనను కాన్ఫిగర్ చేశాము.
- అభ్యర్థనను పంపించి ఉత్పన్నమైన వచనాన్ని ప్రింట్ చేశాము.
- ఈ విధంగా ఉపయోగించాము:
    - ఉత్పత్తి సమయంలో మోడల్‌ను ఉపయోగించే టూల్స్‌ను పేర్కొనడానికి `allowedTools`. ఈ సందర్భంలో, క్రియేటివ్ యాప్ ఆలోచనలను సృష్టించడానికి `ideaGenerator` మరియు `marketAnalyzer` టూల్స్ అనుమతించాము.
    - అవుట్‌పుట్ లో పునరావృతం మరియు వైవిధ్యాన్ని నియంత్రించడానికి `frequencyPenalty` మరియు `presencePenalty`.
    - అధిక విలువలు మరింత సృజనాత్మక స్పందనలకు దారితీసే యాదృచ్చికతను నియంత్రించడానికి `temperature`.
    - టోకెన్ల ఎంపికను గుణాత్మకంగా మెరుగుపరచడానికి టాప్ సాంఘిక సామర్థ్యానికి కలిపే టోకెన్ల వరకు పరిమితం చేయడానికి `top_p`.
    - మోడల్‌ను టాప్ K అత్యంత సాదృశ్యమైన టోకెన్ల వరకు పరిమితం చేయడానికి `top_k`, ఇది మరింత సమగ్రంగా స్పందనలు ఇవ్వడంలో సహాయం చేస్తుంది.
    - ఉత్పన్న వచనంలో పునరావృతం తగ్గించడానికి మరియు వైవిధ్యాన్ని ప్రోత్సహించడానికి `frequencyPenalty` మరియు `presencePenalty`.

# [JavaScript](#tab/javascript)

```javascript
// జావాస్క్రిప్ట్ ఉదాహరణ: ఉష్ణోగ్రత మరియు టాప్-పీ నమూనా కన్ఫిగరేషన్
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP క్లయింట్‌ని ప్రాథమికంగా సెట్ చేయండి
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // వేర్వేరు నమూనా పరామితులతో అభ్యర్థనను కన్ఫిగర్ చేయండి
  const creativeSampling = {
    temperature: 0.9,    // ఎక్కువ ఉష్ణోగ్రత = ఎక్కువ యాదృచ్ఛికత్వం/సృజనాత్మకత
    topP: 0.92,          // టోకెన్లను టాప్ 92% సాంద్రత గొలిపే అవకాశం పరిగణించండి
    frequencyPenalty: 0.6, // టోకెన్ వరుసల పునరావృతం తగ్గించండి
    presencePenalty: 0.4   // ఇప్పటివరకు టెక్స్ట్‌లో ఉన్న టోకెన్లకు శిక్ష విధించండి
  };
  
  const factualSampling = {
    temperature: 0.2,    // తక్కువ ఉష్ణోగ్రత = మరింత నిర్దిష్టమైన/నిజమైనది
    topP: 0.85,          // కొంతమేరే కేంద్రీకృత టోకెన్ ఎంపిక
    frequencyPenalty: 0.2, // తక్కువగా పునరావృత శిక్ష
    presencePenalty: 0.1   // తక్కువగా ప్రస్తుతత శిక్ష
  };
  
  try {
    // వేర్వేరు నమూనా సెటింగ్లతో రెండు అభ్యర్థనల్ని పంపండి
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

ముందువచ్చిన కోడ్లో మనం:

- సర్వర్ URL మరియు API కీతో MCP క్లయింట్ను ప్రారంభించాము.
- రెండు శాంప్లింగ్ పారామితుల సెట్‌లను సృష్టించాము: ఒకటి సృజనాత్మక పనుల కోసం, మరొకటి వాస్తవిక పనుల కోసం.
- ఈ కాన్ఫిగరేషన్లతో అభ్యర్థనలు పంపించి, మోడల్ యోగ్యత ప్రాజెక్ట్ చేసేందుకు ప్రతి పనికి ప్రత్యేక టూల్స్ ఉపయోగించగలిగిందిగా చేసింది.
- వివిధ శాంప్లింగ్ పారామితుల ప్రభావాలను చూపించడానికి ఉత్పన్న స్పందనలను ముద్రించాము.
- ఉత్పత్తి సమయంలో మోడల్ ఉపయోగించే టూల్స్‌ను పేర్కొనడానికి `allowedTools` ఉపయోగించాము. ఈ సందర్భంలో, సృజనాత్మక పనులకు `ideaGenerator` మరియు `environmentalImpactTool`, వాస్తవిక పనులకు `factChecker` మరియు `dataAnalysisTool` అనుమతించాము.
- అధిక విలువలు మరింత సృజనాత్మక స్పందనలకు దారితీసే యాదృచ్చికతను నియంత్రించడానికి `temperature` ఉపయోగించాము.
- టోకెన్ల ఎంపికను గుణాత్మకంగా మెరుగుపరచడానికి టాప్ సాంఘిక సామర్థ్యానికి కలిపే టోకెన్ల వరకు పరిమితం చేయడానికి `top_p` ఉపయోగించాము.
- పునరావృతాన్ని తగ్గించి వైవిధ్యాన్ని ప్రోత్సహించడానికి `frequencyPenalty` మరియు `presencePenalty` ఉపయోగించాము.
- మరింత సమగ్రంగా ప్రతిస్పందనలు అందించేందుకు మోడల్‌ను టాప్ K టోకెన్ల వరకు పరిమితం చేయడానికి `top_k` ఉపయోగించాము.

---

## డిటర్మినిస్టిక్ శాంప్లింగ్

కచ్చితమైన అవుట్‌పుట్‌లను కోరుకునే అనువర్తనాల కోసం, డిటర్మినిస్టిక్ శాంప్లింగ్ పునరుత్పాదక ఫలితాలను నిర్ధారిస్తుంది. దీని కోసం ఫిక్స్ అయ్యే యాదృచ్చిక బీపు మరియు సున్నా ఉష్ణోగ్రత ఉపయోగిస్తుంది.

వివిధ ప్రోగ్రామింగ్ భాషల్లో డిటర్మినిస్టిక్ శాంప్లింగ్‌ను చూపించేందుకు క్రింది ఉదాహరణ అమలును చూద్దాం.

# [Java](#tab/java)

```java
// Java ఉదాహరణ: స్థిరమైన సీడ్‌తో నిర్ధారిత ప్రతిస్పందనలు
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // స్థిరమైన ఫలితాల కోసం స్థిర సీడ్ ఉపయోగించడం
        
        // స్థిర సీడ్‌తో తొలి అభ్యర్థన
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // అత్యధిక నిర్ధారితత్వానికి శూన్య ఉష్ణోగ్రత
            .build();
            
        // అదే సీడ్‌తో రెండో అభ్యర్థన
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // రెండు అభ్యర్థనలను అమలు చేయండి
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // ఒకే సీడ్ మరియు తాపన=0 కారణంగా ప్రతిస్పందనలు ఒకే విధంగా ఉండాలి
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

ముందువచ్చిన కోడ్లో మనం:

- నిర్దిష్ట సర్వర్ URLతో MCP క్లయింట్ను సృష్టించాము.
- ఒకనే ప్రాంప్ట్, ఫిక్స్ అయ్యే బీపు, మరియు సున్నా ఉష్ణోగ్రతతో రెండు అభ్యర్థనలను కాన్ఫిగర్ చేశాము.
- రెండూ పంపించి, ఉత్పన్న వచనాన్ని ప్రింట్ చేశాము.
- సమానమైన ప్రతిస్పందనలు అనేవి శాంప్లింగ్ కాన్ఫిగరేషన్ డిటర్మినిస్టిక్ స్వభావం వల్ల వస్తాయనే విషయం చూపించాము (సమానమైన బీపు మరియు ఉష్ణోగ్రత).
- ఫిక్స్ అయ్యే యాదృచ్చిక బీపును నిర్దేశించడానికి `setSeed` ఉపయోగించాము, దీంతో అదే ఇన్‌పుట్‌కు మోడల్ ఎప్పుడూ అదే అవుట్‌పుట్ ఉత్పత్తి చేస్తుంది.
- అధిక డిటర్మినిజం కోసం `temperature` ను సున్నాకు సెట్ చేశాము, అంటే మోడల్ ఎప్పుడూ అత్యంత సాదృశ్యమైన తదుపరి టోకెన్‌ని ఎంచుకుంటుంది, యాదృచ్చికం లేకుండా.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// జావాస్క్రిప్టు ఉదాహరణ: సీడ్ నియంత్రణతో నిర్ణీత ప్రతిస్పందనలు
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // స్థిర సీడ్తో మొదటి అభ్యర్థన
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // గరిష్ట నిర్ణీతత్వం కోసం శూన్య తాపన
    });
    
    // అదే సీడ్ మరియు తాపనతో రెండవ అభ్యర్థన
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // వేరే సీడ్తో కానీ అదే తాపనతో మూడవ అభ్యర్థన
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

ముందువచ్చిన కోడ్లో మనం:

- సర్వర్ URLతో MCP క్లయింట్ను ప్రారంభించాము.
- ఒకనే ప్రాంప్ట్, ఫిక్స్ అయ్యే బీపు, మరియు సున్నా ఉష్ణోగ్రతతో రెండు అభ్యర్థనలను కాన్ఫిగర్ చేశాము.
- రెండూ పంపించి, ఉత్పన్న వచనాన్ని ప్రింట్ చేశాము.
- సమానమైన ప్రతిస్పందనలు శాంప్లింగ్ కాన్ఫిగరేషన్ డిటర్మినిస్టిక్ స్వభావం వల్ల వస్తాయని చూపించాము (సమానమైన బీపు మరియు ఉష్ణోగ్రత).
- ఫిక్స్ అయ్యే యాదృచ్చిక బీపును నిర్దేశించడానికి `seed` ఉపయోగించాము, అదే ఇన్‌పుట్‌కు మోడల్ ఎప్పుడూ అదే అవుట్‌పుట్ ఉత్పత్తి చేస్తుందని నిర్ధారించడానికి.
- అధిక డిటర్మినిజం కోసం `temperature` ను సున్నాకు సెట్ చేశాము, అంటే మోడల్ ఎప్పుడూ అత్యంత సాదృశ్యమైన తదుపరి టోకెన్‌ని ఎంచుకుంటుంది.
- మూడవ అభ్యర్థన కోసం వేరే బీపు ఉపయోగించి, అదే ప్రాంప్ట్ మరియు ఉష్ణోగ్రతతోనూ బీపు మార్చడం వలన వేరే అవుట్‌పుట్ వస్తుందని చూపించాము.

---

## డైనమిక్ శాంప్లింగ్ కాన్ఫిగరేషన్

తెలివైన శాంప్లింగ్ ప్రతి అభ్యర్థన సందర్భం మరియు అవసరాల ఆధారంగా పారామితులను సరిపడుగా మార్చుకుంటుంది. అంటే పని రకం, వినియోగదారు ప్రాధాన్యాలు లేదా చారిత్రక పనితీరు ఆధారంగా `temperature`, `top_p`, మరియు శిక్షణలను డైనమిక్‌గా సర్దుకోవడం.

వివిధ ప్రోగ్రామింగ్ భాషల్లో డైనమిక్ శాంప్లింగ్‌ను ఎలా అమలు చేయాలో చూద్దాం.

# [Python](#tab/python)

```python
# పైథాన్ ఉదాహరణ: అభ్యర్థన సందర్భం ఆధారంగా డైనమిక్ శాంప్లింగ్
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # వేర్వేరు పనుల కోసం శాంప్లింగ్ ప్రీసెట్స్ నిర్వచించండి
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # బేస్ ప్రీసెట్‌ను ఎంచుకోండి
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # వినియోగదారు ఇష్టాలను ఆధారపడి సవరించండి
        if user_preferences:
            if "creativity_level" in user_preferences:
                # సృజనాత్మకత ఇష్టంపై ఆధారపడి ఉష్ణోగ్రత ఆపరించినంతగా పెంచండి (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # సవాలు చేసిన స్పందన వైవిధ్యాన్ని ఆధారంగా top_p సర్దుబాటు చేయండి
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # అనుకూల శాంప్లింగ్ పారామితులతో అభ్యర్థన సృష్టించి పంపండి
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # పారదర్శకత్వానికి శాంప్లింగ్ మెటాడేటా తో కలిసి స్పందనను తిరిగి ఇవ్వండి
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

ముందువచ్చిన కోడ్లో మనం:

- అనుకూల శాంప్లింగ్‌ను నిర్వహించేందుకు `DynamicSamplingService` తరగతిని సృష్టించాము.
- వివిధ పని రకాలకు (సృజనాత్మక, వాస్తవిక, కోడింగ్, విశ్లేషణాత్మక) శాంప్లింగ్ ప్రీసెట్లను నిర్వచించాము.
- పని రకం ఆధారంగా ప్రాథమిక శాంప్లింగ్ ప్రీసెట్‌ను ఎంచుకున్నాము.
- వినియోగదారుల క్రియేటివిటీ మరియు వైవిధ్య స్థాయిలాంటి ప్రాధాన్యాల ఆధారంగా శాంప్లింగ్ పారామితులను సర్దుబాటు చేసాము.
- డైనమిక్ కాన్ఫిగర్డ్ శాంప్లింగ్ పారామితులతో అభ్యర్థనను పంపాము.
- పారదర్శకత కోసం ఉత్పన్న వచనం, శాంప్లింగ్ పారామితులు మరియు పని రకాన్ని తిరిగి ఇచ్చాము.
- అధిక విలువలు మరింత సృజనాత్మక స్పందనలకు దారితీసే యాదృచ్చికతను నియంత్రించడానికి `temperature` ఉపయోగించాము.
- టోకెన్ల ఎంపికను గుణాత్మకంగా మెరుగుపరచడానికి టాప్ సాంఘిక సామర్థ్యానికి కలిపే టోకెన్ల వరకు పరిమితం చేయడానికి `top_p` ఉపయోగించాము.
- పునరావృతాన్ని తగ్గించేందుకు `frequency_penalty` ఉపయోగించాము మరియు వైవిధ్యాన్ని ప్రోత్సహించాము.
- వినియోగదారుల నిర్వచించిన క్రియేటివిటీ మరియు వైవిధ్య స్థాయిల ఆధారంగా శాంప్లింగ్ పారామితులు అనుకూలీకరించడానికి `user_preferences` ఉపయోగించాము.
- అభ్యర్థనకు సరైన శాంప్లింగ్ వ్యూహాన్ని ఎంచుకునేందుకు `task_type` ఉపయోగించాము, ఇది పని స్వభావం ఆధారంగా మరింత లక్ష్యంగా చేయబడిన ప్రత్యుత్తరాలను అనుమతిస్తుంది.
- కాన్ఫిగర్డ్ శాంప్లింగ్ పారామితులతో ప్రాంప్ట్ పంపేందుకు `send_request` విధానాన్ని ఉపయోగించాము, మోడల్ குறிப்பிடిన అవసరాలకు అనుగుణంగా వచనం ఉత్పత్తి చేయడానికి.
- మోడల్ ప్రతిస్పందనను పునఃప్రాప్తి చేసేందుకు `generated_text` ను ఉపయోగించి, శాంప్లింగ్ పారామితులు మరియు పని రకం సహా విశ్లేషణ లేదా ప్రదర్శన కోసం తిరిగి ఇచ్చాము.
- చెల్లని శాంప్లింగ్ కాన్ఫిగరేషన్లను నివారించేందుకు వినియోగదారు ప్రాధాన్యాలను చెల్లుబాటు అయ్యే పరిధుల్లో ఆంకితంగా ఉంచేందుకు `min` మరియు `max` ఫంక్షన్లు ఉపయోగించాము.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// జావాస్క్రిప్ట్ ఉదాహరణ: వినియోగదారుడి పరిస్తితుల ఆధారంగా డైనమిక్ సాంప్లింగ్ కాన్ఫిగరేషన్
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // బేస్ సాంప్లింగ్ ప్రొఫైల్స్ నిర్వచించండి
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // చారిత్రక పనితీరును ట్రాక్ చేయండి
    this.performanceHistory = [];
  }
  
  // ప్రాంప్ట్ నుండి పనివర్గం గుర్తించండి
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // సింపుల్ హ్యూరిస్టిక్ గుర్తింపు - ML వర్గీకరణతో మెరుగుపరచవచ్చు
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
    
    // స్పష్టమైన వర్గం గుర్తించకపోతే డిఫాల్ట్‌గా సంభాషణాత్మకంగా నిర్ణయించండి
    return 'conversational';
  }
  
  // పరిసరాలు మరియు వినియోగదారుల ఇష్టం ఆధారంగా సాంప్లింగ్ పరిమాణాలను గణించండి
  getSamplingParameters(prompt, context = {}) {
    // పనివర్గాన్ని గుర్తించండి
    const taskType = this.detectTaskType(prompt, context);
    
    // బేస్ ప్రొఫైల్ పొందండి
    let params = {...this.samplingProfiles[taskType]};
    
    // వినియోగదారుల ఇష్టాల ప్రకారం సర్దుబాటు చేయండి
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 నుండి అనుకూలమైన తాపమానం పరిధికి స్కేలు చేయండి
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // ఎక్కువ ఖచ్చితత్వం అంటే తక్కువ topP (మరింత కేంద్రీకృత ఎంపిక)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // ఎక్కువ సమంజసత్వం అంటే తక్కువ శిక్షలు
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // పనితీరు చారిత్రం నుండి నేర్చిన సర్దుబాట్లను వర్తించండి
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // సాధారణ అనుకూల తర్కం - మరింత జటిల అల్గోరిథమ్లతో మెరుగుపరచవచ్చు
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // ఇటీవల చారిత్రం మాత్రమే పరిగణించండి
    
    if (relevantHistory.length > 0) {
      // సగటు పనితీరు స్కోర్లు గణించండి
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // పనితీరు తక్కువైతే పరిమాణాలను సర్దుబాటు చేయండి
      if (avgScore < 0.7) {
        // సురక్షిత విలువల వైపు తేడా
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // భవిష్యత్తు సర్దుబాట్ల కోసం పనితీరును రికార్డు చేయండి
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // ప్రతిస్పందన నాణ్యత 0-1 రేటింగ్
    });
    
    // చారిత్ర పరిమాణాన్ని గడువు పెట్టండి
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ఆప్టిమైజ్ చేయబడిన సాంప్లింగ్ పరిమాణాలను పొందండి
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ఆప్టిమైజ్ చేసిన పరిమాణాలతో అభ్యర్థన పంపండి
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // వినియోగదారు प्रतिक्रिया ఇస్తే, భవిష్యత్తు ఆప్టిమైజేషన్ కోసం దాన్ని రికార్డు చేయండి
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

// ఉదాహరణ వాడకం
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // వినియోగదారుల ఇష్టాలకు అనుకూలమైన సృజనాత్మక పని
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // అధిక సృజనాత్మకత (1-10)
          consistency: 3  // తక్కువ సమంజసత్వం (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // కోడ్ ఉత్పత్తి పని
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // తక్కువ సృజనాత్మకత
          precision: 8,   // అధిక ఖచ్చితత్వం
          consistency: 9  // అధిక సమంజసత్వం
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

ముందువచ్చిన కోడ్లో మనం:

- పని రకం మరియు వినియోగదారు ప్రాధాన్యాల ఆధారంగా డైనమిక్ శాంప్లింగ్ నిర్వహించేందుకు `AdaptiveSamplingManager` తరగతిని సృష్టించాము.
- వివిధ పని రకాలకు (సృజనాత్మక, వాస్తవిక, కోడింగ్, సంభాషణాత్మక) శాంప్లింగ్ ప్రొఫైళ్లను నిర్వచించాము.
- సరళమైన అంచనాలు ఉపయోగించి ప్రాంప్ట్ నుండి పని రకాన్ని గుర్తించే విధానాన్ని అమలు చేశాము.
- గుర్తించిన పని రకం మరియు వినియోగదారు ప్రాధాన్యాల ఆధారంగా శాంప్లింగ్ పారామితులను లెక్కించాము.
- చారిత్రక పనితీరు ఆధారంగా నేర్చుకున్న సర్దుబాట్లను అన్వయించి శాంప్లింగ్ పారామితులను మెరుగుపరిచాము.
- భవిష్యత్తు సర్దుబాట్ల కోసం పనితీరు రికార్డులను నిల్వచేశాము, ఇది గత పరస్పర చర్యల నుండి వ్యవస్థకు నేర్చుకునేందుకు అనుమతిస్తుంది.
- డైనమిక్ కాన్ఫిగర్డ్ శాంప్లింగ్ పారామితులతో అభ్యర్థనలు పంపించి, చిరునామాలను అప్లై చేసి గుర్తించిన పని రకం పాటు ఉత్పన్న వచనాన్ని తిరిగి ఇచ్చాము.
- ఈ విధంగా ఉపయోగించాము:
    - వినియోగదారు నిర్వచిత క్రియేటివిటీ, ఖచ్చితత్వం మరియు స్థిరత్వం స్థాయిల ఆధారంగా శాంప్లింగ్ పారామితులను అనుకూలీకరించడానికి `userPreferences`.
    - ప్రాంప్ట్ ఆధారంగా పని స్వభావాన్ని నిర్ణయించడానికి `detectTaskType`, దీని ద్వారా వివిధ రకాల అభ్యర్థనలకు సరైన శాంప్లింగ్ వ్యూహాలను వర్తింపజేయవచ్చు.
    - ఉత్పన్న ప్రతిస్పందన పనితీరు లాగ్ చెయ్యడానికి `recordPerformance`, ఇది వ్యవస్థకు కాలక్రమేణా మెరుగుపడటానికి సహాయపడుతుంది.
    - చారిత్రక పనితీరు ఆధారంగా శాంప్లింగ్ పారామితులను మార్పు చేయడానికి `applyLearnedAdjustments`, ఇది మోడల్ యొక్క ప్రతిస్పందన నాణ్యతను మెరుగుపరుస్తుంది.
    - వివిధ ప్రాంప్ట్‌లు మరియు సందర్భాలతో కాల్ చేయడాన్ని సులభతరం చేసే సవ్యమైన శాంప్లింగ్‌తో ప్రత్యుత్తరాన్ని ఉత్పత్తి చేసే `generateResponse`.
    - ఉత్పత్తి సమయంలో మోడల్ ఉపయోగించే టూల్స్‌ను సూచించడానికి `allowedTools`, ఇది మరింత సందర్భ-సైన్యం ప్రత్యుత్తరాలను అనుమతిస్తుంది.
    - ఉత్పత్తి నాణ్యతపై వినియోగదారుల నుండి అభిప్రాయాన్ని అందుకోవడానికి `feedbackScore`, దీని ద్వారా మోడల్ పనితీరును మరింత మెరుగుపరచవచ్చు.
    - గత పరస్పర చర్యల రికార్డులను నిర్వహించడానికి `performanceHistory`, ఇది వ్యవస్థకు విజయాలు మరియు విఫలతల నుండి నేర్చుకునేందుకు సహాయం చేస్తుంది.
    - అభ్యర్థన సందర్భం ఆధారంగా శాంప్లింగ్ పారామితులను గమనీయంగా సర్దుబాటు చేయడానికి `getSamplingParameters`, ఇది మరింత అనుకూల, స్పందనాత్మక మోడల్ ప్రవర్తనను అనుమతిస్తుంది.
    - ప్రాంప్ట్ ఆధారంగా పని రకాన్ని వర్గీకరించడానికి `detectTaskType`, ఇది వివిధ రకాల అభ్యర్థనలకు సరైన శాంప్లింగ్ వ్యూహాలను వర్తింపజేస్తుంది.
    - వివిధ పని రకాలకు ప్రాథమిక శాంప్లింగ్ కాన్ఫిగరేషన్లను నిర్వచించడానికి `samplingProfiles`, ఇది అభ్యర్థన స్వభావం ఆధారంగా త్వరితగతిన సర్దుబాట్లకు సహాయపడుతుంది.

---

## తదుపరి ఏమిటి

- [5.7 స్కేలింగ్](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->