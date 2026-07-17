> [డిప్రికేట్ చేయబడింది: 2026-07-28 రిలీజ్ కాండిడేట్](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్‌లో సాంప్లింగ్

> **డిప్రికేషన్ నోటిస్:** `2026-07-28` MCP స్పెసిఫికేషన్ రిలీజ్ కాండిడేట్ డైరెక్ట్ LLM ప్రొవైడర్ APIలతో సమ్మేళనం మార్గంలో సాంప్లింగ్‌ను డిప్రికేట్ చేసింది. సాంప్లింగ్ `2025-11-25` లో మరియు ఎలాంటి అధికారిక డిప్రికేషన్ తర్వాత కనీసం ఒక సంవత్సరం పనిచేస్తుంది, కాబట్టి ఈ పాఠంలోని అన్ని విషయాలు సరైనవి - కానీ కొత్త సర్వర్ డిజైన్లు ప్రత్యామ్నాయ నమూనాను మదిస్తుండాలి. వివరాలకు [MCP లో ఏమి మారుతున్నది: 2026-07-28 విడుదల కాండిడేట్](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) చూడండి.

సాంప్లింగ్ అనేది MCP లో ఒక శక్తివంతమైన ఫీచర్, ఇది సర్వర్‌లకు క్లయింట్ ద్వారా LLM పూర్తి చేయింపులను అభ్యర్థించడానికి అనుమతిస్తుంది, అందువలన శక్తివంతమైన ఏజెంట్ ప్రవర్తనలు మరియు భద్రత మరియు గోప్యతను పాటించడం సులభం అవుతుంది. సరైన సాంప్లింగ్ కాన్ఫిగరేషన్ ప్రతిస్పందన యొక్క నాణ్యత మరియు పనితీరును గణనీయంగా మెరుగుపరుస్తుంది. MCP భాషా మోడల్స్ ఎలా టెక్స్ట్ సృష్టిస్తాయో నియంత్రించడానికి సాంప్లింగ్ ప్రత్యేక పారామితులను నియంత్రించడానికి ఒక ప్రమాణీకృత మార్గాన్ని అందిస్తుంది, ఇవి యాదృచ్చికత, సృజనాత్మకత, మరియు అనుసంధానం వంటి అంశాలను ప్రభావితం చేస్తాయి.

## పరిచయం

ఈ పాఠంలో, మనము MCP అభ్యర్థనలలో సాంప్లింగ్ పారామితులను ఎలా కాన్ఫిగర్ చేయాలో మరియు సాంప్లింగ్ ప్రోటోకాల్ యొక్క అంతర్గత యాంత్రికతను ఎలా అర్థం చేసుకోవాలో అధ్యయనం చేస్తాము.

## నేర్చుకునే లక్ష్యాలు

ఈ పాఠం చివరికి, మీరు సాదించగలుగుతారు:

- MCP లో అందుబాటులో ఉన్న ప్రధాన సాంప్లింగ్ పారామితులను అర్థం చేసుకోవడం.
- వివిధ ఉపయోగాల కోసం సాంప్లింగ్ పారామితులను కాన్ఫిగర్ చేయడం.
- పునఃప్రాప్తి సాధించడానికి నిర్ణీత సాంప్లింగ్‌ను అమలు చేయడం.
- సందర్భం మరియు వినియోగదారుల ఇష్టాలకు అనుగుణంగా సాంప్లింగ్ పారామితులను గమనించుకోవడం.
- వివిధ సందర్భాలలో మోడల్ పనితీరును మెరుగుపర్చేందుకు సాంప్లింగ్ వ్యూహాలను ఉపయోగించడం.
- MCP యొక్క క్లయింట్-సర్వర్ ప్రవాహంలో సాంప్లింగ్ ఎలా పనిచేస్తుందో అర్థం చేసుకోవడం.

## MCP లో సాంప్లింగ్ ఎలా పనిచేస్తుంది

MCP లో సాంప్లింగ్ ప్రవాహం ఈ దశలను అనుసరిస్తుంది:

1. సర్వర్ `sampling/createMessage` అభ్యర్థనను క్లయింట్‌కు పంపుతుంది
2. క్లయింట్ అభ్యర్థనను సమీక్షించి దానిని మార్చవచ్చు
3. క్లయింట్ LLM నుండి నమూనా తీసుకుంటుంది
4. క్లయింట్ పూర్తి చేయడాన్ని సమీక్షిస్తుంది
5. క్లయింట్ ఫలితాన్ని సర్వర్‌కు తిరిగి ఇస్తుంది

ఈ హ్యూమన్-ఇన్-ది-లూప్ డిజైన్ వినియోగదారులు LLM చూడటం మరియు సృష్టించేది పై నియంత్రణ కలిగి ఉండటానికి నిర్ధారిస్తుంది.

## సాంప్లింగ్ పారామితుల అవలోకనం

MCP లో క్లయింట్ అభ్యర్థనలలో అందుబాటులో ఉండే సాంప్లింగ్ పారామితులు ఇవి:

| పారామితి | వివరణ | సాదారణ పరిధి |
|-----------|-------------|---------------|
| `temperature` | టోకెన్ ఎంపికలో యాదృచ్చికతను నియంత్రిస్తుంది | 0.0 - 1.0 |
| `maxTokens` | సృష్టించాల్సిన తీవ్రల యొక్క గరిష్ఠ సంఖ్య | పూర్ణ సంఖ్య |
| `stopSequences` | కనిపించినప్పుడు సృష్టించడం ఆపే కస్టమ్ సీక్వెన్సులు | స్ట్రింగ్‌ల శ్రేణి |
| `metadata` | అదనపు ప్రొవైడర్-విశేష పారామితులు | JSON ఆబ్జెక్ట్ |

బహుళ LLM ప్రొవైడర్లు `metadata` ఫీల్డ్ ద్వారా అదనపు పారామితులను అందిస్తారు, వీటిలో ఉండొచ్చు:

| సాధారణ పొడిగింపు పారామితి | వివరణ | సాదారణ పరిధి |
|-----------|-------------|---------------|
| `top_p` | న్యూక్లియస్ సాంప్లింగ్ - టోకెన్లను టాప్ సమావేశ సంభావ్యతకు పరిమితం చేస్తుంది | 0.0 - 1.0 |
| `top_k` | టోకెన్ ఎంపీకను టాప్ K ఎంపికలకు పరిమితం చేస్తుంది | 1 - 100 |
| `presence_penalty` | ఇప్పటి వరకు టెక్స్ట్‌లోటోకెన్ల ప్రవేశం ఆధారంగా పీనాల్టీ విధిస్తుంది | -2.0 - 2.0 |
| `frequency_penalty` | ఇప్పటి వరకు టెక్స్ట్‌లో టోకెన్ల పదార్థం ఆధారంగా పీనాల్టీ విధిస్తుంది | -2.0 - 2.0 |
| `seed` | పునర్నిర్మాణ ఫలితాల కోసం నిర్దిష్ట యాదృచ్చిక సీడ్ | పూర్ణ సంఖ్య |

## ఉదాహరణ అభ్యర్థన ఫార్మాట్

MCP లో క్లయింట్ నుండి సాంప్లింగ్ అభ్యర్థిస్తూ ఒక ఉదాహరణ:

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

## స్పందన ఫార్మాట్

క్లయింట్ పూర్తి ఫలితాన్ని తిరిగి ఇస్తుంది:

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

## హ్యూమన్ ఇన్ ది లూప్ నియంత్రణలు

MCP సాంప్లింగ్ మానవ పర్యవేక్షణతో రూపొందించబడింది:

- **ప్రాంప్ట్‌ల కోసం**:
  - క్లయింట్లు ఉపయోగదారులకు ప్రతిపాదిత ప్రాంప్ట్ చూపించాలి
  - వినియోగదారులు ప్రాంప్ట్‌లను మార్చగలగాలి లేదా తిరస్కరించగలగాలి
  - సిస్టమ్ ప్రాంప్ట్‌లను ఫిల్టర్ చేయవచ్చు లేదా మార్చవచ్చు
  - సందర్భం చేర్చడం క్లయింట్ నియంత్రిస్తుంది

- **పూర్తుల కోసం**:
  - క్లయింట్లు వినియోగదారులకు పూర్తి చూపించాలి
  - వినియోగదారులు పూర్తులను మార్చగలగాలి లేదా తిరస్కరించగలగాలి
  - క్లయింట్లు పూర్తులను ఫిల్టర్ చేయవచ్చు లేదా మార్చవచ్చు
  - వినియోగదారులు ఉపయోగించే మోడల్‌ను నియంత్రిస్తారు

ఈ సూత్రాలతో, మనము LLM ప్రొవైడర్లలో సాధారణంగా మద్దతు పొందిన పారామితులపై దృష్టి పెట్టి, వేర్వేరు ప్రోగ్రామింగ్ భాషలలో సాంప్లింగ్ ఎలా అమలు చేయాలో చూస్తాము.

## భద్రతా విషయాలు

MCP లో సాంప్లింగ్ అమలు చేయునప్పుడు ఈ భద్రతా ఉత్తమ పద్ధతులను పరిగణించండి:

- **అన్ని సందేశపు విషయాలను ధృవీకరించండి** క్లయింట్‌కు పంపే ముందు
- **సున్నితమైన సమాచారాన్ని శుభ్రపరచండి** ప్రాంప్ట్‌లు మరియు పూర్తుల నుండి
- **దుర్వినియోగాన్ని నిరోధించడానికి రేట్ పరిమితులను అమలు చేయండి**
- **అసాధారణ నమూనాలు కోసం సాంప్లింగ్ వినియోగాన్ని పర్యవేక్షించండి**
- **సురక్షిత ప్రోటోకాల్‌లను ఉపయోగించి డేటాను సందర్శనలో గుప్తదత్తచేయండి**
- **సంబంధిత నియమావళి ప్రకారం వినియోగదారుల డేటా గోప్యతను హ్యాండిల్ చేయండి**
- **అనుచిత మరియు భద్రతా విధానాలకు అనుగుణంగా సాంప్లింగ్ అభ్యర్థనలను ఆడిట్ చేయండి**
- **శ్రేణిలో ఖర్చు పరిధుల నియంత్రణను అమలు చేయండి**
- **సాంప్లింగ్ అభ్యర్థనల కోసం టైమ్‌ఔట్‌లు అమలు చేయండి**
- **మోడల్ దోషాలను అనుకూలంగా నిర్వహించండి**

సాంప్లింగ్ పారామితులు భాషా మోడల్స్ ప్రవర్తనను మెరుగుపరచడంలో చిన్న సర్దుబాటు చేయడానికి అనుమతిస్తాయి, ఇది నిర్ణీత మరియు సృజనాత్మక అవుట్పుట్ల మధ్య సరైన సంతులనం సాధిస్తుంది.

వేర్వేరు ప్రోగ్రామింగ్ భాషలలో ఈ పారామితులను ఎలా కాన్ఫిగర్ చేయాలో చూద్దాం.

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

ముందు కోడ్‌లో మనము:

- నిర్దిష్ట సర్వర్ URLతో MCP క్లయింట్ సృష్టించాము.
- `temperature`, `top_p`, మరియు `top_k` వంటి సాంప్లింగ్ పారామితులతో అభ్యర్థనను కాన్ఫిగర్ చేసాము.
- అభ్యర్థన పంపించి సృష్టించిన టెక్స్ట్‌ను ప్రింట్ చేశాము.
- ఉపయోగించినవి:
    - `allowedTools` టూల్స్‌ను పేర్కొన్నది, మోడల్ సృష్టించే సమయంలో ఏ టూల్స్ ఉపయోగించగలరో సూచిస్తుంది. ఇక్కడ, `ideaGenerator` మరియు `marketAnalyzer` టూల్స్ ని సృజనాత్మక యాప్ ఐడియాల కోసం అనుమతించాము.
    - `frequencyPenalty` మరియు `presencePenalty` అవుట్పుట్లో పునరావృతం మరియు వైవిధ్యాన్ని నియంత్రించడానికి.
    - `temperature` అవుట్పుట్ యాదృచ్చికతను నియంత్రించడానికి, ఇందులో అధిక విలువలు మరింత సృజనాత్మక ప్రతిస్పందనలకు కారణమవుతాయి.
    - `top_p` టోకెన్ల ఎంపికను టాప్ సమావేశ సంభావ్యత మాస్సుకు పరిమితం చేయడానికి, టెక్స్ట్ నాణ్యతను మెరుగుపరిచేందుకు.
    - `top_k` మోడల్‌ను టాప్ K అత్యధిక సంభావ్యత టోకెన్లకు పరిమితం చేయడానికి, ఉత్తమ అనుసంధాన ప్రతిస్పందనలకు సహాయపడుతుంది.
    - `frequencyPenalty` మరియు `presencePenalty` పునరావృతాన్ని తగ్గించి వైవిధ్యాన్ని ప్రోత్సహించేందుకు.

# [JavaScript](#tab/javascript)

```javascript
// జావాస్క్రిప్ట్ ఉదాహరణ: ఉష్ణోగ్రత మరియు టాప్-పీ శాంప్లింగ్ కాన్ఫిగరేషన్
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP క్లయింట్‌ను ప్రారంభించడం
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // వివిధ శాంప్లింగ్ పరామితులతో అభ్యర్థనను సవరించండి
  const creativeSampling = {
    temperature: 0.9,    // అధిక ఉష్ణోగ్రత = మరింత యాదృచ్ఛికత/సృజనాత్మకత
    topP: 0.92,          // టోకెన్లను టాప్ 92% ప్రాబబిలిటీ మాస్‌తో పరిగణించండి
    frequencyPenalty: 0.6, // టోకెన్ శ్రేణుల పునరావృతం తగ్గించండి
    presencePenalty: 0.4   // ఇప్పటి వరకు వచనంలో 나타న టోకెన్లను దండించండి
  };
  
  const factualSampling = {
    temperature: 0.2,    // తక్కువ ఉష్ణోగ్రత = మరింత నిర్ణీత/నిజమైన
    topP: 0.85,          // కొంతవరకు మరింత కేంద్రీకృత టోకెన్ ఎంపిక
    frequencyPenalty: 0.2, // కనిష్ట పునరావృత దండన
    presencePenalty: 0.1   // కనిష్ట ఉనికి దండన
  };
  
  try {
    // భిన్న శాంప్లింగ్ కాన్ఫిగరేషన్లతో రెండు అభ్యర్థనలను పంపండి
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

ముందటి కోడ్‌లో మనము:

- సర్వర్ URL మరియు API కీతో MCP క్లయింట్ ప్రారంభించాము.
- రెండు సెట్ సాంప్లింగ్ పారామితులను కాన్ఫిగర్ చేసాము: ఒకటి సృజనాత్మక పనులకు, మరొకటి వాస్తవాస్పద పనులకు.
- ఈ కాన్ఫిగరేషన్లతో అభ్యర్థనలు పంపించి, ప్రతి పనికి ప్రత్యేక టూల్స్ ఉపయోగించటం అనుమతించాము.
- వేర్వేరు సాంప్లింగ్ పారామితుల ప్రభావాలు చూపించడానికి ఉత్పత్తి చేసిన ప్రతిస్పందనలను ప్రింట్ చేశాము.
- `allowedTools` ఉపయోగించి సృష్టి సమయంలో మోడల్ ఉపయోగించగల టూల్స్ నిర్ణయించాము. ఇక్కడ, సృజనాత్మక పనులకిగాను `ideaGenerator` మరియు `environmentalImpactTool`, వాస్తవ పనులకు `factChecker` మరియు `dataAnalysisTool` అనుమతించాము.
- `temperature` అవుట్పుట్ యాదృచ్చికతను నియంత్రించడం కోసం ఉపయోగించారు, అధిక విలువలు మరింత సృజనాత్మక ప్రతిస్పందనలకు దారితీస్తాయి.
- `top_p` టోకెన్ల ఎంపికను టాప్ సమావేశ సంభావ్యత మాస్సుకు పరిమితం చేయడానికి ఉపయోగించారు, టెక్స్ట్ నాణ్యతను మెరుగుపరుస్తుంది.
- `frequencyPenalty` మరియు `presencePenalty` పునరావృతం తగ్గించి వైవిధ్యాన్ని ప్రోత్సహించడానికి ఉపయోగించారు.
- `top_k` మోడల్‌ను టాప్ K అత్యంత సంభావ్య టోకెన్లకు పరిమితం చేయడానికి ఉపయోగించారు, ఇది అనుసంధాన ప్రతిస్పందనలకు సహాయపడుతుంది.

---

## నిర్ణీత సాంప్లింగ్

నిరంతర అవుట్పుట్లకు అవసరమైన అనువర్తనాలకు, నిర్ణీత సాంప్లింగ్ పునరావృత ఫలితాలని నిర్ధారిస్తుంది. ఇది ఎలా చేస్తుందంటే, ఒక స్థిర యాదృచ్చిక సీడ్ ఉపయోగించి, టెంపరేచర్‌ను జీరోగా సెట్ చేస్తుంది.

వేరే వేర్వేరు ప్రోగ్రామింగ్ భాషలలో నిర్ణీత సాంప్లింగ్‌ను చూపించడానికి కింది నమూనా అమలును చూద్దాం.

# [Java](#tab/java)

```java
// జావా ఉదాహరణ: స్థిరమైన మూలంతో నిర్ణీత ప్రతిస్పందనలు
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // నిర్ణీత ఫలితాలకు స్థిరమైన మూలాన్ని ఉపయోగించడం
        
        // స్థిరమైన మూలంతో మొదటి అభ్యర్థన
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // గరిష్ట నిర్ణీతత్వానికి సున్నా ఉష్ణోగ్రత
            .build();
            
        // అదే మూలంతో రెండవ అభ్యర్థన
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // రెండు అభ్యర్థనలను అమలు చేయండి
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // అదే మూలం మరియు ఉష్ణోగ్రత=0 కారణంగా ప్రతిస్పందనలు అనుకునీయమై ఉండాలి
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

ముందటి కోడ్‌లో మనము:

- నిర్దిష్ట సర్వర్ URLతో MCP క్లయింట్ సృష్టించాము.
- ఒకే ప్రాంప్ట్‌తో రెండు అభ్యర్థనలను, స్థిర సీడ్ మరియు జీరో టెంపరేచర్‌తో కాన్ఫిగర్ చేసాము.
- రెండు అభ్యర్థనలను పంపించి సృష్టించిన టెక్స్ట్‌ను ప్రింట్ చేశాము.
- సమాధానాలు నిర్ణీత స్వభావం (ఇది ఒకే సీడ్ మరియు టెంపరేచర్ కారణంగా) వల్ల ఒకటే ఉంటాయని చూపించాము.
- `setSeed` ఉపయోగించి స్థిర యాదృచ్చిక సీడ్‌ను పేర్కొనగా, అదే ఇన్‌పుట్‌కు ప్రతి సమయము అదే అవుట్పుట్ వస్తుంది.
- అత్యధిక నిర్ణీతత కోసం `temperature` ను జీరోగా సెట్ చేయడం, అంటే మోడల్ ఎప్పుడూ తదుపరి అత్యంత సంభావ్య టోకెన్‌ను యాదృచ్చికత లేకుండా ఎంచుకుంటుంది.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// జావాస్క్రిప్ట్ ఉదాహరణ: సీడ్ నియంత్రణతో నిర్దిష్ట స్పందనలు
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // స్థిర సీడ్‌తో మొదటి రిక్వెస్ట్
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // గరిష్ఠ నిర్దిష్టత కోసం జీరో ఉష్ణోగ్రత
    });
    
    // అదే సీడ్ మరియు ఉష్ణోగ్రతతో రెండవ రిక్వెస్ట్
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // వేరే సీడ్ గాను అదే ఉష్ణోగ్రతతో మూడవ రిక్వెస్ట్
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

ముందటి కోడ్‌లో మనము:

- సర్వర్ URLతో MCP క్లయింట్‌ను ప్రారంభించాము.
- ఒకే ప్రాంప్ట్‌తో రెండు అభ్యర్థనలను, స్థిర సీడ్ మరియు జీరో టెంపరేచర్‌తో కాన్ఫిగర్ చేసాము.
- రెండు అభ్యర్థనలను పంపించి సృష్టించిన టెక్స్ట్‌ను ప్రింట్ చేసాము.
- సమాధానాలు నిర్ణీత స్వభావం కారణంగా ఒకటే ఉంటాయని చూపించాము.
- `seed` ఉపయోగించి స్థిర యాదృచ్చిక సీడ్‌ను పేర్కొన్నాము, అదే ఇన్‌పుట్‌కు ప్రతి సారి అదే అవుట్పుట్ వస్తుంది.
- అత్యధిక నిర్ణీతత కోసం `temperature` ను జీరోగా సెట్ చేయడం.
- మూడవ అభ్యర్థన కోసం వేరే సీడ్‌ను ఉపయోగించి, అదే ప్రాంప్ట్ మరియు టెంపరేచర్ ఉన్నప్పటికీ మారిన అవుట్పుట్లను చూపించాము.

---

## డైనమిక్ సాంప్లింగ్ కాన్ఫిగరేషన్

తెలివైన సాంప్లింగ్ ప్రతి అభ్యర్థన యొక్క సందర్భం మరియు అవసరాల ఆధారంగా పారామితులను అనుకూలంగా మార్చుతుంది. అంటే, పని రకం, వినియోగదారుల ఇష్టాలు లేదా చారిత్రక పనితీరు ఆధారంగా `temperature`, `top_p`, మరియు పీనాల్టీలను డైనమిక్‌గా సర్దుబాటు చేస్తుంది.

డైనమిక్ సాంప్లింగ్‌ను వేర్వేరు ప్రోగ్రామింగ్ భాషలలో ఎలా అమలు చేయాలో చూద్దాం.

# [Python](#tab/python)

```python
# పైన్తన్ ఉదాహరణ: అభ్యర్థన ప్రాసంగికత ఆధారంగా డైనమిక్ శాంప్లింగ్
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # వివిధ పని రకాల కోసం శాంప్లింగ్ ప్రీసెట్‌లను నిర్వచించండి
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # ప్రాథమిక ప్రీసెట్‌ను ఎంచుకోండి
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # యూజర్ అభిరుచులు ఉన్నట్లయితే అనుసరించి సర్దుబాటు చేయండి
        if user_preferences:
            if "creativity_level" in user_preferences:
                # సృజనాత్మకత అభిరుచిని (1-10) ఆధారంగా ఉష్ణోగ్రతను స్కేలు చేయండి
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # కావలసిన ప్రతిస్పందన వైవిధ్యాన్ని ఆధారంగా top_p ను సర్దుబాటు చేయండి
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # అనుకూల శాంప్లింగ్ పారామితులతో అభ్యర్థనను సృష్టించి పంపండి
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # పారదర్శకత కోసం శాంప్లింగ్ మెటాడేటాతో ప్రతిస్పందనను తిరిగి ఇవ్వండి
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

ముందటి కోడ్‌లో మనము:

- వ్యవహారూఢమైన సాంప్లింగ్‌ను నిర్వహించేది `DynamicSamplingService` క్లాస్ సృష్టించాము.
- వేర్వేరు పని రకాల కోసం (సృజనాత్మక, వాస్తవాస్పద, కోడ్, విశ్లేషణాత్మక) సాంప్లింగ్ ప్రీసెట్‌లను నిర్వచించాము.
- పని రకం ఆధారంగా ప్రాథమిక సాంప్లింగ్ ప్రీసెట్ ఎంచుకున్నాము.
- వినియోగదారుల ఇష్టాలకు అనుగుణంగా సృజనాత్మకత మరియు వైవిధ్యం వంటి పారామితులను సర్దుబాటు చేసాము.
- డైనమిక్‌గా కాన్ఫిగర్ చేయబడిన సాంప్లింగ్ పారామితులతో అభ్యర్థనను పంపించాము.
- సృష్టించిన టెక్స్ట్‌ను, దానికి వర్తించిన సాంప్లింగ్ పారామితులు మరియు పని రకం తోపాటు పారదర్శకత కోసం తిరిగి ఇచ్చాము.
- `temperature` ఉపయోగించి అవుట్పుట్ యొక్క యాదృచ్చికతను నియంత్రించాము.
- `top_p` టోకెన్ల ఎంపికను టాప్ సమావేశ సంభావ్యత మాస్కు పరిమితం చేయడానికి ఉపయోగించాము.
- `frequency_penalty` పునరావృతాన్ని తగ్గించి వైవిధ్యాన్ని ప్రోత్సహించడానికి ఉపయోగించాము.
- `user_preferences` వినియోగదారుల నిర్వచించిన సృజనాత్మకత మరియు వైవిధ్య స్థాయిల ఆధారంగా సాంప్లింగ్ పారామితులను అనుకూలీకరించడానికి ఉపయోగించాము.
- `task_type` అభ్యర్థనకు సంబంధించిన పని రకం ఆధారంగా సరైన సాంప్లింగ్ వ్యూహాన్ని ఎంచుకోవడానికి ఉపయోగించాము.
- `send_request` పద్ధతిని ఉపయోగించి సాంప్లింగ్ పారామితులతో ప్రాంప్ట్ ను పంపించాము.
- `generated_text` ద్వారా మోడల్ ప్రతిస్పందనను పొందాము, దానిని సాంప్లింగ్ పారామితులు మరియు పని రకంతో పాటు తిరిగి ఇచ్చాము.
- `min` మరియు `max` ఫంక్షన్లను ఉపయోగించి వినియోగదారుల ఇష్టాలను చెలామణీ పరిధిలో ఉంచాము.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// జావాస్క్రిప్ట్ ఉదాహరణ: యూజర్ సందర్భం ఆధారంగా డైనమిక్ శాంప్లింగ్ కాన్ఫిగరేషన్
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // బేస్ శాంప్లింగ్ پروఫైల్స్‌ని నిర్వచించండి
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // చారిత్రక ప్రదర్శనను ట్రాక్ చేయండి
    this.performanceHistory = [];
  }
  
  // ప్రాంప్ట్ నుండి టాస్క్ టైపు గుర్తించండి
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // సింపుల్ హ్యూయురిస్టిక్ గుర్తింపు - ML క్లాసిఫికేషన్‌తో మెరుగుపరచవచ్చు
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
    
    // స్పష్టమైన రకం గుర్తించకపోతే డిఫాల్ట్‌గా సంభాషణాత్మకంగా ఉంటుందీ
    return 'conversational';
  }
  
  // సందర్భం మరియు యూజర్ ఇష్టాల ఆధారంగా శాంప్లింగ్ పారామితులను లెక్కించండి
  getSamplingParameters(prompt, context = {}) {
    // టాస్క్ రకం గుర్తించండి
    const taskType = this.detectTaskType(prompt, context);
    
    // బేస్ ప్రొఫైల్ పొందండి
    let params = {...this.samplingProfiles[taskType]};
    
    // యూజర్ ఇష్టాలకు అనుగుణంగా సరిపోయేలా సర్దుబాటు చేయండి
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 నుండి సరైన ఉష్ణోగ్రత పరిధికి స్కేలు చేయండి
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // ఎక్కువ ఖచ్చితత్వం అంటే తక్కువ topP (మరింత ఫోకస్డ్ ఎంచుకోగలగడం)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // ఎక్కువ సారాణత్వం అంటే తక్కువ శిక్షలు
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // ప్రదర్శన చరిత్ర నుండి నేర్చుకున్న సర్దుబాట్లను వర్తించండి
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // సింపుల్ అడాప్టివ్ లాజిక్ - మరింత నైపుణ్యవంతమైన ఆల్గోరిథమ్స్‌తో మెరుగుపరచవచ్చు
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // కొత్త చరిత్రను మాత్రమే తీసుకోండి
    
    if (relevantHistory.length > 0) {
      // సగటు ప్రదర్శన స్కోర్లు లెక్కించండి
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // ప్రదర్శన పరిమితికి దిగువలో ఉంటే పారామితులను సర్దుబాటు చేయండి
      if (avgScore < 0.7) {
        // సురక్షిత విలువల వైపు సన్నని సర్దుబాటు
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // భవిష్యత్తు సర్దుబాట్ల కొరకు ప్రదర్శనను నమోదు చేయండి
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // ప్రతిస్పందన నాణ్యత పై 0-1 రేటింగ్
    });
    
    // చరిత్ర పరిమాణం పరిమితం చేయండి
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ఆప్టిమైజ్డ్ శాంప్లింగ్ పారామితులను పొందండి
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ఆప్టిమైజ్డ్ పారామితులతో అభ్యర్థన పంపండి
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // యూజర్ ప్రతిస్పందన ఇస్తే, భవిష్యత్తు ఆప్టిమైజేషన్ కొరకు దాన్ని నమోదు చేయండి
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

// ఉదాహరణ ఉపయోగం
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // కస్టమ్ యూజర్ ఇష్టాల తో సృజనాత్మక టాస్క్
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // అధిక సృజనాత్మకం (1-10)
          consistency: 3  // తక్కువ సారాణత్వం (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // కోడ్ ఉత్పత్తి టాస్క్
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // తక్కువ సృజనాత్మకం
          precision: 8,   // అధిక ఖచ్చితత్వం
          consistency: 9  // అధిక సారాణత్వం
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

ముందటి కోడ్‌లో మనము:

- పని రకం మరియు వినియోగదారుల ఇష్టాల ఆధారంగా డైనమిక్ సాంప్లింగ్ నిర్వహించే `AdaptiveSamplingManager` క్లాస్ సృష్టించాము.
- వివిధ పని రకాలకు (సృజనాత్మక, వాస్తవాస్పద, కోడ్, సంభాషణాత్మక) సాంప్లింగ్ ప్రొఫైల్స్ నిర్వచించాము.
- కామన్ హెరిస్టిక్స్ ఉపయోగించి ప్రాంప్ట్ నుండి పని రకం స్వీకరించే పద్ధతిని అమలు చేశాము.
- పని రకం మరియు వినియోగదారుల ఇష్టాలను ఆధారంగా సాంప్లింగ్ పారామితులను లెక్కించాము.
- చారిత్రక పనితీరు ఆధారంగా అభ్యసించిన సర్దుబాట్లను వర్తింపజేసి సాంప్లింగ్ పారామితులను మెరుగుపరిచాము.
- గత పరస్పర చర్యల నుండి నేర్చుకునే సిస్టమ్ కోసం పనితీర్పు రికార్డును నమోదు చేసాము.
- డైనమిక్ కాన్ఫిగర్ అయిన సాంప్లింగ్ పారామితులతో అభ్యర్థనలు పంపించి, తర్జుమా చేసిన టెక్స్ట్‌ను మరియు వర్తించిన పారామితులు మరియు పని రకాన్ని తిరిగి ఇచ్చాము.
- ఉపయోగించినవి:
    - `userPreferences` వినియోగదారుల నిర్వచించిన సృజనాత్మకత, ఖచ్చితత్వం, మరియు సాంరంభ స్థాయిలపై ఆధారపడి సాంప్లింగ్ పారామితులను అనుకూలీకరించడానికి.
    - `detectTaskType` ప్రాంప్ట్ ఆధారంగా పని రకాన్ని నిర్ణయించడానికి, తద్వారా వేర్వేరు అభ్యర్థనలకు సరిపోయే సమాధానాలు ఇవ్వడానికి.
    - `recordPerformance` ఉత్పన్న సమాధానాల పనితీర్పును లాగ్ చేయడానికి, తద్వారా సిస్టమ్ సమయానుగుణంగా మెరుగుపడుతుంది.
    - `applyLearnedAdjustments` చారిత్రక పనితీరు ఆధారంగా సాంప్లింగ్ పారామితులను మార్చడానికి, మెరుగైన ప్రతిస్పందనలు సాధించడానికి.
    - `generateResponse` డైనమిక్ సాంప్లింగ్‌తో సమాధానాన్ని సృష్టించే మొత్తం ప్రక్రియను సులభతరం చేయడానికి.
    - `allowedTools` మోడల్ ఉత్పత్తిచేయడంలో ఉపయోగించే టూల్స్ ను పేర్కొనడానికి.
    - `feedbackScore` వినియోగదారులు సృష్టించిన ప్రతిస్పందన నాణ్యతపై స్పందన ఇవ్వడానికి, తద్వారా మోడల్ పనితీరును మెరుగుపరచడానికి.
    - `performanceHistory` గత పరస్పర చర్యల రికార్డు నిల్వ చేయడానికి, అభ్యసించే సిస్టమ్ కోసం.
    - `getSamplingParameters` అభ్యర్థన పరిస్థితి ఆధారంగా సాంప్లింగ్ పారామితులను డైనమిక్‌గా సర్దుబాటు చేయడానికి.
    - `detectTaskType` ప్రాంప్ట్ ఆధారంగా పని రకాన్ని వర్గీకరించడానికి, వేర్వేరు అభ్యర్థనల కోసం సరైన సాంప్లింగ్ వ్యూహాలను వర్తింపజేయడానికి.
    - `samplingProfiles` వేర్వేరు పని రకాలకు ప్రాథమిక సాంప్లింగ్ కాన్ఫిగరేషన్లను నిర్వచించడానికి.

---

## తదుపరి ఏం ఉండదు

- [5.7 స్కేలింగ్](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->