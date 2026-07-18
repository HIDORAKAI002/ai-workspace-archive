# AGENTS.md

## Project Overzicht

Deze repository bevat "AI Agents voor Beginners" - een uitgebreide educatieve cursus die alles leert wat nodig is om AI Agents te bouwen. De cursus bestaat uit 18 lessen (genummerd 00-18) die fundamentele kennis, ontwerppatronen, frameworks, productie-implementatie, lokale/on-device agents en beveiliging van AI agents behandelen.

**Belangrijke Technologieën:**
- Python 3.12+
- Jupyter Notebooks voor interactieve leerervaring
- AI Frameworks: Microsoft Agent Framework (MAF)
- Azure AI Services: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Architectuur:**
- Les-gebaseerde structuur (00-15+ mappen)
- Elke les bevat: README documentatie, codevoorbeelden (Jupyter notebooks) en afbeeldingen
- Meertalige ondersteuning via geautomatiseerd vertaalsysteem
- Eén Python notebook per les met gebruik van Microsoft Agent Framework

## Setup Commando's

### Vereisten
- Python 3.12 of hoger
- Azure abonnement (voor Microsoft Foundry)
- Azure CLI geïnstalleerd en geauthenticeerd (`az login`)

### Initiële Setup

1. **Clone of fork de repository:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # OF
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Creëer en activeer Python virtuele omgeving:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Op Windows: venv\Scripts\activate
   ```

3. **Installeer afhankelijkheden:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Stel omgevingsvariabelen in:**
   ```bash
   cp .env.example .env
   # Bewerk .env met uw API-sleutels en eindpunten
   ```

### Vereiste Omgevingsvariabelen

Voor **Microsoft Foundry** (Vereist):
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry project endpoint
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - Model implementatienaam (bijv. gpt-4.1-mini)

Voor **Azure AI Search** (Les 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI Search endpoint
- `AZURE_SEARCH_API_KEY` - Azure AI Search API sleutel

Authenticatie: Voer `az login` uit voordat je notebooks draait (gebruikt `AzureCliCredential`).

## Ontwikkel Workflow

### Jupyter Notebooks Uitvoeren

Elke les bevat meerdere Jupyter notebooks voor verschillende frameworks:

1. **Start Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Navigeer naar een lesmap** (bijv. `01-intro-to-ai-agents/code_samples/`)

3. **Open en voer notebooks uit:**
   - `*-python-agent-framework.ipynb` - Gebruik Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Gebruik Microsoft Agent Framework (.NET)

### Werken met Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Vereist Azure abonnement
- Gebruikt `FoundryChatClient` voor Agent Service V2 (agents zichtbaar in Foundry portal)
- Klaar voor productie met ingebouwde observeerbaarheid
- Bestandsstructuur: `*-python-agent-framework.ipynb`

## Testinstructies

Dit is een educatieve repository met voorbeeldcode in plaats van productiecode met geautomatiseerde tests. Om je setup en wijzigingen te verifiëren:

### Handmatige Tests

1. **Test Python omgeving:**
   ```bash
   python --version  # Moet 3.12+ zijn
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Test notebook uitvoering:**
   ```bash
   # Converteer notitieboek naar script en voer uit (tests importeert)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Verifieer omgevingsvariabelen:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Individuele Notebooks Uitvoeren

Open notebooks in Jupyter en voer cellen sequentieel uit. Elke notebook is zelfstandig en bevat:
- Import statements
- Configuratie laden
- Voorbeeld implementaties van agents
- Verwachte outputs in markdown cellen

### Smoke-Testen van Geïmplementeerde Agents

Voor lessen waarin een agent als Microsoft Foundry gehoste agent is geïmplementeerd (01, 04, 05, 16), bevat de repo smoke-test catalogi onder `tests/` die worden uitgevoerd via de `.github/workflows/smoke-test.yml` workflow met de [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) actie. Dit is een lichte post-implementatie check (is de agent bereikbaar en volgt hij basis prompt verwachtingen?), ter aanvulling van de evaluatiepipeline in Lessen 10 en 16. Zie [tests/README.md](./tests/README.md) voor de mapping van catalogus naar les naar agent. Les 17 draait lokaal met Foundry Local en heeft geen gehost endpoint, daarom wordt deze gevalideerd door het rechtstreeks uitvoeren van zijn notebook.

## Code Stijl

### Python Conventies

- **Python Versie**: 3.12+
- **Code Stijl**: Volg standaard Python PEP 8 conventies
- **Notebooks**: Gebruik duidelijke markdown cellen om concepten uit te leggen
- **Imports**: Groepeer standaardbibliotheek, derde partij en lokale imports

### Jupyter Notebook Conventies

- Voeg beschrijvende markdown cellen toe voor code cellen
- Voeg output voorbeelden toe in notebooks ter referentie
- Gebruik duidelijke variabelennamen die passen bij lesconcepten
- Houd de notebook uitvoeringsvolgorde lineair (cel 1 → 2 → 3...)

### Bestandsorganisatie

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Bouwen en Implementatie

### Documentatie Bouwen

Deze repository gebruikt Markdown voor documentatie:
- README.md bestanden in elke lesmap
- Hoofd README.md in de root van de repository
- Geautomatiseerd vertaalsysteem via GitHub Actions

### CI/CD Pipeline

Gelegen in `.github/workflows/`:

1. **co-op-translator.yml** - Automatische vertaling naar 50+ talen
2. **welcome-issue.yml** - Verwelkomt nieuwe issues makers
3. **welcome-pr.yml** - Verwelkomt nieuwe pull request bijdragers

### Implementatie

Dit is een educatieve repository - geen implementatieproces. Gebruikers:
1. Forken of clonen de repository
2. Draaien notebooks lokaal of in GitHub Codespaces
3. Leren door voorbeelden te wijzigen en te experimenteren

## Richtlijnen voor Pull Requests

### Voor het Indienen

1. **Test je wijzigingen:**
   - Voer alle betrokken notebooks volledig uit
   - Controleer dat alle cellen zonder fouten draaien
   - Controleer of de outputs passend zijn

2. **Documentatie aanpassingen:**
   - Werk README.md bij bij toevoegen van nieuwe concepten
   - Voeg opmerkingen toe in notebooks voor complexe code
   - Zorg dat markdown cellen het doel uitleggen

3. **Bestandswijzigingen:**
   - Vermijd het commiten van `.env` bestanden (gebruik `.env.example`)
   - Commit geen `venv/` of `__pycache__/` mappen
   - Bewaar notebook outputs als ze concepten illustreren
   - Verwijder tijdelijke bestanden en backup notebooks (`*-backup.ipynb`)

### PR Titel Formaat

Gebruik beschrijvende titels:
- `[Lesson-XX] Voeg nieuw voorbeeld toe voor <concept>`
- `[Fix] Corrigeer typefout in lesson-XX README`
- `[Update] Verbeter codevoorbeeld in lesson-XX`
- `[Docs] Update setup instructies`

### Vereiste Checks

- Notebooks moeten foutloos uitvoerbaar zijn
- README bestanden moeten duidelijk en nauwkeurig zijn
- Volg bestaande codepatronen in de repository
- Zorg voor consistentie met andere lessen

## Aanvullende Notities

### Veelvoorkomende Valstrikken

1. **Python versie mismatch:**
   - Zorg dat Python 3.12+ wordt gebruikt
   - Sommige pakketten werken mogelijk niet met oudere versies
   - Gebruik `python3 -m venv` om de Python versie expliciet te specificeren

2. **Omgevingsvariabelen:**
   - Maak altijd `.env` aan vanuit `.env.example`
   - Commit het `.env` bestand niet (staat in `.gitignore`)
   - Log in met `az login` voor sleutelvrije Entra ID authenticatie

3. **Pakket conflicten:**
   - Gebruik een verse virtuele omgeving
   - Installeer vanuit `requirements.txt` in plaats van losse pakketten
   - Sommige notebooks vereisen extra pakketten vermeld in hun markdown cellen

4. **Azure services:**
   - Azure AI services vereisen een actief abonnement
   - Sommige functies zijn regiogebonden
   - Zorg dat je Azure OpenAI modelimplementatie de Responses API ondersteunt

### Leerroute

Aanbevolen volgorde door lessen:
1. **00-course-setup** - Begin hier voor omgeving setup
2. **01-intro-to-ai-agents** - Begrijp AI agent fundamenten
3. **02-explore-agentic-frameworks** - Leer over verschillende frameworks
4. **03-agentic-design-patterns** - Kernontwerppatronen
5. Ga door met genummerde lessen in volgorde

### Framework Keuze

Kies framework op basis van je doelen:
- **Alle lessen**: Microsoft Agent Framework (MAF) met `FoundryChatClient`
- **Agents registreren server-side** in Microsoft Foundry Agent Service V2 en zijn zichtbaar in het Foundry portal

### Hulp Krijgen

- Word lid van de [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Raadpleeg les README bestanden voor specifieke aanwijzingen
- Bekijk de hoofd [README.md](./README.md) voor cursusoverzicht
- Raadpleeg [Course Setup](./00-course-setup/README.md) voor gedetailleerde setup instructies

### Bijdragen

Dit is een open educatief project. Bijdragen zijn welkom:
- Verbeter codevoorbeelden
- Corrigeer typefouten of fouten
- Voeg verduidelijkende opmerkingen toe
- Stel nieuwe lesonderwerpen voor
- Vertaal naar extra talen

Zie [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) voor actuele behoeften.

## Projectspecifieke Context

### Meertalige Ondersteuning

Deze repository gebruikt een geautomatiseerd vertaalsysteem:
- Ondersteunt 50+ talen
- Vertalingen in `/translations/<lang-code>/` mappen
- GitHub Actions workflow beheert vertaalupdates
- Bronbestanden zijn in het Engels in de repository root

### Lesstructuur

Elke les volgt een consistent patroon:
1. Video thumbnail met link
2. Geschreven lesinhoud (README.md)
3. Codevoorbeelden in meerdere frameworks
4. Leerdoelen en vereisten
5. Extra leerbronnen gelinkt

### Naamgeving Code Voorbeelden

Formaat: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Les 1, MAF Python
- `14-sequential.ipynb` - Les 14, MAF geavanceerde patronen
- `16-python-agent-framework.ipynb` - Les 16, productie klantondersteuningsagent
- `17-local-agent-foundry-local.ipynb` - Les 17, lokale agent met Foundry Local + Qwen

### Speciale Mappen

- `translated_images/` - Gelokaliseerde afbeeldingen voor vertalingen
- `images/` - Originele afbeeldingen voor Engelse inhoud
- `.devcontainer/` - VS Code ontwikkelcontainer configuratie
- `.github/` - GitHub Actions workflows en sjablonen

### Afhankelijkheden

Belangrijke pakketten uit `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-to-Agent protocol ondersteuning
- `azure-ai-inference`, `azure-ai-projects` - Azure AI services
- `azure-identity` - Azure authenticatie (AzureCliCredential)
- `azure-search-documents` - Azure AI Search integratie
- `mcp[cli]` - Model Context Protocol ondersteuning

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->