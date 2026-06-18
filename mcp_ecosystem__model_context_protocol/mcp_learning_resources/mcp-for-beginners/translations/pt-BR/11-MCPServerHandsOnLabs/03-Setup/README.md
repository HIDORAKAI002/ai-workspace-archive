# Configuração do Ambiente

## 🎯 O Que Este Lab Cobre

Este laboratório prático guia você na configuração de um ambiente de desenvolvimento completo para construir servidores MCP com integração PostgreSQL. Você configurará todas as ferramentas necessárias, implantará recursos do Azure e validará sua configuração antes de prosseguir com a implementação.

## Visão Geral

Um ambiente de desenvolvimento adequado é crucial para o sucesso no desenvolvimento de servidores MCP. Este laboratório fornece instruções passo a passo para configurar Docker, serviços Azure, ferramentas de desenvolvimento e validar se tudo funciona corretamente em conjunto.

Ao final deste laboratório, você terá um ambiente de desenvolvimento totalmente funcional pronto para construir o servidor MCP Zava Retail.

## Objetivos de Aprendizagem

Ao final deste laboratório, você será capaz de:

- **Instalar e configurar** todas as ferramentas de desenvolvimento necessárias
- **Implantar recursos Azure** necessários para o servidor MCP
- **Configurar containers Docker** para PostgreSQL e o servidor MCP
- **Validar** sua configuração de ambiente com conexões de teste
- **Resolver problemas** comuns de configuração e instalação
- **Compreender** o fluxo de trabalho de desenvolvimento e estrutura de arquivos

## 📋 Verificação de Pré-requisitos

Antes de começar, certifique-se de que você possui:

### Conhecimentos Necessários
- Uso básico de linha de comando (Prompt de Comando do Windows/PowerShell)
- Entendimento de variáveis de ambiente
- Familiaridade com controle de versão Git
- Conceitos básicos de Docker (containers, imagens, volumes)

### Requisitos do Sistema
- **Sistema Operacional**: Windows 10/11, macOS ou Linux
- **RAM**: Mínimo 8GB (16GB recomendado)
- **Armazenamento**: Pelo menos 10GB de espaço livre
- **Rede**: Conexão com internet para downloads e implantação Azure

### Requisitos de Conta
- **Assinatura Azure**: Nível gratuito é suficiente
- **Conta GitHub**: Para acesso ao repositório
- **Conta Docker Hub**: (Opcional) Para publicação de imagens customizadas

## 🛠️ Instalação das Ferramentas

### 1. Instale o Docker Desktop

O Docker fornece o ambiente conteinerizado para nossa configuração de desenvolvimento.

#### Instalação no Windows

1. **Baixe o Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Instale e Configure**:
   - Execute o instalador como Administrador
   - Habilite a integração com WSL 2 quando solicitado
   - Reinicie o computador quando a instalação terminar

3. **Verifique a Instalação**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Instalação no macOS

1. **Baixe e Instale**:
   ```bash
   # Baixe de https://desktop.docker.com/mac/stable/Docker.dmg
   # Ou use o Homebrew
   brew install --cask docker
   ```

2. **Inicie o Docker Desktop**:
   - Abra o Docker Desktop em Aplicativos
   - Complete o assistente de configuração inicial

3. **Verifique a Instalação**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Instalação no Linux

1. **Instale o Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Faça logout e login novamente para que as alterações do grupo tenham efeito
   ```

2. **Instale o Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Instale o Azure CLI

O Azure CLI permite implantar e gerenciar recursos Azure.

#### Instalação no Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Instalação no macOS

```bash
# Usando Homebrew
brew install azure-cli

# Ou usando instalador
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

#### Verifique e Autentique

```bash
# Verificar instalação
az version

# Login no Azure
az login

# Definir assinatura padrão (se você tiver várias)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Instale o Git

O Git é necessário para clonar o repositório e controle de versão.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# O Git geralmente já vem pré-instalado, mas você pode atualizar via Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Instale o VS Code

O Visual Studio Code oferece o ambiente integrado de desenvolvimento com suporte MCP.

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
# Instale via linha de comando
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Ou instale via VS Code:
1. Abra o VS Code
2. Vá para Extensões (Ctrl+Shift+X)
3. Instale:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Instale o Python

Python 3.8+ é necessário para desenvolvimento do servidor MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Usando Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Verifique a Instalação

```bash
python --version  # Deve mostrar Python 3.11.x
pip --version      # Deve mostrar a versão do pip
```

## 🚀 Configuração do Projeto

### 1. Clone o Repositório

```bash
# Clone o repositório principal
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navegue até o diretório do projeto
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Verifique a estrutura do repositório
ls -la
```

### 2. Crie o Ambiente Virtual Python

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

### 3. Instale as Dependências Python

```bash
# Instalar dependências de desenvolvimento
pip install -r requirements.lock.txt

# Verificar pacotes principais
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Implantação de Recursos Azure

### 1. Entenda os Requisitos de Recursos

Nosso servidor MCP requer esses recursos Azure:

| **Recurso** | **Finalidade** | **Custo Estimado** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Hospedagem e gerenciamento de modelos de IA | $10-50/mês |
| **Implantação OpenAI** | Modelo de incorporação de texto (text-embedding-3-small) | $5-20/mês |
| **Application Insights** | Monitoramento e telemetria | $5-15/mês |
| **Grupo de Recursos** | Organização de recursos | Grátis |

### 2. Implante os Recursos Azure

#### Opção A: Implantação Automatizada (Recomendada)

```bash
# Navegar para o diretório de infraestrutura
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

O script de implantação fará:
1. Criação de um grupo de recursos único
2. Implantação dos recursos Microsoft Foundry
3. Implantação do modelo text-embedding-3-small
4. Configuração do Application Insights
5. Criação de um principal de serviço para autenticação
6. Geração do arquivo `.env` com configuração

#### Opção B: Implantação Manual

Se preferir controle manual ou o script automatizado falhar:

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

### 3. Verifique a Implantação Azure

```bash
# Verificar grupo de recursos
az group show --name $RESOURCE_GROUP --output table

# Listar recursos implantados
az resource list --resource-group $RESOURCE_GROUP --output table

# Testar serviço de IA
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Configure as Variáveis de Ambiente

Após a implantação, você deve ter um arquivo `.env`. Verifique se ele contém:

```bash
# Conteúdo do arquivo .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Configuração do banco de dados (para desenvolvimento)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Configuração do Ambiente Docker

### 1. Entenda a Composição Docker

Nosso ambiente de desenvolvimento usa Docker Compose:

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

### 2. Inicie o Ambiente de Desenvolvimento

```bash
# Certifique-se de que você está no diretório raiz do projeto
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Iniciar os serviços
docker-compose up -d

# Verificar o status do serviço
docker-compose ps

# Visualizar logs
docker-compose logs -f
```

### 3. Verifique a Configuração do Banco de Dados

```bash
# Conectar ao container PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Verificar estrutura do banco de dados
\dt retail.*

# Verificar dados de exemplo
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Sair do PostgreSQL
\q
```

### 4. Teste o Servidor MCP

```bash
# Verificar a saúde do servidor MCP
curl http://localhost:8000/health

# Testar o endpoint básico do MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Configuração do VS Code

### 1. Configure a Integração MCP

Crie a configuração MCP no VS Code:

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

### 2. Configure o Ambiente Python

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

### 3. Teste a Integração no VS Code

1. **Abra o projeto no VS Code**:
   ```bash
   code .
   ```

2. **Abra o Chat AI**:
   - Pressione `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (macOS)
   - Digite "AI Chat" e selecione "AI Chat: Open Chat"

3. **Teste a Conexão do Servidor MCP**:
   - No AI Chat, digite `#zava` e selecione um dos servidores configurados
   - Pergunte: "Quais tabelas estão disponíveis no banco de dados?"
   - Você deve receber uma resposta listando as tabelas do banco de dados de varejo

## ✅ Validação do Ambiente

### 1. Verificação Abrangente do Sistema

Execute este script de validação para verificar sua configuração:

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
    
    # Verificar conexão com o banco de dados
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
        
        # Isso falhará se as credenciais forem inválidas
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

### 2. Lista de Verificação Manual

**✅ Ferramentas Básicas**
- [ ] Docker versão 20.10+ instalado e em execução
- [ ] Azure CLI 2.40+ instalado e autenticado
- [ ] Python 3.8+ com pip instalado
- [ ] Git 2.30+ instalado
- [ ] VS Code com extensões necessárias

**✅ Recursos Azure**
- [ ] Grupo de recursos criado com sucesso
- [ ] Projeto AI Foundry implantado
- [ ] Modelo OpenAI text-embedding-3-small implantado
- [ ] Application Insights configurado
- [ ] Principal de serviço criado com permissões adequadas

**✅ Configuração do Ambiente**
- [ ] Arquivo `.env` criado com todas as variáveis necessárias
- [ ] Credenciais Azure funcionando (teste com `az account show`)
- [ ] Container PostgreSQL em execução e acessível
- [ ] Dados de exemplo carregados no banco de dados

**✅ Integração VS Code**
- [ ] `.vscode/mcp.json` configurado
- [ ] Interpretador Python definido para ambiente virtual
- [ ] Servidores MCP disponíveis no AI Chat
- [ ] Execução de consultas de teste pelo AI Chat

## 🛠️ Solução de Problemas Comuns

### Problemas com Docker

**Problema**: Containers Docker não inicializam
```bash
# Verificar status do serviço Docker
docker info

# Verificar recursos disponíveis
docker system df

# Limpar se necessário
docker system prune -f

# Reiniciar Docker Desktop (Windows/macOS)
# Ou reiniciar serviço Docker (Linux)
sudo systemctl restart docker
```

**Problema**: Falha na conexão com PostgreSQL
```bash
# Verificar os logs do contêiner
docker-compose logs postgres

# Verificar se o contêiner está saudável
docker-compose ps

# Testar conexão direta
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Problemas com Implantação Azure

**Problema**: Falha na implantação Azure
```bash
# Verificar autenticação do Azure CLI
az account show

# Verificar permissões da assinatura
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Verificar registro do provedor de recursos
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

# Verificar implantação do serviço de IA
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Problemas com Ambiente Python

**Problema**: Falha na instalação de pacotes
```bash
# Atualizar pip e setuptools
python -m pip install --upgrade pip setuptools wheel

# Limpar cache do pip
pip cache purge

# Instalar pacotes um por um para identificar problemas
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Problema**: VS Code não encontra interpretador Python
```bash
# Mostrar caminhos do interpretador Python
which python  # macOS/Linux
where python  # Windows

# Ative o ambiente virtual primeiro
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Então abra o VS Code
code .
```

## 🎯 Principais Conclusões

Após completar este laboratório, você deverá ter:

✅ **Ambiente de Desenvolvimento Completo**: Todas as ferramentas instaladas e configuradas  
✅ **Recursos Azure Implantados**: Serviços AI e infraestrutura suporte  
✅ **Ambiente Docker em Funcionamento**: Containers PostgreSQL e servidor MCP  
✅ **Integração VS Code**: Servidores MCP configurados e acessíveis  
✅ **Configuração Validada**: Todos os componentes testados e funcionando juntos  
✅ **Conhecimento para Resolver Problemas**: Problemas comuns e soluções  

## 🚀 Próximos Passos

Com seu ambiente pronto, continue para **[Lab 04: Design e Esquema do Banco de Dados](../04-Database/README.md)** para:

- Explorar o esquema do banco de dados de varejo em detalhes
- Entender o modelo de dados multi-inquilino
- Aprender sobre a implementação de Row Level Security
- Trabalhar com dados de varejo de exemplo

## 📚 Recursos Adicionais

### Ferramentas de Desenvolvimento
- [Documentação Docker](https://docs.docker.com/) - Referência completa Docker
- [Referência Azure CLI](https://docs.microsoft.com/cli/azure/) - Comandos Azure CLI
- [Documentação VS Code](https://code.visualstudio.com/docs) - Configuração e extensões do editor

### Serviços Azure
- [Documentação Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Configuração do serviço AI
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - Implantação de modelos AI
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Configuração de monitoramento

### Desenvolvimento Python
- [Ambientes Virtuais Python](https://docs.python.org/3/tutorial/venv.html) - Gerenciamento de ambiente
- [Documentação AsyncIO](https://docs.python.org/3/library/asyncio.html) - Padrões de programação assíncrona
- [Documentação FastAPI](https://fastapi.tiangolo.com/) - Padrões do framework web

---

**Próximo**: Ambiente pronto? Continue com [Lab 04: Design e Esquema do Banco de Dados](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->