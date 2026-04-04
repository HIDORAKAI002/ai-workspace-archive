# Стартирайте примера

## Създаване на виртуална среда

```sh
python -m venv venv
source ./venv/bin/activate
```

## Инсталиране на зависимости

```sh
pip install "mcp[cli]"
```

## Стартирайте сървъра

```sh
uvicorn server:app --port 8000
```

## Тествайте сървъра с GitHub Copilot и VS Code

Добавете записа в mcp.json по следния начин:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Уверете се, че сте кликнали "start" на сървъра.

В GitHub Copilot поставете следния подканващ текст:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Първия път ще бъдете попитани дали да приемете Sampling действие, след което ще бъдете попитани да приемете инструмента да стартира "create_blog". Трябва да видите отговор подобен на:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:  
Този документ е преведен с помощта на AI преводаческа услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Не носим отговорност за каквито и да било недоразумения или погрешни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->