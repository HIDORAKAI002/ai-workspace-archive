# Pokreni primjer

## Kreiraj virtualno okruženje

```sh
python -m venv venv
source ./venv/bin/activate
```

## Instaliraj ovisnosti

```sh
pip install "mcp[cli]"
```

## Pokreni poslužitelj

```sh
uvicorn server:app --port 8000
```

## Testiraj poslužitelj s GitHub Copilot i VS Code

Dodaj unos u mcp.json ovako:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Pobrinite se da kliknete "start" na poslužitelju.

U GitHub Copilot zalijepite sljedeći upit:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Prvi put će vam biti postavljeno pitanje želite li prihvatiti akciju uzorkovanja, zatim ćete biti upitani da prihvatite alat za pokretanje "create_blog". Trebali biste vidjeti odgovor sličan ovom:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:  
Ovaj dokument preveden je pomoću AI usluge prevođenja [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na njegovom izvornom jeziku treba se smatrati službenim i autoritativnim izvorom. Za važne informacije preporučuje se profesionalni prijevod od strane čovjeka. Nismo odgovorni za bilo kakva nesporazuma ili pogrešna tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->