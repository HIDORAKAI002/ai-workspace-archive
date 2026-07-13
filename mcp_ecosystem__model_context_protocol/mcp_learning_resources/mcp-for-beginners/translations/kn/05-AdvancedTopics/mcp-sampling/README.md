# ಮಾದರಿ ಪ್ರ.context ಪ್ರೋಟೋಕಾಲ್ ನಲ್ಲಿ ಮಾದರಿ

ಮಾದರಿ ಒಂದು ಶಕ್ತಿಶಾಲಿ MCP ವೈಶಿಷ್ಟ್ಯವಾಗಿದ್ದು, ಸರ್ವರ್‌ಗಳಿಗೆ ಕ್ಲೈಂಟ್ ಮುಖಾಂತರ LLM ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಗಳನ್ನು ವಿನಂತಿಸಲು ಅನುಮತಿಸುತ್ತದೆ, ಇದು ಭದ್ರತೆ ಮತ್ತು ಗೌಪ್ಯತೆಯನ್ನು ಕಾಯ್ದುಕೊಳ್ಳುತ್ತಾ ಪ್ರಗತಿಶೀಲ ಏಜೆಂಟಿಕ್ ವ್ಯವಹಾರಗಳನ್ನು ಸಾದ್ಯಮಾಡುತ್ತದೆ. ಸರಿಯಾದ ಮಾದರಿ ಸಂರಚನೆಯು ಪ್ರತಿಕ್ರಿಯೆಯ ಗುಣಮಟ್ಟ ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ನುಡಿಯಂತೆ ಸುಧಾರಿಸಬಹುದು. MCP ಅನ್ನು ಮಾದರಿಗಳು ಪಠ್ಯವನ್ನು ರಚಿಸುವ ವಿಧಾನವನ್ನು ನಿಯಂತ್ರಿಸಲು ಸಾಮಾನ್ಯ ನಿಯಮವಿದೆ, ಇದು ಅಂಕಿಅಂಶ, ಸೃಜನಶೀಲತೆ ಮತ್ತು ಸಮ್ಮಿಲನತೆಯನ್ನು ಪ್ರಭಾವಿತ ಮಾಡುವ ವಿಶೇಷ ನಿಯತಾಂಕಗಳೊಂದಿಗೆ ಸಹ.

## ಪರಿಚಯ

ಈ ಪಾಠದಲ್ಲಿ, ನಾವು MCP ವಿನಂತಿಗಳಲ್ಲಿ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಹೇಗೆ ಸಂರಚಿಸುವುದು ಮತ್ತು ಮಾದರಿಯ ಅಡಿಯಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಪ್ರೋಟೋಕಾಲು ನೀಡುವುದನ್ನು ಅನ್ವೇಷಿಸುತ್ತೇವೆ.

## ಕಲಿಕಾ ಗುರಿಗಳು

ಈ ಪಾಠದ ಕೊನೆಯಲ್ಲಿ, ನೀವು:

- MCP ನಲ್ಲಿ ಲಭ್ಯವಿರುವ ಪ್ರಮುಖ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದು.
- ವಿಭಿನ್ನ ಬಳಕೆ ಸಂದರ್ಭಗಳಿಗೆ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಸಂರಚಿಸಬಹುದು.
- ಪುನರುತ್ಪಾದನೀಯ ಫಲಿತಾಂಶಗಳಿಗೆ ನಿರ್ಧಾರಾತ್ಮಕ ಮಾದರಿಯನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಬಹುದು.
- ಸಂಧರ್ಭ ಮತ್ತು ಬಳಕೆದಾರ ಪ್ರಾಧಾನ್ಯತೆಯ ಆಧಾರದಲ್ಲಿ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಪ್ರಮಾಣಮಾಪನವಾಗಿ ಹೊಂದಿಸಬಹುದು.
- ವಿವಿಧ ಸಂದರ್ಭಗಳಲ್ಲಿ ಮಾದರಿ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಸುಧಾರಿಸಲು ಮಾದರಿ ತಂತ್ರಗಳನ್ನು ಅನ್ವಯಿಸಬಹುದು.
- MCP ನ ಕ್ಲೈಂಟ್-ಸ್ಯರ್ವರ್ ಹರಿವಿನಲ್ಲಿ ಮಾದರಿ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಎಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದು.

## MCP ನಲ್ಲಿ ಮಾದರಿ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ

MCP ನಲ್ಲಿ ಮಾದರಿ ಹರಿವು ಈ ಹಂತಗಳನ್ನು ಅನುಸರಿಸುತ್ತದೆ:

1. ಸರ್ವರ್ `sampling/createMessage` ವಿನಂತಿಯನ್ನು ಕ್ಲೈಂಟ್‌ಗೆ ಕಳುಹಿಸುತ್ತದೆ
2. ಕ್ಲೈಂಟ್ ವಿನಂತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಅಗತ್ಯವಿದ್ದರೆ ಬದಲಾಯಿಸಬಹುದು
3. ಕ್ಲೈಂಟ್ LLM ನಿಂದ ಮಾದರಿಸಿ
4. ಕ್ಲೈಂಟ್ ಪೂರ್ಣಗೊಳ್ಳುವಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ
5. ಕ್ಲೈಂಟ್ ಫಲಿತಾಂಶವನ್ನು ಸರ್ವರ್‌ಗೆ ಹಿಂತಿರುಗಿಸುತ್ತದೆ

ಈ ಮಾನವ-ಆಧಾರಿತ ವಿನ್ಯಾಸವು ಬಳಕೆದಾರರಿಗೆ LLM ಇದನ್ನು ಏನು ನೋಡಿ ಮತ್ತು ಸೃಜಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ನಿಯಂತ್ರಣದಲ್ಲಿರಿಸುತ್ತದೆ.

## ಮಾದರಿ ನಿಯತಾಂಕಗಳ ಅವಲೋಕನ

MCP ನಲ್ಲಿ ಗ್ರಾಹಕ ವಿನಂತಿಗಳಲ್ಲಿ ಸಂರಚಿಸಲು ಕೆಳಗಿನ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ವಿವರಿಸುತ್ತದೆ:

| ನಿಯತಾಂಕ | ವರ್ಣನೆ | ಸಾಮಾನ್ಯ ವ್ಯಾಪ್ತಿ |
|-----------|-------------|---------------|
| `temperature` | ಟೋಕನ್ ಆಯ್ಕೆಯಲ್ಲಿ ಅನಿಶ್ಚಿತತೆಯನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ | 0.0 - 1.0 |
| `maxTokens` | ಉತ್ಪಾದಿಸಲು ಹೆಚ್ಚುವರಿ ಟೋಕನ್ ಸಂಖ್ಯೆ | ಪೂರ್ಣಾಂಕ ಮೌಲ್ಯ |
| `stopSequences` | ಕಂಡುಬಂದಾಗ ಉತ್ಪಾದನೆಯನ್ನು ನಿಲ್ಲಿಸುವ ಕಸ್ಟಮ್ ಸರಣಿಗಳು | ಸ್ಟ್ರಿಂಗ್‌ಗಳ ಅರೆ |
| `metadata` | ಪುರೈಕೆದಾರ ವಿಶೇಷ ನಿಯತಾಂಕಗಳ ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ | JSON ವಸ್ತು |

ಬಹುತೇಕ LLM ಪುರೈಕೆದಾರರು `metadata` ಕ್ಷೇತ್ರದ ಮೂಲಕ ಹೆಚ್ಚುವರಿ ನಿಯತಾಂಕಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತಾರೆ, ಅವು ಮುಂದೆ ಇರಬಹುದು:

| ಸಾಮಾನ್ಯ ವಿಸ್ತರಣ ನಿಯತಾಂಕ | ವರ್ಣನೆ | ಸಾಮಾನ್ಯ ವ್ಯಾಪ್ತಿ |
|-----------|-------------|---------------|
| `top_p` | ನ್ಯೂಕ್ಲಿಯಸ್ ಮಾದರಿ - ಟೋಕನ್‌ಗಳನ್ನು ಮೇಲ್ನೋಟ ಅಂಕಿತ ಪ್ರಮಾಣಕ್ಕೆ ಮಿತಿಮಾಡುತ್ತದೆ | 0.0 - 1.0 |
| `top_k` | ಟೋಕನ್ ಆಯ್ಕೆಯನ್ನು ಮೇಲಿನ K ಆಯ್ಕೆಗಳಿಗೆ ಮಿತಿಮಾಡುತ್ತದೆ | 1 - 100 |
| `presence_penalty` | ಈಗಾಗಲೇ ಪಠ್ಯದಲ್ಲಿ ಇದ್ದ ಟೋಕನ್‌ಗಳಿಗೆ ಶಿಕ್ಷೆ ನೀಡುತ್ತದೆ | -2.0 - 2.0 |
| `frequency_penalty` | ಟೋಕನ್ ಪುನರಾವರ್ತನೆಯ ಆಧಾರದ ಮೇಲೆ ಶಿಕ್ಷೆ ನೀಡುತ್ತದೆ | -2.0 - 2.0 |
| `seed` | ಪುನರುತ್ಪಾದನೀಯ ಫಲಿತಾಂಶಕ್ಕೆ ನಿರ್ದಿಷ್ಟ ಅನಿಶ್ಚಿತ ಅಂಕಿ ಬೀಜ | ಪೂರ್ಣಾಂಕ ಮೌಲ್ಯ |

## ಉದಾಹರಣೆ ವಿನಂತಿ ಫಾರ್ಮಾಟ್

ಇಲ್ಲಿದೆ MCP ನಲ್ಲಿ ಕ್ಲೈಂಟ್‌ನಿಂದ ಮಾದರಿ ವಿನಂತಿ ಮಾಡುವುದು ಹೇಗೆ ಎಂಬ ಉದಾಹರಣೆ:

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

## ಪ್ರತಿಕ್ರಿಯಾ ಫಾರ್ಮಾಟ್

ಕ್ಲೈಂಟ್ ಪೂರ್ಣಗೊಳ್ಳುವಿಕೆಯನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ:

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

## ಮಾನವ ನಿಯಂತ್ರಣ

MCP ಮಾದರಿಗೆ ಮಾನವ ಇಂಕರ್ವೀಕ್ಷಣೆ ಆಯೋಜಿಸಲಾಗಿದೆ:

- **ಪ್ರಾಂಪ್ಟ್‌ಗಳಿಗೆ**:
  - ಕ್ಲೈಂಟ್‌ಗಳು ಬಳಕೆದಾರರಿಗೆ ಸೂಚಿಸಲಾದ ಪ್ರಾಂಪ್ಟ್ ತೋರಿಸಬೇಕು
  - ಬಳಕೆದಾರರು ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಲು ಅಥವಾ ತಿರಸ್ಕರಿಸಲು ಸಾಧ್ಯವಾಗಬೇಕು
  - ವ್ಯವಸ್ಥೆ ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ನಿಯಂತ್ರಿಸಬಹುದು ಅಥವಾ ಬದಲಾಯಿಸಬಹುದು
  - ಸಾಧ್ಯವಾದ ಸಂಧರ್ಭವನ್ನು ಕ್ಲೈಂಟ್ ನಿಯಂತ್ರಿಸುತ್ತದೆ

- **ಪೂರ್ಣಗೊಳ್ಳುವಿಕೆಗಳಿಗೆ**:
  - ಕ್ಲೈಂಟ್ ಬಳಕೆದಾರರಿಗೆ ಪೂರ್ಣಗೊಳ್ಳುವಿಕೆಯನ್ನು ತೋರಿಸಬೇಕು
  - ಬಳಕೆದಾರರು ಪೂರ್ಣಗೊಳ್ಳುವಿಕೆಯನ್ನು ಬದಲಾಯಿಸಲು ಅಥವಾ ತಿರಸ್ಕರಿಸಲು ಸಾಧ್ಯವಾಗಬೇಕು
  - ಕ್ಲೈಂಟ್‌ಗಳು ಪೂರ್ಣಗೊಳ್ಳುವಿಕೆಯನ್ನು ಫಿಲ್ಟರ್ ಅಥವಾ ಬದಲಾಯಿಸಬಹುದು
  - ಬಳಕೆದಾರರು ಯಾವ ಮಾದರಿಯನ್ನು ಬಳಸುತ್ತಾರೋ ಆ ಮಾದರಿಯನ್ನು ನಿಯಂತ್ರಿಸುತ್ತಾರೆ

ಈ 원則ಗಳೊಂದಿಗೆ, ಬಿಶೇಷವಾಗಿ LLM ಪುರೈಕೆದಾರರಿಂದ ಸಾಮಾನ್ಯವಾಗಿ ಬೆಂಬಲ ಹೊಂದಿರುವ ನಿಯತಾಂಕಗಳ ಮೇಲೆ ಗಮನ ನೀಡುತ್ತಾ ವಿವಿಧ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳಲ್ಲಿ ಮಾದರಿಗೆ ಹೇಗೆ ಅನುಷ್ಠಾನಗೊಳಿಸುಹೊದುದು ಎಂಬುದನ್ನು ನೋಡೋಣ.

## ಭದ್ರತಾ ಪರಿಗಣನೆಗಳು

MCP ನಲ್ಲಿ ಮಾದರಿ ಅನುಷ್ಠಾನಗೊಳಿಸುವಾಗ ಈ ಭದ್ರತಾ ಉತ್ತಮ ಸಂಬಂಧಗಳನ್ನು ಪರಿಗಣಿಸಿ:

- **ಎಲ್ಲಾ ಸಂದೇಶ ವಿಷಯವನ್ನು ಪರಿಶೀಲಿಸಿ** ಅದು ಕ್ಲೈಂಟ್‌ಗೆ ಕಳುಹಿಸುವ ಮೊದಲು
- **ಪ್ರಾಂಪ್ಟ್‌ಗಳು ಮತ್ತು ಪೂರ್ಣಗೊಳ್ಳುವಿಕೆಗಳಿಂದ ಸಂವೇದನಶೀಲ ಮಾಹಿತಿಯನ್ನು ಶುದ್ಧೀಕರಿಸಿ**
- **ದುರ್ಬಳಕೆ ತಪ್ಪಿಸಲು ದರ ಮಿತಿಗಳನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿ**
- **ಮಾದರಿ ಉಪಯೋಗದ ಅಸಾಧಾರಣ ಮಾದರಿಗಳನ್ನು ಕೇಜುಟ್ ಮಾಡಿ**
- **ಸುರಕ್ಷಿತ ಪ್ರೋಟೋಕಾಲ್ ಗಳನ್ನು ಬಳಸಿ ಡೇಟಾವನ್ನು ಸಂಚಾರದಲ್ಲಿ ಗುಪ್ತಗೊಳಿಸಿ**
- **ಬಳಕೆದಾರ ಡೇಟಾ ಗೌಪ್ಯತೆಯನ್ನು ಸಂಬಂಧಿತ ನಿಯಮಾವಳಿಗಳಂತೆ ನಿರ್ವಹಿಸಿ**
- **ಅನುಸರಣೆ ಮತ್ತು ಭದ್ರತಕ್ಕಾಗಿ ಮಾದರಿ ವಿನಂತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ**
- **ತಕ್ಕಷ್ಟು ಮಿತಿಗಳನ್ನು ಹೊಂದಿಸಿ ವೆಚ್ಚ ಅನಾವರಣವನ್ನು ನಿಯಂತ್ರಿಸಿ**
- **ಮಾದರಿ ವಿನಂತಿಗಳಿಗೆ ಸಮಯ ಮಿತಿಯನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿ**
- **ಮಾದರಿ ದೋಷಗಳನ್ನು ಸೂಕ್ತ ಬದಲು ಉಪಾಯಗಳೊಂದಿಗೆ ಸಹಾನುಭೂತಿಯಾಗಿ ನಿರ್ವಹಿಸಿ**

ಮಾದರಿ ನಿಯತಾಂಕಗಳು ಭಾಷಾ ಮಾದರಿಗಳ ವರ್ತನೆವನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಹೊಂದಿಸಲು ಅನುಮತಿಸುತ್ತವೆ, ನಿರ್ಧಾರಾತ್ಮಕ ಮತ್ತು ಸೃಜನಾತ್ಮಕ ಔಟ್‌ಪುಟ್‌ಗಳ ನಡುವೆ ಬೇಕಾದ ಸಮತೋಲನವನ್ನು ಹೊಂದಲು.

ಈ ನಿಯತಾಂಕಗಳನ್ನು ವಿಭಿನ್ನ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳಲ್ಲಿ ಹೇಗೆ ಸಂರಚಿಸುವುದನ್ನು ನೋಡೋಣ.

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

ಮೇಲೆ ನೀಡಲಾದ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ನಿರ್ದಿಷ್ಟ ಸರ್ವರ್ URL ನೊಂದಿಗೆ MCP ಕ್ಲೈಂಟ್ ಅನ್ನು ರಚಿಸಿದೆವು.
- `temperature`, `top_p`, ಮತ್ತು `top_k` ಮೊದಲಾದ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಹೊಂದಿಸಿ ವಿನಂತಿಯನ್ನು ಸಂರಚಿಸಿದೆವು.
- ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಿ ಉತ್ಪಾದಿತ ಪಠ್ಯವನ್ನು ಮುದ್ರಿಸಿದೆವು.
- ಬಳಸಲಾಗಿದೆ:
    - `allowedTools` ಮಾದರಿ ಉತ್ಪಾದನಾ ಸಮಯದಲ್ಲಿ ಉಪಯೋಗಿಸಬಹುದಾದ ಸಾಧನಗಳನ್ನು ಸೂಚಿಸಲು. ಈ ಪ್ರಕರಣದಲ್ಲಿ, ನಾವು ಕ್ರಿಯಾತ್ಮಕ ಆ್ಯಪ್ ಐ디어ಗಳಿಗಾಗಿ `ideaGenerator` ಮತ್ತು `marketAnalyzer` ಸಾಧನಗಳನ್ನು ಅನುಮತಿಸಿದೆವು.
    - `frequencyPenalty` ಮತ್ತು `presencePenalty` ಆಯಾ ಪದಗಳ ಪುನರಾವರ್ತನೆ ಮತ್ತು ವೈವಿಧ್ಯತೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು.
    - `temperature` ಆಫ್‌ಪುಟ್‌ನ ಅನಿಶ್ಚಿತತೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು, ಹೆಚ್ಚು ಮೌಲ್ಯಗಳು ಹೆಚ್ಚು ಸೃಜನಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಕಾರಣವಾಗುತ್ತವೆ.
    - `top_p` ಟೋಕನ್ ಆಯ್ಕೆಯನ್ನು ಮೇಲಿನ ಸಮಗ್ರತಾಂಶದ ಪ್ರಮಾಣ ಮಿತಿಗೆ ಸೀಮಿತಗೊಳಿಸಿ ಉತ್ಪಾದಿತ ಪಠ್ಯದ ಗುಣಮಟ್ಟವನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.
    - `top_k` ಮಾದರಿಯನ್ನು ಟಾಪ್ K ಬಹುಷಃ ಟೋಕನ್‌ಗಳಿಗೆ ಸೀಮಿತಗೊಳಿಸುವ ಮೂಲಕ ಹೆಚ್ಚು ಸಮನ್ವಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಸಹಾಯ ಮಾಡುತ್ತದೆ.
    - `frequencyPenalty` ಮತ್ತು `presencePenalty` ಮತ್ತೊಮ್ಮೆ ಪುನರಾವರ್ತನೆ ಕಡಿಮೆಗೆ ಹಾಗೂ ವೈವಿಧ್ಯತೆಯ ಉತ್ತೇಜನಕ್ಕೆ ಬಳಸಲಾಗಿದೆ.

# [JavaScript](#tab/javascript)

```javascript
// ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಉದಾಹರಣೆ: ತಾಪಮಾನ ಮತ್ತು ಟಾಪ್-ಪಿ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಸಂರಚನೆ
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP ಕ್ಲೈಂಟ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಿ
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // ವಿಭಿನ್ನ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಪರಿಮಾಣಗಳೊಂದಿಗೆ ವಿನಂತಿಯನ್ನು ಸಂರಚಿಸಿ
  const creativeSampling = {
    temperature: 0.9,    // ಹೆಚ್ಚಿರುವ ತಾಪಮಾನ = ಹೆಚ್ಚು ಯಾದೃಚ್ಛಿಕತೆ/ರಚನಾತ್ಮಕತೆ
    topP: 0.92,          // ಟಾಪ್ 92% ಪ್ರಾಬಬಿಲಿಟಿ ಮಾಸ್ ಇರುವ ಟೋಕನ್ಗಳನ್ನು ಪರಿಗಣಿಸಿ
    frequencyPenalty: 0.6, // ಟೋಕನ್ ಸರಣಿಗಳ ಪುನರಾವೃತ್ತಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ
    presencePenalty: 0.4   // ಇಂದಿನ ವಚಾರದಲ್ಲಿ ಈಗಾಗಲೇ ಕಾಣಿಸಿಕೊಂಡಿರುವ ಟೋಕನ್ಗಳಿಗೆ ದಂಡ ವಿಧಿಸಿ
  };
  
  const factualSampling = {
    temperature: 0.2,    // ಕಡಿಮೆ ತಾಪಮಾನ = ಹೆಚ್ಚು ನಿರ್ದಿಷ್ಟ/ತಥ್ಯಾತ್ಮಕ
    topP: 0.85,          // ಸ್ವಲ್ಪ ಹೆಚ್ಚು ಕೇಂದ್ರೀಕೃತ ಟೋಕನ್ ಆಯ್ಕೆ
    frequencyPenalty: 0.2, // ಕನಿಷ್ಠ ಪುನರಾವೃತ್ತಿ ದಂಡ
    presencePenalty: 0.1   // ಕನಿಷ್ಟ ಪ್ರಾಜ್ಞಾಪನ ದಂಡ
  };
  
  try {
    // ವಿಭಿನ್ನ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಸಂರಚನೆಗಳೊಂದಿಗೆ ಎರಡು ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ
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

ಮೇಲೆ ನೀಡಲಾದ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಸರ್ವರ್ URL ಮತ್ತು API ಕೀ ಬಳಸಿ MCP ಕ್ಲೈಂಟ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಿದೆವು.
- ಎರಡು ಸೆಟ್‌ಗಳ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಸಂರಚಿಸಿದೆವು: ಕ್ರಿಯಾತ್ಮಕ ಕಾರ್ಯಗಳಿಗಾಗಿ ಮತ್ತು ವಾಸ್ತವಿಕ ಕಾರ್ಯಗಳಿಗಾಗಿ.
- ಈ ಸಂಯೋಜನೆಗಳಿಂದ ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ, ಪ್ರತಿ ಕಾರ್ಯಕ್ಕೂ ವಿಶಿಷ್ಟ ಸಾಧನಗಳನ್ನು ಬಳಸಲು ಮಾದರಿಯನ್ನು ಅನುಮತಿಸಿದೆವು.
- ವಿಭಿನ್ನ ಮಾದರಿ ನಿಯತಾಂಕಗಳ ಪರಿಣಾಮಗಳನ್ನು ತೋರಿಸಲು ಉತ್ಪಾದಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಮುದ್ರಿಸಿದೆವು.
- `allowedTools` ಉಪಕರಣಗಳನ್ನು ಸೂಚಿಸಲು ಬಳಸಲಾಗಿದೆ, ಉದಾಹರಣೆಗೆ, ಕ್ರಿಯಾತ್ಮಕ ಕಾರ್ಯಗಳಿಗೆ `ideaGenerator` ಮತ್ತು `environmentalImpactTool` ಮತ್ತು ವಾಸ್ತವಿಕ ಕಾರ್ಯಗಳಿಗೆ `factChecker` ಮತ್ತು `dataAnalysisTool`.
- `temperature` ಆಯ್ಕೆಯಿಂದ ಆಫ್‌ಪುಟ್‌ನ ಅನಿಶ್ಚಿತತೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು, ಹೆಚ್ಚುವರಿ ಮೌಲ್ಯಗಳು ಹೆಚ್ಚು ಸೃಜನಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಕಾರಣವಾಗುತ್ತವೆ.
- `top_p` ಟೋಕನ್ ಆಯ್ಕೆಯನ್ನು ಮೇಲಿನ ಸಮಗ್ರತಾಂಶದ ಪ್ರಮಾಣಕ್ಕೆ ಮಿತಿಗೊಳಿಸಲು ಬಳಸಲಾಗಿದೆ, ಉತ್ಪಾದಿತ ಪಠ್ಯದ ಗುಣಮಟ್ಟವನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.
- `frequencyPenalty` ಮತ್ತು `presencePenalty` ಪುನರಾವರ್ತನೆ ಕಡಿಮೆಮಾಡಲು ಮತ್ತು ವೈವಿಧ್ಯತೆಯನ್ನು ಉತ್ತೇಜಿಸಲು ಬಳಕೆಯಾಗಿದೆ.
- `top_k` ಮಾದರಿಯನ್ನು ಟಾಪ್ K ಬಹುಷಃ ಟೋಕನ್‌ಗಳಿಗೆ ಮಿತಿಗೊಳಿಸಲು, ಹೆಚ್ಚು ಸಮನ್ವಯಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.

---

## ನಿರ್ಧಾರಾತ್ಮಕ ಮಾದರಿ

ಸ್ಥಿರ ಫಲಿತಾಂಶ ಅವಶ್ಯಕತೆ ಇರುವ ಅಪ್ಲಿಕೇಶನ್‌ಗಳಿಗೆ, ನಿರ್ಧಾರಾತ್ಮಕ ಮಾದರಿ ಪುನರುತ್ತಿರಿಸಲಾಗುವ ಫಲಿತಾಂಶಗಳನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ. ಇದು ನಿಶ್ಚಿತ ಅನಿಶ್ಚಿತ ಅಂಕಿ ಬೀಜವನ್ನು ಉಪಯೋಗಿಸುವ ಮೂಲಕ ಹಾಗೂ ತಾಪಮಾನವನ್ನು ಶೂನ್ಯಕ್ಕೆ ಹೊಂದಿಸುವ ಮೂಲಕ ಸಾಧಿಸುತ್ತದೆ.

ವಿವಿಧ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳಲ್ಲಿ ನಿರ್ಧಾರಾತ್ಮಕ ಮಾದರಿ ಅನುಷ್ಠಾನವನ್ನು ತೋರಿಸಲು ಕೆಳಗಿನ ಮಾದರಿ ಕಂಡುಹಿಡಿಯೋಣ.

# [Java](#tab/java)

```java
// ಜಾವಾ ಉದಾಹರಣೆ: ನಿಶ್ಚಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳು ನಿಗದಿತ ಬೀಜದೊಂದಿಗೆ
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // ನಿಶ್ಚಿತ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ನಿಗದಿತ ಬೀಜವನ್ನು ಬಳಸುವುದರಲ್ಲಿ
        
        // ನಿಗದಿತ ಬೀಜದೊಂದಿಗೆ ಮೊದಲ ವಿನಂತಿ
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // ಗರಿಷ್ಠ ನಿಶ್ಚಿತತೆಗಾಗಿ ಶೂನ್ಯ ತಾಪಮಾನ
            .build();
            
        // ಅದೇ ಬೀಜದೊಂದಿಗೆ ಎರಡನೇ ವಿನಂತಿ
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // ಇಬ್ಬರು ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // ಅದೇ ಬೀಜ ಮತ್ತು ತಾಪಮಾನ=0 ಕಾರಣ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಸಮಾನವಾಗಿರಬೇಕು
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

ಮೇಲೆ ನೀಡಲಾದ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ನಿರ್ದಿಷ್ಟ ಸರ್ವರ್ URL ನೊಂದಿಗೆ MCP ಕ್ಲೈಂಟ್ ಅನ್ನು ರಚಿಸಿದೆವು.
- ಒಂದೇ ಪ್ರಾಂಪ್ಟ್, ನಿಶ್ಚಿತ ಬೀಜ ಮತ್ತು ಶೂನ್ಯ ತಾಪಮಾನ ಹೊಂದಿರುವ ಎರಡು ವಿನಂತಿಗಳನ್ನು ಸಂರಚಿಸಿದೆವು.
- ಎರಡೂ ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ ಉತ್ಪಾದಿತ ಪಠ್ಯವನ್ನು ಮುದ್ರಿಸಿದೆವು.
- ಸಮಾನ ಫಲಿತಾಂಶಗಳು ನಿರ್ಧಾರಾತ್ಮಕ ಮಾದರಿ ಸಂಯೋಜನೆಯ (ಒಂದು ಹೇಳಿಕೆಗೆ ಬೀಜ ಮತ್ತು ತಾಪಮಾನ) ಅಭಿನಯದ ಕಾರಣದಂದು ತೋರಿಸಲಾಗಿದೆ.
- `setSeed` ಅನ್ನು ನಿಶ್ಚಿತ ಅನಿಶ್ಚಿತ ಅಂಕಿ ಬೀಜವನ್ನು ಸೂಚಿಸಲು ಬಳಸಲಾಗಿದೆ, ಇದರಿಂದ ಅಂದರೆ ಮಾದರಿ ಪ್ರತಿಯೊಂದು ಬಾರಿ ಒಂದೇ ಇನ್‌ಪುಟ್‌ಗೆ ಒಂದೇ ಔಟ್‌ಪುಟ್ ಅನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ.
- `temperature` ಅನ್ನು ಶೂನ್ಯಕ್ಕೆ ಹೊಂದಿಸಲಾಗಿದೆ, ಇದರಿಂದ ಹೆಚ್ಚಿನ ನಿರ್ಧಾರಾತ್ಮಕತೆ ಅನುಸರಿಸಲಾಗುತ್ತದೆ, ಅಂದರೆ ಮಾದರಿ ಯಾವಾಗಲೂ ಅತಿಶಯ ಸಾಧ್ಯತೆಯ ಮುಂದಿನ ಟೋಕನ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡುತ್ತದೆ.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಉದಾಹರಣೆ: ಬೀಜ ನಿಯಂತ್ರಣದೊಂದಿಗೆ ನಿರ್ಧಾರಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆಗಳು
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // ಸ್ಥಿರ ಬೀಜದೊಂದಿಗೆ ಮೊದಲ ವಿನಂತಿ
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // ಗರಿಷ್ಠ ನಿರ್ಧಾರಾತ್ಮಕತೆಯಿಗಾಗಿ ಶೂನ್ಯ ತಾಪಮಾನ
    });
    
    // ಅದೇ ಬೀಜ ಮತ್ತು ತಾಪಮಾನ ಹೊಂದಿದ ಎರಡನೇ ವಿನಂತಿ
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // ಬೇರೆಯ ಬೀಜದೊಂದಿಗೆ, ಆದರೆ ಅದೇ ತಾಪಮಾನದ ಮೂರನೇ ವಿನಂತಿ
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

ಮೇಲೆ ನೀಡಲಾದ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಸರ್ವರ್ URL ಬಳಸಿ MCP ಕ್ಲೈಂಟ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಿದೆವು.
- ಒಂದೇ ಪ್ರಾಂಪ್ಟ್, ನಿಶ್ಚಿತ ಬೀಜ ಮತ್ತು ಶೂನ್ಯ ತಾಪಮಾನ ಹೊಂದಿರುವ ಎರಡು ವಿನಂತಿಗಳನ್ನು ಸಂರಚಿಸಿದೆವು.
- ಎರಡೂ ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ ಮತ್ತು ಉತ್ಪಾದಿತ ಪಠ್ಯವನ್ನು ಮುದ್ರಿಸಿದೆವು.
- ಸಮಾನ ಪ್ರತಿಕ್ರಿಯೆಗಳು ನಿರ್ಧಾರಾತ್ಮಕ ಮಾದರಿ ಸಂಯೋಜನೆಯ (ಒಂದು ಹೇಳಿಕೆಗೆ ಬೀಜ ಮತ್ತು ತಾಪಮಾನ) ಹಿನ್ನೆಟೆದ ಕಾರಣದಿಂದ ತೋರಿಸಲಾಗಿದೆ.
- `seed` ಅನ್ನು ನಿಶ್ಚಿತ ಅನಿಶ್ಚಿತ ಅಂಕಿ ಬೀಜವನ್ನು ಸೂಚಿಸಲು ಬಳಸಲಾಗಿದೆ, ಇದರಿಂದ ಮಾದರಿ ಪ್ರತಿಯೊಂದು ಬಾರಿ ಒಂದೇ ಇನ್‌ಪುಟ್‌ಗೆ ಒಂದೇ ಔಟ್‌ಪುಟ್ ಅನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ.
- `temperature` ಅನ್ನು ಶೂನ್ಯಕ್ಕೆ ಹೊಂದಿಸಲಾಗಿದೆ, ಇದರಿಂದ ಹೆಚ್ಚಿನ ನಿರ್ಧಾರಾತ್ಮಕತೆ ಅನುಸರಿಸಲಾಗುತ್ತದೆ.
- ಮೂರನೇ ವಿನಂತಿಗೆ ಬೇರೆ ಬೀಜವನ್ನು ಬಳಸಿ, ಬೀಜ ಬದಲಾಗುವುದರಿಂದ ಒಂದೇ ಪ್ರಾಂಪ್ಟ್ ಮತ್ತು ತಾಪಮಾನ ಹೊಂದಿದ್ದರೂ ವಿಭಿನ್ನ ಔಟ್‌ಪುಟ್‌ಗಳು ಬರುತ್ತವೆ ಎಂದು ತೋರಿಸಲಾಗಿದೆ.

---

## ಚುರುವ ಮಾದರಿ ಸಂರಚನೆ

ಬುದ್ಧಿವಂತಿಕೆಯ ಮಾದರಿ ಒಬ್ಬ ವಿನಂತಿಯ ಸಂಧರ್ಭ ಮತ್ತು ಅಗತ್ಯಗಾಳಿಗನುಗುಣವಾಗಿ ನಿಯತಾಂಕಗಳನ್ನು ಹೊಂದಿಸುತ್ತದೆ. ಅದಕ್ಕೆ ತಾಪಮಾನ, top_p, ಮತ್ತು ಶಿಕ್ಷೆಗಳಂತಹ ನಿಯತಾಂಕಗಳನ್ನು ಕಾರ್ಯ ಪ್ರಕಾರ, ಬಳಕೆದಾರ ಪ್ರಾಧಾನ್ಯತೆ ಅಥವಾ ಇತಿಹಾಸದ ಸಾಧನೆ ಆಧಾರವಾಗಿ ಪ್ರಾಮಾಣಿಕವಾಗಿ ಹೊಂದಿಸಲು ಅನುವು ಇದೆ.

ವಿವಿಧ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳಲ್ಲಿ ಚುರುವ ಮಾದರಿಯನ್ನು ಹೇಗೆ ಅನುಷ್ಠಾನಗೊಳಿಸುವುದು ನೋಡೋಣ.

# [Python](#tab/python)

```python
# ಪೈಥಾನ್ ಉದಾಹರಣೆ: ವಿನಂತಿ ಸಂದರ್ಭ ಆಧಾರಿತ ಗತಿಯುತ ಸ್ಯಾಂಪ್ಲಿಂಗ್
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # ವಿಭಿನ್ನ ಕಾರ್ಯ ಪ್ರಕಾರಗಳಿಗೆ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಪೂರ್ವನಿಯೋಜನೆಗಳನ್ನು นิರ್ಣಯಿಸಿ
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # ಮೂಲ ಪೂರ್ವನಿಯೋಜನೆಯನ್ನು ಆರಿಸಿ
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # ಬಳಕೆದಾರ ಪ್ರಾಧಿಕರಗಳ ಆಧಾರದಲ್ಲಿ ತಿದ್ದುಪಡಿ ಮಾಡಿ, ಇದ್ದರೆ
        if user_preferences:
            if "creativity_level" in user_preferences:
                # ಸೃಜನಶೀಲತೆ ಪ್ರಾಧಿಕರ (1-10) ಆಧಾರಿತ ತಾಪಮಾನವನ್ನು ಏರಿಸಿ
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # ಬೇಕಾದ ಉತ್ತರ ವೈವಿಧ್ಯತೆಯ ಆಧಾರದಲ್ಲಿ top_p ಸರಿಹೊಂದಿಸಿ
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # ಕಸ್ಟಮ್ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಪರಿಮಾಣಗಳನ್ನು ಬಳಸಿಕೊಂಡು ವಿನಂತಿಯನ್ನು ರಚಿಸಿ ಮತ್ತು ಕಳುಹಿಸಿ
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # ಪಾರದರ್ಶಕತೆಗಾಗಿ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಮೆಟಾಡೇಟಾ ಸಹಿತ ಉತ್ತರವನ್ನು ಹಿಂತಿರುಗಿಸಿ
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

ಮೇಲೆ ನೀಡಲಾದ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಆಡಪ್ಟಿವ್ ಮಾದರಿ ನಿರ್ವಹಿಸುವ `DynamicSamplingService` ವರ್ಗವನ್ನು ರಚಿಸಿದೆವು.
- ವಿವಿಧ ಕಾರ್ಯ ಪ್ರಕಾರಗಳ (ಕ್ರಿಯಾತ್ಮಕ, ವಾಸ್ತವಿಕ, ಕೋಡ್, ವಿಶ್ಲೇಷಣಾತ್ಮಕ) ಮಾದರಿ ಪೂರ್ವ ಸಿದ್ಧಾಂತಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಿದೆವು.
- ಕಾರ್ಯ ಪ್ರಕಾರ ಆಧರಿಸಿ ಮೂಲ ಮಾದರಿ ಪೂರ್ವ ಸಿದ್ಧಾಂತವನ್ನು ಆಯ್ದುಕೊಂಡಿದೆವು.
- ಬಳಕೆದಾರ ಪ್ರಾಧಾನ್ಯತೆಗಳಿಂದ, ಉದಾಹರಣೆಗೆ ಸೃಜನಶೀಲತೆ ಹಾಗೂ ವೈವಿಧ್ಯತೆಯ ಮಟ್ಟದಿಂದ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಹೊಂದಿಸಿದೆವು.
- ಈ ಚುರುವ ನಿಯತಾಂಕಗಳೊಂದಿಗೆ ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಿದೆವು.
- ತೆರವುಗೊಂಡ ಪಠ್ಯವನ್ನು ಅಳವಡಿಸಿದ ನಿಯತಾಂಕಗಳು ಮತ್ತು ಕಾರ್ಯ ಪ್ರಕಾರದೊಂದಿಗೆ ಹಿಂತಿರುಗಿಸಿದೆವು.
- `temperature` ಅನ್ನು ಆಫ್‌ಪುಟ್‌ನ ಅನಿಶ್ಚಿತತೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು ಬಳಸಲಾಗಿದೆ, ಹೆಚ್ಚುವರಿ ಮೌಲ್ಯಗಳು ಹೆಚ್ಚು ಸೃಜನಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಕಾರಣವಾಗುತ್ತವೆ.
- `top_p` ಟೋಕನ್ ಆಯ್ಕೆಯನ್ನು ಮೇಲಿನ ಸಮಗ್ರತಾಂಶದ ಪ್ರಮಾಣ ಮಿತಿಗೆ ಹೊಂದಿಸಲು, ಉತ್ಪಾದಿತ ಪಠ್ಯದ ಗುಣಮಟ್ಟವನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.
- `frequency_penalty` ಪುನರಾವರ್ತನೆ ಕಡಿಮೆಮಾಡಲು ಮತ್ತು ವೈವಿಧ್ಯತೆಯನ್ನು ಉತ್ತೇಜಿಸಲು ಬಳಸಲಾಗಿದೆ.
- `user_preferences` ಬಳಕೆದಾರ-ನಿರ್ದಿಷ್ಟಿತ ಸೃಜನಶೀಲತೆ ಮತ್ತು ವೈವಿಧ್ಯತಾ ಮಟ್ಟ ಆಧಾರವಾಗಿ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಲು ಅನುಮತಿಸುತ್ತದೆ.
- `task_type` ವಿನಂತಿಯ ಸ್ವಭಾವವನ್ನು ಆಧರಿಸಿ ಸೂಕ್ತ ಮಾದರಿ ತಂತ್ರವನ್ನು ನಿರ್ಧರಿಸಲು ಬಳಸಲಾಗಿದೆ.
- `send_request` ವಿಧಾನವನ್ನು ಹೊಂದಿಸಿದ್ದು, ಸಂರಚಿತ ಮಾದರಿ ನಿಯತಾಂಕಗಳೊಂದಿಗೆ ಪ್ರಾಂಪ್ಟ್ ಕಳುಹಿಸಿ, ಮಾದರಿ ಸೂಚಿಸಿದ ಅಗತ್ಯತೆಯನ್ನು ಪೂರೈಸುವಂತೆ ಪಠ್ಯವನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ.
- `generated_text` ಅನ್ನು ಬಳಸಿ ಮಾದರಿಯ ಪ್ರತ್ಯುತ್ತರವನ್ನು ಪಡೆಯುತ್ತದೆ, ನಂತರ ಅದನ್ನು ಮಾದರಿ ನಿಯತಾಂಕಗಳು ಮತ್ತು ಕಾರ್ಯ ಪ್ರಕಾರದೊಂದಿಗೆ ಹಿಂತಿರುಗಿಸುತ್ತದೆ.
- `min` ಮತ್ತು `max` ಕಾರ್ಯಗಳನ್ನು ಬಳಸಿ ಬಳಕೆದಾರ ಪ್ರಾಧಾನ್ಯತೆಗಳನ್ನು ಮಾನ್ಯ ವ್ಯಾಪ್ತಿಗಳೊಳಗೆ ಮಿತಿಗೊಳಿಸುತ್ತದೆ, ಅಸಮಾನ್ಯ ಮಾದರಿ ಸಂಯೋಜನೆಗಳನ್ನು ತಡೆಯಲು.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಉದಾಹರಣೆ: ಬಳಕೆದಾರರ ಸಂಧರ್ಭದ ಆಧಾರದ ಮೇಲೆ ಡೈನಾಮಿಕ್ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಸಂರಚನೆ
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // ಮೂಲ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಿ
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ಐತಿಹಾಸಿಕ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ
    this.performanceHistory = [];
  }
  
  // ಪ್ರಾಂಪ್ಟ್‌ನಿಂದ ಕಾರ್ಯದ ಪ್ರಕಾರವನ್ನು ಪತ್ತೆಮಾಡಿ
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // ಸರಳ ನಿಯಮಾತ್ಮಕ ಪತ್ತೆ - ಎಂಎಲ್ ವರ್ಗೀಕರಣದೊಂದಿಗೆ ಸುಧಾರಿಸಬಹುದಾಗಿದೆ
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
    
    // ಸ್ಪಷ್ಟ ಪ್ರಕಾರ ಕಂಡುಬಂದಿಲ್ಲದಿದ್ದರೆ ನಿದಾನ бес್ಗಳಿಗೆ ಡೀಫಾಲ್ಟ್ ಆಗಿ
    return 'conversational';
  }
  
  // ಸಂಧರ್ಭ ಮತ್ತು ಬಳಕೆದಾರ ರುಚಿಗಳ ಆಧಾರದ ಮೇಲೆ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಪರಿಮಾಣಗಳನ್ನು ಲెక్కಿಸಿ
  getSamplingParameters(prompt, context = {}) {
    // ಕಾರ್ಯದ ಪ್ರಕಾರವನ್ನು ಪತ್ತೆಮಾಡಿ
    const taskType = this.detectTaskType(prompt, context);
    
    // ಮೂಲ ಪ್ರೊಫೈಲ್ ಪಡೆಯಿರಿ
    let params = {...this.samplingProfiles[taskType]};
    
    // ಬಳಕೆದಾರ ರುಚಿಗಳ ಆಧಾರದ ಮೇಲೆ ತಿದ್ದುಪಡಿ ಮಾಡಿ
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 ರಿಂದ ಸೂಕ್ತ ತಾಪಮಾನ ವ್ಯಾಪ್ತಿಗೆ ಮಾಪನೆ ಮಾಡಿ
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // ಹೆಚ್ಚಿನ ನಿಖರತೆಯಿಂದ ಕಡಿಮೆ topP (ಇನ್ನಷ್ಟು ಕೇಂದ್ರೀಕೃತ ಆಯ್ಕೆ) ಅರ್ಥ
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // ಹೆಚ್ಚಿನ ಸ್ಥಿರತೆಯಿಂದ ಕಡಿಮೆ ದಂಡನೆಗಳು ಅರ್ಥ
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // ಕಾರ್ಯಕ್ಷಮತೆಯ ಐತಿಹಾಸಿಕದಿಂದ ಕಲಿತ ತಿದ್ದುಪಡಿಗಳನ್ನು ಅನ್ವಯಿಸಿ
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // ಸರಳ ಅಡಾಪ್ಟಿವ್ ತರ್ಕ - ಮತ್ತಷ್ಟು ಸುಧಾರಿತ ಆಲ್ಗೊರಿದಮ್‌ಗಳಿಂದ ಸುಧಾರಿಸಬಹುದು
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // ಇತ್ತೀಚಿನ ಇತಿಹಾಸವನ್ನು ಮಾತ್ರ ಪರಿಗಣಿಸಿ
    
    if (relevantHistory.length > 0) {
      // ಸರಾಸರಿ ಕಾರ್ಯಕ್ಷಮತಾ ಅಂಕಗಳನ್ನು ಲೆಕ್ಕಿಸಿ
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // ಕಾರ್ಯಕ್ಷಮತೆ ಗಡಿಬಿಡಿ ಕೆಳಗೆ ಇದ್ದರೆ ಪರಿಮಾಣಗಳನ್ನು ತಿದ್ದುಪಡಿ ಮಾಡಿ
      if (avgScore < 0.7) {
        // ಸುರಕ್ಷಿತ ಮೌಲ್ಯಗಳ ಕಡೆಗೆ ಸಣ್ಣ ತಿದ್ದುಪಡಿ
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // ಭವಿಷ್ಯ ತಿದ್ದುಪಡಿಗಳಿಗೆ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ದಾಖಲಿಸಿ
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // ಪ್ರತಿಕ್ರಿಯೆಯ ಗುಣಮಟ್ಟದ 0-1 ರೇಟಿಂಗ್
    });
    
    // ಇತಿಹಾಸದ ಗಾತ್ರವನ್ನು ಮಿತಿಗೊಳಿಸಿ
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ಸೌಖ್ಯಕರಿಸಿದ ಸ್ಯಾಂಪ್ಲಿಂಗ್ ಪರಿಮಾಣಗಳನ್ನು ಪಡೆಯಿರಿ
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ಸೌಖ್ಯಕರಿಸಿದ ಪರಿಮಾಣಗಳೊಂದಿಗೆ ವಿನಂತಿ ಕಳುಹಿಸಿ
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // ಬಳಕೆದಾರ ಇದರ ಹಿಂದೆ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನೀಡಿದರೆ, ಭವಿಷ್ಯ ಸುಧಾರಣೆಗೆ ದಾಖಲಿಸಿ
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

// ಉದಾಹರಣೆ ಬಳಕೆ
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // ಕಸ್ಟಮ್ ಬಳಕೆದಾರ ರುಚಿಗಳೊಂದಿಗೆ ಸೃಜನಾತ್ಮಕ ಕಾರ್ಯ
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // ಹೆಚ್ಚಿನ ಸೃಜನಾತ್ಮಕತೆ (1-10)
          consistency: 3  // ಕಡಿಮೆ ಸ್ಥಿರತೆ (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // ಕೋಡ್ ಉತ್ಪಾದನೆಯ ಕಾರ್ಯ
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // ಕಡಿಮೆ ಸೃಜನಾತ್ಮಕತೆ
          precision: 8,   // ಹೆಚ್ಚಿನ ನಿಖರತೆ
          consistency: 9  // ಹೆಚ್ಚಿನ ಸ್ಥಿರತೆ
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

ಮೇಲೆ ನೀಡಲಾದ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಒಂದು `AdaptiveSamplingManager` ವರ್ಗವನ್ನು ರಚಿಸಿದೆವು, ಇದು ಕಾರ್ಯ ಪ್ರಕಾರ ಮತ್ತು ಬಳಕೆದಾರ ಪ್ರಾಧಾನ್ಯತೆಗಳ ಆಧಾರದಿಂದ ಚುರುವ ಮಾದರಿಯನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.
- ವಿವಿಧ ಕಾರ್ಯ ಪ್ರಕಾರಗಳ (ಕ್ರಿಯಾತ್ಮಕ, ವಾಸ್ತವಿಕ, ಕೋಡ್, ಸಂಭಾಷಣಾತ್ಮಕ) ಮಾದರಿ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಿದೆವು.
- ಸರಳ ನಿಯಮಗಳನ್ನು ಉಪಯೋಗಿಸಿ ಪ್ರಾಂಪ್ಟ್‌ನಿಂದ ಕಾರ್ಯ ಪ್ರಕಾರವನ್ನು ಪತ್ತೆಮಾಡೋ ವಿಧಾನವನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿದೆವು.
- ಪತ್ತೆಯಾಗಿದ್ದ ಕಾರ್ಯ ಪ್ರಕಾರ ಮತ್ತು ಬಳಕೆದಾರ ಪ್ರಾಧಾನ್ಯತೆ ಆಧಾರದ ಮೇಲೆ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಗಣನೆಮಾಡಿದೆವು.
- ಇತಿಹಾಸದ ಸಾಧನೆಯ ಆಧಾರದ ಮೇಲೆ ಕಲಿತ ಬದಲಾವಣೆಗಳನ್ನು ಅನ್ವಯಿಸಿ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಸ್ಥಿರಗೊಳಿಸಿದೆವು.
- ಭವಿಷ್ಯದ ಬದಲಾವಣೆಗಳಿಗಾಗಿ ಕಾರ್ಯಕ್ಷಮತೆಗೆ ದಾಖಲಾತಿಯನ್ನು ಸಂಗ್ರಹಿಸಿದೆವು, ಇದು ಸಿಸ್ಟಂಗೆ ಹಳೆಯ ಸಂವಹನಗಳಿಂದ ಪಾಠ ಕಲಿಯಲು ಅನುಮತಿಸುತ್ತದೆ.
- ಚುರುವ ನಿಯತಾಂಕಗಳೊಂದಿಗೆ ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ, ಅನ್ವಯಿಸಿದ ನಿಯತಾಂಕಗಳ ಹಾಗೂ ಪತ್ತೆಯಾಗಿದ ಕಾರ್ಯ ಪ್ರಕಾರದೊಂದಿಗೆ ಉತ್ಪಾದಿತ ಪಠ್ಯವನ್ನು ಹಿಂತಿರುಗಿಸಿದೆವು.
- ಬಳಸಲಾಗಿದೆ:
    - ಬಳಕೆದಾರ-ನಿರ್ಧಾರಿತ ಸೃಜನಶೀಲತೆ, ಖಚಿತತೆ ಮತ್ತು ಸತ್ಯಸಂಧತೆ ಮಟ್ಟ ಆಧಾರವಾಗಿ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಕಸ್ಟಮೈಸು ಮಾಡಲು `userPreferences`.
    - ಪ್ರಾಂಪ್ಟ್ ಆಧರಿಸಿ ಕಾರ್ಯ ಪ್ರಕಾರವನ್ನು ಪತ್ತೆಮಾಡಲು `detectTaskType`, ಇದು ವಿಭಿನ್ನ ವಿನಂತಿಗಳಿಗೆ ಹೆಚ್ಚು ಸೂಕ್ತ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಅನುವುಮಾಡುತ್ತದೆ.
    - ಉತ್ಪಾದಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ದಾಖಲುಮಾಡಲು `recordPerformance`, ಇದು ಸಿಸ್ಟಂಗೆ ಕಾಲಜ್ರೀಯವಾಗಿ ಕಲಿಯಲು ಅನುಮತಿಸುತ್ತದೆ.
    - ಇತಿಹಾಸದ ಸಾಧನೆಯ ಆಧಾರವಾಗಿ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಬದಲಾಯಿಸಲು `applyLearnedAdjustments`, ಇದು ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಪ್ರತಿಕ್ರಿಯೆ ಉತ್ಪಾದನೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.
    - ಚುರುವ ಮಾದರಿ ನಿಯತಾಂಕಗಳೊಂದಿಗೆ ಪ್ರತಿಕ್ರಿಯೆ ಉತ್ಪಾದಿಸುವ `generateResponse`, ಇದು ವಿಭಿನ್ನ ಪ್ರಾಂಪ್ಟ್‌ಗಳು ಮತ್ತು ಸನ್ನಿವೇಶಗಳಿಗೆ ಸುಲಭವಾಗಿ ಕರೆಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.
    - ಉತ್ಪಾದನಾ ಸಮಯದಲ್ಲಿ ಯಾವ ಸಾಧನಗಳನ್ನು ಬಳಸಬಹುದೆಂದು ಸೂಚಿಸಲು `allowedTools`, ಇದು ಹೆಚ್ಚು ಸಂಧರ್ಭ-ಜಾಗೃತ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಸಹಾಯ ಮಾಡುತ್ತದೆ.
    - ಬಳಕೆದಾರರಿಂದ ಉತ್ಪಾದಿತ ಪ್ರತಿಕ್ರಿಯೆಯ ಗುಣಮಟ್ಟದ ಮೇಲೆ ಪ್ರತಿಕ್ರಿಯೆ ಪಡೆಯಲು `feedbackScore`, ಇದು ಮಾದರಿಯ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಹೆಚ್ಚು ಒಳ್ಳೆಯದಾಗಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.
    - ಹಳೆಯ ಸಂವಿಧಾನಗಳ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಲು `performanceHistory`, ಇದು ಸಿಸ್ಟಂಗೆ ಮುನ್ನುವರಿಯಲು ಮತ್ತು ಸುಧಾರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.
    - ವಿನಂತಿಯ ಸನ್ನಿವೇಶ ಆಧಾರದ ಮೇಲೆ ಮಾದರಿ ನಿಯತಾಂಕಗಳನ್ನು ಚುರುವು ಹೋಲಿಕೆ ಮಾಡಲು `getSamplingParameters`.
    - ಪ್ರಾಂಪ್ಟ್ ಆಧರಿಸಿ ಕಾರ್ಯ ಪ್ರಕಾರವನ್ನು ವರ್ಗೀಕರಿಸಲು `detectTaskType`, ಇದು ವಿಭಿನ್ನ ವಿನಂತಿಗಳಿಗೆ ಸೂಕ್ತ ಮಾದರಿ ತಂತ್ರಗಳನ್ನು ಅನ್ವಯಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.
    - ವಿವಿಧ ಕಾರ್ಯ ಪ್ರಕಾರಗಳಿಗೆ ಮೂಲ ಮಾದರಿ ಸಂಯೋಜನೆಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸಲು `samplingProfiles`, ಇದು ವಿನಂತಿಯ ಸ್ವಭಾವಕ್ಕೆ ಪ್ರಾಮಾಣಿಕವಾಗಿ ಹೊಂದಲು ವೇಗವಾಗಿ ಬದಲಾವಣೆ ಮಾಡಲು ಅನುಮತಿಸುತ್ತದೆ.

---

## ಮುಂದೇನು

- [5.7 ಆಕಾರಣತೆ](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->