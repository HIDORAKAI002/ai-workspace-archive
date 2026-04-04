# Futtassa a mintát

## Virtuális környezet létrehozása

```sh
python -m venv venv
source ./venv/bin/activate
```

## Függőségek telepítése

```sh
pip install "mcp[cli]"
```

## A szerver indítása

```sh
uvicorn server:app --port 8000
```

## Tesztelje a szervert GitHub Copilot-tal és VS Code-dal

Adja hozzá a bejegyzést az mcp.json fájlhoz így:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Győződjön meg róla, hogy a szerveren a "start" gombra kattint.

A GitHub Copilot-ba másolja be a következő promptot:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Először megkérdezi, hogy elfogadja-e a Sampling műveletet, majd megkérdezi, hogy elfogadja-e, hogy a "create_blog" eszköz fusson. Hasonló választ kell látnia, mint:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősségkizárás**:
Ezt a dokumentumot a [Co-op Translator](https://github.com/Azure/co-op-translator) AI fordítószolgáltatásával fordítottuk le. Bár igyekszünk pontosak lenni, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum anyanyelvű változata tekintendő hiteles forrásnak. Kritikus információk esetén profi emberi fordítást javaslunk. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy félreértelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->