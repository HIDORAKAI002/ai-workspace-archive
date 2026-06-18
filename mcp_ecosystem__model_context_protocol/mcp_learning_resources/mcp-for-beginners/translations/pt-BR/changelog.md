# Changelog: Currículo MCP para Iniciantes

Este documento serve como um registro de todas as mudanças significativas feitas no currículo Model Context Protocol (MCP) para Iniciantes. As alterações são documentadas em ordem cronológica reversa (mudanças mais recentes primeiro).

## 16 de junho de 2026

### Alinhamento da Especificação MCP & Validação de Exemplos

Validado o currículo contra a atual **Especificação MCP 2025-11-25** e os SDKs oficiais mais recentes, corrigidas as referências obsoletas da especificação restantes e confirmado que os exemplos principais ainda compilam e executam.

#### Correções de Versão da Especificação (2025-06-18 / 2025-03-26 → 2025-11-25)

Atualizado conteúdo em inglês onde ainda afirmava que uma revisão mais antiga da especificação era o padrão *atual/mais recente*, e redirecionados links para os caminhos canônicos da especificação `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Atualizado o banner "Padrão Atual", introdução, título dos princípios principais de segurança, título dos requisitos obrigatórios, seção Microsoft Entra ID, links de Referências & Recursos e aviso final de segurança (8 referências) para 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Atualizado o link da Especificação em Recursos Adicionais e o banner "Padrão Atual" para 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Substituído o link antigo `2025-03-26` security-and-trust pela página atual de boas práticas de segurança 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Atualizado o link oficial de documentação sobre sampling para 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Atualizada a referência no tempo presente para "especificação MCP atual" e o link da Especificação em Recursos Adicionais para 2025-11-25 (notas históricas sobre descontinuação SSE mantidas para precisão)

#### Validação dos Exemplos contra os SDKs Atuais

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolveu `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passou sem erros de tipo — APIs existentes `McpServer`/`StdioServerTransport` permanecem válidas
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validado em ambiente isolado `.venv` com `mcp[cli]` (1.27.2); `py_compile` passou e `FastMCP.list_tools()` retornou corretamente as ferramentas `add` e `subtract`
- Confirmado que todas as faixas de versão do sample `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) resolvem limpidamente para a atual `1.29.0` sem mudanças disruptivas de API

#### Alinhamento dos Pins de Dependência (fechando lacunas de versão)

Atualizados os pins desatualizados do SDK para que todos os exemplos rastreiem a versão atual do MCP, seguindo a convenção do repositório:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Atualizado `@modelcontextprotocol/sdk` de `^1.8.0` para `>=1.26.0` e descrição do pacote obsoleta `"updated for MCP 2025-06-18"` para `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** e **lab4/code/github_mcp_server/pyproject.toml**: Atualizado pin exato `mcp==1.23.0` para `mcp>=1.26.0`; regenerados ambos os arquivos `uv.lock` (`uv lock`) para que os lockfiles resolvam para o atual `mcp 1.27.2` e mantenham sincronia com os manifests 

#### Análise de Lacunas do Currículo — Cobertura das Funcionalidades da Última Especificação

Verificado que o currículo já cobre todos os primitivos introduzidos/expandidos no MCP 2025-11-25, sem lacunas de conteúdo restantes:
- **Sampling**: Aula 03-GettingStarted/14-sampling mais 05-AdvancedTopics/mcp-sampling
- **Elicitação (incluindo modo URL)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Raízes (Roots)**: Documentado em 00-Introduction, 01-CoreConcepts e 05-AdvancedTopics/mcp-root-contexts
- **Tarefas (experimental, operações de longa duração)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Anotações de Ferramentas** (`readOnlyHint` / `destructiveHint`): Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features

### Fortalecimento de Segurança & Remediação de Vulnerabilidades em Dependências

Realizado uma varredura completa de segurança em todos os manifests de dependência e no código-fonte dos exemplos, depois remediadas todas as recomendações npm reportadas e uma falha em nível de código. Após a remediação, `npm audit` reporta **0 vulnerabilidades** em todos os diretórios auditados.

#### Vulnerabilidades de Dependências npm (transitivas) — Corrigidas

Auditados todos os 15 arquivos `package-lock.json` comitados. As vulnerabilidades limitavam-se a dependências transitivas trazidas pela ferramenta dev MCP Inspector, pelo cliente OpenAI e pelo SDK MCP; todas resolvidas sem afetar os exemplos:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** e **lab3/code/weather_mcp/inspector**: Atualizado `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), o que limpou os avisos `ajv`, `brace-expansion`, `diff`, `path-to-regexp` e `ws` empacotados. Adicionado override npm para forçar `shell-quote@1.8.4` patchado e eliminar o aviso crítico remanescente carregado por `concurrently`; regenerados ambos os lockfiles (0 vulnerabilidades agora)
- **03-GettingStarted/samples/typescript**: `npm audit fix` atualizou a dependência transitiva `qs` (moderada) para uma versão patch
- **03-GettingStarted/samples/javascript**: `npm audit fix` atualizou a dependência transitiva `hono` (moderada) para uma versão patch
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` atualizou a dependência transitiva `form-data` (alta) para uma versão patch
- **03-GettingStarted/11-simple-auth/solution/typescript**: Gerado o `package-lock.json` faltante para garantir que o projeto é reproduzível e auditável (0 vulnerabilidades)

#### Correção de Segurança em Código (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Removido `shell=True` da ferramenta `open_in_vscode`. A chamada anterior `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitia que caracteres meta do shell em um caminho de pasta fossem interpretados pelo `cmd.exe` (vetor de injeção de comando). Agora lança diretamente o `Code.exe` resolvido com a pasta como argumento — sem shell — equivalente funcionalmente e seguro

#### Auditoria de Dependências Python

- Auditados todos os requisitos Python com `pip-audit`. `05-AdvancedTopics` e `03-GettingStarted/samples/python` reportaram **nenhuma vulnerabilidade conhecida** (suas faixas `mcp` / `httpx` / `pydantic` / `python-dotenv` resolvem para releases patchados atuais)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` indicou a dependência transitiva **`werkzeug` 3.1.1** com três avisos DoS no Windows via `safe_join` nome de dispositivo — `CVE-2025-66221`, `CVE-2026-21860` e `CVE-2026-27199` (todas corrigidas na 3.1.6). Adicionado pin explícito de segurança `werkzeug>=3.1.6` para garantir resolução na release corrigida; confirmado que a restrição resolve bem com a stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding do Nome do Produto

Atualizado todo o conteúdo do currículo para refletir o rebranding dos produtos Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Atualizado link da comunidade Discord
- **AGENTS.md**: Atualizada referência ao servidor Discord
- **README.md**: Atualizadas referências ao ecossistema tecnológico
- **study_guide.md**: Atualizadas referências de estudo de caso
- **05-AdvancedTopics/README.md**: Atualizado título e descrição do Módulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Atualizado cabeçalho de seção e descrição
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Atualizado título completo do módulo e conteúdo
- **05-AdvancedTopics/mcp-security-entra/README.md**: Atualizado link de referência cruzada
- **07-LessonsfromEarlyAdoption/README.md**: Atualizadas referências aos estudos de caso
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Atualizado cabeçalho da Seção 9, badges e capacidades
- **08-BestPractices/README.md**: Atualizado link da comunidade Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Atualizada referência ao canal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Atualizada referência ao deployment do modelo
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Atualizada tabela de Serviços de IA
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Atualizadas referências de recursos

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Atualizadas referências principais do currículo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Atualizados título do módulo, visão geral e todos os títulos de módulos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Atualizados título, objetivos de aprendizagem, instruções de setup e recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Atualizados título, objetivos de aprendizagem, tabela de hosts MCP e referências cruzadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Atualizados título, badges, pré-requisitos e recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Atualizadas referências do Agent Builder e link de feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Atualizados pré-requisitos e referências de extensão

---

## 11 de abril de 2026

### Nova Aula, Correções de Documentação e Atualizações de Dependência

#### Novo Conteúdo Adicionado ao Currículo

**Módulo 05 - Tópicos Avançados**
- **Aula 5.17: Raciocínio Multi-Agente Adversarial com MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Novo guia abrangente cobrindo o padrão de debate adversarial para sistemas multi-agente
  - Diagrama arquitetural Mermaid: dois agentes → servidor MCP compartilhado → transcrição do debate → juiz → veredito
  - Servidor de ferramentas MCP compartilhado (`web_search` + `run_python`) implementado em Python e TypeScript
  - Prompts de sistema opostos (A FAVOR / CONTRA / Juiz) com requisitos explícitos de uso de ferramentas
  - Orquestrador do debate em Python, TypeScript e C# gerenciando rodadas e roteamento de argumentos
  - Conexão MCP `ClientSession` para que o orquestrador realize chamadas reais às ferramentas
  - Tabela de casos de uso (detecção de alucinação, modelagem de ameaças, revisão de design de API, verificação factual, seleção tecnológica)
  - Considerações de segurança: execução sandboxed, validação de chamadas de ferramenta, limitação de taxa, logs de auditoria
  - Exercício estruturado com três cenários práticos (revisão de código, decisão arquitetural, moderação de conteúdo)

#### Correções de Documentação

**Módulo 03 - Introdução**
- **05-stdio-server/README.md**: Corrigido exemplo incompleto do servidor TypeScript stdio — adicionada instância de transporte faltante (`new StdioServerTransport()`) e chamada `server.connect(transport)` para igualar os exemplos Python e .NET na mesma seção
- **14-sampling/README.md**: Corrigido erro de digitação — corrigido `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Atualizações do Currículo

**README.md principal**
- Adicionada a entrada 5.17 (Raciocínio Multi-Agente Adversarial com MCP) na tabela do currículo com link direto para a nova aula

**05-AdvancedTopics/README.md**
- Adicionada linha da Aula 5.17 na tabela de aulas

**study_guide.md**
- Adicionado o tópico Raciocínio Multi-Agente Adversarial ao mapa mental e descrição em prosa de Tópicos Avançados

#### Correções de Código e Segurança

**Módulo 05 - Agentes Adversariais (`mcp-adversarial-agents`)**
- **Correção de segurança — injeção de comando**: Substituído shell interpolation do `execSync` pela combinação `execFile` + `promisify` na ferramenta TypeScript `run_python`, eliminando a superfície de injeção de comando (código controlado pelo LLM agora é passado como elemento literal argv sem envolvimento de shell)
- **Cabeamento do loop da ferramenta MCP**: Atualizado o orquestrador de debate Python para usar o cliente `AsyncAnthropic` (substituindo o bloqueio síncrono `Anthropic`), passar uma `ClientSession` ao vivo diretamente para cada turno do agente, buscar definições de ferramentas via `session.list_tools()` a cada turno e despachar blocos `tool_use` via `session.call_tool()` em um loop até que o modelo emita uma resposta final de texto

#### Atualizações de Dependências

- Atualizado `hono` para 4.12.12 em vários pacotes (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Atualizado `@hono/node-server` de 1.19.11 para 1.19.13 em pacotes TypeScript
- Atualizado `cryptography` de 46.0.5 para 46.0.7 em pacotes Python (10-StreamliningAIWorkflows labs 3 e 4)
- Atualizado `lodash` de 4.17.23 para 4.18.1 no inspetor 10-StreamliningAIWorkflows

#### Traduções

- Sincronizadas traduções para mais de 48 idiomas com as últimas alterações da fonte (atualização i18n)

---

## 5 de fevereiro de 2026

### Validação do Repositório e Melhorias na Navegação

#### Novo Conteúdo do Currículo Adicionado

**Módulo 03 - Introdução**
- **12-mcp-hosts/README.md**: Novo guia completo para configuração de hosts MCP
  - Exemplos de configuração para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelos de configuração JSON para todos os principais hosts
  - Tabela comparativa dos tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Solução de problemas comuns de conexão
  - Melhores práticas de segurança para configuração de hosts

- **13-mcp-inspector/README.md**: Novo guia de depuração para MCP Inspector
  - Métodos de instalação (npx, npm global, fonte)
  - Conexão a servidores via stdio e HTTP/SSE
  - Ferramentas de teste, recursos e fluxos de trabalho de prompts
  - Integração do VS Code com MCP Inspector
  - Cenários comuns de depuração com soluções

**Módulo 04 - Implementação Prática**
- **pagination/README.md**: Novo guia de implementação de paginação
  - Padrões de paginação baseados em cursor em Python, TypeScript, Java
  - Manipulação de paginação no cliente
  - Estratégias de design de cursor (opaco vs. estruturado)
  - Recomendações de otimização de desempenho

**Módulo 05 - Tópicos Avançados**
- **mcp-protocol-features/README.md**: Novo mergulho profundo em recursos do protocolo
  - Implementação de notificações de progresso
  - Padrões de cancelamento de solicitações
  - Modelos de recursos com padrões de URI
  - Gerenciamento do ciclo de vida do servidor
  - Controle do nível de logging
  - Padrões de tratamento de erros com códigos JSON-RPC

#### Correções de Navegação (24+ arquivos atualizados)

**READMEs do Módulo Principal**
 Agora com links tanto para a primeira aula QUANTO para o próximo módulo

**Sub-arquivos 02-Security**
- Todos os 5 documentos suplementares de segurança agora têm navegação "O que vem a seguir":

**Arquivos 09-CaseStudy**
- Todos os arquivos de estudo de caso agora possuem navegação sequencial:

**Labs 10-StreamliningAI**
Adicionado seção O que vem a seguir na visão geral do Módulo 10 e no Módulo 11

#### Correções de Código e Conteúdo

**Atualizações de SDK e Dependências**
Corrigida versão vazia do openai para `^4.95.0`
Atualizado SDK de `^1.8.0` para `>=1.26.0`
Atualizadas versões fixas do mcp para `>=1.26.0`

**Correções de Código**
Corrigido modelo inválido `gpt-4o-mini` para `gpt-4.1-mini`

**Correções de Conteúdo**
Corrigido link quebrado `READMEmd` → `README.md`, corrigido cabeçalho do currículo `Module 1-3` → `Module 0-3`, corrigido caminho sensível a maiúsculas/minúsculas
Removido conteúdo duplicado corrompido do Estudo de Caso 5

**Melhorias na Orientação para Iniciantes**
Adicionada introdução adequada, objetivos de aprendizagem e pré-requisitos para iniciantes

#### Atualizações do Currículo

**README.md Principal**
- Adicionadas entradas 3.12 (Hosts MCP), 3.13 (Inspetor MCP), 4.1 (Paginação), 5.16 (Recursos do Protocolo) na tabela do currículo

**READMEs dos Módulos**
Adicionadas aulas 12 e 13 na lista de aulas
Adicionada seção Guias Práticos com link para paginação
Adicionadas aulas 5.15 (Transporte Customizado) e 5.16 (Recursos do Protocolo)

**study_guide.md**
- Atualizado mapa mental com todos os novos tópicos: Configuração de Hosts MCP, Inspetor MCP, Estratégias de Paginação, Mergulho nos Recursos do Protocolo

## 28 de janeiro de 2026

### Revisão de Conformidade da Especificação MCP 2025-11-25

#### Aperfeiçoamento dos Conceitos Centrais (01-CoreConcepts/)
- **Novo Primitivo Cliente - Roots**: Adicionada documentação abrangente sobre o primitivo cliente Roots, permitindo que servidores compreendam limites do sistema de arquivos e permissões de acesso
- **Anotações de Ferramentas**: Adicionada documentação sobre anotações comportamentais de ferramentas (`readOnlyHint`, `destructiveHint`) para melhores decisões na execução das ferramentas
- **Chamada de Ferramenta na Amostragem**: Atualizada documentação de Sampling para incluir parâmetros `tools` e `toolChoice` para invocação de ferramentas guiada pelo modelo durante solicitações de amostragem
- **Elicitação no Modo URL**: Adicionada documentação sobre elicitação baseada em URL para interações externas iniciadas pelo servidor
- **Tarefas (Experimental)**: Nova seção documentando o recurso experimental de Tarefas para invólucros de execução durável e recuperação de resultados diferidos
- **Suporte a Ícones**: Notado que ferramentas, recursos, modelos de recursos e prompts agora podem incluir ícones como metadados adicionais

#### Atualizações na Documentação
- **README.md**: Adicionada referência à versão da Especificação MCP 2025-11-25 e explicação do versionamento por data
- **study_guide.md**: Atualizado mapa curricular para incluir Tarefas e Anotações de Ferramentas na seção de Conceitos Centrais; atualizado timestamp do documento

#### Verificação de Conformidade da Especificação
- **Versão do Protocolo**: Verificado que toda a documentação referencia a atual Especificação MCP 2025-11-25
- **Alinhamento Arquitetural**: Confirmada precisão da arquitetura em duas camadas (Camada de Dados + Camada de Transporte)
- **Documentação dos Primitivos**: Validada documentação dos primitivos de servidor (Recursos, Prompts, Ferramentas) e primitivos de cliente (Sampling, Elicitação, Logging, Roots)
- **Mecanismos de Transporte**: Verificada precisão da documentação dos transportes STDIO e Streamable HTTP
- **Orientação de Segurança**: Confirmado alinhamento com as melhores práticas de segurança MCP atuais

#### Principais Recursos Documentados do MCP 2025-11-25
- **Descoberta OpenID Connect**: Descoberta do servidor de autenticação via OIDC
- **Documentos de Metadados do Client ID OAuth**: Mecanismo recomendado para registro de clientes
- **JSON Schema 2020-12**: Dialeto padrão para definições de schema MCP
- **Sistema de Níveis do SDK**: Requisitos formalizados para suporte e manutenção de recursos do SDK
- **Estrutura de Governança**: Formalizados Grupos de Trabalho e Grupos de Interesse na governança MCP

### Grande Atualização na Documentação de Segurança (02-Security/)

#### Integração do Workshop MCP Security Summit (Sherpa)
- **Novo Recurso de Treinamento Prático**: Adicionada integração abrangente com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) em toda a documentação de segurança
- **Cobertura do Roteiro da Expedição**: Documentado o progresso completo de acampamento a acampamento do Base Camp ao Summit
- **Alinhamento com OWASP**: Todas as orientações de segurança agora estão mapeadas aos riscos do OWASP MCP Azure Security Guide

#### Integração do OWASP MCP Top 10
- **Nova Seção**: Adicionada tabela de Riscos de Segurança OWASP MCP Top 10 com mitigações Azure no README principal de Segurança
- **Documentação Baseada em Risco**: Atualizado mcp-security-controls-2025.md com referências aos riscos OWASP MCP para cada domínio de segurança
- **Arquitetura de Referência**: Ligação para arquitetura de referência OWASP MCP Azure Security Guide e padrões de implementação

#### Arquivos de Segurança Atualizados
- **README.md**: Adicionada visão geral do Workshop Sherpa, tabela de rota da expedição, resumo dos riscos OWASP MCP Top 10 e seção de treinamento prático
- **mcp-security-controls-2025.md**: Atualizado cabeçalho para fevereiro de 2026, adicionadas referências aos riscos OWASP (MCP01-MCP08), corrigida inconsistência de versão da especificação
- **mcp-security-best-practices-2025.md**: Adicionada seção de recursos Sherpa e OWASP, atualizado timestamp
- **mcp-best-practices.md**: Adicionada seção de treinamento prático com links Sherpa e OWASP
- **azure-content-safety-implementation.md**: Adicionado referência OWASP MCP06, alinhamento com Sherpa Camp 3 e seção de recursos adicionais

#### Novos Links de Recursos Adicionados
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuais de riscos OWASP MCP (MCP01-MCP10)

### Alinhamento da Especificação MCP 2025-11-25 em Todo o Currículo

#### Módulo 03 - Introdução
- **Documentação de SDK**: Adicionado SDK Go à lista oficial de SDKs; atualizadas todas referências de SDK para alinhamento com a Especificação MCP 2025-11-25
- **Esclarecimento de Transporte**: Atualizadas descrições dos transportes STDIO e HTTP Streaming com referências explícitas à especificação

#### Módulo 04 - Implementação Prática
- **Atualizações de SDK**: Adicionado SDK Go; lista de SDKs atualizada com referência à versão da especificação
- **Especificação de Autorização**: Atualizado link para a especificação de Autorização MCP para a versão atual 2025-11-25

#### Módulo 05 - Tópicos Avançados
- **Novos Recursos**: Adicionado nota sobre novos recursos da Especificação MCP 2025-11-25 (Tarefas, Anotações de Ferramentas, Elicitação no Modo URL, Roots)
- **Recursos de Segurança**: Adicionados links para OWASP MCP Top 10 e workshop Sherpa em referências adicionais

#### Módulo 06 - Contribuições da Comunidade
- **Lista de SDKs**: Adicionados SDKs Swift e Rust; link para especificação atualizado para 2025-11-25
- **Referência da Especificação**: Atualizada URL da Especificação MCP para endereço direto da especificação

#### Módulo 07 - Lições da Adoção Inicial
- **Atualizações de Recursos**: Adicionado link para Especificação MCP 2025-11-25 e OWASP MCP Top 10 nos recursos adicionais

#### Módulo 08 - Melhores Práticas
- **Versão da Especificação**: Atualizada referência da Especificação MCP para 2025-11-25
- **Recursos de Segurança**: Adicionados OWASP MCP Top 10 e workshop Sherpa em referências adicionais

#### Módulo 10 - Otimizando Fluxos de Trabalho de IA
- **Atualização do Badge**: Alterado o badge da versão MCP de versão do SDK (1.9.3) para versão da especificação (2025-11-25)
- **Links de Recursos**: Atualizado link da Especificação MCP; adicionado OWASP MCP Top 10

#### Módulo 11 - Laboratórios Práticos MCP Server
- **Referência da Especificação**: Atualizado link da Especificação MCP para versão 2025-11-25
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 aos recursos oficiais

## 18 de dezembro de 2025

### Atualização da Documentação de Segurança - Especificação MCP 2025-11-25

#### Melhores Práticas de Segurança MCP (02-Security/mcp-best-practices.md) - Atualização da Versão da Especificação
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a última Especificação MCP 2025-11-25 (lançada em 25 de novembro de 2025)
  - Atualizadas todas as referências de versão da especificação de 2025-06-18 para 2025-11-25
  - Atualizadas referências de datas do documento de 18 de agosto de 2025 para 18 de dezembro de 2025
  - Verificados todos os URLs da especificação apontando para a documentação atual
- **Validação de Conteúdo**: Validação abrangente das melhores práticas de segurança segundo os padrões mais recentes
  - **Soluções de Segurança Microsoft**: Verificados termos e links atuais para Prompt Shields (anteriormente "detecção de risco de jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Segurança OAuth 2.1**: Confirmado alinhamento com as melhores práticas atuais de segurança OAuth
  - **Padrões OWASP**: Validado que referências ao OWASP Top 10 para LLMs permanecem atuais
  - **Serviços Azure**: Verificados todos os links de documentação Microsoft Azure e melhores práticas
- **Alinhamento com Padrões**: Confirmado que todos os padrões de segurança referenciados estão atualizados
  - Framework NIST para Gestão de Risco em IA
  - ISO 27001:2022
  - Melhores Práticas de Segurança OAuth 2.1
  - Frameworks de segurança e conformidade Azure
- **Recursos de Implementação**: Verificados todos os links e recursos de guia de implementação
  - Padrões de autenticação API Management Azure
  - Guias de integração Microsoft Entra ID
  - Gerenciamento de segredos Azure Key Vault
  - Soluções de monitoramento e pipelines DevSecOps

### Garantia de Qualidade da Documentação
- **Conformidade com a Especificação**: Assegurada a conformidade de todos os requisitos obrigatórios de segurança MCP (DEVE/ NÃO DEVE) com a especificação mais recente
- **Atualização de Recursos**: Verificados todos os links externos para documentação Microsoft, padrões de segurança e guias de implementação
- **Cobertura das Melhores Práticas**: Confirmada cobertura completa para autenticação, autorização, ameaças específicas de IA, segurança da cadeia de suprimentos e padrões empresariais

## 6 de outubro de 2025

### Expansão da Seção Introdução – Uso Avançado do Servidor & Autenticação Simples

#### Uso Avançado do Servidor (03-GettingStarted/10-advanced)
- **Novo Capítulo Adicionado**: Guia abrangente sobre uso avançado do servidor MCP, cobrindo arquiteturas de servidor regulares e de baixo nível.
  - **Servidor Regular vs. de Baixo Nível**: Comparação detalhada e exemplos de código em Python e TypeScript para ambas abordagens.
  - **Design Baseado em Handlers**: Explicação do gerenciamento de ferramentas/recursos/prompts baseado em handlers para implementações de servidor escaláveis e flexíveis.
  - **Padrões Práticos**: Cenários reais onde padrões de servidor de baixo nível beneficiam recursos e arquiteturas avançadas.
#### Autenticação Simples (03-GettingStarted/11-simple-auth)
- **Novo Capítulo Adicionado**: Guia passo a passo para implementação de autenticação simples em servidores MCP.
  - **Conceitos de Autenticação**: Explicação clara de autenticação vs. autorização, e manuseio de credenciais.
  - **Implementação Básica de Autenticação**: Padrões de autenticação baseados em middleware em Python (Starlette) e TypeScript (Express), com exemplos de código.
  - **Progressão para Segurança Avançada**: Orientação para iniciar com autenticação simples e avançar para OAuth 2.1 e RBAC, com referências a módulos avançados de segurança.

Essas adições fornecem orientações práticas e aplicáveis para construir implementações de servidores MCP mais robustas, seguras e flexíveis, conectando conceitos fundamentais com padrões avançados de produção.

## 29 de setembro de 2025

### Laboratórios de Integração de Banco de Dados do Servidor MCP - Caminho Completo de Aprendizagem Prática

#### 11-MCPServerHandsOnLabs - Novo Currículo Completo de Integração de Banco de Dados
- **Caminho Completo de Aprendizado com 13 Laboratórios**: Adicionado currículo prático completo para construção de servidores MCP prontos para produção com integração de banco de dados PostgreSQL
  - **Implementação do Mundo Real**: Caso de uso de análise Zava Retail demonstrando padrões de nível empresarial
  - **Progressão Estruturada de Aprendizagem**:
    - **Laboratórios 00-03: Fundamentos** - Introdução, Arquitetura Central, Segurança e Multi-Tenancy, Configuração de Ambiente
    - **Laboratórios 04-06: Construção do Servidor MCP** - Design & Esquema do Banco de Dados, Implementação do Servidor MCP, Desenvolvimento de Ferramentas  
    - **Laboratórios 07-09: Funcionalidades Avançadas** - Integração de Busca Semântica, Testes & Depuração, Integração com VS Code
    - **Laboratórios 10-12: Produção & Melhores Práticas** - Estratégias de Implantação, Monitoramento & Observabilidade, Melhores Práticas & Otimização
  - **Tecnologias Empresariais**: Framework FastMCP, PostgreSQL com pgvector, embeddings do Azure OpenAI, Azure Container Apps, Application Insights
  - **Funcionalidades Avançadas**: Segurança em Nível de Linha (RLS), busca semântica, acesso a dados multi-tenant, embeddings vetoriais, monitoramento em tempo real

#### Padronização de Terminologia - Conversão de Módulo para Laboratório
- **Atualização Abrangente da Documentação**: Atualização sistemática de todos os arquivos README em 11-MCPServerHandsOnLabs para usar terminologia "Laboratório" em vez de "Módulo"
  - **Cabeçalhos de Seção**: Atualizado "O que este módulo cobre" para "O que este laboratório cobre" em todos os 13 laboratórios
  - **Descrição de Conteúdo**: Alterado "Este módulo fornece..." para "Este laboratório fornece..." em toda documentação
  - **Objetivos de Aprendizagem**: Atualizado "Ao final deste módulo..." para "Ao final deste laboratório..." 
  - **Links de Navegação**: Convertidos todas referências "Módulo XX:" para "Laboratório XX:" em referências cruzadas e navegação
  - **Rastreamento de Conclusão**: Atualizado "Após completar este módulo..." para "Após completar este laboratório..."
  - **Referências Técnicas Preservadas**: Mantidas referências a módulos Python nos arquivos de configuração (ex.: `"module": "mcp_server.main"`)

#### Aprimoramento do Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Adicionada nova seção "11. Laboratórios de Integração de Banco de Dados" com visualização completa da estrutura dos laboratórios
- **Estrutura do Repositório**: Atualizado de dez para onze seções principais com descrição detalhada de 11-MCPServerHandsOnLabs
- **Orientação no Caminho de Aprendizagem**: Melhoradas instruções de navegação para abranger seções 00-11
- **Cobertura Tecnológica**: Adicionadas informações sobre FastMCP, PostgreSQL, serviços Azure integrados
- **Resultados de Aprendizagem**: Ênfase em desenvolvimento de servidores prontos para produção, padrões de integração de banco de dados e segurança empresarial

#### Aprimoramento da Estrutura do README Principal
- **Terminologia Baseada em Laboratórios**: Atualizado README.md principal em 11-MCPServerHandsOnLabs para usar consistentemente a estrutura "Laboratório"
- **Organização do Caminho de Aprendizagem**: Progressão clara desde conceitos fundamentais até implementação avançada e implantação em produção
- **Foco no Mundo Real**: Ênfase em aprendizado prático com padrões e tecnologias de nível empresarial

### Melhorias na Qualidade e Consistência da Documentação
- **Ênfase no Aprendizado Prático**: Abordagem reforçada baseada em laboratórios ao longo da documentação
- **Foco em Padrões Empresariais**: Destaque para implementações prontas para produção e considerações de segurança empresarial
- **Integração Tecnológica**: Cobertura abrangente dos serviços modernos da Azure e padrões de integração com IA
- **Progressão de Aprendizado**: Caminho claro e estruturado do básico até a implantação em produção

## 26 de setembro de 2025

### Aprimoramento de Estudos de Caso - Integração do Registro MCP do GitHub

#### Estudos de Caso (09-CaseStudy/) - Foco no Desenvolvimento do Ecossistema
- **README.md**: Expansão significativa com estudo de caso abrangente do Registro MCP do GitHub
  - **Estudo de Caso do Registro MCP do GitHub**: Novo estudo de caso completo examinando o lançamento do Registro MCP do GitHub em setembro de 2025
    - **Análise do Problema**: Exame detalhado dos desafios fragmentados de descoberta e implantação de servidores MCP
    - **Arquitetura da Solução**: Abordagem do registro centralizado do GitHub com instalação com um clique no VS Code
    - **Impacto de Negócios**: Melhorias mensuráveis no onboarding de desenvolvedores e produtividade
    - **Valor Estratégico**: Foco no deployment modular de agentes e interoperabilidade entre ferramentas
    - **Desenvolvimento do Ecossistema**: Posicionamento como plataforma base para integração agentiva
  - **Estrutura Aprimorada dos Estudos de Caso**: Atualizados os sete estudos de caso com formatação consistente e descrições abrangentes
    - Agentes de Viagem Azure AI: Ênfase em orquestração multi-agente
    - Integração Azure DevOps: Foco em automação de fluxo de trabalho
    - Recuperação de Documentação em Tempo Real: Implementação de cliente de console Python
    - Gerador Interativo de Plano de Estudos: Aplicativo web conversacional Chainlit
    - Documentação no Editor: Integração VS Code e GitHub Copilot
    - Gerenciamento de API Azure: Padrões de integração corporativa de API
    - Registro MCP do GitHub: Desenvolvimento de ecossistema e plataforma comunitária
  - **Conclusão Abrangente**: Reescrita da seção de conclusão destacando sete estudos de caso abrangendo diversas dimensões de implementação MCP
    - Integração Empresarial, Orquestração Multi-Agente, Produtividade do Desenvolvedor
    - Desenvolvimento do Ecossistema, Categorias de Aplicações Educacionais
    - Insights ampliados sobre padrões arquiteturais, estratégias de implementação e melhores práticas
    - Ênfase no MCP como protocolo maduro e pronto para produção

#### Atualizações no Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Atualização do mindmap para incluir Registro MCP do GitHub na seção Estudos de Caso
- **Descrição dos Estudos de Caso**: Melhorada de descrições genéricas para detalhamento dos sete estudos de caso abrangentes
- **Estrutura do Repositório**: Atualizado seção 10 para refletir cobertura completa dos estudos de caso com detalhes específicos de implementação
- **Integração no Changelog**: Entrada de 26 de setembro de 2025 documentando adição do Registro MCP do GitHub e aprimoramentos nos estudos de caso
- **Atualizações de Data**: Atualizado carimbo de data no rodapé para refletir a revisão mais recente (26 de setembro de 2025)

### Melhoria na Qualidade da Documentação
- **Aprimoramento da Consistência**: Padronização da formatação e estrutura dos estudos de caso em todos os sete exemplos
- **Cobertura Abrangente**: Estudos de caso agora abrangem cenários empresariais, produtividade do desenvolvedor e desenvolvimento de ecossistema
- **Posicionamento Estratégico**: Foco ampliado no MCP como plataforma base para implantação de sistemas agentivos
- **Integração de Recursos**: Atualização dos recursos adicionais para incluir link do Registro MCP do GitHub

## 15 de setembro de 2025

### Expansão de Tópicos Avançados - Transportes Customizados & Engenharia de Contexto

#### Transportes Customizados MCP (05-AdvancedTopics/mcp-transport/) - Novo Guia Avançado de Implementação
- **README.md**: Guia completo de implementação para mecanismos personalizados de transporte MCP
  - **Transporte Azure Event Grid**: Implementação abrangente de transporte orientado a eventos serverless
    - Exemplos em C#, TypeScript e Python com integração Azure Functions
    - Padrões de arquitetura orientada a eventos para soluções MCP escaláveis
    - Receptores webhook e gerenciamento push de mensagens
  - **Transporte Azure Event Hubs**: Implementação de transporte streaming de alta taxa
    - Capacidades de streaming em tempo real para cenários de baixa latência
    - Estratégias de particionamento e gerenciamento de checkpoints
    - Agrupamento de mensagens e otimização de desempenho
  - **Padrões de Integração Empresarial**: Exemplos arquiteturais prontos para produção
    - Processamento distribuído MCP via múltiplas Azure Functions
    - Arquiteturas híbridas combinando múltiplos tipos de transporte
    - Durabilidade, confiabilidade e estratégias de tratamento de erros de mensagens
  - **Segurança & Monitoramento**: Integração Azure Key Vault e padrões de observabilidade
    - Autenticação com identidade gerenciada e acesso privilege mínimo
    - Telemetria Application Insights e monitoramento de desempenho
    - Circuit breakers e padrões de tolerância a falhas
  - **Frameworks de Testes**: Estratégias abrangentes de teste para transportes customizados
    - Testes unitários com doubles e frameworks de mocking
    - Testes de integração com Azure Test Containers
    - Considerações para testes de desempenho e carga

#### Engenharia de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente de IA
- **README.md**: Exploração abrangente de engenharia de contexto como campo emergente
  - **Princípios Centrais**: Compartilhamento completo de contexto, consciência na decisão de ação, gerenciamento da janela de contexto
  - **Alinhamento com Protocolo MCP**: Como o design MCP aborda desafios de engenharia de contexto
    - Limitações da janela de contexto e estratégias de carregamento progressivo
    - Determinação de relevância e recuperação dinâmica de contexto
    - Manuseio multimodal de contexto e considerações de segurança
  - **Abordagens de Implementação**: Arquiteturas single-thread vs. multi-agente
    - Técnicas de fragmentação e priorização de contexto
    - Estratégias de carregamento progressivo e compressão de contexto
    - Abordagens em camadas de contexto e otimização de recuperação
  - **Framework de Medição**: Métricas emergentes para avaliação da eficácia do contexto
    - Eficiência de entrada, desempenho, qualidade e considerações de experiência do usuário
    - Abordagens experimentais para otimização de contexto
    - Análise de falhas e metodologias de melhoria

#### Atualizações na Navegação do Currículo (README.md)
- **Estrutura de Módulo Aprimorada**: Atualizada tabela do currículo para incluir novos tópicos avançados
  - Adicionados entradas Engenharia de Contexto (5.14) e Transporte Customizado (5.15)
  - Formatação consistente e links de navegação em todos os módulos
  - Descrições atualizadas para refletir o escopo atual do conteúdo

### Melhorias na Estrutura do Diretório
- **Padronização de Nomenclatura**: Renomeado "mcp transport" para "mcp-transport" para consistência com outras pastas de tópicos avançados
- **Organização de Conteúdo**: Todas as pastas 05-AdvancedTopics agora seguem padrão consistente de nomenclatura (mcp-[tópico])

### Aprimoramentos na Qualidade da Documentação
- **Alinhamento com Especificação MCP**: Todo conteúdo novo referencia a Especificação MCP 2025-06-18 atual
- **Exemplos Multilíngues**: Exemplos de código abrangentes em C#, TypeScript e Python
- **Foco Empresarial**: Padrões prontos para produção e integração com nuvem Azure ao longo de todo conteúdo
- **Documentação Visual**: Diagramas Mermaid para visualização de arquitetura e fluxo

## 18 de agosto de 2025

### Atualização Abrangente da Documentação - Padrões MCP 2025-06-18

#### Melhores Práticas de Segurança MCP (02-Security/) - Modernização Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescrita completa alinhada à Especificação MCP 2025-06-18
  - **Requisitos Obrigatórios**: Inclusão explícita de requisitos DEVE/ NÃO DEVE da especificação oficial com indicadores visuais claros
  - **12 Práticas Centrais de Segurança**: Reestruturadas de lista de 15 itens para domínios abrangentes de segurança
    - Segurança de Token & Autenticação com integração de provedores de identidade externos
    - Gerenciamento de Sessão & Segurança de Transporte com requisitos criptográficos
    - Proteção Contra Ameaças Específicas de IA com integração Microsoft Prompt Shields
    - Controle de Acesso & Permissões com princípio do menor privilégio
    - Segurança de Conteúdo & Monitoramento com integração Azure Content Safety
    - Segurança da Cadeia de Suprimentos com verificação abrangente de componentes
    - Segurança OAuth & Prevenção de Confused Deputy com implementação PKCE
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
    - Conformidade & Governança com alinhamento regulatório
    - Controles Avançados de Segurança com arquitetura de confiança zero
    - Integração do Ecossistema de Segurança Microsoft com soluções compreensivas
    - Evolução Contínua da Segurança com práticas adaptativas
  - **Soluções Microsoft de Segurança**: Orientação ampliada para integração com Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security
  - **Recursos de Implementação**: Links de recursos categorizados por Documentação Oficial MCP, Soluções Microsoft, Padrões de Segurança e Guias de Implementação

#### Controles de Segurança Avançados (02-Security/) - Implementação Empresarial
- **MCP-SECURITY-CONTROLS-2025.md**: Revisão completa com framework de segurança corporativa
  - **9 Domínios Completos de Segurança**: Expandido de controles básicos para detalhamento corporativo
    - Autenticação & Autorização Avançadas com integração Microsoft Entra ID
    - Segurança de Token & Controles Anti-Passthrough com validação abrangente
    - Controles de Segurança de Sessão com prevenção de sequestro
    - Controles de Segurança Específicos para IA com prevenção de injeção de prompt e envenenamento de ferramentas
    - Prevenção de Ataque Confused Deputy com segurança proxy OAuth
    - Segurança na Execução de Ferramentas com sandboxing e isolamento
    - Controles de Segurança da Cadeia de Suprimentos com verificação de dependências
    - Controles de Monitoramento & Detecção com integração SIEM
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
  - **Exemplos de Implementação**: Adicionados blocos de configuração YAML e exemplos de código detalhados
  - **Integração com Soluções Microsoft**: Cobertura comprensiva dos serviços de segurança Azure, GitHub Advanced Security e gerenciamento empresarial de identidade

#### Segurança em Tópicos Avançados (05-AdvancedTopics/mcp-security/) - Implementação Pronta para Produção
- **README.md**: Reescrita completa para implementação de segurança empresarial
  - **Alinhamento com Especificação Atual**: Atualizado para Especificação MCP 2025-06-18 com requisitos obrigatórios de segurança
  - **Autenticação Aprimorada**: Integração Microsoft Entra ID com exemplos completos em .NET e Java Spring Security
  - **Integração de Segurança para IA**: Implementação Microsoft Prompt Shields e Azure Content Safety com exemplos detalhados em Python
  - **Mitigação Avançada de Ameaças**: Exemplos abrangentes para
    - Prevenção de Ataque Confused Deputy com PKCE e validação de consentimento do usuário
    - Prevenção de Passthrough de Token com validação de audiência e gerenciamento seguro de tokens
    - Prevenção de Sequestro de Sessão com ligação criptográfica e análise comportamental
  - **Integração de Segurança Empresarial**: Monitoramento Azure Application Insights, pipelines de detecção de ameaças e segurança da cadeia de suprimentos
  - **Checklist de Implementação**: Controles de segurança obrigatórios vs. recomendados claros com benefícios do ecossistema Microsoft

### Qualidade da Documentação & Alinhamento com Padrões
- **Referências da Especificação**: Atualizadas todas as referências para a Especificação MCP atual 2025-06-18  
- **Ecossistema de Segurança Microsoft**: Orientações de integração aprimoradas em toda a documentação de segurança  
- **Implementação Prática**: Adicionados exemplos detalhados de código em .NET, Java e Python com padrões empresariais  
- **Organização de Recursos**: Categorização abrangente da documentação oficial, padrões de segurança e guias de implementação  
- **Indicadores Visuais**: Marcação clara dos requisitos mandatórios versus práticas recomendadas  


#### Conceitos Básicos (01-CoreConcepts/) - Modernização Completa  
- **Atualização da Versão do Protocolo**: Atualizado para referência à Especificação MCP atual 2025-06-18 com versionamento baseado em data (formato AAAA-MM-DD)  
- **Refino da Arquitetura**: Descrições aprimoradas de Hosts, Clientes e Servidores para refletir padrões arquitetônicos atuais do MCP  
  - Hosts agora claramente definidos como aplicações de IA que coordenam múltiplas conexões de clientes MCP  
  - Clientes descritos como conectores de protocolo que mantêm relações um a um com servidores  
  - Servidores aprimorados com cenários de implantação local vs. remota  
- **Reconstrução das Primitivas**: Revisão completa das primitivas do servidor e do cliente  
  - Primitivas do Servidor: Recursos (fontes de dados), Prompts (modelos), Ferramentas (funções executáveis) com explicações detalhadas e exemplos  
  - Primitivas do Cliente: Amostragem (completions LLM), Elicitação (entrada do usuário), Logging (depuração/monitoramento)  
  - Atualizado com padrões atuais de métodos para descoberta (`*/list`), recuperação (`*/get`) e execução (`*/call`)  
- **Arquitetura do Protocolo**: Introduzido modelo de arquitetura em duas camadas  
  - Camada de Dados: Base JSON-RPC 2.0 com gerenciamento de ciclo de vida e primitivas  
  - Camada de Transporte: Mecanismos de transporte STDIO (local) e HTTP Streamable com SSE (remoto)  
- **Estrutura de Segurança**: Princípios abrangentes de segurança incluindo consentimento explícito do usuário, proteção da privacidade de dados, segurança na execução de ferramentas e segurança da camada de transporte  
- **Padrões de Comunicação**: Mensagens de protocolo atualizadas para mostrar fluxos de inicialização, descoberta, execução e notificação  
- **Exemplos de Código**: Exemplos multilíngues atualizados (.NET, Java, Python, JavaScript) para refletir padrões atuais do MCP SDK  

#### Segurança (02-Security/) - Reformulação Abrangente de Segurança  
- **Alinhamento com Normas**: Alinhamento total com os requisitos de segurança da Especificação MCP 2025-06-18  
- **Evolução da Autenticação**: Documentada evolução de servidores OAuth customizados para delegação via provedor externo de identidade (Microsoft Entra ID)  
- **Análise de Ameaças Específicas da IA**: Cobertura aprimorada dos vetores de ataque modernos em IA  
  - Cenários detalhados de ataques de injeção de prompt com exemplos do mundo real  
  - Mecanismos de envenenamento de ferramentas e padrões de ataque "rug pull"  
  - Envenenamento da janela de contexto e ataques de confusão do modelo  
- **Soluções de Segurança Microsoft para IA**: Cobertura abrangente do ecossistema de segurança Microsoft  
  - Escudos de Prompt de IA com técnicas avançadas de detecção, destaques e delimitadores  
  - Padrões de integração do Azure Content Safety  
  - Segurança Avançada GitHub para proteção da cadeia de suprimentos  
- **Mitigação Avançada de Ameaças**: Controles detalhados de segurança para  
  - Sequestro de sessão com cenários específicos MCP e requisitos criptográficos para IDs de sessão  
  - Problemas de deputada confusa em cenários proxy MCP com requisitos explícitos de consentimento  
  - Vulnerabilidades de token passthrough com controles obrigatórios de validação  
- **Segurança da Cadeia de Suprimentos**: Cobertura expandida da cadeia de suprimentos de IA incluindo modelos foundation, serviços de embeddings, provedores de contexto e APIs terceirizadas  
- **Segurança Foundation**: Integração aprimorada com padrões de segurança corporativa incluindo arquitetura zero trust e ecossistema de segurança Microsoft  
- **Organização de Recursos**: Links de recursos categorizados por tipo (Documentação Oficial, Padrões, Pesquisas, Soluções Microsoft, Guias de Implementação)  

### Melhorias na Qualidade da Documentação  
- **Objetivos de Aprendizagem Estruturados**: Objetivos de aprendizagem aprimorados com resultados específicos e acionáveis  
- **Referências Cruzadas**: Adicionados links entre tópicos relacionados de segurança e conceitos básicos  
- **Informação Atualizada**: Atualizadas todas as datas e links para especificações conforme padrões atuais  
- **Orientações de Implementação**: Adicionadas diretrizes específicas e práticas para implementação ao longo das duas seções  

## 16 de julho de 2025

### Melhorias no README e Navegação  
- Navegação do currículo totalmente redesenhada no README.md  
- Etiquetas `<details>` substituídas por formato baseado em tabelas mais acessível  
- Criadas opções alternativas de layout na nova pasta "alternative_layouts"  
- Adicionados exemplos de navegação em estilo cartas, abas e acordião  
- Atualizada a seção de estrutura do repositório para incluir todos os arquivos mais recentes  
- Melhorada a seção "Como Usar Este Currículo" com recomendações claras  
- Atualizados links da especificação MCP para URLs corretos  
- Adicionada seção de Engenharia de Contexto (5.14) à estrutura do currículo  

### Atualizações do Guia de Estudo  
- Guia de estudo totalmente revisado para alinhamento com a estrutura atual do repositório  
- Novas seções adicionadas para Clientes MCP e Ferramentas, e Servidores MCP Populares  
- Atualizado o Mapa Visual do Currículo para refletir todos os tópicos com precisão  
- Descrições aprimoradas dos Tópicos Avançados para cobrir todas as áreas especializadas  
- Atualizada a seção de Estudos de Caso para refletir exemplos reais  
- Adicionado este registro abrangente de alterações  

### Contribuições da Comunidade (06-CommunityContributions/)  
- Adicionadas informações detalhadas sobre servidores MCP para geração de imagens  
- Adicionada seção abrangente sobre uso de Claude no VSCode  
- Adicionadas instruções de configuração e uso do cliente terminal Cline  
- Atualizada seção de cliente MCP para incluir todas as opções populares de cliente  
- Exemplos de contribuição aprimorados com amostras de código mais precisas  

### Tópicos Avançados (05-AdvancedTopics/)  
- Pastas de tópicos especializados organizadas com nomenclatura consistente  
- Adicionados materiais e exemplos de engenharia de contexto  
- Documentação de integração do agente Foundry adicionada  
- Documentação de integração de segurança Entra ID aprimorada  

## 11 de junho de 2025

### Criação Inicial  
- Versão inicial do currículo MCP para Iniciantes lançada  
- Estrutura básica criada para todas as 10 seções principais  
- Implementado Mapa Visual do Currículo para navegação  
- Adicionados projetos amostra iniciais em múltiplas linguagens de programação  

### Começando (03-GettingStarted/)  
- Criados primeiros exemplos de implementação de servidor  
- Adicionadas orientações para desenvolvimento de cliente  
- Instruções para integração com cliente LLM incluídas  
- Documentação de integração VS Code adicionada  
- Exemplos de servidor Server-Sent Events (SSE) implementados  

### Conceitos Básicos (01-CoreConcepts/)  
- Explicação detalhada da arquitetura cliente-servidor adicionada  
- Documentação dos componentes principais do protocolo criada  
- Documentados padrões de mensagens no MCP  

## 23 de maio de 2025

### Estrutura do Repositório  
- Repositório inicializado com estrutura básica de pastas  
- Criados arquivos README para cada seção principal  
- Infraestrutura de tradução configurada  
- Adicionados ativos de imagem e diagramas  

### Documentação  
- README.md inicial criado com visão geral do currículo  
- Adicionados arquivos CODE_OF_CONDUCT.md e SECURITY.md  
- Configurado SUPPORT.md com orientações para obter ajuda  
- Estrutura preliminar do guia de estudo criada  

## 15 de abril de 2025

### Planejamento e Estrutura  
- Planejamento inicial para o currículo MCP para Iniciantes  
- Objetivos de aprendizagem e público-alvo definidos  
- Estrutura do currículo dividida em 10 seções delineada  
- Quadro conceitual desenvolvido para exemplos e estudos de caso  
- Protótipos iniciais de exemplos para conceitos chave criados  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->