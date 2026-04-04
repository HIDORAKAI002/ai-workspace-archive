# MCP Säkerhetsbästa metoder 2025

Denna omfattande guide beskriver grundläggande säkerhetsbästa metoder för implementering av Model Context Protocol (MCP)-system baserat på den senaste **MCP-specifikationen 2025-11-25** och aktuella branschstandarder. Dessa metoder tar upp både traditionella säkerhetsfrågor och AI-specifika hot unika för MCP-implementationer.

## Kritiska säkerhetskrav

### Obligatoriska säkerhetskontroller (MÅSTE-krav)

1. **Tokenvalidering**: MCP-servrar **FÅR INTE** acceptera några tokens som inte uttryckligen utfärdats för MCP-servern själv  
2. **Behörighetsverifiering**: MCP-servrar som implementerar auktorisering **MÅSTE** verifiera ALLA inkommande förfrågningar och **FÅR INTE** använda sessioner för autentisering  
3. **Användarsamtycke**: MCP-proxyservrar som använder statiska klient-ID:n **MÅSTE** inhämta uttryckligt användarsamtycke för varje dynamiskt registrerad klient  
4. **Säkra session-ID:n**: MCP-servrar **MÅSTE** använda kryptografiskt säkra, icke-deterministiska session-ID:n genererade med säkra slumpmässiga talgeneratorer  

## Kärnsäkerhetspraxis

### 1. Indatavalidering och sanering
- **Omfattande indatavalidering**: Validera och sanera all input för att förhindra injektionsattacker, confused deputy-problem och promptinjektionssårbarheter  
- **Efterlevnad av parameterschema**: Implementera strikt JSON-schema validering för alla verktygsparametrar och API-indata  
- **Innehållsfiltrering**: Använd Microsoft Prompt Shields och Azure Content Safety för att filtrera skadligt innehåll i prompts och svar  
- **Utdata-sanering**: Validera och sanera all modellutdata innan presentation till användare eller nedströms system  

### 2. Framstående autentisering och auktorisering  
- **Externa identitetsleverantörer**: Delegera autentisering till etablerade identitetsleverantörer (Microsoft Entra ID, OAuth 2.1-leverantörer) istället för att implementera egen autentisering  
- **Finmaskiga behörigheter**: Implementera granulära, verktygsspecifika behörigheter enligt principen om minsta privilegium  
- **Tokenlivscykelhantering**: Använd kortlivade åtkomsttoken med säker rotation och korrekt målgruppsvalidering  
- **Multifaktorautentisering**: Kräver MFA för all administrativ åtkomst och känsliga operationer  

### 3. Säkra kommunikationsprotokoll
- **Transport Layer Security**: Använd HTTPS/TLS 1.3 för all MCP-kommunikation med korrekt certifikatvalidering  
- **End-to-End-kryptering**: Implementera ytterligare krypteringslager för högkänslig data i transit och vila  
- **Certifikathantering**: Upprätthåll korrekt certifikatslivscykelhantering med automatiserade förnyelseprocesser  
- **Protokollversionsuppfyllnad**: Använd aktuell MCP-protokollversion (2025-11-25) med korrekt versionsförhandling  

### 4. Avancerad hastighetsbegränsning och resurskydd
- **Flerlager-hastighetsbegränsning**: Implementera hastighetsbegränsningar på användar-, session-, verktygs- och resursnivå för att förhindra missbruk  
- **Adaptiv hastighetsbegränsning**: Använd maskininlärningsbaserad hastighetsbegränsning som anpassas efter användningsmönster och hotindikatorer  
- **Resurskvotshantering**: Sätt lämpliga gränser för datorkraft, minnesanvändning och exekveringstid  
- **DDoS-skydd**: Distribuera omfattande DDoS-skydd och trafikanalysystem  

### 5. Omfattande loggning och övervakning
- **Strukturerad revisionsloggning**: Implementera detaljerade, sökbara loggar för alla MCP-operationer, verktygskörningar och säkerhetshändelser  
- **Säkerhetsövervakning i realtid**: Distribuera SIEM-system med AI-driven anomalidetektion för MCP-arbetsbelastningar  
- **Integritetsskyddad loggning**: Logga säkerhetshändelser samtidigt som dataskyddsregler och integritetskrav efterlevs  
- **Integration för incidenthantering**: Koppla loggsystem till automatiserade incidenthanteringsarbetsflöden  

### 6. Förbättrade säker lagringsrutiner
- **Hårdvarusäkerhetsmoduler**: Använd HSM-baserad nyckellagring (Azure Key Vault, AWS CloudHSM) för kritiska kryptografiska operationer  
- **Hantera krypteringsnycklar**: Implementera korrekt nyckelrotation, segregation och åtkomstkontroller för krypteringsnycklar  
- **Hantera hemligheter**: Lagra alla API-nycklar, tokens och autentiseringsuppgifter i dedikerade hemlighetshanteringssystem  
- **Dataklassificering**: Klassificera data baserat på känslighetsnivåer och tillämpa lämpliga skyddsåtgärder  

### 7. Avancerad tokenhantering
- **Förhindra token-passthrough**: Uttryckligen förbjud token-passthrough-mönster som kringgår säkerhetskontroller  
- **Målgruppsvalidering**: Verifiera alltid att tokenets målgruppspåståenden stämmer överens med avsedd MCP-serveridentitet  
- **Auktorisering baserad på claims**: Implementera granulär auktorisering baserat på tokenclaims och användarattribut  
- **Tokenbinding**: Bind tokens till specifika sessioner, användare eller enheter där det är lämpligt  

### 8. Säker sessionhantering
- **Kryptografiska session-ID:n**: Generera session-ID:n med kryptografiskt säkra slumpmässiga talgeneratorer (ej förutsägbara sekvenser)  
- **Användarspecifik bindning**: Binda session-ID:n till användarspecifik information med säkra format som `<user_id>:<session_id>`  
- **Sessionlivscykelkontroller**: Implementera riktig sessionsutgång, rotation och ogiltigförklaring  
- **Sessionssäkerhetshuvuden**: Använd lämpliga HTTP-säkerhetshuvuden för sessionsskydd  

### 9. AI-specifika säkerhetskontroller
- **Försvar mot promptinjektion**: Distribuera Microsoft Prompt Shields med spotlight, avgränsare och datamärkningsmetoder  
- **Förhindra verktygsförgiftning**: Validera verktygsmetadata, övervaka dynamiska ändringar och verifiera verktygsintegritet  
- **Validering av modellutdata**: Skanna modellutdata för potentiell dataläckage, skadligt innehåll eller brott mot säkerhetspolicys  
- **Skydd av kontextfönster**: Implementera kontroller för att förhindra kontextfönsterförgiftning och manipulationsattacker  

### 10. Säker verktygsexekvering
- **Sandboxad exekvering**: Kör verktygsexekveringar i containeriserade, isolerade miljöer med resursbegränsningar  
- **Behörighetsseparation**: Kör verktyg med minsta nödvändiga rättigheter och separata tjänstekonton  
- **Nätverksisolering**: Implementera nätverkssegmentering för verktygsexekveringsmiljöer  
- **Övervakning av exekvering**: Övervaka verktygsexekvering för avvikande beteenden, resursanvändning och säkerhetsöverträdelser  

### 11. Kontinuerlig säkerhetsvalidering
- **Automatiserad säkerhetstestning**: Integrera säkerhetstestning i CI/CD-pipelines med verktyg som GitHub Advanced Security  
- **Sårbarhetshantering**: Skanna regelbundet alla beroenden, inklusive AI-modeller och externa tjänster  
- **Penetrationstestning**: Utför regelbundna säkerhetsbedömningar med särskilt fokus på MCP-implementationer  
- **Kodgranskning för säkerhet**: Implementera obligatoriska säkerhetsgranskningar för alla MCP-relaterade kodändringar  

### 12. Leverantörskedjesäkerhet för AI
- **Komponentverifiering**: Verifiera ursprung, integritet och säkerhet för alla AI-komponenter (modeller, embeddings, API:er)  
- **Beroendehantering**: Underhåll aktuella inventarier över all mjukvara och AI-beroenden med sårbarhetsspårning  
- **Betrodda arkiv**: Använd verifierade, betrodda källor för alla AI-modeller, bibliotek och verktyg  
- **Övervakning av leverantörskedja**: Övervaka kontinuerligt för kompromettering hos AI-tjänsteleverantörer och modularkiv  

## Avancerade säkerhetsmönster

### Zero Trust-arkitektur för MCP
- **Lita aldrig, verifiera alltid**: Implementera kontinuerlig verifiering för alla MCP-deltagare  
- **Mikrosegmentering**: Isolera MCP-komponenter med granulära nätverks- och identitetskontroller  
- **Villkorlig åtkomst**: Implementera riskbaserade åtkomstkontroller som anpassas efter kontext och beteende  
- **Kontinuerlig riskbedömning**: Dynamisk utvärdering av säkerhetsläge baserat på aktuella hotindikatorer  

### Integritetsbevarande AI-implementering
- **Dataminimering**: Exponera endast minsta nödvändiga data för varje MCP-operation  
- **Differential Integritet**: Implementera integritetsbevarande tekniker för känslig databehandling  
- **Homomorf kryptering**: Använd avancerade krypteringstekniker för säker beräkning på krypterad data  
- **Federated Learning**: Implementera distribuerade inlärningsmetoder som bevarar datalokalisering och integritet  

### Incidenthantering för AI-system
- **AI-specifika incidentprocedurer**: Utveckla incidenthanteringsrutiner anpassade till AI- och MCP-specifika hot  
- **Automatiserad respons**: Implementera automatisk avgränsning och åtgärdande för vanliga AI-säkerhetsincidenter  
- **Rättsmedicinska förmågor**: Upprätthåll beredskap för rättsmedicinska undersökningar vid AI-systemkompromisser och dataintrång  
- **Återställningsprocedurer**: Etablera rutiner för återhämtning från AI-modellförgiftning, promptinjektionsattacker och tjänstekompromisser  

## Implementeringsresurser och standarder

### 🏔️ Praktisk säkerhetsutbildning
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattande praktisk workshop för att säkra MCP-servrar i Azure  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referensarkitektur och OWASP MCP Top 10-implementeringsvägledning  

### Officiell MCP-dokumentation
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Aktuell MCP-protokollsbeskrivning  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Officiell säkerhetsvägledning  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Autentiserings- och auktoriseringsmönster  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Krav på transportsäkerhet  

### Microsofts säkerhetslösningar
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Avancerat skydd mot promptinjektion  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Omfattande AI-innehållsfiltrering  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Företagsidentitet och åtkomsthantering  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Säker hantering av hemligheter och autentiseringsuppgifter  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Säkerhetsgranskning av leverantörskedja och kod  

### Säkerhetsstandarder och ramverk
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Aktuell OAuth-säkerhetsvägledning  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Risker för webbapplikationssäkerhet  
- [OWASP Top 10 för LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI-specifika säkerhetsrisker  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Omfattande AI-riskhantering  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Ledningssystem för informationssäkerhet  

### Implementeringsguider och tutorials
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Företagsautentiseringsmönster  
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integration av identitetsleverantör  
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Bästa praxis för tokenhantering  
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Avancerade krypteringsmönster  

### Avancerade säkerhetsresurser
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Säker utvecklingspraxis  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI-specifik säkerhetstestning  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodik för AI-hotmodellering  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Integritetsbevarande AI-tekniker  

### Efterlevnad och styrning
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Integritetsöverensstämmelse för AI-system  
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Ansvarsfull AI-implementering  
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Säkerhetskontroller för AI-tjänsteleverantörer  
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Efterlevnadskrav för AI inom vården  

### DevSecOps och automation
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Säker AI-utveckling i pipelines  
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Kontinuerlig säkerhetsvalidering  
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Säker infrastrukturdistribution  
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Säker containerisering av AI-arbetsbelastningar  

### Övervakning och incidenthantering  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Omfattande övervakningslösningar  
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI-specifika incidentrutiner  
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Säkerhetsinformations- och händelsehantering  
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Hotintelligenskällor för AI  

## 🔄 Kontinuerlig förbättring

### Håll dig uppdaterad med utvecklande standarder
- **MCP-specifikationsuppdateringar**: Följ officiella MCP-specifikationsändringar och säkerhetsmeddelanden  
- **Hotintelligens**: Prenumerera på AI-säkerhetshotflöden och sårbarhetsdatabaser  
- **Communityengagemang**: Delta i MCP:s säkerhetsgemenskap och arbetsgrupper
- **Regelbunden bedömning**: Genomför kvartalsvisa bedömningar av säkerhetsläget och uppdatera rutiner därefter

### Bidra till MCP-säkerhet
- **Säkerhetsforskning**: Bidra till MCP:s säkerhetsforskning och program för sårbarhetsrapportering
- **Delning av bästa praxis**: Dela säkerhetsimplementeringar och erfarenheter med gemenskapen
- **Standardutveckling**: Delta i utvecklingen av MCP-specifikationer och skapandet av säkerhetsstandarder
- **Verktygsutveckling**: Utveckla och dela säkerhetsverktyg och bibliotek för MCP-ekosystemet

---

*Detta dokument speglar MCP:s säkerhetsbästa praxis per 18 december 2025, baserat på MCP-specifikation 2025-11-25. Säkerhetspraxis bör regelbundet ses över och uppdateras i takt med att protokollet och hotlandskapet utvecklas.*

## Vad händer härnäst

- Läs: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Gå tillbaka till: [Security Module Overview](./README.md)
- Fortsätt till: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet bör du vara medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För viktig information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för eventuella missförstånd eller feltolkningar som uppstår vid användning av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->