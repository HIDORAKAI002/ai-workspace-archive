# AGENTS.md

## Projektöversikt

Detta arkiv innehåller "AI-agenter för nybörjare" - en omfattande utbildningskurs som lär ut allt som behövs för att bygga AI-agenter. Kursen består av 18 lektioner (numrerade 00-18) som täcker grunder, designmönster, ramverk, produktionsdistribution, lokala/ombordagenter och säkerhet för AI-agenter.

**Nyckelteknologier:**
- Python 3.12+
- Jupyter-notebooks för interaktivt lärande
- AI-ramverk: Microsoft Agent Framework (MAF)
- Azure AI-tjänster: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Arkitektur:**
- Lektionbaserad struktur (kataloger 00-15+)
- Varje lektion innehåller: README-dokumentation, kodexempel (Jupyter-notebooks) och bilder
- Flerspråkigt stöd via automatiserat översättningssystem
- En Python-notebook per lektion med Microsoft Agent Framework

## Kommandon för installation

### Förutsättningar
- Python 3.12 eller högre
- Azure-prenumeration (för Microsoft Foundry)
- Azure CLI installerad och autentiserad (`az login`)

### Initial installation

1. **Klona eller fork:a arkivet:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # ELLER
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Skapa och aktivera Python virtuellt miljö:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # På Windows: venv\Scripts\activate
   ```

3. **Installera beroenden:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Sätt upp miljövariabler:**
   ```bash
   cp .env.example .env
   # Redigera .env med dina API-nycklar och slutpunkter
   ```

### Obligatoriska miljövariabler

För **Microsoft Foundry** (obligatoriskt):
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry projektendpunkt
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - Modellutplaceringsnamn (t.ex. gpt-4.1-mini)

För **Azure AI Search** (Lektion 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI Search-endpunkt
- `AZURE_SEARCH_API_KEY` - Azure AI Search API-nyckel

Autentisering: Kör `az login` innan du kör notebooks (använder `AzureCliCredential`).

## Utvecklingsarbetsflöde

### Köra Jupyter-notebooks

Varje lektion innehåller flera Jupyter-notebooks för olika ramverk:

1. **Starta Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Navigera till en lektionskatalog** (t.ex. `01-intro-to-ai-agents/code_samples/`)

3. **Öppna och kör notebooks:**
   - `*-python-agent-framework.ipynb` - Använder Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Använder Microsoft Agent Framework (.NET)

### Arbeta med Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Kräver Azure-prenumeration
- Använder `FoundryChatClient` för Agent Service V2 (agenter synliga i Foundry-portalen)
- Produktionsredo med inbyggd observerbarhet
- Filformat: `*-python-agent-framework.ipynb`

## Testinstruktioner

Detta är ett utbildningsarkiv med exempel på kod snarare än produktionskod med automatiserade tester. För att verifiera din installation och dina ändringar:

### Manuella tester

1. **Testa Python-miljön:**
   ```bash
   python --version  # Bör vara 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Testa körning av notebook:**
   ```bash
   # Konvertera anteckningsbok till skript och kör (testar importer)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Verifiera miljövariabler:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Köra individuella notebooks

Öppna notebooks i Jupyter och kör celler i följd. Varje notebook är självständig och innehåller:
- Importsekvenser
- Konfigurationsladdning
- Exempel på agent-implementeringar
- Förväntade utdata i markdown-celler

### Röktester av deployerade agenter

För lektioner där en agent är distribuerad som en Microsoft Foundry-hostad agent (01, 04, 05, 16), levererar repot röktestkataloger under `tests/` som körs av `.github/workflows/smoke-test.yml` arbetsflödet via [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test)-åtgärden. Dessa är en lättvikts port efter distribution (är agenten nåbar och följer grundläggande promptförväntningar?), kompletterande utvärderingspipelinen i Lektion 10 och 16. Se [tests/README.md](./tests/README.md) för katalog-till-lektion-till-agent-mappningen. Lektion 17 körs lokalt med Foundry Local och har ingen hostad endpoint, så den valideras genom att köra sin notebook direkt.

## Kodstil

### Python-konventioner

- **Python-version**: 3.12+
- **Kodstil**: Följ standarden Python PEP 8-konventionerna
- **Notebooks**: Använd tydliga markdown-celler för att förklara koncept
- **Importeringar**: Gruppera standardbibliotek, tredjeparts- och lokala importeringar

### Jupyter-notebook-konventioner

- Inkludera beskrivande markdown-celler före kodceller
- Lägg till utdataexempel i notebooks för referens
- Använd tydliga variabelnamn som matchar lektionskoncepten
- Behåll linjär körordning för notebooks (cell 1 → 2 → 3...)

### Filorganisation

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Bygg och distribution

### Bygga dokumentation

Detta arkiv använder Markdown för dokumentation:
- README.md-filer i varje lektionsmapp
- Huvud-README.md i arkivets rot
- Automatiserat översättningssystem via GitHub Actions

### CI/CD-pipeline

Belägen i `.github/workflows/`:

1. **co-op-translator.yml** - Automatisk översättning till 50+ språk
2. **welcome-issue.yml** - Hälsar nya issue-skapare välkomna
3. **welcome-pr.yml** - Hälsar nya PR-bidragsgivare välkomna

### Distribution

Detta är ett utbildningsarkiv - ingen distributionsprocess. Användare:
1. Forka eller klona arkivet
2. Kör notebooks lokalt eller i GitHub Codespaces
3. Lär dig genom att modifiera och experimentera med exempel

## Riktlinjer för pull requests

### Innan inskick

1. **Testa dina ändringar:**
   - Kör berörda notebooks fullständigt
   - Verifiera att alla celler körs utan fel
   - Kontrollera att utdata är lämpliga

2. **Dokumentationsuppdateringar:**
   - Uppdatera README.md vid tillägg av nya koncept
   - Lägg till kommentarer i notebooks för komplex kod
   - Säkerställ att markdown-celler förklarar syftet

3. **Filändringar:**
   - Undvik att committa `.env`-filer (använd `.env.example`)
   - Commita inte `venv/` eller `__pycache__/`-mappar
   - Behåll notebook-utdata när de demonstrerar koncept
   - Ta bort temporära filer och backup-notebooks (`*-backup.ipynb`)

### PR-titelformat

Använd beskrivande titlar:
- `[Lesson-XX] Lägg till nytt exempel för <concept>`
- `[Fix] Rätta stavfel i lesson-XX README`
- `[Update] Förbättra kodexempel i lesson-XX`
- `[Docs] Uppdatera installationsinstruktioner`

### Obligatoriska kontroller

- Notebooks ska köras utan fel
- README-filer ska vara tydliga och korrekta
- Följ existerande kodmönster i arkivet
- Behåll konsistens med andra lektioner

## Ytterligare anteckningar

### Vanliga fallgropar

1. **Fel Python-version:**
   - Säkerställ att Python 3.12+ används
   - Vissa paket fungerar inte med äldre versioner
   - Använd `python3 -m venv` för att explicit ange Python-version

2. **Miljövariabler:**
   - Skapa alltid `.env` från `.env.example`
   - Commita inte `.env`-filen (finns i `.gitignore`)
   - Logga in med `az login` för nyckellös Entra ID-autentisering

3. **Paketkonflikter:**
   - Använd en ny virtuell miljö
   - Installera från `requirements.txt` istället för individuella paket
   - Vissa notebooks kan kräva ytterligare paket som nämns i deras markdown-celler

4. **Azure-tjänster:**
   - Azure AI-tjänster kräver aktiv prenumeration
   - Vissa funktioner är regionsspecifika
   - Säkerställ att din Azure OpenAI-modellutplacering stödjer Responses API

### Inlärningsväg

Rekommenderad progression genom lektionerna:
1. **00-course-setup** - Börja här för miljöinstallation
2. **01-intro-to-ai-agents** - Förstå AI-agenternas grunder
3. **02-explore-agentic-frameworks** - Lär dig om olika ramverk
4. **03-agentic-design-patterns** - Kärndesignmönster
5. Fortsätt sekventiellt genom numrerade lektioner

### Val av ramverk

Välj ramverk baserat på dina mål:
- **Alla lektioner**: Microsoft Agent Framework (MAF) med `FoundryChatClient`
- **Agenter registreras server-side** i Microsoft Foundry Agent Service V2 och är synliga i Foundry-portalen

### Få hjälp

- Gå med i [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Granska lektions-README för specifik vägledning
- Se huvudsakliga [README.md](./README.md) för kursöversikt
- Se [Course Setup](./00-course-setup/README.md) för detaljerade installationsinstruktioner

### Bidra

Detta är ett öppet utbildningsprojekt. Bidrag välkomnas:
- Förbättra kodexempel
- Rätta stavfel eller fel
- Lägg till förtydligande kommentarer
- Föreslå nya lektionsämnen
- Översätt till fler språk

Se [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) för aktuella behov.

## Projektspecifik kontext

### Flerspråkigt stöd

Detta arkiv använder ett automatiserat översättningssystem:
- Stödjer 50+ språk
- Översättningar finns i `/translations/<lang-code>/` kataloger
- GitHub Actions arbetsflöde hanterar översättningsuppdateringar
- Källfiler är på engelska i arkivets rot

### Lektionsstruktur

Varje lektion följer ett konsekvent mönster:
1. Videominiatyr med länk
2. Skrivet lektionsinnehåll (README.md)
3. Kodexempel i flera ramverk
4. Läromål och förutsättningar
5. Extra lärresurser länkade

### Namngivning av kodexempel

Format: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Lektion 1, MAF Python
- `14-sequential.ipynb` - Lektion 14, MAF avancerade mönster
- `16-python-agent-framework.ipynb` - Lektion 16, produktionsagent för kundsupport
- `17-local-agent-foundry-local.ipynb` - Lektion 17, lokal agent med Foundry Local + Qwen

### Specialkataloger

- `translated_images/` - Lokaliserade bilder för översättningar
- `images/` - Originalbilder för engelskt innehåll
- `.devcontainer/` - VS Code konfiguration för utvecklingscontainer
- `.github/` - GitHub Actions arbetsflöden och mallar

### Beroenden

Nyckelpaket från `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-till-agent protokollstöd
- `azure-ai-inference`, `azure-ai-projects` - Azure AI-tjänster
- `azure-identity` - Azure-autentisering (AzureCliCredential)
- `azure-search-documents` - Azure AI Search-integration
- `mcp[cli]` - Model Context Protocol-stöd

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->