# 3. forgatókönyv: Beépített dokumentáció az MCP szerverrel VS Code-ban

## Áttekintés

Ebben a forgatókönyvben megtanulod, hogyan hozhatod be a Microsoft Learn dokumentációját közvetlenül a Visual Studio Code környezetedbe az MCP szerver segítségével. Ahelyett, hogy folyamatosan böngészőfüleket váltogatnál a keresés során, a hivatalos dokumentációt közvetlenül a szerkesztődben érheted el, keresheted és hivatkozhatod. Ez a megközelítés egyszerűsíti a munkafolyamatodat, segít fókuszálni, és zökkenőmentes integrációt biztosít olyan eszközökkel, mint a GitHub Copilot.

- Dokumentáció keresése és olvasása közvetlenül VS Code-ban, anélkül, hogy elhagynád a kódoló környezetet.
- Dokumentációs hivatkozások beszúrása közvetlenül a README vagy tananyag fájlokba.
- Használd együtt a GitHub Copilotot és az MCP-t egy zökkenőmentes, mesterséges intelligencia-vezérelt dokumentációs munkafolyamathoz.

## Tanulási célok

A fejezet végére megérted, hogyan állítsd be és használd az MCP szervert a VS Code-ban a dokumentációs és fejlesztési munkafolyamatod javításához. Képes leszel:

- Konfigurálni a munkaterületedet az MCP szerver használatára dokumentáció kereséséhez.
- Dokumentáció keresése és beszúrása közvetlenül a VS Code-on belül.
- Egyesíteni a GitHub Copilot és az MCP erejét egy hatékonyabb, mesterséges intelligencia által támogatott munkafolyamathoz.

Ezek a készségek segítenek abban, hogy fókuszált maradj, javítsd a dokumentáció minőségét, és növeld a produktivitásodat fejlesztőként vagy műszaki íróként.

## Megoldás

Az in-szerkesztő dokumentációs hozzáférés eléréséhez kövesd a lépéseket, amelyek integrálják az MCP szervert a VS Code-dal és a GitHub Copilottal. Ez a megoldás ideális tanfolyam szerzőknek, dokumentáció íróknak és fejlesztőknek, akik a szerkesztőben szeretnék tartani a fókuszukat, miközben dolgoznak a dokumentációval és a Copilottal.

- Gyorsan adj hozzá hivatkozásokat egy README-hez egy tanfolyam vagy projekt dokumentáció írása közben.
- Használd a Copilotot kód generálására, és az MCP-t releváns dokumentációk azonnali megtalálására és idézésére.
- Maradj fókuszált a szerkesztődben és növeld a produktivitásodat.

### Lépésről lépésre útmutató

Kezdj hozzá az alábbi lépésekkel. Minden egyes lépéshez adhatsz hozzá egy képernyőképet az assets mappából, hogy vizuálisan illusztráld a folyamatot.

1. **Add hozzá az MCP konfigurációt:**
   A projekt gyökérkönyvtárában hozz létre egy `.vscode/mcp.json` fájlt, és illeszd be a következő konfigurációt:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Ez a konfiguráció megmondja a VS Code-nak, hogyan csatlakozzon a [`Microsoft Learn Docs MCP szerverhez`](https://github.com/MicrosoftDocs/mcp).
   
   ![1. lépés: MCP.json hozzáadása a .vscode mappához](../../../../../../translated_images/hu/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Nyisd meg a GitHub Copilot Chat panelt:**
   Ha még nincs telepítve a GitHub Copilot kiterjesztésed, nyisd meg a Kiterjesztések nézetet a VS Code-ban, és telepítsd. Letöltheted közvetlenül a [Visual Studio Code Marketplace-ről](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Ezután nyisd meg a Copilot Chat panelt az oldalsávon.

   ![2. lépés: Nyisd meg a Copilot Chat panelt](../../../../../../translated_images/hu/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Engedélyezd az ügynök (agent) módot és ellenőrizd az eszközöket:**
   A Copilot Chat panelen kapcsold be az ügynök módot.

   ![3. lépés: Ügynök mód engedélyezése és eszközök ellenőrzése](../../../../../../translated_images/hu/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Az ügynök mód bekapcsolása után ellenőrizd, hogy az MCP szerver szerepel-e az elérhető eszközök között. Ez biztosítja, hogy a Copilot ügynök hozzáfér a dokumentációs szerverhez, hogy lekérje a releváns információkat.
   
   ![3. lépés: Ellenőrizd az MCP szerver eszközt](../../../../../../translated_images/hu/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Indíts új csevegést és kérdezd az ügynököt:**
   Nyiss meg egy új csevegést a Copilot Chat panelen. Most már kérheted az ügynököt dokumentációs kérdésekkel. Az ügynök az MCP szervert használja, hogy közvetlenül az editorban megjelenítse a releváns Microsoft Learn dokumentációt.

   - *„Tanulási tervet akarok készíteni az X témához. 8 héten át fogom tanulni, minden hétre javasolj tartalmat, amit felvehetek.”*

   ![4. lépés: Kérdezd az ügynököt a csevegésben](../../../../../../translated_images/hu/step4-prompt-chat.12187bb001605efc.webp)

5. **Élő lekérdezés:**

   > Vegyünk egy élő lekérdezést a Microsoft Foundry Discord [#get-help](https://discord.gg/D6cRhjHWSC) szekcióból ([eredeti üzenet megtekintése](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *„Válaszokat keresek arra, hogyan lehet többügynökös megoldást telepíteni az Azure AI Foundry fejlesztette AI ügynökökkel. Azt látom, hogy nincs közvetlen telepítési mód, mint például a Copilot Studio csatornák. Szóval, milyen különböző módokon lehet ezt a telepítést megvalósítani vállalati felhasználóknak, hogy interakcióba lépjenek és elvégezzék a munkát? Számos cikk/blog van, amely azt állítja, hogy az Azure Bot szolgáltatást használhatjuk erre a munkára, amely hidat képezhet a MS Teams és az Azure AI Foundry ügynökök között. Ez működni fog, ha egy Azure botot állítok be, amely az Azure funkción keresztül kapcsolódik az Azure AI Foundry Orchestrator ügynökhöz az összehangoláshoz, vagy mindegyik AI ügynökhöz külön Azure funkciót kell létrehozni a Bot keretrendszeren belüli összehangoláshoz? Más javaslatokat is szívesen fogadok.”*

   ![5. lépés: Élő lekérdezések](../../../../../../translated_images/hu/step5-live-queries.49db3e4a50bea273.webp)

   Az ügynök releváns dokumentációs hivatkozásokkal és összefoglalókkal válaszol, melyeket közvetlenül beilleszthetsz a markdown fájljaidba vagy hivatkozásként használhatsz a kódban.
   
### Minta lekérdezések

Íme néhány példa lekérdezés, amelyeket kipróbálhatsz. Ezek a lekérdezések bemutatják, hogyan működhet együtt az MCP szerver és a Copilot azonnali, kontextusérzékeny dokumentáció és hivatkozások biztosításához anélkül, hogy elhagynád a VS Code-ot:

- „Mutasd meg, hogyan használjam az Azure Functions trigger-eket.”
- „Szúrj be egy hivatkozást az Azure Key Vault hivatalos dokumentációjára.”
- „Mik az Azure erőforrások biztonságos használatának legjobb gyakorlatai?”
- „Keress egy gyors kezdő útmutatót az Azure AI szolgáltatásokhoz.”

Ezek a lekérdezések bemutatják, hogyan működhet együtt az MCP szerver és a Copilot azonnali, kontextusérzékeny dokumentáció és hivatkozások biztosításához anélkül, hogy elhagynád a VS Code-ot.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->