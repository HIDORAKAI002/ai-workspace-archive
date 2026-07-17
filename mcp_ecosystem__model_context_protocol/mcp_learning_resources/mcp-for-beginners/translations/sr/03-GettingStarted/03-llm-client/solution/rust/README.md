# Покретање овог примера

Ово је Rust решење за пример LLM клијента. Потребно је да имате инсталиран Rust toolchain; погледајте [службени водич за инсталацију](https://www.rust-lang.org/tools/install).

Клијент позива модел преко GitHub Models inference endpoint (`https://models.github.ai/inference/chat`) и учитава ваш GitHub personal access token (PAT) из `OPENAI_API_KEY` променљиве окружења.

> [!NOTE]
> Остала решења у овом репозиторијуму користе `GITHUB_TOKEN`. За Rust, поставите `OPENAI_API_KEY` на исту вредност да бисте уклопили конфигурацију OpenAI клијента.

## -0- Поставите ваш GitHub токен

```bash
# зш/баш
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Изградите пример

```bash
cargo build
```

## -2- Покрените пример

```bash
cargo run
```

Клијент покреће MCP сервер калкулатора, преузима листу алата, и користи модел (`openai/gpt-5-mini`) да позове `add` алат. Требало би да видите излаз који указује на позив алата (на пример, "Calling tool: add") и резултат тог позива.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->