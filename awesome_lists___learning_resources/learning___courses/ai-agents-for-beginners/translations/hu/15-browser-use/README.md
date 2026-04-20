# Számítógép-használó ügynökök (CUA) építése

A számítógép-használó ügynökök ugyanúgy képesek weboldalakkal interakcióba lépni, mint egy ember: megnyitnak egy böngészőt, megvizsgálják az oldalt, és a látottak alapján a legjobb következő lépést teszik meg. Ebben a leckében egy olyan böngészőautomatizálási ügynököt építesz, amely az Airbnb-n keres keresést, strukturált listázási adatokat nyer ki, és azonosítja a legolcsóbb szállást Stockholmban.

A lecke kombinálja a Browser-Use-t az AI-alapú navigációhoz, a Playwrightot és a Chrome DevTools Protocol (CDP)-t a böngésző vezérléséhez, az Azure OpenAI-t a látásalapú következtetéshez, valamint a Pydanticet a strukturált kinyeréshez.

## Bevezetés

Ez a lecke a következőket fogja lefedni:

- Annak megértése, mikor jobban megfelelnek a számítógép-használó ügynökök, mint az csak API-alapú automatizálás
- A Browser-Use kombinálása a Playwrighttal és a CDP-vel a megbízható böngésző életciklus-kezeléshez
- Azure OpenAI látás és strukturált Pydantic kimenet használata dinamikus weboldalakról származó listázási adatok kinyeréséhez
- Döntés arról, mikor alkalmazzunk ügynök-első, szereplő-első vagy hibrid böngészőautomatizálási munkafolyamatot

## Tanulási célok

A lecke elvégzése után tudni fogod, hogyan:

- Konfiguráld a Browser-Use-t Azure OpenAI-val és Playwrighttal
- Építs egy böngészőautomatizálási munkafolyamatot, amely egy valódi weboldalon navigál és kezeli a dinamikus felhasználói felületelemeket
- Kinyerj típusos eredményeket a látható oldal tartalmából, és alakítsd át őket további üzleti logikává
- Válassz az ügynök és szereplő minták között a böngészőfeladat előreláthatósága alapján

## Kódminta

A lecke tartalmaz egy jegyzetfüzet-alapú oktatóanyagot:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Chrome munkamenetet indít CDP-n keresztül, Airbnb-n Stockholmi listákra keres, árazásokat nyer ki a Browser-Use látás funkciójával, és a legolcsóbb opciót strukturált adatként adja vissza.

## Előfeltételek

- Python 3.12+
- Azure OpenAI telepítés konfigurálva a környezetedben
- Helyi Chrome vagy Chromium telepítve
- Playwright függőségek telepítve
- Alapvető ismeretek az aszinkron Pythonról

## Beállítás

Telepítsd a jegyzetfüzetben használt csomagokat:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Állítsd be a jegyzetfüzet által használt Azure OpenAI környezeti változókat:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Opcionális: alapértelmezett a legújabb API verzió, ha kihagyjuk
AZURE_OPENAI_API_VERSION=...
```

## Architektúra áttekintése

A jegyzetfüzet egy hibrid böngészőautomatizálási munkafolyamatot mutat be:

1. A Chrome CDP engedélyezéssel indul, így a Playwright és a Browser-Use meg tudják osztani ugyanazt a böngésző-munkamenetet.
2. Egy Browser-Use ügynök végzi a nyitott navigációs feladatokat, mint az Airbnb megnyitása, felugró ablakok elvetése, és Stockholmi keresés.
3. Az aktív oldalt strukturált Pydantic séma segítségével vizsgálják meg, hogy kinyerjék a listák címét, éjszakánkénti árait, értékeléseit és URL-jeit.
4. Python logika összehasonlítja a kinyert listákat, és kiemeli a legolcsóbb találatot.

Ez a megközelítés megőrzi a Browser-Use által nyújtott rugalmas, látásalapú következtetést, miközben szükség esetén determinisztikus böngészővezérlést biztosít.

## Főbb tanulságok és legjobb gyakorlatok

### Mikor használjuk az ügynököt vagy a szereplőt

| Forgatókönyv | Ügynök használata | Szereplő használata |
|--------------|-------------------|---------------------|
| Dinamikus elrendezések | Igen, az AI képes alkalmazkodni az oldal változásaihoz | Nem, a törékeny szelektorok eltörhetnek |
| Ismert szerkezet | Nem, az ügynök lassabb, mint a közvetlen vezérlés | Igen, gyors és pontos |
| Elemek keresése | Igen, a természetes nyelv jól működik | Nem, pontos szelektorok kellenek |
| Időzítés vezérlése | Nem, kevésbé kiszámítható | Igen, teljes kontroll a várakozások és újrapróbálkozások felett |
| Komplex munkafolyamatok | Igen, kezeli a váratlan UI állapotokat | Nem, explicit elágazást igényel |

### Browser-Use legjobb gyakorlatok

1. Kezdj ügynökkel a felfedezéshez és dinamikus navigációhoz.
2. Válts közvetlen oldalszintű vezérlésre, ha az interakció kiszámíthatóvá válik.
3. Használj strukturált kimeneti modelleket, hogy a kinyert adatok validáltak és típus-biztosak legyenek.
4. Strategikusan alkalmazz késleltetéseket olyan műveletek után, amelyek látható UI változásokat váltanak ki.
5. Készíts képernyőképeket iterálás közben, hogy a hibák könnyebben hibakereshetők legyenek.
6. Számíts rá, hogy a weboldalak változhatnak, és tervezz visszaesési stratégiákat a felugró ablakok és az elrendezésváltozások kezelésére.
7. Keverd az ügynök és szereplő mintákat, hogy egyszerre kapj rugalmasságot és pontosságot.

### Valós alkalmazások

- Utazásfoglalás és árfigyelés
- E-kereskedelmi árösszehasonlítás és készletellenőrzés
- Strukturált adatkinyerés dinamikus weboldalakról
- Látásalapú UI tesztelés és ellenőrzés
- Weboldalfigyelés és riasztás
- Intelligens űrlapkitöltés több lépéses folyamatok során

## További források

- [Browser-Use Playwright integrációs sablon](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use szereplő paraméterek és tartalomkinyerés](https://docs.browser-use.com/customize/actor/all-parameters)
- [Tanfolyam beállítása](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősségkizárás**:  
Ezt a dokumentumot az AI fordító szolgáltatás [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével fordítottuk. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások tartalmazhatnak hibákat vagy pontatlanságokat. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Kritikus információk esetén javasolt a szakmai, emberi fordítás igénybevétele. Nem vállalunk felelősséget az ebből eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->