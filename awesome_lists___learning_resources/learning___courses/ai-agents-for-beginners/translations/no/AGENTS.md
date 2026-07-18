# AGENTS.md

## Prosjektoversikt

Dette depotet inneholder "AI Agenter for Nybegynnere" - et omfattende undervisningskurs som lærer alt som trengs for å bygge AI-agenter. Kurset består av 18 leksjoner (nummerert 00-18) som dekker grunnleggende prinsipper, designmønstre, rammeverk, produksjonsdistribusjon, lokale/enhetsbaserte agenter og sikkerhet for AI-agenter.

**Nøkkelteknologier:**
- Python 3.12+
- Jupyter Notebooks for interaktiv læring
- AI-rammeverk: Microsoft Agent Framework (MAF)
- Azure AI-tjenester: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Arkitektur:**
- Leksjonsbasert struktur (00-15+ mapper)
- Hver leksjon inneholder: README-dokumentasjon, kodeeksempler (Jupyter-notebooks) og bilder
- Flerspråklig støtte via automatisert oversettelsessystem
- En Python-notebook per leksjon som bruker Microsoft Agent Framework

## Oppsettskommandoer

### Forutsetninger
- Python 3.12 eller nyere
- Azure-abonnement (for Microsoft Foundry)
- Azure CLI installert og autentisert (`az login`)

### Første oppsett

1. **Klon eller fork depotet:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # ELLER
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Opprett og aktiver Python virtuelt miljø:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # På Windows: venv\Scripts\activate
   ```

3. **Installer avhengigheter:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Sett opp miljøvariabler:**
   ```bash
   cp .env.example .env
   # Rediger .env med dine API-nøkler og endepunkter
   ```

### Påkrevde miljøvariabler

For **Microsoft Foundry** (påkrevde):
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry prosjekt-endepunkt
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - Modell distribuering navn (f.eks. gpt-4.1-mini)

For **Azure AI Search** (Leksjon 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI Search endepunkt
- `AZURE_SEARCH_API_KEY` - Azure AI Search API-nøkkel

Autentisering: Kjør `az login` før du kjører notebooks (bruker `AzureCliCredential`).

## Utviklingsarbeidsflyt

### Kjøre Jupyter Notebooks

Hver leksjon inneholder flere Jupyter-notebooks for forskjellige rammeverk:

1. **Start Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Naviger til en leksjonsmappe** (f.eks., `01-intro-to-ai-agents/code_samples/`)

3. **Åpne og kjør notebooks:**
   - `*-python-agent-framework.ipynb` - Bruker Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Bruker Microsoft Agent Framework (.NET)

### Arbeide med Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Krever Azure-abonnement
- Bruker `FoundryChatClient` for Agent Service V2 (agenter synlige i Foundry-portalen)
- Produksjonsklar med innebygd observabilitet
- Fil-mønster: `*-python-agent-framework.ipynb`

## Testinstruksjoner

Dette er et undervisningsdepot med eksempel-kode, ikke produksjonskode med automatiserte tester. For å verifisere oppsett og endringer:

### Manuell testing

1. **Test Python-miljø:**
   ```bash
   python --version  # Bør være 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Test notebookutføring:**
   ```bash
   # Konverter notatbok til skript og kjør (tester importeringer)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Verifiser miljøvariabler:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Kjøre individuelle notebooks

Åpne notebooks i Jupyter og kjør celler sekvensielt. Hver notebook er selvstendig og inkluderer:
- Import-setninger
- Konfigurasjonslasting
- Eksempelimplementeringer av agenter
- Forventede resultater i markdown-celler

### Smoke-testing av distribuerte agenter

For leksjoner hvor en agent er distribuert som en Microsoft Foundry-hostet agent (01, 04, 05, 16), leverer depotet smoke-test kataloger under `tests/` som kjøres av `.github/workflows/smoke-test.yml` arbeidsflyten via [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test)-handlingen. Disse er en lettvekts portasjon etter distribusjon (er agenten tilgjengelig og følger grunnleggende prompt-forventninger?), som utfyller evalueringspipelinjen i Leksjon 10 og 16. Se [tests/README.md](./tests/README.md) for kartleggingen katalog-leksjon-agent. Leksjon 17 kjøres lokalt med Foundry Local og har ingen hostet endepunkt, så den valideres ved å kjøre sin notebook direkte.

## Kode Stil

### Python-konvensjoner

- **Python-versjon**: 3.12+
- **Kode-stil**: Følg standard Python PEP 8 konvensjoner
- **Notebooks**: Bruk tydelige markdown-celler for å forklare konsepter
- **Importer**: Gruppér etter standardbibliotek, tredjepart, lokale importer

### Jupyter Notebook-konvensjoner

- Inkluder beskrivende markdown-celler før kode-celler
- Legg til output-eksempler i notebooks for referanse
- Bruk klare variabelnavn som samsvarer med leksjonskonsepter
- Hold notebookkjøringsrekkefølgen lineær (celle 1 → 2 → 3...)

### Filorganisering

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Bygging og Distribusjon

### Bygge dokumentasjon

Dette depotet bruker Markdown til dokumentasjon:
- README.md filer i hver leksjonsmappe
- Hoved-README.md i depotets rot
- Automatisert oversettelsessystem via GitHub Actions

### CI/CD Pipeline

Ligger i `.github/workflows/`:

1. **co-op-translator.yml** - Automatisk oversettelse til 50+ språk
2. **welcome-issue.yml** - Ønsker nye issues forfattere velkommen
3. **welcome-pr.yml** - Ønsker nye pull request-bidragsytere velkommen

### Distribusjon

Dette er et undervisningsdepot - ingen distribusjonsprosess. Brukere:
1. Fork eller klon depotet
2. Kjør notebooks lokalt eller i GitHub Codespaces
3. Lær ved å modifisere og eksperimentere med eksempler

## Retningslinjer for Pull Requests

### Før innsending

1. **Test dine endringer:**
   - Kjør berørte notebooks fullstendig
   - Verifiser at alle celler kjører uten feil
   - Sjekk at output er passende

2. **Dokumentasjonsoppdateringer:**
   - Oppdater README.md hvis du legger til nye konsepter
   - Legg til kommentarer i notebooks for kompleks kode
   - Sørg for at markdown-celler forklarer formålet

3. **Filendringer:**
   - Unngå å committe `.env` filer (bruk `.env.example`)
   - Ikke commit `venv/` eller `__pycache__/` mapper
   - Behold notebook-output når de demonstrerer konsepter
   - Fjern midlertidige filer og backup-notebooks (`*-backup.ipynb`)

### PR-tittel format

Bruk beskrivende titler:
- `[Lesson-XX] Legg til nytt eksempel for <concept>`
- `[Fix] Rett skrivefeil i lesson-XX README`
- `[Update] Forbedre kodeeksempel i lesson-XX`
- `[Docs] Oppdater oppsettsinstruksjoner`

### Påkrevde kontroller

- Notebooks skal kjøre uten feil
- README-filer skal være klare og nøyaktige
- Følg eksisterende kode-mønstre i depotet
- Oppretthold konsistens med andre leksjoner

## Tilleggsnotater

### Vanlige fallgruver

1. **Mismatch i Python-versjon:**
   - Sørg for at Python 3.12+ brukes
   - Noen pakker kan ikke fungere med eldre versjoner
   - Bruk `python3 -m venv` for å spesifisere Python-versjon eksplisitt

2. **Miljøvariabler:**
   - Lag alltid `.env` fra `.env.example`
   - Ikke committ `.env` filen (er i `.gitignore`)
   - Logg inn med `az login` for nøkkelfri Entra ID-autentisering

3. **Pakke-konflikter:**
   - Bruk et ferskt virtuelt miljø
   - Installer fra `requirements.txt` heller enn individuelle pakker
   - Noen notebooks kan kreve flere pakker nevnt i deres markdown-celler

4. **Azure-tjenester:**
   - Azure AI-tjenester krever aktivt abonnement
   - Noen funksjoner er regionsspesifikke
   - Sørg for at din Azure OpenAI modell distribuering støtter Responses API

### Læringssti

Anbefalt progresjon gjennom leksjoner:
1. **00-course-setup** - Start her for oppsett av miljø
2. **01-intro-to-ai-agents** - Forstå grunnleggende AI-agent konsepter
3. **02-explore-agentic-frameworks** - Lær om forskjellige rammeverk
4. **03-agentic-design-patterns** - Kjernedesignmønstre
5. Fortsett sekvensielt gjennom nummererte leksjoner

### Rammeverksvalg

Velg rammeverk basert på dine mål:
- **Alle leksjoner**: Microsoft Agent Framework (MAF) med `FoundryChatClient`
- **Agenter registrerer seg server-side** i Microsoft Foundry Agent Service V2 og er synlige i Foundry-portalen

### Få hjelp

- Bli med i [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Se gjennom leksjons-README-filer for spesifikk veiledning
- Sjekk hoved-[README.md](./README.md) for kursoversikt
- Se [Course Setup](./00-course-setup/README.md) for detaljerte oppsettsinstruksjoner

### Bidra

Dette er et åpent undervisningsprosjekt. Bidrag er velkomne:
- Forbedre kodeeksempler
- Rett skrivefeil eller feil
- Legg til oppklarende kommentarer
- Foreslå nye leksjonstemaer
- Oversett til flere språk

Se [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) for nåværende behov.

## Prosjektspesifikk kontekst

### Flerspråklig støtte

Dette depotet bruker et automatisert oversettelsessystem:
- Støtte for 50+ språk
- Oversettelser i `/translations/<språk-kode>/` mapper
- GitHub Actions arbeidsflyt håndterer oppdateringer av oversettelser
- Kildefiler er på engelsk i depotets rot

### Leksjonsstruktur

Hver leksjon følger et konsistent mønster:
1. Video-thumbnails med lenke
2. Skrevet leksjonsinnhold (README.md)
3. Kodeeksempler i flere rammeverk
4. Læringsmål og forutsetninger
5. Ekstra læringsressurser lenket

### Navnekonvensjon for kodeeksempler

Format: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Leksjon 1, MAF Python
- `14-sequential.ipynb` - Leksjon 14, MAF avanserte mønstre
- `16-python-agent-framework.ipynb` - Leksjon 16, produksjonskundestøtteagent
- `17-local-agent-foundry-local.ipynb` - Leksjon 17, lokal agent med Foundry Local + Qwen

### Spesielle mapper

- `translated_images/` - Lokalisert bilder for oversettelser
- `images/` - Originale bilder for engelsk innhold
- `.devcontainer/` - VS Code utviklingscontainer-konfigurasjon
- `.github/` - GitHub Actions arbeidsflyter og maler

### Avhengigheter

Nøkkelpakker fra `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-til-Agent protokollstøtte
- `azure-ai-inference`, `azure-ai-projects` - Azure AI tjenester
- `azure-identity` - Azure autentisering (AzureCliCredential)
- `azure-search-documents` - Azure AI Search integrasjon
- `mcp[cli]` - Modell Kontekst Protokoll-støtte

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->