# AGENTS.md

## Přehled projektu

Toto úložiště obsahuje „AI agenty pro začátečníky“ – komplexní vzdělávací kurz, který učí vše, co je potřeba k vytvoření AI agentů. Kurz se skládá z 18 lekcí (číslovaných 00-18) pokrývajících základy, designové vzory, frameworky, produkční nasazení, lokální/agenty na zařízení a bezpečnost AI agentů.

**Klíčové technologie:**
- Python 3.12+
- Jupyter Notebooky pro interaktivní výuku
- AI Frameworky: Microsoft Agent Framework (MAF)
- Azure AI služby: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Architektura:**
- Struktura založená na lekcích (adresáře 00-15+)
- Každá lekce obsahuje: dokumentaci README, ukázky kódu (Jupyter notebooky) a obrázky
- Podpora více jazyků prostřednictvím automatizovaného překladového systému
- Jeden Python notebook na lekci používající Microsoft Agent Framework

## Příkazy pro nastavení

### Požadavky
- Python 3.12 nebo novější
- Azure subscription (pro Microsoft Foundry)
- Azure CLI nainstalován a autentizován (`az login`)

### Počáteční nastavení

1. **Klonujte nebo forknete úložiště:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # NEBO
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Vytvořte a aktivujte Python virtuální prostředí:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Na Windows: venv\Scripts\activate
   ```

3. **Nainstalujte závislosti:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Nastavte proměnné prostředí:**
   ```bash
   cp .env.example .env
   # Upravte soubor .env s vašimi API klíči a endpointy
   ```

### Vyžadované proměnné prostředí

Pro **Microsoft Foundry** (povinné):
- `AZURE_AI_PROJECT_ENDPOINT` - endpoint projektu Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - název nasazení modelu (např. gpt-4.1-mini)

Pro **Azure AI Search** (Lekce 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - endpoint Azure AI Search
- `AZURE_SEARCH_API_KEY` - API klíč Azure AI Search

Autentizace: Před spuštěním notebooků spusťte `az login` (používá `AzureCliCredential`).

## Vývojový pracovní postup

### Spouštění Jupyter Notebooků

Každá lekce obsahuje několik Jupyter notebooků pro různé frameworky:

1. **Spusťte Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Přejděte do adresáře lekce** (např. `01-intro-to-ai-agents/code_samples/`)

3. **Otevřete a spusťte notebooky:**
   - `*-python-agent-framework.ipynb` - používání Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - používání Microsoft Agent Framework (.NET)

### Práce s Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Vyžaduje Azure subscription
- Používá `FoundryChatClient` pro Agent Service V2 (agenty viditelné v Foundry portálu)
- Produkčně připravený se zabudovanou sledovatelností
- Vzor názvů souborů: `*-python-agent-framework.ipynb`

## Instrukce pro testování

Toto je vzdělávací úložiště s ukázkovým kódem, nikoli produkční kód s automatizovanými testy. Pro ověření nastavení a změn:

### Manuální testování

1. **Otestujte Python prostředí:**
   ```bash
   python --version  # Mělo by být 3.12 a novější
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Otestujte spuštění notebooku:**
   ```bash
   # Převést poznámkový blok na skript a spustit (testuje importy)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Ověřte proměnné prostředí:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Spouštění jednotlivých notebooků

Otevřete notebooky v Jupyteru a vykonejte buňky postupně. Každý notebook je samostatný a obsahuje:
- Importy
- Načítání konfigurace
- Ukázkové implementace agentů
- Očekávané výstupy uvedené v markdown buňkách

### Smoke-testy nasazených agentů

Pro lekce, kde je agent nasazen jako Microsoft Foundry hostovaný agent (01, 04, 05, 16), repozitář poskytuje smoke-test katalogy pod `tests/`, které spouští workflow `.github/workflows/smoke-test.yml` pomocí akce [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test). Jsou to lehké post-deploy kontroly (je agent dostupný a dodržuje základní očekávání promptů?), které doplňují evaluační pipeline v lekcích 10 a 16. Viz [tests/README.md](./tests/README.md) pro mapování katalogu na lekci a agenta. Lekce 17 běží lokálně s Foundry Local a nemá hosted endpoint, takže je ověřována přímo spuštěním notebooku.

## Styl kódu

### Python konvence

- **Verze Pythonu**: 3.12+
- **Styl kódu**: Dodržujte standardní Python PEP 8 konvence
- **Notebooky**: Používejte jasné markdown buňky k vysvětlení konceptů
- **Importy**: Skupinujte dle standardní knihovny, třetích stran a lokálních importů

### Jupyter Notebook konvence

- Zařaďte popisné markdown buňky před kódové buňky
- Přidejte příklady výstupů v noteboocích pro referenci
- Používejte jasné názvy proměnných, které odpovídají pojmům lekce
- Zachovejte lineární pořadí vykonávání notebooku (buňka 1 → 2 → 3...)

### Organizace souborů

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Kompilace a nasazení

### Tvorba dokumentace

Toto úložiště používá Markdown pro dokumentaci:
- README.md soubory v každé složce lekce
- Hlavní README.md v kořenovém adresáři repozitáře
- Automatizovaný překladový systém pomocí GitHub Actions

### CI/CD pipeline

Umístěná v `.github/workflows/`:

1. **co-op-translator.yml** - Automatický překlad do více než 50 jazyků
2. **welcome-issue.yml** - Přivítání nových zadavatelů issues
3. **welcome-pr.yml** - Přivítání nových přispěvatelů pull requestů

### Nasazení

Toto je vzdělávací úložiště – žádný nasazovací proces. Uživatele:
1. Forknou nebo klonují úložiště
2. Spouštějí notebooky lokálně nebo v GitHub Codespaces
3. Učí se úpravou a experimentováním s příklady

## Pokyny pro Pull Requesty

### Před odesláním

1. **Otestujte své změny:**
   - Kompletně spusťte dotčené notebooky
   - Ověřte, že všechny buňky proběhnou bez chyb
   - Zkontrolujte, že výstupy jsou vhodné

2. **Aktualizace dokumentace:**
   - Aktualizujte README.md při přidání nových konceptů
   - Přidejte komentáře v noteboocích u složitého kódu
   - Ujistěte se, že markdown buňky vysvětlují účel

3. **Změny souborů:**
   - Vyvarujte se commitu `.env` souborů (používejte `.env.example`)
   - Neukládejte `venv/` nebo `__pycache__/` adresáře
   - Zachovejte výstupy notebooků, kde demonstrují koncepty
   - Odstraňte dočasné soubory a záložní notebooky (`*-backup.ipynb`)

### Formát názvu PR

Používejte popisné titulky:
- `[Lesson-XX] Přidat novou ukázku pro <koncept>`
- `[Fix] Oprava překlepu v README lekce-XX`
- `[Update] Vylepšení ukázky kódu v lekci-XX`
- `[Docs] Aktualizace instrukcí nastavení`

### Požadované kontroly

- Notebooky by měly běžet bez chyb
- README soubory by měly být jasné a přesné
- Dodržujte existující vzory kódu v repozitáři
- Zachovejte konzistenci s ostatními lekcemi

## Další poznámky

### Časté problémy

1. **Neshoda verze Pythonu:**
   - Používejte Python 3.12+
   - Některé balíčky nemusí fungovat s nižšími verzemi
   - Použijte `python3 -m venv` pro explicitní specifikaci verze Pythonu

2. **Proměnné prostředí:**
   - Vždy vytvořte `.env` ze souboru `.env.example`
   - Necommitujte `.env` soubor (je v `.gitignore`)
   - Přihlašte se pomocí `az login` pro autentizaci Entra ID bez klíče

3. **Konflikty balíčků:**
   - Použijte čisté virtuální prostředí
   - Instalujte z `requirements.txt` místo jednotlivých balíčků
   - Některé notebooky mohou vyžadovat další balíčky uvedené v jejich markdown buňkách

4. **Azure služby:**
   - Azure AI služby vyžadují aktivní subscription
   - Některé funkce jsou specifické pro region
   - Ujistěte se, že vaše nasazení modelu Azure OpenAI podporuje Responses API

### Učební cesta

Doporučené postoupení lekcemi:
1. **00-course-setup** – Začněte zde pro nastavení prostředí
2. **01-intro-to-ai-agents** – Získejte základy AI agentů
3. **02-explore-agentic-frameworks** – Naučte se o různých frameworcích
4. **03-agentic-design-patterns** – Hlavní designové vzory
5. Pokračujte sekvenčně přes číslované lekce

### Výběr frameworku

Vyberte framework podle svých cílů:
- **Všechny lekce**: Microsoft Agent Framework (MAF) s `FoundryChatClient`
- **Agenti registrováni server-side** v Microsoft Foundry Agent Service V2 a viditelní v Foundry portálu

### Získání pomoci

- Připojte se k [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Prohlédněte si README soubory lekcí pro konkrétní rady
- Zkontrolujte hlavní [README.md](./README.md) pro přehled kurzu
- Podívejte se na [Course Setup](./00-course-setup/README.md) pro detailní instrukce nastavení

### Přispívání

Toto je otevřený vzdělávací projekt. Vítány příspěvky:
- Zlepšit ukázky kódu
- Opravit překlepy nebo chyby
- Přidat vysvětlující komentáře
- Navrhnout nová témata lekcí
- Přeložit do dalších jazyků

Viz [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) pro aktuální potřeby.

## Kontext specifický pro projekt

### Podpora více jazyků

Toto úložiště využívá automatizovaný překladový systém:
- Podpora více než 50 jazyků
- Překlady v adresářích `/translations/<lang-code>/`
- Překladový workflow v GitHub Actions aktualizuje překlady
- Zdrojové soubory jsou v angličtině v kořenovém adresáři repozitáře

### Struktura lekce

Každá lekce sleduje konzistentní vzor:
1. Náhled videa s odkazem
2. Textový obsah lekce (README.md)
3. Ukázky kódu v různých frameworcích
4. Výukové cíle a požadavky
5. Odkazy na další vzdělávací zdroje

### Pojmenování ukázek kódu

Formát: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Lekce 1, MAF Python
- `14-sequential.ipynb` - Lekce 14, pokročilé vzory MAF
- `16-python-agent-framework.ipynb` - Lekce 16, produkční agent zákaznické podpory
- `17-local-agent-foundry-local.ipynb` - Lekce 17, lokální agent s Foundry Local + Qwen

### Speciální adresáře

- `translated_images/` - Lokalizované obrázky pro překlady
- `images/` - Originální obrázky pro anglický obsah
- `.devcontainer/` - Konfigurace vývojového kontejneru VS Code
- `.github/` - GitHub Actions workflowy a šablony

### Závislosti

Klíčové balíčky z `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Podpora Agent-to-Agent protokolu
- `azure-ai-inference`, `azure-ai-projects` - Azure AI služby
- `azure-identity` - Azure autentizace (AzureCliCredential)
- `azure-search-documents` - Integrace Azure AI Search
- `mcp[cli]` - Podpora Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->