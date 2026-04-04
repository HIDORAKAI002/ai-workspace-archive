# MCP Biztonság: Átfogó védelem az MI rendszerek számára

[![MCP Security Best Practices](../../../translated_images/hu/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(A fenti képre kattintva megtekintheti a lecke videóját)_

A biztonság alapvető az MI rendszerek tervezésében, ezért helyezzük második részünk fókuszába. Ez összhangban áll a Microsoft **Secure by Design** elvével a [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) programból.

A Model Context Protocol (MCP) erőteljes új képességeket hoz az MI-alapú alkalmazások számára, miközben egyedi biztonsági kihívásokat is feltár, amelyek túlmutatnak a hagyományos szoftverkockázatokon. Az MCP rendszerek szembesülnek mind a jól ismert biztonsági kihívásokkal (biztonságos kódolás, legkisebb jogosultság, ellátási lánc biztonság), mind új, MI-specifikus fenyegetésekkel, mint például a prompt beszúrás, eszközmérgezés, munkamenet eltérítés, confused deputy támadások, token átvitel sebezhetőségek és dinamikus képesség módosítások.

Ez a lecke az MCP megvalósítások legkritikusabb biztonsági kockázatait vizsgálja – beleértve a hitelesítést, jogosultságkezelést, túlzott engedélyeket, közvetett prompt beszúrást, munkamenet biztonságot, confused deputy problémákat, token kezelést és ellátási lánc sebezhetőségeket. Megtanulhatja az alkalmazható kontrollokat és bevált gyakorlatokat a kockázatok csökkentésére, miközben kihasználja a Microsoft megoldásait, például a Prompt Shields-t, az Azure Content Safety-t és a GitHub Advanced Security-t az MCP telepítés védelmére.

## Tanulási célok

A lecke végére képes lesz:

- **MCP-specifikus fenyegetések felismerése**: Azonosítani az MCP rendszerek egyedi biztonsági kockázatait, beleértve a prompt beszúrást, eszközmérgezést, túlzott jogosultságokat, munkamenet eltérítést, confused deputy problémákat, token átvitel sebezhetőségeket és ellátási lánc kockázatokat
- **Biztonsági kontrollok alkalmazása**: Hatékony enyhítő intézkedéseket bevezetni, beleértve a megbízható hitelesítést, legkisebb jogosultság elvét, biztonságos token kezelést, munkamenet biztonsági kontrollokat és ellátási lánc igazolást
- **Microsoft biztonsági megoldások alkalmazása**: Megérteni és bevezetni a Microsoft Prompt Shields-t, Azure Content Safety-t és GitHub Advanced Security-t az MCP terhelésvédelemhez
- **Eszköz biztonság érvényesítése**: Felismerni az eszköz metaadat érvényesítésének fontosságát, a dinamikus változások nyomon követését és a közvetett prompt beszúrás elleni védelmet
- **Bevált gyakorlatok integrálása**: Összekapcsolni a jól bevált biztonsági alapelveket (biztonságos kódolás, szerverkeményítés, zero trust) az MCP-specifikus kontrollokkal az átfogó védelem érdekében

# MCP biztonsági architektúra és kontrollok

A modern MCP megvalósítások rétegzett biztonsági megközelítést igényelnek, amelyek azonosítják mind a hagyományos szoftverbiztonsági, mind az MI-specifikus fenyegetéseket. Az MCP specifikáció gyorsan fejlődik, és folyamatosan fejleszti a biztonsági kontrollokat, lehetővé téve a jobb integrációt a vállalati biztonsági architektúrákba és az elfogadott bevált gyakorlatokba.

A [Microsoft Digital Defense Report](https://aka.ms/mddr) kutatásai megmutatják, hogy a **jelentett biztonsági incidensek 98%-a megelőzhető robusztus biztonsági higiénia alkalmazásával**. A leghatékonyabb védekezési stratégia kombinálja az alapvető biztonsági gyakorlatokat az MCP-specifikus kontrollokkal – a bevált alapbiztonsági intézkedések továbbra is a legnagyobb hatással vannak a teljes biztonsági kockázat csökkentésében.

## Jelenlegi biztonsági helyzet

> **Megjegyzés:** Ez az információ az MCP biztonsági szabványokat tükrözi **2026. február 5-én**, összhangban az **MCP Specification 2025-11-25** verzióval. Az MCP protokoll folyamatosan fejlődik, és a jövőbeli megvalósítások új hitelesítési mintákat és fejlettebb kontrollokat hozhatnak. Mindig hivatkozzon a legfrissebb [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) és [biztonsági bevált gyakorlatok dokumentáció](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) anyagokra.

## 🏔️ MCP Security Summit Workshop (Sherpa)

**Gyakorlati biztonsági képzéshez** erősen ajánljuk az **MCP Security Summit Workshop**-ot (Sherpa) – egy átfogó, vezetett expedíciót az MCP szerverek Microsoft Azure-ban történő biztonságos üzemeltetéséhez.

### Workshop áttekintése

Az [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) gyakorlati, azonnal alkalmazható biztonsági képzést nyújt egy bevált "sebezhetőség → kihasználás → javítás → ellenőrzés" módszertan alapján. Ön:

- **Törések által tanulhat**: Közvetlenül tapasztalhatja a sebezhetőségeket szándékosan sebezhető szerverek kihasználásával
- **Azure natív biztonsági eszközöket használhat**: Azure Entra ID, Key Vault, API Management és AI Content Safety alkalmazása
- **Mélységi védekezést követhet**: Lépésenként építhet átfogó biztonsági rétegeket
- **OWASP szabványok szerint dolgozhat**: Minden technika megfelel az [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) útmutatásainak
- **Éles, tesztelt kódot kap**: Működő, kipróbált implementációkat sajátíthat el

### Az expedíció útvonala

| Tábor | Fókusz | Lefedett OWASP kockázatok |
|-------|--------|--------------------------|
| **Alaptábor** | MCP alapok és hitelesítési sebezhetőségek | MCP01, MCP07 |
| **1. tábor: Identitás** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **2. tábor: Átjáró** | API Management, Private Endpoints, kormányzás | MCP02, MCP07, MCP09 |
| **3. tábor: I/O biztonság** | Prompt beszúrás, PII védelem, tartalombiztonság | MCP03, MCP05, MCP06 |
| **4. tábor: Monitoring** | Log Analytics, irányítópultok, fenyegetésészlelés | MCP08 |
| **Csúcs** | Red Team / Blue Team integrációs teszt | Mind |

**Kezdje el itt**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Biztonsági Kockázat

Az [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) az MCP megvalósítás legfontosabb tíz biztonsági kockázatát részletezi:

| Kockázat | Leírás | Azure-en Mitigáció |
|----------|--------|---------------------|
| **MCP01** | Token kezelési hibák és titkos adatok kiszivárgása | Azure Key Vault, Managed Identity |
| **MCP02** | Jogosultságok túlfejlesztése (Scope Creep) | RBAC, Feltételes hozzáférés |
| **MCP03** | Eszközmérgezés | Eszköz validáció, integritásellenőrzés |
| **MCP04** | Ellátási lánc támadások | GitHub Advanced Security, függőségvizsgálat |
| **MCP05** | Parancs beszúrás és végrehajtás | Bemenet validáció, sandboxing |
| **MCP06** | Prompt beszúrás kontextuális terhelésekkel | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nem megfelelő hitelesítés és jogosultságkezelés | Azure Entra ID, OAuth 2.1 PKCE-vel |
| **MCP08** | Audit és telemetria hiánya | Azure Monitor, Application Insights |
| **MCP09** | Árnyék MCP szerverek | API Center kormányzás, hálózati izoláció |
| **MCP10** | Kontextus beszúrás és túlzott megosztás | Adatosztályozás, minimális kitettség |

### Az MCP hitelesítés fejlődése

Az MCP specifikáció jelentősen fejlődött a hitelesítés és jogosultságkezelés terén:

- **Eredeti megközelítés**: Korai szabványoknál a fejlesztőknek saját hitelesítő szervert kellett készíteniük, MCP szerverek pedig OAuth 2.0 engedélyező szerverként működtek, kezelve a felhasználói hitelesítést közvetlenül
- **Jelenlegi szabvány (2025-11-25)**: Frissített szabvány lehetővé teszi, hogy az MCP szerverek delegálják a hitelesítést külső identitásszolgáltatóknak (például Microsoft Entra ID), javítva a biztonságot és csökkentve a megvalósítás összetettségét
- **Transport Layer Security**: Továbbfejlesztett támogatás biztonságos átvitelhez helyi (STDIO) és távoli (Streamable HTTP) kapcsolatoknál

## Hitelesítés és jogosultságkezelés biztonsága

### Jelenlegi biztonsági kihívások

A modern MCP megvalósítások számos hitelesítési és jogosultságkezelési kihívással néznek szembe:

### Kockázatok és fenyegetési vektorok

- **Helytelen jogosultság logika**: Hibás jogosultságkezelési implementációk az MCP szervereken érzékeny adatok kiszivárgásához és helytelen hozzáféréshez vezethetnek
- **OAuth token kompromittálás**: Helyi MCP szerver tokenjeinek ellopása lehetővé teszi a támadók számára a szerver hamisítását és downstream szolgáltatásokhoz való hozzáférést
- **Token átviteli sebezhetőségek**: Helytelen token kezelés biztonsági intézkedések megkerülését és elszámoltathatósági hézagokat eredményez
- **Túlzott jogosultságok**: Túljogosított MCP szerverek megszegik a legkisebb jogosultság elvét és növelik a támadási felületet

#### Token átviteli anti-minta

A **token átvitelt kifejezetten tiltja** a jelenlegi MCP jogosultságkezelési szabvány súlyos biztonsági következményei miatt:

##### Biztonsági kontroll megkerülés  
- Az MCP szerverek és downstream API-k kritikus biztonsági kontrollokat (pl. rate limiting, kérés validáció, forgalomfigyelés) valósítanak meg, amelyek a helyes token ellenőrzésen alapulnak  
- Az ügyfélről API-ra történő közvetlen token használat megkerüli ezeket a védelmeket, gyengítve a biztonsági architektúrát  

##### Elsztárolhatóság és auditálási nehézségek  
- MCP szerverek nem képesek megkülönböztetni, hogy a tokent mely kliens használja, így az audit nyomvonalak megszakadnak  
- A downstream erőforrás szerverek naplóiban téves eredeti kérésforrás jelenik meg, nem az MCP szerver közvetítő  
- Incidenskezelés és megfelelőség ellenőrzés jelentősen bonyolultabbá válik  

##### Adatkiszivárgás kockázata  
- Nem érvényesített token állítások lehetővé teszik rosszindulatú szereplők számára, hogy ellopott tokenekkel az MCP szervereket proxyként használják adatkiszivárgásra  
- A bizalmi határok sérülnek, illetéktelen hozzáférési minták alakulnak ki, megkerülve a szándékolt védelmeket  

##### Több-szolgáltatásos támadási vektorok  
- Kompromittált tokenek több szolgáltatás általi elfogadása oldalon történő mozgási lehetőséget biztosít  
- A szolgáltatások közötti bizalmi feltételezések sérülhetnek, ha nem ellenőrizhető a token eredete  

### Biztonsági kontrollok és enyhítések

**Kritikus biztonsági követelmény:**

> **KÖTELEZŐ**: Az MCP szerverek **NEM FOGADHATNAK EL** olyan tokeneket, amelyeket nem kifejezetten az adott MCP szerver számára bocsátottak ki

#### Hitelesítési és jogosultságkezelési kontrollok

- **Alapos jogosultság felülvizsgálat**: Átfogó audit az MCP szerver jogosultságkezelésén, hogy csak a szándékolt felhasználók és kliensek férjenek hozzá érzékeny erőforrásokhoz  
  - **Implementációs útmutató**: [Azure API Management mint hitelesítési átjáró MCP szerverekhez](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Identitás integráció**: [Microsoft Entra ID használata MCP szerver hitelesítéshez](https://den.dev/blog/mcp-server-auth-entra-id-session/)  

- **Biztonságos token kezelés**: [Microsoft token validáció és életciklus legjobb gyakorlatok](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) alkalmazása  
  - A token audience claim-ek érvényesítése az MCP szerver identitásával  
  - Megfelelő token forgatás és lejárati szabályzat bevezetése  
  - Token replay támadások és jogosulatlan használat megakadályozása  

- **Védett token tárolás**: Tokenek titkosított tárolása nyugalmi és átvitel közbeni állapotban  
  - **Bevált gyakorlatok**: [Biztonságos token tárolás és titkosítási irányelvek](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

#### Hozzáférés szabályozás megvalósítása

- **Legkisebb jogosultság elve**: MCP szervereknek csak a funkcióhoz szükséges minimális jogosultságok biztosítása  
  - Rendszeres jogosultság-felülvizsgálat és frissítés a jogosultság túllépés megelőzésére  
  - **Microsoft dokumentáció**: [Biztonságos legkisebb jogosultságú hozzáférés](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  

- **Szerepkör alapú hozzáférés-vezérlés (RBAC)**: Finomhangolt szerepkör hozzárendelések alkalmazása  
  - A szerepkörök szűk meghatározása konkrét erőforrásokra és műveletekre  
  - Kerülni a széles vagy nem szükséges jogosultságokat, melyek növelik a támadási felületet  

- **Folyamatos jogosultság monitorozás**: Hozzáférés folyamatos auditálása és monitorozása  
  - Jogosultság használati minták figyelése rendellenességek után  
  - Túlzott vagy nem használt jogosultságok gyors felülvizsgálata és megszüntetése  

## AI-specifikus biztonsági fenyegetések

### Prompt beszúrás és eszköz manipulációs támadások

A modern MCP megvalósítások kifinomult MI-specifikus támadási vektorokkal szembesülnek, melyeket a hagyományos biztonsági intézkedések nem képesek teljes mértékben kezelni:

#### **Közvetett prompt beszúrás (tárgyterület közötti prompt beszúrás)**

A **közvetett prompt beszúrás** az MCP-t támogató MI rendszerek egyik legkritikusabb sebezhetősége. A támadók rosszindulatú utasításokat rejtenek el külső tartalmakban – dokumentumokban, weboldalakon, e-mailekben vagy adatforrásokban –, amelyeket az MI rendszerek később legitim parancsként dolgoznak fel.

**Támadási forgatókönyvek:**  
- **Dokumentum alapú beszúrás**: Rosszindulatú utasítások elrejtve feldolgozott dokumentumokban, amelyek nem kívánt MI műveletet idéznek elő  
- **Webtartalom kihasználása**: Megfertőzött weboldalak beágyazott promptokkal, amelyek manipulálják az MI viselkedését, amikor lekérdezésre kerülnek  
- **E-mail alapú támadások**: Rosszindulatú promptok e-mailekben, amelyek MI asszisztenseket adatszivárgásra vagy jogosulatlan műveletekre késztetnek  
- **Adatforrás szennyezés**: Megfertőzött adatbázisok vagy API-k, amelyek megkárosított tartalmat szolgáltatnak az MI rendszereknek  

**Valós hatás**: Ezek a támadások adat kiszivárgáshoz, adatvédelem megsértéséhez, káros tartalom generálásához és a felhasználói interakciók manipulálásához vezethetnek. Részletes elemzésért lásd: [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/hu/prompt-injection.ed9fbfde297ca877.webp)

#### **Eszközmérgezéses támadások**

Az **eszközmérgezés** az MCP eszközöket definiáló metaadatokat célozza meg, kihasználva, hogy a nagyméretű nyelvi modellek hogyan értelmezik az eszközök leírásait és paramétereit a végrehajtási döntésekhez.

**Támadási mechanizmusok:**  
- **Metaadat manipuláció**: Támadók rosszindulatú utasításokat injektálnak az eszközleírásokba, paraméterdefiníciókba vagy használati példákba  
- **Láthatatlan utasítások**: Rejtett promptok az eszköz metaadataiban, amelyeket az MI modellek feldolgoznak, de a felhasználók nem látnak  
- **Dinamikus eszköz módosítás ("Rug Pulls")**: Felhasználók által jóváhagyott eszközök később rosszindulatúvá változtathatók anélkül, hogy a felhasználók tudnának róla  
- **Paraméter beszúrás**: Rosszindulatú tartalom ágyazása az eszköz paramétersémákba, amely befolyásolja a modell viselkedését  

**Felügyelt szerverek kockázatai:** Távoli MCP szerverek nagyobb kockázatot hordoznak, mert az eszközdefiníciók a felhasználói jóváhagyás után módosíthatók, így korábban biztonságos eszközök rosszindulatúvá válhatnak. Átfogó elemzésért lásd: [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/hu/tool-injection.3b0b4a6b24de6bef.webp)

#### **További MI támadási vektorok**

- **Tárgyterület közötti prompt beszúrás (XPIA)**: Kifinomult támadások, amelyek több domain tartalmát használják fel a biztonsági kontrollok megkerülésére
- **Dinamikus képességmódosítás**: Eszközképességek valós idejű változtatása, amely megkerüli a kezdeti biztonsági értékeléseket
- **Kontextusablak mérgezés**: Olyan támadások, amelyek nagy kontextusablakokat manipulálnak, hogy elrejtsék a rosszindulatú utasításokat
- **Modellzavaró támadások**: A modell korlátainak kihasználása kiszámíthatatlan vagy nem biztonságos viselkedések létrehozására


### Mesterséges intelligencia biztonsági kockázatának hatása

**Magas hatású következmények:**
- **Adatszivárgás**: Jogosulatlan hozzáférés és érzékeny vállalati vagy személyes adatok eltulajdonítása
- **Adatvédelmi szivárgások**: Személyesen azonosítható információk (PII) és bizalmas üzleti adatok kiszivárgása  
- **Rendszermanipuláció**: Kritikus rendszerek és munkafolyamatok nem szándékolt módosítása
- **Hitelesítő adatok eltulajdonítása**: Hitelesítési tokenek és szolgáltatási hitelesítő adatok kompromittálása
- **Oldalirányú mozgás**: Kompromittált MI rendszerek hálózati támadások további térnyerésére történő felhasználása

### Microsoft MI biztonsági megoldások

#### **AI Prompt Shields: Fejlett védelem az injekciós támadások ellen**

A Microsoft **AI Prompt Shields** széleskörű védelmet nyújtanak közvetlen és közvetett prompt injekciós támadások ellen több biztonsági rétegen keresztül:

##### **Alapvédelmi mechanizmusok:**

1. **Fejlett észlelés és szűrés**
   - Gépi tanulási algoritmusok és NLP technikák a rosszindulatú utasítások felismerésére külső tartalmakban
   - Valós idejű elemzés dokumentumokon, weboldalakon, e-maileken és adatforrásokon beágyazott fenyegetésekért
   - Kontextuális megértés a jogos és rosszindulatú promptminták között

2. **Figyelemfelkeltő technikák**  
   - Megkülönbözteti a megbízható rendszerutasításokat és a potenciálisan kompromittált külső bemeneteket
   - Szövegátalakító módszerek, melyek növelik a modell relevanciáját, miközben elszigetelik a rosszindulatú tartalmat
   - Segíti az MI rendszereket az utasítási hierarchia megtartásában és az injektált parancsok figyelmen kívül hagyásában

3. **Elválasztó és adatjelölő rendszerek**
   - Egyértelmű határvonalak meghatározása a megbízható rendszerüzenetek és a külső bemeneti szöveg között
   - Különleges jelölők kiemelik a megbízható és nem megbízható adatforrások közti határokat
   - Egyértelmű szétválasztás megakadályozza az utasítások összekeveredését és a jogosulatlan parancsvégrehajtást

4. **Folyamatos fenyegetésintelligencia**
   - A Microsoft folyamatosan figyeli a felbukkanó támadási mintákat és frissíti a védelmeket
   - Proaktív fenyegetésvadászat új injekciós technikák és támadási vektorok után
   - Rendszeres biztonsági modellfrissítések a változó fenyegetések elleni hatékonyság fenntartására

5. **Azure Content Safety integráció**
   - Az Azure AI Content Safety teljes körű suite részét képezi
   - További észlelés jailbreak kísérletekre, káros tartalomra és biztonsági irányelvet megsértő esetekre
   - Egységes biztonsági vezérlés az MI alkalmazás komponensei között

**Megvalósítási források**: [Microsoft Prompt Shields dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/hu/prompt-shield.ff5b95be76e9c78c.webp)


## Fejlett MCP biztonsági fenyegetések

### Munkamenet-átszállás sebezhetőségek

A **munkamenet-átszállás** kritikus támadási vektor az állapotmegőrző MCP megvalósításoknál, amikor jogosulatlan felek megszerzik és visszaélnek jogos munkamenet-azonosítókkal, hogy klienseket megszemélyesítsenek és jogosulatlan műveleteket hajtsanak végre.

#### **Támadási forgatókönyvek és kockázatok**

- **Munkamenet-átszállásos prompt injekció**: Lopott munkamenet-azonosítóval rendelkező támadók rosszindulatú eseményeket injektálnak a munkamenet állapotát megosztó szerverekbe, ami káros műveleteket indíthat vagy érzékeny adatokhoz biztosíthat hozzáférést
- **Közvetlen megszemélyesítés**: Lopott munkamenet-azonosítók közvetlen MCP szerverhívásokat tesznek lehetővé hitelesítés megkerülésével, a támadókat jogos felhasználóként kezelve
- **Kompromittált folytatható adatfolyamok**: A támadók idő előtt megszakíthatják a kéréseket, így a jogos kliensek potenciálisan rosszindulatú tartalommal folytatják

#### **Munkamenet-kezelés biztonsági vezérlései**

**Kritikus követelmények:**
- **Engedélyezés ellenőrzése**: Az MCP szervereknek, amelyek engedélyezést valósítanak meg, **MINDEN** bejövő kérelmet ellenőrizniük kell, és **NEM** támaszkodhatnak a munkamenetekre hitelesítés során
- **Biztonságos munkamenet-generálás**: Kriptográfiailag biztonságos, nem determinisztikus munkamenet-azonosítók használata biztonságos véletlenszám-generátorokkal
- **Felhasználóhoz kötés**: A munkamenet-azonosítókat felhasználó specifikus adatokhoz kell kötni, például `<user_id>:<session_id>` formátumban, a felhasználók közötti munkamenet-visszaélések megakadályozására
- **Munkamenet életciklus kezelése**: Megfelelő lejárat, forgatás és érvénytelenítés végrehajtása a sérülékenységi ablakok korlátozására
- **Adatátvitel biztonsága**: Kötelező HTTPS minden kommunikációhoz a munkamenet-azonosítók elfogása elleni védelem érdekében

### Confused Deputy probléma

A **confused deputy** probléma akkor fordul elő, amikor az MCP szerverek hitelesítési proxyként működnek a kliensek és harmadik fél szolgáltatások között, lehetőséget teremtve az engedélyezés megkerülésére statikus kliensazonosító kihasználásával.

#### **Támadás mechanika és kockázatok**

- **Cookie alapú hozzájárulás megkerülése**: Korábbi felhasználó-hitelesítés hozzájárulási cookie-kat hoz létre, amelyeket a támadók rosszindulatú engedélyezési kérelmekben, előre megtervezett átirányító URI-kkal használnak ki
- **Engedélyezési kód lopás**: A meglévő hozzájárulási cookie-k miatt az engedélyező szerverek kihagyhatják a hozzájárulási képernyőket, és a kódokat a támadó által irányított végpontokra irányíthatják  
- **Jogosulatlan API-hozzáférés**: Ellopott engedélyezési kódok tokencserét tesznek lehetővé és felhasználó megszemélyesítést engedélyeznek explicit jóváhagyás nélkül

#### **Megelőző stratégiák**

**Kötelező vezérlések:**
- **Explicit hozzájárulás követelmények**: Az MCP proxy szerverek, amelyek statikus kliensazonosítókat használnak, **KÖTELESEK** minden dinamikusan regisztrált klienshez külön felhasználói hozzájárulást kérni
- **OAuth 2.1 biztonsági megvalósítás**: A jelenlegi OAuth biztonsági legjobb gyakorlatokat követni, beleértve a PKCE-t (Proof Key for Code Exchange) minden engedélyezési kérelemnél
- **Szigorú kliensvalidáció**: Átfogó validációt végezni az átirányító URI-król és kliensazonosítókról a kihasználás megakadályozására

### Token átengedési sebezhetőségek  

A **token átengedés** kifejezett anti-minta, amikor az MCP szerverek kliens tokeneket fogadnak el megfelelő validáció nélkül, és továbbítják azokat downstream API-khoz, megsértve ezzel az MCP engedélyezési előírásokat.

#### **Biztonsági következmények**

- **Vezérlés megkerülése**: Direkt kliens-API token használat megkerüli a kritikus sebességkorlátozást, validálást és megfigyelési vezérléseket
- **Audit nyomvonal korrupció**: Fölfelé kiadott tokenek lehetetlenné teszik a kliens azonosítását, megzavarva az incidensvizsgálatot
- **Proxy alapú adatszivárgás**: Érvénytelenített tokenek rosszindulatú szereplőknek adják meg a szerverek proxyként való használatát jogosulatlan adathozzáféréshez
- **Bizalmi határ megsértése**: Downstream szolgáltatások megbízási feltételei sérülhetnek, ha a token eredete nem ellenőrizhető
- **Többszolgáltatásos támadás kiterjesztés**: Kompromittált tokenek több szolgáltatáson történő elfogadása lehetővé teszi az oldalirányú mozgást

#### **Szükséges biztonsági vezérlések**

**Nem alku tárgya:**
- **Token validáció**: Az MCP szerverek **NEM** fogadhatnak el olyan tokeneket, amelyeket kifejezetten nem nekik adtak ki
- **Célközönség ellenőrzése**: Mindig ellenőrizni kell, hogy a token audience állítása megegyezik az MCP szerver azonosítójával
- **Megfelelő token életciklus**: Rövid életű hozzáférési tokenek használata biztonságos forgatási gyakorlatokkal


## Ellátási lánc biztonság MI rendszerekhez

Az ellátási lánc biztonság túlmutat a hagyományos szoftverfüggőségeken, és magába foglalja az egész MI ökoszisztémát. A modern MCP megvalósításoknak szigorúan ellenőrizniük és monitorozniuk kell az összes MI-vel kapcsolatos komponenst, mivel mindegyik potenciális sérülékenységeket hozhat létre, amelyek veszélyeztethetik a rendszer integritását.

### Kiterjesztett MI ellátási lánc komponensek

**Hagyományos szoftverfüggőségek:**
- Nyílt forráskódú könyvtárak és keretrendszerek
- Konténer image-ek és alaprendszerek  
- Fejlesztői eszközök és build pipeline-ok
- Infrastruktúra komponensek és szolgáltatások

**MI-specifikus ellátási lánc elemek:**
- **Alapmodellek**: Előre betanított modellek különböző szolgáltatóktól, amelyeket eredetiség-ellenőrzésnek kell alávetni
- **Embedding szolgáltatások**: Külső vektorizálási és szemantikus keresési szolgáltatások
- **Kontextus szolgáltatók**: Adatforrások, tudásbázisok és dokumentumtárak  
- **Harmadik féltől származó API-k**: Külső MI szolgáltatások, ML pipeline-ok és adatfeldolgozó végpontok
- **Modell artefaktumok**: Súlyok, konfigurációk és finomhangolt modellvariánsok
- **Képzési adatforrások**: A modellek tanításához és finomhangolásához használt adatállományok

### Átfogó ellátási lánc biztonsági stratégia

#### **Komponens-ellenőrzés és bizalom**
- **Eredet ellenőrzés**: Az MI komponensek eredetének, licencének és sértetlenségének ellenőrzése integráció előtt
- **Biztonsági értékelés**: Sérülékenységvizsgálatok és biztonsági áttekintések végrehajtása a modelleken, adatforrásokon és MI szolgáltatásokon
- **Hírnév elemzés**: Az MI szolgáltatók biztonsági múltjának és gyakorlatainak értékelése
- **Megfelelőség ellenőrzése**: Minden komponens megfelel a szervezeti biztonsági és szabályozási követelményeknek

#### **Biztonságos üzembe helyezési pipeline-ok**  
- **Automatizált CI/CD biztonság**: Biztonsági vizsgálatok integrálása az automatikus telepítési pipeline-okba
- **Artefaktum sértetlensége**: Kriptográfiai ellenőrzés minden telepített artefaktum (kód, modellek, konfigurációk) esetén
- **Fokozatos telepítés**: Progresszív telepítési stratégiák használata biztonsági ellenőrzésekkel minden lépésnél
- **Megbízható artefaktum-tárhelyek**: Csak ellenőrzött, biztonságos artefaktum-regiszterekből és tárakból telepítés

#### **Folyamatos monitorozás és válaszadás**
- **Függőségvizsgálat**: Folyamatos sérülékenységfigyelés minden szoftver- és MI komponens függőségre
- **Modell monitorozás**: A modell viselkedésének, teljesítményének eltolódásának és biztonsági anomáliáinak folyamatos értékelése
- **Szolgáltatás állapotkövetés**: Külső MI szolgáltatások elérhetőségének, biztonsági incidenseinek és irányelv változásainak monitorozása
- **Fenyegetés intelligencia integráció**: MI és ML biztonsági kockázatokra külön specifikus fenyegetés adatfolyamok bevonása

#### **Hozzáférés szabályozás & legkisebb jogosultság**
- **Komponens-szintű jogosultságok**: Hozzáférés korlátozása modellekhez, adatokhoz és szolgáltatásokhoz üzleti szükséglet alapján
- **Szolgáltatás fiók kezelés**: Dedikált szolgáltatásfiókok létrehozása minimálisan szükséges jogosultságokkal
- **Hálózati szegmentáció**: MI komponensek izolálása és szolgáltatások közti hálózati hozzáférés korlátozása
- **API gateway vezérlések**: Központosított API gateway-k használata a külső MI szolgáltatások hozzáférésének szabályozására és figyelésére

#### **Incidens válasz és helyreállítás**
- **Gyors válaszlépések**: Meglévő eljárások megalkotása kompromittált MI komponensek javítására vagy cseréjére
- **Hitelesítő adat forgatás**: Automatizált rendszerek titkok, API kulcsok és szolgáltatási hitelesítő adatok forgatására
- **Visszaállítási képességek**: Gyors visszatérés az előző, ismert jó MI komponens verziókra
- **Ellátási lánc megsértés helyreállítása**: Specifikus eljárások a feljebb lévő MI szolgáltatás komromittálásának kezelésére

### Microsoft biztonsági eszközök és integrációk

A **GitHub Advanced Security** átfogó ellátási lánc védelmet nyújt többek közt:
- **Titokfelderítés**: Automatikus hitelesítő adatok, API kulcsok és tokenek detektálása tárolókban
- **Függőségvizsgálat**: Sérülékenységértékelés nyílt forrású függőségek és könyvtárak esetén
- **CodeQL elemzés**: Statikus kódelemzés biztonsági sérülékenységek és kódolási hibák kimutatására
- **Ellátási lánc betekintés**: Láthatóság a függőségek egészségére és biztonsági állapotára

**Azure DevOps & Azure Repos integráció:**
- Zökkenőmentes biztonsági vizsgálatok integrálása Microsoft fejlesztői platformokon át
- Automatizált biztonsági ellenőrzések Azure Pipeline-okban MI feladatokra
- Biztonsági szabályzat érvényesítése biztonságos MI komponens telepítéshez

**Microsoft belső gyakorlatok:**
A Microsoft kiterjedt ellátási lánc biztonsági gyakorlatokat alkalmaz minden termékében. Ismerje meg a bevált megközelítéseket a [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Alapbiztonsági legjobb gyakorlatok

Az MCP megvalósítások átveszik és építik a szervezet meglévő biztonsági állapotát. Az alapvető biztonsági gyakorlatok megerősítése jelentősen javítja az MI rendszerek és MCP telepítések általános biztonságát.

### Alapbiztonsági alapelvek

#### **Biztonságos fejlesztési gyakorlatok**
- **OWASP megfelelés**: Védelem a [OWASP Top 10](https://owasp.org/www-project-top-ten/) webalkalmazás sérülékenységek ellen
- **MI-specifikus védelem**: Szabályok alkalmazása az [OWASP Top 10 LLM-ekre](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Biztonságos titokkezelés**: Dedikált tárolók a tokenek, API kulcsok és érzékeny konfigurációs adatok számára
- **Végpontok közti titkosítás**: Biztonságos kommunikáció minden alkalmazás komponens és adatfolyam között
- **Bemeneti validáció**: Szigorú érvényesítés minden felhasználói bemenetre, API paraméterre és adatforrásra

#### **Infrastruktúra megerősítése**
- **Többlépcsős hitelesítés**: Kötelező MFA minden adminisztratív és szolgáltatás fiókhoz
- **Patch kezelés**: Automatikus, időben történő javítások operációs rendszerekhez, keretrendszerekhez és függőségekhez  
- **Identitásszolgáltató integráció**: Központosított identitásmenedzsment vállalati identitásszolgáltatókkal (Microsoft Entra ID, Active Directory)
- **Hálózati szeparáció**: MCP komponensek logikai izolálása a laterális mozgás megakadályozására
- **Legkisebb jogosultság elve**: Minden rendszerkomponens és fiók minimálisan szükséges jogosultságainak biztosítása

#### **Biztonsági monitorozás és észlelés**
- **Átfogó naplózás**: Részletes naplózás az MI alkalmazás tevékenységeiről, beleértve az MCP kliens-szerver interakciókat
- **SIEM integráció**: Központosított biztonsági esemény és információ menedzsment anomáliák észlelésére
- **Viselkedéselemzés**: MI által támogatott monitorozás rendellenes minták felderítésére rendszer- és felhasználói viselkedésben
- **Fenyegetés intelligencia**: Külső fenyegetés adatfolyamok és incidensjelzők (IOC-k) bevonása
- **Incidens kezelés**: Jól definiált protokollok biztonsági incidensek észlelésére, kezelésére és helyreállítására

#### **Zero Trust architektúra**
- **Sosem bízz, mindig ellenőrizz**: Folyamatos felhasználói, eszköz- és hálózati kapcsolatok ellenőrzése
- **Mikroszegmentáció**: Finomhangolt hálózati vezérlések, melyek izolálják az egyes munkaterheléseket és szolgáltatásokat
- **Identitás-központú biztonság**: Biztonsági szabályok az ellenőrzött identitások alapján, nem a hálózati hely alapján
- **Folyamatos kockázatértékelés**: Dinamikus biztonsági állapotértékelés aktuális kontextus és viselkedés alapján
- **Feltételes hozzáférés**: Hozzáférés szabályok, amelyek a kockázati tényezők, hely és eszköz bizalom alapján alkalmazkodnak

### Vállalati integrációs minták

#### **Microsoft biztonsági ökoszisztéma integráció**
- **Microsoft Defender for Cloud**: Átfogó felhőbiztonsági állapotkezelés
- **Azure Sentinel**: Felhőnatív SIEM és SOAR képességek MI munkaterhelések védelmére
- **Microsoft Entra ID**: Vállalati identitás- és hozzáférés-kezelés feltételes hozzáférési szabályokkal
- **Azure Key Vault**: Központosított titokkezelés hardveres biztonsági modullal (HSM) alátámasztva
- **Microsoft Purview**: Adatkezelés és megfelelés MI adatforrásokhoz és munkafolyamatokhoz

#### **Megfelelőség és irányítás**
- **Szabályozási megfelelés**: Biztosítani, hogy az MCP megvalósítások megfeleljenek az iparági-specifikus előírásoknak (GDPR, HIPAA, SOC 2)
- **Adat osztályozás**: Az MI rendszerek által feldolgozott érzékeny adatok megfelelő kategorizálása és kezelése
- **Naplózási nyomvonalak**: Átfogó naplózás a szabályozási megfelelés és igazságügyi vizsgálatok céljára
- **Adatvédelmi vezérlések**: Adatvédelem tervezett elvek alkalmazása az MI rendszer architektúrájában
- **Változáskezelés**: Hivatalos folyamatok az MI rendszer módosításainak biztonsági áttekintésére

Ezek az alapvető gyakorlatok erős biztonsági alapot képeznek, amely fokozza az MCP-specifikus biztonsági vezérlések hatékonyságát és átfogó védelmet nyújtanak MI-alapú alkalmazásoknak.
## Főbb biztonsági tanulságok

- **Rétegzett biztonsági megközelítés**: Kombinálja az alapvető biztonsági gyakorlatokat (biztonságos kódolás, legkisebb jogosultság, ellátási lánc ellenőrzés, folyamatos megfigyelés) AI-specifikus vezérlőkkel az átfogó védelem érdekében

- **AI-specifikus fenyegetési környezet**: Az MCP rendszerek egyedi kockázatokkal néznek szembe, mint a prompt injekció, eszközmérgezés, munkamenet eltérítés, zavart helyettes probléma, token átengedéses sérülékenységek és túlzott jogosultságok, amelyek speciális enyhítést igényelnek

- **Hitelesítés és jogosultságkezelés kiválósága**: Erős hitelesítés bevezetése külső identitásszolgáltatókkal (Microsoft Entra ID), megfelelő token érvényesítés kikényszerítése, és soha ne fogadjon el olyan tokeneket, amelyeket nem kifejezetten az Ön MCP szerverének bocsátottak ki

- **AI támadások megelőzése**: Alkalmazza a Microsoft Prompt Shields és Azure Content Safety megoldásokat a közvetett prompt injekció és eszközmérgezés elleni védekezéshez, miközben ellenőrzi az eszköz metaadatait és figyeli a dinamikus változásokat

- **Munkamenet- és szállítási biztonság**: Használjon kriptografikusan biztonságos, nem-determinisztikus, a felhasználói identitáshoz kötött munkamenet-azonosítókat, valósítsa meg a munkamenet életciklusának megfelelő kezelését, és soha ne használja a munkameneteket hitelesítésre

- **OAuth biztonsági bevált gyakorlatok**: Előzze meg a zavart helyettes támadásokat azáltal, hogy explicit felhasználói beleegyezést kér dinamikusan regisztrált kliensek számára, helyes OAuth 2.1 megvalósítást alkalmaz PKCE-vel, és szigorúan ellenőrzi az átirányítási URI-kat

- **Token biztonsági alapelvek**: Kerülje a token átengedéses antipatereket, érvényesítse a token közönség-állításokat, alkalmazzon rövid élettartamú tokeneket biztonságos forgatással, és tartsa fenn a tiszta bizalmi határokat

- **Átfogó ellátási lánc biztonság**: Kezelje az AI ökoszisztéma minden összetevőjét (modellek, beágyazások, kontextus szolgáltatók, külső API-k) ugyanazzal a biztonsági szigorral, mint a hagyományos szoftverfüggőségeket

- **Folyamatos fejlődés**: Maradjon naprakész a gyorsan fejlődő MCP szabványokkal, járuljon hozzá a biztonsági közösségi szabványokhoz, és tartson fenn adaptív biztonsági pozíciókat a protokoll érésével

- **Microsoft biztonsági integráció**: Használja ki a Microsoft átfogó biztonsági ökoszisztémáját (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) a fejlett MCP telepítések védelméhez

## Átfogó források

### **Hivatalos MCP biztonsági dokumentáció**
- [MCP specifikáció (aktuális: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP biztonsági bevált gyakorlatok](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP jogosultság specifikáció](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub tárhely](https://github.com/modelcontextprotocol)

### **OWASP MCP biztonsági források**
- [OWASP MCP Azure Biztonsági Útmutató](https://microsoft.github.io/mcp-azure-security-guide/) - Átfogó OWASP MCP Top 10 Azure megvalósítási útmutatóval
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hivatalos OWASP MCP biztonsági kockázatok
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Gyakorlati biztonsági képzés MCP Azure környezetben

### **Biztonsági szabványok és bevált gyakorlatok**
- [OAuth 2.0 biztonsági bevált gyakorlatok (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Webalkalmazás-biztonság](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 nagy nyelvi modellekre](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digitális Védelmi Jelentés](https://aka.ms/mddr)

### **AI biztonsági kutatás és elemzés**
- [Prompt injekció az MCP-ben (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Eszközmérgezéses támadások (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP biztonsági kutatási tájékoztató (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft biztonsági megoldások**
- [Microsoft Prompt Shields dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety szolgáltatás](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID biztonság](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token kezelés bevált gyakorlatok](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Megvalósítási útmutatók és oktatóanyagok**
- [Azure API Management mint MCP hitelesítési kapu](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID hitelesítés MCP szerverekkel](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Biztonságos token tárolás és titkosítás (Videó)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps és ellátási lánc biztonság**
- [Azure DevOps biztonság](https://azure.microsoft.com/products/devops)
- [Azure Repos biztonság](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft ellátási lánc biztonsági útja](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **További biztonsági dokumentáció**

Átfogó biztonsági útmutatásért tekintse meg ezeket a szakterületi dokumentumokat ebben a szakaszban:

- **[MCP Biztonsági bevált gyakorlatok 2025](./mcp-security-best-practices-2025.md)** - Teljes körű biztonsági bevált gyakorlatok MCP implementációkhoz
- **[Azure Content Safety megvalósítás](./azure-content-safety-implementation.md)** - Gyakorlati megvalósítási példák az Azure Content Safety integráláshoz  
- **[MCP Biztonsági vezérlők 2025](./mcp-security-controls-2025.md)** - Legfrissebb biztonsági vezérlők és technikák MCP telepítésekhez
- **[MCP Bevált gyakorlatok Gyors referencia](./mcp-best-practices.md)** - Gyors referencia az alapvető MCP biztonsági gyakorlatokhoz

### **Gyakorlati biztonsági képzés**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Teljes körű gyakorlati workshop az MCP szerverek biztonságáért Azure-ban, fokozatos táborokkal az Alaptábortól a Csúcsig
- **[OWASP MCP Azure Biztonsági Útmutató](https://microsoft.github.io/mcp-azure-security-guide/)** - Referencia architektúra és megvalósítási útmutató az összes OWASP MCP Top 10 kockázathoz

---

## Mi következik

Következő: [3. fejezet: Első lépések](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felmentés**:
Ezt a dokumentumot az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) használatával fordítottuk. Bár igyekszünk a pontosságra, kérjük, vegye figyelembe, hogy a gépi fordítás hibákat vagy pontatlanságokat tartalmazhat. Az eredeti, anyanyelvi dokumentum tekintendő a hiteles forrásnak. Kritikus információk esetén javasolt szakmai humán fordító igénybevétele. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->