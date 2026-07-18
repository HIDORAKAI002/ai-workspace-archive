# AGENTS.md

## Muhtasari wa Mradi

Hifadhi hii ina "Maajenti wa AI kwa Waanzilishi" - kozi kamili ya elimu inayofundisha kila kitu kinachohitajika kujenga Maajenti wa AI. Kozi ina masomo 18 (kwa nambari 00-18) yanayojumuisha misingi, mifumo ya muundo, mifumo, utoaji wa uzalishaji, maajenti wa eneo la karibu/kwenye kifaa, na usalama wa maajenti wa AI.

**Teknolojia Muhimu:**
- Python 3.12+
- Jupyter Notebooks kwa kujifunza kwa mwingiliano
- Mifumo ya AI: Microsoft Agent Framework (MAF)
- Huduma za Azure AI: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Mimyakato:**
- Muundo wa masomo (saraka 00-15+)
- Kila somo lina: Nyaraka README, mifano ya msimbo (Jupyter notebooks), na picha
- Usaidizi wa lugha nyingi kupitia mfumo wa tafsiri otomatiki
- Jarida la Python moja kwa kila somo linalotumia Microsoft Agent Framework

## Amri za Kusanidi

### Mahitaji ya Awali
- Python 3.12 au zaidi
- Usajili wa Azure (kwa Microsoft Foundry)
- Azure CLI imewekwa na kuthibitishwa (`az login`)

### Usanidi wa Kwanza

1. **Fanya kloni au tuma forogo ya hifadhi:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # AU
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Tengeneza na washa mazingira ya virtual ya Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Kwenye Windows: venv\Scripts\activate
   ```

3. **Sakinisha utegemezi:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Weka vigezo vya mazingira:**
   ```bash
   cp .env.example .env
   # Hariri .env na funguo zako za API na nukta za mwisho
   ```

### Vigezo Muhimu vya Mazingira

Kwa **Microsoft Foundry** (Lazima):
- `AZURE_AI_PROJECT_ENDPOINT` - kiungo cha mradi wa Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - jina la uenezaji wa mfano (mfano, gpt-4.1-mini)

Kwa **Azure AI Search** (Somo 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - kiungo cha Azure AI Search
- `AZURE_SEARCH_API_KEY` - ufunguo wa API wa Azure AI Search

Uthibitishaji: Endesha `az login` kabla ya kuendesha notebooks (inatumia `AzureCliCredential`).

## Mtiririko wa Maendeleo

### Kuendesha Jupyter Notebooks

Kila somo lina notebooks nyingi za Jupyter kwa mifumo tofauti:

1. **Anzisha Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Nenda kwenye saraka ya somo** (mfano, `01-intro-to-ai-agents/code_samples/`)

3. **Fungua na endesha notebooks:**
   - `*-python-agent-framework.ipynb` - Kutumia Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Kutumia Microsoft Agent Framework (.NET)

### Kufanya kazi na Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Inahitaji usajili wa Azure
- Inatumia `FoundryChatClient` kwa Agent Service V2 (maajenti yanaonekana katika lango la Foundry)
- Tayari kwa uzalishaji na ufahamu uliotengenezwa ndani
- Mfano wa faili: `*-python-agent-framework.ipynb`

## Maelekezo ya Kupima

Hii ni hifadhi ya elimu yenye msimbo wa mfano badala ya msimbo wa uzalishaji na majaribio ya otomatiki. Ili kuthibitisha usanidi wako na mabadiliko:

### Vipimo kwa Mkono

1. **Jaribu mazingira ya Python:**
   ```bash
   python --version  # Inapaswa kuwa 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Jaribu utekelezaji wa notebook:**
   ```bash
   # Badilisha daftari kuwa hati na uendeshe (inajaribu kuagiza)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Thibitisha vigezo vya mazingira:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Kuendesha Notebooks Binafsi

Fungua notebooks katika Jupyter na tekeleza seli kwa mpangilio. Kila notebook ina vitu vyenyewe na inajumuisha:
- Taunzaji za import
- Kupakia usanidi
- Utekelezaji wa mfano wa maajenti
- Matokeo yanayotarajiwa katika seli za markdown

### Vipimo vya Kuangalia Haraka Maajenti Waliowekwa

Kwa masomo ambapo maajenti wamesakinishwa kama maajenti wanaohudumiwa na Microsoft Foundry (01, 04, 05, 16), hifadhi ina maktaba za vipimo vya haraka chini ya `tests/` zinazofanywa na mtiririko wa kazi wa `.github/workflows/smoke-test.yml` kupitia kitendo cha [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test). Hizi ni lango nyepesi baada ya usambazaji (je, maajenti yanapatikana na kufuata matarajio ya msingi ya maelekezo?), zikikamilisha mtiririko wa tathmini katika Masomo 10 na 16. Angalia [tests/README.md](./tests/README.md) kwa ramani ya maktaba-kwenda-somo-kwenda-maajenti. Somo 17 linaendeshwa eneo la karibu na Foundry Local na halina kiungo kilichohudumiwa, kwa hivyo linathibitishwa kwa kuendesha notebook yake moja kwa moja.

## Mtindo wa Msimbo

### Mikutano ya Python

- **Toleo la Python**: 3.12+
- **Mtindo wa Msimbo**: Fuata kanuni za kawaida za PEP 8 za Python
- **Notebooks**: Tumia seli za markdown zilizo wazi kuelezea dhana
- **Imports**: Pangilia kwa maktaba za kawaida, za mtu wa tatu, za ndani

### Mikutano ya Jupyter Notebook

- Jumuisha seli za maelezo kabla ya seli za msimbo
- Ongeza mifano ya matokeo katika notebooks kwa marejeleo
- Tumia majina ya badiliko yaliyo wazi yanayolingana na dhana za somo
- Hifadhi mpangilio wa utekelezaji wa notebook kuwa mfuatano (seli 1 → 2 → 3...)

### Uandaaji wa Faili

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Ujenzi na Usambazaji

### Ujenzi wa Nyaraka

Hifadhi hii inatumia Markdown kwa nyaraka:
- Faili za README.md katika kila saraka ya somo
- README.md kuu katika mzizi wa hifadhi
- Mfumo wa tafsiri wa otomatiki kupitia Vitendo vya GitHub

### Mtiririko wa CI/CD

Iko `.github/workflows/`:

1. **co-op-translator.yml** - Tafsiri moja kwa moja kwa lugha 50+
2. **welcome-issue.yml** - Inawakaribisha waumba wa masuala mapya
3. **welcome-pr.yml** - Inawakaribisha wachangiaji wa maombi ya kuvuta

### Usambazaji

Hii ni hifadhi ya elimu - hakuna mchakato wa usambazaji. Watumiaji:
1. Fanya forogo au kloni ya hifadhi
2. Endesha notebooks eneo lako au katika GitHub Codespaces
3. Jifunze kwa kubadilisha na kujaribu mifano

## Miongozo ya Maombi ya Kuvuta

### Kabla ya Kuwasilisha

1. **Jaribu mabadiliko yako:**
   - Endesha notebooks zilizoathirika kikamilifu
   - Thibitisha seli zote zinaendeshwa bila makosa
   - Angalia matokeo ni sahihi

2. **Sasisha nyaraka:**
   - Sasisha README.md ikiwa uniongeza dhana mpya
   - Ongeza maoni katika notebooks kwa msimbo mgumu
   - Hakikisha seli za markdown zinaelezea madhumuni

3. **Mabadiliko ya faili:**
   - Epuka kuingiza faili `.env` (tumias `.env.example`)
   - Usingize saraka `venv/` au `__pycache__/`
   - Hifadhi matokeo ya notebook wakati yanaonyesha dhana
   - Ondoa faili za muda na notebooks za nakala za hifadhi (`*-backup.ipynb`)

### Muundo wa Kichwa cha PR

Tumia vichwa vinavyoelezea:
- `[Lesson-XX] Ongeza mfano mpya kwa <dhana>`
- `[Fix] Rekebisha tahajia katika README ya somo-XX`
- `[Update] Boreshaji la mfano wa msimbo katika somo-XX`
- `[Docs] Sasisha maagizo ya usanidi`

### Vipimo Vinavyohitajika

- Notebooks zinapaswa kuendeshwa bila makosa
- Faili za README ziwe wazi na sahihi
- Fuata mifumo ya msimbo inayopo katika hifadhi
- Hifadhi mshikamano na masomo mengine

## Vidokezo Zaidi

### Mashaka ya Kawaida

1. **Toleo la Python lisilolingana:**
   - Hakikisha unatumia Python 3.12+
   - Baadhi ya vifurushi huenda visifanyi kazi na matoleo ya zamani
   - Tumia `python3 -m venv` kutaja toleo la Python kwa uwazi

2. **Vigezo vya mazingira:**
   - Daima tengeneza `.env` kutoka `.env.example`
   - Usingize faili `.env` (imo kwenye `.gitignore`)
   - Ingia kwa `az login` kwa uthibitishaji wa Entra ID bila funguo

3. **Migongano ya kifurushi:**
   - Tumia mazingira safi ya virtual
   - Sakinisha kutoka `requirements.txt` badala ya vifurushi vya pekee
   - Baadhi ya notebooks zinaweza kuhitaji vifurushi vingine vilivyoelezwa katika seli za markdown

4. **Huduma za Azure:**
   - Huduma za Azure AI zinahitaji usajili hai
   - Baadhi ya vipengele ni maalum kwa mikoa fulani
   - Hakikisha uenezaji wa mfano wa Azure OpenAI unaunga mkono API ya Majibu

### Njia ya Kujifunza

Pendekezo la mpangilio wa masomo:
1. **00-course-setup** - Anza hapa kwa usanidi wa mazingira
2. **01-intro-to-ai-agents** - Elewa misingi ya maajenti wa AI
3. **02-explore-agentic-frameworks** - Jifunze kuhusu mifumo tofauti
4. **03-agentic-design-patterns** - Mifumo kuu ya muundo
5. Endelea kwa masomo yenye namba kwa mpangilio

### Uchaguzi wa Mfumo

Chagua mfumo kulingana na malengo yako:
- **Masomo yote**: Microsoft Agent Framework (MAF) na `FoundryChatClient`
- **Maajenti wanajiandikisha upande wa seva** katika Microsoft Foundry Agent Service V2 na wanaonekana katika lango la Foundry

### Kupata Msaada

- Jiunge na [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Angalia faili za README za somo kwa maelekezo maalum
- Angalia [README.md](./README.md) kuu kwa muhtasari wa kozi
- Rejelea [Course Setup](./00-course-setup/README.md) kwa maagizo ya usanidi yaliyokamilika

### Kuchangia

Huu ni mradi wa elimu wa wazi. Michango inakaribishwa:
- Boresha mifano ya msimbo
- Rekebisha tahajia au makosa
- Ongeza maoni kwa ufafanuzi
- Pendekeza mada mpya za somo
- Tafsiri kwa lugha za ziada

Angalia [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) kwa mahitaji ya sasa.

## Muktadha Maalum wa Mradi

### Usaidizi wa Lugha Nyingi

Hifadhi hii inatumia mfumo wa tafsiri otomatiki:
- Lugha 50+ zinazotegemewa
- Tafsiri ziko katika saraka za `/translations/<lang-code>/`
- Mtiririko wa Vitendo vya GitHub unashughulikia masasisho ya tafsiri
- Faili za chanzo ziko kwa Kiingereza kwenye mzizi wa hifadhi

### Muundo wa Somo

Kila somo hufuata muundo unaoeleweka:
1. Kidokezo cha video chenye kiungo
2. Maandishi ya somo (README.md)
3. Mifano ya msimbo katika mifumo mingi
4. Malengo ya kujifunza na mahitaji ya awali
5. Rasilimali za ziada za kujifunza zilizounganishwa

### Kujaribu Majina ya Mifano

Muundo: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Somo 1, MAF Python
- `14-sequential.ipynb` - Somo 14, mifumo ya juu ya MAF
- `16-python-agent-framework.ipynb` - Somo 16, maajenti wa msaada kwa wateja katika uzalishaji
- `17-local-agent-foundry-local.ipynb` - Somo 17, maajenti wa eneo la karibu na Foundry Local + Qwen

### Saraka Maalum

- `translated_images/` - Picha zinazotafsiriwa
- `images/` - Picha asili kwa maudhui ya Kiingereza
- `.devcontainer/` - Usanidi wa mazingira ya maendeleo ya VS Code
- `.github/` - Mitiririko ya Vitendo vya GitHub na templates

### Vitegemezi

Vifurushi muhimu kutoka `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Usaidizi wa itifaki ya Agent-to-Agent
- `azure-ai-inference`, `azure-ai-projects` - Huduma za Azure AI
- `azure-identity` - Uthibitishaji wa Azure (AzureCliCredential)
- `azure-search-documents` - Uunganisho wa Azure AI Search
- `mcp[cli]` - Usaidizi wa Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->