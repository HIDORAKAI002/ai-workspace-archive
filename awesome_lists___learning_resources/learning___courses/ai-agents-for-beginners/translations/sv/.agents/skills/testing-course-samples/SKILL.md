---
name: testing-course-samples
---
# Testa kursproverna

Validera att lektionsanteckningsböckerna och kodexemplen körs mot en live
Microsoft Foundry / Azure OpenAI-miljö. Repositoriet levererar en körbar fil på
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) som
exekverar varje Python-anteckningsbok utan användargränssnitt och skriver ut en PASS/FAIL-matris.

## När man ska använda
- "Validera alla anteckningsböcker / prov mot mitt Azure-abonnemang."
- "Rök-testa kursen efter uppgradering av paket eller ändring av modeller."
- "Vilka lektioner klarar fortfarande / misslyckas live?"

Använd **inte** detta för AI Smoke Test GitHub Action (som validerar *distribuerade*
hostade agenter — se [`tests/README.md`](../../../tests/README.md)). Detta verktyg
kör anteckningsböckerna lokalt.

## Förutsättningar (kontrollera först)
1. **Python 3.12+** med kursberoenden: `python -m pip install -r requirements.txt`
   plus exekveraren: `python -m pip install nbconvert ipykernel`.
2. **`.env` i repots rotmapp** (kopiera från [`.env.example`](../../../../../.env.example)) med minst:
   - `AZURE_AI_PROJECT_ENDPOINT` — Foundry-projektets slutpunkt
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — en icke-avskriven distribution (t.ex. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) och `AZURE_OPENAI_DEPLOYMENT`
     för lektioner som anropar Azure OpenAI direkt (Lektion 06, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** slutfört — prover autentiserar med `AzureCliCredential` (Entra ID, nyckellöst).
4. Verifiera att modellen finns:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Köra valideringen
```powershell
# Alla Python-anteckningsböcker (hoppar över .NET, .venv, site-packages, översättningar, färdighetsresurser)
pwsh scripts/validate-notebooks.ps1

# En enda lektion, med en längre timeout per cell
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Lista bara vad som skulle köras (ingen körning)
pwsh scripts/validate-notebooks.ps1 -List

# Explicit tolk (om `python` inte finns på PATH, t.ex. Windows Store-alias)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Skriptet skriver exekverade kopior, per-anteckningsboksloggar och `results.json` till
`$env:TEMP\aiab-nbval` och avslutar med antalet misslyckanden.

## Tolka resultaten
- `PASS` — anteckningsboken kördes igenom utan cellfel.
- `FAIL` — första raden med `*Error` / `*Exception` visas; öppna motsvarande
  `log_*.txt` i utmatningsmappen för fullständig spårning.
- Misslyckande i en enstaka anteckningsbok begränsas av `-Timeout` (per cell), så en frusen
  mänsklig-i-loopen-cell visas som `StdinNotImplementedError` istället för att hänga sig.

## Lektioner som behöver extra resurser (förväntas misslyckas utan dem)
| Lektion | Extra krav |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, nyckel) — har fallback i minnet |
| 11 MCP / GitHub | GitHub MCP-server + PAT |
| 13 memory (cognee) | `cognee` konfigurerad med en modellleverantör |
| 15 browser-use | Playwright-surfare installerade (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 local agent | Foundry Local runtime + en nedladdad Qwen-modell (på enheten, ingen moln) |
| `*-dotnet-*` anteckningsböcker | .NET Interactive-kärna (utesluts som standard; använd `-IncludeDotnet`) |

## Rapportering tillbaka
Sammanfatta som en PASS/FAIL-tabell grupperad efter lektion. Separera verkliga regressioner
(kod-/konfigurationsbuggar att fixa) från miljöbrister (saknad Search/Foundry Local/PAT),
och hänvisa till den misslyckade `log_*.txt` för varje verkligt fel.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->