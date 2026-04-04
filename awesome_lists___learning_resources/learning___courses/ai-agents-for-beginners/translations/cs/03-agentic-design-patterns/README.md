[![Jak navrhnout dobré AI agenty](../../../translated_images/cs/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Klikněte na obrázek výše pro zobrazení videa této lekce)_
# Principy agentního návrhu AI

## Úvod

Existuje mnoho způsobů, jak přemýšlet o vytváření agentních AI systémů. Vzhledem k tomu, že neurčitost je v návrhu generativní AI spíše vlastností než chybou, může být pro inženýry někdy těžké vůbec začít. Vytvořili jsme soubor uživatelsky orientovaných UX návrhových principů, které vývojářům umožní vytvářet zákaznicky orientované agentní systémy pro řešení jejich obchodních potřeb. Tyto návrhové principy nejsou předepsanou architekturou, ale spíše výchozím bodem pro týmy, které definují a vytvářejí agentní zážitky.

Obecně by agenti měli:

- Rozšiřovat a škálovat lidské schopnosti (brainstorming, řešení problémů, automatizace atd.)
- Vyplňovat mezeru ve znalostech (rychle mě dostat do obrazu o znalostních doménách, překlady atd.)
- Usnadňovat a podporovat spolupráci způsoby, jakými jednotlivci preferují pracovat s ostatními
- Dělat z nás lepší verze sebe sama (např. životní kouč/úkolový mistr, pomáhat nám učit se emoční regulaci a dovednosti mindfulness, budovat odolnost atd.)

## Tato lekce pokryje

- Co jsou Agentní návrhové principy
- Jaké jsou některé pokyny, které je třeba dodržovat při implementaci těchto principů
- Několik příkladů použití návrhových principů

## Cíle učení

Po dokončení této lekce budete schopni:

1. Vysvětlit, co jsou Agentní návrhové principy
2. Vysvětlit pokyny pro používání Agentních návrhových principů
3. Pochopit, jak postavit agenta pomocí Agentních návrhových principů

## Agentní návrhové principy

![Principy agentního návrhu](../../../translated_images/cs/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Prostor)

To je prostředí, ve kterém agent funguje. Tyto principy ovlivňují, jak navrhujeme agenty pro zapojení do fyzických a digitálních světů.

- **Propojovat, ne nahrazovat** – pomáhat propojit lidi s ostatními lidmi, událostmi a akčními znalostmi, aby byla umožněna spolupráce a spojení.
- Agenti pomáhají propojovat události, znalosti a lidi.
- Agenti přibližují lidi k sobě. Není jejich cílem lidi nahrazovat nebo znehodnocovat.
- **Snadno přístupný, přesto občas neviditelný** – agent většinou funguje na pozadí a jen nás jemně upozorní, když je to relevantní a vhodné.
  - Agent je snadno objevitelný a přístupný pro autorizované uživatele na jakémkoli zařízení nebo platformě.
  - Agent podporuje multimodální vstupy a výstupy (zvuk, hlas, text atd.).
  - Agent se může bezproblémově přecházet mezi popředím a pozadím; mezi proaktivním a reaktivním režimem v závislosti na vnímání potřeb uživatele.
  - Agent může fungovat v neviditelné podobě, přitom je uživateli transparentní a ovladatelná jeho cesta pozadních procesů a spolupráce s jinými agenty.

### Agent (Čas)

To je způsob, jakým agent funguje v průběhu času. Tyto principy ovlivňují, jak navrhujeme agenty interagující s minulostí, přítomností a budoucností.

- **Minulost**: Reflexe historie, která zahrnuje stav i kontext.
  - Agent poskytuje relevantnější výsledky na základě analýzy bohatších historických dat přesahujících pouze událost, lidi nebo stavy.
  - Agent vytváří spojení z minulých událostí a aktivně se odkazuje na paměť, aby se zapojil do aktuálních situací.
- **Nyní**: Jemné popostrkování více než pouhé oznamování.
  - Agent ztělesňuje komplexní přístup k interakci s lidmi. Když se stane událost, agent jde nad rámec statické notifikace nebo jiné formality. Agent může zjednodušit toky nebo dynamicky generovat podněty, které nasměrují pozornost uživatele ve správný okamžik.
  - Agent poskytuje informace na základě kontextu prostředí, sociálních a kulturních změn a přizpůsobuje je záměru uživatele.
  - Interakce s agentem může být postupná, vyvíjející se/rostoucí v komplexnosti, aby uživatele v dlouhodobém horizontu posílila.
- **Budoucnost**: Přizpůsobení a vývoj.
  - Agent se přizpůsobuje různým zařízením, platformám a modalitám.
  - Agent se přizpůsobuje chování uživatele, potřebám přístupnosti a je volně přizpůsobitelný.
  - Agent je formován a vyvíjí se prostřednictvím kontinuální interakce s uživatelem.

### Agent (Jádro)

Toto jsou klíčové prvky v jádru návrhu agenta.

- **Přijmout nejistotu, ale vybudovat důvěru**.
  - Určitá úroveň nejistoty agenta je očekávána. Nejistota je klíčovým prvkem návrhu agenta.
  - Důvěra a transparentnost jsou základními vrstvami návrhu agenta.
  - Lidé mají kontrolu nad tím, kdy je agent zapnutý/vypnutý, a stav agenta je za všech okolností jasně viditelný.

## Pokyny pro implementaci těchto principů

Když používáte výše uvedené návrhové principy, použijte následující pokyny:

1. **Transparentnost**: Informujte uživatele, že je zapojeno AI, jak funguje (včetně minulých akcí) a jak poskytovat zpětnou vazbu a systém modifikovat.
2. **Kontrola**: Umožněte uživateli přizpůsobit, specifikovat preference a personalizovat, a mít kontrolu nad systémem a jeho atributy (včetně možnosti zapomenutí).
3. **Konzistence**: Usilujte o konzistentní multimodální zážitky napříč zařízeními a koncovými body. Používejte známé UI/UX prvky tam, kde je to možné (např. ikona mikrofonu pro hlasovou interakci) a snižte kognitivní zátěž zákazníka co nejvíce (např. usilujte o stručné odpovědi, vizuální pomůcky a obsah „Zjistit více“).

## Jak navrhnout cestovního agenta pomocí těchto principů a pokynů

Představte si, že navrhujete Cestovního agenta, zde je, jak byste mohli uvažovat o použití návrhových principů a pokynů:

1. **Transparentnost** – Dejte uživateli vědět, že Cestovní agent je AI povýšený agent. Poskytněte základní pokyny, jak začít (např. „Ahoj“ zpráva, ukázkové dotazy). Jasně to zdokumentujte na stránce produktu. Zobrazte seznam dotazů, které uživatel v minulosti položil. Ukažte, jak dávat zpětnou vazbu (palec nahoru/dolů, tlačítko Odeslat zpětnou vazbu atd.). Jasně uveďte, zda má agent omezení v použití nebo tématech.
2. **Kontrola** – Ujistěte se, že je jasné, jak může uživatel agenta po jeho vytvoření upravovat pomocí věcí jako System Prompt. Umožněte uživateli zvolit, jak podrobný má agent být, jeho styl psaní a jakákoli omezení, o kterých by agent neměl mluvit. Umožněte uživateli zobrazit a smazat související soubory nebo data, dotazy a minulá konverzace.
3. **Konzistence** – Zajistěte, aby ikony pro Sdílet dotaz, přidat soubor nebo fotografii a označit někoho nebo něco byly standardní a rozpoznatelné. Použijte ikonu kancelářské sponky pro nahrání/sdílení souboru s agentem a ikonu obrázku pro nahrání grafiky.

## Ukázkové kódy

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Máte další otázky ohledně vzorů agentního návrhu AI?

Připojte se k [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), setkejte se s ostatními studenty, účastněte se konzultací a získejte odpovědi na své otázky ohledně AI agentů.

## Další zdroje

- <a href="https://openai.com" target="_blank">Postupy pro řízení agentních AI systémů | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Projekt HAX Toolkit - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Nástroje pro odpovědnou AI</a>

## Předchozí lekce

[Prozkoumání agentních rámců](../02-explore-agentic-frameworks/README.md)

## Další lekce

[Vzor použití nástrojů](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). I když usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho zdrojovém jazyce by měl být považován za závazný zdroj. U kritických informací doporučujeme využít profesionální lidský překlad. Nejsme odpovědní za žádná nedorozumění nebo chybné výklady vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->