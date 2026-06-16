# MCP Security: Komplexní ochrana AI systémů

[![MCP Security Best Practices](../../../translated_images/cs/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klikněte na obrázek výše pro zobrazení videa k této lekci)_

Bezpečnost je základním prvkem návrhu AI systémů, proto jí věnujeme prioritu jako druhé části. To odpovídá principu Microsoftu **Secure by Design** z [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) přináší silné nové schopnosti do aplikací řízených AI, ale zároveň přináší jedinečné bezpečnostní výzvy, které přesahují tradiční softwarová rizika. Systémy MCP čelí jak zavedeným bezpečnostním hrozbám (bezpečné kódování, princip nejmenších oprávnění, bezpečnost dodavatelského řetězce), tak novým AI-specifickým hrozbám včetně prompt injection, tool poisoning, únosu relace, útoků typu confused deputy, zranitelností při průchodu tokeny a dynamické modifikace schopností.

Tato lekce zkoumá nejkritičtější bezpečnostní rizika při implementaci MCP – pokrývá autentizaci, autorizaci, nadměrná oprávnění, nepřímý prompt injection, bezpečnost relace, problémy confused deputy, správu tokenů a zranitelnosti dodavatelského řetězce. Naučíte se praktická opatření a nejlepší postupy pro zmírnění těchto rizik při využití Microsoft řešení jako Prompt Shields, Azure Content Safety a GitHub Advanced Security ke zvýšení bezpečnosti vaší MCP nasazení.

## Cíle učení

Na konci této lekce budete umět:

- **Identifikovat MCP-specifické hrozby**: Rozpoznat jedinečná bezpečnostní rizika v systémech MCP včetně prompt injection, tool poisoning, nadměrných oprávnění, únosu relace, problémů confused deputy, zranitelností při průchodu tokeny a rizik dodavatelského řetězce
- **Aplikovat bezpečnostní opatření**: Implementovat účinná zmírnění včetně robustní autentizace, přístupu na základě nejmenších oprávnění, bezpečné správy tokenů, kontrol bezpečnosti relace a ověřování dodavatelského řetězce
- **Využít Microsoft bezpečnostní řešení**: Pochopit a nasadit Microsoft Prompt Shields, Azure Content Safety a GitHub Advanced Security pro ochranu MCP zátěží
- **Validovat bezpečnost nástrojů**: Uvědomit si důležitost validace metadat nástrojů, monitorování dynamických změn a obrany proti nepřímým prompt injection útokům
- **Integrovat osvědčené postupy**: Kombinovat zavedené bezpečnostní základy (bezpečné kódování, zpevnění serveru, zero trust) s MCP-specifickými opatřeními pro komplexní ochranu

# MCP Security Architecture & Controls

Moderní implementace MCP vyžadují vrstvené bezpečnostní přístupy, které řeší jak tradiční softwarovou bezpečnost, tak AI-specifické hrozby. Rychle se vyvíjející specifikace MCP nadále zdokonaluje svá bezpečnostní opatření, což umožňuje lepší integraci s podnikovými bezpečnostními architekturami a zavedenými osvědčenými postupy.

Výzkum z [Microsoft Digital Defense Report](https://aka.ms/mddr) ukazuje, že **98 % nahlášených průniků by zabránila robustní bezpečnostní hygiena**. Nejefektivnější ochranná strategie kombinuje základní bezpečnostní postupy s MCP-specifickými kontrolami – ověřená základní opatření zůstávají nejúčinnějšími při snižování celkového bezpečnostního rizika.

## Současná bezpečnostní situace

> **Poznámka:** Tyto informace odrážejí bezpečnostní standardy MCP k datu **5. února 2026**, v souladu se **specifikací MCP 2025-11-25**. Protokol MCP se stále rychle vyvíjí a budoucí implementace mohou zavést nové vzory autentizace a zdokonalená opatření. Vždy se řiďte aktuální [specifikací MCP](https://spec.modelcontextprotocol.io/), [MCP GitHub repozitářem](https://github.com/modelcontextprotocol) a [dokumentací bezpečnostních osvědčených postupů](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pro nejnovější pokyny.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Pro **praktický bezpečnostní trénink** důrazně doporučujeme **MCP Security Summit Workshop** (Sherpa) – komplexní řízenou expedici k zabezpečení MCP serverů v Microsoft Azure.

### Přehled workshopu

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) poskytuje praktický, akční bezpečnostní trénink prostřednictvím ověřené metodiky „zranitelné → exploit → opravit → ověřit“. Budete:

- **Učit se lámáním**: Zažijete zranitelnosti přímo tím, že budete využívat záměrně nezabezpečené servery
- **Používat Azure-nativní bezpečnost**: Využijete Azure Entra ID, Key Vault, API Management a AI Content Safety
- **Následovat obranu v hloubce**: Postupovat přes základny budující komplexní vrstvy zabezpečení
- **Aplikovat OWASP standardy**: Každá technika odpovídá [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Získat produkční kód**: Odnesete si funkční a otestované implementace

### Trasa expedice

| Tábor | Zaměření | OWASP rizika pokrytá |
|-------|----------|----------------------|
| **Základní tábor** | Základy MCP a zranitelnosti autentizace | MCP01, MCP07 |
| **Tábor 1: Identita** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tábor 2: Brána** | API Management, Private Endpoints, správa | MCP02, MCP06, MCP07, MCP09 |
| **Tábor 3: I/O bezpečnost** | Prompt injection, ochrana PII, bezpečnost obsahu | MCP03, MCP05, MCP06, MCP10 |
| **Tábor 4: Monitorování** | Log Analytics, dashboardy, detekce hrozeb | MCP04, MCP08 |
| **Vrchol** | Integrace Red Team / Blue Team | Všechna |

**Začněte zde**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 bezpečnostních rizik

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) popisuje deset nejkritičtějších bezpečnostních rizik pro implementace MCP:

| Riziko | Popis | Azure mitigace |
|--------|--------|---------------|
| **MCP01** | Špatná správa tokenů & únik tajemství | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalace oprávnění přes scope creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Validace nástrojů, ověření integrity |
| **MCP04** | Útoky na dodavatelský řetězec softwaru & manipulace závislostí | GitHub Advanced Security, skenování závislostí |
| **MCP05** | Command Injection & Execution | Validace vstupů, sandboxing |
| **MCP06** | Změna toku záměru (Intent Flow Subversion) | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nedostatečná autentizace & autorizace | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Nedostatek auditu a telemetry | Azure Monitor, Application Insights |
| **MCP09** | Stínové MCP servery | Správa API Center, síťová izolace |
| **MCP10** | Context Injection & nadměrné sdílení | Klasifikace dat, minimální expozice |

### Vývoj autentizace v MCP

Specifikace MCP se významně vyvinula v přístupu k autentizaci a autorizaci:

- **Původní přístup**: V raných specifikacích museli vývojáři implementovat vlastní autentizační servery, přičemž MCP servery fungovaly jako OAuth 2.0 Autorizační servery přímo spravující autentizaci uživatelů
- **Současný standard (2025-11-25)**: Aktualizovaná specifikace povoluje MCP serverům delegovat autentizaci na externí poskytovatele identity (např. Microsoft Entra ID), což zlepšuje bezpečnostní postoj a snižuje složitost implementace
- **Transport Layer Security**: Vylepšená podpora bezpečných transportních mechanismů s odpovídajícími autentizačními vzory pro místní (STDIO) i vzdálená (Streamable HTTP) připojení

## Bezpečnost autentizace a autorizace

### Současné bezpečnostní výzvy

Moderní implementace MCP čelí několika výzvám v autentizaci a autorizaci:

### Rizika a scénáře útoků

- **Špatně nakonfigurovaná autorizační logika**: Chybné zavedení autorizace na MCP serverech může vystavit citlivá data a nesprávně aplikovat přístupová omezení
- **Kompromitace OAuth tokenů**: Krádež tokenů lokálního MCP serveru umožňuje útočníkům vystupovat jako servery a přistupovat k downstream službám
- **Zranitelnosti průchodu tokenů (token passthrough)**: Nesprávná manipulace s tokeny vytváří obcházení bezpečnostních kontrol a mezery v odpovědnosti
- **Nadměrná oprávnění**: Přemíra oprávnění MCP serverů porušuje princip nejmenších oprávnění a rozšiřuje povrch útoku

#### Token passthrough: kritický anti-pattern

**Průchod tokenů je v současné specifikaci MCP autorizace explicitně zakázán** kvůli vážným bezpečnostním důsledkům:

##### Obcházení bezpečnostních kontrol  
- MCP servery a downstream API implementují zásadní bezpečnostní kontroly (omezování rychlosti, validace požadavků, monitorování provozu), které závisí na správné validaci tokenů  
- Přímé používání tokenů klientem přímo k API obchází tyto zásadní ochrany, čímž se narušuje bezpečnostní architektura

##### Problémy s odpovědností a auditem  
- MCP servery nejsou schopné rozlišit klienty používající tokeny vydané upstream, což narušuje auditní stopy  
- Logy downstream zdrojových serverů zobrazují zavádějící původ požadavků místo skutečných MCP serverů  
- Vyšetřování incidentů a dodržování předpisů se tímto výrazně ztěžují

##### Riziko odcizení dat  
- Nevalidované nároky tokenů umožňují útočníkům se získanými tokeny využívat MCP servery jako proxy pro exfiltraci dat  
- Porušení hranic důvěry umožňuje neoprávněné přístupy, které obcházejí zamýšlené bezpečnostní kontroly

##### Víceslužbové vektory útoků  
- Kompromitované tokeny přijímané více službami umožňují laterální pohyb napříč propojenými systémy  
- Důvěryhodné vztahy mezi službami mohou být narušeny, pokud nelze ověřit původ tokenů

### Bezpečnostní kontroly a zmírnění

**Kritické bezpečnostní požadavky:**

> **POVINNÉ**: MCP servery **NESMÍ** přijímat žádné tokeny, které nebyly explicitně vydány pro daný MCP server

#### Kontroly autentizace a autorizace

- **Důkladná kontrola autorizace**: Proveďte komplexní audity logiky autorizace MCP serverů, aby k citlivým zdrojům měli přístup pouze zamýšlení uživatelé a klienti  
  - **Průvodce implementací**: [Azure API Management jako autentizační brána pro MCP servery](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Integrace identity**: [Použití Microsoft Entra ID pro autentizaci MCP serveru](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Bezpečná správa tokenů**: Implementujte [nejlepší postupy Microsoftu pro validaci a životní cyklus tokenů](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Validujte nároky audiencí tokenů odpovídajících identitě MCP serveru  
  - Zaveďte správnou rotaci tokenů a expirační politiku  
  - Zabraňte útokům znovupoužití tokenů a neoprávněnému používání

- **Ochrana uložení tokenů**: Zabezpečte uložení tokenů šifrováním jak v klidu, tak při přenosu  
  - **Osvědčené postupy**: [Pokyny pro zabezpečené uložení tokenů a šifrování](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementace řízení přístupu

- **Princip nejmenších oprávnění**: Udělujte MCP serverům pouze minimální oprávnění potřebná pro zamýšlenou funkcionalitu  
  - Pravidelné kontroly oprávnění a aktualizace k zabránění scope creep  
  - **Dokumentace Microsoftu**: [Bezpečný přístup s nejmenšími oprávněními](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-based Access Control (RBAC)**: Implementujte jemně odstupňovaná role  
  - Přesné přiřazení rolí k určitému zdrojům a operacím  
  - Vyhněte se širokým nebo zbytečným oprávněním, která zvětšují povrch útoku

- **Kontinuální monitoring oprávnění**: Zavádějte průběžný audit a sledování přístupů  
  - Monitorujte vzorce využití oprávnění hledající anomálie  
  - Okamžitě odstraňujte nadměrná nebo nevyužívaná oprávnění

## AI-specifické bezpečnostní hrozby

### Prompt Injection & útoky manipulací nástrojů

Moderní implementace MCP čelí sofistikovaným AI-specifickým vektorům útoků, které tradiční bezpečnostní opatření nedokážou zcela řešit:

#### **Nepřímý Prompt Injection (Cross-Domain Prompt Injection)**

**Nepřímý Prompt Injection** představuje jednu z nejkritičtějších zranitelností v AI systémech s podporou MCP. Útočníci vkládají škodlivé instrukce uvnitř externího obsahu – dokumentů, webových stránek, e-mailů nebo datových zdrojů –, které AI systémy následně zpracovávají jako legitimní příkazy.

**Scénáře útoků:**  
- **Injekce založená na dokumentech**: Škodlivé instrukce skryté v zpracovávaných dokumentech vyvolávají nechtěné AI akce  
- **Zneužití webového obsahu**: Kompromitované webové stránky obsahující vložené příkazy, které manipulují chování AI při scraping  
- **Útoky přes e-maily**: Škodlivé prompt instrukce v e-mailech způsobující únik informací nebo nežádoucí akce AI asistentů  
- **Kontaminace datových zdrojů**: Kompromitované databáze nebo API poskytující AI systémům znečištěný obsah

**Reálný dopad**: Tyto útoky mohou vést k exfiltraci dat, porušení soukromí, generování škodlivého obsahu a manipulaci s uživatelskými interakcemi. Více detailů najdete v [Prompt Injection v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/cs/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning útoky**

**Tool Poisoning** cílí na metadata definující MCP nástroje, využívající, jak LLM interpretují popisy nástrojů a parametry pro rozhodování o spuštění.

**Mechanismy útoku:**  
- **Manipulace s metadaty**: Útočníci vkládají škodlivé instrukce do popisů nástrojů, definic parametrů nebo příkladů použití  
- **Neviditelné instrukce**: Skryté prompt instrukce v metadatech nástrojů, které AI modely zpracovávají, ale pro uživatele jsou neviditelné  
- **Dynamické modifikace nástrojů („Rug Pulls“)**: Nástroje schválené uživateli jsou později upraveny k provádění škodlivých akcí bez vědomí uživatele  
- **Injekce parametrů**: Škodlivý obsah vložený do schémat parametrů nástrojů, který ovlivňuje chování modelu

**Rizika hostovaných serverů**: Vzdálené MCP servery nesou vyšší riziko, protože definice nástrojů mohou být aktualizovány po počátečním schválení uživatelem, což vytváří scénáře, kdy se původně bezpečné nástroje stanou škodlivými. Pro komplexní analýzu viz [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/cs/tool-injection.3b0b4a6b24de6bef.webp)

#### **Další AI vektory útoků**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikované útoky využívající obsah z více domén k obcházení bezpečnostních kontrol
- **Dynamická modifikace schopností**: Změny schopností nástroje v reálném čase, které uniknou počátečním bezpečnostním hodnocením  
- **Poškození kontextového okna**: Útoky manipulující s velkými kontextovými okny za účelem skrytí škodlivých instrukcí  
- **Útoky zmatení modelu**: Využívání omezení modelu k vytvoření nepředvídatelných nebo nebezpečných chování  


### Dopad rizik bezpečnosti AI

**Důsledky s vysokým dopadem:**  
- **Exfiltrace dat**: Neoprávněný přístup a krádež citlivých podnikových nebo osobních dat  
- **Porušení soukromí**: Zveřejnění osobních identifikovatelných údajů (PII) a důvěrných obchodních dat  
- **Manipulace se systémy**: Nezamýšlené úpravy kritických systémů a pracovních postupů  
- **Krádež přihlašovacích údajů**: Kompromitace autentizačních tokenů a přihlašovacích údajů služeb  
- **Laterální pohyb**: Využívání kompromitovaných AI systémů jako odrazových můstků pro širší síťové útoky  

### Řešení bezpečnosti AI od Microsoftu

#### **AI Prompt Shields: Pokročilá ochrana proti injekčním útokům**

Microsoft **AI Prompt Shields** poskytuje komplexní obranu proti přímým i nepřímým injekčním útokům na prompt prostřednictvím několika bezpečnostních vrstev:

##### **Základní ochranné mechanismy:**

1. **Pokročilá detekce a filtrování**  
   - Algoritmy strojového učení a techniky NLP rozpoznávají škodlivé instrukce v externím obsahu  
   - Analýza dokumentů, webových stránek, e-mailů a zdrojů dat v reálném čase na přítomnost zabudovaných hrozeb  
   - Kontextuální porozumění legitimním vs. škodlivým vzorcům promptů  

2. **Techniky zvýraznění**  
   - Rozlišuje mezi důvěryhodnými systémovými instrukcemi a potenciálně kompromitovanými externími vstupy  
   - Metody transformace textu, které zvyšují relevantnost modelu a zároveň izolují škodlivý obsah  
   - Pomáhá AI systémům udržet správnou hierarchii instrukcí a ignorovat injektované příkazy  

3. **Systémy oddělovačů a datových značek**  
   - Výslovné vymezení hranic mezi důvěryhodnými systémovými zprávami a externím vstupním textem  
   - Speciální značky zvýrazňující hranice mezi důvěryhodnými a nedůvěryhodnými zdroji dat  
   - Jasné oddělení zabraňuje záměně instrukcí a neoprávněnému provádění příkazů  

4. **Kontinuální zpravodajství o hrozbách**  
   - Microsoft nepřetržitě monitoruje vznikající vzory útoků a aktualizuje obranu  
   - Proaktivní vyhledávání hrozeb nových injekčních technik a útočných vektorů  
   - Pravidelné aktualizace bezpečnostních modelů pro udržení účinnosti proti vyvíjejícím se hrozbám  

5. **Integrace Azure Content Safety**  
   - Součást komplexního balíčku Azure AI Content Safety  
   - Dodatečná detekce pokusů o jailbreak, škodlivého obsahu a porušení bezpečnostních politik  
   - Jednotná bezpečnostní kontrola napříč komponentami AI aplikací  

**Implementační zdroje**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/cs/prompt-shield.ff5b95be76e9c78c.webp)


## Pokročilé bezpečnostní hrozby MCP

### Zranitelnosti únosu relace

**Únos relace** představuje kritický útočný vektor ve stavových implementacích MCP, kde neoprávněné strany získávají a zneužívají legitimní identifikátory relací k vydávání se za klienty a provádění neoprávněných akcí.

#### **Scénáře útoků a rizika**

- **Injekce promptu únosu relace**: Útočníci s odcizenými ID relací injektují škodlivé události do serverů sdílejících stav relace, což může spustit škodlivé akce nebo přístup k citlivým datům  
- **Přímé vydávání se za uživatele**: Odcizená ID relací umožňují volání MCP serveru, které obcházejí autentizaci a zacházejí s útočníky jako s legitimními uživateli  
- **Kompromitované obnovitelné streamy**: Útočníci mohou předčasně ukončit požadavky, což způsobí, že legitimní klienti obnoví stream s potenciálně škodlivým obsahem  

#### **Bezpečnostní kontroly pro správu relací**

**Kritické požadavky:**  
- **Ověření autorizace**: MCP servery implementující autorizaci musí verifikovat VŠECHNY příchozí požadavky a NESMÍ se spoléhat na relace pro autentizaci  
- **Bezpečná generace relací**: Používejte kryptograficky bezpečná, nedeterministická ID relací generovaná bezpečnými generátory náhodných čísel  
- **Vazba na konkrétního uživatele**: Vazání ID relace na uživatelská data např. ve formátu `<user_id>:<session_id>`, aby se zabránilo zneužití mezi uživateli  
- **Správa životního cyklu relace**: Implementace správného vypršení platnosti, rotace a neplatnosti k omezení zranitelných období  
- **Bezpečnost přenosu**: Povinné HTTPS pro veškerou komunikaci k zabránění zachycení ID relace  

### Problém zmateného zástupce

**Problém zmateného zástupce** nastává, když MCP servery fungují jako autentizační proxy mezi klienty a třetími stranami, čímž vzniká příležitost k obcházení autorizace prostřednictvím zneužití statických ID klienta.

#### **Mechanika útoku a rizika**

- **Obcházení souhlasu na bázi cookies**: Předchozí autentizace uživatele vytváří cookies se souhlasem, které útočníci zneužívají prostřednictvím škodlivých autorizací s vytvořenými URI pro přesměrování  
- **Krádež autorizačního kódu**: Existující cookies mohou způsobit, že autorizační servery přeskočí obrazovky souhlasu a přesměrují kódy na útokem kontrolované koncové body  
- **Neoprávněný přístup k API**: Odcizené autorizační kódy umožňují výměnu tokenů a vydávání se za uživatele bez výslovného schválení  

#### **Strategie zmírnění**

**Povinné kontroly:**  
- **Explicitní požadavky na souhlas**: MCP proxy servery používající statická ID klienta musí získat souhlas uživatele pro každého dynamicky registrovaného klienta  
- **Bezpečnostní implementace OAuth 2.1**: Dodržujte současné bezpečnostní postupy OAuth včetně PKCE (Proof Key for Code Exchange) pro všechny autorizace  
- **Přísná validace klientů**: Implementujte důkladné ověřování URI pro přesměrování a identifikátorů klientů, aby se zabránilo zneužití  

### Zranitelnosti přeposílání tokenů

**Přeposílání tokenů** představuje explicitní antipattern, kdy MCP servery přijímají tokeny klienta bez řádné validace a předávají je do dolních API, čímž porušují autorizaci MCP.

#### **Bezpečnostní důsledky**

- **Obcházení kontroly**: Přímé použití tokenů klientem k API obchází klíčové limity rychlosti, validace a monitorování  
- **Poškození auditních stop**: Tokeny vydané upstream znemožňují identifikaci klienta a narušují vyšetřování incidentů  
- **Exfiltrace dat přes proxy**: Nevalidované tokeny umožňují útočníkům využívat servery jako proxy pro neoprávněný přístup k datům  
- **Porušení důvěry mezi hranicemi**: Předpoklady důvěry dolních služeb mohou být porušeny, pokud nelze ověřit původ tokenů  
- **Šíření útoků přes více služeb**: Kompromitované tokeny platné v několika službách umožňují laterální pohyb  

#### **Požadované bezpečnostní kontroly**

**Nezbytná opatření:**  
- **Validace tokenů**: MCP servery NESMÍ přijímat tokeny nevydané explicitně pro daný MCP server  
- **Ověření publika tokenu**: Vždy validujte, zda audience tokenu odpovídá identitě MCP serveru  
- **Správný životní cyklus tokenů**: Implementujte krátkodobé access tokeny s bezpečnými praktiky rotace  


## Bezpečnost dodavatelského řetězce pro AI systémy

Bezpečnost dodavatelského řetězce přesáhla tradiční závislosti softwaru a zahrnuje celý ekosystém AI. Moderní MCP implementace musí pečlivě ověřovat a monitorovat všechny AI komponenty, protože každá přináší potenciální zranitelnosti, které mohou ohrozit integritu systému.

### Rozšířené komponenty dodavatelského řetězce AI

**Tradiční softwarové závislosti:**  
- Open-source knihovny a frameworky  
- Kontejnerové obrazy a základní systémy  
- Vývojové nástroje a pipeline pro sestavení  
- Infrastrukturní komponenty a služby  

**Specifické AI prvky dodavatelského řetězce:**  
- **Základní modely (Foundation Models)**: Předtrénované modely od různých poskytovatelů vyžadující ověření původu  
- **Služby vkládání (Embedding Services)**: Externí služby pro vektorizaci a sémantické vyhledávání  
- **Poskytovatelé kontextu**: Datové zdroje, znalostní báze a repozitáře dokumentů  
- **API třetích stran**: Externí AI služby, ML pipeline a datové zpracovatelské endpointy  
- **Artefakty modelů**: Váhy, konfigurace a jemně doladěné varianty modelů  
- **Zdrojová data pro trénink**: Dataset použité pro trénink a jemné ladění modelů  

### Komplexní strategie bezpečnosti dodavatelského řetězce

#### **Ověření komponent a důvěryhodnost**  
- **Validace původu**: Ověřte původ, licencování a integritu všech AI komponent před integrací  
- **Bezpečnostní hodnocení**: Provádějte skeny zranitelností a bezpečnostní kontroly modelů, datových zdrojů a AI služeb  
- **Analýza reputace**: Hodnoťte bezpečnostní historii a postupy poskytovatelů AI služeb  
- **Ověření souladu**: Zajistěte, aby všechny komponenty splňovaly bezpečnostní a regulační požadavky organizace  

#### **Bezpečné deployment pipeline**  
- **Automatizované CI/CD zabezpečení**: Integrace bezpečnostních skenů v průběhu automatizovaných pipeline pro nasazení  
- **Integrita artefaktů**: Implementace kryptografického ověření všech nasazených artefaktů (kód, modely, konfigurace)  
- **Postupné nasazení**: Použití progresivního nasazení s bezpečnostní validací v každé fázi  
- **Důvěryhodné repozitáře artefaktů**: Nasazení pouze z ověřených a bezpečných registrů a repozitářů artefaktů  

#### **Kontinuální monitorování a reakce**  
- **Skenování závislostí**: Nepřetržité monitorování zranitelností všech softwarových a AI komponent  
- **Monitorování modelů**: Neustálé hodnocení chování modelu, odchylky výkonu a bezpečnostních anomálií  
- **Sledování stavu služeb**: Monitorování externích AI služeb z hlediska dostupnosti, bezpečnostních incidentů a změn politik  
- **Integrace zpravodajství o hrozbách**: Začlenění dat o hrozbách specifických pro AI a ML bezpečnostní rizika  

#### **Řízení přístupu a princip nejmenšího oprávnění**  
- **Oprávnění na úrovni komponent**: Omezte přístup k modelům, datům a službám pouze na základě obchodní potřeby  
- **Správa servisních účtů**: Používejte vyhrazené servisní účty s minimálními požadovanými oprávněními  
- **Segmentace sítě**: Izolujte AI komponenty a omezte síťový přístup mezi službami  
- **Kontroly API gateway**: Používejte centralizované API gateway k řízení a monitorování přístupu k externím AI službám  

#### **Reakce na incidenty a obnovování**  
- **Rychlé reakční postupy**: Zavedené procesy pro záplaty nebo nahrazení kompromitovaných AI komponent  
- **Rotace přihlašovacích údajů**: Automatizované systémy pro rotaci tajemství, API klíčů a přihlašovacích údajů služeb  
- **Možnosti rollbacku**: Schopnost rychle se vrátit k předchozím známým dobrým verzím AI komponent  
- **Obnova po narušení dodavatelského řetězce**: Specifické postupy pro reakci na kompromitaci AI služeb upstream  

### Bezpečnostní nástroje a integrace Microsoftu

**GitHub Advanced Security** poskytuje komplexní ochranu dodavatelského řetězce včetně:  
- **Skenování tajemství**: Automatická detekce přihlašovacích údajů, API klíčů a tokenů v repozitářích  
- **Skenování závislostí**: Hodnocení zranitelností open-source závislostí a knihoven  
- **Analýza CodeQL**: Statická analýza kódu na bezpečnostní zranitelnosti a chybné praktiky  
- **Přehled dodavatelského řetězce**: Přehled o stavu zdraví a bezpečnosti závislostí  

**Integrace Azure DevOps a Azure Repos:**  
- Bezproblémová integrace bezpečnostních skenů v Microsoft vývojových platformách  
- Automatizované bezpečnostní kontroly v Azure Pipelines pro AI workloady  
- Vynucování politik pro bezpečné nasazení AI komponent  

**Interní praktiky Microsoftu:**  
Microsoft uplatňuje rozsáhlé bezpečnostní postupy dodavatelského řetězce napříč produkty. Přehled ověřených přístupů získáte v [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Nejlepší praktiky základní bezpečnosti

Implementace MCP dědí a rozvíjí existující bezpečnostní postoj vaší organizace. Posílení základních bezpečnostních praktik výrazně zvyšuje celkovou bezpečnost AI systémů a nasazení MCP.

### Základní bezpečnostní principy

#### **Bezpečný vývoj**  
- **Soulad s OWASP**: Ochrana proti [OWASP Top 10](https://owasp.org/www-project-top-ten/) zranitelnostem webových aplikací  
- **Specifická ochrana AI**: Implementace kontrol pro [OWASP Top 10 pro LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Bezpečná správa tajemství**: Používání dedikovaných vaultů pro tokeny, API klíče a citlivá konfigurační data  
- **End-to-end šifrování**: Implementace zabezpečené komunikace ve všech komponentách aplikace a toku dat  
- **Validace vstupů**: Přísná validace všech uživatelských vstupů, parametrů API a datových zdrojů  

#### **Zesílení infrastruktury**  
- **Vícefaktorová autentizace**: Povinné MFA pro všechny administrativní a servisní účty  
- **Správa záplat**: Automatizované, včasné záplatování operačních systémů, frameworků a závislostí  
- **Integrace poskytovatelů identity**: Centralizovaná správa identity přes podnikové poskytovatele identity (Microsoft Entra ID, Active Directory)  
- **Segmentace sítě**: Logická izolace MCP komponent k omezení možnosti laterálního pohybu  
- **Princip nejmenších oprávnění**: Minimální potřebná oprávnění pro všechny systémové komponenty a účty  

#### **Monitorování bezpečnosti a detekce**  
- **Komplexní logování**: Detailní záznam aktivit AI aplikací včetně interakcí klient-server MCP  
- **Integrace SIEM**: Centralizované řízení bezpečnostních informací a událostí pro detekci anomálií  
- **Behaviorální analytika**: AI-poháněné monitorování pro detekci neobvyklých vzorců chování systému a uživatelů  
- **Bezpečnostní zpravodajství**: Integrace externích zdrojů informací o hrozbách a indikátorů kompromitace (IOC)  
- **Reakce na incidenty**: Dobře definované postupy pro detekci, reakci a obnovu po bezpečnostních incidentech  

#### **Architektura nulové důvěry (Zero Trust)**  
- **Nikdy nedůvěřuj, vždy ověřuj**: Kontinuální ověřování uživatelů, zařízení a síťových připojení  
- **Mikrosegmentace**: Granulární síťová kontrola izolující jednotlivé workloady a služby  
- **Identitně orientovaná bezpečnost**: Bezpečnostní politiky vycházející z ověřených identit, nikoliv ze síťové lokace  
- **Kontinuální hodnocení rizik**: Dynamické vyhodnocování bezpečnostního stavu podle aktuálního kontextu a chování  
- **Podmíněný přístup**: Kontroly přístupu adaptující se podle rizikových faktorů, umístění a důvěryhodnosti zařízení  

### Vzory integrace v podniku

#### **Integrace do ekosystému Microsoft Security**  
- **Microsoft Defender for Cloud**: Komplexní správa bezpečnostního stavu cloudů  
- **Azure Sentinel**: Cloud-native SIEM a SOAR schopnosti pro ochranu AI workloadů  
- **Microsoft Entra ID**: Podnikové řízení identit a přístupů s podmíněnými přístupovými politikami  
- **Azure Key Vault**: Centralizovaná správa tajemství s podporou hardwarového zabezpečení (HSM)  
- **Microsoft Purview**: Správa dat a compliance pro zdroje a pracovní postupy AI  

#### **Soulad a správa**  
- **Soulad s regulacemi**: Zajištění, že implementace MCP splňují průmyslové regulační požadavky (GDPR, HIPAA, SOC 2)  
- **Klasifikace dat**: Správná kategorizace a nakládání s citlivými daty zpracovávanými AI systémy  
- **Auditní stopy**: Komplexní logování pro regulační soulad a forenzní vyšetřování  
- **Kontroly ochrany soukromí**: Implementace principů privacy-by-design v architektuře AI systémů  
- **Správa změn**: Formální procesy bezpečnostních revizí změn AI systému  

Tyto základní praktiky vytvářejí robustní bezpečnostní základ, který zvyšuje účinnost MCP-specifických bezpečnostních kontrol a poskytuje komplexní ochranu AI aplikacím.

## Klíčové bezpečnostní poznatky
- **Vícevrstvý přístup k bezpečnosti**: Kombinujte základní bezpečnostní postupy (bezpečné programování, princip nejmenších oprávnění, ověřování dodavatelského řetězce, kontinuální monitoring) s AI-specifickými kontrolami pro komplexní ochranu

- **AI-specifické hrozby**: Systémy MCP čelí unikátním rizikům včetně prompt injection, otravy nástrojů, únosu relace, problémů zmateného zástupce, zranitelností při průchodu tokenů a nadměrných oprávnění, které vyžadují specializovaná zmírnění

- **Excelentní autentizace a autorizace**: Implementujte robustní autentizaci pomocí externích poskytovatelů identity (Microsoft Entra ID), vynucujte správné ověřování tokenů a nikdy nepřijímejte tokeny nevydané explicitně pro váš MCP server

- **Prevence AI útoků**: Nasazujte Microsoft Prompt Shields a Azure Content Safety k obraně proti nepřímým útokům prompt injection a otravy nástrojů, zároveň ověřujte metadata nástrojů a monitorujte dynamické změny

- **Bezpečnost relací a přenosu**: Používejte kryptograficky bezpečné, nedeterministické ID relací svázané s identitou uživatele, implementujte správnou správu životního cyklu relace a nikdy nepoužívejte relace pro autentizaci

- **Nejlepší postupy bezpečnosti OAuth**: Zabraňte útokům zmateného zástupce pomocí explicitního souhlasu uživatele pro dynamicky registrované klienty, správné implementace OAuth 2.1 s PKCE a přísné validace redirect URI

- **Principy bezpečnosti tokenů**: Vyvarujte se anti-vzorů průchodu tokenů, ověřujte audience claims tokenu, implementujte krátkodobé tokeny s bezpečnou rotací a udržujte jasné hranice důvěry

- **Komplexní bezpečnost dodavatelského řetězce**: Zacházejte se všemi komponentami AI ekosystému (modely, embeddingy, poskytovatelé kontextu, externí API) s obdobnou bezpečnostní přísností jako s tradičními softwarovými závislostmi

- **Kontinuální vývoj**: Sledujte aktuální rychle se vyvíjející specifikace MCP, přispívejte do standardů bezpečnostní komunity a udržujte adaptivní bezpečnostní postoje s vývojem protokolu

- **Integrace bezpečnosti Microsoftu**: Využijte komplexní bezpečnostní ekosystém Microsoftu (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pro zvýšenou ochranu nasazení MCP

## Komplexní zdroje

### **Oficiální dokumentace MCP bezpečnosti**
- [Specifikace MCP (aktuální: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Nejlepší bezpečnostní postupy MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specifikace autorizace MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub repozitář](https://github.com/modelcontextprotocol)

### **OWASP MCP bezpečnostní zdroje**
- [OWASP MCP Azure bezpečnostní průvodce](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexní OWASP MCP Top 10 s návodem implementace na Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiální OWASP MCP bezpečnostní rizika
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostní trénink pro MCP na Azure

### **Bezpečnostní standardy a nejlepší praktiky**
- [OAuth 2.0 bezpečnostní nejlepší postupy (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 zabezpečení webových aplikací](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 pro velké jazykové modely](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Výzkum a analýza AI bezpečnosti**
- [Prompt Injection v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Útoky otravy nástrojů (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP bezpečnostní výzkumný briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft bezpečnostní řešení**
- [Microsoft Prompt Shields dokumentace](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety služba](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID bezpečnost](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management nejlepší postupy](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Průvodci implementací a tutoriály**
- [Azure API Management jako MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentizace s MCP servery](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Bezpečné uložení tokenů a šifrování (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps a bezpečnost dodavatelského řetězce**
- [Azure DevOps bezpečnost](https://azure.microsoft.com/products/devops)
- [Azure Repos bezpečnost](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft cesta zabezpečení dodavatelského řetězce](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Další bezpečnostní dokumentace**

Pro komplexní bezpečnostní návody odkazujeme na tyto specializované dokumenty v této sekci:

- **[MCP bezpečnostní nejlepší postupy 2025](./mcp-security-best-practices-2025.md)** - Kompletní bezpečnostní nejlepší postupy pro implementace MCP
- **[Azure Content Safety implementace](./azure-content-safety-implementation.md)** - Praktické příklady implementace integrace Azure Content Safety  
- **[MCP bezpečnostní kontroly 2025](./mcp-security-controls-2025.md)** - Nejnovější bezpečnostní kontroly a techniky pro nasazení MCP
- **[MCP nejlepší praktiky rychlá příručka](./mcp-best-practices.md)** - Rychlá příručka základních MCP bezpečnostních praktik
- **[BlueHat 2026: Zabezpečení budoucnosti AI: Zabezpečení MCP vzory obrany v hloubce](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Vzory obrany v hloubce od Microsoft Security Response Center (MSRC)

### **Praktické bezpečnostní školení**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komplexní praktický workshop zabezpečení MCP serverů na Azure s progresivními tábory od Base Camp po Summit
- **[OWASP MCP Azure bezpečnostní průvodce](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenční architektura a návod k implementaci všech OWASP MCP Top 10 rizik

---

## Co dál

Dále: [Kapitola 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->