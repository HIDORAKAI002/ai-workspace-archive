# Changelog: Currículo MCP para Iniciantes

Este documento serve como um registo de todas as alterações significativas feitas ao currículo do Protocolo de Contexto de Modelo (MCP) para iniciantes. As alterações são documentadas por ordem cronológica inversa (as alterações mais recentes primeiro).

## 5 de fevereiro de 2026

### Melhorias na Validação e Navegação em Todo o Repositório

#### Novo Conteúdo do Currículo Adicionado

**Módulo 03 - Introdução**
- **12-mcp-hosts/README.md**: Novo guia abrangente para configuração de hosts MCP
  - Exemplos de configuração para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelos de configuração JSON para todos os hosts principais
  - Tabela comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Resolução de problemas comuns de conexão
  - Melhores práticas de segurança para configuração de hosts

- **13-mcp-inspector/README.md**: Novo guia de depuração para o MCP Inspector
  - Métodos de instalação (npx, npm global, a partir do código-fonte)
  - Ligação a servidores via stdio e HTTP/SSE
  - Ferramentas de teste, recursos e fluxos de trabalho de prompts
  - Integração com o VS Code usando o MCP Inspector
  - Cenários comuns de depuração com soluções

**Módulo 04 - Implementação Prática**
- **pagination/README.md**: Novo guia de implementação de paginação
  - Padrões de paginação baseada em cursor em Python, TypeScript, Java
  - Gestão da paginação no lado do cliente
  - Estratégias de design de cursor (opaco vs. estruturado)
  - Recomendações para otimização de desempenho

**Módulo 05 - Tópicos Avançados**
- **mcp-protocol-features/README.md**: Nova exploração aprofundada das funcionalidades do protocolo
  - Implementação de notificações de progresso
  - Padrões de cancelamento de pedidos
  - Templates de recursos com padrões URI
  - Gestão do ciclo de vida do servidor
  - Controlo dos níveis de logging
  - Padrões de tratamento de erros com códigos JSON-RPC

#### Correções de Navegação (Atualizados 24+ ficheiros)

**READMEs Principais do Módulo**
 Agora liga tanto à primeira aula COMO ao módulo seguinte

**Sub-ficheiros 02-Security**
- Todos os 5 documentos suplementares de segurança têm agora navegação "O que vem a seguir":

**Ficheiros 09-CaseStudy**
- Todos os ficheiros de estudos de caso têm agora navegação sequencial:

**Laboratórios 10-StreamliningAI**
Adicionada secção O que vem a seguir na visão geral do Módulo 10 e no Módulo 11

#### Correções de Código e Conteúdo

**Atualizações de SDK e Dependências**
Corrigida versão vazia do openai para `^4.95.0`
Atualizado SDK de `^1.8.0` para `>=1.26.0`
Atualizados os pins de versão do mcp para `>=1.26.0`

**Correções de Código**
Corrigido modelo inválido `gpt-4o-mini` para `gpt-4.1-mini`

**Correções de Conteúdo**
Corrigido link quebrado `READMEmd` → `README.md`, corrigido cabeçalho do currículo `Module 1-3` → `Module 0-3`, corrigido caminho sensível a maiúsculas/minúsculas
Removido conteúdo duplicado corrompido do Estudo de Caso 5

**Aprimoramentos para Iniciantes**
Adicionada introdução adequada, objetivos de aprendizagem e pré-requisitos para iniciantes

#### Atualizações do Currículo

**README.md Principal**
- Adicionadas entradas 3.12 (Hosts MCP), 3.13 (MCP Inspector), 4.1 (Paginação), 5.16 (Funcionalidades do Protocolo) à tabela do currículo

**READMEs dos Módulos**
Adicionadas as aulas 12 e 13 à lista de aulas
Adicionada a secção Guias Práticos com link para paginação
Adicionadas as aulas 5.15 (Transporte Personalizado) e 5.16 (Funcionalidades do Protocolo)

**study_guide.md**
- Atualizado mindmap com todos os novos tópicos: Configuração de Hosts MCP, MCP Inspector, Estratégias de Paginação, Exploração Aprofundada das Funcionalidades do Protocolo

## 28 de janeiro de 2026

### Revisão da Conformidade da Especificação MCP 2025-11-25

#### Aprimoramento de Conceitos Centrais (01-CoreConcepts/)
- **Novo Primitivo Cliente - Roots**: Adicionada documentação completa sobre o primitivo Roots do cliente, permitindo aos servidores compreender limites de sistema de ficheiros e permissões de acesso
- **Anotações de Ferramentas**: Adicionada documentação sobre anotações comportamentais de ferramentas (`readOnlyHint`, `destructiveHint`) para melhores decisões de execução de ferramentas
- **Chamada de Ferramentas na Amostragem**: Atualizada a documentação da Amostragem para incluir parâmetros `tools` e `toolChoice` para invocação dirigida por modelo durante pedidos de amostragem
- **Elicitação no Modo URL**: Adicionada documentação sobre elicitação baseada em URL para interações web externas iniciadas pelo servidor
- **Tasks (Experimental)**: Adicionada nova secção documentando a funcionalidade experimental Tasks para execuções duráveis e recuperação diferida de resultados
- **Suporte a Ícones**: Notado que ferramentas, recursos, templates de recursos e prompts podem agora incluir ícones como metadados adicionais

#### Atualizações na Documentação
- **README.md**: Adicionada referência à versão da Especificação MCP 2025-11-25 e explicação da versionização baseada na data
- **study_guide.md**: Atualizado mapa curricular para incluir Tasks e Anotações de Ferramentas na secção de Conceitos Centrais; atualizado o timestamp do documento

#### Verificação de Conformidade da Especificação
- **Versão do Protocolo**: Verificado que toda a documentação refere a atual Especificação MCP 2025-11-25
- **Alinhamento Arquitetural**: Confirmada a precisão da arquitetura em duas camadas (Camada de Dados + Camada de Transporte) na documentação
- **Documentação das Primitivas**: Validada a documentação das primitivas do servidor (Recursos, Prompts, Ferramentas) e primitivas do cliente (Amostragem, Elicitação, Logging, Roots)
- **Mecanismos de Transporte**: Verificada a precisão da documentação dos transportes STDIO e Streamable HTTP
- **Orientações de Segurança**: Confirmada a conformidade com a documentação atual das Melhores Práticas de Segurança MCP

#### Funcionalidades-Chave do MCP 2025-11-25 Documentadas
- **Descoberta OpenID Connect**: Descoberta do servidor de autenticação via OIDC
- **Documentos de Metadados do OAuth Client ID**: Mecanismo recomendado para registo de cliente
- **JSON Schema 2020-12**: Dialeto padrão para definições de esquema MCP
- **Sistema de Níveis do SDK**: Requisitos formalizados para suporte e manutenção de funcionalidades do SDK
- **Estrutura de Governação**: Formalização dos Grupos de Trabalho e Grupos de Interesse na governação MCP

### Atualização Maior da Documentação de Segurança (02-Security/)

#### Integração do MCP Security Summit Workshop (Sherpa)
- **Novo Recurso de Formação Prática**: Adicionada integração abrangente com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) em toda a documentação de segurança
- **Cobertura da Rota da Expedição**: Documentada a progressão completa dos acampamentos desde o Acampamento Base até ao Cume
- **Alinhamento OWASP**: Toda a orientação de segurança agora mapeada para os riscos do OWASP MCP Azure Security Guide

#### Integração do OWASP MCP Top 10
- **Nova Secção**: Adicionada tabela dos Riscos de Segurança OWASP MCP Top 10 com mitigações Azure no README principal de Segurança
- **Documentação Baseada em Riscos**: Atualizado mcp-security-controls-2025.md com referências aos riscos OWASP MCP para cada domínio de segurança
- **Arquitetura de Referência**: Ligação à arquitetura de referência e padrões de implementação do OWASP MCP Azure Security Guide

#### Ficheiros de Segurança Atualizados
- **README.md**: Adicionada visão geral do Sherpa Workshop, tabela da rota da expedição, resumo dos riscos OWASP MCP Top 10 e secção de formação prática
- **mcp-security-controls-2025.md**: Atualizado cabeçalho para fevereiro de 2026, adicionadas referências aos riscos OWASP (MCP01-MCP08), corrigida inconsistência na versão da especificação
- **mcp-security-best-practices-2025.md**: Secção de recursos Sherpa e OWASP adicionada, timestamp atualizado
- **mcp-best-practices.md**: Secção de formação prática com ligações Sherpa e OWASP adicionada
- **azure-content-safety-implementation.md**: Referência OWASP MCP06 adicionada, alinhamento com Sherpa Camp 3 e secção de recursos adicionais

#### Novos Links de Recursos Adicionados
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuais dos riscos OWASP MCP (MCP01-MCP10)

### Alinhamento da Especificação MCP 2025-11-25 em Todo o Currículo

#### Módulo 03 - Introdução
- **Documentação SDK**: Adicionado SDK Go à lista oficial de SDKs; atualizadas todas as referências de SDK para alinhar com a Especificação MCP 2025-11-25
- **Esclarecimento de Transporte**: Atualizadas descrições dos transportes STDIO e HTTP Streaming com referências explícitas à especificação

#### Módulo 04 - Implementação Prática
- **Atualizações SDK**: Adicionado SDK Go; lista de SDKs atualizada com referência à versão da especificação
- **Especificação de Autorização**: Atualizado o link da especificação de Autorização MCP para versão atual 2025-11-25

#### Módulo 05 - Tópicos Avançados
- **Novas Funcionalidades**: Adicionada nota sobre as novas funcionalidades da Especificação MCP 2025-11-25 (Tasks, Anotações de Ferramenta, Elicitação Modo URL, Roots)
- **Recursos de Segurança**: Adicionados links do OWASP MCP Top 10 e do workshop Sherpa às referências adicionais

#### Módulo 06 - Contribuições da Comunidade
- **Lista SDK**: Adicionados SDKs Swift e Rust; link de especificação atualizado para 2025-11-25
- **Referência da Especificação**: Atualizado o link da Especificação MCP para a URL direta da especificação

#### Módulo 07 - Lições da Adoção Inicial
- **Atualizações de Recursos**: Adicionado link da Especificação MCP 2025-11-25 e OWASP MCP Top 10 aos recursos adicionais

#### Módulo 08 - Melhores Práticas
- **Versão da Especificação**: Referência da Especificação MCP atualizada para 2025-11-25
- **Recursos de Segurança**: Adicionados OWASP MCP Top 10 e workshop Sherpa às referências adicionais

#### Módulo 10 - Otimização de Fluxos de Trabalho de IA
- **Atualização do Emblema**: Emblema da versão MCP alterado de versão SDK (1.9.3) para versão da especificação (2025-11-25)
- **Links de Recursos**: Atualizado link da Especificação MCP; adicionado OWASP MCP Top 10

#### Módulo 11 - Laboratórios Práticos MCP Server
- **Referência da Especificação**: Atualizado link da Especificação MCP para versão 2025-11-25
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 aos recursos oficiais

## 18 de dezembro de 2025

### Atualização da Documentação de Segurança - Especificação MCP 2025-11-25

#### Melhores Práticas de Segurança MCP (02-Security/mcp-best-practices.md) - Atualização da Versão da Especificação
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a mais recente Especificação MCP 2025-11-25 (lançada a 25 de novembro de 2025)
  - Atualizadas todas as referências de versão da especificação de 2025-06-18 para 2025-11-25
  - Atualizadas datas de documentos de 18 de agosto de 2025 para 18 de dezembro de 2025
  - Verificados todos os URLs da especificação apontam para a documentação atual
- **Validação de Conteúdo**: Validação abrangente das melhores práticas de segurança face aos padrões mais recentes
  - **Soluções de Segurança Microsoft**: Verificada a atual terminologia e links para Prompt Shields (anteriormente "detecção de risco de jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Segurança OAuth 2.1**: Confirmada conformidade com as melhores práticas de segurança OAuth mais recentes
  - **Normas OWASP**: Validadas referências ao OWASP Top 10 para LLMs
  - **Serviços Azure**: Verificados todos os links e melhores práticas da documentação Microsoft Azure
- **Alinhamento de Normas**: Confirmado que todas as normas de segurança referidas estão atualizadas
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Melhores Práticas de Segurança OAuth 2.1
  - Frameworks de segurança e conformidade Azure
- **Recursos de Implementação**: Validado todos os links de guias de implementação e recursos
  - Padrões de autenticação de Azure API Management
  - Guias de integração Microsoft Entra ID
  - Gestão de segredos Azure Key Vault
  - Pipelines DevSecOps e soluções de monitorização

### Garantia de Qualidade da Documentação
- **Conformidade com a Especificação**: Assegurada a conformidade de todos os requisitos obrigatórios de segurança MCP (DEVE/DEVE NÃO) com a especificação mais recente
- **Atualização dos Recursos**: Verificados todos os links externos para documentação Microsoft, normas de segurança e guias de implementação
- **Cobertura de Melhores Práticas**: Confirmada cobertura completa de autenticação, autorização, ameaças específicas de IA, segurança da cadeia de fornecimento e padrões empresariais

## 6 de outubro de 2025

### Expansão da Secção Introdução – Uso Avançado do Servidor & Autenticação Simples

#### Uso Avançado do Servidor (03-GettingStarted/10-advanced)
- **Novo Capítulo Adicionado**: Introduzido guia abrangente para o uso avançado do servidor MCP, cobrindo arquiteturas de servidor regulares e de baixo nível.
  - **Servidor Regular vs. Baixo Nível**: Comparação detalhada e exemplos de código em Python e TypeScript para ambas as abordagens.
  - **Design Baseado em Handlers**: Explicação da gestão de ferramentas/recursos/prompts baseada em handlers para implementações de servidor escaláveis e flexíveis.
  - **Padrões Práticos**: Cenários reais onde os padrões de servidor de baixo nível são benéficos para funcionalidades avançadas e arquitetura.

#### Autenticação Simples (03-GettingStarted/11-simple-auth)
- **Novo Capítulo Adicionado**: Guia passo a passo para implementar autenticação simples em servidores MCP.
  - **Conceitos de Autenticação**: Explicação clara da diferença entre autenticação e autorização, e gestão de credenciais.
  - **Implementação Básica de Auth**: Padrões de autenticação baseados em middleware em Python (Starlette) e TypeScript (Express), com exemplos de código.
  - **Progressão para Segurança Avançada**: Orientação para começar com autenticação simples e avançar para OAuth 2.1 e RBAC, com referências a módulos avançados de segurança.

Estas adições fornecem orientações práticas e práticas para construir implementações de servidores MCP mais robustas, seguras e flexíveis, fazendo a ponte entre conceitos fundamentais e padrões avançados de produção.

## 29 de setembro de 2025

### Laboratórios de Integração de Base de Dados MCP Server - Caminho de Aprendizagem Prático Completo

#### 11-MCPServerHandsOnLabs - Novo currículo completo de integração de base de dados
- **Caminho de Aprendizagem Completo de 13 Laboratórios**: Adicionado currículo prático abrangente para construção de servidores MCP prontos para produção com integração de base de dados PostgreSQL  
  - **Implementação no Mundo Real**: Caso de uso de análise de retalho Zava demonstrando padrões de nível empresarial  
  - **Progressão de Aprendizagem Estruturada**:  
    - **Laboratórios 00-03: Fundamentos** - Introdução, Arquitetura Principal, Segurança & Multi-Inquilino, Configuração do Ambiente  
    - **Laboratórios 04-06: Construção do Servidor MCP** - Design & Esquema da Base de Dados, Implementação do Servidor MCP, Desenvolvimento de Ferramentas  
    - **Laboratórios 07-09: Funcionalidades Avançadas** - Integração de Pesquisa Semântica, Testes & Debugging, Integração com VS Code  
    - **Laboratórios 10-12: Produção & Boas Práticas** - Estratégias de Deploy, Monitorização & Observabilidade, Boas Práticas & Otimização  
  - **Tecnologias Empresariais**: Framework FastMCP, PostgreSQL com pgvector, embeddings Azure OpenAI, Azure Container Apps, Application Insights  
  - **Funcionalidades Avançadas**: Segurança ao Nível da Linha (RLS), pesquisa semântica, acesso a dados multi-inquilino, embeddings vetoriais, monitorização em tempo real  

#### Padronização da Terminologia - Conversão de Módulo para Laboratório  
- **Atualização Abrangente da Documentação**: Atualizados sistematicamente todos os ficheiros README em 11-MCPServerHandsOnLabs para utilizar a terminologia "Laboratório" em vez de "Módulo"  
  - **Cabeçalhos de Secção**: Atualizado "O que este Módulo Cobre" para "O que este Laboratório Cobre" em todos os 13 laboratórios  
  - **Descrição do Conteúdo**: Alterado "Este módulo fornece..." para "Este laboratório fornece..." em toda a documentação  
  - **Objetivos de Aprendizagem**: Atualizado "No final deste módulo..." para "No final deste laboratório..."  
  - **Ligações de Navegação**: Convertidas todas as referências "Módulo XX:" para "Laboratório XX:" em referências cruzadas e navegação  
  - **Rastreamento de Conclusão**: Atualizado "Após completar este módulo..." para "Após completar este laboratório..."  
  - **Referências Técnicas Preservadas**: Mantidos os módulos Python em ficheiros de configuração (ex.: `"module": "mcp_server.main"`)  

#### Melhoria do Guia de Estudo (study_guide.md)  
- **Mapa Visual do Currículo**: Adicionada nova secção "11. Laboratórios de Integração de Base de Dados" com visualização abrangente da estrutura dos laboratórios  
- **Estrutura do Repositório**: Atualizado de dez para onze secções principais com descrição detalhada de 11-MCPServerHandsOnLabs  
- **Orientação no Caminho de Aprendizagem**: Melhoradas instruções de navegação para cobrir as secções 00-11  
- **Cobertura Tecnológica**: Adicionados detalhes sobre FastMCP, PostgreSQL, integração de serviços Azure  
- **Resultados de Aprendizagem**: Enfatizado desenvolvimento de servidores prontos para produção, padrões de integração de base de dados e segurança empresarial  

#### Melhoria da Estrutura do README Principal  
- **Terminologia Baseada em Laboratórios**: Atualizado o README.md principal em 11-MCPServerHandsOnLabs para utilizar consistentemente a estrutura "Laboratório"  
- **Organização do Caminho de Aprendizagem**: Progressão clara desde conceitos fundamentais, passando por implementação avançada até deploy em produção  
- **Foco no Mundo Real**: Ênfase na aprendizagem prática, laboratorial, com padrões e tecnologias de nível empresarial  

### Melhorias na Qualidade e Consistência da Documentação  
- **Ênfase na Aprendizagem Prática**: Reforçado abordagem prática, baseada em laboratórios em toda a documentação  
- **Foco em Padrões Empresariais**: Destacadas implementações prontas para produção e considerações de segurança empresarial  
- **Integração Tecnológica**: Cobertura abrangente dos serviços modernos Azure e padrões de integração de IA  
- **Progressão de Aprendizagem**: Caminho claro e estruturado desde conceitos básicos até deploy em produção  

## 26 de Setembro de 2025

### Melhoria dos Estudos de Caso - Integração do Registo MCP do GitHub  

#### Estudos de Caso (09-CaseStudy/) - Foco no Desenvolvimento do Ecossistema  
- **README.md**: Expansão significativa com estudo de caso abrangente do Registo MCP do GitHub  
  - **Estudo de Caso do Registo MCP do GitHub**: Novo estudo detalhado sobre o lançamento do Registo MCP do GitHub em setembro de 2025  
    - **Análise do Problema**: Exame pormenorizado dos desafios fragmentados de descoberta e deploy de servidores MCP  
    - **Arquitetura da Solução**: Abordagem de registo centralizado do GitHub com instalação com um clique no VS Code  
    - **Impacto Empresarial**: Melhorias mensuráveis na integração e produtividade dos desenvolvedores  
    - **Valor Estratégico**: Foco em deploy modular de agentes e interoperabilidade entre ferramentas  
    - **Desenvolvimento do Ecossistema**: Posicionamento como plataforma fundamental para integração agentica  
  - **Estrutura Aprimorada dos Estudos de Caso**: Atualizados todos os sete estudos de caso com formatação consistente e descrições detalhadas  
    - Agentes de Viagens AI Azure: Ênfase em orquestração multi-agente  
    - Integração Azure DevOps: Foco em automação de workflows  
    - Recuperação de Documentação em Tempo Real: Implementação cliente de consola Python  
    - Gerador de Plano de Estudo Interativo: Aplicação web conversacional Chainlit  
    - Documentação In-Editor: Integração VS Code e GitHub Copilot  
    - Gestão de APIs Azure: Padrões de integração de API empresarial  
    - Registo MCP GitHub: Desenvolvimento de ecossistema e plataforma comunitária  
  - **Conclusão Abrangente**: Secção de conclusão reescrita destacando os sete estudos de caso que abrangem múltiplas dimensões de implementação MCP  
    - Integração Empresarial, Orquestração Multi-Agente, Produtividade do Desenvolvedor  
    - Desenvolvimento de Ecossistema, Aplicações Educativas categorizadas  
    - Insights aprofundados em padrões arquiteturais, estratégias de implementação e melhores práticas  
    - Ênfase no MCP como protocolo maduro e pronto para produção  

#### Atualizações no Guia de Estudo (study_guide.md)  
- **Mapa Visual do Currículo**: Atualizado mindmap para incluir Registo MCP do GitHub na secção de Estudos de Caso  
- **Descrição dos Estudos de Caso**: Melhorada de descrições genéricas para detalhamento de sete estudos completos  
- **Estrutura do Repositório**: Atualizada secção 10 para refletir cobertura abrangente dos estudos de caso com detalhes de implementação específicos  
- **Integração do Changelog**: Adicionada entrada a 26 de setembro de 2025 documentando a inclusão do Registo MCP do GitHub e melhorias nos estudos de caso  
- **Atualizações de Datas**: Atualizado o carimbo temporal do rodapé para refletir a revisão mais recente (26 de setembro de 2025)  

### Melhorias na Qualidade da Documentação  
- **Melhoria da Consistência**: Formatação e estrutura padronizadas dos estudos de caso em todos os sete exemplos  
- **Cobertura Abrangente**: Estudos de caso agora abrangem cenários empresariais, produtividade de desenvolvedores e desenvolvimento de ecossistema  
- **Posicionamento Estratégico**: Maior foco no MCP como plataforma fundamental para deploy de sistemas agenticos  
- **Integração de Recursos**: Atualizados recursos adicionais para incluir link para Registo MCP do GitHub  

## 15 de Setembro de 2025

### Expansão de Temas Avançados - Transportes Customizados & Engenharia de Contexto  

#### Transportes Customizados MCP (05-AdvancedTopics/mcp-transport/) - Novo Guia de Implementação Avançada  
- **README.md**: Guia completo de implementação para mecanismos customizados de transporte MCP  
  - **Transporte Azure Event Grid**: Implementação abrangente de transporte sem servidor orientado a eventos  
    - Exemplos em C#, TypeScript e Python com integração Azure Functions  
    - Padrões de arquitetura orientada a eventos para soluções MCP escaláveis  
    - Receptores webhook e manipulação de mensagens push  
  - **Transporte Azure Event Hubs**: Implementação de transporte de streaming de alta capacidade  
    - Capacidades de streaming em tempo real para cenários de baixa latência  
    - Estratégias de partição e gestão de checkpoints  
    - Agrupamento de mensagens e otimização de performance  
  - **Padrões de Integração Empresarial**: Exemplos arquiteturais prontos para produção  
    - Processamento distribuído MCP em múltiplas Azure Functions  
    - Arquiteturas híbridas combinando múltiplos tipos de transporte  
    - Estratégias de durabilidade, fiabilidade e gestão de erros de mensagens  
  - **Segurança & Monitorização**: Integração com Azure Key Vault e padrões de observabilidade  
    - Autenticação com identidade gerida e acesso de menor privilégio  
    - Telemetria Application Insights e monitorização de desempenho  
    - Circuit breakers e padrões de tolerância a falhas  
  - **Frameworks de Testes**: Estratégias abrangentes de testes para transportes customizados  
    - Testes unitários com test doubles e mocking  
    - Testes de integração com Azure Test Containers  
    - Considerações para testes de performance e carga  

#### Engenharia de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente de IA  
- **README.md**: Exploração abrangente da engenharia de contexto como campo emergente  
  - **Princípios Fundamentais**: Partilha total do contexto, consciência na tomada de decisão de ações, gestão da janela de contexto  
  - **Alinhamento com o Protocolo MCP**: Como o design MCP aborda os desafios da engenharia de contexto  
    - Limitações da janela de contexto e estratégias de carregamento progressivo  
    - Determinação de relevância e recuperação dinâmica de contexto  
    - Gestão multimodal de contexto e considerações de segurança  
  - **Abordagens de Implementação**: Arquiteturas single-threaded vs. multi-agente  
    - Técnicas de fragmentação e priorização de contexto  
    - Carregamento progressivo e estratégias de compressão de contexto  
    - Abordagens em camadas e otimização de recuperação  
  - **Framework de Medição**: Métricas emergentes para avaliação da eficácia do contexto  
    - Eficiência de input, performance, qualidade e experiência do utilizador  
    - Abordagens experimentais para otimização de contexto  
    - Análise de falhas e metodologias de melhoria  

#### Atualizações de Navegação do Currículo (README.md)  
- **Estrutura de Módulos Aprimorada**: Atualizada tabela do currículo para incluir novos temas avançados  
  - Adicionados Context Engineering (5.14) e Custom Transport (5.15)  
  - Formatação consistente e ligações de navegação em todos os módulos  
  - Descrições atualizadas para refletir o escopo atual do conteúdo  

### Melhorias na Estrutura de Diretórios  
- **Padronização de Nomes**: Renomeado "mcp transport" para "mcp-transport" para consistência com outras pastas de temas avançados  
- **Organização do Conteúdo**: Todas as pastas 05-AdvancedTopics agora seguem padrão consistente (mcp-[tema])  

### Melhorias na Qualidade da Documentação  
- **Alinhamento com a Especificação MCP**: Todo conteúdo novo referencia especificação MCP atualizada de 2025-06-18  
- **Exemplos Multilíngues**: Exemplos de código abrangentes em C#, TypeScript e Python  
- **Foco Empresarial**: Padrões prontos para produção e integração na cloud Azure em todo o conteúdo  
- **Documentação Visual**: Diagramas Mermaid para visualização arquitetural e de fluxos  

## 18 de Agosto de 2025

### Atualização Abrangente da Documentação - Normas MCP 2025-06-18  

#### Melhores Práticas de Segurança MCP (02-Security/) - Modernização Completa  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescrita completa alinhada com a Especificação MCP 2025-06-18  
  - **Requisitos Obrigatórios**: Adicionados requisitos expressos MUST/MUST NOT da especificação oficial com indicadores visuais claros  
  - **12 Práticas Core de Segurança**: Reestruturadas de lista de 15 itens para domínios abrangentes de segurança  
    - Segurança de Token & Autenticação com integração de fornecedor externo de identidade  
    - Gestão de Sessão & Segurança de Transporte com requisitos criptográficos  
    - Proteção Específica para IA com integração Microsoft Prompt Shields  
    - Controlo de Acesso & Permissões com princípio do menor privilégio  
    - Segurança & Monitorização de Conteúdo com integração Azure Content Safety  
    - Segurança na Cadeia de Abastecimento com verificação abrangente de componentes  
    - Segurança OAuth & Prevenção de Deputado Confuso com implementação PKCE  
    - Resposta a Incidentes & Recuperação com capacidades automatizadas  
    - Conformidade & Governança com alinhamento regulatório  
    - Controles Avançados de Segurança com arquitetura de confiança zero  
    - Integração com o Ecossistema de Segurança Microsoft com soluções abrangentes  
    - Evolução Contínua da Segurança com práticas adaptativas  
  - **Soluções de Segurança Microsoft**: Guia de integração reforçado para Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security  
  - **Recursos de Implementação**: Links categorizados e abrangentes por Documentação Oficial MCP, Soluções Microsoft, Normas de Segurança e Guias de Implementação  

#### Controles Avançados de Segurança (02-Security/) - Implementação Empresarial  
- **MCP-SECURITY-CONTROLS-2025.md**: Revisão completa com framework de segurança empresarial de elevado nível  
  - **9 Domínios Abrangentes de Segurança**: Expandidos de controlos básicos para framework empresarial detalhado  
    - Autenticação & Autorização Avançadas com integração Microsoft Entra ID  
    - Segurança de Token & Controlos Anti-Passthrough com validação abrangente  
    - Controles de Segurança de Sessão com prevenção de hijacking  
    - Controles Específicos de Segurança para IA com prevenção de injeção de prompt e envenenamento de ferramentas  
    - Prevenção de Ataques Deputado Confuso com segurança proxy OAuth  
    - Segurança na Execução de Ferramentas com sandboxing e isolamento  
    - Controlos de Segurança na Cadeia de Abastecimento com verificação de dependências  
    - Monitorização & Controles de Detecção com integração SIEM  
    - Resposta a Incidentes & Recuperação com capacidades automatizadas  
  - **Exemplos de Implementação**: Adicionados blocos de configuração YAML detalhados e exemplos de código  
  - **Integração com Soluções Microsoft**: Cobertura abrangente dos serviços de segurança Azure, GitHub Advanced Security e gestão de identidade empresarial  

#### Segurança em Temas Avançados (05-AdvancedTopics/mcp-security/) - Implementação Pronta para Produção  
- **README.md**: Reescrita completa para implementação de segurança empresarial  
  - **Alinhamento com Especificação Atual**: Atualizado para Especificação MCP 2025-06-18 com requisitos obrigatórios de segurança  
  - **Autenticação Aprimorada**: Integração Microsoft Entra ID com exemplos completos em .NET e Java Spring Security  
  - **Integração de Segurança IA**: Implementação Microsoft Prompt Shields e Azure Content Safety com exemplos pormenorizados em Python  
  - **Mitigação Avançada de Ameaças**: Exemplos abrangentes para  
    - Prevenção de Ataques Deputado Confuso com PKCE e validação de consentimento do utilizador  
    - Prevenção de Passthrough de Token com validação de audience e gestão segura de tokens  
    - Prevenção de Hijacking de Sessão com ligação criptográfica e análise comportamental  
  - **Integração de Segurança Empresarial**: Monitorização Azure Application Insights, pipelines de deteção de ameaças e segurança da cadeia de abastecimento  
  - **Checklist de Implementação**: Controles de segurança obrigatórios vs. recomendados claramente identificados com benefícios do ecossistema de segurança Microsoft  

### Qualidade da Documentação & Alinhamento com Normas  
- **Referências à Especificação**: Atualizadas todas referências para Especificação MCP atual de 2025-06-18  
- **Ecossistema de Segurança Microsoft**: Guia de integração aprimorado em toda a documentação de segurança  
- **Implementação Prática**: Adicionados exemplos detalhados em .NET, Java e Python com padrões empresariais  
- **Organização de Recursos**: Categorização abrangente da documentação oficial, normas de segurança e guias de implementação  
- **Indicadores Visuais**: Marcação clara de requisitos obrigatórios vs. práticas recomendadas  

#### Conceitos Core (01-CoreConcepts/) - Modernização Completa  
- **Atualização da Versão do Protocolo**: Atualizado para referência na Especificação MCP 2025-06-18 com versão baseada em data (formato AAAA-MM-DD)  
- **Aperfeiçoamento da Arquitetura**: Descrições melhoradas de Hosts, Clientes e Servidores para refletir padrões atuais da arquitetura MCP
  - Hosts agora claramente definidos como aplicações de IA que coordenam múltiplas ligações de clientes MCP
  - Clientes descritos como conectores de protocolo que mantêm relações um-para-um com servidores
  - Servidores aprimorados com cenários de implementação local vs. remota
- **Reestruturação Primitiva**: Revisão completa dos primitivos de servidor e cliente
  - Primitivos do Servidor: Recursos (fontes de dados), Prompts (modelos), Ferramentas (funções executáveis) com explicações e exemplos detalhados
  - Primitivos do Cliente: Amostragem (completamentos LLM), Elicitação (entrada do utilizador), Registo (debugging/monitorização)
  - Atualizados com padrões atuais de métodos de descoberta (`*/list`), obtenção (`*/get`) e execução (`*/call`)
- **Arquitetura do Protocolo**: Introdução de modelo de arquitetura em duas camadas
  - Camada de Dados: Base JSON-RPC 2.0 com gestão de ciclo de vida e primitivos
  - Camada de Transporte: Mecanismos de transporte STDIO (local) e HTTP Streamable com SSE (remoto)
- **Estrutura de Segurança**: Princípios de segurança abrangentes incluindo consentimento explícito do utilizador, proteção da privacidade dos dados, segurança na execução de ferramentas e segurança da camada de transporte
- **Padrões de Comunicação**: Mensagens do protocolo atualizadas para mostrar fluxos de inicialização, descoberta, execução e notificação
- **Exemplos de Código**: Exemplos multi-idiomas atualizados (.NET, Java, Python, JavaScript) para refletir os padrões atuais do SDK MCP

#### Segurança (02-Security/) - Revisão Abrangente de Segurança  
- **Alinhamento de Normas**: Total alinhamento com os requisitos de segurança da Especificação MCP 2025-06-18
- **Evolução da Autenticação**: Documentada evolução de servidores OAuth personalizados para delegação de fornecedores de identidade externos (Microsoft Entra ID)
- **Análise de Ameaças Específicas de IA**: Cobertura aprimorada de vetores modernos de ataque em IA
  - Cenários detalhados de ataques de injeção de prompt com exemplos reais
  - Mecanismos de envenenamento de ferramentas e padrões de ataque "rug pull"
  - Envenenamento de janela de contexto e ataques de confusão de modelo
- **Soluções de Segurança Microsoft AI**: Cobertura abrangente do ecossistema de segurança Microsoft
  - Escudos de Prompt IA com deteção avançada, destaque e técnicas de delimitador
  - Padrões de integração com Azure Content Safety
  - Segurança Avançada do GitHub para proteção da cadeia de fornecimento
- **Mitigação Avançada de Ameaças**: Controlo detalhado de segurança para
  - Sequestro de sessão com cenários de ataque MCP específicos e requisitos criptográficos para ID de sessão
  - Problemas de deputado confuso em cenários de proxy MCP com requisitos de consentimento explícito
  - Vulnerabilidades de passagem de token com controlos obrigatórios de validação
- **Segurança da Cadeia de Fornecimento**: Cobertura ampliada da cadeia de fornecimento de IA incluindo modelos fundacionais, serviços de embeddings, fornecedores de contexto e APIs de terceiros
- **Segurança Fundacional**: Integração melhorada com padrões de segurança empresarial incluindo arquitetura zero trust e ecossistema de segurança Microsoft
- **Organização de Recursos**: Links de recursos abrangentes categorizados por tipo (Documentação Oficial, Normas, Investigação, Soluções Microsoft, Guias de Implementação)

### Melhorias na Qualidade da Documentação
- **Objetivos de Aprendizagem Estruturados**: Objetivos de aprendizagem aprimorados com resultados específicos e acionáveis
- **Referências Cruzadas**: Adicionados links entre tópicos relacionados de segurança e conceitos centrais
- **Informação Atualizada**: Atualizadas todas referências de datas e links de especificação para normas atuais
- **Orientação para Implementação**: Adicionadas diretrizes específicas e acionáveis de implementação em ambas as secções

## 16 de julho de 2025

### Melhorias no README e na Navegação
- Navegação do currículo completamente redesenhada no README.md
- Substituídas as tags `<details>` por formato mais acessível baseado em tabelas
- Criadas opções de layout alternativos na nova pasta "alternative_layouts"
- Adicionados exemplos de navegação em formato de cartões, separadores e acordeão
- Atualizada a secção de estrutura do repositório para incluir todos os ficheiros mais recentes
- Melhorada a secção "Como Usar Este Currículo" com recomendações claras
- Atualizados os links da especificação MCP para apontar para URLs corretos
- Adicionada a secção de Engenharia de Contexto (5.14) à estrutura curricular

### Atualizações do Guia de Estudo
- Guia de estudo completamente revisto para alinhar com a estrutura atual do repositório
- Adicionadas novas secções para Clientes MCP e Ferramentas, e Servidores MCP Populares
- Atualizado o Mapa Visual do Currículo para refletir com precisão todos os tópicos
- Melhoradas as descrições dos Tópicos Avançados para cobrir todas as áreas especializadas
- Atualizada a secção de Estudos de Caso para refletir exemplos reais
- Adicionado este changelog completo

### Contribuições da Comunidade (06-CommunityContributions/)
- Adicionadas informações detalhadas sobre servidores MCP para geração de imagens
- Secção abrangente adicionada sobre utilização do Claude no VSCode
- Instruções de configuração e uso do cliente terminal Cline adicionadas
- Secção de clientes MCP atualizada para incluir todas as opções populares
- Exemplos de contribuições melhorados com amostras de código mais precisas

### Tópicos Avançados (05-AdvancedTopics/)
- Todas as pastas de tópicos especializados organizadas com nomenclatura consistente
- Adicionados materiais e exemplos de engenharia de contexto
- Documentação de integração do agente Foundry adicionada
- Documentação melhorada da integração de segurança Entra ID adicionada

## 11 de junho de 2025

### Criação Inicial
- Lançada a primeira versão do currículo MCP para Principiantes
- Criada estrutura básica para as 10 secções principais
- Implementado Mapa Visual do Currículo para navegação
- Adicionados projetos de exemplo iniciais em múltiplas linguagens de programação

### Começar (03-GettingStarted/)
- Criados primeiros exemplos de implementação de servidor
- Adicionadas orientações para desenvolvimento de clientes
- Incluídas instruções para integração de cliente LLM
- Adicionada documentação de integração com VS Code
- Implementados exemplos de servidor com Server-Sent Events (SSE)

### Conceitos Centrais (01-CoreConcepts/)
- Adicionada explicação detalhada da arquitetura cliente-servidor
- Criada documentação sobre componentes-chave do protocolo
- Documentados padrões de mensagens no MCP

## 23 de maio de 2025

### Estrutura do Repositório
- Inicializado o repositório com estrutura básica de pastas
- Criados ficheiros README para cada secção principal
- Configurada infraestrutura de tradução
- Adicionados recursos gráficos e diagramas

### Documentação
- Criado README.md inicial com visão geral do currículo
- Adicionados CODE_OF_CONDUCT.md e SECURITY.md
- Configurado SUPPORT.md com orientações para obter ajuda
- Criada estrutura preliminar do guia de estudo

## 15 de abril de 2025

### Planeamento e Estrutura
- Planeamento inicial do currículo MCP para Principiantes
- Definidos objetivos de aprendizagem e público-alvo
- Estruturado currículo em 10 secções
- Desenvolvido quadro conceptual para exemplos e estudos de caso
- Criados protótipos iniciais de exemplos para conceitos-chave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos por garantir a precisão, por favor, tenha em atenção que traduções automáticas podem conter erros ou imprecisões. O documento original no seu idioma nativo deve ser considerado a fonte oficial. Para informações críticas, recomenda-se a tradução profissional feita por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações erradas decorrentes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->