# Tanulási terv generátor Chainlit és Microsoft Learn Docs MCP segítségével

## Előfeltételek

- Python 3.8 vagy újabb verzió
- pip (Python csomagkezelő)
- Internetkapcsolat a Microsoft Learn Docs MCP szerverhez való csatlakozáshoz

## Telepítés

1. Klónozd ezt a tárolót vagy töltsd le a projekt fájlokat.
2. Telepítsd a szükséges függőségeket:

   ```bash
   pip install -r requirements.txt
   ```

## Használat

### 1. Forgatókönyv: Egyszerű lekérdezés a Docs MCP-hez
Egy parancssori kliens, amely csatlakozik a Docs MCP szerverhez, elküld egy lekérdezést, és kiírja az eredményt.

1. Futtasd a szkriptet:
   ```bash
   python scenario1.py
   ```
2. Írd be a dokumentációs kérdésed a promptnál.

### 2. Forgatókönyv: Tanulási terv generátor (Chainlit webalkalmazás)
Egy webes felület (Chainlit használatával), amely lehetővé teszi a felhasználók számára, hogy személyre szabott, hét-hét tanulási tervet készítsenek bármely műszaki témában.

1. Indítsd el a Chainlit alkalmazást:
   ```bash
   chainlit run scenario2.py
   ```
2. Nyisd meg a terminálban megadott helyi URL-t (például http://localhost:8000) a böngésződben.
3. A chat ablakban írd be a tanulási témát és az eltervezett hetek számát (például: "AI-900 bizonyítvány, 8 hét").
4. Az alkalmazás válaszként hét-hétenkénti tanulási tervet fog megjeleníteni, Microsoft Learn dokumentációkra mutató hivatkozásokkal.

**Szükséges környezeti változók:**

A 2. forgatókönyv (Chainlit webalkalmazás Azure OpenAI-vel) használatához állítsd be a következő környezeti változókat egy `.env` fájlban a `python` könyvtárban:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Töltsd ki ezeket az értékeket az Azure OpenAI forrásod adataival, mielőtt futtatnád az alkalmazást.

> [!TIP]
> Saját modellek könnyen telepíthetők a [Microsoft Foundry](https://ai.azure.com/) segítségével.

### 3. Forgatókönyv: Beépített Docs MCP szerverrel Visual Studio Code-ban

Ahelyett, hogy böngészőfület váltanál a dokumentáció kereséséhez, behozhatod a Microsoft Learn Docs-ot közvetlenül a VS Code-ba az MCP szerveren keresztül. Ez lehetővé teszi, hogy:
- Dokumentációt keress és olvass a VS Code-ban anélkül, hogy elhagynád a kódoló környezeted.
- Hivatkozz dokumentációra és illessz be linkeket közvetlenül a README vagy tanfolyam fájlokba.
- Együtt használd a GitHub Copilotot és MCP-t egy zökkenőmentes, MI-alapú dokumentációs munkafolyamathoz.

**Példák használatra:**
- Gyorsan adj hozzá hivatkozási linkeket egy README-hez tanfolyam vagy projekt dokumentáció írásakor.
- Használd a Copilotot kódgenerálásra és MCP-t releváns dokumentumok gyors megtalálására és hivatkozására.
- Maradj fókuszban a szerkesztődben és növeld a termelékenységet.

> [!IMPORTANT]
> Győződj meg arról, hogy van érvényes [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) konfigurációd a munkaterületen (helye: `.vscode/mcp.json`).

## Miért Chainlit a 2. forgatókönyvhöz?

A Chainlit egy modern, nyílt forráskódú keretrendszer beszélgető webalkalmazások létrehozásához. Megkönnyíti csevegőalapú felhasználói felületek létrehozását, amelyek kapcsolódnak back-end szolgáltatásokhoz, mint például a Microsoft Learn Docs MCP szerverhez. Ez a projekt a Chainlit-et használja, hogy egyszerű, interaktív módon generáljon személyre szabott tanulási terveket valós időben. A Chainlit segítségével gyorsan építhetsz és telepíthetsz csevegőalapú eszközöket, amelyek növelik a termelékenységet és a tanulást.

## Mit csinál ez?

Ez az alkalmazás lehetővé teszi a felhasználók számára, hogy egyszerűen megadják a témát és az időtartamot, majd személyre szabott tanulási tervet készítsenek. Az alkalmazás feldolgozza a bemenetet, lekérdezést küld a Microsoft Learn Docs MCP szervernek a releváns tartalomért, majd eredményeket strukturált, hét-hétenkénti terv formájában rendezi. Az egyes hetek ajánlásai a chatben jelennek meg, így könnyű követni és nyomon követni a haladást. Az integráció garantálja, hogy mindig a legfrissebb és leginkább releváns tanulási forrásokhoz férsz hozzá.

## Minta lekérdezések

Próbáld ki ezeket a lekérdezéseket a chat ablakban, hogy lásd, hogyan válaszol az alkalmazás:

- `AI-900 bizonyítvány, 8 hét`
- `Azure Functions tanulás, 4 hét`
- `Azure DevOps, 6 hét`
- `Adatmérnökség Azure-on, 10 hét`
- `Microsoft biztonsági alapok, 5 hét`
- `Power Platform, 7 hét`
- `Azure AI szolgáltatások, 12 hét`
- `Felhő architektúra, 9 hét`

Ezek a példák megmutatják az alkalmazás rugalmasságát különféle tanulási célokhoz és időtartamokhoz.

## Hivatkozások

- [Chainlit dokumentáció](https://docs.chainlit.io/)
- [MCP dokumentáció](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->