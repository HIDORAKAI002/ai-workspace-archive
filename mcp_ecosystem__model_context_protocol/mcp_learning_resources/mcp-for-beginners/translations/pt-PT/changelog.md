# Registo de alterações: Currículo MCP para Iniciantes

Este documento serve como registo de todas as alterações significativas feitas ao currículo Model Context Protocol (MCP) para Iniciantes. As alterações são documentadas por ordem cronológica inversa (alterações mais recentes primeiro).

## 2 de julho de 2026

### Nova Aula: Release Candidate da Especificação MCP 2026-07-28

Adicionada cobertura do próximo release candidate da especificação MCP `2026-07-28` (anunciado em 21 de maio de 2026; lançamento final planeado para 28 de julho de 2026), resumido a partir do [post oficial do anúncio](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). A base do currículo permanece como **Especificação MCP 2025-11-25** até que a nova versão seja lançada, por isso isto é apresentado como uma orientação futura em vez de uma reescrita das aulas existentes.

- **Novo**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — uma aula completa cobrindo o núcleo do protocolo sem estado (remoção do handshake `initialize` e `Mcp-Session-Id`), os novos cabeçalhos de roteamento `Mcp-Method`/`Mcp-Name`, metadados de cache `ttlMs`/`cacheScope`, W3C Trace Context em `_meta`, a estrutura formal de Extensões (Apps MCP e a nova extensão Tasks), seis SEPs para reforço de autorização, a descontinuação de Roots/Sampling/Logging, e a transição para JSON Schema 2020-12 completo para esquemas de ferramentas.
- **Atualizado** com chamadas para a nova aula:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): nota sobre a versão do protocolo, secções de Sampling/Roots/Logging/Tasks, e "O que vem a seguir"
  - [02-Security/README.md](./02-Security/README.md): chamada para reforço de autorização
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): chamada para transporte sem estado
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): chamada para descontinuação de Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): chamada para descontinuação de Logging e extensão Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): chamada para transporte sem estado/roteamento de sessão
  - [README.md](./README.md): nota "Olhando para o futuro" na secção da especificação e uma nova entrada `1.1` na tabela de módulos do currículo
  - [study_guide.md](./study_guide.md): ponto de visão futura sob a visão geral de Conceitos Fundamentais e uma nota aditiva datada
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): chamada sobre o mapa de transporte `mcp-session-id` antes do modelo de pedido sem estado
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): chamada de visão geral do módulo sobre as descontinuações de Root Contexts/Sampling e a extensão Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): chamada para reforço de autorização

## 24 de junho de 2026

### Nova Aula: Usar MCP na aplicação Copilot

- [Secção Ferramentas](./12-tooling/README.md) Adicionada secção de ferramentas.
- [MCP na aplicação Copilot](./12-tooling/01-copilot-app/README.md)

## 16 de junho de 2026

### Alinhamento da Especificação MCP & Validação de Exemplos

Validado o currículo contra a atual **Especificação MCP 2025-11-25** e os SDKs oficiais mais recentes, depois corrigidas as referências desatualizadas restantes da especificação e confirmado que os exemplos básicos continuam a compilar e correr.

#### Correções da Versão da Especificação (2025-06-18 / 2025-03-26 → 2025-11-25)

Atualizado o conteúdo em inglês onde ainda mencionava uma revisão de especificação anterior como o padrão *atual/mais recente*, e repontados links para os caminhos canónicos da especificação em `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Atualizada a faixa "Current Standard", introdução, título dos princípios centrais de segurança, título dos requisitos obrigatórios, secção Microsoft Entra ID, links Referências & Recursos, e aviso de conclusão de segurança (8 referências) para 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Atualizado o link da especificação em Recursos Adicionais e a faixa "Current Standard" para 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Substituído o link desatualizado de segurança e confiança `2025-03-26` pela atual página de melhores práticas de segurança 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Atualizado o link dos documentos oficiais de sampling para 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Atualizada a referência presente no tempo para "especificação MCP atual" e o link da especificação em Recursos Adicionais para 2025-11-25 (notas históricas de descontinuação SSE mantidas para precisão)

#### Validação de Exemplos Contra SDKs Atuais

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` instalou `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passou sem erros de tipo — APIs existentes `McpServer`/`StdioServerTransport` permanecem válidas
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validado num `.venv` isolado com `mcp[cli]` (1.27.2); `py_compile` passou e `FastMCP.list_tools()` retornou corretamente as ferramentas `add` e `subtract`
- Confirmado que todos os intervalos de versão `@modelcontextprotocol/sdk` nos exemplos (`>=1.26.0` / `^1.26.0` / `^1.27.0`) resolvem limpidamente para a versão atual `1.29.0` sem alterações de API rompedoras

#### Alinhamento de Versões de Dependências (fechando lacunas)

Atualizados os pinos SDK desatualizados para que todos os exemplos acompanhem o lançamento atual do MCP, seguindo a convenção do repositório:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Atualizado `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` e alterada a descrição do pacote desatualizada `"updated for MCP 2025-06-18"` para `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** e **lab4/code/github_mcp_server/pyproject.toml**: Atualizado o pino exato `mcp==1.23.0` → `mcp>=1.26.0`; regenerados ambos os ficheiros `uv.lock` (`uv lock`) para que os lockfiles resolvam para o atual `mcp 1.27.2` e se mantenham sincronizados com os manifestos

#### Análise de Lacunas no Currículo — Cobertura das Últimas Funcionalidades da Especificação

Verificado que o currículo já cobre todas as primitivas introduzidas/expandidas na MCP 2025-11-25, por isso não restam lacunas de conteúdo:
- **Sampling**: Aula 03-GettingStarted/14-sampling mais 05-AdvancedTopics/mcp-sampling
- **Elicitação (incl. modo URL)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Documentado em 00-Introduction, 01-CoreConcepts, e 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimental, operações de longa duração)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Anotações de Ferramentas** (`readOnlyHint` / `destructiveHint`): Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features

### Reforço de Segurança & Remediação de Vulnerabilidades em Dependências

Realizada uma varredura completa de segurança em todos os manifestos de dependências e no código-fonte dos exemplos, depois remediados todos os avisos npm reportados e uma detecção a nível de código. Após remediação, `npm audit` reporta **0 vulnerabilidades** em todas as diretórios auditados.

#### Vulnerabilidades de Dependência npm (transitivas) — Corrigidas

Auditados todos os 15 ficheiros `package-lock.json` comprometidos. As vulnerabilidades ficaram limitadas às dependências transitivas trazidas pela ferramenta de desenvolvimento MCP Inspector, o cliente OpenAI, e o SDK MCP; todas agora resolvidas sem romper os exemplos:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** e **lab3/code/weather_mcp/inspector**: Atualizado `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), o que resolveu os avisos incluídos de `ajv`, `brace-expansion`, `diff`, `path-to-regexp` e `ws`. Adicionado um item `overrides` no npm forçando o patch `shell-quote@1.8.4` para eliminar o aviso crítico remanescente trazido pelo `concurrently`; regenerados ambos os lockfiles (agora 0 vulnerabilidades)
- **03-GettingStarted/samples/typescript**: `npm audit fix` atualizou a dependência transitiva `qs` (moderada) para uma versão corrigida
- **03-GettingStarted/samples/javascript**: `npm audit fix` atualizou a dependência transitiva `hono` (moderada) para uma versão corrigida
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` atualizou a dependência transitiva `form-data` (alta) para uma versão corrigida
- **03-GettingStarted/11-simple-auth/solution/typescript**: Gerado o `package-lock.json` em falta para que o projeto seja reprodutível e auditável (0 vulnerabilidades)

#### Correção de Segurança a Nível de Código (OWASP A03: Injeção)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Removido `shell=True` da ferramenta `open_in_vscode`. O anterior `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitia que metacaracteres de shell numa pasta fossem interpretados pelo `cmd.exe` (vetor de injeção de comando). Agora lança o `Code.exe` resolvido diretamente com a pasta como argumento — sem shell — o que é funcionalmente equivalente e seguro

#### Auditoria de Dependências Python

- Auditadas todas as listas de requisitos Python com `pip-audit`. `05-AdvancedTopics` e `03-GettingStarted/samples/python` reportaram **nenhuma vulnerabilidade conhecida** (as faixas de `mcp` / `httpx` / `pydantic` / `python-dotenv` resolvem para versões corrigidas atuais)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` identificou dependência transitiva **`werkzeug` 3.1.1** com três avisos DoS no join seguro de nomes de dispositivos Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, e `CVE-2026-27199` (todos corrigidos em 3.1.6). Adicionado um pino explícito de segurança `werkzeug>=3.1.6` para que a versão corrigida seja resolvida; confirmado que a restrição resolve limpidamente com a stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding do Nome do Produto

Atualizado todo o conteúdo do currículo para refletir o rebranding dos produtos Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Atualizado link para a comunidade Discord
- **AGENTS.md**: Atualizada referência ao servidor Discord
- **README.md**: Atualizadas referências ao ecossistema tecnológico
- **study_guide.md**: Atualizadas referências do estudo de caso
- **05-AdvancedTopics/README.md**: Atualizados título e descrição do Módulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Atualizado título da secção e descrição
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Atualizada a título e conteúdo do módulo completo
- **05-AdvancedTopics/mcp-security-entra/README.md**: Atualizado link de referência cruzada
- **07-LessonsfromEarlyAdoption/README.md**: Atualizadas referências do estudo de caso
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Atualizado cabeçalho da Secção 9, emblemas e capacidades
- **08-BestPractices/README.md**: Atualizado link para a comunidade Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Atualizada referência ao canal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Atualizada referência a deployment de modelos
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Atualizada tabela de Serviços de IA
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Atualizadas referências de recursos

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code

- **README.md**: Referências principais do currículo atualizadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Título do módulo, visão geral e todos os cabeçalhos do módulo atualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Título, objetivos de aprendizagem, instruções de configuração e recursos atualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Título, objetivos de aprendizagem, tabela de hosts MCP e referências cruzadas atualizadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Título, emblemas, pré-requisitos e recursos atualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Referências ao Agent Builder e link de feedback atualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Pré-requisitos e referências à extensão atualizados

---

## 11 de abril de 2026

### Nova Aula, Correções na Documentação e Atualizações de Dependências

#### Novo Conteúdo do Currículo Adicionado

**Módulo 05 - Tópicos Avançados**
- **Aula 5.17: Raciocínio Multi-Agente Adversarial com MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Novo guia abrangente sobre o padrão de debate adversarial para sistemas multi-agente
  - Diagrama de arquitetura Mermaid: dois agentes → servidor MCP partilhado → transcrição do debate → juiz → veredicto
  - Servidor de ferramentas MCP partilhado (`web_search` + `run_python`) implementado em Python e TypeScript
  - Prompts do sistema opostos (A FAVOR / CONTRA / Juiz) com requisitos explícitos de uso de ferramentas
  - Orquestrador do debate em Python, TypeScript e C# gerindo as rondas e encaminhamento dos argumentos
  - Ligação MCP `ClientSession` para o orquestrador às chamadas reais às ferramentas
  - Tabela de casos de uso (detecção de alucinações, modelação de ameaças, revisão de design de API, verificação factual, seleção tecnológica)
  - Considerações de segurança: execução em sandbox, validação de chamadas às ferramentas, limitação de taxa, registo de auditoria
  - Exercício estruturado com três cenários práticos (revisão de código, decisão de arquitetura, moderação de conteúdo)

#### Correções na Documentação

**Módulo 03 - Introdução**
- **05-stdio-server/README.md**: Exemplo incompleto do servidor stdio TypeScript corrigido — adicionada a instanciação em falta do transporte (`new StdioServerTransport()`) e chamada `server.connect(transport)` para corresponder aos exemplos Python e .NET na mesma secção
- **14-sampling/README.md**: Erro tipográfico corrigido — corrigido `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Atualizações do Currículo

**README.md principal**
- Entrada 5.17 (Raciocínio Multi-Agente Adversarial com MCP) adicionada à tabela do currículo com ligação direta à nova aula

**05-AdvancedTopics/README.md**
- Linha da Aula 5.17 adicionada à tabela de aulas

**study_guide.md**
- Tópico Raciocínio Multi-Agente Adversarial adicionado ao mapa mental e descrição em prosa dos Tópicos Avançados

#### Correções de Código e Segurança

**Módulo 05 - Agentes Adversariais (`mcp-adversarial-agents`)**
- **Correção de segurança — injeção de comandos**: Substituída interpolação do shell `execSync` por `execFile` + `promisify` na ferramenta TypeScript `run_python`, eliminando a superfície de injeção de comandos (o código controlado pelo LLM passa agora como elemento literal argv sem envolvimento do shell)
- **Ligação do ciclo da ferramenta MCP**: Atualizado o orquestrador de debate Python para usar cliente `AsyncAnthropic` (substituindo o `Anthropic` síncrono bloqueante), passar um `ClientSession` ativo diretamente a cada turno do agente, obter definições das ferramentas via `session.list_tools()` a cada turno, e despachar blocos `tool_use` via `session.call_tool()` em ciclo até o modelo emitir uma resposta final de texto

#### Atualizações de Dependências

- Atualizada a versão do `hono` para 4.12.12 em múltiplos pacotes (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Atualizado `@hono/node-server` da versão 1.19.11 para 1.19.13 nos pacotes TypeScript
- Atualizado `cryptography` da versão 46.0.5 para 46.0.7 nos pacotes Python (labs 3 e 4 do 10-StreamliningAIWorkflows)
- Atualizado `lodash` da versão 4.17.23 para 4.18.1 no inspetor 10-StreamliningAIWorkflows

#### Traduções

- Traduções sincronizadas para mais de 48 idiomas com as alterações mais recentes da origem (atualização i18n)

---

## 5 de fevereiro de 2026

### Validação e Melhorias de Navegação em Todo o Repositório

#### Novo Conteúdo do Currículo Adicionado

**Módulo 03 - Introdução**
- **12-mcp-hosts/README.md**: Novo guia abrangente para configuração de hosts MCP
  - Exemplos de configuração para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelos JSON de configuração para todos os hosts principais
  - Tabela comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Resolução de problemas comuns de ligação
  - Práticas recomendadas de segurança para configuração dos hosts

- **13-mcp-inspector/README.md**: Novo guia de depuração para MCP Inspector
  - Métodos de instalação (npx, npm global, a partir do código fonte)
  - Ligação a servidores via stdio e HTTP/SSE
  - Ferramentas de teste, recursos e fluxos de trabalho de prompts
  - Integração com VS Code e MCP Inspector
  - Cenários comuns de depuração com soluções

**Módulo 04 - Implementação Prática**
- **pagination/README.md**: Novo guia de implementação de paginação
  - Padrões de paginação baseados em cursor em Python, TypeScript, Java
  - Gestão da paginação no lado cliente
  - Estratégias de design de cursor (opaco vs. estruturado)
  - Recomendações de otimização de desempenho

**Módulo 05 - Tópicos Avançados**
- **mcp-protocol-features/README.md**: Análise aprofundada das novas funcionalidades do protocolo
  - Implementação de notificações de progresso
  - Padrões de cancelamento de pedidos
  - Modelos de recursos com padrões URI
  - Gestão do ciclo de vida do servidor
  - Controlo do nível de registos
  - Padrões de tratamento de erros com códigos JSON-RPC

#### Correções de Navegação (mais de 24 ficheiros atualizados)

**READMEs dos Módulos Principais**
 Agora linkam para a primeira aula E para o próximo módulo

**Subficheiros 02-Security**
- Todos os 5 documentos suplementares de segurança agora têm navegação "O Que Segue"

**Ficheiros do Estudo de Caso 09**
- Todos os ficheiros de estudo de caso agora têm navegação sequencial

**Labs 10-StreamliningAI**
Seção "O Que Segue" adicionada à visão geral do Módulo 10 e ao Módulo 11

#### Correções de Código e Conteúdo

**Atualizações do SDK e Dependências**
Versão vazia do openai corrigida para `^4.95.0`
SDK atualizado de `^1.8.0` para `>=1.26.0`
Pins de versão do mcp atualizados para `>=1.26.0`

**Correções de Código**
Modelo inválido `gpt-4o-mini` corrigido para `gpt-4.1-mini`

**Correções de Conteúdo**
Link quebrado `READMEmd` corrigido para `README.md`, cabeçalho do currículo corrigido de `Module 1-3` para `Module 0-3`, caminho sensível a maiúsculas e minúsculas corrigido
Conteúdo duplicado corrompido do Estudo de Caso 5 removido

**Melhorias na Orientação para Iniciantes**
Introdução adequada, objetivos de aprendizagem e pré-requisitos adicionados para iniciantes

#### Atualizações do Currículo

**README.md principal**
- Entradas 3.12 (Hosts MCP), 3.13 (MCP Inspector), 4.1 (Paginação), 5.16 (Funcionalidades do Protocolo) adicionadas à tabela do currículo

**READMEs dos Módulos**
Aulas 12 e 13 adicionadas à lista de aulas
Seção Guias Práticos adicionada com link para paginação
Aulas 5.15 (Transporte Personalizado) e 5.16 (Funcionalidades do Protocolo) adicionadas

**study_guide.md**
- Mapa mental atualizado com todos os novos tópicos: Configuração de Hosts MCP, MCP Inspector, Estratégias de Paginação, Análise Profunda de Funcionalidades do Protocolo

## 28 de janeiro de 2026

### Revisão de Conformidade da Especificação MCP 2025-11-25

#### Aprimoramento de Conceitos Centrais (01-CoreConcepts/)
- **Novo Primitivo Cliente - Roots**: Documentação abrangente adicionada sobre o primitivo Roots do cliente, permitindo que servidores compreendam limites do sistema de ficheiros e permissões de acesso
- **Anotações de Ferramentas**: Documentação adicionada sobre anotações comportamentais das ferramentas (`readOnlyHint`, `destructiveHint`) para melhor decisão na execução das ferramentas
- **Chamada de Ferramentas em Amostragem**: Documentação atualizada em Sampling para incluir parâmetros `tools` e `toolChoice` para invocação de ferramentas comandada pelo modelo durante pedidos de amostragem
- **Elicitação por Modo URL**: Documentação adicionada sobre elicitação baseada em URL para interações externas na web iniciadas pelo servidor
- **Tarefas (Experimental)**: Nova secção adicionada documentando a funcionalidade experimental Tarefas para wrappers de execução durável e obtenção diferida de resultados
- **Suporte a Ícones**: Informado que ferramentas, recursos, modelos de recurso e prompts podem agora incluir ícones como metadados adicionais

#### Atualizações na Documentação
- **README.md**: Referência à versão da Especificação MCP 2025-11-25 e explicação de versionamento por datas adicionadas
- **study_guide.md**: Mapa do currículo atualizado para incluir Tarefas e Anotações de Ferramentas na secção de Conceitos Centrais; timestamp do documento atualizado

#### Verificação de Conformidade com a Especificação
- **Versão do Protocolo**: Verificadas todas as referências na documentação para a versão atual da Especificação MCP 2025-11-25
- **Alinhamento Arquitetural**: Confirmada a precisão da documentação da arquitetura em duas camadas (Camada de Dados + Camada de Transporte)
- **Documentação dos Primitivos**: Validada para primitivos de servidor (Recursos, Prompts, Ferramentas) e primitivos de cliente (Sampling, Elicitação, Registo, Roots)
- **Mecanismos de Transporte**: Verificada a precisão da documentação para transporte STDIO e HTTP Streamable
- **Orientação de Segurança**: Confirmada alinhamento com as melhores práticas de segurança MCP atuais

#### Principais Funcionalidades MCP 2025-11-25 Documentadas
- **Descoberta OpenID Connect**: Descoberta do servidor de autenticação via OIDC
- **Documentos de Metadados de Client ID OAuth**: Mecanismo recomendado de registo do cliente
- **JSON Schema 2020-12**: Dialeto padrão para definições de esquemas MCP
- **Sistema de Níveis do SDK**: Requisitos formalizados para suporte e manutenção de funcionalidades do SDK
- **Estrutura de Governança**: Grupos de Trabalho e Grupos de Interesse formalizados na governança MCP

### Grande Atualização na Documentação de Segurança (02-Security/)

#### Integração do Workshop MCP Security Summit (Sherpa)
- **Novo Recurso de Treino Prático**: Adicionada integração abrangente com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) em toda a documentação de segurança
- **Cobertura da Rota da Expedição**: Documentada a progressão completa de campo a campo do Acampamento Base ao Cume
- **Alinhamento OWASP**: Toda a orientação de segurança agora mapeia para riscos do Guia de Segurança MCP Azure da OWASP

#### Integração OWASP MCP Top 10
- **Nova Secção**: Adicionada tabela dos 10 Principais Riscos de Segurança MCP OWASP com mitigação Azure ao README principal de Segurança
- **Documentação Baseada em Riscos**: mcp-security-controls-2025.md atualizado com referências de riscos OWASP MCP para cada domínio de segurança
- **Arquitectura de Referência**: Ligação ao guia de segurança MCP Azure OWASP de arquitetura e padrões de implementação

#### Ficheiros de Segurança Atualizados
- **README.md**: Visão geral do Workshop Sherpa, tabela da rota da expedição, resumo dos riscos OWASP MCP Top 10, e secção de treino prático adicionados
- **mcp-security-controls-2025.md**: Cabeçalho atualizado para fevereiro de 2026, adicionadas referências a riscos OWASP (MCP01-MCP08), corrigida inconsistência na versão da especificação
- **mcp-security-best-practices-2025.md**: Seção de recursos Sherpa e OWASP adicionada, timestamp atualizado
- **mcp-best-practices.md**: Seção de treino prático com links Sherpa e OWASP adicionada
- **azure-content-safety-implementation.md**: Referência OWASP MCP06 adicionada, alinhamento com acampamento 3 Sherpa e seção de recursos adicionais

#### Novos Links de Recursos Adicionados
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuais de risco OWASP MCP (MCP01-MCP10)

### Alinhamento da Especificação MCP 2025-11-25 em Todo o Currículo

#### Módulo 03 - Introdução
- **Documentação do SDK**: SDK Go adicionado à lista oficial de SDK; referências a todos os SDK atualizadas para alinhar com a Especificação MCP 2025-11-25
- **Clarificação do Transporte**: Descrições dos transportes STDIO e HTTP Streaming atualizadas com referências explícitas à especificação

#### Módulo 04 - Implementação Prática
- **Atualizações do SDK**: SDK Go adicionado; lista de SDK atualizada com referência à versão da especificação
- **Especificação de Autorização**: Ligação da Especificação de Autorização MCP atualizada para a versão atual 2025-11-25

#### Módulo 05 - Tópicos Avançados
- **Novas Funcionalidades**: Nota adicionada sobre novas funcionalidades da Especificação MCP 2025-11-25 (Tarefas, Anotações de Ferramentas, Elicitação por Modo URL, Roots)
- **Recursos de Segurança**: Links para OWASP MCP Top 10 e workshop Sherpa adicionados às referências adicionais

#### Módulo 06 - Contribuições da Comunidade
- **Lista de SDKs**: SDKs Swift e Rust adicionados; link da especificação atualizado para 2025-11-25
- **Referência da Especificação**: Ligação da Especificação MCP atualizada para a URL direta da especificação

#### Módulo 07 - Lições da Adoção Inicial

- **Atualizações de Recursos**: Adicionado o link da Especificação MCP 2025-11-25 e OWASP MCP Top 10 aos recursos adicionais

#### Módulo 08 - Melhores Práticas
- **Versão da Especificação**: Atualizada a referência da Especificação MCP para 2025-11-25
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 e workshop Sherpa às referências adicionais

#### Módulo 10 - Simplificação dos Fluxos de Trabalho de IA
- **Atualização do Distintivo**: Alterado o distintivo da versão MCP de versão do SDK (1.9.3) para versão da especificação (2025-11-25)
- **Links de Recursos**: Atualizado o link da Especificação MCP; adicionado OWASP MCP Top 10

#### Módulo 11 - Laboratórios Práticos do Servidor MCP
- **Referência da Especificação**: Atualizado o link da Especificação MCP para a versão 2025-11-25
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 aos recursos oficiais

## 18 de Dezembro de 2025

### Atualização da Documentação de Segurança - Especificação MCP 2025-11-25

#### Melhores Práticas de Segurança MCP (02-Security/mcp-best-practices.md) - Atualização da Versão da Especificação
- **Atualização da Versão do Protocolo**: Atualizado para referência à última Especificação MCP 2025-11-25 (lançada em 25 de Novembro de 2025)
  - Atualizadas todas as referências da versão da especificação de 2025-06-18 para 2025-11-25
  - Atualizadas as referências de datas do documento de 18 de Agosto de 2025 para 18 de Dezembro de 2025
  - Verificadas todas as URLs da especificação apontando para a documentação atual
- **Validação de Conteúdo**: Validação abrangente das melhores práticas de segurança contra os padrões mais recentes
  - **Soluções de Segurança Microsoft**: Verificada terminologia atual e links para Prompt Shields (anteriormente "deteção de risco de Jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Segurança OAuth 2.1**: Confirmada a conformidade com as melhores práticas de segurança OAuth mais recentes
  - **Padrões OWASP**: Validadas referências ao OWASP Top 10 para LLMs permanecem atuais
  - **Serviços Azure**: Verificados todos os links da documentação Microsoft Azure e melhores práticas
- **Alinhamento com Padrões**: Todos os padrões de segurança referenciados confirmados como atuais
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Melhores Práticas de Segurança OAuth 2.1
  - Frameworks de segurança e conformidade Azure
- **Recursos de Implementação**: Validados todos os links e recursos de guias de implementação
  - Padrões de autenticação do Azure API Management
  - Guias de integração do Microsoft Entra ID
  - Gestão de segredos do Azure Key Vault
  - Pipelines DevSecOps e soluções de monitorização

### Garantia da Qualidade da Documentação
- **Conformidade com a Especificação**: Garantido que todos os requisitos obrigatórios de segurança MCP (DEVE/ NÃO DEVE) estão alinhados com a última especificação
- **Atualização de Recursos**: Verificados todos os links externos para documentação Microsoft, padrões de segurança e guias de implementação
- **Cobertura das Melhores Práticas**: Confirmada cobertura abrangente de autenticação, autorização, ameaças específicas de IA, segurança da cadeia de fornecimento e padrões empresariais

## 6 de Outubro de 2025

### Expansão da Secção de Introdução – Utilização Avançada do Servidor & Autenticação Simples

#### Utilização Avançada do Servidor (03-GettingStarted/10-advanced)
- **Novo Capítulo Adicionado**: Introduzido um guia abrangente para utilização avançada do servidor MCP, cobrindo arquiteturas de servidor regulares e de baixo nível.
  - **Servidor Regular vs. Baixo Nível**: Comparação detalhada e exemplos de código em Python e TypeScript para ambas as abordagens.
  - **Design Baseado em Handlers**: Explicação da gestão de ferramentas/recursos/prompt baseados em handlers para implementações de servidor escaláveis e flexíveis.
  - **Padrões Práticos**: Cenários do mundo real onde padrões de servidor de baixo nível são benéficos para funcionalidades e arquitetura avançadas.

#### Autenticação Simples (03-GettingStarted/11-simple-auth)
- **Novo Capítulo Adicionado**: Guia passo a passo para implementar autenticação simples em servidores MCP.
  - **Conceitos de Autenticação**: Explicação clara da autenticação vs. autorização, e gestão de credenciais.
  - **Implementação Básica de Autenticação**: Padrões de autenticação baseados em middleware em Python (Starlette) e TypeScript (Express), com exemplos de código.
  - **Progressão para Segurança Avançada**: Orientações para iniciar com autenticação simples e avançar para OAuth 2.1 e RBAC, com referências aos módulos avançados de segurança.

Estas adições fornecem orientações práticas e hands-on para construir implementações de servidores MCP mais robustas, seguras e flexíveis, conectando conceitos fundamentais com padrões avançados de produção.

## 29 de Setembro de 2025

### Laboratórios de Integração de Base de Dados do Servidor MCP - Percurso de Aprendizagem Hands-On Abrangente

#### 11-MCPServerHandsOnLabs - Novo Currículo Completo de Integração de Base de Dados
- **Percurso de Aprendizagem Completo com 13 Laboratórios**: Adicionado currículo hands-on abrangente para construir servidores MCP prontos para produção com integração de base de dados PostgreSQL
  - **Implementação do Mundo Real**: Caso de uso Zava Retail analytics demonstrando padrões de nível empresarial
  - **Progressão de Aprendizagem Estruturada**:
    - **Laboratórios 00-03: Fundamentos** - Introdução, Arquitetura Core, Segurança & Multi-Tenancy, Configuração do Ambiente
    - **Laboratórios 04-06: Construção do Servidor MCP** - Design de Base de Dados & Esquema, Implementação do Servidor MCP, Desenvolvimento de Ferramentas  
    - **Laboratórios 07-09: Funcionalidades Avançadas** - Integração de Pesquisa Semântica, Testes & Depuração, Integração com VS Code
    - **Laboratórios 10-12: Produção & Melhores Práticas** - Estratégias de Deploy, Monitorização & Observabilidade, Melhores Práticas & Otimização
  - **Tecnologias Empresariais**: Framework FastMCP, PostgreSQL com pgvector, embeddings Azure OpenAI, Azure Container Apps, Application Insights
  - **Funcionalidades Avançadas**: Segurança ao Nível da Linha (RLS), pesquisa semântica, acesso multi-inquilino a dados, embeddings vetoriais, monitorização em tempo real

#### Padronização de Terminologia - Conversão de Módulo para Laboratório
- **Atualização Abrangente da Documentação**: Atualizados sistematicamente todos os ficheiros README em 11-MCPServerHandsOnLabs para usar a terminologia "Laboratório" em vez de "Módulo"
  - **Cabeçalhos das Secções**: Atualizado "O que este módulo cobre" para "O que este laboratório cobre" em todos os 13 laboratórios
  - **Descrição do Conteúdo**: Alterado "Este módulo fornece..." para "Este laboratório fornece..." em toda a documentação
  - **Objetivos de Aprendizagem**: Atualizado "No final deste módulo..." para "No final deste laboratório..." 
  - **Links de Navegação**: Convertidas todas as referências "Módulo XX:" para "Laboratório XX:" nas referências cruzadas e navegação
  - **Rastreamento de Conclusão**: Atualizado "Após completar este módulo..." para "Após completar este laboratório..."
  - **Preservação de Referências Técnicas**: Mantidas referências ao módulo Python em ficheiros de configuração (ex., `"module": "mcp_server.main"`)

#### Melhoria do Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Adicionada nova secção "11. Laboratórios de Integração de Base de Dados" com visualização abrangente da estrutura dos laboratórios
- **Estrutura do Repositório**: Atualizada de dez para onze secções principais com descrição detalhada de 11-MCPServerHandsOnLabs
- **Orientação no Percurso de Aprendizagem**: Melhoradas instruções de navegação para cobrir as secções 00-11
- **Cobertura Tecnológica**: Adicionados detalhes de integração FastMCP, PostgreSQL e serviços Azure
- **Resultados da Aprendizagem**: Enfatizado desenvolvimento de servidores prontos para produção, padrões de integração de base de dados, e segurança empresarial

#### Melhoria da Estrutura do README Principal
- **Terminologia Baseada em Laboratórios**: Atualizado README.md principal em 11-MCPServerHandsOnLabs para usar consistentemente a estrutura "Laboratório"
- **Organização do Percurso de Aprendizagem**: Progressão clara desde conceitos fundamentais até implementação avançada e deploy para produção
- **Foco no Mundo Real**: Ênfase na aprendizagem prática com padrões e tecnologias de nível empresarial

### Melhorias na Qualidade e Consistência da Documentação
- **Ênfase em Aprendizagem Hands-On**: Reforçada abordagem prática baseada em laboratórios ao longo da documentação
- **Foco em Padrões Empresariais**: Realçadas implementações prontas para produção e considerações de segurança empresarial
- **Integração Tecnológica**: Cobertura abrangente dos modernos serviços Azure e padrões de integração de IA
- **Progressão de Aprendizagem**: Percurso claro e estruturado desde conceitos básicos até deploy para produção

## 26 de Setembro de 2025

### Melhoria dos Estudos de Caso - Integração do Registo MCP do GitHub

#### Estudos de Caso (09-CaseStudy/) - Foco no Desenvolvimento do Ecossistema
- **README.md**: Expansão significativa com estudo de caso abrangente do Registo MCP do GitHub
  - **Estudo de Caso Registo MCP GitHub**: Novo estudo de caso detalhado sobre o lançamento do Registo MCP do GitHub em Setembro de 2025
    - **Análise do Problema**: Exame detalhado dos desafios fragmentados na descoberta e deployment de servidores MCP
    - **Arquitetura da Solução**: Abordagem centralizada do registo do GitHub com instalação VS Code com um clique
    - **Impacto no Negócio**: Melhorias mensuráveis no onboarding e produtividade de desenvolvedores
    - **Valor Estratégico**: Foco no deployment modular de agentes e interoperabilidade entre ferramentas
    - **Desenvolvimento do Ecossistema**: Posicionamento como plataforma fundamental para integração agentic
  - **Estrutura Melhorada do Estudo de Caso**: Atualizados os sete estudos de caso com formatação consistente e descrições abrangentes
    - Agentes de Viagem Azure AI: Ênfase em orquestração multi-agente
    - Integração Azure DevOps: Foco na automação de fluxo de trabalho
    - Recuperação em Tempo Real de Documentação: Implementação de cliente consola Python
    - Gerador Interativo de Planos de Estudo: Aplicação web conversacional Chainlit
    - Documentação In-Editor: Integração VS Code e GitHub Copilot
    - Azure API Management: Padrões de integração API empresariais
    - Registo MCP GitHub: Desenvolvimento de ecossistema e plataforma comunitária
  - **Conclusão Abrangente**: Secção de conclusão reescrita destacando sete estudos de caso abrangendo múltiplas dimensões de implementação MCP
    - Integração empresarial, orquestração multi-agente, produtividade do desenvolvedor
    - Desenvolvimento do ecossistema, categorizações de aplicações educativas
    - Insights aprimorados sobre padrões arquitetónicos, estratégias de implementação e melhores práticas
    - Ênfase no MCP como protocolo maduro e pronto para produção

#### Atualizações do Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Atualizado mindmap para incluir o Registo MCP do GitHub na secção de Estudos de Caso
- **Descrição dos Estudos de Caso**: Aprimorada de descrições genéricas para decomposição detalhada de sete estudos de caso abrangentes
- **Estrutura do Repositório**: Atualizada a secção 10 para refletir a cobertura completa dos estudos de caso com detalhes específicos de implementação
- **Integração do Changelog**: Adicionado registo de 26 de Setembro de 2025 documentando a adição do Registo MCP do GitHub e melhorias nos estudos de caso
- **Atualizações de Data**: Atualizado o timestamp do rodapé para refletir a revisão mais recente (26 de Setembro de 2025)

### Melhorias na Qualidade da Documentação
- **Melhoria da Consistência**: Padronizada formatação e estrutura dos estudos de caso em todos os sete exemplos
- **Cobertura Abrangente**: Estudos de caso agora abrangem cenários empresariais, produtividade do desenvolvedor e desenvolvimento de ecossistema
- **Posicionamento Estratégico**: Foco aprimorado no MCP como plataforma fundamental para deployment de sistemas agentic
- **Integração de Recursos**: Atualizados recursos adicionais para incluir link do Registo MCP do GitHub

## 15 de Setembro de 2025

### Expansão de Tópicos Avançados - Transportes Customizados & Engenharia de Contexto

#### Transportes Customizados MCP (05-AdvancedTopics/mcp-transport/) - Novo Guia De Implementação Avançada
- **README.md**: Guia completo de implementação para mecanismos customizados de transporte MCP
  - **Transporte Azure Event Grid**: Implementação abrangente de transporte serverless orientado a eventos
    - Exemplos em C#, TypeScript e Python com integração Azure Functions
    - Padrões arquitetónicos orientados a eventos para soluções MCP escaláveis
    - Receptores webhook e gestão de mensagens push
  - **Transporte Azure Event Hubs**: Implementação de transporte streaming de alta vazão
    - Capacidades de streaming em tempo real para cenários de baixa latência
    - Estratégias de partição e gestão de checkpoints
    - Agrupamento de mensagens e otimização de desempenho
  - **Padrões de Integração Empresarial**: Exemplos arquitetónicos prontos para produção
    - Processamento MCP distribuído entre múltiplas Azure Functions
    - Arquiteturas híbridas de transporte combinando múltiplos tipos de transporte
    - Durabilidade de mensagens, confiabilidade e estratégias de gestão de erros
  - **Segurança & Monitorização**: Integração Azure Key Vault e padrões de observabilidade
    - Autenticação com identidade gerida e acesso com privilégios mínimos
    - Telemetria Application Insights e monitorização de desempenho
    - Disjuntores e padrões de tolerância a falhas
  - **Frameworks de Testes**: Estratégias abrangentes de teste para transportes customizados
    - Testes unitários com test doubles e frameworks de mocking
    - Testes de integração com Azure Test Containers
    - Considerações para testes de desempenho e carga

#### Engenharia de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente de IA
- **README.md**: Exploração abrangente da engenharia de contexto como campo emergente
  - **Princípios Centrais**: Partilha completa de contexto, consciência da decisão de ação, e gestão da janela de contexto
  - **Alinhamento com Protocolo MCP**: Como o design do MCP aborda os desafios da engenharia de contexto
    - Limitações da janela de contexto e estratégias de carregamento progressivo
    - Determinação de relevância e recuperação dinâmica de contexto
    - Gestão multimodal de contexto e considerações de segurança
  - **Abordagens de Implementação**: Arquiteturas single-threaded vs. multi-agente
    - Técnicas de fragmentação e priorização de contexto
    - Estratégias de carregamento progressivo e compressão de contexto
    - Abordagens em camadas de contexto e otimização de recuperação
  - **Framework de Medição**: Métricas emergentes para avaliação da eficácia do contexto
    - Eficiência de input, desempenho, qualidade e considerações de experiência do utilizador
    - Abordagens experimentais para otimização de contexto
    - Análise de falhas e metodologias de melhoria

#### Atualizações de Navegação do Currículo (README.md)
- **Estrutura Avançada Aprimorada**: Atualizada tabela do currículo para incluir novos tópicos avançados
  - Adicionados Context Engineering (5.14) e Custom Transport (5.15)
  - Formatação consistente e links de navegação em todos os módulos
  - Atualizadas descrições para refletir o escopo atual do conteúdo

### Melhorias na Estrutura do Diretório
- **Padronização de Nomeação**: Renomeado "mcp transport" para "mcp-transport" para consistência com outras pastas de tópicos avançados
- **Organização do Conteúdo**: Todas as pastas 05-AdvancedTopics agora seguem padrão de nomeação consistente (mcp-[topic])

### Melhorias na Qualidade da Documentação
- **Alinhamento com Especificação MCP**: Todo novo conteúdo referencia a atual Especificação MCP 2025-06-18
- **Exemplos Multi-Língua**: Exemplos de código abrangentes em C#, TypeScript e Python

- **Foco Empresarial**: Padrões prontos para produção e integração com a cloud Azure por todo o lado
- **Documentação Visual**: Diagramas Mermaid para visualização de arquitetura e fluxos

## 18 de Agosto de 2025

### Atualização Abrangente da Documentação - Normas MCP 2025-06-18

#### Melhores Práticas de Segurança MCP (02-Security/) - Modernização Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescrita completa alinhada com a Especificação MCP 2025-06-18
  - **Requisitos Obrigatórios**: Requisitos explícitos DEVE/ NÃO DEVE adicionados da especificação oficial com indicadores visuais claros
  - **12 Práticas Centrais de Segurança**: Reestruturado de lista de 15 itens para domínios de segurança abrangentes
    - Segurança de Tokens & Autenticação com integração de fornecedor externo de identidade
    - Gestão de Sessões & Segurança de Transporte com requisitos criptográficos
    - Proteção Contra Ameaças Específicas de IA com integração Microsoft Prompt Shields
    - Controlo de Acesso & Permissões com o princípio do menor privilégio
    - Segurança e Monitorização de Conteúdo com integração Azure Content Safety
    - Segurança da Cadeia de Abastecimento com verificação abrangente de componentes
    - Segurança OAuth & Prevenção do Confused Deputy com implementação PKCE
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
    - Conformidade & Governança com alinhamento regulatório
    - Controlo Avançado de Segurança com arquitetura de zero trust
    - Integração do Ecossistema de Segurança Microsoft com soluções abrangentes
    - Evolução Contínua de Segurança com práticas adaptativas
  - **Soluções de Segurança Microsoft**: Orientação de integração aprimorada para Prompt Shields, Azure Content Safety, Entra ID, e GitHub Advanced Security
  - **Recursos para Implementação**: Links de recursos abrangentes categorizados por Documentação MCP Oficial, Soluções Microsoft de Segurança, Normas de Segurança, e Guias de Implementação

#### Controlo Avançado de Segurança (02-Security/) - Implementação Empresarial
- **MCP-SECURITY-CONTROLS-2025.md**: Revisão completa com framework de segurança ao nível empresarial
  - **9 Domínios Abrangentes de Segurança**: Expandido de controlos básicos para framework empresarial detalhada
    - Autenticação & Autorização Avançadas com integração Microsoft Entra ID
    - Segurança de Tokens & Controlos Anti-Passthrough com validação abrangente
    - Controlos de Segurança de Sessão com prevenção de sequestro
    - Controlos de Segurança Específicos para IA com prevenção de injeção de prompt e envenenamento de ferramentas
    - Prevenção de Ataques Confused Deputy com segurança de proxy OAuth
    - Segurança na Execução de Ferramentas com sandboxing e isolamento
    - Controlo de Segurança da Cadeia de Abastecimento com verificação de dependências
    - Controlos de Monitorização & Deteção com integração SIEM
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
  - **Exemplos de Implementação**: Blocos de configuração YAML detalhados e exemplos de código adicionados
  - **Integração de Soluções Microsoft**: Cobertura abrangente dos serviços de segurança Azure, GitHub Advanced Security, e gestão empresarial de identidade

#### Tópicos Avançados de Segurança (05-AdvancedTopics/mcp-security/) - Implementação Pronta para Produção
- **README.md**: Reescrita completa para implementação empresarial de segurança
  - **Alinhamento com Especificação Atual**: Atualizado para Especificação MCP 2025-06-18 com requisitos de segurança obrigatórios
  - **Autenticação Aprimorada**: Integração Microsoft Entra ID com exemplos abrangentes em .NET e Java Spring Security
  - **Integração de Segurança IA**: Implementação de Microsoft Prompt Shields e Azure Content Safety com exemplos detalhados em Python
  - **Mitigação Avançada de Ameaças**: Exemplos abrangentes de implementação para
    - Prevenção de Ataques Confused Deputy com PKCE e validação de consentimento do utilizador
    - Prevenção de Passthrough de Token com validação de audiência e gestão segura de tokens
    - Prevenção de Sequestro de Sessão com ligação criptográfica e análise comportamental
  - **Integração Empresarial de Segurança**: Monitorização Azure Application Insights, pipelines de deteção de ameaças, e segurança da cadeia de abastecimento
  - **Lista de Verificação de Implementação**: Controlo claro entre obrigatórios vs. recomendados com benefícios do ecossistema de segurança Microsoft

### Qualidade da Documentação & Alinhamento com Normas
- **Referências da Especificação**: Atualizadas todas as referências para a Especificação MCP 2025-06-18 atual
- **Ecossistema de Segurança Microsoft**: Orientação de integração aprimorada em toda a documentação de segurança
- **Implementação Prática**: Exemplos detalhados de código adicionados em .NET, Java e Python com padrões empresariais
- **Organização de Recursos**: Categorização abrangente da documentação oficial, normas de segurança e guias de implementação
- **Indicadores Visuais**: Marcação clara dos requisitos obrigatórios vs. práticas recomendadas


#### Conceitos Básicos (01-CoreConcepts/) - Modernização Completa
- **Atualização de Versão do Protocolo**: Atualizado para referência à Especificação MCP atual 2025-06-18 com versionamento baseado em data (formato AAAA-MM-DD)
- **Refinamento de Arquitetura**: Descrições aprimoradas de Hosts, Clientes e Servidores para refletir padrões atuais da arquitetura MCP
  - Hosts agora claramente definidos como aplicações de IA a coordenar múltiplas conexões de clientes MCP
  - Clientes descritos como conectores de protocolo mantendo relações um para um com servidores
  - Servidores aprimorados com cenários de implementação locais vs. remotos
- **Reestruturação de Primitivos**: Revisão completa dos primitivos de servidor e cliente
  - Primitivos de Servidor: Recursos (fontes de dados), Prompts (modelos), Ferramentas (funções executáveis) com explicações detalhadas e exemplos
  - Primitivos de Cliente: Sampling (completions LLM), Elicitação (entrada do utilizador), Logging (debugging/monitorização)
  - Atualizado com padrões atuais de métodos de descoberta (`*/list`), recuperação (`*/get`), e execução (`*/call`)
- **Arquitetura do Protocolo**: Introduzido modelo de arquitetura em duas camadas
  - Camada de Dados: Fundação JSON-RPC 2.0 com gestão do ciclo de vida e primitivos
  - Camada de Transporte: STDIO (local) e Streamable HTTP com SSE (remoto) como mecanismos de transporte
- **Framework de Segurança**: Princípios abrangentes de segurança incluindo consentimento explícito do utilizador, proteção de privacidade de dados, segurança na execução de ferramentas, e segurança da camada de transporte
- **Padrões de Comunicação**: Mensagens do protocolo atualizadas para mostrar fluxos de inicialização, descoberta, execução e notificação
- **Exemplos de Código**: Exemplos multi-linguagem atualizados (.NET, Java, Python, JavaScript) para refletir padrões atuais do SDK MCP

#### Segurança (02-Security/) - Revisão Abrangente de Segurança  
- **Alinhamento com Normas**: Total alinhamento com requisitos de segurança da Especificação MCP 2025-06-18
- **Evolução da Autenticação**: Documentada evolução de servidores OAuth customizados para delegação de fornecedor externo de identidade (Microsoft Entra ID)
- **Análise Específica de Ameaças de IA**: Cobertura aprimorada de vetores modernos de ataque IA
  - Cenários detalhados de ataques de injeção de prompt com exemplos do mundo real
  - Mecanismos de envenenamento de ferramentas e padrões de ataque "rug pull"
  - Envenenamento de janela de contexto e ataques de confusão de modelo
- **Soluções de Segurança IA Microsoft**: Cobertura abrangente do ecossistema de segurança Microsoft
  - AI Prompt Shields com técnicas avançadas de deteção, spotlighting e delimitadores
  - Padrões de integração Azure Content Safety
  - GitHub Advanced Security para proteção da cadeia de abastecimento
- **Mitigação Avançada de Ameaças**: Controlos de segurança detalhados para
  - Sequestro de sessão com cenários de ataque específicos MCP e requisitos criptográficos do ID de sessão
  - Problemas de confused deputy em cenários de proxy MCP com requisitos explícitos de consentimento
  - Vulnerabilidades de passthrough de token com controlos obrigatórios de validação
- **Segurança da Cadeia de Abastecimento**: Cobertura expandida de cadeia de abastecimento IA incluindo modelos base, serviços de embeddings, fornecedores de contexto e APIs de terceiros
- **Segurança Foundation**: Integração aprimorada com padrões empresariais de segurança incluindo arquitetura zero trust e ecossistema de segurança Microsoft
- **Organização de Recursos**: Links de recursos abrangentes categorizados por tipo (Docs Oficiais, Normas, Investigação, Soluções Microsoft, Guias de Implementação)

### Melhorias na Qualidade da Documentação
- **Objetivos de Aprendizagem Estruturados**: Objetivos de aprendizagem aprimorados com resultados específicos e acionáveis
- **Referências Cruzadas**: Adicionados links entre temas relacionados de segurança e conceitos básicos
- **Informação Atual**: Atualizadas todas as referências de datas e links de especificação para normas atuais
- **Orientação de Implementação**: Adicionadas diretrizes específicas e acionáveis de implementação em ambas as secções

## 16 de Julho de 2025

### Melhorias no README e Navegação
- Navegação do currículo completamente redesenhada no README.md
- Substituídos os tags `<details>` por formato mais acessível baseado em tabelas
- Criadas opções de layout alternativas na nova pasta "alternative_layouts"
- Adicionados exemplos de navegação em estilo com cartões, separadores e acordeão
- Atualizada a secção de estrutura do repositório para incluir todos os ficheiros mais recentes
- Aprimorada a secção "Como Usar Este Currículo" com recomendações claras
- Atualizados os links de especificação MCP para apontar para URLs corretos
- Adicionada secção de Context Engineering (5.14) à estrutura do currículo

### Atualizações do Guia de Estudo
- Guia de estudo completamente revisto para alinhar com a estrutura atual do repositório
- Adicionadas novas secções para MCP Clientes e Ferramentas, e Servidores MCP Populares
- Atualizado o Mapa Visual do Currículo para refletir todos os tópicos com precisão
- Aprimoradas as descrições dos Tópicos Avançados para cobrir todas as áreas especializadas
- Atualizada a secção de Estudos de Caso para refletir exemplos reais
- Adicionado este log de alterações abrangente

### Contribuições da Comunidade (06-CommunityContributions/)
- Adicionada informação detalhada sobre servidores MCP para geração de imagens
- Adicionada secção abrangente sobre uso do Claude no VSCode
- Adicionadas instruções de configuração e uso do cliente terminal Cline
- Atualizada secção de clientes MCP para incluir todas as opções populares
- Exemplos de contribuição aprimorados com amostras de código mais precisas

### Tópicos Avançados (05-AdvancedTopics/)
- Organizdas todas as pastas de tópicos especializados com nomenclatura consistente
- Adicionados materiais e exemplos de engenharia de contexto
- Documentação da integração do agente Foundry adicionada
- Documentação aprimorada da integração de segurança Entra ID

## 11 de Junho de 2025

### Criação Inicial
- Lançada primeira versão do currículo MCP para Iniciantes
- Criada estrutura básica para todas as 10 secções principais
- Implementado Mapa Visual do Currículo para navegação
- Adicionados projetos de exemplo iniciais em múltiplas linguagens de programação

### Primeiros Passos (03-GettingStarted/)
- Criados os primeiros exemplos de implementação de servidor
- Adicionadas orientações para desenvolvimento de cliente
- Instruções incluídas para integração de cliente LLM
- Documentação de integração com VS Code adicionada
- Implementados exemplos de servidor Server-Sent Events (SSE)

### Conceitos Básicos (01-CoreConcepts/)
- Explicação detalhada da arquitetura cliente-servidor adicionada
- Criada documentação sobre componentes-chave do protocolo
- Padrões de mensagens no MCP documentados

## 23 de Maio de 2025

### Estrutura do Repositório
- Repositório inicializado com estrutura básica de pastas
- Criados ficheiros README para cada secção principal
- Configurada infraestrutura de tradução
- Adicionados recursos gráficos e diagramas

### Documentação
- Criado README.md inicial com visão geral do currículo
- Adicionados ficheiros CODE_OF_CONDUCT.md e SECURITY.md
- Configurado SUPPORT.md com orientações para obter ajuda
- Criada estrutura preliminar do guia de estudo

## 15 de Abril de 2025

### Planeamento e Framework
- Planeamento inicial do currículo MCP para Iniciantes
- Definidos objetivos de aprendizagem e público-alvo
- Estruturado o currículo em 10 secções
- Desenvolvido quadro conceptual para exemplos e estudos de caso
- Criados protótipos iniciais para conceitos-chave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->