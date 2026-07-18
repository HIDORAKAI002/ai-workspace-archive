---
name: testing-course-samples
---
# Test af Kursusprøver

Bekræft, at lektionens notesbøger og kodeeksempler kører mod en live
Microsoft Foundry / Azure OpenAI opsætning. Repoet leverer en runner i
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) som
eksekverer hver Python-notesbog headless og printer en PASS/FAIL matrix.

## Hvornår skal det bruges
- "Valider alle notesbøger / prøver mod mit Azure abonnement."
- "Røgtest kurset efter opgraderinger af pakker eller ændringer i modeller."
- "Hvilke lektioner består stadig / fejler live?"

Brug **ikke** dette til AI Smoke Test GitHub Action (som validerer *udrullede*
hostede agenter — se [`tests/README.md`](../../../tests/README.md)). Denne skill
kører notesbøgerne lokalt.

## Forudsætninger (tjek først)
1. **Python 3.12+** med kursusafhængigheder: `python -m pip install -r requirements.txt`
   plus eksekutoren: `python -m pip install nbconvert ipykernel`.
2. **`.env` i repoets rod** (kopier fra [`.env.example`](../../../../../.env.example)) med mindst:
   - `AZURE_AI_PROJECT_ENDPOINT` — Foundry projekt-endpoint
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — en ikke-deprecieret udrulning (f.eks. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) og `AZURE_OPENAI_DEPLOYMENT`
     for lektioner, der kalder Azure OpenAI direkte (Lesson 06, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** fuldført — prøver autentificerer med `AzureCliCredential` (Entra ID, nøglefri).
4. Bekræft at modeludrulningen findes:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Kørsel af valideringen
```powershell
# Alle Python-notebooks (springer .NET, .venv, site-packages, oversættelser, færdighedsaktiver over)
pwsh scripts/validate-notebooks.ps1

# En enkelt lektion, med en længere timeout per celle
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Bare list hvad der ville blive kørt (ingen udførelse)
pwsh scripts/validate-notebooks.ps1 -List

# Eksplicit fortolker (hvis `python` ikke er på PATH, f.eks. Windows Store-alias)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Scriptet skriver eksekverede kopier, per-notesbog logs og `results.json` til
`$env:TEMP\aiab-nbval` og afslutter med antal fejl.

## Fortolkning af resultater
- `PASS` — notesbogen kørte end-to-end uden cellefejl.
- `FAIL` — den første `*Error` / `*Exception` linje vises; åbn den tilhørende
  `log_*.txt` i output-mappen for fuld trace.
- En enkelt notesbogs fejl er begrænset af `-Timeout` (pr. celle), så en hængende
  human-in-the-loop celle giver `StdinNotImplementedError` i stedet for at hænge.

## Lektioner som kræver ekstra ressourcer (forventet at fejle uden)
| Lektion | Ekstra krav |
|--------|------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, nøgle) — har en fallback i hukommelsen |
| 11 MCP / GitHub | GitHub MCP server + PAT |
| 13 memory (cognee) | `cognee` konfigureret med en modeludbyder |
| 15 browser-use | Playwright browsere installeret (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 local agent | Foundry Local runtime + en downloadet Qwen model (on-device, ingen cloud) |
| `*-dotnet-*` notesbøger | .NET Interactive kernel (udelukket som standard; brug `-IncludeDotnet`) |

## Rapportering tilbage
Opsummer som en PASS/FAIL tabel grupperet efter lektion. Adskil ægte regressioner
(kode-/konfigurationsfejl der skal fikses) fra miljø-mangler (manglende Search/Foundry Local/PAT),
og henvis til den fejlede `log_*.txt` for hver reel fejl.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->