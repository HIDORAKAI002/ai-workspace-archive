# Změny

Všechny významné změny v kurzu **AI Agents for Beginners** jsou zdokumentovány v tomto souboru.

## [Vydáno] — 2026-07-13

Toto vydání přidává dvě nové lekce, které dokončují nasazovací sekvenci — škálování agentů až do Microsoft Foundry a naopak až na jedno pracovní místo — plus pipeline pro rychlý test, obnovenou navigaci kurzu, nové dovednosti pro studenty a aktualizované značkování.

### Přidáno

- **Lekce 16 — Nasazení škálovatelných agentů s Microsoft Foundry.** Nová lekce [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) a spustitelný notebook [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb), který staví produkčního agenta pro zákaznickou podporu (nástroje, RAG, paměť, směrování modelu, ukládání odpovědí do cache, lidské schválení, hodnotící brána a OpenTelemetry tracing), s diagramy vývoje/nasazení/provozu v Mermaid, kontrolou znalostí, úkolem a výzvou.
- **Lekce 17 — Vytváření lokálních AI agentů s Foundry Local a Qwen.** Nová lekce [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) a notebook [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) vytvářející plně zařízení fungujícího inženýrského asistenta (volání funkcí Qwen přes Foundry Local, sandboxované nástroje pro soubory, lokální RAG s Chromou, volitelně lokální MCP), s diagramy pouze pro lokální / lokální RAG / volání nástrojů, kontrolou znalostí, úkolem a výzvou.
- **Pipeline pro rychlý test.** Nový workflow [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) plus katalogy pro každou lekci v [tests/](./tests/README.md) pro nasaditelné agenty v Lekcích 01, 04, 05 a 16, s indexovým README mapujícím každý katalog k lekci a názvu hostovaného agenta. Lekce 16 dostává sekci "Validace nasazeného agenta pomocí smoke testů"; Lekce 01/04/05 mají volitelný odkaz na rychlý test.
- **Dovednosti studentů.** Nové dovednosti agentů pod `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (obsahující pokyny z Lekcí 16 a 17), a [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (jak validovat ukázky notebooků proti živému prostředí Microsoft Foundry / Azure OpenAI).
- **Spouštěč ověření notebooků.** Nový skript [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1), který bezhlavě provádí každý Python notebook pomocí `nbconvert` a tiskne matici PASS/FAIL (plus `results.json`). Automaticky detekuje kořen repozitáře a Python, standardně vylučuje notebooky mimo kurz (`.venv`, `site-packages`, `translations`, šablony dovedností) a `.NET` notebooky a podporuje parametry `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` a `-Python`.
- **Navigace kurzu.** Přidány odkazy na předchozí/následující lekci do Lekcí 11–15 (dříve chyběly), takže celý kurz je propojen od 00 do 18 v obou směrech.
- **Nové miniatury.** Miniatury lekcí pro Lekce 16 a 17, plus obnovený společenský obrázek repozitáře [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (nyní propagující dvě nové lekce a URL `aka.ms/ai-agents-beginners`).
- **Závislosti** ([requirements.txt](../../requirements.txt)): přidáno `foundry-local-sdk` a `chromadb` pro Lekci 17.

### Změněno

- **Hlavní tabulka lekcí v [README.md](./README.md)**: lekce 16 a 17 nyní odkazují na svůj obsah (dříve "Coming Soon"); obrázek repozitáře aktualizován na `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: přidány lekce 16 a 17 do průvodce lekcí a studijních cest, a sekce "Validace nasazených agentů pomocí smoke testů".
- **[AGENTS.md](./AGENTS.md)**: aktualizován počet/ popis lekcí (00–18), přidána sekce pro validaci smoke testů a příklady pojmenování ukázek z Lekcí 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Previous Lesson" nyní směřuje na Lekci 17 (dříve Lekce 15), čímž se uzavírá řetězec.
- **Standardizované odkazy na modely u nepřecházejících modelů.** Všechny odkazy na `gpt-4o` / `gpt-4o-mini` v kurzu (dokumentace, `.env.example`, Python/.NET notebooky a ukázky) nahrazeny `gpt-4.1-mini` — `gpt-4o` (všechny verze) bude v roce 2026 ukončen. Příklad směrování modelů v Lekci 16 zachovává kontrast malého/velkého modelu pomocí `gpt-4.1-mini` (malý) a `gpt-4.1` (velký). Python notebooky nyní vybírají model z proměnných prostředí (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) místo tzv. hard-coding názvu modelu.

### Poznámky a známá omezení

- **Nespouští se nad živým Azure.** Nové lekční notebooky jsou vzdělávací ukázky; spouštějte a validujte je ve vlastním Microsoft Foundry / Foundry Local prostředí. Workflow pro rychlé testy vyžaduje nasazení lekčního agenta a konfiguraci Azure OIDC tajemství (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) s rolí **Azure AI User** v rámci projektu Foundry.
- **Lekce 17 je pouze lokální.** Nemá Foundry Responses endpoint, takže akce rychlého testu se na ni nevztahuje; validační test proveďte spuštěním notebooku na vlastní pracovní stanici.

## [Vydáno] — 2026-07-06

Toto vydání migruje kurz na **Azure OpenAI Responses API**, standardizuje názvy produktů na **Microsoft Foundry** a **Microsoft Agent Framework (MAF)**, ukončuje GitHub Models, aktualizuje verze SDK a přidává nový obsah o lokálních modelech a hostování dalších rámců na Foundry.

### Přidáno

- **Migrační dovednost** — Nainstalovaná dovednost agenta [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (z [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) pod `.agents/skills/`, včetně jejích odkazů a skriptu pro skenování.
- **Foundry Local (spouštění modelů na zařízení)** — Nová sekce "Alternative Provider: Foundry Local" v [00-course-setup/README.md](./00-course-setup/README.md) pokrývající instalaci (`winget` / `brew`), `foundry model run`, `foundry-local-sdk` a propojení `FoundryLocalManager` s Microsoft Agent Framework přes `OpenAIChatClient`.
- **Hostování agentů LangChain / LangGraph na Microsoft Foundry** — Nová sekce v [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) plus spustitelná ukázka [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) používající `langchain-azure-ai[hosting]` a `ResponsesHostServer` (protokol `/responses`), dle [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Nová sekce "Skutečný příklad: Microsoft Project Opal" v [15-browser-use/README.md](./15-browser-use/README.md), která rámuje Opal jako podnikový agent pro používání počítače a mapuje ho na koncepce kurzu (člověk v procesu, důvěra/bezpečnost, plánování, dovednosti).
- **Druhá ukázka Pythonu Lekce 02** — Přidán [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (viz "Změněno" — migrováno z bývalého notebooku Semantic Kernel) a propojení v README lekce.
- Přidána sekce Modely a poskytovatelé do [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Změněno

- **Chat Completions → Responses API (Python).** Ukázky, které volaly model přímo, byly migrovány z Chat Completions na Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), s použitím klienta `OpenAI` vůči stabilnímu Azure OpenAI `/openai/v1/` endpointu (bez `api_version`). Ovlivněné ukázky zahrnují:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — kompletní průvodce voláním funkcí (schéma nástrojů přeloženo do formátu Responses, výsledky nástrojů vráceny jako `function_call_output`, `max_output_tokens` apod.).
- **GitHub Models → Azure OpenAI.** GitHub Models je zastaralé (končí **červenec 2026**) a nepodporuje Responses API. Všechny kódové cesty GitHub Models byly převedeny na Azure OpenAI / Microsoft Foundry v ukázkách Python i .NET:
  - Python: Lekce 08 workflow notebooky (`01`–`03`), Lekce 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + doprovodné `.md` dokumenty, a workflow .NET notebooky/`.md` Lekce 08 (`01`–`03`) nyní používají `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` s `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Bývalý notebook `02-semantic-kernel.ipynb` byl přepsán pro použití Microsoft Agent Framework s Azure OpenAI (Responses API) a přejmenován na `02-python-agent-framework-azure-openai.ipynb`.
- **Standardizace na `FoundryChatClient` + `as_agent`.** README a kód notebooků, které odkazovaly na `AzureAIProjectAgentProvider`, byly sjednoceny do kanonického vzoru používaného Lekcí 01 a vlastními ukázkami frameworku: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` s `provider.as_agent(...)`. Aktualizováno napříč README a notebooky Lekcí 02–14 (např. paměť v Lekci 13, všechny notebooky Lekce 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Názvy produktů.** Přejmenováno v anglickém obsahu:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Beze změny: "Azure OpenAI", "Azure AI Search", "Azure AI Inference" a názvy proměnných prostředí.)
- **Závislosti** ([requirements.txt](../../requirements.txt)):
  - Přesně stanoveny `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Přesně stanoven `openai>=1.108.1` (minimum pro Responses API).
  - Odebrán `azure-ai-inference` (používán pouze v migraci GitHub Models).
- **Konfigurace prostředí** ([.env.example](../../.env.example)): odebrány proměnné GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); přidány `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` a nepovinný `AZURE_OPENAI_API_KEY`; aktualizováno pojmenování pro Microsoft Foundry.
- **Dokumentace** — aktualizovány [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md) a [STUDY_GUIDE.md](./STUDY_GUIDE.md) pro výše uvedené (nastavení proměnných prostředí, ukázkový kód, pokyny k poskytovateli, pojmenování).

### Odebráno

- Kroky onboardingu a proměnné prostředí GitHub Models z dokumentace nastavení (nahrazeno Azure OpenAI / Microsoft Foundry).

### Bezpečnost / Ochrana soukromí (čištění veřejného sdílení)

- Vyčištěny výstupy z Jupyter notebooků, které unikaly skutečné **Azure předplatné ID**, názvy resource group / resource, a Bing connection ID, plus developerské **lokální cesty k souborům a uživatelská jména**, v:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Ověřeno, že v sledovaném anglickém obsahu nezůstávají žádné klíče API, tokeny, ID předplatného ani osobní cesty (reference `GITHUB_TOKEN`, které zůstávají, jsou token GitHub Actions v pracovních postupech a PAT GitHub MCP serveru v nastavení Lekce 11 — oba legitimní a nesouvisejí s GitHub Models).

### Poznámky a známá omezení

- **Nespouštěno/nesestavováno.** Jedná se o výukové příklady aktualizované pro správnost API/názvů; nebyly spuštěny proti živým prostředkům Azure a .NET příklady nebyly v tomto prostředí sestavovány. Ověřte vůči vlastnímu nasazení Microsoft Foundry / Azure OpenAI.
- **Nasazení modelu musí podporovat Responses API.** Použijte nasazení jako `gpt-4.1-mini`, `gpt-4.1` nebo model `gpt-5.x`. Starší modely podporují základní funkčnost Responses, ale ne všechny funkce.
- **Verze agent-framework.** Příklady cílí na nejnovější MAF (`>=1.10.0`). Kanonický volání k vytvoření agenta je `client.as_agent(...)`; API byla ověřena vůči zveřejněné dokumentaci frameworku a nainstalované verzi. Pokud použijete jinou verzi, ověřte dostupnost metody (`as_agent` vs `create_agent`).
- **Sešit s pracovním postupem Lekce 08 04** záměrně zachovává `AzureAIAgentClient` (z `agent-framework-azure-ai`), protože využívá nástroje Microsoft Foundry Agent Service (Bing grounding, interpreter kódu); již je založený na Responses.
- **Výchozí nasazení .NET.** Dva příklady pracovního postupu dotNET z Lekce 08 dříve tvrdě kódovaly konkrétní model; nyní implicitně používají `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Pokud příklad využívá multimodální/vision vstup, nastavte `AZURE_OPENAI_DEPLOYMENT` na vhodný model.
- **Foundry Local** vystavuje OpenAI kompatibilní endpoint **Chat Completions** a je určen pro lokální vývoj; pro plnou sadu funkcí Responses API použijte Azure OpenAI / Microsoft Foundry.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->