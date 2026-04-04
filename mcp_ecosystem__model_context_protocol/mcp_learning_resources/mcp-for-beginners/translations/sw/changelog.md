# Mabadiliko ya Mtaala: MCP kwa Waanzilishi

Hati hii hutumika kama rekodi ya mabadiliko yote muhimu yaliyofanywa kwenye mtaala wa Model Context Protocol (MCP) kwa Waanzilishi. Mabadiliko yameandikwa kwa mpangilio wa mfululizo wa kinyume wa wakati (mabadiliko mapya kwanza).

## Februari 5, 2026

### Marekebisho ya Uthibitishaji na Uboreshaji wa Ut导航 Katika Hifadhi Yote

#### Maudhui Mapya ya Mtaala Yameongezwa

**Moduli 03 - Kuanzia**
- **12-mcp-hosts/README.md**: Mwongozo mpana mpya wa kuweka mwenyeji wa MCP
  - Mifano ya usanidi wa Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Violezo vya usanidi wa JSON kwa wenyeji wote wakubwa
  - Jedwali la kulinganisha aina za usafirishaji (stdio, SSE/HTTP, WebSocket)
  - Utatuzi wa matatizo ya kawaida ya muunganisho
  - Mbinu bora za usalama kwa usanidi wa mwenyeji

- **13-mcp-inspector/README.md**: Mwongozo mpya wa uchunguzi (debugging) wa MCP Inspector
  - Njia za ufungaji (npx, npm global, kutoka chanzo)
  - Kuunganisha kwa seva kupitia stdio na HTTP/SSE
  - Zana za majaribio, rasilimali, na taratibu za maoni (prompts)
  - Muunganisho wa VS Code na MCP Inspector
  - Matukio ya kawaida ya uchunguzi na suluhisho

**Moduli 04 - Utekelezaji wa Kivitendo**
- **pagination/README.md**: Mwongozo mpya wa utekelezaji wa ukurasa
  - Mifumo ya ukurasa unaotegemea cursor katika Python, TypeScript, Java
  - Uendeshaji wa ukurasa upande wa mteja
  - Mikakati ya muundo wa cursor (isiyoeleweka vs iliyosanifiwa)
  - Mapendekezo ya kuboresha utendaji

**Moduli 05 - Mada Zinazopitia Zaidi**
- **mcp-protocol-features/README.md**: Uchunguzi wa kina wa vipengele vipya vya itifaki
  - Utekelezaji wa taarifa za maendeleo
  - Mifumo ya kughairi ombi
  - Violezo vya rasilimali zilizo na mifumo ya URI
  - Usimamizi wa mzunguko wa maisha wa seva
  - Udhibiti wa kiwango cha kurekodi
  - Mifumo ya kushughulikia makosa na misimbo ya JSON-RPC

#### Marekebisho ya Uwazi wa Ngazi ya Uvinjari (Faili 24+ zilizosasishwa)

**README za Moduli Kuu**
 Sasa zina viungo kwa somo la kwanza NA moduli inayofuata

**Faili Ndogo za Usalama 02**
- Nyaraka zote 5 za ziada za usalama sasa zina sehemu ya Utalifu wa Nini Kifuatacho:

**Faili za Utafiti wa Kesi 09**
- Faili zote za utafiti wa kesi sasa zina utalifu wa mfuatano:

**Maabara ya AI ya Uboreshaji wa Mipango 10**
Imeongeza sehemu ya Nini Kifuatacho kwenye muhtasari wa Moduli 10 na Moduli 11

#### Marekebisho ya Msimbo na Maudhui

**Sasisho za SDK na Vitegemezi**
Imerekebisha toleo tupu la openai kuwa `^4.95.0`
Imesasisha SDK kutoka `^1.8.0` hadi `>=1.26.0`
Imesasisha vidokezo vya toleo la mcp kuwa `>=1.26.0`

**Marekebisho ya Msimbo**
Imerekebisha mfano batili `gpt-4o-mini` kuwa `gpt-4.1-mini`

**Marekebisho ya Maudhui**
Imerekebisha kiungo kilichovunjika `READMEmd` → `README.md`, imerekebisha kichwa cha mtaala `Module 1-3` → `Module 0-3`, imerekebisha njia yenye utofauti wa herufi kubwa na ndogo
Imeondoa maudhui rudufu ya utafiti wa kesi 5 yaliyoharibika

**Uboreshaji wa Mwongozo kwa Waanzilishi**
Imeongeza utangulizi sahihi, malengo ya kujifunza, na masharti kwa waanzilishi

#### Sasisho za Mtaala

**README Kuu.md**
- Imeongeza vipengele 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) kwenye jedwali la mtaala

**README za Moduli**
Imeongeza masomo 12 na 13 kwenye orodha ya masomo
Imeongeza sehemu ya Miongozo ya Kivitendo na kiungo cha ukurasa
Imeongeza masomo 5.15 (Transport Maalum) na 5.16 (Vipengele vya Itifaki)

**study_guide.md**
- Imesasisha ramani ya mawazo na mada zote mpya: Usanidi wa MCP Hosts, MCP Inspector, Mikakati ya Ukurasa, Uchunguzi wa Kina wa Vipengele vya Itifaki

## Januali 28, 2026

### Mapitio ya Uzingatiaji wa MCP Specification 2025-11-25

#### Uboreshaji wa Dhana Msingi (01-CoreConcepts/)
- **Kiprogramu Kipya cha Mteja - Roots**: Imeongeza nyaraka kamili kuhusu kiprogramu cha mteja Roots, kuruhusu seva kuelewa mipaka ya mfumo wa faili na ruhusa za upatikanaji
- **Maelezo ya Zana**: Imeongeza nyaraka kuhusu maelezo ya mienendo ya zana (`readOnlyHint`, `destructiveHint`) kwa maamuzi bora ya utekelezaji wa zana
- **Kuitisha Zana Katika Sampuli**: Imesasisha nyaraka za Sampuli kuhusisha vigezo vya `tools` na `toolChoice` kwa kuitishwa kwa zana zinazotegemea mfano wakati wa maombi ya sampuli
- **Uamsho wa Njia ya URL**: Imeongeza nyaraka kuhusu uamsho wa msingi wa URL kwa mwingiliano wa wavuti unaoanzishwa na seva
- **Majukumu (Jaribio)**: Imeongeza sehemu mpya inayoelezea kipengele cha Majukumu kwa vifuniko vya utekelezaji wa kudumu na kupata matokeo kwa ucheleweshaji
- **Msaada wa Ikoni**: Imetaja kuwa zana, rasilimali, violezo vya rasilimali, na maelekezo sasa vinaweza kujumuisha ikoni kama metadata ya ziada

#### Sasisho za Nyaraka
- **README.md**: Imeongeza kumbukumbu ya toleo la MCP Specification 2025-11-25 na maelezo ya toleo la tarehe
- **study_guide.md**: Imeboresha ramani ya mtaala kujumuisha Majukumu na Maelezo ya Zana katika sehemu ya Dhana Msingi; imesasisha tarehe ya hati

#### Uhakiki wa Uzingatiaji wa Vipengele vya MCP
- **Toleo la Itifaki**: Imethibitisha nyaraka zote zinarejelea MCP Specification 2025-11-25 ya sasa
- **Mlingano wa Miundo**: Imethibitisha usahihi wa nyaraka za usanifu wa tabaka mbili (Tabaka la Data + Tabaka la Usafirishaji)
- **Nyaraka za Kiprogramu**: Imethibitisha kiprogramu za seva (Rasilimali, Maelekezo, Zana) na zile za mteja (Sampuli, Uamsho, Kurekodi, Roots)
- **Mifumo ya Usafirishaji**: Imethibitisha usahihi wa nyaraka za usafirishaji STDIO na HTTP inayoelea (Streamable)
- **Mwongozo wa Usalama**: Imethibitisha ulinganifu na nyaraka za Mbinu Bora za Usalama za MCP za sasa

#### Vipengele Muhimu vya MCP 2025-11-25 Vilivyorekodiwa
- **Ugunduzi wa OpenID Connect**: Ugunduzi wa seva ya uthibitishaji kupitia OIDC
- **Nyaraka za Metadata ya OAuth Client ID**: Pendekezo la utaratibu wa usajili wa mteja
- **JSON Schema 2020-12**: Lahaja msingi kwa ufafanuzi wa schema MCP
- **Mfumo wa Ngazi za SDK**: Mahitaji rasmi ya msaada wa vipengele na matengenezo ya SDK
- **Muundo wa Uongozi**: Makundi ya Kazi na Makundi ya Maslahi yamefanywa rasmi katika uongozi wa MCP

### Sasisho Kuu la Nyaraka za Usalama (02-Security/)

#### Uunganisho wa Warsha ya Sumu ya Usalama ya MCP (Sherpa)
- **Rasilimali Mpana ya Mafunzo ya Vitendo**: Imeunganisha kwa kina na [Warsha ya Sumu ya Usalama ya MCP (Sherpa)](https://azure-samples.github.io/sherpa/) katika nyaraka zote za usalama
- **Ufuatiliaji wa Njia ya Kukwea Mlima**: Imeeleza maendeleo ya hatua kwa hatua kutoka Kambi ya Msingi hadi Mlima
- **Ulinganifu na OWASP**: Mwongozo wote wa usalama sasa unalingana na Mwongozo wa Usalama MCP Azure wa OWASP

#### Uunganisho wa OWASP MCP Top 10
- **Sehemu Mpya**: Imeongeza jedwali la Hatari 10 Kuu za Usalama za OWASP MCP na suluhisho za Azure kwenye README kuu ya Usalama
- **Nyaraka Zinazotegemea Hatari**: Imesasisha mcp-security-controls-2025.md kwa marejeleo ya hatari za OWASP MCP kwa kila nyanja ya usalama
- **Muundo wa Marejeleo**: Imeunganisha na muundo wa marejeleo na mifumo ya utekelezaji wa Mwongozo wa Usalama MCP Azure wa OWASP

#### Faili za Usalama Zilizosasishwa
- **README.md**: Imeongeza muhtasari wa warsha ya Sherpa, jedwali la njia ya kuanzia kampi, muhtasari wa hatari 10 kuu za OWASP MCP, na sehemu ya mafunzo ya vitendo
- **mcp-security-controls-2025.md**: Imesasisha kichwa hadi Februari 2026, kuongeza marejeleo ya hatari za OWASP (MCP01-MCP08), kurekebisha utofauti wa toleo la sifa
- **mcp-security-best-practices-2025.md**: Imeongeza sehemu ya rasilimali za Sherpa na OWASP, imesasisha tarehe
- **mcp-best-practices.md**: Imeongeza sehemu ya mafunzo ya vitendo na viungo vya Sherpa na OWASP
- **azure-content-safety-implementation.md**: Imeongeza marejeleo ya OWASP MCP06, ulinganifu na Kambi 3 ya Sherpa, na sehemu ya rasilimali za ziada

#### Viungo Vipya vya Rasilimali Vimeongezwa
- [Warsha ya Sumu ya Usalama ya MCP (Sherpa)](https://azure-samples.github.io/sherpa/)
- [Mwongozo wa Usalama MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Kurasa za hatari binafsi za OWASP MCP (MCP01-MCP10)

### Ulinganifu wa MCP Specification 2025-11-25 Kwenye Mtaala Zote

#### Moduli 03 - Kuanzia
- **Nyaraka za SDK**: Imeongeza Go SDK kwenye orodha rasmi ya SDK; imesasisha rejeleo zote za SDK kulingana na MCP Specification 2025-11-25
- **Ufafanuzi wa Usafirishaji**: Imeboresha maelezo ya usafirishaji wa STDIO na HTTP Streaming kwa rejeleo maalum ya sifa

#### Moduli 04 - Utekelezaji wa Kivitendo
- **Sasisho za SDK**: Imeongeza Go SDK; imesasisha orodha ya SDK na rejeleo la toleo la sifa
- **Sifa za Uidhinishaji**: Imesasisha kiungo cha sifa za Uidhinishaji za MCP hadi toleo la sasa 2025-11-25

#### Moduli 05 - Mada Zinazopitia Zaidi
- **Vipengele Vipya**: Imeongeza taarifa kuhusu vipengele vipya vya MCP Specification 2025-11-25 (Majukumu, Maelezo ya Zana, Uamsho wa Njia ya URL, Roots)
- **Rasilimali za Usalama**: Imeongeza viungo vya OWASP MCP Top 10 na warsha ya Sherpa kama marejeleo ya ziada

#### Moduli 06 - Michango ya Jamii
- **Orodha ya SDK**: Imeongeza Swift na Rust SDK; imesasisha kiungo cha sifa hadi 2025-11-25
- **Rejeleo la Sifa**: Imesasishwa kiungo cha MCP Specification hadi URL ya sifa moja kwa moja

#### Moduli 07 - Masomo Kutoka kwenye Kutangazwa kwa Awali
- **Sasisho za Rasilimali**: Imeongeza kiungo cha MCP Specification 2025-11-25 na OWASP MCP Top 10 kama rasilimali za ziada

#### Moduli 08 - Mbinu Bora
- **Toleo la Sifa**: Imeboresha rejeleo la MCP Specification hadi 2025-11-25
- **Rasilimali za Usalama**: Imeongeza OWASP MCP Top 10 na warsha ya Sherpa kama marejeleo ya ziada

#### Moduli 10 - Uboreshaji wa Mipango ya AI
- **Sasisho la Baji**: Imebadilisha baji la toleo la MCP kutoka toleo la SDK (1.9.3) hadi toleo la sifa (2025-11-25)
- **Viungo vya Rasilimali**: Imeboresha kiungo cha MCP Specification; imeongeza OWASP MCP Top 10

#### Moduli 11 - Maabara za Kukamata MCP Server Kivitendo
- **Rejeleo la Sifa**: Imeboresha kiungo cha MCP Specification hadi toleo la 2025-11-25
- **Rasilimali za Usalama**: Imeongeza OWASP MCP Top 10 kwenye rasilimali rasmi

## Desemba 18, 2025

### Sasisho la Nyaraka za Usalama - MCP Specification 2025-11-25

#### Mbinu Bora za Usalama za MCP (02-Security/mcp-best-practices.md) - Sasisho la Toleo la Sifa
- **Sasisho la Toleo la Itifaki**: Imesasisha rejeleo hadi MCP Specification 2025-11-25 (iliyotolewa Novemba 25, 2025)
  - Imesasisha rejeleo zote za toleo la sifa kutoka 2025-06-18 hadi 2025-11-25
  - Imesasisha tarehe zote za nyaraka kutoka Agosti 18, 2025 hadi Desemba 18, 2025
  - Imethibitisha kuwa URL zote za sifa zinaelekeza kwenye nyaraka za sasa
- **Uthibitishaji wa Maudhui**: Uthibitishaji kamili wa mbinu bora za usalama dhidi ya viwango vya hivi karibuni
  - **Suluhisho za Usalama za Microsoft**: Imethibitisha istilahi na viungo vya sasa vya Prompt Shields (zamani "ugunduzi wa hatari za kuchomwa gerezani"), Azure Content Safety, Microsoft Entra ID, na Azure Key Vault
  - **Usalama wa OAuth 2.1**: Imethibitisha ulinganifu na mbinu bora za usalama za OAuth za hivi karibuni
  - **Viwango vya OWASP**: Imethibitisha marejeleo ya OWASP Top 10 kwa LLMs bado ni ya sasa
  - **Huduma za Azure**: Imethibitisha viungo vyote vya nyaraka za Microsoft Azure na mbinu bora za sasa
- **Ulinganifu wa Viwango**: Viwango vyote vilivyotajwa vya usalama vimethibitishwa kuwa vya sasa
  - Mfumo wa Usimamizi wa Hatari wa AI wa NIST
  - ISO 27001:2022
  - Mbinu Bora za Usalama za OAuth 2.1
  - Miundo ya usalama na uidhinishaji wa Azure
- **Rasilimali za Utekelezaji**: Imethibitisha viungo vyote vya mwongozo wa utekelezaji na rasilimali
  - Mifumo ya uthibitishaji wa Azure API Management
  - Mwongozo wa kuingiza Microsoft Entra ID
  - Usimamizi wa siri za Azure Key Vault
  - Mifumo ya DevSecOps na suluhisho za ufuatiliaji

### Hakiki ya Ubora wa Nyaraka
- **Uzingatiaji wa Sifa**: Imedhibitisha mahitaji yote ya usalama ya MCP (LAZIMA/HARAMU) kuwa yanalingana na sifa za hivi karibuni
- **Uhalisia wa Rasilimali**: Imethibitisha viungo vya nje vyote vya nyaraka za Microsoft, viwango vya usalama, na miongozo ya utekelezaji
- **Mwangaza wa Mbinu Bora**: Imethibitisha upana wa mbinu bora za uthibitishaji, uidhinishaji, vitisho maalum vya AI, usalama wa mnyororo wa ugavi, na mifumo ya shirika

## Oktoba 6, 2025

### Upanuzi wa Sehemu ya Kuanzia – Matumizi ya Seva ya Juu & Uthibitishaji Rahisi

#### Matumizi ya Seva ya Juu (03-GettingStarted/10-advanced)
- **Sura Mpya Imeongezwa**: Imeanzisha mwongozo mpana wa matumizi ya juu ya seva za MCP, ikijumuisha usanifu wa seva za kawaida na za ngazi ya chini.
  - **Seva za Kawaida dhidi ya Za Ngazi ya Chini**: Ulinganifu wa kina na mifano ya msimbo kwa Python na TypeScript kwa mbinu zote mbili.
  - **Usanifu wa Menea/Msimamizi**: Ufafanuzi wa utunzaji wa zana/rasilimali/maelekezo kwa kutumia meneja kwa utekelezaji wa seva unaoweza kupanuka na kubadilika.
  - **Mifano ya Vitendo**: Hali halisi ambapo mifumo ya ngazi ya chini ni yenye faida kwa vipengele vya juu na usanifu.

#### Uthibitishaji Rahisi (03-GettingStarted/11-simple-auth)
- **Sura Mpya Imeongezwa**: Mwongozo wa hatua kwa hatua wa kutekeleza uthibitishaji rahisi kwenye seva za MCP.
  - **Dhana za Uthibitishaji**: Ufafanuzi wazi wa tofauti kati ya uthibitishaji na uidhinishaji, pamoja na usimamizi wa nyaraka.
  - **Utekelezaji Msingi wa Uthibitishaji**: Mifumo ya uthibitishaji inayotegemea middleware katika Python (Starlette) na TypeScript (Express), ikiwa na mifano ya msimbo.
  - **Maelekezo ya Kuendelea Kwenye Usalama wa Juu**: Mwongozo wa kuanzia na uthibitishaji rahisi na kuendelea hadi OAuth 2.1 na RBAC, pamoja na rejeleo kwa moduli za usalama wa juu.

Ongezeo hili linatoa mwongozo wa vitendo, mikono kwa mikono kwa ujenzi wa utekelezaji wa seva wa MCP thabiti, salama, na unaobadilika, ukichanganya dhana za msingi na mifumo ya hali ya juu kwa uzalishaji.

## Septemba 29, 2025

### Maabara za Ujumuishaji wa Hifadhidata ya MCP Server - Njia Kamili ya Kujifunza kwa Mikono

#### 11-MCPServerHandsOnLabs - Mtaala Mpya Kamili wa Ujumuishaji wa Hifadhidata
- **Jalur Kamili la Kujifunza Maabara 13**: Imekuwa na mtaala kamili wa mazoezi ya vitendo kwa ajili ya kujenga seva za MCP tayari kwa uzalishaji zilizounganishwa na hifadhidata ya PostgreSQL  
  - **Utekelezaji wa Halisi Duniani**: Matumizi ya Zava Retail analytics kuonyesha mifumo ya viwango vya viwanda  
  - **Mwelekeo wa Mafunzo uliopangwa**:  
    - **Maabara 00-03: Msingi** - Utangulizi, Mambo ya Msingi ya Usanifu, Usalama & Multi-Tenancy, Usanidi wa Mazingira  
    - **Maabara 04-06: Ujenzi wa Seva ya MCP** - Ubunifu na Mchoro wa Hifadhidata, Utekelezaji wa Seva ya MCP, Kukuza Zana  
    - **Maabara 07-09: Sifa Zinazoendelea** - Uunganishaji wa Utafutaji wa Semantiki, Upimaji & Urekebishaji, Uunganishaji wa VS Code  
    - **Maabara 10-12: Uzalishaji & Mambo Bora ya Kutenda** - Mikakati ya Uenezaji, Ufuatiliaji & Uwezo wa Kuangalia, Mambo Bora & Uboreshaji  
  - **Teknolojia za Viwanda**: Fremu ya FastMCP, PostgreSQL na pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights  
  - **Sifa Zaidi**: Usalama wa Ngazi ya Safu (RLS), utafutaji wa semantiki, upatikanaji wa data kwa wateja wengi, vector embeddings, ufuatiliaji wa wakati halisi  

#### Ulinganifu wa Misingi ya Maneno - Mbadala ya Moduli kwa Maabara  
- **Sasisho Kamili la Nyaraka**: Imesasisha mifumo yote ya README katika 11-MCPServerHandsOnLabs ili kutumia neno "Lab" badala ya "Module"  
  - **Vichwa vya Sehemu**: Imesasisha "What This Module Covers" kuwa "What This Lab Covers" katika maabara zote 13  
  - **Maelezo ya Yaliyomo**: Kubadilisha "This module provides..." kuwa "This lab provides..." katika nyaraka zote  
  - **Malengo ya Kujifunza**: Kubadili "By the end of this module..." kuwa "By the end of this lab..."  
  - **Viungo vya Kuongoza**: Kubadilisha marejeleo yote ya "Module XX:" kuwa "Lab XX:" katika rufaa na urambazaji  
  - **Ufuatiliaji wa Kukamilika**: Kubadili "After completing this module..." kuwa "After completing this lab..."  
  - **Kuhifadhi Marejeleo ya Kiufundi**: Kuendelea kuhifadhi marejeleo ya moduli za Python katika faili za usanidi (mfano, `"module": "mcp_server.main"`)  

#### Uboreshaji wa Mwongozo wa Masomo (study_guide.md)  
- **Ramani ya Mtaala wa Kuona**: Kuongeza sehemu mpya "11. Database Integration Labs" na muhtasari kamili wa muundo wa maabara  
- **Muundo wa Hifadhi**: Kusasisha kutoka sehemu kumi hadi kumi na moja na maelezo ya kina ya 11-MCPServerHandsOnLabs  
- **Mwongozo wa Njia za Kujifunza**: Kuongeza maelekezo ya urambazaji kwa sehemu 00-11  
- **Mambo ya Teknolojia**: Kuongeza maelezo ya FastMCP, PostgreSQL, huduma za Azure  
- **Matokeo ya Kujifunza**: Kusisitiza maendeleo ya seva tayari kwa uzalishaji, mifumo ya uunganishaji wa hifadhidata, na usalama wa viwanda  

#### Uboreshaji wa Muundo wa README Mkuu  
- **Matumizi ya Maneno ya Maabara**: Kusasisha README.md kuu katika 11-MCPServerHandsOnLabs kwa kutumia muundo wa "Lab" kwa uthabiti  
- **Mpangilio wa Njia ya Kujifunza**: Mwelekeo wazi kutoka dhana za msingi hadi utekelezaji wa hali ya juu na ueneaji kwa uzalishaji  
- **Mwonekano wa Uhalisia Duniani**: Kusisitiza njia ya mafunzo ya vitendo inayolenga mifumo ya viwanda na teknolojia  

### Maboresho ya Ubora wa Nyaraka na Ulinganifu  
- **Mwelekeo wa Mafunzo ya Vitendo**: Kuimarisha mtazamo wa maabara unaoendelea katika nyaraka zote  
- **Mifumo Ya Viwanda**: Kuonyesha utekelezaji wa viwango vya viwanda na usalama  
- **Uunganishaji wa Teknolojia**: Ufafanuzi wa huduma za kisasa za Azure na mifumo ya AI  
- **Mwelekeo wa Mafunzo**: Njia wazi, iliyopangwa kutoka kwa dhana za msingi hadi ueneaji wa uzalishaji  

## Septemba 26, 2025

### Uboreshaji wa Masomo ya Kesi - Uunganishaji wa GitHub MCP Registry  

#### Masomo ya Kesi (09-CaseStudy/) - Mwelekeo wa Maendeleo ya Eko-System  
- **README.md**: Upanuzi mkubwa na somo la kesi la kina kuhusu GitHub MCP Registry  
  - **Somo la Kesi la GitHub MCP Registry**: Somo jipya la kina linalochunguza uzinduzi wa GitHub's MCP Registry Septemba 2025  
    - **Uchambuzi wa Tatizo**: Uchambuzi wa kina wa changamoto za kugundua na kueneza seva za MCP zilizogawanywa  
    - **Usanifu wa Suluhisho**: Mbinu ya GitHub ya usajili wa katikati na ufungaji wa VS Code kwa bonyeza moja  
    - **Athari za Kibiashara**: Maboresho yanayopimika katika kuwashirikisha waendelezaji na uzalishaji  
    - **Thamani ya Kimkakati**: Mkazo kwenye uenezi wa mawakala wa moduli na umoja wa vyombo tofauti  
    - **Maendeleo ya Eko-System**: Kuonesha kama jukwaa la msingi kwa mfumo wa kiwakala  
  - **Muundo Ulioboreshwa wa Somo la Kesi**: Kusasisha matini na maelezo ya masomo yote saba kwa muundo thabiti na maelezo kamili  
    - Maajenti wa Safari Azure AI: Mkazo wa kupanga maajenti wengi  
    - Uunganishaji wa Azure DevOps: Mkazo wa otomatiki ya mtiririko wa kazi  
    - Upokeaji wa Nyaraka wa Wakati Halisi: Utekelezaji wa mteja wa console wa Python  
    - Mtengeneza Mpango wa Masomo wa Maongezi: Programu ya mtandao ya mazungumzo ya Chainlit  
    - Nyaraka Ndani ya Mhariri: Uunganishaji na VS Code na GitHub Copilot  
    - Usimamizi wa Azure API: Mifumo ya uunganishaji wa API za viwanda  
    - GitHub MCP Registry: Maendeleo ya eko-system na jukwaa la jumuiya  
  - **Hitimisho Kamili**: Sehemu ya hitimisho imeandikwa upya ikisisitiza masomo saba ya kesi yanayogusa nyanja mbalimbali za utekelezaji wa MCP  
    - Uunganishaji wa Viwanda, Uratibu wa Maajenti Wengi, Uzalishaji wa Waendelezaji  
    - Maendeleo ya Eko-System, matumizi ya kielimu  
    - Uongeza wa maarifa kuhusu mifumo ya usanifu, mikakati ya utekelezaji, na mbinu bora  
    - Uthabiti wa MCP kama itifaki iliyo imara na tayari kwa uzalishaji  

#### Sasisho za Mwongozo wa Masomo (study_guide.md)  
- **Ramani ya Mtaala wa Kuona**: Imesasisha ramani ya mawazo kujumuisha GitHub MCP Registry katika sehemu ya Masomo ya Kesi  
- **Maelezo ya Masomo ya Kesi**: Yameboreshwa kutoka maelezo ya jumla hadi utambuzi wa kina wa masomo saba ya kesi  
- **Muundo wa Hifadhi**: Imesasisha sehemu ya 10 kuonyesha mafanikio kamili ya masomo ya kesi na maelezo ya utekelezaji  
- **Uunganishaji wa Mabadiliko**: Kuongeza rekodi ya Septemba 26, 2025 inayojumuisha kuongezwa kwa GitHub MCP Registry na maboresho ya masomo ya kesi  
- **Sasisho la Tarehe**: Sasisho la lebo ya tarehe chini kuonyesha marekebisho ya hivi karibuni (Septemba 26, 2025)  

### Maboresho ya Ubora wa Nyaraka  
- **Ulinganifu wa Mtindo**: Kurekebisha mtindo wa masomo ya kesi na muundo kwa mifano saba yote  
- **Mazingira Kamili**: Masomo ya kesi sasa yanagusa viwanda, uzalishaji wa waendelezaji, na maendeleo ya eko-system  
- **Mwelekeo wa Kimkakati**: Mkazo uliongezwa kuhusu MCP kama jukwaa la msingi kwa uenezi wa mifumo ya kiwakala  
- **Uunganishaji wa Rasilimali**: Upanuzi wa rasilimali kuhusisha kiungo cha GitHub MCP Registry  

## Septemba 15, 2025

### Upanuzi wa Mada Zinazoendelea - Usafirishaji Maalum & Uhandisi wa Muktadha  

#### Usafirishaji Maalum wa MCP (05-AdvancedTopics/mcp-transport/) - Mwongozo Mpya wa Utekelezaji wa Juu  
- **README.md**: Mwongozo kamili wa utekelezaji wa mifumo ya usafirishaji maalum ya MCP  
  - **Usafirishaji wa Azure Event Grid**: Utekelezaji kamili wa usafirishaji wa tukio lisilo na seva  
    - Mifano ya C#, TypeScript, na Python ikiwa na uunganisho wa Azure Functions  
    - Mifumo ya usanifu unaogusa matukio kwa ufumbuzi wa MCP unaoweza kupanuka  
    - Wapokeaji wa webhook na usindikaji wa ujumbe kwa mtindo wa kusukuma  
  - **Usafirishaji wa Azure Event Hubs**: Utekelezaji wa usafirishaji wa mtiririko wenye mtiririko mkubwa  
    - Uwezo wa mtiririko wa wakati halisi kwa hali za kuchelewa kidogo  
    - Mikakati ya kugawanya sehemu na usimamizi wa alama za kukagua  
    - Ukusanyaji wa ujumbe na uboreshaji wa utendaji  
  - **Mifumo ya Uunganishaji wa Viwanda**: Mifano ya usanifu tayari kwa uzalishaji  
    - Usindikaji wa MCP ulio sambazwa kupitia Azure Functions nyingi  
    - Mifumo mchanganyiko ya usafirishaji inayochanganya aina mbalimbali  
    - Udumu, uaminifu, na mikakati ya kushughulikia makosa ya ujumbe  
  - **Usalama & Ufuatiliaji**: Uunganisho wa Azure Key Vault na mifumo ya kuangalia  
    - Utambulisho wa utambulisho uliosimamiwa na upatikanaji wa kiwango cha chini  
    - Ufuatiliaji wa utendaji wa Application Insights  
    - Vipunguzi vya mzunguko na mifumo ya uvumilivu wa hitilafu  
  - **Mifumo ya Upimaji**: Mikakati kamili ya upimaji kwa usafirishaji maalum  
    - Upimaji wa vitengo kwa kutumia nakala za majaribio na mifumo ya kuonesha  
    - Upimaji wa kuunganishwa kwa kutumia Azure Test Containers  
    - Mambo ya kuzingatia upimaji wa utendaji na mzigo  

#### Uhandisi wa Muktadha (05-AdvancedTopics/mcp-contextengineering/) - Disipuli Inayoibuka ya AI  
- **README.md**: Uchunguzi kamili wa uhandisi wa muktadha kama eneo jipya  
  - **Misingi Muhimu**: Kushirikisha muktadha kwa ukamilifu, ufahamu wa uamuzi wa hatua, na usimamizi wa dirisha la muktadha  
  - **Ulinganifu wa Itifaki ya MCP**: Jinsi usanifu wa MCP unavyoshughulikia changamoto za uhandisi wa muktadha  
    - Mipaka ya dirisha la muktadha na mikakati ya upakiaji wa hatua kwa hatua  
    - Uhalali wa muktadha na upokeaji wa muktadha unaobadilika  
    - Kushughulikia muktadha wa aina nyingi na kuzingatia usalama  
  - **Mbinu za Utekelezaji**: Miundo ya kipande kimoja dhidi ya maajenti wengi  
    - Mbinu za kugawanya muktadha na kipaumbele  
    - Upakiaji wa hatua kwa hatua na mikakati ya usimbaji  
    - Mbinu za muktadha wa tabaka na uboreshaji wa upokeaji  
  - **Mfumo wa Kupima**: Vigezo vinavyoibuka kwa tathmini ya ufanisi wa muktadha  
    - Ufanisi wa pembejeo, utendaji, ubora, na uzoefu wa mtumiaji  
    - Mbinu za majaribio za uboreshaji wa muktadha  
    - Uchambuzi wa kushindwa na mbinu za kuboresha  

#### Sasisho la Urambazaji wa Mtaala (README.md)  
- **Muundo ulioimarishwa wa Moduli**: Imesasisha jedwali la mtaala kujumuisha mada mpya za juu  
  - Kuongeza Idara ya Uhandisi wa Muktadha (5.14) na Usafirishaji Maalum (5.15)  
  - Muundo thabiti wa upau na viungo vya urambazaji kwa moduli zote  
  - Maelezo yaliyo sasishwa kuendana na muktadha wa sasa  

### Maboresho ya Muundo wa Saraka  
- **Uwiano wa Majina**: Kubadilisha "mcp transport" kuwa "mcp-transport" ili kuendana na saraka zingine za mada za juu  
- **Mpangilio wa Yaliyomo**: Folda zote za 05-AdvancedTopics zina muundo thabiti wa majina (mcp-[mada])  

### Maboresho ya Ubora wa Nyaraka  
- **Ulinganifu na Vipimo vya MCP**: Yaliyomo yote mapya yanarejea MCP Specification 2025-06-18  
- **Mifano ya Lugha Mbalimbali**: Mifano kamili ya msimbo katika C#, TypeScript, na Python  
- **Mwelekeo wa Viwanda**: Mifumo tayari kwa uzalishaji na uunganisho wa wingu la Azure kote  
- **Nyaraka za Mchoro**: Ramani za Mermaid kwa usanifu na mtiririko wa michakato  

## Agosti 18, 2025

### Sasisho Kamili la Nyaraka - Viwango vya MCP 2025-06-18  

#### Mbinu Za Usalama Bora za MCP (02-Security/) - Uboreshaji Kamili wa Kisasa  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Kuandikwa upya kikamilifu kulingana na MCP Specification 2025-06-18  
  - **Mahitaji ya Lazima**: Kuongeza mahitaji ya wazi YAUZA/HAIPASWI kutoka kwa spesifikesheni rasmi na alama za wazi za kuona  
  - **Mbinu 12 Muhimu za Usalama**: Kuandaa upya kutoka kwa orodha ya vitu 15 hadi nyanja kamili za usalama  
    - Usalama wa Tokeni & Uthibitishaji na uunganisho wa mtoa utambulisho wa nje  
    - Usimamizi wa Kikao & Usalama wa Usafirishaji na mahitaji ya usimbaji  
    - Ulinzi wa Vitisho vya AI maalum na uunganisho wa Microsoft Prompt Shields  
    - Udhibiti wa Ufikiaji & Ruhusa kwa kanuni ya udhibiti mdogo  
    - Usalama wa Maudhui & Ufuatiliaji na uunganisho wa Azure Content Safety  
    - Usalama wa Mnyororo wa Ugavi na uhakikisho kamili wa vipengele  
    - Usalama wa OAuth & Kuzuia Confused Deputy pamoja na utekelezaji wa PKCE  
    - Majibu ya Tukio & Urejeshaji na uwezo wa otomatiki  
    - Utimilifu & Utawala na kuendana na kanuni za udhibiti  
    - Udhibiti wa Usalama wa Juu na usanifu wa zero trust  
    - Uunganishaji wa Mfumo wa Usalama wa Microsoft na suluhisho kamili  
    - Mabadiliko ya Kuendelea ya Usalama kwa mbinu zinazobadilika  
  - **Suluhisho za Microsoft za Usalama**: Mwongozo wa uunganisho ulioimarishwa kwa Prompt Shields, Azure Content Safety, Entra ID, na GitHub Advanced Security  
  - **Rasilimali za Utekelezaji**: Viungo vya rasilimali vilivyopangwa kwa mujibu wa Nyaraka Rasmi za MCP, Suluhisho za Usalama Microsoft, Viwango vya Usalama, na Miongozo ya Utekelezaji  

#### Udhibiti wa Usalama wa Juu (02-Security/) - Utekelezaji wa Viwanda  
- **MCP-SECURITY-CONTROLS-2025.md**: Marekebisho kamili na mfumo wa usalama wa viwanda  
  - **Nyangwa 9 Kamili za Usalama**: Kuongeza kutoka udhibiti wa msingi hadi mfumo wa usalama wa viwanda  
    - Uthibitishaji wa Juu & Ruhusa kwa uunganisho wa Microsoft Entra ID  
    - Usalama wa Tokeni & Udhibiti wa Passthrough na uthibitisho kamili  
    - Udhibiti wa Usalama wa Kikao na kuzuia udukuzi  
    - Udhibiti Maalum wa Usalama wa AI dhidi ya sindano za prompt na kuharibu zana  
    - Kuzuia Shambulio la Confused Deputy na usalama wa mtu wa huduma wa OAuth  
    - Usalama wa Utekelezaji wa Zana kwa sandbox na utekaji huru  
    - Udhibiti wa Usalama wa Mnyororo wa Ugavi kwa uhakiki wa utegemezi  
    - Udhibiti wa Ufuatiliaji & Gundizo na uunganisho wa SIEM  
    - Majibu ya Tukio & Urejeshaji na uwezo wa otomatiki  
  - **Mifano ya Utekelezaji**: Kuongeza sehemu za usanidi za YAML na mifano ya msimbo  
  - **Uunganisho wa Suluhisho za Microsoft**: Mzunguko kamili wa huduma za usalama za Azure, GitHub Advanced Security, na usimamizi wa utambulisho wa viwanda  

#### Mada za Usalama Zinazoendelea (05-AdvancedTopics/mcp-security/) - Utekelezaji Tayari kwa Uzalishaji  
- **README.md**: Kuandikwa upya kikamilifu kwa utekelezaji wa usalama wa viwanda  
  - **Ulinganifu na Spesifikesheni ya Sasa**: Sasisho kwa MCP Specification 2025-06-18 na mahitaji ya usalama wa lazima  
  - **Uthibitishaji Ulioboreshwa**: Uunganisho wa Microsoft Entra ID na mifano kamili ya .NET na Java Spring Security  
  - **Uunganisho wa Usalama wa AI**: Utekelezaji wa Microsoft Prompt Shields na Azure Content Safety pamoja na mifano ya Python ya kina  
  - **Kupunguza Vitisho vya Juu**: Mifano kamili ya utekelezaji kwa  
    - Kuzuia Shambulio la Confused Deputy kwa PKCE na uthibitisho wa ridhaa ya mtumiaji  
    - Kuzuia Token Passthrough kwa uthibitisho wa hadhira na usimamizi salama wa tokeni  
    - Kuzuia Udukuzi wa Kikao kwa uunganisho wa usimbaji na uchambuzi wa tabia  
  - **Uunganisho wa Usalama wa Viwanda**: Ufuatiliaji kwa Azure Application Insights, njia za kugundua vitisho, na usalama wa mnyororo wa ugavi  
  - **Orodha ya Kukagua Utekelezaji**: Udhibiti wa usalama ulio wazi wa lazima dhidi ya uliopendekezwa na faida za mfumo wa usalama wa Microsoft  

### Ubora wa Nyaraka & Ulinganifu wa Viwango  
- **Marejeleo ya Spesifikesheni**: Sasisho la marejeleo yote kwa MCP Specification 2025-06-18  
- **Mfumo wa Usalama wa Microsoft**: Mwongozo wa uunganisho ulioimarishwa katika nyaraka zote za usalama  
- **Utekelezaji wa Vitendo**: Kuongeza mifano ya msimbo ya kina katika .NET, Java, na Python na mifumo ya viwanda  
- **Mpangilio wa Rasilimali**: Uainishaji kamili wa nyaraka rasmi, viwango vya usalama, na miongozo ya utekelezaji  
- **Alama za Kuonekana**: Uwekaji wazi wa mahitaji ya lazima dhidi ya mbinu zinazopendekezwa  

#### Dhana za Msingi (01-CoreConcepts/) - Uboreshaji Kamili  
- **Sasisho la Toleo la Itifaki**: Kusasisha marejeleo kwa MCP Specification 2025-06-18 na mfumo wa tarehe (YYYY-MM-DD)  
- **Uboreshaji wa Usanifu**: Maelezo yaliyopanuliwa kuhusu Wenyeji, Wateja, na Seva kuendana na mifano ya usanifu wa MCP ya sasa
  - Wenyeji sasa wamefafanuliwa wazi kama programu za AI zinazoratibu muunganisho ya wateja wa MCP wengi
  - Wateja wameelezewa kama waunganishaji wa itifaki ambao huweka uhusiano wa mtoa huduma mmoja kwa mmoja
  - Watoa huduma wameboreshwa kwa hali za usambazaji wa ndani dhidi ya mbali
- **Urekebishaji wa Msingi**: Marekebisho kamili ya msingi wa seva na wateja
  - Msingi wa Seva: Rasilimali (vyanzo vya data), Maagizo (vik шаблони), Zana (fanyakazi zinazoendeshwa) zikiwa na maelezo ya kina na mifano
  - Msingi wa Mteja: Sampuli (ukamilishaji wa LLM), Uvutaji (maingizo ya mtumiaji), Kuweka kumbukumbu (kudhibiti/kuangalia)
  - Imesasishwa na mifumo ya sasa ya ugunduzi (`*/list`), upokezaji (`*/get`), na utekelezaji (`*/call`)
- **Muundo wa Itifaki**: Iliyoanzishwa modeli ya muundo wa tabaka mbili
  - Tabaka la Data: Msingi wa JSON-RPC 2.0 ikiwa na usimamizi wa mzunguko wa maisha na misingi
  - Tabaka la Usafirishaji: STDIO (ndani) na HTTP Inayoweza Kutoroka kwa SSE (nje) kwa mbinu za usafirishaji
- **Mfumo wa Usalama**: Kanuni kamili za usalama zikiwemo idhini wazi ya mtumiaji, ulinzi wa faragha ya data, usalama wa utekelezaji wa zana, na usalama wa tabaka la usafirishaji
- **Mifumo ya Mawasiliano**: Ujumbe wa itifaki ulisasishwa kuonyesha mchakato wa kuanzisha, ugunduzi, utekelezaji, na utangazo
- **Mifano ya Msimbo**: Mifano ya lugha nyingi imeboreshwa (.NET, Java, Python, JavaScript) kuakisi mifumo ya sasa ya MCP SDK

#### Usalama (02-Security/) - Marekebisho Kamili ya Usalama  
- **Ulinganifu na Viwango**: Ulinganifu kamili na mahitaji ya usalama ya MCP Specification 2025-06-18
- **Mageuzi ya Uthibitishaji**: Mageuzi yaliyoandikwa kutoka seva za OAuth za kawaida hadi utoaji wa utambulisho kwa wasambazaji wa nje (Microsoft Entra ID)
- **Uchambuzi wa Vitisho vya AI**: Ujumuishe mkubwa wa madai ya mashambulio ya AI ya kisasa
  - Matukio yaliyofafanuliwa ya mashambulio ya kutumia maagizo yasiyo sahihi na mifano halisi
  - Mbinu za sumu katika zana na mifumo ya mashambulio ya "rug pull"
  - Uchafu wa dirisha la muktadha na mashambulio ya kuchanganya modeli
- **Suluhisho za Usalama za Microsoft AI**: Ujumuishe kamili wa mfumo wa usalama wa Microsoft
  - Mipaka ya Maagizo ya AI yenye uchunguzi wa hali ya juu, kuwaangazia, na mbinu za utoaji wa alama
  - Mifumo ya Usalama wa Maudhui ya Azure
  - Usalama wa Juu wa GitHub kwa ulinzi wa mnyororo wa usambazaji
- **Kupunguza Vitisho vya Juu**: Udhibiti wa usalama wa kina kwa
  - Kukuwa kwa kikao na matukio maalum ya mashambulio ya MCP na mahitaji ya kitambulisho cha kikao cha kriptografia
  - Matatizo ya "deputy" waliotangazika katika hali za wakala wa MCP na mahitaji ya idhini wazi
  - Udhaifu wa upitishaji wa tokeni na udhibiti wa lazima wa uthibitishaji
- **Usalama wa Mnyororo wa Usambazaji**: Ujumuishe zaidi mnyororo wa usalama wa AI ikiwa ni pamoja na mifano ya msingi, huduma za embeddings, watoa huduma wa muktadha, na API za watu wengine
- **Usalama wa Msingi**: Uingiliano ulioimarishwa na mifumo ya usalama wa kampuni ikiwa ni pamoja na usanifu wa kuamini sifuri na mfumo wa usalama wa Microsoft
- **Mpangilio wa Rasilimali**: Viungo vya rasilimali vimeainishwa kwa aina (Nyaraka Rasmi, Viwango, Utafiti, Suluhisho za Microsoft, Miongozo ya Utekelezaji)

### Kuboresha Ubora wa Nyaraka
- **Malengo ya Kujifunza Yaliyopangwa**: Malengo ya kujifunza yameimarishwa na matokeo maalum na ya utekelezaji
- **Marejeo ya Msingi**: Viungo vimeongezwa kati ya mada zinazohusiana za usalama na dhana kuu
- **Taarifa za Sasa**: Marejeo yote ya tarehe na viungo vya mahitaji yameboreshwa kwa viwango vya sasa
- **Mwongozo wa Utekelezaji**: Miongozo maalum na ya utekelezaji imeongezwa katika sehemu zote mbili

## Julai 16, 2025

### README na Maboresho ya Utungaji
- Muundo wa utungaji wa mtaala kabisa umekuwa upya katika README.md
- Tagu za `<details>` zilibadilishwa kwa muundo wa meza unaopatikana zaidi
- Chaguzi mbadala za mpangilio zimeundwa katika folda mpya "alternative_layouts"
- Mifano ya utungaji wa kadi, mtindo wa kichupo, na mtindo wa accordion imeongezwa
- Sehemu ya muundo wa hazina imesasishwa kujumuisha faili zote za hivi punde
- Sehemu ya "Jinsi ya Kutumia Mtaala Huu" imeboreshwa kwa mapendekezo wazi
- Viungo vya MCP specification vimesasishwa kuelekea URL sahihi
- Sehemu ya Uhandisi wa Muktadha (5.14) imeongezwa kwenye muundo wa mtaala

### Marekebisho ya Mwongozo wa Masomo
- Mwongozo wa masomo umerekebishwa kabisa kulingana na muundo wa hazina wa sasa
- Sehemu mpya za Wateja na Zana za MCP, na Seva Maarufu za MCP zimeongezwa
- Ramani ya Mtaala wa Kuona imesasishwa kuelezea mada zote kwa usahihi
- Maelezo ya Mada Zinazoendelea yameimarishwa kufunika maeneo maalum yote
- Sehemu ya Masomo ya Kesi imesasishwa kuonyesha mifano halisi
- Kumbukumbu hii kamili ya mabadiliko imeongezwa

### Michango ya Jumuiya (06-CommunityContributions/)
- Maelezo ya kina juu ya seva za MCP za uzalishaji picha yameongezwa
- Sehemu ya kina juu ya matumizi ya Claude katika VSCode imeongezwa
- Maelekezo ya usanidi na matumizi ya mteja wa terminal Cline yameongezwa
- Sehemu ya mteja wa MCP imesasishwa kujumuisha chaguzi zote maarufu za mteja
- Mifano ya michango imeboreshwa na sampuli za msimbo sahihi zaidi

### Mada Zinazoendelea (05-AdvancedTopics/)
- Folda zote za mada maalum zimepangwa kwa majina yanayolingana
- Vifaa na mifano ya uhandisi wa muktadha vimeongezwa
- Nyaraka za kuingiza wakala wa Foundry zimeongezwa
- Nyaraka za kuingiza usalama wa Entra ID zimeboreshwa

## Juni 11, 2025

### Uundaji wa Awali
- Toleo la kwanza la mtaala wa MCP kwa Waanzilishi limetolewa
- Muundo wa msingi wa sehemu zote 10 kuu umetengenezwa
- Ramani ya Mtaala wa Kuona kwa utungaji imeanzishwa
- Miradi ya awali ya mfano katika lugha nyingi za programu imeongezwa

### Kuanzia (03-GettingStarted/)
- Mifano ya utekelezaji wa seva ya kwanza imetengenezwa
- Mwongozo wa maendeleo ya mteja umeongezwa
- Maelekezo ya kuunganisha mteja wa LLM yameingizwa
- Nyaraka za kuunganisha VS Code zimeongezwa
- Mifano ya Seva Inayotumwa Tukio (SSE) imeanzishwa

### Dhana Msingi (01-CoreConcepts/)
- Maelezo ya kina ya usanifu wa mteja-seva yameongezwa
- Nyaraka za vipengele vikuu vya itifaki zimeandikwa
- Mifumo ya ujumbe katika MCP imeandikwa

## Mei 23, 2025

### Muundo wa Hazina
- Hazina ilianzishwa na muundo wa folda wa msingi
- Nyaraka za README kwa kila sehemu kuu zilitengenezwa
- Mfumo wa tafsiri ulianzishwa
- Rasilimali za picha na michoro zimeongezwa

### Nyaraka
- README.md ya awali yenye muhtasari wa mtaala ilitengenezwa
- CODE_OF_CONDUCT.md na SECURITY.md ziliwekwa
- SUPPORT.md ilianzishwa na miongozo ya kupata msaada
- Muundo wa mwongozo wa masomo wa awali ulitengenezwa

## Aprili 15, 2025

### Mipango na Mfumo
- Mipango ya awali ya mtaala wa MCP kwa Waanzilishi
- Malengo ya kujifunza na hadhira lengwa yalifafanuliwa
- Muundo wa sehemu 10 wa mtaala ulitayarishwa
- Mfumo wa dhana kwa mifano na masomo ya kesi ulitengenezwa
- Mifano ya awali ya prototaipu kwa dhana kuu ilitengenezwa

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kiarifu cha Kutohusiana**: 
Nyaraka hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kwa usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au kasoro. Nyaraka asili katika lugha yake ya asili inapaswa kuzingatiwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu ya mtu inashauriwa. Hatubebi dhamana kwa kutoelewana au tafsiri potofu zinazotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->