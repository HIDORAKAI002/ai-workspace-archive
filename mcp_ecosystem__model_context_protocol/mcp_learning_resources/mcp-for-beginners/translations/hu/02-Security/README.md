# MCP Biztonság: Átfogó védelem az AI rendszerek számára

[![MCP Security Best Practices](../../../translated_images/hu/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kattintson a fenti képre az óra videójának megtekintéséhez)_

A biztonság az AI rendszertervezés alapja, ezért helyezzük a második részünk középpontjába. Ez összhangban áll a Microsoft **Secure by Design** elvével a [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) keretében.

A Model Context Protocol (MCP) új, erőteljes képességeket hoz az AI-vezérelt alkalmazások számára, miközben egyedi biztonsági kihívásokat is támaszt, amelyek túlmutatnak a hagyományos szoftverbiztonsági kockázatokon. Az MCP rendszerek mérlegelik mind a jól ismert biztonsági aggályokat (biztonságos kódolás, legkisebb jogosultság elve, beszállítói lánc biztonság), mind az új, AI-specifikus fenyegetéseket, mint például a prompt injekció, eszközmérgezés, munkamenet-eltérítés, „confused deputy” támadások, token áthaladás sérülékenységek, valamint a dinamikus képességmódosítás.

Ez az óra a legkritikusabb biztonsági kockázatokat vizsgálja az MCP implementációkban – lefedi azonosítást, jogosultságkezelést, túlzott jogosultságokat, közvetett prompt injekciót, munkamenet biztonságot, confused deputy problémákat, tokenkezelést és a beszállítói lánc sérülékenységeit. Megtanulhatja a kockázatok enyhítéséhez szükséges gyakorlati vezérlőket és legjobb gyakorlatokat, miközben a Microsoft megoldásait, mint a Prompt Shields, Azure Content Safety és GitHub Advanced Security használja az MCP telepítés megerősítéséhez.

## Tanulási célok

Az óra végére képes lesz:

- **MCP-specifikus fenyegetések felismerése**: Az MCP rendszerekre jellemző egyedi biztonsági kockázatok azonosítása, beleértve a prompt injekciót, eszközmérgezést, túlzott jogosultságokat, munkamenet-eltérítést, confused deputy problémákat, token áthaladás sérülékenységeket és beszállítói lánc kockázatokat
- **Biztonsági vezérlők alkalmazása**: Hatékony mérséklések megvalósítása, beleértve a robusztus azonosítást, a legkisebb jogosultság elvét, biztonságos tokenkezelést, munkamenet biztonsági vezérlőket és beszállítói lánc hitelesítését
- **Microsoft biztonsági megoldások kihasználása**: Microsoft Prompt Shields, Azure Content Safety és GitHub Advanced Security megértése és alkalmazása az MCP munkaterhelések védelmében
- **Eszközbiztonság érvényesítése**: Az eszköz metaadatainak hitelesítésének fontosságának felismerése, a dinamikus változások figyelése és a közvetett prompt injekció támadások elleni védelem
- **Legjobb gyakorlatok integrálása**: Megalapozott biztonsági alapelvek (biztonságos kódolás, szerver erősítés, zero trust) kombinálása az MCP-specifikus vezérlőkkel az átfogó védelem érdekében

# MCP Biztonsági architektúra és vezérlők

A modern MCP implementációk többrétegű biztonsági megközelítést igényelnek, amelyek mind a hagyományos szoftverbiztonsági, mind az AI-specifikus fenyegetéseket kezelik. Az MCP specifikáció gyorsan fejlődik és érleli biztonsági vezérlőit, lehetővé téve a jobb integrációt az üzleti biztonsági architektúrákkal és bevett legjobb gyakorlatokkal.

A [Microsoft Digital Defense Report](https://aka.ms/mddr) kutatása rámutat, hogy a **jelentett biztonsági incidensek 98%-a megelőzhető volna megfelelő biztonsági higiéniával**. A leghatékonyabb védekezési stratégia a megalapozott biztonsági gyakorlatok és az MCP-specifikus vezérlők kombinációja - a bizonyított alapvető biztonsági intézkedések maradnak a legmeghatározóbbak a teljes kockázat csökkentésében.

## Aktuális biztonsági helyzet

> **Megjegyzés:** Ez az információ az MCP biztonsági szabványokat tükrözi 2026. február 5-én, összhangban az **MCP Specification 2025-11-25** verzióval. Az MCP protokoll továbbra is gyorsan fejlődik, és a jövőbeni implementációk új azonosítási mintákat és fejlettebb vezérlőket hozhatnak. Mindig hivatkozzon a legfrissebb [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) és [biztonsági legjobb gyakorlatokra](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) az aktuális útmutatásért.

## 🏔️ MCP Biztonsági Csúcstalálkozó Workshop (Sherpa)

**Gyakorlati biztonsági képzéshez** erősen ajánljuk az **MCP Biztonsági Csúcstalálkozó Workshopot** (Sherpa) – egy átfogó, vezetett expedíciót az MCP szerverek biztosításához a Microsoft Azure környezetében.

### Workshop áttekintés

Az [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) gyakorlati, cselekvőképes biztonsági képzést nyújt egy bevált "sebezhetőség → kihasználás → javítás → érvényesítés" módszertanon keresztül. Meg fogja tapasztalni:

- **Tanulás a hibákból**: Megismeri a sebezhetőségeket saját kezűleg, szándékosan nem biztonságos szerverek kihasználásával
- **Azure-natív biztonság használata**: Azure Entra ID, Key Vault, API Management és AI Content Safety alkalmazása
- **Mélységi védekezés követése**: Táborokat járva fokozatosan építhet biztonsági rétegeket
- **OWASP szabványok alkalmazása**: Minden technika kapcsolatban áll az [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) útmutatóval
- **Termelésre kész kód**: Működő, tesztelt implementációkkal távozik

### Az expedíció útvonala

| Tábor | Fókusz | OWASP kockázatok lefedése |
|-------|--------|---------------------------|
| **Bázistábor** | MCP alapok és azonosítási sebezhetőségek | MCP01, MCP07 |
| **1. Tábor: Identitás** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **2. Tábor: Kapu** | API Management, Privát végpontok, irányítás | MCP02, MCP06, MCP07, MCP09 |
| **3. Tábor: Bemenet/kimenet biztonság** | Prompt injekció, PII védelem, tartalombiztonság | MCP03, MCP05, MCP06, MCP10 |
| **4. Tábor: Felügyelet** | Log Analytics, irányítópultok, fenyegetésészlelés | MCP04, MCP08 |
| **Csúcstalálkozó** | Red Team / Blue Team integrációs teszt | Mind |

**Kezdéshez**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 biztonsági kockázat

Az [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) részletezi az MCP implementációk tíz legkritikusabb biztonsági kockázatát:

| Kockázat | Leírás | Azure enyhítés |
|----------|--------|----------------|
| **MCP01** | Token-kezelési hibák és titkok kiszivárgása | Azure Key Vault, Managed Identity |
| **MCP02** | Jogosultságkiterjesztés (Scope Creep) | RBAC, Feltételes hozzáférés |
| **MCP03** | Eszközmérgezés | Eszközvalidáció, integritás ellenőrzés |
| **MCP04** | Szoftverbiztonsági beszállítói lánc támadások és függőség manipuláció | GitHub Advanced Security, függőségellenőrzés |
| **MCP05** | Parancsbefecskendezés és végrehajtás | Bevitel érvényesítés, sandboxing |
| **MCP06** | Szándékáramlás manipuláció (Intent Flow Subversion) | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Elégtelen azonosítás és jogosultságkezelés | Azure Entra ID, OAuth 2.1 PKCE-vel |
| **MCP08** | Auditálás és telemetria hiánya | Azure Monitor, Application Insights |
| **MCP09** | Árnyék MCP szerverek | API Center irányítás, hálózati izoláció |
| **MCP10** | Kontextus befecskendezés és túlzott megosztás | Adatosztályozás, minimális kitettség |

### MCP azonosítás fejlődése

Az MCP specifikáció jelentős fejlődést hozott az azonosítás és jogosultságkezelés terén:

- **Eredeti megközelítés**: Korai specifikációk az egyedi azonosítási szerverek megvalósítását követelték meg, ahol az MCP szerverek OAuth 2.0 engedélyező szerverként működtek, közvetlenül kezelve a felhasználói azonosítást
- **Jelenlegi szabvány (2025-11-25)**: Az új specifikáció lehetővé teszi, hogy az MCP szerverek külső identitásszolgáltatókra (pl. Microsoft Entra ID) delegálják az azonosítást, javítva a biztonsági helyzetet és csökkentve a megvalósítási bonyolultságot
- **Transzport réteg biztonság**: Fejlett támogatás a biztonságos átviteli mechanizmusokhoz a helyi (STDIO) és távoli (Streamable HTTP) kapcsolatok megfelelő azonosítási mintáival

## Azonosítás és jogosultságbiztonság

### Jelenlegi biztonsági kihívások

A modern MCP implementációkat több azonosítási és jogosultságkezelési kihívás jellemzi:

### Kockázatok és támadási felületek

- **Hibás jogosultságkezelési logika**: Az MCP szerverek hibás jogosultság kezelése érzékeny adatok kiszivárgását és helytelen hozzáférés-ellenőrzést eredményezhet
- **OAuth token kompromittálás**: A helyi MCP szerver token lopása lehetővé teszi a támadóknak, hogy megszemélyesítsék a szervereket és hozzáférjenek downstream szolgáltatásokhoz
- **Token áthaladás sebezhetőségek**: Hibás tokenkezelés biztonsági környezet megkerülést és elszámoltathatósági hiányokat eredményezhet
- **Túlzott jogosultságok**: A túlzottan jogosult MCP szerverek megsértik a legkisebb jogosultság elvét és növelik a támadási felületet

#### Token áthaladás: kritikus anti-minta

**A token áthaladás kifejezetten tilos** a jelenlegi MCP jogosultságkezelési specifikáció szerint súlyos biztonsági következményei miatt:

##### Biztonsági vezérlők megkerülése  
- Az MCP szerverek és a downstream API-k kritikus biztonsági vezérlőket (pl. aránykorlát, kérés-ellenőrzés, forgalom monitorozás) alkalmaznak, melyek megfelelő token érvényesítésen alapulnak  
- A kliens közvetlen token használata megkerüli ezeket az alapvető védelmeket, aláásva a biztonsági architektúrát  

##### Elszámoltathatóság és audit kihı́vások  
- Az MCP szerverek nem tudják megkülönböztetni az upstream tokenekkel rendelkező klienseket, megtörve az audit nyomvonalakat  
- A downstream erőforrás szerver naplók félrevezető kérés eredményeket mutatnak, nem az MCP szerver közvetítőket  
- Az incidens nyomozás és megfelelőségi auditálás jelentősen nehezebb

##### Adat kiszivárgás kockázatai  
- Nem validált token igénylések lehetővé teszik, hogy rosszindulatú szereplők ellopott tokenekkel az MCP szervereket proxyként használják adat kiszivárgásra  
- A bizalmi határok átlépése jogosulatlan hozzáférési mintákat hoz létre, megkerülve a szándékolt biztonsági korlátozásokat

##### Több szolgáltatást érintő támadás  
- A kompromittált tokeneket több szolgáltatás is elfogadja, ami laterális mozgást tesz lehetővé az összekapcsolt rendszerek között  
- A szolgáltatások közti bizalom sérülhet, ha a token eredete nem ellenőrizhető

### Biztonsági vezérlők és enyhítések

**Kritikus biztonsági követelmények:**

> **KÖTELEZŐ**: Az MCP szerverek **NEM FOGLALHATNAK EL TOKENEKET**, amelyeket nem kifejezetten az adott MCP szerver számára bocsátottak ki

#### Azonosítás és jogosultságkezelési vezérlők

- **Alapos jogosultsági audit**: Teljeskörű áttekintés az MCP szerver jogosultsági logikáján annak biztosítására, hogy csak a tervezett felhasználók és kliensek férhessenek hozzá érzékeny erőforrásokhoz  
  - **Megvalósítási útmutató**: [Azure API Management mint azonosítási kapu MCP szerverekhez](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Identitás integráció**: [Microsoft Entra ID használata MCP szerver azonosításhoz](https://den.dev/blog/mcp-server-auth-entra-id-session/)  

- **Biztonságos tokenkezelés**: A [Microsoft token érvényesítési és életciklus legjobb gyakorlatok](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) alkalmazása  
  - Validálja, hogy a token "audience" kijelentések megegyeznek az MCP szerver identitásával  
  - Megfelelő token forgatási és lejárati szabályzatok érvényesítése  
  - Megakadályozza a token visszajátszásos támadásokat és jogosulatlan használatot  

- **Védett token tárolás**: Titkosított token tárolás mind tárolás, mind átvitel során  
  - **Legjobb gyakorlatok**: [Biztonságos token tárolás és titkosítás irányelvek](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

#### Hozzáférés-vezérlés megvalósítása

- **Legkisebb jogosultság elve**: Csak a minimálisan szükséges jogosultságok megadása az MCP szervereknek a kívánt funkcionalitás érdekében  
  - Rendszeres jogosultság felülvizsgálat és frissítés a jogosultság növekedés megakadályozására  
  - **Microsoft dokumentáció**: [Biztonságos, legkisebb jogosultságú hozzáférés](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  

- **Szerepalapú hozzáférés-vezérlés (RBAC)**: Finoman szabályozott szerepkörök megvalósítása  
  - Szoros szerepkörök a konkrét erőforrásokra és műveletekre  
  - Kerülje a túl általános vagy felesleges jogosultságokat, melyek növelik a támadási felületet  

- **Folyamatos jogosultságfigyelés**: Állandó hozzáférési auditálás és monitorozás  
  - Figyelje a jogosultság használati mintázatokat rendellenességek esetén  
  - Gyorsan orvosolja a túlzott vagy használatlan jogosultságokat  

## AI-specifikus biztonsági fenyegetések

### Prompt injekció és eszközmanipulációs támadások

A modern MCP implementációk kifinomult, AI-specifikus támadási vektorokkal néznek szembe, amelyeket a hagyományos biztonsági intézkedések nem tudnak teljesen kezelni:

#### **Közvetett prompt injekció (Cross-Domain Prompt Injection)**

A **közvetett prompt injekció** az egyik legkritikusabb sebezhetőség az MCP által támogatott AI rendszerekben. A támadók rosszindulatú utasításokat rejtenek el külső tartalmakban – dokumentumokban, weboldalakon, e-mailekben vagy adatforrásokban –, amelyeket az AI rendszerek később legitim parancsként dolgoznak fel.

**Támadási forgatókönyvek:**
- **Dokumentum-alapú injekció**: Rosszindulatú utasítások rejtve a feldolgozott dokumentumokban, amelyek nem kívánt AI műveleteket váltanak ki  
- **Webtartalom kihasználás**: Megfertőzött weboldalak, amelyek beágyazott promptokat tartalmaznak, és amelyek az AI viselkedését manipulálják, amikor az adatokat lekérik  
- **E-mail alapú támadások**: Az AI asszisztenst rosszindulatú promptokkal manipulálják, hogy információkat szivárogtasson vagy jogosulatlan műveleteket végezzen  
- **Adatforrás szennyezés**: Megfertőzött adatbázisok vagy API-k, amelyek fertőzött tartalmat szolgáltatnak az AI rendszereknek  

**Valós hatás**: Ezek a támadások adat kiszivárgáshoz, adatvédelmi incidensekhez, káros tartalmak generálásához és felhasználói interakciók manipulálásához vezethetnek. Részletes elemzésért lásd: [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/hu/prompt-injection.ed9fbfde297ca877.webp)

#### **Eszközmérgező támadások**

Az **eszközmérgezés** az MCP eszközöket definiáló metaadatokat célozza meg, kihasználva, hogy a nagy nyelvi modellek (LLM-ek) hogyan értelmezik az eszközök leírásait és paramétereit a végrehajtási döntések során.

**Támadási mechanizmusok:**
- **Metaadat manipuláció**: Rosszindulatú utasítások injektálása az eszközleírásokba, paraméterdefiníciókba vagy használati példákba  
- **Láthatatlan utasítások**: Rejtett promptok az eszköz metaadataiban, amelyeket az AI modellek feldolgoznak, de a felhasználók számára láthatatlanok  
- **Dinamikus eszköz módosítás („Rug Pull”)**: A felhasználók által jóváhagyott eszközöket később módosítják káros műveletekre anélkül, hogy a felhasználó tudomást szerezne  
- **Paraméter injekció**: Rosszindulatú tartalom beágyazása az eszköz paraméter sémákba, amely befolyásolja a modell viselkedését  

**Hosted szerver kockázatok**: A távoli MCP szerverek magasabb kockázatot hordoznak, mert az eszközdefiníciók a felhasználói jóváhagyás után is frissíthetők, így egy korábban biztonságos eszköz később károssá válhat. Részletes elemzésért lásd: [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/hu/tool-injection.3b0b4a6b24de6bef.webp)

#### **További AI támadási vektorok**

- **Cross-Domain Prompt Injection (XPIA)**: Kifinomult támadások, melyek több domain tartalmának kihasználásával kerülik meg a biztonsági vezérlőket
- **Dinamikus képességmódosítás**: Az eszközképességek valós idejű változtatásai, amelyek elkerülik a kezdeti biztonsági értékeléseket
- **Kontextusablak mérgezés**: Támadások, amelyek nagy kontextusablakokat manipulálnak rosszindulatú utasítások elrejtésére
- **Modellzavar támadások**: A modell korlátainak kihasználása kiszámíthatatlan vagy nem biztonságos viselkedések létrehozására


### AI Biztonsági Kockázat Hatása

**Magas hatású következmények:**
- **Adatkivonás**: Jogosulatlan hozzáférés és érzékeny vállalati vagy személyes adatok ellopása
- **Adatvédelmi megsértések**: Személyesen azonosítható információk (PII) és bizalmas üzleti adatok kiszivárgása  
- **Rendszermanipuláció**: Kritikus rendszerek és munkafolyamatok nem kívánt módosítása
- **Hitelesítő adatok lopása**: Hitelesítési tokenek és szolgáltatási jogosultságok kompromittálása
- **Oldalirányú mozgás**: Megtámadott AI rendszerek használata szélesebb körű hálózati támadások pivottjaként

### Microsoft AI Biztonsági Megoldások

#### **AI Prompt Pajzsok: Fejlett védelem az injekciós támadások ellen**

A Microsoft **AI Prompt Pajzsok** átfogó védelmet nyújtanak közvetlen és közvetett prompt injekciós támadások ellen több biztonsági rétegen keresztül:

##### **Alapvető védelmi mechanizmusok:**

1. **Fejlett észlelés és szűrés**
   - Gépi tanulási algoritmusok és NLP technikák észlelik a rosszindulatú utasításokat külső tartalmakban
   - Valós idejű elemzés dokumentumokon, weboldalakon, e-maileken és adatforrásokon a beágyazott fenyegetésekre
   - Kontextuális megértés a jogos és rosszindulatú prompt minták között

2. **Kiemelési technikák**  
   - Megkülönbözteti a megbízható rendszerutasításokat a potenciálisan kompromittált külső bemenetektől
   - Szövegtranszformációs módszerek, amelyek növelik a modell relevanciáját, miközben izolálják a rosszindulatú tartalmat
   - Segíti az AI rendszereket a megfelelő utasításhierarchia megtartásában és az injektált parancsok figyelmen kívül hagyásában

3. **Elválasztó és adatjelölő rendszerek**
   - Kifejezett határmeghatározás a megbízható rendszerüzenetek és a külső bemeneti szöveg között
   - Különleges jelölők kiemelik a határokat a megbízható és nem megbízható adatforrások között
   - Egyértelmű elkülönítés megelőzi az utasítási zavart és a jogosulatlan parancsvégrehajtást

4. **Folyamatos fenyegetésintelligencia**
   - A Microsoft folyamatosan figyelemmel kíséri a felmerülő támadási mintákat és frissíti a védelmeket
   - Proaktív fenyegetéskeresés új injekciós technikák és támadási vektorok felderítésére
   - Rendszeres biztonsági modellfrissítések a változó fenyegetések elleni hatékonyság fenntartására

5. **Azure Tartalombiztonsági integráció**
   - Az átfogó Azure AI Tartalombiztonsági csomag része
   - Kiegészítő észlelés jailbreak kísérletekre, káros tartalmakra és biztonsági szabályzat megsértésekre
   - Egyesített biztonsági szabályozás az AI alkalmazás komponensei között

**Megvalósítási erőforrások**: [Microsoft Prompt Shields Dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/hu/prompt-shield.ff5b95be76e9c78c.webp)


## Fejlett MCP Biztonsági Fenyegetések

### Munkamenet-átruházási sebezhetőségek

A **munkamenet-átruházás (session hijacking)** kritikus támadási vektort jelent az állapotmegőrző MCP megvalósításokban, ahol jogosulatlan felek megszerzik és visszaélnek jogos munkamenetazonosítókkal, hogy ügyfeleknek álcázva jogosulatlan műveleteket hajtsanak végre.

#### **Támadási forgatókönyvek és kockázatok**

- **Munkamenet-átruházásos prompt injekció**: Lopott munkamenetazonosítóval rendelkező támadók rosszindulatú eseményeket injektálnak az állapotmegosztó szerverekbe, ami káros műveletek indítását vagy érzékeny adatokhoz való hozzáférést eredményezhet  
- **Közvetlen álcázás**: Lopott munkamenetazonosítók közvetlen MCP szerver hívásokat tesznek lehetővé azonosítás megkerülésével, így a támadók jogos felhasználóként jelennek meg  
- **Kompromittált folytatható adatfolyamok**: A támadók idő előtt megszakíthatják a kéréseket, így a jogos ügyfelek potenciálisan rosszindulatú tartalommal folytatják

#### **Biztonsági szabályozások munkamenetkezeléshez**

**Kritikus követelmények:**
- **Engedélyezés ellenőrzése**: Az MCP szervereknek az engedélyezést MINDEN bejövő kérés esetén ELLENŐRIZNI KELL, és NEM SZABAD a munkamenetekre támaszkodni az azonosítás során  
- **Biztonságos munkamenet generálás**: Kriptográfiailag biztonságos, nem determinisztikus munkamenetazonosítók használata biztonságos véletlenszám-generátorokkal  
- **Felhasználó-specifikus kötés**: A munkamenetazonosítókat felhasználó-specifikus adatokhoz kell kötni, például `<user_id>:<session_id>` formátumban, a felhasználók közötti munkamenet-visszaélés megakadályozására  
- **Munkamenet életciklus kezelése**: Megfelelő lejárat, forgatás és érvénytelenítés a sebezhetőségi időablakok korlátozására  
- **Kommunikáció biztonsága**: Kötelező HTTPS minden kommunikációhoz a munkamenetazonosítók elfogásának megakadályozására

### Zavaros képviselő probléma

A **zavaros képviselő probléma** akkor fordul elő, amikor az MCP szerverek hitelesítési proxyként működnek az ügyfelek és harmadik fél szolgáltatások között, ami lehetőséget teremt az engedélyezési megkerülésekre statikus kliensazonosítók kihasználásával.

#### **Támadási mechanizmusok és kockázatok**

- **Cookie-alapú hozzájárulás megkerülése**: Korábbi felhasználói hitelesítés hoz létre hozzájárulási cookie-kat, amelyeket a támadók rosszindulatú engedélyezési kérésekkel, készített átirányítási URI-kkal használnak ki  
- **Engedélyezési kód lopás**: Meglévő hozzájárulási cookie-k miatt az engedélyező szerverek kihagyhatják a hozzájárulási képernyőket, és a kódokat támadó által kontrollált végpontokra irányíthatják  
- **Jogosulatlan API hozzáférés**: Lopott engedélyezési kódok tokencserét tesznek lehetővé és felhasználó álcázást engedélyeznek jóváhagyás nélkül

#### **Megelőzési stratégiák**

**Kötelező szabályok:**
- **Explicit hozzájárulási követelmények**: Statikus kliensazonosítókat használó MCP proxy szervereknek MINDIG el kell kérniük a felhasználói hozzájárulást minden dinamikusan regisztrált kliens esetében  
- **OAuth 2.1 biztonság alkalmazása**: Kövesse az aktuális OAuth biztonsági legjobb gyakorlatokat, beleértve a PKCE-t (Proof Key for Code Exchange) minden engedélyezési kérésnél  
- **Szigorú kliensvalidáció**: Átirányítási URI-k és kliensazonosítók alapos ellenőrzése a kihasználások megelőzése érdekében

### Token átengedési sebezhetőségek  

A **token átengedés** olyan kifejezett anti-patternt jelent, amikor az MCP szerverek kliens tokeneket fogadnak el megfelelő érvényesítés nélkül, majd továbbítják azokat downstream API-k felé, megszegve az MCP engedélyezési specifikációit.

#### **Biztonsági következmények**

- **Szabályozás megkerülése**: Közvetlen kliens-API tokenhasználat megkerüli a fontos korlátozásokat, érvényesítéseket és nyomon követést  
- **Audit nyomvonal sérülése**: A tokenek upstream kibocsátása megnehezíti az ügyfél azonosítását, akadályozva az incidenskezelést  
- **Proxy alapú adatkivonás**: Érvénytelenített tokenek lehetővé teszik rosszindulatú szereplők számára, hogy a szervereket proxiként használják jogosulatlan adat-hozzáférésre  
- **Bizalmi határ megsértése**: Downstream szolgáltatások bizalmi feltételezései sérülhetnek, ha nem ellenőrizhető a token eredete  
- **Többszolgáltatásos támadás terjeszkedés**: Kompromittált tokenek több szolgáltatás között elfogadva oldalsó mozgást tesznek lehetővé

#### **Elvárt biztonsági szabályozások**

**Nem tárgyalható követelmények:**
- **Token érvényesítés**: Az MCP szerverek NE fogadjanak el nem kifejezetten részükre kiadott tokeneket  
- **Célközönség ellenőrzése**: Mindig ellenőrizni kell, hogy a token közönsége egyezzen az MCP szerver identitásával  
- **Megfelelő token életciklus**: Rövid élettartamú hozzáférési tokenek biztonságos forgatási gyakorlattal

## AI Rendszerek Ellátási Lánc Biztonsága

Az ellátási lánc biztonsága túlmutat a hagyományos szoftverfüggőségeken, és magában foglalja az egész AI ökoszisztémát. A modern MCP megvalósításoknak szigorúan ellenőrizniük és figyelniük kell az összes AI-hoz kapcsolódó komponenst, mivel mindegyik potenciális sebezhetőségeket vezethet be, amelyek alááshatják a rendszer integritását.

### Kiterjesztett AI Ellátási Lánc Összetevők

**Hagyományos szoftverfüggőségek:**
- Nyílt forráskódú könyvtárak és keretrendszerek  
- Konténerképek és alaprendszerek  
- Fejlesztői eszközök és build folyamatok  
- Infrastruktúra komponensek és szolgáltatások

**AI-specifikus ellátási lánc elemek:**
- **Alapmodellek**: Előre betanított modellek különböző szolgáltatóktól, amelyek eredetiségének ellenőrzést igényelnek  
- **Beágyazási szolgáltatások**: Külső vektorizációs és szemantikus keresési szolgáltatások  
- **Kontextus szolgáltatók**: Adatforrások, tudásbázisok és dokumentumtárak  
- **Harmadik fél API-k**: Külső AI szolgáltatások, ML folyamatok és adatfeldolgozási végpontok  
- **Modell artefaktumok**: Súlyok, konfigurációk és finomhangolt modellváltozatok  
- **Tanító adatforrások**: Adatkészletek a modell tanításához és finomhangoláshoz

### Átfogó ellátási lánc biztonsági stratégia

#### **Komponens ellenőrzés és bizalom**
- **Eredet ellenőrzése**: Ellenőrizze az összes AI komponens eredetét, licencelését és integritását integráció előtt  
- **Biztonsági értékelés**: Vizsgálatok sebezhetőségek és biztonsági felülvizsgálatok végzése modelleken, adatforrásokon és AI szolgáltatásokon  
- **Reputáció elemzés**: AI szolgáltatók biztonsági múltjának és gyakorlataik értékelése  
- **Megfelelőségi ellenőrzés**: Minden komponens megfeleltetése a szervezeti biztonsági és szabályozási követelményeknek

#### **Biztonságos telepítési folyamatok**  
- **Automatizált CI/CD biztonság**: Biztonsági vizsgálatok integrálása a teljes automatizált telepítési folyamatba  
- **Artefakt integritás**: Kriptográfiai ellenőrzések minden telepített artefaktumra (kód, modellek, konfigurációk)  
- **Fokozatos telepítés**: Progresszív telepítési stratégiák alkalmazása, biztonsági validációval minden lépésnél  
- **Megtartott artefakt tárak**: Csak ellenőrzött, biztonságos artefaktum regisztrációkból és tárolókból történő telepítés

#### **Folyamatos megfigyelés és reagálás**
- **Függőség vizsgálat**: Folyamatos sebezhetőségfigyelés minden szoftver és AI komponens függőségeire  
- **Modell monitorozás**: Modell viselkedésének, teljesítményeltolódásának és biztonsági anomáliáinak folyamatos értékelése  
- **Szolgáltatás egészség monitorozás**: Külső AI szolgáltatások elérhetőségének, biztonsági eseményeinek és szabályzati változásainak figyelése  
- **Fenyegetésintelligencia integráció**: AI és ML biztonsági kockázatokra specifikus fenyegetés hírcsatornák beépítése

#### **Hozzáférés szabályozás és legkisebb jogosultság elve**
- **Komponens szintű jogosultságok**: Hozzáférés korlátozása modellekhez, adatokhoz és szolgáltatásokhoz üzleti szükségletek alapján  
- **Szolgáltatásfiók-kezelés**: Dedikált szolgáltatásfiókok minimalizált jogosultságokkal  
- **Hálózati szeparáció**: AI komponensek izolálása és a hálózati hozzáférés korlátozása a szolgáltatások között  
- **API kapu szabályozások**: Központosított API kapuk használata a külső AI szolgáltatásokhoz való hozzáférés szabályozására és monitorozására

#### **Incidens kezelés és helyreállítás**
- **Gyors reagálási eljárások**: Meglévő folyamatok a kompromittált AI komponensek javítására vagy cseréjére  
- **Hitelesítő adatok forgatása**: Automatizált rendszer titkok, API kulcsok és szolgáltatási jogosultságok forgatására  
- **Visszagörgetési képességek**: Gyors visszaállítás lehetősége ismert és jó állapotú AI komponensekre  
- **Ellátási lánc incidens helyreállítás**: Kifejezetten az upstream AI szolgáltatások kompromittálására irányuló válaszlépések

### Microsoft Biztonsági Eszközök és Integráció

A **GitHub Advanced Security** átfogó ellátási lánc védelmet kínál, beleértve:
- **Titokészlet keresés**: Automatizált hitelesítő adatok, API kulcsok és tokenek észlelése tárolókban  
- **Függőségvizsgálat**: Sebezhetőség értékelése nyílt forrású függőségeknél és könyvtáraknál  
- **CodeQL elemzés**: Statikus kódelemzés biztonsági sérülékenységek és kódolási hibák felismerésére  
- **Ellátási lánc betekintések**: Átláthatóság a függőségek egészségéről és biztonsági állapotáról

**Azure DevOps & Azure Repos integráció:**
- Zökkenőmentes biztonsági vizsgálatok integrálása Microsoft fejlesztői platformokon  
- Automatizált biztonsági ellenőrzések Azure Pipelines-ban AI munkafolyamatokhoz  
- Szabályzatok érvényesítése az AI komponensek biztonságos telepítésére

**Microsoft belső gyakorlatai:**  
A Microsoft kiterjedt ellátási lánc biztonsági gyakorlatokat alkalmaz minden termékénél. Ismerkedjen meg a bizonyított megközelítésekkel a [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/) oldalán.


## Alapvető Biztonsági Legjobb Gyakorlatok

Az MCP megvalósítások öröklik és továbbépítik a szervezet meglévő biztonsági helyzetét. Az alapvető biztonsági gyakorlatok megerősítése jelentősen növeli az AI rendszerek és MCP telepítések biztonságát.

### Alapvető biztonsági alapelvek

#### **Biztonságos fejlesztési gyakorlatok**
- **OWASP megfelelőség**: Védelem az [OWASP Top 10](https://owasp.org/www-project-top-ten/) webalkalmazás sérülékenységei ellen  
- **AI-specifikus védelem**: Szabályozások alkalmazása az [OWASP Top 10 LLM-ekhez](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Biztonságos titkok kezelése**: Dedikált vaultok használata tokenek, API kulcsok és érzékeny konfigurációs adatok számára  
- **Végpontok közötti titkosítás**: Biztonságos kommunikáció végrehajtása az összes alkalmazás komponens és adatfolyam között  
- **Bemenet-ellenőrzés**: Az összes felhasználói bemenet, API paraméter és adatforrás szigorú validálása

#### **Infrastruktúra megerősítése**
- **Többlépcsős hitelesítés**: Kötelező MFA minden adminisztrátori és szolgáltatásfióknál  
- **Frissítéskezelés**: Automatizált, időben történő javítások operációs rendszerekre, keretrendszerekre és függőségekre  
- **Identitásszolgáltató integráció**: Központosított identitáskezelés vállalati azonosítószolgáltatókkal (Microsoft Entra ID, Active Directory)  
- **Hálózati szeparáció**: Az MCP komponensek logikai izolálása az oldalirányú mozgás korlátozására  
- **Legkisebb jogosultság elve**: Minimálisan szükséges jogosultságok biztosítása minden rendszerkomponens és fiók számára

#### **Biztonsági megfigyelés és észlelés**
- **Átfogó naplózás**: AI alkalmazás műveleteinek részletes naplózása, beleértve az MCP kliens-szerver interakciókat  
- **SIEM integráció**: Központosított biztonsági információ- és eseménykezelés anomáliák észlelésére  
- **Viselkedéselemzés**: AI-vezérelt figyelés szokatlan rendszer- és felhasználói viselkedési minták felismerésére  
- **Fenyegetésintelligencia**: Külső fenyegetési hírcsatornák és kompromisszum jelek (IOC-k) integrálása  
- **Incidens kezelés**: Jól definiált eljárások biztonsági események azonosítására, kezelésére és helyreállítására

#### **Zero Trust architektúra**
- **Sosem bízz, mindig ellenőrizz**: Felhasználók, eszközök és hálózati kapcsolatok folyamatos ellenőrzése  
- **Mikroszegmentáció**: Finom hálózati szabályozások, amelyek izolálják az egyes munkaterheléseket és szolgáltatásokat  
- **Identitás-központú biztonság**: Biztonsági szabályzatok ellenőrzött identitások alapján, nem hálózati hely alapján  
- **Folyamatos kockázatértékelés**: Dinamikus biztonsági állapotértékelés a jelenlegi kontextus és viselkedés alapján  
- **Feltételes hozzáférés**: Kockázati tényezők, hely és eszköz megbízhatóság alapján alkalmazkodó hozzáférés-szabályozás

### Vállalati integrációs minták

#### **Microsoft biztonsági ökoszisztéma integráció**
- **Microsoft Defender for Cloud**: Átfogó felhőbiztonsági helyzetkezelés  
- **Azure Sentinel**: Felhőalapú SIEM és SOAR képességek AI munkaterhelések védelmére  
- **Microsoft Entra ID**: Vállalati identitás- és hozzáféréskezelés feltételes hozzáférési szabályzatokkal  
- **Azure Key Vault**: Központosított titokkezelés hardveres biztonsági modullal (HSM)  
- **Microsoft Purview**: Adatirányítás és megfelelőség AI adatforrások és munkafolyamatok számára

#### **Megfelelőség és irányítás**
- **Szabályozási megfelelőség**: Biztosítani, hogy az MCP implementációk megfeleljenek iparág-specifikus követelményeknek (GDPR, HIPAA, SOC 2)  
- **Adatosztályozás**: Az AI rendszerek által feldolgozott érzékeny adatok megfelelő kategorizálása és kezelése  
- **Audit naplók**: Átfogó naplózás szabályozási megfelelőség és igazságügyi vizsgálatok için  
- **Adatvédelem szabályozások**: Adatvédelmileg tervezett elvek megvalósítása az AI rendszerarchitektúrában  
- **Változáskezelés**: Formális folyamatok AI rendszer módosítások biztonsági ellenőrzésére

Ezek az alapvető gyakorlatok erős biztonsági alapot teremtenek, amelyek növelik az MCP-specifikus biztonsági szabályozások hatékonyságát és átfogó védelmet nyújtanak AI-vezérelt alkalmazások számára.

## Főbb biztonsági tanulságok
- **Rétegezett Biztonsági Megközelítés**: Alapvető biztonsági gyakorlatok (biztonságos kódolás, legkisebb jogosultság elve, ellátási lánc ellenőrzése, folyamatos megfigyelés) kombinálása AI-specifikus vezérlésekkel az átfogó védelem érdekében

- **AI-Specifikus Fenyegetési Tájkép**: Az MCP rendszerek egyedi kockázatokkal néznek szembe, beleértve a prompt injekciót, eszközmérgezést, munkamenet eltérítést, zavart helyettesítő problémákat, token továbbítási sérülékenységeket és túlzott jogosultságokat, amelyek speciális enyhítéseket igényelnek

- **Hitelesítés és Engedélyezés Kiválósága**: Robosztus hitelesítés megvalósítása külső identitásszolgáltatók (Microsoft Entra ID) használatával, megfelelő token érvényesítés kikényszerítése, és soha ne fogadjon el olyan tokeneket, amelyeket nem kifejezetten az MCP szerveréhez bocsátottak ki

- **AI-támadások Megelőzése**: Microsoft Prompt Shield-ek és Azure Content Safety alkalmazása a közvetett prompt injekció és eszközmérgezés elleni védelemre, miközben ellenőrizzük az eszköz metaadatait és figyeljük a dinamikus változásokat

- **Munkamenet és Szállítási Biztonság**: Kriptográfiailag biztonságos, nem-determinisztikus munkamenet-azonosítók használata, amelyek a felhasználói identitásokhoz kötöttek, megfelelő munkamenet-életciklus-kezelés megvalósítása, és a munkamenetek soha nem használhatók hitelesítésre

- **OAuth Biztonsági Legjobb Gyakorlatok**: Zavart helyettesítő (confused deputy) támadások megelőzése egyértelmű felhasználói hozzájárulással a dinamikusan regisztrált kliensek esetén, az OAuth 2.1 PKCE-vel történő helyes megvalósítása, és szigorú átirányítási URI érvényesítés  

- **Token Biztonsági Alapelvek**: Kerülje a token továbbítás elleni mintákat, érvényesítse a token közönség követelményeket, rövid élettartamú tokeneket valósítson meg biztonságos forgatással, és tartson fenn egyértelmű bizalmi határokat

- **Átfogó Ellátási Lánc Biztonság**: Az AI ökoszisztéma összes komponensét (modellek, beágyazások, kontextus szolgáltatók, külső API-k) ugyanazzal a biztonsági szigórussal kezelje, mint a hagyományos szoftver függőségeket

- **Folyamatos Fejlődés**: Tartsa naprakészen magát a gyorsan fejlődő MCP specifikációkkal, járuljon hozzá a biztonsági közösségi szabványokhoz, és tartson fenn adaptív biztonsági álláspontokat a protokoll érésével együtt

- **Microsoft Biztonsági Integráció**: Használja ki a Microsoft átfogó biztonsági ökoszisztémáját (Prompt Shield-ek, Azure Content Safety, GitHub Advanced Security, Entra ID) a fokozott MCP telepítési védelem érdekében

## Átfogó Források

### **Hivatalos MCP Biztonsági Dokumentáció**
- [MCP Specifikáció (Jelenlegi: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Biztonsági Legjobb Gyakorlatok](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Engedélyezési Specifikáció](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Tároló](https://github.com/modelcontextprotocol)

### **OWASP MCP Biztonsági Források**
- [OWASP MCP Azure Biztonsági Útmutató](https://microsoft.github.io/mcp-azure-security-guide/) - Átfogó OWASP MCP Top 10 Azure implementációs útmutatással
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hivatalos OWASP MCP biztonsági kockázatok
- [MCP Biztonsági Csúcs Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Gyakorlati biztonsági képzés MCP-re Azure környezetben

### **Biztonsági Szabványok és Legjobb Gyakorlatok**
- [OAuth 2.0 Biztonsági Legjobb Gyakorlatok (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Webalkalmazás Biztonság Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 Nagy Nyelvi Modellekhez](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digitális Védelmi Jelentés](https://aka.ms/mddr)

### **AI Biztonsági Kutatás és Elemzés**
- [Prompt injekció az MCP-ben (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Eszközmérgező Támadások (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Biztonsági Kutatási Tájékoztató (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Biztonsági Megoldások**
- [Microsoft Prompt Shield Dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Szolgáltatás](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Biztonság](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Kezelési Legjobb Gyakorlatok](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Megvalósítási Útmutatók és Oktatóanyagok**
- [Azure API Management mint MCP Hitelesítési Kapu](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Hitelesítés MCP Szerverekkel](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Biztonságos Token Tárolás és Titkosítás (Videó)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps és Ellátási Lánc Biztonság**
- [Azure DevOps Biztonság](https://azure.microsoft.com/products/devops)
- [Azure Repos Biztonság](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Ellátási Lánc Biztonsági Útja](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **További Biztonsági Dokumentáció**

Átfogó biztonsági útmutatásért tekintse meg az ebben a szekcióban található speciális dokumentumokat:

- **[MCP Biztonsági Legjobb Gyakorlatok 2025](./mcp-security-best-practices-2025.md)** - Teljes körű biztonsági legjobb gyakorlatok MCP megvalósításokhoz
- **[Azure Content Safety Megvalósítás](./azure-content-safety-implementation.md)** - Gyakorlati megvalósítási példák az Azure Content Safety integrációjához  
- **[MCP Biztonsági Vezérlők 2025](./mcp-security-controls-2025.md)** - Legújabb biztonsági vezérlők és technikák MCP telepítésekhez
- **[MCP Legjobb Gyakorlatok Gyorsreferencia](./mcp-best-practices.md)** - Gyorsreferencia útmutató az alapvető MCP biztonsági gyakorlatokhoz
- **[BlueHat 2026: Az AI jövőjének védelme: MFA biztonság mélységi mintákkal](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Mélységi védelem minták a Microsoft Security Response Center (MSRC) részéről

### **Gyakorlati Biztonsági Képzés**

- **[MCP Biztonsági Csúcs Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Átfogó gyakorlati workshop MCP szerverek Azure-ben történő biztonságosítására, fokozatos táborokkal az Alaptábortól a Csúcsig
- **[OWASP MCP Azure Biztonsági Útmutató](https://microsoft.github.io/mcp-azure-security-guide/)** - Referencia architektúra és megvalósítási útmutató az OWASP MCP Top 10 kockázatok mindegyikéhez

---

## Mi következik

Következő: [3. fejezet: Első lépések](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->