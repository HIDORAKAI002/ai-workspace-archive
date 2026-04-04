[![Ako navrhovať dobrých AI agentov](../../../translated_images/sk/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Kliknite na obrázok vyššie, aby ste si pozreli video tejto lekcie)_
# Zásady agentického dizajnu AI

## Úvod

Existuje mnoho spôsobov, ako premýšľať o budovaní agentických AI systémov. Keďže nejednoznačnosť je v generatívnom dizajne AI skôr vlastnosťou než chybou, inžinierom môže byť niekedy ťažké prísť na to, kde vôbec začať. Vytvorili sme súbor používateľsky orientovaných UX dizajnových zásad, ktoré umožňujú vývojárom vytvárať zákaznícky orientované agentické systémy na riešenie ich obchodných potrieb. Tieto dizajnové zásady nie sú predpisovou architektúrou, ale skôr východiskovým bodom pre tímy, ktoré definujú a budujú agentické skúsenosti.

Vo všeobecnosti by agenti mali:

- Rozširovať a škálovať ľudské schopnosti (brainstorming, riešenie problémov, automatizácia atď.)
- Vyplniť medzery v poznatkoch (rýchlo ma oboznámiť s vedomosťami z domén, preklady atď.)
- Uľahčiť a podporovať spoluprácu spôsobmi, akými ako jednotlivci preferujeme pracovať s ostatnými
- Spraviť nás lepšími verziami samých seba (napr. životný kouč/strážca úloh, pomáhanie pri učení sa emocionálnej regulácie a mindfulness zručností, budovanie odolnosti atď.)

## Táto lekcia pokryje

- Čo sú zásady agentického dizajnu
- Aké sú niektoré usmernenia pri implementácii týchto zásad
- Niekoľko príkladov použitia týchto zásad

## Ciele učenia

Po dokončení tejto lekcie budete vedieť:

1. Vysvetliť, čo sú zásady agentického dizajnu
2. Vysvetliť usmernenia pre používanie zásad agentického dizajnu
3. Pochopiť, ako postaviť agenta pomocou zásad agentického dizajnu

## Zásady agentického dizajnu

![Zásady agentického dizajnu](../../../translated_images/sk/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Prostredie)

Toto je prostredie, v ktorom agent funguje. Tieto zásady informujú, ako navrhujeme agentov na interakciu v fyzických a digitálnych svetoch.

- **Spájanie, nie nahrádzanie** – pomáha spájať ľudí s inými ľuďmi, udalosťami a akčnými poznatkami, aby umožnil spoluprácu a prepojenie.
- Agenti pomáhajú prepájať udalosti, poznatky a ľudí.
- Agenti približujú ľudí k sebe navzájom. Nie sú navrhnutí na nahradenie alebo znehodnocovanie ľudí.
- **Ľahko prístupný, no občas neviditeľný** – agent väčšinou funguje na pozadí a upozorní nás len vtedy, keď je to relevantné a vhodné.
  - Agent je ľahko objaviteľný a prístupný oprávneným používateľom na akomkoľvek zariadení alebo platforme.
  - Agent podporuje multimodálne vstupy a výstupy (zvuk, hlas, text atď.).
  - Agent môže plynulo prechádzať medzi popredím a pozadím; medzi proaktívnym a reaktívnym režimom v závislosti od toho, ako vníma potreby používateľa.
  - Agent môže fungovať v neviditeľnej forme, no jeho procesy na pozadí a spolupráca s inými agentmi sú pre používateľa transparentné a ovládateľné.

### Agent (Čas)

Toto je spôsob, akým agent funguje v priebehu času. Tieto zásady informujú, ako navrhujeme agentov interagujúcich cez minulosť, prítomnosť a budúcnosť.

- **Minulosť**: Reflexia histórie, ktorá zahŕňa stav aj kontext.
  - Agent poskytuje relevantnejšie výsledky na základe analýzy bohatších historických dát nad rámec samotnej udalosti, ľudí alebo stavov.
  - Agent vytvára spojenia z minulých udalostí a aktívne sa odvoláva na pamäť, aby sa zapojil do aktuálnych situácií.
- **Teraz**: Skôr navádzanie než oznamovanie.
  - Agent predstavuje komplexný prístup k interakcii s ľuďmi. Keď sa stane udalosť, agent ide za hranice statickej notifikácie alebo inej statickej formalizácie. Agent môže zjednodušiť pracovné postupy alebo dynamicky generovať náznaky, ktoré nasmerujú pozornosť používateľa v správnom momente.
  - Agent poskytuje informácie na základe kontextuálneho prostredia, spoločenských a kultúrnych zmien a prispôsobené zámeru používateľa.
  - Interakcia s agentom môže byť postupná, vyvíjať sa a rásť v zložitosti, aby dlhodobo posilnila používateľov.
- **Budúcnosť**: Prispôsobovanie sa a vývoj.
  - Agent sa prispôsobuje rôznym zariadeniam, platformám a modalitám.
  - Agent sa prispôsobuje správaniu používateľa, potrebám prístupnosti a je voľne prispôsobiteľný.
  - Agent je formovaný a vyvíja sa prostredníctvom priebežnej interakcie s používateľom.

### Agent (Jadro)

Toto sú kľúčové prvky v jadre návrhu agenta.

- **Prijať neistotu, ale vybudovať dôveru**.
  - Očakáva sa určitá miera neistoty agenta. Neistota je kľúčovým prvkom návrhu agenta.
  - Dôvera a transparentnosť sú základné vrstvy návrhu agenta.
  - Ľudia majú kontrolu nad tým, kedy je agent zapnutý/vypnutý, a stav agenta je vždy jasne viditeľný.

## Usmernenia na implementáciu týchto zásad

Keď používate predchádzajúce dizajnové zásady, použite nasledujúce usmernenia:

1. **Transparentnosť**: Informujte používateľa, že je zapojené AI, ako funguje (vrátane minulých akcií) a ako poskytnúť spätnú väzbu a upraviť systém.
2. **Kontrola**: Umožnite používateľovi prispôsobiť, špecifikovať preferencie a personalizovať, a mať kontrolu nad systémom a jeho atribútmi (vrátane možnosti zabudnúť).
3. **Konzistentnosť**: Usilujte o konzistentné, multimodálne skúsenosti naprieč zariadeniami a koncovými bodmi. Používajte známe UI/UX prvky tam, kde je to možné (napr. ikona mikrofónu pre hlasovú interakciu) a znižujte kognitívne zaťaženie používateľa čo najviac (napr. cieľte na stručné odpovede, vizuálne pomôcky a obsah „Dozvedieť sa viac“).

## Ako navrhnúť cestovného agenta pomocou týchto zásad a usmernení

Predstavte si, že navrhujete cestovného agenta. Tu je, ako môžete uvažovať o použití zásad a usmernení:

1. **Transparentnosť** – Dajte používateľovi vedieť, že cestovný agent je AI-poháňaný agent. Poskytnite niekoľko základných pokynov, ako začať (napr. „Ahoj“ správa, ukážkové prompt-y). Jasne to zdokumentujte na stránke produktu. Zobrazte zoznam prompt-ov, ktoré používateľ zadal v minulosti. Jasne ukážte, ako poskytnúť spätnú väzbu (palec hore a palec dole, tlačidlo Odoslať spätnú väzbu atď.). Jasne uveďte, či má agent obmedzenia v používaní alebo témach.
2. **Kontrola** – Uistite sa, že je jasné, ako môže používateľ po vytvorení agenta modifikovať veci, ako je napríklad Systémový prompt. Umožnite používateľovi vybrať si, aká výrečná má byť odpoveď agenta, jeho štýl písania a akékoľvek obmedzenia toho, o čom by agent nemal hovoriť. Umožnite používateľovi prezerať a mazať akékoľvek priradené súbory alebo údaje, prompt-y a minulé konverzácie.
3. **Konzistentnosť** – Uistite sa, že ikony pre Zdieľať prompt, pridať súbor alebo fotografiu a označiť niekoho alebo niečo sú štandardné a rozpoznateľné. Použite ikonu kancelárskej sponky na označenie nahrávania/zdieľania súboru s agentom a ikonu obrázka na označenie nahrávania grafiky.

## Ukážkové kódy

- Python: [Rámec agenta](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Rámec agenta](./code_samples/03-dotnet-agent-framework.md)


## Máte ďalšie otázky o agentických dizajnových vzoroch AI?

Pridajte sa na [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), aby ste sa stretli s ďalšími študentmi, zúčastnili sa konzultačných hodín a dostali odpovede na svoje otázky o AI agentoch.

## Ďalšie zdroje

- <a href="https://openai.com" target="_blank">Postupy na riadenie agentických AI systémov | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Projekt HAX Toolkit - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Sada nástrojov pre zodpovedné AI</a>

## Predchádzajúca lekcia

[Preskúmavanie agentických rámcov](../02-explore-agentic-frameworks/README.md)

## Nasledujúca lekcia

[Dizajnový vzor použitia nástrojov](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Vylúčenie zodpovednosti:
Tento dokument bol preložený pomocou AI prekladateľskej služby Co-op Translator (https://github.com/Azure/co-op-translator). Hoci sa usilujeme o presnosť, berte prosím na vedomie, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by sa mal považovať za rozhodujúci zdroj. Pre kritické informácie sa odporúča profesionálny preklad vykonaný človekom. Nie sme zodpovední za žiadne nedorozumenia alebo chybné výklady vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->