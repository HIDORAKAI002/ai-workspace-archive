# AGENTES.md

## Visão Geral do Projeto

Este repositório contém "Agentes de IA para Iniciantes" - um curso educacional abrangente que ensina tudo o que é necessário para construir Agentes de IA. O curso consiste em 18 aulas (numeradas de 00 a 18) que cobrem fundamentos, padrões de design, frameworks, implantação em produção, agentes locais/no dispositivo e segurança dos agentes de IA.

**Tecnologias Chave:**
- Python 3.12+
- Jupyter Notebooks para aprendizado interativo
- Frameworks de IA: Microsoft Agent Framework (MAF)
- Serviços de IA do Azure: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Arquitetura:**
- Estrutura baseada em aulas (diretórios de 00-15+)
- Cada aula contém: documentação README, exemplos de código (notebooks Jupyter) e imagens
- Suporte multilíngue via sistema de tradução automatizada
- Um notebook Python por aula usando Microsoft Agent Framework

## Comandos de Configuração

### Pré-requisitos
- Python 3.12 ou superior
- Assinatura Azure (para Microsoft Foundry)
- Azure CLI instalado e autenticado (`az login`)

### Configuração Inicial

1. **Clone ou faça fork do repositório:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # OU
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Crie e ative um ambiente virtual Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Edite .env com suas chaves de API e endpoints
   ```

### Variáveis de Ambiente Necessárias

Para **Microsoft Foundry** (Obrigatório):
- `AZURE_AI_PROJECT_ENDPOINT` - endpoint do projeto Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - nome da implantação do modelo (ex.: gpt-4.1-mini)

Para **Azure AI Search** (Aula 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - endpoint do Azure AI Search
- `AZURE_SEARCH_API_KEY` - chave API do Azure AI Search

Autenticação: Execute `az login` antes de rodar os notebooks (usa `AzureCliCredential`).

## Fluxo de Desenvolvimento

### Executando Notebooks Jupyter

Cada aula contém múltiplos notebooks Jupyter para diferentes frameworks:

1. **Inicie o Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Navegue até o diretório da aula** (ex.: `01-intro-to-ai-agents/code_samples/`)

3. **Abra e execute os notebooks:**
   - `*-python-agent-framework.ipynb` - Usando Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Usando Microsoft Agent Framework (.NET)

### Trabalhando com Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Requer assinatura Azure
- Utiliza `FoundryChatClient` para Agent Service V2 (agentes visíveis no portal Foundry)
- Pronto para produção com observabilidade integrada
- Padrão de arquivo: `*-python-agent-framework.ipynb`

## Instruções de Teste

Este é um repositório educacional com código exemplo e não código de produção com testes automatizados. Para verificar sua configuração e mudanças:

### Testes Manuais

1. **Teste o ambiente Python:**
   ```bash
   python --version  # Deve ser 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Teste a execução do notebook:**
   ```bash
   # Converter notebook para script e executar (testa imports)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Verifique as variáveis de ambiente:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Executando Notebooks Individualmente

Abra os notebooks no Jupyter e execute as células sequencialmente. Cada notebook é autocontido e inclui:
- Declarações de importação
- Carregamento de configuração
- Exemplos de implementação de agentes
- Saídas esperadas em células markdown

### Teste Inicial dos Agentes Implantados

Para aulas onde um agente é implantado como agente hospedado Microsoft Foundry (01, 04, 05, 16), o repositório contém catálogos de teste leve em `tests/` que são executados pelo workflow `.github/workflows/smoke-test.yml` via a ação [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test). Esses testes são uma verificação leve pós-implantação (o agente está acessível e segue expectativas básicas de prompt?), complementando o pipeline de avaliação nas Aulas 10 e 16. Veja [tests/README.md](./tests/README.md) para o mapeamento catálogo-para-aula-para-agente. A Aula 17 roda localmente com Foundry Local e não tem endpoint hospedado, então é validada executando seu notebook diretamente.

## Estilo de Código

### Convenções Python

- **Versão do Python**: 3.12+
- **Estilo de Código**: Siga convenções padrão Python PEP 8
- **Notebooks**: Use células markdown claras para explicar conceitos
- **Imports**: Agrupe por biblioteca padrão, terceiros, locais

### Convenções para Jupyter Notebook

- Inclua células markdown descritivas antes das células de código
- Adicione exemplos de saída nos notebooks para referência
- Use nomes de variáveis claros que correspondam aos conceitos da aula
- Mantenha a execução do notebook em ordem linear (célula 1 → 2 → 3...)

### Organização de Arquivos

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Build e Implantação

### Construção da Documentação

Este repositório usa Markdown para documentação:
- Arquivos README.md em cada pasta de aula
- README.md principal na raiz do repositório
- Sistema de tradução automatizado via GitHub Actions

### Pipeline CI/CD

Localizado em `.github/workflows/`:

1. **co-op-translator.yml** - Tradução automática para mais de 50 idiomas
2. **welcome-issue.yml** - Dá boas-vindas a novos criadores de issues
3. **welcome-pr.yml** - Dá boas-vindas a novos colaboradores de pull request

### Implantação

Este é um repositório educacional - sem processo de implantação. Usuários:
1. Fazem fork ou clone do repositório
2. Executam os notebooks localmente ou em GitHub Codespaces
3. Aprendem modificando e experimentando os exemplos

## Diretrizes para Pull Request

### Antes de Submeter

1. **Teste suas mudanças:**
   - Execute completamente os notebooks afetados
   - Verifique se todas as células executam sem erros
   - Confirme que as saídas estão adequadas

2. **Atualizações na documentação:**
   - Atualize README.md se adicionar novos conceitos
   - Adicione comentários nos notebooks para códigos complexos
   - Assegure que células markdown explicam o propósito

3. **Alterações de arquivos:**
   - Evite comitar arquivos `.env` (use `.env.example`)
   - Não comite diretórios `venv/` ou `__pycache__/`
   - Mantenha saídas dos notebooks quando demonstrarem conceitos
   - Remova arquivos temporários e backups de notebooks (`*-backup.ipynb`)

### Formato do Título do PR

Use títulos descritivos:
- `[Lesson-XX] Adicionar novo exemplo para <conceito>`
- `[Fix] Corrigir erro de digitação no README da aula-XX`
- `[Update] Melhorar exemplo de código na aula-XX`
- `[Docs] Atualizar instruções de configuração`

### Verificações Obrigatórias

- Notebooks devem executar sem erros
- Arquivos README devem estar claros e precisos
- Siga os padrões de código existentes no repositório
- Mantenha consistência com outras aulas

## Notas Adicionais

### Problemas Comuns

1. **Incompatibilidade de versão do Python:**
   - Use Python 3.12+ garantidamente
   - Alguns pacotes podem não funcionar em versões anteriores
   - Use `python3 -m venv` para especificar a versão explicitamente

2. **Variáveis de ambiente:**
   - Sempre crie `.env` a partir de `.env.example`
   - Não comite arquivo `.env` (está no `.gitignore`)
   - Autentique-se com `az login` para autenticação Entra ID sem chaves

3. **Conflitos de pacotes:**
   - Use um ambiente virtual limpo
   - Instale do `requirements.txt` ao invés de pacotes isolados
   - Alguns notebooks podem requerer pacotes adicionais mencionados nas células markdown

4. **Serviços Azure:**
   - Serviços Azure AI requerem assinatura ativa
   - Algumas funcionalidades são específicas por região
   - Garanta que a implantação do modelo Azure OpenAI suporta a API de Respostas

### Caminho de Aprendizagem

Progressão recomendada pelas aulas:
1. **00-course-setup** - Inicie aqui para configurar o ambiente
2. **01-intro-to-ai-agents** - Entenda os fundamentos de agentes de IA
3. **02-explore-agentic-frameworks** - Aprenda sobre diferentes frameworks
4. **03-agentic-design-patterns** - Padrões de design principais
5. Continue sequencialmente pelas aulas numeradas

### Seleção de Framework

Escolha o framework baseado em seus objetivos:
- **Todas as aulas**: Microsoft Agent Framework (MAF) com `FoundryChatClient`
- **Agentes registram-se no servidor** no Microsoft Foundry Agent Service V2 e são visíveis no portal Foundry

### Obtendo Ajuda

- Participe do [Discord da Comunidade Microsoft Foundry](https://aka.ms/ai-agents/discord)
- Consulte os arquivos README das aulas para orientações específicas
- Veja o [README.md](./README.md) principal para visão geral do curso
- Consulte [Course Setup](./00-course-setup/README.md) para instruções detalhadas de configuração

### Contribuindo

Este é um projeto educacional aberto. Contribuições são bem-vindas:
- Melhore os exemplos de código
- Corrija erros de digitação ou erros técnicos
- Adicione comentários explicativos
- Sugira novos tópicos de aula
- Traduza para idiomas adicionais

Veja as [Issues do GitHub](https://github.com/microsoft/ai-agents-for-beginners/issues) para necessidades atuais.

## Contexto Específico do Projeto

### Suporte Multilíngue

Este repositório utiliza um sistema de tradução automatizado:
- Suporte a mais de 50 idiomas
- Traduções nas pastas `/translations/<lang-code>/`
- Workflow GitHub Actions gerencia as atualizações de tradução
- Arquivos fonte estão em inglês na raiz do repositório

### Estrutura da Aula

Cada aula segue um padrão consistente:
1. Miniatura de vídeo com link
2. Conteúdo escrito da aula (README.md)
3. Exemplos de código em múltiplos frameworks
4. Objetivos de aprendizagem e pré-requisitos
5. Recursos extras ligados para aprendizagem

### Nomeação dos Exemplos de Código

Formato: `<numero-da-aula>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Aula 1, MAF Python
- `14-sequential.ipynb` - Aula 14, padrões avançados MAF
- `16-python-agent-framework.ipynb` - Aula 16, agente de suporte ao cliente em produção
- `17-local-agent-foundry-local.ipynb` - Aula 17, agente local com Foundry Local + Qwen

### Diretórios Especiais

- `translated_images/` - Imagens localizadas para traduções
- `images/` - Imagens originais para conteúdo em inglês
- `.devcontainer/` - Configuração do container de desenvolvimento VS Code
- `.github/` - Workflows e templates do GitHub Actions

### Dependências

Pacotes chave do `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Suporte ao protocolo Agent-to-Agent
- `azure-ai-inference`, `azure-ai-projects` - Serviços Azure AI
- `azure-identity` - Autenticação Azure (AzureCliCredential)
- `azure-search-documents` - Integração Azure AI Search
- `mcp[cli]` - Suporte ao Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->