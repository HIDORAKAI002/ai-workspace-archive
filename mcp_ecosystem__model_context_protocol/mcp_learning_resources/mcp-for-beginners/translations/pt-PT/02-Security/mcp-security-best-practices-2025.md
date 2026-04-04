# Melhores Práticas de Segurança MCP - Atualização de Fevereiro de 2026

> **Importante**: Este documento reflete os mais recentes requisitos de segurança da [Especificação MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) e as [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) oficiais. Consulte sempre a especificação atual para obter as orientações mais atualizadas.

## 🏔️ Formação Prática em Segurança

Para experiência prática de implementação, recomendamos o **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** – uma expedição guiada abrangente para assegurar servidores MCP no Azure. O workshop cobre todos os riscos OWASP MCP Top 10 através de uma metodologia "vulnerável → exploração → correção → validação".

Todas as práticas neste documento alinham-se com o **[Guia de Segurança Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** para orientações específicas de implementação no Azure.

## Práticas Essenciais de Segurança para Implementações MCP

O Model Context Protocol introduz desafios únicos de segurança que vão para além da segurança tradicional de software. Estas práticas abordam tanto os requisitos de segurança fundamentais como as ameaças específicas do MCP, incluindo injeção de prompt, envenenamento de ferramentas, sequestro de sessão, problemas de “confused deputy” e vulnerabilidades de passagem de tokens.

### **Requisitos de Segurança OBRIGATÓRIOS**

**Requisitos Críticos da Especificação MCP:**

### **Requisitos de Segurança OBRIGATÓRIOS**

**Requisitos Críticos da Especificação MCP:**

> **NÃO DEVE**: Os servidores MCP **NÃO DEVEM** aceitar qualquer token que não tenha sido explicitamente emitido para o servidor MCP
> 
> **DEVE**: Os servidores MCP que implementam autorização **DEVEM** verificar TODOS os pedidos recebidos
>  
> **NÃO DEVE**: Os servidores MCP **NÃO DEVEM** usar sessões para autenticação
>
> **DEVE**: Os servidores proxy MCP que usam IDs de cliente estáticos **DEVEM** obter o consentimento do utilizador para cada cliente registado dinamicamente

---

## 1. **Segurança de Tokens & Autenticação**

**Controlo de Autenticação & Autorização:**
   - **Revisão Rigorosa de Autorização**: Realizar auditorias abrangentes da lógica de autorização do servidor MCP para garantir que apenas utilizadores e clientes pretendidos acedem a recursos
   - **Integração com Provedor de Identidade Externo**: Utilizar provedores de identidade estabelecidos como o Microsoft Entra ID em vez de implementar autenticação personalizada
   - **Validação do Público do Token**: Validar sempre que os tokens foram explicitamente emitidos para o seu servidor MCP – nunca aceitar tokens a montante
   - **Ciclo de Vida Apropriado do Token**: Implementar rotação segura de tokens, políticas de expiração e prevenir ataques de repetição de token

**Armazenamento Protegido de Tokens:**
   - Utilizar Azure Key Vault ou armazenamentos de credenciais seguros semelhantes para todos os segredos
   - Implementar encriptação para tokens em repouso e em trânsito
   - Rotação regular de credenciais e monitorização para acessos não autorizados

## 2. **Gestão de Sessões & Segurança no Transporte**

**Práticas Seguras para Sessões:**
   - **IDs de Sessão Criptograficamente Seguros**: Usar IDs de sessão seguros e não determinísticos gerados com geradores seguros de números aleatórios
   - **Ligação Específica ao Utilizador**: Ligar IDs de sessão a identidades de utilizadores usando formatos como `<user_id>:<session_id>` para prevenir abuso de sessões entre utilizadores
   - **Gestão do Ciclo de Vida da Sessão**: Implementar expiração, rotação e invalidação adequada para limitar janelas de vulnerabilidade
   - **Aplicação de HTTPS/TLS**: HTTPS obrigatório para toda a comunicação para prevenir interceção de IDs de sessão

**Segurança da Camada de Transporte:**
   - Configurar TLS 1.3 sempre que possível com gestão adequada de certificados
   - Implementar “certificate pinning” para ligações críticas
   - Rotação regular de certificados e verificação da validade

## 3. **Proteção Contra Ameaças Específicas de IA** 🤖

**Defesa Contra Injeção de Prompt:**
   - **Escudos de Prompt Microsoft**: Implementar AI Prompt Shields para deteção avançada e filtragem de instruções maliciosas
   - **Saneamento de Entrada**: Validar e sanear todas as entradas para prevenir ataques de injeção e problemas de “confused deputy”
   - **Limites de Conteúdo**: Utilizar sistemas de delimitadores e marcação de dados para distinguir entre instruções confiáveis e conteúdo externo

**Prevenção de Envenenamento de Ferramentas:**
   - **Validação de Metadados das Ferramentas**: Implementar verificações de integridade para definições de ferramentas e monitorizar alterações inesperadas
   - **Monitorização Dinâmica de Ferramentas**: Monitorizar comportamento em tempo de execução e configurar alertas para padrões inesperados de execução
   - **Fluxos de Aprovação**: Exigir aprovação explícita do utilizador para modificações e alterações de capacidades das ferramentas

## 4. **Controlo de Acesso & Permissões**

**Princípio do Menor Privilégio:**
   - Conceder aos servidores MCP apenas as permissões mínimas necessárias para a funcionalidade pretendida
   - Implementar controlo de acesso baseado em funções (RBAC) com permissões granulares
   - Revisões regulares de permissões e monitorização contínua para escalonamento de privilégios

**Controlo de Permissões em Tempo de Execução:**
   - Aplicar limites de recursos para evitar ataques de exaustão de recursos
   - Utilizar isolamento por conteúdo para ambientes de execução de ferramentas  
   - Implementar acesso just-in-time para funções administrativas

## 5. **Segurança de Conteúdo & Monitorização**

**Implementação de Segurança de Conteúdo:**
   - **Integração Azure Content Safety**: Utilizar Azure Content Safety para detectar conteúdos nocivos, tentativas de jailbreak e violações de políticas
   - **Análise Comportamental**: Implementar monitorização comportamental em tempo de execução para detetar anomalias na execução do servidor MCP e das ferramentas
   - **Registo Abrangente**: Registar todas as tentativas de autenticação, invocações de ferramentas e eventos de segurança com armazenamento seguro e à prova de adulteração

**Monitorização Contínua:**
   - Alertas em tempo real para padrões suspeitos e tentativas de acesso não autorizado  
   - Integração com sistemas SIEM para gestão centralizada de eventos de segurança
   - Auditorias regulares de segurança e testes de penetração das implementações MCP

## 6. **Segurança da Cadeia de Fornecimento**

**Verificação de Componentes:**
   - **Análise de Dependências**: Usar análise automática de vulnerabilidades para todas as dependências de software e componentes de IA
   - **Validação da Proveniência**: Verificar a origem, licenciamento e integridade de modelos, fontes de dados e serviços externos
   - **Pacotes Assinados**: Utilizar pacotes com assinatura criptográfica e verificar assinaturas antes do deployment

**Pipeline de Desenvolvimento Seguro:**
   - **GitHub Advanced Security**: Implementar varredura de segredos, análise de dependências e análise estática CodeQL
   - **Segurança CI/CD**: Integrar validação de segurança ao longo dos pipelines de deployment automatizados
   - **Integridade de Artefactos**: Implementar verificação criptográfica para artefactos e configurações implantados

## 7. **Segurança OAuth & Prevenção de “Confused Deputy”**

**Implementação OAuth 2.1:**
   - **Implementação PKCE**: Usar Proof Key for Code Exchange (PKCE) para todos os pedidos de autorização
   - **Consentimento Explícito**: Obter consentimento do utilizador para cada cliente registado dinamicamente para prevenir ataques de “confused deputy”
   - **Validação de Redirect URI**: Implementar validação rigorosa de URIs de redirecionamento e identificadores de cliente

**Segurança de Proxy:**
   - Prevenir bypass de autorização através da exploração de IDs de cliente estáticos
   - Implementar fluxos de consentimento adequados para acesso a APIs de terceiros
   - Monitorizar roubo de códigos de autorização e acessos não autorizados a APIs

## 8. **Resposta a Incidentes & Recuperação**

**Capacidades de Resposta Rápida:**
   - **Resposta Automatizada**: Implementar sistemas automáticos para rotação de credenciais e contenção de ameaças
   - **Procedimentos de Rollback**: Capacidade para reverter rapidamente para configurações e componentes conhecidos como seguros
   - **Capacidades Forenses**: Trilhas de auditoria detalhadas e registos para investigação de incidentes

**Comunicação & Coordenação:**
   - Procedimentos claros de escalonamento para incidentes de segurança
   - Integração com equipas organizacionais de resposta a incidentes
   - Simulações regulares de incidentes de segurança e exercícios de mesa

## 9. **Conformidade & Governação**

**Conformidade Regulamentar:**
   - Garantir que as implementações MCP cumprem os requisitos específicos do setor (GDPR, HIPAA, SOC 2)
   - Implementar classificação de dados e controlos de privacidade para o processamento de dados IA
   - Manter documentação abrangente para auditorias de conformidade

**Gestão de Alterações:**
   - Processos formais de revisão de segurança para todas as modificações de sistemas MCP
   - Controlo de versões e fluxos de aprovação para alterações de configuração
   - Avaliações regulares de conformidade e análise de lacunas

## 10. **Controlo Avançado de Segurança**

**Arquitectura Zero Trust:**
   - **Nunca Confiar, Verificar Sempre**: Verificação contínua de utilizadores, dispositivos e ligações
   - **Microsegmentação**: Controlo granular de rede a isolar componentes individuais MCP
   - **Acesso Condicional**: Controlos de acesso baseados em risco que se adaptam ao contexto e comportamento atual

**Proteção da Aplicação em Tempo de Execução:**
   - **Runtime Application Self-Protection (RASP)**: Implementar técnicas RASP para deteção de ameaças em tempo real
   - **Monitorização de Performance da Aplicação**: Monitorizar anomalias de performance que possam indicar ataques
   - **Políticas de Segurança Dinâmicas**: Implementar políticas de segurança que se adaptem com base no panorama de ameaças atual

## 11. **Integração com o Ecossistema de Segurança Microsoft**

**Segurança Microsoft Abrangente:**
   - **Microsoft Defender for Cloud**: Gestão de postura de segurança na cloud para cargas de trabalho MCP
   - **Azure Sentinel**: Capacidades nativas cloud SIEM e SOAR para deteção avançada de ameaças
   - **Microsoft Purview**: Governação e conformidade de dados para fluxos e fontes de dados IA

**Gestão de Identidade & Acesso:**
   - **Microsoft Entra ID**: Gestão de identidade empresarial com políticas de acesso condicional
   - **Privileged Identity Management (PIM)**: Acesso just-in-time e fluxos de aprovação para funções administrativas
   - **Proteção de Identidade**: Acesso condicional baseado em risco e resposta a ameaças automatizada

## 12. **Evolução Contínua da Segurança**

**Manter-se Atualizado:**
   - **Monitorização da Especificação**: Revisões regulares das atualizações da especificação MCP e alterações de orientações de segurança
   - **Inteligência de Ameaças**: Integração de feeds específicos de IA e indicadores de compromisso
   - **Engajamento na Comunidade de Segurança**: Participação ativa na comunidade de segurança MCP e programas de divulgação de vulnerabilidades

**Segurança Adaptativa:**
   - **Segurança por Aprendizagem Automática**: Utilizar deteção de anomalias baseada em ML para identificar padrões de ataque novos
   - **Análise de Segurança Preditiva**: Implementar modelos preditivos para identificação proativa de ameaças
   - **Automação de Segurança**: Atualizações automáticas de políticas de segurança baseadas em inteligência de ameaças e mudanças na especificação

---

## **Recursos Críticos de Segurança**

### **Documentação Oficial MCP**
- [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificação de Autorização MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Recursos de Segurança OWASP MCP**
- [Guia de Segurança Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) – OWASP MCP Top 10 abrangente com implementação no Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Riscos de segurança oficiais OWASP MCP
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) – Formação prática de segurança MCP no Azure

### **Soluções de Segurança Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Segurança Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Normas de Segurança**
- [Melhores Práticas de Segurança OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 para Modelos de Linguagem de Grande Porte](https://genai.owasp.org/)
- [Framework de Gestão de Risco IA NIST](https://www.nist.gov/itl/ai-risk-management-framework)

### **Guias de Implementação**
- [Gateway de Autenticação MCP Azure API Management](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID com Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Aviso de Segurança**: As práticas de segurança MCP evoluem rapidamente. Verifique sempre a [especificação MCP atual](https://spec.modelcontextprotocol.io/) e a [documentação oficial de segurança](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) antes da implementação.

## Próximos Passos

- Ler: [Controlo de Segurança MCP 2025](./mcp-security-controls-2025.md)
- Voltar para: [Visão Geral do Módulo de Segurança](./README.md)
- Continuar para: [Módulo 3: Começar](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, tenha em atenção que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->