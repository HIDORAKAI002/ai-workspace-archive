# Kompiuterinių naudojimosi agentų (CUA) kūrimas

Kompiuteriniai naudojimosi agentai gali bendrauti su svetainėmis taip pat, kaip ir žmogus: atidarant naršyklę, tikrinant puslapį ir imantis geriausio veiksmų, remiantis matomu. Šioje pamokoje sukursite naršyklės automatizavimo agentą, kuris ieško Airbnb, išskiria struktūrizuotą skelbimų informaciją ir nustato pigiausią apgyvendinimo variantą Stokholme.

Pamoka apjungia Browser-Use AI pagrįstai navigacijai, Playwright ir Chrome DevTools Protocol (CDP) naršyklės valdymui, Azure OpenAI su regėjimu pagrįstam samprotavimui, bei Pydantic struktūrizuotam išgavimui.

## Įvadas

Šioje pamokoje aptarsime:

- Kada kompiuteriniai naudojimosi agentai yra tinkamesni nei tik API pagrįsta automatizacija
- Kaip derinti Browser-Use su Playwright ir CDP patikimam naršyklės gyvavimo ciklo valdymui
- Kaip naudoti Azure OpenAI regėjimą ir struktūrizuotus Pydantic rezultatus norint išgauti skelbimų duomenis iš dinamiškų tinklalapių
- Kada rinktis agentų pirmumo, veikėjų pirmumo ar hibridinį naršyklės automatizavimo darbo eigą

## Mokymosi tikslai

Baigę šią pamoką, mokėsite:

- Konfigūruoti Browser-Use su Azure OpenAI ir Playwright
- Kurti naršyklės automatizavimo darbo eigą, kuri naviguoja tikroje svetainėje ir tvarko dinamiškus naudotojo sąsajos elementus
- Išgauti tipizuotus rezultatus iš matomo puslapio turinio ir paversti juos verslo logika
- Rinktis tarp agento ir veikėjo modelių, remiantis tuo, kiek naršyklės užduotis yra nuspėjama

## Kodo pavyzdys

Pamoka apima vieną užrašų knygutę:

- [15-browser-user.ipynb](./15-browser-user.ipynb): paleidžia Chrome sesiją per CDP, ieško Airbnb Stokholmo skelbimų, su Browser-Use regėjimu ištraukia kainas ir grąžina pigiausią variantą kaip struktūrizuotus duomenis.

## Reikalavimai

- Python 3.12+
- Azure OpenAI diegimas sukonfigūruotas jūsų aplinkoje
- Vietoje įdiegta Chrome arba Chromium naršyklė
- Įdiegti Playwright priklausomybes
- Pagrindinės žinios apie async Python

## Diegimas

Įdiekite paketų rinkinius, naudojamus užrašų knygutėje:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Nustatykite Azure OpenAI aplinkos kintamuosius, kuriuos naudoja užrašų knygutė:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Pasirenkama: jei nepateikta, numatytoji versija yra naujausia API versija
AZURE_OPENAI_API_VERSION=...
```

## Architektūros apžvalga

Užrašų knygutė demonstruoja hibridinę naršyklės automatizavimo darbo eigą:

1. Chrome paleidžiamas su įjungtu CDP, kad Playwright ir Browser-Use galėtų naudoti tą pačią naršyklės sesiją.
2. Browser-Use agentas tvarko atviras navigacijos užduotis, tokias kaip Airbnb atidarymas, iššokančių langų uždarymas ir Stokholmo paieška.
3. Aktyvus puslapis tikrinamas naudojant struktūrizuotą Pydantic schemą, kuri ištraukia skelbimų pavadinimus, naktinių kainas, įvertinimus ir URL.
4. Python logika palygina ištrauktus skelbimus ir paryškina pigiausią variantą.

Šis požiūris išlaiko lanksčią, regėjimu pagrįstą samprotavimo galią, kuri būdinga Browser-Use, bet kartu suteikia deterministinę naršyklės kontrolę, kai jos reikia.

## Pagrindiniai pastebėjimai ir geriausios praktikos

### Kada naudoti agentą, o kada veikėją

| Situacija | Naudoti agentą | Naudoti veikėją |
|----------|----------------|-----------------|
| Dinamiški dizainai | Taip, AI gali prisitaikyti prie puslapio pakeitimų | Ne, trapūs selektoriai gali sugesti |
| Žinoma struktūra | Ne, agentas yra lėtesnis už tiesioginę kontrolę | Taip, greita ir tiksli |
| Elementų radimas | Taip, natūrali kalba veikia gerai | Ne, reikia tikslių selektorių |
| Laiko kontrolė | Ne, mažiau nuspėjama | Taip, pilna valdymo galimybė laukti ir bandyti iš naujo |
| Sudėtingos darbo eigos | Taip, tvarko netikėtas UI būsenas | Ne, reikalauja aiškių šakų |

### Browser-Use geriausios praktikos

1. Pradėkite nuo agento tyrinėjimui ir dinamiškai navigacijai.
2. Pereikite prie tiesioginės puslapio kontrolės, kai sąveika tampa nuspėjama.
3. Naudokite struktūrizuotos išvesties modelius, kad išgauti duomenys būtų validuoti ir tipizuoti.
4. Strategiškai pridėkite delsą po veiksmų, kurie sukelia matomus UI pokyčius.
5. Fiksuokite ekrano nuotraukas iteracijos metu, kad būtų lengviau derinti klaidas.
6. Tikėkitės svetainių pokyčių ir sukurkite atsarginio plano strategijas iššokantiems langams ir dizaino pokyčiams.
7. Derinkite agentų ir veikėjų modelius, kad gautumėte tiek lankstumo, tiek tikslumo.

### Realios taikymo sritys

- Kelionių užsakymas ir kainų stebėjimas
- El. prekybos kainų palyginimas ir prieinamumo tikrinimas
- Struktūrizuotas duomenų išgavimas iš dinamiškų svetainių
- Regėjimu pagrįsti UI testavimai ir patikrinimai
- Svetainių stebėjimas ir įspėjimai
- Išmanus formų pildymas kelių žingsnių procesuose

## Papildomi ištekliai

- [Browser-Use ir Playwright integracijos šablonas](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use veikėjo parametrai ir turinio išgavimas](https://docs.browser-use.com/customize/actor/all-parameters)
- [Kurso diegimas](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:  
Šis dokumentas buvo išverstas naudojant AI vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome suprasti, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Pirminis dokumentas gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogišką vertimą. Mes neatsakome už bet kokius nesusipratimus ar neteisingą interpretavimą, atsiradusius naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->