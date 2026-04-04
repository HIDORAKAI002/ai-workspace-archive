# Run di sample

## Create virtual environment

```sh
python -m venv venv
source ./venv/bin/activate
```

## Install dependencies

```sh
pip install "mcp[cli]"
```

## Run di server

```sh
uvicorn server:app --port 8000
```

## Test di server wit GitHub Copilot and VS Code

Add di entry to mcp.json lek dis:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Make sure say you click "start" on top di server.

For GitHub Copilot paste di following prompt:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Di first time dem go ask you whether you wan accept Sampling action, den dem go ask you make you accept di tool to run "create_blog". You suppose see response wey be like:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even though we try make e accurate, abeg sabi say automated translations fit get some mistakes or wrong parts. Di original document wey e dey for im correct language na di true correct source. If na serious matter, e better make person wey sabi do professional human translation do am. We no go responsible if person no understand well or if person misinterpret because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->