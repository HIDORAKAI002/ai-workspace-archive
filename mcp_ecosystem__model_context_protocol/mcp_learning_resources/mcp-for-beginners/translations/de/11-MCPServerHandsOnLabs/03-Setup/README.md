# Environment Setup

## 🎯 Was dieses Labor abdeckt

Dieses praktische Labor führt Sie durch die Einrichtung einer vollständigen Entwicklungsumgebung zum Erstellen von MCP-Servern mit PostgreSQL-Integration. Sie konfigurieren alle notwendigen Tools, stellen Azure-Ressourcen bereit und validieren Ihre Einrichtung, bevor Sie mit der Implementierung fortfahren.

## Übersicht

Eine ordnungsgemäße Entwicklungsumgebung ist entscheidend für die erfolgreiche Entwicklung von MCP-Servern. Dieses Labor bietet schrittweise Anleitungen zur Einrichtung von Docker, Azure-Diensten, Entwicklungstools und zur Überprüfung, dass alles korrekt zusammen funktioniert.

Am Ende dieses Labors haben Sie eine voll funktionsfähige Entwicklungsumgebung, die bereit ist für den Bau des Zava Retail MCP-Servers.

## Lernziele

Am Ende dieses Labors werden Sie in der Lage sein:

- **Alle erforderlichen Entwicklungstools zu installieren und zu konfigurieren**
- **Azure-Ressourcen bereitzustellen**, die für den MCP-Server benötigt werden
- **Docker-Container einzurichten** für PostgreSQL und den MCP-Server
- **Ihre Umgebung mit Testverbindungen zu validieren**
- **Häufige Einrichtungsprobleme und Konfigurationsfehler zu beheben**
- **Den Entwicklungsworkflow und die Dateienstruktur zu verstehen**

## 📋 Voraussetzungen Check

Bevor Sie starten, stellen Sie sicher, dass Sie haben:

### Erforderliches Wissen
- Grundkenntnisse der Befehlszeile (Windows Command Prompt/PowerShell)
- Verständnis von Umgebungsvariablen
- Vertrautheit mit Git Versionskontrolle
- Grundkenntnisse zu Docker (Container, Images, Volumes)

### Systemanforderungen
- **Betriebssystem**: Windows 10/11, macOS oder Linux
- **RAM**: Mindestens 8GB (16GB empfohlen)
- **Speicher**: Mindestens 10GB freier Speicherplatz
- **Netzwerk**: Internetverbindung für Downloads und Azure-Bereitstellung

### Kontoanforderungen
- **Azure-Abonnement**: Kostenloses Kontingent reicht aus
- **GitHub-Konto**: Für Repository-Zugriff
- **Docker Hub Konto**: (Optional) Für das Veröffentlichen eigener Images

## 🛠️ Tool Installation

### 1. Docker Desktop installieren

Docker stellt die containerisierte Umgebung für unsere Entwicklung bereit.

#### Windows Installation

1. **Docker Desktop herunterladen**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Installieren und Konfigurieren**:
   - Führen Sie den Installer als Administrator aus
   - Aktivieren Sie die WSL 2-Integration, wenn Sie dazu aufgefordert werden
   - Starten Sie Ihren Computer neu, wenn die Installation abgeschlossen ist

3. **Installation überprüfen**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS Installation

1. **Herunterladen und Installieren**:
   ```bash
   # Herunterladen von https://desktop.docker.com/mac/stable/Docker.dmg
   # Oder verwenden Sie Homebrew
   brew install --cask docker
   ```

2. **Docker Desktop starten**:
   - Starten Sie Docker Desktop aus dem Ordner Anwendungen
   - Schließen Sie den Einrichtungsassistenten ab

3. **Installation überprüfen**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux Installation

1. **Docker Engine installieren**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Melden Sie sich ab und wieder an, damit die Gruppenänderungen wirksam werden
   ```

2. **Docker Compose installieren**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI installieren

Die Azure CLI ermöglicht die Bereitstellung und Verwaltung von Azure-Ressourcen.

#### Windows Installation

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS Installation

```bash
# Verwendung von Homebrew
brew install azure-cli

# Oder Verwendung des Installationsprogramms
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux Installation

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Überprüfen und authentifizieren

```bash
# Installation überprüfen
az version

# Bei Azure anmelden
az login

# Standardabonnement festlegen (wenn Sie mehrere haben)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git installieren

Git ist erforderlich, um das Repository zu klonen und Versionskontrolle zu nutzen.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git ist normalerweise vorinstalliert, aber Sie können es über Homebrew aktualisieren
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. VS Code installieren

Visual Studio Code stellt die integrierte Entwicklungsumgebung mit MCP-Unterstützung bereit.

#### Installation

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Erforderliche Erweiterungen

Installieren Sie diese VS Code-Erweiterungen:

```bash
# Installation über die Befehlszeile
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Oder installieren Sie sie über VS Code:
1. Öffnen Sie VS Code
2. Gehen Sie zu Erweiterungen (Strg+Shift+X)
3. Installieren Sie:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python installieren

Python 3.8+ wird für die MCP-Server-Entwicklung benötigt.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Homebrew verwenden
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Installation prüfen

```bash
python --version  # Sollte Python 3.11.x anzeigen
pip --version      # Sollte die pip-Version anzeigen
```

## 🚀 Projekteinrichtung

### 1. Repository klonen

```bash
# Klonen Sie das Hauptrepository
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navigieren Sie zum Projektverzeichnis
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Überprüfen Sie die Repository-Struktur
ls -la
```

### 2. Python virtual environment erstellen

```bash
# Virtuelle Umgebung erstellen
python -m venv mcp-env

# Virtuelle Umgebung aktivieren
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Pip aktualisieren
python -m pip install --upgrade pip
```

### 3. Python-Abhängigkeiten installieren

```bash
# Entwicklungsabhängigkeiten installieren
pip install -r requirements.lock.txt

# Wichtige Pakete überprüfen
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure Ressourcendeployment

### 1. Ressourcenanforderungen verstehen

Unser MCP-Server benötigt folgende Azure-Ressourcen:

| **Resource** | **Verwendungszweck** | **Geschätzte Kosten** |
|--------------|---------------------|----------------------|
| **Microsoft Foundry** | Hosting und Verwaltung von KI-Modellen | 10-50 $/Monat |
| **OpenAI Deployment** | Text-Embedding-Modell (text-embedding-3-small) | 5-20 $/Monat |
| **Application Insights** | Monitoring und Telemetrie | 5-15 $/Monat |
| **Resource Group** | Organisation von Ressourcen | Kostenlos |

### 2. Azure-Ressourcen bereitstellen

#### Option A: Automatisierte Bereitstellung (Empfohlen)

```bash
# Zum Infrastrukturverzeichnis navigieren
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Das Bereitstellungsskript wird:
1. Eine eindeutige Ressourcengruppe erstellen
2. Microsoft Foundry Ressourcen bereitstellen
3. Das text-embedding-3-small Modell bereitstellen
4. Application Insights konfigurieren
5. Einen Service Principal zur Authentifizierung anlegen
6. Eine `.env` Datei mit Konfiguration erzeugen

#### Option B: Manuelle Bereitstellung

Falls Sie die Kontrolle manuell wünschen oder das Skript fehlschlägt:

```bash
# Variablen festlegen
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Ressourcengruppe erstellen
az group create --name $RESOURCE_GROUP --location $LOCATION

# Hauptvorlage bereitstellen
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure-Bereitstellung überprüfen

```bash
# Überprüfen Sie die Ressourcengruppe
az group show --name $RESOURCE_GROUP --output table

# Liste der bereitgestellten Ressourcen
az resource list --resource-group $RESOURCE_GROUP --output table

# Testen Sie den KI-Dienst
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Umgebungsvariablen konfigurieren

Nach der Bereitstellung sollten Sie eine `.env`-Datei haben. Prüfen Sie, ob sie enthält:

```bash
# Inhalt der .env-Datei
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Datenbankkonfiguration (für die Entwicklung)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker-Umgebung Einrichten

### 1. Docker Composition verstehen

Unsere Entwicklungsumgebung verwendet Docker Compose:

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

### 2. Entwicklungsumgebung starten

```bash
# Stellen Sie sicher, dass Sie sich im Stammverzeichnis des Projekts befinden
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Starten Sie die Dienste
docker-compose up -d

# Überprüfen Sie den Dienststatus
docker-compose ps

# Protokolle anzeigen
docker-compose logs -f
```

### 3. Datenbankeinrichtung überprüfen

```bash
# Mit dem PostgreSQL-Container verbinden
docker-compose exec postgres psql -U postgres -d zava

# Datenbankstruktur prüfen
\dt retail.*

# Beispieldaten überprüfen
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL beenden
\q
```

### 4. MCP-Server testen

```bash
# Überprüfen Sie die Gesundheit des MCP-Servers
curl http://localhost:8000/health

# Testen Sie den grundlegenden MCP-Endpunkt
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code Konfiguration

### 1. MCP Integration konfigurieren

Erstellen Sie die VS Code MCP-Konfiguration:

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

### 2. Python-Umgebung konfigurieren

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

### 3. VS Code Integration testen

1. **Projekt in VS Code öffnen**:
   ```bash
   code .
   ```

2. **AI Chat öffnen**:
   - Drücken Sie `Ctrl+Shift+P` (Windows/Linux) oder `Cmd+Shift+P` (macOS)
   - Geben Sie "AI Chat" ein und wählen Sie "AI Chat: Open Chat"

3. **MCP-Server-Verbindung testen**:
   - Geben Sie im AI Chat `#zava` ein und wählen Sie einen der konfigurierten Server
   - Fragen Sie: "Welche Tabellen sind in der Datenbank verfügbar?"
   - Sie sollten eine Antwort mit den Tabellen der Einzelhandelsdatenbank erhalten

## ✅ Umgebungsvalidierung

### 1. Umfassende Systemprüfung

Führen Sie dieses Validierungsskript aus, um Ihre Einrichtung zu überprüfen:

```bash
# Validierungsskript erstellen
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
    
    # Python-Version prüfen
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Erforderliche Pakete prüfen
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Docker prüfen
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Azure CLI prüfen
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Umgebungsvariablen prüfen
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
    
    # Datenbankverbindung prüfen
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Abfrage testen
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
    
    # MCP-Server prüfen
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
    
    # Azure AI-Dienst prüfen
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Dies schlägt fehl, wenn Anmeldeinformationen ungültig sind
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

# Validierung ausführen
python validate_setup.py
```

### 2. Manuelle Validierung Checkliste

**✅ Basis-Tools**
- [ ] Docker Version 20.10+ installiert und läuft
- [ ] Azure CLI 2.40+ installiert und authentifiziert
- [ ] Python 3.8+ mit pip installiert
- [ ] Git 2.30+ installiert
- [ ] VS Code mit erforderlichen Erweiterungen

**✅ Azure Ressourcen**
- [ ] Ressourcengruppe erfolgreich erstellt
- [ ] AI Foundry Projekt bereitgestellt
- [ ] OpenAI text-embedding-3-small Modell bereitgestellt
- [ ] Application Insights konfiguriert
- [ ] Service Principal mit korrekten Berechtigungen erstellt

**✅ Umgebungs-Konfiguration**
- [ ] `.env` Datei mit allen benötigten Variablen erstellt
- [ ] Azure-Anmeldedaten funktionieren (Test mit `az account show`)
- [ ] PostgreSQL Container läuft und ist erreichbar
- [ ] Beispieldaten in der Datenbank geladen

**✅ VS Code Integration**
- [ ] `.vscode/mcp.json` konfiguriert
- [ ] Python Interpreter auf virtuelles Environment gesetzt
- [ ] MCP-Server erscheinen im AI Chat
- [ ] Test-Anfragen über AI Chat ausführbar

## 🛠️ Häufige Probleme beheben

### Docker-Probleme

**Problem**: Docker Container starten nicht
```bash
# Docker-Dienststatus überprüfen
docker info

# Verfügbare Ressourcen überprüfen
docker system df

# Bei Bedarf aufräumen
docker system prune -f

# Docker Desktop neu starten (Windows/macOS)
# Oder Docker-Dienst neu starten (Linux)
sudo systemctl restart docker
```

**Problem**: PostgreSQL Verbindung schlägt fehl
```bash
# Überprüfen Sie die Container-Protokolle
docker-compose logs postgres

# Überprüfen Sie, ob der Container gesund ist
docker-compose ps

# Testen Sie die direkte Verbindung
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure Bereitstellungsprobleme

**Problem**: Azure Bereitstellung schlägt fehl
```bash
# Überprüfen Sie die Azure CLI-Authentifizierung
az account show

# Abonnementberechtigungen überprüfen
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Überprüfen Sie die Registrierung des Ressourcenanbieters
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Problem**: KI Service-Authentifizierung schlägt fehl
```bash
# Testdiensteprinzipal
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Überprüfung der Bereitstellung des KI-Dienstes
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python-Umgebungsprobleme

**Problem**: Paketinstallation schlägt fehl
```bash
# Aktualisiere pip und setuptools
python -m pip install --upgrade pip setuptools wheel

# Lösche den pip-Cache
pip cache purge

# Installiere Pakete einzeln, um Probleme zu identifizieren
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Problem**: VS Code findet Python Interpreter nicht
```bash
# Python-Interpreter-Pfade anzeigen
which python  # macOS/Linux
where python  # Windows

# Zuerst virtuelle Umgebung aktivieren
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Dann VS Code öffnen
code .
```

## 🎯 Wichtigste Erkenntnisse

Nach Abschluss dieses Labors sollten Sie Folgendes haben:

✅ **Komplette Entwicklungsumgebung**: Alle Tools installiert und konfiguriert  
✅ **Azure Ressourcen bereitgestellt**: KI-Dienste und unterstützende Infrastruktur  
✅ **Docker Umgebung läuft**: PostgreSQL und MCP Server Container  
✅ **VS Code Integration**: MCP Server konfiguriert und zugänglich  
✅ **Validierte Einrichtung**: Alle Komponenten getestet und im Zusammenspiel funktionierend  
✅ **Kenntnis im Fehlerbeheben**: Häufige Probleme und Lösungen  

## 🚀 Was als Nächstes kommt

Mit Ihrer fertigen Umgebung fahren Sie fort mit **[Lab 04: Datenbank-Design und Schema](../04-Database/README.md)**, um:

- Das Schema der Einzelhandelsdatenbank im Detail zu erkunden
- Multi-Tenant Datenmodellierung zu verstehen
- Über Zeilenebene-Sicherheit (Row Level Security) zu lernen
- Mit Beispieldaten aus dem Einzelhandel zu arbeiten

## 📚 Zusätzliche Ressourcen

### Entwicklungstools
- [Docker Dokumentation](https://docs.docker.com/) – Umfassende Docker-Referenz
- [Azure CLI Referenz](https://docs.microsoft.com/cli/azure/) – Azure CLI Befehle
- [VS Code Dokumentation](https://code.visualstudio.com/docs) – Editor-Konfiguration und Erweiterungen

### Azure Dienste
- [Microsoft Foundry Dokumentation](https://docs.microsoft.com/azure/ai-foundry/) – KI-Dienst Konfiguration
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) – KI-Modellbereitstellung
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) – Monitoring-Einrichtung

### Python Entwicklung
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) – Verwaltung von Umgebungen
- [AsyncIO Dokumentation](https://docs.python.org/3/library/asyncio.html) – Async-Programmierungsmuster
- [FastAPI Dokumentation](https://fastapi.tiangolo.com/) – Webframework Muster

---

**Nächster Schritt**: Umgebung fertig? Fahren Sie fort mit [Lab 04: Datenbank-Design und Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Haftungsausschluss**:
Dieses Dokument wurde mit dem KI-Übersetzungsdienst [Co-op Translator](https://github.com/Azure/co-op-translator) übersetzt. Obwohl wir uns um Genauigkeit bemühen, beachten Sie bitte, dass automatisierte Übersetzungen Fehler oder Ungenauigkeiten enthalten können. Das Originaldokument in seiner Ursprungssprache gilt als maßgebliche Quelle. Bei kritischen Informationen wird eine professionelle menschliche Übersetzung empfohlen. Wir übernehmen keine Haftung für Missverständnisse oder Fehlinterpretationen, die aus der Verwendung dieser Übersetzung entstehen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->