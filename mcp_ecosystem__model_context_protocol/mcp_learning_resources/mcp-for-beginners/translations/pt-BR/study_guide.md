# Protocolo de Contexto de Modelo (MCP) para Iniciantes - Guia de Estudo

Este guia de estudo fornece uma visão geral da estrutura e do conteúdo do repositório para o currículo "Protocolo de Contexto de Modelo (MCP) para Iniciantes". Use este guia para navegar eficientemente pelo repositório e aproveitar ao máximo os recursos disponíveis.

## Visão Geral do Repositório

O Protocolo de Contexto de Modelo (MCP) é uma estrutura padronizada para interações entre modelos de IA e aplicações cliente. Inicialmente criado pela Anthropic, o MCP agora é mantido pela comunidade mais ampla do MCP por meio da organização oficial no GitHub. Este repositório oferece um currículo abrangente com exemplos práticos de código em C#, Java, JavaScript, Python e TypeScript, projetado para desenvolvedores de IA, arquitetos de sistemas e engenheiros de software.

## Mapa Visual do Currículo

```mermaid
mindmap
  root((MCP para Iniciantes))
    00. Introdução
      ::icon(fa fa-book)
      (Visão Geral do Protocolo)
      (Benefícios da Padronização)
      (Casos de Uso no Mundo Real)
      (Fundamentos da Integração com IA)
    01. Conceitos Principais
      ::icon(fa fa-puzzle-piece)
      (Arquitetura Cliente-Servidor)
      (Componentes do Protocolo)
      (Padrões de Mensagens)
      (Mecanismos de Transporte)
      (Tarefas - Experimental)
      (Anotações de Ferramentas)
    02. Segurança
      ::icon(fa fa-shield)
      (Ameaças Específicas de IA)
      (Melhores Práticas 2025)
      (Segurança de Conteúdo Azure)
      (Autenticação & Autorização)
      (Escudos de Prompt Microsoft)
      (OWASP MCP Top 10)
      (Workshop de Segurança Sherpa)
    03. Primeiros Passos
      ::icon(fa fa-rocket)
      (Primeira Implementação do Servidor)
      (Desenvolvimento de Cliente)
      (Integração de Cliente LLM)
      (Extensões VS Code)
      (Configuração do Servidor SSE)
      (Streaming HTTP)
      (Integração com Kit de Ferramentas IA)
      (Frameworks de Teste)
      (Uso Avançado do Servidor)
      (Autenticação Simples)
      (Estratégias de Implantação)
      (Configuração de Hosts MCP)
      (Inspetor MCP)
    04. Implementação Prática
      ::icon(fa fa-code)
      (SDKs Multilíngues)
      (Testes & Depuração)
      (Modelos de Prompt)
      (Projetos Exemplares)
      (Padrões de Produção)
      (Estratégias de Paginação)
    05. Tópicos Avançados
      ::icon(fa fa-graduation-cap)
      (Engenharia de Contexto)
      (Integração com Agente Foundry)
      (Fluxos de Trabalho IA Multimodal)
      (Autenticação OAuth2)
      (Busca em Tempo Real)
      (Protocolos de Streaming)
      (Contextos Raiz)
      (Estratégias de Roteamento)
      (Técnicas de Amostragem)
      (Soluções de Escalabilidade)
      (Endurecimento de Segurança)
      (Integração Entra ID)
      (Busca Web MCP)
      (Análise Profunda dos Recursos do Protocolo)
      (Raciocínio Multiagente Adversarial)
      
    06. Comunidade
      ::icon(fa fa-users)
      (Contribuições de Código)
      (Documentação)
      (Ecossistema Cliente MCP)
      (Registro Servidor MCP)
      (Ferramentas de Geração de Imagens)
      (Colaboração no GitHub)
    07. Adoção Inicial
      ::icon(fa fa-lightbulb)
      (Implantações em Produção)
      (Servidores Microsoft MCP)
      (Serviço Azure MCP)
      (Estudos de Caso Empresariais)
      (Roteiro Futuro)
    08. Melhores Práticas
      ::icon(fa fa-check)
      (Otimização de Desempenho)
      (Tolerância a Falhas)
      (Resiliência do Sistema)
      (Monitoramento & Observabilidade)
    09. Estudos de Caso
      ::icon(fa fa-file-text)
      (Gerenciamento de API Azure)
      (Agente de Viagens IA)
      (Integração Azure DevOps)
      (Documentação MCP)
      (Registro MCP no GitHub)
      (Integração VS Code)
      (Implementações no Mundo Real)
    10. Workshop Prático
      ::icon(fa fa-laptop)
      (Fundamentos do Servidor MCP)
      (Desenvolvimento Avançado)
      (Integração com Kit de Ferramentas IA)
      (Implantação em Produção)
      (Estrutura de 4 Laboratórios)
    11. Laboratórios de Integração com Banco de Dados
      ::icon(fa fa-database)
      (Integração PostgreSQL)
      (Caso de Uso em Análise Varejista)
      (Segurança no Nível de Linha)
      (Busca Semântica)
      (Implantação em Produção)
      (Estrutura de 13 Laboratórios)
      (Aprendizado Prático)
    12. Ferramentas
      ::icon(fa fa-wrench)
      (MCP no aplicativo Copilot)
```

## Estrutura do Repositório

O repositório está organizado em doze seções principais, cada uma focando em diferentes aspectos do MCP:

1. **Introdução (00-Introduction/)**
   - Visão geral do Protocolo de Contexto de Modelo
   - Por que a padronização é importante em pipelines de IA
   - Casos de uso práticos e benefícios

2. **Conceitos Básicos (01-CoreConcepts/)**
   - Arquitetura cliente-servidor
   - Componentes principais do protocolo
   - Padrões de mensagens no MCP

3. **Segurança (02-Security/)**
   - Ameaças de segurança em sistemas baseados em MCP
   - Melhores práticas para proteger implementações
   - Estratégias de autenticação e autorização
   - **Documentação Abrangente de Segurança**:
     - Melhores Práticas de Segurança MCP 2025
     - Guia de Implementação Azure Content Safety
     - Controles e Técnicas de Segurança MCP
     - Referência Rápida de Melhores Práticas MCP
   - **Tópicos-Chave de Segurança**:
     - Injeção de prompts e ataques de envenenamento de ferramentas
     - Sequestro de sessão e problemas de procurador confuso
     - Vulnerabilidades em passagem de tokens
     - Permissões excessivas e controle de acesso
     - Segurança da cadeia de suprimentos para componentes de IA
     - Integração Microsoft Prompt Shields

4. **Primeiros Passos (03-GettingStarted/)**
   - Configuração e preparação do ambiente
   - Criação de servidores e clientes MCP básicos
   - Integração com aplicações existentes
   - Inclui seções para:
     - Primeira implementação de servidor
     - Desenvolvimento de cliente
     - Integração cliente LLM
     - Integração com VS Code
     - Servidor com Server-Sent Events (SSE)
     - Uso avançado de servidor
     - Streaming HTTP
     - Integração com AI Toolkit
     - Estratégias de teste
     - Diretrizes de deployment

5. **Implementação Prática (04-PracticalImplementation/)**
   - Uso de SDKs em diferentes linguagens de programação
   - Técnicas de depuração, teste e validação
   - Criação de templates e fluxos de prompts reutilizáveis
   - Projetos de exemplo com casos de implementação

6. **Tópicos Avançados (05-AdvancedTopics/)**
   - Técnicas de engenharia de contexto
   - Integração com agente Foundry
   - Fluxos de trabalho de IA multimodal
   - Demonstrações de autenticação OAuth2
   - Capacidades de busca em tempo real
   - Streaming em tempo real
   - Implementação de contextos raiz
   - Estratégias de roteamento
   - Técnicas de amostragem
   - Abordagens de escalonamento
   - Considerações de segurança
   - Integração de segurança Entra ID
   - Integração com busca web
   - Raciocínio multiagente adversarial (padrões de debate)

7. **Contribuições da Comunidade (06-CommunityContributions/)**
   - Como contribuir com código e documentação
   - Colaboração via GitHub
   - Melhorias e feedback orientados pela comunidade
   - Uso de diversos clientes MCP (Claude Desktop, Cline, VSCode)
   - Trabalhando com servidores MCP populares, incluindo geração de imagens

8. **Lições da Adoção Inicial (07-LessonsfromEarlyAdoption/)**
   - Implementações reais e histórias de sucesso
   - Construção e deployment de soluções baseadas em MCP
   - Tendências e roteiro futuro
   - **Guia dos Servidores MCP Microsoft**: Guia abrangente para 10 servidores MCP Microsoft prontos para produção incluindo:
     - Microsoft Learn Docs MCP Server
     - Azure MCP Server (mais de 15 conectores especializados)
     - GitHub MCP Server
     - Azure DevOps MCP Server
     - MarkItDown MCP Server
     - SQL Server MCP Server
     - Playwright MCP Server
     - Dev Box MCP Server
     - Microsoft Foundry MCP Server
     - Microsoft 365 Agents Toolkit MCP Server

9. **Melhores Práticas (08-BestPractices/)**
   - Ajuste de performance e otimização
   - Design de sistemas MCP tolerantes a falhas
   - Estratégias de teste e resiliência

10. **Estudos de Caso (09-CaseStudy/)**
    - **Sete estudos de caso abrangentes** demonstrando a versatilidade do MCP em diversos cenários:
    - **Agentes de Viagem Azure AI**: orquestração multiagente com Azure OpenAI e AI Search
    - **Integração Azure DevOps**: automação de processos com atualizações de dados do YouTube
    - **Recuperação de Documentação em Tempo Real**: cliente console Python com streaming HTTP
    - **Gerador Interativo de Plano de Estudos**: app web Chainlit com IA conversacional
    - **Documentação In-Editor**: integração VS Code com fluxos GitHub Copilot
    - **Azure API Management**: integração corporativa de API com criação de servidor MCP
    - **Registro MCP GitHub**: desenvolvimento de ecossistema e plataforma de integração agentic
    - Exemplos de implementação abrangendo integração corporativa, produtividade de desenvolvedores e desenvolvimento de ecossistemas

11. **Workshop Prático (10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/)**
    - Workshop prático abrangente combinando MCP com AI Toolkit
    - Construindo aplicações inteligentes unindo modelos de IA com ferramentas do mundo real
    - Módulos práticos cobrindo fundamentos, desenvolvimento de servidor customizado e estratégias de deployment em produção
    - **Estrutura dos Laboratórios**:
      - Laboratório 1: Fundamentos do Servidor MCP
      - Laboratório 2: Desenvolvimento Avançado de Servidor MCP
      - Laboratório 3: Integração AI Toolkit
      - Laboratório 4: Deployment e Escalonamento em Produção
    - Aprendizagem baseada em laboratórios com instruções passo a passo

12. **Laboratórios de Integração de Banco de Dados para Servidor MCP (11-MCPServerHandsOnLabs/)**
    - **Caminho de aprendizagem com 13 laboratórios completos** para construir servidores MCP prontos para produção com integração PostgreSQL
    - **Implementação real em análise de varejo** usando o caso de uso Zava Retail
    - **Padrões corporativos** incluindo Row Level Security (RLS), busca semântica e acesso a dados multi-inquilino
    - **Estrutura Completa dos Laboratórios**:
      - **Laboratórios 00-03: Fundamentos** - Introdução, Arquitetura, Segurança, Configuração de Ambiente
      - **Laboratórios 04-06: Construindo o Servidor MCP** - Design do Banco, Implementação do Servidor MCP, Desenvolvimento de Ferramentas
      - **Laboratórios 07-09: Recursos Avançados** - Busca Semântica, Testes e Depuração, Integração VS Code
      - **Laboratórios 10-12: Produção e Melhores Práticas** - Deployment, Monitoramento, Otimização
    - **Tecnologias Abordadas**: framework FastMCP, PostgreSQL, Azure OpenAI, Azure Container Apps, Application Insights
    - **Resultados de Aprendizagem**: servidores MCP prontos para produção, padrões de integração de banco, análise com IA, segurança corporativa

13. **Ferramentas (12-tooling/)**
    - Aprenda a usar MCP no app Copilot e outras ferramentas

## Recursos Adicionais

O repositório inclui recursos de suporte:

- **Pasta Imagens**: Contém diagramas e ilustrações usadas ao longo do currículo
- **Traduções**: Suporte multilíngue com traduções automáticas da documentação
- **Recursos Oficiais MCP**:
  - [Documentação MCP](https://modelcontextprotocol.io/)
  - [Especificação MCP](https://spec.modelcontextprotocol.io/)
  - [Repositório MCP no GitHub](https://github.com/modelcontextprotocol)

## Como Usar Este Repositório

1. **Aprendizado Sequencial**: Siga os capítulos em ordem (00 até 11) para uma experiência de aprendizado estruturada.
2. **Foco em Linguagem Específica**: Se estiver interessado em uma linguagem de programação específica, explore os diretórios de exemplos para implementações na linguagem preferida.
3. **Implementação Prática**: Comece pela seção "Primeiros Passos" para configurar seu ambiente e criar seu primeiro servidor e cliente MCP.
4. **Exploração Avançada**: Quando estiver confortável com o básico, aprofunde-se nos tópicos avançados para expandir seu conhecimento.
5. **Engajamento Comunitário**: Participe da comunidade MCP por meio das discussões no GitHub e canais do Discord para conectar-se com especialistas e outros desenvolvedores.

## Clientes e Ferramentas MCP

O currículo cobre diversos clientes e ferramentas MCP:

1. **Clientes Oficiais**:
   - Visual Studio Code 
   - MCP no Visual Studio Code
   - Claude Desktop
   - Claude no VSCode 
   - Claude API

2. **Clientes da Comunidade**:
   - Cline (baseado em terminal)
   - Cursor (editor de código)
   - ChatMCP
   - Windsurf

3. **Ferramentas de Gestão MCP**:
   - MCP CLI
   - MCP Manager
   - MCP Linker
   - MCP Router

## Servidores MCP Populares

O repositório apresenta vários servidores MCP, incluindo:

1. **Servidores MCP Oficiais Microsoft**:
   - Microsoft Learn Docs MCP Server
   - Azure MCP Server (15+ conectores especializados)
   - GitHub MCP Server
   - Azure DevOps MCP Server
   - MarkItDown MCP Server
   - SQL Server MCP Server
   - Playwright MCP Server
   - Dev Box MCP Server
   - Microsoft Foundry MCP Server
   - Microsoft 365 Agents Toolkit MCP Server

2. **Servidores de Referência Oficiais**:
   - Filesystem
   - Fetch
   - Memory
   - Sequential Thinking

3. **Geração de Imagens**:
   - Azure OpenAI DALL-E 3
   - Stable Diffusion WebUI
   - Replicate

4. **Ferramentas de Desenvolvimento**:
   - Git MCP
   - Terminal Control
   - Code Assistant

5. **Servidores Especializados**:
   - Salesforce
   - Microsoft Teams
   - Jira & Confluence

## Contribuindo

Este repositório recebe contribuições da comunidade. Veja a seção Contribuições da Comunidade para orientação sobre como contribuir efetivamente para o ecossistema MCP.

----

*Este guia de estudo foi atualizado pela última vez em 5 de fevereiro de 2026, refletindo a mais recente Especificação MCP 2025-11-25 e oferece uma visão geral do repositório na data mencionada. O conteúdo do repositório pode ser atualizado após essa data.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->