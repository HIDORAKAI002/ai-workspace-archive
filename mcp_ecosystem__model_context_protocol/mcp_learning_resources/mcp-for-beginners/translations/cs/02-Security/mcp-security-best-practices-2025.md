# Nejlepší bezpečnostní postupy MCP - aktualizace únor 2026

> **Důležité**: Tento dokument odráží nejnovější bezpečnostní požadavky [MCP specifikace 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) a oficiální [Nejlepší bezpečnostní postupy MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Vždy se řiďte aktuální specifikací pro nejnovější doporučení.

## 🏔️ Praktický bezpečnostní trénink

Pro praktické zkušenosti s implementací doporučujeme **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – komplexní vedenou expedici zabezpečení MCP serverů v Azure. Workshopy pokrývají všechna rizika OWASP MCP Top 10 pomocí metodologie „zranitelné → zneužití → oprava → ověření“.

Všechny postupy v tomto dokumentu jsou v souladu s **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** pro implementaci specifickou pro Azure.

## Základní bezpečnostní postupy pro implementace MCP

Model Context Protocol přináší jedinečné bezpečnostní výzvy, které přesahují tradiční bezpečnost softwaru. Tyto postupy řeší jak základní bezpečnostní požadavky, tak MCP-specifická ohrožení včetně prompt injection, tool poisoning, session hijacking, confused deputy problémů a token passthrough zranitelností.

### **POVINNÉ bezpečnostní požadavky**

**Kritické požadavky ze specifikace MCP:**

### **POVINNÉ bezpečnostní požadavky**

**Kritické požadavky ze specifikace MCP:**

> **NESMÍ**: MCP servery **NESMÍ** přijímat žádné tokeny, které nebyly výslovně vydány pro MCP server  
>  
> **MUSÍ**: MCP servery implementující autorizaci **MUSÍ** ověřovat VŠECHNY příchozí požadavky  
>  
> **NESMÍ**: MCP servery **NESMÍ** používat session pro autentizaci  
>  
> **MUSÍ**: MCP proxy servery používající statické klientské ID **MUSÍ** získat souhlas uživatele pro každý dynamicky registrovaný klient

---

## 1. **Bezpečnost tokenů a autentizace**

**Kontroly autentizace a autorizace:**
   - **Přísné přezkoumání autorizace**: Proveďte komplexní audity autorizace MCP serveru, aby k prostředkům měli přístup pouze zamýšlení uživatelé a klienti  
   - **Integrace externího poskytovatele identity**: Používejte zavedené poskytovatele identity, jako je Microsoft Entra ID, místo vlastních řešení autentizace  
   - **Validace publika tokenu**: Vždy ověřujte, že tokeny byly výslovně vydány pro váš MCP server – nikdy nepřijímejte upstream tokeny  
   - **Správný životní cyklus tokenu**: Implementujte bezpečnou rotaci tokenů, politiky expirace a chráněte proti opětovnému použití tokenů

**Chráněné ukládání tokenů:**
   - Používejte Azure Key Vault nebo obdobné bezpečné úložiště pro všechna tajemství  
   - Implementujte šifrování tokenů v klidu i při přenosu  
   - Pravidelná rotace přístupových údajů a monitorování neoprávněného přístupu

## 2. **Správa session a bezpečnost přenosu**

**Bezpečné postupy pro session:**
   - **Kryptograficky bezpečná session ID**: Používejte bezpečná, nedeterministická session ID generovaná bezpečnými náhodnými generátory  
   - **Vazba na uživatele**: Vazba session ID na identitu uživatele pomocí formátu `<user_id>:<session_id>` k zabránění zneužití mezi uživateli  
   - **Správa životního cyklu session**: Implementujte správnou expiraci, rotaci a invalidaci k omezení zranitelných oken  
   - **Povinné HTTPS/TLS**: Povinné HTTPS pro všechny komunikace, aby se zabránilo zachycení session ID

**Bezpečnost transportní vrstvy:**
   - Konfigurujte TLS 1.3, pokud je to možné, s řádnou správou certifikátů  
   - Implementujte certificate pinning pro kritická spojení  
   - Pravidelná rotace certifikátů a ověřování jejich platnosti

## 3. **Ochrana proti hrozbám specifickým pro AI** 🤖

**Obrana proti prompt injection:**
   - **Microsoft Prompt Shields**: Nasazení AI Prompt Shieldů pro pokročilou detekci a filtrování škodlivých instrukcí  
   - **Sanitizace vstupů**: Validujte a sanitizujte všechny vstupy, aby se zabránilo injekčním útokům a „confused deputy“ problémům  
   - **Oddělení obsahu**: Používejte systémy oddělování a označování dat k rozlišení mezi důvěryhodnými instrukcemi a externím obsahem

**Prevence před tool poisoning:**
   - **Validace metadat nástrojů**: Implementujte kontroly integrity definic nástrojů a sledujte neočekávané změny  
   - **Dynamický monitoring nástrojů**: Sledujte chování během provozu a nastavte upozornění na neočekávané vzory vykonávání  
   - **Schvalovací procesy**: Vyžadujte explicitní souhlas uživatele při změnách nástrojů a jejich funkcí

## 4. **Řízení přístupu a oprávnění**

**Princip minimálních práv:**
   - Udělte MCP serverům pouze minimální oprávnění nezbytná pro zamýšlenou funkčnost  
   - Implementujte řízení přístupu založené na rolích (RBAC) s jemně odstupňovanými oprávněními  
   - Pravidelné revize oprávnění a kontinuální monitorování pro eskalaci privilegií

**Kontroly oprávnění za běhu:**
   - Aplikujte limity zdrojů k prevenci útoků na vyčerpání zdrojů  
   - Používejte izolaci kontejnerů pro prostředí vykonávání nástrojů  
   - Implementujte přístup „just-in-time“ pro administrativní funkce

## 5. **Bezpečnost obsahu a monitorování**

**Implementace bezpečnosti obsahu:**
   - **Integrace Azure Content Safety**: Používejte Azure Content Safety pro detekci škodlivého obsahu, pokusů o jailbreak a porušení politik  
   - **Behaviorální analýza**: Implementujte runtime sledování chování pro detekci anomálií v MCP serveru a při vykonávání nástrojů  
   - **Komplexní protokolování**: Logujte všechny pokusy o autentizaci, vyvolání nástrojů a bezpečnostní události s bezpečným, odolným úložištěm

**Nepřetržité monitorování:**
   - Real-time upozornění na podezřelé vzory a pokusy o neoprávněný přístup  
   - Integrace se SIEM systémy pro centralizovanou správu bezpečnostních událostí  
   - Pravidelné bezpečnostní audity a penetrační testování implementací MCP

## 6. **Bezpečnost dodavatelského řetězce**

**Ověření komponent:**
   - **Skenování závislostí**: Používejte automatizované skenování zranitelností všech softwarových závislostí a AI komponent  
   - **Validace původu**: Ověřujte původ, licencování a integritu modelů, datových zdrojů a externích služeb  
   - **Podepsané balíčky**: Používejte kryptograficky podepsané balíčky a před nasazením ověřujte podpisy

**Bezpečný vývojový pipeline:**
   - **GitHub Advanced Security**: Implementujte skenování tajemství, analýzu závislostí a statickou analýzu CodeQL  
   - **Bezpečnost CI/CD**: Integrace bezpečnostního ověřování do automatizovaných pipelines nasazování  
   - **Integrita artefaktů**: Implementujte kryptografickou verifikaci nasazených artefaktů a konfigurací

## 7. **OAuth bezpečnost a prevence confused deputy útoků**

**Implementace OAuth 2.1:**
   - **PKCE implementace**: Používejte Proof Key for Code Exchange (PKCE) pro všechny autorizační požadavky  
   - **Explicitní souhlas**: Získejte souhlas uživatele pro každý dynamicky registrovaný klient, abyste předešli confused deputy útokům  
   - **Validace Redirect URI**: Implementujte přísnou validaci Redirect URI a identifikátorů klientů

**Bezpečnost proxy:**
   - Zabraňte obejití autorizace prostřednictvím zneužití statických klientských ID  
   - Implementujte správné workflowy pro získávání souhlasů pro přístup k API třetích stran  
   - Sledujte krádež autorizačních kódů a neoprávněný přístup k API

## 8. **Reakce na incidenty a obnova**

**Schopnosti rychlé reakce:**
   - **Automatizovaná reakce**: Implementujte automatizované systémy pro rotaci přístupových údajů a omezení hrozeb  
   - **Postupy rollbacku**: Možnost rychle se vrátit k ověřeným konfiguracím a komponentám  
   - **Forenzní schopnosti**: Detailní auditní stopy a logování pro vyšetřování incidentů

**Komunikace a koordinace:**
   - Jasné eskalační postupy pro bezpečnostní incidenty  
   - Integrace s týmy organizační reakce na incidenty  
   - Pravidelné simulace bezpečnostních incidentů a cvičení u stolu

## 9. **Soulad s předpisy a správa**

**Regulatorní shoda:**
   - Zajistěte, aby implementace MCP splňovaly požadavky specifické pro průmysl (GDPR, HIPAA, SOC 2)  
   - Implementujte klasifikaci dat a kontrolu soukromí při zpracování AI dat  
   - Udržujte komplexní dokumentaci pro audity shody

**Řízení změn:**
   - Formální bezpečnostní přezkumy všech změn systému MCP  
   - Správa verzí a schvalovací workflowy pro změny konfigurací  
   - Pravidelné hodnocení souladu a analýza mezer

## 10. **Pokročilé bezpečnostní kontroly**

**Zero Trust architektura:**
   - **Nikdy ne důvěřuj, vždy ověřuj**: Kontinuální ověřování uživatelů, zařízení a připojení  
   - **Mikrosegmentace**: Granulární síťové kontroly izolující jednotlivé MCP komponenty  
   - **Podmíněný přístup**: Řízení přístupu založené na riziku přizpůsobující se aktuálnímu kontextu a chování

**Ochrana aplikací za běhu:**
   - **Runtime Application Self-Protection (RASP)**: Nasazení RASP technik pro detekci hrozeb v reálném čase  
   - **Monitoring výkonnosti aplikací**: Sledujte výkonnostní anomálie, které mohou naznačovat útoky  
   - **Dynamické bezpečnostní politiky**: Implementujte politiky, které se přizpůsobují na základě aktuální hrozeb

## 11. **Integrace s Microsoft bezpečnostním ekosystémem**

**Komplexní Microsoft bezpečnost:**
   - **Microsoft Defender for Cloud**: Správa bezpečnostního stavu cloudových nákladů MCP  
   - **Azure Sentinel**: Cloudové SIEM a SOAR schopnosti pro pokročilou detekci hrozeb  
   - **Microsoft Purview**: Správa dat a shody pro AI workflowy a datové zdroje

**Správa identity a přístupu:**
   - **Microsoft Entra ID**: Podniková správa identity s politikami podmíněného přístupu  
   - **Privileged Identity Management (PIM)**: Přístup na vyžádání a schvalovací workflowy pro administrativní funkce  
   - **Ochrana identity**: Rizikově založený podmíněný přístup a automatická reakce na hrozby

## 12. **Nepřetržitá evoluce bezpečnosti**

**Zůstat aktuální:**
   - **Monitorování specifikací**: Pravidelné přezkoumání aktualizací MCP specifikace a změn bezpečnostních doporučení  
   - **Zpravodajství o hrozbách**: Integrace feedů hrozeb specifických pro AI a indikátorů kompromitace  
   - **Zapojení bezpečnostní komunity**: Aktivní účast v MCP bezpečnostní komunitě a programech oznamování zranitelností

**Adaptivní bezpečnost:**
   - **Bezpečnost strojového učení**: Použití ML k detekci anomálií pro identifikaci nových vzorů útoků  
   - **Prediktivní bezpečnostní analytika**: Implementace prediktivních modelů pro proaktivní identifikaci hrozeb  
   - **Automatizace bezpečnosti**: Automatizované aktualizace bezpečnostních politik na základě zpravodajství o hrozbách a změn specifikací

---

## **Klíčové bezpečnostní zdroje**

### **Oficiální dokumentace MCP**
- [MCP specifikace (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Nejlepší bezpečnostní postupy MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autorizace specifikace](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP bezpečnostní zdroje**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - komplexní OWASP MCP Top 10 s Azure implementací  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - oficiální OWASP MCP bezpečnostní rizika  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - praktický bezpečnostní trénink MCP na Azure

### **Microsoft bezpečnostní řešení**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Bezpečnostní standardy**
- [OAuth 2.0 bezpečnostní nejlepší praxe (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 pro Large Language Models](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Implementační průvodce**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID s MCP servery](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Bezpečnostní upozornění**: Bezpečnostní postupy MCP se rychle vyvíjejí. Vždy ověřte aktuálnost vůči té aktuální [MCP specifikaci](https://spec.modelcontextprotocol.io/) a [oficiální bezpečnostní dokumentaci](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) před implementací.

## Co dál

- Číst: [MCP Security Controls 2025](./mcp-security-controls-2025.md)
- Návrat na: [Přehled bezpečnostního modulu](./README.md)
- Pokračovat na: [Modul 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí služby automatického překladu AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ačkoli usilujeme o přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho původním jazyce by měl být považován za autoritativní zdroj. Pro zásadní informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo chybné interpretace vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->