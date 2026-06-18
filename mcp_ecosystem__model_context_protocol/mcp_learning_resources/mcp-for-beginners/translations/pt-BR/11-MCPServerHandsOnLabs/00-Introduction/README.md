# Introdução à Integração do Banco de Dados MCP

## 🎯 O Que Este Laboratório Aborda

Este laboratório introdutório oferece uma visão abrangente sobre a construção de servidores Model Context Protocol (MCP) com integração de banco de dados. Você compreenderá o caso de negócios, a arquitetura técnica e aplicações reais por meio do caso de uso de análise do varejo Zava Retail em https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Visão Geral

**Model Context Protocol (MCP)** permite que assistentes de IA acessem e interajam com fontes externas de dados em tempo real de forma segura. Quando combinado com integração de banco de dados, o MCP desbloqueia capacidades poderosas para aplicações de IA orientadas por dados.

Este caminho de aprendizado ensina a construir servidores MCP prontos para produção que conectam assistentes de IA a dados de vendas de varejo através do PostgreSQL, implementando padrões corporativos como Row Level Security, busca semântica e acesso a dados multi-tenant.

## Objetivos de Aprendizagem

Ao final deste laboratório, você será capaz de:

- **Definir** o Model Context Protocol e seus principais benefícios para integração de banco de dados  
- **Identificar** os componentes-chave da arquitetura do servidor MCP com bancos de dados  
- **Compreender** o caso de uso Zava Retail e seus requisitos de negócios  
- **Reconhecer** padrões corporativos para acesso seguro e escalável a bancos de dados  
- **Listar** as ferramentas e tecnologias usadas ao longo deste caminho de aprendizado  

## 🧭 O Desafio: IA Encontra Dados do Mundo Real

### Limitações Tradicionais da IA

Assistentes de IA modernos são incrivelmente poderosos, mas enfrentam limitações significativas ao lidar com dados de negócios do mundo real:

| **Desafio** | **Descrição** | **Impacto no Negócio** |
|---------------|-----------------|-------------------|
| **Conhecimento Estático** | Modelos de IA treinados em conjuntos fixos de dados não acessam dados atuais de negócios | Insights desatualizados, oportunidades perdidas |
| **Silos de Dados** | Informações trancadas em bancos, APIs e sistemas inacessíveis para IA | Análise incompleta, fluxos de trabalho fragmentados |
| **Restrições de Segurança** | Acesso direto ao banco de dados gera preocupações de segurança e conformidade | Implantação limitada, preparação manual de dados |
| **Consultas Complexas** | Usuários de negócios precisam de conhecimento técnico para extrair insights | Adoção reduzida, processos ineficientes |

### A Solução MCP

O Model Context Protocol resolve esses desafios fornecendo:

- **Acesso a Dados em Tempo Real**: Assistentes de IA consultam bancos e APIs ao vivo  
- **Integração Segura**: Acesso controlado com autenticação e permissões  
- **Interface em Linguagem Natural**: Usuários de negócios fazem perguntas em inglês simples  
- **Protocolo Padronizado**: Funciona em diferentes plataformas e ferramentas de IA  

## 🏪 Conheça a Zava Retail: Nosso Estudo de Caso de Aprendizagem https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Ao longo deste caminho de aprendizado, construiremos um servidor MCP para a **Zava Retail**, uma rede fictícia de varejo DIY com múltiplas lojas. Este cenário realista demonstra a implementação MCP em nível corporativo.

### Contexto de Negócio

**Zava Retail** opera:  
- **8 lojas físicas** no estado de Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 loja online** para vendas de comércio eletrônico  
- **Catálogo diversificado** incluindo ferramentas, ferragens, suprimentos para jardim e materiais de construção  
- **Gestão em múltiplos níveis** com gerentes de loja, gerentes regionais e executivos  

### Requisitos de Negócio

Gerentes de loja e executivos precisam de análises habilitadas por IA para:

1. **Analisar desempenho de vendas** entre lojas e períodos  
2. **Rastrear níveis de estoque** e identificar necessidades de reposição  
3. **Compreender comportamento do cliente** e padrões de compra  
4. **Descobrir insights de produtos** por meio de busca semântica  
5. **Gerar relatórios** com consultas em linguagem natural  
6. **Manter segurança dos dados** com controle de acesso baseado em função  

### Requisitos Técnicos

O servidor MCP deve oferecer:

- **Acesso a dados multi-tenant**, onde gerentes veem apenas os dados da sua loja  
- **Consultas flexíveis** suportando operações SQL complexas  
- **Busca semântica** para descoberta de produtos e recomendações  
- **Dados em tempo real** refletindo o estado atual do negócio  
- **Autenticação segura** com segurança por linha (RLS)  
- **Arquitetura escalável** suportando múltiplos usuários simultâneos  

## 🏗️ Visão Geral da Arquitetura do Servidor MCP

Nosso servidor MCP implementa uma arquitetura em camadas otimizada para integração com banco de dados:

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

### Componentes-Chave

#### **1. Camada de Servidor MCP**
- **FastMCP Framework**: Implementação moderna do servidor MCP em Python  
- **Registro de Ferramentas**: Definições declarativas de ferramentas com segurança de tipos  
- **Contexto de Requisição**: Identidade do usuário e gerenciamento de sessão  
- **Tratamento de Erros**: Gerenciamento robusto de erros e registros  

#### **2. Camada de Integração com Banco de Dados**
- **Pool de Conexões**: Gerenciamento eficiente de conexões asyncpg  
- **Provedor de Esquema**: Descoberta dinâmica de esquema de tabelas  
- **Executor de Consultas**: Execução segura de SQL com contexto RLS  
- **Gerenciamento de Transações**: Conformidade ACID e manipulação de rollback  

#### **3. Camada de Segurança**
- **Row Level Security**: RLS do PostgreSQL para isolamento multi-tenant  
- **Identidade do Usuário**: Autenticação e autorização do gerente de loja  
- **Controle de Acesso**: Permissões granulares e trilhas de auditoria  
- **Validação de Entrada**: Prevenção de SQL injection e validação de consultas  

#### **4. Camada de Aprimoramento de IA**
- **Busca Semântica**: Embeddings vetoriais para descoberta de produtos  
- **Integração Azure OpenAI**: Geração de embeddings de texto  
- **Algoritmos de Similaridade**: Busca por similaridade cosseno com pgvector  
- **Otimização de Busca**: Indexação e tuning de performance  

## 🔧 Pilha Tecnológica

### Tecnologias Principais

| **Componente** | **Tecnologia** | **Finalidade** |
|---------------|----------------|-------------|
| **Framework MCP** | FastMCP (Python) | Implementação moderna de servidor MCP |
| **Banco de Dados** | PostgreSQL 17 + pgvector | Dados relacionais com busca vetorial |
| **Serviços de IA** | Azure OpenAI | Embeddings de texto e modelos de linguagem |
| **Containerização** | Docker + Docker Compose | Ambiente de desenvolvimento |
| **Plataforma Cloud** | Microsoft Azure | Implantação em produção |
| **Integração IDE** | VS Code | Chat IA e fluxo de desenvolvimento |

### Ferramentas de Desenvolvimento

| **Ferramenta** | **Finalidade** |
|----------|-------------|
| **asyncpg** | Driver PostgreSQL de alta performance |
| **Pydantic** | Validação e serialização de dados |
| **Azure SDK** | Integração com serviços cloud |
| **pytest** | Framework de testes |
| **Docker** | Containerização e implantação |

### Pilha de Produção

| **Serviço** | **Recurso Azure** | **Finalidade** |
|-------------|-------------------|-------------|
| **Banco de Dados** | Azure Database for PostgreSQL | Serviço gerenciado de banco de dados |
| **Container** | Azure Container Apps | Hospedagem serverless de container |
| **Serviços de IA** | Microsoft Foundry | Modelos e endpoints OpenAI |
| **Monitoramento** | Application Insights | Observabilidade e diagnóstico |
| **Segurança** | Azure Key Vault | Gerenciamento de segredos e configuração |

## 🎬 Cenários de Uso do Mundo Real

Vamos explorar como diferentes usuários interagem com nosso servidor MCP:

### Cenário 1: Revisão de Desempenho do Gerente de Loja

**Usuário**: Sarah, Gerente da Loja de Seattle  
**Objetivo**: Analisar desempenho de vendas do último trimestre

**Consulta em Linguagem Natural**:
> "Mostre-me os 10 principais produtos por receita da minha loja no 4º trimestre de 2024"

**O que Acontece**:
1. O chat de IA do VS Code envia consulta ao servidor MCP  
2. O servidor MCP identifica o contexto da loja da Sarah (Seattle)  
3. Políticas RLS filtram dados apenas da loja Seattle  
4. Consulta SQL é gerada e executada  
5. Resultados são formatados e retornados para o chat IA  
6. A IA fornece análises e insights  

### Cenário 2: Descoberta de Produto com Busca Semântica

**Usuário**: Mike, Gerente de Inventário  
**Objetivo**: Encontrar produtos similares a uma solicitação de cliente

**Consulta em Linguagem Natural**:
> "Quais produtos vendemos que são similares a 'conectores elétricos à prova d'água para uso externo'?"

**O que Acontece**:
1. Consulta processada pela ferramenta de busca semântica  
2. Azure OpenAI gera vetor de embedding  
3. pgvector realiza busca por similaridade  
4. Produtos relacionados são ranqueados por relevância  
5. Resultados incluem detalhes e disponibilidade dos produtos  
6. IA sugere alternativas e oportunidades de combinação  

### Cenário 3: Análise Cruzada entre Lojas

**Usuário**: Jennifer, Gerente Regional  
**Objetivo**: Comparar desempenho entre todas as lojas

**Consulta em Linguagem Natural**:
> "Compare vendas por categoria de todas as lojas nos últimos 6 meses"

**O que Acontece**:
1. Contexto RLS configurado para acesso regional do gerente  
2. Consulta complexa multi-lojas gerada  
3. Dados agregados entre as localizações das lojas  
4. Resultados incluem tendências e comparações  
5. IA identifica insights e recomendações  

## 🔒 Segurança e Multi-Tenancy Detalhado

Nossa implementação prioriza segurança corporativa de nível empresarial:

### Row Level Security (RLS)

O RLS do PostgreSQL assegura o isolamento de dados:

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

### Gestão de Identidade do Usuário

Cada conexão MCP inclui:  
- **ID do Gerente de Loja**: Identificador único para contexto RLS  
- **Atribuição de Função**: Permissões e níveis de acesso  
- **Gerenciamento de Sessão**: Tokens de autenticação seguros  
- **Registro de Auditoria**: Histórico completo de acessos  

### Proteção de Dados

Múltiplas camadas de segurança:  
- **Criptografia de Conexão**: TLS para todas as conexões com banco  
- **Prevenção de SQL Injection**: Apenas consultas parametrizadas  
- **Validação de Entrada**: Validação completa das requisições  
- **Tratamento de Erros**: Sem dados sensíveis em mensagens de erro  

## 🎯 Principais Conclusões

Após concluir esta introdução, você deverá entender:

✅ **Proposta de Valor MCP**: Como MCP conecta assistentes de IA a dados do mundo real  
✅ **Contexto de Negócio**: Requisitos e desafios da Zava Retail  
✅ **Visão Arquitetural**: Componentes-chave e suas interações  
✅ **Pilha Tecnológica**: Ferramentas e frameworks utilizados  
✅ **Modelo de Segurança**: Acesso multi-tenant e proteção de dados  
✅ **Padrões de Uso**: Cenários reais de consultas e fluxos de trabalho  

## 🚀 O Que Vem a Seguir

Pronto para se aprofundar? Continue com:

**[Lab 01: Conceitos Básicos de Arquitetura](../01-Architecture/README.md)**

Aprenda sobre padrões de arquitetura de servidores MCP, princípios de design de banco de dados e a implementação técnica detalhada que suporta nossa solução de análise varejista.

## 📚 Recursos Adicionais

### Documentação MCP
- [Especificação MCP](https://modelcontextprotocol.io/docs/) - Documentação oficial do protocolo  
- [MCP para Iniciantes](https://aka.ms/mcp-for-beginners) - Guia completo de aprendizado MCP  
- [Documentação FastMCP](https://github.com/modelcontextprotocol/python-sdk) - Documentação do SDK Python  

### Integração de Banco de Dados
- [Documentação PostgreSQL](https://www.postgresql.org/docs/) - Referência completa PostgreSQL  
- [Guia pgvector](https://github.com/pgvector/pgvector) - Documentação da extensão vetorial  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Guia PostgreSQL RLS  

### Serviços Azure
- [Documentação Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integração do serviço IA  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Banco gerenciado  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Contêineres serverless  

---

**Aviso Legal**: Este é um exercício de aprendizado usando dados fictícios do varejo. Sempre siga as políticas de governança e segurança de dados de sua organização ao implementar soluções semelhantes em ambientes de produção.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->