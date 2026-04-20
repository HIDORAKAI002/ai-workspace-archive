# Gradnja agentov za uporabo računalnika (CUA)

Agenti za uporabo računalnika lahko sodelujejo z spletnimi stranmi na enak način kot človek: z odpiranjem brskalnika, pregledovanjem strani in izbiro naslednjega najboljšega dejanja na podlagi tega, kar vidijo. V tej lekciji boste izdelali agenta za avtomatizacijo brskalnika, ki išče na Airbnb, izvleče strukturirane podatke o listingih in identificira najcenejši bivališče v Stockholmu.

Lekcija združuje Browser-Use za navigacijo, ki jo poganja AI, Playwright in Chrome DevTools Protocol (CDP) za nadzor brskalnika, Azure OpenAI za vidno omogočeno sklepanje ter Pydantic za strukturirano ekstrakcijo.

## Uvod

Ta lekcija bo zajemala:

- Razumevanje, kdaj so agenti za uporabo računalnika bolj primerni kot avtomatizacija samo preko API
- Združevanje Browser-Use s Playwright in CDP za zanesljivo upravljanje življenjskega cikla brskalnika
- Uporaba Azure OpenAI vision in strukturiranega Pydantic izhoda za ekstrakcijo podatkov o listingih s dinamičnih spletnih strani
- Odločanje, kdaj uporabiti pristop "agent-first", "actor-first" ali hibridno avtomatizacijo brskalnika

## Cilji učenja

Po zaključku te lekcije boste znali:

- Nastaviti Browser-Use z Azure OpenAI in Playwright
- Izdelati avtomatiziran potek dela brskalnika, ki navigira po dejanski spletni strani in upravlja dinamične uporabniške elemente
- Izluščiti tipizirane rezultate iz vidne vsebine strani in jih pretvoriti v nadaljnjo poslovno logiko
- Izbrati med vzorci agent ali actor glede na to, kako predvidljivo je opravilo v brskalniku

## Primer kode

Ta lekcija vsebuje en zvezek z vadnico:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Zažene seja Chroma preko CDP, išče Airbnb za listinge v Stockholmu, izvleče cene z Browser-Use vision in vrne najcenejšo možnost kot strukturirane podatke.

## Predpogoji

- Python 3.12+
- Azure OpenAI namestitev nastavljena v vašem okolju
- Lokalne namestitve Chrome ali Chromium
- Nameščene Playwright odvisnosti
- Osnovno poznavanje asinhronega Python-a

## Nastavitev

Namestite pakete, ki se uporabljajo v zvezku:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Nastavite okoljske spremenljivke Azure OpenAI, ki jih uporablja zvezek:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Neobvezno: privzeto uporabi najnovejšo različico API, če ni določeno
AZURE_OPENAI_API_VERSION=...
```

## Pregled arhitekture

Zvezek prikazuje hibridni potek dela avtomatizacije brskalnika:

1. Chrome se zažene z omogočenim CDP, tako da Playwright in Browser-Use delita isto sejo brskalnika.
2. Agent Browser-Use upravlja odprte naloge navigacije, kot so odpiranje Airbnb, zapiranje pojavnih oken ter iskanje po Stockholmu.
3. Aktivna stran je pregledana s strukturirano Pydantic shemo za ekstrakcijo naslovov listingov, cen na noč, ocen in URL-jev.
4. Python logika primerja izvlečene liste in izpostavi najcenejši rezultat.

Ta pristop ohranja prilagodljivo, vidno temelječo na sklepanju, v čemer je Browser-Use dober, hkrati pa omogoča determinističen nadzor brskalnika, kadar ga potrebujete.

## Glavne ugotovitve in najboljše prakse

### Kdaj uporabiti agenta in kdaj actorja

| Scenarij       | Uporabi agenta       | Uporabi actorja          |
|----------------|---------------------|--------------------------|
| Dinamične postavitve | Da, AI se lahko prilagodi spremembam strani | Ne, krhki selektorji se lahko zlomijo |
| Znana struktura | Ne, agent je počasnejši od neposrednega nadzora | Da, hiter in natančen     |
| Iskanje elementov | Da, naravni jezik dobro deluje | Ne, potrebni so natančni selektorji |
| Časovni nadzor  | Ne, manj predvidljiv   | Da, poln nadzor nad čakanji in ponovitvami |
| Kompleksni poteki | Da, obvlada nepričakovane UI stanje | Ne, zahteva eksplicitno vejo |

### Najboljše prakse za Browser-Use

1. Za začetek uporabite agenta za raziskovanje in dinamično navigacijo.
2. Nato preidite na neposreden nadzor strani, ko interakcija postane predvidljiva.
3. Uporabite strukturirane modele izhoda, da so podatki, ki jih izvlečete, validirani in tipizirani.
4. Dodajte zamike strateško po dejanjih, ki sprožijo vidne spremembe UI.
5. Med iteracijami zajemajte posnetke zaslona, da je odpravljanje napak lažje.
6. Pričakujte spremembe spletnih strani in načrtujte rezervne pristope za pojavna okna in premike postavitve.
7. Združite vzorce agent in actor, da dobite tako prilagodljivost kot natančnost.

### Praktične uporabe

- Rezervacije potovanj in spremljanje cen
- Primerjave cen na spletu in preverjanje razpoložljivosti
- Strukturirana ekstrakcija s dinamičnih spletnih strani
- UI testiranje in preverjanje z vidnim zaznavanjem
- Spremljanje spletnih strani in obveščanje
- Inteligentno izpolnjevanje obrazcev v večstopenjskih potekih

## Dodatni viri

- [Predloga integracije Browser-Use s Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parametri actorja in ekstrakcija vsebine Browser-Use](https://docs.browser-use.com/customize/actor/all-parameters)
- [Nastavitev tečaja](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:  
Ta dokument je bil preveden z uporabo storitve za umetno inteligenco [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem naravnem jeziku velja za avtoritativni vir. Za ključne informacije priporočamo strokovni človeški prevod. Nismo odgovorni za kakršnekoli nesporazume ali napačne interpretacije, ki bi lahko nastale zaradi uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->