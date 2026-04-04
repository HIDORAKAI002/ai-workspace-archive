# నమూనాను నడపండి

## వర్చువల్ ఎన్విరాన్‌మెంట్ సృష్టించండి

```sh
python -m venv venv
source ./venv/bin/activate
```

## డిపెండెన్సీలను ఇన్స్టాల్ చేయండి

```sh
pip install "mcp[cli]"
```

## సర్వర్‌ను నడపండి

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot మరియు VS Code తో సర్వర్‌ను పరీక్షించండి

mcp.json లో క్రింది విధంగా ఎంట్రీని జోడించండి:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

మీరు సర్వర్‌పై "start" క్లిక్ చేస్తారని నిర్ధారించుకోండి.

GitHub Copilot లో క్రింది ప్రాంప్ట్‌ని పేస్ట్ చేయండి:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

మొదటి సారి Sampling actionని ఆమోదించమని అడుగుతారు, ఆ తర్వాత "create_blog" టూల్ రన్ చేయమని ఆమోదం కోరుతుంది. మీరు క్రింది తరహా స్పందన చూడవచ్చు:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అసలు భాధ్యతాఖలు**:  
ఈ డాక్యుమెంట్ [Co-op Translator](https://github.com/Azure/co-op-translator) AI అనువాద సేవ ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలలో తప్పిదాలు లేదా అసత్యతలు ఉండవచ్చును. మూల డాక్యుమెంట్ దాని స్వदेश భాషలోనే అధికారిక వనరు గా పరిగణించాలి. కీలక సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫార్సు చేస్తాము. ఈ అనువాదాన్ని ఉపయోగించడంనుండి కలిగే ఎటువంటి అవగాహన లోపాలు లేదా దుర్వ్యాఖ్యానాలకు మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->