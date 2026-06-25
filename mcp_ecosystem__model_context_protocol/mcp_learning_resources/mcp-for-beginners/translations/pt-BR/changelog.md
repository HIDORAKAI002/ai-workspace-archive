# Changelog: Currículo MCP para Iniciantes

Este documento serve como um registro de todas as alterações significativas feitas no currículo Model Context Protocol (MCP) para Iniciantes. As mudanças estão documentadas em ordem cronológica reversa (mudanças mais recentes primeiro).

## 24 de junho de 2026

### Nova Aula: Usando MCP no app Copilot

- [Seção Ferramentas](./12-tooling/README.md) Adicionada seção de ferramentas.
- [MCP no app Copilot](./12-tooling/01-copilot-app/README.md)

## 16 de junho de 2026

### Alinhamento da Especificação MCP & Validação de Exemplos

Validado o currículo contra a atual **Especificação MCP 2025-11-25** e os SDKs oficiais mais recentes, então corrigidas as referências de especificação defasadas restantes e confirmado que os exemplos principais ainda compilam e executam.

#### Correções da Versão da Especificação (2025-06-18 / 2025-03-26 → 2025-11-25)

Atualizado conteúdo em inglês onde ainda afirmava que uma revisão antiga da especificação era o padrão *atual/mais recente*, e redirecionados os links para os caminhos canônicos da especificação `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Atualizados o banner "Padrão Atual", introdução, título dos princípios centrais de segurança, título dos requisitos obrigatórios, seção Microsoft Entra ID, links de Referências & Recursos, e o aviso final de segurança (8 referências) para 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Atualizado o link da Especificação em Recursos Adicionais e o banner "Padrão Atual" para 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Substituído o link de segurança e confiança desatualizado `2025-03-26` pela atual página de melhores práticas de segurança 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Atualizado o link da documentação oficial de amostragem para 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Atualizada a referência no presente tempo "especificação MCP atual" e o link da Especificação em Recursos Adicionais para 2025-11-25 (notas históricas de descontinuação SSE mantidas para precisão)

#### Validação dos Exemplos contra SDKs Atuais

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolveu `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passou sem erros de tipo — as APIs existentes `McpServer`/`StdioServerTransport` permanecem válidas
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validado em `.venv` isolado com `mcp[cli]` (1.27.2); `py_compile` passou e `FastMCP.list_tools()` corretamente retornou as ferramentas `add` e `subtract`
- Confirmado que todas as faixas de versão do exemplo `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) resolvem limpas para a atual `1.29.0` sem mudanças quebrando API

#### Alinhamento dos Pins de Dependências (fechando lacunas de versão)

Atualizados pins do SDK desatualizados para que todos os exemplos acompanhem o lançamento atual do MCP, seguindo a convenção do repositório:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Atualizado `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` e atualizado a descrição do pacote obsoleta `"updated for MCP 2025-06-18"` para `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** e **lab4/code/github_mcp_server/pyproject.toml**: Atualizado o pin exato `mcp==1.23.0` → `mcp>=1.26.0`; regenerados ambos os arquivos `uv.lock` (`uv lock`) para que os lockfiles resolvam para a versão atual `mcp 1.27.2` e permaneçam sincronizados com os manifests

#### Análise de Lacunas do Currículo — Cobertura das Funcionalidades da Especificação Mais Recente

Verificado que o currículo já cobre todos os primitivas introduzidas/expandidas no MCP 2025-11-25, portanto nenhuma lacuna de conteúdo permanece:
- **Amostragem**: Aula 03-GettingStarted/14-sampling mais 05-AdvancedTopics/mcp-sampling
- **Elicitação (incluindo modo URL)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Raízes**: Documentado em 00-Introduction, 01-CoreConcepts, e 05-AdvancedTopics/mcp-root-contexts
- **Tarefas (experimentais, operações de longa duração)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Anotações de Ferramentas** (`readOnlyHint` / `destructiveHint`): Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features

### Reforço de Segurança & Remediação de Vulnerabilidades em Dependências

Executado uma auditoria completa de segurança em todos os manifests de dependência e código fonte dos exemplos, então remediados todos os avisos npm reportados e uma descoberta em nível de código. Após remediação, `npm audit` reporta **0 vulnerabilidades** em todos os diretórios auditados.

#### Vulnerabilidades em Dependências npm (transitivas) — Corrigidas

Auditados todos os 15 arquivos `package-lock.json` commitados. As vulnerabilidades eram limitadas a dependências transitivas puxadas pela ferramenta dev MCP Inspector, cliente OpenAI, e SDK MCP; todas agora resolvidas sem quebrar os exemplos:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** e **lab3/code/weather_mcp/inspector**: Atualizado `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), eliminando os avisos empacotados de `ajv`, `brace-expansion`, `diff`, `path-to-regexp` e `ws`. Adicionada entrada npm `overrides` forçando patch `shell-quote@1.8.4` para eliminar o aviso crítico remanescente carregado por `concurrently`; regenerados ambos os lockfiles (agora 0 vulnerabilidades)
- **03-GettingStarted/samples/typescript**: `npm audit fix` atualizou o transitivo `qs` (moderado) para uma release patch
- **03-GettingStarted/samples/javascript**: `npm audit fix` atualizou o transitivo `hono` (moderado) para uma release patch
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` atualizou o transitivo `form-data` (alto) para uma release patch
- **03-GettingStarted/11-simple-auth/solution/typescript**: Gerado o arquivo `package-lock.json` faltante para que o projeto seja reproduzível e auditável (0 vulnerabilidades)

#### Correção de Segurança em Código (OWASP A03: Injeção)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Removido `shell=True` da ferramenta `open_in_vscode`. O antigo `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitia que metacaracteres shell em caminhos de pastas fossem interpretados pelo `cmd.exe` (vetor de injeção de comando). Agora ele executa diretamente o `Code.exe` resolvido com a pasta como argumento — sem shell — funcionalmente equivalente e seguro.

#### Auditoria de Dependências Python

- Auditados todos os conjuntos de requisitos Python com `pip-audit`. `05-AdvancedTopics` e `03-GettingStarted/samples/python` reportaram **nenhuma vulnerabilidade conhecida** (suas faixas `mcp` / `httpx` / `pydantic` / `python-dotenv` resolvem para releases patch atuais)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` sinalizou dependência transitiva **`werkzeug` 3.1.1** com três avisos DoS device-name Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, e `CVE-2026-27199` (todos corrigidos na 3.1.6). Adicionado pin explícito de segurança `werkzeug>=3.1.6` para resolver a release patch; verificado que a restrição resolve limpo com o stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding do Nome do Produto

Atualizado todo o conteúdo do currículo para refletir o rebranding de produto da Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Atualizado link da comunidade Discord
- **AGENTS.md**: Atualizado referência ao servidor Discord
- **README.md**: Atualizadas referências ao ecossistema tecnológico
- **study_guide.md**: Atualizadas referências de estudo de caso
- **05-AdvancedTopics/README.md**: Atualizados título e descrição do Módulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Atualizada seção de cabeçalho e descrição
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Atualizado título e conteúdo completo do módulo
- **05-AdvancedTopics/mcp-security-entra/README.md**: Atualizado link de referência cruzada
- **07-LessonsfromEarlyAdoption/README.md**: Atualizadas referências de estudo de caso
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Atualizado cabeçalho da Seção 9, badges e capacidades
- **08-BestPractices/README.md**: Atualizado link da comunidade Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Atualizada referência do canal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Atualizada referência de implantação de modelo
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Atualizado a tabela de Serviços de IA
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Atualizadas referências de recursos

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Atualizadas referências principais do currículo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Atualizado título do módulo, visão geral e todos os cabeçalhos do módulo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Atualizados título, objetivos de aprendizado, instruções de configuração e recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Atualizados título, objetivos de aprendizado, tabela de hosts MCP e referências cruzadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Atualizados título, badges, pré-requisitos e recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Atualizadas referências do Agent Builder e link de feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Atualizados pré-requisitos e referências da extensão

---

## 11 de abril de 2026

### Nova Aula, Correções na Documentação e Atualizações de Dependência

#### Novo Conteúdo do Currículo Adicionado

**Módulo 05 - Tópicos Avançados**
- **Aula 5.17: Raciocínio Multi-Agente Adversarial com MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Novo guia completo cobrindo o padrão de debate adversarial para sistemas multi-agentes
  - Diagrama de arquitetura Mermaid: dois agentes → servidor MCP compartilhado → transcrição do debate → juiz → veredicto
  - Servidor de ferramentas MCP compartilhado (`web_search` + `run_python`) implementado em Python e TypeScript
  - Prompts de sistema opostos (A FAVOR / CONTRA / Juiz) com requisitos explícitos de uso de ferramentas
  - Orquestrador de debate em Python, TypeScript, e C# gerenciando rodadas e roteando argumentos
  - Cabeamento MCP `ClientSession` para o orquestrador para chamadas reais de ferramentas
  - Tabela de casos de uso (detecção de alucinações, modelagem de ameaças, revisão de design de API, verificação factual, seleção de tecnologia)
  - Considerações de segurança: execução em sandbox, validação de chamadas de ferramentas, limitação de taxa, registro de auditoria
  - Exercício estruturado com três cenários práticos (revisão de código, decisão arquitetural, moderação de conteúdo)

#### Correções na Documentação

**Módulo 03 - Primeiros Passos**
- **05-stdio-server/README.md**: Corrigido exemplo incompleto do servidor stdio TypeScript — adicionado transporte faltante (`new StdioServerTransport()`) e chamada `server.connect(transport)` para igualar aos exemplos Python e .NET na mesma seção
- **14-sampling/README.md**: Corrigido erro tipográfico — corrigido `"Sampling is an davanced features"` para `"Sampling is an advanced feature"`

#### Atualizações do Currículo

**README.md Principal**
- Adicionada entrada 5.17 (Raciocínio Multi-Agente Adversarial com MCP) na tabela do currículo com link direto para a nova aula

**05-AdvancedTopics/README.md**
- Adicionada linha da Aula 5.17 na tabela de aulas

**study_guide.md**
- Adicionado tópico Raciocínio Multi-Agente Adversarial ao mapa mental e à descrição em prosa de Tópicos Avançados

#### Correções de Código e Segurança

**Módulo 05 - Agentes Adversariais (`mcp-adversarial-agents`)**
- **Correção de segurança — injeção de comando**: Substituído o interpolação de shell `execSync` por `execFile` + `promisify` na ferramenta TypeScript `run_python`, eliminando a superfície de injeção de comando (código controlado por LLM agora é passado como um elemento literal argv sem envolvimento do shell)
- **Cabeamento do loop da ferramenta MCP**: Atualizado o orquestrador de debate Python para usar o cliente `AsyncAnthropic` (substituindo o `Anthropic` síncrono bloqueante), passar uma `ClientSession` ativa diretamente para cada turno do agente, buscar definições de ferramentas via `session.list_tools()` a cada turno, e despachar blocos `tool_use` via `session.call_tool()` em um loop até o modelo emitir uma resposta final em texto

#### Atualizações de Dependências

- Atualizado `hono` para 4.12.12 em vários pacotes (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Atualizado `@hono/node-server` de 1.19.11 para 1.19.13 nos pacotes TypeScript
- Atualizado `cryptography` de 46.0.5 para 46.0.7 nos pacotes Python (laboratórios 3 e 4 do 10-StreamliningAIWorkflows)
- Atualizado `lodash` de 4.17.23 para 4.18.1 no inspetor do 10-StreamliningAIWorkflows

#### Traduções

- Sincronizado traduções para mais de 48 idiomas com as últimas alterações na fonte (atualização i18n)

---

## 5 de fevereiro de 2026

### Melhorias na Validação e Navegação de Repositório

#### Novo Conteúdo do Currículo Adicionado

**Módulo 03 - Introdução**
- **12-mcp-hosts/README.md**: Novo guia abrangente para configuração dos hosts MCP
  - Exemplos de configuração para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelos de configuração JSON para todos os principais hosts
  - Tabela comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Solução de problemas comuns de conexão
  - Melhores práticas de segurança para configuração de hosts

- **13-mcp-inspector/README.md**: Novo guia de depuração para o MCP Inspector
  - Métodos de instalação (npx, npm global, a partir do código fonte)
  - Conexão a servidores via stdio e HTTP/SSE
  - Ferramentas de teste, recursos e fluxos de trabalho de prompts
  - Integração do VS Code com MCP Inspector
  - Cenários comuns de depuração com soluções

**Módulo 04 - Implementação Prática**
- **pagination/README.md**: Novo guia de implementação de paginação
  - Padrões de paginação baseados em cursor em Python, TypeScript, Java
  - Manipulação de paginação no cliente
  - Estratégias de design de cursor (opaco vs. estruturado)
  - Recomendações para otimização de desempenho

**Módulo 05 - Tópicos Avançados**
- **mcp-protocol-features/README.md**: Novo aprofundamento sobre recursos do protocolo
  - Implementação de notificações de progresso
  - Padrões de cancelamento de requisição
  - Modelos de recursos com padrões URI
  - Gerenciamento de ciclo de vida do servidor
  - Controle de nível de logs
  - Padrões de tratamento de erros com códigos JSON-RPC

#### Correções de Navegação (mais de 24 arquivos atualizados)

**READMEs dos Módulos Principais**
 Agora com links tanto para a primeira aula QUANTO para o próximo módulo

**Arquivos Secundários do 02-Security**
- Todos os 5 documentos suplementares de segurança agora têm navegação "O que vem a seguir":

**Arquivos do 09-CaseStudy**
- Todos os arquivos de estudo de caso agora têm navegação sequencial:

**Laboratórios 10-StreamliningAI**
Adicionado seção “O que vem a seguir” na visão geral do Módulo 10 e no Módulo 11

#### Correções de Código e Conteúdo

**Atualizações de SDK e Dependências**
Corrigida versão vazia do openai para `^4.95.0`
Atualizado SDK de `^1.8.0` para `>=1.26.0`
Atualizados pins da versão mcp para `>=1.26.0`

**Correções de Código**
Corrigido modelo inválido `gpt-4o-mini` para `gpt-4.1-mini`

**Correções de Conteúdo**
Corrigido link quebrado `READMEmd` → `README.md`, corrigido cabeçalho do currículo `Module 1-3` → `Module 0-3`, corrigido caminho sensível a maiúsculas/minúsculas
Removido conteúdo duplicado e corrompido do Estudo de Caso 5

**Melhorias na Orientação para Iniciantes**
Adicionada introdução adequada, objetivos de aprendizagem e pré-requisitos para iniciantes

#### Atualizações do Currículo

**README.md Principal**
- Adicionadas entradas 3.12 (Hosts MCP), 3.13 (Inspetor MCP), 4.1 (Paginação), 5.16 (Recursos do Protocolo) na tabela do currículo

**READMEs dos Módulos**
Adicionadas aulas 12 e 13 à lista de aulas
Adicionada seção Guias Práticos com link para paginação
Adicionadas aulas 5.15 (Transporte Customizado) e 5.16 (Recursos do Protocolo)

**study_guide.md**
- Atualizado o mapa mental com todos os novos tópicos: Configuração de Hosts MCP, Inspetor MCP, Estratégias de Paginação, Aprofundamento em Recursos do Protocolo

## 28 de janeiro de 2026

### Revisão de Conformidade da Especificação MCP 2025-11-25

#### Aprimoramento de Conceitos Básicos (01-CoreConcepts/)
- **Novo Primitivo Cliente - Roots**: Adicionada documentação abrangente sobre o primitivo cliente Roots, que permite aos servidores entender limites de sistema de arquivos e permissões de acesso
- **Anotações de Ferramentas**: Adicionada documentação sobre anotações comportamentais de ferramentas (`readOnlyHint`, `destructiveHint`) para melhores decisões na execução de ferramentas
- **Chamada de Ferramentas em Amostragem**: Atualizada documentação de Sampling para incluir parâmetros `tools` e `toolChoice` para invocação de ferramentas orientada por modelo durante requisições de amostragem
- **Elicitação no Modo URL**: Adicionada documentação sobre elicitação baseada em URL para interações externas com a web iniciadas pelo servidor
- **Tarefas (Experimental)**: Adicionada nova seção documentando o recurso experimental Tasks para invólucros de execução duráveis e recuperação adiada de resultados
- **Suporte a Ícones**: Observado que ferramentas, recursos, modelos de recursos e prompts agora podem incluir ícones como metadados adicionais

#### Atualizações de Documentação
- **README.md**: Adicionada referência à versão da Especificação MCP 2025-11-25 e explicação de versionamento baseado em data
- **study_guide.md**: Atualizado mapa curricular para incluir Tarefas e Anotações de Ferramentas na seção de Conceitos Básicos; atualizado carimbo de data do documento

#### Verificação de Conformidade da Especificação
- **Versão do Protocolo**: Verificada toda documentação faz referência à atual Especificação MCP 2025-11-25
- **Alinhamento Arquitetural**: Confirmada precisão da documentação sobre arquitetura em duas camadas (Camada de Dados + Camada de Transporte)
- **Documentação de Primitivos**: Validada documentação dos primitivos servidores (Recursos, Prompts, Ferramentas) e primitivos clientes (Sampling, Elicitação, Logging, Roots)
- **Mecanismos de Transporte**: Verificada precisão da documentação de transporte STDIO e HTTP Streaming
- **Orientação de Segurança**: Confirmado alinhamento com a documentação atual das Melhores Práticas de Segurança MCP

#### Principais Recursos MCP 2025-11-25 Documentados
- **Descoberta OpenID Connect**: Descoberta de servidor de autenticação via OIDC
- **Documentos de Metadados Client ID OAuth**: Mecanismo recomendado para registro de clientes
- **JSON Schema 2020-12**: Dialeto padrão para definições esquemáticas MCP
- **Sistema de Camadas SDK**: Requisitos formalizados para suporte e manutenção de recursos SDK
- **Estrutura de Governança**: Grupos de Trabalho e Grupos de Interesse formalizados na governança MCP

### Grande Atualização na Documentação de Segurança (02-Security/)

#### Integração com Workshop MCP Security Summit (Sherpa)
- **Novo Recurso de Treinamento Prático**: Adicionada integração abrangente com o [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) ao longo de toda documentação de segurança
- **Cobertura da Rota da Expedição**: Documentado o progresso completo acampamento a acampamento, do Acampamento Base ao Cume
- **Alinhamento OWASP**: Toda orientação de segurança agora mapeada para riscos do OWASP MCP Azure Security Guide

#### Integração OWASP MCP Top 10
- **Nova Seção**: Adicionada tabela de Riscos de Segurança OWASP MCP Top 10 com mitigações Azure ao README principal de Segurança
- **Documentação Baseada em Risco**: Atualizado mcp-security-controls-2025.md com referências OWASP MCP para cada domínio de segurança
- **Arquitetura de Referência**: Vinculado à arquitetura de referência OWASP MCP Azure Security Guide e padrões de implementação

#### Arquivos de Segurança Atualizados
- **README.md**: Adicionado resumo do Workshop Sherpa, tabela da rota da expedição, resumo dos riscos OWASP MCP Top 10 e seção de treinamento prático
- **mcp-security-controls-2025.md**: Atualizado cabeçalho para fevereiro de 2026, adicionadas referências a riscos OWASP (MCP01-MCP08), corrigida inconsistência na versão da especificação
- **mcp-security-best-practices-2025.md**: Adicionada seção de recursos Sherpa e OWASP, atualizado carimbo de data
- **mcp-best-practices.md**: Adicionada seção de treinamento prático com links Sherpa e OWASP
- **azure-content-safety-implementation.md**: Adicionada referência OWASP MCP06, alinhamento com Acampamento 3 Sherpa e seção adicional de recursos

#### Novos Links de Recursos Adicionados
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuais de riscos OWASP MCP (MCP01-MCP10)

### Alinhamento do Currículo com a Especificação MCP 2025-11-25

#### Módulo 03 - Introdução
- **Documentação SDK**: Adicionado Go SDK à lista oficial de SDKs; atualizadas todas referências a SDK para alinhamento com a Especificação MCP 2025-11-25
- **Clarificação sobre Transporte**: Atualizadas descrições de transporte STDIO e HTTP Streaming com referências explícitas à especificação

#### Módulo 04 - Implementação Prática
- **Atualizações de SDK**: Adicionado Go SDK; atualizada lista de SDKs com referência à versão da especificação
- **Especificação de Autorização**: Atualizado link da especificação MCP Autorização para versão atual 2025-11-25

#### Módulo 05 - Tópicos Avançados
- **Novos Recursos**: Adicionada nota sobre novos recursos da Especificação MCP 2025-11-25 (Tarefas, Anotações de Ferramentas, Elicitação no Modo URL, Roots)
- **Recursos de Segurança**: Adicionados links para OWASP MCP Top 10 e workshop Sherpa nas referências adicionais

#### Módulo 06 - Contribuições da Comunidade
- **Lista de SDKs**: Adicionados SDKs Swift e Rust; atualizado link da especificação para 2025-11-25
- **Referência da Especificação**: Atualizado link para URL direto da Especificação MCP

#### Módulo 07 - Lições da Adoção Inicial
- **Atualizações de Recursos**: Adicionados link para Especificação MCP 2025-11-25 e OWASP MCP Top 10 nas referências adicionais

#### Módulo 08 - Melhores Práticas
- **Versão da Especificação**: Atualizada referência da Especificação MCP para 2025-11-25
- **Recursos de Segurança**: Adicionados OWASP MCP Top 10 e workshop Sherpa às referências adicionais

#### Módulo 10 - Streamlining AI Workflows
- **Atualização do Badge**: Badge da versão MCP alterado de versão do SDK (1.9.3) para versão da especificação (2025-11-25)
- **Links de Recursos**: Atualizado link da Especificação MCP; adicionado OWASP MCP Top 10

#### Módulo 11 - Laboratórios Práticos MCP Server
- **Referência da Especificação**: Atualizado link da Especificação MCP para versão 2025-11-25
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 como recurso oficial

## 18 de dezembro de 2025

### Atualização da Documentação de Segurança - Especificação MCP 2025-11-25

#### Melhores Práticas de Segurança MCP (02-Security/mcp-best-practices.md) - Atualização da Versão da Especificação
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a mais recente Especificação MCP 2025-11-25 (lançada em 25 de novembro de 2025)
  - Atualizadas todas as referências da versão da especificação de 2025-06-18 para 2025-11-25
  - Atualizadas referências de data do documento de 18 de agosto de 2025 para 18 de dezembro de 2025
  - Verificado que todas URLs da especificação apontam para a documentação atual
- **Validação de Conteúdo**: Validação abrangente das melhores práticas de segurança frente aos padrões mais recentes
  - **Soluções Microsoft de Segurança**: Verificados termos e links atuais para Prompt Shields (anteriormente "detecção de risco de jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Segurança OAuth 2.1**: Confirmado alinhamento com as melhores práticas mais recentes de segurança OAuth
  - **Padrões OWASP**: Validado que as referências ao OWASP Top 10 para LLMs permanecem atuais
  - **Serviços Azure**: Verificados todos os links para documentação Microsoft Azure e melhores práticas
- **Alinhamento de Padrões**: Todos padrões de segurança referenciados confirmados como atuais
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Melhores práticas de segurança OAuth 2.1
  - Frameworks de segurança e conformidade Azure
- **Recursos de Implementação**: Verificados todos links de guias de implementação e recursos
  - Padrões de autenticação Azure API Management
  - Guias de integração Microsoft Entra ID
  - Gerenciamento de segredos Azure Key Vault
  - Pipelines e soluções de monitoramento DevSecOps

### Garantia de Qualidade da Documentação
- **Conformidade com a Especificação**: Garantido que todos requisitos obrigatórios de segurança MCP (DEVE/ NÃO DEVE) alinham-se com a especificação mais recente
- **Atualização de Recursos**: Verificados todos links externos para documentação Microsoft, padrões de segurança e guias de implementação
- **Cobertura das Melhores Práticas**: Confirmada cobertura abrangente de autenticação, autorização, ameaças específicas de IA, segurança da cadeia de suprimentos e padrões corporativos

## 6 de outubro de 2025

### Expansão da Seção Introdução – Uso Avançado de Servidor e Autenticação Simples

#### Uso Avançado de Servidor (03-GettingStarted/10-advanced)
- **Novo Capítulo Adicionado**: Introduzido guia abrangente para uso avançado do servidor MCP, cobrindo tanto arquiteturas regulares quanto em baixo nível de servidor.
  - **Servidor Regular vs. de Baixo Nível**: Comparação detalhada e exemplos de código em Python e TypeScript para ambas as abordagens.
  - **Design Baseado em Handlers**: Explicação sobre gerenciamento de ferramentas/recursos/prompt baseado em handlers para implementações de servidores escaláveis e flexíveis.
  - **Padrões Práticos**: Cenários do mundo real onde padrões de servidores de baixo nível são benéficos para recursos avançados e arquitetura.

#### Autenticação Simples (03-GettingStarted/11-simple-auth)
- **Novo Capítulo Adicionado**: Guia passo a passo para implementação de autenticação simples em servidores MCP.
  - **Conceitos de Auth**: Explicação clara de autenticação vs. autorização, e manuseio de credenciais.
  - **Implementação Básica de Auth**: Padrões de autenticação baseados em middleware em Python (Starlette) e TypeScript (Express), com exemplos de código.
  - **Progressão para Segurança Avançada**: Orientação para começar com autenticação simples e avançar para OAuth 2.1 e RBAC, com referências a módulos avançados de segurança.

Essas adições fornecem orientação prática e prática para construir implementações de servidores MCP mais robustas, seguras e flexíveis, conectando conceitos fundamentais com padrões avançados de produção.

## 29 de setembro de 2025

### Laboratórios de Integração de Banco de Dados para MCP Server - Caminho Completo de Aprendizagem Prática

#### 11-MCPServerHandsOnLabs - Novo Currículo Completo de Integração de Banco de Dados
- **Caminho de Aprendizagem Completo com 13 Laboratórios**: Incluído currículo prático abrangente para construção de servidores MCP prontos para produção com integração de banco de dados PostgreSQL
  - **Implementação do Mundo Real**: Caso de uso de analytics da Zava Retail demonstrando padrões de nível empresarial
  - **Progressão de Aprendizagem Estruturada**:
    - **Laboratórios 00-03: Fundamentos** - Introdução, Arquitetura Central, Segurança & Multi-Tenancy, Configuração do Ambiente
    - **Laboratórios 04-06: Construção do MCP Server** - Design & Schema do Banco de Dados, Implementação do MCP Server, Desenvolvimento de Ferramentas  
    - **Laboratórios 07-09: Recursos Avançados** - Integração de Pesquisa Semântica, Testes & Depuração, Integração com VS Code
    - **Laboratórios 10-12: Produção & Melhores Práticas** - Estratégias de Implantação, Monitoramento & Observabilidade, Melhores Práticas & Otimização
  - **Tecnologias Corporativas**: Framework FastMCP, PostgreSQL com pgvector, embeddings da Azure OpenAI, Azure Container Apps, Application Insights
  - **Recursos Avançados**: Segurança a nível de linha (RLS), pesquisa semântica, acesso multi-inquilino a dados, embeddings vetoriais, monitoramento em tempo real

#### Padronização de Terminologia - Conversão de Módulo para Laboratório
- **Atualização Abrangente da Documentação**: Atualizados sistematicamente todos os arquivos README em 11-MCPServerHandsOnLabs para usar a terminologia "Laboratório" em vez de "Módulo"
  - **Cabeçalhos de Seção**: Alterado "O que Este Módulo Cobre" para "O que Este Laboratório Cobre" em todos os 13 laboratórios
  - **Descrição de Conteúdo**: Modificado "Este módulo fornece..." para "Este laboratório fornece..." ao longo da documentação
  - **Objetivos de Aprendizagem**: Atualizado "Ao final deste módulo..." para "Ao final deste laboratório..." 
  - **Links de Navegação**: Convertidas todas as referências "Módulo XX:" para "Laboratório XX:" em cross-references e navegação
  - **Rastreamento de Conclusão**: Atualizado "Após completar este módulo..." para "Após completar este laboratório..."
  - **Referências Técnicas Preservadas**: Mantidas referências de módulos Python em arquivos de configuração (ex.: `"module": "mcp_server.main"`)

#### Melhoria do Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Adicionada nova seção "11. Laboratórios de Integração de Banco de Dados" com visualização abrangente da estrutura dos laboratórios
- **Estrutura do Repositório**: Atualizada de dez para onze seções principais com descrição detalhada do 11-MCPServerHandsOnLabs
- **Orientação do Caminho de Aprendizagem**: Instruções de navegação aperfeiçoadas para cobrir seções 00-11
- **Cobertura Tecnológica**: Adicionados detalhes sobre FastMCP, PostgreSQL e integração dos serviços Azure
- **Resultados do Aprendizado**: Ênfase no desenvolvimento de servidores prontos para produção, padrões de integração de banco de dados e segurança empresarial

#### Aprimoramento da Estrutura do README Principal
- **Terminologia Baseada em Laboratórios**: Atualizado README.md principal do 11-MCPServerHandsOnLabs para uso consistente da estrutura "Laboratório"
- **Organização do Caminho de Aprendizagem**: Progressão clara de conceitos fundamentais à implementação avançada até implantação em produção
- **Foco no Mundo Real**: Ênfase no aprendizado prático com padrões e tecnologias corporativas

### Melhorias de Qualidade e Consistência da Documentação
- **Ênfase no Aprendizado Prático**: Reforçado abordagem prática baseada em laboratórios em toda a documentação
- **Foco em Padrões Empresariais**: Destaque para implementações prontas para produção e considerações de segurança corporativa
- **Integração Tecnológica**: Cobertura completa dos serviços modernos Azure e padrões de integração com IA
- **Progressão de Aprendizagem**: Caminho claro e estruturado desde conceitos básicos até implantação em produção

## 26 de setembro de 2025

### Aprimoramento dos Estudos de Caso - Integração do Registro MCP do GitHub

#### Estudos de Caso (09-CaseStudy/) - Foco no Desenvolvimento do Ecossistema
- **README.md**: Ampliação significativa com estudo de caso abrangente do Registro MCP do GitHub
  - **Estudo de Caso do Registro MCP do GitHub**: Novo estudo aprofundado examinando o lançamento do Registro MCP do GitHub em setembro de 2025
    - **Análise do Problema**: Exame detalhado dos desafios fragmentados de descoberta e implantação de servidores MCP
    - **Arquitetura da Solução**: Abordagem de registro centralizado do GitHub com instalação com um clique no VS Code
    - **Impacto Comercial**: Melhorias mensuráveis na integração e produtividade de desenvolvedores
    - **Valor Estratégico**: Foco em implantação modular de agentes e interoperabilidade entre ferramentas
    - **Desenvolvimento do Ecossistema**: Posicionamento como plataforma fundamental para integração agentiva
  - **Estrutura Aprimorada dos Estudos de Caso**: Atualização nos sete estudos de caso com formatação consistente e descrições abrangentes
    - Azure AI Travel Agents: Ênfase em orquestração multi-agente
    - Integração Azure DevOps: Foco em automação de fluxo de trabalho
    - Recuperação de Documentação em Tempo Real: Implementação de cliente console Python
    - Gerador Interativo de Plano de Estudo: Web app conversacional Chainlit
    - Documentação In-Editor: Integração VS Code e GitHub Copilot
    - Gerenciamento de API Azure: Padrões corporativos de integração de API
    - Registro MCP GitHub: Desenvolvimento do ecossistema e plataforma comunitária
  - **Conclusão Abrangente**: Reescrita da seção final salientando sete estudos de caso com múltiplas dimensões de implementação MCP
    - Integração Empresarial, Orquestração Multi-Agente, Produtividade de Desenvolvedores
    - Desenvolvimento de Ecossistema, Classificação de Aplicações Educacionais
    - Insight aprimorado em padrões arquiteturais, estratégias de implementação e melhores práticas
    - Ênfase no MCP como protocolo maduro e pronto para produção

#### Atualizações do Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Atualizado mindmap para incluir o Registro MCP do GitHub na seção Estudos de Caso
- **Descrição dos Estudos de Caso**: Melhorado de descrições genéricas para detalhamento dos sete estudos de caso abrangentes
- **Estrutura do Repositório**: Atualizada seção 10 para refletir cobertura detalhada dos estudos de caso com detalhes específicos de implementação
- **Integração do Changelog**: Adicionado registro de 26 de setembro de 2025 documentando a adição do Registro MCP GitHub e aprimoramentos nos estudos de caso
- **Atualização de Datas**: Atualizado timestamp do rodapé para refletir a última revisão (26 de setembro de 2025)

### Melhorias na Qualidade da Documentação
- **Aprimoramento de Consistência**: Formatação e estrutura padronizadas para todos os sete exemplos de estudos de caso
- **Cobertura Abrangente**: Estudos de caso abrangem cenários empresariais, produtividade de desenvolvedores e desenvolvimento de ecossistema
- **Posicionamento Estratégico**: Foco reforçado no MCP como plataforma fundamental para implantação de sistemas agentivos
- **Integração de Recursos**: Atualizados recursos adicionais para incluir link do Registro MCP GitHub

## 15 de setembro de 2025

### Expansão de Tópicos Avançados - Transportes Personalizados & Engenharia de Contexto

#### Transportes Personalizados MCP (05-AdvancedTopics/mcp-transport/) - Novo Guia de Implementação Avançada
- **README.md**: Guia completo de implementação para mecanismos personalizados de transporte MCP
  - **Transporte Azure Event Grid**: Implementação abrangente de transporte serverless orientado a eventos
    - Exemplos em C#, TypeScript e Python com integração Azure Functions
    - Padrões de arquitetura orientada a eventos para soluções MCP escaláveis
    - Receptores webhook e manuseio de mensagens baseada em push
  - **Transporte Azure Event Hubs**: Implementação de transporte de streaming de alta vazão
    - Capacidades de streaming em tempo real para cenários de baixa latência
    - Estratégias de particionamento e gerenciamento de checkpoints
    - Agrupamento de mensagens e otimização de desempenho
  - **Padrões de Integração Corporativa**: Exemplos arquiteturais prontos para produção
    - Processamento MCP distribuído através de múltiplas Azure Functions
    - Arquiteturas híbridas de transporte combinando múltiplos tipos de transporte
    - Estratégias de durabilidade, confiabilidade e tratamento de erros de mensagem
  - **Segurança & Monitoramento**: Integração com Azure Key Vault e padrões de observabilidade
    - Autenticação por identidade gerenciada e acesso com privilégio mínimo
    - Telemetria via Application Insights e monitoramento de desempenho
    - Circuit breakers e padrões de tolerância a falhas
  - **Frameworks de Teste**: Estratégias abrangentes de testes para transportes personalizados
    - Testes unitários com test doubles e frameworks de mocking
    - Testes de integração com Azure Test Containers
    - Considerações para testes de desempenho e carga

#### Engenharia de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente de IA
- **README.md**: Exploração abrangente da engenharia de contexto como campo emergente
  - **Princípios Centrais**: Compartilhamento completo de contexto, consciência de decisão de ação e gerenciamento da janela de contexto
  - **Alinhamento com Protocolo MCP**: Como o design MCP aborda desafios da engenharia de contexto
    - Limitações da janela de contexto e estratégias de carregamento progressivo
    - Determinação de relevância e recuperação dinâmica de contexto
    - Manuseio multimodal de contexto e considerações de segurança
  - **Abordagens de Implementação**: Arquiteturas single-thread vs. multi-agente
    - Técnicas de fragmentação e priorização de contexto
    - Estratégias de carregamento progressivo e compressão de contexto
    - Abordagens camadas de contexto e otimização de recuperação
  - **Framework de Medição**: Métricas emergentes para avaliação de eficácia do contexto
    - Eficiência de entrada, desempenho, qualidade e experiência do usuário
    - Abordagens experimentais para otimização de contexto
    - Análise de falhas e metodologias de melhoria

#### Atualizações na Navegação do Currículo (README.md)
- **Estrutura de Módulo Aprimorada**: Atualizada tabela do currículo para incluir novos tópicos avançados
  - Adicionadas entradas Engenharia de Contexto (5.14) e Transporte Personalizado (5.15)
  - Formatação consistente e links de navegação em todos os módulos
  - Atualizadas descrições para refletir o escopo atual de conteúdo

### Melhorias na Estrutura de Diretórios
- **Padronização de Nomenclatura**: Renomeado "mcp transport" para "mcp-transport" para consistência com outras pastas de tópicos avançados
- **Organização de Conteúdo**: Todas as pastas 05-AdvancedTopics agora seguem padrão de nomenclatura consistente (mcp-[topic])

### Aprimoramentos na Qualidade da Documentação
- **Alinhamento com Especificação MCP**: Todo o novo conteúdo referencia a Especificação MCP 2025-06-18 atual
- **Exemplos Multi-Linguagem**: Exemplos completos de código em C#, TypeScript e Python
- **Foco Corporativo**: Padrões prontos para produção e integração com cloud Azure
- **Documentação Visual**: Diagramas Mermaid para visualização de arquitetura e fluxo

## 18 de agosto de 2025

### Atualização Abrangente da Documentação - Padrões MCP 2025-06-18

#### Melhores Práticas de Segurança MCP (02-Security/) - Modernização Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescrita completa alinhada com Especificação MCP 2025-06-18
  - **Requisitos Obrigatórios**: Inclusão explícita de requisitos DEVE/NAO DEVE da especificação oficial com indicadores visuais claros
  - **12 Práticas Centrais de Segurança**: Reestruturado de lista de 15 itens para domínios abrangentes de segurança
    - Segurança de Tokens & Autenticação com integração externa de provedores de identidade
    - Gerenciamento de Sessão & Segurança de Transporte com requisitos criptográficos
    - Proteção Específica para IA com integração Microsoft Prompt Shields
    - Controle de Acesso & Permissões com princípio do menor privilégio
    - Segurança & Monitoramento de Conteúdo com integração Azure Content Safety
    - Segurança da Cadeia de Suprimentos com verificação abrangente de componentes
    - Segurança OAuth & Prevenção de Confused Deputy com implementação PKCE
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
    - Compliance & Governança com alinhamento regulatório
    - Controles Avançados de Segurança com arquitetura zero trust
    - Integração com Ecossistema Microsoft Security com soluções completas
    - Evolução Contínua de Segurança com práticas adaptativas
  - **Soluções de Segurança Microsoft**: Orientações aprimoradas de integração para Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security
  - **Recursos de Implementação**: Links categorizados abrangentes por Documentação Oficial MCP, Soluções Microsoft, Padrões de Segurança e Guias de Implementação

#### Controles Avançados de Segurança (02-Security/) - Implementação Empresarial
- **MCP-SECURITY-CONTROLS-2025.md**: Reformulação completa com framework de segurança de nível corporativo
  - **9 Domínios Abrangentes de Segurança**: Expandido de controles básicos para framework empresarial detalhado
    - Autenticação & Autorização Avançada com integração Microsoft Entra ID
    - Segurança de Tokens & Controles Anti-Passthrough com validação abrangente
    - Controles de Segurança de Sessão com prevenção de hijacking
    - Controles de Segurança Específicos para IA com prevenção a prompt injection e envenenamento de ferramentas
    - Prevenção de Ataques Confused Deputy com segurança proxy OAuth
    - Segurança na Execução de Ferramentas com sandboxing e isolamento
    - Controles de Segurança da Cadeia de Suprimentos com verificação de dependências
    - Controles de Monitoramento & Detecção com integração SIEM
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
  - **Exemplos de Implementação**: Adicionados blocos detalhados de configuração YAML e exemplos de código
  - **Integração com Soluções Microsoft**: Cobertura abrangente dos serviços de segurança Azure, GitHub Advanced Security e gerenciamento corporativo de identidade

#### Segurança para Tópicos Avançados (05-AdvancedTopics/mcp-security/) - Implementação Pronta para Produção
- **README.md**: Reescrita completa para implementação de segurança empresarial
  - **Alinhamento com Especificação Atual**: Atualizado para Especificação MCP 2025-06-18 com requisitos obrigatórios de segurança
  - **Autenticação Aprimorada**: Integração Microsoft Entra ID com exemplos completos em .NET e Java Spring Security
  - **Integração de Segurança para IA**: Implementação Microsoft Prompt Shields e Azure Content Safety com exemplos detalhados em Python
  - **Mitigação Avançada de Ameaças**: Exemplos abrangentes para
    - Prevenção de Ataques Confused Deputy com PKCE e validação de consentimento do usuário
    - Prevenção de Passthrough de Token com validação de audiência e gerenciamento seguro de tokens
    - Prevenção de Sequestro de Sessão com vinculação criptográfica e análise comportamental
  - **Integração de Segurança Empresarial**: Monitoramento Azure Application Insights, pipelines de detecção de ameaças e segurança da cadeia de suprimentos
  - **Lista de Verificação de Implementação**: Controles de segurança obrigatórios vs. recomendados claramente definidos com benefícios do ecossistema de segurança Microsoft

### Qualidade da Documentação & Alinhamento com Padrões
- **Referências de Especificação**: Atualizadas todas as referências para a Especificação MCP vigente 2025-06-18
- **Ecossistema de Segurança Microsoft**: Orientação aprimorada de integração em toda a documentação de segurança
- **Implementação Prática**: Adicionados exemplos detalhados de código em .NET, Java e Python com padrões empresariais
- **Organização de Recursos**: Categorização abrangente de documentação oficial, padrões de segurança e guias de implementação
- **Indicadores Visuais**: Marcação clara dos requisitos obrigatórios vs. práticas recomendadas


#### Conceitos Centrais (01-CoreConcepts/) – Modernização Completa
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a Especificação MCP vigente 2025-06-18 com versionamento baseado em data (formato AAAA-MM-DD)
- **Refinamento da Arquitetura**: Melhor descrições de Hosts, Clientes e Servidores para refletir os padrões atuais da arquitetura MCP
  - Hosts agora claramente definidos como aplicações AI coordenando múltiplas conexões de clientes MCP
  - Clientes descritos como conectores de protocolo mantendo relações um-para-um com servidores
  - Servidores aprimorados com cenários de implantação local vs. remota
- **Reestruturação dos Primitivos**: Revisão completa dos primitvos do servidor e cliente
  - Primitivos de Servidor: Recursos (fontes de dados), Prompts (modelos), Ferramentas (funções executáveis) com explicações detalhadas e exemplos
  - Primitivos do Cliente: Amostragem (completions LLM), Elicitação (entrada do usuário), Registro (depuração/monitoramento)
  - Atualizados com os padrões atuais de descoberta (`*/list`), recuperação (`*/get`) e execução (`*/call`)
- **Arquitetura do Protocolo**: Introduzido modelo arquitetural de duas camadas
  - Camada de Dados: Fundação JSON-RPC 2.0 com gerenciamento de ciclo de vida e primitivas
  - Camada de Transporte: Mecanismos STDIO (local) e HTTP transmissível com SSE (remoto)
- **Marco de Segurança**: Princípios abrangentes de segurança incluindo consentimento explícito do usuário, proteção da privacidade dos dados, segurança na execução de ferramentas e segurança na camada de transporte
- **Padrões de Comunicação**: Atualizadas mensagens do protocolo para mostrar fluxos de inicialização, descoberta, execução e notificação
- **Exemplos de Código**: Exemplos multi-linguagem atualizados (.NET, Java, Python, JavaScript) para refletir os padrões atuais do SDK MCP

#### Segurança (02-Security/) – Revisão Completa da Segurança  
- **Alinhamento com Padrões**: Alinhamento total com os requisitos de segurança da Especificação MCP 2025-06-18
- **Evolução da Autenticação**: Documentada evolução de servidores OAuth personalizados para delegação a provedores de identidade externos (Microsoft Entra ID)
- **Análise de Ameaças Específicas para IA**: Cobertura ampliada de vetores de ataque modernos em IA
  - Cenários detalhados de ataques de injeção de prompt com exemplos reais
  - Mecanismos de envenenamento de ferramentas e padrões de ataque "rug pull"
  - Ataques de envenenamento da janela de contexto e confusão de modelos
- **Soluções de Segurança AI Microsoft**: Cobertura abrangente do ecossistema de segurança Microsoft
  - Escudos de Prompt AI com técnicas avançadas de detecção, destaque e delimitadores
  - Padrões de integração Azure Content Safety
  - GitHub Advanced Security para proteção da cadeia de suprimentos
- **Mitigação Avançada de Ameaças**: Controles de segurança detalhados para
  - Sequestro de sessão com cenários específicos MCP e requisitos criptográficos para ID da sessão
  - Problemas de delegado confuso em cenários de proxy MCP com requisitos de consentimento explícito
  - Vulnerabilidades de passagem de token com controles obrigatórios de validação
- **Segurança da Cadeia de Suprimentos**: Cobertura ampliada da cadeia de suprimentos AI incluindo modelos base, serviços de embeddings, provedores de contexto e APIs de terceiros
- **Segurança da Fundação**: Integração aprimorada com padrões de segurança empresariais incluindo arquitetura zero trust e o ecossistema de segurança Microsoft
- **Organização dos Recursos**: Links de recursos categorizados por tipo (Documentação Oficial, Padrões, Pesquisa, Soluções Microsoft, Guias de Implementação)

### Melhorias na Qualidade da Documentação
- **Objetivos de Aprendizado Estruturados**: Objetivos de aprendizagem aprimorados com resultados específicos e acionáveis
- **Referências Cruzadas**: Adicionados links entre tópicos relacionados de segurança e conceitos centrais
- **Informações Atualizadas**: Atualizados todos os referenciais de datas e links de especificação para os padrões atuais
- **Orientações de Implementação**: Diretrizes específicas e acionáveis de implementação adicionadas em ambas as seções

## 16 de julho de 2025

### Melhorias no README e Navegação
- Navegação do currículo no README.md completamente redesenhada
- Substituídas as tags `<details>` por formato tabular mais acessível
- Criadas opções de layout alternativas na nova pasta "alternative_layouts"
- Adicionados exemplos de navegação em cartões, estilo abas e acordeão
- Atualizada seção de estrutura do repositório para incluir todos os arquivos mais recentes
- Aprimorada a seção "Como Usar Este Currículo" com recomendações claras
- Atualizados os links da especificação MCP para URLs corretos
- Adicionada seção de Engenharia de Contexto (5.14) à estrutura do currículo

### Atualizações no Guia de Estudo
- Guia de estudo completamente revisado para alinhar à estrutura atual do repositório
- Adicionadas novas seções para Clientes e Ferramentas MCP e Servidores MCP Populares
- Mapa Visual do Currículo atualizado para refletir com precisão todos os tópicos
- Descrições dos Tópicos Avançados aprimoradas para cobrir todas as áreas especializadas
- Seção de Estudos de Caso atualizada para refletir exemplos reais
- Adicionado este changelog abrangente

### Contribuições da Comunidade (06-CommunityContributions/)
- Adicionadas informações detalhadas sobre servidores MCP para geração de imagens
- Seção abrangente sobre uso do Claude no VSCode
- Instruções para configuração e uso do cliente terminal Cline
- Atualizada seção de clientes MCP para incluir todas as opções populares
- Exemplos de contribuições aprimorados com amostras de código mais precisas

### Tópicos Avançados (05-AdvancedTopics/)
- Todas as pastas de tópicos especializados organizadas com nomenclatura consistente
- Materiais e exemplos de engenharia de contexto adicionados
- Documentação de integração do agente Foundry adicionada
- Documentação aprimorada da integração de segurança Entra ID

## 11 de junho de 2025

### Criação Inicial
- Lançada primeira versão do currículo MCP para Iniciantes
- Criada estrutura básica para todas as 10 seções principais
- Implementado Mapa Visual do Currículo para navegação
- Adicionados projetos exemplo iniciais em múltiplas linguagens de programação

### Começando (03-GettingStarted/)
- Criados primeiros exemplos de implementação de servidor
- Adicionadas orientações para desenvolvimento de clientes
- Instruções incluídas para integração de cliente LLM
- Documentação de integração VS Code adicionada
- Implementados exemplos de servidor com Server-Sent Events (SSE)

### Conceitos Centrais (01-CoreConcepts/)
- Explicação detalhada da arquitetura cliente-servidor adicionada
- Documentação dos componentes chave do protocolo criada
- Padrões de mensagens MCP documentados

## 23 de maio de 2025

### Estrutura do Repositório
- Repositório inicializado com estrutura básica de pastas
- Criados arquivos README para cada seção principal
- Estrutura para traduções configurada
- Adicionados ativos de imagem e diagramas

### Documentação
- README.md inicial criado com visão geral do currículo
- Adicionados CODE_OF_CONDUCT.md e SECURITY.md
- Configurado SUPPORT.md com orientações para obtenção de ajuda
- Estrutura preliminar do guia de estudo criada

## 15 de abril de 2025

### Planejamento e Estrutura
- Planejamento inicial para currículo MCP para Iniciantes
- Objetivos de aprendizagem e público-alvo definidos
- Estrutura de 10 seções do currículo delineada
- Desenvolvimento do framework conceitual para exemplos e estudos de caso
- Criados protótipos iniciais de exemplos para conceitos chave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->