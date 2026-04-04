# MCP Sikkerhetsbeste praksis - Oppdatering februar 2026

> **Viktig**: Dette dokumentet gjenspeiler de siste [MCP-spesifikasjon 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) sikkerhetskravene og den offisielle [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Henvis alltid til gjeldende spesifikasjon for den mest oppdaterte veiledningen.

## 🏔️ Praktisk sikkerhetstrening

For praktisk implementeringserfaring anbefaler vi **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - en omfattende guidet ekspedisjon for å sikre MCP-servere i Azure. Workshoppen dekker alle OWASP MCP Top 10-risikoer gjennom metodikken "sårbar → utnyttelse → fikse → validere".

Alle praksiser i dette dokumentet er i samsvar med **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** for veiledning om Azure-spesifikk implementering.

## Essensielle sikkerhetspraksiser for MCP-implementasjoner

Model Context Protocol introduserer unike sikkerhetsutfordringer som går utover tradisjonell programvaresikkerhet. Disse praksisene adresserer både grunnleggende sikkerhetskrav og MCP-spesifikke trusler inklusive promptinjeksjon, verktøytoksinisering, sesjonskapring, confused deputy-problemer og token-gjennomgangssårbarheter.

### **OBLIGATORISKE sikkerhetskrav**

**Kritiske krav fra MCP-spesifikasjonen:**

### **OBLIGATORISKE sikkerhetskrav**

**Kritiske krav fra MCP-spesifikasjonen:**

> **MÅ IKKE**: MCP-servere **MÅ IKKE** akseptere noen tokens som ikke eksplisitt er utstedt for MCP-serveren  
>  
> **MÅ**: MCP-servere som implementerer autorisasjon **MÅ** verifisere ALLE innkommende forespørsler  
>  
> **MÅ IKKE**: MCP-servere **MÅ IKKE** bruke sesjoner for autentisering  
>  
> **MÅ**: MCP-proxyservere som bruker statiske klient-IDer **MÅ** innhente samtykke fra brukeren for hver dynamisk registrerte klient

---

## 1. **Token-sikkerhet og autentisering**

**Autentiserings- og autorisasjonskontroller:**  
   - **Nøye autorisasjonsgjennomgang**: Utfør omfattende revisjoner av MCP-serverens autorisasjonslogikk for å sikre at bare tiltenkte brukere og klienter får tilgang til ressurser  
   - **Integrasjon med eksterne identitetsleverandører**: Bruk etablerte identitetsleverandører som Microsoft Entra ID i stedet for å implementere egen autentisering  
   - **Validering av token-målgruppe**: Valider alltid at tokens er eksplisitt utstedt for din MCP-server - aksepter aldri tokens fra upstream  
   - **Riktig tokenlivssyklus**: Implementer sikker tokenrotasjon, utløpspolicyer og forhindre token-gjentakelsesangrep  

**Beskyttet tokenlagring:**  
   - Bruk Azure Key Vault eller lignende sikre credential stores for alle hemmeligheter  
   - Implementer kryptering for tokens både i ro og under overføring  
   - Regelmessig rotasjon av legitimasjon og overvåkning for uautorisert tilgang

## 2. **Sesjonshåndtering og transport-sikkerhet**

**Sikre sesjonspraksiser:**  
   - **Kryptografisk sikre sesjons-IDer**: Bruk sikre, ikke-deterministiske sesjons-IDer generert med sikre tilfeldighetstalls-generatorer  
   - **Brukerspesifikk binding**: Bind sesjons-IDer til brukeridentiteter ved bruk av formater som `<user_id>:<session_id>` for å forhindre misbruk på tvers av brukere  
   - **Sesjonslivssyklusforvaltning**: Implementer korrekt utløp, rotasjon og ugyldiggjøring for å begrense sårbarhetsvinduer  
   - **HTTPS/TLS håndhevelse**: Obligatorisk HTTPS for all kommunikasjon for å forhindre avlytting av sesjons-IDer  

**Transportlags-sikkerhet:**  
   - Konfigurer TLS 1.3 der det er mulig med korrekt sertifikathåndtering  
   - Implementer sertifikat-pinning for kritiske tilkoblinger  
   - Regelmessig rotasjon av sertifikater og validering av gyldighet

## 3. **AI-spesifikk trusselbeskyttelse** 🤖

**Forsvar mot promptinjeksjon:**  
   - **Microsoft Prompt Shields**: Distribuer AI Prompt Shields for avansert oppdagelse og filtrering av skadelige instruksjoner  
   - **Inndatavalidering**: Valider og sanitiser all inndata for å forhindre injeksjonsangrep og confused deputy-problemer  
   - **Innholdsgrenser**: Bruk avgrensere og datamerkningssystemer for å skille mellom pålitelige instruksjoner og eksternt innhold  

**Forebygging av verktøytoksinisering:**  
   - **Validering av verktøymetadata**: Implementer integritetssjekker for verktøydefinisjoner og overvåk for uventede endringer  
   - **Dynamisk verktøyovervåkning**: Overvåk kjøreatferd og sett opp varsling for uventede utførelsesmønstre  
   - **Godkjenningsarbeidsflyter**: Krev eksplisitt brukergodkjennelse for verktøymodifikasjoner og endringer i kapasiteter

## 4. **Tilgangskontroll og tillatelser**

**Prinsippet om minste privilegium:**  
   - Gi MCP-servere kun minimalt nødvendige tillatelser for tiltenkt funksjonalitet  
   - Implementer rollebasert tilgangskontroll (RBAC) med detaljert tillatelser  
   - Regelmessige tillatelsesgjennomganger og kontinuerlig overvåkning for privilegieeskalering  

**Kontroller for kjøretidstillatelser:**  
   - Påfør ressursbegrensninger for å forhindre ressursutarmingangrep  
   - Bruk container-isolasjon for verktøykjøremiljøer  
   - Implementer just-in-time-tilgang for administrative funksjoner

## 5. **Innholdssikkerhet og overvåkning**

**Implementering av innholdssikkerhet:**  
   - **Azure Content Safety-integrasjon**: Bruk Azure Content Safety for å oppdage skadelig innhold, jailbreak-forsøk og regelbrudd  
   - **Atferdsanalyse**: Implementer runtime atferdsovervåkning for å oppdage anomalier i MCP-server- og verktøykjøring  
   - **Omfattende logging**: Loggfør alle autentiseringsforsøk, verktøykall og sikkerhetshendelser med sikker, manipulasjonssikker lagring  

**Kontinuerlig overvåkning:**  
   - Sanntidsvarsler for mistenkelige mønstre og uautoriserte tilgangsforsøk  
   - Integrasjon med SIEM-systemer for sentralisert sikkerhetshendelsesadministrasjon  
   - Regelmessige sikkerhetsrevisjoner og penetrasjonstesting av MCP-implementasjoner  

## 6. **Sikkerhet i leverandørkjeden**

**Verifikasjon av komponenter:**  
   - **Avhengighetsskanning**: Bruk automatisert sårbarhetsskanning for alle programvareavhengigheter og AI-komponenter  
   - **Validering av opprinnelse**: Verifiser opprinnelse, lisensiering og integritet for modeller, datakilder og eksterne tjenester  
   - **Signerte pakker**: Bruk kryptografisk signerte pakker og verifiser signaturer før distribusjon  

**Sikker utviklingspipeline:**  
   - **GitHub Advanced Security**: Implementer hemmelighetsskanning, avhengighetsanalyse og CodeQL statisk analyse  
   - **CI/CD-sikkerhet**: Integrer sikkerhetsvalidering i automatiserte distribusjonspipelines  
   - **Integritet for artefakter**: Implementer kryptografisk verifikasjon for distribuerte artefakter og konfigurasjoner  

## 7. **OAuth-sikkerhet & forebygging av confused deputy**

**OAuth 2.1-implementering:**  
   - **PKCE-implementering**: Bruk Proof Key for Code Exchange (PKCE) for alle autorisasjonsforespørsler  
   - **Eksplisitt samtykke**: Innhent samtykke fra brukeren for hver dynamisk registrerte klient for å forhindre confused deputy-angrep  
   - **Validering av redirect URI**: Implementer streng validering av redirect-uri og klientidentifikatorer  

**Proxy-sikkerhet:**  
   - Forhindre autorisasjonsomgåelse gjennom utnyttelse av statiske klient-IDer  
   - Implementer riktige samtykkearbeidsflyter for tredjeparts-API-tilgang  
   - Overvåk for tyveri av autorisasjonskoder og uautorisert API-tilgang  

## 8. **Hendelseshåndtering og gjenoppretting**

**Raske responskapasiteter:**  
   - **Automatisk respons**: Implementer automatiserte systemer for rotering av legitimasjon og trusselinneslutning  
   - **Tilbakerulleringsprosedyrer**: Evne til raskt å gå tilbake til kjente gode konfigurasjoner og komponenter  
   - **Rettsmedisinske kapasiteter**: Detaljerte revisjonsspor og logging for hendelsesetterforskning  

**Kommunikasjon og koordinering:**  
   - Klare eskaleringsprosedyrer for sikkerhetshendelser  
   - Integrasjon med organisatoriske hendelsesresponsteam  
   - Regelmessige øvelser og bordøvelser for sikkerhetshendelser  

## 9. **Overholdelse og styring**

**Regulatorisk overholdelse:**  
   - Sørg for at MCP-implementasjoner møter bransjespesifikke krav (GDPR, HIPAA, SOC 2)  
   - Implementer dataklassifisering og personvernkontroller for AI-databehandling  
   - Oppretthold omfattende dokumentasjon for revisjon av overholdelse  

**Endringsstyring:**  
   - Formelle sikkerhetsgjennomgangsprosesser for alle MCP-systemendringer  
   - Versjonskontroll og godkjenningsarbeidsflyter for konfigurasjonsendringer  
   - Regelmessige overholdelsesvurderinger og gap-analyser  

## 10. **Avanserte sikkerhetskontroller**

**Zero Trust-arkitektur:**  
   - **Aldri stol, alltid verifiser**: Kontinuerlig verifisering av brukere, enheter og tilkoblinger  
   - **Mikrosegmentering**: Granulære nettverkskontroller som isolerer enkeltstående MCP-komponenter  
   - **Betinget tilgang**: Risikobaserte tilgangskontroller som tilpasses aktuelle kontekst og atferd  

**Kjøretidsprogrambeskyttelse:**  
   - **Runtime Application Self-Protection (RASP)**: Distribuer RASP-teknikker for sanntids trusseloppdagelse  
   - **Overvåkning av applikasjonsytelse**: Overvåk ytelsesanomalier som kan indikere angrep  
   - **Dynamiske sikkerhetspolicyer**: Implementer sikkerhetspolicyer som tilpasser seg basert på aktuell trussellandskap  

## 11. **Integrasjon i Microsofts sikkerhetsekosystem**

**Omfattende Microsoft-sikkerhet:**  
   - **Microsoft Defender for Cloud**: Sikkerhetsstilling for skytjenester for MCP-arbeidsbelastninger  
   - **Azure Sentinel**: Cloud-native SIEM og SOAR-funksjoner for avansert trusseloppdagelse  
   - **Microsoft Purview**: Datastyring og samsvar for AI-arbeidsflyter og datakilder  

**Identitet og tilgangsstyring:**  
   - **Microsoft Entra ID**: Bedriftsidentitetsstyring med betingede tilgangspolicyer  
   - **Privileged Identity Management (PIM)**: Just-in-time tilgang og godkjenningsarbeidsflyter for administrative funksjoner  
   - **Identitetsbeskyttelse**: Risikobasert betinget tilgang og automatisert trusselrespons  

## 12. **Kontinuerlig sikkerhetsutvikling**

**Holde seg oppdatert:**  
   - **Spesifikasjonsmonitorering**: Regelmessig gjennomgang av MCP-spesifikasjonsoppdateringer og endringer i sikkerhetsveiledning  
   - **Trusselintelligens**: Integrasjon av AI-spesifikke trusseldata og indikasjoner på kompromittering  
   - **Engasjement i sikkerhetsmiljøet**: Aktiv deltakelse i MCP sikkerhetsfellesskap og sårbarhetsrapportering  

**Adaptiv sikkerhet:**  
   - **Maskinlæringssikkerhet**: Bruk ML-basert anomalioppdagelse for å identifisere nye angrepsmønstre  
   - **Prediktiv sikkerhetsanalyse**: Implementer prediktive modeller for proaktiv trusselidentifisering  
   - **Automatisering av sikkerhet**: Automatiske oppdateringer av sikkerhetspolicy basert på trusselintelligens og spesifikasjonsendringer  

---

## **Kritiske sikkerhetsressurser**

### **Offisiell MCP-dokumentasjon**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP-sikkerhetsressurser**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure-implementering  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Offisielle OWASP MCP sikkerhetsrisikoer  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhetstrening for MCP på Azure  

### **Microsoft-sikkerhetsløsninger**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Sikkerhetsstandarder**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Implementeringsguider**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Sikkerhetsvarsel**: MCP-sikkerhetspraksiser utvikler seg raskt. Verifiser alltid mot gjeldende [MCP-spesifikasjon](https://spec.modelcontextprotocol.io/) og [offisiell sikkerhetsdokumentasjon](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) før implementering.

## Hva er neste

- Les: [MCP Security Controls 2025](./mcp-security-controls-2025.md)  
- Gå tilbake til: [Security Module Overview](./README.md)  
- Fortsett til: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det originale dokumentet på originalspråket bør anses som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår fra bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->