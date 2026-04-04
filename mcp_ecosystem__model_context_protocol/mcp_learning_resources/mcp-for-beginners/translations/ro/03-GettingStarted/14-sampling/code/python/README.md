# Rulează exemplul

## Creează un mediu virtual

```sh
python -m venv venv
source ./venv/bin/activate
```

## Instalează dependențele

```sh
pip install "mcp[cli]"
```

## Rulează serverul

```sh
uvicorn server:app --port 8000
```

## Testează serverul cu GitHub Copilot și VS Code

Adaugă intrarea în mcp.json astfel:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Asigură-te că apeși "start" pe server.

În GitHub Copilot, lipește următorul prompt:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Prima dată ți se va cere să accepți o acțiune de Sampling, apoi ți se va cere să accepți ca uneltele să ruleze "create_blog". Ar trebui să vezi un răspuns similar cu:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de răspundere**:  
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original, în limba sa nativă, trebuie considerat sursa autoritară. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm răspunderea pentru eventuale neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->