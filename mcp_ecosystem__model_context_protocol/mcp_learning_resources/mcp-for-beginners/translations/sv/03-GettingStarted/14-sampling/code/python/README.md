# Kör exemplet

## Skapa en virtuell miljö

```sh
python -m venv venv
source ./venv/bin/activate
```

## Installera beroenden

```sh
pip install "mcp[cli]"
```

## Kör servern

```sh
uvicorn server:app --port 8000
```

## Testa servern med GitHub Copilot och VS Code

Lägg till posten i mcp.json på följande sätt:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Se till att du klickar på "start" på servern.

Klistra in följande prompt i GitHub Copilot:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Första gången kommer du att bli tillfrågad om du vill acceptera en Sampling-åtgärd, sedan kommer du att bli tillfrågad att acceptera verktyget för att köra "create_blog". Du bör se ett svar som liknar:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet bör du vara medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår från användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->