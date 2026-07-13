# MCP Security: Complete Protection for AI Systems

[![MCP Security Best Practices](../../../translated_images/pcm/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Click di picture udaw to watch di video for dis lesson)_

Security na important tin for AI system design, dat na why we put am for our second section. Dis one dey follow Microsoft **Secure by Design** principle from di [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Di Model Context Protocol (MCP) dey bring strong new features to AI-driven apps but e still get unique security wahala wey wide pass normal software risks. MCP systems get both normal security gbege (secure coding, least privilege, supply chain security) plus new AI-specific trouble including prompt injection, tool poisoning, session hijacking, confused deputy attacks, token passthrough wahala, and dynamic capability change.

Dis lesson go show di most important security risks for MCP implementations—cover authentications, authorizations, too much permissions, indirect prompt injection, session security, confused deputy palava, token management, plus supply chain risk dem. You go sabi actionable controls and beta beta ways to reduce di risks and also use Microsoft tools like Prompt Shields, Azure Content Safety, and GitHub Advanced Security to make your MCP set-up strong.

## Wetin You Go Learn

By di time you finish dis lesson, you go fit:

- **Know MCP-Specific Wahala Dem**: Recognize unique security risks for MCP systems like prompt injection, tool poisoning, too much permissions, session hijacking, confused deputy problems, token passthrough wahala, and supply chain gbege
- **Use Security Controls Well**: Put for place beta mitigations like strong authentication, least privilege access, safe token management, session security, and supply chain checking
- **Use Microsoft Security Solutions**: Understand and deploy Microsoft Prompt Shields, Azure Content Safety, and GitHub Advanced Security for MCP workload protection
- **Validate Tool Security**: Know di importance of tool metadata validation, monitoring for dynamic changes, and defending against indirect prompt injection attacks
- **Join Best Practices**: Combine established security basics (secure coding, server hardening, zero trust) with MCP-specific controls for full protection

# MCP Security Architecture & Controls

Modern MCP implementations need layered security methods wey dey tackle both normal software security and AI-specific threats. Di fast-changing MCP specification dey improve security controls well so e fit work better with enterprise security systems and beta beta practices.

Research from di [Microsoft Digital Defense Report](https://aka.ms/mddr) show say **98% of reported breaches fit don stop if strong security hygiene dey**. Di best protection solution na make you join base security practice with MCP-specific controls—beta baseline security measures still dey most effective to reduce overall security risk.

## Current Security Palava

> **Note:** Dis info show MCP security standards as of **February 5, 2026**, follow **MCP Specification 2025-11-25**. Di MCP protocol still dey change quick quick, and later implementations fit bring new authentication methods and better controls. Always check di current [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol), and [security best practices documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) for di freshest info.

> **For di future:** di `2026-07-28` release candidate dey make authorization harder — clients suppose check di `iss` parameter on authorization responses (RFC 9207), declare OpenID Connect `application_type` when Dem do Dynamic Client Registration, and make sure registered credentials bind to di authorization server wey issue am. For full list of authorization SEPs, check [What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## 🏔️ MCP Security Summit Workshop (Sherpa)

If you want **hands-on security training**, we highly recommend di **MCP Security Summit Workshop** (Sherpa) - na thorough guided trip to secure MCP servers inside Microsoft Azure.

### Workshop Overview

Di [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) dey give practical, actionable security training with one proven "vulnerable → exploit → fix → validate" method. You go:

- **Learn by Breaking Things**: Experience vulnerabilities yourself by attacking purposely insecure servers
- **Use Azure-Native Security**: Use Azure Entra ID, Key Vault, API Management, and AI Content Safety
- **Follow Defense-in-Depth**: Move through camps wey build comprehensive security layers
- **Apply OWASP Standards**: Every technique match di [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Get Production Code**: Go carry working, tested implementations

### Di Expedition Route

| Camp | Wetin Dem Dey Focus | OWASP Wahala Dem Cover |
|------|---------------------|-----------------------|
| **Base Camp** | MCP basics & authentication wahala | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, governance | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3: I/O Security** | Prompt injection, PII protection, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4: Monitoring** | Log Analytics, dashboards, threat detection | MCP04, MCP08 |
| **The Summit** | Red Team / Blue Team integration test | All |

**Begin Now**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Security Wahala Dem

Di [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) detail ten most important security risks for MCP implementations:

| Wahala | Description | Azure Mitigation |
|--------|-------------|------------------|
| **MCP01** | Token Mismanagement & Secret Exposure | Azure Key Vault, Managed Identity |
| **MCP02** | Privilege Escalation via Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Tool validation, integrity verification |
| **MCP04** | Software Supply Chain Attacks & Dependency Tampering | GitHub Advanced Security, dependency scanning |
| **MCP05** | Command Injection & Execution | Input validation, sandboxing |
| **MCP06** | Intent Flow Subversion | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Insufficient Authentication & Authorization | Azure Entra ID, OAuth 2.1 with PKCE |
| **MCP08** | Lack of Audit and Telemetry | Azure Monitor, Application Insights |
| **MCP09** | Shadow MCP Servers | API Center governance, network isolation |
| **MCP10** | Context Injection & Over-Sharing | Data classification, minimal exposure |

### How MCP Authentication Don Change

Di MCP specification don improve much for authentication and authorization:

- **Original Way**: Early specs make developers build custom authentication servers, and MCP servers act like OAuth 2.0 Authorization Servers wey manage user authentication directly
- **Current Standard (2025-11-25)**: Updated spec let MCP servers send authentication to external identity providers (like Microsoft Entra ID), improve security posture plus reduce complexity
- **Transport Layer Security**: Better support for secure transport with correct authentication patterns for local (STDIO) and remote (Streamable HTTP) connections

## Authentication & Authorization Security

### Current Wahala

Modern MCP implementations dey face some authentication and authorization issues:

### Wahala & Attack Ways

- **Misconfigured Authorization Logic**: Bad authorization code for MCP servers fit expose private data and misuse access control
- **OAuth Token Compromise**: If thief grab local MCP server token, dem fit act as server and enter downstream services
- **Token Passthrough Wahala**: Bad token handling fit allow security bypass plus gaps for who responsible
- **Excessive Permissions**: MCP servers wey get too much access no follow least privilege rules and change attack surface

#### Token Passthrough: Big No-No

**Token passthrough no dey allowed** for current MCP authorization spec because e get big security consequences:

##### Security Control Bypass
- MCP servers and downstream APIs dey use security controls (rate limiting, request validation, traffic monitoring) wey need correct token validation
- If clients use tokens direct to API, e mean these protections get chance to miss, e spoil di security system

##### Accountability & Audit Wahala  
- MCP servers no fit tell the difference between clients wey use upstream-issued tokens, dis break audit trail
- Downstream resource server logs dey show wrong request source instead of MCP server wey dey in-between
- E go hard to investigate incidents and do compliance audit

##### Data Stealing Risk
- If token claims no validate well, bad guys fit use MCP servers to sneak data out with stolen tokens
- Violate trust boundaries, allow unauthorized access way no fit get correct control

##### Multi-Service Attack Ways
- Bad tokens accepted by many services fit allow attacker waka side side inside connected systems
- Trust between services fit break if dem no fit check token origin

### Security Controls & Ways to Fix

**Critical Security Rules:**

> **MANDATORY**: MCP servers **NO GO** accept token wey no expressly issue for the MCP server

#### Authentication & Authorization Controls

- **Strong Authorization Check**: Do thorough audit of MCP server authorization code to make sure only correct users and clients fit access sensitive areas
  - **How-To Guide**: [Azure API Management as Authentication Gateway for MCP Servers](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identity Integration**: [Using Microsoft Entra ID for MCP Server Authentication](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Safe Token Management**: Use [Microsoft's token validation and lifecycle best practices](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Check token audience claims match MCP server identity
  - Use correct token rotation and expiration rules
  - Stop token replay attacks and unauthorized use

- **Safe Token Storage**: Keep tokens safe with encryption both for storage and transit
  - **Best Practice**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Access Control Implementation

- **Principle of Least Privilege**: Give MCP servers only minimum permissions wey dem need for function
  - Check permissions regularly to stop privilege creep
  - **Microsoft Documentation**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Do detailed role assignments
  - Keep roles tight to specific resources and actions
  - Avoid wide or unneeded permissions wey fit increase attack surface

- **Permission Monitoring Always**: Do ongoing audit and monitoring
  - Watch permission use pattern for strange behavior
  - Quickly correct too much or unused permissions

## AI-Specific Security Wahala Dem

### Prompt Injection & Tool Manipulation Attacks

Modern MCP implementations dey face advanced AI-specific attack ways wey normal security no fit fully handle:

#### **Indirect Prompt Injection (Cross-Domain Prompt Injection)**

**Indirect Prompt Injection** na one of di most serious weakness for MCP AI systems. Attackers dey hide bad instructions inside external content—documents, webpages, emails, or data source—wey AI go later process like normal command.

**Attack Scenes:**
- **Document-based Injection**: Bad instructions hidden inside processed documents wey cause AI do wrong things
- **Web Content Exploitation**: Bad web pages get prompts wey fit control AI behavior wen AI scrape dem
- **Email-based Attacks**: Bad prompts inside emails wey make AI assistants leak info or do unauthorized things
- **Data Source Contamination**: Bad databases or APIs wey serve poisoned content to AI systems

**Real Impact**: These attacks fit cause data leak, privacy break, make bad content, and mess with user interactions. For details, read [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/pcm/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning Attacks**

**Tool Poisoning** target metadata wey define MCP tools, dey abuse how LLMs understand tool descriptions and parameters to decide how to act.

**Attack Ways:**
- **Metadata Manipulation**: Attackers put bad instructions inside tool descriptions, parameter details, or examples
- **Invisible Instructions**: Hidden prompts for tool metadata wey AI models process but human users no see
- **Dynamic Tool Change ("Rug Pulls")**: Tools wey users approve later change to do bad things without user knowing
- **Parameter Injection**: Bad stuff inside tool parameter schemas wey affect model behavior
**Hosted Server Risks**: Remote MCP servers dey present higher risks as tool definitions fit dey updated after you don approve am initially, wey fit make tools wey before dem safe, become bad. For full analysis, see [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/pcm/tool-injection.3b0b4a6b24de6bef.webp)

#### **Additional AI Attack Vectors**

- **Cross-Domain Prompt Injection (XPIA)**: Wahala wey use content from plenty domains to bypass security controls
- **Dynamic Capability Modification**: Changes wey dey happen for tool capabilities for real-time wey fit skip security check sharp sharp
- **Context Window Poisoning**: Attack wey dey use big context windows hide bad instructions
- **Model Confusion Attacks**: Use model wahala create behavior wey no dey predictable or wey no dey safe


### AI Security Risk Impact

**High-Impact Consequences:**
- **Data Exfiltration**: Unauthorized access plus theft of sensitive enterprise or personal data
- **Privacy Breaches**: Exposure of personally identifiable information (PII) plus confidential business data  
- **System Manipulation**: Unintended changes to critical systems and workflows
- **Credential Theft**: Compromise of authentication tokens and service credentials
- **Lateral Movement**: Use compromised AI systems to waka attack other parts of network

### Microsoft AI Security Solutions

#### **AI Prompt Shields: Advanced Protection Against Injection Attacks**

Microsoft **AI Prompt Shields** dey provide full protection against both direct and indirect prompt injection attacks through different security layers:

##### **Core Protection Mechanisms:**

1. **Advanced Detection & Filtering**
   - Machine learning algorithm and NLP techniques dey detect bad instructions for outside content
   - Real-time check of documents, web pages, emails, and data sources for hidden wahala
   - Understand context well well between correct vs. bad prompt patterns

2. **Spotlighting Techniques**  
   - Separate trusted system instructions from possible bad outside input
   - Text change methods wey increase model relevance but still keep bad content apart
   - Help AI systems keep instruction order correct and ignore injected commands

3. **Delimiter & Datamarking Systems**
   - Clear boundary to separate trusted system messages and outside input text
   - Special markers dey show boundaries between trusted and untrusted data sources
   - Sharp separation to stop instruction confusion and stop unauthorized command run

4. **Continuous Threat Intelligence**
   - Microsoft dey monitor new attack patterns and dey update protections
   - Proactive search for new injection techniques and attack ways
   - Regular model updates to stay effective against changing threats

5. **Azure Content Safety Integration**
   - Part of full Azure AI Content Safety package
   - Extra detection for jailbreak attempts, harmful content, and breaking security rules
   - One system security control across AI app components

**Implementation Resources**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/pcm/prompt-shield.ff5b95be76e9c78c.webp)


## Advanced MCP Security Threats

### Session Hijacking Vulnerabilities

**Session hijacking** na big attack way for stateful MCP wey unauthorized people fit get and misuse real session IDs to act like clients and do things wey dem no suppose do.

#### **Attack Scenarios & Risks**

- **Session Hijack Prompt Injection**: Attackers wey get stolen session IDs fit push bad events enter servers wey dey share session state, fit cause harm or access sensitive data
- **Direct Impersonation**: Stolen session IDs fit make attackers call MCP server direct without authentication, get treat like real users
- **Compromised Resumable Streams**: Attackers fit stop requests before time, make legit clients resume with bad content fit enter

#### **Security Controls for Session Management**

**Critical Requirements:**
- **Authorization Verification**: MCP servers wey dey use authorization **MUST** check ALL incoming requests, **MUST NOT** rely on sessions for authentication
- **Secure Session Generation**: Use cryptographically secure, non-deterministic session IDs wey random generator make
- **User-Specific Binding**: Bind session IDs to user info with formats like `<user_id>:<session_id>` to stop session misuse between users
- **Session Lifecycle Management**: Implement correct expiration, rotation, and invalidation to reduce vulnerability time
- **Transport Security**: HTTPS mandatory for all communication to stop session ID interception

### Confused Deputy Problem

The **confused deputy problem** dey happen when MCP servers dey act as authentication middlemen between clients and third-party services, wey fit allow authorization bypass through static client ID abuse.

#### **Attack Mechanics & Risks**

- **Cookie-based Consent Bypass**: Old user authentication make consent cookies wey attackers fit abuse with fake authorization requests and crafted redirect URIs
- **Authorization Code Theft**: Consent cookies fit make authorization servers skip consent page, redirect codes go attacker-controlled endpoint  
- **Unauthorized API Access**: Stolen authorization codes fit allow token exchange and user impersonation without approval

#### **Mitigation Strategies**

**Mandatory Controls:**
- **Explicit Consent Requirements**: MCP proxy servers with static client IDs **MUST** get user consent for every dynamic registered client
- **OAuth 2.1 Security Implementation**: Follow current OAuth security best practices including PKCE for all authorization requests
- **Strict Client Validation**: Use strong validation for redirect URIs and client IDs to stop abuse

### Token Passthrough Vulnerabilities  

**Token passthrough** na clear anti-pattern where MCP servers dey accept client tokens without proper check and then forward am to downstream APIs, wey break MCP authorization rules.

#### **Security Implications**

- **Control Circumvention**: Direct client-to-API token use fit bypass rate limiting, validation, plus monitoring controls
- **Audit Trail Corruption**: Tokens wey upstream issue make client identification impossible, break investigation
- **Proxy-based Data Exfiltration**: Without checking tokens, bad actors fit use servers as proxies for unauthorized data take
- **Trust Boundary Violations**: Downstream services trust fit break when token origin no clear
- **Multi-service Attack Expansion**: Bad tokens accepted everywhere fit make attackers move around network

#### **Required Security Controls**

**Non-negotiable Requirements:**
- **Token Validation**: MCP servers **MUST NOT** accept tokens wey no explicitly issue for MCP server
- **Audience Verification**: Always check token audience match MCP server identity
- **Proper Token Lifecycle**: Use short-lived access tokens with secure rotation practices


## Supply Chain Security for AI Systems

Supply chain security don pass only software dependencies, e cover the whole AI ecosystem. Modern MCP implementations must thoroughly verify and monitor all AI components, because each one fit bring wahala to system security.

### Expanded AI Supply Chain Components

**Traditional Software Dependencies:**
- Open-source libraries and frameworks
- Container images and base systems  
- Development tools and build pipelines
- Infrastructure components and services

**AI-Specific Supply Chain Elements:**
- **Foundation Models**: Pre-trained models from different providers wey need provenance check
- **Embedding Services**: External vectorization and semantic search services
- **Context Providers**: Data sources, knowledge bases, and document storage  
- **Third-party APIs**: External AI services, ML pipelines, and data processing endpoints
- **Model Artifacts**: Weights, configurations, and fine-tuned model variants
- **Training Data Sources**: Datasets wey dem use for model training and fine-tuning

### Comprehensive Supply Chain Security Strategy

#### **Component Verification & Trust**
- **Provenance Validation**: Check origin, license, and integrity of all AI components before use
- **Security Assessment**: Run vulnerability scan and security reviews for models, data sources, and AI services
- **Reputation Analysis**: Check security history and practices of AI service providers
- **Compliance Verification**: Make sure all components meet company security and law requirements

#### **Secure Deployment Pipelines**  
- **Automated CI/CD Security**: Attach security scans for automated deployment pipelines
- **Artifact Integrity**: Use cryptographic checks for all code, models, and configs wey dem deploy
- **Staged Deployment**: Use stepped deployment with security check for every stage
- **Trusted Artifact Repositories**: Deploy only from verified secure artifact registries

#### **Continuous Monitoring & Response**
- **Dependency Scanning**: Keep scanning for vulnerabilities in all software and AI dependencies
- **Model Monitoring**: Keep checking model behavior, performance drift, and security issues
- **Service Health Tracking**: Monitor AI services for availability, security problems, and policy changes
- **Threat Intelligence Integration**: Add threat info specific to AI and ML security risks

#### **Access Control & Least Privilege**
- **Component-level Permissions**: Restrict access to models, data, and services base on business need
- **Service Account Management**: Use special service accounts with only needed permissions
- **Network Segmentation**: Separate AI components and limit network access between services
- **API Gateway Controls**: Use centralized API gateways to control and monitor access to external AI services

#### **Incident Response & Recovery**
- **Rapid Response Procedures**: Setup processes to patch or replace compromised AI parts quickly
- **Credential Rotation**: Use automated systems to rotate secrets, API keys, and service credentials
- **Rollback Capabilities**: Fit quickly revert AI components to previous known good versions
- **Supply Chain Breach Recovery**: Special procedures to respond to upstream AI service compromise

### Microsoft Security Tools & Integration

**GitHub Advanced Security** dey offer full supply chain protection including:
- **Secret Scanning**: Automatic detection of credentials, API keys, and tokens inside repos
- **Dependency Scanning**: Vulnerability checks for open-source dependencies and libraries
- **CodeQL Analysis**: Static code checking for security holes and coding problems
- **Supply Chain Insights**: Visibility into dependency health and security status

**Azure DevOps & Azure Repos Integration:**
- Easy security scan integration across Microsoft development platforms
- Automatic security checks inside Azure Pipelines for AI jobs
- Policy enforcement for secure AI component deployment

**Microsoft Internal Practices:**
Microsoft dey run extensive supply chain security for all their products. Learn more for [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Foundation Security Best Practices

MCP implementations dey build on top of your company existing security posture. Strong foundation security practices go improve overall AI system plus MCP security.

### Core Security Fundamentals

#### **Secure Development Practices**
- **OWASP Compliance**: Protect against [OWASP Top 10](https://owasp.org/www-project-top-ten/) web app vulnerabilities
- **AI-Specific Protections**: Use controls for [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Secure Secrets Management**: Use special vaults for tokens, API keys, and sensitive configs
- **End-to-End Encryption**: Setup secure communication across all app parts and data routes
- **Input Validation**: Strict validation of all user inputs, API parameters, and data sources

#### **Infrastructure Hardening**
- **Multi-Factor Authentication**: MFA mandatory for all admin and service accounts
- **Patch Management**: Automated, timely patching for OS, frameworks, and dependencies  
- **Identity Provider Integration**: Central identity management via enterprise providers (Microsoft Entra ID, Active Directory)
- **Network Segmentation**: Logical separation of MCP parts to limit lateral movement
- **Principle of Least Privilege**: Give minimum permissions needed for all system parts and accounts

#### **Security Monitoring & Detection**
- **Comprehensive Logging**: Detailed logs of AI app activity, including MCP client-server communication
- **SIEM Integration**: Central system to gather and analyze security info for anomaly detection
- **Behavioral Analytics**: AI-powered system to spot unusual system and user behavior
- **Threat Intelligence**: Add external threat feeds and indicators of compromise (IOCs)
- **Incident Response**: Clear processes for detecting, responding to, and recovering from security incidents

#### **Zero Trust Architecture**
- **Never Trust, Always Verify**: Always check users, devices, and network connections continuously
- **Micro-Segmentation**: Fine-grained network controls to isolate workloads and services
- **Identity-Centric Security**: Security policies based on confirmed identities, no network location trust
- **Continuous Risk Assessment**: Evaluate security posture based on current context and behavior always
- **Conditional Access**: Access controls that adapt to risk factors, location, and device trust

### Enterprise Integration Patterns

#### **Microsoft Security Ecosystem Integration**
- **Microsoft Defender for Cloud**: Full cloud security posture management
- **Azure Sentinel**: Cloud-native SIEM and SOAR tools for AI workload protection
- **Microsoft Entra ID**: Enterprise identity and access management with conditional access policies
- **Azure Key Vault**: Centralized secrets management with hardware security module (HSM) support
- **Microsoft Purview**: Data governance and compliance for AI data sources and workflows

#### **Compliance & Governance**
- **Regulatory Alignment**: Make sure MCP implementations meet industry-specific compliance (GDPR, HIPAA, SOC 2)
- **Data Classification**: Proper kategorizeshun and handling of sensitive data wey AI systems dey process
- **Audit Trails**: Full logging for regulatory compliance and forensic investigation
- **Privacy Controls**: Implementation of privacy-by-design principles for AI system architecture
- **Change Management**: Formal processes for security reviews any time AI system modifications dey happen

Dem foundational practices dey create strong security baseline wey dey improve how MCP-specific security controls dey work and e dey provide full protection for AI-driven applications.

## Key Security Takeaways

- **Layered Security Approach**: Join foundational security practices (secure coding, least privilege, supply chain verification, continuous monitoring) with AI-specific controls to give full protection

- **AI-Specific Threat Landscape**: MCP systems face special risks like prompt injection, tool poisoning, session hijacking, confused deputy problems, token passthrough vulnerabilities, and too much permissions wey need special mitigations

- **Authentication & Authorization Excellence**: Use strong authentication with external identity providers (Microsoft Entra ID), make sure token validation dey correct, and no accept tokens wey no explicitly issued for your MCP server

- **AI Attack Prevention**: Use Microsoft Prompt Shields and Azure Content Safety to protect against indirect prompt injection and tool poisoning attacks, while checking tool metadata and monitoring for any changes

- **Session & Transport Security**: Use cryptographically secure, random session IDs wey link to user identities, manage session lifecycle properly, and no use sessions for authentication

- **OAuth Security Best Practices**: Prevent confused deputy attacks by getting explicit user consent for dynamically registered clients, implement correct OAuth 2.1 with PKCE, and strictly validate redirect URI  

- **Token Security Principles**: Avoid token passthrough anti-patterns, check token audience claims, use short-lived tokens with secure rotation, and keep clear trust boundaries

- **Comprehensive Supply Chain Security**: Treat all AI ecosystem parts (models, embeddings, context providers, external APIs) with same security care as normal software dependencies

- **Continuous Evolution**: Keep up-to-date with fast changing MCP specs, contribute to security community standards, and maintain flexible security postures as protocol dey grow

- **Microsoft Security Integration**: Use Microsoft complete security ecosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) to boost MCP deployment protection

## Comprehensive Resources

### **Official MCP Security Documentation**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Security Resources**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - All OWASP MCP Top 10 plus Azure implementation guide
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

For full security guidance, check these special documents here:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Complete security best practices for MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Practical how-to for Azure Content Safety integration  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Latest security controls and techniques for MCP
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Quick guide for important MCP security practices
- **[BlueHat 2026: Securing the future of AI: Securing MCP with defense in depth patterns](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Defense-in-depth patterns from Microsoft Security Response Center (MSRC)

### **Hands-On Security Training**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Comprehensive hands-on workshop to secure MCP servers on Azure with camps from Base Camp to Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Reference architecture and guides for all OWASP MCP Top 10 risks

---

## What's Next

Next: [Chapter 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->