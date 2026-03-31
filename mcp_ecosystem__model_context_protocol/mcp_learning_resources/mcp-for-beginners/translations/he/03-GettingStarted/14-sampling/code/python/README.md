# להריץ את הדוגמה

## יצירת סביבה וירטואלית

```sh
python -m venv venv
source ./venv/bin/activate
```

## התקנת תלותים

```sh
pip install "mcp[cli]"
```

## להריץ את השרת

```sh
uvicorn server:app --port 8000
```

## לבדוק את השרת עם GitHub Copilot ו-VS Code

הוסף את הערך ל-mcp.json כך:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

וודא שאתה לוחץ על "start" בשרת.

ב-GitHub Copilot הדבק את הפקודה הבאה:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

בפעם הראשונה תשאל אם לקבל פעולה Sampling, ואז תשאל אם לקבל את הכלי להריץ "create_blog". אתה צריך לראות תגובה דומה ל:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:  
מסמך זה תורגם באמצעות שירות תרגום מבוסס בינה מלאכותית [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדייק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. המסמך המקורי בשפתו המקורית הוא המקור המוסמך. למידע קריטי מומלץ להשתמש בתרגום מקצועי אנושי. איננו אחראים להבנות שגויות או לפרשנויות מוטעות הנובעות משימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->