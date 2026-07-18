---
name: testing-course-samples
---
# Testing av kursprøver

Verifiser at leksjonsnotatbøkene og kodeeksemplene kjører mot en levende
Microsoft Foundry / Azure OpenAI-oppsett. Repoet leverer en kjører på
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) som
kjører alle Python-notatbøker hodløs og skriver ut en PASS/FAIL-matrise.

## Når å bruke
- "Verifiser alle notatbøker / prøver mot mitt Azure-abonnement."
- "Røyk-test kurset etter oppgradering av pakker eller modellendringer."
- "Hvilke leksjoner består / feiler fortsatt live?"

Bruk **ikke** dette for AI Smoke Test GitHub Action (som validerer *utrullede*
hostede agenter — se [`tests/README.md`](../../../tests/README.md)). Denne skillen
kjører notatbøkene lokalt.

## Forutsetninger (sjekk først)
1. **Python 3.12+** med kursavhengigheter: `python -m pip install -r requirements.txt`
   pluss kjøreren: `python -m pip install nbconvert ipykernel`.
2. **`.env` i repoets rot** (kopier fra [`.env.example`](../../../../../.env.example)) med minst:
   - `AZURE_AI_PROJECT_ENDPOINT` — Foundry prosjekt-endepunkt
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — en ikke-utgått distribusjon (f.eks. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) og `AZURE_OPENAI_DEPLOYMENT`
     for leksjoner som direkte kaller Azure OpenAI (Leksjon 06, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** fullført — prøver autentiseres med `AzureCliCredential` (Entra ID, nøkkelløst).
4. Verifiser at modell-distribusjonen finnes:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Kjøre valideringen
```powershell
# Alle Python-notatbøker (hopper over .NET, .venv, site-packages, oversettelser, ferdighetsressurser)
pwsh scripts/validate-notebooks.ps1

# En enkelt leksjon, med lengre tidsavbrudd per celle
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Bare list opp det som ville kjørt (ingen utførelse)
pwsh scripts/validate-notebooks.ps1 -List

# Eksplisitt tolk (hvis `python` ikke er på PATH, f.eks. Windows Store-alias)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Skriptet skriver utkjørte kopier, loggfiler per notatbok, og `results.json` til
`$env:TEMP\aiab-nbval` og avslutter med antallet feil.

## Tolkning av resultater
- `PASS` — notatboken kjørte fra start til slutt uten cellefeil.
- `FAIL` — den første `*Error` / `*Exception` linjen vises; åpne den tilsvarende
  `log_*.txt` i utdata-mappen for full traceback.
- Én enkelt notatboks sin feil fanges av `-Timeout` (per celle), så en hengende
  human-in-the-loop-celle vises som `StdinNotImplementedError` i stedet for å henge.

## Leksjoner som trenger ekstra ressurser (forventet å feile uten dem)
| Leksjon | Ekstra krav |
|--------|--------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, nøkkel) — har en fallback i minnet |
| 11 MCP / GitHub | GitHub MCP-server + PAT |
| 13 minne (cognee) | `cognee` konfigurert med en modellleverandør |
| 15 nettleserbruk | Playwright-nettlesere installert (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 lokal agent | Foundry Local runtime + en nedlastet Qwen-modell (på enheten, ikke sky) |
| `*-dotnet-*` notatbøker | .NET Interactive-kjerne (utelatt som standard; bruk `-IncludeDotnet`) |

## Rapportering tilbake
Oppsummer som en PASS/FAIL-tabell gruppert etter leksjon. Skill ekte regresjoner
(kode-/konfigurasjonsfeil som må fikses) fra miljømangler (manglende Search/Foundry Local/PAT),
og henvis til den feilede `log_*.txt` for hver virkelig feil.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->