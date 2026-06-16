# MCP Security: Komprehensibong Proteksyon para sa mga AI System

[![MCP Security Best Practices](../../../translated_images/tl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(I-click ang larawan sa itaas upang panoorin ang video ng leksyong ito)_

Ang seguridad ay pundamental sa disenyo ng AI system, kaya inuuna namin ito bilang aming pangalawang seksyon. Ito ay naaayon sa prinsipyo ng Microsoft na **Secure by Design** mula sa [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Ang Model Context Protocol (MCP) ay nagdadala ng makapangyarihang bagong kakayahan sa mga aplikasyon na pinatatakbo ng AI habang ipinapakilala ang mga natatanging hamon sa seguridad na lumalampas sa tradisyonal na panganib sa software. Ang mga MCP system ay humaharap sa parehong mga nakagisnang isyu sa seguridad (secure coding, least privilege, seguridad sa supply chain) at mga bagong tukoy na banta sa AI tulad ng prompt injection, tool poisoning, session hijacking, confused deputy attacks, token passthrough vulnerabilities, at dynamic capability modification.

Tinutuklas ng lekson na ito ang mga pinaka-kritikal na panganib sa seguridad sa mga implementasyon ng MCP—kabilang ang authentication, authorization, labis na permiso, indirect prompt injection, session security, problema sa confused deputy, pamamahala ng token, at mga kahinaan sa supply chain. Matututuhan mo ang mga napapanahong kontrol at pinakamahusay na kasanayan upang mabawasan ang mga panganib na ito habang ginagamit ang Microsoft na mga solusyon tulad ng Prompt Shields, Azure Content Safety, at GitHub Advanced Security upang palakasin ang iyong MCP deployment.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng lekson na ito, magagawa mong:

- **Kilalanin ang mga Tukoy na Banta sa MCP**: Makilala ang mga natatanging panganib sa seguridad sa mga MCP system kabilang ang prompt injection, tool poisoning, labis na permiso, session hijacking, problema sa confused deputy, token passthrough vulnerabilities, at panganib sa supply chain
- **Ilapat ang mga Kontrol sa Seguridad**: Magpatupad ng epektibong mga mitigasyon kabilang ang matibay na authentication, least privilege access, secure token management, session security controls, at supply chain verification
- **Gamitin ang mga Solusyon sa Seguridad ng Microsoft**: Maunawaan at ilagay ang Microsoft Prompt Shields, Azure Content Safety, at GitHub Advanced Security para sa proteksyon ng MCP workload
- **I-validate ang Seguridad ng Tool**: Kilalanin ang kahalagahan ng validation ng tool metadata, pagmamanman para sa dynamic changes, at pagtatanggol laban sa indirect prompt injection attacks
- **Isama ang Pinakamahusay na Kasanayan**: Pagsamahin ang mga naitaguyod na pundasyon ng seguridad (secure coding, server hardening, zero trust) gamit ang MCP-specific controls para sa komprehensibong proteksyon

# MCP Security Architecture & Controls

Ang mga makabagong implementasyon ng MCP ay nangangailangan ng layers ng seguridad na tumutugon sa parehong tradisyonal na seguridad sa software at mga tukoy na banta sa AI. Ang mabilis na pagbabago ng MCP specification ay patuloy na pinabubuti ang mga kontrol nito sa seguridad, na nagpapahintulot ng mas mahusay na integrasyon sa mga enterprise security architecture at mga naitaguyod na pinakamahusay na kasanayan.

Ipinapakita ng pananaliksik mula sa [Microsoft Digital Defense Report](https://aka.ms/mddr) na **98% ng mga iniulat na paglabag ay maiiwasan sa pamamagitan ng matibay na hygiene sa seguridad**. Ang pinaka-epektibong estratehiya sa proteksyon ay pinaglalapat ang pundamental na mga kasanayan sa seguridad kasama ang MCP-specific controls—ang mga patunay na baseline security measures ang pinakamalaking epekto sa pagbabawas ng pangkalahatang panganib sa seguridad.

## Kasalukuyang Kalagayan ng Seguridad

> **Tandaan:** Ang impormasyon na ito ay sumasalamin sa mga pamantayan ng seguridad ng MCP noong **Pebrero 5, 2026**, na naaayon sa **MCP Specification 2025-11-25**. Ang MCP protocol ay patuloy na mabilis umuunlad, at ang mga susunod na implementasyon ay maaaring magpakilala ng mga bagong authentication pattern at pinahusay na mga kontrol. Laging sumangguni sa kasalukuyang [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol), at [security best practices documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) para sa pinakabagong gabay.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Para sa **praktikal na pagsasanay sa seguridad**, malugod naming inirerekomenda ang **MCP Security Summit Workshop** (Sherpa) - isang komprehensibong gabay na ekspedisyon upang maprotektahan ang mga MCP server sa Microsoft Azure.

### Pangkalahatang-ideya ng Workshop

Ang [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) ay nagbibigay ng praktikal at napapanahong pagsasanay sa seguridad gamit ang subok na metodolohiyang "vulnerable → exploit → fix → validate". Matututuhan mo ang:

- **Pagkatuto sa Pamamagitan ng Pagwasak**: Maranasan ang mga kahinaan sa seguridad sa pamamagitan ng pag-atake sa mga sinadyang insecure na server
- **Gamitin ang Azure-Native Security**: Gamitin ang Azure Entra ID, Key Vault, API Management, at AI Content Safety
- **Sundin ang Defense-in-Depth**: Umusad sa mga kampo na bumubuo ng komprehensibong mga layer ng seguridad
- **Ilapat ang Mga Pamantayan ng OWASP**: Bawat teknik ay nagtutugma sa [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Makuha ang Production Code**: Magdala ng gumaganang, nasubukang implementasyon pagkatapos

### Ruta ng Ekspedisyon

| Kampo | Pokus | Mga Panganib ng OWASP na Tinatalakay |
|-------|-------|-------------------------------------|
| **Base Camp** | Mga pundasyon ng MCP at mga kahinaan sa authentication | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, pamamahala | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3: I/O Security** | Prompt injection, proteksyon ng PII, seguridad ng nilalaman | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4: Monitoring** | Log Analytics, dashboards, pagtuklas ng banta | MCP04, MCP08 |
| **The Summit** | Pagsasanib ng Red Team / Blue Team test | Lahat |

**Magsimula:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Security Risks

Detalyado sa [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) ang sampung pinaka-kritikal na panganib sa seguridad para sa mga implementasyon ng MCP:

| Panganib | Paglalarawan | Azure Mitigation |
|----------|--------------|------------------|
| **MCP01** | Token Mismanagement at Pagsisiwalat ng Sekreto | Azure Key Vault, Managed Identity |
| **MCP02** | Pagtaas ng Pribilehiyo sa pamamagitan ng Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Validation ng tool, pagsuri ng integridad |
| **MCP04** | Atake sa Software Supply Chain at Pambabaluktot sa Dependensya | GitHub Advanced Security, dependency scanning |
| **MCP05** | Command Injection at Pagsasagawa | Pag-validate ng input, sandboxing |
| **MCP06** | Pagbabago ng Daloy ng Intensyon | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Hindi Sapat na Authentication at Authorization | Azure Entra ID, OAuth 2.1 kasama ang PKCE |
| **MCP08** | Kawalan ng Audit at Telemetry | Azure Monitor, Application Insights |
| **MCP09** | Shadow MCP Servers | API Center governance, network isolation |
| **MCP10** | Context Injection at Labis na Pagbabahagi | Pag-uuri ng data, minimal na exposure |

### Ebolusyon ng Authentication ng MCP

Malaki ang nabago ng MCP specification sa paraan ng authentication at authorization:

- **Orihinal na Paraan**: Ang mga unang specification ay nag-aatas sa mga developer na magpatupad ng sariling custom authentication servers, kung saan ang mga MCP server ay kumikilos bilang OAuth 2.0 Authorization Servers na direktang nagmamanage ng authentication ng user
- **Kasalukuyang Pamantayan (2025-11-25)**: Ang na-update na specification ay nagpapahintulot sa mga MCP server na idelegar ang authentication sa mga panlabas na identity provider (tulad ng Microsoft Entra ID), na nagpapabuti sa seguridad at nagpapadali ng implementasyon
- **Transport Layer Security**: Pinahusay na suporta para sa secure transport mechanisms na may wastong authentication pattern para sa parehong lokal (STDIO) at remote (Streamable HTTP) na koneksyon

## Authentication at Authorization Security

### Mga Hamon sa Kasalukuyan

Ang mga modernong implementasyon ng MCP ay nahaharap sa ilang mga hamon sa authentication at authorization:

### Mga Panganib at Vector ng Atake

- **Maling Pagkakonpigurasyon ng Authorization Logic**: Ang maling implementasyon ng authorization sa MCP server ay maaaring maglantad ng sensitibong data at mali ang paglalapat ng access controls
- **Pagkakompromiso ng OAuth Token**: Ang pagnanakaw ng token mula sa lokal na MCP server ay nagbibigay daan sa mga umaatake na magpanggap bilang mga server at ma-access ang mga downstream na serbisyo
- **Token Passthrough Vulnerabilities**: Ang mali o hindi tamang paghawak ng token ay lumilikha ng bypass sa mga kontrol sa seguridad at mga puwang sa pananagutan
- **Labis na Permission**: Ang sobrang pribilehiyo ng mga MCP server ay lumalabag sa prinsipyong least privilege at pinalalawak ang mga panganib sa pag-atake

#### Token Passthrough: Isang Kritikal na Anti-Pattern

**Ang token passthrough ay mahigpit na ipinagbabawal** sa kasalukuyang MCP authorization specification dahil sa malubhang epekto nito sa seguridad:

##### Pag-iwas sa Kontrol sa Seguridad  
- Ang MCP server at downstream na mga API ay nagpapatupad ng mahahalagang kontrol sa seguridad (limitasyon ng rate, pag-validate ng request, pagmamanman ng trapiko) na nakabatay sa tamang pagsusuri ng token
- Ang direktang paggamit ng token mula sa kliyente papuntang API ay nilalampasan ang mga mahahalagang proteksyong ito, na sumisira sa arkitektura ng seguridad

##### Mga Hamon sa Pananagutan at Audit  
- Hindi makilala ng MCP server ang mga kliyente gamit ang tokens na ibinigay sa gagamitin na upstream, kaya nawawala ang mga audit trail
- Nagpapakita ang mga log ng downstream resource server ng maling pinagmulan ng request kaysa sa aktwal na MCP server na tagapamagitan
- Nagiging mas mahirap ang pagsisiyasat ng insidente at auditing para sa pagsunod

##### Panganib sa Pag-agaw ng Data  
- Pinapayagan ng hindi nabe-validate na mga claim ng token ang mga masamang aktor na may nakaw na token na gamitin ang MCP server bilang proxy para sa pag-agaw ng data
- Ang paglabag sa trust boundary ay nagbibigay daan sa hindi awtorisadong pag-access na nilalampasan ang mga inaasahang kontrol sa seguridad

##### Multi-Serbisyo na Vector ng Atake  
- Ang mga kompromisadong token na tinatanggap ng maraming serbisyo ay nagbibigay-daan sa paggalaw lateral sa mga naka-konektang sistema
- Maaring malabag ang mga assumptions ng tiwala sa pagitan ng mga serbisyo kapag hindi na-verify ang pinagmulan ng token

### Mga Kontrol sa Seguridad at Mga Pamamaraang Mitigasyon

**Kritikal na Pangangailangan sa Seguridad:**

> **MANDATORY**: Ang mga MCP server ay **HINDI DAPAT** tumanggap ng anumang token na hindi tahasang inilabas para sa MCP server

#### Mga Kontrol sa Authentication at Authorization

- **Masusing Pagsusuri ng Authorization**: Magsagawa ng komprehensibong audit sa authorization logic ng MCP server upang matiyak na tanging ang mga nais na user at kliyente lang ang makaka-access sa sensitibong resources
  - **Gabay sa Implementasyon**: [Azure API Management bilang Authentication Gateway para sa MCP Servers](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrasyon ng Identity**: [Paggamit ng Microsoft Entra ID para sa Authentication ng MCP Server](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Secure Token Management**: Ipatupad ang [mga pinakamahusay na kasanayan sa token validation at lifecycle ng Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - I-validate na tugma ang token audience claims sa pagkakakilanlan ng MCP server
  - Ipatupad ang tamang token rotation at expiration policies
  - Iwasan ang token replay attacks at hindi awtorisadong paggamit

- **Protektadong Pag-iimbak ng Token**: Siguraduhing naka-encrypt ang token storage sa parehong estado at transit
  - **Pinakamahusay na Kasanayan**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Pagpapatupad ng Access Control

- **Prinsipyo ng Least Privilege**: Bigyan lamang ang mga MCP server ng pinakamababang permiso na kinakailangan para sa nais na functionality
  - Regular na pagsusuri at pag-update ng permiso upang maiwasan ang privilege creep
  - **Dokumentasyon ng Microsoft**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Magpatupad ng masusing pagtatalaga ng mga role
  - Higpitan ang saklaw ng mga role sa partikular na mga resource at aksyon
  - Iwasan ang malawak o hindi kinakailangang permiso na nagpapalawak ng surface ng pag-atake

- **Patuloy na Pagmamanman ng Permiso**: Magpatupad ng tuloy-tuloy na pag-audit at pagmamanman ng access
  - Bantayan ang mga pattern ng paggamit ng permiso para sa mga anomalya
  - Agad na solusyunan ang labis o hindi nagagamit na mga pribilehiyo

## Mga Tukoy na Banta sa Seguridad ng AI

### Prompt Injection at Mga Pag-atake sa Manipulasyon ng Tool

Ang mga makabagong implementasyon ng MCP ay nahaharap sa mga sopistikadong AI-specific attack vector na hindi ganap na natutugunan ng tradisyonal na mga hakbang sa seguridad:

#### **Indirect Prompt Injection (Cross-Domain Prompt Injection)**

Ang **Indirect Prompt Injection** ay isa sa mga pinaka-kritikal na kahinaan sa mga sistemang AI na pinapaandar ng MCP. Ang mga attacker ay naglalagay ng malisyosong mga tagubilin sa loob ng panlabas na nilalaman—mga dokumento, web pages, emails, o mga pinagmumulan ng data—na kalaunan ay pinoproseso ng mga AI system bilang mga lehitimong utos.

**Mga Senaryo ng Atake:**
- **Pag-inject sa Dokumento**: Mga malisyosong tagubilin na nakatago sa mga dokumentong pinoproseso na nagdudulot ng hindi inaasahang aksyon ng AI
- **Eksploytasyon ng Web Content**: Mga kompromisadong web pages na naglalaman ng nakaembed na mga prompt na nagmamanipula sa kilos ng AI kapag kinukuha
- **Mga Atake gamit ang Email**: Malisyosong prompt sa mga email na nagdudulot sa AI assistant na mag-leak ng impormasyon o magsagawa ng hindi otorisadong gawa
- **Kontaminasyon ng Pinagmumulan ng Data**: Mga kompromisadong databases o API na naghahatid ng maruming nilalaman sa mga AI system

**Epekto sa Totoong Mundo**: Ang mga pag-atakeng ito ay maaaring magresulta sa pag-agaw ng data, paglabag sa privacy, paggawa ng nakakapinsalang nilalaman, at manipulasyon ng mga interaksyon ng user. Para sa detalyadong pagsusuri, tingnan ang [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/tl/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning Attacks**

Ang **Tool Poisoning** ay tumatarget sa metadata na naglalarawan ng mga MCP tool, na ginagamit ng LLM upang interpretahin ang mga deskripsyon at parameter ng tool para sa mga desisyong pagpapatupad.

**Mga Mekanismo ng Atake:**
- **Manipulasyon ng Metadata**: Ang mga attacker ay nag-iinject ng malisyosong tagubilin sa mga deskripsyon ng tool, mga depinisyon ng parameter, o mga halimbawa ng paggamit
- **Hindi Nakikitang Mga Tagubilin**: Nakakubling prompt sa metadata ng tool na pinoproseso ng AI models ngunit hindi nakikita ng mga tao
- **Dynamic Tool Modification ("Rug Pulls")**: Ang mga tool na inaprubahan ng mga user ay binabago pagkatapos upang gumawa ng malisyosong aksyon nang hindi nalalaman ng user
- **Parameter Injection**: Malisyosong nilalaman na nakapasok sa tool parameter schemas na nakakaapekto sa behavior ng modelo

**Panganib sa Hosted Server**: Ang mga remote MCP server ay nagdudulot ng mas mataas na panganib dahil maaaring ma-update ang mga depinisyon ng tool pagkatapos ng paunang pag-apruba ng user, na lumilikha ng mga senaryo kung saan ang dati nang ligtas na mga tool ay nagiging malisyoso. Para sa komprehensibong pagsusuri, tingnan ang [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/tl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Karagdagang AI Attack Vector**

- **Cross-Domain Prompt Injection (XPIA)**: Mga sopistikadong atake na gumagamit ng nilalaman mula sa maraming domain upang malusutan ang mga kontrol sa seguridad
- **Dynamic Capability Modification**: Mga pagbabago sa kakayahan ng tool sa real-time na nakakalusot sa mga paunang pagsusuri sa seguridad
- **Context Window Poisoning**: Mga atake na nagmamanipula ng malalaking context window upang itago ang mga malisyosong tagubilin
- **Model Confusion Attacks**: Pagsasamantala sa mga limitasyon ng modelo upang lumikha ng hindi inaasahan o hindi ligtas na mga gawi


### AI Security Risk Impact

**Mataas na Epekto ng Mga Bunga:**
- **Data Exfiltration**: Hindi awtorisadong pag-access at pagnanakaw ng sensitibong datos ng enterprise o personal
- **Privacy Breaches**: Pagkakalantad ng personally identifiable information (PII) at kumpidensyal na datos ng negosyo  
- **System Manipulation**: Hindi inaasahang mga pagbabago sa mga kritikal na sistema at workflows
- **Credential Theft**: Pagsasamantala sa mga authentication token at mga credentials ng serbisyo
- **Lateral Movement**: Paggamit ng kompromisadong mga sistema ng AI bilang pivots para sa mas malawak na mga pag-atake sa network

### Microsoft AI Security Solutions

#### **AI Prompt Shields: Advanced Protection Against Injection Attacks**

Nagbibigay ang Microsoft **AI Prompt Shields** ng komprehensibong depensa laban sa parehong direktang at di-direktang mga pag-atake ng prompt injection sa pamamagitan ng maraming layer ng seguridad:

##### **Core Protection Mechanisms:**

1. **Advanced Detection & Filtering**
   - Mga algorithm ng machine learning at mga teknik ng NLP para matukoy ang malisyosong mga tagubilin sa panlabas na nilalaman
   - Real-time na pagsusuri ng mga dokumento, web pages, emails, at pinagkukunan ng datos para sa mga nakatagong banta
   - Kontekstuwal na pag-unawa sa mga lehitimo laban sa malisyosong mga pattern ng prompt

2. **Spotlighting Techniques**  
   - Nagbibigay-diin sa pagitan ng pinagkakatiwalaang mga tagubilin ng sistema at posibleng kompromisadong panlabas na input
   - Mga paraan ng pagbabago ng teksto na nagpapahusay sa kaugnayan ng modelo habang inihihiwalay ang malisyosong nilalaman
   - Tinutulungan ang mga AI systems na mapanatili ang tamang hierarchy ng tagubilin at balewalain ang mga iniksyon na utos

3. **Delimiter & Datamarking Systems**
   - Tiyak na hangganan sa pagitan ng pinagkakatiwalaang mga mensahe ng sistema at panlabas na teksto ng input
   - Mga espesyal na marka na nagha-highlight sa mga hangganan sa pagitan ng pinagkakatiwalaan at hindi pinagkakatiwalaang pinagkukunan ng datos
   - Malinaw na paghihiwalay para maiwasan ang kalituhan sa tagubilin at hindi awtorisadong pagpapatupad ng utos

4. **Continuous Threat Intelligence**
   - Patuloy na pagmamanman ng Microsoft sa mga umuusbong na pattern ng pag-atake at pag-update ng mga depensa
   - Proaktibong paghahanap ng banta para sa mga bagong teknik ng injection at mga vector ng pag-atake
   - Regular na pag-update ng modelo ng seguridad upang mapanatili ang bisa laban sa mga nagbabagong banta

5. **Azure Content Safety Integration**
   - Bahagi ng komprehensibong Azure AI Content Safety suite
   - Karagdagang pagtuklas para sa mga tangkang jailbreak, nakakasamang nilalaman, at paglabag sa patakaran ng seguridad
   - Nagkakaisang mga kontrol sa seguridad sa buong mga bahagi ng AI application

**Implementation Resources**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/tl/prompt-shield.ff5b95be76e9c78c.webp)


## Advanced MCP Security Threats

### Session Hijacking Vulnerabilities

Ang **session hijacking** ay kumakatawan sa isang kritikal na vector ng pag-atake sa mga stateful MCP implementations kung saan ang hindi awtorisadong mga partido ay nakakakuha at inaabuso ang lehitimong mga identifier ng session upang magpanggap bilang mga kliyente at magsagawa ng hindi awtorisadong mga aksyon.

#### **Attack Scenarios & Risks**

- **Session Hijack Prompt Injection**: Ang mga umaatake na may ninakaw na session IDs ay nag-iinject ng malisyosong mga pangyayari sa mga server na nagbabahagi ng session state, na posibleng mag-trigger ng mapanganib na aksyon o pag-access sa sensitibong datos
- **Direct Impersonation**: Ang ninakaw na session IDs ay nagpapahintulot ng direktang tawag sa MCP server na nilalampasan ang authentication, na tinatrato ang mga umaatake bilang mga lehitimong gumagamit
- **Compromised Resumable Streams**: Maaaring papatayin ng mga umaatake ang mga kahilingan nang maaga, dahilan upang mag-resume ang mga lehitimong kliyente gamit ang posibleng malisyosong nilalaman

#### **Security Controls for Session Management**

**Critical Requirements:**
- **Authorization Verification**: Ang mga MCP server na nagpapatupad ng authorization **DAPAT** tiyakin ang LAHAT ng pumapasok na mga kahilingan at **HINDI DAPAT** umasa sa sessions para sa authentication
- **Secure Session Generation**: Gumamit ng cryptographically secure, non-deterministic na session IDs na nilikha gamit ang secure random number generators
- **User-Specific Binding**: Isa-bind ang session IDs sa user-specific na impormasyon gamit ang mga format tulad ng `<user_id>:<session_id>` upang maiwasan ang pag-abuso sa session ng ibang user
- **Session Lifecycle Management**: Magpatupad ng wastong expiration, rotation, at invalidation upang limitahan ang mga vulnerability window
- **Transport Security**: Mandatory ang HTTPS para sa lahat ng komunikasyon upang maiwasan ang interception ng session ID

### Confused Deputy Problem

Ang **confused deputy problem** ay nangyayari kapag ang mga MCP server ay kumilos bilang mga authentication proxy sa pagitan ng mga kliyente at third-party na serbisyo, na lumilikha ng pagkakataon para sa bypass ng authorization sa pamamagitan ng static client ID exploitation.

#### **Attack Mechanics & Risks**

- **Cookie-based Consent Bypass**: Ang naunang authentication ng user ay lumilikha ng mga consent cookies na inaabuso ng mga umaatake gamit ang malisyosong mga kahilingan ng authorization na may crafted redirect URI
- **Authorization Code Theft**: Maaaring sanhi ng existing consent cookies ang pag-skip ng authorization servers sa consent screens, na nagre-redirect ng mga code sa mga endpoint na kontrolado ng umaatake  
- **Unauthorized API Access**: Ang mga ninakaw na authorization code ay nagpapahintulot ng token exchange at pagpapanggap sa user nang walang explicit na pahintulot

#### **Mitigation Strategies**

**Mandatory Controls:**
- **Explicit Consent Requirements**: Ang mga MCP proxy server na gumagamit ng static client IDs **DAPAT** humingi ng pahintulot ng user para sa bawat dynamic na nairehistrong client
- **OAuth 2.1 Security Implementation**: Sundin ang kasalukuyang mga best practice ng OAuth security kabilang ang PKCE (Proof Key for Code Exchange) para sa lahat ng kahilingan ng authorization
- **Strict Client Validation**: Ipatupad ang mahigpit na validation ng redirect URIs at client identifiers upang maiwasan ang pagsasamantala

### Token Passthrough Vulnerabilities  

Ang **token passthrough** ay kumakatawan sa isang tahasang anti-pattern kung saan ang mga MCP server ay tumatanggap ng client tokens nang walang wastong validation at ipinapasa ito sa downstream APIs, na lumalabag sa mga espesipikasyon ng MCP authorization.

#### **Security Implications**

- **Control Circumvention**: Direktang paggamit ng token mula client papuntang API na nilalampasan ang mahahalagang control tulad ng rate limiting, validation, at monitoring
- **Audit Trail Corruption**: Ang mga token na inisyu ng upstream ay nagpapahirap sa pagkilala ng client, na sumisira sa kakayahan sa pag-iimbestiga
- **Proxy-based Data Exfiltration**: Pinahihintulutan ng mga unvalidated token ang mga malisyosong aktor na gamitin ang mga server bilang proxy para sa hindi awtorisadong pag-access sa datos
- **Trust Boundary Violations**: Maaaring malabag ang mga palagay sa tiwala ng downstream services kapag hindi makumpirma ang pinanggalingan ng token
- **Multi-service Attack Expansion**: Ang mga kompromisadong token na tinatanggap sa maraming serbisyo ay nagpapahintulot ng lateral movement

#### **Required Security Controls**

**Non-negotiable Requirements:**
- **Token Validation**: Ang mga MCP server **HINDI DAPAT** tumanggap ng mga token na hindi sadyang inisyu para sa MCP server
- **Audience Verification**: Laging i-validate ang audience claims ng token na tumutugma sa pagkakakilanlan ng MCP server
- **Proper Token Lifecycle**: Magpatupad ng short-lived access tokens na may secure rotation practices


## Supply Chain Security for AI Systems

Ang seguridad ng supply chain ay umunlad lampas sa tradisyonal na mga software dependency upang saklawin ang buong AI ecosystem. Dapat na higpitan ng mga modernong MCP implementation ang pag-verify at pagmamanman ng lahat ng AI-related na bahagi, dahil bawat isa ay nagdadala ng posibleng mga kahinaan na maaaring makompromiso ang integridad ng sistema.

### Expanded AI Supply Chain Components

**Traditional Software Dependencies:**
- Mga open-source na library at framework
- Mga container image at base system  
- Mga development tools at build pipelines
- Mga infrastructure component at serbisyo

**AI-Specific Supply Chain Elements:**
- **Foundation Models**: Mga pre-trained na modelo mula sa iba't ibang provider na nangangailangan ng verification ng origen
- **Embedding Services**: Mga panlabas na serbisyo ng vectorization at semantic search
- **Context Providers**: Mga pinagkukunan ng datos, knowledge bases, at mga repositoryo ng dokumento  
- **Third-party APIs**: Mga panlabas na AI services, ML pipelines, at mga endpoint ng data processing
- **Model Artifacts**: Mga timbang, configuration, at fine-tuned model variants
- **Training Data Sources**: Mga datasets na ginamit para sa pagsasanay at fine-tuning ng modelo

### Comprehensive Supply Chain Security Strategy

#### **Component Verification & Trust**
- **Provenance Validation**: Patunayan ang pinagmulan, lisensiya, at integridad ng lahat ng AI components bago isama
- **Security Assessment**: Magsagawa ng vulnerability scans at security reviews para sa mga modelo, pinagkukunan ng datos, at AI services
- **Reputation Analysis**: Tasahin ang security track record at mga gawi ng mga provider ng AI service
- **Compliance Verification**: Siguraduhin na ang lahat ng bahagi ay sumusunod sa mga pangangailangan ng seguridad at regulasyon ng organisasyon

#### **Secure Deployment Pipelines**  
- **Automated CI/CD Security**: Isama ang security scanning sa buong automated deployment pipelines
- **Artifact Integrity**: Magpatupad ng cryptographic verification para sa lahat ng deployed artifacts (code, modelo, configuration)
- **Staged Deployment**: Gamitin ang progressive deployment strategies na may security validation sa bawat stage
- **Trusted Artifact Repositories**: Mag-deploy lamang mula sa mga verified at secure na artifact registries at repositories

#### **Continuous Monitoring & Response**
- **Dependency Scanning**: Patuloy na pagmamanman ng mga vulnerability ng lahat ng software at AI component dependencies
- **Model Monitoring**: Walang tigil na pagsusuri sa behavior ng modelo, performance drift, at security anomalies
- **Service Health Tracking**: Subaybayan ang panlabas na AI services para sa availability, mga security incident, at pagbabago sa patakaran
- **Threat Intelligence Integration**: Isama ang mga threat feed na tukoy sa AI at ML security risks

#### **Access Control & Least Privilege**
- **Component-level Permissions**: Limitahan ang access sa mga modelo, datos, at serbisyo batay sa pangangailangan ng negosyo
- **Service Account Management**: Magpatupad ng dedikadong mga service account na may pinakamababang kinakailangang permiso
- **Network Segmentation**: Ihiwalay ang mga AI component at limitahan ang network access sa pagitan ng mga serbisyo
- **API Gateway Controls**: Gumamit ng sentralisadong API gateways para kontrolin at subaybayan ang access sa panlabas na AI services

#### **Incident Response & Recovery**
- **Rapid Response Procedures**: Nakapirming mga proseso para sa pag-patch o pagpapalit ng kompromisadong AI components
- **Credential Rotation**: Automated na sistema para sa pag-ikot ng mga sikreto, API key, at mga credentials ng serbisyo
- **Rollback Capabilities**: Kakayahang mabilis na bumalik sa mga dating kilalang magandang bersyon ng AI components
- **Supply Chain Breach Recovery**: Espesipikong mga proseso para sa pagtugon sa mga kompromiso sa upstream AI services

### Microsoft Security Tools & Integration

Nagbibigay ang **GitHub Advanced Security** ng komprehensibong proteksyon sa supply chain kabilang ang:
- **Secret Scanning**: Automated na pagtuklas ng mga credentials, API keys, at token sa mga repository
- **Dependency Scanning**: Pagsusuri ng vulnerability para sa mga open-source dependencies at libraries
- **CodeQL Analysis**: Static code analysis para sa mga security vulnerability at isyu sa coding
- **Supply Chain Insights**: Visibility sa kalusugan at status ng seguridad ng dependencies

**Azure DevOps & Azure Repos Integration:**
- Seamless na integrasyon ng security scanning sa mga Microsoft development platform
- Automated na mga security check sa Azure Pipelines para sa mga AI workload
- Pagpapatupad ng polisiya para sa secure na deployment ng AI components

**Microsoft Internal Practices:**
Malawak na ipinatutupad ng Microsoft ang mga security practice sa supply chain sa lahat ng produkto. Alamin ang mga napatunayang pamamaraan sa [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Foundation Security Best Practices

Nangangahulugan ang mga MCP implementation ng pag-angkla at pagpapaunlad sa umiiral na security posture ng iyong organisasyon. Ang pagpapalakas sa mga pundamental na gawi sa seguridad ay lubos na nagpapahusay sa kabuuang seguridad ng mga AI system at mga deployment ng MCP.

### Core Security Fundamentals

#### **Secure Development Practices**
- **OWASP Compliance**: Proteksyon laban sa [OWASP Top 10](https://owasp.org/www-project-top-ten/) na mga kahinaan sa web application
- **AI-Specific Protections**: Ipatupad ang mga control para sa [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Secure Secrets Management**: Gumamit ng dedikadong vault para sa mga token, API key, at sensitibong configuration data
- **End-to-End Encryption**: Ipatupad ang ligtas na komunikasyon sa lahat ng bahagi ng application at daloy ng datos
- **Input Validation**: Mahigpit na pagsusuri ng lahat ng input ng user, API parameter, at mga pinagkukunan ng datos

#### **Infrastructure Hardening**
- **Multi-Factor Authentication**: Mandatory ang MFA para sa lahat ng administrative at service account
- **Patch Management**: Automated at napapanahong patching para sa mga operating system, framework, at dependencies  
- **Identity Provider Integration**: Sentralisadong identity management sa pamamagitan ng enterprise identity providers (Microsoft Entra ID, Active Directory)
- **Network Segmentation**: Lohikal na paghihiwalay ng mga MCP component upang limitahan ang potensyal ng lateral movement
- **Principle of Least Privilege**: Pinakamababang kinakailangang permiso para sa lahat ng bahagi ng sistema at account

#### **Security Monitoring & Detection**
- **Comprehensive Logging**: Detalyadong pag-log ng mga aktibidad ng AI application, kabilang ang interaction ng MCP client-server
- **SIEM Integration**: Sentralisadong security information at event management para sa anomaly detection
- **Behavioral Analytics**: AI-powered monitoring upang matukoy ang mga hindi pangkaraniwang pattern ng sistema at gawi ng user
- **Threat Intelligence**: Integrasyon ng mga panlabas na threat feed at indicators of compromise (IOCs)
- **Incident Response**: Malinaw na mga proseso para sa pagtuklas, pagtugon, at pag-recover sa mga security incident

#### **Zero Trust Architecture**
- **Never Trust, Always Verify**: Patuloy na beripikasyon ng mga user, device, at koneksyon sa network
- **Micro-Segmentation**: Granular na control sa network na naghihiwalay sa mga indibidwal na workload at serbisyo
- **Identity-Centric Security**: Mga polisiya sa seguridad na nakabatay sa beripikadong pagkakakilanlan kaysa sa lokasyon ng network
- **Continuous Risk Assessment**: Dinamikong pagsusuri ng security posture base sa kasalukuyang konteksto at gawi
- **Conditional Access**: Mga control sa access na nag-aangkop base sa risk factors, lokasyon, at tiwala sa device

### Enterprise Integration Patterns

#### **Microsoft Security Ecosystem Integration**
- **Microsoft Defender for Cloud**: Komprehensibong cloud security posture management
- **Azure Sentinel**: Cloud-native SIEM at SOAR na kakayahan para sa proteksyon ng AI workload
- **Microsoft Entra ID**: Enterprise identity at access management na may conditional access policies
- **Azure Key Vault**: Sentralisadong secrets management na may hardware security module (HSM) support
- **Microsoft Purview**: Data governance at pagsunod para sa mga pinagkukunan ng datos at workflows ng AI

#### **Compliance & Governance**
- **Regulatory Alignment**: Siguraduhin na ang mga MCP implementation ay sumusunod sa mga industry-specific na regulasyon (GDPR, HIPAA, SOC 2)
- **Data Classification**: Tamang pagkakategorya at paghawak ng sensitibong datos na pinoproseso ng mga AI system
- **Audit Trails**: Komprehensibong pag-log para sa pagsunod sa regulasyon at forensic investigation
- **Privacy Controls**: Pagpapatupad ng privacy-by-design na mga prinsipyo sa arkitektura ng AI system
- **Change Management**: Pormal na mga proseso para sa mga security review ng mga pagbabago sa AI system

Ang mga pundamental na gawi na ito ay lumilikha ng matibay na baseline sa seguridad na nagpapahusay sa bisa ng MCP-specific na mga kontrol sa seguridad at nagbibigay ng komprehensibong proteksyon para sa mga AI-driven na aplikasyon.

## Key Security Takeaways
- **Layered Security Approach**: Pagsamahin ang mga pangunahing kasanayan sa seguridad (secure coding, least privilege, supply chain verification, continuous monitoring) kasama ang mga AI-specific control para sa komprehensibong proteksyon

- **AI-Specific Threat Landscape**: Ang mga MCP system ay nahaharap sa mga natatanging panganib kabilang ang prompt injection, tool poisoning, session hijacking, confused deputy problems, token passthrough vulnerabilities, at labis na mga permiso na nangangailangan ng espesyal na mga mitigasyon

- **Authentication & Authorization Excellence**: Magpatupad ng matibay na authentication gamit ang mga external identity provider (Microsoft Entra ID), ipatupad ang wastong token validation, at huwag kailanman tanggapin ang mga token na hindi tahasang inilabas para sa iyong MCP server

- **AI Attack Prevention**: Magdeploy ng Microsoft Prompt Shields at Azure Content Safety para ipagtanggol laban sa hindi direktang prompt injection at tool poisoning attacks, habang sinusuri ang tool metadata at mino-monitor ang mga dynamic na pagbabago

- **Session & Transport Security**: Gumamit ng cryptographically secure, non-deterministic session IDs na naka-bind sa mga user identity, ipatupad ang tamang session lifecycle management, at huwag kailanman gamitin ang mga session para sa authentication

- **OAuth Security Best Practices**: Iwasan ang confused deputy attacks sa pamamagitan ng tahasang user consent para sa mga dynamically registered clients, wastong implementasyon ng OAuth 2.1 gamit ang PKCE, at mahigpit na redirect URI validation  

- **Token Security Principles**: Iwasan ang mga token passthrough anti-patterns, suriin ang token audience claims, magpatupad ng short-lived tokens na may secure na rotation, at panatilihin ang malinaw na trust boundaries

- **Comprehensive Supply Chain Security**: Tratuhin ang lahat ng mga bahagi ng AI ecosystem (mga modelo, embeddings, context providers, external APIs) nang may parehong rigor sa seguridad tulad ng tradisyonal na mga software dependency

- **Continuous Evolution**: Manatiling napapanahon sa mabilis na pagbabago ng MCP specifications, mag-ambag sa mga pamantayan ng security community, at panatilihin ang adaptive security postures habang umuunlad ang protocol

- **Microsoft Security Integration**: Gamitin ang komprehensibong security ecosystem ng Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) para sa pinalakas na proteksyon ng MCP deployment

## Comprehensive Resources

### **Official MCP Security Documentation**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Security Resources**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komprehensibong OWASP MCP Top 10 na may gabay sa Azure implementation
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Opisyal na mga panganib sa seguridad ng OWASP MCP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on na pagsasanay sa seguridad para sa MCP sa Azure

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

Para sa komprehensibong gabay sa seguridad, sumangguni sa mga espesyal na dokumentong ito sa seksyong ito:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Kumpletong pinakamahusay na mga kasanayan sa seguridad para sa mga implementasyon ng MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktikal na mga halimbawa ng implementasyon para sa Azure Content Safety integration  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Pinakabagong mga kontrol sa seguridad at mga teknik para sa MCP deployments
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Mabilisang gabay para sa mahahalagang MCP security practices
- **[BlueHat 2026: Securing the future of AI: Securing MCP with defense in depth patterns](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Mga pattern ng defense-in-depth mula sa Microsoft Security Response Center (MSRC)

### **Hands-On Security Training**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komprehensibong hands-on workshop para sa pag-secure ng MCP servers sa Azure mula Base Camp hanggang Summit na progressive camps
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Reference architecture at gabay sa implementasyon para sa lahat ng OWASP MCP Top 10 risks

---

## What's Next

Next: [Chapter 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->