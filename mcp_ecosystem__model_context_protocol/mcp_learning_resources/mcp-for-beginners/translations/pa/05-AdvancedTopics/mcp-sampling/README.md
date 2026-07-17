> [ਡਿਪ੍ਰੀਕੇਟਡ: 2026-07-28 ਰਿਲੀਜ਼ ਕੈਂਡੀਡੇਟ](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# ਮਾਡਲ ਕਾਂਟੈਕਸਟ ਪ੍ਰੋਟੋਕੋਲ ਵਿੱਚ ਸੈਂਪਲਿੰਗ

> **ਡਿਪ੍ਰੀਕੇਸ਼ਨ ਸੂਚਨਾ:** `2026-07-28` MCP ਵਿਸ਼ੇਸ਼ਤਾ ਰਿਲੀਜ਼ ਕੈਂਡੀਡੇਟ ਸੈਂਪਲਿੰਗ ਨੂੰ LLM ਪ੍ਰਦਾਤਾ APIs ਨਾਲ ਸਿੱਧੀ ਏਕੀਕਰਨ ਦੀ ਥਾਂ ਡਿਪ੍ਰੀਕੇਟਡ ਕਰਦਾ ਹੈ। ਸੈਂਪਲਿੰਗ `2025-11-25` ਵਿੱਚ ਕੰਮ ਕਰਦੀ ਰਹਿੰਦੀ ਹੈ ਅਤੇ ਕਿਸੇ ਵੀ ਅਧਿਕਾਰਿਕ ਡਿਪ੍ਰੀਕੇਸ਼ਨ ਤੋਂ ਘੱਟੋ ਘੱਟ ਇੱਕ ਸਾਲ ਤਕ ਕਾਰਗਰ ਰਹੇਗੀ, ਇਸ ਲਈ ਇਸ ਪਾਠ ਵਿੱਚ ਸਾਰੀ ਜਾਣਕਾਰੀ ਵੈਧ ਹੈ - ਪਰ ਨਵੇਂ ਸਰਵਰ ਡਿਜ਼ਾਇਨ ਵਿਕਲਪ ਪੈਟਰਨ ਦਾ ਮੁਲਾਂਕਣ ਕਰਨੇ ਚਾਹੀਦੇ ਹਨ। ਵੇਖੋ [MCP ਵਿੱਚ ਕੀ ਬਦਲ ਰਿਹਾ ਹੈ: 2026-07-28 ਰਿਲੀਜ਼ ਕੈਂਡੀਡੇਟ](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)।

ਸੈਂਪਲਿੰਗ ਇੱਕ ਸ਼ਕਤਿਸ਼ালী MCP ਫੀਚਰ ਹੈ ਜੋ ਸਰਵਰਾਂ ਨੂੰ ਕਲਾਇੰਟ ਰਾਹੀਂ LLM ਪੂਰਨਤਾ ਮੰਗਣ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਸੁਗੰਧਤ ਏਜੰਟਿਕ ਵਿਹਾਰ ਹੋ ਸਕਦੇ ਹਨ ਅਤੇ ਸੁਰੱਖਿਆ ਅਤੇ ਗੋਪਨੀਯਤਾ ਬਣੀ ਰਹਿੰਦੀ ਹੈ। ਸਹੀ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ ਜਵਾਬ ਦੀ ਗੁਣਵੱਤਾ ਅਤੇ ਕਾਰਗੁਜ਼ਾਰੀ ਨੂੰ ਬਹੁਤ ਬਿਹਤਰ ਬਣਾ ਸਕਦੀ ਹੈ। MCP ਮਾਡਲ ਕਿਵੇਂ ਹੋਰਕਿੱਤੇ ਜਾਂਦੇ ਹਨ, ਇਸ ਦੌਰਾਨ ਵੀਸ਼ੇਸ਼ ਪੈਰامیਟਰਾਂ ਦੇ ਨਿਯੰਤਰਨ ਲਈ ਇੱਕ ਮਿਆਰੀ ਤਰੀਕਾ ਮੁਹੱਈਆ ਕਰਵਾਉਂਦਾ ਹੈ ਜੋ ਰੈਂਡਮਨੈਸ, ਰਚਨਾਤਮਕਤਾ ਅਤੇ ਸੁਧਾਰਤਾ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਦੇ ਹਨ।

## ਪਰਿਚਯ

ਇਸ ਪਾਠ ਵਿੱਚ ਅਸੀਂ ਵੇਖਾਂਗੇ ਕਿ MCP ਬੇਨਤੀਆਂ ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਕਿਵੇਂ ਸੰਰਚਿਤ ਕਰਨਾ ਹੈ ਅਤੇ ਸੈਂਪਲਿੰਗ ਦੀ ਮੂਲ ਪ੍ਰੋਟੋਕੋਲ ਮਕੈਨਿਕਸ ਨੂੰ ਸਮਝਾਂਗੇ।

## ਸਿੱਖਣ ਦੇ ਲਕੜਾਂ

ਇਸ ਪਾਠ ਦੇ ਅਖੀਰ ਤੱਕ, ਤੁਸੀਂ ਸਮਰੱਥ ਹੋਵੋਗੇ:

- MCP ਵਿੱਚ ਉਪਲਬਧ ਮੁੱਖ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਸਮਝੋ।
- ਵੱਖ-ਵੱਖ ਉਪਯੋਗ ਕੇਸਾਂ ਲਈ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਸੰਰਚਿਤ ਕਰੋ।
- ਦੁਹਰਾਏ ਜਾ ਸਕਣ ਵਾਲੇ ਨਤੀਜਿਆਂ ਲਈ ਨਿਸ਼ਚਿਤ ਸੈਂਪਲਿੰਗ ਨੂੰ ਲਾਗੂ ਕਰੋ।
- ਸੰਦਰਭ ਅਤੇ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਗਤੀਸ਼ੀਲ ਤੌਰ ਰੂਪ ਵਿੱਚ ਸਮਾਇਜਤ ਕਰੋ।
- ਵੱਖ-ਵੱਖ ਸਥਿਤੀਆਂ ਵਿੱਚ ਮਾਡਲ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਬਿਹਤਰ ਬਣਾਉਣ ਲਈ ਸੈਂਪਲਿੰਗ ਰਣਨੀਤੀਆਂ ਲਾਗੂ ਕਰੋ।
- MCP ਦੇ ਕਲਾਇੰਟ-ਸਰਵਰ ਪ੍ਰਵਾਹ ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ, ਇਹ ਸਮਝੋ।

## MCP ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ

MCP ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਪ੍ਰਕਿਰਿਆ ਇਹਨਾਂ ਕਦਮਾਂ ਦਾ ਪਾਲਣ ਕਰਦੀ ਹੈ:

1. ਸਰਵਰ ਕਲਾਇੰਟ ਨੂੰ `sampling/createMessage` ਬੇਨਤੀ ਭੇਜਦਾ ਹੈ
2. ਕਲਾਇੰਟ ਬੇਨਤੀ ਦੀ ਸਮੀਖਿਆ ਕਰਦਾ ਹੈ ਅਤੇ ਇਸਨੂੰ ਸੋਧ ਸਕਦਾ ਹੈ
3. ਕਲਾਇੰਟ LLM ਤੋਂ ਸੈਂਪਲ ਲੈਂਦਾ ਹੈ
4. ਕਲਾਇੰਟ ਪੂਰਨਤਾ ਦੀ ਸਮੀਖਿਆ ਕਰਦਾ ਹੈ
5. ਕਲਾਇੰਟ ਨਤੀਜਾ ਸਰਵਰ ਨੂੰ ਵਾਪਸ ਕਰਦਾ ਹੈ

ਇਹ ਮਨੁੱਖ-ਦਰਮਿਆਨ-ਲੂਪ ਡਿਜ਼ਾਇਨ ਯੂਜ਼ਰਾਂ ਨੂੰ ਇਹ ਨਿਯੰਤਰਣ ਰੱਖਣ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ ਕਿ LLM ਕੀ ਵੇਖਦਾ ਅਤੇ ਪੈਦਾ ਕਰਦਾ ਹੈ।

## ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਦਾ ਸੰਖੇਪ

MCP ਹੇਠਾਂ ਦਿੱਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਨਿਰਧਾਰਿਤ ਕਰਦਾ ਹੈ ਜੋ ਕਲਾਇੰਟ ਬੇਨਤੀਆਂ ਵਿੱਚ ਸੰਰਚਿਤ ਕੀਤੇ ਜਾ ਸਕਦੇ ਹਨ:

| ਪੈਰਾਮੀਟਰ | ਵੇਰਵਾ | ਆਮ ਰੇਂਜ |
|-----------|-------------|---------------|
| `temperature` | ਟੋਕਨ ਚੋਣ ਵਿੱਚ ਰੈਂਡਮਨੈਸ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਦਾ ਹੈ | 0.0 - 1.0 |
| `maxTokens` | ਜਨਰੇਟ ਕਰਨ ਲਈ ਅਧਿਕਤਮ ਟੋਕਨਾਂ ਦੀ ਗਿਣਤੀ | ਪੂਰਨ ਸੰਖਿਆ ਮੁੱਲ |
| `stopSequences` | ਵਿਸ਼ੇਸ਼ ਕ੍ਰਮ ਜੋ ਮਿਲਣ ਤੇ ਉਤਪੱਤੀ ਰੋਕਦੇ ਹਨ | ਸਤਰਾਂ ਦੀ ਲੜੀ |
| `metadata` | ਵਾਧੂ ਪ੍ਰਦਾਤਾ-ਖਾਸ ਪੈਰਾਮੀਟਰ | JSON ਵਸਤੂ |

ਬਹੁਤ ਸਾਰੇ LLM ਪ੍ਰਦਾਤਾ `metadata` ਖੇਤਰ ਰਾਹੀਂ ਵਾਧੂ ਪੈਰਾਮੀਟਰਾਂ ਦਾ ਸਮਰਥਨ ਕਰਦੇ ਹਨ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਸਕਦੇ ਹਨ:

| ਆਮ ਵਾਧੂ ਪੈਰਾਮੀਟਰ | ਵੇਰਵਾ | ਆਮ ਰੇਂਜ |
|-----------|-------------|---------------|
| `top_p` | ਨਿਊਕਲੀਅਸ ਸੈਂਪਲਿੰਗ - ਟੋਕਨਾਂ ਨੂੰ ਉੱਚ ਕੁੱਲ ਸੰਭਾਵਨਾ ਤੱਕ ਸੀਮਿਤ ਕਰਦਾ ਹੈ | 0.0 - 1.0 |
| `top_k` | ਟੋਕਨ ਚੋਣ ਨੂੰ ਸ਼੍ਰੇਣੀ K ਤੱਕ ਸੀਮਿਤ ਕਰਦਾ ਹੈ | 1 - 100 |
| `presence_penalty` | ਮੌਜੂਦਗੀ ਦੇ ਆਧਾਰ 'ਤੇ ਟੋਕਨਾਂ ਨੂੰ ਦੰਡਿਤ ਕਰਦਾ ਹੈ | -2.0 - 2.0 |
| `frequency_penalty` | ਟੋਕਨਾਂ ਦੀ ਆਵ੍ਰਿੱਤੀ ਦੇ ਆਧਾਰ 'ਤੇ ਦੰਡ ਲਗਾਉਂਦਾ ਹੈ | -2.0 - 2.0 |
| `seed` | ਨਤੀਜੇ ਨੂੰ ਦੁਹਰਾਏ ਜਾਣਯੋਗ ਬਨਾਉਣ ਲਈ ਖਾਸ ਰੈਂਡਮ ਸੀਡ | ਪੂਰਨ ਸੰਖਿਆ ਮੁੱਲ |

## ਉਦਾਹਰਨ ਬੇਨਤੀ ਫਾਰਮੈਟ

ਇੱਥੇ MCP ਵਿੱਚ ਕਲਾਇੰਟ ਤੋਂ ਸੈਂਪਲਿੰਗ ਮੰਗਣ ਦੀ ਉਦਾਹਰਨ ਦਿੱਤੀ ਗਈ ਹੈ:

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

## ਜਵਾਬ ਫਾਰਮੈਟ

ਕਲਾਇੰਟ ਇੱਕ ਪੂਰਨਤਾ ਨਤੀਜਾ ਵਾਪਸ ਕਰਦਾ ਹੈ:

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

## ਮਨੁੱਖ-ਇਨ-ਦ-ਲੂਪ ਨਿਯੰਤਰਣ

MCP ਸੈਂਪਲਿੰਗ ਮਨੁੱਖੀ ਨਿਗਰਾਨੀ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖ ਕੇ ਬਣਾਈ ਗਈ ਹੈ:

- **ਪ੍ਰਾਂਪਟਾਂ ਲਈ**:
  - ਕਲਾਇੰਟ ਯੂਜ਼ਰਾਂ ਨੂੰ ਸੁਝਾਏ ਗਏ ਪ੍ਰਾਂਪਟ ਦਿਖਾਉਣੇ ਚਾਹੀਦੇ ਹਨ
  - ਯੂਜ਼ਰ ਪ੍ਰਾਂਪਟ ਸੋਧਣ ਜਾਂ ਅਸਵੀਕਾਰ ਕਰਨ ਦੇ ਯੋਗ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ
  - ਸਿਸਟਮ ਪ੍ਰਾਂਪਟ ਛਾਣਬੀਣ ਕੀਤੇ ਜਾਂ ਸੋਧੇ ਜਾ ਸਕਦੇ ਹਨ
  - ਸੰਦੇਸ਼ ਸ਼ਾਮਿਲ ਕਰਨਾ ਕਲਾਇੰਟ ਦੁਆਰਾ ਨਿਯੰਤਰਿਤ ਹੁੰਦਾ ਹੈ

- **ਪੂਰਨਤਾਵਾਂ ਲਈ**:
  - ਕਲਾਇੰਟ ਯੂਜ਼ਰਾਂ ਨੂੰ ਪੂਰਨਤਾ ਦਿਖਾਉਣੇ ਚਾਹੀਦੇ ਹਨ
  - ਯੂਜ਼ਰ ਪੂਰਨਤਾ ਸੋਧਣ ਜਾਂ ਰੱਦ ਕਰਨ ਦੇ ਯੋਗ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ
  - ਕਲਾਇੰਟ ਪੂਰਨਤਾਵਾਂ ਨੂੰ ਛਾਣਬੀਣ ਜਾਂ ਸੋਧ ਸਕਦੇ ਹਨ
  - ਯੂਜ਼ਰ ਨਿਰਧਾਰਤ ਕਰਦਾ ਹੈ ਕਿ ਕਿਹੜਾ ਮਾਡਲ ਵਰਤਿਆ ਜਾਵੇ

ਇਹ ਨੀਤੀਆਂ ਮਨ ਵਿੱਚ ਰੱਖਦਿਆਂ, ਆਓ ਵੇਖੀਏ ਕਿ ਅਸੀਂ ਵੱਖ-ਵੱਖ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਕਿਵੇਂ ਸੈਂਪਲਿੰਗ ਲਾਗੂ ਕਰ ਸਕਦੇ ਹਾਂ, ਖਾਸ ਕਰਕੇ ਉਹ ਪੈਰਾਮੀਟਰ ਜਿਹੜੇ ਆਮ ਤੌਰ ਤੇ LLM ਪ੍ਰਦਾਤਾ ਕਰਦੇ ਹਨ।

## ਸੁਰੱਖਿਆ ਸੰਬੰਧੀ ਵਿਚਾਰ

MCP ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਲਾਗੂ ਕਰਦੇ ਸਮੇਂ, ਇਹ ਸੁਰੱਖਿਆ ਬੈਸ੍ਟ ਪ੍ਰੈਕਟਿਸਾਂ ਬਾਰੇ ਸੋਚੋ:

- **ਸਾਰੀ ਸੁਨੇਹਾ ਸਮੱਗਰੀ ਨੂੰ ਵੈਧ ਕਰੋ** ਪਹਿਲਾਂ ਕਿ ਇਹ ਕਲਾਇੰਟ ਨੂੰ ਭੇਜੋ
- **ਪ੍ਰਾਂਪਟਾਂ ਅਤੇ ਪੂਰਨਤਾਵਾਂ ਤੋਂ ਸੰਵੇਦਨਸ਼ੀਲ ਜਾਣਕਾਰੀ ਨੂੰ ਸਾਫ਼ ਕਰੋ**
- **ਦੁਰਵਰਤੀ ਰੋਕਣ ਲਈ ਰੇਟ ਸੀਮਾਵਾਂ ਲਾਗੂ ਕਰੋ**
- **ਅਸਮਾਨ్య ਪੈਟਰਨਾਂ ਲਈ ਸੈਂਪਲਿੰਗ ਦੀ ਵਰਤੋਂ ਮਾਨਟਰ ਕਰੋ**
- **ਤਬਾਦਲਾ ਦੌਰਾਨ ਡਾਟਾ ਨੂੰ ਸੁਰੱਖਿਅਤ ਪ੍ਰੋਟੋਕਾਲਾਂ ਨਾਲ ਇੰਕ੍ਰਿਪਟ ਕਰੋ**
- **ਯੂਜ਼ਰ ਡਾਟਾ ਦੀ ਗੋਪਨੀਯਤਾ ਨੂੰ ਸਬੰਧਤ ਕਾਨੂੰਨਾਂ ਅਨੁਸਾਰ ਸੰਭਾਲੋ**
- **ਸੈਂਪਲਿੰਗ ਬੇਨਤੀਆਂ ਦਾ ਆਡਿਟ ਕਰੋ ਤਾ ਕਿ ਅਨੁਕੂਲਤਾ ਅਤੇ ਸੁਰੱਖਿਆ ਯਕੀਨੀ ਬਣਾਈ ਜਾ ਸਕੇ**
- **ਲਾਗਤ ਦੇ ਖ਼ਤਰਿਆਂ ਨੂੰ ਕਾਬੂ ਵਿੱਚ ਰੱਖੋ ਉਚਿਤ ਸੀਮਾਵਾਂ ਨਾਲ**
- **ਸੈਂਪਲਿੰਗ ਬੇਨਤੀਆਂ ਲਈ ਟਾਈਮਆਊਟ ਲਾਗੂ ਕਰੋ**
- **ਮਾਡਲ ਦੀਆਂ ਗਲਤੀਆਂ ਨੂੰ ਨਰਮ ਦਿਲੀ ਨਾਲ ਸੰਭਾਲੋ ਉਚਿਤ ਬੈਕਅੱਪ ਯੋਜਨਾਵਾਂ ਨਾਲ**

ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਭਾਸ਼ਾ ਮਾਡਲ ਦੇ ਵਿਹਾਰ ਨੂੰ ਬਰੀਕੀ ਨਾਲ ਸੰਰਚਿਤ ਕਰਨ ਦਿੰਦੇ ਹਨ ਤਾਂ ਜੋ ਨਿਰਧਾਰਿਤ ਅਤੇ ਰਚਨਾਤਮਕ ਨਤੀਜੇ ਵਿੱਚ ਚਾਹੀਦਾ ਸੰਤੁਲਨ ਪ੍ਰਾਪਤ ਕੀਤਾ ਜਾ ਸਕੇ।

ਚਲੋ ਵੇਖੀਏ ਕਿ ਵੱਖ-ਵੱਖ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਇਹ ਪੈਰਾਮੀਟਰ ਕਿਵੇਂ ਸੰਰਚਿਤ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

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

ਪਹਿਲਾਂ ਦਿੱਤੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ MCP ਕਲਾਇੰਟ ਬਣਾਇਆ ਹੈ ਜਿਸ ਵਿੱਚ ਇੱਕ ਨਿਰਧਾਰਿਤ ਸਰਵਰ URL ਹੈ।
- ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਜਿਵੇਂ ਕਿ `temperature`, `top_p`, ਅਤੇ `top_k` ਦੇ ਨਾਲ ਇੱਕ ਬੇਨਤੀ ਸੰਰਚਿਤ ਕੀਤੀ ਹੈ।
- ਬੇਨਤੀ ਭੇਜੀ ਅਤੇ ਪੈਦਾ ਕੀਤੇ ਟੈਕਸਟ ਨੂੰ ਪ੍ਰਿੰਟ ਕੀਤਾ।
- ਵਰਤਿਆ:
    - `allowedTools` ਨਾਲ ਇਹ ਦੱਸਿਆ ਕਿ ਮਾਡਲ ਜਨਰੇਸ਼ਨ ਦੌਰਾਨ ਕਿਹੜੇ ਟੂਲ ਵਰਤ ਸਕਦਾ ਹੈ। ਇਸ ਮਾਮਲੇ ਵਿੱਚ, ਅਸੀਂ ਰਚਨਾਤਮਕ ਐਪ ਆਈਡੀਆ ਬਣਾਉਣ ਲਈ `ideaGenerator` ਅਤੇ `marketAnalyzer` ਟੂਲ ਦੀ ਆਗਿਆ ਦਿੱਤੀ।
    - `frequencyPenalty` ਅਤੇ `presencePenalty` ਨਾਲ ਆਊਟਪੁੱਟ ਵਿੱਚ ਦੁਹਰਾਵਟ ਅਤੇ ਵਿਭਿੰਨਤਾ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕੀਤਾ।
    - `temperature` ਨਾਲ ਆਊਪੁਟ ਦੀ ਅਣਿਯਮਿਤਾ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕੀਤਾ, ਜਿੱਥੇ ਵੱਧ ਮੁੱਲ ਹੋਣ ਤੇ ਜ਼ਿਆਦਾ ਰਚਨਾਤਮਕ ਜਵਾਬ ਮਿਲਦੇ ਹਨ।
    - `top_p` ਨਾਲ ਟੋਕਨਾਂ ਦੀ ਚੋਣ ਨੂੰ ਉੱਚ ਕੁੱਲ ਸੰਭਾਵਨਾ ਵਾਲੇ ਟੋਕਨਾਂ ਤੱਕ ਸੀਮਿਤ ਕੀਤਾ, ਜੋ ਪੈਦਾ ਟੈਕਸਟ ਦੀ ਗੁਣਵੱਤਾ ਨੂੰ ਵਧਾਉਂਦਾ ਹੈ।
    - `top_k` ਨਾਲ ਮਾਡਲ ਨੂੰ ਸਰਵੋਚ K ਸਭ ਤੋਂ ਸੰਭਾਵਿਤ ਟੋਕਨਾਂ ਤੱਕ ਸੀਮਿਤ ਕੀਤਾ, ਜਿਹੜਾ ਜ਼ਿਆਦਾ ਸੰਚਾਰਤਮਕ ਜਵਾਬ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦਗਾਰ ਹੈ।
    - `frequencyPenalty` ਅਤੇ `presencePenalty` ਨੂੰ ਦੁਹਰਾਵਟ ਨੂੰ ਘਟਾਉਣ ਅਤੇ ਜਨਰੇਟ ਕੀਤੇ ਟੈਕਸਟ ਵਿੱਚ ਵਿਭਿੰਨਤਾ ਨੂੰ ਪ੍ਰੋਤਸਾਹਿਤ ਕਰਨ ਲਈ ਵਰਤਿਆ।

# [ਜਾਵਾਸਕ੍ਰਿਪਟ](#tab/javascript)

```javascript
// ਜਾਵਾਸਕ੍ਰਿਪਟ ਉਦਾਹਰਨ: ਤਾਪਮਾਨ ਅਤੇ ਟੌਪ-ਪੀ ਸੈמפਲਿੰਗ ਸੰਰਚਨਾ
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP ਕਲਾਇੰਟ ਨੂੰ ਸ਼ੁਰੂ ਕਰੋ
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // ਵੱਖ-ਵੱਖ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨਾਲ ਬੇਨਤੀ ਸੈਟ ਕਰੋ
  const creativeSampling = {
    temperature: 0.9,    // ਵੱਧ ਤਾਪਮਾਨ = ਵੱਧ ਬੇਤਰਤੀਬੀ/ਰਚਨਾਤਮਕਤਾ
    topP: 0.92,          // ਉਹ ਟੋਕਨ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ ਜਿਨ੍ਹਾਂ ਦੀ ਟੌਪ 92% ਸੰਭਾਵਨਾ ਹੈ
    frequencyPenalty: 0.6, // ਟੋਕਨ ਲੜੀਆਂ ਦੀ ਦੁਹਰਾਈ ਘਟਾਓ
    presencePenalty: 0.4   // ਉਹ ਟੋਕਨ ਸਜ਼ਾ ਦਿਓ ਜੋ ਹੁਣ ਤਕ ਲਿਖੇ ਗਏ ਹਨ
  };
  
  const factualSampling = {
    temperature: 0.2,    // ਘੱਟ ਤਾਪਮਾਨ = ਵੱਧ ਨਿਸ਼ਚਿਤ/ਤੱਥਾਤਮਕ
    topP: 0.85,          // ਥੋੜਾ ਜਿਹਾ ਵੱਧ ਧਿਆਨ ਨਾਲ ਟੋਕਨ ਚੋਣ
    frequencyPenalty: 0.2, // ਘੱਟੋ-ਘੱਟ ਦੁਹਰਾਈ ਸਜ਼ਾ
    presencePenalty: 0.1   // ਘੱਟੋ-ਘੱਟ ਮੌਜੂਦਗੀ ਸਜ਼ਾ
  };
  
  try {
    // ਵੱਖ-ਵੱਖ ਸੈਪਲਿੰਗ ਸੰਰਚਨਾਵਾਂ ਨਾਲ ਦੋ ਬੇਨਤੀਆਂ ਭੇਜੋ
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

ਪਹਿਲਾਂ ਦਿੱਤੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ MCP ਕਲਾਇੰਟ ਸਰਵਰ URL ਅਤੇ API ਕੀ ਨਾਲ ਸ਼ੁਰੂ ਕੀਤਾ।
- ਦੋ ਸੈੱਟ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਸੰਰਚਿਤ ਕੀਤੇ: ਇੱਕ ਰਚਨਾਤਮਕ ਕੰਮਾਂ ਲਈ ਅਤੇ ਦੂਜਾ ਤੱਥੀ ਕੰਮਾਂ ਲਈ।
- ਇਨ੍ਹਾਂ ਸੰਰਚਨਾਵਾਂ ਨਾਲ ਬੇਨਤੀਆਂ ਭੇਜੀਆਂ, ਮਾਡਲ ਨੂੰ ਹਰ ਕੰਮ ਲਈ ਵਿਸ਼ੇਸ਼ ਟੂਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰਨ ਦਿੰਦਾ।
- ਬੇਨਤੀਆਂ ਦੇ ਪ੍ਰਭਾਵਾਂ ਨੂੰ ਦਿਖਾਉਣ ਲਈ ਜਨਰੇਟ ਕੀਤੇ ਜਵਾਬ ਪ੍ਰਿੰਟ ਕੀਤੇ।
- `allowedTools` ਵਰਤ ਕੇ ਦੱਸਿਆ ਕਿ ਮਾਡਲ ਜਨਰੇਸ਼ਨ ਦੌਰਾਨ ਕਿਹੜੇ ਟੂਲ ਵਰਤ ਸਕਦਾ ਹੈ। ਇਸ ਮਾਮਲੇ ਵਿੱਚ, ਰਚਨਾਤਮਕ ਕੰਮ ਲਈ ਅਸੀਂ `ideaGenerator` ਅਤੇ `environmentalImpactTool` ਅਤੇ ਤੱਥੀ ਕੰਮ ਲਈ `factChecker` ਅਤੇ `dataAnalysisTool` ਦੀ ਆਗਿਆ ਦਿੱਤੀ।
- `temperature` ਨਾਲ ਆਊਪੁਟ ਦੀ ਅਣਿਯਮਿਤਾ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕੀਤਾ, ਜਿੱਥੇ ਵੱਧ ਮੁੱਲ ਹੋਣ ਤੇ ਜ਼ਿਆਦਾ ਰਚਨਾਤਮਕ ਜਵਾਬ ਮਿਲਦੇ ਹਨ।
- `top_p` ਨਾਲ ਟੋਕਨਾਂ ਦੀ ਚੋਣ ਨੂੰ ਉੱਚ ਕੁੱਲ ਸੰਭਾਵਨਾ ਵਾਲੇ ਟੋਕਨਾਂ ਤੱਕ ਸੀਮਿਤ ਕੀਤਾ, ਜੋ ਪੈਦਾ ਟੈਕਸਟ ਦੀ ਗੁਣਵੱਤਾ ਨੂੰ ਵਧਾਉਂਦਾ ਹੈ।
- `frequencyPenalty` ਅਤੇ `presencePenalty` ਨਾਲ ਦੁਹਰਾਵਟ ਨੂੰ ਘਟਾਇਆ ਅਤੇ ਆਊਪੁੱਟ ਵਿੱਚ ਵਿਭਿੰਨਤਾ ਨੂੰ ਪ੍ਰੋਤਸਾਹਿਤ ਕੀਤਾ।
- `top_k` ਨਾਲ ਮਾਡਲ ਨੂੰ ਸਰਵੋਚ K ਸਭ ਤੋਂ ਸੰਭਾਵਿਤ ਟੋਕਨਾਂ ਤੱਕ ਸੀਮਿਤ ਕੀਤਾ, ਜੋ ਜ਼ਿਆਦਾ ਸੰਚਾਰਤਮਕ ਜਵਾਬ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦਗਾਰ ਹੈ।

---

## ਨਿਸ਼ਚਿਤ ਸੈਂਪਲਿੰਗ

ਐਸੇ ਐਪਲੀਕੇਸ਼ਨਾਂ ਲਈ ਜਿੱਥੇ ਲਗਾਤਾਰ ਨਤੀਜੇ ਚਾਹੀਦੇ ਹਨ, ਨਿਸ਼ਚਿਤ ਸੈਂਪਲਿੰਗ ਦੁਹਰਾਏ ਜਾ ਸਕਣ ਵਾਲੇ ਨਤੀਜੇ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ। ਇਹ ਇਕ ਨਿਰਧਾਰਿਤ ਰੈਂਡਮ ਸੀਡ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ ਅਤੇ ਟੈਂਪਰੇਚਰ ਨੂੰ ਜ਼ੀਰੋ ਤੇ ਸੈਟ ਕਰਦਾ ਹੈ।

ਚਲੋ ਹੇਠਾਂ ਦਿੱਤੀ ਉਦਾਹਰਨ ਦੇਖੀਏ ਜਿੱਥੇ ਵੱਖ-ਵੱਖ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਨਿਸ਼ਚਿਤ ਸੈਂਪਲਿੰਗ ਦਰਸਾਈ ਗਈ ਹੈ।

# [ਜਾਵਾ](#tab/java)

```java
// ਜਾਵਾ ਉਦਾਹਰਨ: ਨਿਰਧਾਰਿਤ ਜਵਾਬ ਸਥਿਰ ਸੀਡ ਨਾਲ
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // ਨਿਰਧਾਰਿਤ ਨਤੀਜਿਆਂ ਲਈ ਸਥਿਰ ਸੀਡ ਦੀ ਵਰਤੋਂ
        
        // ਸਥਿਰ ਸੀਡ ਨਾਲ ਪਹਿਲੀ ਬੇਨਤੀ
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // ਵੱਧ ਤੋਂ ਵੱਧ ਨਿਰਧਾਰਿਤਤਾ ਲਈ ਜ਼ੀਰੋ ਤਾਪਮਾਨ
            .build();
            
        // ਇਕੋ ਸੀਡ ਨਾਲ ਦੂਜੀ ਬੇਨਤੀ
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // ਦੋਹਾਂ ਬੇਨਤੀਆਂ ਨੂੰ ਚਲਾਓ
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // ਇਕੋ ਸੀਡ ਅਤੇ ਤਾਪਮਾਨ=0 ਕਾਰਨ ਜਵਾਬ ਇਕੋ ਹੋਣ ਚਾਹੀਦੇ ਹਨ
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

ਪਹਿਲਾਂ ਦਿੱਤੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਨਿਰਧਾਰਿਤ ਸਰਵਰ URL ਨਾਲ MCP ਕਲਾਇੰਟ ਬਣਾਇਆ।
- ਦੁਹਰੀ ਬੇਨਤੀ ਜਿਸ ਵਿੱਚ ਸਮਾਨ ਪ੍ਰਾਂਪਟ, ਫਿਕਸਡ ਸੀਡ ਅਤੇ ਨਿਸ਼ਚਿਤ ਸੈੱਲ ਹੈ, ਸੰਰਚਿਤ ਕੀਤੀ।
- ਦੋਹਾਂ ਬੇਨਤੀਆਂ ਭੇਜੀਆਂ ਅਤੇ ਜਨਰੇਟ ਕੀਤੇ ਟੈਕਸਟ ਨੂੰ ਪ੍ਰਿੰਟ ਕੀਤਾ।
- ਦਿਖਾਇਆ ਕਿ ਜਵਾਬ ਸਮਾਨ ਹਨ ਕਿਉਂਕਿ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ (ਸਮਾਨ ਸੀਡ ਅਤੇ ਟੈਂਪਰੇਚਰ) ਨਿਸ਼ਚਿਤ ਹੈ।
- `setSeed` ਨਾਲ ਨਿਰਧਾਰਿਤ ਰੈਂਡਮ ਸੀਡ ਦਿੱਤੀ ਗਈ, ਜਿਸ ਨਾਲ ਮਾਡਲ ਹਰ ਵਾਰੀ ਉਹੀ ਆਉਟਪੁੱਟ ਦਿੰਦਾ ਹੈ।
- `temperature` ਨੂੰ ਜ਼ੀਰੋ ਤੇ ਸੈਟ ਕੀਤਾ ਗਿਆ ਤਾ ਕਿ ਸਬ ਤੋਂ ਸੰਭਾਵਿਤ ਅਗਲਾ ਟੋਕਨ ਸਦਾ ਚੁਣਿਆ ਜਾਵੇ।

# [ਜਾਵਾਸਕ੍ਰਿਪਟ](#tab/javascript-deterministic)

```javascript
// ਜਾਵਾਸਕ੍ਰਿਪਟ ਉਦਾਹਰਣ: ਬੀਜ ਨਿਯੰਤਰਣ ਨਾਲ ਨਿਰਧਾਰਤ ਜਵਾਬ
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // ਫਿਕਸਡ ਬੀਜ ਨਾਲ ਪਹਿਲੀ ਬੇਨਤੀ
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // ਵੱਧ ਤੋਂ ਵੱਧ ਨਿਰਧਾਰਤਾ ਲਈ ਜ਼ੀਰੋ ਤਾਪਮਾਨ
    });
    
    // ਦੂਜੀ ਬੇਨਤੀ ਇਕੋ ਹੀ ਬੀਜ ਅਤੇ ਤਾਪਮਾਨ ਨਾਲ
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // ਤੀਜੀ ਬੇਨਤੀ ਵੱਖਰੇ ਬੀਜ ਨਾਲ ਪਰ ਇਕੋ ਤਾਪਮਾਨ
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

ਪਹਿਲਾਂ ਦਿੱਤੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਸਰਵਰ URL ਨਾਲ MCP ਕਲਾਇੰਟ ਸ਼ੁਰੂ ਕੀਤਾ।
- ਦੋ ਬੇਨਤੀਆਂ ਇਕੋ ਪ੍ਰਾਂਪਟ, ਫਿਕਸਡ ਸੀਡ ਅਤੇ ਜ਼ੀਰੋ ਟੈਂਪਰੇਚਰ ਦੇ ਨਾਲ ਸੰਰਚਿਤ ਕੀਤੀਆਂ।
- ਦੋਹਾਂ ਬੇਨਤੀਆਂ ਭੇਜੀਆਂ ਅਤੇ ਜਨਰੇਟ ਕੀਤੇ ਟੈਕਸਟ ਨੂੰ ਪ੍ਰਿੰਟ ਕੀਤਾ।
- ਵੇਖਾਇਆ ਕਿ ਜਵਾਬ ਇੱਕੋ ਹਨ ਕਿਉਂਕਿ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ ਨਿਸ਼ਚਿਤ ਹੈ।
- `seed` ਨਾਲ ਨਿਰਧਾਰਿਤ ਰੈਂਡਮ ਸੀਡ ਦੱਸੀ ਗਈ, ਜੋ ਹਰ ਵਾਰੀ ਆਉਟਪੁੱਟ ਨੂੰ ਨਿਰੂਪਿਤ ਕਰਦਾ ਹੈ।
- `temperature` ਨੂੰ ਜ਼ੀਰੋ ਤੇ ਸੈੱਟ ਕੀਤਾ ਗਿਆ ਹੈ ਤਾਂ ਕਿ ਮਾਡਲ ਸਦਾ ਸਭ ਤੋਂ ਸੰਭਾਵਿਤ ਅਗਲਾ ਟੋਕਨ ਚੁਣੇ।
- ਤੀਜੀ ਬੇਨਤੀ ਲਈ ਵੱਖਰਾ ਸੀਡ ਵਰਤਿਆ ਗਿਆ, ਜਿਸ ਨਾਲ ਦਿਖਾਇਆ ਕਿ ਸੀਡ ਬਦਲਣ ਨਾਲ ਵੱਖਰੇ ਨਤੀਜੇ ਆਉਂਦੇ ਹਨ, ਭਾਵੇਂ ਕਿ ਪ੍ਰਾਂਪਟ ਅਤੇ ਟੈਂਪਰੇਚਰ ਇੱਕੋ ਹੀ ਹਨ।

---

## ਗਤੀਸ਼ੀਲ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ

ਬੁੱਧੀਮਾਨ ਸੈਂਪਲਿੰਗ ਹਰ ਬੇਨਤੀ ਦੇ ਸੰਦਰਭ ਅਤੇ ਲੋੜਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਪੈਰਾਮੀਟਰ ਸਮਾਇਜਤ ਕਰਦੀ ਹੈ। ਇਸਦਾ ਮਤਲਬ ਹੈ ਕਿ ਟੈਂਪਰੇਚਰ, top_p ਅਤੇ ਦੰਡਾਂ ਨੂੰ ਬਦਲਦੇ ਰਹਿਣਾ ਕੰਮ ਦੀ ਕਿਸਮ, ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਜਾਂ ਪਿਛਲੇ ਕਾਰਗੁਜ਼ਾਰ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖ ਕੇ।

ਆਓ ਵੇਖੀਏ ਕਿ ਵੱਖ-ਵੱਖ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਗਤੀਸ਼ੀਲ ਸੈਂਪਲਿੰਗ ਕਿਵੇਂ ਲਾਗੂ ਕਰਨੀ ਹੈ।

# [ਪਾਇਥਨ](#tab/python)

```python
# ਪਾਇਥਨ ਉਦਾਹਰਣ: ਬੇਨਤੀ ਸੰਦਰਭ ਬੈਸਡ ਡਾਇਨਾਮਿਕ ਸੈਂਪਲਿੰਗ
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # ਵੱਖ-ਵੱਖ ਕੰਮ ਕਿਸਮਾਂ ਲਈ ਸੈਂਪਲਿੰਗ ਪ੍ਰੀਸੈਟ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # ਬੇਸ ਪ੍ਰੀਸੈਟ ਚੁਣੋ
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # ਜੇ ਉਪਭੋਗਤਾ ਪਸੰਦਾਂ ਦਿੱਤੀਆਂ ਹਨ ਤਾਂ ਅਨੁਸਾਰ ਸੰਸ਼ੋਧਨ ਕਰੋ
        if user_preferences:
            if "creativity_level" in user_preferences:
                # ਰਚਨਾਤਮਕਤਾ ਪਸੰਦ (1-10) ਅਨੁਸਾਰ ਤਾਪਮਾਨ ਨੂੰ ਸਕੇਲ ਕਰੋ
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # ਚਾਹੀਦੇ ਜਵਾਬ ਵੱਖ-ਵੱਖਤਾ ਅਨੁਸਾਰ top_p ਸੈੱਟ ਕਰੋ
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # ਕਸਟਮ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਨਾਲ ਬੇਨਤੀ ਬਣਾਓ ਅਤੇ ਭੇਜੋ
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # ਪਾਰਦਰਸ਼ਤਾ ਲਈ ਸੈਂਪਲਿੰਗ ਮੇਟਾ ਡੇਟਾ ਦੇ ਨਾਲ ਜਵਾਬ ਵਾਪਸ ਕਰੋ
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

ਪਹਿਲਾਂ ਦਿੱਤੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ `DynamicSamplingService` ਕਲਾਸ ਬਣਾਈ ਜੋ ਐਡਾਪਟਿਵ ਸੈਂਪਲਿੰਗ ਨੂੰ ਸੰਭਾਲਦੀ ਹੈ।
- ਵੱਖ-ਵੱਖ ਕੰਮਾਂ ਲਈ ਸੈਂਪਲਿੰਗ ਪੂਰਵ ਸੈੱਟ ਸੰਰਚਿਤ ਕੀਤੇ (ਰਚਨਾਤਮਕ, ਤੱਥੀ, ਕੋਡ, ਵਿਸ਼ਲੇਸ਼ਣਾਤਮਕ)।
- ਕੰਮ ਦੀ ਕਿਸਮ ਦੇ ਅਧਾਰ 'ਤੇ ਇੱਕ ਬੇਸ ਸੈਂਪਲਿੰਗ ਪੂਰਵ ਸੈੱਟ ਚੁਣਿਆ।
- ਯੂਜ਼ਰ ਦੀਆਂ ਪਸੰਦਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਜਿਵੇਂ ਰਚਨਾਤਮਕਤਾ ਅਤੇ ਵਿਭਿੰਨਤਾ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖ ਕੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਬਦਲੇ।
- ਗਤੀਸ਼ੀਲ ਸੰਰਚਿਤ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਦੇ ਨਾਲ ਬੇਨਤੀ ਭੇਜੀ।
- ਜਨਰੇਟ ਕੀਤੇ ਗਏ ਟੈਕਸਟ ਨੂੰ ਲਾਭਪਾਰਥੀ ਤੌਰ 'ਤੇ ਪਰਦਰਸ਼ਿਤ ਕਰਨ ਲਈ ਲਾਗੂ ਕੀਤੇ ਗਏ ਪੈਰਾਮੀਟਰਾਂ ਅਤੇ ਕੰਮ ਦੀ ਕਿਸਮ ਦੇ ਸਾਥ ਵਾਪਸ ਕੀਤਾ।
- `temperature` ਦਾ ਵਰਤੋਂ ਕੀਤੀ, ਜੋ ਨਤੀਜੇ ਦੀ ਅਣਿਯਮਿਤਾ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਦੀ ਹੈ, ਜਿੱਥੇ ਵੱਧ ਮੁੱਲ ਹੋਣ ਤੇ ਵਧੇਰੇ ਰਚਨਾਤਮਕ ਜਵਾਬ ਮਿਲਦੇ ਹਨ।
- `top_p` ਨਾਲ ਟੋਕਨਾਂ ਦੀ ਚੋਣ ਨੂੰ ਉੱਚ ਕੁੱਲ ਸੰਭਾਵਨਾ ਵਾਲੇ ਟੋਕਨਾਂ ਤੱਕ ਸੀਮਿਤ ਕੀਤਾ, ਜੋ ਪੈਦਾ ਟੈਕਸਟ ਦੀ ਗੁਣਵੱਤਾ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਂਦਾ ਹੈ।
- `frequency_penalty` ਨਾਲ ਦੁਹਰਾਈ ਨੂੰ ਘਟਾਇਆ ਅਤੇ ਆਊਟਪੁੱਟ ਵਿੱਚ ਵਿਭਿੰਨਤਾ ਨੂੰ ਪ੍ਰੋਤਸਾਹਿਤ ਕੀਤਾ।
- `user_preferences` ਨੂੰ ਵਰਤ ਕੇ ਯੂਜ਼ਰ-ਨਿਰਧਾਰਿਤ ਰਚਨਾਤਮਕਤਾ ਅਤੇ ਵਿਭਿੰਨਤਾ ਦੇ ਲੈਵਲ ਦੇ ਅਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਦਾ ਵਿਅਕਤੀਗਤਕਰਨ ਕੀਤਾ।
- `task_type` ਨਾਲ ਬੇਨਤੀ ਲਈ ਉਚਿਤ ਸੈਂਪਲਿੰਗ ਰਣਨੀਤੀ ਨਿਰਧਾਰਿਤ ਕੀਤੀ, ਜੋ ਕੰਮ ਦੀ ਕੁਦਰਤ ਦੇ ਅਨੁਸਾਰ ਹੋਵੇ।
- `send_request` ਮੈਥਡ ਨਾਲ ਪ੍ਰੋਂਪਟ ਭੇਜੀ ਅਤੇ ਸਮਾਇਜਤ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਦੇ ਨਾਲ ਮਾਡਲ ਨੂੰ ਟੈਕਸਟ ਜਨਰੇਟ ਕਰਨ ਲਈ ਕਿਹਾ।
- `generated_text` ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਮਾਡਲ ਦਾ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕੀਤਾ ਅਤੇ ਜਨਰੇਟ ਕੀਤੇ ਟੈਕਸਟ ਨੂੰ ਪੈਰਾਮੀਟਰਾਂ ਅਤੇ ਕਾਰਜ ਦੀ ਕਿਸਮ ਦੇ ਨਾਲ ਵਾਪਸ ਕੀਤਾ।
- `min` ਅਤੇ `max` ਫੰਕਸ਼ਨ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਨੂੰ ਵੈਧ ਸੀਮਾਵਾਂ ਵਿੱਚ ਰੱਖਿਆ, ਤਾਂ ਜੋ ਗਲਤ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾਵਾਂ ਤੋਂ ਬਚਾ ਜਾ ਸਕੇ।

# [ਜਾਵਾਸਕ੍ਰਿਪਟ ਡਾਇਨਾਮਿਕ](#tab/javascript-dynamic)

```javascript
// ਜਾਵਾਸਕ੍ਰਿਪਟ ਉਦਾਹਰਨ: ਵਰਤੋਂਕਾਰ ਸੰਦਰਭ ਦੇ ਅਧਾਰ 'ਤੇ ਗਤੀਸ਼ੀਲ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // ਮੂਲ ਸੈਂਪਲਿੰਗ ਪ੍ਰੋਫਾਈਲ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ਇਤਿਹਾਸਕ ਪ੍ਰਦਰਸ਼ਨ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ
    this.performanceHistory = [];
  }
  
  // ਪ੍ਰੰਪਟ ਤੋਂ ਕਾਰਜ ਕਿਸਮ ਦੀ ਪਹਚਾਣ ਕਰੋ
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // ਸਾਦਾ ਹਿਊਰਿਸਟਿਕ ਪਹਚਾਣ - ਐਮਐਲ ਵਰਗੀਕਰਨ ਨਾਲ ਸੁਧਾਰ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ
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
    
    // ਜੇ ਕੋਈ ਸਪਸ਼ਟ ਕਿਸਮ ਨਹੀਂ ਮਿਲਦੀ ਤਾਂ ਸੰਵਾਦੀਕਰਨ ਨੂੰ ਡਿਫੌਲਟ ਕਰੋ
    return 'conversational';
  }
  
  // ਸੰਦਰਭ ਅਤੇ ਵਰਤੋਂਕਾਰ ਪਸੰਦਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਦੀ ਗਣਨਾ ਕਰੋ
  getSamplingParameters(prompt, context = {}) {
    // ਕਾਰਜ ਦੀ ਕਿਸਮ ਪਹਚਾਣੋ
    const taskType = this.detectTaskType(prompt, context);
    
    // ਮੂਲ ਪ੍ਰੋਫਾਈਲ ਪ੍ਰਾਪਤ ਕਰੋ
    let params = {...this.samplingProfiles[taskType]};
    
    // ਵਰਤੋਂਕਾਰ ਪਸੰਦਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਸੰਪਾਦਨ ਕਰੋ
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 ਤੱਕ ਸਕੇਲ ਕਰੋ ਅਤੇ ਯੋਗ ਤਾਪਮਾਨ ਸੀਮਾ ਵਿੱਚ ਬਦਲੋ
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // ਵੱਧ ਸਟੀਕਤਾ ਦਾ ਮਤਲਬ ਘੱਟ topP (ਵਧੇਰੇ ਕੇਂਦਰਿਤ ਚੋਣ) ਹੈ
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // ਵੱਧ ਸਥਿਰਤਾ ਦਾ ਮਤਲਬ ਘੱਟ ਜੁਰਮਾਨੇ ਹਨ
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // ਪ੍ਰਦਰਸ਼ਨ ਇਤਿਹਾਸ ਤੋਂ ਸਿੱਖੇ ਗਏ ਸੰਸ਼ੋਧਨ ਲਾਗੂ ਕਰੋ
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // ਸਾਦਾ ਅਡਾਪਟਿਵ ਲਾਜਿਕ - ਵਧੇਰੇ ਸੁਧਰੇ ਹੋਏ ਅਲਗੋਰਿਦਮ ਨਾਲ ਸੁਧਾਰ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // ਸਿਰਫ ਹਾਲੀਆ ਇਤਿਹਾਸ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ
    
    if (relevantHistory.length > 0) {
      // ਔਸਤ ਪ੍ਰਦਰਸ਼ਨ ਅੰਕ ਗਣਨਾ ਕਰੋ
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // ਜੇ ਪ੍ਰਦਰਸ਼ਨ ਥਰੈਸ਼ਹੋਲਡ ਤੋਂ ਘੱਟ ਹੈ ਤਾਂ ਪੈਰਾਮੀਟਰ ਬਦਲੋ
      if (avgScore < 0.7) {
        // ਸੁਰੱਖਿਅਤ ਮੁੱਲਾਂ ਵੱਲ ਥੋੜ੍ਹਾ ਬਦਲਾਅ
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // ਭਵਿੱਖੀ ਸੰਸ਼ੋਧਨਾਂ ਲਈ ਪ੍ਰਦਰਸ਼ਨ ਨੂੰ ਦਰਜ ਕਰੋ
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // ਜਵਾਬ ਦੀ ਗੁਣਵੱਤਾ ਦਾ 0-1 ਮੂਲਾਂਕਣ
    });
    
    // ਇਤਿਹਾਸ ਦੀ ਮਿਆਦ ਸੀਮਤ ਕਰੋ
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ਅਨੁਕੂਲਤ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਪ੍ਰਾਪਤ ਕਰੋ
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ਅਨੁਕੂਲਤ ਪੈਰਾਮੀਟਰਾਂ ਨਾਲ ਬੇਨਤੀ ਭੇਜੋ
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // ਜੇ ਵਰਤੋਂਕਾਰ ਫੀਡਬੈਕ ਦਿੰਦਾ ਹੈ, ਤਾਂ ਭਵਿੱਖੀ ਸੁਧਾਰ ਲਈ ਇਸਨੂੰ ਦਰਜ ਕਰੋ
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

// ਉਦਾਹਰਨ ਵਰਤੋਂ
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // ਵਿਲੱਖਣ ਕਾਰਜ ਵਰਤੋਂਕਾਰ ਪਸੰਦਾਂ ਨਾਲ
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // ਉੱਚ ਰਚਨਾਤਮਕਤਾ (1-10)
          consistency: 3  // ਘੱਟ ਸਥਿਰਤਾ (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // ਕੋਡ ਪੈਦਾ ਕਰਨ ਵਾਲਾ ਕਾਰਜ
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // ਘੱਟ ਰਚਨਾਤਮਕਤਾ
          precision: 8,   // ਉੱਚ ਸਟੀਕਤਾ
          consistency: 9  // ਉੱਚ ਸਥਿਰਤਾ
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

ਪਹਿਲਾਂ ਦਿੱਤੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ `AdaptiveSamplingManager` ਕਲਾਸ ਬਣਾਈ ਜੋ ਕੰਮ ਦੀ ਕਿਸਮ ਅਤੇ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਗਤੀਸ਼ੀਲ ਸੈਂਪਲਿੰਗ ਦਾ ਪ੍ਰਬੰਧ ਕਰਦੀ ਹੈ।
- ਵੱਖ-ਵੱਖ ਕੰਮਾਂ ਲਈ ਸੈਂਪਲਿੰਗ ਪ੍ਰੋਫਾਈਲ ਸੰਰਚਿਤ ਕੀਤੇ (ਰਚਨਾਤਮਕ, ਤੱਥੀ, ਕੋਡ, ਸੰਵਾਦਾਤਮਕ)।
- ਸਧਾਰਨ ਨਿਯਮਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਪ੍ਰਾਂਪਟ ਤੋਂ ਕੰਮ ਦੀ ਕਿਸਮ ਪਤਾ ਲਗਾਉਣ ਦੀ ਮੈਥਡ ਲਾਗੂ ਕੀਤੀ।
- ਪਤਾ ਲੱਗੀ ਕੰਮ ਦੀ ਕਿਸਮ ਅਤੇ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਦੀ ਗਣਨਾ ਕੀਤੀ।
- ਪਿਛਲੇ ਕੰਮ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਅਧਾਰ ਸੋਧਾਂ ਲਾਗੂ ਕੀਤੀਆਂ ਤਾਂ ਜੋ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਕੁਸ਼ਲ ਬਨਾਇਆ ਜਾ ਸਕੇ।
- ਭਵਿੱਖੀ ਸੋਧਾਂ ਲਈ ਕਾਰਗੁਜ਼ਾਰੀ ਦਾ ਰੇਕਾਰਡ ਕੀਤਾ, ਸੀਖਣ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਸਮਰਥਿਤ ਕਰਨ ਲਈ।
- ਗਤੀਸ਼ੀਲ ਸੰਰਚਿਤ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨਾਲ ਬੇਨਤੀ ਭੇਜੀਆਂ ਅਤੇ ਲਾਗੂ ਕੀਤੇ ਗਏ ਪੈਰਾਮੀਟਰਾਂ ਅਤੇ ਕੰਮ ਦੀ ਕਿਸਮ ਦੇ ਨਾਲ ਜਨਰੇਟ ਕੀਤੇ ਟੈਕਸਟ ਨੂੰ ਵਾਪਸ ਕੀਤਾ।
- ਵਰਤਿਆ:
    - `userPreferences` ਨਾਲ ਯੂਜ਼ਰ-ਨਿਰਧਾਰਿਤ ਰਚਨਾਤਮਕਤਾ, ਸ਼ੁੱਧਤਾ ਅਤੇ ਸਥਿਰਤਾ ਦੇ ਲੈਵਲ ਦੇ ਅਧਾਰ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਵਿਅਕਤੀਗਤ ਕੀਤਾ।
    - `detectTaskType` ਨਾਲ ਪ੍ਰਾਂਪਟ ਦੀ ਕੁਦਰਤ ਦੱਸ ਕੇ ਉਚਿਤ ਜਵਾਬ ਦੇਣ ਲਈ ਰਣਨੀਤੀਆਂ ਲਾਗੂ ਕੀਤੀਆਂ।
    - `recordPerformance` ਨਾਲ ਜਨਰੇਟ ਕੀਤੇ ਜਵਾਬਾਂ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦੀ ਲਾਗਿੰਗ ਕੀਤੀ, ਤਾਂ ਜੋ ਸਿਸਟਮ ਸਮੇਂ ਦੇ ਨਾਲ ਅਨੁਕੂਲ ਹੋ ਸਕੇ।
    - `applyLearnedAdjustments` ਨਾਲ ਇਤਿਹਾਸਕ ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਆਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਸੋਧ ਕੀਤੀ, ਜੋ ਮਾਡਲ ਦੀ ਸ਼੍ਰੇਣੀ ਵਧਾਉਂਦੀ ਹੈ।
    - `generateResponse` ਨਾਲ ਸੰਪੂਰਨ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਲਪੇਟਿਆ, ਜਿਸ ਨਾਲ ਵੱਖ-ਵੱਖ ਪ੍ਰਾਂਪਟਾਂ ਅਤੇ ਸੰਦਰਭਾਂ ਲਈ ਆਸਾਨੀ ਨਾਲ ਕਾਲ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।
    - `allowedTools` ਨਾਲ ਦੱਸਿਆ ਕਿ ਮਾਡਲ ਜਨਰੇਸ਼ਨ ਦੌਰਾਨ ਕਿਹੜੇ ਟੂਲ ਵਰਤ ਸਕਦਾ ਹੈ ਅਤੇ ਇੰਨੀ ਤੋਂ ਵਧੇਰੇ ਸੰਦਰਭ-ਸਚੇਤ ਜਵਾਬ ਮੁਹੱਈਆ ਕਰਵਾਏ।
    - `feedbackScore` ਨਾਲ ਯੂਜ਼ਰਾਂ ਨੂੰ ਜਨਰੇਟ ਕੀਤੇ ਜਵਾਬ ਦੀ ਗੁਣਵੱਤਾ 'ਤੇ ਪ੍ਰਤੀਕ੍ਰਿਆ ਦੇਣ ਦੀ ਆਗਿਆ ਦਿੱਤੀ, ਜੋ ਮਾਡਲ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਨੂੰ ਹੋਰ ਸੁਧਾਰਨ ਲਈ ਵਰਤੀ ਜਾ ਸਕਦੀ ਹੈ।
    - `performanceHistory` ਨਾਲ ਪਿਛਲੇ ਇੰਟਰੈਕਸ਼ਨ ਦਾ ਰਿਕਾਰਡ ਸੰਭਾਲਿਆ, ਜੋ ਪਿਛਲੀ ਕਾਮਯਾਬੀਆਂ ਅਤੇ ਅਸਫਲਤਾ ਤੋਂ ਸਿਖਨ ਲਈ ਸਹਾਇਕ ਹੈ।
    - `getSamplingParameters` ਨਾਲ ਬੇਨਤੀ ਦੇ ਸੰਦਰਭ ਦੇ ਅਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਡਾਇਨਾਮਿਕ ਤੌਰ ਤੇ ਕਸਟਮਾਈਜ਼ ਕੀਤਾ, ਜਿਸ ਨਾਲ ਮਾਡਲ ਦਾ ਵਿਹਾਰ ਜ਼ਿਆਦਾ ਲਚਕੀਲਾ ਅਤੇ ਪ੍ਰਤੀਕ੍ਰਿਆਸ਼ੀਲ ਬਣਦਾ ਹੈ।
    - `detectTaskType` ਨਾਲ ਪ੍ਰਾਂਪਟ ਦਾ ਵਰਗੀਕਰਨ ਕਰਾਕੇ ਵੱਖ-ਵੱਖ ਕਿਸਮਾਂ ਦੀਆਂ ਬੇਨਤੀਆਂ ਲਈ ਉਚਿਤ ਸੈਂਪਲਿੰਗ ਰਣਨੀਤੀਆਂ ਲਾਗੂ ਕੀਤੀਆਂ।
    - `samplingProfiles` ਦੇ ਨਾਲ ਵੱਖ-ਵੱਖ ਕੰਮਾਂ ਲਈ ਬੇਸ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾਵਾਂ ਨੂੰ ਨਿਰਧਾਰਿਤ ਕੀਤਾ, ਜੋ ਜਨਰੇਟ ਕੀਤੇ ਜਵਾਬਾਂ ਨੂੰ ਤੇਜ਼ ਅਤੇ ਮੋਹਰੇਦਾਰ ਬਨਾਉਂਦਾ ਹੈ।

---

## ਅਗਲੇ ਕਦਮ

- [5.7 ਸਕੇਲਿੰਗ](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->