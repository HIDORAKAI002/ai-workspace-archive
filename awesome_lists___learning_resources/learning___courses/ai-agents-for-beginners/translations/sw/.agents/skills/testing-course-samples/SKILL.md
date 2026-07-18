---
name: testing-course-samples
description: Tumia wakati umeombwa kuthibitisha, kujaribu, kufanya mtihani wa haraka,
  au kuendesha daftari la mafunzo na mifano ya msimbo dhidi ya usanidi hai wa Microsoft
  Foundry / Azure OpenAI. Inajumuisha usanidi wa mazingira (.env, az login, vifurushi),
  kiongozi wa scripts/validate-notebooks.ps1, kutafsiri matokeo ya PASS/FAIL, na ni
  masomo gani yanayohitaji rasilimali za ziada (Azure AI Search, GitHub MCP, Foundry
  Local, Playwright).
---
# Kupima Sampuli za Kozi

Thibitisha kwamba daftari za somo na sampuli za nambari zinaendeshwa dhidi ya
usanidi wa moja kwa moja wa Microsoft Foundry / Azure OpenAI. Repositori inatuma kimbiaji katika
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) ambaye
huendesha kila daftari la Python bila kichwa na huandika matokeo ya PASS/FAIL.

## Wakati wa kutumia
- "Thibitisha daftari / sampuli zote dhidi ya usajili wangu wa Azure."
- "Fanya mtihani wa awali wa kozi baada ya kusasisha vifurushi au kubadilisha modeli."
- "Masomo gani bado yanapita / kushindwa moja kwa moja?"

Usitumie hii kwa AI Smoke Test GitHub Action (inayothibitisha mawakala waliowekwa *mojawapo*
— angalia [`tests/README.md`](../../../tests/README.md)). Ujuzi huu
huendesha daftari za somo mahali hapo.

## Mahitaji ya awali (hakikisha kwanza)
1. **Python 3.12+** na utegemezi wa kozi: `python -m pip install -r requirements.txt`
   pamoja na mtendaji: `python -m pip install nbconvert ipykernel`.
2. **`.env` kwenye mizizi ya repo** (nakili kutoka [`.env.example`](../../../../../.env.example)) ikiwa na angalau:
   - `AZURE_AI_PROJECT_ENDPOINT` — anwani ya mradi wa Foundry
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — usambazaji usiokuwa wa zamani (mfano `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) na `AZURE_OPENAI_DEPLOYMENT`
     kwa masomo yanayotumia Azure OpenAI moja kwa moja (Somo 06, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** imetekelezwa — sampuli zinathibitishwa kwa `AzureCliCredential` (Entra ID, bila funguo).
4. Hakikisha usambazaji wa modeli upo:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Kuendesha uthibitisho
```powershell
# Daftari zote za Python (zinaacha .NET, .venv, site-packages, tafsiri, mali za ujuzi)
pwsh scripts/validate-notebooks.ps1

# Somo moja tu, na muda mrefu wa kuchelewesha kwa kila seli
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Orodhesha tu kile kingekimbia (hakuna utekelezaji)
pwsh scripts/validate-notebooks.ps1 -List

# Mfasiri waziwazi (kama `python` haipo PATH, mfano jina la duka la Windows)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Skripti inaandika nakala zilizotekelezwa, majarida ya kila daftari, na `results.json` kwenye
`$env:TEMP\aiab-nbval` na hutoka na hesabu ya kushindwa.

## Kufasiri matokeo
- `PASS` — daftari limeendesha kutoka mwanzo hadi mwisho bila hitilafu ya seli.
- `FAIL` — mstari wa kwanza wa `*Error` / `*Exception` unaonyeshwa; fungua
  `log_*.txt` inayofanana katika saraka ya matokeo kwa ufuatiliaji kamili.
- Kushindwa kwa daftari moja kunazuia na `-Timeout` (kila seli), hivyo seli iliyokwama kwa mtu
  inaonekana kama `StdinNotImplementedError` badala ya kukwama.

## Masomo yanayohitaji rasilimali za ziada (yanayotarajiwa kushindwa bila hizo)
| Somo | Hitaji la ziada |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, ufunguo) — ina njia ya akiba ya kumbukumbu |
| 11 MCP / GitHub | Seva ya GitHub MCP + PAT |
| 13 memory (cognee) | `cognee` imewekwa na mtoa huduma wa modeli |
| 15 browser-use | Vivinjari vya Playwright vilivyowekwa `playwright install` + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 local agent | Wakati halisi wa Foundry Local + modeli Qwen iliyopakuliwa (kifaa, bila wingu) |
| Daftari za `*-dotnet-*` | Kiwi cha kuingiliana cha .NET (hakijajumuishwa kwa kawaida; tumia `-IncludeDotnet`) |

## Kuripoti nyuma
Fupisha kama jedwali la PASS/FAIL lililogawanywa kwa somo. Tofautisha mapungufu halisi
(hitilafu za nambari / usanidi za kurekebisha) kutoka kwa mapungufu ya mazingira (Kukosekana Search/Foundry Local/PAT),
na taja `log_*.txt` ya kushindwa kwa kila kushindwa halisi.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->