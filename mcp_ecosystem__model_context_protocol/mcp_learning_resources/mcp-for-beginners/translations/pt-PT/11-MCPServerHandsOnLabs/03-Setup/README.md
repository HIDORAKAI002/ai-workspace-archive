# Configuração do Ambiente

## 🎯 O Que Este Laboratório Abrange

Este laboratório prático orienta-o na configuração de um ambiente de desenvolvimento completo para construir servidores MCP com integração PostgreSQL. Vai configurar todas as ferramentas necessárias, implementar recursos Azure e validar a sua configuração antes de avançar para a implementação.

## Visão Geral

Um ambiente de desenvolvimento adequado é crucial para o sucesso do desenvolvimento do servidor MCP. Este laboratório fornece instruções passo a passo para configurar Docker, serviços Azure, ferramentas de desenvolvimento e validar que tudo funciona correctamente em conjunto.

No final deste laboratório, terá um ambiente de desenvolvimento totalmente funcional pronto para construir o servidor MCP Zava Retail.

## Objetivos de Aprendizagem

No final deste laboratório, será capaz de:

- **Instalar e configurar** todas as ferramentas de desenvolvimento necessárias  
- **Implantar recursos Azure** necessários para o servidor MCP  
- **Configurar contêineres Docker** para PostgreSQL e o servidor MCP  
- **Validar** a configuração do seu ambiente com conexões de teste  
- **Resolver problemas** comuns de configuração e instalação  
- **Compreender** o fluxo de trabalho de desenvolvimento e a estrutura de ficheiros  

## 📋 Verificação de Pré-requisitos

Antes de começar, assegure-se de que tem:

### Conhecimentos Necessários
- Uso básico da linha de comandos (Windows Command Prompt/PowerShell)  
- Compreensão de variáveis de ambiente  
- Familiaridade com controlo de versão Git  
- Conceitos básicos de Docker (contêineres, imagens, volumes)  

### Requisitos do Sistema
- **Sistema Operativo**: Windows 10/11, macOS ou Linux  
- **RAM**: Mínimo 8GB (16GB recomendado)  
- **Armazenamento**: Pelo menos 10GB de espaço livre  
- **Rede**: Ligação à internet para downloads e deployment no Azure  

### Requisitos de Conta
- **Assinatura Azure**: O nível gratuito é suficiente  
- **Conta GitHub**: Para acesso ao repositório  
- **Conta Docker Hub**: (Opcional) Para publicação de imagens personalizadas  

## 🛠️ Instalação de Ferramentas

### 1. Instalar Docker Desktop

O Docker fornece o ambiente conteinerizado para a nossa configuração de desenvolvimento.

#### Instalação no Windows

1. **Descarregar Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Instalar e Configurar**:  
   - Execute o instalador como Administrador  
   - Ative a integração WSL 2 quando solicitado  
   - Reinicie o computador quando a instalação terminar  

3. **Verificar Instalação**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### Instalação no macOS

1. **Descarregar e Instalar**:  
   ```bash
   # Descarregar de https://desktop.docker.com/mac/stable/Docker.dmg
   # Ou usar o Homebrew
   brew install --cask docker
   ```
  
2. **Iniciar o Docker Desktop**:  
   - Abra o Docker Desktop a partir da pasta Aplicações  
   - Complete o assistente de configuração inicial  

3. **Verificar Instalação**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Instalação no Linux

1. **Instalar Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Termine a sessão e inicie-a novamente para que as alterações de grupo tenham efeito
   ```
  
2. **Instalar Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Instalar Azure CLI

A Azure CLI permite a implantação e gestão de recursos Azure.

#### Instalação no Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### Instalação no macOS

```bash
# Usar o Homebrew
brew install azure-cli

# Ou usar o instalador
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Instalação no Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Verificar e Autenticar

```bash
# Verificar instalação
az version

# Iniciar sessão no Azure
az login

# Definir subscrição predefinida (se tiver várias)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Instalar Git

O Git é necessário para clonar o repositório e controlo de versão.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# O Git normalmente vem pré-instalado, mas pode atualizar via Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Instalar VS Code

O Visual Studio Code fornece o ambiente de desenvolvimento integrado com suporte MCP.

#### Instalação

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Extensões Necessárias

Instale estas extensões no VS Code:

```bash
# Instalar via linha de comando
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Ou instale pelo VS Code:  
1. Abra o VS Code  
2. Vá para Extensões (Ctrl+Shift+X)  
3. Instale:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Instalar Python

Python 3.8+ é necessário para o desenvolvimento do servidor MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Usar Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Verificar Instalação

```bash
python --version  # Deve mostrar Python 3.11.x
pip --version      # Deve mostrar a versão do pip
```
  
## 🚀 Configuração do Projeto

### 1. Clonar o Repositório

```bash
# Clonar o repositório principal
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navegar para o diretório do projeto
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Verificar a estrutura do repositório
ls -la
```
  
### 2. Criar Ambiente Virtual Python

```bash
# Criar ambiente virtual
python -m venv mcp-env

# Ativar ambiente virtual
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Atualizar pip
python -m pip install --upgrade pip
```
  
### 3. Instalar Dependências Python

```bash
# Instalar dependências de desenvolvimento
pip install -r requirements.lock.txt

# Verificar pacotes chave
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Implantação de Recursos Azure

### 1. Compreender os Requisitos de Recursos

O nosso servidor MCP necessita destes recursos Azure:

| **Recurso** | **Propósito** | **Custo Estimado** |
|-------------|---------------|--------------------|
| **Microsoft Foundry** | Hospedagem e gestão de modelos IA | $10-50/mês |
| **OpenAI Deployment** | Modelo de embedding de texto (text-embedding-3-small) | $5-20/mês |
| **Application Insights** | Monitorização e telemetria | $5-15/mês |
| **Resource Group** | Organização de recursos | Grátis |

### 2. Implantar Recursos Azure

#### Opção A: Implantação Automatizada (Recomendada)

```bash
# Navegar para o diretório da infraestrutura
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
O script de implantação irá:  
1. Criar um grupo de recursos único  
2. Implantar recursos Microsoft Foundry  
3. Implantar o modelo text-embedding-3-small  
4. Configurar Application Insights  
5. Criar um serviço principal para autenticação  
6. Gerar ficheiro `.env` com configuração  

#### Opção B: Implantação Manual

Se preferir controlo manual ou o script automático falhar:

```bash
# Definir variáveis
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Criar grupo de recursos
az group create --name $RESOURCE_GROUP --location $LOCATION

# Implantar modelo principal
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Verificar Implantação Azure

```bash
# Verificar grupo de recursos
az group show --name $RESOURCE_GROUP --output table

# Listar recursos implementados
az resource list --resource-group $RESOURCE_GROUP --output table

# Testar serviço de IA
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Configurar Variáveis de Ambiente

Após a implantação, deverá ter um ficheiro `.env`. Verifique que contém:

```bash
# Conteúdo do ficheiro .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Configuração da base de dados (para desenvolvimento)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Configuração do Ambiente Docker

### 1. Compreender a Composição Docker

O nosso ambiente de desenvolvimento usa Docker Compose:

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
  
### 2. Iniciar o Ambiente de Desenvolvimento

```bash
# Certifique-se de que está no diretório raiz do projeto
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Inicie os serviços
docker-compose up -d

# Verifique o estado do serviço
docker-compose ps

# Veja os registos
docker-compose logs -f
```
  
### 3. Verificar Configuração da Base de Dados

```bash
# Ligar ao contentor PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Verificar a estrutura da base de dados
\dt retail.*

# Verificar dados de exemplo
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Sair do PostgreSQL
\q
```
  
### 4. Testar o Servidor MCP

```bash
# Verificar a integridade do servidor MCP
curl http://localhost:8000/health

# Testar o endpoint básico do MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 Configuração do VS Code

### 1. Configurar Integração MCP

Crie a configuração MCP para o VS Code:

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
  
### 2. Configurar Ambiente Python

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
  
### 3. Testar Integração VS Code

1. **Abrir o projeto no VS Code**:  
   ```bash
   code .
   ```
  
2. **Abrir AI Chat**:  
   - Pressione `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (macOS)  
   - Digite "AI Chat" e selecione "AI Chat: Open Chat"  

3. **Testar Conexão ao Servidor MCP**:  
   - No AI Chat, escreva `#zava` e selecione um dos servidores configurados  
   - Pergunte: "Que tabelas estão disponíveis na base de dados?"  
   - Deve receber uma resposta listando as tabelas da base de dados de retalho  

## ✅ Validação do Ambiente

### 1. Verificação Abrangente do Sistema

Execute este script de validação para verificar a sua configuração:

```bash
# Criar script de validação
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
    
    # Verificar versão do Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Verificar pacotes necessários
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Verificar Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Verificar Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Verificar variáveis de ambiente
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
    
    # Verificar ligação à base de dados
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testar consulta
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
    
    # Verificar servidor MCP
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
    
    # Verificar serviço Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Isto falhará se as credenciais forem inválidas
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

# Executar validação
python validate_setup.py
```
  
### 2. Checklist de Validação Manual

**✅ Ferramentas Básicas**  
- [ ] Docker versão 20.10+ instalado e a correr  
- [ ] Azure CLI 2.40+ instalado e autenticado  
- [ ] Python 3.8+ com pip instalado  
- [ ] Git 2.30+ instalado  
- [ ] VS Code com extensões necessárias  

**✅ Recursos Azure**  
- [ ] Grupo de recursos criado com sucesso  
- [ ] Projeto AI Foundry implantado  
- [ ] Modelo OpenAI text-embedding-3-small implantado  
- [ ] Application Insights configurado  
- [ ] Serviço principal criado com permissões adequadas  

**✅ Configuração do Ambiente**  
- [ ] Ficheiro `.env` criado com todas as variáveis necessárias  
- [ ] Credenciais Azure a funcionar (teste com `az account show`)  
- [ ] Contêiner PostgreSQL a correr e acessível  
- [ ] Dados de exemplo carregados na base de dados  

**✅ Integração VS Code**  
- [ ] `.vscode/mcp.json` configurado  
- [ ] Interpretador Python definido para o ambiente virtual  
- [ ] Servidores MCP aparecem no AI Chat  
- [ ] Capacidade de executar queries de teste através do AI Chat  

## 🛠️ Resolução de Problemas Comuns

### Problemas com Docker

**Problema**: Contêineres Docker não iniciam  
```bash
# Verificar o estado do serviço Docker
docker info

# Verificar recursos disponíveis
docker system df

# Limpar se necessário
docker system prune -f

# Reiniciar o Docker Desktop (Windows/macOS)
# Ou reiniciar o serviço Docker (Linux)
sudo systemctl restart docker
```
  
**Problema**: Falha na ligação ao PostgreSQL  
```bash
# Verificar logs do contentor
docker-compose logs postgres

# Verificar se o contentor está saudável
docker-compose ps

# Testar ligação direta
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Problemas na Implantação Azure

**Problema**: Falha na implantação Azure  
```bash
# Verificar autenticação do Azure CLI
az account show

# Verificar permissões da subscrição
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Verificar registo do fornecedor de recursos
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Problema**: Falha na autenticação do serviço AI  
```bash
# Testar principal do serviço
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Verificar implementação do serviço de IA
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Problemas com Ambiente Python

**Problema**: Falha na instalação de pacotes  
```bash
# Atualizar o pip e setuptools
python -m pip install --upgrade pip setuptools wheel

# Limpar a cache do pip
pip cache purge

# Instalar pacotes um a um para identificar problemas
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Problema**: VS Code não encontra interpretador Python  
```bash
# Mostrar caminhos do interpretador Python
which python  # macOS/Linux
where python  # Windows

# Ativar primeiro o ambiente virtual
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Depois abrir o VS Code
code .
```
  
## 🎯 Principais Conclusões

Após completar este laboratório, deverá ter:

✅ **Ambiente de Desenvolvimento Completo**: Todas as ferramentas instaladas e configuradas  
✅ **Recursos Azure Implantados**: Serviços AI e infraestrutura de suporte  
✅ **Ambiente Docker a Correr**: Contêineres PostgreSQL e servidor MCP  
✅ **Integração com VS Code**: Servidores MCP configurados e acessíveis  
✅ **Configuração Validada**: Todos os componentes testados e a funcionar em conjunto  
✅ **Conhecimento de Resolução de Problemas**: Problemas comuns e soluções  

## 🚀 Próximos Passos

Com o seu ambiente pronto, continue para **[Lab 04: Design e Esquema da Base de Dados](../04-Database/README.md)** para:

- Explorar o esquema da base de dados de retalho em detalhe  
- Compreender a modelagem de dados multi-inquilino  
- Aprender sobre implementação de Row Level Security  
- Trabalhar com dados de retalho de exemplo  

## 📚 Recursos Adicionais

### Ferramentas de Desenvolvimento
- [Documentação Docker](https://docs.docker.com/) - Referência completa do Docker  
- [Referência Azure CLI](https://docs.microsoft.com/cli/azure/) - Comandos Azure CLI  
- [Documentação VS Code](https://code.visualstudio.com/docs) - Configuração do editor e extensões  

### Serviços Azure
- [Documentação Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Configuração de serviços AI  
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - Implantação de modelos AI  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Configuração de monitorização  

### Desenvolvimento Python
- [Ambientes Virtuais Python](https://docs.python.org/3/tutorial/venv.html) - Gestão de ambientes  
- [Documentação AsyncIO](https://docs.python.org/3/library/asyncio.html) - Padrões de programação assíncrona  
- [Documentação FastAPI](https://fastapi.tiangolo.com/) - Padrões de frameworks web  

---

**Próximo**: Ambiente pronto? Continue com [Lab 04: Design e Esquema da Base de Dados](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->