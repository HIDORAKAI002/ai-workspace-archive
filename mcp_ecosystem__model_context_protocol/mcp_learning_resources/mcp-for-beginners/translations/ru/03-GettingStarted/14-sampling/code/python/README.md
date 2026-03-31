# Запуск примера

## Создание виртуального окружения

```sh
python -m venv venv
source ./venv/bin/activate
```

## Установка зависимостей

```sh
pip install "mcp[cli]"
```

## Запуск сервера

```sh
uvicorn server:app --port 8000
```

## Проверка сервера с помощью GitHub Copilot и VS Code

Добавьте запись в mcp.json следующим образом:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Убедитесь, что вы нажали «start» на сервере.

В GitHub Copilot вставьте следующий запрос:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Впервые вам будет предложено принять действие Sampling, затем вас попросят разрешить инструменту запускать "create_blog". Вы должны увидеть ответ, похожий на:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:  
Этот документ был переведен с использованием службы автоматического перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на исходном языке следует считать авторитетным источником. Для критически важной информации рекомендуется обращаться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->