# Controlo de Segurança MCP - Atualização de Fevereiro 2026

> **Padrão Atual**: Este documento reflete os requisitos de segurança da [Especificação MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) e as oficiais [Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

O Protocolo de Contexto do Modelo (MCP) amadureceu significativamente com controlos de segurança reforçados que abordam tanto a segurança tradicional do software como ameaças específicas da IA. Este documento fornece controlos de segurança abrangentes para implementações MCP seguras alinhadas com o quadro de referência OWASP MCP Top 10.

## 🏔️ Formação Prática em Segurança

Para uma experiência prática na implementação de segurança, recomendamos o **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - uma expedição guiada completa para assegurar servidores MCP na Azure usando uma metodologia de "vulnerável → explorar → corrigir → validar".

Todos os controlos de segurança neste documento estão alinhados com o **[Guia de Segurança Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/)**, que fornece arquiteturas de referência e orientações específicas para a implementação Azure dos riscos OWASP MCP Top 10.

## **Requisitos de Segurança OBRIGATÓRIOS**

### **Proibições Críticas da Especificação MCP:**

> **PROIBIDO**: Servidores MCP **NÃO DEVEM** aceitar quaisquer tokens que não tenham sido explicitamente emitidos para o servidor MCP  
>
> **PROIBIDO**: Servidores MCP **NÃO DEVEM** usar sessões para autenticação  
>
> **OBRIGATÓRIO**: Servidores MCP que implementem autorização **DEVEM** verificar TODAS as requisições recebidas  
>
> **MANDATÓRIO**: Servidores proxy MCP que usam IDs de cliente estáticos **DEVEM** obter consentimento do utilizador para cada cliente registado dinamicamente

---

## 1. **Controlos de Autenticação & Autorização**

### **Integração com Provedor Externo de Identidade**

O **Padrão Atual MCP (2025-11-25)** permite aos servidores MCP delegar autenticação a provedores externos de identidade, representando uma melhoria significativa na segurança:

**Risco OWASP MCP Abordado**: [MCP07 - Autenticação e Autorização Insuficientes](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Benefícios de Segurança:**
1. **Elimina Riscos de Autenticação Customizada**: Reduz a superfície de vulnerabilidade evitando implementações personalizadas de autenticação
2. **Segurança de Nível Empresarial**: Apoia-se em provedores de identidade estabelecidos, como Microsoft Entra ID, com funcionalidades avançadas de segurança
3. **Gestão Centralizada de Identidade**: Simplifica o ciclo de vida do utilizador, controle de acesso e auditorias de conformidade
4. **Autenticação Multifator**: Herda capacidades MFA dos provedores de identidade empresariais
5. **Políticas de Acesso Condicional**: Beneficia de controlos de acesso baseados em risco e autenticação adaptativa

**Requisitos de Implementação:**
- **Validação do Público do Token**: Verificar que todos os tokens são explicitamente emitidos para o servidor MCP
- **Verificação do Emissor**: Validar que o emissor do token corresponde ao provedor de identidade esperado
- **Verificação da Assinatura**: Validação criptográfica da integridade do token
- **Cumprimento do Prazo de Validade**: Aplicação rigorosa dos limites de vida útil dos tokens
- **Validação do Escopo**: Garantir que os tokens contenham permissões apropriadas para as operações solicitadas

### **Segurança da Lógica de Autorização**

**Controlos Críticos:**
- **Auditorias Abrangentes de Autorização**: Revisões regulares de segurança em todos os pontos de decisão de autorização
- **Padrões Fail-Safe**: Negar acesso quando a lógica de autorização não conseguir tomar uma decisão definitiva
- **Limites de Permissão**: Separação clara entre diferentes níveis de privilégio e acesso a recursos
- **Registo de Auditoria**: Registo completo de todas as decisões de autorização para monitorização de segurança
- **Revisões Regulares de Acesso**: Validação periódica das permissões e atribuições de privilégios dos utilizadores

## 2. **Segurança de Tokens & Controlos Anti-Passthrough**

**Risco OWASP MCP Abordado**: [MCP01 - Má Gestão de Tokens & Exposição de Segredos](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevenção de Passthrough de Token**

**O passthrough de token é explicitamente proibido** na Especificação de Autorização MCP devido a riscos críticos de segurança:

**Riscos de Segurança Abordados:**
- **Circunvenção de Controlos**: Evita controlos essenciais como limitação de taxa, validação de requisições e monitorização de tráfego
- **Ruptura da Responsabilização**: Tornar impossível a identificação do cliente, corrompendo trilhos de auditoria e investigação de incidentes
- **Exfiltração Baseada em Proxy**: Permite que agentes maliciosos usem servidores como proxies para acesso não autorizado a dados
- **Violações da Fronteira de Confiança**: Quebra as assunções de confiança dos serviços downstream sobre a origem dos tokens
- **Movimentação Lateral**: Tokens comprometidos em múltiplos serviços permitem uma expansão mais ampla do ataque

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

### **Padrões de Gestão Segura de Tokens**

**Melhores Práticas:**
- **Tokens de Curta Duração**: Minimizar a janela de exposição com rotações frequentes de tokens
- **Emissão Just-in-Time**: Emitir tokens apenas quando necessários para operações específicas
- **Armazenamento Seguro**: Utilizar módulos de segurança de hardware (HSM) ou cofres seguros de chaves
- **Vinculação de Token**: Associar tokens a clientes específicos, sessões ou operações quando possível
- **Monitorização e Alertas**: Detecção em tempo real de uso indevido ou padrões de acesso não autorizados

## 3. **Controlos de Segurança de Sessões**

### **Prevenção de Sequestro de Sessão**

**Vetores de Ataque Abordados:**
- **Injeção de Prompt em Sequestro de Sessão**: Eventos maliciosos injetados no estado de sessão partilhado
- **Impostação de Sessão**: Uso não autorizado de IDs de sessão roubados para contornar autenticação
- **Ataques de Reanimação de Stream**: Exploração da retomada de eventos enviados pelo servidor para injeção de conteúdo malicioso

**Controlos Obrigatórios de Sessão:**
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

**Segurança no Transporte:**
- **Aplicação de HTTPS**: Toda comunicação da sessão via TLS 1.3
- **Atributos Seguros de Cookie**: HttpOnly, Secure, SameSite=Strict
- **Pinagem de Certificados**: Para conexões críticas para prevenir ataques MITM

### **Considerações Stateful vs Stateless**

**Para Implementações Stateful:**
- Estado de sessão partilhado requer proteção adicional contra ataques de injeção
- Gestão de sessões baseada em filas precisa de verificação de integridade
- Múltiplas instâncias de servidor requerem sincronização segura do estado da sessão

**Para Implementações Stateless:**
- Gestão de sessão baseada em JWT ou tokens semelhantes
- Verificação criptográfica da integridade do estado da sessão
- Superfície de ataque reduzida mas requer validação rigorosa do token

## 4. **Controlos de Segurança Específicos para IA**

**Riscos OWASP MCP Abordados**:  
- [MCP06 - Injeção de Prompt via Payloads Contextuais](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Envenenamento de Ferramentas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Injeção e Execução de Comandos](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Defesa Contra Injeção de Prompt**

**Integração Microsoft Prompt Shields:**  
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
- **Definição de Fronteira de Conteúdo**: Separação clara entre instruções do sistema e conteúdos do utilizador
- **Hierarquia de Instruções**: Regras de precedência apropriadas para instruções conflitantes
- **Monitorização de Saída**: Detecção de saídas potencialmente prejudiciais ou manipuladas

### **Prevenção de Envenenamento de Ferramentas**

**Framework de Segurança de Ferramentas:**  
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
- **Fluxos de Aprovação**: Consentimento explícito do utilizador para modificações de ferramentas
- **Capacidade de Reversão**: Possibilidade de reverter para versões anteriores da ferramenta
- **Auditoria de Alterações**: Histórico completo das modificações de definições das ferramentas
- **Avaliação de Risco**: Avaliação automatizada do posicionamento de segurança da ferramenta

## 5. **Prevenção de Ataque Confused Deputy**

### **Segurança em Proxy OAuth**

**Controlos de Prevenção de Ataque:**  
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
- **Verificação de Consentimento do Utilizador**: Nunca omitir ecrãs de consentimento para registo dinâmico de clientes
- **Validação de URI de Redirecionamento**: Validação rigorosa com listas brancas dos destinos de redirecionamento
- **Proteção de Código de Autorização**: Códigos de curta duração com aplicação de uso único
- **Verificação da Identidade do Cliente**: Validação robusta de credenciais e metadados do cliente

## 6. **Segurança na Execução de Ferramentas**

### **Sandboxing & Isolamento**

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
- **Comunicação Interprocessos**: Mecanismos IPC seguros com validação
- **Monitorização de Processo**: Análise de comportamento em tempo real e deteção de anomalias
- **Aplicação de Recursos**: Limites rígidos em CPU, memória e operações de I/O

### **Implementação do Privilégio Mínimo**

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
  
## 7. **Controlos de Segurança da Cadeia de Abastecimento**

**Risco OWASP MCP Abordado**: [MCP04 - Ataques à Cadeia de Abastecimento](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

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

**Deteção de Ameaças da Cadeia de Abastecimento:**
- **Monitorização de Estado das Dependências**: Avaliação contínua de todas as dependências para problemas de segurança
- **Integração de Inteligência de Ameaças**: Atualizações em tempo real sobre ameaças emergentes na cadeia de abastecimento
- **Análise Comportamental**: Deteção de comportamento invulgar em componentes externos
- **Resposta Automatizada**: Contenção imediata de componentes comprometidos

## 8. **Controlos de Monitorização & Deteção**

**Risco OWASP MCP Abordado**: [MCP08 - Falta de Auditoria & Telemetria](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Gestão de Informações e Eventos de Segurança (SIEM)**

**Estratégia Abrangente de Registos:**  
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
  
### **Deteção em Tempo Real de Ameaças**

**Análises Comportamentais:**
- **Análise de Comportamento do Utilizador (UBA)**: Deteção de padrões invulgares de acesso de utilizadores
- **Análise de Comportamento de Entidades (EBA)**: Monitorização do comportamento do servidor MCP e ferramentas
- **Deteção de Anomalias por Aprendizagem Automática**: Identificação assistida por IA das ameaças de segurança
- **Correlação de Inteligência de Ameaças**: Confronto das atividades observadas com padrões de ataque conhecidos

## 9. **Resposta a Incidentes & Recuperação**

### **Capacidades de Resposta Automatizada**

**Ações de Resposta Imediata:**  
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
- **Preservação de Trilhos de Auditoria**: Registos imutáveis com integridade criptográfica
- **Recolha de Evidências**: Recolha automatizada de artefactos de segurança relevantes
- **Reconstrução de Linha Temporal**: sequência detalhada de eventos que conduziram a incidentes de segurança
- **Avaliação do Impacto**: Avaliação do âmbito do compromisso e exposição de dados

## **Princípios-Chave da Arquitetura de Segurança**

### **Defesa em Profundidade**
- **Múltiplas Camadas de Segurança**: Nenhum ponto único de falha na arquitetura de segurança
- **Controlos Redundantes**: Medidas de segurança sobrepostas para funcionalidades críticas
- **Mecanismos Fail-Safe**: Definições seguras por omissão quando sistemas enfrentam erros ou ataques

### **Implementação Zero Trust**
- **Nunca Confiar, Sempre Verificar**: Validação contínua de todas as entidades e requisições
- **Princípio do Privilégio Mínimo**: Direitos de acesso mínimos para todos os componentes
- **Microsegmentação**: Controlos granulares de rede e acesso

### **Evolução Contínua da Segurança**
- **Adaptação ao Cenário de Ameaças**: Atualizações regulares para abordar ameaças emergentes
- **Eficácia dos Controlos de Segurança**: Avaliação contínua e melhoria dos controlos
- **Conformidade com Especificações**: Alinhamento com os padrões MCP de segurança em evolução

---

## **Recursos de Implementação**

### **Documentação Oficial MCP**
- [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificação de Autorização MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Recursos de Segurança OWASP MCP**
- [Guia de Segurança Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 completo com implementação Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscos oficiais de segurança OWASP MCP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formação prática em segurança para MCP na Azure

### **Soluções de Segurança Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Normas de Segurança**
- [Práticas de Segurança OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 para Modelos de Linguagem Extensa](https://genai.owasp.org/)
- [Estrutura de Cibersegurança NIST](https://www.nist.gov/cyberframework)

---

> **Importante**: Estes controlos de segurança refletem a especificação MCP atual (2025-11-25). Verifique sempre contra a [documentação oficial](https://spec.modelcontextprotocol.io/) mais recente, pois os padrões continuam a evoluir rapidamente.

## O que Vem a Seguir

- Retornar para: [Visão Geral do Módulo de Segurança](./README.md)
- Continuar para: [Módulo 3: Primeiros Passos](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos por garantir a precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->