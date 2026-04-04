# Segurança MCP: Proteção Abrangente para Sistemas de IA

[![MCP Security Best Practices](../../../translated_images/pt-PT/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Clique na imagem acima para ver o vídeo desta lição)_

A segurança é fundamental para o design de sistemas de IA, razão pela qual a priorizamos como a nossa segunda secção. Isto está alinhado com o princípio **Secure by Design** da Microsoft, do [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

O Model Context Protocol (MCP) traz capacidades poderosas para aplicações impulsionadas por IA, ao mesmo tempo que introduz desafios únicos de segurança que vão além dos riscos tradicionais de software. Os sistemas MCP enfrentam tanto preocupações de segurança estabelecidas (codificação segura, privilégio mínimo, segurança da cadeia de fornecimento) como novas ameaças específicas de IA, incluindo injeção de prompt, envenenamento de ferramentas, sequestro de sessão, ataques de procurador confundido, vulnerabilidades de passagem de token e modificação dinâmica de capacidades.

Esta lição explora os riscos de segurança mais críticos em implementações MCP—abrangendo autenticação, autorização, permissões excessivas, injeção indireta de prompt, segurança de sessão, problemas de procurador confundido, gestão de tokens e vulnerabilidades da cadeia de fornecimento. Irá aprender controlos e melhores práticas acionáveis para mitigar estes riscos enquanto aproveita soluções Microsoft como Prompt Shields, Azure Content Safety e GitHub Advanced Security para fortalecer a sua implementação MCP.

## Objetivos de Aprendizagem

No final desta lição, será capaz de:

- **Identificar Ameaças Específicas MCP**: Reconhecer riscos de segurança únicos em sistemas MCP incluindo injeção de prompt, envenenamento de ferramentas, permissões excessivas, sequestro de sessão, problemas de procurador confundido, vulnerabilidades de passagem de token e riscos da cadeia de fornecimento
- **Aplicar Controlos de Segurança**: Implementar mitigações eficazes incluindo autenticação robusta, acesso de privilégio mínimo, gestão segura de tokens, controlos de segurança de sessão e verificação da cadeia de fornecimento
- **Aproveitar Soluções de Segurança Microsoft**: Compreender e implementar Microsoft Prompt Shields, Azure Content Safety e GitHub Advanced Security para proteção da carga de trabalho MCP
- **Validar a Segurança das Ferramentas**: Reconhecer a importância da validação de metadados das ferramentas, monitorização de alterações dinâmicas e defesa contra ataques indiretos de injeção de prompt
- **Integrar Melhores Práticas**: Combinar fundamentos de segurança estabelecidos (codificação segura, reforço do servidor, zero trust) com controlos específicos MCP para proteção abrangente

# Arquitetura e Controlos de Segurança MCP

As implementações modernas do MCP requerem abordagens de segurança em camadas que abordem tanto a segurança tradicional de software como as ameaças específicas de IA. A especificação MCP em rápida evolução continua a amadurecer os seus controlos de segurança, possibilitando melhor integração com arquiteturas de segurança empresariais e melhores práticas estabelecidas.

Investigação do [Microsoft Digital Defense Report](https://aka.ms/mddr) demonstra que **98% das violações reportadas seriam prevenidas com uma higiene de segurança robusta**. A estratégia de proteção mais eficaz combina práticas de segurança fundamentais com controlos específicos MCP—medidas de segurança base comprovadas continuam a ser as mais impactantes na redução global do risco de segurança.

## Panorama Atual de Segurança

> **Nota:** Esta informação reflete os padrões de segurança MCP a partir de **5 de fevereiro de 2026**, alinhada com a **Especificação MCP 2025-11-25**. O protocolo MCP continua a evoluir rapidamente, e implementações futuras podem introduzir novos padrões de autenticação e controlos aprimorados. Consulte sempre a [Especificação MCP](https://spec.modelcontextprotocol.io/), o [repositório MCP no GitHub](https://github.com/modelcontextprotocol) e a [documentação de melhores práticas de segurança](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) para as orientações mais recentes.

## 🏔️ Workshop MCP Security Summit (Sherpa)

Para **formação prática em segurança**, recomendamos vivamente o **MCP Security Summit Workshop** (Sherpa) — uma expedição guiada abrangente para garantir servidores MCP no Microsoft Azure.

### Visão Geral do Workshop

O [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) fornece formação prática e acionável em segurança através de uma metodologia comprovada "vulnerável → explorar → corrigir → validar". Irá:

- **Aprender a partir de Corrupções**: Experienciar vulnerabilidades na prática explorando servidores intencionalmente inseguros
- **Usar Segurança Nativa Azure**: Aproveitar Azure Entra ID, Key Vault, API Management e AI Content Safety
- **Seguir Defesa em Profundidade**: Progredir por acampamentos construindo camadas de segurança abrangentes
- **Aplicar Normas OWASP**: Cada técnica mapeia para o [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obter Código de Produção**: Sai com implementações funcionais e testadas

### Roteiro da Expedição

| Acampamento | Foco | Riscos OWASP Cobertos |
|-------------|-------|---------------------|
| **Acampamento Base** | Fundamentos MCP & vulnerabilidades de autenticação | MCP01, MCP07 |
| **Acampamento 1: Identidade** | OAuth 2.1, Identidade Gerida Azure, Key Vault | MCP01, MCP02, MCP07 |
| **Acampamento 2: Gateway** | API Management, Endpoints Privados, governação | MCP02, MCP07, MCP09 |
| **Acampamento 3: Segurança I/O** | Injeção de prompt, proteção PII, segurança de conteúdo | MCP03, MCP05, MCP06 |
| **Acampamento 4: Monitorização** | Log Analytics, dashboards, deteção de ameaças | MCP08 |
| **O Cume** | Teste de integração Red Team / Blue Team | Todos |

**Comece já:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Riscos de Segurança

O [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) detalha os dez riscos de segurança mais críticos para implementações MCP:

| Risco | Descrição | Mitigação Azure |
|-------|-----------|-----------------|
| **MCP01** | Má Gestão de Tokens & Exposição de Segredos | Azure Key Vault, Identidade Gerida |
| **MCP02** | Escalada de Privilégios via Ampliação de Escopos | RBAC, Acesso Condicional |
| **MCP03** | Envenenamento de Ferramentas | Validação das ferramentas, verificação de integridade |
| **MCP04** | Ataques à Cadeia de Fornecimento | GitHub Advanced Security, análise de dependências |
| **MCP05** | Injeção e Execução de Comandos | Validação de entrada, sandboxing |
| **MCP06** | Injeção de Prompt via Payloads Contextuais | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autenticação e Autorização Insuficientes | Azure Entra ID, OAuth 2.1 com PKCE |
| **MCP08** | Falta de Auditoria & Telemetria | Azure Monitor, Application Insights |
| **MCP09** | Servidores MCP Sombra | Governação API Center, isolamento de rede |
| **MCP10** | Injeção de Contexto & Exposição Excessiva | Classificação de dados, exposição mínima |

### Evolução da Autenticação MCP

A especificação MCP evoluiu significativamente na sua abordagem à autenticação e autorização:

- **Abordagem Original**: Especificações iniciais exigiam que os programadores implementassem servidores de autenticação personalizados, com servidores MCP atuando como Servidores OAuth 2.0 a gerir autenticação de utilizadores diretamente
- **Padrão Atual (2025-11-25)**: Especificação atualizada permite que servidores MCP deleguem autenticação a fornecedores de identidade externos (como Microsoft Entra ID), melhorando a postura de segurança e reduzindo a complexidade de implementação
- **Segurança da Camada de Transporte**: Suporte aprimorado para mecanismos de transporte seguro com padrões de autenticação adequados para ligações locais (STDIO) e remotas (Streamable HTTP)

## Segurança na Autenticação & Autorização

### Desafios de Segurança Atuais

Implementações modernas MCP enfrentam vários desafios de autenticação e autorização:

### Riscos & Vetores de Ameaça

- **Lógica de Autorização Mal Configurada**: Implementação incorreta da autorização em servidores MCP pode expor dados sensíveis e aplicar controlos de acesso incorretos
- **Comprometimento do Token OAuth**: Roubo de tokens do servidor MCP local permite que atacantes se façam passar pelos servidores e acedam a serviços a jusante
- **Vulnerabilidades de Passagem de Token**: Gestão inadequada de tokens cria contornos em controlos de segurança e lacunas na responsabilização
- **Permissões Excessivas**: Servidores MCP com privilégios excessivos violam o princípio de privilégio mínimo e expandem superfícies de ataque

#### Passagem de Token: Um Anti-Padrão Crítico

**A passagem de token é explicitamente proibida** na especificação atual de autorização MCP devido a graves implicações de segurança:

##### Contorno de Controlos de Segurança  
- Servidores MCP e APIs a jusante implementam controlos críticos de segurança (limitação de taxa, validação de pedidos, monitorização de tráfego) que dependem de validação adequada dos tokens  
- Uso direto do token do cliente para API contorna estas proteções essenciais, comprometendo a arquitetura de segurança

##### Desafios de Responsabilização & Auditoria  
- Servidores MCP não conseguem distinguir entre clientes que usam tokens emitidos a montante, quebrando as trilhas de auditoria  
- Registos do servidor de recursos a jusante mostram origens de pedidos enganosas, em vez dos intermediários servidores MCP reais  
- Investigação de incidentes e auditoria de conformidade tornam-se significativamente mais difíceis

##### Riscos de Exfiltração de Dados  
- Declarações de tokens não validadas permitem a atores maliciosos com tokens roubados usar servidores MCP como proxies para exfiltração de dados  
- Violações do limite de confiança possibilitam padrões de acesso não autorizados que contornam controlos de segurança pretendidos

##### Vetores de Ataque Multi-Serviço  
- Tokens comprometidos aceites por múltiplos serviços permitem movimentos laterais através de sistemas ligados  
- Suposições de confiança entre serviços podem ser violadas quando a origem dos tokens não pode ser verificada

### Controlos de Segurança & Mitigações

**Requisitos Críticos de Segurança:**

> **OBRIGATÓRIO**: Servidores MCP **NÃO DEVEM** aceitar quaisquer tokens que não tenham sido explicitamente emitidos para o servidor MCP

#### Controlos de Autenticação e Autorização

- **Revisão Rigorosa de Autorização**: Realizar auditorias completas da lógica de autorização do servidor MCP para garantir que apenas utilizadores e clientes pretendidos possam aceder a recursos sensíveis  
  - **Guia de Implementação**: [Azure API Management como Gateway de Autenticação para Servidores MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Integração de Identidade**: [Uso do Microsoft Entra ID para Autenticação de Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestão Segura de Tokens**: Implementar as [melhores práticas Microsoft para validação e ciclo de vida de tokens](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Validar declarações de audiência do token que correspondam à identidade do servidor MCP  
  - Implementar políticas adequadas de rotação e expiração de tokens  
  - Prevenir ataques de repetição e uso não autorizado do token

- **Armazenamento Protegido de Tokens**: Armazenar tokens de forma segura com cifragem em repouso e em trânsito  
  - **Melhores Práticas**: [Diretrizes para Armazenamento Seguro de Tokens e Cifragem](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementação do Controlo de Acesso

- **Princípio do Privilégio Mínimo**: Conceder aos servidores MCP apenas as permissões mínimas necessárias para a funcionalidade pretendida  
  - Revisões regulares de permissões e atualizações para prevenir escalada de privilégios  
  - **Documentação Microsoft**: [Acesso Seguro com Privilégios Mínimos](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Controlo de Acesso Baseado em Funções (RBAC)**: Implementar atribuições de função finamente granulares  
  - Limitar estritamente as funções a recursos e ações específicas  
  - Evitar permissões amplas ou desnecessárias que expandam superfícies de ataque

- **Monitorização Contínua de Permissões**: Implementar auditoria e monitorização de acesso contínuas  
  - Monitorizar padrões de uso de permissões em busca de anomalias  
  - Remediar prontamente privilégios excessivos ou não utilizados

## Ameaças de Segurança Específicas de IA

### Ataques de Injeção de Prompt & Manipulação de Ferramentas

Implementações MCP modernas enfrentam vetores de ataque sofisticados específicos de IA que as medidas tradicionais de segurança não conseguem cobrir totalmente:

#### **Injeção Indireta de Prompt (Injeção Cross-Domain de Prompt)**

**Injeção Indireta de Prompt** representa uma das vulnerabilidades mais críticas em sistemas de IA habilitados para MCP. Atacantes incorporam instruções maliciosas dentro de conteúdos externos—documentos, páginas web, emails ou fontes de dados—que os sistemas de IA subsequentemente processam como comandos legítimos.

**Cenários de Ataque:**  
- **Injeção baseada em Documento**: Instruções maliciosas escondidas em documentos processados que desencadeiam ações indesejadas de IA  
- **Exploitação de Conteúdo Web**: Páginas web comprometidas contendo prompts incorporados que manipulam o comportamento da IA quando raspados  
- **Ataques baseados em Email**: Prompts maliciosos em emails que fazem assistentes IA fugirem informações ou executarem ações não autorizadas  
- **Contaminação de Fontes de Dados**: Bases de dados ou APIs comprometidos que fornecem conteúdos contaminados a sistemas de IA

**Impacto Real**: Estes ataques podem resultar em exfiltração de dados, violação de privacidade, geração de conteúdo nocivo e manipulação das interações do utilizador. Para análise detalhada, consulte [Prompt Injection em MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/pt-PT/prompt-injection.ed9fbfde297ca877.webp)

#### **Ataques de Envenenamento de Ferramentas**

**Envenenamento de Ferramentas** visa os metadados que definem ferramentas MCP, explorando como LLMs interpretam descrições e parâmetros das ferramentas para tomar decisões de execução.

**Mecanismos de Ataque:**  
- **Manipulação de Metadados**: Atacantes injetam instruções maliciosas em descrições de ferramentas, definições de parâmetros ou exemplos de utilização  
- **Instruções Invisíveis**: Prompts escondidos nos metadados das ferramentas que são processados pelos modelos de IA mas invisíveis aos utilizadores humanos  
- **Modificação Dinâmica de Ferramentas ("Rug Pulls")**: Ferramentas aprovadas pelos utilizadores são posteriormente modificadas para ações maliciosas sem o conhecimento do utilizador  
- **Injeção de Parâmetros**: Conteúdo malicioso embutido em esquemas de parâmetros da ferramenta que influenciam o comportamento do modelo

**Riscos em Servidores Hospedados**: Servidores MCP remotos apresentam riscos elevados pois as definições das ferramentas podem ser atualizadas após aprovação inicial do utilizador, criando cenários onde ferramentas previamente seguras se tornam maliciosas. Para análise abrangente, consulte [Ataques de Envenenamento de Ferramentas (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/pt-PT/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vetores de Ataque Adicionais de IA**

- **Injeção Cross-Domain de Prompt (XPIA)**: Ataques sofisticados que aproveitam conteúdo de múltiplos domínios para contornar controlos de segurança
- **Modificação Dinâmica de Capacidades**: Alterações em tempo real às capacidades da ferramenta que escapam às avaliações iniciais de segurança  
- **Envenenamento da Janela de Contexto**: Ataques que manipulam janelas de contexto amplas para ocultar instruções maliciosas  
- **Ataques de Confusão do Modelo**: Exploração das limitações do modelo para criar comportamentos imprevisíveis ou inseguros  


### Impacto do Risco de Segurança em IA

**Consequências de Alto Impacto:**  
- **Exfiltração de Dados**: Acesso não autorizado e roubo de dados sensíveis empresariais ou pessoais  
- **Quebra de Privacidade**: Exposição de informações pessoalmente identificáveis (PII) e dados empresariais confidenciais  
- **Manipulação do Sistema**: Modificações não intencionais a sistemas críticos e fluxos de trabalho  
- **Roubo de Credenciais**: Comprometimento de tokens de autenticação e credenciais de serviço  
- **Movimentação Lateral**: Uso de sistemas IA comprometidos como pivôs para ataques mais amplos na rede  

### Soluções de Segurança em IA da Microsoft

#### **Escudos de Prompt de IA: Proteção Avançada Contra Ataques de Injeção**

Os **Escudos de Prompt de IA** da Microsoft oferecem defesa abrangente contra ataques de injeção de prompt diretos e indiretos através de múltiplas camadas de segurança:

##### **Mecanismos Centrais de Proteção:**

1. **Deteção Avançada e Filtragem**  
   - Algoritmos de aprendizagem automática e técnicas de PNL detetam instruções maliciosas em conteúdos externos  
   - Análise em tempo real de documentos, páginas web, emails e fontes de dados para ameaças embutidas  
   - Compreensão contextual de padrões legítimos vs. maliciosos de prompt  

2. **Técnicas de Spotlighting**  
   - Distingue entre instruções do sistema confiáveis e entradas externas potencialmente comprometidas  
   - Métodos de transformação de texto que aumentam a relevância para o modelo enquanto isolam conteúdo malicioso  
   - Ajuda os sistemas IA a manter a hierarquia correta de instruções e ignorar comandos injetados  

3. **Sistemas de Delimitadores e Marcação de Dados**  
   - Definição explícita de limites entre mensagens do sistema confiáveis e texto de entrada externa  
   - Marcadores especiais destacam fronteiras entre fontes de dados confiáveis e não confiáveis  
   - Separação clara previne confusão nas instruções e execução não autorizada de comandos  

4. **Inteligência de Ameaças Contínua**  
   - Microsoft monitoriza continuamente padrões emergentes de ataque e atualiza as defesas  
   - Caça proativa a novas técnicas de injeção e vetores de ataque  
   - Atualizações regulares dos modelos de segurança para manter eficácia contra ameaças em evolução  

5. **Integração com Azure Content Safety**  
   - Parte da suíte abrangente Azure AI Content Safety  
   - Deteção adicional de tentativas de jailbreak, conteúdo nocivo e violações de políticas de segurança  
   - Controlo unificado da segurança em todos os componentes de aplicação IA  

**Recursos de Implementação**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/pt-PT/prompt-shield.ff5b95be76e9c78c.webp)


## Ameaças Avançadas à Segurança MCP

### Vulnerabilidades de Sequestro de Sessão

O **sequestro de sessão** representa um vetor de ataque crítico em implementações MCP com estado, onde partes não autorizadas obtêm e abusam de identificadores legítimos de sessão para se fazerem passar por clientes e executar ações não autorizadas.

#### **Cenários de Ataque e Riscos**

- **Injeção de Prompt por Sequestro de Sessão**: Atacantes com IDs de sessão roubados injetam eventos maliciosos em servidores a partilhar estado de sessão, potencialmente acionando ações nocivas ou acessando dados sensíveis  
- **Impersonação Direta**: IDs de sessão roubados permitem chamadas diretas a servidores MCP que ignoram autenticação, tratando atacantes como utilizadores legítimos  
- **Streams Reincorporáveis Comprometidos**: Atacantes podem terminar pedidos prematuramente, causando que clientes legítimos retomem com conteúdo potencialmente malicioso  

#### **Controlo de Segurança para Gestão de Sessões**

**Requisitos Críticos:**  
- **Verificação de Autorização**: Servidores MCP a implementar autorização **DEVEM** verificar TODOS os pedidos recebidos e **NÃO DEVEM** confiar em sessões para autenticação  
- **Geração Segura de Sessão**: Utilizar IDs de sessão criptograficamente seguros, não determinísticos, gerados com geradores de números aleatórios seguros  
- **Ligação Específica a Utilizadores**: Associar IDs de sessão a informações específicas do utilizador usando formatos como `<user_id>:<session_id>` para prevenir abuso cruzado de sessões  
- **Gestão do Ciclo de Vida da Sessão**: Implementar expiração, rotação e invalidação adequadas para limitar janelas de vulnerabilidade  
- **Segurança de Transporte**: Uso obrigatório de HTTPS para todas as comunicações para prevenir interceção de IDs de sessão  

### Problema do Deputado Confuso

O **problema do deputado confuso** ocorre quando servidores MCP atuam como proxies de autenticação entre clientes e serviços terceiros, criando oportunidades para bypass de autorização através da exploração de IDs de cliente estáticos.

#### **Mecânicas de Ataque e Riscos**

- **Bypass de Consentimento Baseado em Cookies**: Autenticação prévia do utilizador cria cookies de consentimento que atacantes exploram via pedidos de autorização maliciosos com URIs de redirecionamento manipuladas  
- **Roubo de Código de Autorização**: Cookies de consentimento existentes podem levar servidores de autorização a saltar as telas de consentimento, redirecionando códigos para endpoints controlados por atacantes  
- **Acesso Não Autorizado à API**: Códigos de autorização roubados permitem troca de tokens e impersonação de utilizador sem aprovação explícita  

#### **Estratégias de Mitigação**

**Controlo Obrigatório:**  
- **Requisitos Explícitos de Consentimento**: Servidores proxy MCP que usam IDs de cliente estáticos **DEVEM** obter consentimento do utilizador para cada cliente registado dinamicamente  
- **Implementação de Segurança OAuth 2.1**: Seguir as melhores práticas de segurança atuais do OAuth, incluindo PKCE (Proof Key for Code Exchange) para todos os pedidos de autorização  
- **Validação Rigorosa do Cliente**: Implementar validação rigorosa das URIs de redirecionamento e identificadores de cliente para evitar exploração  

### Vulnerabilidades de Passagem de Token

A **passagem de token** é um anti-padrão explícito onde servidores MCP aceitam tokens de clientes sem validação adequada e os encaminham para APIs a jusante, violando as especificações de autorização MCP.

#### **Implicações de Segurança**

- **Circumvenção de Controlo**: Uso direto de tokens cliente-API ignora limitações críticas de taxa, validação e monitorização  
- **Corrupção de Traço de Auditoria**: Tokens emitidos a montante tornam impossível identificar clientes, comprometendo investigações de incidentes  
- **Exfiltração de Dados por Proxy**: Tokens não validados permitem que atores maliciosos usem servidores como proxies para acesso não autorizado a dados  
- **Violações da Fronteira de Confiança**: Assunções de confiança dos serviços a jusante podem ser violadas quando a origem dos tokens não pode ser verificada  
- **Expansão de Ataques Multi-serviço**: Tokens comprometidos aceites em múltiplos serviços permitem movimentação lateral  

#### **Controlo de Segurança Necessário**

**Requisitos Inegociáveis:**  
- **Validação de Token**: Servidores MCP **NÃO DEVEM** aceitar tokens não explicitamente emitidos para o servidor MCP  
- **Verificação da Audiência**: Validar sempre que as claims de audiência do token correspondam à identidade do servidor MCP  
- **Ciclo de Vida Adequado do Token**: Implementar tokens de acesso de curta duração com práticas seguras de rotação  


## Segurança da Cadeia de Abastecimento para Sistemas IA

A segurança da cadeia de abastecimento evoluiu além das dependências tradicionais de software para abranger todo o ecossistema IA. Implementações MCP modernas devem verificar e monitorizar rigorosamente todos os componentes relacionados com IA, já que cada um introduz potenciais vulnerabilidades que podem comprometer a integridade do sistema.

### Componentes Ampliados da Cadeia de Abastecimento IA

**Dependências Tradicionais de Software:**  
- Bibliotecas e frameworks open-source  
- Imagens de containers e sistemas base  
- Ferramentas de desenvolvimento e pipelines de construção  
- Componentes e serviços de infraestrutura  

**Elementos Específicos da Cadeia de Abastecimento IA:**  
- **Modelos Fundamentais**: Modelos pré-treinados de vários fornecedores que exigem verificação de proveniência  
- **Serviços de Embedding**: Serviços externos de vetorização e pesquisa semântica  
- **Fornecedores de Contexto**: Fontes de dados, bases de conhecimento e repositórios de documentos  
- **APIs de Terceiros**: Serviços IA externos, pipelines ML e endpoints de processamento de dados  
- **Artefatos de Modelo**: Pesos, configurações e variantes de modelos ajustados  
- **Fontes de Dados de Treino**: Conjuntos de dados usados para treino e fine-tuning  

### Estratégia Abrangente de Segurança da Cadeia de Abastecimento

#### **Verificação e Confiança nos Componentes**  
- **Validação de Proveniência**: Verificar origem, licenciamento e integridade de todos os componentes IA antes da integração  
- **Avaliação de Segurança**: Realizar scans de vulnerabilidades e revisões de segurança para modelos, fontes de dados e serviços IA  
- **Análise de Reputação**: Avaliar o histórico de segurança e práticas dos fornecedores de serviços IA  
- **Verificação de Conformidade**: Garantir que todos os componentes cumprem requisitos organizacionais de segurança e regulatórios  

#### **Pipelines de Implantação Segura**  
- **Segurança CI/CD Automatizada**: Integrar scanning de segurança ao longo dos pipelines de implantação automatizados  
- **Integridade de Artefatos**: Implementar verificação criptográfica para todos os artefatos implantados (código, modelos, configurações)  
- **Implantação em Estágios**: Usar estratégias progressivas com validação de segurança em cada fase  
- **Repositórios de Artefatos Confiáveis**: Implantar apenas a partir de registos e repositórios de artefatos verificados e seguros  

#### **Monitorização Contínua e Resposta**  
- **Scanning de Dependências**: Monitorização contínua de vulnerabilidades para todas as dependências de software e componentes IA  
- **Monitorização de Modelos**: Avaliação contínua do comportamento do modelo, deriva de desempenho e anomalias de segurança  
- **Rastreamento de Saúde de Serviços**: Monitorizar serviços IA externos quanto a disponibilidade, incidentes de segurança e alterações de políticas  
- **Integração de Inteligência de Ameaças**: Incorporar feeds de ameaças específicas a riscos de segurança IA e ML  

#### **Controlo de Acesso e Privilégio Mínimo**  
- **Permissões a Nível de Componente**: Restringir acesso a modelos, dados e serviços com base na necessidade empresarial  
- **Gestão de Contas de Serviço**: Implementar contas de serviço dedicadas com permissões mínimas necessárias  
- **Segmentação de Rede**: Isolar componentes IA e limitar o acesso de rede entre serviços  
- **Controlo em Gateways de API**: Usar gateways centralizados para controlar e monitorizar o acesso a serviços IA externos  

#### **Resposta a Incidentes e Recuperação**  
- **Procedimentos de Resposta Rápida**: Processos estabelecidos para patching ou substituição de componentes IA comprometidos  
- **Rotação de Credenciais**: Sistemas automatizados para rotação de segredos, chaves API e credenciais de serviço  
- **Capacidades de Rollback**: Capacidade para reverter rapidamente a versões conhecidas e estáveis de componentes IA  
- **Recuperação de Quebras na Cadeia de Abastecimento**: Procedimentos específicos para responder a comprometimentos de serviços IA a montante  

### Ferramentas de Segurança e Integração Microsoft

O **GitHub Advanced Security** oferece proteção abrangente da cadeia de abastecimento incluindo:  
- **Scanning de Segredos**: Deteção automatizada de credenciais, chaves API e tokens em repositórios  
- **Scanning de Dependências**: Avaliação de vulnerabilidades para dependências e bibliotecas open-source  
- **Análise CodeQL**: Análise estática de código para vulnerabilidades de segurança e problemas de codificação  
- **Insights da Cadeia de Abastecimento**: Visibilidade na saúde e estado de segurança das dependências  

**Integração com Azure DevOps & Azure Repos:**  
- Integração fluida de scanning de segurança em plataformas de desenvolvimento Microsoft  
- Verificações automatizadas de segurança em Azure Pipelines para cargas de trabalho IA  
- Aplicação de políticas para implantação segura de componentes IA  

**Práticas Internas da Microsoft:**  
A Microsoft implementa práticas extensas de segurança da cadeia de abastecimento em todos os produtos. Saiba mais sobre abordagens comprovadas em [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Melhores Práticas de Segurança Fundamental

Implementações MCP herdam e constroem sobre a postura de segurança existente da sua organização. Fortalecer práticas fundamentais de segurança melhora significativamente a segurança geral de sistemas IA e implementações MCP.

### Fundamentos Core de Segurança

#### **Práticas Seguras de Desenvolvimento**  
- **Cumprimento OWASP**: Proteger contra as vulnerabilidades [OWASP Top 10](https://owasp.org/www-project-top-ten/) em aplicações web  
- **Proteções Específicas para IA**: Implementar controlos para [OWASP Top 10 para LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Gestão Segura de Segredos**: Usar cofres dedicados para tokens, chaves API e dados sensíveis de configuração  
- **Encriptação End-to-End**: Implementar comunicações seguras em todos os componentes e fluxos de dados da aplicação  
- **Validação de Entrada**: Validação rigorosa de todas as entradas de utilizador, parâmetros API e fontes de dados  

#### **Endurecimento de Infraestrutura**  
- **Autenticação Multi-Fator**: MFA obrigatório para todas contas administrativas e de serviço  
- **Gestão de Patches**: Aplicação automática e atempada de patches para sistemas operativos, frameworks e dependências  
- **Integração de Provedores de Identidade**: Gestão centralizada de identidade através de provedores empresariais (Microsoft Entra ID, Active Directory)  
- **Segmentação de Rede**: Isolamento lógico dos componentes MCP para limitar potencial de movimento lateral  
- **Princípio do Menor Privilégio**: Permissões mínimas necessárias para todos os componentes e contas do sistema  

#### **Monitorização e Deteção de Segurança**  
- **Registo Abrangente**: Logging detalhado de atividades de aplicações IA, incluindo interações cliente-servidor MCP  
- **Integração SIEM**: Gestão centralizada de informações e eventos de segurança para deteção de anomalias  
- **Análise Comportamental**: Monitorização suportada por IA para detectar padrões invulgares em sistemas e utilizadores  
- **Inteligência de Ameaças**: Integração de feeds externos de ameaças e indicadores de compromisso (IOCs)  
- **Resposta a Incidentes**: Procedimentos bem definidos para deteção, resposta e recuperação de incidentes de segurança  

#### **Arquitetura de Zero Trust**  
- **Nunca Confiar, Sempre Verificar**: Verificação contínua de utilizadores, dispositivos e ligações de rede  
- **Micro-Segmentação**: Controlo granular de rede que isola cargas de trabalho e serviços individuais  
- **Segurança Centrada em Identidade**: Políticas de segurança baseadas em identidades verificadas em vez de localização de rede  
- **Avaliação Contínua de Risco**: Avaliação dinâmica da postura de segurança baseada no contexto atual e comportamento  
- **Acesso Condicional**: Controlo de acesso que se adapta conforme fatores de risco, localização e confiança do dispositivo  

### Padrões de Integração Empresarial

#### **Integração no Ecossistema de Segurança Microsoft**  
- **Microsoft Defender for Cloud**: Gestão abrangente da postura de segurança cloud  
- **Azure Sentinel**: Capacidades cloud-nativas de SIEM e SOAR para proteção de cargas IA  
- **Microsoft Entra ID**: Gestão empresarial de identidade e acesso com políticas de acesso condicional  
- **Azure Key Vault**: Gestão centralizada de segredos com suporte de módulo de segurança hardware (HSM)  
- **Microsoft Purview**: Governança e conformidade de dados para fontes e fluxos IA  

#### **Conformidade e Governança**  
- **Alinhamento Regulatórico**: Garantir que implementações MCP cumprem requisitos específicos do setor (GDPR, HIPAA, SOC 2)  
- **Classificação de Dados**: Categorização e tratamento adequados dos dados sensíveis processados por sistemas IA  
- **Traços de Auditoria**: Logging completo para conformidade regulatória e investigação forense  
- **Controlo de Privacidade**: Implementação de princípios privacidade-by-design na arquitetura IA  
- **Gestão de Alterações**: Processos formais para revisão de segurança em modificações do sistema IA  

Estas práticas fundacionais criam uma base robusta de segurança que reforça a eficácia dos controlos específicos MCP e oferece proteção abrangente para aplicações impulsionadas por IA.
## Principais Conclusões de Segurança

- **Abordagem de Segurança em Camadas**: Combine práticas de segurança fundamentais (programação segura, privilégio mínimo, verificação da cadeia de fornecimento, monitorização contínua) com controlos específicos para IA para uma proteção abrangente

- **Cenário de Ameaças Específico de IA**: Os sistemas MCP enfrentam riscos únicos incluindo injeção de prompts, envenenamento de ferramentas, sequestro de sessão, problemas do representante confuso, vulnerabilidades de passagem de tokens e permissões excessivas que requerem mitigações especializadas

- **Excelência em Autenticação e Autorização**: Implemente autenticação robusta usando provedores de identidade externos (Microsoft Entra ID), aplique validação adequada de tokens e nunca aceite tokens que não sejam explicitamente emitidos para o seu servidor MCP

- **Prevenção de Ataques à IA**: Use Microsoft Prompt Shields e Azure Content Safety para defender contra ataques indiretos de injeção de prompt e envenenamento de ferramentas, enquanto valida os metadados das ferramentas e monitoriza alterações dinâmicas

- **Segurança de Sessão e Transporte**: Use IDs de sessão criptograficamente seguros e não determinísticos vinculados a identidades de utilizador, implemente gestão adequada do ciclo de vida da sessão, e nunca utilize sessões para autenticação

- **Melhores Práticas de Segurança OAuth**: Previna ataques do representante confuso através do consentimento explícito do utilizador para clientes registrados dinamicamente, implementação correta do OAuth 2.1 com PKCE, e validação rigorosa dos URIs de redirecionamento  

- **Princípios de Segurança de Tokens**: Evite anti-padrões de passagem de tokens, valide os claims da audiência do token, implemente tokens de curta duração com rotação segura, e mantenha fronteiras claras de confiança

- **Segurança Abrangente da Cadeia de Fornecimento**: Trate todos os componentes do ecossistema IA (modelos, embeddings, fornecedores de contexto, APIs externas) com o mesmo rigor de segurança que as dependências tradicionais de software

- **Evolução Contínua**: Mantenha-se atualizado com as especificações MCP em rápida evolução, contribua para os standards da comunidade de segurança, e mantenha posturas de segurança adaptativas à medida que o protocolo amadurece

- **Integração de Segurança Microsoft**: Aproveite o ecossistema de segurança abrangente da Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) para maior proteção na implementação MCP

## Recursos Abrangentes

### **Documentação Oficial de Segurança MCP**
- [Especificação MCP (Atual: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificação de Autorização MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositório MCP no GitHub](https://github.com/modelcontextprotocol)

### **Recursos de Segurança OWASP MCP**
- [Guia de Segurança Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 completo com orientações de implementação Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscos de segurança oficiais OWASP MCP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formação prática de segurança para MCP no Azure

### **Standards e Melhores Práticas de Segurança**
- [Melhores Práticas de Segurança OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Segurança de Aplicações Web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 para Grandes Modelos de Linguagem](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Relatório de Defesa Digital Microsoft](https://aka.ms/mddr)

### **Pesquisa e Análise de Segurança em IA**
- [Injeção de Prompt no MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Ataques de Envenenamento de Ferramentas (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Resumo de Pesquisa de Segurança MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluções de Segurança Microsoft**
- [Documentação Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Serviço Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Segurança Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Melhores Práticas de Gestão de Tokens Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guias de Implementação e Tutoriais**
- [Azure API Management como Gateway de Autenticação MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autenticação Microsoft Entra ID com Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Armazenamento Seguro de Tokens e Criptografia (Vídeo)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps e Segurança da Cadeia de Fornecimento**
- [Segurança Azure DevOps](https://azure.microsoft.com/products/devops)
- [Segurança Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Jornada de Segurança da Cadeia de Fornecimento Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentação de Segurança Adicional**

Para orientações abrangentes de segurança, consulte estes documentos especializados nesta secção:

- **[Melhores Práticas de Segurança MCP 2025](./mcp-security-best-practices-2025.md)** - Conjunto completo de melhores práticas de segurança para implementações MCP
- **[Implementação Azure Content Safety](./azure-content-safety-implementation.md)** - Exemplos práticos de implementação para integração Azure Content Safety  
- **[Controlos de Segurança MCP 2025](./mcp-security-controls-2025.md)** - Controlos e técnicas de segurança mais recentes para implementações MCP
- **[Referência Rápida de Melhores Práticas MCP](./mcp-best-practices.md)** - Guia de referência rápida para práticas essenciais de segurança MCP

### **Formação Prática de Segurança**

- **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop prático abrangente para proteger servidores MCP no Azure com acampamentos progressivos do Base Camp ao Summit
- **[Guia de Segurança Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/)** - Arquitetura de referência e orientações de implementação para todos os riscos OWASP MCP Top 10

---

## O que Segue

Seguinte: [Capítulo 3: Começar](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos por garantir a precisão, por favor tenha em conta que traduções automáticas podem conter erros ou imprecisões. O documento original no seu idioma nativo deve ser considerado a fonte oficial. Para informações críticas, recomenda-se a tradução profissional feita por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações erradas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->