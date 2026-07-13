# Seguridad ng MCP: Komprehensibong Proteksyon para sa mga Sistema ng AI

[![MCP Security Best Practices](../../../translated_images/tl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(I-click ang larawan sa itaas upang panoorin ang video ng araling ito)_

Ang seguridad ay pundamental sa disenyo ng sistema ng AI, kaya pinapahalagahan namin ito bilang aming pangalawang seksyon. Ito ay alinsunod sa prinsipyo ng Microsoft na **Secure by Design** mula sa [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Ang Model Context Protocol (MCP) ay nagdadala ng makapangyarihang bagong kakayahan sa mga aplikasyon na pinapatakbo ng AI habang ipinakikilala ang mga natatanging hamon sa seguridad na lagpas sa tradisyunal na panganib ng software. Ang mga sistema ng MCP ay humaharap sa parehong mga nakagawian nang isyu sa seguridad (secure coding, least privilege, seguridad ng supply chain) pati na rin sa mga bagong banta na partikular sa AI kabilang ang prompt injection, tool poisoning, session hijacking, confused deputy attacks, mga kahinaan sa token passthrough, at dynamic na pagbabago ng kakayahan.

Tinutuklas ng araling ito ang pinaka-krusyal na mga panganib sa seguridad sa mga implementasyon ng MCP—saklaw ang authentication, authorization, labis na pahintulot, indirect prompt injection, seguridad ng session, confused deputy problems, pamamahala ng token, at mga kahinaan sa supply chain. Matututuhan mo ang mga maipapatupad na kontrol at pinakamahusay na mga praktis upang mapagaan ang mga panganib na ito habang ginagamit ang mga solusyon ng Microsoft tulad ng Prompt Shields, Azure Content Safety, at GitHub Advanced Security upang palakasin ang iyong MCP deployment.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng araling ito, magagawa mong:

- **Kilalanin ang mga Banta na Espesipiko sa MCP**: Tukuyin ang mga natatanging panganib sa seguridad sa mga sistema ng MCP kabilang ang prompt injection, tool poisoning, labis na pahintulot, session hijacking, confused deputy problems, mga kahinaan sa token passthrough, at mga panganib sa supply chain
- **Ipatupad ang mga Kontrol sa Seguridad**: Maglagay ng mabisang mitigations kabilang ang matatag na authentication, least privilege access, secure token management, session security controls, at pagsusuri ng supply chain
- **Gamitin ang mga Solusyon sa Seguridad ng Microsoft**: Unawain at gamitin ang Microsoft Prompt Shields, Azure Content Safety, at GitHub Advanced Security para sa proteksyon ng MCP workload
- **Patunayan ang Seguridad ng Tool**: Kilalanin ang kahalagahan ng pag-validate ng metadata ng tool, pagmamanman sa mga dynamic na pagbabago, at pagtatanggol laban sa indirect prompt injection attacks
- **Isama ang Pinakamahusay na mga Praktis**: Pagsamahin ang mga nakagawiang pundasyon ng seguridad (secure coding, server hardening, zero trust) kasama ang mga kumpol ng MCP-specific controls para sa komprehensibong proteksyon

# Arkitektura at Mga Kontrol ng Seguridad ng MCP

Nangangailangan ang mga modernong implementasyon ng MCP ng laplayer na mga pamamaraan sa seguridad na sumasaklaw sa parehong tradisyunal na seguridad ng software at mga banta partikular sa AI. Patuloy na umuunlad ang MCP specification sa pagpapahusay ng mga kontrol sa seguridad, na nagpapahintulot ng mas maayos na integrasyon sa mga arkitekturang pangseguridad ng enterprise at mga nakagawiang pinakamahusay na praktis.

Ipinapakita ng pananaliksik mula sa [Microsoft Digital Defense Report](https://aka.ms/mddr) na **98% ng mga naiulat na paglabag ay maiiwasan sa pamamagitan ng masiglang hygiene sa seguridad**. Ang pinakaepektibong estratehiya sa proteksyon ay pinagsasama ang mga pundasyong gawi sa seguridad at specific controls ng MCP—ang mga patunay na baseline na hakbang sa seguridad ay nananatiling pinaka-maalab sa pagbawas ng pangkalahatang panganib sa seguridad.

## Kasalukuyang Kalakaran ng Seguridad

> **Tandaan:** Ang impormasyong ito ay sumasalamin sa mga pamantayan sa seguridad ng MCP noong **Pebrero 5, 2026**, kaugnay ng **MCP Specification 2025-11-25**. Patuloy ang mabilis na pag-unlad ng protocol ng MCP, at ang mga susunod na implementasyon ay maaaring magpakilala ng mga bagong pattern ng authentication at pinahusay na mga kontrol. Laging sumangguni sa kasalukuyang [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol), at [security best practices documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) para sa pinakabagong gabay.

> **Paghahandang Tumingin sa Hinaharap:** pinatatag ng `2026-07-28` release candidate ang authorization — kailangang patunayan ng mga kliyente ang `iss` parameter sa mga authorization responses (RFC 9207), ideklara ang OpenID Connect `application_type` sa panahon ng Dynamic Client Registration, at itali ang mga rehistradong kredensyal sa nag-isyu na authorization server. Tingnan ang [What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para sa buong listahan ng authorization SEPs.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Para sa **hands-on na pagsasanay sa seguridad**, lubos naming inirerekomenda ang **MCP Security Summit Workshop** (Sherpa) - isang komprehensibong ginabayan na ekspedisyon sa pag-secure ng mga MCP server sa Microsoft Azure.

### Pangkalahatang-ideya ng Workshop

Ang [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) ay nagbibigay ng praktikal at maipapatupad na pagsasanay sa seguridad sa pamamagitan ng napatunayang metodolohiyang "vulnerable → exploit → fix → validate". Ikaw ay:

- **Matuto sa Pamamagitan ng Pagbali**: Maranasan ang mga kahinaan sa seguridad sa pamamagitan ng pagsasamantala ng sadyang di-secure na mga server
- **Gamitin ang Azure-Native Security**: Samantalahin ang Azure Entra ID, Key Vault, API Management, at AI Content Safety
- **Sundin ang Defense-in-Depth**: Isagawa ang mga hakbang upang bumuo ng komprehensibong mga layer ng seguridad
- **Ipatupad ang Mga Pamantayan ng OWASP**: Ang bawat teknik ay nagmamapa sa [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Kumuha ng Production Code**: Umalis na may gumagana at nasubok na mga implementasyon

### Ruta ng Ekspedisyon

| Kampo | Pokus | Mga Saklaw ng Panganib ng OWASP |
|------|-------|---------------------|
| **Base Camp** | Mga pundasyon ng MCP at mga kahinaan sa authentication | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, pamamahala | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3: I/O Security** | Prompt injection, proteksyon ng PII, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4: Monitoring** | Log Analytics, dashboards, pagtuklas ng banta | MCP04, MCP08 |
| **The Summit** | Red Team / Blue Team integration test | Lahat |

**Simulan Na**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Pangunahing 10 Panganib sa Seguridad ng OWASP MCP

Ang [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) ay nagdedetalye ng sampung pinaka-krusyal na panganib sa seguridad para sa mga implementasyong MCP:

| Panganib | Paglalarawan | Pagsugpo sa Azure |
|------|-------------|------------------|
| **MCP01** | Maling Pamamahala ng Token & Paglalantad ng Mga Lihim | Azure Key Vault, Managed Identity |
| **MCP02** | Pagsusulong ng Pribilehiyo sa Pamamagitan ng Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Pag-validate ng tool, beripikasyon ng integridad |
| **MCP04** | Mga Atake sa Software Supply Chain & Dependency Tampering | GitHub Advanced Security, dependency scanning |
| **MCP05** | Command Injection & Execution | Pag-validate ng input, sandboxing |
| **MCP06** | Intent Flow Subversion | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Hindi Sapat na Authentication & Authorization | Azure Entra ID, OAuth 2.1 na may PKCE |
| **MCP08** | Kawalan ng Audit at Telemetry | Azure Monitor, Application Insights |
| **MCP09** | Shadow MCP Servers | Pamamahala sa API Center, paghihiwalay ng network |
| **MCP10** | Context Injection & Labis na Pagbabahagi | Klasipikasyon ng data, minimal na exposyur |

### Pag-unlad ng Authentication ng MCP

Lubos na umunlad ang MCP specification sa paraan ng authentication at authorization:

- **Orihinal na Paraan**: Kinailangan sa mga maagang specification na magpatupad ng mga custom na authentication server ang mga developer, na ang mga MCP server ang kumilos bilang OAuth 2.0 Authorization Servers na direktang nangangalaga ng user authentication
- **Kasalukuyang Pamantayan (2025-11-25)**: Ang na-update na specification ay nagpapahintulot sa mga MCP server na i-delegate ang authentication sa mga panlabas na identity provider (tulad ng Microsoft Entra ID), na nagpapabuti sa posture ng seguridad at nagpapababa ng kompleksidad ng implementasyon
- **Transport Layer Security**: Pinahusay na suporta para sa mga secure na transport mechanism na may tamang mga authentication pattern para sa parehong lokal (STDIO) at remote (Streamable HTTP) na koneksyon

## Seguridad sa Authentication at Authorization

### Mga Hamon sa Seguridad sa Kasalukuyan

Ang mga modernong implementasyon ng MCP ay humaharap sa ilang mga hamon sa authentication at authorization:

### Mga Panganib at Vector ng Banta

- **Maling Pagkakaayos ng Logic ng Authorization**: Ang baluktot na implementasyon ng authorization sa mga MCP server ay maaaring maglantad ng sensitibong data at maling paglalapat ng mga kontrol sa access
- **Kompromisong OAuth Token**: Ang pagnanakaw ng token mula sa lokal na MCP server ay nagbibigay-daan sa mga attacker na magpanggap bilang server at makakuha ng access sa downstream services
- **Mga Kahinaan sa Token Passthrough**: Ang maling paghawak ng token ay lumilikha ng mga bypass sa kontrol sa seguridad at puwang sa pananagutan
- **Labis na Pahintulot**: Ang sobrang pribilehiyo ng mga MCP server ay lumalabag sa prinsipyo ng least privilege at pinalalawak ang mga attack surface

#### Token Passthrough: Isang Kritikal na Anti-Pattern

**Ang token passthrough ay tahasang ipinagbabawal** sa kasalukuyang specification ng MCP authorization dahil sa matinding epekto sa seguridad:

##### Pagsalungat sa Mga Kontrol sa Seguridad
- Nagpapatupad ang mga MCP server at downstream API ng mahahalagang kontrol sa seguridad (rate limiting, pag-validate ng request, pagmamanman ng trapiko) na nakasalalay sa wastong pag-validate ng token
- Ang direktang paggamit ng token mula sa client papuntang API ay nagpapalampas sa mga mahahalagang proteksyon na ito, na sumisira sa arkitekturang pangseguridad

##### Mga Hamon sa Pananagutan at Audit  
- Hindi kayang tukuyin ng mga MCP server ang pagitan ng mga client na gumagamit ng mga token na inisyu sa itaas, na nagpapasira sa audit trails
- Ipinapakita ng mga log ng downstream resource server ang mga maling pinagmulan ng request sa halip na ang aktwal na mga MCP server intermediary
- Ang pagsisiyasat ng insidente at pag-audit para sa pagsunod ay nagiging mas mahirap nang malaki

##### Panganib ng Data Exfiltration
- Pinapayagan ng hindi na-validate na mga claim ng token ang mga malisyosong aktor na may mga ninakaw na token na gamitin ang mga MCP server bilang mga proxy para sa pagkuha ng data
- Ang mga paglabag sa trust boundary ay nagpapahintulot sa mga hindi awtorisadong pattern ng pag-access na pumapalya sa mga nakatakdang kontrol sa seguridad

##### Mga Vector ng Atake sa Maramihang Serbisyo
- Ang mga kompromisadong token na tinatanggap ng maraming serbisyo ay nagbibigay-daan sa lateral movement sa mga konektadong sistema
- Maaaring masira ang mga palagay ng pagtitiwala sa pagitan ng mga serbisyo kapag hindi maberipika ang pinagmulan ng token

### Mga Kontrol at Mitigasyon sa Seguridad

**Kritikal na Mga Pangangailangan sa Seguridad:**

> **MANDATORY**: Ang mga MCP server **HINDI DAPAT** tumanggap ng anumang token na hindi tahasang inisyu para sa MCP server

#### Mga Kontrol sa Authentication at Authorization

- **Masusing Pagsusuri sa Authorization**: Isagawa ang komprehensibong audit ng logic ng authorization ng MCP server upang matiyak na tanging ang mga nilalayong user at client lamang ang makakas access sa sensitibong resources
  - **Gabay sa Implementasyon**: [Azure API Management bilang Authentication Gateway para sa mga MCP Server](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integrasyon ng Identity**: [Paggamit ng Microsoft Entra ID para sa Authentication ng MCP Server](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Secure Token Management**: Ipatupad ang [mga pinakamahusay na praktis sa token validation at lifecycle ng Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Patunayan na tumutugma ang mga claim ng audience ng token sa pagkakakilanlan ng MCP server
  - Ipatupad ang wastong token rotation at mga polisiya ng expiration
  - Pigilan ang mga atake sa replay ng token at hindi awtorisadong paggamit

- **Protektadong Imbakan ng Token**: Siguraduhing naka-encrypt ang imbakan ng token sa pareho, at sa rest at sa transit
  - **Pinakamahusay na mga Praktis**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementasyon ng Access Control

- **Prinsipyo ng Least Privilege**: Bigyan ang mga MCP server ng tanging mga pinakamababang pahintulot na kinakailangan para sa nilalayong functionality
  - Regular na pagsuri at pag-update ng mga pahintulot upang maiwasan ang privilege creep
  - **Dokumentasyon ng Microsoft**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Ipatupad ang mga maselan na asignasyon ng papel
  - I-limitang maigi ang mga papel sa mga tiyak na resources at aksyon
  - Iwasan ang malawak o hindi kinakailangang mga pahintulot na nagpapalawak ng mga attack surface

- **Tuloy-tuloy na Pagmamanman ng Pahintulot**: Ipatupad ang tuloy-tuloy na pag-audit at pagmamanman ng access
  - Bantayan ang mga pattern ng paggamit ng pahintulot para sa mga anomalya
  - Agarang ayusin ang labis o hindi nagagamit na mga pribilehiyo

## Mga Espesipikong Banta sa Seguridad ng AI

### Mga Atake sa Prompt Injection at Pagsasamantala sa Tool

Ang mga modernong implementasyon ng MCP ay humaharap sa masalimuot na mga vector ng AI-specific na pag-atake na hindi ganap na natutugunan ng mga tradisyunal na pamamaraan sa seguridad:

#### **Indirect Prompt Injection (Cross-Domain Prompt Injection)**

Ang **Indirect Prompt Injection** ay isa sa pinaka-krusyal na kahinaan sa mga sistemang pinalalakas ng MCP na AI. Isinusulat ng mga attacker ang malisyosong mga tagubilin sa panlabas na nilalaman—mga dokumento, mga web page, email, o mga pinagkukunan ng data—na pagkatapos ay pinoproseso ng mga sistema ng AI bilang lehitimong mga utos.

**Mga Senaryo ng Atake:**
- **Injection batay sa Dokumento**: Mga malisyosong tagubilin na nakatago sa mga pinoprosesong dokumento na nagdudulot ng hindi inaasahang aksyon ng AI
- **Pagsasamantala sa Nilalaman ng Web**: Mga nabiktima na mga web page na naglalaman ng mga naka-embed na prompt na nililinang ang AI kapag kinuha
- **Mga Atakeng Batay sa Email**: Malisyosong prompt sa mga email na nagpapasabog ng impormasyon o nagdudulot ng hindi awtorisadong aksyon mula sa mga AI assistant
- **Kontaminasyon ng Pinagkukunan ng Data**: Mga naapektuhang database o API na naghahatid ng kontaminadong nilalaman sa mga sistema ng AI

**Tunay na Epekto sa Mundo**: Maaaring magresulta ang mga atakeng ito sa pagkuha ng data, paglabag sa privacy, pagbuo ng nakakapinsalang nilalaman, at pagmamanipula sa interaksyon ng user. Para sa detalyadong pagsusuri, tingnan ang [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/tl/prompt-injection.ed9fbfde297ca877.webp)

#### **Mga Atake sa Tool Poisoning**

Ang **Tool Poisoning** ay tumatarget sa metadata na naglalarawan sa mga tool ng MCP, na sinasamantala kung paano binibigyang-kahulugan ng LLMs ang mga deskripsyon ng tool at mga parameter upang gumawa ng mga desisyon sa pagpapatupad.

**Mga Mekanismo ng Atake:**
- **Manipulasyon ng Metadata**: Ang mga attacker ay nag-iinject ng malisyosong mga tagubilin sa mga deskripsyon ng tool, definisyon ng parameter, o mga halimbawa ng paggamit
- **Hindi Nakikitang Mga Tagubilin**: Mga nakatagong prompt sa tool metadata na pinoproseso ng mga modelo ng AI ngunit hindi nakikita ng mga tao
- **Dynamic na Pagbabago ng Tool ("Rug Pulls")**: Ang mga tool na inaprubahan ng mga user ay binabago sa kalaunan upang magsagawa ng malisyosong aksyon nang walang kaalaman ng user
- **Parameter Injection**: Malisyosong nilalaman na naka-embed sa mga schema ng parameter ng tool na nakakaapekto sa ugali ng modelo


**Mga Panganib ng Hosted Server**: Ang mga remote na MCP server ay nagdudulot ng mas mataas na panganib dahil ang mga depinisyon ng tool ay maaaring ma-update pagkatapos ng unang pag-apruba ng user, na lumilikha ng mga senaryo kung saan ang mga dating ligtas na tool ay nagiging malisyoso. Para sa komprehensibong pagsusuri, tingnan ang [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/tl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Karagdagang AI Attack Vectors**

- **Cross-Domain Prompt Injection (XPIA)**: Mga sopistikadong atake na nagpapakinabang sa nilalaman mula sa iba't ibang domain upang lampasan ang mga kontrol sa seguridad
- **Dynamic Capability Modification**: Mga pagbabagong real-time sa mga kakayahan ng tool na nakakaiwas sa unang mga pagsusuri ng seguridad
- **Context Window Poisoning**: Mga atake na nagmamanipula ng malalawak na context windows upang itago ang malisyosong mga instruksyon
- **Model Confusion Attacks**: Pagsasamantala sa mga limitasyon ng modelo upang lumikha ng hindi mahalagang o hindi ligtas na mga pag-uugali


### Epekto ng Panganib sa Seguridad ng AI

**Mataas na Epekto ng Mga Resulta:**
- **Data Exfiltration**: Hindi awtorisadong pag-access at pagnanakaw ng sensitibong data ng kumpanya o personal na impormasyon
- **Mga Paglabag sa Privacy**: Paglalantad ng personal na makikilalang impormasyon (PII) at kumpidensyal na data ng negosyo  
- **Manipulasyon ng Sistema**: Hindi inaasahang pagbabago sa mga kritikal na sistema at workflows
- **Pagnanakaw ng Credential**: Pagsira sa mga authentication token at kredensyal ng serbisyo
- **Lateral Movement**: Paggamit sa mga nahawang AI system bilang pivot para sa mas malawak na mga network na atake

### Mga Solusyon ng Microsoft para sa Seguridad ng AI

#### **AI Prompt Shields: Advanced na Proteksyon Laban sa Injection Attacks**

Nagbibigay ang Microsoft **AI Prompt Shields** ng komprehensibong depensa laban sa parehong direktang at hindi direktang prompt injection attacks sa pamamagitan ng maraming mga layer ng seguridad:

##### **Mga Pangunahing Mekanismo ng Proteksyon:**

1. **Advanced Detection & Filtering**
   - Mga algorithm ng machine learning at mga teknik sa NLP na nakaka-detect ng malisyosong instruksyon sa panlabas na nilalaman
   - Real-time na pagsusuri ng mga dokumento, web pages, email, at mga pinagkukunan ng data para sa nakatagong mga banta
   - Kontekstwal na pag-unawa ng mga lehitimong kumpara sa malisyosong pattern ng prompt

2. **Spotlighting Techniques**  
   - Nakikilala ang pagkakaiba sa pagitan ng mga pinagkakatiwalaang instruksyon ng sistema at posibleng kompromisadong panlabas na input
   - Mga paraan ng pagbabago ng teksto na nagpapahusay sa kaugnayan sa modelo habang inihiwalay ang malisyosong nilalaman
   - Tinutulungan ang mga AI system na panatilihin ang wastong hierarchy ng instruksyon at balewalain ang mga iniksiyong utos

3. **Delimiter & Datamarking Systems**
   - Eksaktong pagtukoy ng hangganan sa pagitan ng mga pinagkakatiwalaang mensahe ng sistema at panlabas na teksto ng input
   - Espesyal na mga marker na nagha-highlight ng mga hangganan sa pagitan ng pinagkakatiwalaan at hindi pinagkakatiwalaang mga pinagkukunan ng data
   - Malinaw na paghihiwalay upang maiwasan ang kalituhan sa instruksyon at hindi awtorisadong pagpapatupad ng mga utos

4. **Continuous Threat Intelligence**
   - Patuloy na minomonitor ng Microsoft ang mga lumalabas na pattern ng atake at ina-update ang mga depensa
   - Proaktibong panghuhuli ng banta para sa mga bagong teknik sa injection at mga attack vector
   - Regular na pag-update ng security models upang mapanatili ang pagiging epektibo laban sa mga nagbabagong banta

5. **Azure Content Safety Integration**
   - Bahagi ng komprehensibong Azure AI Content Safety suite
   - Karagdagang pagtuklas para sa mga jailbreak attempt, mapaminsalang nilalaman, at mga paglabag sa security policy
   - Pinagbubuong mga kontrol sa seguridad sa lahat ng bahagi ng AI application

**Mga Mapagkukunan sa Implementasyon**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/tl/prompt-shield.ff5b95be76e9c78c.webp)


## Mga Advanced na Banta sa Seguridad ng MCP

### Mga Kahinaan sa Session Hijacking

Ang **session hijacking** ay isang kritikal na attack vector sa mga stateful na implementasyon ng MCP kung saan ang mga hindi awtorisadong partido ay nakakakuha at inaabuso ang mga lehitimong session identifier upang magpanggap na mga kliyente at magsagawa ng hindi awtorisadong mga aksyon.

#### **Mga Senaryo ng Atake at Mga Panganib**

- **Session Hijack Prompt Injection**: Ang mga ataker na may nanakaw na session ID ay nag-i-inject ng malisyosong mga pangyayari sa mga server na nagbabahagi ng session state, na posibleng mag-trigger ng mapanganib na mga aksyon o maka-access ng sensitibong data
- **Direktang Pang-aapaw**: Ang mga nanakaw na session ID ay nagpapahintulot ng direktang tawag sa MCP server na nilalaktawan ang authentication, tinatrato ang mga ataker bilang lehitimong mga gumagamit
- **Komprontadong Resumable Streams**: Maaaring putulin ng mga ataker ang mga kahilingan nang maaga, na nagiging sanhi ng pag-resume ng mga lehitimong kliyente na may posibleng malisyosong nilalaman

#### **Mga Kontrol sa Seguridad para sa Pamamahala ng Session**

**Kritikal na Mga Kinakailangan:**
- **Pagpapatunay ng Awtorisasyon**: Ang mga MCP server na nagpapasakatuparan ng awtorisasyon **DAPAT** patunayan ANG LAHAT ng mga papasok na kahilingan at **HINDI DAPAT** umasa sa mga session para sa authentication
- **Secure Session Generation**: Gumamit ng cryptographically secure, non-deterministic na mga session ID na ginawa gamit ang mga secure na random number generator
- **User-Specific Binding**: Itali ang mga session ID sa user-specific na impormasyon gamit ang mga format gaya ng `<user_id>:<session_id>` upang maiwasan ang pang-aabusong cross-user session
- **Pamamahala ng Lifecycle ng Session**: Ipatupad ang wastong expiration, rotation, at invalidation upang limitahan ang mga window ng kahinaan
- **Seguridad ng Transportasyon**: Mandatoryong HTTPS para sa lahat ng komunikasyon upang maiwasan ang interception ng session ID

### Problema sa Confused Deputy

Nagaganap ang **confused deputy problem** kapag ang mga MCP server ay kumikilos bilang authentication proxy sa pagitan ng mga kliyente at third-party na mga serbisyo, na lumilikha ng pagkakataon para sa bypass ng awtorisasyon sa pamamagitan ng static client ID exploitation.

#### **Mechanics ng Atake at Mga Panganib**

- **Cookie-based Consent Bypass**: Ang naunang user authentication ay lumilikha ng consent cookies na pinagsasamantalahan ng mga ataker sa pamamagitan ng malisyosong mga kahilingan sa awtorisasyon gamit ang crafted redirect URIs
- **Pagnanakaw ng Authorization Code**: Ang umiiral na consent cookies ay maaaring magdulot na laktawan ng mga authorization server ang consent screens, na nireredirect ang mga code sa mga endpoint na kontrolado ng ataker  
- **Hindi Awtorisadong Access sa API**: Ang mga nanakaw na authorization code ay nagpapahintulot ng palitan ng token at pagpapanggap na user nang walang tahasang pag-apruba

#### **Mga Estratehiya ng Pag-iwas**

**Mandatoryong Mga Kontrol:**
- **Espesipikong Mga Kinakailangan sa Pahintulot**: Ang mga MCP proxy server na gumagamit ng static client ID **DAPAT** kumuha ng pahintulot ng user para sa bawat dynamically registered client
- **Pagpapatupad ng Seguridad sa OAuth 2.1**: Sundin ang kasalukuyang pinakamahusay na kasanayan sa seguridad ng OAuth kabilang ang PKCE (Proof Key for Code Exchange) para sa lahat ng mga kahilingan sa awtorisasyon
- **Mahigpit na Pagpapatunay ng Kliyente**: Ipatupad ang mahigpit na pagpapatunay ng mga redirect URI at client identifier upang maiwasan ang pagsasamantala

### Mga Kahinaan sa Token Passthrough  

Ang **token passthrough** ay isang tahasang anti-pattern kung saan ang mga MCP server ay tumatanggap ng mga token ng kliyente nang walang wastong pagpapatunay at ipinapasa ang mga ito sa mga downstream API, na lumalabag sa mga pagtutukoy ng MCP authorization.

#### **Mga Implikasyon sa Seguridad**

- **Pag-iwas sa Kontrol**: Ang direktang paggamit ng client-to-API token ay nilalaktawan ang mga kritikal na rate limiting, validation, at monitoring control
- **Korapsyon ng Audit Trail**: Ang mga token na inilabas upstream ay nagpapahirap sa pagkilala ng kliyente, na lumalabag sa kakayahan para sa pagsisiyasat ng insidente
- **Data Exfiltration na may Proxy**: Ang mga hindi napatunayang token ay nagpapahintulot sa mga malisyosong aktor na gamitin ang mga server bilang proxy para sa hindi awtorisadong pag-access ng data
- **Paglabag sa Trust Boundary**: Maaaring malabag ang mga pananaw sa tiwala ng mga downstream na serbisyo kapag hindi mapatunayan ang pinagmulan ng token
- **Paglawak ng Atake sa Maramihang Serbisyo**: Ang mga kompromisadong token na tinatanggap sa maraming serbisyo ay nagpapahintulot ng lateral movement

#### **Kinakailangang Mga Kontrol sa Seguridad**

**Hindi Mapag-uusapang Kinakailangan:**
- **Token Validation**: Ang mga MCP server ay **HINDI DAPAT** tumanggap ng mga token na hindi tahasang inilabas para sa MCP server
- **Audience Verification**: Palaging patunayan kung ang mga audience claim ng token ay tumutugma sa pagkakakilanlan ng MCP server
- **Wastong Lifecycle ng Token**: Ipatupad ang mga panandaliang access token na may ligtas na mga gawi sa pag-ikot


## Seguridad sa Supply Chain para sa mga AI System

Ang seguridad sa supply chain ay umunlad lampas sa tradisyunal na software dependencies upang masaklaw ang buong AI ecosystem. Ang mga modernong implementasyon ng MCP ay kailangang mahigpit na mag-verify at mag-monitor ng lahat ng mga komponenteng may kinalaman sa AI, dahil bawat isa ay nagdadala ng posibleng kahinaan na maaaring makompromiso ang integridad ng sistema.

### Pinalawak na Mga Komponent ng AI Supply Chain

**Tradisyunal na Software Dependencies:**
- Mga open-source na library at framework
- Mga container image at base system  
- Mga development tool at build pipeline
- Mga componente ng imprastruktura at serbisyo

**Mga Elemento ng Supply Chain na Tukoy sa AI:**
- **Foundation Models**: Mga pre-trained na modelo mula sa iba't ibang provider na nangangailangan ng verification ng pinagmulan
- **Embedding Services**: Panlabas na mga serbisyo para sa vectorization at semantic search
- **Context Providers**: Mga pinagmumulan ng data, knowledge base, at repositoryo ng dokumento  
- **Third-party APIs**: Panlabas na AI services, ML pipelines, at mga endpoint ng pagproseso ng data
- **Model Artifacts**: Timbang, mga configuration, at fine-tuned na mga variant ng modelo
- **Pinagmulan ng Training Data**: Mga dataset na ginamit para sa pagsasanay ng modelo at fine-tuning

### Komprehensibong Estratehiya ng Seguridad sa Supply Chain

#### **Pag-verify ng Komponent at Pagtitiwala**
- **Pagpapatunay ng Pinagmulan**: Patunayan ang pinagmulan, lisensya, at integridad ng lahat ng AI component bago ang integrasyon
- **Pagsusuri sa Seguridad**: Magsagawa ng vulnerability scan at security review para sa mga modelo, pinagmumulan ng data, at mga serbisyo ng AI
- **Pagsusuri ng Reputasyon**: Suriin ang track record sa seguridad at mga praktis ng mga provider ng serbisyo ng AI
- **Pagpapatunay ng Kompiyansa**: Tiyakin na lahat ng components ay pumasa sa mga kinakailangan sa seguridad at regulasyon ng organisasyon

#### **Secure Deployment Pipelines**  
- **Automated CI/CD Security**: Isama ang security scanning sa buong automated deployment pipelines
- **Integridad ng Artifacts**: Ipatupad ang cryptographic verification para sa lahat ng inilulunsad na artifacts (code, models, configurations)
- **Staged Deployment**: Gumamit ng progresibong deployment strategy na may security validation sa bawat yugto
- **Trusted Artifact Repositories**: Mag-deploy lamang mula sa mga napatunayang secure artifact registry at repositoryo

#### **Patuloy na Pagmo-monitor at Pagtugon**
- **Dependency Scanning**: Tuluy-tuloy na pagmo-monitor ng kahinaan para sa lahat ng software at AI component dependencies
- **Model Monitoring**: Patuloy na pagsusuri ng pag-uugali ng modelo, paglipat ng performance, at mga anomalya sa seguridad
- **Pagsubaybay sa Kalusugan ng Serbisyo**: I-monitor ang availability, mga insidente ng seguridad, at pagbabago sa polisiya ng mga panlabas na serbisyo ng AI
- **Pag-integrate ng Threat Intelligence**: Isama ang mga threat feeds na partikular sa AI at ML security risks

#### **Kontrol sa Access at Least Privilege**
- **Mga Pahintulot sa Antas ng Komponent**: Limitahan ang access sa mga modelo, data, at serbisyo base sa kinakailangang negosyo
- **Pamamahala ng Service Account**: Ipatupad ang dedikadong mga service account na may pinakamababang kinakailangang pahintulot
- **Segmentation ng Network**: Ihiwalay ang mga AI component at limitahan ang network access sa pagitan ng mga serbisyo
- **Mga Kontrol sa API Gateway**: Gumamit ng sentralisadong API gateways upang kontrolin at i-monitor ang access sa mga panlabas na serbisyo ng AI

#### **Pagtugon sa Insidente at Pagbawi**
- **Mga Mabilis na Proseso ng Pagtugon**: Itinatag na mga proseso para sa pag-patch o pagpapalit ng mga kompromisadong AI component
- **Pag-ikot ng Credential**: Automated na mga sistema para sa pag-ikot ng mga sikreto, API key, at kredensyal ng serbisyo
- **Kakayahang Magbalik sa Nakaraang Bersyon**: Kakayahang mabilis na bumalik sa mga dating kilalang maayos na bersyon ng AI component
- **Pagbawi mula sa Supply Chain Breach**: Tiyak na mga pamamaraan para sa pagtugon sa mga kompromiso sa upstream na AI serbisyo

### Mga Tool at Integrasyon ng Seguridad ng Microsoft

Nagbibigay ang **GitHub Advanced Security** ng komprehensibong proteksyon sa supply chain kabilang ang:
- **Secret Scanning**: Automated na pagtuklas ng mga kredensyal, API key, at token sa mga repositoryo
- **Dependency Scanning**: Pagsusuri ng kahinaan para sa mga open-source dependency at libro
- **CodeQL Analysis**: Static code analysis para sa mga kahinaan sa seguridad at mga isyu sa pag-code
- **Supply Chain Insights**: Visibility sa kalusugan at estado ng seguridad ng mga dependency

**Integrasyon ng Azure DevOps at Azure Repos:**
- Seamless na integrasyon ng security scanning sa mga platform ng Microsoft development
- Automated na security check sa Azure Pipelines para sa mga AI workload
- Pagpapatupad ng polisiya para sa ligtas na deployment ng mga AI component

**Mga Panloob na Praktis ng Microsoft:**
Nagpapatupad ang Microsoft ng malawak na mga praktis sa seguridad ng supply chain sa lahat ng produkto. Matuto tungkol sa mga napatunayang pamamaraan sa [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Mga Pinakamahusay na Praktis para sa Foundation Security

Namamana at pinapahusay ng mga implementasyon ng MCP ang umiiral na postura ng seguridad ng iyong organisasyon. Ang pagpapalakas ng mga pundasyon na praktis sa seguridad ay makabuluhang nagpapabuti sa pangkalahatang seguridad ng mga AI system at deployment ng MCP.

### Mga Pangunahing Pundasyon ng Seguridad

#### **Mga Praktis sa Secure Development**
- **Pagsunod sa OWASP**: Protektahan laban sa [OWASP Top 10](https://owasp.org/www-project-top-ten/) mga kahinaan sa web application
- **Mga Proteksyon na Tukoy sa AI**: Ipatupad ang mga kontrol para sa [OWASP Top 10 para sa LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Secure Secrets Management**: Gumamit ng mga nakalaang vault para sa mga token, API keys, at sensitibong configuration data
- **End-to-End Encryption**: Ipatupad ang secure na komunikasyon sa lahat ng bahagi ng application at daloy ng data
- **Input Validation**: Mahigpit na pagpapatunay ng lahat ng input ng user, parameter ng API, at mula sa mga pinagmumulan ng data

#### **Pagpapatibay ng Imprastruktura**
- **Multi-Factor Authentication**: Mandatoryong MFA para sa lahat ng mga administrative at service account
- **Patch Management**: Automated at napapanahong pag-patch para sa mga operating system, framework, at dependency  
- **Integrasyon ng Identity Provider**: Sentralisadong pamamahala ng pagkakakilanlan sa pamamagitan ng mga enterprise identity provider (Microsoft Entra ID, Active Directory)
- **Segmentation ng Network**: Lohikal na paghihiwalay ng mga MCP component upang limitahan ang potensyal na lateral movement
- **Prinsipyo ng Least Privilege**: Pinakamababang kinakailangang pahintulot para sa lahat ng componente ng sistema at account

#### **Pagmo-monitor at Pagkilala sa Seguridad**
- **Komprehensibong Logging**: Detalyadong pag-log ng mga aktibidad ng AI application, kabilang ang mga pakikipag-ugnayan ng MCP client-server
- **SIEM Integration**: Sentralisadong security information at event management para sa pagtuklas ng anomalya
- **Behavioral Analytics**: Pagsubaybay gamit ang AI upang matukoy ang mga hindi karaniwang pattern sa pag-uugali ng sistema at mga gumagamit
- **Threat Intelligence**: Integrasyon ng mga panlabas na threat feed at mga indicator ng kompromiso (IOC)
- **Pagtugon sa Insidente**: Mga malinaw na proseso para sa pagtuklas, pagtugon, at pagbawi mula sa mga insidente sa seguridad

#### **Zero Trust Architecture**
- **Huwag Manalig, Palaging Patunayan**: Tuluy-tuloy na pag-verify ng mga user, device, at koneksyon sa network
- **Micro-Segmentation**: Detalyadong mga kontrol sa network na naghihiwalay sa mga indibidwal na workload at serbisyo
- **Seguridad na Nakatuon sa Pagkakakilanlan**: Mga polisiya sa seguridad batay sa napatunayang pagkakakilanlan sa halip na lokasyon ng network
- **Tuloy-tuloy na Pagtatasa ng Panganib**: Dinamikong pagsusuri ng postura ng seguridad base sa kasalukuyang konteksto at pag-uugali
- **Conditional Access**: Mga kontrol sa access na umaangkop batay sa mga risk factor, lokasyon, at pagtitiwala sa device

### Mga Pattern sa Integrasyon ng Enterprise

#### **Integrasyon sa Ecosystem ng Microsoft Security**
- **Microsoft Defender for Cloud**: Komprehensibong cloud security posture management
- **Azure Sentinel**: Cloud-native SIEM at SOAR kapabilidad para sa proteksyon ng AI workload
- **Microsoft Entra ID**: Pamamahala ng pagkakakilanlan at access sa enterprise na may conditional access policies
- **Azure Key Vault**: Sentralisadong pamamahala ng mga sikreto na suportado ng hardware security module (HSM)
- **Microsoft Purview**: Pamamahala ng data at pagsunod para sa mga pinagmumulan ng AI data at workflows

#### **Pagsunod at Pamamahala**
- **Regulatory Alignment**: Tiyakin na ang mga implementasyon ng MCP ay pumapasa sa mga partikular na kinakailangan sa pagsunod ng industriya (GDPR, HIPAA, SOC 2)

- **Pag-uuri ng Data**: Tamang pagkategorya at paghawak ng sensitibong data na pinoproseso ng mga sistemang AI
- **Audit Trails**: Komprehensibong pag-log para sa pagsunod sa regulasyon at forensic investigation
- **Mga Kontrol sa Privacy**: Pagsasagawa ng mga prinsipyo ng privacy-by-design sa arkitektura ng sistema ng AI
- **Pamamahala ng Pagbabago**: Pormal na mga proseso para sa pagsusuri ng seguridad sa mga pagbabago sa sistema ng AI

Ang mga pundamental na gawaing ito ay lumilikha ng matatag na basehan ng seguridad na nagpapahusay sa bisa ng mga seguridad na kontrol na partikular sa MCP at nagbibigay ng komprehensibong proteksyon para sa mga aplikasyon na pinapatakbo ng AI.

## Pangunahing Mga Natutunan sa Seguridad

- **Layered Security Approach**: Pagsamahin ang mga pundamental na praktis sa seguridad (secure coding, least privilege, supply chain verification, continuous monitoring) kasama ang mga partikular na kontrol sa AI para sa komprehensibong proteksyon

- **Espesipikong Landscape ng Banta sa AI**: Ang mga sistema ng MCP ay humaharap sa mga natatanging panganib kabilang ang prompt injection, tool poisoning, session hijacking, confused deputy problems, token passthrough vulnerabilities, at sobrang mga permiso na nangangailangan ng espesyal na mga mitigasyon

- **Kahusayan sa Authentication at Authorization**: Magpatupad ng matibay na authentication gamit ang mga panlabas na tagapagbigay ng pagkakakilanlan (Microsoft Entra ID), ipatupad ang wastong token validation, at huwag kailanman tanggapin ang mga token na hindi tahasang inilabas para sa iyong MCP server

- **Pagsugpo sa AI Attack**: I-deploy ang Microsoft Prompt Shields at Azure Content Safety para ipagtanggol laban sa hindi direktang prompt injection at tool poisoning attack, habang pinapatunayan ang metadata ng tool at binabantayan ang mga dinamiko na pagbabago

- **Seguridad ng Session at Transport**: Gumamit ng cryptographically secure, non-deterministic na mga session ID na naka-bind sa mga pagkakakilanlan ng user, ipatupad ang wastong pamamahala ng lifecycle ng session, at huwag kailanman gamitin ang mga session para sa authentication

- **Pinakamahusay na Praktis sa Seguridad ng OAuth**: Iwasan ang confused deputy attacks sa pamamagitan ng tahasang pahintulot ng user para sa dynamically registered clients, wastong implementasyon ng OAuth 2.1 na may PKCE, at mahigpit na validasyon ng redirect URI  

- **Mga Prinsipyo ng Seguridad ng Token**: Iwasan ang token passthrough anti-patterns, patunayan ang mga audience claims ng token, ipatupad ang mga short-lived na token na may secure rotation, at panatilihin ang malinaw na trust boundaries

- **Komprehensibong Seguridad ng Supply Chain**: Tratuhin ang lahat ng mga bahagi ng AI ecosystem (mga modelo, embeddings, context providers, panlabas na API) na may parehong riguroso na seguridad tulad ng tradisyunal na mga dependencies ng software

- **Patuloy na Ebolusyon**: Manatiling napapanahon sa mabilis na nagbabagong mga espesipikasyon ng MCP, mag-ambag sa mga pamantayan ng komunidad sa seguridad, at panatilihin ang mga adaptive na postura sa seguridad habang lumalago ang protocol

- **Integrasyon ng Microsoft Security**: Gamitin ang komprehensibong ecosystem ng seguridad ng Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) para sa pinahusay na proteksyon ng deployment ng MCP

## Komprehensibong Mga Mapagkukunan

### **Opisyal na Dokumentasyon ng MCP Security**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Security Resources**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komprehensibong OWASP MCP Top 10 na may gabay sa implementasyon ng Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Opisyal na mga panganib sa seguridad ng MCP ng OWASP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on na pagsasanay sa seguridad para sa MCP sa Azure

### **Mga Pamantayan at Pinakamahusay na Praktis sa Seguridad**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 para sa Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Pananaliksik at Pagsusuri sa Seguridad ng AI**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Mga Solusyon sa Seguridad ng Microsoft**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Mga Gabay sa Implementasyon at Tutorial**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **Seguridad sa DevOps at Supply Chain**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Karagdagang Dokumentasyon sa Seguridad**

Para sa komprehensibong gabay sa seguridad, sumangguni sa mga espesyal na dokumentong ito sa seksyong ito:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Kumpletong pinakamahusay na praktis sa seguridad para sa mga implementasyon ng MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Mga praktikal na halimbawa ng implementasyon para sa integrasyon ng Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Pinakabagong mga kontrol at teknik sa seguridad para sa mga deployment ng MCP
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Mabilisang sanggunian para sa mahahalagang praktis sa seguridad ng MCP
- **[BlueHat 2026: Securing the future of AI: Securing MCP with defense in depth patterns](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Mga pattern sa defense-in-depth mula sa Microsoft Security Response Center (MSRC)

### **Hands-On na Pagsasanay sa Seguridad**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Komprehensibong hands-on workshop para sa pagseseguro ng mga server ng MCP sa Azure mula Base Camp hanggang Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Reference architecture at gabay sa implementasyon para sa lahat ng OWASP MCP Top 10 na panganib

---

## Ano ang Susunod

Susunod: [Kabanata 3: Pagsisimula](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->