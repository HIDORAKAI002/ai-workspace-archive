# Changelog: Currículo MCP para Iniciantes

Este documento serve como registo de todas as alterações significativas feitas ao currículo Model Context Protocol (MCP) para Iniciantes. As alterações são documentadas por ordem cronológica inversa (mudanças mais recentes primeiro).

## 24 de junho de 2026

### Nova Aula: Usar MCP na app Copilot

- [Secção de ferramentas](./12-tooling/README.md) Secção de ferramentas adicionada.
- [MCP na app Copilot](./12-tooling/01-copilot-app/README.md)

## 16 de junho de 2026

### Alinhamento da Especificação MCP & Validação de Exemplos

Validado o currículo contra a atual **Especificação MCP 2025-11-25** e os SDKs oficiais mais recentes, depois corrigidas as referências obsoletas que restavam na especificação e confirmado que os exemplos principais continuam a construir e funcionar.

#### Correções de Versão da Especificação (2025-06-18 / 2025-03-26 → 2025-11-25)

Atualizado conteúdo em inglês onde ainda indicava que uma revisão da especificação anterior era a norma *atual/latest*, e alterados os links para os caminhos canónicos da especificação em `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Atualizado o banner "Current Standard", introdução, título dos princípios centrais de segurança, título dos requisitos obrigatórios, seção Microsoft Entra ID, links de Referências & Recursos, e o aviso final de segurança (8 referências) para 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Atualizado o link da especificação nos Recursos Adicionais e o banner "Current Standard" para 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Substituído o link desatualizado `2025-03-26` para segurança e confiança pela página atual de boas práticas de segurança 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Atualizado o link oficial da documentação de sampling para 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Atualizada a referência presente de "especificação MCP atual" e o link da especificação nos Recursos Adicionais para 2025-11-25 (notas históricas sobre descontinuação do SSE mantidas para precisão)

#### Validação dos Exemplos Contra SDKs Atuais

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` instalou `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passou sem erros de tipo — APIs existentes `McpServer` / `StdioServerTransport` continuam válidas
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validado em `.venv` isolado com `mcp[cli]` (1.27.2); `py_compile` passou e `FastMCP.list_tools()` retornou corretamente as ferramentas `add` e `subtract`
- Confirmado que todas as faixas de versões `@modelcontextprotocol/sdk` nos exemplos (`>=1.26.0` / `^1.26.0` / `^1.27.0`) resolvem limpidamente para a atual `1.29.0` sem alterações de API que quebrem compatibilidade

#### Alinhamento do Travamento de Dependências (fechamento de lacunas de versões)

Elevados pins desatualizados do SDK para que todos os exemplos acompanhem a versão atual do MCP, seguindo a convenção do repositório:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Atualizado `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` e descrição do pacote obsoleta `"updated for MCP 2025-06-18"` alterada para `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** e **lab4/code/github_mcp_server/pyproject.toml**: Atualizado o pin exato `mcp==1.23.0` → `mcp>=1.26.0`; regenerados ambos os ficheiros `uv.lock` (`uv lock`) para que os lockfiles resolvam para o atual `mcp 1.27.2` e se mantenham sincronizados com os manifestos

#### Análise de Lacunas do Currículo — Cobertura das Funcionalidades da Última Spec

Verificado que o currículo já cobre todos os primitivos introduzidos/expandidos no MCP 2025-11-25, pelo que não existem lacunas de conteúdo:
- **Sampling**: Aula 03-GettingStarted/14-sampling e 05-AdvancedTopics/mcp-sampling
- **Elicitação (incl. modo URL)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Raízes**: Documentado em 00-Introduction, 01-CoreConcepts e 05-AdvancedTopics/mcp-root-contexts
- **Tarefas (experimental, operações longas)**: Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features
- **Anotações de Ferramentas** (`readOnlyHint` / `destructiveHint`): Documentado em 01-CoreConcepts e 05-AdvancedTopics/mcp-protocol-features

### Reforço de Segurança & Correção de Vulnerabilidades em Dependências

Executada uma revisão completa de segurança em todos os manifestos de dependências e no código-fonte dos exemplos, depois corrigidos todos os avisos npm reportados e uma questão a nível de código. Após a correção, o `npm audit` reporta **0 vulnerabilidades** em todos os diretórios auditados.

#### Vulnerabilidades em Dependências npm (transitivas) — Corrigidas

Auditados todos os 15 ficheiros `package-lock.json` comitados. As vulnerabilidades restringiam-se a dependências transitivas usadas pela ferramenta dev MCP Inspector, cliente OpenAI e SDK MCP; todas agora resolvidas sem quebrar os exemplos:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** e **lab3/code/weather_mcp/inspector**: Elevado `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), que limpou as advertências nos pacotes bundlados `ajv`, `brace-expansion`, `diff`, `path-to-regexp` e `ws`. Adicionada entrada npm `overrides` que força a versão corrigida `shell-quote@1.8.4` para eliminar o último aviso crítico carregado pelo `concurrently`; regenerados ambos os lockfiles (agora com 0 vulnerabilidades)
- **03-GettingStarted/samples/typescript**: `npm audit fix` atualizou o `qs` transitivo (moderado) para uma versão corrigida
- **03-GettingStarted/samples/javascript**: `npm audit fix` atualizou o `hono` transitivo (moderado) para uma versão corrigida
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` atualizou o `form-data` transitivo (alto) para uma versão corrigida
- **03-GettingStarted/11-simple-auth/solution/typescript**: Gerado o `package-lock.json` em falta para que o projeto seja reprodutível e auditável (0 vulnerabilidades)

#### Correção de Segurança a Nível de Código (OWASP A03: Injeção)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Removido `shell=True` da ferramenta `open_in_vscode`. O anterior `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitia que meta-caracteres de shell numa path de pasta fossem interpretados pelo `cmd.exe` (vetor de injeção de comandos). Agora invoca diretamente o `Code.exe` resolvido com a pasta como argumento — sem shell — segurança funcionalmente equivalente

#### Auditoria de Dependências Python

- Auditados todos os conjuntos de requirements Python com `pip-audit`. `05-AdvancedTopics` e `03-GettingStarted/samples/python` reportaram **nenhuma vulnerabilidade conhecida** (as versões `mcp` / `httpx` / `pydantic` / `python-dotenv` resolvem para as versões corrigidas atuais)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` assinalou a dependência transitiva **`werkzeug` 3.1.1** com três avisos DoS relacionados à função `safe_join` e nomes de dispositivo do Windows — `CVE-2025-66221`, `CVE-2026-21860`, e `CVE-2026-27199` (todos corrigidos na 3.1.6). Acrescentada fixação explícita de segurança `werkzeug>=3.1.6` para garantir que a versão corrigida é resolvida; verificado que a restrição resolves limpamente com a stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding do Nome do Produto

Atualizados todos os conteúdos do currículo para refletir o rebranding de produtos da Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Atualizado link da comunidade Discord
- **AGENTS.md**: Atualizada referência ao servidor Discord
- **README.md**: Atualizadas referências ao ecossistema tecnológico
- **study_guide.md**: Atualizadas referências nos casos de estudo
- **05-AdvancedTopics/README.md**: Atualizado título e descrição do Módulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Cabeçalho de secção e descrição atualizados
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Atualização completa do título do módulo e conteúdo
- **05-AdvancedTopics/mcp-security-entra/README.md**: Atualizado link de referência cruzada
- **07-LessonsfromEarlyAdoption/README.md**: Atualizadas referências nos casos de estudo
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Atualizado título da Secção 9, crachás e capacidades
- **08-BestPractices/README.md**: Atualizado link da comunidade Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Atualizado referência ao canal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Atualizada referência ao deployment de modelos
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Atualizada tabela de Serviços AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Atualizadas referências a recursos

#### AI Toolkit / AITK → Extensão Microsoft Foundry Toolkit para VS Code
- **README.md**: Atualizadas as referências principais do currículo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Atualizado título do módulo, visão geral e todos os cabeçalhos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Atualizados título, objetivos de aprendizagem, instruções de configuração e recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Atualizados título, objetivos de aprendizagem, tabela de hosts MCP e referências cruzadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Atualizados título, crachás, pré-requisitos e recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Atualizadas referências do Agent Builder e link para feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Atualizados pré-requisitos e referências da extensão

---

## 11 de abril de 2026

### Nova Aula, Correções de Documentação e Atualizações de Dependências

#### Novo Conteúdo no Currículo

**Módulo 05 - Tópicos Avançados**
- **Aula 5.17: Raciocínio Multi-Agente Adversarial com MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Novo guia abrangente sobre o padrão de debate adversarial para sistemas multi-agente
  - Diagrama de arquitetura Mermaid: dois agentes → servidor MCP partilhado → transcrição do debate → juiz → veredito
  - Servidor de ferramentas MCP partilhado (`web_search` + `run_python`) implementado em Python e TypeScript
  - Prompts de sistema opostos (A FAVOR / CONTRA / Juiz) com requisitos explícitos de uso de ferramentas
  - Orquestrador de debate em Python, TypeScript e C# a gerir rondas e a encaminhar argumentos
  - Wiring MCP `ClientSession` para o orquestrador realizar chamadas reais a ferramentas
  - Tabela de casos de uso (detecção de alucinações, modelagem de ameaças, revisão de design de API, verificação factual, seleção tecnológica)
  - Considerações de segurança: execução sandboxed, validação de chamadas a ferramentas, limitação de taxa, registo de auditoria
  - Exercício estruturado com três cenários práticos (revisão de código, decisão arquitetónica, moderação de conteúdo)

#### Correções de Documentação

**Módulo 03 - Introdução**
- **05-stdio-server/README.md**: Corrigido exemplo incompleto do servidor stdio TypeScript — adicionada instância de transporte em falta (`new StdioServerTransport()`) e chamada `server.connect(transport)` para coincidir com os exemplos Python e .NET da mesma secção
- **14-sampling/README.md**: Corrigido erro tipográfico — corrigido `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Atualizações do Currículo

**README.md Principal**
- Adicionada entrada 5.17 (Raciocínio Multi-Agente Adversarial com MCP) à tabela de currículo com link direto para a nova aula

**05-AdvancedTopics/README.md**
- Adicionada linha da Aula 5.17 à tabela de aulas

**study_guide.md**
- Adicionado o tópico Raciocínio Multi-Agente Adversarial ao mapa mental e à descrição em prosa dos Tópicos Avançados

#### Correções de Código e Segurança

**Módulo 05 - Agentes Adversariais (`mcp-adversarial-agents`)**
- **Correção de segurança — injeção de comando**: Substituiu a interpolação de shell `execSync` por `execFile` + `promisify` na ferramenta TypeScript `run_python`, eliminando a superfície de injeção de comando (o código controlado pelo LLM é agora passado como um elemento argv literal sem envolvimento do shell)
- **Fiação do ciclo da ferramenta MCP**: Atualizou o orquestrador de debate Python para usar o cliente `AsyncAnthropic` (substituindo o `Anthropic` síncrono bloqueante), passar uma `ClientSession` ativa diretamente para cada turno do agente, buscar definições de ferramentas via `session.list_tools()` a cada turno, e despachar blocos `tool_use` via `session.call_tool()` num ciclo até o modelo emitir uma resposta de texto final

#### Atualizações de Dependências

- Atualizado `hono` para 4.12.12 em vários pacotes (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Atualizado `@hono/node-server` de 1.19.11 para 1.19.13 em pacotes TypeScript
- Atualizado `cryptography` de 46.0.5 para 46.0.7 em pacotes Python (laboratórios 3 e 4 do 10-StreamliningAIWorkflows)
- Atualizado `lodash` de 4.17.23 para 4.18.1 no inspetor 10-StreamliningAIWorkflows

#### Traduções

- Sincronizadas traduções para mais de 48 idiomas com as alterações mais recentes do código-fonte (atualização i18n)

---

## 5 de Fevereiro de 2026

### Melhorias de Validação e Navegação em Todo o Repositório

#### Novo Conteúdo de Currículo Adicionado

**Módulo 03 - Começar**
- **12-mcp-hosts/README.md**: Novo guia completo para configuração de hosts MCP
  - Exemplos de configuração para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelos JSON de configuração para todos os hosts principais
  - Tabela comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Resolução de problemas comuns de ligação
  - Melhores práticas de segurança para configuração de hosts

- **13-mcp-inspector/README.md**: Novo guia de depuração para MCP Inspector
  - Métodos de instalação (npx, npm global, a partir do código-fonte)
  - Ligação a servidores via stdio e HTTP/SSE
  - Ferramentas de teste, recursos e fluxos de trabalho de prompts
  - Integração do VS Code com o MCP Inspector
  - Cenários comuns de depuração com soluções

**Módulo 04 - Implementação Prática**
- **pagination/README.md**: Novo guia de implementação de paginação
  - Padrões de paginação baseados em cursor em Python, TypeScript, Java
  - Gestão de paginação no lado do cliente
  - Estratégias de design de cursor (opaco vs. estruturado)
  - Recomendações para otimização do desempenho

**Módulo 05 - Tópicos Avançados**
- **mcp-protocol-features/README.md**: Novo aprofundamento em funcionalidades do protocolo
  - Implementação de notificações de progresso
  - Padrões de cancelamento de pedidos
  - Templates de recursos com padrões URI
  - Gestão do ciclo de vida do servidor
  - Controlo de nível de registo
  - Padrões de tratamento de erros com códigos JSON-RPC

#### Correções de Navegação (mais de 24 ficheiros atualizados)

**READMEs do Módulo Principal**
 Agora os links apontam tanto para a primeira lição COMO para o próximo módulo

**Subficheiros de Segurança 02-Security**
- Os 5 documentos suplementares de segurança têm agora navegação "O Que Segue":

**Ficheiros do Estudo de Caso 09-CaseStudy**
- Todos os ficheiros do estudo de caso têm navegação sequencial:

**Laboratórios 10-StreamliningAI**
Adicionada secção "O Que Segue" à visão geral do Módulo 10 e ao Módulo 11

#### Correções de Código e Conteúdo

**Atualizações do SDK e Dependências**
Corrigida versão vazia do openai para `^4.95.0`
Atualizado SDK de `^1.8.0` para `>=1.26.0`
Atualizados pins da versão mcp para `>=1.26.0`

**Correções de Código**
Corrigido modelo inválido `gpt-4o-mini` para `gpt-4.1-mini`

**Correções de Conteúdo**
Corrigido link partido `READMEmd` → `README.md`, corrigido cabeçalho do currículo `Module 1-3` → `Module 0-3`, corrigido caminho sensível a maiúsculas e minúsculas
Removido conteúdo duplicado corrompido do Estudo de Caso 5

**Melhorias na Orientação para Iniciantes**
Adicionada introdução apropriada, objetivos de aprendizagem e pré-requisitos para iniciantes

#### Atualizações do Currículo

**README.md Principal**
- Adicionadas entradas 3.12 (Hosts MCP), 3.13 (Inspector MCP), 4.1 (Paginação), 5.16 (Funcionalidades do Protocolo) à tabela do currículo

**READMEs dos Módulos**
Adicionadas lições 12 e 13 à lista de lições
Adicionada secção Guias Práticos com link de paginação
Adicionadas lições 5.15 (Transporte Personalizado) e 5.16 (Funcionalidades do Protocolo)

**study_guide.md**
- Atualizado o mindmap com todos os novos tópicos: Configuração de Hosts MCP, Inspector MCP, Estratégias de Paginação, Aprofundamento em Funcionalidades do Protocolo

## 28 de Janeiro de 2026

### Revisão de Conformidade da Especificação MCP 2025-11-25

#### Melhoria de Conceitos Base (01-CoreConcepts/)
- **Novo Primitivo Cliente - Roots**: Adicionada documentação completa sobre o primitivo de cliente Roots, permitindo que servidores compreendam limites do sistema de ficheiros e permissões de acesso
- **Anotações de Ferramentas**: Adicionada documentação sobre anotações comportamentais de ferramentas (`readOnlyHint`, `destructiveHint`) para melhor tomada de decisão na execução de ferramentas
- **Chamada de Ferramentas na Amostragem**: Atualizada documentação de Amostragem para incluir os parâmetros `tools` e `toolChoice` para invocação de ferramentas orientada por modelo durante pedidos de amostragem
- **Modo URL de Elicitação**: Adicionada documentação sobre elicitação baseada em URL para interações externas iniciadas pelo servidor
- **Tarefas (Experimental)**: Adicionada nova secção documentando a funcionalidade experimental Tarefas para invólucros de execução durável e recuperação de resultados diferidos
- **Suporte a Ícones**: Notado que ferramentas, recursos, templates de recursos e prompts podem agora incluir ícones como metadados adicionais

#### Atualizações de Documentação
- **README.md**: Adicionada referência à versão da Especificação MCP 2025-11-25 e explicação sobre versionamento baseado em datas
- **study_guide.md**: Atualizado mapa curricular para incluir Tarefas e Anotações de Ferramentas na secção Conceitos Base; atualizado carimbo temporal do documento

#### Verificação de Conformidade da Especificação
- **Versão do Protocolo**: Verificada a documentação para garantir referência à atual Especificação MCP 2025-11-25
- **Alinhamento Arquitetónico**: Confirmada precisão da documentação da arquitetura em duas camadas (Data Layer + Transport Layer)
- **Documentação dos Primitivos**: Validação dos primitivos de servidor (Recursos, Prompts, Ferramentas) e dos primitivos de cliente (Amostragem, Elicitação, Registos, Roots)
- **Mecanismos de Transporte**: Verificada precisão da documentação do transporte STDIO e HTTP Streamable
- **Orientação de Segurança**: Confirmado que está alinhada com a documentação atual de Melhores Práticas de Segurança MCP

#### Funcionalidades-chave do MCP 2025-11-25 Documentadas
- **Descoberta OpenID Connect**: Descoberta de servidor de autenticação via OIDC
- **Documentos de Metadados do Client ID OAuth**: Mecanismo recomendado para registo de clientes
- **JSON Schema 2020-12**: Dialeto padrão para definições de esquema MCP
- **Sistema de Níveis do SDK**: Requisitos formalizados para suporte e manutenção das funcionalidades do SDK
- **Estrutura de Governação**: Formalização de Grupos de Trabalho e Grupos de Interesse na governação MCP

### Grande Atualização da Documentação de Segurança (02-Security/)

#### Integração do Workshop MCP Security Summit (Sherpa)
- **Novo Recurso Prático**: Adicionada integração completa com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) em toda a documentação de segurança
- **Cobertura da Rota da Expedição**: Documentado o progresso completo de acampamento a acampamento desde Base Camp até ao Summit
- **Alinhamento OWASP**: Toda a orientação de segurança agora corresponde aos riscos OWASP MCP no Guia de Segurança Azure

#### Integração OWASP MCP Top 10
- **Nova Secção**: Adicionada tabela dos Riscos de Segurança OWASP MCP Top 10 com mitigações Azure ao README principal de Segurança
- **Documentação Baseada em Riscos**: Atualizado mcp-security-controls-2025.md com referências de risco OWASP MCP para cada domínio de segurança
- **Arquitetura de Referência**: Ligação à arquitetura de referência OWASP MCP Azure Security Guide e padrões de implementação

#### Ficheiros de Segurança Atualizados
- **README.md**: Adicionada visão geral do Workshop Sherpa, tabela da rota da expedição, resumo dos riscos OWASP MCP Top 10 e secção de formação prática
- **mcp-security-controls-2025.md**: Cabeçalho atualizado para fevereiro 2026, adicionadas referências a riscos OWASP (MCP01-MCP08), corrigida inconsistência na versão da especificação
- **mcp-security-best-practices-2025.md**: Adicionadas secções de recursos Sherpa e OWASP, atualizado carimbo temporal
- **mcp-best-practices.md**: Adicionada secção de formação prática com links do Sherpa e OWASP
- **azure-content-safety-implementation.md**: Adicionada referência OWASP MCP06, alinhamento com Sherpa Camp 3 e secção de recursos adicionais

#### Novos Links de Recursos Adicionados
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuais de riscos OWASP MCP (MCP01-MCP10)

### Alinhamento do Currículo com a Especificação MCP 2025-11-25

#### Módulo 03 - Começar
- **Documentação do SDK**: Adicionado Go SDK à lista oficial de SDKs; atualizadas todas as referências de SDK para alinhamento com a Especificação MCP 2025-11-25
- **Clarificação do Transporte**: Atualizadas descrições dos transportes STDIO e HTTP Streaming com referências explícitas à especificação

#### Módulo 04 - Implementação Prática
- **Atualizações do SDK**: Adicionado Go SDK; lista de SDK atualizada com referência à versão da especificação
- **Especificação de Autorização**: Atualizado link da especificação MCP de autorização para a versão atual 2025-11-25

#### Módulo 05 - Tópicos Avançados
- **Novas Funcionalidades**: Nota adicionada sobre as novas funcionalidades da Especificação MCP 2025-11-25 (Tarefas, Anotações de Ferramentas, Modo URL de Elicitação, Roots)
- **Recursos de Segurança**: Adicionados links para OWASP MCP Top 10 e workshop Sherpa em referências adicionais

#### Módulo 06 - Contribuições da Comunidade
- **Lista de SDKs**: Adicionados SDKs Swift e Rust; link da especificação atualizado para 2025-11-25
- **Referência da Especificação**: Atualizada para URL direta da especificação MCP

#### Módulo 07 - Lições da Adoção Inicial
- **Atualizações de Recursos**: Adicionado link para Especificação MCP 2025-11-25 e OWASP MCP Top 10 a recursos adicionais

#### Módulo 08 - Melhores Práticas
- **Versão da Especificação**: Atualizada referência da Especificação MCP para 2025-11-25
- **Recursos de Segurança**: Adicionados OWASP MCP Top 10 e workshop Sherpa a referências adicionais

#### Módulo 10 - Otimização de Fluxos de Trabalho de IA
- **Atualização do Selo**: Alterado selo da versão MCP do número de versão do SDK (1.9.3) para a versão da especificação (2025-11-25)
- **Links de Recursos**: Atualizado link da Especificação MCP; adicionado OWASP MCP Top 10

#### Módulo 11 - Laboratórios Práticos MCP Server
- **Referência da Especificação**: Atualizado link para versão 2025-11-25 da Especificação MCP
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 aos recursos oficiais

## 18 de Dezembro de 2025

### Atualização da Documentação de Segurança - Especificação MCP 2025-11-25

#### Melhores Práticas de Segurança MCP (02-Security/mcp-best-practices.md) - Atualização da Versão da Especificação
- **Atualização da Versão do Protocolo**: Atualizado para referência à mais recente Especificação MCP 2025-11-25 (lançada a 25 de Novembro de 2025)
  - Atualizadas todas as referências da versão da especificação de 2025-06-18 para 2025-11-25
  - Atualizadas datas do documento de 18 de Agosto de 2025 para 18 de Dezembro de 2025
  - Verificados todos os URLs da especificação apontarem para documentação atual
- **Validação de Conteúdo**: Validação abrangente das melhores práticas de segurança face aos últimos standards
  - **Soluções de Segurança Microsoft**: Verificada a atual terminologia e links para Prompt Shields (anteriormente "detecção de risco de jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Segurança OAuth 2.1**: Confirmado alinhamento com as melhores práticas de segurança OAuth mais recentes
  - **Standards OWASP**: Validada atualidade das referências OWASP Top 10 para LLMs
  - **Serviços Azure**: Verificados todos os links e melhores práticas de documentação Microsoft Azure
- **Alinhamento com Standards**: Confirmados todos os standards de segurança referenciados como atuais
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Melhores práticas de segurança OAuth 2.1
  - Frameworks de segurança e conformidade Azure
- **Recursos de Implementação**: Validados todos os links e guias de implementação
  - Padrões de autenticação Azure API Management
  - Guias de integração Microsoft Entra ID
  - Gestão de segredos Azure Key Vault
  - Pipelines e soluções de monitorização DevSecOps

### Garantia de Qualidade da Documentação
- **Conformidade com a Especificação**: Garantido que todos os requisitos obrigatórios de segurança MCP (MUST/MUST NOT) estão alinhados com a especificação mais recente
- **Atualização de Recursos**: Verificados todos os links externos para documentação Microsoft, standards de segurança e guias de implementação
- **Cobertura de Melhores Práticas**: Confirmada cobertura abrangente de autenticação, autorização, ameaças específicas de IA, segurança da cadeia de fornecimento e padrões empresariais

## 6 de Outubro de 2025

### Expansão da Secção Começar – Uso Avançado do Servidor & Autenticação Simples

#### Uso Avançado do Servidor (03-GettingStarted/10-advanced)
- **Novo Capítulo Adicionado**: Introduzido um guia completo para uso avançado do servidor MCP, incluindo arquiteturas de servidor regulares e de baixo nível.
  - **Servidor Regular vs. Baixo Nível**: Comparação detalhada e exemplos de código em Python e TypeScript para ambas as abordagens.
  - **Design Baseado em Handlers**: Explicação da gestão baseada em handlers de ferramentas/recursos/prompt para implementações de servidores escaláveis e flexíveis.
  - **Padrões Práticos**: Cenários do mundo real onde os padrões de servidor de baixo nível são benéficos para funcionalidades avançadas e arquitetura.

#### Autenticação Simples (03-GettingStarted/11-simple-auth)
- **Novo Capítulo Adicionado**: Guia passo a passo para implementar autenticação simples em servidores MCP.
  - **Conceitos de Autenticação**: Explicação clara sobre autenticação vs. autorização e gestão de credenciais.
  - **Implementação Básica de Autenticação**: Padrões de autenticação baseados em middleware em Python (Starlette) e TypeScript (Express), com exemplos de código.
  - **Progressão para Segurança Avançada**: Orientação para começar com autenticação simples e avançar para OAuth 2.1 e RBAC, com referências a módulos avançados de segurança.

Estas adições fornecem orientações práticas e hands-on para construir implementações de servidores MCP mais robustas, seguras e flexíveis, interligando conceitos fundamentais com padrões avançados de produção.

## 29 de setembro de 2025

### MCP Server Database Integration Labs - Percurso Completo e Prático

#### 11-MCPServerHandsOnLabs - Novo Currículo Completo de Integração de Base de Dados
- **Percurso de Aprendizagem Completo com 13 Laboratórios**: Adicionado currículo prático abrangente para construir servidores MCP prontos para produção com integração de base de dados PostgreSQL
  - **Implementação do Mundo Real**: Caso de uso analítico da Zava Retail demonstrando padrões ao nível empresarial
  - **Progressão Estruturada de Aprendizagem**:
    - **Laboratórios 00-03: Fundamentos** - Introdução, Arquitetura Core, Segurança & Multi-Tenancy, Configuração do Ambiente
    - **Laboratórios 04-06: Construção do Servidor MCP** - Design de Base de Dados & Esquema, Implementação do Servidor MCP, Desenvolvimento de Ferramentas  
    - **Laboratórios 07-09: Funcionalidades Avançadas** - Integração de Pesquisa Semântica, Testes & Debugging, Integração com VS Code
    - **Laboratórios 10-12: Produção & Boas Práticas** - Estratégias de Deployment, Monitorização & Observabilidade, Boas Práticas & Otimização
  - **Tecnologias Empresariais**: Framework FastMCP, PostgreSQL com pgvector, embeddings Azure OpenAI, Azure Container Apps, Application Insights
  - **Funcionalidades Avançadas**: Segurança ao Nível de Linha (RLS), pesquisa semântica, acesso multi-inquilino, embeddings vetoriais, monitorização em tempo real

#### Padronização Terminológica - Conversão de Módulo para Laboratório
- **Atualização Abrangente da Documentação**: Atualizados sistematicamente todos os ficheiros README em 11-MCPServerHandsOnLabs para usar a terminologia "Laboratório" em vez de "Módulo"
  - **Cabeçalhos de Secção**: Atualizado "O Que Este Módulo Abrange" para "O Que Este Laboratório Abrange" em todos os 13 laboratórios
  - **Descrição do Conteúdo**: Alterado "Este módulo fornece..." para "Este laboratório fornece..." por toda a documentação
  - **Objetivos de Aprendizagem**: Atualizado "No final deste módulo..." para "No final deste laboratório..." 
  - **Links de Navegação**: Convertidas todas as referências "Módulo XX:" para "Laboratório XX:" em cruzamentos e navegação
  - **Rastreamento de Conclusão**: Atualizado "Após completar este módulo..." para "Após completar este laboratório..."
  - **Referências Técnicas Preservadas**: Mantidas referências a módulos Python em ficheiros de configuração (ex.: `"module": "mcp_server.main"`)

#### Melhoria no Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Adicionada nova secção "11. Laboratórios de Integração de Base de Dados" com visualização abrangente da estrutura dos laboratórios
- **Estrutura do Repositório**: Atualizado de dez para onze secções principais com descrição detalhada do 11-MCPServerHandsOnLabs
- **Orientações para o Percurso de Aprendizagem**: Melhoradas instruções de navegação para cobrir secções 00-11
- **Cobertura Tecnológica**: Detalhes adicionados sobre FastMCP, PostgreSQL e integração de serviços Azure
- **Resultados de Aprendizagem**: Enfatizado desenvolvimento de servidores prontos para produção, padrões de integração de base de dados e segurança empresarial

#### Aperfeiçoamento da Estrutura do README Principal
- **Terminologia baseada em Laboratórios**: Atualizado README.md principal em 11-MCPServerHandsOnLabs para usar consistentemente a estrutura "Laboratório"
- **Organização do Percurso de Aprendizagem**: Progressão clara desde conceitos básicos até implementação avançada e deployment de produção
- **Foco no Mundo Real**: Ênfase em aprendizagem prática com padrões e tecnologias ao nível empresarial

### Melhorias na Qualidade & Consistência da Documentação
- **Ênfase na Aprendizagem Prática**: Reforçado o enfoque laboratorial prático ao longo da documentação
- **Foco em Padrões Empresariais**: Destacadas implementações prontas para produção e considerações de segurança empresarial
- **Integração Tecnológica**: Cobertura abrangente dos serviços modernos Azure e padrões de integração de IA
- **Progressão de Aprendizagem**: Percurso claro e estruturado desde conceitos básicos até deployment em produção

## 26 de setembro de 2025

### Aprimoramento dos Estudos de Caso - Integração do GitHub MCP Registry

#### Estudos de Caso (09-CaseStudy/) - Foco no Desenvolvimento do Ecossistema
- **README.md**: Expansão significativa com estudo de caso abrangente do GitHub MCP Registry
  - **Estudo de Caso do GitHub MCP Registry**: Novo estudo abrangente examinando o lançamento do GitHub MCP Registry em setembro de 2025
    - **Análise do Problema**: Exame detalhado dos desafios fragmentados de descoberta e deployment de servidores MCP
    - **Arquitetura da Solução**: Abordagem do registry centralizado do GitHub com instalação One-Click para VS Code
    - **Impacto nos Negócios**: Melhorias mensuráveis na integração e produtividade dos desenvolvedores
    - **Valor Estratégico**: Foco em deployment modular de agentes e interoperabilidade entre ferramentas
    - **Desenvolvimento do Ecossistema**: Posicionamento como plataforma base para integração agentic
  - **Estrutura Aprimorada de Estudos de Caso**: Atualizados os sete estudos de caso com formatação consistente e descrições abrangentes
    - Azure AI Travel Agents: Ênfase na orquestração multi-agente
    - Integração Azure DevOps: Foco em automação de workflows
    - Recuperação em Tempo Real de Documentação: Implementação do cliente de consola Python
    - Gerador Interativo de Planos de Estudo: Aplicação web de conversação Chainlit
    - Documentação no Editor: Integração com VS Code e GitHub Copilot
    - Azure API Management: Padrões empresariais de integração de API
    - GitHub MCP Registry: Desenvolvimento do ecossistema e plataforma comunitária
  - **Conclusão Abrangente**: Seção de conclusão reescrita destacando sete estudos de caso cobrindo múltiplas dimensões de implementação MCP
    - Integração Empresarial, Orquestração Multi-Agente, Produtividade de Desenvolvedores
    - Desenvolvimento de Ecossistema, Aplicações Educacionais
    - Insights avançados em padrões arquiteturais, estratégias de implementação e boas práticas
    - Ênfase no MCP como protocolo maduro e pronto para produção

#### Atualizações no Guia de Estudo (study_guide.md)
- **Mapa Visual do Currículo**: Mapa mental atualizado para incluir GitHub MCP Registry na secção Estudos de Caso
- **Descrição dos Estudos de Caso**: Aprimorada de descrições genéricas para decomposição detalhada de sete estudos de caso abrangentes
- **Estrutura do Repositório**: Atualizada a secção 10 para refletir cobertura completa dos estudos de caso com detalhes específicos de implementação
- **Integração do Changelog**: Adicionado registo de 26 de setembro de 2025 documentando adição do GitHub MCP Registry e aprimoramentos dos estudos de caso
- **Atualizações de Data**: Atualizado o timestamp do rodapé para refletir a última revisão (26 de setembro de 2025)

### Melhorias na Qualidade da Documentação
- **Aprimoramento da Consistência**: Formatação e estrutura dos estudos de caso padronizadas nos sete exemplos
- **Cobertura Abrangente**: Estudos abrangem agora cenários empresariais, produtividade e desenvolvimento de ecossistemas
- **Posicionamento Estratégico**: Foco reforçado no MCP como plataforma base para deployment de sistemas agentic
- **Integração de Recursos**: Atualizados recursos adicionais para incluir link do GitHub MCP Registry

## 15 de setembro de 2025

### Expansão de Tópicos Avançados - Transportes Customizados & Engenharia de Contexto

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Novo Guia Avançado de Implementação
- **README.md**: Guia completo de implementação para mecanismos customizados de transporte MCP
  - **Transporte Azure Event Grid**: Implementação completa serverless e orientada a eventos
    - Exemplos em C#, TypeScript e Python com integração Azure Functions
    - Padrões de arquitetura orientada a eventos para soluções MCP escaláveis
    - Receção de webhooks e gestão por push de mensagens
  - **Transporte Azure Event Hubs**: Implementação de streaming de alta taxa
    - Capacidades de streaming em tempo real para cenários de baixa latência
    - Estratégias de partição e gestão de checkpoints
    - Agrupamento de mensagens e otimização de desempenho
  - **Padrões de Integração Empresarial**: Exemplos arquiteturais prontos para produção
    - Processamento MCP distribuído em múltiplas Azure Functions
    - Arquiteturas híbridas de transporte combinando múltiplos tipos
    - Durabilidade de mensagens, fiabilidade e estratégias de tratamento de erros
  - **Segurança & Monitorização**: Integração Azure Key Vault e padrões de observabilidade
    - Autenticação por identidade gerida e acesso com privilégio mínimo
    - Telemetria Application Insights e monitorização de desempenho
    - Disjuntores (circuit breakers) e padrões de tolerância a falhas
  - **Frameworks de Testes**: Estratégias completas para testes de transportes customizados
    - Testes unitários com test doubles e mocking
    - Testes de integração com Azure Test Containers
    - Considerações para testes de desempenho e carga

#### Engenharia de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente em IA
- **README.md**: Exploração abrangente da engenharia de contexto como campo emergente
  - **Princípios Core**: Partilha completa de contexto, consciência da decisão de ação e gestão da janela de contexto
  - **Alinhamento com o Protocolo MCP**: Como o design MCP aborda os desafios da engenharia de contexto
    - Limitações da janela de contexto e estratégias de carregamento progressivo
    - Determinação de relevância e recuperação dinâmica de contexto
    - Gestão multimodal de contexto e considerações de segurança
  - **Abordagens de Implementação**: Arquiteturas single-thread vs. multi-agente
    - Técnicas de fragmentação e priorização de contexto
    - Carregamento progressivo e estratégias de compressão
    - Abordagens em camadas e otimização de recuperação
  - **Framework de Medição**: Métricas emergentes para avaliação da eficácia do contexto
    - Eficiência de input, desempenho, qualidade e experiência do utilizador
    - Abordagens experimentais para otimização de contexto
    - Análise de falhas e metodologias de melhoria

#### Atualizações na Navegação do Currículo (README.md)
- **Estrutura de Módulos Aprimorada**: Atualizada a tabela do currículo para incluir novos tópicos avançados
  - Adicionados Context Engineering (5.14) e Custom Transport (5.15)
  - Formatação consistente e links de navegação por todos os módulos
  - Descrições atualizadas para refletir o âmbito atual do conteúdo

### Melhorias na Estrutura de Diretórios
- **Padronização de Nomenclatura**: Renomeado "mcp transport" para "mcp-transport" para consistência com outras pastas de tópicos avançados
- **Organização do Conteúdo**: Todas as pastas 05-AdvancedTopics agora seguem o padrão consistente de nomenclatura (mcp-[tópico])

### Aprimoramentos na Qualidade da Documentação
- **Alinhamento com Especificação MCP**: Todo o novo conteúdo refere a Especificação MCP 2025-06-18 atual
- **Exemplos Multilingue**: Exemplos de código abrangentes em C#, TypeScript e Python
- **Foco Empresarial**: Padrões prontos para produção e integração com Azure cloud ao longo de toda a documentação
- **Documentação Visual**: Diagramas Mermaid para visualização de arquitetura e fluxo

## 18 de agosto de 2025

### Atualização Abrangente da Documentação - Normas MCP 2025-06-18

#### Boas Práticas de Segurança MCP (02-Security/) - Modernização Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescrita completa alinhada com a Especificação MCP 2025-06-18
  - **Requisitos Obrigatórios**: Adicionados requisitos explícitos MUST/MUST NOT da especificação oficial com indicadores visuais claros
  - **12 Práticas Core de Segurança**: Reestruturação de lista de 15 itens para domínios abrangentes de segurança
    - Segurança de Token & Autenticação com integração de fornecedor de identidade externo
    - Gestão de Sessão & Segurança de Transporte com requisitos criptográficos
    - Proteção Contra Ameaças Específicas de IA com integração Microsoft Prompt Shields
    - Controlo de Acesso & Permissões com princípio do mínimo privilégio
    - Segurança de Conteúdo & Monitorização com integração Azure Content Safety
    - Segurança da Cadeia de Abastecimento com verificação comprensiva de componentes
    - Segurança OAuth & Prevenção de Confused Deputy com implementação PKCE
    - Resposta & Recuperação a Incidentes com capacidades automáticas
    - Conformidade & Governança com alinhamento regulamentar
    - Controles Avançados de Segurança com arquitetura zero trust
    - Integração do Ecossistema de Segurança Microsoft com soluções abrangentes
    - Evolução Contínua da Segurança com práticas adaptativas
  - **Soluções Microsoft de Segurança**: Orientação reforçada para integração com Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security
  - **Recursos de Implementação**: Links abrangentes classificados por Documentação MCP Oficial, Soluções Microsoft, Padrões de Segurança e Guias de Implementação

#### Controles Avançados de Segurança (02-Security/) - Implementação Empresarial
- **MCP-SECURITY-CONTROLS-2025.md**: Renovação completa com estrutura de segurança ao nível empresarial
  - **9 Domínios Completos de Segurança**: Ampliação de controles básicos para estrutura empresarial detalhada
    - Autenticação & Autorização Avançadas com integração Microsoft Entra ID
    - Segurança de Token & Controles Anti-Passthrough com validação abrangente
    - Controles de Segurança de Sessão com prevenção de sequestro
    - Controles Específicos de Segurança para IA com prevenção de injeção de prompt e envenenamento de ferramentas
    - Prevenção de Ataques Confused Deputy com segurança de proxy OAuth
    - Segurança na Execução de Ferramentas com sandboxing e isolamento
    - Controles de Segurança da Cadeia de Abastecimento com verificação de dependências
    - Controles de Monitorização & Detecção com integração SIEM
    - Resposta & Recuperação a Incidentes com capacidades automatizadas
  - **Exemplos de Implementação**: Blocos YAML detalhados e exemplos de código adicionados
  - **Integração de Soluções Microsoft**: Cobertura abrangente dos serviços de segurança Azure, GitHub Advanced Security e gestão empresarial de identidade

#### Segurança de Tópicos Avançados (05-AdvancedTopics/mcp-security/) - Implementação Pronta para Produção
- **README.md**: Reescrita completa para implementação de segurança empresarial
  - **Alinhamento com Especificação Atual**: Atualizado para Especificação MCP 2025-06-18 com requisitos obrigatórios de segurança
  - **Autenticação Aprimorada**: Integração Microsoft Entra ID com exemplos completos em .NET e Java Spring Security
  - **Integração de Segurança IA**: Implementação Microsoft Prompt Shields e Azure Content Safety com exemplos detalhados em Python
  - **Mitigação Avançada de Ameaças**: Exemplos completos de implementação para
    - Prevenção de Ataques Confused Deputy com PKCE e validação de consentimento do utilizador
    - Prevenção de Passthrough de Token com validação de audiência e gestão segura de tokens
    - Prevenção de Sequestro de Sessão com ligação criptográfica e análise comportamental
  - **Integração de Segurança Empresarial**: Monitorização Azure Application Insights, pipelines de deteção de ameaças e segurança da cadeia de fornecimento
  - **Lista de Verificação de Implementação**: Controlo claro dos controlos de segurança obrigatórios vs. recomendados com benefícios do ecossistema de segurança Microsoft

### Qualidade da Documentação & Alinhamento com Padrões
- **Referências de Especificações**: Todas as referências atualizadas para a Especificação MCP 2025-06-18 atual
- **Ecossistema de Segurança Microsoft**: Orientação de integração aprimorada em toda a documentação de segurança
- **Implementação Prática**: Exemplos de código detalhados adicionados em .NET, Java e Python com padrões empresariais
- **Organização de Recursos**: Categorização abrangente da documentação oficial, normas de segurança e guias de implementação
- **Indicadores Visuais**: Marcação clara dos requisitos obrigatórios vs. práticas recomendadas


#### Conceitos Fundamentais (01-CoreConcepts/) - Modernização Completa
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a Especificação MCP atual 2025-06-18 com versionamento baseado em data (formato AAAA-MM-DD)
- **Refinamento da Arquitetura**: Descrições aprimoradas de Hosts, Clientes e Servidores para refletir os padrões atuais da arquitetura MCP
  - Hosts agora claramente definidos como aplicações AI a coordenar múltiplas ligações de clientes MCP
  - Clientes descritos como conectores de protocolo que mantêm relações um-para-um com servidores
  - Servidores aprimorados com cenários de implementação local vs. remota
- **Reestruturação de Primitivos**: Reformulação completa dos primitivas de servidor e cliente
  - Primitivos de Servidor: Recursos (fontes de dados), Prompts (modelos), Ferramentas (funções executáveis) com explicações detalhadas e exemplos
  - Primitivos de Cliente: Amostragem (completamentos LLM), Elicitação (input do utilizador), Registo (depuração/monitorização)
  - Atualizado com padrões atuais de descoberta (`*/list`), recuperação (`*/get`), e execução (`*/call`)
- **Arquitetura do Protocolo**: Introduzido modelo de arquitetura em duas camadas
  - Camada de Dados: Base JSON-RPC 2.0 com gestão do ciclo de vida e primitivas
  - Camada de Transporte: STDIO (local) e HTTP por fluxos com SSE (remoto) como mecanismos de transporte
- **Estrutura de Segurança**: Princípios abrangentes de segurança incluindo consentimento explícito do utilizador, proteção da privacidade dos dados, segurança na execução de ferramentas e segurança da camada de transporte
- **Padrões de Comunicação**: Mensagens do protocolo atualizadas para demonstrar fluxos de inicialização, descoberta, execução e notificação
- **Exemplos de Código**: Exemplos multilíngues atualizados (.NET, Java, Python, JavaScript) para refletir padrões atuais do SDK MCP

#### Segurança (02-Security/) - Reformulação Abrangente de Segurança  
- **Alinhamento com Normas**: Alinhamento total com os requisitos de segurança da Especificação MCP 2025-06-18
- **Evolução da Autenticação**: Documentada a evolução de servidores OAuth customizados para delegação de provedores de identidade externos (Microsoft Entra ID)
- **Análise de Ameaças Específicas de IA**: Cobertura melhorada de vetores de ataque modernos em IA
  - Cenários detalhados de ataques de injeção de prompt com exemplos reais
  - Mecanismos de envenenamento de ferramentas e padrões de ataque "rug pull"
  - Envenenamento da janela de contexto e ataques de confusão de modelo
- **Soluções de Segurança Microsoft AI**: Cobertura abrangente do ecossistema de segurança Microsoft
  - Escudos de Prompt AI com detecção avançada, spotlighting e técnicas de delimitadores
  - Padrões de integração Azure Content Safety
  - Segurança Avançada do GitHub para proteção da cadeia de fornecimento
- **Mitigação Avançada de Ameaças**: Controlo de segurança detalhado para
  - Sequestro de sessão com cenários de ataque específicos MCP e requisitos criptográficos de ID de sessão
  - Problemas de "delegado confuso" em cenários de proxy MCP com requisitos explícitos de consentimento
  - Vulnerabilidades de passagem de token com controlos obrigatórios de validação
- **Segurança da Cadeia de Fornecimento**: Cobertura ampliada da cadeia de fornecimento IA incluindo modelos fundacionais, serviços de embeddings, fornecedores de contexto e APIs de terceiros
- **Segurança da Fundação**: Integração reforçada com padrões de segurança empresariais incluindo arquitetura de confiança zero e ecossistema de segurança Microsoft
- **Organização de Recursos**: Links de recursos categorizados por tipo (Documentos Oficiais, Normas, Pesquisa, Soluções Microsoft, Guias de Implementação)

### Melhorias na Qualidade da Documentação
- **Objetivos de Aprendizagem Estruturados**: Objetivos de aprendizagem aprimorados com resultados específicos e acionáveis
- **Referências Cruzadas**: Adicionados links entre tópicos relacionados de segurança e conceitos fundamentais
- **Informação Atualizada**: Atualizadas todas as referências de data e links de especificação para os padrões atuais
- **Orientação para Implementação**: Diretrizes específicas e acionáveis de implementação adicionadas em ambas as secções

## 16 de Julho de 2025

### Melhorias no README e Navegação
- Navegação do currículo redesenhada completamente em README.md
- Substituídas as tags `<details>` por formato mais acessível baseado em tabelas
- Criadas opções alternativas de layout na nova pasta "alternative_layouts"
- Adicionados exemplos de navegação estilo card, estilo abas e estilo acordeão
- Atualizada a secção de estrutura do repositório para incluir todos os ficheiros mais recentes
- Melhorada a secção "Como Usar Este Currículo" com recomendações claras
- Atualizados os links da especificação MCP para apontar para os URLs corretos
- Adicionada a secção Engenharia de Contexto (5.14) à estrutura do currículo

### Atualizações do Guia de Estudo
- Guia de estudo completamente revisto para alinhar-se com a estrutura atual do repositório
- Adicionadas novas secções para Clientes e Ferramentas MCP, e Servidores MCP Populares
- Atualizado o Mapa Visual do Currículo para refletir com precisão todos os tópicos
- Aprimoradas as descrições dos Tópicos Avançados para cobrir todas as áreas especializadas
- Atualizada a secção de Estudos de Caso para refletir exemplos reais
- Adicionado este registo abrangente de alterações

### Contribuições da Comunidade (06-CommunityContributions/)
- Adicionada informação detalhada sobre servidores MCP para geração de imagens
- Adicionada secção abrangente sobre utilização do Claude no VSCode
- Adicionadas instruções de configuração e uso do cliente terminal Cline
- Atualizada a secção de clientes MCP para incluir todas as opções populares
- Aprimorados os exemplos de contribuição com amostras de código mais precisas

### Tópicos Avançados (05-AdvancedTopics/)
- Organizadas todas as pastas de tópicos especializados com nomenclatura consistente
- Adicionados materiais e exemplos de engenharia de contexto
- Adicionada documentação de integração do agente Foundry
- Aprimorada documentação de integração de segurança Entra ID

## 11 de Junho de 2025

### Criação Inicial
- Lançada a primeira versão do currículo MCP para Iniciantes
- Criada a estrutura básica para todas as 10 secções principais
- Implementado o Mapa Visual do Currículo para navegação
- Adicionados projetos de exemplo iniciais em múltiplas linguagens de programação

### Começando (03-GettingStarted/)
- Criados primeiros exemplos de implementação de servidor
- Adicionada orientação para desenvolvimento de clientes
- Incluídas instruções de integração de clientes LLM
- Adicionada documentação de integração com VS Code
- Implementados exemplos de servidor Server-Sent Events (SSE)

### Conceitos Fundamentais (01-CoreConcepts/)
- Adicionada explicação detalhada da arquitetura cliente-servidor
- Criada documentação sobre componentes chave do protocolo
- Documentados padrões de mensagens no MCP

## 23 de Maio de 2025

### Estrutura do Repositório
- Inicializado o repositório com estrutura básica de pastas
- Criados ficheiros README para cada secção principal
- Configurada infraestrutura de tradução
- Adicionados recursos gráficos e diagramas

### Documentação
- Criado README.md inicial com visão geral do currículo
- Adicionados CODE_OF_CONDUCT.md e SECURITY.md
- Configurado SUPPORT.md com orientações para obter ajuda
- Criada estrutura preliminar para o guia de estudo

## 15 de Abril de 2025

### Planeamento e Estrutura
- Planeamento inicial para o currículo MCP para Iniciantes
- Definidos objetivos de aprendizagem e público-alvo
- Esboçada a estrutura de 10 secções do currículo
- Desenvolvido arcabouço conceptual para exemplos e estudos de caso
- Criados protótipos iniciais de exemplos para conceitos chave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->