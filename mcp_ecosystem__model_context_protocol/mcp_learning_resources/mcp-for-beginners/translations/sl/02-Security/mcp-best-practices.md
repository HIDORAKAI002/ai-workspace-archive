# MCP Varnostne najboljše prakse 2025

Ta obsežen vodnik predstavlja bistvene varnostne najboljše prakse za implementacijo sistemov Model Context Protocol (MCP) na podlagi najnovejše **MCP specifikacije 2025-11-25** in trenutnih industrijskih standardov. Te prakse naslavljajo tako tradicionalne varnostne pomisleke kot tudi specifične grožnje AI, značilne za implementacije MCP.

## Kritične varnostne zahteve

### Obvezni varnostni ukrepi (ZAHTEVE MORATE IZPOLNITI)

1. **Preverjanje žetonov**: MCP strežniki **NE SMEJO** sprejemati nobenih žetonov, ki niso izrecno izdani za samega MCP strežnika  
2. **Preverjanje avtorizacije**: MCP strežniki, ki izvajajo avtorizacijo, **MORAJO** preveriti VSE dohodne zahteve in **NE SMEJO** uporabljati sej za avtentikacijo  
3. **Privolitev uporabnika**: MCP proxy strežniki, ki uporabljajo statične ID-je odjemalcev, **MORAJO** pridobiti izrecno privolitev uporabnika za vsak dinamično registriran odjemalec  
4. **Varnostni ID-ji sej**: MCP strežniki **MORAJO** uporabljati kriptografsko varne, nedeterministične ID-je sej, generirane z varnimi generatorji naključnih števil

## Osnovne varnostne prakse

### 1. Preverjanje in čiščenje vhodov
- **Celovito preverjanje vhodov**: Preverite in očistite vse vhode, da preprečite injekcijske napade, težave z zmedo zastopnika in ranljivosti injekcij v pozive  
- **Uveljavljanje sheme parametrov**: Implementirajte strogo validacijo JSON sheme za vse parametre orodij in vhodne podatke API-jev  
- **Filtriranje vsebin**: Uporabite Microsoft Prompt Shields in Azure Content Safety za filtriranje zlonamernih vsebin v pozivih in odzivih  
- **Čiščenje izhodov**: Preverite in očistite vse izhode modela, preden jih predstavite uporabnikom ali spodnjim sistemom

### 2. Odličnost v avtentikaciji in avtorizaciji
- **Zunanji ponudniki identitet**: Delegirajte avtentikacijo uveljavljenim ponudnikom identitet (Microsoft Entra ID, ponudniki OAuth 2.1) namesto implementacije lastne avtentikacije  
- **Finozrnate pravice**: Izvajajte granulirane, specifične pravice za orodja s principom najmanjših privilegijev  
- **Upravljanje življenjskega cikla žetonov**: Uporabljajte kratkotrajne dostopne žetone z varnim rotiranjem in pravilnim preverjanjem občinstva  
- **Večfaktorska avtentikacija**: Zahtevajte MFA za ves administrativni dostop in občutljive operacije

### 3. Varnostni komunikacijski protokoli
- **Transport Layer Security**: Uporabljajte HTTPS/TLS 1.3 za vso MCP komunikacijo z ustreznim preverjanjem certifikatov  
- **End-to-End šifriranje**: Implementirajte dodatne plasti šifriranja za zelo občutljive podatke v prenosu in med shranjevanjem  
- **Upravljanje certifikatov**: Vzdržujte pravilno upravljanje življenjskega cikla certifikatov z avtomatiziranimi postopki obnove  
- **Uveljavljanje različice protokola**: Uporabljajte trenutno različico MCP protokola (2025-11-25) z ustreznim dogovorom o različici

### 4. Napredno omejevanje hitrosti in zaščita virov
- **Večplastno omejevanje hitrosti**: Omejite hitrost na nivoju uporabnika, seje, orodja in virov, da preprečite zlorabe  
- **Prilagodljivo omejevanje hitrosti**: Uporabljajte omejevanje hitrosti, ki temelji na strojno učenih vzorcih uporabe in indikatorjih groženj  
- **Upravljanje kvote virov**: Nastavite primerne omejitve za računske vire, uporabo pomnilnika in čas izvajanja  
- **Zaščita pred DDoS**: Namestite celovite sisteme zaščite pred DDoS in analize prometa

### 5. Celovito beleženje in nadzor
- **Strukturirano revizijsko beleženje**: Implementirajte podrobne, iskalne zapise za vse MCP operacije, izvajanja orodij in varnostne dogodke  
- **Spremljanje varnosti v realnem času**: Uvedite SIEM sisteme z AI-podprtimi zaznavami anomalij za MCP delovne obremenitve  
- **Beleženje skladno z zasebnostjo**: Beležite varnostne dogodke ob upoštevanju zahtev in predpisov o varstvu podatkov  
- **Integracija odziva na incidente**: Povežite beležilne sisteme z avtomatiziranimi delovnimi tokovi odziva na incidente

### 6. Izboljšane prakse varnega shranjevanja
- **Strojni varnostni moduli**: Uporabljajte shranjevanje ključev podprto z HSM (Azure Key Vault, AWS CloudHSM) za ključne kriptografske operacije  
- **Upravljanje šifrirnih ključev**: Izvajajte ustrezno rotacijo, ločevanje in nadzore dostopa do šifrirnih ključev  
- **Upravljanje skrivnosti**: Shranjujte vse API ključe, žetone in poverilnice v namenskih sistemih za upravljanje skrivnosti  
- **Klasifikacija podatkov**: Klasificirajte podatke glede na občutljivost in uporabite ustrezne zaščitne ukrepe

### 7. Napredno upravljanje žetonov
- **Preprečevanje prehoda žetonov**: Izrecno prepovedujte vzorce prehodov žetonov, ki obidejo varnostne kontrole  
- **Preverjanje občinstva**: Vedno preverite, da se trditve o občinstvu žetona ujemajo z identiteto namenjenega MCP strežnika  
- **Avtorizacija na podlagi trditev**: Izvajajte finozrnato avtorizacijo na podlagi trditev v žetonu in atributov uporabnika  
- **Povezava žetonov**: Povežite žetone s specifičnimi sejami, uporabniki ali napravami, kjer je to primerno

### 8. Varnostno upravljanje sej
- **Kriptografski ID-ji sej**: Generirajte ID-je sej z uporabo kriptografsko varnih generatorjev naključnih števil (nepredvidljive zaporedja)  
- **Povezava s specifičnim uporabnikom**: Povežite ID-je sej z uporabniško specifičnimi informacijami z varnimi formati, kot je `<user_id>:<session_id>`  
- **Kontrole življenjskega cikla sej**: Izvajajte ustrezno potekanje, rotacijo in preklic sej  
- **Varnostni HTTP glavi za seje**: Uporabljajte ustrezne HTTP varnostne glave za zaščito sej

### 9. Specifični varnostni ukrepi za AI
- **Obramba pred injekcijo poziva**: Uporabljajte Microsoft Prompt Shields z izpostavitvijo, omejevalniki in tehnikami označevanja podatkov  
- **Preprečevanje zastrupljanja orodij**: Preverite meta podatke orodij, spremljajte dinamične spremembe in preverjajte integriteto orodij  
- **Preverjanje izhodov modela**: Skenirajte izhode modela glede potencialnega uhajanja podatkov, škodljivih vsebin ali kršitev varnostnih politik  
- **Zaščita okna konteksta**: Implementirajte kontrole za preprečevanje zastrupljanja in manipulacij okna konteksta

### 10. Varnost izvajanja orodij
- **Izvajanje v peskovniku**: Izvajajte orodja v kontejneriziranih, izoliranih okoljih z omejitvami virov  
- **Ločevanje privilegijev**: Izvajajte orodja z minimalnimi potrebnimi privilegiji in ločenimi servisnimi računi  
- **Omrežna izolacija**: Uvedite omrežno segmentacijo za okolja izvajanja orodij  
- **Nadzor izvajanja**: Spremljajte izvajanje orodij glede sumljivega vedenja, uporabe virov in varnostnih kršitev

### 11. Stalna varnostna validacija
- **Avtomatizirano varnostno testiranje**: Integrirajte varnostno testiranje v CI/CD pipeline s orodji, kot je GitHub Advanced Security  
- **Upravljanje ranljivosti**: Redno pregledujte vse odvisnosti, vključno z AI modeli in zunanjimi storitvami  
- **Penetracijsko testiranje**: Izvajajte redne varnostne ocene, posebej usmerjene na implementacije MCP  
- **Varnostni pregledi kode**: Izvajajte obvezne varnostne preglede vseh sprememb kode, povezanih z MCP

### 12. Varnost dobavne verige za AI
- **Preverjanje komponent**: Preverjajte izvor, integriteto in varnost vseh AI komponent (modeli, embeddingi, API-ji)  
- **Upravljanje odvisnosti**: Vzdržujte ažurne sezname vseh programski in AI odvisnosti z beleženjem ranljivosti  
- **Zaupanja vredni repozitoriji**: Uporabljajte preverjene, zaupanja vredne vire za vse AI modele, knjižnice in orodja  
- **Spremljanje dobavne verige**: Nenehno spremljajte kompromis v ponudnikih AI storitev in repozitorijih modelov

## Napredni varnostni vzorci

### Arhitektura ničelnega zaupanja za MCP
- **Nikoli ne zaupaj, vedno preverjaj**: Izvajajte stalno preverjanje za vse udeležence MCP  
- **Mikro-segmentacija**: Izolirajte MCP komponente z granuliranimi omrežnimi in identitetrskimi kontrolami  
- **Pogojni dostop**: Izvajajte dostopne kontrole na podlagi tveganja, ki se prilagajajo kontekstu in vedenju  
- **Stalna ocena tveganja**: Dinamično ocenjujte varnostni položaj glede na trenutne indikatorje groženj

### Implementacija zasebnosti ohranjajoče AI
- **Minimizacija podatkov**: Razkrijte le najmanj potrebne podatke za posamezno MCP operacijo  
- **Diferencialna zasebnost**: Izvajajte tehnike ohranjanja zasebnosti pri obdelavi občutljivih podatkov  
- **Homomorfno šifriranje**: Uporabljajte napredne šifrirne tehnike za varne izračune na šifriranih podatkih  
- **Federirano učenje**: Izvajajte distribuirane pristope učenja, ki ohranjajo lokalnost podatkov in zasebnost

### Odziv na incidente za AI sisteme
- **Specifični postopki za AI incidente**: Razvijte postopke odziva na incidente prilagojene za AI in specifične grožnje MCP  
- **Avtomatiziran odziv**: Implementirajte avtomatizirano omejitev in odpravo za pogoste varnostne incidente AI  
- **Forenzične sposobnosti**: Vzdržujte forenzično pripravljenost za kompromitacijo AI sistemov in uhajanja podatkov  
- **Postopki okrevanja**: Ustanovite postopke za okrevanje od zastrupljanja AI modelov, napadov injekcij pozivov in kompromisov storitev

## Viri in standardi za implementacijo

### 🏔️ Praktična varnostna izobraževanja
- **[MCP Security Summit delavnica (Sherpa)](https://azure-samples.github.io/sherpa/)** - Celovita praktična delavnica za varovanje MCP strežnikov v Azure  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenčna arhitektura in navodila za izvajanje OWASP MCP Top 10

### Uradna MCP dokumentacija
- [MCP Specificacija 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Trenutna specifikacija MCP protokola  
- [MCP Varnostne najboljše prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Uradna varnostna navodila  
- [MCP Specifikacija avtorizacije](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Vzorci avtentikacije in avtorizacije  
- [MCP Transportna varnost](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Zahteve za varnost transportne plasti

### Microsoft varnostne rešitve
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Napredna zaščita pred injekcijo pozivov  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Celovito filtriranje vsebin AI  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Upravljanje identitet in dostopa za podjetja  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Varen sistem upravljanja skrivnosti in poverilnic  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Pregledovanje varnosti dobavne verige in kode

### Varnostni standardi in okviri
- [OAuth 2.1 Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Trenutna varnostna navodila za OAuth  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Varnostna tveganja spletnih aplikacij  
- [OWASP Top 10 za LLM-je](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Specifična varnostna tveganja za AI  
- [NIST Okvir za upravljanje tveganj AI](https://www.nist.gov/itl/ai-risk-management-framework) - Celovito upravljanje tveganj AI  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Sistemi upravljanja informacijske varnosti

### Vodniki in vadnice za implementacijo
- [Azure API Management kot MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Vzorci avtentikacije za podjetja  
- [Microsoft Entra ID z MCP strežniki](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integracija ponudnika identitete  
- [Implementacija varnega shranjevanja žetonov](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Najboljše prakse upravljanja žetonov  
- [End-to-End šifriranje za AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Napredni šifrirni vzorci

### Napredni varnostni viri
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Prakse varnega razvoja  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - Specifično varnostno testiranje AI  
- [Modeliranje groženj za AI sisteme](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodologija modeliranja groženj AI  
- [Inženiring zasebnosti za AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Tehnike ohranjanja zasebnosti AI

### Skladnost in upravljanje
- [GDPR skladnost za AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Skladnost z zasebnostjo v AI sistemih  
- [Okvir upravljanja AI](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Odgovorna implementacija AI  
- [SOC 2 za AI storitve](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Varnostni kontrolni mehanizmi za AI ponudnike storitev  
- [HIPAA skladnost za AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Zahteve skladnosti za zdravstveno varstvo AI

### DevSecOps in avtomatizacija
- [DevSecOps pipeline za AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Varni razvojni pipelines za AI  
- [Avtomatizirano varnostno testiranje](https://learn.microsoft.com/security/engineering/devsecops) - Stalna varnostna validacija  
- [Varnost infrastrukture kot kode](https://learn.microsoft.com/security/engineering/infrastructure-security) - Varno uvajanje infrastrukture  
- [Varnost kontejnerjev za AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Varnost kontejnerizacije AI delovnih obremenitev

### Spremljanje in odziv na incidente  
- [Azure Monitor za AI delovne obremenitve](https://learn.microsoft.com/azure/azure-monitor/overview) - Celovite rešitve za nadzor  
- [Odziv na AI varnostne incidente](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Specifični postopki odziva za AI  
- [SIEM za AI sisteme](https://learn.microsoft.com/azure/sentinel/overview) - Upravljanje varnostnih informacij in dogodkov  
- [Obveščanje o grožnjah za AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Viri obveščanja o grožnjah AI

## 🔄 Stalno izboljševanje

### Ostanite v koraku z razvijajočimi se standardi
- **Posodobitve MCP specifikacije**: Spremljajte uradne spremembe MCP specifikacij in varnostne nasvete  
- **Obveščanje o grožnjah**: Naročite se na vire groženj AI varnosti in baze ranljivosti  
- **Vključenost skupnosti**: Sodelujte v razpravah in delovnih skupinah MCP varnostne skupnosti
- **Redna ocena**: Opravite četrtletne ocene varnostnega stanja in ustrezno posodobite prakse

### Prispevanje k MCP varnosti
- **Varnostne raziskave**: Prispevajte k raziskavam varnosti MCP in programom razkrivanja ranljivosti
- **Deljenje najboljših praks**: Delite varnostne implementacije in pridobljene izkušnje s skupnostjo
- **Razvoj standardov**: Sodelujte pri razvoju specifikacij MCP in ustvarjanju varnostnih standardov
- **Razvoj orodij**: Razvijajte in delite varnostna orodja ter knjižnice za MCP ekosistem

---

*Ta dokument odraža najboljše varnostne prakse MCP s 18. decembrom 2025, na podlagi MCP specifikacije 2025-11-25. Varnostne prakse je treba redno pregledovati in posodabljati glede na razvoj protokola in groženj.*

## Kaj sledi

- Preberite: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Vrnite se na: [Security Module Overview](./README.md)
- Nadaljujte na: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:  
Ta dokument je bil preveden z uporabo storitve za samodejni prevod AI [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko samodejni prevodi vsebujejo napake ali netočnosti. Izvirni dokument v izvirnem jeziku velja za uradni vir. Za ključne informacije priporočamo profesionlni človeški prevod. Nismo odgovorni za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->