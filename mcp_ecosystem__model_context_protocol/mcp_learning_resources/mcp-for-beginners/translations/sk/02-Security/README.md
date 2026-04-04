# MCP Bezpečnosť: Komplexná Ochrana pre AI Systémy

[![MCP Security Best Practices](../../../translated_images/sk/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknite na obrázok vyššie pre zobrazenie videa tejto lekcie)_

Bezpečnosť je základom návrhu AI systémov, preto jej venujeme prioritu ako druhej sekcii. Toto je v súlade s princípom Microsoftu **Secure by Design** z [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) prináša silné nové schopnosti do AI riadených aplikácií, pričom zároveň zavádza unikátne bezpečnostné výzvy, ktoré presahujú tradičné softvérové riziká. Systémy MCP čelia ako zavedeným bezpečnostným hrozbám (bezpečné programovanie, princíp najmenších oprávnení, bezpečnosť dodávateľského reťazca), tak aj novým AI špecifickým hrozbám vrátane prompt injection, tool poisoning, session hijacking, confused deputy útokov, token passthrough zraniteľností a dynamickej modifikácie schopností.

Táto lekcia skúma najkritickejšie bezpečnostné riziká v implementáciách MCP — pokrýva autentifikáciu, autorizáciu, nadmerné oprávnenia, nepriame prompt injection, bezpečnosť relácií, problémy confused deputy, správu tokenov a zraniteľnosti v dodávateľskom reťazci. Naučíte sa konkrétne kontroly a overené postupy na zmiernenie týchto rizík s využitím riešení Microsoftu ako Prompt Shields, Azure Content Safety a GitHub Advanced Security na posilnenie nasadenia MCP.

## Ciele učenia

Na konci tejto lekcie budete schopní:

- **Identifikovať MCP-špecifické hrozby**: Rozpoznať unikátne bezpečnostné riziká v MCP systémoch, vrátane prompt injection, tool poisoning, nadmerných oprávnení, session hijacking, problémov confused deputy, token passthrough zraniteľností a rizík dodávateľského reťazca
- **Aplikovať bezpečnostné kontroly**: Implementovať účinné opatrenia vrátane robustnej autentifikácie, prístupu na základe najmenších oprávnení, bezpečnej správy tokenov, kontrol bezpečnosti relácií a overenia dodávateľského reťazca
- **Vyťažiť zo Microsoft bezpečnostných riešení**: Pochopiť a nasadiť Microsoft Prompt Shields, Azure Content Safety a GitHub Advanced Security pre ochranu MCP záťaže
- **Overiť bezpečnosť nástrojov**: Recognovať dôležitosť validácie metaúdajov nástrojov, monitorovania dynamických zmien a obrany proti nepriamej prompt injection
- **Integrovať overené postupy**: Skombinovať zavedené bezpečnostné základy (bezpečné programovanie, hardening servera, zero trust) s MCP-špecifickými kontrolami pre komplexnú ochranu

# Architektúra a kontroly MCP bezpečnosti

Moderné implementácie MCP vyžadujú viacvrstvové bezpečnostné prístupy, ktoré riešia tradičné softvérové bezpečnostné hrozby aj AI-špecifické riziká. Rýchlo sa vyvíjajúca špecifikácia MCP neustále zlepšuje svoje bezpečnostné kontroly, čo umožňuje lepšiu integráciu s podnikovými bezpečnostnými architektúrami a zavedenými overenými praktikami.

Výskum z [Microsoft Digital Defense Report](https://aka.ms/mddr) preukazuje, že **98 % hlásených bezpečnostných incidentov by bolo zabránených robustnou bezpečnostnou hygienou**. Najefektívnejšia ochrana kombinuje základné bezpečnostné praktiky s MCP-špecifickými kontrolami — osvedčené základné bezpečnostné opatrenia zostávajú najvýznamnejším faktorom v znižovaní celkového bezpečnostného rizika.

## Aktuálna bezpečnostná situácia

> **Poznámka:** Tieto informácie odrážajú štandardy bezpečnosti MCP ku dňu **5. februára 2026**, v súlade so **špecifikáciou MCP 2025-11-25**. Protokol MCP sa naďalej rýchlo vyvíja a budúce implementácie môžu zaviesť nové autentifikačné vzory a vylepšené kontroly. Vždy sa odvolávajte na aktuálnu [špecifikáciu MCP](https://spec.modelcontextprotocol.io/), [MCP GitHub repozitár](https://github.com/modelcontextprotocol) a [dokumentáciu najlepších bezpečnostných praktík](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pre najnovšie odporúčania.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Pre **praktické školenie v bezpečnosti** vrelo odporúčame **MCP Security Summit Workshop** (Sherpa) – komplexnú riadenú expedíciu k zabezpečeniu MCP serverov v Microsoft Azure.

### Prehľad workshopu

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) poskytuje praktické a konkrétne bezpečnostné školenie prostredníctvom overenej metodológie „zraniteľnosť → exploit → oprava → validácia“. Budete:

- **Učiť sa lámáním**: Zažijete zraniteľnosti na vlastnej koži tým, že napadnete zámerne nebezpečné servery
- **Používať natívnu bezpečnosť Azure**: Využijete Azure Entra ID, Key Vault, API Management a AI Content Safety
- **Následovať defense-in-depth**: Prejdete kempmi budujúcimi komplexné bezpečnostné vrstvy
- **Aplikovať štandardy OWASP**: Každá technika je prepojená na [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Získať produkčný kód**: Odlavíte s funkčnými, otestovanými implementáciami

### Trasa expedície

| Kraj | Zameranie | Pokryté OWASP riziká |
|------|-----------|----------------------|
| **Base Camp** | Základy MCP a zraniteľnosti autentifikácie | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, správa | MCP02, MCP07, MCP09 |
| **Camp 3: I/O Security** | Prompt injection, ochrana PII, content safety | MCP03, MCP05, MCP06 |
| **Camp 4: Monitoring** | Log Analytics, dashboardy, detekcia hrozieb | MCP08 |
| **The Summit** | Red Team / Blue Team integračný test | Všetky |

**Začnite tu**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 bezpečnostných rizík

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) popisuje desať najkritickejších bezpečnostných rizík v implementáciách MCP:

| Riziko | Popis | Opatrenie v Azure |
|--------|-------|-------------------|
| **MCP01** | Nesprávna správa tokenov a únik tajomstiev | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalácia práv pomocou Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Validácia nástrojov, overovanie integrity |
| **MCP04** | Útoky na dodávateľský reťazec | GitHub Advanced Security, skenovanie závislostí |
| **MCP05** | Command Injection a vykonanie príkazov | Validácia vstupov, sandboxing |
| **MCP06** | Prompt Injection cez kontextové dáta | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nedostatočná autentifikácia a autorizácia | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Nedostatok auditu a telemetrie | Azure Monitor, Application Insights |
| **MCP09** | Shadow MCP servery | API Center správa, sieťová izolácia |
| **MCP10** | Context Injection a prekročenie zdieľania | Klasifikácia dát, minimálna expozícia |

### Vývoj autentifikácie MCP

Špecifikácia MCP sa významne vyvinula vo svojom prístupe k autentifikácii a autorizácii:

- **Pôvodný prístup**: Skoré špecifikácie vyžadovali, aby vývojári implementovali vlastné autentifikačné servery, pričom MCP servery fungovali ako OAuth 2.0 Autorizačné servery, ktoré priamo spravovali autentifikáciu používateľov
- **Súčasný štandard (2025-11-25)**: Aktualizovaná špecifikácia umožňuje MCP serverom delegovať autentifikáciu na externých poskytovateľov identity (ako Microsoft Entra ID), čo zlepšuje bezpečnostný postoj a znižuje komplexnosť implementácie
- **Transport Layer Security**: Vylepšená podpora pre bezpečné transportné mechanizmy s riadnymi autentifikačnými vzormi pre lokálne (STDIO) aj vzdialené (Streamable HTTP) spojenia

## Bezpečnosť autentifikácie a autorizácie

### Súčasné bezpečnostné výzvy

Moderné implementácie MCP čelia niekoľkým výzvam v autentifikácii a autorizácii:

### Riziká a vektory útokov

- **Chybne nakonfigurovaná autorizácia**: Chybné implementovanie autorizácie v MCP serveroch môže vystaviť citlivé dáta a nesprávne uplatniť prístupové kontroly
- **Ohrozenie OAuth tokenov**: Krádež miestneho tokenu MCP servera umožňuje útočníkom vydávať sa za servery a pristupovať k downstream službám
- **Token passthrough zraniteľnosti**: Nesprávna správa tokenov vytvára obchádzky bezpečnostných kontrol a problémy s auditom
- **Nadmerné oprávnenia**: Privilegované MCP servery porušujú princíp najmenších oprávnení a rozširujú povrch útoku

#### Token passthrough: kritický anti-vzor

**Token passthrough je expresne zakázaný** v aktuálnej MCP autorizácii kvôli závažným bezpečnostným dôsledkom:

##### Obchádzanie bezpečnostných kontrol
- MCP servery a downstream API implementujú kritické bezpečnostné kontroly (limitovanie počtu požiadaviek, validácia požiadaviek, monitorovanie prevádzky), ktoré závisia od správnej validácie tokenov
- Priame použitie tokenov klientom k API obchádza tieto zásadné ochrany a podkopáva bezpečnostnú architektúru

##### Výzvy accountability a auditu
- MCP servery nemajú možnosť rozlíšiť klientov používajúcich upstream vydané tokeny, čím sa narúšajú auditné stopy
- Logy resource serverov zobrazujú nesprávne pôvody požiadaviek namiesto skutočných MCP serverov ako sprostredkovateľov
- Vyšetrovanie incidentov a dodržiavanie súladu sa podstatne komplikuje

##### Riziká exfiltrácie dát
- Nevalidované tokenové tvrdenia umožňujú škodlivým aktérom s ukradnutými tokenmi používať MCP servery ako proxy na exfiltráciu dát
- Porušenia hraníc dôvery umožňujú neoprávnený prístup mimo zamýšľané bezpečnostné kontroly

##### Multi-službové vektory útokov
- Kompromitované tokeny akceptované viacerými službami umožňujú laterálny pohyb naprieč pripojenými systémami
- Predpoklady dôvery medzi službami môžu byť porušené, keď nie je možné overiť pôvod tokenu

### Bezpečnostné kontroly a opatrenia

**Kritické bezpečnostné požiadavky:**

> **POVINNÉ**: MCP servery **NESMÚ** akceptovať žiadne tokeny, ktoré neboli explicitne vydané pre daný MCP server

#### Kontroly autentifikácie a autorizácie

- **Dôkladná revízia autorizácie**: Realizujte komplexné audity autorizácie MCP servera, aby sa zabezpečilo, že iba zamýšľaní používatelia a klienti majú prístup k citlivým zdrojom
  - **Implementačný sprievodca**: [Azure API Management ako autentifikačná brána pre MCP servery](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrácia identity**: [Použitie Microsoft Entra ID pre autentifikáciu MCP servera](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Bezpečná správa tokenov**: Implementujte [Microsoft best practices pre validáciu a životný cyklus tokenov](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validujte, že audience tokenu zodpovedá identite MCP servera
  - Zavádzajte správne politiky rotácie a expirácie tokenov
  - Zabráňte token replay útokom a neoprávnenému použitiu

- **Chránené ukladanie tokenov**: Bezpečne ukladajte tokeny šifrované v pokoji aj počas prenosu
  - **Overené postupy**: [Pokyny na bezpečné ukladanie a šifrovanie tokenov](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementácia prístupovej kontroly

- **Princíp najmenších oprávnení**: MCP serverom udeľujte len minimálne oprávnenia potrebné pre požadovanú funkčnosť
  - Pravidelné kontroly a aktualizácie oprávnení, aby sa zabránilo scope creep
  - **Microsoft dokumentácia**: [Bezpečný prístup na základe najmenších oprávnení](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Implementujte jemné priraďovanie rolí
  - Obmedzte roly striktne na konkrétne zdroje a akcie
  - Vyhnite sa širokým alebo zbytočným oprávneniam, ktoré zväčšujú povrch útoku

- **Kontinuálny monitoring oprávnení**: Vykonávajte priebežný audit a sledovanie prístupov
  - Monitorujte vzory používania oprávnení pre anomálie
  - Promptne odstraňujte nadmerné alebo nepoužívané oprávnenia

## AI-špecifické bezpečnostné hrozby

### Prompt Injection a útoky na manipuláciu nástrojov

Moderné implementácie MCP čelia sofistikovaným AI-špecifickým vektorom útokov, ktoré tradičné bezpečnostné opatrenia nedokážu plne riešiť:

#### **Nepriama prompt injection (Cross-Domain Prompt Injection)**

**Nepriama prompt injection** predstavuje jednu z najkritickejších zraniteľností v MCP podporovaných AI systémoch. Útočníci vložia škodlivé inštrukcie do externého obsahu — dokumentov, webových stránok, emailov alebo zdrojov dát — ktoré AI systémy následne spracujú ako legitímne príkazy.

**Scenáre útokov:**
- **Injekcia do dokumentov**: Škodlivé inštrukcie ukryté v spracovaných dokumentoch, ktoré vyvolajú nechcené AI akcie
- **Zneužitie webového obsahu**: Kompromitované webové stránky s vloženými promptmi, ktoré manipulujú správanie AI pri scraping-u
- **Útoky cez email**: Škodlivé prompty v emailoch spôsobujúce, že AI asistenti unikajú informácie alebo vykonávajú neoprávnené akcie
- **Kontaminácia dátových zdrojov**: Kompromitované databázy alebo API poskytujúce poškodený obsah AI systémom

**Reálny dopad**: Tieto útoky môžu viesť k úniku dát, porušeniu súkromia, generovaniu škodlivého obsahu a manipulácii interakcií používateľov. Pre podrobnú analýzu pozrite [Prompt Injection v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/sk/prompt-injection.ed9fbfde297ca877.webp)

#### **Útoky tool poisoning**

**Tool Poisoning** cieli na metaúdaje definujúce MCP nástroje, zneužívajúc spôsob, akým LLM interpretujú popisy a parametre nástrojov pri rozhodovaní o vykonaní.

**Mechanizmy útoku:**
- **Manipulácia metaúdajov**: Útočníci vkladajú škodlivé inštrukcie do popisov nástrojov, definícií parametrov alebo ukážok použitia
- **Neviditeľné inštrukcie**: Skryté prompty v metaúdajoch nástrojov, ktoré sú spracovávané AI modelmi, no ľuďom sú neviditeľné
- **Dynamická modifikácia nástrojov („Rug Pulls“) **: Nástroje schválené používateľmi sú neskôr upravené, aby vykonávali škodlivé akcie bez ich vedomia
- **Injekcia parametrov**: Škodlivý obsah vložený do schém parametrov nástrojov, ktorý ovplyvňuje správanie modelov

**Riziká hostovaných serverov**: Vzdialené MCP servery predstavujú zvýšené riziká, keďže definície nástrojov môžu byť aktualizované po počiatočnom schválení používateľmi, čo vytvára scenáre, kde sa predtým bezpečné nástroje stávajú škodlivými. Pre komplexnú analýzu pozrite [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/sk/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ďalšie AI vektory útokov**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikované útoky využívajúce obsah z viacerých domén na obídenie bezpečnostných kontrol
- **Dynamická modifikácia schopností**: Zmeny schopností nástroja v reálnom čase, ktoré unikajú počiatočnému bezpečnostnému posúdeniu  
- **Otrava kontextového okna**: Útoky manipulujúce s veľkými kontextovými oknami na skrytie škodlivých inštrukcií  
- **Útoky mätúce model**: Využitie obmedzení modelu na vytvorenie nepredvídateľných alebo nebezpečných správaní  


### Dopad rizík AI bezpečnosti

**Následky s vysokým dopadom:**  
- **Exfiltrácia dát**: Neoprávnený prístup a krádež citlivých podnikových alebo osobných údajov  
- **Porušenie súkromia**: Zverejnenie osobne identifikovateľných informácií (PII) a dôverných obchodných údajov  
- **Manipulácia so systémom**: Nezamýšľané úpravy kritických systémov a pracovných tokov  
- **Krádež prihlasovacích údajov**: Kompromitovanie autentifikačných tokenov a služobných poverení  
- **Bočné pohyby**: Využitie kompromitovaných AI systémov ako odrazových mostíkov pre rozsiahlejšie sieťové útoky  

### Bezpečnostné riešenia AI od Microsoftu

#### **AI Prompt Shields: Pokročilá ochrana proti útokom na injektáž promptov**

Microsoft **AI Prompt Shields** poskytuje komplexnú obranu proti priamym aj nepriamym útokom injektáže promptov cez viacnásobné bezpečnostné vrstvy:

##### **Jadro ochranných mechanizmov:**

1. **Pokročilá detekcia a filtrovanie**  
   - Algoritmy strojového učenia a NLP techniky rozpoznajú škodlivé inštrukcie v externom obsahu  
   - Analýza v reálnom čase dokumentov, webových stránok, emailov a zdrojov dát pre vložené hrozby  
   - Kontextové pochopenie legitímnych vs. škodlivých vzorov promptov  

2. **Techniky zvýraznenia**  
   - Rozlišuje dôveryhodné systémové inštrukcie a potenciálne kompromitované externé vstupy  
   - Metódy transformácie textu, ktoré zvyšujú relevantnosť modelu a zároveň izolujú škodlivý obsah  
   - Pomáha AI systémom udržiavať správnu hierarchiu inštrukcií a ignorovať injektované príkazy  

3. **Systémy delimiterov a označovania dát**  
   - Explicitné vyznačenie hraníc medzi dôveryhodnými systémovými správami a externým textom  
   - Špeciálne značky zvýrazňujú hranice medzi dôveryhodnými a nedôveryhodnými zdrojmi dát  
   - Jasné oddelenie zabraňuje zmätku inštrukcií a neoprávnenému vykonávaniu príkazov  

4. **Kontinuálna inteligencia hrozieb**  
   - Microsoft neustále monitoruje vznikajúce vzory útokov a aktualizuje obrany  
   - Proaktívne pátranie po nových technikách injektáže a útokových vektoroch  
   - Pravidelné aktualizácie bezpečnostného modelu pre udržanie efektívnosti voči vyvíjajúcim sa hrozbám  

5. **Integrácia Azure Content Safety**  
   - Súčasť komplexnej sady Azure AI Content Safety  
   - Dodatočná detekcia pokusov o útok jailbreak, škodlivého obsahu a porušení bezpečnostných politík  
   - Jednotné bezpečnostné ovládacie prvky naprieč komponentmi AI aplikácií  

**Implementačné zdroje**: [Microsoft Prompt Shields Dokumentácia](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/sk/prompt-shield.ff5b95be76e9c78c.webp)


## Pokročilé bezpečnostné hrozby MCP

### Zraniteľnosti únosu relácie

**Únos relácie** predstavuje kritický útokový vektor v stavových implementáciách MCP, kde neoprávnené osoby získajú a zneužijú legitímne identifikátory relácie na impersonáciu klientov a vykonávanie neoprávnených akcií.

#### **Scenáre útokov a riziká**

- **Injektáž promptov pri únose relácie**: Útočníci s ukradnutými ID relácie vkladajú škodlivé udalosti do serverov zdieľajúcich stav relácie, čo môže vyvolať škodlivé akcie alebo prístup k citlivým dátam  
- **Priama impersonácia**: Ukradnuté ID relácie umožňujú priame volania MCP servera obchádzajúce autentifikáciu, kde sú útočníci považovaní za legitímnych užívateľov  
- **Kompromitované obnoviteľné streamy**: Útočníci môžu predčasne ukončiť požiadavky, čo spôsobí, že legitímni klienti obnovia reláciu s potenciálne škodlivým obsahom  

#### **Bezpečnostné kontroly správy relácie**

**Kritické požiadavky:**  
- **Overovanie autorizácie**: MCP servery, ktoré implementujú autorizáciu, **MUSIA** overovať VŠETKY prichádzajúce požiadavky a **NESMÚ** sa spoliehať na relácie pre autentifikáciu  
- **Bezpečné generovanie relácií**: Používajte kryptograficky bezpečné, nedeterministické ID relácií generované s použitím bezpečných generátorov náhodných čísel  
- **Viazanie na konkrétneho užívateľa**: Viažte ID relácie na užívateľsky špecifické informácie vo formáte `<user_id>:<session_id>` aby sa zabránilo zneužitiu naprieč užívateľmi  
- **Správa životného cyklu relácie**: Implementujte správne vypršanie platnosti, rotáciu a neplatnosť pre obmedzenie časových okien zraniteľnosti  
- **Bezpečnosť prenosu**: Povinné HTTPS pre všetku komunikáciu na zabránenie zachytenia ID relácií  

### Problém „confused deputy“

Problém **confused deputy** nastáva, keď MCP servery fungujú ako autentifikačné proxy medzi klientmi a tretími stranami, čo vytvára príležitosti na obchádzanie autorizácie zneužitím statických ID klientov.

#### **Mechanizmy útokov a riziká**

- **Obchádzanie súhlasu na základe cookie**: Predchádzajúca autentifikácia používateľa vytvára cookies súhlasu, ktoré útočníci zneužívajú cez škodlivé autorizácie s upravenými URI presmerovaní  
- **Krádež autorizačného kódu**: Existujúce súhlasné cookies môžu spôsobiť, že autorizačné servery preskočia obrazovky súhlasu a presmerujú kódy na útočníkmi ovládané koncové body  
- **Neoprávnený prístup k API**: Ukradnuté autorizačné kódy umožňujú výmenu tokenov a impersonáciu užívateľa bez výslovného súhlasu  

#### **Stratégie zmiernenia**

**Povinné kontroly:**  
- **Explicitné požiadavky na súhlas**: Proxy MCP servery používajúce statické ID klientov **MUSIA** získať užívateľský súhlas pre každého dynamicky registrovaného klienta  
- **Implementácia bezpečnosti OAuth 2.1**: Dodržiavať aktuálne bezpečnostné postupy OAuth vrátane PKCE (Proof Key for Code Exchange) pre všetky autorizácie  
- **Prísna validácia klientov**: Implementovať dôkladnú validáciu URI presmerovaní a identifikátorov klientov na zabránenie zneužitiu  

### Zraniteľnosti pri presmerovaní tokenu  

**Presmerovanie tokenu** predstavuje explicitný antipattern, keď MCP servery prijímajú klientské tokeny bez primeranej validácie a odosielajú ich ďalším API, čím porušujú špecifikácie autorizácie MCP.

#### **Bezpečnostné dôsledky**

- **Obchádzanie kontroly**: Priama použitie klientských tokenov API obchádza kritické mechanizmy limitovania, validácie a monitoringu  
- **Poškodenie audítornej stopy**: Tokeny vydané hore v reťazci znemožňujú identifikáciu klienta, čo narušuje schopnosti pre vyšetrovanie incidentov  
- **Proxy-based exfiltrácia dát**: Nevalidované tokeny umožňujú škodlivým aktérom využívať servery ako proxy pre neoprávnený prístup k dátam  
- **Porušenia dôvery hraníc**: Predpoklady dôvery nižších služieb môžu byť narušené, ak nemožno overiť pôvod tokenu  
- **Rozšírenie útokov na viac služieb**: Kompromitované tokeny prijímané naprieč viacerými službami umožňujú bočné pohyby  

#### **Vyžadované bezpečnostné kontroly**

**Nezlučiteľné požiadavky:**  
- **Validácia tokenov**: MCP servery **NESMÚ** prijímať tokeny, ktoré neboli explicitne vydané pre MCP server  
- **Overovanie publika tokenu**: Vždy validujte claim audience tokenu zhodujúci sa s identitou MCP servera  
- **Správny životný cyklus tokenu**: Implementujte krátkodobé prístupové tokeny s bezpečnými rotáciami  


## Bezpečnosť dodávateľského reťazca pre AI systémy

Bezpečnosť dodávateľského reťazca sa rozšírila za tradičné softvérové závislosti a zahŕňa celý AI ekosystém. Moderné implementácie MCP musia dôsledne overovať a monitorovať všetky AI súvisiace komponenty, pretože každý z nich zavádza potenciálne zraniteľnosti, ktoré môžu ohroziť integritu systému.

### Rozšírené komponenty AI dodávateľského reťazca

**Tradičné softvérové závislosti:**  
- Open-source knižnice a rámce  
- Kontajnerové obrazy a základné systémy  
- Nástroje na vývoj a build pipeline  
- Infrastruktúrne komponenty a služby  

**AI-špecifické prvky dodávateľského reťazca:**  
- **Základné modely**: Predtrénované modely od rôznych poskytovateľov vyžadujúce overenie pôvodu  
- **Embedding služby**: Externé služby vektorizácie a sémantického vyhľadávania  
- **Poskytovatelia kontextu**: Zdrojové dáta, databázy znalostí a úložiská dokumentov  
- **API tretích strán**: Externé AI služby, ML pipeline a dátové spracovateľské koncové body  
- **Modelové artefakty**: Váhy, konfigurácie a jemne doladené varianty modelu  
- **Tréningové dátové zdroje**: Datasety používané na tréning a jemné doladenie modelov  

### Komplexná stratégia bezpečnosti dodávateľského reťazca

#### **Overovanie komponentov a dôvera**  
- **Overenie pôvodu**: Overiť zdroj, licencovanie a integritu všetkých AI komponentov pred integráciou  
- **Bezpečnostné posúdenie**: Vykonať skeny zraniteľností a bezpečnostné prehliadky pre modely, dátové zdroje a AI služby  
- **Analýza reputácie**: Vyhodnotiť bezpečnostnú históriu a postupy poskytovateľov AI služieb  
- **Overenie súladu**: Zabezpečiť, že všetky komponenty spĺňajú organizačné bezpečnostné a regulačné požiadavky  

#### **Bezpečné deployment pipeline**  
- **Automatizované CI/CD bezpečnostné skenovanie**: Integrovať skenovanie bezpečnosti do automatizovaných deployment pipeline  
- **Integrita artefaktov**: Implementovať kryptografické overovanie všetkých nasadených artefaktov (kód, modely, konfigurácie)  
- **Postupné nasadenie**: Používať progresívne deployment stratégie s bezpečnostnou validáciou na každom kroku  
- **Dôveryhodné úložiská artefaktov**: Nasadzovať len z overených a bezpečných registračných miest a úložísk artefaktov  

#### **Kontinuálny monitoring a reakcia**  
- **Skenovanie závislostí**: Neustále monitorovanie zraniteľností vo všetkých softvérových a AI závislostiach  
- **Monitoring modelov**: Trvalé hodnotenie správania modelov, výkonových odchýlok a bezpečnostných anomálií  
- **Sledovanie stavu služieb**: Monitorovať dostupnosť, bezpečnostné incidenty a zmeny politík externých AI služieb  
- **Integrácia hrozbovej inteligencie**: Zahrnúť hrozbové feedy špecifické pre AI a bezpečnostné riziká ML  

#### **Riadenie prístupu a princíp minimálnych práv**  
- **Oprávnenia na úrovni komponentov**: Obmedziť prístup k modelom, dátam a službám podľa obchodnej potreby  
- **Správa služobných účtov**: Implementovať dedikované služobné účty s minimálnymi potrebnými oprávneniami  
- **Segmentácia siete**: Izolovať AI komponenty a obmedziť sieťový prístup medzi službami  
- **Kontroly API brány**: Použiť centralizované API brány na kontrolu a monitoring prístupu k externým AI službám  

#### **Reakcia na incidenty a obnova**  
- **Postupy rýchlej reakcie**: Zabepečené procesy na patchovanie alebo výmenu kompromitovaných AI komponentov  
- **Rotácia poverení**: Automatizované systémy na rotáciu tajomstiev, API kľúčov a služobných poverení  
- **Možnosti návratu späť**: Schopnosť rýchlo vrátiť predchádzajúce známe dobré verzie AI komponentov  
- **Obnova po porušení dodávateľského reťazca**: Špecifické postupy na reakciu na kompromitácie upstream AI služieb  

### Microsoft bezpečnostné nástroje a integrácia

**GitHub Advanced Security** poskytuje komplexnú ochranu dodávateľského reťazca vrátane:  
- **Skener tajomstiev**: Automatická detekcia poverení, API kľúčov a tokenov v repozitároch  
- **Skenovanie závislostí**: Posúdenie zraniteľností open-source závislostí a knižníc  
- **Analýza CodeQL**: Statická analýza kódu na bezpečnostné zraniteľnosti a chyby v kódovaní  
- **Prehľad dodávateľského reťazca**: Viditeľnosť zdravia závislostí a bezpečnostného stavu  

**Integrácia Azure DevOps a Azure Repos:**  
- Bezproblémová integrácia bezpečnostného skenovania na Microsoft vývojových platformách  
- Automatizované bezpečnostné kontroly v Azure Pipelines pre AI pracovné záťaže  
- Vynucovanie politík pre bezpečné nasadenie AI komponentov  

**Interné praktiky Microsoftu:**  
Microsoft implementuje rozsiahle bezpečnostné praktiky dodávateľského reťazca naprieč všetkými produktmi. Viac o overených prístupoch nájdete v [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Základné bezpečnostné postupy pre Foundation

Implementácie MCP dedia a rozvíjajú existujúcu bezpečnostnú pozíciu vašej organizácie. Posilnenie základných bezpečnostných postupov významne zlepšuje celkovú bezpečnosť AI systémov a nasadení MCP.

### Základné bezpečnostné princípy

#### **Bezpečné vývojové postupy**  
- **Súlad s OWASP**: Ochrana proti [OWASP Top 10](https://owasp.org/www-project-top-ten/) webovým zraniteľnostiam  
- **AI-špecifické ochrany**: Implementácia kontrol pre [OWASP Top 10 pre LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Bezpečná správa tajomstiev**: Používanie vyhradených vaultov pre tokeny, API kľúče a citlivé konfiguračné dáta  
- **End-to-End šifrovanie**: Implementácia bezpečnej komunikácie naprieč všetkými komponentmi aplikácií a dátovými tokmi  
- **Validácia vstupov**: Prísna validácia všetkých užívateľských vstupov, API parametrov a dátových zdrojov  

#### **Zosilnenie infraštruktúry**  
- **Viacfaktorové overovanie (MFA)**: Povinné MFA pre všetky administratívne a služobné účty  
- **Správa patchov**: Automatické a včasné aktualizácie operačných systémov, rámcov a závislostí  
- **Integrácia poskytovateľov identity**: Centralizovaná správa identity cez podnikových poskytovateľov identity (Microsoft Entra ID, Active Directory)  
- **Segmentácia siete**: Logická izolácia MCP komponentov s cieľom obmedziť riziko bočných pohybov  
- **Princíp minimálnych práv**: Poskytnutie minimálnych potrebných oprávnení pre všetky systémové komponenty a účty  

#### **Monitorovanie a detekcia bezpečnosti**  
- **Komplexné protokolovanie**: Detailné protokolovanie aktivít AI aplikácií vrátane interakcií MCP klient-server  
- **Integrácia SIEM**: Centralizované zariadenie na správu bezpečnostných informácií a udalostí pre detekciu anomálií  
- **Analýza správania**: Monitorovanie napájané AI na odhaľovanie neobvyklých vzorov správania systémov a užívateľov  
- **Hrozbová inteligencia**: Integrácia externých zdrojov hrozbových informácií a indikátorov kompromitácie (IOC)  
- **Reakcia na incidenty**: Dobré definované postupy na detekciu, reakciu a obnovu po bezpečnostných incidentoch  

#### **Architektúra Zero Trust**  
- **Nikdy neveriť, vždy overovať**: Neustále overovanie užívateľov, zariadení a sieťových pripojení  
- **Mikrosegmentácia**: Granulárna sieťová kontrola izolujúca jednotlivé pracovné záťaže a služby  
- **Bezpečnosť orientovaná na identitu**: Bezpečnostné politiky založené na overených identitách namiesto sieťovej polohy  
- **Kontinuálne hodnotenie rizika**: Dynamické vyhodnocovanie bezpečnostného stavu podľa aktuálneho kontextu a správania  
- **Podmienený prístup**: Kontroly prístupu adaptujúce sa podľa rizikových faktorov, polohy a dôveryhodnosti zariadenia  

### Podnikové integračné vzory

#### **Integrácia do bezpečnostného ekosystému Microsoftu**  
- **Microsoft Defender for Cloud**: Komplexné riadenie bezpečnostnej pozície cloudovej infraštruktúry  
- **Azure Sentinel**: Cloud-native SIEM a SOAR schopnosti pre ochranu AI pracovných záťaží  
- **Microsoft Entra ID**: Podniková správa identity a prístupu s politikami podmieneného prístupu  
- **Azure Key Vault**: Centralizovaná správa tajomstiev s podporou hardware security module (HSM)  
- **Microsoft Purview**: Správa údajov a súlad pre AI dátové zdroje a pracovné toky  

#### **Súlad a riadenie**  
- **Zladenie s reguláciami**: Zabezpečiť, aby implementácie MCP spĺňali priemyselné regulačné požiadavky (GDPR, HIPAA, SOC 2)  
- **Klasifikácia dát**: Vhodná kategorizácia a správa citlivých údajov spracovávaných AI systémami  
- **Audítorské stopy**: Komplexné protokolovanie pre regulačný súlad a forenzné vyšetrovanie  
- **Ovládanie ochrany súkromia**: Implementácia princípov ochrany súkromia už v návrhu AI architektúry  
- **Správa zmien**: Formálne procesy pre bezpečnostné revízie zmien AI systémov  

Tieto základné praktiky vytvárajú robustný bezpečnostný základ, ktorý zvyšuje účinnosť MCP-špecifických bezpečnostných kontrol a poskytuje komplexnú ochranu pre aplikácie poháňané AI.
## Kľúčové bezpečnostné poznatky

- **Vrstevný bezpečnostný prístup**: Kombinujte základné bezpečnostné praktiky (bezpečné kódovanie, zásada najmenších privilégií, overovanie dodávateľského reťazca, neustále monitorovanie) s AI-špecifickými kontrolami pre komplexnú ochranu

- **AI-špecifické hrozby**: Systémy MCP čelia jedinečným rizikám vrátane injekcie promptov, otravy nástrojov, prevzatia relácie, problémom zmätku zástupcu, zraniteľnostiam v prenose tokenov a nadmerným oprávneniam, ktoré vyžadujú špecializované opatrenia

- **Vynikajúca autentifikácia a autorizácia**: Implementujte robustnú autentifikáciu pomocou externých poskytovateľov identity (Microsoft Entra ID), vynucujte správnu validáciu tokenov a nikdy neprijímajte tokeny, ktoré neboli výslovne vydané pre váš MCP server

- **Prevencia AI útokov**: Nasadzujte Microsoft Prompt Shields a Azure Content Safety na obranu proti nepriamym útokom injekcie promptov a otrave nástrojov, zároveň overujte metadata nástrojov a monitorujte dynamické zmeny

- **Bezpečnosť relácií a prenosu**: Používajte kryptograficky bezpečné, nedeterministické ID relácií viazané na identity používateľov, implementujte správne riadenie životného cyklu relácií a nikdy nepoužívajte relácie na autentifikáciu

- **Najlepšie praktiky bezpečnosti OAuth**: Predchádzajte útokom typu zmätok zástupcu cez explicitný súhlas používateľa pre dynamicky registrovaných klientov, správnu implementáciu OAuth 2.1 s PKCE a prísnu validáciu URI na presmerovanie

- **Princípy bezpečnosti tokenov**: Vyhnite sa anti-vzorom prenosu tokenov, validujte nároky o publiku tokenu, implementujte krátkodobé tokeny s bezpečnou rotáciou a udržujte jasné hranice dôvery

- **Komplexná bezpečnosť dodávateľského reťazca**: Zaobchádzajte so všetkými komponentmi AI ekosystému (modely, embeddingy, poskytovatelia kontextu, externé API) s rovnakou bezpečnostnou prísnosťou ako s tradičnými softvérovými závislosťami

- **Neustály vývoj**: Buďte v obraze s rýchlo sa vyvíjajúcimi špecifikáciami MCP, prispievajte do bezpečnostných štandardov komunity a udržiavajte adaptívne bezpečnostné postoje s rastom protokolu

- **Integrácia bezpečnosti Microsoftu**: Využívajte komplexný bezpečnostný ekosystém Microsoftu (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pre zvýšenú ochranu pri nasadení MCP

## Kompletné zdroje

### **Oficiálna dokumentácia bezpečnosti MCP**
- [MCP Špecifikácia (aktuálne: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najlepšie bezpečnostné praktiky MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Špecifikácia autorizácie MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub repozitár](https://github.com/modelcontextprotocol)

### **OWASP MCP bezpečnostné zdroje**
- [OWASP MCP Azure bezpečnostný sprievodca](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexný OWASP MCP Top 10 s implementačnými pokynmi pre Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiálne bezpečnostné riziká OWASP MCP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostný tréning pre MCP na Azure

### **Bezpečnostné štandardy a najlepšie praktiky**
- [OAuth 2.0 Najlepšie bezpečnostné praktiky (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 bezpečnosť webových aplikácií](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 pre veľké jazykové modely](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digitálna správa o obrane](https://aka.ms/mddr)

### **Výskum a analýza bezpečnosti AI**
- [Injekcia promptov v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Útoky otravy nástrojov (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP bezpečnostný výskumný sprievodca (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft bezpečnostné riešenia**
- [Microsoft Prompt Shields dokumentácia](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Služba Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID bezpečnosť](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Najlepšie praktiky správy tokenov v Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Sprievodcovia implementáciou a tutoriály**
- [Azure API Management ako MCP autentifikačná brána](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentifikácia s MCP servermi](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Bezpečné uchovávanie tokenov a šifrovanie (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps a bezpečnosť dodávateľského reťazca**
- [Azure DevOps bezpečnosť](https://azure.microsoft.com/products/devops)
- [Azure Repos bezpečnosť](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft cesta k bezpečnosti dodávateľského reťazca](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Ďalšia bezpečnostná dokumentácia**

Pre komplexné bezpečnostné usmernenia, pozrite si tieto špecializované dokumenty v tejto sekcii:

- **[MCP Bezpečnostné najlepšie praktiky 2025](./mcp-security-best-practices-2025.md)** - Kompletné bezpečnostné najlepšie praktiky pre implementácie MCP
- **[Implementácia Azure Content Safety](./azure-content-safety-implementation.md)** - Praktické príklady implementácie integrácie Azure Content Safety  
- **[MCP Bezpečnostné kontroly 2025](./mcp-security-controls-2025.md)** - Najnovšie bezpečnostné kontroly a techniky pre nasadenia MCP
- **[MCP Rýchly prehľad najlepších praktík](./mcp-best-practices.md)** - Rýchly prehľad základných bezpečnostných praktík MCP

### **Praktické bezpečnostné školenia**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komplexný praktický workshop pre zabezpečenie MCP serverov v Azure s progresívnymi kempmi od Base Camp po Summit
- **[OWASP MCP Azure bezpečnostný sprievodca](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenčná architektúra a implementačné pokyny pre všetky riziká OWASP MCP Top 10

---

## Čo ďalej

Ďalej: [Kapitola 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o odmietnutí zodpovednosti**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, majte prosím na pamäti, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo chybné výklady vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->