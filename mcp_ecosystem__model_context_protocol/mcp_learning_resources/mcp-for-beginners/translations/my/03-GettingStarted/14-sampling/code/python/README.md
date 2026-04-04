# နမူနာကို အလုပ်လုပ်ပါ

## အတုအကောင်ဖန်တီးပါ

```sh
python -m venv venv
source ./venv/bin/activate
```

## လိုအပ်သော အရာများကို ထည့်သွင်းပါ

```sh
pip install "mcp[cli]"
```

## ဆာဗာကို အလုပ်လုပ်ပါ

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot နှင့် VS Code ဖြင့် ဆာဗာကို စမ်းသပ်ပါ

mcp.json ထဲသို့ အောက်ပါအတိုင်း အချက်ဝင်ကို ထည့်ပါ-

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

ဆာဗာတွင် "start" ကို နှိပ်ထားသည်ကို သေချာစေပါ။

GitHub Copilot တွင် အောက်ပါ prompt ကို ကူးထည့်ပါ-

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

ပထမဆုံးအကြိမ်တွင် Sampling action ကို သဘောတူမလားဟု မေးမြန်းမည်၊ ထို့နောက် "create_blog" ကို အလုပ်လုပ်ရန် ပစ္စည်းကို သဘောတူပါရန် မေးမည်။ အောက်ပါကဲ့သို့ တုံ့ပြန်ချက်ကို မြင်ရပါမည်-

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ကျူးလွန်ချက်ကင်းရှင်းချက်**  
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှုဖြစ်သော [Co-op Translator](https://github.com/Azure/co-op-translator) ဖြင့် ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှုအတွက် ကြိုးစားပေမယ့် အလိုအလျောက် ဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် တိကျမှုအနည်းငယ်များပါရှိနိုင်ကြောင်း သတိထားပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။ မူရင်းစာတမ်းကို သူ၏မူလဘာသာဖြင့်သာ အတည်ပြုရမည့် အရာအဖြစ်ယူဆပါရန် အကြံပြုပါသည်။ အရေးကြီးသော ကိစ္စအချက်အလက်များအတွက် လုပ်ငန်းပညာရှင်များက ဘာသာပြန်ပေးသင့်ကြောင်း လမ်းညွှန်လိုက်ပါသည်။ ဤဘာသာပြန်အသုံးပြုမှုကြောင့် ဖြစ်ပေါ်လာနိုင်သည့် နားမလည်မှုများ သို့မဟုတ် မှားယွင်းသဘောပေါက်မှုများအတွက် ကျွန်ုပ်တို့ ဘာသာရပ်တော်မတတ်ပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->