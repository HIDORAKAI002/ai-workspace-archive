> [ಪ್ರಾಚೀನ: 2026-07-28 ಬಿಡುಗಡೆ ಅಭ್ಯರ್ಥಿ](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# ಮಾದರಿ ಕಾನ್‌ಟೆಕ್ಸ್ಟ್ ಪ್ರೋಟೋಕಾಲ್‌ನಲ್ಲಿ ಮಾದರಿ ಆಯ್ಕೆ

> **ಪ್ರಾಚೀನಗಳ ಸೂಚನೆ:** `2026-07-28` MCP ವಿವರಣೆ ಬಿಡುಗಡೆ ಅಭ್ಯರ್ಥಿ ಮಾದರಿ ಆಯಕಾರಿ ವಿಧಾನವನ್ನು ನೇರವಾಗಿ LLM ಪುರವಾಯಾಪಿ APIs ಜೊತೆಗೆ ಏಕೀಕರಣ ಮಾಡಲು ಪ್ರಾಚೀನಳಾಗಿ ಗುರುತಿಸಿದೆ. ಆಯ್ಕೆ `2025-11-25` ನಲ್ಲಿ ಮತ್ತು ಯಾವುದೇ ಅಧಿಕೃತ ಪ್ರಾಚೀನಗೊಳಿಸುವಿಕೆಯ ನಂತರ ಕನಿಷ್ಠ ಒಂದು ವರ್ಷ ಹೊತ್ತು ಕೆಲಸ ಮಾಡುತ್ತದೆ, ಆದ್ದರಿಂದ ಈ ಪಾಠದಲ್ಲಿ ಎಲ್ಲವೂ ಮಾನ್ಯವಾಗಿದೆ - ಆದರೆ ಹೊಸ ಸರ್ವರ್ ವಿನ್ಯಾಸಗಳು ಬದಲಾವಣೆ ಮಾದರಿಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಬೇಕು. [MCP ನಲ್ಲಿ ಏನು ಬದಲಾಯುತ್ತಿದೆ: 2026-07-28 ಬಿಡುಗಡೆಯ ಅಭ್ಯರ್ಥಿ](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) ನೋಡಿ.

ಮಾದರಿ ಆಯ್ಕೆ MCP ನ ಶಕ್ತಿಶಾಲಿ ವೈಶಿಷ್ಟ್ಯವೆಂದು, ಸರ್ವರ್‌ಗಳಿಗೆ LLM ಪೂರ್ಣತೆಗಳಿಗೆ ವಿನಂತಿಯನ್ನು ಕ್ಲೈಂಟ್ ಮುಖಾಂತರ ಕೇಳಲು ಅನುಮತಿಸುತ್ತದೆ, ಇದು ಉನ್ನತ ಎಜೆಂಟಿಕ್ ವರ್ತನೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ ಮತ್ತು ಭದ್ರತೆ ಮತ್ತು ಗೌಪ್ಯತೆ ಕಾಪಾಡುತ್ತದೆ. ಸರಿಯಾದ ಮಾದರಿ ಆಯ್ಕೆ ಸಂರಚನೆ ಪ್ರತಿಕ್ರಿಯೆಯ ಗುಣಮಟ್ಟ ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ನ್ಯೂನತೆಗೊಳಿಸಲಾಗಿ ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಸುಧಾರಿಸಬಹುದು. MCP ಮಾದರಿಗಳು ಪಠ್ಯವನ್ನು ಹೇಗೆ ರಚಿಸುತ್ತವೆ ಎಂದು ನಿರ್ವಹಿಸಲು ಮಾನಕುೀಕೃತ ಮಾರ್ಗವನ್ನು ಒದಗಿಸುತ್ತದೆ, ವಿಶೇಷ ಪರಿಮಾಣಗಳಿಂದ ಅನಿಶ್ಚಿತತೆ, ಕ್ರಿಯೇಟಿವಿಟಿ ಮತ್ತು ಸಾವಧಾನತೆಯನ್ನು ಪ್ರಭಾವಿಸುತ್ತದೆ.

## ಪರಿಚಯ

ಈ ಪಾಠದಲ್ಲಿ ನಾವು MCP ವಿನಂತಿಗಳಲ್ಲಿ ಮಾದರಿ ಆಯಕೆಯ ಪರಿಮಾಣಗಳನ್ನು ಹೇಗೆ ಸಂರಚಿಸುವುದು ಮತ್ತು ಮಾದರಿ ಆಯಕೆಯ ಮೂಲ ಪ್ರೋಟೋಕಾಲ್ ವ್ಯತ್ಯಾಸಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳುತ್ತೇವೆ.

## ಅಧ್ಯಯನ ಗುರಿಗಳು

ಈ ಪಾಠದ ಮುಕ್ತಾಯದಲ್ಲಿ ನೀವು ಈ ಕೆಳಗಿನ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಹೊಂದಿರುತ್ತೀರಿ:

- MCP ನಲ್ಲಿ ಲಭ್ಯವಿರುವ ಪ್ರಮುಖ ಮಾದರಿ ಆಯ್ಕೆ ಪರಿಮಾಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.
- ವಿಭಿನ್ನ ಬಳಕೆದಾರು ಸಂಖ್ಯೆಗೆ ಮಾದರಿ ಆಯ್ಕೆ ಪರಿಮಾಣಗಳನ್ನು ಸಂರಚಿಸಿ.
- ಮರುಪ್ರಮಾಣಿತ ತಯಾರಿಕೆಗೆ ದೃಢಸಮೀಕರಣ ಮಾದರಿ ಆಯಕೆಯನ್ನು ಜಾರಿಗೆ ತಂದಿರಿ.
- ಸಾಂದರ್ಭಿಕತೆ ಮತ್ತು ಬಳಕೆದಾರ ಪ್ರಿಯತೆಗಳ ಆಧಾರದಲ್ಲಿ ಮಾದರಿ ಆಯ್ಕೆ ಪರಿಮಾಣಗಳನ್ನು ಚರಮೋದ್ದತಿಯಾಗಿ ಹೊಂದಿಸಿ.
- ವಿವಿಧ ಪರಿಧಿಗಳಲ್ಲಿ ಮಾದರಿ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಸುಧಾರಿಸಲು ಮಾದರಿ ಆಯ್ಕೆ ತಂತ್ರಗಳನ್ನು ಅನ್ವಯಿಸಿ.
- MCP ನ ಕ್ಲೈಂಟ್-ಸರ್ವರ್ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಮಾದರಿ ಆಯಕೆ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುವುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.

## MCP ನಲ್ಲಿ ಮಾದರಿ ಆಯಕೆ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ

MCP ಯಲ್ಲಿ ಮಾದರಿ ಆಯಕೆ ಹೀಗೆ ನಡೆಯುತ್ತದೆ:

1. ಸರ್ವರ್ `sampling/createMessage` ವಿನಂತಿಯನ್ನು ಕ್ಲೈಂಟ್ ಗೆ ಕಳುಹಿಸುತ್ತದೆ
2. ಕ್ಲೈಂಟ್ ಆ ವಿನಂತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಅದನ್ನು ಬದಲಾಯಿಸಬಹುದು
3. ಕ್ಲೈಂಟ್ LLM ನಿಂದ ಮಾದರಿ ಆಯ್ಕೆ ಮಾಡುತ್ತದೆ
4. ಕ್ಲೈಂಟ್ ಪೂರ್ಣತೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ
5. ಕ್ಲೈಂಟ್ ಫಲಿತಾಂಶವನ್ನು ಸರ್ವರ್ ಗೆ ನೀಡುತ್ತದೆ

ಈ ಮಾನವ-ನಿಯಂತ್ರಿತ ವಿನ್ಯಾಸ ಬಳಕೆದಾರರಿಗೆ LLM ನೋಡುತ್ತಿರುವ ಮತ್ತು ರಚಿಸುತ್ತಿರುವ ವಿಷಯದ ಮೇಲೆ ನಿಯಂತ್ರಣ ಇಡುವುದಕ್ಕೆ ಖಚಿತತೆ ನೀಡುತ್ತದೆ.

## ಮಾದರಿ ಆಯ್ಕೆ ಪರಿಮಾಣಗಳ ಅವಲೋಕನ

MCP ಈ ಕೆಳಗಿನ ಮಾದರಿ ಆಯ್ಕೆ ಪರಿಮಾಣಗಳನ್ನು ಭಾವನಾತ್ಮಕ ವಿನಂತಿಗಳಿಗೆ ನಿರ್ಧರಿಸುತ್ತದೆ:

| ಪರಿಮಾಣ | ವಿವರಣೆ | ಸಾಮಾನ್ಯ ವ್ಯಾಪ್ತಿ |
|-----------|-------------|---------------|
| `temperature` | ಟೋಕನ್ ಆಯ್ಕೆಯಲ್ಲಿ ಅನಿಶ್ಚಿತತೆ ನಿಯಂತ್ರಣ | 0.0 - 1.0 |
| `maxTokens` | ರಚಿಸಲು ಗರಿಷ್ಠ ಟೋಕನ್‌ಗಳ ಸಂಖ್ಯೆ | ಪೂರ್ಣಾಂಕ ಮೌಲ್ಯ |
| `stopSequences` | ರಚನೆ ನಿಲ್ಲಿಸುವ ಕಸ್ಟಮ್ ಸರಣಿಗಳು | ಸ್ಟ್ರಿಂಗ್‌ಗಳ ಸರಣಿಯನ್ನು |
| `metadata` | ಹೆಚ್ಚುವರಿ ಪೂರೈಕೆದಾರ-ವಿಶಿಷ್ಟ ಪರಿಮಾಣಗಳು | JSON ವಸ್ತು |

ಬಹುತೇಕ LLM ಪೂರೈಕೆದಾರರು `metadata` ಕ್ಷೇತ್ರದ ಮೂಲಕ ಹೆಚ್ಚುವರಿ ಪರಿಮಾಣಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತಾರೆ, ಅವುಗಳಲ್ಲಿ ಇವುಗಳಿರಬಹುದು:

| ಸಾಮಾನ್ಯ ವಿಸ್ತರಣೆ ಪರಿಮಾಣ | ವಿವರಣೆ | ಸಾಮಾನ್ಯ ವ್ಯಾಪ್ತಿ |
|-----------|-------------|---------------|
| `top_p` | ನ್ಯೂಕ್ಲಿಯಸ್ ಮಾದರಿ - ಟೋಕನ್‌ಗಳನ್ನು ಟಾಪ್ ಸಮಗ್ರ ಸಾಧ್ಯತೆಗೆ ಮಿತಿಗೊಳಿಸುತ್ತದೆ | 0.0 - 1.0 |
| `top_k` | ಟೋಕನ್ ಆಯ್ಕೆಯನ್ನು ಟಾಪ್ K ಆಯ್ಕೆಗಳಿಗೆ ಮಿತಿಗೊಳಿಸುತ್ತದೆ | 1 - 100 |
| `presence_penalty` | ಪಠ್ಯದಲ್ಲಿರುವ ಟೋಕನ್ ಗಳ ಹಾಜರಾತಿಯನ್ನು ಆಧರಿಸಿ ದಂಡಿಸುತ್ತದೆ | -2.0 - 2.0 |
| `frequency_penalty` | ಪಠ್ಯದಲ್ಲಿ ಟೋಕನ್‌ಗಳ ಆವರ್ತನೆಯನ್ನು ಆಧರಿಸಿ ದಂಡಿಸುತ್ತದೆ | -2.0 - 2.0 |
| `seed` | ಮರುಉತ್ಪಾದನೀಯ ಫಲಿತಾಂಶಕ್ಕೆ ನಿಶ್ಚಿತ ನಿರಂತರ ಬೀಜ | ಪೂರ್ಣಾಂಕ ಮೌಲ್ಯ |

## ಉದಾಹರಣೆಯ ವಿನಂತಿ ರೂಪರೇಖೆ

ಇಲ್ಲಿದೆ MCP ನಲ್ಲಿ ಒಬ್ಬ ಕ್ಲೈಂಟ್ ಮೂಲಕ ಮಾದರಿ ಆಯಕೆಗಾಗಿ ವಿನಂತಿ ಮಾಡಿಕೊಳ್ಳುವ ಉದಾಹರಣೆ:

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

## ಪ್ರತಿಕ್ರಿಯೆ ರೂಪರೇಖೆ

ಕ್ಲೈಂಟ್‌ ನೀಡುವ ಪೂರ್ಣತೆ ಫಲಿತಾಂಶ:

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

## ಮಾನವ ನಿಯಂತ್ರಣಗಳು

MCP ಮಾದರಿ ಆಯ್ಕೆ ಮಾನವ ಮೇಲ್ವಿಚಾರಣೆಯೊಂದಿಗೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ:

- **ಪ್ರಾಂಪ್ಟ್‌ಗಳಿಗೆ**:
  - ಬಳಕೆದಾರರಿಗೆ ಪ್ರಸ್ತಾವಿತ ಪ್ರಾಂಪ್ಟ್ ತೋರಿಸಬೇಕಾಗಿದೆ
  - ಬಳಕೆದಾರರು ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಲು ಅಥವಾ ತಿರಸ್ಕರಿಸಲು ಸಾಧ್ಯವಾಗಬೇಕು
  - ವ್ಯವಸ್ಥೆ ಪ್ರಾಂಪ್ಟ್ ಫಿಲ್ಟರ್ ಅಥವಾ ಬದಲಾಯಿಸಬಹುದು
  - ಸಾಂದರ್ಭಿಕತೆ ಸೇರಿಸುವಿಕೆ ಕ್ಲೈಂಟ್ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಇರುತ್ತದೆ

- **ಪೂರ್ಣತೆಗಳಿಗೆ**:
  - ಬಳಕೆದಾರರಿಗೆ ಪೂರ್ಣತೆಯನ್ನು ತೋರಿಸಬೇಕು
  - ಬಳಕೆದಾರರು ಪೂರ್ಣತೆಗಳನ್ನು ಬದಲಾಯಿಸಲು ಅಥವಾ ತಿರಸ್ಕರಿಸಲು ಸಾಧ್ಯವಾಗಬೇಕು
  - ಕ್ಲೈಂಟ್‌ಗಳು ಪೂರ್ಣತೆಯನ್ನು ಫಿಲ್ಟರ್ ಅಥವಾ ಬದಲಾಯಿಸಬಹುದು
  - ಯಾವ ಮಾದರಿ ಬಳಸದೆಯೇ ಬಳಕೆದಾರರ ನಿಯಂತ್ರಣದಲ್ಲಿದ್ದುಕೊಳ್ಳುತ್ತದೆ

ಈ ತತ್ವಗಳೊಂದಿಗೆ, LLM ಪೂರೈಕೆದಾರರಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಬೆಂಬಲಿತ ಪರಿಮಾಣಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿ ವಿವಿಧ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳಲ್ಲಿ ಮಾದರಿ ಆಯಕೆಯನ್ನು ಜಾರಿಗೆ ತರುವುದನ್ನು ನೋಡೋಣ.

## ಭದ್ರತಾ ಪರಿಗಣನೆಗಳು

MCP ನಲ್ಲಿ ಮಾದರಿ ಆಯಕೆಯನ್ನು ಜಾರಿ ಮಾಡುವಾಗ ಈ ಭದ್ರತಾ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳನ್ನು ಗಮನಿಸಿ:

- **ಎಲ್ಲಾ ಸಂದೇಶ ವಿಷಯವನ್ನು ಪರಿಶೀಲಿಸಿ** ಅದನ್ನು ಕ್ಲೈಂಟ್ ಗೆ ಕಳುಹಿಸುವ ಮೊದಲು
- **ಸೂಕ್ಷ್ಮ ಮಾಹಿತಿಯನ್ನು ಶುದ್ಧಗೊಳಿಸಿ** ಪ್ರಾಂಪ್ಟ್‌ಗಳು ಮತ್ತು ಪೂರ್ಣತೆಗಳಿಂದ
- **ಅತೀತೆ ಮಿತಿಗಳನ್ನು ಜಾರಿಗೆ ತರುವುದರಿಂದ** ದುರುಪಯೋಗದ ತಡೆ
- **ಏಕಕಾಲಿಕ ಮಾದರಿ ಆಯಕೆಯ ಬಳಕೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ** ಅಸಾಧಾರಣ ಮಾದರಿಗಳನ್ನು ಗಮನಿಸಿ
- **ಗಮನಿ-ಸಂಕ್ರಮಣ ಡೇಟಾವನ್ನು ಸಂಕೇತಗೊಳಿಸಿ** ಭದ್ರತೆ ಪ್ರೋಟೋಕಾಲುಗಳೊಂದಿಗೆ
- **ಬಳಕೆದಾರ ಡೇಟಾ ಗೌಪ್ಯತೆಯನ್ನು ನಿಯಂತ್ರಿಸಿ** ಸಂಬಂಧಿತ ನಿಯಮಾವಳಿಗಳ ಪ್ರಕಾರ
- **ಮಾದರಿ ಆಯ್ಕೆ ವಿನಂತಿಗಳನ್ನು ಆಡಿಟ್ ಮಾಡಿ** ಅನುಕೂಲತೆ ಮತ್ತು ಭದ್ರತೆಗಾಗಿ
- **ವೆಚ್ಚ ಅನಾವರಣವನ್ನು ನಿಯಂತ್ರಿಸಿ** ಸಕಾಲಿಕ ಮಿತಿಗಳೊಂದಿಗೆ
- **ಮಾದರಿ ಆಯಕೆ ವಿನಂತಿಗಳಿಗೆ ಸಮಯ ಮಿತಿಗಳನ್ನು ಜಾರಿಗೆ ತರುವುದರ ಮೂಲಕ** ಸಮಯೇರಿ ಯತ್ನಗಳು
- **ಮಾದರಿ ದೋಷಗಳನ್ನು ಶ್ರೇಷ್ಠ ರೀತಿಯಲ್ಲಿ ನಿರ್ವಹಿಸಿ** ಸೂಕ್ತ ಬ್ಯಾಕಪ್ ಆಯ್ಕೆಗಳೊಂದಿಗೆ

ಮಾದರಿ ಆಯಕೆ ಪರಿಮಾಣಗಳು ಭಾಷಾ ಮಾದರಿಗಳ ವರ್ತನೆ finely-ಟ್ಯೂನ್ ಮಾಡಲು ಅನುಮತಿಸುತ್ತವೆ, ನಿರ್ಧಿಷ್ಟ ಮತ್ತು ಸೃಜನಶೀಲ ಔಟ್‌ಪುಟ್‌ಗಳ ನಡುವೆ ಬಯಸುವ ಸಮತೋಲನವನ್ನು ಸಾಧಿಸಲು.

ವಿಭಿನ್ನ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳಲ್ಲಿ ಈ ಪರಿಮಾಣಗಳನ್ನು ಹೇಗೆ ಸಂರಚಿಸುವುದನ್ನು ನೋಡೋಣ.

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

ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ನಿಖರ ಸರ್ವರ್ URL ಹೊಂದಿರುವ MCP ಕ್ಲೈಂಟ್ ಅನ್ನು ರಚಿಸಿದ್ದೇವೆ.
- `temperature`, `top_p`, ಮತ್ತು `top_k`ಂತಹ ಮಾದರಿ ಆಯ್ತ ಪರಿಮಾಣಗಳನ್ನು ಹೊಂದಿಕೊಂಡ ವಿನಂತಿ ಕಳಿಸಿದ್ದೇವೆ.
- ವಿನಂತಿಯನ್ನು ಕಳಿಸಿ ಉತ್ಪನ್ನಿತ ಪಠ್ಯವನ್ನು ಮುದ್ರಣ ಮಾಡಿದ್ದೇವೆ.
- ಬಳಸಿದೆವು:
    - ರಚನೆ ಸಮಯದಲ್ಲಿ `ideaGenerator` ಮತ್ತು `marketAnalyzer` ಸಾಧನಗಳನ್ನು ಬಳಸುವುದಕ್ಕೆ ಅನುಮತಿಸುವ ಮೂಲಕ `allowedTools` ಉಪಯೋಗಿಸಿದೆವು, ಇದು ಕ್ರಿಯೇಟಿವ್ ಆಪ್ ಆಲೋಚನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.
    - ಮರುಪಠನ ಮತ್ತು ವೈವಿಧ್ಯತೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು `frequencyPenalty` ಮತ್ತು `presencePenalty` ಉಪಯೋಗಿಸಲಾಗಿದೆ.
    - ಔಟ್‌ಪುಟ್‌ನ ಅನಿಶ್ಚಿತತೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು `temperature` ಬಳಸಲಾಗಿದೆ, ಹೆಚ್ಚಿನ ಮೌಲ್ಯಗಳು ಹೆಚ್ಚು ಸೃಜನಶೀಲ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಕಾರಣವಾಗುತ್ತವೆ.
    - ಜನರೇಟ್ ಮಾಡಿದ ಪಠ್ಯದ ಗುಣಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸುವುದಕ್ಕಾಗಿ ಟೋಕನ್‌ಗಳ ಆಯ್ಕೆಯನ್ನು ಟಾಪ್ ಸಮಗ್ರ ಸಾಧ್ಯತೆ ಅಮಾಸುಕತೆ ಇರುವವರಿಗೆ ಮಿತಿಗೊಳಿಸಲು `top_p` ಉಪಯೋಗಿಸಲಾಗಿದೆ.
    - ಮಾದರಿಯನ್ನು ಟಾಪ್ K ಹೆಚ್ಚು ಸಾಧ್ಯತೆ ಇರುವ ಟೋಕನ್ ಗಳಿಗೆ ಮಿತಿಗೊಳಿಸಲು `top_k` ಬಳಸಲಾಗಿದೆ, ಇದು ಹೆಚ್ಚು ಸಮ್ಮಿಲಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.
    - ಮರುಪಠನ ಮತ್ತು ವೈವಿಧ್ಯತೆ ಕಡಿಮೆ ಮಾಡಲು `frequencyPenalty` ಮತ್ತು `presencePenalty` ಬಳಕೆ ಮಾಡಲಾಗಿದೆ.

# [JavaScript](#tab/javascript)

```javascript
// ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಉದಾಹರಣೆ: ತಾಪಮಾನ ಮತ್ತು ಟಾಪ್-ಪಿ സാമ്പ್ಲಿಂಗ್ ಸಂರಚನೆ
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP ಗ್ರಾಹಕವನ್ನು ಪ್ರಾರಂಭಿಸಿ
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // ವಿಭಿನ್ನ സാമ്പ್ಲಿಂಗ್ ಪ್ಯಾರಾಮೀಟರ್‌ಗಳೊಂದಿಗೆ ವಿನಂತಿಯನ್ನು ಸಂರಚಿಸಿ
  const creativeSampling = {
    temperature: 0.9,    // ಹೆಚ್ಚಿನ ತಾಪಮಾನ = ಹೆಚ್ಚು ಅಳವಡಿಕೆ/ಸೃಜನಶೀಲತೆ
    topP: 0.92,          // ಟಾಪ್ 92% ಸಾದೃತ್ಯದ ಮಾಸ್ ಇರುವ ಟೋಕನ್‌ಗಳನ್ನು ಪರಿಗಣಿಸಿ
    frequencyPenalty: 0.6, // ಟೋಕನ್ ಸರಣಿಗಳ ಪುನರಾವೃತ್ತಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ
    presencePenalty: 0.4   // ಈಗಾಗಲೇ ಲೇಖನದಲ್ಲಿ ಕಂಡುಬಂದ ಟೋಕನ್‌ಗಳನ್ನು ದಂಡಿಸಿ
  };
  
  const factualSampling = {
    temperature: 0.2,    // ಕಡಿಮೆ ತಾಪಮಾನ = ಹೆಚ್ಚು ನಿರ್ದಿಷ್ಟ/ವಾಸ್ತವಿಕ
    topP: 0.85,          // ಸ್ವಲ್ಪ ಹೆಚ್ಚು ಕೇಂದ್ರಿತ ಟೋಕನ್ ಆಯ್ಕೆ
    frequencyPenalty: 0.2, // ಕನಿಷ್ಠ ಪುನರಾವೃತ ದಂಡನೆ
    presencePenalty: 0.1   // ಕನಿಷ್ಠ ಹಾಜರಾತಿ ದಂಡನೆ
  };
  
  try {
    // ವಿಭಿನ್ನampling ಸಂರಚನೆಗಳೊಂದಿಗೆ ಎರಡು ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ
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

ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಸರ್ವರ್ URL ಮತ್ತು API ಕೀ ಮೂಲಕ MCP ಕ್ಲೈಂಟ್ ಅನ್ನು ಆರಂಭಿಸಿದ್ದೇವೆ.
- ರಚನಾತ್ಮಕ ಮತ್ತು ವಾಸ್ತವಿಕ ಕಾರ್ಯಗಳಿಗೆ ಎರಡು ಸೆಟ್‌ಗಳ ಮಾದರಿ ಆಯ್ಕೆ ಪರಿಮಾಣಗಳನ್ನು ಹೊಂದಿಸಿದ್ದೇವೆ.
- ಈ ಸಂರಚನೆಗಳೊಂದಿಗೆ ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ, ಪ್ರತಿ ಕಾರ್ಯಕ್ಕೆ ನಿರ್ದಿಷ್ಟ ಸಾಧನಗಳನ್ನು ಬಳಸಲು ಮಾದರಿಗೆ ಅವಕಾಶ ಮಾಡಿಕೊಟ್ಟಿದ್ದೇವೆ.
- ವಿಭಿನ್ನ ಮಾದರಿ ಆಯ್ಕೆ ಪರಿಮಾಣಗಳ ಪರಿಣಾಮಗಳನ್ನು ತೋರಿಸಲು ಉತ್ಪನ್ನಿಸಿದ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಮುದ್ರಿಸಿದ್ದೇವೆ.
- `allowedTools` ಬಳಸಿ `ideaGenerator` ಮತ್ತು `environmentalImpactTool` ರಚನಾತ್ಮಕ ಕಾರ್ಯಗಳಿಗಾಗಿ, ಹಾಗೂ `factChecker` ಮತ್ತು `dataAnalysisTool` ವಾಸ್ತವಿಕ ಕಾರ್ಯಗಳಿಗಾಗಿ ಅನುಮತಿಸಲಾಗಿದೆ.
- `temperature` ಬಳಸಿ ಔಟ್‌ಪುಟ್‌ನ ಅನಿಶ್ಚಿತತೆಯನ್ನು ನಿಯಂತ್ರಿಸಲಾಯಿತು, ಹೆಚ್ಚಿನ ಮೌಲ್ಯಗಳು ಹೆಚ್ಚು ಸೃಜನಶೀಲ ಪ್ರತಿಕ್ರಿಯೆಗಳತ್ತ ನಯವಾಗುವಂತೆ ಮಾಡುತ್ತದೆ.
- ಟೋಕನ್ ಆಯ್ಕೆಯನ್ನು ಟಾಪ್ ಸಮಗ್ರ ಸಾಧ್ಯತೆಗೊಳಿಸುವ ಇವರಿಗೆ ಮಿತಿಗೊಳಿಸಲು `top_p` ಉಪಯೋಗಿಸಲಾಗಿದೆ, ಇದರಿಂದ ಪದಗಳ ಗುಣಮಟ್ಟ ಸುಧಾರಿಸುತ್ತದೆ.
- ಪುನರಾವರ್ತನೆ ಕಡಮೆಯಾಗಲು ಮತ್ತು ವೈವಿಧ್ಯತ್ವ ಪ್ರೋತ್ಸಾಹಿಸಲು `frequencyPenalty` ಮತ್ತು `presencePenalty` ಉಪಯೋಗಿಸಲಾಗಿದೆ.
- ಮಾದರಿಯನ್ನು ಟಾಪ್ K ಸಾಧ್ಯತೆ ಇರುವ ಟೋಕನ್ ಗಳಿಗೆ ಮಿತಿಗೊಳಿಸಲು `top_k` ಬಳಸಲಾಗಿದ್ದು, ಹೆಚ್ಚು ಸಮ್ಮಿಲಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.

---

## ದೃಢಸಮೀಕರಣ ಮಾದರಿ ಆಯಕೆ

ಸಮಾನ ಔಟ್‌ಪುಟ್ ಅಗತ್ಯವಿರುವ ಆಪ್‌ಗಳಿಗೆ, ದೃಢಸಮೀಕರಣ ಮಾದರಿ ಆಯಕೆ ಮರುಉತ್ಪಾದನೀಯ ಫಲಿತಾಂಶಗಳನ್ನು ಖಚಿತಗೊಳಿಸುತ್ತದೆ. ಇದು ನಿಶ್ಚಿತ ನಿರಂತರ ಬೀಜವನ್ನು ಉಪಯೋಗಿಸಿ ಮತ್ತು ತಾಪಮಾನವನ್ನು ಶೂನ್ಯಕ್ಕೆ ಸೆಟ್ ಮಾಡುವ ಮೂಲಕ ಸಾಧಿಸಲಾಗುತ್ತದೆ.

ವಿಭಿನ್ನ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳಲ್ಲಿ ದೃಢಸಮೀಕರಣ ಮಾದರಿ ಆಯಕೆಯನ್ನು ತೋರಿಸಲು ಕೆಳಗಿನ ಉದಾಹರಣೆಯನ್ನು ನೋಡಿ.

# [Java](#tab/java)

```java
// ಜಾವಾ ಉದಾಹರಣೆ: ಸ್ಥಿರ ಬೀಜದೊಂದಿಗೆ ನಿರ್ಧಾರಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆಗಳು
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // ನಿರ್ಧಾರಾತ್ಮಕ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ಸ್ಥಿರ ಬೀಜವನ್ನು ಬಳಸುವುದು
        
        // ಸ್ಥಿರ ಬೀಜದೊಂದಿಗೆ ಮೊದಲ ವಿನಂತಿ
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // ಗರಿಷ್ಠ ನಿರ್ಧಾರಾತ್ಮಕತೆಗೆ ಶೂನ್ಯ ತಾಪಮಾನ
            .build();
            
        // ಅದೇ ಬೀಜದೊಂದಿಗೆ ಎರಡನೆಯ ವಿನಂತಿ
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // ಎರಡೂ ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // ಬೀಜ ಮತ್ತು ತಾಪಮಾನ=0 ಇರುವುದರಿಂದ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಒಂದೇ ಆಗಿರಬೇಕು
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ನಿರ್ದಿಷ್ಟ ಸರ್ವರ್ URL ಹೊಂದಿರುವ MCP ಕ್ಲೈಂಟ್ ರಚಿಸಿದ್ದೇವೆ.
- ಅದೇ ಪ್ರಾಂಪ್ಟ್, ನಿಶ್ಚಿತ ಬೀಜ, ಮತ್ತು ಶೂನ್ಯ ತಾಪಮಾನದಿಂದ ಎರಡು ವಿನಂತಿಗಳನ್ನು ಹೊಂದಿಸಿದ್ದೇವೆ.
- ಎರಡೂ ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ ಉತ್ಪನ್ನಿತ ಪಠ್ಯವನ್ನು ಮುದ್ರಿಸಿದ್ದೇವೆ.
- ಮಾದರಿ ಆಯ್ಕೆ ಸಂರಚನೆಯ ದೃಢಸ್ವಭಾವದಿಂದ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಒಂದೇ ರೀತಿಯಿವೆ ಎಂದು ಪ್ರದರ್ಶಿಸಲಾಗಿದೆ (ಒಂದುಗರಿನ ಬೀಜ ಮತ್ತು ತಾಪಮಾನ).
- `setSeed` ಮೂಲಕ ನಿರ್ದಿಷ್ಟ ನಿಶ್ಚಿತ ನಿರಂತರ ಬೀಜವನ್ನು ತಿಳಿಸಿದ್ದೇವೆ, ಇದರಿಂದ ಮಾದರಿ ಪ್ರತಿ ಸಾರಿ ಅದೇ ಇನ್ಪುಟ್ ಗೆ ಸಮಾನ ಔಟ್‌ಪುಟ್ ನೀಡುತ್ತದೆ.
- `temperature` ಅನ್ನು ಶೂನ್ಯಕ್ಕೆ ಸೆಟ್ ಮಾಡಲಾಗಿದೆ, ಅಂದರೆ ಮಾದರಿ ಯಾವಾಗಲೂ ಹೆಚ್ಚಿನ ಸಾಧ್ಯತೆ ಇರುವ ಮುಂದಿನ ಟೋಕನ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡುತ್ತದೆ.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಉದಾಹರಣೆ: ಬೀಜ ನಿಯಂತ್ರಣದೊಂದಿಗೆ ನಿರ್ಧಾರಕಾರಿ ಪ್ರತಿಕ್ರಿಯೆಗಳು
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // ನಿಶ್ಚಿತ ಬೀಜದೊಂದಿಗೆ ಮೊದಲ ವಿನಂತಿ
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // ಗರಿಷ್ಠ ನಿರ್ಧಾರಕಾರಿತ್ವಕ್ಕಾಗಿ ಶೂನ್ಯ ತಾಪಮಾನ
    });
    
    // ಅದೇ ಬೀಜ ಮತ್ತು ತಾಪಮಾನದೊಂದಿಗೆ ಎರಡನೇ ವಿನಂತಿ
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // ಬೇರೆ ಬೀಜದೊಂದಿಗೆ ಆದರೆ ಅದೇ ತಾಪಮಾನದ ಮೂರನೇ ವಿನಂತಿ
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

ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಸರ್ವರ್ URL ಹೊಂದಿರುವ MCP ಕ್ಲೈಂಟ್ ಆರಂಭಿಸಿದ್ದೇವೆ.
- ಅದೇ ಪ್ರಾಂಪ್ಟ್, ನಿಶ್ಚಿತ ಬೀಜ, ಮತ್ತು ಶೂನ್ಯ ತಾಪಮಾನದಿಂದ ಎರಡು ವಿನಂತಿಗಳನ್ನು ಹೊಂದಿಸಿದ್ದೇವೆ.
- ಎರಡೂ ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ ಉತ್ಪನ್ನಿತ ಪಠ್ಯವನ್ನು ಮುದ್ರಿಸಿದ್ದೇವೆ.
- ಮಾದರಿ ಆಯ್ಕೆ ಸಂರಚನೆಯ ದೃಢಸ್ವಭಾವದಿಂದ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಒಂದೇ ರೀತಿಯಿವೆ ಎಂಬುದನ್ನು ತೋರಿಸಲಾಗಿದೆ.
- `seed` ಬಳಸಿ ನಿರ್ದಿಷ್ಟ ನಿಶ್ಚಿತ ಬೀಜವನ್ನು ತಿಳಿಸಿದ್ದೇವೆ, ಪ್ರತೀ ಇನ್ಪುಟ್ ಗೆ ಸಮಾನ ಔಟ್‌ಪುಟ್ ನೀಡಲು ಖಚಿತಪಡಿಸಲಾಗಿದೆ.
- `temperature` ಶೂನ್ಯಕ್ಕೆ ಸೆಟ್ ಮಾಡಲಾಗಿದೆ, ಅಂದರೆ ಮಾದರಿ ಯಾವಾಗಲೂ ಹೆಚ್ಚು ಸಾಧ್ಯತೆ ಇರುವ ಮುಂದಿನ ಟೋಕನ್ ಆಯ್ಕೆ ಮಾಡುತ್ತದೆ.
- ಮೂರನೇ ವಿನಂತಿಗೆ ಬೇರೆ ಬೀಜವನ್ನು ಬಳಸಲಾಗಿದೆ, ಇದರಿಂದ ಪ್ರಾಂಪ್ಟ್ ಮತ್ತು ತಾಪಮಾನ ಒಂದೇ ಇದ್ದರೂ ಬೇರೆ ಔಟ್‌ಪುಟ್ ಬರುತ್ತದೆ ಎಂಬುದನ್ನು ತೋರಿಸಲಾಗಿದೆ.

---

## ಚರಮೋದ್ದತ ಮಾದರಿ ಆಯ್ಕೆ ಸಂರಚನೆ

ಬುದ್ದಿವಂತಿಕೆಯಿಂದ ಮಾದರಿ ಆಯಕೆ ಪ್ರತಿ ವಿನಂತಿಯ ಸಾಂದರ್ಭಿಕತೆಗಳು ಮತ್ತು ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಪರಿಮಾಣಗಳನ್ನು ಹೊಂದಿಸುತ್ತದೆ. ಉದಾಹರಣೆಗೆ ತಾಪಮಾನ, top_p, ಮತ್ತು ದಂಡನೆಗಳನ್ನು ಕಾರ್ಯದ ಪ್ರಕಾರ, ಬಳಕೆದಾರ ಅಹಿತಾಸಕ್ತ್ಯತೆ ಅಥವಾ ಇತಿಹಾಸಾತ್ಮಕ ಕಾರ್ಯಕ್ಷಮತೆ ಆಧರಿಸಿ ಚರಮೋದ್ದತವಾಗಿ ಹೊಂದಿಸುವುದು.

ವಿವಿಧ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳಲ್ಲಿ ಚರಮೋದ್ದತ ಮಾದರಿ ಆಯಕೆಯನ್ನು ಹೇಗೆ ಜಾರಿಗೆ ತರುತ್ತಾರೋ ನೋಡೋಣ.

# [Python](#tab/python)

```python
# ಪೈಥಾನ್ ಉದಾಹರಣೆ: ವಿನಂತಿಯ ಸಂದರ್ಭ ಆಧಾರದ ಮೇಲೆ ಗತಿಶೀಲ ಮಾದರಿಗೊಳಿಸುವಿಕೆ
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # ವಿಭಿನ್ನ ಕೆಲಸ ಪ್ರಕಾರಗಳಿಗೆ ಮಾದರಿಗೊಳಿಸುವಿಕೆಯ ಪೂರ್ವನಿರ್ಧಾರಗಳನ್ನು ನಿರ್ದಿಷ್ಟಗೊಳಿಸಿ
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # ಮೂಲ ಪೂರ್ವನಿರ್ಧಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # ಬಳಕೆದಾರ ಪ್ರಾಧಾನ್ಯತೆಗಳನ್ನು ನೀಡಿದ್ದರೆ ಅದರ ಆಧಾರದ ಮೇಲೆ ಸರಿಹೊಂದಿಸಿ
        if user_preferences:
            if "creativity_level" in user_preferences:
                # ಸೃಜನಾತ್ಮಕತೆ ಪ್ರಾಧಾನ್ಯತೆ (1-10) ಆಧಾರದ ಮೇಲೆ ತಾಪಮಾನವನ್ನು ಪ್ರಮಾಣವರ್ಧಿಸಿ
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # ಬಯಸಿದ ಪ್ರತಿಕ್ರಿಯಾ ವೈವಿಧ್ಯತೆಗೆ ತಕ್ಕಂತೆ top_p ಅನ್ನು ಸರಿಹೊಂದಿಸಿ
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # ಕಸ್ಟಮ್ ಮಾದರಿಗೊಳಿಸುವಿಕೆಯಿಂದ ವಿನಂತಿಯನ್ನು ರಚಿಸಿ ಮತ್ತು ಕಳುಹಿಸಿ
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # ಸ್ಪಷ್ಟತೆಗೆ ಮಾದರಿಗೊಳಿಸುವಿಕೆ ಮೆಟಾಡೇಟಾ ಜೊತೆಗೆ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಹಿಂತೆಗೆದುಕೊಳ್ಳಿ
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಅಡಾಪ್ಟಿವ್ ಮಾದರಿ ಆಯಕೆಯನ್ನು ನಿರ್ವಹಿಸುವ `DynamicSamplingService` ಕ್ಲಾಸ್ ಅನ್ನು ಸೃಷ್ಟಿಸಿದೇವೆ.
- ವಿಭಿನ್ನ ಕಾರ್ಯಗಳಿಗೆ (ರಚನಾತ್ಮಕ, ವಾಸ್ತವಿಕ, ಕೋಡ್, ವಿಶ್ಲೇಷಣಾ) ಮಾದರಿ ಆಯಕೆ ಪೂರ್ವನಿರ್ಧಿಷ್ಟಗಳನ್ನು ನಿರ್ಧರಿಸಿದ್ದೇವೆ.
- ಕಾರ್ಯ ಪ್ರಕಾರ ಆಧಾರಿತೆಯಾಗಿ ಮೂಲ ಮಾದರಿ ಆಯಕೆ ಪೂರ್ವನಿರ್ಧಿಷ್ಟವನ್ನು ಆರಿಸಿಕೊಂಡಿದ್ದೇವೆ.
- ಬಳಕೆದಾರರ ಕ್ರಿಯೇಟಿವಿಟಿ ಮತ್ತು ವೈವಿಧ್ಯತೆಯ ಪ್ರಿಯತೆಗಳ ಆಧಾರದಲ್ಲಿ ಆಯ್ಕೆ ಪರಿಮಾಣಗಳನ್ನು ಹೊಂದಿಸಿದ್ದೇವೆ.
- ಚರಮೋದ್ದತ ಸಂರಚನೆಯ ಮಾದರಿ ಆಯಕೆ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಹೊಂದಿದ ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಿದ್ದೇವೆ.
- ತಪಾಸಣಾ ಗಹನತೆಗಾಗಿ ಜಾರಿಗೆ ಹೊಂದಿಸಿದ ಮಾದರಿ ಆಯಕೆ ಪರಿಮಾಣಗಳು ಮತ್ತು ಕಾರ್ಯ ಪ್ರಕಾರದೊಂದಿಗೆ ರಚಿಸಲಾದ ಪಠ್ಯವನ್ನು ಹಿಂತಿರುಗಿಸಿದ್ದು.
- ವಧಿಸಿಲುಗಳಿಗೆ ತಾಪಮಾನ ಬಳಸಲಾಗಿದೆ, ಹೆಚ್ಚಿನ ಮೌಲ್ಯಗಳು ರಚನಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆಗಳತ್ತ ಎಳೆಯುತ್ತದೆ.
- ಪಠ್ಯದ ಗುಣಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸಲು ಟಾಪ್ ಸಮ್ಮಿಲಿತ ಸಾಧ್ಯತೆಯ ತೊಕನ್‌ಗಳ ಆಯ್ಕೆ ಮಿತಿಗೊಳಿಸಲು `top_p` ಉಪಯೋಗಿಸಲಾಗಿದೆ.
- ಪುನರಾವರ್ತನೆ ಕಡಿಮೆ ಮಾಡಲು `frequency_penalty` ಉಪಯೋಗಿಸಲಾಗಿದೆ ಮತ್ತು ವೈವಿಧ್ಯತೆಯನ್ನು ಉತ್ತೇಜಿಸಲಾಗಿದೆ.
- ಬಳಕೆದಾರ ಗಣನೆಗಳನ್ನು ಅನುಮಾನಿಸಲು `user_preferences` ಉಪಯೋಗಿಸಲಾಗಿದೆ, ಇದರಿಂದ ಮಾದರಿ ಆಯ್ಕೆ ಪರಿಮಾಣಗಳು ಹೊರತಾಗಿ ಹೋಲಿಕೆಮಾಡಲ್ಪಡುತ್ತವೆ.
- ವಿನಂತಿಗೆ uygun ಮಾದರಿ ಆಯ್ಕೆ ತಂತ್ರಗಳನ್ನು ನಿರ್ಧರಿಸಲು `task_type` ಉಪಯೋಗಿಸಿದ್ದು, ಕಾರ್ಯ ಸ್ವಭಾವದ ಮೇಲೆ ಆಧಾರಿತ ಉತ್ತರಗಳನ್ನು ನೀಡುತ್ತದೆ.
- ಸಂರಚಿಸಿದ ಮಾದರಿ ಆಯಕೆ ಪರಿಮಾಣಗಳೊಂದಿಗೆ ಪ್ರಾಂಪ್ಟ್ ಅನ್ನು ಕಳುಹಿಸಲು `send_request` ವಿಧಾನವನ್ನು ಬಳಸಲಾಗಿದೆ.
- ಫಲಿತಾಂಶದೊಂದಿಗೆ ಬಂದ ಮಾದರಿಯ ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ಆಯ್ಕೆ ಪರಿಮಾಣಗಳನ್ನು `generated_text` ಬಳಸಿ ಪಡೆದಿದ್ದೇವೆ, ಇದನ್ನು ಮತ್ತಷ್ಟು ವಿಶ್ಲೇಷಣೆ ಅಥವಾ ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಹಿಂತಿರುಗಿಸಲಾಗಿದೆ.
- ಬಳಕೆದಾರ ಪ್ರಿಯತೆಗಳನ್ನು ಮಾನ್ಯ ವ್ಯಾಪ್ತಿಗಳಿಗೆ ಸೆಟ್ ಮಾಡಲು `min` ಮತ್ತು `max` ಕಾರ್ಯಕ್ಷಮತೆಗಳನ್ನು ಬಳಸಲಾಗಿದೆ, ಮಾನ್ಯವಾಗದ ಮಾದರಿ ಆಯಕೆ ಸಂರಚನೆಯ ತಡೆಗೆ.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಉದಾಹರಣೆ: ಬಳಕೆದಾರ ಸಂಧರ್ಭ ಆಧಾರಿತ ಡೈನಾಮಿಕ್ ಸಮ್ಪ್ಲಿಂಗ್ ಸಂರಚನೆ
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // ಮೂಲ ಸಮ್ಪ್ಲಿಂಗ್ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ವಿವರಿಸಿ
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ಐತಿಹಾಸಿಕ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ
    this.performanceHistory = [];
  }
  
  // ಪ್ರಾಂಪ್ಟ್‌ನಿಂದ ಕಾರ್ಯದ ವಿಧವನ್ನು ಗುರುತಿಸಿ
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // ಸರಳ ಊಹಾಪೋಾಹಿಕೆ ಪತ್ತೆ - ಅದನ್ನು ಎಂಎಲ್ ವರ್ಗೀಕರಣದಿಂದ ವಿಸ್ತರಿಸಬಹುದು
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
    
    // ಯಾವುದೇ ಸ್ಪಷ್ಟ ರೀತಿಯು ಕಂಡುಬಂದಿಲ್ಲದಿದ್ದರೆ ಸಂವಾದಾತ್ಮಕಕ್ಕೆ ಡೀಫಾಲ್ಟ್ ಮಾಡಿ
    return 'conversational';
  }
  
  // ಸನ್ನಿವೇಶ ಮತ್ತು ಬಳಕೆದಾರ ಮನೋಭಾವದ ಆಧಾರದ ಮೇಲೆ ಸಮ್ಪ್ಲಿಂಗ್ ಪರಿಮಾಣಗಳನ್ನು ಲೆಕ್ಕಿಸಿ
  getSamplingParameters(prompt, context = {}) {
    // ಕಾರ್ಯದ ವಿಧವನ್ನು ಗುರುತಿಸಿ
    const taskType = this.detectTaskType(prompt, context);
    
    // ಮೂಲ ಪ್ರೊಫೈಲ್ ಪಡೆಯಿರಿ
    let params = {...this.samplingProfiles[taskType]};
    
    // ಬಳಕೆದಾರ ಮನೋಭಾವದ ಆಧಾರದ ಮೇಲೆ ಹೊಂದಿಸಿ
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 ರಿಂದ ಸರಿಯಾದ ತಾಪಮಾನ ಹಗ್ಗಕ್ಕೆ ಮ масштабಿಸಿ
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // ಹೆಚ್ಚು ನಿಖರತೆ ಅಂದರೆ ಕಡಿಮೆ topP (ಹೆಚ್ಚು ಕೇಂದ್ರೀಕೃತ ಆಯ್ಕೆ)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // ಹೆಚ್ಚು ಸ್ಥಿರತೆ ಅಂದರೆ ಕಡಿಮೆ ದಂಡನೆಗಳು
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // ಕಾರ್ಯಕ್ಷಮತೆಯ ಐತಿಹಾಸಿಕದಿಂದ ಕಲಿತ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಅನ್ವಯಿಸಿ
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // ಸರಳ ಅನನುಕೂಲ ಲಾಜಿಕ್ - ಅದನ್ನು ಹೆಚ್ಚಿನ ಜಟಿಲ ಆಲ್ಗಾರಿದಂಗಳಿಂದ ಹೆಚ್ಚಿಸಬಹುದು
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // ಇತ್ತೀಚಿನ ಐತಿಹಾಸಿಕವನ್ನು ಮಾತ್ರ ಪರಿಗಣಿಸಿ
    
    if (relevantHistory.length > 0) {
      // ಸರಾಸರಿ ಕಾರ್ಯಕ್ಷಮತಾ ಅಂಕಗಳನ್ನು ಲೆಕ್ಕಿಸಿ
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // ಕಾರ್ಯಕ್ಷಮತೆ ಮಿತಿ ಕೆಳಗೆ ಇದ್ದರೆ, ಪರಿಮಾಣಗಳನ್ನು ಹೊಂದಿಸಿ
      if (avgScore < 0.7) {
        // ಸುರಕ್ಷಿತ ಮೌಲ್ಯಗಳತ್ತ ಸ್ವಲ್ಪ ಹೊಂದಾಣಿಕೆ
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // ಭವಿಷ್ಯದ ಹೊಂದಾಣಿಕೆಗಾಗಿ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ದಾಖಲೆ ಮಾಡಿ
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // ಪ್ರತಿಕ್ರಿಯೆಯ ಗುಣಮಟ್ಟಕ್ಕೆ 0-1 ರೇಟಿಂಗ್
    });
    
    // ಐತಿಹಾಸಿಕದ ಗಾತ್ರವನ್ನು ಮಿತಿ ಮಾಡಿರಿ
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ಅನುಕೂಲಗೊಳಿಸಲಾದ ಸಮ್ಪ್ಲಿಂಗ್ ಪರಿಮಾಣಗಳನ್ನು ಪಡೆಯಿರಿ
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ಅನುಕೂಲಗೊಳಿಸಲಾದ ಪರಿಮಾಣಗಳೊಂದಿಗೆ ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಿ
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // ಬಳಕೆದಾರ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನೀಡಿದರೆ, ಭವಿಷ್ಯದ ಅನುಕೂಲಕ್ಕಾಗಿ ಅದನ್ನು ದಾಖಲೆ ಮಾಡಿ
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

// ಉದಾಹರಣೆಯ ಬಳಕೆ
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // ಕಸ್ಟಮ್ ಬಳಕೆದಾರ ಮನೋಭಾವಗಳೊಂದಿಗೆ ಸೃಜನಾತ್ಮಕ ಕಾರ್ಯ
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
    
    // ಕೋಡ್ ಉತ್ಪಾದನಾ ಕಾರ್ಯ
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

ಮೇಲಿನ ಕೋಡ್‌ನಲ್ಲಿ ನಾವು:

- ಕಾರ್ಯ ಪ್ರಕಾರ ಮತ್ತು ಬಳಕೆದಾರ ಪ್ರಿಯತೆಯ ಆಧಾರದಲ್ಲಿ ಚರಮೋದ್ದತ ಮಾದರಿ ಆಯಕೆಯನ್ನು ನಿರ್ವಹಿಸುವ `AdaptiveSamplingManager` ಕ್ಲಾಸ್ ರಚಿಸಿರುವುದು.
- ವಿಭಿನ್ನ ಕಾರ್ಯಗಳಿಗಾಗಿ ಮಾದರಿ ಆಯ್ಕೆ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ಸ್ಥಾಪಿಸಲಾಗಿದೆ (ರಚನಾತ್ಮಕ, ವಾಸ್ತವಿಕ, ಕೋಡ್, ಸಂಭಾಷಣೆ).
- ಸರಳ ನೀತಿಯ ಪರಿಣಾಮದಿಂದ ಪ್ರಾಂಪ್ಟ್ ನಿಂದ ಕಾರ್ಯ ಸ್ವಭಾವವನ್ನು ಕಂಡುಹಿಡಿಯಲು ವಿಧಾನ ಜಾರಿಗೆ ತಂದಿದ್ದೇವೆ.
- ಕಾರ್ಯ ಪ್ರಕಾರ ಮತ್ತು ಬಳಕೆದಾರ ಪ್ರಿಯತೆಯ ಆಧಾರದಲ್ಲಿ ಮಾದರಿ ಆಯಕೆ ಪರಿಮಾಣಗಳನ್ನು ಗಣನೆಮಾಡಲಾಗಿದೆ.
- ಇತಿಹಾಸಾತ್ಮಕ ಕಾರ್ಯಕ್ಷಮತೆ ಆಧಾರದಲ್ಲಿ ಕಲಿತ ಹೊಂದಿಕೆಗಳನ್ನು ಅನ್ವಯಿಸಿ ಮಾದರಿ ಆಯಕರು ನಿಷ್ಠುರಗೊಳಿಸಲಾಗಿದೆ.
- ಭವಿಷ್ಯದ ಹೊಂದಿಕೆಗಾಗಿ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ದಾಖಲಿಸಲಾಗಿದ್ದು, ವ್ಯವಸ್ಥೆ ಹಿಂದಿನ ಸಂವಹನಗಳಿಂದ ಕಲಿಯುತ್ತದೆ.
- ಚರಮೋದ್ದತ ಮಾದರಿ ಆಯಕೆ ಪರಿಮಾಣಗಳೊಂದಿಗೆ ವಿನಂತಿಗಳನ್ನು ಕಳುಹಿಸಿ, ಜಾರಿಗೆ ತಗೊಂಡ ಪರಿಮಾಣಗಳು ಮತ್ತು ಕಾರ್ಯ ಸ್ವಭಾವವನ್ನು ಹೊಂದಿದ ಉತ್ಪನ್ನಿತ ಪಠ್ಯವನ್ನು ಹಿಂತಿರುಗಿಸಲಾಗಿದೆ.
- ಬಳಸಿದ್ದು:
    - `userPreferences` ಬಳಕೆದಾರರ ಕ್ರಿಯೇಟಿವಿಟಿ, ನಿರ್ದಿಷ್ಟತೆ ಮತ್ತು ಸತತತೆಯ ಮಟ್ಟಗಳ ಆಧಾರದ ಮೇಲೆ ಮಾದರಿ ಆಯಕೆ ಪರಿಮಾಣಗಳನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಲು.
    - `detectTaskType` ಪ್ರಾಂಪ್ಟ್ ಆಧಾರಿತವಾಗಿ ಕಾರ್ಯ ಸ್ವಭಾವವನ್ನು ನಿರ್ಧರಿಸಲು.
    - `recordPerformance` ಉತ್ಪನ್ನಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳ ಪ್ರದರ್ಶನವನ್ನು ದಾಖಲು ಮಾಡಲು, ವ್ಯವಸ್ಥೆ ಸಮಯಕಾಲದಲ್ಲಿ ಹೊಂದಿಕೊಳ್ಳಲು.
    - `applyLearnedAdjustments` ಇತಿಹಾಸಾತ್ಮಕ ಅಭಿವೃದ್ಧಿಗಳನ್ನು ಆಧರಿಸಿ ಮಾದರಿ ಆಯಕೆ ಪರಿಮಾಣಗಳನ್ನು ಬದಲಾಯಿಸಲು.
    - `generateResponse` ಸಮಗ್ರ ಜಾರಿಗೆ ತೆಗೆದುಕೊಂಡು, ವಿಭಿನ್ನ ಪ್ರಾಂಪ್ಟ್‌ಗಳು ಮತ್ತು ಸಾಂದರ್ಭಿಕತೆಗಳಿಗೆ ಸುಲಭವಾಗಿ ಕರೆ ಮಾಡಲು.
    - `allowedTools` ಉತ್ಪಾದನೆಯ ಸಮಯದಲ್ಲಿ ಯಾವ ಸಾಧನಗಳನ್ನು ಬಳಸಬಹುದು ಎಂಬುದನ್ನು ಸೂಚಿಸಲು, ಕರ್ತು-ಗಮನ ಹೊಂದಿದ ಉತ್ತರಗಳಿಗೆ.
    - `feedbackScore` ಬಳಕೆದಾರರಿಂದ ಉತ್ಪಾದಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳ ಗುಣಮಟ್ಟ ಕುರಿತಾಗಿ ಪ್ರತಿಕ್ರಿಯೆ ಸ್ವೀಕರಿಸಲು.
    - `performanceHistory` ಹಳೆಯ ಸಂವಹನಗಳ ದಾಖಲೆ ಇಟ್ಟುಕೊಳ್ಳಲು, ಯಶಸ್ಸು ಮತ್ತು ವಿಫಲತೆಯಿಂದ ಕಲಿಯಲು.
    - `getSamplingParameters` ವಿನಂತಿಯ ಸಾಂದರ್ಭಿಕತೆ ಆಧರಿಸಿ ಮಾದರಿ ಆಯಕೆ ಪರಿಮಾಣಗಳನ್ನು ಚರಮೋದ್ದತವಾಗಿ ಹೊಂದಿಸಲು.
    - `detectTaskType` ಪ್ರಾಂಪ್ಟ್ ಆಧಾರದ ಟಾಸ್ಕ್ ವರ್ಗೀಕರಣ, ವ್ಯತ್ಯಾಸಪೂರ್ಣ ವಿನಂತಿಗಳಿಗೆ ಸರಿಯಾದ ಮಾದರಿ ಆಯಕೆ ತಂತ್ರಗಳನ್ನು ಅನ್ವಯಿಸಲು.
    - `samplingProfiles` ವಿವಿಧ ಕಾರ್ಯಗಳ ಮೂಲ ಮಾದರಿ ಆಯಕೆ ಸಂರಚನೆಗಳನ್ನು ತ್ವರಿತ ಹೊಂದಿಕೆಗಾಗಿ ನಿರ್ಧರಿಸಲು.

---

## ಮುಂದೇನು

- [5.7 ವಿಸ್ತರಣೆ](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->