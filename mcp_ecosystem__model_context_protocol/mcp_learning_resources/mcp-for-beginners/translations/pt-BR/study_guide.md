# Protocolo de Contexto do Modelo (MCP) para Iniciantes - Guia de Estudo

Este guia de estudo fornece uma visão geral da estrutura e conteúdo do repositório para o currículo "Protocolo de Contexto do Modelo (MCP) para Iniciantes". Use este guia para navegar pelo repositório de forma eficiente e aproveitar ao máximo os recursos disponíveis.

## Visão Geral do Repositório

O Protocolo de Contexto do Modelo (MCP) é uma estrutura padronizada para interações entre modelos de IA e aplicações clientes. Inicialmente criado pela Anthropic, o MCP agora é mantido pela comunidade mais ampla do MCP através da organização oficial no GitHub. Este repositório oferece um currículo abrangente com exemplos de código práticos em C#, Java, JavaScript, Python e TypeScript, desenvolvido para desenvolvedores de IA, arquitetos de sistemas e engenheiros de software.

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
    01. Conceitos Básicos
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
    03. Começando
      ::icon(fa fa-rocket)
      (Primeira Implementação de Servidor)
      (Desenvolvimento Cliente)
      (Integração Cliente LLM)
      (Extensões VS Code)
      (Configuração do Servidor SSE)
      (Streaming HTTP)
      (Integração do Kit de Ferramentas IA)
      (Frameworks de Teste)
      (Uso Avançado do Servidor)
      (Autenticação Simples)
      (Estratégias de Implantação)
      (Configuração de Hosts MCP)
      (Inspetor MCP)
    04. Implementação Prática
      ::icon(fa fa-code)
      (SDKs Multi-idiomas)
      (Testes & Depuração)
      (Modelos de Prompt)
      (Projetos de Exemplo)
      (Padrões de Produção)
      (Estratégias de Paginação)
    05. Tópicos Avançados
      ::icon(fa fa-graduation-cap)
      (Engenharia de Contexto)
      (Integração com Agente Foundry)
      (Fluxos de Trabalho IA Multi-modal)
      (Autenticação OAuth2)
      (Busca em Tempo Real)
      (Protocolos de Streaming)
      (Contextos Raiz)
      (Estratégias de Roteamento)
      (Técnicas de Amostragem)
      (Soluções de Escalonamento)
      (Fortalecimento de Segurança)
      (Integração Entra ID)
      (Busca Web MCP)
      (Análise Profunda de Recursos do Protocolo)
      
    06. Comunidade
      ::icon(fa fa-users)
      (Contribuições de Código)
      (Documentação)
      (Ecossistema Cliente MCP)
      (Registro de Servidor MCP)
      (Ferramentas de Geração de Imagens)
      (Colaboração GitHub)
    07. Adoção Inicial
      ::icon(fa fa-lightbulb)
      (Implantações em Produção)
      (Servidores MCP Microsoft)
      (Serviço MCP Azure)
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
      (Agente de Viagens com IA)
      (Integração Azure DevOps)
      (Documentação MCP)
      (Registro MCP GitHub)
      (Integração VS Code)
      (Implementações no Mundo Real)
    10. Oficina Prática
      ::icon(fa fa-laptop)
      (Fundamentos do Servidor MCP)
      (Desenvolvimento Avançado)
      (Integração do Kit de Ferramentas IA)
      (Implantação em Produção)
      (Estrutura de 4 Laboratórios)
    11. Laboratórios de Integração de Banco de Dados
      ::icon(fa fa-database)
      (Integração PostgreSQL)
      (Caso de Uso de Análise de Varejo)
      (Segurança em Nível de Linha)
      (Busca Semântica)
      (Implantação em Produção)
      (Estrutura de 13 Laboratórios)
      (Aprendizado Prático)
```
## Estrutura do Repositório

O repositório está organizado em onze seções principais, cada uma focando em diferentes aspectos do MCP:

1. **Introdução (00-Introduction/)**
   - Visão geral do Protocolo de Contexto do Modelo
   - Por que a padronização é importante em pipelines de IA
   - Casos de uso práticos e benefícios

2. **Conceitos Básicos (01-CoreConcepts/)**
   - Arquitetura cliente-servidor
   - Componentes-chave do protocolo
   - Padrões de mensagens no MCP

3. **Segurança (02-Security/)**
   - Ameaças de segurança em sistemas baseados em MCP
   - Melhores práticas para garantir implementações seguras
   - Estratégias de autenticação e autorização
   - **Documentação Completa de Segurança**:
     - Práticas recomendadas de segurança MCP 2025
     - Guia de implementação de segurança de conteúdo Azure
     - Controles e técnicas de segurança MCP
     - Referência rápida de melhores práticas MCP
   - **Tópicos-chave de Segurança**:
     - Ataques de injeção de prompt e envenenamento de ferramentas
     - Sequestro de sessão e problemas de procurador confundido
     - Vulnerabilidades de passagem de token
     - Permissões excessivas e controle de acesso
     - Segurança da cadeia de suprimentos para componentes de IA
     - Integração com Microsoft Prompt Shields

4. **Introdução Prática (03-GettingStarted/)**
   - Configuração e preparação do ambiente
   - Criação de servidores e clientes MCP básicos
   - Integração com aplicações existentes
   - Inclui seções para:
     - Primeira implementação de servidor
     - Desenvolvimento de cliente
     - Integração cliente LLM
     - Integração com VS Code
     - Servidor Server-Sent Events (SSE)
     - Uso avançado do servidor
     - Streaming HTTP
     - Integração com AI Toolkit
     - Estratégias de testes
     - Diretrizes de implantação

5. **Implementação Prática (04-PracticalImplementation/)**
   - Uso de SDKs em diferentes linguagens de programação
   - Técnicas de depuração, testes e validação
   - Criação de templates reutilizáveis de prompts e fluxos de trabalho
   - Projetos de exemplo com casos de implementação

6. **Tópicos Avançados (05-AdvancedTopics/)**
   - Técnicas de engenharia de contexto
   - Integração com agentes Foundry
   - Fluxos de trabalho multimodais de IA
   - Demonstrações de autenticação OAuth2
   - Capacidades de busca em tempo real
   - Streaming em tempo real
   - Implementação de contextos raiz
   - Estratégias de roteamento
   - Técnicas de amostragem
   - Abordagens para escalabilidade
   - Considerações de segurança
   - Integração com segurança Entra ID
   - Integração de busca na web

7. **Contribuições da Comunidade (06-CommunityContributions/)**
   - Como contribuir com código e documentação
   - Colaboração via GitHub
   - Melhorias e feedback orientados pela comunidade
   - Uso de diversos clientes MCP (Claude Desktop, Cline, VSCode)
   - Trabalhando com servidores MCP populares incluindo geração de imagens

8. **Lições da Adoção Inicial (07-LessonsfromEarlyAdoption/)**
   - Implementações reais e histórias de sucesso
   - Construção e implantação de soluções baseadas em MCP
   - Tendências e roadmap futuro
   - **Guia dos Servidores MCP Microsoft**: Guia abrangente para 10 servidores MCP Microsoft prontos para produção, incluindo:
     - Microsoft Learn Docs MCP Server
     - Azure MCP Server (mais de 15 conectores especializados)
     - GitHub MCP Server
     - Azure DevOps MCP Server
     - MarkItDown MCP Server
     - SQL Server MCP Server
     - Playwright MCP Server
     - Dev Box MCP Server
     - Azure AI Foundry MCP Server
     - Microsoft 365 Agents Toolkit MCP Server

9. **Melhores Práticas (08-BestPractices/)**
   - Ajuste de desempenho e otimização
   - Design de sistemas MCP tolerantes a falhas
   - Estratégias de testes e resiliência

10. **Estudos de Caso (09-CaseStudy/)**
    - **Sete estudos de caso abrangentes** demonstrando a versatilidade do MCP em diversos cenários:
    - **Azure AI Travel Agents**: Orquestração multiagente com Azure OpenAI e AI Search
    - **Integração Azure DevOps**: Automação de processos de fluxo de trabalho com atualizações de dados do YouTube
    - **Recuperação de Documentação em Tempo Real**: Cliente de console Python com streaming HTTP
    - **Gerador Interativo de Plano de Estudos**: Aplicativo web Chainlit com IA conversacional
    - **Documentação no Editor**: Integração VS Code com fluxos de trabalho GitHub Copilot
    - **Gerenciamento de API Azure**: Integração corporativa de APIs com criação de servidor MCP
    - **Registro MCP GitHub**: Desenvolvimento de ecossistema e plataforma de integração agente
    - Exemplos de implementação abrangendo integração corporativa, produtividade de desenvolvedor e desenvolvimento de ecossistema

11. **Workshop Prático (10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/)**
    - Workshop prático abrangente combinando MCP com AI Toolkit
    - Construção de aplicações inteligentes que conectam modelos de IA com ferramentas do mundo real
    - Módulos práticos cobrindo fundamentos, desenvolvimento de servidores personalizados e estratégias de implantação em produção
    - **Estrutura do Laboratório**:
      - Laboratório 1: Fundamentos do Servidor MCP
      - Laboratório 2: Desenvolvimento Avançado de Servidor MCP
      - Laboratório 3: Integração com AI Toolkit
      - Laboratório 4: Implantação e Escalonamento em Produção
    - Abordagem baseada em laboratórios com instruções passo a passo

12. **Laboratórios de Integração de Banco de Dados MCP Server (11-MCPServerHandsOnLabs/)**
    - **Caminho de aprendizado abrangente com 13 laboratórios** para construção de servidores MCP prontos para produção com integração PostgreSQL
    - **Implementação real de análises para varejo** usando o caso de uso Zava Retail
    - **Padrões corporativos** incluindo Row Level Security (RLS), busca semântica e acesso a dados multi-tenant
    - **Estrutura Completa do Laboratório**:
      - **Laboratórios 00-03: Fundamentos** - Introdução, Arquitetura, Segurança, Configuração de Ambiente
      - **Laboratórios 04-06: Construindo o Servidor MCP** - Design de Banco de Dados, Implementação do Servidor MCP, Desenvolvimento de Ferramentas
      - **Laboratórios 07-09: Recursos Avançados** - Busca Semântica, Testes e Depuração, Integração VS Code
      - **Laboratórios 10-12: Produção e Melhores Práticas** - Implantação, Monitoramento, Otimização
    - **Tecnologias Abrangidas**: Framework FastMCP, PostgreSQL, Azure OpenAI, Azure Container Apps, Application Insights
    - **Resultados de Aprendizagem**: Servidores MCP prontos para produção, padrões de integração de banco de dados, análises impulsionadas por IA, segurança empresarial

## Recursos Adicionais

O repositório inclui recursos complementares:

- **Pasta de imagens**: Contém diagramas e ilustrações usados ao longo do currículo
- **Traduções**: Suporte multilíngue com traduções automatizadas da documentação
- **Recursos oficiais MCP**:
  - [Documentação MCP](https://modelcontextprotocol.io/)
  - [Especificação MCP](https://spec.modelcontextprotocol.io/)
  - [Repositório MCP no GitHub](https://github.com/modelcontextprotocol)

## Como Usar Este Repositório

1. **Aprendizagem Sequencial**: Siga os capítulos na ordem (00 até 11) para uma experiência de aprendizado estruturada.
2. **Foco em Linguagem Específica**: Se estiver interessado em uma linguagem de programação específica, explore os diretórios de exemplos para implementações na sua linguagem preferida.
3. **Implementação Prática**: Comece pela seção "Introdução Prática" para configurar seu ambiente e criar seu primeiro servidor e cliente MCP.
4. **Exploração Avançada**: Quando se sentir confortável com o básico, mergulhe nos tópicos avançados para expandir seu conhecimento.
5. **Engajamento na Comunidade**: Participe da comunidade MCP através das discussões no GitHub e canais no Discord para se conectar com especialistas e outros desenvolvedores.

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

3. **Ferramentas de Gerenciamento MCP**:
   - MCP CLI
   - MCP Manager
   - MCP Linker
   - MCP Router

## Servidores MCP Populares

O repositório apresenta vários servidores MCP, incluindo:

1. **Servidores MCP Oficiais da Microsoft**:
   - Microsoft Learn Docs MCP Server
   - Azure MCP Server (mais de 15 conectores especializados)
   - GitHub MCP Server
   - Azure DevOps MCP Server
   - MarkItDown MCP Server
   - SQL Server MCP Server
   - Playwright MCP Server
   - Dev Box MCP Server
   - Azure AI Foundry MCP Server
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

Este repositório recebe contribuições da comunidade. Veja a seção Contribuições da Comunidade para orientações sobre como contribuir de forma eficaz para o ecossistema MCP.

----

*Este guia de estudo foi atualizado pela última vez em 5 de fevereiro de 2026, refletindo a última Especificação MCP 2025-11-25 e fornece uma visão geral do repositório até esta data. O conteúdo do repositório pode ser atualizado após essa data.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional feita por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->