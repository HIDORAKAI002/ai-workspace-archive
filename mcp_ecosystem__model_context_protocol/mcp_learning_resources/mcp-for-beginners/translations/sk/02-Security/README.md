# MCP bezpečnosť: Komplexná ochrana pre AI systémy

[![Najlepšie praktiky MCP bezpečnosti](../../../translated_images/sk/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknite na obrázok vyššie pre zobrazenie videa tejto lekcie)_

Bezpečnosť je základom dizajnu AI systémov, preto jej dávame prioritu ako druhej sekcii. Toto je v súlade so zásadou Microsoftu **Secure by Design** z [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokol Model Context Protocol (MCP) prináša výkonné nové možnosti pre aplikácie riadené AI a zároveň predstavuje jedinečné bezpečnostné výzvy, ktoré presahujú tradičné softvérové riziká. Systémy MCP čelia etablovaným bezpečnostným problémom (bezpečné kódovanie, princíp najmenších právomocí, bezpečnosť dodávateľského reťazca) a novým špecifickým hrozbám AI, vrátane injekcie promptov, otravy nástrojov, únosu relácií, útokov zmäteného zástupcu, zraniteľností pri prenose tokenov a dynamickej modifikácie schopností.

Táto lekcia skúma najkritickejšie bezpečnostné riziká v implementáciách MCP — pokrýva autentifikáciu, autorizáciu, nadmerné oprávnenia, nepriamu injekciu promptov, bezpečnosť relácií, problémy zmäteného zástupcu, správu tokenov a zraniteľnosti v dodávateľskom reťazci. Naučíte sa implementovateľné kontroly a najlepšie praktiky na zmiernenie týchto rizík s využitím riešení Microsoftu ako Prompt Shields, Azure Content Safety a GitHub Advanced Security na posilnenie nasadenia MCP.

## Ciele učenia

Na konci tejto lekcie budete schopní:

- **Identifikovať MCP-špecifické hrozby**: Rozpoznať jedinečné bezpečnostné riziká v MCP systémoch vrátane injekcie promptov, otravy nástrojov, nadmerných oprávnení, únosu relácií, problémov zmäteného zástupcu, zraniteľností pri prenose tokenov a rizík dodávateľského reťazca
- **Aplikovať bezpečnostné kontroly**: Implementovať efektívne zmiernenia vrátane robustnej autentifikácie, prístupu na princípe najmenších právomocí, bezpečnej správy tokenov, kontrol bezpečnosti relácií a overenia dodávateľského reťazca
- **Využívať bezpečnostné riešenia Microsoftu**: Pochopiť a nasadiť Microsoft Prompt Shields, Azure Content Safety a GitHub Advanced Security pre ochranu MCP záťaže
- **Overovať bezpečnosť nástrojov**: Uvedomiť si dôležitosť validácie metadát nástrojov, monitorovania dynamických zmien a obrany proti nepriamym injekciám promptov
- **Integrácia najlepších praktík**: Kombinovať etablované bezpečnostné základy (bezpečné kódovanie, spevnenie serverov, zero trust) s MCP-špecifickými kontrolami pre komplexnú ochranu

# Architektúra a kontroly MCP bezpečnosti

Moderné implementácie MCP vyžadujú vrstvené bezpečnostné prístupy, ktoré riešia tradičnú softvérovú bezpečnosť aj AI-špecifické hrozby. Rýchlo sa vyvíjajúca špecifikácia MCP neustále zlepšuje svoje bezpečnostné kontroly, umožňujúc lepšiu integráciu s podnikmi a etablovanými najlepšími praktikami.

Výskum z [Microsoft Digital Defense Report](https://aka.ms/mddr) dokazuje, že **98 % nahlásených porušení by bolo zamedzených dôslednou bezpečnostnou hygienou**. Najefektívnejšia ochrana kombinuje základné bezpečnostné praktiky s MCP-špecifickými kontrolami — overené základné bezpečnostné opatrenia zostávajú najvýznamnejším spôsobom znižovania bezpečnostného rizika.

## Súčasná bezpečnostná situácia

> **Poznámka:** Táto informácia odráža bezpečnostné štandardy MCP k **5. februáru 2026**, v súlade so **Špecifikáciou MCP 2025-11-25**. Protokol MCP sa rýchlo vyvíja a budúce implementácie môžu zaviesť nové vzory autentifikácie a vylepšené kontroly. Vždy sa obracajte na aktuálnu [Špecifikáciu MCP](https://spec.modelcontextprotocol.io/), [MCP GitHub repozitár](https://github.com/modelcontextprotocol) a [dokumentáciu najlepších bezpečnostných praktík](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pre najnovšie odporúčania.

> **Výhľad:** kandidát na vydanie `2026-07-28` ešte viac spevní autorizáciu — klienti musia overovať parameter `iss` v autorizovaných odpovediach (RFC 9207), deklarovať OpenID Connect `application_type` počas dynamickej registrácie klienta a previazať registrované poverenia s vydávajúcim autorizujúcim serverom. Kompletný zoznam autorizančných SEPs nájdete v [Čo je nové v MCP: kandidát na vydanie 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## 🏔️ MCP Security Summit Workshop (Sherpa)

Pre **praktické bezpečnostné školenie** odporúčame **MCP Security Summit Workshop** (Sherpa) - komplexná vedená expedícia za zabezpečením MCP serverov v Microsoft Azure.

### Prehľad workshopu

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) poskytuje praktické, implementovateľné školenie bezpečnosti prostredníctvom osvedčenej metodológie "zraniteľné → zneužiť → opraviť → overiť". Počas workshopu budete:

- **Učiť sa na základe rozbíjania vecí**: Zažiť zraniteľnosti priamo tým, že zneužijete zámerne nebezpečné servery
- **Využívať natívnu bezpečnosť Azure**: Použiť Azure Entra ID, Key Vault, API Management a AI Content Safety
- **Dodržiavať princíp obrany v hĺbke**: Pokročiť cez tábory budovaním komplexných vrstiev bezpečnosti
- **Aplikovať štandardy OWASP**: Každá technika sa mapuje na [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Získať produkčný kód**: Odísť s funkčnými, testovanými implementáciami

### Trasa expedície

| Tábor | Zameranie | Kryté riziká OWASP |
|------|----------|-------------------|
| **Základný tábor** | Základy MCP & autentifikačné zraniteľnosti | MCP01, MCP07 |
| **Tábor 1: Identita** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tábor 2: Brána** | API Management, Private Endpoints, správa | MCP02, MCP06, MCP07, MCP09 |
| **Tábor 3: I/O bezpečnosť** | Injekcia promptov, ochrana PII, bezpečnosť obsahu | MCP03, MCP05, MCP06, MCP10 |
| **Tábor 4: Monitorovanie** | Log Analytics, dashboardy, detekcia hrozieb | MCP04, MCP08 |
| **Vrchol** | Red Team / Blue Team integrácia testu | Všetky |

**Začať môžete tu**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 bezpečnostných rizík

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) podrobne uvádza desať najkritickejších bezpečnostných rizík pre MCP implementácie:

| Riziko | Popis | Mitigácia v Azure |
|--------|--------|-----------------|
| **MCP01** | Nesprávna správa tokenov a odhalenie tajomstiev | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalácia právomocí cez Scope Creep | RBAC, podmienený prístup |
| **MCP03** | Otrava nástrojov | Validácia nástrojov, overovanie integrity |
| **MCP04** | Útoky na softvérový dodávateľský reťazec a manipulácia so závislosťami | GitHub Advanced Security, skenovanie závislostí |
| **MCP05** | Injekcia príkazov a exekúcia | Validácia vstupov, sandboxovanie |
| **MCP06** | Podvrhnutie toku zámerov | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nedostatočná autentifikácia a autorizácia | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Nedostatok auditov a telemetrie | Azure Monitor, Application Insights |
| **MCP09** | Tieňové MCP servery | Správa API centra, izolácia siete |
| **MCP10** | Injekcia kontextu a nadmerné zdieľanie | Klasifikácia dát, minimálne vystavenie |

### Evolúcia autentifikácie MCP

Špecifikácia MCP sa výrazne vyvinula vo svojom prístupe k autentifikácii a autorizácii:

- **Pôvodný prístup**: Ranné špecifikácie vyžadovali, aby vývojári implementovali vlastné autentifikačné servery, pričom MCP servery fungovali ako OAuth 2.0 server autorizácie, priamo riadiaci autentifikáciu používateľov
- **Súčasný štandard (2025-11-25)**: Aktualizovaná špecifikácia povoľuje MCP serverom delegovať autentifikáciu externým poskytovateľom identity (napr. Microsoft Entra ID), čím sa zlepšuje bezpečnostná pozícia a znižuje komplexnosť implementácie
- **Zabezpečenie transportnej vrstvy**: Vylepšená podpora pre bezpečné transportné mechanizmy s vhodnými vzormi autentifikácie pre lokálne (STDIO) aj vzdialené (Streamable HTTP) pripojenia

## Bezpečnosť autentifikácie a autorizácie

### Súčasné bezpečnostné výzvy

Moderné implementácie MCP čelia niekoľkým výzvam v autentifikácii a autorizácii:

### Riziká a hrozby

- **Nesprávne nakonfigurovaná logika autorizácie**: Chybná autorizácia v MCP serveroch môže odhaliť citlivé údaje a nesprávne aplikovať kontroly prístupu
- **Kompropitácia OAuth tokenov**: Krádež tokenov lokálneho MCP servera umožňuje útočníkom predstierať servery a pristupovať k downstream službám
- **Zraniteľnosti prenesenia tokenov**: Nevhodná manipulácia s tokenmi vytvára obchádzky bezpečnostných kontrol a medzery v zodpovednosti
- **Nadmerné oprávnenia**: MCP servery s príliš širokými právami porušujú princíp najmenších právomocí a rozširujú povrch útoku

#### Prenos tokenov: Kritický anti-vzorec

**Prenos tokenov je explicitne zakázaný** v súčasnej MCP autorizácii kvôli vážnym bezpečnostným dôsledkom:

##### Obchádzanie bezpečnostných kontrol
- MCP servery a downstream API implementujú kľúčové bezpečnostné kontroly (limitovanie rýchlosti, validácia požiadaviek, monitorovanie prevádzky), ktoré závisia na správnej validácii tokenov
- Priame použitie tokenov klientom voči API obchádza tieto kritické ochrany a narušuje bezpečnostnú architektúru

##### Problémy so zodpovednosťou a auditom  
- MCP servery nedokážu rozlíšiť klientov používajúcich tokeny vydané upstream, čo narušuje auditovateľnosť
- Logy downstream zdrojových serverov zobrazujú nesprávne pôvody požiadaviek namiesto skutočných MCP serverových sprostredkovateľov
- Vyšetrovanie incidentov a dodržiavanie auditov je výrazne zložitejšie

##### Riziká exfiltrácie dát
- Neoverené tokenové nároky umožňujú škodlivým aktérom so skradnutými tokenmi používať MCP servery ako proxy na exfiltráciu dát
- Porušenia hraníc dôvery umožňujú neautorizované vzory prístupu, ktoré obchádzajú zamýšľané bezpečnostné kontroly

##### Viacnásobné vektorové útoky cez služby
- Kompromitované tokeny akceptované viacerými službami umožňujú laterálny pohyb naprieč prepojenými systémami
- Predpoklady dôvery medzi službami môžu byť porušené, keď nemožno overiť pôvod tokenov

### Bezpečnostné kontroly a zmiernenia

**Kritické bezpečnostné požiadavky:**

> **POVINNÉ**: MCP servery **NESMÚ** akceptovať žiadne tokeny, ktoré neboli explicitne vydané pre MCP server

#### Kontroly autentifikácie a autorizácie

- **Dôkladná kontrola autorizácie**: Vykonávajte rozsiahle audity autorizácie MCP serverov, aby mohli pristupovať len zamýšľaní používatelia a klienti ku citlivým zdrojom
  - **Sprievodca implementáciou**: [Azure API Management ako autentifikačná brána pre MCP servery](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrácia identity**: [Použitie Microsoft Entra ID pre autentifikáciu MCP servera](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Bezpečná správa tokenov**: Implementujte [Microsoftove najlepšie praktiky na validáciu tokenov a ich životný cyklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Overujte, či nároky na publikum tokenu zodpovedajú identite MCP servera
  - Implementujte správne politiky rotácie a platnosti tokenu
  - Predchádzajte opakovaným útokom a neoprávnenému používaniu tokenov

- **Chránené uloženie tokenov**: Bezpečné ukladanie tokenov s šifrovaním v pokoji i počas prenosu
  - **Najlepšie praktiky**: [Pokyny k bezpečnému ukladaniu a šifrovaniu tokenov](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementácia kontroly prístupu

- **Princíp najmenších právomocí**: Udeľujte MCP serverom len minimálne potrebné oprávnenia pre zamýšľanú funkcionalitu
  - Pravidelné revízie a aktualizácie oprávnení na zabránenie rozširovania právomocí
  - **Dokumentácia Microsoftu**: [Bezpečný prístup na základe najmenších právomocí](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Riadenie prístupu na základe rolí (RBAC)**: Implementujte detailné priradenie rolí
  - Obmedzte role tesne na konkrétne zdroje a akcie
  - Vyhnite sa širokým alebo zbytočným oprávneniam rozširujúcim útočný povrch

- **Kontinuálne monitorovanie oprávnení**: Implementujte priebežný audit a monitorovanie prístupu
  - Sledujte vzory používania oprávnení kvôli anomáliám
  - Promptne riešte nadmerné alebo nepoužívané práva

## AI-špecifické bezpečnostné hrozby

### Injekcia promptov a útoky na manipuláciu nástrojov

Moderné implementácie MCP čelia sofistikovaným AI-špecifickým vektorom útoku, ktoré tradičné bezpečnostné opatrenia nedokážu plne riešiť:

#### **Nepriama injekcia promptov (Cross-Domain Prompt Injection)**

**Nepriama injekcia promptov** predstavuje jednu z najkritickejších zraniteľností v AI systémoch s MCP. Útočníci vkladajú škodlivé inštrukcie do externého obsahu — dokumentov, webových stránok, e-mailov alebo dátových zdrojov — ktoré AI systémy následne spracujú ako legitímne príkazy.

**Scenáre útokov:**
- **Injekcia cez dokumenty**: Škodlivé inštrukcie skryté v spracovaných dokumentoch spúšťajú nežiaduce AI akcie
- **Zneužitie webového obsahu**: Kompromitované webové stránky obsahujúce vložené prompty manipulujúce správanie AI pri scrawlovaní
- **Útoky cez e-mail**: Škodlivé prompty v e-mailoch, ktoré spôsobujú únik informácií alebo neautorizované akcie AI asistentov
- **Kontaminácia dátových zdrojov**: Kompromitované databázy alebo API poskytujúce zavádzajúci obsah AI systémom

**Reálny dopad**: Tieto útoky môžu viesť k exfiltrácii dát, porušeniu súkromia, generovaniu škodlivého obsahu a manipulácii s používateľskými interakciami. Pre podrobnú analýzu viď [Prompt Injection v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram útoku injekcie promptov](../../../translated_images/sk/prompt-injection.ed9fbfde297ca877.webp)

#### **Útoky otravy nástrojov**

**Otrava nástrojov** cielená na metadáta definujúce MCP nástroje, zneužíva spôsob, akým LLM interpretujú popisy nástrojov a parametre na rozhodovanie o exekúcii.

**Mechanizmy útoku:**
- **Manipulácia s metadátami**: Útočníci vkladajú škodlivé inštrukcie do popisov nástrojov, definícií parametrov alebo príkladov použitia
- **Neviditeľné inštrukcie**: Skryté prompty v metadátach nástrojov, ktoré spracúvajú AI modely, ale sú neviditeľné pre ľudských používateľov
- **Dynamické zmeny nástrojov („Rug Pulls“) **: Nástroje schválené používateľmi sú neskôr modifikované na škodlivé akcie bez vedomia používateľov
- **Injekcia parametrov**: Škodlivý obsah vložený do schém parametrov nástrojov ovplyvňuje správanie modelu


**Riziká hostovaných serverov**: Vzdialené MCP servery predstavujú zvýšené riziká, pretože definície nástrojov môžu byť aktualizované po počiatočnom súhlase používateľa, čo vytvára scenáre, kde sa predtým bezpečné nástroje stávajú škodlivými. Pre komplexnú analýzu pozrite si [Útoky na otrávenie nástrojov (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram útoku injekcie nástroja](../../../translated_images/sk/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ďalšie vektory útokov AI**

- **Prienikové injekcie naprieč doménami (XPIA)**: Sofistikované útoky, ktoré využívajú obsah z viacerých domén na obídenie bezpečnostných kontrol
- **Dynamická modifikácia schopností**: Zmeny schopností nástrojov v reálnom čase, ktoré unikajú počiatočnému bezpečnostnému vyhodnoteniu
- **Otrávenie kontextového okna**: Útoky, ktoré manipulujú s veľkými kontextovými oknami na skrytie škodlivých inštrukcií
- **Útoky zmätku modelu**: Využitie limitácií modelu na vytvorenie nepredvídateľného alebo nebezpečného správania


### Dopad bezpečnostných rizík AI

**Následky s vysokým dopadom:**
- **Únik dát**: Neoprávnený prístup a krádež citlivých podnikových alebo osobných údajov
- **Porušenie súkromia**: Zverejnenie osobne identifikovateľných informácií (PII) a dôverných obchodných údajov  
- **Manipulácia so systémom**: Neplánované modifikácie kritických systémov a pracovných tokov
- **Krádež poverení**: Ohrozenie autentifikačných tokenov a prihlasovacích údajov služby
- **Bočné pohyby**: Využitie kompromitovaných AI systémov ako odrazových mostíkov pre širšie sieťové útoky

### Bezpečnostné riešenia Microsoft AI

#### **AI prompt shieldy: Pokročilá ochrana proti injekčným útokom**

Microsoft **AI Prompt Shields** poskytujú komplexnú obranu proti priamym a nepriamym útokom injekcie promptov cez viacero bezpečnostných vrstiev:

##### **Základné ochranné mechanizmy:**

1. **Pokročilá detekcia a filtrovanie**
   - Algoritmy strojového učenia a NLP techniky detekujú škodlivé inštrukcie v externom obsahu
   - Analýza v reálnom čase dokumentov, webových stránok, e-mailov a dátových zdrojov pre zabudované hrozby
   - Kontextové rozlišovanie legitímnych a škodlivých prompt vzorov

2. **Techniky zvýraznenia**  
   - Rozlišuje medzi dôveryhodnými systémovými inštrukciami a potenciálne kompromitovanými externými vstupmi
   - Metódy transformácie textu, ktoré zvyšujú relevantnosť modelu pri izolovaní škodlivého obsahu
   - Pomáha AI systémom udržať správnu hierarchiu inštrukcií a ignorovať vložené príkazy

3. **Systémy oddeľovačov a označovania dát**
   - Explicitný delimitér medzi dôveryhodnými systémovými správami a externým textom vstupu
   - Špeciálne značky vyznačujúce hranice medzi dôveryhodnými a nedôveryhodnými dátovými zdrojmi
   - Jasné oddelenie zabraňuje zmätku v inštrukciách a neoprávnenému vykonaniu príkazov

4. **Kontinuálne hrozbové spravodajstvo**
   - Microsoft nepretržite monitoruje vznikajúce vzory útokov a aktualizuje ochrany
   - Proaktívne vyhľadávanie hrozieb pre nové injekčné techniky a vektory útokov
   - Pravidelné aktualizácie bezpečnostných modelov pre udržanie účinnosti proti vyvíjajúcim sa hrozbám

5. **Integrácia Azure Content Safety**
   - Súčasť komplexnej sady Azure AI Content Safety
   - Dodatočná detekcia pokusov o jailbreak, škodlivého obsahu a porušení bezpečnostných politík
   - Jednotné bezpečnostné kontroly naprieč AI aplikačnými komponentmi

**Implementačné zdroje**: [Dokumentácia Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Ochrana Microsoft Prompt Shields](../../../translated_images/sk/prompt-shield.ff5b95be76e9c78c.webp)


## Pokročilé bezpečnostné hrozby MCP

### Zraniteľnosti únosu relácie

**Únos relácie** predstavuje kritický vektor útoku v stavových implementáciách MCP, kde neoprávnené subjekty získajú a zneužijú legitímne identifikátory relácií na impersonáciu klientov a vykonávanie neoprávnených akcií.

#### **Scenáre útokov a riziká**

- **Injekcia promptu únosu relácie**: Útočníci so skradnutými ID relácií vpravujú škodlivé udalosti do serverov zdieľajúcich stav relácie, čo môže vyvolať škodlivé akcie alebo prístup k citlivým údajom
- **Priama impersonácia**: Skorumpované ID relácie umožňujú priame volania MCP servera, ktoré obchádzajú autentifikáciu a považujú útočníkov za legitímnych používateľov
- **Kompromitované rekurzívne streamy**: Útočníci môžu predčasne ukončiť požiadavky, čo spôsobí, že legitímni klienti pokračujú potenciálne s škodlivým obsahom

#### **Bezpečnostné kontroly pre správu relácií**

**Kritické požiadavky:**
- **Overovanie autorizácie**: MCP servery implementujúce autorizáciu **MUSIA** overovať VŠETKY prichádzajúce požiadavky a **NESMÚ** sa spoliehať na relácie pre autentifikáciu
- **Bezpečná generácia relácií**: Používajte kryptograficky bezpečné, nedeterministické ID relácií generované so zabezpečenými náhodnými generátormi čísiel
- **Väzba na používateľa**: Väzba ID relácie na používateľské špecifické informácie formátmi ako `<user_id>:<session_id>`, aby sa zabránilo zneužitiu medzi používateľmi
- **Správa životného cyklu relácie**: Implementujte správne vypršanie platnosti, rotáciu a neplatnosť na obmedzenie zraniteľných okien
- **Bezpečnosť prenosu**: Povinné HTTPS pre všetku komunikáciu na zabránenie odpočúvania ID relácie

### Problém zmateného sprostredkovateľa

**Problém zmateného sprostredkovateľa** nastáva, keď MCP servery pôsobia ako autentifikačné proxy medzi klientmi a službami tretích strán, čím vznikajú príležitosti na obchádzanie autorizácie prostredníctvom zneužitia statických ID klientov.

#### **Mechanika útokov a riziká**

- **Obídenie súhlasu založené na cookie**: Predchádzajúca autentifikácia používateľa vytvára súhlasné cookies, ktoré útočníci zneužívajú prostredníctvom škodlivých požiadaviek autorizácie s upravenými presmerovacími URI
- **Krádež autorizačných kódov**: Existujúce súhlasné cookies môžu spôsobiť, že autorizačné servery preskočia obrazovky súhlasu, presmerujúc kódy na útočníkom kontrolované koncové body  
- **Neoprávnený prístup k API**: Ukradnuté autorizačné kódy umožňujú výmenu tokenov a impersonáciu používateľov bez výslovného súhlasu

#### **Strategie zmiernenia**

**Povinné kontroly:**
- **Explicitné požiadavky na súhlas**: MCP proxy servery používajúce statické ID klientov **MUSIA** získať súhlas používateľa pre každého dynamicky registrovaného klienta
- **Implementácia bezpečnosti OAuth 2.1**: Dodržiavať aktuálne bezpečnostné najlepšie praktiky OAuth vrátane PKCE (Proof Key for Code Exchange) pre všetky autorizačné požiadavky
- **Prísna validácia klienta**: Implementovať dôkladnú validáciu presmerovacích URI a identifikátorov klientov na zabránenie zneužitia

### Zraniteľnosti pri prenose tokenov  

**Prenos tokenov** predstavuje explicitný anti-vzor, kde MCP servery prijímajú klientské tokeny bez riadneho overenia a posielajú ich do downstream API, čím porušujú špecifikácie autorizácie MCP.

#### **Bezpečnostné dôsledky**

- **Obídenie kontroly**: Priame použitie tokenov klienta voči API obchádza kritické obmedzenia rýchlosti, validáciu a monitorovacie kontroly
- **Degradácia audit trailu**: Tokeny vydané upstream znemožňujú identifikáciu klienta, čím narúšajú schopnosť vyšetrovania incidentov
- **Proxy exfiltrácia dát**: Nevalidované tokeny umožňujú škodlivým aktérom využívať servery ako proxy pre neoprávnený prístup k dátam
- **Porušenia dôveryhodných hraníc**: Dôverovacie predpoklady downstream služieb môžu byť porušené, keď pôvod tokenov nemožno overiť
- **Rozšírenie útokov cez viaceré služby**: Kompromitované tokeny akceptované v viacerých službách umožňujú laterálne pohyby

#### **Povinné bezpečnostné kontroly**

**Neodvolateľné požiadavky:**
- **Validácia tokenov**: MCP servery **NESMÚ** prijímať tokeny, ktoré neboli explicitne vydané pre MCP server
- **Overenie publika tokenu**: Vždy overovať, či audience tokenu zodpovedá identite MCP servera
- **Správny životný cyklus tokenu**: Implementovať krátkodobé prístupové tokeny s bezpečnými praktikami rotácie


## Bezpečnosť dodávateľského reťazca pre AI systémy

Bezpečnosť dodávateľského reťazca sa vyvinula za hranice tradičných softvérových závislostí a zahŕňa celý ekosystém AI. Moderné implementácie MCP musia prísne overovať a monitorovať všetky AI súvisiace komponenty, keďže každý predstavuje potenciálne zraniteľnosti, ktoré môžu ohroziť integritu systému.

### Rozšírené komponenty AI dodávateľského reťazca

**Tradičné softvérové závislosti:**
- Open-source knižnice a frameworky
- Kontajnerové obrazy a základné systémy  
- Nástroje na vývoj a build pipeline
- Infrastruktúrne komponenty a služby

**Špecifické AI prvky dodávateľského reťazca:**
- **Základné modely**: Predtrénované modely od rôznych poskytovateľov vyžadujúce overenie pôvodu
- **Služby embedovania**: Externé služby vektorovania a sémantického vyhľadávania
- **Poskytovatelia kontextu**: Zdroje dát, znalostné bázy a dokumentové repozitáre  
- **API tretích strán**: Externé AI služby, ML pipeline a endpointy na spracovanie dát
- **Modelové artefakty**: Váhy, konfigurácie a jemne ladené varianty modelov
- **Zdrojové dáta na tréning**: Dataset-y používané na trénovanie a jemné ladenie modelov

### Komplexná stratégia bezpečnosti dodávateľského reťazca

#### **Overovanie komponentov a dôvera**
- **Validácia pôvodu**: Overiť pôvod, licencovanie a integritu všetkých AI komponentov pred integráciou
- **Bezpečnostné hodnotenie**: Vykonávať skenovanie zraniteľností a bezpečnostné audity pre modely, zdroje dát a AI služby
- **Analýza reputácie**: Hodnotiť bezpečnostnú históriu a praktiky poskytovateľov AI služieb
- **Overovanie zhody**: Zabezpečiť, že všetky komponenty spĺňajú organizačné bezpečnostné a regulačné požiadavky

#### **Bezpečné deployment pipeline**  
- **Automatizované bezpečnostné CI/CD**: Integrovať bezpečnostné skenovanie do všetkých fáz automatizovaných deployment pipeline
- **Integrita artefaktov**: Implementovať kryptografické overovanie pre všetky nasadzované artefakty (kód, modely, konfigurácie)
- **Postupné nasadzovanie**: Používať progresívne stratégie nasadzovania s bezpečnostnou validáciou na každom kroku
- **Dôveryhodné repozitáre artefaktov**: Nasadzovať iba z overených, bezpečných registri a repozitárov

#### **Kontinuálny monitoring a reakcia**
- **Skenovanie závislostí**: Neustále monitorovanie zraniteľností všetkých softvérových a AI komponentových závislostí
- **Monitorovanie modelov**: Kontinuálne hodnotenie správania modelu, posunu výkonu a bezpečnostných anomálií
- **Sledovanie stavu služieb**: Monitorovanie dostupnosti externých AI služieb, bezpečnostných incidentov a zmien v politikách
- **Integrácia hrozbového spravodajstva**: Zahrnutie tokov hrozieb špecifických pre AI a ML bezpečnostné riziká

#### **Kontrola prístupu a princíp minimálnych práv**
- **Povolenia na úrovni komponentov**: Obmedziť prístup k modelom, dátam a službám na základe biznisovej potreby
- **Správa servisných účtov**: Implementovať dedikované servisné účty s minimálnymi potrebnými povoleniami
- **Segmentácia siete**: Izolovať AI komponenty a obmedziť sieťový prístup medzi službami
- **Kontroly API brán**: Používať centralizované API brány na riadenie a monitorovanie prístupu k externým AI službám

#### **Reakcia na incidenty a obnova**
- **Rýchle postupy reakcie**: Zavedené procesy na ošetrenie alebo výmenu kompromitovaných AI komponentov
- **Rotácia poverení**: Automatizované systémy na rotovanie tajomstiev, API kľúčov a prihlasovacích údajov služieb
- **Možnosti rollbacku**: Schopnosť rýchlo vrátiť späť na predchádzajúce známe dobré verzie AI komponentov
- **Obnova po narušení dodávateľského reťazca**: Špecifické postupy pre reakciu na kompromitácie upstream AI služieb

### Microsoft bezpečnostné nástroje a integrácia

**GitHub Advanced Security** poskytuje komplexnú ochranu dodávateľského reťazca vrátane:
- **Skenovanie tajomstiev**: Automatická detekcia poverení, API kľúčov a tokenov v repozitároch
- **Skenovanie závislostí**: Hodnotenie zraniteľností open-source závislostí a knižníc
- **Analýza CodeQL**: Statická analýza kódu pre bezpečnostné zraniteľnosti a problémy v kódovaní
- **Prehľady dodávateľského reťazca**: Viditeľnosť zdravia závislostí a bezpečnostného stavu

**Integrácia Azure DevOps & Azure Repos:**
- Bezproblémová integrácia bezpečnostného skenovania naprieč vývojovými platformami Microsoft
- Automatizované bezpečnostné kontroly v Azure Pipelines pre AI záťaže
- Vynucovanie pravidiel pre bezpečné nasadenie AI komponentov

**Interné praktiky Microsoft:**
Microsoft implementuje rozsiahle bezpečnostné praktiky dodávateľského reťazca vo všetkých produktoch. Viac o osvedčených prístupoch sa dozviete v [Ceste k zabezpečeniu softvérového dodávateľského reťazca v Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Základné bezpečnostné osvedčené postupy

Implementácie MCP dedia a stavajú na existujúcom bezpečnostnom postoji vašej organizácie. Posilnenie základných bezpečnostných praktík významne zvyšuje celkovú bezpečnosť AI systémov a nasadení MCP.

### Základné bezpečnostné princípy

#### **Bezpečné vývojové praktiky**
- **Súlad s OWASP**: Ochrana pred [10 najväčšími zraniteľnosťami OWASP](https://owasp.org/www-project-top-ten/) webových aplikácií
- **Ochrana špecifická pre AI**: Implementácia kontrol pre [10 najväčších hrozieb OWASP pre LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Bezpečné spravovanie tajomstiev**: Používanie vyhradených úložísk pre tokeny, API kľúče a citlivé konfiguračné údaje
- **End-to-End šifrovanie**: Implementácia bezpečnej komunikácie vo všetkých aplikačných komponentoch a dátových tokoch
- **Validácia vstupov**: Dôkladná validácia všetkých používateľských vstupov, API parametrov a zdrojov dát

#### **Spevňovanie infraštruktúry**
- **Viacfaktorová autentifikácia**: Povinná MFA pre všetky administrátorské a servisné účty
- **Správa záplat**: Automatizované, včasné záplatovanie operačných systémov, frameworkov a závislostí  
- **Integrácia poskytovateľov identity**: Centralizovaná správa identity cez podnikových poskytovateľov identít (Microsoft Entra ID, Active Directory)
- **Segmentácia siete**: Logická izolácia MCP komponentov na obmedzenie potenciálu laterálneho pohybu
- **Princíp minimálnych práv**: Minimálne potrebné povolenia pre všetky systémové komponenty a účty

#### **Monitorovanie a detekcia bezpečnosti**
- **Kompletné zaznamenávanie**: Detailné logovanie činností AI aplikácie vrátane interakcií MCP klient-server
- **Integrácia so SIEM**: Centralizovaná správa bezpečnostných informácií a udalostí pre detekciu anomálií
- **Behaviorálna analytika**: AI-poháňané monitorovanie na zachytenie nezvyčajných vzorov v správaní systému a používateľov
- **Hrozbové spravodajstvo**: Integrácia externých zdrojov hrozieb a indikátorov kompromitácie (IOC)
- **Reakcia na incidenty**: Dobré definované postupy pre detekciu, reakciu a obnovu z bezpečnostných incidentov

#### **Architektúra Zero Trust**
- **Nikdy never, vždy overuj**: Neustále overovanie používateľov, zariadení a sieťových pripojení
- **Mikrosegmentácia**: Granulárne sieťové kontroly izolujúce jednotlivé záťaže a služby
- **Bezpečnosť zameraná na identitu**: Bezpečnostné politiky založené na overených identitách namiesto sieťovej lokácie
- **Kontinuálne hodnotenie rizika**: Dynamické hodnotenie bezpečnostného postoja na základe aktuálneho kontextu a správania
- **Podmienený prístup**: Prístupové kontroly prispôsobujúce sa na základe rizikových faktorov, lokácie a dôvery zariadenia

### Vzory podnikovej integrácie

#### **Integrácia do bezpečnostného ekosystému Microsoft**
- **Microsoft Defender for Cloud**: Komplexné riadenie postavenia bezpečnosti cloud prostredia
- **Azure Sentinel**: Cloud-native SIEM a SOAR funkcionality na ochranu AI záťaží
- **Microsoft Entra ID**: Podniková správa identity a prístupu s podmienenými prístupovými politikami
- **Azure Key Vault**: Centralizované spravovanie tajomstiev s podporou hardvérového bezpečnostného modulu (HSM)
- **Microsoft Purview**: Riadenie dát a súlad s predpismi pre AI zdroje dát a pracovné toky

#### **Zhoda a správa**
- **Zladenie s predpismi**: Zabezpečiť, že implementácie MCP spĺňajú priemyselné požiadavky na súlad (GDPR, HIPAA, SOC 2)

- **Klasifikácia údajov**: Správna kategorizácia a spracovanie citlivých údajov spracovávaných AI systémami
- **Auditné stopy**: Komplexné zaznamenávanie pre regulačnú súladnosť a forenzné vyšetrovanie
- **Ochrana súkromia**: Implementácia princípov ochrany súkromia už v návrhu architektúry AI systému
- **Riadenie zmien**: Formálne procesy pre bezpečnostné revízie modifikácií AI systému

Tieto základné praktiky vytvárajú pevný bezpečnostný základ, ktorý zvyšuje účinnosť bezpečnostných opatrení špecifických pre MCP a poskytuje komplexnú ochranu pre aplikácie poháňané AI.

## Kľúčové bezpečnostné poznatky

- **Viacvrstvový bezpečnostný prístup**: Kombinujte základné bezpečnostné praktiky (bezpečné kódovanie, princíp najmenších práv, overenie dodávateľského reťazca, nepretržité monitorovanie) s kontrolami špecifickými pre AI pre komplexnú ochranu

- **Špecifické hrozby pre AI**: Systémy MCP čelia jedinečným rizikám vrátane injekcie promptov, otravy nástrojov, prevzatia relácie, problémov zmätknutého zástupcu, zraniteľností pri prenose tokenov a nadmerných oprávnení, ktoré vyžadujú špecializované zmiernenia

- **Excelentná autentifikácia a autorizácia**: Zaviesť robustnú autentifikáciu pomocou externých poskytovateľov identity (Microsoft Entra ID), presadzovať správnu validáciu tokenov a nikdy neprijímať tokeny nevydané explicitne pre váš MCP server

- **Prevencia útokov na AI**: Nasadiť Microsoft Prompt Shields a Azure Content Safety na obranu proti nepriamym útokom injekcie promptov a otravy nástrojov, pričom overovať metaúdaje nástrojov a monitorovať dynamické zmeny

- **Bezpečnosť relácií a prenosov**: Používať kryptograficky bezpečné, nedeterministické ID relácie viazané na identity používateľov, implementovať správu životného cyklu relácie a nikdy nepoužívať relácie na autentifikáciu

- **Najlepšie praktiky bezpečnosti OAuth**: Predchádzať útokom zmätknutého zástupcu prostredníctvom explicitného súhlasu používateľa pre dynamicky registrovaných klientov, správnej implementácie OAuth 2.1 s PKCE a prísnej validácie URI pre presmerovanie  

- **Zásady bezpečnosti tokenov**: Vyhnúť sa antipatternom prenášania tokenov, validovať platiteľov tokenov, implementovať krátkodobé tokeny so zabezpečenou rotáciou a udržiavať jasné hranice dôvery

- **Komplexná bezpečnosť dodávateľského reťazca**: Zaobchádzať so všetkými komponentmi AI ekosystému (modely, embeddings, poskytovatelia kontextu, externé API) so rovnakou bezpečnostnou prísnosťou ako s tradičnými softvérovými závislosťami

- **Nepretržitý vývoj**: Byť aktuálny s rýchlo sa vyvíjajúcimi špecifikáciami MCP, prispievať k štandardom bezpečnostnej komunity a udržiavať adaptívne bezpečnostné postoje s rastúcim protokolom

- **Integrácia bezpečnosti Microsoftu**: Využiť rozsiahly bezpečnostný ekosystém Microsoftu (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pre zvýšenú ochranu nasadenia MCP

## Komplexné zdroje

### **Oficiálna dokumentácia MCP bezpečnosti**
- [Špecifikácia MCP (aktuálna: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najlepšie bezpečnostné praktiky MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Špecifikácia autorizácie MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub úložisko](https://github.com/modelcontextprotocol)

### **OWASP MCP bezpečnostné zdroje**
- [OWASP MCP Azure bezpečnostný sprievodca](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexný OWASP MCP Top 10 s návodmi na implementáciu v Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiálne bezpečnostné riziká OWASP MCP
- [MCP Security Summit workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostný tréning pre MCP na Azure

### **Bezpečnostné štandardy a najlepšie praktiky**
- [Najlepšie praktiky bezpečnosti OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 pre bezpečnosť webových aplikácií](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 pre veľké jazykové modely](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digitálna obranná správa](https://aka.ms/mddr)

### **Výskum a analýza bezpečnosti AI**
- [Injekcia promptov v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Útoky otravy nástrojov (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP bezpečnostný výskumný brífing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft bezpečnostné riešenia**
- [Dokumentácia Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Služba Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID bezpečnosť](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Najlepšie praktiky správy tokenov v Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementačné príručky a návody**
- [Azure API Management ako MCP autentifikačná brána](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentifikácia s MCP servermi](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Bezpečné ukladanie a šifrovanie tokenov (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps a bezpečnosť dodávateľského reťazca**
- [Azure DevOps bezpečnosť](https://azure.microsoft.com/products/devops)
- [Azure Repos bezpečnosť](https://azure.microsoft.com/products/devops/repos/)
- [Bezpečnostná cesta Microsoft dodávateľského reťazca](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dodatočná bezpečnostná dokumentácia**

Pre komplexné bezpečnostné usmernenia sa pozrite do týchto špecializovaných dokumentov v tejto sekcii:

- **[Najlepšie bezpečnostné praktiky MCP 2025](./mcp-security-best-practices-2025.md)** - Kompletné bezpečnostné najlepšie praktiky pre implementácie MCP
- **[Implementácia Azure Content Safety](./azure-content-safety-implementation.md)** - Praktické príklady implementácie pre integráciu Azure Content Safety  
- **[MCP bezpečnostné kontrolné mechanizmy 2025](./mcp-security-controls-2025.md)** - Najnovšie bezpečnostné kontroly a techniky pre nasadenia MCP
- **[MCP najlepšie praktiky stručný prehľad](./mcp-best-practices.md)** - Rýchly referenčný prehľad základných bezpečnostných praktík MCP
- **[BlueHat 2026: Zabezpečenie budúcnosti AI: Zabezpečenie MCP s obrannými vzormi v hĺbke](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Obranné vzory z Microsoft Security Response Center (MSRC)

### **Praktický bezpečnostný tréning**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komplexný praktický workshop zabezpečenia MCP serverov na Azure s progresívnymi stupňami od Base Camp po Summit
- **[OWASP MCP Azure bezpečnostný sprievodca](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenčná architektúra a implementačné návod pre všetky riziká OWASP MCP Top 10

---

## Čo ďalej

Ďalej: [Kapitola 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->