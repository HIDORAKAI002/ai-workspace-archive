# Arvutikasutusagentide (CUA) loomine

Arvutikasutusagentid saavad veebisaitidega suhelda samamoodi nagu inimene: avades veebibrauseri, uurides lehte ja võttes järgmise parima tegevuse vastavalt sellele, mida nad näevad. Selles õppetükis ehitate brauseri automatiseerimisagendi, mis otsib Airbnb-st, ekstraheerib struktureeritud kuulutuste andmeid ja tuvastab Stockholmi odavaima peatumise.

Õppetükk ühendab Browser-Use'i AI-põhise navigeerimise jaoks, Playwrighti ja Chrome DevTools Protocoli (CDP) brauseri juhtimiseks, Azure OpenAI nägemisvõimelise mõtlemise jaoks ning Pydantici struktureeritud ekstraheerimise jaoks.

## Sissejuhatus

Selles õppetükis käsitletakse:

- Arusaamist, millal on arvutikasutusagendid API-põhisest automatiseerimisest parem valik
- Browser-Use'i ühendamist Playwrighti ja CDP-ga usaldusväärseks brauseri elutsükli halduseks
- Azure OpenAI nägemise ja struktureeritud Pydantici väljundi kasutamist dünaamilistelt veebilehtedelt kuulutuste andmete ekstraheerimiseks
- Otsustamist, millal kasutada agenti-esimest, näitleja-esimest või hübriidset brauseri automatiseerimise töövoogu

## Õpieesmärgid

Pärast selle õppetüki läbimist tead, kuidas:

- Konfigureerida Browser-Use Azure OpenAI ja Playwrightiga
- Luua brauseri automatiseerimise töövoog, mis navigeerib tõelisel veebisaidil ja käsitleb dünaamilisi kasutajaliidese elemente
- Ekstraheerida tüübistatud tulemusi nähtavalt lehe sisult ja muuta need allavoolu äriloogikaks
- Valida agentide ja näitlejate mustrite vahel sõltuvalt sellest, kui ennustatav brauseri tööülesanne on

## Koodinäide

Selles õppetükis on üks märkmikuõpetus:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Käivitab Chrome'i seansi CDP kaudu, otsib Airbnb-st Stockholm'i kuulutusi, ekstraheerib hinnad Browser-Use'i nägemise abil ja tagastab odavaima valiku struktureeritud andmetena.

## Eeltingimused

- Python 3.12+
- Keskkonnas konfigureeritud Azure OpenAI juurutus
- Kohalikult installitud Chrome või Chromium
- Paigaldatud Playwrighti sõltuvused
- Algtasemel tuttavus asünkroonse Pythoniga

## Seadistamine

Paigalda märkmikus kasutatavad paketid:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Sea märkmikus kasutatavad Azure OpenAI keskkonnamuutujad:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Valikuline: vaikimisi kasutatakse viimast API versiooni, kui see jäetakse välja
AZURE_OPENAI_API_VERSION=...
```

## Arhitektuuri ülevaade

Märkmik demonstreerib hübriidset brauseri automatiseerimise töövoogu:

1. Chrome käivitatakse CDP-ga, et nii Playwright kui ka Browser-Use saaksid jagada sama brauseriseanssi.
2. Browser-Use agent käsitleb avatud navigeerimise ülesandeid nagu Airbnb avamine, hüpikakende sulgemine ja Stockholm'i otsimine.
3. Aktiivset lehte uuritakse struktureeritud Pydantici skeemiga, et ekstraheerida kuulutuste pealkirjad, ööpäevahinnad, hinnangud ja URL-id.
4. Pythonilogiika võrdleb ekstraheeritud kuulutusi ja toob esile odavaima tulemuse.

See lähenemine hoiab alles Browser-Use'i paindliku, nägemisel põhineva mõtlemise, pakkudes samas vajaliku deterministliku brauserijuhtimise.

## Peamised järeldused ja parimad tavad

### Millal kasutada agenti versus näitlejat

| Stsenaarium      | Kasuta agenti               | Kasuta näitlejat            |
|------------------|----------------------------|-----------------------------|
| Dünaamilised paigutused | Jah, AI suudab lehe muutustega kohaneda | Ei, habraste valijatega võib katki minna |
| Tuntud struktuur  | Ei, agent on otsesest juhtimisest aeglasem | Jah, kiire ja täpne         |
| Elementide leidmine | Jah, loomulik keel toimib hästi | Ei, on vaja täpseid valijaid |
| Ajaaegade kontroll | Ei, vähem ennustatav        | Jah, täielik kontroll ootamiste ja korduste üle |
| Komplekssed töövood | Jah, käsitleb ootamatuid UI olekuid | Ei, nõuab selget harundamist |

### Browser-Use parimad tavad

1. Alusta agentidega avastus- ja dünaamiliseks navigeerimiseks.
2. Vaheta otsekontrolli peale, kui interaktsioon muutub ennustatavaks.
3. Kasuta struktureeritud väljundmudeleid, et ekstraheeritud andmed oleksid valideeritud ja tüübiturvalised.
4. Lisa viivitusi strateegiliselt pärast tegevusi, mis käivitavad nähtavad UI muudatused.
5. Tee iteratsiooni ajal ekraanipilte, et vigade silumine oleks lihtsam.
6. Oota veebisaitide muutumist ja mõtle välja varuplaan hüpikakendele ja paigutuse nihkumistele.
7. Sega agentide ja näitlejate mustreid, et saada nii paindlikkus kui täpsus.

### Reaalmaailma rakendused

- Reisi broneerimine ja hinnakontroll
- E-kaubanduse hindade võrdlemine ja saadavuse kontroll
- Struktureeritud ekstraheerimine dünaamilistelt veebisaitidelt
- Nägemispõhine UI testimine ja kontroll
- Veebisaitide jälgimine ja teavitamine
- Intelligentsed vormide täitmised mitmeastmelistes voogudes

## Lisamaterjalid

- [Browser-Use Playwrighti integratsioonimall](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use näitleja parameetrid ja sisu ekstraheerimine](https://docs.browser-use.com/customize/actor/all-parameters)
- [Kursuse seadistamine](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:  
See dokument on tõlgitud kasutades tehisintellekti tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüame täpsust, palun arvestage, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Algne dokument oma emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta ühegi arusaamatuse ega valesti mõistmise eest, mis tuleneb selle tõlke kasutamisest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->