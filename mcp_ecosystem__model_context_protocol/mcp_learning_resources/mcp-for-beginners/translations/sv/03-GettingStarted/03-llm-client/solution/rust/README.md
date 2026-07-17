# Köra detta exempel

Detta är Rust-lösningen för LLM-klientexemplet. Du behöver ha en Rust-toolchain installerad; se den [officiella installationsguiden](https://www.rust-lang.org/tools/install).

Klienten anropar en modell via GitHub Models inferens-endpoint (`https://models.github.ai/inference/chat`) och läser din personliga GitHub-access-token (PAT) från miljövariabeln `OPENAI_API_KEY`.

> [!NOTE]
> Andra lösningar i detta repo använder `GITHUB_TOKEN`. För Rust, sätt `OPENAI_API_KEY` till samma värde för att matcha OpenAI-klientens konfiguration.

## -0- Sätt din GitHub-token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Bygg exemplet

```bash
cargo build
```

## -2- Kör exemplet

```bash
cargo run
```

Klienten startar kalkylatorns MCP-server, hämtar dess verktygslista och använder modellen (`openai/gpt-5-mini`) för att anropa verktyget `add`. Du bör se output som visar verktygsanropet (till exempel, "Calling tool: add") och resultatet av det anropet.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->