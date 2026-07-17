# הפעלת הדוגמה הזו

זוהי הפתרון בשפת Rust לדוגמת לקוח LLM. יש צורך בכלי Rust מותקן; ראה את [מדריך ההתקנה הרשמי](https://www.rust-lang.org/tools/install).

הלקוח קורא למודל דרך נקודת הקצה למודלים של GitHub (`https://models.github.ai/inference/chat`) וקורא את אסימון הגישה האישי (PAT) שלך מ- `OPENAI_API_KEY` במשתנה הסביבה.

> [!NOTE]
> פתרונות אחרים במאגר זה משתמשים ב- `GITHUB_TOKEN`. עבור Rust, הגדר `OPENAI_API_KEY` לאותה ערך כדי להתאים את תצורת לקוח OpenAI.

## -0- הגדר את אסימון GitHub שלך

```bash
# זש/בש
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- בניית הדוגמה

```bash
cargo build
```

## -2- הפעלת הדוגמה

```bash
cargo run
```

הלקוח מתחיל את שרת MCP של מחשבון, מושך את רשימת הכלים שלו, ומשתמש במודל (`openai/gpt-5-mini`) כדי לקרוא לכלי `add`. אתה אמור לראות פלט שמראה את קריאת הכלי (לדוגמה, "Calling tool: add") ואת תוצאת הקריאה הזו.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->