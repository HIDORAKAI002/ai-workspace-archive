# MCP Biztonsági Legjobb Gyakorlatok - 2026 Februári Frissítés

> **Fontos**: Ez a dokumentum a legújabb [MCP Specifikáció 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) biztonsági követelményeit és a hivatalos [MCP Biztonsági Legjobb Gyakorlatokat](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) tükrözi. Mindig a legfrissebb útmutatásért hivatkozzon a jelenlegi specifikációra.

## 🏔️ Gyakorlati Biztonsági Képzés

A gyakorlati megvalósítási tapasztalat érdekében ajánljuk a **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** oktatást – egy átfogó, vezetett expedíciót az MCP szerverek Azure-ban történő biztonságossá tételéhez. Az oktatás az összes OWASP MCP Top 10 kockázatot lefedi a "sebezhető → kihasználás → javítás → ellenőrzés" módszertanin keresztül.

Ebben a dokumentumban szereplő összes gyakorlat összhangban van az **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** útmutatóval az Azure-specifikus megvalósításhoz.

## Alapvető Biztonsági Gyakorlatok MCP Megvalósításokhoz

A Model Context Protocol egyedi biztonsági kihívásokat hoz, amelyek túlmutatnak a hagyományos szoftverbiztonságon. Ezek a gyakorlatok lefedik az alapvető biztonsági követelményeket és az MCP-specifikus fenyegetéseket, beleértve a prompt injectiont, eszközmérgezést, munkamenet eltérítést, összezavart helyettes problémákat és token átadási sérülékenységeket.

### **KÖTELEZŐ Biztonsági Követelmények**

**Kritikus követelmények az MCP specifikációból:**

### **KÖTELEZŐ Biztonsági Követelmények**

**Kritikus követelmények az MCP specifikációból:**

> **NEM SZABAD**: Az MCP szervereknek **NEM SZABAD** elfogadniuk olyan tokeneket, amelyeket nem kifejezetten az MCP szerver számára bocsátottak ki  
>  
> **KELL**: Az MCP szerverek, amelyek engedélyezést valósítanak meg, **KELL** ellenőrizzék MINDEN bejövő kérést  
>  
> **NEM SZABAD**: Az MCP szerverek **NEM SZABAD** munkameneteket használni hitelesítésre  
>  
> **KELL**: Az MCP proxy szerverek, amelyek statikus kliensazonosítókat használnak, **KELL** minden dinamikusan regisztrált klienshez felhasználói hozzájárulást szerezni

---

## 1. **Token Biztonság & Hitelesítés**

**Hitelesítés & Engedélyezés Vezérlők:**
   - **Szigorú Engedélyezés Áttekintés**: Végezzünk átfogó auditokat az MCP szerver engedélyezési logikájáról, hogy csak a szándékolt felhasználók és kliensek férhessenek hozzá az erőforrásokhoz  
   - **Külső Identitásszolgáltató Integráció**: Használjunk olyan bevált identitásszolgáltatókat, mint a Microsoft Entra ID ahelyett, hogy egyedi hitelesítést valósítanánk meg  
   - **Token Célközönség Érvényesítés**: Mindig ellenőrizzük, hogy a tokeneket kifejezetten az Ön MCP szervere számára bocsátották-e ki – soha ne fogadjuk el upstream tokeneket  
   - **Megfelelő Token Élettartam-kezelés**: Biztonságos token forgatást, lejárati szabályzatokat valósítsunk meg, és akadályozzuk meg a token ismétlődéses támadásokat  

**Védett Token Tárolás:**
   - Használjunk Azure Key Vaultot vagy hasonló biztonságos hitelesítő adattárakat minden titokhoz  
   - Valósítsunk meg titkosítást a tokeneken mind tárolás, mind átvitel közben  
   - Rendszeres hitelesítő forgatás és illetéktelen hozzáférés figyelés  

## 2. **Munkamenet-kezelés & Hálózati Biztonság**

**Biztonságos Munkamenet Gyakorlatok:**
   - **Kriptográfiailag Biztonságos Munkamenet Azonosítók**: Használjunk biztonságos, nem determinisztikus munkamenet-azonosítókat, amelyeket biztonságos véletlenszám generátorokkal hoztak létre  
   - **Felhasználó-specifikus Kötés**: Kösse a munkamenet-azonosítókat felhasználói identitásokhoz a `<user_id>:<session_id>` formátumban, hogy megakadályozza a munkamenet visszaéléseket más felhasználók között  
   - **Munkamenet Élettartam-kezelés**: Megfelelő lejáratot, forgatást és érvénytelenítést valósítson meg a sérülékenységi ablakok korlátozására  
   - **HTTPS/TLS Kötelező Használat**: Minden kommunikáció HTTPS-en keresztül kötelező a munkamenet azonosító elfogásának megakadályozására  

**Hálózati Réteg Biztonság:**
   - Konfigurálja a TLS 1.3-at, ahol csak lehetséges, megfelelő tanúsítványkezeléssel  
   - Alkalmazzon tanúsítvány pinninget kritikus kapcsolatokhoz  
   - Rendszeres tanúsítvány forgatás és érvényesség ellenőrzés  

## 3. **AI-specifikus Fenyegetettség Védelme** 🤖

**Prompt Injection Védelem:**
   - **Microsoft Prompt Shields**: Telepítsen AI Prompt Shield-eket a rosszindulatú utasítások fejlett felismerésére és szűrésére  
   - **Bemenet Tisztítása**: Érvényesítse és tisztítsa meg az összes bemenetet a beszúrási támadások és az összezavart helyettes problémák megelőzése érdekében  
   - **Tartalomhatarok**: Használjon elválasztó és adatjelölő rendszereket a megbízható utasítások és a külső tartalom megkülönböztetésére  

**Eszközmérgezés Megelőzése:**
   - **Eszköz Metaadat Érvényesítés**: Valósítson meg integritás-ellenőrzéseket az eszközdefiníciókhoz, és figyelje az váratlan változásokat  
   - **Dinamikus Eszközfigyelés**: Figyelje a futás közbeni viselkedést és állítson be riasztásokat váratlan végrehajtási mintákra  
   - **Jóváhagyási Munkafolyamatok**: Követelje meg a felhasználói egyértelmű jóváhagyást eszközmódosításokhoz és képességváltozásokhoz  

## 4. **Hozzáférés-szabályozás & Jogosultságok**

**A Minimális Jogosultság Elve:**
   - Csak a szükséges minimális jogosultságokat adja meg az MCP szervereknek a tervezett funkciókhoz  
   - Valósítson meg szerepalapú hozzáférés-vezérlést (RBAC) finomhangolt jogosultságokkal  
   - Rendszeres jogosultság-áttekintések és folyamatos figyelés a jogosultságkiterjesztések ellen  

**Futásidejű Jogosultság Vezérlés:**
   - Alkalmazzon erőforrás-korlátokat az erőforrás kimerülése elleni támadások megelőzésére  
   - Használjon konténer izolációt az eszközök futtatási környezetében  
   - Valósítson meg just-in-time hozzáférést az adminisztratív funkciókhoz  

## 5. **Tartalom Biztonság & Megfigyelés**

**Tartalom Biztonsági Megvalósítás:**
   - **Azure Content Safety Integráció**: Használja az Azure Content Safety-t káros tartalom, jailbreak kísérletek és szabályzatsértések felismerésére  
   - **Viselkedéselemzés**: Valósítson meg futásidejű viselkedési megfigyelést az MCP szerver és az eszközök végrehajtásának anomáliáinak észlelésére  
   - **Átfogó Naplózás**: Naplózzon minden hitelesítési kísérletet, eszközhívást és biztonsági eseményt biztonságos, manipulációbiztos tárolóban  

**Folyamatos Megfigyelés:**
   - Valós idejű riasztások gyanús mintákra és jogosulatlan hozzáférési kísérletekre  
   - Integráció SIEM rendszerekkel a központosított biztonsági eseménykezeléshez  
   - Rendszeres biztonsági auditok és penetrációs tesztek az MCP megvalósításokon  

## 6. **Ellátási Lánc Biztonság**

**Komponens Ellenőrzés:**
   - **Függőségvizsgálat**: Használjon automatizált sebezhetőség-ellenőrzést minden szoftver függőség és AI komponens esetén  
   - **Eredetiség Ellenőrzés**: Ellenőrizze modellek, adatforrások és külső szolgáltatások eredetét, licencelését és integritását  
   - **Aláírt Csomagok**: Használjon kriptográfiailag aláírt csomagokat, és ellenőrizze az aláírásokat telepítés előtt  

**Biztonságos Fejlesztési Folyamat:**
   - **GitHub Advanced Security**: Valósítson meg titok szkennelést, függőség analízist és CodeQL statikus elemzést  
   - **CI/CD Biztonság**: Integrálja a biztonsági ellenőrzéseket az automatizált telepítési folyamatokba  
   - **Artefaktum Integritás**: Valósítson meg kriptográfiai ellenőrzést az üzembe helyezett artefaktumok és konfigurációk esetén  

## 7. **OAuth Biztonság & Összezavart Helyettes Megelőzés**

**OAuth 2.1 Megvalósítás:**
   - **PKCE Megvalósítás**: Használjon Proof Key for Code Exchange (PKCE) minden engedélyezési kéréshez  
   - **Egyértelmű Hozzájárulás**: Szerezzen felhasználói hozzájárulást minden dinamikusan regisztrált kliens esetén az összezavart helyettes támadások megelőzésére  
   - **Átirányítás URI Érvényesítés**: Vigyen be szigorú validálást az átirányítási URI-k és kliensazonosítók esetén  

**Proxy Biztonság:**
   - Megakadályozza az engedélyezési kikerülést statikus kliensazonosító kihasználásával  
   - Valósítson meg megfelelő hozzájárulási munkafolyamatokat harmadik fél API hozzáféréshez  
   - Figyelje az engedélyezési kód lopást és a jogosulatlan API hozzáférést  

## 8. **Incidens Válasz & Helyreállítás**

**Gyors Reagálási Képességek:**
   - **Automatizált Válasz**: Valósítson meg automatizált rendszereket hitelesítők forgatására és fenyegetés korlátozására  
   - **Visszaállítási Eljárások**: Képesség gyorsan visszaállítani ismert jó konfigurációkat és komponenseket  
   - **Forenzikus Képességek**: Részletes audit nyomvonalak és naplózás az incidensek vizsgálatához  

**Kommunikáció & Koordináció:**
   - Egyértelmű eszkalációs eljárások biztonsági események esetére  
   - Integráció a szervezeti incidens-válasz csapatokkal  
   - Rendszeres biztonsági incidens szimulációk és asztali gyakorlatok  

## 9. **Megfelelés & Irányítás**

**Szabályozói Megfelelés:**
   - Biztosítsa, hogy az MCP megvalósítások megfeleljenek az iparágspecifikus követelményeknek (GDPR, HIPAA, SOC 2)  
   - Valósítson meg adat osztályozást és adatvédelmi szabályozásokat az AI adatfeldolgozásra  
   - Tartson fenn átfogó dokumentációt a megfelelőségi auditokhoz  

**Változásmenedzsment:**
   - Formális biztonsági felülvizsgálati folyamat minden MCP rendszer módosításához  
   - Verziókövetés és jóváhagyási munkafolyamatok konfigurációs változásokhoz  
   - Rendszeres megfelelőségi értékelések és hiányelemzések  

## 10. **Fejlett Biztonsági Vezérlők**

**Zero Trust Architektúra:**
   - **Soha ne bízzon meg, mindig ellenőrizzen**: Folyamatos ellenőrzés felhasználókban, eszközökben és kapcsolatokban  
   - **Mikro-szegmentáció**: Granuláris hálózati vezérlés az egyes MCP komponensek izolálására  
   - **Feltételes Hozzáférés**: Kockázatalapú hozzáférési vezérlések, amelyek alkalmazkodnak a jelenlegi kontextushoz és viselkedéshez  

**Futásidejű Alkalmazás-védelem:**
   - **Runtime Application Self-Protection (RASP)**: Telepítsen RASP technikákat valós idejű fenyegetés észlelésre  
   - **Alkalmazás Teljesítményfigyelés**: Figyelje az anomáliákat a teljesítményben, amelyek támadások jelei lehetnek  
   - **Dinamikus Biztonsági Szabályzatok**: Biztonsági szabályzatokat alkalmazzon, amelyek alkalmazkodnak a jelenlegi fenyegetési környezethez  

## 11. **Microsoft Biztonsági Ökoszisztéma Integráció**

**Átfogó Microsoft Biztonság:**
   - **Microsoft Defender for Cloud**: Felhőbiztonsági helyzet menedzsment MCP munkaterhelésekhez  
   - **Azure Sentinel**: Felhőnatív SIEM és SOAR képességek fejlett fenyegetés észleléshez  
   - **Microsoft Purview**: Adatkezelés és megfelelés AI munkafolyamatok és adatforrások esetén  

**Identitás- és Hozzáférés-kezelés:**
   - **Microsoft Entra ID**: Vállalati identitáskezelés feltételes hozzáférési szabályzatokkal  
   - **Privileged Identity Management (PIM)**: Just-in-time hozzáférés és jóváhagyási munkafolyamatok adminisztratív funkciókhoz  
   - **Identitásvédelem**: Kockázatalapú feltételes hozzáférés és automatizált fenyegetésválasz  

## 12. **Folyamatos Biztonsági Fejlődés**

**Naprakészség:**
   - **Specifikáció Figyelés**: Rendszeres áttekintése az MCP specifikáció frissítéseinek és biztonsági útmutatások változásainak  
   - **Fenyegetettségi Hírszerzés**: AI-specifikus fenyegetettségi hírcsatornák és kompromittálódási indikátorok integrációja  
   - **Biztonsági Közösségi Részvétel**: Aktív részvétel az MCP biztonsági közösségben és sebezhetőség bejelentési programokban  

**Adaptív Biztonság:**
   - **Gépi Tanulás Alapú Biztonság**: Használjon ML-alapú anomália detektálást új támadási minták azonosítására  
   - **Prediktív Biztonsági Analitika**: Alkalmazzon prediktív modelleket a proaktív fenyegetés azonosításhoz  
   - **Biztonsági Automatizáció**: Automatizált biztonsági szabályzat frissítések fenyegetés hírszerzés és specifikáció változások alapján  

---

## **Kritikus Biztonsági Források**

### **Hivatalos MCP Dokumentáció**
- [MCP Specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Biztonsági Legjobb Gyakorlatok](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Engedélyezési Specifikáció](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Biztonsági Források**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Átfogó OWASP MCP Top 10 Azure megvalósítással  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hivatalos OWASP MCP biztonsági kockázatok  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Gyakorlati biztonsági képzés MCP-hez Azure-ban  

### **Microsoft Biztonsági Megoldások**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Microsoft Entra ID Biztonság](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  

### **Biztonsági Szabványok**
- [OAuth 2.0 Biztonsági Legjobb Gyakorlatok (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 Nagy Nyelvi Modellekhez](https://genai.owasp.org/)  
- [NIST AI Kockázatkezelési Keretrendszer](https://www.nist.gov/itl/ai-risk-management-framework)  

### **Megvalósítási Útmutatók**
- [Azure API Management MCP Hitelesítési Átjáró](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
- [Microsoft Entra ID MCP szerverekhez](https://den.dev/blog/mcp-server-auth-entra-id-session/)  

---

> **Biztonsági Értesítés**: Az MCP biztonsági gyakorlatok gyorsan fejlődnek. Mindig ellenőrizze a jelenlegi [MCP specifikáció](https://spec.modelcontextprotocol.io/) és a [hivatalos biztonsági dokumentáció](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) alapján a megvalósítás előtt.

## Mi a Következő

- Olvassa el: [MCP Biztonsági Vezérlők 2025](./mcp-security-controls-2025.md)  
- Visszatérés ide: [Biztonsági Modul Áttekintés](./README.md)  
- Folytatás ide: [Modul 3: Kezdés](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősségkizárás**:
Ez a dokumentum az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár a pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások tartalmazhatnak hibákat vagy pontatlanságokat. Az eredeti dokumentum az anyanyelvén tekintendő hivatalos forrásnak. Fontos információk esetén professzionális emberi fordítást javaslunk. Nem vállalunk felelősséget az ebből a fordításból eredő félreértésekért vagy félreértelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->