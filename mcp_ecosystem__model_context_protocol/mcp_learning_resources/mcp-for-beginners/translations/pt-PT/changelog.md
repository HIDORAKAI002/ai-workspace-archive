# Registo de Alterações: Currículo MCP para Iniciantes

Este documento serve como um registo de todas as alterações significativas feitas ao currículo do Model Context Protocol (MCP) para Iniciantes. As alterações estão documentadas por ordem cronológica inversa (alterações mais recentes primeiro).

## 16 de junho de 2026

### Alinhamento da Especificação MCP & Validação de Exemplos

Validámos o currículo face à actual **Especificação MCP 2025-11-25** e aos SDKs oficiais mais recentes, depois corrigimos as restantes referências desactualizadas da especificação e confirmámos que os exemplos principais continuam a construir e a executar.

#### Correções da Versão da Especificação (2025-06-18 / 2025-03-26 → 2025-11-25)

Actualizámos o conteúdo em inglês onde ainda afirmava que revisões antigas da especificação eram o padrão *actual/mais recente*, e apontámos os links para os caminhos canónicos da especificação em `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Actualizado o banner "Current Standard", a introdução, o título dos princípios básicos de segurança, o título dos requisitos obrigatórios, a secção Microsoft Entra ID, os links Referências & Recursos, e o aviso final de segurança (8 referências) para 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Atualizado o link para a Especificação Recursos Adicionais e o banner "Current Standard" para 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Substituído o link desatualizado `2025-03-26` de segurança e confiança pela página atual de melhores práticas de segurança 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Atualizado o link oficial dos documentos de amostragem para 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Atualizado a referência em tempo presente da "especificação MCP actual" e o link para a Especificação Recursos Adicionais para 2025-11-25 (notas históricas de descontinuação do SSE mantidas para precisão)

#### Validação dos Exemplos face aos SDKs Actuais

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolveu `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passou sem erros de tipagem — as APIs existentes `McpServer`/`StdioServerTransport` permanecem válidas
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validado num `.venv` isolado com `mcp[cli]` (1.27.2); `py_compile` passou e `FastMCP.list_tools()` devolveu correctamente as ferramentas `add` e `subtract`
- Confirmado que todas as faixas de versões do `@modelcontextprotocol/sdk` nos exemplos (`>=1.26.0` / `^1.26.0` / `^1.27.0`) resolvem limpidamente para a actual `1.29.0` sem alterações incompatíveis de API

#### Alinhamento das Versões das Dependências (fechando lacunas)

Actualizámos os pinos de SDKs desactualizados para que cada exemplo acompanhe a versão actual do MCP, correspondendo à convenção do repositório:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Subiu `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` e actualizou a descrição stale do pacote `"updated for MCP 2025-06-18"` para `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** e **lab4/code/github_mcp_server/pyproject.toml**: Subiu o pino exacto `mcp==1.23.0` → `mcp>=1.26.0`; regenerados os ficheiros `uv.lock` (`uv lock`) para que os lockfiles resolvam para o `mcp 1.27.2` actual e permaneçam sincronizados com os manifestos

#### Análise de Lacunas do Currículo — Cobertura das Funcionalidades da Especificação Mais Recente

Verificámos que o currículo já cobre todos os primitivos introduzidos/expandido no MCP 2025-11-25, pelo que não restam lacunas de conteúdo:
- **Amostragem**: Lição 03-GettingStarted/14-sampling mais 05-AdvancedTopics/mcp-sampling
- **Elicitação (incluindo modo URL)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Raízes**: Documentado em 00-Introduction, 01-CoreConcepts, e 05-AdvancedTopics/mcp-root-contexts
- **Tarefas (experimental, operações de longa duração)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Anotações de Ferramenta** (`readOnlyHint` / `destructiveHint`): Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features

### Reforço de Segurança & Remediação de Vulnerabilidades nas Dependências

Executámos uma verificação completa de segurança em todos os manifestos de dependências e no código fonte dos exemplos, depois remediámos todas as notificações npm reportadas e um problema a nível de código. Após remediação, `npm audit` reporta **0 vulnerabilidades** em todas as pastas auditadas.

#### Vulnerabilidades nas Dependências npm (transitivas) — Corrigidas

Auditaram-se todos os 15 ficheiros `package-lock.json` entregues. As vulnerabilidades limitavam-se a dependências transitivas trazidas pela ferramenta de desenvolvimento MCP Inspector, pelo cliente OpenAI, e pelo SDK MCP; todas estão agora resolvidas sem quebrar os exemplos:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** e **lab3/code/weather_mcp/inspector**: Subiu `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), o que eliminou os avisos dos pacotes embalados `ajv`, `brace-expansion`, `diff`, `path-to-regexp` e `ws`. Foi adicionada uma entrada de `overrides` no npm forçando a versão corrigida `shell-quote@1.8.4` para eliminar o aviso crítico restante trazido pelo `concurrently`; ambos os lockfiles foram regenerados (agora 0 vulnerabilidades)
- **03-GettingStarted/samples/typescript**: `npm audit fix` atualizou a dependência transitiva `qs` (moderada) para uma versão corrigida
- **03-GettingStarted/samples/javascript**: `npm audit fix` atualizou a dependência transitiva `hono` (moderada) para uma versão corrigida
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` atualizou a dependência transitiva `form-data` (alta) para uma versão corrigida
- **03-GettingStarted/11-simple-auth/solution/typescript**: Gerado o `package-lock.json` em falta para que o projeto seja reprodutível e auditável (0 vulnerabilidades)

#### Correção de Segurança a Nível de Código (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Removido `shell=True` na ferramenta `open_in_vscode`. O anterior `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitia que metacaracteres do shell num caminho de pasta fossem interpretados pelo `cmd.exe` (vetor de injeção de comandos). Agora lança directamente o `Code.exe` resolvido com a pasta como argumento — sem shell — o que é funcionalmente equivalente e seguro

#### Auditoria das Dependências Python

- Auditaram-se todos os conjuntos de requisitos Python com `pip-audit`. O `05-AdvancedTopics` e `03-GettingStarted/samples/python` reportaram **nenhuma vulnerabilidade conhecida** (as suas versões de `mcp` / `httpx` / `pydantic` / `python-dotenv` resolvem para lançamentos corrigidos actuais)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` sinalizou a dependência transitiva **`werkzeug` 3.1.1** com três avisos de DoS `safe_join` relacionados com nomes de dispositivos do Windows — `CVE-2025-66221`, `CVE-2026-21860`, e `CVE-2026-27199` (todos corrigidos na 3.1.6). Foi adicionado um pino de segurança explícito `werkzeug>=3.1.6` para que a versão corrigida seja resolvida; verificado que a restrição resolve limpidamente com a stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding do Nome do Produto

Actualizámos todo o conteúdo do currículo para reflectir o rebranding dos produtos da Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Link da comunidade Discord actualizado
- **AGENTS.md**: Referência ao servidor Discord actualizada
- **README.md**: Referências ao ecossistema tecnológico actualizadas
- **study_guide.md**: Referências a estudos de caso atualizadas
- **05-AdvancedTopics/README.md**: Título e descrição do Módulo 5.13 actualizados
- **05-AdvancedTopics/mcp-integration/README.md**: Cabeçalho e descrição da secção actualizados
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Atualização completa do título e conteúdo do módulo
- **05-AdvancedTopics/mcp-security-entra/README.md**: Link de referência cruzada atualizado
- **07-LessonsfromEarlyAdoption/README.md**: Referências a estudos de caso atualizadas
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Cabeçalho da Secção 9, distintivos e capacidades atualizados
- **08-BestPractices/README.md**: Link da comunidade Discord atualizado
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Referência ao canal Discord atualizada
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Referência ao deployment do modelo atualizada
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Tabela de Serviços AI atualizada
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Referências aos recursos actualizadas

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension para VS Code
- **README.md**: Referências principais do currículo atualizadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Título do módulo, visão geral e todos os cabeçalhos de módulo atualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Título, objetivos de aprendizagem, instruções de configuração e recursos atualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Título, objetivos de aprendizagem, tabela de hosts MCP e referências cruzadas atualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Título, distintivos, pré-requisitos e recursos atualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Referências ao Agent Builder e link para feedback atualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Pré-requisitos e referências à extensão atualizados

---

## 11 de abril de 2026

### Nova Lição, Correções de Documentação e Atualizações de Dependências

#### Novo Conteúdo do Currículo Adicionado

**Módulo 05 - Tópicos Avançados**
- **Lição 5.17: Raciocínio Multi-Agente Adversarial com MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Novo guia abrangente cobrindo o padrão de debate adversarial para sistemas multi-agente
  - Diagrama de arquitetura Mermaid: dois agentes → servidor MCP partilhado → transcrição do debate → juiz → veredicto
  - Servidor MCP de ferramentas partilhado (`web_search` + `run_python`) implementado em Python e TypeScript
  - Prompts do sistema opostos (A FAVOR / CONTRA / Juiz) com requisitos explícitos de uso de ferramentas
  - Orquestrador do debate em Python, TypeScript, e C# gerindo rondas e encaminhamento de argumentos
  - Ligação MCP `ClientSession` para o orquestrador para chamadas reais às ferramentas
  - Tabela de casos de uso (detecção de alucinação, modelação de ameaças, revisão de design de API, verificação factual, seleção tecnológica)
  - Considerações de segurança: execução em sandbox, validação de chamadas de ferramenta, limitação de taxa, registo de auditoria
  - Exercício estruturado com três cenários práticos (revisão de código, decisão arquitectural, moderação de conteúdo)

#### Correções na Documentação

**Módulo 03 - Primeiros Passos**
- **05-stdio-server/README.md**: Corrigido exemplo incompleto do servidor stdio TypeScript — adicionada a instância ausente do transporte (`new StdioServerTransport()`) e chamada `server.connect(transport)` para corresponder aos exemplos Python e .NET na mesma secção
- **14-sampling/README.md**: Corrigido erro tipográfico — corrigido `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Atualizações do Currículo

**README.md principal**
- Adicionada a entrada 5.17 (Raciocínio Multi-Agente Adversarial com MCP) à tabela do currículo com um link directo para a nova lição

**05-AdvancedTopics/README.md**
- Adicionada a linha da lição 5.17 à tabela de lições

**study_guide.md**
- Adicionado o tópico Raciocínio Multi-Agente Adversarial ao mapa mental e descrição em prosa de Tópicos Avançados

#### Correções de Código e Segurança

**Módulo 05 - Agentes Adversariais (`mcp-adversarial-agents`)**
- **Correção de segurança — injeção de comandos**: Substituída interpolação shell `execSync` pela combinação `execFile` + `promisify` na ferramenta TypeScript `run_python`, eliminando a superfície de injeção de comandos (o código controlado pelo LLM é agora passado como um elemento argv literal sem qualquer envolvimento de shell)
- **Fiação do loop da ferramenta MCP**: Atualizado o orquestrador de debate Python para usar o cliente `AsyncAnthropic` (substituindo o bloqueio síncrono `Anthropic`), passar diretamente uma `ClientSession` ativa para cada turno do agente, buscar definições de ferramenta via `session.list_tools()` a cada turno, e despachar blocos `tool_use` através de `session.call_tool()` num loop até o modelo emitir uma resposta final de texto

#### Atualizações de Dependências

- Atualizado `hono` para 4.12.12 em vários pacotes (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Atualizado `@hono/node-server` de 1.19.11 para 1.19.13 em pacotes TypeScript
- Atualizado `cryptography` de 46.0.5 para 46.0.7 em pacotes Python (labs 3 e 4 em 10-StreamliningAIWorkflows)
- Atualizado `lodash` de 4.17.23 para 4.18.1 no inspector de 10-StreamliningAIWorkflows

#### Traduções

- Sincronizadas traduções para mais de 48 línguas com as últimas mudanças na fonte (atualização i18n)

---

## 5 de Fevereiro de 2026

### Melhoria na Validação e Navegação em Todo o Repositório

#### Novo Conteúdo Curricular Adicionado

**Módulo 03 - Introdução**
- **12-mcp-hosts/README.md**: Novo guia abrangente para configurar hosts MCP
  - Exemplos de configuração para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelos de configuração JSON para todos os hosts principais
  - Tabela comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Resolução de problemas comuns de conexão
  - Melhores práticas de segurança para configuração de hosts

- **13-mcp-inspector/README.md**: Novo guia de debugging para o MCP Inspector
  - Métodos de instalação (npx, npm global, a partir do código fonte)
  - Ligação a servidores via stdio e HTTP/SSE
  - Teste de ferramentas, recursos e fluxos de trabalho de prompts
  - Integração com VS Code com MCP Inspector
  - Cenários comuns de debugging com soluções

**Módulo 04 - Implementação Prática**
- **pagination/README.md**: Novo guia para implementação de paginação
  - Padrões de paginação baseados em cursor em Python, TypeScript, Java
  - Manuseamento da paginação no cliente
  - Estratégias de design de cursor (opaco vs. estruturado)
  - Recomendações para otimização de desempenho

**Módulo 05 - Temas Avançados**
- **mcp-protocol-features/README.md**: Novo aprofundamento em funcionalidades do protocolo
  - Implementação de notificações de progresso
  - Padrões de cancelamento de pedidos
  - Modelos de recursos com padrões URI
  - Gestão do ciclo de vida do servidor
  - Controlo do nível de registo de logs
  - Padrões de tratamento de erros com códigos JSON-RPC

#### Correções de Navegação (24+ ficheiros atualizados)

**README dos principais módulos**
 Agora liga tanto à primeira lição COMO ao próximo módulo

**Subficheiros de 02-Security**
- Os 5 documentos suplementares de segurança têm agora navegação "O que vem a seguir":

**Ficheiros de 09-CaseStudy**
- Todos os ficheiros de estudo de caso têm navegação sequencial:

**Labs de 10-StreamliningAI**
Adicionada secção "O que vem a seguir" ao resumo do Módulo 10 e ao Módulo 11

#### Correções de Código e Conteúdo

**Atualizações do SDK e Dependências**
Corrigida a versão vazia do openai para `^4.95.0`
Atualizado SDK de `^1.8.0` para `>=1.26.0`
Atualizados os pinos de versão do mcp para `>=1.26.0`

**Correções de Código**
Corrigido modelo inválido `gpt-4o-mini` para `gpt-4.1-mini`

**Correções de Conteúdo**
Corrigido link partido `READMEmd` → `README.md`, corrigido cabeçalho do currículo `Module 1-3` → `Module 0-3`, corrigido caminho sensível a maiúsculas
Removido conteúdo duplicado e corrompido do Estudo de Caso 5

**Melhorias na Orientação para Iniciantes**
Adicionada apresentação adequada, objetivos de aprendizagem e pré-requisitos para iniciantes

#### Atualizações do Currículo

**README principal**
- Adicionadas entradas 3.12 (Hosts MCP), 3.13 (Inspector MCP), 4.1 (Paginação), 5.16 (Funcionalidades do Protocolo) à tabela do currículo

**README dos Módulos**
Adicionadas lições 12 e 13 à lista de lições
Adicionada secção Guias Práticos com link para paginação
Adicionadas lições 5.15 (Transporte Personalizado) e 5.16 (Funcionalidades do Protocolo)

**study_guide.md**
- Mapa mental atualizado com todos os novos tópicos: Configuração de Hosts MCP, Inspector MCP, Estratégias de Paginação, Aprofundamento em Funcionalidades do Protocolo

## 28 de Janeiro de 2026

### Revisão de Conformidade com a Especificação MCP 2025-11-25

#### Aprimoramento dos Conceitos Base (01-CoreConcepts/)
- **Nova Primitiva Cliente - Roots**: Adicionada documentação abrangente sobre a primitiva cliente Roots, permitindo aos servidores compreender limites do sistema de ficheiros e permissões de acesso
- **Anotações de Ferramentas**: Documentação adicionada sobre anotações comportamentais das ferramentas (`readOnlyHint`, `destructiveHint`) para melhores decisões de execução das ferramentas
- **Chamada de Ferramentas na Amostragem**: Atualização na documentação da Amostragem para incluir parâmetros `tools` e `toolChoice` para invocação de ferramentas guiada pelo modelo durante pedidos de amostragem
- **Elaboração de Modo URL**: Documentação adicionada sobre elicitação baseada em URL para interações web externas iniciadas pelo servidor
- **Tarefas (Experimental)**: Nova secção documentando a funcionalidade experimental Tarefas para invólucros de execução durável e recuperação adiada de resultados
- **Suporte a Ícones**: Indicada possibilidade de que ferramentas, recursos, modelos de recursos e prompts possam agora incluir ícones como metadados adicionais

#### Atualizações da Documentação
- **README.md**: Adicionada referência à versão da Especificação MCP 2025-11-25 e explicação de versionamento baseado na data
- **study_guide.md**: Mapa curricular atualizado para incluir Tarefas e Anotações de Ferramentas na secção Conceitos Base; timestamp do documento atualizado

#### Verificação de Conformidade com a Especificação
- **Versão do Protocolo**: Confirmado que toda a documentação refere a atual Especificação MCP 2025-11-25
- **Alinhamento Arquitetural**: Confirmada a precisão da documentação da arquitetura em duas camadas (Camada de Dados + Camada de Transporte)
- **Documentação das Primitivas**: Validado documentação das primitivas do servidor (Recursos, Prompts, Ferramentas) e primitivas do cliente (Amostragem, Elicitação, Logging, Roots)
- **Mecanismos de Transporte**: Verificada a precisão da documentação de transporte STDIO e HTTP com streaming
- **Orientação de Segurança**: Confirmado alinhamento com as Melhores Práticas de Segurança MCP atuais

#### Funcionalidades Principais MCP 2025-11-25 Documentadas
- **Descoberta OpenID Connect**: Descoberta do servidor de autenticação via OIDC
- **Documentos de Metadados OAuth Client ID**: Mecanismo recomendado de registo de clientes
- **JSON Schema 2020-12**: Dialeto padrão para definições do esquema MCP
- **Sistema de Níveis do SDK**: Requisitos formalizados para suporte e manutenção de funcionalidades do SDK
- **Estrutura de Governação**: Formalização de Grupos de Trabalho e Grupos de Interesse na governação MCP

### Grande Atualização na Documentação de Segurança (02-Security/)

#### Integração do Workshop MCP Security Summit (Sherpa)
- **Novo Recurso de Formação Prática**: Integração abrangente adicionada ao longo de toda a documentação de segurança com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- **Cobertura do Percurso da Expedição**: Documentado o progresso completo de campo a campo desde o Campo Base até ao Cume
- **Alinhamento com OWASP**: Toda a orientação de segurança agora mapeada para os riscos OWASP MCP Azure Security Guide

#### Integração OWASP MCP Top 10
- **Nova Secção**: Adicionada tabela dos 10 maiores riscos de segurança OWASP MCP com mitigações Azure ao README principal de Segurança
- **Documentação Baseada em Riscos**: mcp-security-controls-2025.md atualizado com referências OWASP MCP para cada domínio de segurança
- **Arquitetura de Referência**: Ligação ao guia de arquitetura de referência e padrões de implementação OWASP MCP Azure Security Guide

#### Ficheiros de Segurança Atualizados
- **README.md**: Adicionado resumo do Workshop Sherpa, tabela do percurso da expedição, resumo dos riscos OWASP MCP Top 10 e secção de formação prática
- **mcp-security-controls-2025.md**: Cabeçalho atualizado para fevereiro de 2026, adicionadas referências a riscos OWASP (MCP01-MCP08), corrigida inconsistência de versão da especificação
- **mcp-security-best-practices-2025.md**: Adicionada secção de recursos Sherpa e OWASP, timestamp atualizado
- **mcp-best-practices.md**: Adicionada secção de formação prática com ligações a Sherpa e OWASP
- **azure-content-safety-implementation.md**: Adicionada referência OWASP MCP06, alinhamento com Sherpa Camp 3 e secção de recursos adicionais

#### Novos Links de Recursos Adicionados
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuais dos riscos OWASP MCP (MCP01-MCP10)

### Alinhamento Curricular com a Especificação MCP 2025-11-25

#### Módulo 03 - Introdução
- **Documentação do SDK**: Adicionado Go SDK à lista oficial do SDK; atualizadas todas as referências do SDK para se alinharem com a Especificação MCP 2025-11-25
- **Esclarecimento de Transporte**: Atualizada descrição dos transportes STDIO e HTTP Streaming com referências explícitas à especificação

#### Módulo 04 - Implementação Prática
- **Atualizações do SDK**: Adicionado Go SDK; lista de SDK atualizada com referência à versão da especificação
- **Especificação de Autorização**: Atualizado link da especificação MCP de Autorização para a versão atual 2025-11-25

#### Módulo 05 - Temas Avançados
- **Novas Funcionalidades**: Adicionada nota sobre novas funcionalidades da Especificação MCP 2025-11-25 (Tarefas, Anotações de Ferramentas, Elicitação de Modo URL, Roots)
- **Recursos de Segurança**: Adicionadas ligações OWASP MCP Top 10 e workshop Sherpa a referências adicionais

#### Módulo 06 - Contribuições da Comunidade
- **Lista do SDK**: Adicionados SDKs Swift e Rust; link da especificação atualizado para 2025-11-25
- **Referência da Especificação**: Link atualizado para o URL direto da Especificação MCP

#### Módulo 07 - Lições da Adoção Inicial
- **Atualizações de Recursos**: Adicionados links da Especificação MCP 2025-11-25 e OWASP MCP Top 10 a recursos adicionais

#### Módulo 08 - Melhores Práticas
- **Versão da Especificação**: Referência da Especificação MCP atualizada para 2025-11-25
- **Recursos de Segurança**: Adicionados OWASP MCP Top 10 e workshop Sherpa a referências adicionais

#### Módulo 10 - Otimização de Fluxos de Trabalho AI
- **Atualização de Badge**: Alterado badge da versão MCP de versão do SDK (1.9.3) para versão da especificação (2025-11-25)
- **Links de Recursos**: Atualizado link da Especificação MCP; adicionada OWASP MCP Top 10

#### Módulo 11 - Laboratórios Hands-On do Servidor MCP
- **Referência da Especificação**: Link da Especificação MCP atualizado para a versão 2025-11-25
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 a recursos oficiais

## 18 de Dezembro de 2025

### Atualização da Documentação de Segurança - Especificação MCP 2025-11-25

#### Melhores Práticas de Segurança MCP (02-Security/mcp-best-practices.md) - Atualização da Versão da Especificação
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a mais recente Especificação MCP 2025-11-25 (lançada a 25 de novembro de 2025)
  - Atualizadas todas as referências da versão da especificação de 2025-06-18 para 2025-11-25
  - Atualizadas datas no documento de 18 de agosto de 2025 para 18 de dezembro de 2025
  - Verificado que todas as URLs da especificação apontam para documentação atual
- **Validação de Conteúdo**: Validação abrangente das melhores práticas de segurança segundo os mais recentes padrões
  - **Soluções de Segurança Microsoft**: Verificada terminologia e links atuais para Escudos de Prompt (anteriormente "detecção de risco de Jailbreak"), Segurança de Conteúdo Azure, Microsoft Entra ID e Azure Key Vault
  - **Segurança OAuth 2.1**: Confirmado alinhamento com as melhores práticas de segurança OAuth mais recentes
  - **Normas OWASP**: Validada atualidade das referências OWASP Top 10 para LLMs
  - **Serviços Azure**: Verificados todos os links e melhores práticas do Microsoft Azure
- **Alinhamento a Normas**: Confirmado atualidade de todas as normas de segurança referenciadas
  - Quadro NIST para Gestão de Risco de IA
  - ISO 27001:2022
  - Melhores práticas de segurança OAuth 2.1
  - Marcos regulatórios e de conformidade Azure
- **Recursos de Implementação**: Verificados todos os links e recursos do guia de implementação
  - Padrões de autenticação Azure API Management
  - Guias de integração Microsoft Entra ID
  - Gestão de segredos Azure Key Vault
  - Pipelines de DevSecOps e soluções de monitorização

### Garantia de Qualidade da Documentação
- **Conformidade com a Especificação**: Garantido que todos os requisitos obrigatórios MCP de segurança (OBRIGATÓRIO/PROIBIDO) estão alinhados com a mais recente especificação
- **Atualização de Recursos**: Verificados todos os links externos para documentação Microsoft, normas de segurança e guias de implementação
- **Cobertura das Melhores Práticas**: Confirmada cobertura abrangente de autenticação, autorização, ameaças específicas de IA, segurança da cadeia de fornecimento e padrões empresariais

## 6 de Outubro de 2025

### Expansão da Secção Iniciar – Uso Avançado do Servidor & Autenticação Simples

#### Uso Avançado do Servidor (03-GettingStarted/10-advanced)
- **Novo Capítulo Adicionado**: Introduzido guia abrangente para uso avançado do servidor MCP, cobrindo arquiteturas de servidor regulares e de baixo nível.
  - **Servidor Regular vs. Baixo Nível**: Comparação detalhada e exemplos de código em Python e TypeScript para ambas as abordagens.
  - **Design Baseado em Handlers**: Explicação da gestão baseada em handlers para ferramentas/recursos/prompts para implementações escaláveis e flexíveis do servidor.
  - **Padrões Práticos**: Cenários reais onde padrões de servidor de baixo nível são benéficos para funcionalidades avançadas e arquitetura.
#### Autenticação Simples (03-GettingStarted/11-simple-auth)
- **Novo Capítulo Adicionado**: Guia passo a passo para implementar autenticação simples em servidores MCP.
  - **Conceitos de Autenticação**: Explicação clara sobre autenticação vs. autorização e gestão de credenciais.
  - **Implementação Básica de Autenticação**: Padrões de autenticação baseados em middleware em Python (Starlette) e TypeScript (Express), com exemplos de código.
  - **Progressão para Segurança Avançada**: Orientações para começar com autenticação simples e avançar para OAuth 2.1 e RBAC, com referências a módulos de segurança avançada.

Estas adições fornecem orientações práticas e diretas para construir implementações de servidores MCP mais robustas, seguras e flexíveis, ligando conceitos fundamentais a padrões avançados de produção.

## 29 de setembro de 2025

### Laboratórios de Integração de Base de Dados do Servidor MCP – Caminho Completo de Aprendizagem Prática

#### 11-MCPServerHandsOnLabs – Novo Currículo Completo de Integração de Base de Dados
- **Caminho de Aprendizagem Completo com 13 Laboratórios**: Adicionado currículo prático abrangente para construir servidores MCP prontos para produção com integração de base de dados PostgreSQL
  - **Implementação do Mundo Real**: Caso de uso de análise Zava Retail demonstrando padrões de nível empresarial
  - **Progressão Estruturada de Aprendizagem**:
    - **Laboratórios 00-03: Fundamentos** – Introdução, Arquitetura Principal, Segurança e Multi-Tenancy, Configuração do Ambiente
    - **Laboratórios 04-06: Construção do Servidor MCP** – Design e Esquema da Base de Dados, Implementação do Servidor MCP, Desenvolvimento de Ferramentas
    - **Laboratórios 07-09: Funcionalidades Avançadas** – Integração de Pesquisa Semântica, Testes & Depuração, Integração com VS Code
    - **Laboratórios 10-12: Produção e Boas Práticas** – Estratégias de Deploy, Monitorização & Observabilidade, Boas Práticas & Otimização
  - **Tecnologias Empresariais**: Framework FastMCP, PostgreSQL com pgvector, embeddings Azure OpenAI, Azure Container Apps, Application Insights
  - **Funcionalidades Avançadas**: Row Level Security (RLS), pesquisa semântica, acesso a dados multi-inquilino, embeddings vetoriais, monitorização em tempo real

#### Padronização de Terminologia – Conversão de Módulo para Laboratório
- **Atualização Abrangente da Documentação**: Atualizados sistematicamente todos os ficheiros README em 11-MCPServerHandsOnLabs para usar terminologia "Laboratório" em vez de "Módulo"
  - **Cabeçalhos de Secção**: Atualizado “O que este módulo cobre” para “O que este laboratório cobre” em todos os 13 laboratórios
  - **Descrição do Conteúdo**: Alterado “Este módulo fornece...” para “Este laboratório fornece...” por toda a documentação
  - **Objetivos de Aprendizagem**: Atualizado “No final deste módulo...” para “No final deste laboratório...”
  - **Links de Navegação**: Convertidas todas as referências “Módulo XX:” para “Laboratório XX:” em referências cruzadas e navegação
  - **Registo de Conclusão**: Atualizado “Após concluir este módulo...” para “Após concluir este laboratório...”
  - **Referências Técnicas Preservadas**: Mantidas referências a módulos Python em ficheiros de configuração (ex.: `"module": "mcp_server.main"`)

#### Melhoria do Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Adicionada nova secção “11. Laboratórios de Integração de Base de Dados” com visualização completa da estrutura dos laboratórios
- **Estrutura do Repositório**: Atualizado de dez para onze secções principais com descrição detalhada do 11-MCPServerHandsOnLabs
- **Orientações do Percurso de Aprendizagem**: Melhoradas instruções de navegação para cobrir as secções 00-11
- **Cobertura Tecnológica**: Adicionadas informações sobre FastMCP, PostgreSQL, integração de serviços Azure
- **Resultados de Aprendizagem**: Enfatizado desenvolvimento de servidores prontos para produção, padrões de integração de base de dados e segurança empresarial

#### Melhoria da Estrutura do README Principal
- **Terminologia Baseada em Laboratórios**: Atualizado README.md principal em 11-MCPServerHandsOnLabs para uso consistente da estrutura “Laboratório”
- **Organização do Percurso de Aprendizagem**: Progressão clara desde conceitos fundamentais até implementação avançada e deploy em produção
- **Foco no Mundo Real**: Ênfase em aprendizagem prática com padrões e tecnologias de nível empresarial

### Melhorias de Qualidade e Consistência na Documentação
- **Ênfase na Aprendizagem Prática**: Reforçado enfoque prático baseado em laboratórios na documentação
- **Foco em Padrões Empresariais**: Destacado implementação pronta para produção e considerações de segurança empresarial
- **Integração Tecnológica**: Cobertura abrangente dos serviços Azure modernos e padrões de integração AI
- **Progressão de Aprendizagem**: Caminho claro e estruturado de conceitos básicos até deploy em produção

## 26 de setembro de 2025

### Melhoria dos Estudos de Caso – Integração do GitHub MCP Registry

#### Estudos de Caso (09-CaseStudy/) – Foco no Desenvolvimento do Ecossistema
- **README.md**: Expansão significativa com estudo de caso abrangente do GitHub MCP Registry
  - **Estudo de Caso do GitHub MCP Registry**: Novo estudo de caso completo analisando o lançamento do GitHub MCP Registry em setembro de 2025
    - **Análise do Problema**: Exame detalhado dos desafios fragmentados na descoberta e deploy de servidores MCP
    - **Arquitetura da Solução**: Abordagem de registo centralizado do GitHub com instalação VS Code com um clique
    - **Impacto Empresarial**: Melhorias mensuráveis na integração e produtividade dos desenvolvedores
    - **Valor Estratégico**: Foco no deploy modular de agentes e interoperabilidade entre ferramentas
    - **Desenvolvimento do Ecossistema**: Posicionamento como plataforma fundamental para integração agentic
  - **Estrutura Aprimorada dos Estudos de Caso**: Atualizados os sete estudos de caso com formatação consistente e descrições abrangentes
    - Azure AI Travel Agents: Ênfase na orquestração multiagente
    - Integração Azure DevOps: Foco em automação de workflows
    - Recuperação de Documentação em Tempo Real: Implementação de cliente consola Python
    - Gerador de Plano de Estudo Interativo: Aplicação conversacional Chainlit web
    - Documentação In-Editor: Integração VS Code e GitHub Copilot
    - Gestão de API Azure: Padrões de integração enterprise API
    - GitHub MCP Registry: Desenvolvimento do ecossistema e plataforma comunitária
  - **Conclusão Abrangente**: Secção de conclusão reescrita destacando sete estudos cobrindo múltiplas dimensões de implementação MCP
    - Integração Empresarial, Orquestração Multi-Agente, Produtividade do Desenvolvedor
    - Desenvolvimento do Ecossistema, Aplicações Educacionais categorizadas
    - Insights aprofundados em padrões arquitetónicos, estratégias de implementação e melhores práticas
    - Ênfase no MCP como protocolo maduro e pronto para produção

#### Atualizações no Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Atualizado mindmap para incluir GitHub MCP Registry na secção de Estudos de Caso
- **Descrição dos Estudos de Caso**: Melhorada de descrições genéricas para análise detalhada dos sete estudos abrangentes
- **Estrutura do Repositório**: Atualizada a secção 10 para refletir cobertura abrangente dos estudos de caso com detalhes específicos de implementação
- **Integração no Changelog**: Adicionada entrada de 26 de setembro de 2025 documentando adição do GitHub MCP Registry e melhorias nos estudos de caso
- **Atualização da Data**: Atualizado timestamp do footer para refletir a revisão mais recente (26 de setembro de 2025)

### Melhorias na Qualidade da Documentação
- **Melhoria na Consistência**: Formatação e estrutura padronizadas dos estudos de caso em todos os sete exemplos
- **Cobertura Abrangente**: Estudos de caso agora abrangem cenários empresariais, produtividade do desenvolvedor e desenvolvimento de ecossistemas
- **Posicionamento Estratégico**: Foco melhorado no MCP como plataforma base para deployment de sistemas agentic
- **Integração de Recursos**: Atualizados recursos adicionais para incluir link do GitHub MCP Registry

## 15 de setembro de 2025

### Expansão de Tópicos Avançados – Transportes Personalizados e Engenharia de Contexto

#### Transportes Personalizados MCP (05-AdvancedTopics/mcp-transport/) – Novo Guia de Implementação Avançada
- **README.md**: Guia completo de implementação para mecanismos de transporte MCP personalizados
  - **Transporte Azure Event Grid**: Implementação detalhada de transporte serverless orientado a eventos
    - Exemplos em C#, TypeScript e Python com integração Azure Functions
    - Padrões arquitetónicos orientados a eventos para soluções MCP escaláveis
    - Receptores webhook e processamento de mensagens push
  - **Transporte Azure Event Hubs**: Implementação de transporte streaming de alta vazão
    - Capacidades de streaming em tempo real para cenários de baixa latência
    - Estratégias de partição e gestão de checkpoints
    - Agrupamento de mensagens e otimização de desempenho
  - **Padrões de Integração Empresarial**: Exemplos arquitetónicos prontos para produção
    - Processamento MCP distribuído em várias Azure Functions
    - Arquiteturas híbridas de transporte combinando múltiplos tipos de transporte
    - Durabilidade, fiabilidade e estratégias de tratamento de erros de mensagens
  - **Segurança e Monitorização**: Integração Azure Key Vault e padrões de observabilidade
    - Autenticação por identidade gerida e acesso com privilégio mínimo
    - Telemetria Application Insights e monitorização de desempenho
    - Circuit breakers e padrões de tolerância a falhas
  - **Frameworks de Testes**: Estratégias abrangentes para testes de transportes personalizados
    - Testes unitários com mocks e doubles
    - Testes de integração com Azure Test Containers
    - Considerações sobre testes de desempenho e carga

#### Engenharia de Contexto (05-AdvancedTopics/mcp-contextengineering/) – Disciplina Emergente da IA
- **README.md**: Exploração abrangente da engenharia de contexto como área emergente
  - **Princípios Centrais**: Partilha completa de contexto, consciencialização de decisão de ação e gestão da janela de contexto
  - **Alinhamento com o Protocolo MCP**: Como o design MCP aborda desafios da engenharia de contexto
    - Limitações da janela de contexto e estratégias de carregamento progressivo
    - Determinação de relevância e recuperação dinâmica de contexto
    - Gestão multimodal de contexto e considerações de segurança
  - **Abordagens de Implementação**: Arquiteturas single-thread vs. multi-agente
    - Técnicas de fragmentação e priorização do contexto
    - Carregamento progressivo e estratégias de compressão de contexto
    - Abordagens em camadas e otimização de recuperação
  - **Framework de Medição**: Métricas emergentes para avaliação da eficácia do contexto
    - Eficiência de input, desempenho, qualidade e experiência do utilizador
    - Abordagens experimentais para otimização de contexto
    - Análise de falhas e metodologias de melhoria
    
#### Atualizações de Navegação do Currículo (README.md)
- **Estrutura de Módulos Melhorada**: Atualizada tabela do currículo para incluir novos tópicos avançados
  - Adicionados Context Engineering (5.14) e Custom Transport (5.15)
  - Formatação consistente e links de navegação em todos os módulos
  - Descrições atualizadas para refletir o escopo atual do conteúdo

### Melhorias na Estrutura do Diretório
- **Padronização de Nomes**: Renomeado “mcp transport” para “mcp-transport” para consistência com outras pastas de tópicos avançados
- **Organização do Conteúdo**: Todas as pastas 05-AdvancedTopics seguem agora padrão consistente (mcp-[tópico])

### Melhorias na Qualidade da Documentação
- **Alinhamento com Especificação MCP**: Todo o novo conteúdo faz referência à Especificação MCP 2025-06-18 atual
- **Exemplos Multilinguagem**: Exemplos completos em C#, TypeScript e Python
- **Foco Empresarial**: Padrões prontos para produção e integração Azure cloud em todo o conteúdo
- **Documentação Visual**: Diagramas Mermaid para visualização da arquitetura e fluxos

## 18 de agosto de 2025

### Atualização Abrangente da Documentação – Normas MCP 2025-06-18

#### Melhores Práticas de Segurança MCP (02-Security/) – Modernização Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescrita completa alinhada com Especificação MCP 2025-06-18
  - **Requisitos Obrigatórios**: Adicionados requisitos explícitos MUST/MUST NOT da especificação oficial com indicadores visuais claros
  - **12 Práticas Core de Segurança**: Reestruturado de lista de 15 itens para domínios abrangentes de segurança
    - Segurança de Token & Autenticação com integração de provedores externos de identidade
    - Gestão de Sessão & Segurança de Transporte com requisitos criptográficos
    - Proteção Específica para IA com integração Microsoft Prompt Shields
    - Controlo de Acesso & Permissões com princípio do menor privilégio
    - Segurança de Conteúdo & Monitorização com integração Azure Content Safety
    - Segurança da Cadeia de Fornecimento com verificação abrangente de componentes
    - Segurança OAuth & Prevenção de Confused Deputy com implementação PKCE
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
    - Conformidade & Governança com alinhamento regulatório
    - Controles Avançados de Segurança com arquitetura zero trust
    - Integração com Ecossistema Microsoft Security com soluções abrangentes
    - Evolução Contínua de Segurança com práticas adaptativas
  - **Soluções Microsoft de Segurança**: Guia de integração otimizado para Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security
  - **Recursos de Implementação**: Links categorizados abrangentes por Documentação Oficial MCP, Soluções de Segurança Microsoft, Normas de Segurança e Guias de Implementação

#### Controles Avançados de Segurança (02-Security/) – Implementação Empresarial
- **MCP-SECURITY-CONTROLS-2025.md**: Revisão completa com framework de segurança empresarial de nível avançado
  - **9 Domínios Abrangentes de Segurança**: Expansão dos controlos básicos para framework empresarial detalhada
    - Autenticação & Autorizações Avançadas com integração Microsoft Entra ID
    - Segurança de Tokens & Controlos Anti-Passthrough com validação abrangente
    - Controlos de Segurança de Sessão com prevenção de hijacking
    - Controlos de Segurança Específicos para IA com prevenção de injeção de prompt e envenenamento de ferramentas
    - Prevenção de Ataque Confused Deputy com segurança proxy OAuth
    - Segurança de Execução de Ferramentas com sandboxing e isolamento
    - Controlos de Segurança da Cadeia de Fornecimento com verificação de dependências
    - Controlos de Monitorização & Deteção com integração SIEM
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
  - **Exemplos de Implementação**: Adicionados blocos YAML detalhados e exemplos de código
  - **Integração com Soluções Microsoft**: Cobertura abrangente dos serviços de segurança Azure, GitHub Advanced Security e gestão empresarial de identidade

#### Segurança em Tópicos Avançados (05-AdvancedTopics/mcp-security/) – Implementação Pronta para Produção
- **README.md**: Reescrita completa para implementação empresarial de segurança
  - **Alinhamento com a Especificação Atual**: Atualizado para Especificação MCP 2025-06-18 com requisitos de segurança obrigatórios
  - **Autenticação Avançada**: Integração Microsoft Entra ID com exemplos completos .NET e Java Spring Security
  - **Integração de Segurança IA**: Implementação Microsoft Prompt Shields e Azure Content Safety com exemplos Python detalhados
  - **Mitigação Avançada de Ameaças**: Exemplos completos de implementação para
    - Prevenção de Ataque Confused Deputy com PKCE e validação de consentimento do utilizador
    - Prevenção de Token Passthrough com validação de audiência e gestão segura de tokens
    - Prevenção de Hijacking de Sessão com binding criptográfico e análise comportamental
  - **Integração de Segurança Empresarial**: Monitorização Azure Application Insights, pipelines de deteção de ameaças e segurança da cadeia de fornecimento
  - **Lista de Verificação de Implementação**: Controlos de segurança obrigatórios vs. recomendados com benefícios do ecossistema Microsoft Security

### Qualidade da Documentação e Alinhamento às Normas
- **Referências da Especificação**: Atualizadas todas as referências para a Especificação MCP atual 2025-06-18  
- **Ecossistema de Segurança Microsoft**: Orientações de integração melhoradas em toda a documentação de segurança  
- **Implementação Prática**: Adicionados exemplos de código detalhados em .NET, Java e Python com padrões empresariais  
- **Organização dos Recursos**: Categorização abrangente da documentação oficial, normas de segurança e guias de implementação  
- **Indicadores Visuais**: Marcação clara de requisitos obrigatórios versus práticas recomendadas  


#### Conceitos Fundamentais (01-CoreConcepts/) - Modernização Completa  
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a Especificação MCP 2025-06-18 com versionamento baseado em data (formato YYYY-MM-DD)  
- **Refinamento da Arquitetura**: Descrições aprimoradas de Hosts, Clientes e Servidores para refletir padrões atuais da arquitetura MCP  
  - Hosts agora claramente definidos como aplicações de IA que coordenam múltiplas conexões de clientes MCP  
  - Clientes descritos como conectores do protocolo que mantêm relações um-para-um com servidores  
  - Servidores aprimorados com cenários de implantação local versus remota  
- **Reestruturação das Primitivas**: Revisão completa das primitivas de servidor e cliente  
  - Primitivas do Servidor: Recursos (fontes de dados), Prompts (modelos), Ferramentas (funções executáveis) com explicações detalhadas e exemplos  
  - Primitivas do Cliente: Amostragem (completamentos LLM), Elicitação (input do utilizador), Registo (debugging/monitorização)  
  - Atualizado com padrões atuais de métodos de descoberta (`*/list`), recuperação (`*/get`) e execução (`*/call`)  
- **Arquitetura do Protocolo**: Introdução de modelo de arquitetura em duas camadas  
  - Camada de Dados: Base JSON-RPC 2.0 com gestão do ciclo de vida e primitivas  
  - Camada de Transporte: STDIO (local) e HTTP Streaming com SSE (transporte remoto)  
- **Estrutura de Segurança**: Princípios de segurança abrangentes incluindo consentimento explícito do utilizador, proteção de privacidade de dados, segurança na execução de ferramentas, e segurança da camada de transporte  
- **Padrões de Comunicação**: Atualização das mensagens do protocolo para mostrar inicialização, descoberta, execução e fluxos de notificação  
- **Exemplos de Código**: Atualização dos exemplos multilíngues (.NET, Java, Python, JavaScript) para refletir os padrões atuais do SDK MCP  


#### Segurança (02-Security/) - Revisão Abrangente de Segurança  
- **Alinhamento com Normas**: Alinhamento completo com os requisitos de segurança da Especificação MCP 2025-06-18  
- **Evolução da Autenticação**: Documentada a evolução de servidores OAuth personalizados para delegação a provedores de identidade externos (Microsoft Entra ID)  
- **Análise de Ameaças Específicas de IA**: Cobertura melhorada dos vetores modernos de ataque em IA  
  - Cenários detalhados de ataques de injeção de prompt com exemplos reais  
  - Mecanismos de envenenamento de ferramentas e padrões de ataques "rug pull"  
  - Envenenamento da janela de contexto e ataques de confusão de modelo  
- **Soluções de Segurança Microsoft para IA**: Cobertura abrangente do ecossistema de segurança Microsoft  
  - Escudos de Prompt IA com técnicas avançadas de deteção, realce e delimitadores  
  - Padrões de integração do Azure Content Safety  
  - GitHub Advanced Security para proteção da cadeia de fornecimento  
- **Mitigação Avançada de Ameaças**: Controlo detalhado de segurança para  
  - Sequestro de sessão com cenários de ataque específicos ao MCP e requisitos criptográficos para IDs de sessão  
  - Problemas de procurador confundido em cenários de proxy MCP com requisitos de consentimento explícito  
  - Vulnerabilidades de passagem de token com controlos obrigatórios de validação  
- **Segurança da Cadeia de Fornecimento**: Expansão da cobertura da cadeia de fornecimento de IA incluindo modelos base, serviços de embeddings, fornecedores de contexto e APIs de terceiros  
- **Segurança na Fundação**: Integração aprimorada com padrões de segurança empresariais incluindo arquitetura zero trust e ecossistema de segurança Microsoft  
- **Organização de Recursos**: Categorias abrangentes de links de recursos por tipo (Documentação Oficial, Normas, Investigação, Soluções Microsoft, Guias de Implementação)  


### Melhorias na Qualidade da Documentação  
- **Objetivos de Aprendizagem Estruturados**: Objetivos aprimorados com resultados específicos e acionáveis  
- **Referências Cruzadas**: Adição de ligações entre tópicos relacionados de segurança e conceitos fundamentais  
- **Informação Atualizada**: Atualização de todas as datas e links de especificação para as normas atuais  
- **Orientação de Implementação**: Inclusão de diretrizes específicas e acionáveis em ambas as secções  


## 16 de julho de 2025  

### Melhorias no README e Navegação  
- Navegação do currículo completamente redesenhada em README.md  
- Substituição das tags `<details>` por formato de tabela mais acessível  
- Criação de opções de layout alternativas na nova pasta "alternative_layouts"  
- Adição de exemplos de navegação em formato de cartões, com separadores e acordeão  
- Atualização da secção de estrutura do repositório para incluir todos os ficheiros mais recentes  
- Melhoria da secção "Como Usar Este Currículo" com recomendações claras  
- Atualização dos links da especificação MCP para os URLs corretos  
- Inclusão da secção Engenharia de Contexto (5.14) na estrutura do currículo  


### Atualizações do Guia de Estudo  
- Revisão completa do guia de estudo para alinhamento com a estrutura atual do repositório  
- Inclusão de novas secções para Clientes MCP e Ferramentas, e Servidores MCP Populares  
- Atualização do Mapa Visual do Currículo para refletir com exatidão todos os tópicos  
- Aperfeiçoamento das descrições dos Tópicos Avançados para cobrir todas as áreas especializadas  
- Atualização da secção de Estudos de Caso para refletir exemplos reais  
- Adição deste registo abrangente de alterações  


### Contribuições da Comunidade (06-CommunityContributions/)  
- Inclusão de informações detalhadas sobre servidores MCP para geração de imagens  
- Adição de secção abrangente sobre utilização de Claude no VSCode  
- Adição de instruções de configuração e utilização do cliente de terminal Cline  
- Atualização da secção de clientes MCP para incluir todas as opções populares  
- Melhoria dos exemplos de contribuição com amostras de código mais precisas  


### Tópicos Avançados (05-AdvancedTopics/)  
- Organização de todas as pastas de tópicos especializados com nomenclatura consistente  
- Inclusão de materiais e exemplos de engenharia de contexto  
- Adição de documentação de integração com agente Foundry  
- Aperfeiçoamento da documentação de integração de segurança Entra ID  


## 11 de junho de 2025  

### Criação Inicial  
- Lançamento da primeira versão do currículo MCP para Iniciantes  
- Criação da estrutura básica para as 10 secções principais  
- Implementação do Mapa Visual do Currículo para navegação  
- Adição de projetos de amostra iniciais em múltiplas linguagens de programação  


### Primeiros Passos (03-GettingStarted/)  
- Criação dos primeiros exemplos de implementação de servidor  
- Inclusão de orientações para desenvolvimento de clientes  
- Inclusão de instruções para integração de clientes LLM  
- Adição de documentação de integração com VS Code  
- Implementação de exemplos de Servidor de Eventos Enviados pelo Servidor (SSE)  


### Conceitos Fundamentais (01-CoreConcepts/)  
- Adição de explicação detalhada da arquitetura cliente-servidor  
- Criação de documentação sobre componentes chave do protocolo  
- Documentação dos padrões de mensagens no MCP  


## 23 de maio de 2025  

### Estrutura do Repositório  
- Inicialização do repositório com estrutura básica de pastas  
- Criação de ficheiros README para cada secção principal  
- Configuração da infraestrutura de tradução  
- Adição de recursos gráficos e diagramas  


### Documentação  
- Criação do README.md inicial com visão geral do currículo  
- Adição dos ficheiros CODE_OF_CONDUCT.md e SECURITY.md  
- Configuração do SUPPORT.md com orientações para obtenção de ajuda  
- Criação da estrutura preliminar do guia de estudo  


## 15 de abril de 2025  

### Planeamento e Estrutura  
- Planeamento inicial para o currículo MCP para Iniciantes  
- Definição de objetivos de aprendizagem e público-alvo  
- Esboço da estrutura de 10 secções do currículo  
- Desenvolvimento do quadro conceptual para exemplos e estudos de caso  
- Criação dos exemplos protótipo iniciais para conceitos chave  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->