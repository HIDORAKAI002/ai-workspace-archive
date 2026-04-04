# மாதிரியை இயக்கு

## பயனர்ப் பலகை உருவாக்கு

```sh
python -m venv venv
source ./venv/bin/activate
```

## சார்புகளை நிறுவு

```sh
pip install "mcp[cli]"
```

## சேவையகத்தை இயக்கு

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot மற்றும் VS Code உடன் சேவையகத்தை சோதனை செய்

mcp.json இல் உள்ளே கீழ்காணும் நுழைவு சேர்க்க:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

சேவையகத்தில் "start" என்பதை கிளிக் செய்க.

GitHub Copilot இல் கீழ்காணும் கேள்வியை ஒட்டுக:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

முதல் முறையாக Sampling செயல்பாட்டை ஏற்றுகொள்வதா என்று கேட்கப்படும், அதன்பின் "create_blog" இயங்க உத்தரவு ஏற்றுகொள்ள கேட்கப்படும். இதுபோன்ற பதிலை நீங்கள் காண்பீர்கள்:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**குறிப்பு**:  
இந்த ஆவணம் [Co-op Translator](https://github.com/Azure/co-op-translator) என்ற செயற்கை நுண்ணறிவு மொழிபெயர்ப்பு சேவையை பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயலுகிறோம் என்றாலும், தானியங்கி மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கக்கூடும் என்பது கவனத்தில் கொள்ளவும். அசல் மொழியில் உள்ள ஆவணம் அதிகாரப்பூர்வ மூலமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்முறை மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பின் பயன்பாட்டால் ஏற்படும் பிறமரியாதைகள் அல்லது தவறான விளக்கங்களுக்கு ஆகியவர்கள் பொறுப்பேற்பவர்கள் இல்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->