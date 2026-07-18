# Változási napló

Minden jelentős változás a **AI-kezdőknek szánt ügynökök** tanfolyam esetében ebben a fájlban dokumentált.

## [Kiadva] — 2026-07-13

Ez a kiadás két új leckét ad hozzá, amelyek kiegészítik a telepítési ívet — az ügynökök skálázását a Microsoft Foundry-ig és vissza egyetlen munkaállomásig — valamint egy smoke-test pipeline-t, megújult tanfolyam navigációt, új tanulói készségeket és frissített arculatot.

### Hozzáadva

- **16. lecke — Skálázható ügynökök telepítése Microsoft Foundry-val.** Új lecke [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) és futtatható jegyzetfüzet [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb), amely egy éles ügyféltámogató ügynököt épít (eszközök, RAG, memória, modell útválasztás, válasz-tárolás, emberi jóváhagyás, értékelő kapu, OpenTelemetry követés), fejlesztési/telepítési/futtatási Mermaid diagramokkal, tudásellenőrzéssel, feladattal és kihívással.
- **17. lecke — Helyi AI ügynökök létrehozása Foundry Local és Qwen segítségével.** Új lecke [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) és jegyzetfüzet [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb), amely teljesen eszközön futó mérnöki asszisztenst készít (Qwen függvényhívás Foundry Local-on keresztül, sandboxolt fájleszközök, helyi RAG Chroma-val, opcionális helyi MCP), helyi/kizárólag helyi-RAG/eszköz hívó diagramokkal, tudásellenőrzéssel, feladattal és kihívással.
- **Smoke-test pipeline.** Új [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) munkafolyamat [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml), valamint leckénkénti katalógusok a [tests/](./tests/README.md) mappában a 01, 04, 05 és 16. leckék telepíthető ügynökeihez, egy index README-vel, amely a katalógusokat a leckékhez és az ügynökök nevéhez rendeli. A 16. lecke új "A telepített ügynök validálása smoke tesztekkel" szakaszt kapott; az 01/04/05. leckék opcionális smoke-test hivatkozást kaptak.
- **Tanulói készségek.** Új Ügynök készségek a `.agents/skills/` alatt: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (a 16. és 17. lecke útmutatásait tartalmazza), valamint [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (hogyan lehet a jegyzetfüzet mintákat élő Microsoft Foundry / Azure OpenAI telepítésen ellenőrizni).
- **Jegyzetfüzet validációs futtató.** Új [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1), amely fej nélküli módban futtat minden Python jegyzetfüzetet `nbconvert`-tel és PASS/FAIL mátrixot nyomtat (plusz `results.json`). Automatikusan felismeri a repo gyökérkönyvtárát és a Pythont, kizárja az alapértelmezett .venv, site-packages, translations, skill sablon eszközöket és .NET jegyzetfüzeteket, valamint támogatja a `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` és `-Python` paramétereket.
- **Tanfolyam navigáció.** Hozzáadva Előző/Következő lecke linkek a 11–15. leckékhez (korábban hiányzott), így az egész tanfolyam 00 → 18 láncolatként működik mindkét irányban.
- **Új bélyegképek.** Bélyegképek a 16. és 17. leckéhez, valamint megújult tároló társadalmi képe [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (most két új leckét és az `aka.ms/ai-agents-beginners` URL-t hirdeti).
- **Függőségek** ([requirements.txt](../../requirements.txt)): hozzáadva a `foundry-local-sdk` és `chromadb` a 17. leckéhez.

### Módosítva

- **Fő [README.md](./README.md)** lecketábla: a 16. és 17. lecke most már linkel a tartalomra (korábban "Hamarosan"), a tároló képet `repo-thumbnailv3.png`-re cseréltük.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: hozzáadva a 16. és 17. lecke a leckénkénti útmutatóhoz és tanulási utakhoz, valamint egy "A telepített ügynökök validálása smoke tesztekkel" szakasz.
- **[AGENTS.md](./AGENTS.md)**: frissítve a lecke számláló/leírás (00–18), hozzáadva smoke-test validációs szakasz, és mintanév példákat a 16/17. leckékhez.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Előző lecke" most a 17. leckére mutat (korábban 15.), ezzel lezárja a láncot.
- **Standardizált modell hivatkozások nem elavult modelleken.** Minden `gpt-4o` / `gpt-4o-mini` hivatkozás lecserélve a tanfolyamban (dokumentációk, `.env.example`, Python/.NET jegyzetfüzetek és minták) `gpt-4.1-mini` értékre — a `gpt-4o` (minden verzió) 2026-ban megszűnik. A 16. lecke modell-útválasztási példája megtartja a kis/nagy ellentétet `gpt-4.1-mini` (kicsi) és `gpt-4.1` (nagy) használatával. A Python jegyzetfüzetek most már környezeti változókból választják ki a modellt (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) a modell név kemény kódolása helyett.

### Megjegyzések és ismert korlátok

- **Nem fut élő Azure ellen.** Az új leckék jegyzetfüzetei oktatási minták; futtasd és validáld őket a saját Microsoft Foundry / Foundry Local környezetedben. A smoke-test workflow megköveteli, hogy telepítsd az adott lecke ügynökét, és konfiguráld az Azure OIDC titkokat (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) a **Azure AI User** szerepkörrel a Foundry projekt szintjén.
- **A 17. lecke csak helyi.** Nincs Foundry Responses végpontja, így a smoke-test művelet nem alkalmazható; validáld a jegyzetfüzet futtatásával a munkaállomásodon.

## [Kiadva] — 2026-07-06

Ez a kiadás átvitele a tanfolyamot az **Azure OpenAI Responses API**-ra, egységesíti a terméknévhasználatot a **Microsoft Foundry** és a **Microsoft Agent Framework (MAF)** között, megszünteti a GitHub Models-t, frissíti az SDK verziókat, és új tartalmat ad a helyi modellekről és más keretrendszerek Foundry-n való hosztolásáról.

### Hozzáadva

- **Migrációs készség** — Telepítve a [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Ügynök Készség (az [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses) projektből) a `.agents/skills/` könyvtárba, beleértve hivatkozásait és szkenner szkriptjét.
- **Foundry Local (modellek futtatása eszközön)** — Új "Alternatív szolgáltató: Foundry Local" szakasz a [00-course-setup/README.md](./00-course-setup/README.md) fájlban, amely az installációt (`winget` / `brew`), a `foundry model run` parancsot, a `foundry-local-sdk`-t és a `FoundryLocalManager` Microsoft Agent Frameworkhöz való csatlakoztatását `OpenAIChatClient`-en keresztül ismerteti.
- **LangChain / LangGraph ügynökök hosztolása Microsoft Foundry-n** — Új szakasz a [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) fájlban, plusz futtatható minta [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py), amely a `langchain-azure-ai[hosting]` és a `ResponsesHostServer` (a `/responses` protokoll) használatával működik, a [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) alapján.
- **Microsoft Project Opal** — Új "Valós példák: Microsoft Project Opal" szakasz a [15-browser-use/README.md](./15-browser-use/README.md) fájlban, amely Opalt vállalati számítógép-használati ügynökként mutatja be, és besorolja a tanfolyam fogalmaihoz (ember a hurokban, bizalom/biztonság, tervezés, készségek).
- **Második 02-es Python minta** — Hozzáadva [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (lásd "Módosítva" – átvitel a korábbi Semantic Kernel jegyzetfüzetből) és linkelve a lecke README-jében.
- **Modellek és szolgáltatók** szakasz hozzáadva a [STUDY_GUIDE.md](./STUDY_GUIDE.md) fájlhoz.

### Módosítva

- **Chat Completions → Responses API (Python).** A modelleket közvetlenül hívó minták migrálva lettek a Chat Completions-ról a Responses API-ra (`client.responses.create(input=..., store=False)`, `resp.output_text`), az `OpenAI` klienssel az Azure OpenAI stabil `/openai/v1/` végpontját használva (nincs `api_version`). Érintett minták:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — a teljes függvényhívási áttekintés (eszköz sémájának átalakítása a Responses formátumra, eszköz eredmények visszaadva `function_call_output`, `max_output_tokens` stb. formátumban).
- **GitHub Models → Azure OpenAI.** A GitHub Models elavult (2026 júliusában megszűnik) és nem támogatja a Responses API-t. Minden GitHub Models kódútvonal átállt az Azure OpenAI / Microsoft Foundry-ra Python és .NET mintákban:
  - Python: 08. lecke workflow jegyzetfüzetei (`01`–`03`), 14. lecke (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + társ dokumentumok `.md`, valamint a 08. lecke dotNET workflow jegyzetfüzetei/`.md` (`01`–`03`) most már `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)`-ot használnak az `AzureCliCredential`-lel.
- **Semantic Kernel → Microsoft Agent Framework.** A korábbi `02-semantic-kernel.ipynb`-t átírták a Microsoft Agent Framework használatára Azure OpenAI-val (Responses API) és átnevezték `02-python-agent-framework-azure-openai.ipynb`-re.
- **Standardizálás `FoundryChatClient` + `as_agent` használatára.** README-k és jegyzetfüzetek kódjai, amelyek az `AzureAIProjectAgentProvider`-t hivatkozták, egységesítve lettek az 01. lecke és a keretrendszer saját mintái mintájára: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` az `provider.as_agent(...)` használatával. Frissítve a 02–14. leckék README-i és jegyzetfüzetei (pl. 13. lecke memória, az összes 14. lecke jegyzetfüzete, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Terméknévhasználat.** Átnevezve az angol tartalomban:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Nem változott: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", és környezeti változó nevek.)
- **Függőségek** ([requirements.txt](../../requirements.txt)):
  - Rögzítve `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Rögzítve `openai>=1.108.1` (a Responses API minimális verziója).
  - Eltávolítva `azure-ai-inference` (csak a migrált GitHub Models minták használták).
- **Környezeti konfiguráció** ([.env.example](../../.env.example)): eltávolítva a GitHub Models változók (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); hozzáadva `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, és opcionális `AZURE_OPENAI_API_KEY`; frissítve a Microsoft Foundry nevekhez.
- **Dokumentációk** — Frissítve a [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), és [STUDY_GUIDE.md](./STUDY_GUIDE.md) a fentiek szerint (környezeti változók beállítása, ellenőrző kód, szolgáltatói útmutatás, névhasználat).

### Eltávolítva

- GitHub Models bevezető lépései és környezeti változói eltávolítva a beállítási dokumentációból (az Azure OpenAI / Microsoft Foundry váltotta fel).

### Biztonság / Adatvédelem (publikus megosztás tisztítása)

- Kitörölve Jupyter jegyzetfüzet futtatási eredmények, amelyek egy valós **Azure előfizetés azonosítót**, erőforráscsoport/erőforrás neveket és Bing kapcsolat azonosítót, valamint fejlesztői **helyi fájl utak és felhasználónevek** szivárogtak:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Ellenőrizve, hogy nincs API-kulcs, token, előfizetési azonosító vagy személyes útvonal a nyomon követett angol tartalomban (a megmaradt `GITHUB_TOKEN` hivatkozások a GitHub Actions tokenjei a munkafolyamatokban és a GitHub MCP szerver PAT a 11. lecke beállításában — mindkettő jogos és nem kapcsolódik a GitHub Modellekhez).

### Megjegyzések és ismert korlátozások

- **Nem futtatott/fordított.** Ezek oktatási minták, amelyeket frissítettek az API/névhelyesség miatt; nem futtatták élő Azure erőforrások ellen, és a .NET mintákat nem fordították ebben a környezetben. Igazolja saját Microsoft Foundry / Azure OpenAI telepítésén.
- **A modell telepítésnek támogatnia kell a Responses API-t.** Használjon telepítést, például `gpt-4.1-mini`, `gpt-4.1`, vagy egy `gpt-5.x` modellt. Régebbi modellek támogatják az alap Responses funkcionalitást, de nem minden funkciót.
- **Agent-framework verzió.** A minták a legfrissebb MAF-ot célozzák (`>=1.10.0`). A kanonikus ügynök-létrehozó hívás a `client.as_agent(...)`; az API-kat a keretrendszer dokumentációja és egy telepített build alapján ellenőrizték. Ha más verziót használ, győződjön meg a metódus elérhetőségéről (`as_agent` vs `create_agent`).
- **A 08. lecke munkafolyamata notebook 04** szándékosan megtartja az `AzureAIAgentClient`-et (az `agent-framework-azure-ai`-ból), mert Microsoft Foundry Agent Service által hosztolt eszközöket használ (Bing alap, kódértelmező); ez már Responses-alapú.
- **.NET alapértelmezett telepítés.** Két 08. lecke dotNET munkafolyamat-minta korábban fixen egy adott modellt használt; most alapértelmezettként az `AZURE_OPENAI_DEPLOYMENT`-t használják (`gpt-4.1-mini`). Ha egy minta multimodális/vizuális bemenetet igényel, állítsa be az `AZURE_OPENAI_DEPLOYMENT`-et egy megfelelő modellre.
- **Foundry Local** egy OpenAI-kompatibilis **Chat Completions** végpontot kínál, és helyi fejlesztésre szánt; a teljes Responses API funkciókészlethez használja az Azure OpenAI-t / Microsoft Foundryt.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->