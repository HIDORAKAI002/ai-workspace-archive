# AGENTS.md

## Pangkalahatang-ideya ng Proyekto

Ang repositoryong ito ay naglalaman ng "Mga AI Agent para sa mga Nagsisimula" - isang komprehensibong kurso na edukasyonal na nagtuturo ng lahat ng kailangan upang makabuo ng AI Agents. Binubuo ang kurso ng 18 na mga aralin (naka-numero mula 00-18) na sumasaklaw sa mga pundasyon, disenyo ng mga pattern, mga framework, production deployment, lokal/on-device agents, at seguridad ng AI agents.

**Pangunahing Teknolohiya:**
- Python 3.12+
- Jupyter Notebooks para sa interaktibong pagkatuto
- AI Frameworks: Microsoft Agent Framework (MAF)
- Azure AI Services: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Arkitektura:**
- Istrukturang batay sa aralin (mga direktoryo 00-15+)
- Ang bawat aralin ay naglalaman ng: README na dokumentasyon, mga halimbawa ng code (Jupyter notebooks), at mga larawan
- Suporta sa magkakaibang wika sa pamamagitan ng automated translation system
- Isang Python notebook bawat aralin gamit ang Microsoft Agent Framework

## Mga Utos sa Setup

### Mga Kinakailangan
- Python 3.12 o mas mataas pa
- Azure subscription (para sa Microsoft Foundry)
- Azure CLI na naka-install at naka-authenticate (`az login`)

### Paunang Setup

1. **I-clone o i-fork ang repositoryo:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # O
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Gumawa at i-activate ang Python virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Sa Windows: venv\Scripts\activate
   ```

3. **I-install ang mga dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **I-set up ang mga environment variables:**
   ```bash
   cp .env.example .env
   # I-edit ang .env gamit ang iyong mga API key at mga endpoint
   ```

### Mga Kinakailangang Environment Variables

Para sa **Microsoft Foundry** (Kinakailangan):
- `AZURE_AI_PROJECT_ENDPOINT` - Endpoint ng Microsoft Foundry project
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - Pangalan ng model deployment (hal. gpt-4.1-mini)

Para sa **Azure AI Search** (Aralin 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Endpoint ng Azure AI Search
- `AZURE_SEARCH_API_KEY` - API key ng Azure AI Search

Authentication: Patakbuhin ang `az login` bago patakbuhin ang mga notebooks (gamit ang `AzureCliCredential`).

## Workflow ng Development

### Pagpapatakbo ng Jupyter Notebooks

Ang bawat aralin ay naglalaman ng maraming Jupyter notebooks para sa iba't ibang framework:

1. **Simulan ang Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Pumunta sa direktoryo ng aralin** (halimbawa, `01-intro-to-ai-agents/code_samples/`)

3. **Buksan at patakbuhin ang mga notebooks:**
   - `*-python-agent-framework.ipynb` - Paggamit ng Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Paggamit ng Microsoft Agent Framework (.NET)

### Paggamit ng Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Kinakailangan ang Azure subscription
- Ginagamit ang `FoundryChatClient` para sa Agent Service V2 (mga agent na nakikita sa Foundry portal)
- Handa sa production na may built-in na observability
- Pattern ng file: `*-python-agent-framework.ipynb`

## Mga Tagubilin sa Pagsusulit

Ito ay isang edukasyonal na repositoryo na may halimbawang code kaysa production code na may automated tests. Upang kumpirmahin ang iyong setup at mga pagbabago:

### Manwal na Pagsusulit

1. **Subukan ang Python environment:**
   ```bash
   python --version  # Dapat ay 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Subukan ang pagpapatakbo ng notebook:**
   ```bash
   # I-convert ang notebook sa script at patakbuhin (tinitingnan ang mga import)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Kumpirmahin ang mga environment variables:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Pagpapatakbo ng Indibidwal na mga Notebook

Buksan ang mga notebook sa Jupyter at isagawa ang mga cell nang sunud-sunod. Ang bawat notebook ay self-contained at naglalaman ng:
- Mga import statement
- Pag-load ng configuration
- Mga halimbawa ng pagpapatupad ng agent
- Inaasahang mga output sa markdown cells

### Smoke-Testing ng mga Na-deploy na Agent

Para sa mga aralin kung saan ang agent ay na-deploy bilang isang Microsoft Foundry hosted agent (01, 04, 05, 16), ang repo ay naglalaman ng mga smoke-test na katalogo sa ilalim ng `tests/` na pinapatakbo ng `.github/workflows/smoke-test.yml` workflow gamit ang [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) action. Ito ay isang magaan na post-deploy gate (maaabot ba ang agent at sumusunod sa mga pangunahing prompt na inaasahan?), na kumukumpleto sa evaluation pipeline sa Mga Aralin 10 at 16. Tingnan ang [tests/README.md](./tests/README.md) para sa katalogo-patungkol-sa-aralin-patungkol-sa-agent na pagtutugma. Ang Aralin 17 ay tumatakbo lokal gamit ang Foundry Local at walang hosted na endpoint, kaya ito ay pinapatunayan sa pamamagitan ng pagtakbo mismo ng notebook nito.

## Estilo ng Code

### Mga Konbensiyon sa Python

- **Bersyon ng Python**: 3.12+
- **Estilo ng Code**: Sundin ang standard na Python PEP 8 na mga konbensiyon
- **Mga Notebook**: Gumamit ng malinaw na mga markdown cell para ipaliwanag ang mga konsepto
- **Import**: Pangkatin ayon sa standard library, third-party, at local imports

### Mga Konbensiyon sa Jupyter Notebook

- Isama ang mga naglalarawang markdown cells bago ang code cells
- Magdagdag ng mga halimbawa ng output sa mga notebook bilang sanggunian
- Gumamit ng malinaw na mga variable name na tumutugma sa mga konsepto ng aralin
- Panatilihin ang linear na pagkakasunod ng pagpapatakbo ng notebook (cell 1 → 2 → 3...)

### Organisasyon ng File

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Pagbuo at Deployment

### Pagbuo ng Dokumentasyon

Ang repositoryong ito ay gumagamit ng Markdown para sa dokumentasyon:
- Mga README.md na file sa bawat folder ng aralin
- Pangunahing README.md sa root ng repositoryo
- Automated translation system sa pamamagitan ng GitHub Actions

### CI/CD Pipeline

Matatagpuan sa `.github/workflows/`:

1. **co-op-translator.yml** - Awtomatikong pagsasalin sa mahigit 50 mga wika
2. **welcome-issue.yml** - Binabati ang mga bagong lumikha ng isyu
3. **welcome-pr.yml** - Binabati ang mga bagong kontribyutor ng pull request

### Deployment

Ito ay isang edukasyonal na repositoryo - walang proseso ng deployment. Ang mga user ay:
1. Mag-fork o i-clone ang repositoryo
2. Patakbuhin ang mga notebook nang lokal o sa GitHub Codespaces
3. Matuto sa pamamagitan ng pagbabago at pagsusubok sa mga halimbawa

## Mga Patnubay sa Pull Request

### Bago Mag-submit

1. **Subukan ang iyong mga pagbabago:**
   - Patakbuhin nang buo ang mga naapektuhang notebook
   - Siguraduhin na walang error ang pagpapatakbo ng mga cell
   - Tiyakin na ang mga output ay naaangkop

2. **Pag-Update ng Dokumentasyon:**
   - I-update ang README.md kung nagdadagdag ng mga bagong konsepto
   - Magdagdag ng mga paliwanag sa mga notebook para sa mga komplikadong code
   - Siguraduhing ipapaliwanag ng mga markdown cell ang layunin

3. **Mga pagbabago sa file:**
   - Iwasan ang pag-commit ng `.env` files (gamitin ang `.env.example`)
   - Huwag mag-commit ng `venv/` o `__pycache__/` na mga direktoryo
   - Panatilihin ang mga output ng notebook kapag nagpapakita ito ng mga konsepto
   - Alisin ang mga pansamantalang file at backup notebooks (`*-backup.ipynb`)

### Format ng Pamagat ng PR

Gumamit ng mga naglalarawang pamagat:
- `[Lesson-XX] Magdagdag ng bagong halimbawa para sa <concept>`
- `[Fix] Itama ang typo sa lesson-XX README`
- `[Update] Pahusayin ang halimbawa ng code sa lesson-XX`
- `[Docs] I-update ang mga tagubilin sa setup`

### Kinakailangang Mga Check

- Dapat tumakbo ang mga notebook nang walang error
- Dapat malinaw at tama ang mga README files
- Sundin ang umiiral na pattern ng code sa repositoryo
- Panatilihin ang pagkakapare-pareho sa ibang mga aralin

## Karagdagang Mga Tala

### Mga Karaniwang Problema

1. **Hindi tugmang bersyon ng Python:**
   - Siguraduhing gumagamit ng Python 3.12+ 
   - Ang ilang mga package ay maaaring hindi gumana sa mas lumang bersyon
   - Gamitin ang `python3 -m venv` upang tahasang tukuyin ang bersyon ng Python

2. **Mga environment variables:**
   - Laging gumawa ng `.env` mula sa `.env.example`
   - Huwag i-commit ang `.env` file (naka-lista ito sa `.gitignore`)
   - Mag-sign in gamit ang `az login` para sa keyless na Entra ID authentication

3. **Mga conflict sa package:**
   - Gumamit ng bagong virtual environment
   - I-install mula sa `requirements.txt` kaysa sa indibidwal na mga package
   - Ang ilang mga notebook ay maaaring mangailangan ng karagdagang mga package na nabanggit sa kanilang markdown cells

4. **Mga serbisyo ng Azure:**
   - Nangangailangan ng aktibong subscription ang Azure AI services
   - Ang ilang mga tampok ay partikular sa rehiyon
   - Siguraduhing sinusuportahan ng deployment ng iyong Azure OpenAI model ang Responses API

### Landas ng Pagkatuto

Inirerekomendang pagkakasunod-sunod sa mga aralin:
1. **00-course-setup** - Simulan dito para sa setup ng environment
2. **01-intro-to-ai-agents** - Unawain ang mga pundasyon ng AI agent
3. **02-explore-agentic-frameworks** - Matuto tungkol sa iba't ibang mga framework
4. **03-agentic-design-patterns** - Pangunahing mga disenyo ng pattern
5. Magpatuloy sa mga naka-numero na aralin nang sunud-sunod

### Pagpili ng Framework

Pumili ng framework batay sa iyong mga layunin:
- **Lahat ng aralin**: Microsoft Agent Framework (MAF) gamit ang `FoundryChatClient`
- **Mga agent ay nagrerehistro sa server-side** sa Microsoft Foundry Agent Service V2 at nakikita sa Foundry portal

### Paghahanap ng Tulong

- Sumali sa [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Suriin ang mga README file ng aralin para sa tiyak na gabay
- Tingnan ang pangunahing [README.md](./README.md) para sa pangkalahatang-ideya ng kurso
- Sumangguni sa [Course Setup](./00-course-setup/README.md) para sa detalyadong mga tagubilin sa setup

### Pagtutulungan

Ito ay isang bukas na proyektong edukasyonal. Malugod ang mga kontribusyon:
- Pagbutihin ang mga halimbawa ng code
- Itama ang mga typo o error
- Magdagdag ng mga paliwanag na komento
- Magmungkahi ng mga bagong paksang aralin
- Magsalin sa karagdagang mga wika

Tingnan ang [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) para sa mga kasalukuyang pangangailangan.

## Kontekstong Tiyak sa Proyekto

### Suporta sa Maraming Wika

Gumagamit ang repositoryong ito ng automated translation system:
- Suportado ang mahigit sa 50 mga wika
- Mga pagsasalin sa mga direktoryo na `/translations/<lang-code>/`
- Ginagawa ang mga update sa pagsasalin ng workflow ng GitHub Actions
- Ang mga source file ay nasa Ingles sa root ng repositoryo

### Istruktura ng Aralin

Ang bawat aralin ay sumusunod sa isang konsistenteng pattern:
1. Thumbnail ng video na may link
2. Nakasaad na nilalaman ng aralin (README.md)
3. Mga halimbawa ng code sa iba't ibang framework
4. Mga layunin at kinakailangan sa pag-aaral
5. Mga karagdagang mapagkukunan sa pag-aaral na naka-link

### Pagpapangalan sa Code Sample

Format: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Aralin 1, MAF Python
- `14-sequential.ipynb` - Aralin 14, mga advanced na pattern ng MAF
- `16-python-agent-framework.ipynb` - Aralin 16, production customer-support agent
- `17-local-agent-foundry-local.ipynb` - Aralin 17, lokal na agent gamit ang Foundry Local + Qwen

### Mga Espesyal na Direktoryo

- `translated_images/` - Mga lokal na imahe para sa mga pagsasalin
- `images/` - Orihinal na mga imahe para sa nilalamang Ingles
- `.devcontainer/` - Konfigurasiyon ng VS Code development container
- `.github/` - Mga workflow ng GitHub Actions at mga template

### Mga Depende

Pangunahing mga package mula sa `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Suporta sa Agent-to-Agent protocol
- `azure-ai-inference`, `azure-ai-projects` - Serbisyo ng Azure AI
- `azure-identity` - Azure authentication (AzureCliCredential)
- `azure-search-documents` - Integrasyon ng Azure AI Search
- `mcp[cli]` - Suporta sa Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->