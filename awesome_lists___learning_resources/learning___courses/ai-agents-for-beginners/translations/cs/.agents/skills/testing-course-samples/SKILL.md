---
name: testing-course-samples
---
# Testování ukázek kurzu

Ověřte, že poznámkové bloky lekcí a ukázkové kódy fungují s reálným
prostředím Microsoft Foundry / Azure OpenAI. Repo obsahuje skript
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1), který
bezhlavě spustí každý Python notebook a vytiskne tabulku PASS/FAIL.

## Kdy používat
- "Ověřit všechny poznámkové bloky / ukázky proti mé Azure předplatnému."
- "Rychlý test kurzu po aktualizaci balíčků nebo změně modelů."
- "Které lekce stále prochází / padají online?"

Ne **používejte** to pro AI Smoke Test GitHub Action (která ověřuje *nasazené*
hostované agenty — viz [`tests/README.md`](../../../tests/README.md)). Tento nástroj
spouští poznámkové bloky lokálně.

## Předpoklady (nejdříve zkontrolujte)
1. **Python 3.12+** s potřebnými balíčky kurzu: `python -m pip install -r requirements.txt`
   plus spuštěcí závislosti: `python -m pip install nbconvert ipykernel`.
2. **`.env` v kořenovém adresáři repozitáře** (zkopírovat ze souboru [`.env.example`](../../../../../.env.example)) s minimálně:
   - `AZURE_AI_PROJECT_ENDPOINT` — endpoint projektu ve Foundry
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — nasazení modelu, které není zastaralé (např. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) a `AZURE_OPENAI_DEPLOYMENT`
     pro lekce, které přímo volají Azure OpenAI (lekce 06, 02-azure-openai, 14 handoff/human-loop).
3. Dokončeno **`az login`** — ukázky autentizují přes `AzureCliCredential` (Entra ID, bez klíče).
4. Ověřit, že nasazení modelu existuje:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Spuštění ověření
```powershell
# Všechny Python notebooky (přeskakuje .NET, .venv, site-packages, překlady, dovednostní aktiva)
pwsh scripts/validate-notebooks.ps1

# Jedna lekce, s delším časovým limitem na buňku
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Pouze vypsat, co by se spustilo (bez spuštění)
pwsh scripts/validate-notebooks.ps1 -List

# Explicitní interpret (pokud `python` není v PATH, např. alias Windows Store)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Skript zapisuje spuštěné kopie, logy pro jednotlivé poznámkové bloky
do `$env:TEMP\aiab-nbval` a na výstup vrací počet selhání.

## Výklad výsledků
- `PASS` — poznámkový blok proběhl celý bez chyby v žádné buňce.
- `FAIL` — zobrazuje se první řádek s `*Error` / `*Exception`; otevřete odpovídající
  `log_*.txt` ve výstupním adresáři pro celý stack trace.
- Selhání jednoho poznámkového bloku je omezeno časovým limitem `-Timeout` (na buňku), takže vězněná
  buňka s čekáním na člověka se projeví jako `StdinNotImplementedError`, místo aby visela.

## Lekce vyžadující další zdroje (bez nich se očekává selhání)
| Lekce | Další požadavek |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, klíč) — má záložní cestu v paměti |
| 11 MCP / GitHub | GitHub MCP server + PAT |
| 13 paměť (cognee) | `cognee` nakonfigurován s poskytovatelem modelu |
| 15 využití prohlížeče | Nainstalované Playwright prohlížeče (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 lokální agent | Foundry Local runtime + stažený model Qwen (na zařízení, bez cloudu) |
| Poznámkové bloky `*-dotnet-*` | .NET Interactive kernel (výchozí vyloučeno; použijte `-IncludeDotnet`) |

## Zpětná zpráva
Shrňte jako tabulku PASS/FAIL seskupenou podle lekcí. Oddělte skutečné regrese
(chyby v kódu/konfiguraci k opravě) od mezery v prostředí (chybějící Search/Foundry Local/PAT),
a uveďte selhávající `log_*.txt` u každého skutečného selhání.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->