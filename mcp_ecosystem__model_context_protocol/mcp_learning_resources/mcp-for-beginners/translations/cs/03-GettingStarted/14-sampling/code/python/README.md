# Spusťte ukázku

## Vytvoření virtuálního prostředí

```sh
python -m venv venv
source ./venv/bin/activate
```

## Instalace závislostí

```sh
pip install "mcp[cli]"
```

## Spuštění serveru

```sh
uvicorn server:app --port 8000
```

## Otestujte server s GitHub Copilot a VS Code

Přidejte záznam do mcp.json takto:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Ujistěte se, že kliknete na "start" na serveru.

V GitHub Copilot vložte následující prompt:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Poprvé budete vyzváni, abyste přijali Sampling akci, poté budete vyzváni k přijetí spuštění nástroje "create_blog". Měli byste vidět odpověď podobnou:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Ačkoliv usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakákoliv nedorozumění nebo nesprávné výklady vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->