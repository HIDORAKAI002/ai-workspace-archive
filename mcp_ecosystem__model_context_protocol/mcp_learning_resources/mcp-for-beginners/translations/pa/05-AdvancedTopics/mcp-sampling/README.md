# ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ ਵਿੱਚ ਸੈਂਪਲਿੰਗ

ਸੈਂਪਲਿੰਗ ਇੱਕ ਸ਼ਕਤੀਸ਼ਾਲੀ MCP ਵਿਸ਼ੇਸ਼ਤਾ ਹੈ ਜੋ ਸਰਵਰਾਂ ਨੂੰ ਕਲਾਇੰਟ ਰਾਹੀਂ LLM ਪੂਰੀਆਂ ਬੇਨਤੀ ਕਰਨ ਦੇ ਯੋਗ ਬਣਾਉਂਦੀ ਹੈ, ਜਿਹੜੀ ਉੰਨਤ ਏਜੰਟਿਕ ਬਿਹੇਵਿਅਰ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ ਅਤੇ ਨਾਲ ਹੀ ਸੁਰੱਖਿਆ ਅਤੇ ਗੋਪਨੀਯਤਾ ਨੂੰ ਬਣਾਈ ਰੱਖਦਾ ਹੈ। ਸਹੀ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ ਜਵਾਬ ਦੀ ਗੁਣਵੱਤਾ ਅਤੇ ਕਾਰਗੁਜ਼ਾਰੀ ਵਿੱਚ ਬਹੁਤ ਸੁਧਾਰ ਕਰ ਸਕਦੀ ਹੈ। MCP ਇੱਕ ਮਿਆਰੀਕ੍ਰਿਤ ਤਰੀਕਾ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ ਜਿਸ ਨਾਲ ਮਾਡਲ ਟੈਕਸਟ ਉਤਪੰਨ ਕਰਨ ਦੇ ਤਰੀਕਿਆਂ ਨੂੰ ਵਿਸ਼ੇਸ਼ ਪੈਰਾਮੀਟਰਾਂ ਨਾਲ ਨਿਯੰਤਰਿਤ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ ਜੋ ਬੇਤੜਤਾ, ਰਚਨਾਤਮਕਤਾ ਤੇ ਸੰਗਤਤਾ 'ਤੇ ਪ੍ਰਭਾਵ ਪਾਉਂਦੇ ਹਨ।

## ਪਰਚੈ

ਇਸ ਪਾਠ ਵਿੱਚ, ਅਸੀਂ ਖੋਜ ਕਰਨਗੇ ਕਿ MCP ਬੇਨਤੀਆਂ ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਕਿਵੇਂ ਸੰਰਚਿਤ ਕਰਨ ਅਤੇ ਸੈਂਪਲਿੰਗ ਦੇ ਮੂਲ ਪ੍ਰੋਟੋਕਾਲ ਮਕੈਨਿਕਸ ਨੂੰ ਸਮਝਣਾਂ।

## ਸਿੱਖਣ ਦੇ ਉਦੇਸ਼

ਇਸ ਪਾਠ ਦੇ ਅੰਤ ਤੱਕ, ਤੁਸੀਂ ਯੋਗ ਹੋਵੋਗੇ:

- MCP ਵਿੱਚ ਉਪਲਬਧ ਮੁੱਖ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਸਮਝਣਾ।
- ਵੱਖ-ਵੱਖ ਵਰਤੋਂ ਮਾਮਲਿਆਂ ਲਈ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਸੰਰਚਿਤ ਕਰਨਾ।
- ਪ੍ਰਤੀਖਿਆਯੋਗ ਨਤੀਜਿਆਂ ਲਈ ਨਿਸ਼ਚਿਤ ਸੈਂਪਲਿੰਗ ਲਾਗੂ ਕਰਨਾ।
- ਸੰਦਰਭ ਅਤੇ ਵਰਤੋਂਕਾਰ ਪਸੰਦਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਡਾਇਨਾਮਿਕ ਤਰੀਕੇ ਨਾਲ ਸਮਤੋਲਿਤ ਕਰਨਾ।
- ਵੱਖ-ਵੱਖ ਸਥਿਤੀਆਂ ਵਿੱਚ ਮਾਡਲ ਦੇ ਕਾਰਗੁਜ਼ਾਰੀ ਨੂੰ ਵਿਕਸਤ ਕਰਨ ਲਈ ਸੈਂਪਲਿੰਗ ਰਣਨੀਤੀਆਂ ਲਾਗੂ ਕਰਨੀ।
- MCP ਦੇ ਕਲਾਇੰਟ-ਸਰਵਰ ਫਲੋ ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ, ਇਹ ਸਮਝਣਾ।

## MCP ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ

MCP ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਪ੍ਰਕਿਰਿਆ ਇਹ ਕਦਮ ਫਾਲੋ ਕਰਦੀ ਹੈ:

1. ਸਰਵਰ ਕਲਾਇੰਟ ਨੂੰ `sampling/createMessage` ਬੇਨਤੀ ਭੇਜਦਾ ਹੈ
2. ਕਲਾਇੰਟ ਬੇਨਤੀ ਦੀ ਸਮੀਖਿਆ ਕਰਦਾ ਹੈ ਅਤੇ ਇਸ ਨੂੰ ਸੋਧ ਸਕਦਾ ਹੈ
3. ਕਲਾਇੰਟ LLM ਤੋਂ ਸੈਂਪਲ ਲੈਂਦਾ ਹੈ
4. ਕਲਾਇੰਟ ਮੁਕੰਮਲਤਾ ਦੀ ਸਮੀਖਿਆ ਕਰਦਾ ਹੈ
5. ਕਲਾਇੰਟ ਨਤੀਜਾ ਸਰਵਰ ਨੂੰ ਵਾਪਸ ਭੇਜਦਾ ਹੈ

ਇਹ ਮਨੁੱਖੀ-ਇਨਥ-ਲੂਪ ਡਿਜ਼ਾਇਨ ਯੂਜ਼ਰ ਨੂੰ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ ਕਿ ਉਹ LLM ਦੇ ਵੇਖਣ ਅਤੇ ਬਣਾਉਣ 'ਤੇ ਕੰਟਰੋਲ ਰੱਖਦੇ ਹਨ।

## ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਦਾ ਝਲਕ

MCP ਹੇਠ ਲਿਖੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦਾ ਹੈ ਜੋ ਕਲਾਇੰਟ ਬੇਨਤੀਆਂ ਵਿੱਚ ਸੰਰਚਿਤ ਕੀਤੇ ਜਾ ਸਕਦੇ ਹਨ:

| ਪੈਰਾਮੀਟਰ | ਵਰਣਨ | ਆਮ ਰੇਂਜ |
|-----------|-------------|---------------|
| `temperature` | ਟੋਕਨ ਚੋਣ ਵਿੱਚ ਬੇਤੜਤਾ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਦਾ ਹੈ | 0.0 - 1.0 |
| `maxTokens` | ਉਤਪੰਨ ਕਰਨ ਵਾਲੇ ਟੋਕਨਾਂ ਦੀ ਵੱਧੋ-ਵੱਧ ਗਿਣਤੀ | ਪੂਰਨ ਅੰਕ |
| `stopSequences` | ਕਸਟਮ ਸਿੱਕੜੇ ਜੋ ਉਤਪੰਨਤਾ ਰੋਕਦੇ ਹਨ ਜਦੋਂ ਮਿਲਦੇ ਹਨ | ਸਤਰਾਂ ਦੀ ਸੂਚੀ |
| `metadata` | ਵਾਧੂ ਪ੍ਰਦਾਤਾ-ਵਿਸ਼ੇਸ਼ ਪੈਰਾਮੀਟਰ | JSON ਵਿਸ਼ੇਸ਼ |

ਬਹੁਤ ਸਾਰੇ LLM ਪ੍ਰਦਾਤਾ `metadata` ਖੇਤਰ ਰਾਹੀਂ ਵਾਧੂ ਪੈਰਾਮੀਟਰ ਸਹਿਯੋਗ ਕਰਦੇ ਹਨ, ਜਿਵੇਂ ਕਿ:

| ਆਮ ਵਧਾਊ ਪੈਰਾਮੀਟਰ | ਵਰਣਨ | ਆਮ ਰੇਂਜ |
|-----------|-------------|---------------|
| `top_p` | ਨਿਊਕਲੀਅਸ ਸੈਂਪਲਿੰਗ - ਟੋਕਨਾਂ ਨੂੰ ਸਿਖਰ ਕੁਲੀਨ ਸੰਭਾਵਨਾ ਤੱਕ ਸੀਮਤ ਕਰਦਾ ਹੈ | 0.0 - 1.0 |
| `top_k` | ਟੋਕਨ ਚੋਣ ਨੂੰ ਸਿਖਰ K ਵਿਕਲਪਾਂ ਤੱਕ ਸੀਮਤ ਕਰਦਾ ਹੈ | 1 - 100 |
| `presence_penalty` | ਟੋਕਨਾਂ ਨੂੰ ਉਸ ਦੀ ਪਿਛਲੀ ਮੌਜੂਦਗੀ ਦੇ ਅਧਾਰ 'ਤੇ ਸਜ਼ਾ ਦਿੰਦਾ ਹੈ | -2.0 - 2.0 |
| `frequency_penalty` | ਟੋਕਨਾਂ ਨੂੰ ਟੈਕਸਟ ਵਿੱਚ ਮੌਜੂਦਗੀ ਦੀ ਧੁਹਰਾਈ ਦੇ ਅਧਾਰ 'ਤੇ ਸਜ਼ਾ ਦਿੰਦਾ ਹੈ | -2.0 - 2.0 |
| `seed` | ਨਤੀਜਿਆਂ ਨੂੰ ਦੁਹਰਾਉਣ ਯੋਗ ਬਣਾਉਣ ਲਈ ਵਿਸ਼ੇਸ਼ ਯਾਦ੍ਰਚਿਕ ਬੀਜ | ਪੂਰਨ ਅੰਕ |

## ਉਦਾਹਰਣ ਬੇਨਤੀ ਫਾਰਮੈਟ

ਇੱਥੇ ਇੱਕ MCP ਕਲਾਇੰਟ ਤੋਂ ਸੈਂਪਲਿੰਗ ਬੇਨਤੀ ਲਈ ਉਦਾਹਰਣ ਹੈ:

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

ਕਲਾਇੰਟ ਇੱਕ ਮੁਕੰਮਲਤਾ ਨਤੀਜਾ ਵਾਪਸ ਕਰਦਾ ਹੈ:

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

## ਮਨੁੱਖੀ ਨਿਗਰਾਨੀ ਨਿਯੰਤਰਣ

MCP ਸੈਂਪਲਿੰਗ ਮਨੁੱਖੀ ਨਿਗਰਾਨੀ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖ ਕੇ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ:

- **ਪ੍ਰਾਂਪਟਸ ਲਈ**:
  - ਕਲਾਇੰਟਾਂ ਨੂੰ ਯੂਜ਼ਰਾਂ ਨੂੰ ਪੇਸ਼ ਕੀਤੇ ਗਏ ਪ੍ਰਾਂਪਟ ਦਿਖਾਉਣੇ ਚਾਹੀਦੇ ਹਨ
  - ਯੂਜ਼ਰਾਂ ਨੂੰ ਪ੍ਰਾਂਪਟਸ ਸੋਧਣ ਜਾਂ ਅਸਵੀਕਾਰ ਕਰਨ ਦੀ ਆਜ਼ਾਦੀ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ
  - ਸਿਸਟਮ ਪ੍ਰਾਂਪਟ ਫਿਲਟਰ ਜਾਂ ਸੋਧੇ ਜਾ ਸਕਦੇ ਹਨ
  - ਸੰਦਰਭ ਸ਼ਾਮਲ ਕਰਨ 'ਤੇ ਕਲਾਇੰਟ ਕੰਟਰੋਲ ਰੱਖਦਾ ਹੈ

- **ਪੂਰੀਆਂ ਲਈ**:
  - ਕਲਾਇੰਟਾਂ ਨੂੰ ਯੂਜ਼ਰਾਂ ਨੂੰ ਪੂਰੀਆਂ ਦਿਖਾਉਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ
  - ਯੂਜ਼ਰਾਂ ਨੂੰ ਪੂਰੀਆਂ ਸੋਧਣ ਜਾਂ ਅਸਵੀਕਾਰ ਕਰਨ ਦੀ ਆਜ਼ਾਦੀ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ
  - ਕਲਾਇੰਟ ਪੂਰੀਆਂ ਨੂੰ ਫਿਲਟਰ ਜਾਂ ਸੋਧ ਸਕਦੇ ਹਨ
  - ਯੂਜ਼ਰ ਟਰਾਂਸਪੋਰਟ ਨੂੰ ਕਦੇ ਕੋਈ ਮਾਡਲ ਵਰਤੋਂ ਕਰਨਾ ਹੈ, ਇਸ 'ਤੇ ਕੰਟਰੋਲ ਰੱਖਦਾ ਹੈ

ਇਹਨਾਂ ਨੀਤੀਆਂ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖ ਕੇ, ਚੱਲੋ ਵੇਖੀਏ ਕਿ ਸੈਂਪਲਿੰਗ ਨੂੰ ਵੱਖ-ਵੱਖ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਕਿਵੇਂ ਲਾਗੂ ਕਰਨਾ ਹੈ, ਉਹ ਪੈਰਾਮੀਟਰ ਜੋ ਬਹੁਤੇ LLM ਪ੍ਰਦਾਤਿਆਂ ਵਿੱਚ ਆਮ ਤੌਰ 'ਤੇ ਸਹਿਯੋਗਿਤ ਹੁੰਦੇ ਹਨ।

## ਸੁਰੱਖਿਆ ਵਿਚਾਰ

MCP ਵਿੱਚ ਸੈਂਪਲਿੰਗ ਲਾਗੂ ਕਰਨ ਵੇਲੇ, ਇਹ ਸੁਰੱਖਿਆ ਦੇ ਵਧੀਆ ਅਮਲ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ:

- **ਸਾਰੇ ਸੁਨੇਹੇ ਸਮੱਗਰੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ** ਕਲਾਇੰਟ ਨੂੰ ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ
- **ਸੰਵੇਦਨਸ਼ੀਲ ਜਾਣਕਾਰੀ ਸਫਾਈ** ਪ੍ਰਾਂਪਟਾਂ ਅਤੇ ਪੂਰੀਆਂ ਤੋਂ ਕਰੋ
- **ਦੁਰਵਿਵਹਾਰ ਰੋਕਣ ਲਈ ਦਰ ਸੀਮਾਵਾਂ ਲਾਗੂ ਕਰੋ**
- **ਅਸਧਾਰਣ ਪੈਟਰਨਾਂ ਲਈ ਸੈਂਪਲਿੰਗ ਉਪਯੋਗ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ**
- **ਡਾਟਾ ਟ੍ਰਾਂਜ਼ਿਟ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਪ੍ਰੋਟੋਕਾਲ ਨਾਲ ਇਨਕ੍ਰਿਪਟ ਕਰੋ**
- **ਲਾਗੂ ਕਾਨੂੰਨਾਂ ਮੁਤਾਬਕ ਵਰਤੋਂਕਾਰ ਡਾਟਾ ਗੋਪਨੀਯਤਾ ਸੰਭਾਲੋ**
- **ਅਡਿਟ ਸੈਂਪਲਿੰਗ ਬੇਨਤੀਆਂ** ਤੇ ਅਨੁਕੂਲਤਾ ਅਤੇ ਸੁਰੱਖਿਆ ਲਈ
- **ਲਾਗਤ ਪ੍ਰਦਰਸ਼ਨ ਉਤੇ ਕੰਟਰੋਲ ਰੱਖੋ** ਉਚਿਤ ਸੀਮਾਵਾਂ ਨਾਲ
- **ਸੈਂਪਲਿੰਗ ਬੇਨਤੀਆਂ ਲਈ ਸਮਾਂ ਸੀਮਾਵਾਂ ਲਾਗੂ ਕਰੋ**
- **ਮਾਡਲ ਤਰੁਟੀਆਂ ਨੂੰ ਸ਼ਾਲੀਨਤਾ ਨਾਲ ਸੰਭਾਲੋ** ਉਚਿਤ ਬੈਕਅਪ ਨਾਲ

ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਭਾਸ਼ਾ ਮਾਡਲਾਂ ਦੇ ਵਿਹਾਰ ਨੂੰ ਸੁਧਾਰਨ ਲਈ ਸੁਖਮ ਢੰਗ ਨਾਲ ਸੈਟ ਕਰਨ ਦੇ ਯੋਗ ਹੁੰਦੇ ਹਨ ਤਾਂ ਜੋ ਨਿਰਧਾਰਿਤ ਅਤੇ ਰਚਨਾਤਮਕ ਨਤੀਜੇ ਠੀਕ ਤੋਰ ਤੇ ਮਿਲਣ।

ਆਓ ਵੇਖੀਏ ਕਿਵੇਂ ਵੱਖ-ਵੱਖ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਇਹ ਪੈਰਾਮੀਟਰ ਸੈੱਟ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ ਵਿਸ਼ੇਸ਼ ਸਰਵਰ URL ਨਾਲ MCP ਕਲਾਇੰਟ ਬਣਾਇਆ।
- ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ, ਜਿਵੇਂ `temperature`, `top_p`, ਅਤੇ `top_k` ਵਾਲੀ ਬੇਨਤੀ ਸੰਰਚਿਤ ਕੀਤੀ।
- ਬੇਨਤੀ ਭੇਜੀ ਅਤੇ ਉਤਪੰਨ ਟੈਕਸਟ ਪ੍ਰਿੰਟ ਕੀਤਾ।
- ਵਰਤਿਆ:
    - `allowedTools` ਨਾਲ ਨਿਰਧਾਰਿਤ ਕੀਤਾ ਕਿ ਕਿਸ ਟੂਲ ਨੂੰ ਮਾਡਲ ਕ੍ਰिएਟਿਵ ਐਪ ਆਈਡੀਏਜ਼ ਬਣਾਉਣ ਵਿੱਚ ਵਰਤ ਸਕਦਾ ਹੈ, ਜਿਵੇਂ `ideaGenerator` ਅਤੇ `marketAnalyzer` ਨੂੰ ਮਦਦ ਲਈ ਮਨਜ਼ੂਰ ਕੀਤਾ।
    - `frequencyPenalty` ਅਤੇ `presencePenalty` ਨਾਲ ਅਉਟਪੁੱਟ ਵਿੱਚ ਦੁਹਰਾਈ ਅਤੇ ਵਿਭਿੰਨਤਾ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕੀਤਾ।
    - `temperature` ਨਾਲ ਆਉਟਪੁੱਟ ਦੀ ਬੇਤੜਤਾ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕੀਤਾ, ਜਿੱਥੇ ਵਧੇਰੇ ਮੁੱਲ ਰਚਨਾਤਮਕ ਜਵਾਬ ਦਿੰਦੇ ਹਨ।
    - `top_p` ਨਾਲ ਉਚਤ ਕੁਮੀਲ ਮੁਹਾਵਰੇ ਵਾਲੇ ਟੋਕਨਾਂ ਤੱਕ ਚੋਣ ਨੂੰ ਸੀਮਿਤ ਕੀਤਾ, ਜੋ ਉਤਪੰਨ ਟੈਕਸਟ ਦੀ ਗੁਣਵੱਤਾ ਨੂੰ ਵਧਾਉਂਦਾ ਹੈ।
    - `top_k` ਨਾਲ ਮਾਡਲ ਨੂੰ ਸਭ ਤੋਂ ਸੰਭਾਵਿਤ K ਟੋਕਨਾਂ ਤੱਕ ਸੀਮਿਤ ਕੀਤਾ, ਜੋ ਹੋਰ ਸੰਗਤ ਜਵਾਬ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।
    - `frequencyPenalty` ਅਤੇ `presencePenalty` ਨੂੰ ਦੁਹਰਾਈ ਘਟਾਉਣ ਅਤੇ ਸਰਗਰਮਤਾ ਨੂੰ ਵਧਾਉਣ ਲਈ ਵਰਤਿਆ।

# [JavaScript](#tab/javascript)

```javascript
// ਜਾਵਾਸਕ੍ਰਿਪਟ ਉਦਾਹਰਨ: ਤਾਪਮਾਨ ਅਤੇ ਟੌਪ-ਪੀ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP ਕਲਾਇंट ਦੀ ਸ਼ੁਰੂਆਤ ਕਰੋ
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // ਵੱਖ-ਵੱਖ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨਾਲ ਬੇਨਤੀ ਸੰਰਚਿਤ ਕਰੋ
  const creativeSampling = {
    temperature: 0.9,    // ਵੱਧ ਤਾਪਮਾਨ = ਵੱਧ ਬੇਰੂਪਤਾ/ਰਚਨਾਤਮਕਤਾ
    topP: 0.92,          // ਸਿਖਰ 92% ਸੰਭਾਵਨਾ ਵਾਲੇ ਟੋਕਨਜ਼ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ
    frequencyPenalty: 0.6, // ਟੋਕਨ ਕ੍ਰਮਾਂ ਦੀ ਦੋਹਰਾਈ ਘਟਾਓ
    presencePenalty: 0.4   // ਉਹਨਾਂ ਟੋਕਨਾਂ ਨੂੰ ਸਜ਼ਾ ਦੇਵੋ ਜੋ ਲੇਖ ਵਿੱਚ ਹੁਣ ਤੱਕ ਆ ਚੁੱਕੇ ਹਨ
  };
  
  const factualSampling = {
    temperature: 0.2,    // ਘੱਟ ਤਾਪਮਾਨ = ਵੱਧ ਨਿਸ਼ਚਿਤ/ਤੱਥਪ੍ਰਮਾਣਿਕ
    topP: 0.85,          // ਥੋੜ੍ਹੀ ਜ਼ਿਆਦਾ ਕੇਂਦਰਿਤ ਟੋਕਨ ਚੋਣ
    frequencyPenalty: 0.2, // ਨਿਯੂਨਤਮ ਦੋਹਰਾਈ ਸਜ਼ਾ
    presencePenalty: 0.1   // ਨਿਯੂਨਤਮ ਹਾਜ਼ਰੀ ਸਜ਼ਾ
  };
  
  try {
    // ਵੱਖ-ਵੱਖ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾਵਾਂ ਨਾਲ ਦੋ ਬੇਨਤੀਆਂ ਭੇਜੋ
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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ MCP ਕਲਾਇੰਟ ਸਰਵਰ URL ਅਤੇ API ਕੁੰਜੀ ਨਾਲ ਸੇਟ ਕੀਤਾ।
- ਦੋ ਸੈੱਟ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਸੰਰਚਿਤ ਕੀਤੇ: ਇਕ ਰਚਨਾਤਮਕ ਵਰਕਾਂ ਲਈ ਤੇ ਦੂਜਾ ਤੱਥਕ ਵਰਕਾਂ ਲਈ।
- ਇਹ ਸੰਰਚਨਾਵਾਂ ਨਾਲ ਬੇਨਤੀਆਂ ਭੇਜੀਆਂ, ਜਿਸ ਨਾਲ ਮਾਡਲ ਹਰ ਟਾਸਕ ਲਈ ਵਿਸ਼ੇਸ਼ ਟੂਲ ਵਰਤ ਸਕਦਾ ਹੈ।
- ਨਤੀਜਿਆਂ ਨੂੰ ਪ੍ਰਿੰਟ ਕਰਕੇ ਵੱਖ-ਵੱਖ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਦੇ ਪ੍ਰਭਾਵ ਦਿਖਾਏ।
- `allowedTools` ਨਾਲ ਨਿਰਧਾਰਿਤ ਕੀਤਾ ਕਿ ਮਾਡਲ ਕ੍ਰिएਟਿਵ ਟਾਸਕ ਲਈ `ideaGenerator` ਅਤੇ `environmentalImpactTool` ਵਰਤੇ, ਤੇ ਤੱਥਕ ਟਾਸਕ ਲਈ `factChecker` ਅਤੇ `dataAnalysisTool`।
- `temperature` ਨਾਲ ਬੇਤੜਤਾ ਸੰਭਾਲੀ, ਜਿੱਥੇ ਵਧੀਕ ਮੁੱਲ ਰਚਨਾਤਮਕ ਜਵਾਬਾਂ ਲਈ ਨੇਤ੍ਰਿਤਵ ਕਰਦੇ ਹਨ।
- `top_p` ਨਾਲ ਚੋਣ ਸੀਮਿਤ ਕੀਤੀ ਇਸ ਖੇਤਰ ਵਿੱਚ ਜੋ ਉਤਪੰਨ ਟੈਕਸਟ ਦੀ ਗੁਣਵੱਤਾ ਸਧਾਰਦਾ ਹੈ।
- `frequencyPenalty` ਅਤੇ `presencePenalty` ਨਾਲ ਦੁਹਰਾਈ ਘਟਾਈ ਅਤੇ ਵਿਭਿੰਨਤਾ ਵਧਾਈ।
- `top_k` ਨਾਲ ਮਾਡਲ ਨੂੰ ਸਭ ਤੋਂ ਸੰਭਾਵਿਤ K ਟੋਕਨ 'ਤੇ ਸੀਮਿਤ ਕੀਤਾ, ਜੋ ਹੋਰ ਸੰਗਤ ਜਵਾਬਾਂ ਲਈ ਮਦਦਗਾਰ ਹੈ।

---

## ਨਿਸ਼ਚਿਤ ਸੈਂਪਲਿੰਗ

ਲਾਗੂ ਦੀਆਂ ਪ੍ਰਸੰਗਿਕ ਐਪਲੀਕੇਸ਼ਨਾਂ ਲਈ ਨਿਰੰਤਰ ਨਤੀਜੇ ਲੈਣ ਲਈ, ਨਿਸ਼ਚਿਤ ਸੈਂਪਲਿੰਗ ਦੁਹਰਾਉਣ ਯੋਗ ਨਤੀਜੇ ਯਕੀਨੀ ਬਣਾਉਂਦੀ ਹੈ। ਇਹ ਇੰਝ ਕੰਮ ਕਰਦਾ ਹੈ ਕਿ ਇਹ ਇਕ ਨਿਸ਼ਚਿਤ ਯਾਦ੍ਰਚਿਕ ਬੀਜ ਵਰਤਦਾ ਹੈ ਅਤੇ ਟੈਮਪਰੇਚਰ ਨੂੰ ਜ਼ੀਰੋ ਤੇ ਸੈਟ ਕਰਦਾ ਹੈ।

ਆਓ ਹੇਠਾਂ ਵੱਖ-ਵੱਖ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਨਿਸ਼ਚਿਤ ਸੈਂਪਲਿੰਗ ਦਿਖਾਉਣ ਲਈ ਨਮੂਨਾ ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ ਵੇਖੀਏ।

# [Java](#tab/java)

```java
// ਜਾਵਾ ਉਦਾਹਰਨ: ਨਿਯਤ ਫਲਾਂ ਲਈ ਨਿਰਧਾਰਿਤ ਜਵਾਬਾਂ ਸਥਿਰ ਸੀਡ ਨਾਲ
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // ਨਿਰਧਾਰਿਤ ਨਤੀਜਿਆਂ ਲਈ ਸਥਿਰ ਸੀਡ ਦੀ ਵਰਤੋਂ ਕਰਨਾ
        
        // ਪਹਿਲੀ ਬੇਨਤੀ ਸਥਿਰ ਸੀਡ ਦੇ ਨਾਲ
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // ਵੱਧ ਤੋਂ ਵੱਧ ਨਿਯਤਤਾ ਲਈ ਸਿਫ਼ਰ ਤਾਪਮਾਨ
            .build();
            
        // ਦੂਜੀ ਬੇਨਤੀ ਇਕੋ ਹੀ ਸੀਡ ਨਾਲ
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // ਦੋਹਾਂ ਬੇਨਤੀਆਂ ਨੂੰ ਚਲਾਓ
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // ਜਵਾਬ ਇਕੋ ਜਾਣੇ ਜਾਣ ਕਿਉਂਕਿ ਇਕੋ ਸੀਡ ਅਤੇ ਤਾਪਮਾਨ=0 ਹੈ
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ MCP ਕਲਾਇੰਟ ਵਿਸ਼ੇਸ਼ ਸਰਵਰ URL ਨਾਲ ਬਣਾਇਆ।
- ਦੋ ਬੇਨਤੀਆਂ ਇਕੋ ਜਿਹੇ ਪ੍ਰਾਂਪਟ, ਨਿਸ਼ਚਿਤ ਬੀਜ, ਅਤੇ ਜ਼ੀਰੋ ਟੈਮਪਰੇਚਰ ਨਾਲ ਸੰਰਚਿਤ ਕੀਤੀਆਂ।
- ਦੋਹਾਂ ਬੇਨਤੀਆਂ ਭੇਜੀਆਂ ਅਤੇ ਉਤਪੰਨ ਟੈਕਸਟ ਪ੍ਰਿੰਟ ਕੀਤਾ।
- ਇਹ ਦਰਸਾਇਆ ਕਿ ਨਤੀਜੇ ਇਕੋ ਜਿਹੇ ਹਨ ਕਿਉਂਕਿ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ ਦੀ ਨਿਸ਼ਚਿਤ ਪ੍ਰਕ੍ਰਿਤੀ ਵਾਲੇ ਹਨ (ਇੱਕੋ ਬੀਜ ਅਤੇ ਟੈਮਪਰੇਚਰ)।
- `setSeed` ਨਾਲ ਨਿਸ਼ਚਿਤ ਯਾਦ੍ਰਚਿਕ ਬੀਜ ਨਿਰਧਾਰਤ ਕੀਤਾ, ਜੋ ਮਾਡਲ ਨੂੰ ਹਰ ਵਾਰੀ ਇੱਕੋ ਨਤੀਜਾ ਦੇਣ ਲਈ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ।
- `temperature` ਨੂੰ ਜ਼ੀਰੋ ਤੇ ਸੈਟ ਕੀਤਾ ਤਾਂ ਜੋ ਮਾਡਲ ਹਮੇਸ਼ਾ ਸਭ ਤੋਂ ਸੰਭਾਵਿਤ ਅਗਲਾ ਟੋਕਨ ਬਿਨਾਂ ਬੇਤੜਤਾ ਦੇ ਚੁਣੇ।

# [JavaScript](#tab/javascript-deterministic)

```javascript
// ਜਾਵਾਸਕ੍ਰਿਪਟ ਉਦਾਹਰਨ: ਸੀਡ ਕੰਟਰੋਲ ਨਾਲ ਨਿਸ਼ਚਿਤ ਜਵਾਬ
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // ਪਹਿਲੀ ਬੇਨਤੀ ਨਿਸ਼ਚਿਤ ਸੀਡ ਨਾਲ
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // ਵੱਧ ਤੋਂ ਵੱਧ ਨਿਸ਼ਚਿਤਤਾ ਲਈ ਸਿਫ਼ਰ ਤਾਪਮਾਨ
    });
    
    // ਦੂਜੀ ਬੇਨਤੀ ਇੱਕੋ ਹੀ ਸੀਡ ਅਤੇ ਤਾਪਮਾਨ ਨਾਲ
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // ਤੀਜੀ ਬੇਨਤੀ ਵੱਖ-ਵੱਖ ਸੀਡ ਪਰ ਇੱਕੋ ਤਾਪਮਾਨ ਨਾਲ
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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ MCP ਕਲਾਇੰਟ ਸਰਵਰ URL ਨਾਲ ਸ਼ੁਰੂ ਕੀਤਾ।
- ਦੋ ਬੇਨਤੀਆਂ ਇਕੋ ਜਿਹੇ ਪ੍ਰਾਂਪਟ, ਨਿਸ਼ਚਿਤ ਬੀਜ ਅਤੇ ਜ਼ੀਰੋ ਟੈਮਪਰੇਚਰ ਨਾਲ ਸੰਰਚਿਤ ਕੀਤੀਆਂ।
- ਦੋਹਾਂ ਬੇਨਤੀਆਂ ਭੇਜੀਆਂ ਅਤੇ ਉਤਪੰਨ ਟੈਕਸਟ ਪ੍ਰਿੰਟ ਕੀਤਾ।
- ਇਹ ਦਰਸਾਇਆ ਕਿ ਨਤੀਜੇ ਸਮਾਨ ਹਨ ਕਿਉਂਕਿ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ ਦੀ ਨਿਸ਼ਚਿਤ ਪ੍ਰਕ੍ਰਿਤੀ (ਇੱਕੋ ਬੀਜ ਅਤੇ ਟੈਮਪਰੇਚਰ)।
- `seed` ਨਾਲ ਨਿਸ਼ਚਿਤ ਯਾਦ੍ਰਚਿਕ ਬੀਜ ਨਿਰਧਾਰਤ ਕੀਤਾ, ਜੋ ਮਾਡਲ ਨੂੰ ਹਮੇਸ਼ਾ ਇੱਕੋ ਨਤੀਜਾ ਦੇਣ ਲਈ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ।
- `temperature` ਨੂੰ ਜ਼ੀਰੋ ਤੇ ਸੈਟ ਕੀਤਾ ਤਾਂ ਜੋ ਵੱਧ ਤੋਂ ਵੱਧ ਨਿਸ਼ਚਿਤਤਾ ਯਕੀਨੀ ਬਣੇ, ਮਾਡਲ ਹਮੇਸ਼ਾ ਸਭ ਤੋਂ ਸੰਭਾਵਿਤ ਅਗਲਾ ਟੋਕਨ ਚੁਣੇ।
- ਤੀਜੀ ਬੇਨਤੀ ਲਈ ਵੱਖਰਾ ਬੀਜ ਵਰਤਿਆ ਗਿਆ ਤਾਂ ਜੋ ਦਿਖਾਇਆ ਜਾ ਸਕੇ ਕਿ ਬੀਜ ਬਦਲਣ ਨਾਲ ਵੱਖ-ਵੱਖ ਨਤੀਜੇ ਮਿਲਦੇ ਹਨ, ਭਾਵੇਂ ਪ੍ਰਾਂਪਟ ਅਤੇ ਟੈਮਪਰੇਚਰ ਓਹਵੇਂ ਹੋਣ।

---

## ਡਾਇਨਾਮਿਕ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ

ਬੁੱਧਿਮਾਨ ਸੈਂਪਲਿੰਗ ਸੰਦਰਭ ਅਤੇ ਹਰ ਬੇਨਤੀ ਦੀਆਂ ਜ਼ਰੂਰਤਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰਦੀ ਹੈ। ਇਸਦਾ ਮਤਲਬ ਹੈ ਕਿ ਟੈਮਪਰੇਚਰ, top_p, ਅਤੇ ਸਜ਼ਾਵਾਂ ਵਰਗੇ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਤਸਵੀਰ ਦੇ ਕਿਸਮ, ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਜਾਂ ਇਤਿਹਾਸਿਕ ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਅਧਾਰ 'ਤੇ ਬਦਲਣਾ।

ਚੱਲੋ ਵੇਖੀਏ ਕਿ ਵੱਖ-ਵੱਖ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਡਾਇਨਾਮਿਕ ਸੈਂਪਲਿੰਗ ਕਿਵੇਂ ਲਾਗੂ ਕਰਨੀ ਹੈ।

# [Python](#tab/python)

```python
# ਪਾਇਥਨ ਉਦਾਹਰਨ: ਬੇਨਤੀ ਸੰਦਰਭ ਅਨੁਸਾਰ ਗਤੀਸ਼ੀਲ ਸੈਂਪਲਿੰਗ
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # ਵੱਖ-ਵੱਖ ਟਾਸਕ ਕਿਸਮਾਂ ਲਈ ਸੈਂਪਲਿੰਗ ਪ੍ਰੀਸੈਟ ਨੂੰ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # ਬੇਸ ਪ੍ਰੀਸੈਟ ਚੁਣੋ
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # ਜੇ ਦਿੱਤਾ ਗਿਆ ਹੋਵੇ ਤਾਂ ਉਪਭੋਗਤਾ ਪਸੰਦਾਂ ਅਨੁਸਾਰ ਸਮਰੀਲਿਤ ਕਰੋ
        if user_preferences:
            if "creativity_level" in user_preferences:
                # ਰਚਨਾਤਮਕਤਾ ਦੀ ਪਸੰਦ (1-10) ਦੇ ਅਨੁਸਾਰ ਤਾਪਮਾਨ ਨੂੰ ਮਾਪੋ
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # ਚਾਹੀਦੀ ਜਵਾਬ ਵਿਵਿਧਤਾ ਅਨੁਸਾਰ top_p ਨੂੰ ਸਮਰੀਲਿਤ ਕਰੋ
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # ਕਸਟਮ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨਾਲ ਬੇਨਤੀ ਬਣਾਓ ਅਤੇ ਭੇਜੋ
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # ਪਾਰਦਰਸ਼ਤਾ ਲਈ ਸੈਂਪਲਿੰਗ ਮੈਟਾਡੇਟਾ ਦੇ ਨਾਲ ਜਵਾਬ ਵਾਪਸ ਕਰੋ
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ `DynamicSamplingService` ਕਲਾਸ ਬਣਾਈ ਜੋ ਅਡੈਪਟਿਵ ਸੈਂਪਲਿੰਗ ਨੂੰ ਸੰਭਾਲਦੀ ਹੈ।
- ਵੱਖ-ਵੱਖ ਟਾਸਕ ਕਿਸਮਾਂ ਲਈ ਸੈਂਪਲਿੰਗ ਪ੍ਰੀਸੈੱਟ (ਰਚਨਾਤਮਕ, ਤੱਥਕ, ਕੋਡ, ਵਿਸ਼ਲੇਸ਼ਣੀ) ਨਿਰਧਾਰਤ ਕੀਤੇ।
- ਟਾਸਕ ਕਿਸਮ ਦੇ ਅਧਾਰ 'ਤੇ ਆਧਾਰ ਸੈਂਪਲਿੰਗ ਪ੍ਰੀਸੈੱਟ ਚੁਣਿਆ।
- ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਜਿਵੇਂ ਰਚਨਾਤਮਕਤਾ ਅਤੇ ਵਿਭਿੰਨਤਾ ਦੇ ਅਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਸੰਤੁਲਿਤ ਕੀਤੇ।
- ਸੰਰਚਿਤ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨਾਲ ਬੇਨਤੀ ਭੇਜੀ।
- ਪੈਰਾਮੀਟਰਾਂ ਅਤੇ ਟਾਸਕ ਕਿਸਮ ਦੇ ਸਾਥ ਮਾਡਲ ਦੇ ਜਵਾਬ ਨੂੰ ਵਾਪਸ ਕੀਤਾ ਸਰਗਰਮੀ ਲਈ।
- `temperature` ਨਾਲ ਆਉਟਪੁੱਟ ਦੀ ਬੇਤੜਤਾ ਕੰਟਰੋਲ ਕੀਤੀ, ਜਿੱਥੇ ਵੱਧ ਮੁੱਲ ਰਚਨਾਤਮਕ ਜਵਾਬਾਂ ਲਈ ਹੈ।
- `top_p` ਨਾਲ ਟੋਕਨਾਂ ਦੀ ਚੋਣ ਨੂੰ ਸਿਖਰ ਕੁਮੀਲ ਸੰਭਾਵਨਾ ਤੱਕ ਸੀਮਿਤ ਕੀਤਾ, ਜਿਸ ਨਾਲ ਉਤਪੰਨ ਟੈਕਸਟ ਦੀ ਗੁਣਵੱਤਾ ਵੱਧਦੀ ਹੈ।
- `frequency_penalty` ਨਾਲ ਦੁਹਰਾਈ ਸਿਮਟੀ ਅਤੇ ਵਿਭਿੰਨਤਾ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕੀਤਾ।
- `user_preferences` ਨਾਲ ਯੂਜ਼ਰ-ਪਰਿਭਾਸ਼ਿਤ ਰਚਨਾਤਮਕਤਾ ਅਤੇ ਵਿਭਿੰਨਤਾ ਪੱਧਰ ਦੇ ਅਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਕਸਟਮਾਈਜ਼ ਕੀਤਾ।
- `task_type` ਨਾਲ ਬੇਨਤੀ ਲਈ ਉਚਿਤ ਸੈਂਪਲਿੰਗ ਰਣਨੀਤੀ ਨਿਰਧਾਰਤ ਕੀਤੀ, ਜਿਸ ਨਾਲ ਟਾਸਕ ਦੀ ਪ੍ਰਕ੍ਰਿਤੀ ਅਨੁਸਾਰ ਬਿਹਤਰ ਜਵਾਬ ਮਿਲਦੇ ਹਨ।
- ਸੰਰਚਿਤ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਅਤੇ ਪ੍ਰਾਂਪਟ ਨਾਲ `send_request` ਵਿਧੀ ਕੌਲ ਕੀਤੀ, ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ ਕਿ ਮਾਡਲ ਨਿਰਧਾਰਿਤ ਜ਼ਰੂਰਤਾਂ ਮੁਤਾਬਕ ਟੈਕਸਟ ਬਣਾਵੇ।
- `generated_text` ਨਾਲ ਮਾਡਲ ਦੇ ਜਵਾਬ ਨੂੰ ਪ੍ਰਾਪਤ ਕੀਤਾ, ਜੋ ਫਿਰ ਸैंਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਅਤੇ ਟਾਸਕ ਕਿਸਮ ਦੇ ਨਾਲ ਵਾਪਸ ਕੀਤਾ ਗਿਆ ਤਜਜ਼ੀਏ ਜਾਂ ਡਿਸਪਲੇ ਲਈ।
- `min` ਅਤੇ `max` ਫੰਕਸ਼ਨਾਂ ਨਾਲ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਨੂੰ ਵੈਧ ਰੇਂਜ ਵਿੱਚ ਸੀਮਿਤ ਕੀਤਾ ਗਿਆ, ਤਾਂ ਜੋ ਗਲਤ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ ਨਾ ਬਣੇ।

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// ਜਾਵਾਸਕ੍ਰਿਪਟ ਉਦਾਹਰਨ: ਯੂਜ਼ਰ ਸੰਦਰਭ ਦੇ ਆਧਾਰ 'ਤੇ ਗਤੀਸ਼ੀਲ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾ
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // ਬੇਸ ਸੈਂਪਲਿੰਗ ਪ੍ਰੋਫਾਈਲ ਦੀ ਪਰਿਭਾਸ਼ਾ ਕਰੋ
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ਇਤਿਹਾਸਕ ਪ੍ਰਦਰਸ਼ਨ ਨੂੰ ਟਰੈਕ ਕਰੋ
    this.performanceHistory = [];
  }
  
  // ਪ੍ਰੰਪਟ ਤੋਂ ਟਾਸਕ ਕਿਸਮ ਦੀ ਪਛਾਣ ਕਰੋ
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // ਸਾਦਾ ਹੀਯੂਰੀਸਟਿਕ ਪਛਾਣ - ਐਮਐਲ ਵਰਗੀਕਰਨ ਨਾਲ ਸੁਧਾਰਿਆ ਜਾ ਸਕਦਾ ਹੈ
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
    
    // ਜੇ ਕੋਈ ਸਪੱਸ਼ਟ ਕਿਸਮ ਪਤਾ ਨਹੀਂ ਲੱਗਦੀ ਤਾਂ ਗੱਲਬਾਤੀ ਡਿਫਾਲਟ ਨੂੰ ਚੁਣੋ
    return 'conversational';
  }
  
  // ਸੰਦਰਭ ਅਤੇ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਦੀ ਗਣਨਾ ਕਰੋ
  getSamplingParameters(prompt, context = {}) {
    // ਟਾਸਕ ਦੀ ਕਿਸਮ ਦਾ ਪਤਾ ਲਗਾਓ
    const taskType = this.detectTaskType(prompt, context);
    
    // ਬੇਸ ਪ੍ਰੋਫਾਈਲ ਪ੍ਰਾਪਤ ਕਰੋ
    let params = {...this.samplingProfiles[taskType]};
    
    // ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਦੇ ਅਨੁਸਾਰ ਐਡਜਸਟ ਕਰੋ
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 ਤੋਂ ਇਹਤਿਆਤਮਕ ਤਾਪਮਾਨ ਰੇਂਜ ਲਈ ਸਕੇਲ ਕਰੋ
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // ਵੱਧ ਸੁਟੀਦਾਰੀ ਦਾ ਮਤਲਬ ਹੈ ਘੱਟ topP (ਜਿਆਦਾ ਕੇਂਦਰਿਤ ਚੋਣ)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // ਵੱਧ ਸਥਿਰਤਾ ਦਾ ਮਤਲਬ ਹੈ ਘੱਟ ਸਜ਼ਾਵਾਂ
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // ਪ੍ਰਦਰਸ਼ਨ ਇਤਿਹਾਸ ਵਿੱਚੋਂ ਸਿੱਖਿਆ ਗਿਆ ਸੁਧਾਰ ਲਾਗੂ ਕਰੋ
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // ਸਾਦਾ ਅਨੁਕੂਲ ਤਰਕ - ਹੋਰ ਸੁਧਰੇ ਹੋਏ ਅਲਗੋਰਿਦਮ ਨਾਲ ਵਧਾਇਆ ਜਾ ਸਕਦਾ ਹੈ
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // ਸਿਰਫ ਹਾਲੀਆ ਇਤਿਹਾਸ 'ਤੇ ਵਿਚਾਰ ਕਰੋ
    
    if (relevantHistory.length > 0) {
      // ਔਸਤ ਪ੍ਰਦਰਸ਼ਨ ਸਕੋਰ ਦੀ ਗਣਨਾ ਕਰੋ
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // ਜੇ ਪ੍ਰਦਰਸ਼ਨ ਸੀਮਾ ਤੋਂ ਘੱਟ ਹੋਵੇ, ਤਾਂ ਪੈਰਾਮੀਟਰ ਨੂੰ ਸਮਾਇਕ ਕਰੋ
      if (avgScore < 0.7) {
        // ਸੁਰੱਖਿਅਤ ਮੁੱਲਾਂ ਵੱਲ ਹਲਕਾ ਸੁਧਾਰ
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // ਭਵਿੱਖ ਦੇ ਸੁਧਾਰ ਲਈ ਪ੍ਰਦਰਸ਼ਨ ਦਰਜ ਕਰੋ
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // ਜਵਾਬ ਦੇ ਗੁਣਵੱਤਾ ਦਾ 0-1 ਮੁੱਲਾਂਕਣ
    });
    
    // ਇਤਿਹਾਸ ਦੇ ਆਕਾਰ ਨੂੰ ਸੀਮਤ ਕਰੋ
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // ਅਪਟੀਮਾਈਜ਼ਡ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਪ੍ਰਾਪਤ ਕਰੋ
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // ਅਪਟੀਮਾਈਜ਼ਡ ਪੈਰਾਮੀਟਰ ਨਾਲ ਬੇਨਤੀ ਭੇਜੋ
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // ਜੇ ਯੂਜ਼ਰ ਫੀਡਬੈਕ ਦਿੰਦਾ ਹੈ, ਤਾਂ ਭਵਿੱਖੇ ਸੁਧਾਰ ਲਈ ਇਸ ਨੂੰ ਦਰਜ ਕਰੋ
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

// ਉਦਾਹਰਨ ਦੇ ਰੂਪ ਵਿੱਚ ਵਰਤੋਂ
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // ਕ੍ਰੀਏਟਿਵ ਟਾਸਕ ਨਾਲ ਕਸਟਮ ਯੂਜ਼ਰ ਪਸੰਦਾਂ
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // ਉੱਚ ਸਿਰਜਣਾਤਮਕਤਾ (1-10)
          consistency: 3  // ਘੱਟ ਸਥਿਰਤਾ (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // ਕੋਡ ਜਨਰੇਸ਼ਨ ਟਾਸਕ
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // ਘੱਟ ਸਿਰਜਣਾਤਮਕਤਾ
          precision: 8,   // ਉੱਚ ਸੁਟੀਦਾਰੀ
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

ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਅਸੀਂ:

- ਇੱਕ `AdaptiveSamplingManager` ਕਲਾਸ ਬਣਾਈ ਜੋ ਟਾਸਕ ਕਿਸਮ ਅਤੇ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਡਾਇਨਾਮਿਕ ਸੈਂਪਲਿੰਗ ਸੰਭਾਲਦਾ ਹੈ।
- ਵੱਖ-ਵੱਖ ਟਾਸਕ ਕਿਸਮਾਂ ਲਈ ਸੈਂਪਲਿੰਗ ਪ੍ਰੋਫਾਈਲ ਨਿਰਧਾਰਤ ਕੀਤੇ (ਰਚਨਾਤਮਕ, ਤੱਥਕ, ਕੋਡ, ਗੱਲਬਾਤੀ)।
- ਸਧਾਰਨ ਨਿਯਮਾਂ ਨਾਲ ਪ੍ਰਾਂਪਟ ਤੋਂ ਟਾਸਕ ਕਿਸਮ ਦੀ ਪਛਾਣ ਲਈ ਇੱਕ ਵਿਧੀ ਲਾਗੂ ਕੀਤੀ।
- ਪਛਾਣੀ ਟਾਸਕ ਕਿਸਮ ਅਤੇ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਅਨੁਸਾਰ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਲਗਾਤਾਰ ਗਣਨਾ ਕੀਤੇ।
- ਇਤਿਹਾਸਕ ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਅਧਾਰ ‘ਤੇ ਸਿੱਖੀ ਹੋਈਆਂ ਸੁਧਾਰਾਂ ਨੂੰ ਲਾਗੂ ਕੀਤਾ ਤਾਂ ਜੋ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਢੰਗ ਨਾਲ ਸੁਧਰੇ।
- ਭਵਿੱਖ ਲਈ ਪ੍ਰਦਰਸ਼ਨ ਦਰਜ ਕੀਤਾ, ਜਿਸ ਨਾਲ ਸਿਸਟਮ ਪਿਛਲੇ ਇੰਟਰੈਕਸ਼ਨਾਂ ਤੋਂ ਸਿੱਖ ਸਕਦਾ ਹੈ।
- ਡਾਇਨਾਮਿਕ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਨਾਲ ਬੇਨਤੀਆਂ ਭੇਜੀਆਂ ਅਤੇ ਮੁੜ ਉਤਪੰਨ ਟੈਕਸਟ ਅਤੇ ਲਾਗੂ ਪੈਰਾਮੀਟਰ ਅਤੇ ਪਛਾਣੀ ਟਾਸਕ ਕਿਸਮ ਵਾਪਸ ਕੀਤੀ।
- ਵਰਤਿਆ:
    - `userPreferences` ਨਾਲ ਯੂਜ਼ਰ-ਪਰਿਭਾਸ਼ਿਤ ਰਚਨਾਤਮਕਤਾ, ਸਥਿਰਤਾ ਅਤੇ ਸੰਗਤੀ ਪੱਧਰ ਦੇ ਅਧਾਰ 'ਤੇ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਕਸਟਮਾਈਜ਼ ਕੀਤਾ।
    - `detectTaskType` ਨਾਲ ਪ੍ਰਾਂਪਟ ਦੇ ਅਧਾਰ 'ਤੇ ਟਾਸਕ ਦੀ ਪ੍ਰਕ੍ਰਿਤੀ ਪਛਾਣੀ, ਜਿਸ ਨਾਲ ਵੱਖ-ਵੱਖ ਬੇਨਤੀਆਂ ਲਈ ਉਚਿਤ ਸੈਂਪਲਿੰਗ ਰਣਨੀਤੀਆਂ ਲਾਗੂ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।
    - `recordPerformance` ਨਾਲ ਬਣਾਏ ਗਏ ਜਵਾਬਾਂ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਲੌਗ ਕੀਤੀ, ਜਿਸ ਨਾਲ ਸਿਸਟਮ ਸਮੇਂ ਨਾਲ ਸੁਧਾਰ ਕਰਦਾ ਰਹਿੰਦਾ ਹੈ।
    - `applyLearnedAdjustments` ਨਾਲ ਇਤਿਹਾਸਕ ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਅਧਾਰ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰ ਸੋਧੇ, ਜਿਸ ਨਾਲ ਮਾਡਲ ਦੀ ਉੱਚ ਗੁਣਵੱਤਾ ਵਾਲੀ ਤਿਆਰੀ ਵਧਦੀ ਹੈ।
    - `generateResponse` ਨਾਲ ਪੂਰੇ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਏਡੈਪਟਿਵ ਸੈਂਪਲਿੰਗ ਰਾਹੀਂ ਲਪੇਟਿਆ, ਜਿਸ ਨੂੰ ਵੱਖਰੇ ਪ੍ਰਾਂਪਟਾਂ ਤੇ ਸੰਦਰਭ ਨਾਲ ਆਸਾਨੀ ਨਾਲ ਕਾਲ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।
    - `allowedTools` ਨਾਲ ਨਿਰਧਾਰਿਤ ਕੀਤਾ ਕਿ ਜ਼ਨਰੇਸ਼ਨ ਦੌਰਾਨ ਮਾਡਲ ਕਿਹੜੇ ਟੂਲ ਵਰਤ ਸਕਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਹੋਰ ਸੰਦਰਭ-ਜਾਣੂ ਜਵਾਬ ਮਿਲਦੇ ਹਨ।
    - `feedbackScore` ਨਾਲ ਯੂਜ਼ਰਾਂ ਨੂੰ ਉਤਪੰਨ ਜਵਾਬ ਦੀ ਗੁਣਵੱਤਾ ਤੇ ਪ੍ਰਤੀਕਿਰਿਆ ਦੇਣ ਦੀ ਆਗਿਆ ਦਿੱਤੀ ਗਈ, ਜਿਸ ਨਾਲ ਮਾਡਲ ਦਾ ਕਾਰਗੁਜ਼ਾਰੀ ਸਮੇਂ ਨਾਲ ਸੁਧਰਦਾ ਹੈ।
    - `performanceHistory` ਨਾਲ ਪਿਛਲੇ ਇੰਟਰੈਕਸ਼ਨਾਂ ਦਾ ਰਿਕਾਰਡ ਸੰਭਾਲਿਆ, ਜੋ ਸਿਸਟਮ ਨੂੰ ਪਹਿਲਾਂ ਦੇ ਕਾਮਯਾਬੀਆਂ ਅਤੇ ਅਸਫਲਤਾਵਾਂ ਤੋਂ ਸਿੱਖਣ ਦੀ ਯੋਗਤਾ ਦਿੰਦਾ ਹੈ।
    - `getSamplingParameters` ਨਾਲ ਬੇਨਤੀ ਦੇ ਸੰਦਰਭ ਅਨੁਸਾਰ ਸੈਂਪਲਿੰਗ ਪੈਰਾਮੀਟਰਾਂ ਨੂੰ ਡਾਇਨਾਮਿਕ ਤੌਰ 'ਤੇ ਬਦਲਿਆ, ਜਿਸ ਨਾਲ ਮਾਡਲ ਦਾ ਵਿਹਾਰ ਹੋਰ ਲਚਕੀਲਾ ਤੇ ਜਵਾਬਦੇਹ ਬਣਦਾ ਹੈ।
    - `detectTaskType` ਨਾਲ ਪ੍ਰਾਂਪਟ ਦੇ ਅਧਾਰ 'ਤੇ ਟਾਸਕ ਦੀ ਸ਼੍ਰੇਣੀਬੱਧਾਈ, ਜਿਸ ਨਾਲ ਵੱਖਰੀਆਂ ਤਰ੍ਹਾਂ ਦੀਆਂ ਬੇਨਤੀਆਂ ਲਈ ਉਚਿਤ ਸੈਂਪਲਿੰਗ ਰਣਨੀਤੀਆਂ ਲਾਗੂ ਕਰ ਸਕੀਏ।
    - `samplingProfiles` ਨਾਲ ਵੱਖਰੇ ਟਾਸਕ ਕਿਸਮਾਂ ਲਈ ਮੁੱਲ ਬੁਨਿਆਦੀ ਸੈਂਪਲਿੰਗ ਸੰਰਚਨਾਵਾਂ ਨਿਰਧਾਰਿਤ ਕੀਤੀਆਂ, ਜਿਸ ਨਾਲ ਬੇਨਤੀ ਦੀ ਪ੍ਰਕ੍ਰਿਤੀ ਦੇ ਅਨੁਸਾਰ ਤੇਜ਼ ਸੰਪਾਦਨ ਹੋ ਸਕੇ।

---

## ਅਗਾਮੀ ਕਦਮ

- [5.7 ਸਕੇਲਿੰਗ](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->