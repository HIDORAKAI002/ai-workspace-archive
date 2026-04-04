[![Kako oblikovati dobre AI agente](../../../translated_images/sl/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Kliknite zgornjo sliko za ogled videoposnetka te lekcije)_
# Načela agentne zasnove AI

## Uvod

Obstaja veliko načinov za razmišljanje o gradnji agentnih AI sistemov. Glede na to, da je dvoumnost pri zasnovi Generativne AI pogosto funkcija in ne napaka, inženirjem včasih težko ugotoviti, kje sploh začeti. Ustvarili smo nabor uporabniško usmerjenih UX načel za oblikovanje, ki razvijalcem omogočajo gradnjo sistemov, osredotočenih na stranko, za reševanje njihovih poslovnih potreb. Ta načela oblikovanja niso predpisana arhitektura, temveč izhodišče za ekipe, ki opredeljujejo in razvijajo agentne izkušnje.

Na splošno bi morali agenti:

- Razširiti in povečati človeške zmožnosti (generiranje idej, reševanje problemov, avtomatizacija itd.)
- Zapolniti vrzeli v znanju (seznaniti me z domenami znanja, prevodi itd.)
- Omogočati in podpirati sodelovanje na načine, ki jih kot posamezniki raje uporabljamo pri delu z drugimi
- Narediti nas boljše različice sebe (npr. življenjski trener/nadzornik nalog, pomoč pri učenju čustvenega uravnavanja in veščin čuječnosti, gradnja odpornosti itd.)

## Ta lekcija bo zajemala

- Kaj so načela agentne zasnove
- Katere smernice upoštevati pri izvajanju teh načel
- Nekaj primerov uporabe teh načel

## Cilji učenja

Po končani tej lekciji boste lahko:

1. Pojasnite, kaj so načela agentne zasnove
2. Pojasnite smernice za uporabo načel agentne zasnove
3. Razumete, kako zgraditi agenta z uporabo načel agentne zasnove

## Načela agentne zasnove

![Načela agentne zasnove](../../../translated_images/sl/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Prostor)

To je okolje, v katerem agent deluje. Ta načela informirajo, kako oblikujemo agente za delovanje v fizičnih in digitalnih svetovih.

- **Povezovanje, ne zlivanje** – pomagajte povezovati ljudi z drugimi ljudmi, dogodki in uporabnim znanjem za omogočanje sodelovanja in povezanosti.
- Agenti pomagajo povezovati dogodke, znanje in ljudi.
- Agenti približujejo ljudi. Niso zasnovani, da bi ljudi nadomestili ali omalovaževali.
- **Enostavno dostopni, a občasno nevidni** – agent večinoma deluje v ozadju in nas spodbuja le, ko je to relevantno in primerno.
  - Agent je enostavno odkritljiv in dostopen za pooblaščene uporabnike na katerikoli napravi ali platformi.
  - Agent podpira multimodalne vhode in izhode (zvok, glas, besedilo itd.).
  - Agent se lahko brezhibno preklaplja med ospredjem in ozadjem; med proaktivnim in reaktivnim načinom delovanja glede na zaznavanje uporabnikovih potreb.
  - Agent lahko deluje v nevidni obliki, vendar sta njegova pot procesov v ozadju in sodelovanje z drugimi Agenti pregledna in nadzorovana s strani uporabnika.

### Agent (Čas)

To je, kako agent deluje skozi čas. Ta načela informirajo, kako oblikujemo agente, ki delujejo skozi preteklost, sedanjost in prihodnost.

- **Preteklost**: Razmislek o zgodovini, ki vključuje tako stanje kot kontekst.
  - Agent zagotavlja bolj relevantne rezultate na podlagi analize bogatejших zgodovinskih podatkov, ne le posameznega dogodka, ljudi ali stanj.
  - Agent ustvarja povezave iz preteklih dogodkov in aktivno reflektira spomin za odzivanje v trenutnih situacijah.
- **Zdaj**: Spodbujanje bolj kot obveščanje.
  - Agent uteleša celosten pristop k interakciji z ljudmi. Ko se dogodek zgodi, gre agent onkraj statičnega obvestila ali druge statične formalnosti. Agent lahko poenostavi tokove ali dinamično ustvari namige za usmerjanje uporabnikove pozornosti v pravem trenutku.
  - Agent zagotavlja informacije na podlagi kontekstualnega okolja, družbenih in kulturnih sprememb ter prilagojeno uporabnikovi nameri.
  - Interakcija z agentom je lahko postopna, z rastjo/razvijanjem v kompleksnosti, da dolgoročno opolnomoči uporabnike.
- **Prihodnost**: Prilagajanje in razvoj.
  - Agent se prilagaja različnim napravam, platformam in modalitetam.
  - Agent se prilagaja uporabnikovemu vedenju, potrebam po dostopnosti in je prosto prilagodljiv.
  - Agent je oblikovan in se razvija skozi neprekinjeno interakcijo z uporabniki.

### Agent (Jedro)

To so ključni elementi v jedru zasnove agenta.

- **Sprejmi negotovost, a vzpostavi zaupanje**.
  - Pričakovano je določeno stopnjo negotovosti agenta. Negotovost je ključni element oblikovanja agenta.
  - Zaupanje in preglednost so temeljne plasti zasnove agenta.
  - Ljudje nadzorujejo, kdaj je agent vklopljen/izklopljen, in stanje agenta je ves čas jasno vidno.

## Smernice za uresničevanje teh načel

Ko uporabljate zgornja načela oblikovanja, uporabite naslednje smernice:

1. **Transparentnost**: Obvestite uporabnika, da je vpletena AI, kako deluje (vključno s preteklimi dejanji) in kako podati povratne informacije ter spremeniti sistem.
2. **Nadzor**: Omogočite uporabniku prilagajanje, določanje preferenc in personalizacijo ter nadzor nad sistemom in njegovimi atributi (vključno z možnostjo pozabe).
3. **Doslednost**: Stremite k doslednim, večmodalnim izkušnjam na različnih napravah in končnih točkah. Uporabite znane elemente UI/UX, kjer je mogoče (npr. ikona mikrofona za glasovno interakcijo) in zmanjšajte kognitivno obremenitev stranke kolikor je mogoče (npr. stremite k jedrnatim odgovorom, vizualnim pripomočkom in vsebini »Izvedi več«).

## Kako zasnovati potovalnega agenta z uporabo teh načel in smernic

Predstavljajte si, da oblikujete potovalnega agenta, tukaj je, kako lahko razmišljate o uporabi načel in smernic:

1. **Transparentnost** – Povejte uporabniku, da je potovalni agent AI-omogočen. Navedite nekaj osnovnih navodil, kako začeti (npr. sporočilo "Pozdravljeni", primeri pozivov). To jasno dokumentirajte na strani izdelka. Pokažite seznam pozivov, ki jih je uporabnik vprašal v preteklosti. Jasno razložite, kako dati povratne informacije (palec gor in dol, gumb Send Feedback itd.). Jasno navedite, če ima agent omejitve uporabe ali teme.
2. **Nadzor** – Poskrbite, da je jasno, kako lahko uporabnik spremeni agenta po njegovi vzpostavitvi z elementi, kot je System Prompt. Omogočite uporabniku izbiro, kako obširen naj bo agent, njegov slog pisanja in morebitna opozorila o tem, o čem agent ne sme govoriti. Uporabniku dovolite ogled in izbris vseh povezanih datotek ali podatkov, pozivov in preteklih pogovorov.
3. **Doslednost** – Poskrbite, da so ikone za Share Prompt, dodajanje datoteke ali fotografije in označevanje nekoga ali nečesa standardne in prepoznavne. Uporabite ikono spenjača za označitev nalaganja/deljenja datotek z agentom in ikono slike za označitev nalaganja grafike.

## Vzorčne kode

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Imate več vprašanj o vzorcih agentne zasnove AI?

Pridružite se [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) za srečanje z drugimi udeleženci, udeležbo na urah za vprašanja in pridobitev odgovorov na vaša vprašanja o AI agentih.

## Dodatni viri

- <a href="https://openai.com" target="_blank">Prakse za upravljanje agentnih AI sistemov | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Projekt HAX Toolkit - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Orodja za odgovorno AI</a>

## Prejšnja lekcija

[Raziskovanje agentnih okvirov](../02-explore-agentic-frameworks/README.md)

## Naslednja lekcija

[Vzorec uporabe orodij](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Izjava o omejitvi odgovornosti:
Ta dokument je bil preveden z uporabo storitve za prevajanje z umetno inteligenco [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko samodejni prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvor‑nem jeziku naj se šteje za avtoritativni vir. Za kritične informacije priporočamo profesionalen človeški prevod. Ne odgovarjamo za morebitne nesporazume ali napačne razlage, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->