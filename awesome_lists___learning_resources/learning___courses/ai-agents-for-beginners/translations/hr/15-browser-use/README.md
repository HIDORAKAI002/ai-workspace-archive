# Izrada agenata za korištenje računala (CUA)

Agenati za korištenje računala mogu komunicirati s web-stranicama na isti način kao i osoba: otvaranjem preglednika, pregledom stranice i poduzimanjem sljedeće najbolje akcije na temelju onoga što vide. U ovom ćemo vam poglavlju pomoći izgraditi automatski agent preglednika koji pretražuje Airbnb, izvlači strukturirane podatke o oglasima i identificira najjeftinije mjesto za boravak u Stockholmu.

Lekcija kombinira Browser-Use za navigaciju vođenu umjetnom inteligencijom, Playwright i Chrome DevTools Protocol (CDP) za kontrolu preglednika, Azure OpenAI za zaključivanje s podrškom vida, te Pydantic za strukturirano izdvajanje.

## Uvod

Ovo poglavlje će obuhvatiti:

- Razumijevanje kada su agenti za korištenje računala primjereniji od automatizacije samo putem API-ja
- Kombiniranje Browser-Use s Playwright i CDP za pouzdano upravljanje životnim ciklusom preglednika
- Korištenje Azure OpenAI vida i strukturiranog Pydantic izlaza za izdvajanje podataka o oglasima s dinamičnih web stranica
- Odlučivanje kada koristiti workflow automatizacije preglednika usmjeren na agenta, na izvođača ili hibridan

## Ciljevi učenja

Nakon završetka ovog poglavlja, znat ćete kako:

- Konfigurirati Browser-Use s Azure OpenAI i Playwrightom
- Izraditi workflow automatizacije preglednika koji navigira pravom web stranicom i rukuje dinamičkim UI elementima
- Izvoditi tipizirane rezultate iz vidljivog sadržaja stranice i pretvarati ih u poslovnu logiku
- Odabrati između obrazaca agenta i izvođača ovisno o tomu koliko je zadatak u pregledniku predvidljiv

## Primjer koda

Ovo poglavlje uključuje jedan bilježnički vodič (notebook):

- [15-browser-user.ipynb](./15-browser-user.ipynb): Pokreće Chrome sesiju preko CDP-a, pretražuje Airbnb za ponude u Stockholmu, izvlači cijene s Browser-Use vidom i vraća najjeftiniju opciju kao strukturirane podatke.

## Preduvjeti

- Python 3.12+
- Azure OpenAI deployment konfiguriran u vašem okruženju
- Chrome ili Chromium instaliran lokalno
- Instalirane Playwright ovisnosti
- Osnovno poznavanje async Python

## Postavljanje

Instalirajte pakete koje bilježnica koristi:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Postavite Azure OpenAI varijable okoline koje bilježnica koristi:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Opcionalno: zadana vrijednost je najnovija verzija API-ja kada se izostavi
AZURE_OPENAI_API_VERSION=...
```

## Pregled arhitekture

Bilježnica demonstrira hibridni workflow automatizacije preglednika:

1. Chrome se pokreće s omogućenim CDP-om tako da Playwright i Browser-Use mogu dijeliti istu sesiju preglednika.
2. Agent Browser-Use rukuje zadacima otvorene navigacije poput otvaranja Airbnba, zatvaranja skočnih prozora i pretraživanja Stockholma.
3. Aktivna stranica se pregledava pomoću strukturirane Pydantic sheme za izvlačenje naziva oglasa, noćnih cijena, ocjena i URL-ova.
4. Python logika uspoređuje izdvojene oglase i ističe najjeftiniji rezultat.

Ovaj pristup zadržava fleksibilno zaključivanje temeljeno na vidu po kojem je Browser-Use dobar, a istovremeno vam daje determinističku kontrolu preglednika kada vam je potrebna.

## Ključne lekcije i dobre prakse

### Kada koristiti agenta, a kada izvođača

| Scenarij | Koristiti agenta | Koristiti izvođača |
|----------|------------------|-------------------|
| Dinamični rasporedi | Da, AI se može prilagoditi promjenama stranice | Ne, lomljivi selektori mogu prestati raditi |
| Poznata struktura | Ne, agent je sporiji od izravne kontrole | Da, brz i precizan |
| Pronalaženje elemenata | Da, prirodni jezik dobro funkcionira | Ne, potrebni su točni selektori |
| Kontrola vremena | Ne, manje predvidljivo | Da, potpuna kontrola nad čekanjima i ponavljanjima |
| Složeni workflowi | Da, rješava neočekivane UI situacije | Ne, zahtijeva eksplicitno grananje |

### Najbolje prakse Browser-Use

1. Krenite s agentom za istraživanje i dinamičku navigaciju.
2. Pređite na izravnu kontrolu stranice kada interakcija postane predvidljiva.
3. Koristite strukturirane modele izlaza da bi izdvojeni podaci bili validirani i tipizirani.
4. Dodajte vremenska kašnjenja strateški nakon akcija koje pokreću vidljive UI promjene.
5. Snimajte zaslonske slike tijekom iteracije kako bi kvarovi bili lakši za otklon.
6. Očekujte promjene na web-stranicama i osmislite rezervne strategije za skočne prozore i promjene rasporeda.
7. Kombinirajte obrasce agenata i izvođača kako biste dobili i fleksibilnost i preciznost.

### Primjene u stvarnom svijetu

- Rezervacije putovanja i praćenje cijena
- Usporedba cijena u e-trgovini i provjere dostupnosti
- Strukturirano izdvajanje s dinamičnih web-stranica
- Testiranje i verifikacija UI uz prepoznavanje slike
- Nadzor web-stranica i upozorenja
- Inteligentno ispunjavanje obrazaca u višestepenim tokovima

## Dodatni resursi

- [Browser-Use Playwright integracijski predložak](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parametri i izdvajanje sadržaja izvođača Browser-Use](https://docs.browser-use.com/customize/actor/all-parameters)
- [Postavljanje tečaja](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument preveden je korištenjem AI usluge za prijevod [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo biti točni, imajte na umu da automatizirani prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba se smatrati autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazuma ili pogrešna tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->