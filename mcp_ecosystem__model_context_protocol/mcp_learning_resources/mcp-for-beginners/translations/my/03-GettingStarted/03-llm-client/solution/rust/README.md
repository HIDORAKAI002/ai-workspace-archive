# ဒီနမူနာကို အလုပ်လုပ်ခြင်း

ဒါဟာ LLM client နမူနာအတွက် Rust ဖြေရှင်းချက်ဖြစ်ပါတယ်။ Rust toolchain တစ်ခုတပ်ဆင်ထားရမည်; [အတည်ပြု တပ်ဆင်မှုလမ်းညွှန်](https://www.rust-lang.org/tools/install) ကို ကြည့်ပါ။

Client က GitHub Models inference endpoint (`https://models.github.ai/inference/chat`) မှတဆင့် မော်ဒယ်ကို ခေါ်သုံးပြီး၊ သင်၏ GitHub personal access token (PAT) ကို `OPENAI_API_KEY` environment variable မှ ဖတ်ယူပါသည်။

> [!NOTE]
> ဒီ repository ထဲမှာရှိတဲ့ အခြားနည်းလမ်းများသည် `GITHUB_TOKEN` ကို အသုံးပြုသည်။ Rust အတွက်တော့ OpenAI client ဖော်ပြချက်နဲ့ ကိုက်ညီအောင် `OPENAI_API_KEY` ကို အတူတူ တန်ဖိုးပေးပြီး တပ်ဆင်ပါ။

## -0- သင့် GitHub token ကို သတ်မှတ်ပါ

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- နမူနာကို တည်ဆောက်ပါ

```bash
cargo build
```

## -2- နမူနာကို အလုပ်လုပ်ပါ

```bash
cargo run
```

Client က calculator MCP server ကို စတင်ပြီး၊ ၎င်း၏ tool စာရင်းကို ရယူပြီး၊ `openai/gpt-5-mini` မော်ဒယ်ကို သုံး၍ `add` tool ကို ခေါ်သုံးပါသည်။ သင်သည် tool ခေါ်ဆိုမှု ("Calling tool: add" ဆိုသည့်အတိုင်း) နှင့် ၎င်းခေါ်ဆိုမှုရလဒ်ကို မြင်ရမည်ဖြစ်သည်။

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->