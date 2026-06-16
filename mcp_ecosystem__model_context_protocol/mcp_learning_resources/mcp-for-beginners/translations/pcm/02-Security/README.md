# MCP Security: Complete Protection for AI Systems

[![MCP Security Best Practices](../../../translated_images/pcm/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Click di image wey dey above to watch video of dis lesson)_

Security na di cornerstone of AI system design, na why we put am first for our second section. Dis one match wit Microsoft **Secure by Design** principle from di [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Di Model Context Protocol (MCP) bring powerful new tins come AI-driven apps but e also get new security wahala wey pass normal software risks. MCP systems dey face both normal security gbege (secure coding, least privilege, supply chain security) plus new AI wahala like prompt injection, tool poisoning, session hijacking, confused deputy attacks, token passthrough gbege, and dynamic capability change.

Dis lesson go show di most important security risks for MCP how to handle dem — covering authentication, authorization, too much permission, indirect prompt injection, session security, confused deputy gbege, token management, and supply chain wahala. You go learn beta controls and best practices to stop these risks, plus use Microsoft solutions like Prompt Shields, Azure Content Safety, and GitHub Advanced Security to secure your MCP deployment.

## Learning Objectives

By di time you finish dis lesson, you go fit:

- **Identify MCP-Specific Wahala**: Recognize unique security gbege for MCP systems like prompt injection, tool poisoning, too much permission, session hijack, confused deputy gbege, token passthrough risks, and supply chain risks
- **Apply Security Controls**: Put strong mitigations like solid authentication, least privilege access, secure token management, session security controls, and supply chain checking
- **Use Microsoft Security Solutions**: Know how to deploy Microsoft Prompt Shields, Azure Content Safety, and GitHub Advanced Security for MCP workload protection
- **Check Tool Security**: Understand why tool metadata validation matter, watch for dynamic changes, and defend against indirect prompt injection attacks
- **Join Best Practices**: Mix correct security basics (secure coding, server hardening, zero trust) with MCP controls to get full protection

# MCP Security Architecture & Controls

Modern MCP deployments need layered security wey dey handle both normal software and AI-specific threats. MCP specification dey grow fast to make their controls better, so e fit join well with company security structures plus best practices wey dey.

Research from [Microsoft Digital Defense Report](https://aka.ms/mddr) show sey **98% of reported breaches fit stop if strong security hygiene dey.** Di best protection na to combine foundation security practices with MCP specific controls—solid baseline security still dey most important to reduce security risks well well.

## Current Security Landscape

> **Note:** Dis info na for MCP security standard as of **February 5, 2026**, e match **MCP Specification 2025-11-25**. Di MCP protocol still dey move fast, and future designs fit bring new authentication patterns plus better controls. Always check di current [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol), and [security best practices documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) for latest advice.

## 🏔️ MCP Security Summit Workshop (Sherpa)

For **hands-on security training**, we recommend **MCP Security Summit Workshop** (Sherpa) - na detailed guided journey to secure MCP servers for Microsoft Azure.

### Workshop Overview

[Di MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) dey give practical, actionable security training wit proven "vulnerable → exploit → fix → validate" steps. You go:

- **Learn by Breaking Things**: Experience wahala firsthand by exploiting purposely insecure servers
- **Use Azure-Native Security**: Use Azure Entra ID, Key Vault, API Management, and AI Content Safety
- **Follow Defense-in-Depth**: Move through camps to build full protective layers
- **Apply OWASP Standards**: Every way follow [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Get Production Code**: Walk away with tested, working code samples

### The Expedition Route

| Camp | Focus | OWASP Risks Covered |
|------|-------|---------------------|
| **Base Camp** | MCP basics & authentication risks | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, governance | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3: I/O Security** | Prompt injection, PII protection, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4: Monitoring** | Log Analytics, dashboards, threat detection | MCP04, MCP08 |
| **The Summit** | Red Team / Blue Team integration test | All |

**Get Started**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Security Risks

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) explain top ten most critical security risks for MCP deployments:

| Risk | Description | Azure Mitigation |
|------|-------------|------------------|
| **MCP01** | Token Mismanagement & Secret Exposure | Azure Key Vault, Managed Identity |
| **MCP02** | Privilege Escalation via Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Tool validation, integrity check |
| **MCP04** | Software Supply Chain Attacks & Dependency Tampering | GitHub Advanced Security, dependency scan |
| **MCP05** | Command Injection & Execution | Input validation, sandboxing |
| **MCP06** | Intent Flow Subversion | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Insufficient Authentication & Authorization | Azure Entra ID, OAuth 2.1 with PKCE |
| **MCP08** | Lack of Audit and Telemetry | Azure Monitor, Application Insights |
| **MCP09** | Shadow MCP Servers | API Center governance, network isolation |
| **MCP10** | Context Injection & Over-Sharing | Data classification, minimal exposure |

### Evolution of MCP Authentication

MCP specification don develop well to handle authentication and authorization:

- **Old Way**: Early specs force devs to build their own authentication servers, with MCP servers being OAuth 2.0 Authorization Servers wey handle user auth direct
- **Current Standard (2025-11-25)**: New specs allow MCP servers to offload authentication go external identity providers (like Microsoft Entra ID), dey make security better and reduce complexity
- **Transport Layer Security**: Better support for secure transport wey get correct auth patterns for both local (STDIO) and remote (Streamable HTTP) connections

## Authentication & Authorization Security

### Current Security Wahala

Modern MCP systems dey face multiple auth and authorization risks:

### Risks & Attack Ways

- **Wrong Authorization Logic**: Wrong implementation for MCP server auth fit expose sensitive data and apply wrong access control
- **OAuth Token Tiff**: Local MCP server token theft fit help attacker impersonate server and enter downstream services
- **Token Passthrough Weakness**: Incorrect token use fit bypass security controls and cause accountability problems
- **Too Much Permission**: MCP servers with too much power break least privilege rule and open big attack surface

#### Token Passthrough: Serious No-No Pattern

**Token passthrough** no allow for current MCP authorization spec because e get serious security consequences:

##### Security Control Side-Step
- MCP servers and downstream APIs dey do critical controls (rate limit, request validation, traffic watching) wey depend on proper token check
- Direct client-to-API token use dey bypass these protections, break security design

##### Accountability & Audit Wahala  
- MCP servers no fit tell different clients wey use upstream tokens, break audit trails
- Resource server logs for downstream dey show wrong origin of requests, no show actual MCP server wey dey middle
- Investigating issues and compliance audits go hard well well

##### Data Theft Risks
- Non-checked token claims fit allow bad actors with token wey dem steal use MCP servers as proxy to steal data
- Trust boundaries go break, make una unauthorized access wey bypass intended security controls

##### Multi-Service Attack Routes
- Bad tokens accepted by many services fit allow attacker move sideways inside connected systems
- Trust between services fit break when token sources no fit verify

### Security Controls & Solutions

**Critical Security Requirements:**

> **MANDATORY**: MCP servers **MUST NOT** accept any tokens wey no explicitly issue for di MCP server

#### Authentication & Authorization Controls

- **Thorough Authorization Review**: Do full audit of MCP server authorization logic to make sure only allowed users and clients fit access sensitive resources
  - **Implementation Guide**: [Azure API Management as Authentication Gateway for MCP Servers](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identity Integration**: [Using Microsoft Entra ID for MCP Server Authentication](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Secure Token Management**: Follow [Microsoft's token validation and lifecycle best practices](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Check token audience claims match MCP server identity
  - Implement good token rotation and expiry rules
  - Stop token replay attacks and unauthorized use

- **Safe Token Storage**: Store tokens securely with encryption both for rest and transit
  - **Best Practices**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Access Control Implementation

- **Least Privilege Principle**: Give MCP servers only small permissions wey dem really need
  - Do regular review and update to prevent privilege creep
  - **Microsoft Documentation**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Use fine-grained roles
  - Scope roles tightly to specific resources and actions
  - Avoid broad or unnecessary permissions wey fit open attack surface

- **Continuous Permission Monitoring**: Always audit and monitor access
  - Watch permission usage for unusual patterns
  - Correctly fix too much or unused permissions quickly

## AI-Specific Security Wahala

### Prompt Injection & Tool Manipulation Attacks

Modern MCP systems dey face complex AI-specific attack ways wey normal security no fit handle fully:

#### **Indirect Prompt Injection (Cross-Domain Prompt Injection)**

**Indirect Prompt Injection** na one of di most serious weakness for MCP AI systems. Attackers hide bad instructions inside external content—documents, web pages, emails, or data sources wey AI system later process as normal commands.

**Attack Cases:**
- **Document-based Injection**: Malicious instructions hide for documents wey cause AI to do wrong things
- **Web Content Exploitation**: Compromised web pages get secret prompts wey control AI when scraped
- **Email-based Attacks**: Bad prompts inside emails wey cause AI helpers to leak info or do unauthorized things
- **Data Source Corruption**: Bad databases or APIs wey give corrupted content to AI systems

**Real-World Impact**: These attacks fit lead to data theft, privacy breaks, generation of harmful content, and bad control of user interactions. For deep look, see [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/pcm/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning Attacks**

**Tool Poisoning** dey target metadata wey define MCP tools, abuse how LLMs take interpret tool descriptions and parameters to decide to run 'em.

**Attack Methods:**
- **Metadata Change**: Attackers put malicious instructions inside tool descriptions, parameter info, or usage samples
- **Invisible Instructions**: Hidden prompts inside tool metadata wey AI model see but humans no fit see
- **Dynamic Tool Change ("Rug Pulls")**: Tools wey users approve later change to do bad actions without user knowing
- **Parameter Injection**: Bad content inside tool parameter schema wey affect model behavior

**Hosted Server Risks**: Remote MCP servers dey prone because tool defs fit change after user approve, meaning tools wey safe before fit turn bad. For full explanation, see [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/pcm/tool-injection.3b0b4a6b24de6bef.webp)

#### **Other AI Attack Ways**

- **Cross-Domain Prompt Injection (XPIA)**: Complex attacks wey use content from many domains to pass security safeguards
- **Dynamic Capability Modification**: Real-time changes to tool capabilities wey dey waka commot from initial security assessments
- **Context Window Poisoning**: Attacks wey dey manipulate big context windows to hide bad instructions
- **Model Confusion Attacks**: Exploit model limitations to create unpredictable or unsafe behaviors


### AI Security Risk Impact

**High-Impact Consequences:**
- **Data Exfiltration**: Unauthorized access and theft of sensitive enterprise or personal data
- **Privacy Breaches**: Exposure of personally identifiable information (PII) and confidential business data  
- **System Manipulation**: Unintended modifications to critical systems and workflows
- **Credential Theft**: Compromise of authentication tokens and service credentials
- **Lateral Movement**: Use of compromised AI systems as pivots for broader network attacks

### Microsoft AI Security Solutions

#### **AI Prompt Shields: Advanced Protection Against Injection Attacks**

Microsoft **AI Prompt Shields** dey provide full protection against both direct and indirect prompt injection attacks through plenty security layers:

##### **Core Protection Mechanisms:**

1. **Advanced Detection & Filtering**
   - Machine learning algorithms and NLP techniques dey detect malicious instructions inside external content
   - Real-time analysis of documents, web pages, emails, and data sources for embedded threats
   - Contextual understanding of legit vs. bad prompt patterns

2. **Spotlighting Techniques**  
   - E dey separate trusted system instructions with potentially corrupted external inputs
   - Text transformation methods wey improve model relevance but isolate bad content
   - Helps AI systems maintain the right instruction order and ignore injected commands

3. **Delimiter & Datamarking Systems**
   - Clear boundary definition between trusted system messages and external input text
   - Special markers dey show the border between trusted and untrusted data sources
   - Clear separation stop instruction confusion and unauthorized command execution

4. **Continuous Threat Intelligence**
   - Microsoft dey always monitor new attack patterns and update defenses
   - Proactive threat hunting for new injection techniques and attack ways
   - Regular security model updates to keep dem effective against new threats

5. **Azure Content Safety Integration**
   - Na part of big Azure AI Content Safety package
   - Extra detection for jailbreak attempts, harmful content, and security policy breaks
   - One security controls for AI application components

**Implementation Resources**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/pcm/prompt-shield.ff5b95be76e9c78c.webp)


## Advanced MCP Security Threats

### Session Hijacking Vulnerabilities

**Session hijacking** na critical attack way for stateful MCP setups where people wey no get permission fit grab and misuse legit session IDs to act like clients and do bad things wey dem no suppose do.

#### **Attack Scenarios & Risks**

- **Session Hijack Prompt Injection**: Attackers wey get session IDs wey no belong to dem fit inject bad events inside servers wey share session state, fit trigger bad actions or access sensitive data
- **Direct Impersonation**: Stolen session IDs fit allow direct MCP server calls wey skip authentication, make attackers be like real users
- **Compromised Resumable Streams**: Attackers fit stop requests sharply, cause legit clients to resume with possibly bad content

#### **Security Controls for Session Management**

**Critical Requirements:**
- **Authorization Verification**: MCP servers wey dey do authorization **MUST** verify ALL inbound requests and **MUST NOT** trust sessions for authentication
- **Secure Session Generation**: Use cryptographically secure, random session IDs wey no dey predictable
- **User-Specific Binding**: Tie session IDs to user-specific info using format like `<user_id>:<session_id>` to stop cross-user session misuse
- **Session Lifecycle Management**: Proper expiration, rotation, and invalidation to reduce vulnerability time
- **Transport Security**: HTTPS na must for all communication to stop session ID interception

### Confused Deputy Problem

The **confused deputy problem** happen when MCP servers dey act as authentication middlemen between clients and third-party services, which fit make authorization bypass through exploit of static client ID.

#### **Attack Mechanics & Risks**

- **Cookie-based Consent Bypass**: Previous user authentication create consent cookies wey attackers fit use malicious authorization requests with crafted redirect URIs
- **Authorization Code Theft**: Existing consent cookies fit make authorization servers skip consent, redirect codes go attacker-controlled endpoints  
- **Unauthorized API Access**: Stolen authorization codes fit allow token exchange and user impersonation without true permission

#### **Mitigation Strategies**

**Mandatory Controls:**
- **Explicit Consent Requirements**: MCP proxy servers wey get static client IDs **MUST** get user consent for each dynamic client
- **OAuth 2.1 Security Implementation**: Follow latest OAuth security practices including PKCE (Proof Key for Code Exchange) for all authorization requests
- **Strict Client Validation**: Do strong validation for redirect URIs and client IDs to stop exploitation

### Token Passthrough Vulnerabilities  

**Token passthrough** na clear anti-pattern where MCP servers dey accept client tokens without proper checking and just forward am to downstream APIs, break MCP authorization rules.

#### **Security Implications**

- **Control Circumvention**: Client tokens direct to API fit bypass rate limiting, validation, and monitoring controls
- **Audit Trail Corruption**: Tokens wey come upstream fit spoil client identification, hurt incident investigation
- **Proxy-based Data Exfiltration**: Unchecked tokens fit allow bad actors to use servers as proxy for unauthorized data
- **Trust Boundary Violations**: Downstream services' trust fit break if token origin no fit verify
- **Multi-service Attack Expansion**: Compromised tokens accepted by many services fit allow lateral movement

#### **Required Security Controls**

**Non-negotiable Requirements:**
- **Token Validation**: MCP servers **MUST NOT** accept tokens wey dem no explicitly issue give MCP server
- **Audience Verification**: Always validate token audience claim na MCP server identity
- **Proper Token Lifecycle**: Use short-lived tokens with secure rotation

## Supply Chain Security for AI Systems

Supply chain security don grow pass normal software dependencies to cover whole AI ecosystem. Modern MCP setups must tightly verify and monitor all AI parts, because every part fit bring wahala wey fit spoil system integrity.

### Expanded AI Supply Chain Components

**Traditional Software Dependencies:**
- Open-source libraries and frameworks
- Container images and base systems  
- Development tools and build pipelines
- Infrastructure components and services

**AI-Specific Supply Chain Elements:**
- **Foundation Models**: Pre-trained models from different providers wey need provenance checks
- **Embedding Services**: External vectorization and semantic search services
- **Context Providers**: Data sources, knowledge bases, and document repos  
- **Third-party APIs**: External AI services, ML pipelines, data processing endpoints
- **Model Artifacts**: Weights, configurations, fine-tuned model variants
- **Training Data Sources**: Datasets for model training and fine-tuning

### Comprehensive Supply Chain Security Strategy

#### **Component Verification & Trust**
- **Provenance Validation**: Verify origin, licences, and integrity of all AI parts before use
- **Security Assessment**: Do vulnerability scans and security checks for models, data, AI services
- **Reputation Analysis**: Check security history and practices of AI providers
- **Compliance Verification**: Make sure parts meet organization security and regulations

#### **Secure Deployment Pipelines**  
- **Automated CI/CD Security**: Put security scanning for automatic deployment pipelines
- **Artifact Integrity**: Use cryptographic checks for all deployed artifacts (code, models, configs)
- **Staged Deployment**: Use progressive deployment with security checks each step
- **Trusted Artifact Repositories**: Deploy only from verified, secure artifact repos

#### **Continuous Monitoring & Response**
- **Dependency Scanning**: Ongoing vulnerability checks for software and AI dependencies
- **Model Monitoring**: Continuous check of model behavior, performance drift, security issues
- **Service Health Tracking**: Monitor external AI services for uptime, security incidents, policy changes
- **Threat Intelligence Integration**: Use threat feeds for AI and ML security risks

#### **Access Control & Least Privilege**
- **Component-level Permissions**: Restrict access to models, data, and services based on need
- **Service Account Management**: Use special service accounts with minimum permissions
- **Network Segmentation**: Separate AI parts and limit network access between services
- **API Gateway Controls**: Use centralized API gateways to control and monitor access to external AI services

#### **Incident Response & Recovery**
- **Rapid Response Procedures**: Have plans to patch or replace bad AI components fast
- **Credential Rotation**: Automate secret, API key, and credential rotation
- **Rollback Capabilities**: Ability to quickly return to earlier good versions of AI parts
- **Supply Chain Breach Recovery**: Specific plans for upstream AI service compromises

### Microsoft Security Tools & Integration

**GitHub Advanced Security** provides full supply chain protection including:
- **Secret Scanning**: Auto detection of credentials, API keys, tokens in repos
- **Dependency Scanning**: Vulnerability check for open-source dependencies and libraries
- **CodeQL Analysis**: Static code analysis for security holes and coding issues
- **Supply Chain Insights**: Visibility on dependency health and security

**Azure DevOps & Azure Repos Integration:**
- Smooth security scanning across Microsoft dev platforms
- Auto security checks in Azure Pipelines for AI workloads
- Policy enforcement for secure AI part deployment

**Microsoft Internal Practices:**
Microsoft dey do plenty supply chain security for all products. Read [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Foundation Security Best Practices

MCP setups inherit and build on top of your organization security foundation. Boosting foundation security practices go majorly improve overall AI system and MCP deployment security.

### Core Security Fundamentals

#### **Secure Development Practices**
- **OWASP Compliance**: Protect against [OWASP Top 10](https://owasp.org/www-project-top-ten/) web app vulnerabilities
- **AI-Specific Protections**: Implement controls for [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Secure Secrets Management**: Use special vaults for tokens, API keys, sensitive configs
- **End-to-End Encryption**: Secure communication across all app parts and data flows
- **Input Validation**: Strong validation of all user inputs, API params, and data sources

#### **Infrastructure Hardening**
- **Multi-Factor Authentication**: Mandatory MFA for all admin and service accounts
- **Patch Management**: Automatic, timely patching for OS, frameworks, dependencies  
- **Identity Provider Integration**: Centralized identity management with enterprise providers (Microsoft Entra ID, Active Directory)
- **Network Segmentation**: Logical isolation of MCP parts to reduce lateral movement
- **Principle of Least Privilege**: Minimal needed permissions for all system parts and accounts

#### **Security Monitoring & Detection**
- **Comprehensive Logging**: Detailed logs of AI app actions, including MCP client-server interactions
- **SIEM Integration**: Central security info and event management for detecting anomalies
- **Behavioral Analytics**: AI-powered monitoring to spot unusual patterns in system/user behavior
- **Threat Intelligence**: Use external threat feeds and indicators of compromise (IOCs)
- **Incident Response**: Clear procedures for security incident detection, response, and recovery

#### **Zero Trust Architecture**
- **Never Trust, Always Verify**: Continuous checks of users, devices, network links
- **Micro-Segmentation**: Fine network controls to isolate single workloads and services
- **Identity-Centric Security**: Policies based on verified identities, not network location
- **Continuous Risk Assessment**: Dynamic security checks based on current context and behavior
- **Conditional Access**: Access controls that change based on risk, location, device trust

### Enterprise Integration Patterns

#### **Microsoft Security Ecosystem Integration**
- **Microsoft Defender for Cloud**: Full cloud security posture management
- **Azure Sentinel**: Cloud-native SIEM and SOAR for AI workload protection
- **Microsoft Entra ID**: Enterprise identity and access management with conditional access policies
- **Azure Key Vault**: Central secrets management with hardware security module (HSM)
- **Microsoft Purview**: Data governance and compliance for AI data sources and workflows

#### **Compliance & Governance**
- **Regulatory Alignment**: Ensure MCP setups meet industry compliance needs (GDPR, HIPAA, SOC 2)
- **Data Classification**: Proper handling and categorization of sensitive AI data
- **Audit Trails**: Full logging for compliance and forensic investigations
- **Privacy Controls**: Privacy-by-design in AI architecture
- **Change Management**: Formal process for security reviews when modifying AI systems

These foundational practices provide strong security baseline wey boost MCP-specific security measures and give full protection for AI apps.

## Key Security Takeaways
- **Layered Security Approach**: Combine foundational security practices (secure coding, least privilege, supply chain verification, continuous monitoring) with AI-specific controls for comprehensive protection

- **AI-Specific Threat Landscape**: MCP systems face unique risks including prompt injection, tool poisoning, session hijacking, confused deputy problems, token passthrough vulnerabilities, and excessive permissions that require specialized mitigations

- **Authentication & Authorization Excellence**: Implement robust authentication using external identity providers (Microsoft Entra ID), enforce proper token validation, and never accept tokens not explicitly issued for your MCP server

- **AI Attack Prevention**: Deploy Microsoft Prompt Shields and Azure Content Safety to defend against indirect prompt injection and tool poisoning attacks, while validating tool metadata and monitoring for dynamic changes

- **Session & Transport Security**: Use cryptographically secure, non-deterministic session IDs bound to user identities, implement proper session lifecycle management, and never use sessions for authentication

- **OAuth Security Best Practices**: Prevent confused deputy attacks through explicit user consent for dynamically registered clients, proper OAuth 2.1 implementation with PKCE, and strict redirect URI validation  

- **Token Security Principles**: Avoid token passthrough anti-patterns, validate token audience claims, implement short-lived tokens with secure rotation, and maintain clear trust boundaries

- **Comprehensive Supply Chain Security**: Treat all AI ecosystem components (models, embeddings, context providers, external APIs) with the same security rigor as traditional software dependencies

- **Continuous Evolution**: Stay current with rapidly evolving MCP specifications, contribute to security community standards, and maintain adaptive security postures as the protocol matures

- **Microsoft Security Integration**: Leverage Microsoft's comprehensive security ecosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) for enhanced MCP deployment protection

## Comprehensive Resources

### **Official MCP Security Documentation**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Security Resources**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Comprehensive OWASP MCP Top 10 with Azure implementation guidance
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
- **[BlueHat 2026: Securing the future of AI: Securing MCP with defense in depth patterns](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Defense-in-depth patterns from the Microsoft Security Response Center (MSRC)

### **Hands-On Security Training**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Comprehensive hands-on workshop for securing MCP servers in Azure with progressive camps from Base Camp to Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Reference architecture and implementation guidance for all OWASP MCP Top 10 risks

---

## What's Next

Next: [Chapter 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->