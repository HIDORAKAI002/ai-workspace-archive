# MCP Security: Komprehensibong Proteksyon para sa mga AI System

[![MCP Security Best Practices](../../../translated_images/tl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(I-click ang larawan sa itaas upang panoorin ang video ng araling ito)_

Ang seguridad ay pundamental sa disenyo ng AI system, kaya inuuna namin ito bilang aming pangalawang seksyon. Ito ay nakahanay sa prinsipyo ng Microsoft na **Secure by Design** mula sa [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Ang Model Context Protocol (MCP) ay nagdadala ng makapangyarihang bagong kakayahan sa mga AI-driven na aplikasyon habang nagpapakilala ng mga natatanging hamon sa seguridad na lampas sa tradisyonal na mga panganib ng software. Ang mga MCP system ay humaharap sa parehong mga establisadong alalahanin sa seguridad (secure coding, least privilege, supply chain security) at mga bagong AI-specific na banta kabilang ang prompt injection, tool poisoning, session hijacking, confused deputy attacks, token passthrough vulnerabilities, at dynamic capability modification.

Itinuturing ng araling ito ang mga pinaka-kritikal na panganib sa seguridad sa mga implementasyon ng MCP—na sumasaklaw sa authentication, authorization, sobra-sobrang permiso, indirectly na prompt injection, session security, mga problema sa confused deputy, pamamahala ng token, at mga kahinaan sa supply chain. Matututuhan mo ang mga maaaring gawin na kontrol at pinakamahusay na mga gawi upang mapagaan ang mga panganib na ito habang ginagamit ang mga solusyon ng Microsoft tulad ng Prompt Shields, Azure Content Safety, at GitHub Advanced Security upang palakasin ang iyong MCP deployment.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng araling ito, magagawa mong:

- **Kilalanin ang mga Espesipikong Banta sa MCP**: Makilala ang mga natatanging panganib sa seguridad sa mga MCP system kabilang ang prompt injection, tool poisoning, sobra-sobrang permiso, session hijacking, mga problema sa confused deputy, token passthrough vulnerabilities, at panganib sa supply chain
- **Ipatupad ang mga Kontrol sa Seguridad**: Magpatupad ng epektibong mga lunas kabilang ang matatag na authentication, access na least privilege, secure token management, session security controls, at supply chain verification
- **Gamitin ang mga Solusyon sa Seguridad ng Microsoft**: Maintindihan at mag-deploy ng Microsoft Prompt Shields, Azure Content Safety, at GitHub Advanced Security para sa proteksyon ng MCP workload
- **Patunayan ang Seguridad ng Mga Tool**: Kilalanin ang kahalagahan ng pag-validate ng metadata ng tool, pagmamanman para sa dynamic na pagbabago, at pagtatanggol laban sa indirect prompt injection attacks
- **Isama ang Pinakamahusay na Mga Gawi**: Pagsamahin ang mga matatag na pundasyon ng seguridad (secure coding, server hardening, zero trust) sa mga MCP-specific na kontrol para sa komprehensibong proteksyon

# MCP Security Architecture & Controls

Ang mga modernong implementasyon ng MCP ay nangangailangan ng layered na mga pamamaraan sa seguridad na tumutugon sa parehong tradisyonal na seguridad ng software at AI-specific na mga banta. Ang mabilis na pag-usbong ng MCP specification ay patuloy na pinahusay ang mga kontrol nito sa seguridad, na nagbibigay-daan sa mas mahusay na integrasyon sa mga arkitekturang pang-enterprise security at mga establisadong pinakamahusay na gawi.

Ipinapakita ng pananaliksik mula sa [Microsoft Digital Defense Report](https://aka.ms/mddr) na **98% ng mga naiulat na paglabag ay mapipigilan sa pamamagitan ng matatag na hygiene sa seguridad**. Ang pinakaepektibong estratehiya sa proteksyon ay pinaghalo ang mga pundasyong pamamaraan sa seguridad sa MCP-specific na mga kontrol—ang mga napatunayan nang baseline security measures ay nananatiling pinakakaapekto sa pagbawas ng pangkalahatang panganib sa seguridad.

## Kasalukuyang Kalagayan ng Seguridad

> **Note:** Ang impormasyong ito ay sumasalamin sa mga pamantayan sa seguridad ng MCP noong **Pebrero 5, 2026**, alinsunod sa **MCP Specification 2025-11-25**. Ang MCP protocol ay patuloy na mabilis ang pag-unlad, at ang mga susunod na implementasyon ay maaaring magpakilala ng mga bagong pattern ng authentication at pinasimpleng kontrol. Palaging sumangguni sa kasalukuyang [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol), at [security best practices documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) para sa pinakabagong gabay.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Para sa **hands-on na pagsasanay sa seguridad**, mariing inirerekomenda namin ang **MCP Security Summit Workshop** (Sherpa)—isang komprehensibong guided expedition sa pagseseguro ng MCP servers sa Microsoft Azure.

### Pangkalahatang-ideya ng Workshop

Ang [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) ay nagbibigay ng praktikal at actionable na pagsasanay sa seguridad sa pamamagitan ng napatunayang metodolohiyang "vulnerable → exploit → fix → validate." Gagawin mo ang mga sumusunod:

- **Matuto sa Pamamagitan ng Pagbasag ng Mga Bagay**: Maranasan ang mga kahinaan nang personal sa pamamagitan ng pag-eksployt ng mga sadyang insecure na mga server
- **Gamitin ang Azure-Native Security**: Samantalahin ang Azure Entra ID, Key Vault, API Management, at AI Content Safety
- **Sumunod sa Defense-in-Depth**: Umusad sa pamamagitan ng mga kampo na bumubuo ng komprehensibong mga layer ng seguridad
- **Ipatupad ang mga Pamantayan ng OWASP**: Bawat pamamaraan ay nakaugnay sa [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Makakuha ng Production Code**: Makalabas na may gumagana at nasubukang implementasyon

### Ang Ruta ng Ekspedisyon

| Camp | Fokus | Saklaw ng Mga Panganib ng OWASP |
|------|-------|-------------------------------|
| **Base Camp** | Mga pundasyon ng MCP at mga kahinaan sa authentication | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, pamamahala | MCP02, MCP07, MCP09 |
| **Camp 3: I/O Security** | Prompt injection, proteksyon ng PII, content safety | MCP03, MCP05, MCP06 |
| **Camp 4: Monitoring** | Log Analytics, dashboard, pagtuklas ng banta | MCP08 |
| **The Summit** | Red Team / Blue Team integration test | Lahat |

**Magsimula na**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Security Risks

Ang [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) ay detalyado ang sampung pinaka-kritikal na panganib sa seguridad para sa mga implementasyon ng MCP:

| Panganib | Paglalarawan | Mitigasyon sa Azure |
|------|-------------|------------------|
| **MCP01** | Maling Pamamahala ng Token at Paglalantad ng Sekreto | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalasyon ng Pribilehiyo sa Pamamagitan ng Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Pag-validate ng tool, pagsigurado ng integridad |
| **MCP04** | Atake sa Supply Chain | GitHub Advanced Security, pag-scan ng dependency |
| **MCP05** | Command Injection at Pagpapatupad | Pag-validate ng input, sandboxing |
| **MCP06** | Prompt Injection gamit ang Contextual Payloads | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Hindi Sapat na Authentication at Authorization | Azure Entra ID, OAuth 2.1 na may PKCE |
| **MCP08** | Kawalan ng Audit at Telemetry | Azure Monitor, Application Insights |
| **MCP09** | Shadow MCP Servers | Pamamahala ng API Center, network isolation |
| **MCP10** | Context Injection at Labis na Pagbabahagi | Pag-uri-uriin ang data, minimal na exposure |

### Ebolusyon ng MCP Authentication

Malaki ang ebolusyon ng MCP specification sa paraan ng authentication at authorization:

- **Orihinal na Paraan**: Noong una, inaatasang ang mga developer na gumawa ng custom authentication servers, kung saan ang MCP servers ay kumikilos bilang OAuth 2.0 Authorization Servers na direktang nagma-manage ng authentication ng user
- **Kasalukuyang Pamantayan (2025-11-25)**: Pinapayagan ng na-update na specification ang MCP servers na i-delegate ang authentication sa mga external identity providers (gaya ng Microsoft Entra ID), na nagpapabuti sa seguridad at nagpapadali sa implementasyon
- **Transport Layer Security**: Pinalakas na suporta para sa secure transport mechanisms gamit ang tamang mga authentication pattern para sa parehong local (STDIO) at remote (Streamable HTTP) na koneksyon

## Seguridad sa Authentication at Authorization

### Kasalukuyang mga Hamon sa Seguridad

Ang mga modernong implementasyon ng MCP ay humaharap sa ilang hamon sa authentication at authorization:

### Mga Panganib at Mga Vector ng Banta

- **Maling Pancoconfigure na Authorization Logic**: Maaaring magdulot ng paglalantad ng sensitibong data at maling pag-aaplay ng access control ang depektibong authorization ng MCP servers
- **Pagkumpromiso ng OAuth Token**: Ang pagnanakaw ng token ng lokal na MCP server ay nagbibigay pahintulot sa mga umaatake na magpanggap bilang server at ma-access ang mga downstream na serbisyo
- **Token Passthrough Vulnerabilities**: Ang maling paghawak ng token ay lumilikha ng bypass sa mga security control at mga puwang ng pananagutan
- **Sobra-sobrang Pahintulot**: Ang mga MCP server na may sobra-sobrang pribilehiyo ay lumalabag sa prinsipyo ng least privilege at nagpapalawak ng attack surface

#### Token Passthrough: Isang Kritikal na Anti-Pattern

**Ang token passthrough ay hayagang ipinagbabawal** sa kasalukuyang MCP authorization specification dahil sa malubhang implikasyon sa seguridad:

##### Pagsuway sa Kontrol ng Seguridad
- Nagpapatupad ang MCP servers at downstream APIs ng kritikal na mga security control (paghigpit sa rate, pag-validate ng request, pagmamanman ng trapiko) na nakasalalay sa tamang pag-validate ng token
- Direktang paggamit ng token mula kliyente papunta sa API ay nilalabag ang mga mahahalagang proteksyon na ito, na sumisira sa arkitekturang pangseguridad

##### Mga Hamon sa Pananagutan at Audit  
- Hindi matukoy ng MCP servers ang mga kliyente gamit ang mga token na inilabas ng upstream, kaya nababali ang mga audit trail
- Ipinapakita ng mga log ng downstream resource server ang maling pinanggalingan ng request sa halip na ang aktwal na MCP server na tagapamagitan
- Nagiging mas mahirap ang imbestigasyon ng insidente at pagsunod sa audit

##### Panganib sa Pag-exfiltrate ng Data
- Ang malisyosong paggamit ng mga hindi na-validate na token claims ay nagbibigay daan sa mga umaatake gamit ang ninakaw na token upang gamitin ang MCP servers bilang proxy para sa pag-exfiltrate ng data
- Nilalabag ang trust boundary na nagpapahintulot sa hindi awtorisadong pattern ng pag-access na nakakalagpas sa nilalayon na mga security control

##### Multi-Service Attack Vectors
- Pinapayagan ng mga kompromisadong token na tanggapin sa maraming serbisyo ang lateral movement sa mga konektadong sistema
- Maaaring masiraan ang mga trust assumption sa pagitan ng mga serbisyo kapag hindi makumpirma ang pinagmulan ng token

### Mga Kontrol sa Seguridad at Mga Lunas

**Kritikal na Mga Kinakailangan sa Seguridad:**

> **MANDATORY**: Ang mga MCP server **HINDI DAPAT** tumanggap ng anumang token na hindi hayagang inisyu para sa MCP server

#### Mga Kontrol sa Authentication at Authorization

- **Mahigpit na Pagsusuri sa Authorization**: Magsagawa ng komprehensibong audit sa authorization logic ng MCP server upang masiguro na tanging mga nilalayong user at kliyente lamang ang makaka-access sa sensitibong mga resource
  - **Gabay sa Implementasyon**: [Azure API Management bilang Authentication Gateway para sa mga MCP Server](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrasyon ng Identity**: [Paggamit ng Microsoft Entra ID para sa Authentication ng MCP Server](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Secure Token Management**: Ipatupad ang [token validation at lifecycle best practices ng Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - I-validate na ang mga token audience claims ay tumutugma sa identity ng MCP server
  - Magpatupad ng tamang token rotation at expiration policies
  - Iwasan ang token replay attacks at hindi awtorisadong paggamit

- **Protektadong Imbakan ng Token**: Siguraduhing naka-encrypt ang imbakan ng token kapwa sa pahinga at transit
  - **Pinakamahusay na Mga Gawi**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementasyon ng Access Control

- **Prinsipyo ng Least Privilege**: Bigyan ang mga MCP server ng pinakamaliit na pahintulot na kinakailangan para sa inaasahang functionality
  - Regular na pagsusuri at pag-update ng mga pahintulot upang maiwasan ang privilege creep
  - **Dokumentasyon ng Microsoft**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Magpatupad ng masusing role assignments
  - Higpitan ang saklaw ng mga role sa mga partikular na resource at aksyon
  - Iwasan ang malawak o hindi kinakailangang mga pahintulot na nagpapalawak ng attack surface

- **Patuloy na Pagmamanman ng Pahintulot**: Magpatupad ng tuloy-tuloy na access auditing at monitoring
  - Subaybayan ang mga pattern ng paggamit ng permiso para sa mga anomalya
  - Agarang lutasin ang sobra o hindi nagagamit na mga pribilehiyo

## Mga AI-Specific na Banta sa Seguridad

### Mga Pamamaraan sa Prompt Injection at Manipulasyon ng Tool

Ang mga modernong implementasyon ng MCP ay humaharap sa mga sopistikadong AI-specific na mga vector ng atake na hindi ganap na natutugunan ng mga tradisyonal na panukalang pangseguridad:

#### **Indirect Prompt Injection (Cross-Domain Prompt Injection)**

Ang **Indirect Prompt Injection** ay isa sa mga pinaka-kritikal na kahinaan sa MCP-enabled AI systems. Naglalagay ang mga umaatake ng malisyosong mga tagubilin sa loob ng panlabas na nilalaman—mga dokumento, web page, email, o mga pinagkukunan ng data—na pagkatapos ay pinoproseso ng mga AI system bilang mga lehitimong command.

**Mga Senaryo ng Atake:**
- **Document-based Injection**: Mga malisyosong tagubilin na nakatago sa mga pinoprosesong dokumento na nagdudulot ng hindi inaasahang mga aksyon ng AI
- **Pang-aabuso sa Web Content**: Mga kompromisadong web page na naglalaman ng naka-embed na prompts na nagmamaniobra sa kilos ng AI kapag kinuha
- **Pag-atake gamit ang Email**: Mga malisyosong prompt sa email na nag-uudyok sa mga AI assistant na magbunyag ng impormasyon o gumawa ng hindi awtorisadong mga aksyon
- **Kontaminasyon ng Pinagkukunan ng Data**: Mga kompormisadong database o API na nagsisilbing may dumi o mapanganib na nilalaman sa mga AI system

**Epekto sa Totoong Mundo**: Ang mga pag-atake na ito ay maaaring magdulot ng pag-exfiltrate ng data, paglabag sa privacy, pag-generate ng nakakasamang nilalaman, at manipulasyon ng pakikipag-ugnayan ng user. Para sa detalyadong pagsusuri, tingnan ang [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/tl/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning Attacks**

Ang **Tool Poisoning** ay inilalayon ang metadata na naglalarawan sa mga tool ng MCP, na sinasamantala kung paano ini-interpret ng mga LLM ang mga deskripsyon ng tool at mga parameter upang gumawa ng mga desisyon sa pagpapatakbo.

**Mga Mekanismo ng Atake:**
- **Pagmanipula ng Metadata**: Nag-iinject ang mga umaatake ng malisyosong mga tagubilin sa mga deskripsyon ng tool, mga depinisyon ng parameter, o mga halimbawa ng paggamit
- **Mga Nakikitang Tagubilin**: Mga nakatagong prompt sa tool metadata na pinoproseso ng mga modelo ng AI ngunit hindi nakikita ng mga tao
- **Dynamic Tool Modification ("Rug Pulls")**: Ang mga tool na inaprubahan ng user ay binabago kalaunan upang gumawa ng malisyosong aksyon nang walang kaalaman ng user
- **Parameter Injection**: Malisyosong nilalaman na nakapasok sa mga schema ng parameter ng tool na nakakaimpluwensya sa kilos ng modelo

**Panganib sa Hosted Server**: Ang mga remote MCP server ay may mas mataas na panganib dahil maaaring mabago ang mga depinisyon ng tool pagkatapos ng unang pag-apruba ng user, na lumilikha ng mga sitwasyon kung saan ang mga dati nang ligtas na tool ay nagiging malisyoso. Para sa komprehensibong pagsusuri, tingnan ang [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/tl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Karagdagang AI Attack Vectors**

- **Cross-Domain Prompt Injection (XPIA)**: Mga sopistikadong pag-atake na gumagamit ng nilalaman mula sa maraming domain upang malampasan ang mga security control
- **Pangunahing Pagbabago sa Kakayahan**: Mga palagiang pagbabago sa mga kakayahan ng tool na lumalampas sa paunang pagsusuri sa seguridad  
- **Pagkalason sa Context Window**: Mga pag-atake na nagpapalit ng malalaking context window upang itago ang masasamang tagubilin  
- **Mga Pag-atake sa Pagkalito ng Modelo**: Pagsasamantala sa mga limitasyon ng modelo upang lumikha ng hindi mahulaan o delikadong mga kilos  

### Epekto ng Panganib sa Seguridad ng AI

**Mga Mataas na Epekto na Resulta:**  
- **Pagkuha ng Data Nang Walang Pahintulot**: Hindi awtorisadong pag-access at pagnanakaw ng sensitibong datos ng negosyo o personal  
- **Pagsira sa Privacy**: Paglalantad ng personal na impormasyon (PII) at kumpidensyal na datos ng negosyo  
- **Manipulasyon ng Sistema**: Hindi sinasadyang pagbabago sa mga kritikal na sistema at mga workflow  
- **Pagnanakaw ng Kredensyal**: Kompromiso ng mga token ng pagpapatotoo at mga kredensyal ng serbisyo  
- **Lateral na Paggalaw**: Paggamit ng mga compromised AI system bilang mga pivot para sa mas malawak na pag-atake sa network  

### Mga Solusyong Pangseguridad ng Microsoft AI

#### **AI Prompt Shields: Advanced na Proteksyon Laban sa Injection Attacks**

Nagbibigay ang Microsoft **AI Prompt Shields** ng komprehensibong depensa laban sa parehong direktang at hindi direktang prompt injection attack sa pamamagitan ng maraming layer ng seguridad:

##### **Pangunahing Mekanismo ng Proteksyon:**

1. **Advanced na Pag-detect at Pagsasala**  
   - Gumagamit ng mga algorithm sa machine learning at NLP upang matukoy ang mga malisyosong tagubilin sa panlabas na nilalaman  
   - Real-time na pagsusuri ng mga dokumento, pahina sa web, email, at mga pinanggalingan ng datos para sa mga naka-embed na banta  
   - Kontekstwal na pagkaunawa ng legitimate kumpara sa malisyosong mga pattern ng prompt  

2. **Spotlighting Techniques**  
   - Nagpapahiwalay sa pagitan ng pinagkakatiwalaang mga tagubilin ng sistema at posibleng compromised na panlabas na input  
   - Mga pamamaraan ng pagbabago ng teksto na nagpapahusay sa kaugnayan ng modelo habang iniisolado ang malisyosong nilalaman  
   - Tinutulungan ang mga AI system na mapanatili ang wastong hierarchy ng mga tagubilin at balewalain ang mga injected na utos  

3. **Delimiter & Datamarking Systems**  
   - Malinaw na pagtatakda ng boundary sa pagitan ng pinagkakatiwalaang mga mensahe ng sistema at panlabas na input na teksto  
   - Espesyal na mga marker na nagtatampok ng hangganan sa pagitan ng pinagkakatiwalaan at hindi pinagkakatiwalaang mga pinanggalingan ng datos  
   - Malinaw na paghihiwalay upang maiwasan ang kalituhan sa mga tagubilin at hindi awtorisadong pagpapatupad ng utos  

4. **Patuloy na Threat Intelligence**  
   - Patuloy na binabantayan ng Microsoft ang mga umuusbong na pattern ng pag-atake at ina-update ang mga depensa  
   - Proaktibong threat hunting para sa mga bagong injection technique at attack vector  
   - Regular na pag-update ng security model upang mapanatili ang bisa laban sa nagbabagong mga banta  

5. **Pagsasama ng Azure Content Safety**  
   - Bahagi ng komprehensibong Azure AI Content Safety suite  
   - Karagdagang pagtuklas para sa mga pagtatangkang jailbreak, mapanganib na nilalaman, at paglabag sa mga patakaran sa seguridad  
   - Nagkakaisang mga kontrol sa seguridad sa lahat ng bahagi ng AI application  

**Mga Mapagkukunan ng Implementasyon**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/tl/prompt-shield.ff5b95be76e9c78c.webp)


## Mga Advanced na Banta sa Seguridad ng MCP

### Mga Kahinaan sa Session Hijacking

Ang **session hijacking** ay isang kritikal na vector ng pag-atake sa mga stateful MCP implementation kung saan nakakakuha at inaabuso ng hindi awtorisadong mga partido ang mga lehitimong session identifier upang magpanggap bilang mga kliyente at magsagawa ng mga hindi awtorisadong aksyon.

#### **Mga Senaryo ng Pag-atake at Panganib**

- **Session Hijack Prompt Injection**: Ang mga attacker na may ninakaw na session ID ay nag-iinject ng malisyosong mga event sa mga server na nagbabahagi ng session state, na maaaring mag-trigger ng masamang aksyon o makakuha ng sensitibong datos  
- **Direktang Pagpapanggap**: Ang ninakaw na session ID ay nagpapahintulot sa direktang pagtawag sa MCP server na nilalaktawan ang authentication, tinatrato ang mga attacker bilang mga lehitimong user  
- **Compromised Resumable Streams**: Maaaring tapusin ng mga attacker ang mga request nang maaga, na nagdudulot sa mga lehitimong kliyente na mag-resume gamit ang posibleng malisyosong nilalaman  

#### **Mga Kontrol sa Seguridad para sa Pamamahala ng Session**

**Kritikal na Mga Kinakailangan:**  
- **Pag-verify ng Awtorisasyon**: Ang mga MCP server na nagpapatupad ng awtorisasyon **DAPAT** i-verify ang LAHAT ng papasok na request at **HINDI DAPAT** umasa sa session para sa authentication  
- **Ligtas na Pagbuo ng Session**: Gumamit ng cryptographically secure, non-deterministic na mga session ID na ginawa gamit ang secure random number generators  
- **Pagtatali sa User-Specific**: Itali ang session ID sa impormasyong partikular sa user gamit ang format tulad ng `<user_id>:<session_id>` upang maiwasan ang pag-abuso sa cross-user session  
- **Pamamahala ng Lifecycle ng Session**: Ipatupad ang tamang expiration, rotation, at invalidation upang limitahan ang mga bintana ng kahinaan  
- **Seguridad sa Transportasyon**: Mandatoryong HTTPS para sa lahat ng komunikasyon upang maiwasan ang interception ng session ID  

### Problema ng Confused Deputy

Nangyayari ang **confused deputy problem** kapag ang MCP server ay kumikilos bilang authentication proxy sa pagitan ng mga kliyente at third-party services, na nagbubukas ng mga pagkakataon para sa pag-bypass ng awtorisasyon sa pamamagitan ng static na client ID exploitation.

#### **Mekanismo ng Pag-atake at Mga Panganib**

- **Cookie-based Consent Bypass**: Ang dating user authentication ay lumilikha ng consent cookies na ginagamit ng mga attacker sa mga malisyosong authorization request na may crafted redirect URIs  
- **Pagnanakaw ng Authorization Code**: Ang mga umiiral na consent cookies ay maaaring magdulot sa mga authorization server na laktawan ang mga consent screen, na nagre-redirect ng mga code sa mga endpoint na kontrolado ng attacker  
- **Hindi Awtorisadong Access sa API**: Ang ninakaw na mga authorization code ay nagpapahintulot ng token exchange at pagpapanggap ng user nang walang malinaw na pagsang-ayon  

#### **Mga Diskarte sa Pagsugpo**

**Mga Mandatoryong Kontrol:**  
- **Malinaw na Mga Kinakailangan sa Pagsang-ayon**: Ang mga MCP proxy server na gumagamit ng static na client ID **DAPAT** kumuha ng pagsang-ayon ng user para sa bawat dynamically registered client  
- **Pagsunod sa Seguridad ng OAuth 2.1**: Sundin ang kasalukuyang pinakamahusay na kasanayan sa seguridad ng OAuth kasama ang PKCE (Proof Key for Code Exchange) para sa lahat ng authorization request  
- **Mahigpit na Pag-validate ng Client**: Ipatupad ang mahigpit na pag-validate ng redirect URIs at mga client identifier upang maiwasan ang pagsasamantala  

### Mga Kahinaan sa Token Passthrough  

Ang **token passthrough** ay isang tahasang anti-pattern kung saan tinatanggap ng mga MCP server ang mga client token nang walang tamang pag-validate at ipinapasa ang mga ito sa downstream APIs, na lumalabag sa mga pagtutukoy ng MCP authorization.

#### **Mga Implikasyon sa Seguridad**

- **Circumvention ng Kontrol**: Ang direktang paggamit ng client-to-API token ay nilalaktawan ang mga mahahalagang rate limiting, validation, at monitoring na kontrol  
- **Nasirang Audit Trail**: Ang mga token na inisyu upstream ay nagpapahirap sa pagkakakilanlan ng client, na pumipinsala sa kakayahan sa pagsisiyasat ng insidente  
- **Proxy-based Data Exfiltration**: Pinapayagan ng hindi validated na mga token ang mga malisyosong aktor na gamitin ang mga server bilang proxy para sa hindi awtorisadong pag-access ng data  
- **Paglabag sa Trust Boundary**: Ang mga downstream service ay maaaring malabag ang mga palagay ng tiwala kapag hindi makumpirma ang pinanggalingan ng token  
- **Pagpapalawak ng Multi-service Attack**: Ang mga compromised token na tinatanggap sa maraming serbisyo ay nagpapahintulot ng lateral movement  

#### **Mga Kinakailangang Kontrol sa Seguridad**

**Hindi Mapag-uusapan na Mga Kinakailangan:**  
- **Pag-validate ng Token**: ANG MCP server **HINDI DAPAT** tumanggap ng mga token na hindi tahasang inisyu para sa MCP server  
- **Pag-verify ng Audience**: Laging i-validate ang audience claim ng token na tumutugma sa pagkakakilanlan ng MCP server  
- **Tamang Lifecycle ng Token**: Magpatupad ng short-lived access tokens na may ligtas na mga kasanayan sa pag-ikot  

## Seguridad ng Supply Chain para sa mga Sistema ng AI

Ang seguridad ng supply chain ay umunlad lampas sa tradisyunal na mga dependency ng software upang saklawin ang buong AI ecosystem. Ang mga modernong MCP implementation ay kailangang mahigpit na mag-verify at mag-monitor ng lahat ng sangkap na may kinalaman sa AI, dahil ang bawat isa ay nagdadala ng potensyal na kahinaan na maaaring maka-kompromiso ng integridad ng sistema.

### Pinalawak na Mga Sangkap ng AI Supply Chain

**Tradisyunal na Dependency ng Software:**  
- Mga open-source library at frameworks  
- Container images at base systems  
- Mga development tools at build pipelines  
- Mga komponent ng imprastraktura at serbisyo  

**Mga Sangkap na Espesipiko sa AI Supply Chain:**  
- **Foundation Models**: Mga pre-trained na modelo mula sa iba't ibang provider na kailangang patunayan ang pinagmulan  
- **Embedding Services**: Mga panlabas na vectorization at semantic search na serbisyo  
- **Context Providers**: Mga pinanggagalingan ng datos, knowledge bases, at document repositories  
- **Third-party APIs**: Mga panlabas na AI service, ML pipeline, at mga endpoint para sa proseso ng datos  
- **Model Artifacts**: Mga bigat, configuration, at fine-tuned na variantes ng modelo  
- **Training Data Sources**: Mga dataset para sa pagsasanay at fine-tuning ng mga modelo  

### Komprehensibong Estratehiya sa Seguridad ng Supply Chain

#### **Pag-verify at Pagtitiwala sa Mga Sangkap**  
- **Pag-validate ng Pinagmulan**: Suriin ang pinagmulan, lisensya, at integridad ng lahat ng AI components bago ang integrasyon  
- **Pagsusuri sa Seguridad**: Magsagawa ng vulnerability scan at security review sa mga modelo, pinanggagalingan ng data, at AI service  
- **Pagsusuri ng Reputasyon**: Suriin ang track record ng seguridad at mga kasanayan ng AI service provider  
- **Pag-verify ng Pagsunod**: Tiyakin na ang lahat ng sangkap ay tumutugon sa mga organisasyonal na pangangailangan sa seguridad at regulasyon  

#### **Secure Deployment Pipelines**  
- **Automated CI/CD Security**: Isama ang security scanning sa buong automated deployment pipeline  
- **Integridad ng Artifact**: Magpatupad ng cryptographic verification para sa lahat ng deployed artifact (code, modelo, configuration)  
- **Staged Deployment**: Gumamit ng progressive deployment strategies na may security validation sa bawat yugto  
- **Trusted Artifact Repositories**: Mag-deploy lamang mula sa verified at secure na artifact registry at repository  

#### **Patuloy na Monitoring at Pagsagot**  
- **Dependency Scanning**: Patuloy na pag-monitor ng vulnerabilities sa lahat ng software at AI component dependencies  
- **Model Monitoring**: Patuloy na pagsusuri ng gawi ng modelo, performance drift, at security anomalies  
- **Pagsubaybay sa Kalusugan ng Serbisyo**: Monitor ang availability, security incidents, at mga pagbabago sa polisiya sa mga panlabas na AI service  
- **Pag-integrate ng Threat Intelligence**: Isama ang mga threat feed na nakatuon sa AI at ML security risks  

#### **Access Control at Prinsipyo ng Pinakamababang Pribilehiyo**  
- **Mga Pahintulot sa Antas ng Komponent**: Limitahan ang access sa modelo, data, at serbisyo batay sa pangangailangang pang-negosyo  
- **Pamamahala sa Service Account**: Magpatupad ng dedikadong service account na may pangunahing kinakailangang mga pahintulot  
- **Network Segmentation**: Ihiwalay ang mga AI components at limitahan ang network access sa pagitan ng mga serbisyo  
- **Kontrol sa API Gateway**: Gumamit ng sentralisadong API gateway para kontrolin at i-monitor ang access sa panlabas na AI service  

#### **Pagsagot sa Insidente at Pagpapanumbalik**  
- **Mabilis na Proseso ng Pagsagot**: Itinatag na mga proseso para sa patching o pagpapalit ng mga compromised na AI components  
- **Pag-ikot ng Kredensyal**: Automated na sistema para sa pag-ikot ng mga lihim, API key, at service credential  
- **Kakayahan sa Rollback**: Kakayahang mabilis na i-revert sa mga nakaraang kilalang maayos na bersyon ng AI components  
- **Pagsagot sa Paglabag sa Supply Chain**: Mga tiyak na proseso para sa pagsagot sa mga kompromiso sa upstream AI service  

### Mga Tool at Pagsasama ng Seguridad ng Microsoft

Nagbibigay ang **GitHub Advanced Security** ng komprehensibong proteksyon sa supply chain kabilang ang:  
- **Secret Scanning**: Automated na pagtuklas ng mga kredensyal, API key, at token sa mga repositoryo  
- **Dependency Scanning**: Pagsusuri sa mga kahinaan ng open-source na dependency at mga library  
- **CodeQL Analysis**: Static code analysis para sa mga security vulnerability at isyu sa coding  
- **Supply Chain Insights**: Pagbibigay-liwanag sa kalusugan at status ng seguridad ng dependency  

**Pagsasama ng Azure DevOps at Azure Repos:**  
- Seamless na integration ng security scanning sa mga Microsoft development platform  
- Automated na security check sa Azure Pipelines para sa AI workload  
- Enforcement ng polisiya para sa secure na deployment ng AI components  

**Mga Panloob na Praktis ng Microsoft:**  
Mahigpit na ipinatutupad ng Microsoft ang mga kasanayan sa seguridad ng supply chain sa lahat ng produkto. Alamin ang mga napatunayang pamamaraan sa [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Mga Pinakamahusay na Praktis sa Foundation Security

Namamana at pinapanday ng mga MCP implementation ang umiiral nang postura sa seguridad ng inyong organisasyon. Ang pagpapalakas sa mga pundamental na gawi sa seguridad ay lubos na nagpapahusay sa pangkalahatang seguridad ng mga AI system at deployment ng MCP.

### Mga Pundamental na Seguridad

#### **Ligtas na Mga Praktis sa Pag-unlad**  
- **Pagsunod sa OWASP**: Protektahan laban sa [OWASP Top 10](https://owasp.org/www-project-top-ten/) na mga kahinaan ng web application  
- **Proteksyon Espesipiko sa AI**: Magpatupad ng mga kontrol para sa [OWASP Top 10 para sa LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Secure Secrets Management**: Gumamit ng dedikadong vault para sa mga token, API key, at sensitibong configuration data  
- **End-to-End Encryption**: Magpatupad ng secure na komunikasyon sa lahat ng bahagi ng application at daloy ng datos  
- **Input Validation**: Mahigpit na pag-validate ng lahat ng user input, parameter ng API, at pinanggagalingan ng datos  

#### **Pagpapalakas ng Inprastruktura**  
- **Multi-Factor Authentication**: Mandatoryong MFA para sa lahat ng administrative at service account  
- **Patch Management**: Automated at napapanahong pag-patch para sa operating systems, framework, at dependency  
- **Integrasyon ng Identity Provider**: Sentralisadong pamamahala ng pagkakakilanlan sa pamamagitan ng enterprise identity provider (Microsoft Entra ID, Active Directory)  
- **Network Segmentation**: Lohikal na paghiwalay ng mga MCP components upang limitahan ang lateral movement  
- **Prinsipyo ng Pinakamababang Pribilehiyo**: Minimal na kinakailangang pahintulot para sa lahat ng sistema at mga account  

#### **Pagsubaybay at Pagtukoy ng Seguridad**  
- **Komprehensibong Logging**: Detalyadong pag-log ng mga aktibidad ng AI application, kabilang ang pakikipag-ugnayan ng MCP client-server  
- **SIEM Integration**: Sentralisadong security information at event management para sa pagtuklas ng anomalya  
- **Behavioral Analytics**: AI-powered na monitoring para matukoy ang kakaibang pattern sa sistema at kilos ng user  
- **Threat Intelligence**: Pagsasama ng panlabas na threat feed at indicator ng compromise (IOC)  
- **Pagsagot sa Insidente**: Mahusay na mga prosedur para sa pagtukoy, pagsagot, at pagpapanumbalik mula sa security incident  

#### **Zero Trust Architecture**  
- **Huwag Magtiwala, Laging Mag-verify**: Patuloy na pag-verify sa mga user, device, at koneksyon sa network  
- **Micro-Segmentation**: Granular na kontrol sa network na naghihiwalay sa bawat workload at serbisyo  
- **Identity-Centric Security**: Mga polisiya sa seguridad batay sa na-verify na pagkakakilanlan kaysa sa lokasyon ng network  
- **Patuloy na Pagtatasa ng Panganib**: Dinamikong ebalwasyon ng postura sa seguridad batay sa kasalukuyang konteksto at gawi  
- **Conditional Access**: Mga kontrol sa access na nag-aangkop base sa risk factors, lokasyon, at tiwala sa device  

### Mga Pattern ng Enterprise Integration

#### **Pagsasama sa Ecosystem ng Seguridad ng Microsoft**  
- **Microsoft Defender for Cloud**: Komprehensibong cloud security posture management  
- **Azure Sentinel**: Cloud-native SIEM at SOAR para sa proteksyon ng AI workload  
- **Microsoft Entra ID**: Enterprise identity at access management na may conditional access policy  
- **Azure Key Vault**: Sentralisadong pamamahala ng mga lihim na suportado ng hardware security module (HSM)  
- **Microsoft Purview**: Data governance at pagsunod para sa AI data sources at workflows  

#### **Pagsunod at Pamamahala**  
- **Pag-align sa Regulasyon**: Tiyakin na ang mga MCP implementation ay sumusunod sa industriya at regulasyon (GDPR, HIPAA, SOC 2)  
- **Data Classification**: Tamang pagkakategorya at pamamahala ng sensitibong data na pinoproseso ng AI systems  
- **Audit Trails**: Komprehensibong pag-log para sa pagsunod sa regulasyon at forensic na pagsisiyasat  
- **Privacy Controls**: Pagpapatupad ng privacy-by-design na mga prinsipyo sa arkitektura ng AI system  
- **Change Management**: Pormal na proseso para sa pagsusuri ng seguridad sa mga pagbabago sa AI system  

Ang mga pundamental na praktikang ito ay lumilikha ng matibay na baseline ng seguridad na nagpapahusay sa bisa ng mga espisipikong kontrol sa seguridad ng MCP at nagbibigay ng komprehensibong proteksyon para sa mga AI-driven na aplikasyon.
## Key Security Takeaways

- **Layered Security Approach**: Pagsamahin ang mga pangunahing gawi sa seguridad (secure coding, least privilege, supply chain verification, continuous monitoring) kasama ang mga kontrol na partikular sa AI para sa komprehensibong proteksyon

- **AI-Specific Threat Landscape**: Ang mga MCP system ay humaharap sa mga natatanging panganib kabilang ang prompt injection, tool poisoning, session hijacking, confused deputy problems, token passthrough vulnerabilities, at labis na mga permiso na nangangailangan ng mga espesyal na mitigasyon

- **Authentication & Authorization Excellence**: Magpatupad ng matibay na authentication gamit ang panlabas na identity providers (Microsoft Entra ID), ipatupad ang wastong token validation, at huwag kailanman tanggapin ang mga token na hindi tahasang inilabas para sa iyong MCP server

- **AI Attack Prevention**: I-deploy ang Microsoft Prompt Shields at Azure Content Safety upang ipagtanggol laban sa mga indirect prompt injection at tool poisoning na mga pag-atake, habang sinusuri ang tool metadata at minomonitor ang mga dynamic na pagbabago

- **Session & Transport Security**: Gumamit ng cryptographically secure, non-deterministic session IDs na naka-bind sa user identities, ipatupad ang wastong session lifecycle management, at huwag kailanman gamitin ang mga session para sa authentication

- **OAuth Security Best Practices**: Pigilan ang mga confused deputy attack sa pamamagitan ng tahasang pahintulot ng user para sa mga dynamically registered clients, tamang implementasyon ng OAuth 2.1 gamit ang PKCE, at mahigpit na validation ng redirect URI  

- **Token Security Principles**: Iwasan ang token passthrough anti-patterns, suriin ang token audience claims, ipatupad ang mga short-lived token na may secure rotation, at panatilihin ang malinaw na trust boundaries

- **Comprehensive Supply Chain Security**: Tratuhin ang lahat ng bahagi ng AI ecosystem (mga modelo, embeddings, context providers, external APIs) na may parehong tindi ng seguridad tulad ng tradisyonal na mga software dependency

- **Continuous Evolution**: Manatiling napapanahon sa mabilis na pagbabago ng MCP specifications, mag-ambag sa mga security community standards, at panatilihin ang adaptive security postures habang umuunlad ang protocol

- **Microsoft Security Integration**: Samantalahin ang komprehensibong security ecosystem ng Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) para sa pinahusay na proteksyon ng MCP deployment

## Comprehensive Resources

### **Official MCP Security Documentation**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Security Resources**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komprehensibong OWASP MCP Top 10 na may gabay sa implementasyon sa Azure
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

Para sa komprehensibong gabay sa seguridad, sumangguni sa mga dalubhasang dokumento sa seksyong ito:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Kumpletong mga pinakamahusay na gawi sa seguridad para sa mga implementasyon ng MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktikal na mga halimbawa ng implementasyon para sa pagsasama ng Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Pinakabagong mga kontrol at teknik sa seguridad para sa MCP deployments
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Mabilisang gabay sa mahahalagang kasanayan sa seguridad ng MCP

### **Hands-On Security Training**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komprehensibong hands-on workshop para sa pagsesecure ng MCP servers sa Azure mula Base Camp hanggang Summit na may progressive na mga kampo
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Reference architecture at gabay sa implementasyon para sa lahat ng OWASP MCP Top 10 risks

---

## What's Next

Next: [Chapter 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paalala**:  
Ang dokumentong ito ay isinalin gamit ang AI translation service na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagaman nagsusumikap kami para sa katumpakan, pakatandaan na maaaring may mga pagkakamali o hindi pagkakatugma sa mga awtomatikong salin. Ang orihinal na dokumento sa kanyang sariling wika ang dapat ituring na pangunahing pinagkukunan. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling pagpapakahulugan na maaaring magmula sa paggamit ng salin na ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->