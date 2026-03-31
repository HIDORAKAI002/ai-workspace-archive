# Покрените пример

## Креирање виртуелног окружења

```sh
python -m venv venv
source ./venv/bin/activate
```

## Инсталирање зависности

```sh
pip install "mcp[cli]"
```

## Покретање сервера

```sh
uvicorn server:app --port 8000
```

## Тестирање сервера са GitHub Copilot и VS Code

Додајте унос у mcp.json на следећи начин:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Обавезно кликните на "start" на серверу.

У GitHub Copilot убаците следећи упит:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Први пут ће вам бити тражено да прихватите Sampling акцију, затим ће вас питати да ли желите да алат покрене "create_blog". Требало би да видите сличан одговор као:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Одрицање од одговорности**:
Овај документ је преведен коришћењем услуге за машински превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако настојимо да превод буде прецизан, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом матичном језику треба сматрати ауторитетним извором. За критичне информације препоручује се професионални превод од стране људи. Нисмо одговорни за било каква неспоразума или погрешна тумачења која могу произићи из употребе овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->