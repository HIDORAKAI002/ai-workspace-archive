# MCP Security: Complete Protection for AI Systems

[![MCP Security Best Practices](../../../translated_images/pcm/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Click di picture wey dey top to watch dis lesson video)_

Security na important part for AI system design, dat na why we put am for our second section. Dis one align wit Microsoft **Secure by Design** principle from di [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Di Model Context Protocol (MCP) bring strong waka come for AI-driven apps as e bring new security wahala wey pass traditional software risks. MCP systems dey face both old security matter (secure coding, least privilege, supply chain security) plus new AI-specific wahala like prompt injection, tool poisoning, session hijacking, confused deputy attack dem, token passthrough wahala, and changing capabilities betta.

Dis lesson go talk about the most important security palava for MCP wey cover authentication, authorization, excessive permissions, indirect prompt injection, session security, confused deputy problems, token management, and supply chain wahala dem. You go learn how to take control and use best ways wey fit reduce these problem dem while you use Microsoft solution like Prompt Shields, Azure Content Safety, and GitHub Advanced Security to make your MCP setup strong.

## Wetin You Go Learn

When you finish dis lesson, you go fit:

- **See MCP-Specific Wahala Dem**: Know di special security risks wey belong to MCP systems like prompt injection, tool poisoning, too much permissions, session hijacking, confused deputy problems, token passthrough problems, and supply chain wahala dem
- **Use Security Controls**: Do correct mitigation including strong authentication, least privilege access, safe token management, session security controls, and checking supply chain
- **Use Microsoft Security Solutions Well**: Understand and apply Microsoft Prompt Shields, Azure Content Safety, and GitHub Advanced Security to protect MCP workload dem
- **Check Tool Security Well**: Know why tool metadata validation important, dey watch for changes, and defend against indirect prompt injection attacks
- **Combine Best Ways**: Bring together strong security basics (secure coding, server hardening, zero trust) with MCP-specific controls for strong protection

# MCP Security Architecture & Controls

Modern MCP implementations need layered security wey go solve both normal software security and AI specific threats. Di MCP specification dey grow fast and e dey improve e security controls, so e fit better join enterprise security setup plus proven practices.

Research from di [Microsoft Digital Defense Report](https://aka.ms/mddr) show say **98% of reported breaches fit stop if correct security hygiene dey**. Di best protection na to join basic security practice with MCP-specific controls—di base security ways still na di best to reduce overall risk.

## Today Security Situation

> **Note:** Dis info show MCP security standards as of **February 5, 2026**, based on **MCP Specification 2025-11-25**. Di MCP protocol dey grow fast, and new versions fit bring new authentication patterns plus better controls. Make sure you dey check di current [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol), and [security best practices documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) for latest info.

## 🏔️ MCP Security Summit Workshop (Sherpa)

For **hands-on security training**, we highly recommend **MCP Security Summit Workshop** (Sherpa) - na full guide journey to secure MCP servers for Microsoft Azure.

### Workshop Overview

Di [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) dey give practical and workable security training through tested "vulnerable → exploit → fix → validate" steps. You go:

- **Learn by Breaking Things**: Experience vulnerabilities directly by attacking purposely insecure server dem
- **Use Azure-Native Security**: Use Azure Entra ID, Key Vault, API Management, and AI Content Safety
- **Follow Defense-in-Depth**: Move through camps wey build complete security layers
- **Use OWASP Standards**: Every step follow [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Get Production Code**: Come out wit working and tested code dem

### The Expedition Route

| Camp | Focus | OWASP Risks Covered |
|------|-------|---------------------|
| **Base Camp** | MCP basics & authentication vulnerabilities | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, governance | MCP02, MCP07, MCP09 |
| **Camp 3: I/O Security** | Prompt injection, PII protection, content safety | MCP03, MCP05, MCP06 |
| **Camp 4: Monitoring** | Log Analytics, dashboards, threat detection | MCP08 |
| **The Summit** | Red Team / Blue Team integration test | All |

**Start Here**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Security Wahala Dem

Di [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) talk about ten most serious security risks for MCP implementations:

| Risk | Description | Azure Mitigation |
|------|-------------|------------------|
| **MCP01** | Token Mismanagement & Secret Exposure | Azure Key Vault, Managed Identity |
| **MCP02** | Privilege Escalation via Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Tool validation, integrity verification |
| **MCP04** | Supply Chain Attacks | GitHub Advanced Security, dependency scanning |
| **MCP05** | Command Injection & Execution | Input validation, sandboxing |
| **MCP06** | Prompt Injection via Contextual Payloads | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Insufficient Authentication & Authorization | Azure Entra ID, OAuth 2.1 with PKCE |
| **MCP08** | Lack of Audit & Telemetry | Azure Monitor, Application Insights |
| **MCP09** | Shadow MCP Servers | API Center governance, network isolation |
| **MCP10** | Context Injection & Over-Sharing | Data classification, minimal exposure |

### How MCP Authentication Don Change

Di MCP specification don change well well how e take do authentication and authorization:

- **Original Way**: Earlier specs ask developers to make their own authentication servers, MCP servers come be OAuth 2.0 Authorization Servers wey handle user authentication direct
- **Current Standard (2025-11-25)**: Updated specs allow MCP servers to pass authentication to external identity providers (like Microsoft Entra ID), e make security better and make am easier to build
- **Transport Layer Security**: Better support for safe transport wey get correct authentication for both local (STDIO) and remote (Streamable HTTP) connections

## Authentication & Authorization Security

### Current Security Wahala

Modern MCP implementations face plenti authentication and authorization problems:

### Risks & Wahala Sources

- **Bad Authorization Logic**: Wrong authorization inside MCP servers fit cause sensitive data leak and wrong access control apply
- **OAuth Token Theft**: When local MCP server token get stolen, attackers fit pretend to be server and access downstream services
- **Token Passthrough Danger**: Wrong token handling fit make security checks skip and cause accountability problem
- **Too Much Permissions**: MCP servers wey get more permission pass wey dem need don break least privilege and make attack surface bigger

#### Token Passthrough: Big No No

**Token passthrough no allowed at all** for MCP authorization specs now because e fit cause big security palava:

##### Security Control Bypass
- MCP servers and downstream APIs get critical security controls (rate limits, request checks, traffic watching) wey depend on proper token validation
- Client to API direct token use go bypass these protection, e go spoil security arrangement

##### Accountability & Audit Wahala  
- MCP servers no fit tell difference between clients using upstream tokens, dis go spoil audit tracking
- Logs for downstream servers go show menday origin instead of MCP server wey pass am
- E go hard to do incident checking and audit for compliance

##### Data Stealing Danger
- If token claims no valid, bad actors wey get stolen tokens fit use MCP servers as middlemen to steal data
- Breach trust line go allow unauthorized access wey bypass security

##### Multi-Service Attack Ways
- Stolen tokens wey many services accept fit allow side-side movement through systems
- Trust wey dey between services fit break if token origin no fit check well

### Controls & How to Mitigate

**Important Security Rules:**

> **MANDATORY**: MCP servers **MUST NOT** accept any token wey no dey originally for the MCP server

#### Authentication & Authorization Controls

- **Strict Authorization Audit**: Make sure say you properly check MCP server authorization logic so only correct users and clients fit enter sensitive stuff
  - **Implementation Guide**: [Azure API Management as Authentication Gateway for MCP Servers](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identity Integration**: [Using Microsoft Entra ID for MCP Server Authentication](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Safe Token Management**: Use [Microsoft token validation and lifecycle best practices](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Check token audience fit MCP server identity
  - Make token rotation and expiry rules well
  - Avoid token replay and unauthorized use

- **Secure Token Storage**: Keep tokens safe with encryption for rest and transit
  - **Best Practices**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Access Control Setup

- **Least Privilege Principle**: Only give MCP servers minimal permission wey dem need
  - Regularly check permission to stop creep
  - **Microsoft Doc**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Assign roles fine fine
  - Make roles tight for specific resources and actions
  - Avoid wide permission wey fit increase attack chance

- **Keep Watching Permissions**: Continuously audit and watch
  - Check patterns for strange behaviour
  - Correct excess or no use permissions quick quick

## AI-Specific Security Threats

### Prompt Injection & Tool Manipulation Attacks

Modern MCP implementations too face advanced AI-specific attack waka wey normal security fit no cover finish:

#### **Indirect Prompt Injection (Cross-Domain Prompt Injection)**

**Indirect Prompt Injection** na one of di worst weaknesses for MCP AI systems. Attackers hide bad instructions inside external content—documents, website pages, emails, or data sources—wey AI systems later take as correct commands.

**Attack Examples:**
- **Document Injection**: Malicious instructions hidden inside documents wey AI process to do wrong thing
- **Web Content Wahala**: Bad web pages wey get embedded prompts wey shak AI behavior when dem scrape am
- **Email Attacks**: Malicious prompts inside emails wey make AI assistant leak info or do unauthorized things
- **Data Source Corruption**: Bad data or APIs wey send wrong content go AI systems

**Real Impact**: These attacks fit cause data leak, privacy break, bad content generation, and user interaction manipulation. For deep info, see [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/pcm/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning Attacks**

**Tool Poisoning** dey target metadata wey define MCP tools, to exploit how LLMs understand tool descriptions and parameters to decide how to act.

**Attack Methods:**
- **Metadata Change**: Attackers inject bad instructions into tool description, parameter definitions, or usage examples
- **Invisible Instructions**: Hidden prompts inside tool metadata wey AI models process but humans no fit see
- **Dynamic Tool Change ("Rug Pulls")**: Tools wey users approve later dem change am to do bad actions without user knowledge
- **Parameter Injection**: Malicious stuff inside tool parameter schemes wey affect model behavior

**Hosted Server Dangers**: Remote MCP servers get higher risk because tool definitions fit update after user approve, make tools wey safe before now bad. For full analysis, see [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/pcm/tool-injection.3b0b4a6b24de6bef.webp)

#### **More AI Attack Wahala**

- **Cross-Domain Prompt Injection (XPIA)**: Complex attacks wey use content from many domains to pass security checks
- **Dynamic Capability Modification**: Real-time changes to tool capabilities wey fit waka comot from original security checks
- **Context Window Poisoning**: Attacks wey dem use manipulate big context windows to hide bad instructions
- **Model Confusion Attacks**: Use model limitations take create unpredictable or unsafe behaviors


### AI Security Risk Impact

**High-Impact Consequences:**
- **Data Exfiltration**: Unauthorized access and theft of sensitive enterprise or personal data
- **Privacy Breaches**: Exposure of personally identifiable information (PII) and confidential business data  
- **System Manipulation**: Unintended modifications to critical systems and workflows
- **Credential Theft**: Compromise of authentication tokens and service credentials
- **Lateral Movement**: Use of compromised AI systems as pivots for broader network attacks

### Microsoft AI Security Solutions

#### **AI Prompt Shields: Advanced Protection Against Injection Attacks**

Microsoft **AI Prompt Shields** provide comprehensive defense against both direct and indirect prompt injection attacks through multiple security layers:

##### **Core Protection Mechanisms:**

1. **Advanced Detection & Filtering**
   - Machine learning algorithms and NLP techniques detect malicious instructions in external content
   - Real-time analysis of documents, web pages, emails, and data sources for embedded threats
   - Contextual understanding of legitimate vs. malicious prompt patterns

2. **Spotlighting Techniques**  
   - Distinguishes between trusted system instructions and potentially compromised external inputs
   - Text transformation methods that enhance model relevance while isolating malicious content
   - Helps AI systems maintain proper instruction hierarchy and ignore injected commands

3. **Delimiter & Datamarking Systems**
   - Explicit boundary definition between trusted system messages and external input text
   - Special markers highlight boundaries between trusted and untrusted data sources
   - Clear separation prevents instruction confusion and unauthorized command execution

4. **Continuous Threat Intelligence**
   - Microsoft continuously monitors emerging attack patterns and updates defenses
   - Proactive threat hunting for new injection techniques and attack vectors
   - Regular security model updates to maintain effectiveness against evolving threats

5. **Azure Content Safety Integration**
   - Part of comprehensive Azure AI Content Safety suite
   - Additional detection for jailbreak attempts, harmful content, and security policy violations
   - Unified security controls across AI application components

**Implementation Resources**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/pcm/prompt-shield.ff5b95be76e9c78c.webp)


## Advanced MCP Security Threats

### Session Hijacking Vulnerabilities

**Session hijacking** na critical attack wey dey happen for stateful MCP implementations wey unauthorized people fit use get and abuse correct session identifiers to act like clients and do unauthorized things.

#### **Attack Scenarios & Risks**

- **Session Hijack Prompt Injection**: Attackers wey carry stolen session IDs go inject bad events into servers wey share session state, fit cause harmful actions or access sensitive data
- **Direct Impersonation**: Stolen session IDs fit make attackers call MCP server directly without authentication, dem go dey treated as correct users
- **Compromised Resumable Streams**: Attackers fit stop requests sharp-sharp, make correct clients resume with possible bad content

#### **Security Controls for Session Management**

**Critical Requirements:**
- **Authorization Verification**: MCP servers wey dey do authorization **MUST** check ALL incoming requests and **MUST NOT** rely on sessions for authentication
- **Secure Session Generation**: Use cryptographically secure, random session IDs wey no dey predictable
- **User-Specific Binding**: Attach session IDs to user-specific info like `<user_id>:<session_id>` to stop cross-user session abuse
- **Session Lifecycle Management**: Set proper expiry, rotation, and invalidation to reduce vulnerability time
- **Transport Security**: Make HTTPS dey mandatory for all communication to stop session ID interception

### Confused Deputy Problem

The **confused deputy problem** dey happen when MCP servers act as authentication middlemen between clients and third-party services, e dey open door for authorization bypass if people exploit static client ID.

#### **Attack Mechanics & Risks**

- **Cookie-based Consent Bypass**: Previous user authentication dey create consent cookies wey attackers fit use with bad authorization requests with crafted redirect URIs
- **Authorization Code Theft**: Existing consent cookies fit make authorization servers skip consent screens, redirect codes go attacker-controlled endpoints  
- **Unauthorized API Access**: Stolen authorization codes fit allow token exchange and user impersonation without proper permission

#### **Mitigation Strategies**

**Mandatory Controls:**
- **Explicit Consent Requirements**: MCP proxy servers wey use static client IDs **MUST** get user consent for every dynamically registered client
- **OAuth 2.1 Security Implementation**: Follow present OAuth security best practices like PKCE (Proof Key for Code Exchange) for all authorization requests
- **Strict Client Validation**: Do thorough validation of redirect URIs and client IDs to stop exploitation

### Token Passthrough Vulnerabilities  

**Token passthrough** na clear anti-pattern where MCP servers accept client tokens without proper validation and send dem to downstream APIs, e dey break MCP authorization rules.

#### **Security Implications**

- **Control Circumvention**: Direct client-to-API token use bypass critical rate limiting, validation, and monitoring controls
- **Audit Trail Corruption**: Tokens issued upstream make e hard to identify client, break investigation
- **Proxy-based Data Exfiltration**: Unchecked tokens fit allow bad actors use servers as proxy to access data unauthorized
- **Trust Boundary Violations**: Downstream services trust fit break if token origins no fit verify
- **Multi-service Attack Expansion**: Bad tokens accepted for many services fit support lateral movement

#### **Required Security Controls**

**Non-negotiable Requirements:**
- **Token Validation**: MCP servers **MUST NOT** accept tokens wey no explicitly issued for MCP server
- **Audience Verification**: Always check token audience match MCP server identity
- **Proper Token Lifecycle**: Use short-lived tokens with secure rotation practices


## Supply Chain Security for AI Systems

Supply chain security don move beyond normal software dependencies to cover full AI ecosystem. Modern MCP implementations must strictly verify and monitor all AI parts, as each fit bring vulnerability wey fit spoil system integrity.

### Expanded AI Supply Chain Components

**Traditional Software Dependencies:**
- Open-source libraries and frameworks
- Container images and base systems  
- Development tools and build pipelines
- Infrastructure components and services

**AI-Specific Supply Chain Elements:**
- **Foundation Models**: Pre-trained models from different providers wey need provenance check
- **Embedding Services**: External vectorization and semantic search services
- **Context Providers**: Data sources, knowledge bases, and document repositories  
- **Third-party APIs**: External AI services, ML pipelines, and data processing endpoints
- **Model Artifacts**: Weights, configs, and fine-tuned model variants
- **Training Data Sources**: Datasets used for model training and fine-tuning

### Comprehensive Supply Chain Security Strategy

#### **Component Verification & Trust**
- **Provenance Validation**: Check origin, licensing, and integrity of all AI parts before integration
- **Security Assessment**: Scan for vulnerabilities and do security reviews for models, data sources, and AI services
- **Reputation Analysis**: Check security history and practices of AI service providers
- **Compliance Verification**: Make sure all parts meet organizational security and regulatory rules

#### **Secure Deployment Pipelines**  
- **Automated CI/CD Security**: Add security scanning for all automated deployment pipelines
- **Artifact Integrity**: Use cryptographic verification for all deployed artifacts (code, models, configs)
- **Staged Deployment**: Deploy progressively with security checks at every step
- **Trusted Artifact Repositories**: Only deploy from verified and secure artifact registries and repositories

#### **Continuous Monitoring & Response**
- **Dependency Scanning**: Constantly check for vulnerabilities in all software and AI dependencies
- **Model Monitoring**: Continuous watch on model behavior, performance drift, and security issues
- **Service Health Tracking**: Monitor external AI services for uptime, security incidents, and policy changes
- **Threat Intelligence Integration**: Add threat feeds specific to AI and ML security risks

#### **Access Control & Least Privilege**
- **Component-level Permissions**: Limit access to models, data, and services based on business need
- **Service Account Management**: Use dedicated service accounts with minimum needed permissions
- **Network Segmentation**: Separate AI components network-wise and limit access between services
- **API Gateway Controls**: Use central API gateways to control and monitor access to external AI services

#### **Incident Response & Recovery**
- **Rapid Response Procedures**: Have established ways to patch or replace compromised AI parts quickly
- **Credential Rotation**: Automated systems for rotating secrets, API keys, and service credentials
- **Rollback Capabilities**: Fit quickly revert to previous known-good AI parts versions
- **Supply Chain Breach Recovery**: Specific procedures to handle upstream AI service compromises

### Microsoft Security Tools & Integration

**GitHub Advanced Security** dey provide comprehensive supply chain protection including:
- **Secret Scanning**: Automatic detection of credentials, API keys, and tokens in repos
- **Dependency Scanning**: Vulnerability check for open-source dependencies and libraries
- **CodeQL Analysis**: Static code analysis for security problems and bugs
- **Supply Chain Insights**: Visibility into dependency health and security status

**Azure DevOps & Azure Repos Integration:**
- Smooth security scanning integration for Microsoft development platforms
- Auto security checks in Azure Pipelines for AI workloads
- Policy enforcement for secure AI component deployment

**Microsoft Internal Practices:**
Microsoft dey do thorough supply chain security across their products. Learn about proven ways for [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Foundation Security Best Practices

MCP implementations build on top your organization existing security foundation. Strong foundation security practices go improve overall AI systems and MCP deployments security.

### Core Security Fundamentals

#### **Secure Development Practices**
- **OWASP Compliance**: Protect against [OWASP Top 10](https://owasp.org/www-project-top-ten/) web app vulnerabilities
- **AI-Specific Protections**: Put controls for [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Secure Secrets Management**: Use dedicated vaults for tokens, API keys, and sensitive config data
- **End-to-End Encryption**: Make secure communication for all app components and data flows
- **Input Validation**: Strict validation of all user inputs, API params, and data sources

#### **Infrastructure Hardening**
- **Multi-Factor Authentication**: Required MFA for all admin and service accounts
- **Patch Management**: Automated, timely patching for OS, frameworks, and dependencies  
- **Identity Provider Integration**: Central identity management with enterprise identity providers (Microsoft Entra ID, Active Directory)
- **Network Segmentation**: Logical isolation of MCP parts to limit lateral movement danger
- **Principle of Least Privilege**: Only give minimal needed permissions for all systems and accounts

#### **Security Monitoring & Detection**
- **Comprehensive Logging**: Detailed logs of AI app activities including MCP client-server interactions
- **SIEM Integration**: Centralized security info and event management for anomaly detection
- **Behavioral Analytics**: AI-powered monitors to catch unusual patterns in system and user behavior
- **Threat Intelligence**: Add external threat feeds and compromise indicators (IOCs)
- **Incident Response**: Clear procedures for security incident detection, response, and recovery

#### **Zero Trust Architecture**
- **Never Trust, Always Verify**: Always verify users, devices, and network connections
- **Micro-Segmentation**: Fine-grained network controls to isolate workloads and services
- **Identity-Centric Security**: Security policies based on verified identity, no be network location
- **Continuous Risk Assessment**: Dynamic security posture check based on current context and behaviour
- **Conditional Access**: Access controls wey adjust based on risk factors, location, and device trust

### Enterprise Integration Patterns

#### **Microsoft Security Ecosystem Integration**
- **Microsoft Defender for Cloud**: Complete cloud security posture management
- **Azure Sentinel**: Cloud-native SIEM and SOAR for AI workload protection
- **Microsoft Entra ID**: Enterprise identity and access management with conditional access policies
- **Azure Key Vault**: Central secrets management with hardware security module (HSM) backing
- **Microsoft Purview**: Data governance and compliance for AI data sources and workflows

#### **Compliance & Governance**
- **Regulatory Alignment**: Make sure MCP implementations meet industry-specific compliance (GDPR, HIPAA, SOC 2)
- **Data Classification**: Proper tagging and handling of sensitive data AI systems process
- **Audit Trails**: Full logging for regulatory compliance and forensic investigation
- **Privacy Controls**: Use privacy-by-design principles in AI system architecture
- **Change Management**: Formal process for security checks on AI system changes

These foundational practices create solid security baseline wey improve MCP-specific security controls effectiveness and give full protection for AI-driven apps.
## Key Security Takeaways

- **Layered Security Approach**: Combine foundational security practices (secure coding, least privilege, supply chain verification, continuous monitoring) wit AI-specific controls for comprehensive protection

- **AI-Specific Threat Landscape**: MCP systems dey face unique risks including prompt injection, tool poisoning, session hijacking, confused deputy problems, token passthrough vulnerabilities, and excessive permissions wey need specialized mitigations

- **Authentication & Authorization Excellence**: Implement robust authentication using external identity providers (Microsoft Entra ID), enforce proper token validation, and never accept tokens wey no explicitly issued for your MCP server

- **AI Attack Prevention**: Deploy Microsoft Prompt Shields and Azure Content Safety to defend against indirect prompt injection and tool poisoning attacks, while validating tool metadata and monitoring for dynamic changes

- **Session & Transport Security**: Use cryptographically secure, non-deterministic session IDs wey bind to user identities, implement proper session lifecycle management, and never use sessions for authentication

- **OAuth Security Best Practices**: Prevent confused deputy attacks through explicit user consent for dynamically registered clients, proper OAuth 2.1 implementation wit PKCE, and strict redirect URI validation  

- **Token Security Principles**: Avoid token passthrough anti-patterns, validate token audience claims, implement short-lived tokens wit secure rotation, and maintain clear trust boundaries

- **Comprehensive Supply Chain Security**: Treat all AI ecosystem components (models, embeddings, context providers, external APIs) wit the same security rigor as traditional software dependencies

- **Continuous Evolution**: Stay current wit rapidly evolving MCP specifications, contribute to security community standards, and maintain adaptive security postures as the protocol matures

- **Microsoft Security Integration**: Leverage Microsoft's comprehensive security ecosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) for enhanced MCP deployment protection

## Comprehensive Resources

### **Official MCP Security Documentation**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Security Resources**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Comprehensive OWASP MCP Top 10 wit Azure implementation guidance
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Official OWASP MCP security risks
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on security training for MCP on Azure

### **Security Standards & Best Practices**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI Security Research & Analysis**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Security Solutions**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementation Guides & Tutorials**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Supply Chain Security**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Additional Security Documentation**

For comprehensive security guidance, refer to these specialized documents in this section:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Complete security best practices for MCP implementations
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Practical implementation examples for Azure Content Safety integration  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Latest security controls and techniques for MCP deployments
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Quick reference guide for essential MCP security practices

### **Hands-On Security Training**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Comprehensive hands-on workshop for securing MCP servers in Azure wit progressive camps from Base Camp to Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Reference architecture and implementation guidance for all OWASP MCP Top 10 risks

---

## What's Next

Next: [Chapter 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we try make am correct, abeg sabi say automated translation fit get some mistakes or no-too-correct parts. Di original document for im own language na di correct one wey you suppose trust. If na serious mata, e better make human professional translate am. We no go take responsibility if person no understand well or if mistake show because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->