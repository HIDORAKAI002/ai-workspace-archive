---
name: testing-course-samples
---
# A kurzusminták tesztelése

Ellenőrizd, hogy a leckék jegyzetfüzetei és kódmintái futtathatók-e egy élő
Microsoft Foundry / Azure OpenAI környezetben. A tároló tartalmaz egy futtatót a
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) fájlban, amely
fej nélküli módban lefuttatja az összes Python jegyzetfüzetet, és PASS/FAIL mátrixot nyomtat ki.

## Mikor használd
- "Ellenőrizd az összes jegyzetfüzetet/mintát az Azure előfizetésemhez képest."
- "Gyors-teszteld a kurzust csomagfrissítés vagy modellváltás után."
- "Mely leckék futnak le, illetve hibáznak élőben?"

Ne használd az AI Smoke Test GitHub Action-höz (ami a *telepített*
hosztolt ügynököket validálja — lásd [`tests/README.md`](../../../tests/README.md))! Ez a skill
helyi jegyzetfüzet-futtatást végez.

## Előfeltételek (ellenőrizd először)
1. **Python 3.12+** a kurzusfüggőségekkel: `python -m pip install -r requirements.txt`
   plusz a futtató: `python -m pip install nbconvert ipykernel`.
2. **`.env` a tároló gyökerében** (másold a [`.env.example`](../../../../../.env.example) fájlból) legalább az alábbiakkal:
   - `AZURE_AI_PROJECT_ENDPOINT` — Foundry projektvégpont
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — egy nem elavult üzembe helyezés (pl. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) és `AZURE_OPENAI_DEPLOYMENT`
     azokhoz a leckékhez, amelyek közvetlenül hívják az Azure OpenAI-t (06. lecke, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** befejezve — a minták `AzureCliCredential`-lel azonosítanak (Entra ID, kulcs nélkül).
4. Ellenőrizd, hogy létezik a modelltelepítés:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## A validálás futtatása
```powershell
# Minden Python jegyzetfüzet (kihagyja a .NET, .venv, site-packages, fordítások, készség erőforrások mappákat)
pwsh scripts/validate-notebooks.ps1

# Egyetlen lecke, hosszabb cellánkénti időkorláttal
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Csak felsorolja, mi futna (nincs végrehajtás)
pwsh scripts/validate-notebooks.ps1 -List

# Explicit értelmező (ha a `python` nincs a PATH-ban, pl. Windows Store alias)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
A szkript az elvégzett másolatokat, jegyzetfüzetenkénti naplókat és a `results.json` fájlt ír a
`$env:TEMP\aiab-nbval` könyvtárba, és a hibák számával tér vissza.

## Az eredmények értelmezése
- `PASS` — a jegyzetfüzet hibamentesen, végig lefutott.
- `FAIL` — az első megjelenő `*Error` / `*Exception` sor látható; a teljes nyomkövetésért nyisd meg a megfelelő
  `log_*.txt` fájlt a kimeneti könyvtárban.
- Egy jegyzetfüzet hibáját a `-Timeout` (cellánként) korlátozza, így egy lefagyott
  emberi-interakciót igénylő cella nem akad meg, hanem `StdinNotImplementedError` hibát jelez.

## Többlet erőforrást igénylő leckék (hibával várhatók erőforrások nélkül)
| Lecke | Extra követelmény |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, kulcs) — van memóriabeli pótló útvonal |
| 11 MCP / GitHub | GitHub MCP szerver + PAT |
| 13 memory (cognee) | `cognee` modell-szolgáltatóval konfigurálva |
| 15 browser-use | Telepített Playwright böngészők (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 local agent | Foundry helyi futtatókörnyezet + letöltött Qwen modell (eszközön, felhő nélkül) |
| `*-dotnet-*` jegyzetfüzetek | .NET Interactive kernel (alapból kizárva; használd a `-IncludeDotnet` opciót) |

## Visszajelzés
Foglald össze PASS/FAIL táblázatban lecke szerint csoportosítva. Különítsd el a valódi regressziókat
(javítandó kód-/konfig hibák) a környezeti hiányosságoktól (hiányzó Search/Foundry Local/PAT),
és tüntesd fel minden jogos hiba esetén a hibás `log_*.txt` fájlt.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->