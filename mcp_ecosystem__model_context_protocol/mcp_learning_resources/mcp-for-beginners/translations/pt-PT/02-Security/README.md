# Segurança MCP: Proteção Abrangente para Sistemas de IA

[![MCP Security Best Practices](../../../translated_images/pt-PT/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Clique na imagem acima para ver o vídeo desta lição)_

A segurança é fundamental para o design de sistemas de IA, por isso a priorizamos como a nossa segunda secção. Isto está alinhado com o princípio **Secure by Design** da Microsoft, do [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

O Protocolo de Contexto de Modelo (MCP) traz capacidades poderosas para aplicações impulsionadas por IA, ao mesmo tempo que introduz desafios de segurança únicos que vão além dos riscos tradicionais de software. Os sistemas MCP enfrentam tanto preocupações já estabelecidas de segurança (código seguro, menor privilégio, segurança da cadeia de fornecimento) como novas ameaças específicas de IA, incluindo injeção de prompt, envenenamento de ferramentas, sequestro de sessão, ataques de procurador confuso, vulnerabilidades de passagem de token, e modificação dinâmica de capacidades.

Esta lição explora os riscos de segurança mais críticos nas implementações MCP—abrangendo autenticação, autorização, permissões excessivas, injeção indireta de prompt, segurança de sessão, problemas de procurador confuso, gestão de tokens, e vulnerabilidades na cadeia de fornecimento. Irá aprender controlos acionáveis e melhores práticas para mitigar estes riscos enquanto utiliza soluções Microsoft como Prompt Shields, Azure Content Safety e GitHub Advanced Security para fortalecer a sua implementação MCP.

## Objetivos de Aprendizagem

No final desta lição, será capaz de:

- **Identificar Ameaças Específicas MCP**: Reconhecer riscos de segurança únicos em sistemas MCP, incluindo injeção de prompt, envenenamento de ferramentas, permissões excessivas, sequestro de sessão, problemas de procurador confuso, vulnerabilidades de passagem de token, e riscos na cadeia de fornecimento
- **Aplicar Controlos de Segurança**: Implementar mitigação eficaz, incluindo autenticação robusta, acesso de menor privilégio, gestão segura de tokens, controlos de segurança de sessão, e verificação da cadeia de fornecimento
- **Aproveitar Soluções de Segurança Microsoft**: Compreender e implementar Microsoft Prompt Shields, Azure Content Safety, e GitHub Advanced Security para proteção de workloads MCP
- **Validar Segurança de Ferramentas**: Reconhecer a importância da validação de metadados das ferramentas, monitorizar alterações dinâmicas, e defender contra ataques indiretos de injeção de prompt
- **Integrar Melhores Práticas**: Combinar fundamentos estabelecidos de segurança (código seguro, endurecimento de servidores, zero trust) com controlos MCP específicos para proteção abrangente

# Arquitetura & Controlos de Segurança MCP

Implementações modernas do MCP requerem abordagens de segurança em camadas que abordem tanto a segurança tradicional de software como as ameaças específicas de IA. A especificação MCP em rápida evolução continua a amadurecer seus controlos de segurança, permitindo uma melhor integração com arquiteturas de segurança empresariais e melhores práticas estabelecidas.

Pesquisas do [Microsoft Digital Defense Report](https://aka.ms/mddr) demonstram que **98% das violações reportadas seriam prevenidas por uma higiene de segurança robusta**. A estratégia de proteção mais eficaz combina práticas fundamentais de segurança com controlos MCP específicos—medidas comprovadas da linha base de segurança permanecem as mais impactantes na redução do risco global de segurança.

## Panorama Atual de Segurança

> **Nota:** Esta informação reflete os padrões de segurança MCP em **5 de fevereiro de 2026**, alinhada com a **Especificação MCP 2025-11-25**. O protocolo MCP continua a evoluir rapidamente, e futuras implementações podem introduzir novos padrões de autenticação e controlos aprimorados. Consulte sempre a atual [Especificação MCP](https://spec.modelcontextprotocol.io/), o [repositório MCP no GitHub](https://github.com/modelcontextprotocol), e a [documentação de melhores práticas de segurança](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) para orientações mais recentes.

> **Para o futuro:** a release candidate `2026-07-28` reforça ainda mais a autorização — os clientes devem validar o parâmetro `iss` nas respostas de autorização (RFC 9207), declarar um `application_type` OpenID Connect durante o Registo Dinâmico de Cliente, e vincular as credenciais registadas ao servidor de autorização emissor. Veja [O que muda no MCP: Release Candidate 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para a lista completa de SEPs de autorização.

## 🏔️ Workshop MCP Security Summit (Sherpa)

Para **formação prática em segurança**, recomendamos fortemente o **Workshop MCP Security Summit** (Sherpa) - uma expedição guiada abrangente para assegurar servidores MCP no Microsoft Azure.

### Visão Geral do Workshop

O [Workshop MCP Security Summit](https://azure-samples.github.io/sherpa/) proporciona formação prática e acionável em segurança através da metodologia comprovada "vulnerável → explorar → corrigir → validar". Você irá:

- **Aprender a Quebrar Coisas**: Experimentar vulnerabilidades em primeira mão ao explorar servidores intencionalmente inseguros
- **Usar Segurança Nativa Azure**: Aproveitar Azure Entra ID, Key Vault, API Management e AI Content Safety
- **Seguir Defesa em Profundidade**: Progredir por acampamentos construindo camadas abrangentes de segurança
- **Aplicar Padrões OWASP**: Cada técnica corresponde ao [Guia de Segurança MCP Azure da OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obter Código de Produção**: Sair com implementações funcionando e testadas

### A Rota da Expedição

| Acampamento | Foco | Riscos OWASP Cobertos |
|------|-------|---------------------|
| **Base Camp** | Fundamentos MCP & vulnerabilidades de autenticação | MCP01, MCP07 |
| **Camp 1: Identidade** | OAuth 2.1, Identidade Gerida Azure, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Endpoints Privados, governança | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3: Segurança I/O** | Injeção de prompt, proteção PII, segurança de conteúdo | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4: Monitorização** | Log Analytics, dashboards, deteção de ameaças | MCP04, MCP08 |
| **O Cume** | Teste de integração Red Team / Blue Team | Todos |

**Começar**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 Riscos de Segurança MCP OWASP

O [Guia de Segurança MCP Azure da OWASP](https://microsoft.github.io/mcp-azure-security-guide/) detalha os dez riscos de segurança mais críticos para implementações MCP:

| Risco | Descrição | Mitigação Azure |
|------|-------------|------------------|
| **MCP01** | Má Gestão de Tokens & Exposição de Segredos | Azure Key Vault, Identidade Gerida |
| **MCP02** | Escalada de Privilégios via Extensão de Escopo | RBAC, Acesso Condicional |
| **MCP03** | Envenenamento de Ferramentas | Validação de ferramentas, verificação de integridade |
| **MCP04** | Ataques à Cadeia de Fornecimento de Software & Manipulação de Dependências | GitHub Advanced Security, análise de dependências |
| **MCP05** | Injeção e Execução de Comandos | Validação de entrada, sandboxing |
| **MCP06** | Subversão do Fluxo de Intenção | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autenticação & Autorização Insuficientes | Azure Entra ID, OAuth 2.1 com PKCE |
| **MCP08** | Falta de Auditoria e Telemetria | Azure Monitor, Application Insights |
| **MCP09** | Servidores MCP Sombra | Governança API Center, isolamento de rede |
| **MCP10** | Injeção de Contexto & Exposição Excessiva | Classificação de dados, exposição mínima |

### Evolução da Autenticação MCP

A especificação MCP evoluiu significativamente na sua abordagem à autenticação e autorização:

- **Abordagem Original**: Especificações iniciais exigiam que desenvolvedores implementassem servidores de autenticação personalizados, com servidores MCP atuando como servidores OAuth 2.0 de Autorização, gerindo autenticação do usuário diretamente
- **Padrão Atual (2025-11-25)**: A especificação atualizada permite que servidores MCP deleguem autenticação a provedores externos de identidade (como Microsoft Entra ID), melhorando postura de segurança e reduzindo complexidade da implementação
- **Segurança da Camada de Transporte**: Suporte aprimorado a mecanismos de transporte seguro com padrões de autenticação adequados para conexões locais (STDIO) e remotas (HTTP transmissão contínua)

## Segurança de Autenticação & Autorização

### Desafios de Segurança Atuais

As implementações modernas MCP enfrentam vários desafios de autenticação e autorização:

### Riscos & Vetores de Ameaça

- **Lógica de Autorização Mal Configurada**: Implementação incorreta de autorização em servidores MCP pode expor dados sensíveis e aplicar controlos de acesso de forma errada
- **Comprometimento de Token OAuth**: Roubo de tokens no servidor MCP local permite que atacantes se façam passar por servidores e acedam serviços a jusante
- **Vulnerabilidades de Passagem de Token**: Manuseio impróprio de tokens cria bypasses dos controlos de segurança e falhas de responsabilidade
- **Permissões Excessivas**: Servidores MCP com privilégios exagerados violam princípios de menor privilégio e ampliam superfícies de ataque

#### Passagem de Token: Um Anti-Padrão Crítico

**A passagem de token é explicitamente proibida** na especificação atual de autorização MCP devido às severas implicações de segurança:

##### Circumvenção de Controlos de Segurança
- Servidores MCP e APIs a jusante implementam controlos críticos de segurança (limitação de taxa, validação de pedido, monitorização de tráfego) que dependem da validação correta do token
- Uso direto de token cliente-para-API ignora estas proteções essenciais, minando a arquitetura de segurança

##### Desafios de Responsabilidade & Auditoria  
- Servidores MCP não conseguem distinguir entre clientes a usar tokens emitidos a montante, quebrando trilhas de auditoria
- Logs do servidor de recurso a jusante mostram origens de pedido enganosas, ao invés dos intermediários reais do servidor MCP
- Investigação de incidentes e auditoria de conformidade tornam-se significativamente mais difíceis

##### Riscos de Exfiltração de Dados
- Alegações não validadas de tokens permitem a atores maliciosos com tokens roubados usarem servidores MCP como proxies para exfiltração de dados
- Violações de limites de confiança permitem padrões de acesso não autorizados que ignoram controlos de segurança pretendidos

##### Vetores de Ataque Multi-Serviço
- Tokens comprometidos aceites por múltiplos serviços permitem movimentação lateral entre sistemas ligados
- Assunções de confiança entre serviços podem ser violadas quando origens de token não podem ser verificadas

### Controlos & Mitigações de Segurança

**Requisitos Críticos de Segurança:**

> **OBRIGATÓRIO**: servidores MCP **NÃO DEVEM** aceitar quaisquer tokens que não tenham sido explicitamente emitidos para o servidor MCP

#### Controlos de Autenticação & Autorização

- **Revisão Rigorosa de Autorização**: Realizar auditorias abrangentes da lógica de autorização do servidor MCP para garantir que apenas usuários e clientes pretendidos tenham acesso a recursos sensíveis
  - **Guia de Implementação**: [Azure API Management como Gateway de Autenticação para Servidores MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integração de Identidade**: [Usando Microsoft Entra ID para Autenticação de Servidor MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestão Segura de Tokens**: Implementar [melhores práticas Microsoft para validação e ciclo de vida de tokens](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validar que as alegações de audiência do token correspondem à identidade do servidor MCP
  - Implementar políticas apropriadas de rotação e expiração do token
  - Prevenir ataques de repetição de token e uso não autorizado

- **Armazenamento Protegido de Tokens**: Armazenamento seguro de tokens com encriptação em repouso e em trânsito
  - **Melhores Práticas**: [Diretrizes para Armazenamento Seguro e Encriptação de Tokens](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementação de Controlo de Acesso

- **Princípio do Menor Privilégio**: Conceder aos servidores MCP apenas as permissões mínimas necessárias para a funcionalidade pretendida
  - Revisões e atualizações regulares de permissões para prevenir extensão de privilégios
  - **Documentação Microsoft**: [Acesso Seguro de Menor Privilégio](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Controle de Acesso Baseado em Funções (RBAC)**: Implementar atribuições de função detalhadas
  - Definir escopos de funções estritamente para recursos e ações específicos
  - Evitar permissões amplas ou desnecessárias que aumentem superfícies de ataque

- **Monitorização Contínua de Permissões**: Implementar auditorias e monitorização de acessos contínuos
  - Monitorizar padrões de uso de permissões para detectar anomalias
  - Remediar prontamente privilégios excessivos ou não usados

## Ameaças de Segurança Específicas de IA

### Ataques de Injeção de Prompt & Manipulação de Ferramentas

Implementações modernas MCP enfrentam vetores de ataque específicos sofisticados de IA que as medidas tradicionais de segurança não conseguem abordar completamente:

#### **Injeção Indireta de Prompt (Injeção de Prompt Cross-Domain)**

A **Injeção Indireta de Prompt** representa uma das vulnerabilidades mais críticas em sistemas IA habilitados para MCP. Os atacantes inserem instruções maliciosas dentro de conteúdos externos — documentos, páginas web, emails, ou fontes de dados — que os sistemas IA posteriormente processam como comandos legítimos.

**Cenários de Ataque:**
- **Injeção Baseada em Documentos**: Instruções maliciosas escondidas em documentos processados que acionam ações não intencionadas da IA
- **Exploração de Conteúdo Web**: Páginas web comprometidas contendo prompts embutidos que manipulam o comportamento IA quando raspados
- **Ataques Baseados em Email**: Prompts maliciosos em emails que fazem assistentes IA vazarem informação ou executarem ações não autorizadas
- **Contaminação de Fontes de Dados**: Bases de dados ou APIs comprometidas que fornecem conteúdos contaminados aos sistemas IA

**Impacto no Mundo Real**: Estes ataques podem resultar em exfiltração de dados, violações de privacidade, geração de conteúdo prejudicial, e manipulação das interações do utilizador. Para análise detalhada, veja [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/pt-PT/prompt-injection.ed9fbfde297ca877.webp)

#### **Ataques de Envenenamento de Ferramentas**

O **Envenenamento de Ferramentas** almeja os metadados que definem as ferramentas MCP, explorando como LLMs interpretam as descrições e parâmetros das ferramentas para tomar decisões de execução.

**Mecanismos de Ataque:**
- **Manipulação de Metadados**: Atacantes injetam instruções maliciosas nas descrições de ferramentas, definições de parâmetros, ou exemplos de uso
- **Instruções Invisíveis**: Prompts ocultos nos metadados das ferramentas que são processados por modelos IA mas invisíveis para utilizadores humanos
- **Modificação Dinâmica de Ferramentas ("Rug Pulls")**: Ferramentas aprovadas pelos utilizadores são depois modificadas para realizar ações maliciosas sem o conhecimento do utilizador
- **Injeção de Parâmetros**: Conteúdo malicioso embutido nos esquemas de parâmetros das ferramentas que influenciam o comportamento do modelo


**Riscos dos Servidores Hospedados**: Os servidores MCP remotos apresentam riscos elevados, pois as definições das ferramentas podem ser atualizadas após a aprovação inicial do utilizador, criando cenários onde ferramentas anteriormente seguras se tornam maliciosas. Para uma análise abrangente, consulte [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagrama de Ataque por Injeção de Ferramenta](../../../translated_images/pt-PT/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vetores Adicionais de Ataque de IA**

- **Injeção Cross-Domain Prompt (XPIA)**: Ataques sofisticados que utilizam conteúdo de múltiplos domínios para contornar controlos de segurança
- **Modificação Dinâmica de Capacidades**: Alterações em tempo real às capacidades da ferramenta que escapam às avaliações de segurança iniciais
- **Envenenamento da Janela de Contexto**: Ataques que manipulam grandes janelas de contexto para ocultar instruções maliciosas
- **Ataques de Confusão de Modelo**: Exploração das limitações dos modelos para criar comportamentos imprevisíveis ou inseguros


### Impacto do Risco de Segurança em IA

**Consequências de Alto Impacto:**
- **Exfiltração de Dados**: Acesso não autorizado e roubo de dados sensíveis empresariais ou pessoais
- **Quebra de Privacidade**: Exposição de informações pessoalmente identificáveis (PII) e dados confidenciais empresariais  
- **Manipulação do Sistema**: Modificações não intencionais em sistemas e fluxos de trabalho críticos
- **Roubo de Credenciais**: Comprometimento de tokens de autenticação e credenciais de serviço
- **Movimento Lateral**: Uso de sistemas IA comprometidos como pivôs para ataques mais amplos na rede

### Soluções de Segurança de IA da Microsoft

#### **Escudos de Prompt de IA: Proteção Avançada Contra Ataques de Injeção**

Os **Escudos de Prompt de IA** da Microsoft fornecem defesa abrangente contra ataques de injeção de prompt diretos e indiretos através de múltiplas camadas de segurança:

##### **Mecanismos Centrais de Proteção:**

1. **Deteção Avançada & Filtragem**
   - Algoritmos de aprendizagem automática e técnicas de PLN detectam instruções maliciosas em conteúdos externos
   - Análise em tempo real de documentos, páginas web, emails e fontes de dados para ameaças embutidas
   - Compreensão contextual dos padrões legítimos versus maliciosos de prompt

2. **Técnicas de Realce**  
   - Distingue entre instruções do sistema confiáveis e entradas externas potencialmente comprometidas
   - Métodos de transformação de texto que melhoram a relevância do modelo enquanto isolam conteúdos maliciosos
   - Ajuda os sistemas de IA a manter a hierarquia correta das instruções e ignorar comandos injetados

3. **Sistemas de Delimitação & Marcação de Dados**
   - Definição explícita de limites entre mensagens do sistema confiáveis e texto de entrada externo
   - Marcadores especiais destacam os limites entre fontes de dados confiáveis e não confiáveis
   - Separação clara previne confusão de instruções e execução não autorizada de comandos

4. **Inteligência de Ameaças Contínua**
   - A Microsoft monitora continuamente padrões emergentes de ataque e atualiza as defesas
   - Caça proativa a ameaças para novas técnicas e vetores de injeção
   - Atualizações regulares dos modelos de segurança para manter a eficácia contra ameaças em evolução

5. **Integração com Azure Content Safety**
   - Parte da suíte abrangente Azure AI Content Safety
   - Deteção adicional para tentativas de jailbreak, conteúdos prejudiciais e violações de políticas de segurança
   - Controlos de segurança unificados através dos componentes da aplicação IA

**Recursos de Implementação**: [Documentação Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Proteção Microsoft Prompt Shields](../../../translated_images/pt-PT/prompt-shield.ff5b95be76e9c78c.webp)


## Ameaças Avançadas de Segurança MCP

### Vulnerabilidades de Sequestro de Sessão

O **sequestro de sessão** representa um vetor de ataque crítico em implementações de MCP com estado, onde partes não autorizadas obtêm e abusam de identificadores de sessão legítimos para se passarem por clientes e realizar ações não autorizadas.

#### **Cenários de Ataque & Riscos**

- **Injeção de Prompt via Sequestro de Sessão**: Atacantes com IDs de sessão roubados injetam eventos maliciosos em servidores que partilham estado de sessão, potencialmente desencadeando ações nocivas ou acedendo a dados sensíveis
- **Impersonação Direta**: IDs de sessão roubados permitem chamadas diretas ao servidor MCP que contornam a autenticação, tratando os atacantes como utilizadores legítimos
- **Fluxos Resumíveis Comprometidos**: Atacantes podem terminar pedidos prematuramente, fazendo com que clientes legítimos retomem com conteúdos potencialmente maliciosos

#### **Controlos de Segurança para Gestão de Sessão**

**Requisitos Críticos:**
- **Verificação de Autorização**: Servidores MCP que implementam autorização **DEVEM** verificar TODOS os pedidos recebidos e **NÃO DEVEM** confiar em sessões para autenticação
- **Geração Segura de Sessão**: Uso de IDs de sessão criptograficamente seguros e não determinísticos gerados com geradores de números aleatórios seguros
- **Vinculação Específica ao Utilizador**: Associar IDs de sessão a informações específicas do utilizador usando formatos como `<user_id>:<session_id>` para prevenir abuso entre utilizadores
- **Gestão do Ciclo de Vida da Sessão**: Implementar expiração adequada, rotação e invalidação para limitar janelas de vulnerabilidade
- **Segurança de Transporte**: HTTPS obrigatório para toda a comunicação para evitar interceção de IDs de sessão

### Problema do Procurador Confuso

O **problema do procurador confuso** ocorre quando servidores MCP atuam como proxies de autenticação entre clientes e serviços terceiros, criando oportunidades para bypass de autorização através da exploração de IDs estáticos de cliente.

#### **Mecânica do Ataque & Riscos**

- **Bypass de Consentimento Baseado em Cookies**: A autenticação prévia do utilizador cria cookies de consentimento que atacantes exploram através de pedidos de autorização maliciosos com URIs de redirecionamento manipulados
- **Roubo de Código de Autorização**: Cookies de consentimento existentes podem fazer com que servidores de autorização ignorem telas de consentimento, redirecionando códigos para endpoints controlados pelo atacante  
- **Acesso Não Autorizado à API**: Códigos de autorização roubados permitem troca de tokens e impersonação do utilizador sem aprovação explícita

#### **Estratégias de Mitigação**

**Controlos Obrigatórios:**
- **Requisitos Explícitos de Consentimento**: Servidores proxy MCP usando IDs estáticos de cliente **DEVEM** obter consentimento do utilizador para cada cliente registado dinamicamente
- **Implementação de Segurança OAuth 2.1**: Seguir as melhores práticas de segurança atuais do OAuth incluindo PKCE (Proof Key for Code Exchange) para todos os pedidos de autorização
- **Validação Rigorosa do Cliente**: Implementar validação rigorosa dos URIs de redirecionamento e identificadores de cliente para prevenir exploração

### Vulnerabilidades de Encaminhamento de Token  

O **encaminhamento de token** representa um anti-padrão explícito onde servidores MCP aceitam tokens dos clientes sem validação adequada e os encaminham para APIs downstream, violando as especificações de autorização MCP.

#### **Implicações de Segurança**

- **Circunvenção de Controlos**: Uso direto de tokens do cliente para a API contorna controlos críticos de limitação de taxa, validação e monitorização
- **Corrupção da Trilha de Auditoria**: Tokens emitidos a montante tornam impossível a identificação do cliente, quebrando a capacidade de investigação de incidentes
- **Exfiltração de Dados via Proxy**: Tokens não validados permitem a atores maliciosos usar servidores como proxies para acesso de dados não autorizado
- **Violações da Fronteira de Confiança**: As suposições de confiança dos serviços a jusante podem ser violadas quando a origem dos tokens não pode ser verificada
- **Expansão de Ataques Multi-serviço**: Tokens comprometidos aceites em múltiplos serviços permitem movimento lateral

#### **Controlos de Segurança Requeridos**

**Requisitos Inegociáveis:**
- **Validação de Token**: Servidores MCP **NÃO DEVEM** aceitar tokens não explicitamente emitidos para o servidor MCP
- **Verificação da Audiência**: Validar sempre as declarações de audiência do token para coincidir com a identidade do servidor MCP
- **Ciclo de Vida Adequado do Token**: Implementar tokens de acesso de curta duração com práticas seguras de rotação


## Segurança da Cadeia de Fornecimento para Sistemas de IA

A segurança da cadeia de fornecimento evoluiu além das dependências tradicionais de software para abranger todo o ecossistema de IA. Implementações modernas de MCP devem verificar e monitorizar rigorosamente todos os componentes relacionados com IA, pois cada um introduz vulnerabilidades potenciais que podem comprometer a integridade do sistema.

### Componentes Ampliados da Cadeia de Fornecimento de IA

**Dependências Tradicionais de Software:**
- Bibliotecas e frameworks open-source
- Imagens de containers e sistemas base  
- Ferramentas de desenvolvimento e pipelines de construção
- Componentes e serviços de infraestrutura

**Elementos Específicos da Cadeia de Fornecimento de IA:**
- **Modelos Fundacionais**: Modelos pré-treinados de vários fornecedores que requerem verificação de proveniência
- **Serviços de Embeddings**: Serviços externos de vetorização e pesquisa semântica
- **Provedores de Contexto**: Fontes de dados, bases de conhecimento e repositórios de documentos  
- **APIs de Terceiros**: Serviços externos de IA, pipelines de ML e endpoints de processamento de dados
- **Artefactos do Modelo**: Pesos, configurações e variantes de modelos ajustados
- **Fontes de Dados de Treino**: Conjuntos de dados usados para treino e ajuste fino do modelo

### Estratégia Abrangente de Segurança da Cadeia de Fornecimento

#### **Verificação & Confiança dos Componentes**
- **Validação de Proveniência**: Verificar a origem, licenciamento e integridade de todos os componentes de IA antes da integração
- **Avaliação de Segurança**: Realizar scans de vulnerabilidade e revisões de segurança para modelos, fontes de dados e serviços de IA
- **Análise de Reputação**: Avaliar o histórico de segurança e as práticas dos fornecedores de serviços de IA
- **Verificação de Conformidade**: Garantir que todos os componentes cumprem requisitos organizacionais de segurança e regulatórios

#### **Pipelines Seguros de Deployment**  
- **Segurança Automatizada CI/CD**: Integrar scans de segurança ao longo dos pipelines automatizados de deployment
- **Integridade dos Artefactos**: Implementar verificação criptográfica para todos os artefactos implantados (código, modelos, configurações)
- **Deployment em Fases**: Usar estratégias progressivas de deployment com validação de segurança em cada etapa
- **Repositórios de Artefactos Confiáveis**: Desdobrar somente a partir de registos e repositórios de artefactos verificados e seguros

#### **Monitorização & Resposta Contínuas**
- **Scan de Dependências**: Monitorização contínua de vulnerabilidades para todas as dependências de software e componentes de IA
- **Monitorização de Modelos**: Avaliação contínua do comportamento do modelo, derivação de performance e anomalias de segurança
- **Monitorização da Saúde do Serviço**: Monitorizar serviços externos de IA para disponibilidade, incidentes de segurança e alterações de políticas
- **Integração de Inteligência de Ameaças**: Incorporar feeds de ameaças específicas para riscos de segurança de IA e ML

#### **Controlo de Acesso & Privilégio Mínimo**
- **Permissões ao Nível do Componente**: Restringir acesso a modelos, dados e serviços com base na necessidade do negócio
- **Gestão de Contas de Serviço**: Implementar contas de serviço dedicadas com permissões mínimas necessárias
- **Segmentação de Rede**: Isolar componentes de IA e limitar o acesso de rede entre serviços
- **Controlos de Gateways de API**: Usar gateways de API centralizados para controlar e monitorizar o acesso a serviços externos de IA

#### **Resposta a Incidentes & Recuperação**
- **Procedimentos de Resposta Rápida**: Processos estabelecidos para patching ou substituição de componentes de IA comprometidos
- **Rotação de Credenciais**: Sistemas automatizados para a rotação de segredos, chaves API e credenciais de serviço
- **Capacidades de Reversão**: Capacidade de reverter rapidamente para versões anteriores conhecidas e estáveis dos componentes de IA
- **Recuperação de Brechas na Cadeia de Fornecimento**: Procedimentos específicos para responder a comprometimentos ascendentes de serviços de IA

### Ferramentas & Integração de Segurança da Microsoft

**GitHub Advanced Security** oferece proteção abrangente da cadeia de fornecimento incluindo:
- **Escaneamento de Segredos**: Detecção automatizada de credenciais, chaves API e tokens em repositórios
- **Escaneamento de Dependências**: Avaliação de vulnerabilidades para dependências e bibliotecas open-source
- **Análise CodeQL**: Análise estática de código para vulnerabilidades de segurança e problemas de codificação
- **Insights da Cadeia de Fornecimento**: Visibilidade sobre a saúde e estado de segurança das dependências

**Integração Azure DevOps & Azure Repos:**
- Integração fluida de scans de segurança através das plataformas de desenvolvimento Microsoft
- Verificações automatizadas de segurança em Azure Pipelines para cargas de trabalho IA
- Aplicação de políticas para deployment seguro de componentes IA

**Práticas Internas Microsoft:**
A Microsoft implementa práticas extensas de segurança da cadeia de fornecimento em todos os produtos. Saiba mais sobre abordagens comprovadas em [A Jornada para Segurar a Cadeia de Fornecimento de Software na Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Melhores Práticas de Segurança Fundamental

As implementações MCP herdam e constroem sobre a postura de segurança existente da sua organização. Reforçar práticas fundamentais de segurança melhora significativamente a segurança geral dos sistemas de IA e deploys MCP.

### Fundamentos Centrais de Segurança

#### **Práticas Seguras de Desenvolvimento**
- **Conformidade OWASP**: Proteja contra as vulnerabilidades da [OWASP Top 10](https://owasp.org/www-project-top-ten/) em aplicações web
- **Proteções Específicas para IA**: Implemente controlos para o [OWASP Top 10 para LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Gestão Segura de Segredos**: Utilize cofres dedicados para tokens, chaves API e dados de configuração sensíveis
- **Criptografia de Ponta a Ponta**: Implemente comunicações seguras em todos os componentes da aplicação e fluxos de dados
- **Validação de Entrada**: Validação rigorosa de todas as entradas de utilizador, parâmetros de API e fontes de dados

#### **Endurecimento da Infraestrutura**
- **Autenticação Multi-Fator**: MFA obrigatória para todas as contas administrativas e de serviço
- **Gestão de Patches**: Aplicação automatizada e atempada de patches para sistemas operativos, frameworks e dependências  
- **Integração de Provedor de Identidade**: Gestão centralizada de identidades através de provedores empresariais (Microsoft Entra ID, Active Directory)
- **Segmentação de Rede**: Isolamento lógico dos componentes MCP para limitar o potencial de movimento lateral
- **Princípio do Mínimo Privilégio**: Permissões mínimas necessárias para todos os componentes e contas do sistema

#### **Monitorização & Deteção de Segurança**
- **Registos Abrangentes**: Registo detalhado das atividades da aplicação IA, incluindo interações cliente-servidor MCP
- **Integração SIEM**: Gestão centralizada de informação e eventos de segurança para deteção de anomalias
- **Análise Comportamental**: Monitorização potenciada por IA para detectar padrões invulgares em sistemas e comportamentos de utilizador
- **Inteligência de Ameaças**: Integração de feeds de ameaças externas e indicadores de compromisso (IOCs)
- **Resposta a Incidentes**: Procedimentos bem definidos para deteção, resposta e recuperação de incidentes de segurança

#### **Arquitetura Zero Trust**
- **Nunca Confiar, Sempre Verificar**: Verificação contínua de utilizadores, dispositivos e conexões de rede
- **Microsegmentação**: Controlos granulares de rede que isolam cargas de trabalho e serviços individuais
- **Segurança Centrada em Identidade**: Políticas de segurança baseadas em identidades verificadas em vez de localização de rede
- **Avaliação Contínua de Risco**: Avaliação dinâmica da postura de segurança baseada no contexto e comportamento atuais
- **Acesso Condicional**: Controlos de acesso que se adaptam com base em fatores de risco, localização e confiança do dispositivo

### Padrões de Integração Empresarial

#### **Integração no Ecossistema de Segurança Microsoft**
- **Microsoft Defender for Cloud**: Gestão completa da postura de segurança cloud
- **Azure Sentinel**: Capacidades nativas cloud de SIEM e SOAR para proteção de cargas de trabalho IA
- **Microsoft Entra ID**: Gestão empresarial de identidade e acesso com políticas de acesso condicional
- **Azure Key Vault**: Gestão centralizada de segredos com suporte a módulos de segurança hardware (HSM)
- **Microsoft Purview**: Governança e conformidade de dados para fontes de dados e fluxos de trabalho IA

#### **Conformidade & Governança**
- **Alinhamento Regulatório**: Garantir que implementações MCP cumprem requisitos de conformidade específicos do setor (GDPR, HIPAA, SOC 2)

- **Classificação de Dados**: Categorização e tratamento adequados de dados sensíveis processados por sistemas de IA
- **Rastros de Auditoria**: Registo abrangente para conformidade regulatória e investigação forense
- **Controlo de Privacidade**: Implementação dos princípios de privacidade por design na arquitetura do sistema de IA
- **Gestão de Alterações**: Processos formais para revisões de segurança das modificações do sistema de IA

Estas práticas fundamentais criam uma base de segurança robusta que reforça a eficácia dos controlos de segurança específicos do MCP e fornece proteção abrangente para aplicações impulsionadas por IA.

## Principais Conclusões de Segurança

- **Abordagem de Segurança em Camadas**: Combinar práticas fundamentais de segurança (codificação segura, privilégio mínimo, verificação da cadeia de fornecimento, monitorização contínua) com controlos específicos de IA para proteção abrangente

- **Paisagem de Ameaças Específicas à IA**: Os sistemas MCP enfrentam riscos únicos, incluindo injeção de comandos, envenenamento de ferramentas, sequestro de sessão, problemas de procurador confundido, vulnerabilidades de passagem de tokens e permissões excessivas que requerem mitigações especializadas

- **Excelência em Autenticação & Autorização**: Implementar autenticação robusta usando fornecedores de identidade externos (Microsoft Entra ID), aplicar validação correta de tokens e nunca aceitar tokens não emitidos explicitamente para o seu servidor MCP

- **Prevenção de Ataques à IA**: Implementar Microsoft Prompt Shields e Azure Content Safety para defender contra ataques indiretos de injeção de comandos e envenenamento de ferramentas, enquanto valida metadados da ferramenta e monitoriza mudanças dinâmicas

- **Segurança de Sessão & Transporte**: Usar IDs de sessão criptograficamente seguros, não determinísticos e vinculados às identidades dos utilizadores, implementar gestão apropriada do ciclo de vida da sessão e nunca usar sessões para autenticação

- **Melhores Práticas de Segurança OAuth**: Prevenir ataques de procurador confundido através de consentimento explícito do utilizador para clientes dinamicamente registados, implementação adequada do OAuth 2.1 com PKCE e validação rigorosa do URI de redirecionamento  

- **Princípios de Segurança de Tokens**: Evitar anti-padrões de passagem de tokens, validar declarações do público dos tokens, implementar tokens de curta duração com rotação segura e manter limites de confiança claros

- **Segurança Abrangente da Cadeia de Fornecimento**: Tratar todos os componentes do ecossistema IA (modelos, embeddings, fornecedores de contexto, APIs externas) com o mesmo rigor de segurança que dependências tradicionais de software

- **Evolução Contínua**: Manter-se atualizado com especificações MCP em rápida evolução, contribuir para padrões da comunidade de segurança e manter posturas de segurança adaptativas à medida que o protocolo amadurece

- **Integração de Segurança Microsoft**: Aproveitar o ecossistema abrangente de segurança da Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) para reforçar a proteção da implementação MCP

## Recursos Abrangentes

### **Documentação Oficial de Segurança MCP**
- [Especificação MCP (Atual: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificação de Autorização MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositório GitHub MCP](https://github.com/modelcontextprotocol)

### **Recursos de Segurança MCP da OWASP**
- [Guia de Segurança Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 MCP OWASP abrangente com orientação para implementação no Azure
- [Top 10 MCP OWASP](https://owasp.org/www-project-mcp-top-10/) - Riscos oficiais de segurança MCP da OWASP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formação prática de segurança para MCP no Azure

### **Normas & Melhores Práticas de Segurança**
- [Melhores Práticas de Segurança OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Top 10 OWASP Segurança em Aplicações Web](https://owasp.org/www-project-top-ten/)
- [Top 10 OWASP para Modelos de Linguagem Grande](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Relatório de Defesa Digital Microsoft](https://aka.ms/mddr)

### **Investigação & Análise em Segurança de IA**
- [Injeção de Comandos em MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Ataques de Envenenamento de Ferramentas (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Resumo de Investigação de Segurança MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluções de Segurança Microsoft**
- [Documentação Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Serviço Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Segurança Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Melhores Práticas de Gestão de Tokens Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guias de Implementação & Tutoriais**
- [Gestão de API Azure como Gateway de Autenticação MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autenticação Microsoft Entra ID com Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Armazenamento Seguro de Tokens e Criptografia (Vídeo)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Segurança da Cadeia de Fornecimento**
- [Segurança Azure DevOps](https://azure.microsoft.com/products/devops)
- [Segurança Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Jornada de Segurança da Cadeia de Fornecimento Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentação Adicional de Segurança**

Para orientação abrangente de segurança, consulte estes documentos especializados nesta secção:

- **[Melhores Práticas de Segurança MCP 2025](./mcp-security-best-practices-2025.md)** - Melhores práticas completas de segurança para implementações MCP
- **[Implementação Azure Content Safety](./azure-content-safety-implementation.md)** - Exemplos práticos de implementação para integração Azure Content Safety  
- **[Controlos de Segurança MCP 2025](./mcp-security-controls-2025.md)** - Controlos e técnicas de segurança mais recentes para implementações MCP
- **[Referência Rápida às Melhores Práticas MCP](./mcp-best-practices.md)** - Guia rápido de referência para práticas essenciais de segurança MCP
- **[BlueHat 2026: Garantindo o futuro da IA: Protegendo o MCP com padrões de defesa em profundidade](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Padrões de defesa em profundidade do Microsoft Security Response Center (MSRC)

### **Formação Prática em Segurança**

- **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop prático abrangente para proteger servidores MCP no Azure com acampamentos progressivos de Base Camp a Summit
- **[Guia de Segurança Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Arquitetura de referência e orientação de implementação para todos os riscos OWASP MCP Top 10

---

## O Que Vem a Seguir

Seguinte: [Capítulo 3: Introdução](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->