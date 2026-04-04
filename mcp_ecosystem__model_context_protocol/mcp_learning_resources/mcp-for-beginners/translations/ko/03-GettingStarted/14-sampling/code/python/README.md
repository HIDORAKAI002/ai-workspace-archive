# 샘플 실행

## 가상 환경 생성

```sh
python -m venv venv
source ./venv/bin/activate
```

## 종속성 설치

```sh
pip install "mcp[cli]"
```

## 서버 실행

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot과 VS Code로 서버 테스트하기

mcp.json에 다음과 같이 항목을 추가하세요:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

서버에서 "start"를 클릭했는지 확인하세요.

GitHub Copilot에 다음 프롬프트를 붙여넣으세요:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

처음에는 Sampling 작업을 수락할지 묻고, 그 다음 "create_blog" 도구의 실행을 수락할지 묻게 됩니다. 다음과 유사한 응답을 보게 될 것입니다:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 노력하고 있으나, 자동 번역은 오류나 부정확성을 포함할 수 있음을 유의하시기 바랍니다. 원문은 해당 언어로 작성된 원본 문서가 권위 있는 출처로 간주되어야 합니다. 중요한 정보의 경우 전문 인력에 의한 번역을 권장합니다. 본 번역 사용으로 인한 오해나 잘못된 해석에 대해 당사는 책임지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->