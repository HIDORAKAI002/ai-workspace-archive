# Suorita esimerkki

## Luo virtuaaliympäristö

```sh
python -m venv venv
source ./venv/bin/activate
```

## Asenna riippuvuudet

```sh
pip install "mcp[cli]"
```

## Käynnistä palvelin

```sh
uvicorn server:app --port 8000
```

## Testaa palvelinta GitHub Copilotilla ja VS Codella

Lisää merkintä tiedostoon mcp.json seuraavasti:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Varmista, että napsautat palvelimella "start".

Liitä GitHub Copilotissa seuraava kehotus:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Ensimmäisellä kerralla sinulta kysytään, haluatko hyväksyä otantatoiminnon, sitten sinua pyydetään hyväksymään työkalun suoritus "create_blog". Näet vastauksen, joka on samanlainen kuin:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty tekoälykäännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, on hyvä olla tietoinen siitä, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäistä asiakirjaa sen alkuperäiskielellä tulee pitää auktoriteettisena lähteenä. Tärkeiden tietojen osalta suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä johtuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->