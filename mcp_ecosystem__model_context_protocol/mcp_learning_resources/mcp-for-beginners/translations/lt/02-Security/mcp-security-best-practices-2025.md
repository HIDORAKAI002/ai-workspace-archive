# MCP saugumo gerosios praktikos – 2026 m. vasario atnaujinimas

> **Svarbu**: Šis dokumentas atspindi naujausius [MCP specifikacijos 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) saugumo reikalavimus ir oficialias [MCP saugumo gerąsias praktikas](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Visada kreipkitės į dabartinę specifikaciją dėl naujausių rekomendacijų.

## 🏔️ Praktiniai saugumo mokymai

Praktinės įgyvendinimo patirties gauti rekomenduojame **[MCP saugumo viršūnių seminarą (Sherpa)](https://azure-samples.github.io/sherpa/)** – išsamų vadovaujamą žygį, skirtą apsaugoti MCP serverius Azure aplinkoje. Seminare aptariami visi OWASP MCP Top 10 rizikos veiksniai per „pažeidžiamas → išnaudojimas → pataisymas → patvirtinimas“ metodiką.

Visos šio dokumento praktikos atitinka **[OWASP MCP Azure saugumo gido](https://microsoft.github.io/mcp-azure-security-guide/)** rekomendacijas, skirtas specifiniam Azure įgyvendinimui.

## Esminės saugumo praktikos MCP diegimams

Model Context Protocol sukelia unikalių saugumo iššūkių, kurie viršija tradicinio programinės įrangos saugumą. Šios praktikos apima tiek pagrindinius saugumo reikalavimus, tiek MCP specifines grėsmes, įskaitant užklausų injekcijas, įrankių užnuodymą, sesijų užgrobimą, painių įgaliotinių problemas ir žetonų praleidimo pažeidžiamumus.

### **PRIEVOLINIAI saugumo reikalavimai**

**Esminiai reikalavimai pagal MCP specifikaciją:**

### **PRIEVOLINIAI saugumo reikalavimai**

**Esminiai reikalavimai pagal MCP specifikaciją:**

> **NEGALIMA**: MCP serveriai **NEGALI** priimti jokių žetonų, kurie nebuvo aiškiai išduoti MCP serveriui
> 
> **PRIVALOMA**: MCP serveriai, įgyvendinantys autorizaciją, **PRIVALO** patikrinti VISUS gaunamus užklausimus
>  
> **NEGALIMA**: MCP serveriai **NEGALI** naudoti sesijų autentifikacijai
>
> **PRIVALOMA**: MCP proxy serveriai, naudojantys statinius kliento ID, **PRIVALO** gauti vartotojo sutikimą kiekvienam dinamiškai registruotam klientui

---

## 1. **Žetonų saugumas ir autentifikacija**

**Autentifikacijos ir autorizacijos kontrolės:**
   - **Griežtas autorizacijos peržiūrėjimas**: Atlikite išsamias MCP serverio autorizacijos logikos auditus, kad tik numatyti vartotojai ir klientai galėtų pasiekti išteklius
   - **Išorinių tapatybės paslaugų integracija**: Naudokite patikimus tapatybės teikėjus, pvz., Microsoft Entra ID, o ne kurkite savo autentifikacijos sprendimus
   - **Žetonų auditorijos patikra**: Visada tikrinkite, ar žetonai buvo aiškiai išduoti jūsų MCP serveriui – niekada nepriimkite upstream žetonų
   - **Tinkamas žetonų gyvavimo ciklas**: Įgyvendinkite saugią žetonų rotaciją, galiojimo politiką ir užkirsti kelią žetonų pakartotinėms atakoms

**Apsaugotas žetonų saugojimas:**
   - Naudokite Azure Key Vault arba panašias saugias kredencialų saugyklas visiems slaptažodžiams
   - Įdiekite šifravimą žetonams tiek ramybėje, tiek perduodant duomenis
   - Reguliari kredencialų rotacija ir neteisėtos prieigos stebėjimas

## 2. **Sesijų valdymas ir transporto saugumas**

**Saugios sesijų praktikos:**
   - **Kriptografiškai saugūs sesijų ID**: Naudokite saugius, nenumatytus sesijų ID, sugeneruotus naudojant saugius atsitiktinių skaičių generatorius
   - **Vartotojui specifinis susiejimas**: Susiekite sesijų ID su vartotojo tapatybe naudojant formatus kaip `<user_id>:<session_id>`, kad išvengtumėte sesijų naudojimo tarp vartotojų
   - **Sesijų gyvavimo ciklo valdymas**: Įgyvendinkite tinkamą sesijų galiojimo, rotacijos ir atšaukimo mechanizmus, kad sumažintumėte saugumo spragas
   - **HTTPS/TLS privalomumas**: Privalomas HTTPS visai komunikacijai, kad būtų išvengta sesijų ID užgrobimo

**Transporto sluoksnio saugumas:**
   - Nustatykite TLS 1.3, kur tai įmanoma, su tinkamu sertifikatų valdymu
   - Įdiekite sertifikatų įrašymą rimtiems ryšiams
   - Reguliari sertifikatų rotacija ir galiojimo patikra

## 3. **Dirbtinio intelekto (DI) specifinių grėsmių apsauga** 🤖

**Užklausų injekcijos gynyba:**
   - **Microsoft Prompt Shields**: Diegkite DI Prompt Shields pažangiam kenksmingų instrukcijų aptikimui ir filtravimui
   - **Įvesties valymas**: Patikrinkite ir išvalykite visas įvestis, kad išvengtumėte injekcijos atakų ir painių įgaliotinių problemų
   - **Turinio ribos**: Naudokite skyriklių ir žymėjimo sistemas, kad atskirtumėte patikimas instrukcijas nuo išorinio turinio

**Įrankių užnuodymo prevencija:**
   - **Įrankių metaduomenų patikra**: Įgyvendinkite vientisumo patikras įrankių aprašymams ir stebėkite netikėtus pakeitimus
   - **Dinaminis įrankių stebėjimas**: Sekite vykdymo elgseną ir nustatykite perspėjimus dėl neįprastų vykdymo modelių
   - **Patvirtinimo procesai**: Reikalaukite aiškaus vartotojo patvirtinimo dėl įrankių pakeitimų ir funkcijų keitimo

## 4. **Prieigos kontrolė ir leidimai**

**Mažiausių privilegijų principas:**
   - Suteikite MCP serveriams tik minimalų funkcionalumui reikalingą leidimų lygį
   - Įgyvendinkite vaidmenimis pagrįstą prieigos kontrolę (RBAC) su smulkiais leidimais
   - Reguliari leidimų peržiūra ir nuolatinė privilegijų didinimo stebėsena

**Vykdymo metu taikomi leidimų valdymo mechanizmai:**
   - Nustatykite resursų limitus, kad išvengtumėte resursų išsekimo atakų
   - Naudokite konteinerių izoliaciją įrankių vykdymo aplinkoms  
   - Įgyvendinkite „tik reikiamam laikui“ prieigą administravimo funkcijoms

## 5. **Turinio sauga ir stebėsena**

**Turinio saugos įgyvendinimas:**
   - **Azure Content Safety integracija**: Naudokite Azure Content Safety kenksmingam turiniui, apgaulės bandymams ir politikos pažeidimams aptikti
   - **Elgsenos analizė**: Įgyvendinkite vykdymo metu veikiančią elgsenos stebėseną, kad aptiktumėte anomalijas MCP serverio ir įrankių veikime
   - **Išsami žurnalo kaupimo sistema**: Fiksuokite visus autentifikacijos bandymus, įrankių paleidimus ir saugumo įvykius saugiai ir nepažeidžiamai

**Nuolatinė stebėsena:**
   - Realios laiko įspėjimai apie įtartinus modelius ir neleistinus prieigos bandymus  
   - Integracija su SIEM sistemomis centralizuotam saugumo įvykių valdymui
   - Reguliarūs saugumo auditai ir MCP diegimų saugumo testavimas

## 6. **Tiekimo grandinės saugumas**

**Komponentų patikra:**
   - **Priklausomybių skenavimas**: Naudokite automatizuotą visų programinės įrangos priklausomybių ir DI komponentų pažeidžiamumų skenavimą
   - **Provenanso patikra**: Patikrinkite modelių, duomenų šaltinių ir išorinių paslaugų kilmę, licenciją ir vientisumą
   - **Pasirašyti paketai**: Naudokite kriptografiškai pasirašytus paketus ir tikrinkite parašus prieš diegdami

**Saugus vystymo vamzdis:**
   - **GitHub Advanced Security**: Įgyvendinkite slaptažodžių skenavimą, priklausomybių analizę ir CodeQL statinę analizę
   - **CI/CD saugumas**: Integruokite saugumo patikras visuose automatizuotuose diegimo procesuose
   - **Artefaktų vientisumas**: Įgyvendinkite kriptografinę patikrą diegiamiems artefaktams ir konfigūracijoms

## 7. **OAuth saugumas ir painių įgaliotinių prevencija**

**OAuth 2.1 įgyvendinimas:**
   - **PKCE naudojimas**: Naudokite Proof Key for Code Exchange (PKCE) visoms autorizacijos užklausoms
   - **Aiški vartotojo sutikimo gavimas**: Gaukite vartotojo sutikimą kiekvienam dinamiškai registruotam klientui, kad išvengtumėte painių įgaliotinių atakų
   - **Redirect URI patikra**: Įgyvendinkite griežtą nukreipimo URI ir kliento ID patikros mechanizmą

**Proxy saugumas:**
   - Apsaugokite nuo autorizacijos apeidimo naudojant statinius kliento ID
   - Įgyvendinkite tinkamus sutikimo darbo procesus trečiųjų šalių API prieigos atvejais
   - Stebėkite autorizacijos kodo vagystę ir neleistiną API prieigą

## 8. **Incidentų valdymas ir atkūrimas**

**Greito reagavimo galimybės:**
   - **Automatizuotas reagavimas**: Įgyvendinkite automatizuotas sistemas kredencialų rotacijai ir grėsmių suvaržymui
   - **Atsitraukimo procedūros**: Gebėjimas greitai grįžti prie patikrintų gerų konfigūracijų ir komponentų
   - **Teisėtos priemonės**: Išsamios audito žurnalų ir registravimų priemonės incidentų tyrimui

**Komunikacija ir koordinavimas:**
   - Aiškios eskalavimo procedūros saugumo incidentams
   - Integracija su organizacijos incidentų valdymo komandomis
   - Reguliarūs saugumo incidentų simuliacijos ir stalo pratybos

## 9. **Atitiktis ir valdymas**

**Reguliacinė atitiktis:**
   - Užtikrinkite, kad MCP diegimai atitiktų pramonės specifinius reikalavimus (GDPR, HIPAA, SOC 2)
   - Įgyvendinkite duomenų klasifikaciją ir privatumo kontrolę DI duomenų tvarkymui
   - Palaikykite išsamią dokumentaciją atitikties auditams

**Pokyčių valdymas:**
   - Formalizuotos saugumo peržiūros visiems MCP sistemos pakeitimams
   - Versijų valdymas ir patvirtinimo procesai konfigūracijos pokyčiams
   - Reguliarūs atitikties vertinimai ir spragų analizė

## 10. **Pažangios saugumo kontrolės**

**Zero Trust architektūra:**
   - **Niekada nepasitikėti, visada tikrinti**: Nuolatinė vartotojų, įrenginių ir ryšių patikra
   - **Mikro segmentacija**: Smulkios tinklo kontrolės atskiriant atskirus MCP komponentus
   - **Sąlyginė prieiga**: Rizika pagrįstos prieigos kontrolės, pritaikomos esamai kontekstui ir elgsenai

**Vykdymo metu veikiančios programų apsaugos priemonės:**
   - **Runtime Application Self-Protection (RASP)**: Diegti RASP technologijas realaus laiko grėsmių aptikimui
   - **Programų našumo stebėsena**: Stebėti našumo anomalijas, kurios gali rodyti atakas
   - **Dinaminės saugumo politikos**: Įgyvendinkite saugumo politiką, kuri adaptuojasi pagal esamą grėsmių kraštovaizdį

## 11. **Microsoft saugumo ekosistemos integracija**

**Išsamus Microsoft saugumas:**
   - **Microsoft Defender for Cloud**: Debesijos saugumo būklės valdymas MCP darbo krūviams
   - **Azure Sentinel**: Debesijos pagrindu veikianti SIEM ir SOAR sistemos pažangiam grėsmių aptikimui
   - **Microsoft Purview**: Duomenų valdymas ir atitiktis DI darbo eigoms bei duomenų šaltiniams

**Tapatybės ir prieigos valdymas:**
   - **Microsoft Entra ID**: Įmonių tapatybės valdymas su sąlyginės prieigos politikomis
   - **Privileged Identity Management (PIM)**: Tik reikiamam laikui prieiga ir patvirtinimo procesai administravimo funkcijoms
   - **Tapatybės apsauga**: Rizika pagrįsta sąlyginė prieiga ir automatizuotos grėsmių reakcijos

## 12. **Nuolatinė saugumo evoliucija**

**Sekimas naujovių:**
   - **Specifikacijos stebėjimas**: Reguliari MCP specifikacijos atnaujinimų ir saugumo rekomendacijų peržiūra
   - **Grėsmių informacijos integracija**: DI specifinių grėsmių srautų ir įsipainiavimo požymių integracija
   - **Saugumo bendruomenės dalyvavimas**: Aktyvus dalyvavimas MCP saugumo bendruomenėje ir pažeidžiamumų atskleidimo programose

**Adaptuojamas saugumas:**
   - **Mašininio mokymosi saugumas**: Naudokite ML pagrįstą anomalijų aptikimą naujiems atakų modeliams identifikuoti
   - **Prognozuojamoji saugumo analizė**: Įgyvendinkite prognozuojamuosius modelius proaktyviam grėsmių identifikavimui
   - **Saugumo automatizavimas**: Automatizuoti saugumo politikų atnaujinimai pagal grėsmių informaciją ir specifikacijos pokyčius

---

## **Esminiai saugumo ištekliai**

### **Oficiali MCP dokumentacija**
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP saugumo gerosios praktikos](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autorizacijos specifikacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP saugumo ištekliai**
- [OWASP MCP Azure saugumo gidas](https://microsoft.github.io/mcp-azure-security-guide/) – Išsamus OWASP MCP Top 10 su Azure įgyvendinimu
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Oficiali OWASP MCP saugumo rizikų santrauka
- [MCP saugumo viršūnių seminaras (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktiniai MCP saugumo mokymai Azure platformoje

### **Microsoft saugumo sprendimai**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID saugumas](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Saugumo standartai**
- [OAuth 2.0 saugumo gerosios praktikos (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 dideliems kalbos modeliams](https://genai.owasp.org/)
- [NIST DI rizikos valdymo sistema](https://www.nist.gov/itl/ai-risk-management-framework)

### **Įgyvendinimo gairės**
- [Azure API Management MCP autentifikacijos vartai](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID su MCP serveriais](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Saugumo pranešimas**: MCP saugumo praktikos sparčiai keičiasi. Visada tikrinkite dabartinę [MCP specifikaciją](https://spec.modelcontextprotocol.io/) ir [oficialią saugumo dokumentaciją](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) prieš įgyvendinimą.

## Kas toliau

- Skaitykite: [MCP saugumo kontrolės 2025](./mcp-security-controls-2025.md)
- Grįžkite į: [Saugumo modulio apžvalgą](./README.md)
- Tęskite: [Modulis 3: Pradžia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant AI vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, atkreipkite dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba turi būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų vertimą žmogaus. Mes neatsakome už jokius nesusipratimus ar neteisingas interpretacijas, kylančias naudojant šį vertimą.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->