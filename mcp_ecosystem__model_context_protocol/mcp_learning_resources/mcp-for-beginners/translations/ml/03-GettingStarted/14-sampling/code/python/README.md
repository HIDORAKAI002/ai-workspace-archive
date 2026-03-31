# സാമ്പിൾ ഓടിക്കുക

## വിർച്ചുൽ എൻവയറൺമെന്റ് സൃഷ്ടിക്കുക

```sh
python -m venv venv
source ./venv/bin/activate
```

## ആശ്രിതങ്ങൾ ഇൻസ്റ്റാൾ ചെയ്യുക

```sh
pip install "mcp[cli]"
```

## സെർവർ ഓടിക്കുക

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot, VS Code ഉപയോഗിച്ച് സെർവർ പരീക്ഷിക്കുക

mcp.json-ലേക്ക് താഴെപ്പറയുന്ന വിധം എൻട്രി ചേർക്കുക:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

സെർവറിൽ "start" ക്ലിക്ക് ചെയ്യുന്നത് ഉറപ്പാക്കുക.

GitHub Copilot-ലിൽ താഴെ കൊടുത്ത പ്രാമ്പ്റ്റ് പേസ്റ്റ് ചെയ്യുക:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

ആദ്യവർഷം Sampling പ്രവർത്തനം സ്വീകരിക്കണമോ എന്ന് ചോദിക്കും, പിന്നീട് "create_blog" ൽ ടൂൾ ഓടിക്കാൻ സമ്മതിക്കണമോ എന്നും ചോദിക്കും. ഇങ്ങനെ സമാനമായ ഒരു പ്രതികരണം കാണാനാകാം:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ഡിസ്‌ക്ലെയിമർ**:  
ഈ രേഖ [Co-op Translator](https://github.com/Azure/co-op-translator) എന്ന എഐ ഭാഷാന്തരം സേവനത്തിന്റെ സഹായത്തോടെ വിവർത്തനം ചെയ്തിട്ടുണ്ട്. തെറ്റുകൾ ഒഴിവാക്കാനുള്ളour ശ്രമം ഉണ്ടായിരുന്നുവെങ്കിലും, സ്വയമാറ്റ വിവർത്തനങ്ങളിൽ പിശക് അല്ലെങ്കിൽ അസാധുതകൾ ഉണ്ടായിരിക്കാമെന്ന് ദയവായി അറിയുക. പ്രഥമമായി നൽകപ്പെട്ട മാതൃഭാഷയിലെ രേഖയെ അധികാരപരമായഉം ഒത്തുതീരുമാനമായുള്ളതും ആണെന്ന് പരിഗണിക്കുക. അത്യാവശ്യ വിവരങ്ങൾക്കായി പ്രൊഫഷണൽ മനുഷ്യ ഭാഷാന്തരം സ്വീകരിക്കുന്നതിനെ പ്രസ്തുതമാക്കുന്നു. ഈ ഭാഷാന്തരം ഉപയോഗിക്കുന്നതിൽ നിന്നുണ്ടാകുന്ന任何误解 বা തെറ്റിദ്ധാരണകൾക്കായി ഞങ്ങൾ ഉത്തരവാദിയല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->