# Configurarea Mediului

## 🎯 Ce Acoperă Acest Laborator

Acest laborator practic te ghidează prin configurarea unui mediu complet de dezvoltare pentru construirea serverelor MCP cu integrare PostgreSQL. Vei configura toate uneltele necesare, vei implementa resurse Azure și vei valida configurarea înainte de a continua cu implementarea.

## Prezentare Generală

Un mediu de dezvoltare adecvat este esențial pentru succesul dezvoltării serverelor MCP. Acest laborator furnizează instrucțiuni pas cu pas pentru configurarea Docker, serviciilor Azure, uneltelor de dezvoltare și validarea funcționării corecte a tuturor împreună.

La finalul acestui laborator, vei avea un mediu de dezvoltare complet funcțional, pregătit pentru construirea serverului Zava Retail MCP.

## Obiective de Învățare

La finalul acestui laborator, vei putea să:

- **Instalezi și configurezi** toate uneltele de dezvoltare necesare  
- **Implementezi resurse Azure** necesare pentru serverul MCP  
- **Configurezi containere Docker** pentru PostgreSQL și serverul MCP  
- **Validezi** configurarea mediului prin conexiuni de test  
- **Depanezi** probleme comune de configurare și setare  
- **Înțelegi** fluxul de dezvoltare și structura fișierelor  

## 📋 Verificare Prealabilă

Înainte de a începe, asigură-te că ai:

### Cunoștințe Necesare
- Utilizare de bază a liniei de comandă (Windows Command Prompt/PowerShell)  
- Înțelegerea variabilelor de mediu  
- Familiaritate cu controlul versiunilor Git  
- Concepte de bază Docker (containere, imagini, volume)  

### Cerințe de Sistem
- **Sistem de Operare**: Windows 10/11, macOS sau Linux  
- **RAM**: Minim 8GB (16GB recomandat)  
- **Stocare**: Cel puțin 10GB spațiu liber  
- **Rețea**: Conexiune la internet pentru descărcări și implementare Azure  

### Cerințe de Cont
- **Abonament Azure**: Nivel gratuit este suficient  
- **Cont GitHub**: Pentru acces la depozit  
- **Cont Docker Hub**: (Opțional) Pentru publicarea imaginilor personalizate  

## 🛠️ Instalarea Uneltelor

### 1. Instalează Docker Desktop

Docker oferă mediul containerizat pentru configurația noastră de dezvoltare.

#### Instalare pe Windows

1. **Descarcă Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Instalează și Configurează**:  
   - Rulează instalatorul ca Administrator  
   - Activează integrarea WSL 2 când ți se solicită  
   - Repornește calculatorul după finalizarea instalării  

3. **Verifică Instalarea**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### Instalare pe macOS

1. **Descarcă și Instalează**:  
   ```bash
   # Descărcați de la https://desktop.docker.com/mac/stable/Docker.dmg
   # Sau folosiți Homebrew
   brew install --cask docker
   ```
  
2. **Pornește Docker Desktop**:  
   - Lansează Docker Desktop din Aplicații  
   - Finalizează wizard-ul inițial de configurare  

3. **Verifică Instalarea**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Instalare pe Linux

1. **Instalează Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Deconectați-vă și conectați-vă din nou pentru ca modificările grupului să intre în vigoare
   ```
  
2. **Instalează Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Instalează Azure CLI

Azure CLI permite implementarea și gestionarea resurselor Azure.

#### Instalare pe Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### Instalare pe macOS

```bash
# Utilizând Homebrew
brew install azure-cli

# Sau folosind programul de instalare
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Instalare pe Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Verifică și Autentifică-te

```bash
# Verifică instalarea
az version

# Autentificare în Azure
az login

# Setează subscripția implicită (dacă ai mai multe)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Instalează Git

Git este necesar pentru clonarea depozitului și controlul versiunilor.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git este de obicei preinstalat, dar îl poți actualiza prin Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Instalează VS Code

Visual Studio Code oferă mediul de dezvoltare integrat cu suport MCP.

#### Instalare

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Extensii Necesare

Instalează aceste extensii VS Code:

```bash
# Instalați prin linia de comandă
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Sau instalează prin VS Code:  
1. Deschide VS Code  
2. Mergi la Extensii (Ctrl+Shift+X)  
3. Instalează:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Instalează Python

Python 3.8+ este necesar pentru dezvoltarea serverului MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Folosind Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Verifică Instalarea

```bash
python --version  # Ar trebui să afișeze Python 3.11.x
pip --version      # Ar trebui să afișeze versiunea pip
```
  
## 🚀 Configurarea Proiectului

### 1. Clonarea Depozitului

```bash
# Clonează depozitul principal
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navighează către directorul proiectului
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Verifică structura depozitului
ls -la
```
  
### 2. Creează Mediu Virtual Python

```bash
# Creează mediu virtual
python -m venv mcp-env

# Activează mediul virtual
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Actualizează pip
python -m pip install --upgrade pip
```
  
### 3. Instalează Dependențele Python

```bash
# Instalează dependențele de dezvoltare
pip install -r requirements.lock.txt

# Verifică pachetele cheie
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Implementarea Resurselor Azure

### 1. Înțelege Cerințele Resurselor

Serverul nostru MCP necesită aceste resurse Azure:

| **Resursă** | **Scop** | **Cost Estimat** |
|-------------|----------|------------------|
| **Microsoft Foundry** | Găzduire și gestionare modele AI | 10-50 USD/lună |
| **Implementare OpenAI** | Model embedding text (text-embedding-3-small) | 5-20 USD/lună |
| **Application Insights** | Monitorizare și telemetrie | 5-15 USD/lună |
| **Grup de Resurse** | Organizarea resurselor | Gratuit |

### 2. Implementează Resursele Azure

#### Opțiunea A: Implementare Automată (Recomandată)

```bash
# Navighează la directorul infrastructure
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Scriptul de implementare va:  
1. Crea un grup de resurse unic  
2. Implementa resurse Microsoft Foundry  
3. Implementa modelul text-embedding-3-small  
4. Configura Application Insights  
5. Crea un service principal pentru autentificare  
6. Genera fișierul `.env` cu configurația  

#### Opțiunea B: Implementare Manuală

Dacă preferi controlul manual sau scriptul automatizat eșuează:

```bash
# Setează variabilele
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Creează grupul de resurse
az group create --name $RESOURCE_GROUP --location $LOCATION

# Desfășoară șablonul principal
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Verifică Implementarea Azure

```bash
# Verifică grupul de resurse
az group show --name $RESOURCE_GROUP --output table

# Listează resursele implementate
az resource list --resource-group $RESOURCE_GROUP --output table

# Testează serviciul AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Configurează Variabilele de Mediu

După implementare, ar trebui să ai un fișier `.env`. Verifică să conțină:

```bash
# Conținutul fișierului .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Configurarea bazei de date (pentru dezvoltare)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Configurarea Mediului Docker

### 1. Înțelege Compoziția Docker

Mediul nostru de dezvoltare utilizează Docker Compose:

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
  
### 2. Pornește Mediul de Dezvoltare

```bash
# Asigură-te că ești în directorul rădăcină al proiectului
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Pornește serviciile
docker-compose up -d

# Verifică starea serviciului
docker-compose ps

# Vizualizează jurnalele
docker-compose logs -f
```
  
### 3. Verifică Configurarea Bazei de Date

```bash
# Conectează-te la containerul PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Verifică structura bazei de date
\dt retail.*

# Verifică datele de probă
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Ieși din PostgreSQL
\q
```
  
### 4. Testează Serverul MCP

```bash
# Verificați sănătatea serverului MCP
curl http://localhost:8000/health

# Testați punctul final MCP de bază
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 Configurarea VS Code

### 1. Configurează Integrarea MCP

Creează configurația MCP pentru VS Code:

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
  
### 2. Configurează Mediul Python

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
  
### 3. Testează Integrarea VS Code

1. **Deschide proiectul în VS Code**:  
   ```bash
   code .
   ```
  
2. **Deschide Chat AI**:  
   - Apasă `Ctrl+Shift+P` (Windows/Linux) sau `Cmd+Shift+P` (macOS)  
   - Tastează „AI Chat” și selectează „AI Chat: Open Chat”  

3. **Testează Conexiunea Server MCP**:  
   - În AI Chat, tastează `#zava` și selectează unul dintre serverele configurate  
   - Întreabă: „Ce tabele sunt disponibile în baza de date?”  
   - Ar trebui să primești un răspuns cu lista tabelelor bazei de date retail  

## ✅ Validarea Mediului

### 1. Verificare Comprehensivă a Sistemului

Rulează acest script de validare pentru a verifica configurarea:

```bash
# Creează script de validare
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
    
    # Verifică versiunea Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Verifică pachetele necesare
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Verifică Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Verifică Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Verifică variabilele de mediu
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
    
    # Verifică conexiunea la baza de date
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testează interogarea
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
    
    # Verifică serverul MCP
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
    
    # Verifică serviciul Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Aceasta va eșua dacă acreditările sunt invalide
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

# Rulează validarea
python validate_setup.py
```
  
### 2. Listă Manuală de Validare

**✅ Unelte de bază**  
- [ ] Docker versiunea 20.10+ instalat și rulează  
- [ ] Azure CLI 2.40+ instalat și autentificat  
- [ ] Python 3.8+ cu pip instalat  
- [ ] Git 2.30+ instalat  
- [ ] VS Code cu extensiile necesare  

**✅ Resurse Azure**  
- [ ] Grup de resurse creat cu succes  
- [ ] Proiect AI Foundry implementat  
- [ ] Model OpenAI text-embedding-3-small implementat  
- [ ] Application Insights configurat  
- [ ] Service principal creat cu permisiunile corecte  

**✅ Configurare Mediu**  
- [ ] Fișier `.env` creat cu toate variabilele necesare  
- [ ] Credențiale Azure funcționale (testează cu `az account show`)  
- [ ] Container PostgreSQL rulează și este accesibil  
- [ ] Date de probă încărcate în baza de date  

**✅ Integrare VS Code**  
- [ ] `.vscode/mcp.json` configurat  
- [ ] Interpret Python setat la mediul virtual  
- [ ] Servere MCP apar în AI Chat  
- [ ] Capacitatea de a executa interogări de test prin AI Chat  

## 🛠️ Depanarea Problemelor Comune

### Probleme Docker

**Problema**: Containerele Docker nu pornesc  
```bash
# Verifică starea serviciului Docker
docker info

# Verifică resursele disponibile
docker system df

# Curăță dacă este necesar
docker system prune -f

# Repornește Docker Desktop (Windows/macOS)
# Sau repornește serviciul Docker (Linux)
sudo systemctl restart docker
```
  
**Problema**: Conexiunea PostgreSQL eșuează  
```bash
# Verificați jurnalele containerului
docker-compose logs postgres

# Verificați dacă containerul este sănătos
docker-compose ps

# Testați conexiunea directă
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Probleme Implementare Azure

**Problema**: Implementarea Azure eșuează  
```bash
# Verificați autentificarea Azure CLI
az account show

# Verificați permisiunile abonamentului
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Verificați înregistrarea furnizorului de resurse
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Problema**: Autentificarea serviciului AI eșuează  
```bash
# Testați principalul serviciului
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Verificați implementarea serviciului AI
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Probleme Mediu Python

**Problema**: Instalarea pachetelor eșuează  
```bash
# Actualizați pip și setuptools
python -m pip install --upgrade pip setuptools wheel

# Goliți cache-ul pip
pip cache purge

# Instalați pachetele unul câte unul pentru a identifica problemele
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Problema**: VS Code nu poate găsi interpretul Python  
```bash
# Afișează căile interpretorului Python
which python  # macOS/Linux
where python  # Windows

# Activează mai întâi mediul virtual
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Apoi deschide VS Code
code .
```
  
## 🎯 Concluzii Cheie

După finalizarea acestui laborator, ar trebui să ai:

✅ **Mediu complet de dezvoltare**: Toate uneltele instalate și configurate  
✅ **Resurse Azure implementate**: Servicii AI și infrastructura suport  
✅ **Mediu Docker funcțional**: Containere PostgreSQL și server MCP  
✅ **Integrare VS Code**: Servere MCP configurate și accesibile  
✅ **Configurare validată**: Toate componentele testate și lucrând împreună  
✅ **Cunoștințe de depanare**: Probleme comune și soluții  

## 🚀 Ce Urmează

Cu mediul pregătit, continuă cu **[Laboratorul 04: Designul Bazei de Date și Schema](../04-Database/README.md)** pentru a:

- Explora schema bazei de date retail în detaliu  
- Înțelege modelarea datelor multi-chiriaș  
- Învață despre implementarea Row Level Security  
- Lucra cu date de probă retail  

## 📚 Resurse Suplimentare

### Unelte de Dezvoltare
- [Documentația Docker](https://docs.docker.com/) - Referință completă Docker  
- [Referința Azure CLI](https://docs.microsoft.com/cli/azure/) - Comenzi Azure CLI  
- [Documentația VS Code](https://code.visualstudio.com/docs) - Configurare editor și extensii  

### Servicii Azure
- [Documentația Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Configurare serviciu AI  
- [Serviciul Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Implementare model AI  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Configurare monitorizare  

### Dezvoltare Python
- [Medii Virtuale Python](https://docs.python.org/3/tutorial/venv.html) - Managementul mediilor  
- [Documentația AsyncIO](https://docs.python.org/3/library/asyncio.html) - Modele programare asincronă  
- [Documentația FastAPI](https://fastapi.tiangolo.com/) - Modele framework web  

---

**Următorul pas**: Mediu gata? Continuă cu [Laboratorul 04: Designul Bazei de Date și Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->