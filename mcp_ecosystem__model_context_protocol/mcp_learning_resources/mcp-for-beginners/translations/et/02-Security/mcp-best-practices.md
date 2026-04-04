# MCP turvalisuse parimad tavad 2025

See põhjalik juhend kirjeldab olulisi turvalisuse parimaid tavasid Model Context Protocol (MCP) süsteemide rakendamiseks, tuginedes uusimale **MCP spetsifikatsioonile 2025-11-25** ja praegustele tööstusharu standarditele. Need tavad käsitlevad nii traditsioonilisi turvaohte kui ka MCP juurutustele omaseid AI-spetsiifilisi ohte.

## Kriitilised turvanõuded

### Kohustuslikud turvakontrollid (MUST nõuded)

1. **Märgi valideerimine**: MCP serverid **EI TOHI** aktsepteerida märke, mis ei ole selgesõnaliselt välja antud just MCP serveri enda jaoks
2. **Autoriseerimise kontroll**: MCP serverid, mis rakendavad autoriseerimist, **PEAVAD** kontrollima KÕIKI sissetulevaid päringuid ja **EI TOHI** kasutada sessioone autentimiseks  
3. **Kasutaja nõusolek**: MCP proksiserverid, kes kasutavad staatilisi kliendi ID-sid, **PEAVAD** saama iga dünaamiliselt registreeritud kliendi jaoks selgesõnalise kasutaja nõusoleku
4. **Turvalised sessiooni ID-d**: MCP serverid **PEAVAD** kasutama krüptograafiliselt turvalisi, mittesihipäraseid sessiooni ID-sid, mis on loodud turvaliste juhuarvugeneraatoritega

## Põhiturvalisuse tavad

### 1. Sisendi valideerimine ja puhastamine
- **Üksikasjalik sisendi valideerimine**: Valideeri ja puhasta kõik sisendid, et vältida süstimisrünnakuid, olukorra segadustekitamise probleeme ja prompt-süstimise haavatavusi
- **Parameetri skeemi järgimine**: Rakenda ranget JSON skeemi valideerimist kõigi tööriista parameetrite ja API sisendite jaoks
- **Sisu filtreerimine**: Kasuta Microsoft Prompt Shieldsi ja Azure Content Safetyt pahatahtliku sisu filtreerimiseks promptides ja vastustes
- **Väljundi puhastamine**: Valideeri ja puhasta kõik mudeli väljundid enne nende esitamist kasutajatele või all-süsteemidele

### 2. Autentimine ja autoriseerimise tipptase  
- **Välised identiteedipakkujad**: Delegeeri autentimine tuntud identiteedipakkujatele (Microsoft Entra ID, OAuth 2.1 pakkujad), mitte ära tee kohandatud autentimist
- **Detailne õiguste haldus**: Rakenda detailseid, tööriistapõhiseid õigusi, järgides minimaalsete õiguste põhimõtet
- **Märgi elutsükli haldus**: Kasuta lühiajalisi ligipääsumärke turvalise pööramise ja korrektselt valideeritud sihtgrupiga
- **Mitmefaktoriline autentimine**: Nõua MFA-d kogu administraatori ligipääsu ja tundlike toimingute jaoks

### 3. Turvalised kommunikatsiooniprotokollid
- **Transpordikihi turvalisus**: Kasuta MCP suhtluses HTTPS/TLS 1.3 koos korraliku sertifikaadi valideerimisega
- **Lõpust-lõpuni krüpteerimine**: Rakenda täiendavaid krüpteerimiskihte väga tundlike andmete transportimiseks ja hoidmiseks
- **Sertifikaadi haldus**: Säilita korralik sertifikaadi elutsükli haldus koos automaatsete uuenduste protsessidega
- **Protokolli versiooni nõue**: Kasuta praegust MCP protokolli versiooni (2025-11-25) koos täpse versiooniläbirääkimisega

### 4. Täiustatud access rate kontroll ja ressursside kaitse
- **Mitmekihiline rate limiting**: Rakenda piirmäärasid kasutaja-, sessiooni-, tööriista- ja ressursitasandil kuritarvitamise vältimiseks
- **Kohanduv rate limiting**: Kasuta masinõppel põhinevat piirmäärade kohandamist, mis reageerib kasutusmustritele ja ohusignaalidele
- **Ressursside kvota haldus**: Sea sobivad piirid arvutusressurssidele, mälukasutusele ja täitmisaegadele
- **DDoS kaitse**: Rakenda ulatuslik DDoS kaitse ja liikluse analüüsi süsteemid

### 5. Põhjalik logimine ja jälgimine
- **Struktureeritud auditeerimislogid**: Rakenda üksikasjalikke, otsitavaid logisid kõigi MCP toimingute, tööriistade täitmise ja turvasündmuste jaoks
- **Reaalajas turvamonitooring**: Kasuta SIEM süsteeme AI-põhise anomaaliate avastamisega MCP koormustel
- **Andmekaitsele vastav logimine**: Logi turvasündmused, austades andmekaitse nõudeid ja regulatsioone
- **Intsidendi reageerimise integreerimine**: Ühenda logimissüsteemid automatiseeritud intsidenti reageerimise töövoogudega

### 6. Täiustatud turvaline andmete säilitamine
- **Riistvarapõhised turvamoodulid**: Kasuta HSM-toega võtmete hoidmist (Azure Key Vault, AWS CloudHSM) kriitiliste krüptograafiliste toimingute jaoks
- **Krüpteerimisvõtmete haldus**: Rakenda korrektset võtmete pööramist, segmenteerimist ja ligipääsukontrolli
- **Saladuste haldus**: Hoia kõik API võtmed, märgid ja mandaadid spetsiaalsetes saladuste haldussüsteemides
- **Andmete klassifikatsioon**: Klassifitseeri andmeid tundlikkuse alusel ja rakenda sobivaid kaitsemeetmeid

### 7. Täiustatud märgi haldus
- **Märgi läbipääsu keelamine**: Keela selgelt sihipärased mustrid, mis lubavad märgil turvakontrolle mööda minna
- **Sihtgrupi valideerimine**: Kontrolli alati, et märgi sihtgrupi väited vastaksid planeeritud MCP serveri identiteedile
- **Nõuetele tuginev autoriseerimine**: Rakenda detailset autoriseerimist, mis põhineb märki nõuetel ja kasutaja atribuutidel
- **Märgi sidumine**: Seo märgid sobivalt konkreetsete sessioonide, kasutajate või seadmetega

### 8. Turvaline sessioonihaldus
- **Krüptograafilised sessioonide ID-d**: Loo sessiooni ID-d krüptograafiliselt turvaliste juhuarvugeneraatoritega (mitte ennustatavad järjestused)
- **Kasutajapõhine sidumine**: Seo sessiooni ID-d kasutajapõhise info külge turvalistes formaatides nagu `<user_id>:<session_id>`
- **Sessiooni elutsükli kontrollid**: Rakenda õige sessiooni aegumise, pööramise ja tühistamise mehhanismid
- **Sessiooni turvapäised**: Kasuta sobivaid HTTP turvapäiseid sessiooni kaitseks

### 9. AI-spetsiifilised turvakontrollid
- **Prompt-süstimise kaitse**: Kasuta Microsoft Prompt Shieldsi valgusvihku, eraldajaid ja andmemärgistamise tehnikaid
- **Tööriista mürgitamise vältimine**: Valideeri tööriista metaandmed, jälgi dünaamilisi muudatusi ning veendu tööriista terviklikkuses
- **Mudeli väljundi valideerimine**: Skaneeri mudeli väljundid võimaliku andmelekkega, kahjuliku sisu või turvapoliitika rikkumiste suhtes
- **Kontekstiakna kaitse**: Rakenda kontrollid kontekstiakna mürgitamise ja manipuleerimisrünnakute vältimiseks

### 10. Tööriistade täitmise turvalisus
- **Täitmiskonteinerid**: Käivita tööriistade täitmine konteineriseeritud, isoleeritud keskkondades koos ressursside piirangutega
- **Õiguste eraldamine**: Käivita tööriistad minimaalsete vajalike õigustega ja eraldatud teenusekontodega
- **Võrgueraldus**: Rakenda võrgusegmentatsiooni tööriista täitmise keskkondadele
- **Täitmiskontroll**: Jälgi tööriistade täitmist anomaalia, ressursside kasutuse ja turvareeglite rikkumiste suhtes

### 11. Jätkuv turvakontrolli valideerimine
- **Automatiseeritud turvatestimine**: Integreeri turvatestimine CI/CD torujuhtmetesse tööriistadega nagu GitHub Advanced Security
- **Haavatavuste haldus**: Skaneeri regulaarselt kõiki sõltuvusi, sealhulgas AI mudeleid ja väliseid teenuseid
- **Paigutuste testimine**: Korralda regulaarselt MCP rakendustele suunatud turvaauditeid
- **Turvakoodi ülevaated**: Rakenda kohustuslikud turvakoodi ülevaated kõikide MCP seotud muudatuste puhul

### 12. AI tarneahela turvalisus
- **Komponentide valideerimine**: Kontrolli kõigi AI komponentide (mudelid, embedid, API-d) päritolu, terviklikkust ja turvalisust
- **Sõltuvuste haldus**: Hoolda kõigi tarkvara ja AI sõltuvuste ajakohased inventuurid koos haavatavuste jälgimisega
- **Usaldusväärsed hoidlad**: Kasuta kõigi AI mudelite, raamatukogude ja tööriistade puhul kinnitatud ja usaldusväärseid allikaid
- **Tarneahela monitooring**: Jälgi pidevalt ohte AI teenusepakkujate ja mudelihaldushoidlate kompromiteerimisel

## Täiustatud turvamustrid

### Nullusaldus arhitektuur MCP jaoks
- **Ära kunagi usalda, kontrolli alati**: Rakenda kõigi MCP osaliste pidev kontrollimine
- **Mikrosegmentatsioon**: Isoleeri MCP komponendid detailsete võrgu- ja identiteedikontrollidega
- **Tingimuslik ligipääs**: Rakenda riskipõhist ligipääsukontrolli, mis kohandub konteksti ja käitumisega
- **Jätkuv riskihindamine**: Hinda dünaamiliselt turvaseisu vastavalt praegustele ohusignaalidele

### Privaatsust säilitav AI juurutus
- **Andmete minimiseerimine**: Eksponeeri iga MCP toimingu jaoks vaid minimaalselt vajalikku infot
- **Diferentsiaalne privaatsus**: Rakenda tundlike andmete töötlemisel privaatsust tagavaid meetodeid
- **Homomorfne krüpteerimine**: Kasuta keerukaid krüpteerimismeetodeid turvaliseks arvutamiseks krüpteeritud andmetel
- **Federeeritud õpe**: Rakenda jaotatud õppe lähenemisi, mis säilitavad andmete lokaalsuse ja privaatsuse

### Intsidendireaktsioon AI süsteemide jaoks
- **AI-spetsiifilised intsidenti protseduurid**: Töötada välja intsidenti reageerimise protseduurid, mis on kohandatud AI ja MCP spetsiifilistele ohtudele
- **Automaatne reageerimine**: Rakenda automaatset piiramist ja taastamist levinud AI turvaintsidentide korral  
- **Forensilised võimekused**: Säilita forensilise valmisolek AI süsteemide kompromisside ja andmelekete jaoks
- **Taastamise protseduurid**: Kehtesta protseduurid AI mudeli mürgitamisest, prompt-süstimise rünnakutest ja teenuse kompromiteerimisest taastumiseks

## Rakendamise ressursid ja standardid

### 🏔️ Praktilised turvakoolitused
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Põhjalik praktiline töötuba MCP serverite turvamiseks Azure'is
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Viitearhitektuur ja OWASP MCP Top 10 rakendamise juhised

### Ametlik MCP dokumentatsioon
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Praegune MCP protokolli spetsifikatsioon
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Ametlik turvajuhend
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Autentimise ja autoriseerimise mustrid
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Transpordikihi turvanõuded

### Microsofti turvalahendused
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Täiustatud prompt-süstimise kaitse
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Ulatuslik AI sisu filtreerimine
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Ettevõtte identiteedi ja ligipääsu haldus
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Turvaline saladuste ja mandaadi haldus
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Tarneahela ja kooditurbe skaneerimine

### Turvastandardid ja raamistikud
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Praegused OAuth turvajuhised
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Veebirakenduste turvaohtude riskid
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI-spetsiifilised turvaohtude riskid
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Põhjalik AI riskijuhtimine
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Infoturbe juhtimissüsteemid

### Rakendusjuhendid ja õppevideod
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Ettevõtte autentimistavad
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Identiteedipakkuja integreerimine
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Märgi halduse parimad tavad
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Täiustatud krüpteerimismustrid

### Täiustatud turbaressursid
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Turvalise arenduse tavad
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI-spetsiifiline turvatestimine
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - AI ohumudeli metodoloogia
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Privaatsust tagavad AI tehnikad

### Vastavus ja juhtimine
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Privaatsusnõuetele vastavus AI süsteemides
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Vastutustundlik AI juurutus
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Turvakontrollid AI teenusepakkujatele
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Tervishoiu AI vastavusnõuded

### DevSecOps ja automatiseerimine
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Turvalised AI arendusliinid
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Jätkuv turvakontroll
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Turvaline infrastruktuuri juurutus
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - AI koormuste konteineriseerimise turvalisus

### Jälgimine ja intsidentide haldus  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Ulatuslikud jälgimislahendused
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI-spetsiifilised intsidendi protseduurid
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Turvainformatsiooni ja sündmuste haldus
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - AI ohuteabe allikad

## 🔄 Jätkuv parendamine

### Hoia end kursis muutuva standarditega
- **MCP spetsifikatsiooni uuendused**: Jälgi ametlikke MCP spetsifikatsiooni muudatusi ja turvateateid
- **Ohuteave**: Telli AI turvaohtude uudiseid ja haavatavuste andmebaase
- **Kogukonna kaasamine**: Osaleda MCP turvalisuse kogukonna aruteludes ja töörühmades  
- **Regulaarne hindamine**: Viia läbi kvartaalne turvaseisundi hindamine ja uuendada vastavalt praktikaid  

### Panustamine MCP turvalisusse
- **Turvauuringud**: Panustada MCP turvauuringutesse ja haavatavuste avalikustamise programmidesse  
- **Parimate tavade jagamine**: Jagada turvapaigutusi ja õppetunde kogukonnaga  
- **Standardite arendamine**: Osaleda MCP spetsifikatsiooni arendamises ja turvastandardite loomises  
- **Tööriistade arendus**: Arendada ja jagada turvatööriistu ning -raamatukogusid MCP ökosüsteemi jaoks  

---

*See dokument kajastab MCP turvalisuse parimaid tavasid seisuga 18. detsember 2025, tuginedes MCP spetsifikatsioonile 2025-11-25. Turvalisuse tavasid tuleb regulaarselt üle vaadata ja uuendada vastavalt protokolli ning ohuolukorra arengutele.*  

## Mis järgmiseks  

- Loe: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- Naase: [Security Module Overview](./README.md)  
- Jätka: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:  
See dokument on tõlgitud AI tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi püüame täpsust, palun arvestage, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleb pidada autoriteetseks allikaks. Kriitilise teabe puhul soovitatakse kasutada professionaalse inimtõlke teenust. Me ei vastuta selle tõlke kasutamisest tulenevate arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->