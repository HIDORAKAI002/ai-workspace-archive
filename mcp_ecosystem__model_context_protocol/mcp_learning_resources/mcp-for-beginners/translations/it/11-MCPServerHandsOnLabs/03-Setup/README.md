# Impostazione dell'Ambiente

## 🎯 Cosa Copre Questo Laboratorio

Questo laboratorio pratico ti guida attraverso l'impostazione di un ambiente di sviluppo completo per la costruzione di server MCP con integrazione PostgreSQL. Configurerai tutti gli strumenti necessari, distribuirai le risorse Azure e verificherai la configurazione prima di procedere con l'implementazione.

## Panoramica

Un ambiente di sviluppo adeguato è fondamentale per il successo nello sviluppo di server MCP. Questo laboratorio fornisce istruzioni passo-passo per configurare Docker, i servizi Azure, gli strumenti di sviluppo e per verificare che tutto funzioni correttamente insieme.

Al termine di questo laboratorio, avrai un ambiente di sviluppo completamente funzionante pronto per costruire il server Zava Retail MCP.

## Obiettivi di Apprendimento

Al termine di questo laboratorio, sarai in grado di:

- **Installare e configurare** tutti gli strumenti di sviluppo richiesti
- **Distribuire risorse Azure** necessarie per il server MCP
- **Configurare contenitori Docker** per PostgreSQL e il server MCP
- **Verificare** la configurazione dell’ambiente con connessioni di test
- **Risoluzione dei problemi** comuni di configurazione e installazione
- **Comprendere** il flusso di lavoro di sviluppo e la struttura dei file

## 📋 Controllo dei Prerequisiti

Prima di iniziare, assicurati di avere:

### Conoscenze Richieste
- Uso base della riga di comando (Prompt comandi Windows/PowerShell)
- Comprensione delle variabili d'ambiente
- Familiarità con il controllo versione Git
- Concetti base di Docker (contenitori, immagini, volumi)

### Requisiti di Sistema
- **Sistema Operativo**: Windows 10/11, macOS o Linux
- **RAM**: Minimo 8GB (consigliati 16GB)
- **Spazio di Archiviazione**: Almeno 10GB liberi
- **Rete**: Connessione Internet per download e distribuzione Azure

### Requisiti Account
- **Sottoscrizione Azure**: Tier gratuito sufficiente
- **Account GitHub**: Per l’accesso al repository
- **Account Docker Hub**: (Opzionale) per pubblicazione immagini personalizzate

## 🛠️ Installazione Strumenti

### 1. Installare Docker Desktop

Docker fornisce l’ambiente containerizzato per la nostra configurazione di sviluppo.

#### Installazione su Windows

1. **Scarica Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Installa e Configura**:
   - Esegui l’installer come Amministratore
   - Abilita l’integrazione WSL 2 quando richiesto
   - Riavvia il computer al termine dell’installazione

3. **Verifica Installazione**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Installazione su macOS

1. **Scarica e Installa**:
   ```bash
   # Scarica da https://desktop.docker.com/mac/stable/Docker.dmg
   # Oppure usa Homebrew
   brew install --cask docker
   ```

2. **Avvia Docker Desktop**:
   - Avvia Docker Desktop dalle Applicazioni
   - Completa la procedura guidata di configurazione iniziale

3. **Verifica Installazione**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Installazione su Linux

1. **Installa Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Disconnettersi e riconnettersi affinché le modifiche al gruppo abbiano effetto
   ```

2. **Installa Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Installare Azure CLI

L’Azure CLI consente la distribuzione e gestione delle risorse Azure.

#### Installazione su Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Installazione su macOS

```bash
# Usare Homebrew
brew install azure-cli

# Oppure usare l'installer
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Installazione su Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Verifica e Autenticazione

```bash
# Verifica installazione
az version

# Accedi ad Azure
az login

# Imposta la sottoscrizione predefinita (se ne hai più di una)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Installare Git

Git è necessario per clonare il repository e gestire la versione.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git è solitamente preinstallato, ma puoi aggiornare tramite Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Installare VS Code

Visual Studio Code fornisce l’ambiente di sviluppo integrato con supporto MCP.

#### Installazione

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Estensioni Richieste

Installa queste estensioni di VS Code:

```bash
# Installa tramite riga di comando
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Oppure installa tramite VS Code:
1. Apri VS Code
2. Vai su Estensioni (Ctrl+Shift+X)
3. Installa:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Installare Python

Python 3.8+ è richiesto per lo sviluppo del server MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Usare Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Verifica Installazione

```bash
python --version  # Dovrebbe mostrare Python 3.11.x
pip --version      # Dovrebbe mostrare la versione di pip
```

## 🚀 Configurazione del Progetto

### 1. Clonare il Repository

```bash
# Clona il repository principale
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Naviga nella directory del progetto
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Verifica la struttura del repository
ls -la
```

### 2. Creare Ambiente Virtuale Python

```bash
# Crea ambiente virtuale
python -m venv mcp-env

# Attiva ambiente virtuale
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Aggiorna pip
python -m pip install --upgrade pip
```

### 3. Installare Dipendenze Python

```bash
# Installa le dipendenze di sviluppo
pip install -r requirements.lock.txt

# Verifica i pacchetti chiave
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Distribuzione Risorse Azure

### 1. Comprendere i Requisiti delle Risorse

Il nostro server MCP richiede queste risorse Azure:

| **Risorsa** | **Scopo** | **Costo Stimato** |
|-------------|-----------|-------------------|
| **Microsoft Foundry** | Hosting e gestione modelli AI | $10-50/mese |
| **Distribuzione OpenAI** | Modello di embedding testo (text-embedding-3-small) | $5-20/mese |
| **Application Insights** | Monitoraggio e telemetria | $5-15/mese |
| **Resource Group** | Organizzazione risorse | Gratuito |

### 2. Distribuire Risorse Azure

#### Opzione A: Distribuzione Automatica (Consigliata)

```bash
# Naviga nella directory infrastruttura
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Lo script di distribuzione:
1. Crea un resource group unico
2. Distribuisce risorse Microsoft Foundry
3. Distribuisce il modello text-embedding-3-small
4. Configura Application Insights
5. Crea un service principal per l’autenticazione
6. Genera il file `.env` con la configurazione

#### Opzione B: Distribuzione Manuale

Se preferisci il controllo manuale o lo script automatico fallisce:

```bash
# Imposta variabili
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Crea gruppo di risorse
az group create --name $RESOURCE_GROUP --location $LOCATION

# Distribuisci modello principale
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Verificare la Distribuzione Azure

```bash
# Controlla il gruppo di risorse
az group show --name $RESOURCE_GROUP --output table

# Elenca le risorse distribuite
az resource list --resource-group $RESOURCE_GROUP --output table

# Testa il servizio AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Configurare Variabili d’Ambiente

Dopo la distribuzione, dovresti avere un file `.env`. Verifica che contenga:

```bash
# Contenuto del file .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Configurazione del database (per lo sviluppo)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Configurazione Ambiente Docker

### 1. Comprendere la Composizione Docker

Il nostro ambiente di sviluppo utilizza Docker Compose:

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

### 2. Avviare Ambiente di Sviluppo

```bash
# Assicurati di essere nella directory principale del progetto
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Avvia i servizi
docker-compose up -d

# Controlla lo stato del servizio
docker-compose ps

# Visualizza i log
docker-compose logs -f
```

### 3. Verificare Configurazione Database

```bash
# Connetti al contenitore PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Controlla la struttura del database
\dt retail.*

# Verifica i dati di esempio
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Esci da PostgreSQL
\q
```

### 4. Testare Server MCP

```bash
# Verifica la salute del server MCP
curl http://localhost:8000/health

# Testare l'endpoint base MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Configurazione VS Code

### 1. Configurare Integrazione MCP

Crea configurazione MCP per VS Code:

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

### 2. Configurare Ambiente Python

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

### 3. Testare Integrazione VS Code

1. **Apri il progetto in VS Code**:
   ```bash
   code .
   ```

2. **Apri AI Chat**:
   - Premi `Ctrl+Shift+P` (Windows/Linux) o `Cmd+Shift+P` (macOS)
   - Digita "AI Chat" e seleziona "AI Chat: Open Chat"

3. **Testa Connessione Server MCP**:
   - In AI Chat, digita `#zava` e seleziona uno dei server configurati
   - Chiedi: "Quali tabelle sono disponibili nel database?"
   - Dovresti ricevere una risposta con l’elenco delle tabelle retail del database

## ✅ Validazione dell’Ambiente

### 1. Controllo Completo del Sistema

Esegui questo script di validazione per verificare la configurazione:

```bash
# Crea script di validazione
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
    
    # Controlla la versione di Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Controlla i pacchetti richiesti
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Controlla Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Controlla Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Controlla le variabili d'ambiente
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
    
    # Controlla la connessione al database
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Test della query
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
    
    # Controlla il server MCP
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
    
    # Controlla il servizio Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Fallirà se le credenziali non sono valide
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

# Esegui la validazione
python validate_setup.py
```

### 2. Checklist di Validazione Manuale

**✅ Strumenti Base**
- [ ] Docker versione 20.10+ installato e attivo
- [ ] Azure CLI 2.40+ installata e autenticata
- [ ] Python 3.8+ con pip installato
- [ ] Git 2.30+ installato
- [ ] VS Code con estensioni richieste

**✅ Risorse Azure**
- [ ] Resource group creato con successo
- [ ] Progetto AI Foundry distribuito
- [ ] Modello OpenAI text-embedding-3-small distribuito
- [ ] Application Insights configurato
- [ ] Service principal creato con permessi corretti

**✅ Configurazione Ambiente**
- [ ] File `.env` creato con tutte le variabili necessarie
- [ ] Credenziali Azure funzionanti (test con `az account show`)
- [ ] Contenitore PostgreSQL attivo e accessibile
- [ ] Dati di esempio caricati nel database

**✅ Integrazione VS Code**
- [ ] `.vscode/mcp.json` configurato
- [ ] Interprete Python impostato sull’ambiente virtuale
- [ ] Server MCP appaiono in AI Chat
- [ ] Possibilità di eseguire query di test tramite AI Chat

## 🛠️ Risoluzione Problemi Comuni

### Problemi Docker

**Problema**: I contenitori Docker non si avviano
```bash
# Controlla lo stato del servizio Docker
docker info

# Controlla le risorse disponibili
docker system df

# Esegui la pulizia se necessario
docker system prune -f

# Riavvia Docker Desktop (Windows/macOS)
# Oppure riavvia il servizio Docker (Linux)
sudo systemctl restart docker
```

**Problema**: Connessione a PostgreSQL fallita
```bash
# Controlla i log del contenitore
docker-compose logs postgres

# Verifica che il contenitore sia sano
docker-compose ps

# Testa la connessione diretta
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Problemi Distribuzione Azure

**Problema**: Distribuzione Azure fallisce
```bash
# Verifica l'autenticazione di Azure CLI
az account show

# Verifica i permessi dell'abbonamento
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Controlla la registrazione del provider di risorse
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Problema**: Autenticazione servizio AI fallita
```bash
# Testa il principale del servizio
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Verifica il deployment del servizio AI
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Problemi Ambiente Python

**Problema**: Installazione pacchetti fallita
```bash
# Aggiorna pip e setuptools
python -m pip install --upgrade pip setuptools wheel

# Pulisci la cache di pip
pip cache purge

# Installa i pacchetti uno per uno per identificare i problemi
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Problema**: VS Code non trova interprete Python
```bash
# Mostra i percorsi dell'interprete Python
which python  # macOS/Linux
where python  # Windows

# Attiva prima l'ambiente virtuale
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Quindi apri VS Code
code .
```

## 🎯 Punti Chiave

Dopo aver completato questo laboratorio dovresti avere:

✅ **Ambiente di Sviluppo Completo**: tutti gli strumenti installati e configurati  
✅ **Risorse Azure Distribuite**: servizi AI e infrastruttura di supporto  
✅ **Ambiente Docker Attivo**: contenitori PostgreSQL e server MCP  
✅ **Integrazione VS Code**: server MCP configurati e accessibili  
✅ **Configurazione Verificata**: tutti componenti testati e funzionanti insieme  
✅ **Conoscenze di Risoluzione Problemi**: problemi comuni e soluzioni  

## 🚀 Cosa Fare Dopo

Con l’ambiente pronto, prosegui con **[Lab 04: Progettazione Database e Schema](../04-Database/README.md)** per:

- Esplorare in dettaglio lo schema del database retail
- Comprendere la modellazione dati multi-tenant
- Imparare l’implementazione della sicurezza a livello di riga
- Lavorare con dati retail di esempio

## 📚 Risorse Aggiuntive

### Strumenti di Sviluppo
- [Documentazione Docker](https://docs.docker.com/) - Riferimento completo Docker
- [Riferimento Azure CLI](https://docs.microsoft.com/cli/azure/) - Comandi Azure CLI
- [Documentazione VS Code](https://code.visualstudio.com/docs) - Configurazioni ed estensioni editor

### Servizi Azure
- [Documentazione Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Configurazione servizi AI
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - Distribuzione modelli AI
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Configurazione monitoraggio

### Sviluppo Python
- [Ambienti Virtuali Python](https://docs.python.org/3/tutorial/venv.html) - Gestione ambienti
- [Documentazione AsyncIO](https://docs.python.org/3/library/asyncio.html) - Pattern di programmazione asincrona
- [Documentazione FastAPI](https://fastapi.tiangolo.com/) - Pattern framework web

---

**Successivo**: Ambiente pronto? Prosegui con [Lab 04: Progettazione Database e Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->