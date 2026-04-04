# Najlepšie bezpečnostné postupy MCP - aktualizácia február 2026

> **Dôležité**: Tento dokument odráža najnovšie bezpečnostné požiadavky [špecifikácie MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) a oficiálne [Najlepšie bezpečnostné postupy MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Vždy sa odvolávajte na aktuálnu špecifikáciu pre najnovšie usmernenia.

## 🏔️ Praktický bezpečnostný tréning

Pre praktické skúsenosti s implementáciou odporúčame **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - komplexnú sprevádzanú expedíciu zabezpečenia MCP serverov v Azure. Workshop pokrýva všetky OWASP MCP Top 10 riziká prostredníctvom metodológie "zraniteľné → zneužiť → opraviť → overiť".

Všetky postupy v tomto dokumente sú v súlade s **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** pre usmernenia implementácie špecifické pre Azure.

## Základné bezpečnostné postupy pre implementácie MCP

Model Context Protocol prináša jedinečné bezpečnostné výzvy, ktoré presahujú tradičnú softvérovú bezpečnosť. Tieto postupy riešia základné bezpečnostné požiadavky aj MCP-špecifické hrozby vrátane injekcie promptov, otravy nástrojov, unášania relácií, problémov „confused deputy“ a zraniteľností pri prenose tokenov.

### **POVINNÉ bezpečnostné požiadavky**

**Kritické požiadavky zo špecifikácie MCP:**

### **POVINNÉ bezpečnostné požiadavky**

**Kritické požiadavky zo špecifikácie MCP:**

> **NESMÚ**: MCP servery **NESMÚ** akceptovať žiadne tokeny, ktoré neboli výslovne vydané pre MCP server  
>  
> **MUSIA**: MCP servery implementujúce autorizáciu **MUSIA** overovať VŠETKY prichádzajúce požiadavky  
>  
> **NESMÚ**: MCP servery **NESMÚ** používať relácie na autentifikáciu  
>  
> **MUSIA**: MCP proxy servery používajúce statické ID klienta **MUSIA** získať súhlas používateľa pre každého dynamicky registrovaného klienta

---

## 1. **Bezpečnosť tokenov & autentifikácia**

**Kontroly autentifikácie a autorizácie:**  
   - **Dôsledné preskúmanie autorizácie**: Vykonajte komplexné audity autorizácie MCP servera, aby ste zabezpečili prístup k prostriedkom len pre zamýšľaných používateľov a klientov  
   - **Integrácia externých poskytovateľov identity**: Používajte zavedených poskytovateľov identity ako Microsoft Entra ID namiesto vlastnej implementácie autentifikácie  
   - **Validácia publika tokenu**: Vždy overujte, že tokeny boli výslovne vydané pre váš MCP server - nikdy neakceptujte upstream tokeny  
   - **Správny životný cyklus tokenov**: Implementujte bezpečnú rotáciu tokenov, politiky vypršania platnosti a zabráňte opätovnému použitiu tokenov

**Chránené ukladanie tokenov:**  
   - Používajte Azure Key Vault alebo podobné zabezpečené úložiská poverení pre všetky tajomstvá  
   - Implementujte šifrovanie tokenov v pokoji aj počas prenosu  
   - Pravidelná rotácia poverení a monitorovanie neautorizovaného prístupu

## 2. **Správa relácií & bezpečnosť prenosu**

**Bezpečné postupy správy relácií:**  
   - **Kryptograficky bezpečné ID relácií**: Používajte bezpečné, nedeterministické ID relácií generované bezpečnými generátormi náhodných čísel  
   - **Viazanie na používateľa**: Viažte ID relácií na používateľskú identitu pomocou formátov ako `<user_id>:<session_id>`, aby ste zabránili zneužitiu relácií medzi používateľmi  
   - **Správa životného cyklu relácií**: Implementujte správne vypršanie platnosti, rotáciu a neplatnosť pre obmedzenie okien zraniteľnosti  
   - **Povinné HTTPS/TLS**: Povinné HTTPS pre všetku komunikáciu, aby sa zabránilo zachyteniu ID relácií

**Bezpečnosť transportnej vrstvy:**  
   - Konfigurujte TLS 1.3, keď je to možné, s riadnym riadením certifikátov  
   - Implementujte pripínanie certifikátov pre kritické spojenia  
   - Pravidelná rotácia certifikátov a overovanie platnosti

## 3. **Ochrana proti AI-špecifickým hrozbám** 🤖

**Obrana proti injekcii promptov:**  
   - **Microsoft Prompt Shields**: Nasadzujte AI Prompt Shields pre pokročilú detekciu a filtrovanie škodlivých inštrukcií  
   - **Sanitácia vstupov**: Validujte a očistite všetky vstupy, aby ste zabránili injekčným útokom a problémom „confused deputy“  
   - **Obsahové hranice**: Používajte systémy ohraničovačov a dátových značiek na rozlíšenie dôveryhodných inštrukcií od externého obsahu

**Prevencia otravy nástrojov:**  
   - **Validácia metadát nástrojov**: Implementujte kontroly integrity pre definície nástrojov a monitorujte neočakávané zmeny  
   - **Dynamické monitorovanie nástrojov**: Monitorujte správanie za behu a nastavte upozornenia pre neočakávané vzory vykonávania  
   - **Workflows schválenia**: Vyžadujte výslovné schválenie používateľa pri úpravách nástrojov a zmene schopností

## 4. **Kontrola prístupu & oprávnenia**

**Princíp najmenších práv:**  
   - Udeľujte MCP serverom iba minimálne oprávnenia potrebné pre zamýšľanú funkcionalitu  
   - Implementujte riadenie prístupu na základe rolí (RBAC) s jemnozrnným oprávnením  
   - Pravidelné prehodnocovanie oprávnení a kontinuálne monitorovanie eskalácie práv

**Kontroly oprávnení za behu:**  
   - Uplatňujte limity zdrojov na zabránenie útokom vyčerpania zdrojov  
   - Používajte izoláciu kontajnerov pre prostredia vykonávania nástrojov  
   - Implementujte prístup len v prípade potreby pre administratívne funkcie

## 5. **Bezpečnosť obsahu & monitorovanie**

**Implementácia bezpečnosti obsahu:**  
   - **Integrácia Azure Content Safety**: Používajte Azure Content Safety na detekciu škodlivého obsahu, pokusov o unikáty a porušení zásad  
   - **Analýza správania**: Implementujte behové monitorovanie správania na detekciu anomálií v MCP serveri a vykonávaní nástrojov  
   - **Komplexné protokolovanie**: Zaznamenávajte všetky pokusy o autentifikáciu, vyvolávanie nástrojov a bezpečnostné udalosti s bezpečným, neprenosným úložiskom

**Kontinuálne monitorovanie:**  
   - Upozorňovanie v reálnom čase na podozrivé vzory a neautorizované pokusy o prístup  
   - Integrácia so SIEM systémami pre centralizované riadenie bezpečnostných udalostí  
   - Pravidelné bezpečnostné audity a penetračné testovanie MCP implementácií

## 6. **Bezpečnosť dodávateľského reťazca**

**Overenie komponentov:**  
   - **Skenovanie závislostí**: Používajte automatizované skenovanie zraniteľností pre všetky softvérové závislosti a AI komponenty  
   - **Validácia pôvodu**: Overujte pôvod, licencie a integritu modelov, zdrojov dát a externých služieb  
   - **Podpísané balíčky**: Používajte kryptograficky podpísané balíčky a overujte podpisy pred nasadením

**Bezpečný vývojový pipeline:**  
   - **GitHub Advanced Security**: Implementujte skenovanie tajomstiev, analýzu závislostí a statickú analýzu CodeQL  
   - **Bezpečnosť CI/CD**: Integrujte bezpečnostné overovanie v celom automatizovanom nasadzovacom pipeline  
   - **Integrita artefaktov**: Implementujte kryptografickú verifikáciu pre nasadené artefakty a konfigurácie

## 7. **Bezpečnosť OAuth & prevencia „confused deputy“**

**Implementácia OAuth 2.1:**  
   - **Implementácia PKCE**: Používajte Proof Key for Code Exchange (PKCE) pre všetky autorizačné požiadavky  
   - **Výslovný súhlas**: Získajte súhlas používateľa pre každého dynamicky registrovaného klienta, aby ste zabránili útokom typu confused deputy  
   - **Validácia Redirect URI**: Implementujte prísnu validáciu redirect URI a identifikátorov klientov

**Bezpečnosť proxy:**  
   - Zabráňte obchádzaniu autorizácie cez zneužitie statického ID klienta  
   - Implementujte správne workflows súhlasov pre prístupy tretích strán k API  
   - Monitorujte krádeže autorizačných kódov a neautorizovaný prístup k API

## 8. **Reakcia na incidenty & obnova**

**Schopnosti rýchlej reakcie:**  
   - **Automatizovaná reakcia**: Implementujte automatizované systémy pre rotáciu poverení a obmedzenie hrozieb  
   - **Postupy obnovy**: Schopnosť rýchlo revertovať na známe dobré konfigurácie a komponenty  
   - **Forenzné schopnosti**: Detailné auditné stopy a protokolovanie na vyšetrovanie incidentov

**Komunikácia & koordinácia:**  
   - Jasné postupy eskalácie bezpečnostných incidentov  
   - Integrácia s organizačnými tímami pre reakciu na incidenty  
   - Pravidelné simulácie bezpečnostných incidentov a cvičenia typu tabletop

## 9. **Compliance & riadenie**

**Regulačná zhoda:**  
   - Zabezpečte, aby implementácie MCP spĺňali odvetvové požiadavky (GDPR, HIPAA, SOC 2)  
   - Implementujte klasifikáciu dát a riadenie ochrany súkromia pri spracovaní AI dát  
   - Udržiavajte komplexnú dokumentáciu pre audity zhody

**Riadenie zmien:**  
   - Formálne bezpečnostné kontrolné procesy pre všetky zmeny MCP systémov  
   - Riadenie verzií a workflows schválení pre zmeny konfigurácií  
   - Pravidelné hodnotenia zhody a analýza medzier

## 10. **Pokročilé bezpečnostné kontroly**

**Architektúra Zero Trust:**  
   - **Nikdy neveriť, vždy overiť**: Neustála verifikácia používateľov, zariadení a spojení  
   - **Mikrosegmentácia**: Granulárne sieťové kontroly izolujúce jednotlivé MCP komponenty  
   - **Podmienený prístup**: Riadenie prístupu na základe rizika s adaptáciou na aktuálny kontext a správanie

**Ochrana aplikácií za behu:**  
   - **Runtime Application Self-Protection (RASP)**: Nasadzujte RASP techniky pre detekciu hrozieb v reálnom čase  
   - **Monitorovanie výkonu aplikácií**: Sledujte výkonnostné anomálie, ktoré môžu indikovať útoky  
   - **Dynamické bezpečnostné politiky**: Implementujte politiky, ktoré sa prispôsobujú na základe aktuálneho bezpečnostného kontextu

## 11. **Integrácia bezpečnostného ekosystému Microsoft**

**Komplexná bezpečnosť Microsoft:**  
   - **Microsoft Defender for Cloud**: Riadenie cloudovej bezpečnostnej pozície pre MCP záťaže  
   - **Azure Sentinel**: Cloudové SIEM a SOAR schopnosti pre pokročilú detekciu hrozieb  
   - **Microsoft Purview**: Riadenie dát a zhoda pre AI workflowy a zdroje dát

**Identita a riadenie prístupu:**  
   - **Microsoft Entra ID**: Podnikové riadenie identity s podmienenými politikami prístupu  
   - **Privileged Identity Management (PIM)**: Prístup na požiadanie a workflows schválení pre administratívne funkcie  
   - **Ochrana identity**: Podmienený prístup založený na riziku a automatizovaná reakcia na hrozby

## 12. **Kontinuálna bezpečnostná evolúcia**

**Zostať aktuálny:**  
   - **Monitorovanie špecifikácie**: Pravidelné prehliadanie aktualizácií špecifikácie MCP a zmien bezpečnostných odporúčaní  
   - **Hrozbová inteligencia**: Integrácia kŕmnych systémov AI-špecifických hrozieb a indikátorov kompromitácie  
   - **Zapojenie bezpečnostnej komunity**: Aktívna účasť v MCP bezpečnostnej komunite a programoch zverejňovania zraniteľností

**Adaptívna bezpečnosť:**  
   - **Bezpečnosť strojového učenia**: Používajte ML na detekciu anomálií pre identifikáciu nových vzorov útokov  
   - **Prediktívna bezpečnostná analytika**: Implementujte prediktívne modely pre proaktívnu identifikáciu hrozieb  
   - **Automatizácia bezpečnosti**: Automatické aktualizácie bezpečnostných politík založené na hrozbovej inteligencii a zmenách špecifikácie

---

## **Kritické bezpečnostné zdroje**

### **Oficiálna dokumentácia MCP**
- [Špecifikácia MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najlepšie bezpečnostné postupy MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Špecifikácia autorizácie MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP zdroje bezpečnosti MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexný OWASP MCP Top 10 s implementáciou v Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Oficiálne OWASP MCP bezpečnostné riziká  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktický bezpečnostný tréning pre MCP v Azure

### **Microsoft bezpečnostné riešenia**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Bezpečnosť Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Bezpečnostné normy**
- [OAuth 2.0 Best Practices bezpečnosti (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Implementačné príručky**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID s MCP servermi](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Bezpečnostné upozornenie**: Bezpečnostné postupy MCP sa rýchlo vyvíjajú. Vždy overujte podľa aktuálnej [špecifikácie MCP](https://spec.modelcontextprotocol.io/) a [oficiálnej bezpečnostnej dokumentácie](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pred implementáciou.

## Čo ďalej

- Čítať: [MCP Security Controls 2025](./mcp-security-controls-2025.md)  
- Návrat do: [Prehľad modulu bezpečnosti](./README.md)  
- Pokračovať do: [Modul 3: Začíname](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie**:  
Tento dokument bol preložený pomocou služby prekladov AI [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, majte prosím na pamäti, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pri kritických informáciách sa odporúča profesionálny ľudský preklad. Nezodpovedáme za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->