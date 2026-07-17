# Kjøre dette eksemplet

Dette er Rust-løsningen for LLM-klienteksemplet. Du må ha et Rust-verktøysett installert; se den [offisielle installasjonsveiledningen](https://www.rust-lang.org/tools/install).

Klienten kaller en modell gjennom GitHub Models sin inferanse-endepunkt (`https://models.github.ai/inference/chat`) og leser din GitHub personlige tilgangstoken (PAT) fra miljøvariabelen `OPENAI_API_KEY`.

> [!NOTE]
> Andre løsninger i dette depotet bruker `GITHUB_TOKEN`. For Rust, sett `OPENAI_API_KEY` til samme verdi for å matche OpenAI-klientkonfigurasjonen.

## -0- Sett din GitHub-token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Bygg eksemplet

```bash
cargo build
```

## -2- Kjør eksemplet

```bash
cargo run
```

Klienten starter kalkulator MCP-serveren, henter verktøyliste, og bruker modellen (`openai/gpt-5-mini`) til å kalle `add`-verktøyet. Du skal se output som indikerer verktøysamtalen (for eksempel, "Calling tool: add") og resultatet av den samtalen.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->