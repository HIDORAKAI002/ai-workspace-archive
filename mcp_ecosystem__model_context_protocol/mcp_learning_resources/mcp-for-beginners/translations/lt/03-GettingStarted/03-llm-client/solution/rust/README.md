# Šio pavyzdžio vykdymas

Tai Rust sprendimas LLM kliento pavyzdžiui. Reikia turėti įdiegtą Rust įrankių grandinę; žr. [oficialią diegimo instrukciją](https://www.rust-lang.org/tools/install).

Klientas kviečia modelį per GitHub Models spėjimo galinį tašką (`https://models.github.ai/inference/chat`) ir skaito jūsų GitHub asmeninį prieigos raktą (PAT) iš aplinkos kintamojo `OPENAI_API_KEY`.

> [!NOTE]
> Kiti šio repozitorijaus sprendimai naudoja `GITHUB_TOKEN`. Rust atveju nustatykite `OPENAI_API_KEY` tokią pačią reikšmę, kad atitiktų OpenAI kliento konfigūraciją.

## -0- Nustatykite savo GitHub raktą

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Sukurkite pavyzdį

```bash
cargo build
```

## -2- Vykdykite pavyzdį

```bash
cargo run
```

Klientas paleidžia kalkuliatoriaus MCP serverį, gauna jo įrankių sąrašą ir naudoja modelį (`openai/gpt-5-mini`) kviesdamas įrankį `add`. Turėtumėte matyti išvestį, nurodančią įrankio kvietimą (pvz., "Calling tool: add") ir šio kvietimo rezultatą.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->