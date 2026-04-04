# MCP Security Best Practices 2025

Denne omfattende veiledningen skisserer essensielle sikkerhetspraksiser for implementering av Model Context Protocol (MCP) systemer basert på den nyeste **MCP Specification 2025-11-25** og gjeldende bransjestandarder. Disse praksisene tar for seg både tradisjonelle sikkerhetsutfordringer og AI-spesifikke trusler unike for MCP-distribusjoner.

## Kritiske Sikkerhetskrav

### Obligatoriske Sikkerhetskontroller (MÅ-krav)

1. **Tokenvalidering**: MCP-servere **MÅ IKKE** akseptere noen tokens som ikke eksplisitt ble utstedt for selve MCP-serveren
2. **Autorisasjonsverifikasjon**: MCP-servere som implementerer autorisasjon **MÅ** verifisere ALLE innkommende forespørsler og **MÅ IKKE** bruke økter for autentisering  
3. **Brukersamtykke**: MCP-proxyservere som bruker statiske klient-IDer **MÅ** innhente eksplisitt brukersamtykke for hver dynamisk registrerte klient
4. **Sikre økt-IDer**: MCP-servere **MÅ** bruke kryptografisk sikre, ikke-deterministiske økt-IDer generert med sikre tilfeldige tallgeneratorer

## Kjerne Sikkerhetspraksiser

### 1. Inputvalidering og Sanitærering
- **Omfattende Inputvalidering**: Valider og saniter all input for å forhindre injeksjonsangrep, forvirringsangrep og promptinjeksjonssårbarheter
- **Parametreskjema håndheving**: Implementer streng JSON-skjema validering for alle verktøyparametere og API-inndata
- **Innholdssilering**: Bruk Microsoft Prompt Shields og Azure Content Safety for å filtrere skadelig innhold i forespørsler og svar
- **Outputsanitærering**: Valider og saniter alle modellutdata før de presenteres for brukere eller nedstrøms systemer

### 2. Autentisering & Autorisasjon
- **Eksterne identitetsleverandører**: Delegér autentisering til etablerte identitetsleverandører (Microsoft Entra ID, OAuth 2.1-leverandører) i stedet for å implementere egendefinert autentisering
- **Finkornede tillatelser**: Implementer granulære, verktøyspesifikke tillatelser i henhold til minste privilegium-prinsippet
- **Token livssyklusstyring**: Bruk kortlevde tilgangstokener med sikker rotasjon og korrekt mottakervalidering
- **Multifaktorautentisering**: Krev MFA for all administrativ tilgang og sensitive operasjoner

### 3. Sikre Kommunikasjonsprotokoller
- **Transport Layer Security**: Bruk HTTPS/TLS 1.3 for all MCP-kommunikasjon med korrekt sertifikatvalidering
- **Ende-til-ende-kryptering**: Implementer ekstra krypteringslag for høysensitive data under overføring og lagring
- **Sertifikathåndtering**: Oppretthold korrekt livssyklushåndtering for sertifikater med automatiske fornyelsesprosesser
- **Protokollversjon håndhevelse**: Bruk gjeldende MCP-protokollversjon (2025-11-25) med korrekt forhandlingsmekanisme.

### 4. Avansert Ratebegrensning og Ressursbeskyttelse
- **Flerlags ratebegrensning**: Implementer ratebegrensning på bruker-, økt-, verktøy- og ressursnivå for å forhindre misbruk
- **Adaptiv ratebegrensning**: Bruk maskinlæringsbasert ratebegrensning som tilpasser seg bruks- og trusselindikatorer
- **Ressurskvotahåndtering**: Sett passende grenser for beregningsressurser, minnebruk og kjøretid
- **DDoS-beskyttelse**: Distribuer omfattende DDoS-beskyttelse og trafikkanalysesystemer

### 5. Omfattende Logging & Overvåkning
- **Strukturert revisjonslogging**: Implementer detaljerte, søkbare logger for alle MCP-operasjoner, verktøykjøringer og sikkerhetshendelser
- **Sanntidsovervåkning**: Distribuer SIEM-systemer med AI-drevet anomali-deteksjon for MCP-arbeidsbelastninger
- **Personvern-kompatibel logging**: Loggfør sikkerhetshendelser samtidig som personvernsregler overholdes
- **Integrasjon med hendelseshåndtering**: Koble loggsystemer til automatiserte arbeidsflyter for hendelseshåndtering

### 6. Forbedrede Sikre Lagringspraksiser
- **Hardware Security Modules**: Bruk HSM-støttet nøkkellagring (Azure Key Vault, AWS CloudHSM) for kritiske kryptografiske operasjoner
- **Krypteringsnøkkelstyring**: Implementer korrekt nøkkelrotasjon, separasjon og tilgangskontroll for krypteringsnøkler
- **Hemmelighetshåndtering**: Lagre alle API-nøkler, tokens og legitimasjoner i dedikerte hemmelighetshåndteringssystemer
- **Dataklassifisering**: Klassifiser data etter sensitivitet og anvend passende beskyttelsestiltak

### 7. Avansert Tokenhåndtering
- **Forebygging av token-passthrough**: Forbud uttrykkelig token-passthrough-mønstre som omgår sikkerhetskontroller
- **Mottakervalidering**: Alltid verifiser at tokenets mottakerangivelser samsvarer med den tiltenkte MCP-serveridentiteten
- **Claims-basert autorisasjon**: Implementer finmasket autorisasjon basert på tokenpåstander og brukerattributter
- **Token-binding**: Bind tokens til spesifikke økter, brukere eller enheter der det er hensiktsmessig

### 8. Sikker Øktadministrasjon
- **Kryptografiske økt-IDer**: Generer økt-IDer ved bruk av kryptografisk sikre tilfeldige tallgeneratorer (ikke forutsigbare sekvenser)
- **Brukerspesifikk binding**: Bind økt-IDer til brukerspesifikk informasjon med sikre formater som `<user_id>:<session_id>`
- **Øktsykluskontroller**: Implementer korrekt øktutløp, rotasjon og ugyldiggjøring
- **Sikkerhets-HTTP-overskrifter**: Bruk passende HTTP-sikkerhetsoverskrifter for øktbeskyttelse

### 9. AI-Spesifikke Sikkerhetskontroller
- **Forsvar mot promptinjeksjon**: Distribuer Microsoft Prompt Shields med spotlighting, skilletegn og datamerkingsteknikker
- **Forebygging av verktøyforgiftning**: Valider verktøymetadata, overvåk for dynamiske endringer, og verifiser verktøyets integritet
- **Validering av modellutdata**: Skann modellutdata for potensiell datalekkasje, skadelig innhold eller brudd på sikkerhetspolicyer
- **Beskyttelse av kontekstvindu**: Implementer kontroller som forhindrer forgiftning og manipulasjonsangrep mot kontekstvinduet

### 10. Sikker Verktøykjøring
- **Kjøremiljøsandboxing**: Kjør verktøykjøringer i containerbaserte, isolerte miljøer med ressursgrenser
- **Privilegieseparasjon**: Kjør verktøy med minimale nødvendige privilegier og adskilte tjenestekontoer
- **Nettverksisolasjon**: Implementer nettverkssegmentering for verktøykjøringsmiljøer
- **Overvåkning av kjøring**: Overvåk verktøykjøring for unormal oppførsel, ressursbruk og sikkerhetsbrudd

### 11. Kontinuerlig Sikkerhetsvalidering
- **Automatisert sikkerhetstesting**: Integrer sikkerhetstesting i CI/CD pipelines med verktøy som GitHub Advanced Security
- **Sårbarhetshåndtering**: Skann regelmessig alle avhengigheter, inkludert AI-modeller og eksterne tjenester
- **Innbruddsprøving**: Utfør regelmessige sikkerhetsvurderinger som spesielt retter seg mot MCP-implementasjoner
- **Sikkerhetsgjennomganger av kode**: Implementer obligatoriske sikkerhetsgjennomganger for alle MCP-relaterte kodeendringer

### 12. Sikkerhet i Leverandørkjeden for AI
- **Komponentverifisering**: Verifiser opprinnelse, integritet og sikkerhet for alle AI-komponenter (modeller, embeddings, APIer)
- **Avhengighetshåndtering**: Vedlikehold oppdaterte beholdninger av all programvare og AI-avhengigheter med sårbarhetssporing
- **Pålitelige arkiver**: Bruk verifiserte, pålitelige kilder for alle AI-modeller, biblioteker og verktøy
- **Overvåkning av leverandørkjeden**: Overvåk kontinuerlig for kompromittering av AI-tjenesteleverandører og modellarkiver

## Avanserte Sikkerhetsmønstre

### Zero Trust Arkitektur for MCP
- **Aldri Stol, Alltid Verifiser**: Implementer kontinuerlig verifisering for alle MCP-deltakere
- **Mikrosegmentering**: Isoler MCP-komponenter med granulære nettverks- og identitetskontroller
- **Betinget Tilgang**: Implementer risikobaserte tilgangskontroller som tilpasser seg kontekst og atferd
- **Kontinuerlig Risikoanalyse**: Evaluer dynamisk sikkerhetsstatus basert på gjeldende trusselindikatorer

### Personvernbevarende AI-Implementering
- **Dataminimering**: Eksponer kun minimum nødvendig data for hver MCP-operasjon
- **Differensielt Personvern**: Implementer personvernbevarende teknikker for sensitiv databehandling
- **Homomorf Kryptering**: Bruk avanserte krypteringsteknikker for sikker beregning på krypterte data
- **Federert Læring**: Implementer distribuerte læringsmetoder som bevarer datalokalisering og personvern

### Hendelseshåndtering for AI-Systemer
- **AI-Spesifikke hendelsesprosedyrer**: Utvikle hendelseshåndteringsprosedyrer tilpasset AI- og MCP-spesifikke trusler
- **Automatisert respons**: Implementer automatisert innkapsling og utbedring for vanlige AI-sikkerhetshendelser  
- **Rettsmedisinske kapasiteter**: Oppretthold rettsmedisinsk beredskap for kompromittering av AI-systemer og databrudd
- **Gjenopprettingsprosedyrer**: Etabler prosedyrer for å gjenopprette fra AI-modelforgiftning, promptinjeksjonsangrep og tjenestekompromisser

## Implementeringsressurser & Standarder

### 🏔️ Praktisk Sikkerhetstrening
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattende praktisk workshop for å sikre MCP-servere i Azure
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referansearkitektur og OWASP MCP Topp 10 implementeringsveiledning

### Offisiell MCP Dokumentasjon
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Nåværende MCP-protokollspesifikasjon
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Offisiell sikkerhetsveiledning
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Autentisering og autorisasjonsmønstre
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Krav til transportlagssikkerhet

### Microsoft Sikkerhetsløsninger
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Avansert beskyttelse mot promptinjeksjon
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Omfattende AI-innholdsfiltrering
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Bedriftsidentitet og tilgangsstyring
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Sikker hemmelighets- og legitimasjonshåndtering
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Sikkerhetsanalyse for leverandørkjede og kode

### Sikkerhetsstandarder & Rammeverk
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Gjeldende OAuth sikkerhetsveiledning
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Webapplikasjonssikkerhetsrisikoer
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI-spesifikke sikkerhetsrisikoer
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Omfattende risikostyring for AI
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Systemer for informasjonssikkerhetsstyring

### Implementeringsguider & Veiledninger
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Enterprise autentiseringsmønstre
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integrasjon av identitetsleverandør
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Beste praksis for tokenhåndtering
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Avanserte krypteringsmønstre

### Avanserte Sikkerhetsressurser
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Sikre utviklingspraksiser
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI-spesifikk sikkerhetstesting
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Trusselmodellering for AI
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Personvernbevarende AI-teknikker

### Overholdelse & Styring
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Personvernregelverk i AI-systemer
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Ansvarlig AI-implementering
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Sikkerhetskontroller for AI-tjenesteleverandører
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Helsesektorens AI-kompatibilitetskrav

### DevSecOps & Automatisering
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Sikre AI-utviklingspipelines
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Kontinuerlig sikkerhetsvalidering
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Sikker infrastrukturdistribusjon
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Sikker containerisering av AI-arbeidsbelastninger

### Overvåkning & Hendelseshåndtering  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Omfattende overvåkningsløsninger
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI-spesifikke hendelsesprosedyrer
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Sikkerhetsinformasjon og hendelsesstyring
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Trusselinformasjon for AI

## 🔄 Kontinuerlig Forbedring

### Hold deg Oppdatert med Utviklende Standarder
- **MCP Spesifikasjonsoppdateringer**: Overvåk offisielle MCP-spesifikasjonsendringer og sikkerhetsvarsler
- **Trusselinformasjon**: Abonner på AI-sikkerhetstrusselvarsler og sårbarhetsdatabaser  
- **Fellesskapsengasjement**: Delta i MCP-sikkerhetsfellesskapsdiskusjoner og arbeidsgrupper
- **Regelmessig vurdering**: Gjennomfør kvartalsvise sikkerhetsvurderinger og oppdater praksis deretter

### Bidra til MCP-sikkerhet
- **Sikkerhetsforskning**: Bidra til MCP-sikkerhetsforskning og programmer for sårbarhetsavsløring
- **Deling av beste praksis**: Del sikkerhetsimplementeringer og erfaringer med fellesskapet
- **Standardutvikling**: Delta i utviklingen av MCP-spesifikasjoner og oppretting av sikkerhetsstandarder
- **Verktøyutvikling**: Utvikle og dele sikkerhetsverktøy og biblioteker for MCP-økosystemet

---

*Dette dokumentet gjenspeiler MCPs beste sikkerhetspraksis per 18. desember 2025, basert på MCP-spesifikasjon 2025-11-25. Sikkerhetspraksis bør regelmessig gjennomgås og oppdateres etter hvert som protokollen og trussellandskapet utvikler seg.*

## Hva er det neste

- Les: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Gå tilbake til: [Security Module Overview](./README.md)
- Fortsett til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiserte oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som følge av bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->