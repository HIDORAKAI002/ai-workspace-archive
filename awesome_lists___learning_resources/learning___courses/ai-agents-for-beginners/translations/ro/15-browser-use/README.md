# Construirea agenților de utilizare a calculatorului (CUA)

Agenții de utilizare a calculatorului pot interacționa cu site-urile web în același mod în care ar face-o o persoană: deschizând un browser, inspectând pagina și luând cea mai bună următoare acțiune în funcție de ceea ce văd. În această lecție, vei construi un agent de automatizare a browserului care caută pe Airbnb, extrage date structurate ale listărilor și identifică cea mai ieftină cazare din Stockholm.

Lecția combină Browser-Use pentru navigare condusă de AI, Playwright și Chrome DevTools Protocol (CDP) pentru controlul browserului, Azure OpenAI pentru raționament cu viziune și Pydantic pentru extracție structurată.

## Introducere

Această lecție va include:

- Înțelegerea când agenții de utilizare a calculatorului sunt mai potriviți decât automatizarea doar prin API
- Combinarea Browser-Use cu Playwright și CDP pentru gestionarea fiabilă a ciclului de viață al browserului
- Utilizarea viziunii Azure OpenAI și a ieșirii structurate Pydantic pentru a extrage date din listări pe pagini web dinamice
- Deciderea când să folosești un flux de lucru de automatizare a browserului centrat pe agent, centrat pe actor sau hibrid

## Obiective de învățare

După ce finalizezi această lecție, vei ști cum să:

- Configurezi Browser-Use cu Azure OpenAI și Playwright
- Construiești un flux de lucru de automatizare a browserului care navighează pe un site real și gestionează elemente UI dinamice
- Extragi rezultate tipizate din conținutul vizibil al paginii și să le transformi în logică de business ulterioară
- Alegi între modelele agent și actor în funcție de cât de predictivă este sarcina în browser

## Exemplu de cod

Această lecție include un tutorial în notebook:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Deschide o sesiune Chrome prin CDP, caută listări în Stockholm pe Airbnb, extrage prețuri cu Browser-Use vision și returnează opțiunea cea mai ieftină ca date structurate.

## Cerințe preliminare

- Python 3.12+
- Implementare Azure OpenAI configurată în mediul tău
- Chrome sau Chromium instalat local
- Dependențe Playwright instalate
- Familiaritate de bază cu Python asincron

## Configurare

Instalează pachetele folosite în notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Setează variabilele de mediu Azure OpenAI folosite de notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Opțional: implicit se utilizează cea mai recentă versiune a API-ului când este omisă
AZURE_OPENAI_API_VERSION=...
```

## Prezentare arhitectură

Notebook-ul demonstrează un flux de lucru hibrid de automatizare a browserului:

1. Chrome pornește cu CDP activat astfel încât atât Playwright cât și Browser-Use să poată partaja aceeași sesiune de browser.
2. Un agent Browser-Use se ocupă de sarcini de navigare deschise, cum ar fi deschiderea Airbnb, închiderea pop-up-urilor și căutarea pentru Stockholm.
3. Pagina activă este inspectată folosind o schemă structurat Pydantic pentru a extrage titlurile listărilor, prețurile pe noapte, evaluările și URL-urile.
4. Logica Python compară listările extrase și evidențiază rezultatul cel mai ieftin.

Această abordare păstrează raționamentul flexibil, bazat pe viziune, la care Browser-Use este bun, oferindu-ți în același timp control determinist asupra browserului atunci când ai nevoie.

## Concluzii cheie și bune practici

### Când să folosești agent vs actor

| Scenariu | Folosește Agent | Folosește Actor |
|----------|-----------------|----------------|
| Layout-uri dinamice | Da, AI se poate adapta la schimbări ale paginii | Nu, selectorii fragili se pot rupe |
| Structură cunoscută | Nu, un agent este mai lent decât controlul direct | Da, rapid și precis |
| Găsirea elementelor | Da, limbajul natural funcționează bine | Nu, sunt necesari selectori exacți |
| Controlul timpului | Nu, mai puțin predictibil | Da, control complet asupra așteptărilor și reîncercărilor |
| Fluxuri de lucru complexe | Da, gestionează stări UI neașteptate | Nu, necesită ramificări explicite |

### Bune practici Browser-Use

1. Pornește cu un agent pentru explorare și navigare dinamică.
2. Treci la control direct al paginii când interacțiunea devine predictibilă.
3. Folosește modele de ieșire structurate pentru ca datele extrase să fie validate și tip-safe.
4. Adaugă întârzieri strategic după acțiuni care declanșează schimbări vizibile în UI.
5. Capturează capturi de ecran în timp ce iterezi pentru a ușura depanarea eșecurilor.
6. Așteaptă-te ca site-urile să se schimbe și proiectează strategii alternative pentru pop-up-uri și schimbări de layout.
7. Combină modelele agent și actor pentru a obține atât flexibilitate, cât și precizie.

### Aplicații din lumea reală

- Rezervări de călătorie și monitorizare prețuri
- Compararea prețurilor și verificarea disponibilității în comerțul electronic
- Extracție structurată din site-uri dinamice
- Testare și verificare UI cu suport vizual
- Monitorizarea și alertarea site-urilor web
- Completare inteligentă a formularelor în fluxuri multi-step

## Resurse suplimentare

- [Șablon integrare Browser-Use Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parametrii actor și extracția conținutului Browser-Use](https://docs.browser-use.com/customize/actor/all-parameters)
- [Configurarea cursului](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus utilizând serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autoritară. Pentru informații critice, este recomandată traducerea profesională realizată de un specialist uman. Nu ne asumăm răspunderea pentru orice neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->