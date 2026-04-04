[![Multi-Agent Design](../../../translated_images/pa/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(ਇਸ ਪਾਠ ਦੀ ਵੀਡੀਓ ਵੇਖਣ ਲਈ ਉਪਰ ਦਿੱਤੀ ਚਿੱਤਰ 'ਤੇ ਕਲਿੱਕ ਕਰੋ)_
# ਏਆਈ ਏਜੰਟਾਂ ਵਿੱਚ ਮੈਟਾਕੋਗਨੀਸ਼ਨ

## ਪਰਿਚਯ

ਏਆਈ ਏਜੰਟਾਂ ਵਿੱਚ ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਬਾਰੇ ਪਾਠ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ! ਇਹ ਅਧਿਆਯ ਸ਼ੁਰੂਆਤੀ ਲੋਕਾਂ ਲਈ ਹੈ ਜੋ ਜਾਨਨਾ ਚਾਹੁੰਦੇ ਹਨ ਕਿ ਏਆਈ ਏਜੰਟ ਆਪਣੇ ਸੋਚਣ ਦੇ ਪ੍ਰਕ੍ਰਿਆਵਾਂ ਬਾਰੇ ਕਿਵੇਂ ਸੋਚ ਸਕਦੇ ਹਨ। ਇਸ ਪਾਠ ਦੇ ਅੰਤ ਤੱਕ, ਤੁਸੀਂ ਮੁੱਖ ਧਾਰਣਾਵਾਂ ਨੂੰ ਸਮਝ ਜਾਵੋਗੇ ਅਤੇ ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਨੂੰ ਏਆਈ ਏਜੰਟ ਡਿਜ਼ਾਈਨ ਵਿੱਚ ਲਗੂ ਕਰਨ ਲਈ ਪ੍ਰਾਇਗਮਿਕ ਉਦਾਹਰਣਾਂ ਨਾਲ ਸਜਜਿਤ ਹੋਵੋਗੇ।

## ਸਿੱਖਣ ਦੇ ਲਕੜ

ਇਸ ਪਾਠ ਨੂੰ ਪੂਰਾ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ ਯੋਗ ਹੋਵੋਗੇ ਕਿ:

1. ਏਜੰਟ ਦੀ ਪਰਿਭਾਸ਼ਾ ਵਿੱਚ ਤਰਕ ਚੱਕਰਾਂ ਦੇ ਪ੍ਰਭਾਵਾਂ ਨੂੰ ਸਮਝੋ।
2. ਯੋਜਨਾ ਬਣਾਉਣ ਅਤੇ ਮੁਲਾਂਕਣ ਤਕਨੀਕਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਵੈ-ਸੰਸ਼ੋਧਨ ਵਾਲੇ ਏਜੰਟਾਂ ਦੀ ਮਦਦ ਕਰੋ।
3. ਆਪਣੇ ਆਪ ਦੇ ਏਜੰਟ ਬਣਾਓ ਜੋ ਕੰਮ ਪੂਰੇ ਕਰਨ ਲਈ ਕੋਡ ਨੂੰ ਸਮਰਥਨ ਦੇ ਸਕਣ।

## ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਦਾ ਪਰਿਚਿਯ

ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਉਹ ਉੱਚ-ਕ੍ਰਮ ਬੁੱਧੀ ਪ੍ਰਕਿਰਿਆਵਾਂ ਨੂੰ ਕਹਿੰਦੇ ਹਨ ਜੋ ਆਪਣੇ ਸੋਚਣ ਬਾਰੇ ਸੋਚਣ ਨਾਲ ਜੁੜੀਆਂ ਹੁੰਦੀਆਂ ਹਨ। ਏਆਈ ਏਜੰਟਾਂ ਲਈ, ਇਸਦਾ ਮਤਲਬ ਹੈ ਆਪਣੀਆਂ ਕਾਰਵਾਈਆਂ ਨੂੰ ਖੁਦ-ਜਾਗਰੂਕਤਾ ਅਤੇ ਪਿਛਲੇ ਤਜ਼ਰਬਿਆਂ ਅਧਾਰਿਤ ਮੁਲਾਂਕਣ ਅਤੇ ਸੁਰਖ਼ਿਆ ਕਰ ਸਕਣਾ। "ਸੋਚਣ ਬਾਰੇ ਸੋਚਣ" ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਧਾਰਣਾ ਹੈ ਜੋ ਏਜੰਟਿਕ ਏਆਈ ਸਿਸਟਮਾਂ ਦੀ ਵਿਕਾਸ ਵਿੱਚ ਵਰਤੀ ਜਾਂਦੀ ਹੈ। ਇਹ ਸਿਸਟਮਾਂ ਨੂੰ ਆਪਣੇ ਅੰਦਰੂਨੀ ਪ੍ਰਕਿਰਿਆਵਾਂ ਦੀ ਜਾਗਰੂਕਤਾ ਦੇਣ ਅਤੇ ਆਪਣੇ ਵਰਤਾਓ ਦੀ ਨਿਗਰਾਨੀ, ਨਿਯੰਤਰਣ ਅਤੇ ਅਨੁਕੂਲਣ ਕਰਨ ਯੋਗ ਬਣਾਉਂਦਾ ਹੈ। ਜਿਵੇਂ ਕਿ ਅਸੀਂ ਕਮਰੇ ਦੀ ਹਾਲਤ ਵਾਪਾਰਦੇ ਹਾਂ ਜਾਂ ਕਿਸੇ ਸਮੱਸਿਆ ਨੂੰ ਵੇਖਦੇ ਹਾਂ। ਇਹ ਖੁਦ-ਜਾਗਰੂਕਤਾ ਏਆਈ ਸਿਸਟਮਾਂ ਨੂੰ ਬਿਹਤਰ ਫੈਸਲੇ ਕਰਨ, ਗਲਤੀਆਂ ਪਛਾਣਨ, ਅਤੇ ਸਮੇਂ ਨਾਲ ਆਪਣਾ ਕਾਰਗੁਜ਼ਾਰੀ ਸੁਧਾਰਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੀ ਹੈ - ਜੋ ਕਿ ਟੂਰਿੰਗ ਟੈਸਟ ਅਤੇ ਇਸ ਗੱਲ ਤੇ ਚਰਚਾ ਨੂੰ ਫੇਰ ਤੋਂ ਜੋੜਦਾ ਹੈ ਕਿ ਕੀ ਏਆਈ ਸੰਸਾਰ 'ਤੇ ਕਬਜ਼ਾ ਕਰੇਗਾ।

ਏਜੰਟਿਕ ਏਆਈ ਸਿਸਟਮਾਂ ਦੇ ਸੰਦਰਭ ਵਿੱਚ, ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਕਈ ਚੁਣੌਤੀਆਂ ਦਾ ਹੱਲ ਕਰ ਸਕਦਾ ਹੈ, ਜਿਵੇਂ:
- ਪਾਰਦਰਸ਼ੀਤਾ: ਇਹ ਯਕੀਨੀ ਬਣਾਉਣਾ ਕਿ ਏਆਈ ਸਿਸਟਮ ਆਪਣੀ ਤਰਕ ਅਤੇ ਫੈਸਲਿਆਂ ਨੂੰ ਵਿਆਖਿਆ ਕਰ ਸਕਦੇ ਹਨ।
- ਤਰਕ: ਏਆਈ ਸਿਸਟਮਾਂ ਦੀ ਜਾਣਕਾਰੀ ਸਿੰਥੇਸਾਈਜ਼ ਕਰਨ ਅਤੇ ਸੰਤੁਲਿਤ ਫੈਸਲੇ ਕਰਨ ਯੋਗਤਾ ਨੂੰ ਵਧਾਉਣਾ।
- ਅਨੁਕੂਲਨ: ਏਆਈ ਸਿਸਟਮਾਂ ਨੂੰ ਨਵੀਂ ਪਰਿਸਥਿਤੀਆਂ ਅਤੇ ਬਦਲਦੇ ਹਾਲਾਤਾਂ ਵਿੱਚ ਅਨੁਕੂਲ ਹੋਣ ਦੇਣਾ।
- ਧਾਰਨਾ: ਆਪਣੇ ਵਾਤਾਵਰਣ ਤੋਂ ਡੇਟਾ ਨੂੰ ਪਛਾਣਨ ਅਤੇ ਵਿਭਾਜਨ ਕਰਨ ਵਿੱਚ ਏਆਈ ਸਿਸਟਮਾਂ ਦੀ ਸਹੀਅਤ ਸੁਧਾਰਨਾ।

### ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਕੀ ਹੈ?

ਮੈਟਾਕੋਗਨੀਸ਼ਨ, ਜਾਂ "ਸੋਚਣ ਬਾਰੇ ਸੋਚਣਾ," ਇੱਕ ਉੱਚ-ਕਮਰ ਦੀ ਬੁੱਧੀ ਪ੍ਰਕਿਰਿਆ ਹੈ ਜੋ ਆਪਣੇ ਸੰਵੇਦਨਸ਼ੀਲਤਾ ਅਤੇ ਆਪਣੇ ਸੋਚਣ ਦੀ ਪ੍ਰਕਿਰਿਆਵਾਂ ਦੀ ਨਿਯੰਤਰਣ ਨਾਲ ਜੁੜੀ ਹੁੰਦੀ ਹੈ। ਏਆਈ ਖੇਤਰ ਵਿੱਚ, ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਏਜੰਟਾਂ ਨੂੰ ਆਪਣੀਆਂ ਰਣਨੀਤੀਆਂ ਅਤੇ ਕਦਮਾਂ ਦਾ ਮੁਲਾਂਕਣ ਅਤੇ ਅਨੁਕੂਲ ਕਰਨ ਦੇ ਯੋਗ ਬਣਾਉਣ ਵਾਲੀ ਸਾਮਰੱਥਾ ਦਿੰਦੀ ਹੈ, ਜੋ ਸਮੱਸਿਆ ਸੁਲਝਾਉਣ ਅਤੇ ਫੈਸਲਾ ਕਰਨ ਦੀ ਸਮਰਥਾ ਵਿੱਚ ਸੁਧਾਰ ਕਰਦੀ ਹੈ। ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਨੂੰ ਸਮਝ ਕੇ, ਤੁਸੀਂ ਏਹੋ ਜਿਹੇ ਏਆਈ ਏਜੰਟ ਡਿਜ਼ਾਈਨ ਕਰ ਸਕਦੇ ਹੋ ਜੋ ਨਾਂ ਕੇਵਲ ਹੋਰ ਬੁੱਧੀਮਾਨ ਹੋਣਗੇ, ਸਗੋਂ ਹੋਰ ਲਚਕੀਲੇ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਵੀ ਹੋਣਗੇ। ਸੱਚੀ ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਵਿੱਚ, ਤੁਸੀਂ ਦੇਖੋਗੇ ਕਿ ਏਆਈ ਆਪਣੇ ਤਰਕ ਬਾਰੇ ਖੁਲ੍ਹ ਕੇ ਸੋਚ ਰਿਹਾ ਹੈ।

ਉਦਾਹਰਣ: "ਮੈਂ ਸਸਤੇ ਦੌੜਾਂ ਨੂੰ ਤਰਜੀਹ ਦਿੱਤੀ ਕਿਉਂਕਿ... ਮੈਂ ਸਿੱਧੇ ਦੌੜਾਂ ਤੋਂ ਵਾਂਝਾ ਰਹਿ ਸਕਦਾ ਹਾਂ, ਇਸ ਲਈ ਮੈਂ ਫਿਰ ਜਾਂਚ ਕਰਦਾ ਹਾਂ।"
ਕਿਸ ਰਾਹ ਨੂੰ ਕਿਉਂ ਚੁਣਿਆ ਇਸਦਾ ਟ੍ਰੈਕ ਰੱਖਣਾ।
- ਧਿਆਨ ਦੇਣਾ ਕਿ ਗਲਤੀਆਂ ਕੀਤੀਆਂ ਗਈਆਂ ਕਿਉਂਕਿ ਇਸਨੇ ਪਿਛਲੇ ਵਾਰੀ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਤੇ ਜ਼ਿਆਦਾ ਨਿਰਭਰ ਕੀਤਾ, ਇਸ ਲਈ ਇਹ ਆਪਣੀ ਫੈਸਲਾ-ਬਣਾਉਣ ਵਾਲੀ ਰਣਨੀਤੀ ਵਿੱਚ ਸਿਰਫ ਅੰਤਿਮ ਰਿਕਮੈਂਡੇਸ਼ਨ ਨਹੀਂ ਬਦਲਦਾ।
- ਪੈਟਰਨ ਦੀ ਪਛਾਣ ਕਰਨੀ ਜਿਵੇਂ ਕਿ, "ਜਦੋਂ ਵੀ ਮੈਂ ਯੂਜ਼ਰ ਨੂੰ ‘ਬਹੁਤ ਭੀੜ’ ਕਹਿੰਦਾ ਵੇਖਾਂ, ਮੈਂ ਸਿਰਫ ਕੁਝ ਆਕਰਸ਼ਣ ਬਦਲ ਕੇ ਨਹੀਂ ਬਲਕਿ ਇਹ ਵੀ ਸੋਚਣਾ ਚਾਹੀਦਾ ਕਿ ਮੇਰੀ 'ਟਾਪ ਆਕਰਸ਼ਣਾਂ' ਚੁਣਨ ਦੀ ਵਿਧੀ ਗਲਤ ਹੈ ਜੇ ਮੈਂ ਹਰ ਵਾਰ ਲੋਕਪ੍ਰਿਯਤਾ ਦੇ ਆਧਾਰ 'ਤੇ ਰੈਂਕ ਕਰਦਾ ਹਾਂ।"

### ਐਆਈ ਏਜੰਟਾਂ ਵਿੱਚ ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਦੀ ਮਹੱਤਤਾ

ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਏਆਈ ਏਜੰਟ ਡਿਜ਼ਾਈਨ ਵਿੱਚ ਕਈ ਕਾਰਨਾਂ ਕਰਕੇ ਅਹੰਕਾਰ ਰੱਖਦੀ ਹੈ:

![Importance of Metacognition](../../../translated_images/pa/importance-of-metacognition.b381afe9aae352f7.webp)

- ਖੁਦ-ਬੋঝ: ਏਜੰਟ ਆਪਣੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦਾ ਮੁਲਾਂਕਣ ਕਰ ਸਕਦੇ ਹਨ ਅਤੇ ਸੁਧਾਰ ਲਈ ਖੇਤਰ ਪਛਾਣ ਸਕਦੇ ਹਨ।
- ਅਨੁਕੂਲਤਾ: ਪਿਛਲੇ ਤਜ਼ਰਬਿਆਂ ਅਤੇ ਬਦਲਦੇ ਵਾਤਾਵਰਣਾਂ ਦੇ ਆਧਾਰ ਤੇ ਆਪਣੀਆਂ ਰਣਨੀਤੀਆਂ ਬਦਲ ਸਕਦੇ ਹਨ।
- ਗਲਤੀ ਸਹੀ ਕਰਨ: ਏਜੰਟ ਖੁਦਮੁਖਤਿਆਰ ਤੌਰ 'ਤੇ ਗਲਤੀਆਂ ਪਛਾਣ ਅਤੇ ਠੀਕ ਕਰ ਸਕਦੇ ਹਨ, ਜਿਸ ਨਾਲ ਨਤੀਜੇ ਜ਼ਿਆਦਾ ਸਹੀ ਹੁੰਦੇ ਹਨ।
- ਸਾਧਨ ਪ੍ਰਬੰਧਨ: ਏਜੰਟ ਸਮੇਂ ਅਤੇ ਗਣਨਾਤਮਕ ਸ਼ਕਤੀ ਵਰਗੇ ਸਾਧਨਾਂ ਦਾ ਬਿਹਤਰ ਉਪਯੋਗ ਕਰਨ ਲਈ ਆਪਣੇ ਕਾਰਜਾਂ ਦੀ ਯੋਜਨਾ ਅਤੇ ਮੁਲਾਂਕਣ ਕਰ ਸਕਦੇ ਹਨ।

## ਏਆਈ ਏਜੰਟ ਦੇ ਹਿੱਸੇ

ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਪ੍ਰਭਿਆਵਾਂ ਵਿੱਚ ਡੁਬਕੀ ਲਗਾਉਣ ਤੋਂ ਪਹਿਲਾਂ, ਏਆਈ ਏਜੰਟ ਦੇ ਮੂਲ ਹਿੱਸਿਆਂ ਨੂੰ ਸਮਝਣਾ ਜਰੂਰੀ ਹੈ। ਇੱਕ ਏਆਈ ਏਜੰਟ ਆਮ ਤੌਰ 'ਤੇ ਇਹਨਾਂ ਹਿੱਸਿਆਂ ਵਿੱਚੋਂ ਬਣਿਆ ਹੁੰਦਾ ਹੈ:

- ਪੁਰਸੋਨਾ: ਏਜੰਟ ਦੀ ਸੁਭਾਵ ਅਤੇ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਜੋ ਇਹ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦੀਆਂ ਹਨ ਕਿ ਇਹ ਯੂਜ਼ਰ ਨਾਲ ਕਿਵੇਂ ਇੰਟਰਐਕਟ ਕਰਦਾ ਹੈ।
- ਟੂਲ: ਉਹ ਯੋਗਤਾਵਾਂ ਅਤੇ ਫੰਕਸ਼ਨ ਜਿਹੜੇ ਏਜੰਟ ਕਰ ਸਕਦਾ ਹੈ।
- ਹੁਨਰ: ਉਹ ਗਿਆਨ ਅਤੇ ਮਾਹਰਤਾ ਜੋ ਏਜੰਟ ਕੋਲ ਹੁੰਦੀ ਹੈ।

ਇਹ ਹਿੱਸੇ ਇਕੱਠੇ ਮਿਲ ਕੇ ਇੱਕ "ਮਾਹਿਰਾਈ ਇਕਾਈ" ਬਣਾਉਂਦੇ ਹਨ ਜੋ ਵਿਸ਼ੇਸ਼ ਕਾਰਜਾਂ ਨੂੰ ਕਰਨ ਯੋਗ ਹੋਵੇ।

**ਉਦਾਹਰਣ**:
ਇੱਕ ਟ੍ਰੈਵਲ ਏਜੰਟ ਬਾਰੇ ਸੋਚੋ, ਜੋ ਸਿਰਫ ਤੁਹਾਡੀ ਛੁੱਟੀਆਂ ਦੀ ਯੋਜਨਾ ਨਹੀਂ ਬਣਾਉਂਦਾ ਸਗੋਂ ਅਸਲ-ਸਮੇਂ ਦੇ ਡੇਟਾ ਅਤੇ ਪਿਛਲੇ ਗਾਹਕਾਂ ਦੇ ਤਜ਼ਰਬਿਆਂ ਦੀ ਆਧਾਰ ‘ਤੇ ਆਪਣਾ ਰਾਸ਼ਤਾ ਬਦਲਦਾ ਹੈ।

### ਉਦਾਹਰਣ: ਟ੍ਰੈਵਲ ਏਜੰਟ ਸੇਵਾ ਵਿੱਚ ਮੈਟਾਕੋਗਨੀਸ਼ਨ

ਕਲਪਨਾ ਕਰੋ ਕਿ ਤੁਸੀਂ ਏਆਈ ਦੁਆਰਾ ਚਲਾਇਆ ਜਾ ਰਿਹਾ ਟ੍ਰੈਵਲ ਏਜੰਟ ਸੇਵਾ ਤਿਆਰ ਕਰ ਰਹੇ ਹੋ। ਇਹ ਏਜੰਟ, "ਟ੍ਰੈਵਲ ਏਜੰਟ," ਯੂਜ਼ਰਾਂ ਦੀਆਂ ਛੁੱਟੀਆਂ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ। ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਨੂੰ ਸ਼ਾਮਲ ਕਰਨ ਲਈ, ਟ੍ਰੈਵਲ ਏਜੰਟ ਨੂੰ ਆਪਣੇ ਕਦਮਾਂ ਨੂੰ ਖੁਦ-ਜਾਗਰੂਕਤਾ ਅਤੇ ਪਿਛਲੇ ਤਜ਼ਰਬਿਆਂ ਦੇ ਆਧਾਰ ਤੇ ਮੁਲਾਂਕਣ ਅਤੇ ਸੁਧਾਰ ਕਰਨ ਦੀ ਲੋੜ ਹੈ। ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਇਸ ਤਰ੍ਹਾਂ ਮਦਦਗਾਰ ਹੋ ਸਕਦੀ ਹੈ:

#### ਮੌਜੂਦਾ ਕੰਮ

ਮੌਜੂਦਾ ਕੰਮ ਇੱਕ ਯੂਜ਼ਰ ਦੀ ਮਦਦ ਕਰਨਾ ਹੈ ਜੋ ਪੈਰਿਸ ਜਾਣ ਦੀ ਯੋਜਨਾ ਬਣਾਉਂਦਾ ਹੈ।

#### ਕੰਮ ਪੂਰਾ ਕਰਨ ਲਈ ਕਦਮ

1. **ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਇਕੱਠਾ ਕਰੋ**: ਯੂਜ਼ਰ ਨੂੰ ਇਸਦੀ ਯਾਤਰਾ ਦੀਆਂ ਤਾਰੀਖਾਂ, ਬਜਟ, ਦਿਲਚਸਪੀ (ਜਿਵੇਂ ਕਿ ਮਿਊਜ਼ੀਅਮ, ਭੋਜਨ, ਖਰੀਦਦਾਰੀ) ਅਤੇ ਕੋਈ ਵਿਸ਼ੇਸ਼ ਮੰਗਾਂ ਬਾਰੇ ਪੁੱਛੋ।
2. **ਸੂਚਨਾ ਪ੍ਰਾਪਤ ਕਰੋ**: ਉਡਾਣਾਂ, ਠਹਿਰਣ ਦੇ ਸਥਾਨਾਂ, ਆਕਰਸ਼ਣਾਂ ਅਤੇ ਰੈਸਟੋਰੈਂਟਾਂ ਦੀ ਭਾਲ ਕਰੋ ਜੋ ਯੂਜ਼ਰ ਦੀਆਂ ਪਸੰਦਾਂ ਨਾਲ ਮਿਲਦੇ ਹਨ।
3. **ਸਿਫਾਰਸ਼ਾਂ ਤਿਆਰ ਕਰੋ**: ਇੱਕ ਨਿੱਜੀ ਤਹਿ ਕੀਤੀ ਯਾਤਰਾ ਸੂਚੀ ਵਜੋਂ ਉਡਾਣਾਂ ਦੇ ਵੇਰਵੇ, ਹੋਟਲ ਦੀਆਂ ਬੁੱਕਿੰਗਾਂ ਅਤੇ ਸੁਝਾਏ ਗਏ ਗਤੀਵਿਧੀਆਂ ਦੇ ਨਾਲ ਪ੍ਰਦਾਨ ਕਰੋ।
4. **ਫੀਡਬੈਕ ਅਧਾਰਿਤ ਸੁਧਾਰ ਕਰੋ**: ਯੂਜ਼ਰ ਤੋਂ ਸਿਫਾਰਸ਼ਾਂ ਬਾਰੇ ਫੀਡਬੈਕ ਲਵੋ ਅਤੇ ਜ਼ਰੂਰੀ ਬਦਲਾਅ ਕਰੋ।

#### ਲੋੜੀਂਦੇ ਸਾਧਨ

- ਉਡਾਣਾਂ ਅਤੇ ਹੋਟਲ ਬੁਕਿੰਗ ਡੇਟਾਬੇਸਾਂ ਤੱਕ ਪਹੁੰਚ।
- ਪੈਰਿਸ ਦੇ ਆਕਰਸ਼ਣਾਂ ਅਤੇ ਰੈਸਟੋਰੈਂਟਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ।
- ਪਿਛਲੇ ਸੰਬੰਧਾਂ ਤੋਂ ਯੂਜ਼ਰ ਫੀਡਬੈਕ ਡੇਟਾ।

#### ਤਜ਼ਰਬਾ ਅਤੇ ਖ਼ੁਦ-ਬੋਝ

ਟ੍ਰੈਵਲ ਏਜੰਟ ਆਪਣੇ ਕਾਰਜ ਨੂੰ ਮੁਲਾਂਕਣ ਕਰਨ ਅਤੇ ਪਿਛਲੇ ਤਜ਼ਰਬਿਆਂ ਤੋਂ ਸਿੱਖਣ ਲਈ ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ। ਉਦਾਹਰਣ ਵਜੋਂ:

1. **ਯੂਜ਼ਰ ਫੀਡਬੈਕ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ**: ਟ੍ਰੈਵਲ ਏਜੰਟ ਯੂਜ਼ਰ ਫੀਡਬੈਕ ਨੂੰ ਦੇਖਦਾ ਹੈ ਕਿ ਕਿਹੜੀਆਂ ਸਿਫਾਰਸ਼ਾਂ ਚੰਗੀਆਂ ਰਹੀਆਂ ਅਤੇ ਕਿਹੜੀਆਂ ਨਹੀਂ, ਅਤੇ ਆਪਣੇ ਆਉਣ ਵਾਲੇ ਸੁਝਾਅ ਨੂੰ ਢਾਲਦਾ ਹੈ।
2. **ਅਨੁਕੂਲਤਾ**: ਜੇ ਯੂਜ਼ਰ ਪਹਿਲਾਂ ਕਿਸੇ ਭੀੜ ਭਰੇ ਸਥਾਨ ਦਾ ਨاپਸੰਦ ਕਰਦਾ ਹੈ, ਟ੍ਰੈਵਲ ਏਜੰਟ ਭਵਿੱਖ ਵਿੱਚ ਜ਼ਿਆਦਾ ਪਰਸਿੱਧ ਸੈਲਾਨੀ ਸਥਾਨਾਂ ਦੇ ਸੁਝਾਅ ਤੋਂ ਬਚੇਗਾ।
3. **ਗਲਤੀ ਸਹੀ ਕਰਨ**: ਜੇ ਉਨ੍ਹਾਂ ਨੇ ਪਿਛਲੇ ਬੁਕਿੰਗ ਵਿੱਚ ਹੋਟਲ ਬਾਰੇ ਗਲਤੀ ਕੀਤੀ ਹੋਵੇ, ਜਿਵੇਂ ਕਿ ਚੁਣਿਆ ਗਿਆ ਹੋਟਲ ਪਹਿਲਾਂ ਹੀ ਫੁੱਲ ਬੁਕ ਹੋ ਚੁੱਕਾ ਸੀ, ਤਾਂ ਉਹ ਬੁਕਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਮਿਲਣਯੋਗਤਾ ਨੂੰ ਗੰਭੀਰਤਾ ਨਾਲ ਜਾਂਚਣ ਲਈ ਸਿੱਖਦਾ ਹੈ।

#### ਵਰਤਮਾਨ ਵਿਕਾਸਕ ਦੀ ਉਦਾਹਰਣ

ਇੱਥੇ ਇੱਕ ਸਧਾਰਦੀ ਉਦਾਹਰਣ ਹੈ ਜਿੱਥੇ ਟ੍ਰੈਵਲ ਏਜੰਟਾਂ ਦਾ ਕੋਡ ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਸ਼ਾਮਲ ਕਰਦਿਆਂ ਕਿਵੇਂ ਦਿਖ ਸਕਦਾ ਹੈ:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # ਪਸੰਦਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਉਡਾਣਾਂ, ਹੋਟਲਾਂ ਅਤੇ ਆਕਰਸ਼ਣਾਂ ਦੀ ਖੋਜ ਕਰੋ
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        # ਪ੍ਰਤੀਕ੍ਰਿਆ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ ਅਤੇ ਭਵਿੱਖ ਦੇ ਸੁਝਾਅ ਸਮਾਇਕ ਕਰੋ
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# ਉਦਾਹਰਨ ਲਈ ਵਰਤੋਂ
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

#### ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਕਿਉਂ ਮਹੱਤਵਪੂਰਨ ਹੈ

- **ਖੁਦ-ਬੋਝ**: ਏਜੰਟ ਆਪਣੀ ਪ੍ਰਦਰਸ਼ਨ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਸਕਦੇ ਹਨ ਅਤੇ ਸੁਧਾਰ ਛੇਤਰਾਂ ਪਛਾਣ ਸਕਦੇ ਹਨ।
- **ਅਨੁਕੂਲਤਾ**: ਏਜੰਟ ਫੀਡਬੈਕ ਅਤੇ ਬਦਲਦੇ ਹਾਲਾਤ ਅਨੁਸਾਰ ਰਣਨੀਤੀਆਂ ਵਿੱਚ ਤਬਦੀਲੀ ਕਰ ਸਕਦੇ ਹਨ।
- **ਗਲਤੀ ਸਹੀ ਕਰਨ**: ਏਜੰਟ ਖੁਦਮੁਖਤਿਆਰ ਤੌਰ ‘ਤੇ ਗਲਤੀਆਂ ਪਛਾਣ ਅਤੇ ਠੀਕ ਕਰ ਸਕਦੇ ਹਨ।
- **ਸਾਧਨ ਪ੍ਰਬੰਧਨ**: ਏਜੰਟ ਸਮਾਂ ਅਤੇ ਗਣਨਾਤਮਕ ਸ਼ਕਤੀ ਵਰਗੀਆਂ ਵਸਤਾਂ ਦਾ ਸੁਧਾਰਤੂਰੀ ਢੰਗ ਨਾਲ ਯੋਜਨਾ ਅਤੇ ਮੁਲਾਂਕਣ ਕਰ ਸਕਦੇ ਹਨ।

ਮੈਟਾਕੋਗਨੀਸ਼ਨ ਸ਼ਾਮਲ ਕਰਨ ਨਾਲ, ਟ੍ਰੈਵਲ ਏਜੰਟ ਹੋਰ ਨਿੱਜੀਕਰਨ ਅਤੇ ਸਹੀ ਯਾਤਰਾ ਸੁਝਾਅ ਪ੍ਰਦਾਨ ਕਰ ਸਕਦਾ ਹੈ, ਜੋ ਯੂਜ਼ਰ ਦੇ ਤਜ਼ਰਬੇ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਂਦਾ ਹੈ।

---

## 2. ਏਜੰਟਾਂ ਵਿੱਚ ਯੋਜਨਾ ਬਣਾਉਣਾ

ਯੋਜਨਾ ਬਣਾਉਣਾ ਏਆਈ ਏਜੰਟ ਦੇ ਵਰਤਾਵ ਦਾ ਇਕ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਸ ਵਿੱਚ ਕਿਸੇ ਲਕੜ ਨੂੰ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਜ਼ਰੂਰੀ ਕਦਮਾਂ ਦਾ ਰੂਪ-ਰੇਖਾ ਤਿਆਰ ਕਰਨਾ ਸ਼ਾਮਲ ਹੈ, ਜਿਸ ਵਿੱਚ ਮੌਜੂਦਾ ਹਾਲਤ, ਸਾਧਨ ਅਤੇ ਸੰਭਾਵਿਤ ਰੁਕਾਵਟਾਂ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖਿਆ ਜਾਂਦਾ ਹੈ।

### ਯੋਜਨਾ ਬਣਾਉਣ ਦੇ ਤੱਤ

- **ਵਰਤਮਾਨ ਕੰਮ**: ਕੰਮ ਨੂੰ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਵਿਆਖਿਆ ਕਰੋ।
- **ਕੰਮ ਪੂਰਾ ਕਰਨ ਵਾਲੇ ਕਦਮ**: ਕੰਮ ਨੂੰ ਸੰਭਾਲਣਯੋਗ ਕਦਮਾਂ ਵਿੱਚ ਵੰਡੋ।
- **ਲੋੜੀਂਦੇ ਸਾਧਨ**: ਜ਼ਰੂਰੀ ਸਾਧਨਾਂ ਦੀ ਪਹਚਾਣ ਕਰੋ।
- **ਤਜ਼ਰਬਾ**: ਯੋਜਨਾ ਬਣਾਉਣ ਵਿੱਚ ਪਿਛਲੇ ਤਜ਼ਰਬਿਆਂ ਤੋਂ ਸਹਾਇਤਾ ਲਓ।

**ਉਦਾਹਰਣ**:
ਇੱਥੇ ਹਨ ਉਸ ਕੰਮ ਦੇ ਕਦਮ ਜਿਹੜੇ ਟ੍ਰੈਵਲ ਏਜੰਟ ਨੂੰ ਯੂਜ਼ਰ ਦੀ ਯਾਤਰਾ ਦੀ ਯੋਜਨਾ ਬਨਾਉਣ ਵਿੱਚ ਲੈਣੇ ਹੋਣਗੇ:

### ਟ੍ਰੈਵਲ ਏਜੰਟ ਲਈ ਕਦਮ

1. **ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਇਕੱਠਾ ਕਰੋ**
   - ਯੂਜ਼ਰ ਤੋਂ ਆਪਣੀਆਂ ਯਾਤਰਾ ਤਾਰੀਖਾਂ, ਬਜਟ, ਦਿਲਚਸਪੀਆਂ ਅਤੇ ਕੋਈ ਵਿਸ਼ੇਸ਼ ਜ਼ਰੂਰਤਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਲਵੋ।
   - ਉਦਾਹਰਣ: "ਤੁਸੀਂ ਕਦੋਂ ਯਾਤਰਾ ਕਰਨ ਦਾ ਯੋਜਨਾ ਬਣਾਈ ਹੈ?" "ਤੁਹਾਡਾ ਬਜਟ ਕਿੰਨਾ ਹੈ?" "ਤੁਸੀਂ ਛੁੱਟੀਆਂ ਵਿੱਚ ਕਿਹੜੀਆਂ ਗਤੀਵਿਧੀਆਂ ਪਸੰਦ ਕਰਦੇ ਹੋ?"

2. **ਸੂਚਨਾ ਇਕੱਠਾ ਕਰੋ**
   - ਯੂਜ਼ਰ ਦੀਆਂ ਪਸੰਦਾਂ ਦੇ ਨਾਲ ਸਬੰਧਿਤ ਯਾਤਰਾ ਵਿਕਲਪਾਂ ਦੀ ਖੋਜ ਕਰੋ।
   - **ਉਡਾਣਾਂ**: ਯੂਜ਼ਰ ਦੇ ਬਜਟ ਅਤੇ ਪਸੰਦੀਦਾ ਯਾਤਰਾ ਤਾਰੀਖਾਂ ਅੰਦਰ ਉਪਲਬਧ ਉਡਾਣਾਂ ਲੱਭੋ।
   - **ਠਹਿਰਣ ਦੀ ਥਾਂ**: ਹੋਟਲਾਂ ਜਾਂ ਕਿਰਾਏ ਦੀਆਂ ਜਾਇਦਾਦਾਂ ਦੀ ਖੋਜ ਕਰੋ ਜੋ ਸਥਾਨ, ਕਿੰਮਤ ਅਤੇ ਸੁਵਿਧਾਵਾਂ ਵਿੱਚ ਯੂਜ਼ਰ ਦੀ ਪਸੰਦਾਂ ਨਾਲ ਮੇਲ ਖਾਂਦੀਆਂ ਹੋਣ।
   - **ਆਕਰਸ਼ਣ ਅਤੇ ਰੈਸਟੋਰੈਂਟ**: ਜਿਹੜੇ ਆਕਰਸ਼ਣ, ਗਤੀਵਿਧੀਆਂ ਅਤੇ ਖਾਣ-ਪੀਣ ਦੇ ਵਿਕਲਪ ਯੂਜ਼ਰ ਦੀ ਦਿਲਚਸਪੀ ਦੇ ਅਨੁਕੂਲ ਹੋਣ, ਉਨ੍ਹਾਂ ਦੀ ਪਛਾਣ ਕਰੋ।

3. **ਸਿਫਾਰਸ਼ਾਂ ਤਿਆਰ ਕਰੋ**
   - ਇਕ ਵਿਅਕਤੀਗਤ ਯਾਤਰਾ-ਸੂਚੀ ਤਿਆਰ ਕਰਨ ਲਈ ਜ਼ਰੂਰੀ ਜਾਣਕਾਰੀ ਨੂੰ ਇਕੱਠਾ ਕਰੋ।
   - ਯੂਜ਼ਰ ਦੀਆਂ ਪਸੰਦਾਂ ਦੇ ਸੀਧੇ ਨਿੱਜੀਕਰਨ ਨਾਲ ਉਡਾਣਾਂ ਦੇ ਵਿਕਲਪ, ਹੋਟਲ ਰਿਜ਼ਰਵੇਸ਼ਨ ਅਤੇ ਸਿਝਾਏ ਗਏ ਗਤੀਵਿਧੀਆਂ ਦੇ ਵੇਰਵੇ ਦੇਵੋ।

4. **ਯੂਜ਼ਰ ਨੂੰ ਯਾਤਰਾ-ਸੂਚੀ ਦਿਖਾਓ**
   - ਯੂਜ਼ਰ ਨੂੰ ਪ੍ਰਸਤਾਵਿਤ ਯਾਤਰਾ-ਸੂਚੀ ਬਾਰੇ ਉਸਦਾ ਜਾਇਜ਼ਾ ਲੈਣ ਲਈ ਦਿਓ।
   - ਉਦਾਹਰਣ: "ਇਹ ਤੁਹਾਡੀ ਪੈਰਿਸ ਯਾਤਰਾ ਲਈ ਇੱਕ ਸੁਝਾਅਤ ਯਾਤਰਾ ਸੂਚੀ ਹੈ। ਇਸ ਵਿੱਚ ਉਡਾਣ ਦੀ ਜਾਣਕਾਰੀ, ਹੋਟਲ ਬੁਕਿੰਗ ਅਤੇ ਸਿਝਾਏ ਗਏ ਗਤੀਵਿਧੀਆਂ ਅਤੇ ਰੈਸਟੋਰੈਂਟਾਂ ਦੀ ਸੂਚੀ ਸ਼ਾਮਲ ਹੈ। ਤੁਹਾਡੇ ਵਿਚਾਰ ਦੱਸੋ!"

5. **ਫੀਡਬੈਕ ਇਕੱਠਾ ਕਰੋ**
   - ਯੂਜ਼ਰ ਤੋਂ ਪ੍ਰਸਤਾਵਿਤ ਯਾਤਰਾ-ਸੂਚੀ 'ਤੇ ਫੀਡਬੈਕ ਲਵੋ।
   - ਉਦਾਹਰਣ: "ਕੀ ਤੁਹਾਨੂੰ ਉਡਾਣ ਦੇ ਵਿਕਲਪ ਪਸੰਦ ਹਨ?" "ਕੀ ਹੋਟਲ ਤੁਹਾਡੀ ਜ਼ਰੂਰਤਾਂ ਲਈ ਉਚਿਤ ਹੈ?" "ਤੁਹਾਨੂੰ ਕੋਈ ਗਤੀਵਿਧੀਆਂ ਜੋੜਨ ਜਾਂ ਹਟਾਉਣੀਆਂ ਹਨ?"

6. **ਫੀਡਬੈਕ ਅਨੁਸਾਰ ਸੁਧਾਰ ਕਰੋ**
   - ਯੂਜ਼ਰ ਦੇ ਫੀਡਬੈਕ ਅਨੁਸਾਰ ਯਾਤਰਾ-ਸੂਚੀ ਵਿੱਚ ਤਬਦੀਲੀ ਕਰੋ।
   - ਉਡਾਣ, ਠਹਿਰਣ ਤੇ ਗਤੀਵਿਧੀਆਂ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ ਨੂੰ ਬਿਹਤਰ ਕਰਨ ਲਈ ਜ਼ਰੂਰੀ ਬਦਲਾਅ ਕਰੋ।

7. **ਆਖਰੀ ਪੁਸ਼ਟੀ**
   - ਬਦਲੀ ਹੋਈ ਯਾਤਰਾ-ਸੂਚੀ ਨੂੰ ਯੂਜ਼ਰ ਨੂੰ ਆਖਰੀ ਪੁਸ਼ਟੀ ਲਈ ਦਿਖਾਓ।
   - ਉਦਾਹਰਣ: "ਮੈਂ ਤੁਹਾਡੇ ਫੀਡਬੈਕ ਅਨੁਸਾਰ ਬਦਲਾਅ ਕੀਤੇ ਹਨ। ਇਹ ਅੱਪਡੇਟ ਕੀਤੀ ਯਾਤਰਾ ਸੂਚੀ ਹੈ। ਸਾਰਾ ਕੁਝ ਠੀਕ ਲੱਗਦਾ ਹੈ?"

8. **ਬੁਕਿੰਗ ਅਤੇ ਪੁਸ਼ਟੀ ਕਰੋ**
   - ਜਦ ਯੂਜ਼ਰ ਯਾਤਰਾ-ਸੂਚੀ ਦੀ ਮਨਜ਼ੂਰੀ ਦੇਵੇ, ਉਹ ਉਡਾਣਾਂ, ਠਹਿਰਣ ਅਤੇ ਪਹਿਲਾਂ ਤੋਂ ਯੋਜਿਤ ਗਤੀਵਿਧੀਆਂ ਦੀ ਬੁਕਿੰਗ ਕਰੋ।
   - ਯੂਜ਼ਰ ਨੂੰ ਪੁਸ਼ਟੀ ਦੇ ਵੇਰਵੇ ਭੇਜੋ।

9. **ਚੱਲ ਰਹੀ ਮਦਦ ਪ੍ਰਦਾਨ ਕਰੋ**
   - ਯਾਤਰਾ ਦੇ ਦੌਰਾਨ ਅਤੇ ਪਹਿਲਾਂ ਕਿਸੇ ਵੀ ਬਦਲਾਵ ਜਾਂ ਵਾਧੂ ਮੰਗ ਲਈ ਯੂਜ਼ਰ ਦੀ ਸਹਾਇਤਾ ਲਈ ਉਪਲਬਧ ਰਹੋ।
   - ਉਦਾਹਰਣ: "ਜੇ ਤੁਸੀਂ ਯਾਤਰਾ ਦੌਰਾਨ ਹੋਰ ਕੋਈ ਸਹਾਇਤਾ ਲੋੜੀਂਦੇ ਹੋ ਤਾਂ ਕਿਸੇ ਵੀ ਸਮੇਂ ਮੇਰੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ!"

### ਉਦਾਹਰਣ ਸਾਂਝੇਦਾਰੀ

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# ਬੂਇੰਗ ਬੀਨਤੀ ਦੇ ਅੰਦਰ ਉਦਾਹਰਣ ਵਰਤੋਂ
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

## 3. ਸਹੀ ਕਰਨ ਵਾਲਾ RAG ਪ੍ਰਣਾਲੀ

ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਚਲੋ ਸਮਝਦੇ ਹਾਂ ਕਿ RAG ਟੂਲ ਅਤੇ ਪ੍ਰੀ-ਐਮਟਿਵ ਕਾਂਟੈਕਸਟ ਲੋਡ ਵਿੱਚ ਕੀ ਫਰਕ ਹੈ।

![RAG vs Context Loading](../../../translated_images/pa/rag-vs-context.9eae588520c00921.webp)

### ਰੀਟ੍ਰੀਵਲ-ਵਧਾਇਆ ਜਨਰੇਸ਼ਨ (RAG)

RAG ਇੱਕ ਰੀਟ੍ਰੀਵਲ ਸਿਸਟਮ ਨੂੰ ਜਨਰੇਟਿਵ ਮਾਡਲ ਨਾਲ ਜੋੜਦਾ ਹੈ। ਜਦੋਂ ਕੋਈ ਪੁੱਛਗਿੱਛ ਹੋਂਦੀ ਹੈ, ਤਾਂ ਰੀਟ੍ਰੀਵਲ ਸਿਸਟਮ ਬਾਹਰੀ ਸ੍ਰੋਤ ਤੋਂ ਸਰਬੀਖਿਆ ਜਾਣਕਾਰੀ ਜਾਂ ਦਸਤਾਵੇਜ਼ ਲਿਆਉਂਦਾ ਹੈ, ਅਤੇ ਇਹ ਪ੍ਰਾਪਤ ਜਾਣਕਾਰੀ ਮਾਡਲ ਨੂੰ ਬਿਹਤਰ ਅਤੇ ਸੰਦੇਸ਼ਾਤਮਕ ਜਵਾਬ ਬਣਾਉਣ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ।

RAG ਪ੍ਰਣਾਲੀ ਵਿੱਚ, ਏਜੰਟ ਗਿਆਨ ਖਜ਼ਾਨੇ ਤੋਂ ਸਬੰਧਤ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ ਅਤੇ ਇਸ ਦਾ ਉਪਯੋਗ ਮਨ-ਮੌਜੂਦਾ ਜਵਾਬ ਜਾਂ ਕਾਰਵਾਈ ਬਨਾਉਣ ਵਿੱਚ ਕਰਦਾ ਹੈ।

### ਸਹੀ ਕਰਨ ਵਾਲਾ RAG ਤਰੀਕਾ

ਸਹੀ ਕਰਨ ਵਾਲਾ RAG ਤਰੀਕਾ RAG ਤਕਨਾਲੋਜੀ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਗਲਤੀਆਂ ਠੀਕ ਕਰਨ ਅਤੇ ਏਆਈ ਏਜੰਟਾਂ ਦੀ ਸਹੀਅਤ ਸੁਧਾਰਨ ਉੱਤੇ ਧਿਆਨ ਦਿੰਦਾ ਹੈ। ਇਸ ਵਿੱਚ ਸ਼ਾਮਲ ਹਨ:

1. **ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ**: ਸਬੰਧਿਤ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਸਕਾਰਾਤਮਕ ਪ੍ਰਾਪਟਾਂ ਦੀ ਵਰਤੋਂ।
2. **ਟੂਲ**: ਐਲਗੋਰੀਥਮ ਅਤੇ ਪ੍ਰਣਾਲੀਆਂ ਜੋ ਏਜੰਟ ਨੂੰ ਪ੍ਰਾਪਤ ਜਾਣਕਾਰੀ ਦੀ ਸਾਰਥਕਤਾ ਅਤੇ ਬੀਲਾਗਤਾ ਨੂੰ ਮੁਲਾਂਕਣ ਕਰਨ ਅਤੇ ਸਹੀ ਜਵਾਬ ਬਣਾਉਣ ਯੋਗ ਬਣਾਉਂਦੀਆਂ ਹਨ।
3. **ਮੁਲਾਂਕਣ**: ਏਜੰਟ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦੀ ਲਗਾਤਾਰ ਜਾਂਚ ਅਤੇ ਇਸ ਦੀ ਸਹੀਅਤ ਅਤੇ ਕੁਸ਼ਲਤਾ ਵਿੱਚ ਸੁਧਾਰ ਕਰਨਾ।

#### ਉਦਾਹਰਣ: ਖੋਜ ਏਜੰਟ ਵਿੱਚ ਸਹੀ ਕਰਨ ਵਾਲਾ RAG

ਇੱਕ ਖੋਜ ਏਜੰਟ ਬਾਰੇ ਸੋਚੋ ਜੋ ਵੈੱਬ ਤੋਂ ਜਾਣਕਾਰੀ ਲੈ ਕੇ ਯੂਜ਼ਰ ਪ੍ਰਸ਼ਨਾਂ ਦੇ ਜਵਾਬ ਦਿੰਦਾ ਹੈ। ਸਹੀ ਕਰਨ ਵਾਲਾ RAG ਤਰੀਕਾ ਸ਼ਾਮਲ ਹੋ ਸਕਦਾ ਹੈ:

1. **ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ**: ਯੂਜ਼ਰ ਦੇ ਇਨਪੁਟ ਦੇ ਆਧਾਰ 'ਤੇ ਖੋਜ ਪ੍ਰਸ਼ਨਾਂ ਨੂੰ ਤਿਆਰ ਕਰਨਾ।
2. **ਟੂਲ**: ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਪ੍ਰੋਸੈਸਿੰਗ ਅਤੇ ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਐਲਗੋਰੀਥਮ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਖੋਜ ਨਤੀਜਿਆਂ ਨੂੰ ਦਰਜਾ ਅਤੇ ਛਾਂਟਣਾ।
3. **ਮੁਲਾਂਕਣ**: ਯੂਜ਼ਰ ਫੀਡਬੈਕ ਨੂੰ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਪ੍ਰਾਪਤ ਜਾਣਕਾਰੀ ਵਿੱਚ ਗਲਤੀਆਂ ਦਾ ਪਤਾ ਲਗਾਉਣਾ ਅਤੇ ਠੀਕ ਕਰਨਾ।

### ਟ੍ਰੈਵਲ ਏਜੰਟ ਵਿੱਚ ਸਹੀ ਕਰਨ ਵਾਲਾ RAG

ਸਹੀ ਕਰਨ ਵਾਲਾ RAG (ਰੀਟ੍ਰੀਵਲ-ਵਧਾਇਆ ਜਨਰੇਸ਼ਨ) ਏਆਈ ਦੀ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਅਤੇ ਬਣਾਉਣ ਦੀ ਯੋਗਤਾ ਨੂੰ ਉੱਪਰ ਚੜ੍ਹਾਉਂਦਾ ਹੈ ਜਦ ਕਿ ਕਿਸੇ ਵੀ ਤਰ੍ਹਾਂ ਦੀ ਗਲਤੀ ਨੂੰ ਠੀਕ ਕਰਦਾ ਹੈ। ਆਓ ਦੇਖੀਏ ਕਿ ਟ੍ਰੈਵਲ ਏਜੰਟ ਸਹੀ ਕਰਨ ਵਾਲੇ RAG ਤਰੀਕੇ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕਿਵੇਂ ਹੋਰ ਸਹੀ ਅਤੇ ਸੰਬੰਧਿਤ ਯਾਤਰਾ ਸੁਝਾਅ ਦੇ ਸਕਦਾ ਹੈ।

ਇਸ ਵਿੱਚ ਛੇਤੀ ਹਨ:

- **ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ:** ਏਜੰਟ ਨੂੰ ਸਹੀ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਖਾਸ ਪ੍ਰਾਂਪਟਾਂ ਦੀ ਵਰਤੋਂ।
- **ਟੂਲ:** ਐਲਗੋਰਿਦਮ ਅਤੇ ਤਰੀਕੇ ਜੋ ਪ੍ਰਾਪਤ ਜਾਣਕਾਰੀ ਦੀ ਬੀਲਾਗਤਾ ਮੁਲਾਂਕਣ ਤੇ ਸਹੀ ਜਵਾਬ ਤਿਆਰ ਕਰਨ ਲਈ ਯੋਗ ਹਨ।
- **ਮੁਲਾਂਕਣ:** ਲਗਾਤਾਰ ਏਜੰਟ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦੀ ਕੁਨਾਂਚ ਕਰਦੇ ਹੋਏ ਇਸਦੀ ਸਹੀਅਤ ਅਤੇ ਕੁਸ਼ਲਤਾ ਵਿੱਚ ਸੁਧਾਰ ਕਰਨਾ।

#### ਟ੍ਰੈਵਲ ਏਜੰਟ ਵਿੱਚ ਸਹੀ ਕਰਨ ਵਾਲਾ RAG ਲਾਗੂ ਕਰਨ ਲਈ ਕਦਮ

1. **ਸ਼ੁਰੂਆਤੀ ਯੂਜ਼ਰ ਇੰਟਰਐਕਸ਼ਨ**
   - ਟ੍ਰੈਵਲ ਏਜੰਟ ਯੂਜ਼ਰ ਤੋਂ ਮੰਜਿਲ, ਯਾਤਰਾ ਤਾਰੀਖਾਂ, ਬਜਟ, ਅਤੇ ਦਿਲਚਸਪੀਆਂ ਬਾਰੇ ਮੁੱਖ ਪਸੰਦਾਂ ਇਕੱਠੀਆਂ ਕਰਦਾ ਹੈ।
   - ਉਦਾਹਰਣ:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤੀ**
   - ਟ੍ਰੈਵਲ ਏਜੰਟ ਯੂਜ਼ਰ ਪਸੰਦਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਉਡਾਣਾਂ, ਠਹਿਰਣ, ਆਕਰਸ਼ਣ ਅਤੇ ਰੈਸਟੋਰੈਂਟਾਂ ਦੀ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ।
   - ਉਦਾਹਰਣ:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **ਸ਼ੁਰੂਆਤੀ ਸਿਫਾਰਸ਼ਾਂ ਤਿਆਰ ਕਰਨਾ**
   - ਟ੍ਰੈਵਲ ਏਜੰਟ ਪ੍ਰਾਪਤ ਕੀਤੀ ਜਾਣਕਾਰੀ ਦੀ ਵਰਤੋਂ ਕਰ ਕੇ ਵਿਅਕਤੀਗਤ ਯਾਤਰਾ ਸੂਚੀ ਬਣਾਉਂਦਾ ਹੈ।
   - ਉਦਾਹਰਣ:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **ਯੂਜ਼ਰ ਫੀਡਬੈਕ ਇਕੱਠਾ ਕਰਨਾ**
   - ਟ੍ਰੈਵਲ ਏਜੰਟ ਸ਼ੁਰੂਆਤੀ ਸਿਫਾਰਸ਼ਾਂ ਬਾਰੇ ਯੂਜ਼ਰ ਤੋਂ ਫੀਡਬੈਕ ਲੈਂਦਾ ਹੈ।
   - ਉਦਾਹਰਣ:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **ਸਹੀ ਕਰਨ ਵਾਲਾ RAG ਪ੍ਰਕਿਰਿਆ**
   - **ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ**: ਟ੍ਰੈਵਲ ਏਜੰਟ ਯੂਜ਼ਰ ਫੀਡਬੈਕ ਦੇ ਆਧਾਰ ‘ਤੇ ਨਵੇਂ ਖੋਜ ਪ੍ਰਸ਼ਨ ਤਿਆਰ ਕਰਦਾ ਹੈ।
     - ਉਦਾਹਰਣ:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **ਟੂਲ**: ਟ੍ਰੈਵਲ ਏਜੰਟ ਨਵੇਂ ਖੋਜ ਨਤੀਜਿਆਂ ਨੂੰ ਦਰਜਾ ਦਿੰਦਾ ਅਤੇ ਤਰਜੀਹ ਦੇ ਕੇ ਛਾਂਟਦਾ ਹੈ, ਸਮੇਤ ਯੂਜ਼ਰ ਫੀਡਬੈਕ ਦੀ ਬੀਲਾਗਤਾ।
     - ਉਦਾਹਰਣ:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **ਮੁਲਾਂਕਣ**: ਟ੍ਰੈਵਲ ਏਜੰਟ ਆਪਣੀਆਂ ਸਿਫਾਰਸ਼ਾਂ ਦੀ ਬੀਲਾਗਤਾ ਅਤੇ ਸਹੀਅਤ ਨੂੰ ਲਗਾਤਾਰ ਜਾਂਚਦਾ ਅਤੇ ਜ਼ਰੂਰੀ ਸੋਧ ਕਰਦਾ ਹੈ।
     - ਉਦਾਹਰਣ:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### ਪ੍ਰਾਇਗਮਿਕ ਉਦਾਹਰਣ

ਇੱਥੇ ਟ੍ਰੈਵਲ ਏਜੰਟ ਵਿੱਚ ਸਹੀ ਕਰਨ ਵਾਲੇ RAG ਤਰੀਕੇ ਨੂੰ ਸ਼ਾਮਿਲ ਕਰਨ ਵਾਲੀ ਇੱਕ ਸਾਧਾਰਣ ਪਾਇਥਾਨ ਕੋਡ ਉਦਾਹਰਣ ਹੈ:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)
        new_itinerary = self.generate_recommendations()
        return new_itinerary

# ਉਦਾਹਰਨ ਵਜੋਂ ਇਸਤਮਾਲ
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
new_itinerary = travel_agent.adjust_based_on_feedback(feedback)
print("Updated Itinerary:", new_itinerary)
```

### ਪ੍ਰੀ-ਐਮਟਿਵ ਕਾਂਟੈਕਸਟ ਲੋਡ
Pre-emptive Context Load ਵਿੱਚ ਮਾਡਲ ਨੂੰ ਕਵੈਰੀ ਨੂੰ ਪ੍ਰੋਸੈਸ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਬੰਧਤ ਸੰਦਰਭ ਜਾਂ ਪਿਛੋਕੜ ਜਾਣਕਾਰੀ ਲੋਡ ਕਰਨਾ ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ। ਇਸ ਦਾ ਮਤਲਬ ਹੈ ਕਿ ਮਾਡਲ ਕੋਲ ਇਹ ਜਾਣਕਾਰੀ ਸਟਾਰਟ ਤੋਂ ਉਪਲਬਧ ਹੁੰਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਇਹ ਬਿਨਾਂ ਕਿਸੇ ਵਾਧੂ ਡੇਟਾ ਲੱਭਣ ਦੀ ਲੋੜ ਤੋਂ ਬਿਨਾਂ ਹੋਰ ਜਾਣੂ ਜਵਾਬ ਤਿਆਰ ਕਰ ਸਕਦਾ ਹੈ।

ਇੱਥੇ ਪਾਈਥਨ ਵਿੱਚ ਇੱਕ ਟਰੇਵਲ ਏਜੰਟ ਐਪਲੀਕੇਸ਼ਨ ਲਈ ਇੱਕ ਸਧਾਰਣ ਉਦਾਹਰਨ ਹੈ ਕਿ ਪ੍ਰੀ-ਐਮਪਟਿਵ ਸੰਦਰਭ ਲੋਡ ਕਿਵੇਂ ਹੋ ਸਕਦਾ ਹੈ:

```python
class TravelAgent:
    def __init__(self):
        # ਪ੍ਰਸਿੱਧ ਮੰਜਿਲਾਂ ਅਤੇ ਉਹਨਾਂ ਦੀ ਜਾਣਕਾਰੀ ਪਹਿਲਾਂ ਤੋਂ ਲੋਡ ਕਰੋ
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # ਪਹਿਲਾਂ ਲੋਡ ਕੀਤੇ ਸੰਦਭ ਤੋਂ ਮੰਜਿਲ ਦੀ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# ਉਦਾਹਰਨ ਵਰਤੋਂ
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### ਵਿਆਖਿਆ

1. **ਆਰੰਭ ਕਰਨਾ (`__init__` ਮੈਥਡ)**: `TravelAgent` ਕਲਾਸ ਨੂੰਕਸਥਿਤ ਸਥਾਨਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਨਾਲ ਭਰਿਆ ਹੋਇਆ ਡਿਕਸ਼ਨਰੀ ਪਹਿਲਾਂ ਤੋਂ ਲੋਡ ਕਰਦਾ ਹੈ, ਜਿਵੇਂ ਕਿ ਪੈਰੀਸ, ਟੋਕੀਓ, ਨਿਊਯਾਰਕ ਅਤੇ ਸਿਡਨੀ। ਇਸ ਡਿਕਸ਼ਨਰੀ ਵਿੱਚ ਹਰ ਸਥਾਨ ਲਈ ਦੇਸ਼, ਮੁਦਰਾ, ਭਾਸ਼ਾ, ਅਤੇ ਮੁੱਖ ਆਕਰਸ਼ਣਾਂ ਦੀ ਜਾਣਕਾਰੀ ਹੁੰਦੀ ਹੈ।

2. **ਮਾਲੂਮਾਤ ਲੈਣਾ (`get_destination_info` ਮੈਥਡ)**: ਜਦ ਮੈਨੂੰ ਕਿਸੇ ਖਾਸ ਸਥਾਨ ਬਾਰੇ ਪੁੱਛਿਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ `get_destination_info` ਮੈਥਡ ਪਹਿਲਾਂ ਲੋਡ ਕੀਤੇ ਸੰਦਰਭ ਡਿਕਸ਼ਨਰੀ ਵਿੱਚੋਂ ਸਬੰਧਿਤ ਜਾਣਕਾਰੀ ਲਿਆਉਂਦਾ ਹੈ।

ਸੰਦਰਭ ਨੂੰ ਪਹਿਲਾਂ ਤੋਂ ਲੋਡ ਕਰਕੇ, ਟਰੇਵਲ ਏਜੰਟ ਐਪਲੀਕੇਸ਼ਨ ਬਿਨਾਂ ਕਿਸੇ ਬਾਹਰੀ ਸਰੋਤ ਤੋਂ ਇਸ ਜਾਣਕਾਰੀ ਨੂੰ ਹਕੀਕਤ ਵਿੱਚ ਖੰਗਾਲਣ ਦੀ ਲੋੜ ਤੋਂ ਬਿਨਾਂ ਜਲਦੀ ਪ੍ਰਤੀਕਿਰਿਆ ਦੇ ਸਕਦੀ ਹੈ। ਇਹ ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਜ਼ਿਆਦਾ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਅਤੇ ਪ੍ਰਤੀਕ੍ਰਿਆਸ਼ੀਲ ਬਨਾਉਂਦਾ ਹੈ।

### ਇੱਕ ਲਕੜੀ ਨਾਲ ਯੋਜਨਾ ਬਣਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਇੱਕ ਲਕੜੀ ਨਾਲ ਸ਼ੁਰੂਆਤ ਕਰਨਾ

ਇੱਕ ਲਕੜੀ ਨਾਲ ਯੋਜਨਾ ਬਣਾਉਣ ਨਾਲ ਮਤਲਬ ਹੈ ਕਿ ਤੁਹਾਡੇ ਮਨ ਵਿੱਚ ਇੱਕ ਸਪਸ਼ਟ ਉਦੇਸ਼ ਜਾਂ ਲਕੜੀ ਦੇ ਨਤੀਜੇ ਨਾਲ ਸ਼ੁਰੂ ਕਰਨਾ। ਇਸ ਉਦੇਸ਼ ਨੂਂ ਪਹਿਲਾਂ ਪਰਿਭਾਸ਼ਿਤ ਕਰਕੇ, ਮਾਡਲ ਇਸ ਨੂੰ ਦਾਇਰੈਕਟ ਕਰਨ ਵਾਲੇ ਸਿਧਾਂਤ ਵਜੋਂ ਵਰਤ ਸਕਦਾ ਹੈ ਹਰ ਇਟਰੇਸ਼ਨ ਦੌਰਾਨ। ਇਹ ਸੁਨਿਸ਼ਚਿਤ ਕਰਦਾ ਹੈ ਕਿ ਹਰ ਕਦਮ ਚਾਹੇ ਨਤੀਜੇ ਵੱਲ ਬੜਦਾ ਰਹੇ, ਜਿਸ ਨਾਲ ਪ੍ਰਕਿਰਿਆ ਹੋਰ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਅਤੇ ਕੇਂਦਰਿਤ ਬਨ ਜਾਂਦੀ ਹੈ।

ਇੱਥੇ ਪਾਈਥਨ ਵਿੱਚ ਇੱਕ ਟਰੇਵਲ ਏਜੰਟ ਲਈ ਯੋਜਨਾ ਨੂੰ ਲਕੜੀ ਨਾਲ ਸ਼ੁਰੂ ਕਰਨ ਅਤੇ ਫਿਰ ਇਟਰੇਟ ਕਰਨ ਦੀ ਉਦਾਹਰਨ ਦਿੱਤੀ ਗਈ ਹੈ:

### ਘਟਨਾ

ਇੱਕ ਟਰੇਵਲ ਏਜੰਟ ਆਪਣੇ ਗਾਹਕ ਲਈ ਕੁਸਟਮ ਬਣਾ ਛੁੱਟੀਆਂ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣਾ ਚਾਹੁੰਦਾ ਹੈ। ਲਕੜੀ ਇਹ ਬਣਾਉਣਾ ਹੈ ਕਿ ਗਾਹਕ ਦੀ ਪਸੰਦ ਅਤੇ ਬਜਟ ਅਨੁਸਾਰ ਸਭ ਤੋਂ ਵਧੀਆ ਯਾਤਰਾ ਦੀ ਯੋਜਨਾ ਬਣਾਈ ਜਾਵੇ।

### ਕਦਮ

1. ਗਾਹਕ ਦੀਆਂ ਪਸੰਦਾਂ ਅਤੇ ਬਜਟ ਨੂੰ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ।
2. ਸਰਵਪਹਿਲਾਂ ਇਸ ਯੋਜਨਾ ਨੂੰ ਬਨਾਂਓ ਜੋ ਪਸੰਦਾਂ ਤੇ ਆਧਾਰਿਤ ਹੈ।
3. ਯੋਜਨਾ ਨੂੰ ਸੁਧਾਰ ਕਰਦੇ ਜਾਓ, ਗਾਹਕ ਦੀ ਸੰਤੁਸ਼ਟੀ ਨੂੰ ਧਿਆਨ ਵਿਚ ਰੱਖਦੇ ਹੋਏ।

#### ਪਾਈਥਨ ਕੋਡ

```python
class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def bootstrap_plan(self, preferences, budget):
        plan = []
        total_cost = 0

        for destination in self.destinations:
            if total_cost + destination['cost'] <= budget and self.match_preferences(destination, preferences):
                plan.append(destination)
                total_cost += destination['cost']

        return plan

    def match_preferences(self, destination, preferences):
        for key, value in preferences.items():
            if destination.get(key) != value:
                return False
        return True

    def iterate_plan(self, plan, preferences, budget):
        for i in range(len(plan)):
            for destination in self.destinations:
                if destination not in plan and self.match_preferences(destination, preferences) and self.calculate_cost(plan, destination) <= budget:
                    plan[i] = destination
                    break
        return plan

    def calculate_cost(self, plan, new_destination):
        return sum(destination['cost'] for destination in plan) + new_destination['cost']

# ਉਦਾਹਰਨ ਵਰਤੋਂ
destinations = [
    {"name": "Paris", "cost": 1000, "activity": "sightseeing"},
    {"name": "Tokyo", "cost": 1200, "activity": "shopping"},
    {"name": "New York", "cost": 900, "activity": "sightseeing"},
    {"name": "Sydney", "cost": 1100, "activity": "beach"},
]

preferences = {"activity": "sightseeing"}
budget = 2000

travel_agent = TravelAgent(destinations)
initial_plan = travel_agent.bootstrap_plan(preferences, budget)
print("Initial Plan:", initial_plan)

refined_plan = travel_agent.iterate_plan(initial_plan, preferences, budget)
print("Refined Plan:", refined_plan)
```

#### ਕੋਡ ਦੀ ਵਿਆਖਿਆ

1. **ਆਰੰਭ ਕਰਨਾ (`__init__` ਮੈਥਡ)**: `TravelAgent` ਕਲਾਸ ਨੂੰ ਸੰਭਾਵੀ ਸਥਾਨਾਂ ਦੀ ਲਿਸਟ ਨਾਲ ਆਰੰਭ ਕੀਤਾ ਗਿਆ ਹੈ, ਜਿਨ੍ਹਾਂ ਦੇ ਨਾਮ, ਲਾਗਤ ਅਤੇ ਗਤੀਵਿਧੀ ਦੀ ਕਿਸਮ ਵਰਗੇ ਗੁਣ ਹਨ।

2. **ਯੋਜਨਾ ਬਣਾਉਣਾ (`bootstrap_plan` ਮੈਥਡ)**: ਇਹ ਮੈਥਡ ਗਾਹਕ ਦੀ ਪਸੰਦਾਂ ਅਤੇ ਬਜਟ ਅਨੁਸਾਰ ਪਹਿਲਾਂ ਦੀ ਯੋਜਨਾ ਤਿਆਰ ਕਰਦਾ ਹੈ। ਇਹ ਸਥਾਨਾਂ ਦੀ ਲਿਸਟ ਵਿਚੋਂ ਉਹਨਾਂ ਨੂੰ ਯੋਜਨਾ ਵਿਚ ਸ਼ਾਮਿਲ ਕਰਦਾ ਹੈ ਜੋ ਗਾਹਕ ਦੀ ਪਸੰਦ ਨਾਲ ਮੇਲ ਖਾਂਦੇ ਹਨ ਅਤੇ ਬਜਟ ਵਿੱਚ ਫਿੱਟ ਹੁੰਦੇ ਹਨ।

3. **ਪਸੰਦਾਂ ਨਾਲ ਮੇਲ ਕਰਨਾ (`match_preferences` ਮੈਥਡ)**: ਇਹ ਮੈਥਡ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ ਕਿ ਕੋਈ ਸਥਾਨ ਗਾਹਕ ਦੀ ਪਸੰਦਾਂ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ ਜਾਂ ਨਹੀਂ।

4. **ਯੋਜਨਾ ਤੇ ਦੁਬਾਰਾ ਕੰਮ ਕਰਨਾ (`iterate_plan` ਮੈਥਡ)**: ਇਹ ਮੈਥਡ ਪਹਿਲਾਂ ਬਣਾਈ ਗਈ ਯੋਜਨਾ ਨੂੰ ਸੁਧਾਰਦਾ ਹੈ, ਹਰ ਸਥਾਨ ਨੂੰ ਇਹ ਦੇਖ ਕੇ ਬਿਹਤਰ ਵਿਕਲਪ ਨਾਲ ਬਦਲਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰਦਾ ਹੈ, ਜਿਸ ਵਿੱਚ ਗਾਹਕ ਦੀ ਪਸੰਦ ਅਤੇ ਬਜਟ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖਿਆ ਜਾਂਦਾ ਹੈ।

5. **ਲਾਗਤ ਦੀ ਗਣਨਾ (`calculate_cost` ਮੈਥਡ)**: ਇਹ ਮੈਥਡ ਮੌਜੂਦਾ ਯੋਜਨਾ ਦੀ ਕੁੱਲ ਲਾਗਤ ਦਾ ਹਿਸਾਬ ਲਗਾਉਂਦਾ ਹੈ, ਜਿਸ ਵਿੱਚ ਇੱਕ ਨਵਾਂ ਸੰਭਾਵੀ ਸਥਾਨ ਵੀ ਸ਼ਾਮਿਲ ਹੈ।

#### ਉਦਾਹਰਨ ਵਰਤੋਂ

- **ਮੂਲ ਯੋਜਨਾ**: ਟਰੇਵਲ ਏਜੰਟ ਗਾਹਕ ਦੀ ਪਸੰਦ (ਜਿਵੇਂ ਸੀਨ-ਅਨੰਦ ਲਈ) ਅਤੇ $2000 ਬਜਟ ਅਨੁਸਾਰ ਸ਼ੁਰੂਆਤੀ ਯੋਜਨਾ ਤਿਆਰ ਕਰਦਾ ਹੈ।
- **ਸੁਧਾਰੀ ਹੋਈ ਯੋਜਨਾ**: ਟਰੇਵਲ ਏਜੰਟ ਯੋਜਨਾ ਨੂੰ ਦੁਬਾਰਾ ਚਲਾਉਂਦਾ ਹੈ, ਗਾਹਕ ਦੀਆਂ ਪਸੰਦਾਂ ਅਤੇ ਬਜਟ ਲਈ ਉਸ ਨੂੰ ਸੁਧਾਰਦਾ ਹੈ।

ਲਕੜੀ ਦੇ ਸਾਫ਼ ਉਦੇਸ਼ ਦੇ ਨਾਲ ਯੋਜਨਾ ਨੂੰ ਬੂਟਸਟ੍ਰੈਪ ਕਰਕੇ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਇਟਰੇਟ ਕਰਕੇ, ਟਰੇਵਲ ਏਜੰਟ ਗਾਹਕ ਲਈ ਕੁਸਟਮ ਅਤੇ ਢੰਗ ਨਾਲ ਸੁਧਾਰਿਆ ਹੋਇਆ ਯਾਤਰਾ ਇਤਿਨੇਰੀ ਤਿਆਰ ਕਰ ਸਕਦਾ ਹੈ। ਇਹ ਨਜ਼ਰੀਆ ਸੁਨਿਸ਼ਚਿਤ ਕਰਦਾ ਹੈ ਕਿ ਯੋਜਨਾ ਸ਼ੁਰੂ ਤੋਂ ਹੀ ਗਾਹਕ ਦੀਆਂ ਪਸੰਦਾਂ ਅਤੇ ਬਜਟ ਨਾਲ ਸਹਿਮਤ ਹੈ ਅਤੇ ਹਰ ਇਟਰੇਸ਼ਨ ਨਾਲ ਠੀਕ ਹੋ ਰਹੀ ਹੈ।

### LLM ਦਾ ਰੀ-ਰੈਂਕਿੰਗ ਅਤੇ ਸਕੋਰਿੰਗ ਲਈ ਲਾਭ ਉਠਾਉਣਾ

ਵੱਡਾ ਭਾਸ਼ਾਈ ਮਾਡਲ (LLM) ਰੀ-ਰੈਂਕਿੰਗ ਅਤੇ ਸਕੋਰਿੰਗ ਲਈ ਇਸ ਤਰ੍ਹਾਂ ਵਰਤੇ ਜਾ ਸਕਦੇ ਹਨ ਕਿ ਵਾਪਸ ਪ੍ਰਾਪਤ ਦਸਤਾਵੇਜ਼ਾਂ ਜਾਂ ਬਣਾਏ ਗਏ ਜਵਾਬਾਂ ਦੀ ਸੰਬੰਧਤਾ ਅਤੇ ਗੁਣਵੱਤਾ ਦਾ ਮੁਲਾਂਕਣ ਕੀਤਾ ਜਾਵੇ। ਇਹ ਇਸ ਤਰ੍ਹਾਂ ਕੰਮ ਕਰਦਾ ਹੈ:

**ਪ੍ਰਾਪਤੀ:** ਸ਼ੁਰੂਆਤੀ ਕਦਮ ਵਿੱਚ ਕਵੈਰੀ ਅਨੁਸਾਰ ਉਮੀਦਵਾਰ ਦਸਤਾਵੇਜ਼ ਜਾਂ ਜਵਾਬ ਨੂੰ ਖਾਂਜਿਆ ਜਾਂਦਾ ਹੈ।

**ਰੀ-ਰੈਂਕਿੰਗ:** LLM ਉਮੀਦਵਾਰਾਂ ਦਾ ਮੁਲਾਂਕਣ ਕਰਦਾ ਹੈ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਸੰਬੰਧਤਾ ਅਤੇ ਗੁਣਵੱਤਾ ਅਨੁਸਾਰ ਦੁਬਾਰਾ ਕਰਮਬੱਧ ਕਰਦਾ ਹੈ। ਇਸ ਕਦਮ ਦੁਆਰਾ ਸਭ ਤੋਂ ਜ਼ਿਆਦਾ ਸੰਬੰਧਤ ਅਤੇ ਉੱਚ ਗੁਣਵੱਤਾ ਵਾਲੀ ਜਾਣਕਾਰੀ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਪੇਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।

**ਸਕੋਰਿੰਗ:** LLM ਹਰ ਉਮੀਦਵਾਰ ਨੂੰ ਸਕੋਰ ਦੇਂਦਾ ਹੈ ਜੋ ਉਹਨਾਂ ਦੀ ਸੰਬੰਧਤਾ ਅਤੇ ਗੁਣਵੱਤਾ ਦਰਸਾਉਂਦਾ ਹੈ। ਇਹ ਗਾਹਕ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਜਵਾਬ ਜਾਂ ਦਸਤਾਵੇਜ਼ ਚੁਣਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।

LLM ਨੂੰ ਰੀ-ਰੈਂਕਿੰਗ ਅਤੇ ਸਕੋਰਿੰਗ ਲਈ ਵਰਤ ਕੇ, ਸਿਸਟਮ ਜ਼ਿਆਦਾ ਸਹੀ ਅਤੇ ਸੰਦਰਭ ਅਨੁਸਾਰ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰ ਸਕਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਕੁੱਲ ਵਰਤੋਂਕਾਰ ਅਨੁਭਵ ਸੁਧਰਦਾ ਹੈ।

ਇੱਥੇ ਪਾਈਥਨ ਵਿੱਚ ਟਰੇਵਲ ਏਜੰਟ ਦਾ ਇੱਕ ਉਦਾਹਰਨ ਹੈ ਕਿ ਕਿਸ ਤਰ੍ਹਾਂ ਵੱਡੇ ਭਾਸ਼ਾਈ ਮਾਡਲ (LLM) ਨੂੰ ਗਾਹਕ ਦੀਆਂ ਪਸੰਦਾਂ ਅਨੁਸਾਰ ਟਰੇਵਲ ਸਥਾਨਾਂ ਨੂੰ ਰੀ-ਰੈਂਕ ਅਤੇ ਸਕੋਰ ਕਰਨ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ:

#### ਘਟਨਾ - ਪਸੰਦਾਂ ਅਨੁਸਾਰ ਯਾਤਰਾ

ਇੱਕ ਟਰੇਵਲ ਏਜੰਟ ਆਪਣੇ ਗਾਹਕ ਦੀ ਪਸੰਦਾਂ ਅਨੁਸਾਰ ਵਧੀਆ ਯਾਤਰਾ ਸਥਾਨਾਂ ਦੀ ਸਿਫਾਰਿਸ਼ ਕਰਨਾ ਚਾਹੁੰਦਾ ਹੈ। LLM ਸਥਾਨਾਂ ਨੂੰ ਉਮਰਦਾਰੀ ਲਈ ਰੀ-ਰੈਂਕ ਅਤੇ ਸਕੋਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ ਤਾਂ ਜੋ ਸਭ ਤੋਂ ਇਕ ਰੂਪ ਵਾਲੇ ਵਿਕਲਪ ਦਿੱਤੇ ਜਾਣ।

#### ਕਦਮ:

1. ਗਾਹਕ ਦੀਆਂ ਪਸੰਦਾਂ ਇਕੱਠੀਆਂ ਕਰੋ।
2. ਸੰਭਾਵੀ ਯਾਤਰਾ ਸਥਾਨਾਂ ਦੀ ਇੱਕ ਸੂਚੀ ਪ੍ਰਾਪਤ ਕਰੋ।
3. ਉਪਭੋਗਤਾ ਪਸੰਦਾਂ ਅਨੁਸਾਰ LLM ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਥਾਨਾਂ ਨੂੰ ਰੀ-ਰੈਂਕ ਅਤੇ ਸਕੋਰ ਕਰੋ।

ਪਿਛਲੀ ਉਦਾਹਰਨ ਨੂੰ ਅਪਡੇਟ ਕਰਕੇ ਤੁਸੀਂ Azure OpenAI ਸੇਵਾਵਾਂ ਵਰਤ ਸਕਦੇ ਹੋ:

#### ਲੋੜੀਂਦਾ ਚੀਜ਼ਾਂ

1. ਤੁਹਾਡੇ ਕੋਲ ਇੱਕ Azure ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।
2. ਇੱਕ Azure OpenAI ਸਰੋਤ ਬਣਾਓ ਅਤੇ ਆਪਣੀ API ਕੁੰਜੀ ਪ੍ਰਾਪਤ ਕਰੋ।

#### ਉਦਾਹਰਨ ਪਾਈਥਨ ਕੋਡ

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # ਅਜ਼ੂਰ OpenAI ਲਈ ਇੱਕ ਪ੍ਰੰਪਟ ਬਣਾਓ
        prompt = self.generate_prompt(preferences)
        
        # ਬੇਨਤੀ ਲਈ ਹੈਡਰ ਅਤੇ ਪੇਲੋਡ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # ਮੁੜ ਜੰਚੇ ਅਤੇ ਸਕੋਰ ਕੀਤੇ ਗਏ ਮੰਜਿਲਾਂ ਲਈ ਅਜ਼ੂਰ OpenAI API ਨੂੰ ਕਾਲ ਕਰੋ
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # ਸਿਫਾਰਸ਼ਾਂ ਕੱਢੋ ਅਤੇ ਵਾਪਸ ਕਰੋ
        recommendations = response_data['choices'][0]['text'].strip().split('\n')
        return recommendations

    def generate_prompt(self, preferences):
        prompt = "Here are the travel destinations ranked and scored based on the following user preferences:\n"
        for key, value in preferences.items():
            prompt += f"{key}: {value}\n"
        prompt += "\nDestinations:\n"
        for destination in self.destinations:
            prompt += f"- {destination['name']}: {destination['description']}\n"
        return prompt

# ਉਦਾਹਰਣ ਵਰਤੋਂ
destinations = [
    {"name": "Paris", "description": "City of lights, known for its art, fashion, and culture."},
    {"name": "Tokyo", "description": "Vibrant city, famous for its modernity and traditional temples."},
    {"name": "New York", "description": "The city that never sleeps, with iconic landmarks and diverse culture."},
    {"name": "Sydney", "description": "Beautiful harbour city, known for its opera house and stunning beaches."},
]

preferences = {"activity": "sightseeing", "culture": "diverse"}
api_key = 'your_azure_openai_api_key'
endpoint = 'https://your-endpoint.com/openai/deployments/your-deployment-name/completions?api-version=2022-12-01'

travel_agent = TravelAgent(destinations)
recommendations = travel_agent.get_recommendations(preferences, api_key, endpoint)
print("Recommended Destinations:")
for rec in recommendations:
    print(rec)
```

#### ਕੋਡ ਦੀ ਵਿਆਖਿਆ - ਪਸੰਦ ਬੁੱਕਰ

1. **ਆਰੰਭ ਕਰਨਾ**: `TravelAgent` ਕਲਾਸ ਸੰਭਾਵੀ ਯਾਤਰਾ ਸਥਾਨਾਂ ਦੀ ਲਿਸਟ ਨਾਲ ਆਰੰਭ ਕੀਤੀ ਗਈ ਹੈ, ਜਿਨ੍ਹਾਂ ਦੇ ਨਾਮ ਅਤੇ ਵਰਣਨ ਵਰਗੇ ਗੁਣ ਹਨ।

2. **ਸਿਫਾਰਿਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰਨਾ (`get_recommendations` ਮੈਥਡ)**: ਇਹ ਮੈਥਡ ਉਪਭੋਗਤਾ ਦੀਆਂ ਪਸੰਦਾਂ ਅਨੁਸਾਰ Azure OpenAI ਸੇਵਾ ਲਈ ਪ੍ਰਾਂਪਟ ਬਣਾਉਂਦਾ ਹੈ ਅਤੇ Azure OpenAI API ਨੂੰ HTTP POST ਬੇਨਤੀ ਕਰਦਾ ਹੈ ਤਾਂ ਜੋ ਰੀ-ਰੈਂਕ ਕੀਤੇ ਅਤੇ ਸਕੋਰ ਕੀਤੇ ਸਥਾਨ ਪ੍ਰਾਪਤ ਹੋਣ।

3. **ਪ੍ਰਾਂਪਟ ਬਣਾਉਣਾ (`generate_prompt` ਮੈਥਡ)**: ਇਹ ਮੈਥਡ Azure OpenAI ਲਈ ਇੱਕ ਪ੍ਰਾਂਪਟ ਬਣਾਉਂਦਾ ਹੈ, ਜਿਸ ਵਿੱਚ ਗਾਹਕ ਦੀਆਂ ਪਸੰਦਾਂ ਅਤੇ ਸਥਾਨਾਂ ਦੀ ਸੂਚੀ ਸ਼ਾਮਿਲ ਹੈ। ਪ੍ਰਾਂਪਟ ਮਾਡਲ ਨੂੰ ਦੱਸਦਾ ਹੈ ਕਿ ਉਹ ਦਿੱਤੀ ਗਈ ਪਸੰਦਾਂ ਅਨੁਸਾਰ ਸਥਾਨਾਂ ਨੂੰ ਕਿਵੇਂ ਰੀ-ਰੈਂਕ ਅਤੇ ਸਕੋਰ ਕਰੇ।

4. **API ਕਾਲ**: `requests` ਲਾਇਬਰੇਰੀ ਨੂੰ ਵਰਤ ਕੇ Azure OpenAI API ਏਂਡਪੌਇੰਟ 'ਤੇ HTTP POST ਬੇਨਤੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਜਵਾਬ ਵਿੱਚ ਰੀ-ਰੈਂਕ ਕੀਤੇ ਅਤੇ ਸਕੋਰ ਕੀਤੇ ਸਥਾਨ ਰਹਿੰਦੇ ਹਨ।

5. **ਉਦਾਹਰਨ ਵਰਤੋਂ**: ਟਰੇਵਲ ਏਜੰਟ ਗਾਹਕ ਦੀਆਂ ਪਸੰਦਾਂ (ਜਿਵੇਂ ਸੀਨ-ਅਨੰਦ ਅਤੇ ਵੱਖ-ਵੱਖ ਸੱਭਿਆਚਾਰ) ਇਕੱਠੀਆਂ ਕਰਦਾ ਹੈ ਅਤੇ Azure OpenAI ਸੇਵਾ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਟਰੇਵਲ ਸਥਾਨਾਂ ਲਈ ਰੀ-ਰੈਂਕ ਅਤੇ ਸਕੋਰ ਵਾਲੀਆਂ ਸਿਫਾਰਿਸ਼ਾਂ ਲੈਂਦਾ ਹੈ।

`your_azure_openai_api_key` ਨੂੰ ਆਪਣੀ ਅਸਲੀ Azure OpenAI API ਕੁੰਜੀ ਨਾਲ ਅਤੇ `https://your-endpoint.com/...` ਨੂੰ ਆਪਣੇ Azure OpenAI ਡਿਪਲੋਇਮੈਂਟ ਦੇ ਅਸਲੀ URL ਨਾਲ ਬਦਲਣਾ ਯਕੀਨੀ ਬਣਾਓ।

LLM ਦੀ ਮਦਦ ਨਾਲ, ਟਰੇਵਲ ਏਜੰਟ ਗਾਹਕਾਂ ਨੂੰ ਹੋਰ ਨਿੱਜੀਕਰਤ ਅਤੇ ਸੰਬੰਧਿਤ ਯਾਤਰਾ ਸਿਫਾਰਿਸ਼ਾਂ ਦੇ ਸਕਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਉਨ੍ਹਾਂ ਦਾ ਕੁੱਲ ਅਨੁਭਵ ਬਿਹਤਰ ਬਣਦਾ ਹੈ।

### RAG: ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ ਬਣਾਮ ਟੂਲ

ਰੀਟਰੀਵਲ-ਅੱਗਮੈਂਟਡ ਜਨਰੇਸ਼ਨ (RAG) ਦੋਹਾਂ ਹੀ ਇੱਕ ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ ਅਤੇ ਏਆਈ ਏਜੰਟਜ਼ ਦੇ ਵਿਕਾਸ ਵਿੱਚ ਇੱਕ ਟੂਲ ਹੋ ਸਕਦਾ ਹੈ। ਇਹ ਦੋਨਾਂ ਵਿੱਚ ਫਰਕ ਸਮਝਣਾ ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟਾਂ ਵਿੱਚ RAG ਨੂੰ ਜ਼ਿਆਦਾ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਢੰਗ ਨਾਲ ਵਰਤਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ।

#### RAG ਇੱਕ ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ ਵਜੋਂ

**ਇਹ ਕੀ ਹੈ?**

- ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ ਵਜੋਂ, RAG ਵਿੱਚ ਵਿਸ਼ੇਸ਼ ਪੁੱਛਗਿੱਛਾਂ ਜਾਂ ਪ੍ਰਾਂਪਟ ਤਿਆਰ ਕਰਨਾ ਸ਼ਾਮਲ ਹੈ ਜੋ ਵੱਡੇ ਡੇਟਾ ਬੇਸ ਜਾਂ ਕੋਰਪਸ ਤੋਂ ਸਬੰਧਤ ਜਾਣਕਾਰੀ ਲੱਭਣ ਲਈ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਦਿੰਦੇ ਹਨ। ਇਸ ਜਾਣਕਾਰੀ ਨੂੰ ਫਿਰ ਜਵਾਬ ਜਾਂ ਕਿਰਿਆਵਾਂ ਬਣਾਉਣ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।

**ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ:**

1. **ਪ੍ਰਾਂਪਟ ਤਿਆਰ ਕਰੋ**: ਕਾਰਜ ਜਾਂ ਉਪਭੋਗਤਾ ਦੇ ਇੰਪੁੱਟ ਅਨੁਸਾਰ ਚੰਗੇ ਢੰਗ ਨਾਲ ਸੱਜੇ ਪ੍ਰਾਂਪਟ ਜਾਂ ਪੁੱਛਗਿੱਛ ਬਨਾਓ।
2. **ਜਾਣਕਾਰੀ ਲੱਭੋ**: ਪ੍ਰਾਂਪਟਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਮੌਜੂਦਾ ਗਿਆਨ ਭੰਡਾਰ ਜਾਂ ਡੇਟਾ ਸੈੱਟ ਵਿਚੋਂ ਲੋੜੀਂਦੀ ਜਾਣਕਾਰੀ ਖੰਗਾਲੋ।
3. **ਜਵਾਬ ਬਣਾਉ**: ਪ੍ਰਾਪਤ ਜਾਣਕਾਰੀ ਨੂੰ ਜਨਰਟਿਵ ਏਆਈ ਮਾਡਲ ਨਾਲ ਜੋੜ ਕੇ ਵਿਆਪਕ ਅਤੇ ਸੰਦਰਭ ਸਹੀ ਜਵਾਬ ਤਿਆਰ ਕਰੋ।

**ਟਰੇਵਲ ਏਜੰਟ ਵਿੱਚ ਉਦਾਹਰਨ:**

- ਉਪਭੋਗਤਾ ਇੰਪੁੱਟ: "ਮੈਂ ਪੈਰਿਸ ਵਿੱਚ ਮਿਊਜ਼ੀਅਮ ਦੇਖਣਾ ਚਾਹੁੰਦਾ ਹਾਂ।"
- ਪ੍ਰਾਂਪਟ: "ਪੈਰਿਸ ਦੇ ਸਿਖਰਲੇ ਮਿਊਜ਼ੀਅਮ ਲੱਭੋ।"
- ਪ੍ਰਾਪਤ ਜਾਣਕਾਰੀ: ਲੂਵਰ ਮਿਊਜ਼ੀਅਮ, ਮਿਊਜ਼ੇ ਦ'ਆਰਸੇ ਆਦਿ ਦੇ ਵੇਰਵੇ।
- ਜਨਰੇਟ ਕੀਤੇ ਜਵਾਬ: "ਇੱਥੇ ਪੈਰਿਸ ਦੇ ਕੁਝ ਟਾਪ ਮਿਊਜ਼ੀਅਮ ਹਨ: ਲੂਵਰ ਮਿਊਜ਼ੀਅਮ, ਮਿਊਜ਼ੇ ਦ'ਆਰਸੇ, ਅਤੇ ਸੈਂਟਰ ਪੋਮਪਿਡੂ।"

#### RAG ਇੱਕ ਟੂਲ ਵਜੋਂ

**ਇਹ ਕੀ ਹੈ?**

- ਟੂਲ ਵਜੋਂ, RAG ਇੱਕ ਐਸਾ ਇੰਟਿਗਰੇਟਡ ਸਿਸਟਮ ਹੈ ਜੋ ਖੋਜ ਅਤੇ ਜਨਰੇਸ਼ਨ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਆਟੋਮੇਟਿਕ ਕਰਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਡਿਵੈਲਪਰਾਂ ਨੂੰ ਹਰ ਕਵੈਰੀ ਲਈ ਹੱਥੋਂ ਪ੍ਰਾਂਪਟ ਬਣਾਉਣ ਦੇ ਬਿਨਾਂ ਜਟਿਲ ਏਆਈ ਕਾਰਜਖੇਤਰ ਲਾਗੂ ਕਰਨਾ ਆਸਾਨ ਹੋ ਜਾਂਦਾ ਹੈ।

**ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ:**

1. **ਇੰਟਿਗ੍ਰੇਸ਼ਨ**: RAG ਨੂੰ ਏਆਈ ਏਜੰਟ ਦੇ ਆਰਕੀਟੈਕਚਰ ਵਿੱਚ ਸ਼ਾਮਿਲ ਕਰਨਾ, ਜਿਸ ਨਾਲ ਇਹ ਖੋਜ ਅਤੇ ਜਨਰੇਸ਼ਨ ਕਾਰਜਾਂ ਨੂੰ ਆਪਣਾ ਆਪ ਸੰਭਾਲ ਸਕੇ।
2. **ਆਟੋਮੇਸ਼ਨ**: ਟੂਲ ਸਾਰੇ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਸੁਚਾਰੂ ਕਰਦਾ ਹੈ, ਉਪਭੋਗਤਾ ਦਾ ਇੰਪੁੱਟ ਪ੍ਰਾਪਤ ਕਰਕੇ ਆਖਰੀ ਜਵਾਬ ਤਿਆਰ ਕਰਨ ਤੱਕ, ਹਰ ਕਦਮ ਲਈ ਵੱਖਰੇ ਪ੍ਰਾਂਪਟ ਦੀ ਲੋੜ ਨਹੀਂ ਰਹਿੰਦੀ।
3. **ਦੱਖਲ**: ਇਸ ਨਾਲ ਏਜੰਟ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਸੁਧਰਦਾ ਹੈ ਕਿਉਂਕਿ ਖੋਜ ਅਤੇ ਜਨਰੇਸ਼ਨ ਪ੍ਰਕਿਰਿਆ ਠੀਕ ਅਤੇ ਚੁਸਤ ਹੁੰਦੀ ਹੈ।

**ਟਰੇਵਲ ਏਜੰਟ ਵਿੱਚ ਉਦਾਹਰਨ:**

- ਉਪਭੋਗਤਾ ਇੰਪੁੱਟ: "ਮੈਂ ਪੈਰਿਸ ਵਿੱਚ ਮਿਊਜ਼ੀਅਮ ਦੇਖਣਾ ਚਾਹੁੰਦਾ ਹਾਂ।"
- RAG ਟੂਲ: ਖੁਦ ਬਖੁਦ ਮਿਊਜ਼ੀਅਮ ਬਾਰੇ ਜਾਣਕਾਰੀ ਲੱਭਦਾ ਹੈ ਅਤੇ ਜਵਾਬ ਤਿਆਰ ਕਰਦਾ ਹੈ।
- ਜਨਰੇਟ ਕੀਤੇ ਜਵਾਬ: "ਇੱਥੇ ਪੈਰਿਸ ਦੇ ਕੁਝ ਟਾਪ ਮਿਊਜ਼ੀਅਮ ਹਨ: ਲੂਵਰ ਮਿਊਜ਼ੀਅਮ, ਮਿਊਜ਼ੇ ਦ'ਆਰਸੇ, ਅਤੇ ਸੈਂਟਰ ਪੋਮਪਿਡੂ।"

### ਤੁਲਨਾ

| ਪਹਿਰੂ                 | ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ                                      | ਟੂਲ                                                   |
|-----------------------|--------------------------------------------------------|--------------------------------------------------------|
| **ਮੈਨੁਅਲ ਵਰਸਜ਼ ਆਟੋਮੈਟਿਕ** | ਹਰ ਪੁੱਛਗਿੱਛ ਲਈ ਹੱਥੋਂ ਪ੍ਰਾਂਪਟ ਬਣਾਉਣ।                      | ਖੋਜ ਅਤੇ ਜਨਰੇਸ਼ਨ ਲਈ ਆਟੋਮੇਟਿਕ ਪ੍ਰਕਿਰਿਆ।                  |
| **ਕੰਟਰੋਲ**           | ਖੋਜ ਪ੍ਰਕਿਰਿਆ 'ਤੇ ਜ਼ਿਆਦਾ ਨਿਯੰਤਰਣ ਦਿੰਦਾ ਹੈ।            | ਖੋਜ ਅਤੇ ਜਨਰੇਸ਼ਨ ਨੂੰ ਸੁਚਾਰੂ ਅਤੇ ਆਟੋਮੈਟਿਕ ਬਨਾਉਂਦਾ ਹੈ।    |
| **ਲਚੀਲਾਪਣ**          | ਵਿਸ਼ੇਸ਼ ਜ਼ਰੂਰਤਾਂ ਲਈ ਕਸਟਮਾਈਜ਼ਡ ਪ੍ਰਾਂਪਟ ਬਣਾਉਣ ਦੀ ਆਗਿਆ।| ਵੱਡੀ ਪੱਧਰੀ ਲਾਗੂ ਕਰਨ ਲਈ ਜ਼ਿਆਦਾ ਪ੍ਰਭਾਵਸ਼ਾਲੀ।          |
| **ਜਟਿਲਤਾ**            | ਪ੍ਰਾਂਪਟਾਂ ਦੀ ਬਣਾਉਟ ਅਤੇ ਸੁਧਾਰ ਕਰਨ ਦੀ ਲੋੜ।                  | ਏਆਈ ਏਜੰਟ ਦੇ ਆਰਕੀਟੈਕਚਰ ਵਿੱਚ ਆਸਾਨ ਸ਼ਾਮਿਲ।               |

### ਕਾਰਗੁਜ਼ਾਰੀ ਉਦਾਹਰਨ

**ਪ੍ਰਾਂਪਟਿੰਗ ਤਕਨੀਕ ਦਾ ਉਦਾਹਰਨ:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**ਟੂਲ ਉਦਾਹਰਨ:**

```python
class Travel_Agent:
    def __init__(self):
        self.rag_tool = RAGTool()

    def get_museums_in_paris(self):
        user_input = "I want to visit museums in Paris."
        response = self.rag_tool.retrieve_and_generate(user_input)
        return response

travel_agent = Travel_Agent()
museums = travel_agent.get_museums_in_paris()
print("Top Museums in Paris:", museums)
```

### ਸੰਬੰਧਿਤਤਾ ਦਾ ਮੁਲਾਂਕਣ

ਸੰਬੰਧਿਤਤਾ ਦਾ ਮੁਲਾਂਕਣ AI ਏਜੰਟ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਦਾ ਉਹ ਅਹੰਕਾਰਪੂਰਕ ਪਹਿਰੂ ਹੈ ਜਿਥੇ ਇਹ ਸੁਨਿਸ਼ਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਕਿ ਏਜੰਟ ਵੱਲੋਂ ਖੋਜੀ ਅਤੇ ਜਨਰੇਟ ਕੀਤੀ ਜਾਣਕਾਰੀ ਉਪਯੋਗੀ, ਸਹੀ ਅਤੇ ਯੋਗ ਹੈ। ਆਓ ਵੇਖੀਏ ਕਿ AI ਏਜੰਟ ਵਿੱਚ ਸੰਬੰਧਿਤਤਾ ਦਾ ਕਿਵੇਂ ਮੁਲਾਂਕਣ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ, ਆਪਣੇ ਨਾਲ عملي ਉਦਾਹਰਨ ਅਤੇ ਤਕਨੀਕਾਂ ਸਮੇਤ।

#### ਸੰਬੰਧਿਤਤਾ ਮੁਲਾਂਕਣ ਦੇ ਮੁੱਖ ਆਇਡੀਆ

1. **ਸੰਦਰਭ ਜਾਣੂ ਹੋਣਾ**:
   - ਏਜੰਟ ਨੂੰ ਉਪਭੋਗਤਾ ਦੀ ਕਵੈਰੀ ਦੇ ਸੰਦਰਭ ਨੂੰ ਸਮਝਣਾ ਚਾਹੀਦਾ ਹੈ ਤਾਂ ਜੋ ਉਹ ਸਚ-ਸਮੇਂ ਦੀ ਲੋੜੀਂਦੀ ਜਾਣਕਾਰੀ ਲੱਭ ਸਕੇ।
   - ਉਦਾਹਰਨ: ਜੇ ਉਪਭੋਗਤਾ ਪੁੱਛਦਾ ਹੈ "ਪੈਰਿਸ ਵਿੱਚ ਸਭ ਤੋਂ ਵਧੀਆ ਰੈਸਟੋਰੈਂਟ ਕਿਹੜੇ ਹਨ?", ਤਾਂ ਏਜੰਟ ਕੋਲ ਉਪਭੋਗਤਾ ਦੀ ਪਸੰਦ, ਜਿਵੇਂ ਖਾਣੇ ਦੀ ਕਿਸਮ ਅਤੇ ਬਜਟ ਦੀ ਸੂਝ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ।

2. **ਸਹੀਗਤਾ**:
   - ਏਜੰਟ ਵੱਲੋਂ ਦਿੱਤੀ ਜਾਣਕਾਰੀ ਸੱਚੀ ਅਤੇ ਨਵੀਨਤਮ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ।
   - ਉਦਾਹਰਨ: ਕੁਝ ਹੋਰ ਸਮੇਂ ਪਹਿਲਾਂ ਬੰਦ ਹੋ ਚੁੱਕੇ ਜਾਂ ਭਰੋਸੇਯੋਗ ਸਮੀਖਿਆਵਾਂ ਨਾ ਵਾਲੇ ਰੈਸਟੋਰੈਂਟਾਂ ਦੀ ਸਿਫਾਰਿਸ਼ ਨਾ ਦੇਣਾ।

3. **ਉਪਭੋਗਤਾ ਦੀ ਮਕਸਦ ਸਮਝਣਾ**:
   - ਕਵੈਰੀ ਦੇ ਪਿੱਛੇ ਹੋਏ ਉਦੇਸ਼ ਨੂੰ ਸਮਝ ਕੇ ਸਭ ਤੋਂ ਵਧੀਆ ਸੂਚਨਾ ਦੇਣਾ।
   - ਉਦਾਹਰਨ: ਜੇ ਕੋਈ ਕਹੇ "ਮਹਿੰਗੇ ਨਹੀਂ ਪਰ ਵਧੀਆ ਹੋਟਲ", ਤਾਂ ਕਿਫਾਇਤੀ ਵਿਕਲਪ ਅੱਗੇ ਰੱਖਣੇ।

4. **ਫੀਡਬੈਕ ਲੂਪ**:
   - ਉਪਭੋਗਤਾ ਤੋਂ ਲਗਾਤਾਰ ਪ੍ਰਾਪਤ ਫੀਡਬੈਕ ਨੂੰ ਲੈ ਕੇ ਸੰਬੰਧਿਤਤਾ ਮੁਲਾਂਕਣ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਸੁਧਾਰਨਾ।
   - ਉਦਾਹਰਨ: ਪਿਛਲੇ ਸਿਫਾਰਸ਼ਾਂ 'ਤੇ ਉਪਭੋਗਤਾ ਦੀ ਪ੍ਰਤਿਕਿਰਿਆ ਨੂੰ ਸ਼ਾਮਿਲ ਕਰਕੇ ਅਗਲੀ ਦਫਾ ਹੋਰ ਵਧੀਆ ਸਿਫਾਰਸ਼ਾਂ ਦੇਣਾ।

#### ਸੰਬੰਧਿਤਤਾ ਮੁਲਾਂਕਣ ਲਈ ਤਕਨੀਕਾਂ

1. **ਸੰਬੰਧਿਤਤਾ ਸਕੋਰਿੰਗ**:
   - ਪ੍ਰਤੀ ਇਕ ਤੱਤ ਨੂੰ ਉਸ ਦੀ ਕਵੈਰੀ ਅਤੇ ਪਸੰਦਾਂ ਨਾਲ ਮਿਲਾਪ ਅਨੁਸਾਰ ਸੰਬੰਧਿਤਤਾ ਦਾ ਇੱਕ ਅੰਕ ਦਿੱਤਾ ਜਾਵੇ।
   - ਉਦਾਹਰਨ:

     ```python
     def relevance_score(item, query):
         score = 0
         if item['category'] in query['interests']:
             score += 1
         if item['price'] <= query['budget']:
             score += 1
         if item['location'] == query['destination']:
             score += 1
         return score
     ```

2. **ਫਿਲਟਰਿੰਗ ਅਤੇ ਰੈਂਕਿੰਗ**:
   - ਗਲਤ ਤੱਤਾਂ ਨੂੰ ਹਟਾ ਕੇ ਬਾਕੀ ਬਚੇ ਤੱਤਾਂ ਨੂੰ ਸਕੋਰ ਅਨੁਸਾਰ ਕ੍ਰਮਬੱਧ ਕੀਤਾ ਜਾਵੇ।
   - ਉਦਾਹਰਨ:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # ਬੇਹਤਰੀਨ 10 ਸੰਬੰਧਿਤ ਆਈਟਮ ਵਾਪਸ ਕਰੋ
     ```

3. **ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਪ੍ਰਕਿਰਿਆ (NLP)**:
   - NLP ਤਕਨੀਕਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਉਪਭੋਗਤਾ ਦੀ ਕਵੈਰੀ ਨੂੰ ਸਮਝਣਾ ਅਤੇ ਸੰਬੰਧਿਤ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨਾ।
   - ਉਦਾਹਰਨ:

     ```python
     def process_query(query):
         # ਉਪਭੋਗਤਾ ਦੀ ਪੁੱਛਗਿੱਛ ਤੋਂ ਮੁੱਖ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ NLP ਦੀ ਵਰਤੋਂ ਕਰੋ
         processed_query = nlp(query)
         return processed_query
     ```

4. **ਉਪਭੋਗਤਾ ਫੀਡਬੈਕ ਦਾ ਸਮਾਵੇਸ਼**:
   - ਦਿੱਤੀ ਗਈ ਸਿਫਾਰਸ਼ਾਂ ਤੇ ਉਪਭੋਗਤਾ ਦਾ ਫੀਡਬੈਕ ਇਕੱਠਾ ਕਰਕੇ ਅਗਲੀ ਵਾਰ ਦੇ ਮੁਲਾਂਕਣਾਂ ਵਿੱਚ ਸੰਸ਼ੋਧਨ ਕਰਨਾ।
   - ਉਦਾਹਰਨ:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### ਉਦਾਹਰਨ: ਟਰੇਵਲ ਏਜੰਟ ਵਿੱਚ ਸੰਬੰਧਿਤਤਾ ਮੁਲਾਂਕਣ

ਇੱਥੇ ਟਰੇਵਲ ਏਜੰਟ ਵਿੱਚ ਯਾਤਰਾ ਸਿਫਾਰਸ਼ਾਂ ਦੀ ਸੰਬੰਧਿਤਤਾ ਦਾ ਮੁਲਾਂਕਣ ਕਰਨ ਦੀ ਉਦਾਹਰਨ ਦਿੱਤੀ ਗਈ ਹੈ:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        ranked_hotels = self.filter_and_rank(hotels, self.user_preferences)
        itinerary = create_itinerary(flights, ranked_hotels, attractions)
        return itinerary

    def filter_and_rank(self, items, query):
        ranked_items = sorted(items, key=lambda item: self.relevance_score(item, query), reverse=True)
        return ranked_items[:10]  # ਸਿਰਫ਼ ਸਬ ਤੋਂ 10 ਸੰਗਤ ਸਾਹਮਣੇ ਆਉਣ ਵਾਲੀਆਂ ਚੀਜ਼ਾਂ ਵਾਪਸ ਕਰੋ

    def relevance_score(self, item, query):
        score = 0
        if item['category'] in query['interests']:
            score += 1
        if item['price'] <= query['budget']:
            score += 1
        if item['location'] == query['destination']:
            score += 1
        return score

    def adjust_based_on_feedback(self, feedback, items):
        for item in items:
            if item['name'] in feedback['liked']:
                item['relevance'] += 1
            if item['name'] in feedback['disliked']:
                item['relevance'] -= 1
        return items

# ਉਦਾਹਰਨ ਵਰਤੋਂ
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_items = travel_agent.adjust_based_on_feedback(feedback, itinerary['hotels'])
print("Updated Itinerary with Feedback:", updated_items)
```

### ਇਰਾਦਾ ਸਮਝ ਕੇ ਖੋਜ

ਇਰਾਦਾ ਸਮਝ ਕੇ ਖੋਜ ਕਰਨ ਵਿਚ ਉਪਭੋਗਤਾ ਦੀ ਕਵੈਰੀ ਦੇ ਪਿੱਛੇ ਲੁਕਿਆ ਗਿਆ ਮਕਸਦ ਜਾਂ ਉਦੇਸ਼ ਸਮਝਿਆ ਜਾਂਦਾ ਹੈ ਤਾਂ ਜੋ ਸਭ ਤੋਂ ਵਧੀਆ ਅਤੇ ਲਾਭਦਾਇਕ ਜਾਣਕਾਰੀ ਕੱਢੀ ਅਤੇ ਬਣਾਈ ਜਾ ਸਕੇ। ਇਹ ਸਿਰਫ ਸ਼ਬਦਾਂ ਨਾਲ ਮਿਲਾਉਣ ਤੋਂ ਅੱਗੇ ਜਾਂਦਾ ਹੈ ਅਤੇ ਉਪਭੋਗਤਾ ਦੀਆਂ ਅਸਲ ਜ਼ਰੂਰਤਾਂ ਅਤੇ ਸੰਦਰਭ ਨੂੰ ਸਮਝਣ 'ਤੇ ਧਿਆਨ ਦਿੰਦਾ ਹੈ।

#### ਇਰਾਦਾ ਸਮਝ ਕੇ ਖੋਜ ਵਾਲੇ ਮੁੱਖ ਆਇਡੀਆ

1. **ਉਪਭੋਗਤਾ ਦੀ ਇਰਾਦੇ ਦੀ ਸਮਝ**:
   - ਉਪਭੋਗਤਾ ਦੇ ਇਰਾਦੇ ਨੂੰ ਤਿੰਨ ਮੁੱਖ ਕਾਂਟੇਗਰੀਆਂ ਵਿੱਚ ਵੰਡਿਆ ਜਾ ਸਕਦਾ ਹੈ: ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਵਾਲਾ, ਨੈਵੀਗੇਸ਼ਨ ਕਰਨ ਵਾਲਾ, ਅਤੇ ਲੈਣ-ਦੇਣ ਕਰਨ ਵਾਲਾ।
     - **ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨਾ**: ਉਪਭੋਗਤਾ ਕਿਸੇ ਵਿਸ਼ੇ ਬਾਰੇ ਜਾਣਕਾਰੀ ਲੱਭ ਰਿਹਾ ਹੈ (ਜਿਵੇਂ, "ਪੈਰਿਸ ਦੇ ਸਭ ਤੋਂ ਵਧੀਆ ਮਿਊਜ਼ੀਅਮ ਕਿਹੜੇ ਹਨ?")।
     - **ਨੈਵੀਗੇਸ਼ਨ**: ਉਪਭੋਗਤਾ ਕਿਸੇ ਵਿਸ਼ੇਸ਼ ਵੈੱਬਸਾਈਟ ਜਾਂ ਪੰਨੇ ਨੂੰ ਜਾਣਾ ਚਾਹੁੰਦਾ ਹੈ (ਜਿਵੇਂ, "ਲੂਵਰ ਮਿਊਜ਼ੀਅਮ ਦਾ ਅਧਿਕਾਰਿਕ ਵੈੱਬਸਾਈਟ")।
     - **ਲੈਣ-ਦੇਣ**: ਉਪਭੋਗਤਾ ਕਿਧਰੇ ਟਿਕਟ ਬੁੱਕ ਕਰਨਾ ਜਾਂ ਖਰੀਦਦਾਰੀ ਕਰਨੀ ਹੈ (ਜਿਵੇਂ, "ਪੈਰਿਸ ਲਈ ਟਿਕਟ ਬੁਕ ਕਰੋ")।

2. **ਸੰਦਰਭ ਜਾਣੂ ਹੋਣਾ**:
   - ਉਪਭੋਗਤਾ ਦੀ ਪਹਿਲਾਂ ਦੀਆਂ ਇੰਟਰੈਕਸ਼ਨਾਂ, ਪਸੰਦਾਂ ਅਤੇ ਮੌਜੂਦਾ ਕਵੈਰੀ ਦੇ ਵਿਸ਼ੇਸ਼ ਵੇਰਵਿਆਂ ਦੀਆਂ ਜਾਣਕਾਰੀਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਉਦ ਦੇਸ਼ ਦੀ ਪਹਿਚਾਣ ਕਰਨਾ।

3. **ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਪ੍ਰਕਿਰਿਆ (NLP)**:
   - ਉਪਭੋਗਤਾ ਵੱਲੋਂ ਦਿੱਤੀਆਂ ਪ੍ਰਾਕ੍ਰਿਤਿਕ ਭਾਸ਼ਾ ਵਾਲੀਆਂ ਕਵੈਰੀਆਂ ਨੂੰ ਸਮਝਣ ਅਤੇ ਵਿਵੇਚਿਤ ਕਰਨ ਲਈ NLP ਤਕਨੀਕਾਂ ਵਰਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ। ਇਸ ਵਿੱਚ ਹਿੱਸੇ ਦੇ ਪਛਾਣ, ਭਾਵਨਾਤਮਕ ਮੁਲਾਂਕਣ ਅਤੇ ਕਵੈਰੀ ਪਾਰਸਿੰਗ ਸ਼ਾਮਿਲ ਹੈ।

4. **ਨਿੱਜੀ ਬਣਾਉਣਾ**:
   - ਉਪਭੋਗਤਾ ਦੇ ਇਤਿਹਾਸ, ਪਸੰਦਾਂ ਅਤੇ ਫੀਡਬੈਕ ਦੇ ਆਧਾਰ 'ਤੇ ਖੋਜ ਨਤੀਜਿਆਂ ਨੂੰ ਨਿੱਜੀ ਬਣਾਉਣਾ ਇਸ ਜਾਣਕਾਰੀ ਦੀ ਸੰਬੰਧਿਤਤਾ ਵਧਾਉਂਦਾ ਹੈ।

#### ਪ੍ਰਯੋਗਾਤਮਕ ਉਦਾਹਰਨ: ਟਰੇਵਲ ਏਜੰਟ ਵਿੱਚ ਇਰਾਦਾ ਸਮਝ ਕੇ ਖੋਜ

ਆਓ ਟਰੇਵਲ ਏਜੰਟ ਦਾ ਉਦਾਹਰਨ ਲੈ ਕੇ ਵੇਖੀਏ ਕਿ ਕਿਵੇਂ ਇਰਾਦਾ ਸਮਝ ਕੇ ਖੋਜ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ।

1. **ਉਪਭੋਗਤਾ ਦੀਆਂ ਪਸੰਦਾਂ ਇਕੱਠੀਆਂ ਕਰਨਾ**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **ਉਪਭੋਗਤਾ ਦਾ ਇਰਾਦਾ ਸਮਝਣਾ**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **ਸੰਦਰਭ ਜਾਣੂ ਹੋਣਾ**
   ```python
   def analyze_context(query, user_history):
       # ਮੌਜੂਦਾ ਕੁਐਰੀ ਨੂੰ ਉਪਭੋਗਤਾ ਦੇ ਇਤਿਹਾਸ ਨਾਲ ਜੋੜੋ ਤਾਂ ਜੋ ਸੰਦਰਭ ਸਮਝਿਆ ਜਾ ਸਕੇ
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **ਖੋਜੋ ਅਤੇ ਨਤੀਜੇ ਨਿੱਜੀਕਰਣ ਕਰੋ**

   ```python
   def search_with_intent(query, preferences, user_history):
       intent = identify_intent(query)
       context = analyze_context(query, user_history)
       if intent == "informational":
           search_results = search_information(query, preferences)
       elif intent == "navigational":
           search_results = search_navigation(query)
       elif intent == "transactional":
           search_results = search_transaction(query, preferences)
       personalized_results = personalize_results(search_results, user_history)
       return personalized_results

   def search_information(query, preferences):
       # ਜਾਣਕਾਰੀ ਦੇ ਉਦ্দেশ ਲਈ ਉਦਾਹਰਨ ਖੋਜ ਤਰਕਨੀਤੀ
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # ਨੈਵੀਗੇਸ਼ਨ ਪਰ ਉਦਾਹਰਨ ਖੋਜ ਤਰਕਨੀਤੀ
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # ਲੈਣ-ਦੇਣ ਦੇ ਉਦਦੇਸ਼ ਲਈ ਉਦਾਹਰਨ ਖੋਜ ਤਰਕਨੀਤੀ
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # ਉਦਾਹਰਨ ਨਿੱਜੀਕਰਨ ਤਰਕਨੀਤੀ
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # ਸਿਖਰ ਦੇ 10 ਨਿੱਜੀਕ੍ਰਿਤ ਨਤੀਜੇ ਵਾਪਸ ਕਰੋ
   ```

5. **ਮਿਸਾਲ ਵਰਤੋਂ**

   ```python
   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   user_history = ["Louvre Museum website", "Book flight to Paris"]
   query = "best museums in Paris"
   results = search_with_intent(query, preferences, user_history)
   print("Search Results:", results)
   ```

---

## 4. ਟੂਲ ਵਜੋਂ ਕੋਡ ਤਿਆਰ ਕਰਨਾ

ਕੋਡ ਤਿਆਰ ਕਰਨ ਵਾਲੇ ਏਜੰਟ AI ਮਾਡਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ ਜੋ ਕੋਡ ਲਿਖਦੇ ਅਤੇ ਚਲਾਉਂਦੇ ਹਨ, ਜਟਿਲ ਸਮੱਸਿਆਵਾਂ ਦਾ ਸਮਾਧਾਨ ਕਰਦੇ ਅਤੇ ਕਾਰਜਾਂ ਨੂੰ ਸਵੈਚਾਲਿਤ ਕਰਦੇ ਹਨ।

### ਕੋਡ ਤਿਆਰ ਕਰਨ ਵਾਲੇ ਏਜੰਟ

ਕੋਡ ਤਿਆਰ ਕਰਨ ਵਾਲੇ ਏਜੰਟ ਜਨਰੇਟਿਵ AI ਮਾਡਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੋਡ ਲਿਖਦੇ ਅਤੇ ਚਲਾਉਂਦੇ ਹਨ। ਇਹ ਏਜੰਟ ਵੱਖ ਵੱਖ ਪ੍ਰੋਗ੍ਰਾਮਿੰਗ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਕੋਡ ਤਿਆਰ ਕਰਕੇ ਅਤੇ ਚਲਾਕੇ, ਜਟਿਲ ਸਮੱਸਿਆਵਾਂ ਦਾ ਸਮਾਧਾਨ ਕਰ ਸਕਦੇ ਹਨ, ਕਾਰਜਾਂ ਨੂੰ ਸਵੈਚਾਲਿਤ ਕਰ ਸਕਦੇ ਹਨ ਅਤੇ ਕਿੱਮਤੀ ਜਾਣਕਾਰੀਆਂ ਪ੍ਰਦਾਨ ਕਰ ਸਕਦੇ ਹਨ।

#### ਵਿਆਵਹਾਰਿਕ ਕਾਰਜ

1. **ਸਵੈਚਾਲਿਤ ਕੋਡ ਤਿਆਰ ਕਰਨਾ**: ਖ਼ਾਸ ਕਾਰਜਾਂ ਲਈ ਕੋਡ ਸਨਿੱਪੇਟ ਜਿਵੇਂ ਡੇਟਾ ਵਿਸ਼ਲੇਸ਼ਣ, ਵੈੱਬ ਸਕ੍ਰੈਪਿੰਗ ਜਾਂ ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਤਿਆਰ ਕਰਨਾ।
2. **RAG ਵਜੋਂ SQL**: ਡੇਟਾਬੇਸ ਤੋਂ ਡੇਟਾ ਪ੍ਰਾਪਤ ਕਰਨ ਅਤੇ ਸੰਚਾਲਿਤ ਕਰਨ ਲਈ SQL ਕੈਵਰੀਆਂ ਦੀ ਵਰਤੋਂ ਕਰਨਾ।
3. **ਸਮੱਸਿਆ ਹੱਲ ਕਰਨਾ**: ਖ਼ਾਸ ਸਮੱਸਿਆਵਾਂ ਦਾ ਹੱਲ ਕਰਨ ਲਈ ਕੋਡ ਬਣਾਉਣਾ ਅਤੇ ਚਲਾਣਾ, ਉਦਾਹਰਨ ਲਈ ਅਲਗੋਰਿਦਮਾਂ ਦੀ ਅਪਟੀਮਾਈਜ਼ੇਸ਼ਨ ਜਾਂ ਡੇਟਾ ਵਿਸ਼ਲੇਸ਼ਣ।

#### ਉਦਾਹਰਨ: ਡੇਟਾ ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਕੋਡ ਤਿਆਰ ਕਰਨ ਵਾਲਾ ਏਜੰਟ

ਕਲਪਨਾ ਕਰੋ ਕਿ ਤੁਸੀਂ ਇੱਕ ਕੋਡ ਤਿਆਰ ਕਰਨ ਵਾਲਾ ਏਜੰਟ ਡਿਜ਼ਾਈਨ ਕਰ ਰਹੇ ਹੋ। ਇਹ ਇਸ ਤਰ੍ਹਾਂ ਕੰਮ ਕਰ ਸਕਦਾ ਹੈ:

1. **ਕਾਰਜ**: ਰੁਝਾਨ ਅਤੇ ਢਾਂਚਿਆਂ ਦੀ ਪਹਿਚਾਣ ਕਰਨ ਲਈ ਡੇਟਾ ਸੈੱਟ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨਾ।
2. **ਕਦਮ**:
   - ਡੇਟਾ ਸੈੱਟ ਨੂੰ ਡੇਟਾ ਵਿਸ਼ਲੇਸ਼ਣ ਟੂਲ ਵਿੱਚ ਲੋਡ ਕਰਨਾ।
   - ਡੇਟਾ ਨੂੰ ਛਾਣਨ ਅਤੇ ਸਮੂਹਬੱਧ ਕਰਨ ਲਈ SQL ਕੈਵਰੀਆਂ ਬਣਾਉਣਾ।
   - ਕੈਵਰੀਆਂ ਚਲਾਉਣਾ ਅਤੇ ਨਤੀਜੇ ਪ੍ਰਾਪਤ ਕਰਨਾ।
   - ਨਤੀਜਿਆਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਵਿਜੁਅਲਾਈਜ਼ੇਸ਼ਨ ਅਤੇ ਜਾਣਕਾਰੀਆਂ ਤਿਆਰ ਕਰਨਾ।
3. **ਲੋੜੀਂਦੇ ਸਰੋਤ**: ਡੇਟਾ ਸੈੱਟ, ਡੇਟਾ ਵਿਸ਼ਲੇਸ਼ਣ ਟੂਲ ਅਤੇ SQL ਸਮਰੱਥਾ।
4. **ਅਨੁਭਵ**: ਭੂਤਕਾਲ ਵਿਸ਼ਲੇਸ਼ਣ ਨਤੀਜਿਆਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਭਵਿੱਖ ਦੀਆਂ ਵਿਸ਼ਲੇਸ਼ਣਾਂ ਦੀ ਸ਼ੁੱਧਤਾ ਅਤੇ ਸੰਬੰਧਤਾ ਵਿੱਚ ਸੁਧਾਰ ਕਰਨਾ।

### ਯਾਤਰਾ ਏਜੰਟ ਲਈ ਕੋਡ ਤਿਆਰ ਕਰਨ ਵਾਲੇ ਏਜੰਟ ਦੀ ਉਦਾਹਰਨ

ਇਸ ਉਦਾਹਰਨ ਵਿੱਚ, ਅਸੀਂ ਇੱਕ ਕੋਡ ਤਿਆਰ ਕਰਨ ਵਾਲਾ ਏਜੰਟ, ਯਾਤਰਾ ਏਜੰਟ, ਤਿਆਰ ਕਰਾਂਗੇ ਜੋ ਵਰਤੋਂਕਾਰਾਂ ਦੀ ਯਾਤਰਾ ਯੋਜਨਾ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ। ਇਹ ਏਜੰਟ ਯਾਤਰਾ ਦੇ ਵਿਕਲਪ ਲੱਭਣ, ਨਤੀਜੇ ਛਾਣਨ ਅਤੇ ਜਨਰੇਟਿਵ AI ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਯਾਤਰਾ ਦਾ ਰੂਟ ਤਿਆਰ ਕਰਨ ਵਰਗੇ ਕੰਮ ਸੰਭਾਲ ਸਕਦਾ ਹੈ।

#### ਕੋਡ ਤਿਆਰ ਕਰਨ ਵਾਲੇ ਏਜੰਟ ਦਾ ਓਵਰਵਿਊ

1. **ਵਰਤੋਂਕਾਰ ਪਸੰਦ ਇਕੱਠਾ ਕਰਨਾ**: ਰਸਤਾ, ਯਾਤਰਾ ਦੀਆਂ ਤਾਰੀਖਾਂ, ਬਜਟ ਅਤੇ ਦਿਲਚਸਪੀਆਂ ਵਰਗੀਆਂ ਜਾਣਕਾਰੀਆਂ ਇਕੱਠਾ ਕਰਦਾ ਹੈ।
2. **ਡੇਟਾ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਕੋਡ ਜਨਰੇਟ ਕਰਨਾ**: ਉਡਾਣਾਂ, ਹੋਟਲਾਂ ਅਤੇ ਆਕਰਸ਼ਣਾਂ ਬਾਰੇ ਡੇਟਾ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਕੋਡ ਸਨਿੱਪੇਟ ਤਿਆਰ ਕਰਦਾ ਹੈ।
3. **ਤਿਆਰ ਕੀਤਾ ਕੋਡ ਚਲਾਉਣਾ**: ਅਸਲੀ ਸਮੇਂ ਜਾਣਕਾਰੀ ਲੈਣ ਲਈ ਕ੍ਰਿਤ ਕੋਡ ਚਲਾਉਂਦਾ ਹੈ।
4. **ਯਾਤਰਾ ਰੂਟ ਤਿਆਰ ਕਰਨਾ**: ਇਕੱਠਾ ਕੀਤੇ ਡੇਟਾ ਨੂੰ ਨਿੱਜੀਕ੍ਰਿਤ ਯਾਤਰਾ ਯੋਜਨਾ ਵਿੱਚ ਤਬਦੀਲ ਕਰਦਾ ਹੈ।
5. **ਫੀਡਬੈਕ ਅਨੁਸਾਰ ਸੋਧ ਕਰਨਾ**: ਵਰਤੋਂਕਾਰ ਦੇ ਫੀਡਬੈਕ ਨੂੰ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ ਅਤੇ ਜੇਕਰ ਜ਼ਰੂਰੀ ਹੋਵੇ ਤਾਂ ਨਤੀਜਿਆਂ ਨੂੰ ਉੱਤਮ ਬਣਾਉਣ ਲਈ ਕੋਡ ਨੂੰ ਦੁਬਾਰਾ ਤਿਆਰ ਕਰਦਾ ਹੈ।

#### ਕਦਮ ਬਾਈ ਕਦਮ ਲਾਗੂ ਕਰਨ ਦੀ ਪ੍ਰਕ੍ਰਿਆ

1. **ਵਰਤੋਂਕਾਰ ਪਸੰਦ ਇਕੱਠਾ ਕਰਨਾ**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **ਡੇਟਾ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਕੋਡ ਜਨਰੇਟ ਕਰਨਾ**

   ```python
   def generate_code_to_fetch_data(preferences):
       # ਉਦਾਹਰਣ: ਉਪਭੋਗਤਾ ਦੀ ਪਸੰਦਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਉਡਾਣਾਂ ਦੀ ਖੋਜ ਕਰਨ ਲਈ ਕੋਡ ਬਣਾਓ
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # ਉਦਾਹਰਣ: ਹੋਟਲ ਖੋਜਣ ਲਈ ਕੋਡ ਬਣਾਓ
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **ਤਿਆਰ ਕੀਤਾ ਕੋਡ ਚਲਾਉਣਾ**

   ```python
   def execute_code(code):
       # ਬਣਾਏ ਗਏ ਕੋਡ ਨੂੰ exec ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਚਲਾਓ
       exec(code)
       result = locals()
       return result

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   
   flight_code = generate_code_to_fetch_data(preferences)
   hotel_code = generate_code_to_fetch_hotels(preferences)
   
   flights = execute_code(flight_code)
   hotels = execute_code(hotel_code)

   print("Flight Options:", flights)
   print("Hotel Options:", hotels)
   ```

4. **ਯਾਤਰਾ ਰੂਟ ਤਿਆਰ ਕਰਨਾ**

   ```python
   def generate_itinerary(flights, hotels, attractions):
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   attractions = search_attractions(preferences)
   itinerary = generate_itinerary(flights, hotels, attractions)
   print("Suggested Itinerary:", itinerary)
   ```

5. **ਫੀਡਬੈਕ ਅਨੁਸਾਰ ਸੋਧ ਕਰਨਾ**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # ਉਪਭੋਗਤਾ ਫੀਡਬੈਕ ਦੇ ਅਧਾਰ 'ਤੇ ਪਸੰਦਾਂ ਨੂੰ ਢਾਲੋ
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # ਅਪਡੇਟ ਕੀਤੀਆਂ ਪਸੰਦਾਂ ਨਾਲ ਕੋਡ ਮੁੜ ਪੈਦਾ ਕਰੋ ਅਤੇ ਚਲਾਓ
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### ਵਾਤਾਵਰਨੀਅ ਸੂਝ ਅਤੇ ਤਰਕ ਦਾ ਲਾਭ ਉਠਾਉਣਾ

ਟੇਬਲ ਦੇ ਸਕੀਮਾ ਦੇ ਆਧਾਰ ‘ਤੇ ਤਰੱਕੀਵਾਰ ਪ੍ਰਸ਼ਨ ਤਿਆਰ ਕਰਨ ਦੀ ਪ੍ਰਕ੍ਰਿਆ ਵਿੱਚ ਵਾਤਾਵਰਨੀਅ ਸੂਝ ਅਤੇ ਤਰਕ ਦਾ ਇਸਤੇਮਾਲ ਕਰਕੇ ਬਹੁਤ ਸੁਧਾਰ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।

ਇਸਦਾ ਇੱਕ ਉਦਾਹਰਨ ਇੱਥੇ ਹੈ ਕਿ ਇਹ ਕਿਵੇਂ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ:

1. **ਸਕੀਮਾ ਨੂੰ ਸਮਝਣਾ**: ਸਿਸਟਮ ਟੇਬਲ ਦਾ ਸਕੀਮਾ ਸਮਝੇਗਾ ਅਤੇ ਇਸ ਜਾਣਕਾਰੀ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਪ੍ਰਸ਼ਨ ਤਿਆਰ ਕਰੇਗਾ।
2. **ਫੀਡਬੈਕ ਅਨੁਸਾਰ ਸੋਧ**: ਸਿਸਟਮ ਫੀਡਬੈਕ ਦੇ ਆਧਾਰ ‘ਤੇ ਵਰਤੋਂਕਾਰ ਪਸੰਦ ਵਿੱਚ ਸੋਧ ਕਰੇਗਾ ਅਤੇ ਉਸ ਸਕੀਮਾ ਵਿੱਚ ਉਹ ਖੇਤਰ ਕਿਹੜੇ ਹਨ ਜਿਨ੍ਹਾਂ ਨੂੰ ਅੱਪਡੇਟ ਕਰਨ ਦੀ ਲੋੜ ਹੈ, ਬਾਰੇ ਤਰਕ ਕਰੇਗਾ।
3. **ਪ੍ਰਸ਼ਨ ਤਿਆਰ ਕਰਨਾ ਅਤੇ ਚਲਾਉਣਾ**: ਨਵੇਂ ਪਸੰਦ ਦੇ ਆਧਾਰ ‘ਤੇ ਫਲਾਈਟ ਅਤੇ ਹੋਟਲ ਡੇਟਾ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਪ੍ਰਸ਼ਨ ਤਿਆਰ ਕਰਕੇ ਚਲਾਏ ਜਾਂਦੇ ਹਨ।

ਇਹ ਇੱਕ ਅਪਡੇਟ Python ਕੋਡ ਉਦਾਹਰਨ ਹੈ ਜੋ ਇਹ ਸੰਕਲਪ ਸ਼ਾਮਲ ਕਰਦਾ ਹੈ:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # ਉਪਭੋਗਤਾ ਫੀਡਬੈਕ ਦੇ ਅਧਾਰ 'ਤੇ ਪਸੰਦਾਂ ਨੂੰ ਢਾਲੋ
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # ਹੋਰ ਸਬੰਧਿਤ ਪਸੰਦਾਂ ਨੂੰ ਢਾਲਣ ਲਈ ਸਕੀਮਾ ਦੇ ਅਧਾਰ 'ਤੇ ਤਰਕ
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # ਸਕੀਮਾ ਅਤੇ ਫੀਡਬੈਕ ਦੇ ਅਧਾਰ 'ਤੇ ਪਸੰਦਾਂ ਨੂੰ ਢਾਲਣ ਲਈ ਕਸਟਮ ਲੌਜਿਕ
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # ਅਪਡੇਟ ਕੀਤੀਆਂ ਪਸੰਦਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਉਡਾਣ ਡੇਟਾ ਨੂੰ ਲੈਣ ਲਈ ਕੋਡ ਤਿਆਰ ਕਰੋ
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # ਅਪਡੇਟ ਕੀਤੀਆਂ ਪਸੰਦਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਹੋਟਲ ਡੇਟਾ ਨੂੰ ਲੈਣ ਲਈ ਕੋਡ ਤਿਆਰ ਕਰੋ
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # ਕੋਡ ਦੇ ਚਲਾਓ ਦਾ ਅਨੁਕਰਨ ਕਰੋ ਅਤੇ ਮੌਕ ਡੇਟਾ ਵਾਪਸ ਦਿਓ
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # ਉਡਾਣਾਂ, ਹੋਟਲਾਂ ਅਤੇ ਆਕਰਸ਼ਣਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਯਾਤਰਾ ਘਟਨਾ ਤਿਆਰ ਕਰੋ
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# ਉਦਾਹਰਣ ਸਕੀਮਾ
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# ਉਦਾਹਰਣ ਵਰਤੋਂ
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# ਅਪਡੇਟ ਕੀਤੀਆਂ ਪਸੰਦਾਂ ਨਾਲ ਕੋਡ ਮੁੜ ਤਿਆਰ ਕਰੋ ਅਤੇ ਚਲਾਓ
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### ਵਿਆਖਿਆ - ਫੀਡਬੈਕ ਆਧਾਰਿਤ ਬੁਕਿੰਗ

1. **ਸਕੀਮਾ ਸੂਝ**: `schema` ਡਿਕਸ਼ਨਰੀ ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਕਿਵੇਂ ਫੀਡਬੈਕ ਦੇ ਆਧਾਰ ‘ਤੇ ਪਸੰਦਾਂ ਵਿੱਚ ਸੋਧ ਕੀਤੀ ਜਾਵੇ। ਇਸ ਵਿੱਚ `favorites` ਤੇ `avoid` ਵਰਗੇ ਖੇਤਰ ਅਤੇ ਉਹਨਾਂ ਦੇ ਅਨੁਸਾਰ ਸੋਧ ਹਨ।
2. **ਪਸੰਦਾਂ ਵਿੱਚ ਸੋਧ (`adjust_based_on_feedback` ਮੈਥਡ)**: ਇਹ ਮੈਥਡ ਵਰਤੋਂਕਾਰ ਫੀਡਬੈਕ ਅਤੇ ਸਕੀਮਾ ਦੇ ਆਧਾਰ ‘ਤੇ ਪਸੰਦਾਂ ਵਿੱਚ ਸੋਧ ਕਰਦਾ ਹੈ।
3. **ਵਾਤਾਵਰਨ-ਅਧਾਰਿਤ ਸੋਧ (`adjust_based_on_environment` ਮੈਥਡ)**: ਇਹ ਮੈਥਡ ਸਕੀਮਾ ਅਤੇ ਫੀਡਬੈਕ ਅਨੁਸਾਰ ਸੋਧਨ ਦੀ ਵਿਅੱਖਿਆ ਕਰਦਾ ਹੈ।
4. **ਪ੍ਰਸ਼ਨ ਤਿਆਰ ਕਰਨਾ ਅਤੇ ਚਲਾਉਣਾ**: ਸਿਸਟਮ ਤਬਦੀਲ ਸ਼ੁਦਾ ਪਸੰਦਾਂ ਦੇ ਆਧਾਰ ਤੇ ਫਲਾਈਟ ਅਤੇ ਹੋਟਲ ਡੇਟਾ ਲੈਣ ਲਈ ਕੋਡ ਤਿਆਰ ਕਰਦਾ ਹੈ ਅਤੇ ਇਹ ਪ੍ਰਸ਼ਨ ਚਲਾਉਂਦਾ ਹੈ।
5. **ਯਾਤਰਾ ਦੀ ਯੋਜਨਾ ਤਿਆਰ ਕਰਨਾ**: ਸਿਸਟਮ ਨਵੀਂ ਉਡਾਣਾਂ, ਹੋਟਲ ਤੇ ਆਕਰਸ਼ਣ ਡੇਟਾ ਦੇ ਆਧਾਰ ‘ਤੇ ਅਪਡੇਟ ਕੀਤੀ ਯਾਤਰਾ ਯੋਜਨਾ ਬਣਾਉਂਦਾ ਹੈ।

ਵਾਤਾਵਰਨੀਅ-ਅਗਿਆਨਤਾ ਅਤੇ ਸਕੀਮਾ ਅਧਾਰਿਤ ਤਰਕ ਨਾਲ, ਇਸ ਤਰ੍ਹਾਂ ਸਿਸਟਮ ਜ਼ਿਆਦਾ ਸ਼ੁੱਧ ਅਤੇ ਸੰਬੰਧਿਤ ਪ੍ਰਸ਼ਨ ਤਿਆਰ ਕਰ ਸਕਦਾ ਹੈ, ਜੋ ਬਿਹਤਰ ਯਾਤਰਾ ਸਿਫਾਰਸ਼ਾਂ ਅਤੇ ਨਿੱਜੀਕ੍ਰਿਤ ਵਰਤੋਂਕਾਰ ਅਨੁਭਵ ਲਈ ਲੈ ਜਾਂਦਾ ਹੈ।

### Retrieval-Augmented Generation (RAG) ਤਕਨਾਲੋਜੀ ਵਜੋਂ SQL ਦੀ ਵਰਤੋਂ

SQL (Structured Query Language) ਡੇਟਾਬੇਸ ਨਾਲ ਸੰਚਾਰ ਕਰਨ ਲਈ ਇੱਕ ਸ਼ਕਤੀਸ਼ਾਲੀ ਟੂਲ ਹੈ। ਜਦੋਂ ਇਹ Retrieval-Augmented Generation (RAG) ਰਣਨੀਤੀ ਦਾ ਹਿੱਸਾ ਹੁੰਦਾ ਹੈ ਤਾਂ SQL ਡੇਟਾਬੇਸ ਤੋਂ ਸਬੰਧਤ ਡੇਟਾ ਲੈ ਕੇ AI ਏਜੰਟਾਂ ਵਿੱਚ ਜਵਾਬ ਜਾਂ ਕਾਰਵਾਈਆਂ ਬਣਾਉਂਦਾ ਹੈ। ਆਓ ਦੇਖੀਏ ਕਿ ਯਾਤਰਾ ਏਜੰਟ ਦੇ ਸੰਦਰਭ ਵਿੱਚ SQL ਕਿਵੇਂ RAG ਤਕਨਾਲੋਜੀ ਵਜੋਂ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ।

#### ਮੁੱਖ ਸੰਕਲਪ

1. **ਡੇਟਾਬੇਸ ਨਾਲ ਸੰਚਾਰ**:
   - SQL ਡੇਟਾਬੇਸ ਵਿੱਚ ਪ੍ਰਸ਼ਨਾਂ ਕਰਨ, ਸਬੰਧਤ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਅਤੇ ਡੇਟਾ ਨੂੰ ਸੰਚਾਲਿਤ ਕਰਨ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।
   - ਉਦਾਹਰਨ: ਯਾਤਰਾ ਡੇਟਾਬੇਸ ਵਿੱਚੋਂ ਉਡਾਣਾਂ, ਹੋਟਲ ਅਤੇ ਆਕਰਸ਼ਣਾਂ ਦੀ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨਾ।

2. **RAG ਨਾਲ ਇੰਟਿਗ੍ਰੇਸ਼ਨ**:
   - ਵਰਤੋਂਕਾਰ ਇਨਪੁੱਟ ਅਤੇ ਪਸੰਦਾਂ ਦੇ ਆਧਾਰ ‘ਤੇ SQL ਪ੍ਰਸ਼ਨ ਤਿਆਰ ਕਰਦੇ ਹਨ।
   - ਪ੍ਰਾਪਤ ਡੇਟਾ ਨਿੱਜੀਕ੍ਰਿਤ ਸਿਫਾਰਸ਼ਾਂ ਜਾਂ ਕਾਰਵਾਈਆਂ ਬਣਾਉਣ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।

3. **ਡਾਇਨਾਮਿਕ ਪ੍ਰਸ਼ਨ ਤਿਆਰ ਕਰਨਾ**:
   - AI ਏਜੰਟ ਸੰਦਰਭ ਅਤੇ ਵਰਤੋਂਕਾਰ ਦੀਆਂ ਜ਼ਰੂਰਤਾਂ ਦੇ ਅਨੁਸਾਰ ਡਾਇਨਾਮਿਕ SQL ਪ੍ਰਸ਼ਨ ਬਣਾਉਂਦਾ ਹੈ।
   - ਉਦਾਹਰਨ: ਬਜਟ, ਤਾਰੀਖਾਂ ਅਤੇ ਦਿਲਚਸਪੀਆਂ ਦੇ ਆਧਾਰ ‘ਤੇ ਨਤੀਜੇ ਛਾਣਨ ਲਈ SQL ਕੈਵਰੀਆਂ ਤਿਆਰ ਕਰਨਾ।

#### ਕਾਰਜ

- **ਸਵੈਚਾਲਿਤ ਕੋਡ ਤਿਆਰ ਕਰਨਾ**: ਖ਼ਾਸ ਕਾਰਜਾਂ ਲਈ ਕੋਡ ਸਨਿੱਪੇਟ(t) ਤਿਆਰ ਕਰਨਾ।
- **RAG ਵਜੋਂ SQL**: ਡੇਟਾ ਪ੍ਰਬੰਧਨ ਲਈ SQL ਪ੍ਰਸ਼ਨਾਂ ਦੀ ਵਰਤੋਂ ਕਰਨਾ।
- **ਸਮੱਸਿਆ ਹੱਲ**: ਸਮੱਸਿਆਵਾਂ ਦਾ ਹੱਲ ਕਰਨ ਲਈ ਕੋਡ ਬਣਾਉਣਾ ਅਤੇ ਚਲਾਉਣਾ।

**ਉਦਾਹਰਨ**:
ਡੇਟਾ ਵਿਸ਼ਲੇਸ਼ਣ ਏਜੰਟ:

1. **ਕਾਰਜ**: ਰੁਝਾਨ ਲੱਭਣ ਲਈ ਡੇਟਾ ਵਿਸ਼ਲੇਸ਼ਣ।
2. **ਕਦਮ**:
   - ਡੇਟਾ ਲੋਡ ਕਰਨਾ।
   - SQL ਕੈਵਰੀਆਂ ਤਿਆਰ ਕਰਨਾ।
   - ਕੈਵਰੀਆਂ ਚਲਾਉਣਾ ਅਤੇ ਨਤੀਜੇ ਪ੍ਰਾਪਤ ਕਰਨਾ।
   - ਵਿਜੁਅਲਾਈਜ਼ੇਸ਼ਨ ਅਤੇ ਸੂਝ-ਬੂਝ ਤਿਆਰ ਕਰਨਾ।
3. **ਸਰੋਤ**: ਡੇਟਾ ਐਕਸੈਸ, SQL ਸਮਰੱਥਾ।
4. **ਅਨੁਭਵ**: ਭਵਿੱਖ ਦੇ ਵਿਸ਼ਲੇਸ਼ਣਾਂ ਲਈ ਪਿਛਲੇ ਨਤੀਜਿਆਂ ਦੀ ਵਰਤੋਂ ਕਰਨਾ।

#### ਵਿਅਵਹਾਰਿਕ ਉਦਾਹਰਨ: ਯਾਤਰਾ ਏਜੰਟ ਵਿੱਚ SQL ਦੀ ਵਰਤੋਂ

1. **ਵਰਤੋਂਕਾਰ ਪਸੰਦ ਇਕੱਠਾ ਕਰਨਾ**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **SQL ਕੈਵਰੀਆਂ ਤਿਆਰ ਕਰਨਾ**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **SQL ਕੈਵਰੀਆਂ ਚਲਾਉਣਾ**

   ```python
   import sqlite3

   def execute_sql_query(query, database="travel.db"):
       connection = sqlite3.connect(database)
       cursor = connection.cursor()
       cursor.execute(query)
       results = cursor.fetchall()
       connection.close()
       return results
   ```

4. **ਸਿਫਾਰਸ਼ਾਂ ਤਿਆਰ ਕਰਨਾ**

   ```python
   def generate_recommendations(preferences):
       flight_query = generate_sql_query("flights", preferences)
       hotel_query = generate_sql_query("hotels", preferences)
       attraction_query = generate_sql_query("attractions", preferences)
       
       flights = execute_sql_query(flight_query)
       hotels = execute_sql_query(hotel_query)
       attractions = execute_sql_query(attraction_query)
       
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   itinerary = generate_recommendations(preferences)
   print("Suggested Itinerary:", itinerary)
   ```

#### SQL ਕੈਵਰੀਆਂ ਦੀ ਉਦਾਹਰਨ

1. **ਉਡਾਣ ਕੈਵਰੀ**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **ਹੋਟਲ ਕੈਵਰੀ**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **ਆਕਰਸ਼ਣ ਕੈਵਰੀ**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Retrieval-Augmented Generation (RAG) ਤਕਨਾਲੋਜੀ ਦੇ ਹਿੱਸੇ ਵਜੋਂ SQL ਦੀ ਵਰਤੋਂ ਕਰਕੇ, ਯਾਤਰਾ ਏਜੰਟ ਵਰਗੇ AI ਏਜੰਟ ਸਬੰਧਤ ਡੇਟਾ ਨੂੰ ਡਾਇਨਾਮਿਕਲੀ ਪ੍ਰਾਪਤ ਕਰ ਕੇ ਸ਼ੁੱਧ ਅਤੇ ਨਿੱਜੀਕ੍ਰਿਤ ਸਿਫਾਰਸ਼ਾਂ ਮੁਹੱਈਆ ਕਰਵਾ ਸਕਦੇ ਹਨ।

### ਮੈਟਾਕੌਗਨੀਸ਼ਨ ਦੀ ਉਦਾਹਰਨ

ਮੈਟਾਕੌਗਨੀਸ਼ਨ ਦੀ ਲਾਗੂ ਕਰਨ ਲਈ, ਆਓ ਇੱਕ ਸੂਖਮ ਏਜੰਟ ਬਣਾਈਏ ਜੋ *ਆਪਣੇ ਫੈਸਲੇ ਮਕੈਨਿਜ਼ਮ ’ਤੇ ਵਿਚਾਰ* ਕਰਦਾ ਹੋਵੇ ਸਮੱਸਿਆ ਹੱਲ ਕਰਦੇ ਸਮੇਂ। ਇਸ ਲਈ ਇੱਕ ਸਿਸਟਮ ਬਣਾਇਆ ਜਾਵੇ ਜੋ ਏਜੰਟ ਇੱਕ ਹੋਟਲ ਚੁਣਦਾ ਹੈ ਕਿੰਮਤ ਅਤੇ ਗੁਣਵੱਤਾ ਦੇ ਸੰਯੋਗ ਦੇ ਆਧਾਰ 'ਤੇ, ਪਰ ਫਿਰ ਆਪਣੀ ਤਰਕਸ਼ੀਲਤਾ ਦਾ ਮੁਲਾਂਕਣ ਕਰਦਾ ਹੈ ਅਤੇ ਜੇਕਰ ਗਲਤ ਜਾਂ ਸੁਤੰਤਰਿਤ ਚੋਣ ਕਰਦਾ ਹੈ ਤਾਂ ਆਪਣੀ ਰਣਨੀਤੀ ਸੋਧਦਾ ਹੈ।

ਇਸ ਨੂੰ ਇੱਕ ਸਾਦਾ ਉਦਾਹਰਨ ਰਾਹੀਂ ਮਾਡਲ ਕੀਤਾ ਗਿਆ ਹੈ ਜਿੱਥੇ ਏਜੰਟ ਕੀਮਤ ਅਤੇ ਗੁਣਵੱਤਾ ਦੇ ਸੰਯੋਗ ਦੇ ਆਧਾਰ ’ਤੇ ਹੋਟਲ ਚੁਣਦਾ ਹੈ, ਪਰ ਫਿਰ ਆਪਣੇ ਫੈਸਲਿਆਂ ’ਤੇ "ਵਿਚਾਰ" ਕਰਦਾ ਹੈ ਅਤੇ ਤਦਨੁਸਾਰ ਸੋਧ ਕਰਦਾ ਹੈ।

#### ਇਸ ਦਿਖਾਉਂਦਾ ਹੈ ਮੈਟਾਕੌਗਨੀਸ਼ਨ:

1. **ਸ਼ੁਰੂਆਤੀ ਫੈਸਲਾ**: ਏਜੰਟ ਸਭ ਤੋਂ ਸਸਤਾ ਹੋਟਲ ਚੁਣੇਗਾ ਬਿਨਾਂ ਗੁਣਵੱਤਾ ਪ੍ਰਭਾਵ ਸਮਝਦੇ ਹੋਏ।
2. **ਵਿਚਾਰ ਅਤੇ ਮੁਲਾਂਕਣ**: ਪਹਿਲੀ ਚੋਣ ਤੋਂ ਬਾਅਦ, ਏਜੰਟ ਇਹ ਜਾਣਚਦਾ ਹੈ ਕਿ ਕੀ ਉਹ ਹੋਟਲ "ਖਰਾਬ" ਸੀ, ਵਰਤੋਂਕਾਰ ਫੀਡਬੈਕ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋਏ। ਜੇ ਹੋਟਲ ਦੀ ਗੁਣਵੱਤਾ ਘੱਟ ਮਿਲਦੀ ਹੈ, ਤਾਂ ਅਪਣਾ ਤਰਕ ਵਾਪਸ ਜਾਂਚਦਾ ਹੈ।
3. **रणਨੀਤੀ ਸੋਧਣਾ**: ਏਜੰਟ ਆਪਣੀ ਰਣਨੀਤੀ ਵਿਚ ਸੋਧ ਕਰਦਾ ਹੈ ਅਤੇ "ਸਸਤਾ" ਤੋਂ "ਉੱਚ ਗੁਣਵੱਤਾ" 'ਤੇ ਸਵਿੱਚ ਕਰਦਾ ਹੈ, ਇਸ ਤਰ੍ਹਾਂ ਭਵਿੱਖ ਦੇ ਫੈਸਲੇ ਬਿਹਤਰ ਬਣਾਉਦਾ ਹੈ।

ਇੱਥੇ ਇੱਕ ਉਦਾਹਰਨ ਹੈ:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # ਪਹਿਲਾਂ ਚੁਣੇ ਹੋਏ ਹੋਟਲਾਂ ਨੂੰ ਸੰਭਾਲਦਾ ਹੈ
        self.corrected_choices = []  # ਸਹੀ ਕੀਤੀਆਂ ਚੋਣਾਂ ਨੂੰ ਸਟੋਰ ਕਰਦਾ ਹੈ
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # ਉਪਲਬਧ ਰਣਨੀਤੀਆਂ

    def recommend_hotel(self, hotels, strategy):
        """
        Recommend a hotel based on the chosen strategy.
        The strategy can either be 'cheapest' or 'highest_quality'.
        """
        if strategy == 'cheapest':
            recommended = min(hotels, key=lambda x: x['price'])
        elif strategy == 'highest_quality':
            recommended = max(hotels, key=lambda x: x['quality'])
        else:
            recommended = None
        self.previous_choices.append((strategy, recommended))
        return recommended

    def reflect_on_choice(self):
        """
        Reflect on the last choice made and decide if the agent should adjust its strategy.
        The agent considers if the previous choice led to a poor outcome.
        """
        if not self.previous_choices:
            return "No choices made yet."

        last_choice_strategy, last_choice = self.previous_choices[-1]
        # ਆਓ ਧਾਰਣਾ ਕਰੀਏ ਕਿ ਸਾਡੇ ਕੋਲ ਕੁਝ ਉਪਭੋਗਤਾ ਫੀਡਬੈਕ ਹੈ ਜੋ ਸਾਨੂੰ ਦੱਸਦਾ ਹੈ ਕਿ ਆਖਰੀ ਚੋਣ ਚੰਗੀ ਸੀ ਜਾਂ ਨਹੀਂ
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # ਜੇ ਪਿਛਲੀ ਚੋਣ ਅਸੰਤੋਸ਼ਜਨਕ ਸੀ ਤਾਂ ਰਣਨੀਤੀ ਨੂੰ ਠੀਕ ਕਰੋ
            new_strategy = 'highest_quality' if last_choice_strategy == 'cheapest' else 'cheapest'
            self.corrected_choices.append((new_strategy, last_choice))
            return f"Reflecting on choice. Adjusting strategy to {new_strategy}."
        else:
            return "The choice was good. No need to adjust."

    def get_user_feedback(self, hotel):
        """
        Simulate user feedback based on hotel attributes.
        For simplicity, assume if the hotel is too cheap, the feedback is "bad".
        If the hotel has quality less than 7, feedback is "bad".
        """
        if hotel['price'] < 100 or hotel['quality'] < 7:
            return "bad"
        return "good"

# ਹੋਟਲਾਂ ਦੀ ਸੂਚੀ ਦੀ ਨਕਲ (ਕੀਮਤ ਅਤੇ ਗੁਣਵੱਤਾ)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# ਇੱਕ ਏਜੰਟ ਬਣਾਓ
agent = HotelRecommendationAgent()

# ਪਹਿਲਾ ਕਦਮ: ਏਜੰਟ "ਸਭ ਤੋਂ ਸਸਤਾ" ਰਣਨੀਤੀ ਵਰਤ ਕੇ ਹੋਟਲ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਦਾ ਹੈ
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# ਦੂਜਾ ਕਦਮ: ਏਜੰਟ ਚੋਣ 'ਤੇ ਵਿਚਾਰ ਕਰਦਾ ਹੈ ਅਤੇ ਜ਼ਰੂਰਤ ਹੋਣ ਤੇ ਰਣਨੀਤੀ ਨੂੰ ਬਦਲਦਾ ਹੈ
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# ਤੀਜਾ ਕਦਮ: ਏਜੰਟ ਮੁੜ ਸਿਫਾਰਸ਼ ਕਰਦਾ ਹੈ, ਇਸ ਵਾਰੀ ਬਦਲੀ ਹੋਈ ਰਣਨੀਤੀ ਦੀ ਵਰਤੋਂ ਕਰਦਿਆਂ
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### ਏਜੰਟਾਂ ਦੀ ਮੈਟਾਕੌਗਨੀਸ਼ਨ ਸਮਰੱਥਾਵਾਂ

ਇਸ ਵਿੱਚ ਜ਼ਰੂਰੀ ਗੱਲ ਏਜੰਟ ਦੀ ਸਮਰੱਥਾ ਹੈ:
- ਪਿਛਲੇ ਫੈਸਲਿਆਂ ਅਤੇ ਤਰਕਸ਼ੀਲਤਾ ਦਾ ਮੁਲਾਂਕਣ ਕਰਨਾ।
- ਉਸ ਵਿਚਾਰ ਅਨੁਸਾਰ ਆਪਣੀ ਰਣਨੀਤੀ ਸੋਧਣਾ, ਜਿਹਨੂੰ ਮੈਟਾਕੌਗਨੀਸ਼ਨ ਕਹਿੰਦੇ ਹਨ।

ਇਹ ਮੈਟਾਕੌਗਨੀਸ਼ਨ ਦਾ ਇੱਕ ਆਸਾਨ ਰੂਪ ਹੈ ਜਿੱਥੇ ਸਿਸਟਮ ਅੰਦਰੂਨੀ ਫੀਡਬੈਕ ਦੇ ਆਧਾਰ ਤੇ ਆਪਣੀ ਤਰਕਸ਼ੀਲਤਾ ਸੋਧ ਸਕਦਾ ਹੈ।

### ਨਤੀਜਾ

ਮੈਟਾਕੌਗਨੀਸ਼ਨ ਇੱਕ ਸ਼ਕਤੀਸ਼ਾਲੀ ਸੰਦ ਹੈ ਜੋ AI ਏਜੰਟਾਂ ਦੀ ਸਮਰੱਥਾ ਵਿੱਚ ਕਾਫ਼ੀ ਵਾਧਾ ਕਰ ਸਕਦਾ ਹੈ। ਮੈਟਾਕੌਗਨੀਸ਼ਨ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਸ਼ਾਮਲ ਕਰਕੇ, ਤੁਸੀਂ ਹੋਰ ਬੁੱਧੀਮਾਨ, ਲਚਕੀਲੇ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਏਜੰਟ ਡਿਜ਼ਾਈਨ ਕਰ ਸਕਦੇ ਹੋ। ਮੈਟਾਕੌਗਨੀਸ਼ਨ ਦੁਨੀਆ ਦਾ ਹੋਰ ਖੋਜ ਕਰਨ ਲਈ ਵਾਧੂ ਸਰੋਤਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ।

### ਮੈਟਾਕੌਗਨੀਸ਼ਨ ਡਿਜ਼ਾਈਨ ਪੈਟਰਨ ਬਾਰੇ ਹੋਰ ਸਵਾਲ?

[Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) ਨਾਲ ਜੁੜੋ, ਹੋਰ ਸਿੱਖਣ ਵਾਲਿਆਂ ਨਾਲ ਮਿਲੋ, ਆਫਿਸ ਘੰਟਿਆਂ ਵਿੱਚ ਸ਼ਿਰਕਤ ਕਰੋ ਅਤੇ ਆਪਣੇ AI ਏਜੰਟ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਲਵੋ।

## ਪਿਛਲਾ ਸਬਕ

[ਮਲਟੀ-ਏਜੰਟ ਡਿਜ਼ਾਈਨ ਪੈਟਰਨ](../08-multi-agent/README.md)

## ਅਗਲਾ ਸਬਕ

[ਉਤਪਾਦਨ ਵਿੱਚ AI ਏਜੰਟ](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਸਰਕਾਰੀ ਖੰਡਨ**:  
ਇਹ ਦਸਤਾਵੇਜ਼ ਏ.ਆਈ. ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਨੁਵਾਦ ਕੀਤਾ ਗਿਆ ਹੈ। ਅਸੀਂ ਸਹੀਅਤਾ ਲਈ ਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਹਾਂ, ਪਰ ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਆਟੋਮੈਟਿਕ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਲੀਅਤ ਦੀ ਕਮੀ ਹੋ ਸਕਦੀ ਹੈ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਉਸਦੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਪ੍ਰਮਾਣਿਕ ਸਰੋਤ ਵਜੋਂ ਧਿਆਨ ਵਿੱਚ ਰੱਖਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਮਹੱਤਵਪੂਰਣ ਜਾਣਕਾਰੀ ਲਈ ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੀ ਵਰਤੋਂ ਤੋਂ ਉਪਜੀ ਕੋਈ ਭੁੱਲ-ਭੁਲਾਇਆ ਜਾਂ ਗਲਤਫਹਮੀ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->