# MCP Biztonság: Átfogó védelem AI rendszerek számára

[![MCP Security Best Practices](../../../translated_images/hu/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kattints a fenti képre, hogy megnézd a tanóra videóját)_

A biztonság alapvető az AI rendszerek tervezésénél, ezért helyezzük ezt a második szekcióként a prioritásaink közé. Ez összhangban áll a Microsoft **Secure by Design** elvével a [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) keretében.

A Model Context Protocol (MCP) erőteljes új képességeket hoz AI-vezérelt alkalmazásokba, miközben egyedi biztonsági kihívásokat vet fel, amelyek túlmutatnak a hagyományos szoftverkockázatokon. Az MCP rendszerek szembesülnek mind a meglévő biztonsági aggályokkal (biztonságos kódolás, legkisebb jogosultság, beszállítói lánc biztonság), mind pedig új, kizárólag AI-re jellemző fenyegetésekkel, úgymint prompt injekció, eszköz mérgezés, munkamenet eltérítés, confused deputy támadások, token átengedési sérülékenységek és dinamikus képesség módosítás.

Ez a tananyag a legkritikusabb biztonsági kockázatokat tárgyalja az MCP megvalósításokban — lefedve az autentikációt, jogosultságot, túlzott jogosultságokat, közvetett prompt injekciót, munkamenet biztonságot, confused deputy problémákat, token kezelést és beszállítói lánc sérülékenységeket. Megtanulod az alkalmazható kontrollokat és bevált gyakorlatokat ezek kockázatok mérséklésére, miközben kihasználod a Microsoft megoldásait, például a Prompt Shields-t, az Azure Content Safety-t és a GitHub Advanced Security-t az MCP telepítésed megerősítésére.

## Tanulási célok

A tanóra végére képes leszel:

- **MCP-specifikus fenyegetések felismerése**: Az MCP rendszerek egyedi biztonsági kockázatainak megértése, beleértve a prompt injekciót, eszköz mérgezést, túlzott jogosultságokat, munkamenet eltérítést, confused deputy problémákat, token átengedési sérülékenységeket és beszállítói lánc kockázatokat
- **Biztonsági kontrollok alkalmazása**: Hatékony mérséklések megvalósítása, beleértve a robusztus autentikációt, legkisebb jogosultság hozzáférést, biztonságos token kezelést, munkamenet biztonsági kontrollokat és beszállítói lánc ellenőrzést
- **Microsoft biztonsági megoldások hasznosítása**: A Microsoft Prompt Shields, Azure Content Safety és GitHub Advanced Security megértése és bevetése az MCP munkaterhelés védelmében
- **Eszközbiztonság validálása**: Az eszköz metaadatok érvényesítésének fontosságának felismerése, dinamikus változások figyelése és védekezés a közvetett prompt injekciós támadások ellen
- **Bevált gyakorlatok integrálása**: Meglévő biztonsági alapelvek (biztonságos kódolás, szervererősítés, zero trust) egyesítése MCP-specifikus kontrollokkal az átfogó védelem érdekében

# MCP Biztonsági architektúra és kontrollok

A modern MCP megvalósítások többrétegű biztonsági megközelítéseket igényelnek, amelyek mind a hagyományos szoftverbiztonságot, mind az AI-specifikus fenyegetéseket kezelik. Az MCP specifikáció gyors fejlődése folyamatosan fejleszti biztonsági kontrolljait, lehetővé téve a jobb integrációt vállalati biztonsági architektúrákkal és bevált gyakorlatokkal.

A [Microsoft Digital Defense Report](https://aka.ms/mddr) kutatása kimutatja, hogy a **jelentett incidensek 98%-a megelőzhető robusztus biztonsági higiénia révén**. A leghatékonyabb védekezési stratégia az alapvető biztonsági gyakorlatok és MCP-specifikus kontrollok kombinálása — a bizonyított alapbiztonsági intézkedések a legnagyobb hatásúak az összesített kockázat csökkentésében.

## Jelenlegi Biztonsági Helyzet

> **Megjegyzés:** Ezek az információk az MCP biztonsági szabványokat tükrözik **2026. február 5-ig**, összhangban az **MCP Specifikáció 2025-11-25** verzióval. Az MCP protokoll gyorsan fejlődik, és a jövőbeni megvalósítások új autentikációs mintákat és fejlettebb kontrollokat hozhatnak. Mindig tekintsd meg a legfrissebb [MCP Specifikációt](https://spec.modelcontextprotocol.io/), [MCP GitHub tárházát](https://github.com/modelcontextprotocol) és a [biztonsági legjobb gyakorlatokat tartalmazó dokumentációt](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) a legaktuálisabb útmutatásért.

> **Előretekintve:** a `2026-07-28` kiadási jelölt tovább szigorítja az autorizációt — az ügyfeleknek validálniuk kell az `iss` paramétert az autorizációs válaszokon (RFC 9207), meg kell határozniuk egy OpenID Connect `application_type`-ot a Dinamikus Ügyfél Regisztráció során, és a regisztrált hitelesítő adatokat az autorizáló szerverhez kell kötniük. Lásd a teljes jogosultsági SEP-ek listáját a [Mi változik az MCP-ben: A 2026-07-28 kiadási jelölt](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) dokumentumban.

## 🏔️ MCP Biztonsági Csúcstalálkozó Műhely (Sherpa)

A **gyakorlati biztonsági képzéshez** erősen ajánljuk az **MCP Biztonsági Csúcstalálkozó Műhelyt** (Sherpa) — egy átfogó, vezetett expedíciót az MCP szerverek Microsoft Azure-ban történő biztonságosítására.

### Műhely áttekintése

Az [MCP Biztonsági Csúcstalálkozó Műhely](https://azure-samples.github.io/sherpa/) gyakorlati, cselekvőképes biztonsági képzést nyújt egy bizonyított "sebezhetőség → kihasználás → javítás → érvényesítés" módszertan által. A következőket fogod:

- **Tanulj a hibákból**: Tapasztald meg a sebezhetőségeket azáltal, hogy szándékosan sebezhető szervereket kihasználsz
- **Használd az Azure natív biztonsági megoldásait**: Kihasználd az Azure Entra ID-t, Key Vault-ot, API menedzsmentet és AI tartalombiztonságot
- **Kövesd a rétegzett védekezést**: Táborok mentén építs átfogó biztonsági rétegeket
- **Alkalmazd az OWASP szabványokat**: Minden technika megfelel az [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) útmutatásainak
- **Szerezd meg a produkciós kódot**: Dolgozó, tesztelt megvalósításokkal távozol

### Az expedíció útvonala

| Tábor | Fókusz | Fedezett OWASP kockázatok |
|------|-------|---------------------|
| **Alaptábor** | MCP alapok és autentikációs sebezhetőségek | MCP01, MCP07 |
| **1. tábor: Identitás** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **2. tábor: Átjáró** | API menedzsment, privát végpontok, kormányzás | MCP02, MCP06, MCP07, MCP09 |
| **3. tábor: I/O Biztonság** | Prompt injekció, személyes adatvédelem, tartalombiztonság | MCP03, MCP05, MCP06, MCP10 |
| **4. tábor: Megfigyelés** | Log elemzés, irányítópultok, fenyegetésészlelés | MCP04, MCP08 |
| **Csúcstalálkozó** | Red Team / Blue Team integrációs teszt | Mind |

**Kezdd el itt**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Biztonsági Kockázat

Az [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) részletezi a legkritikusabb tíz biztonsági kockázatot az MCP megvalósításokhoz:

| Kockázat | Leírás | Azure mérséklés |
|------|-------------|------------------|
| **MCP01** | Token kezelés hibái és titkok kiszivárgása | Azure Key Vault, Managed Identity |
| **MCP02** | Jogosultság emelkedés hatókör túllépés miatt | RBAC, Feltételes Hozzáférés |
| **MCP03** | Eszköz mérgezés | Eszköz validáció, integritás ellenőrzés |
| **MCP04** | Szoftver beszállítói lánc támadások és függőség manipuláció | GitHub Advanced Security, függőségvizsgálat |
| **MCP05** | Parancs injekció és végrehajtás | Bememeneti érvényesítés, sandoxing |
| **MCP06** | Szándék folyamat megkerülése | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Elégtelen autentikáció és jogosultságkezelés | Azure Entra ID, OAuth 2.1 PKCE-vel |
| **MCP08** | Auditálás és telemetria hiánya | Azure Monitor, Application Insights |
| **MCP09** | Árnyék MCP szerverek | API Center kormányzás, hálózati izoláció |
| **MCP10** | Kontextus befecskendezés és túlzott megosztás | Adatosztályozás, minimális kitettség |

### MCP Autentikáció fejlődése

Az MCP specifikáció jelentősen fejlődött autentikáció és jogosultságkezelés terén:

- **Eredeti megközelítés**: Korai specifikációk megkövetelték a fejlesztőktől, hogy egyedi autentikációs szervereket építsenek, az MCP szerverek pedig OAuth 2.0 autorizációs szerverként működtek és közvetlenül kezelték a felhasználói autentikációt
- **Jelenlegi szabvány (2025-11-25)**: Frissített specifikáció lehetővé teszi az MCP szerverek számára, hogy az autentikációt külső identitásszolgáltatókra (pl. Microsoft Entra ID) bízzák, javítva a biztonsági állapotot és csökkentve a megvalósítási komplexitást
- **Továbbfejlesztett transport réteg biztonság**: Fejlesztett támogatás biztonságos szállítási mechanizmusokhoz, megfelelő autentikációs mintákkal mind helyi (STDIO), mind távoli (Streamable HTTP) kapcsolatokhoz

## Autentikáció és jogosultságkezelés biztonsága

### Jelenlegi biztonsági kihívások

A modern MCP megvalósítások több autentikációs és jogosultságkezelési kihívással néznek szembe:

### Kockázatok és fenyegetési vektorok

- **Helytelenül konfigurált jogosultság logika**: Hibás jogosultságkezelés az MCP szervereken érzékeny adatok kiszivárgását és nem megfelelő hozzáférés-ellenőrzést eredményezhet
- **OAuth token kompromittálás**: Helyi MCP szerver token lopása lehetővé teszi a támadók számára a szerverek megszemélyesítését és downstream szolgáltatások elérését
- **Token átengedési sérülékenységek**: Helytelen token kezelés lehetővé teszi a biztonsági kontrollok megkerülését és elszámoltathatósági hiányokat
- **Túlzott jogosultságok**: Túlzott jogosultságú MCP szerverek sértik a legkisebb jogosultság elvét és megnövelik a támadási felületet

#### Token átengedés: Kritikus negatív minta

A **token átengedés kifejezetten tiltott** a jelenlegi MCP autorizációs specifikációban súlyos biztonsági következményei miatt:

##### Biztonsági kontroll megkerülés
- Az MCP szerverek és downstream API-k kritikus biztonsági kontrollokat valósítanak meg (pl. aránykorlátozás, kérés érvényesítés, forgalomfigyelés), melyek a megfelelő token érvényesítésen alapulnak
- Közvetlen kliens-API token használat megkerüli ezeket az alapvető védelmeket, aláássa a biztonsági architektúrát

##### Felelősségvállalási és audit kihívások  
- Az MCP szerverek nem tudják megkülönböztetni az upstream által kiadott tokeneket használó ügyfeleket, megszakítva az audit nyomokat
- A downstream erőforrásszerver naplók megtévesztő kérés eredeteket mutatnak a valós MCP szerver közvetítők helyett
- Az incidenskezelés és megfelelőségi audit sokkal nehezebb lesz

##### Adatkiszivárgási kockázatok
- Érvénytelenített token állítások lehetővé teszik rosszindulatú szereplőknek, hogy lopott tokenekkel MCP szervereket használjanak proxyként adatkiszivárgáshoz
- Bizalmi határok megsértése megkerüli a szándékolt biztonsági kontrollokat

##### Több szolgáltatást érintő támadási vektorok
- Több szolgáltatás által elfogadott kompromittált tokenek lehetővé teszik az oldalirányú mozgást a kapcsolódó rendszerek között
- A szolgáltatások közötti bizalmi feltételezések megsértődhetnek, ha a token eredete nem ellenőrizhető

### Biztonsági kontrollok és mérséklések

**Kritikus biztonsági követelmények:**

> **KÖTELEZŐ**: Az MCP szerverek **NEM FOGADHATNAK EL** olyan tokeneket, amelyeket nem az adott MCP szerver számára explicit módon bocsátottak ki

#### Autentikáció és jogosultságkezelési kontrollok

- **Átfogó jogosultság felülvizsgálat**: Teljes körű auditálás az MCP szerver jogosultság logikáján, hogy csak a szándékolt felhasználók és kliensek férhessenek hozzá érzékeny erőforrásokhoz
  - **Megvalósítási útmutató**: [Azure API Management, mint autentikációs átjáró az MCP szerverekhez](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identitás integráció**: [Microsoft Entra ID használata MCP szerver autentikációhoz](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Biztonságos token kezelés**: [A Microsoft token érvényesítési és életciklus bevált gyakorlatai](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) megvalósítása
  - Érvényesítsd, hogy a token közönség állításai megfelelnek az MCP szerver identitásának
  - Alkalmazz megfelelő token forgatási és lejárati szabályzatokat
  - Előzd meg a token visszajátszási támadásokat és jogosulatlan használatot

- **Védett token tárolás**: Titkosított token tárolás mind nyugalmi, mind átvitel közbeni állapotban
  - **Bevált gyakorlatok**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Hozzáférés-vezérlési megvalósítás

- **Legkisebb jogosultság elve**: Csak a szükséges minimális jogosultságokat add meg az MCP szervereknek a tervezett funkciókhoz
  - Rendszeres jogosultság felülvizsgálatok és frissítések a jogosultság növekedés megelőzésére
  - **Microsoft dokumentáció**: [Biztonságos legkisebb jogosultságú hozzáférés](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Szerepalapú hozzáférés-vezérlés (RBAC)**: Finomhangolt szerep hozzárendelések megvalósítása
  - Szerepkörök szűk körű korlátozása konkrét erőforrásokra és műveletekre
  - Kerüld a túl széles vagy szükségtelen jogosultságokat, amelyek növelik a támadási felületet

- **Folyamatos jogosultság monitorozás**: Hozzáférési auditálás és monitorozás bevezetése
  - Kövesd a jogosultsághasználati mintákat anomáliákért
  - Gyorsan szüntesd meg a túlzott vagy használaton kívüli jogosultságokat

## AI-specifikus biztonsági fenyegetések

### Prompt injekció és eszköz manipulációs támadások

A modern MCP megvalósítások kifinomult AI-specifikus támadási vektorokkal néznek szembe, amelyeket a hagyományos biztonsági intézkedések nem tudnak teljes mértékben kezelni:

#### **Közvetett prompt injekció (Cross-Domain Prompt Injection)**

A **közvetett prompt injekció** az egyik legkritikusabb sérülékenység az MCP-képes AI rendszerekben. A támadók rosszindulatú utasításokat ágyaznak be külső tartalmakba — dokumentumokba, weboldalakba, e-mailekbe vagy adatforrásokba — amelyeket az AI rendszerek később legitim parancsként dolgoznak fel.

**Támadási forgatókönyvek:**
- **Dokumentum alapú befecskendezés**: Rosszindulatú utasítások elrejtve feldolgozott dokumentumokban, amelyek nem szándékolt AI műveleteket váltanak ki
- **Webtartalom kihasználás**: Kompromittált weboldalak beágyazott promptokkal, amelyek manipulálják az AI viselkedését, amikor adatokat gyűjtenek róluk
- **E-mail alapú támadások**: Rosszindulatú promptok e-mailekben, amelyek arra késztetik az AI asszisztenst, hogy információkat szivárogtasson vagy jogosulatlan műveleteket hajtson végre
- **Adatforrás szennyezés**: Kompromittált adatbázisok vagy API-k, amelyek szennyezett tartalmat szolgáltatnak az AI rendszereknek

**Való életbeli hatás**: Ezek a támadások adatkiszivárgást, adatvédelmi incidenseket, káros tartalom generálását és felhasználói interakciók manipulálását eredményezhetik. Részletes elemzésért lásd [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/hu/prompt-injection.ed9fbfde297ca877.webp)

#### **Eszköz mérgezés támadások**

Az **eszköz mérgezés** az MCP eszközöket definiáló metaadatokat célozza, kihasználva azt, ahogyan a nagy nyelvi modellek (LLM) az eszközleírásokat és paramétereket értelmezik a végrehajtási döntések meghozatalához.

**Támadási mechanizmusok:**
- **Metaadat manipuláció**: Támadók rosszindulatú utasításokat fecskendeznek be az eszköz leírásokba, paraméter definíciókba vagy használati példákba
- **Láthatatlan utasítások**: Rejtett promptok az eszköz metaadatokban, amelyeket az AI modellek feldolgoznak, de az emberi felhasználók nem látnak
- **Dinamikus eszköz módosítás ("rug pull")**: A felhasználók által jóváhagyott eszközök később titokban módosulnak rosszindulatú műveletek végrehajtására a felhasználók tudta nélkül
- **Paraméter befecskendezés**: Rosszindulatú tartalom beágyazása az eszköz paraméter sémáiba, amely befolyásolja a modell viselkedését


**Tárhelyen üzemeltetett szerverek kockázatai**: A távoli MCP szerverek nagyobb kockázatot jelentenek, mivel az eszközdefiníciók a felhasználói jóváhagyás után is frissíthetők, így korábban biztonságos eszközök rosszindulatúvá válhatnak. A részletes elemzésért lásd: [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Eszközbeillesztési támadási diagram](../../../translated_images/hu/tool-injection.3b0b4a6b24de6bef.webp)

#### **További MI támadási vektorok**

- **Domain-eken átnyúló prompt injekció (XPIA)**: Összetett támadások, amelyek több domain tartalmát használják fel a biztonsági ellenőrzések kikerüléséhez
- **Dinamiki képesség módosítás**: Az eszközképességek valós idejű változtatása, amely megkerüli a kezdeti biztonsági felméréseket
- **Kontextus ablak mérgezés**: Támadások, amelyek nagy kontextusablakokat manipulálnak a rosszindulatú utasítások elrejtésére
- **Modell zavartatás támadások**: A modell korlátainak kihasználásával kiszámíthatatlan vagy nem biztonságos viselkedések létrehozása


### MI biztonsági kockázatok hatásai

**Magas hatású következmények:**
- **Adatkivitel**: Jogosulatlan hozzáférés és érzékeny vállalati vagy személyes adatok eltulajdonítása
- **Adatvédelmi incidensek**: Személyazonosításra alkalmas adatok (PII) és bizalmas üzleti adatok kiszivárgása
- **Rendszermanipuláció**: Kritikus rendszerek és munkafolyamatok nem szándékolt módosításai
- **Hitelesítő adatok ellopása**: Hitelesítési tokenek és szolgáltatási hitelesítő adatok kompromittálása
- **Oldalirányú mozgás**: Megsértett MI rendszerek használata szélesebb körű hálózati támadások pivot pontjaként

### Microsoft MI biztonsági megoldások

#### **MI Prompt Shields: Fejlett védelem az injekciós támadások ellen**

A Microsoft **MI Prompt Shields** több biztonsági rétegen keresztül nyújt átfogó védelmet mind közvetlen, mind közvetett prompt injekciós támadások ellen:

##### **Alapvető védelmi mechanizmusok:**

1. **Fejlett felismerés és szűrés**
   - Gépi tanulási algoritmusok és NLP technikák, amelyek felismerik a rosszindulatú utasításokat külső tartalmakban
   - Valós idejű elemzés dokumentumok, weboldalak, e-mailek és adatforrások esetén a beágyazott fenyegetések azonosítására
   - Kontexualizált megértés a jogos és rosszindulatú prompt minták között

2. **Kiemelési technikák**  
   - Megkülönbözteti a megbízható rendszerutasításokat a potenciálisan kompromittált külső bemenetektől
   - Szövegátalakító módszerek, amelyek növelik a modell relevanciáját miközben elkülönítik a rosszindulatú tartalmakat
   - Segíti az MI rendszereket a helyes utasítási hierarchia fenntartásában és a beszúrt parancsok figyelmen kívül hagyásában

3. **Elválasztó és adatjelző rendszerek**
   - Egyértelmű határvonal meghatározása a megbízható rendszerüzenetek és a külső bemeneti szöveg között
   - Különleges jelölők emelik ki a határokat a megbízható és nem megbízható adatforrások között
   - Egyértelmű elkülönítés megakadályozza az utasítási zavarokat és a jogosulatlan parancsvégrehajtást

4. **Folyamatos fenyegetésintelligencia**
   - A Microsoft folyamatosan figyeli az új támadási mintákat és frissíti a védekezést
   - Proaktív fenyegetéskutatás új injekciós technikák és támadási vektorok után
   - Rendszeres biztonsági modellfrissítések az evolúcionáló fenyegetések elleni hatékonyság fenntartásáért

5. **Azure Content Safety integráció**
   - Az átfogó Azure AI Content Safety csomag része
   - Kiegészítő felismerés jailbreak kísérletek, káros tartalmak és biztonsági szabályzat megsértések ellen
   - Egységes biztonsági vezérlések az MI alkalmazás komponensei között

**Megvalósítási források**: [Microsoft Prompt Shields Dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields védelem](../../../translated_images/hu/prompt-shield.ff5b95be76e9c78c.webp)


## Fejlett MCP biztonsági fenyegetések

### Munkamenet eltérítés sérülékenységek

A **munkamenet eltérítés** kritikus támadási vektor a állapotfüggő MCP megvalósításokban, amikor jogosulatlan felek megszerzik és visszaélnek jogos munkamenet azonosítókkal, hogy ügyfeleket megszemélyesítve jogosulatlan műveleteket végezzenek.

#### **Támadási forgatókönyvek és kockázatok**

- **Munkamenet eltérítéses prompt injekció**: A lopott munkamenetazonosítókkal rendelkező támadók rosszindulatú eseményeket injektálnak a munkamenet állapotot megosztó szerverekbe, potenciálisan káros műveleteket kiváltva vagy érzékeny adatokhoz férve hozzá
- **Közvetlen megszemélyesítés**: A lopott munkamenetazonosítók lehetővé teszik a közvetlen MCP szerverhívásokat, amelyek megkerülik a hitelesítést, és a támadókat jogos felhasználóként kezelik
- **Kompromittált folytatható adatfolyamok**: A támadók korán lezárhatják a kéréseket, így a jogos ügyfelek rosszindulatú tartalommal folytatják a munkamenetet

#### **Biztonsági vezérlések a munkamenet-kezeléshez**

**Kritikus követelmények:**
- **Engedélyezés ellenőrzése**: Az MCP szerverek, amelyek engedélyezést hajtanak végre, **KÖTELESEK** minden bejövő kérelmet ellenőrizni, és **NEM SZABAD** munkamenetekre hitelesítésként hagyatkozniuk
- **Biztonságos munkamenet generálás**: Kriptográfiailag biztonságos, nem determinisztikus munkamenetazonosítókat kell használni, amelyek biztonságos véletlenszám-generátorral készülnek
- **Felhasználó-specifikus kötés**: A munkamenetazonosítókat felhasználó-specifikus információkhoz kell kötni, például `<user_id>:<session_id>` formátum szerint, hogy megakadályozzák a munkamenetek felhasználók közötti visszaélését
- **Munkamenet életciklus kezelése**: Megfelelő lejárat, forgatás és érvénytelenítés bevezetése a sérülékenységi időablakok korlátozására
- **Átvitel biztonsága**: Kötelező HTTPS minden kommunikációnál a munkamenet-azonosítók elfogása elleni védelemre

### Zavart helyettesítő probléma

A **zavart helyettesítő probléma** akkor fordul elő, amikor az MCP szerverek hitelesítési proxyként működnek ügyfelek és harmadik fél szolgáltatások között, lehetőséget teremtve az engedélyezés megkerülésére statikus ügyfélazonosító kihasználásával.

#### **Támadási mechanizmusok és kockázatok**

- **Sütialapú beleegyezés megkerülés**: Előző felhasználói hitelesítés hozz létre beleegyezési sütiket, amelyeket a támadók rosszindulatú engedélyezési kérelmekkel, előre elkészített átirányító URI-kkal használnak ki
- **Engedélyezési kód lopás**: A meglévő beleegyezési sütik miatt az engedélyezési szerverek kihagyhatják a beleegyezési képernyőket és kódokat tolnak támadó által kezelt végpontokra
- **Jogosulatlan API hozzáférés**: Lopott engedélyezési kódok lehetővé teszik tokencserét és felhasználószemélyesítést jóváhagyás nélkül

#### **Megelőzési stratégiák**

**Kötelező vezérlések:**
- **Explicit beleegyezési követelmények**: Az MCP proxy szerverek statikus ügyfélazonosítóval **KÖTELESEK** minden dinamikusan regisztrált kliens esetén felhasználói beleegyezést kérni
- **OAuth 2.1 biztonsági megvalósítás**: Kövesse az aktuális OAuth biztonsági legjobb gyakorlatokat, beleértve a PKCE-t (Proof Key for Code Exchange) minden engedélyezési kérésnél
- **Szigorú kliens validáció**: Vezesse be az átirányítási URI-k és kliensazonosítók alapos ellenőrzését a kihasználások megelőzése érdekében

### Token átvivő sérülékenységek  

A **token átvitel** kifejezett anti-patternt jelent, ahol az MCP szerverek ügyfél tokeneket fogadnak el megfelelő validáció nélkül, és továbbítják azokat a lefelé irányuló API-knak, megsértve az MCP engedélyezési specifikációkat.

#### **Biztonsági következmények**

- **Kontroll megkerülés**: Az ügyféltől közvetlenül az API felé irányított tokenhasználat megkerüli a kritikus korlátozásokat, validációt és monitorozást
- **Ellenőrzési napló sérülése**: A felülről kiadott tokenek lehetetlenné teszik az ügyfél azonosítását, megszakítva az incidensvizsgálati képességeket
- **Proxy alapú adatkinyerés**: A nem validált tokenek lehetővé teszik a rosszindulatú szereplők számára, hogy szervereket használjanak jogosulatlan adathozzáféréshez proxyként
- **Bizalomhatár megsértések**: A lefelé irányuló szolgáltatások bizalmi feltételezései sérülhetnek, amikor a tokenek eredete nem ellenőrizhető
- **Többszolgáltatós támadás kiterjedés**: Több szolgáltatásban elfogadott kompromittált tokenek oldalirányú mozgást tesznek lehetővé

#### **Követelt biztonsági vezérlések**

**Vitatkozás nélküli követelmények:**
- **Token validáció**: Az MCP szerverek **NEM FOGADHATNAK EL** tokeneket, amelyeket nem kifejezetten az MCP szerver számára bocsátottak ki
- **Közönség ellenőrzés**: Mindig ellenőrizze, hogy a token közönség állítása megegyezzen az MCP szerver azonosítójával
- **Megfelelő token életciklus**: Rövid életű hozzáférési tokenek és biztonságos forgatási gyakorlatok alkalmazása


## Ellátási lánc biztonság MI rendszerek számára

Az ellátási lánc biztonsága túlmutat a hagyományos szoftverfüggőségeken, és átfogja az egész MI ökoszisztémát. A modern MCP megvalósításoknak szigorúan ellenőrizniük és figyelniük kell minden MI-vel kapcsolatos komponenst, mivel mindegyik potenciális sérülékenységeket hordozhat, amelyek veszélyeztethetik a rendszer integritását.

### Kibővített MI ellátási lánc komponensek

**Hagyományos szoftverfüggőségek:**
- Nyílt forráskódú könyvtárak és keretrendszerek
- Konténer képek és alap rendszerek
- Fejlesztői eszközök és build pipeline-ok
- Infrastruktúra komponensek és szolgáltatások

**MI-specifikus ellátási lánc elemek:**
- **Alap modellek**: Előre betanított modellek különböző szolgáltatóktól, előzetes eredetellenőrzéssel
- **Beágyazási szolgáltatások**: Külső vektorizációs és szemantikus kereső szolgáltatások
- **Kontextus szolgáltatók**: Adatforrások, tudásbázisok és dokumentumtárak
- **Harmadik féltől származó API-k**: Külső MI szolgáltatások, ML pipeline-ok és adatfeldolgozó végpontok
- **Modell artefaktumok**: Súlyok, konfigurációk és finomhangolt modellvariánsok
- **Képzési adatforrások**: Modellek betanítására és finomhangolására használt adathalmazok

### Átfogó ellátási lánc biztonsági stratégia

#### **Komponens ellenőrzés és bizalom**
- **Eredetellenőrzés**: Ellenőrizze az összes MI komponens eredetét, licencelését és sértetlenségét a beépítés előtt
- **Biztonsági értékelés**: Sérülékenység vizsgálatok és biztonsági áttekintések végrehajtása modellek, adatforrások és MI szolgáltatások esetén
- **Hírnév elemzés**: Értékelje az MI szolgáltató biztonsági múltját és gyakorlatát
- **Megfelelőség ellenőrzése**: Biztosítsa, hogy minden komponens megfeleljen a szervezeti biztonsági és szabályozási követelményeknek

#### **Biztonságos telepítési pipeline-ok**  
- **Automatizált CI/CD biztonság**: Biztonsági szkennelés integrálása a teljes automatizált telepítési pipeline-ban
- **Artefaktum sértetlenség**: Kriptográfiai ellenőrzés végrehajtása minden telepített artefaktumon (kód, modellek, konfigurációk)
- **Fokozatos telepítés**: Fokozatos telepítési stratégiák használata biztonsági ellenőrzéssel minden fázisban
- **Megbízható artefaktum-tárolók**: Csak megerősített, biztonságos artefaktum registry-kből és tárolókból telepítés

#### **Folyamatos megfigyelés és reagálás**
- **Függőség szkennelés**: Folyamatos sérülékenységfigyelés minden szoftver és MI komponens függőség esetén
- **Modell megfigyelés**: Folyamatos értékelés a modell viselkedéséről, teljesítményeltérésről és biztonsági anomáliákról
- **Szolgáltatás egészség követés**: Külső MI szolgáltatások elérhetőségének, biztonsági incidenseknek és szabályzati változások figyelése
- **Fenyegetés intelligencia integráció**: MI és ML biztonsági kockázatokra specifikus fenyegetés folyamatok használata

#### **Hozzáférés-vezérlés és legkisebb jogosultság elve**
- **Komponens szintű jogosultságok**: Hozzáférés korlátozása a modellekhez, adatokhoz és szolgáltatásokhoz üzleti szükséglet szerint
- **Szolgáltatás fiók menedzsment**: Dedikált szolgáltatás fiókok implementálása minimális szükséges jogosultságokkal
- **Hálózati szeparáció**: MI komponensek izolálása és hálózati hozzáférések korlátozása szolgáltatások között
- **API átjáró vezérlések**: Központosított API átjárók használata a külső MI szolgáltatások elérésének szabályozására és monitorozására

#### **Incidensreagálás és helyreállítás**
- **Gyors reagálási eljárások**: Megsértett MI komponensek javítására vagy cseréjére kialakított folyamatok
- **Hitelesítő forgatás**: Automatikus titkos adat, API kulcs és szolgáltatási hitelesítő forgatás rendszerek
- **Visszagörgetési képességek**: Képes gyorsan visszatérni MI komponensek korábbi, ismert jó állapotára
- **Ellátási lánc megsértés helyreállítás**: Speciális eljárások a felülről jövő MI szolgáltatás kompromittálásaira reagáláshoz

### Microsoft biztonsági eszközök és integráció

A **GitHub Advanced Security** átfogó ellátási lánc védelmet nyújt, beleértve:
- **Titokkeresés**: Automatikus hitelesítő adatok, API kulcsok és tokenek észlelése a tárolókban
- **Függőség szkennelés**: Sérülékenység értékelés nyílt forráskódú függőségekre és könyvtárakra
- **CodeQL elemzés**: Statikus kód elemzés biztonsági sérülékenységek és kódolási problémák feltárására
- **Ellátási lánc áttekintés**: Láthatóság a függőségek egészségére és biztonsági állapotára

**Azure DevOps és Azure Repos integráció:**
- Zökkenőmentes biztonsági szkennelés integráció a Microsoft fejlesztési platformokon
- Automatizált biztonsági ellenőrzések az Azure Pipelines-ben MI munkaterhelésekhez
- Politikai érvényesítés az MI komponensek biztonságos telepítéséhez

**Microsoft belső gyakorlatok:**
A Microsoft átfogó ellátási lánc biztonsági gyakorlatokat alkalmaz minden termékében. Tudjon meg többet a bevált megközelítésekről: [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Alapvető biztonsági legjobb gyakorlatok

Az MCP megvalósítások az Ön szervezetének meglévő biztonsági helyzetére épülnek és azt fejlesztik tovább. Az alapvető biztonsági gyakorlatok megerősítése jelentősen növeli az MI rendszerek és MCP telepítések általános biztonságát.

### Alapvető biztonsági alapelvek

#### **Biztonságos fejlesztési gyakorlatok**
- **OWASP megfelelés**: Védelem az [OWASP Top 10](https://owasp.org/www-project-top-ten/) webalkalmazás sérülékenységekkel szemben
- **MI-specifikus védelem**: Védelmi intézkedések bevezetése az [OWASP Top 10 LLM-ekre](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Biztonságos titokkezelés**: Dedikált tárolók használata tokenek, API kulcsok és érzékeny konfigurációs adatok tárolására
- **Végpontok közti titkosítás**: Biztonságos kommunikáció bevezetése az összes alkalmazás komponens és adatfolyam között
- **Bemeneti érvényesítés**: Rigórus érvényesítés minden felhasználói bemenet, API paraméter és adatforrás esetén

#### **Infrastruktúra megerősítés**
- **Többtényezős hitelesítés**: Kötelező MFA minden adminisztratív és szolgáltatás fiókhoz
- **Javítási folyamatok**: Automatizált, időben történő javítás operációs rendszerek, keretek és függőségek esetén
- **Azonosító szolgáltató integráció**: Központosított identitáskezelés vállalati identitás szolgáltatókon keresztül (Microsoft Entra ID, Active Directory)
- **Hálózati szeparáció**: MCP komponensek logikai izolálása az oldalirányú mozgás lehetőségének korlátozására
- **Legkisebb jogosultság elve**: Minimálisan szükséges jogosultságok biztosítása minden rendszerkomponens és fiók számára

#### **Biztonsági naplózás és észlelés**
- **Átfogó naplózás**: Részletes naplózás az MI alkalmazási tevékenységekről, beleértve az MCP kliens-szerver interakciókat
- **SIEM integráció**: Központosított biztonsági információ- és eseménymenedzsment az anomáliák felismerésére
- **Viselkedéselemzés**: MI alapú monitorozás a rendellenes rendszer- és felhasználói viselkedés észlelésére
- **Fenyegetés intelligencia**: Külső fenyegetés források és kompromittálódási jelek (IOC) integrálása
- **Incidens kezelés**: Kidolgozott eljárások biztonsági incidensek felismerésére, reagálásra és helyreállításra

#### **Zero Trust architektúra**
- **Sose bízz meg, mindig ellenőrizz**: Folyamatos felhasználói, eszköz és hálózati kapcsolat ellenőrzés
- **Mikroszeparáció**: Granuláris hálózati vezérlés, amely izolálja az egyes munkaterheléseket és szolgáltatásokat
- **Identitás-központú biztonság**: Olyan biztonsági szabályzatok, amelyek ellenőrzött identitásokra, nem pedig hálózati helyre épülnek
- **Folyamatos kockázatértékelés**: Dinamikus biztonsági helyzet értékelés a jelenlegi kontextus és viselkedés alapján
- **Feltételes hozzáférés**: Olyan hozzáférési vezérlések, amelyek alkalmazkodnak a kockázati tényezők, hely és eszköz megbízhatósága szerint

### Vállalati integrációs minták

#### **Microsoft biztonsági ökoszisztéma integráció**
- **Microsoft Defender for Cloud**: Átfogó felhő biztonsági helyzet menedzsment
- **Azure Sentinel**: Felhő-alapú SIEM és SOAR képességek MI munkaterhelések védelmére
- **Microsoft Entra ID**: Vállalati identitás- és hozzáférés menedzsment feltételes hozzáférési szabályokkal
- **Azure Key Vault**: Központosított titokkezelés hardveres biztonsági modul (HSM) támogatással
- **Microsoft Purview**: Adatkezelés és megfelelőség MI adatforrások és munkafolyamatok esetén

#### **Megfelelőség és irányítás**
- **Szabályozói összhang**: Biztosítsa, hogy az MCP megvalósítások megfeleljenek az iparági specifikus megfelelőségi követelményeknek (GDPR, HIPAA, SOC 2)

- **Adatosztályozás**: A mesterséges intelligencia rendszerek által feldolgozott érzékeny adatok megfelelő kategorizálása és kezelése
- **Auditálási Naplók**: Átfogó naplózás a szabályozási megfelelőség és a nyomozati vizsgálatok érdekében
- **Adatvédelmi Szabályozások**: A privacy-by-design elvek megvalósítása az MI rendszer architektúrájában
- **Változáskezelés**: Formális folyamatok az MI rendszer módosításainak biztonsági felülvizsgálatához

Ezek az alapvető gyakorlatok egy robusztus biztonsági alapot hoznak létre, amely növeli az MCP-specifikus biztonsági szabályozások hatékonyságát és átfogó védelmet nyújt az MI-alapú alkalmazások számára.

## Főbb biztonsági tanulságok

- **Többrétegű Biztonsági Megközelítés**: Kombinálja az alapvető biztonsági gyakorlatokat (biztonságos kódolás, legkisebb jogosultság, ellátási lánc ellenőrzés, folyamatos megfigyelés) MI-specifikus szabályozásokkal a teljes körű védelem érdekében

- **MI-specifikus Fenyegetési Környezet**: Az MCP rendszerek egyedi kockázatokkal szembesülnek, többek között prompt injection, eszközmérgezés, munkamenet eltérítés, confused deputy problémák, token átengedési sebezhetőségek és túlzott jogosultságok, amelyek speciális enyhítéseket igényelnek

- **Hitelesítés és Jogosultságkezelés Kiválósága**: Erős hitelesítés megvalósítása külső azonosító szolgáltatókkal (Microsoft Entra ID), megfelelő token validálás kikényszerítése, és soha ne fogadjon el olyan tokeneket, amelyeket nem kifejezetten az Ön MCP szervere számára bocsátottak ki

- **MI-támadások Megelőzése**: Microsoft Prompt Shields és Azure Content Safety alkalmazása a közvetett prompt injection és eszközmérgező támadások elleni védelem érdekében, miközben a eszköz metaadatokat validálja és figyeli a dinamikus változásokat

- **Munkamenet és Átvitel Biztonság**: Kriptográfiailag biztonságos, nem determinisztikus, felhasználói identitásokhoz kötött munkamenet azonosítók használata, megfelelő munkamenet életciklus-kezelés megvalósítása, és munkamenetek soha ne használata hitelesítésre

- **OAuth Biztonsági Legjobb Gyakorlatok**: Confused deputy támadások megelőzése kifejezett felhasználói hozzájárulással dinamikusan regisztrált kliensek esetén, helyes OAuth 2.1 implementáció PKCE-vel, és szigorú redirect URI validáció  

- **Token Biztonsági Elvek**: Token átengedési anti-minták elkerülése, token audience claim-ek validálása, rövid életidejű tokenek biztonságos forgatással történő megvalósítása, és világos bizalmi határok fenntartása

- **Átfogó Ellátási Lánc Biztonság**: Az MI ökoszisztéma összes komponensét (modellek, beágyazások, kontextus szolgáltatók, külső API-k) ugyanolyan szigorral kezelje, mint a hagyományos szoftver függőségeket

- **Folyamatos Fejlődés**: Maradjon naprakész a gyorsan fejlődő MCP specifikációkkal, járuljon hozzá a biztonsági közösségi szabványokhoz, és tartson fenn adaptív biztonsági álláspontokat a protokoll érésével

- **Microsoft Biztonsági Integráció**: Használja ki a Microsoft átfogó biztonsági ökoszisztémáját (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) az MCP telepítések fokozott védelméért

## Átfogó Források

### **Hivatalos MCP Biztonsági Dokumentáció**
- [MCP Specificáció (aktuális: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Biztonsági Legjobb Gyakorlatok](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Jogosultság-specifikáció](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Tároló](https://github.com/modelcontextprotocol)

### **OWASP MCP Biztonsági Források**
- [OWASP MCP Azure Biztonsági Útmutató](https://microsoft.github.io/mcp-azure-security-guide/) - Átfogó OWASP MCP Top 10 Azure megvalósítási útmutatóval
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hivatalos OWASP MCP biztonsági kockázatok
- [MCP Biztonsági Csúcstalálkozó Műhelymunka (Sherpa)](https://azure-samples.github.io/sherpa/) - Gyakorlati biztonsági tréning MCP-hez Azure-on

### **Biztonsági Szabványok és Legjobb Gyakorlatok**
- [OAuth 2.0 Biztonsági Legjobb Gyakorlatok (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Webalkalmazás Biztonság](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 Nagyméretű Nyelvi Modellekhez](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digitális Védelem Jelentés](https://aka.ms/mddr)

### **MI Biztonsági Kutatás és Elemzés**
- [Prompt Injection az MCP-ben (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Eszközmérgező Támadások (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Biztonsági Kutatási Tájékoztató (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Biztonsági Megoldások**
- [Microsoft Prompt Shields Dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Szolgáltatás](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Biztonság](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Tokenkezelési Legjobb Gyakorlatok](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Megvalósítási Útmutatók és Oktatóanyagok**
- [Azure API Management mint MCP Hitelesítési Kapu](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Hitelesítés MCP Szerverekhez](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Biztonságos Token Tárolás és Titkosítás (videó)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps és Ellátási Lánc Biztonság**
- [Azure DevOps Biztonság](https://azure.microsoft.com/products/devops)
- [Azure Repos Biztonság](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Ellátási Lánc Biztonsági Útja](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **További Biztonsági Dokumentáció**

Átfogó biztonsági útmutatóért tekintse meg a szakasz ezen speciális dokumentumait:

- **[MCP Biztonsági Legjobb Gyakorlatok 2025](./mcp-security-best-practices-2025.md)** - Teljes körű biztonsági legjobb gyakorlatok MCP implementációkhoz
- **[Azure Content Safety Megvalósítás](./azure-content-safety-implementation.md)** - Gyakorlati példák az Azure Content Safety integrációra  
- **[MCP Biztonsági Szabályozások 2025](./mcp-security-controls-2025.md)** - Friss biztonsági szabályozások és technikák MCP telepítésekhez
- **[MCP Legjobb Gyakorlatok Gyorsreferencia](./mcp-best-practices.md)** - Gyorsreferencia az alapvető MCP biztonsági gyakorlatokhoz
- **[BlueHat 2026: Az MI jövőjének biztosítása: Az MCP többrétegű védelme](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Többrétegű védelemminták a Microsoft Security Response Center (MSRC) jóvoltából

### **Gyakorlati Biztonsági Képzés**

- **[MCP Biztonsági Csúcstalálkozó Műhelymunka (Sherpa)](https://azure-samples.github.io/sherpa/)** - Átfogó, gyakorlati műhelymunka az MCP szerverek biztonságának növelésére Azure-on, az alapozó tábortól a csúcstalálkozóig terjedő szintekkel
- **[OWASP MCP Azure Biztonsági Útmutató](https://microsoft.github.io/mcp-azure-security-guide/)** - Referencia architektúra és megvalósítási útmutató az összes OWASP MCP Top 10 kockázathoz

---

## Mi következik

Következő: [3. fejezet: Kezdő lépések](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->