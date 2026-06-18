# పర్యావరణం సెటప్

## 🎯 ఈ ప్రయోగశాల కవర్ చేయడం

ఈ హ్యాండ్స్-ఆన్ ప్రయోగశాల మీకు MCP సర్వర్లు PostgreSQL ఇంటిగ్రేషన్‌తో తయారు చేయడానికి పూర్తి అభివృద్ధి పర్యావరణాన్ని ఏర్పాటు చేయడంలో మార్గదర్శనం చేస్తుంది. మీరు అవసరమైన అన్ని పరికరాలను కాంఫిగర్ చేస్తారు, Azure వనరులను డిప్లాయ్ చేస్తారు మరియు అమలు ప్రారంభించుటకు ముందుగా మీ సెటప్‌ను ధృవీకరిస్తారు.

## అవలోకనం

సరిగ్గా అభివృద్ధి పర్యావరణం MCP సర్వర్ అభివృద్ధి విజయవంతంగా చేయడానికి ఎంతో ముఖ్యం. ఈ ప్రయోగశాలలో Docker, Azure సేవలు, అభివృద్ధి పరికరాలు సెటప్ చేయడం మరియు వాటి సమగ్ర సహకారాన్ని ధృవీకరించే దశల వారీ సూచనలు ఉన్నాయి.

ఈ ప్రయోగశాల ముగింపుకు, మీరు Zava Retail MCP సర్వర్ నిర్మాణానికి పూర్తిగా పని చేసే అభివృద్ధి పర్యావరణాన్ని కలిగి ఉంటారు.

## అభ్యాస లక్ష్యాలు

ఈ ప్రయోగశాల ముగింపు నాటికి, మీరు సామర్థ్యం అవుతారు:

- **అవసరమైన అన్ని అభివృద్ధి పరికరాలను** ఇన్స్టాల్ చేసి, కాంఫిగర్ చేయడంలో
- **MCP సర్వర్ కోసం Azure వనరులను** డిప్లాయ్ చేయడంలో
- **PostgreSQL మరియు MCP సర్వర్ కోసం Docker కంటైనర్లను** ఏర్పాటు చేయడంలో
- **టెస్ట్ కలయికలతో మీ పర్యావరణం సెటప్‌ను** ధృవీకరించడంలో
- **సాధారణ సెటప్ సమస్యలు మరియు కాన్ఫిగరేషన్ సమస్యలను** పరిష్కరించడంలో
- **అభివృద్ధి వర్క్‌ఫ్లో మరియు ఫైల్ నిర్మాణం** గురించి అవగాహన పొందడంలో

## 📋 అవసరాలు తనిఖీ

ప్రారంభించక ముందు, మీరు ఇచ్ఛించవలసింది:

### అవసరమైన జ్ఞానం
- బేసిక్ కమాండ్ లైన్ ఉపయోగం (విండోస్ కమాండ్ ప్రాంప్ట్/PowerShell)
- పర్యావరణ చరాలగల (environment variables) అవగాహన
- Git వెర్షన్ కంట్రోల్ పరిచయం
- బేసిక్ Docker కాన్సెప్ట్‌లు (కంటైనర్లు, ఇమేజెస్, వాల్యూమ్లు)

### సిస్టమ్ అవసరాలు
- **ఆపరేటింగ్ సిస్టమ్**: Windows 10/11, macOS, లేదా Linux
- **RAM**: కనీసం 8GB (16GB సూచించబడింది)
- **స్టోరేజ్**: కనీసం 10GB ఖాళీ స్థలం
- **నెట్‌వర్క్**: డౌన్లోడ్లు మరియు Azure డిప్లాయ్‌మెంట్ కోసం ఇంటర్నెట్ కనెక్షన్

### ఖాతా అవసరాలు
- **Azure సబ్‌స్క్రిప్షన్**: ఉచిత స్థాయి సరిపోతుంది
- **GitHub ఖాతా**: రెపొజిటరీ యాక్సెస్ కోసం
- **Docker Hub ఖాతా**: (ఐచ్చికం) కస్టమ్ ఇమేజ్ ప్రచురణ కోసం

## 🛠️ పరికరాలు ఇన్స్టాల్ చేయడం

### 1. Docker Desktop ఇన్స్టాల్ చేయండి

మా అభివృద్ధి సెటప్ కోసం కంటైనరైజ్డ్ వాతావరణాన్ని Docker అందిస్తుంది.

#### Windows ఇన్స్టాల్

1. **Docker Desktop డౌన్లోడ్ చేయండి**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **ఇన్స్టాల్ చేసి, కాంఫిగర్ చేయండి**:
   - అడ్మినిస్ట్రేటర్ గా ఇన్స్టాలర్ నడపండి
   - అడిగి వచ్చినప్పుడు WSL 2 ఇంటిగ్రేషన్‌ని ఎనేబుల్ చేయండి
   - ఇన్స్టాలేషన్ పూర్తయిన తరువాత మళ్ళీ కంప్యూటర్ రీస్టార్ట్ చేయండి

3. **ఇన్స్టాలేషన్ ధృవీకరించండి**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS ఇన్స్టాల్

1. **డౌన్లోడ్ చేసి ఇన్స్టాల్ చేయండి**:
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg నుండి డౌన్లోడ్ చేయండి
   # లేదా Homebrew ఉపయోగించండి
   brew install --cask docker
   ```

2. **Docker Desktop ప్రారంభించండి**:
   - అప్లికేషన్ల నుంచి Docker Desktop లాంచ్ చేయండి
   - ప్రారంభ సెటప్ విజార్డును పూర్తి చేయండి

3. **ఇన్స్టాలేషన్ ధృవీకరించండి**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux ఇన్స్టాల్

1. **Docker Engine ఇన్స్టాల్ చేయండి**:
   ```bash
   # ఉబుంటు/డెబియన్
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # గ్రూప్ మార్పులు ప్రభావవంతం కావడానికి లాగ్ అవుట్ చేసి మళ్ళీ లాగ్ ఇన్ అవ్వండి
   ```

2. **Docker Compose ఇన్స్టాల్ చేయండి**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI ఇన్స్టాల్ చేయండి

Azure CLI Azure వనరుల డిప్లాయ్‌మెంట్ మరియు నిర్వహణను సులభతరం చేస్తుంది.

#### Windows ఇన్స్టాల్

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS ఇన్స్టాల్

```bash
# హోంబ్రూ ఉపయోగించడం
brew install azure-cli

# లేదంటే ఇన్స్టాలర్ ఉపయోగించడం
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux ఇన్స్టాల్

```bash
# ఉబుంటు/డెబియన్
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# ఆర్‌హెచ్‌ఇఎల్/సెంటొస్
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### ధృవీకరణ మరియు ఆథెంటికేషన్

```bash
# ఇన్స్టలేషన్‌ను తనిఖీ చేయండి
az version

# ఏజ్యూర్‌లో లాగిన్ అవ్వండి
az login

# డిఫాల్ట్ సబ్‌స్క్రిప్షన్ సెట్ చేయండి (మీకు అనేక ఉంటే)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git ఇన్స్టాల్ చేయండి

Git రెపొజిటరీని క్లోన్ చేయడం మరియు వెర్షన్ కంట్రోల్ కోసం అవసరం.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git సాధారణంగా ముందే ఇన్‌స్టాల్ చేయబడుతుంది, కానీ మీరు Homebrew ద్వారా అప్డేట్ చేసుకోవచ్చు
brew install git
```

#### Linux

```bash
# ఉబుంటు/డెబియన్
sudo apt update && sudo apt install git

# ఆర్ హెచ్ఈఎల్/సెంటోస్
sudo dnf install git
```

### 4. VS Code ఇన్స్టాల్ చేయండి

Visual Studio Code MCP సపోర్ట్‌తో సమగ్ర అభివృద్ధి వాతావరణాన్ని అందిస్తుంది.

#### ఇన్స్టలేషన్

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### అవసరమైన ఎక్స్టెన్షన్లు

ఈ VS Code ఎక్స్టెన్షన్లను ఇన్స్టాల్ చేయండి:

```bash
# కమాండ్ లైన్ ద్వారా ఇన్‌స్టాల్ చేయండి
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

లేదా VS Code ద్వారా ఇన్స్టాల్ చేయండి:
1. VS Code ఓపెన్ చేయండి
2. ఎక్స్టెన్షన్లకు వెళ్లండి (Ctrl+Shift+X)
3. ఇన్స్టాల్ చేయండి:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python ఇన్స్టాల్ చేయండి

MCP సర్వర్ అభివృద్ధి కోసం Python 3.8+ అవసరం.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# హోంబ్రూ ఉపయోగిస్తోంది
brew install python@3.11
```

#### Linux

```bash
# ఉబుంటు/డెబియన్
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# ఆర్ హెచ్ఇఎల్/సెంట్ఓఎస్
sudo dnf install python3.11 python3.11-pip
```

#### ఇన్స్టాలేషన్ ధృవీకరణ

```bash
python --version  # Python 3.11.x చూపించాలి
pip --version      # pip వెర్షన్ చూపించాలి
```

## 🚀 ప్రాజెక్ట్ సెటప్

### 1. రెపొజిటరీని క్లోన్ చేయండి

```bash
# మెయిన్ రిపోజిటరీని క్లోన్ చేయండి
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# ప్రాజెక్ట్ డైరెక్టరీకి నావిగేట్ చేయండి
cd MCP-Server-and-PostgreSQL-Sample-Retail

# రిపోజిటరీ నిర్మాణాన్ని ధృవీకరించండి
ls -la
```

### 2. Python వర్చువల్ ఎన్విరornment్ సృష్టించండి

```bash
# వర్చువల్ ఎన్విరონ్మెంట్ సృష్టించండి
python -m venv mcp-env

# వర్చువల్ ఎన్విరôn్మెంట్ ను యాక్టివేట్ చేయండి
# విండోస్
mcp-env\Scripts\activate

# మాక్‌ఒఎస్/లినక్స్
source mcp-env/bin/activate

# పిప్ అప్గ్రేడ్ చేయండి
python -m pip install --upgrade pip
```

### 3. Python డిపెండెన్సీలను ఇన్స్టాల్ చేయండి

```bash
# అభివృద్ధి ఆధారాలను ఇన్‌స్టాల్ చేయండి
pip install -r requirements.lock.txt

# కీలక ప్యాకేజీలను సరిచూడండి
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure వనరుల డిప్లాయ్‌మెంట్

### 1. వనరుల అవసరాలను అర్థం చేసుకోండి

మా MCP సర్వర్ ఈ Azure వనరులను అవసరం చేస్తుంది:

| **వనరు** | **ఉద్దేశ్యం** | **అంచనా ఖర్చు** |
|----------|--------------|------------------|
| **Microsoft Foundry** | AI మోడల్ హోస్టింగ్ మరియు నిర్వహణ | $10-50/నెల |
| **OpenAI Deployment** | టెక్స్ట్ ఎంబెడ్డింగ్ మోడల్ (text-embedding-3-small) | $5-20/నెల |
| **Application Insights** | మానిటరింగ్ మరియు టెలిమెట్రీ | $5-15/నెల |
| **Resource Group** | వనరుల నిర్వహణ | ఉచితం |

### 2. Azure వనరులు డిప్లాయ్ చేయండి

#### ఎంపిక A: ఆటోమేటెడ్ డిప్లాయ్‌మెంట్ (సిఫారసు చేసినది)

```bash
# బ్రౌజ్ చేయడానికి ఇన్‌ఫ్రాస్ట్రక్చర్ డైరెక్టరీకు వెళ్ళండి
cd infra

# విండోస్ - పవర్‌షెల్
./deploy.ps1

# మ్యాక్‌ఒఎస్/లినక్స్ - బాష్
./deploy.sh
```

డిప్లాయ్‌మెంట్ స్క్రిప్ట్ చేయగలిగేది:
1. ప్రత్యేకమైన రిసోర్స్ గ్రూప్ సృష్టించు
2. Microsoft Foundry వనరులను డిప్లాయ్ చేయండి
3. టెక్స్ట్-ఎంబెడ్డింగ్-3-స్మాల్ మోడల్ డిప్లాయ్ చేయండి
4. Application Insights ని కాంఫిగర్ చేయండి
5. ఆథెంటికేషన్ కోసం సర్వీస్ ప్రిన్సిపాల్ సృష్టించండి
6. సెటప్ కాన్ఫిగరేషన్‌తో `.env` ఫైన్ని రూపొందించండి

#### ఎంపిక B: మాన్యుయల్ డిప్లాయ్‌మెంట్

మీకు మాన్యుయల్ నియంత్రణ కావాలంటే లేదా ఆటోమేటెడ్ స్క్రిప్ట్ విఫలమైతే:

```bash
# వేరియబుల్‌లు సెట్ చేయండి
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# వనరుల సమూహం సృష్టించండి
az group create --name $RESOURCE_GROUP --location $LOCATION

# ప్రధాన టెంప్లేట్‌ను అమలు చేయండి
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure డిప్లాయ్‌మెంట్ ధృవీకరించండి

```bash
# వనరు గుంపును తనిఖీ చేయండి
az group show --name $RESOURCE_GROUP --output table

# అమర్చిన వనరులను జాబితా చేయండి
az resource list --resource-group $RESOURCE_GROUP --output table

# AI సేవను పరీక్షించండి
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. పర్యావరణ చరాల కాంఫిగర్ చేయండి

డిప్లాయ్‌మెంట్ తరువాత, మీ దగ్గర `.env` ఫైల్ ఉండాలి. అది ఈ విధంగా ఉండాలని ధృవీకరించండి:

```bash
# .env ఫైల్ విషయాలు
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# డేటాబేస్ కాన్ఫిగరేషన్ (డెవలప్‌మెంట్ కోసం)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker పర్యావరణం సెటప్

### 1. Docker కంపోజిషన్ అర్థం చేసుకోండి

మా అభివృద్ధి పర్యావరణం Docker Compose ఉపయోగిస్తుంది:

```yaml
# docker-compose.yml overview
version: '3.8'
services:
  postgres:
    image: pgvector/pgvector:pg17
    environment:
      POSTGRES_DB: zava
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-secure_password}
    ports:
      - "5432:5432"
    volumes:
      - ./data:/backup_data:ro
      - ./docker-init:/docker-entrypoint-initdb.d:ro
    
  mcp_server:
    build: .
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "8000:8000"
    env_file:
      - .env
```

### 2. అభివృద్ధి పర్యావరణం ప్రారంభించండి

```bash
# మీరు ప్రాజెక్ట్ రూట్ డైరెక్టరీలో ఉన్నారని నిర్ధారించుకోండి
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# సేవలను ప్రారంభించండి
docker-compose up -d

# సేవ స్థితిని తనిఖీ చేయండి
docker-compose ps

# లాగ్‌లను వీక్షించండి
docker-compose logs -f
```

### 3. డేటాబేస్ సెటప్ ధృవీకరించండి

```bash
# PostgreSQL కంటెయినర్‌కు కనెక్ట్ చేయండి
docker-compose exec postgres psql -U postgres -d zava

# డేటాబేస్ నిర్మాణాన్ని పరిశీలించండి
\dt retail.*

# నమూనా డేటాను ధృవీకరించండి
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL నుండి బయట పడండి
\q
```

### 4. MCP సర్వర్ టెస్ట్ చేయండి

```bash
# MCP సర్వర్ ఆరోగ్యం తనిఖీ చేయండి
curl http://localhost:8000/health

# ప్రాథమిక MCP ఎండ్‌పాయింట్ పరీక్షించండి
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code కాన్ఫిగరేషన్

### 1. MCP ఇంటిగ్రేషన్ కాంఫిగర్ చేయండి

VS Code MCP కాన్ఫిగరేషన్ సృష్టించండి:

```json
// .vscode/mcp.json
{
    "servers": {
        "zava-sales-analysis-headoffice": {
            "url": "http://127.0.0.1:8000/mcp",
            "type": "http",
            "headers": {"x-rls-user-id": "00000000-0000-0000-0000-000000000000"}
        },
        "zava-sales-analysis-seattle": {
            "url": "http://127.0.0.1:8000/mcp",
            "type": "http",
            "headers": {"x-rls-user-id": "f47ac10b-58cc-4372-a567-0e02b2c3d479"}
        },
        "zava-sales-analysis-redmond": {
            "url": "http://127.0.0.1:8000/mcp",
            "type": "http",
            "headers": {"x-rls-user-id": "e7f8a9b0-c1d2-3e4f-5678-90abcdef1234"}
        }
    },
    "inputs": []
}
```

### 2. Python ఎన్విరాన్‌మెంట్ కాంఫిగర్ చేయండి

```json
// .vscode/settings.json
{
    "python.defaultInterpreterPath": "./mcp-env/bin/python",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black",
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests"],
    "files.exclude": {
        "**/__pycache__": true,
        "**/.pytest_cache": true,
        "**/mcp-env": true
    }
}
```

### 3. VS Code ఇంటిగ్రేషన్ టెస్ట్ చేయండి

1. **VS Code లో ప్రాజెక్ట్ ఓపెన్ చేయండి**:
   ```bash
   code .
   ```

2. **AI చాట్ ఓపెన్ చేయండి**:
   - `Ctrl+Shift+P` (Windows/Linux) లేదా `Cmd+Shift+P` (macOS) నొక్కండి
   - "AI Chat" టైప్ చేసి "AI Chat: Open Chat" ఎంచుకోండి

3. **MCP సర్వర్ కనెక్షన్ పరీక్షించండి**:
   - AI Chat లో `#zava` టైప్ చేసి ఆ MCP సర్వర్స్ నుండి ఒకటి ఎంచుకోండి
   - అడగండి: "డేటాబేస్లో ఏవే టేబుల్స్ ఉన్నాయి?"
   - మీరు రీటైల్ డేటాబేస్ టేబుల్స్ జాబితాను పొందుతారు

## ✅ పర్యావరణ ధృవీకరణ

### 1. సమగ్ర సిస్టమ్ తనిఖీ

మీ సెటప్‌ను ధృవీకరించడానికి ఈ ధృవీకరణ స్క్రిప్ట్‌ని నడపండి:

```bash
# ధృవీకరణ స్క్రిప్ట్ సృష్టించండి
cat > validate_setup.py << 'EOF'
#!/usr/bin/env python3
"""
Environment validation script for MCP Server setup.
"""
import asyncio
import os
import sys
import subprocess
import requests
import asyncpg
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

async def validate_environment():
    """Comprehensive environment validation."""
    results = {}
    
    # Python సంస్కరణను తనిఖీ చేయండి
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # కావాల్సిన ప్యాకేజీలను తనిఖీ చేయండి
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Docker ను తనిఖీ చేయండి
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Azure CLI ను తనిఖీ చేయండి
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # వాతావరణ చలనశీలాలను తనిఖీ చేయండి
    required_env_vars = [
        'PROJECT_ENDPOINT',
        'AZURE_OPENAI_ENDPOINT',
        'EMBEDDING_MODEL_DEPLOYMENT_NAME',
        'AZURE_CLIENT_ID',
        'AZURE_CLIENT_SECRET',
        'AZURE_TENANT_ID'
    ]
    
    for var in required_env_vars:
        value = os.getenv(var)
        results[f'env_{var}'] = {
            'status': 'pass' if value else 'fail',
            'value': '***' if value and 'SECRET' in var else value
        }
    
    # డేటాబేస్ కనెక్షన్‌ను తనిఖీ చేయండి
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # క్యారీ పరీక్షించండి
        result = await conn.fetchval('SELECT COUNT(*) FROM retail.stores')
        await conn.close()
        
        results['database'] = {
            'status': 'pass',
            'store_count': result
        }
    except Exception as e:
        results['database'] = {
            'status': 'fail',
            'error': str(e)
        }
    
    # MCP సర్వర్‌ను తనిఖీ చేయండి
    try:
        response = requests.get('http://localhost:8000/health', timeout=5)
        results['mcp_server'] = {
            'status': 'pass' if response.status_code == 200 else 'fail',
            'response': response.json() if response.status_code == 200 else response.text
        }
    except Exception as e:
        results['mcp_server'] = {
            'status': 'fail',
            'error': str(e)
        }
    
    # Azure AI సేవని తనిఖీ చేయండి
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # ప్రమాణపత్రాలు దుర్వినియోగంగా ఉంటే ఇది విఫలమవుతుంది
        results['azure_ai'] = {'status': 'pass'}
        
    except Exception as e:
        results['azure_ai'] = {
            'status': 'fail',
            'error': str(e)
        }
    
    return results

def print_results(results):
    """Print formatted validation results."""
    print("🔍 Environment Validation Results\n")
    print("=" * 50)
    
    passed = 0
    failed = 0
    
    for component, result in results.items():
        status = result.get('status', 'unknown')
        if status == 'pass':
            print(f"✅ {component}: PASS")
            passed += 1
        else:
            print(f"❌ {component}: FAIL")
            if 'error' in result:
                print(f"   Error: {result['error']}")
            failed += 1
    
    print("\n" + "=" * 50)
    print(f"Summary: {passed} passed, {failed} failed")
    
    if failed > 0:
        print("\n❗ Please fix the failed components before proceeding.")
        return False
    else:
        print("\n🎉 All validations passed! Your environment is ready.")
        return True

if __name__ == "__main__":
    asyncio.run(main())

async def main():
    results = await validate_environment()
    success = print_results(results)
    sys.exit(0 if success else 1)

EOF

# ధృవీకరణను నిర్వహించండి
python validate_setup.py
```

### 2. మాన్యుయల్ ధృవీకరణ చెక్లిస్ట్

**✅ ప్రాథమిక పరికరాలు**
- [ ] Docker వెర్షన్ 20.10+ ఇన్స్టాల్ అయి, నడుస్తోంది
- [ ] Azure CLI 2.40+ ఇన్స్టాల్ హయ్యి, ఆథెంటికేట్ అయింది
- [ ] Python 3.8+ pip తో ఇన్స్టాల్ అయింది
- [ ] Git 2.30+ ఇన్స్టాల్ అయింది
- [ ] VS Code అవసరమైన ఎక్స్టెన్షన్లతో

**✅ Azure వనరులు**
- [ ] రిసోర్స్ గ్రూప్ విజయవంతంగా సృష్టించబడింది
- [ ] AI Foundry ప్రాజెక్ట్ డిప్లాయ్ అయింది
- [ ] OpenAI text-embedding-3-small మోడల్ డిప్లాయ్ అయింది
- [ ] Application Insights కాంఫిగరేషన్ అయింది
- [ ] సర్వీస్ ప్రిన్సిపాల్ సరైన అనుమతులతో సృష్టించబడింది

**✅ పర్యావరణం కాన్ఫిగరేషన్**
- [ ] `.env` ఫైలు అవసరమైన అన్ని చరాలతో ఉంది
- [ ] Azure క్రెడెన్షియల్స్ పనిచేస్తున్నాయి (`az account show` తో టెస్ట్ చేయండి)
- [ ] PostgreSQL కంటైనర్ నడుస్తోంది మరియు యాక్సెస్ చేయగలిగి ఉంది
- [ ] డేటాబేస్లో శాంపిల్ డేటా లోడ్ అయింది

**✅ VS Code ఇంటిగ్రేషన్**
- [ ] `.vscode/mcp.json` కాంఫిగర్ అయింది
- [ ] Python Interpreter వర్చువల్ ఎన్విరాన్మెంట్ కి సెట్ అయింది
- [ ] AI Chat లో MCP సర్వర్లు కనిపిస్తున్నాయి
- [ ] AI Chat ద్వారా టెస్ట్ క్వెరీలు నడుపగలుగుతున్నారు

## 🛠️ సాధారణ సమస్యల పరిష్కారం

### Docker సమస్యలు

**సమस्या**: Docker కంటైనర్లు స్టార్ట్ కావు
```bash
# డాకర్ సర్వీస్ స్థితిని తనిఖీ చేయండి
docker info

# లభ్యమయ్యే వనరులను తనిఖీ చేయండి
docker system df

# అవసరమైతే శుభ్రపరచండి
docker system prune -f

# డాకర్ డెస్క్‌టాప్ (విండోస్/మ్యాక్‌ఓఎస్) ను మళ్ళీ ప్రారంభించండి
# లేకపోతే డాకర్ సర్వీస్ (లినక్స్) ను మళ్ళీ ప్రారంభించండి
sudo systemctl restart docker
```

**సమస్య**: PostgreSQL కనెక్షన్ విఫలమవుతుంది
```bash
# కంటైనర్ లాగ్‌లను తనిఖీ చేయండి
docker-compose logs postgres

# కంటైనర్ ఆరోగ్యంగా ఉందని నిర్ధారించుకోండి
docker-compose ps

# నేరుగా కనెక్షన్ టెస్టు చేయండి
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure డిప్లాయ్‌మెంట్ సమస్యలు

**సమస్య**: Azure డిప్లాయ్‌మెంట్ విఫలం
```bash
# Azure CLI ప్రామాణీకరణను తనిఖీ చేయండి
az account show

# సబ్‌స్క్రిప్షన్ అనుమతులను ధృవీకరించండి
az role assignment list --assignee $(az account show --query user.name -o tsv)

# రిసోర్స్ ప్రొవైడర్ రిజిస్ట్రేషన్‌ని తనిఖీ చేయండి
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**సమసం**: AI సర్వీస్ ఆథెంటికేషన్ విఫలం
```bash
# సేవా ప్రాథమికాన్ని పరీక్షించండి
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# AI సేవా అమరికను ధృవీకరించండి
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python పర్యావరణ సమస్యలు

**సమस्या**: ప్యాకేజీ ఇన్స్టాలేషన్ విఫలం
```bash
# పిప్ మరియు సెటుప్‌టూల్స్‌ను అప్‌గ్రేడ్ చేయండి
python -m pip install --upgrade pip setuptools wheel

# పిప్ క్యాష్‌ను క్లియర్ చేయండి
pip cache purge

# సమస్యలను గుర్తించడానికి ప్యాకేజీలను ఒక్కోది చొప్పున ఇన్స్టాల్ చేయండి
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**సమస్య**: VS Code Python ఇంటర్ప్రెటర్ కనుగొనలేదు
```bash
# Python Interpreter మార్గాలను చూపించండి
which python  # macOS/Linux
where python  # Windows

# మొదటటే వర్చువల్ ఎన్‌విరాన్‌మెంట్ ను సక్రియం చేయండి
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# తరువాత VS Code ని తెరువు
code .
```

## 🎯 ముఖ్యమైన ఆధారాలు

ఈ ప్రయోగశాల పూర్తయిన తర్వాత, మీరు పొందాలి:

✅ **పూర్తి అభివృద్ధి పర్యావరణం**: అన్ని పరికరాలు ఇన్స్టాల్ చేసి, కాంఫిగర్ చేయబడ్డాయి  
✅ **Azure వనరులు డిప్లాయడ్**: AI సేవలు మరియు మద్దతు మౌలిక సదుపాయాలు  
✅ **Docker పర్యావరణం నడుస్తోంది**: PostgreSQL మరియు MCP సర్వర్ కంటైనర్లు  
✅ **VS Code ఇంటిగ్రేషన్**: MCP సర్వర్లు సెట్ చేసి యాక్సెస్ చేయగలుగుతున్నాయి  
✅ **ధృవీకరించిన సెటప్**: అన్ని భాగాలు పరీక్షించి, కలిసి పనిచేస్తున్నాయి  
✅ **సాధారణ సమస్య పరిష్కారం అవగాహన**: సాధారణ సమస్యలు మరియు పరిష్కారాలు  

## 🚀 తర్వాత ఏమి చేయాలి

మీ పర్యావరణం సిద్ధంగా ఉండగానే, మీరు కొనసాగించండి **[Lab 04: Database Design and Schema](../04-Database/README.md)** లోకి:

- రీటైల్ డేటాబేస్ స్కీమాను జాగ్రత్తగా పరిశీలించండి
- మల్టీ-టెనెంట్ డేటా మోడలింగ్ గురించి అర్థం చేసుకోండి
- రో లెవెల్ సెక్యూరిటీ అమలు గురించి నేర్చుకోండి
- శాంపిల్ రీటైల్ డేటాతో పని చేయండి

## 📚 అదనపు వనరులు

### అభివృద్ధి పరికరాలు
- [Docker డాక్యుమెంటేషన్](https://docs.docker.com/) - పూర్తిస్థాయి Docker సూచనలు
- [Azure CLI రిఫరెన్స్](https://docs.microsoft.com/cli/azure/) - Azure CLI ఆదేశాలు
- [VS Code డాక్యుమెంటేషన్](https://code.visualstudio.com/docs) - ఎడిటర్ కాన్ఫిగరేషన్ మరియు ఎక్స్టెన్షన్లు

### Azure సేవలు
- [Microsoft Foundry డాక్యుమెంటేషన్](https://docs.microsoft.com/azure/ai-foundry/) - AI సేవ కాంఫిగరేషన్
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI మోడల్ డిప్లాయ్‌మెంట్
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - మానిటరింగ్ సెటప్

### Python అభివృద్ధి
- [Python వర్చువల్ ఎన్విరాన్మెంట్లు](https://docs.python.org/3/tutorial/venv.html) - పర్యావరణ నిర్వహణ
- [AsyncIO డాక్యుమెంటేషన్](https://docs.python.org/3/library/asyncio.html) - అసింక్ ప్రోగ్రామింగ్ విధానాలు
- [FastAPI డాక్యుమెంటేషన్](https://fastapi.tiangolo.com/) - వెబ్ ఫ్రేమ్‌వర్క్ విధానాలు

---

**తరువాత**: పర్యావరణం సిద్ధంగా ఉందా? కొనసాగించండి [Lab 04: Database Design and Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->