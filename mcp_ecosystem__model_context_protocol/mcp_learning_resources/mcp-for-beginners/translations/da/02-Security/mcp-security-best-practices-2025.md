# MCP Sikkerhedsbedste Praksis - Opdatering Februar 2026

> **Vigtigt**: Dette dokument afspejler de seneste [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) sikkerhedskrav og officielle [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Henvis altid til den aktuelle specifikation for den mest opdaterede vejledning.

## 🏔️ Praktisk Sikkerhedstræning

For praktisk implementeringserfaring anbefaler vi **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – en omfattende guidet ekspedition til sikring af MCP-servere i Azure. Workshoppen dækker alle OWASP MCP Top 10 risici gennem en "sårbar → udnytte → rette → validere" metode.

Alle praksisser i dette dokument er i overensstemmelse med **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** for Azure-specifik implementeringsvejledning.

## Væsentlige Sikkerhedspraksisser for MCP-Implementeringer

Model Context Protocol introducerer unikke sikkerhedsudfordringer, der går ud over traditionel software-sikkerhed. Disse praksisser adresserer både grundlæggende sikkerhedskrav og MCP-specifikke trusler inklusive prompt-injektion, værktøjsforgiftning, sessionkapring, forvirrede betjent-problemer og token-gennemgangs-sårbarheder.

### **OBLIGATORISKE Sikkerhedskrav** 

**Kritiske krav fra MCP-specifikationen:**

### **OBLIGATORISKE Sikkerhedskrav** 

**Kritiske krav fra MCP-specifikationen:**

> **MÅ IKKE**: MCP-servere **MÅ IKKE** acceptere nogen tokens, der ikke eksplicit er udstedt til MCP-serveren  
>  
> **MÅ**: MCP-servere, der implementerer autorisation, **MÅ** verificere ALLE indgående anmodninger  
>  
> **MÅ IKKE**: MCP-servere **MÅ IKKE** anvende sessioner til autentificering  
>  
> **MÅ**: MCP-proxyservere, der bruger statiske klient-id'er, **MÅ** indhente brugeraccept for hver dynamisk registreret klient  

---

## 1. **Token-sikkerhed & Autentificering**

**Autentificerings- & Autorisationskontroller:**  
   - **Grundig Autorisationsrevision**: Udfør omfattende audits af MCP-serverens autorisationslogik for at sikre, at kun tilsigtede brugere og klienter kan få adgang til ressourcer  
   - **Integration af Eksterne Identitetsudbydere**: Brug etablerede identitetsudbydere som Microsoft Entra ID i stedet for at implementere tilpasset autentificering  
   - **Validering af Token-målgruppe**: Valider altid, at tokens eksplicit er udstedt til din MCP-server – accepter aldrig tokens fra upstream  
   - **Korrekt Token Livscyklus**: Implementér sikker token-rotation, udløbspolitikker og forhindr token-genafspilningsangreb  

**Beskyttet Token-lagring:**  
   - Brug Azure Key Vault eller lignende sikre legitimationslagre til alle hemmeligheder  
   - Implementér kryptering for tokens både i hvile og under overførsel  
   - Regelmæssig legitimationsrotation og overvågning for uautoriseret adgang  

## 2. **Sessionstyring & Transport-sikkerhed**

**Sikre sessionpraksisser:**  
   - **Kryptografisk sikrede Session-IDs**: Brug sikre, ikke-deterministiske session-ID'er genereret med sikre tilfældige talgeneratorer  
   - **Brugerspecifik Binding**: Bind session-IDs til brugeridentiteter ved hjælp af formater som `<user_id>:<session_id>` for at forhindre sessionmisbrug på tværs af brugere  
   - **Session Livscyklusadministration**: Implementer korrekt udløb, rotation og ugyldiggørelse for at begrænse sårbarhedsvinduer  
   - **HTTPS/TLS Håndhævelse**: Obligatorisk HTTPS for al kommunikation for at forhindre aflytning af session-ID'er  

**Transportlags-sikkerhed:**  
   - Konfigurer TLS 1.3 hvor det er muligt med korrekt certificathåndtering  
   - Implementér certifikat-pinning for kritiske forbindelser  
   - Regelmæssig certificatrotation og validering  

## 3. **AI-specifik Trusselsbeskyttelse** 🤖

**Forsvar mod Prompt-injektion:**  
   - **Microsoft Prompt Shields**: Udrul AI Prompt Shields til avanceret detektion og filtrering af skadelige instruktioner  
   - **Input-sanitering**: Valider og rens alle inddata for at forhindre injektionsangreb og forvirrede betjent-problemer  
   - **Indholdsgrænser**: Brug afgrænsere og datamærkning til at skelne mellem betroede instruktioner og eksternt indhold  

**Forebyggelse af Værktøjsforgiftning:**  
   - **Validering af Værktøjsmetadata**: Implementér integritetskontroller for værktøjsdefinitioner og overvåg for uventede ændringer  
   - **Dynamisk Værktøjsovervågning**: Overvåg kørselstid og opsæt alarmer for uventede udførelsesmønstre  
   - **Godkendelsesprocesser**: Kræv eksplicit bruger-godkendelse for værktøjsmodifikationer og ændringer i kapabiliteter  

## 4. **Adgangskontrol & Rettigheder**

**Princippet om Mindste Privilegium:**  
   - Tildel MCP-servere kun minimale rettigheder nødvendige for tiltænkt funktionalitet  
   - Implementér rollebaseret adgangskontrol (RBAC) med finmaskede tilladelser  
   - Regelmæssige gennemgange af tilladelser og kontinuerlig overvågning for eskalering af privilegier  

**Kontroller for Rettigheder under Kørsel:**  
   - Anvend ressourcebegrænsninger for at forhindre ressourceudtrætningsangreb  
   - Brug container-isolering til værktøjskørsel  
   - Implementér just-in-time adgang til administrative funktioner  

## 5. **Indholdssikkerhed & Overvågning**

**Implementering af Indholdssikkerhed:**  
   - **Azure Content Safety Integration**: Brug Azure Content Safety til at opdage skadeligt indhold, jailbreak-forsøg og overtrædelser af politikker  
   - **Adfærdsanalyse**: Implementér overvågning af adfærd under kørsel for at opdage anomalier i MCP-server og værktøjskørsel  
   - **Omfattende Logging**: Log alle autentificeringsforsøg, værktøjskald og sikkerhedshændelser med sikker, manipulationssikret lagring  

**Kontinuerlig Overvågning:**  
   - Realtidsalarmer for mistænkelige mønstre og uautoriserede adgangsforsøg  
   - Integration med SIEM-systemer til centraliseret sikkerhedshændelseshåndtering  
   - Regelmæssige sikkerhedsrevisioner og penetrationstest af MCP-implementeringer  

## 6. **Supply Chain Sikkerhed**

**Komponentverifikation:**  
   - **Afhængighedsscanning**: Brug automatiserede sårbarhedsscanninger for al softwareafhængighed og AI-komponenter  
   - **Oprindelsesvalidering**: Verificer oprindelse, licensering og integritet af modeller, datakilder og eksterne tjenester  
   - **Signerede Pakker**: Brug kryptografisk signerede pakker og verificer signaturer før udrulning  

**Sikker Udviklingspipeline:**  
   - **GitHub Advanced Security**: Implementér hemmelighedsscanning, afhængighedsanalyse og CodeQL statisk analyse  
   - **CI/CD Sikkerhed**: Integrer sikkerhedsvalidering gennem automatiserede udrulningspipelines  
   - **Integritetskontrol af Artefakter**: Implementér kryptografisk verifikation af udrullede artefakter og konfigurationer  

## 7. **OAuth Sikkerhed & Forvirret Betjent Forebyggelse**

**OAuth 2.1 Implementering:**  
   - **PKCE Implementering**: Brug Proof Key for Code Exchange (PKCE) for alle autorisationsanmodninger  
   - **Eksplicit Samtykke**: Indhent brugerens samtykke for hver dynamisk registreret klient for at forhindre forvirret betjent-angreb  
   - **Validering af Redirect URI**: Implementér streng validering af redirect URIs og klient-id'er  

**Proxy-sikkerhed:**  
   - Forhindre autorisationsomgåelse via udnyttelse af statiske klient-id'er  
   - Implementér korrekte samtykke-processer ved tredjeparts API-adgang  
   - Overvåg for tyveri af autorisationskoder og uautoriseret API-adgang  

## 8. **Hændelsesrespons & Genopretning**

**Hurtige Reaktionsevner:**  
   - **Automatiseret Respons**: Implementér automatiserede systemer til legitimationsrotation og trusselsinddæmning  
   - **Rollback Procedurer**: Mulighed for hurtigt at vende tilbage til kendt gode konfigurationer og komponenter  
   - **Retshåndhævelseskapaciteter**: Detaljerede revisionsspor og logning til hændelsesundersøgelser  

**Kommunikation & Koordination:**  
   - Klare eskalationsprocedurer ved sikkerhedshændelser  
   - Integration med organisationens hændelsesresponsehold  
   - Regelmæssige sikkerhedshændelsessimulationer og øvelser  

## 9. **Overholdelse & Styring**

**Regulatorisk Overholdelse:**  
   - Sørg for at MCP-implementeringer opfylder branchespecifikke krav (GDPR, HIPAA, SOC 2)  
   - Implementér dataklassifikation og privatlivskontroller ved AI-databehandling  
   - Opbevar omfattende dokumentation til compliance-revision  

**Ændringsstyring:**  
   - Formelle sikkerhedsreview-processer for alle MCP-systemændringer  
   - Versionskontrol og godkendelsesprocesser for konfigurationsændringer  
   - Regelmæssige compliance-vurderinger og gap-analyser  

## 10. **Avancerede Sikkerhedskontroller**

**Zero Trust Arkitektur:**  
   - **Aldrig Stol, Altid Verificer**: Kontinuerlig verifikation af brugere, enheder og forbindelser  
   - **Mikrosegmentering**: Granulære netværkskontroller, der isolerer individuelle MCP-komponenter  
   - **Betinget Adgang**: Risikobaserede adgangskontroller, der tilpasser sig den aktuelle kontekst og adfærd  

**Beskyttelse af Runtime-applikationer:**  
   - **Runtime Application Self-Protection (RASP)**: Udrul RASP-teknikker til realtids trusselsdetektion  
   - **Overvågning af Applikationsperformance**: Overvåg for performanceanomalier, der kan indikere angreb  
   - **Dynamiske Sikkerhedspolitikker**: Implementér sikkerhedspolitikker, der tilpasses baseret på det aktuelle trussellandskab  

## 11. **Integration af Microsoft Sikkerhedsøkosystem**

**Omfattende Microsoft Sikkerhed:**  
   - **Microsoft Defender for Cloud**: Cloud sikkerhedsstatusstyring for MCP-arbejdsmængder  
   - **Azure Sentinel**: Cloud-native SIEM og SOAR kapaciteter til avanceret trusselsdetektion  
   - **Microsoft Purview**: Data governance og compliance for AI-arbejdsgange og datakilder  

**Identitets- og Adgangsstyring:**  
   - **Microsoft Entra ID**: Enterprise identitetsstyring med betingede adgangspolitikker  
   - **Privileged Identity Management (PIM)**: Just-in-time adgang og godkendelsesprocesser til administrative funktioner  
   - **Identitetsbeskyttelse**: Risikobaseret betinget adgang og automatiseret trusselsrespons  

## 12. **Kontinuerlig Sikkerhedsudvikling**

**Hold dig Opdateret:**  
   - **Specifikationsovervågning**: Regelmæssig gennemgang af MCP-specifikationsopdateringer og ændringer i sikkerhedsanbefalinger  
   - **Trusselsintelligens**: Integration af AI-specifikke trusselsfeeds og kompromitteringsindikatorer  
   - **Engagement i Sikkerhedssamfund**: Aktiv deltagelse i MCP sikkerhedssamfund og sårbarhedsafsløringsprogrammer  

**Adaptiv Sikkerhed:**  
   - **Maskinlæringsbaseret Sikkerhed**: Brug ML-baseret anomali-detektion til identificering af nye angrebsmønstre  
   - **Predictiv Sikkerhedsanalytik**: Implementér forudsigende modeller til proaktiv trusselsidentifikation  
   - **Sikkerhedsautomatisering**: Automatiserede opdateringer af sikkerhedspolitikker baseret på trusselsintelligens og specifikationsændringer  

---

## **Kritiske Sikkerhedsressourcer**

### **Officiel MCP Dokumentation**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Sikkerhedsressourcer**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Omfattende OWASP MCP Top 10 med Azure implementering  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Officielle OWASP MCP sikkerhedsrisici  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Hands-on sikkerhedstræning for MCP i Azure  

### **Microsoft Sikkerhedsløsninger**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Sikkerhedsstandarder**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Implementeringsvejledninger**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Sikkerhedsmeddelelse**: MCP sikkerhedspraksis udvikler sig hurtigt. Verificér altid mod den aktuelle [MCP specifikation](https://spec.modelcontextprotocol.io/) og [officielle sikkerhedsdokumentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) inden implementering.

## Hvad er Næste Skridt

- Læs: [MCP Security Controls 2025](./mcp-security-controls-2025.md)  
- Vend tilbage til: [Security Module Overview](./README.md)  
- Fortsæt til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->