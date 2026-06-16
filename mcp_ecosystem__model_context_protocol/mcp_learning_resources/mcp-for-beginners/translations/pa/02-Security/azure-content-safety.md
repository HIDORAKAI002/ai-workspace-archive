# Microsoft MCP ਸੁਰੱਖਿਆ ਵਿੱਚ ਐਜਰ ਕੰਟੈਂਟ ਸੇਫਟੀ ਨਾਲ ਅਡਵਾਂਸਡ

> **OWASP MCP ਜੁਆਖਮ ਜੋ ਹੱਲ ਕੀਤਾ ਗਿਆ**: [MCP06 - ਇਰਾਦੇ ਦੀ ਬਹਾਵ ਸਬਵਰਸ਼ਨ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

ਐਜਰ ਕੰਟੈਂਟ ਸੇਫਟੀ ਕਈ ਤਾਕਤਵਰ ਉਪਕਰਨ ਮੁਹੱਈਆ ਕਰਦਾ ਹੈ ਜੋ ਤੁਹਾਡੇ MCP ਲਾਗੂਕਰਨਾਂ ਦੀ ਸੁਰੱਖਿਆ ਨੂੰ ਬਹਿਤਰ ਕਰ ਸਕਦੇ ਹਨ। ਹਥਿਆਰਬੰਦ ਲਾਗੂਕਰਨ ਦੇ ਤਜਰਬੇ ਲਈ ਦੇਖੋ [MCP ਸੁਰੱਖਿਆ ਸਮਿੱਟ ਵਰਕਸ਼ਾਪ (ਸ਼ੇਰਪਾ)](https://azure-samples.github.io/sherpa/) ਕੈਂਪ 3: I/O ਸੁਰੱਖਿਆ।

## ਪ੍ਰੋਮਪਟ ਸ਼ੀਲਡਸ

ਮਾਈਕਰੋਸਾਫਟ ਦੇ AI ਪ੍ਰੋਮਪਟ ਸ਼ੀਲਡ ਸਿੱਧੀ ਅਤੇ ਪਰੋਕਸੀ ਪ੍ਰੋਮਪਟ ਇੰਜੈਕਸ਼ਨ ਹਮਲਿਆਂ ਤੋਂ ਮਜ਼ਬੂਤ ਸੁਰੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ:

1. **ਐਡਵਾਂਸਡ ਪਹਿਚਾਣ**: ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਾਡੇ ਵਿਗਾੜੂ ਹੁਕਮਾਂ ਨੂੰ ਪਛਾਣਦਾ ਹੈ ਜੋ ਸਮੱਗਰੀ ਵਿੱਚ ਛੁਪੇ ਹੁੰਦੇ ਹਨ।
2. **ਸਪੌਟਲਾਈਟਿੰਗ**: ਇਨਪੁੱਟ ਟੈਕਸਟ ਨੂੰ ਬਦਲਦਾ ਹੈ ਤਾਂ ਜੋ AI ਪ੍ਰਣਾਲੀਆਂ ਨੂੰ ਵੈਧ ਹੁਕਮਾਂ ਅਤੇ ਬਾਹਰੀ ਇਨਪੁੱਟ ਦੇ ਵਿਚਕਾਰ ਅੰਤਰ ਸਮਝਣ ਵਿੱਚ ਸਹਾਇਤਾ ਮਿਲੇ।
3. **ਸੀਮਾਰਖਾਂ ਅਤੇ ਡੇਟਾਮਾਰਕਿੰਗ**: ਭਰੋਸੇਯੋਗ ਅਤੇ ਅਭਰੋਸੇਯੋਗ ਡਾਟਾ ਦੇ ਦਰਮਿਆਨ ਸੀਮਾਰਖ਼ਾਂ ਨਿਸ਼ਾਨੀ ਲਾਉਂਦਾ ਹੈ।
4. **ਕੰਟੈਂਟ ਸੇਫਟੀ ਇੰਟੀਗ੍ਰੇਸ਼ਨ**: ਐਜਰ AI ਕੰਟੈਂਟ ਸੇਫਟੀ ਨਾਲ ਕੰਮ ਕਰਦਾ ਹੈ ਤਾਂ ਜੋ ਜੈਲਬ੍ਰੇਕ ਕੋਸ਼ਿਸ਼ਾਂ ਅਤੇ ਨੁਕਸਾਨਦੇਹ ਸਮੱਗਰੀ ਦੀ ਪਛਾਣ ਕੀਤੀ ਜਾ ਸਕੇ।
5. **ਸਤਤ ਅੱਪਡੇਟਸ**: ਮਾਈਕਰੋਸਾਫਟ ਨਿਰੰਤਰ emerging ਖਤਰਨਾਕ ਹਮਲਿਆਂ ਖ਼ਿਲਾਫ ਸੁਰੱਖਿਆ ਯੰਤਰਾਂ ਨੂੰ ਅੱਪਡੇਟ ਕਰਦਾ ਹੈ।

## MCP ਨਾਲ ਐਜਰ ਕੰਟੈਂਟ ਸੇਫਟੀ ਲਾਗੂ ਕਰਨਾ

ਇਹ ਪਹੁੰਚ ਕਈ ਤਹਾਂ ਦੀ ਸੁਰੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ:
- ਸੰਸਕਾਰਣ ਤੋਂ ਪਹਿਲਾਂ ਇਨਪੁੱਟਾਂ ਨੂੰ ਸਕੈਨ ਕਰਨਾ
- ਵਾਪਸੀ ਤੋਂ ਪਹਿਲਾਂ ਆਉਟਪੁੱਟਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨਾ
- ਮਾਲਿਸ਼ਿਅਸ ਪੈਟਰਨਾਂ ਲਈ ਬਲੌਕਲਿਸਟਾਂ ਦੀ ਵਰਤੋਂ
- ਐਜਰ ਦੇ ਸਤਤ ਅੱਪਡੇਟ ਕੀਤੇ ਜਾਣ ਵਾਲੇ ਕੰਟੈਂਟ ਸੇਫਟੀ ਮਾਡਲਾਂ ਦਾ ਲਾਹਾ ਲੈਣਾ

## ਐਜਰ ਕੰਟੈਂਟ ਸੇਫਟੀ ਸਾਧਨ

ਆਪਣੇ MCP ਸਰਵਰਾਂ ਨਾਲ ਐਜਰ ਕੰਟੈਂਟ ਸੇਫਟੀ ਲਾਗੂ ਕਰਨ ਬਾਰੇ ਹੋਰ ਜਾਣਕਾਰੀ ਲਈ, ਇਨ੍ਹਾਂ ਅਧਿਕਾਰਿਕ ਸਰੋਤਾਂ ਨੂੰ ਵੇਖੋ:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - ਐਜਰ ਕੰਟੈਂਟ ਸੇਫਟੀ ਲਈ ਅਧਿਕਾਰਿਕ ਦਸਤਾਵੇਜ਼।
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - ਪ੍ਰੋਮਪਟ ਇੰਜੈਕਸ਼ਨ ਹਮਲਿਆਂ ਨੂੰ ਰੋਕਣ ਦੇ ਤਰੀਕੇ ਸਿੱਖੋ।
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - ਕੰਟੈਂਟ ਸੇਫਟੀ ਲਾਗੂ ਕਰਨ ਲਈ ਵਿਸਥਾਰਿਤ API ਸੰਦਰਭ।
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# ਦੀ ਵਰਤੋਂ ਨਾਲ ਜਲਦੀ ਲਾਗੂ ਕਰਨ ਦੀ ਗਾਈਡ।
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - ਵੱਖ-ਵੱਖ ਪ੍ਰੋਗਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਲਈ ਕਲਾਇੰਟ ਲਾਇਬ੍ਰੇਰੀਆਂ।
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - ਜੈਲਬ੍ਰੇਕ ਕੋਸ਼ਿਸ਼ਾਂ ਦੀ ਪਹਿਚਾਣ ਅਤੇ ਰੋਕਥਾਮ ਤੇ ਵਿਸ਼ੇਸ਼ ਮਾਰਗਦਰਸ਼ਨ।
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - ਕੰਟੈਂਟ ਸੇਫਟੀ ਲਾਗੂ ਕਰਨ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਅਭਿਆਸ।

ਇੱਕ ਵਧੇਰੇ ਗਹਿਰਾਈ ਵਾਲੇ ਲਾਗੂ ਕਰਨ ਲਈ, ਸਾਡਾ [ਐਜਰ ਕੰਟੈਂਟ ਸੇਫਟੀ ਲਾਗੂ ਕਰਨ ਵਾਲਾ ਗਾਈਡ](./azure-content-safety-implementation.md) ਵੇਖੋ।

## ਅੱਗੇ ਕੀ ਹੈ

- ਪੜ੍ਹੋ: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- ਵਾਪਸ ਜਾਓ: [ਸੁਰੱਖਿਆ ਮੋਡੀਊਲ ਓਵਰਵਿਊ](./README.md)
- ਜਾਰੀ ਰੱਖੋ: [ਮੋਡੀਊਲ 3: ਸ਼ੁਰੂਆਤ](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->