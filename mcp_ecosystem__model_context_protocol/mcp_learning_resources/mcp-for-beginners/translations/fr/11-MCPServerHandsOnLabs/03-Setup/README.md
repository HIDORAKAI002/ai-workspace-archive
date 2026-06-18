# Configuration de l’Environnement

## 🎯 Ce que ce laboratoire couvre

Ce laboratoire pratique vous guide dans la mise en place d’un environnement de développement complet pour la création de serveurs MCP avec intégration PostgreSQL. Vous allez configurer tous les outils nécessaires, déployer des ressources Azure, et valider votre configuration avant de passer à l’implémentation.

## Vue d’ensemble

Un environnement de développement adéquat est crucial pour réussir le développement d’un serveur MCP. Ce laboratoire fournit des instructions étape par étape pour configurer Docker, les services Azure, les outils de développement, et vérifier que tout fonctionne correctement ensemble.

À la fin de ce laboratoire, vous disposerez d’un environnement de développement pleinement fonctionnel prêt à construire le serveur Zava Retail MCP.

## Objectifs d’apprentissage

À la fin de ce laboratoire, vous serez capable de :

- **Installer et configurer** tous les outils de développement requis  
- **Déployer des ressources Azure** nécessaires au serveur MCP  
- **Configurer des conteneurs Docker** pour PostgreSQL et le serveur MCP  
- **Valider** votre configuration d’environnement par des connexions tests  
- **Résoudre** les problèmes courants d’installation et de configuration  
- **Comprendre** le flux de développement et la structure des fichiers  

## 📋 Vérification des prérequis

Avant de commencer, assurez-vous de disposer de :

### Connaissances requises
- Utilisation de base de la ligne de commande (Invite de commandes Windows / PowerShell)  
- Compréhension des variables d’environnement  
- Familiarité avec le contrôle de version Git  
- Concepts de base Docker (conteneurs, images, volumes)  

### Configuration système
- **Système d’exploitation** : Windows 10/11, macOS ou Linux  
- **RAM** : Minimum 8 Go (16 Go recommandé)  
- **Stockage** : Au moins 10 Go d’espace libre  
- **Réseau** : Connexion Internet pour les téléchargements et le déploiement Azure  

### Comptes requis
- **Abonnement Azure** : Le niveau gratuit est suffisant  
- **Compte GitHub** : Pour accéder au dépôt  
- **Compte Docker Hub** : (Optionnel) Pour publier des images personnalisées  

## 🛠️ Installation des outils

### 1. Installer Docker Desktop

Docker fournit l’environnement conteneurisé pour notre configuration de développement.

#### Installation Windows

1. **Télécharger Docker Desktop** :  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Installer et configurer** :  
   - Exécutez l’installateur en tant qu’Administrateur  
   - Activez l’intégration WSL 2 lorsqu’elle est proposée  
   - Redémarrez votre ordinateur à la fin de l’installation  

3. **Vérifier l’installation** :  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### Installation macOS

1. **Télécharger et installer** :  
   ```bash
   # Téléchargez depuis https://desktop.docker.com/mac/stable/Docker.dmg
   # Ou utilisez Homebrew
   brew install --cask docker
   ```
  
2. **Démarrer Docker Desktop** :  
   - Lancez Docker Desktop depuis Applications  
   - Complétez l’assistant de configuration initiale  

3. **Vérifier l’installation** :  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Installation Linux

1. **Installer Docker Engine** :  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Déconnectez-vous et reconnectez-vous pour que les modifications de groupe prennent effet
   ```
  
2. **Installer Docker Compose** :  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Installer Azure CLI

Azure CLI permet le déploiement et la gestion des ressources Azure.

#### Installation Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### Installation macOS

```bash
# Utilisation de Homebrew
brew install azure-cli

# Ou utilisation de l'installateur
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Installation Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Vérifier et s’authentifier

```bash
# Vérifier l'installation
az version

# Se connecter à Azure
az login

# Définir l'abonnement par défaut (si vous en avez plusieurs)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Installer Git

Git est nécessaire pour cloner le dépôt et le contrôle de version.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git est généralement préinstallé, mais vous pouvez le mettre à jour via Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Installer VS Code

Visual Studio Code fournit l’environnement de développement intégré avec support MCP.

#### Installation

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Extensions requises

Installez ces extensions VS Code :

```bash
# Installer via la ligne de commande
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Ou installez via VS Code :  
1. Ouvrez VS Code  
2. Allez dans Extensions (Ctrl+Shift+X)  
3. Installez :  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Installer Python

Python 3.8+ est requis pour le développement du serveur MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Utilisation de Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Vérifier l’installation

```bash
python --version  # Devrait afficher Python 3.11.x
pip --version      # Devrait afficher la version de pip
```
  
## 🚀 Mise en place du projet

### 1. Cloner le dépôt

```bash
# Cloner le dépôt principal
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Naviguer jusqu'au répertoire du projet
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Vérifier la structure du dépôt
ls -la
```
  
### 2. Créer un environnement virtuel Python

```bash
# Créer un environnement virtuel
python -m venv mcp-env

# Activer l'environnement virtuel
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Mettre à jour pip
python -m pip install --upgrade pip
```
  
### 3. Installer les dépendances Python

```bash
# Installer les dépendances de développement
pip install -r requirements.lock.txt

# Vérifier les packages clés
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Déploiement des ressources Azure

### 1. Comprendre les besoins en ressources

Notre serveur MCP nécessite ces ressources Azure :

| **Ressource** | **Objectif** | **Coût estimé** |
|--------------|--------------|-----------------|
| **Microsoft Foundry** | Hébergement et gestion de modèle IA | 10-50 $/mois |
| **Déploiement OpenAI** | Modèle d’encodage de texte (text-embedding-3-small) | 5-20 $/mois |
| **Application Insights** | Supervision et télémétrie | 5-15 $/mois |
| **Groupe de ressources** | Organisation des ressources | Gratuit |

### 2. Déployer les ressources Azure

#### Option A : Déploiement automatisé (recommandé)

```bash
# Naviguer vers le répertoire infrastructure
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Le script de déploiement va :  
1. Créer un groupe de ressources unique  
2. Déployer les ressources Microsoft Foundry  
3. Déployer le modèle text-embedding-3-small  
4. Configurer Application Insights  
5. Créer un principal de service pour l’authentification  
6. Générer le fichier `.env` avec la configuration  

#### Option B : Déploiement manuel

Si vous préférez le contrôle manuel ou si le script automatisé échoue :

```bash
# Définir les variables
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Créer un groupe de ressources
az group create --name $RESOURCE_GROUP --location $LOCATION

# Déployer le modèle principal
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Vérifier le déploiement Azure

```bash
# Vérifier le groupe de ressources
az group show --name $RESOURCE_GROUP --output table

# Lister les ressources déployées
az resource list --resource-group $RESOURCE_GROUP --output table

# Tester le service IA
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Configurer les variables d’environnement

Après le déploiement, vous devriez avoir un fichier `.env`. Vérifiez qu’il contient :

```bash
# Contenu du fichier .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Configuration de la base de données (pour le développement)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Configuration de l’environnement Docker

### 1. Comprendre la composition Docker

Notre environnement de développement utilise Docker Compose :

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
  
### 2. Démarrer l’environnement de développement

```bash
# Assurez-vous d'être dans le répertoire racine du projet
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Démarrer les services
docker-compose up -d

# Vérifier le statut du service
docker-compose ps

# Voir les journaux
docker-compose logs -f
```
  
### 3. Vérifier la configuration de la base de données

```bash
# Se connecter au conteneur PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Vérifier la structure de la base de données
\dt retail.*

# Vérifier les données d'exemple
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Quitter PostgreSQL
\q
```
  
### 4. Tester le serveur MCP

```bash
# Vérifier la santé du serveur MCP
curl http://localhost:8000/health

# Tester le point de terminaison MCP de base
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 Configuration de VS Code

### 1. Configurer l’intégration MCP

Créez la configuration MCP dans VS Code :

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
  
### 2. Configurer l’environnement Python

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
  
### 3. Tester l’intégration VS Code

1. **Ouvrez le projet dans VS Code** :  
   ```bash
   code .
   ```
  
2. **Ouvrir AI Chat** :  
   - Pressez `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (macOS)  
   - Tapez « AI Chat » et sélectionnez « AI Chat : Ouvrir Chat »  

3. **Tester la connexion au serveur MCP** :  
   - Dans AI Chat, tapez `#zava` et sélectionnez un des serveurs configurés  
   - Posez la question : « Quelles tables sont disponibles dans la base de données ? »  
   - Vous devriez recevoir une réponse listant les tables de la base de données retail  

## ✅ Validation de l’environnement

### 1. Vérification système complète

Exécutez ce script de validation pour vérifier votre configuration :

```bash
# Créer un script de validation
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
    
    # Vérifier la version de Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Vérifier les paquets requis
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Vérifier Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Vérifier Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Vérifier les variables d'environnement
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
    
    # Vérifier la connexion à la base de données
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Tester la requête
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
    
    # Vérifier le serveur MCP
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
    
    # Vérifier le service Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Cela échouera si les identifiants sont invalides
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

# Exécuter la validation
python validate_setup.py
```
  
### 2. Liste de contrôle manuelle

**✅ Outils de base**  
- [ ] Docker version 20.10+ installé et en fonctionnement  
- [ ] Azure CLI 2.40+ installé et authentifié  
- [ ] Python 3.8+ avec pip installé  
- [ ] Git 2.30+ installé  
- [ ] VS Code avec extensions requises  

**✅ Ressources Azure**  
- [ ] Groupe de ressources créé avec succès  
- [ ] Projet AI Foundry déployé  
- [ ] Modèle OpenAI text-embedding-3-small déployé  
- [ ] Application Insights configuré  
- [ ] Principal de service créé avec les permissions adéquates  

**✅ Configuration de l’environnement**  
- [ ] Fichier `.env` créé avec toutes les variables requises  
- [ ] Identifiants Azure fonctionnels (test avec `az account show`)  
- [ ] Conteneur PostgreSQL démarré et accessible  
- [ ] Données d’exemple chargées dans la base  

**✅ Intégration VS Code**  
- [ ] Fichier `.vscode/mcp.json` configuré  
- [ ] Interpréteur Python réglé sur l’environnement virtuel  
- [ ] Serveurs MCP visibles dans AI Chat  
- [ ] Requêtes test exécutables via AI Chat  

## 🛠️ Résolution des problèmes courants

### Problèmes Docker

**Problème** : Les conteneurs Docker ne démarrent pas  
```bash
# Vérifier l'état du service Docker
docker info

# Vérifier les ressources disponibles
docker system df

# Nettoyer si nécessaire
docker system prune -f

# Redémarrer Docker Desktop (Windows/macOS)
# Ou redémarrer le service Docker (Linux)
sudo systemctl restart docker
```
  
**Problème** : Échec de connexion à PostgreSQL  
```bash
# Vérifier les journaux du conteneur
docker-compose logs postgres

# Vérifier que le conteneur est sain
docker-compose ps

# Tester la connexion directe
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Problèmes de déploiement Azure

**Problème** : Échec du déploiement Azure  
```bash
# Vérifiez l'authentification Azure CLI
az account show

# Vérifiez les permissions d'abonnement
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Vérifiez l'enregistrement du fournisseur de ressources
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Problème** : Échec d’authentification au service IA  
```bash
# Tester le principal de service
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Vérifier le déploiement du service IA
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Problèmes d’environnement Python

**Problème** : Échec d’installation des paquets  
```bash
# Mettre à niveau pip et setuptools
python -m pip install --upgrade pip setuptools wheel

# Vider le cache de pip
pip cache purge

# Installer les packages un par un pour identifier les problèmes
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Problème** : VS Code ne trouve pas l’interpréteur Python  
```bash
# Afficher les chemins de l'interpréteur Python
which python  # macOS/Linux
where python  # Windows

# Activer d'abord l'environnement virtuel
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Puis ouvrir VS Code
code .
```
  
## 🎯 Points clés à retenir

Après avoir complété ce laboratoire, vous devriez avoir :

✅ **Environnement de développement complet** : Tous les outils installés et configurés  
✅ **Ressources Azure déployées** : Services IA et infrastructure associée  
✅ **Environnement Docker opérationnel** : Containeurs PostgreSQL et serveur MCP  
✅ **Intégration VS Code** : Serveurs MCP configurés et accessibles  
✅ **Configuration validée** : Tous les composants testés et fonctionnant ensemble  
✅ **Connaissance en dépannage** : Problèmes courants et solutions  

## 🚀 Et ensuite

Avec votre environnement prêt, continuez vers **[Laboratoire 04 : Conception de base de données et schéma](../04-Database/README.md)** pour :

- Explorer en détail le schéma de la base retail  
- Comprendre la modélisation multi-tenant  
- Apprendre l’implémentation de la sécurité au niveau des lignes  
- Travailler avec les données d’exemple retail  

## 📚 Ressources supplémentaires

### Outils de développement  
- [Documentation Docker](https://docs.docker.com/) - Référence complète Docker  
- [Référence Azure CLI](https://docs.microsoft.com/cli/azure/) - Commandes Azure CLI  
- [Documentation VS Code](https://code.visualstudio.com/docs) - Configuration de l’éditeur et extensions  

### Services Azure  
- [Documentation Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Configuration service IA  
- [Service Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Déploiement modèle IA  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Configuration monitoring  

### Développement Python  
- [Environnements virtuels Python](https://docs.python.org/3/tutorial/venv.html) - Gestion des environnements  
- [Documentation AsyncIO](https://docs.python.org/3/library/asyncio.html) - Modèles de programmation asynchrone  
- [Documentation FastAPI](https://fastapi.tiangolo.com/) - Modèles de framework web  

---

**Suivant** : Environnement prêt ? Continuez avec [Laboratoire 04 : Conception de base de données et schéma](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->