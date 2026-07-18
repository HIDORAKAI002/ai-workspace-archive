# AGENTS.md

## Projekt áttekintése

Ez a tárhely az "AI ügynökök kezdőknek" című átfogó oktatási kurzust tartalmazza, amely mindent megtanít az AI ügynökök építéséhez szükséges tudásról. A kurzus 18 leckéből áll (számozva 00-18), amelyek a alapoktól, a tervezési mintákon, keretrendszereken, gyártási telepítésen, helyi/eszközön futó ügynökökön át az AI ügynökök biztonságáig terjednek.

**Fő technológiák:**
- Python 3.12+
- Jupyter jegyzetfüzetek interaktív tanuláshoz
- AI keretrendszerek: Microsoft Agent Framework (MAF)
- Azure AI szolgáltatások: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Architektúra:**
- Leckékre bontott struktúra (00-15+ mappák)
- Minden lecke tartalmaz: README dokumentációt, kódmintákat (Jupyter jegyzetfüzetek) és képeket
- Többnyelvű támogatás automatikus fordítórendszeren keresztül
- Minden leckéhez egy Python jegyzetfüzet a Microsoft Agent Framework használatával

## Telepítési parancsok

### Előfeltételek
- Python 3.12 vagy újabb
- Azure előfizetés (Microsoft Foundry számára)
- Azure CLI telepítve és hitelesítve (`az login`)

### Kezdeti beállítás

1. **Klónozza vagy forkolja a tárhelyet:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # VAGY
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Hozzon létre és aktiváljon Python virtuális környezetet:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Windows rendszeren: venv\Scripts\activate
   ```

3. **Telepítse a függőségeket:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Állítsa be a környezeti változókat:**
   ```bash
   cp .env.example .env
   # Szerkeszd a .env fájlt az API kulcsaid és végpontjaid megadásával
   ```

### Kötelező környezeti változók

A **Microsoft Foundry** esetén (kötelező):
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry projekt végpont
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - Modell telepítés neve (pl. gpt-4.1-mini)

Az **Azure AI Search** esetén (05-ös lecke - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI Search végpont
- `AZURE_SEARCH_API_KEY` - Azure AI Search API kulcs

Hitelesítés: Futassa az `az login` parancsot a jegyzetfüzetek futtatása előtt (az `AzureCliCredential` használatával).

## Fejlesztési munkafolyamat

### Jupyter jegyzetfüzetek futtatása

Minden lecke több Jupyter jegyzetfüzetet tartalmaz különböző keretrendszerekhez:

1. **Indítsa el a Jupyter-t:**
   ```bash
   jupyter notebook
   ```

2. **Navigáljon egy lecke könyvtárába** (pl. `01-intro-to-ai-agents/code_samples/`)

3. **Nyissa meg és futtassa a jegyzetfüzeteket:**
   - `*-python-agent-framework.ipynb` - Microsoft Agent Framework használatával (Python)
   - `*-dotnet-agent-framework.ipynb` - Microsoft Agent Framework használatával (.NET)

### Munka a Microsoft Agent Framework-kel

**Microsoft Agent Framework + Microsoft Foundry:**
- Azure előfizetés szükséges
- A FoundryChatClient-et használja az Agent Service V2-höz (az ügynökök láthatóak a Foundry portálon)
- Gyártásra kész, beépített megfigyelhetőséggel
- Fájlnév-minta: `*-python-agent-framework.ipynb`

## Tesztelési útmutató

Ez egy oktatási tárhely példakódokkal, nem gyártási kód automatizált tesztekkel. A beállítás és a változtatások ellenőrzéséhez:

### Manuális tesztelés

1. **Tesztelje a Python környezetet:**
   ```bash
   python --version  # Legalább 3.12-es verzió kell legyen
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Tesztelje a jegyzetfüzet futtatását:**
   ```bash
   # Jegyzetfüzet konvertálása szkriptté és futtatása (teszteli az importokat)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Ellenőrizze a környezeti változókat:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Egyedi jegyzetfüzetek futtatása

Nyissa meg a jegyzetfüzeteket a Jupyter-ben és hajtsa végre a cellákat sorban. Minden jegyzetfüzet önálló, és tartalmazza:
- Import utasításokat
- Konfiguráció betöltése
- Példa ügynök implementációkat
- Várt kimenetek markdown cellákban

### Telepített ügynökök gyors tesztelése

Azokon a leckéken, ahol az ügynök Microsoft Foundry hosztolt ügynökként van telepítve (01, 04, 05, 16), a repo az `tests/` almappában gyors teszt katalógusokat szállít, amelyeket a `.github/workflows/smoke-test.yml` munkafolyamat futtat a [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) akció segítségével. Ezek egy könnyű, telepítés utáni kaput jelentenek (elérhető-e az ügynök és követi-e az alap prompt elvárásokat?), kiegészítve a 10. és 16. leckék értékelési folyamatát. Lásd a [tests/README.md](./tests/README.md) fájlt a katalógus-lecke-ügynök leképezésért. A 17. lecke helyileg fut Foundry Local-lal, nincs hosztolt végpontja, ezért közvetlenül a jegyzetfüzete futtatásával validálható.

## Kódstílus

### Python konvenciók

- **Python verzió**: 3.12+
- **Kódstílus**: Kövesse a standard Python PEP 8 konvenciókat
- **Jegyzetfüzetek**: Használjon tiszta markdown cellákat a fogalmak magyarázatára
- **Importok**: Csoportosítsa a standard könyvtári, harmadik féltől származó és helyi importokat

### Jupyter jegyzetfüzet konvenciók

- Tartalmazzon leíró markdown cellákat a kódcellák előtt
- Adjon példakimeneteket a jegyzetfüzetekben referenciaszerűen
- Használjon egyértelmű változóneveket, amelyek megfelelnek a lecke fogalmainak
- Tartsa a jegyzetfüzet végrehajtási sorrendjét lineárisnak (1. cella → 2. cella → 3. cella…)

### Fájl szervezés

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Kiadás és Telepítés

### Dokumentáció építése

Ez a tárhely Markdown-t használ dokumentációhoz:
- README.md fájlok minden lecke mappában
- Fő README.md a tárhely gyökerében
- Automatikus fordítórendszer GitHub Actions segítségével

### CI/CD munkafolyamat

A `.github/workflows/` mappában található:

1. **co-op-translator.yml** - Automatikus fordítás több mint 50 nyelvre
2. **welcome-issue.yml** - Új issue létrehozók üdvözlése
3. **welcome-pr.yml** - Új pull request hozzájárulók üdvözlése

### Telepítés

Ez egy oktatási tárhely – nincs telepítési folyamat. A felhasználók:
1. Forkolják vagy klónozzák a tárhelyet
2. Futtatják a jegyzetfüzeteket helyben vagy GitHub Codespaces-ben
3. Tanulnak példák módosításával és kísérletezéssel

## Pull Request irányelvek

### Beküldés előtt

1. **Tesztelje a változtatásait:**
   - Futtassa teljesen az érintett jegyzetfüzeteket
   - Ellenőrizze, hogy minden cella hiba nélkül végrehajtódik
   - Nézze meg, hogy a kimenetek megfelelőek-e

2. **Dokumentáció frissítése:**
   - Frissítse a README.md fájlokat, ha új fogalmakat ad hozzá
   - Tegyen bele megjegyzéseket bonyolult kódhoz a jegyzetfüzetekben
   - Biztosítsa, hogy a markdown cellák magyarázzák a célt

3. **Fájl módosítások:**
   - Kerülje a `.env` fájlok commitálását (használjon `.env.example` fájlt)
   - Ne commitálja a `venv/` vagy `__pycache__/` könyvtárakat
   - Tartsa meg a jegyzetfüzet kimeneteit, ha azok a fogalmakat demonstrálják
   - Távolítsa el az ideiglenes fájlokat és a biztonsági mentés jegyzetfüzeteket (`*-backup.ipynb`)

### PR cím formátum

Használjon leíró címeket:
- `[Lesson-XX] Új példa hozzáadása a <fogalomhoz>`
- `[Fix] Elírás javítása a lesson-XX README-ben`
- `[Update] Kódminta javítása a lesson-XX-ben`
- `[Docs] Telepítési útmutató frissítése`

### Kötelező ellenőrzések

- A jegyzetfüzeteknek hibamentesen kell futniuk
- A README fájlok legyenek világosak és pontosak
- Kövesse a repository meglévő kódmintáit
- Tartsa fenn az összhangot a többi leckével

## További megjegyzések

### Gyakori buktatók

1. **Python verzió eltérés:**
   - Győződjön meg róla, hogy a Python 3.12+ verzió van használatban
   - Egyes csomagok nem működnek régebbi verziókkal
   - Használja a `python3 -m venv` parancsot, hogy explicit módon megadja a Python verziót

2. **Környezeti változók:**
   - Mindig készítsen `.env` fájlt a `.env.example` alapján
   - Ne commitálja a `.env` fájlt (bele van írva a `.gitignore`-ba)
   - Jelentkezzen be az `az login` parancs segítségével kulcs nélküli Entra ID hitelesítéshez

3. **Csomagütközések:**
   - Használjon friss virtuális környezetet
   - Telepítsen a `requirements.txt`-ből, ne különálló csomagokból
   - Néhány jegyzetfüzethez további csomagok is szükségesek, amelyek említve vannak a markdown cellákban

4. **Azure szolgáltatások:**
   - Az Azure AI szolgáltatásokhoz aktív előfizetés szükséges
   - Egyes funkciók régiókhoz kötöttek
   - Győződjön meg róla, hogy az Azure OpenAI modell telepítése támogatja a Responses API-t

### Tanulási útvonal

Ajánlott haladás a leckéken:
1. **00-course-setup** - Kezdje itt a környezet beállításához
2. **01-intro-to-ai-agents** - Értse meg az AI ügynökök alapjait
3. **02-explore-agentic-frameworks** - Ismerje meg a különböző keretrendszereket
4. **03-agentic-design-patterns** - Alapvető tervezési minták
5. Folytassa a számozott leckékkel sorban

### Keretrendszer választás

Válasszon keretrendszert céljai alapján:
- **Minden lecke**: Microsoft Agent Framework (MAF) a `FoundryChatClient` használatával
- **Ügynökök szerveroldalon regisztrálnak** a Microsoft Foundry Agent Service V2-ben, és láthatóak a Foundry portálon

### Segítségkérés

- Csatlakozzon a [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord) szerverhez
- Tekintse át a lecke README fájlokat specifikus útmutatóért
- Nézze meg a fő [README.md](./README.md) fájlt a kurzus áttekintéséhez
- Hivatkozzon a [Course Setup](./00-course-setup/README.md) részletes telepítési útmutatójára

### Hozzájárulás

Ez egy nyílt oktatási projekt. Várjuk a hozzájárulásokat:
- Kódpéldák javítása
- Elírások vagy hibák javítása
- Magyarázó megjegyzések hozzáadása
- Új lecke témák javaslata
- Fordítás további nyelvekre

Lásd a [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) aktuális igényeit.

## Projekt-specifikus kontextus

### Többnyelvű támogatás

Ez a tárhely egy automatikus fordítórendszert használ:
- Több mint 50 nyelvet támogat
- Fordítások a `/translations/<lang-code>/` mappákban
- GitHub Actions munkafolyamat kezeli a fordítások frissítését
- A forrásfájlok angol nyelven vannak a tárhely gyökerében

### Lecke struktúra

Minden lecke követ egy egységes mintát:
1. Videó bélyegkép linkkel
2. Írott lecke tartalom (README.md)
3. Kódpéldák több keretrendszerben
4. Tanulási célok és előfeltételek
5. További tanulási források hivatkozással

### Kódminta fájlnevek

Formátum: `<lecke-szám>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - 1. lecke, MAF Python
- `14-sequential.ipynb` - 14. lecke, MAF haladó minták
- `16-python-agent-framework.ipynb` - 16. lecke, gyártási ügyfélszolgálati ügynök
- `17-local-agent-foundry-local.ipynb` - 17. lecke, helyi ügynök Foundry Local + Qwen használattal

### Különleges könyvtárak

- `translated_images/` - Fordított képek a különböző nyelvekhez
- `images/` - Eredeti képek az angol tartalomhoz
- `.devcontainer/` - VS Code fejlesztői konténer konfiguráció
- `.github/` - GitHub Actions munkafolyamatok és sablonok

### Függőségek

Fő csomagok a `requirements.txt`-ből:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-to-Agent protokoll támogatás
- `azure-ai-inference`, `azure-ai-projects` - Azure AI szolgáltatások
- `azure-identity` - Azure hitelesítés (AzureCliCredential)
- `azure-search-documents` - Azure AI Search integráció
- `mcp[cli]` - Model Context Protocol támogatás

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->