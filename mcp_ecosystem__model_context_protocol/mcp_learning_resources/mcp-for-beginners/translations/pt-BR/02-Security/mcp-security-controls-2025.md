# Controles de Segurança MCP - Atualização de Fevereiro de 2026

> **Padrão Atual**: Este documento reflete os requisitos de segurança da [Especificação MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) e as [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) oficiais.

O Model Context Protocol (MCP) amadureceu significativamente com controles de segurança aprimorados que abordam tanto a segurança tradicional de software quanto ameaças específicas de IA. Este documento fornece controles de segurança abrangentes para implementações seguras do MCP alinhadas com o framework OWASP MCP Top 10.

## 🏔️ Treinamento Prático de Segurança

Para experiência prática e aplicada na implementação de segurança, recomendamos o **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - uma expedição guiada abrangente para proteger servidores MCP no Azure usando a metodologia "vulnerável → explorar → corrigir → validar".

Todos os controles de segurança neste documento estão alinhados com o **[Guia de Segurança Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**, que fornece arquiteturas de referência e orientações específicas de implementação no Azure para os riscos OWASP MCP Top 10.

## **Requisitos de Segurança MANDATÓRIOS**

### **Proibições Críticas da Especificação MCP:**

> **PROIBIDO**: Servidores MCP **NÃO DEVEM** aceitar quaisquer tokens que não tenham sido explicitamente emitidos para o servidor MCP  
>
> **PROIBIDO**: Servidores MCP **NÃO DEVEM** usar sessões para autenticação  
>
> **REQUERIDO**: Servidores MCP que implementam autorização **DEVEM** verificar TODAS as requisições recebidas  
>
> **MANDATÓRIO**: Servidores proxy MCP usando IDs de cliente estáticos **DEVEM** obter consentimento do usuário para cada cliente registrado dinamicamente

---

## 1. **Controles de Autenticação & Autorização**

### **Integração com Provedor de Identidade Externo**

**Padrão MCP Atual (2025-11-25)** permite que servidores MCP deleguem autenticação a provedores de identidade externos, representando uma melhora significativa na segurança:

**Risco OWASP MCP Abordado**: [MCP07 - Autenticação & Autorização Insuficientes](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Benefícios de Segurança:**
1. **Elimina Riscos de Autenticação Personalizada**: Reduz a superfície vulnerável evitando implementações de autenticação personalizadas
2. **Segurança Corporativa Avançada**: Aproveita provedores de identidade estabelecidos como Microsoft Entra ID com recursos de segurança avançados
3. **Gerenciamento Centralizado de Identidade**: Simplifica o ciclo de vida do usuário, controle de acesso e auditoria de conformidade
4. **Autenticação Multifator**: Herda capacidades de MFA dos provedores de identidade corporativos
5. **Políticas de Acesso Condicional**: Beneficia-se de controles de acesso baseados em risco e autenticação adaptativa

**Requisitos de Implementação:**
- **Validação do Público do Token**: Verificar que todos os tokens foram explicitamente emitidos para o servidor MCP
- **Verificação do Emissor**: Validar que o emissor do token corresponde ao provedor de identidade esperado
- **Verificação de Assinatura**: Validação criptográfica da integridade do token
- **Aplicação de Expiração**: Cumprimento rigoroso dos limites de tempo de vida do token
- **Validação de Escopo**: Garantir que os tokens contenham permissões apropriadas para as operações solicitadas

### **Segurança da Lógica de Autorização**

**Controles Críticos:**
- **Auditorias Abrangentes de Autorização**: Revisões regulares de segurança em todos os pontos de decisão de autorização
- **Padrões Seguros por Falha**: Negar acesso quando a lógica de autorização não pode tomar uma decisão definitiva
- **Limites de Permissão**: Separação clara entre diferentes níveis de privilégio e acesso a recursos
- **Registro de Auditoria**: Registro completo de todas as decisões de autorização para monitoramento de segurança
- **Revisões Regulares de Acesso**: Validação periódica das permissões e atribuições de privilégios dos usuários

## 2. **Segurança de Token & Controles Anti-Passthrough**

**Risco OWASP MCP Abordado**: [MCP01 - Má Gestão de Token & Exposição de Segredos](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevenção de Passthrough de Token**

**Passthrough de token é explicitamente proibido** na Especificação de Autorização MCP devido a riscos críticos de segurança:

**Riscos de Segurança Abordados:**
- **Circunvenção de Controles**: Evita controles essenciais de segurança como limitação de taxas, validação de requisições e monitoramento de tráfego
- **Falha na Responsabilização**: Torna impossível a identificação do cliente, corrompendo trilhas de auditoria e investigações de incidentes
- **Exfiltração Baseada em Proxy**: Permite que atores maliciosos usem servidores como proxies para acesso não autorizado a dados
- **Violação de Limites de Confiança**: Rompe as suposições de confiança dos serviços downstream sobre a origem dos tokens
- **Movimentação Lateral**: Tokens comprometidos em múltiplos serviços permitem expansão maior do ataque

**Controles de Implementação:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **Padrões Seguros de Gestão de Token**

**Melhores Práticas:**
- **Tokens de Curta Duração**: Minimizar a janela de exposição com rotação frequente de tokens
- **Emissão Just-in-Time**: Emitir tokens apenas quando necessário para operações específicas
- **Armazenamento Seguro**: Uso de módulos de segurança de hardware (HSMs) ou cofres de chaves seguros
- **Vinculação de Token**: Vincular tokens a clientes, sessões ou operações específicas sempre que possível
- **Monitoramento & Alertas**: Detecção em tempo real de uso indevido de tokens ou padrões de acesso não autorizados

## 3. **Controles de Segurança de Sessão**

### **Prevenção de Sequestro de Sessão**

**Vetores de Ataque Abordados:**
- **Injeção de Prompt em Sequestro de Sessão**: Eventos maliciosos injetados no estado de sessão compartilhada
- **Impersonação de Sessão**: Uso não autorizado de IDs de sessão roubadas para burlar autenticação
- **Ataques de Fluxo Reprisável**: Exploração de retomada de eventos enviados pelo servidor para injeção maliciosa

**Controles Obrigatórios para Sessão:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**Segurança de Transporte:**
- **Aplicação do HTTPS**: Toda comunicação de sessão sobre TLS 1.3
- **Atributos Seguros de Cookie**: HttpOnly, Secure, SameSite=Strict
- **Fixação de Certificado**: Para conexões críticas, prevenindo ataques MITM

### **Considerações Stateful vs Stateless**

**Para Implementações Stateful:**
- Estado de sessão compartilhado requer proteção adicional contra ataques de injeção
- Gerenciamento baseado em fila demanda verificação de integridade
- Instâncias múltiplas de servidores requerem sincronização segura do estado da sessão

**Para Implementações Stateless:**
- Gerenciamento de sessão baseado em JWT ou tokens similares
- Verificação criptográfica da integridade do estado da sessão
- Superfície de ataque reduzida, mas requer validação robusta de token

## 4. **Controles de Segurança Específicos para IA**

**Riscos OWASP MCP Abordados**:
- [MCP06 - Injeção de Prompt via Payloads Contextuais](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Envenenamento de Ferramenta](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Injeção & Execução de Comando](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Defesa contra Injeção de Prompt**

**Integração com Microsoft Prompt Shields:**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**Controles de Implementação:**
- **Sanitização de Entrada**: Validação e filtragem abrangente de todas as entradas de usuário
- **Definição de Limites de Conteúdo**: Separação clara entre instruções do sistema e conteúdo do usuário
- **Hierarquia de Instrução**: Regras apropriadas de precedência para instruções conflitantes
- **Monitoramento de Saída**: Detecção de saídas potencialmente nocivas ou manipuladas

### **Prevenção de Envenenamento de Ferramenta**

**Framework de Segurança para Ferramentas:**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**Gestão Dinâmica de Ferramentas:**
- **Fluxos de Aprovação**: Consentimento explícito do usuário para modificações de ferramentas
- **Capacidade de Reversão**: Habilidade para reverter para versões anteriores da ferramenta
- **Auditoria de Alterações**: Histórico completo das modificações das definições de ferramentas
- **Avaliação de Risco**: Avaliação automatizada da postura de segurança da ferramenta

## 5. **Prevenção do Ataque Deputado Confuso**

### **Segurança de Proxy OAuth**

**Controles de Prevenção de Ataques:**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**Requisitos de Implementação:**
- **Verificação do Consentimento do Usuário**: Nunca pular telas de consentimento para registro dinâmico de clientes
- **Validação de URI de Redirecionamento**: Validação estrita baseada em lista branca dos destinos de redirecionamento
- **Proteção do Código de Autorização**: Códigos de curta duração com uso único obrigatório
- **Verificação de Identidade do Cliente**: Validação robusta das credenciais e metadados do cliente

## 6. **Segurança na Execução de Ferramentas**

### **Sandboxing & Isolamento**

**Isolamento Baseado em Contêiner:**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**Isolamento de Processo:**
- **Contextos de Processo Separados**: Cada execução de ferramenta em espaço de processo isolado
- **Comunicação Interprocessos**: Mecanismos seguros de IPC com validação
- **Monitoramento de Processo**: Análise de comportamento em tempo de execução e detecção de anomalias
- **Aplicação de Recursos**: Limites rígidos em CPU, memória e operações de I/O

### **Implementação do Princípio do Menor Privilégio**

**Gerenciamento de Permissões:**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. **Controles de Segurança da Cadeia de Suprimentos**

**Risco OWASP MCP Abordado**: [MCP04 - Ataques à Cadeia de Suprimentos](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verificação de Dependências**

**Segurança Abrangente de Componentes:**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **Monitoramento Contínuo**

**Detecção de Ameaças na Cadeia de Suprimentos:**
- **Monitoramento da Saúde das Dependências**: Avaliação contínua de todas as dependências para problemas de segurança
- **Integração de Inteligência de Ameaças**: Atualizações em tempo real sobre ameaças emergentes na cadeia de suprimentos
- **Análise Comportamental**: Detecção de comportamento incomum em componentes externos
- **Resposta Automatizada**: Contenção imediata de componentes comprometidos

## 8. **Controles de Monitoramento & Detecção**

**Risco OWASP MCP Abordado**: [MCP08 - Falta de Auditoria & Telemetria](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Gerenciamento de Informações e Eventos de Segurança (SIEM)**

**Estratégia Abrangente de Registro:**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **Detecção de Ameaças em Tempo Real**

**Análise Comportamental:**
- **Análise de Comportamento do Usuário (UBA)**: Detecção de padrões de acesso incomuns de usuários
- **Análise de Comportamento de Entidade (EBA)**: Monitoramento do comportamento do servidor MCP e ferramentas
- **Detecção de Anomalias via Machine Learning**: Identificação de ameaças de segurança com inteligência artificial
- **Correlação de Inteligência de Ameaças**: Comparação das atividades observadas com padrões de ataques conhecidos

## 9. **Resposta a Incidentes & Recuperação**

### **Capacidades de Resposta Automática**

**Ações de Resposta Imediatas:**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **Capacidades Forenses**

**Suporte à Investigação:**
- **Preservação da Trilha de Auditoria**: Registro imutável com integridade criptográfica
- **Coleta de Evidências**: Reunião automatizada de artefatos relevantes de segurança
- **Reconstrução da Linha do Tempo**: Sequência detalhada dos eventos levando aos incidentes de segurança
- **Avaliação de Impacto**: Avaliação do escopo do comprometimento e exposição de dados

## **Princípios-Chave da Arquitetura de Segurança**

### **Defesa em Profundidade**
- **Múltiplas Camadas de Segurança**: Nenhum ponto único de falha na arquitetura de segurança
- **Controles Redundantes**: Medidas de segurança sobrepostas para funções críticas
- **Mecanismos Seguros por Falha**: Padrões seguros quando sistemas encontram erros ou ataques

### **Implementação Zero Trust**
- **Nunca Confie, Sempre Verifique**: Validação contínua de todas as entidades e requisições
- **Princípio do Menor Privilégio**: Direitos de acesso mínimos para todos os componentes
- **Microsegmentação**: Controles granulares de rede e acesso

### **Evolução Contínua da Segurança**
- **Adaptação ao Cenário de Ameaças**: Atualizações regulares para abordar ameaças emergentes
- **Eficácia dos Controles de Segurança**: Avaliação e melhoria contínua dos controles
- **Conformidade com a Especificação**: Alinhamento com padrões MCP de segurança em evolução

---

## **Recursos para Implementação**

### **Documentação Oficial MCP**
- [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificação de Autorização MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Recursos de Segurança OWASP MCP**
- [Guia de Segurança Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 completo com implementação Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscos oficiais de segurança OWASP MCP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Treinamento prático de segurança MCP no Azure

### **Soluções de Segurança Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Padrões de Segurança**
- [Melhores Práticas de Segurança OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 para Modelos de Linguagem Grande](https://genai.owasp.org/)
- [Framework de Cibersegurança NIST](https://www.nist.gov/cyberframework)

---

> **Importante**: Estes controles de segurança refletem a especificação MCP atual (2025-11-25). Sempre verifique contra a [documentação oficial](https://spec.modelcontextprotocol.io/) mais recente, pois os padrões continuam a evoluir rapidamente.

## Próximos Passos

- Retornar para: [Visão Geral do Módulo de Segurança](./README.md)
- Continue para: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original no seu idioma nativo deve ser considerado a fonte oficial. Para informações críticas, recomenda-se a tradução profissional por um humano. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->