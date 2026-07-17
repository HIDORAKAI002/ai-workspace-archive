# Zagon tega primera

To je Rust rešitev za primer odjemalca LLM. Potrebujete nameščen Rust orodjarniški paket; glejte [uradni namestitveni vodnik](https://www.rust-lang.org/tools/install).

Odjemalec kliče model preko GitHub Models inference končne točke (`https://models.github.ai/inference/chat`) in prebere vaš osebni GitHub dostopni žeton (PAT) iz okoljske spremenljivke `OPENAI_API_KEY`.

> [!NOTE]
> Druge rešitve v tem repozitoriju uporabljajo `GITHUB_TOKEN`. Za Rust nastavite `OPENAI_API_KEY` na enako vrednost, da se ujema z konfiguracijo OpenAI odjemalca.

## -0- Nastavite svoj GitHub žeton

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Sestavite primer

```bash
cargo build
```

## -2- Zaženite primer

```bash
cargo run
```

Odjemalec zažene MCP strežnik kalkulatorja, pridobi njegov seznam orodij in uporabi model (`openai/gpt-5-mini`) za klic orodja `add`. Videli boste izpis, ki kaže na klic orodja (na primer "Calling tool: add") in rezultat tega klica.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->