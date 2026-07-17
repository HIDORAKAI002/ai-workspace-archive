# Deze voorbeeld uitvoeren

Dit is de Rust-oplossing voor de LLM-clientvoorbeeld. Je hebt een Rust-toolchain nodig; zie de [officiële installatiewijzer](https://www.rust-lang.org/tools/install).

De client roept een model aan via het GitHub Models-inferentie-eindpunt (`https://models.github.ai/inference/chat`) en leest je persoonlijke GitHub-toegangstoken (PAT) uit de omgevingsvariabele `OPENAI_API_KEY`.

> [!NOTE]
> Andere oplossingen in deze repo gebruiken `GITHUB_TOKEN`. Voor Rust stel je `OPENAI_API_KEY` in op dezelfde waarde om overeen te komen met de OpenAI-clientconfiguratie.

## -0- Stel je GitHub-token in

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Bouw het voorbeeld

```bash
cargo build
```

## -2- Voer het voorbeeld uit

```bash
cargo run
```

De client start de calculator MCP-server, haalt zijn lijsten met tools op en gebruikt het model (`openai/gpt-5-mini`) om de `add`-tool aan te roepen. Je zou een uitvoer moeten zien die de toolaanroep aangeeft (bijvoorbeeld, "Calling tool: add") en het resultaat van die aanroep.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->