# MCP turvalisuse parimad tavad - 2026. aasta veebruari uuendus

> **Oluline**: See dokument kajastab uusimaid [MCP spetsifikatsiooni 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) turvanõudeid ning ametlikke [MCP turvalisuse parimaid tavasid](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Järgige alati kõige ajakohasemat spetsifikatsiooni kõlblike juhiste jaoks.

## 🏔️ Praktiline turvalisuse koolitus

Praktilise rakenduskogemuse saamiseks soovitame **[MCP Security Summit töötoad (Sherpa)](https://azure-samples.github.io/sherpa/)** – põhjalik juhendatud ekspeditsioon MCP serverite turvamiseks Azure'is. Töötuba hõlmab kõiki OWASP MCP Top 10 riske meetodiga "haavatav → ekspluateeri → paranda → valideeri".

Kõik selles dokumendis toodud tavad vastavad **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** juhistele Azure-spetsiifiliste teostuste puhul.

## Olulised turvapraktikad MCP realiseerimiste jaoks

Model Context Protocol toob kaasa unikaalseid turvaväljakutseid, mis ületavad traditsioonilise tarkvaraturvalisuse piire. Need praktikad käsitlevad nii aluslike turvanõuete kui ka MCP-spetsiifiliste ohtude vastu, sealhulgas prompti süstimist, tööriistade mürgistamist, seansi kaaperdamist, segaduses agendi probleeme ja tokenite edasikandumise haavatavusi.

### **KOHUSTUSLIKUD turvanõuded**

**Kriitilised nõuded MCP spetsifikatsioonist:**

### **KOHUSTUSLIKUD turvanõuded**

**Kriitilised nõuded MCP spetsifikatsioonist:**

> **EI TOHI**: MCP serverid **EI TOHI** aktsepteerida ühtegi tokenit, mis ei ole selgesõnaliselt välja antud MCP serveri jaoks
> 
> **PEAB**: MCP serverid, mis kasutavad autoriseerimist, **PEAVAD** kontrollima KÕIKI sissetulevaid päringuid
>  
> **EI TOHI**: MCP serverid **EI TOHI** kasutada seansse autentimiseks
>
> **PEAB**: MCP proksiserverid, mis kasutavad staatilisi kliendi ID-sid, **PEAVAD** saama iga dünaamiliselt registreeritud kliendi kasutajalt nõusoleku

---

## 1. **Tokeni turvalisus & autentimine**

**Autentimise ja autoriseerimise kontrollid:**
   - **Range autoriseerimise audit**: Tehke põhjalikke auditsid MCP serveri autoriseerimisloogiku kohta, et tagada ligipääsuks ainult kavandatud kasutajad ja kliendid
   - **Väliste identiteedipakkujate integreerimine**: Kasutage väliseid, tunnustatud identiteedipakkujaid nagu Microsoft Entra ID, asemel et ise autentimist rakendada
   - **Tokenite sihtrühma valideerimine**: Kontrollige alati, et tokenid oleksid selgesõnaliselt välja antud teie MCP serveri jaoks – ärge kunagi aktsepteerige ülejõu turvatokenit
   - **Õige tokenite elutsükkel**: Rakendage turvalist tokenite vahetust, aegumise poliitikaid ja vältige tokenite korduvkasutamist

**Kaitsva tokeni salvestus:**
   - Kasutage kõigi saladuste hoidmiseks Azure Key Vaulti või sarnaseid turvalisi andmekogusid
   - Rakendage tokenite krüpteerimist nii puhke- kui ka transpordifaasis
   - Regulaarne mandaatide vahetus ja loata ligipääsu jälgimine

## 2. **Seansihaldus & andmete ülekandeturve**

**Turvalised seansipraktikad:**
   - **Krüptograafiliselt turvalised seansi ID-d**: Kasutage turvalisi, mitte- deterministlikke seansi ID-sid, mis genereeritakse turvaliste juhuslike arvude generaatoritega
   - **Kasutajapõhine sidumine**: Siduge seansi ID-d kasutaja identiteediga kujul `<user_id>:<session_id>`, et vältida kasutajatevahelist seansi kuritarvitust
   - **Seansi elutsükli haldus**: Rakendage korrapärane aegumine, vahetus ja tühistamine, et piirata haavatavuse võimalust
   - **HTTPS/TLS nõue**: Kõige suhtluse puhul on kohustuslik HTTPS, et vältida seansi ID varastamist

**Andmete ülekandeturve:**
   - Paigaldage TLS 1.3 igal võimalikul juhul koos korraliku sertifikaadihaldusega
   - Rakendage sertifikaadi kinnitamist kriitilistes ühendustes
   - Regulaarne sertifikaadi vahetus ja kehtivuse kontrollimine

## 3. **AI-spetsiifiline kaitse ohtude vastu** 🤖

**Prompti süstimise kaitse:**
   - **Microsoft Prompt Shields**: Kasutage AI Prompt Shields tehnoloogiat pahatahtlike juhiste tuvastamiseks ja filtreerimiseks
   - **Sisendite puhastamine**: Kontrollige ja puhastage kõik sisendid, et vältida süstimis- ja segadusseajamisega seotud probleeme
   - **Sisu piirid**: Kasutage piirajaid ja andmemärgistussüsteeme, et eristada usaldusväärseid juhiseid välisest sisust

**Tööriistade mürgistamise ennetamine:**
   - **Tööriistade metaandmete valideerimine**: Tehke tööriistade definitsioonide terviklikkuse kontrolli ja jälgige ootamatuid muudatusi
   - **Dünaamiline tööriistade jälgimine**: Jälgige tööriistade käitumist ja seadistage hoiatused ootamatute käitumismustrite jaoks
   - **Heakskiidu töövood**: Nõudke tööriistade muudatuste ja võimekuse muutuste jaoks selgesõnalist kasutaja kinnitust

## 4. **Ligipääsu kontroll & õigused**

**Vähima privileegi põhimõte:**
   - Andke MCP serveritele vaid miinimumõigused kavandatud funktsionaalsuse jaoks
   - Rakendage põhjalik rollipõhine juurdepääsu kontroll (RBAC) peenhäälestatud õigustega
   - Regulaarne õiguste ülevaatus ja pidev jälgimine õiguste eskaleerumise vastu

**Käivitusaja õiguste kontroll:**
   - Rakendage ressursipiiranguid ressursside ammendumise vastu kaitsmiseks
   - Kasutage konteinerite isolatsiooni tööriistade täitmise keskkonnas  
   - Rakendage administraatori funktsioonidele õigeaegset (just-in-time) juurdepääsu

## 5. **Sisu turvalisus & jälgimine**

**Sisu turvalisuse rakendamine:**
   - **Azure Content Safety integreerimine**: Kasutage Azure Content Safety'd kahjuliku sisu, jailbreak-katsete ja poliitikavigade tuvastamiseks
   - **Käitumuslik analüüs**: Rakendage täitmise aja käitumise jälgimist MCP serveri ja tööriistade anomaaliate tuvastamiseks
   - **Põhjalik logimine**: Logige kõik autentimise katsed, tööriistade käivitused ja turvasündmused turvaliselt ja muudatusteta hoitavas andmekogus

**Pidev jälgimine:**
   - Reaalajas hoiatused kahtlaste mustrite ja loata ligipääsukatsete puhul  
   - Integreerimine SIEM-süsteemidega tsentraliseeritud turvasündmuste halduseks
   - Regulaarne turvaaudit ja läbipõrke testimine MCP realiseerimiste jaoks

## 6. **Hankeketiturve**

**Komponentide kontroll:**
   - **Sõltuvuste skaneerimine**: Kasutage automaatseid haavatavuse skaneerimise tööriistu kõigi tarkvara sõltuvuste ja AI komponentide puhul
   - **Päritolu valideerimine**: Kontrollige mudelite, andmeallikate ja väliste teenuste päritolu, litsentsimist ja terviklikkust
   - **Allkirjastatud paketid**: Kasutage krüptograafiliselt allkirjastatud pakette ja kontrollige allkirju enne juurutust

**Turvaline arendustoru:**
   - **GitHub Advanced Security**: Rakendage saladuste skaneerimist, sõltuvuste analüüsi ja CodeQL staatilist analüüsi
   - **CI/CD turvalisus**: Integreerige turvakontrollid kogu automatiseeritud juurutustsüklisse
   - **Artefaktide terviklikkus**: Rakendage krüptograafiline valideerimine juurutatud artefaktide ja konfiguratsioonide jaoks

## 7. **OAuth turvalisus & segaduses agendi vältimine**

**OAuth 2.1 rakendamine:**
   - **PKCE rakendamine**: Kasutage Proof Key for Code Exchange (PKCE) kõigi autoriseerimistaotluste puhul
   - **Selgesõnaline nõusolek**: Hankige iga dünaamiliselt registreeritud kliendi puhul kasutaja nõusolek, et vältida segaduses agendi rünnakuid
   - **Redirect URI valideerimine**: Rakendage ranget redirect URI ja kliendi ID-de valideerimist

**Proksi turvalisus:**
   - Takistage autoriseerimise möödaviimist staatiliste kliendi ID-de kuritarvitamise kaudu
   - Rakendage nõusoleku töövood kolmandate osapoolte API-de ligipääsuks
   - Jälgige autoriseerimiskoodi vargust ja loata API ligipääsu

## 8. **Sündmuste reageerimine & taastumine**

**Kiired reageerimisvõimalused:**
   - **Automatiseeritud reageerimine**: Rakendage automatiseeritud süsteemid mandaatide vahetamiseks ja ohtude piiramseks
   - **Tagasipööramise protseduurid**: Võime kiiresti taastada teada-töötavad konfiguratsioonid ja komponendid
   - **Forensika võimalused**: Üksikasjalikud auditeerimisteed ja logimised intsidentide uurimiseks

**Suhtlus ja koordineerimine:**
   - Selged eskalatsiooniprotseduurid turvajuhtumite tarvis
   - Integratsioon organisatsiooni intsidentide reageerimise meeskondadega
   - Regulaarne turvajuhtumite simulatsioon ja lauamängud

## 9. **Vastavus & haldus**

**Õiguslik vastavus:**
   - Tagada, et MCP teostused vastavad tööstusharu spetsiifilistele nõuetele (GDPR, HIPAA, SOC 2)
   - Rakendada andmeklassifikatsiooni ja privaatsuse kontrollid AI andmetöötluseks
   - Säilitada põhjalik dokumentatsioon vastavusauditi jaoks

**Muudatuste haldus:**
   - Formaalsed turvalisuse ülevaatamisprotsessid kõigi MCP süsteemi muudatuste jaoks
   - Versioonihaldus ja kinnitustöövood konfiguratsioonimuudatuste jaoks
   - Regulaarne vastavuse hindamine ja lõheanalüüs

## 10. **Edukad turvakontrollid**

**Null usaldust arhitektuur:**
   - **Ärge kunagi usaldage, kontrollige alati**: Kasutajate, seadmete ja ühenduste pidev valideerimine
   - **Mikrosegmentatsioon**: Võrgu peenhäälestatud kontrollid, mis isoleerivad üksikud MCP komponendid
   - **Tingimuslik ligipääs**: Riskipõhised juurdepääsu kontrollid, mis kohanduvad jooksva konteksti ja käitumisega

**Rakendusturbe täitmine:**
   - **Runtime Application Self-Protection (RASP)**: Rakendage reaalajas ohtu tuvastavaid RASP tehnikaid
   - **Rakenduse jõudluse jälgimine**: Jälgige jõudlusanomaliaid, mis võivad viidata rünnakutele
   - **Dünaamilised turvapoliitikad**: Rakendage turvapoliitikad, mis kohanduvad vastavalt jooksvale ohumaastikule

## 11. **Microsofti turvakeskkonna integreerimine**

**Kattuv Microsofti turvalisus:**
   - **Microsoft Defender for Cloud**: Pilve turvaplaani haldus MCP töökoormustele
   - **Azure Sentinel**: Pilvepõhine SIEM ja SOAR kõrgema astme ohu avastamiseks
   - **Microsoft Purview**: Andmehaldus ja vastavus AI töövoogude ja andmeallikate jaoks

**Identiteedi ja ligipääsu haldus:**
   - **Microsoft Entra ID**: Ettevõtte identiteedi haldus tingimusliku ligipääsu poliitikatega
   - **Privileegide haldus (PIM)**: Täpne aja-põhine ligipääs ja kinnitustöövood haldusfunktsioonidele
   - **Identiteedi kaitse**: Riskipõhine tingimuslik ligipääs ja automatiseeritud ohu reageerimine

## 12. **Pidev turvalisuse areng**

**Ajaga kaasas käimine:**
   - **Spetsifikatsiooni jälgimine**: MCP spetsifikatsiooni uuenduste ja turvajuhiste muudatuste regulaarne ülevaatus
   - **Ohuintellekt**: AI-spetsiifiliste ohtude voogude ja kompromissindikaatorite integreerimine
   - **Turvakogukonna kaasamine**: Aktiivne osalus MCP turvakogukonnas ja haavatavuste avalikustamise programmides

**Kohanemisvõimeline turvalisus:**
   - **Masinõppe turvalisus**: Kasutage ML-põhist anomaaliate tuvastust uute rünnakumustrite identifitseerimiseks
   - **Prognoosiv turvaanalüütika**: Rakendage prognoosivaid mudeleid ohtude ennetavaks tuvastamiseks
   - **Turbe automatiseerimine**: Automatiseeritud turvapoliitika uuendused ohuintellekti ja spetsifikatsiooni muudatuste põhjal

---

## **Olulised turvaressursid**

### **Ametlik MCP dokumentatsioon**
- [MCP spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP turvalisuse parimad tavad](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autoriseerimise spetsifikatsioon](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP turvaressursid**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Põhjalik OWASP MCP Top 10 koos Azure rakendusega
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Ametlik OWASP MCP turvariskide nimekiri
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Käed-külge turvakoolitus MCP jaoks Azure'is

### **Microsofti turvalahendused**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID turvalisus](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Turvastandardid**
- [OAuth 2.0 turvalisuse parimad tavad (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 suurtele keelemudelitele](https://genai.owasp.org/)
- [NIST AI riskijuhtimise raamistik](https://www.nist.gov/itl/ai-risk-management-framework)

### **Rakendamise juhendid**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID koos MCP serveritega](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Turvateade**: MCP turvapraktikad arenevad kiiresti. Kontrollige enne rakendamist alati praegust [MCP spetsifikatsiooni](https://spec.modelcontextprotocol.io/) ja [ametlikku turvadokumentatsiooni](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

## Mis edasi

- Loe: [MCP Security Controls 2025](./mcp-security-controls-2025.md)
- Tagasi: [Turvamooduli ülevaade](./README.md)
- Jätka: [Moodul 3: Alustamine](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud tehisintellektil põhineva tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi püüdleme täpsuse poole, palun arvestage, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument oma emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei kanna vastutust selle tõlke kasutamisest tingitud arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->