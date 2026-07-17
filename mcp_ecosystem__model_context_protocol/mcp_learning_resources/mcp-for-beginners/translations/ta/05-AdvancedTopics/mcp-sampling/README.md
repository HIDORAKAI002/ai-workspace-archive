> [மூலப்பு: 2026-07-28 வெளியீடு வேட்பு](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# மாடல் சூழல் நெறிமுறையில் மாதிரிபார்க்கல்

> **மூலப்புக்கட்டுரை அறிவிப்பு:** `2026-07-28` MCP விவரக்குறிப்பு வெளியீட்டு வேட்பு மாதிரிபார்க்கலை LLM வழங்குநர் API-களுடன் நேரடி ஒருங்கிணைப்புக்குப் பதிலாக தவிர்க்கப்படுவதாக குறிக்கிறது. மாதிரிபார்க்கல் `2025-11-25` மற்றும் எந்தவொரு அதிகாரப்பூர்வ மூலப்பு பிறகும் குறைந்தது ஒரு வருடம் வேலை செய்ய தொடர்ந்து உள்ளது, எனவே இந்த பாடத்தில் உள்ள அனைத்தும் செல்லுபடியாகின்றன - ஆனால் புதிய சேவை வடிவமைப்புகள் மாற்றுத்திட்டத்தை மதிப்பீடு செய்ய வேண்டும். [MCPயில் என்ன மாற்றமாய் வருகிறது: 2026-07-28 வெளியீட்டு வேட்பு](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) பார்க்கவும்.

மாதிரிபார்க்கல் என்பது MCP இலுள்ள சக்திவாய்ந்த அம்சமாகும், இது சேவையகங்கள் LLM முடிக்கப்பட்டவற்றை கிளையன்டின் மூலம் கோரி, பாதுகாப்பு மற்றும் தனியுரிமையை பேணும் வண்ணம் கடுமையான முகமை செயல்பாடுகளை செயல்படுத்த அனுமதிக்கும். சரியான மாதிரிபார்க்கல் அமைப்பு பதில் தரம் மற்றும் செயல்திறனை முற்றிலும் மேம்படுத்த முடியும். MCP உரை உருவாக்கத்தில் தேவையான மாறிலிகளைக் கொண்டு மாதிரிபார்க்கலை கட்டுப்படுத்த ஒரு ஒருங்கிணைந்த முறையை வழங்குகிறது, இது சீரியல், புதுமை, மற்றும் இணக்கத்தன்மையை பாதிக்கிறது.

## அறிமுகம்

இந்த பாடத்தில், MCP கோரிக்கைகளில் மாதிரிபார்க்கல் மாறிலிகளை எவ்வாறு அமைப்பது மற்றும் மாதிரிபார்க்கல் அடிப்படை நெறிமுறை இயந்திரங்களை நன்கு புரிந்துகொள்வோம்.

## கற்றல் இலக்குகள்

இந்த பாடத்தின் முடிவில், நீங்கள் செய்யக்கூடியவை:

- MCP இல் கிடைக்கக்கூடிய முக்கிய மாதிரிபார்க்கல் மாறிலிகளை புரிந்து கொள்வது.
- வெவ்வேறு பயன்பாடுகளுக்கான மாதிரிபார்க்கல் மாறிலிகளை அமைத்தல்.
- மறுபடியும் உருவாக்கக்கூடிய முடிவுகளுக்கு தீர்க்கமான மாதிரிபார்க்கலை செயல்படுத்தல்.
- சூழ்நிலை மற்றும் பயனர் விருப்பங்களின் அடிப்படையில் இடைநிலையில் மாதிரிபார்க்கல் மாறிலிகளை தானாக ஒழுங்குப்படுத்தல்.
- பல சூழ்நிலைகளில் மாடல் செயல்திறனை மேம்படுத்த மாதிரிபார்க்கல் முறைகளை பயன்படுத்தல்.
- MCP இல் கிளையன்ட்-செர்வர் பாய்ச்சலில் மாதிரிபார்க்கல் எவ்வாறு இயங்குகிறதென்பதை புரிந்துகொள்ளல்.

## MCP இல் மாதிரிபார்க்கல் எப்படி இயங்கும்

MCP இல் மாதிரிபார்க்கல் பாய்ச்சி பின்வரும் படிகள் உள்ளன:

1. சேவையகம் `sampling/createMessage` கோரிக்கையை கிளையன்டுக்கு அனுப்பும்
2. கிளையன்ட் கோரிக்கையை ஆய்வு செய்து திருத்தலாம்
3. கிளையன்ட் LLM இல் இருந்து மாதிரிபார்க்கும்
4. கிளையன்ட் முடிக்கையை ஆய்வு செய்கிறது
5. கிளையன்ட் முடிவை சேவையகத்திற்கு திருப்பி அனுப்புகிறது

இந்த மனிதர்-சுற்றிய வடிவமைப்பு பயனர்களுக்கு LLM பார்க்கும் மற்றும் உருவாக்கும் விஷயங்களை கட்டுப்படுத்த அனுமதிக்கிறது.

## மாதிரிபார்க்கல் மாறிலிகளின் மேற்பரிசீலனை

MCP கிளையன்ட் கோரிக்கைகளில் அமைக்கக்கூடிய பின்வரும் மாதிரிபார்க்கல் மாறிலிகளை வரையறுக்கிறது:

| மாறிலி | விளக்கம் | சாதாரண வரம்பு |
|-----------|-------------|---------------|
| `temperature` | டோக்கன் தேர்வில் சீர்திருத்தத்தை கட்டுப்படுத்துகிறது | 0.0 - 1.0 |
| `maxTokens` | உருவாக்க வேண்டிய டோக்கன்களின் அதிகபட்ச எண் | முழு எண் மதிப்பு |
| `stopSequences` | சந்தித்தவுடன் உருவாக்கத்தை நிறுத்தும் தனிப்பயன் வரிசைகள் | 문자열 வரிசைகள் அடுக்கம் |
| `metadata` | கூடுதல் வழங்குநர்-சுட்டிப் பொருட்கள் | JSON பொருள் |

பல LLM வழங்குநர்கள் கூடுதல் மாறிலிகள் `metadata` புலத்தின் மூலம் ஆதரிக்கின்றனர், அதில் அடங்கும்:

| பொதுவான விரிவாக்க மாறிலி | விளக்கம் | சாதாரண வரம்பு |
|-----------|-------------|---------------|
| `top_p` | நியூக்லியஸ் மாதிரிபார்க்கல் - டோக்கன்களை மேல் கூட்டப் பomercentage க்கு கட்டுப்படுத்துகிறது | 0.0 - 1.0 |
| `top_k` | டோக்கன் தேர்வை மேல் K விருப்பங்களுக்கு மட்டுக்கும் | 1 - 100 |
| `presence_penalty` | இதுவரை உரையில் உள்ளதா என்பதை பின்பற்றி டோக்கன்களை தண்டிக்கிறது | -2.0 - 2.0 |
| `frequency_penalty` | இதுவரை உரையில் அவர்களின் அடிக்கடி அடயல்களைப்பற்றி டோக்கன்களை தண்டிக்கிறது | -2.0 - 2.0 |
| `seed` | மறுபடியும் உருவாக்கக்கூடிய முடிவுகளுக்கு குறிப்பிட்ட சீரற்ற விதை | முழு எண் மதிப்பு |

## உதாரண கோரிக்கை வடிவம்

இதோ MCP இல் கிளையன்டிடமிருந்து மாதிரிபார்க்கலுக்கான கோரிக்கையின் உதாரணம்:

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

## பதில் வடிவம்

கிளையன்ட் முடிக்கப்பட்ட முடிவை திருப்பி அனுப்புகிறது:

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

## மனிதர் சுற்றி கட்டுப்பாடுகள்

MCP மாதிரிபார்க்கல் மனிதர்களின் கண்காணிப்புடன் வடிவமைக்கப்பட்டுள்ளது:

- **சர்ச்சைகளுக்காக**:
  - கிளையன்டுகள் பயனர்களுக்கு முன் வைக்கப்பட்ட சர்ச்சையை காட்ட வேண்டும்
  - பயனர்கள் சர்ச்சைகளை மாற்ற அல்லது நிராகரிக்க முடியும்
  - அமைப்பு சர்ச்சைகளை வடிகட்டலாம் அல்லது மாற்றலாம்
  - சூழல் சேர்க்கை கிளையன்டால் கட்டுப்படுத்தப்படுகிறது

- **முடிவுகளுக்காக**:
  - கிளையன்டுகள் பயனர்களுக்கு முடிவுகளை காட்ட வேண்டும்
  - பயனர்கள் முடிவுகளை மாற்ற அல்லது நிராகரிக்க முடியும்
  - கிளையன்டுகள் முடிவுகளை வடிகட்டவோ அல்லது மாற்றவோ முடியும்
  - பயனர்கள் எந்த மாடல் பயன்படுத்தப்படுவது என்பதை கட்டுப்படுத்துகின்றனர்

இந்த கோட்பாடுகளுடன், பரவலாக LLM வழங்குநர்களில் ஆதரிக்கப்படும் மாறிலிகளை கவனத்தில் கொண்டு வெவ்வேறு நிரலாக்க மொழிகளில் மாதிரிபார்க்கலை எவ்வாறு செயல்படுத்துவது என்பதைக் காண்போம்.

## பாதுகாப்பு கருதுகோள்கள்

MCP இல் மாதிரிபார்க்கலை செயல்படுத்தும் பொழுது பின்வரும் பாதுகாப்பு சிறந்த நடைமுறைகளை கவனிக்கவும்:

- **எல்லா செய்தி உள்ளடக்கங்களையும் சரிபார்க்கவும்** கிளையன்டுக்கு அனுப்புவதற்கு முன்
- **அரசியலான தகவல்களை சுத்திகரிக்கவும்** சர்ச்சைகளிலும் முடிவுகளிலும் இருந்து
- **தடுப்புகளை செயல்படுத்தவும்** தவறான பயன்பாட்டைக் தடுக்கும் வகையில்
- **மாதிரிபார்க்கல் பயன்பாட்டை கண்காணிக்கவும்** விசித்திரமான வடிகட்டல்களுக்கு
- **டேட்டாவை முறைப்படுத்தவும்** பாதுகாப்பான நெறிமுறைகள் பயன்படுத்தி பரிமாறும் போது
- **பயனர் தரவு தனியுரிமையை கையாளவும்** தொடர்புடைய விதிகளின் படி
- **மாதிரிபார்க்கல் கோரிக்கைகளின் மதிப்பாய்வை செய்யவும்** ஒத்துழைக்கும் மற்றும் பாதுகாப்பு நோக்கங்களுக்காக
- **செலவு திறனை கட்டுப்படுத்தவும்** சரியான வரம்புகளுடன்
- **கோரிக்கை நேர அவகாசங்களை அமல்படுத்தவும்**
- **மாதிரிபார்க்கல் பிழைகளை நெகிழ்வாக கையாளவும்** சரியான மாற்று வழிகளை கொண்டு

மாதிரிபார்க்கல் மாறிலிகள் மொழி மாதிரிகள் நடத்தையை நன்கு சமநிலைப்படுத்தி குறிப்பிட்ட எதிர்பார்ப்புகளுக்கு ஏற்ப திருப்புதல் மற்றும் புதுமை வெளியீடுகளுக்கு இடையே தெளிவான கட்டுப்பாட்டை வழங்குகின்றன.

இந்த மாறிலிகளை வெவ்வேறு நிரலாக்க மொழிகளில் எவ்வாறு அமைப்பது என்பதை பார்க்கலாம்.

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

மேலே உள்ள குறியீட்டில் நாம்:

- குறிப்பிட்ட சேவையக URL உடன் MCP கிளையண்டை உருவாக்கினோம்.
- `temperature`, `top_p`, மற்றும் `top_k` போன்ற மாதிரிபார்க்கல் மாறிலிகளுடன் கோரிக்கையை அமைத்தோம்.
- கோரிக்கையை அனுப்பி உருவாக்கப்பட்ட உரையை அச்சிடினோம்.
- பயன்படுத்தப்பட்டது:
    - `allowedTools` மூலம் உருவாக்க சேவையின் போது எந்த கருவிகள் பயன்படுத்தப்பட வேண்டும் என்பதைக் குறிப்பிடினோம். இதில், `ideaGenerator` மற்றும் `marketAnalyzer` கருவிகள் நவீன செயலிகளுக்கான சிந்தனைகளை உருவாக்க உதவ அனுமதிக்கப்பட்டன.
    - `frequencyPenalty` மற்றும் `presencePenalty` மூலமாக வெளியீட்டில் மீண்டும் தோற்பதை மற்றும் பக்ததுவத்தை கட்டுப்படுத்தினோம்.
    - `temperature` மூலம் வெளியீட்டின் சீரற்ற அணுகுமுறையை கட்டுப்படுத்தினோம், அதிகமான மதிப்புகள் அதிக புதுமை பதில்களை கொண்டு வருகிறது.
    - `top_p` மூலம் டோக்கன்களை மேல் பிராயோகிக்கப்படும் சத்திர சாத்தியக்கூறு திரட்டத்தை கட்டுப்படுத்தியது, உருவாக்கப்பட்ட உரையின தரத்தை மேம்படுத்தியது.
    - `top_k` மூலம் மாடல் உயர் சாத்தியமான டோக்கன்களின் மேல் K தொகுதியிற்கு கட்டுப்படுத்தப்பட்டது, இது தொடர்புடைய பதில்களை உருவாக்க உதவுகிறது.
    - மீண்டும் `frequencyPenalty` மற்றும் `presencePenalty` ஐ பயன்படுத்தி உருவாக்கப்பட்ட உரையில் வீரியத்தையும் குறைக்கின்றது.

# [JavaScript](#tab/javascript)

```javascript
// ஜாவாஸ்கிரிப்ட் உதாரணம்: வெப்பநிலை மற்றும் டாப்-பி மாதிரிப்பார்வை ஒழுங்குபடுத்தல்
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP கிளையண்டை துவக்கவும்
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // வெவ்வேறு மாதிரிப்பார்வை அமைப்புகளுடன் கோரிக்கையை அமைக்கவும்
  const creativeSampling = {
    temperature: 0.9,    // அதிக வெப்பநிலை = அதிகமான சீரற்ற தன்மை/புதிய சிந்தனை
    topP: 0.92,          // மேற்பின் 92% சாத்தியக்கூறு மாசுடன் டோக்கன்களை கருதி கொள்
    frequencyPenalty: 0.6, // டோக்கன் தொடர்விளக்கங்களை குறைப்பது
    presencePenalty: 0.4   // இதுவரை உள்ள உரையில் தோன்றிய டோக்கன்களுக்கு தண்டனை விதிக்கவும்
  };
  
  const factualSampling = {
    temperature: 0.2,    // குறைந்த வெப்பநிலை = அதிகத் தீர்மானமான/வास्तவமானது
    topP: 0.85,          // சற்று கூடுதல் கவனம் செலுத்தப்பட்ட டோக்கன் தேர்வு
    frequencyPenalty: 0.2, // குறைந்த முறையேற்பிப்பு தண்டனை
    presencePenalty: 0.1   // குறைந்த இருப்பு தண்டனை
  };
  
  try {
    // வெவ்வேறு மாதிரிப்பார்வை அமைப்புகளுடன் இரண்டு கோரிக்கைகள் அனுப்பவும்
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

மேலே உள்ள குறியீட்டில் நாம்:

- சேவையக URL மற்றும் API விசையுடன் MCP கிளையண்டை துவங்கினோம்.
- உருவாக்கும் செயற்கைக்கான மற்றும் உண்மையான பணிகளுக்கான இரண்டு மாதிரிபார்க்கல் அமைப்புகளை அமைத்தோம்.
- இந்த அமைப்புகளுடன் கோரிக்கைகளை அனுப்பி, ஒவ்வொரு பணியுக்கும் குறிப்பிட்ட கருவிகளை பயன்படுத்தி மாதிரிபார்க்கல் நடத்தினோம்.
- உருவாக்கப்பட்ட பதில்களை அச்சிடி மாதிரிபார்க்கல் மாறிலிகளின் விளைவுகளை காட்டினோம்.
- `allowedTools` மூலம் விளைவுகளில் எந்த கருவிகள் பயன்படுத்தப்பட வேண்டும் என்பதைக் குறிப்பிடினோம். இதில், சிந்தனைக் கருவிகளுக்கான `ideaGenerator` மற்றும் `environmentalImpactTool`, உண்மைத்தத்திற்கான `factChecker` மற்றும் `dataAnalysisTool` கருவிகள் பயன்படுத்தப்பட்டன.
- `temperature` மூலம் வெளியீட்டின் சீரற்ற அணுகுமுறையை கட்டுப்படுத்தினோம், அதிகமான மதிப்புகள் அதிக புதுமை பதில்களைத் தருகின்றன.
- `top_p` மூலம் மேல் தொகை சாத்தியக்கூறு திரட்டம் வரை டோக்கன் தேர்வை கட்டுப்படுத்தினோம், உருவாக்க உரையின் தரத்தை மேம்படுத்தியது.
- `frequencyPenalty` மற்றும் `presencePenalty` மூலம் மீண்டும் தோற்பதை குறைக்க மற்றும் பக்ததுவத்தை ஊக்குவிக்கின்றோம்.
- `top_k` மூலம் மாடல் உயர் சாத்தியமான டோக்கன்களின் மேல் K தொகுதியிற்கு கட்டுப்படுத்தப்பட்டது, இது தொடர்புடைய பதில்களை உருவாக்க உதவுகிறது.

---

## தீர்க்கமான மாதிரிபார்க்கல்

நிரம்பிய முடிவுகளை தேவைபடும் செயலிகளுக்காக, தீர்க்கமான மாதிரிபார்க்கல் மறுபடியும் உருவாக்கக்கூடிய முடிவுகளை உத்தரவாதம் செய்கிறது. இதை செய்வது நிரந்தரமான சீரற்ற விதையை பயன்படுத்தி மற்றும் வெப்பநிலையை பூஜ்யமாக அமைக்கும் மூலமாக.

வெவ்வேறு நிரலாக்க மொழிகளில் தீர்க்கமான மாதிரிபார்க்கலை காட்டும் உதாரண செயல்முறையை கீழே பார்க்கலாம்.

# [Java](#tab/java)

```java
// ஜாவா உதாரணம்: நிர்ணயிக்கப்பட்ட விதானைகளுடன் நிலையான பதில்கள்
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // நிர்ணயிக்கப்பட்ட முடிவுகளுக்காக நிலையான விதானை பயன்படுத்துதல்
        
        // நிர்ணயிக்கப்பட்ட விதானுடன் முதன்மை கோரிக்கை
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // அதிகபட்ச நிர்ணயத்திற்காக பூஜ்ய வெப்பநிலை
            .build();
            
        // அதே விதானுடன் இரண்டாம் கோரிக்கை
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // இரு கோரிக்கைகளையும் இயக்கு
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // அதே விதானை மற்றும் வெப்பநிலை=0 காரணமாக பதில்கள் ஒரே மாதிரியாக இருக்க வேண்டும்
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

மேலே உள்ள குறியீட்டில் நாம்:

- குறிப்பிட்ட சேவையக URL உடன் MCP கிளையண்டை உருவாக்கினோம்.
- அதே சர்ச்சை, நிரந்தர விதை மற்றும் பூஜ்ஜிய வெப்பநிலையுடன் இரண்டு கோரிக்கைகளை அமைத்தோம்.
- இரு கோரிக்கைகளையும் அனுப்பி உருவாக்கப்பட்ட உரையை அச்சிடினோம்.
- மாதிரிபார்க்கல் அமைப்பின் தீர்க்கமான தன்மை (அதே விதை மற்றும் வெப்பநிலை) காரணமாக பதில்கள் ஒரே மாதிரியாக இருப்பதை காட்டினோம்.
- எப்போதும் அதே உள்ளடக்கத்திற்கு ஒரே வெளியீடு உருவாக `setSeed` மூலம் நிரந்தர சீரற்ற விதையை வழங்கினோம்.
- அதிகபட்ச தீர்க்கத்தன்மைக்காக `temperature` ஐ பூஜ்ஜியமாக அமைத்தோம், இது எந்த சீரற்ற தேர்வும் இல்லாமல், மிகப்பெரிய சாத்தியமான அடுத்த டோக்கனை எப்போதும் தேர்வு செய்யும்.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// ஜாவாஸ்கிரிப்ட் உதாரணம்: விதிவிலக்கு உறுதிப்படுத்தப்பட்ட பதில்களுடன் விதை கட்டுப்பாடு
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // முந்தைய விதையுடன் முதல் கோரிக்கை
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // அதிகபட்ச விதிவிலக்கிற்கு பூஜ்ஜிய வெப்ப நிலை
    });
    
    // அதே விதை மற்றும் வெப்ப நிலையுடன் இரண்டாவது கோரிக்கை
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // வேறு விதையின் மூன்றாவது கோரிக்கை ஆனால் அதே வெப்ப நிலை
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

மேலே உள்ள குறியீட்டில் நாம்:

- சேவையக URL உடன் MCP கிளையண்டை துவங்கினோம்.
- அதே சர்ச்சை, நிரந்தர விதை மற்றும் பூஜ்ஜிய வெப்பநிலையுடன் இரண்டு கோரிக்கைகளை அமைத்தோம்.
- இரு கோரிக்கைகளையும் அனுப்பி உருவாக்கப்பட்ட உரையை அச்சிடினோம்.
- தீர்க்கமான மாதிரிபார்க்கல் அமைப்பின் தன்மை காரணமாக பதில்கள் ஒரே மாதிரியாக இருப்பதை கூறினோம்.
- நிலையான சீரற்ற விதையாக `seed` ஐ பயன்படுத்தி மாதிரி ஒரே உள்ளீட்டுக்கு எப்போதும் ஒரே வெளியீட்டை உருவாக்குவதை சரிபார்த்தோம்.
- அதேபோல் `temperature` ஐ பூஜ்ஜியமாக அமைத்து அதிகபட்ச தீர்க்கத்தன்மையை உறுதிப்படுத்தினோம்.
- மூன்றாவது கோரிக்கைக்கு வேறுபட்ட விதையை பயன்படுத்தி, அதே சர்ச்சை மற்றும் வெப்பநிலையுடன் வேறு பதில்கள் வரும் என்பதை காட்டினோம்.

---

## தானியங்கி மாதிரிபார்க்கல் அமைப்பு

அறிவுசார் மாதிரிபார்க்கல் ஒவ்வொரு கோரிக்கையின் சூழலும் தேவைலும் அடிப்படையில் மாறிலிகளை ஒட்டுமொத்தமாக ஒழுங்குபடுத்துகிறது. அதாவது, வேலைவகை, பயனர் விருப்பங்கள், அல்லது வரலாற்று செயல்திறனின் அடிப்படையில் வெப்பநிலை, top_p மற்றும் தண்டனைகள் போன்ற மாறிலிகளை மாற்றுவதைக் குறிக்கிறது.

பல நிரலாக்க மொழிகளில் தானியங்கி மாதிரிபார்க்கலை எவ்வாறு செயல்படுத்துவது என்பதை பார்க்கலாம்.

# [Python](#tab/python)

```python
# பய்டான் எடுத்துக்காட்டு: கோரிக்கை சூழலில் அடிப்படையாக கையாளும் மாதிரி தேர்வு
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # வெவ்வேறு பணித் வகைகளுக்கான மாதிரி முன் அமைப்புகளை வரையறு
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # அடிப்படை முன் அமைப்பை தேர்ந்தெடு
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # வழங்கப்பட்டால் பயனர் விருப்பங்களின் அடிப்படையில் மாற்றங்கள் செய்
        if user_preferences:
            if "creativity_level" in user_preferences:
                # படைப்பாற்றல் விருப்பத்தின் (1-10) அடிப்படையில் வெப்பநிலையை அளவிடு
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # தேவையான பதில் முரண்பாட்டின் அடிப்படையில் top_p ஐ மாற்று
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # தனிப்பயன் மாதிரி அளவுகளுடன் கோரிக்கையை உருவாக்கி அனுப்பு
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # திறந்த வெளிக்கான மாதிரி உள்நாட்டமைப்புகளுடன் பதிலை திருப்பி கொடு
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

மேலே உள்ள குறியீட்டில் நாம்:

- தானாக முறையாக்கப்பட்ட மாதிரிபார்க்கலை நிர்வகிக்கும் `DynamicSamplingService` வகுப்பை உருவாக்கினோம்.
- வெவ்வேறு பணிகளுக்கான மாதிரிபார்க்கல் முன்கூட்டிய அமைப்புகளை (புதுமையாக்கம், உண்மை, குறியீடு, பகுப்பாய்வு) வரையறுத்தோம்.
- பணிவகை அடிப்படையில் அடிப்படை மாதிரிபார்க்கல் முன்கூட்டியமைப்பைத் தேர்ந்தெடுத்தோம்.
- பயனர் விருப்பங்கள், உதாரணத்திற்கு, புதுமை அளவு மற்றும் பக்ததேவை போன்றவற்றின் அடிப்படையில் மாதிரிபார்க்கல் மாறிலிகளை எடிட்ட் செய்தோம்.
- கோரிக்கையை அந்த தானியங்கிச் சீராக்கப்பட்ட மாதிரிபார்க்கல் பராமரிப்புகளில் அனுப்பினோம்.
- தெளிவுத்தன்மைக்காக உருவாக்கப்பட்ட உரை, மாதிரிபார்க்கல் மாறிலிகள் மற்றும் பணிவகையை திருப்பி அளித்தோம்.
- வெளியீட்டின் சீரற்ற பண்பை கட்டுப்படுத்த `temperature` பயன்படுத்தப்பட்டது, அதிக மதிப்புகள் அதிக புதுமை பதில்களை தருகின்றன.
- உரையின் தரத்தை மேம்படுத்த `top_p` பயன்படுத்தப்பட்டது, இது மேல் கூட்டச் சாத்தியக்கூறு திரட்டத்திற்கான டோக்கன் தேர்வை கட்டுப்படுத்துகிறது.
- மீண்டும் தோற்பதை குறைத்து மற்றும் பக்ததேவை ஊக்குவிக்க `frequency_penalty` பயன்படுத்தப்பட்டது.
- பயனர் வரையறுக்கப்பட்ட புதுமை மற்றும் பக்தவிருப்புகளை பயன்படுத்தி மாதிரிபார்க்கல் மாறிலிகளை தனிப்பயனாக்க `user_preferences` பயன்படுத்தப்பட்டது.
- பணியின் இயல்பிற்கேற்ற மாதிரிபார்க்கல் முறையைத் தேர்வு செய்ய `task_type` பயன்படுத்தப்பட்டது.
- அமைக்கப்பட்ட மாதிரிபார்க்கல் மாறிலிகளுடன் பொருந்தி கோரிக்கையை அனுப்ப `send_request` முறையை பயன்படுத்தினோம்.
- உருவாக்கப்பட்ட பதிலை `generated_text` மூலம் பெற்றதும், தொடர்ந்து மாதிரிபார்க்கல் மாறிலிகளோடு பணிவகையுடன் திருப்பி அளித்தோம்.
- பயனர் விருப்பங்கள் செல்லுபடியான வரம்புகளில் இருக்க `min` மற்றும் `max` செயல்பாடுகளை பயன்படுத்தி சரிபார்த்தோம்.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// ஜாவாஸ்கிரிப்ட் உதாரணம்: பயனர் சூழலின்படி ஏற்கெனவே மாதிரிமுறையை அமைத்தல்
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // அடிப்படை மாதிரிமுறை செயலாக்கங்களை வரையறுக்கவும்
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // வரலாற்று செயல்திறனை கண்காணிக்கவும்
    this.performanceHistory = [];
  }
  
  // உரையாற்றுநர் மூலம் பணி வகையை கண்டறிதல்
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // எளிய heuristic கண்டறிதல் - இயந்திரக் கற்றல் வகைப்பிதானத்துடன் மேம்படுத்தப்படலாம்
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
    
    // தெளிவான வகை தெரியாவிட்டால் உரையாடலுக்கு இயல்புநிலை கொடுக்கவும்
    return 'conversational';
  }
  
  // சூழல் மற்றும் பயனர் விருப்பங்களின் அடிப்படையில் மாதிரிமுறை அளவுருக்களை கணக்கிடவும்
  getSamplingParameters(prompt, context = {}) {
    // பணித் தலைப்பை கண்டறிதல்
    const taskType = this.detectTaskType(prompt, context);
    
    // அடிப்படை செயலாக்கத்தை பெறு
    let params = {...this.samplingProfiles[taskType]};
    
    // பயனர் விருப்பங்களுக்கு ஏற்ப சரிசெய்க
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 அளவிலிருந்து உரிய வெப்ப நிலைக்கு அளவை மாற்றவும்
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // அதிக துல்லியம் குறைந்த topP என்பதைக் குறிக்கும் (மேலும் கவனிக்க செய்யப்பட்ட தேர்வு)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // அதிக ஒருமைத்தன்மை குறைந்த தண்டனைகளை குறிக்கிறது
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // செயல்திறன் வரலாற்றிலிருந்து கற்றுக்கொண்ட மாற்றங்களைப் பயன்படுத்து
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // எளிய தழுவிச் சீற்றக்கருத்து - இன்னும் நுட்பமான ஆல்கொரிதம்களுடன் மேம்படுத்தப்படலாம்
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // சமீபத்திய வரலாற்றையே மட்டும் எடுத்துக் கொள்
    
    if (relevantHistory.length > 0) {
      // சராசரி செயல்திறன் மதிப்பெண்களை கணக்கிடு
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // செயல்திறன் நிர்ணய மோசமாக இருந்தால், அளவுருக்களை சரி செய்
      if (avgScore < 0.7) {
        // பாதுகாப்பான மதிப்புகளுக்கு சிறிய மாறுதலைச் செய்
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // எதிர்கால மாற்றங்களுக்கு செயல்திறனைக் பதிவு செய்க
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // பதிலின் தரத்தை 0-1 நிறைவில் மதிப்பிடுக
    });
    
    // வரலாறு அளவைக் குறைக்கவும்
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // மேம்படுத்தப்பட்ட மாதிரிமுறை அளவுருக்களை பெறு
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // மேம்படுத்தப்பட்ட அளவுருக்களுடன் கோரிக்கையை அனுப்பு
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // பயனர் கருத்து வழங்கினால், எதிர்கால மேம்பாடுகளுக்கு அதை பதிவு செய்க
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

// உதாரண பயன்படுத்தல்
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // தனிப்பயன் பயனர் விருப்பங்களுடன் படைப்பாற்றல் பணி
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // அதிக படைப்பாற்றல் (1-10)
          consistency: 3  // குறைந்த ஒருமைத்தன்மை (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // குறியீடு உருவாக்கும் பணி
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // குறைந்த படைப்பாற்றல்
          precision: 8,   // அதிக துல்லியம்
          consistency: 9  // அதிக ஒருமைத்தன்மை
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

மேலே உள்ள குறியீட்டில் நாம்:

- `AdaptiveSamplingManager` வகுப்பை உருவாக்கினோம், இது பணிவகை மற்றும் பயனர் விருப்பங்களின் அடிப்படையில் தானியங்கி மாதிரிபார்க்கலை நிர்வகிக்கிறது.
- வெவ்வேறு பணிவகைகளுக்கான மாதிரிபார்க்கல் சுயவிவரங்களை (புதுமை, உண்மை, குறியீடு, உரையாடல்) வரையறுத்தோம்.
- சாதாரண எளிதான விதிகளைக் கொண்டு சர்ச்சையிலிருந்து பணிவகையை கண்டறிக்கும் முறையை செயல்படுத்தினோம்.
- கண்டறியும் பணிவகை மற்றும் பயனர் விருப்பங்களை அடிப்படையாகக் கொண்டு மாதிரிபார்க்கல் மாறிலிகளை கணக்கிட்டோம்.
- வரலாற்று செயல்திறனை அடிப்படையாகக் கொண்டு கற்றுக் கொள்ளப்பட்ட மாற்றங்களை அமல்படுத்தி மாதிரிபார்க்கல் தகுதிகளை மேம்படுத்தினோம்.
- எதிர்கால மாற்றங்களுக்கு செயல்திறனை பதிவு செய்து, கடந்த தொடர்புகளை முறையாக கற்றுக் கொண்டு அமைப்பு மேம்படுகிறது.
- தானியங்கி அமைக்கப்பட்ட மாதிரிபார்க்கல் மாறிலிகளுடன் கோரிக்கைகளை அனுப்பி, சந்தித்த செயல்திறனுடன் உருவாக்கப்பட்ட உரையை திருப்பி அளித்தோம்.
- பயன்படுத்தப்பட்டது:
    - `userPreferences` மூலம் பயனர் வரையறுக்கப்பட்ட புதுமை, துல்லியம் மற்றும் ஒத்திருக்கிற நிலைகளுக்கு ஏற்ப மாதிரிபார்க்கல் மாறிலிகளை தனிப்பயனாக்க அனுமதிக்கின்றது.
    - `detectTaskType` மூலம் சர்ச்சை அடிப்படையில் பணியின் இயல்பை கண்டறிந்து, அதற்கேற்ப சிறந்த மாதிரிபார்க்கல் வழிகளைப் பயன்படுத்த அனுமதிக்கிறது.
    - `recordPerformance` மூலம் உருவாக்கப்பட்ட பதில்களின் செயல்திறனை பதிவு செய்து அமைப்பு நேரத்தின் படி தானாக மேம்பட உதவுகிறது.
    - `applyLearnedAdjustments` மூலம் வரலாற்று செயல்திறன் அடிப்படையில் மாதிரிபார்க்கல் மாறிலிகளை மாற்றி, மாடலின் தரமான பதில்களை மிகுத்தல்.
    - `generateResponse` மூலம் தானியங்கி மாதிரிபார்க்கலைப் பயன்படுத்தி முழுமையான பதில் உருவாக்க செயல்முறையை உருவாக்கி, வெவ்வேறு சிக்கல்களுக்கு ஏற்ப அழைக்க எளிதாக்குதல்.
    - `allowedTools` மூலம் உருவாக்கத்தில் எந்த கருவிகள் பயன்படுத்தப்பட வேண்டும் எனக் குறிப்பிடுதல், அதிக சூழல் அறிமுகமான பதில்களை உருவாக்குவதற்கு உதவுகிறது.
    - `feedbackScore` மூலம் பயனர்கள் உருவாக்கப்பட்ட பதிலின் தரம் குறித்து பின்னூட்டம் அளிக்க அனுமதிக்கிறது, இது மாடல் செயல்திறனை தொடர்ந்து சீரமைக்க உதவும்.
    - `performanceHistory` மூலம் கடந்த தொடர்புக்களை பதிவு செய்து அமைப்பை சிறப்பாக கற்றுக் கொள்ள மற்றும் மேம்படுத்த உதவுகிறது.
    - `getSamplingParameters` மூலம் கோரிக்கையின் சூழலை அடிப்படையாகக் கொண்டு மாதிரிபார்க்கல் மாறிலிகளை தானாக மாற்ற, மாடல் நடத்தை மிகவும் நெகிழ்வாகவும் பதிலளிக்க உதவும்.
    - `detectTaskType` மூலம் சர்ச்சை அடிப்படையில் பணியை வகைப்படுத்தி, வெவ்வேறு பணிகளுக்கு பொருத்தமான மாதிரிபார்க்கல் முறைகளை பயன்படுத்துகிறது.
    - `samplingProfiles` மூலம் வெவ்வேறு பணிவகைகளுக்கான அடிப்படை மாதிரிபார்க்கல் அமைப்புகளை வரையறுத்து, கோரிக்கை இயல்பின்படி விரைவாக மாற்றும் வசதி.

---

## அதற்குப்பின்பு என்ன

- [5.7 அளவுகோல்](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->