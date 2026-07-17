# Kør denne prøve

Dette er Rust-løsningen til LLM-klienteksemplet. Du skal have en Rust-værktøjskæde installeret; se den [officielle installationsvejledning](https://www.rust-lang.org/tools/install).

Klienten kalder en model gennem GitHub Models inference-endpointet (`https://models.github.ai/inference/chat`) og læser din GitHub personlige adgangskode (PAT) fra miljøvariablen `OPENAI_API_KEY`.

> [!NOTE]
> Andre løsninger i dette repo bruger `GITHUB_TOKEN`. For Rust, sæt `OPENAI_API_KEY` til samme værdi for at matche OpenAI-klientkonfigurationen.

## -0- Sæt dit GitHub-token

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- Byg prøven

```bash
cargo build
```

## -2- Kør prøven

```bash
cargo run
```

Klienten starter calculator MCP-serveren, henter dens værktøjsliste og bruger modellen (`openai/gpt-5-mini`) til at kalde `add`-værktøjet. Du skulle se output, der indikerer værktøjskaldet (for eksempel, "Calling tool: add") og resultatet af det kald.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->