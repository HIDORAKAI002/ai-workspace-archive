# Környezet beállítása

## 🎯 Mit tartalmaz ez a labor

Ez a gyakorlati laborvezető végigvezeti a teljes fejlesztési környezet beállításán MCP szerverekhez PostgreSQL integrációval. Beállítod az összes szükséges eszközt, telepíted az Azure erőforrásokat, és ellenőrzöd a beállítást, mielőtt folytatnád a megvalósítást.

## Áttekintés

A megfelelő fejlesztési környezet kritikus a sikeres MCP szerver fejlesztéshez. Ez a labor lépésről lépésre mutatja be a Docker, Azure szolgáltatások, fejlesztői eszközök beállítását és annak ellenőrzését, hogy minden helyesen működik együtt.

A labor végére teljesen működő fejlesztési környezettel leszel felvértezve, készen a Zava Retail MCP szerver fejlesztésére.

## Tanulási célok

A labor végére képes leszel:

- **Telepíteni és konfigurálni** az összes szükséges fejlesztői eszközt
- **Telepíteni Azure erőforrásokat**, amelyek az MCP szerverhez kellenek
- **Beállítani Docker konténereket** PostgreSQL-hez és az MCP szerverhez
- **Ellenőrizni** a környezet beállítását tesztkapcsolatokkal
- **Hibakeresni** gyakori telepítési és konfigurációs problémákat
- **Érteni** a fejlesztési munkafolyamatot és a fájlstruktúrát

## 📋 Előfeltételek ellenőrzése

A kezdés előtt győződj meg róla, hogy rendelkezel:

### Szükséges ismeretek
- Alap parancssori használat (Windows Command Prompt/PowerShell)
- Környezeti változók ismerete
- Git verziókezelő ismerete
- Alap Docker fogalmak (konténerek, képek, kötetek)

### Rendszerkövetelmények
- **Operációs rendszer**: Windows 10/11, macOS vagy Linux
- **RAM**: Minimum 8GB (ajánlott 16GB)
- **Tárhely**: Legalább 10GB szabad hely
- **Hálózat**: Internetkapcsolat letöltésekhez és Azure telepítéshez

### Fiók követelmények
- **Azure előfizetés**: Ingyenes szint elegendő
- **GitHub fiók**: Repository eléréséhez
- **Docker Hub fiók**: (Opcionális) Egyedi képek publikálásához

## 🛠️ Eszköz telepítés

### 1. Docker Desktop telepítése

A Docker biztosítja a konténerizált környezetet a fejlesztéshez.

#### Windows telepítés

1. **Töltsd le a Docker Desktopot**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Telepítsd és konfiguráld**:
   - Futtasd az telepítőt rendszergazdaként
   - Engedélyezd a WSL 2 integrációt, amikor kéri
   - Indítsd újra a számítógéped a telepítés befejezése után

3. **Ellenőrizd a telepítést**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS telepítés

1. **Töltsd le és telepítsd**:
   ```bash
   # Töltse le a https://desktop.docker.com/mac/stable/Docker.dmg oldalról
   # Vagy használja a Homebrew-t
   brew install --cask docker
   ```

2. **Indítsd el a Docker Desktopot**:
   - Indítsd el az Alkalmazások közül a Docker Desktopot
   - Fejezd be a kezdő beállító varázslót

3. **Ellenőrizd a telepítést**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux telepítés

1. **Telepítsd a Docker motort**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Jelentkezzen ki és be, hogy a csoportváltozások érvénybe lépjenek
   ```

2. **Telepítsd a Docker Compose-t**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI telepítése

Az Azure CLI lehetővé teszi az Azure erőforrások telepítését és kezelését.

#### Windows telepítés

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS telepítés

```bash
# Homebrew használata
brew install azure-cli

# Vagy telepítő használata
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux telepítés

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Ellenőrzés és hitelesítés

```bash
# Telepítés ellenőrzése
az version

# Bejelentkezés az Azure-ba
az login

# Alapértelmezett előfizetés beállítása (ha több is van)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git telepítése

A Git szükséges a repository klónozásához és verziókezeléshez.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# A Git általában előre telepítve van, de frissítheted Homebrew-n keresztül
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. VS Code telepítése

A Visual Studio Code az integrált fejlesztői környezet MCP támogatással.

#### Telepítés

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Szükséges bővítmények

Telepítsd ezeket a VS Code bővítményeket:

```bash
# Telepítés parancssoron keresztül
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Vagy telepítsd a VS Code-on keresztül:
1. Nyisd meg a VS Code-ot
2. Menj a Bővítményekhez (Ctrl+Shift+X)
3. Telepítsd a következőket:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python telepítése

A Python 3.8+ szükséges az MCP szerver fejlesztéséhez.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# A Homebrew használata
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Ellenőrizd a telepítést

```bash
python --version  # Python 3.11.x-et kell mutatnia
pip --version      # A pip verzióját kell mutatnia
```

## 🚀 Projekt beállítása

### 1. Klónozd a repositoryt

```bash
# Klónozza a fő tárházat
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navigáljon a projekt könyvtárba
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Ellenőrizze a tárház szerkezetét
ls -la
```

### 2. Hozz létre Python virtuális környezetet

```bash
# Virtuális környezet létrehozása
python -m venv mcp-env

# Virtuális környezet aktiválása
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Pip frissítése
python -m pip install --upgrade pip
```

### 3. Telepítsd a Python függőségeket

```bash
# Fejlesztési függőségek telepítése
pip install -r requirements.lock.txt

# Kulcs csomagok ellenőrzése
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure erőforrások telepítése

### 1. Ismerd meg az erőforrás igényeket

Az MCP szerverünk a következő Azure erőforrásokat igényli:

| **Erőforrás** | **Feladat** | **Becsült költség** |
|---------------|-------------|---------------------|
| **Microsoft Foundry** | AI modell hosztolás és kezelése | 10-50 USD/hó |
| **OpenAI Deployment** | Szöveg beágyazás modell (text-embedding-3-small) | 5-20 USD/hó |
| **Application Insights** | Monitoring és telemetria | 5-15 USD/hó |
| **Erőforráscsoport** | Erőforrások szervezése | Ingyenes |

### 2. Azure erőforrások telepítése

#### A lehetőség: Automatikus telepítés (ajánlott)

```bash
# Navigálás az infrastruktúra könyvtárhoz
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

A telepítő script elvégzi:
1. Egyedi erőforráscsoport létrehozása
2. Microsoft Foundry erőforrások telepítése
3. text-embedding-3-small modell telepítése
4. Application Insights konfigurálása
5. Szolgáltatási principal létrehozása hitelesítéshez
6. `.env` fájl generálása konfigurációval

#### B lehetőség: Kézi telepítés

Ha inkább manuálisan szeretnéd vezérelni vagy az automatikus script nem működik:

```bash
# Változók beállítása
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Erőforráscsoport létrehozása
az group create --name $RESOURCE_GROUP --location $LOCATION

# Fő sablon telepítése
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure telepítés ellenőrzése

```bash
# Ellenőrizze az erőforráscsoportot
az group show --name $RESOURCE_GROUP --output table

# Listázza a telepített erőforrásokat
az resource list --resource-group $RESOURCE_GROUP --output table

# AI szolgáltatás tesztelése
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Környezeti változók beállítása

A telepítés után rendelkezned kell `.env` fájllal. Ellenőrizd, hogy tartalmazza:

```bash
# .env fájl tartalma
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Adatbázis konfiguráció (fejlesztéshez)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker környezet beállítása

### 1. Ismerd meg a Docker kompozíciót

Fejlesztési környezetünk Docker Compose-t használ:

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

### 2. Indítsd el a fejlesztési környezetet

```bash
# Győződj meg róla, hogy a projekt gyökérkönyvtárában vagy
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Indítsd el a szolgáltatásokat
docker-compose up -d

# Ellenőrizd a szolgáltatások állapotát
docker-compose ps

# Nézd meg a naplókat
docker-compose logs -f
```

### 3. Ellenőrizd az adatbázis beállítását

```bash
# Csatlakozás a PostgreSQL konténerhez
docker-compose exec postgres psql -U postgres -d zava

# Adatbázis szerkezet ellenőrzése
\dt retail.*

# Mintaadatok ellenőrzése
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Kilépés a PostgreSQL-ből
\q
```

### 4. Teszteld az MCP szervert

```bash
# Ellenőrizze az MCP szerver állapotát
curl http://localhost:8000/health

# Alapvető MCP végpont tesztelése
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code konfiguráció

### 1. MCP integráció beállítása

Hozz létre VS Code MCP konfigurációt:

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

### 2. Python környezet konfigurálása

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

### 3. Teszteld a VS Code integrációt

1. **Nyisd meg a projektet a VS Code-ban**:
   ```bash
   code .
   ```

2. **Nyisd meg az AI Chat-et**:
   - Nyomd meg a `Ctrl+Shift+P`-t (Windows/Linux) vagy `Cmd+Shift+P`-t (macOS)
   - Írd be: „AI Chat” és válaszd az „AI Chat: Open Chat”-et

3. **Teszteld az MCP szerver kapcsolatot**:
   - Az AI Chat-ben írd be: `#zava` és válassz egy konfigurált szervert
   - Kérdezd meg: „Milyen táblák érhetők el az adatbázisban?”
   - Egy válasznak kell érkeznie a kiskereskedelmi adatbázis tábláiról

## ✅ Környezet ellenőrzése

### 1. Átfogó rendszerellenőrzés

Futtasd ezt az ellenőrző scriptet a beállításod validálásához:

```bash
# Érvényesítési szkript létrehozása
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
    
    # Python verzió ellenőrzése
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Szükséges csomagok ellenőrzése
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Docker ellenőrzése
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Azure CLI ellenőrzése
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Környezeti változók ellenőrzése
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
    
    # Adatbázis kapcsolat ellenőrzése
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Lekérdezés tesztelése
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
    
    # MCP szerver ellenőrzése
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
    
    # Azure AI szolgáltatás ellenőrzése
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Sikertelen lesz, ha a hitelesítő adatok érvénytelenek
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

# Érvényesítés futtatása
python validate_setup.py
```

### 2. Manuális ellenőrzési lista

**✅ Alap eszközök**
- [ ] Docker 20.10+ verzió telepítve és fut
- [ ] Azure CLI 2.40+ telepítve és hitelesítve
- [ ] Python 3.8+ pip-pel telepítve
- [ ] Git 2.30+ telepítve
- [ ] VS Code a szükséges bővítményekkel

**✅ Azure erőforrások**
- [ ] Erőforráscsoport sikeresen létrehozva
- [ ] AI Foundry projekt telepítve
- [ ] OpenAI text-embedding-3-small modell telepítve
- [ ] Application Insights konfigurálva
- [ ] Szolgáltatási principal megfelelő jogosultságokkal létrehozva

**✅ Környezeti konfiguráció**
- [ ] `.env` fájl létrehozva minden szükséges változóval
- [ ] Azure hitelesítő adatok működnek (teszteld `az account show`-val)
- [ ] PostgreSQL konténer fut és elérhető
- [ ] Mintaadatok betöltve az adatbázisba

**✅ VS Code integráció**
- [ ] `.vscode/mcp.json` konfigurálva
- [ ] Python értelmező beállítva a virtuális környezethez
- [ ] MCP szerverek megjelennek az AI Chat-ben
- [ ] Tudsz teszt lekérdezéseket futtatni az AI Chat-en keresztül

## 🛠️ Gyakori problémák elhárítása

### Docker problémák

**Probléma**: A Docker konténerek nem indulnak el
```bash
# Ellenőrizze a Docker szolgáltatás állapotát
docker info

# Ellenőrizze a rendelkezésre álló erőforrásokat
docker system df

# Szükség esetén takarítson
docker system prune -f

# Indítsa újra a Docker Desktopot (Windows/macOS)
# Vagy indítsa újra a Docker szolgáltatást (Linux)
sudo systemctl restart docker
```

**Probléma**: PostgreSQL kapcsolat sikertelen
```bash
# Ellenőrizze a tároló naplóit
docker-compose logs postgres

# Ellenőrizze, hogy a tároló egészséges-e
docker-compose ps

# Tesztelje a közvetlen kapcsolatot
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure telepítési problémák

**Probléma**: Azure telepítés sikertelen
```bash
# Ellenőrizze az Azure CLI hitelesítését
az account show

# Ellenőrizze az előfizetés jogosultságait
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Ellenőrizze az erőforrás-szolgáltató regisztrációját
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Probléma**: AI szolgáltatás hitelesítés sikertelen
```bash
# Teszt szolgáltatás fő
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# AI szolgáltatás telepítésének ellenőrzése
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python környezeti problémák

**Probléma**: Csomag telepítés sikertelen
```bash
# Frissítsük a pip-et és a setuptools-t
python -m pip install --upgrade pip setuptools wheel

# Töröljük a pip gyorsítótárát
pip cache purge

# Csomagok egyenkénti telepítése a hibák azonosításához
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Probléma**: VS Code nem találja a Python értelmezőt
```bash
# Python értelmező útvonalainak megjelenítése
which python  # macOS/Linux
where python  # Windows

# Először aktiváld a virtuális környezetet
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Ezután nyisd meg a VS Code-ot
code .
```

## 🎯 Főbb tanulságok

A labor elvégzése után rendelkezel:

✅ **Teljes fejlesztési környezettel**: Minden eszköz telepítve és konfigurálva  
✅ **Azure erőforrások telepítve**: AI szolgáltatásokkal és támogató infrastruktúrával  
✅ **Futó Docker környezettel**: PostgreSQL és MCP szerver konténerek  
✅ **VS Code integrációval**: MCP szerverek konfigurálva és elérhetők  
✅ **Ellenőrzött beállítással**: Az összetevők tesztelve, együtt működnek  
✅ **Hibakeresési tudással**: Gyakori problémák és megoldásaik  

## 🚀 Mi következik

Miután a környezet készen áll, folytasd a **[Labor 04: Adatbázis tervezés és séma](../04-Database/README.md)** részt, hogy:

- Részletesen megismerd a kiskereskedelmi adatbázis sémát
- Megértsd a többbérlős adatmodellezést
- Tanuld meg a sor szintű biztonság bevezetését
- Dolgozz minta kiskereskedelmi adatokkal

## 📚 További források

### Fejlesztői eszközök
- [Docker dokumentáció](https://docs.docker.com/) - Teljes Docker referencia
- [Azure CLI referencia](https://docs.microsoft.com/cli/azure/) - Azure CLI parancsok
- [VS Code dokumentáció](https://code.visualstudio.com/docs) - Szerkesztő konfiguráció és bővítmények

### Azure szolgáltatások
- [Microsoft Foundry dokumentáció](https://docs.microsoft.com/azure/ai-foundry/) - AI szolgáltatás konfiguráció
- [Azure OpenAI szolgáltatás](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI modell telepítés
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Monitorozás beállítása

### Python fejlesztés
- [Python virtuális környezetek](https://docs.python.org/3/tutorial/venv.html) - Környezet kezelés
- [AsyncIO dokumentáció](https://docs.python.org/3/library/asyncio.html) - Aszinkron programozási minták
- [FastAPI dokumentáció](https://fastapi.tiangolo.com/) - Webkeretrendszer minták

---

**Következő**: Környezet készen? Folytasd a [Labor 04: Adatbázis tervezés és séma](../04-Database/README.md) lépésével

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->