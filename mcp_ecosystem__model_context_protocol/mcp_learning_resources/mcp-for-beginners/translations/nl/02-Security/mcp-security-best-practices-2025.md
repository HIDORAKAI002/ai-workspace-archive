# MCP Security Best Practices - Update februari 2026

> **Belangrijk**: Dit document weerspiegelt de nieuwste beveiligingseisen uit de [MCP Specificatie 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) en de officiële [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Raadpleeg altijd de actuele specificatie voor de meest recente richtlijnen.

## 🏔️ Praktische beveiligingstraining

Voor praktische implementatie-ervaring raden we de **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** aan – een uitgebreide begeleide expeditie voor het beveiligen van MCP-servers in Azure. De workshop behandelt alle OWASP MCP Top 10 risico’s volgens een methode van "kwetsbaar → exploit → fix → valideren".

Alle praktijken in dit document zijn in lijn met de **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** voor Azure-specifieke implementatierichtlijnen.

## Essentiële beveiligingspraktijken voor MCP-implementaties

Het Model Context Protocol introduceert unieke beveiligingsuitdagingen die verder gaan dan traditionele softwarebeveiliging. Deze praktijken behandelen zowel fundamentele beveiligingseisen als MCP-specifieke bedreigingen zoals promptinjectie, toolvergiftiging, sessiekaping, confused deputy-problemen en token-passthrough-kwetsbaarheden.

### **VERPLICHTE beveiligingseisen**

**Kritieke eisen uit de MCP-specificatie:**

### **VERPLICHTE beveiligingseisen**

**Kritieke eisen uit de MCP-specificatie:**

> **MAG NIET**: MCP-servers **MAGEN NIET** tokens accepteren die niet expliciet voor de MCP-server zijn uitgegeven  
> 
> **MOET**: MCP-servers die autorisatie toepassen **MOETEN** ALLE binnenkomende verzoeken verifiëren  
>  
> **MAG NIET**: MCP-servers **MAGEN NIET** sessies gebruiken voor authenticatie  
>
> **MOET**: MCP-proxyservers die statische client-ID’s gebruiken **MOETEN** voor elke dynamisch geregistreerde client gebruikersinstemming verkrijgen  

---

## 1. **Tokenbeveiliging & Authenticatie**

**Authenticatie- & autorisatiecontroles:**
   - **Grondige autorisatie-audit**: Voer uitgebreide audits uit van de autorisatielogica van MCP-servers om te garanderen dat alleen bedoelde gebruikers en clients toegang krijgen  
   - **Integratie van externe identiteitsproviders**: Gebruik erkende identiteitsproviders zoals Microsoft Entra ID in plaats van zelf een authenticatie-implementatie  
   - **Validatie van tokenpubliek**: Controleer altijd dat tokens expliciet voor jouw MCP-server zijn uitgegeven – accepteer nooit tokens afkomstig van hogerop  
   - **Correct token lifecycle management**: Implementeer veilige tokenrotatie, vervalbeleid en voorkom tokenhergebruik-aanvallen  

**Beschermde tokenopslag:**
   - Gebruik Azure Key Vault of vergelijkbare beveiligde credentialopslag voor alle geheimen  
   - Implementeer versleuteling van tokens in rust en tijdens transport  
   - Voer regelmatige vervanging van credentials uit en monitor ongeautoriseerde toegang  

## 2. **Sessiebeheer & Transportbeveiliging**

**Veilige sessiepraktijken:**
   - **Cryptografisch veilige sessie-ID’s**: Gebruik veilige, niet-deterministische sessie-ID’s gegenereerd met cryptografisch veilige willekeurige generatoren  
   - **Gebruikersgebonden binding**: Koppel sessie-ID’s aan gebruikersidentiteiten met formaten zoals `<user_id>:<session_id>` om misbruik tussen gebruikers te voorkomen  
   - **Beheer sessieleven**: Implementeer correcte vervaldatums, rotatie en invalidatie om kwetsbaarheidsvensters te beperken  
   - **HTTPS/TLS afdwinging**: Verplichte HTTPS voor alle communicatie om onderschepping van sessie-ID’s te voorkomen  

**Transportlaagbeveiliging:**
   - Configureer TLS 1.3 waar mogelijk met correcte certificaatbeheer  
   - Implementeer certificaat-pinning voor kritieke verbindingen  
   - Voer regelmatige certificaatrotatie en geldigheidscontrole uit  

## 3. **AI-specifieke bedreigingsbescherming** 🤖

**Verdediging tegen promptinjectie:**
   - **Microsoft Prompt Shields**: Zet AI Prompt Shields in voor geavanceerde detectie en filtering van kwaadaardige instructies  
   - **Input-sanitatie**: Valideer en reinig alle invoer om injectieaanvallen en confused deputy-kwesties te voorkomen  
   - **Inhoudsgrenzen**: Gebruik scheidings- en datamarkering-systemen om vertrouwde instructies te onderscheiden van externe inhoud  

**Preventie van toolvergiftiging:**
   - **Validatie van toolmetadata**: Implementeer integriteitscontroles voor tooldefinities en monitor onverwachte wijzigingen  
   - **Dynamische toolmonitoring**: Bewaak runtime-gedrag en stel alerts in bij onverwachte uitvoeringspatronen  
   - **Goedkeuringsworkflows**: Vereis expliciete gebruikersgoedkeuring voor toolwijzigingen en capaciteitsaanpassingen  

## 4. **Toegangscontrole & Machtigingen**

**Principe van minste privileges:**
   - Geef MCP-servers alleen minimale rechten die nodig zijn voor de beoogde functionaliteit  
   - Implementeer op rollen gebaseerde toegangscontrole (RBAC) met fijnmazige machtigingen  
   - Voer regelmatige evaluaties van rechten uit en continue monitoring om privilege-escalatie te voorkomen  

**Runtime machtigingscontroles:**
   - Pas resource-limieten toe om resource-uitputtingsaanvallen te voorkomen  
   - Gebruik containerisolatie voor tooluitvoeringsomgevingen  
   - Implementeer just-in-time toegang voor administratieve functies  

## 5. **Inhoudsveiligheid & Monitoring**

**Implementatie van inhoudsveiligheid:**
   - **Integratie van Azure Content Safety**: Gebruik Azure Content Safety om schadelijke content, jailbreakpogingen en beleidschendingen te detecteren  
   - **Gedragsanalyse**: Implementeer runtime gedragsbewaking om anomalieën in MCP-server- en toimuitvoering te detecteren  
   - **Uitgebreide logging**: Log alle authenticatiepogingen, toolaanroepen en beveiligingsevenementen met veilige, onveranderbare opslag  

**Continue monitoring:**
   - Real-time alerts voor verdachte patronen en ongeoorloofde toegangspogingen  
   - Integratie met SIEM-systemen voor gecentraliseerd beheer van beveiligingsevenementen  
   - Regelmatige beveiligingsaudits en penetratietesten van MCP-implementaties  

## 6. **Beveiliging van de supply chain**

**Verificatie van componenten:**
   - **Dependency scanning**: Gebruik geautomatiseerde kwetsbaarheidsscans voor alle software-afhankelijkheden en AI-componenten  
   - **Validatie van herkomst**: Verifieer oorsprong, licenties en integriteit van modellen, databronnen en externe services  
   - **Ondertekende pakketten**: Gebruik cryptografisch getekende pakketten en verifieer handtekeningen voorafgaand aan deployment  

**Veilige ontwikkelpijplijn:**
   - **GitHub Advanced Security**: Implementeer scanning op geheimen, dependency-analyses en CodeQL statische analyse  
   - **CI/CD veiligheid**: Integreer beveiligingsvalidaties in geautomatiseerde inzetpijplijnen  
   - **Integriteitscontrole van artefacten**: Implementeer cryptografische verificatie voor gedeployde artefacten en configuraties  

## 7. **OAuth-beveiliging & voorkomen van confused deputy**

**Implementatie van OAuth 2.1:**
   - **PKCE-implementatie**: Gebruik Proof Key for Code Exchange (PKCE) voor alle autorisatieverzoeken  
   - **Expliciete toestemming**: Verkrijg gebruikersinstemming voor elke dynamisch geregistreerde client om confused deputy-aanvallen te voorkomen  
   - **Validatie van redirect URI’s**: Implementeer strikte validatie van redirect URI’s en client-identificatoren  

**Proxybeveiliging:**
   - Voorkom autorisatie-omzeiling via exploitatie van statische client-ID’s  
   - Implementeer juiste toestemmingsworkflows voor toegang tot API’s van derden  
   - Monitor diefstal van autorisatiecodes en ongeautoriseerde API-toegang  

## 8. **Incidentrespons & herstel**

**Snelle responsmogelijkheden:**
   - **Geautomatiseerde respons**: Implementeer geautomatiseerde systemen voor credentialrotatie en dreigingsbeperking  
   - **Rollbackprocedures**: Mogelijkheid om snel terug te keren naar bekende goede configuraties en componenten  
   - **Forensische mogelijkheden**: Gedetailleerde audit trails en logging voor incidentonderzoek  

**Communicatie & coördinatie:**
   - Duidelijke escalatieprocedures voor beveiligingsincidenten  
   - Integratie met organisatiebrede incidentresponsteams  
   - Regelmatige simulaties van beveiligingsincidenten en tafel-oefeningen  

## 9. **Compliance & bestuur**

**Regelgevingsnaleving:**
   - Zorg dat MCP-implementaties voldoen aan branchespecifieke eisen (GDPR, HIPAA, SOC 2)  
   - Implementeer dataclassificatie en privacycontroles voor AI-dataverwerking  
   - Houd uitgebreide documentatie bij voor compliance-audits  

**Wijzigingsbeheer:**
   - Formele beveiligingsbeoordelingsprocessen voor alle MCP-systeemwijzigingen  
   - Versiebeheer en goedkeuringsworkflows voor configuratiewijzigingen  
   - Regelmatige compliance-assessments en gap-analyse  

## 10. **Geavanceerde beveiligingscontroles**

**Zero Trust Architectuur:**
   - **Nooit vertrouwen, altijd verifiëren**: Continue verificatie van gebruikers, apparaten en verbindingen  
   - **Micro-segmentatie**: Fijngranulaire netwerkcontroles die individuele MCP-componenten isoleren  
   - **Conditionele toegang**: Risicogebaseerde toegangscontrole die zich aanpast aan de huidige context en gedrag  

**Bescherming tijdens uitvoering:**
   - **Runtime Application Self-Protection (RASP)**: Zet RASP-technieken in voor realtime dreigingsdetectie  
   - **Toepassingsprestatiebewaking**: Monitor prestatie-anomalieën die aanvallen kunnen suggereren  
   - **Dynamische beveiligingsbeleid**: Implementeer beveiligingsregels die zich aanpassen aan het actuele dreigingsbeeld  

## 11. **Integratie met Microsoft Security Ecosysteem**

**Omvattende Microsoft-beveiliging:**
   - **Microsoft Defender for Cloud**: Beheer van cloudbeveiligingspostuur voor MCP-workloads  
   - **Azure Sentinel**: Cloud-native SIEM en SOAR mogelijkheden voor geavanceerde dreigingsdetectie  
   - **Microsoft Purview**: Gegevensbeheer en compliance voor AI-workflows en datastromen  

**Identiteits- & toegangsbeheer:**
   - **Microsoft Entra ID**: Enterprise identiteitsbeheer met conditionele toegangsregels  
   - **Privileged Identity Management (PIM)**: Just-in-time toegang en goedkeuringsworkflows voor administratieve functies  
   - **Identity Protection**: Risicogebaseerde conditionele toegang en geautomatiseerde dreigingsrespons  

## 12. **Continue beveiligingsevolutie**

**Bijblijven:**
   - **Monitoring van specificaties**: Regelmatige review van MCP-specificatie-updates en veranderingen in beveiligingsrichtlijnen  
   - **Dreigingsintelligentie**: Integratie van AI-specifieke dreigingsfeeds en compromise indicators  
   - **Betrokkenheid bij beveiligingscommunity**: Actieve deelname aan MCP-beveiligingscommunity en programma’s voor kwetsbaarheidsmelding  

**Adaptieve beveiliging:**
   - **Machine learning beveiliging**: Gebruik ML-gebaseerde anomaliedetectie om nieuwe aanvalspatronen te identificeren  
   - **Predictieve beveiligingsanalyse**: Implementeer voorspellende modellen voor proactieve dreigingsidentificatie  
   - **Automatisering van beveiliging**: Geautomatiseerde updates van beveiligingsbeleid gebaseerd op dreigingsintelligentie en specificatiewijzigingen  

---

## **Kritieke beveiligingsbronnen**

### **Officiële MCP-documentatie**
- [MCP Specificatie (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP beveiligingsbronnen**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Uitgebreide OWASP MCP Top 10 met Azure-implementatie  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Officiële OWASP MCP beveiligingsrisico’s  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktijkgerichte beveiligingstraining voor MCP op Azure  

### **Microsoft beveiligingsoplossingen**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Beveiligingsstandaarden**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Implementatiehandleidingen**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID met MCP-servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Beveiligingsmelding**: MCP-beveiligingspraktijken ontwikkelen zich snel. Verifieer altijd tegen de actuele [MCP-specificatie](https://spec.modelcontextprotocol.io/) en [officiële beveiligingsdocumentatie](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) voordat u implementeert.

## Wat volgt

- Lees: [MCP Security Controls 2025](./mcp-security-controls-2025.md)
- Terug naar: [Overzicht Beveiligingsmodule](./README.md)
- Ga verder naar: [Module 3: Aan de slag](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsservice [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal wordt beschouwd als de gezaghebbende bron. Voor cruciale informatie wordt professioneel menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor misverstanden of verkeerde interpretaties die voortkomen uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->