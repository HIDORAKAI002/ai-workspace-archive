# 🚀 Servidor MCP com PostgreSQL - Guia Completo de Aprendizagem

## 🧠 Visão Geral do Percurso de Aprendizagem da Integração da Base de Dados MCP

Este guia de aprendizagem abrangente ensina como construir servidores **Model Context Protocol (MCP)** prontos para produção que se integrem com bases de dados através de uma implementação prática de análise de retalho. Irá aprender padrões de nível empresarial incluindo **Row Level Security (RLS)**, **pesquisa semântica**, **integração Azure AI** e **acesso multi-inquilino a dados**.

Quer seja um programador backend, engenheiro de IA ou arquiteto de dados, este guia oferece uma aprendizagem estruturada com exemplos do mundo real e exercícios práticos que o guiam através do seguinte servidor MCP https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Recursos Oficiais do MCP

- 📘 [Documentação MCP](https://modelcontextprotocol.io/) – Tutoriais detalhados e guias de utilizador
- 📜 [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Arquitetura do protocolo e referências técnicas
- 🧑‍💻 [Repositório MCP no GitHub](https://github.com/modelcontextprotocol) – SDKs open-source, ferramentas e exemplos de código
- 🌐 [Comunidade MCP](https://github.com/orgs/modelcontextprotocol/discussions) – Participe nas discussões e contribua para a comunidade
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Melhores práticas de segurança e mitigação de riscos


## 🧭 Percurso de Aprendizagem da Integração da Base de Dados MCP

### 📚 Estrutura Completa de Aprendizagem para https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Laboratório | Tema | Descrição | Link |
|--------|-------|-------------|------|
| **Lab 1-3: Fundamentos** | | | |
| 00 | [Introdução à Integração MCP com Base de Dados](./00-Introduction/README.md) | Visão geral do MCP com integração de base de dados e caso de uso em análise de retalho | [Começar Aqui](./00-Introduction/README.md) |
| 01 | [Conceitos de Arquitetura Core](./01-Architecture/README.md) | Compreensão da arquitetura do servidor MCP, camadas de base de dados e padrões de segurança | [Aprender](./01-Architecture/README.md) |
| 02 | [Segurança e Multi-Inquilino](./02-Security/README.md) | Row Level Security, autenticação e acesso multi-inquilino a dados | [Aprender](./02-Security/README.md) |
| 03 | [Configuração do Ambiente](./03-Setup/README.md) | Configuração do ambiente de desenvolvimento, Docker, recursos Azure | [Configurar](./03-Setup/README.md) |
| **Lab 4-6: Construção do Servidor MCP** | | | |
| 04 | [Design e Esquema da Base de Dados](./04-Database/README.md) | Configuração PostgreSQL, design do esquema de retalho e dados de exemplo | [Construir](./04-Database/README.md) |
| 05 | [Implementação do Servidor MCP](./05-MCP-Server/README.md) | Construção do servidor FastMCP com integração de base de dados | [Construir](./05-MCP-Server/README.md) |
| 06 | [Desenvolvimento de Ferramentas](./06-Tools/README.md) | Criação de ferramentas de consulta à base de dados e introspeção de esquema | [Construir](./06-Tools/README.md) |
| **Lab 7-9: Funcionalidades Avançadas** | | | |
| 07 | [Integração de Pesquisa Semântica](./07-Semantic-Search/README.md) | Implementação de embeddings vetoriais com Azure OpenAI e pgvector | [Avançar](./07-Semantic-Search/README.md) |
| 08 | [Testes e Debugging](./08-Testing/README.md) | Estratégias de teste, ferramentas de debugging e abordagens de validação | [Testar](./08-Testing/README.md) |
| 09 | [Integração com VS Code](./09-VS-Code/README.md) | Configuração da integração MCP no VS Code e uso do AI Chat | [Integrar](./09-VS-Code/README.md) |
| **Lab 10-12: Produção e Melhores Práticas** | | | |
| 10 | [Estratégias de Deployment](./10-Deployment/README.md) | Deployment com Docker, Azure Container Apps e considerações de escalabilidade | [Deploy](./10-Deployment/README.md) |
| 11 | [Monitorização e Observabilidade](./11-Monitoring/README.md) | Application Insights, logging, monitorização de performance | [Monitorizar](./11-Monitoring/README.md) |
| 12 | [Melhores Práticas e Otimização](./12-Best-Practices/README.md) | Otimização de performance, reforço de segurança e dicas para produção | [Otimizar](./12-Best-Practices/README.md) |

### 💻 O Que Vai Construir

No final deste percurso, terá construído um completo **Servidor MCP de Análise de Retalho Zava** com as seguintes características:

- **Base de dados de retalho multi-tabela** com encomendas de clientes, produtos e inventário
- **Row Level Security** para isolamento de dados por loja
- **Pesquisa semântica de produtos** usando embeddings Azure OpenAI
- **Integração AI Chat no VS Code** para consultas em linguagem natural
- **Deployment pronto para produção** com Docker e Azure
- **Monitorização abrangente** com Application Insights

## 🎯 Pré-requisitos para Aprendizagem

Para tirar o máximo proveito deste percurso, deve ter:

- **Experiência em Programação**: Familiaridade com Python (preferencial) ou linguagens similares
- **Conhecimentos em Base de Dados**: Entendimento básico de SQL e bases de dados relacionais
- **Conceitos de API**: Conhecimento de REST APIs e conceitos HTTP
- **Ferramentas de Desenvolvimento**: Experiência com linha de comando, Git e editores de código
- **Noções Básicas de Cloud**: (Opcional) Conhecimento básico de Azure ou plataformas cloud similares
- **Familiaridade com Docker**: (Opcional) Entendimento de conceitos de containerização

### Ferramentas Requeridas

- **Docker Desktop** - Para executar PostgreSQL e o servidor MCP
- **Azure CLI** - Para deployment de recursos cloud
- **VS Code** - Para desenvolvimento e integração MCP
- **Git** - Para controlo de versões
- **Python 3.8+** - Para desenvolvimento do servidor MCP

## 📚 Guia de Estudo & Recursos

Este percurso inclui recursos abrangentes para o ajudar a navegar eficazmente:

### Guia de Estudo

Cada laboratório inclui:
- **Objetivos claros de aprendizagem** - O que irá alcançar
- **Instruções passo a passo** - Guias detalhados de implementação
- **Exemplos de código** - Exemplos funcionais com explicações
- **Exercícios** - Oportunidades de prática
- **Guias de resolução de problemas** - Problemas comuns e soluções
- **Recursos adicionais** - Leituras suplementares e exploração

### Verificação de Pré-requisitos

Antes de iniciar cada laboratório, encontrará:
- **Conhecimentos necessários** - O que deve saber previamente
- **Validação da configuração** - Como verificar o seu ambiente
- **Estimativas de tempo** - Tempo esperado para conclusão
- **Resultados de aprendizagem** - O que saberá após concluir

### Percursos de Aprendizagem Recomendados

Escolha o seu percurso com base no seu nível de experiência:

#### 🟢 **Percurso para Iniciantes** (Novo no MCP)
1. Assegure que completou os passos 0-10 de [MCP para Iniciantes](https://aka.ms/mcp-for-beginners) primeiro
2. Complete os laboratórios 00-03 para reforçar os fundamentos
3. Siga os laboratórios 04-06 para desenvolvimento prático
4. Experimente os laboratórios 07-09 para uso prático

#### 🟡 **Percurso Intermédio** (Alguma experiência no MCP)
1. Revise os laboratórios 00-01 para conceitos específicos de base de dados
2. Foque nos laboratórios 02-06 para implementação
3. Aprofunde-se nos laboratórios 07-12 para funcionalidades avançadas

#### 🔴 **Percurso Avançado** (Experiente em MCP)
1. Faça uma leitura rápida dos laboratórios 00-03 para contexto
2. Foque nos laboratórios 04-09 para integração de base de dados
3. Concentre-se nos laboratórios 10-12 para deployment em produção

## 🛠️ Como Usar Este Percurso de Aprendizagem Eficazmente

### Aprendizagem Sequencial (Recomendado)

Realize os laboratórios pela ordem para uma compreensão abrangente:

1. **Leia a visão geral** - Compreenda o que irá aprender
2. **Verifique os pré-requisitos** - Assegure que tem os conhecimentos necessários
3. **Siga os guias passo a passo** - Implemente enquanto aprende
4. **Complete os exercícios** - Reforce a sua compreensão
5. **Revise os principais pontos** - Consolide os resultados da aprendizagem

### Aprendizagem Focada

Se precisar de competências específicas:

- **Integração de Base de Dados**: Foque nos laboratórios 04-06
- **Implementação de Segurança**: Concentre-se nos laboratórios 02, 08, 12
- **Pesquisa IA/Semântica**: Aprofunde-se no laboratório 07
- **Deployment em Produção**: Estude os laboratórios 10-12

### Prática Hands-on

Cada laboratório inclui:
- **Exemplos de código funcionais** - Copie, modifique e experimente
- **Cenários reais** - Casos práticos de análise de retalho
- **Complexidade progressiva** - Desenvolvimento do simples ao avançado
- **Passos de validação** - Verifique que a sua implementação funciona

## 🌟 Comunidade e Suporte

### Obter Ajuda

- **Azure AI Discord**: [Junte-se para suporte especializado](https://discord.com/invite/ByRwuEEgH4)
- **Repositório GitHub e Exemplo de Implementação**: [Exemplo de Deployment e Recursos](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **Comunidade MCP**: [Participe nas discussões MCP alargadas](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Pronto para Começar?

Comece a sua jornada com **[Lab 00: Introdução à Integração MCP com Base de Dados](./00-Introduction/README.md)**

---

*Domine a construção de servidores MCP prontos para produção com integração de base de dados através desta experiência prática e abrangente de aprendizagem.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, por favor, tenha em atenção que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte oficial. Para informações críticas, recomenda-se a tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações erradas decorrentes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->