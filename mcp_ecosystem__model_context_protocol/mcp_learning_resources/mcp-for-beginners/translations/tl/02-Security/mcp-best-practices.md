# MCP Security Best Practices 2025

Ang komprehensibong gabay na ito ay naglalahad ng mahahalagang pinakamahusay na kasanayan sa seguridad para sa pagpapatupad ng Model Context Protocol (MCP) systems base sa pinakahuling **MCP Specification 2025-11-25** at kasalukuyang mga pamantayan sa industriya. Ang mga kasanayang ito ay tumutugon sa parehong tradisyunal na mga alalahanin sa seguridad at mga banta na natatangi sa AI para sa mga MCP deployments.

## Mga Kritikal na Kinakailangan sa Seguridad

### Mandatory Security Controls (MUST Requirements)

1. **Token Validation**: Ang MCP servers **HINDI DAPAT** tumanggap ng anumang mga token na hindi tahasang inilabas para sa MCP server mismo  
2. **Authorization Verification**: Ang mga MCP server na nagpapatupad ng authorization **DAPAT** suriin LAHAT ng mga papasok na kahilingan at **HINDI DAPAT** gumamit ng sessions para sa authentication  
3. **User Consent**: Ang mga MCP proxy servers na gumagamit ng mga static na client IDs **DAPAT** kumuha ng tahasang pahintulot ng user para sa bawat dynamically registered client  
4. **Secure Session IDs**: Ang mga MCP server **DAPAT** gumamit ng cryptographically secure, hindi-deterministiko na session IDs na ginawa gamit ang secure random number generators

## Mga Pangunahing Kasanayan sa Seguridad

### 1. Input Validation & Sanitization
- **Komprehensibong Input Validation**: Suriin at linisin ang lahat ng inputs upang mapigilan ang injection attacks, confused deputy problems, at prompt injection vulnerabilities  
- **Parameter Schema Enforcement**: Ipapatupad ang mahigpit na JSON schema validation para sa lahat ng tool parameters at API inputs  
- **Content Filtering**: Gamitin ang Microsoft Prompt Shields at Azure Content Safety upang salain ang malisyosong nilalaman sa prompts at responses  
- **Output Sanitization**: Suriin at linisin ang lahat ng output ng modelo bago ipakita sa mga user o magpadala sa downstream systems  

### 2. Authentication & Authorization Excellence  
- **External Identity Providers**: I-delegate ang authentication sa mga kilalang identity providers (Microsoft Entra ID, OAuth 2.1 providers) sa halip na gumawa ng sariling authentication  
- **Fine-grained Permissions**: Ipatupad ang detalyadong permissions na pambagay sa tool kasunod ng prinsipyo ng least privilege  
- **Token Lifecycle Management**: Gumamit ng short-lived access tokens na may secure na rotation at tamang audience validation  
- **Multi-Factor Authentication**: Kailanganin ang MFA para sa lahat ng administrative access at sensitibong operasyon  

### 3. Secure Communication Protocols
- **Transport Layer Security**: Gamitin ang HTTPS/TLS 1.3 para sa lahat ng komunikasyon ng MCP na may tamang certificate validation  
- **End-to-End Encryption**: Magpatupad ng karagdagang encryption layers para sa lubhang sensitibong data habang nasa transit at nakaimbak  
- **Certificate Management**: Panatilihin ang tamang pamamahala ng certificate lifecycle na may automated renewal processes  
- **Protocol Version Enforcement**: Gamitin ang kasalukuyang bersyon ng MCP protocol (2025-11-25) na may tamang version negotiation.  

### 4. Advanced Rate Limiting & Resource Protection
- **Multi-layer Rate Limiting**: Ipatupad ang rate limiting sa antas ng user, session, tool, at resource upang maiwasan ang pang-aabuso  
- **Adaptive Rate Limiting**: Gumamit ng rate limiting na base sa machine learning na nag-aangkop sa mga pattern ng paggamit at mga tagapagpahiwatig ng banta  
- **Resource Quota Management**: Magtakda ng angkop na mga limitasyon para sa computational resources, paggamit ng memorya, at oras ng pagtakbo  
- **DDoS Protection**: Magpatupad ng komprehensibong DDoS protection at mga sistema sa pagsusuri ng trapiko  

### 5. Comprehensive Logging & Monitoring
- **Structured Audit Logging**: Magkaroon ng detalyado at madaling hanapin na mga logs para sa lahat ng operasyon ng MCP, pagtakbo ng tool, at mga security events  
- **Real-time Security Monitoring**: Magdeploy ng SIEM system na may AI-powered anomaly detection para sa mga MCP workloads  
- **Privacy-compliant Logging**: I-log ang mga security events habang nirerespeto ang mga kinakailangan at regulasyon sa privacy ng data  
- **Incident Response Integration**: Ikonekta ang mga logging system sa mga automated na workflows para sa incident response  

### 6. Enhanced Secure Storage Practices
- **Hardware Security Modules**: Gamitin ang HSM-backed key storage (Azure Key Vault, AWS CloudHSM) para sa mga kritikal na cryptographic operations  
- **Encryption Key Management**: Ipatupad ang tamang key rotation, segregation, at access controls para sa mga encryption key  
- **Secrets Management**: Itago ang lahat ng API keys, tokens, at credentials sa mga dedikadong secret management systems  
- **Data Classification**: Ikategorya ang data base sa antas ng pagiging sensitibo at ipatupad ang angkop na mga hakbang sa proteksyon  

### 7. Advanced Token Management
- **Token Passthrough Prevention**: Tahasang ipagbawal ang mga token passthrough pattern na pumapalagpas sa mga security controls  
- **Audience Validation**: Laging suriin na nagtutugma ang token audience claims sa nakatakdang MCP server identity  
- **Claims-based Authorization**: Ipatupad ang detalyadong authorization base sa mga claim ng token at mga katangian ng user  
- **Token Binding**: Itali ang mga token sa mga partikular na session, user, o device kung naaangkop  

### 8. Secure Session Management
- **Cryptographic Session IDs**: Gumawa ng session IDs gamit ang cryptographically secure random number generators (hindi predictible na sequences)  
- **User-specific Binding**: Itali ang session IDs sa user-specific na impormasyon gamit ang seguradong mga format tulad ng `<user_id>:<session_id>`  
- **Session Lifecycle Controls**: Ipatupad ang tamang session expiration, rotation, at invalidation na mga mekanismo  
- **Session Security Headers**: Gumamit ng angkop na HTTP security headers para sa proteksyon ng session  

### 9. AI-Specific Security Controls
- **Prompt Injection Defense**: Magdeploy ng Microsoft Prompt Shields na may spotlighting, delimiters, at datamarking techniques  
- **Tool Poisoning Prevention**: Suriin ang metadata ng tool, subaybayan ang mga dynamic na pagbabago, at patunayan ang integridad ng tool  
- **Model Output Validation**: I-scan ang mga output ng modelo para sa posibleng data leakage, mapanganib na nilalaman, o paglabag sa security policy  
- **Context Window Protection**: Ipatupad ang mga kontrol upang maiwasan ang context window poisoning at mga atake sa manipulasyon  

### 10. Tool Execution Security
- **Execution Sandboxing**: Patakbuhin ang tool executions sa containerized, isolated na mga kapaligiran na may resource limits  
- **Privilege Separation**: Ipatakbo ang mga tool na may pinakamababang kinakailangang mga pribilehiyo at hiwalay na mga service account  
- **Network Isolation**: Ipatupad ang network segmentation para sa mga environment ng tool execution  
- **Execution Monitoring**: Subaybayan ang pagpapatupad ng tool para sa anomalous behavior, paggamit ng mga resources, at paglabag sa seguridad  

### 11. Continuous Security Validation
- **Automated Security Testing**: Isama ang security testing sa CI/CD pipelines gamit ang mga tool tulad ng GitHub Advanced Security  
- **Vulnerability Management**: Regular na i-scan ang lahat ng dependencies, kabilang ang mga AI model at mga external na serbisyo  
- **Penetration Testing**: Isagawa ang regular na mga security assessment na espesipikong tumutok sa mga MCP implementation  
- **Security Code Reviews**: Ipatupad ang mandatory na mga security review para sa lahat ng mga pagbabago sa code na may kinalaman sa MCP  

### 12. Supply Chain Security for AI
- **Component Verification**: Patunayan ang pinagmulan, integridad, at seguridad ng lahat ng AI components (modelo, embeddings, API)  
- **Dependency Management**: Panatilihin ang kasalukuyang imbentaryo ng lahat ng software at AI dependencies na may pagsubaybay sa kahinaan  
- **Trusted Repositories**: Gumamit ng mga beripikado, pinagkakatiwalaang pinagkukunan para sa lahat ng AI models, libraries, at tools  
- **Supply Chain Monitoring**: Patuloy na subaybayan para sa anumang kompromiso sa mga AI service providers at mga model repositories  

## Advanced Security Patterns

### Zero Trust Architecture for MCP
- **Never Trust, Always Verify**: Ipatupad ang patuloy na beripikasyon para sa lahat ng kalahok ng MCP  
- **Micro-segmentation**: Ihiwalay ang mga bahagi ng MCP gamit ang detalyadong network at identity controls  
- **Conditional Access**: Ipatupad ang risk-based access controls na nag-aangkop sa konteksto at gawi  
- **Continuous Risk Assessment**: Dinamikong suriin ang security posture base sa kasalukuyang mga tagapagpahiwatig ng banta  

### Privacy-Preserving AI Implementation
- **Data Minimization**: Ilabas lamang ang pinakamababang kinakailangang data para sa bawat operasyon ng MCP  
- **Differential Privacy**: Ipatupad ang mga teknik na nagpoprotekta sa privacy para sa pagproseso ng sensitibong data  
- **Homomorphic Encryption**: Gumamit ng advanced na mga encryption technique para sa secure na computation sa naka-encrypt na data  
- **Federated Learning**: Ipatupad ang distributed learning approaches na nagpoprotekta sa lokalidad ng data at privacy  

### Incident Response for AI Systems
- **AI-Specific Incident Procedures**: Bumuo ng mga procedure sa incident response na akma sa AI at sa mga banta na espesipiko sa MCP  
- **Automated Response**: Ipatupad ang automated containment at remediation para sa mga karaniwang security incident ng AI  
- **Forensic Capabilities**: Panatilihin ang forensic readiness para sa kompromiso ng AI system at data breaches  
- **Recovery Procedures**: Magtakda ng mga procedure para sa pagbangon mula sa AI model poisoning, prompt injection attacks, at kompromiso ng serbisyo  

## Mga Mapagkukunan sa Pagpapatupad at Mga Pamantayan

### 🏔️ Hands-On Security Training
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komprehensibong hands-on workshop para sa pag-secure ng MCP servers sa Azure  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Reference architecture at gabay sa pagpapatupad ng OWASP MCP Top 10  

### Official MCP Documentation
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Kasalukuyang specification ng MCP protocol  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Opisyal na gabay sa seguridad  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Mga pattern ng authentication at authorization  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Mga kinakailangan sa seguridad ng transport layer  

### Microsoft Security Solutions
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Advanced na proteksyon laban sa prompt injection  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Komprehensibong pag-filter ng AI content  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Enterprise identity at access management  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Secure na pamamahala ng mga sikreto at credential  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Pag-scan ng supply chain at code security  

### Mga Pamantayan at Framework sa Seguridad
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Kasalukuyang gabay sa seguridad ng OAuth  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Mga panganib sa seguridad ng web application  
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Mga espesipikong panganib sa seguridad ng AI  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Komprehensibong pamamahala ng panganib sa AI  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Mga sistema sa pamamahala ng impormasyon sa seguridad  

### Mga Gabay sa Pagpapatupad at Tutorial
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Mga pattern sa enterprise authentication  
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integrasyon ng identity provider  
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Mga pinakamahusay na kasanayan sa token management  
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Mga advanced na pattern ng encryption  

### Advanced Security Resources
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Mga kasanayan sa secure development  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - AI-specific na pagsubok sa seguridad  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodolohiya ng AI threat modeling  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Mga teknik sa privacy-preserving AI  

### Compliance & Governance
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Pagsunod sa privacy sa mga system ng AI  
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Responsableng pagpapatupad ng AI  
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Mga kontrol sa seguridad para sa mga AI service provider  
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Mga kinakailangan sa pagsunod sa healthcare AI  

### DevSecOps & Automation
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Secure na mga AI development pipeline  
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Patuloy na pagsuri ng seguridad  
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Secure na pag-deploy ng imprastruktura  
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Seguridad ng containerization para sa AI workloads  

### Monitoring & Incident Response  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Komprehensibong mga solusyon sa monitoring  
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Mga procedure sa AI-specific incident response  
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Security information at event management  
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Mga pinagkukunan ng AI threat intelligence  

## 🔄 Patuloy na Pagpapabuti

### Manatiling Napapanahon sa Lumalawak na Mga Pamantayan
- **MCP Specification Updates**: Subaybayan ang opisyal na mga pagbabago sa MCP specification at mga advisory sa seguridad  
- **Threat Intelligence**: Mag-subscribe sa mga AI security threat feeds at mga database ng kahinaan  
- **Pakikilahok ng Komunidad**: Makilahok sa mga talakayan at grupo ng pagtatrabaho ng MCP security community
- **Regular na Pagsusuri**: Isagawa ang quarterly na pagsusuri ng seguridad at i-update ang mga gawain nang naaayon

### Pag-aambag sa MCP Security
- **Pananaliksik sa Seguridad**: Mag-ambag sa pananaliksik sa seguridad ng MCP at mga programa sa pag-aanunsyo ng kahinaan
- **Pagbabahagi ng Pinakamahusay na Kasanayan**: Ibahagi ang mga implementasyon ng seguridad at mga natutunang aral sa komunidad
- **Pagbuo ng Pamantayan**: Makibahagi sa pagbuo ng MCP specification at paglikha ng mga pamantayan sa seguridad
- **Pagbuo ng Kasangkapan**: Bumuo at magbahagi ng mga kasangkapan sa seguridad at mga library para sa MCP ecosystem

---

*Ang dokumentong ito ay sumasalamin sa mga pinakamahusay na gawi sa seguridad ng MCP noong Disyembre 18, 2025, batay sa MCP Specification 2025-11-25. Ang mga gawi sa seguridad ay dapat regular na repasuhin at i-update kasabay ng pagbabago ng protocol at tanawin ng banta.*

## Ano ang Susunod

- Basahin: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Bumutang muli sa: [Security Module Overview](./README.md)
- Magpatuloy sa: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:
Ang dokumentong ito ay isinalin gamit ang AI na serbisyo sa pagsasalin na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagaman aming sinisikap ang katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o diwasto. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pinagmumulan ng katotohanan. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasaling-tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na dulot ng paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->