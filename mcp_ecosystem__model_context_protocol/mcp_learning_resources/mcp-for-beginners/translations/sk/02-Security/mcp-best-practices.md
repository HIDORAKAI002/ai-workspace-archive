# MCP Bezpečnostné najlepšie praktiky 2025

Tento komplexný sprievodca uvádza základné bezpečnostné najlepšie praktiky pre implementáciu systémov Model Context Protocol (MCP) na základe najnovšej **MCP špecifikácie 2025-11-25** a súčasných priemyselných štandardov. Tieto praktiky riešia tradičné bezpečnostné problémy aj špecifické hrozby umelej inteligencie unikátne pre implementácie MCP.

## Kritické bezpečnostné požiadavky

### Povinné bezpečnostné kontroly (POVINNÉ požiadavky)

1. **Overenie tokenu**: MCP servery **NESMÚ** akceptovať žiadne tokeny, ktoré neboli výslovne vydané pre samotný MCP server  
2. **Overenie autorizácie**: MCP servery implementujúce autorizáciu **MUSIA** overiť VŠETKY prichádzajúce požiadavky a **NESMÚ** používať relácie na autentifikáciu  
3. **Súhlas používateľa**: MCP proxy servery používajúce statické ID klientov **MUSIA** získať explicitný súhlas používateľa pre každého dynamicky registrovaného klienta  
4. **Bezpečné session ID**: MCP servery **MUSIA** používať kryptograficky bezpečné, nedeterministické ID relácií generované prostredníctvom bezpečných generátorov náhodných čísel

## Základné bezpečnostné praktiky

### 1. Validácia a sanitizácia vstupov
- **Komplexná validácia vstupov**: Overujte a sanitizujte všetky vstupy, aby ste predišli útokom typu injection, problémom confused deputy a zraniteľnostiam prompt injection  
- **Vynucovanie schémy parametrov**: Implementujte prísnu validáciu JSON schémy pre všetky parametre nástrojov a API vstupy  
- **Filtrovanie obsahu**: Používajte Microsoft Prompt Shields a Azure Content Safety na filtrovanie škodlivého obsahu v promptoch a odpovediach  
- **Sanitizácia výstupov**: Validujte a sanitizujte všetky výstupy modelov pred ich zobrazením používateľom alebo downstream systémom  

### 2. Excelentnosť v autentifikácii a autorizácii  
- **Externí poskytovatelia identity**: Delegujte autentifikáciu etablovaným poskytovateľom identity (Microsoft Entra ID, OAuth 2.1 poskytovatelia) namiesto vlastnej implementácie autentifikácie  
- **Drobné oprávnenia**: Implementujte granulárne oprávnenia pre jednotlivé nástroje podľa princípu minimálnych práv  
- **Správa životného cyklu tokenov**: Používajte krátkodobé prístupové tokeny s bezpečnou rotáciou a správnym overením publika  
- **Viacfaktorová autentifikácia**: Vyžadujte MFA pre všetky administratívne prístupy a citlivé operácie  

### 3. Bezpečné komunikačné protokoly
- **Transport Layer Security**: Používajte HTTPS/TLS 1.3 pre všetku MCP komunikáciu s riadnym overením certifikátu  
- **End-to-End šifrovanie**: Implementujte dodatočné vrstvy šifrovania pre vysoko citlivé dáta počas prenosu i v pokoji  
- **Správa certifikátov**: Udržiavajte správny životný cyklus certifikátov s automatizovanými procesmi obnovy  
- **Vynucovanie verzie protokolu**: Používajte aktuálnu verziu MCP protokolu (2025-11-25) s riadnou negociáciou verzií  

### 4. Pokročilé obmedzovanie rýchlosti a ochrana zdrojov
- **Viacvrstvové obmedzovanie rýchlosti**: Implementujte obmedzenia rýchlosti na úrovni používateľa, relácie, nástroja a zdrojov na prevenciu zneužitia  
- **Adaptívne obmedzovanie rýchlosti**: Používajte strojové učenie na dynamické obmedzovanie podľa vzorov používania a indikátorov hrozieb  
- **Správa kvót zdrojov**: Nastavte primerané limity pre výpočtové zdroje, využitie pamäte a dobu vykonávania  
- **Ochrana proti DDoS**: Nasadzujte komplexnú ochranu proti DDoS a systémy analýzy prenosu  

### 5. Komplexné protokolovanie a monitorovanie
- **Štruktúrované auditné protokoly**: Zabezpečte detailné a vyhľadávateľné záznamy pre všetky MCP operácie, vykonávanie nástrojov a bezpečnostné udalosti  
- **Monitorovanie bezpečnosti v reálnom čase**: Nasadzujte SIEM systémy s AI-powered detekciou anomálií pre MCP záťaže  
- **Protokolovanie v súlade s ochranou súkromia**: Protokolujte bezpečnostné udalosti s rešpektovaním požiadaviek na ochranu osobných údajov a predpisy  
- **Integrácia reakcie na incidenty**: Pripojte protokolovacie systémy k automatizovaným pracovným tokom reakcie na incidenty  

### 6. Vylepšené bezpečné praktiky ukladania
- **Hardvérové bezpečnostné moduly**: Používajte ukladanie kľúčov založené na HSM (Azure Key Vault, AWS CloudHSM) pre kritické kryptografické operácie  
- **Správa kryptografických kľúčov**: Implementujte správnu rotáciu kľúčov, segregáciu a prístupové kontroly pre šifrovacie kľúče  
- **Správa tajomstiev**: Ukladajte všetky API kľúče, tokeny a poverenia v špecializovaných systémoch na správu tajomstiev  
- **Klasifikácia dát**: Klasifikujte dáta podľa úrovní citlivosti a uplatnite primerané ochranné opatrenia  

### 7. Pokročilá správa tokenov
- **Prevencia token passthrough**: Výslovne zakážte vzory token passthrough, ktoré obchádzajú bezpečnostné kontroly  
- **Overenie publika tokenu**: Vždy overujte, že publiká tokenu zodpovedajú identite určeného MCP servera  
- **Autorizácia založená na nárokoch (claims)**: Implementujte granularnu autorizáciu založenú na nárokoch v tokenoch a atribútoch používateľa  
- **Pripájanie tokenov (token binding)**: Väzba tokenov na konkrétne relácie, používateľov alebo zariadenia, kde je to vhodné  

### 8. Bezpečná správa relácií
- **Kryptografické ID relácií**: Generujte ID relácií pomocou kryptograficky bezpečných generátorov náhodných čísel (nie predvídateľné sekvencie)  
- **Väzba na používateľa**: Väzba ID relácií na informácie špecifické pre používateľa pomocou bezpečných formátov ako `<user_id>:<session_id>`  
- **Ovládanie životného cyklu relácie**: Implementujte správnu expiráciu, rotáciu a neplatnenie relácií  
- **Bezpečnostné hlavičky relácie**: Používajte primerané HTTP bezpečnostné hlavičky na ochranu relácií  

### 9. Špecifické bezpečnostné kontroly pre AI
- **Obrana proti prompt injection**: Nasadzujte Microsoft Prompt Shields so spotlightingom, oddeľovačmi a technikami označovania dát  
- **Prevencia otravy nástrojov**: Overujte metaúdaje nástrojov, monitorujte dynamické zmeny a overujte integritu nástrojov  
- **Validácia výstupov modelu**: Skenujte výstupy modelov na potenciálne úniky dát, škodlivý obsah alebo porušenia bezpečnostnej politiky  
- **Ochrana kontextového okna**: Implementujte kontroly na prevenciu otravy a manipulácie kontextového okna  

### 10. Bezpečné vykonávanie nástrojov
- **Sandboxing vykonávania**: Spúšťajte nástroje v kontajnerizovaných, izolovaných prostrediach s limitmi zdrojov  
- **Oddelenie privilégií**: Vykonávajte nástroje s minimálnymi potrebnými privilégiami a oddelenými servisnými účtami  
- **Sieťová izolácia**: Implementujte segmentáciu siete pre prostredia vykonávania nástrojov  
- **Monitorovanie vykonávania**: Sledujte vykonávanie nástrojov pre anomálne správanie, využitie zdrojov a porušenia bezpečnosti  

### 11. Kontinuálna validácia bezpečnosti
- **Automatizované bezpečnostné testovanie**: Integrujte bezpečnostné testovanie do CI/CD pipeline s nástrojmi ako GitHub Advanced Security  
- **Správa zraniteľností**: Pravidelne skenujte všetky závislosti vrátane AI modelov a externých služieb  
- **Penetračné testovanie**: Vykonávajte pravidelné bezpečnostné audity špecificky zamerané na implementácie MCP  
- **Bezpečnostné kódové revízie**: Implementujte povinné bezpečnostné revízie pre všetky zmeny kódu súvisiace s MCP  

### 12. Bezpečnosť dodávateľského reťazca pre AI
- **Overovanie komponentov**: Overujte pôvod, integritu a bezpečnosť všetkých AI komponentov (modely, embeddingy, API)  
- **Správa závislostí**: Udržiavajte aktuálne inventáre všetkých softvérových a AI závislostí s evidenciou zraniteľností  
- **Dôveryhodné úložiská**: Používajte overené, dôveryhodné zdroje pre všetky AI modely, knižnice a nástroje  
- **Monitorovanie dodávateľského reťazca**: Neustále monitorujte kompromisy u poskytovateľov AI služieb a modelových úložísk  

## Pokročilé bezpečnostné vzory

### Architektúra Zero Trust pre MCP
- **Nikdy neveriť, vždy overovať**: Implementujte kontinuálne overovanie všetkých MCP účastníkov  
- **Mikrosegmentácia**: Izolujte MCP komponenty s granulárnymi sieťovými a identitnými kontrolami  
- **Podmienený prístup**: Implementujte rizikom podmienené prístupové kontroly, ktoré sa prispôsobujú kontextu a správaniu  
- **Kontinuálne hodnotenie rizík**: Dynamicky vyhodnocujte bezpečnostnú polohu na základe aktuálnych indikátorov hrozieb  

### Implementácia AI šetriaca súkromie
- **Minimalizácia dát**: Zdieľajte iba minimálny nevyhnutný objem dát pre každú MCP operáciu  
- **Diferenciálne súkromie**: Implementujte techniky šetriace súkromie na spracovanie citlivých dát  
- **Homomorfné šifrovanie**: Používajte pokročilé šifrovacie techniky na bezpečné výpočty nad zašifrovanými dátami  
- **Federatívne učenie**: Implementujte distribuované prístupy učenia, ktoré zachovávajú lokálnosť a súkromie dát  

### Reakcia na incidenty pre AI systémy
- **Postupy pre AI špecifické incidenty**: Vyvíjajte postupy reakcie na incidenty prispôsobené AI a MCP špecifickým hrozbám  
- **Automatizovaná reakcia**: Implementujte automatizované obmedzenie a nápravu bežných AI bezpečnostných incidentov  
- **Forenzné schopnosti**: Udržiavajte forenznú pripravenosť pre kompromisy AI systémov a úniky dát  
- **Postupy obnovy**: Stanovte postupy na obnovu po otrave AI modelov, útokoch prompt injection a kompromisoch služieb  

## Zdroje a štandardy pre implementáciu

### 🏔️ Praktický bezpečnostný tréning
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komplexný praktický workshop na zabezpečenie MCP serverov v Azure  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenčná architektúra a implementačné pokyny pre OWASP MCP Top 10  

### Oficiálna dokumentácia MCP
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Aktuálna špecifikácia MCP protokolu  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Oficiálne bezpečnostné pokyny  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Vzory autentifikácie a autorizácie  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Požiadavky na transportnú bezpečnosť  

### Microsoft bezpečnostné riešenia
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Pokročilá ochrana proti prompt injection  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Komplexné filtrovanie AI obsahu  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Správa podnikovej identity a prístupov  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Bezpečné ukladanie tajomstiev a poverení  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Skúmanie bezpečnosti dodávateľského reťazca a kódu  

### Bezpečnostné štandardy a rámce
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Aktuálne odporúčania pre bezpečnosť OAuth  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Riziká bezpečnosti webových aplikácií  
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - AI špecifické bezpečnostné riziká  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Komplexné riadenie rizík pre AI  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Systémy manažmentu informačnej bezpečnosti  

### Implementačné príručky a návody
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Podnikové vzory autentifikácie  
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integrácia poskytovateľa identity  
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Najlepšie praktiky správy tokenov  
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Pokročilé vzory šifrovania  

### Pokročilé bezpečnostné zdroje
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Praktiky bezpečného vývoja  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI špecifické bezpečnostné testovanie  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodológia modelovania hrozieb pre AI  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Techniky šetriace súkromie v AI  

### Súlad a správa
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Súlad s ochranou súkromia v AI systémoch  
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Implementácia zodpovednej AI  
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Bezpečnostné kontroly poskytovateľov AI služieb  
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Požiadavky na súlad pre zdravotnícku AI  

### DevSecOps a automatizácia
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Bezpečné vývojové pipeline pre AI  
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Kontinuálna validácia bezpečnosti  
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Bezpečné nasadzovanie infraštruktúry  
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Bezpečnosť kontajnerizácie AI záťaží  

### Monitorovanie a reakcia na incidenty  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Komplexné monitorovacie riešenia  
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - AI špecifické postupy reakcie na incidenty  
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Správa bezpečnostných informácií a udalostí  
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Zdroje inteligencie o AI hrozbách  

## 🔄 Neustále zlepšovanie

### Sledujte aktuálne vývojové štandardy
- **Aktualizácie MCP špecifikácie**: Sledujte oficiálne zmeny špecifikácie MCP a bezpečnostné upozornenia  
- **Inteligencia o hrozbách**: Prihláste sa na odbery kanálov s informáciami o AI bezpečnostných hrozbách a databáz zraniteľností  
- **Zapojenie komunity**: Zúčastňujte sa diskusií a pracovných skupín komunity MCP bezpečnosti
- **Pravidelné hodnotenie**: Vykonávajte štvrťročné hodnotenia bezpečnostnej situácie a podľa toho aktualizujte praktiky

### Príspevok k MCP bezpečnosti
- **Bezpečnostný výskum**: Prispievajte k výskumu bezpečnosti MCP a programom zverejňovania zraniteľností
- **Zdieľanie najlepších praktík**: Zdieľajte bezpečnostné implementácie a získané skúsenosti s komunitou
- **Vývoj štandardov**: Zúčastňujte sa vývoja špecifikácií MCP a tvorby bezpečnostných štandardov
- **Vývoj nástrojov**: Vyvíjajte a zdieľajte bezpečnostné nástroje a knižnice pre ekosystém MCP

---

*Tento dokument odráža najlepšie bezpečnostné praktiky MCP k 18. decembru 2025, založené na špecifikácii MCP 2025-11-25. Bezpečnostné praktiky by sa mali pravidelne prehodnocovať a aktualizovať podľa vývoja protokolu a hrozobnej situácie.*

## Čo ďalej

- Čítať: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Návrat na: [Security Module Overview](./README.md)
- Pokračovať na: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Všeobecné upozornenie**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, berte prosím na vedomie, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho rodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->