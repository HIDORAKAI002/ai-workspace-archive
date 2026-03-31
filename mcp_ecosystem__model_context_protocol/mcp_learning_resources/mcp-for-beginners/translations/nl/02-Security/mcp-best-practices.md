# MCP Beveiligingsrichtlijnen 2025

Deze uitgebreide gids beschrijft essentiële beveiligingsrichtlijnen voor het implementeren van Model Context Protocol (MCP)-systemen op basis van de nieuwste **MCP-specificatie 2025-11-25** en huidige industrienormen. Deze richtlijnen behandelen zowel traditionele beveiligingszorgen als AI-specifieke bedreigingen die uniek zijn voor MCP-implementaties.

## Kritieke Beveiligingseisen

### Verplichte Beveiligingscontroles (MOET-eisen)

1. **Tokenvalidatie**: MCP-servers **MOETEN GEEN** tokens accepteren die niet expliciet zijn uitgegeven voor de MCP-server zelf
2. **Autorisatieverificatie**: MCP-servers die autorisatie implementeren **MOETEN** ALLE inkomende verzoeken verifiëren en **MOETEN GEEN** sessies gebruiken voor authenticatie  
3. **Gebruikersconsent**: MCP-proxyservers die statische client-ID's gebruiken **MOETEN** expliciete gebruikersconsent verkrijgen voor elke dynamisch geregistreerde client
4. **Veilige sessie-ID's**: MCP-servers **MOETEN** cryptografisch veilige, niet-deterministische sessie-ID's gebruiken die worden gegenereerd met veilige willekeurige getallengeneratoren

## Kernbeveiligingspraktijken

### 1. Invoervalidatie & Sanitatie
- **Uitgebreide invoervalidatie**: Valideer en sanitiseer alle invoer om injectieaanvallen, confused deputy-problemen en promptinjectie-kwetsbaarheden te voorkomen
- **Parameter schema afdwinging**: Implementeer strikte JSON-schema validatie voor alle toolparameters en API-invoer
- **Inhoudsfiltering**: Gebruik Microsoft Prompt Shields en Azure Content Safety om kwaadaardige inhoud in prompts en reacties te filteren
- **Outputsanitatie**: Valideer en sanitiseer alle modeloutputs voordat deze aan gebruikers of downstreamsystemen worden gepresenteerd

### 2. Uitmuntendheid in Authenticatie & Autorisatie  
- **Externe identiteitsproviders**: Schakel authenticatie uit naar gevestigde identiteitsproviders (Microsoft Entra ID, OAuth 2.1-providers) in plaats van eigen authenticatie te implementeren
- **Fijngranulaire permissies**: Implementeer gedetailleerde, toolspecifieke permissies volgens het principe van minste privilege
- **Token levenscyclusbeheer**: Gebruik kortlevende toegangstokens met veilige rotatie en juiste doelgroepvalidatie
- **Multi-factor authenticatie**: Vereis MFA voor alle administratieve toegang en gevoelige handelingen

### 3. Veilige communicatiesystemen
- **Transportlaagbeveiliging**: Gebruik HTTPS/TLS 1.3 voor alle MCP-communicatie met correcte certificaatvalidatie
- **End-to-end encryptie**: Implementeer extra encryptielagen voor zeer gevoelige gegevens in transit en in rust
- **Certificaatbeheer**: Onderhoud adequaat certificaatlevenscyclusbeheer met geautomatiseerde vernieuwingsprocessen
- **Protocolversie afdwinging**: Gebruik de huidige MCP-protocolversie (2025-11-25) met juiste versieonderhandeling

### 4. Geavanceerde rate limiting & resourcebescherming
- **Multi-laags rate limiting**: Implementeer rate limiting op gebruiker-, sessie-, tool- en resource-niveau om misbruik te voorkomen
- **Adaptieve rate limiting**: Gebruik machine learning-gebaseerde rate limiting die zich aanpast aan gebruikspatronen en dreigingsindicatoren
- **Resourcequota-beheer**: Stel gepaste limieten in voor rekenkracht, geheugenverbruik en uitvoeringstijd
- **DDoS-bescherming**: Zet uitgebreide DDoS-bescherming en verkeersanalysetools in

### 5. Uitgebreide logging & monitoring
- **Gestructureerde auditlogging**: Implementeer gedetailleerde, doorzoekbare logs voor alle MCP-operaties, tooluitvoeringen en beveiligingsgebeurtenissen
- **Realtime beveiligingsmonitoring**: Zet SIEM-systemen met AI-gedreven anomaliedetectie in voor MCP-werkbelasting
- **Privacy-conforme logging**: Log beveiligingsgebeurtenissen met respect voor dataprivacyverplichtingen en -regelgeving
- **Incident response integratie**: Verbind logging systemen aan geautomatiseerde incident response workflows

### 6. Verbeterde beveiligde opslagpraktijken
- **Hardware security modules**: Gebruik HSM-ondersteunde sleutelopslag (Azure Key Vault, AWS CloudHSM) voor kritieke cryptografische operaties
- **Encryptiesleutelbeheer**: Implementeer correcte sleutelrotatie, scheiding en toegangscontrole voor encryptiesleutels
- **Secrets management**: Bewaar alle API-sleutels, tokens en referenties in dedicated geheimbeheer systemen
- **Dataclassificatie**: Classificeer data op gevoeligheidsniveau en pas passende beschermingsmaatregelen toe

### 7. Geavanceerd tokenbeheer
- **Token passthrough preventie**: Verbied expliciet token passthrough patronen die beveiligingscontroles omzeilen
- **Audience-validatie**: Verifieer altijd dat token audience claims overeenkomen met de beoogde MCP-server identiteit
- **Claims-gebaseerde autorisatie**: Implementeer fijne autorisatie gebaseerd op tokenclaims en gebruikersattributen
- **Token binding**: Koppel tokens aan specifieke sessies, gebruikers of apparaten waar passend

### 8. Veilig sessiebeheer
- **Cryptografische sessie-ID's**: Genereer sessie-ID's met cryptografisch veilige willekeurige getallengeneratoren (geen voorspelbare reeksen)
- **Gebruikersspecifieke binding**: Koppel sessie-ID's aan gebruikersspecifieke informatie met veilige formaten zoals `<user_id>:<session_id>`
- **Sessielevenscycluscontroles**: Implementeer correcte sessieverval, rotatie en ongeldigmakingsmechanismen
- **Sessiebeveiligingsheaders**: Gebruik geschikte HTTP-beveiligingsheaders ter bescherming van sessies

### 9. AI-specifieke beveiligingscontroles
- **Prompt-injectie verdediging**: Zet Microsoft Prompt Shields in met spotlighting, delimiters en datamarking technieken
- **Toolvergiftiging preventie**: Valideer toolmetadata, monitor dynamische wijzigingen en controleer toolintegriteit
- **Modeloutputvalidatie**: Scan modeloutputs op mogelijke datalekken, schadelijke inhoud of overtredingen van beveiligingsbeleid
- **Context window bescherming**: Implementeer controles ter voorkoming van context window poisonings- en manipulatieaanvallen

### 10. Tooluitvoeringsbeveiliging
- **Uitvoeringssandboxing**: Voer tooluitvoeringen uit in containerized, geïsoleerde omgevingen met resourcebeperkingen
- **Privilegescheiding**: Voer tools uit met minimale vereiste privileges en gescheiden service-accounts
- **Netwerkisolatie**: Implementeer netwerksegmentatie voor tooluitvoeringsomgevingen
- **Uitvoeringsmonitoring**: Monitor tooluitvoering op afwijkend gedrag, resourcegebruik en beveiligingsinbreuken

### 11. Continue beveiligingsvalidatie
- **Geautomatiseerd beveiligingstesten**: Integreer beveiligingstesten in CI/CD-pijplijnen met tools zoals GitHub Advanced Security
- **Kwetsbaarheidsbeheer**: Scan regelmatig alle afhankelijkheden, inclusief AI-modellen en externe diensten
- **Pentesting**: Voer regelmatige beveiligingsbeoordelingen uit die specifiek MCP-implementaties targeten
- **Beveiligingscode reviews**: Implementeer verplichte beveiligingsreviews voor alle MCP-gerelateerde codewijzigingen

### 12. Supply chain beveiliging voor AI
- **Componentverificatie**: Verifieer herkomst, integriteit en beveiliging van alle AI-componenten (modellen, embeddings, API's)
- **Afhankelijkheidsbeheer**: Houd actuele inventarissen bij van alle software- en AI-afhankelijkheden met kwetsbaarheidstracking
- **Vertrouwde repositories**: Gebruik geverifieerde, vertrouwde bronnen voor alle AI-modellen, bibliotheken en tools
- **Supply chain monitoring**: Monitor continu op compromittering bij AI-serviceproviders en modelrepositories

## Geavanceerde Beveiligingspatronen

### Zero Trust Architectuur voor MCP
- **Nooit vertrouwen, altijd verifiëren**: Implementeer continue verificatie voor alle MCP-deelnemers
- **Microsegmentatie**: Isoleer MCP-componenten met fijnmazige netwerk- en identiteitscontroles
- **Voorwaardelijke toegang**: Implementeer risico-gebaseerde toegangscontroles die zich aanpassen aan context en gedrag
- **Continue risicobeoordeling**: Evalueer dynamisch de beveiligingspositie op basis van huidige dreigingsindicatoren

### Privacy-beschermende AI-implementatie
- **Dataminimalisatie**: Stel slechts de minimaal noodzakelijke data bloot voor elke MCP-operatie
- **Differentiële privacy**: Implementeer privacy-beschermende technieken voor verwerking van gevoelige gegevens
- **Homomorfe encryptie**: Gebruik geavanceerde encryptietechnieken voor veilige berekeningen op versleutelde data
- **Federated learning**: Implementeer gedistribueerde leerbenaderingen die datalocaliteit en privacy behouden

### Incidentrespons voor AI-systemen
- **AI-specifieke incidentprocedures**: Ontwikkel incidentresponsprocedures op maat van AI- en MCP-specifieke bedreigingen
- **Geautomatiseerde respons**: Implementeer geautomatiseerde insluiting en herstel voor veelvoorkomende AI-beveiligingsincidenten  
- **Forensische capaciteiten**: Houd forensische gereedheid voor AI-systeemcompromissen en datalekken
- **Herstelprocedures**: Stel procedures vast voor herstel van AI-modelvergiftiging, promptinjectieaanvallen en servicecompromissen

## Implementatiemiddelen & Normen

### 🏔️ Praktische beveiligingstraining
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Uitgebreide praktische workshop voor het beveiligen van MCP-servers in Azure
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referentiearchitectuur en OWASP MCP Top 10 implementatie-richtlijnen

### Officiële MCP-documentatie
- [MCP-specificatie 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Huidige MCP-protocolspecificatie
- [MCP Beveiligingsrichtlijnen](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Officiële beveiligingsrichtlijnen
- [MCP Autorisatiespecificatie](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Authenticatie- en autorisatiepatronen
- [MCP Transportbeveiliging](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Transportlaag beveiligingseisen

### Microsoft Beveiligingsoplossingen
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Geavanceerde bescherming tegen promptinjecties
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Uitgebreide AI-inhoudsfiltering
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Enterprise identiteits- en toegangsbeheer
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Beveiligd geheimen- en referentiebeheer
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Supply chain- en codebeveiligingsscanning

### Beveiligingsstandaarden & Frameworks
- [OAuth 2.1 beste beveiligingspraktijken](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Huidige OAuth-beveiligingsrichtlijnen
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Beveiligingsrisico's webapplicaties
- [OWASP Top 10 voor LLM's](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI-specifieke beveiligingsrisico's
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Uitgebreid AI risicomanagement
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Informatiebeveiligingsmanagement systemen

### Implementatiehandleidingen & Tutorials
- [Azure API Management als MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Enterprise authenticatiepatronen
- [Microsoft Entra ID met MCP-servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integratie identiteitsprovider
- [Veilige tokenopslag implementatie](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Best practices tokenbeheer
- [End-to-end encryptie voor AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Geavanceerde versleutelingspatronen

### Geavanceerde beveiligingsmiddelen
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Veilige ontwikkelpraktijken
- [AI Red Team Handleiding](https://learn.microsoft.com/security/ai-red-team/) - AI-specifiek beveiligingstesten
- [Threat Modeling voor AI-systemen](https://learn.microsoft.com/security/adoption/approach/threats-ai) - AI bedreigingsmodelleringmethodologie
- [Privacy Engineering voor AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Privacy-beschermende AI-technieken

### Compliance & Governance
- [GDPR-compliance voor AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Privacy-compliance in AI-systemen
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Verantwoorde AI-implementatie
- [SOC 2 voor AI-diensten](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Beveiligingscontroles voor AI-serviceproviders
- [HIPAA-compliance voor AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Zorgsector AI-compliance-eisen

### DevSecOps & Automatisering
- [DevSecOps-pijplijn voor AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Veilige AI-ontwikkelpijplijnen
- [Geautomatiseerd beveiligingstesten](https://learn.microsoft.com/security/engineering/devsecops) - Continue beveiligingsvalidatie
- [Infrastructure as Code beveiliging](https://learn.microsoft.com/security/engineering/infrastructure-security) - Veilige infrastructuuruitrol
- [Containerbeveiliging voor AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Beveiliging containerized AI workloads

### Monitoring & Incidentrespons  
- [Azure Monitor voor AI-werkbelastingen](https://learn.microsoft.com/azure/azure-monitor/overview) - Uitgebreide monitoroplossingen
- [AI-beveiligingsincidentrespons](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI-specifieke incidentprocedures
- [SIEM voor AI-systemen](https://learn.microsoft.com/azure/sentinel/overview) - Security Information and Event Management
- [Dreigingsinformatie voor AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - AI dreigingsinformatiesources

## 🔄 Continue Verbetering

### Blijf actueel met evoluerende normen
- **MCP-specificatie-updates**: Volg officiële MCP-specificatiewijzigingen en beveiligingsadviezen
- **Dreigingsinformatie**: Abonneer op AI-beveiligingsdreigingsfeeds en kwetsbaarheidsdatabases  

- **Communitybetrokkenheid**: Neem deel aan MCP-beveiligingscommunitydiscussies en werkgroepen
- **Regelmatige beoordeling**: Voer elk kwartaal een beoordeling van de beveiligingshouding uit en werk de praktijken dienovereenkomstig bij

### Bijdragen aan MCP-beveiliging
- **Beveiligingsonderzoek**: Draag bij aan MCP-beveiligingsonderzoek en programma's voor het melden van kwetsbaarheden
- **Delen van best practices**: Deel beveiligingsimplementaties en geleerde lessen met de community
- **Ontwikkeling van standaarden**: Neem deel aan de ontwikkeling van MCP-specificaties en de creatie van beveiligingsstandaarden
- **Toolontwikkeling**: Ontwikkel en deel beveiligingstools en bibliotheken voor het MCP-ecosysteem

---

*Dit document weerspiegelt de beste beveiligingspraktijken van MCP per 18 december 2025, gebaseerd op MCP-specificatie 2025-11-25. Beveiligingspraktijken moeten regelmatig worden herzien en bijgewerkt naarmate het protocol en het dreigingslandschap evolueren.*

## Wat volgt

- Lezen: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Terug naar: [Security Module Overview](./README.md)
- Doorgaan naar: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI-vertalingsservice [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel wij streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal wordt beschouwd als de gezaghebbende bron. Voor belangrijke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties voortvloeiend uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->