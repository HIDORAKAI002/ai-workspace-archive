# MCP Saugumo Geriausios Praktikos 2025

Ši išsami instrukcija aprašo pagrindines saugumo geriausias praktikas, skirtas Modelio Konteksto Protokolo (MCP) sistemų įgyvendinimui, remiantis naujausia **MCP Specifikacija 2025-11-25** ir dabartiniais pramonės standartais. Šios praktikos apima tiek tradicines saugumo problemas, tiek su dirbtiniu intelektu susijusias grėsmes, būdingas MCP diegimams.

## Kritiniai Saugumo Reikalavimai

### Privalomi Saugumo Kontrolės Elementai (PRIVALOMA)

1. **Žetonų Patvirtinimas**: MCP serveriai **NETURI** priimti jokių žetonų, kurie nebuvo aiškiai išduoti būtent pačiam MCP serveriui  
2. **Autorizacijos Patikra**: MCP serveriai, įgyvendinantys autorizaciją, **PRIVALO** tikrinti VISUS gaunamus užklausimus ir **NETURI** naudoti sesijų autentifikacijai  
3. **Vartotojo Sutikimas**: MCP proxy serveriai, naudojantys statinius klientų ID, **PRIVALO** gauti aiškų vartotojo sutikimą kiekvienam dinamiškai registruotam klientui  
4. **Saugūs Sesijos ID**: MCP serveriai **PRIVALO** naudoti kriptografiškai saugius, nedeterministinius sesijos ID, sugeneruotus su saugiais atsitiktinių skaičių generatoriais  

## Pagrindinės Saugumo Praktikos

### 1. Įvesties Patikra ir Sanitarizavimas
- **Išsami Įvesties Patikra**: Patikrinti ir sanitarizuoti visą įvestį, kad būtų išvengta injekcijos atakų, „confused deputy“ problemų ir įvedimo per klaidą (prompt injection) pažeidžiamumų  
- **Parametrų Schemos Taikymas**: Diegti griežtą JSON schemos validavimą visiems įrankių parametrams ir API įvestims  
- **Turinio Filtravimas**: Naudoti Microsoft Prompt Shields ir Azure Content Safety, kad filtruotumėte kenksmingą turinį klausdami ir atsakymuose  
- **Išvesties Sanitarizavimas**: Tikrinti ir sanitarizuoti visas modelio išvestis prieš jas pateikiant vartotojams ar tolimesnėms sistemoms  

### 2. Autentifikacijos ir Autorizacijos Tobulumas  
- **Išoriniai Tapatybės Teikėjai**: Atiduoti autentifikaciją patikrintiems tapatybės teikėjams (Microsoft Entra ID, OAuth 2.1 teikėjams), o ne kurti kitokią autentifikaciją  
- **Detalios Leidimų Valdymas**: Naudoti smulkų, įrankiui specifinį leidimų valdymą pagal mažiausios privilegijos principą  
- **Žetonų Gyvavimo Valdymas**: Naudoti trumpalaikius prieigos žetonus su saugiu atnaujinimu ir tinkamu auditorijos tikrinimu  
- **Daugelio Veiksnių Autentifikacija**: Reikalauti MFA visam administraciniam patekimui ir jautrioms operacijoms  

### 3. Saugūs Ryšio Protokolai
- **Transporto Sluoksnio Saugumas**: Naudoti HTTPS/TLS 1.3 visiems MCP ryšiams su tinkamu sertifikatų tikrinimu  
- **Galo iki Galo Šifravimas**: Įgyvendinti papildomus šifravimo sluoksnius itin jautriems duomenims perduodant ir saugant  
- **Sertifikatų Valdymas**: Užtikrinti sertifikatų gyvavimo ciklo valdymą su automatiniu atnaujinimu  
- **Protokolo Versijos Laikymasis**: Naudoti dabartinę MCP protokolo versiją (2025-11-25) su tinkamu versijos derinimu  

### 4. Išplėstinė Dažnio Apribojimas ir Išteklių Apsauga
- **Daugiapakopis Dažnio Apribojimas**: Įgyvendinti apribojimus vartotojo, sesijos, įrankio ir išteklių lygiuose, kad išvengti piktnaudžiavimo  
- **Adaptuojamas Dažnio Apribojimas**: Naudoti mašininio mokymosi metodu pagrįstą dažnio apribojimą, kuris prisitaiko prie naudojimo modelių ir grėsmių požymių  
- **Išteklių Kvotų Valdymas**: Nustatyti tinkamus apribojimus skaičiavimo ištekliams, atminčiai ir vykdymo laikui  
- **DDoS Apsauga**: Diegti išsamią DDoS apsaugą ir srauto analizės sistemas  

### 5. Išsamus Audito Registravimas ir Stebėsena
- **Struktūruotas Audito Registravimas**: Įgyvendinti detalizuotas, paieškai tinkamas žurnalų sistemas visoms MCP operacijoms, įrankių vykdymui ir saugumo įvykiams  
- **Realiojo Laiko Saugumo Stebėsena**: Diegti SIEM sistemas su DI pagrįsta anomalijų aptikimu MCP darbo krūviams  
- **Privatumą Gerbiantis Registravimas**: Registruoti saugumo įvykius gerbiant duomenų privatumo reikalavimus ir reglamentus  
- **Incidentų Valdymo Integracija**: Susieti žurnalų sistemas su automatizuotomis įvykių reagavimo darbo eigomis  

### 6. Patobulintos Saugios Saugojimo Praktikos
- **Aparatinės Saugumo Moduliai**: Naudoti HSM pagrįstą raktų saugyklą (Azure Key Vault, AWS CloudHSM) kritinėms kriptografijos operacijoms  
- **Šifravimo Raktų Valdymas**: Įgyvendinti tinkamą raktų sukimą, atskyrimą ir prieigos kontrolę šifravimo raktams  
- **Slapčių Valdymas**: Laikyti visus API raktus, žetonus ir kredencialus specializuotose slapčių valdymo sistemose  
- **Duomenų Klasifikavimas**: Klasifikuoti duomenis pagal jautrumo lygį ir taikyti tinkamas apsaugos priemones  

### 7. Išplėstinė Žetonų Valdymas
- **Žetonų Persiuntimo Užkardymas**: Aiškiai uždrausti modelius, kuriuose žetonai apeina saugumo kontrolę  
- **Auditorijos Validacija**: Visada tikrinti, ar žetono auditorijos teiginiai atitinka ketinamo MCP serverio tapatybę  
- **Teiginių Pagrindu Autorizacija**: Įgyvendinti smulkią autorizaciją pagal žetono teiginius ir vartotojo atributus  
- **Žetonų Susiejimas**: Pririšti žetonus prie konkrečių sesijų, vartotojų ar įrenginių, kai tai tinka  

### 8. Saugus Sesijos Valdymas
- **Kriptografiniai Sesijos ID**: Generuoti sesijos ID naudojant kriptografiškai saugius atsitiktinių skaičių generatorius (neprognozuojamus sekas)  
- **Vartotojo Specifinis Susiejimas**: Susieti sesijos ID su vartotojo informacija naudojant saugius formatus, pvz., `<user_id>:<session_id>`  
- **Sesijos Gyvavimo Valdymas**: Įgyvendinti tinkamą sesijos galiojimo pabaigos, sukimo ir nebegaliojimo mechanizmus  
- **Sesijos Saugumo Antraštės**: Naudoti tinkamas HTTP saugumo antraštes sesijos apsaugai  

### 9. AI-Specifinės Saugumo Kontrolės
- **Injekcijos Įvedimų Gynyba**: Diegti Microsoft Prompt Shields su spotlightinimu, atskyrimo ženklais ir duomenų žymėjimo metodais  
- **Įrankių Užnuodijimo Prevencija**: Tikrinti įrankių metaduomenis, stebėti dinamiškus pakeitimus ir tikrinti įrankių vientisumą  
- **Modelio Išvesties Patikra**: Skenuoti modelio išvestis dėl galimų duomenų nutekėjimo, žalingo turinio ar saugumo politikos pažeidimų  
- **Konteksto Langų Apsauga**: Įgyvendinti kontrolę, kad nebūtų užnuodytas ar manipuliuotas konteksto langas  

### 10. Įrankių Vykdymo Saugumas
- **Vykdymo Aplinka**: Vykdyti įrankius izoliuotose konteinerizuotose aplinkose su išteklių apribojimais  
- **Privilegijų Atgarsis**: Vykdyti įrankius su minimaliomis reikalingomis privilegijomis ir atskirais servisų paskyromis  
- **Tinklo Izoliacija**: Diegti tinklo segmentaciją įrankių vykdymo aplinkoms  
- **Vykdymo Stebėsena**: Stebėti įrankių vykdymą dėl anomalijų, išteklių naudojimo ir saugumo pažeidimų  

### 11. Nuolatinė Saugumo Patikra
- **Automatizuotas Saugumo Testavimas**: Integruoti saugumo testavimą į CI/CD procesus su tokiais įrankiais kaip GitHub Advanced Security  
- **Pažeidžiamumų Valdymas**: Reguliariai tikrinti visas priklausomybes, įskaitant DI modelius ir išorines paslaugas  
- **Įsiskverbimo Testavimas**: Reguliariai vykdyti saugumo įvertinimus, ypač MCP diegimams  
- **Saugumo Kodo Apžvalgos**: Įgyvendinti privalomas saugumo apžvalgas visiems MCP susijusiems kodo pakeitimams  

### 12. Tiekimo Grandinės Saugumas AI
- **Komponentų Patvirtinimas**: Tikrinti visų DI komponentų (modelių, įterpimų, API) kilmę, vientisumą ir saugumą  
- **Priklausomybių Valdymas**: Palaikyti atnaujintas visų programinės įrangos ir DI priklausomybių inventorizacijas su pažeidžiamumo sekimu  
- **Patikimi Saugyklos Šaltiniai**: Naudoti patikrintus, patikimus šaltinius visiems DI modeliams, bibliotekoms ir įrankiams  
- **Tiekimo Grandinės Stebėsena**: Nuolat stebėti DI paslaugų teikėjų ir modelių saugyklų kompromisus  

## Pažangios Saugumo Architektūros Modeliai

### Nulinės Pasitikėjimo Architektūra MCP
- **Niekada nepasitikėti, visada tikrinti**: Diegti nuolatinį patikrinimą visiems MCP dalyviams  
- **Mikrosegmentacija**: Izoliuoti MCP komponentus su smulkiais tinklo ir tapatybės valdikliais  
- **Sąlyginė Prieiga**: Diegti rizika pagrįstą prieigos valdymą, kuris prisitaiko prie konteksto ir elgsenos  
- **Nuolatinė Rizikos Įvertinimas**: Dinamiškai vertinti saugumo būklę pagal dabartinius grėsmių požymius  

### Privatumo Apsaugotas DI Įgyvendinimas
- **Duomenų Minimalizavimas**: Atverti tik būtiniausius duomenis kiekvienai MCP operacijai  
- **Diferencinė Privatumas**: Naudoti privatumą saugančias technikas jautrių duomenų apdorojimui  
- **Homomorfinis Šifravimas**: Taikyti pažangias šifravimo metodikas saugiam skaičiavimui šifruotuose duomenyse  
- **Federuotas Mokymasis**: Įgyvendinti paskirstyto mokymosi metodus, saugančius duomenų lokalumą ir privatumą  

### AI Sistemų Incidentų Valdymas
- **DI-specifinės Incidentų Procedūros**: Parengti incidentų valdymo procedūras pritaikytas DI ir MCP grėsmėms  
- **Automatizuotas reagavimas**: Įgyvendinti automatizuotus sulaikymo ir šalinimo veiksmus dažniausiems DI saugumo incidentams  
- **Teisėsaugos Galimybės**: Palaikyti pasiruošimą teismo ekspertizėms DI sistemų pažeidimo ir duomenų nutekėjimo atvejais  
- **Atsistatymo Procedūros**: Nustatyti procedūras DI modelių užnuodijimo, įvedimo injekcijos atakų ir paslaugų pažeidimų atkūrimui  

## Įgyvendinimo Ištekliai ir Standartai

### 🏔️ Praktiniai Saugumo Mokymai
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Išsamus praktinis seminaras apie MCP serverių apsaugą Azure aplinkoje  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referencinė architektūra ir OWASP MCP Top 10 įgyvendinimo gairės  

### Oficiali MCP Dokumentacija
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Dabartinės MCP protokolo specifikacijos  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Oficiali saugumo gairė  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Autentifikacijos ir autorizacijos modeliai  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Transporto sluoksnio saugumo reikalavimai  

### Microsoft Saugumo Sprendimai
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Pažangi apsauga nuo įvedimo injekcijų   
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Išsamus DI turinio filtravimas  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Įmonių tapatybės ir prieigos valdymas  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Saugus slapčių ir kredencialų valdymas  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Tiekimo grandinės ir kodo saugumo skanavimas  

### Saugumo Standartai ir Sistemos
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Dabartinės OAuth saugumo gairės  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Interneto programų saugumo rizikos  
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - DI specifinės saugumo rizikos  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Išsamus DI rizikos valdymas  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Informacijos saugumo valdymo sistemos  

### Įgyvendinimo Vadovai ir Pamokos
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Įmonių autentifikacijos modeliai  
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Tapatybės teikėjo integracija  
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Žetonų valdymo geriausios praktikos  
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Pažangūs šifravimo modeliai  

### Pažangūs Saugumo Ištekliai
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Saugios kūrimo praktikos  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - DI specifiško saugumo testavimas  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - DI grėsmių modeliavimo metodika  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Privatumo saugančios DI technologijos  

### Atitiktis ir Valdymas
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Privatumo atitiktis DI sistemose  
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Atsakingas DI įgyvendinimas  
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Saugumo kontrolės DI paslaugų teikėjams  
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Sveikatos priežiūros DI atitikties reikalavimai  

### DevSecOps ir Automatizavimas
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Saugūs DI kūrimo procesai  
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Nuolatinė saugumo patikra  
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Saugus infrastruktūros diegimas  
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - DI užduočių konteinerizacijos saugumas  

### Stebėsena ir Incidentų Valdymas  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Išsamūs stebėjimo sprendimai  
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - DI specifiškos incidentų procedūros  
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Saugumo informacijos ir įvykių valdymas  
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - DI grėsmės žvalgybos šaltiniai  

## 🔄 Nuolatinis Tobulėjimas

### Laikyti atnaujinimus su besikeičiančiais standartais
- **MCP Specifikacijos Atnaujinimai**: Stebėti oficialius MCP specifikacijos pakeitimus ir saugumo įspėjimus  
- **Grėsmių Žvalgyba**: Užsiprenumeruoti DI saugumo grėsmių informacijos srautus ir pažeidžiamumų duomenų bazes  
- **Bendruomenės įsitraukimas**: Dalyvauti MCP saugumo bendruomenės diskusijose ir darbo grupėse
- **Reguliarus vertinimas**: Kas ketvirtį atlikti saugumo būklės vertinimus ir atnaujinti praktiką pagal tai

### Indėlis į MCP saugumą
- **Saugumo tyrimai**: Prisidėti prie MCP saugumo tyrimų ir pažeidžiamumų atskleidimo programų
- **Geriausios praktikos dalijimasis**: Bendruomenėje dalytis saugumo įgyvendinimais ir įgytomis pamokomis
- **Standartų kūrimas**: Dalyvauti MCP specifikacijų kūrime ir saugumo standartų rengime
- **Įrankių kūrimas**: Kurti ir dalytis saugumo įrankiais bei bibliotekomis MCP ekosistemai

---

*Šis dokumentas atspindi MCP saugumo gerąsias praktikas nuo 2025 m. gruodžio 18 d., remiantis MCP specifikacija 2025-11-25. Saugumo praktikas reikėtų reguliariai peržiūrėti ir atnaujinti, kai vystosi protokolas ir grėsmių aplinka.*

## Kas toliau

- Skaityti: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Grįžti į: [Security Module Overview](./README.md)
- Tęsti: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės atsisakymas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas gimtąja kalba turi būti laikomas autoritetingu šaltiniu. Kritinei informacijai rekomenduojamas profesionalus žmogaus vertimas. Mes neatsakome už jokius nesusipratimus ar neteisingus aiškinimus, kylantčius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->