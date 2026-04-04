[![Agentic RAG](../../../translated_images/cs/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Klikněte na obrázek výše pro zobrazení videa této lekce)_

# Agentic RAG

Tato lekce poskytuje komplexní přehled o Agentic Retrieval-Augmented Generation (Agentic RAG), novém paradigmatu AI, kde velké jazykové modely (LLM) autonomně plánují své další kroky a zároveň čerpají informace z externích zdrojů. Na rozdíl od statických vzorů načítání a následného čtení zahrnuje Agentic RAG iterativní volání LLM, prokládané voláními nástrojů nebo funkcí a strukturovanými výstupy. Systém vyhodnocuje výsledky, zpřesňuje dotazy, v případě potřeby vyvolává další nástroje a tento cyklus opakuje, dokud nedosáhne uspokojivého řešení.

## Úvod

Tato lekce pokryje

- **Pochopení Agentic RAG:** Naučte se o vznikajícím paradigmatu v AI, kde velké jazykové modely (LLM) autonomně plánují své další kroky, zatímco čerpají informace z externích datových zdrojů.
- **Porozumění iterativnímu stylu Maker-Checker:** Pochopte smyčku iterativních volání LLM, prokládaných voláními nástrojů nebo funkcí a strukturovanými výstupy, navrženými ke zlepšení správnosti a zvládání chybných dotazů.
- **Prozkoumat praktické aplikace:** Identifikujte scénáře, kde Agentic RAG exceluje, jako jsou prostředí kladoucí důraz na správnost, složité interakce s databázemi a rozšířené pracovní postupy.

## Cíle učení

Po dokončení této lekce budete vědět/jste schopen porozumět:

- **Pochopení Agentic RAG:** Naučte se o vznikajícím paradigmatu v AI, kde velké jazykové modely (LLM) autonomně plánují své další kroky, zatímco čerpají informace z externích datových zdrojů.
- **Iterativní styl Maker-Checker:** Pochopte koncept smyčky iterativních volání LLM, prokládaných voláními nástrojů nebo funkcí a strukturovanými výstupy, navrženými ke zlepšení správnosti a zvládání chybných dotazů.
- **Ovládnutí procesu uvažování:** Pochopte schopnost systému ovládat svůj proces uvažování, činit rozhodnutí o přístupu k problémům bez spoléhání se na předdefinované cesty.
- **Pracovní postup:** Pochopte, jak agentní model samostatně rozhoduje o získání zpráv o tržních trendech, identifikaci dat konkurence, korelaci interních prodejních metrik, syntéze zjištění a vyhodnocení strategie.
- **Iterativní smyčky, integrace nástrojů a paměť:** Naučte se o závislosti systému na opakující se interakci, udržování stavu a paměti napříč kroky, aby se zabránilo opakujícím se smyčkám a byly činěny informované rozhodnutí.
- **Zvládání selhání a samokorekce:** Prozkoumejte robustní mechanismy samokorekce systému, včetně iterace a opětovných dotazů, používání diagnostických nástrojů a spoléhání se na lidský dohled.
- **Hranice agenturnosti:** Pochopte omezení Agentic RAG zaměřená na autonomii specifickou pro doménu, závislost na infrastruktuře a respektování zábran.
- **Praktické případy použití a hodnota:** Identifikujte scénáře, kde Agentic RAG vyniká, jako jsou prostředí kladoucí důraz na správnost, složité interakce s databázemi a rozšířené pracovní postupy.
- **Řízení, transparentnost a důvěra:** Naučte se o důležitosti řízení a transparentnosti včetně vysvětlitelného uvažování, kontroly zkreslení a lidského dohledu.

## Co je Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) je vznikající paradigma AI, kde velké jazykové modely (LLM) autonomně plánují své další kroky, zatímco čerpají informace z externích zdrojů. Na rozdíl od statických vzorů načítání a následného čtení zahrnuje Agentic RAG iterativní volání LLM, prokládaná voláními nástrojů nebo funkcí a strukturovanými výstupy. Systém vyhodnocuje výsledky, zpřesňuje dotazy, v případě potřeby vyvolává další nástroje a tento cyklus opakuje, dokud nedosáhne uspokojivého řešení. Tento iterativní styl „maker-checker“ zlepšuje správnost, zvládá chybné dotazy a zajišťuje vysoce kvalitní výsledky.

Systém aktivně ovládá svůj proces uvažování, přepisuje neúspěšné dotazy, vybírá různé metody vyhledávání a integruje více nástrojů — jako je vektorové vyhledávání v Azure AI Search, SQL databáze nebo vlastní API — před konečným určením odpovědi. Rozlišovací vlastností agentního systému je schopnost ovládat svůj proces uvažování. Tradiční implementace RAG spoléhají na předem definované cesty, ale agentní systém autonomně stanovuje pořadí kroků na základě kvality nalezených informací.

## Definice Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) je vznikající paradigma ve vývoji AI, kde LLM nejen získávají informace z externích datových zdrojů, ale také autonomně plánují své další kroky. Na rozdíl od statických vzorů načtení a následného čtení nebo pečlivě připravených sekvencí výzev zahrnuje Agentic RAG smyčku iterativních volání LLM, prokládanou voláními nástrojů nebo funkcí a strukturovanými výstupy. Systém při každém kroku vyhodnocuje dosažené výsledky, rozhoduje, zda zpřesnit dotazy, v případě potřeby vyvolá další nástroje a pokračuje v tomto cyklu, dokud nedosáhne uspokojivého řešení.

Tento iterativní styl „maker-checker“ je navržen ke zlepšení správnosti, zvládání chybných dotazů do strukturovaných databází (např. NL2SQL) a zajištění vyvážených, vysoce kvalitních výsledků. Místo spoléhání se pouze na pečlivě navržené řetězce výzev systém aktivně ovládá svůj proces uvažování. Může přepisovat dotazy, které selhaly, vybírat různé metody vyhledávání a integrovat více nástrojů — jako je vektorové vyhledávání v Azure AI Search, SQL databáze nebo vlastní API — před dokončením své odpovědi. To odstraňuje potřebu příliš složitých orchestrací. Místo toho může relativně jednoduchá smyčka „volání LLM → použití nástroje → volání LLM → …“ produkovat sofistikované a dobře podložené výstupy.

![Agentic RAG Core Loop](../../../translated_images/cs/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Ovládání procesu uvažování

Rozlišující vlastností, která dělá systém „agentním“, je jeho schopnost ovládat svůj proces uvažování. Tradiční implementace RAG často závisí na tom, že lidé předem definují cestu pro model: řetězec myšlení, který určuje, co získat a kdy.  
Ale když je systém opravdu agentní, rozhoduje se uvnitř, jak přistoupit k problému. Nevykonává jen skript; autonomně určuje posloupnost kroků na základě kvality nalezených informací.  
Například pokud má vytvořit strategii uvedení produktu na trh, nespoléhá se pouze na výzvu, která popisuje celý výzkumný a rozhodovací proces. Místo toho agentní model samostatně rozhodne:

1. Získat aktuální zprávy o tržních trendech pomocí Bing Web Grounding
2. Identifikovat relevantní data o konkurenci pomocí Azure AI Search.
3. Korelovat historické interní prodejní metriky pomocí Azure SQL Database.
4. Syntetizovat zjištění do kohezní strategie orchestrované prostřednictvím Azure OpenAI Service.
5. Vyhodnotit strategii na mezery nebo nekonzistence a případně vyvolat další kolo získávání dat.
Všechny tyto kroky — zpřesňování dotazů, výběr zdrojů, iterace dokud není „spokojený“ s odpovědí — jsou určovány modelem, nikoli předem skriptovány člověkem.

## Iterativní smyčky, integrace nástrojů a paměť

![Tool Integration Architecture](../../../translated_images/cs/tool-integration.0f569710b5c17c10.webp)

Agentní systém spoléhá na vzorec smyčkových interakcí:

- **Počáteční volání:** Cíl uživatele (tzv. uživatelský prompt) je předložen LLM.
- **Vyvolání nástroje:** Pokud model identifikuje chybějící informace nebo nejasné instrukce, vybere nástroj nebo metodu vyhledávání — například dotaz do vektorové databáze (např. Azure AI Search Hybrid hledání nad privátními daty) nebo strukturovaný SQL dotaz — kvůli získání více kontextu.
- **Hodnocení a zpřesnění:** Po prostudování vrácených dat se model rozhodne, zda jsou informace dostatečné. Pokud ne, zpřesní dotaz, zkusí jiný nástroj nebo upraví svůj přístup.
- **Opakování dokud není spokojen:** Tento cyklus pokračuje, dokud model nerozhodne, že má dostatečnou jasnost a důkazy k poskytnutí konečné, dobře odůvodněné odpovědi.
- **Paměť & Stav:** Protože systém udržuje stav a paměť napříč kroky, může si pamatovat předchozí pokusy a jejich výsledky, vyhýbat se opakujícím smyčkám a dělat informovanější rozhodnutí během postupu.

Časem to vytváří pocit vyvíjejícího se porozumění, umožňující modelu navigovat složité, vícestupňové úkoly bez potřeby neustálého zásahu člověka nebo přeformulování promptu.

## Zvládání selhání a samokorekce

Agentic RAG autonomie zahrnuje také robustní mechanismy samokorekce. Když systém narazí na slepé uličky — například načtení irelevantních dokumentů nebo setkání s chybnými dotazy — může:

- **Iterovat a znovu dotazovat:** Místo vracení nízko hodnotných odpovědí se model pokusí o nové strategie vyhledávání, přepíše databázové dotazy nebo se podívá na alternativní datové sady.
- **Používat diagnostické nástroje:** Systém může vyvolat další funkce navržené k pomoci ladit jeho proces uvažování nebo potvrdit správnost získaných dat. Nástroje jako Azure AI Tracing budou důležité pro umožnění robustní pozorovatelnosti a monitoringu.
- **Spoléhání se na lidský dohled:** Pro scénáře s vysokou zodpovědností nebo opakovaným selháním může model označit nejistotu a požádat o lidské vedení. Jakmile člověk poskytne korektivní zpětnou vazbu, model může tuto lekci začlenit do budoucna.

Tento iterativní a dynamický přístup umožňuje modelu se neustále zlepšovat, zajišťujíc, že není pouze jednorázovým systémem, ale systémem, který se učí ze svých chyb během dané relace.

![Self Correction Mechanism](../../../translated_images/cs/self-correction.da87f3783b7f174b.webp)

## Hranice agenturnosti

Přestože je uvnitř úkolu autonomní, Agentic RAG není analogií Umělé obecné inteligence. Jeho „agentní“ schopnosti jsou omezeny na nástroje, datové zdroje a politiky poskytované lidskými vývojáři. Nemůže si vymýšlet vlastní nástroje ani vystoupit mimo nastavené hranice domény. Místo toho vyniká v dynamické orchestraci dostupných prostředků.  
Klíčové rozdíly oproti pokročilejším formám AI zahrnují:

1. **Doménově specifická autonomie:** Agentic RAG systémy se zaměřují na dosahování uživatelem definovaných cílů v dané známé doméně a používají strategie jako přepisování dotazů nebo výběr nástrojů ke zlepšení výsledků.
2. **Závislost na infrastruktuře:** Schopnosti systému závisí na nástrojích a datech integrovaných vývojáři. Bez lidského zásahu nemůže tyto hranice překročit.
3. **Respektování zábran:** Etické zásady, pravidla dodržování předpisů a obchodní politiky zůstávají velmi důležité. Svoboda agenta je vždy omezena bezpečnostními opatřeními a mechanismy dohledu (snad?).

## Praktické případy použití a hodnota

Agentic RAG vyniká ve scénářích vyžadujících iterativní zpřesňování a přesnost:

1. **Prostředí kladoucí důraz na správnost:** Při kontrolách shody, regulačních analýzách nebo právním výzkumu může agentní model opakovaně ověřovat fakta, konzultovat více zdrojů a přepisovat dotazy, dokud nevytvoří důkladně ověřenou odpověď.
2. **Složité interakce s databázemi:** Při práci se strukturovanými daty, kde dotazy mohou často selhat nebo je třeba je upravit, může systém autonomně zpřesňovat své dotazy pomocí Azure SQL nebo Microsoft Fabric OneLake, aby konečné získávání odpovídalo záměru uživatele.
3. **Rozšířené pracovní postupy:** Dlouhodobější relace se mohou vyvíjet, jak se objevují nové informace. Agentic RAG může neustále začleňovat nové údaje a měnit strategie podle toho, co se o problému doví.

## Řízení, transparentnost a důvěra

Jak se tyto systémy stávají autonomnějšími ve svém uvažování, jsou řízení a transparentnost klíčové:

- **Vysvětlitelné uvažování:** Model může poskytnout auditní stopu dotazů, které vykonal, zdroje, které konzultoval, a kroky uvažování, jimiž dospěl k závěru. Nástroje jako Azure AI Content Safety a Azure AI Tracing / GenAIOps mohou pomoci udržet transparentnost a zmírnit rizika.
- **Kontrola zkreslení a vyvážené získávání dat:** Vývojáři mohou ladit strategie načítání, aby se zohlednily vyvážené, reprezentativní datové zdroje, a pravidelně auditovat výstupy, aby detekovali zkreslení nebo vychýlené vzorce za pomoci vlastních modelů pro pokročilé datově vědecké organizace využívající Azure Machine Learning.
- **Lidský dohled a soulad:** U citlivých úkolů zůstává lidské hodnocení nezbytné. Agentic RAG nenahrazuje lidský úsudek při rozhodnutích s vysokým rizikem — doplňuje jej poskytováním důkladněji prověřených možností.

Mít nástroje, které poskytují jasný záznam akcí, je zásadní. Bez nich může být ladění vícestupňového procesu velmi obtížné. Viz následující příklad z Literal AI (společnost stojící za Chainlit) ukazující běh agenta:

![AgentRunExample](../../../translated_images/cs/AgentRunExample.471a94bc40cbdc0c.webp)

## Závěr

Agentic RAG představuje přirozený vývoj v tom, jak AI systémy řeší složité úkoly náročné na data. Přijetím vzorce smyčkové interakce, autonomním výběrem nástrojů a zpřesňováním dotazů až do dosažení vysoce kvalitního výsledku se systém posouvá nad rámec statického sledování výzev k adaptivnějšímu, kontextově uvědomělému rozhodovacímu mechanismu. Přestože je stále omezen lidsky definovanými infrastrukturami a etickými pokyny, tyto agentní schopnosti umožňují bohatší, dynamičtější a konečně užitečnější AI interakce pro podniky i koncové uživatele.

### Máte další otázky ohledně Agentic RAG?

Připojte se k [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), setkejte se s dalšími studenty, navštěvujte konzultační hodiny a získejte odpovědi na vaše otázky ohledně AI Agentů.

## Další zdroje
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementace Retrieval Augmented Generation (RAG) s Azure OpenAI Service: Naučte se, jak používat svá vlastní data s Azure OpenAI Service. Tento modul Microsoft Learn poskytuje komplexní průvodce implementací RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Hodnocení generativních AI aplikací s Microsoft Foundry: Tento článek pokrývá hodnocení a porovnání modelů na veřejně dostupných datech, včetně Agentních AI aplikací a RAG architektur</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Co je Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Kompletní průvodce agentně založenou Retrieval Augmented Generation – Novinky z generace RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: vylepšete svůj RAG pomocí reformulace dotazů a samo-dotazování! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Přidání agentních vrstev do RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Budoucnost znalostních asistentů: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Jak postavit agentní RAG systémy</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Používání Microsoft Foundry Agent Service ke škálování vašich AI agentů</a>

### Akademické články

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iterativní zdokonalování se zpětnou vazbou</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Jazykoví agenti s verbálním posilovacím učením</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Velké jazykové modely se mohou samy opravovat pomocí nástrojově interaktivní kritiky</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentní Retrieval-Augmented Generation: Přehled o Agentic RAG</a>

## Předchozí lekce

[Tool Use Design Pattern](../04-tool-use/README.md)

## Další lekce

[Building Trustworthy AI Agents](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí služby automatického překladu [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro důležité informace se doporučuje profesionální lidský překlad. Nepřejímáme odpovědnost za jakákoli nedorozumění nebo nesprávné výklady vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->