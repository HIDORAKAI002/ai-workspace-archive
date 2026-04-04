# ಮಾದರಿಯನ್ನು ರನ್ ಮಾಡಿ

## ವರ್ಚುವಲ್ ಪರಿಸರವನ್ನು ರಚಿಸಿ

```sh
python -m venv venv
source ./venv/bin/activate
```

## ಅವಲಂಬನಗಳನ್ನು ಸ್ಥಾಪಿಸಿ

```sh
pip install "mcp[cli]"
```

## ಸರ್ವರ್ ಅನ್ನು ರನ್ ಮಾಡಿ

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot ಮತ್ತು VS Code ಬಳಸಿ ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಿ

mcp.json ನಲ್ಲಿ ಹೀಗೆ ನೊಂದಣಿ ಸೇರಿಸಿ:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

ಸರ್ವರ್ ನಲ್ಲಿ "start" ಕ್ಲಿಕ್ ಮಾಡುವುದು ದೃಢಪಡಿಸಿ.

GitHub Copilot ನಲ್ಲಿ ಈ ಪPrompt ಅನ್ನು ಪೇಸ್ಟ್ ಮಾಡಿ:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

ಮೊದಲ ಬಾರಿಗೆ ನೀವು Sampling action ಅನ್ನು ಸ್ವೀಕರಿಸುವುದೇ ಎಂದು ಕೇಳಲಾಗುತ್ತದೆ, ನಂತರ "create_blog" ಅನ್ನು ರನ್ ಮಾಡಲು ಟೂಲ್ ಅನ್ನು ಸ್ವೀಕರಿಸುವುದೇ ಎಂದು ಕೇಳಲಾಗುತ್ತದೆ. ನೀವು ಈ ರೀತಿಯ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಕಾಣಬೇಕು:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ತುಂಟಿಕೆನುಡಿ**:  
ಈ ದಸ್ತಾವೇಜು [Co-op Translator](https://github.com/Azure/co-op-translator) ಎಂಬ ಎಐ ಅನುವಾದ ಸೇವೆಯನ್ನು ಬಳಸಿಕೊಂಡು ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಶ್ರಮಿಸುತ್ತಿದ್ದರೂ ಸಹ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ತಪ್ಪುಗಳನ್ನು ಹೊಂದಿರಬಹುದು ಎಂದು ದಯವಿಟ್ಟು ಗಮನಿಸಿ. ಮೂಲ ಭಾಷೆಯ ದಸ್ತಾವೇಜನ್ನು ಸರ್ಕಾರೀ ಪ್ರಮಾಣಪತ್ರವಾಗಿ ಪರಿಗಣಿಸಬೇಕು. ಮಹತ್ವದ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಸಲಹೆ ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದದ ಬಳಕೆಯಿಂದ ಉಂಟಾಗಬಹುದಾದ ಯಾವುದೇ ತಪ್ಪು ವಿವರಣೆಗಳ ಅಥವಾ ಅರ್ಥಬಿಸಲಾಗದ ಅರ್ಥಗಳುಗಳಿಗೆ ನಾವು ಜವಾಬ್ದಾರನಾಗುವುದಿಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->