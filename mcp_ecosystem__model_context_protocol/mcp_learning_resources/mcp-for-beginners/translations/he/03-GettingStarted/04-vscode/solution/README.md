# הפעלת הדוגמה

כאן מניחים שכבר יש לך קוד שרת עובד. נא אתר שרת מאחד הפרקים הקודמים.

## הגדרת mcp.json

הנה קובץ לשימושך כהפניה, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

שנה את ערך השרת לפי הצורך כדי להצביע על הנתיב המוחלט לשרת שלך כולל הפקודה המלאה הדרושה להרצה.

בקובץ הדוגמה שהוזכר לעיל ערך השרת נראה כך:

<details>
<summary>node.js</summary>
```json
"hello-mcp": {
    "command": "node",
    "args": [
        "build/index.js"
    ]
}
```
</details>

<details>
<summary>.NET</summary>

ייתכן שתצטרך להזין את שורש מאגר GitHub, שניתן לקבל באמצעות הפקודה, `git rev-parse --show-toplevel`.

```jsonc
{
  "inputs": [
    {
      "type": "promptString",
      "id": "repository-root",
      "description": "The absolute path to the repository root"
    }
  ],
  "servers": {
    "calculator-mcp-dotnet": {
      "type": "stdio",
      "command": "dotnet",
      "args": [
        "run",
        "--project",
        "${input:repository-root}/03-GettingStarted/02-client/solution/server/server.csproj"
      ]
    }
  }
}
```

</details>

זה תואם להרצת פקודה כזו: `node build/index.js`.

- שנה את ערך השרת הזה כך שיתאים למיקום הקובץ של השרת שלך או למה שנדרש להפעלת השרת בהתאם לסביבת הריצה והמיקום שנבחרו.

## צריכת התכונות בשרת

- לחץ על סמל ה-`play`, ברגע שהוספת את *mcp.json* לתיקיית *./vscode*,

    שים לב לסמל הכלים שמשתנה ומגדיל את מספר הכלים הזמינים. סמל הכלים ממוקם ממש מעל שדה הצ'אט ב-GitHub Copilot.

## הפעלת כלי

- הקלד בקשת פקודה בחלון הצ'אט שתתאים לתיאור הכלי שלך. לדוגמה כדי להפעיל את הכלי `add` הקלד משהו כמו "add 3 to 20".

    תראה כלי שמוצג מעל תיבת הטקסט בצ'אט שמצביע שעליך לבחור להפעיל את הכלי, כמו בתמונה הזאת:

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/he/vscode-agent.d5a0e0b897331060.webp)

    בחירת הכלי תפיק תוצאה מספרית שתאמר "23" אם ההקשה שלך הייתה כפי שצוינה קודם.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->