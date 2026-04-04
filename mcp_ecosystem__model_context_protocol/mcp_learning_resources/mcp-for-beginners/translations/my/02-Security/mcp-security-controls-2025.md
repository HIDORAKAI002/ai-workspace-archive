# MCP လုံခြုံရေးထိန်းချုပ်မှုများ - ဖေဖော်ဝါရီ ၂၀၂၆ မှတ်တမ်းအသစ်

> **လက်ရှိစံနှုန်း**: ဤစာတမ်းသည် [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) ၏ လုံခြုံရေးလိုအပ်ချက်များနှင့် အတူတည်ရှိသည့် အတည်ပြု [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) ကို ဖော်ပြထားသည်။

Model Context Protocol (MCP) သည် ရိုးရာ ဆော့ဖ်ဝဲ လုံခြုံရေး နှင့် AI နှင့် ပတ်သက်သည့် အန္တရာယ်များကို တစိတ်တပိုင်းဖြေရှင်းသည့် အပြည့်အစုံ ခိုင်မာသော လုံခြုံရေး ထိန်းချုပ်မှုများဖြင့် တိုးတက်ပြောင်းလဲလာခဲ့သည်။ ဤစာတမ်းသည် OWASP MCP Top 10 ဖွဲ့စည်းပုံနှင့် ကိုက်ညီသည့် လုံခြုံသော MCP စနစ်များအတွက် အပြည့်အစုံ လုံခြုံရေးထိန်းချုပ်မှုများကို ပေးထားသည်။

## 🏔️ လက်တွေ့ လုံခြုံရေး လေ့လာသင်ကြားမှု

လက်တွေ့ လုံခြုံရေးအသုံးပြုမှု အတွေ့အကြုံရရှိရန်၊ အကြံပြုသည်မှာ **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** ဟူသော Azure တွင် MCP ဆာဗာများကို "ရှုတ် ::= အကောက်ခံ → ကူးယူ → ပြင်ဆင် → စစ်ဆေး" နည်းလမ်းဖြင့် လုံခြုံရေး ခရီးသွား လမ်းညွှန်တစ်ခုဖြစ်သည်။

ဤစာတမ်းရှိ လုံခြုံရေးထိန်းချုပ်မှုအားလုံးသည် **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** နှင့် ကိုက်ညီပြီး OWASP MCP Top 10 အန္တရာယ်များအတွက် အညွှန်းဖော်ဆောင်မှုများနှင့် Azure အထူး သုံး ပုံစံအတွက် အကူအညီများ လုပ်ဆောင်ထားပါသည်။

## **လိုအပ်သည့် လုံခြုံရေးလိုအပ်ချက်များ**

### **MCP Specification မှ အရေးကြီး တားမြစ်ချက်များ**

> **ကန့်သတ်**: MCP ဆာဗာများသည် MCP ဆာဗာအတွက် ထုတ်ပြန်ထားသော တိုကင် မရရှိထားသော တိုကင်များကို လက်ခံသင့်မထားပါ။
>
> **တားမြစ်ချက်**: MCP ဆာဗာများသည် အတည်ပြုရန် စက်မှုဆက်ရပ် (session) မသုံးသင့်ပါ
>
> **လိုအပ်ချက်**: MCP ဆာဗာများတွင် ခွင့်ပြုချက် ထည့်သွင်းသည့်နေရာတွင် လာရောက်လျှောက်ထားမှုအားလုံးကို စစ်ဆေးရမည်။
>
> **တစ်သက်တမ်းလိုအပ်ချက်**: MCP proxy ဆာဗာများသည် static client IDs ကိုသုံးသောအခါ အလိုအလျောက်အတည်ပြုထားသော client  တစ်ခုချင်းစီအတွက် အသုံးပြုသူ အသိအမှတ်ပြုချက် ရယူရမည်

---

## ၁။ **အတည်ပြုခြင်းနှင့် ခွင့်ပြုခြင်း ထိန်းချုပ်မှုများ**

### **ပြင်ပ အတိုင်ပင်ခံ မှတ်ပုံတင်သူချိတ်ဆက်မှု**

**လက်ရှိ MCP စံ (2025-11-25)** သည် MCP ဆာဗာများအား အတိုင်ပင်ခံမှတ်ပုံတင်သူများထံ အတည်ပြုခြင်းကို လွှဲပြောင်းပေးရန် ခွင့်ပြုထားပြီး ဤသည်မှာ လုံခြုံရေး တိုးတက်မှု အရေးကြီးဖြစ်လာစေသည်-

**OWASP MCP အန္တရာယ် ဖြေရှင်းချက်**: [MCP07 - လုံခြုံရေးအတည်ပြုခြင်းနှင့် ခွင့်ပြုမှု မလုံလောက်ခြင်း](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**လုံခြုံရေး အကျိုးကျေးဇူးများ:**
1. **စိတ်ကြိုက် အတည်ပြုခြင်း အန္တရာယ်များ ပယ်ဖျက်ခြင်း**: စိတ်ကြိုက် အတည်ပြုခြင်း အကာအကွယ်နည်းများ မလိုအပ်တော့ခြင်းဖြင့် အန္တရာယ် များလျော့ချသည်
2. **လုပ်ငန်းအဆင့် လုံခြုံရေး**: Microsoft Entra ID ကဲ့သို့ အခိုင်အမာ အတည်ပြုမှုပေးသူများမှ လုံခြုံရေး လုပ်ဆောင်ချက်များ အသုံးပြုသည်
3. **ဌာနစုစုစီမံခန့်ခွဲမှု စနစ်စင်တာ**: အသုံးပြုသူအသက်တာ အဆင့်စီမံခန့်ခွဲမှု၊ ဝင်ရောက်ခွင့် ထိန်းချုပ်မှုနှင့် စည်းမျဉ်းစနစ် စစ်ဆေးမှုများ လွယ်ကူစေသည်
4. **အထူးအဆင့် အတည်ပြုမှု**: လုပ်ငန်းအဆင့်အတည်ပြုမှုပေးသူများမှ MFA စွမ်းရည်ကို ဆက်ခံသည်
5. **အခြေအနေဆိုင်ရာ ဝင်ရောက်ခွင့်မူဝါဒများ**: အန္တရာယ် အခြေခံ ဝင်ရောက်ခွင့်နှင့် လိုက်လျောညီထွေ အတည်ပြုပေးခြင်း

**လက်တွေ့အသုံးပြုမှုပြုလုပ်ရန် လိုအပ်ချက်များ:**
- **တိုကင် ပရိသတ်အတည်ပြုမှု**: တိုကင်အားလုံးသည် MCP ဆာဗာအတွက် ထုတ်ပြန်ထားခြင်းဖြစ်ကြောင်း စစ်ဆေးရန်
- **ထုတ်ပြန်သူ အတည်ပြုမှု**: တိုကင် ထုတ်ပြန်သူသည် မျှော်မှန်းထားသောအတိုင်ပင်ခံမှတ်ပုံတင်သူနှင့် ကိုက်ညီကြောင်း စစ်ဆေးရန်
- **လက်မှတ် အတည်ပြုမှု**: တိုကင် စင်ကြယ်မှုကို ခရစ်တိုဂရပ်ဖစ်နည်းဖြင့် သေချာစေရန်
- **ကုန်နောက် ကန့်သတ်ခြင်း**: တိုကင် အသက်တာကာလကို တင်းကြပ်စွာ လိုက်နာစေရန်
- **ပတ်ဝန်းကျင် အတည်ပြုမှု**: တိုကင်အတွင်း လိုအပ်သော ခွင့်ပြုချက်များ ပါဝင်မှုကို စစ်ဆေးရန်

### **ခွင့်ပြုမှု ရုပ်သိမ်းမှု လုံခြုံရေး**

**အရေးကြီးထိန်းချုပ်မှုများ:**
- **ခွင့်ပြုချက် စုံလင်စွာ စစ်ဆေးမှုများ**: ခွင့်ပြုချက် ဆုံးဖြတ်ချက် အချက်များအား လုံခြုံရေး ပြန်လည်စစ်ဆေးမှုများ
- **မဆုံးဖြတ်နိုင်သောအခါ ပါရှိမှု မရှိခြင်း**: ခွင့်ပြုချက် ရုပ်သိမ်းမှု အတည်မပြုနိုင်သည့်အခါ ဝင်ရောက်ခွင့်ကို ချုပ်ဆိုခြင်း
- **ခွင့်များအကွာအဝေး**: အခွင့်အရေးအဆင့်များနှင့် အရင်းအမြစ် ဝင်ရောက်ခွင့်များ ပေါ်လွင်ခွဲခြားခြင်း
- **စစ်ဆေးမှတ်တမ်းတင်ခြင်း**: ခွင့်ပြုချက် ဆုံးဖြတ်ချက်များအားလုံးကို လုံခြုံရေး စောင့်ကြည့်မှုအတွက် မှတ်တမ်းတင်ခြင်း
- ** ဝင်ရောက်ကြည့်ရှုခြင်းကို ပုံမှန်ပြုလုပ်ခြင်း**: အသုံးပြုသူ ခွင့်များနှင့် အခွင့်အလမ်း အသိအမှတ်ပြုခြင်းကို ဆက်တိုက်စစ်ဆေးခြင်း

## ၂။ **တိုကင် လုံခြုံရေးနှင့် အတုဖြတ်လမ်းထိန်းချုပ်မှုများ**

**OWASP MCP အန္တရာယ် ဖြေရှင်းချက်**: [MCP01 - တိုကင် မစီမံခန့်ခွဲမှုနှင့် လျှို့ဝှက်ချက် ထုတ်ဖောက်မှု](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **တိုကင် အတုဖြတ်လမ်းကာကွယ်မှု**

**MCP ခွင့်ပြုချက် အတုဖြတ်ခြင်းသည် ပြင်းထန်သော လုံခြုံရေး အန္တရာယ်များကြောင့် တင်းကြပ်တားမြစ်ထားသည်။**

**လုံခြုံရေး အန္တရာယ်များ:**
- **ထိန်းချုပ်မှုလွတ်လပ်မှုကျသင့်ခြင်း**: အရေးကြီး လုံခြုံရေး ထိန်းချုပ်မှုများ (နှုန်းထား ကန့်သတ်မှု၊ လျှောက်ထားမှု စစ်ဆေးခြင်း၊ သွယ်ဝိုက်ခြင်း ကြည့်ရှုမှု) မဖြတ်ကောင်းမှု
- **တာဝန်ပြတ်ခြင်း**: client ကို ဖော်ထုတ်၍ ထောက်ပြနိုင်မှု ပျက်ကွက်ခြင်း၊ စစ်ဆေးမှုလမ်းကြောင်း ညစ်ပတ်မှု
- **proxy အဆောက်အအုံမှလွတ်မြောက်မှု**: မလွဲမှားအချက်အလက် ဝင်ရောက်မှု ခွင့်မရှိသူများအတွက် ဆာဗာများ proxy အဖြစ် အသုံးပြုမှု
- **ယုံကြည်မှုနယ်နိမိတ် ချိုးဖောက်မှု**: တိုကင် အရင်းအမြစ်များအပေါ် ရှေ့ဆက်ဝန်ဆောင်မှု ယုံကြည်မှု အပြောအဆို ချိုးဖောက်ခြင်း
- **ဘက်ဖက်လှည့်ပြောင်းပြနိုင်မှု**: ဝန်ဆောင်မှု အများအပြားတွင် တိုကင် ပျက်စီးမှုဖြင့် တိုက်ခိုက်မှု ကြီးထွားမှုများ ဖြစ်ပေါ်ခြင်း

**လက်တွေ့လုပ်ငန်းစဉ်များ:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **လုံခြုံသော တိုကင် စီမံခန့်ခွဲမှု ပုံစံများ**

**အကောင်းဆုံး လေ့လာမှုများ:**
- **တိုကင် သက်တမ်းတို**: တိုကင်ပြောင်းလဲမှု အကြိမ်အများဖြင့် ထိခိုက်မှု ကန့်သတ်မှု ဦးတည်ပါသည်
- **လိုအပ်သည့်အချိန်တွင် ထုတ်ပေးခြင်း**: အထူးလုပ်ဆောင်မှုအတွက်သာ တိုကင် ထုတ်ပေးခြင်း
- **လုံခြုံသော သိုလှောင်မှု**: ဟာ့ဒ်ဝဲ လုံခြုံရေး ဂျွန်များ (HSM) သို့ Secure Key Vault များ အသုံးပြုခြင်း
- **တိုကင် ကပ်လျက်မှု**: တိုကင်များကို client နေရာပေါ်၊ session သို့မဟုတ် လုပ်ဆောင်ချက်အလိုက် ကပ်လျက်ထားခြင်း (ရနိုင်ပါက)
- **ကြည့်ရှုမှုနှင့် သတိပေးမှု**: တိုကင် မမှန်ကန်သော အသုံးပြုမှု သို့မဟုတ် ခွင့်မပြုထားသော ဝင်ရောက်မှုအတု များကို တိုက်ရိုက် ရှာဖွေသိရှိစေရန်

## ၃။ **session လုံခြုံရေး ထိန်းချုပ်မှုများ**

### **session ဖမ်းယူမှု ကာကွယ်မှု**

**တိုက်ခိုက်မှု များအတွက် အားထားရာ:**
- **session ဖမ်းယူ အကြောင်းအရာ ထည့်သွင်းမှု**: မသန့်ရှင်းသော ဖြစ်ရပ်များအား လူသုံး session တွင် ထည့်သွင်းခြင်း
- **session ပုဂ္ဂိုလ်ဖွဲ့ခြင်း**: ခိုးယူထားသော session ID များကို အသုံးပြု၍ အတည်ပြုခြင်းကင်းလွတ်မှုကျော် ဆင်းခြင်း
- **ပြန်လည်ထုတ်လွှင့်ချက်သို့ stream တုန့်ပြန်မှု ဖျက်ဆီးမှု**: ဆာဗာက ထုတ်လွှင့်သော event တန့်ပြန်မှုမှ ဆိုးရွားသော ဟန်ချက်ထည့်ခြင်း

**လိုအပ်သော session ထိန်းချုပ်မှု:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**ပို့ဆောင်ရေး လုံခြုံရေး:**
- **HTTPS အတည်ပြုမှု**: session ဆက်သွယ်မှုအားလုံး TLS 1.3 ဖြင့် ပေးပို့ရန်
- **လုံခြုံသော cookie attribute များ**: HttpOnly, Secure, SameSite=Strict
- **လက်မှတ်တပ်ဆင်ရေး**: MITM တိုက်ခိုက်မှုများကာကွယ်ရန် အရေးကြီး ဆက်သွယ်မှုများအတွက်

### ** Stateful နှင့် Stateless ပုံစံများ မျှဝေမှု**

**Stateful စနစ်များအတွက်:**
- မျှတခြင်း session အခြေအနေသည် ထည့်သွင်းမှုပို့ဆောင်မှုများအတွက် ကာကွယ်ရန် လိုအပ်သည်
- queue အခြေပြု session စီမံခန့်ခွဲမှုသည် ကျေကျေနပ်မှု စိစစ်မှု လိုအပ်သည်
- ဆာဗာ အတူတူပေါင်းစည်းမှုများအတွက် session အခြေအနေ ကို လုံခြုံစွာ ကျေကျေနပ်စေရန်

**Stateless စနစ်များအတွက်:**
- JWT သို့မဟုတ် တူညီသော တိုကင် အခြေပြု session စီမံခန့်ခွဲမှု
- session အခြေအနေ တရားဝင်မှုကို ခရစ်တိုဂရပ်ဖစ်နည်းဖြင့် စစ်ဆေးခြင်း
- တိုက်ခိုက်မှု ကြားနာမှု လျော့နည်းသော်လည်း တိုကင် စစ်ဆေးခြင်းအား ပြင်းပြင်းထန်ထန် လိုအပ်သည်

## ၄။ **AI အထူးလုံခြုံရေး ထိန်းချုပ်မှုများ**

**OWASP MCP အန္တရာယ်များ:**
- [MCP06 - Contextual Payload များမှ ဖြစ်တတ်သော Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - ကိရိယာ မှိုမြစ်ခြင်း](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - အမိန့် ထည့်သွင်းခြင်းနှင့် အကောင်အထည်ဖော်ခြင်း](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Prompt Injection ကာကွယ်မှု**

**Microsoft Prompt Shields အသုံးပြုမှု:**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**အသုံးပြုမှု ထိန်းချုပ်မှုများ:**
- **ရိုက်ထည့်မှု စားပွဲဆပ်မှု**: အသုံးပြုသူ ထည့်သွင်းတင်သွင်းမှုအားလုံးကို စုံလင်စွာ စစ်ဆေး၍ စာသားဖယ်ရှားမှု
- **အကြောင်းအရာ နယ်နိမိတ် သတ်မှတ်ခြင်း**: စနစ်ညွှန်ကြားချက်များနှင့် အသုံးပြုမှု အကြောင်းအရာများ ခွဲခြား သတ်မှတ်ခြင်း
- **ညွှန်ကြားချက် အဆင့်သတ်မှတ်ချက်**: ယှဉ်ပြိုင်ညွှန်ကြားချက်များအတွက် ထိပ်တန်းဥပဒေများ သတ်မှတ်ခြင်း
- **ထွက်ရှိမှု ကြည့်ရှုမှု**: ထိခိုက်မှု အန္တရာယ်ရှိ သို့မဟုတ် မမှန်ကန်သော ထွက်ရှိမှု များကို ရှာဖွေစောင့်ကြည့်ခြင်း

### **ကိရိယာ မှိုမြစ်မှု ကာကွယ်မှု**

**ကိရိယာ လုံခြုံရေး ဖွဲ့စည်းပုံ:**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**Dynamic ကိရိယာ စီမံခန့်ခွဲမှု:**
- **အတည်ပြု ခြုံငုံလက်ခံမှု**: ကိရိယာ ပြင်ဆင်မှုများအတွက် အသုံးပြုသူ သဘောတူညီချက် ရယူမှု
- **ပြန်လည်ဆွဲခြင်းနိုင်မှု**: ယခင်ကိရိယာ ဗားရှင်းများသို့ ပြန်လည်ပြောင်းနိုင်မှု
- **ပြောင်းလဲမှု စစ်ဆေးမှတ်တမ်း**: ကိရိယာ ဖော်ပြချက် ပြင်ဆင်မှုအားလုံး၏ မှတ်တမ်း
- **အန္တရာယ် အကဲဖြတ်မှု**: ကိရိယာ လုံခြုံရေး စရိုက်ကို အလိုအလျောက် အကဲဖြတ်ခြင်း

## ၅။ **Confused Deputy တိုက်ခိုက်မှု ကာကွယ်မှု**

### **OAuth Proxy လုံခြုံရေး**

**တိုက်ခိုက်မှု ကာကွယ်မှုပြုလုပ်ချက်များ:**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**လက်တွေ့ လိုအပ်ချက်များ:**
- **အသုံးပြုသူ သဘောတူညီချက် စစ်ဆေးမှု**: အလိုအလျောက်စာရင်းသွင်း client အတွက် သဘောတူညီချက် မကျော်ကြားရပါ
- **redirect URI စစ်ဆေးမှု**: ပြန်လည်ညွှန်ကြားရာ ဂရုစိုက်သတ်မှတ်ထားသော နယ်ပယ်အောက်သာ စစ်ဆေးမှု
- **ခွင့်ပြုခြင်း ကုဒ် ကာကွယ်မှု**: သက်တမ်းတိုပြီးတစ်ကြိမ်သာ အသုံးပြုနိုင်သော ကုဒ်များ
- **Client မှတ်ပုံတင်အချက်အလက် စစ်ဆေးမှု**: client လက်မှတ်များနှင့် metadata ကို ပြင်းထန်စွာ စစ်ဆေးခြင်း

## ၆။ **ကိရိယာ အကောင်အထည်ဖော်ခြင်း လုံခြုံရေး**

### **Sandboxing နှင့် သီးခြားထားခြင်း**

**Container အခြေပြု သီးခြားခြင်း:**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**လုပ်ငန်း သီးခြားမှု:**
- **လုပ်ငန်းသီးခြားမှု လုပ်ငန်းအဝိုင်း**: ကိရိယာ တစ်ခုစီသည် သီးခြားထားသော လုပ်ငန်း အတိုင်းအတာဖြင့် အကောင်အထည်ဖော်ခြင်း
- **လုပ်ငန်းများ ကြား ဆက်သွယ်မှု**: လုံခြုံသေချာသော IPC နည်းလမ်းများ နှင့် စစ်ဆေးမှုများ
- **လုပ်ငန်း စောင့်ကြည့်မှု**: အချိန်အတိုင်းအတာတွင် လုပ်ထုံးလုပ်နည်း သုံးသပ်မှု နှင့် ထူးခြားမှု စိစစ်မှု
- **အရင်းအမြစ် ကျူးလွန်မှု လုပ်နိမိတ်များ**: CPU, မှတ်ဉာဏ် နှင့် I/O လုပ်ငန်းများအတွက် ပြင်းထန်စွာ ကန့်သတ်ထားခြင်း

### **အနိမ့်ဆုံး ခွင့်ပြုချက် ပြုလုပ်မှု**

**ခွင့်ပြုချက် စီမံခန့်ခွဲမှု:**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## ၇။ **Supply Chain လုံခြုံရေးထိန်းချုပ်မှုများ**

**OWASP MCP အန္တရာယ် ဖြေရှင်းချက်**: [MCP04 - Supply Chain တိုက်ခိုက်မှုများ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **အညွှန်းအတည်ပြုမှု**

**ပတ္တိကာရေးစနစ် အပြည့်အဝ လုံခြုံမှု:**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **ဆက်တိုက် ကြည့်ရှုမှု**

**Supply Chain အန္တရာယ် ရှာဖွေရေး:**
- **အညွှန်းကျန်းမာရေး ကြည့်ရှုမှု**: လုံခြုံရေး ပြဿနာများအတွက် အားလုံး dependency များအဓိက သုံးသပ်မှု ဆက်တိုက်ပြုလုပ်ခြင်း
- **အန္တရာယ်သတင်းအချက်အလက် ပေါင်းစပ်ခြင်း**: ပုံမှန် အသစ်ထွက်လာသော Supply Chain အန္တရာယ်များအတွက် တုံ့ပြန်မှု
- **အပြုအမူ သုံးသပ်ခြင်း**: ပြင်ပ အစိတ်အပေါ်များ၏ မကျေနပ်ဖွယ်ပြုမူကို ရှာဖွေရေး
- **အလိုအလျောက် တုံ့ပြန်မှု**: ပျက်စီးသော အစိတ်အပိုင်းများကို ယခုပဲ ထိန်းသိမ်းခြင်း

## ၈။ **ကြည့်ရှုခြင်းနှင့် ရှာဖွေရေး ထိန်းချုပ်မှုများ**

**OWASP MCP အန္တရာယ် ဖြေရှင်းချက်**: [MCP08 - စစ်ဆေးမှတ်တမ်းနှင့် Telemetry မလုံလောက်မှု](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **လုံခြုံရေး စာရင်းသွင်းမှုနှင့် ဖြစ်ရပ် စီမံမှု (SIEM)**

**စာရင်းသွင်းမှု မူဝါဒ အပြည့်အစုံ:**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **အချိန်နောက်လိုက် အန္တရာယ် ရှာဖွေရေး**

**အပြုအမူ သုံးသပ်မှု:**
- **အသုံးပြုသူ အပြုအမူ သုံးသပ်မှု (UBA)**: မမှန်ကန်သော အသုံးပြုသူ ဝင်ရောက်မှု စံနမူနာများ သိရှိခြင်း
- **အဖွဲ့အစည်း အပြုအမူ သုံးသပ်မှု (EBA)**: MCP ဆာဗာ နှင့် ကိရိယာ အပြုအမူ စောင့်ကြည့်ခြင်း
- **စက်သင်ကြားမှု ထူးခြားမှု ရှာဖွေရေး**: AI စွမ်းအားဖြင့် လုံခြုံရေး အန္တရာယ် သိရှိခြင်း
- **အန္တရာယ် သတင်းအချက်အလက် ချိတ်ဆက်မှု**: သိရှိထားသော တိုက်ခိုက်မှု စံနမူနာများနှင့် ကြည့်ရှုမှုပေါင်းစည်းခြင်း

## ၉။ **ဖြစ်ရပ် တုံ့ပြန်မှု နှင့် ပြန်လည်ကယ်ဆယ်မှု**

### **အလိုအလျောက် တုံ့ပြန်နိုင်မှု စွမ်းရည်များ**

**ချက်ချင်း တုံ့ပြန်မှု လုပ်ဆောင်ချက်များ:**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **ငြိမ်းချမ်းရေး စစ်ဆေးခြင်း စွမ်းရည်များ**

**စုံစမ်းစစ်ဆေးမှု အထောက်အကူပြုမှု:**
- **စစ်ဆေးမှု လမ်းကြောင်း ထိန်းသိမ်းခြင်း**: ချိုးဖောက်ခြင်းမဖြစ်စေရန် ပြုစုပ်ထားသော စာရင်းများ
- **ထောက်ခံချက် စုဆောင်းမှု**: လုံခြုံရေး အမွှားဝှက် အချက်အလက်များကို အလိုအလျောက် စုဆောင်းခြင်း
- **အချိန်ကြောင်း ပြန်လည်ဖွဲ့စည်းခြင်း**: လုံခြုံရေး ဖြစ်စဥ်များ ဖြစ်ပေါ်ခန့်မှန်းရန် အသေးစိတ် အစီအစဉ်တစ်ခု
- **သက်ရောက်မှု အကဲဖြတ်ခြင်း**: ခိုးယူမှုအတိုင်းအတာနှင့် ဒေတာ ထွက်ပေါက်မှုကို သုံးသပ်ခြင်း

## **အဓိက လုံခြုံရေး အဆောက်အအုံ 원칙များ**

### **နက်ရှိုင်းစွာ ကာကွယ်ရေး**
- **လုံခြုံရေး အလွှာများ များစွာ**: လုံခြုံရေး အဆောက်အအုံအတွင်း တစ်ချက်တည်း ဖြတ်သန်းမှု မရှိစေရန်
- **ထပ်ဆောင်း ထိန်းချုပ်မှုများ**: အရေးကြီး လုပ်ငန်းများအတွက် လုံခြုံရေး ချိတ်ဆက်မှုများ ပိုမိုထူထောင်ခြင်း
- **မအောင်မြင်မိသည့် နည်းလမ်းများ**: အမှား အဖြစ်များ တွေ့ကြုံပါက လုံခြုံသည့် ပုံမှန် အခြေအနေသို့ ပြန်လည် ရောက်ရှိစေခြင်း

### **သုညယုံကြည်မှု အကောင်အထည်ဖော်မှု**
- **ဘယ်သူမျှ မယုံကြည် မည်၊ အမြဲ စစ်ဆေးမှု ပြုလုပ်သည်**: အဖွဲ့အစည်း နှင့် အချက်အလက်များအား စဉ်ဆက်မပြတ် စစ်ဆေးခြင်း
- **အနိမ့်ဆုံး ခွင့်ပြုချက် 원칙**: အစိတ်အပိုင်းအားလုံးအတွက် အနည်းဆုံး ဝင်ရောက်ခွင့် ပေးခြင်း
- **အသေးစားပိုင်းခွဲခြားမှု**: ကွန်ယက်နှင့် ဝင်ရောက်ခွင့် အလွှာအသေးစိတ် ခွဲခြားခြင်း

### **ဆက်တိုက် လုံခြုံရေး တိုးတက်မှုများ**
- **အန္တရာယ် အခြေအနေပေါ် ကိုက်ညီမှု**: အသစ်ထွက်ပေါ်လာသော အန္တရာယ်များကို လုပ်ဆောင်မှု များ သွားလာခြင်း
- **လုံခြုံရေး ထိန်းချုပ်မှု ထိရောက်မှု**: ထိန်းချုပ်မှုများ၏ ဘယ်လိုပါးစပ်မှု ဆိုင်းငံ့မှု မရှိစေရန် စမ်းသပ်တိုးတက်မှုများ ပြုလုပ်ခြင်း
- **စံနှုန်း ကျင့်သုံးမှု**: တိုးတက်ပြောင်းလဲနေသော MCP လုံခြုံရေး စံနှုန်းများနှင့် ကိုက်ညီမှု ဆောင်ရွက်ခြင်း

---

## **လက်တွေ့အသုံးပြုမှု အရင်းအမြစ်များ**

### **တရားဝင် MCP စာတမ်းများ**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP လုံခြုံရေး အရင်းအမြစ်များ**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Azure နဲ့ တွဲဖက်ပြီး ဖော်ပြထားသော OWASP MCP Top 10
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - တရားဝင် OWASP MCP လုံခြုံရေး အန္တရာယ်များ
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure ပေါ်တွင် MCP အတွက် လက်တွေ့ လုံခြုံရေး သင်တန်း

### **Microsoft လုံခြုံရေး ဖြေရှင်းချက်များ**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **လုံခြုံရေး စံနှုန်းများ**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **အရေးကြီး**: ဤလုံခြုံရေးထိန်းချုပ်မှုများမှာ လက်ရှိ MCP specification (2025-11-25) အတိုင်းပြုလုပ်ထားပါသည်။ မြတ်စွာသော [တရားဝင်စာတမ်းများ](https://spec.modelcontextprotocol.io/) နှင့်အမြဲ သေချာစစ်ဆေးပါ၊ စံနှုန်းများအမြန်တိုးတက်နေဆဲဖြစ်ပါသည်။

## နောက်တစ်ဆင့်

- ပြန်သွားရန်: [Security Module Overview](./README.md)
- ဆက်လုပ်ရန်: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**မှတ်ချက်အချက်အလက်**  
ဤစာရွက်စာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှုဖြစ်သော [Co-op Translator](https://github.com/Azure/co-op-translator) ဖြင့် ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှုအတွက် ကြိုးပမ်းပေမယ့်၊ အလိုအလျောက် ဘာသာပြန်မှုတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ရှိနိုင်ကြောင်း သိရှိပါစေ။ မူရင်းစာရွက်စာတမ်းသည် မိမိဘာသာစကားဖြင့် ရေးသားထားသည့် အရင်းအမြစ်အနေဖြင့် ယုံကြည်စိတ်ချရပါသည်။ အရေးကြီးသည့်အချက်အလက်များအတွက်တော့ လူပညာရှင်များ၏ ပရော်ဖက်ရှင်နယ် ဘာသာပြန်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်မှုကို အသုံးပြုမှုကြောင့် ဖြစ်ပေါ်လာသော မတိက်မှုများ သို့မဟုတ် မှားယွင်းချက်များအတွက် ကျွန်ုပ်တို့သည် တာဝန်မဝယ်ယူပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->