# Spustenie tohto príkladu

Toto je Rust riešenie vzorky pre klienta LLM. Musíte mať nainštalovaný Rust toolchain; pozrite si [oficiálny inštalačný návod](https://www.rust-lang.org/tools/install).

Klient volá model cez inference endpoint GitHub Models (`https://models.github.ai/inference/chat`) a číta váš osobný prístupový token GitHub (PAT) z environmentálnej premennej `OPENAI_API_KEY`.

> [!NOTE]
> Ostatné riešenia v tomto repozitári používajú `GITHUB_TOKEN`. Pre Rust nastavte `OPENAI_API_KEY` na rovnakú hodnotu, aby ste zladili konfiguráciu klienta OpenAI.

## -0- Nastavte svoj GitHub token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Skompilujte príklad

```bash
cargo build
```

## -2- Spustite príklad

```bash
cargo run
```

Klient spustí MCP server kalkulačky, načíta jeho zoznam nástrojov a použije model (`openai/gpt-5-mini`) na volanie nástroja `add`. Mali by ste vidieť výstup označujúci volanie nástroja (napríklad "Calling tool: add") a výsledok tohto volania.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->