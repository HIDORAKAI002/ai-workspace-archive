# Endringslogg: MCP for Beginners-læreplan

Dette dokumentet tjener som en oversikt over alle betydelige endringer gjort i Model Context Protocol (MCP) for Beginners-læreplanen. Endringer dokumenteres i omvendt kronologisk rekkefølge (nyeste endringer først).

## 5. februar 2026

### Forbedringer for validering og navigasjon i hele depotet

#### Nytt læreplaninnhold lagt til

**Modul 03 - Komme i gang**
- **12-mcp-hosts/README.md**: Ny omfattende guide for oppsett av MCP-verter
  - Konfigurasjonseksempler for Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-konfigurasjonsmaler for alle store verter
  - Sammenligningstabell for transporttyper (stdio, SSE/HTTP, WebSocket)
  - Feilsøking av vanlige tilkoblingsproblemer
  - Sikkerhetsbeste praksis for vertkonfigurasjon

- **13-mcp-inspector/README.md**: Ny feilsøkingsguide for MCP Inspector
  - Installasjonsmetoder (npx, global npm, fra kilde)
  - Kobling til servere via stdio og HTTP/SSE
  - Testverktøy, ressurser og arbeidsflyter for prompts
  - VS Code-integrasjon med MCP Inspector
  - Vanlige feilsøkingsscenarier med løsninger

**Modul 04 - Praktisk implementering**
- **pagination/README.md**: Ny guide for implementering av paginering
  - Mønstre for cursor-basert paginering i Python, TypeScript, Java
  - Håndtering av paginering på klientsiden
  - Designstrategier for kursors (ugjennomsiktig vs. strukturert)
  - Anbefalinger for ytelsesoptimalisering

**Modul 05 - Avanserte emner**
- **mcp-protocol-features/README.md**: Ny dybdeanalyse av protokollfunksjoner
  - Implementering av fremdriftsvarsler
  - Mønstre for avbrytelse av forespørsler
  - Ressursmaler med URI-mønstre
  - Håndtering av serverens livssyklus
  - Kontroll av loggnivåer
  - Feilhåndteringsmønstre med JSON-RPC-koder

#### Navigasjonsfikser (24+ filer oppdatert)

**Hovedmodul-READMEer**  
Nå lenker til både første leksjon OG neste modul

**02-Security Underdokumenter**  
- Alle 5 tilleggssikkerhetsdokumenter har nå "Hva skjer videre"-navigasjon:

**09-CaseStudy-filer**  
- Alle casestudiefiler har nå sekvensiell navigasjon:

**10-StreamliningAI Labs**  
La til "Hva skjer videre"-seksjon i oversikt for Modul 10 og Modul 11

#### Kode- og innholdsrettelser

**SDK og avhengighetsoppdateringer**  
Fikset tom openai-versjon til `^4.95.0`  
Oppdatert SDK fra `^1.8.0` til `>=1.26.0`  
Oppdatert MCP-versjonslåser til `>=1.26.0`

**Koderettelser**  
Fikset ugyldig modell `gpt-4o-mini` til `gpt-4.1-mini`

**Innholdsrettelser**  
Fikset ødelagt lenke `READMEmd` → `README.md`, fikset læreplanoverskrift `Module 1-3` → `Module 0-3`, rettet skille mellom store og små bokstaver i sti  
Fjernet korrupt duplikatinnhold fra Case Study 5

**Forbedringer i veiledning for nybegynnere**  
Lagt til riktig introduksjon, læringsmål og forutsetninger for nybegynnere

#### Oppdateringer i læreplanen

**Hoved README.md**  
- Lagt til oppføringer 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginering), 5.16 (Protokollfunksjoner) til læreplantabellen

**Modul-READMEer**  
Lagt til leksjoner 12 og 13 i leksjonslisten  
Lagt til seksjon for praktiske guider med pagineringslenke  
Lagt til leksjoner 5.15 (Egendefinert transport) og 5.16 (Protokollfunksjoner)

**study_guide.md**  
- Oppdatert tankekart med alle nye temaer: MCP Hosts Oppsett, MCP Inspector, Pagineringstrategier, Dypdykk i protokollfunksjoner

## 28. januar 2026

### Overholdelse av MCP-spesifikasjon 2025-11-25

#### Forbedring av kjernebegreper (01-CoreConcepts/)
- **Ny klientprimitive - Roots**: Lagt til omfattende dokumentasjon om Roots-klientprimitive, som gjør det mulig for servere å forstå filsystemgrenser og tilgangstillatelser  
- **Verktøyanslag**: Lagt til dokumentasjon om verktøyets atferdsanslag (`readOnlyHint`, `destructiveHint`) for bedre beslutninger om verktøykjøring  
- **Verktøykalling ved sampling**: Oppdatert samplingdokumentasjon med `tools` og `toolChoice` parametere for modellstyrt verktøysanrop under samplingforespørsler  
- **URL-modus elicitering**: Lagt til dokumentasjon om URL-basert elicitering for serverinitierte eksterne webinteraksjoner  
- **Oppgaver (Eksperimentell)**: Lagt til ny seksjon som dokumenterer eksperimentell funksjon for Oppgaver for holdbare utførelseswrapper og utsatt resultatinnhenting  
- **Ikonstøtte**: Notert at verktøy, ressurser, ressursmaler og prompts nå kan inkludere ikoner som tilleggmetadata

#### Dokumentasjonsoppdateringer  
- **README.md**: Lagt til referanse til MCP-spesifikasjon 2025-11-25 og forklaring på datobasert versjonering  
- **study_guide.md**: Oppdatert læreplankart for å inkludere Oppgaver og Verktøyanslag i kjernebegrepseksjonen; oppdatert dokumentets tidsstempel

#### Verifisering av spesifikasjonskompatibilitet  
- **Protokollversjon**: Verifisert at all dokumentasjon refererer til gjeldende MCP-spesifikasjon 2025-11-25  
- **Arkitekturoverensstemmelse**: Bekreftet nøyaktighet i dokumentasjon av to-lags arkitektur (Datalag + Transsportlag)  
- **Primitive dokumentasjon**: Validert serverprimitive (Ressurser, Prompter, Verktøy) og klientprimitive (Sampling, Elicitering, Logging, Roots)  
- **Transportmekanismer**: Verifisert dokumentasjonens nøyaktighet for STDIO og Streamable HTTP transport  
- **Sikkerhetsveiledning**: Bekreftet samsvar med aktuell MCP Sikkerhets beste praksis dokumentasjon

#### Viktige MCP 2025-11-25 funksjoner dokumentert  
- **OpenID Connect Discovery**: Autentiseringstjener oppdagelse via OIDC  
- **OAuth klient-ID metadata dokumenter**: Anbefalt klientregistreringsmekanisme  
- **JSON Schema 2020-12**: Standarddialekt for MCP-skjema definisjoner  
- **SDK nivåsystem**: Formelle krav til SDK-funksjonsstøtte og vedlikehold  
- **Styringsstruktur**: Formalisering av arbeidsgrupper og interessegrupper i MCP styring

### Storstilt oppdatering av sikkerhetsdokumentasjon (02-Security/)

#### Integrering av MCP Security Summit Workshop (Sherpa)  
- **Ny praktisk treningsressurs**: Lagt til omfattende integrasjon med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i all sikkerhetsdokumentasjon  
- **Dekning av ekspedisjonsrute**: Dokumentert komplett progresjon fra Base Camp til Summit  
- **OWASP-tilpasning**: All sikkerhetsveiledning nå kartlagt mot OWASP MCP Azure Security Guide risiki

#### OWASP MCP Top 10-integrering  
- **Ny seksjon**: Lagt til OWASP MCP Top 10 sikkerhetsrisikotabell med Azure-avbøtninger i hovedsikkerhetsREADME  
- **Risiko-basert dokumentasjon**: Oppdatert mcp-security-controls-2025.md med OWASP MCP-risiko referanser for hvert sikkerhetsdomene  
- **Referansearkitektur**: Lenket til OWASP MCP Azure Security Guide referansearkitektur og implementeringsmønstre

#### Oppdaterte sikkerhetsfiler  
- **README.md**: Lagt til Sherpa Workshop oversikt, ekspedisjonsrutetabell, OWASP MCP Top 10 risikosammendrag og praktisk treningsseksjon  
- **mcp-security-controls-2025.md**: Oppdatert topptekst til februar 2026, lagt til OWASP-risiko referanser (MCP01-MCP08), fikset inkonsistens i spesifikasjonsversjon  
- **mcp-security-best-practices-2025.md**: Lagt til Sherpa og OWASP ressursseksjon, oppdatert tidsstempel  
- **mcp-best-practices.md**: Lagt til praktisk treningsseksjon med Sherpa- og OWASP-lenker  
- **azure-content-safety-implementation.md**: Lagt til OWASP MCP06-referanse, Sherpa Camp 3-tilpasning og ekstra ressursseksjon

#### Nye ressurser lagt til  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Individuelle OWASP MCP risikosider (MCP01-MCP10)

### Læreplanomfattende MCP-spesifikasjon 2025-11-25-tilpasning

#### Modul 03 - Komme i gang  
- **SDK-dokumentasjon**: Lagt til Go SDK i offisiell SDK-liste; oppdatert alle SDK-referanser til å samsvare med MCP-spesifikasjon 2025-11-25  
- **Transportforbedringer**: Oppdatert beskrivelser for STDIO og HTTP Streaming-transport med eksplisitte spesifikasjonsreferanser

#### Modul 04 - Praktisk implementering  
- **SDK-oppdateringer**: Lagt til Go SDK; oppdatert SDK-liste med spesifikasjonsversjon-referanse  
- **Autorisering spesifikasjon**: Oppdatert MCP Autorisasjon spesifikasjonslenke til gjeldende 2025-11-25-versjon

#### Modul 05 - Avanserte emner  
- **Nye funksjoner**: Lagt til notat om nye MCP-spesifikasjonsfunksjoner 2025-11-25 (Oppgaver, Verktøyanslag, URL-modus elicitering, Roots)  
- **Sikkerhetsressurser**: Lagt til OWASP MCP Top 10 og Sherpa workshop-lenker i tilleggslitteratur

#### Modul 06 - Fellesskapsbidrag  
- **SDK-liste**: Lagt til Swift og Rust SDKer; oppdatert spesifikasjonslenke til 2025-11-25  
- **Spesifikasjonsreferanse**: Oppdatert MCP-spesifikasjonslenke til direkte spesifikasjons-URL

#### Modul 07 - Erfaringer fra tidlig adopsjon  
- **Ressursoppdateringer**: Lagt til MCP-spesifikasjon 2025-11-25-lenke og OWASP MCP Top 10 i tilleggslitteratur

#### Modul 08 - Beste praksis  
- **Spesifikasjonsversjon**: Oppdatert MCP-spesifikasjonsreferanse til 2025-11-25  
- **Sikkerhetsressurser**: Lagt til OWASP MCP Top 10 og Sherpa workshop i tilleggslitteratur

#### Modul 10 - Effektivisering av AI-arbeidsflyter  
- **Badge-oppdatering**: Endret MCP versjonsmerke fra SDK-versjon (1.9.3) til spesifikasjonsversjon (2025-11-25)  
- **Ressurslenker**: Oppdatert MCP-spesifikasjonslenke; lagt til OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs  
- **Spesifikasjonsreferanse**: Oppdatert MCP-spesifikasjonslenke til versjon 2025-11-25  
- **Sikkerhetsressurser**: Lagt til OWASP MCP Top 10 i offisielle ressurser

## 18. desember 2025

### Oppdatering av sikkerhetsdokumentasjon - MCP-spesifikasjon 2025-11-25

#### MCP sikkerhets beste praksis (02-Security/mcp-best-practices.md) - Oppdatering av spesifikasjonsversjon  
- **Oppdatering av protokollversjon**: Oppdatert med referanse til siste MCP-spesifikasjon 2025-11-25 (utgitt 25. november 2025)  
  - Oppdatert alle spesifikasjonsversjonsreferanser fra 2025-06-18 til 2025-11-25  
  - Oppdatert datoreferanser i dokumentet fra 18. august 2025 til 18. desember 2025  
  - Verifisert at alle spesifikasjons-URLer peker til gjeldende dokumentasjon  
- **Validering av innhold**: Omfattende validering av sikkerhets beste praksis mot nyeste standarder  
  - **Microsoft sikkerhetsløsninger**: Verifisert gjeldende terminologi og lenker for Prompt Shields (tidligere "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID og Azure Key Vault  
  - **OAuth 2.1 sikkerhet**: Bekreftet samsvar med siste beste praksis for OAuth-sikkerhet  
  - **OWASP-standarder**: Validert at OWASP Top 10 for LLMs-referanser forblir aktuelle  
  - **Azure-tjenester**: Verifisert alle Microsoft Azure dokumentasjonslenker og beste praksis  
- **Standarder samsvar**: Alle refererte sikkerhetsstandarder bekreftet oppdaterte  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 Security Best Practices  
  - Azure sikkerhets- og samsvarsrammeverk  
- **Implementeringsressurser**: Validert alle implementeringsveiledninger og ressurser  
  - Azure API Management autentiseringsmønstre  
  - Microsoft Entra ID integrasjonsguider  
  - Azure Key Vault hemmelighetshåndtering  
  - DevSecOps-pipelines og overvåkningsløsninger

### Kvalitetssikring av dokumentasjon  
- **Samsvar med spesifikasjon**: Sikret at alle obligatoriske MCP sikkerhetskrav (MÅ/MÅ IKKE) samsvarer med siste spesifikasjon  
- **Ressursaktualitet**: Verifisert alle eksterne lenker til Microsoft-dokumentasjon, sikkerhetsstandarder og implementeringsguider  
- **Dekning av beste praksis**: Bekreftet omfattende dekning av autentisering, autorisasjon, AI-spesifikke trusler, leverandørkjedesikkerhet og bedriftsmønstre

## 6. oktober 2025

### Utvidelse av Komme i gang-seksjonen – Avansert serverbruk og enkel autentisering

#### Avansert serverbruk (03-GettingStarted/10-advanced)  
- **Ny kapittel lagt til**: Introduksjon av omfattende guide til avansert bruk av MCP-servere, som dekker både vanlig og lavnivå serverarkitektur.  
  - **Vanlig vs. lavnivå server**: Detaljert sammenligning og kodeeksempler i Python og TypeScript for begge tilnærminger.  
  - **Handler-basert design**: Forklaring av handlerbasert verktøy-/ressurs-/promptstyring for skalerbare, fleksible serverimplementasjoner.  
  - **Praktiske mønstre**: Virkelige scenarioer der lavnivå servermønstre er fordelaktige for avanserte funksjoner og arkitektur.

#### Enkel autentisering (03-GettingStarted/11-simple-auth)  
- **Ny kapittel lagt til**: Steg-for-steg guide til implementering av enkel autentisering i MCP-servere.  
  - **Autentiseringskonsepter**: Klar forklaring av autentisering vs. autorisasjon og håndtering av legitimasjon.  
  - **Grunnleggende autentiseringsimplementering**: Middleware-baserte autentiseringsmønstre i Python (Starlette) og TypeScript (Express), med kodeeksempler.  
  - **Overgang til avansert sikkerhet**: Veiledning for å starte med enkel autentisering og utvikle til OAuth 2.1 og RBAC, med henvisninger til avanserte sikkerhetsmoduler.

Disse tilleggene gir praktisk, hands-on veiledning for å bygge mer robuste, sikre og fleksible MCP-serverimplementasjoner, som bygger bro mellom grunnleggende konsepter og avanserte produksjonsmønstre.

## 29. september 2025

### MCP Server Database Integrasjonslaboratorier – omfattende praktisk læringsløype

#### 11-MCPServerHandsOnLabs - Ny fullstendig læreplan for databaseintegrasjon
- **Fullført 13-lab læringssti**: Lagt til omfattende praktisk læreplan for bygging av produksjonsklare MCP-servere med PostgreSQL databaseintegrasjon
  - **Virkelighetsnær implementering**: Zava Retail analysebruk som demonstrerer enterprise-grade mønstre
  - **Strukturert læringsprogresjon**:
    - **Lab 00-03: Grunnlag** - Introduksjon, kjernearkitektur, sikkerhet og multi-tenant, miljøoppsett
    - **Lab 04-06: Bygging av MCP-serveren** - Databaseutforming og skjema, MCP-serverimplementasjon, verktøyutvikling  
    - **Lab 07-09: Avanserte funksjoner** - Semantisk søkeintegrasjon, testing og feilsøking, VS Code-integrasjon
    - **Lab 10-12: Produksjon og beste praksis** - Utrullingsstrategier, overvåking og observabilitet, beste praksis og optimalisering
  - **Enterprise-teknologier**: FastMCP-rammeverk, PostgreSQL med pgvector, Azure OpenAI-innbeddinger, Azure Container Apps, Application Insights
  - **Avanserte funksjoner**: Radsikkerhet på nivå (RLS), semantisk søk, multi-tenant datatilgang, vektor-innbeddinger, sanntidsovervåking

#### Terminologistandardisering - modul til lab-konvertering
- **Omfattende dokumentasjonsoppdatering**: Systematisk oppdatering av alle README-filer i 11-MCPServerHandsOnLabs for å bruke "Lab"-terminologi i stedet for "Modul"
  - **Seksjonsoverskrifter**: Oppdatert "Hva denne modulen dekker" til "Hva denne laben dekker" i alle 13 laber
  - **Innholdsbeskrivelse**: Endret "Denne modulen gir..." til "Denne laben gir..." gjennom hele dokumentasjonen
  - **Læringsmål**: Oppdatert "Innen slutten av denne modulen..." til "Innen slutten av denne laben..."
  - **Navigasjonslenker**: Konvertert alle "Modul XX:" referanser til "Lab XX:" i kryssreferanser og navigasjon
  - **Fullføringssporing**: Oppdatert "Etter å ha fullført denne modulen..." til "Etter å ha fullført denne laben..."
  - **Bevarte tekniske referanser**: Opprettholdt Python modulreferanser i konfigurasjonsfiler (f.eks. `"module": "mcp_server.main"`)

#### Studieguideforbedringer (study_guide.md)
- **Visuelt læreplanskart**: Lagt til ny seksjon "11. Databaseintegrasjonslaboratorier" med omfattende visualisering av lab-strukturen
- **Repository-struktur**: Oppdatert fra ti til elleve hovedseksjoner med detaljert beskrivelse av 11-MCPServerHandsOnLabs
- **Læringsstiveiledning**: Forbedret navigasjonsinstruksjoner for seksjoner 00-11
- **Teknologidekning**: Lagt til detaljer om FastMCP, PostgreSQL og Azure-tjenesteintegrasjon
- **Læringsresultater**: Fremhevet produksjonsklare serverutvikling, databaseintegrasjonsmønstre og enterprise-sikkerhet

#### Hoved README-strukturforbedring
- **Lab-basert terminologi**: Oppdatert hoved README.md i 11-MCPServerHandsOnLabs til konsekvent å bruke "Lab"-struktur
- **Læringssti-organisering**: Klar progresjon fra grunnleggende konsepter via avansert implementering til produksjonsutrulling
- **Virkelighetsfokus**: Vekt på praktisk, hands-on læring med enterprise-grade mønstre og teknologier

### Dokumentasjonskvalitet og konsistensforbedringer
- **Hands-on læringsfokus**: Forsterket praktisk, lab-basert tilnærming gjennom hele dokumentasjonen
- **Enterprise-mønsterfokus**: Fremhevet produksjonsklare implementeringer og enterprise sikkerhetshensyn
- **Teknologiintegrasjon**: Omfattende dekning av moderne Azure-tjenester og AI-integrasjonsmønstre
- **Læringsprogresjon**: Klar, strukturert sti fra grunnleggende konsepter til produksjonsutrulling

## 26. september 2025

### Casestudierforbedring - GitHub MCP-registry-integrasjon

#### Casestudier (09-CaseStudy/) - Økosystemutviklingsfokus
- **README.md**: Stor utvidelse med omfattende GitHub MCP Registry casestudie
  - **GitHub MCP Registry casestudie**: Ny omfattende casestudie som undersøker GitHubs MCP Registry-lansering i september 2025
    - **Problemanalyse**: Detaljert gjennomgang av fragmentert MCP-serveroppdagelse og utrullingsutfordringer
    - **Løsningsarkitektur**: GitHubs sentraliserte registry-tilnærming med ett-klikk VS Code-installasjon
    - **Forretningspåvirkning**: Målbare forbedringer i utvikler-onboarding og produktivitet
    - **Strategisk verdi**: Fokus på modulær agentutrulling og verktøy-til-verkøystøtte
    - **Økosystemutvikling**: Posisjonering som grunnleggende plattform for agentisk integrasjon
  - **Forbedret casestudie-struktur**: Oppdatert alle syv casestudier med konsistent formatering og omfattende beskrivelser
    - Azure AI Reisesjekker: Multi-agent orkestreringsfokus
    - Azure DevOps-integrasjon: Arbeidsflytautomasjonsfokus
    - Sanntidsdokumenthenting: Python-konsollklientimplementasjon
    - Interaktiv studieplan-generator: Chainlit samtalebasert web-app
    - In-Editor dokumentasjon: VS Code og GitHub Copilot-integrasjon
    - Azure API-administrasjon: Enterprise API-integrasjonsmønstre
    - GitHub MCP Registry: Økosystemutvikling og fellesskapsplattform
  - **Omfattende konklusjon**: Omskrevet konklusjonsseksjon som fremhever syv casestudier som spenner over flere MCP-implementeringsdimensjoner
    - Enterprise-integrasjon, multi-agent orkestrering, utviklerproduktivitet
    - Økosystemutvikling, utdanningsapplikasjonskategorisering
    - Forbedrede innsikter i arkitekturmønstre, implementeringsstrategier og beste praksis
    - Vekt på MCP som moden, produksjonsklar protokoll

#### Studieguideoppdateringer (study_guide.md)
- **Visuelt læreplanskart**: Oppdatert tankekart for å inkludere GitHub MCP Registry i Casestudier-seksjonen
- **Casestudiebeskrivelse**: Forbedret fra generiske beskrivelser til detaljert oversikt over syv omfattende casestudier
- **Repository-struktur**: Oppdatert seksjon 10 for å reflektere omfattende casestudiedekning med spesifikke implementasjonsdetaljer
- **Endringslogg-integrasjon**: Lagt til oppføring for 26. september 2025 som dokumenterer GitHub MCP Registry-tillegg og casestudieforbedringer
- **Datooppdateringer**: Oppdatert tidsstempel i bunntekst til siste revisjon (26. september 2025)

### Dokumentasjonskvalitetforbedringer
- **Konsistensforbedring**: Standardisert casestudieformatering og struktur på tvers av alle syv eksempler
- **Omfattende dekning**: Casestudier dekker nå enterprise, utviklerproduktivitet og økosystemutviklingsscenarier
- **Strategisk posisjonering**: Forsterket fokus på MCP som grunnleggende plattform for agentbasert systemutrulling
- **Ressursintegrasjon**: Oppdaterte tilleggsressurser med link til GitHub MCP Registry

## 15. september 2025

### Avanserte emner utvidelse - egendefinerte transportmetoder og kontekstengineering

#### MCP egendefinerte transportmetoder (05-AdvancedTopics/mcp-transport/) - Ny avansert implementeringsguide
- **README.md**: Fullstendig implementeringsguide for egendefinerte MCP-transportmekanismer
  - **Azure Event Grid Transport**: Omfattende serverløs hendelsesdrevet transportimplementering
    - C#, TypeScript og Python-eksempler med Azure Functions-integrasjon
    - Hendelsesdrevet arkitektur for skalerbare MCP-løsninger
    - Webhook-mottakere og push-basert meldingshåndtering
  - **Azure Event Hubs Transport**: Høygjennomstrømnings streaming-transportimplementering
    - Sanntids streamingkapasiteter for lavlatenstids-scenarier
    - Partisjoneringsstrategier og checkpoint-administrasjon
    - Meldingsbatching og ytelsesoptimalisering
  - **Enterprise-integrasjonsmønstre**: Produksjonsklare arkitektureksempler
    - Distribuert MCP-prosessering over flere Azure Functions
    - Hybride transportarkitekturer som kombinerer flere transporttyper
    - Meldingsholdbarhet, pålitelighet og feilbehandlingsstrategier
  - **Sikkerhet og overvåking**: Azure Key Vault-integrasjon og observabilitetsmønstre
    - Administrert identitetsautentisering og minst mulig privilegium-tilgang
    - Application Insights-telemetri og ytelsesovervåking
    - Kretsbryter- og feiltoleransemønstre
  - **Test-rammeverk**: Omfattende teststrategier for egendefinerte transportmetoder
    - Enhetstesting med testdobler og mocking-rammeverk
    - Integrasjonstesting med Azure Test Containers
    - Vurderinger for ytelse- og belastningstesting

#### Kontekstengineering (05-AdvancedTopics/mcp-contextengineering/) - Nytt AI-fagfelt
- **README.md**: Omfattende utforskning av kontekstengineering som voksende disiplin
  - **Kjerneprinsipper**: Fullstendig deling av kontekst, beslutningsbevissthet, og kontekstvindu-administrasjon
  - **MCP-protokolltilpasning**: Hvordan MCP-design adresserer kontekstengineering-utfordringer
    - Begrensninger i kontekstvindu og progressive lastestrategier
    - Relevansbestemmelse og dynamisk kontekstgjenfinning
    - Multimodal konteksthåndtering og sikkerhetshensyn
  - **Implementeringstilnærminger**: Enkelttrådede vs. multi-agent-arkitekturer
    - Kontekstbitering og prioriteringsteknikker
    - Progressiv kontekstlasting og komprimeringsstrategier
    - Lagdelte konteksttilnærminger og gjenfinningsoptimalisering
  - **Målerammeverk**: Nye metrikker for evaluering av konstekteffektivitet
    - Inndataeffektivitet, ytelse, kvalitet og brukeropplevelsesbetraktninger
    - Eksperimentelle tilnærminger for kontekstoptimalisering
    - Feilanalyse og forbedringsmetodikk

#### Oppdateringer i læreplansnavigasjon (README.md)
- **Forbedret modulstruktur**: Oppdatert læreplantabell for å inkludere nye avanserte emner
  - Lagt til Kontekstengineering (5.14) og Egne transport (5.15)
  - Konsistent formatering og navigasjonslenker på tvers av alle moduler
  - Oppdaterte beskrivelser for å gjenspeile gjeldende innholdsomfang

### Forbedring av katalogstruktur
- **Navnestandardisering**: Omdøpt "mcp transport" til "mcp-transport" for konsistens med andre avanserte emneforldere
- **Innholdsorganisering**: Alle 05-AdvancedTopics-mapper følger nå konsekvent navnemønster (mcp-[emne])

### Dokumentasjonskvalitetsforbedringer
- **MCP-spesifikasjonstilpasning**: Alle nye innhold refererer til gjeldende MCP Spesifikasjon 2025-06-18
- **Flerspråklige eksempler**: Omfattende kodeeksempler i C#, TypeScript og Python
- **Enterprise-fokus**: Produksjonsklare mønstre og Azure cloud integrasjon gjennomgående
- **Visuell dokumentasjon**: Mermaid-diagrammer for arkitektur- og flytsvisualisering

## 18. august 2025

### Omfattende dokumentasjonsoppdatering - MCP 2025-06-18 standarder

#### MCP sikkerhetsbeste praksis (02-Security/) - Full modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fullstendig omskrevet i samsvar med MCP Spesifikasjon 2025-06-18
  - **Obligatoriske krav**: Lagt til eksplisitte MÅ/MÅ IKKE-krav fra offisiell spesifikasjon med tydelige visuelle indikatorer
  - **12 kjerneområder for sikkerhet**: Omstrukturert fra 15 punkts liste til omfattende sikkerhetsdomener
    - Tokensikkerhet og autentisering med ekstern identitetsleverandør-integrasjon
    - Sesjonsadministrasjon og transport­sikkerhet med kryptografiske krav
    - AI-spesifikk trusselbeskyttelse med Microsoft Prompt Shields integrasjon
    - Tilgangskontroll og rettigheter med prinsippet om minst privilegium
    - Innholdssikkerhet og overvåking med Azure Content Safety integrasjon
    - Sikkerhet i forsyningskjeden med omfattende komponentverifisering
    - OAuth-sikkerhet og Confused Deputy-preventjon med PKCE-implementasjon
    - Hendelseshåndtering og gjenoppretting med automatiserte kapasiteter
    - Samsvar og styring med regulatorisk tilpasning
    - Avanserte sikkerhetskontroller med zero trust-arkitektur
    - Integrasjon i Microsofts sikkerhetsekosystem med omfattende løsninger
    - Kontinuerlig sikkerhetsutvikling med adaptive prosesser
  - **Microsoft sikkerhetsløsninger**: Forbedret integrasjonsveiledning for Prompt Shields, Azure Content Safety, Entra ID og GitHub Advanced Security
  - **Implementeringsressurser**: Kategoriserte omfattende ressurslenker etter Offisiell MCP-dokumentasjon, Microsoft sikkerhetsløsninger, sikkerhetsstandarder og implementeringsguider

#### Avanserte sikkerhetskontroller (02-Security/) - Enterprise-implementering
- **MCP-SECURITY-CONTROLS-2025.md**: Fullstendig overhaling med enterprise-sikkerhetsrammeverk
  - **9 omfattende sikkerhetsdomener**: Utvidet fra grunnleggende kontroller til detaljert enterprise-rammeverk
    - Avansert autentisering og autorisasjon med Microsoft Entra ID-integrasjon
    - Tokensikkerhet og anti-passthrough-kontroller med omfattende validering
    - Sesjonssikkerhetskontroller med kapring-forebygging
    - AI-spesifikke sikkerhetskontroller med forhindre promptinjeksjon og verktøyforgiftning
    - Confused Deputy-angrepsprevensjon med OAuth-prokysikkerhet
    - Verktøyutføringssikkerhet med sandkasse og isolasjon
    - Sikkerhet i forsyningskjeden med avhengighetsverifisering
    - Overvåking og deteksjonskontroller med SIEM-integrasjon
    - Hendelseshåndtering og gjenoppretting med automatiserte kapasiteter
  - **Implementeringseksempler**: Lagt til detaljerte YAML-konfigurasjonsblokker og kodeeksempler
  - **Microsoft-løsningsintegrasjon**: Omfattende dekning av Azure sikkerhetstjenester, GitHub Advanced Security og enterprise identitetsadministrasjon

#### Avanserte emner sikkerhet (05-AdvancedTopics/mcp-security/) - Produksjonsklar implementering
- **README.md**: Fullstendig omskriving for enterprise-sikkerhetsimplementering
  - **Gjeldende spesifikasjonstilpasning**: Oppdatert til MCP Spesifikasjon 2025-06-18 med obligatoriske sikkerhetskrav
  - **Forbedret autentisering**: Microsoft Entra ID-integrasjon med omfattende .NET og Java Spring Security-eksempler
  - **AI-sikkerhetsintegrasjon**: Microsoft Prompt Shields og Azure Content Safety-implementering med detaljerte Python-eksempler
  - **Avansert trusselbeskyttelse**: Omfattende implementeringseksempler for
    - Confused Deputy-angrepsprevensjon med PKCE og brukersamtykkvalidering
    - Tokenpassthrough-prevensjon med målgruppevalidering og sikker token-håndtering
    - Sesjonskapringsforebygging med kryptografisk binding og atferdsanalyse
  - **Enterprise sikkerhetsintegrasjon**: Azure Application Insights-overvåking, trusseldeteksjonspipelines og sikkerhet i forsyningskjeden
  - **Implementeringssjekkliste**: Tydelig skille mellom obligatoriske og anbefalte sikkerhetskontroller med Microsoft sikkerhetsekosystem-fordeler

### Dokumentasjonskvalitet og standardtilpasning
- **Spesifikasjonsreferanser**: Oppdatert alle referanser til gjeldende MCP Spesifikasjon 2025-06-18
- **Microsoft sikkerhetsekosystem**: Forsterket integrasjonsveiledning gjennom all sikkerhetsdokumentasjon
- **Praktisk implementering**: Lagt til detaljerte kodeeksempler i .NET, Java og Python med enterprise-mønstre
- **Ressursorganisering**: Omfattende kategorisering av offisiell dokumentasjon, sikkerhetsstandarder og implementeringsguider
- **Visuelle indikatorer**: Klar merking av obligatoriske krav versus anbefalte praksiser


#### Kjernebegreper (01-CoreConcepts/) - Full modernisering
- **Protokollversjonsoppdatering**: Oppdatert for å referere til gjeldende MCP Spesifikasjon 2025-06-18 med datobasert versjon (ÅÅÅÅ-MM-DD format)
- **Arkitekturforbedring**: Forbedret beskrivelse av Hosts, Clients og Servers for å reflektere dagens MCP-arkitekturmønstre
  - Verter nå tydelig definert som AI-applikasjoner som koordinerer flere MCP-klienttilkoblinger
  - Klienter beskrevet som protokollkoblinger som opprettholder én-til-én serverrelasjoner
  - Servere forbedret med lokale vs. eksterne distribusjonsscenarioer
- **Primitive omstrukturering**: Fullstendig overhaling av server- og klientprimitive
  - Serverprimitive: Ressurser (datakilder), Prompter (maler), Verktøy (kjørbare funksjoner) med detaljerte forklaringer og eksempler
  - Klientprimitive: Sampling (LLM fullføringer), Elicitering (brukerinngang), Logging (feilsøking/overvåking)
  - Oppdatert med nåværende oppdagelses- (`*/list`), hentings- (`*/get`) og utførelses- (`*/call`) metode-mønstre
- **Protokollarkitektur**: Innført to-lags arkitekturstil
  - Datalag: JSON-RPC 2.0 fundament med livssyklusstyring og primitive funksjoner
  - Transportlag: STDIO (lokal) og Streamable HTTP med SSE (fjern) transportmekanismer
- **Sikkerhetsrammeverk**: Omfattende sikkerhetsprinsipper inkludert eksplisitt brukersamtykke, databeskyttelse, sikkerhet ved verktøykjøring, og transportlagsikkerhet
- **Kommunikasjonsmønstre**: Oppdaterte protokollmeldinger som viser initialisering, oppdagelse, utførelse og varslingsflyter
- **Kodeeksempler**: Oppfrisket flerspråklige eksempler (.NET, Java, Python, JavaScript) for å reflektere nåværende MCP SDK-mønstre

#### Sikkerhet (02-Security/) - Omfattende sikkerhetsoverhaling  
- **Standardtilpasning**: Full tilpasning til MCP-spesifikasjonens sikkerhetskrav 2025-06-18
- **Autentiseringsutvikling**: Dokumentert utvikling fra egendefinerte OAuth-servere til ekstern identitetsleverandørdelegering (Microsoft Entra ID)
- **AI-spesifikk trusselanalyse**: Forbedret dekning av moderne AI-angrepsvektorer
  - Detaljerte promptinjektjonsangreps-scenarier med virkelighetseksempler
  - Mekanismer for verktøytoksinering og "rug pull"-angrepsmønstre
  - Forgiftning av kontekstvindu og modellforvirringsangrep
- **Microsoft AI-sikkerhetsløsninger**: Omfattende dekning av Microsofts sikkerhetsekosystem
  - AI Prompt Shields med avansert deteksjon, spotlighting og skilleteknikker
  - Integrasjonsmønstre for Azure Content Safety
  - GitHub Advanced Security for beskyttelse av forsyningskjeden
- **Avansert trusselmitigering**: Detaljerte sikkerhetskontroller for
  - Sesjonskapring med MCP-spesifikke angreps-scenarier og kryptografiske sesjons-ID-krav
  - Confused deputy-problemer i MCP-proxy-scenarier med eksplisitte samtykkekrav
  - Sårbarheter ved token-gjennomgang med obligatoriske valideringskontroller
- **Forsyningskjedesikkerhet**: Utvidet AI-forsyningskjede-dekning inkludert grunnmodeller, embeddings-tjenester, kontekstleverandører og tredjeparts-APIer
- **Fundamentalsikkerhet**: Forbedret integrasjon med bedrifts-sikkerhetsmønstre inkludert zero trust-arkitektur og Microsoft sikkerhetsekosystem
- **Ressursorganisering**: Kategoriserte omfattende ressurslenker etter type (Offisielle dokumenter, Standarder, Forskning, Microsoft-løsninger, Implementeringsguider)

### Dokumentasjonskvalitetsforbedringer
- **Strukturerte læringsmål**: Forbedrede læringsmål med spesifikke, handlingsrettede resultater
- **Kryssreferanser**: Lagt til lenker mellom relaterte sikkerhets- og kjernebegrep-temaer
- **Aktuell informasjon**: Oppdatert alle dato-referanser og spesifikasjonslenker til gjeldende standarder
- **Implementeringsveiledning**: Lagt til spesifikke, handlingsrettede implementeringsretningslinjer gjennom begge seksjoner

## 16. juli 2025

### README og navigasjonsforbedringer
- Fullstendig redesignet læreplan-navigasjonen i README.md
- Erstattet `<details>`-tagger med mer tilgjengelig tabellbasert format
- Opprettet alternative layoutvalg i ny mappe "alternative_layouts"
- Lagt til kortbaserte, fanebaserte og akkordeonstil navigasjons-eksempler
- Oppdatert repository-strukturseksjon til å inkludere alle siste filer
- Forbedret "Hvordan bruke denne læreplanen"-seksjon med klare anbefalinger
- Oppdaterte MCP-spesifikasjonslenker til riktige URL-er
- Lagt til seksjon for Context Engineering (5.14) i læreplanstrukturen

### Studieguideoppdateringer
- Fullstendig revidert studieguide for å samsvare med nåværende repository-struktur
- Lagt til nye seksjoner for MCP-klienter og verktøy, samt populære MCP-servere
- Oppdatert den visuelle læreplankartet til å vise alle temaer korrekt
- Forbedret beskrivelser av avanserte temaer for å dekke alle spesialiserte områder
- Oppdatert case-studier-seksjonen med faktiske eksempler
- Lagt til denne omfattende endringsloggen

### Fellesskapsbidrag (06-CommunityContributions/)
- Lagt til detaljert informasjon om MCP-servere for bilde-generering
- Lagt til omfattende seksjon om bruk av Claude i VSCode
- Lagt til Cline terminalklient-oppsett og bruksanvisning
- Oppdatert MCP-klientseksjonen til å inkludere alle populære klientvalg
- Forbedret bidragseksempler med mer nøyaktige kodeprøver

### Avanserte temaer (05-AdvancedTopics/)
- Organiserte alle spesialiserte emnekataloger med konsekvent navngiving
- Lagt til materiale og eksempler om kontekst-teknikk
- Lagt til dokumentasjon om Foundry-agentintegrasjon
- Forbedret Entra ID sikkerhetsintegrasjonsdokumentasjon

## 11. juni 2025

### Første opprettelse
- Utgitt første versjon av MCP for Beginners-læreplanen
- Opprettet grunnstruktur for alle 10 hovedseksjoner
- Implementert visuelt læreplankart for navigasjon
- Lagt til innledende prøveprosjekter i flere programmeringsspråk

### Komme i gang (03-GettingStarted/)
- Laget første server-implementeringseksempler
- Lagt til veiledning for klientutvikling
- Inkludert instruksjoner for LLM-klientintegrasjon
- Lagt til dokumentasjon for VS Code-integrasjon
- Implementert Server-Sent Events (SSE) server-eksempler

### Kjernebegreper (01-CoreConcepts/)
- Lagt til detaljert forklaring av klient-server arkitektur
- Opprettet dokumentasjon om nøkkelkomponenter i protokollen
- Dokumentert meldingsmønstre i MCP

## 23. mai 2025

### Repository-struktur
- Initialisert repository med grunnleggende mappestruktur
- Opprettet README-filer for hver hovedseksjon
- Satte opp oversettelsesinfrastruktur
- Lagt til bilde-ressurser og diagrammer

### Dokumentasjon
- Opprettet første README.md med læreplanoversikt
- Lagt til CODE_OF_CONDUCT.md og SECURITY.md
- Satte opp SUPPORT.md med veiledning for å få hjelp
- Opprettet foreløpig studieguide-struktur

## 15. april 2025

### Planlegging og rammeverk
- Første planlegging for MCP for Beginners-læreplanen
- Definerte læringsmål og målgruppe
- Skisserte 10-seksjons struktur for læreplanen
- Utviklet konseptuelt rammeverk for eksempler og casestudier
- Opprettet første prototype-eksempler for nøkkelbegreper

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiserte oversettelser kan inneholde feil eller unøyaktigheter. Det originale dokumentet på dets opprinnelige språk skal anses som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->