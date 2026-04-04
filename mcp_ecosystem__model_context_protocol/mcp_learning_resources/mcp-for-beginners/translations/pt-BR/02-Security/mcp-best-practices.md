# Melhores Práticas de Segurança MCP 2025

Este guia abrangente descreve as melhores práticas essenciais de segurança para implementação de sistemas Model Context Protocol (MCP) com base na mais recente **Especificação MCP 2025-11-25** e nos padrões da indústria atuais. Essas práticas abordam tanto preocupações tradicionais de segurança quanto ameaças específicas de IA únicas para implementações MCP.

## Requisitos Críticos de Segurança

### Controles de Segurança Obrigatórios (Requisitos MUST)

1. **Validação de Token**: Servidores MCP **NÃO DEVEM** aceitar tokens que não tenham sido explicitamente emitidos para o próprio servidor MCP  
2. **Verificação de Autorização**: Servidores MCP que implementam autorização **DEVEM** verificar TODAS as solicitações recebidas e **NÃO DEVEM** utilizar sessões para autenticação  
3. **Consentimento do Usuário**: Servidores proxy MCP que usam IDs de cliente estáticos **DEVEM** obter consentimento explícito do usuário para cada cliente registrado dinamicamente  
4. **IDs de Sessão Seguros**: Servidores MCP **DEVEM** usar IDs de sessão criptograficamente seguros, não determinísticos, gerados com geradores de números aleatórios seguros  

## Práticas Centrais de Segurança

### 1. Validação e Sanitização de Entrada
- **Validação Abrangente de Entrada**: Validar e sanitizar todas as entradas para prevenir ataques de injeção, problemas de confusão do delegado e vulnerabilidades de injeção em prompts  
- **Aplicação de Esquema de Parâmetros**: Implementar validação rigorosa de esquema JSON para todos os parâmetros de ferramentas e entradas de API  
- **Filtragem de Conteúdo**: Usar Microsoft Prompt Shields e Azure Content Safety para filtrar conteúdo malicioso em prompts e respostas  
- **Sanitização de Saída**: Validar e sanitizar todas as saídas do modelo antes de apresentar aos usuários ou sistemas posteriores  

### 2. Excelência em Autenticação e Autorização  
- **Provedores de Identidade Externos**: Delegar autenticação para provedores de identidade estabelecidos (Microsoft Entra ID, provedores OAuth 2.1) ao invés de implementar autenticação personalizada  
- **Permissões Granulares**: Implementar permissões específicas e granulares para ferramentas seguindo o princípio do menor privilégio  
- **Gerenciamento do Ciclo de Vida de Tokens**: Usar tokens de acesso de curta duração com rotação segura e validação adequada de público-alvo  
- **Autenticação Multifator**: Exigir MFA para todo acesso administrativo e operações sensíveis  

### 3. Protocolos de Comunicação Segura
- **Segurança da Camada de Transporte**: Usar HTTPS/TLS 1.3 para todas as comunicações MCP com validação adequada de certificados  
- **Criptografia de Ponta a Ponta**: Implementar camadas adicionais de criptografia para dados altamente sensíveis em trânsito e em repouso  
- **Gerenciamento de Certificados**: Manter gerenciamento adequado do ciclo de vida de certificados com processos automatizados de renovação  
- **Aplicação da Versão do Protocolo**: Usar a versão atual do protocolo MCP (2025-11-25) com negociação correta de versão  

### 4. Limitação Avançada de Taxa e Proteção de Recursos
- **Limitação de Taxa em Múltiplas Camadas**: Implementar limitação de taxa nos níveis de usuário, sessão, ferramenta e recurso para prevenir abusos  
- **Limitação Adaptativa de Taxa**: Usar limitação de taxa baseada em aprendizado de máquina que se adapta a padrões de uso e indicadores de ameaça  
- **Gerenciamento de Quotas de Recursos**: Definir limites apropriados para recursos computacionais, uso de memória e tempo de execução  
- **Proteção contra DDoS**: Implantar proteção abrangente contra DDoS e sistemas de análise de tráfego  

### 5. Registro e Monitoramento Abrangentes
- **Registro de Auditoria Estruturado**: Implementar logs detalhados e pesquisáveis para todas as operações MCP, execuções de ferramentas e eventos de segurança  
- **Monitoramento de Segurança em Tempo Real**: Implantar sistemas SIEM com detecção de anomalias alimentada por IA para cargas de trabalho MCP  
- **Registro em Conformidade com Privacidade**: Registrar eventos de segurança respeitando os requisitos e regulamentos de privacidade de dados  
- **Integração com Resposta a Incidentes**: Conectar sistemas de logs a fluxos de trabalho automatizados de resposta a incidentes  

### 6. Práticas Avançadas de Armazenamento Seguro
- **Módulos de Segurança de Hardware**: Usar armazenamento de chaves com suporte HSM (Azure Key Vault, AWS CloudHSM) para operações criptográficas críticas  
- **Gerenciamento de Chaves de Criptografia**: Implementar rotação, segregação e controles de acesso adequados para chaves de criptografia  
- **Gerenciamento de Segredos**: Armazenar todas as chaves API, tokens e credenciais em sistemas dedicados de gerenciamento de segredos  
- **Classificação de Dados**: Classificar dados com base em níveis de sensibilidade e aplicar medidas de proteção apropriadas  

### 7. Gerenciamento Avançado de Tokens
- **Prevenção de Passagem de Token**: Proibir explicitamente padrões de passagem de token que contornam controles de segurança  
- **Validação de Público-alvo**: Sempre verificar se os claims de público-alvo do token correspondem à identidade do servidor MCP pretendido  
- **Autorização Baseada em Claims**: Implementar autorização fina com base nos claims do token e atributos do usuário  
- **Vinculação de Token**: Vincular tokens a sessões, usuários ou dispositivos específicos quando apropriado  

### 8. Gerenciamento Seguro de Sessão
- **IDs de Sessão Criptográficos**: Gerar IDs de sessão usando geradores de números aleatórios criptograficamente seguros (não sequências previsíveis)  
- **Vinculação Específica ao Usuário**: Vincular IDs de sessão a informações específicas do usuário usando formatos seguros como `<user_id>:<session_id>`  
- **Controles do Ciclo de Vida da Sessão**: Implementar expiração, rotação e invalidação apropriadas das sessões  
- **Cabeçalhos de Segurança de Sessão**: Usar cabeçalhos HTTP apropriados para proteção da sessão  

### 9. Controles de Segurança Específicos para IA
- **Defesa contra Injeção de Prompt**: Implantar Microsoft Prompt Shields com spotlighting, delimitadores e técnicas de datamarking  
- **Prevenção de Envenenamento de Ferramentas**: Validar metadados das ferramentas, monitorar mudanças dinâmicas e verificar integridade das ferramentas  
- **Validação da Saída do Modelo**: Escanear saídas do modelo para possíveis vazamentos de dados, conteúdo nocivo ou violações da política de segurança  
- **Proteção da Janela de Contexto**: Implementar controles para prevenir envenenamento e ataques de manipulação da janela de contexto  

### 10. Segurança de Execução de Ferramentas
- **Sandboxing de Execução**: Executar ferramentas em ambientes isolados e conteinerizados com limites de recursos  
- **Separação de Privilégios**: Executar ferramentas com privilégios mínimos necessários e contas de serviço separadas  
- **Isolamento de Rede**: Implementar segmentação de rede para ambientes de execução de ferramentas  
- **Monitoramento de Execução**: Monitorar execuções de ferramentas em busca de comportamentos anômalos, uso de recursos e violações de segurança  

### 11. Validação Contínua de Segurança
- **Testes Automatizados de Segurança**: Integrar testes de segurança em pipelines CI/CD com ferramentas como GitHub Advanced Security  
- **Gerenciamento de Vulnerabilidades**: Escanear regularmente todas as dependências, incluindo modelos de IA e serviços externos  
- **Testes de Penetração**: Conduzir avaliações regulares de segurança especificamente focadas em implementações MCP  
- **Revisões de Código de Segurança**: Implementar revisões obrigatórias de segurança para todas as alterações de código relacionadas ao MCP  

### 12. Segurança da Cadeia de Suprimentos para IA
- **Verificação de Componentes**: Verificar a origem, integridade e segurança de todos os componentes de IA (modelos, embeddings, APIs)  
- **Gerenciamento de Dependências**: Manter inventários atualizados de todas as dependências de software e IA com rastreamento de vulnerabilidades  
- **Repositórios Confiáveis**: Usar fontes verificadas e confiáveis para todos os modelos, bibliotecas e ferramentas de IA  
- **Monitoramento da Cadeia de Suprimentos**: Monitorar continuamente comprometimentos em provedores de serviço de IA e repositórios de modelos  

## Padrões Avançados de Segurança

### Arquitetura Zero Trust para MCP
- **Nunca Confiar, Sempre Verificar**: Implementar verificação contínua para todos os participantes MCP  
- **Microsegmentação**: Isolar componentes MCP com controles granulares de rede e identidade  
- **Acesso Condicional**: Implementar controles de acesso baseados em risco que se adaptam ao contexto e comportamento  
- **Avaliação Contínua de Risco**: Avaliar dinamicamente a postura de segurança com base nos indicadores atuais de ameaça  

### Implementação de IA Preservadora de Privacidade
- **Minimização de Dados**: Expor apenas os dados mínimos necessários para cada operação MCP  
- **Privacidade Diferencial**: Implementar técnicas de preservação de privacidade para processamento de dados sensíveis  
- **Criptografia Homomórfica**: Usar técnicas avançadas de criptografia para computação segura sobre dados criptografados  
- **Aprendizado Federado**: Implementar abordagens de aprendizado distribuído que preservam a localidade e a privacidade dos dados  

### Resposta a Incidentes para Sistemas de IA
- **Procedimentos Específicos para IA**: Desenvolver procedimentos de resposta a incidentes adaptados às ameaças específicas de IA e MCP  
- **Resposta Automatizada**: Implementar contenção e remediação automatizadas para incidentes comuns de segurança em IA  
- **Capacidades Forenses**: Manter prontidão forense para compromissos de sistemas de IA e vazamentos de dados  
- **Procedimentos de Recuperação**: Estabelecer procedimentos para recuperação de envenenamento de modelo IA, ataques de injeção de prompt e compromissos de serviços  

## Recursos e Padrões para Implementação

### 🏔️ Treinamento Prático em Segurança
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Workshop prático abrangente para proteger servidores MCP no Azure  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Arquitetura de referência e orientação de implementação OWASP MCP Top 10  

### Documentação Oficial MCP
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Especificação atual do protocolo MCP  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Guia oficial de segurança  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Padrões de autenticação e autorização  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Requisitos de segurança da camada de transporte  

### Soluções de Segurança Microsoft
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Proteção avançada contra injeção de prompts  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Filtragem abrangente de conteúdo de IA  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Gerenciamento de identidade e acesso empresarial  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Gerenciamento seguro de segredos e credenciais  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Escaneamento de segurança para cadeia de suprimentos e código  

### Padrões e Frameworks de Segurança
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Diretrizes atuais de segurança OAuth  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Riscos de segurança em aplicações web  
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Riscos específicos de segurança para IA  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Gerenciamento abrangente de riscos em IA  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Sistemas de gestão de segurança da informação  

### Guias e Tutoriais para Implementação
- [Azure API Management como MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Padrões corporativos de autenticação  
- [Microsoft Entra ID com Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integração de provedores de identidade  
- [Implementação de Armazenamento Seguro de Tokens](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Melhores práticas para gerenciamento de tokens  
- [Criptografia de Ponta a Ponta para IA](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Padrões avançados de criptografia  

### Recursos Avançados de Segurança
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Práticas seguras de desenvolvimento  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - Testes de segurança específicos para IA  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodologia de modelagem de ameaças para IA  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Técnicas de IA preservadora de privacidade  

### Conformidade e Governança
- [Conformidade GDPR para IA](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Cumprimento de privacidade em sistemas de IA  
- [Framework de Governança de IA](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Implementação responsável de IA  
- [SOC 2 para Serviços de IA](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Controles de segurança para provedores de serviços de IA  
- [Conformidade HIPAA para IA](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Requisitos de conformidade em IA para saúde  

### DevSecOps e Automação
- [Pipeline DevSecOps para IA](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Pipelines seguros para desenvolvimento de IA  
- [Testes Automatizados de Segurança](https://learn.microsoft.com/security/engineering/devsecops) - Validação contínua de segurança  
- [Segurança de Infraestrutura como Código](https://learn.microsoft.com/security/engineering/infrastructure-security) - Implantação segura de infraestrutura  
- [Segurança de Contêiner para IA](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Segurança na conteinerização de cargas de trabalho IA  

### Monitoramento e Resposta a Incidentes  
- [Azure Monitor para Cargas de Trabalho IA](https://learn.microsoft.com/azure/azure-monitor/overview) - Soluções abrangentes de monitoramento  
- [Resposta a Incidentes de Segurança em IA](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Procedimentos específicos para incidentes em IA  
- [SIEM para Sistemas de IA](https://learn.microsoft.com/azure/sentinel/overview) - Gerenciamento de informações e eventos de segurança  
- [Inteligência contra Ameaças para IA](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Fontes de inteligência contra ameaças em IA  

## 🔄 Melhoria Contínua

### Mantenha-se Atualizado com Padrões em Evolução
- **Atualizações da Especificação MCP**: Acompanhar mudanças oficiais na especificação MCP e avisos de segurança  
- **Inteligência contra Ameaças**: Assinar feeds de ameaças de segurança de IA e bases de dados de vulnerabilidades  
- **Engajamento da Comunidade**: Participe das discussões da comunidade de segurança MCP e dos grupos de trabalho
- **Avaliação Regular**: Realize avaliações trimestrais da postura de segurança e atualize as práticas conforme necessário

### Contribuindo para a Segurança MCP
- **Pesquisa em Segurança**: Contribua para pesquisas de segurança MCP e programas de divulgação de vulnerabilidades
- **Compartilhamento de Melhores Práticas**: Compartilhe implementações de segurança e lições aprendidas com a comunidade
- **Desenvolvimento de Padrões**: Participe do desenvolvimento da especificação MCP e da criação de padrões de segurança
- **Desenvolvimento de Ferramentas**: Desenvolva e compartilhe ferramentas e bibliotecas de segurança para o ecossistema MCP

---

*Este documento reflete as melhores práticas de segurança MCP em 18 de dezembro de 2025, com base na Especificação MCP 2025-11-25. As práticas de segurança devem ser revisadas e atualizadas regularmente à medida que o protocolo e o cenário de ameaças evoluem.*

## Próximos Passos

- Leia: [Melhores Práticas de Segurança MCP 2025](./mcp-security-best-practices-2025.md)
- Retorne para: [Visão Geral do Módulo de Segurança](./README.md)
- Continue para: [Módulo 3: Começando](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido usando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->