# Endesha sampuli

## Unda mazingira ya kweli

```sh
python -m venv venv
source ./venv/bin/activate
```

## Sakinisha utegemezi

```sh
pip install "mcp[cli]"
```

## Endesha seva

```sh
uvicorn server:app --port 8000
```

## Jaribu seva kwa kutumia GitHub Copilot na VS Code

Ongeza kiingilio kwenye mcp.json kama ifuatavyo:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Hakikisha unabonyeza "anza" kwenye seva.

Katika GitHub Copilot bandika amri ifuatayo:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Mara ya kwanza utaulizwa kama unakubali kitendo cha Kuchakata Sampuli, kisha utaulizwa kukubali zana kuendesha "create_blog". Unapaswa kuona majibu yanayofanana na:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kiarifu cha Kukataa**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kwa usahihi, tafadhali fahamu kuwa tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati asili katika lugha yake ya asili inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa za muhimu, tafsiri ya mtaalamu wa lugha ni inayopendekezwa. Hatutumiki kuwajibika kwa kutoelewana au tafsiri isiyo sahihi inayotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->