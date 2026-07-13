# MCP Security: Komplexní ochrana pro AI systémy

[![MCP Security Best Practices](../../../translated_images/cs/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klikněte na obrázek výše pro zobrazení videa této lekce)_

Bezpečnost je základním prvkem navrhování AI systémů, proto ji zařazujeme jako druhou sekci. To koresponduje s principem Microsoftu **Secure by Design** z [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokol Model Context Protocol (MCP) přináší silné nové možnosti do aplikací řízených AI, zároveň však přináší jedinečné bezpečnostní výzvy, které přesahují tradiční softwarová rizika. MCP systémy čelí jak zavedeným bezpečnostním obavám (bezpečné kódování, princip nejmenších oprávnění, bezpečnost dodavatelského řetězce), tak novým hrozbám specifickým pro AI včetně prompt injection, otravy nástrojů, únosu sezení, útoků confused deputy, zranitelností při předávání tokenů a dynamické modifikace schopností.

Tato lekce zkoumá nejkritičtější bezpečnostní rizika v implementacích MCP—zahrnující autentizaci, autorizaci, nadměrná oprávnění, nepřímý prompt injection, bezpečnost sezení, problémy confused deputy, správu tokenů a zranitelnosti dodavatelského řetězce. Naučíte se praktické kontroly a nejlepší postupy ke zmírnění těchto rizik a zároveň využijete řešení Microsoftu jako Prompt Shields, Azure Content Safety a GitHub Advanced Security pro posílení nasazení MCP.

## Cíle učení

Na konci této lekce budete schopni:

- **Identifikovat specifické hrozby MCP**: Rozpoznat jedinečná bezpečnostní rizika v MCP systémech včetně prompt injection, otravy nástrojů, nadměrných oprávnění, únosu sezení, problémů confused deputy, zranitelností při předávání tokenů a rizik dodavatelského řetězce
- **Aplikovat bezpečnostní kontroly**: Implementovat efektivní opatření včetně robustní autentizace, přístupů s principem nejmenších oprávnění, bezpečné správy tokenů, bezpečnostních kontrol sezení a ověřování dodavatelského řetězce
- **Využít bezpečnostní řešení Microsoftu**: Pochopit a nasadit Microsoft Prompt Shields, Azure Content Safety a GitHub Advanced Security pro ochranu MCP pracovní zátěže
- **Ověřit bezpečnost nástrojů**: Uvědomit si důležitost ověřování metadat nástrojů, monitorování dynamických změn a obrany proti nepřímým prompt injection útokům
- **Integrovat nejlepší postupy**: Kombinovat zavedené bezpečnostní základy (bezpečné kódování, tvrdnutí serverů, zero trust) se specifickými kontrolami MCP pro komplexní ochranu

# Architektura a kontroly bezpečnosti MCP

Moderní implementace MCP vyžadují vrstvené bezpečnostní přístupy, které řeší jak tradiční softwarovou bezpečnost, tak AI-specifická rizika. Rychle se vyvíjející specifikace MCP pokračuje ve zdokonalování svých bezpečnostních kontrol, což umožňuje lepší integraci s podnikových bezpečnostních architekturami a zavedenými nejlepšími postupy.

Výzkum z [Microsoft Digital Defense Report](https://aka.ms/mddr) ukazuje, že **98 % nahlášených průniků by bylo zabráněno robustní bezpečnostní hygienou**. Nejefektivnější ochranná strategie kombinuje základní bezpečnostní praktiky s MCP-specifickými kontrolami—ověřená základní bezpečnost zůstává nejvlivnějším faktorem pro snížení celkového bezpečnostního rizika.

## Současná bezpečnostní situace

> **Poznámka:** Tyto informace odrážejí bezpečnostní standardy MCP k datu **5. února 2026**, v souladu se **Specifikací MCP 2025-11-25**. Protokol MCP se stále rychle vyvíjí a budoucí implementace mohou zavést nové vzory autentizace a vylepšené kontroly. Vždy se odkazujte na aktuální [Specifikaci MCP](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) a [dokumentaci bezpečnostních nejlepších postupů](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pro nejnovější pokyny.

> **Výhled:** kandidátská verze `2026-07-28` dále posiluje autorizaci — klienti musí ověřovat parametr `iss` v autorizačních odpovědích (RFC 9207), deklarovat OpenID Connect `application_type` při dynamické registraci klienta a vázat registrované údaje k vydávajícím autorizačním serverům. Kompletní seznam autorizačních SEP naleznete v dokumentu [Co se mění v MCP: kandidátská verze 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## 🏔️ MCP Security Summit Workshop (Sherpa)

Pro **praktický bezpečnostní výcvik** důrazně doporučujeme **MCP Security Summit Workshop** (Sherpa) – komplexní řízenou expedici za zabezpečením MCP serverů v Microsoft Azure.

### Přehled workshopu

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) nabízí praktický, proveditelný bezpečnostní výcvik pomocí ověřené metodologie „zranitelnost → exploit → oprava → ověření“. Naučíte se:

- **Učit se lámáním věcí**: Zažít zranitelnosti přímo pomocí exploitace záměrně nezabezpečených serverů
- **Použít nativní bezpečnost Azure**: Využít Azure Entra ID, Key Vault, API Management a AI Content Safety
- **Řídit obranu do hloubky**: Procházet tábory s postupně budovanými komplexními bezpečnostními vrstvami
- **Aplikovat OWASP standardy**: Každá technika odpovídá [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Získat produkční kód**: Odcházet s funkčními, testovanými implementacemi

### Trasa expedice

| Tábor | Zaměření | Pokryté OWASP rizika |
|------|---------|---------------------|
| **Základní tábor** | MCP základy & zranitelnosti autentizace | MCP01, MCP07 |
| **Tábor 1: Identita** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tábor 2: Brána** | API Management, Private Endpoints, správa | MCP02, MCP06, MCP07, MCP09 |
| **Tábor 3: I/O bezpečnost** | Prompt injection, ochrana PII, obsahová bezpečnost | MCP03, MCP05, MCP06, MCP10 |
| **Tábor 4: Monitorování** | Log Analytics, přehledy, detekce hrozeb | MCP04, MCP08 |
| **Summit** | Integrační test Red Team / Blue Team | Všechny |

**Začněte zde**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 bezpečnostních rizik

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) uvádí deset nejkritičtějších bezpečnostních rizik pro implementace MCP:

| Riziko | Popis | Mitigace Azure |
|--------|---------|------------------|
| **MCP01** | Špatná správa tokenů & vystavení tajemství | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalace oprávnění přes Scope Creep | RBAC, Podmíněný přístup |
| **MCP03** | Otrava nástrojů | Ověření nástrojů, kontrola integrity |
| **MCP04** | Útoky na dodavatelský řetězec softwaru & manipulace se závislostmi | GitHub Advanced Security, skenování závislostí |
| **MCP05** | Injection & exekuce příkazů | Validace vstupu, sandboxing |
| **MCP06** | Podvržení toku záměru | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nedostatečná autentizace & autorizace | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Nedostatek auditů a telemetrie | Azure Monitor, Application Insights |
| **MCP09** | Stínové MCP servery | Správa API Center, izolace sítí |
| **MCP10** | Vkládání kontextu & nadměrné sdílení | Klasifikace dat, minimální expozice |

### Vývoj autentizace MCP

Specifikace MCP se významně vyvinula ve svém přístupu k autentizaci a autorizaci:

- **Původní přístup**: Rané specifikace vyžadovaly, aby vývojáři implementovali vlastní autentizační servery, přičemž MCP servery fungovaly jako OAuth 2.0 autorizační servery spravující přímou autentizaci uživatelů
- **Současný standard (2025-11-25)**: Aktualizovaná specifikace umožňuje MCP serverům delegovat autentizaci na externí poskytovatele identity (např. Microsoft Entra ID), čímž se zlepšuje bezpečnostní postoj a snižuje složitost implementace
- **Bezpečnost na transportní vrstvě**: Vylepšená podpora bezpečných transportních mechanismů s odpovídajícími autentizačními vzory pro lokální (STDIO) i vzdálená (Streamable HTTP) připojení

## Bezpečnost autentizace & autorizace

### Současné bezpečnostní výzvy

Moderní implementace MCP čelí několika výzvám v oblasti autentizace a autorizace:

### Rizika & hrozební vektory

- **Špatně nakonfigurovaná autorizace**: Chybné implementace autorizace v MCP serverech mohou odhalit citlivá data a nesprávně aplikovat přístupové kontroly
- **Ohrožení OAuth tokenu**: Krádež tokenu lokálního MCP serveru umožňuje útočníkům vydávat se za server a získat přístup k downstream službám
- **Zranitelnosti při předávání tokenů**: Nesprávné zpracování tokenů vytváří obcházení bezpečnostních kontrol a mezery v zodpovědnosti
- **Nadměrná oprávnění**: MCP servery s přehnanými právy porušují princip nejmenších oprávnění a zvětšují útočné plochy

#### Token passthrough: Kritický anti-vzor

**Token passthrough je ve stávající specifikaci autorizace MCP výslovně zakázán** kvůli vážným bezpečnostním důsledkům:

##### Obcházení bezpečnostních kontrol
- MCP servery a downstream API implementují klíčové bezpečnostní kontroly (limitování rychlosti, validace požadavků, monitorování provozu), které závisí na správné validaci tokenů
- Přímé použití tokenů klientem k API obchází tyto nezbytné ochrany a podrývá bezpečnostní architekturu

##### Výzvy k zodpovědnosti & auditům
- MCP servery nedokážou rozlišovat klienty používající tokeny vydané upstream, což narušuje auditní stopy
- Logy downstream zdrojových serverů vykazují zavádějící původ požadavků místo skutečných MCP serverů prostředníků
- Vyšetřování incidentů a audit shody je pak výrazně obtížnější

##### Rizika exfiltrace dat
- Neověřené tokenové požadavky umožňují škodlivým aktérům s ukradenými tokeny využívat MCP servery jako proxy pro exfiltraci dat
- Porušení hranic důvěry umožňují neoprávněné přístupové vzory obejít zamýšlené bezpečnostní kontroly

##### Multi-služební vektory útoku
- Přijaté kompromitované tokeny více službami umožňují boční pohyb mezi propojenými systémy
- Důvěryhodné předpoklady mezi službami mohou být narušeny, pokud nelze ověřit původ tokenů

### Bezpečnostní kontroly & mitigace

**Kritické bezpečnostní požadavky:**

> **POVINNÉ**: MCP servery **NESMÍ** přijímat žádné tokeny, které nebyly výslovně vydány pro daný MCP server

#### Kontroly autentizace & autorizace

- **Přísný audit autorizace**: Proveďte důkladné revize autorizace MCP serverů, aby měly přístup pouze zamýšlené uživatele a klienti ke citlivým zdrojům
  - **Průvodce implementací**: [Azure API Management jako autentizační brána pro MCP servery](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrace identity**: [Používání Microsoft Entra ID pro autentizaci MCP serverů](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Bezpečná správa tokenů**: Implementujte [Nejlepší postupy pro validaci tokenů a životní cyklus od Microsoftu](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validujte, že claims tokenu odpovídají identitě MCP serveru
  - Implementujte správnou rotaci a expiraci tokenů
  - Zabraňte opakovanému použití tokenů a neoprávněnému užití

- **Chráněné ukládání tokenů**: Bezpečné uchovávání tokenů s šifrováním v klidu i během přenosu
  - **Nejlepší praxe**: [Pokyny pro bezpečné ukládání a šifrování tokenů](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementace přístupové kontroly

- **Princip nejmenších oprávnění**: Udělujte MCP serverům pouze minimální oprávnění potřebná pro zamýšlenou funkcionalitu
  - Pravidelné revize a aktualizace oprávnění, aby se zabránilo jejich narůstání
  - **Dokumentace Microsoftu**: [Bezpečný přístup s minimálními oprávněními](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Řízení přístupu na základě rolí (RBAC)**: Implementujte detailní přidělování rolí
  - Role cíleně omezené na specifické zdroje a akce
  - Vyhněte se širokým nebo zbytečným oprávněním rozšiřujícím útočné plochy

- **Nepřetržité sledování oprávnění**: Provádějte kontinuální audit a monitoring přístupů
  - Sledujte vzory používání oprávnění pro anomálie
  - Okamžitě řešte nadměrná nebo nevyužívaná oprávnění

## AI-specifické bezpečnostní hrozby

### Prompt Injection & útoky na manipulaci s nástroji

Moderní implementace MCP čelí sofistikovaným AI-specifickým útokům, které tradiční bezpečnostní opatření nemohou plně řešit:

#### **Nepřímý prompt injection (Cross-Domain Prompt Injection)**

**Nepřímý prompt injection** představuje jednu z nejkritičtějších zranitelností v AI systémech s podporou MCP. Útočníci vkládají škodlivé instrukce do externího obsahu—dokumentů, webových stránek, e-mailů nebo datových zdrojů—které AI systémy následně zpracovávají jako legitimní příkazy.

**Scénáře útoků:**
- **Injection založená na dokumentech**: Škodlivé instrukce skryté v zpracovávaných dokumentech spouštějí nežádoucí AI akce
- **Zneužití webového obsahu**: Kompromitované webové stránky obsahující vložené prompt, které manipulují chování AI při scrapování
- **Útoky přes e-maily**: Škodlivé prompty v e-mailech způsobující, že AI asistenti unikají informace nebo provádějí neautorizované akce
- **Kontaminace datových zdrojů**: Kompromitované databáze nebo API poskytující AI systémům znečištěný obsah

**Reálný dopad**: Tyto útoky mohou vést k exfiltraci dat, porušení soukromí, generování škodlivého obsahu a manipulaci uživatelských interakcí. Pro detailní analýzu viz [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram útoku prompt injection](../../../translated_images/cs/prompt-injection.ed9fbfde297ca877.webp)

#### **Útoky typu Tool Poisoning**

**Tool Poisoning** cílí na metadata, která definují MCP nástroje, zneužívajíc způsob, jakým LLM interpretují popisy nástrojů a parametry k rozhodování o exekuci.

**Mechanismy útoku:**
- **Manipulace s metadaty**: Útočníci injektují škodlivé instrukce do popisů nástrojů, definic parametrů nebo příkladů použití
- **Neviditelné instrukce**: Skryté prompty v metadatech nástrojů, které zpracovávají AI modely, ale jsou neviditelné pro lidské uživatele
- **Dynamická modifikace nástrojů („Rug Pulls“)**: Nástroje schválené uživateli jsou později modifikovány k provádění škodlivých akcí bez vědomí uživatele
- **Injection parametrů**: Škodlivý obsah vložený do schémat parametrů nástrojů, který ovlivňuje chování modelu


**Rizika hostovaných serverů**: Vzdálené servery MCP představují zvýšená rizika, protože definice nástrojů mohou být aktualizovány po počátečním schválení uživatelem, což vytváří scénáře, kdy dříve bezpečné nástroje mohou být škodlivé. Pro komplexní analýzu viz [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram útoku injekce nástroje](../../../translated_images/cs/tool-injection.3b0b4a6b24de6bef.webp)

#### **Další vektory útoků AI**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikované útoky využívající obsah z více domén k obejití bezpečnostních kontrol
- **Dynamická modifikace schopností**: Změny schopností nástrojů v reálném čase, které unikají počátečním bezpečnostním hodnocením
- **Poisoning kontextového okna**: Útoky manipulující s velkými kontextovými okny za účelem skrytí škodlivých instrukcí
- **Útoky zmatení modelu**: Využití omezení modelu k vytvoření nepředvídatelného nebo nebezpečného chování


### Dopad bezpečnostních rizik AI

**Důsledky s vysokým dopadem:**
- **Exfiltrace dat**: Nepovolený přístup a krádež citlivých podnikových či osobních dat
- **Porušení soukromí**: Zveřejnění osobně identifikovatelných informací (PII) a důvěrných obchodních dat  
- **Manipulace systému**: Nezamýšlené změny kritických systémů a pracovních toků
- **Krádež přihlašovacích údajů**: Kompromitace autentizačních tokenů a přístupových údajů služeb
- **Boční pohyb**: Využití kompromitovaných AI systémů jako odrazových můstků pro širší síťové útoky

### Bezpečnostní řešení Microsoft AI

#### **AI Prompt Shields: Pokročilá ochrana proti útokům injekce promptů**

Microsoft **AI Prompt Shields** poskytují komplexní obranu proti přímým i nepřímým útokům injekce promptů pomocí více bezpečnostních vrstev:

##### **Základní ochranné mechanismy:**

1. **Pokročilé detekce a filtrování**
   - Algoritmy strojového učení a NLP techniky detekují škodlivé instrukce v externím obsahu
   - Analýza v reálném čase dokumentů, webových stránek, e-mailů a zdrojů dat na vkládané hrozby
   - Kontextuální porozumění legitimním vs. škodlivým vzorcům promptů

2. **Techniky zvýraznění**  
   - Rozlišuje mezi důvěryhodnými systémovými instrukcemi a potenciálně kompromitovanými externími vstupy
   - Metody transformace textu, které zvyšují relevanci modelu a zároveň izolují škodlivý obsah
   - Pomáhá AI systémům udržet správnou hierarchii instrukcí a ignorovat injektované příkazy

3. **Systémy oddělovačů a označování dat**
   - Explicitní definice hranic mezi důvěryhodnými systémovými zprávami a textem externího vstupu
   - Speciální značky zvýrazňují hranice mezi důvěryhodnými a nedůvěryhodnými zdroji dat
   - Jasné oddělení zabraňuje záměně instrukcí a neoprávněnému provádění příkazů

4. **Kontinuální zpravodajství o hrozbách**
   - Microsoft neustále sleduje vznikající vzory útoků a aktualizuje obrany
   - Proaktivní vyhledávání hrozeb nových technik injekce a vektorů útoku
   - Pravidelné aktualizace bezpečnostních modelů pro udržení účinnosti proti vyvíjejícím se hrozbám

5. **Integrace Azure Content Safety**
   - Součást komplexního balíku Azure AI Content Safety
   - Dodatečná detekce pokusů o jailbreak, škodlivého obsahu a porušení bezpečnostních zásad
   - Jednotné bezpečnostní kontroly napříč komponentami AI aplikací

**Zdroje pro implementaci**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Ochrana Microsoft Prompt Shields](../../../translated_images/cs/prompt-shield.ff5b95be76e9c78c.webp)


## Pokročilé hrozby bezpečnosti MCP

### Zranitelnosti přepadení relace

**Přepadení relace** představuje kritický vektor útoku ve stavových implementacích MCP, kde neoprávněné strany získají a zneužijí legitimní identifikátory relací k vydávání se za klienty a provádění neoprávněných akcí.

#### **Scénáře útoků a rizika**

- **Injekce promptu při přepadení relace**: Útočníci se stolenými ID relací vkládají škodlivé události do serverů sdílejících stav relace, což může spustit škodlivé akce nebo zpřístupnit citlivá data
- **Přímé vydávání se za uživatele**: Ukradená ID relací umožňují přímé volání MCP serveru bez autentizace, čímž jsou útočníci považováni za legitimní uživatele
- **Kompromitované přerušitelné streamy**: Útočníci mohou předčasně ukončit požadavky, čímž způsobí, že legitimní klienti pokračují s potenciálně škodlivým obsahem

#### **Bezpečnostní kontroly pro správu relací**

**Kritické požadavky:**
- **Ověření autorizace**: Servery MCP implementující autorizaci **MUSÍ** ověřit VŠECHNY příchozí požadavky a **NESMÍ** spoléhat na relace pro autentizaci
- **Bezpečná generace relací**: Používat kryptograficky zabezpečená, nedeterministická ID relací generovaná bezpečnými generátory náhodných čísel
- **Vazba na uživatele**: Vázat ID relací na uživatelsky specifické informace pomocí formátů jako `<user_id>:<session_id>` pro zabránění zneužití relací mezi uživateli
- **Správa životního cyklu relací**: Implementovat správné vypršení, rotaci a neplatnost k omezení zranitelnosti
- **Bezpečnost přenosu**: Povinné HTTPS pro veškerou komunikaci k zamezení odposlechů ID relace

### Problém zmatku zmocněnce

**Problém zmatku zmocněnce** nastává, když servery MCP fungují jako autentizační proxy mezi klienty a třetími stranami, což otevírá možnosti obejití autorizace prostřednictvím zneužití statických klientských ID.

#### **Mechanika útoku a rizika**

- **Obcházení souhlasu založené na cookie**: Předchozí autentizace uživatele vytváří souhlasové cookies, které útočníci využívají prostřednictvím škodlivých požadavků autorizace s upravenými přesměrovacími URI
- **Krádež autorizačního kódu**: Stávající souhlasové cookies mohou způsobit, že autorizační servery přeskočí obrazovky souhlasu a přesměrují kódy na koncové body pod kontrolou útočníka  
- **Neoprávněný přístup k API**: Ukradené autorizační kódy umožňují výměnu tokenu a vydávání se za uživatele bez explicitního schválení

#### **Strategie zmírnění**

**Povinné kontroly:**
- **Explicitní požadavky na souhlas**: Proxní servery MCP používající statická klientská ID **MUSÍ** získat souhlas uživatele pro každého dynamicky registrovaného klienta
- **Implementace bezpečnosti OAuth 2.1**: Dodržovat současné nejlepší bezpečnostní postupy OAuth včetně PKCE (Proof Key for Code Exchange) pro všechny autorizační požadavky
- **Přísná validace klienta**: Implementovat důkladnou validaci přesměrovacích URI a identifikátorů klientů k zabránění zneužití

### Zranitelnosti průchodu tokenů  

**Token passthrough** představuje explicitní antipatern, kdy servery MCP akceptují klientské tokeny bez řádné validace a předávají je do podřízených API, čímž porušují specifikace autorizace MCP.

#### **Bezpečnostní důsledky**

- **Obcházení kontrol**: Přímé využití tokenů klientem vůči API obchází kritické řídící mechanismy limitování, validace a monitoringu
- **Poškození auditních stop**: Tokeny vydané na vyšší úrovni znemožňují identifikaci klienta a narušují schopnost vyšetřování incidentů
- **Proxy exfiltrace dat**: Nevalidované tokeny umožňují škodlivým aktérům používat servery jako proxy pro neoprávněný přístup k datům
- **Porušení hranic důvěry**: Následující služby mohou mít porušeny důvěryhodné předpoklady, pokud není ověřen původ tokenů
- **Rozšíření útoků přes více služeb**: Kompromitované tokeny přijímané napříč službami umožňují boční pohyb

#### **Požadované bezpečnostní kontroly**

**Nezbytné požadavky:**
- **Validace tokenů**: Servery MCP **NESMÍ** přijímat tokeny, které nejsou explicitně vydány pro MCP server
- **Ověření publika tokenu**: Vždy ověřovat, že publikum tokenu odpovídá identitě MCP serveru
- **Řádný životní cyklus tokenů**: Zavést krátkodobé access tokeny se zabezpečenou rotací


## Bezpečnost dodavatelského řetězce pro AI systémy

Bezpečnost dodavatelského řetězce se rozvinula za rámec tradičních softwarových závislostí a zahrnuje celý AI ekosystém. Moderní implementace MCP musí důsledně ověřovat a monitorovat všechny AI součásti, protože každá přináší potenciální zranitelnosti, které mohou ohrozit integritu systému.

### Rozšířené komponenty dodavatelského řetězce AI

**Tradiční softwarové závislosti:**
- Open-source knihovny a frameworky
- Kontejnerové obrazy a základní systémy  
- Nástroje pro vývoj a build pipeline
- Komponenty infrastruktury a služby

**Specifické prvky dodavatelského řetězce AI:**
- **Základní modely**: Předtrénované modely od různých poskytovatelů vyžadující ověření původu
- **Embedding služby**: Externí služby vektorizace a sémantického vyhledávání
- **Poskytovatelé kontextu**: Datové zdroje, znalostní báze a repozitáře dokumentů  
- **API třetích stran**: Externí AI služby, ML pipeline a koncové body zpracování dat
- **Modelové artefakty**: Váhy, konfigurace a jemně laděné varianty modelů
- **Tréninkové datové zdroje**: Datové sady používané pro trénink a doladění modelů

### Komplexní strategie zabezpečení dodavatelského řetězce

#### **Ověření a důvěra komponent**
- **Validace původu**: Ověřit původ, licencování a integritu všech AI komponent před integrací
- **Bezpečnostní hodnocení**: Provádět skenování zranitelností a bezpečnostní recenze modelů, datových zdrojů a AI služeb
- **Analýza reputace**: Hodnotit bezpečnostní track record a praktiky poskytovatelů AI služeb
- **Ověření shody**: Zajistit, že všechny komponenty splňují organizační bezpečnostní a regulační požadavky

#### **Bezpečné deployment pipeline**  
- **Automatizované CI/CD zabezpečení**: Integrovat bezpečnostní skenování do automatizovaných deployment pipeline
- **Integrita artefaktů**: Implementovat kryptografickou validaci všech nasazovaných artefaktů (kódy, modely, konfigurace)
- **Postupné nasazení**: Používat postupné deployment strategie s bezpečnostní validací v každé fázi
- **Důvěryhodné repozitáře artefaktů**: Nasazovat pouze z ověřených, zabezpečených registry a repozitářů artefaktů

#### **Kontinuální monitoring a reakce**
- **Skenování závislostí**: Průběžné monitorování zranitelností všech softwarových a AI závislostí
- **Monitorování modelů**: Kontinuální hodnocení chování modelů, odchylky výkonu a bezpečnostní anomálie
- **Sledování stavu služeb**: Monitorování externích AI služeb z hlediska dostupnosti, bezpečnostních incidentů a změn zásad
- **Integrace zpravodajství o hrozbách**: Začlenění zpravodajských kanálů specifických pro bezpečnost AI a ML

#### **Kontrola přístupu a princip nejmenších oprávnění**
- **Oprávnění na úrovni komponent**: Omezit přístup k modelům, datům a službám podle obchodní potřeby
- **Správa servisních účtů**: Implementovat dedikované servisní účty s minimálními požadovanými oprávněními
- **Segmentace sítě**: Izolovat AI komponenty a omezit síťový přístup mezi službami
- **Kontroly API gateway**: Používat centralizované API brány pro kontrolu a monitoring přístupu k externím AI službám

#### **Reakce na incidenty a obnova**
- **Rychlé reakční postupy**: Zavedené postupy pro patchování nebo nahrazení kompromitovaných AI komponent
- **Rotace přihlašovacích údajů**: Automatizované systémy pro rotaci tajemství, API klíčů a servisních přihlašovacích údajů
- **Schopnosti vrácení zpět**: Možnost rychle se vrátit k předchozím známým dobrým verzím AI komponent
- **Obnova po narušení dodavatelského řetězce**: Specifické postupy pro reakci na kompromitace upstream AI služeb

### Nástroje a integrace bezpečnosti Microsoft

**GitHub Advanced Security** poskytuje komplexní ochranu dodavatelského řetězce včetně:
- **Secret Scanning**: Automatizovaná detekce přihlašovacích údajů, API klíčů a tokenů v repozitářích
- **Dependency Scanning**: Hodnocení zranitelností open-source závislostí a knihoven
- **CodeQL Analýza**: Statická analýza kódu na bezpečnostní zranitelnosti a programátorské chyby
- **Supply Chain Insights**: Přehled o stavu závislostí a bezpečnostní situaci

**Integrace Azure DevOps & Azure Repos:**
- Bezproblémová integrace bezpečnostních skenů napříč vývojovými platformami Microsoft
- Automatizované bezpečnostní kontroly v Azure Pipelines pro AI pracovní zatížení
- Vynucování politik pro bezpečné nasazení AI komponent

**Interní postupy Microsoftu:**
Microsoft zavádí rozsáhlé postupy zabezpečení dodavatelského řetězce napříč všemi produkty. Více informací o ověřených přístupech naleznete v [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Základní bezpečnostní osvědčené postupy

Implementace MCP dědí a staví na existující bezpečnostní pozici vaší organizace. Posílení základních bezpečnostních praktik výrazně zvyšuje celkovou bezpečnost AI systémů a nasazení MCP.

### Základní bezpečnostní principy

#### **Bezpečné postupy vývoje**
- **Soulad s OWASP**: Ochrana proti [OWASP Top 10](https://owasp.org/www-project-top-ten/) zranitelnostem webových aplikací
- **Ochrany specifické pro AI**: Implementace kontrol pro [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Bezpečná správa tajemství**: Používání dedikovaných trezorů pro tokeny, API klíče a citlivá konfigurační data
- **Šifrování end-to-end**: Zajištění bezpečné komunikace napříč všemi komponentami aplikací a datovými toky
- **Validace vstupů**: Přísná validace všech uživatelských vstupů, parametrů API a zdrojů dat

#### **Zpevnění infrastruktury**
- **Vícefaktorová autentizace**: Povinné MFA pro všechny administrátorské a servisní účty
- **Správa patchů**: Automatizované a včasné aktualizace operačních systémů, frameworků a závislostí  
- **Integrace poskytovatelů identity**: Centralizovaná správa identity přes podnikové identity providery (Microsoft Entra ID, Active Directory)
- **Segmentace sítě**: Logická izolace MCP komponent pro omezení potenciálu bočního pohybu
- **Princip nejmenších oprávnění**: Minimální požadovaná oprávnění pro všechny systémové komponenty a účty

#### **Monitorování a detekce bezpečnosti**
- **Komplexní protokolování**: Detailní záznamy aktivit AI aplikaci, včetně interakcí MCP klient-server
- **Integrace SIEM**: Centralizovaná správa bezpečnostních informací a událostí pro detekci anomálií
- **Behaviorální analýza**: AI-poháněný monitoring pro detekci nezvyklých vzorců v chování systému a uživatelů
- **Zpravodajství o hrozbách**: Začlenění externích zdrojů hrozeb a indikátorů kompromitace (IOC)
- **Reakce na incidenty**: Jasně definované postupy pro detekci, reakci a obnovu po bezpečnostních incidentech

#### **Architektura Zero Trust**
- **Nikdy nedůvěřuj, vždy ověřuj**: Průběžné ověřování uživatelů, zařízení a síťových připojení
- **Mikrosegmentace**: Granulární síťové kontroly izolující jednotlivé workloady a služby
- **Bezpečnost založená na identitě**: Bezpečnostní politiky založené na ověřených identitách místo síťové lokace
- **Kontinuální hodnocení rizik**: Dynamické vyhodnocování bezpečnostní pozice na základě aktuálního kontextu a chování
- **Podmíněný přístup**: Kontroly přístupu adaptující se podle faktorů rizika, lokace a spolehlivosti zařízení

### Vzory integrace v podniku

#### **Integrace do Microsoft bezpečnostního ekosystému**
- **Microsoft Defender for Cloud**: Komplexní řízení bezpečnostní pozice v cloudu
- **Azure Sentinel**: Nativní cloudové SIEM a SOAR schopnosti pro ochranu AI workloadů
- **Microsoft Entra ID**: Podnikové řízení identity a přístupu s podmíněnými přístupovými politikami
- **Azure Key Vault**: Centralizovaná správa tajemství s podporou hardwarových bezpečnostních modulů (HSM)
- **Microsoft Purview**: Správa dat a shoda pro AI datové zdroje a pracovní toky

#### **Soulad a správa**
- **Soulad s předpisy**: Zajistit, že implementace MCP splňují odvětvové požadavky na shodu (GDPR, HIPAA, SOC 2)

- **Klasifikace dat**: Správná kategorizace a nakládání s citlivými daty zpracovávanými AI systémy
- **Auditní záznamy**: Komplexní protokolování pro dodržování předpisů a forenzní vyšetřování
- **Kontroly soukromí**: Implementace zásad ochrany soukromí již při návrhu architektury AI systému
- **Správa změn**: Formální procesy pro bezpečnostní kontrolu úprav AI systémů

Tyto základní praktiky vytvářejí robustní bezpečnostní základ, který zvyšuje účinnost bezpečnostních opatření specifických pro MCP a poskytuje komplexní ochranu aplikacím řízeným AI.

## Klíčové bezpečnostní poznatky

- **Vícevrstvý bezpečnostní přístup**: Kombinujte základní bezpečnostní praktiky (bezpečné kódování, princip minimálních oprávnění, ověřování dodavatelského řetězce, kontinuální monitorování) s kontrolami specifickými pro AI pro komplexní ochranu

- **Specifické hrozby pro AI**: Systémy MCP čelí jedinečným rizikům včetně vkládání promptů, otravy nástrojů, únosu relací, problémům zmateného zástupce, zranitelnostem přenosu tokenů a nadměrným oprávněním, které vyžadují specializovaná opatření

- **Excelence v autentizaci a autorizaci**: Implementujte robustní autentizaci pomocí externích poskytovatelů identity (Microsoft Entra ID), vynucujte správné ověřování tokenů a nikdy nepřijímejte tokeny, které nejsou explicitně vydané pro váš MCP server

- **Prevence útoků na AI**: Rozmístěte Microsoft Prompt Shields a Azure Content Safety pro obranu proti nepřímému vkládání promptů a otravě nástrojů, zároveň ověřujte metadata nástrojů a sledujte dynamické změny

- **Bezpečnost relací a přenosu**: Používejte kryptograficky bezpečné, nedeterministické ID relací vázané na uživatelské identity, implementujte správné řízení životního cyklu relací a nikdy nepoužívejte relace pro autentizaci

- **Nejlepší praktiky bezpečnosti OAuth**: Zabraňte útokům zmateného zástupce pomocí explicitního uživatelského souhlasu pro dynamicky registrované klienty, správné implementace OAuth 2.1 s PKCE a přísného ověřování redirect URI  

- **Principy zabezpečení tokenů**: Vyhýbejte se anti-vzorům přenosu tokenů, validujte nároky audience tokenů, implementujte krátkodobě platné tokeny s bezpečnou rotací a udržujte jasné hranice důvěry

- **Komplexní bezpečnost dodavatelského řetězce**: Zacházejte se všemi komponentami AI ekosystému (modely, embeddingy, poskytovatelé kontextu, externí API) se stejnou bezpečnostní přísností jako se závislostmi tradičního softwaru

- **Nepřetržitý vývoj**: Sledujte aktuální specifikace MCP, přispívejte ke standardům bezpečnostní komunity a udržujte adaptivní bezpečnostní postoje s vývojem protokolu

- **Integrace bezpečnosti Microsoftu**: Využijte komplexní bezpečnostní ekosystém Microsoftu (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pro lepší ochranu nasazení MCP

## Komplexní zdroje

### **Oficiální dokumentace bezpečnosti MCP**
- [Specifikace MCP (aktuální: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Nejlepší bezpečnostní postupy MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specifikace autorizace MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [GitHub repozitář MCP](https://github.com/modelcontextprotocol)

### **OWASP bezpečnostní zdroje pro MCP**
- [OWASP MCP Azure bezpečnostní průvodce](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexní OWASP MCP Top 10 s pokyny k implementaci v Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiální bezpečnostní rizika OWASP MCP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostní trénink pro MCP na Azure

### **Bezpečnostní standardy a nejlepší praktiky**
- [Nejlepší bezpečnostní praktiky OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 bezpečnost webových aplikací](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 pro velké jazykové modely](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Výzkum a analýza bezpečnosti AI**
- [Vkládání promptů v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Útoky otrav nástrojů (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Výzkumné bezpečnostní shrnutí MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Bezpečnostní řešení Microsoftu**
- [Dokumentace Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID bezpečnost](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Nejlepší praktiky správy tokenů v Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Průvodce implementací a návody**
- [Azure API Management jako auth brána MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autentizace Microsoft Entra ID s MCP servery](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Bezpečné ukládání a šifrování tokenů (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **Bezpečnost DevOps & dodavatelského řetězce**
- [Azure DevOps bezpečnost](https://azure.microsoft.com/products/devops)
- [Azure Repos bezpečnost](https://azure.microsoft.com/products/devops/repos/)
- [Cesta Microsoftu k bezpečnému dodavatelskému řetězci](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Další bezpečnostní dokumentace**

Pro komplexní bezpečnostní pokyny použijte tyto specializované dokumenty v této sekci:

- **[Nejlepší bezpečnostní praktiky MCP 2025](./mcp-security-best-practices-2025.md)** - Kompletní bezpečnostní doporučení pro implementace MCP
- **[Implementace Azure Content Safety](./azure-content-safety-implementation.md)** - Praktické příklady integrace Azure Content Safety  
- **[Bezpečnostní kontroly MCP 2025](./mcp-security-controls-2025.md)** - Nejnovější bezpečnostní kontroly a techniky pro nasazení MCP
- **[Rychlá příručka nejlepších postupů MCP](./mcp-best-practices.md)** - Rychlý referenční průvodce hlavními bezpečnostními postupy MCP
- **[BlueHat 2026: Zajištění budoucnosti AI: Zabezpečení MCP pomocí vrstev obrany](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Vzory obrany-in-depth od Microsoft Security Response Center (MSRC)

### **Praktický bezpečnostní trénink**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komplexní praktický workshop pro zabezpečení MCP serverů v Azure s postupnými tábory od Base Camp po Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenční architektura a pokyny k implementaci všech OWASP MCP Top 10 rizik

---

## Co bude dál

Další: [Kap. 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->