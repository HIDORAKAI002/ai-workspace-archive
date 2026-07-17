# Spuštění tohoto příkladu

Toto je Rust řešení pro vzorový klient LLM. Musíte mít nainstalovaný Rust toolchain; viz [oficiální instalační příručka](https://www.rust-lang.org/tools/install).

Klient volá model přes GitHub Models inference endpoint (`https://models.github.ai/inference/chat`) a načítá váš GitHub osobní přístupový token (PAT) z proměnné prostředí `OPENAI_API_KEY`.

> [!NOTE]
> Ostatní řešení v tomto repozitáři používají `GITHUB_TOKEN`. Pro Rust nastavte `OPENAI_API_KEY` na stejnou hodnotu, aby odpovídala konfiguraci OpenAI klienta.

## -0- Nastavte váš GitHub token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Sestavte příklad

```bash
cargo build
```

## -2- Spusťte příklad

```bash
cargo run
```

Klient spustí MCP server kalkulačky, získá jeho seznam nástrojů a použije model (`openai/gpt-5-mini`) k volání nástroje `add`. Měli byste vidět výstup indikující volání nástroje (například "Calling tool: add") a výsledek tohoto volání.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->