> [ഒഴിവാക്കപ്പെട്ടത്: 2026-07-28 റിലീസ് സ്ഥാനാർഥി](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# മോഡൽ കോൺടെക്സ്റ്റ് പ്രോട്ടോക്കോളിൽ സാമ്പ്ലിംഗ്

> **ഒഴിവാക്കലുള്ള सूचना:** `2026-07-28` MCP സ്പെസിഫിക്കേഷൻ റിലീസ് സ്ഥാനാർഥി സാമ്പ്ലിംഗിനെ LLM प्रदाता APIs-ഇൻ്റെ നേരിട്ടുള്ള സംയോജനത്തിന് പകരം ഒഴിവാക്കലായി ചൂണ്ടിക്കാണിക്കുന്നു. `2025-11-25`-ൽ സാമ്പ്ലിംഗ് തുടർന്നു പ്രവർത്തിക്കുകയും ഔദ്യോഗിക ഒഴിവാക്കലിനു ശേഷം കുറഞ്ഞത് ഒരു വർഷം സജീവമായിരിക്കാനുള്ള സാധ്യതയുണ്ട്, അതുകൊണ്ട് ഈ പാഠത്തിലെ എല്ലാപരാമർശങ്ങളും സാധുവാണ് - എന്നാൽ പുതിയ സെർവർ ഡിസൈനുകൾ പകരം വരുന്ന മാതൃക വിലയിരുത്തണം. കാണുക [MCP-ഇൽ എന്താണ് മാറ്റം: 2026-07-28 റിലീസ് സ്ഥാനാർഥി](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

സാമ്പ്ലിംഗ് എന്നത് MCP-ൽ ശക്തമായ ഒരു സവിശേഷതയാണ്, ഇത് സെർവർസിന് ക്ലയന്റിലൂടെ LLM പൂർത്തീകരണങ്ങൾ അഭ്യര്‍ത്ഥിക്കാനാകുന്നു, അതിലൂടെ സമ്പ്രദായിക ഏജന്റുകൾ കൂടുതൽ സുരക്ഷിതവും സ്വകാര്യത നమ్మിക്കുന്നവയും ആയിരിക്കാൻ സാധിക്കുന്നു. ഉചിതമായ സാമ്പ്ലിംഗ് കോൺഫിഗറേഷൻ പ്രതികരണം ഗുണമേന്മയും പ്രകടനവും വ്യത്യസ്തമായി വർദ്ധിപ്പിക്കാം. MCP മോഡലുകൾ ടെക്സ്റ്റ് സൃഷ്ടിക്കുന്നതിന് വേണ്ടി പ്രത്യേക പാരാമീറ്ററുകൾ ഉപയോഗിച്ച് കഥയെഴുത്ത്, സൃഷ്ടിപരത്വം, ഏകോപനം എന്നിവയെ സ്വാധീനിക്കുന്ന സ്‌റ്റാൻഡറ്ഡൈസ്ഡ് രീതിയാണു നൽകുന്നത്.

## പരിചയം

ഈ പാഠത്തിൽ MCP അഭ്യർത്ഥനകളിലെ സാമ്പ്ലിംഗ് പാരാമീറ്ററുകൾ എങ്ങനെ കോൺഫിഗർ ചെയ്യാമെന്ന് നാം പഠിക്കുകയും സാമ്പ്ലിംഗ് അതിന്റെ പ്രോട്ടോക്കോൾ യന്ത്രശാസ്ത്രങ്ങൾ മനസിലാക്കുകയും ചെയ്യും.

## പഠന ലക്ഷ്യങ്ങൾ

ഈ പാഠം അവസാനിക്കെയുള്ളപ്പോൾ നിങ്ങള്‍ക്ക് സാധിക്കേണ്ടത്:

- MCP-ൽ ലഭ്യമായ പ്രധാന സാമ്പ്ലിംഗ് പാരാമീറ്ററുകൾ മനസിലാക്കുക.
- വ്യത്യസ്ത ഉപയോഗങ്ങളിലായി സാമ്പ്ലിംഗ് പാരാമീറ്ററുകൾ കോൺഫിഗർ ചെയ്യുക.
- പുനരുദ്ധരിക്കാവുന്ന ഫലം ലഭിക്കാനായി ഡിസ്ടർമിനിസ്റ്റിക് സാമ്പ്ലിംഗ് നടപ്പാക്കുക.
- കോൺടെക്സ്റ്റ്, ഉപയോക്തൃ ആഗ്രഹങ്ങൾ അനുസരിച്ച് സാമ്പ്ലിംഗ് പാരാമീറ്ററുകൾ മിച്ചപ്പെടുത്തുക.
- വിവിധ സാഹചര്യങ്ങളിൽ മോഡൽ പ്രകടനം മെച്ചപ്പെടുത്തുന്നതിന് സാമ്പ്ലിംഗ് തന്ത്രങ്ങൾ പ്രയോഗിക്കുക.
- MCP-ലെ ക്ലയന്റ്-സെർവർ ഫ്ലോയിലെ സാമ്പ്ലിംഗ് പ്രവർത്തനം മനസിലാക്കുക.

## MCP-ൽ സാമ്പ്ലിംഗ് എങ്ങനെ പ്രവർത്തിക്കുന്നു

MCP-ൽ സാമ്പ്ലിംഗ് പ്രവാഹം ഈ ഘട്ടങ്ങൾ പിന്തുടരും:

1. സെർവർ ക്ലയന്റിലേക്ക് `sampling/createMessage` അഭ്യര്‍ത്ഥന അയയ്ക്കുന്നു
2. ക്ലയന്റ് അഭ്യർത്ഥന കണക്കിൽ വാങ്ങി മാറ്റം വരുത്താം
3. ക്ലയന്റ് LLM-ലിൽ നിന്നുമൊരു സാമ്പിൾ എടുക്കുന്നു
4. ക്ലയന്റ് പൂർത്തീകരണം പരിശോധിക്കുന്നു
5. ക്ലയന്റ് ഫലം സെർവർക്ക് തിരികെ നൽകുന്നു

മനുഷ്യനായി ഇടപെടൽ ഈ രൂപകൽപ്പന ഉപഭോക്താക്കൾക്ക് LLM കാണുന്ന സ്വഭാവവും സൃഷ്ടിക്കുന്നതുമെന്താണെന്ന് നിയന്ത്രിക്കാനായാണ് ഒരുക്കുന്നത്.

## സാമ്പ്ലിംഗ് പാരാമീറ്ററുകളുടെ അവലോകനം

MCP ക്ലയന്റ് അഭ്യർത്ഥനകളിൽ കോൺഫിഗർ ചെയ്യാവുന്ന താഴെ വ്യക്തമാക്കിയ സാമ്പ്ലിംഗ് പാരാമീറ്ററുകൾ നിർവചിക്കുന്നു:

| പാരാമീറ്റർ | വിവരണം | സാധാരണ പരിധി |
|-----------|-------------|---------------|
| `temperature` | ടോക്കൻ തിരഞ്ഞെടുപ്പിലെ അനിശ്ചിതത്വം നിയന്ത്രിക്കുന്നു | 0.0 - 1.0 |
| `maxTokens` | സൃഷ്‌ടിക്കാവുന്ന പരമാവധി ടോക്കണുകളുടെ എണ്ണം | മുഴുവൻ സംഖ്യ |
| `stopSequences` | കണ്ടെങ്കിലും സൃഷ്‌ടനം അവസാനിപ്പിക്കുന്ന കസ്റ്റം പരമ്പരകൾ | സ്റ്റ്രിങ് ലിസ്റ്റ് |
| `metadata` | ലഭ്യമായ മറ്റുപ്രവർത്തക പ്രത്യേക പാരാമീറ്ററുകൾ | JSON ഒബ്ജക്റ്റ് |

പല LLM പ്രവർത്തകർ `metadata` ഫീൽഡിലൂടെ അധിക പാരാമീറ്ററുകൾ പിന്തുണയ്ക്കുന്നു, അതിൽ ഉൾപ്പെടാം:

| പൊതുവായ എക്സ്റ്റൻഷൻ പാരാമീറ്റർ | വിവരണം | സാധാരണ പരിധി |
|-----------|-------------|---------------|
| `top_p` | ന്യൂക്ലിയസ് സാമ്പ്ലിംഗ് - ടോക്കണുകൾ മേൽ ചേർന്ന പ്രാബല്യപരിധി | 0.0 - 1.0 |
| `top_k` | ടോക്കൻ തിരഞ്ഞെടുപ്പ് ടോപ്പ് K ഓപ്ഷനുകൾക്ക് അലിമിറ്റു ചെയ്യുന്നു | 1 - 100 |
| `presence_penalty` | മുമ്പത്തെ ടെക്സ്റ്റിൽ ടോക്കനുകളുടെ സാന്നിധ്യം അടിസ്ഥാനമാക്കി ശിക്ഷാ മാർഗം | -2.0 - 2.0 |
| `frequency_penalty` | മുമ്പത്തെ ടെക്സ്റ്റിലെ ടോക്കൺ ആവർത്തനത്തിന്റെ അടിസ്ഥാനത്തിൽ ശിക്ഷാ മാർഗം | -2.0 - 2.0 |
| `seed` | പുനരുത്പാദനഫലങ്ങൾക്ക് പ്രത്യേകം നീരൂപിതമായ റാൻഡം സീഡ് | മുഴുവൻ സംഖ്യ |

## ഉദാഹരണ അഭ്യർത്ഥന ഫോർമാറ്റ്

MCP-ൽ ക്ലയന്റിൽ നിന്നുള്ള സാമ്പ്ലിംഗ് അഭ്യർത്ഥനയുടെ ഉദാഹരണം ഇവിടെ:

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

## മറുപടി ഫോർമാറ്റ്

ക്ലയന്റ് പൂർത്തീകരണഫലം തിരികെ നൽകുന്നു:

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

## മനുഷ്യൻ ഇടപെടൽ നിയന്ത്രണങ്ങൾ

MCP സാമ്പ്ലിംഗ് മനുഷ്യനാശ്രിത മേൽനോട്ടത്തോടെ രൂപകൽപ്പന ചെയ്തിട്ടുണ്ട്:

- **പ്രാമ്പ്റ്റുകൾക്കായി**:
  - ക്ലയന്റുകൾ ഉപയോക്താക്കൾക്ക് നിർദ്ദേശിച്ച പ്രാമ്പ്റ്റ് കാണിക്കണം
  - ഉപയോക്താക്കൾ പ്രാമ്പ്റ്റ് മാറ്റം വരുത്താനോ നിരസിക്കാനോ സാധിക്കണം
  - സിസ്റ്റം പ്രാമ്പ്റ്റുകൾ ഫിൽട്ടർ ചെയ്യാനോ മാറ്റങ്ങളുമായി പ്രതിഭാസിപ്പിക്കാനോ കഴിയും
  - കോൺടെക്സ്റ്റ് ഉൾപ്പെടുത്തൽ ക്ലയന്റ് നിയന്ത്രിക്കും

- **പൂർത്തീകരണങ്ങൾക്ക്**:
  - ക്ലയന്റുകൾ ഉപയോക്താക്കൾക്ക് പൂർത്തീകരണം കാണിക്കണം
  - ഉപയോക്താക്കൾ പൂർത്തീകരണം മാറ്റം വരുത്താനോ നിരസിക്കാനോ സാധിക്കണം
  - ക്ലയന്റുകൾ പൂർത്തീകരണങ്ങൾ ഫിൽട്ടർ ചെയ്യാനോ മാറ്റാനോ കഴിയും
  - മോഡൽ തിരഞ്ഞെടുപ്പ് ഉപയോക്താവിൻ്റെ നിയന്ത്രണത്തിലാണ്

ഈ സിദ്ധാന്തങ്ങൾ മനസ്സിലാക്കി, MCP ൽ വിവിധ LLM പ്രവർത്തകരിൽ സാധാരണയായി പിന്തുണയ്ക്കുന്ന പാരാമീറ്ററുകൾ ഉൾക്കൊണ്ട് സാമ്പ്ലിംഗ് എങ്ങനെ നടപ്പാക്കാമെന്നു നോക്കാം.

## സുരക്ഷാ പരിഗണനകൾ

MCP-ൽ സാമ്പ്ലിംഗ് നടപ്പിൽ വരുത്തുമ്പോൾ ഈ സുരക്ഷാ മികച്ച രീതികൾ പരിഗണിക്കുക:

- **എല്ലാ സന്ദേശ ഉള്ളടക്കവും പരിശോധിക്കുക** ക്ലയന്റിന് അയയ്ക്കുന്നതിനു മുൻപ്
- **പ്രാമ്പ്റ്റുകളും പൂർത്തീകരണങ്ങളും സംവേദനശീല വിവരങ്ങളിൽ നിന്ന് ശുദ്ധമാക്കുക**
- **ഓവർയൂസ് തടയാൻ നിരക്ക് പരിധികൾ നടപ്പാക്കുക**
- **സാമ്പ്ലിംഗ് ഉപയോഗത്തിൽ അസാധാരണ മാതൃകകൾ നിരീക്ഷിക്കുക**
- **സംവരണമദ്ധ്യേ ഡാറ്റ എൻക്രിപ്റ്റ് ചെയ്യുക** സുരക്ഷിത പ്രോട്ടോകോളുകൾ ഉപയോഗിച്ച്
- **പ്രയോഗകർ ഡാറ്റ സ്വകാര്യത നിയന്ത്രിക്കുക** സംബന്ധിച്ച നിയമങ്ങൾ അനുസരിച്ച്
- **സാമ്പ്ലിംഗ് അഭ്യർത്ഥനകൾ ഓഡിറ്റ് ചെയ്യുക** അനുസരണത്തിനും സുരക്ഷയ്ക്കും
- **ചെലവു നിയന്ത്രണം** അനുയോജ്യമായ പരിധികളോടെ നിയന്ത്രിക്കുക
- **സാമ്പ്ലിംഗ് അഭ്യർത്ഥനകൾക്ക് ടൈംഔട്ട് നടപ്പാക്കുക**
- **മോഡൽ പിശകുകൾ ശ്രദ്ധയോടെ കൈകാര്യം ചെയ്യുക** അനുയോജ്യമായ ബാക്കപ്പ് പദ്ധതികളോടെ

സാമ്പ്ലിംഗ് പാരാമീറ്ററുകൾ ഭാഷാ മോഡലുകൾക്ക് ആവശ്യമായ നിരീക്ഷണവും സൃഷ്ടിപരത്വവും പാടവമായി നയിക്കാൻ സഹായിക്കുന്നു.

വിവിധ പ്രോഗ്രാമിങ്ങ് ഭാഷകളിൽ ഈ പാരാമീറ്ററുകൾ എങ്ങനെ കോൺഫിഗർ ചെയ്യാമെന്ന് നോക്കാം.

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

മുൻകോഡിൽ:

- പ്രത്യേക സെർവർ URL ഉപയോഗിച്ച് MCP ക്ലയന്റ് സൃഷ്ടിച്ചു.
- `temperature`, `top_p`, `top_k` പോലൊരു സാമ്പ്ലിംഗ് ത്രിതാളുകളുള്ള അഭ്യർത്ഥന കോൺഫിഗർ ചെയ്തു.
- അഭ്യർത്ഥന അയച്ച് സൃഷ്‌ടിച്ച ടെക്സ്റ്റ് പ്രിന്റ് ചെയ്‌തു.
- ഉപയോഗിച്ചത്:
    - റൺ സമയത്ത് മോഡൽ ഏതൊക്കെ ടൂളുകൾ ഉപയോഗിക്കാമെന്നു `allowedTools` ഉപയോഗിച്ചു മൂന്ന് ടൂളുകൾ അനുവദിച്ചു: `ideaGenerator` അഥവാ ആശയ സൃഷ്ടിക്കാനുള്ള, `marketAnalyzer` വിപണി വിശകലനത്തിനുള്ള.
    - ആവർത്തനവും വൈവിധ്യവും നിയന്ത്രിക്കാൻ `frequencyPenalty` ഉം `presencePenalty` ഉം.
    - പുറത്തുവരുന്ന അച്ചടവിൽ അപ്രതീക്ഷിതത്വം കൂട്ടാൻ ഉയർന്ന മൂല്യം നൽകുന്ന `temperature`.
    - ശരിയായ ടെക്സ്റ്റ് ഗുണനിലവാരം ഉറപ്പാക്കാൻ `top_p` വഴി ടോക്കനുകൾ പരിമിതപ്പെടുത്തൽ.
    - കൂടുതൽ സമഗ്രമായ പ്രതികരണത്തിനായി `top_k` വഴി മോഡൽ ടോപ്പുകളിലെ K ഏറ്റവും സാധ്യതയുള്ള ടോക്കണുകളിലേക്ക് പരിധിപെടുത്തൽ.
    - ആവർത്തന കുറയ്ക്കാനും വൈവിധ്യ പ്രേരിപ്പിക്കാനുമായി `frequencyPenalty` ഉം `presencePenalty` ഉം വീണ്ടും ഉപയോഗിച്ചു.

# [ജാവാസ്ക്രിപ്റ്റ്](#tab/javascript)

```javascript
// ജാവാസ്ക്രിപ്റ്റ് ഉദാഹരണം: താപനിലയും ടോപ്പ്-പി സാമ്പ്ലിങ് കോൺഫിഗറേഷൻ
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP ക്ലയന്റ് ആരംഭിക്കുക
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // വ്യത്യസ്ത സാമ്പ്ലിങ് പാരാമീറ്ററുകളോടെ അഭ്യർത്ഥന കോൺഫിഗർ ചെയ്യുക
  const creativeSampling = {
    temperature: 0.9,    // ഉയർന്ന താപനില = കൂടുതൽ അസാധാരണത്വം/സൃഷ്ടിപ്രവർത്തനം
    topP: 0.92,          // മുകളിൽ 92% പ്രോബബിലിറ്റി മാസ്സുള്ള ടോക്കണുകൾ പരിഗണിക്കുക
    frequencyPenalty: 0.6, // ടോക്കൺ ശ്രേണികളുടെ ആവർത്തനം കുറയ്ക്കുക
    presencePenalty: 0.4   // ഇതുവരെ വാചകത്തിൽ പ്രത്യക്ഷപ്പെട്ട ടോക്കണുകൾക്ക് പിഴ നൽകുക
  };
  
  const factualSampling = {
    temperature: 0.2,    // താഴ്ന്ന താപനില = കൂടുതൽ നിർണ്ണായകമായ/വാസ്തവപരമായ
    topP: 0.85,          // അല്പംകൂടുതൽ കേന്ദ്രീകരിച്ച ടോക്കൺ തെരഞ്ഞടുക്കൽ
    frequencyPenalty: 0.2, // കുറഞ്ഞ ആവർത്തന പിഴ
    presencePenalty: 0.1   // കുറഞ്ഞ സാന്നിധ്യ പിഴ
  };
  
  try {
    // വ്യത്യസ്ത സാമ്പ്ലിങ് കോൺഫിഗറേഷനോടെ രണ്ട് അഭ്യർത്ഥനകൾ അയയ്ക്കുക
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

മുൻകോഡിൽ:

- സെർവർ URL, API കീ ഉപയോഗിച്ച് MCP ക്ലയന്റ് ആരംഭിച്ചു.
- രണ്ട് സാമ്പ്ലിംഗ് പാരാമീറ്റർ സജ്ജീകരണങ്ങൾ: സൃഷ്ടിപരമായ പ്രവർത്തനങ്ങൾക്കും സ്വതന്ത്രമായ പ്രവർത്തനങ്ങൾക്കും.
- ഈ കോൺഫിഗറേഷനുകൾ ഉപയോഗിച്ച് അഭ്യർത്ഥനകൾ അയച്ച് മോഡൽ പ്രത്യേക ടൂളുകൾ ഉപയോഗിക്കാനാവശ്യപ്പെട്ടു.
- ഉത്പാദിത പ്രതികരണങ്ങൾ പ്രിന്റ് ചെയ്ത് വിവിധ സാമ്പ്ലിംഗ് പാരാമീറ്ററുകളുടെ പ്രഭാഷണങ്ങൾ കാണിച്ചു.
- സൃഷ്ടിപരമായി `ideaGenerator` , `environmentalImpactTool` ടൂളുകൾ, സ്വതന്ത്രമായി `factChecker`, `dataAnalysisTool` ടൂളുകൾ `allowedTools` വഴി അനുവദിച്ചു.
- `temperature` ഉപയോഗിച്ച് പുറത്തുവരുന്ന അപ്രതീക്ഷിതത്വം നിയന്ത്രിച്ചു, ഉയർന്ന മൂല്യം കൂടുതൽ സൃഷ്ടിപരമായ പ്രതികരണത്തിന്.
- ഏറ്റവും സാധ്യതയുള്ള ടോക്കണുകൾതിരഞ്ഞെടുക്കാൻ `top_p` ഉപയോഗിച്ചു, ഇതു ടെക്സ്റ്റ് ഗുണം മെച്ചപ്പെടുത്തുന്നു.
- ആവർത്തന കുറയ്ക്കാനും വൈവിധ്യം പ്രേരിപ്പിക്കാനുമായി `frequencyPenalty` ഉം `presencePenalty` ഉം.
- കൂടുതൽ ഏകദൃശ്യമുള്ള പ്രതികരണത്തിനായി `top_k` ഉപയോഗിച്ചു.

---

## ഡിസ്ടർമിനിസ്റ്റിക് സാമ്പ്ലിംഗ്

സ്ഥിരമായ ഔട്ട്പുട്ടുകൾ ആവശ്യമുള്ള അപ്ലിക്കേഷനുകൾക്കായി, ഡിസ്ടർമിനിസ്റ്റിക് സാമ്പ്ലിംഗ് പുനരുത്പാദന ഫലങ്ങൾ ഉറപ്പുവരുത്തുന്നു. ഇത് നിർവഹിക്കുന്നത് മത്സരം ഇല്ലാത്ത റാൻഡം സീഡ് ഉപയോഗിച്ച്, `temperature` നെ പൂജ്യം ആക്കി.

താഴെ വരുന്ന ഉദാഹരണത്തിൽ വ്യത്യസ്ത പ്രോഗ്രാമിങ്ങ് ഭാഷകളിൽ ഡിസ്ടർമിനിസ്റ്റിക് സാമ്പ്ലിംഗ് प्रदർശിപ്പിക്കുന്നു.

# [ജാവ](#tab/java)

```java
// ജാവ ഉദാഹരണം: നിശ്ചിത വിത്തോടെ നിർണായക പ്രതികരണങ്ങൾ
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // നിർണായക ഫലങ്ങൾക്കായി നിശ്ചിത വിത്ത് ഉപയോഗിക്കുന്നു
        
        // നിശ്ചിത വിത്തോടെ ആദ്യ അപേക്ഷ
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // പരമാവധി നിർണായകതയ്ക്കായി ശൂന്യ താപനില
            .build();
            
        // ഒരേ വിത്തോടെ രണ്ടാം അപേക്ഷ
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // ഇരുട്ടും അപേക്ഷകളും നിർവ്വഹിക്കുക
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // ഒരേ വിത്തും താപനില=0 എന്നതിനാൽ പ്രതികരണങ്ങൾ സമാനമായിരിക്കണം
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

മുൻകോഡിൽ:

- MCP ക്ലയന്റ് മുൻനിശ്ചിത സെർവർ URL ഉപയോഗിച്ച് സൃഷ്ടിച്ചു.
- ഒരു പ്രാമ്പ്റ്റ് ഉപയോഗിച്ച്, സ്ഥിരമായ സീഡ് കൂടാതെ, `temperature` പൂജ്യം ആക്കിയ രണ്ടു അഭ്യർത്ഥനകൾ കോൺഫിഗർ ചെയ്തു.
- രണ്ട് അഭ്യർത്ഥന പ്രവർത്തിപ്പിച്ച് സൃഷ്ടിച്ച ടെക്സ്റ്റ് പ്രിന്റ് ചെയ്‌തു.
- സമാനമായ മറുപടികൾ സൃഷ്ടിച്ചിട്ടുണ്ടെന്ന് കാണിച്ചു, കാരണം സാമ്പ്ലിംഗ് കോൺഫിഗറേഷൻ ഡിസ്ടർമിനിസ്റ്റിക് സ്വഭാവമുള്ളതാണ് (പരിരക്ഷിത സീഡ്, പൂജ്യമായ `temperature`).
- സ്ഥിരമായ റാൻഡം സീഡ് ചാലിച്ച് ഈ പ്രവർത്തനം ഉറപ്പുവരുത്താൻ `setSeed` ഉപയോഗിച്ചു.
- കൂടുതൽ ഉറപ്പിന്റെ ഭാഗമായി `temperature` പൂജ്യം ആക്കി, മോഡൽ എല്ലായ്പ്പോഴും ഏറ്റവും സാധ്യതയുള്ള അടുത്ത ടോക്കൺ തിരഞ്ഞെടുക്കും.

# [ജാവാസ്ക്രിപ്റ്റ്](#tab/javascript-deterministic)

```javascript
// ജാവാസ്ക്രിപ്റ്റ് ഉദാഹരണം: വിത്ത് നിയന്ത്രണത്തോടെ നിശ്ചിത പ്രതികരണങ്ങൾ
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // ഫിക്സഡ് വിത്തിൽ ആദ്യ അഭ്യർത്ഥന
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // പരമാവധി നിശ്ചിതത്വത്തിനായി  സൂന്യ താപനില
    });
    
    // ഒരേ വിത്തും താപനിലയും ഉപയോഗിച്ച രണ്ടാം അഭ്യർത്ഥന
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // വ്യത്യസ്ത വിത്ത്, എന്നാൽ ഒരേ താപനില ഉപയോഗിച്ച മൂന്നാമത്തെ അഭ്യർത്ഥന
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

മുൻകോഡിൽ:

- MCP ക്ലയന്റ് സെർവർ URL വഴി ആരംഭിച്ചു.
- ഒരു പ്രാമ്പ്റ്റ് ഉപയോഗിച്ച്, സ്ഥിരം സീഡ്, പൂജ്യ `temperature` ചേർത്ത് രണ്ടു അഭ്യർത്ഥനകൾ കോൺഫിഗർ ചെയ്തു.
- രണ്ട് അഭ്യർത്ഥന പ്രവർത്തിപ്പിച്ച് സൃഷ്ടിച്ച ടെക്സ്റ്റ് പ്രിന്റ് ചെയ്‌തു.
- മറുപടികൾ സമാനമാണ്, കാരണം ഡിസ്ടർമിനിസ്റ്റിക് സാമ്പ്ലിംഗ് കോൺഫിഗറേഷൻ (ഒരുപോലെ സീഡ്, `temperature`) ഉപയോഗിച്ചാണ്.
- സ്ഥിരമായ റാൻഡം സീഡ് കാണിക്കാൻ `seed` ഉപയോഗിച്ചു.
- `temperature` പൂജ്യം ആക്കി ഏറ്റവും ഉറപ്പുള്ള ഫലം ഉറപ്പാക്കി, മോഡൽ randomness ഇല്ലാതെ ഏറ്റവും സാധ്യതയുള്ള ടോക്കൺ തിരഞ്ഞെടുക്കും.
- മൂന്നാം അഭ്യർത്ഥനയിൽ വ്യത്യസ്ത സീഡ് ഉപയോഗിച്ച്, ഒരే പ്രാമ്പ്റ്റും `temperature` വിച്ഛേദിച്ചെങ്കിലും വ്യത്യസ്ത ഫലങ്ങൾ ഉണ്ടാകാറുള്ളതിന്റെ ഉദാഹരണം.

---

## ഡൈനാമിക് സാമ്പ്ലിംഗ് കോൺഫിഗറേഷൻ

ബുദ്ധിമുട്ടുളവാക്കുന്ന സാമ്പ്ലിംഗ് ഓരോ അഭ്യർത്ഥനയുടെ കോൺടെക്സ്റ്റിലും ആവശ്യങ്ങളിലും അനുസരിച്ച് പാരാമീറ്ററുകൾ സ്വയമേവ ക്രമീകരിക്കുന്നു. അതായത് `temperature`, `top_p`, ശിക്ഷകൾ തുടങ്ങിയവയുടെ കൂടിക്കാഴ്ച, ഉപയോഗകർത്താവ് ഇഷ്ടാനുസൃതങ്ങൾ,ചരിത്ര പ്രകടനം മുതലായ വഴികളിലൂടെ.

വ്യത്യസ്ത പ്രോഗ്രാമിങ്ങ് ഭാഷകളിൽ ഡൈനാമിക് സാമ്പ്ലിംഗ് എങ്ങനെ നടപ്പിലാക്കാമെന്ന് നോക്കാം.

# [പൈത്തൺ](#tab/python)

```python
# പൈതാൻ ഉദാഹരണം: അഭ്യർത്ഥനയുടെ പ്രസങ്കത്തിന്റെ അടിസ്ഥാനത്തിൽ ഡൈനാമിക് സാമ്പിലിംഗ്
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # വ്യത്യസ്ത ടാസ്‌ക് തരംകൾക്കായി സാമ്പിലിംഗ് മുൻകൂർനിർണയങ്ങൾ നിർവചിക്കുക
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # അടിസ്ഥാന മുൻകൂർനിർണയം തിരഞ്ഞെടുക്കുക
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # നൽകിയിട്ടുണ്ടെങ്കിൽ ഉപയോക്തൃ ഇഷ്ടാനുസൃതികൾ അടിസ്ഥാനമാക്കി ക്രമീകരിക്കുക
        if user_preferences:
            if "creativity_level" in user_preferences:
                # സൃഷ്ടിപരമായ ഇഷ്‌ടാനുസരണം (1-10) അനുസരിച്ചു ടെംപറേച്ചർ സ്കെയിൽ ചെയ്യുക
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # ആവശ്യമായ പ്രതികരണ വൈവിധ്യത്തിനു അനുസരിച്ചു top_p ക്രമീകരിക്കുക
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # കസ്റ്റം സാമ്പിലിംഗ് പാരാമീറ്ററുകളുമായി അഭ്യർത്ഥന സൃഷ്ടിച്ച് അയയ്ക്കുക
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # പാരദർശിതയ്ക്കായി സാമ്പിലിംഗ് മെറ്റാഡേറ്റയോടെയുള്ള പ്രതികരണം തിരികെ നൽകുക
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

മുൻകോഡിൽ:

- അനുയോജ്യമായ സാമ്പ്ലിംഗ് കൈകാര്യം ചെയ്യുന്ന `DynamicSamplingService` ക്ലാസ് സൃഷ്ടിച്ചു.
- സൃഷ്ടിപരമായ, സ്വതന്ത്രമായ, കോഡ്, വിശകലന എന്നിവയ്‌ക്കുള്ള സാമ്പ്ലിംഗ് പ്രിസെറ്റുകൾ നിർവചിച്ചു.
- പ്രവൃത്തി തരം അനുസരിച്ച് അടിസ്ഥാന സാമ്പ്ലിംഗ് പ്രിസെറ്റ് തിരഞ്ഞെടുക്കുന്നു.
- ഉപയോക്തൃ ഇഷ്ടാനുസൃതതകളുടെ അടിസ്ഥാനത്തിൽ സാമ്പ്ലിംഗ് പാരാമീറ്ററുകൾ ക്രമീകരിച്ചു, എന്നിങ്ങനെ സൃഷ്ടിപരത്വവും വൈവിധ്യവും.
- ക്രമീകരിച്ച സാമ്പ്ലിംഗ് പാരാമീറ്ററുകളുമായി അഭ്യർത്ഥന അയച്ചു.
- സൃഷ്ടിച്ച ടെക്സ്റ്റ്, ഉപയോഗിച്ച സാമ്പ്ലിംഗ് പാരാമീറ്ററുകളും പ്രവൃത്തി തരം ഉൾക്കൊണ്ട് വന്നു.
- `temperature` ഉപയോഗിച്ച് randomness നിയന്ത്രിച്ചു, ഉയർന്ന മൂല്യങ്ങൾ കൂടുതൽ സൃഷ്ടിപരമായ പ്രതികരണങ്ങൾക്ക്.
- `top_p` ഉപയോഗിച്ച് ഒരു സമ്പൂർണ്ണ പ്രാബല്യമായ ശേഷികോടിയിൽ നിന്നും ടോക്കണുകൾ തിരഞ്ഞെടുക്കാൻ.
- `frequency_penalty` ഉപയോഗിച്ച് ആവർത്തനം കുറയ്ക്കുകയും വൈവിധ്യം വർധിപ്പിക്കുകയും ചെയ്തു.
- ഉപയോക്തൃ നിർവചിച്ച സൃഷ്ടിപരത്വവും വൈവിധ്യവും അടിസ്ഥാനമാക്കി `user_preferences` ഉപയോഗിച്ചു.
- അഭ്യർത്ഥന പ്രകാരം അനുയോജ്യമായ സാമ്പ്ലിംഗ് തന്ത്രം പ്രഖ്യാപിക്കാൻ `task_type` ഉപയോഗിച്ചു.
- ക്രമീകരിച്ച sampling പാരാമീറ്ററുകളോടെ പ്രാമ്പ്റ്റ് അയച്ചു, ആശയപ്രകാരം ടെക്സ്റ്റ് സൃഷ്ടിക്കാനായി.
- മോഡലിന്റെ പ്രതികരണം `generated_text` വഴി വാങ്ങി, സാമ്പ്ലിംഗ് പാരാമീറ്ററുകളോടും പ്രവൃത്തി തരം ഉൾപ്പടെ തിരികെ നൽകി.
- ഉപയോക്തൃ ഇഷ്ടാനുസൃതതകൾ ശരിയായ പരിധിയിൽ ഉറപ്പാക്കാൻ `min` ഉം `max` ഉം ഉപയോഗിച്ചു.

# [ജാവാസ്ക്രിപ്റ്റ് ഡൈനാമിക്](#tab/javascript-dynamic)

```javascript
// ജാവാസ്ക്രിപ്റ്റ് ഉദാഹരണം: ഉപയോക്തൃ സാഹചര്യത്തിന്റെ അടിസ്ഥാനത്തിൽ ഡൈനാമിക് സാമ്പിളിംഗ് കോൺഫിഗറേഷൻ
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // അടിസ്ഥാന സാമ്പിളിംഗ് പ്രൊഫൈലുകൾ നിർവ്വചിക്കുക
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ചരിത്ര പ്രകടനം ട്രാക്ക് ചെയ്യുക
    this.performanceHistory = [];
  }
  
  // പ്രോംപ്റ്റിൽ നിന്നുള്ള ജോലി തരം കണ്ടെത്തുക
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // ലളിതമായ ഹ്യൂറിസ്റ്റിക് കണ്ടെത്തൽ - മെഷീൻ ലേണിംഗ് ക്ലാസിഫിക്കേഷനുമായി മെച്ചപ്പെടുത്താം
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
    
    // വ്യക്തമായ തരം കണ്ടെത്താനാകാതെ പോയാൽ ഡീഫോൾട് ആയി സംവാദപരമായതായി കരുതുക
    return 'conversational';
  }
  
  // കോൺടക്സ്റ്റും ഉപയോക്തൃ മുൻഗണനകളും അടിസ്ഥാനമാക്കി സാമ്പിളിംഗ് പാരാമീറ്ററുകൾ കണക്കാക്കുക
  getSamplingParameters(prompt, context = {}) {
    // ജോലിയുടെ തരം കണ്ടെത്തുക
    const taskType = this.detectTaskType(prompt, context);
    
    // അടിസ്ഥാന പ്രൊഫൈൽ നേടുക
    let params = {...this.samplingProfiles[taskType]};
    
    // ഉപയോക്തൃ മുൻഗണനയുടെ അടിസ്ഥാനത്തിൽ ക്രമീകരിക്കുക
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 മുതൽ അനുയോജ്യമായ ടുംബന വലുപ്പത്തിലേക്ക് സ്‌കെയിൽ ചെയ്യുക
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // ഉയർന്ന കൃത്യത കുറവ് ടോപി (കൂടുതൽ കേന്ദ്രീകൃത തിരഞ്ഞെടുപ്പ്) അർത്ഥമാക്കുന്നു
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // ഉയർന്ന സ്ഥിരത കുറവായ ശിക്ഷകൾ അർത്ഥമാക്കുന്നു
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // പ്രകടന ചരിത്രത്തിൽ നിന്നുള്ള പഠിച്ച ക്രമീകരണങ്ങൾ പ്രയോഗിക്കുക
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // ലളിതമായ അനുകുലമായ ലാജിക് - കൂടുതൽ സങ്കീർണ്ണ അല്ഗോറിതങ്ങൾ ഉപയോഗിച്ച് മെച്ചപ്പെടുത്താം
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // അടുത്തകാലത്തെ ചരിത്രം മാത്രമേ പരിഗണിക്കൂ
    
    if (relevantHistory.length > 0) {
      // ശരാശരി പ്രകടന സ്കോറുകൾ കണക്കാക്കുക
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // പ്രകടനം തThreshold താഴെയാണെങ്കിൽ, പാരാമീറ്ററുകൾ ക്രമീകരിക്കുക
      if (avgScore < 0.7) {
        // സുരക്ഷിത മൂല്യങ്ങളിലേക്കുള്ള ചെറിയ ക്രമീകരണം
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // ഭാവിയിലുള്ള ക്രമീകരണങ്ങൾക്ക് വേണ്ടിയുള്ള പ്രകടനം രേഖപ്പെടുത്തുക
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // പ്രതികരണ ഗുണനിലവാരത്തിന്റെ 0-1 റേറ്റിങ്ങ്
    });
    
    // ചരിത്ര വലുപ്പം പരിമിതപ്പെടുത്തുക
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // മെച്ചപ്പെടുത്തിയ സാമ്പിളിംഗ് പാരാമീറ്ററുകൾ നേടുക
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // മെച്ചപ്പെടുത്തിയ പാരാമീറ്ററുകളുമായി അഭ്യർത്ഥനം അയക്കുക
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // ഉപയോക്താവ് ഫീഡ്ബാക്ക് നൽകുകയാണെങ്കിൽ, ഭാവിയിലേക്കുള്ള മെച്ചപ്പെടുത്തലിനായി അത് രേഖപ്പെടുത്തുക
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

// ഉദാഹരണ ഉപയോഗം
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // സൃഷ്ടിപരമായ ജോലി ഉപയോക്തൃ കസ്റ്റം മുൻഗണനകളോടെ
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // ഉയർന്ന സൃഷ്ടിപരത്വം (1-10)
          consistency: 3  // താഴ്ന്ന സ്ഥിരത (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // കോഡ് ജനറേഷൻ ജോലി
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // താഴ്ന്ന സൃഷ്ടിപരത്വം
          precision: 8,   // ഉയർന്ന കൃത്യത
          consistency: 9  // ഉയർന്ന സ്ഥിരത
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

മുൻകോഡിൽ:

- പ്രാമ്പ്റ്റിന്റെ പ്രകാരം തരം തിരിച്ചറിയുകയും ഉപയോക്തൃ ഇഷ്ടാനുസൃതതകൾ അടിസ്ഥാനമാക്കി ഡൈനാമിക് സാമ്പ്ലിംഗ് നിയന്ത്രിക്കുകയും ചെയ്യുന്ന `AdaptiveSamplingManager` ക്ലാസ് സൃഷ്ടിച്ചു.
- സൃഷ്ടിപരമായ, സ്വതന്ത്രമായ, കോഡ്, സംഭാഷണാത്മക പ്രവർത്തനങ്ങൾക്കുള്ള സാമ്പ്ലിംഗ് പ്രൊഫൈലുകൾ നിർവചിച്ചു.
- ലളിതമായ ഹ്യൂരിസ്റ്റിക് ഉപയോഗിച്ച് പ്രാംപ്റ്റിൽ നിന്നു പ്രവൃത്തി തരം നിർണ്ണയിക്കാൻ ഒരു രീതിവിധി നടപ്പിലാക്കി.
- വ്യത്യസ്തം പ്രവൃത്തി തരം കണക്കിലെടുത്തു sampling പാരാമീറ്ററുകൾ കണക്കാക്കി.
- ചരിത്രം അനുസരിച്ച് പഠിച്ച ക്രമീകരണങ്ങൾ sampling പാരാമീറ്ററുകളിൽ അപ്ഡേറ്റ് ചെയ്തു.
- നാൾവഴി പ്രകടനം രേഖപ്പെടുത്തുകയും സംവിധാനം പഴയ അനുഭവങ്ങളിൽ നിന്ന് പഠിക്കാൻ സഹായിക്കുകയും ചെയ്തു.
- ഡൈനാമിക് sampling പാരാമീറ്ററുകളോടെ അഭ്യർത്ഥനകൾ അയച്ച് നിലക്കുന്ന sampling പാരാമീറ്ററുകളോടും പ്രവൃത്തി തരം അനുബന്ധിച്ച് സൃഷ്ടിച്ച ടെക്സ്റ്റ് തിരികെ നൽകി.
- ഉപയോഗിച്ചത്:
    - ഉപയോക്തൃ നിർവചിച്ച സൃഷ്ടിപരത്വം, കൃത്യത, സ്ഥിരത തലങ്ങൾ അടിസ്ഥാനമാക്കി sampling പാരാമീറ്ററുകൾ ഇഷ്‌ടാനുസൃതമാക്കാൻ `userPreferences`.
    - പ്രാമ്പ്റ്റ് അടിസ്ഥാനമാക്കി പ്രവൃത്തി തരം തിരിച്ചറിയാൻ `detectTaskType`.
    - സൃഷ്ടിച്ച പ്രതികരണ പ്രകടനം രേഖപ്പെടുത്താൻ `recordPerformance`, തുടർച്ചയായി മെച്ചപ്പെടുത്താൻ.
    - ചരിത്രം അനുസരിച്ച് sampling പാരാമീറ്ററുകൾ ക്രമീകരിക്കാൻ `applyLearnedAdjustments`.
    - വിവിധ പ്രാമ്പ്റ്റുകൾക്കും കോൺടെക്സ്റ്റിനും അനുയോജ്യമായ adaptive sampling ഉപയോഗിച്ച് പ്രതികരണ നിർമാണം `generateResponse`.
    - നിർമ്മാണ സമയത്ത് ഉപയോഗിക്കാവുന്ന ടൂളുകൾ നിർദ്ദേശിക്കാൻ `allowedTools`, കോൺടെക്സ്റ്റ് അറിവുള്ള പ്രതികരണങ്ങൾക്കായി.
    - സൃഷ്ടിച്ച പ്രതികരണ ഗുണനിലവാരം ഉപയോക്താക്കൾക്ക് പേരായ ഫീഡ്ബാക്ക് നൽകാൻ `feedbackScore`, മോഡൽ പ്രകടനം മെച്ചപ്പെടുത്താൻ.
    - പഴയ ഇടപെടലുകളുടെ രേഖ നിലനിർത്താൻ `performanceHistory`, വിജയങ്ങളും പരാജയങ്ങളും പഠിക്കാൻ.
    - അഭ്യർത്ഥനയുടെ കോൺടെക്സ്റ്റ് അനുസരിച്ച് sampling പാരാമീറ്ററുകൾ ഡൈനാമിക് ക്രമീകരിക്കാൻ `getSamplingParameters`.
    - വിവിധ അഭ്യർത്ഥന തരം തിരിച്ചറിയാനും അനുയോജ്യമായ sampling തന്ത്രങ്ങൾ പ്രയോഗിക്കാനും `detectTaskType`.
    - sampling പ്രൊഫൈലുകൾ സൃഷ്ടിചെയ്യാൻ `samplingProfiles`, അഭ്യർത്ഥനയുടെ സ്വഭാവത്തിനു അനുസരിച്ച് എളുപ്പം ക്രമീകരണങ്ങൾ നടത്താൻ.

---

## അടുത്തത് എന്ത്

- [5.7 സ്കെയിലിംഗ്](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->