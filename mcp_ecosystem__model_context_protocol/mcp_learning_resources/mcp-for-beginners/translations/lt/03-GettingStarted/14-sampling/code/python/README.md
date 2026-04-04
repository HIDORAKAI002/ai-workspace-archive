# Paleiskite pavyzdį

## Sukurkite virtualią aplinką

```sh
python -m venv venv
source ./venv/bin/activate
```

## Įdiekite priklausomybes

```sh
pip install "mcp[cli]"
```

## Paleiskite serverį

```sh
uvicorn server:app --port 8000
```

## Išbandykite serverį su GitHub Copilot ir VS Code

Pridėkite įrašą į mcp.json taip:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Įsitikinkite, kad paspaudėte „start“ serveryje.

GitHub Copilot įklijuokite šią užklausą:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Pirmą kartą būsite paklausti, ar priimate Sampling veiksmą, tada būsite paprašyti leisti įrankiui paleisti „create_blog“. Turėtumėte matyti panašų atsakymą:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:  
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, atkreipkite dėmesį, kad automatiniai vertimai gali turėti klaidų arba netikslumų. Originalus dokumentas jo gimtąja kalba turėtų būti laikomas teisės aktų šaltiniu. Kritinei informacijai rekomenduojamas profesionalus žmogaus atliktas vertimas. Mes neatsakome už bet kokius nesusipratimus ar neteisingus aiškinimus, kylančius dėl naudojimo šio vertimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->