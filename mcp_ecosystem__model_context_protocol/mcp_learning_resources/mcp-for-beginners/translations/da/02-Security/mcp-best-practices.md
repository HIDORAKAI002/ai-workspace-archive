# MCP Security Best Practices 2025

Denne omfattende vejledning skitserer væsentlige sikkerhedspraksis for implementering af Model Context Protocol (MCP) systemer baseret på den seneste **MCP-specifikation 2025-11-25** og aktuelle industristandarder. Disse praksisser adresserer både traditionelle sikkerhedsbekymringer og AI-specifikke trusler unikke for MCP-udrulninger.

## Kritiske sikkerhedskrav

### Obligatoriske sikkerhedskontroller (MUST-krav)

1. **Tokenvalidering**: MCP-servere **MÅ IKKE** acceptere nogen tokens, der ikke eksplicit er udstedt til MCP-serveren selv
2. **Autorisationverifikation**: MCP-servere, der implementerer autorisation, **SKAL** verificere ALLE indgående anmodninger og **MÅ IKKE** bruge sessioner til autentifikation  
3. **Brugersamtykke**: MCP-proxyservere, der bruger statiske klient-ID’er, **SKAL** indhente eksplicit brugersamtykke for hver dynamisk registreret klient
4. **Sikre session-ID’er**: MCP-servere **SKAL** bruge kryptografisk sikre, ikke-deterministiske session-ID’er genereret med sikre tilfældighedsgeneratorer

## Kerne sikkerhedspraksis

### 1. Inputvalidering & Sanitering
- **Omfattende inputvalidering**: Valider og saniter alle input for at forhindre injektionsangreb, forvirret stedsforvalter-problemer og promptinjektionssårbarheder
- **Parametreskema håndhævelse**: Implementer streng JSON-skema validering for alle værktøjsparametre og API-input
- **Indholdsfiltrering**: Brug Microsoft Prompt Shields og Azure Content Safety til at filtrere ondsindet indhold i prompts og svar
- **Outputsanitering**: Valider og saniter alle modeloutput før præsentation til brugere eller efterfølgende systemer

### 2. Autentifikation & Autorisation i topklasse  
- **Eksterne identitetsudbydere**: Deleger autentifikation til etablerede identitetsudbydere (Microsoft Entra ID, OAuth 2.1-udbydere) i stedet for at implementere brugerdefineret autentifikation
- **Finmaskede tilladelser**: Implementer granulære, værktøjsspecifikke tilladelser efter princippet om mindst privilegium
- **Token livscyklusstyring**: Brug kortlivede adgangstokener med sikker rotation og korrekt Audience-validering
- **Multi-faktor autentifikation**: Kræv MFA for al administrativ adgang og sensitive operationer

### 3. Sikre kommunikationsprotokoller
- **Transportlagssikkerhed**: Brug HTTPS/TLS 1.3 til al MCP-kommunikation med korrekt certifikatvalidering
- **End-to-end kryptering**: Implementer yderligere krypteringslag for højt følsomme data under overførsel og i hvile
- **Certifikathåndtering**: Oprethold korrekt certifikatlivscyklus med automatiserede fornyelsesprocesser
- **Protokolversionshåndhævelse**: Brug den nuværende MCP-protokolversion (2025-11-25) med korrekt versionsforhandling.

### 4. Avanceret Rate Limiting & Ressourcebeskyttelse
- **Multi-lags rate limiting**: Implementer rate limiting på bruger-, session-, værktøjs- og ressourceniveau for at forhindre misbrug
- **Adaptiv rate limiting**: Brug maskinlæringsbaseret rate limiting, der tilpasser sig brugsmønstre og trusselsindikatorer
- **Ressourcekvotastyring**: Sæt passende grænser for beregningsressourcer, hukommelsesbrug og eksekveringstid
- **DDoS-beskyttelse**: Implementer omfattende DDoS-beskyttelse og trafikanalysesystemer

### 5. Omfattende logning & overvågning
- **Struktureret auditlogning**: Implementer detaljerede, søgbare logs for alle MCP-operationer, værktøjseksekveringer og sikkerhedshændelser
- **Sikkerhedsovervågning i realtid**: Udrul SIEM-systemer med AI-drevet anomalidetektion til MCP-arbejdsmængder
- **Databeskyttelseskompatibel logning**: Log sikkerhedshændelser samtidig med respekt for databeskyttelseskrav og regulativer
- **Integreret hændelseshåndtering**: Forbind logningssystemer til automatiserede hændelsesrespons workflows

### 6. Forbedrede sikre lagringspraksisser
- **Hardware sikkerhedsmoduler**: Brug HSM-understøttet nøglelagring (Azure Key Vault, AWS CloudHSM) til kritiske kryptografiske operationer
- **Krypteringsnøglehåndtering**: Implementer korrekt nøglerotation, opdeling og adgangskontrol for krypteringsnøgler
- **Secrets management**: Opbevar alle API-nøgler, tokens og legitimationsoplysninger i dedikerede sekretstyringssystemer
- **Dataklassificering**: Klassificer data baseret på følsomhedsniveauer og anvend passende beskyttelsesforanstaltninger

### 7. Avanceret tokenhåndtering
- **Forebyggelse af tokenpassthrough**: Forbyd eksplicit tokenpassthrough-mønstre, der omgår sikkerhedskontroller
- **Audience-validering**: Verificer altid token-audience claims, så de matcher den tilsigtede MCP-serveridentitet
- **Claimsbaseret autorisation**: Implementer finmasket autorisation baseret på tokenclaims og brugerattributter
- **Token-binding**: Bind tokens til specifikke sessioner, brugere eller enheder hvor det er relevant

### 8. Sikker sessionstyring
- **Kryptografiske session-ID’er**: Generer session-ID’er ved brug af kryptografisk sikre tilfældighedsgeneratorer (ikke forudsigelige sekvenser)
- **Brugerspecifik binding**: Bind session-ID’er til brugerspecifik information ved hjælp af sikre formater som `<user_id>:<session_id>`
- **Session livscyklus-kontroller**: Implementer korrekt udløb, rotation og ugyldiggørelsesmekanismer for sessioner
- **Sikkerhedshoveder til sessioner**: Brug passende HTTP-sikkerhedshoveder til sessionsbeskyttelse

### 9. AI-specifikke sikkerhedskontroller
- **Forsvar mod promptinjektion**: Brug Microsoft Prompt Shields med spotlighting, afgrænsere og datamarkerings-teknikker
- **Forebyggelse af værktøjsforgiftning**: Valider værktøjsmetadata, overvåg dynamiske ændringer, og verificer værktøjsintegritet
- **Modeloutputvalidering**: Scan modeloutput for potentiel datalækage, skadeligt indhold eller sikkerhedspolitikovertrædelser
- **Beskyttelse af kontekstvindue**: Implementer kontroller for at forhindre kontekstvinduesforgiftning og manipulationsangreb

### 10. Værktøjseksekveringssikkerhed
- **Eksekvering i sandbox**: Kør værktøjs-eksekveringer i containeriserede, isolerede miljøer med ressourcegrænser
- **Adskillelse af privilegier**: Eksekver værktøjer med minimale nødvendige privilegier og separate servicekonti
- **Netværksisolering**: Implementer netværkssegmentering for værktøjseksekveringsmiljøer
- **Overvågning af eksekvering**: Overvåg værktøjseksekvering for unormal adfærd, ressourceforbrug og sikkerhedsovertrædelser

### 11. Kontinuerlig sikkerhedsvalidering
- **Automatiseret sikkerhedstest**: Integrer sikkerhedstest i CI/CD pipelines med værktøjer som GitHub Advanced Security
- **Sårbarhedsstyring**: Scan regelmæssigt alle afhængigheder, inklusive AI-modeller og eksterne tjenester
- **Penetrationstest**: Udfør regelmæssige sikkerhedsvurderinger specifikt målrettet MCP-implementeringer
- **Sikkerhedskodegennemgange**: Implementer obligatoriske sikkerhedsgennemgange for alle MCP-relaterede kodeændringer

### 12. Supply Chain-sikkerhed for AI
- **Komponentverifikation**: Verificer oprindelse, integritet og sikkerhed for alle AI-komponenter (modeller, embeddings, API’er)
- **Afhængighedsstyring**: Oprethold aktuelle oversigter over al software og AI-afhængigheder med sårbarhedssporing
- **Betroede repositories**: Brug verificerede, betroede kilder til alle AI-modeller, biblioteker og værktøjer
- **Overvågning af supply chain**: Overvåg løbende for kompromitteringer i AI-tjenesteudbydere og modelrepositories

## Avancerede sikkerhedsmønstre

### Zero Trust-arkitektur til MCP
- **Aldrig tillid, altid verifikation**: Implementer kontinuerlig verifikation for alle MCP-deltagere
- **Micro-segmentering**: Isoler MCP-komponenter med granulære netværks- og identitetskontroller
- **Betinget adgang**: Implementer risikobaserede adgangskontroller, der tilpasses kontekst og adfærd
- **Kontinuerlig risikovurdering**: Evaluer dynamisk sikkerhedsstilling baseret på aktuelle trusselsindikatorer

### Privatlivsbevarende AI-implementering
- **Dataminimering**: Eksponer kun minimum nødvendige data for hver MCP-operation
- **Differential privacy**: Implementer privatlivsbevarende teknikker til følsom databehandling
- **Homomorf kryptering**: Brug avancerede krypteringsteknikker til sikker behandling af krypterede data
- **Federated learning**: Implementer distribuerede læringsmetoder, der bevarer datalokalisering og privatliv

### Hændelseshåndtering for AI-systemer
- **AI-specifikke hændelsesprocedurer**: Udarbejd hændelsesresponsprocedurer tilpasset AI- og MCP-specifikke trusler
- **Automatiseret respons**: Implementer automatiseret inddæmning og udbedring for almindelige AI-sikkerhedshændelser  
- **Retstekniske kapabiliteter**: Oprethold beredskab til retstekniske undersøgelser ved AI-system kompromitteringer og databrud
- **Gendannelsesprocedurer**: Etabler procedurer til genopretning fra AI-modelforgiftning, promptinjektionsangreb og tjenestekompromitteringer

## Implementeringsressourcer & standarder

### 🏔️ Praktisk sikkerhedstræning
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattende praktisk workshop til sikring af MCP-servere i Azure
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referencearkitektur og OWASP MCP Top 10 implementeringsvejledning

### Officiel MCP dokumentation
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Aktuel MCP-protokolspecifikation
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Officiel sikkerhedsguide
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Autentifikations- og autorisationsmønstre
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Transportlagsikkerhedskrav

### Microsoft sikkerhedsløsninger
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Avanceret promptinjektionsbeskyttelse
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Omfattende AI-indholdsfiltrering
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Enterprise identitets- og adgangsstyring
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Sikker hemmeligheds- og legitimationshåndtering
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Supply chain og kode sikkerhedsscanning

### Sikkerhedsstandarder & rammer
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Aktuel OAuth sikkerhedsguide
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Webapplikationssikkerhedsrisici
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI-specifikke sikkerhedsrisici
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Omfattende AI risikostyring
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Informationssikkerhedsledelsessystemer

### Implementeringsvejledninger & tutorials
- [Azure API Management som MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Enterprisetilladelsesmønstre
- [Microsoft Entra ID med MCP Servere](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integration af identitetsudbyder
- [Sikker tokenlagring implementering](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Bedste praksis for tokenstyring
- [End-to-end kryptering for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Avancerede krypteringsmønstre

### Avancerede sikkerhedsressourcer
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Sikker udviklingspraksis
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI-specifik sikkerhedstest
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - AI trusselsmodellering
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Privatlivsbevarende AI-teknikker

### Compliance & Governance
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Privatlivsoverholdelse i AI-systemer
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Ansvarlig AI-implementering
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Sikkerhedskontroller for AI-tjenesteudbydere
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Healthcare AI-overholdelseskrav

### DevSecOps & automatisering
- [DevSecOps pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Sikker AI-udviklingspipeline
- [Automatiseret sikkerhedstest](https://learn.microsoft.com/security/engineering/devsecops) - Kontinuerlig sikkerhedsvalidering
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Sikker infrastrukturudrulning
- [Container security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Sikker containerisering af AI-arbejdsmængder

### Overvågning & hændelseshåndtering  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Omfattende overvågningsløsninger
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI-specifikke hændelsesprocedurer
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Sikkerheds-informations- og hændelsesstyring
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - AI trusselsintelligenskilder

## 🔄 Kontinuerlig forbedring

### Hold dig opdateret med udviklende standarder
- **MCP-specifikationsopdateringer**: Overvåg officielle MCP-specifikationsændringer og sikkerhedsmeddelelser
- **Trusselsintelligens**: Abonner på AI sikkerhedstrussel feeds og sårbarhedsdatabase
- **Fællesskabsengagement**: Deltag i MCP sikkerhedsfællesskabets diskussioner og arbejdsgrupper  
- **Regelmæssig vurdering**: Gennemfør kvartalsvise vurderinger af sikkerhedsstillingen og opdater praksisser derefter

### Bidrag til MCP Sikkerhed  
- **Sikkerhedsforskning**: Bidrag til MCP sikkerhedsforskning og programmer for sårbarhedsrapportering  
- **Deling af bedste praksis**: Del sikkerhedsimplementeringer og erfaringer med fællesskabet  
- **Udvikling af standarder**: Deltag i udvikling af MCP-specifikationer og oprettelse af sikkerhedsstandarder  
- **Udvikling af værktøjer**: Udvikl og del sikkerhedsværktøjer og biblioteker til MCP-økosystemet

---

*Dette dokument afspejler MCP sikkerhedens bedste praksisser pr. 18. december 2025, baseret på MCP Specifikation 2025-11-25. Sikkerhedspraksisser bør regelmæssigt gennemgås og opdateres, efterhånden som protokollen og trusselslandskabet udvikler sig.*

## Hvad er det næste

- Læs: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- Gå tilbage til: [Security Module Overview](./README.md)  
- Fortsæt til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der måtte opstå som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->