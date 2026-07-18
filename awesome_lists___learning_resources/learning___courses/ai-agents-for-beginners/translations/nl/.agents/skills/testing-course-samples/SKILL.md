---
name: testing-course-samples
---
# Het testen van de Cursusvoorbeelden

Valideer dat de lesnotebooks en codevoorbeelden draaien tegen een live
Microsoft Foundry / Azure OpenAI setup. De repo bevat een runner in
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) die
elke Python notebook headless uitvoert en een PASS/FAIL matrix print.

## Wanneer te gebruiken
- "Valideer alle notebooks / voorbeelden tegen mijn Azure abonnement."
- "Voer een rooktest uit op de cursus na het upgraden van pakketten of veranderen van modellen."
- "Welke lessen slagen of falen nog live?"

Gebruik dit **niet** voor de AI Smoke Test GitHub Action (die *geïmplementeerde*
hosted agents valideert — zie [`tests/README.md`](../../../tests/README.md)). Deze skill
draait de notebooks lokaal.

## Vereisten (eerst controleren)
1. **Python 3.12+** met cursusafhankelijkheden: `python -m pip install -r requirements.txt`
   plus de executor: `python -m pip install nbconvert ipykernel`.
2. **`.env` in de root van de repo** (kopieer van [`.env.example`](../../../../../.env.example)) met minimaal:
   - `AZURE_AI_PROJECT_ENDPOINT` — Foundry project endpoint
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — een niet-verouderde deployment (bijv. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) en `AZURE_OPENAI_DEPLOYMENT`
     voor lessen die Azure OpenAI direct aanroepen (Les 06, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** voltooid — voorbeelden authenticeren met `AzureCliCredential` (Entra ID, zonder sleutel).
4. Controleer of de modeldeployment bestaat:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## De validatie uitvoeren
```powershell
# Alle Python-notebooks (slaat .NET, .venv, site-packages, vertalingen, vaardigheidsassets over)
pwsh scripts/validate-notebooks.ps1

# Een enkele les, met een langere timeout per cel
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Alleen opsommen wat uitgevoerd zou worden (geen uitvoer)
pwsh scripts/validate-notebooks.ps1 -List

# Expliciete interpreter (als `python` niet in PATH staat, bv. Windows Store alias)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Het script schrijft uitgevoerde kopieën, per-notebook logs, en `results.json` naar
`$env:TEMP\aiab-nbval` en stopt met het aantal fouten als exitcode.

## Resultaten interpreteren
- `PASS` — de notebook liep end-to-end zonder cel fouten.
- `FAIL` — de eerste `*Error` / `*Exception` regel wordt getoond; open het bijhorende
  `log_*.txt` in de uitvoermap voor de volledige traceback.
- Een enkele notebookfout wordt begrensd door `-Timeout` (per cel), dus een vastgelopen
  human-in-the-loop cel verschijnt als `StdinNotImplementedError` in plaats van te hangen.

## Lessen die extra resources nodig hebben (verwacht dat ze falen zonder)
| Les | Extra vereiste |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, sleutel) — heeft een in-memory fallback pad |
| 11 MCP / GitHub | GitHub MCP server + PAT |
| 13 geheugen (cognee) | `cognee` geconfigureerd met een modelprovider |
| 15 browser-gebruik | Playwright browsers geïnstalleerd (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 lokale agent | Foundry Local runtime + een gedownload Qwen model (op apparaat, geen cloud) |
| `*-dotnet-*` notebooks | .NET Interactive kernel (standaard uitgezonderd; gebruik `-IncludeDotnet`) |

## Terugrapporteren
Vat samen als een PASS/FAIL tabel gegroepeerd per les. Scheid echte regressies
(code/config bugs om te fixen) van omgevingsproblemen (missende Search/Foundry Local/PAT),
en vermeld de falende `log_*.txt` voor elke echte fout.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->