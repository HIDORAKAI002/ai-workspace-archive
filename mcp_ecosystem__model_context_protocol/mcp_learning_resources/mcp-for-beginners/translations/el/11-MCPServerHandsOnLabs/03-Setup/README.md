# Ρύθμιση Περιβάλλοντος

## 🎯 Τι Καλύπτει Αυτό το Εργαστήριο

Αυτό το πρακτικό εργαστήριο σας καθοδηγεί στη ρύθμιση ενός πλήρους περιβάλλοντος ανάπτυξης για την κατασκευή διακομιστών MCP με ενσωμάτωση PostgreSQL. Θα ρυθμίσετε όλα τα απαραίτητα εργαλεία, θα αναπτύξετε πόρους Azure και θα επικυρώσετε τη ρύθμισή σας πριν προχωρήσετε στην υλοποίηση.

## Επισκόπηση

Ένα κατάλληλο περιβάλλον ανάπτυξης είναι κρίσιμο για την επιτυχή ανάπτυξη διακομιστών MCP. Αυτό το εργαστήριο παρέχει βήμα προς βήμα οδηγίες για τη ρύθμιση Docker, υπηρεσιών Azure, εργαλείων ανάπτυξης και την επαλήθευση ότι όλα λειτουργούν σωστά μαζί.

Στο τέλος αυτού του εργαστηρίου, θα έχετε ένα πλήρως λειτουργικό περιβάλλον ανάπτυξης έτοιμο για την κατασκευή του διακομιστή Zava Retail MCP.

## Μαθησιακοί Στόχοι

Στο τέλος αυτού του εργαστηρίου, θα μπορείτε να:

- **Εγκαταστήσετε και ρυθμίσετε** όλα τα απαιτούμενα εργαλεία ανάπτυξης
- **Αναπτύξετε πόρους Azure** που απαιτούνται για τον διακομιστή MCP
- **Ρυθμίσετε κοντέινερ Docker** για PostgreSQL και τον διακομιστή MCP
- **Επικυρώσετε** τη ρύθμιση του περιβάλλοντός σας με δοκιμαστικές συνδέσεις
- **Αντιμετωπίσετε προβλήματα** κοινών ζητημάτων ρύθμισης και διαμόρφωσης
- **Κατανοήσετε** τη ροή εργασιών ανάπτυξης και τη δομή αρχείων

## 📋 Έλεγχος Προαπαιτούμενων

Πριν ξεκινήσετε, βεβαιωθείτε ότι διαθέτετε:

### Απαραίτητες Γνώσεις
- Βασική χρήση γραμμής εντολών (Windows Command Prompt/PowerShell)
- Κατανόηση μεταβλητών περιβάλλοντος
- Εξοικείωση με τον έλεγχο έκδοσης Git
- Βασικές έννοιες Docker (κοντέινερ, εικόνες, τόμοι)

### Απαιτήσεις Συστήματος
- **Λειτουργικό Σύστημα**: Windows 10/11, macOS, ή Linux
- **RAM**: Ελάχιστο 8GB (προτείνεται 16GB)
- **Χώρος Αποθήκευσης**: Τουλάχιστον 10GB ελεύθερος χώρος
- **Δίκτυο**: Σύνδεση στο Διαδίκτυο για λήψεις και ανάπτυξη Azure

### Απαιτήσεις Λογαριασμού
- **Συνδρομή Azure**: Η δωρεάν έκδοση είναι επαρκής
- **Λογαριασμός GitHub**: Για πρόσβαση στο αποθετήριο
- **Λογαριασμός Docker Hub**: (Προαιρετικό) Για δημοσίευση προσαρμοσμένων εικόνων

## 🛠️ Εγκατάσταση Εργαλείων

### 1. Εγκατάσταση Docker Desktop

Το Docker παρέχει το περιβάλλον με κοντέινερ για τη ρύθμιση ανάπτυξης.

#### Εγκατάσταση στα Windows

1. **Κατεβάστε Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Εγκαταστήστε και Ρυθμίστε**:
   - Εκτελέστε τον εγκαταστάτη ως Διαχειριστής
   - Ενεργοποιήστε την ενσωμάτωση WSL 2 όταν ζητηθεί
   - Επανεκκινήστε τον υπολογιστή μόλις ολοκληρωθεί η εγκατάσταση

3. **Επαληθεύστε την Εγκατάσταση**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Εγκατάσταση σε macOS

1. **Κατεβάστε και Εγκαταστήστε**:
   ```bash
   # Κατεβάστε από https://desktop.docker.com/mac/stable/Docker.dmg
   # Ή χρησιμοποιήστε το Homebrew
   brew install --cask docker
   ```

2. **Εκκινήστε το Docker Desktop**:
   - Εκκινήστε το Docker Desktop από τις Εφαρμογές
   - Ολοκληρώστε τον αρχικό οδηγό ρύθμισης

3. **Επαληθεύστε την Εγκατάσταση**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Εγκατάσταση σε Linux

1. **Εγκατάσταση Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Αποσυνδεθείτε και συνδεθείτε ξανά για να εφαρμοστούν οι αλλαγές ομάδας
   ```

2. **Εγκατάσταση Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Εγκατάσταση Azure CLI

Το Azure CLI επιτρέπει την ανάπτυξη και διαχείριση πόρων Azure.

#### Εγκατάσταση στα Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Εγκατάσταση σε macOS

```bash
# Χρήση Homebrew
brew install azure-cli

# Ή χρήση του εγκαταστάτη
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Εγκατάσταση σε Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Επαλήθευση και Πιστοποίηση

```bash
# Έλεγχος εγκατάστασης
az version

# Σύνδεση στο Azure
az login

# Ορισμός προεπιλεγμένης συνδρομής (αν έχετε πολλές)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Εγκατάσταση Git

Το Git απαιτείται για την κλωνοποίηση του αποθετηρίου και τον έλεγχο έκδοσης.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Το Git είναι συνήθως προεγκατεστημένο, αλλά μπορείτε να το ενημερώσετε μέσω του Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Εγκατάσταση VS Code

Το Visual Studio Code παρέχει ολοκληρωμένο περιβάλλον ανάπτυξης με υποστήριξη MCP.

#### Εγκατάσταση

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Απαιτούμενες Επεκτάσεις

Εγκαταστήστε αυτές τις επεκτάσεις για VS Code:

```bash
# Εγκατάσταση μέσω γραμμής εντολών
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Ή εγκαταστήστε μέσω VS Code:
1. Ανοίξτε το VS Code
2. Πηγαίνετε στις Επεκτάσεις (Ctrl+Shift+X)
3. Εγκαταστήστε:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Εγκατάσταση Python

Η Python 3.8+ απαιτείται για την ανάπτυξη διακομιστή MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Χρήση του Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Επαλήθευση Εγκατάστασης

```bash
python --version  # Θα πρέπει να δείχνει Python 3.11.x
pip --version      # Θα πρέπει να δείχνει την έκδοση του pip
```

## 🚀 Ρύθμιση Έργου

### 1. Κλωνοποίηση Αποθετηρίου

```bash
# Αντιγράψτε το κύριο αποθετήριο
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Πλοηγηθείτε στον φάκελο του έργου
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Επαληθεύστε τη δομή του αποθετηρίου
ls -la
```

### 2. Δημιουργία Εικονικού Περιβάλλοντος Python

```bash
# Δημιουργήστε εικονικό περιβάλλον
python -m venv mcp-env

# Ενεργοποιήστε το εικονικό περιβάλλον
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Αναβαθμίστε το pip
python -m pip install --upgrade pip
```

### 3. Εγκατάσταση Εξαρτήσεων Python

```bash
# Εγκατάσταση εξαρτήσεων ανάπτυξης
pip install -r requirements.lock.txt

# Επαλήθευση βασικών πακέτων
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Ανάπτυξη Πόρων Azure

### 1. Κατανόηση Απαιτήσεων Πόρων

Ο διακομιστής MCP μας απαιτεί αυτούς τους πόρους Azure:

| **Πόρος** | **Σκοπός** | **Εκτιμώμενο Κόστος** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Φιλοξενία και διαχείριση μοντέλων AI | $10-50/μήνα |
| **OpenAI Deployment** | Μοντέλο ενσωμάτωσης κειμένου (text-embedding-3-small) | $5-20/μήνα |
| **Application Insights** | Παρακολούθηση και τηλεμετρία | $5-15/μήνα |
| **Ομάδα Πόρων** | Οργάνωση πόρων | Δωρεάν |

### 2. Ανάπτυξη Πόρων Azure

#### Επιλογή Α: Αυτοματοποιημένη Ανάπτυξη (Συνιστάται)

```bash
# Μεταβείτε στον φάκελο υποδομής
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Το σενάριο ανάπτυξης θα:
1. Δημιουργήσει μια μοναδική ομάδα πόρων
2. Αναπτύξει πόρους Microsoft Foundry
3. Αναπτύξει το μοντέλο text-embedding-3-small
4. Ρυθμίσει το Application Insights
5. Δημιουργήσει υπηρεσιακό λογαριασμό για πιστοποίηση
6. Δημιουργήσει αρχείο `.env` με τη διαμόρφωση

#### Επιλογή Β: Χειροκίνητη Ανάπτυξη

Εάν προτιμάτε χειροκίνητο έλεγχο ή αποτύχει το αυτοματοποιημένο σενάριο:

```bash
# Ορίστε μεταβλητές
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Δημιουργήστε ομάδα πόρων
az group create --name $RESOURCE_GROUP --location $LOCATION

# Αναπτύξτε το κύριο πρότυπο
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Επαλήθευση Ανάπτυξης Azure

```bash
# Έλεγχος ομάδας πόρων
az group show --name $RESOURCE_GROUP --output table

# Λίστα των αναπτυγμένων πόρων
az resource list --resource-group $RESOURCE_GROUP --output table

# Δοκιμή υπηρεσίας AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Ρύθμιση Μεταβλητών Περιβάλλοντος

Μετά την ανάπτυξη, θα πρέπει να έχετε ένα αρχείο `.env`. Επαληθεύστε ότι περιέχει:

```bash
# Περιεχόμενα αρχείου .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Ρυθμίσεις βάσης δεδομένων (για ανάπτυξη)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Ρύθμιση Περιβάλλοντος Docker

### 1. Κατανόηση Σύνθεσης Docker

Το περιβάλλον ανάπτυξής μας χρησιμοποιεί Docker Compose:

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

### 2. Εκκίνηση Περιβάλλοντος Ανάπτυξης

```bash
# Βεβαιωθείτε ότι βρίσκεστε στον ριζικό κατάλογο του έργου
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Ξεκινήστε τις υπηρεσίες
docker-compose up -d

# Ελέγξτε την κατάσταση της υπηρεσίας
docker-compose ps

# Δείτε τα αρχεία καταγραφής
docker-compose logs -f
```

### 3. Επαλήθευση Ρύθμισης Βάσης Δεδομένων

```bash
# Συνδεθείτε με το δοχείο PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Ελέγξτε τη δομή της βάσης δεδομένων
\dt retail.*

# Επαληθεύστε τα δείγματα δεδομένων
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Έξοδος από το PostgreSQL
\q
```

### 4. Δοκιμή Διακομιστή MCP

```bash
# Έλεγχος υγείας διακομιστή MCP
curl http://localhost:8000/health

# Δοκιμή βασικού endpoint MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Ρύθμιση VS Code

### 1. Ρύθμιση Ενσωμάτωσης MCP

Δημιουργήστε τη ρύθμιση MCP για το VS Code:

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

### 2. Ρύθμιση Περιβάλλοντος Python

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

### 3. Δοκιμή Ενσωμάτωσης VS Code

1. **Ανοίξτε το έργο στο VS Code**:
   ```bash
   code .
   ```

2. **Ανοίξτε το AI Chat**:
   - Πατήστε `Ctrl+Shift+P` (Windows/Linux) ή `Cmd+Shift+P` (macOS)
   - Πληκτρολογήστε "AI Chat" και επιλέξτε "AI Chat: Άνοιγμα Chat"

3. **Δοκιμάστε τη Σύνδεση Διακομιστή MCP**:
   - Στο AI Chat, πληκτρολογήστε `#zava` και επιλέξτε έναν από τους ρυθμισμένους διακομιστές
   - Ρωτήστε: "Ποιους πίνακες έχει η βάση δεδομένων;"
   - Πρέπει να λάβετε απάντηση με λίστα πινάκων της λιανικής βάσης δεδομένων

## ✅ Επικύρωση Περιβάλλοντος

### 1. Ολοκληρωμένος Έλεγχος Συστήματος

Τρέξτε αυτό το σενάριο επικύρωσης για να επαληθεύσετε τη ρύθμισή σας:

```bash
# Δημιουργία σεναρίου επικύρωσης
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
    
    # Έλεγχος έκδοσης Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Έλεγχος απαιτούμενων πακέτων
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Έλεγχος Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Έλεγχος Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Έλεγχος περιβαλλοντικών μεταβλητών
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
    
    # Έλεγχος σύνδεσης βάσης δεδομένων
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Δοκιμή ερωτήματος
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
    
    # Έλεγχος διακομιστή MCP
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
    
    # Έλεγχος υπηρεσίας Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Θα αποτύχει αν τα διαπιστευτήρια είναι μη έγκυρα
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

# Εκτέλεση επικύρωσης
python validate_setup.py
```

### 2. Λίστα Χειροκίνητης Επικύρωσης

**✅ Βασικά Εργαλεία**
- [ ] Εγκατεστημένη και σε λειτουργία έκδοση Docker 20.10+
- [ ] Εγκατεστημένο και πιστοποιημένο Azure CLI 2.40+
- [ ] Εγκατεστημένη Python 3.8+ με pip
- [ ] Εγκατεστημένο Git 2.30+
- [ ] VS Code με απαιτούμενες επεκτάσεις

**✅ Πόροι Azure**
- [ ] Δημιουργήθηκε επιτυχώς ομάδα πόρων
- [ ] Αναπτύχθηκε έργο AI Foundry
- [ ] Αναπτύχθηκε μοντέλο OpenAI text-embedding-3-small
- [ ] Ρυθμίστηκε το Application Insights
- [ ] Δημιουργήθηκε υπηρεσιακός λογαριασμός με τα κατάλληλα δικαιώματα

**✅ Ρύθμιση Περιβάλλοντος**
- [ ] Δημιουργήθηκε αρχείο `.env` με όλες τις απαραίτητες μεταβλητές
- [ ] Τα διαπιστευτήρια Azure λειτουργούν (δοκιμάστε με `az account show`)
- [ ] Το κοντέινερ PostgreSQL εκτελείται και είναι προσβάσιμο
- [ ] Φορτώθηκαν δείγματα δεδομένων στη βάση

**✅ Ενσωμάτωση VS Code**
- [ ] Ρυθμίστηκε το `.vscode/mcp.json`
- [ ] Ο διερμηνέας Python ορίστηκε στο εικονικό περιβάλλον
- [ ] Οι διακομιστές MCP εμφανίζονται στο AI Chat
- [ ] Μπορείτε να εκτελέσετε δοκιμαστικά ερωτήματα μέσω του AI Chat

## 🛠️ Αντιμετώπιση Συνήθων Προβλημάτων

### Προβλήματα Docker

**Πρόβλημα**: Τα κοντέινερ Docker δεν ξεκινούν
```bash
# Ελέγξτε την κατάσταση της υπηρεσίας Docker
docker info

# Ελέγξτε τους διαθέσιμους πόρους
docker system df

# Καθαρίστε αν είναι απαραίτητο
docker system prune -f

# Επανεκκινήστε το Docker Desktop (Windows/macOS)
# Ή επανεκκινήστε την υπηρεσία Docker (Linux)
sudo systemctl restart docker
```

**Πρόβλημα**: Απέτυχε η σύνδεση με PostgreSQL
```bash
# Ελέγξτε τα αρχεία καταγραφής του κοντέινερ
docker-compose logs postgres

# Επαληθεύστε ότι το κοντέινερ είναι υγιές
docker-compose ps

# Δοκιμάστε άμεση σύνδεση
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Προβλήματα Ανάπτυξης Azure

**Πρόβλημα**: Η ανάπτυξη Azure αποτυγχάνει
```bash
# Ελέγξτε την πιστοποίηση Azure CLI
az account show

# Επαληθεύστε τα δικαιώματα συνδρομής
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Ελέγξτε την εγγραφή του παρόχου πόρων
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Πρόβλημα**: Απέτυχε η πιστοποίηση υπηρεσίας AI
```bash
# Δοκιμή κύριου υπηρεσίας
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Επαλήθευση ανάπτυξης υπηρεσίας AI
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Προβλήματα Περιβάλλοντος Python

**Πρόβλημα**: Απέτυχε η εγκατάσταση πακέτων
```bash
# Αναβάθμιση pip και setuptools
python -m pip install --upgrade pip setuptools wheel

# Εκκαθάριση της προσωρινής μνήμης του pip
pip cache purge

# Εγκατάσταση πακέτων ένα προς ένα για την ανίχνευση προβλημάτων
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Πρόβλημα**: Το VS Code δεν βρίσκει διερμηνέα Python
```bash
# Εμφάνιση διαδρομών διερμηνέα Python
which python  # macOS/Linux
where python  # Windows

# Ενεργοποιήστε πρώτα το εικονικό περιβάλλον
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Στη συνέχεια ανοίξτε το VS Code
code .
```

## 🎯 Κύρια Σημεία

Μετά την ολοκλήρωση αυτού του εργαστηρίου, θα έχετε:

✅ **Πλήρες Περιβάλλον Ανάπτυξης**: Όλα τα εργαλεία εγκατεστημένα και ρυθμισμένα  
✅ **Αναπτυγμένους Πόρους Azure**: Υπηρεσίες AI και υποστηρικτική υποδομή  
✅ **Λειτουργικό Περιβάλλον Docker**: Κοντέινερ PostgreSQL και διακομιστή MCP  
✅ **Ενσωμάτωση VS Code**: Οι διακομιστές MCP ρυθμισμένοι και προσβάσιμοι  
✅ **Επικυρωμένη Ρύθμιση**: Όλα τα στοιχεία δοκιμασμένα και λειτουργικά μαζί  
✅ **Γνώσεις Αντιμετώπισης Προβλημάτων**: Συνήθη ζητήματα και λύσεις  

## 🚀 Τι Ακολουθεί

Με το περιβάλλον σας έτοιμο, συνεχίστε στο **[Εργαστήριο 04: Σχεδίαση Βάσης Δεδομένων και Σχήμα](../04-Database/README.md)** για να:

- Εξερευνήσετε αναλυτικά το σχήμα της λιανικής βάσης δεδομένων
- Κατανοήσετε τη μοντελοποίηση δεδομένων πολλαπλών ενοικιαστών
- Μάθετε για την υλοποίηση ασφάλειας σε επίπεδο γραμμής (Row Level Security)
- Εργαστείτε με δείγματα λιανικών δεδομένων

## 📚 Επιπλέον Πόροι

### Εργαλεία Ανάπτυξης
- [Τεκμηρίωση Docker](https://docs.docker.com/) - Πλήρης αναφορά Docker
- [Αναφορά Azure CLI](https://docs.microsoft.com/cli/azure/) - Εντολές Azure CLI
- [Τεκμηρίωση VS Code](https://code.visualstudio.com/docs) - Ρύθμιση επεξεργαστή και επεκτάσεις

### Υπηρεσίες Azure
- [Τεκμηρίωση Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Ρύθμιση υπηρεσίας AI
- [Υπηρεσία Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Ανάπτυξη μοντέλου AI
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Ρύθμιση παρακολούθησης

### Ανάπτυξη Python
- [Εικονικά Περιβάλλοντα Python](https://docs.python.org/3/tutorial/venv.html) - Διαχείριση περιβάλλοντος
- [Τεκμηρίωση AsyncIO](https://docs.python.org/3/library/asyncio.html) - Πρότυπα ασύγχρονης προγραμματισμού
- [Τεκμηρίωση FastAPI](https://fastapi.tiangolo.com/) - Πρότυπα πλαισίου web

---

**Επόμενο**: Περιβάλλον έτοιμο; Συνεχίστε με το [Εργαστήριο 04: Σχεδίαση Βάσης Δεδομένων και Σχήμα](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->