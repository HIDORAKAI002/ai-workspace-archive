# Voer de voorbeeld uit

## Maak virtuele omgeving aan

```sh
python -m venv venv
source ./venv/bin/activate
```

## Installeer afhankelijkheden

```sh
pip install "mcp[cli]"
```

## Start de server

```sh
uvicorn server:app --port 8000
```

## Test de server met GitHub Copilot en VS Code

Voeg de invoer toe aan mcp.json zoals volgt:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Zorg ervoor dat je op "start" klikt op de server.

Plak in GitHub Copilot de volgende prompt:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

De eerste keer wordt je gevraagd of je een Sampling actie wilt accepteren, daarna wordt je gevraagd of je het hulpprogramma wilt toestaan "create_blog" uit te voeren. Je zou een reactie moeten zien die lijkt op:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het oorspronkelijke document in de oorspronkelijke taal moet als de gezaghebbende bron worden beschouwd. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->