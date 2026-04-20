# Tvorba agentov na používanie počítača (CUA)

Agenti na používanie počítača môžu interagovať s webovými stránkami rovnakým spôsobom ako človek: otvorením prehliadača, preskúmaním stránky a vykonaním najlepšieho nasledujúceho kroku na základe toho, čo vidia. V tejto lekcii vytvoríte automatizačného agenta prehliadača, ktorý vyhľadáva na Airbnb, extrahuje štruktúrované údaje o ponukách a identifikuje najlacnejšie ubytovanie v Štokholme.

Lekcia kombinuje Browser-Use pre navigáciu riadenú AI, Playwright a Chrome DevTools Protocol (CDP) na ovládanie prehliadača, Azure OpenAI pre zrakovo umožnené uvažovanie a Pydantic pre štruktúrovanú extrakciu.

## Úvod

Táto lekcia pokrýva:

- Pochopenie, kedy sú agenti na používanie počítača vhodnejší ako automatizácia využívajúca len API
- Kombinovanie Browser-Use s Playwright a CDP pre spoľahlivú správu životného cyklu prehliadača
- Použitie Azure OpenAI zrakovej schopnosti a štruktúrovaného výstupu Pydantic na extrahovanie údajov o ponukách z dynamických webových stránok
- Rozhodovanie, kedy použiť agent-first, actor-first alebo hybridný pracovný tok prehliadačovej automatizácie

## Ciele učenia

Po dokončení tejto lekcie budete vedieť:

- Nakonfigurovať Browser-Use s Azure OpenAI a Playwright
- Vytvoriť pracovný tok automatizácie prehliadača, ktorý naviguje na skutočnú webovú stránku a spracováva dynamické prvky používateľského rozhrania
- Extrahovať typované výsledky z viditeľného obsahu stránky a premeniť ich na biznis logiku
- Vybrať medzi vzormi agenta a herca na základe predvídateľnosti úlohy prehliadača

## Ukážka kódu

Táto lekcia obsahuje jeden tutoriál v podobe notebooku:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Spúšťa reláciu Chrome cez CDP, vyhľadáva ponuky v Štokholme na Airbnb, extrahuje ceny pomocou Browser-Use vision a vráti najlacnejšiu možnosť ako štruktúrované dáta.

## Predpoklady

- Python 3.12+
- nakonfigurované Azure OpenAI prostredie
- lokálne nainštalovaný Chrome alebo Chromium
- nainštalované závislosti Playwright
- základná znalosť asynchrónneho Pythonu

## Nastavenie

Nainštalujte balíky používané v notebooku:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Nastavte premenné prostredia Azure OpenAI používané v notebooku:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Nepovinné: predvolene používa najnovšiu verziu API, ak sa vynechá
AZURE_OPENAI_API_VERSION=...
```

## Prehľad architektúry

Notebook demonštruje hybridný pracovný tok automatizácie prehliadača:

1. Chrome sa spúšťa s povoleným CDP, takže Playwright aj Browser-Use môžu zdieľať tú istú reláciu prehliadača.
2. Agent Browser-Use rieši otvorené navigačné úlohy, ako je otvorenie Airbnb, zatváranie vyskakovacích okien a vyhľadávanie Štokholmu.
3. Aktívna stránka sa skúma pomocou štruktúrovanej Pydantic schémy, aby sa extrahovali názvy ponúk, ceny za noc, hodnotenia a URL adresy.
4. Python logika porovná extrahované ponuky a vyznačí najlacnejší výsledok.

Tento prístup zachováva flexibilné, na videnie založené uvažovanie, ktoré Browser-Use dobre zvláda, pričom zároveň poskytuje deterministickú kontrolu prehliadača, keď ju potrebujete.

## Kľúčové poznatky a najlepšie praktiky

### Kedy použiť agenta vs herca

| Scenár | Použiť agenta | Použiť herca |
|----------|--------------|--------------|
| Dynamické rozloženia | Áno, AI sa vie prispôsobiť zmenám na stránke | Nie, krehké selektory môžu zlyhať |
| Známá štruktúra | Nie, agent je pomalší ako priama kontrola | Áno, rýchle a presné |
| Nájdenie prvkov | Áno, funguje prirodzený jazyk | Nie, vyžadujú sa presné selektory |
| Riadenie času | Nie, menej predvídateľné | Áno, plná kontrola nad čakaním a opakovaniami |
| Zložité pracovné toky | Áno, zvláda neočakávané stavy UI | Nie, vyžaduje explicitné vetvenie |

### Najlepšie praktiky Browser-Use

1. Začnite s agentom pre exploráciu a dynamickú navigáciu.
2. Prepnite na priamu kontrolu stránky, keď sa interakcia stane predvídateľnou.
3. Používajte štruktúrované výstupné modely, aby boli extrahované údaje validované a typovo bezpečné.
4. Strategicky pridávajte oneskorenia po akciách, ktoré spúšťajú viditeľné zmeny UI.
5. Pri iterovaní zaznamenávajte snímky obrazovky, aby bolo jednoduchšie odhaliť chyby.
6. Očakávajte zmeny webových stránok a navrhujte záložné stratégie pre vyskakovacie okná a posuny rozloženia.
7. Kombinujte vzory agenta a herca pre dosiahnutie flexibility aj presnosti.

### Použitie v reálnom svete

- Rezervácie ciest a monitorovanie cien
- Porovnávanie cien a dostupnosti v e-commerce
- Štruktúrovaná extrakcia z dynamických webových stránok
- Testovanie a overovanie UI s využitím videnia
- Monitorovanie webových stránok a upozornenia
- Inteligentné vyplňovanie formulárov v viacstupňových procesoch

## Ďalšie zdroje

- [Browser-Use integrácia s Playwright šablóna](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parameter herca a extrakcia obsahu v Browser-Use](https://docs.browser-use.com/customize/actor/all-parameters)
- [Nastavenie kurzu](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Upozornenie**:  
Tento dokument bol preložený pomocou prekladateľskej AI služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, prosím vezmite na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nezodpovedáme za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->