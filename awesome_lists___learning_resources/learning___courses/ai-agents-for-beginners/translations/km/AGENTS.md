# AGENTS.md

## Project Overview

ឃ្លាំងកូដនេះមាន "ភ្នាក់ងារជំនួយឆ្លាតវៃសម្រាប់អ្នកចាប់ផ្តើម" - មេរៀនសិក្សាដ៏ទូលំទូលាយដែលបង្រៀនអ្វីៗទាំងអស់ដែលត្រូវការដើម្បីបង្កើតភ្នាក់ងារជំនួយឆ្លាតវៃ។ មេរៀននេះមានចំនួន១៥+ មេរៀនគ្របដណ្តប់ពីមូលដ្ឋាន ទម្រង់ការរចនា រចនាសម្ព័ន្ធ និងការដាក់បញ្ចូលផលិតកម្មនៃភ្នាក់ងារជំនួយឆ្លាតវៃ។

**បច្ចេកវិទ្យាចម្បង៖**
- Python 3.12+
- Jupyter Notebooks សម្រាប់ការសិក្សាផ្ទាល់
- ស៊ុបភេរកម្ម AI៖ Microsoft Agent Framework (MAF)
- សេវាកម្ម Azure AI៖ Microsoft Foundry, Azure AI Foundry Agent Service V2

**រចនាសម្ព័ន្ធ៖**
- រចនាសម្ព័ន្ធបែបមេរៀន (ថត 00-15+)
- មេរៀនមួយៗមាន៖ ឯកសារ README, គំរូកូដ (Jupyter notebooks), និងរូបភាព
- គាំទ្រភាសាច្រើនតាមប្រព័ន្ធបកប្រែស្វ័យប្រវត្តិ
- កំណត់ត្រា Python មួយសម្រាប់មេរៀនមួយៗដោយប្រើ Microsoft Agent Framework

## Setup Commands

### Prerequisites
- Python 3.12 ឬខ្ពស់ជាងនេះ
- ការជាវ Azure (សម្រាប់ Azure AI Foundry)
- Azure CLI ត្រូវបានដំឡើង និងបានសម្របសម្រួល (`az login`)

### Initial Setup

1. **ចម្លងឬស្វ័យប្រវត្តិឃ្លាំងកូដ៖**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # ឬ
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **បង្កើត និងបើកបរិញ្ញាបថ Python វិចិត្រស្ថាន៖**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # លើ Windows: venv\Scripts\activate
   ```

3. **ដំឡើងអាស្រ័យភាព៖**
   ```bash
   pip install -r requirements.txt
   ```

4. **កំណត់អថេរសម្រាប់បរិស្ថាន៖**
   ```bash
   cp .env.example .env
   # កែសម្រួល .env ជាមួយកូនសោ API និងចំណុចចេញរបស់អ្នក
   ```

### Required Environment Variables

សម្រាប់ **Azure AI Foundry** (ត្រូវការ):
- `AZURE_AI_PROJECT_ENDPOINT` - ចំណុចចេញគម្រោង Azure AI Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - ឈ្មោះការដាក់បញ្ចូលម៉ូដែល (ឧបរណ៍ gpt-4o)

សម្រាប់ **Azure AI Search** (មេរៀន 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - ចំណុចចេញ Azure AI Search
- `AZURE_SEARCH_API_KEY` - កូនសោ API សម្រាប់ Azure AI Search

ការផ្ទៀងផ្ទាត់៖ រត់ `az login` មុនការបើក notebook (ប្រើ `AzureCliCredential`)។

## Development Workflow

### Running Jupyter Notebooks

មេរៀនមួយៗមានកំណត់ Jupyter notebooks ច្រើនសម្រាប់ស៊ុបភេរកម្មខុសៗគ្នា៖

1. **ចាប់ផ្តើម Jupyter៖**
   ```bash
   jupyter notebook
   ```

2. **ទៅកាន់ថតមេរៀន** (ឧទាហរណ៍ `01-intro-to-ai-agents/code_samples/`)

3. **បើក និងរត់កំណត់ត្រា៖**
   - `*-python-agent-framework.ipynb` - ប្រើ Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - ប្រើ Microsoft Agent Framework (.NET)

### Working with Microsoft Agent Framework

**Microsoft Agent Framework + Azure AI Foundry:**
- ត្រូវការជាវ Azure
- ប្រើ `AzureAIProjectAgentProvider` សម្រាប់ Agent Service V2 (ភ្នាក់ងារមាននៅក្នុងទំព័រ Foundry)
- រៀបចំ​សម្រាប់ផលិតកម្មជាមួយការត្រួតពិនិត្យក្នុងខ្លួន
- គំរូឯកសារ៖ `*-python-agent-framework.ipynb`

## Testing Instructions

នេះជាឃ្លាំងកូដសិក្សាដែលមានគំរូកូដ មិនមែនកូដផលិតកម្មដែលមានតេស្តស្វ័យប្រវត្តិ។ ដើម្បីបញ្ចាក់ការតំឡើង និងការផ្លាស់ប្តូរ៖

### Manual Testing

1. **ធ្វើតេស្តបរិយាកាស Python៖**
   ```bash
   python --version  # គួរតែ 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **ធ្វើតេស្តការជ្រើសរើស notebook៖**
   ```bash
   # បម្លែងសៀវភៅកំណត់ត្រាទៅជាស្គ្រីប និងដំណើរការ (សាកល្បងនាំចូល)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **ផ្ទៀងផ្ទាត់អថេរបរិយាកាស៖**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ GITHUB_TOKEN' if os.getenv('GITHUB_TOKEN') else '✗ GITHUB_TOKEN missing')"
   ```

### Running Individual Notebooks

បើក notebooks ក្នុង Jupyter ហើយប្រតិបត្តិសែលៗជាប់គ្នា។ notebook មួយៗមានឯករាជ្យ ហើយមាន៖
- ពាក្យនាំចូល
- ការបារម្ភការកំណត់
- ការអនុវត្តភ្នាក់ងារគំរូ
- លទ្ធផលដែលរំពឹងទុកក្នុងសែល markdown

## Code Style

### Python Conventions

- **កំណែក Python**៖ 3.12+
- **របៀបគូរគង្ហ**៖ ធ្វើតាមកញ្ចប់ Python PEP 8
- **Notebooks**៖ ប្រើសែល markdown ច្បាស់សម្រាប់ពន្យល់គំនិត
- **Imports**៖ ដាក់ទិចតួចតាមបណ្ដុំបណ្ណាល័យស្ដង់ដារ ភាគីទីបី និងក្នុងតំបន់

### Jupyter Notebook Conventions

- រួមបញ្ចូលសែល markdown ពណ៌នាជាមុនកូដសែល
- បន្ថែមឧទាហរណ៍លទ្ធផលក្នុង notebooks សម្រាប់យោង
- ច្រើនប្រើឈ្មោះអថេរច្បាស់ដែលត្រូវនឹងគំនិតមេរៀន
- រក្សាការរត់ notebook ជាសំណុំ​បែបលីនុច (សែល 1 → 2 → 3…)

### File Organization

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Build and Deployment

### Building Documentation

ឃ្លាំងនេះប្រើ Markdown សម្រាប់ឯកសារ៖
- ឯកសារ README.md នៅក្នុងថតមេរៀននីមួយៗ
- README.md ប្រធាននៅគោលឃ្លាំង
- ប្រព័ន្ធបកប្រែស្វ័យប្រវត្តិតាម GitHub Actions

### CI/CD Pipeline

ស្ថិតនៅ `.github/workflows/`៖

1. **co-op-translator.yml** - បកប្រែស្វ័យប្រវត្តិទៅភាសា 50+
2. **welcome-issue.yml** - ស្វាគមន៍អ្នកបង្កើតបញ្ហាថ្មី
3. **welcome-pr.yml** - ស្វាគមន៍អ្នកចូលរួម pull request ថ្មី

### Deployment

នេះជាឃ្លាំងសិក្សា - មិនមានដំណើរការដាក់បញ្ចូលផលិតកម្មទេ។ អ្នកប្រើ៖
1. Fork ឬ clone ឃ្លាំង
2. រត់ notebooks នៅក្នុងមូលដ្ឋានឬ GitHub Codespaces
3. រៀនតាមការផ្លាស់ប្តូរ និងសាកល្បងគំរូ

## Pull Request Guidelines

### Before Submitting

1. **ធ្វើតេស្តកូដរបស់អ្នក៖**
   - រត់ notebooks ដែលបានប៉ះពាល់ពេញលេញ
   - ផ្ទៀងផ្ទាត់សែលទាំងអស់រត់ដោយគ្មានកំហុស
   - ពិនិត្យលទ្ធផលឲ្យសមរម្យ

2. **ធ្វើបច្ចុប្បន្នភាពឯកសារ៖**
   - បន្ទាន់សម័យ README.md ប្រសិនបើបន្ថែមគំនិតថ្មី
   - បន្ថែមមតិយោបល់នៅក្នុង notebooks សម្រាប់កូដស្មុគស្មាញ
   - មានសែល markdown ពន្យល់គោលបំណង

3. **ផ្លាស់ប្តូរឯកសារ៖**
   - មិនគួរបញ្ចូលឯកសារ `.env` (ប្រើ `.env.example`)
   - មិនបញ្ចូលថត `venv/` ឬ `__pycache__/`
   - រក្សាលទ្ធផលក្នុង notebook ពេលបង្ហាញគំនិត
   - លុបឯកសារបណ្តោះអាសន្ន និង backup notebooks (`*-backup.ipynb`)

### PR Title Format

ប្រើចំណងជើងពណ៌នាខ្លី៖
- `[Lesson-XX] បន្ថែមគំរូថ្មីសម្រាប់ <concept>`
- `[Fix] កែតម្រូវសំណត់ភាសា README មេរៀន XX`
- `[Update] ផ្លាស់ប្តូរកូដគំរូមេរៀន XX`
- `[Docs] បន្ទាន់សម័យសេចក្ដីណែនាំតំឡើង`

### Required Checks

- notebooks រត់ដោយគ្មានកំហុស
- README មួយៗច្បាស់និងត្រឹមត្រូវ
- អនុវត្តលំនាំកូដមានរួចមក
- រក្សាគុណភាពឲ្យស្របគ្នានឹងមេរៀនផ្សេងទៀត

## Additional Notes

### Common Gotchas

1. **កំណែ Python មិនត្រូវគ្នា៖**
   - ប្រើ Python 3.12+ តែងតែ
   - កញ្ចប់ខ្លះប្រហែលជាមិនដំណើរការជាមួយកំណែចាស់
   - ប្រើ `python3 -m venv` ដើម្បីកំណត់កំណែ Python ជាក់លាក់

2. **អថេរបរិយាកាស៖**
   - តែងតែបង្កើត `.env` ពី `.env.example`
   - មិនបញ្ចូលឯកសារ `.env` (ស្ថិតក្នុង `.gitignore`)
   - Token GitHub ត្រូវការតំណត់សិទ្ធិសមស្រប

3. **ផ្ទុះកញ្ចប់៖**
   - ប្រើបរិញ្ញាបថថ្មី
   - ដំឡើងពី `requirements.txt` មិនមែនពីកញ្ចប់បុគ្គល
   - ពីរ notebooks ខ្លះត្រូវការកញ្ចប់បន្ថែមដែលបានរាយនៅក្នុងសែល markdown

4. **សេវាកម្ម Azure៖**
   - សេវាកម្ម Azure AI ត្រូវការជាវសកម្ម
   - មានមុខងារប្រភេទតំបន់ជាក់លាក់
   - មានកំណត់កម្រិតជំពូកឥតគិតថ្លៃសម្រាប់មូដែល GitHub

### Learning Path

ណែនាំដំណើរការលេខមេរៀន៖
1. **00-course-setup** - ចាប់ផ្តើមសម្រាប់តំឡើងបរិយាកាស
2. **01-intro-to-ai-agents** - យល់ដឹងពីមូលដ្ឋានភ្នាក់ងារជំនួយឆ្លាតវៃ
3. **02-explore-agentic-frameworks** - រៀនអំពីស៊ុបភេរកម្មនានា
4. **03-agentic-design-patterns** - គំរូរចនាចម្បង
5. តាមដានមេរៀនលំដាប់លេខបន្តពេញលេញ

### Framework Selection

ជ្រើសFramework ដោយយោងទៅលើគោលបំណងរបស់អ្នក៖
- **មេរៀនទាំងអស់**៖ Microsoft Agent Framework (MAF) ជាមួយ `AzureAIProjectAgentProvider`
- **ភ្នាក់ងារចុះបញ្ជីនៅប៉ុស្តិ៍ម៉ាស៊ីនបម្រើ** ក្នុង Azure AI Foundry Agent Service V2 ហើយបង្ហាញនៅទំព័រ Foundry

### Getting Help

- ចូលរួម [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- ពិនិត្យឯកសារ README មេរៀនសម្រាប់ណែនាំជាក់លាក់
- មើល README.md បញ្ជាក់ពីជំហានមេរៀន
- យោងទៅ [Course Setup](./00-course-setup/README.md) សម្រាប់ការណែនាំលម្អិត

### Contributing

នេះគឺជាប្រព័ន្ធសិក្សាសាធារណៈដោយទូលទូ ដើម្បីមានការចូលរួម៖
- កែលម្អគំរូកូដ
- កែសំរួលកំហុស ពាក្យមិនត្រឹមត្រូវ
- បន្ថែមមតិពន្យល់
- ផ្តល់យោបល់ជាមេរៀនថ្មី
- បកប្រែទៅភាសាបន្ថែម

មើល [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) សម្រាប់តម្រូវការបច្ចុប្បន្ន ។

## Project-Specific Context

### Multi-Language Support

ឃ្លាំងកូដនេះប្រើប្រព័ន្ធបកប្រែស្វ័យប្រវត្តិ៖
- គាំទ្រភាសា 50+
- បកប្រេទុកនៅក្នុងថត `/translations/<lang-code>/`
- Workflow GitHub Actions គ្រប់គ្រងការអាប់ដេតបកប្រែ
- ឯកសារដើមសរសេរជាភាសាអង់គ្លេសនៅគោលឃ្លាំង

### Lesson Structure

មេរៀនមួយៗពាក់ព័ន្ធបែបបទដូចខាងក្រោម៖
1. រូបភាពវីដេអូច្នៃជាមួយតំណភ្ជាប់
2. មាតិកាមេរៀនសរសេរ (README.md)
3. គំរូកូដក្នុងស៊ុបភេរកម្មច្រើន
4. គោលបំណងការសិក្សានិងលក្ខខណ្ឌជាមុន
5. រត់រយះពេលសិក្សាបន្ថែមត្រូវបានភ្ជាប់

### Code Sample Naming

រចនាម្ដង៖ `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - មេរៀន 1, MAF Python
- `14-sequential.ipynb` - មេរៀន 14, MAF លំនាំខ្ពស់

### Special Directories

- `translated_images/` - រូបភាពបកប្រែ
- `images/` - រូបភាពដើមសម្រាប់មាតិកាអង់គ្លេស
- `.devcontainer/` - ការកំណត់ VS Code Container អភិវឌ្ឍ
- `.github/` - ការងារលំហូរ Workflow និងគំរូ GitHub Actions

### Dependencies

កញ្ចប់សំខាន់ៗពី `requirements.txt`៖
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - គាំទ្រពិធីការភ្នាក់ងារទៅភ្នាក់ងារ
- `azure-ai-inference`, `azure-ai-projects` - សេវាកម្ម Azure AI
- `azure-identity` - ការផ្ទៀងផ្ទាត់ Azure (AzureCliCredential)
- `azure-search-documents` - សមាហរណកម្ម Azure AI Search
- `mcp[cli]` - គាំទ្រពិធីការស្របម៉ូដែល Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការព្រមាន**៖
ឯកសារនេះត្រូវបានបកប្រែដោយប្រើសេវាបកប្រែ AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ខណៈពេលដែលយើងខិតខំធ្វើឱ្យមានភាពត្រឹមត្រូវ សូមយកចិត្តទុកដាក់ថាការបកប្រែដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនទៀងទាត់។ ឯកសារដើមនៅក្នុងភាសាតំណើរការដើមគួរត្រូវបានស្គាល់ថាជា ប្រភពផ្លូវការជាចម្បង។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមផ្តល់អនុសាសន៍ឱ្យប្រើការបកប្រែដោយមនុស្សវិជ្ជាជីវៈ។ យើងមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកប្រែខុសចេញពីការប្រើប្រាស់ការបកប្រែនេះឡើយ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->