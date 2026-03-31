# Najboljše varnostne prakse MCP - posodobitev februar 2026

> **Pomembno**: Ta dokument odraža najnovejše varnostne zahteve [MCP specifikacije 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) in uradne [MCP varnostne najboljše prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Vedno se sklicujte na trenutno specifikacijo za najsodobnejša priporočila.

## 🏔️ Praktična varnostna usposabljanja

Za praktične izkušnje priporočamo **[delavnico MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** – celovito vodeno odpravo do varovanja MCP strežnikov v Azure. Delavnica pokriva vse OWASP MCP Top 10 tveganja z metodologijo "ranljivo → zloraba → popravilo → preverjanje".

Vse prakse v tem dokumentu se usklajujejo z **[OWASP MCP Azure varnostnim vodnikom](https://microsoft.github.io/mcp-azure-security-guide/)** za specifike izvedbe v Azure.

## Ključne varnostne prakse za implementacije MCP

Protokol Model Context uvaja edinstvene varnostne izzive, ki presegajo tradicionalno varnost programske opreme. Te prakse obravnavajo tako temeljne varnostne zahteve kot tudi specifične grožnje MCP, vključno z vnosom spodbud (prompt injection), zastrupanjem orodij, prevzemom sej, zmedami zaščitnika (confused deputy) in ranljivostmi pri prenosu žetonov.

### **OBVEZNE varnostne zahteve**

**Kritične zahteve iz MCP specifikacije:**

### **OBVEZNE varnostne zahteve**

**Kritične zahteve iz MCP specifikacije:**

> **NE SMEJO**: MCP strežniki **NE SMEJO** sprejemati nobenih žetonov, ki niso izrecno izdani za MCP strežnik  
>  
> **MORAJO**: MCP strežniki, ki izvajajo avtorizacijo, **MORAJO** preveriti VSE dohodne zahteve  
>  
> **NE SMEJO**: MCP strežniki **NE SMEJO** uporabljati sej za avtentikacijo  
>  
> **MORAJO**: MCP proxy strežniki, ki uporabljajo statične ID-je odjemalcev, **MORAJO** pridobiti soglasje uporabnika za vsakega dinamično registriranega odjemalca  

---

## 1. **Varnost žetonov in avtentikacija**

**Nadzori avtentikacije in avtorizacije:**
   - **Strogo pregledovanje avtorizacije**: Izvedite obsežne preglede avtorizacijske logike MCP strežnika, da zagotovite dostop samo za predvidene uporabnike in odjemalce  
   - **Integracija zunanjih ponudnikov identitet**: Uporabljajte uveljavljene ponudnike identitet, kot je Microsoft Entra ID, namesto lastne izvedbe avtentikacije  
   - **Preverjanje občinstva žetonov**: Vedno preverite, da so bili žetoni izrecno izdani za vaš MCP strežnik – nikoli ne sprejemajte žetonov od višje ravni  
   - **Pravilno upravljanje življenjskega cikla žetonov**: Izvajajte varno rotacijo, politike poteka in preprečujte ponavljajoče napade z žetoni  

**Zaščiteno shranjevanje žetonov:**
   - Uporabljajte Azure Key Vault ali podobne varne shrambe za vse skrivnosti  
   - Izvajajte šifriranje žetonov tako pri mirovanju kot med prenosom  
   - Redna rotacija poverilnic in nadzor za nepooblaščen dostop  

## 2. **Upravljanje sej in varnost transporta**

**Varne prakse sej:**
   - **Kriptografsko varni ID-ji sej**: Uporabljajte varne, nedeterministične ID-je sej, ustvarjene z varnimi generatorji naključnih števil  
   - **Specifično vezanje uporabnika**: Pripnite ID-je sej na identitete uporabnikov s formati, kot je `<user_id>:<session_id>`, da preprečite zlorabo sej med uporabniki  
   - **Upravljanje življenjskega cikla sej**: Izvajajte ustrezno potekanje, rotacijo in razveljavitev, da omejite ranljivosti  
   - **Zahteva HTTPS/TLS**: Obvezna uporaba HTTPS za vso komunikacijo, da preprečite prestrezanje ID-jev sej  

**Varnost sloja prenosa:**
   - Po možnosti konfigurirajte TLS 1.3 z ustreznim upravljanjem certifikatov  
   - Izvajajte zaklepanje certifikatov za kritične povezave  
   - Redna rotacija certifikatov in preverjanje veljavnosti  

## 3. **Zaščita pred grožnjami specifičnimi za AI** 🤖

**Obramba pred vnosom spodbud (Prompt Injection):**
   - **Microsoft Prompt Shields**: Uporabite AI Prompt Shields za napredno zaznavanje in filtriranje škodljivih navodil  
   - **Čiščenje vhodov**: Preverite in očistite vse vhode, da preprečite napade vstavljanja in zmedene zaščitnike  
   - **Meje vsebine**: Uporabljajte omejevalnike in sistem označevanja podatkov za razlikovanje med zaupanja vrednimi navodili in zunanjimi vsebinami  

**Preprečevanje zastrupitve orodij:**
   - **Preverjanje metapodatkov orodij**: Izvajajte integrite preglede definicij orodij in spremljajte nepredvidene spremembe  
   - **Dinamični nadzor orodij**: Spremljajte vedenje med izvajanjem in vzpostavite opozorila za nenavadne vzorce izvajanja  
   - **Delovni tokovi odobritve**: Zahtevajte izrecno uporabniško odobritev za spremembe orodij in zmožnosti  

## 4. **Nadzor dostopa in dovoljenja**

**Načelo najmanjših privilegijev:**
   - MCP strežnikom dodelite le najmanjša dovoljenja, potrebna za predvideno funkcionalnost  
   - Izvajajte nadzor dostopa na podlagi vlog (RBAC) z natančnimi dovoljenji  
   - Redni pregledi dovoljenj in neprekinjeno spremljanje za eskalacijo privilegijev  

**Nadzori dovoljenj med izvajanjem:**
   - Uporabite omejitve virov, da preprečite napade zaradi izčrpanosti virov  
   - Uporabite izolacijo kontejnerjev za okolja izvajanja orodij  
   - Izvajajte dostop "prav ob pravem času" za administrativne funkcije  

## 5. **Varnost vsebine in nadzor**

**Izvedba varnosti vsebine:**
   - **Integracija Azure Content Safety**: Uporabljajte Azure Content Safety za zaznavanje škodljive vsebine, poskusov jailbreak in kršitev politik  
   - **Analiza vedenja**: Izvajajte spremljanje vedenja v teku, da zaznate anomalije pri izvajanju MCP strežnikov in orodij  
   - **Celovito beleženje**: Beležite vse poskuse avtentikacije, klice orodij in varnostne dogodke z varno, zaščiteno shrambo  

**Neprekinjeno spremljanje:**
   - Opozorila v realnem času za sumljive vzorce in nepooblaščene poskuse dostopa  
   - Integracija s sistemi SIEM za centralizirano upravljanje varnostnih dogodkov  
   - Redni varnostni pregledi in penetracijsko testiranje MCP implementacij  

## 6. **Varnost dobavne verige**

**Preverjanje komponent:**
   - **Skeniranje odvisnosti**: Uporabite avtomatizirano skeniranje ranljivosti za vse programske odvisnosti in AI komponente  
   - **Preverjanje izvora**: Preverite izvor, licenciranje in integriteto modelov, virov podatkov in zunanjih storitev  
   - **Podpisani paketi**: Uporabljajte kriptografsko podpisane pakete in preverjajte podpise pred nameščanjem  

**Varen razvojni proces:**
   - **GitHub Advanced Security**: Uporabite skeniranje skrivnosti, analizo odvisnosti in statično analizo CodeQL  
   - **CI/CD varnost**: Integrirajte varnostno preverjanje skozi avtomatizirane procese nameščanja  
   - **Integriteta artefaktov**: Izvajajte kriptografsko preverjanje nameščenih artefaktov in konfiguracij  

## 7. **Varnost OAuth in preprečevanje zmedene zaščitnice**

**Implementacija OAuth 2.1:**
   - **PKCE implementacija**: Uporabljajte Proof Key for Code Exchange (PKCE) za vse avtorizacijske zahteve  
   - **Izrecno soglasje**: Pridobite soglasje uporabnika za vsakega dinamično registriranega odjemalca, da preprečite napade zmedene zaščitnice  
   - **Preverjanje URI za preusmeritev**: Izvajajte strogo preverjanje URI za preusmeritev in identifikatorjev odjemalcev  

**Varnost proxy strežnika:**
   - Preprečite mimo avtorizacije s zlorabo statičnih ID-jev odjemalcev  
   - Izvajajte ustrezne procese pridobivanja soglasij za dostop API-jev tretjih oseb  
   - Spremljajte krajo avtorizacijskih kod in nepooblaščene dostope do API-jev  

## 8. **Odgovor na incidente in okrevanje**

**Hitro odzivanje:**
   - **Avtomatiziran odziv**: Implementirajte avtomatizirane sisteme za rotacijo poverilnic in zajezitev groženj  
   - **Postopki razveljavitve**: Sposobnost hitrega vračanja na preverjene dobre konfiguracije in komponente  
   - **Sposobnosti forenzike**: Podrobni revizijski sledovi in beleženje za preiskavo incidentov  

**Komunikacija in koordinacija:**
   - Jasni postopki eskalacije za varnostne incidente  
   - Integracija z organizacijskimi ekipami za odziv na incidente  
   - Redne simulacije varnostnih incidentov in namizne vaje  

## 9. **Usklajenost in upravljanje**

**Regulativna skladnost:**
   - Zagotovite, da implementacije MCP izpolnjujejo industrijske zahteve (GDPR, HIPAA, SOC 2)  
   - Izvajajte klasifikacijo podatkov in kontrol nad zasebnostjo pri procesiranju AI podatkov  
   - Ohranjajte celovito dokumentacijo za presojo skladnosti  

**Upravljanje sprememb:**
   - Formalni postopki varnostnih pregledov za vse spremembe MCP sistemov  
   - Nadzor verzij in postopki odobritve sprememb konfiguracij  
   - Redne ocene skladnosti in analiza vrzeli  

## 10. **Napredni varnostni nadzori**

**Arhitektura ničelnega zaupanja:**
   - **Nikoli ne zaupaj, vedno preverjaj**: Neprestano preverjanje uporabnikov, naprav in povezav  
   - **Mikrosegmentacija**: Natančni omrežni nadzori za izolacijo posameznih MCP komponent  
   - **Pogojni dostop**: Dostopne kontrole, ki temeljijo na tveganju in se prilagajajo trenutnemu kontekstu ter vedenju  

**Zaščita aplikacij med izvajanjem:**
   - **Runtime Application Self-Protection (RASP)**: Uporabljajte RASP tehnike za zaznavanje groženj v realnem času  
   - **Nadzor zmogljivosti aplikacij**: Spremljajte anomalije zmogljivosti, ki lahko nakazujejo napade  
   - **Dinamične varnostne politike**: Izvajajte varnostne politike, ki se prilagajajo glede na trenutno varnostno stanje  

## 11. **Integracija z Microsoftovo varnostno infrastrukturo**

**Celovita Microsoftova varnost:**
   - **Microsoft Defender for Cloud**: Upravljanje varnostnega stanja oblaka za delovne obremenitve MCP  
   - **Azure Sentinel**: Cloud-native SIEM in SOAR zmogljivosti za napredno zaznavanje groženj  
   - **Microsoft Purview**: Upravljanje podatkov in skladnosti za AI delovne tokove in vire podatkov  

**Upravljanje identitet in dostopa:**
   - **Microsoft Entra ID**: Upravljanje identitete na ravni podjetja s pogojevnimi dostopnimi politikami  
   - **Privileged Identity Management (PIM)**: Dostop "prav ob pravem času" in odobritveni procesi za administrativne funkcije  
   - **Zaščita identitete**: Pogojevan dostop na podlagi tveganja in avtomatiziran odziv na grožnje  

## 12. **Neprekinjen razvoj varnosti**

**Bodite na tekočem:**
   - **Spremljanje specifikacij**: Redno pregledujte posodobitve MCP specifikacij in spremembe varnostnih smernic  
   - **Obveščevalne informacije o grožnjah**: Integracija podatkov o grožnjah specifičnih za AI in indikatorjev kompromitacije  
   - **Vključenost v varnostno skupnost**: Aktivno sodelovanje v MCP varnostni skupnosti in programih za razkritje ranljivosti  

**Prilagodljiva varnost:**
   - **Varnost strojnega učenja**: Uporabljajte zaznavanje anomalij na osnovi ML za odkrivanje novih vzorcev napadov  
   - **Napovedna varnostna analitika**: Izvajajte napovedne modele za proaktivno prepoznavanje groženj  
   - **Avtomatizacija varnosti**: Avtomatizirane posodobitve varnostnih politik na podlagi obveščevalnih podatkov in sprememb v specifikacijah  

---

## **Ključni varnostni viri**

### **Uradna MCP dokumentacija**
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP varnostne najboljše prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP avtorizacijska specifikacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP varnostni viri**
- [OWASP MCP Azure varnostni vodnik](https://microsoft.github.io/mcp-azure-security-guide/) - Celovit OWASP MCP Top 10 z implementacijo za Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Uradna OWASP MCP varnostna tveganja  
- [Delavnica MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktično varnostno usposabljanje za MCP v Azure  

### **Microsoftove varnostne rešitve**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Varnostni standardi**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 za velike jezikovne modele](https://genai.owasp.org/)
- [Okvir za upravljanje tveganj AI NIST](https://www.nist.gov/itl/ai-risk-management-framework)

### **Vodniki za implementacijo**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID z MCP strežniki](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Varnostno obvestilo**: Varnostne prakse MCP se hitro razvijajo. Vedno preverjajte trenutno [MCP specifikacijo](https://spec.modelcontextprotocol.io/) in [uradno varnostno dokumentacijo](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pred implementacijo.

## Kaj sledi

- Preberite: [MCP varnostni nadzori 2025](./mcp-security-controls-2025.md)
- Povratek na: [Pregled varnostnega modula](./README.md)
- Nadaljujte na: [Modul 3: Začetek](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Opozorilo**:  
To besedilo je bilo prevedeno z uporabo storitve za prevajanje z umetno inteligenco [Co-op Translator](https://github.com/Azure/co-op-translator). Kljub prizadevanjem za natančnost prosimo upoštevajte, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v maternem jeziku velja za avtoritativni vir. Za pomembne informacije priporočamo strokovni človeški prevod. Ne odgovarjamo za morebitne nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->