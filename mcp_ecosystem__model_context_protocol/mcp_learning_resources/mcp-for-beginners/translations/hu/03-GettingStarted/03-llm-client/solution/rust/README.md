# Ez a minta futtatása

Ez a Rust megoldás az LLM kliens mintához. Szükséged van egy Rust eszközkészlet telepítésére; lásd a [hivatalos telepítési útmutatót](https://www.rust-lang.org/tools/install).

A kliens egy modellt hív meg a GitHub Models inference végponton keresztül (`https://models.github.ai/inference/chat`), és a GitHub személyes hozzáférési tokenedet (PAT) az `OPENAI_API_KEY` környezeti változóból olvassa be.

> [!NOTE]
> A repo más megoldásai a `GITHUB_TOKEN`-t használják. Rust esetén állítsd be az `OPENAI_API_KEY`-t ugyanarra az értékre, hogy illeszkedjen az OpenAI kliens konfigurációjához.

## -0- Állítsd be a GitHub tokened

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Fordítsd le a mintát

```bash
cargo build
```

## -2- Futtasd a mintát

```bash
cargo run
```

A kliens elindítja a számológép MCP szervert, lekéri az eszközlistáját, és a modellt (`openai/gpt-5-mini`) használva hívja meg az `add` eszközt. Látnod kell egy üzenetet az eszköz hívásáról (például: "Calling tool: add") és a hívás eredményét.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->