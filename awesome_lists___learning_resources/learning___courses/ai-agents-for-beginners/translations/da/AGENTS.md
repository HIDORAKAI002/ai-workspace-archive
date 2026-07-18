# AGENTS.md

## Projektoversigt

Dette repository indeholder "AI Agenter for Begyndere" - et omfattende undervisningsforløb, der lærer alt, hvad der er nødvendigt for at bygge AI Agenter. Forløbet består af 18 lektioner (nummereret 00-18), som dækker grundlæggende principper, designmønstre, frameworks, produktionsudrulning, lokale/enhedsbårne agenter og sikkerhed for AI-agenter.

**Nøgle teknologier:**
- Python 3.12+
- Jupyter Notebooks til interaktiv læring
- AI Frameworks: Microsoft Agent Framework (MAF)
- Azure AI Tjenester: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Arkitektur:**
- Lektionbaseret struktur (00-15+ mapper)
- Hver lektion indeholder: README dokumentation, kodeeksempler (Jupyter notebooks) og billeder
- Fler-sproget understøttelse via automatiseret oversættelsessystem
- Én Python-notebook pr. lektion, der bruger Microsoft Agent Framework

## Opsætningskommandoer

### Forudsætninger
- Python 3.12 eller nyere
- Azure abonnement (til Microsoft Foundry)
- Azure CLI installeret og autentificeret (`az login`)

### Initial opsætning

1. **Klon eller fork repository:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # ELLER
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Opret og aktiver Python virtuelt miljø:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # På Windows: venv\Scripts\activate
   ```

3. **Installer afhængigheder:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Opsæt miljøvariabler:**
   ```bash
   cp .env.example .env
   # Rediger .env med dine API-nøgler og endepunkter
   ```

### Nødvendige miljøvariabler

For **Microsoft Foundry** (krævet):
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry projekt-endpoint
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - Modeludrulningsnavn (fx. gpt-4.1-mini)

For **Azure AI Search** (Lektion 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI Search endpoint
- `AZURE_SEARCH_API_KEY` - Azure AI Search API-nøgle

Autentificering: Kør `az login` før kørsel af notebooks (bruger `AzureCliCredential`).

## Udviklingsworkflow

### Kørsel af Jupyter Notebooks

Hver lektion indeholder flere Jupyter notebooks til forskellige frameworks:

1. **Start Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Naviger til lektionens mappe** (fx. `01-intro-to-ai-agents/code_samples/`)

3. **Åbn og kør notebooks:**
   - `*-python-agent-framework.ipynb` - Brug af Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Brug af Microsoft Agent Framework (.NET)

### Arbejde med Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Kræver Azure abonnement
- Bruger `FoundryChatClient` til Agent Service V2 (agenter synlige i Foundry portalen)
- Produktionsklar med indbygget observerbarhed
- Filmønster: `*-python-agent-framework.ipynb`

## Testinstruktioner

Dette er et undervisningsrepository med eksempel-kode fremfor produktionskode med automatiserede tests. For at verificere din opsætning og ændringer:

### Manuel test

1. **Test Python-miljø:**
   ```bash
   python --version  # Skal være 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Test kørsel af notebook:**
   ```bash
   # Konverter note bog til script og kør (tester imports)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Verificer miljøvariabler:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Kørsel af individuelle notebooks

Åbn notebooks i Jupyter og udfør celler sekventielt. Hver notebook er selvstændig og inkluderer:
- Import-udsagn
- Indlæsning af konfiguration
- Eksempler på agentimplementeringer
- Forventede output i markdown-celler

### Smoke-Test af Udrullede Agenter

For lektioner hvor en agent er udrullet som en Microsoft Foundry hostet agent (01, 04, 05, 16), leverer repoet smoke-test kataloger under `tests/`, som køres af `.github/workflows/smoke-test.yml` workflow via [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) actionen. Disse er en letvægts post-udrulnings port (er agenten tilgængelig og følger basis promptforventninger?), der supplerer evalueringspipeline i Lektion 10 og 16. Se [tests/README.md](./tests/README.md) for katalog-til-lektion-til-agent mapping. Lektion 17 kører lokalt med Foundry Local og har intet hostet endpoint, så den valideres ved at køre sin notebook direkte.

## Kodestil

### Python konventioner

- **Python version**: 3.12+
- **Kodestil**: Følg standard Python PEP 8-konventioner
- **Notebooks**: Brug klare markdown-celler til at forklare koncepter
- **Import**: Gruppér efter standardbibliotek, tredjepart, lokale imports

### Jupyter Notebook konventioner

- Inkluder beskrivende markdown-celler før kodeceller
- Tilføj output-eksempler i notebooks som reference
- Brug tydelige variabelnavne, der matcher lektionens koncepter
- Hold notebook-udførelsesrækkefølgen lineær (celle 1 → 2 → 3...)

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

## Build og Udrulning

### Bygning af dokumentation

Dette repository bruger Markdown til dokumentation:
- README.md filer i hver lektionsmappe
- Hoved README.md i repository-roden
- Automatiseret oversættelsessystem via GitHub Actions

### CI/CD pipeline

Findes i `.github/workflows/`:

1. **co-op-translator.yml** - Automatisk oversættelse til 50+ sprog
2. **welcome-issue.yml** - Velkomst til nye issues
3. **welcome-pr.yml** - Velkomst til nye pull request bidragydere

### Udrulning

Dette er et undervisningsrepository - ingen udrulningsproces. Brugere:
1. Forke eller klone repository
2. Køre notebooks lokalt eller i GitHub Codespaces
3. Lære ved at modificere og eksperimentere med eksempler

## Retningslinjer for Pull Requests

### Før indsendelse

1. **Test dine ændringer:**
   - Kør berørte notebooks fuldstændigt
   - Verificer at alle celler kører uden fejl
   - Tjek at output er passende

2. **Dokumentationsopdateringer:**
   - Opdater README.md ved tilføjelse af nye koncepter
   - Tilføj kommentarer i notebooks for kompleks kode
   - Sikr at markdown-celler forklarer formålet

3. **Filændringer:**
   - Undgå at committe `.env` filer (brug `.env.example`)
   - Commit ikke `venv/` eller `__pycache__/` mapper
   - Behold notebook-outputs når de demonstrerer koncepter
   - Fjern midlertidige filer og backup-notebooks (`*-backup.ipynb`)

### PR titel format

Brug beskrivende titler:
- `[Lesson-XX] Tilføj nyt eksempel for <koncept>`
- `[Fix] Ret tastefejl i lesson-XX README`
- `[Update] Forbedr kodeeksempel i lesson-XX`
- `[Docs] Opdater opsætningsinstruktioner`

### Påkrævede checks

- Notebooks skal køre uden fejl
- README-filer skal være klare og præcise
- Følg eksisterende kode mønstre i repository
- Bevar konsistens med andre lektioner

## Yderligere noter

### Almindelige faldgruber

1. **Mismatch i Python-version:**
   - Sørg for at bruge Python 3.12+
   - Nogle pakker virker ikke på ældre versioner
   - Brug `python3 -m venv` for eksplicit at angive Python-version

2. **Miljøvariabler:**
   - Opret altid `.env` ud fra `.env.example`
   - Commit ikke `.env` filen (den er i `.gitignore`)
   - Log ind med `az login` for nøglefri Entra ID-autentificering

3. **Pakke-konflikter:**
   - Brug et nyt virtuelt miljø
   - Installer fra `requirements.txt` fremfor individuelle pakker
   - Nogle notebooks kan kræve ekstra pakker nævnt i deres markdown-celler

4. **Azure-tjenester:**
   - Azure AI tjenester kræver aktivt abonnement
   - Nogle funktioner er regionsspecifikke
   - Sørg for at din Azure OpenAI modeludrulning understøtter Responses API

### Læringssti

Anbefalet progression gennem lektionerne:
1. **00-course-setup** - Start her for miljøopsætning
2. **01-intro-to-ai-agents** - Forstå AI agent-grundprincipper
3. **02-explore-agentic-frameworks** - Lær om forskellige frameworks
4. **03-agentic-design-patterns** - Centrale designmønstre
5. Fortsæt gennem nummererede lektioner sekventielt

### Udvælgelse af framework

Vælg framework baseret på dine mål:
- **Alle lektioner**: Microsoft Agent Framework (MAF) med `FoundryChatClient`
- **Agenter registreres server-side** i Microsoft Foundry Agent Service V2 og er synlige i Foundry-portalen

### Få hjælp

- Deltag i [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Gennemgå lektionens README-filer for specifik vejledning
- Se hoved [README.md](./README.md) for kursusoversigt
- Se [Course Setup](./00-course-setup/README.md) for detaljerede opsætningsinstruktioner

### Bidrag

Dette er et åbent undervisningsprojekt. Bidrag er velkomne:
- Forbedre kodeeksempler
- Ret tastefejl eller fejl
- Tilføj forklarende kommentarer
- Foreslå nye lektionsemner
- Oversæt til yderligere sprog

Se [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) for nuværende behov.

## Projektspecifik kontekst

### Fler-sproget understøttelse

Dette repository bruger et automatiseret oversættelsessystem:
- 50+ sprog understøttet
- Oversættelser i `/translations/<lang-code>/` mapper
- GitHub Actions workflow håndterer oversættelsesopdateringer
- Kildefiler er på engelsk i repository-roden

### Lektionsstruktur

Hver lektion følger et konsistent mønster:
1. Video-thumbnail med link
2. Skriftligt lektionsindhold (README.md)
3. Kodeeksempler i flere frameworks
4. Læringsmål og forudsætninger
5. Ekstra læringsressourcer linket

### Navngivning af kodeeksempler

Format: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Lektion 1, MAF Python
- `14-sequential.ipynb` - Lektion 14, MAF avancerede mønstre
- `16-python-agent-framework.ipynb` - Lektion 16, produktions kundeservice-agent
- `17-local-agent-foundry-local.ipynb` - Lektion 17, lokal agent med Foundry Local + Qwen

### Specielle mapper

- `translated_images/` - Lokalt oversatte billeder til oversættelser
- `images/` - Originale billeder til engelsk indhold
- `.devcontainer/` - VS Code udviklingscontainer konfiguration
- `.github/` - GitHub Actions workflows og skabeloner

### Afhængigheder

Nøglepakker fra `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-til-Agent protokol support
- `azure-ai-inference`, `azure-ai-projects` - Azure AI tjenester
- `azure-identity` - Azure autentificering (AzureCliCredential)
- `azure-search-documents` - Azure AI Search integration
- `mcp[cli]` - Model Context Protocol støtte

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->