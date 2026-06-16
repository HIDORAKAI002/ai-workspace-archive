# MCP Security: Proteção Abrangente para Sistemas de IA

[![MCP Security Best Practices](../../../translated_images/pt-PT/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Clique na imagem acima para ver o vídeo desta aula)_

A segurança é fundamental no design de sistemas de IA, por isso a priorizamos como nossa segunda secção. Isto está alinhado com o princípio **Secure by Design** da Microsoft, do [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

O Model Context Protocol (MCP) traz capacidades poderosas para aplicações impulsionadas por IA, ao mesmo tempo que introduz desafios de segurança únicos que vão além dos riscos tradicionais de software. Os sistemas MCP enfrentam tanto preocupações estabelecidas de segurança (programação segura, mínimo privilégio, segurança da cadeia de fornecimento) como novas ameaças específicas de IA, incluindo injeção de prompt, envenenamento de ferramentas, sequestro de sessão, ataques de secretário confuso, vulnerabilidades de token passthrough, e modificação dinâmica de capacidades.

Esta lição explora os riscos de segurança mais críticos em implementações MCP—cobrindo autenticação, autorização, permissões excessivas, injeção indireta de prompt, segurança de sessão, problemas de secretário confuso, gestão de tokens, e vulnerabilidades na cadeia de fornecimento. Vai aprender controlos e melhores práticas acionáveis para mitigar estes riscos, aproveitando soluções Microsoft como Prompt Shields, Azure Content Safety, e GitHub Advanced Security para fortalecer a sua implementação MCP.

## Objetivos de Aprendizagem

No final desta lição, será capaz de:

- **Identificar Ameaças Específicas MCP**: Reconhecer riscos únicos de segurança em sistemas MCP, incluindo injeção de prompt, envenenamento de ferramentas, permissões excessivas, sequestro de sessão, problemas de secretário confuso, vulnerabilidades de token passthrough, e riscos na cadeia de fornecimento
- **Aplicar Controlos de Segurança**: Implementar mitigações eficazes incluindo autenticação robusta, acesso de mínimo privilégio, gestão segura de tokens, controlos de segurança de sessão, e verificação da cadeia de fornecimento
- **Aproveitar Soluções de Segurança Microsoft**: Compreender e implementar Microsoft Prompt Shields, Azure Content Safety, e GitHub Advanced Security para proteção de cargas de trabalho MCP
- **Validar Segurança de Ferramentas**: Reconhecer a importância da validação de metadados das ferramentas, monitorizar alterações dinâmicas e defender contra ataques indiretos de injeção de prompt
- **Integrar Melhores Práticas**: Combinar fundamentos estabelecidos de segurança (programação segura, endurecimento de servidores, zero trust) com controlos específicos MCP para proteção abrangente

# Arquitectura e Controlos de Segurança MCP

Implementações modernas de MCP requerem abordagens de segurança em camadas que abordem tanto a segurança tradicional de software como ameaças específicas de IA. A especificação MCP em rápida evolução continua a amadurecer os seus controlos de segurança, permitindo melhor integração com arquiteturas de segurança empresariais e melhores práticas estabelecidas.

Investigação do [Microsoft Digital Defense Report](https://aka.ms/mddr) demonstra que **98% das violações reportadas seriam prevenidas por uma higiene de segurança robusta**. A estratégia de proteção mais eficaz combina práticas fundamentais de segurança com controlos específicos MCP—medidas de segurança base comprovadas continuam a ser as mais impactantes na redução do risco global de segurança.

## Panorama Atual da Segurança

> **Nota:** Esta informação reflete os padrões de segurança MCP a partir de **5 de Fevereiro de 2026**, alinhada com a **Especificação MCP 2025-11-25**. O protocolo MCP continua a evoluir rapidamente, e implementações futuras podem introduzir novos padrões de autenticação e controlos melhorados. Consulte sempre a atual [Especificação MCP](https://spec.modelcontextprotocol.io/), o [repositório GitHub MCP](https://github.com/modelcontextprotocol) e a [documentação de melhores práticas de segurança](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) para as orientações mais recentes.

## 🏔️ Workshop MCP Security Summit (Sherpa)

Para **formação prática em segurança**, recomendamos fortemente o **Workshop MCP Security Summit** (Sherpa) - uma expedição guiada abrangente para proteger servidores MCP na Microsoft Azure.

### Visão Geral do Workshop

O [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) oferece formação prática e acionável em segurança através de uma metodologia comprovada "vulnerável → explorar → corrigir → validar". Vai:

- **Aprender a Quebrar Sistemas**: Experimentar vulnerabilidades explorando servidores intencionalmente inseguros
- **Usar Segurança Nativa Azure**: Aproveitar Azure Entra ID, Key Vault, API Management, e AI Content Safety
- **Seguir Defesa em Profundidade**: Progredir por acampamentos construindo camadas abrangentes de segurança
- **Aplicar Padrões OWASP**: Cada técnica corresponde ao [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obter Código de Produção**: Levar implementações funcionais e testadas

### Rota da Expedição

| Acampamento | Foco | Riscos OWASP Cobertos |
|-------------|-------|-----------------------|
| **Campo Base** | Fundamentos MCP & vulnerabilidades de autenticação | MCP01, MCP07 |
| **Campo 1: Identidade** | OAuth 2.1, Identidade Gerida Azure, Key Vault | MCP01, MCP02, MCP07 |
| **Campo 2: Gateway** | API Management, Endpoints Privados, governação | MCP02, MCP06, MCP07, MCP09 |
| **Campo 3: Segurança I/O** | Injeção de prompt, proteção PII, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Campo 4: Monitorização** | Log Analytics, painéis, deteção de ameaças | MCP04, MCP08 |
| **O Cume** | Teste de integração Red Team / Blue Team | Todos |

**Comece Aqui**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 Riscos de Segurança OWASP MCP

O [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) detalha os dez riscos de segurança mais críticos para implementações MCP:

| Risco | Descrição | Mitigação Azure |
|-------|-----------|-----------------|
| **MCP01** | Má Gestão de Tokens & Exposição de Segredos | Azure Key Vault, Identidade Gerida |
| **MCP02** | Escalada de Privilégios via Alargamento de Escopo | RBAC, Acesso Condicional |
| **MCP03** | Envenenamento de Ferramentas | Validação de ferramentas, verificação de integridade |
| **MCP04** | Ataques à Cadeia de Fornecimento de Software & Manipulação de Dependências | GitHub Advanced Security, scanner de dependências |
| **MCP05** | Injeção e Execução de Comandos | Validação de entradas, sandboxing |
| **MCP06** | Subversão do Fluxo de Intenção | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autenticação & Autorização Insuficientes | Azure Entra ID, OAuth 2.1 com PKCE |
| **MCP08** | Falta de Auditoria e Telemetria | Azure Monitor, Application Insights |
| **MCP09** | Servidores MCP Sombra | Governação no API Center, isolamento de rede |
| **MCP10** | Injeção de Contexto & Excesso de Partilha | Classificação de dados, exposição mínima |

### Evolução da Autenticação MCP

A especificação MCP evoluiu significativamente na sua abordagem a autenticação e autorização:

- **Abordagem Original**: Especificações iniciais exigiam que os desenvolvedores implementassem servidores de autenticação personalizados, com os servidores MCP a atuarem como Servidores OAuth 2.0 autorizadores gerindo autenticação de utilizadores diretamente
- **Padrão Atual (2025-11-25)**: A especificação atualizada permite que os servidores MCP deleguem a autenticação a fornecedores de identidade externos (como Microsoft Entra ID), melhorando a postura de segurança e reduzindo a complexidade da implementação
- **Segurança da Camada de Transporte**: Suporte aprimorado para mecanismos seguros de transporte com padrões de autenticação adequados para conexões locais (STDIO) e remotas (Streamable HTTP)

## Segurança de Autenticação e Autorização

### Desafios Atuais de Segurança

As implementações modernas MCP enfrentam vários desafios de autenticação e autorização:

### Riscos & Vetores de Ameaça

- **Lógica de Autorização Mal Configurada**: Implementação com falhas de autorização nos servidores MCP pode expor dados sensíveis e aplicar controles de acesso incorretamente
- **Comprometimento de Token OAuth**: Roubo de token de servidor MCP local permite a atacantes se passarem pelo servidor e aceder a serviços a jusante
- **Vulnerabilidades de Token Passthrough**: Manuseamento incorreto de tokens cria contornos aos controlos de segurança e lacunas de responsabilidade
- **Permissões Excessivas**: Servidores MCP com privilégios excedentes violam o princípio de mínimo privilégio e ampliam superfícies de ataque

#### Token Passthrough: Um Anti-Padrão Crítico

**Token passthrough é explicitamente proibido** na especificação atual de autorização MCP devido às graves implicações de segurança:

##### Contorno de Controlos de Segurança  
- Servidores MCP e APIs a jusante implementam controlos críticos (limitação de taxa, validação de pedidos, monitorização de tráfego) que dependem da validação correta do token  
- Utilização direta do token cliente para API contorna estas proteções essenciais, comprometendo a arquitetura de segurança

##### Desafios de Responsabilização e Auditoria  
- Servidores MCP não conseguem distinguir entre clientes que usam tokens emitidos a montante, quebrando os trilhos de auditoria  
- Logs dos servidores de recursos a jusante mostram origens de pedido enganosas em vez dos intermediários MCP reais  
- A investigação de incidentes e auditoria de conformidade tornam-se significativamente mais difíceis

##### Riscos de Exfiltração de Dados  
- Reivindicações de token não validadas permitem a agentes maliciosos com tokens roubados usar servidores MCP como proxies para exfiltração de dados  
- Violação da fronteira de confiança permite padrões de acesso não autorizados que contornam controlos de segurança pretendidos

##### Vetores de Ataque Multi-Serviço  
- Tokens comprometidos aceites por múltiplos serviços permitem movimentação lateral através de sistemas conectados  
- Suposições de confiança entre serviços podem ser violadas quando a origem do token não pode ser verificada

### Controlos e Mitigações de Segurança

**Requisitos Críticos de Segurança:**

> **OBRIGATÓRIO**: Os servidores MCP **NÃO DEVEM** aceitar quaisquer tokens que não tenham sido explicitamente emitidos para o servidor MCP

#### Controlos de Autenticação e Autorização

- **Revisão Rigorosa da Autorização**: Realizar auditorias abrangentes da lógica de autorização do servidor MCP para garantir que apenas utilizadores e clientes autorizados acedem a recursos sensíveis  
  - **Guia de Implementação**: [Azure API Management como Gateway de Autenticação para Servidores MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Integração de Identidade**: [Utilização do Microsoft Entra ID para Autenticação de Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestão Segura de Tokens**: Implementar as [melhores práticas de validação e ciclo de vida de tokens da Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Validar que as claims de audiência do token correspondem à identidade do servidor MCP  
  - Implementar políticas adequadas de rotação e expiração de tokens  
  - Prevenir ataques de repetição de tokens e uso não autorizado

- **Armazenamento Protegido de Tokens**: Armazenar tokens com encriptação em repouso e em trânsito  
  - **Melhores Práticas**: [Diretrizes para Armazenamento Seguro e Encriptação de Tokens](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementação de Controlo de Acesso

- **Princípio do Mínimo Privilégio**: Conceder apenas as permissões mínimas necessárias aos servidores MCP para a funcionalidade pretendida  
  - Revisões regulares de permissões para prevenir alargamento indevido de privilégios  
  - **Documentação Microsoft**: [Acesso Seguro com Mínimo Privilégio](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Controlos de Acesso Baseados em Papel (RBAC)**: Implementar atribuições de papéis granulares  
  - Limitar papéis a recursos e ações específicas  
  - Evitar permissões amplas ou desnecessárias que aumentem a superfície de ataque

- **Monitorização Contínua de Permissões**: Implementar auditoria e monitorização contínuas de acessos  
  - Monitorizar padrões de uso de permissões para detectar anomalias  
  - Corrigir prontamente privilégios excessivos ou não utilizados

## Ameaças de Segurança Específicas de IA

### Ataques de Injeção de Prompt e Manipulação de Ferramentas

Implementações modernas MCP enfrentam vetores de ataque sofisticados específicos de IA que medidas tradicionais de segurança não conseguem abordar plenamente:

#### **Injeção Indireta de Prompt (Injeção de Prompt Cross-Domain)**

**Injeção Indireta de Prompt** representa uma das vulnerabilidades mais críticas em sistemas IA habilitados para MCP. Atacantes embutem instruções maliciosas dentro de conteúdos externos—documentos, páginas web, emails, ou fontes de dados—que os sistemas de IA processam posteriormente como comandos legítimos.

**Cenários de Ataque:**
- **Injeção Baseada em Documentos**: Instruções maliciosas ocultas em documentos processados que acionam ações não intencionadas da IA  
- **Exploração de Conteúdo Web**: Páginas web comprometidas contendo prompts embutidos que manipulam o comportamento da IA quando extraídos  
- **Ataques por Email**: Prompts maliciosos em emails que fazem os assistentes de IA divulgarem informação ou executarem ações não autorizadas  
- **Contaminação de Fontes de Dados**: Bases de dados ou APIs comprometidas que fornecem conteúdo contaminado aos sistemas IA

**Impacto no Mundo Real**: Estes ataques podem resultar em exfiltração de dados, quebras de privacidade, geração de conteúdo nocivo e manipulação de interações com utilizadores. Para análise detalhada, veja [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/pt-PT/prompt-injection.ed9fbfde297ca877.webp)

#### **Ataques de Envenenamento de Ferramentas**

**Envenenamento de Ferramentas** visa os metadados que definem as ferramentas MCP, explorando como os LLM interpretam descrições e parâmetros das ferramentas para tomar decisões de execução.

**Mecanismos de Ataque:**
- **Manipulação de Metadados**: Atacantes injetam instruções maliciosas nas descrições das ferramentas, definições de parâmetros ou exemplos de uso  
- **Instruções Invisíveis**: Prompts ocultos nos metadados das ferramentas que são processados pelos modelos de IA mas invisíveis para utilizadores humanos  
- **Modificação Dinâmica de Ferramentas ("Rug Pulls")**: Ferramentas aprovadas pelos utilizadores são posteriormente modificadas para realizar ações maliciosas sem o conhecimento do utilizador  
- **Injeção em Parâmetros**: Conteúdo malicioso embutido nos esquemas dos parâmetros da ferramenta que influencia o comportamento do modelo

**Riscos em Servidores Hospedados**: Servidores MCP remotos apresentam riscos elevados, pois as definições das ferramentas podem ser atualizadas após a aprovação inicial do utilizador, criando cenários em que ferramentas previamente seguras se tornam maliciosas. Para análise abrangente, consulte [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/pt-PT/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vetores Adicionais de Ataque IA**

- **Injeção de Prompt Cross-Domain (XPIA)**: Ataques sofisticados que aproveitam conteúdo de múltiplos domínios para contornar controlos de segurança
- **Modificação Dinâmica de Capacidades**: Alterações em tempo real às capacidades da ferramenta que escapam às avaliações iniciais de segurança
- **Envenenamento da Janela de Contexto**: Ataques que manipulam grandes janelas de contexto para ocultar instruções maliciosas
- **Ataques de Confusão do Modelo**: Exploração das limitações do modelo para criar comportamentos imprevisíveis ou inseguros


### Impacto dos Riscos de Segurança da IA

**Consequências de Alto Impacto:**
- **Exfiltração de Dados**: Acesso não autorizado e roubo de dados sensíveis empresariais ou pessoais
- **Violação de Privacidade**: Exposição de informação pessoal identificável (PII) e dados empresariais confidenciais  
- **Manipulação do Sistema**: Modificações não intencionais em sistemas e fluxos de trabalho críticos
- **Roubo de Credenciais**: Comprometimento de tokens de autenticação e credenciais de serviço
- **Movimento Lateral**: Uso de sistemas de IA comprometidos como pivôs para ataques mais amplos na rede

### Soluções Microsoft para Segurança de IA

#### **AI Prompt Shields: Proteção Avançada Contra Ataques de Injeção**

O Microsoft **AI Prompt Shields** oferece defesa abrangente contra ataques de injeção direta e indireta em prompts, através de múltiplas camadas de segurança:

##### **Mecanismos de Proteção Principais:**

1. **Deteção Avançada & Filtragem**
   - Algoritmos de machine learning e técnicas de PLN detectam instruções maliciosas em conteúdos externos
   - Análise em tempo real de documentos, páginas web, emails e fontes de dados para ameaças embutidas
   - Compreensão contextual dos padrões legítimos versus maliciosos de prompt

2. **Técnicas de Spotlighting**  
   - Distingue entre instruções do sistema confiáveis e inputs externos potencialmente comprometidos
   - Métodos de transformação de texto que aumentam a relevância para o modelo enquanto isolam conteúdos maliciosos
   - Ajuda os sistemas de IA a manterem a hierarquia correta de instruções e ignorar comandos injetados

3. **Sistemas de Delimitadores & Marcação de Dados**
   - Definição explícita de fronteiras entre mensagens confiáveis do sistema e texto de entrada externo
   - Marcadores especiais destacam os limites entre fontes de dados confiáveis e não confiáveis
   - Separação clara evita confusão de instruções e execução não autorizada de comandos

4. **Inteligência Contínua de Ameaças**
   - Microsoft monitora continuamente padrões de ataque emergentes e atualiza as defesas
   - Caça proativa a ameaças para novas técnicas de injeção e vetores de ataque
   - Atualizações regulares do modelo de segurança para manter a eficácia contra ameaças evolutivas

5. **Integração Azure Content Safety**
   - Parte da suíte abrangente Azure AI Content Safety
   - Detecção adicional para tentativas de jailbreak, conteúdos nocivos e violações de políticas de segurança
   - Controlo de segurança unificado em componentes de aplicação de IA

**Recursos de Implementação**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/pt-PT/prompt-shield.ff5b95be76e9c78c.webp)


## Ameaças Avançadas de Segurança MCP

### Vulnerabilidades de Sequestro de Sessão

O **sequestro de sessão** representa um vetor crítico de ataque em implementações stateful de MCP onde partes não autorizadas obtêm e abusam de identificadores legítimos de sessão para se passarem por clientes e realizarem ações não autorizadas.

#### **Cenários de Ataque & Riscos**

- **Injeção de Prompt em Sequestro de Sessão**: Ataques com IDs de sessão roubados injetam eventos maliciosos em servidores que partilham estado de sessão, potencialmente acionando ações nocivas ou acedendo dados sensíveis
- **Impersonação Direta**: IDs de sessão roubados permitem chamadas diretas ao servidor MCP que contornam autenticação, tratando os atacantes como utilizadores legítimos
- **Fluxos Retomáveis Comprometidos**: Atacantes podem terminar pedidos prematuramente, fazendo com que clientes legítimos retomem com conteúdo potencialmente malicioso

#### **Controlo de Segurança para Gestão de Sessões**

**Requisitos Críticos:**
- **Verificação de Autorização**: Servidores MCP que implementam autorização **DEVEM** verificar TODOS os pedidos recebidos e **NÃO DEVEM** confiar em sessões para autenticação
- **Geração Segura de Sessões**: Utilizar IDs de sessão criptograficamente seguros e não determinísticos gerados por geradores seguros de números aleatórios
- **Vinculação Específica ao Utilizador**: Associar IDs de sessão a informações específicas do utilizador usando formatos como `<user_id>:<session_id>` para prevenir abuso interutilizadores
- **Gestão do Ciclo de Vida da Sessão**: Implementar expiração, rotação e invalidação adequadas para limitar janelas de vulnerabilidade
- **Segurança no Transporte**: HTTPS obrigatório para toda comunicação para prevenir interceção de IDs de sessão

### Problema do Deputado Confuso

O **problema do deputado confuso** ocorre quando servidores MCP atuam como proxies de autenticação entre clientes e serviços de terceiros, criando oportunidades para contornar autorização através de exploração de IDs estáticos de cliente.

#### **Mecânicas de Ataque & Riscos**

- **Contorno de Consentimento Baseado em Cookies**: Autenticação prévia do utilizador cria cookies de consentimento que atacantes exploram com pedidos de autorização maliciosos contendo URIs de redirecionamento manipuladas
- **Roubo de Código de Autorização**: Cookies de consentimento existentes podem fazer com que servidores de autorização ignorem telas de consentimento, redirecionando códigos para endpoints controlados por atacantes  
- **Acesso Não Autorizado à API**: Códigos de autorização roubados permitem troca por tokens e impersonação de utilizadores sem aprovação explícita

#### **Estratégias de Mitigação**

**Controles Obrigatórios:**
- **Requisitos Explícitos de Consentimento**: Servidores proxy MCP que usam IDs estáticos de cliente **DEVEM** obter consentimento do utilizador para cada cliente registado dinamicamente
- **Implementação Segura do OAuth 2.1**: Seguir as melhores práticas atuais de segurança OAuth, incluindo PKCE (Proof Key for Code Exchange) para todos os pedidos de autorização
- **Validação Rigorosa do Cliente**: Implementar validação rigorosa de URIs de redirecionamento e identificadores de cliente para prevenir exploração

### Vulnerabilidades de Passagem de Token  

**Passagem de token** representa um antipadrão claro onde servidores MCP aceitam tokens de clientes sem validação adequada e os encaminham para APIs a jusante, violando especificações de autorização MCP.

#### **Implicações de Segurança**

- **Circunvenção de Controlo**: Uso direto de token cliente-para-API contorna controlos críticos de limitação de taxa, validação e monitorização
- **Corrupção do Rastro de Auditoria**: Tokens emitidos a montante tornam impossível identificar o cliente, quebrando capacidades de investigação de incidentes
- **Exfiltração de Dados via Proxy**: Tokens não validados permitem a atores maliciosos usar servidores como proxies para acesso não autorizado a dados
- **Violações de Fronteira de Confiança**: Suposições de confiança dos serviços a jusante podem ser violadas quando a origem do token não pode ser verificada
- **Expansão do Ataque Multiserviço**: Tokens comprometidos aceites em múltiplos serviços habilitam movimento lateral

#### **Controlo de Segurança Obrigatório**

**Requisitos Inegociáveis:**
- **Validação de Token**: Servidores MCP **NÃO DEVEM** aceitar tokens não emitidos explicitamente para o servidor MCP
- **Verificação de Audiência**: Validar sempre que as claims de audiência do token correspondam à identidade do servidor MCP
- **Ciclo de Vida Adequado do Token**: Implementar tokens de acesso de curta duração com práticas seguras de rotação


## Segurança da Cadeia de Fornecimento para Sistemas de IA

A segurança da cadeia de fornecimento evoluiu para além das dependências tradicionais de software, abrangendo todo o ecossistema de IA. Implementações modernas de MCP devem verificar e monitorizar rigorosamente todos os componentes relacionados com IA, pois cada um introduz vulnerabilidades potenciais que podem comprometer a integridade do sistema.

### Componentes Expandidos da Cadeia de Fornecimento de IA

**Dependências Tradicionais de Software:**
- Bibliotecas e frameworks open-source
- Imagens de container e sistemas base  
- Ferramentas de desenvolvimento e pipelines de build
- Componentes e serviços de infraestrutura

**Elementos Específicos da Cadeia de Fornecimento de IA:**
- **Modelos Foundation**: Modelos pré-treinados de vários fornecedores que requerem verificação de proveniência
- **Serviços de Embedding**: Serviços externos de vetorização e pesquisa semântica
- **Provedores de Contexto**: Fontes de dados, bases de conhecimento e repositórios documentais  
- **APIs de Terceiros**: Serviços externos de IA, pipelines de ML e endpoints de processamento de dados
- **Artefactos de Modelo**: Pesos, configurações e variantes de modelos fine-tuned
- **Fontes de Dados de Treino**: Conjuntos de dados usados para treino e afinação de modelos

### Estratégia Abrangente de Segurança da Cadeia de Fornecimento

#### **Verificação de Componentes & Confiança**
- **Validação de Proveniência**: Verificar a origem, licenciamento e integridade de todos os componentes de IA antes da integração
- **Avaliação de Segurança**: Realizar scans de vulnerabilidades e revisões de segurança para modelos, fontes de dados e serviços de IA
- **Análise de Reputação**: Avaliar o histórico e práticas de segurança dos fornecedores de serviços de IA
- **Verificação de Conformidade**: Garantir que todos os componentes cumprem os requisitos organizacionais e regulatórios de segurança

#### **Pipelines de Implantação Segura**  
- **Segurança CI/CD Automatizada**: Integrar scans de segurança durante toda a pipeline de implantação automatizada
- **Integridade de Artefactos**: Implementar verificação criptográfica para todos os artefactos implantados (código, modelos, configurações)
- **Implantação em Estágios**: Utilizar estratégias de implantação progressiva com validação de segurança em cada etapa
- **Repositórios de Artefactos Confiáveis**: Implantar apenas a partir de registos e repositórios verificados e seguros

#### **Monitorização e Resposta Contínuas**
- **Scan de Dependências**: Monitorização contínua de vulnerabilidades de todas as dependências de software e componentes de IA
- **Monitorização de Modelos**: Avaliação contínua do comportamento do modelo, deriva de desempenho e anomalias de segurança
- **Monitorização de Saúde de Serviços**: Vigiar serviços externos de IA quanto a disponibilidade, incidentes de segurança e alterações de política
- **Integração de Inteligência de Ameaças**: Incorporar feeds de ameaça específicos para riscos de segurança em IA e ML

#### **Controlo de Acesso & Privilégio Mínimo**
- **Permissões ao Nível de Componente**: Restringir acesso a modelos, dados e serviços segundo necessidade de negócio
- **Gestão de Contas de Serviço**: Implementar contas de serviço dedicadas com permissões mínimas necessárias
- **Segmentação de Rede**: Isolar componentes de IA e limitar o acesso de rede entre serviços
- **Controlo via API Gateway**: Usar gateways de API centralizados para controlar e monitorizar acesso a serviços externos de IA

#### **Resposta a Incidentes & Recuperação**
- **Procedimentos de Resposta Rápida**: Processos estabelecidos para patching ou substituição de componentes de IA comprometidos
- **Rotação de Credenciais**: Sistemas automatizados para rodar segredos, chaves API e credenciais de serviço
- **Capacidades de Rollback**: Possibilidade de reverter rapidamente para versões anteriores conhecidas e estáveis de componentes IA
- **Recuperação de Comprometimento da Cadeia de Fornecimento**: Procedimentos específicos para responder a compromissos de serviços IA a montante

### Ferramentas e Integração de Segurança Microsoft

O **GitHub Advanced Security** oferece proteção abrangente para a cadeia de fornecimento incluindo:
- **Scan de Segredos**: Detecção automatizada de credenciais, chaves API e tokens em repositórios
- **Scan de Dependências**: Avaliação de vulnerabilidades em dependências e bibliotecas open-source
- **Análise CodeQL**: Análise estática de código para vulnerabilidades de segurança e problemas de programação
- **Insights da Cadeia de Fornecimento**: Visibilidade da saúde e estado de segurança das dependências

**Integração Azure DevOps & Azure Repos:**
- Integração fluída de scans de segurança em plataformas de desenvolvimento Microsoft
- Verificações de segurança automatizadas em Azure Pipelines para cargas de trabalho IA
- Aplicação de políticas para implantação segura de componentes IA

**Práticas Internas Microsoft:**
A Microsoft implementa extensas práticas de segurança na cadeia de fornecimento em todos os produtos. Saiba mais sobre abordagens comprovadas em [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Melhores Práticas de Segurança Fundamentais

Implementações MCP herdam e desenvolvem a partir da postura de segurança existente da sua organização. Fortalecer práticas de segurança fundamentais melhora significativamente a segurança global dos sistemas de IA e das implementações MCP.

### Fundamentais de Segurança Central

#### **Práticas Seguras de Desenvolvimento**
- **Conformidade OWASP**: Proteger contra [OWASP Top 10](https://owasp.org/www-project-top-ten/) vulnerabilidades de aplicações web
- **Proteções Específicas para IA**: Implementar controlos para o [OWASP Top 10 para LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Gestão Segura de Segredos**: Usar cofres dedicados para tokens, chaves API e dados sensíveis de configuração
- **Encriptação End-to-End**: Implementar comunicações seguras em todos os componentes de aplicação e fluxos de dados
- **Validação de Entrada**: Validação rigorosa de todos os inputs de utilizador, parâmetros de API e fontes de dados

#### **Endurecimento da Infraestrutura**
- **Autenticação Multifator**: MFA obrigatório para todas as contas administrativas e de serviço
- **Gestão de Patches**: Aplicação automática e atempada de patches para sistemas operativos, frameworks e dependências  
- **Integração com Provedores de Identidade**: Gestão centralizada de identidades via provedores empresariais (Microsoft Entra ID, Active Directory)
- **Segmentação de Rede**: Isolamento lógico dos componentes MCP para limitar potencial de movimento lateral
- **Princípio do Privilégio Mínimo**: Permissões minimamente necessárias para todos os componentes e contas do sistema

#### **Monitorização e Deteção de Segurança**
- **Registo Abrangente**: Logs detalhados das atividades da aplicação IA, incluindo interações cliente-servidor MCP
- **Integração SIEM**: Gestão centralizada de informação e eventos de segurança para deteção de anomalias
- **Análise Comportamental**: Monitorização assistida por IA para detetar padrões invulgares no comportamento de sistemas e utilizadores
- **Inteligência de Ameaças**: Integração de feeds de ameaças externas e indicadores de compromisso (IOCs)
- **Resposta a Incidentes**: Procedimentos bem definidos para deteção, resposta e recuperação de incidentes de segurança

#### **Arquitetura Zero Trust**
- **Nunca Confiar, Sempre Verificar**: Verificação contínua de utilizadores, dispositivos e ligações de rede
- **Microsegmentação**: Controlos granulares de rede que isolam cargas e serviços individuais
- **Segurança Centrada na Identidade**: Políticas de segurança baseadas em identidades verificadas e não na localização de rede
- **Avaliação Contínua de Risco**: Avaliação dinâmica da postura de segurança baseada no contexto e comportamento atuais
- **Acesso Condicional**: Controlos de acesso que se adaptam com base em fatores de risco, localização e confiança do dispositivo

### Padrões de Integração Empresarial

#### **Integração no Ecossistema de Segurança Microsoft**
- **Microsoft Defender for Cloud**: Gestão abrangente da postura de segurança em nuvem
- **Azure Sentinel**: SIEM e SOAR nativos da nuvem para proteção de cargas de trabalho IA
- **Microsoft Entra ID**: Gestão empresarial de identidades e acessos com políticas de acesso condicional
- **Azure Key Vault**: Gestão centralizada de segredos com suporte a módulos de segurança hardware (HSM)
- **Microsoft Purview**: Governança e conformidade de dados para fontes e fluxos de dados IA

#### **Conformidade & Governança**
- **Alinhamento Regulatória**: Garantir que implementações MCP cumprem requisitos de conformidade específicos do setor (GDPR, HIPAA, SOC 2)
- **Classificação de Dados**: Categorização e tratamento adequados de dados sensíveis processados por sistemas IA
- **Traços de Auditoria**: Registo abrangente para conformidade regulatória e investigação forense
- **Controlos de Privacidade**: Implementação dos princípios privacy-by-design na arquitetura dos sistemas IA
- **Gestão de Alterações**: Processos formais para revisão de segurança de modificações em sistemas IA

Estas práticas fundamentais criam uma base robusta de segurança que aumenta a eficácia dos controlos específicos MCP e fornece proteção abrangente para aplicações impulsionadas por IA.

## Principais Lições de Segurança
- **Abordagem de Segurança em Camadas**: Combine práticas de segurança fundamentais (codificação segura, menor privilégio, verificação da cadeia de fornecimento, monitorização contínua) com controlos específicos para IA para uma proteção abrangente

- **Paisagem de Ameaças Específicas da IA**: Os sistemas MCP enfrentam riscos únicos, incluindo injeção de prompt, envenenamento de ferramentas, sequestro de sessões, problemas de representante confuso, vulnerabilidades de passagem de token e permissões excessivas que requerem mitigações especializadas

- **Excelência em Autenticação & Autorização**: Implemente autenticação robusta utilizando provedores externos de identidade (Microsoft Entra ID), aplique validação adequada de tokens e nunca aceite tokens não explicitamente emitidos para o seu servidor MCP

- **Prevenção de Ataques à IA**: Desdobre Microsoft Prompt Shields e Azure Content Safety para defender contra ataques indiretos de injeção de prompt e envenenamento de ferramentas, ao mesmo tempo que valide metadados das ferramentas e monitore alterações dinâmicas

- **Segurança de Sessão & Transporte**: Utilize IDs de sessão criptograficamente seguros e não determinísticos vinculados a identidades de utilizadores, implemente gestão adequada do ciclo de vida da sessão e nunca use sessões para autenticação

- **Melhores Práticas de Segurança OAuth**: Previna ataques de representante confuso através de consentimento explícito do utilizador para clientes registados dinamicamente, implementação correta do OAuth 2.1 com PKCE e validação rigorosa da URI de redirecionamento

- **Princípios de Segurança de Tokens**: Evite anti-padrões de passagem de tokens, valide as reivindicações de audiência dos tokens, implemente tokens de curta duração com rotação segura e mantenha limites de confiança claros

- **Segurança Abrangente da Cadeia de Fornecimento**: Trate todos os componentes do ecossistema de IA (modelos, embeddings, fornecedores de contexto, APIs externas) com o mesmo rigor de segurança que as dependências tradicionais de software

- **Evolução Contínua**: Mantenha-se atualizado com as especificações MCP em rápida evolução, contribua para os padrões da comunidade de segurança e mantenha posturas de segurança adaptativas à medida que o protocolo amadurece

- **Integração de Segurança Microsoft**: Aproveite o ecossistema abrangente de segurança da Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) para proteção reforçada nas implantações MCP

## Recursos Abrangentes

### **Documentação Oficial de Segurança MCP**
- [Especificação MCP (Atual: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificação de Autorização MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositório GitHub MCP](https://github.com/modelcontextprotocol)

### **Recursos de Segurança MCP OWASP**
- [Guia de Segurança MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Guia completo OWASP MCP Top 10 com orientações de implementação para Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscos oficiais de segurança MCP da OWASP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formação prática de segurança para MCP no Azure

### **Normas & Melhores Práticas de Segurança**
- [Melhores Práticas de Segurança OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Segurança de Aplicações Web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 para Modelos de Linguagem de Grande Escala](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Relatório Microsoft Digital Defense](https://aka.ms/mddr)

### **Investigação & Análise de Segurança em IA**
- [Injeção de Prompt no MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Ataques de Envenenamento de Ferramentas (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing de Investigação de Segurança MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluções de Segurança Microsoft**
- [Documentação Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Serviço Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Segurança Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Melhores Práticas para Gestão de Tokens no Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guias de Implementação & Tutoriais**
- [Azure API Management como Gateway de Autenticação MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autenticação Microsoft Entra ID com Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Armazenamento Seguro e Encriptação de Tokens (Vídeo)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Segurança da Cadeia de Fornecimento**
- [Segurança Azure DevOps](https://azure.microsoft.com/products/devops)
- [Segurança Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Jornada de Segurança da Cadeia de Fornecimento Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentação Adicional de Segurança**

Para orientação abrangente de segurança, consulte estes documentos especializados nesta secção:

- **[Melhores Práticas de Segurança MCP 2025](./mcp-security-best-practices-2025.md)** - Práticas completas de segurança para implementações MCP
- **[Implementação Azure Content Safety](./azure-content-safety-implementation.md)** - Exemplos práticos de implementação para integração do Azure Content Safety  
- **[Controlo de Segurança MCP 2025](./mcp-security-controls-2025.md)** - Controlo e técnicas de segurança mais recentes para implantações MCP
- **[Guia Rápido de Melhores Práticas MCP](./mcp-best-practices.md)** - Guia de referência rápida para práticas essenciais de segurança MCP
- **[BlueHat 2026: Asegurar o futuro da IA: Assegurar MCP com padrões de defesa em profundidade](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Padrões de defesa em profundidade do Microsoft Security Response Center (MSRC)

### **Formação Prática em Segurança**

- **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop prático abrangente para assegurar servidores MCP no Azure com campos progressivos desde Base Camp a Summit
- **[Guia de Segurança MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Arquitetura de referência e orientações de implementação para todos os riscos OWASP MCP Top 10

---

## Qual o Próximo Passo

Próximo: [Capítulo 3: Começar](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->