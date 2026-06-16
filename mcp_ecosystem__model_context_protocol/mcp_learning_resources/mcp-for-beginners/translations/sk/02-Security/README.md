# MCP Security: Komplexná ochrana pre AI systémy

[![MCP Security Best Practices](../../../translated_images/sk/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknite na obrázok vyššie pre zobrazenie videa tejto lekcie)_

Bezpečnosť je základom návrhu AI systémov, preto jej venujeme pozornosť ako druhej sekcii. Toto korešponduje s princípom **Secure by Design** spoločnosti Microsoft z [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokol Model Context Protocol (MCP) prináša silné nové schopnosti pre aplikácie poháňané AI, pričom zavádza jedinečné bezpečnostné výzvy, ktoré presahujú tradičné softvérové riziká. MCP systémy čelia aj existujúcim bezpečnostným obavám (bezpečné kódovanie, princíp najmenších oprávnení, bezpečnosť dodávateľského reťazca), ako aj novým špecifickým hrozbám AI vrátane prompt injection, otravy nástrojov, hijackingu relácií, útokov confused deputy, zraniteľností token passthrough a dynamických zmien schopností.

Táto lekcia skúma najkritickejšie bezpečnostné riziká v implementáciách MCP — pokrýva autentifikáciu, autorizáciu, nadmerné oprávnenia, nepriamy prompt injection, bezpečnosť relácií, problémy confused deputy, správu tokenov a zraniteľnosti dodávateľského reťazca. Naučíte sa konkrétne kontroly a osvedčené postupy na zmiernenie týchto rizík s využitím riešení Microsoftu ako Prompt Shields, Azure Content Safety a GitHub Advanced Security na posilnenie vašej MCP implementácie.

## Výukové ciele

Na konci tejto lekcie budete schopní:

- **Identifikovať MCP-špecifické hrozby**: Rozpoznať jedinečné bezpečnostné riziká v MCP systémoch vrátane prompt injection, otravy nástrojov, nadmerných oprávnení, hijackingu relácií, problémov confused deputy, zraniteľností token passthrough a rizík dodávateľského reťazca
- **Použiť bezpečnostné kontroly**: Implementovať účinné zmiernenia vrátane robustnej autentifikácie, prístupu na základe princípu najmenších oprávnení, bezpečnej správy tokenov, bezpečnostných kontrol relácií a overovania dodávateľského reťazca
- **Využiť riešenia Microsoft Security**: Pochopiť a nasadiť Microsoft Prompt Shields, Azure Content Safety a GitHub Advanced Security pre ochranu MCP záťaží
- **Overiť bezpečnosť nástrojov**: Uvedomiť si dôležitosť validácie metadát nástrojov, monitorovania dynamických zmien a obrany proti nepriamym prompt injection útokom
- **Integrovať osvedčené postupy**: Kombinovať zavedené bezpečnostné základy (bezpečné kódovanie, spevnenie servera, zero trust) s MCP-špecifickými kontrolami pre komplexnú ochranu

# Architektúra a kontroly bezpečnosti MCP

Moderné implementácie MCP vyžadujú viacvrstvové bezpečnostné prístupy, ktoré riešia tradičnú softvérovú bezpečnosť aj špecifické AI hrozby. Rýchlo sa vyvíjajúca špecifikácia MCP neustále zlepšuje svoje bezpečnostné kontroly, čo umožňuje lepšiu integráciu s podnikateľskými bezpečnostnými architektúrami a zavedenými osvedčenými postupmi.

Výskum z [Microsoft Digital Defense Report](https://aka.ms/mddr) ukazuje, že **98 % hlásených narušení by bolo zabránených dôslednou bezpečnostnou hygienou**. Najefektívnejšia ochranná stratégia kombinuje základné bezpečnostné praktiky s MCP-špecifickými kontrolami — overené základné bezpečnostné opatrenia zostávajú najvýznamnejšie pre zníženie celkového bezpečnostného rizika.

## Súčasná bezpečnostná situácia

> **Poznámka:** Táto informácia odráža bezpečnostné štandardy MCP z **5. februára 2026**, zosúladené so **špecifikáciou MCP 2025-11-25**. Protokol MCP sa rýchlo vyvíja a budúce implementácie môžu zaviesť nové vzory autentifikácie a rozšírené kontroly. Vždy sa odvolávajte na aktuálnu [špecifikáciu MCP](https://spec.modelcontextprotocol.io/), [MCP GitHub repozitár](https://github.com/modelcontextprotocol) a [dokumentáciu osvedčených bezpečnostných postupov](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pre najnovšie pokyny.

## 🏔️ Workshop MCP Security Summit (Sherpa)

Pre **praktické školenie v oblasti bezpečnosti** vrelo odporúčame **MCP Security Summit Workshop** (Sherpa) - komplexnú sprievodnú expedíciu za zabezpečením MCP serverov v Microsoft Azure.

### Prehľad workshopu

[Workshop MCP Security Summit](https://azure-samples.github.io/sherpa/) poskytuje praktické a použiteľné školenie v bezpečnosti prostredníctvom overenej metodiky „zraniteľný → exploit → oprava → validácia“. Budete:

- **Učiť sa rozbíjaním vecí**: Zažiť zraniteľnosti na vlastnej koži pomocou exploitácie zámerne nezabezpečených serverov
- **Používať natívnu bezpečnosť Azure**: Využívať Azure Entra ID, Key Vault, API Management a AI Content Safety
- **Konať podľa princípu defense-in-depth**: Postupovať cez campy budujúce komplexné bezpečnostné vrstvy
- **Aplikovať štandardy OWASP**: Každá technika mapuje na [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Získať produkčný kód**: Odísť so fungujúcimi, otestovanými implementáciami

### Trasa expedície

| Tábor | Zameranie | Pokryté riziká OWASP |
|-------|-----------|----------------------|
| **Základný tábor** | Základy MCP a zraniteľnosti autentifikácie | MCP01, MCP07 |
| **Tábor 1: Identita** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tábor 2: Brána** | API Management, Private Endpoints, governance | MCP02, MCP06, MCP07, MCP09 |
| **Tábor 3: I/O Bezpečnosť** | Prompt injection, ochrana PII, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Tábor 4: Monitorovanie** | Log Analytics, dashboardy, detekcia hrozieb | MCP04, MCP08 |
| **Vrchol expedície** | Integrácia Red Team / Blue Team | Všetky |

**Začať sa môžete tu**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 bezpečnostných rizík

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) podrobne popisuje desať najkritickejších bezpečnostných rizík pre implementácie MCP:

| Riziko | Popis | Opatrenie v Azure |
|--------|-------|-------------------|
| **MCP01** | Nesprávna správa tokenov a expozícia tajomstiev | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalácia oprávnení cez rozširovanie rozsahu | RBAC, Conditional Access |
| **MCP03** | Otrava nástrojov | Validácia nástrojov, overovanie integrity |
| **MCP04** | Útoky na softvérový dodávateľský reťazec a zásahy do závislostí | GitHub Advanced Security, skenovanie závislostí |
| **MCP05** | Vstrekovanie príkazov a ich vykonávanie | Validácia vstupov, sandboxing |
| **MCP06** | Podvrátenie toku zámerov | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nedostatočná autentifikácia a autorizácia | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Nedostatok auditovania a telemetrie | Azure Monitor, Application Insights |
| **MCP09** | Tieňové MCP servery | API Center governance, izolácia siete |
| **MCP10** | Vstrekovanie kontextu a prehnané zdieľanie | Klasifikácia dát, minimálna expozícia |

### Vývoj autentifikácie MCP

Špecifikácia MCP významne pokročila v prístupe k autentifikácii a autorizácii:

- **Pôvodný prístup**: Skoré špecifikácie vyžadovali od vývojárov implementáciu vlastných autentifikačných serverov, keď MCP servery fungovali ako OAuth 2.0 autorizačné servery spravujúce autentifikáciu používateľov priamo
- **Súčasný štandard (2025-11-25)**: Aktualizovaná špecifikácia umožňuje MCP serverom delegovať autentifikáciu na externých poskytovateľov identity (napr. Microsoft Entra ID), čo zlepšuje bezpečnostnú pozíciu a znižuje zložitosť implementácie
- **Transportná vrstva**: Vylepšená podpora bezpečných transportných mechanizmov s riadnymi vzormi autentifikácie pre lokálne (STDIO) a vzdialené (Streamable HTTP) pripojenia

## Bezpečnosť autentifikácie a autorizácie

### Súčasné bezpečnostné výzvy

Moderné implementácie MCP čelia viacerým výzvam v oblasti autentifikácie a autorizácie:

### Riziká a vektorové hrozby

- **Nesprávne nakonfigurovaná logika autorizácie**: Chybné implementovanie autorizácie v MCP serveroch môže odhaliť citlivé údaje a nesprávne aplikovať prístupové kontroly
- **Kompromitácia OAuth tokenov**: Krádež tokenov lokálneho MCP servera umožňuje útočníkom impersonovať servery a pristupovať k downstream službám
- **Zraniteľnosti token passthrough**: Nesprávne spracovanie tokenov vytvára obchádzky bezpečnostných kontrol a medzery v zodpovednosti
- **Nadmerné oprávnenia**: Nadmerne oprávnené MCP servery porušujú princíp najmenších oprávnení a rozširujú útočný povrch

#### Token passthrough: Kritický anti-vzor

**Token passthrough je v aktuálnej špecifikácii MCP autorizácie výslovne zakázaný** z dôvodu závažných bezpečnostných dôsledkov:

##### Obchádzanie bezpečnostných kontrol
- MCP servery a downstream API implementujú kľúčové bezpečnostné kontroly (obmedzenie rýchlosti, validácia požiadaviek, monitorovanie prevádzky), ktoré závisia od správnej validácie tokenov
- Priame použitie tokenov klientom na API obchádza tieto zásadné ochrany, čím sa podkopáva bezpečnostná architektúra

##### Výzvy v oblasti zodpovednosti a auditu  
- MCP servery nerozlišujú klientov používajúcich tokeny vydané v hore uvedenom reťazci, čo narušuje auditné stopy
- Záznamy downstream serverov zobrazujú zavádzajúce pôvody požiadaviek namiesto skutočných MCP serverových sprostredkovateľov
- Vyšetrovanie incidentov a auditovanie zhody sa stáva výrazne náročnejšie

##### Riziko exfiltrácie dát
- Nevalidované nároky tokenov umožňujú škodlivým aktérom so skradnutými tokenmi používať MCP servery ako proxy na exfiltráciu dát
- Porušenie hraníc dôvery umožňuje neautorizované prístupové vzory, ktoré obchádzajú zamýšľané bezpečnostné kontroly

##### Viacnásobné útoky cez viaceré služby
- Kompromitované tokeny prijímané viacerými službami umožňujú laterálny pohyb naprieč prepojenými systémami
- Predpoklady dôvery medzi službami môžu byť porušené, keď nemožno overiť pôvod tokenu

### Bezpečnostné kontroly a zmiernenia

**Kritické bezpečnostné požiadavky:**

> **Povinné**: MCP servery **NESMÚ** akceptovať žiadne tokeny, ktoré neboli výslovne vydané pre daný MCP server

#### Kontroly autentifikácie a autorizácie

- **Dôkladná revízia autorizácie**: Vykonajte komplexné audity logiky autorizácie MCP servera, aby ste zabezpečili prístup len autorizovaným používateľom a klientom k citlivým zdrojom
  - **Implementačný sprievodca**: [Azure API Management ako autentifikačná brána pre MCP servery](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrácia identity**: [Použitie Microsoft Entra ID pre autentifikáciu MCP servera](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Bezpečná správa tokenov**: Implementujte [najlepšie postupy Microsoftu pre validáciu a životný cyklus tokenov](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validujte, či nároky na publikum tokenu zodpovedajú identite MCP servera
  - Implementujte primeranú rotáciu a expiráciu tokenov
  - Zabráňte opakovaniu tokenov a neautorizovanému používaniu

- **Chránené ukladanie tokenov**: Zabezpečte ukladanie tokenov šifrovaním v pokoji aj počas prenosu
  - **Osvedčené postupy**: [Pokyny pre bezpečné ukladanie a šifrovanie tokenov](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementácia prístupovej kontroly

- **Princíp najmenších oprávnení**: Udeľujte MCP serverom len minimálne potrebné oprávnenia pre zamýšľanú funkcionalitu
  - Pravidelné revízie a aktualizácie oprávnení na prevenciu eskalácie
  - **Dokumentácia Microsoft**: [Bezpečný prístup podľa princípu najmenších oprávnení](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kontrola prístupu na základe rolí (RBAC)**: Implementujte detailné rolové priradenia
  - Kontextovo úzko definujte role k špecifickým zdrojom a akciám
  - Vyhnite sa širokým alebo nepotrebným oprávneniam, ktoré zvyšujú útokový povrch

- **Kontinuálne monitorovanie oprávnení**: Zavádzajte priebežný audit a monitoring prístupov
  - Monitorujte vzory používania oprávnení na odhalenie anomálií
  - Promptne riešte nadbytočné alebo nepoužité oprávnenia

## Špecifické bezpečnostné hrozby AI

### Prompt injection a útoky manipulácie nástrojov

Moderné implementácie MCP čelia sofistikovaným AI-špecifickým útokovým vektorom, ktoré tradičné bezpečnostné opatrenia nedokážu plne pokryť:

#### **Nepriamy prompt injection (Cross-Domain Prompt Injection)**

**Nepriamy prompt injection** predstavuje jednu z najkritickejších zraniteľností v AI systémoch s podporou MCP. Útočníci vkladajú škodlivé inštrukcie do externého obsahu — dokumentov, webových stránok, e-mailov alebo dátových zdrojov — ktoré AI systémy následne spracúvajú ako legitímne príkazy.

**Scenáre útokov:**
- **Vstrekovanie do dokumentov**: Škodlivé inštrukcie skryté v dokumentoch spracovávaných AI, ktoré vyvolávajú nežiaduce akcie
- **Zneužitie webového obsahu**: Kompromitované webové stránky obsahujúce vložené prompty, ktoré manipulujú správanie AI pri scrapaní
- **Útoky na základe e-mailov**: Škodlivé prompty v e-mailoch, ktoré spôsobujú, že AI asistenti zverejňujú informácie alebo vykonávajú neautorizované akcie
- **Kontaminácia dátových zdrojov**: Kompromitované databázy alebo API, ktoré poskytujú kontaminovaný obsah AI systémom

**Reálny dopad**: Tieto útoky môžu viesť k exfiltrácii dát, porušovaniu súkromia, generovaniu škodlivého obsahu a manipulácii používateľských interakcií. Podrobnú analýzu nájdete v [Prompt Injection v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram útoku prompt injection](../../../translated_images/sk/prompt-injection.ed9fbfde297ca877.webp)

#### **Útoky otravy nástrojov**

**Otrava nástrojov** cieli na metadáta definujúce nástroje MCP, zneužívajúc spôsob, akým LLM interpretujú popisy nástrojov a ich parametre pre vykonávacie rozhodnutia.

**Mechanizmy útoku:**
- **Manipulácia s metadátami**: Útočníci vkladajú škodlivé inštrukcie do popisov nástrojov, definícií parametrov alebo príkladov použitia
- **Neviditeľné inštrukcie**: Skryté prompty v metadátach nástrojov, ktoré sú spracovávané AI modelmi, ale pre ľudských používateľov sú neviditeľné
- **Dynamická zmena nástrojov („Rug Pulls“) **: Nástroje schválené používateľmi sú neskôr zmenené tak, aby vykonávali škodlivé akcie bez vedomia používateľa
- **Vstrekovanie parametrov**: Škodlivý obsah vložený do schém parametrov nástrojov, ktorý ovplyvňuje správanie modelu

**Riziká hostovaných serverov**: Vzdialené MCP servery predstavujú zvýšené riziko, pretože definície nástrojov môžu byť aktualizované po počiatočnom schválení používateľom, čím vznikajú scenáre, kde bezpečné nástroje môžu byť zrazu škodlivé. Kompletnú analýzu nájdete v [Útoky otravy nástrojov (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram útoku tool injection](../../../translated_images/sk/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ďalšie AI útokové vektory**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikované útoky využívajúce obsah z viacerých domén na obchádzanie bezpečnostných kontrol
- **Dynamická modifikácia schopností**: Zmeny schopností nástrojov v reálnom čase, ktoré unikajú počiatočnému bezpečnostnému posúdeniu  
- **Otravovanie kontextového okna**: Útoky, ktoré manipulujú s veľkými kontextovými oknami na skrytie škodlivých inštrukcií  
- **Útoky spôsobujúce zmätok modelu**: Využívanie obmedzení modelu na vytváranie nepredvídateľných alebo nebezpečných správaní  


### Dopad bezpečnostných rizík AI

**Dôsledky s vysokým dopadom:**
- **Únik dát**: Neoprávnený prístup a krádež citlivých firemných alebo osobných dát  
- **Porušenie súkromia**: Odhalenie osobne identifikovateľných údajov (PII) a dôverných obchodných informácií  
- **Manipulácia so systémom**: Neúmyselné zmeny v kritických systémoch a pracovných postupoch  
- **Krádež poverení**: Kompromitácia autentifikačných tokenov a prihlasovacích údajov služieb  
- **Bočný pohyb**: Využitie kompromitovaných AI systémov ako odrazových mostíkov pre širšie sieťové útoky  

### Bezpečnostné riešenia Microsoft AI

#### **AI Prompt Shields: Pokročilá ochrana proti útokom injekcie promptov**

Microsoft **AI Prompt Shields** poskytuje komplexnú obranu proti priamym aj nepriamym útokom injekcie promptov pomocou viacerých bezpečnostných vrstiev:

##### **Základné ochranné mechanizmy:**

1. **Pokročilá detekcia a filtrovanie**  
   - Algoritmy strojového učenia a NLP techniky odhaľujú škodlivé inštrukcie v externom obsahu  
   - Analýza v reálnom čase dokumentov, webových stránok, emailov a dátových zdrojov na prítomnosť hrozieb  
   - Kontextuálne rozpoznanie medzi legitímnymi a škodlivými vzormi promptov  

2. **Techniky osvetlenia**  
   - Rozlišuje medzi dôveryhodnými systémovými inštrukciami a potenciálne kompromitovanými externými vstupmi  
   - Metódy transformácie textu, ktoré zvyšujú relevantnosť modelu pričom izolujú škodlivý obsah  
   - Pomáha AI systémom udržať správnu hierarchiu inštrukcií a ignorovať vložené príkazy  

3. **Systémy oddelovačov a označovania dát**  
   - Explicitné vyznačenie hraníc medzi dôveryhodnými systémovými správami a externým vstupným textom  
   - Špeciálne značky vyznačujú hranice medzi dôveryhodnými a nedôveryhodnými dátovými zdrojmi  
   - Jasné oddelenie zabraňuje zmätku v inštrukciách a neoprávnenej exekúcii príkazov  

4. **Kontinuálne zdieľanie hrozbových informácií**  
   - Microsoft neustále monitoruje vznikajúce vzory útokov a aktualizuje obranné mechanizmy  
   - Proaktívne vyhľadávanie nových techník injekcie a útokových vektorov  
   - Pravidelné aktualizácie bezpečnostných modelov na udržanie efektívnosti proti vyvíjajúcim sa hrozbám  

5. **Integrácia Azure Content Safety**  
   - Súčasť komplexného balíka Azure AI Content Safety  
   - Ďalšia detekcia pokusov o jailbreak, škodlivého obsahu a porušení bezpečnostných pravidiel  
   - Zjednotené bezpečnostné ovládanie naprieč komponentmi AI aplikácií  

**Implementačné zdroje**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/sk/prompt-shield.ff5b95be76e9c78c.webp)


## Pokročilé bezpečnostné hrozby MCP

### Zraniteľnosti únosu relácie (session hijacking)

**Únos relácie** predstavuje kritický útok v stavových implementáciách MCP, kde neoprávnené subjekty získavajú a zneužívajú legitímne identifikátory relácií na predstieranie klientov a vykonávanie neoprávnených akcií.

#### **Scenáre útokov a riziká**

- **Injekcia útoku pomocou unesených promptov relácie**: Útočníci so ukradnutými ID relácií vkladajú škodlivé udalosti do serverov zdieľajúcich stav relácie, čo môže spustiť škodlivé akcie alebo prístup k citlivým dátam  
- **Priame predstieranie**: Ukradnuté ID relácie umožňuje priame volania MCP servera, ktoré obchádzajú autentifikáciu a za útočníkov sa považujú legitímni používatelia  
- **Kompromitované obnoviteľné prúdy**: Útočníci môžu skončiť požiadavky predčasne, čo spôsobuje, že legitímni klienti pokračujú s potenciálne škodlivým obsahom  

#### **Bezpečnostné opatrenia pre správu relácií**

**Kritické požiadavky:**  
- **Overenie autorizácie**: MCP servery implementujúce autorizáciu **MUSIA** overovať VŠETKY prichádzajúce požiadavky a **NESMÚ** sa spoliehať na relácie pre autentifikáciu  
- **Bezpečné generovanie relácií**: Používajte kryptograficky bezpečné, nedeterministické ID relácií generované bezpečnými generátormi náhodných čísel  
- **Väzba na používateľa**: Väzba ID relácie na používateľské údaje pomocou formátov ako `<user_id>:<session_id>`, aby sa zabránilo zneužitiu relácií iných používateľov  
- **Správa životného cyklu relácie**: Implementujte správne vypršanie platnosti, rotáciu a neplatnosť s cieľom obmedziť zraniteľné obdobie  
- **Bezpečnosť prenosu**: Povinné HTTPS pre všetku komunikáciu, aby sa zabránilo zachyteniu ID relácie  

### Problém zmäteného zástupcu (Confused Deputy)

**Problém zmäteného zástupcu** nastáva, keď MCP servery vystupujú ako autentifikačné proxy medzi klientmi a tretími stranami, čo vytvára príležitosti na obchádzanie autorizácie zneužitím statických klientskych ID.

#### **Mechanika útoku a riziká**

- **Obchádzanie súhlasu cez cookie**: Predchádzajúca autentifikácia používateľa vytvára cookies súhlasu, ktoré útočníci využívajú prostredníctvom škodlivých požiadaviek autorizácie s upravenými URI presmerovaní  
- **Krádež autorizačných kódov**: Existujúce cookies súhlasu môžu spôsobiť, že autorizačné servery preskočia obrazovky súhlasu a kódy nasmerujú na útočníkmi kontrolované endpointy  
- **Neoprávnený prístup k API**: Ukradnuté autorizačné kódy umožňujú výmenu tokenov a predstieranie používateľa bez explicitného schválenia  

#### **Stratégie zmiernenia**

**Povinné opatrenia:**  
- **Explicitný súhlas používateľa**: MCP proxy servery používajúce statické klientské ID **MUSIA** získať súhlas používateľa pre každý dynamicky registrovaný klient  
- **Implementácia bezpečnosti OAuth 2.1**: Dodržiavajte aktuálne bezpečnostné postupy OAuth vrátane PKCE (Proof Key for Code Exchange) pre všetky autorizačné požiadavky  
- **Prísna validácia klientov**: Implementujte dôslednú validáciu URI presmerovania a identifikátorov klientov, aby ste zabránili zneužitiu  

### Zraniteľnosti pri preposielaní tokenov (Token Passthrough)

**Preposielanie tokenov** predstavuje explicitný anti-pattern, kde MCP servery prijímajú klientské tokeny bez riadnej validácie a posielajú ich ďalej na downstream API, čím porušujú špecifikácie autorizácie MCP.

#### **Bezpečnostné dôsledky**

- **Obchádzanie kontroly**: Priame využívanie klientskych tokenov na API obchádza kľúčové mechanizmy limitovania rýchlosti, validácie a monitorovania  
- **Poškodenie auditu**: Tokeny vydané upstream znemožňujú identifikáciu klienta a narúšajú schopnosť vyšetrovať incidenty  
- **Únik dát cez proxy**: Nevalidované tokeny umožňujú útočníkom použiť servery ako proxy pre neoprávnený prístup k dátam  
- **Porušenie hraníc dôvery**: Downstream služby môžu byť vystavené porušeniam dôvery, keď nemožno overiť pôvod tokenov  
- **Rozšírenie útoku na viac služieb**: Kompromitované tokeny akceptované viacerými službami umožňujú bočný pohyb  

#### **Povinné bezpečnostné opatrenia**

**Neodkladné požiadavky:**  
- **Validácia tokenov**: MCP servery **NESMÚ** akceptovať tokeny, ktoré neboli explicitne vydané pre MCP server  
- **Overenie publika tokenu**: Vždy validujte, či audience v tokenoch zodpovedá identite MCP servera  
- **Správny životný cyklus tokenov**: Implementujte krátkodobé prístupové tokeny s bezpečnou rotáciou  


## Bezpečnosť dodávateľského reťazca pre AI systémy

Bezpečnosť dodávateľského reťazca sa vyvinula z tradičných závislostí softvéru na celú AI ekosystém. Moderné implementácie MCP musia dôsledne overovať a monitorovať všetky AI komponenty, pretože každý predstavuje potenciálne zraniteľnosti, ktoré môžu ohroziť integritu systému.

### Rozšírené komponenty dodávateľského reťazca AI

**Tradičné softvérové závislosti:**  
- Open-source knižnice a frameworky  
- Kontajnerové obrazy a základné systémy  
- Vývojové nástroje a build pipelines  
- Infrastrukturné komponenty a služby  

**AI-špecifické prvky dodávateľského reťazca:**  
- **Základné modely**: Predtrénované modely od rôznych poskytovateľov vyžadujúce overenie pôvodu  
- **Embedding služby**: Externé služby pre vektorizáciu a sémantické vyhľadávanie  
- **Poskytovatelia kontextu**: Dátové zdroje, znalostné bázy a dokumentové úložiská  
- **API tretích strán**: Externé AI služby, ML pipelines a dátové spracovateľské endpointy  
- **Artefakty modelov**: Váhy, konfigurácie a jemne doladené varianty modelov  
- **Zdrojové dáta pre tréning**: Datasety používané pre trénovanie a doladenie modelov  

### Komplexná stratégia bezpečnosti dodávateľského reťazca

#### **Overovanie komponentov a dôvera**
- **Validácia pôvodu**: Overte pôvod, licencovanie a integritu všetkých AI komponentov pred ich integráciou  
- **Bezpečnostné hodnotenie**: Vykonajte skeny zraniteľností a bezpečnostné recenzie modelov, dátových zdrojov a AI služieb  
- **Analýza reputácie**: Vyhodnoťte bezpečnostnú reputáciu a prax poskytovateľov AI služieb  
- **Overovanie súladu**: Zabezpečte, aby všetky komponenty spĺňali organizačné bezpečnostné a regulačné požiadavky  

#### **Bezpečné nasadzovacie pipeline**  
- **Automatizované CI/CD bezpečnostné skeny**: Integrujte bezpečnostné kontroly v priebehu automatizovaných pipeline nasadzovania  
- **Integrita artefaktov**: Implementujte kryptografickú verifikáciu všetkých nasadzovaných artefaktov (kód, modely, konfigurácie)  
- **Postupné nasadzovanie**: Používajte progresívne nasadzovacie stratégie s bezpečnostnou validáciou na každom kroku  
- **Dôveryhodné úložiská artefaktov**: Nasadzujte iba z overených, bezpečných registrov a úložísk artefaktov  

#### **Kontinuálne monitorovanie a reakcia**
- **Skenovanie závislostí**: Neustále monitorujte zraniteľnosti všetkých softvérových a AI komponentov  
- **Monitorovanie modelov**: Neustále hodnotenie správania modelov, výkonových odchýlok a bezpečnostných anomálií  
- **Sledovanie stavu služieb**: Monitorujte externé AI služby na dostupnosť, bezpečnostné incidenty a zmeny politík  
- **Integrácia hrozbových inteligencií**: Zapojte hrozbové feedy špecifické pre bezpečnostné riziká AI a ML  

#### **Riadenie prístupu a princíp minimálnych práv**
- **Oprávnenia na úrovni komponentov**: Obmedzte prístup k modelom, dátam a službám podľa obchodnej potreby  
- **Správa servisných účtov**: Implementujte špecializované servisné účty s minimálnymi potrebnými oprávneniami  
- **Segmentácia siete**: Izolujte AI komponenty a obmedzte sieťový prístup medzi službami  
- **Kontroly API brány**: Používajte centralizované API brány na riadenie a monitorovanie prístupu k externým AI službám  

#### **Reakcia na incidenty a obnova**
- **Rýchle reakčné postupy**: Zavedené procesy na záplaty alebo výmenu kompromitovaných AI komponentov  
- **Rotácia poverení**: Automatizované systémy na rotáciu tajomstiev, API kľúčov a prihlasovacích údajov služieb  
- **Schopnosti návratu**: Možnosť rýchlo vrátiť AI komponenty do predchádzajúcich známých dobrých verzií  
- **Obnova po porušení dodávateľského reťazca**: Špecifické postupy pre riešenie kompromitácií upstream AI služieb  

### Microsoft bezpečnostné nástroje a integrácia

**GitHub Advanced Security** poskytuje komplexnú ochranu dodávateľského reťazca vrátane:  
- **Skenovanie tajomstiev**: Automatická detekcia poverení, API kľúčov a tokenov v repozitároch  
- **Skenovanie závislostí**: Hodnotenie zraniteľností open-source závislostí a knižníc  
- **CodeQL analýza**: Statická analýza kódu na bezpečnostné zraniteľnosti a programátorské chyby  
- **Prehľad o dodávateľskom reťazci**: Viditeľnosť zdravia a bezpečnostného stavu závislostí  

**Integrácia s Azure DevOps a Azure Repos:**  
- Plynulá integrácia bezpečnostných skenov v rámci Microsoft vývojových platforiem  
- Automatizované bezpečnostné kontroly v Azure Pipelines pre AI záťaže  
- Vynucovanie politík pre bezpečné nasadzovanie AI komponentov  

**Interné praktiky Microsoft:**  
Microsoft implementuje rozsiahle bezpečnostné postupy dodávateľského reťazca vo všetkých produktoch. Viac o overených prístupoch sa dozviete v [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Najlepšie praktiky základnej bezpečnosti

Implementácie MCP preberajú a rozvíjajú existujúcu bezpečnostnú úroveň vašej organizácie. Posilnenie základných bezpečnostných praktík významne zvyšuje celkovú bezpečnosť AI systémov a nasadení MCP.

### Základné bezpečnostné prvky

#### **Bezpečnostné praktiky vývoja**
- **Dodržiavanie OWASP**: Ochrana proti [OWASP Top 10](https://owasp.org/www-project-top-ten/) webovým zraniteľnostiam  
- **AI-špecifická ochrana**: Implementácia kontrol pre [OWASP Top 10 pre LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Bezpečná správa tajomstiev**: Použitie vyhradených úložísk na tokeny, API kľúče a citlivé konfiguračné údaje  
- **End-to-end šifrovanie**: Zavedenie bezpečnej komunikácie v celom aplikáčnom a dátovom toku  
- **Validácia vstupov**: Dôsledná validácia všetkých užívateľských vstupov, parametrov API a dátových zdrojov  

#### **Zosilnenie infraštruktúry**
- **Viacfaktorová autentifikácia (MFA)**: Povinná MFA pre všetky administratívne a servisné účty  
- **Správa záplatovania**: Automatizované a včasné záplatovanie operačných systémov, frameworkov a závislostí  
- **Integrácia poskytovateľov identity**: Centralizovaná správa identít cez enterprise identity providera (Microsoft Entra ID, Active Directory)  
- **Segmentácia siete**: Logická izolácia MCP komponentov na obmedzenie bočného pohybu  
- **Princíp minimálnych oprávnení**: Minimálne potrebné oprávnenia pre všetky systémové komponenty a účty  

#### **Monitorovanie a detekcia bezpečnosti**
- **Komplexné logovanie**: Detailné zaznamenávanie činností AI aplikácií vrátane interakcií klient-server MCP  
- **Integrácia SIEM**: Centralizované manažovanie bezpečnostných informácií a udalostí na detekciu anomálií  
- **Behaviorálna analytika**: AI poháňané monitorovanie na odhaľovanie nezvyklých vzorcov správania systémov a používateľov  
- **Hrozbová inteligencia**: Zapojenie externých hrozbových feedov a indikátorov kompromitácie (IOC)  
- **Reakcia na incidenty**: Dobře definované postupy na detekciu, reakciu a obnovu po bezpečnostných incidentoch  

#### **Architektúra Zero Trust**
- **Nikdy never, vždy overuj**: Neustále overovanie používateľov, zariadení a sieťových spojení  
- **Mikrosegmentácia**: Granulárna kontrola siete izolujúca jednotlivé pracovné záťaže a služby  
- **Bezpečnosť zameraná na identitu**: Bezpečnostné politiky založené na overených identitách namiesto sieťovej lokácie  
- **Nepretržité hodnotenie rizika**: Dynamické vyhodnocovanie bezpečnostnej situácie na základe kontextu a správania  
- **Podmienený prístup**: Ovládanie prístupu adaptujúce sa podľa rizikových faktorov, lokácie a dôveryhodnosti zariadenia  

### Vzory integrácie v podnikovom prostredí

#### **Integrácia do Microsoft bezpečnostného ekosystému**
- **Microsoft Defender for Cloud**: Komplexné riadenie bezpečnostnej úrovne cloudovej infraštruktúry  
- **Azure Sentinel**: Cloud-native SIEM a SOAR služby na ochranu AI záťaží  
- **Microsoft Entra ID**: Enterprise manažment identity a prístupu s politikami podmieneného prístupu  
- **Azure Key Vault**: Centralizované uloženie tajomstiev s podporou hardvérovo zabezpečených modulov (HSM)  
- **Microsoft Purview**: Správa dát a súlad pre zdroje a pracovné postupy AI  

#### **Súlad a správa**
- **Regulačná zhoda**: Zabezpečenie, aby implementácie MCP spĺňali odvetvové regulačné požiadavky (GDPR, HIPAA, SOC 2)  
- **Klasifikácia dát**: Správna kategorizácia a spracovanie citlivých dát používaných AI systémami  
- **Auditné stopy**: Komplexné logovanie pre regulačné požiadavky a forenzné vyšetrovanie  
- **Kontroly ochrany osobných údajov**: Implementácia princípov ochrany súkromia už pri návrhu AI systémov  
- **Riadenie zmien**: Formálne procesy bezpečnostnej revízie zmien AI systémov  

Tieto základné praktiky vytvárajú robustný bezpečnostný základ, ktorý zvyšuje účinnosť špecifických bezpečnostných opatrení MCP a zabezpečuje komplexnú ochranu AI aplikácií.

## Kľúčové bezpečnostné závery
- **Viacvrstvový bezpečnostný prístup**: Kombinujte základné bezpečnostné postupy (bezpečné kódovanie, minimálne oprávnenia, overovanie dodávateľského reťazca, nepretržité monitorovanie) s kontrolami špecifickými pre AI pre komplexnú ochranu

- **Špecifické hrozby AI**: Systémy MCP čelia jedinečným rizikám vrátane injekcie príkazov, otravy nástrojov, zachytenia relácií, problémov so zmätenými zástupcami, zraniteľností pri prenose tokenov a nadmerných oprávnení, ktoré si vyžadujú špecializované zmierňovacie opatrenia

- **Vynikajúce overovanie a autorizácia**: Implementujte robustné overovanie pomocou externých poskytovateľov identity (Microsoft Entra ID), presadzujte správnu validáciu tokenov a nikdy neprijímajte tokeny, ktoré neboli explicitne vydané pre váš MCP server

- **Prevencia AI útokov**: Nasadzujte Microsoft Prompt Shields a Azure Content Safety na obranu proti nepriamym útokom injekcie príkazov a otravy nástrojov, pričom overujte metadata nástrojov a monitorujte dynamické zmeny

- **Bezpečnosť relácií a prenosu**: Používajte kryptograficky bezpečné, nedeterministické ID relácií viazané na identity používateľov, implementujte správne riadenie životného cyklu relácií a nikdy nepoužívajte relácie na overovanie

- **Najlepšie praktiky OAuth bezpečnosti**: Predchádzajte útokom s „confused deputy“ prostredníctvom explicitného súhlasu používateľa pre dynamicky registrovaných klientov, správnej implementácie OAuth 2.1 s PKCE a prísnej validácie redirect URI

- **Zásady bezpečnosti tokenov**: Vyhýbajte sa anti-vzorom prenášania tokenov, validujte nároky na audienciu tokenov, implementujte krátkodobé tokeny s bezpečnou rotáciou a udržiavajte jasné dôvernostné hranice

- **Komplexná bezpečnosť dodávateľského reťazca**: Zaobchádzajte so všetkými súčasťami AI ekosystému (modely, embeddings, poskytovatelia kontextu, externé API) s rovnakou bezpečnostnou prísnosťou ako s tradičnými softvérovými závislosťami

- **Nepretržitý vývoj**: Sledujte aktuálne rýchlo sa meniace špecifikácie MCP, prispievajte k bezpečnostným komunitným štandardom a udržiavajte adaptívny bezpečnostný postoj s rastúcim protokolom

- **Integrácia bezpečnosti Microsoftu**: Využívajte komplexný bezpečnostný ekosystém Microsoftu (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pre lepšiu ochranu nasadzovania MCP

## Komplexné zdroje

### **Oficiálna dokumentácia bezpečnosti MCP**
- [Špecifikácia MCP (Aktuálne: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najlepšie bezpečnostné postupy MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Špecifikácia autorizácie MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [GitHub úložisko MCP](https://github.com/modelcontextprotocol)

### **Bezpečnostné zdroje OWASP MCP**
- [OWASP MCP Azure bezpečnostný sprievodca](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexný OWASP MCP Top 10 s implementačnými pokynmi pre Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiálne bezpečnostné riziká OWASP MCP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostný tréning pre MCP na Azure

### **Bezpečnostné štandardy a najlepšie praktiky**
- [Najlepšie bezpečnostné praktiky OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 bezpečnosti webových aplikácií](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 pre veľké jazykové modely](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Výskum a analýza bezpečnosti AI**
- [Injekcia príkazov v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Útoky na otravu nástrojov (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Bezpečnostné výskumné zhrnutie MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Bezpečnostné riešenia Microsoftu**
- [Dokumentácia Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Služba Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Bezpečnosť Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Najlepšie praktiky správy tokenov v Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementačné návody a tutoriály**
- [Azure API Management ako autentifikačná brána MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentifikácia s MCP servermi](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Bezpečné ukladanie a šifrovanie tokenov (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps a bezpečnosť dodávateľského reťazca**
- [Bezpečnosť Azure DevOps](https://azure.microsoft.com/products/devops)
- [Bezpečnosť Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Cesta Microsoftu k zabezpečeniu dodávateľského reťazca softvéru](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Ďalšia dokumentácia o bezpečnosti**

Pre komplexné bezpečnostné návody si pozrite tieto špecializované dokumenty v tejto sekcii:

- **[MCP Najlepšie bezpečnostné praktiky 2025](./mcp-security-best-practices-2025.md)** - Kompletné najlepšie bezpečnostné praktiky pre implementácie MCP
- **[Implementácia Azure Content Safety](./azure-content-safety-implementation.md)** - Praktické príklady implementácie integrácie Azure Content Safety
- **[Bezpečnostné kontroly MCP 2025](./mcp-security-controls-2025.md)** - Najnovšie bezpečnostné kontroly a techniky pre nasadenia MCP
- **[Rýchla referencia najlepších praktík MCP](./mcp-best-practices.md)** - Rýchla referencia pre základné bezpečnostné postupy MCP
- **[BlueHat 2026: Zabezpečenie budúcnosti AI: zabezpečenie MCP pomocou obranných vzorov](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Obranné vzory do hĺbky od Microsoft Security Response Center (MSRC)

### **Praktický bezpečnostný tréning**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komplexný praktický workshop na zabezpečenie MCP serverov v Azure s progresívnymi kempmi od Base Camp po Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenčná architektúra a implementačné pokyny pre všetky riziká OWASP MCP Top 10

---

## Čo ďalej

Ďalej: [Kapitola 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->