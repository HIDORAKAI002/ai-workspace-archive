# AGENTS.md

## Visão Geral do Projeto

Este repositório contém "Agentes de IA para Iniciantes" - um curso educacional abrangente que ensina tudo o que é necessário para construir Agentes de IA. O curso consiste em 18 lições (numeradas de 00 a 18) que cobrem fundamentos, padrões de design, frameworks, implementação em produção, agentes locais/no dispositivo e segurança dos agentes de IA.

**Tecnologias Principais:**
- Python 3.12+
- Jupyter Notebooks para aprendizagem interativa
- Frameworks de IA: Microsoft Agent Framework (MAF)
- Serviços Azure AI: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Arquitetura:**
- Estrutura baseada em lições (diretórios 00-15+)
- Cada lição contém: documentação README, exemplos de código (notebooks Jupyter) e imagens
- Suporte multilíngue via sistema automatizado de tradução
- Um notebook Python por lição usando Microsoft Agent Framework

## Comandos de Configuração

### Pré-requisitos
- Python 3.12 ou superior
- Subscrição Azure (para Microsoft Foundry)
- Azure CLI instalado e autenticado (`az login`)

### Configuração Inicial

1. **Clonar ou fazer fork do repositório:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # OU
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Criar e ativar ambiente virtual Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

3. **Instalar dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Edite o ficheiro .env com as suas chaves API e endpoints
   ```

### Variáveis de Ambiente Necessárias

Para **Microsoft Foundry** (Obrigatório):
- `AZURE_AI_PROJECT_ENDPOINT` - endpoint do projeto Microsoft Foundry
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - nome da implementação do modelo (ex: gpt-4.1-mini)

Para **Azure AI Search** (Lição 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - endpoint Azure AI Search
- `AZURE_SEARCH_API_KEY` - chave API Azure AI Search

Autenticação: Execute `az login` antes de correr os notebooks (usa `AzureCliCredential`).

## Processo de Desenvolvimento

### Executar Jupyter Notebooks

Cada lição contém vários notebooks Jupyter para diferentes frameworks:

1. **Inicie o Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Navegue para um diretório de lição** (ex: `01-intro-to-ai-agents/code_samples/`)

3. **Abra e execute os notebooks:**
   - `*-python-agent-framework.ipynb` - Usando Microsoft Agent Framework (Python)
   - `*-dotnet-agent-framework.ipynb` - Usando Microsoft Agent Framework (.NET)

### Trabalhar com Microsoft Agent Framework

**Microsoft Agent Framework + Microsoft Foundry:**
- Requer subscrição Azure
- Usa `FoundryChatClient` para Agent Service V2 (agentes visíveis no portal Foundry)
- Pronto para produção com observabilidade integrada
- Padrão de ficheiros: `*-python-agent-framework.ipynb`

## Instruções de Testes

Este é um repositório educacional com código de exemplo em vez de código de produção com testes automatizados. Para verificar o seu setup e alterações:

### Testes Manuais

1. **Teste o ambiente Python:**
   ```bash
   python --version  # Deve ser 3.12+
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Teste a execução do notebook:**
   ```bash
   # Converter o notebook para script e executar (importações de testes)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Verifique variáveis de ambiente:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Executar Notebooks Individualmente

Abra os notebooks no Jupyter e execute as células sequencialmente. Cada notebook é independente e inclui:
- Instruções de importação
- Carregamento de configuração
- Exemplos de implementação de agentes
- Saídas esperadas em células markdown

### Teste Rápido de Agentes Implementados

Para lições onde um agente é implementado como agente hospedado Microsoft Foundry (01, 04, 05, 16), o repositório inclui catálogos de teste rápido na pasta `tests/` executados pelo workflow `.github/workflows/smoke-test.yml` através da ação [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test). Estes são um controle leve pós-implementação (o agente está acessível e segue expectativas básicas do prompt?), complementando o pipeline de avaliação nas Licoes 10 e 16. Veja [tests/README.md](./tests/README.md) para o mapeamento catálogo-lição-agente. A Lição 17 executa localmente com Foundry Local e não tem endpoint hospedado, por isso é validada executando o seu notebook diretamente.

## Estilo de Código

### Convenções Python

- **Versão Python**: 3.12+
- **Estilo de Código**: Seguir as convenções padrão PEP 8 do Python
- **Notebooks**: Usar células markdown claras para explicar conceitos
- **Importações**: Agrupar por biblioteca padrão, terceiros, importações locais

### Convenções de Jupyter Notebook

- Incluir células markdown descritivas antes das células de código
- Adicionar exemplos de saída em notebooks para referência
- Usar nomes de variáveis claros que correspondam aos conceitos da lição
- Manter ordens lineares na execução dos notebooks (célula 1 → 2 → 3...)

### Organização de Ficheiros

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Construção e Implementação

### Construção da Documentação

Este repositório usa Markdown para documentação:
- Ficheiros README.md em cada pasta de lição
- README.md principal na raiz do repositório
- Sistema automatizado de tradução via GitHub Actions

### Pipeline CI/CD

Localizado em `.github/workflows/`:

1. **co-op-translator.yml** - Tradução automática para mais de 50 idiomas
2. **welcome-issue.yml** - Dá boas-vindas a quem cria issues
3. **welcome-pr.yml** - Dá boas-vindas a quem cria pull requests

### Deploy

Este é um repositório educativo - não há processo de deploy. Os utilizadores:
1. Fazem fork ou clonam o repositório
2. Executam os notebooks localmente ou no GitHub Codespaces
3. Aprendem modificando e experimentando os exemplos

## Diretrizes para Pull Requests

### Antes de Submeter

1. **Testar as suas alterações:**
   - Execute completamente os notebooks afetados
   - Verifique que todas as células executam sem erros
   - Confirme que as saídas são apropriadas

2. **Atualizações na documentação:**
   - Atualize README.md se adicionar novos conceitos
   - Adicione comentários nos notebooks para código complexo
   - Assegure-se que as células markdown explicam o propósito

3. **Alterações de ficheiros:**
   - Evite commitar ficheiros `.env` (use `.env.example`)
   - Não comite diretórios `venv/` ou `__pycache__/`
   - Mantenha as saídas dos notebooks quando demonstram conceitos
   - Remova ficheiros temporários e backups de notebooks (`*-backup.ipynb`)

### Formato do Título do PR

Use títulos descritivos:
- `[Lesson-XX] Adicionar novo exemplo para <conceito>`
- `[Fix] Corrigir erro tipográfico no README da lição XX`
- `[Update] Melhorar exemplo de código na lição XX`
- `[Docs] Atualizar instruções de configuração`

### Checks Necessários

- Notebooks devem executar sem erros
- Ficheiros README devem ser claros e precisos
- Seguir padrões de código existentes no repositório
- Manter consistência com outras lições

## Notas Adicionais

### Armadilhas Comuns

1. **Incompatibilidade da versão Python:**
   - Assegure que usa Python 3.12+
   - Alguns pacotes podem não funcionar com versões antigas
   - Use `python3 -m venv` para especificar explicitamente a versão Python

2. **Variáveis de ambiente:**
   - Crie sempre `.env` a partir de `.env.example`
   - Não comite o ficheiro `.env` (está incluído em `.gitignore`)
   - Faça login com `az login` para autenticação Entra ID sem chave

3. **Conflitos de pacotes:**
   - Use um ambiente virtual novo
   - Instale a partir de `requirements.txt` em vez de pacotes individuais
   - Alguns notebooks podem requerer pacotes adicionais mencionados nas suas células markdown

4. **Serviços Azure:**
   - Serviços Azure AI exigem subscrição ativa
   - Algumas funcionalidades são específicas por região
   - Assegure que a sua implementação do modelo Azure OpenAI suporta a API Responses

### Caminho de Aprendizagem

Progressão recomendada pelas lições:
1. **00-course-setup** - Comece aqui para configuração do ambiente
2. **01-intro-to-ai-agents** - Compreender fundamentos de agentes de IA
3. **02-explore-agentic-frameworks** - Aprender sobre diferentes frameworks
4. **03-agentic-design-patterns** - Padrões centrais de design
5. Continue sequencialmente pelas lições numeradas

### Seleção do Framework

Escolha framework baseado nos seus objetivos:
- **Todas as lições**: Microsoft Agent Framework (MAF) com `FoundryChatClient`
- **Agentes registam-se do lado servidor** no Microsoft Foundry Agent Service V2 e são visíveis no portal Foundry

### Obter Ajuda

- Junte-se ao [Microsoft Foundry Community Discord](https://aka.ms/ai-agents/discord)
- Consulte os ficheiros README das lições para orientações específicas
- Consulte o [README.md](./README.md) principal para visão geral do curso
- Consulte [Course Setup](./00-course-setup/README.md) para instruções detalhadas de configuração

### Contribuir

Este é um projeto educacional aberto. Contribuições são bem-vindas:
- Melhorar os exemplos de código
- Corrigir erros tipográficos ou erros
- Adicionar comentários explicativos
- Sugerir novos tópicos para lições
- Traduzir para idiomas adicionais

Veja [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) para necessidades atuais.

## Contexto Específico do Projeto

### Suporte Multilíngue

Este repositório usa um sistema automatizado de tradução:
- Suporta mais de 50 idiomas
- Traduções em diretórios `/translations/<lang-code>/`
- Workflow GitHub Actions atualiza traduções
- Ficheiros fonte estão em inglês na raiz do repositório

### Estrutura da Lição

Cada lição segue um padrão consistente:
1. Miniatura de vídeo com link
2. Conteúdo escrito da lição (README.md)
3. Exemplos de código em múltiplos frameworks
4. Objetivos de aprendizagem e pré-requisitos
5. Recursos extras de aprendizagem ligados

### Nomeação dos Exemplos de Código

Formato: `<número-da-lição>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Lição 1, MAF Python
- `14-sequential.ipynb` - Lição 14, padrões avançados MAF
- `16-python-agent-framework.ipynb` - Lição 16, agente de suporte ao cliente em produção
- `17-local-agent-foundry-local.ipynb` - Lição 17, agente local com Foundry Local + Qwen

### Diretórios Especiais

- `translated_images/` - Imagens localizadas para traduções
- `images/` - Imagens originais para conteúdo em inglês
- `.devcontainer/` - Configuração de container de desenvolvimento VS Code
- `.github/` - Workflows e templates GitHub Actions

### Dependências

Pacotes principais do `requirements.txt`:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Suporte ao protocolo Agent-to-Agent
- `azure-ai-inference`, `azure-ai-projects` - Serviços Azure AI
- `azure-identity` - Autenticação Azure (AzureCliCredential)
- `azure-search-documents` - Integração Azure AI Search
- `mcp[cli]` - Suporte ao Model Context Protocol

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->