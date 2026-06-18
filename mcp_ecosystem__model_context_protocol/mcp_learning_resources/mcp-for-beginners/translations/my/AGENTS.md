# AGENTS.md

## Project Overview

**MCP for Beginners** သည် Model Context Protocol (MCP) ကို သင်ယူရန်အတွက် အခမဲ့ပေါက်ဖြစ်ပညာရေးသင်ရိုးစနစ်တစ်ခုဖြစ်ပြီး အဆိုပါ MCP သည် AI မော်ဒယ်များနှင့် client applications များအကြား အပြန်အလှန်ဆက်သွယ်မှုအတွက် စံပြ ဖွဲ့စည်းပုံတစ်ခုဖြစ်သည်။ ဤ repository သည် အမျိုးမျိုးသော programming စာသားများအတွင်း hands-on ကုဒ်နမူနာများဖြင့် လေ့လာရန်အတွက် ပြည့်စုံသော သင်ကြားမှုများကို ပံ့ပိုးပေးသည်။

### Key Technologies

- **Programming Languages**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworks & SDKs**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Databases**: PostgreSQL with pgvector extension
- **Cloud Platforms**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Build Tools**: npm, Maven, pip, Cargo
- **Documentation**: Markdown with automated multi-language translation (48+ languages)

### Architecture

- **11 Core Modules (00-11)**: အခြေခံမှ အဆင့်မြင့်အထိ အစဉ်လိုက် သင်ယူမှုလမ်းကြောင်း
- **Hands-on Labs**: အမျိုးမျိုးသော programming languages များဖြင့် ပြည့်စုံသော ဖြေရှင်းနည်းကုဒ်များပါသော လက်တွေ့လေ့လာမှုများ
- **Sample Projects**: အလုပ်လုပ်နိုင်သည့် MCP ဆာဗာနှင့် client implementation များ
- **Translation System**: အလိုမရှိသော GitHub Actions workflow ဖြင့် ဘာသာစကားများစွာအတွက် ပံ့ပိုးမှု
- **Image Assets**: ဘာသာပြန်ထားသော ဓာတ်ပုံများပါဝင်သော ဓာတ်ပုံစည်းရုံးထားသော directory

## Setup Commands

ဤ repository သည် စာတမ်းအချက်အလက်ပေါ် အခြေခံထားသော repository ဖြစ်သည်။ မူရင်း sample projects နှင့် labs အတွင်းမှာ အများဆုံး setup ပြုလုပ်သည်။

### Repository Setup

```bash
# ရေစုပ်ရာဒေတာဂိုဒေါင်းလုပ်ထုတ်ပါ
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Working with Sample Projects

နမူနာ project များကို အောက်ပါနေရာများတွင် တွေ့ရှိနိုင်ပါသည်။
- `03-GettingStarted/samples/` - ဘာသာစကားအလိုက်နမူနာများ
- `03-GettingStarted/01-first-server/solution/` - ပထမဆုံး ဆာဗာ implementations များ
- `03-GettingStarted/02-client/solution/` - Client implementations များ
- `11-MCPServerHandsOnLabs/` - ပြည့်စုံသော ဒေတာဘေ့စ်ပေါင်းစပ်မှု လေ့လာမှုများ

နမူနာ project တစ်ခုချင်းစီတွင် ကိုယ်ပိုင် setup နည်းလမ်းများပါဝင်သည်။

#### TypeScript/JavaScript Projects
```bash
cd <project-directory>
npm install
npm start
```

#### Python Projects
```bash
cd <project-directory>
pip install -r requirements.txt
# သို့မဟုတ်
pip install -e .
python main.py
```

#### Java Projects
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Development Workflow

### Documentation Structure

- **Modules 00-11**: အစဉ်လိုက် အခြေခံသင်ရိုးအကြောင်းအရာများ
- **translations/**: ဘာသာစကားအလိုက် ဗားရှင်းများ (အလိုအလျောက်ထုတ်လုပ်ထားပြီး တိုက်ရိုက်ပြင်ဆင်ရန်မဟုတ်)
- **translated_images/**: ဒေသိယ အညွှန်းဓာတ်ပုံများ (အလိုအလျောက်ထုတ်လုပ်ထားသည်)
- **images/**: မူလဓာတ်ပုံများနှင့် ပုံကြမ်းများ

### Making Documentation Changes

1. အဖွဲ့အစည်း module directories (00-11) တွင် အင်္ဂလိပ် markdown ဖိုင်များသာ ပြင်ဆင်ပါ။
2. လိုအပ်ပါက `images/` directory တွင် ဓာတ်ပုံများကို update ပြုလုပ်ပါ။
3. Co-op-translator GitHub Action သည် ဘာသာပြန်များကို အလိုအလျောက်ထုတ်လုပ်ပေးပါမည်။
4. Main branch သို့ push လုပ်ခြင်းအခါ ဘာသာပြန်များ ပြန်လည်ထုတ်လုပ်သွားပါသည်။

### Working with Translations

- **Automated Translation**: GitHub Actions workflow သည် ဘာသာပြန်စာမျက်နှာများအားလုံးကို ကိုင်တွယ်ပေးသည်။
- **translations/ ထဲရှိ ဖိုင်များကို မသုညဖြစ်စွာ မတည်းဖြတ်ရ။
- အတိုင်းအတာ metadata ကို ဘာသာပြန်ထားသည့် ဖိုင်တိုင်းတွင် ထည့်သွင်းထားသည်။
- ပံ့ပိုးသော ဘာသာစကားများမှာ အာရေဗစ်၊ တရုတ်၊ ပြင်သစ်၊ ဂျာမဏီ၊ ဟိန္ဒီ၊ ဂျပန်၊ ကိုရီးယား၊ ပေါ်တူဂီ၊ ရုရှား၊ စပိန် နှင့် အခြားဘာသာစကား(၄၈) ကျော် ပါဝင်သည်။

## Testing Instructions

### Documentation Validation

ဤ repository သည် ရှင်းလင်းသောစာတမ်း repository ဖြစ်သောကြောင့် စစ်ဆေးမှုများမှာ အောက်ပါအတိုင်းဖြစ်သည်။

1. **Link Validation**: အတွင်းက 링크အားလုံးလုပ်ဆောင်နိုင်မှန်း စစ်ဆေးပါ။
```bash
# ပျက်စီးသွားသော markdown လင့်ခ်များကို စစ်ဆေးပါ
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Code Sample Validation**: ကုဒ်နမူနာများ compile/run ဖြစ်နိုင်မှန်း စမ်းသပ်ပါ။
```bash
# သတ်မှတ်ထားသောနမူနာသို့သွား၍ ၎င်း၏ စမ်းသပ်မှုများကို အလုပ်လုပ်ပါ။
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown Linting**: ဖော်မှတ်မှုများကို စံနှုန်းအတိုင်း စစ်ဆေးပါ။
```bash
# လိုအပ်လာပါက markdownlint ကို အသုံးပြုပါ
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Sample Project Testing

ဘာသာစကားအလိုက် sample များသည် ကိုယ်ပိုင် စမ်းသပ်နည်းလမ်းများပါဝင်သည်။

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Code Style Guidelines

### Documentation Style

- အသေးစားသင်ခန်းစာလူသိများသော ဘာသာစကား အသုံးပြုပါ။
- အသုံးပြုနိုင်သော ဘာသာစကားများအတွက် ကိုဒ်နမူနာများ ပါဝင်ပါ။
- markdown \- ၏ အကောင်းဆုံး လုပ်ကြံချက်များကို လိုက်နာပါ။
  - ATX-style ခေါင်းစဉ်များ (`#` syntax) အသုံးပြုပါ။
  - ဘာသာစကား မှတ်မှတ်သားသားအနေနဲ့ fenced code blocks အသုံးပြုပါ။
  - ဓာတ်ပုံများအတွက် ရှင်းလင်းသည့် alt မက္ခရာ ထည့်ပါ။
  - စာကြောင်းအရှည်ကို စနစ်တကျ ထိန်းသိမ်းပါ (ကန့်သတ်မထားပါ၊ သာမာန်ပြုပါ)။

### Code Sample Style

#### TypeScript/JavaScript
- ES modules (`import`/`export`) ကို အသုံးပြုပါ။
- TypeScript strict mode စံသတ်မှတ်ချက်များကို လိုက်နာပါ။
- type annotation များ ထည့်သွင်းပါ။
- ES2022 ကို လိုက်နာပါ။

#### Python
- PEP 8 စတိုင်ညွှန်ကြားချက်များကို လိုက်နာပါ။
- အဆိုပါတိုင်း type hints အသုံးပြုပါ။
- function နှင့် class တို့တွင် docstrings ထည့်သွင်းပါ။
- Python 3.8+ features များ အသုံးပြုပါ။

#### Java
- Spring Boot စည်းမျဉ်းများကို လိုက်နာပါ။
- Java 21 features များ အသုံးပြုပါ။
- Maven project စနစ်ကို လိုက်နာပါ။
- Javadoc မွတ်စလဲ မြား ထည့်ပါ။

### File Organization

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Build and Deployment

### Documentation Deployment

ဤ repository သည် GitHub Pages သို့မဟုတ် ဆင်တူ ဝက်ဘ်ဝန်ဆောင်မှုများကို အသုံးပြု၍ စာတမ်းအား တင်ထားပြီး ရှိနိုင်သည်။ Main branch တပြိုင်နက်တွင် ပြင်ဆင်မှုများ ဖြစ်လျှင် -

1. Translation workflow (`.github/workflows/co-op-translator.yml`) တက်ကြွမှုဖြစ်သည်။
2. အင်္ဂလိပ် markdown ဖိုင်များကို အလိုအလျောက် ဘာသာပြန်စနစ်ဖြင့် ပြန်လည်ထုတ်လုပ်သည်။
3. လိုအပ်သော အခါ image localization လုပ်ပေးသည်။

### No Build Process Required

ဤ repository သည် markdown စာတမ်းများ ဦးတည်ထားမည်ဖြစ်၍ အခြေခံ သင်ရိုးအကြောင်းအရာ အတွက် compilation သို့မဟုတ် build လုပ်ငန်းစဉ် မလိုအပ်ပါ။

### Sample Project Deployment

နမူနာ project တစ်ခုချင်းစီတွင် deployment အညွှန်းများ ပါရှိနိုင်သည်။
- MCP ဆာဗာ deployment လမ်းညွှန်ချက်များအတွက် `03-GettingStarted/09-deployment/` ကို ကြည့်ပါ။
- Azure Container Apps deployment နမူနာများကို `11-MCPServerHandsOnLabs/` တွင် တွေ့နိုင်ပါသည်။

## Contributing Guidelines

### Pull Request Process

1. **Fork and Clone**: Repository ကို fork ပြုလုပ်ပြီး ကိုယ့်ရဲ့ local မှာ clone လုပ်ပါ။
2. **Create a Branch**: ထူးခြားသော branch ဆိုဒ်မများ (ဥပမာ `fix/typo-module-3`, `add/python-example`) အသုံးပြုပါ။
3. **Make Changes**: English markdown ဖိုင်များသာ ပြင်ပါ (ဘာသာပြန်ဖိုင်များ မပြင်ရ)။
4. **Test Locally**: markdown rendering မှန်ကန်မှုစစ်ဆေးပါ။
5. **Submit PR**: ရှင်းလင်းသော PR ခေါင်းစဉ်နှင့် ဖော်ပြချက် များဖြင့် တင်ပြပါ။
6. **CLA**: Microsoft Contributor License Agreement ကို လိုအပ်သည့်အခါ လက်မှတ်ရေးပါ။

### PR Title Format

ရှင်းလင်းသည့် ခေါင်းစဉ်များ အသုံးပြုပါ။
- `[Module XX] အကျဥ်းသွားအယူ` သည် module-specific ပြင်ဆင်မှုများအတွက်။
- `[Samples] ဖော်ပြချက်` သည် sample code ပြင်ဆင်မှုအတွက်။
- `[Docs] ဖော်ပြချက်` သည် ယေဘူယျ စာတမ်းတိုးတက်မှုများအတွက်။

### What to Contribute

- စာတမ်း သို့မဟုတ် ကုဒ်နမူနာများတွင် အမှားပြင်ခြင်း
- ဘာသာစကားအသစ်များတွင် နမူနာကုဒ်အသစ်ထည့်ခြင်း
- ရှိပြီးသား အကြောင်းအရာများ ရှင်းလင်းထိန်းသိမ်းခြင်း
- အမှုလေ့လာမှုအသစ်များ သို့မဟုတ် လက်တွေ့ နမူနာများ ထည့်သွင်းခြင်း
- မရှင်းလင်းသော သို့မဟုတ် မှားသော အကြောင်းအရာများအတွက် ပြဿနာ အစီရင်ခံစာတင်ခြင်း

### What NOT to Do

- translations/ ဒါမှမဟုတ် translated_images/ ဒါမှမဟုတ် ဖိုင်များကို တိုက်ရိုက် ပြင်ဆင်ခြင်း မပြုရ။
- ၎င်းတွင် စိတ်တိုင်းမကျဖြစ်စေနိုင်သည့် ကြီးမားသော binary file များထည့်ပါက ဆွေးနွေးချက် မရှိစေလော့။
- ဘာသာပြန် workflow ဖိုင်များကို ပူးပေါင်းညှိနှိုင်းခြင်း မရှိဘဲ ပြင်ဆင်ခြင်း မလုပ်သင့်။

## Additional Notes

### Repository Maintenance

- **Changelog**: အရေးကြီးပြောင်းလဲမှုများကို `changelog.md` တွင် မှတ်သားထားသည်။
- **Study Guide**: သင်ရိုးညွှန်ကြားချက်အတွက် `study_guide.md` ကို အသုံးပြုပါ။
- **Issue Templates**: GitHub issue template များကို bug report နှင့် feature request များအတွက် အသုံးပြုပါ။
- **Code of Conduct**: ပါဝင်သူများအားလုံး Microsoft Open Source Code of Conduct ကို လိုက်နာရမည်။

### Learning Path

အစဉ်လိုက် module များ (00-11) အတိုင်း သွားပါ။
1. **00-02**: အခြေခံများ (နိဒါန်း၊ အဓိကအကြောင်းအရာများ၊ လုံခြုံရေး)
2. **03**: လက်တွေ့ဆောင်ရွက်မှု့နှင့်စပြီး
3. **04-05**: လက်တွေ့ဆောင်ရွက်မှု့နှင့် ဆန်းသစ် အကြောင်းအရာများ
4. **06-10**: လူမှုအသိုက်အဝန်း၊ အကောင်းဆုံး အလုပ်လုပ်နည်းများ နှင့် နောက်ခံအသုံးချမှုများ
5. **11**: ပြည့်စုံသော ဒေတာဘေ့စ် ပေါင်းစပ်ခြင်း လေ့လာမှု ၁၃ခု

### Support Resources

- **Documentation**: https://modelcontextprotocol.io/
- **Specification**: https://spec.modelcontextprotocol.io/
- **Community**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord server
- **Related Courses**: အခြား Microsoft သင်ယူမည့် လမ်းကြောင်းများအတွက် README.md တွင် ကြည့်ရှုနိုင်သည်။

### Common Troubleshooting

**Q: ကျွန်ုပ်၏ PR သည် ဘာသာပြန်စစ်ဆေးမှုတွင် မအောင်မြင်ပါ။**
A: အဆိုပါ ပြုပြင်မှုများသည် ဘာသာပြန်မဟုတ်သည့် English markdown ဖိုင်များ ပဲ အဓိက module directories မှာ ပြုလုပ်ထားကြောင်း သေချာစေပါ။

**Q: ဘာသာစကားအသစ် ထည့်ချင်ပါက ဘယ်လိုလုပ်မလဲ?**
A: ဘာသာစကား ပံ့ပိုးမှုကို co-op-translator workflow သီးသန့်စီမံခန့်ခွဲသည်။ အသစ်ထည့်ရန် အဆိုပြုချက်တင်ပါ။

**Q: ကုဒ်နမူနာများ ကိုင်တွယ်မရပါ။**
A: ကိုယ့်ရဲ့ sample README ထဲရှိ setup နည်းလမ်းများ လိုက်နာပြီးကြောင်း သေချာစေပါ။ လိုအပ်သည့် dependencies များရှိကြောင်း စစ်ဆေးပါ။

**Q: ဓာတ်ပုံများ မပြသပါ။**
A: ဓာတ်ပုံလမ်းကြောင်းများသည် relative ဖြစ်ပြီး forward slash များဖြင့်ရေးထားကြောင်း သေချာစေပြီး `images/` ဒါမှမဟုတ် `translated_images/` ဖိုင်ထဲတွင် ရှိရမည်။

### Performance Considerations

- ဘာသာပြန် workflow သည် နာရီအနည်းငယ် ကြာနိုင်သည်။
- ကြီးမားသောဓာတ်ပုံများကို commit မပြုမီ optimize ပြုလုပ်ထားပါ။
- markdown ဖိုင်များကို အကြောင်းအရာအလားအလာ ကောင်းစွာထားရေးခြင်း။
- ပိုမိုသီးခြားနိုင်ရန် relative links များကို အသုံးပြုပါ။

### Project Governance

ဤ project သည် Microsoft open source ကွန်ယက်ဖြစ်သည်။
- code နှင့် စာတမ်းများအတွက် MIT License
- Microsoft Open Source Code of Conduct
- ကူညီပေးသူများအတွက် CLA လုပ်ထုံးလုပ်နည်း
- လုံခြုံရေး ပြဿနာများအတွက် SECURITY.md လမ်းညွှန်ချက်ကို လိုက်နာပါ။
- အကူအညီ သိရန် SUPPORT.md ကို ကြည့်ပါ။

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->