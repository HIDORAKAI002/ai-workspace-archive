# Registro de Alterações: Currículo MCP para Iniciantes

Este documento serve como registro de todas as mudanças significativas feitas no currículo Model Context Protocol (MCP) para Iniciantes. As mudanças são documentadas em ordem cronológica reversa (mudanças mais recentes primeiro).

## 2 de Julho de 2026

### Nova Lição: Candidato a Versão da Especificação MCP 2026-07-28

Adicionada cobertura do próximo candidato a versão da especificação MCP `2026-07-28` (anunciado em 21 de Maio de 2026; lançamento final programado para 28 de Julho de 2026), resumido a partir do [post oficial do blog de anúncio](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). A base do currículo continua sendo a **Especificação MCP 2025-11-25** até a nova versão ser lançada, portanto isso é apresentado como uma orientação futura e não uma reescrita das lições existentes.

- **Novo**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — uma lição completa cobrindo o núcleo do protocolo sem estado (remoção do handshake `initialize` e do `Mcp-Session-Id`), os novos cabeçalhos de roteamento `Mcp-Method`/`Mcp-Name`, metadados de cache `ttlMs`/`cacheScope`, Contexto de Rastreamento W3C no `_meta`, o framework formal de Extensões (Apps MCP e a nova extensão Tasks), seis SEPs para reforço de autorização, a descontinuação de Roots/Sampling/Logging, e a migração para JSON Schema 2020-12 completo para schemas de ferramentas.
- **Atualizado** com chamadas futuras ligando para a nova lição:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): nota da versão do protocolo, seções Sampling/Roots/Logging/Tasks, e "O que vem a seguir"
  - [02-Security/README.md](./02-Security/README.md): chamada sobre reforço de autorização
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): chamada sobre transporte sem estado
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): chamada sobre descontinuação do Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): chamada sobre descontinuação do Logging e extensão Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): chamada sobre transporte sem estado/roteamento de sessão
  - [README.md](./README.md): nota "Olhando para a frente" na seção da especificação e uma nova entrada `1.1` na tabela de módulos do currículo
  - [study_guide.md](./study_guide.md): bullet futuro na visão geral dos Conceitos Básicos e uma nota aditiva datada
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): chamada sobre o mapa de transporte `mcp-session-id` antes do modelo de requisição sem estado
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): chamada de visão geral do módulo sobre descontinuações de Root Contexts/Sampling e a extensão Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): chamada sobre reforço de autorização

## 24 de Junho de 2026

### Nova Lição: Usando MCP no app Copilot

- [Seção de Ferramentas](./12-tooling/README.md) Adicionada seção de ferramentas.
- [MCP no app Copilot](./12-tooling/01-copilot-app/README.md)

## 16 de Junho de 2026

### Alinhamento da Especificação MCP & Validação de Exemplos

Validado o currículo contra a atual **Especificação MCP 2025-11-25** e os SDKs oficiais mais recentes, depois corrigidas as referências antigas remanescentes da especificação e confirmado que os exemplos centrais ainda compilam e executam.

#### Correções da Versão da Especificação (2025-06-18 / 2025-03-26 → 2025-11-25)

Atualizado conteúdo em inglês onde ainda afirmava que uma revisão antiga da especificação era o padrão *atual/mais recente*, e redirecionados links para os caminhos canônicos da especificação `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Atualizado o banner "Padrão Atual", introdução, cabeçalho de princípios de segurança principais, cabeçalho de requisitos obrigatórios, seção Microsoft Entra ID, links de Referências & Recursos, e aviso final de segurança (8 referências) para 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Atualizado o link de Recursos Adicionais da especificação e o banner "Padrão Atual" para 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Substituído o link antigo `2025-03-26` de segurança e confiança pela página atual de boas práticas de segurança 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Atualizado o link oficial dos docs de sampling para 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Atualizada a referência de "especificação MCP atual" no presente e o link da especificação em Recursos Adicionais para 2025-11-25 (notas históricas sobre descontinuação SSE mantidas para precisão)

#### Validação de Exemplos contra SDKs Atuais

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolveu `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passou sem erros de tipo — as APIs existentes `McpServer`/`StdioServerTransport` continuam válidas
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validado em `.venv` isolado com `mcp[cli]` (1.27.2); `py_compile` passou e `FastMCP.list_tools()` retornou corretamente as ferramentas `add` e `subtract`
- Confirmados todos os ranges de versões do `@modelcontextprotocol/sdk` nos exemplos (`>=1.26.0` / `^1.26.0` / `^1.27.0`) resolvem limpos para o atual `1.29.0` sem mudanças _breaking_ na API

#### Alinhamento de Versões de Dependências (fechando lacunas)

Atualizadas pins de SDK desatualizados para que cada exemplo acompanhe o lançamento atual do MCP, seguindo a convenção do repositório:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Atualizado `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` e alterada a descrição do pacote desatualizada `"updated for MCP 2025-06-18"` para `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** e **lab4/code/github_mcp_server/pyproject.toml**: Atualizado pin exato `mcp==1.23.0` → `mcp>=1.26.0`; regenerados ambos arquivos `uv.lock` (`uv lock`) para resolver arquivos de lock para o atual `mcp 1.27.2` e manterem sincronizados com os manifests

#### Análise de Lacunas no Currículo — Cobertura das Últimas Funcionalidades da Especificação

Verificado que o currículo já cobre todas as primitivas introduzidas/expandidas no MCP 2025-11-25, então não restam lacunas de conteúdo:
- **Sampling**: Lição 03-GettingStarted/14-sampling mais 05-AdvancedTopics/mcp-sampling
- **Elicitação (incluindo modo URL)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Documentado em 00-Introduction, 01-CoreConcepts, e 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimental, operações de longa duração)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Anotações de Ferramentas** (`readOnlyHint` / `destructiveHint`): Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features

### Reforço de Segurança & Remediação de Vulnerabilidades em Dependências

Realizada uma auditoria completa de segurança em todos os manifests de dependências e no código-fonte dos exemplos, depois remediados todos os avisos npm reportados e uma falha em nível de código. Após remediação, `npm audit` reporta **0 vulnerabilidades** em todos os diretórios auditados.

#### Vulnerabilidades de Dependência npm (transitivas) — Corrigidas

Auditados todos os 15 arquivos `package-lock.json` comprometidos. As vulnerabilidades estavam limitadas a dependências transitivas puxadas pela ferramenta de desenvolvimento MCP Inspector, o cliente OpenAI, e o SDK MCP; todas agora resolvidas sem quebrar os exemplos:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** e **lab3/code/weather_mcp/inspector**: Atualizado `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), o que eliminou os avisos relacionados a `ajv`, `brace-expansion`, `diff`, `path-to-regexp` e `ws` incluídos. Adicionada entrada `overrides` no npm forçando a versão corrigida `shell-quote@1.8.4` para eliminar o aviso crítico residual do `concurrently`; regenerados ambos os arquivos de lock (agora 0 vulnerabilidades)
- **03-GettingStarted/samples/typescript**: `npm audit fix` atualizou a dependência transitiva `qs` (moderada) para uma versão corrigida
- **03-GettingStarted/samples/javascript**: `npm audit fix` atualizou a dependência transitiva `hono` (moderada) para uma versão corrigida
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` atualizou a dependência transitiva `form-data` (alta) para uma versão corrigida
- **03-GettingStarted/11-simple-auth/solution/typescript**: Gerado o arquivo `package-lock.json` ausente para que o projeto seja reprodutível e auditável (0 vulnerabilidades)

#### Correção de Segurança em Código (OWASP A03: Injeção)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Removido `shell=True` da ferramenta `open_in_vscode`. O anterior `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitia que metacaracteres do shell em um caminho de pasta fossem interpretados pelo `cmd.exe` (vetor de injeção de comando). Agora o `Code.exe` resolvido é lançado diretamente com a pasta como argumento — sem shell — o que é funcionalmente equivalente e seguro

#### Auditoria de Dependências Python

- Auditados todos os requisitos Python com `pip-audit`. `05-AdvancedTopics` e `03-GettingStarted/samples/python` reportaram **nenhuma vulnerabilidade conhecida** (seus ranges `mcp` / `httpx` / `pydantic` / `python-dotenv` resolvem para versões corrigidas atuais)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` identificou a dependência transitiva **`werkzeug` 3.1.1** com três avisos de DoS `safe_join` em nomes de dispositivos Windows — `CVE-2025-66221`, `CVE-2026-21860`, e `CVE-2026-27199` (todos corrigidos na 3.1.6). Adicionado pin explícito de segurança `werkzeug>=3.1.6` para resolver para a versão corrigida; verificado que a restrição resolve limpo com o stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding do Nome do Produto

Atualizado todo o conteúdo do currículo para refletir o rebranding de produtos da Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Atualizado o link da comunidade Discord
- **AGENTS.md**: Atualizada referência ao servidor Discord
- **README.md**: Atualizadas referências ao ecossistema tecnológico
- **study_guide.md**: Atualizadas referências de estudo de caso
- **05-AdvancedTopics/README.md**: Atualizado título e descrição do Módulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Atualizado cabeçalho da seção e descrição
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Atualização completa do título do módulo e conteúdo
- **05-AdvancedTopics/mcp-security-entra/README.md**: Atualizado link de referência cruzada
- **07-LessonsfromEarlyAdoption/README.md**: Atualizadas referências de estudo de caso
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Atualizado cabeçalho da Seção 9, badges, e capacidades
- **08-BestPractices/README.md**: Atualizado link da comunidade Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Atualizada referência ao canal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Atualizada referência de implantação de modelo
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Atualizada tabela de Serviços de IA
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Atualizadas referências de recursos

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension para VS Code

- **README.md**: Atualizadas referências principais do currículo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Atualizado título do módulo, visão geral e todos os cabeçalhos do módulo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Atualizados título, objetivos de aprendizagem, instruções de configuração e recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Atualizados título, objetivos de aprendizagem, tabela de hosts MCP e referências cruzadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Atualizados título, badges, pré-requisitos e recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Atualizadas referências do Agent Builder e link de feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Atualizados pré-requisitos e referências de extensão

---

## 11 de abril de 2026

### Nova Aula, Correções na Documentação e Atualizações de Dependências

#### Novo Conteúdo do Currículo Adicionado

**Módulo 05 - Tópicos Avançados**
- **Aula 5.17: Raciocínio Multiagente Adversarial com MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Novo guia abrangente cobrindo o padrão de debate adversarial para sistemas multiagente
  - Diagrama de arquitetura Mermaid: dois agentes → servidor MCP compartilhado → transcrição do debate → juiz → veredicto
  - Servidor de ferramentas MCP compartilhado (`web_search` + `run_python`) implementado em Python e TypeScript
  - Prompts de sistema opostos (A FAVOR / CONTRA / Juiz) com requisitos explícitos de uso de ferramentas
  - Orquestrador de debate em Python, TypeScript e C# gerenciando rodadas e roteamento de argumentos
  - Fiação MCP `ClientSession` para o orquestrador realizar chamadas reais às ferramentas
  - Tabela de casos de uso (detecção de alucinação, modelagem de ameaças, revisão de design de API, verificação factual, seleção de tecnologia)
  - Considerações de segurança: execução em sandbox, validação de chamadas de ferramentas, limitação de taxa, registro de auditoria
  - Exercício estruturado com três cenários práticos (revisão de código, decisão de arquitetura, moderação de conteúdo)

#### Correções na Documentação

**Módulo 03 - Introdução**
- **05-stdio-server/README.md**: Corrigido exemplo incompleto de servidor stdio TypeScript — adicionada instância de transporte faltante (`new StdioServerTransport()`) e chamada `server.connect(transport)` para coincidir com os exemplos em Python e .NET na mesma seção
- **14-sampling/README.md**: Corrigido erro de digitação — corrigido `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Atualizações do Currículo

**README.md principal**
- Adicionada entrada 5.17 (Raciocínio Multiagente Adversarial com MCP) à tabela do currículo com link direto para a nova aula

**05-AdvancedTopics/README.md**
- Adicionada linha da Aula 5.17 à tabela de aulas

**study_guide.md**
- Adicionado tópico de Raciocínio Multiagente Adversarial ao mapa mental e descrição em prosa dos Tópicos Avançados

#### Correções de Código e Segurança

**Módulo 05 - Agentes Adversariais (`mcp-adversarial-agents`)**
- **Correção de segurança — injeção de comando**: Substituída interpolação shell `execSync` por `execFile` + `promisify` na ferramenta `run_python` em TypeScript, eliminando a superfície de injeção de comando (código controlado pelo LLM agora é passado como elemento literal argv sem envolvimento do shell)
- **Fiação do loop da ferramenta MCP**: Atualizado orquestrador de debate Python para usar cliente `AsyncAnthropic` (substituindo `Anthropic` sincrônico bloqueante), passar um `ClientSession` vivo diretamente em cada turno do agente, obter definições de ferramentas via `session.list_tools()` a cada turno e despachar blocos `tool_use` via `session.call_tool()` em loop até o modelo emitir uma resposta final em texto

#### Atualizações de Dependências

- Atualizado `hono` para 4.12.12 em múltiplos pacotes (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Atualizado `@hono/node-server` de 1.19.11 para 1.19.13 em pacotes TypeScript
- Atualizado `cryptography` de 46.0.5 para 46.0.7 em pacotes Python (labs 3 e 4 do 10-StreamliningAIWorkflows)
- Atualizado `lodash` de 4.17.23 para 4.18.1 no inspetor 10-StreamliningAIWorkflows

#### Traduções

- Sincronizadas traduções para 48+ idiomas com as últimas alterações da fonte (atualização i18n)

---

## 5 de fevereiro de 2026

### Melhorias Gerais de Validação e Navegação do Repositório

#### Novo Conteúdo do Currículo Adicionado

**Módulo 03 - Introdução**
- **12-mcp-hosts/README.md**: Novo guia abrangente para configurar hosts MCP
  - Exemplos de configuração para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelos de configuração JSON para todos os principais hosts
  - Tabela comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Solução de problemas para problemas comuns de conexão
  - Melhores práticas de segurança para configuração de hosts

- **13-mcp-inspector/README.md**: Novo guia de depuração para MCP Inspector
  - Métodos de instalação (npx, npm global, a partir do código fonte)
  - Conexão a servidores via stdio e HTTP/SSE
  - Fluxos de trabalho de ferramentas de teste, recursos e prompts
  - Integração do VS Code com MCP Inspector
  - Cenários comuns de depuração com soluções

**Módulo 04 - Implementação Prática**
- **pagination/README.md**: Novo guia de implementação de paginação
  - Padrões de paginação baseada em cursor em Python, TypeScript, Java
  - Manipulação de paginação no lado do cliente
  - Estratégias de design de cursor (opaco vs estruturado)
  - Recomendações de otimização de desempenho

**Módulo 05 - Tópicos Avançados**
- **mcp-protocol-features/README.md**: Nova análise aprofundada das funcionalidades do protocolo
  - Implementação de notificações de progresso
  - Padrões de cancelamento de requisições
  - Templates de recursos com padrões de URI
  - Gerenciamento do ciclo de vida do servidor
  - Controle do nível de log
  - Padrões de tratamento de erros com códigos JSON-RPC

#### Correções de Navegação (24+ arquivos atualizados)

**READMEs principais dos módulos**
 Agora com links para a primeira aula E próximo módulo

**Arquivos suplementares de Segurança 02-Security**
- Todos os 5 documentos suplementares de segurança agora possuem navegação "O que vem a seguir":

**Arquivos do Estudo de Caso 09-CaseStudy**
- Todos os arquivos de estudo de caso agora têm navegação sequencial:

**Laboratórios 10-StreamliningAI**
Adicionada seção O que vem a seguir ao resumo do Módulo 10 e ao Módulo 11

#### Correções de Código e Conteúdo

**Atualizações de SDK e Dependências**
Corrigida versão vazia do openai para `^4.95.0`
Atualizado SDK de `^1.8.0` para `>=1.26.0`
Atualizados pins da versão mcp para `>=1.26.0`

**Correções de Código**
Corrigido modelo inválido `gpt-4o-mini` para `gpt-4.1-mini`

**Correções de Conteúdo**
Corrigido link quebrado `READMEmd` → `README.md`, corrigido cabeçalho do currículo `Module 1-3` → `Module 0-3`, corrigido caminho com sensibilidade a maiúsculas/minúsculas
Removido conteúdo duplicado corrompido do Estudo de Caso 5

**Melhorias em Orientação para Iniciantes**
Adicionada introdução adequada, objetivos de aprendizagem e pré-requisitos para iniciantes

#### Atualizações do Currículo

**README.md principal**
- Adicionadas entradas 3.12 (Hosts MCP), 3.13 (Inspetor MCP), 4.1 (Paginação), 5.16 (Funcionalidades do Protocolo) na tabela do currículo

**READMEs dos Módulos**
Adicionadas aulas 12 e 13 à lista de aulas
Adicionada seção Guias Práticos com link para paginação
Adicionadas aulas 5.15 (Transporte Customizado) e 5.16 (Funcionalidades do Protocolo)

**study_guide.md**
- Atualizado mapa mental com todos os novos tópicos: Configuração de Hosts MCP, Inspetor MCP, Estratégias de Paginação, Análise de Funcionalidades do Protocolo

## 28 de janeiro de 2026

### Revisão de Conformidade da Especificação MCP 2025-11-25

#### Aprimoramento dos Conceitos Básicos (01-CoreConcepts/)
- **Novo Primitivo Cliente - Roots**: Adicionada documentação abrangente sobre o primitivo cliente Roots, permitindo que servidores entendam os limites do sistema de arquivos e permissões de acesso
- **Anotações de Ferramentas**: Adicionada documentação sobre anotações comportamentais de ferramentas (`readOnlyHint`, `destructiveHint`) para melhores decisões de execução de ferramentas
- **Chamada de Ferramentas no Sampling**: Atualizada documentação de Sampling para incluir parâmetros `tools` e `toolChoice` para invocação de ferramentas guiadas pelo modelo durante pedidos de amostragem
- **Modo URL de Elicitação**: Adicionada documentação sobre elicitação baseada em URL para interações externas da web iniciadas pelo servidor
- **Tarefas (Experimental)**: Adicionada nova seção documentando o recurso experimental Tasks para wrappers de execução durável e recuperação posterior de resultados
- **Suporte a Ícones**: Notado que ferramentas, recursos, templates de recursos e prompts agora podem incluir ícones como metadados adicionais

#### Atualizações na Documentação
- **README.md**: Adicionada referência à versão MCP Specification 2025-11-25 e explicação sobre versionamento baseado em data
- **study_guide.md**: Atualizado mapa curricular para incluir Tasks e Anotações de Ferramentas na seção Conceitos Básicos; atualizado carimbo de data/hora do documento

#### Verificação de Conformidade com a Especificação
- **Versão do Protocolo**: Verificadas todas as referências na documentação em conformidade com a MCP Specification 2025-11-25
- **Alinhamento de Arquitetura**: Confirmada exatidão da documentação para arquitetura de duas camadas (Camada de Dados + Camada de Transporte)
- **Documentação de Primitivos**: Validados primitivos de servidor (Recursos, Prompts, Ferramentas) e primitivos de cliente (Sampling, Elicitation, Logging, Roots)
- **Mecanismos de Transporte**: Verificada exatidão da documentação de transporte STDIO e HTTP Streamable
- **Orientações de Segurança**: Confirmado alinhamento com as atuais Melhores Práticas de Segurança MCP

#### Principais Recursos Documentados da MCP 2025-11-25
- **Descoberta OpenID Connect**: Descoberta do servidor de autenticação via OIDC
- **Documentos de Metadados do Client ID OAuth**: Mecanismo recomendado para registro do cliente
- **JSON Schema 2020-12**: Dialeto padrão para definições de esquema MCP
- **Sistema de Camadas do SDK**: Requisitos formalizados para suporte e manutenção de funcionalidades do SDK
- **Estrutura de Governança**: Formalizados Grupos de Trabalho e Grupos de Interesse na governança MCP

### Atualização Maior na Documentação de Segurança (02-Security/)

#### Integração do Workshop MCP Security Summit (Sherpa)
- **Novo Recurso de Treinamento Prático**: adicionada integração abrangente com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) em toda a documentação de segurança
- **Cobertura da Rota da Expedição**: Documentada progressão completa camp-to-camp do Acampamento Base ao Cume
- **Alinhamento OWASP**: Toda orientação de segurança agora mapeada para riscos do Guia de Segurança MCP Azure da OWASP

#### Integração OWASP MCP Top 10
- **Nova Seção**: Adicionada tabela de Riscos de Segurança OWASP MCP Top 10 com mitigações Azure ao README principal de Segurança
- **Documentação Baseada em Risco**: Atualizado mcp-security-controls-2025.md com referências a riscos OWASP MCP para cada domínio de segurança
- **Arquitetura de Referência**: Links para arquitetura de referência do Guia de Segurança MCP Azure da OWASP e padrões de implementação

#### Arquivos de Segurança Atualizados
- **README.md**: Adicionada visão geral do Workshop Sherpa, tabela da rota da expedição, resumo dos riscos OWASP MCP Top 10 e seção de treinamento prático
- **mcp-security-controls-2025.md**: Atualizado cabeçalho para fevereiro de 2026, adicionadas referências a riscos OWASP (MCP01-MCP08), corrigida inconsistência da versão da especificação
- **mcp-security-best-practices-2025.md**: Adicionada seção de recursos Sherpa e OWASP, atualizado carimbo de data/hora
- **mcp-best-practices.md**: Adicionada seção de treinamento prático com links Sherpa e OWASP
- **azure-content-safety-implementation.md**: Adicionada referência OWASP MCP06, alinhamento com Acampamento 3 Sherpa e seção de recursos adicionais

#### Novos Links de Recursos Adicionados
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [Guia de Segurança MCP Azure da OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuais de risco OWASP MCP (MCP01-MCP10)

### Alinhamento da Especificação MCP 2025-11-25 em Todo o Currículo

#### Módulo 03 - Introdução
- **Documentação do SDK**: Adicionado SDK Go à lista oficial de SDKs; atualizadas todas as referências de SDK para alinhamento com MCP Specification 2025-11-25
- **Esclarecimento de Transporte**: Atualizadas descrições dos transportes STDIO e HTTP Streaming com referências explícitas à especificação

#### Módulo 04 - Implementação Prática
- **Atualizações do SDK**: Adicionado SDK Go; atualizada lista do SDK com referência de versão da especificação
- **Especificação de Autorização**: Atualizado link da especificação MCP Authorization para a versão atual 2025-11-25

#### Módulo 05 - Tópicos Avançados
- **Novos Recursos**: Adicionada nota sobre novas funcionalidades MCP Specification 2025-11-25 (Tasks, Anotações de Ferramentas, Modo URL de Elicitação, Roots)
- **Recursos de Segurança**: Adicionados links do OWASP MCP Top 10 e workshop Sherpa às referências adicionais

#### Módulo 06 - Contribuições da Comunidade
- **Lista de SDKs**: Adicionados SDKs Swift e Rust; atualizado link da especificação para 2025-11-25
- **Referência da Especificação**: Atualizado link da MCP Specification para URL direto da especificação

#### Módulo 07 - Lições da Adoção Inicial

- **Atualizações de Recursos**: Adicionado link da Especificação MCP 2025-11-25 e OWASP MCP Top 10 aos recursos adicionais

#### Módulo 08 - Melhores Práticas
- **Versão da Especificação**: Atualizada referência da Especificação MCP para 2025-11-25
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 e workshop Sherpa às referências adicionais

#### Módulo 10 - Otimizando Fluxos de Trabalho de IA
- **Atualização do Selo**: Alterado selo da versão MCP de versão do SDK (1.9.3) para versão da especificação (2025-11-25)
- **Links de Recursos**: Atualizado link da Especificação MCP; adicionado OWASP MCP Top 10

#### Módulo 11 - Laboratórios Práticos do Servidor MCP
- **Referência da Especificação**: Atualizado link da Especificação MCP para a versão 2025-11-25
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 aos recursos oficiais

## 18 de dezembro de 2025

### Atualização da Documentação de Segurança - Especificação MCP 2025-11-25

#### Melhores Práticas de Segurança MCP (02-Security/mcp-best-practices.md) - Atualização da Versão da Especificação
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a última Especificação MCP 2025-11-25 (lançada em 25 de novembro de 2025)
  - Atualizadas todas as referências de versão da especificação de 2025-06-18 para 2025-11-25
  - Atualizadas as referências de datas do documento de 18 de agosto de 2025 para 18 de dezembro de 2025
  - Verificado que todas as URLs da especificação apontam para a documentação atual
- **Validação de Conteúdo**: Validação abrangente das melhores práticas de segurança contra os padrões mais recentes
  - **Soluções de Segurança Microsoft**: Verificada a terminologia atual e links para Prompt Shields (anteriormente "detecção de risco Jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Segurança OAuth 2.1**: Confirmada a conformidade com as melhores práticas de segurança OAuth mais recentes
  - **Padrões OWASP**: Validado que as referências ao OWASP Top 10 para LLMs permanecem atuais
  - **Serviços Azure**: Verificados todos os links da documentação Microsoft Azure e melhores práticas
- **Alinhamento aos Padrões**: Todos os padrões de segurança referenciados confirmados como atuais
  - Estrutura de Gerenciamento de Risco de IA do NIST
  - ISO 27001:2022
  - Melhores Práticas de Segurança OAuth 2.1
  - Estruturas de segurança e conformidade Azure
- **Recursos de Implementação**: Validados todos os links e recursos de guias de implementação
  - Padrões de autenticação do Azure API Management
  - Guias de integração do Microsoft Entra ID
  - Gerenciamento de segredos do Azure Key Vault
  - Pipelines DevSecOps e soluções de monitoramento

### Garantia de Qualidade da Documentação
- **Conformidade com a Especificação**: Garantido que todos os requisitos obrigatórios de segurança MCP (MUST/MUST NOT) estejam alinhados com a última especificação
- **Atualização de Recursos**: Verificados todos os links externos para documentação Microsoft, padrões de segurança e guias de implementação
- **Cobertura de Melhores Práticas**: Confirmada cobertura abrangente de autenticação, autorização, ameaças específicas de IA, segurança da cadeia de suprimentos e padrões empresariais

## 6 de outubro de 2025

### Expansão da Seção Iniciando – Uso Avançado de Servidor & Autenticação Simples

#### Uso Avançado de Servidor (03-GettingStarted/10-advanced)
- **Novo Capítulo Adicionado**: Introduzido guia abrangente para uso avançado do servidor MCP, cobrindo arquiteturas de servidor regulares e de baixo nível
  - **Servidor Regular vs. Baixo Nível**: Comparação detalhada e exemplos de código em Python e TypeScript para ambas abordagens
  - **Design Baseado em Handlers**: Explicação do gerenciamento baseado em handler para ferramentas/recursos/prompt, visando implementações de servidor escaláveis e flexíveis
  - **Padrões Práticos**: Cenários do mundo real onde padrões de servidor de baixo nível são benéficos para recursos avançados e arquitetura

#### Autenticação Simples (03-GettingStarted/11-simple-auth)
- **Novo Capítulo Adicionado**: Guia passo a passo para implementar autenticação simples em servidores MCP
  - **Conceitos de Autenticação**: Explicação clara de autenticação vs. autorização e manejo de credenciais
  - **Implementação Básica de Auth**: Padrões de autenticação baseados em middleware em Python (Starlette) e TypeScript (Express), com exemplos de código
  - **Progressão para Segurança Avançada**: Orientação para iniciar com autenticação simples e avançar para OAuth 2.1 e RBAC, com referências a módulos avançados de segurança

Essas adições fornecem orientações práticas e hands-on para construir implementações de servidor MCP mais robustas, seguras e flexíveis, conectando conceitos fundamentais a padrões avançados de produção.

## 29 de setembro de 2025

### Laboratórios de Integração de Banco de Dados MCP Server - Caminho Completo de Aprendizagem Prática

#### 11-MCPServerHandsOnLabs - Novo Currículo Completo de Integração de Banco de Dados
- **Caminho de Aprendizagem Completo com 13 Laboratórios**: Adicionado currículo prático abrangente para construir servidores MCP prontos para produção com integração ao banco de dados PostgreSQL
  - **Implementação no Mundo Real**: Caso de uso de análise para Zava Retail demonstrando padrões de nível empresarial
  - **Progressão Estruturada**:
    - **Laboratórios 00-03: Fundamentos** - Introdução, Arquitetura Central, Segurança & Multi-Tenancy, Configuração do Ambiente
    - **Laboratórios 04-06: Construindo o Servidor MCP** - Design e Esquema de Banco de Dados, Implementação do Servidor MCP, Desenvolvimento de Ferramentas
    - **Laboratórios 07-09: Recursos Avançados** - Integração de Busca Semântica, Testes & Depuração, Integração VS Code
    - **Laboratórios 10-12: Produção & Melhores Práticas** - Estratégias de Deploy, Monitoramento & Observabilidade, Melhores Práticas & Otimização
  - **Tecnologias Corporativas**: Framework FastMCP, PostgreSQL com pgvector, embeddings Azure OpenAI, Azure Container Apps, Application Insights
  - **Recursos Avançados**: Segurança em Nível de Linha (Row Level Security - RLS), busca semântica, acesso a dados multi-inquilino, embeddings vetoriais, monitoramento em tempo real

#### Padronização Terminológica - Conversão de Módulo para Laboratório
- **Atualização Abrangente da Documentação**: Atualizados sistematicamente todos os arquivos README em 11-MCPServerHandsOnLabs para usar terminologia "Laboratório" em vez de "Módulo"
  - **Cabeçalhos de Seção**: Atualizado "O que este módulo cobre" para "O que este laboratório cobre" em todos os 13 laboratórios
  - **Descrição do Conteúdo**: Alterado "Este módulo fornece..." para "Este laboratório fornece..." em toda documentação
  - **Objetivos de Aprendizagem**: Atualizado "Ao final deste módulo..." para "Ao final deste laboratório..."
  - **Links de Navegação**: Convertidos todas as referências "Módulo XX:" para "Laboratório XX:" em referências cruzadas e navegação
  - **Rastreamento de Conclusão**: Atualizado "Após completar este módulo..." para "Após completar este laboratório..."
  - **Preservação de Referências Técnicas**: Mantidas referências a módulos Python em arquivos de configuração (ex.: `"module": "mcp_server.main"`)

#### Melhoria do Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Adicionada nova seção "11. Laboratórios de Integração de Banco de Dados" com visualização abrangente da estrutura dos laboratórios
- **Estrutura do Repositório**: Atualizado de dez para onze seções principais com descrição detalhada de 11-MCPServerHandsOnLabs
- **Orientação do Caminho de Aprendizagem**: Melhoradas instruções de navegação para cobrir seções 00-11
- **Cobertura Tecnológica**: Adicionados detalhes sobre FastMCP, PostgreSQL e integração de serviços Azure
- **Resultados de Aprendizagem**: Destacada implementação de servidores prontos para produção, padrões de integração de banco de dados e segurança corporativa

#### Aperfeiçoamento da Estrutura do README Principal
- **Terminologia Baseada em Laboratórios**: Atualizado README.md principal em 11-MCPServerHandsOnLabs para uso consistente da estrutura "Laboratório"
- **Organização do Caminho de Aprendizagem**: Progressão clara de conceitos fundamentais até implementação avançada e deploy em produção
- **Foco no Mundo Real**: Ênfase em aprendizado prático com padrões e tecnologias de nível empresarial

### Melhorias na Qualidade e Consistência da Documentação
- **Ênfase em Aprendizado Prático**: Reforçado abordagem prática e baseada em laboratórios em toda documentação
- **Foco em Padrões Empresariais**: Destacado implementações prontas para produção e considerações de segurança empresarial
- **Integração Tecnológica**: Cobertura abrangente dos modernos serviços Azure e padrões de integração de IA
- **Progressão de Aprendizagem**: Caminho claro e estruturado de conceitos básicos até deploy em produção

## 26 de setembro de 2025

### Aperfeiçoamento dos Estudos de Caso - Integração do Registro MCP no GitHub

#### Estudos de Caso (09-CaseStudy/) - Foco no Desenvolvimento do Ecossistema
- **README.md**: Expansão significativa com estudo de caso abrangente sobre o Registro MCP do GitHub
  - **Estudo de Caso do Registro MCP do GitHub**: Novo estudo detalhado examinando o lançamento do Registro MCP do GitHub em setembro de 2025
    - **Análise do Problema**: Exame detalhado dos desafios fragmentados de descoberta e deploy do servidor MCP
    - **Arquitetura da Solução**: Abordagem de registro centralizado do GitHub com instalação em um clique via VS Code
    - **Impacto Comercial**: Melhorias mensuráveis na integração e produtividade do desenvolvedor
    - **Valor Estratégico**: Foco na implantação modular de agentes e interoperabilidade entre ferramentas
    - **Desenvolvimento do Ecossistema**: Posicionamento como plataforma fundamental para integração agentica
  - **Estrutura Aprimorada do Estudo de Caso**: Atualizados todos os sete estudos com formatação consistente e descrições abrangentes
    - Agentes de Viagens AI Azure: Ênfase em orquestração multi-agente
    - Integração Azure DevOps: Foco em automação de fluxo de trabalho
    - Recuperação de Documentação em Tempo Real: Implementação de cliente de console Python
    - Gerador Interativo de Plano de Estudo: Aplicação web conversacional Chainlit
    - Documentação No Editor: Integração VS Code e GitHub Copilot
    - Azure API Management: Padrões de integração API empresarial
    - Registro MCP GitHub: Desenvolvimento do ecossistema e plataforma comunitária
  - **Conclusão Abrangente**: Seção de conclusão reescrita destacando sete estudos abrangendo múltiplas dimensões da implementação MCP
    - Integração Empresarial, Orquestração Multi-Agente, Produtividade do Desenvolvedor
    - Desenvolvimento do Ecossistema, Categorização de Aplicações Educacionais
    - Insights aprimorados em padrões arquiteturais, estratégias de implementação e melhores práticas
    - Ênfase no MCP como protocolo maduro e pronto para produção

#### Atualizações do Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Atualizado mindmap para incluir Registro MCP do GitHub na seção de Estudos de Caso
- **Descrição dos Estudos de Caso**: Aprimorada de descrições genéricas para detalhamento de sete estudos de caso completos
- **Estrutura do Repositório**: Atualizada seção 10 para refletir cobertura abrangente de estudos de caso com detalhes específicos de implementação
- **Integração no Changelog**: Adicionado registro de 26 de setembro de 2025 documentando adição do Registro MCP GitHub e aprimoramentos dos estudos de caso
- **Atualizações de Datas**: Atualizado carimbo de data no rodapé para refletir última revisão (26 de setembro de 2025)

### Melhorias na Qualidade da Documentação
- **Aprimoramento da Consistência**: Padronizada formatação e estrutura dos estudos de caso em todos os sete exemplos
- **Cobertura Abrangente**: Estudos de caso abrangem agora cenários de empresa, produtividade de desenvolvedor e desenvolvimento de ecossistema
- **Posicionamento Estratégico**: Foco aprimorado no MCP como plataforma fundamental para implantação de sistemas agenticos
- **Integração de Recursos**: Recursos adicionais atualizados para incluir link do Registro MCP GitHub

## 15 de setembro de 2025

### Expansão de Temas Avançados - Transportes Customizados & Engenharia de Contexto

#### Transportes Customizados MCP (05-AdvancedTopics/mcp-transport/) - Novo Guia de Implementação Avançada
- **README.md**: Guia completo de implementação para mecanismos de transporte MCP customizados
  - **Transporte Azure Event Grid**: Implementação abrangente de transporte sem servidor orientado a eventos
    - Exemplos em C#, TypeScript e Python com integração Azure Functions
    - Padrões de arquitetura orientada a eventos para soluções MCP escaláveis
    - Receptores webhook e manipulação de mensagens push
  - **Transporte Azure Event Hubs**: Implementação de transporte de streaming de alta taxa de transferência
    - Capacidades de streaming em tempo real para cenários de baixa latência
    - Estratégias de particionamento e gerenciamento de checkpoints
    - Agrupamento de mensagens e otimização de desempenho
  - **Padrões de Integração Empresarial**: Exemplos arquiteturais prontos para produção
    - Processamento distribuído MCP via múltiplas Azure Functions
    - Arquiteturas híbridas de transporte combinando múltiplos tipos
    - Estratégias para durabilidade, confiabilidade e tratamento de erros em mensagens
  - **Segurança & Monitoramento**: Integração Azure Key Vault e padrões de observabilidade
    - Autenticação por identidade gerenciada e acesso com menor privilégio
    - Telemetria Application Insights e monitoramento de desempenho
    - Circuit breakers e padrões de tolerância a falhas
  - **Frameworks de Teste**: Estratégias abrangentes de teste para transportes customizados
    - Testes unitários com Test Doubles e frameworks de mocking
    - Testes de integração com Azure Test Containers
    - Considerações em testes de desempenho e carga

#### Engenharia de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente em IA
- **README.md**: Exploração abrangente da engenharia de contexto como campo emergente
  - **Princípios Centrais**: Compartilhamento completo de contexto, consciência na tomada de decisões e gerenciamento de janela de contexto
  - **Alinhamento com o Protocolo MCP**: Como o design MCP aborda desafios da engenharia de contexto
    - Limitações da janela de contexto e estratégias de carregamento progressivo
    - Determinação de relevância e recuperação dinâmica de contexto
    - Manipulação multimodal de contexto e considerações de segurança
  - **Abordagens de Implementação**: Arquiteturas single-threaded vs. multi-agente
    - Técnicas de fragmentação e priorização de contexto
    - Estratégias de carregamento progressivo e compressão de contexto
    - Abordagens em camadas de contexto e otimização de recuperação
  - **Framework de Medição**: Métricas emergentes para avaliação da eficácia do contexto
    - Eficiência de entrada, desempenho, qualidade e considerações de experiência do usuário
    - Abordagens experimentais para otimização de contexto
    - Análise de falhas e metodologias de melhoria

#### Atualizações de Navegação do Currículo (README.md)
- **Estrutura Aprimorada do Módulo**: Atualizada tabela do currículo para incluir novos temas avançados
  - Adicionados Engineering de Contexto (5.14) e Transporte Customizado (5.15)
  - Formatação consistente e links de navegação em todos os módulos
  - Atualizadas descrições para refletir escopo atual de conteúdo

### Melhorias na Estrutura de Diretórios
- **Padronização de Nomeação**: Renomeado "mcp transport" para "mcp-transport" para consistência com outras pastas de temas avançados
- **Organização de Conteúdo**: Todas as pastas 05-AdvancedTopics agora seguem padrão de nomenclatura consistente (mcp-[topic])

### Melhorias na Qualidade da Documentação
- **Alinhamento à Especificação MCP**: Todos os conteúdos novos referenciam a Especificação MCP atual 2025-06-18
- **Exemplos Multilíngues**: Exemplos de código abrangentes em C#, TypeScript e Python

- **Foco Empresarial**: Padrões prontos para produção e integração com a nuvem Azure em todo o projeto
- **Documentação Visual**: Diagramas Mermaid para visualização de arquitetura e fluxos

## 18 de agosto de 2025

### Atualização Abrangente da Documentação - Padrões MCP 2025-06-18

#### Melhores Práticas de Segurança MCP (02-Security/) - Modernização Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescrita completa alinhada com a Especificação MCP 2025-06-18
  - **Requisitos Obrigatórios**: Adicionados requisitos explícitos DEVE/Não DEVE da especificação oficial com indicadores visuais claros
  - **12 Práticas de Segurança Principais**: Reestruturado de uma lista de 15 itens para domínios de segurança abrangentes
    - Segurança de Tokens & Autenticação com integração de provedor de identidade externo
    - Gestão de Sessão & Segurança de Transporte com requisitos criptográficos
    - Proteção Específica contra Ameaças AI com integração do Microsoft Prompt Shields
    - Controle de Acesso & Permissões com princípio do menor privilégio
    - Segurança & Monitoramento de Conteúdo com integração do Azure Content Safety
    - Segurança da Cadeia de Suprimentos com verificação abrangente de componentes
    - Segurança OAuth & Prevenção de Confused Deputy com implementação PKCE
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
    - Conformidade & Governança com alinhamento regulatório
    - Controles de Segurança Avançados com arquitetura zero trust
    - Integração ao Ecossistema de Segurança Microsoft com soluções abrangentes
    - Evolução Contínua da Segurança com práticas adaptativas
  - **Soluções de Segurança Microsoft**: Orientação de integração aprimorada para Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security
  - **Recursos de Implementação**: Links de recursos organizados por Documentação Oficial MCP, Soluções de Segurança Microsoft, Padrões de Segurança e Guias de Implementação

#### Controles de Segurança Avançados (02-Security/) - Implementação Empresarial
- **MCP-SECURITY-CONTROLS-2025.md**: Reformulação completa com framework de segurança empresarial
  - **9 Domínios Completos de Segurança**: Expandido de controles básicos para framework empresarial detalhado
    - Autenticação Avançada & Autorização com integração do Microsoft Entra ID
    - Segurança de Tokens & Controles Anti-Passthrough com validação abrangente
    - Controles de Segurança de Sessão com prevenção de sequestro
    - Controles de Segurança Específicos para AI com prevenção de prompt injection e envenenamento de ferramentas
    - Prevenção de Ataques Confused Deputy com segurança de proxy OAuth
    - Segurança de Execução de Ferramentas com sandboxing e isolamento
    - Controles de Segurança da Cadeia de Suprimentos com verificação de dependências
    - Controles de Monitoramento & Detecção com integração SIEM
    - Resposta a Incidentes & Recuperação com capacidades automatizadas
  - **Exemplos de Implementação**: Adicionados blocos YAML de configuração detalhados e exemplos de código
  - **Integração com Soluções Microsoft**: Cobertura abrangente dos serviços de segurança Azure, GitHub Advanced Security e gerenciamento empresarial de identidade

#### Segurança em Tópicos Avançados (05-AdvancedTopics/mcp-security/) - Implementação Pronta para Produção
- **README.md**: Reescrita completa para implementação de segurança empresarial
  - **Alinhamento com Especificação Atual**: Atualizado para Especificação MCP 2025-06-18 com requisitos obrigatórios de segurança
  - **Autenticação Aprimorada**: Integração Microsoft Entra ID com exemplos completos em .NET e Java Spring Security
  - **Integração de Segurança AI**: Implementação Microsoft Prompt Shields e Azure Content Safety com exemplos detalhados em Python
  - **Mitigação Avançada de Ameaças**: Exemplos abrangentes de implementação para
    - Prevenção de Ataques Confused Deputy com PKCE e validação de consentimento do usuário
    - Prevenção de Token Passthrough com validação de audiência e gerenciamento seguro de tokens
    - Prevenção de Sequestro de Sessão com vínculo criptográfico e análise comportamental
  - **Integração de Segurança Empresarial**: Monitoramento Azure Application Insights, pipelines de detecção de ameaças e segurança da cadeia de suprimentos
  - **Lista de Verificação de Implementação**: Controles de segurança claros e obrigatórios vs. recomendados com benefícios do ecossistema Microsoft de segurança

### Qualidade da Documentação & Alinhamento de Padrões
- **Referências da Especificação**: Atualizadas todas as referências para a Especificação MCP 2025-06-18
- **Ecossistema de Segurança Microsoft**: Orientações de integração aprimoradas em toda a documentação de segurança
- **Implementação Prática**: Exemplos detalhados de código adicionados em .NET, Java e Python com padrões empresariais
- **Organização de Recursos**: Categoria abrangente de documentação oficial, padrões de segurança e guias de implementação
- **Indicadores Visuais**: Marcação clara de requisitos obrigatórios vs. práticas recomendadas


#### Conceitos Principais (01-CoreConcepts/) - Modernização Completa
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a Especificação MCP 2025-06-18 com versionamento baseado em data (formato AAAA-MM-DD)
- **Aprimoramento da Arquitetura**: Descrições aprimoradas de Hosts, Clientes e Servidores para refletir padrões atuais de arquitetura MCP
  - Hosts agora claramente definidos como aplicações AI coordenando múltiplas conexões de clientes MCP
  - Clientes descritos como conectores de protocolo mantendo relacionamentos um-para-um com servidores
  - Servidores aprimorados com cenários de implantação local vs. remota
- **Reestruturação de Primitivos**: Reformulação completa de primitivas de servidor e cliente
  - Primitivos de Servidor: Recursos (fontes de dados), Prompts (modelos), Ferramentas (funções executáveis) com explicações e exemplos detalhados
  - Primitivos de Cliente: Saída (completions de LLM), Elicitação (entrada do usuário), Registro (depuração/monitoramento)
  - Atualizado com padrões atuais de métodos de descoberta (`*/list`), recuperação (`*/get`) e execução (`*/call`)
- **Arquitetura do Protocolo**: Introduzido modelo de arquitetura em duas camadas
  - Camada de Dados: Fundação JSON-RPC 2.0 com gerenciamento do ciclo de vida e primitivas
  - Camada de Transporte: STDIO (local) e HTTP transmissível com SSE (remoto) como mecanismos de transporte
- **Framework de Segurança**: Princípios abrangentes de segurança incluindo consentimento explícito do usuário, proteção da privacidade de dados, segurança na execução de ferramentas e segurança na camada de transporte
- **Padrões de Comunicação**: Mensagens do protocolo atualizadas para mostrar fluxos de inicialização, descoberta, execução e notificação
- **Exemplos de Código**: Exemplos multilinguagem atualizados (.NET, Java, Python, JavaScript) para refletir padrões atuais do SDK MCP

#### Segurança (02-Security/) - Reformulação Completa da Segurança  
- **Alinhamento de Padrões**: Totalmente alinhado com os requisitos de segurança da Especificação MCP 2025-06-18
- **Evolução da Autenticação**: Documentada evolução de servidores OAuth customizados para delegação de provedor de identidade externo (Microsoft Entra ID)
- **Análise de Ameaças Específicas para AI**: Cobertura ampliada dos vetores de ataque modernos de AI
  - Cenários detalhados de ataques de prompt injection com exemplos do mundo real
  - Mecanismos de envenenamento de ferramentas e padrões de ataque "rug pull"
  - Envenenamento da janela de contexto e ataques de confusão de modelo
- **Soluções Microsoft de Segurança AI**: Cobertura abrangente do ecossistema de segurança Microsoft
  - AI Prompt Shields com técnicas avançadas de detecção, destaque e delimitadores
  - Padrões de integração do Azure Content Safety
  - GitHub Advanced Security para proteção da cadeia de suprimentos
- **Mitigação Avançada de Ameaças**: Controles de segurança detalhados para
  - Sequestro de sessão com cenários de ataque específicos MCP e requisitos criptográficos para ID de sessão
  - Problemas de confused deputy em cenários de proxy MCP com requisitos explícitos de consentimento
  - Vulnerabilidades de token passthrough com controles obrigatórios de validação
- **Segurança da Cadeia de Suprimentos**: Expansão da cobertura da cadeia de suprimentos AI incluindo modelos fundacionais, serviços de embeddings, provedores de contexto e APIs de terceiros
- **Segurança de Fundamentos**: Integração aprimorada com padrões empresariais de segurança incluindo arquitetura zero trust e ecossistema de segurança Microsoft
- **Organização de Recursos**: Links de recursos organizados por tipo (Documentação Oficial, Padrões, Pesquisa, Soluções Microsoft, Guias de Implementação)

### Melhorias na Qualidade da Documentação
- **Objetivos de Aprendizagem Estruturados**: Objetivos de aprendizagem aprimorados com resultados específicos e acionáveis 
- **Referências Cruzadas**: Adicionados links entre tópicos relacionados de segurança e conceitos principais
- **Informações Atuais**: Atualizadas todas as referências de datas e links para especificações segundo os padrões atuais
- **Orientação de Implementação**: Diretrizes específicas e acionáveis de implementação adicionadas em ambas as seções

## 16 de julho de 2025

### Melhorias no README e Navegação
- Navegação do currículo redesenhada completamente no README.md
- Substituídas tags `<details>` por formato baseado em tabelas mais acessível
- Criadas opções de layout alternativas na nova pasta "alternative_layouts"
- Adicionados exemplos de navegação em estilo por cartões, abas e acordeão
- Atualizada a seção de estrutura do repositório para incluir todos os arquivos mais recentes
- Aprimorada a seção "Como Usar Este Currículo" com recomendações claras
- Atualizados os links da especificação MCP para apontar para URLs corretos
- Adicionada seção de Engenharia de Contexto (5.14) à estrutura do currículo

### Atualizações do Guia de Estudo
- Guia de estudo revisado completamente para alinhamento com a estrutura atual do repositório
- Adicionadas novas seções para Clientes MCP e Ferramentas, e Servidores MCP Populares
- Atualizado o Mapa Visual do Currículo para refletir com precisão todos os tópicos
- Aprimoradas descrições de Tópicos Avançados para cobrir todas as áreas especializadas
- Atualizada a seção de Estudos de Caso para refletir exemplos reais
- Adicionado este changelog abrangente

### Contribuições da Comunidade (06-CommunityContributions/)
- Adicionadas informações detalhadas sobre servidores MCP para geração de imagens
- Adicionada seção abrangente sobre o uso do Claude no VSCode
- Adicionadas instruções de configuração e uso do cliente terminal Cline
- Atualizada a seção de clientes MCP para incluir todas as opções populares
- Exemplos de contribuição aprimorados com amostras de código mais precisas

### Tópicos Avançados (05-AdvancedTopics/)
- Organizamos todas as pastas de tópicos especializados com nomenclatura consistente
- Adicionados materiais e exemplos de engenharia de contexto
- Adicionada documentação de integração do agente Foundry
- Aprimorada documentação de integração de segurança Entra ID

## 11 de junho de 2025

### Criação Inicial
- Lançada a primeira versão do currículo MCP para Iniciantes
- Criada estrutura básica para todas as 10 seções principais
- Implementado o Mapa Visual do Currículo para navegação
- Adicionados projetos de exemplo iniciais em múltiplas linguagens de programação

### Começando (03-GettingStarted/)
- Criados primeiros exemplos de implementação de servidor
- Adicionadas orientações para desenvolvimento de clientes
- Instruções de integração do cliente LLM incluídas
- Documentação da integração com VS Code adicionada
- Implementados exemplos de servidores Server-Sent Events (SSE)

### Conceitos Principais (01-CoreConcepts/)
- Explicação detalhada da arquitetura cliente-servidor adicionada
- Criada documentação dos principais componentes do protocolo
- Documentados padrões de mensagens no MCP

## 23 de maio de 2025

### Estrutura do Repositório
- Repositório inicializado com estrutura básica de pastas
- Criados arquivos README para cada seção principal
- Configurada a infraestrutura de tradução
- Adicionados recursos de imagem e diagramas

### Documentação
- Criado README.md inicial com visão geral do currículo
- Adicionados CODE_OF_CONDUCT.md e SECURITY.md
- Configurado SUPPORT.md com orientações para obtenção de ajuda
- Criada estrutura preliminar do guia de estudo

## 15 de abril de 2025

### Planejamento e Framework
- Planejamento inicial para o currículo MCP para Iniciantes
- Definidos objetivos de aprendizagem e público-alvo
- Estrutura de 10 seções do currículo delineada
- Desenvolvido framework conceitual para exemplos e estudos de caso
- Criados protótipos iniciais de exemplos para conceitos principais

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->