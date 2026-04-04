# Registro de Alterações: Currículo MCP para Iniciantes

Este documento serve como um registro de todas as mudanças significativas feitas no currículo Model Context Protocol (MCP) para Iniciantes. As alterações estão documentadas em ordem cronológica inversa (alterações mais recentes primeiro).

## 5 de fevereiro de 2026

### Melhorias na Validação e Navegação em Todo o Repositório

#### Novo Conteúdo do Currículo Adicionado

**Módulo 03 - Introdução**
- **12-mcp-hosts/README.md**: Novo guia abrangente para configuração de hosts MCP
  - Exemplos de configuração para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modelos JSON de configuração para todos os principais hosts
  - Tabela comparativa dos tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Solução de problemas comuns de conexão
  - Melhores práticas de segurança para configuração de hosts

- **13-mcp-inspector/README.md**: Novo guia de depuração para MCP Inspector
  - Métodos de instalação (npx, npm global, a partir do código-fonte)
  - Conexão a servidores via stdio e HTTP/SSE
  - Ferramentas de teste, recursos e fluxos de trabalho de prompts
  - Integração do VS Code com MCP Inspector
  - Cenários comuns de depuração com soluções

**Módulo 04 - Implementação Prática**
- **pagination/README.md**: Novo guia de implementação de paginação
  - Padrões de paginação baseados em cursor em Python, TypeScript, Java
  - Manipulação de paginação no lado do cliente
  - Estratégias de design de cursor (opaco vs. estruturado)
  - Recomendações para otimização de desempenho

**Módulo 05 - Tópicos Avançados**
- **mcp-protocol-features/README.md**: Nova análise aprofundada de recursos do protocolo
  - Implementação de notificações de progresso
  - Padrões para cancelamento de requisições
  - Templates de recursos com padrões URI
  - Gerenciamento do ciclo de vida do servidor
  - Controle de nível de logging
  - Padrões de tratamento de erros com códigos JSON-RPC

#### Correções de Navegação (mais de 24 arquivos atualizados)

**READMEs do Módulo Principal**
 Agora com links para a primeira lição E para o próximo módulo

**Arquivos Suplementares de Segurança 02-Security**
- Todos os 5 documentos suplementares de segurança agora possuem a navegação "O Que Vem a Seguir":

**Arquivos 09-CaseStudy**
- Todos os arquivos do estudo de caso agora têm navegação sequencial:

**Laboratórios 10-StreamliningAI**
Adicionada seção O Que Vem a Seguir à visão geral do Módulo 10 e ao Módulo 11

#### Correções de Código e Conteúdo

**Atualizações de SDK e Dependências**
Corrigida versão vazia do openai para `^4.95.0`
Atualizado SDK de `^1.8.0` para `>=1.26.0`
Atualizadas as referências de versão do mcp para `>=1.26.0`

**Correções de Código**
Corrigido modelo inválido `gpt-4o-mini` para `gpt-4.1-mini`

**Correções de Conteúdo**
Corrigido link quebrado `READMEmd` → `README.md`, corrigido cabeçalho do currículo `Module 1-3` → `Module 0-3`, corrigido caminho case-sensitive
Removido conteúdo duplicado corrompido do Estudo de Caso 5

**Melhorias na Orientação para Iniciantes**
Adicionada introdução apropriada, objetivos de aprendizagem e pré-requisitos para iniciantes

#### Atualizações no Currículo

**README.md Principal**
- Adicionados os itens 3.12 (Hosts MCP), 3.13 (MCP Inspector), 4.1 (Paginação), 5.16 (Recursos do Protocolo) na tabela do currículo

**READMEs dos Módulos**
Adicionadas lições 12 e 13 à lista de lições
Adicionada seção Guias Práticos com link para paginação
Adicionadas lições 5.15 (Transporte Personalizado) e 5.16 (Recursos do Protocolo)

**study_guide.md**
- Atualizado mapa mental com todos os novos tópicos: Configuração dos Hosts MCP, MCP Inspector, Estratégias de Paginação, Análise Profunda dos Recursos do Protocolo

## 28 de janeiro de 2026

### Revisão de Conformidade com a Especificação MCP 2025-11-25

#### Aprimoramentos nos Conceitos Centrais (01-CoreConcepts/)
- **Novo Primitivo Cliente - Roots**: Documentação completa adicionada sobre o primitivo cliente Roots, permitindo que servidores compreendam limites de sistema de arquivos e permissões de acesso
- **Anotações de Ferramentas**: Documentação adicionada sobre anotações comportamentais de ferramentas (`readOnlyHint`, `destructiveHint`) para decisões melhores na execução de ferramentas
- **Chamada de Ferramenta na Amostragem**: Atualizada a documentação de Amostragem para incluir parâmetros `tools` e `toolChoice` para invocação baseada em modelo durante requisições de amostragem
- **Elicitação em Modo URL**: Documentação adicionada sobre elicitação via URL para interações web externas iniciadas pelo servidor
- **Tarefas (Experimental)**: Nova seção adicionada documentando o recurso experimental Tarefas para wrappers de execução duráveis e recuperação de resultados diferidos
- **Suporte a Ícones**: Notado que ferramentas, recursos, templates de recursos e prompts agora podem incluir ícones como metadados adicionais

#### Atualizações de Documentação
- **README.md**: Adicionada referência para a versão da Especificação MCP 2025-11-25 e explicação do versionamento baseado em data
- **study_guide.md**: Atualizado mapa curricular para incluir Tarefas e Anotações de Ferramentas na seção Conceitos Centrais; atualizado timestamp do documento

#### Verificação de Conformidade com Especificação
- **Versão do Protocolo**: Confirmado que toda documentação referencia a Especificação MCP 2025-11-25 atual
- **Alinhamento Arquitetural**: Confirmada precisão da documentação da arquitetura em duas camadas (Camada de Dados + Camada de Transporte)
- **Documentação de Primitivos**: Validada documentação dos primitivas do servidor (Recursos, Prompts, Ferramentas) e do cliente (Amostragem, Elicitação, Logging, Roots)
- **Mecanismos de Transporte**: Verificada a precisão da documentação de transporte STDIO e HTTP Streaming
- **Orientações de Segurança**: Confirmada conformidade com a documentação atual das Melhores Práticas de Segurança MCP

#### Principais Recursos MCP 2025-11-25 Documentados
- **Discovery OpenID Connect**: Descoberta do servidor de autenticação via OIDC
- **Documentos de Metadados OAuth Client ID**: Mecanismo recomendado para registro de clientes
- **JSON Schema 2020-12**: Dialeto padrão para definições de esquema MCP
- **Sistema de Níveis SDK**: Requisitos formalizados para suporte e manutenção de recursos do SDK
- **Estrutura de Governança**: Formalização de Grupos de Trabalho e Grupos de Interesse na governança MCP

### Grande Atualização da Documentação de Segurança (02-Security/)

#### Integração do Workshop MCP Security Summit (Sherpa)
- **Novo Recurso de Treinamento Prático**: Adicionado integração abrangente com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) em toda a documentação de segurança
- **Cobertura da Rota da Expedição**: Documentado o progresso completo de acampamento a acampamento do Acampamento Base ao Cume
- **Alinhamento OWASP**: Toda a orientação de segurança agora corresponde aos riscos do OWASP MCP Azure Security Guide

#### Integração OWASP MCP Top 10
- **Nova Seção**: Adicionada tabela de Riscos de Segurança OWASP MCP Top 10 com mitigações Azure no README principal de Segurança
- **Documentação Baseada em Riscos**: Atualizado mcp-security-controls-2025.md com referências aos riscos OWASP MCP para cada domínio de segurança
- **Arquitetura de Referência**: Link para arquitetura de referência e padrões de implementação do OWASP MCP Azure Security Guide

#### Arquivos de Segurança Atualizados
- **README.md**: Adicionada visão geral do Workshop Sherpa, tabela da rota da expedição, resumo dos riscos OWASP MCP Top 10 e seção de treinamento prático
- **mcp-security-controls-2025.md**: Atualizado cabeçalho para fevereiro de 2026, adicionadas referências aos riscos OWASP (MCP01-MCP08), corrigida inconsistência da versão da especificação
- **mcp-security-best-practices-2025.md**: Adicionada seção de recursos Sherpa e OWASP, atualizado timestamp
- **mcp-best-practices.md**: Adicionada seção de treinamento prático com links Sherpa e OWASP
- **azure-content-safety-implementation.md**: Adicionada referência OWASP MCP06, alinhamento com Sherpa Camp 3 e seção de recursos adicionais

#### Novos Links de Recursos Adicionados
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuais de riscos OWASP MCP (MCP01-MCP10)

### Alinhamento do Currículo com a Especificação MCP 2025-11-25

#### Módulo 03 - Introdução
- **Documentação do SDK**: Adicionado Go SDK à lista oficial de SDKs; atualizadas todas as referências de SDK para alinhar com a Especificação MCP 2025-11-25
- **Esclarecimento sobre Transporte**: Atualizadas descrições dos transportes STDIO e HTTP Streaming com referências explícitas à especificação

#### Módulo 04 - Implementação Prática
- **Atualizações SDK**: Adicionado Go SDK; lista de SDK atualizada com referência da versão da especificação
- **Especificação de Autorização**: Link da especificação MCP Authorization atualizado para a versão atual 2025-11-25

#### Módulo 05 - Tópicos Avançados
- **Novos Recursos**: Adicionada nota sobre recursos da nova Especificação MCP 2025-11-25 (Tarefas, Anotações de Ferramentas, Elicitação em Modo URL, Roots)
- **Recursos de Segurança**: Adicionados links OWASP MCP Top 10 e Sherpa ao material de referência adicional

#### Módulo 06 - Contribuições da Comunidade
- **Lista de SDKs**: Adicionados SDKs Swift e Rust; link da especificação atualizado para 2025-11-25
- **Referência da Especificação**: Atualizado link da Especificação MCP para URL direto da especificação

#### Módulo 07 - Lições da Adoção Precoce
- **Atualizações de Recursos**: Adicionados link da Especificação MCP 2025-11-25 e OWASP MCP Top 10 às referências adicionais

#### Módulo 08 - Melhores Práticas
- **Versão da Especificação**: Referência da Especificação MCP atualizada para 2025-11-25
- **Recursos de Segurança**: Adicionados OWASP MCP Top 10 e Sherpa às referências adicionais

#### Módulo 10 - Otimizando Fluxos de Trabalho de IA
- **Atualização do Badge**: Alterado badge da versão MCP de versão do SDK (1.9.3) para versão da especificação (2025-11-25)
- **Links de Recursos**: Atualizado link da Especificação MCP; adicionada OWASP MCP Top 10

#### Módulo 11 - Laboratórios Práticos do Servidor MCP
- **Referência da Especificação**: Link da Especificação MCP atualizado para versão 2025-11-25
- **Recursos de Segurança**: Adicionado OWASP MCP Top 10 aos recursos oficiais

## 18 de dezembro de 2025

### Atualização da Documentação de Segurança - Especificação MCP 2025-11-25

#### Melhores Práticas de Segurança MCP (02-Security/mcp-best-practices.md) - Atualização da Versão da Especificação
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a última Especificação MCP 2025-11-25 (lançada em 25 de novembro de 2025)
  - Atualizadas todas as referências de versão da especificação de 2025-06-18 para 2025-11-25
  - Atualizadas referências de data do documento de 18 de agosto de 2025 para 18 de dezembro de 2025
  - Verificadas todas as URLs da especificação apontam para a documentação atual
- **Validação de Conteúdo**: Validação abrangente das melhores práticas de segurança contra os padrões mais recentes
  - **Soluções de Segurança Microsoft**: Verificada a terminologia atual e links para Prompt Shields (anteriormente "detecção de risco de jailbreak"), Azure Content Safety, Microsoft Entra ID e Azure Key Vault
  - **Segurança OAuth 2.1**: Confirmado alinhamento com as melhores práticas mais recentes de segurança OAuth
  - **Padrões OWASP**: Validados os riscos OWASP Top 10 para LLMs continuam atuais
  - **Serviços Azure**: Verificados todos os links da documentação Microsoft Azure e melhores práticas
- **Alinhamento com Padrões**: Todos os padrões de segurança referenciados confirmados atuais
  - Framework NIST de Gerenciamento de Risco em IA
  - ISO 27001:2022
  - Melhores Práticas de Segurança OAuth 2.1
  - Frameworks de segurança e conformidade Azure
- **Recursos de Implementação**: Verificados todos os links e recursos para guias de implementação
  - Padrões de autenticação do Azure API Management
  - Guias de integração Microsoft Entra ID
  - Gerenciamento de segredos Azure Key Vault
  - Pipelines DevSecOps e soluções de monitoramento

### Garantia de Qualidade da Documentação
- **Conformidade com Especificação**: Garantido que todos os requisitos obrigatórios de segurança MCP (MUST/MUST NOT) estão alinhados com a última especificação
- **Atualização de Recursos**: Verificados todos os links externos para documentação Microsoft, padrões de segurança e guias de implementação
- **Cobertura das Melhores Práticas**: Confirmada cobertura abrangente de autenticação, autorização, ameaças específicas de IA, segurança da cadeia de suprimentos e padrões empresariais

## 6 de outubro de 2025

### Expansão da Seção Introdução – Uso Avançado de Servidor & Autenticação Simples

#### Uso Avançado de Servidor (03-GettingStarted/10-advanced)
- **Novo Capítulo Adicionado**: Introduzido guia abrangente para uso avançado de servidores MCP, cobrindo arquiteturas regulares e de baixo nível.
  - **Servidor Regular vs. Baixo Nível**: Comparação detalhada e exemplos de código em Python e TypeScript para ambas as abordagens.
  - **Design Baseado em Handlers**: Explicação da gestão baseada em handlers para ferramentas/recursos/prompts para implementações de servidor escaláveis e flexíveis.
  - **Padrões Práticos**: Cenários reais onde padrões de servidor de baixo nível são benéficos para funcionalidades avançadas e arquitetura.

#### Autenticação Simples (03-GettingStarted/11-simple-auth)
- **Novo Capítulo Adicionado**: Guia passo a passo para implementação de autenticação simples em servidores MCP.
  - **Conceitos de Autenticação**: Explicação clara de autenticação vs. autorização e manejo de credenciais.
  - **Implementação Básica de Auth**: Padrões de autenticação baseados em middleware em Python (Starlette) e TypeScript (Express), com exemplos de código.
  - **Progressão para Segurança Avançada**: Orientação para começar com autenticação simples e avançar para OAuth 2.1 e RBAC, com referências a módulos de segurança avançados.

Essas adições fornecem orientação prática e hands-on para construir implementações de servidores MCP mais robustas, seguras e flexíveis, conectando conceitos fundamentais aos padrões avançados de produção.

## 29 de setembro de 2025

### Laboratórios de Integração de Banco de Dados do Servidor MCP - Caminho Completo de Aprendizado Prático

#### 11-MCPServerHandsOnLabs - Novo Currículo Completo de Integração de Banco de Dados
- **Caminho de Aprendizado Completo com 13 Laboratórios**: Adicionado currículo prático abrangente para construção de servidores MCP prontos para produção com integração ao banco de dados PostgreSQL  
  - **Implementação no Mundo Real**: Caso de uso analítico da Zava Retail demonstrando padrões de nível empresarial  
  - **Progressão Estruturada de Aprendizado**:  
    - **Laboratórios 00-03: Fundamentos** - Introdução, Arquitetura Central, Segurança & Multi-tenant, Configuração do Ambiente  
    - **Laboratórios 04-06: Construindo o Servidor MCP** - Design e Esquema do Banco de Dados, Implementação do Servidor MCP, Desenvolvimento de Ferramentas  
    - **Laboratórios 07-09: Recursos Avançados** - Integração de Busca Semântica, Testes & Depuração, Integração com VS Code  
    - **Laboratórios 10-12: Produção & Melhores Práticas** - Estratégias de Implantação, Monitoramento & Observabilidade, Melhores Práticas & Otimização  
  - **Tecnologias Corporativas**: Framework FastMCP, PostgreSQL com pgvector, embeddings Azure OpenAI, Azure Container Apps, Application Insights  
  - **Recursos Avançados**: Segurança a Nível de Linha (RLS), busca semântica, acesso multi-tenant a dados, embeddings vetoriais, monitoramento em tempo real  

#### Padronização de Terminologia - Conversão de Módulo para Laboratório  
- **Atualização Abrangente da Documentação**: Atualizados sistematicamente todos os arquivos README em 11-MCPServerHandsOnLabs para usar a terminologia "Lab" ao invés de "Module"  
  - **Cabeçalhos de Seção**: Atualizado "What This Module Covers" para "What This Lab Covers" em todos os 13 laboratórios  
  - **Descrição de Conteúdo**: Alterado "This module provides..." para "This lab provides..." em toda a documentação  
  - **Objetivos de Aprendizagem**: Atualizado "By the end of this module..." para "By the end of this lab..."   
  - **Links de Navegação**: Convertidas todas as referências "Module XX:" para "Lab XX:" em referências cruzadas e navegação  
  - **Rastreamento de Conclusão**: Atualizado "After completing this module..." para "After completing this lab..."  
  - **Referências Técnicas Preservadas**: Mantidas referências a módulos Python nos arquivos de configuração (ex.: `"module": "mcp_server.main"`)  

#### Aprimoramento do Guia de Estudo (study_guide.md)  
- **Mapa Visual do Currículo**: Adicionada nova seção "11. Database Integration Labs" com visualização abrangente da estrutura dos laboratórios  
- **Estrutura do Repositório**: Atualizado de dez para onze seções principais com descrição detalhada do 11-MCPServerHandsOnLabs  
- **Orientação do Caminho de Aprendizagem**: Melhoradas instruções de navegação para cobrir seções 00-11  
- **Cobertura Tecnológica**: Adição de detalhes sobre FastMCP, PostgreSQL e integração de serviços Azure  
- **Resultados de Aprendizagem**: Ênfase no desenvolvimento de servidores prontos para produção, padrões de integração de banco de dados e segurança corporativa  

#### Aprimoramento da Estrutura do README Principal  
- **Terminologia Baseada em Laboratórios**: Atualizado README.md principal em 11-MCPServerHandsOnLabs para usar consistentemente a estrutura "Lab"  
- **Organização do Caminho de Aprendizagem**: Progressão clara desde conceitos fundamentais até implementação avançada e implantação em produção  
- **Foco no Mundo Real**: Ênfase em aprendizado prático com padrões e tecnologias de nível empresarial  

### Melhorias na Qualidade & Consistência da Documentação  
- **Ênfase em Aprendizado Prático**: Abordagem reforçada baseada em laboratórios em toda a documentação  
- **Foco em Padrões Corporativos**: Destacadas implementações prontas para produção e considerações de segurança corporativa  
- **Integração Tecnológica**: Cobertura abrangente dos serviços modernos do Azure e padrões de integração de IA  
- **Progressão de Aprendizado**: Caminho claro e estruturado desde conceitos básicos até implantação em produção  

## 26 de Setembro de 2025

### Aprimoramento dos Estudos de Caso - Integração com Registro MCP do GitHub  

#### Estudos de Caso (09-CaseStudy/) - Foco em Desenvolvimento do Ecossistema  
- **README.md**: Grande expansão com estudo de caso abrangente do Registro MCP do GitHub  
  - **Estudo de Caso do Registro MCP do GitHub**: Novo estudo de caso abrangente examinando o lançamento do Registro MCP do GitHub em setembro de 2025  
    - **Análise do Problema**: Exame detalhado dos desafios fragmentados na descoberta e implantação de servidores MCP  
    - **Arquitetura da Solução**: Abordagem centralizada do registro do GitHub com instalação com um clique no VS Code  
    - **Impacto no Negócio**: Melhorias mensuráveis na integração e produtividade dos desenvolvedores  
    - **Valor Estratégico**: Foco na implantação modular de agentes e interoperabilidade entre ferramentas  
    - **Desenvolvimento do Ecossistema**: Posicionamento como plataforma fundamental para integração agenteica  
  - **Estrutura Aprimorada dos Estudos de Caso**: Atualizados todos os sete estudos de caso com formatação consistente e descrições abrangentes  
    - Azure AI Travel Agents: Ênfase em orquestração multi-agente  
    - Integração Azure DevOps: Foco em automação de fluxo de trabalho  
    - Recuperação Documental em Tempo Real: Implementação de cliente Python para console  
    - Gerador Interativo de Plano de Estudos: Aplicativo web conversacional Chainlit  
    - Documentação In-Editor: Integração VS Code e GitHub Copilot  
    - Gerenciamento de API Azure: Padrões de integração de API corporativa  
    - Registro MCP do GitHub: Desenvolvimento do ecossistema e plataforma comunitária  
  - **Conclusão Abrangente**: Seção de conclusão reescrita destacando sete estudos de caso que abrangem múltiplas dimensões de implementação MCP  
    - Integração Corporativa, Orquestração Multi-Agente, Produtividade do Desenvolvedor  
    - Desenvolvimento do Ecossistema, Aplicações Educacionais categorizadas  
    - Insights aprimorados sobre padrões arquiteturais, estratégias de implementação e melhores práticas  
    - Ênfase no MCP como protocolo maduro e pronto para produção  

#### Atualizações no Guia de Estudo (study_guide.md)  
- **Mapa Visual do Currículo**: Atualizado mindmap para incluir o Registro MCP do GitHub na seção de Estudos de Caso  
- **Descrição dos Estudos de Caso**: Aprimorada de descrições genéricas para detalhamento de sete estudos de caso abrangentes  
- **Estrutura do Repositório**: Atualizada a seção 10 para refletir cobertura abrangente de estudos de caso com detalhes específicos de implementação  
- **Integração do Changelog**: Adicionada entrada de 26 de setembro de 2025 documentando adição do Registro MCP do GitHub e aprimoramentos dos estudos de caso  
- **Atualização de Datas**: Atualizado timestamp no rodapé para refletir a revisão mais recente (26 de setembro de 2025)  

### Melhorias na Qualidade da Documentação  
- **Aprimoramento da Consistência**: Padronização da formatação e estrutura dos estudos de caso em todos os sete exemplos  
- **Cobertura Abrangente**: Estudos de caso agora abrangem cenários corporativos, produtividade do desenvolvedor e desenvolvimento do ecossistema  
- **Posicionamento Estratégico**: Foco aprimorado no MCP como plataforma fundamental para implantação de sistemas agenteicos  
- **Integração de Recursos**: Atualizados recursos adicionais para incluir link do Registro MCP do GitHub  

## 15 de Setembro de 2025

### Expansão de Tópicos Avançados - Transportes Customizados & Engenharia de Contexto  

#### Transportes Customizados MCP (05-AdvancedTopics/mcp-transport/) - Novo Guia de Implementação Avançada  
- **README.md**: Guia completo para implementação de mecanismos customizados de transporte MCP  
  - **Transporte Azure Event Grid**: Implementação abrangente sem servidor baseada em eventos  
    - Exemplos em C#, TypeScript e Python com integração Azure Functions  
    - Padrões arquiteturais orientados a eventos para soluções MCP escaláveis  
    - Receptores webhook e manipulação de mensagens push  
  - **Transporte Azure Event Hubs**: Implementação de transporte streaming de alta taxa  
    - Capacidades streaming em tempo real para cenários de baixa latência  
    - Estratégias de particionamento e gerenciamento de checkpoint  
    - Agrupamento de mensagens e otimização de desempenho  
  - **Padrões de Integração Corporativa**: Exemplos arquiteturais prontos para produção  
    - Processamento MCP distribuído em múltiplas Azure Functions  
    - Arquiteturas híbridas combinando diversos tipos de transporte  
    - Durabilidade de mensagens, confiabilidade e estratégias de tratamento de erros  
  - **Segurança & Monitoramento**: Integração Azure Key Vault e padrões de observabilidade  
    - Autenticação por identidade gerenciada e acesso com menor privilégio  
    - Telemetria Application Insights e monitoramento de desempenho  
    - Disjuntores (circuit breakers) e padrões de tolerância a falhas  
  - **Frameworks de Teste**: Estratégias completas de testes para transportes customizados  
    - Testes unitários com test doubles e frameworks de mocking  
    - Testes de integração com Azure Test Containers  
    - Considerações para testes de desempenho e carga  

#### Engenharia de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente de IA  
- **README.md**: Exploração abrangente da engenharia de contexto como campo emergente  
  - **Princípios Fundamentais**: Compartilhamento completo de contexto, consciência de decisão de ação e gerenciamento da janela de contexto  
  - **Alinhamento com MCP**: Como o design do MCP aborda desafios da engenharia de contexto  
    - Limitações da janela de contexto e estratégias de carregamento progressivo  
    - Determinação de relevância e recuperação dinâmica de contexto  
    - Manipulação multimodal de contexto e considerações de segurança  
  - **Abordagens de Implementação**: Arquiteturas single-thread vs. multi-agente  
    - Técnicas de fragmentação (chunking) e priorização de contexto  
    - Carregamento progressivo e estratégias de compressão  
    - Abordagens em camadas e otimização de recuperação  
  - **Framework de Medição**: Métricas emergentes para avaliação da eficácia do contexto  
    - Eficiência de input, desempenho, qualidade e considerações de experiência do usuário  
    - Abordagens experimentais para otimização de contexto  
    - Análise de falhas e metodologias de melhoria  

#### Atualizações de Navegação do Currículo (README.md)  
- **Estrutura de Módulos Aprimorada**: Atualizada tabela do currículo para incluir novos tópicos avançados  
  - Adicionadas entradas Engenharia de Contexto (5.14) e Transporte Customizado (5.15)  
  - Formatação consistente e links de navegação para todos os módulos  
  - Descrições atualizadas para refletir escopo atual do conteúdo  

### Melhorias na Estrutura de Diretórios  
- **Padronização de Nomes**: Renomeado "mcp transport" para "mcp-transport" para consistência com outras pastas de tópicos avançados  
- **Organização de Conteúdo**: Todas as pastas 05-AdvancedTopics agora seguem padrão consistente de nomenclatura (mcp-[topic])  

### Aprimoramentos de Qualidade da Documentação  
- **Alinhamento com Especificação MCP**: Todo novo conteúdo referenciando a Especificação MCP 2025-06-18 atual  
- **Exemplos Multilíngues**: Exemplos de código abrangentes em C#, TypeScript e Python  
- **Foco Corporativo**: Padrões prontos para produção e integração completa com nuvem Azure  
- **Documentação Visual**: Diagramas Mermaid para visualização de arquitetura e fluxos  

## 18 de Agosto de 2025

### Atualização Abrangente da Documentação - Padrões MCP 2025-06-18  

#### Melhores Práticas de Segurança MCP (02-Security/) - Modernização Completa  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescrita completa alinhada com a Especificação MCP 2025-06-18  
  - **Requisitos Obrigatórios**: Adicionados requisitos explícitos DEVE/NÃO DEVE da especificação oficial com indicadores visuais claros  
  - **12 Práticas Centrais de Segurança**: Reestruturadas de lista de 15 itens para domínios abrangentes de segurança  
    - Segurança de Token & Autenticação com integração a provedores externos de identidade  
    - Gerenciamento de Sessão & Segurança de Transporte com requisitos criptográficos  
    - Proteção Contra Ameaças Específicas de IA com integração Microsoft Prompt Shields  
    - Controle de Acesso & Permissões com princípio do menor privilégio  
    - Segurança de Conteúdo & Monitoramento com integração Azure Content Safety  
    - Segurança da Cadeia de Suprimentos com verificação abrangente de componentes  
    - Segurança OAuth & Prevenção de Confused Deputy com implementação PKCE  
    - Resposta a Incidentes & Recuperação com capacidades automatizadas  
    - Conformidade & Governança com alinhamento regulatório  
    - Controles de Segurança Avançados com arquitetura zero trust  
    - Integração ao Ecossistema de Segurança Microsoft com soluções abrangentes  
    - Evolução Contínua de Segurança com práticas adaptativas  
  - **Soluções Microsoft de Segurança**: Orientações aprimoradas para integração com Prompt Shields, Azure Content Safety, Entra ID e GitHub Advanced Security  
  - **Recursos de Implementação**: Links categorizados entre Documentação Oficial MCP, Soluções Microsoft, Padrões de Segurança e Guias de Implementação  

#### Controles Avançados de Segurança (02-Security/) - Implementação Corporativa  
- **MCP-SECURITY-CONTROLS-2025.md**: Revisão completa com framework de segurança corporativo  
  - **9 Domínios Abrangentes de Segurança**: Expansão de controles básicos para framework detalhado corporativo  
    - Autenticação & Autorização Avançada com integração Microsoft Entra ID  
    - Segurança de Tokens & Controles Anti-Passthrough com validação abrangente  
    - Controles de Segurança de Sessão com prevenção de sequestro  
    - Controles de Segurança Específicos de IA com prevenção de injeção de prompt e envenenamento de ferramenta  
    - Prevenção de Ataque Confused Deputy com segurança de proxy OAuth  
    - Segurança de Execução de Ferramentas com sandboxing e isolamento  
    - Controles de Segurança da Cadeia de Suprimentos com verificação de dependências  
    - Controles de Monitoramento & Detecção com integração SIEM  
    - Resposta a Incidentes & Recuperação com capacidades automatizadas  
  - **Exemplos de Implementação**: Adicionados blocos YAML detalhados e exemplos de código  
  - **Integração de Soluções Microsoft**: Cobertura completa dos serviços de segurança Azure, GitHub Advanced Security e gerenciamento de identidade corporativa  

#### Tópicos Avançados de Segurança (05-AdvancedTopics/mcp-security/) - Implementação Pronta para Produção  
- **README.md**: Reescrita completa para implementação corporativa de segurança  
  - **Alinhamento com Especificação Atual**: Atualizado para Especificação MCP 2025-06-18 com requisitos obrigatórios de segurança  
  - **Autenticação Aprimorada**: Integração Microsoft Entra ID com exemplos completos em .NET e Java Spring Security  
  - **Integração de Segurança para IA**: Implementação Microsoft Prompt Shields e Azure Content Safety com exemplos detalhados em Python  
  - **Mitigação Avançada de Ameaças**: Exemplos completos para  
    - Prevenção de Ataque Confused Deputy com PKCE e validação de consentimento do usuário  
    - Prevenção de Passthrough de Token com validação de audiência e gerenciamento seguro de token  
    - Prevenção de Sequestro de Sessão com binding criptográfico e análise comportamental  
  - **Integração de Segurança Corporativa**: Monitoramento com Azure Application Insights, pipelines de detecção de ameaças e segurança da cadeia de suprimentos  
  - **Checklist de Implementação**: Controles obrigatórios vs. recomendados claros com benefícios do ecossistema Microsoft de segurança  

### Qualidade da Documentação & Alinhamento com Padrões  
- **Referências de Especificação**: Atualizadas todas as referências para a Especificação MCP atual 2025-06-18  
- **Ecossistema de Segurança Microsoft**: Orientação aprimorada ao longo de toda a documentação de segurança  
- **Implementação Prática**: Exemplos detalhados de código em .NET, Java e Python com padrões corporativos  
- **Organização de Recursos**: Categorização abrangente de documentação oficial, padrões de segurança e guias de implementação  
- **Indicadores Visuais**: Marcação clara de requisitos obrigatórios versus práticas recomendadas  

#### Conceitos Centrais (01-CoreConcepts/) - Modernização Completa  
- **Atualização da Versão do Protocolo**: Atualizado para referenciar a Especificação MCP atual 2025-06-18 com versionamento baseado em data (formato AAAA-MM-DD)  
- **Refino da Arquitetura**: Descrições aprimoradas de Hosts, Clientes e Servidores para refletir padrões atuais da arquitetura MCP  
  - Hosts agora claramente definidos como aplicações de IA coordenando múltiplas conexões de clientes MCP
  - Clientes descritos como conectores de protocolo mantendo relacionamentos um-para-um com servidores
  - Servidores aprimorados com cenários de implantação local vs. remota
- **Reestruturação das Primitivas**: Revisão completa das primitivas de servidor e cliente
  - Primitivas de Servidor: Recursos (fontes de dados), Prompts (modelos), Ferramentas (funções executáveis) com explicações detalhadas e exemplos
  - Primitivas de Cliente: Amostragem (completamentos LLM), Elicitação (entrada do usuário), Registro (debug/monitoramento)
  - Atualizado com padrões atuais de descoberta (`*/list`), recuperação (`*/get`) e execução (`*/call`)
- **Arquitetura de Protocolo**: Introduzido modelo de arquitetura em duas camadas
  - Camada de Dados: Base JSON-RPC 2.0 com gerenciamento de ciclo de vida e primitivas
  - Camada de Transporte: STDIO (local) e HTTP Streamable com SSE (remoto) como mecanismos de transporte
- **Framework de Segurança**: Princípios de segurança abrangentes incluindo consentimento explícito do usuário, proteção da privacidade dos dados, segurança na execução de ferramentas e segurança da camada de transporte
- **Padrões de Comunicação**: Mensagens do protocolo atualizadas para mostrar fluxos de inicialização, descoberta, execução e notificação
- **Exemplos de Código**: Exemplos multi-linguagem atualizados (.NET, Java, Python, JavaScript) para refletir os padrões atuais do MCP SDK

#### Segurança (02-Security/) - Revisão Completa de Segurança  
- **Alinhamento a Padrões**: Total alinhamento com os requisitos de segurança da Especificação MCP 2025-06-18
- **Evolução da Autenticação**: Documentada evolução de servidores OAuth personalizados para delegação a provedores externos de identidade (Microsoft Entra ID)
- **Análise de Ameaças Específicas de IA**: Cobertura ampliada dos vetores modernos de ataque em IA
  - Cenários detalhados de ataques por injeção de prompt com exemplos do mundo real
  - Mecanismos de envenenamento de ferramentas e padrões de ataque "rug pull"
  - Envenenamento da janela de contexto e ataques de confusão de modelo
- **Soluções de Segurança Microsoft AI**: Cobertura abrangente do ecossistema de segurança Microsoft
  - Escudos de Prompt AI com técnicas avançadas de detecção, destaque e delimitadores
  - Padrões de integração do Azure Content Safety
  - Segurança Avançada GitHub para proteção da cadeia de suprimentos
- **Mitigação Avançada de Ameaças**: Controles de segurança detalhados para
  - Sequestro de sessão com cenários de ataque específicos do MCP e requisitos criptográficos para ID de sessão
  - Problemas de delegado confuso em cenários proxy MCP com exigência de consentimento explícito
  - Vulnerabilidades de passagem de token com controles obrigatórios de validação
- **Segurança da Cadeia de Suprimentos**: Cobertura expandida da cadeia de suprimentos de IA incluindo modelos foundation, serviços de embeddings, provedores de contexto e APIs de terceiros
- **Segurança da Fundação**: Integração aprimorada com padrões de segurança empresarial incluindo arquitetura zero trust e ecossistema de segurança Microsoft
- **Organização de Recursos**: Links de recursos abrangentes categorizados por tipo (Documentação Oficial, Padrões, Pesquisa, Soluções Microsoft, Guias de Implementação)

### Melhorias na Qualidade da Documentação
- **Objetivos de Aprendizagem Estruturados**: Objetivos de aprendizagem aprimorados com resultados específicos e acionáveis
- **Referências Cruzadas**: Adicionados links entre tópicos relacionados de segurança e conceitos essenciais
- **Informações Atualizadas**: Atualizadas todas as referências de data e links de especificação para padrões atuais
- **Orientação de Implementação**: Adicionadas diretrizes específicas e acionáveis de implementação em ambas as seções

## 16 de julho de 2025

### Melhorias no README e Navegação
- Navegação do currículo completamente redesenhada no README.md
- Substituídas tags `<details>` por formato baseado em tabelas mais acessível
- Criadas opções alternativas de layout na nova pasta "alternative_layouts"
- Adicionados exemplos de navegação em estilo cartão, abas e acordeão
- Atualizada a seção de estrutura do repositório para incluir todos os arquivos recentes
- Aprimorada seção "Como Usar Este Currículo" com recomendações claras
- Atualizados links da especificação MCP para URLs corretos
- Adicionada seção Engenharia de Contexto (5.14) à estrutura do currículo

### Atualizações do Guia de Estudo
- Guia de estudo completamente revisado para alinhar com a estrutura atual do repositório
- Adicionadas novas seções para Clientes MCP e Ferramentas, e Servidores MCP Populares
- Atualizado o Mapa Visual do Currículo para refletir todos os tópicos com precisão
- Aprimoradas descrições dos Tópicos Avançados para cobrir todas as áreas especializadas
- Atualizada seção de Estudos de Caso para refletir exemplos reais
- Adicionado este registro abrangente de alterações

### Contribuições da Comunidade (06-CommunityContributions/)
- Adicionadas informações detalhadas sobre servidores MCP para geração de imagens
- Adicionada seção abrangente sobre uso do Claude no VSCode
- Adicionadas instruções de configuração e uso do cliente terminal Cline
- Atualizada seção de clientes MCP para incluir todas as opções populares
- Aprimorados exemplos de contribuição com amostras de código mais precisas

### Tópicos Avançados (05-AdvancedTopics/)
- Organizamos todas as pastas de tópicos especializados com nomenclatura consistente
- Adicionados materiais e exemplos de engenharia de contexto
- Documentação de integração do agente Foundry adicionada
- Documentação aprimorada de integração de segurança Entra ID adicionada

## 11 de junho de 2025

### Criação Inicial
- Lançada a primeira versão do currículo MCP para Iniciantes
- Estrutura básica criada para todas as 10 seções principais
- Implementado Mapa Visual do Currículo para navegação
- Adicionados projetos de amostra iniciais em várias linguagens de programação

### Introdução (03-GettingStarted/)
- Criados primeiros exemplos de implementação do servidor
- Adicionadas orientações para desenvolvimento de clientes
- Instruções incluídas para integração de clientes LLM
- Documentação de integração com VS Code adicionada
- Exemplos de servidor com Server-Sent Events (SSE) implementados

### Conceitos Básicos (01-CoreConcepts/)
- Explicação detalhada da arquitetura cliente-servidor adicionada
- Documentação dos componentes-chave do protocolo criada
- Padrões de mensagens no MCP documentados

## 23 de maio de 2025

### Estrutura do Repositório
- Inicializada a estrutura básica de pastas do repositório
- Criados arquivos README para cada seção principal
- Configurada infraestrutura de tradução
- Adicionados ativos de imagens e diagramas

### Documentação
- Criado README.md inicial com visão geral do currículo
- Adicionados arquivos CODE_OF_CONDUCT.md e SECURITY.md
- Configurado SUPPORT.md com orientação para obtenção de ajuda
- Estrutura preliminar do guia de estudo criada

## 15 de abril de 2025

### Planejamento e Framework
- Planejamento inicial para o currículo MCP para Iniciantes
- Definidos objetivos de aprendizagem e público-alvo
- Estruturado currículo em 10 seções
- Desenvolvido framework conceitual para exemplos e estudos de caso
- Criados protótipos iniciais de exemplos para conceitos-chave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional feita por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações errôneas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->