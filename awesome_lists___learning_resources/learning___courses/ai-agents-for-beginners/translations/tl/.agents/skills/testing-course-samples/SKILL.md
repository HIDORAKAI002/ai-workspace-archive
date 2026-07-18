---
name: testing-course-samples
description: Gamitin kapag hiniling na i-validate, subukan, smoke-test, o patakbuhin
  ang notebook at mga sample na code ng kurso laban sa isang live na Microsoft Foundry
  / Azure OpenAI na konfigurasyon. Saklaw nito ang pagsasaayos ng kapaligiran (.env,
  az login, mga pakete), ang scripts/validate-notebooks.ps1 runner, pagpapakahulugan
  ng mga resulta ng PASS/FAIL, at kung aling mga aralin ang nangangailangan ng karagdagang
  mga mapagkukunan (Azure AI Search, GitHub MCP, Foundry Local, Playwright).
---
# Pagsusuri sa Mga Halimbawa ng Kurso

Suriin na ang mga lesson notebook at mga halimbawa ng code ay tumatakbo laban sa isang live na
Microsoft Foundry / Azure OpenAI setup. Naglalaman ang repo ng isang runner sa
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) na
nag-e-execute ng bawat Python notebook nang headlessly at nagpi-print ng PASS/FAIL matrix.

## Kailan Gagamitin
- "Suriin ang lahat ng mga notebook / halimbawa laban sa aking Azure subscription."
- "Smoke-test ang kurso pagkatapos i-upgrade ang mga package o baguhin ang mga modelo."
- "Alin sa mga lesson ang pumapasa / bumabagsak ng live?"

Huwag gamitin ito para sa AI Smoke Test GitHub Action (na sumusuri sa *deployed*
hosted agents — tingnan ang [`tests/README.md`](../../../tests/README.md)). Ang kasanayang ito
ay pinapatakbo ang mga notebook nang lokal.

## Mga Kinakailangan (suriing muna)
1. **Python 3.12+** na may mga deps ng kurso: `python -m pip install -r requirements.txt`
   pati na rin ang executor: `python -m pip install nbconvert ipykernel`.
2. **`.env` sa root ng repo** (kopyahin mula sa [`.env.example`](../../../../../.env.example)) na may hindi bababa sa:
   - `AZURE_AI_PROJECT_ENDPOINT` — endpoint ng Foundry project
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — isang hindi deprecated na deployment (hal. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) at `AZURE_OPENAI_DEPLOYMENT`
     para sa mga lesson na direktang tumatawag sa Azure OpenAI (Lesson 06, 02-azure-openai, 14 handoff/human-loop).
3. **Natapos na ang `az login`** — ang mga halimbawa ay nagpapatunay gamit ang `AzureCliCredential` (Entra ID, walang susi).
4. Siguraduhing umiiral ang deployment ng modelo:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Pagsasagawa ng pagsusuri
```powershell
# Lahat ng Python notebook (hinahakbang ang .NET, .venv, site-packages, translations, skill assets)
pwsh scripts/validate-notebooks.ps1

# Isang leksyon lang, na may mas mahabang timeout bawat cell
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Ilista lang kung ano ang tatakbo (walang pagpapatupad)
pwsh scripts/validate-notebooks.ps1 -List

# Tiyak na interpreter (kung ang `python` ay wala sa PATH, hal. Windows Store alias)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Ang script ay nagsusulat ng mga na-execute na kopya, mga log per notebook, at `results.json` sa
`$env:TEMP\aiab-nbval` at lalabas na may bilang ng mga nabigong kaso.

## Pag-interpret ng mga resulta
- `PASS` — tumakbo ang notebook mula simula hanggang dulo nang walang error sa cell.
- `FAIL` — ipinapakita ang unang linya ng `*Error` / `*Exception`; buksan ang tumutugmang
  `log_*.txt` sa output na direktoryo para sa buong traceback.
- Ang pagbagsak ng isang notebook ay nililimitahan ng `-Timeout` (bawat cell), kaya ang isang hindi tumutugon
  na human-in-the-loop na cell ay lumalabas bilang `StdinNotImplementedError` sa halip na mag-hang.

## Mga lesson na nangangailangan ng karagdagang mga resources (inaasahang mabibigo kung wala)
| Lesson | Karagdagang pangangailangan |
|--------|-------------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, susi) — may in-memory fallback path |
| 11 MCP / GitHub | GitHub MCP server + PAT |
| 13 memory (cognee) | `cognee` naka-configure gamit ang isang model provider |
| 15 browser-use | Playwright browsers na naka-install (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 local agent | Foundry Local runtime + isang na-download na Qwen model (on-device, walang cloud) |
| `*-dotnet-*` notebooks | .NET Interactive kernel (hindi kasama bilang default; gamitin ang `-IncludeDotnet`) |

## Pag-uulat pabalik
Ibuod bilang PASS/FAIL na talahanayan na naka-grupo ayon sa lesson. Ihiwalay ang tunay na regression
(bug sa code/config na kailangang ayusin) mula sa mga kakulangan sa kapaligiran (kulang na Search/Foundry Local/PAT),
at ilahad ang mga puminsalang `log_*.txt` para sa bawat tunay na pagkabigo.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->