# Usalama wa MCP: Ulinzi Kamili kwa Mifumo ya AI

[![MCP Security Best Practices](../../../translated_images/sw/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Bofya picha hapo juu kutazama video ya somo hili)_

Usalama ni msingi wa kubuni mifumo ya AI, ndiyo maana tunaiweka kama sehemu yetu ya pili ya kipaumbele. Hii inaendana na kanuni ya Microsoft ya **Secure by Design** kutoka kwa [Initiative ya Mustakabali Salama](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Itifaki ya Muktadha wa Mfano (Model Context Protocol - MCP) inaleta uwezo mpya wenye nguvu kwa programu zinazoendeshwa na AI huku ikizindua changamoto za kiusalama za kipekee zinazovuka hatari za kawaida za programu. Mifumo ya MCP inakabiliwa na wasiwasi wa usalama uliothibitishwa tayari (kuchapa nambari salama, ruhusa za chini kabisa, usalama wa mnyororo wa usambazaji) pamoja na vitisho vipya vinavyolenga AI kama vile infualia ya haraka (prompt injection), sumu ya zana, kuibiwa kwa kikao, mashambulizi ya mlinzi aliyechanganyikiwa, udhaifu wa tokeni kupitishwa, na mabadiliko ya uwezo kwa njia ya nguvu.

Somo hili linachunguza hatari muhimu zaidi za usalama katika utekelezaji wa MCP—zinahusu uthibitishaji, idhini, ruhusa nyingi sana, infualia isiyo ya moja kwa moja, usalama wa kikao, matatizo ya mlinzi aliyechanganyikiwa, usimamizi wa tokeni, na udhaifu wa mnyororo wa usambazaji. Utajifunza udhibiti unaotekelezeka na mbinu bora za kupunguza hatari hizi huku ukitumia suluhisho za Microsoft kama Prompt Shields, Azure Content Safety, na GitHub Advanced Security kuimarisha usambazaji wako wa MCP.

## Malengo ya Kujifunza

Mwisho wa somo hili, utaweza:

- **Kutambua Vitisho Mahususi vya MCP**: Tambua hatari za kiusalama za kipekee katika mifumo ya MCP ikiwa ni pamoja na infualia ya haraka, sumu ya zana, ruhusa nyingi sana, kuibiwa kwa kikao, matatizo ya mlinzi aliyechanganyikiwa, udhaifu wa tokeni kupitishwa, na hatari za mnyororo wa usambazaji
- **Kutumia Udhibiti wa Usalama**: Tekeleza mbinu madhubuti ikiwa ni pamoja na uthibitishaji thabiti, upatikanaji wa ruhusa za chini kabisa, usimamizi salama wa tokeni, udhibiti wa usalama wa kikao, na uhakiki wa mnyororo wa usambazaji
- **Kutatua Suluhisho za Usalama za Microsoft**: Elewa na tumia Microsoft Prompt Shields, Azure Content Safety, na GitHub Advanced Security kwa ulinzi wa mzigo wa kazi wa MCP
- **Thibitisha Usalama wa Zana**: Tambua umuhimu wa uhakiki wa metadata ya zana, ufuatiliaji wa mabadiliko ya nguvu, na kuzuia mashambulizi ya infualia ya haraka isiyo ya moja kwa moja
- **Changanya Mbinu Bora**: Changanya msingi wa usalama uliowekwa (uchapaji nambari salama, kuimarisha seva, imani sifuri) na udhibiti maalum wa MCP kwa ulinzi kamili

# Usanifu na Udhibiti wa Usalama wa MCP

Utekelezaji wa kisasa wa MCP unahitaji mbinu za usalama zenye tabaka nyingi zinazoshughulikia usalama wa kawaida wa programu na vitisho maalum vya AI. Maelezo ya MCP yanayobadilika haraka yanaendelea kuimarisha udhibiti wake wa usalama, kuruhusu ujumuishaji bora na usanifu za usalama wa taasisi na mbinu bora zilizoanzishwa.

Utafiti kutoka kwa [Ripoti ya Ulinzi wa Kidigitali ya Microsoft](https://aka.ms/mddr) unaonyesha kwamba **asilimia 98% ya uvunjaji wa ripoti zingeweza kuzuiwa kwa usafi mzuri wa usalama**. Mkakati bora wa ulinzi unachanganya mbinu za msingi za usalama na udhibiti maalum wa MCP—kudhibiti msingi wa usalama kunabaki kuwa na athari kubwa zaidi kupunguza hatari za usalama kwa ujumla.

## Hali ya Usalama ya Sasa

> **Kumbuka:** Habari hii inaakisi viwango vya usalama vya MCP kuanzia **Februari 5, 2026**, vinavyoendana na **Makubaliano ya MCP 2025-11-25**. Itifaki ya MCP inaendelea kubadilika kwa kasi, na utekelezaji wa baadaye unaweza kuanzisha mifumo mipya ya uthibitishaji na udhibiti ulioboreshwa. Kumbuka kuangalia [Makubaliano ya MCP ya sasa](https://spec.modelcontextprotocol.io/), [hifadhidata ya MCP GitHub](https://github.com/modelcontextprotocol), na [nyaraka za mbinu bora za usalama](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) kwa mwongozo wa hivi karibuni.

## 🏔️ Warsha ya Mkutano wa Usalama wa MCP (Sherpa)

Kwa **mafunzo ya vitendo ya usalama**, tunapendekeza kwa dhati **Warsha ya Mkutano wa Usalama wa MCP** (Sherpa) - ziara ya kina ya kuongoza usalama wa seva za MCP katika Microsoft Azure.

### Muhtasari wa Warsha

[Warsha ya Mkutano wa Usalama wa MCP](https://azure-samples.github.io/sherpa/) hutoa mafunzo ya usalama ya vitendo kupitia mbinu ya kuthibitishwa ya "uduajishaji → udhaifu → utatuzi → uhakiki". Utapokea:

- **Jifunze kwa Kuvunja Vitu**: Pata uzoefu wa moja kwa moja wa udhaifu kwa kuendesha seva zisizo salama kwa makusudi
- **Tumia Usalama wa Asili wa Azure**: Tumia Azure Entra ID, Key Vault, Usimamizi wa API, na AI Content Safety
- **Fuata Mbinu ya Ulinzi kwa Tabaka**: Endelea kupitia kambi zinazojenga tabaka kamili za usalama
- **Tumia Viwango vya OWASP**: Kila mbinu inaendana na [Mwongozo wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Pata Msimbo wa Kazi**: Pata utekelezaji unaofanya kazi na umejaribiwa

### Njia ya Ziara

| Kambi | Mwelekeo | Hatari za OWASP Zinazoshughulikiwa |
|------|-------|---------------------|
| **Kambi ya Msingi** | Misingi ya MCP & udhaifu wa uthibitishaji | MCP01, MCP07 |
| **Kambi 1: Utambulisho** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Kambi 2: Lango** | Usimamizi wa API, Mipaka Binafsi, utawala | MCP02, MCP07, MCP09 |
| **Kambi 3: Usalama wa I/O** | Infualia ya haraka, ulinzi wa PII, usalama wa maudhui | MCP03, MCP05, MCP06 |
| **Kambi 4: Ufuatiliaji** | Uchambuzi wa Logi, dashibodi, kugundua vitisho | MCP08 |
| **Mkutano Mkuu** | Mtihani wa ushirikiano wa Timu Nyekundu / Timu Bluu | Zote |

**Anza Hapa**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Hatari Kumi za Juu za Usalama za OWASP MCP

[Mwongozo wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/) unaelezea hatari kumi muhimu za usalama kwa utekelezaji wa MCP:

| Hatari | Maelezo | Urejeshaji wa Azure |
|------|-------------|------------------|
| **MCP01** | Usimamizi wa Tokeni uliyodumaa & Kufichuliwa Siri | Azure Key Vault, Managed Identity |
| **MCP02** | Kuongezeka Ruhusa Kupitia Mipaka | RBAC, Ufikiaji wa Masharti |
| **MCP03** | Sumu ya Zana | Uhifadhi wa zana, uthibitishaji wa uadilifu |
| **MCP04** | Mashambulizi ya Mnyororo wa Usambazaji | GitHub Advanced Security, uchunguzi wa utegemezi |
| **MCP05** | Uingiliaji wa Amri na Utekelezaji | Uhakiki wa pembejeo, kuweka katika sandbox |
| **MCP06** | Infualia ya Haraka Kupitia Mizigo ya Muktadha | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Uthibitishaji na Idhini Duni | Azure Entra ID, OAuth 2.1 na PKCE |
| **MCP08** | Ukosefu wa Ukaguzi & Telemetry | Azure Monitor, Application Insights |
| **MCP09** | Seva za MCP za Kivuli | Udhibiti wa API Center, upweke wa mtandao |
| **MCP10** | Uingiliaji wa Muktadha & Kushirikisha Kupita Mipaka | Uainishaji wa data, kufichuliwa kidogo |

### Mabadiliko ya Uthibitishaji wa MCP

Maelezo ya MCP yamebadilika sana katika mbinu za uthibitishaji na idhini:

- **Mbinu ya Awali**: Maelezo mapema yalihitaji waendelezaji kutekeleza seva zao za uthibitishaji, huku seva za MCP zikitoa huduma ya OAuth 2.0 kwa kusimamia uthibitishaji wa watumiaji moja kwa moja
- **Kiwango cha Sasa (2025-11-25)**: Maelezo yaliyoboreshwa yanaruhusu seva za MCP kuwaruhusu watoa huduma wa utambulisho wa nje (kama Microsoft Entra ID), kuboresha usalama na kupunguza ugumu wa utekelezaji
- **Usalama wa Tabaka la Usafirishaji**: Usaidizi ulioboreshwa kwa mifumo ya usafirishaji salama kwa mifumo thabiti ya uthibitishaji kwa muunganisho wa ndani (STDIO) na wa mbali (Streamable HTTP)

## Usalama wa Uthibitishaji na Idhini

### Changamoto za Usalama za Sasa

Utekelezaji wa kisasa wa MCP unakabiliwa na changamoto kadhaa za uthibitishaji na idhini:

### Hatari na Njia za Mashambulizi

- **Mantiki Duni ya Idhini**: Utekelezaji mbaya wa idhini katika seva za MCP unaweza kufichua data nyeti na kutekeleza udhibiti wa upatikanaji kwa makosa
- **Udukuzi wa Tokeni za OAuth**: Uibiwa wa tokeni kwenye seva za MCP za ndani huwawezesha wahalifu kufanya utambulisho wa uwongo kama seva na kufikia huduma za chini
- **Udhaifu wa Kupitisha Tokeni**: Matunzo mabaya ya tokeni huunda njia za kupita udhibiti wa usalama na mapungufu ya uwajibikaji
- **Ruhusa nyingi sana**: Seva za MCP zilizo na ruhusa nyingi zinavunja kanuni za ruhusa za chini kabisa na kupanua maeneo ya kushambuliwa

#### Kupitisha Tokeni: Miondoko Muhimu Dhahiri ya Kupinga

**Kupitisha tokeni kinaruhusiwa kabisa** katika maelezo ya sasa ya idhini ya MCP kwa sababu ya athari mbaya za usalama:

##### Kupita Udhibiti wa Usalama  
- Seva za MCP na API za chini hutekeleza udhibiti muhimu wa usalama (kikomo cha kasi, uhakiki wa maombi, ufuatiliaji wa trafiki) unaotegemea uthibitishaji sahihi wa tokeni  
- Matumizi ya tokeni moja kwa moja kati ya mteja na API hupita ulinzi huu muhimu, kuharibu usanifu wa usalama

##### Changamoto za Uwajibikaji na Ukaguzi  
- Seva za MCP haziwezi kutofautisha kati ya wateja wanaotumia tokeni zinazotolewa na huduma za juu, vukiwa njia za ukaguzi  
- Logi za huduma za rasilimali za chini zinaonyesha vyanzo vinavyodanganya badala ya seva za kati za MCP  
- Uchunguzi wa matukio na ukaguzi wa uthabiti hujaa ugumu mkubwa

##### Hatari za Kuondoa Data  
- Dai zisizo thibitishwa za tokeni huwaruhusu wahalifu wenye tokeni zilizodukuliwa kutumia seva za MCP kama mawakala wa kuondoa data  
- Kuvunja mipaka ya imani huruhusu upatikanaji usioidhinishwa unaopita udhibiti wa usalama uliokusudiwa

##### Njia za Mashambulizi kwa Huduma Nyingi  
- Tokeni zilizoathirika zinazokubaliwa na huduma nyingi huruhusu mwendo wa mlalo kati ya mifumo inayounganishwa  
- Misingi ya imani kati ya huduma inaweza kuvunjwa wakati vyanzo vya tokeni haviwezi kuthibitishwa

### Udhibiti wa Usalama na Upunguzaji

**Mahitaji Muhimu ya Usalama:**

> **LAZIMU**: Seva za MCP **HAZIITENGEI TOKENS ZOTE** ambazo hazikutolewa wazi kwa seva ya MCP

#### Udhibiti wa Uthibitishaji na Idhini

- **Mapitio Makali ya Idhini**: Fanya ukaguzi kamili wa mantiki ya idhini ya seva za MCP ili kuhakikisha watumiaji na wateja waliokusudiwa tu wanaweza kufikia rasilimali nyeti  
  - **Mwongozo wa Utekelezaji**: [Azure API Management kama Lango la Uthibitishaji kwa Seva za MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Ujumuishaji wa Utambulisho**: [Kutumia Microsoft Entra ID kwa Uthibitishaji wa Seva za MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Usimamizi Salama wa Tokeni**: Tekeleza [mbinu bora za Microsoft za uhakiki wa tokeni na mzunguko wa maisha](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Hakikisha dai za hadhira ya tokeni zinaendana na utambulisho wa seva ya MCP  
  - Tekeleza sera za mzunguko wa tokeni na muda wake wa kumalizika  
  - Zuia mashambulizi ya kutumia tena tokeni na matumizi yasiyoidhinishwa

- **Uhifadhi Salama wa Tokeni**: Hifadhi tokeni kwa usimbaji fiche ukiwa salama kimahali na wakati wa usafirishaji  
  - **Mbinu Bora**: [Mwongozo wa Uhifadhi wa Tokeni na Usimbaji](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Utekelezaji wa Udhibiti wa Upatikanaji

- **Kanuni ya Ruhusa za Chini Zaidi**: Wape seva za MCP ruhusa chache kabisa zinazohitajika kwa ufanisi uliokusudiwa  
  - Fanya mapitio ya ruhusa mara kwa mara na sasisha ili kuzuia kuenea kwa ruhusa  
  - **Nyaraka za Microsoft**: [Upatikanaji salama wa ruhusa za chini kabisa](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Udhibiti wa Upatikanaji kwa Kazi (RBAC)**: Tekeleza mgawanyiko mzuri wa majukumu  
  - Tenga majukumu kwa rasilimali na vitendo maalum tu  
  - Epuka ruhusa kubwa au zisizohitajika zinazopanua maeneo ya kushambuliwa

- **Ufuatiliaji Endelevu wa Ruhusa**: Tekeleza ukaguzi na ufuatiliaji wa upatikanaji wa kuendelea  
  - Fuatilia mifumo ya matumizi ya ruhusa kwa kasoro  
  - Rekebisha haraka ruhusa nyingi au zisizotumiwa

## Vitisho Maalum vya AI Vinavyolengwa

### Mashambulizi ya Infualia ya Haraka & Udanganyifu wa Zana

Utekelezaji wa kisasa wa MCP unakabiliwa na njia za mashambulizi tata maalum kwa AI ambazo mbinu za usalama za jadi haziwezi kuziadhibu kikamilifu:

#### **Infualia Isiyo ya Moja kwa Moja (Infualia ya Haraka ya Mikoa Mbalimbali)**

**Infualia Isiyo ya Moja kwa Moja** ni mojawapo ya udhaifu mkubwa sana katika mifumo ya AI yenye MCP. Wahalifu huingiza maagizo mabaya ndani ya maudhui ya nje—nyaraka, kurasa za wavuti, barua pepe, au vyanzo vya data—ambayo mifumo ya AI kisha huichambua kama maagizo halali.

**Mafanikio ya Mashambulizi:**
- **Utajiri wa Nyaraka**: Maagizo mabaya yaliyojificha kwenye nyaraka zinazochakatwa zinazochochea hatua zisizokusudiwa za AI  
- **Matumizi Mbaya ya Maudhui ya Wavuti**: Kurasa za wavuti zenye vidokezo vilivyowekwa vinavyodanganya AI wakati wa kuchambua  
- **Mashambulizi kwa Barua Pepe**: Vidokezo vya mabaya katika barua pepe vinavyosababisha wasaidizi wa AI kutoa taarifa au kutekeleza hatua zisizoruhusiwa  
- **Mchafuko wa Vyanzo vya Data**: Hifadhidata au API zilizochafuliwa zinazotoa maudhui mabaya kwa mifumo ya AI

**Athari Halisi**: Mashambulizi haya yanaweza kusababisha kuondolewa data, kuvunjika kwa faragha, uzalishaji wa maudhui mabaya, na udanganyifu wa mwingiliano wa mtumiaji. Kwa uchambuzi wa kina, angalia [Infualia ya Haraka katika MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/sw/prompt-injection.ed9fbfde297ca877.webp)

#### **Mashambulizi ya Sumu ya Zana**

**Sumu ya Zana** inalenga metadata inayofafanua zana za MCP, ikitumia jinsi LLMs zinavyotafsiri maelezo ya zana na vigezo kufanya maamuzi ya utekelezaji.

**Njia za Mashambulizi:**
- **Udanganyifu wa Metadata**: Wahalifu huingiza maagizo mabaya kwenye maelezo ya zana, ufafanuzi wa vigezo, au mifano ya matumizi  
- **Maagizo Yasiyoonekana**: Vidokezo vilivyofichwa katika metadata ya zana vinavyosindikwa na modeli za AI lakini havionekani kwa watumiaji wa binadamu  
- **Mabadiliko ya Zana kwa Nguvu ("Rug Pulls")**: Zana zilizothibitishwa na watumiaji hubadilishwa baadaye kufanya vitendo vibaya bila ufahamu wa mtumiaji  
- **Infualia ya Vigezo**: Maudhui mabaya yaliyowekwa katika skima za vigezo vya zana yanayoathiri tabia ya modeli

**Hatari kwa Seva za Mbali**: Seva za MCP za mbali zina hatari kubwa kwani maelezo ya zana yanaweza kusasishwa baada ya idhini ya awali ya mtumiaji, kuanzisha hali ambapo zana zilizokuwa salama zikageuka kuwa mbaya. Kwa uchambuzi wa kina, angalia [Mashambulizi ya Sumu ya Zana (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/sw/tool-injection.3b0b4a6b24de6bef.webp)

#### **Njia Nyingine za Mashambulizi za AI**

- **Infualia ya Haraka ya Mikoa Mbalimbali (XPIA)**: Mashambulizi yanayojumuisha maudhui kutoka mikoa mingi kupita udhibiti wa usalama
- **Marekebisho ya Uwezo wa Kijifunzaji**: Mabadiliko ya wakati halisi ya uwezo wa zana ambayo huwezi kukisia kwenye tathmini za awali za usalama  
- **Ukatili wa Dirisha la Muktadha**: Mashambulizi yanayodanganya madirisha makubwa ya muktadha kuficha maelekezo hatari  
- **Mashambulizi ya Kuchanganyikiwa kwa Mfano**: Kutumia mapungufu ya mfano kuunda tabia zisizotabirika au zisizo salama  

### Athari za Hatari za Usalama wa AI

**Matokeo ya Athari Kubwa:**
- **Utoaji wa Data Bila Ruhusa**: Ufikiaji usioidhinishwa na wizi wa data nyeti za kampuni au binafsi  
- **Uvunjaji wa Faragha**: Kufichuliwa kwa habari binafsi za mtu binafsi na data za biashara za siri  
- **Udanganyifu wa Mfumo**: Mabadiliko yasiyotakikana kwa mifumo muhimu na mtiririko wa kazi  
- **Ukwasishaji wa Sifa**: Kudhoofisha vitambulisho vya uthibitishaji na sifa za huduma  
- **Mwendeshaji wa Njia za Pembeni**: Kutumia mifumo ya AI iliyodhoofishwa kama vitu vya kuanzia mashambulizi mapana ya mtandao  

### Suluhisho za Usalama za AI za Microsoft

#### **Mlinzi wa Maagizo ya AI: Ulinzi wa Juu Dhidi ya Mashambulizi ya Sindano**

Microsoft **AI Prompt Shields** hutoa ulinzi kamili dhidi ya mashambulizi ya sindano ya maagizo ya moja kwa moja na yasiyo ya moja kwa moja kupitia tabaka mbalimbali za usalama:

##### **Mbinu Muhimu za Ulinzi:**

1. **Ugunduzi na Uchingaji wa Juu**
   - Algorithimu za ujifunzaji wa mashine na mbinu za NLP hugundua maelekezo hatari yaliyomo katika maudhui ya nje  
   - Uchambuzi wa wakati halisi wa nyaraka, kurasa za wavuti, barua pepe, na vyanzo vya data kwa hatari zilizojificha  
   - Uelewa wa muktadha wa mifumo halali dhidi ya mifumo hatari ya maagizo  

2. **Mbinu za Kutoa Mwanga**
   - Hutofautisha kati ya maelekezo ya mfumo yaliyotegemewa na pembejeo za nje zinazoweza kuwa zimeathirika  
   - Mbinu za kubadilisha maandishi zinazoongeza umuhimu wa mfano huku zikitoza maudhui hatari  
   - Husaidia mifumo ya AI kudumisha upangili wa maelekezo sawa na kupuuza amri zilizochanganywa  

3. **Mifumo ya Alama za Mpaka na Datamarking**
   - Ufafanuzi wazi wa mipaka kati ya ujumbe wa mfumo unaotegemewa na maandishi ya pembejeo za nje  
   - Alama maalum zinabainisha mipaka kati ya vyanzo vya data vinavyoaminika na visivyoaminika  
   - Tofauti wazi huzuia mkanganyiko wa maelekezo na utekelezaji wa amri bila idhini  

4. **Intelligence ya Tishio ya Muda Mzima**
   - Microsoft inafuatilia mienendo mipya ya mashambulizi na kusasisha kinga mara kwa mara  
   - Utafutaji wa mara kwa mara wa mbinu mpya za sindano na njia za mashambulizi  
   - Sasisho la mara kwa mara la mifano ya usalama kudumisha ufanisi dhidi ya tishio linalobadilika  

5. **Muunganisho wa Azure Content Safety**
   - Sehemu ya suite kamili ya Azure AI Content Safety  
   - Ugunduzi wa ziada kwa jaribio la jailbreak, maudhui hatarishi, na ukiukaji wa sera za usalama  
   - Udhibiti wa usalama uliounganishwa katika sehemu zote za programu za AI  

**Rasilimali za Utekelezaji**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/sw/prompt-shield.ff5b95be76e9c78c.webp)


## Tishio za Usalama za MCP za Juu

### Udhaifu wa Kuwapora Vikao

**Udhaifu wa kuwapora vikao** ni njia ya mashambulizi muhimu katika utekelezaji wa MCP wenye hali ya kudumu ambapo wahalifu wasioidhinishwa wanapata na kutumia vibagua halali vya kikao kuiga wateja na kutekeleza vitendo visivyoidhinishwa.

#### **Hali za Mashambulizi na Hatari**

- **Sindano ya Maagizo ya Kuiba Kikao**: Washambuliaji wenye vitambulisho vya vikao vilivyoibiwa huchoma matukio hatari kwenye seva zinazoshiriki hali ya kikao, naweza kusababisha vitendo hatari au kufikia data nyeti  
- **Kuiga Moja kwa Moja**: Vitambulisho vya vikao vilivyoibiwa huruhusu simu za moja kwa moja kwa seva za MCP bila uthibitishaji, wakichukuliwa kama watumiaji halali  
- **Mtiririko wa Kuendelea Ulioathirika**: Washambuliaji wanaweza kumaliza maombi mapema na kusababisha wateja halali kuendelea na maudhui ambayo yanaweza kuwa hatari  

#### **Udhibiti wa Usalama kwa Usimamizi wa Vikao**

**Mahitaji Muhimu:**
- **Uthibitishaji wa Ruhusa**: Seva za MCP zinazotekeleza uthibitishaji **ZIWEKE** kuthibitisha maombi yote yanayokuja na **ZISITEGEME** vikao kwa uthibitishaji  
- **Uundaji Salama wa Kikao**: Tumia vitambulisho vya vikao visivyo na mtiririko wa hadithi vinavyotengenezwa kwa njia salama za nasibu za kriptografia  
- **Kuingizwa Kuingilia Kwa Mtumiaji**: Funga vitambulisho vya vikao kwa taarifa za mtumiaji kwa kutumia muundo kama `<user_id>:<session_id>` kuzuia matumizi mabaya ya vikao miongoni mwa watumiaji  
- **Usimamizi wa Mzunguko wa Kikao**: Tekeleza muda wa kumalizika, mzunguko, na uharibifu sahihi wa vikao ili kupunguza madirisha ya uwezekano wa udhaifu  
- **Usalama wa Usafirishaji**: HTTPS ni lazima kwa mawasiliano yote ili kuzuia kunakili vitambulisho vya kikao  

### Tatizo la Msaidizi Kuharibika

Tatizo la **msaidizi kuharibika** hutokea wakati seva za MCP zinatumika kama mawakala wa uthibitishaji kati ya wateja na huduma za sehemu ya tatu, na kuleta nafasi za kuruka ruhusa kupitia matumizi ya kitambulisho cha mtumiaji cha kudumu.

#### **Mbinu za Mashambulizi na Hatari**

- **Kupita kwa Ruhusa kwa Kukacha Vidakuzi**: Uthibitishaji wa mtumiaji hapo awali huunda vidakuzi vya idhini ambavyo washambuliaji hutumia kwa maombi ya ruhusa ya uhalifu yenye URI za mwelekeo zilizotengenezwa  
- **Uwezekano wa Wizi wa Msimbo wa Idhini**: Vidakuzi vya idhini vya sasa vinaweza kusababisha seva za idhini kuruka skrini za idhini na kuelekeza misimbo kwa endpoints zinazodhibitiwa na washambuliaji  
- **Ufikiaji Bila Ruhusa wa API**: Msimbo wa idhini ulioporwa huruhusu kubadilishana tokeni na kuiga mtumiaji bila idhini wazi  

#### **Mikakati ya Kupunguza**

**Udhibiti Muhimu:**
- **Mahitaji ya Idhini ya Wazi**: Seva za mawakala wa MCP zinazotumia vitambulisho vya mtumiaji vya kudumu **ZIWEKE** kupata idhini ya mtumiaji kwa kila mteja aliyesajiliwa kwa wakati halisi  
- **Utekelezaji wa Usalama wa OAuth 2.1**: Fuata mbinu bora za usalama za OAuth ikijumuisha PKCE (Proof Key for Code Exchange) kwa maombi yote ya idhini  
- **Uthibitishaji Mkali wa Mteja**: Tekeleza uthibitishaji mkali wa URI za mwelekeo na vitambulisho vya mteja kuzuia matumizi mabaya  

### Udhaifu wa Kupitisha Tokeni

**Kupitisha tokeni** ni mfano wazi wa matumizi mabaya ambapo seva za MCP zinakubali tokeni za mteja bila uthibitishaji sahihi na kuzituma kwa API za chini, hivyo kuvunja vipengele vya ruhusa vya MCP.

#### **Matokeo ya Usalama**

- **Kupita Udhibiti**: Matumizi ya tokeni moja kwa moja kutoka kwa mteja hadi API huvunja udhibiti muhimu wa mipaka ya kiwango, uthibitishaji, na ufuatiliaji  
- **Uharibifu wa Rekodi za Ukaguzi**: Tokeni zilizotolewa juu hufanya kutambulika kwa mteja kutowezekana, hivyo kuharibu uwezo wa uchunguzi wa matukio  
- **Utoaji Data Kupitia Wakala**: Tokeni zisizothibitishwa huruhusu wahalifu kutumia seva kama mawakala kwa ufikiaji wa data usioidhinishwa  
- **Uvunjaji wa Mipaka ya Uaminifu**: Huduma za chini zinaweza kupatwa na uvunjaji wa dhana za uaminifu wakati asili ya tokeni haiwezi kuthibitishwa  
- **Upanuzi wa Mashambulizi Kupitia Huduma Nyingi**: Tokeni zilizodhoofishwa zinazokubaliwa katika huduma nyingi huruhusu harakati za pembeni  

#### **Udhibiti wa Usalama Unaohitajika**

**Mahitaji yasiyojadilika:**
- **Uthibitishaji wa Tokeni**: Seva za MCP **ZISIKUBALI** tokeni ambazo hazijatolewa wazi kwa seva ya MCP  
- **Uthibitishaji wa Hadhira**: Daima thibitisha madai ya hadhira ya tokeni yanayolingana na utambulisho wa seva ya MCP  
- **Mzunguko Sahihi wa Tokeni**: Tekeleza tokeni za muda mfupi na matumizi bora ya mizunguko ya usalama  


## Usalama wa Mnyororo wa Ugavi kwa Mifumo ya AI

Usalama wa mnyororo wa ugavi umeendelea zaidi ya utegemezi wa programu za kawaida kufunika mfumo mzima wa AI. Utekelezaji wa kisasa wa MCP lazima uthibitishe na kufuatilia kwa ukamilifu sehemu zote zinazohusiana na AI, kwani kila moja huleta hatari inayoweza kudhoofisha uimara wa mfumo.

### Sehemu Zilizopanuka za Mnyororo wa Ugavi wa AI

**Utegemezi wa Programu wa Kawaida:**
- Maktaba za chanzo wazi na mifumo  
- Picha za kontena na mifumo ya msingi  
- Zana za maendeleo na mistari ya ujenzi  
- Sehemu za miundombinu na huduma  

**Vipengele Maalum vya Mnyororo wa Ugavi wa AI:**
- **Mifano ya Msingi**: Mifano iliyofunzwa awali kutoka kwa watoa huduma mbalimbali inayohitaji uhakiki wa asili  
- **Huduma za Kuingiza Data (Embedding Services)**: Huduma za kujenga vekta na utafutaji wa maana wa nje  
- **Watoa Muktadha**: Vyanzo vya data, misingi ya maarifa, na maktaba za nyaraka  
- **API za Wadau Wengine**: Huduma za AI za nje, mistari ya ML, na vituo vya usindikaji data  
- **Vifaa vya Mfano**: Uzito, usanidi, na aina zilizo vizuri zaidi za mifano  
- **Vyanzo vya Data za Mafunzo**: Mifumo ya data inayotumika kwa mafunzo na usahihishaji wa mifano  

### Mkakati Kamili wa Usalama wa Mnyororo wa Ugavi

#### **Uhakiki na Uaminifu wa Sehemu**
- **Uhakiki wa Asili**: Hakiki chanzo, leseni, na uimara wa sehemu zote za AI kabla ya kuingizwa  
- **Tathmini ya Usalama**: Fanya uchunguzi wa udhaifu na mapitio ya usalama kwa mifano, vyanzo vya data, na huduma za AI  
- **Uchanganuzi wa Umaarufu**: Tambua rekodi ya usalama na mbinu za watoa huduma wa AI  
- **Uthibitishaji wa Uzingatiaji**: Hakikisha sehemu zote zinakutana na mahitaji ya usalama na kanuni za shirika  

#### **Mistari ya Utekelezaji Salama**  
- **Usalama wa CI/CD wa Kiotomatiki**: Jumuisha skanning ya usalama katika mistari ya utekelezaji ya kiotomatiki  
- **Uimara wa Vifaa**: Tekeleza uhakiki wa kriptografia kwa vifaa vyote vilivyotumika (mifano, usanidi, nambari)  
- **Utekelezaji kwa Hatua**: Tumia mbinu za utekelezaji wa hatua kwa hatua na uthibitishaji wa usalama kwenye kila hatua  
- **Rekodi za Vifaa Zinazoaminika**: Tumia tu kutoka kwenye rejista na hifadhidata salama zilizothibitishwa  

#### **Ufuatiliaji wa Muda Mzima na Majibu**
- **Skanning ya Utegemezi**: Ufuatiliaji wa mara kwa mara wa udhaifu kwa programu na sehemu zote za AI  
- **Ufuatiliaji wa Mfano**: Tathmini ya kimara ya tabia ya mfano, mabadiliko ya utendaji, na dosari za usalama  
- **Ufuatiliaji wa Afya ya Huduma**: Fuata huduma za AI za nje kwa upatikanaji, matukio ya usalama, na mabadiliko ya sera  
- **Muunganisho wa Takwimu za Tishio**: Jumuisha vyanzo vya takwimu za tishio maalum kwa hatari za AI na ML  

#### **Udhibiti wa Ufikiaji na Ruhusa Chache Zaidi**
- **Ruhusa za Kiwango cha Sehemu**: Zuia ufikiaji wa mifano, data, na huduma kulingana na uhitaji wa biashara  
- **Usimamizi wa Akaunti za Huduma**: Tekeleza akaunti za huduma zilizo na ruhusa chache zaidi zinazohitajika  
- **Ugawaji wa Mtandao**: Tengeneza sehemu za AI na zizuie ufikiaji wa mtandao kati ya huduma  
- **Udhibiti wa Lango la API**: Tumia milango ya API ya kati kudhibiti na kufuatilia ufikiaji wa huduma za AI za nje  

#### **Majibu ya Tukio na Urejeshaji**
- **Tarifisho za Haraka za Majibu**: Michakato imara ya kufunga mapipa au kubadilisha sehemu zilizoathirika za AI  
- **Mizunguko ya Sifa**: Mifumo ya kiotomatiki ya mizunguko ya nywila, funguo za API, na sifa za huduma  
- **Uwezo wa Kurudisha Kiaka**: Uwezo wa kurudisha haraka matoleo yaliyofanyiwa kazi yaliyotambuliwa  
- **Urejeshaji wa Mnyororo wa Ugavi Ulio Vunjika**: Taratibu maalum za kujibu upotoshaji wa huduma za AI za juu  

### Zana za Usalama za Microsoft na Muunganisho

**GitHub Advanced Security** hutoa ulinzi kamili wa mnyororo wa ugavi ikijumuisha:
- **Skanning ya Siri**: Ugunduzi wa kiotomatiki wa vitambulisho, funguo za API, na tokeni kwenye rejista  
- **Skanning ya Utegemezi**: Tathmini ya udhaifu kwa utegemezi wa chanzo wazi na maktaba  
- **Uchambuzi wa CodeQL**: Uchambuzi wa nambari tuli kwa dosari za usalama na makosa ya kucodi  
- **Uchunguzi wa Mnyororo wa Ugavi**: Uwazi wa afya ya utegemezi na hali ya usalama  

**Muunganisho wa Azure DevOps & Azure Repos:**
- Muunganisho laini wa skanning ya usalama katika majukwaa ya maendeleo ya Microsoft  
- Ukaguzi wa usalama wa kiotomatiki katika Azure Pipelines kwa kazi za AI  
- Utekelezaji wa sera za usalama kwa kupeleka sehemu za AI salama  

**Mazoea ya Ndani ya Microsoft:**
Microsoft inatekeleza mazoea ya kina ya usalama wa mnyororo wa ugavi katika bidhaa zote. Jifunze kuhusu mbinu zilizo thibitishwa katika [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Mazoea Bora ya Usalama wa Msingi

Utekelezaji wa MCP unarithi na kujenga juu ya hali ya usalama uliopo shirika lako. Kuimarisha mazoea bora ya msingi kwa usalama huongeza kwa kiasi kikubwa ufanisi wa usalama wa mifumo ya AI na utekelezaji wa MCP.

### Misingi Muhimu ya Usalama

#### **Mazoea Salama ya Maendeleo**
- **Uzingatiaji wa OWASP**: Linda dhidi ya [OWASP Top 10](https://owasp.org/www-project-top-ten/) dosari za programu za wavuti  
- **Ulinzi Maalum wa AI**: Tekeleza udhibiti wa [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Usimamizi Salama wa Siri**: Tumia maghala maalum kwa tokeni, funguo za API, na data nyeti za usanidi  
- **Usimbaji wa Tarehe zote**: Tekeleza mawasiliano salama kati ya sehemu zote za programu na mtiririko wa data  
- **Uthibitishaji wa Ingizo**: Hakiki kwa ukali pembejeo zote za mtumiaji, vigezo vya API, na vyanzo vya data  

#### **Nguvu za Miundombinu**
- **Uthibitishaji wa Vipengele Vingi**: Lazimisha MFA kwa akaunti zote za usimamizi na huduma  
- **Usimamizi wa Maboresho**: Maboresho ya kiotomatiki na kwa wakati kwa mifumo ya uendeshaji, mifumo, na utegemezi  
- **Muunganisho wa Watoa Utambulisho**: Usimamizi wa utambulisho wa kati kupitia watoa utambulisho wa kampuni (Microsoft Entra ID, Active Directory)  
- **Mgawanyiko wa Mtandao**: Kutenganisha sehemu za MCP kimuundo kuzuia mwendo wa pembeni  
- **Kanuni ya Ruhusa Chache Zaidi**: Ruhusa chache tu zinazohitajika kwa sehemu na akaunti zote za mfumo  

#### **Ufuatiliaji wa Usalama na Ugunduzi**
- **Kuingiza Rekodi Kamili**: Uandishi wa rekodi za shughuli za programu za AI, ikijumuisha mahusiano ya mteja-seva ya MCP  
- **Muunganisho wa SIEM**: Usimamizi wa taarifa na matukio ya usalama kwa ugunduzi wa dosari  
- **Uchanganuzi wa Tabia**: Ufuatiliaji wa AI kugundua mifumo isiyo ya kawaida ya mfumo na mtumiaji  
- **Takwimu za Tishio**: Kuingiza takwimu za tishio za nje na viashiria vya kuathirika (IOCs)  
- **Majibu ya Tukio**: Taratibu zilizo wazi za ugunduzi, majibu, na urejeshaji wa matukio ya usalama  

#### **Mjenzi wa Zero Trust**
- **Usiunguze, Daima Thibitisha**: Uthibitishaji wa mara kwa mara wa watumiaji, vifaa, na muunganisho wa mtandao  
- **Ugawaji Mdogo wa Mtandao**: Udhibiti wa mtandao mdogo unaotenganisha kazi binafsi na huduma  
- **Usalama Unganishi wa Utambulisho**: Sera za usalama zinazotegemea utambulisho uliothibitishwa badala ya eneo la mtandao  
- **Tathmini Endelea ya Hatari**: Tathmini ya hali ya usalama kwa muktadha wa sasa na tabia  
- **Ufikiaji wa Kiwango cha Masharti**: Udhibiti wa ufikiaji unaobadilika kulingana na hatari, eneo, na uaminifu wa kifaa  

### Mifumo ya Muunganisho wa Kampuni

#### **Muunganisho wa Mazingira ya Usalama wa Microsoft**
- **Microsoft Defender for Cloud**: Usimamizi kamili wa hali ya usalama ya wingu  
- **Azure Sentinel**: SIEM na uwezo wa SOAR wa asili ya wingu kwa ulinzi wa kazi za AI  
- **Microsoft Entra ID**: Usimamizi wa utambulisho na ufikiaji wa kampuni kwa sera za ufikiaji wa masharti  
- **Azure Key Vault**: Usimamizi wa siri ulio katikati na msaada wa HSM  
- **Microsoft Purview**: Usimamizi wa data na kuzingatia sheria kwa vyanzo na mtiririko wa data za AI  

#### **Uzingatiaji na Usimamizi**
- **Ulinganifu wa Kanuni**: Hakikisha utekelezaji wa MCP unakidhi mahitaji ya uzingatiaji wa tasnia (GDPR, HIPAA, SOC 2)  
- **Uainishaji wa Data**: Kuweka makundi na kushughulikia data nyeti inayosindikwa na mifumo ya AI  
- **Rekodi za Ukaguzi**: Kuingiza rekodi kamili kwa uzingatiaji wa kanuni na uchunguzi wa kisheria  
- **Udhibiti wa Faragha**: Tekeleza kanuni za faragha-tumaini katika usanifu wa mfumo wa AI  
- **Usimamizi wa Mabadiliko**: Michakato rasmi ya mapitio ya usalama kwa marekebisho ya mfumo wa AI  

Mazoea haya ya msingi huunda msingi thabiti wa usalama unaoongeza ufanisi wa udhibiti wa usalama wa MCP na kutoa ulinzi kamili kwa programu zinazoendeshwa na AI.
## Muhimu wa Usalama

- **Mbinu ya Kiwango cha Usalama**: Changanya mazoea ya msingi ya usalama (utengenezwaji salama wa msimbo, ruksa ndogo kabisa, uhakiki wa usambazaji, ufuatiliaji wa mara kwa mara) na udhibiti mahsusi wa AI kwa ulinzi wa kina

- **Mwonekano wa Vitisho Maalum vya AI**: Mifumo ya MCP inakabiliwa na hatari za kipekee ikiwa ni pamoja na kuingizwa kwa maagizo, sumu ya zana, usahibu wa kikao, matatizo ya msuluhishi mchafu, udhaifu wa kupitisha tokeni, na ruhusa nyingi zinazohitaji mbinu maalum za kukabiliana nazo

- **Ubora wa Uthibitishaji na Ruhusa**: Tekeleza uthibitishaji thabiti kwa kutumia watoa huduma za utambulisho wa nje (Microsoft Entra ID), suguza ukaguzi sahihi wa tokeni, na usikubali tokeni ambazo hazijatolewa moja kwa moja kwa seva yako ya MCP

- **Kuzuia Mashambulizi ya AI**: Tumia Microsoft Prompt Shields na Azure Content Safety kulinda dhidi ya kuingizwa kwa maagizo kwa njia isiyo ya moja kwa moja na mashambulizi ya sumu ya zana, huku ukihakiki metadata ya zana na kufuatilia mabadiliko ya hali ya mabadiliko

- **Usalama wa Kikao na Usafirishaji**: Tumia kitambulisho cha kikao salama kisichoaminika kilichofungamana na utambulisho wa mtumiaji, tekereza usimamizi sahihi wa mzunguko wa maisha wa kikao, na usitumie vikao kwa uthibitishaji

- **Mazoea Bora ya Usalama wa OAuth**: Zuia mashambulizi ya msuluhishi mchafu kupitia idhini wazi ya mtumiaji kwa wateja waliosajiliwa kwa njia ya mabadiliko, utekelezaji sahihi wa OAuth 2.1 na PKCE, na ukaguzi mkali wa redirect URI

- **Kanuni za Usalama wa Tokeni**: Epuka miundo isiyofaa ya kupitisha tokeni, hakiki madai ya watazamaji wa tokeni, tekeleza tokeni za muda mfupi na mzunguko salama, na kudumisha mipaka wazi ya kuaminiana

- **Usalama Kamili wa Mnyororo wa Ugavi**: Tendea vipengele vyote vya mfumo wa AI (mifano, embeddings, watoa muktadha, API za nje) kwa mvutano sawa wa usalama kama utegemezi wa kawaida wa programu

- **Mabadiliko ya Kuendelea**: Endelea kuwa wa mara kwa mara na vipimo vya MCP vinavyobadilika kwa kasi, changia viwango vya jumuiya za usalama, na dumisha mtazamo wa usalama unaobadilika kadri itakavyokomaa

- **Ushirikishwaji wa Usalama wa Microsoft**: Tumia mfumo kamili wa usalama wa Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) kwa ulinzi wa hali ya juu wa utekelezaji wa MCP

## Rasilimali Kamili

### **Nyaraka Rasmi za Usalama za MCP**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **Rasilimali za Usalama za OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Orodha kamili ya OWASP MCP Top 10 na mwongozo wa utekelezaji wa Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hatari rasmi za usalama za OWASP MCP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Mafunzo ya vitendo ya usalama wa MCP kwenye Azure

### **Viwango vya Usalama & Mazoea Bora**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Utafiti & Uchambuzi wa Usalama wa AI**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Suluhisho za Usalama za Microsoft**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Miongozo ya Utekelezaji & Mafunzo**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Usalama wa Mnyororo wa Ugavi**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Nyaraka Zaidi za Usalama**

Kwa mwongozo kamili wa usalama, rejelea nyaraka hizi maalum katika sehemu hii:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Mbinu kamili bora za usalama kwa utekelezaji wa MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Mifano ya utekelezaji wa vitendo kwa ushirikiano wa Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Udhibiti na mbinu za usalama za hivi karibuni kwa utekelezaji wa MCP
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Mwongozo wa haraka wa mazoea muhimu ya usalama wa MCP

### **Mafunzo ya Vitendo ya Usalama**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Warsha kamili ya vitendo kwa usalama wa seva za MCP kwenye Azure na makambi ya hatua mbali mbali kuanzia Base Camp hadi Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Muundo wa rejea na mwongozo wa utekelezaji kwa hatari zote za OWASP MCP Top 10

---

## Ifuatayo

Ifuatayo: [Sura ya 3: Kuanzia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kanganyaga**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kwa usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake ya awali inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa habari muhimu, tafsiri ya kitaalamu ya binadamu inashauriwa. Hatubebwi dhamana kwa kutoelewana au tafsiri potofu zitakazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->