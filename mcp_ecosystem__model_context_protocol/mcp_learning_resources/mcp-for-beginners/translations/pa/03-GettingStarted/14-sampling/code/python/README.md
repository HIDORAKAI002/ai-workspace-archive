# ਸੈਂਪਲ ਚਲਾਓ

## ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਬਣਾਓ

```sh
python -m venv venv
source ./venv/bin/activate
```

## ਡਿਪੈਂਡੇਨਸੀਆਂ ਇੰਸਟਾਲ ਕਰੋ

```sh
pip install "mcp[cli]"
```

## ਸਰਵਰ ਚਲਾਓ

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot ਅਤੇ VS ਕੋਡ ਨਾਲ ਸਰਵਰ ਦੀ ਜਾਂਚ ਕਰੋ

mcp.json ਵਿੱਚ ਇੰਟ੍ਰੀ ਇਸ ਤਰ੍ਹਾਂ ਸ਼ਾਮਲ ਕਰੋ:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

ਪੱਕਾ ਕਰੋ ਕਿ ਤੁਸੀਂ ਸਰਵਰ 'ਤੇ "start" ਤੇ ਕਲਿਕ ਕਰਦੇ ਹੋ।

GitHub Copilot ਵਿੱਚ ਹੇਠਾਂ ਦਿੱਤਾ ਪ੍ਰਾਂਪਟ ਪੇਸਟ ਕਰੋ:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

ਪਹਿਲੀ ਵਾਰੀ ਤੁਹਾਨੂੰ ਪੁੱਛਿਆ ਜਾਏਗਾ ਕਿ ਕੀ ਤੁਸੀਂ Sampling ਐਕਸ਼ਨ ਸਵੀਕਾਰ ਕਰਦੇ ਹੋ, ਫਿਰ ਤੁਹਾਨੂੰ "create_blog" ਚਲਾਉਣ ਲਈ ਸਾਧਨ ਸਵੀਕਾਰ ਕਰਨ ਲਈ ਕਿਹਾ ਜਾਏਗਾ। ਤੁਸੀਂ ਇਸ ਤਰ੍ਹਾਂ ਦਾ ਜਵਾਬ ਵੇਖੋਗੇ:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋक्ति**:  
ਇਹ ਦਸਤਾਵੇਜ਼ AI ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਨਾਲ ਅਨੁਵਾਦ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਅਤ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਦਿਓ ਕਿ ਆਟੋਮੈਟਿਕ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮਰਥਤਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਜਿਸ ਦੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਹੈ, ਉਸ ਨੂੰ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜ਼ਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀ ਕਿਸੇ ਵੀ ਗਲਤਫਹਮੀ ਜਾਂ ਭ੍ਰਮ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->