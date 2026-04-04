# Spustiť ukážku

## Vytvorte virtuálne prostredie

```sh
python -m venv venv
source ./venv/bin/activate
```

## Nainštalujte závislosti

```sh
pip install "mcp[cli]"
```

## Spustite server

```sh
uvicorn server:app --port 8000
```

## Otestujte server pomocou GitHub Copilot a VS Code

Pridajte záznam do mcp.json takto:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Uistite sa, že ste na serveri klikli na „start“.

Do GitHub Copilot vložte nasledujúci prompt:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Prvýkrát budete požiadaní, či chcete akceptovať Sampling akciu, potom budete požiadaní o súhlas s nástrojom na spustenie "create_blog". Mali by ste vidieť odpoveď podobnú:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite, prosím, na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by sa mal považovať za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->