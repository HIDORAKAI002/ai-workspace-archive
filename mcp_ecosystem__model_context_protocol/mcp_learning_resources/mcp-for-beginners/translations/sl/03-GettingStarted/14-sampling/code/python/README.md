# Zaženi primer

## Ustvari virtualno okolje

```sh
python -m venv venv
source ./venv/bin/activate
```

## Namesti odvisnosti

```sh
pip install "mcp[cli]"
```

## Zaženi strežnik

```sh
uvicorn server:app --port 8000
```

## Preizkusi strežnik z GitHub Copilot in VS Code

Dodaj vnos v mcp.json tako:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Prepričaj se, da klikneš "start" na strežniku.

V GitHub Copilot prilepi naslednje navodilo:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Prvič te bo vprašal, ali želiš sprejeti Sampling akcijo, nato pa te bo vprašal, ali dovoliš orodju, da zažene "create_blog". Videti bi moral odgovor, podoben temu:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Opozorilo**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Kljub prizadevanju za natančnost vas prosimo, da upoštevate, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v izvirnem jeziku velja za avtoritativni vir. Za pomembne informacije priporočamo strokoven človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->