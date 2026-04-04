# MCP Bezpečnostní Nejlepší Praktiky 2025

Tento komplexní průvodce představuje základní bezpečnostní nejlepší praktiky pro implementaci systémů Model Context Protocol (MCP) založených na nejnovější **MCP Specifikaci 2025-11-25** a aktuálních průmyslových standardech. Tyto praktiky řeší jak tradiční bezpečnostní problémy, tak i specifické hrozby v oblasti AI unikátní pro nasazení MCP.

## Kritické bezpečnostní požadavky

### Povinná bezpečnostní opatření (POVINNÉ požadavky)

1. **Validace tokenů**: MCP servery **NESMÍ** přijímat žádné tokeny, které nebyly výslovně vydány pro daný MCP server
2. **Ověření autorizace**: MCP servery implementující autorizaci **MUSÍ** ověřit VŠECHNY příchozí požadavky a **NESMÍ** používat relace pro autentizaci  
3. **Souhlas uživatele**: MCP proxy servery používající statická klientská ID **MUSÍ** získat výslovný souhlas uživatele pro každý dynamicky registrovaný klient
4. **Bezpečné ID relace**: MCP servery **MUSÍ** používat kryptograficky bezpečná, nedeterministická ID relací generovaná pomocí zabezpečených generátorů náhodných čísel

## Základní bezpečnostní praktiky

### 1. Validace a sanitizace vstupů
- **Komplexní validace vstupů**: Validujte a sanitizujte všechny vstupy, aby se předešlo injekčním útokům, problémům zmateného zástupce a zranitelnostem prompt injection
- **Prosazení schémat parametrů**: Implementujte přísnou validaci JSON schémat pro všechny parametry nástrojů a vstupy API
- **Filtrování obsahu**: Používejte Microsoft Prompt Shields a Azure Content Safety pro filtrování škodlivého obsahu v promtpech a odpovědích
- **Sanitizace výstupů**: Validujte a sanitizujte všechny výstupy modelu před jejich předložením uživatelům nebo následným systémům

### 2. Excelence v autentizaci a autorizaci  
- **Externí poskytovatelé identity**: Delegujte autentizaci na ověřené poskytovatele identity (Microsoft Entra ID, OAuth 2.1 poskytovatelé) namísto implementace vlastní autentizace
- **Jemně granulovaná oprávnění**: Implementujte detailní, nástrojově specifická oprávnění dle principu nejmenšího oprávnění
- **Správa životního cyklu tokenů**: Používejte krátkodobé přístupové tokeny s bezpečnou rotací a správnou validací publika
- **Vícefaktorová autentizace**: Požadujte MFA pro veškerý administrativní přístup a citlivé operace

### 3. Bezpečné komunikační protokoly
- **Transport Layer Security**: Používejte HTTPS/TLS 1.3 pro veškerou MCP komunikaci s řádnou validací certifikátů
- **End-to-End šifrování**: Implementujte další vrstvy šifrování pro vysoce citlivá data v přenosu a v klidu
- **Správa certifikátů**: Udržujte správu životního cyklu certifikátů s automatizovanými procesy obnovy
- **Prosazení verze protokolu**: Používejte aktuální verzi MCP protokolu (2025-11-25) s řádným vyjednáváním verzí

### 4. Pokročilé omezení rychlosti a ochrana zdrojů
- **Vícevrstvé omezení rychlosti**: Implementujte omezení rychlosti na úrovni uživatele, relace, nástroje a zdroje, aby se zabránilo zneužití
- **Adaptivní omezení rychlosti**: Používejte strojové učení založené omezení rychlosti, které se přizpůsobuje vzorcům užívání a indikátorům hrozeb
- **Správa kvót zdrojů**: Nastavte vhodné limity pro výpočetní zdroje, využití paměti a dobu běhu
- **Ochrana proti DDoS**: Nasazujte komplexní ochranu proti DDoS a systémy analýzy provozu

### 5. Komplexní protokolování a monitoring
- **Strukturované auditní protokolování**: Implementujte detailní, vyhledávatelné logy pro všechny MCP operace, spuštění nástrojů a bezpečnostní události
- **Monitorování bezpečnosti v reálném čase**: Nasazujte SIEM systémy s AI poháněným odhalením anomálií pro MCP pracovní zátěže
- **Protokolování v souladu s ochranou soukromí**: Protokolujte bezpečnostní události s respektem k požadavkům na ochranu dat a regulacím
- **Integrace reakce na incidenty**: Propojte protokolovací systémy s automatizovanými workflow pro reakci na incidenty

### 6. Vylepšené praktiky bezpečného ukládání
- **Hardwarové bezpečnostní moduly**: Používejte ukládání klíčů podporované HSM (Azure Key Vault, AWS CloudHSM) pro kritické kryptografické operace
- **Správa šifrovacích klíčů**: Implementujte správnou rotaci klíčů, segregaci a přístupové kontroly k šifrovacím klíčům
- **Správa tajemství**: Ukládejte všechny API klíče, tokeny a přihlašovací údaje ve vyhrazených systémech pro správu tajemství
- **Klasifikace dat**: Klasifikujte data na základě úrovní citlivosti a aplikujte odpovídající ochranná opatření

### 7. Pokročilá správa tokenů
- **Prevence předávání tokenů**: Výslovně zakazujte vzory předávání tokenů, které obcházejí bezpečnostní kontroly
- **Validace publika**: Vždy ověřujte, že tvrzení o publiku tokenu odpovídá zamýšlené identitě MCP serveru
- **Autorizace založená na tvrzeních**: Implementujte jemně granulovanou autorizaci založenou na tvrzeních tokenu a uživatelských atributech
- **Vazba tokenu**: Vazujte tokeny na konkrétní relace, uživatele nebo zařízení, kde je to vhodné

### 8. Bezpečná správa relací
- **Kryptografická ID relací**: Generujte ID relací pomocí kryptograficky bezpečných generátorů náhodných čísel (nepředvídatelných sekvencí)
- **Vazba na uživatele**: Vazujte ID relací na uživatelsky specifické informace pomocí bezpečných formátů jako `<user_id>:<session_id>`
- **Kontroly životního cyklu relace**: Implementujte správné vypršení, rotaci a neplatnost relací
- **Bezpečnostní hlavičky relací**: Používejte odpovídající HTTP bezpečnostní hlavičky pro ochranu relací

### 9. Specifické bezpečnostní kontroly pro AI
- **Ochrana proti prompt injection**: Nasazujte Microsoft Prompt Shields s technikami spotlightingu, delimiterů a datamarkingu
- **Prevence otravy nástrojů**: Validujte metadata nástrojů, monitorujte dynamické změny a ověřujte integritu nástrojů
- **Validace výstupu modelu**: Prohledávejte výstupy modelu na potenciální únik dat, škodlivý obsah nebo porušení bezpečnostních politik
- **Ochrana kontextového okna**: Implementujte kontroly, které zabraňují otravě kontextového okna a manipulačním útokům

### 10. Bezpečnost spuštění nástrojů
- **Sandboxing spuštění**: Spouštějte nástroje v kontejnerizovaných, izolovaných prostředích s limity zdrojů
- **Oddělení privilegií**: Spouštějte nástroje s minimálními potřebnými privilegii a oddělenými servisními účty
- **Síťová izolace**: Implementujte segmentaci sítě pro prostředí spuštění nástrojů
- **Monitorování spuštění**: Sledujte spouštění nástrojů pro anomální chování, využití zdrojů a bezpečnostní porušení

### 11. Kontinuální ověřování bezpečnosti
- **Automatizované bezpečnostní testování**: Integrujte bezpečnostní testování do CI/CD pipeline pomocí nástrojů jako GitHub Advanced Security
- **Správa zranitelností**: Pravidelně skenujte všechny závislosti včetně AI modelů a externích služeb
- **Penetrační testování**: Provádějte pravidelné bezpečnostní hodnocení se zaměřením na implementace MCP
- **Bezpečnostní revize kódu**: Zavádějte povinné bezpečnostní revize pro všechny změny kódu související s MCP

### 12. Bezpečnost dodavatelského řetězce pro AI
- **Ověření komponent**: Ověřujte původ, integritu a bezpečnost všech AI komponent (modely, embeddingy, API)
- **Správa závislostí**: Udržujte aktuální inventář všech softwarových a AI závislostí s monitorováním zranitelností
- **Důvěryhodné repozitáře**: Používejte ověřené, důvěryhodné zdroje pro všechny AI modely, knihovny a nástroje
- **Monitorování dodavatelského řetězce**: Neustále sledujte kompromitace poskytovatelů AI služeb a repozitářů modelů

## Pokročilé bezpečnostní vzory

### Architektura Zero Trust pro MCP
- **Nikdy nevěř, vždy ověřuj**: Implementujte kontinuální ověřování pro všechny MCP účastníky
- **Mikrosegmentace**: Izolujte MCP komponenty jemně granulovanými síťovými a identitními kontrolami
- **Podmíněný přístup**: Implementujte řízení přístupu založené na riziku, které se přizpůsobuje kontextu a chování
- **Kontinuální hodnocení rizik**: Dynamicky vyhodnocujte bezpečnostní stav na základě aktuálních indikátorů hrozeb

### Implementace AI s ochranou soukromí
- **Minimalizace dat**: Zveřejňujte pouze nezbytně nutná data pro každou MCP operaci
- **Diferenciální soukromí**: Implementujte metody pro zachování soukromí při zpracování citlivých dat
- **Homomorfní šifrování**: Používejte pokročilé šifrovací techniky pro bezpečné výpočty nad zašifrovanými daty
- **Federované učení**: Implementujte distribuované učící přístupy, které zachovávají lokálnost dat a soukromí

### Reakce na incidenty v AI systémech
- **Postupy pro AI specifické incidenty**: Vyvíjejte postupy reakce na incidenty přizpůsobené AI a MCP specifickým hrozbám
- **Automatizovaná reakce**: Implementujte automatizovanou izolaci a nápravu běžných AI bezpečnostních incidentů  
- **Forenzní schopnosti**: Udržujte forenzní připravenost pro kompromisy AI systémů a narušení dat
- **Postupy obnovy**: Stanovte postupy pro zotavení po otravě AI modelů, útocích prompt injection a kompromitacích služeb

## Zdroje pro implementaci a standardy

### 🏔️ Praktický bezpečnostní trénink
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komplexní praktický workshop pro zabezpečení MCP serverů v Azure
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenční architektura a implementační pokyny pro OWASP MCP Top 10

### Oficiální dokumentace MCP
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Aktuální specifikace MCP protokolu
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Oficiální bezpečnostní pokyny
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Vzory autentizace a autorizace
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Požadavky na transportní vrstvu bezpečnosti

### Microsoft bezpečnostní řešení
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Pokročilá ochrana proti prompt injection
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Komplexní filtrování AI obsahu
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Podnikové řízení identity a přístupu
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Bezpečná správa tajemství a přihlašovacích údajů
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Skener bezpečnosti dodavatelského řetězce a kódu

### Bezpečnostní standardy a rámce
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Aktuální doporučení pro bezpečnost OAuth
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Rizika zabezpečení webových aplikací
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Specifická rizika bezpečnosti AI
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Komplexní řízení rizik AI
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Systémy řízení bezpečnosti informací

### Implementační návody a tutoriály
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Vzory podnikové autentizace
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integrace poskytovatele identity
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Nejlepší postupy správy tokenů
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Pokročilé šifrovací vzory

### Pokročilé bezpečnostní zdroje
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Praktiky bezpečného vývoje
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI specifické testování bezpečnosti
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodika modelování hrozeb AI
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Techniky ochrany soukromí v AI

### Soulad a správa
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Soulad s ochranou dat v AI systémech
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Zodpovědná implementace AI
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Bezpečnostní kontroly pro poskytovatele AI služeb
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Požadavky na soulady AI ve zdravotnictví

### DevSecOps a automatizace
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Bezpečné pipeline pro vývoj AI
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Kontinuální ověřování bezpečnosti
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Bezpečné nasazení infrastruktury
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Bezpečnost kontejnerizace AI workloadů

### Monitoring a reakce na incidenty  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Komplexní monitorovací řešení
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI specifické postupy reakce na incidenty
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Řízení bezpečnostních informací a událostí
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Zdroje hrozeb pro AI

## 🔄 Neustálé zlepšování

### Zůstaňte v obraze s vývojem standardů
- **Aktualizace MCP specifikace**: Sledujte oficiální změny specifikace MCP a bezpečnostní upozornění
- **Threat Intelligence**: Odebírejte zdroje hrozeb v AI a databáze zranitelností  
- **Zapojení komunity**: Účastnit se diskuzí a pracovních skupin bezpečnostní komunity MCP  
- **Pravidelné hodnocení**: Provádět čtvrtletní hodnocení bezpečnostního stavu a podle toho aktualizovat postupy

### Přispívání k bezpečnosti MCP
- **Bezpečnostní výzkum**: Přispívat k výzkumu bezpečnosti MCP a programům oznamování zranitelností  
- **Sdílení osvědčených postupů**: Sdílet bezpečnostní implementace a získané zkušenosti s komunitou  
- **Vývoj standardů**: Účastnit se vývoje specifikací MCP a tvorby bezpečnostních standardů  
- **Vývoj nástrojů**: Vyvíjet a sdílet bezpečnostní nástroje a knihovny pro ekosystém MCP

---

*Tento dokument odráží osvědčené bezpečnostní postupy MCP k 18. prosinci 2025, vycházející ze specifikace MCP 2025-11-25. Bezpečnostní postupy by měly být pravidelně přezkoumávány a aktualizovány podle vývoje protokolu a hrozeb.*

## Co dál

- Číst: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- Vrátit se na: [Security Module Overview](./README.md)  
- Pokračovat na: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace doporučujeme profesionální lidský překlad. Nejsme odpovědni za jakékoli nedorozumění či nesprávné výklady vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->