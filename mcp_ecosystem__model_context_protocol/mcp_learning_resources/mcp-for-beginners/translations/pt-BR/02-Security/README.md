# Segurança MCP: Proteção Abrangente para Sistemas de IA

[![Melhores Práticas de Segurança MCP](../../../translated_images/pt-BR/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Clique na imagem acima para assistir ao vídeo desta lição)_

A segurança é fundamental no design de sistemas de IA, por isso a priorizamos como nossa segunda seção. Isso está alinhado com o princípio da Microsoft de **Segurança por Design** da [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

O Model Context Protocol (MCP) traz novas capacidades poderosas para aplicações movidas por IA, ao mesmo tempo que introduz desafios de segurança únicos que vão além dos riscos tradicionais de software. Sistemas MCP enfrentam tanto preocupações de segurança estabelecidas (codificação segura, princípio do menor privilégio, segurança da cadeia de suprimentos) quanto novas ameaças específicas da IA, incluindo injeção de prompt, envenenamento de ferramentas, sequestro de sessão, ataques de procurador confundido, vulnerabilidades de passagem de token e modificação dinâmica de capacidades.

Esta lição explora os riscos de segurança mais críticos em implementações MCP — cobrindo autenticação, autorização, permissões excessivas, injeção indireta de prompt, segurança de sessão, problemas de procurador confundido, gerenciamento de tokens e vulnerabilidades da cadeia de suprimentos. Você aprenderá controles acionáveis e melhores práticas para mitigar esses riscos enquanto utiliza soluções Microsoft como Prompt Shields, Azure Content Safety e GitHub Advanced Security para fortalecer sua implantação MCP.

## Objetivos de Aprendizagem

Ao final desta lição, você será capaz de:

- **Identificar Ameaças Específicas MCP**: Reconhecer riscos de segurança únicos em sistemas MCP, incluindo injeção de prompt, envenenamento de ferramentas, permissões excessivas, sequestro de sessão, problemas de procurador confundido, vulnerabilidades de passagem de token e riscos da cadeia de suprimentos
- **Aplicar Controles de Segurança**: Implementar mitigações eficazes, incluindo autenticação robusta, acesso com menor privilégio, gerenciamento seguro de tokens, controles de segurança de sessão e verificação da cadeia de suprimentos
- **Aproveitar Soluções de Segurança Microsoft**: Compreender e implantar Microsoft Prompt Shields, Azure Content Safety e GitHub Advanced Security para proteção de cargas de trabalho MCP
- **Validar a Segurança das Ferramentas**: Reconhecer a importância da validação de metadados das ferramentas, monitoramento de mudanças dinâmicas e defesa contra ataques indiretos de injeção de prompt
- **Integrar Melhores Práticas**: Combinar fundamentos estabelecidos de segurança (codificação segura, fortalecimento de servidores, zero trust) com controles específicos MCP para proteção abrangente

# Arquitetura & Controles de Segurança MCP

Implementações modernas de MCP requerem abordagens de segurança em camadas que atendam tanto à segurança tradicional de software quanto às ameaças específicas de IA. A especificação MCP em rápida evolução continua amadurecendo seus controles de segurança, permitindo melhor integração com arquiteturas corporativas de segurança e melhores práticas estabelecidas.

Pesquisas do [Microsoft Digital Defense Report](https://aka.ms/mddr) demonstram que **98% das violações reportadas seriam prevenidas por uma higiene robusta de segurança**. A estratégia de proteção mais eficaz combina práticas básicas de segurança com controles específicos MCP — medidas base comprovadas permanecem as mais impactantes na redução do risco global de segurança.

## Panorama Atual da Segurança

> **Nota:** Estas informações refletem os padrões de segurança MCP em **5 de fevereiro de 2026**, alinhadas com a **Especificação MCP 2025-11-25**. O protocolo MCP continua evoluindo rapidamente, e implementações futuras podem introduzir novos padrões de autenticação e controles aprimorados. Sempre consulte a [Especificação MCP](https://spec.modelcontextprotocol.io/), [repositório MCP no GitHub](https://github.com/modelcontextprotocol) e a [documentação de melhores práticas de segurança](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) atuais para orientações mais recentes.

## 🏔️ Workshop MCP Security Summit (Sherpa)

Para **treinamento prático em segurança**, recomendamos fortemente o **MCP Security Summit Workshop** (Sherpa) — uma expedição guiada abrangente para garantir servidores MCP no Microsoft Azure.

### Visão Geral do Workshop

O [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) oferece treinamento prático em segurança por meio de uma metodologia comprovada "vulnerável → exploit → correção → validação". Você irá:

- **Aprender Quebrando Coisas**: Experimentar vulnerabilidades na prática explorando servidores intencionalmente inseguros
- **Usar Segurança Nativa Azure**: Aproveitar Azure Entra ID, Key Vault, API Management e AI Content Safety
- **Seguir Defesa em Profundidade**: Avançar por acampamentos construindo camadas abrangentes de segurança
- **Aplicar padrões OWASP**: Cada técnica mapeia para o [Guia de Segurança MCP Azure da OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obter Código de Produção**: Sair com implementações funcionando e testadas

### O Roteiro da Expedição

| Acampamento | Foco | Riscos OWASP Cobertos |
|-------------|-------|-----------------------|
| **Acampamento Base** | Fundamentos MCP & vulnerabilidades de autenticação | MCP01, MCP07 |
| **Acampamento 1: Identidade** | OAuth 2.1, Identidade Gerenciada Azure, Key Vault | MCP01, MCP02, MCP07 |
| **Acampamento 2: Gateway** | API Management, Private Endpoints, governança | MCP02, MCP06, MCP07, MCP09 |
| **Acampamento 3: Segurança E/S** | Injeção de prompt, proteção PII, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Acampamento 4: Monitoramento** | Log Analytics, dashboards, detecção de ameaças | MCP04, MCP08 |
| **O Cume** | Teste de integração Red Team / Blue Team | Todos |

**Comece agora**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 Riscos de Segurança OWASP MCP

O [Guia de Segurança MCP Azure da OWASP](https://microsoft.github.io/mcp-azure-security-guide/) detalha os dez riscos de segurança mais críticos para implementações MCP:

| Risco | Descrição | Mitigação Azure |
|-------|-----------|-----------------|
| **MCP01** | Má Gestão de Tokens & Exposição de Segredos | Azure Key Vault, Identidade Gerenciada |
| **MCP02** | Escalada de Privilégio via Expansão de Escopo | RBAC, Acesso Condicional |
| **MCP03** | Envenenamento de Ferramentas | Validação de ferramentas, verificação de integridade |
| **MCP04** | Ataques na Cadeia de Suprimentos de Software & Manipulação de Dependências | GitHub Advanced Security, escaneamento de dependências |
| **MCP05** | Injeção e Execução de Comandos | Validação de entrada, sandboxing |
| **MCP06** | Subversão do Fluxo de Intenção | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autenticação & Autorização Insuficientes | Azure Entra ID, OAuth 2.1 com PKCE |
| **MCP08** | Falta de Auditoria e Telemetria | Azure Monitor, Application Insights |
| **MCP09** | Servidores MCP Fantasmas | Governança API Center, isolamento de rede |
| **MCP10** | Injeção de Contexto & Exposição Excessiva | Classificação de dados, exposição mínima |

### Evolução da Autenticação MCP

A especificação MCP evoluiu significativamente em sua abordagem para autenticação e autorização:

- **Abordagem Original**: Especificações iniciais exigiam desenvolvedores a implementar servidores de autenticação customizados, com servidores MCP atuando como servidores OAuth 2.0 Authorization diretamente gerenciando autenticação de usuário
- **Padrão Atual (2025-11-25)**: A especificação atualizada permite que servidores MCP deleguem autenticação a provedores de identidade externos (como Microsoft Entra ID), melhorando a postura de segurança e reduzindo a complexidade da implementação
- **Segurança na Camada de Transporte**: Suporte aprimorado para mecanismos de transporte seguro com padrões adequados de autenticação para conexões locais (STDIO) e remotas (HTTP Streamable)

## Segurança de Autenticação & Autorização

### Desafios Atuais de Segurança

Implementações modernas de MCP enfrentam diversos desafios em autenticação e autorização:

### Riscos & Vetores de Ameaças

- **Lógica de Autorização Mal Configurada**: Implementação falha de autorização em servidores MCP pode expor dados sensíveis e aplicar controles de acesso incorretos
- **Comprometimento de Token OAuth**: Roubo de tokens no servidor local MCP permite que invasores se passem por servidores e acessem serviços a jusante
- **Vulnerabilidades de Passagem de Token**: Manuseio incorreto de tokens cria brechas para contornar controles de segurança e lacunas de responsabilização
- **Permissões Excessivas**: Servidores MCP com privilégios exagerados violam o princípio do menor privilégio e ampliam a superfície de ataque

#### Passagem de Token: Um Anti-padrão Crítico

**A passagem de token é explicitamente proibida** na especificação atual de autorização MCP devido às severas implicações de segurança:

##### Circunvenção de Controle de Segurança
- Servidores MCP e APIs a jusante implementam importantes controles (limitação de taxa, validação de requisição, monitoramento de tráfego) que dependem da validação correta do token
- Uso direto de token cliente para API contorna essas proteções essenciais, comprometendo a arquitetura de segurança

##### Desafios de Responsabilização & Auditoria
- Servidores MCP não conseguem distinguir entre clientes que usam tokens emitidos a montante, quebrando o rastreamento de auditoria
- Logs dos servidores de recursos a jusante mostram origens falsas das requisições em vez dos intermediários MCP reais
- Investigações de incidentes e auditoria de conformidade tornam-se muito mais difíceis

##### Riscos de Exfiltração de Dados
- Reivindicações de tokens não validadas permitem que agentes maliciosos com tokens roubados usem servidores MCP como proxies para exfiltração
- Violações da fronteira de confiança habilitam padrões de acesso não autorizados que contornam controles pretendidos

##### Vetores de Ataque Multi-Serviço
- Tokens comprometidos aceitos por múltiplos serviços permitem movimentação lateral entre sistemas conectados
- Suposições de confiança entre serviços podem ser violadas quando a origem do token não é verificável

### Controles de Segurança & Mitigações

**Requisitos Críticos de Segurança:**

> **OBRIGATÓRIO**: servidores MCP **NÃO DEVEM** aceitar tokens que não tenham sido explicitamente emitidos para o servidor MCP

#### Controles de Autenticação & Autorização

- **Revisão Rigorosa de Autorização**: Realizar auditorias abrangentes na lógica de autorização dos servidores MCP para assegurar que somente usuários e clientes autorizados acessem recursos sensíveis
  - **Guia de Implementação**: [Azure API Management como Gateway de Autenticação para Servidores MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integração de Identidade**: [Uso do Microsoft Entra ID para Autenticação de Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gerenciamento Seguro de Tokens**: Implementar as [melhores práticas da Microsoft para validação e ciclo de vida de tokens](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validar que as claims de audiência do token correspondam à identidade do servidor MCP
  - Implementar políticas adequadas de expiração e rotação de tokens
  - Prevenir ataques de replay e uso não autorizado de tokens

- **Armazenamento Protegido de Tokens**: Armazenar tokens com criptografia em repouso e em trânsito
  - **Melhores Práticas**: [Diretrizes de Armazenamento Seguro e Criptografia de Tokens](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementação de Controle de Acesso

- **Princípio do Menor Privilégio**: Conceder aos servidores MCP apenas as permissões mínimas necessárias para a funcionalidade pretendida
  - Revisões regulares de permissões e atualizações para evitar escalada de privilégios
  - **Documentação Microsoft**: [Acesso Seguro com Menor Privilégio](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Controle de Acesso Baseado em Funções (RBAC)**: Implementar atribuições de funções detalhadas
  - Restringir papéis a recursos e ações específicas
  - Evitar permissões amplas ou desnecessárias que ampliem a superfície de ataque

- **Monitoramento Contínuo de Permissões**: Implementar auditoria e monitoramento constantes de acesso
  - Monitorar padrões de uso de permissões em busca de anomalias
  - Corrigir prontamente privilégios excessivos ou não usados

## Ameaças de Segurança Específicas da IA

### Ataques de Injeção de Prompt & Manipulação de Ferramentas

Implementações modernas de MCP enfrentam vetores sofisticados de ataques específicos de IA que as medidas tradicionais de segurança não conseguem abordar totalmente:

#### **Injeção Indireta de Prompt (Injeção de Prompt entre Domínios)**

**Injeção Indireta de Prompt** representa uma das vulnerabilidades mais críticas em sistemas de IA habilitados para MCP. Atacantes incorporam instruções maliciosas dentro de conteúdos externos — documentos, páginas web, e-mails ou fontes de dados — que sistemas de IA processam posteriormente como comandos legítimos.

**Cenários de Ataque:**
- **Injeção baseada em documentos**: instruções maliciosas ocultas em documentos processados que disparam ações não intencionadas da IA
- **Exploração de conteúdo web**: páginas comprometidas contendo prompts incorporados que manipulam o comportamento da IA quando raspadas
- **Ataques via e-mail**: prompts maliciosos em e-mails que fazem assistentes de IA vazarem informações ou realizarem ações não autorizadas
- **Contaminação de fontes de dados**: bancos de dados ou APIs comprometidas que fornecem conteúdo contaminado a sistemas de IA

**Impacto no Mundo Real**: Esses ataques podem resultar em exfiltração de dados, vazamento de privacidade, geração de conteúdos nocivos e manipulação das interações do usuário. Para análise detalhada, veja [Prompt Injection em MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagrama de Ataque de Injeção de Prompt](../../../translated_images/pt-BR/prompt-injection.ed9fbfde297ca877.webp)

#### **Ataques de Envenenamento de Ferramentas**

**Envenenamento de Ferramentas** mira os metadados que definem as ferramentas MCP, explorando como grandes modelos de linguagem (LLMs) interpretam descrições e parâmetros das ferramentas para decisões de execução.

**Mecanismos de Ataque:**
- **Manipulação de Metadados**: Injeção de instruções maliciosas em descrições de ferramentas, definições de parâmetros ou exemplos de uso
- **Instruções Invisíveis**: Prompts ocultos em metadados de ferramentas processados pelos modelos de IA mas invisíveis ao usuário humano
- **Modificação Dinâmica de Ferramentas ("Rug Pulls")**: Ferramentas aprovadas pelos usuários são depois modificadas para executar ações maliciosas sem conhecimento do usuário
- **Injeção de Parâmetros**: Conteúdo malicioso embutido nos esquemas de parâmetros da ferramenta que influenciam o comportamento do modelo

**Riscos em Servidores Hospedados**: Servidores MCP remotos apresentam riscos elevados, pois definições de ferramentas podem ser atualizadas após aprovação inicial do usuário, criando cenários onde ferramentas previamente seguras tornam-se maliciosas. Para análise completa, consulte [Ataques de Envenenamento de Ferramentas (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagrama de Ataque de Injeção de Ferramenta](../../../translated_images/pt-BR/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vetores de Ataque Adicionais de IA**

- **Injeção de Prompt entre Domínios (XPIA)**: ataques sofisticados que utilizam conteúdo de múltiplos domínios para contornar controles de segurança
- **Modificação Dinâmica de Capacidades**: Alterações em tempo real nas capacidades da ferramenta que escapam das avaliações de segurança iniciais  
- **Envenenamento da Janela de Contexto**: Ataques que manipulam grandes janelas de contexto para ocultar instruções maliciosas  
- **Ataques de Confusão de Modelo**: Exploração das limitações do modelo para criar comportamentos imprevisíveis ou inseguros  


### Impacto dos Riscos de Segurança em IA

**Consequências de Alto Impacto:**  
- **Exfiltração de Dados**: Acesso não autorizado e roubo de dados sensíveis empresariais ou pessoais  
- **Violação de Privacidade**: Exposição de informações pessoalmente identificáveis (PII) e dados confidenciais de negócios  
- **Manipulação de Sistemas**: Modificações não intencionais em sistemas críticos e fluxos de trabalho  
- **Roubo de Credenciais**: Comprometimento de tokens de autenticação e credenciais de serviço  
- **Movimentação Lateral**: Uso de sistemas de IA comprometidos como pivôs para ataques mais amplos na rede  

### Soluções de Segurança em IA da Microsoft

#### **Escudos de Prompt de IA: Proteção Avançada Contra Ataques de Injeção**

Os **Escudos de Prompt de IA** da Microsoft fornecem defesa abrangente contra ataques de injeção de prompt diretos e indiretos por meio de múltiplas camadas de segurança:

##### **Mecanismos Centrais de Proteção:**

1. **Detecção e Filtragem Avançadas**  
   - Algoritmos de aprendizado de máquina e técnicas de PLN detectam instruções maliciosas em conteúdo externo  
   - Análise em tempo real de documentos, páginas web, e-mails e fontes de dados para ameaças embutidas  
   - Compreensão contextual de padrões de prompt legítimos versus maliciosos  

2. **Técnicas de Spotlighting**  
   - Distingue entre instruções do sistema confiáveis e entradas externas potencialmente comprometidas  
   - Métodos de transformação de texto que aumentam a relevância do modelo enquanto isolam conteúdo malicioso  
   - Auxilia sistemas de IA a manter hierarquia apropriada de instruções e ignorar comandos injetados  

3. **Sistemas de Delimitadores e Marcação de Dados**  
   - Definição explícita de fronteira entre mensagens do sistema confiáveis e texto de entrada externo  
   - Marcadores especiais destacam os limites entre fontes de dados confiáveis e não confiáveis  
   - Separação clara evita confusão de instrução e execução não autorizada de comandos  

4. **Inteligência Contínua de Ameaças**  
   - A Microsoft monitora continuamente padrões emergentes de ataques e atualiza defesas  
   - Caça proativa a ameaças para novas técnicas de injeção e vetores de ataque  
   - Atualizações regulares dos modelos de segurança para manter eficácia contra ameaças em evolução  

5. **Integração com Azure Content Safety**  
   - Parte da suíte abrangente Azure AI Content Safety  
   - Detecção adicional para tentativas de jailbreak, conteúdo prejudicial e violações de políticas de segurança  
   - Controles de segurança unificados em componentes de aplicações de IA  

**Recursos de Implementação**: [Documentação Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/pt-BR/prompt-shield.ff5b95be76e9c78c.webp)  


## Ameaças Avançadas de Segurança MCP

### Vulnerabilidades de Sequestro de Sessão

**Sequestro de sessão** representa um vetor de ataque crítico em implementações MCP com estado, onde partes não autorizadas obtêm e abusam de identificadores legítimos de sessão para se passar por clientes e realizar ações não autorizadas.

#### **Cenários de Ataque e Riscos**

- **Injeção de Prompt via Sequestro de Sessão**: Ataques com IDs de sessão roubados injetam eventos maliciosos em servidores que compartilham estado da sessão, potencialmente disparando ações nocivas ou acessando dados sensíveis  
- **Impersonação Direta**: IDs de sessão roubados permitem chamadas diretas ao servidor MCP que ignoram autenticação, tratando atacantes como usuários legítimos  
- **Streams Resumíveis Comprometidas**: Atacantes podem terminar solicitações prematuramente, fazendo clientes legítimos retomar com conteúdo possivelmente malicioso  

#### **Controles de Segurança para Gerenciamento de Sessão**

**Requisitos Críticos:**  
- **Verificação de Autorização**: Servidores MCP que implementam autorização **DEVEM** verificar TODAS as requisições recebidas e **NÃO DEVEM** confiar em sessões para autenticação  
- **Geração de Sessão Segura**: Utilize IDs de sessão criptograficamente seguros e não determinísticos, gerados com geradores de números aleatórios seguros  
- **Vinculação Específica de Usuário**: Vincule IDs de sessão às informações específicas do usuário utilizando formatos como `<user_id>:<session_id>` para evitar abuso cruzado de sessões  
- **Gerenciamento do Ciclo de Vida da Sessão**: Implemente expiração, rotação e invalidação apropriadas para limitar janelas de vulnerabilidade  
- **Segurança no Transporte**: HTTPS obrigatório para toda comunicação a fim de impedir interceptação dos IDs de sessão  

### Problema do Procurador Confuso

O **problema do procurador confuso** ocorre quando servidores MCP atuam como proxies de autenticação entre clientes e serviços de terceiros, criando oportunidades para bypass de autorização por meio da exploração de IDs estáticos de cliente.

#### **Mecânica do Ataque e Riscos**

- **Bypass de Consentimento Baseado em Cookie**: Autenticação prévia do usuário cria cookies de consentimento que atacantes exploram com requisições de autorização maliciosas contendo URIs de redirecionamento forjadas  
- **Roubo de Código de Autorização**: Cookies de consentimento existentes podem fazer servidores de autorização pularem telas de consentimento, redirecionando códigos para endpoints controlados pelo atacante  
- **Acesso Não Autorizado à API**: Códigos de autorização roubados permitem troca de tokens e impersonação de usuários sem aprovação explícita  

#### **Estratégias de Mitigação**

**Controles Obrigatórios:**  
- **Requisitos de Consentimento Explícito**: Servidores proxy MCP que usam IDs estáticos de cliente **DEVEM** obter consentimento do usuário para cada cliente registrado dinamicamente  
- **Implementação de Segurança OAuth 2.1**: Siga as melhores práticas atuais de segurança OAuth, incluindo PKCE (Proof Key for Code Exchange) para todas as requisições de autorização  
- **Validação Rigorosa do Cliente**: Implemente validação rigorosa de URIs de redirecionamento e identificadores de cliente para evitar exploração  

### Vulnerabilidades de Passagem de Token  

**Passagem de token** representa um antipadrão explícito onde servidores MCP aceitam tokens do cliente sem validação adequada e os encaminham para APIs downstream, violando as especificações de autorização MCP.

#### **Implicações de Segurança**

- **Circunvenção do Controle**: Uso direto de tokens cliente-para-API ignora controles críticos de limitação de taxa, validação e monitoramento  
- **Corrupção do Rastro de Auditoria**: Tokens emitidos a montante tornam impossível identificar o cliente, quebrando capacidades de investigação de incidentes  
- **Exfiltração de Dados via Proxy**: Tokens não validados permitem atores maliciosos usarem servidores como proxies para acesso não autorizado a dados  
- **Violação dos Limites de Confiança**: Serviços downstream podem ter suas suposições de confiança violadas quando a origem do token não pode ser verificada  
- **Expansão de Ataques Multisserviço**: Tokens comprometidos aceitos por múltiplos serviços permitem movimentação lateral  

#### **Controles de Segurança Exigidos**

**Requisitos Inegociáveis:**  
- **Validação de Token**: Servidores MCP **NÃO DEVEM** aceitar tokens não emitidos explicitamente para o servidor MCP  
- **Verificação do Público-alvo**: Sempre valide se as reivindicações de público do token correspondem à identidade do servidor MCP  
- **Ciclo de Vida Adequado do Token**: Implemente tokens de acesso de vida curta com práticas seguras de rotação  

## Segurança da Cadeia de Suprimentos para Sistemas de IA

A segurança da cadeia de suprimentos evoluiu além das dependências tradicionais de software para englobar todo o ecossistema de IA. Implementações modernas de MCP devem verificar e monitorar rigorosamente todos os componentes relacionados à IA, pois cada um introduz potenciais vulnerabilidades que podem comprometer a integridade do sistema.

### Componentes Expandidos da Cadeia de Suprimentos de IA

**Dependências Tradicionais de Software:**  
- Bibliotecas e frameworks open-source  
- Imagens de container e sistemas base  
- Ferramentas de desenvolvimento e pipelines de build  
- Componentes e serviços de infraestrutura  

**Elementos Específicos da Cadeia de Suprimentos de IA:**  
- **Modelos Fundacionais**: Modelos pré-treinados de diversos provedores que requerem verificação de procedência  
- **Serviços de Embedding**: Serviços externos de vetorização e busca semântica  
- **Provedores de Contexto**: Fontes de dados, bases de conhecimento e repositórios de documentos  
- **APIs de Terceiros**: Serviços de IA externos, pipelines de ML e endpoints de processamento de dados  
- **Artefatos de Modelos**: Pesos, configurações e variantes de modelos fine-tuned  
- **Fontes de Dados de Treinamento**: Conjuntos de dados usados para treinamento e fine-tuning  

### Estratégia Abrangente de Segurança da Cadeia de Suprimentos

#### **Verificação de Componentes e Confiança**  
- **Validação de Procedência**: Verifique origem, licenciamento e integridade de todos os componentes de IA antes da integração  
- **Avaliação de Segurança**: Realize varreduras de vulnerabilidades e revisões de segurança para modelos, fontes de dados e serviços de IA  
- **Análise de Reputação**: Avalie o histórico de segurança e as práticas dos provedores de serviços de IA  
- **Verificação de Conformidade**: Garanta que todos os componentes atendam aos requisitos organizacionais de segurança e regulatórios  

#### **Pipelines de Implantação Seguros**  
- **Segurança CI/CD Automatizada**: Integre varredura de segurança em todos os pipelines automatizados de implantação  
- **Integridade dos Artefatos**: Implemente verificação criptográfica para todos os artefatos implantados (código, modelos, configurações)  
- **Implantação em Estágios**: Use estratégias progressivas de implantação com validação de segurança em cada etapa  
- **Repositórios de Artefatos Confiáveis**: Implemente a partir de registros e repositórios de artefatos verificados e seguros  

#### **Monitoramento Contínuo e Resposta**  
- **Varredura de Dependências**: Monitoramento contínuo de vulnerabilidades para todas as dependências de software e componentes de IA  
- **Monitoramento de Modelos**: Avaliação contínua do comportamento do modelo, deriva de desempenho e anomalias de segurança  
- **Monitoramento da Saúde dos Serviços**: Acompanhe serviços de IA externos quanto a disponibilidade, incidentes e mudanças de política  
- **Integração de Inteligência de Ameaças**: Incorpore feeds de ameaça específicos para riscos de segurança em IA e ML  

#### **Controle de Acesso e Privilégio Mínimo**  
- **Permissões por Componente**: Restrinja acesso a modelos, dados e serviços com base na necessidade de negócio  
- **Gerenciamento de Contas de Serviço**: Implementação de contas de serviço dedicadas com permissões mínimas necessárias  
- **Segmentação de Rede**: Isole componentes de IA e limite o acesso de rede entre serviços  
- **Controles de Gateway de API**: Utilize gateways de API centralizados para controlar e monitorar o acesso a serviços externos de IA  

#### **Resposta a Incidentes e Recuperação**  
- **Procedimentos de Resposta Rápida**: Processos estabelecidos para corrigir ou substituir componentes de IA comprometidos  
- **Rotação de Credenciais**: Sistemas automatizados para rotacionar segredos, chaves de API e credenciais de serviço  
- **Capacidades de Reversão**: Habilidade para reverter rapidamente a versões anteriores conhecidas e estáveis dos componentes de IA  
- **Recuperação de Violação na Cadeia de Suprimentos**: Procedimentos específicos para responder a compromissos em serviços de IA upstream  

### Ferramentas de Segurança e Integração Microsoft

**GitHub Advanced Security** oferece proteção completa da cadeia de suprimentos incluindo:  
- **Varredura de Segredos**: Detecção automática de credenciais, chaves de API e tokens em repositórios  
- **Varredura de Dependências**: Avaliação de vulnerabilidades para dependências e bibliotecas open-source  
- **Análise CodeQL**: Análise estática de código para vulnerabilidades de segurança e problemas de codificação  
- **Insights da Cadeia de Suprimentos**: Visibilidade sobre a saúde e o status de segurança das dependências  

**Integração com Azure DevOps & Azure Repos:**  
- Integração fluida de varredura de segurança em plataformas de desenvolvimento Microsoft  
- Verificações automáticas de segurança em Azure Pipelines para workloads de IA  
- Aplicação de políticas para implantação segura de componentes de IA  

**Práticas Internas Microsoft:**  
A Microsoft implementa práticas extensivas de segurança da cadeia de suprimentos em todos os produtos. Saiba mais em [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Melhores Práticas de Segurança Fundamental

Implementações MCP herdam e constroem sobre a postura de segurança existente da sua organização. O fortalecimento das práticas fundamentais de segurança melhora significativamente a segurança geral dos sistemas de IA e implantações MCP.

### Fundamentos Centrais de Segurança

#### **Práticas Seguras de Desenvolvimento**  
- **Conformidade OWASP**: Proteção contra vulnerabilidades web listadas em [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Proteções Específicas para IA**: Implementação de controles para [OWASP Top 10 para LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Gerenciamento Seguro de Segredos**: Uso de cofres dedicados para tokens, chaves API e dados sensíveis de configuração  
- **Criptografia de Ponta a Ponta**: Comunicação segura entre todos os componentes da aplicação e fluxos de dados  
- **Validação de Entrada**: Validação rigorosa de todas as entradas de usuário, parâmetros de API e fontes de dados  

#### **Fortalecimento da Infraestrutura**  
- **Autenticação Multifator**: MFA obrigatório para todas as contas administrativas e de serviço  
- **Gerenciamento de Patches**: Aplicação automatizada e tempestiva de patches para sistemas operacionais, frameworks e dependências  
- **Integração de Provedor de Identidade**: Gerenciamento centralizado de identidade através de provedores corporativos (Microsoft Entra ID, Active Directory)  
- **Segmentação de Rede**: Isolamento lógico dos componentes MCP para limitar o potencial de movimentação lateral  
- **Princípio do Menor Privilégio**: Permissões mínimas necessárias para todos os componentes e contas do sistema  

#### **Monitoramento e Detecção de Segurança**  
- **Registro Abrangente**: Logs detalhados das atividades das aplicações de IA, incluindo interações cliente-servidor MCP  
- **Integração SIEM**: Gerenciamento centralizado de informações e eventos de segurança para detecção de anomalias  
- **Análise Comportamental**: Monitoramento com suporte de IA para detectar padrões incomuns no comportamento do sistema e do usuário  
- **Inteligência de Ameaças**: Integração de feeds externos de ameaças e indicadores de compromisso (IOCs)  
- **Resposta a Incidentes**: Procedimentos bem definidos para detecção, resposta e recuperação de incidentes de segurança  

#### **Arquitetura Zero Trust**  
- **Nunca Confie, Sempre Verifique**: Verificação contínua de usuários, dispositivos e conexões de rede  
- **Micro-Segmentação**: Controles granulares de rede que isolam cargas de trabalho e serviços individuais  
- **Segurança Centrada na Identidade**: Políticas de segurança baseadas em identidades verificadas ao invés de localização de rede  
- **Avaliação Contínua de Risco**: Avaliação dinâmica da postura de segurança baseada no contexto e comportamento atuais  
- **Acesso Condicional**: Controles de acesso que se adaptam a fatores de risco, localização e confiança do dispositivo  

### Padrões de Integração Empresarial

#### **Integração no Ecossistema de Segurança Microsoft**  
- **Microsoft Defender for Cloud**: Gerenciamento abrangente da postura de segurança na nuvem  
- **Azure Sentinel**: SIEM e SOAR nativos na nuvem para proteção de workloads de IA  
- **Microsoft Entra ID**: Gerenciamento corporativo de identidade e acesso com políticas de acesso condicional  
- **Azure Key Vault**: Gerenciamento centralizado de segredos com hardware de segurança (HSM)  
- **Microsoft Purview**: Governança e conformidade de dados para fontes de dados e fluxos de trabalho de IA  

#### **Conformidade e Governança**  
- **Alinhamento Regulatórios**: Garantia que implementações MCP atendem requisitos específicos de conformidade (GDPR, HIPAA, SOC 2)  
- **Classificação de Dados**: Categorização e tratamento adequado dos dados sensíveis processados por sistemas de IA  
- **Traços de Auditoria**: Logging abrangente para conformidade regulatória e investigação forense  
- **Controles de Privacidade**: Implementação de princípios de privacy-by-design na arquitetura dos sistemas de IA  
- **Gerenciamento de Mudanças**: Processos formais para revisões de segurança em modificações do sistema de IA  

Essas práticas fundamentais criam uma linha base robusta de segurança que aumenta a eficácia dos controles específicos MCP e proporciona proteção abrangente para aplicações movidas a IA.

## Principais Mensagens de Segurança
- **Abordagem de Segurança em Camadas**: Combine práticas fundamentais de segurança (codificação segura, privilégio mínimo, verificação da cadeia de suprimentos, monitoramento contínuo) com controles específicos para IA para proteção abrangente

- **Panorama de Ameaças Específicas para IA**: Sistemas MCP enfrentam riscos únicos, incluindo injeção de prompt, envenenamento de ferramentas, sequestro de sessão, problemas de delegado confuso, vulnerabilidades de passagem de token e permissões excessivas que exigem mitigações especializadas

- **Excelência em Autenticação e Autorização**: Implemente autenticação robusta usando provedores de identidade externos (Microsoft Entra ID), aplique validação adequada de tokens e nunca aceite tokens que não sejam explicitamente emitidos para seu servidor MCP

- **Prevenção de Ataques à IA**: Implante Microsoft Prompt Shields e Azure Content Safety para defender contra ataques indiretos de injeção de prompt e envenenamento de ferramentas, enquanto valida metadados das ferramentas e monitora alterações dinâmicas

- **Segurança de Sessão e Transporte**: Use IDs de sessão criptograficamente seguros e não determinísticos vinculados às identidades dos usuários, implemente gerenciamento adequado do ciclo de vida da sessão e nunca use sessões para autenticação

- **Melhores Práticas de Segurança OAuth**: Previna ataques de delegado confuso por meio de consentimento explícito do usuário para clientes registrados dinamicamente, implementação correta do OAuth 2.1 com PKCE e validação rigorosa de URI de redirecionamento  

- **Princípios de Segurança de Tokens**: Evite antipadrões de passagem de token, valide as claims de audiência do token, implemente tokens de curta duração com rotação segura e mantenha limites claros de confiança

- **Segurança Abrangente da Cadeia de Suprimentos**: Trate todos os componentes do ecossistema de IA (modelos, embeddings, provedores de contexto, APIs externas) com o mesmo rigor de segurança que dependências tradicionais de software

- **Evolução Contínua**: Mantenha-se atualizado com as especificações MCP em rápida evolução, contribua para padrões da comunidade de segurança e mantenha posturas de segurança adaptativas conforme o protocolo amadurece

- **Integração com Segurança Microsoft**: Aproveite o ecossistema abrangente de segurança da Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) para proteção aprimorada da implantação MCP

## Recursos Abrangentes

### **Documentação Oficial de Segurança MCP**
- [Especificação MCP (Atual: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificação de Autorização MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositório MCP no GitHub](https://github.com/modelcontextprotocol)

### **Recursos de Segurança OWASP MCP**
- [Guia de Segurança Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Guia abrangente OWASP MCP Top 10 com orientações de implementação no Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscos oficiais de segurança MCP OWASP
- [Workshop Security Summit MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Treinamento prático de segurança para MCP no Azure

### **Padrões e Melhores Práticas de Segurança**
- [Melhores Práticas de Segurança OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 de Segurança para Aplicações Web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 para Grandes Modelos de Linguagem](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Relatório Microsoft de Defesa Digital](https://aka.ms/mddr)

### **Pesquisa e Análise de Segurança em IA**
- [Injeção de Prompt em MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Ataques de Envenenamento de Ferramentas (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing de Pesquisa de Segurança MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluções de Segurança Microsoft**
- [Documentação Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Serviço Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Segurança Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Melhores Práticas de Gerenciamento de Tokens Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guias de Implementação e Tutoriais**
- [Gerenciamento de API Azure como Gateway de Autenticação MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autenticação Microsoft Entra ID com Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Armazenamento e Criptografia Segura de Tokens (Vídeo)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps e Segurança da Cadeia de Suprimentos**
- [Segurança Azure DevOps](https://azure.microsoft.com/products/devops)
- [Segurança Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Jornada de Segurança da Cadeia de Suprimentos Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentação Adicional de Segurança**

Para orientações de segurança abrangentes, consulte estes documentos especializados nesta seção:

- **[Melhores Práticas de Segurança MCP 2025](./mcp-security-best-practices-2025.md)** - Práticas completas de segurança para implementações MCP
- **[Implementação Azure Content Safety](./azure-content-safety-implementation.md)** - Exemplos práticos de implementação para integração Azure Content Safety  
- **[Controles de Segurança MCP 2025](./mcp-security-controls-2025.md)** - Controles e técnicas de segurança mais recentes para implantações MCP
- **[Referência Rápida de Melhores Práticas MCP](./mcp-best-practices.md)** - Guia de referência rápida para práticas essenciais de segurança MCP
- **[BlueHat 2026: Protegendo o futuro da IA: Protegendo MCP com padrões de defesa em profundidade](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Padrões de defesa em profundidade do Microsoft Security Response Center (MSRC)

### **Treinamento Prático de Segurança**

- **[Workshop Security Summit MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop prático abrangente para proteger servidores MCP no Azure com campos progressivos de Base Camp ao Summit
- **[Guia de Segurança Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Arquitetura de referência e orientações de implementação para todos os riscos OWASP MCP Top 10

---

## O que vem a seguir

Próximo: [Capítulo 3: Começando](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->