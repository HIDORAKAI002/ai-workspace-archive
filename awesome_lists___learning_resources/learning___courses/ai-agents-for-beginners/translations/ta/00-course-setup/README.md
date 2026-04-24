# பாடக்கூறு அமைப்பு

## அறிமுகம்

இந்த பாடத்தில், இந்த பாடக்கூற்றின் குறியீடு உதாரணங்களை எப்படி இயக்குவது என்பதைப் பற்றி விளக்கப்படும்.

## மற்ற கற்றலாளர்களுடன் சேர்ந்து உதவி பெறுங்கள்

உங்கள் ரெப்போவை கிளோன் செய்யத் தொடங்குவதற்கு முன், அமைப்பிற்கு உதவ, பாடக்கூறுக்கான கேள்விகளை கேட்க அல்லது பிற கற்றலாளர்களுடன் தொடர்பு கொள்ள, [AI Agents For Beginners Discord சேனலில்](https://aka.ms/ai-agents/discord) சேர வேண்டும்.

## இந்த ரெப்போவை கிளோன் செய்ய அல்லது ஃபோர்க் செய்யவும்

தொடங்க, தயவுசெய்து GitHub ரெப்போவை கிளோன் செய்யவோ அல்லது ஃபோர்க் செய்யவோ செய்யவும். இது பாடத் தளப்பொருளின் உங்கள் சொந்த பதிப்பை உருவாக்கும், இதனால் நீங்கள் குறியீட்டை இயக்கி, சோதித்து மற்றும் மாற்றலாம்!

இது செய்ய <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">ரெப்போவை ஃபோர்க் செய்ய</a> லிங்கை கிளிக் செய்யலாம்

தற்போது, கீழ்க்கண்ட லிங்கில் இந்த பாடத்திட்டத்தின் உங்கள் சொந்த ஃபோர்க் செய்யப்பட்ட பதிப்பு இருக்கும்:

![Forked Repo](../../../translated_images/ta/forked-repo.33f27ca1901baa6a.webp)

### ஷலோ கிளோன் (கருத்தரங்கம்/கோட்ஸ்பேஸ்களுக்கு பரிந்துரைக்கப்படுகிறது)

  >முழு ரெப்போ (~3 GB) வரலாற்றையும் அனைத்து கோப்புகளையும் பதிவிறக்கம் செய்யும் போது பெரியதாக இருக்கலாம். நீங்கள் கருத்தரங்கத்திற்கு மட்டுமே செல்வதாக இருந்தால் அல்லது சில பாடக் கோப்புக விக்கப்பட்டால், ஷலோ கிளோன் (அல்லது ஸ்பார்ஸ் கிளோன்) பெரும்பாலான பதிவிறக்கத்தை குறைக்கும், வரலாற்றை குறைத்து அல்லது பிளாப்களை தவிர்த்து.

#### விரைவான ஷலோ கிளோன் — குறைந்த வரலாறு, அனைத்து கோப்புகளும்

கீழ்க்கண்ட கட்டளைகளில் `<your-username>`ஐ உங்கள் ஃபோர்க் URL (அல்லது மேல்சுரங்க URL) இன் மூலம் மாற்றவும்.

சரியான commit வரலாற்றை மட்டும் கிளோன் செய்ய:

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

எந்தொரு கிளையை கிளோன் செய்ய:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### பகுதி (ஸ்பார்ஸ்) கிளோன் — குறைந்த பிளாப்கள் + தேர்ந்தெடுக்கப்பட்ட கோப்புறைகள் மட்டுமே

இது பகுதி கிளோன் மற்றும் ஸ்பார்ஸ்-செக்அவுட்டை பயன்படுத்துகிறது (Git 2.25+ தேவை, பகுதி கிளோன் ஆதரவு உடைய நவீன Git பரிந்துரைக்கப்படுகிறது):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

ரெப்போ கோப்புறைக்கு செல்லவும்:

```bash|powershell
cd ai-agents-for-beginners
```

பிறகு நீங்கள் வேண்டுமென்ற கோப்புறைகளை குறிப்பிடவும் (கீழ் உதாரணம் இரண்டு கோப்புறைகளை காட்டுகிறது):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

கிளோன் செய்து கோப்புகளை உறுதி செய்த பிறகு, நீங்கள் கோப்புகளை மட்டும் வேண்டுமெனில் (git வரலாறு இல்லாமல்) இடத்தை விடுவிக்க, ரெப்போ மெட்டாடேட்டாவை நீக்கவும் (💀திரும்ப முடியாதது — அனைத்து Git செயல்பாடுகளும் பாதிக்கப்படும்: commit, pull, push, வரலாறு அணுகல் இல்லை).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# பவர் ஷெல்
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces பயன்படுத்துதல் (உள்ளூர் பெரிய பதிவிறக்கங்களை தவிர்க்க பரிந்துரைக்கப்படுகிறது)

- இந்த ரெப்போவிற்கான புதிய Codespace ஐ [GitHub UI](https://github.com/codespaces) மூலம் உருவாக்கவும்.

- புதிய Codespace டெர்மினலில் மேலே உள்ள ஷலோ/ஸ்பார்ஸ் கிளோன் கட்டளைகளில் ஒரொன்றை இயக்கி தேவையான பாடக் கோப்புகளை மட்டுமே Codespace பணிப் பகுதிக்கு கொண்டு வாருங்கள்.
- விருப்பமாக: Codespaces இல் கிளோன் செய்த பிறகு கூடுதல் இடத்தை மீட்டெடுக்க .git ஐ அகற்று (மேலே உள்ள அகற்று கட்டளைகள் பார்க்கவும்).
- குறிப்பு: Codespaces ஐ நேரடியாக திறக்க விரும்பினால் (கிளோன் இல்லாமல்), Codespaces devcontainer சூழலை உருவாக்கும் மற்றும் நீங்கள் தேவையானதைவிட அதிக அம்சங்களை யார் வழங்கலாம். புதிய Codespace இல் ஷலோ பிரதியை கிளோன் செய்தால் இட பயன்பாட்டைக் குறுக்க அதிக கட்டுப்பாடு உண்டு.

#### குறிப்பு

- உங்கள் ஃபோர்க் URL உடன் கிளோன் URL ஐ எப்போதும் மாற்றுங்கள், நீங்கள் திருத்த / commit செய்ய விரும்பினால்.
- பிறகு நீங்கள் அதிக வரலாறு அல்லது கோப்புகள் தேவையானால், அவற்றை பெறலாம் அல்லது ஸ்பார்ஸ்-செக்அவுட் இணைத்து கூடுதல் கோப்புறையைச் சேர்க்கலாம்.

## குறியீட்டை இயக்குதல்

இந்த பாடக்கூறு AI முகவர்களை உருவாக்க கைகண்டறிதல் அனுபவம் பெற நீங்கள் இயக்க கூடிய பல Jupyter குறிப்பேட்டுக்கள் வழங்குகிறது.

குறியீடு உதாரணங்கள் **Microsoft Agent Framework (MAF)** ஐ `AzureAIProjectAgentProvider` உடன் பயன்படுத்துகின்றன, இது **Microsoft Foundry** யின் மூலம் **Azure AI Agent Service V2** (Responses API) இணையமுச்சியில் இணைக்கிறது.

அனைத்து Python குறிப்பேட்டுக்கள் `*-python-agent-framework.ipynb` என குறிக்கப்பட்டுள்ளன.

## தேவைகள்

- Python 3.12+
  - **குறிப்பு**: Python3.12 நிறுவவில்லை என்றால், அதை நிறுவுக. பிறகு `requirements.txt` கோப்பில் இருந்து சரியான பதிப்புகள் நிறுவ Python3.12 கொண்டு venv உருவாக்குக.

    >உதாரணம்

    Python venv கோப்புறையை உருவாக்கு:

    ```bash|powershell
    python -m venv venv
    ```

    பிறகு venv சூழலை செயல்படுத்த:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NET பயன்படுத்தும் உதாரண குறியீடுகளுக்கு, [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) அல்லது அதற்கு மேற்பட்டது நிறுவInstall்கு. பிறகு நிறுவிய .NET SDK பதிப்பை சரிபார்க்க:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — அங்கீகாரத்திற்கு அவசியம். [aka.ms/installazurecli](https://aka.ms/installazurecli) இலிருந்து நிறுவ.
- **Azure சந்தா** — Microsoft Foundry மற்றும் Azure AI Agent Service அணுக.
- **Microsoft Foundry திட்டம்** — உள்ளடக்க மாடலைப்போன்ற ஒரு திட்டம் (எ.கா., `gpt-4o`). கீழே [அடி 1](#அடி-1-microsoft-foundry-திட்டத்தை-உருவாக்கவும்) பார்த்து.

இந்த ரெப்போவின் ரூட்டில் உள்ள `requirements.txt` கோப்பில் அனைத்து தேவையான Python தொகுதிகள் உள்ளன.

அவற்றை நிறுவ, ரெப்போவின் ரூட்டில் கீழ்காணும் கட்டளையை உங்கள் டெர்மினலில் இயக்கவும்:

```bash|powershell
pip install -r requirements.txt
```

எந்தவொரு முரண்பாடுகளையோ பிரச்சனையையோ தவிர்க்க Python நெருக்கமான சூழலை உருவாக்க பரிந்துரைக்கப்படுகிறது.

## VSCode அமைக்கவும்

VSCode இல் சரியான Python பதிப்பைப் பயன்படுத்துகிறீர்களா என்பதை சரிபார்க்கவும்.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry மற்றும் Azure AI Agent Service ஐ அமைக்கவும்

### அடி 1: Microsoft Foundry திட்டத்தை உருவாக்கவும்

நீங்கள் Azure AI Foundry **ஹப்** மற்றும் **திட்டம்** உடன் ஒரு பயனர் இருக்க வேண்டும், மேலும் குறிப்பேட்டுக்களை இயக்கும் மாடல் நடப்புத் திட்டமாக இருக்க வேண்டும்.

1. [ai.azure.com](https://ai.azure.com) செல்லவும் மற்றும் உங்கள் Azure கணக்குடன் புகுபதிகை செய்யவும்.
2. ஒரு **ஹப்** உருவாக்கவும் (அல்லது ஏற்கனவே உள்ளதை பயன்படுத்தவும்). பார்க்கவும்: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. ஹப்புக்குள் ஒரு **திட்டம்** உருவாக்கவும்.
4. **Models + Endpoints** → **Deploy model** மூலம் ஒரு மாடல் (எ.கா., `gpt-4o`) வெளியிடவும்.

### அடி 2: உங்கள் திட்ட இடைமுக மற்றும் மாடல் வெளியீட்டு பெயரை பெறுக

Microsoft Foundry போர்டலில் உங்கள் திட்டத்தில் இருந்து:

- **திட்ட இடைமுகம்** — **Overview** பக்கத்திற்கு சென்று இடைமுக URL ஐ நகல் எடுக்கவும்.

![Project Connection String](../../../translated_images/ta/project-endpoint.8cf04c9975bbfbf1.webp)

- **மாடல் வெளியீட்டு பெயர்** — **Models + Endpoints** சென்று உங்கள் வெளியிடப்பட்ட மாடலை தேர்வு செய்து **Deployment name** (எ.கா., `gpt-4o`) லை கவனிக்கவும்.

### அடி 3: `az login` மூலம் Azure இல் நுழைக

அனைத்து குறிப்பேட்டுக்களும் அங்கீகாரத்திற்கு **`AzureCliCredential`** பயன்படுத்துகின்றன — API விசைகள் தேவையில்லை. எனவே Azure CLI மூலம் உள்நுழைவது அவசியம்.

1. **Azure CLI** இன்னும் நிறுவல் செய்யவில்லை என்றால் நிறுவுக: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. உள்நுழைய கீழ்க்காணும் கட்டளையை இயக்கவும்:

    ```bash|powershell
    az login
    ```

    அல்லது உங்களுக்கு உலாவி இல்லாத தொலைநிலை/கோட்ஸ்பேஸ் சூழல் இருந்தால்:

    ```bash|powershell
    az login --use-device-code
    ```

3. உங்களை மூடியிருக்கும் சந்தாவை தேர்ந்தெடுக்கவும் — நீங்கள் கொண்டுள்ள Foundry திட்டத்தை உள்ளடக்கியது தேர்ந்தெடுக்கவும்.

4. உள்நுழைந்துள்ளீர்களா என்பதை சரிபார்க்க:

    ```bash|powershell
    az account show
    ```

> **ஏன் `az login`?** குறிப்பேட்டுக்கள் `azure-identity` உட்பெறும் `AzureCliCredential` மூலம் அங்கீகாரம் பெறுகின்றன. இது உங்கள் Azure CLI அமர்வு அங்கீகாரம் வழங்கும் — `.env` கோப்பில் API விசைகள் அல்லது ரகசியங்கள் தேவையில்லை. இது ஒரு [பாதுகாப்பு சிறந்த நடைமுறை](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### அடி 4: உங்கள் `.env` கோப்பை உருவாக்கவும்

உதாரண கோப்பை நகலெடுக்கவும்:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# பவர் ஷெல்
Copy-Item .env.example .env
```

`.env` திறந்து கீழ்க்காணும் இரண்டு மதிப்புகளை நிரப்பவும்:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| மாறி | எங்கு கண்டறிவது |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry போர்டல் → உங்கள் திட்டம் → **Overview** பக்கத்தில் |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry போர்டல் → **Models + Endpoints** → உங்கள் வெளியிடப்பட்ட மாடல் பெயர் |

பல்கலைபாடுகளுக்கு இனி இது போதும்! குறிப்பேட்டுக்கள் தானாக உங்கள் `az login` அமர்வு மூலம் அங்கீகாரம் பெற்றுக் கொள்வது.

### அடி 5: Python சார்ந்த பொருட்களை நிறுவவும்

```bash|powershell
pip install -r requirements.txt
```

நீங்கள் முன்பே உருவாக்கிய நெருக்கமான சூழலில் இதை இயக்க பரிந்துரைக்கப்படுகிறது.

## பாடம் 5 (Agentic RAG)க்கான கூடுதல் அமைப்பு

பாடம் 5, மீட்பு விருத்தி உருவாக்கத்திற்காக **Azure AI Search** பயன்படுத்துகிறது. அந்தப் பாடத்தை இயக்க திட்டமிட்டால், இந்த மாறிகளை `.env` கோப்பில் சேர்க்கவும்:

| மாறி | எங்கு கண்டறிவது |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure போர்டல் → உங்கள் **Azure AI Search** வளம் → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure போர்டல் → உங்கள் **Azure AI Search** வளம் → **Settings** → **Keys** → முதன்மை நிர்வாக விசை |

## பாடங்கள் 6 மற்றும் 8 (GitHub Models) க்கான கூடுதல் அமைப்பு

பாடங்கள் 6 மற்றும் 8 இல் சில குறிப்பேட்டுகள் **GitHub Models** ஐ பயன்படுத்துகிறது Azure AI Foundry பதில். நீங்கள் அந்த உதாரணங்களை இயக்க திட்டமிட்டால், `.env` கோப்பில் இந்த மாறிகளை சேர்க்கவும்:

| மாறி | எங்கு கண்டறிவது |
|----------|-----------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | `https://models.inference.ai.azure.com` (ஒழுங்கு மதிப்பு) பயன்படுத்தவும் |
| `GITHUB_MODEL_ID` | பயன்படுத்த வேண்டிய மாடல் பெயர் (எ.கா., `gpt-4o-mini`) |

## மாற்று வழங்குபவர்: MiniMax (OpenAI-உடன்பிறப்பானது)

[MiniMax](https://platform.minimaxi.com/) பெரிய உள்ளடக்கம் கொண்ட மாடல்களை (204K டோக்கன்கள் வரை) OpenAI-உடன்பிறப்பான API மூலம் வழங்குகிறது. Microsoft Agent Framework இன் `OpenAIChatClient` எந்த OpenAI-உடன்பிறப்பான இடைமுகத்துடனும் வேலை செய்யும் போது, MiniMax-ஐ GitHub Models அல்லது OpenAI க்கு மாற்றி பயன்படுத்தலாம்.

`.env` கோப்பில் இது போன்ற மாறிகளைச் சேர்க்கவும்:

| மாறி | எங்கு கண்டறிவது |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API விசைகள் |
| `MINIMAX_BASE_URL` | `https://api.minimax.io/v1` (ஒழுங்கு மதிப்பு) பயன்படுத்தவும் |
| `MINIMAX_MODEL_ID` | பயன்படுத்த வேண்டிய மாடல் பெயர் (எ.கா., `MiniMax-M2.7`) |

**கிடைக்கும் மாடல்கள்**: `MiniMax-M2.7` (பரிந்துரைக்கப்படும்), `MiniMax-M2.7-highspeed` (விரைவான பதில்கள்)

`OpenAIChatClient` பயன்படுத்தும் குறியீடு உதாரணங்கள் (எ.கா., பாடம் 14 ஹோட்டல் பதிவு வேலைப்பாடு) when `MINIMAX_API_KEY` அமைக்கப்பட்டால் தானாக உங்கள் MiniMax அமைப்பைப் பயன்படுத்தும்.

## பாடம் 8 (Bing Grounding Workflow) க்கான கூடுதல் அமைப்பு

பாடம் 8 இல் உள்ள நிலைமை வேலைப்பாட்டுக் குறிப்பேட்டை **Bing Grounding** ஐ Azure AI Foundry மூலம் பயன்படுத்துகிறது. அந்த உதாரணத்தை இயக்க திட்டமிட்டால், `.env` கோப்பில் கீழ்காணும் மாறியைச் சேர்க்கவும்:

| மாறி | எங்கு கண்டறிவது |
|----------|-----------------|
| `BING_CONNECTION_ID` | Azure AI Foundry போர்டல் → உங்கள் திட்டம் → **Management** → **Connected resources** → உங்கள் Bing இணைப்பு → இணைப்பு ID நகலெடுக்கவும் |

## பிரச்சனைகள் தீர்வுகருத்துகள்

### macOS இல் SSL சான்றிதழ் உறுதிப்படுத்தல் பிழைகள்

நீங்கள் macOS இல் உள்ளீர்கள் மற்றும் கீழ்க்காணும் போல பிழை காணப்படுமானால்:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

இது Python இல் macOS இல் மிகவும் பரபரப்பான பிரச்சினை, கணினி SSL சான்றிதழ்கள் தானாக நம்பப்படாது. கீழ்காணும் தீர்வுகளை குறியேற்றிச் செய்யவும்:

**விருப்பம் 1: Python இல் கூடிய Install Certificates ஸ்கிரிப்டை ஓட்டவும் (பரிந்துரைக்கப்படுகிறது)**

```bash
# உங்கள் நிறுவிய Python பதிப்பை (உதாரணமாக, 3.12 அல்லது 3.13) 3.XX என மாற்றவும்:
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**விருப்பம் 2: உங்கள் குறிப்பேட்டில் `connection_verify=False` பயன்படுத்தவும் (GitHub Models குறிப்பேட்டுகளுக்கே)**

பாடம் 6 இல் (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) சொன்ன மறைக்கப்பட்ட வழி முயற்சி உள்ளது. கிளையண்ட் உருவாக்கும்போது `connection_verify=False` இனை ஒழுங்காற்றவும்:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # சான்றிதழ் பிழைகள் ஏற்பட்டால் SSL சரிபார்ப்பை முடக்கு
)
```

> **⚠️ எச்சரிக்கை:** SSL உறுதிப்படுத்தலை முடக்கி `connection_verify=False` பயன்படுத்துவது பாதுகாப்பின் அளவை குறைக்கும். இது சான்றிதழ் பரிசோதனையை தவிர்க்கிறது. இதை வளர்ச்சித் சூழலில் தற்காலிக தீர்வாக மட்டும் பயன்படுத்தவும், உற்பத்திச் சூழலில் தவிர்க்கவும்.

**விருப்பம் 3: `truststore` ஐ நிறுவி பயன்படுத்தவும்**

```bash
pip install truststore
```

பிறகு உங்கள் குறிப்பேட்டின் மேலே அல்லது ஸ்கிரிப்டின் தொடக்கத்தில் இருக்கும் எந்த நெட்வொர்க் அழைப்பிற்கு முன் இதைச் சேர்க்கவும்:

```python
import truststore
truststore.inject_into_ssl()
```

## எங்காவது சிக்கியிருக்கிறீர்களா?

இந்த அமைப்பை இயக்கும்போது பிரச்சனைகள் இருந்தால், எங்கள் <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a>யில் வரவும் அல்லது <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">issue ஒன்றை உருவாக்கவும்</a>.

## அடுத்த பாடம்

இப்பொழுது நீங்கள் இந்த பாடம் குறியீட்டை இயக்க தயாராக உள்ளீர்கள். AI முகவர்களின் உலகத்தைப் பற்றி மேலும் கற்க மகிழுங்கள்!

[AI முகவர்களுக்கும் முகவர் பயன்பாடுகளுக்கும் அறிமுகம்](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**அறிவிப்பு**:  
இந்தக் காகதம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) மூலம் மொழிமாற்றம் செய்யப்பட்டது. நாங்கள் துல்லியத்திற்காக முயலினாலும், தானியங்கி மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கக்கூடும் என்பதை தயவு செய்து அறிந்துகொள்ளுங்கள். அதன் சொந்த மொழியில் உள்ள அசல் ஆவணம் அதிகாரபூர்வ ஆதாரமாகக் கருதப்பட வேண்டும். மிக முக்கியமான தகவல்களுக்கு, தொழில்முறை மனித மொழிபெயர்ப்பு பரிந்துரை செய்யப்படுகிறது. இந்த மொழிபெயர்ப்பினால் ஏற்படும் ஏதையாவது தவறான புரிதல்கள் அல்லது தவறான பொருள் விளக்கம் குறித்து நாங்கள் பொறுப்பேற்க மாட்டோம்.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->