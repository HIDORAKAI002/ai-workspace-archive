# MCP Security: Komplexní ochrana AI systémů

[![MCP Security Best Practices](../../../translated_images/cs/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klikněte na obrázek výše pro zobrazení videa této lekce)_

Bezpečnost je základem návrhu AI systémů, proto ji upřednostňujeme jako naši druhou sekci. To odpovídá principu Microsoftu **Secure by Design** z [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokol Model Context Protocol (MCP) přináší výkonné nové schopnosti AI-řízeným aplikacím a zároveň představuje jedinečné bezpečnostní výzvy, které přesahují tradiční softwarová rizika. Systémy MCP čelí jak osvědčeným bezpečnostním problémům (bezpečné kódování, princip nejmenších oprávnění, bezpečnost dodavatelského řetězce), tak novým hrozbám specifickým pro AI, včetně prompt injekce, otravy nástrojů, zachycení relace, útoků zmatku zástupce, zranitelností při předávání tokenů a dynamické modifikace schopností.

Tato lekce zkoumá nejkritičtější bezpečnostní rizika v implementacích MCP—zahrnující autentizaci, autorizaci, nadměrná oprávnění, nepřímou prompt injekci, bezpečnost relací, problémy zmatku zástupce, správu tokenů a zranitelnosti dodavatelského řetězce. Naučíte se praktická opatření a nejlepší postupy ke zmírnění těchto rizik při využití řešení Microsoft jako Prompt Shields, Azure Content Safety a GitHub Advanced Security pro posílení nasazení MCP.

## Výukové cíle

Na konci této lekce budete schopni:

- **Identifikovat specifické hrozby MCP**: Rozpoznat jedinečná bezpečnostní rizika v systémech MCP včetně prompt injekce, otravy nástrojů, nadměrných oprávnění, zachycení relace, problémů zmatku zástupce, zranitelností při předávání tokenů a rizik dodavatelského řetězce
- **Použít bezpečnostní kontroly**: Implementovat efektivní opatření včetně robustní autentizace, přístupu na základě nejmenších oprávnění, bezpečné správy tokenů, kontrol bezpečnosti relací a verifikace dodavatelského řetězce
- **Využít bezpečnostní řešení Microsoftu**: Pochopit a implementovat Microsoft Prompt Shields, Azure Content Safety a GitHub Advanced Security pro ochranu workloads MCP
- **Ověřit bezpečnost nástrojů**: Uvědomit si důležitost validace metadat nástrojů, monitorování dynamických změn a obrany proti nepřímým útokům prompt injekce
- **Integrovat nejlepší postupy**: Kombinovat osvědčené bezpečnostní základy (bezpečné kódování, hardening serveru, zero trust) se specifickými kontrolami MCP pro komplexní ochranu

# Architektura & kontroly bezpečnosti MCP

Moderní implementace MCP vyžadují vrstvené bezpečnostní přístupy, které řeší jak tradiční softwarovou bezpečnost, tak specifické hrozby AI. Rychle se vyvíjející specifikace MCP postupně zdokonaluje své bezpečnostní kontroly, což umožňuje lepší integraci s podnikatelskými bezpečnostními architekturami a zavedenými nejlepšími praktikami.

Výzkum z [Microsoft Digital Defense Report](https://aka.ms/mddr) ukazuje, že **98 % nahlášených narušení by bylo zabráněno robustní bezpečnostní hygienou**. Nejefektivnější strategií ochrany je kombinace základních bezpečnostních praktik se specifickými kontrolami MCP—ověřená základní bezpečnostní opatření zůstávají nejúčinnější při snižování celkového bezpečnostního rizika.

## Současná bezpečnostní situace

> **Poznámka:** Tyto informace odrážejí bezpečnostní standardy MCP k **5. únoru 2026**, v souladu s **MCP Specification 2025-11-25**. Protokol MCP se stále rychle vyvíjí a budoucí implementace mohou zavádět nové vzory autentizace a zdokonalené kontroly. Vždy se odkazujte na aktuální [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) a [dokumentaci bezpečnostních nejlepších praktik](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pro nejnovější doporučení.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Pro **praktický bezpečnostní výcvik** důrazně doporučujeme **MCP Security Summit Workshop** (Sherpa) – komplexní vedenou expedici za zabezpečením MCP serverů v Microsoft Azure.

### Přehled workshopu

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) poskytuje praktický a použitelný bezpečnostní výcvik pomocí ověřené metodiky „zranitelnost → exploit → oprava → ověření“. Naučíte se:

- **Učit se tím, že něco rozbijete**: Získáte zkušenosti se zranitelnostmi přímo jejich zneužíváním na záměrně nezabezpečených serverech
- **Využívat zabezpečení Azure**: Použijete Azure Entra ID, Key Vault, API Management a AI Content Safety
- **Postupovat podle obrany ve vrstvách**: Projdete tábory budováním komplexních bezpečnostních vrstev
- **Aplikovat OWASP standardy**: Každá technika odpovídá [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Získat produkční kód**: Odejdete s funkčními, otestovanými implementacemi

### Trasa expedice

| Tábor | Zaměření | Zahrnutá rizika OWASP |
|-------|----------|------------------------|
| **Základní tábor** | Základy MCP & zranitelnosti autentizace | MCP01, MCP07 |
| **Tábor 1: Identita** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tábor 2: Brána (Gateway)** | API Management, privátní koncové body, governance | MCP02, MCP07, MCP09 |
| **Tábor 3: Bezpečnost vstupů/výstupů** | Prompt injekce, ochrana PII, content safety | MCP03, MCP05, MCP06 |
| **Tábor 4: Monitoring** | Log Analytics, dashboardy, detekce hrozeb | MCP08 |
| **Vrcholová stanice** | Integrační test Red Team / Blue Team | Všechna |

**Začněte zde**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 bezpečnostních rizik

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) podrobně popisuje deset nejkritičtějších bezpečnostních rizik pro implementace MCP:

| Riziko | Popis | Opatření v Azure |
|--------|-------|------------------|
| **MCP01** | Nesprávná správa tokenů a vystavení tajemství | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalace oprávnění skrze rozšíření scope | RBAC, Podmíněný přístup |
| **MCP03** | Otrava nástrojů | Validace nástrojů, ověřování integrity |
| **MCP04** | Útoky v dodavatelském řetězci | GitHub Advanced Security, skenování závislostí |
| **MCP05** | Vstřikování příkazů & exekuce | Validace vstupu, sandboxing |
| **MCP06** | Prompt injekce skrze kontextové payloady | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nedostatečná autentizace a autorizace | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Nedostatek auditování & telemetrie | Azure Monitor, Application Insights |
| **MCP09** | Stínové MCP servery | Governance API Center, síťová izolace |
| **MCP10** | Injekce kontextu & nadměrné sdílení | Klasifikace dat, minimální vystavení |

### Vývoj MCP autentizace

Specifikace MCP se významně vyvíjela v přístupu k autentizaci a autorizaci:

- **Původní přístup**: Rané specifikace vyžadovaly, aby vývojáři implementovali vlastní autentizační servery, přičemž MCP servery fungovaly jako OAuth 2.0 Authorization servery přímo spravující autentizaci uživatelů
- **Současný standard (2025-11-25)**: Aktualizovaná specifikace umožňuje MCP serverům delegovat autentizaci externím poskytovatelům identity (např. Microsoft Entra ID), čímž se zlepší bezpečnostní profil a sníží složitost implementace
- **Zabezpečení transportní vrstvy**: Vylepšená podpora bezpečných transportních mechanismů s vhodnými vzory autentizace pro lokální (STDIO) i vzdálená (Streamable HTTP) připojení

## Bezpečnost autentizace & autorizace

### Současné bezpečnostní výzvy

Moderní implementace MCP čelí několika výzvám v oblasti autentizace a autorizace:

### Rizika & hrozebné vektory

- **Nesprávně nakonfigurovaná logika autorizace**: Chybné provedení autorizace v MCP serverech může vystavit citlivá data a nesprávně aplikovat přístupová omezení
- **Zneužití OAuth tokenů**: Krádež lokálního MCP tokenu umožňuje útočníkům vydávat se za servery a přistupovat k downstream službám
- **Zranitelnosti při předávání tokenů (Token Passthrough)**: Nesprávné zacházení s tokeny vytváří obcházení bezpečnostních kontrol a mezery v odpovědnosti
- **Nadměrná oprávnění**: Přehnaná oprávnění MCP serverů porušují princip nejmenších oprávnění a rozšiřují povrch útoku

#### Předávání tokenů: kritický anti-vzor

**Předávání tokenů je v aktuální specifikaci autorizace MCP výslovně zakázáno** kvůli vážným bezpečnostním důsledkům:

##### Obcházení bezpečnostních kontrol
- MCP servery a downstream API implementují kritické bezpečnostní kontroly (omezení rychlosti, validace požadavků, monitorování provozu), které závisí na správném ověření tokenu
- Přímé používání tokenů klientem směrem k API obchází tyto základní ochrany a podkopává bezpečnostní architekturu

##### Výzvy v odpovědnosti a auditu  
- MCP servery nemohou rozlišit klienty používající tokeny vydané upstream, což narušuje auditní stopy
- Logy downstream serverů zobrazují zavádějící původ požadavků místo skutečných MCP serverů jako prostředníků
- Vyšetřování incidentů a audity shody jsou výrazně obtížnější

##### Rizika exfiltrace dat
- Neověřené nároky v tokenu umožňují útočníkům se zcizenými tokeny využívat MCP servery jako proxy pro exfiltraci dat
- Porušení hranic důvěry vede k neautorizovaným přístupovým vzorům, které obcházejí zamýšlené bezpečnostní kontroly

##### Útoky napříč službami
- Přijaté kompromitované tokeny v několika službách umožňují laterální pohyb mezi propojenými systémy
- Důvěry mezi službami mohou být porušeny, když nelze ověřit původ tokenu

### Bezpečnostní kontroly & zmírnění

**Kritické bezpečnostní požadavky:**

> **POVINNÉ:** MCP servery **NESMÍ** přijímat žádné tokeny, které nebyly explicitně vydány pro tento MCP server

#### Kontroly autentizace & autorizace

- **Důkladná revize autorizace**: Proveďte komplexní audit logiky autorizace MCP serverů, aby k citlivým zdrojům přistupovali pouze zamýšlení uživatelé a klienti
  - **Průvodce implementací**: [Azure API Management jako autentizační brána pro MCP servery](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrace identity**: [Použití Microsoft Entra ID pro autentizaci MCP serveru](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Bezpečná správa tokenů**: Implementujte [nejlepší postupy Microsoftu pro validaci tokenů a jejich životní cyklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Ověřujte nároky audience tokenu odpovídající identitě MCP serveru
  - Zavádějte správnou rotaci a expirační politiky tokenů
  - Zabraňte útokům opětovného použití tokenů a neautorizovanému užití

- **Chráněné uchovávání tokenů**: Bezpečné uložení tokenů šifrováním v klidu i při přenosu
  - **Nejlepší praxe**: [Pokyny pro bezpečné ukládání a šifrování tokenů](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementace řízení přístupu

- **Princip nejmenších oprávnění**: Poskytujte MCP serverům pouze minimální oprávnění nezbytná pro zamýšlenou funkčnost
  - Pravidelné revize a aktualizace oprávnění k prevenci rozšiřování práv
  - **Dokumentace Microsoftu**: [Zabezpečení přístupu s minimálními oprávněními](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Řízení přístupu na základě rolí (RBAC)**: Implementujte jemné přiřazení rolí
  - Úzce definujte role k specifickým zdrojům a akcím
  - Vyhněte se širokým nebo zbytečným oprávněním, která rozšiřují povrch útoku

- **Nepřetržité sledování oprávnění**: Zavedení průběžného auditu a monitoringu přístupů
  - Sledujte vzory použití oprávnění pro detekci anomálií
  - Okamžitě napravujte nadbytečná nebo nepoužívaná oprávnění

## AI-specifické bezpečnostní hrozby

### Prompt injekce & manipulace s nástroji

Moderní implementace MCP čelí sofistikovaným AI-specifickým útokům, které tradiční bezpečnostní opatření nedokážou plně řešit:

#### **Nepřímá Prompt Injekce (Cross-Domain Prompt Injection)**

**Nepřímá prompt injekce** představuje jednu z nejkritičtějších zranitelností v AI systémech podporujících MCP. Útočníci vkládají škodlivé instrukce do externího obsahu — dokumentů, webových stránek, e-mailů nebo datových zdrojů — které AI systémy následně zpracovávají jako legitimní příkazy.

**Scénáře útoku:**
- **Injekce založená na dokumentech**: Škodlivé instrukce skryté v zpracovávaných dokumentech spouštějí nežádoucí AI akce
- **Využití webového obsahu**: Kompromitované webové stránky obsahující vložené prompt příkazy, které ovlivňují chování AI při extrakci
- **Útoky přes e-maily**: Škodlivé prompt příkazy v e-mailech, které nutí AI asistenty odhalovat informace nebo provádět nepovolené akce
- **Kontaminace zdrojů dat**: Kompromitované databáze nebo API poskytující kontaminovaný obsah AI systémům

**Reálný dopad**: Tyto útoky mohou vést k exfiltraci dat, narušení soukromí, generování škodlivého obsahu a manipulaci s uživatelskými interakcemi. Pro podrobnou analýzu viz [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram útoku prompt injekce](../../../translated_images/cs/prompt-injection.ed9fbfde297ca877.webp)

#### **Útoky otravy nástrojů**

**Otrava nástrojů** cílí na metadata definující MCP nástroje a zneužívá způsob, jakým LLM interpretují popisy nástrojů a parametry pro rozhodování o exekuci.

**Mechanismy útoku:**
- **Manipulace s metadaty**: Útočníci vkládají škodlivé instrukce do popisů nástrojů, definic parametrů nebo ukázek použití
- **Neviditelné instrukce**: Skryté prompt příkazy v metadatech nástrojů, které zpracovávají AI modely, ale nejsou viditelné lidským uživatelům
- **Dynamické modifikace nástrojů („Rug Pulls“) **: Nástroje schválené uživateli jsou později modifikovány k vykonávání škodlivých akcí bez vědomí uživatele
- **Injekce parametrů**: Škodlivý obsah vložený ve schématech parametrů nástroje, který ovlivňuje chování modelu

**Rizika hostovaných serverů**: Vzdálené MCP servery představují zvýšená rizika, protože definice nástrojů mohou být po počátečním schválení uživatelem aktualizovány, což vytváří situace, kdy dříve bezpečné nástroje se stanou škodlivými. Pro komplexní analýzu viz [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram útoku tool injection](../../../translated_images/cs/tool-injection.3b0b4a6b24de6bef.webp)

#### **Další AI útoky**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikované útoky využívající obsah z více domén k obcházení bezpečnostních kontrol
- **Dynamická modifikace schopností**: Změny schopností nástrojů v reálném čase, které unikají počáteční bezpečnostní kontrole
- **Otrava kontextového okna**: Útoky manipulující s velkými kontextovými okny za účelem skrytí škodlivých instrukcí
- **Útoky zmatení modelu**: Využití omezení modelu k vytváření nepředvídatelných nebo nebezpečných chování


### Dopad rizik v AI bezpečnosti

**Vysoký dopad:**
- **Exfiltrace dat**: Neoprávněný přístup a krádež citlivých firemních nebo osobních dat
- **Porušení soukromí**: Zveřejnění osobně identifikovatelných informací (PII) a důvěrných obchodních dat  
- **Manipulace se systémy**: Nezamýšlené úpravy kritických systémů a pracovních postupů
- **Krádež přihlašovacích údajů**: Kompromitace autentizačních tokenů a servisních přístupů
- **Laterální pohyb**: Využití kompromitovaných AI systémů jako pivota pro širší síťové útoky

### Bezpečnostní řešení Microsoft AI

#### **AI Prompt Shields: Pokročilá ochrana proti injekčním útokům**

Microsoft **AI Prompt Shields** poskytují komplexní obranu proti přímým i nepřímým injekčním útokům na pokyny skrze více bezpečnostních vrstev:

##### **Základní ochranné mechanismy:**

1. **Pokročilé detekce a filtrování**
   - Algoritmy strojového učení a techniky NLP detekují škodlivé instrukce v externím obsahu
   - Analýza v reálném čase dokumentů, webových stránek, e-mailů a zdrojů dat pro vložené hrozby
   - Kontextuální porozumění legitimním vs. škodlivým vzorcům pokynů

2. **Techniky zvýraznění**  
   - Rozlišení důvěryhodných systémových instrukcí od potenciálně kompromitovaných externích vstupů
   - Metody transformace textu, které zvyšují relevanci modelu při izolaci škodlivého obsahu
   - Pomáhají AI systémům udržet správnou hierarchii instrukcí a ignorovat injektované příkazy

3. **Systémy oddělovačů a datových značek**
   - Explicitní vymezení hranic mezi důvěryhodnými systémovými zprávami a externím vstupním textem
   - Speciální značky zvýrazňující hranice mezi důvěryhodnými a nedůvěryhodnými zdroji dat
   - Jasné oddělení zabraňuje záměně instrukcí a neoprávněnému vykonání příkazů

4. **Kontinuální zpravodajství o hrozbách**
   - Microsoft nepřetržitě monitoruje nové vzory útoků a aktualizuje obranu
   - Proaktivní vyhledávání nových injekčních technik a útokových vektorů
   - Pravidelné aktualizace bezpečnostních modelů pro udržení účinnosti proti vyvíjejícím se hrozbám

5. **Integrace Azure Content Safety**
   - Součást komplexního balíku Azure AI Content Safety
   - Další detekce pokusů o jailbreak, škodlivého obsahu a porušení bezpečnostních politik
   - Jednotná bezpečnostní kontrola napříč komponentami AI aplikací

**Implementační zdroje**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/cs/prompt-shield.ff5b95be76e9c78c.webp)


## Pokročilé bezpečnostní hrozby MCP

### Zranitelnosti unesení relace

**Únos relace** představuje kritický vektor útoku v stavových implementacích MCP, kde neoprávněné strany získají a zneužijí legitimní identifikátory relace k vydávání se za klienty a vykonávání nepovolených akcí.

#### **Scénáře útoků a rizika**

- **Injekce pokynů při únosu relace**: Útočníci s odcizenými ID relace vkládají škodlivé události na servery sdílející stav relace, potenciálně vyvolávají škodlivé akce nebo získávají přístup k citlivým datům
- **Přímé vydávání se za uživatele**: Odcizená ID relace umožňují přímé volání MCP serveru obcházející autentizaci, čímž jsou považováni za legitimní uživatele
- **Kompromitované pokračovatelné streamy**: Útočníci mohou předčasně ukončit požadavky, což způsobí, že legitimní klienti pokračují s potenciálně škodlivým obsahem

#### **Bezpečnostní kontroly správy relací**

**Kritické požadavky:**
- **Ověření autorizace**: MCP servery implementující autorizaci **MUSÍ** ověřovat VŠECHNY příchozí požadavky a **NESMÍ** se spoléhat na relace pro autentizaci
- **Bezpečná generace relací**: Používat kryptograficky bezpečná, nedeterministická ID relace generovaná bezpečnými generátory náhodných čísel
- **Vazba na uživatele**: Vázat ID relace na specifické informace o uživateli pomocí formátů jako `<user_id>:<session_id>`, aby se zabránilo zneužití napříč uživateli
- **Správa životního cyklu relace**: Implementovat správné vypršení, rotaci a neplatnění, aby se omezila zranitelná doba
- **Zabezpečení přenosu**: Povinné HTTPS pro veškerou komunikaci k zabránění zachycení ID relace

### Problém zmateného zástupce (Confused Deputy)

**Problém zmateného zástupce** nastává, když MCP servery fungují jako autentizační proxy mezi klienty a třetími stranami, čímž vznikají možnosti obejít autorizaci zneužitím statických klientských ID.

#### **Mechanika útoku a rizika**

- **Obcházení souhlasu založené na cookie**: Předchozí autentizace uživatele vytvoří souhlasové cookie, které útočníci zneužívají skrze škodlivé požadavky autorizace s upravenými přesměrovacími URI
- **Krádež autorizačního kódu**: Existující souhlasové cookies mohou vést k přeskočení souhlasových obrazovek autorizačními servery, směrujíc kódy na útočníkem kontrolované koncové body  
- **Neoprávněný přístup k API**: Ukradené autorizační kódy umožňují výměnu tokenu a vydávání se za uživatele bez výslovného souhlasu

#### **Strategie zmírnění**

**Povinné kontroly:**
- **Explicitní požadavky na souhlas**: MCP proxy servery používající statická klientská ID **MUSÍ** získat od uživatele souhlas pro každého dynamicky registrovaného klienta
- **Implementace bezpečnosti OAuth 2.1**: Dodržovat aktuální bezpečnostní best practices OAuth včetně PKCE (Proof Key for Code Exchange) pro všechny autorizacní požadavky
- **Přísná validace klienta**: Zavést rigorózní ověřování přesměrovacích URI a identifikátorů klientů k zabránění zneužití

### Zranitelnosti při průchodu tokenu  

**Průchod tokenu** představuje explicitní anti-vzor, kdy MCP servery přijímají klientské tokeny bez řádné validace a předávají je dále na downstream API, což porušuje specifikace autorizace MCP.

#### **Bezpečnostní důsledky**

- **Obcházení kontroly**: Přímé použití tokenů klientem vůči API obchází kritická omezení rychlosti, ověřování a monitorování
- **Poškození auditních stop**: Tokeny vydané upstream znemožňují identifikaci klienta, což narušuje možnosti vyšetřování incidentů
- **Proxy exfiltrace dat**: Neověřené tokeny umožňují škodlivým aktérům využít servery jako proxy pro neoprávněný přístup k datům
- **Porušení hranic důvěry**: Důvěra downstream služeb může být porušena, pokud nelze ověřit původ tokenu
- **Expanze útoků přes více služeb**: Kompromitované tokeny přijímané ve více službách umožňují laterální pohyb

#### **Požadované bezpečnostní kontroly**

**Nepodmíněné požadavky:**
- **Validace tokenů**: MCP servery **NESMÍ** přijímat tokeny, které nejsou explicitně vydány pro MCP server
- **Ověření příjemce (audience)**: Vždy ověřovat, že nárok audienta tokenu odpovídá identitě MCP serveru
- **Řádný životní cyklus tokenů**: Implementovat krátkodobé přístupové tokeny s bezpečnými praktikami rotace


## Bezpečnost dodavatelského řetězce pro AI systémy

Bezpečnost dodavatelského řetězce se vyvinula za tradiční závislosti softwaru a nyní zahrnuje celý ekosystém AI. Moderní implementace MCP musí pečlivě ověřovat a monitorovat všechny komponenty AI, protože každá představuje potenciální zranitelnosti, které by mohly ohrozit integritu systému.

### Rozšířené komponenty AI dodavatelského řetězce

**Tradiční softwarové závislosti:**
- Knihovny a frameworky s otevřeným zdrojovým kódem
- Kontejnerové image a základní systémy  
- Nástroje pro vývoj a buildovací pipeline
- Infrastrukturní komponenty a služby

**Specifické AI prvky dodavatelského řetězce:**
- **Základní modely**: Předtrénované modely od různých poskytovatelů vyžadující ověření původu
- **Služby pro embedding**: Externí vektorizace a služby sémantického vyhledávání
- **Poskytovatelé kontextu**: Datové zdroje, znalostní báze a repozitáře dokumentů  
- **API třetích stran**: Externí AI služby, ML pipeline a datové endpointy
- **Modelové artefakty**: Váhy, konfigurace a jemně laděné varianty modelů
- **Tréninkové datasety**: Datové sady používané pro trénink a doladění modelu

### Komplexní strategie bezpečnosti dodavatelského řetězce

#### **Ověřování komponent a důvěra**
- **Validace původu**: Ověřujte původ, licencování a integritu všech AI komponent před integrací
- **Bezpečnostní hodnocení**: Proveďte skenování zranitelností a bezpečnostní revize modelů, zdrojů dat a AI služeb
- **Analýza reputace**: Hodnoťte bezpečnostní historii a praktiky poskytovatelů AI služeb
- **Ověření souladu**: Zajistěte, aby všechny komponenty splňovaly organizační bezpečnostní a regulační požadavky

#### **Bezpečné pipeline pro nasazení**  
- **Automatizované CI/CD bezpečnostní kontroly**: Integrujte bezpečnostní skenery průběžně v automatizovaných nasazovacích pipelinech
- **Integrita artefaktů**: Používejte kryptografickou verifikaci pro všechny nasazené artefakty (kód, modely, konfigurace)
- **Postupné nasazování**: Využívejte postupné strategie s bezpečnostní validací v každé fázi
- **Důvěryhodné repozitáře artefaktů**: Nasazujte pouze z ověřených, bezpečných registrů a repozitářů artefaktů

#### **Kontinuální monitoring a reakce**
- **Skenování závislostí**: Průběžný monitoring zranitelností všech softwarových a AI komponent
- **Monitorování modelů**: Nepřetržité hodnocení chování modelu, driftu výkonu a bezpečnostních anomálií
- **Sledování stavu služeb**: Monitorování dostupnosti, bezpečnostních incidentů a změn politik externích AI služeb
- **Integrace informací o hrozbách**: Zavedení zdrojů inteligence o hrozbách specifických pro AI a ML bezpečnostní rizika

#### **Řízení přístupu a princip minimálních oprávnění**
- **Oprávnění na úrovni komponent**: Omezte přístup k modelům, datům a službám na základě obchodní potřeby
- **Správa servisních účtů**: Zavádějte dedikované servisní účty s minimálními požadovanými oprávněními
- **Segmentace sítě**: Izolujte AI komponenty a omezte síťový přístup mezi službami
- **Kontroly API gateway**: Používejte centralizované API gateway pro kontrolu a monitoring přístupu k externím AI službám

#### **Reakce na incidenty a zotavení**
- **Rychlé reakční postupy**: Zavedené procesy pro patchování nebo nahrazení kompromitovaných AI komponent
- **Rotace přihlašovacích údajů**: Automatizované systémy pro rotaci tajemství, API klíčů a servisních přístupů
- **Možnosti vrácení změn**: Schopnost rychle revertovat na předchozí známé dobré verze AI komponent
- **Obnova po narušení dodavatelského řetězce**: Specifické postupy pro reakci na kompromitace upstream AI služeb

### Nástroje Microsoft bezpečnosti a integrace

**GitHub Advanced Security** poskytuje komplexní ochranu dodavatelského řetězce včetně:
- **Skenování tajemství**: Automatická detekce přihlašovacích údajů, API klíčů a tokenů v repozitářích
- **Skenování závislostí**: Hodnocení zranitelností open-source závislostí a knihoven
- **Analýza CodeQL**: Statická analýza kódu zaměřená na bezpečnostní zranitelnosti a problémy s kódováním
- **Přehled dodavatelského řetězce**: Přehled zdraví a bezpečnostního stavu závislostí

**Integrace Azure DevOps & Azure Repos:**
- Bezproblémová integrace bezpečnostního skenování napříč Microsoft vývojovými platformami
- Automatizované bezpečnostní kontroly v Azure Pipelines pro AI pracovní zatížení
- Vynucování politik pro bezpečné nasazení AI komponent

**Interní bezpečnostní praktiky Microsoft:**
Microsoft zavádí rozsáhlé bezpečnostní postupy dodavatelského řetězce napříč všemi produkty. Přečtěte si osvědčené postupy v [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Základní bezpečnostní postupy pro Foundation

Implementace MCP dědí a staví na stávajícím bezpečnostním postoji vaší organizace. Posílení základních bezpečnostních praktik významně zvyšuje celkovou bezpečnost AI systémů a nasazení MCP.

### Základní bezpečnostní principy

#### **Bezpečné vývojové praktiky**
- **Soulad s OWASP**: Ochrana proti [OWASP Top 10](https://owasp.org/www-project-top-ten/) webovým zranitelnostem  
- **AI-specifické ochrany**: Implementace kontrol pro [OWASP Top 10 pro LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Bezpečná správa tajemství**: Použití dedikovaných trezorů pro tokeny, API klíče a citlivá konfigurační data
- **End-to-end šifrování**: Zavedení bezpečné komunikace napříč všemi komponentami aplikace a datovými toky
- **Validace vstupů**: Přísná validace všech vstupů uživatele, parametrů API a zdrojů dat

#### **Zpevnění infrastruktury**
- **Vícefaktorová autentizace**: Povinné MFA pro všechny administrátorské a servisní účty
- **Správa záplat**: Automatizované a včasné záplatování operačních systémů, frameworků a závislostí  
- **Integrace poskytovatele identity**: Centralizovaná správa identity přes podnikové identity poskytovatele (Microsoft Entra ID, Active Directory)
- **Segmentace sítě**: Logická izolace MCP komponent pro omezení potenciálu laterálního pohybu
- **Princip minimálních oprávnění**: Minimální požadovaná oprávnění pro všechny systémové komponenty a účty

#### **Monitorování a detekce bezpečnosti**
- **Komplexní logování**: Detailní záznam aktivit AI aplikací, včetně interakcí klient-server MCP
- **Integrace SIEM**: Centralizované řízení bezpečnostních informací a událostí pro detekci anomálií
- **Behaviorální analýzy**: AI poháněný monitoring pro odhalení neobvyklých vzorců v chování systému a uživatelů
- **Threat Intelligence**: Integrace externích zdrojů hrozeb a indikátorů kompromitace (IOC)
- **Reakce na incidenty**: Dobře definované postupy pro detekci, reakci a zotavení z bezpečnostních incidentů

#### **Architektura Zero Trust**
- **Nikdy nevěř, vždy ověřuj**: Průběžné ověřování uživatelů, zařízení a síťových připojení
- **Mikrosegmentace**: Detailní síťová kontrola izolující jednotlivé pracovní zátěže a služby
- **Identita v centru bezpečnosti**: Bezpečnostní politiky založené na ověřených identitách místo síťové lokace
- **Kontinuální hodnocení rizika**: Dynamické vyhodnocení bezpečnostního postoje na základě aktuálního kontextu a chování
- **Podmíněný přístup**: Přístupové kontroly přizpůsobující se na základě rizikových faktorů, lokace a důvěryhodnosti zařízení

### Vzory integrace v podniku

#### **Integrace bezpečnostního ekosystému Microsoft**
- **Microsoft Defender for Cloud**: Komplexní správa bezpečnostního postavení cloudu
- **Azure Sentinel**: Cloudově nativní SIEM a SOAR schopnosti pro ochranu AI pracovních zátěží
- **Microsoft Entra ID**: Podniková správa identity a přístupů s politikami podmíněného přístupu
- **Azure Key Vault**: Centralizovaná správa tajemství s podporou hardwarového bezpečnostního modulu (HSM)
- **Microsoft Purview**: Správa dat a souladu pro zdroje dat AI a pracovní postupy

#### **Soulad a řízení**
- **Soulad s předpisy**: Zajistěte, aby implementace MCP splňovala oborové regulační požadavky (GDPR, HIPAA, SOC 2)
- **Klasifikace dat**: Správná kategorizace a zpracování citlivých dat AI systémů
- **Auditní stopy**: Komplexní logování pro regulacní soulad a forenzní vyšetřování
- **Ochrana soukromí**: Implementace principů privacy-by-design v architektuře AI systémů
- **Řízení změn**: Formální procesy bezpečnostních revizí změn AI systémů

Tyto základní praktiky vytvářejí robustní bezpečnostní základ, který zvyšuje účinnost specifických bezpečnostních kontrol MCP a poskytuje komplexní ochranu AI aplikacím.
## Klíčová bezpečnostní poznání

- **Vícevrstvý bezpečnostní přístup**: Kombinujte základní bezpečnostní praktiky (bezpečné kódování, princip nejmenších oprávnění, ověřování dodavatelského řetězce, kontinuální monitorování) s kontrolami specifickými pro AI pro komplexní ochranu

- **Specifické hrozby pro AI**: Systémy MCP čelí jedinečným rizikům, jako jsou injekce do promptů, otrava nástrojů, únos relací, problémy zmateného zástupce, zranitelnosti přenosu tokenů a nadměrná oprávnění, které vyžadují specializované mitigace

- **Excelence v ověřování a autorizaci**: Implementujte robustní ověřování pomocí externích poskytovatelů identity (Microsoft Entra ID), vynucujte řádnou validaci tokenů a nikdy nepřijímejte tokeny, které nebyly explicitně vydány pro váš MCP server

- **Prevence AI útoků**: Nasazujte Microsoft Prompt Shields a Azure Content Safety pro obranu proti nepřímým injekcím do promptů a otravě nástrojů, zároveň validujte metadata nástrojů a sledujte dynamické změny

- **Bezpečnost relací a přenosu**: Používejte kryptograficky bezpečné, nedeterministické ID relací vázané na uživatelské identity, implementujte správu životního cyklu relace a nikdy nepoužívejte relace pro ověřování

- **Best practices pro OAuth**: Prevence útoků zmateného zástupce prostřednictvím explicitního uživatelského souhlasu pro dynamicky registrované klienty, správné implementace OAuth 2.1 s PKCE a striktní validace redirect URI

- **Principy bezpečnosti tokenů**: Vyhněte se anti-patternům přenosu tokenů, validujte požadavky na publikum tokenů, implementujte krátkodobé tokeny s bezpečnou rotací a udržujte jasné hranice důvěry

- **Komplexní bezpečnost dodavatelského řetězce**: Posuzujte všechny součásti AI ekosystému (modely, embeddingy, poskytovatele kontextu, externí API) se stejnou bezpečnostní důsledností jako tradiční softwarové závislosti

- **Kontinuální vývoj**: Sledujte rychle se vyvíjející specifikace MCP, přispívejte do standardů bezpečnostní komunity a udržujte adaptivní bezpečnostní postoje, jak se protokol vyvíjí

- **Integrace bezpečnosti Microsoftu**: Využívejte komplexní bezpečnostní ekosystém Microsoftu (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pro lepší ochranu nasazení MCP  

## Komplexní zdroje

### **Oficiální dokumentace k bezpečnosti MCP**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP bezpečnostní zdroje**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexní OWASP MCP Top 10 s implementačními pokyny pro Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiální OWASP MCP bezpečnostní rizika
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostní výcvik pro MCP na Azure

### **Bezpečnostní standardy a best practices**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Výzkum a analýzy AI bezpečnosti**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft bezpečnostní řešení**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Průvodci implementací a návody**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps a bezpečnost dodavatelského řetězce**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Další dokumentace o bezpečnosti**

Pro komplexní bezpečnostní doporučení odkazujeme na tyto specializované dokumenty v této sekci:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Kompletní doporučení bezpečnostních praktik pro implementace MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktické příklady implementace integrace Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Nejnovější bezpečnostní kontroly a techniky pro nasazení MCP
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Rychlá referenční příručka pro základní bezpečnostní praktiky MCP

### **Praktický bezpečnostní výcvik**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komplexní praktický workshop zabezpečení MCP serverů v Azure s postupnými tábory od Base Camp po Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenční architektura a implementační pokyny pro všechna rizika OWASP MCP Top 10

---

## Co dál

Další: [Kapitola 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Upozornění**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). I když usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za závazný zdroj. Pro důležité informace se doporučuje využít profesionální lidský překlad. Neneseme odpovědnost za jakékoliv nedorozumění nebo chybné výklady vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->