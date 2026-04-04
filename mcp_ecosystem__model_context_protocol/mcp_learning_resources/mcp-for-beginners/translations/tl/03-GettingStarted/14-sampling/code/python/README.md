# Patakbuhin ang halimbawa

## Gumawa ng virtual environment

```sh
python -m venv venv
source ./venv/bin/activate
```

## I-install ang mga dependencies

```sh
pip install "mcp[cli]"
```

## Patakbuhin ang server

```sh
uvicorn server:app --port 8000
```

## Subukan ang server gamit ang GitHub Copilot at VS Code

Idagdag ang entry sa mcp.json nang ganito:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Siguraduhing i-click ang "start" sa server.

Sa GitHub Copilot, i-paste ang sumusunod na prompt:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Sa unang pagkakataon, tatanungin ka kung tatanggapin ang isang Sampling na aksyon, pagkatapos ay hihingin kang tanggapin ang tool na magpatakbo ng "create_blog". Dapat kang makakita ng tugon na kahalintulad ng:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:  
Ang dokumentong ito ay isinalin gamit ang serbisyong AI na pagsasalin [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat nagsusumikap kaming maging tumpak, pakitandaan na ang mga awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa kanyang orihinal na wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaintindihan o maling interpretasyon na maaaring magmula sa paggamit ng salin na ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->