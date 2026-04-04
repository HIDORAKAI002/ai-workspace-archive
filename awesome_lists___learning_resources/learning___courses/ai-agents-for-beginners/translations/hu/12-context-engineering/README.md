# Kontextus tervezés AI ügynökök számára

[![Kontextus Tervezés](../../../translated_images/hu/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Kattints a fenti képre a leckéhez tartozó videó megtekintéséhez)_

Fontos megérteni annak az alkalmazásnak a bonyolultságát, amelyhez AI ügynököt építesz, hogy megbízható legyen az. Olyan AI ügynököket kell létrehoznunk, amelyek hatékonyan kezelik az információt, hogy összetettebb igényeket is tudjanak kielégíteni, túllépve a prompt tervezésen.

Ebben a leckében megnézzük, mi az a kontextus tervezés és milyen szerepet játszik az AI ügynökök építésében.

## Bevezetés

A lecke a következőkre terjed ki:

• **Mi az a Kontextus tervezés**, és miért különbözik a prompt tervezéstől.

• **Hatékony Kontextus tervezési stratégiák**, beleértve az információ írását, kiválasztását, tömörítését és izolálását.

• **Gyakori kontextus hibák**, amelyek keresztülhúzhatják az AI ügynököd munkáját, és hogyan lehet ezeket kijavítani.

## Tanulási célok

A lecke elvégzése után tudni fogod, hogyan:

• **Definiáld a kontextus tervezést**, és különböztesd meg a prompt tervezéstől.

• **Azonosítsd a kontextus kulcsfontosságú elemeit** a Nagy Nyelvi Modell (LLM) alkalmazásokban.

• **Alkalmazz stratégiákat a kontextus írására, kiválasztására, tömörítésére és izolálására**, hogy javítsd az ügynök teljesítményét.

• **Fel ismerd a gyakori kontextus problémákat** mint a mérgezés, elterelés, zavarodás és összecsapás, valamint hogy alkalmazz csökkentő megoldásokat.

## Mi az a Kontextus Tervezés?

AI ügynökök esetén a kontextus az, ami vezérli az AI ügynök tervét bizonyos cselekvések megtételére. A Kontextus tervezés annak a gyakorlata, hogy biztosítsuk az AI ügynök számára a megfelelő információt a feladat következő lépésének végrehajtásához. A kontextus ablak mérete korlátozott, így ügynök építőként rendszereket és folyamatokat kell kialakítanunk az információ hozzáadására, eltávolítására és tömörítésére a kontextus ablakban.

### Prompt tervezés vs Kontextus tervezés

A prompt tervezés egyetlen statikus utasítássorozatra összpontosít, amely hatékonyan irányítja az AI ügynököket szabálykészlettel. A kontextus tervezés az információ dinamikus készletének kezeléséről szól, beleértve az kezdeti promptot is, hogy idővel biztosítsa, hogy az AI ügynök rendelkezzen a szükséges adatokkal. A kontextus tervezés fő célja, hogy ezt a folyamatot ismételhetővé és megbízhatóvá tegye.

### A kontextus típusai

[![Kontextus Típusok](../../../translated_images/hu/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Fontos megjegyezni, hogy a kontextus nem csak egyetlen dolog. Az AI ügynök számára szükséges információ különböző forrásokból származhat, és rajtunk múlik, hogy biztosítsuk az ügynök hozzáférését ezekhez a forrásokhoz:

Az AI ügynök által kezelendő kontextus típusai közé tartoznak:

• **Utasítások:** Ezek olyan szabályok, mint az ügynök "szabályai" – promptok, rendszerüzenetek, néhány példa (amely megmutatja az AI-nak, hogyan csináljon valamit) és az általa használható eszközök leírásai. Itt kapcsolódik össze a prompt tervezés fókusza a kontextus tervezéssel.

• **Tudás:** Ide tartoznak a tények, az adatbázisokból lekért információk, vagy az ügynök által hosszú távon felhalmozott emlékek. Ez magában foglalja egy Lekérdezés Alapú Generálás (RAG) rendszer integrálását is, ha az ügynöknek szüksége van különböző tudásbázisokhoz és adatbázisokhoz való hozzáféréshez.

• **Eszközök:** Ezek külső függvények, API-k és MCP szerverek definíciói, amelyeket az ügynök hívhat, valamint a használatukból visszakapott visszajelzések (eredmények).

• **Beszélgetési előzmények:** A felhasználóval folytatott aktuális párbeszéd. Ahogy telik az idő, ezek a beszélgetések hosszabbak és összetettebbek lesznek, ezért helyet foglalnak a kontextus ablakban.

• **Felhasználói preferenciák:** Idővel megtanult információk a felhasználó ízléséről vagy ellenérzéséről. Ezeket el lehet tárolni és előhívni a kulcsfontosságú döntések során a felhasználó segítésére.

## Hatékony Kontextus Tervezési Stratégiák

### Tervezési stratégiák

[![Kontextus Tervezés Legjobb Gyakorlatai](../../../translated_images/hu/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

A jó kontextus tervezés jó tervezéssel kezdődik. Íme egy megközelítés, amely segít elkezdeni gondolkodni a kontextus tervezési koncepció alkalmazásáról:

1. **Határozz meg egyértelmű eredményeket** - Az AI ügynököknek kiosztott feladatok eredményeit egyértelműen meg kell határozni. Válaszold meg a kérdést: "Milyen lesz a világ, amikor az AI ügynök befejezi a feladatát?" Más szóval, milyen változást, információt vagy választ kell a felhasználónak kapnia az AI ügynökkel való interakció után.
2. **Térképezd fel a kontextust** - Miután meghatároztad az AI ügynök eredményeit, meg kell válaszolnod a kérdést: "Milyen információra van szüksége az AI ügynöknek a feladat elvégzéséhez?" Így elkezdheted feltérképezni, hol található meg az az információ.
3. **Hozz létre kontextus csatornákat** - Most, hogy tudod, hol van az információ, meg kell válaszolnod a kérdést: "Hogyan fogja az ügynök elérni ezt az információt?" Erre több megoldás is van, beleértve a RAG-et, MCP szerverek és más eszközök használatát.

### Gyakorlati stratégiák

A tervezés fontos, de amint az információ elkezd befolyni az ügynök kontextus ablakába, gyakorlati stratégiákra van szükségünk a kezelésére:

#### Kontextus kezelése

Miközben néhány információ automatikusan kerül be a kontextus ablakba, a kontextus tervezés arról szól, hogy aktívabb szerepet vállaljunk ebben az információkezelésben, amit néhány stratégiával megtehetünk:

 1. **Ügynök jegyzetfüzete**  
 Ez lehetővé teszi az AI ügynök számára, hogy jegyzeteket készítsen az aktuális feladatokról és felhasználói interakciókról egyetlen munkamenet alatt. Ez kívül kell, hogy legyen a kontextus ablakon, egy fájlban vagy egy futásidejű objektumban, amelyet az ügynök később, ha szükséges, visszahívhat a munkamenet során.

 2. **Emlékek**  
 A jegyzetfüzetek jók az információk kezelésére egyetlen munkamenet kontextusablakán kívül. Az emlékek lehetővé teszik az ügynököknek, hogy releváns információkat tároljanak és hívjanak elő több munkamenet során. Ide tartozhatnak összefoglalók, felhasználói preferenciák és visszajelzések a jövőbeni fejlesztésekhez.

 3. **Kontextus tömörítése**  
 Amint a kontextus ablak nő és a határához közelít, alkalmazhatóak olyan technikák mint az összefoglalás és levágás. Ez vagy csak a legrelevánsabb információ megtartását, vagy a régebbi üzenetek eltávolítását jelenti.

 4. **Többügynökös rendszerek**  
 Többügynökös rendszerek fejlesztése a kontextus tervezés egyik formája, mert minden ügynök saját kontextus ablakkal rendelkezik. Annak megtervezése, hogy a kontextus miként oszlik meg és jut el a különböző ügynökökhöz, egy külön dolog, amit meg kell fontolni ezen rendszerek építésekor.

 5. **Sandbox környezetek**  
 Ha egy ügynöknek kódot kell futtatnia, vagy nagy mennyiségű információt kell feldolgoznia egy dokumentumban, ez sok token feldolgozását igényli az eredményekhez. Ehelyett, hogy mindez a kontextus ablakban legyen tárolva, az ügynök használhat egy sandbox környezetet, amely képes futtatni a kódot, majd csak az eredményt és egyéb releváns információkat olvassa be.

 6. **Futásidejű állapot objektumok**  
 Ez úgy történik, hogy információtartályokat hozunk létre a helyzetek kezelésére, amikor az ügynöknek hozzáférésre van szüksége bizonyos adatokhoz. Egy összetett feladat esetén ez lehetővé teszi az ügynök számára, hogy az alfeladatok eredményeit lépésről lépésre tárolja, így a kontextus csak a konkrét alfeladathoz kapcsolódik.

### Példa a Kontextus tervezésre

Tegyük fel, hogy egy AI ügynököt szeretnénk, hogy **"Foglaljon nekem utat Párizsba."**

• Egy egyszerű ügynök, amely csak prompt tervezést használ, talán csak így válaszol: **"Rendben, mikor szeretnél Párizsba menni?"** Csak a közvetlen kérdésedet dolgozta fel abban a pillanatban, amikor a felhasználó feltette.

• Egy ügynök, amely a fent tárgyalt kontextus tervezési stratégiákat alkalmazza, sokkal többet fog tenni. Még azelőtt, hogy válaszolna, a rendszere például:

  ◦ **Ellenőrzi a naptárodat** a szabad időpontok miatt (valós idejű adatok lekérése).

 ◦ **Előhívja a korábbi utazási preferenciáidat** (hosszú távú memória alapján) mint a kedvenc légitársaság, keret vagy hogy közvetlen járatokat kedvelsz-e.

 ◦ **Azonosítja a rendelkezésre álló eszközöket** a repülő- és szállásfoglaláshoz.

- Ezután egy példaválasz lehet:  "Szia [Neved]! Látom, hogy október első hetében szabad vagy. Keressek közvetlen járatokat Párizsba a [kedvenc légitársaság] légitársaságnál a szokásos [keret] keretedben?" Ez a gazdagabb, kontextus tudatos válasz jól mutatja a kontextus tervezés erejét.

## Gyakori Kontextus Hibák

### Kontextus mérgezés

**Mi ez:** Amikor egy hallucináció (hamis információ, amit az LLM generál) vagy hiba kerül a kontextusba és ismételten hivatkoznak rá, az ügynök lehetetlen célokat követ vagy értelmetlen stratégiákat dolgoz ki.

**Mit kell tenni:** Alkalmazz **kontextus validálást** és **karantént**. Az információt ellenőrizd mielőtt beteszed a hosszú távú memóriába. Ha potenciális mérgezést észlelsz, indíts új kontextus szálakat, hogy megakadályozd a rossz információ terjedését.

**Utazásfoglalási példa:** Az ügynök hallucinál egy **közvetlen járatot egy kis helyi reptérről egy távoli nemzetközi városba**, amely valójában nem kínál nemzetközi járatokat. Ez a nem létező járat adat bekerül a kontextusba. Később, amikor jegyeket kérsz, az ügynök ezen a lehetetlen útvonalon próbál jegyeket találni, ami ismételt hibákhoz vezet.

**Megoldás:** Adj hozzá egy lépést, amely **ellenőrzi a járatok létezését és útvonalait valós idejű API-val** még mielőtt a járat részletet az ügynök kontextusába tennéd. Ha az ellenőrzés sikertelen, az téves információ "karanténba" kerül, és nem használják tovább.

### Kontextus elterelés

**Mi ez:** Amikor a kontextus olyan nagyra nő, hogy a modell túlzottan a felhalmozott előzményekre koncentrál ahelyett, hogy a tanulás során szerzett tudást használná, ami ismétlődő vagy haszontalan műveletekhez vezet. A modellek még a kontextus ablak betelése előtt is hibákat kezdhetnek el követni.

**Mit kell tenni:** Használj **kontextus összefoglalást**. Időszakosan tömörítsd az összegyűlt információkat rövidebb összefoglalókba, miközben megtartod a fontos részleteket, és eltávolítod a redundáns előzményeket. Ez segít a fókusz "visszaállításában".

**Utazásfoglalási példa:** Hosszú ideje beszélgetsz különféle álmokból álló utazási célpontokról, beleértve a részletes beszámolót két évvel ezelőtti hátizsákos túrádról. Amikor végül azt kéred, hogy **"találj nekem olcsó repülőjegyet a következő hónapra,"** az ügynök belemerül a régi, irreleváns részletekbe, és folyton a hátizsákos felszerelésedről vagy a korábbi útitervről kérdez, elhanyagolva a mostani kérést.

**Megoldás:** Egy bizonyos forduló után vagy amikor a kontextus túl nagyra nő, az ügynöknek **össze kell foglalnia a beszélgetés legfrissebb és legfontosabb részeit** – az aktuális utazási dátumokra és célpontra fókuszálva – és azt a tömörített összefoglalót használja a következő LLM hívásnál, elvetve a kevésbé releváns korábbi beszélgetést.

### Kontextus zavarodás

**Mi ez:** Amikor szükségtelen kontextus, gyakran a túl sok eszköz jelenléte miatt, a modell rossz válaszokat generál vagy irreleváns eszközöket hív meg. A kisebb modellek különösen hajlamosak erre.

**Mit kell tenni:** Valósíts meg **eszköz kezelését** RAG technikákkal. Tárold az eszközök leírásait egy vektor adatbázisban, és válaszd ki _csak_ a legrelevánsabb eszközöket minden konkrét feladathoz. Kutatások szerint jó, ha 30-nál kevesebb eszközre korlátozódik a választék.

**Utazásfoglalási példa:** Az ügynök hozzáfér akár több tucat eszközhöz: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations`, stb. Megkérdezed, **"Mi a legjobb módja a közlekedésnek Párizsban?"** A rengeteg eszköz miatt az ügynök összezavarodik, megpróbálja például a `book_flight`-ot meghívni Párizson belül, vagy a `rent_car`-t autóbérlésként, annak ellenére, hogy a tömegközlekedést részesíted előnyben, mert az eszköz leírások átfedhetnek, vagy egyszerűen nem tudja eldönteni a legjobbat.

**Megoldás:** Használd **RAG-et az eszköz leírásokra**. Amikor a párizsi közlekedésről kérdezel, a rendszer dinamikusan lekéri _csak_ a legrelevánsabb eszközöket, mint a `rent_car` vagy `public_transport_info` a lekérdezés alapján, így egy fókuszált "készletet" mutat be az LLM-nek.

### Kontextus összecsapás

**Mi ez:** Amikor ellentmondásos információk vannak a kontextusban, ami következetlen érveléshez vagy rossz végső válaszokhoz vezet. Ez gyakran akkor történik, amikor az információk több lépésben érkeznek, és a korai, helytelen feltételezések megmaradnak a kontextusban.

**Mit kell tenni:** Alkalmazz **kontextus trimmelést** és **letárolást**. A trimmelés az elavult vagy ellentmondásos információk eltávolítását jelenti, ahogy új részletek érkeznek. A letárolás egy külön "jegyzetfüzet" munkaterületet biztosít a modellnek, hogy az információt feldolgozza anélkül, hogy a fő kontextus rendezetlen lenne.

**Utazásfoglalási példa:** Először azt mondod az ügynöknek, hogy **"Economy osztályon szeretnék repülni."** A beszélgetés későbbi részében megváltoztatod a véleményedet, és így mondod: **"Vagyis ezen az úton inkább business osztályra szeretnék menni."** Ha mindkét utasítás benne marad a kontextusban, az ügynök ellentmondásos keresési eredményeket kaphat, vagy összezavarodhat, hogy melyik preferenciát helyezze előtérbe.

**Megoldás:** Alkalmazz **kontextus trimmelést**. Ha egy új utasítás ellentmond egy réginek, az öregebb utasítást eltávolítják vagy explicit módon felülbírálják a kontextusban. Alternatív megoldásként az ügynök használhat egy **jegyzetfüzetet**, hogy összehangolja az ellentmondó preferenciákat, mielőtt dönt, így csak a végső, konzisztens utasítás irányítja a cselekvéseit.

## További kérdéseid lennének a Kontextus Tervezésről?

Csatlakozz a [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) közösséghez, hogy találkozz más tanulókkal, részt vegyél irodai órákon és megválaszoltasd AI ügynökökkel kapcsolatos kérdéseidet.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősség kizárása**:
Ez a dokumentum az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások tartalmazhatnak hibákat vagy pontatlanságokat. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Kritikus információk esetén professzionális emberi fordítást javaslunk. Nem vállalunk felelősséget az ebből eredő félreértésekért vagy félreértelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->