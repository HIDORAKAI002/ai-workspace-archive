[![ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਨੂੰ ਖੋਜਣਾ](../../../translated_images/pa/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(ਇਸ ਪਾਠ ਦਾ ਵੀਡੀਓ ਦੇਖਣ ਲਈ ਉੱਪਰ ਦਿੱਤੀ ਚਿੱਤਰ 'ਤੇ ਕਲਿੱਕ ਕਰੋ)_

# ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਦੀ ਖੋਜ ਕਰੋ

ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਸੌਫਟਵੇਅਰ ਪਲੇਟਫਾਰਮ ਹਨ ਜੋ ਏਆਈ ਏਜੰਟ ਬਣਾਉਣ, ਤਿਆਰ ਕਰਨ ਅਤੇ ਪ੍ਰਬੰਧਿਤ ਕਰਨ ਨੂੰ ਆਸਾਨ ਬਣਾਉਂਦੇ ਹਨ। ਇਹ ਫਰੇਮਵਰਕ ਵਿਕਾਸਕਾਰਾਂ ਨੂੰ ਪਹਿਲਾਂ ਤੋਂ ਬਣੇ ਕੌਂਪੋਨੈਂਟ, abstractions ਅਤੇ ਟੂਲ ਮੁਹੱਈਆ ਕਰਵਾਉਂਦੇ ਹਨ ਜੋ ਜਟਿਲ ਏਆਈ ਸਿਸਟਮਾਂ ਦੇ ਵਿਕਾਸ ਨੂੰ ਸਧਾਰਨ ਬਣਾ ਦਿੰਦੇ ਹਨ।

ਇਹ ਫਰੇਮਵਰਕ ਵਿਕਾਸਕਾਰਾਂ ਨੂੰ ਆਪਣੇ ਐਪਲੀਕੇਸ਼ਨਾਂ ਦੇ ਵਿਲੱਖਣ ਪੱਖਾਂ 'ਤੇ ਧਿਆਨ ਕੇਂਦ੍ਰਿਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ ਕਿਉਂਕਿ ਇਹ ਏਆਈ ਏਜੰਟ ਵਿਕਾਸ ਵਿੱਚ ਆਮ ਚੁਣੌਤੀਆਂ ਲਈ ਮਿਆਰੀ ਤਰੀਕੇ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ। ਇਹ ਏਆਈ ਸਿਸਟਮਾਂ ਦੇ ਨਿਰਮਾਣ ਵਿੱਚ ਪੈਮਾਨੇ, ਪਹੁੰਚ ਅਤੇ ਕੁਸ਼ਲਤਾ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਂਦੇ ਹਨ।

## ਪਰਿਚੈ

ਇਸ ਪਾਠ ਵਿੱਚ ਇਹ ਕਵਰ ਕੀਤਾ ਜਾਵੇਗਾ:

- ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਕੀ ਹਨ ਅਤੇ ਇਹ ਵਿਕਾਸਕਾਰਾਂ ਨੂੰ ਕੀ ਪ੍ਰਾਪਤ ਕਰਨ ਦੇ ਯੋਗ ਬਣਾਉਂਦੇ ਹਨ?
- ਟੀਮਾਂ ਕਿਵੇਂ ਇਨ੍ਹਾਂ ਨੂੰ ਤੇਜ਼ੀ ਨਾਲ ਪ੍ਰੋਟੋਟਾਈਪ ਕਰਨ, ਦੁਹਰਾਉਣ ਅਤੇ ਆਪਣੇ ਏਜੰਟ ਦੀਆਂ ਸਮਰੱਥਾਵਾਂ ਨੂੰ ਸੁਧਾਰਣ ਲਈ ਵਰਤ ਸਕਦੀਆਂ ਹਨ?
- ਮਾਈਕ੍ਰੋਸੌਫਟ ਵੱਲੋਂ ਬਣਾਇਆ ਗਿਆਆਂ ਫਰੇਮਵਰਕ ਅਤੇ ਟੂਲਜ਼ (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> ਅਤੇ <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>) ਵਿੱਚ ਕੀ ਕੁਝ ਅੰਤਰ ਹਨ?
- ਕੀ ਮੈਂ ਆਪਣੇ ਮੌਜੂਦਾ Azure ecosystem ਦੇ ਟੂਲਜ਼ ਨੂੰ ਸਿੱਧੇ ਇੰਟੀਗ੍ਰੇਟ ਕਰ ਸਕਦਾ ਹਾਂ ਜਾਂ ਮੈਨੂੰ ਖੁਦਮੁਖਤਾਰ ਹੱਲਾਂ ਦੀ ਲੋੜ ਹੈ?
- Microsoft Foundry Agent Service ਕੀ ਹੈ ਅਤੇ ਇਹ ਮੈਨੂੰ ਕਿਵੇਂ ਮਦਦ ਕਰ ਰਿਹਾ ਹੈ?

## ਸਿੱਖਣ ਦੇ ਟੀਚੇ

ਇਸ ਪਾਠ ਦੇ ਟੀਚੇ ਤੁਹਾਨੂੰ ਇਹ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰਨਾ ਹਨ:

- ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਦੀ ਏਆਈ ਵਿਕਾਸ ਵਿੱਚ ਭੂਮਿਕਾ।
- ਹੋਸ਼ਿਆਰ ਏਜੰਟਾਂ ਨੂੰ ਬਣਾਉਣ ਲਈ ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਨੂੰ ਕਿਵੇਂ ਵਰਤਣਾ ਹੈ।
- ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਦੇ ਜਰੂਰੀ ਸਮਰੱਥਾਵਾਂ।
- Microsoft Agent Framework ਅਤੇ Microsoft Foundry Agent Service ਵਿਚਕਾਰ ਇੱਕ-ਦੂਜੇ ਤੋਂ ਕੀ ਅੰਤਰ ਹਨ।

## ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਕੀ ਹਨ ਅਤੇ ਇਹ ਵਿਕਾਸਕਾਰਾਂ ਨੂੰ ਕੀ ਕਰਨ ਦੇ ਯੋਗ ਬਣਾਉਂਦੇ ਹਨ?

ਰਵਾਇਤੀ ਏਆਈ ਫਰੇਮਵਰਕ ਤੁਹਾਡੇ ਐਪ ਵਿੱਚ ਏਆਈ ਨੂੰ ਜੋੜਨ ਵਿੱਚ ਅਤੇ ਇਹਨਾਂ ਐਪਾਂ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ:

- **ਵਿਆਕਤੀਕਰਨ**: ਏਆਈ ਉਪਭੋਗਤਾ ਦੇ ਵਰਤਾਰਾ ਅਤੇ ਪਸੰਦਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਵਿਅਕਤਿਗਤ ਸਿਫ਼ਾਰਸ਼ਾਂ, ਸਮੱਗਰੀ ਅਤੇ ਅਨੁਭਵ ਪ੍ਰਦਾਨ ਕਰ ਸਕਦਾ ਹੈ।
ਉਦਾਹਰਨ: ਨੈਟਫਲੀਕਸ ਵਰਗੀਆਂ ਸਟ੍ਰੀਮਿੰਗ ਸੇਵਾਵਾਂ ਨਜ਼ਰਅੰਦਾਜ਼ੀ ਇਤਿਹਾਸ ਦੇ ਆਧਾਰ ‘ਤੇ ਫਿਲਮਾਂ ਅਤੇ ਸ਼ੋਅ ਪੇਸ਼ ਕਰਨ ਲਈ ਏਆਈ ਨੂੰ ਵਰਤਦੀਆਂ ਹਨ, ਜੋ ਉਪਭੋਗਤਾ ਦੀ ਰੁਚੀ ਅਤੇ ਸੰਤੋਸ਼ ਨੂੰ ਵਧਾਉਂਦਾ ਹੈ।
- **ਆਟੋਮੇਸ਼ਨ ਅਤੇ ਕੁਸ਼ਲਤਾ**: ਏਆਈ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਕੰਮਾਂ ਨੂੰ ਆਪਣੇ ਆਪ ਕਰ ਸਕਦਾ ਹੈ, ਕੰਮ ਦੇ ਪ੍ਰਵਾਹਾਂ ਨੂੰ ਸਧਾਰਨ ਕਰਦਾ ਹੈ ਅਤੇ ਸੰਚਾਲਕੀ ਕੁਸ਼ਲਤਾ ਵਿੱਚ ਸੁਧਾਰ ਕਰਦਾ ਹੈ।
ਉਦਾਹਰਨ: ਗਾਹਕ ਸੇਵਾ ਐਪਲੀਕੇਸ਼ਨਾਂ ਵਿੱਚ ਏਆਈ ਚਲਾਏ ਚੈਟਬੋਟ ਆਮ ਪੁੱਛ-ਪੜਤਾਲ ਨੂੰ ਸੰਭਾਲਦੇ ਹਨ, ਜਵਾਬ ਦੇਣ ਦੇ ਸਮੇਂ ਨੂੰ ਘਟਾਉਂਦੇ ਹਨ ਅਤੇ ਮਨੁੱਖੀ ਏਜੰਟਾਂ ਨੂੰ ਜਟਿਲ ਮਸਲਿਆਂ ਲਈ ਖਾਲੀ ਕਰਦੇ ਹਨ।
- **ਬਿਹਤਰ ਉਪਭੋਗਤਾ ਅਨੁਭਵ**: ਏਆਈ ਸਮਿੱਤ ਵਰਤੋਂਕਾਰ ਅਨੁਭਵ ਨੂੰ ਸੁਧਾਰ ਸਕਦਾ ਹੈ, ਜਿਵੇਂ ਕਿ ਵੌਇਸ ਪਛਾਣ, ਪ੍ਰਾਕ੍ਰਿਤਿਕ ਭਾਸ਼ਾ ਪ੍ਰਕਿਰਿਆ, ਅਤੇ ਭਵਿੱਖਵਾਣੀ ਟੈਕਸਟ ਜਿਹੀਆਂ ਹੋਸ਼ਿਆਰ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਮੁਹੱਈਆ ਕਰਕੇ।
ਉਦਾਹਰਨ: ਵਿਰਚੁਅਲ ਸਹਾਇਕਾਂ ਜਿਵੇਂ ਸਿਰੀ ਅਤੇ ਗੂਗਲ ਅਸਿਸਟੈਂਟ ਵੌਇਸ ਹੁਕਮ ਸਮਝਣ ਅਤੇ ਪ੍ਰਤੀਕਿਰਿਆ ਦੇਣ ਲਈ ਏਆਈ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ, ਇਸ ਕਰਕੇ ਉਪਭੋਗਤਾਵਾਂ ਲਈ ਆਪਣੇ ਯੰਤਰਾਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰਨੀ ਆਸਾਨ ਹੁੰਦੀ ਹੈ।

### ਇਹ ਸਭ ਵਧੀਆ ਲੱਗਦਾ ਹੈ, ਪਰ ਫਿਰ ਸਾਨੂੰ ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕ ਦੀ ਲੋੜ ਕਿਉਂ ਹੈ?

ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕ ਸਿਰਫ਼ ਏਆਈ ਫਰੇਮਵਰਕ ਹੀ ਨਹੀਂ ਹਨ। ਇਹ ਹੋਸ਼ਿਆਰ ਏਜੰਟਾਂ ਦੀ ਰਚਨਾ ਲਈ ਬਣਾਏ ਗਏ ਹਨ ਜੋ ਉਪਭੋਗਤਾਵਾਂ, ਹੋਰ ਏਜੰਟਾਂ ਅਤੇ ਵਾਤਾਵਰਣ ਨਾਲ ਗੱਲਬਾਤ ਕਰ ਸਕਦੇ ਹਨ ਅਤੇ ਖਾਸ ਟੀਚੇ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦੇ ਹਨ। ਇਹ ਏਜੰਟ ਸੁਤੰਤਰ ਵਿਹਾਰ ਦਰਸਾਉਂਦੇ ਹਨ, ਫੈਸਲੇ ਲੈਂਦੇ ਹਨ ਅਤੇ ਬਦਲਦੇ ਹਾਲਾਤ ਦੇ ਅਨੁਸਾਰ ਆਪਣੇ ਆਪ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰਦੇ ਹਨ। ਆਓ ਕੁਝ ਮੁੱਖ ਸਮਰੱਥਾਵਾਂ ਵੇਖੀਏ ਜੋ ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਨਾਲ ਸੰਭਵ ਹੁੰਦੀਆਂ ਹਨ:

- **ਏਜੰਟ ਸਹਿਯੋਗ ਅਤੇ ਸਹਿ-ਸੰਯੋਜਨ**: ਸਹਯੋਗ ਕਰਨ, ਗੱਲਬਾਤ ਕਰਨ ਅਤੇ ਸਹਿ-ਸੰਯੋਜਿਤ ਹੋ ਕੇ ਜਟਿਲ ਕਾਰਜਾਂ ਨੂੰ ਹੱਲ ਕਰਨ ਵਾਲੇ ਮੁਲਟੀਪਲ ਏਆਈ ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਸਹੂਲਤ ਦਿੰਦੇ ਹਨ।
- **ਕਾਰਜ ਆਟੋਮੇਸ਼ਨ ਅਤੇ ਪ੍ਰਬੰਧਨ**: ਬਹੁ-ਕਦਮ ਕਾਰਜ ਪ੍ਰਵਾਹਾਂ ਨੂੰ ਆਟੋਮੇਟ ਕਰਨ, ਕਾਰਜ ਸੌਂਪਣ ਅਤੇ ਡਾਇਨਾਮਿਕ ਟਾਸਕ ਪ੍ਰਬੰਧਨ ਲਈ ਪ੍ਰਣਾਲੀਆਂ ਮੁਹੱਈਆ ਕਰਵਾਉਂਦੇ ਹਨ।
- **ਸੰਦਰਭ ਸਮਝ ਅਤੇ ਅਨੁਕੂਲਤਾ**: ਏਜੰਟਾਂ ਨੂੰ ਸੰਦਰਭ ਨੂੰ ਸਮਝਣ, ਬਦਲਦੇ ਵਾਤਾਵਰਣਾਂ ਦੇ ਅਨੁਸਾਰ ਅਨੁਕੂਲਣ ਕਰਨ ਅਤੇ ਸਮੇਂ ਸਿਰ ਜਾਣਕਾਰੀ ਦੇ ਆਧਾਰ ਤੇ ਫੈਸਲੇ ਕਰਨ ਯੋਗ ਬਣਾਉਂਦੇ ਹਨ।

ਸੰਖੇਪ ਵਿੱਚ, ਏਜੰਟ ਤੁਹਾਨੂੰ ਇਹ ਸਭ ਕੁਝ ਕਰਨ ਦੀ ਆਗਿਆ ਦਿੰਦੇ ਹਨ, ਆਟੋਮੇਸ਼ਨ ਨੂੰ ਊਚੇ ਪੱਧਰ ‘ਤੇ ਲੈ ਕੇ ਜਾਣ ਚ, ਹੋਸ਼ਿਆਰ ਸਿਸਟਮਾਂ ਬਣਾਉਣ ਜਿਹੜੇ ਆਪਣੇ ਵਾਤਾਵਰਣ ਤੋਂ ਸਿੱਖ ਅਤੇ ਅਨੁਕੂਲ ਹਨ।

## ਏਜੰਟ ਦੀਆਂ ਸਮਰੱਥਾਵਾਂ ਨੂੰ ਤੇਜ਼ੀ ਨਾਲ ਪ੍ਰੋਟੋਟਾਈਪ, ਦੁਹਰਾਉਣ ਅਤੇ ਸੁਧਾਰਣ ਲਈ ਕਿਵੇਂ?

ਇਹ ਖੇਤਰ ਤੇਜ਼ੀ ਨਾਲ ਬਦਲ ਰਹਾ ਹੈ, ਪਰ ਜ਼ਿਆਦਾਤਰ ਏਆਈ ਏਜੰਟ ਫਰੇਮਵਰਕਸ ਵਿੱਚ ਕੁਝ ਆਮ ਗੱਲਾਂ ਹਨ ਜੋ ਤੁਹਾਨੂੰ ਤੇਜ਼ੀ ਨਾਲ ਪ੍ਰੋਟੋਟਾਈਪ ਅਤੇ ਦੁਹਰਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀਆਂ ਹਨ, ਖਾਸ ਕਰਕੇ ਮੌਡਿਊਲਰ ਕੌਂਪੋਨੈਂਟਾਂ, ਸਹਿਯੋਗੀ ਟੂਲ, ਅਤੇ ਰੀਅਲ-ਟਾਈਮ ਸਿੱਖਣਾ। ਆਓ ਇਹਨਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੀਏ:

- **ਮੌਡਿਊਲਰ ਕੌਂਪੋਨੈਂਟਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ**: ਏਆਈ SDKਜ਼ ਪਹਿਲਾਂ ਤਿਆਰ ਕੀਤੇ ਕੌਂਪੋਨੈਂਟ ਜਿਵੇਂ ਕਿ ਏਆਈ ਅਤੇ ਮੈਮੋਰੀ ਕੁਨੈਕਟਰ, ਨੈਚੁਰਲ ਭਾਸ਼ਾ ਜਾਂ ਕੋਡ ਪਲੱਗਇਨ ਨਾਲ ਫੰਕਸ਼ਨ ਕਾਲਿੰਗ, ਪ੍ਰੌਂਪਟ ਟੈਂਪਲੇਟ ਆਦਿ ਮੁਹੱਈਆ ਕਰਵਾਉਂਦੇ ਹਨ।
- **ਸਹਿਯੋਗੀ ਟੂਲ ਨੂੰ ਵਰਤੋ**: ਏਜੰਟਾਂ ਨੂੰ ਵਿਸ਼ੇਸ਼ ਭੂਮਿਕਾਵਾਂ ਅਤੇ ਕਾਰਜਾਂ ਨਾਲ ਡਿਜ਼ਾਈਨ ਕਰੋ, ਇਸ ਤਰ੍ਹਾਂ ਉਹ ਸਹਿਯੋਗੀ ਕਾਰਜ ਪ੍ਰਵਾਹ ਨੂੰ ਟੈਸਟ ਅਤੇ ਸੁਧਾਰ ਸਕਣ।
- **ਰੀਅਲ-ਟਾਈਮ 'ਚ ਸਿੱਖੋ**: ਫੀਡਬੈਕ ਲੂਪ ਲਾਗੂ ਕਰੋ ਜਿੱਥੇ ਏਜੰਟ ਇੰਟਰੈਕਸ਼ਨਾਂ ਤੋਂ ਸਿੱਖਦੇ ਹਨ ਅਤੇ ਆਪਣਾ ਵਿਹਾਰ ਗਤੀਸ਼ੀਲ ਤੌਰ 'ਤੇ ਸਮਝੌਤੇ ਕਰਦੇ ਹਨ।

### ਮੌਡਿਊਲਰ ਕੌਂਪੋਨੈਂਟ ਦੀ ਵਰਤੋਂ ਕਰਨਾ

Microsoft Agent Framework ਵਰਗੇ SDK ਪਹਿਲਾਂ ਤਿਆਰ ਕੀਤੇ ਕੌਂਪੋਨੈਂਟ, ਜਿਵੇਂ ਕਿ ਏਆਈ ਕੁਨੈਕਟਰ, ਟੂਲ ਡਿਫਿਨੀਸ਼ਨ ਅਤੇ ਏਜੰਟ ਪ੍ਰਬੰਧਨ ਮੁਹੱਈਆ ਕਰਵਾਉਂਦੇ ਹਨ।

**ਟੀਮਾਂ ਕਿਵੇਂ ਵਰਤ ਸਕਦੀਆਂ ਹਨ**: ਟੀਮਾਂ ਬਿਨਾ ਸਿਰੇ ਤੋਂ ਸ਼ੁਰੂ ਕਰਨ ਦੇ, ਤੇਜ਼ ਪਰੈਟੋਟਾਈਪ ਬਣਾਉਣ ਲਈ ਇਹਨਾਂ ਕੌਂਪੋਨੈਂਟਾਂ ਨੂੰ ਜਰੂਰੀ ਤੌਰ 'ਤੇ ਜੋੜ ਸਕਦੀਆਂ ਹਨ, ਇਸ ਨਾਲ ਤੇਜ਼ ਪ੍ਰਯੋਗ ਅਤੇ ਦੁਹਰਾਉਣ ਹੋ ਸਕਦਾ ਹੈ।

**ਅਮਲ ਵਿੱਚ ਨੂੰ ਕੰਮ ਕਰਦਾ ਹੈ**: ਤੁਸੀਂ ਯੂਜ਼ਰ ਇਨਪੁਟ ਵਿੱਚੋਂ ਜਾਣਕਾਰੀ ਕੱਢਣ ਲਈ ਪਹਿਲਾਂ ਤਿਆਰ ਕੀਤਾ ਭਾਸ਼ਾ ਵਿਸ਼ਲੇਸ਼ਕ (parser), ਡੇਟਾ ਸਟੋਰ ਕਰਨ ਅਤੇ ਲੈਣ ਲਈ ਮੈਮੋਰੀ ਮੌਡਿਊਲ, ਅਤੇ ਯੂਜ਼ਰ ਨਾਲ ਗੱਲ ਕਰਨ ਲਈ ਪ੍ਰੌਂਪਟ ਜੈਨਰੇਟਰ ਵਰਤ ਸਕਦੇ ਹੋ, ਸਾਰੇ ਇਹ ਕੌਂਪੋਨੈਂਟ ਤੁਹਾਨੂੰ ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਬਣਾਉਣ ਦੀ ਲੋੜ ਨਹੀਂ ਪੈਂਦੀ।

**ਉਦਾਹਰਨ ਕੋਡ**। ਆਓ ਵੇਖੀਏ ਕਿ Microsoft Agent Framework ਨੂੰ `FoundryChatClient` ਨਾਲ ਕਿਵੇਂ ਵਰਤ ਕੇ ਮਾਡਲ ਨੂੰ ਯੂਜ਼ਰ ਇਨਪੁਟ 'ਤੇ ਟੂਲ ਕਾਲਿੰਗ ਦੇ ਜਵਾਬ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ:

``` python
# ਮਾਈਕਰੋਸਾਫਟ ਏਜੰਟ ਫਰੇਮਵਰਕ ਪਾਇਥਨ ਉਦਾਹਰਨ

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# ਯਾਤਰਾ ਬੁੱਕ ਕਰਨ ਲਈ ਇੱਕ ਨਮੂਨਾ ਟੂਲ ਫੰਕਸ਼ਨ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # ਉਦਾਹਰਨ ਨਤੀਜਾ: ਤੁਹਾਡੀ 1 ਜਨਵਰੀ, 2025 ਨੂੰ ਨਿਊਯਾਰਕ ਲਈ ਉਡਾਨ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਕੀਤੀ ਗਈ ਹੈ। ਸੁਰੱਖਿਅਤ ਯਾਤਰਾ! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

ਤੁਸੀਂ ਇਸ ਉਦਾਹਰਨ ਤੋਂ ਵੇਖ ਸਕਦੇ ਹੋ ਕਿ ਕਿਵੇਂ ਤੁਸੀਂ ਪਹਿਲਾਂ ਤਿਆਰ ਕੀਆ ਭਾਸ਼ਾ ਵਿਸ਼ਲੇਸ਼ਕ (parser) ਨੂੰ ਯੂਜ਼ਰ ਇਨਪੁਟ ਤੋਂ ਮੁੱਖ ਜਾਣਕਾਰੀ ਕੱਢਣ ਲਈ ਵਰਤ ਸਕਦੇ ਹੋ, ਜਿਵੇਂ ਕਿ ਉਡਾਣ ਦੀ ਮੂਲ, ਮੰਜ਼ਿਲ ਅਤੇ ਤਾਰੀਖ। ਇਹ ਮੌਡਿਊਲਰ ਪਹੁੰਚ ਤੁਹਾਨੂੰ ਉੱਚ ਪੱਧਰ ਦੇ ਤਰਕ 'ਤੇ ਧਿਆਨ ਕੇਂਦ੍ਰਿਤ ਕਰਨ ਦਿੰਦੀ ਹੈ।

### ਸਹਿਯੋਗੀ ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਨਾ

Microsoft Agent Framework ਵਰਗੇ ਫਰੇਮਵਰਕਸ ਬਹੁਤ ਸਾਰੇ ਏਜੰਟ ਬਣਾਉਣ ਵਿੱਚ ਸਹੂਲਤ ਦਿੰਦੇ ਹਨ ਜੋ ਇੱਕੱਠੇ ਕੰਮ ਕਰ ਸਕਦੇ ਹਨ।

**ਟੀਮਾਂ ਕਿਵੇਂ ਵਰਤ ਸਕਦੀਆਂ ਹਨ**: ਟੀਮਾਂ ਵਿਸ਼ੇਸ਼ ਭੂਮਿਕਾਵਾਂ ਅਤੇ ਕਾਰਜਾਂ ਵਾਲੇ ਏਜੰਟ ਡਿਜ਼ਾਈਨ ਕਰ ਸਕਦੀਆਂ ਹਨ, ਜੋ ਉਨ੍ਹਾਂ ਨੂੰ ਸਹਿਯੋਗੀ ਕਾਰਜ ਪ੍ਰਵਾਹ ਦੇ ਟੈਸਟ ਅਤੇ ਸੁਧਾਰ ਕਰਨ ਅਤੇ ਕੁੱਲ ਪ੍ਰਣਾਲੀ ਦੀ ਕੁਸ਼ਲਤਾ ਨੂੰ ਵਧਾਉਣ ਮੌਕਾ ਦਿੰਦੇ ਹਨ।

**ਅਮਲ ਵਿੱਚ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ**: ਤੁਸੀਂ ਓਹੋ ਏਜੰਟਾਂ ਦੀ ਟੀਮ ਬਣਾਉਂਦੇ ਹੋ ਜਿੱਥੇ ਹਰ ਏਜੰਟ ਦੀ ਵਿਸ਼ੇਸ਼ ਫੰਕਸ਼ਨ ਹੁੰਦੀ ਹੈ, ਜਿਵੇਂ ਡੇਟਾ ਪ੍ਰਾਪਤੀ, ਵਿਸ਼ਲੇਸ਼ਣ ਜਾਂ ਫੈਸਲਾ ਲੈਣਾ। ਇਹ ਏਜੰਟ ਗੱਲਬਾਤ ਕਰ ਸਕਦੇ ਹਨ ਅਤੇ ਜਾਣਕਾਰੀ ਵੰਡ ਸਕਦੇ ਹਨ ਤਾਂ ਜੋ ਕੋਈ ਸਾਂਝਾ ਟੀਚਾ ਜਿਵੇਂ ਕਿ ਉਪਭੋਗਤਾ ਦੀ ਪੁੱਛਤਾਛ ਦਾ ਜਵਾਬ ਦੇਣਾ ਜਾਂ ਕਾਰਜ ਪੂਰਾ ਕਰਨਾ ਪ੍ਰਾਪਤ ਹੋ ਸਕੇ।

**ਉਦਾਹਰਨ ਕੋਡ (Microsoft Agent Framework)**:

```python
# ਮਾਈਕ੍ਰੋਸੋਫਟ ਏਜੰਟ ਫਰੇਮਵਰਕ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇਕੱਠੇ ਕੰਮ ਕਰਨ ਵਾਲੇ ਕਈ ਏਜੰਟ ਬਣਾਉਣਾ

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# ਡਾਟਾ ਪ੍ਰਾਪਤੀ ਏਜੰਟ
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# ਡਾਟਾ ਵਿਸ਼ਲੇਸ਼ਣ ਏਜੰਟ
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# ਕਿਸੇ ਕੰਮ ਤੇ ਏਜੰਟਾਂ ਨੂੰ ਕ੍ਰਮ ਵਿੱਚ ਚਲਾਉਣਾ
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

ਤੁਸੀਂ ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ ਵੇਖ ਸਕਦੇ ਹੋ ਕਿ ਕਿਵੇਂ ਤੁਸੀਂ ਬਹੁਤ ਸਾਰੇ ਏਜੰਟਾਂ ਦੀ ਸਹਿਯੋਗੀ ਕਾਰਜ ਵਿੱਚ ਲਾਉਣ ਲਈ ਕਾਰਜ ਬਣਾਉਂਦੇ ਹੋ। ਹਰ ਏਜੰਟ ਇੱਕ ਵਿਸ਼ੇਸ਼ ਫੰਕਸ਼ਨ ਨਿਭਾਂਦਾ ਹੈ, ਅਤੇ ਕਾਰਜ ਇਹਨਾਂ ਏਜੰਟਾਂ ਨੂੰ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਕੋਆਰਡੀਨੇਟ ਕਰਕੇ ਪੂਰਾ ਹੁੰਦਾ ਹੈ। ਵਿਸ਼ੇਸ਼ ਭੂਮਿਕਾ ਵਾਲੇ махсус ਏਜੰਟ ਬਣਾਕੇ, ਤੁਸੀਂ ਕਾਰਜ ਦੀ ਕੁਸ਼ਲਤਾ ਅਤੇ ਪ੍ਰਦਰਸ਼ਨ ਨੂੰ ਸੁਧਾਰ ਸਕਦੇ ਹੋ।

### ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਸਿੱਖਣਾ

ਅੱਗੇ ਵਧੇ ਹੋਏ ਫਰੇਮਵਰਕਸ ਰੀਅਲ-ਟਾਈਮ ਸੰਦਰਭ ਸਮਝ ਅਤੇ ਅਨੁਕੂਲਤਾ ਲਈ ਸਮਰੱਥਾਵਾਂ ਮੁਹੱਈਆ ਕਰਵਾਉਂਦੇ ਹਨ।

**ਟੀਮਾਂ ਕਿਵੇਂ ਵਰਤ ਸਕਦੀਆਂ ਹਨ**: ਟੀਮਾਂ ਫੀਡਬੈਕ ਲੂਪ ਲਾਗੂ ਕਰਦੀਆਂ ਹਨ ਜਿੱਥੇ ਏਜੰਟ ਇੰਟਰਐਕਸ਼ਨਾਂ ਤੋਂ ਸਿੱਖਦੇ ਹਨ ਅਤੇ ਆਪਣਾ ਵਿਹਾਰ ਗਤੀਸ਼ੀਲ ਤੌਰ 'ਤੇ ਬਦਲਦੇ ਹਨ, ਇਸ ਨਾਲ ਲਗਾਤਾਰ ਸੁਧਾਰ ਅਤੇ ਸਮਰੱਥਾਵਾਂ ਦਾ ਨਿਰੰਤਰ ਵਿਕਾਸ ਹੁੰਦਾ ਹੈ।

**ਅਮਲ ਵਿੱਚ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ**: ਏਜੰਟ ਯੂਜ਼ਰ ਫੀਡਬੈਕ, ਵਾਤਾਵਰਣਿਕ ਡੇਟਾ ਅਤੇ ਕਾਰਜ ਦੇ ਨਤੀਜਿਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਆਪਣਾ ਗਿਆਨ ਅੱਪਡੇਟ ਕਰਦੇ ਹਨ, ਫੈਸਲੇ ਲੈਣ ਵਾਲੇ ਅਲਗੋਰਿਦਮ ਬਦਲਦੇ ਹਨ ਅਤੇ ਸਮੇਂ ਦੇ ਨਾਲ ਆਪਣੀ ਪ੍ਰਦਰਸ਼ਨ ਕੁਸ਼ਲਤਾ ਬਿਹਤਰ ਕਰਦੇ ਹਨ। ਇਹ ਦੁਹਰਾਉਣ ਵਾਲੀ ਸਿੱਖਣ ਪਕਿਰਿਆ ਏਜੰਟਾਂ ਨੂੰ ਬਦਲਦੇ ਹਾਲਾਤਾਂ ਅਤੇ ਯੂਜ਼ਰ ਦੀਆਂ ਪਸੰਦਾਂ ਦੇ ਅਨੁਸਾਰ ਅਨੁਕੂਲਨ ਯੋਗ ਬਨਾਉਂਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਕੁੱਲ ਪ੍ਰਣਾਲੀ ਦੀ ਪ੍ਰਭਾਵਸ਼ੀਲਤਾ ਵਧਦੀ ਹੈ।

## Microsoft Agent Framework ਅਤੇ Microsoft Foundry Agent Service ਵਿੱਚ ਅੰਤਰ ਕੀ ਹਨ?

ਇਨ੍ਹਾਂ ਤਰੀਕਿਆਂ ਦੀ ਤੁਲਨਾ ਕਰਨ ਦੇ ਕਈ ਤਰੀਕੇ ਹਨ, ਪਰ ਆਓ ਕੁਝ ਮੁੱਖ ਅੰਤਰਾਂ ਨੂੰ ਉਨ੍ਹਾਂ ਦੇ ਡਿਜ਼ਾਇਨ, ਸਮਰੱਥਾਵਾਂ ਅਤੇ ਨਿਸ਼ਾਨਾ ਵਰਤੋਂ ਦੇ ਹਿਸਾਬ ਨਾਲ ਵੇਖੀਏ:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework ਇੱਕ ਸਧਾਰਨ SDK ਮੁਹੱਈਆ ਕਰਦਾ ਹੈ ਜੋ `FoundryChatClient` ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਏਆਈ ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਹੈ। ਇਹ ਵਿਕਾਸਕਾਰਾਂ ਨੂੰ ਏਜੰਟ ਬਣਾਉਣ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ ਜੋ Azure OpenAI ਮਾਡਲਾਂ ਨੂੰ ਫਾਇਦਾ ਪੁਹੰਚਾਉਂਦੇ ਹੋਏ ਬਿਲਟ-ਇਨ ਟੂਲ ਕਾਲਿੰਗ, ਗੱਲਬਾਤ ਪ੍ਰਬੰਧਨ ਅਤੇ Azure ਪਛਾਣ ਦੇ ਜ਼ਰੀਏ ਇੰਟਰਪ੍ਰਾਈਜ਼-ਗਰੇਡ ਸੁਰੱਖਿਆ ਦਿੰਦੇ ਹਨ।

**ਵਰਤੋਂ ਮਾਮਲੇ**: ਉਤਪਾਦਨ-ਤਿਆਰ ਏਆਈ ਏਜੰਟ ਬਣਾਉਣਾ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਟੂਲ ਯੂਜ਼, ਬਹੁ-ਕਦਮ ਕਾਰਜ ਪ੍ਰਵਾਹ ਅਤੇ ਇੰਟਰਪ੍ਰਾਈਜ਼ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਸਨੈਰੀਓਜ਼ ਸ਼ਾਮਲ ਹਨ।

ਇੱਥੇ Microsoft Agent Framework ਦੇ ਕੁਝ ਮਹੱਤਵਪੂਰਣ ਮੁੱਢਲੇ ਤੱਤ ਹਨ:

- **ਏਜੰਟ**. ਇੱਕ ਏਜੰਟ `FoundryChatClient` ਰਾਹੀਂ ਬਣਾਇਆ ਜਾਂਦਾ ਹੈ ਅਤੇ ਉਸ ਨਾਲ ਨਾਮ, ਹਦਾਇਤਾਂ ਅਤੇ ਟੂਲਜ਼ ਨੂੰ ਕਨਫਿਗਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਏਜੰਟ ਇਹ ਕਰ ਸਕਦਾ ਹੈ:
  - **ਯੂਜ਼ਰ ਸੁਨੇਹਿਆਂ ਨੂੰ ਪ੍ਰਕਿਰਿਆਨਾ** ਅਤੇ Azure OpenAI ਮਾਡਲਾਂ ਦੀ ਵਰਤੋਂ ਨਾਲ ਜਵਾਬ ਤਿਆਰ ਕਰਨਾ।
  - **ਟੂਲ ਕਾਲ ਕਰੋ** ਗੱਲਬਾਤ ਦੇ ਸੰਦਰਭ ਦੇ ਅਨੁਸਾਰ ਸਵੈਚਾਲਿਤ ਤੌਰ ਤੇ।
  - **ਮੁਲਾਕਾਤਾਂ ਦੌਰਾਨ ਗੱਲਬਾਤ ਦੀ ਅਵਸਥਾ ਬਣਾਈ ਰੱਖੋ**।

  ਇੱਥੇ ਇੱਕ ਕੋਡ ਟੁਕੜਾ ਹੈ ਜੋ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਕਿਵੇਂ ਏਜੰਟ ਬਣਾਇਆ ਜਾਂਦਾ ਹੈ:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **ਟੂਲਜ਼**. ਫਰੇਮਵਰਕ ਟੂਲਜ਼ ਨੂੰ ਪਾਈਥਾਨ ਫੰਕਸ਼ਨਾਂ ਵਜੋਂ ਪਰਿਭਾਸ਼ਿਤ ਕਰਨ ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ ਜਿਨ੍ਹਾਂ ਨੂੰ ਏਜੰਟ ਆਪਣੇ ਆਪ ਕਾਲ ਕਰ ਸਕਦਾ ਹੈ। ਟੂਲਜ਼ ਨੂੰ ਏਜੰਟ ਬਣਾਉਣ ਸਮੇਂ ਰਜਿਸਟਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **ਮਲਟੀ-ਏਜੰਟ ਸਹਿ-ਸੰਯੋਜਨ**. ਤੁਸੀਂ ਵੱਖ-ਵੱਖ ਖ਼ਾਸੀਅਤਾਂ ਵਾਲੇ ਕਈ ਏਜੰਟ ਬਣਾ ਸਕਦੇ ਹੋ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਕੰਮ ਨੂੰ ਕੋਆਰਡੀਨੇਟ ਕਰ ਸਕਦੇ ਹੋ:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Azure ਪਛਾਣ ਇੰਟੀਗ੍ਰੇਸ਼ਨ**. ਫਰੇਮਵਰਕ `AzureCliCredential` (ਜਾਂ `DefaultAzureCredential`) ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ ਸੁਰੱਖਿਅਤ, ਕੀ-ਰਹਿਤ ਪ੍ਰਮਾਣਿਕਤਾ ਲਈ, ਜਿਸ ਨਾਲ ਏਪੀਆਈ ਕੀਜ਼ ਨੂੰ ਸਿੱਧਾ ਪ੍ਰਬੰਧਿਤ ਕਰਨ ਦੀ ਲੋੜ ਨਹੀਂ ਰਹਿੰਦੀ।

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service ਇੱਕ ਨਵਾਂ ਪ੍ਯੋਜਕ ਹੈ, ਜੋ Microsoft Ignite 2024 ਵਿੱਚ ਤਾਰੁਫ਼ ਕਰਵਾਇਆ ਗਿਆ। ਇਹ ਲਚਕੀਲੇ ਮਾਡਲ ਜਿਵੇਂ ਖੁੱਲ੍ਹੇ-source LLMs (ਜਿਵੇਂ Llama 3, Mistral, ਅਤੇ Cohere) ਨੂੰ ਸਿੱਧਾ ਕਾਲ ਕਰਨ ਸਮੇਤ ਏਆਈ ਏਜੰਟਾਂ ਦੇ ਵਿਕਾਸ ਅਤੇ ਤੈਅ ਕਰਨ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ।

Microsoft Foundry Agent Service enterprise ਗ੍ਰੇਡ ਸੁਰੱਖਿਆ ਪ੍ਰਣਾਲੀਆਂ ਅਤੇ ਡੇਟਾ ਸਟੋਰੇਜ ਤਰੀਕੇ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ, ਜੋ ਇਸਨੂੰ ਇੰਟਰਪ੍ਰਾਈਜ਼ ਐਪਲੀਕੇਸ਼ਨ ਲਈ ਯੋਗ ਬਣਾਉਂਦੇ ਹਨ।

ਇਹ Microsoft Agent Framework ਨਾਲ ਮਿਲ ਕੇ ਏਜੰਟਾਂ ਨੂੰ ਬਣਾਉਣ ਅਤੇ ਤੈਅ ਕਰਨ ਲਈ ਤਿਆਰ ਹੈ।

ਇਹ ਸਰਵਿਸ ਇਸ ਸਮੇਂ ਪਬਲਿਕ ਪ੍ਰੀਵਿਊ ਵਿੱਚ ਹੈ ਅਤੇ ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਪਾਇਥਾਨ ਅਤੇ C# ਨੂੰ ਸਹਿਯੋਗ ਦਿੰਦੀ ਹੈ।

Microsoft Foundry Agent Service ਪਾਇਥਨ SDK ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਸੀਂ ਯੂਜ਼ਰ-ਨਿਰਧਾਰਤ ਟੂਲ ਨਾਲ ਇੱਕ ਏਜੰਟ ਬਣਾ ਸਕਦੇ ਹਾਂ:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# ਸੰਦ ਦੇ ਫੰਕਸ਼ਨ ਪਰਿਭਾਸ਼ਤ ਕਰੋ
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### ਮੁੱਖ ਤੱਤ

Microsoft Foundry Agent Service ਦੇ ਜਰੂਰੀ ਮੁੱਖ ਤੱਤ ਕੁਝ ਇਸ ਤਰ੍ਹਾਂ ਹਨ:

- **ਏਜੰਟ**. Microsoft Foundry Agent Service Microsoft Foundry ਨਾਲ ਮਿਲ ਜੁਲ ਕੇ ਕੰਮ ਕਰਦਾ ਹੈ। Microsoft Foundry ਵਿੱਚ, ਏਆਈ ਏਜੰਟ ਇੱਕ "ਸਮਾਰਟ" ਮਾਈਕਰੋਸਰਵਿਸ ਵਾਂਗ ਕੰਮ ਕਰਦਾ ਹੈ ਜੋ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦੇ ਸਕਦਾ ਹੈ (RAG), ਕਾਰਜ ਕਰ ਸਕਦਾ ਹੈ ਜਾਂ ਪੂਰੇ ਵਰਕਫਲੋਅਜ਼ ਨੂੰ ਆਟੋਮੇਟ ਕਰ ਸਕਦਾ ਹੈ। ਇਹ ਜਨਰੇਟਿਵ ਏਆਈ ਮਾਡਲਾਂ ਦੀ ਸ਼ਕਤੀ ਨਾਲ ਟੂਲਜ਼ ਨੂੰ ਮਿਲਾ ਕੇ ਕਾਮ ਕਰਦਾ ਹੈ ਜੋ ਇਸਨੂੰ ਅਸਲ ਦੁਨੀਆਂ ਦੇ ਡੇਟਾ ਸਰੋਤਾਂ ਤੱਕ ਪਹੁੰਚ ਅਤੇ ਇੰਟਰਐਕਟ ਕਰਨ ਦਿੰਦੇ ਹਨ। ਇੱਥੇ ਇੱਕ ਉਦਾਹਰਨ ਹੈ:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    ਇਸ ਉਦਾਹਰਨ ਵਿੱਚ, ਏਜੰਟ `gpt-4.1-mini` ਮਾਡਲ, ਨਾਮ `my-agent`, ਅਤੇ ਹਦਾਇਤਾਂ 'ਤੁਸੀਂ ਮਦਦਗਾਰ ਏਜੰਟ ਹੋ' ਨਾਲ ਬਣਾਇਆ ਗਿਆ ਹੈ। ਏਜੰਟ ਕੋਡ ਵਿਵਰਣ ਕਾਰਜਾਂ ਕਰਨ ਲਈ ਟੂਲਜ਼ ਅਤੇ ਸਰੋਤਾਂ ਨਾਲ ਲੈਸ ਹੈ।

- **ਥ੍ਰੈਡ ਅਤੇ ਸੁਨੇਹੇ**. ਥ੍ਰੈਡ ਇੱਕ ਹੋਰ ਮਹੱਤਵਪੂਰਣ ਤੱਤ ਹੈ। ਇਹ ਇੱਕ ਗੱਲਬਾਤ ਜਾਂ ਉਪਭੋਗਤਾ ਅਤੇ ਏਜੰਟ ਦੇ ਦਰਮਿਆਨ ਇੰਟਰਐਕਸ਼ਨ ਦਾ ਪ੍ਰਤੀਨਿਧਿਤਾ ਕਰਦਾ ਹੈ। ਥ੍ਰੈਡ ਗੱਲਬਾਤ ਦੀ ਪ੍ਰਗਤੀ ਨੂੰ ਟ੍ਰੈਕ ਕਰਨ, ਸੰਦਰਭ ਜਾਣਕਾਰੀ ਸਟੋਰ ਕਰਨ ਅਤੇ ਇੰਟਰਐਕਸ਼ਨ ਦੀ ਅਵਸਥਾ ਨੂੰ ਪ੍ਰਬੰਧਿਤ ਕਰਨ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ। ਇਹ ਰਹੀ ਥ੍ਰੈਡ ਦੀ ਇੱਕ ਉਦਾਹਰਨ:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # ਏਜੰਟ ਨੂੰ ਧਾਗੇ 'ਤੇ ਕੰਮ ਕਰਨ ਲਈ ਕਹੋ
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # ਏਜੰਟ ਦੇ ਜਵਾਬ ਦੇਖਣ ਲਈ ਸਾਰੀਆਂ ਸੁਨੇਹਾ ਲਿਆਵੋ ਅਤੇ ਲੌਗ ਕਰੋ
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    ਪਿਛਲੇ ਕੋਡ ਵਿੱਚ, ਇੱਕ ਥ੍ਰੈਡ ਬਣਾਇਆ ਜਾਂਦਾ ਹੈ। ਉਸ ਮਗਰੋਂ ਥ੍ਰੈਡ ਨੂੰ ਸੁਨੇਹਾ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ। `create_and_process_run` ਨੂੰ ਕਾਲ ਕਰਕੇ, ਏਜੰਟ ਨੂੰ ਥ੍ਰੈਡ 'ਤੇ ਕੰਮ ਕਰਨ ਲਈ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਅੰਤ ਵਿੱਚ, ਸੁਨੇਹੇ ਲਿਆਏ ਜਾਂਦੇ ਹਨ ਅਤੇ ਲੌਗ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਤਾਂ ਜੋ ਏਜੰਟ ਦੀ ਪ੍ਰਤੀਕਿਰਿਆ ਵੇਖੀ ਜਾ ਸਕੇ। ਇਹ ਸੁਨੇਹੇ ਗੱਲਬਾਤ ਦੀ ਪ੍ਰਗਤੀ ਨੂੰ ਦਰਸਾਉਂਦੇ ਹਨ ਜੋ ਉਪਭੋਗਤਾ ਅਤੇ ਏਜੰਟ ਵਿਚਕਾਰ ਹੁੰਦੀ ਹੈ। ਇਹ ਵੀ ਜਰੂਰੀ ਹੈ ਕਿ ਸਮਝੋ ਕਿ ਸੁਨੇਹੇ ਵੱਖ-ਵੱਖ ਕਿਸਮਾਂ ਦੇ ਹੋ ਸਕਦੇ ਹਨ ਜਿਵੇਂ ਕਿ ਲਿਖਤੀ, ਚਿੱਤਰ ਜਾਂ ਫਾਈਲ, ਜਿਸਦਾ مطلب ਹੈ ਏਜੰਟ ਦਾ ਕੰਮ ਕਿਸੇ ਚਿੱਤਰ ਜਾਂ ਲਿਖਤੀ ਜਵਾਬ ਦੇ ਰੂਪ ਵਿੱਚ ਹੋ ਸਕਦਾ ਹੈ। ਇੱਕ ਵਿਕਾਸਕਾਰ ਵਜੋਂ, ਤੁਸੀਂ ਇਸ ਜਾਣਕਾਰੀ ਨੂੰ ਅੱਗੇ ਪ੍ਰਕਿਰਿਆ ਕਰਨ ਜਾਂ ਉਪਭੋਗਤਾ ਨੂੰ ਪੇਸ਼ ਕਰਨ ਲਈ ਵਰਤ ਸਕਦੇ ਹੋ।

- **Microsoft Agent Framework ਨਾਲ ਇੰਟੀਗ੍ਰੇਸ਼ਨ**. Microsoft Foundry Agent Service Microsoft Agent Framework ਨਾਲ ਬਿਨਾਂ ਰੁਕਾਵਟ ਦੇ ਕੰਮ ਕਰਦਾ ਹੈ, ਜਿਸਦਾ ਅਰਥ ਹੈ ਕਿ ਤੁਸੀਂ `FoundryChatClient` ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਏਜੰਟ ਬਣਾ ਸਕਦੇ ਹੋ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਉਤਪਾਦਨ ਪੱਧਰ 'ਤੇ Agent Service ਰਾਹੀਂ ਤੈਅ ਕਰ ਸਕਦੇ ਹੋ।

**ਵਰਤੋਂ ਮਾਮਲੇ**: Microsoft Foundry Agent Service ਲਈ– ਉਹ ਇੰਟਰਪ੍ਰਾਈਜ਼ ਐਪਲੀਕੇਸ਼ਨ ਜੋ ਸੁਰੱਖਿਅਤ, ਪੈਮਾਨੇਯੋਗ ਅਤੇ ਲਚਕੀਲੇ ਏਆਈ ਏਜੰਟ ਤੈਅ ਕਰਨ ਦੀ ਜ਼ਰੂਰਤ ਹੈ।

## ਇਹਨਾਂ ਤਰੀਕਿਆਂ ਵਿੱਚ ਕੀ ਅੰਤਰ ਹੈ?
 
ਇਹ ਲੱਗਦਾ ਹੈ ਕਿ ਇਹ ਦੋਹਾਂ ਵਿੱਚ ਓਵਰਲੈਪ ਹੈ, ਪਰ ਇਨ੍ਹਾਂ ਦੇ ਡਿਜ਼ਾਇਨ, ਸਮਰੱਥਾ ਅਤੇ ਨਿਸ਼ਾਨਾ ਵਰਤੋਂ ਦੇ ਹਿਸਾਬ ਨਾਲ ਕੁਝ ਮੁੱਖ ਅੰਤਰ ਹਨ:
 
- **Microsoft Agent Framework (MAF)**: ਏਆਈ ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਉਤਪਾਦਨ-ਤਿਆਰ SDK ਹੈ। ਇਹ ਟੂਲ ਕਾਲਿੰਗ, ਗੱਲਬਾਤ ਪ੍ਰਬੰਧਨ ਅਤੇ Azure ਪਛਾਣ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਦੇ ਨਾਲ ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਸਧਾਰਨ API ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।
- **Microsoft Foundry Agent Service**: Microsoft Foundry ਵਿੱਚ ਇੱਕ ਪਲੇਟਫਾਰਮ ਅਤੇ ਤੈਅ ਸੇਵਾ ਹੈ ਜੋ ਏਜੰਟਾਂ ਲਈ ਹੈ। ਇਹ Azure OpenAI, Azure AI Search, Bing Search ਅਤੇ ਕੋਡ ਐਗਜ਼ਿਕਿਊਸ਼ਨ ਵਰਗੀਆਂ ਸਰਵਿਸਜ਼ ਨਾਲ ਬਿਲਟ-ਇਨ ਕਨੈਕਟਿਵਿਟੀ ਮੁਹੱਈਆ ਕਰਵਾਉਂਦਾ ਹੈ।
 
ਹੁਣ ਵੀ ਯਕੀਨ ਨਹੀਂ ਕਿ ਕਿਹੜਾ ਚੁਣਨਾ ਹੈ?

### ਵਰਤੋਂ ਮਾਮਲੇ
 
ਆਓ ਕੁਝ ਆਮ ਵਰਤੋਂ ਮਾਮਲਿਆਂ ਦੇ ਜ਼ਰੀਏ ਤੁਹਾਡੀ ਮਦਦ ਕਰਦੇ ਹਾਂ:
 
> ਪ੍ਰ: ਮੈਂ ਉਤਪਾਦਨ ਲਈ ਏਆਈ ਏਜੰਟ ਐਪਲੀਕੇਸ਼ਨ ਬਣਾ ਰਿਹਾ ਹਾਂ ਅਤੇ ਤੇਜ਼ੀ ਨਾਲ ਸ਼ੁਰੂ ਕਰਨਾ ਚਾਹੁੰਦਾ ਹਾਂ
>

> ਜਵਾਬ: Microsoft Agent Framework ਇੱਕ ਵਧੀਆ ਚੋਣ ਹੈ। ਇਹ `FoundryChatClient` ਰਾਹੀਂ ਸਧਾਰਨ, Python ਵਰਗਾ API ਦਿੰਦਾ ਹੈ ਜੋ ਕਈ ਕਤਾਰਾਂ ਵਿੱਚ ਟੂਲਜ਼ ਅਤੇ ਹਦਾਇਤਾਂ ਵਾਲੇ ਏਜੰਟ ਪਰਿਭਾਸ਼ਿਤ ਕਰਨ ਦਿੰਦਾ ਹੈ।

> ਪ੍ਰ: ਮੈਨੂੰ Azure ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਜਿਵੇਂ ਕਿ Search ਅਤੇ ਕੋਡ ਐਗਜ਼ਿਕਿਊਸ਼ਨ ਨਾਲ ਇੰਟਰਪ੍ਰਾਈਜ਼-ਗਰੇਡ ਤੈਅ ਦੀ ਲੋੜ ਹੈ
>
> ਜਵਾਬ: Microsoft Foundry Agent Service ਸਭ ਤੋਂ ਵਧੀਆ ਫਿੱਟ ਹੈ। ਇਹ ਇੱਕ ਪਲੇਟਫਾਰਮ ਸੇਵਾ ਹੈ ਜੋ ਕਈ ਮਾਡਲਾਂ, Azure AI Search, Bing Search ਅਤੇ Azure Functions ਲਈ ਬਿਲਟ-ਇਨ ਸਮਰੱਥਾਵਾਂ ਮੁਹੱਈਆ ਕਰਵਾਉਂਦਾ ਹੈ। ਇਸ ਨਾਲ ਤੁਸੀਂ Foundry ਪੋਰਟਲ ਵਿੱਚ ਆਪਣੇ ਏਜੰਟ ਬਣਾ ਕੇ ਉਨ੍ਹਾਂ ਨੂੰ ਪੈਮਾਨੇ 'ਤੇ ਤੈਅ ਕਰਨਾ ਆਸਾਨ ਕਰ ਸਕਦੇ ਹੋ।
 
> ਪ੍ਰ: ਮੈਂ ਹੁਣ ਵੀ ਸੰਕੁਚਿਤ ਹਾਂ, ਸਿਰਫ਼ ਇੱਕ ਵਿਕਲਪ ਦਿਓ
>
> ਜਵਾਬ: Microsoft Agent Framework ਨਾਲ ਆਪਣੇ ਏਜੰਟ ਬਣਾਉਣ ਦਾ ਆਰੰਭ ਕਰੋ, ਅਤੇ ਜਦੋਂ ਤੁਹਾਨੂੰ ਉਨ੍ਹਾਂ ਨੂੰ ਉਤਪਾਦਨ ਵਿੱਚ ਤੈਅ ਅਤੇ ਸਕೇਲ ਕਰਨ ਦੀ ਲੋੜ ਹੋਵੇ, ਤਾਂ Microsoft Foundry Agent Service ਵਰਤੋਂ। ਇਸ ਤਰੀਕੇ ਨਾਲ ਤੁਸੀਂ ਆਪਣੇ ਏਜੰਟ ਤਰਕ 'ਤੇ ਤੇਜ਼ੀ ਨਾਲ ਦੁਹਰਾਉਣ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਇੰਟਰਪ੍ਰਾਈਜ਼ ਤੈਅ ਲਈ ਇੱਕ ਸਾਫ਼ ਰਸਤਾ ਵੀ ਰੱਖ ਸਕਦੇ ਹੋ।
 
ਆਓ ਮੁਖ ਅੰਤਰਾਂ ਨੂੰ ਇੱਕ ਟੇਬਲ ਵਿੱਚ ਸਾਰਾਂਸ਼ ਕਰੀਏ:

| ਫਰੇਮਵਰਕ | ਧਿਆਨ ਕੇਂਦਰ | ਮੁੱਖ ਤੱਤ | ਵਰਤੋਂ ਮਾਮਲੇ |
| --- | --- | --- | --- |
| Microsoft Agent Framework | ਟੂਲ ਕਾਲਿੰਗ ਨਾਲ ਸਧਾਰਨ ਏਜੰਟ SDK | ਏਜੰਟ, ਟੂਲਜ਼, Azure ਪਛਾਣ | ਏਆਈ ਏਜੰਟ ਬਣਾਉਣਾ, ਟੂਲ ਵਰਤਣਾ, ਬਹੁ-ਕਦਮ ਕਾਰਜ ਪ੍ਰਵਾਹ |
| Microsoft Foundry Agent Service | ਲਚਕੀਲੇ ਮਾਡਲ, ਇੰਟਰਪ੍ਰਾਈਜ਼ ਸੁਰੱਖਿਆ, ਕੋਡ ਜਨਰੇਸ਼ਨ, ਟੂਲ ਕਾਲਿੰਗ | ਮੌਡਿਊਲਰਿਟੀ, ਸਹਿਯੋਗ, ਪ੍ਰਕਿਰਿਆ ਸੰਗਠਨ | ਸੁਰੱਖਿਅਤ, ਪੈਮਾਨੇਯੋਗ ਅਤੇ ਲਚਕੀਲਾ ਏਆਈ ਏਜੰਟ ਤੈਅ |

## ਕੀ ਮੈਂ ਆਪਣੇ ਮੌਜੂਦਾ Azure ecosystem ਦੇ ਟੂਲਜ਼ ਨੂੰ ਸਿੱਧੇ ਇੰਟੀਗ੍ਰੇਟ ਕਰ ਸਕਦਾ ਹਾਂ ਜਾਂ ਮੈਨੂੰ ਖੁਦਮੁਖਤਾਰ ਹੱਲਾਂ ਦੀ ਲੋੜ ਹੈ?


ਜਵਾਬ ਹਾਂ ਹੈ, ਤੁਸੀਂ ਆਪਣੀਆਂ ਮੌਜੂਦਾ Azure ਪਾਰਿਸਥਿਤਿਕ ਤੰਤਰ ਦੇ ਸਾਧਨਾਂ ਨੂੰ ਸਿੱਧੇ Microsoft Foundry Agent Service ਨਾਲ ਜੋੜ ਸਕਦੇ ਹੋ, ਵਿਸ਼ੇਸ਼ ਤੌਰ 'ਤੇ, ਕਿਉਂਕਿ ਇਹਨਾਂ ਨੂੰ ਹੋਰ Azure ਸੇਵਾਵਾਂ ਨਾਲ ਬਿਨਾਂ ਕਿਸੇ ਰੁਕਾਵਟ ਦੇ ਕੰਮ ਕਰਨ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ। ਤੁਸੀਂ ਉਦਾਹਰਣ ਲਈ Bing, Azure AI Search, ਅਤੇ Azure Functions ਨੂੰ ਜੋੜ ਸਕਦੇ ਹੋ। Microsoft Foundry ਨਾਲ ਵੀ ਡੂੰਘਾ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਹੈ।  

Microsoft Agent Framework ਵੀ `FoundryChatClient` ਅਤੇ Azure ਪਛਾਣ ਰਾਹੀਂ Azure ਸੇਵਾਵਾਂ ਨਾਲ ਜੋੜਦਾ ਹੈ, ਜਿਹੜਾ ਤੁਹਾਨੂੰ ਆਪਣੇ ਏਜੰਟ ਸਾਧਨਾਂ ਵਿਚੋਂ ਸਿੱਧਾ Azure ਸੇਵਾਵਾਂ ਨੂੰ ਕਾਲ ਕਰਨ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ।  

## ਸੈਂਪਲ ਕੋਡ  

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)  
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)  
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)  

## ਕੀ ਤੁਹਾਡੇ ਕੋਲ AI Agent Frameworks ਬਾਰੇ ਹੋਰ ਸਵਾਲ ਹਨ?  

ਹੋਰ ਸਿੱਖਣ ਵਾਲਿਆਂ ਨਾਲ ਮਿਲਣ, ਆਫਿਸ ਘੰਟਿਆਂ ਵਿੱਚ ਸ਼ਾਮਿਲ ਹੋਣ ਅਤੇ ਆਪਣੇ AI Agents ਦੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) ਨਾਲ ਜੁੜੋ।  

## ਸੰਦਰਭ  

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>  
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>  
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>  

## ਪਹਿਲਾ ਪਾਠ  

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)  

## ਅੱਗਲਾ ਪਾਠ  

[Understanding Agentic Design Patterns](../03-agentic-design-patterns/README.md)  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->