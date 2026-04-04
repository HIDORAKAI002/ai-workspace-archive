# MCP Mga Pinakamahusay na Kasanayan sa Seguridad - Update ng Pebrero 2026

> **Mahalaga**: Ang dokumentong ito ay sumasalamin sa pinakabagong mga kinakailangan sa seguridad ng [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) at opisyal na [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Palaging sumangguni sa kasalukuyang espesipikasyon para sa pinaka-napapanahong gabay.

## 🏔️ Praktikal na Pagsasanay sa Seguridad

Para sa praktikal na karanasan sa implementasyon, inirerekomenda namin ang **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - isang komprehensibong gabay sa pag-secure ng MCP servers sa Azure. Tinutugunan ng workshop ang lahat ng OWASP MCP Top 10 na panganib sa pamamagitan ng metodolohiyang "vulnerable → exploit → fix → validate".

Ang lahat ng mga kasanayan sa dokumentong ito ay nakaayon sa **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** para sa tiyak na gabay sa implementasyon sa Azure.

## Mahahalagang Kasanayan sa Seguridad para sa mga Implementasyon ng MCP

Ang Model Context Protocol ay nagdudulot ng mga natatanging hamon sa seguridad na higit pa sa tradisyunal na seguridad ng software. Tinatalakay ng mga kasanayang ito ang parehong mga pundamental na kinakailangan sa seguridad at mga partikular na banta sa MCP kabilang ang prompt injection, tool poisoning, session hijacking, confused deputy problems, at token passthrough vulnerabilities.

### **MANDATORY na Mga Kinakailangan sa Seguridad** 

**Mahalagang Kinakailangan mula sa MCP Specification:**

### **MANDATORY na Mga Kinakailangan sa Seguridad** 

**Mahalagang Kinakailangan mula sa MCP Specification:**

> **HINDI DAPAT**: Ang mga MCP server **HINDI DAPAT** tumanggap ng anumang mga token na hindi tahasang inisyu para sa MCP server  
>
> **DAPAT**: Ang mga MCP server na nagpapatupad ng awtorisasyon **DAPAT** suriin ang LAHAT ng mga pumapasok na kahilingan  
>
> **HINDI DAPAT**: Ang mga MCP server **HINDI DAPAT** gumamit ng mga sesyon para sa pagpapatunay  
>
> **DAPAT**: Ang mga MCP proxy server na gumagamit ng static na mga client ID **DAPAT** kumuha ng pahintulot ng user para sa bawat dynamically na nakarehistrong client

---

## 1. **Seguridad ng Token at Pagpapatunay**

**Mga Kontrol sa Pagpapatunay at Awtorisasyon:**
   - **Masusing Pagsusuri ng Awtorisasyon**: Isagawa ang komprehensibong pag-audit ng awtorisasyon ng MCP server upang matiyak na tanging mga nais na user at client lamang ang makakagamit ng mga yaman  
   - **Integrasyon ng Panlabas na Identity Provider**: Gumamit ng itinatag na mga identity provider tulad ng Microsoft Entra ID sa halip na gumawa ng sariling pagpapatunay  
   - **Pagpapatunay ng Token Audience**: Laging tiyakin na ang mga token ay tahasang inisyu para sa iyong MCP server - huwag tanggapin ang mga token mula sa upstream   
   - **Wastong Lifecycle ng Token**: Ipatupad ang ligtas na token rotation, mga patakaran sa pag-expire, at pigilan ang mga token replay attack

**Protektadong Pag-iimbak ng Token:**
   - Gumamit ng Azure Key Vault o katulad na secure na imbakan para sa lahat ng mga lihim  
   - Ipatupad ang encryption para sa mga token kapag naka-imbak at habang nagta-transmit  
   - Regular na pag-ikot ng kredensyal at pagmo-monitor para sa hindi awtorisadong pag-access

## 2. **Pamamahala ng Session at Seguridad ng Transport**

**Mga Praktis sa Ligtas na Session:**
   - **Cryptographically Secure Session IDs**: Gumamit ng secure, hindi deterministic na session IDs na nilikha gamit ang mga secure random number generator  
   - **Pag-bind ng Session sa User**: Itali ang session IDs sa mga pagkakakilanlan ng user gamit ang mga format tulad ng `<user_id>:<session_id>` upang maiwasan ang cross-user session abuse  
   - **Pamamahala ng Lifecycle ng Session**: Ipatupad ang wastong pag-expire, pag-ikot, at pag-wasto upang limitahan ang mga bintana ng kahinaan  
   - **HTTPS/TLS Enforcement**: Sapilitang HTTPS para sa lahat ng komunikasyon upang maiwasan ang interception ng session ID

**Seguridad ng Transport Layer:**
   - I-configure ang TLS 1.3 kung maaari na may wastong pamamahala ng sertipiko  
   - Ipatupad ang certificate pinning para sa mga kritikal na koneksyon  
   - Regular na pag-ikot ng sertipiko at pag-verify ng pagiging balido nito

## 3. **Proteksyon Laban sa AI-Specific Threats** 🤖

**Depensa laban sa Prompt Injection:**
   - **Microsoft Prompt Shields**: Mag-deploy ng AI Prompt Shields para sa advanced na pagtuklas at pagsala ng malisyosong mga utos  
   - **Input Sanitization**: Suriin at linisin ang lahat ng input upang maiwasan ang injection attack at confused deputy problems  
   - **Mga Hangganan ng Nilalaman**: Gumamit ng mga delimiter at sistema ng datamarking upang maiba ang mga pinagkakatiwalaang utos mula sa panlabas na nilalaman

**Pag-iwas sa Tool Poisoning:**
   - **Pagpapatunay ng Metadata ng Tool**: Ipatupad ang mga integrity check para sa mga depinisyon ng tool at subaybayan ang mga hindi inaasahang pagbabago  
   - **Pagsubaybay sa Dynamic Tool**: Subaybayan ang runtime na kilos at mag-set up ng mga alerto para sa mga hindi inaasahang pattern ng pagpapatupad  
   - **Mga Workflow ng Pag-apruba**: Kailangan ang tahasang pahintulot ng user para sa mga pagbabago sa tool at kakayahan

## 4. **Kontrol sa Access at Mga Pahintulot**

**Prinsipyo ng Pinakamaliit na Pribilehiyo:**
   - Bigyan ang MCP servers ng pinakamababang pahintulot na kinakailangan para sa nais na functionality  
   - Ipatupad ang role-based access control (RBAC) na may masusing mga pahintulot  
   - Regular na pagsusuri ng mga pahintulot at tuloy-tuloy na pagmamanman para sa privilege escalation

**Mga Kontrol ng Pahintulot sa Runtime:**
   - Ipatupad ang mga limitasyon sa yaman upang maiwasan ang mga resource exhaustion attack  
   - Gumamit ng container isolation para sa mga execution environment ng tool  
   - Ipatupad ang just-in-time access para sa mga administratibong tungkulin

## 5. **Kaligtasan at Pagmamanman ng Nilalaman**

**Pagpapatupad ng Kaligtasan ng Nilalaman:**
   - **Integrasyon ng Azure Content Safety**: Gumamit ng Azure Content Safety upang matukoy ang nakakasamang nilalaman, mga pagtatangka sa jailbreak, at paglabag sa patakaran  
   - **Pagsusuri ng Ugali**: Ipatupad ang runtime behavioral monitoring upang tuklasin ang mga anomalya sa pagpapatupad ng MCP server at mga tool  
   - **Komprehensibong Pag-log**: I-log ang lahat ng pagtatangka sa pagpapatunay, mga pagtawag sa tool, at mga kaganapan sa seguridad na may secure at hindi natatanggal na imbakan

**Tuloy-tuloy na Pagmomonitor:**
   - Real-time na pag-alerto para sa mga kahina-hinalang pattern at hindi awtorisadong pagtatangka sa pag-access  
   - Integrasyon sa mga SIEM system para sa sentralisadong pamamahala ng mga kaganapan sa seguridad  
   - Regular na pag-audit sa seguridad at penetration testing ng mga implementasyon ng MCP

## 6. **Seguridad ng Supply Chain**

**Pagpapatunay ng mga Komponent:**
   - **Dependency Scanning**: Gumamit ng automated vulnerability scanning para sa lahat ng software dependencies at AI components  
   - **Pagpapatunay ng Pinagmulan**: Suriin ang pinagmulan, lisensya, at integridad ng mga modelo, pinagkukunan ng data, at mga panlabas na serbisyo  
   - **Pinirmahang Pakete**: Gumamit ng cryptographically signed na mga pakete at tiyaking beripikado ang mga lagda bago i-deploy

**Ligtas na Development Pipeline:**
   - **GitHub Advanced Security**: Ipatupad ang secret scanning, dependency analysis, at CodeQL static analysis  
   - **Seguridad sa CI/CD**: Isaayos ang pagsuri ng seguridad sa buong automated deployment pipeline  
   - **Integridad ng Artifact**: Ipatupad ang cryptographic verification para sa mga na-deploy na artifact at konfigurasyon

## 7. **Seguridad ng OAuth at Pag-iwas sa Confused Deputy**

**Implementasyon ng OAuth 2.1:**
   - **Implementasyon ng PKCE**: Gumamit ng Proof Key for Code Exchange (PKCE) sa lahat ng kahilingan sa awtorisasyon  
   - **Tahasang Pahintulot**: Kumuha ng pahintulot ng user para sa bawat dynamically na nakarehistrong client upang maiwasan ang confused deputy attacks  
   - **Pagpapatunay ng Redirect URI**: Ipatupad ang mahigpit na pagpapatunay ng redirect URIs at mga client identifier

**Seguridad ng Proxy:**
   - Pigilan ang bypass ng awtorisasyon sa pamamagitan ng static client ID exploitation  
   - Ipatupad ang wastong mga workflow ng pahintulot para sa access sa third-party API  
   - Subaybayan ang pagnanakaw ng authorization code at hindi awtorisadong pag-access sa API

## 8. **Pagsagot sa Insidente at Pagbangon**

**Mabilis na Kakayahan sa Pagsagot:**
   - **Automated Response**: Ipatupad ang mga automated na sistema para sa pag-ikot ng kredensyal at pagpigil sa banta  
   - **Mga Proseso ng Rollback**: Kakayahang mabilis na bumalik sa mga kilalang mabuting konfigurasyon at komponent  
   - **Kakayahan sa Forensics**: Detalyadong audit trails at pag-log para sa pagsisiyasat ng insidente

**Komunikasyon at Koordinasyon:**
   - Malinaw na mga proseso ng eskalasyon para sa mga security incidents  
   - Integrasyon sa mga teams ng organisasyon para sa pagsagot sa insidente  
   - Regular na mga simulation ng security incident at tabletop exercise

## 9. **Pagsunod at Pamamahala**

**Pagsunod sa Regulasyon:**
   - Tiyakin na ang mga implementasyon ng MCP ay nakakatugon sa mga partikular na kinakailangan ng industriya (GDPR, HIPAA, SOC 2)  
   - Ipatupad ang klasipikasyon ng data at mga kontrol sa privacy para sa pagproseso ng AI data  
   - Panatilihin ang komprehensibong dokumentasyon para sa auditing ng pagsunod

**Pamamahala ng Pagbabago:**
   - Pormal na mga proseso ng pagsusuri ng seguridad para sa lahat ng pagbabago sa MCP system  
   - Version control at mga workflow ng pag-apruba para sa mga pagbabago sa konfigurasyon  
   - Regular na mga pagsusuri ng pagsunod at gap analysis

## 10. **Mga Advanced na Kontrol sa Seguridad**

**Zero Trust Architecture:**
   - **Huwag kailanman magtiwala, laging suriin**: Tuloy-tuloy na beripikasyon ng mga user, device, at koneksyon  
   - **Micro-segmentation**: Masusing mga kontrol sa network na naghihiwalay sa mga indibidwal na MCP component  
   - **Conditional Access**: Mga kontrol sa access batay sa panganib na umaangkop sa kasalukuyang konteksto at kilos

**Proteksyon ng Runtime Application:**
   - **Runtime Application Self-Protection (RASP)**: Mag-deploy ng mga teknik ng RASP para sa real-time na pagtuklas ng banta  
   - **Application Performance Monitoring**: Subaybayan ang mga anomalya sa performance na maaaring magpahiwatig ng mga pag-atake  
   - **Dynamic Security Policies**: Ipatupad ang mga polisiya sa seguridad na umaangkop batay sa kasalukuyang kalagayan ng banta

## 11. **Integrasyon ng Microsoft Security Ecosystem**

**Komprehensibong Microsoft Security:**
   - **Microsoft Defender for Cloud**: Pamamahala ng seguridad ng cloud posture para sa mga MCP workload  
   - **Azure Sentinel**: Cloud-native SIEM at SOAR na kakayahan para sa advanced na pagtuklas ng banta  
   - **Microsoft Purview**: Pamamahala ng data at pagsunod para sa AI workflows at mga pinagkukunan ng data

**Identity at Access Management:**
   - **Microsoft Entra ID**: Pamamahala ng pagkakakilanlan ng enterprise na may mga polisiya sa conditional access  
   - **Privileged Identity Management (PIM)**: Just-in-time access at workflow ng pag-apruba para sa mga administratibong tawag  
   - **Identity Protection**: Conditional access batay sa panganib at automated na pagtugon sa banta

## 12. **Tuloy-tuloy na Ebolusyon ng Seguridad**

**Panatilihing Napapanahon:**
   - **Pagsubaybay ng Espesipikasyon**: Regular na pagsusuri ng mga update sa MCP specification at mga pagbabago sa patnubay sa seguridad  
   - **Threat Intelligence**: Integrasyon ng AI-specific threat feeds at mga indicator ng kompromiso  
   - **Pakikipag-ugnayan sa Komunidad ng Seguridad**: Aktibong partisipasyon sa MCP security community at mga programa sa paglalantad ng kahinaan

**Adaptive Security:**
   - **Machine Learning Security**: Gumamit ng ML-based anomaly detection para matukoy ang mga bagong pattern ng pag-atake  
   - **Predictive Security Analytics**: Ipatupad ang mga predictive model para sa proaktibong pagtuklas ng banta  
   - **Automation ng Seguridad**: Awtomatikong mga update sa polisiya sa seguridad base sa threat intelligence at mga pagbabago sa espesipikasyon

---

## **Mahalagang Mapagkukunan sa Seguridad**

### **Opisyal na Dokumentasyon ng MCP**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Security Resources**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komprehensibong OWASP MCP Top 10 na may implementasyon sa Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Opisyal na listahan ng panganib ng OWASP MCP security  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktikal na pagsasanay sa seguridad para sa MCP sa Azure

### **Microsoft Security Solutions**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Mga Pamantayan sa Seguridad**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

### **Mga Gabay sa Implementasyon**
- [Azure API Management MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Tandaan sa Seguridad**: Mabilis na nagbabago ang mga kasanayan sa seguridad ng MCP. Palaging tiyakin gamit ang kasalukuyang [MCP specification](https://spec.modelcontextprotocol.io/) at opisyal na [security documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) bago magpatupad.

## Ano ang Sunod

- Basahin: [MCP Security Controls 2025](./mcp-security-controls-2025.md)
- Bumalik sa: [Security Module Overview](./README.md)
- Magpatuloy sa: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:
Ang dokumentong ito ay isinalin gamit ang serbisyong AI na pagsasalin na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang mga awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi eksaktong impormasyon. Ang orihinal na dokumento sa kanyang sariling wika ang dapat ituring na pinagkakatiwalaang sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaintindihan o maling interpretasyon na maaaring lumitaw mula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->