# Introdução à Integração da Base de Dados MCP

## 🎯 O que este Laboratório Abrange

Este laboratório de introdução fornece uma visão abrangente sobre a construção de servidores Model Context Protocol (MCP) com integração de base de dados. Irá compreender o caso de negócio, arquitetura técnica e aplicações reais através do caso de uso de análise de retalho da Zava Retail em https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Visão Geral

**Model Context Protocol (MCP)** permite que assistentes de IA acedam e interajam de forma segura com fontes de dados externas em tempo real. Quando combinado com integração de base de dados, o MCP desbloqueia funcionalidades poderosas para aplicações de IA orientadas por dados.

Este percurso de aprendizagem ensina a construir servidores MCP prontos para produção que ligam assistentes de IA a dados de vendas de retalho através do PostgreSQL, implementando padrões empresariais como Row Level Security, pesquisa semântica e acesso a dados multi-inquilino.

## Objetivos de Aprendizagem

No final deste laboratório, será capaz de:

- **Definir** o Model Context Protocol e os seus benefícios principais para integração de base de dados  
- **Identificar** os componentes chave de uma arquitetura de servidor MCP com bases de dados  
- **Compreender** o caso de uso Zava Retail e os seus requisitos de negócio  
- **Reconhecer** padrões empresariais para acesso seguro e escalável a bases de dados  
- **Listar** as ferramentas e tecnologias utilizadas ao longo deste percurso de aprendizagem  

## 🧭 O Desafio: IA Encontra Dados do Mundo Real

### Limitações Tradicionais da IA

Assistentes modernos de IA são incrivelmente poderosos, mas enfrentam limitações significativas ao trabalhar com dados empresariais reais:

| **Desafio** | **Descrição** | **Impacto no Negócio** |
|-------------|---------------|-----------------------|
| **Conhecimento Estático** | Modelos de IA treinados em conjuntos de dados fixos não conseguem aceder a dados atuais do negócio | Insights desatualizados, oportunidades perdidas |
| **Silos de Dados** | Informação bloqueada em bases de dados, APIs e sistemas inacessíveis para IA | Análise incompleta, fluxos de trabalho fragmentados |
| **Restrições de Segurança** | Acesso direto à base de dados levanta preocupações de segurança e conformidade | Implantação limitada, preparação manual de dados |
| **Consultas Complexas** | Utilizadores empresariais precisam de conhecimentos técnicos para extrair insights | Menor adoção, processos ineficientes |

### A Solução MCP

O Model Context Protocol resolve estes desafios ao providenciar:

- **Acesso a Dados em Tempo Real**: Assistentes de IA consultam bases de dados e APIs ao vivo  
- **Integração Segura**: Acesso controlado com autenticação e permissões  
- **Interface em Linguagem Natural**: Utilizadores empresariais fazem perguntas em inglês simples  
- **Protocolo Padronizado**: Funciona em diferentes plataformas e ferramentas de IA  

## 🏪 Conheça a Zava Retail: O Nosso Estudo de Caso https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Ao longo deste percurso de aprendizagem, iremos construir um servidor MCP para a **Zava Retail**, uma cadeia de retalho bricolage fictícia com várias localizações de lojas. Este cenário realista demonstra uma implementação MCP de nível empresarial.

### Contexto Empresarial

**Zava Retail** opera:
- **8 lojas físicas** no estado de Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 loja online** para vendas de comércio eletrónico  
- **Catálogo diversificado** incluindo ferramentas, ferragens, artigos de jardim e materiais de construção  
- **Gestão multinível** com gerentes de loja, gerentes regionais e executivos  

### Requisitos Empresariais

Gerentes de loja e executivos precisam de análises potenciadas por IA para:

1. **Analisar o desempenho de vendas** nas lojas e períodos de tempo  
2. **Monitorizar níveis de inventário** e identificar necessidades de reabastecimento  
3. **Compreender comportamento do cliente** e padrões de compra  
4. **Descobrir insights de produtos** através da pesquisa semântica  
5. **Gerar relatórios** com consultas em linguagem natural  
6. **Manter a segurança dos dados** com controlo de acesso baseado em funções  

### Requisitos Técnicos

O servidor MCP deve providenciar:

- **Acesso a dados multi-inquilino** onde os gerentes veem apenas os dados da sua loja  
- **Consultas flexíveis** que suportem operações SQL complexas  
- **Pesquisa semântica** para descoberta e recomendações de produtos  
- **Dados em tempo real** refletindo o estado atual do negócio  
- **Autenticação segura** com segurança ao nível da linha (row-level security)  
- **Arquitetura escalável** que suporte múltiplos utilizadores concorrentes  

## 🏗️ Visão Geral da Arquitetura do Servidor MCP

O nosso servidor MCP implementa uma arquitetura em camadas otimizada para integração de bases de dados:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Componentes Chave

#### **1. Camada do Servidor MCP**
- **Framework FastMCP**: Implementação moderna de servidor MCP em Python  
- **Registo de Ferramentas**: Definições declarativas de ferramentas com segurança de tipos  
- **Contexto de Pedido**: Gestão de identidade do utilizador e sessão  
- **Gestão de Erros**: Gestão robusta de erros e registos  

#### **2. Camada de Integração de Base de Dados**
- **Pool de Ligações**: Gestão eficiente de ligações asyncpg  
- **Fornecedor de Esquema**: Descoberta dinâmica de esquemas de tabelas  
- **Executor de Consultas**: Execução segura de SQL com contexto RLS  
- **Gestão de Transações**: Conformidade ACID e gestão de rollback  

#### **3. Camada de Segurança**
- **Segurança ao Nível da Linha**: PostgreSQL RLS para isolamento de dados multi-inquilino  
- **Identidade do Utilizador**: Autenticação e autorização do gerente da loja  
- **Controlo de Acesso**: Permissões pormenorizadas e auditoria  
- **Validação de Entrada**: Prevenção contra injeção SQL e validação de consultas  

#### **4. Camada de Aprimoramento de IA**
- **Pesquisa Semântica**: Vetores de incorporação para descoberta de produtos  
- **Integração Azure OpenAI**: Geração de vetores de texto  
- **Algoritmos de Similaridade**: Pesquisa de similaridade coseno com pgvector  
- **Otimização de Pesquisa**: Indexação e melhorias de desempenho  

## 🔧 Pilha Tecnológica

### Tecnologias Core

| **Componente** | **Tecnologia** | **Função** |
|----------------|----------------|------------|
| **Framework MCP** | FastMCP (Python) | Implementação moderna de servidor MCP |  
| **Base de Dados** | PostgreSQL 17 + pgvector | Dados relacionais com pesquisa vetorial |  
| **Serviços de IA** | Azure OpenAI | Vetores de texto e modelos de linguagem |  
| **Conteinerização** | Docker + Docker Compose | Ambiente de desenvolvimento |  
| **Plataforma Cloud** | Microsoft Azure | Implantação em produção |  
| **Integração IDE** | VS Code | Chat IA e fluxo de trabalho de desenvolvimento |  

### Ferramentas de Desenvolvimento

| **Ferramenta** | **Função** |
|----------------|------------|
| **asyncpg** | Driver PostgreSQL de alta performance |  
| **Pydantic** | Validação e serialização de dados |  
| **Azure SDK** | Integração de serviços cloud |  
| **pytest** | Framework de testes |  
| **Docker** | Conteinerização e implantação |  

### Pila de Produção

| **Serviço** | **Recurso Azure** | **Função** |
|-------------|-------------------|------------|
| **Base de Dados** | Azure Database for PostgreSQL | Serviço gerido de base de dados |  
| **Contentor** | Azure Container Apps | Hospedagem serverless de contentores |  
| **Serviços de IA** | Microsoft Foundry | Modelos e endpoints OpenAI |  
| **Monitorização** | Application Insights | Observabilidade e diagnóstico |  
| **Segurança** | Azure Key Vault | Gestão de segredos e configuração |  

## 🎬 Cenários de Uso no Mundo Real

Vamos explorar como diferentes utilizadores interagem com o nosso servidor MCP:

### Cenário 1: Revisão de Desempenho do Gerente de Loja

**Utilizadora**: Sarah, Gerente da Loja de Seattle  
**Objetivo**: Analisar o desempenho de vendas do último trimestre

**Consulta em Linguagem Natural**:
> "Mostra-me os 10 principais produtos por receita na minha loja no 4º trimestre de 2024"

**O que Acontece**:
1. O Chat IA do VS Code envia a consulta ao servidor MCP  
2. O servidor MCP identifica o contexto da loja da Sarah (Seattle)  
3. Políticas RLS filtram dados só para a loja de Seattle  
4. Consulta SQL é gerada e executada  
5. Resultados são formatados e devolvidos ao Chat IA  
6. A IA fornece análise e insights  

### Cenário 2: Descoberta de Produtos com Pesquisa Semântica

**Utilizador**: Mike, Gestor de Inventário  
**Objetivo**: Encontrar produtos semelhantes a um pedido do cliente

**Consulta em Linguagem Natural**:
> "Que produtos vendemos que são semelhantes a ‘conectores elétricos impermeáveis para uso exterior’?"

**O que Acontece**:
1. Consulta processada pela ferramenta de pesquisa semântica  
2. Azure OpenAI gera vetor de incorporação  
3. pgvector realiza a pesquisa de similaridade  
4. Produtos relacionados são classificados por relevância  
5. Resultados incluem detalhes do produto e disponibilidade  
6. A IA sugere alternativas e oportunidades de combinação  

### Cenário 3: Análise entre Lojas

**Utilizadora**: Jennifer, Gestora Regional  
**Objetivo**: Comparar desempenho entre todas as lojas

**Consulta em Linguagem Natural**:
> "Compara as vendas por categoria para todas as lojas nos últimos 6 meses"

**O que Acontece**:
1. Contexto RLS definido para acesso da gestora regional  
2. Consulta complexa multi-loja é gerada  
3. Dados agregados entre as localizações das lojas  
4. Resultados incluem tendências e comparações  
5. IA identifica insights e recomendações  

## 🔒 Segurança e Multi-inquilino em Detalhe

A nossa implementação prioriza segurança ao nível empresarial:

### Segurança ao Nível da Linha (RLS)

O PostgreSQL RLS assegura isolamento de dados:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Gestão de Identidade do Utilizador

Cada ligação MCP inclui:
- **ID do Gerente da Loja**: Identificador único para contexto RLS  
- **Atribuição de Papel**: Permissões e níveis de acesso  
- **Gestão de Sessão**: Tokens de autenticação seguros  
- **Registo de Auditoria**: Histórico completo de acessos  

### Proteção de Dados

Múltiplas camadas de segurança:
- **Criptografia de Ligação**: TLS para todas as conexões à base de dados  
- **Prevenção de Injeção SQL**: Apenas consultas parametrizadas  
- **Validação de Entrada**: Validação abrangente dos pedidos  
- **Gestão de Erros**: Sem dados sensíveis nas mensagens de erro  

## 🎯 Principais Mensagens

Após completar esta introdução, deverá compreender:

✅ **Proposta de Valor MCP**: Como o MCP liga assistentes IA a dados do mundo real  
✅ **Contexto Empresarial**: Requisitos e desafios da Zava Retail  
✅ **Visão Geral da Arquitetura**: Componentes chave e suas interações  
✅ **Pilha Tecnológica**: Ferramentas e frameworks utilizados  
✅ **Modelo de Segurança**: Acesso multi-inquilino e proteção  
✅ **Padrões de Uso**: Cenários de consultas e fluxos de trabalho reais  

## 🚀 O que Vem a Seguir

Pronto para aprofundar? Continue com:

**[Lab 01: Conceitos Core de Arquitetura](../01-Architecture/README.md)**

Aprenda sobre padrões de arquitetura de servidor MCP, princípios de design de base de dados e a implementação técnica detalhada que sustenta a nossa solução de análise de retalho.

## 📚 Recursos Adicionais

### Documentação MCP
- [Especificação MCP](https://modelcontextprotocol.io/docs/) - Documentação oficial do protocolo  
- [MCP para Iniciantes](https://aka.ms/mcp-for-beginners) - Guia abrangente de aprendizagem MCP  
- [Documentação FastMCP](https://github.com/modelcontextprotocol/python-sdk) - Documentação do SDK Python  

### Integração de Base de Dados
- [Documentação PostgreSQL](https://www.postgresql.org/docs/) - Referência completa PostgreSQL  
- [Guia pgvector](https://github.com/pgvector/pgvector) - Documentação da extensão vetorial  
- [Segurança ao Nível da Linha](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Guia PostgreSQL RLS  

### Serviços Azure
- [Documentação Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integração de serviços de IA  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Serviço gerido de bases de dados  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Contentores serverless  

---

**Aviso Legal**: Este é um exercício de aprendizagem utilizando dados fictícios de retalho. Siga sempre as políticas de governação e segurança de dados da sua organização ao implementar soluções similares em ambientes de produção.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->