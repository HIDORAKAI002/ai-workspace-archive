# Controles de Segurança MCP - Atualização de fevereiro de 2026

> **Padrão Atual**: Este documento reflete os requisitos de segurança da [Especificação MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) e as oficiais [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

O Protocolo de Contexto de Modelo (MCP) amadureceu significativamente com controles de segurança aprimorados que abordam tanto a segurança tradicional de software quanto ameaças específicas de IA. Este documento fornece controles de segurança abrangentes para implementações seguras do MCP alinhadas com a estrutura OWASP MCP Top 10.

## 🏔️ Treino Prático de Segurança

Para uma experiência prática de implementação de segurança, recomendamos o **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - uma expedição guiada abrangente para garantir servidores MCP no Azure, usando a metodologia "vulnerável → explorar → corrigir → validar".

Todos os controles de segurança neste documento alinham-se com o **[Guia de Segurança OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)**, que fornece arquiteturas de referência e orientações específicas para a implementação no Azure dos riscos OWASP MCP Top 10.

## **Requisitos de Segurança OBRIGATÓRIOS**

### **Proibições Críticas da Especificação MCP:**

> **PROIBIDO**: Servidores MCP **NÃO DEVEM** aceitar quaisquer tokens que não tenham sido explicitamente emitidos para o servidor MCP  
>
> **NEGADO**: Servidores MCP **NÃO DEVEM** usar sessões para autenticação  
>
> **EXIGIDO**: Servidores MCP que implementem autorização **DEVEM** verificar TODAS as solicitações de entrada  
>
> **MANDATÓRIO**: Servidores proxy MCP que usem IDs de cliente estáticos **DEVEM** obter consentimento do utilizador para cada cliente registado dinamicamente

---

## 1. **Controles de Autenticação e Autorização**

### **Integração com Provedores de Identidade Externos**

**O Padrão Atual MCP (2025-11-25)** permite que os servidores MCP deleguem a autenticação para provedores de identidade externos, representando uma melhoria significativa de segurança:

**Risco OWASP MCP abordado**: [MCP07 - Autenticação e Autorização Insuficientes](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Benefícios de Segurança:**
1. **Elimina Riscos de Autenticação Personalizada**: Reduz a superfície de vulnerabilidade ao evitar implementações personalizadas de autenticação
2. **Segurança ao Nível Empresarial**: Utiliza provedores de identidade estabelecidos como Microsoft Entra ID com recursos de segurança avançados
3. **Gestão Centralizada de Identidades**: Simplifica o ciclo de vida do utilizador, controlo de acesso e auditorias de conformidade
4. **Autenticação Multifator**: Herda capacidades de MFA dos provedores de identidade empresariais
5. **Políticas de Acesso Condicional**: Beneficia de controlos de acesso baseados em risco e autenticação adaptativa

**Requisitos de Implementação:**
- **Validação do Público do Token**: Verificar que todos os tokens foram explicitamente emitidos para o servidor MCP
- **Verificação do Emissor**: Validar que o emissor do token corresponde ao esperado provedor de identidade
- **Verificação da Assinatura**: Validação criptográfica da integridade do token
- **Cumprimento do Prazo de Validade**: Aplicação rigorosa dos limites de duração do token
- **Validação do Escopo**: Garantir que os tokens contêm permissões adequadas para as operações solicitadas

### **Segurança da Lógica de Autorização**

**Controles Críticos:**
- **Auditorias Abrangentes de Autorização**: Revisões regulares de segurança de todos os pontos de decisão de autorização
- **Padrões Seguros por Defeito**: Negar acesso quando a lógica de autorização não possa tomar uma decisão definitiva
- **Limites de Permissões**: Separação clara entre diferentes níveis de privilégios e acesso a recursos
- **Registo de Auditoria**: Registo completo de todas as decisões de autorização para monitorização de segurança
- **Revisões Regulares de Acesso**: Validação periódica das permissões de utilizadores e atribuições de privilégios

## 2. **Segurança de Tokens e Controles Anti-Passthrough**

**Risco OWASP MCP abordado**: [MCP01 - Má Gestão de Tokens e Exposição de Segredos](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevenção de Passthrough de Tokens**

**Passthrough de tokens é explicitamente proibido** na Especificação de Autorização MCP devido a riscos críticos de segurança:

**Riscos de Segurança Abordados:**
- **Circunvenção de Controlos**: Ignora controlos essenciais como limitação de taxa, validação de pedidos e monitorização de tráfego
- **Quebra de Responsabilidade**: Torna impossível a identificação do cliente, corrompendo trilhas de auditoria e investigação de incidentes
- **Exfiltração via Proxy**: Permite que atores maliciosos usem servidores como proxies para acesso não autorizado a dados
- **Violação de Fronteiras de Confiança**: Quebra pressupostos de confiança dos serviços a jusante sobre a origem dos tokens
- **Movimento Lateral**: Tokens comprometidos entre múltiplos serviços permitem expansão ampla do ataque

**Controlos de Implementação:**
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

### **Padrões Seguros de Gestão de Tokens**

**Boas Práticas:**
- **Tokens de Curta Duração**: Minimizar a janela de exposição com rotação frequente de tokens
- **Emissão Just-in-Time**: Emitir tokens apenas quando necessários para operações específicas
- **Armazenamento Seguro**: Usar módulos de segurança de hardware (HSMs) ou cofres de chaves seguros
- **Vinculação de Tokens**: Associar tokens a clientes, sessões ou operações específicas sempre que possível
- **Monitorização e Alerta**: Detecção em tempo real de uso indevido de tokens ou padrões de acesso não autorizados

## 3. **Controles de Segurança de Sessão**

### **Prevenção de Sequestro de Sessão**

**Vetores de Ataque Abordados:**
- **Injeção de Prompt em Sequestro de Sessão**: Eventos maliciosos injetados no estado de sessão partilhado
- **Impersonação de Sessão**: Uso não autorizado de IDs de sessão roubados para contornar a autenticação
- **Ataques de Fluxo Continuado**: Exploração da retoma de eventos enviados pelo servidor para injetar conteúdo malicioso

**Controles Obrigatórios de Sessão:**
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
- **Aplicação HTTPS**: Toda comunicação de sessão sobre TLS 1.3
- **Atributos Seguros de Cookie**: HttpOnly, Secure, SameSite=Strict
- **Pinagem de Certificado**: Para conexões críticas, prevenindo ataques MITM

### **Considerações Stateful vs Stateless**

**Para Implementações Stateful:**
- Estado de sessão partilhado requer proteção adicional contra ataques de injeção
- Gestão de sessões baseada em filas necessita verificação de integridade
- Instâncias múltiplas de servidores requerem sincronização segura do estado de sessão

**Para Implementações Stateless:**
- Gestão de sessões baseada em tokens JWT ou similares
- Verificação criptográfica da integridade do estado de sessão
- Superfície de ataque reduzida, mas requer validação robusta do token

## 4. **Controles de Segurança Específicos para IA**

**Riscos OWASP MCP Abordados**:
- [MCP06 - Subversão do Fluxo de Intenção](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Envenenamento de Ferramentas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Injeção e Execução de Comandos](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Defesa Contra Injeção de Prompt**

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

**Controlos de Implementação:**
- **Sanitização de Entrada**: Validação e filtragem abrangente de todas as entradas do utilizador
- **Definição de Fronteira de Conteúdo**: Separação clara entre instruções do sistema e conteúdo do utilizador
- **Hierarquia de Instruções**: Regras de precedência apropriadas para instruções conflitantes
- **Monitorização de Saída**: Detecção de saídas potencialmente prejudiciais ou manipuladas

### **Prevenção de Envenenamento de Ferramentas**

**Estrutura de Segurança de Ferramentas:**
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
- **Fluxos de Aprovação**: Consentimento explícito do utilizador para modificações nas ferramentas
- **Capacidades de Reversão**: Possibilidade de reverter para versões anteriores das ferramentas
- **Auditoria de Alterações**: Histórico completo das modificações nas definições das ferramentas
- **Avaliação de Risco**: Avaliação automatizada da postura de segurança das ferramentas

## 5. **Prevenção de Ataques de Deputado Confuso**

### **Segurança de Proxy OAuth**

**Controlos para Prevenção de Ataques:**
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
- **Verificação de Consentimento do Utilizador**: Nunca ignorar ecrãs de consentimento para registo dinâmico de clientes
- **Validação de URI de Redirecionamento**: Validação rigorosa baseada em lista branca dos destinos de redirecionamento
- **Proteção de Código de Autorização**: Códigos de curta duração com aplicação de uso único
- **Verificação de Identidade do Cliente**: Validação robusta das credenciais e metadados do cliente

## 6. **Segurança na Execução de Ferramentas**

### **Sandboxing e Isolamento**

**Isolamento Baseado em Contêineres:**
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

**Isolamento de Processos:**
- **Contextos de Processo Separados**: Cada execução de ferramenta em espaço de processo isolado
- **Comunicação Interprocessual**: Mecanismos seguros de IPC com validação
- **Monitorização de Processos**: Análise comportamental em tempo de execução e deteção de anomalias
- **Aplicação de Recursos**: Limites rígidos sobre CPU, memória e operações de I/O

### **Implementação do Princípio do Menor Privilégio**

**Gestão de Permissões:**
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

**Risco OWASP MCP abordado**: [MCP04 - Ataques à Cadeia de Suprimentos de Software e Manipulação de Dependências](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

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

### **Monitorização Contínua**

**Deteção de Ameaças na Cadeia de Suprimentos:**
- **Monitorização da Saúde das Dependências**: Avaliação contínua de todas as dependências para questões de segurança
- **Integração de Inteligência de Ameaças**: Atualizações em tempo real sobre ameaças emergentes na cadeia de suprimentos
- **Análise Comportamental**: Detecção de comportamentos incomuns em componentes externos
- **Resposta Automatizada**: Contenção imediata de componentes comprometidos

## 8. **Controles de Monitorização e Deteção**

**Risco OWASP MCP abordado**: [MCP08 - Falta de Auditoria e Telemetria](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Gestão de Informações e Eventos de Segurança (SIEM)**

**Estratégia Abrangente de Registo:**
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

### **Deteção de Ameaças em Tempo Real**

**Análise Comportamental:**
- **Análise de Comportamento do Utilizador (UBA)**: Deteção de padrões incomuns de acesso de utilizadores
- **Análise de Comportamento de Entidade (EBA)**: Monitorização do comportamento do servidor MCP e das ferramentas
- **Deteção de Anomalias com Aprendizagem Automática**: Identificação assistida por IA de ameaças de segurança
- **Correlação de Inteligência de Ameaças**: Correspondência de atividades observadas com padrões de ataque conhecidos

## 9. **Resposta a Incidentes e Recuperação**

### **Capacidades de Resposta Automatizada**

**Ações Imediatas de Resposta:**
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
- **Preservação da Trajetória de Auditoria**: Registos imutáveis com integridade criptográfica
- **Coleta de Evidências**: Recolha automatizada de artefatos de segurança relevantes
- **Reconstrução da Linha Temporal**: Sequência detalhada de eventos que levaram a incidentes de segurança
- **Avaliação do Impacto**: Avaliação do alcance da violação e exposição de dados

## **Princípios-chave da Arquitetura de Segurança**

### **Defesa em Profundidade**
- **Múltiplas Camadas de Segurança**: Nenhum ponto único de falha na arquitetura de segurança
- **Controlos Redundantes**: Medidas de segurança sobrepostas para funções críticas
- **Mecanismos Fail-Safe**: Padrões seguros por defeito quando sistemas enfrentam erros ou ataques

### **Implementação Zero Trust**
- **Nunca Confiar, Sempre Verificar**: Validação contínua de todas as entidades e pedidos
- **Princípio do Menor Privilégio**: Direitos de acesso mínimos para todos os componentes
- **Microsegmentação**: Controlo granular de rede e acesso

### **Evolução Contínua da Segurança**
- **Adaptação ao Cenário de Ameaças**: Atualizações regulares para endereçar ameaças emergentes
- **Eficácia dos Controlos de Segurança**: Avaliação e melhoria contínua dos controlos
- **Conformidade com a Especificação**: Alinhamento com os padrões de segurança MCP em evolução

---

## **Recursos de Implementação**

### **Documentação Oficial MCP**
- [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificação de Autorização MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Recursos de Segurança OWASP MCP**
- [Guia de Segurança OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 completo com implementação Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscos oficiais de segurança MCP OWASP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Treino prático de segurança MCP no Azure

### **Soluções de Segurança Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Normas de Segurança**
- [Melhores Práticas de Segurança OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 para Modelos de Linguagem Grande](https://genai.owasp.org/)
- [Framework de Cibersegurança NIST](https://www.nist.gov/cyberframework)

---

> **Importante**: Estes controlos de segurança refletem a especificação MCP atual (2025-11-25). Verifique sempre a [documentação oficial](https://spec.modelcontextprotocol.io/) mais recente, pois os padrões continuam a evoluir rapidamente.

## Próximos Passos

- Voltar para: [Visão Geral do Módulo de Segurança](./README.md)
- Continuar para: [Módulo 3: Introdução](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->