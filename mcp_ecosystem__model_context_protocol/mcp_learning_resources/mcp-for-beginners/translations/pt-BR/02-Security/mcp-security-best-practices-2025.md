# Melhores Práticas de Segurança MCP - Atualização de Fevereiro de 2026

> **Importante**: Este documento reflete os mais recentes requisitos de segurança da [Especificação MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) e as oficiais [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Sempre consulte a especificação atual para as orientações mais atualizadas.

## 🏔️ Treinamento Prático em Segurança

Para experiência prática de implementação, recomendamos o **[Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - uma expedição guiada abrangente para proteger servidores MCP no Azure. O workshop aborda todos os riscos OWASP MCP Top 10 por meio da metodologia "vulnerável → exploração → correção → validação".

Todas as práticas deste documento estão alinhadas com o **[Guia de Segurança MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** para orientações específicas de implementação no Azure.

## Práticas Essenciais de Segurança para Implementações MCP

O Model Context Protocol apresenta desafios únicos de segurança que vão além da segurança tradicional de software. Essas práticas abordam tanto os requisitos de segurança fundamentais quanto as ameaças específicas do MCP, incluindo injeção de prompt, envenenamento de ferramentas, sequestro de sessão, problemas de delegado confuso e vulnerabilidades de passagem de token.

### **Requisitos de Segurança OBRIGATÓRIOS**

**Requisitos Críticos da Especificação MCP:**

### **Requisitos de Segurança OBRIGATÓRIOS**

**Requisitos Críticos da Especificação MCP:**

> **NÃO DEVE**: Servidores MCP **NÃO DEVEM** aceitar tokens que não tenham sido explicitamente emitidos para o servidor MCP  
>  
> **DEVE**: Servidores MCP que implementam autorização **DEVEM** verificar TODAS as requisições recebidas  
>  
> **NÃO DEVE**: Servidores MCP **NÃO DEVEM** usar sessões para autenticação  
>  
> **DEVE**: Servidores proxy MCP que usam IDs de cliente estáticos **DEVEM** obter consentimento do usuário para cada cliente registrado dinamicamente

---

## 1. **Segurança de Tokens & Autenticação**

**Controles de Autenticação & Autorização:**  
   - **Revisão Rigorosa da Autorização**: Realize auditorias completas da lógica de autorização do servidor MCP para garantir que apenas usuários e clientes autorizados possam acessar os recursos  
   - **Integração com Provedores de Identidade Externos**: Use provedores de identidade estabelecidos como Microsoft Entra ID em vez de implementar autenticação personalizada  
   - **Validação do Público do Token**: Valide sempre que os tokens foram explicitamente emitidos para seu servidor MCP - nunca aceite tokens upstream  
   - **Ciclo de Vida Adequado do Token**: Implemente rotação segura de tokens, políticas de expiração e previna ataques de repetição de token

**Armazenamento Protegido de Tokens:**  
   - Utilize Azure Key Vault ou armazenamentos seguros similares para todos os segredos  
   - Implemente criptografia para tokens tanto em repouso quanto em trânsito  
   - Rotação regular de credenciais e monitoramento para acessos não autorizados

## 2. **Gerenciamento de Sessão & Segurança de Transporte**

**Práticas de Sessão Seguras:**  
   - **IDs de Sessão Criptograficamente Seguros**: Use IDs de sessão seguros e não determinísticos gerados com geradores de números aleatórios confiáveis  
   - **Vinculação Específica ao Usuário**: Vincule IDs de sessão às identidades dos usuários usando formatos como `<user_id>:<session_id>` para evitar abuso de sessões entre usuários  
   - **Gerenciamento do Ciclo de Vida da Sessão**: Implemente expiração, rotação e invalidação apropriadas para limitar janelas de vulnerabilidade  
   - **Aplicação de HTTPS/TLS**: HTTPS obrigatório para toda comunicação para evitar interceptação dos IDs de sessão

**Segurança da Camada de Transporte:**  
   - Configure TLS 1.3 sempre que possível com gerenciamento adequado de certificados  
   - Implemente pinagem de certificados para conexões críticas  
   - Rotação regular de certificados e verificação de validade

## 3. **Proteção Contra Ameaças Específicas de IA** 🤖

**Defesa contra Injeção de Prompt:**  
   - **Escudos de Prompt Microsoft**: Implemente AI Prompt Shields para detecção avançada e filtragem de instruções maliciosas  
   - **Sanitização de Entrada**: Valide e sanitize todas as entradas para prevenir ataques de injeção e problemas de delegado confuso  
   - **Limites de Conteúdo**: Use sistemas de delimitadores e marcação de dados para distinguir entre instruções confiáveis e conteúdo externo

**Prevenção de Envenenamento de Ferramentas:**  
   - **Validação de Metadados de Ferramentas**: Implemente verificações de integridade para definições de ferramentas e monitore alterações inesperadas  
   - **Monitoramento Dinâmico de Ferramentas**: Monitore comportamento em tempo de execução e configure alertas para padrões de execução inesperados  
   - **Fluxos de Aprovação**: Exija aprovação explícita do usuário para modificações e alterações de capacidade das ferramentas

## 4. **Controle de Acesso & Permissões**

**Princípio do Menor Privilégio:**  
   - Conceda aos servidores MCP apenas as permissões mínimas necessárias para a funcionalidade pretendida  
   - Implemente controle de acesso baseado em função (RBAC) com permissões granulares  
   - Revisões regulares de permissões e monitoramento contínuo para escalonamento de privilégios

**Controles de Permissão em Tempo de Execução:**  
   - Aplique limites de recursos para evitar ataques de exaustão de recursos  
   - Use isolamento de contêiner para ambientes de execução das ferramentas  
   - Implemente acesso just-in-time para funções administrativas

## 5. **Segurança de Conteúdo & Monitoramento**

**Implementação de Segurança de Conteúdo:**  
   - **Integração com Azure Content Safety**: Utilize Azure Content Safety para detectar conteúdo prejudicial, tentativas de jailbreaks e violações de políticas  
   - **Análise Comportamental**: Implemente monitoramento comportamental em tempo de execução para detectar anomalias na execução de servidores e ferramentas MCP  
   - **Registro Abrangente**: Registre todas as tentativas de autenticação, invocações de ferramentas e eventos de segurança com armazenamento seguro e à prova de adulteração

**Monitoramento Contínuo:**  
   - Alertas em tempo real para padrões suspeitos e tentativas de acesso não autorizadas  
   - Integração com sistemas SIEM para gestão centralizada de eventos de segurança  
   - Auditorias regulares de segurança e testes de penetração nas implementações MCP

## 6. **Segurança da Cadeia de Suprimentos**

**Verificação de Componentes:**  
   - **Escaneamento de Dependências**: Use escaneamento automatizado de vulnerabilidades para todas as dependências de software e componentes de IA  
   - **Validação de Proveniência**: Verifique a origem, licenciamento e integridade de modelos, fontes de dados e serviços externos  
   - **Pacotes Assinados**: Use pacotes assinados criptograficamente e verifique assinaturas antes da implantação

**Pipeline de Desenvolvimento Seguro:**  
   - **GitHub Advanced Security**: Implemente escaneamento de segredos, análise de dependências e análise estática CodeQL  
   - **Segurança CI/CD**: Integre validação de segurança ao longo de pipelines automatizados de implantação  
   - **Integridade de Artefatos**: Implemente verificação criptográfica para artefatos e configurações implantadas

## 7. **Segurança OAuth & Prevenção de Delegado Confuso**

**Implementação OAuth 2.1:**  
   - **Implementação de PKCE**: Use Proof Key for Code Exchange (PKCE) para todas requisições de autorização  
   - **Consentimento Explícito**: Obtenha consentimento do usuário para cada cliente registrado dinamicamente para prevenir ataques de delegado confuso  
   - **Validação de Redirect URI**: Implemente validação rigorosa de URIs de redirecionamento e identificadores de clientes

**Segurança de Proxy:**  
   - Previna bypass de autorização por exploração de IDs de cliente estáticos  
   - Implemente fluxos de consentimento adequados para acesso a APIs de terceiros  
   - Monitore roubo de códigos de autorização e acessos não autorizados a APIs

## 8. **Resposta a Incidentes & Recuperação**

**Capacidades de Resposta Rápida:**  
   - **Resposta Automatizada**: Implemente sistemas automáticos para rotação de credenciais e contenção de ameaças  
   - **Procedimentos de Rollback**: Capacidade de reverter rapidamente para configurações e componentes conhecidos como bons  
   - **Capacidades Forenses**: Trilhas de auditoria detalhadas e registro para investigação de incidentes

**Comunicação & Coordenação:**  
   - Procedimentos claros de escalonamento para incidentes de segurança  
   - Integração com equipes organizacionais de resposta a incidentes  
   - Simulações regulares de incidentes de segurança e exercícios de mesa

## 9. **Conformidade & Governança**

**Conformidade Regulatória:**  
   - Garanta que as implementações MCP atendam aos requisitos específicos do setor (GDPR, HIPAA, SOC 2)  
   - Implemente classificação de dados e controles de privacidade para processamento de dados IA  
   - Mantenha documentação abrangente para auditorias de conformidade

**Gestão de Mudanças:**  
   - Processos formais de revisão de segurança para todas modificações no sistema MCP  
   - Controle de versão e fluxos de aprovação para alterações de configuração  
   - Avaliações regulares de conformidade e análise de lacunas

## 10. **Controles Avançados de Segurança**

**Arquitetura Zero Trust:**  
   - **Nunca Confie, Sempre Verifique**: Verificação contínua de usuários, dispositivos e conexões  
   - **Micro-segmentação**: Controles de rede granulares isolando componentes individuais do MCP  
   - **Acesso Condicional**: Controles de acesso baseados em risco que se adaptam ao contexto e comportamento atuais

**Proteção de Aplicação em Tempo de Execução:**  
   - **Runtime Application Self-Protection (RASP)**: Implemente técnicas RASP para detecção de ameaças em tempo real  
   - **Monitoramento de Performance da Aplicação**: Monitore anomalias de desempenho que podem indicar ataques  
   - **Políticas de Segurança Dinâmicas**: Implemente políticas que se adaptam conforme o cenário atual de ameaças

## 11. **Integração com Ecossistema de Segurança Microsoft**

**Segurança Microsoft Abrangente:**  
   - **Microsoft Defender for Cloud**: Gerenciamento da postura de segurança na nuvem para cargas MCP  
   - **Azure Sentinel**: SIEM e SOAR nativos de nuvem para detecção avançada de ameaças  
   - **Microsoft Purview**: Governança de dados e conformidade para fluxos de trabalho e fontes de dados IA

**Gerenciamento de Identidade & Acesso:**  
   - **Microsoft Entra ID**: Gerenciamento empresarial de identidade com políticas de acesso condicional  
   - **Privileged Identity Management (PIM)**: Acesso just-in-time e fluxos de aprovação para funções administrativas  
   - **Proteção de Identidade**: Acesso condicional baseado em risco e resposta automatizada a ameaças

## 12. **Evolução Contínua de Segurança**

**Manter-se Atualizado:**  
   - **Monitoramento da Especificação**: Revisão regular das atualizações da especificação MCP e mudanças nas orientações de segurança  
   - **Inteligência de Ameaças**: Integração de feeds específicos de ameaças IA e indicadores de comprometimento  
   - **Engajamento na Comunidade de Segurança**: Participação ativa na comunidade de segurança MCP e programas de divulgação de vulnerabilidades

**Segurança Adaptativa:**  
   - **Segurança com Aprendizado de Máquina**: Use detecção de anomalias baseada em ML para identificar novos padrões de ataque  
   - **Análise Preditiva de Segurança**: Implemente modelos preditivos para identificação proativa de ameaças  
   - **Automação de Segurança**: Atualizações automáticas de políticas de segurança baseadas em inteligência de ameaças e mudanças na especificação

---

## **Recursos Críticos de Segurança**

### **Documentação Oficial MCP**  
- [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Melhores Práticas de Segurança MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Especificação de Autorização MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Recursos de Segurança OWASP MCP**  
- [Guia de Segurança MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Completo OWASP MCP Top 10 com implementação Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riscos oficiais de segurança MCP OWASP  
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Treinamento prático em segurança MCP no Azure

### **Soluções de Segurança Microsoft**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Padrões de Segurança**  
- [Melhores Práticas de Segurança OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 para Grandes Modelos de Linguagem](https://genai.owasp.org/)  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Guias de Implementação**  
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
- [Microsoft Entra ID com Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Aviso de Segurança**: As práticas de segurança MCP evoluem rapidamente. Sempre verifique contra a [especificação MCP](https://spec.modelcontextprotocol.io/) e a [documentação oficial de segurança](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) atual antes da implementação.

## O Que Vem a Seguir

- Leia: [Controles de Segurança MCP 2025](./mcp-security-controls-2025.md)  
- Retorne para: [Visão Geral do Módulo de Segurança](./README.md)  
- Continue para: [Módulo 3: Introdução](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora façamos esforços para garantir a precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações equivocadas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->