# Usalama wa MCP: Ulinzi Kamili kwa Mifumo ya AI

[![Mazoezi Bora ya Usalama ya MCP](../../../translated_images/sw/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Bonyeza picha hapo juu kutazama video ya somo hili)_

Usalama ni msingi katika muundo wa mifumo ya AI, ndiyo maana tunaiwekea kipaumbele kama sehemu yetu ya pili. Hii inaendana na kanuni ya Microsoft ya **Salama kwa Muundo** kutoka [Mpango wa Mustakabali Salama](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokoli ya Muktadha wa Mfano (Model Context Protocol - MCP) inaleta uwezo mpya wenye nguvu kwa programu zinazoendeshwa na AI huku ikileta changamoto za kipekee za usalama zinazozidi hatari za kawaida za programu. Mifumo ya MCP inakabiliwa na masuala ya usalama yaliyothibitishwa (uliowekwa msimbo salama, uwezo mdogo, usalama wa mnyororo wa ugavi) pamoja na tishio jipya la AI kama vile sindano za haraka, sumu ya zana, kunyanyaswa kwa vikao, mashambulizi ya mwakilishi mkanganyiko, hatari za kuingiza tokeni kwa njia isiyo ya moja kwa moja, na mabadiliko ya uwezo wa kikompyuta yanayobadilika.

Somo hili linachunguza hatari muhimu za usalama katika utekelezaji wa MCP—linashughulikia uthibitishaji, ruhusa, idhini ya ziada, sindano isiyo ya moja kwa moja ya haraka, usalama wa vikao, matatizo ya mwakilishi mkanganyiko, usimamizi wa tokeni, na hatari za mnyororo wa ugavi. Utajifunza udhibiti unaoweza kutekelezwa na mazoea bora ya kupunguza hatari hizi huku ukitumia suluhisho za Microsoft kama Prompt Shields, Azure Content Safety, na GitHub Advanced Security kuimarisha utekelezaji wako wa MCP.

## Malengo ya Kujifunza

Mwisho wa somo hili, utakuwa unaweza:

- **Tambua Vitisho Maalum vya MCP**: Tambua hatari za usalama za kipekee katika mifumo ya MCP zikiwemo sindano za haraka, sumu ya zana, idhini za ziada, kunyanyaswa kwa vikao, matatizo ya mwakilishi mkanganyiko, hatari za kuingiza tokeni kwa njia isiyo ya moja kwa moja, na hatari za mnyororo wa ugavi
- **Tumia Vidhibiti vya Usalama**: Tekeleza mbinu madhubuti ikiwa ni pamoja na uthibitishaji thabiti, ufikiaji wa uwezo mdogo, usimamizi salama wa tokeni, vidhibiti vya usalama vya vikao, na uhakikisho wa mnyororo wa ugavi
- **Tumia Suluhisho za Usalama za Microsoft**: Elewa na tekeleza Microsoft Prompt Shields, Azure Content Safety, na GitHub Advanced Security kwa ulinzi wa mzigo wa MCP
- **Thibitisha Usalama wa Zana**: Tambua umuhimu wa uthibitishaji wa metadata ya zana, ufuatiliaji wa mabadiliko ya mabadiliko, na ulinzi dhidi ya mashambulizi ya sindano zisizo za moja kwa moja
- **Unganisha Mazoea Bora**: Changanya misingi ya usalama iliyowekwa (uliowekwa msimbo salama, kuimarisha seva, imani sifuri) na vidhibiti maalum vya MCP kwa ulinzi kamili

# Msingi wa Usalama wa MCP & Vidhibiti

Utekelezaji wa kisasa wa MCP unahitaji mbinu za usalama zenye tabaka zinazoangazia usalama wa programu za kawaida pamoja na tishio maalum za AI. Maelezo ya MCP yanayobadilika kwa haraka yanaendelea kuboresha vidhibiti vya usalama, kuwezesha ujumuishaji bora na usanifu za usalama wa mashirika na mazoea bora yaliyowekwa.

Utafiti kutoka [Ripoti ya Ulinzi wa Kidigitali ya Microsoft](https://aka.ms/mddr) unaonyesha kwamba **asilimia 98 ya uvunjizi ulioarifiwa ungeezekana kwa mazoea thabiti ya usalama**. Mkakati bora wa ulinzi unachanganya mazoea ya msingi ya usalama na vidhibiti maalum vya MCP—mbinu za msingi za usalama bado ndizo zinazopunguza kwa kiasi kikubwa hatari za usalama.

## Taswira ya Hali ya Usalama ya Sasa

> **Kumbuka:** Taarifa hii inaakisi viwango vya usalama vya MCP kuanzia **5 Februari, 2026**, vimeambatana na **Maelezo ya MCP 2025-11-25**. Protokoli ya MCP inaendelea kubadilika kwa kasi, na utekelezaji ujao unaweza kuleta mifumo mipya ya uthibitishaji na vidhibiti vilivyoboreshwa. Kila wakati rejea [Maelezo ya MCP](https://spec.modelcontextprotocol.io/), [ghala la MCP GitHub](https://github.com/modelcontextprotocol), na [nyaraka za mazoea bora ya usalama](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) kwa mwongozo wa hivi karibuni.

> **Katika siku zijazo:** Mteja wa toleo la `2026-07-28` utaimarisha zaidi idhini — wateja lazima wahakikishe kipengele `iss` kwenye majibu ya idhini (RFC 9207), watangaze `application_type` ya OpenID Connect wakati wa Ujisajili wa Mteja wa Kibonye, na wafunge vyeti vilivyosajiliwa kwenye seva ya idhini inayotoa. Angalia [Nini Kinabadilika katika MCP: Mteja wa Toleo la 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) kwa orodha kamili ya SEPs za idhini.

## 🏔️ Warsha ya Kikao cha Usalama cha MCP (Sherpa)

Kwa **mafunzo ya usalama ya vitendo**, tunapendekeza sana **Warsha ya Kikao cha Usalama cha MCP** (Sherpa) - safari ya kina ya kuongoza usalama wa seva za MCP katika Microsoft Azure.

### Muhtasari wa Warsha

[Warsha ya Kikao cha Usalama cha MCP](https://azure-samples.github.io/sherpa/) hutoa mafunzo halisi na yanayotekelezeka ya usalama kupitia mbinu iliyothibitishwa ya "udhaifu → shambulizi → suluhisho → uhakiki". Utachukua:

- **Jifunze kwa Kuvunja Mambo**: Pata uzoefu wa udhaifu kwa kuchukua faida ya seva zilizotengenezwa kwa makusudi kuwa hatarishi
- **Tumia Usalama wa Azure Asili**: Tumia Azure Entra ID, Key Vault, Usimamizi wa API, na Usalama wa Maudhui ya AI
- **Fuata Ulinzi wa Kina**: Endelea kupitia kambi zinazojenga tabaka kamili za usalama
- **Tumia Viwango vya OWASP**: Kila mbinu inaendana na [MWONGOZO wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Pata Msimbo wa Uzalishaji**: Itaacha na utekelezaji unaofanya kazi na umejaribiwa

### Njia ya Safari

| Kambi | Mwelekeo | Hatari za OWASP Zilizofunikwa |
|------|-------|---------------------|
| **Kambi ya Msingi** | Misingi ya MCP & udhaifu wa uthibitishaji | MCP01, MCP07 |
| **Kambi 1: Utambulisho** | OAuth 2.1, Utambulisho wa Usimamizi wa Azure, Key Vault | MCP01, MCP02, MCP07 |
| **Kambi 2: Lango** | Usimamizi wa API, Anuani Binafsi, uratibu | MCP02, MCP06, MCP07, MCP09 |
| **Kambi 3: Usalama wa I/O** | Sindano za haraka, ulinzi wa PII, usalama wa maudhui | MCP03, MCP05, MCP06, MCP10 |
| **Kambi 4: Ufuatiliaji** | Uchambuzi wa Magari, dashibodi, ugunduzi wa tishio | MCP04, MCP08 |
| **Kikao Kikuu** | Mtihani wa ushirikiano wa Timu Nyekundu / Timu Blu | Zote |

**Anza sasa**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Hatari Kumi Zaandamizi za Usalama za MCP za OWASP

[MWONGOZO wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/) unaelezea hatari kumi muhimu zaidi za usalama kwa utekelezaji wa MCP:

| Hatari | Maelezo | Kinga ya Azure |
|------|-------------|------------------|
| **MCP01** | Usimamizi mbaya wa Tokeni & Kufichuliwa kwa Siri | Azure Key Vault, Utambulisho Uliofadhiliwa |
| **MCP02** | Kupanda Kiwango cha Uwezo kwa Kuongeza Mipaka | RBAC, Ufikiaji wa Masharti |
| **MCP03** | Sumu ya Zana | Uthibitishaji wa zana, uhakikisho wa uadilifu |
| **MCP04** | Mashambulizi ya Mnyororo wa Ugavi wa Programu & Uharibifu wa Kutegemea | GitHub Advanced Security, skanning ya kutegemea |
| **MCP05** | Sindano ya Amri & Utekelezaji | Uthibitishaji wa ingizo, kuweka kwenye sanduku la usalama (sandboxing) |
| **MCP06** | Kubadilishwa kwa Mtiririko wa Kusudio | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Uthibitishaji na Idhini Isiyotosha | Azure Entra ID, OAuth 2.1 na PKCE |
| **MCP08** | Ukosefu wa Ukaguzi na Telemetri | Azure Monitor, Application Insights |
| **MCP09** | Seva za Kivuli za MCP | Usimamizi wa API Center, kutengwa kwa mtandao |
| **MCP10** | Sindano za Muktadha & Kugawana Kupita Kiasi | Uainishaji wa data, kufichuliwa kidogo |

### Maendeleo ya Uthibitishaji wa MCP

Maelezo ya MCP yamebadilika sana katika njia yake ya uthibitishaji na idhini:

- **Njia ya Awali**: Maelezo ya awali yalihitaji watengenezaji kutekeleza seva za uthibitishaji maalum, ambapo seva za MCP zilikuwa kama Seva za Idhini za OAuth 2.0 zinazosimamia uthibitishaji wa mtumiaji moja kwa moja
- **Kiwango cha Sasa (2025-11-25)**: Maelezo yaliyosasishwa yanaruhusu seva za MCP kuzua uthibitishaji kwa watoa huduma wa utambulisho wa nje (kama Microsoft Entra ID), kuboresha msimamo wa usalama na kupunguza ugumu wa utekelezaji
- **Usalama wa Tabaka la Usafirishaji**: Usaidizi ulioimarishwa kwa mifumo salama ya usafirishaji na mifumo thabiti ya uthibitishaji kwa muunganisho wa ndani (STDIO) na wa mbali (Streamable HTTP)

## Usalama wa Uthibitishaji na Idhini

### Changamoto za Sasa za Usalama

Utekelezaji wa kisasa wa MCP unakabiliwa na changamoto kadhaa za uthibitishaji na idhini:

### Hatari na Njia za Mashambulizi

- **Mantiki Ya Idhini Isiyofaa**: Utekelezaji mbaya wa idhini katika seva za MCP unaweza kufichua data nyeti na kutenda usalama wa ufikiaji vibaya
- **Uvunjaji wa Tokeni ya OAuth**: Ujambazi wa tokeni za seva ya MCP hutoa wavamizi uwezo wa kujifanya seva na kufikia huduma za chini
- **Hatari za Kuingiza Tokeni Kupitia**: Uendeshaji usiofaa wa tokeni huunda njia za kupita vidhibiti vya usalama na mapungufu ya uwajibikaji
- **Idhini Zaidi**: Seva za MCP zenye ruhusa nyingi kupita kiasi huvunja kanuni ya uwezo mdogo na kupanua eneo la mashambulizi

#### Kuingiza Tokeni Kupitia: Kitendo Kisicho Designi

**Kuingiza tokeni kupitia kwa dhahania ni marufuku kabisa** katika maelezo ya sasa ya idhini ya MCP kwa sababu za usalama kali:

##### Kupitisha Vidhibiti vya Usalama
- Seva za MCP na API za chini hufanya vidhibiti muhimu vya usalama (kupunguza kiwango, uthibitishaji wa maombi, ufuatiliaji wa trafiki) vinavyoitegemea uthibitishaji sahihi wa tokeni
- Matumizi ya kuanzia mteja moja kwa API hutarajia vidhibiti hivi muhimu, na hivyo kudhoofisha usanifu wa usalama

##### Changamoto za Uwajibikaji na Ukaguzi  
- Seva za MCP haziwezi kutofautisha kati ya wateja wanaotumia tokeni zilizopeanwa na mtoaji wa juu, jambo linalovuruga njia za ukaguzi
- Rekodi za seva za rasilimali za chini zinaonyesha asili potofu za maombi badala ya vyombo halisi vya seva za MCP
- Upelelezi wa matukio na ukaguzi wa utendaji vinakuwa vigumu sana

##### Hatari za Kutokwa kwa Data
- Dai zisizothibitishwa za tokeni huruhusu wahalifu wenye tokeni waliziiba kutumia seva za MCP kama madalali wa kutokwa data
- Uvunjaji wa mipaka ya kuaminika huruhusu mifumo isiyoidhinishwa kupitia vidhibiti vya usalama vilivyokusudiwa

##### Njia za Mashambulizi za Huduma Nyingi
- Tokeni zilizoathirika zinazokubaliwa na huduma nyingi huruhusu harakati sambamba kati ya mifumo inayounganishwa
- Matarajio ya kuaminiana kati ya huduma yanaweza kuvunjwa wakati asili ya tokeni haiwezi kuthibitishwa

### Vidhibiti na Upatanishi wa Usalama

**Mahitaji Muhimu ya Usalama:**

> **LAZIMU**: Seva za MCP **HAZIPASWI** kukubali tokeni yoyote ambayo haikutolewa maalum kwa seva ya MCP

#### Vidhibiti vya Uthibitishaji na Idhini

- **Ukaguzi Mkali wa Idhini**: Fanya ukaguzi wa kina wa mantiki ya idhini ya seva za MCP kuhakikisha watumiaji na wateja waliokusudiwa tu ndio wanaweza kufikia rasilimali nyeti
  - **Mwongozo wa Utekelezaji**: [Usimamizi wa API wa Azure kama Lango la Uthibitishaji kwa Seva za MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Uingizaji wa Utambulisho**: [Kutumia Microsoft Entra ID kwa Uthibitishaji wa Seva za MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Usimamizi Salama wa Tokeni**: Tekeleza [mazoea bora ya uthibitishaji na maisha ya tokeni ya Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Thibitisha dai la hadhira ya tokeni linafanana na utambulisho wa seva ya MCP
  - Tekeleza mzunguko sahihi wa tokeni na sera za ukomo wa muda
  - Zuia mashambulizi ya kurudia tokeni na matumizi yasiyoidhinishwa

- **Uhifadhi Salama wa Tokeni**: Hifadhi salama ya tokeni kwa usimbaji fiche wakati wa kuhifadhi na kusafirisha
  - **Mazoea Bora**: [Mwongozo wa Uhifadhi Salama wa Tokeni na Usimbaji](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Utekelezaji wa Udhibiti wa Ufikiaji

- **Kanuni ya Udhibitishaji Mdogo Zaidi**: Wape seva za MCP ruhusa chache kabisa zinazohitajika kwa utendakazi uliokusudiwa
  - Rejelea mara kwa mara idhini na sasisho ili kuzuia ongezeko la ruhusa
  - **Nyaraka za Microsoft**: [Ufikiaji Salama wa Udhibitishaji Mdogo Zaidi](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Udhibiti wa Ufikiaji Unaotegemea Kazi (RBAC)**: Tekeleza ugawaji wa kazi kwa undani
  - Funga kazi kwa karibu kwa rasilimali na vitendo maalum
  - Epuka ruhusa pana au zisizohitajika zinazopanua eneo la mashambulizi

- **Ufuatiliaji Endelevu wa Ruhusa**: Tekeleza ukaguzi na ufuatiliaji unaoendelea wa ufikiaji
  - Fuatilia mifumo ya matumizi ya ruhusa kwa kasoro
  - Tafutia na tatua haraka ruhusa nyingi au zisizotumika

## Vitisho Maalum vya Usalama vya AI

### Sindano za Haraka na Mashambulizi ya Udhibiti wa Zana

Utekelezaji wa kisasa wa MCP unakabiliwa na njia tata za mashambulizi maalum za AI ambazo mbinu za usalama za kawaida haiwezi kuzitatua kikamilifu:

#### **Sindano Isiyo ya Moja kwa Moja (Sindano ya Haraka ya Mikoa Mbalimbali)**

**Sindano Isiyo ya Moja kwa Moja** ni moja ya udhaifu muhimu kabisa katika mifumo ya AI inayotumia MCP. Wavamizi hujificha maelekezo mabaya ndani ya maudhui ya nje—nyaraka, kurasa za wavuti, barua pepe, au vyanzo vya data—ambayo mifumo ya AI husindikiza kisha kama maagizo halali.

**Mifano ya Mashambulizi:**
- **Sindano Iliyobeba Nyaraka**: Maelekezo mabaya yaliyofichwa katika nyaraka zinazosindikwa ambazo huchochea matendo ya AI yasiyokusudiwa
- **Matumizi ya Maudhui ya Wavuti**: Kurasa za wavuti zilizoathirika ambazo zina sindano zilizojificha zinayobadilisha tabia ya AI wakati zinapokopwa
- **Mashambulizi ya Barua Pepe**: Sindano mbaya katika barua pepe zinazowafanya wasaidizi wa AI kuficha habari au kufanya matendo yasiyoruhusiwa
- **Uchafu wa Vyanzo vya Data**: Hifadhidata au API zilizoathirika zinatuma maudhui machafu kwa mifumo ya AI

**Athari Halisi:** Mashambulizi haya yanaweza kusababisha kutokwa kwa data, uvunjaji wa faragha, uzalishaji wa maudhui hatarishi, na udanganyifu wa mwingiliano wa watumiaji. Kwa uchambuzi wa kina, angalia [Sindano ya Haraka katika MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Mchoro wa Mashambulizi ya Sindano ya Haraka](../../../translated_images/sw/prompt-injection.ed9fbfde297ca877.webp)

#### **Mashambulizi ya Sumu ya Zana**

**Sumu ya Zana** inalenga metadata inayobainisha zana za MCP, ikitumia jinsi LLMs zinavyotoa maana maelezo na vigezo vya zana kufanya maamuzi ya utekelezaji.

**Mbinu za Mashambulizi:**
- **Udanganyifu wa Metadata**: Wavamizi huingiza maelekezo mabaya ndani ya maelezo ya zana, ufafanuzi wa vigezo, au mifano ya matumizi
- **Maelekezo Yasiyoonekana**: Sindano zilizofichwa katika metadata ya zana zinazosindikwa na modeli za AI lakini hazionekani kwa watumiaji wa binadamu
- **Mabadiliko ya Zana Yanayobadilika ("Rug Pulls")**: Zana zilizotambulishwa na watumiaji hubadilishwa baadaye kufanya matendo mabaya bila uelewa wa mtumiaji
- **Sindano za Vigezo**: Maudhui mabaya yaliyojificha katika mifumo ya vigezo vya zana vinavyoathiri tabia ya modeli


**Hatari za Seva zilizokuwa Mwenyeji**: Seva za MCP za mbali zinatoa hatari zilizoongezeka kwani maelezo ya zana yanaweza kusasishwa baada ya idhini ya awali ya mtumiaji, kutengeneza hali ambapo zana zilizokuwa salama awali zinakuwa hatari. Kwa uchambuzi wa kina, angalia [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/sw/tool-injection.3b0b4a6b24de6bef.webp)

#### **Njia Za ziada za Mashambulizi ya AI**

- **Sindano ya Agizo La Mikoa Mbalimbali (XPIA)**: Mashambulizi ya hali ya juu yanayotumia maudhui kutoka mikoa tofauti kuepuka udhibiti wa usalama
- **Marekebisho ya Uwezo wa Muda Halisi**: Mabadiliko ya wakati halisi kwenye uwezo wa zana zinazotoroka tathmini za awali za usalama
- **Uchomaji wa Dirisha la Muktadha**: Mashambulizi yanayodanganya madirisha makubwa ya muktadha kuficha maelekezo hatari
- **Mashambulizi ya Kuchanganyikiwa kwa Mfano**: Kutumia vikwazo vya mfano kuunda tabia zisizotarajiwa au zisizo salama


### Athari za Hatari ya Usalama wa AI

**Matokeo ya Athari Kuu:**
- **Utoaji Haramu wa Data**: Kupata na kuiba data nyeti za shirika au za mtu binafsi bila idhini
- **Uvunjifu wa Faragha**: Kufichuliwa kwa taarifa za kutambua binafsi (PII) na data nyeti za biashara  
- **Udanganyifu wa Mfumo**: Marekebisho yasiyotakiwa kwenye mifumo muhimu na taratibu za kazi
- **Uzii wa Cheo**: Ukomo wa tokeni za uthibitishaji na nyaraka za huduma
- **Harakati za Usambazaji**: Matumizi ya mifumo ya AI iliyoharibiwa kama njia za kushambulia mtandao kwa upana

### Suluhisho za Usalama za AI za Microsoft

#### **Milinda ya Maagizo ya AI: Ulinzi wa Juu dhidi ya Mashambulizi ya Sindano**

Microsoft **Milinda ya Maagizo ya AI** hutoa ulinzi wa kina dhidi ya mashambulizi ya sindano ya maagizo ya moja kwa moja na yasiyo ya moja kwa moja kupitia tabaka nyingi za usalama:

##### **Mifumo Mikuu ya Ulinzi:**

1. **Utambuzi wa Juu & Kuchuja**
   - Algoriti za mashine kujifunza na mbinu za NLP hutambua maagizo hatari katika maudhui ya nje
   - Uchambuzi wa wakati halisi wa nyaraka, kurasa za wavuti, barua pepe, na vyanzo vya data kwa vitisho vilivyojificha
   - Uelewa wa muktadha wa mifumo halali dhidi ya mifumo hatari ya maagizo

2. **Mbinu za Kuweka Mwangaza**  
   - Hutofautisha maagizo ya mfumo yaliyothibitishwa na maingizo ya nje yanayoweza kuwa yamevamiwa
   - Mbinu za kubadilisha maandishi zinazoongeza umuhimu wa mfano huku zinaz separating maudhui hatari
   - Husaidia mifumo ya AI kudumisha hierarchy sahihi ya maagizo na kupuuza amri zilizochomwa

3. **Mifumo ya Delimiter & Datamarking**
   - Ufafanuzi wazi wa mipaka kati ya ujumbe wa mfumo wa kuaminika na maandishi ya maingizo ya nje
   - Alama maalum zinaonyesha mipaka kati ya vyanzo vya data vinavyoaminika na visivyoaminika
   - Tofauti wazi huzuia mchanganyiko wa maagizo na utekelezaji usioidhinishwa wa amri

4. **Ujasusi wa Vitisho Muda Mzima**
   - Microsoft inaangalia mara kwa mara mifumo mpya ya mashambulizi na kusasisha ulinzi
   - Utafutaji wa vitisho kwa utangulizi kwa mbinu mpya za sindano na njia za mashambulizi
   - Sasisho za mara kwa mara za mifano ya usalama kudumisha ufanisi dhidi ya vitisho vinavyobadilika

5. **Muungano wa Usalama wa Maudhui wa Azure**
   - Sehemu ya kifurushi kamili cha Azure AI Content Safety
   - Utambuzi wa ziada kwa jaribio la jailbreak, maudhui hatari, na ukiukaji wa sera za usalama
   - Udhibiti wa usalama uliounganishwa katika vipengele vyote vya maombi ya AI

**Rasilimali za Utekelezaji**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/sw/prompt-shield.ff5b95be76e9c78c.webp)


## Vitisho vya Usalama vya MCP vya Juu

### Udhaifu wa Kupora Kikao

**Kupora kikao** ni njia muhimu ya mashambulizi katika utekelezaji wa MCP unaoshikilia hali ambapo wahalifu wanapata na kutumia vibali halali vya kikao kuigiza wateja na kufanya hatua zisizoidhinishwa.

#### **Mifano ya Mashambulizi na Hatari**

- **Sindano ya Maagizo ya Kupora Kikao**: Washambuliaji wenye vitambulisho vya kikao waliovamiwa wanasukuma matukio hatari kwenye seva zinazoshirikisha hali ya kikao, yanaweza kusababisha matendo hatari au kupata data nyeti
- **Kuigiza Moja kwa Moja**: Vitambulisho vya kikao vilivyoporwa vinawezesha simu za moja kwa moja kwa seva za MCP bila uthibitishaji, zikitumia washambuliaji kama watumiaji halali
- **Mtiririko wa Resumable Uliyovamiwa**: Washambuliaji wanaweza kusitisha maombi mapema, wakisababisha wateja halali kuendelea na maudhui yanayoweza kuwa hatari

#### **Udhibiti wa Usalama kwa Usimamizi wa Kikao**

**Mahitaji Muhimu:**
- **Uhakiki wa Idhini**: Seva za MCP zinatakiwa kuthibitisha MAOMBI YOTE yajayo na HAZITUMII kikao kuaminika kwa uthibitishaji
- **Uundaji Salama wa Kikao**: Tumia vitambulisho vya kikao vinaoaminika kivitambulisho vya mfumo wa usimbaji fiche na visivyosababishwa kwa mpangilio maalum
- **Uunganishaji wa Vitambulisho vya Kila Mtumiaji**: Funga vitambulisho vya kikao na taarifa za mtumiaji kupitia muundo kama `<user_id>:<session_id>` kuzuia matumizi mabaya ya kikao kwa watumiaji tofauti
- **Usimamizi wa Mzunguko wa Kikao**: Tekeleza ukomo sahihi, mzunguko, na kuvunjika ili kupunguza nyuso za udhaifu
- **Usalama wa Usafirishaji**: Lazima HTTPS kwa mawasiliano yote ili kuzuia wizi wa vitambulisho vya kikao

### Tatizo la Msimamizi Kuchanganyikiwa

Tatizo la **msimamizi kuchanganyikiwa** hutokea wakati seva za MCP zinafanya kazi kama mawakala wa uthibitishaji kati ya wateja na huduma za wahudumu wa tatu, zikitengeneza fursa za kuepuka udhibiti wa idhini kwa kutumia vitambulisho vya mteja visivyo badilika.

#### **Mbinu za Mashambulizi na Hatari**

- **Kupita Mipaka kwa Mkuki wa Vidakuzi**: Uthibitishaji wa mtumiaji uliopita huunda vidakuzi vya idhini vinavyotumika na washambuliaji kupitia maombi hatari ya idhini yenye URI za marejeleo zilizobuniwa
- **Uzii wa Msimbo wa Idhini**: Vidakuzi vya idhini vilivyo tayari vinaweza kusababisha seva za idhini kuruka skrini za idhini, zikielekeza misimbo kwenye sehemu zinazodhibitiwa na mwashambuliaji  
- **Upatikanaji Usioidhinishwa wa API**: Msimbo wa idhini ulioporwa unaruhusu kubadilishana tokeni na kuigiza mtumiaji bila idhini wazi

#### **Mikakati ya Kupunguza Hatari**

**Udhibiti wa Lazima:**
- **Mahitaji Maalum ya Idhini**: Seva ya mrundikano wa MCP kutumia vitambulisho vya mteja visivyo badilika **INATOSHA** kupata idhini ya mtumiaji kwa kila mteja aliyejiandikisha kwa nguvu
- **Utekelezaji wa Usalama wa OAuth 2.1**: Fuata mbinu bora za usalama wa OAuth ikiwemo PKCE kwa maombi yote ya idhini
- **Uthibitishaji Mkali wa Mteja**: Tekeleza uthibitishaji mkali wa URI za marejeleo na vitambulisho vya mteja ili kuzuia matumizi mabaya

### Udhaifu wa Kupitisha Tokeni  

Udhaifu wa **kupitisha tokeni** ni mfano wa wazi ambapo seva za MCP zinakubali tokeni za wateja bila uhakiki sahihi na kuzipitisha kwa API zinazofuata, kinyume na miongozo ya idhini ya MCP.

#### **Matokeo ya Usalama**

- **Uzikwepaji wa Udhibiti**: Matumizi ya moja kwa moja ya tokeni kutoka mteja hadi API hupita juu ya udhibiti wa viwango, uhakiki, na ufuatiliaji muhimu
- **Uharibifu wa Rejeleo ya Ukaguzi**: Tokeni zilizotolewa kwa njia ya juu hufanya utambuzi wa mteja usiwezekane, kuvunja uwezo wa uchunguzi wa tukio
- **Utoaji Haramu wa Data kwa Seva za Ndani**: Tokeni zisizothibitishwa zinawawezesha wahalifu kutumia seva kama mawakala kwa upatikanaji usioidhinishwa wa data
- **Uvunjifu wa Mipaka ya Kuaminika**: Huduma za chini ya mtandao zinaweza kushambuliwa wakati asili za tokeni haziwezi kuthibitishwa
- **Upanuzi wa Mashambulizi ya Huduma Nyingi**: Tokeni zilizoathirika zinakubalika kupitia huduma nyingi kuwezesha harakati za upande-kwenye-kushoto

#### **Udhibiti wa Usalama Unaotakiwa**

**Mahitaji Yasiyokubaliwa:**
- **Uhakiki wa Tokeni**: Seva za MCP **HAZITAKUBALI** tokeni zisizotolewa wazi kwa seva ya MCP
- **Uhakiki wa Waudience**: Daima thibitisha dai la wasikilizaji wa tokeni linaendana na kitambulisho cha seva ya MCP
- **Mzunguko Sahihi wa Tokeni**: Tekeleza tokeni za muda mfupi kwa mikakati salama ya mzunguko


## Usalama wa Mnyororo wa Ugavi kwa Mifumo ya AI

Usalama wa mnyororo wa ugavi umeendelea kutoka kwa utegemezi wa programu za jadi hadi kugusa mfumo mzima wa AI. Utekelezaji wa MCP wa kisasa lazima uhakikishe na kufuatilia kwa ukali vipengele vyote vinavyohusiana na AI, kwani kila kimoja huleta udhaifu unaoweza kuathiri uadilifu wa mfumo.

### Vipengele Vilivyopanuliwa vya Mnyororo wa Ugavi wa AI

**Utegemezi wa Tradisheni wa Programu:**
- Maktaba na mifumo ya chanzo huria
- Picha za kontena na mifumo ya msingi  
- Zana za maendeleo na mizunguko ya kujenga
- Vipengele na huduma za miundombinu

**Vipengele Maalum vya Mnyororo wa Ugavi wa AI:**
- **Mifano ya Misingi**: Mifano iliyopangwa kabla kutoka kwa watoa huduma mbalimbali inayohitaji uthibitisho wa asili
- **Huduma za Kuingiza**: Huduma za nje za kuunda vector na utaftaji wa maana
- **Watoa Muktadha**: Vyanzo vya data, hifadhidata za maarifa, na hazina za nyaraka  
- **API za Wahudumu wa Tatu**: Huduma za AI za nje, mitambo ya masomo ya mashine, na vituo vya usindikaji data
- **Vifaa vya Mfano**: Mizani, usanidi, na aina zilizopangwa marekebisho ya mfano
- **Vyanzo vya Data za Mafunzo**: Seti za data zinazotumiwa kwa mafunzo na marekebisho ya mifano

### Mikakati Kamili ya Usalama wa Mnyororo wa Ugavi

#### **Uthibitishaji wa Vipengele & Kuaminika**
- **Uhakiki wa Asili**: Thibitisha chanzo, leseni, na uadilifu wa vipengele vyote vya AI kabla ya kuunganishwa
- **Tathmini ya Usalama**: Fanya skanning za udhaifu na mapitio ya usalama kwa mifano, vyanzo vya data, na huduma za AI
- **Uchambuzi wa Hadhi ya Huduma**: Tathmini rekodi ya usalama na mbinu za watoa huduma za AI
- **Uhakiki wa Uzingatiaji**: Hakikisha vipengele vyote vinakidhi mahitaji ya usalama na mifumo ya udhibiti ya shirika

#### **Mizunguko Salama ya Utekelezaji**  
- **Usalama wa CI/CD Otomatiki**: Unganisha uchunguzi wa usalama katika mizunguko otomatiki ya utekelezaji
- **Uadilifu wa Vifaa**: Tekeleza uthibitisho wa usimbuaji kwa vifaa vyote vilivyotumwa (msimbo, mifano, usanidi)
- **Utekelezaji wa Awamu**: Tumia mikakati ya utekelezaji wa hatua kwa hatua na uhakiki wa usalama kila hatua
- **Hifadhi za Vifaa Zinazoaminika**: Tuma tu kutoka kwa rejista na hifadhi zilizo thibitishwa kuwa salama

#### **Ufuatiliaji na Jibiko la Muda Mzima**
- **Uchunguzi wa Utegemezi**: Fuata kwa karibu udhaifu wote wa programu na vipengele vya AI
- **Ufuatiliaji wa Mfano**: Tathmini ya kina ya tabia ya mfano, mabadiliko ya utendaji, na mabadiliko ya usalama
- **Kufuata Afya ya Huduma**: Angalia huduma za AI za nje kwa upatikanaji, matukio ya usalama, na mabadiliko ya sera
- **Kuunganisha Ujasusi wa Vitisho**: Jumuisha taarifa za vitisho maalum kwa hatari za usalama wa AI na ML

#### **Udhibiti wa Upatikanaji & Rasilimali Chache**
- **Ruhusa za Kiwango cha Kipengele**: Zuia upatikanaji wa mifano, data, na huduma kulingana na hitaji la biashara
- **Usimamizi wa Akaunti za Huduma**: Tekeleza akaunti maalum za huduma zenye ruhusa chache za lazima
- **Kugawanya Mtandao**: Tenganisha vipengele vya AI na punguza upatikanaji wa mtandao kati ya huduma
- **Udhibiti wa Kituo cha API**: Tumia vituo vya API vilivyolenga kudhibiti na kufuatilia upatikanaji wa huduma za nje za AI

#### **Majibu ya Tukio & Urejeshaji**
- **Taribisho za Haraka za Majibu**: Mchakato wa kuondoa au kubadilisha vipengele vya AI vilivyoathirika
- **Mizunguko ya Cheo**: Mifumo ya otomatiki ya kuzungusha siri, funguo za API, na nyaraka za huduma
- **Uwezo wa Kurudisha**: Uwezo wa haraka kurudisha matoleo yaliyothibitishwa kuwa salama ya vipengele vya AI
- **Urejeshaji wa Mvunjiko wa Mnyororo wa Ugavi**: Taratibu maalum za majibu kwa uvunjifu wa huduma za AI wa juu

### Zana za Usalama za Microsoft & Muungano

**GitHub Advanced Security** hutoa ulinzi kamili wa mnyororo wa ugavi ikijumuisha:
- **Uchunguzi wa Siri**: Ugunduzi wa otomatiki wa nyaraka za siri, funguo za API, na tokeni katika hifadhidata
- **Uchunguzi wa Utegemezi**: Tathmini ya udhaifu wa utegemezi wa chanzo huria na maktaba
- **Uchambuzi wa CodeQL**: Uchambuzi wa kimsingi wa msimbo kwa udhaifu wa usalama na masuala ya uandishi wa msimbo
- **Maarifa ya Mnyororo wa Ugavi**: Uwazi wa afya ya utegemezi na hali ya usalama

**Muungano wa Azure DevOps & Azure Repos:**
- Uunganisho wa utambuzi wa usalama usio na mshono katika mazingira ya maendeleo ya Microsoft
- Ukaguzi wa usalama wa kiotomatiki katika mizunguko ya Azure kwa mizigo ya AI
- Utekelezaji wa sera kwa usalama wa vipengele vya AI

**Mazoezi ya Ndani ya Microsoft:**
Microsoft inatekeleza mbinu za kina za usalama wa mnyororo wa ugavi katika bidhaa zote. Jifunze kuhusu mbinu zilizothibitishwa katika [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Mazoezi Bora ya Usalama ya Msingi

Utekelezaji wa MCP unarithi na kujenga juu ya hali ya usalama ya shirika lako iliyopo. Kuimarisha mazoezi ya msingi ya usalama huongeza sana usalama wa jumla wa mifumo ya AI na utekelezaji wa MCP.

### Misingi Mikuu ya Usalama

#### **Mazoezi Salama ya Maendeleo**
- **Uzingatiaji wa OWASP**: Linda dhidi ya udhaifu wa programu za wavuti za [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Ulinzi Maalum kwa AI**: Tekeleza udhibiti kwa [OWASP Top 10 kwa LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Usimamizi Salama wa Siri**: Tumia hazina maalum kwa tokeni, funguo za API, na data nyeti za usanidi
- **Usimbaji fiche Kuanzia Mwisho kwa Mwisho**: Tekeleza mawasiliano salama katika vipengele vyote vya programu na mtiririko wa data
- **Uhakiki wa Ingizo**: Hakiki kwa makini viingilio vyote vya mtumiaji, vigezo vya API, na vyanzo vya data

#### **Nguvu za Miundombinu**
- **Uthibitishaji wa Vipengee Mbalimbali**: Lazima MFA kwa akaunti zote za utawala na huduma
- **Usimamizi wa Patch**: Utafutaji wa kiotomatiki na ufungeno kwa mfumo wa uendeshaji, mifumo, na utegemezi  
- **Muungano wa Mtoa Utambulisho**: Usimamizi wa utambulisho uliounganishwa kupitia watoa huduma wa utambulisho wa kitaasisi (Microsoft Entra ID, Active Directory)
- **Ugawaji wa Mtandao**: Kutenganisha vipengele vya MCP kwa kupunguza nafasi za harakati za upande wa mtandao
- **Kanuni ya Ruhusa Chache Zaidi**: Ruhusa chache zinazohitajika kwa vipengele vyote vya mfumo na akaunti

#### **Ufuatiliaji na Utambuzi wa Usalama**
- **Upangaji Kamili wa Matukio**: Upangaji wa kina wa shughuli za maombi ya AI, ikiwa ni pamoja na muingiliano wa mteja-mtandao wa MCP
- **Muungano wa SIEM**: Usimamizi wa habari na matukio ya usalama wa wingu kwa utambuzi wa uvunjifu
- **Uchanganuzi wa Tabia**: Ufuatiliaji unaotumia AI kugundua mifumo isiyo ya kawaida katika tabia za mfumo na mtumiaji
- **Ujasusi wa Vitisho**: Kuunganisha chanzo cha nje cha taarifa za vitisho na viashiria vya uvunjaji (IOC)
- **Majibu ya Tukio**: Taratibu zilizo wazi kwa utambuzi, majibu, na urejeshaji wa tukio la usalama

#### **Muundo wa Kuamini Sifuri**
- **Kamwe Usiamini, Daima Thibitisha**: Uhakiki wa kudumu wa watumiaji, vifaa, na muunganisho wa mtandao
- **Ugawaji Mdogo wa Mtandao**: Udhibiti wa kina wa mtandao unaotenganisha mzigo na huduma binafsi
- **Usalama Unaolenga Utambulisho**: Sera za usalama zinazoelekezwa kwa utambulisho uliothibitishwa badala ya mahali pa mtandao
- **Tathmini Muda Mzima ya Hatari**: Tathmini ya hali ya usalama inayobadilika kulingana na muktadha wa sasa na tabia
- **Udhibiti wa Ufikiaji wa Masharti**: Udhibiti wa upatikanaji unaobadilika kulingana na sababu za hatari, eneo, na kuaminika kwa kifaa

### Michoro ya Muungano wa Shirika

#### **Muungano wa Mazingira ya Usalama wa Microsoft**
- **Microsoft Defender for Cloud**: Usimamizi wa hali ya usalama wa wingu kwa kina
- **Azure Sentinel**: SIEM na SOAR asilia za wingu kwa ulinzi wa mizigo ya AI
- **Microsoft Entra ID**: Usimamizi wa utambulisho na upatikanaji wa shirika na sera za upatikanaji wa masharti
- **Azure Key Vault**: Usimamizi wa siri ulio na kituo cha usalama cha vifaa (HSM)
- **Microsoft Purview**: Utawala wa data na uzingatiaji kwa vyanzo vya data na taratibu za AI

#### **Uzingatiaji & Utawala**
- **Ulinganifu wa Sheria**: Hakikisha utekelezaji wa MCP unakidhi mahitaji maalum ya uzingatifu wa sekta (GDPR, HIPAA, SOC 2)

- **Uainishaji wa Data**: Kuweka kwa usahihi na kushughulikia data nyeti inayosindika na mifumo ya AI
- **Mfuatano wa Ukaguzi**: Kurekodi kikamilifu kwa ajili ya kufuata kanuni na uchunguzi wa forensiki
- **Udhibiti wa Faragha**: Utekelezaji wa kanuni za faragha-katika-muundo katika usanifu wa mfumo wa AI
- **Usimamizi wa Mabadiliko**: Mchakato rasmi wa mapitio ya usalama wa mabadiliko ya mfumo wa AI

Mbinu hizi za msingi hutoa msingi imara wa usalama unaoongeza ufanisi wa udhibiti wa usalama maalum wa MCP na kutoa ulinzi kamili kwa matumizi yanayoendeshwa na AI.

## Muhimu wa Usalama

- **Mbinu ya Usalama wa Tabaka**: Changanya mbinu za msingi za usalama (ufuataji salama wa msimbo, udhibiti wa ruhusa za chini zaidi, uthibitishaji wa mnyororo wa usambazaji, ufuatiliaji endelevu) na udhibiti maalum wa AI kwa ulinzi kamili

- **Hatari Maalum kwa AI**: Mifumo ya MCP inakabiliwa na hatari za kipekee ikiwa ni pamoja na sindano za maelekezo (prompt injection), uchafuzi wa vifaa, uibaji wa vikao, matatizo ya mwaki asiyejua, hatari za kupita tokeni, na ruhusa nyingi zinazohitaji mbinu maalum za ulinzi

- **Ubora wa Uthibitishaji na Idhini**: Tekeleza uthibitishaji thabiti kwa kutumia watoa huduma wa utambulisho wa nje (Microsoft Entra ID), bonyeza uthibitisho sahihi wa tokeni, na usikubali tokeni zisizotolewa moja kwa moja kwa seva yako ya MCP

- **Kuzuia Mashambulio ya AI**: Tumia Microsoft Prompt Shields na Azure Content Safety kulinda dhidi ya sindano za maelekezo zisizozidi moja kwa moja na mashambulio ya uchafuzi wa vifaa, huku ukithibitisha metadata ya kifaa na kufuatilia mabadiliko ya hali

- **Usalama wa Vikao na Usafirishaji**: Tumia vitambulisho vya kikao visivyo vya kawaida, vilivyo salama kanda, vilivyotiwa alama kwa watumiaji, tekeleza usimamizi sahihi wa mzunguko wa maisha ya kikao, na usitumie vikao kwa uthibitishaji

- **Mbinu Bora za Usalama wa OAuth**: Zuia mashambulio ya mwaki asiyejua kwa ridhaa wazi ya mtumiaji kwa wateja waliosajiliwa kwa nguvu, utekelezaji sahihi wa OAuth 2.1 na PKCE, na uthibitisho mkali wa redirect URI  

- **Kanuni za Usalama wa Tokeni**: Epuka myendo mbaya wa kupitisha tokeni bila usahihi, thibitisha madai ya hadhira ya tokeni, tekeleza tokeni za muda mfupi na mzunguko wa usalama, na dumisha mipaka wazi ya uaminifu

- **Usalama Kamili wa Mnyororo wa Usambazaji**: Tibu vipengele vyote vya ekosistimu ya AI (modeli, embeddings, watoa muktadha, API za nje) kwa ukali kama vile utegemezi wa programu za jadi

- **Mageuzi Endelevu**: Endelea kufuata vipengele vya MCP vinavyozidi kukua, changia viwango vya jumuiya ya usalama, na mantenza mbinu zinazobadilika za usalama kama ilivyo maendeleo ya itifaki

- **Muungano wa Usalama wa Microsoft**: Tumia mfumo kamili wa usalama wa Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) kwa ulinzi ulioimarishwa wa usanifu wa MCP

## Rasilimali Kamili

### **Nyaraka Rasmi za Usalama za MCP**
- [MCP Specification (Sasa: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Mbinu Bora za Usalama za MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Ufafanuzi wa Idhini ya MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Hifadhidata ya GitHub ya MCP](https://github.com/modelcontextprotocol)

### **Rasilimali za Usalama za OWASP MCP**
- [Mwongozo wa Usalama wa OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Mwongozo kamili wa OWASP MCP Top 10 na utekelezaji wa Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hatari rasmi za usalama za OWASP MCP
- [Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Mafunzo ya mkono katika usalama wa MCP kwenye Azure

### **Viwango vya Usalama na Mbinu Bora**
- [Mbinu Bora za Usalama za OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Usalama wa Programu za Wavuti](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 kwa Modeli Kubwa za Lugha](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Ripoti ya Ulinzi wa Kidijitali ya Microsoft](https://aka.ms/mddr)

### **Utafiti na Uchambuzi wa Usalama wa AI**
- [Sindano ya Maelekezo katika MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Mashambulio ya Uchafuzi wa Vifaa (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Muhtasari wa Utafiti wa Usalama wa MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Suluhisho za Usalama za Microsoft**
- [Nyaraka za Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Huduma ya Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Usalama wa Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Mbinu Bora za Usimamizi wa Tokeni za Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Mwongozo wa Utekelezaji na Mafunzo**
- [Azure API Management kama Mlango wa Uthibitishaji wa MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Uthibitishaji wa Microsoft Entra ID na Seva za MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Uhifadhi Salama na Usimbaji Tokeni (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **Usalama wa DevOps na Mnyororo wa Usambazaji**
- [Usalama wa Azure DevOps](https://azure.microsoft.com/products/devops)
- [Usalama wa Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Safari ya Usalama wa Mnyororo wa Usambazaji wa Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Nyaraka Zaidi za Usalama**

Kwa mwongozo kamili wa usalama, rejelea nyaraka maalum katika sehemu hii:

- **[Mbinu Bora za Usalama za MCP 2025](./mcp-security-best-practices-2025.md)** - Mbinu bora kamili za usalama kwa utekelezaji wa MCP
- **[Utekelezaji wa Azure Content Safety](./azure-content-safety-implementation.md)** - Mifano halisi ya utekelezaji wa mchango wa Azure Content Safety  
- **[Udhibiti wa Usalama wa MCP 2025](./mcp-security-controls-2025.md)** - Udhibiti na mbinu za hivi karibuni za usalama kwa usanifu wa MCP
- **[Mwongozo wa Haraka wa Mbinu Bora za MCP](./mcp-best-practices.md)** - Mwongozo wa haraka kwa mbinu muhimu za usalama za MCP
- **[BlueHat 2026: Kuweka Salama Mustakabali wa AI: Kuweka Salama MCP kwa Mifumo ya Ulinzi wa Kina](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Mifumo ya ulinzi wa kina kutoka Microsoft Security Response Center (MSRC)

### **Mafunzo ya Usalama ya Mikono-katika-Mabomu**

- **[Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - Warsha kamili ya mikono-katika-mabomu kwa usalama wa seva za MCP katika Azure kuanzia Kambi ya Msingi hadi Mkutano Mkuu
- **[Mwongozo wa Usalama wa OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Mchoro wa marejeleo na mwongozo wa utekelezaji kwa hatari zote za OWASP MCP Top 10

---

## Nini Kinachofuata

Ifuatayo: [Sura ya 3: Kuanzia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->