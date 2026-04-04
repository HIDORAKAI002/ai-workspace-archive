# Запуск прикладу

## Створення віртуального середовища

```sh
python -m venv venv
source ./venv/bin/activate
```

## Встановлення залежностей

```sh
pip install "mcp[cli]"
```

## Запуск сервера

```sh
uvicorn server:app --port 8000
```

## Тестування сервера з GitHub Copilot та VS Code

Додайте запис у mcp.json таким чином:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Переконайтеся, що натиснули "start" на сервері.

У GitHub Copilot вставте наступний запит:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Вперше у вас запитають, чи прийняти дію Sampling, потім буде прохання дозволити інструменту запуск "create_blog". Ви маєте побачити відповідь, схожу на:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою автоматичного сервісу перекладу штучного інтелекту [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, просимо враховувати, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ на рідній мові слід розглядати як авторитетне джерело. Для критичної інформації рекомендується професійний переклад людиною. Ми не несемо відповідальності за будь-які непорозуміння чи неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->