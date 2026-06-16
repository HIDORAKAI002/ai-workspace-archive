# Usalama wa MCP: Ulinzi Kamili kwa Mifumo ya AI

[![MCP Security Best Practices](../../../translated_images/sw/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Bofya picha hapo juu kutazama video ya somo hili)_

Usalama ni msingi wa muundo wa mfumo wa AI, ndiyo sababu tunauweka kipaumbele kama sehemu yetu ya pili. Hii inaendana na kanuni ya Microsoft ya **Secure by Design** kutoka [Mpango wa Usalama wa Baadaye](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Itifaki ya Muktadha wa Mfano (Model Context Protocol - MCP) inaleta uwezo mpya wenye nguvu kwa programu zinazoendeshwa na AI huku ikileta changamoto za kiusalama ambazo ni za kipekee zaidi kuliko hatari za kawaida za programu. Mifumo ya MCP inakumbana na changamoto za kiusalama zilizopo (kodishaji salama, ruhusa ndogo kabisa, usalama wa mlolongo wa ugavi) pamoja na tishio maalum la AI ikiwemo sindano ya amri (prompt injection), sumu ya zana, kuibiwa kwa kikao, mashambulizi ya mwajiri mkanganyifu (confused deputy), hatari za kupitisha tokeni, na mabadiliko ya uwezo wa mabadiliko.

Somo hili linachambua hatari muhimu zaidi za kiusalama katika utekelezaji wa MCP—kukagua uthibitishaji, idhini, ruhusa nyingi za ziada, sindano isiyo ya moja kwa moja ya amri, usalama wa kikao, matatizo ya mwajiri mkanganyifu, usimamizi wa tokeni, na udhaifu wa mlolongo wa ugavi. Utafundishwa vidhibiti vitendo na mbinu bora za kupunguza hatari hizi ukiwa unatumia suluhisho za Microsoft kama Prompt Shields, Azure Content Safety, na GitHub Advanced Security kuimarisha usambazaji wako wa MCP.

## Malengo ya Kujifunza

Mwisho wa somo hili, utaweza:

- **Kutambua Tishio Maalum la MCP**: Tambua hatari za kiusalama za kipekee katika mifumo ya MCP ikijumuisha sindano ya amri, sumu ya zana, ruhusa nyingi, kuibiwa kwa kikao, matatizo ya mwajiri mkanganyifu, hatari za kupitisha tokeni, na hatari za mlolongo wa ugavi  
- **Kutumia Kontroli za Usalama**: Tekeleza kupunguza madhara madhubuti ikiwa ni pamoja na uthibitishaji thabiti, upatikanaji kwa ruhusa ndogo kabisa, usimamizi salama wa tokeni, vidhibiti vya usalama wa kikao, na uhakikisho wa mlolongo wa ugavi  
- **Kutumia Suluhisho za Usalama za Microsoft**: Elewa na tumia Microsoft Prompt Shields, Azure Content Safety, na GitHub Advanced Security kwa ulinzi wa mzigo wa kazi wa MCP  
- **Kuhakiki Usalama wa Zana**: Elewa umuhimu wa uhakiki wa metadata ya zana, ufuatiliaji wa mabadiliko ya mabadiliko, na kujilinda dhidi ya mashambulizi yasiyo ya moja kwa moja ya sindano ya amri  
- **Kuingiza Mbinu Bora**: Changanya misingi imara ya usalama (kodishaji salama, ugumu wa seva, imani ya sifuri) na vidhibiti maalum vya MCP kwa ulinzi kamili  

# Muundo wa Usalama wa MCP & Vidhibiti

Utekelezaji wa kisasa wa MCP unahitaji mbinu za usalama zilizo na tabaka nyingi zinazoshughulikia usalama wa kawaida wa programu pamoja na tishio maalum la AI. Maelezo ya MCP yanayobadilika haraka yanaendelea kuboresha vidhibiti vya usalama, kuwezesha muingiliano bora na miundo ya usalama ya kampuni na mbinu bora zilizokubaliwa.

Utafiti kutoka [Ripoti ya Ulinzi wa Kidijitali ya Microsoft](https://aka.ms/mddr) unaonyesha kuwa **asilimia 98 ya uvunjaji ulioripotiwa ungezuiwa kwa uangalizi mzuri wa usalama**. Mkakati bora wa ulinzi unachanganya mbinu za msingi za usalama na vidhibiti maalum vya MCP—hata hatua za msingi zaidi za usalama zinaendelea kuwa na athari kubwa katika kupunguza hatari jumla za usalama.

## Hali ya Usalama ya Sasa

> **Kumbuka:** Taarifa hii inaonyesha viwango vya usalama vya MCP kutoka **Februari 5, 2026**, vinavyoendana na **MCP Specification 2025-11-25**. Itifaki ya MCP inaendelea kubadilika kwa kasi, na utekelezaji ujao unaweza kuleta mifumo mpya ya uthibitishaji na vidhibiti vilivyoboreshwa. Kila mara rejelea [MCP Specification](https://spec.modelcontextprotocol.io/), [ghala la MCP GitHub](https://github.com/modelcontextprotocol), na [nyaraka za mbinu bora za usalama](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) kwa mwongozo wa karibuni.

## 🏔️ Warsha ya Mkutano wa Usalama wa MCP (Sherpa)

Kwa **mafunzo ya vitendo ya usalama**, tunapendekeza sana **Warsha ya Mkutano wa Usalama wa MCP** (Sherpa) - safari ya kina iliyoongozwa ili kuimarisha usalama wa seva za MCP kwenye Microsoft Azure.

### Muhtasari wa Warsha

[Warsha ya Mkutano wa Usalama wa MCP](https://azure-samples.github.io/sherpa/) hutoa mafunzo ya vitendo, yenye hatua thabiti "hatari → shambulio → marekebisho → uhakiki." Utajifunza:

- **Jifunza kwa Kuvunja Mambo**: Shuhudia hatari kwa kutumia seva zisizo salama kwa makusudi  
- **Tumia Usalama wa Asili wa Azure**: Tumia Azure Entra ID, Key Vault, Usimamizi wa API, na AI Content Safety  
- **Fuatilia Mbinu ya Ulinzi Kupitia Tabaka**: Pitia makambi yanayojenga tabaka kamili za usalama  
- **Tumia Viwango vya OWASP**: Kila mbinu inahusiana na [Mwongozo wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/)  
- **Pata Msimbo wa Uzalishaji**: Toka na utekelezaji unaofanya kazi na uliojikita vyema  

### Njia ya Safari

| Kambi | Lengo | Hatari za OWASP Zilozungumziwa |
|------|-------|---------------------|
| **Kambi Kuu** | Misingi ya MCP na hatari za uthibitishaji | MCP01, MCP07 |
| **Kambi 1: Utambulisho** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Kambi 2: Lango** | Usimamizi wa API, Airtap Endpoints, udhibiti | MCP02, MCP06, MCP07, MCP09 |
| **Kambi 3: Usalama wa I/O** | Sindano ya amri, ulinzi wa PII, usalama wa maudhui | MCP03, MCP05, MCP06, MCP10 |
| **Kambi 4: Ufuatiliaji** | Uchambuzi wa kumbukumbu, dashibodi, utambuzi wa tishio | MCP04, MCP08 |
| **Mkutano Mkuu** | Mtihani wa ushirikiano wa Timu Nyekundu/Timu ya Bluu | Zote |

**Anza Hapa**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Hatari Kumi Kuu za Usalama wa MCP za OWASP

[Mwongozo wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/) unaelezea hatari kumi muhimu zaidi za usalama kwa utekelezaji wa MCP:

| Hatari | Maelezo | Ulinzi wa Azure |
|------|-------------|------------------|
| **MCP01** | Usimamizi Mbaya wa Tokeni & Kufichuliwa kwa Siri | Azure Key Vault, Managed Identity |
| **MCP02** | Kuongezeka kwa Uwezo Kupitia Kuenea kwa Muda | RBAC, Ufikiaji wa Masharti |
| **MCP03** | Sumu ya Zana | Uhifadhi wa zana, uhakiki wa uadilifu |
| **MCP04** | Mashambulizi ya Mlolongo wa Ugavi wa Programu & Uharibu wa Kutegemea | GitHub Advanced Security, skanning ya utegemezi |
| **MCP05** | Sindano na Utekelezaji wa Amri | Uhakiki wa pembejeo, sandboxing |
| **MCP06** | Kupindua Mtiririko wa Kusudia | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Ukosefu wa Uthibitishaji na Idhini | Azure Entra ID, OAuth 2.1 na PKCE |
| **MCP08** | Ukosefu wa Ukaguzi na Ufuatiliaji | Azure Monitor, Application Insights |
| **MCP09** | Seva za MCP za Kivuli | Udhibiti wa Kituo cha API, upweke wa mtandao |
| **MCP10** | Sindano ya Muktadha & Kushirikisha Zaidi | Uainishaji wa data, kufichuliwa kwa chini |

### Mabadiliko ya Uthibitishaji wa MCP

Maelezo ya MCP yamebadilika sana katika mbinu ya uthibitishaji na idhini:

- **Mbinu ya Asili**: Maelezo ya awali yalilazimisha waendelezaji kuwekeza seva zao za ubinafsi za uthibitishaji, huku seva za MCP zikitumika kama Seva za Uthibitishaji za OAuth 2.0 zinazodhibiti ubinafsi wa watumiaji moja kwa moja  
- **Kiwango cha Sasa (2025-11-25)**: Maelezo yaliyosasishwa yanaruhusu seva za MCP kumkabidhi uthibitishaji mpya wabia wa utambulisho wa nje (kama Microsoft Entra ID), kuboresha mtazamo wa usalama na kupunguza ugumu wa utekelezaji  
- **Usalama wa Safu ya Usafirishaji**: Msaada ulioboreshwa kwa mbinu salama za usafirishaji kwa mifumo ya uthibitishaji ya ndani (STDIO) na ya mbali (Streamable HTTP)  

## Usalama wa Uthibitishaji & Idhini

### Changamoto za Sasa za Usalama

Utekelezaji wa kisasa wa MCP unakumbana na changamoto kadhaa za uthibitishaji na idhini:

### Hatari & Njia za Mashambulio

- **Mantiki Iliyopotoshwa ya Idhini**: Utekelezaji mbaya wa idhini kwenye seva za MCP unaweza kufichua data nyeti na kudhibiti upatikanaji vibaya  
- **Ukwasishaji Tokeni za OAuth**: Uwindaji tokeni wa seva za MCP za ndani unawawezesha washambuliaji kujifanya seva na kufikia huduma za chini  
- **Hatari za Kupitisha Tokeni**: Usimamizi mbaya wa tokeni huundwa njia za kuepuka vidhibiti vya usalama na mapengo ya uwajibikaji  
- **Ruhusa Zilizopitiliza Kiasi**: Seva za MCP zilizo na ruhusa nyingi zaidi haziendani na kanuni za ruhusa ndogo kabisa na huongeza maeneo ya mashambulizi  

#### Kupitisha Tokeni: Mfano Mkali wa Kikoso

**Kupitisha tokeni kwa moja kwa moja kumezuiliwa kabisa** katika maelezo ya sasa ya idhini ya MCP kutokana na madhara makubwa ya usalama:

##### Kuepuka Vidhibiti vya Usalama  
- Seva za MCP na programu za API za chini hutumia vidhibiti muhimu vya usalama (kutoa vikwazo vya kasi, uhakiki wa maombi, ufuatiliaji wa trafiki) vinavyoegemea kuhakiki tokeni ipasavyo  
- Matumizi ya tokeni moja kwa moja kutoka kwa mteja hadi API hupita kinga hizi muhimu, na kudhoofisha usanifu wa usalama  

##### Changamoto za Uwajibikaji na Ukaguzi  
- Seva za MCP haziwezi kutambua mteja anayetumia tokeni zilotolewa juu, na hivyo kuvunja njia za ukaguzi  
- Kumbukumbu za seva za rasilimali za chini zinaonyesha chanzo cha maombi kisicho sahihi badala ya kupitia seva za MCP  
- Uchunguzi wa matukio na ukaguzi wa utekelezaji huwa mgumu sana  

##### Hatari za Kutoroka Data  
- Dai la tokeni lisilohakikiwa huruhusu wahalifu waliopora tokeni kutumia seva za MCP kama sambamba za kutoka kwa data  
- Kivuko cha mipaka ya uaminifu kuruhusu njia zisizoruhusiwa kupita vidhibiti vya usalama vilivyokusudiwa  

##### Njia za Mashambulio ya Huduma Nyingi  
- Tokeni zilizovamiwa zinazokubaliwa na huduma nyingi huruhusu kusogea mwelekeo wa mifumo inayounganishwa  
- Misingi ya kuaminiana kati ya huduma inaweza kuvunjika wakati chanzo cha tokeni hakiwezi kuthibitishwa  

### Vidhibiti na Kupunguza Madhara

**Mahitaji Muhimu ya Usalama:**

> **NI LAZIMA**: Seva za MCP **HAZIITEGEMEI** tokeni zozote ambazo hazikutolewa moja kwa moja kwa seva ya MCP  

#### Vidhibiti vya Uthibitishaji na Idhini

- **Uhakiki Mkali wa Idhini**: Fanya ukaguzi kamili wa mantiki ya idhini ya seva ya MCP kuhakikisha kwamba watumiaji na wateja waliokusudiwa tu wanaweza kufikia rasilimali nyeti  
  - **Mwongozo wa Utekelezaji**: [Usimamizi wa API wa Azure kama Lango la Uthibitishaji kwa Seva za MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Muunganisho wa Utambulisho**: [Kutumia Microsoft Entra ID kwa Uthibitishaji wa Seva ya MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)  

- **Usimamizi Salama wa Tokeni**: Tekeleza [mbinu bora za Microsoft za uhakiki wa tokeni na mzunguko wa maisha](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Hakiki madai ya watazamaji wa tokeni yakilingana na utambulisho wa seva ya MCP  
  - Tekeleza sera sahihi za mzunguko na muda wa kumalizika kwa tokeni  
  - Zuia mashambulizi ya kurudia tokeni na matumizi yasiyoruhusiwa  

- **Uhifadhi Salama wa Tokeni**: Hifadhi tokeni kwa usimbaji data ili kuwa salama wakiwa katika hali ya kupumzika na kusafirishwa  
  - **Mbinu Bora**: [Mwongozo wa Uhifadhi Salama wa Tokeni na Usimbaji Data](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

#### Utekelezaji wa Kontrol za Upatikanaji

- **Kanuni ya Ruhusa Ndogo Zaidi**: Wape seva za MCP ruhusa chache tu zinazohitajika kwa ajili ya kazi zilizokusudiwa  
  - Hakiki mara kwa mara ruhusa na ufanye masasisho kuzuia usambazaji wa ruhusa zisizohitajika  
  - **Nyaraka za Microsoft**: [Upatikanaji Salama Kwa Ruhusa Ndogo](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  

- **Udhibiti wa Upatikanaji Kutegemea Majukumu (RBAC)**: Tekeleza mgawanyo wa majukumu wenye usahihi  
  - Tengeneza majukumu maalum kwa rasilimali na vitendo  
  - Epuka ruhusa pana au zisizohitajika zinazoongeza maeneo ya mashambulio  

- **Ufuatiliaji Endelevu wa Ruhusa**: Tekeleza ukaguzi na ufuatiliaji wa upatikanaji wa mara kwa mara  
  - Fuatilia mifumo ya matumizi ya ruhusa kwa mabadiliko ya kawaida  
  - Rekebisha mara moja ruhusa nyingi au zisizo tumika  

## Tishio Maalum la Usalama la AI

### Mashambulizi ya Sindano ya Amri na Udanganyifu wa Zana

Utekelezaji wa kisasa wa MCP unakumbana na njia za mashambulio za AI zilizo na ugumu ambazo mbinu za usalama za kawaida haziwezi kuzitatua kikamilifu:

#### **Sindano Isiyo ya Moja kwa Moja ya Amri (Sindano ya Amri Kati ya Sekta za Tofauti)**

**Sindano Isiyo ya Moja kwa Moja ya Amri** ni moja ya udhaifu mkubwa katika mifumo ya AI yenye sifa za MCP. Washambuliaji huingiza maagizo mabaya ndani ya maudhui ya nje—nyaraka, kurasa za wavuti, barua pepe, au vyanzo vya data—ambavyo mifumo ya AI huyaendesha kama maagizo halali.

**Matukio ya Mashambulio:**
- **Sindano kwa Kutilia Msisitizo Nyaraka**: Maagizo mabaya yaliyofichwa katika nyaraka zinazotumika ambayo husababisha AI kufanya kazi zisizokusudiwa  
- **Matumizi Mabaya ya Maudhui ya Wavuti**: Kurasa za wavuti zilizoathirika zikiwa na sindano zilizojengwa ndani zinazobadili tabia ya AI wakati wa kukusanya maudhui  
- **Mashambulio ya Barua Pepe**: Sindano mbaya katika barua pepe zinazosababisha wasaidizi wa AI kufichua habari au kufanya vitendo visivyoidhinishwa  
- **Uharibifu wa Vyanzo vya Data**: Mifumo ya data au API zilizoathirika hutoa maudhui mabaya kwa mifumo ya AI  

**Athari Halisi**: Mashambulio haya yanaweza kusababisha kutoroka kwa data, kuvunjika kwa faragha, uzalishaji wa maudhui hatarishi, na udanganyifu wa maingiliano ya watumiaji. Kwa uchambuzi wa kina, angalia [Sindano ya Amri katika MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/sw/prompt-injection.ed9fbfde297ca877.webp)

#### **Mashambulio ya Sumu ya Zana**

**Sumu ya Zana** inalenga metadata inayobainisha zana za MCP, inayotumia jinsi LLMs zinavyotafsiri maelezo na vigezo vya zana kufanya maamuzi ya utekelezaji.

**Njia za Mashambulio:**
- **Udanganyifu wa Metadata**: Washambuliaji huingiza maagizo mabaya katika maelezo ya zana, ufafanuzi wa vigezo, au mifano ya matumizi  
- **Maagizo Yasiyoonyeshwa**: Sindano zilizofichwa katika metadata ya zana ambazo huchakatwa na mifano ya AI lakini hazionekani kwa watumiaji wa binadamu  
- **Mabadiliko ya Zana kwa Muda ("Rug Pulls")**: Zana zilizothibitishwa na watumiaji hubadilishwa baadaye kufanya vitendo vibaya bila idhini ya mtumiaji  
- **Sindano ya Vigezo**: Maudhui mabaya yaliyojengwa katika sehemu za vigezo za zana zinazoathiri tabia ya mfano  

**Hatari kwa Seva za Mbali**: Seva za MCP za mbali zina hatari kubwa kwa sababu maelezo ya zana yanaweza kubadilishwa baada ya idhini ya awali ya mtumiaji, kuunda hali ambako zana zilizokuwa salama zinageuka kuwa hatari. Kwa uchambuzi wa kina, angalia [Mashambulio ya Sumu ya Zana (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/sw/tool-injection.3b0b4a6b24de6bef.webp)

#### **Njia Nyingine za Mashambulio ya AI**

- **Sindano ya Amri Kati ya Sekta za Tofauti (XPIA)**: Mashambulio yenye ujuzi yanayotumia maudhui kutoka maeneo mbalimbali kuzuia vidhibiti vya usalama
- **Marekebisho ya Uwezo wa Kimitambo**: Mabadiliko ya wakati halisi ya uwezo wa zana ambazo huondoka kwenye tathmini za awali za usalama  
- **Uchafuzi wa Dirisha la Muktadha**: Mashambulizi yanayodanganya madirisha makubwa ya muktadha kuficha maagizo mabaya  
- **Mashambulizi ya Kuchanganya Mfano**: Kutitumia vikwazo vya mfano kuunda tabia zisizotabirika au zisizo salama  


### Mwitikio wa Hatari za Usalama za AI

**Matokeo yenye Athari Kubwa:**  
- **Utoaji wa Data Bila Idhini**: Upataji usioidhinishwa na wizi wa data nyeti za shirika au binafsi  
- **Uvunjifu wa Faragha**: Kufichuliwa kwa taarifa za mtu binafsi (PII) na data za biashara za siri  
- **Udhibiti wa Mfumo**: Mabadiliko yasiyokusudiwa kwenye mifumo muhimu na michakato ya kazi  
- **Wizi wa Cheti cha Utambulisho**: ĩna ta tokeni za uthibitishaji na vyeti vya huduma  
- **Uhamaji wa Upande**: Matumizi ya mifumo ya AI iliyovamiwa kama msaada wa mashambulizi mapana zaidi ya mtandao  

### Suluhisho za Usalama za Microsoft AI

#### **AI Prompt Shields: Ulinzi wa Juu Dhidi ya Mashambulizi ya Injection ya Prompt**

Microsoft **AI Prompt Shields** hutoa ulinzi kamili dhidi ya mashambulizi ya moja kwa moja na yasiyo ya moja kwa moja ya injection ya prompt kupitia tabaka mbalimbali za usalama:

##### **Mikakati Muhimu ya Ulinzi:**

1. **Ugundaji wa Juu na Uchakataji**  
   - Algoriti za kujifunza mashine na mbinu za NLP hugundua maagizo mabaya katika maudhui ya nje  
   - Uchambuzi wa wakati halisi wa nyaraka, kurasa za wavuti, barua pepe, na vyanzo vya data kwa vitisho vilivyojificha  
   - Uelewa wa muktadha wa mifumo halali dhidi ya mifumo ya prompt yenye madhara  

2. **Mbinu za Kuweka Anga**  
   - Hutofautisha kati ya maagizo ya mfumo yanayoaminika na pembejeo za nje zinazoweza kuathirika  
   - Mbinu za kubadilisha maandishi zinazoongeza umuhimu wa mfano huku zikitenganisha maudhui mabaya  
   - Husaidia mifumo ya AI kudumisha mfululizo sahihi wa maagizo na kupuuza maagizo yaliyotumwa  

3. **Mifumo ya Delimiter na Datamarking**  
   - Ufafanuzi wa mipaka wazi kati ya ujumbe wa mfumo unaoaminika na maandishi ya pembejeo ya nje  
   - Viashiria maalum vinaonyesha mipaka kati ya vyanzo vya data vinavyoaminika na visivyoaminika  
   - Ugawaji wazi huzuia kuchanganyikiwa kwa maagizo na utekelezaji usioidhinishwa wa amri  

4. **Intelijensia ya Vitisho Endelevu**  
   - Microsoft inaendelea kufuatilia mifumo mipya ya mashambulizi na kusasisha ulinzi  
   - Uwindaji wa vitisho kwa nguvu kwa mbinu mpya za injection na njia za mashambulizi  
   - Sasisho za mara kwa mara za modeli za usalama ili kudumisha ufanisi dhidi ya vitisho vinavyobadilika  

5. **Uunganishaji wa Azure Content Safety**  
   - Sehemu ya suite kamili ya Azure AI Content Safety  
   - Ugunduzi wa ziada kwa jaribio za jailbreak, maudhui hatari, na ukiukwaji wa sera za usalama  
   - Udhibiti wa usalama uliounganishwa katika sehemu zote za programu za AI  

**Rasilimali za Utekelezaji**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/sw/prompt-shield.ff5b95be76e9c78c.webp)


## Vitisho vya Usalama vya SCP vya Juu

### Uraibu wa Kughushi Kikao

**Kughushi kikao** ni njia muhimu ya mashambulizi katika utekelezaji wa MCP yenye hali ambapo watu wasioidhinishwa hupata na kutumia nambari za kikao halali kuonekana kama wateja na kufanya matendo yasiyotakikana.

#### **Hali za Mashambulizi na Hatari**

- **Injection ya Prompt ya Kughushi Kikao**: Wavamizi wenye nambari za kikao zilizodukuliwa huingiza matukio mabaya kwenye seva zinashirikiana hali ya kikao, na kusababisha vitendo vibaya au upatikanaji wa data nyeti  
- **Kuiga Moja kwa Moja**: Nambari za kikao zilizodukuliwa huruhusu wito wa moja kwa moja kwa seva za MCP bila uthibitishaji, zikitendea wavamizi kama watumiaji halali  
- **Mtiririko wa Resumable Ulioathirika**: Wavamizi wanaweza kumaliza maombi mapema, na kusababisha wateja halali kuendelea na maudhui yenye uwezekano wa hatari  

#### **Udhibiti wa Usalama kwa Usimamizi wa Kikao**

**Mahitaji Muhimu:**  
- **Uhakikisho wa Idhini**: Seva za MCP zinatekeleza uthibitishaji **LAZIMA** zihakikishe maombi yote yanayoingia na **HAIFAI KUTUMIA** vikao kama uthibitishaji  
- **Uundaji Salama wa Kikao**: Tumia nambari salama za kikao zisizotarajiwa zinazozalishwa kwa jenereta za nambari zisizoaminika  
- **Ufungaji Maalum kwa Mtumiaji**: Fungamanisha nambari za kikao na taarifa za mtumiaji kwa kutumia muundo kama `<user_id>:<session_id>` kuzuia matumizi mabaya ya kikao kwa watumiaji mbalimbali  
- **Usimamizi wa Mzunguko wa Kikao**: Tekeleza kumalizika, mzunguko, na kughairi kwa usahihi ili kupunguza dirisha la hatari  
- **Usalama wa Usafirishaji**: HTTPS lazima itumike kwa mawasiliano yote kuzuia wizi wa nambari za kikao  

### Tatizo la Msaidizi Aliyetatanishwa

Tatizo la **msaidizi aliyetetewa** hutokea wakati seva za MCP zinatumika kama mawakala wa uthibitishaji kati ya wateja na huduma za wahusika wa tatu, na kutoa fursa za kupita idhini kupitia utumiaji wa nambari za mteja zisizobadilika.

#### **Mfumo wa Mashambulizi na Hatari**

- **Kupita Idhini kwa Kuacha Vidakuzi**: Uthibitishaji wa mtumiaji uliopita hutengeneza vidakuzi vya idhini ambavyo wavamizi hutumia kwa maombi ya udhibiti yenye URI za kugeuza zilizotengenezwa  
- **Wizi wa Msimbo wa Idhini**: Vidakuzi vya idhini vilivyopo vinaweza kusababisha seva za idhini kupita skrini za idhini, na kusogeza misimbo kwenye vituo vinavyodhibitiwa na wavamizi  
- **Upatikanaji Usioidhinishwa wa API**: Misimbo ya idhini iliyovamiwa hutoa uwezo wa kubadilisha tokeni na kuiga mtumiaji bila idhini wazi  

#### **Mikakati ya Kupunguza**

**Udhibiti wa Lazima:**  
- **Mahitaji ya Idhini Iliyowekwa wazi**: Seva za wakala wa MCP zinazotumia nambari za mteja zisizobadilika **LAZIMA** zipate idhini ya mtumiaji kwa kila mteja aliyejisajili kwa nguvu  
- **Utekelezaji wa Usalama wa OAuth 2.1**: Fuata mbinu bora za usalama wa OAuth ikiwemo PKCE (Proof Key for Code Exchange) kwa maombi yote ya idhini  
- **Uthibitishaji Mkali wa Mteja**: Tekeleza uhakiki mkali wa URI za kugeuza na kitambulisho cha mteja kuzuia matumizi mabaya  

### Uraibu wa Kupitisha Tokeni

**Kupitisha tokeni** ni mtindo usiofaa ambapo seva za MCP zinakubali tokeni za wateja bila uhakiki sahihi na kuzipeleka kwa API za chini, ukiuka vipimo vya idhini ya MCP.

#### **Athari za Usalama**

- **Kupita Udhibiti**: Matumizi ya tokeni moja kwa moja kutoka kwa mteja hadi API hupita vikwazo vya ukomo wa kiwango, uhakiki, na ufuatiliaji  
- **Uharibifu wa Rekodi za Ufuatiliaji**: Tokeni zinazotolewa na sehemu za juu huruhusu kutokuwapo kwa utambuzi wa mteja, huku kuumiza uwezo wa uchunguzi wa matukio  
- **Utoaji wa Data Kupitia Proxy**: Tokeni zisizothibitishwa huruhusu wahalifu kutumia seva kama wakala kwa ajili ya upatikanaji wa data bila idhini  
- **Uvunjifu wa Mipaka ya Uaminifu**: Huduma za chini zinaweza kuvunjwa kanuni za kuaminika wakati chanzo cha tokeni hakiwezi kuthibitishwa  
- **Upanuzi wa Mashambulizi ya Huduma Nyingi**: Tokeni zilizovamiwa zinakubaliwa huduma nyingi, kuruhusu uhamaji wa upande  

#### **Udhibiti wa Usalama unaohitajika**

**Mahitaji Yasiyotolewesha:**  
- **Uhakikisho wa Tokeni**: Seva za MCP **HAZIFAI** kukubali tokeni zisizotolewa moja kwa moja kwa seva ya MCP  
- **Uhakikisho wa Hadhira**: Hakikisha daima madai ya hadhira ya tokeni yanaendana na kitambulisho cha seva ya MCP  
- **Mzunguko Sahihi wa Tokeni**: Tekeleza tokeni zenye muda mfupi wa uhai na mbinu salama za mizunguko  


## Usalama wa Mnyororo wa Ugavi kwa Mifumo ya AI

Usalama wa mnyororo wa ugavi umeenea zaidi kuliko utegemezi wa kawaida wa programu na sasa unahusisha mfumo mzima wa AI. Utekelezaji wa MCP wa kisasa lazima uthibitishe na kufuatilia kwa makini vipengele vyote vinavyohusiana na AI, kwani kila kimoja kinaweza kuleta mapungufu yanayoweza kuathiri uimara wa mfumo.

### Vipengele Vilivyopanuliwa vya Mnyororo wa Ugavi wa AI

**Utegemezi wa Programu wa Kawaida:**  
- Maktaba na miundombinu ya chanzo wazi  
- Picha za container na mifumo ya msingi  
- Zana za maendeleo na mistari ya ujenzi  
- Vipengele vya miundombinu na huduma  

**Vipengele Maalum vya AI vya Mnyororo wa Ugavi:**  
- **Mifano ya Msingi**: Mifano iliyoandaliwa awali kutoka kwa wasambazaji mbalimbali inayohitaji uthibitisho wa asili  
- **Huduma za Kuongeza Maana**: Huduma za nje za kusanifisha na utafutaji wa semantic  
- **Watoa Muktadha**: Vyanzo vya data, misingi ya maarifa, na majukwaa ya nyaraka  
- **API za Wahusika wa Tatu**: Huduma za AI za nje, mistari ya ML, na vyanzo vya usindikaji data  
- **Vifaa vya Mfano**: Uzito, usanidi, na aina mbalimbali za modeli zilizobinafsishwa  
- **Vyanzo vya Data za Mafunzo**: Mikutano ya data inayotumika kwa mafunzo na uboreshaji  

### Mkakati Kamili wa Usalama wa Mnyororo wa Ugavi

#### **Uthibitisho wa Vipengele na Uaminifu**  
- **Uhakiki wa Asili**: Hakiki asili, leseni, na uimara wa vipengele vyote vya AI kabla ya ushirikiano  
- **Tathmini ya Usalama**: Fanya skanning za udhaifu na mapitio ya usalama kwa mifano, vyanzo vya data, na huduma za AI  
- **Uchambuzi wa Sifa**: Tathmini rekodi za usalama na mbinu za watoa huduma za AI  
- **Uhakiki wa Uzingatiaji**: Hakikisha vipengele vyote vinatimiza mahitaji ya usalama na masharti ya shirika  

#### **Mistari Salama ya Utekelezaji**  
- **Usalama wa CI/CD wa Kiotomatiki**: Sakinia utambuzi wa usalama katika mistari yote ya utekelezaji wa kiotomatiki  
- **Uimara wa Vifaa**: Tekeleza uhakiki wa cryptographic kwa vifaa vyote vilivyowekwa (kanuni, mifano, usanidi)  
- **Utekelezaji wa Hatua kwa Hatua**: Tumia mikakati ya utekelezaji wa hatua kwa hatua kwa uthibitisho wa usalama katika kila hatua  
- **Hifadhi za Vifaa Zinazoaminika**: Tekeleza vifaa kutoka kwa rejista na hifadhi zilizo thibitishwa na salama  

#### **Ufuatiliaji Endelevu na Majibu**  
- **Skanning ya Utegemezi**: Ufuatiliaji endelevu wa udhaifu kwa utegemezi wote wa programu na vipengele vya AI  
- **Ufuatiliaji wa Mfano**: Tathmini endelevu ya tabia za mfano, mabadiliko ya utendaji, na mambo ya usalama yanayoshangaza  
- **Ufuatiliaji wa Afya ya Huduma**: Fuata huduma za AI za nje kwa upatikanaji, matukio ya usalama, na mabadiliko ya sera  
- **Uunganishaji wa Intelijensia ya Vitisho**: Jumuisha virutubisho vya vitisho maalum kwa hatari za usalama za AI na ML  

#### **Udhibiti wa Upatikanaji na Haki ya Chini Kuzuia Mrefu**  
- **Ruhusa kwa Kiwango cha Kipengele**: Zuia upatikanaji kwa mifano, data, na huduma kwa msingi wa mahitaji ya kibiashara  
- **Usimamizi wa Akaunti za Huduma**: Tekeleza akaunti za huduma zilizo maalum zenye ruhusa za chini kabisa zinazohitajika  
- **Mgawanyiko wa Mtandao**: Tengeneza tairi ya kuwatenganisha vipengele vya AI na punguza upatikanaji wa mtandao kati ya huduma  
- **Udhibiti wa Mlango wa API**: Tumia milango kuu ya API kudhibiti na kufuatilia upatikanaji wa huduma za AI za nje  

#### **Majibu ya Matukio na Urejeshaji**  
- **Tarapoti za Majibu ya Haraka**: Taratibu zilizowekwa kwa urekebishaji au kubadili vipengele vya AI vilivyovamiwa  
- **Mizunguko ya Cheti**: Mifumo ya kiotomatiki ya kuzungusha siri, funguo za API, na vyeti vya huduma  
- **Uwezo wa Kurudisha**: Uwezo wa kurudisha haraka kwa toleo lililothibitishwa awali la vipengele vya AI  
- **Urejeshaji wa Uvunjifu wa Mnyororo wa Ugavi**: Taratibu maalum za kukabiliana na uvunjifu wa huduma za AI za juu  

### Zana na Uunganishaji wa Usalama wa Microsoft

**GitHub Advanced Security** hutoa ulinzi kamili wa mnyororo wa ugavi ukijumuisha:  
- **Skanning ya Siri**: Ugundaji wa kiotomatiki wa nywila, funguo za API, na tokeni kwenye hifadhi  
- **Skanning ya Utegemezi**: Tathmini ya udhaifu kwa utegemezi na maktaba za chanzo wazi  
- **Uchambuzi wa CodeQL**: Uchambuzi wa kanuni za kampuni kwa udhaifu wa usalama na matatizo ya kodingi  
- **Maarifa ya Mnyororo wa Ugavi**: Uwezo wa kuona hali ya afya na usalama wa utegemezi  

**Uunganishaji na Azure DevOps & Azure Repos:**  
- Uunganisho wa skanning ya usalama mtawalia katika majukwaa ya maendeleo ya Microsoft  
- Ukaguzi wa usalama wa kiotomatiki katika Azure Pipelines kwa mzigo wa kazi wa AI  
- Utekelezaji wa sera za ulinzi wa vipengele vya AI  

**Mazingira ya Ndani ya Microsoft:**  
Microsoft hutekeleza mbinu za kina za usalama wa mnyororo wa ugavi katika bidhaa zote. Jifunze kuhusu mbinu zilizothibitishwa katika [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Mazoezi Bora ya Usalama wa Msingi

Utekelezaji wa MCP unachukua na kujenga juu ya msimamo wa usalama uliopo wa shirika lako. Kuimarisha mazoezi ya msingi ya usalama huongeza kwa kiasi kikubwa usalama mzima wa mifumo ya AI na uenezaji wa MCP.

### Misingi ya Usalama Muhimu

#### **Mazoezi ya Maendeleo Salama**  
- **Uzingatiwaji wa OWASP**: Linda dhidi ya udhaifu wa maombi ya wavuti wa [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Ulinzi Maalum wa AI**: Tekeleza udhibiti kwa ajili ya [OWASP Top 10 kwa LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Usimamizi Salama wa Siri**: Tumia vichujio maalum kwa tokeni, funguo za API, na data nyeti za usanidi  
- **Usimbaji Salama Kuanzia Mwisho Hadi Mwisho**: Tekeleza mawasiliano salama katika vipengele vyote vya programu na mtiririko wa data  
- **Uhakiki wa Ingizo**: Hakiki kwa ukali ingizo zote za mtumiaji, vigezo vya API, na vyanzo vya data  

#### **Nguvu ya Miundombinu**  
- **Uthibitishaji wa Vipengele vingi (MFA)**: MFA lazima itumike kwa akaunti zote za huduma na usimamizi  
- **Usimamizi wa Vibitisho**: Urekebishaji wa kiotomatiki na wa wakati kwa mifumo, miundombinu, na utegemezi  
- **Uunganisho wa Mtoa Utambulisho**: Usimamizi wa utambulisho wa kila kimoja kupitia watoa huduma wa shirika (Microsoft Entra ID, Active Directory)  
- **Mgawanyiko wa Mtandao**: Kutenganisha sehemu za MCP kimitazamo kupunguza uhamaji wa upande  
- **Kanuni ya Haki ya Chini Kuzuia Mrefu**: Ruhusa za chini kabisa zinazohitajika kwa vipengele vyote vya mfumo na akaunti  

#### **Ufuatiliaji na Ugundaji wa Usalama**  
- **Uandikaji wa Kina**: Rekodi za shughuli za programu za AI, ikijumuisha mwingiliano wa mteja na seva za MCP  
- **Muunganisho wa SIEM**: Usimamizi wa habari na matukio ya usalama kwa ugunduzi wa kasoro  
- **Uchanganuzi wa Tabia**: Ufuatiliaji unaotumia AI kugundua mifumo isiyo ya kawaida katika tabia ya mfumo na mtumiaji  
- **Intelijensia ya Vitisho**: Muunganisho wa virutubisho vya vitisho vya nje na viashiria vya uvamizi (IOCs)  
- **Majibu ya Matukio**: Taratibu wazi za ugunduo, majibu, na urejeshaji wa matukio ya usalama  

#### **Msingi wa Zero Trust**  
- **Kamwe Usiamini, daima Hakikisha**: Ukaguzi wa mara kwa mara wa watumiaji, vifaa, na muunganisho wa mtandao  
- **Mgawanyiko Mdogo Mdogo wa Mtandao**: Udhibiti wa mtandao wa kina unaotenganisha mizigo na huduma binafsi  
- **Usalama Unaolenga Utambulisho**: Sera za usalama zikiangazia vitambulisho vilivyoungwa mkono badala ya eneo la mtandao  
- **Tathmini Endelevu ya Hatari**: Tathmini ya msimamo wa usalama kwa muktadha wa sasa na tabia  
- **Upatikanaji wa Kificho**: Udhibiti wa upatikanaji unaobadilika kulingana na sababu za hatari, eneo, na uaminifu wa kifaa  

### Miundo ya Uunganishaji wa Shirika

#### **Muunganisho wa Eneo la Usalama la Microsoft**  
- **Microsoft Defender for Cloud**: Usimamizi kamili wa msimamo wa usalama za wingu  
- **Azure Sentinel**: SIEM na SOAR ya asili ya wingu kwa ulinzi wa mzigo wa kazi wa AI  
- **Microsoft Entra ID**: Usimamizi wa utambulisho na upatikanaji wa shirika na sera za upatikanaji wa kivicho  
- **Azure Key Vault**: Usimamizi wa siri uliopangwa na msaada wa HSM  
- **Microsoft Purview**: Udhibiti wa data na uzingatiaji kwa vyanzo vya data na michakato ya AI  

#### **Uzingatiaji na Utawala**  
- **Ulinganifu wa Sheria**: Hakikisha utekelezaji wa MCP unakidhi mahitaji ya ulinganifu wa sekta (GDPR, HIPAA, SOC 2)  
- **Uainishaji wa Data**: Kuweka kwenye makundi na usimamizi sahihi wa data nyeti inayoshughulikiwa na mifumo ya AI  
- **Mifumo ya Ufuatiliaji**: Rekodi kamili kwa ulinganifu wa kanuni na uchunguzi wa hatari  
- **Udhibiti wa Faragha**: Tekeleza viwango vya faragha kwa usanifu wa mfumo wa AI  
- **Usimamizi wa Mabadiliko**: Taratibu rasmi za mapitio ya usalama ya mabadiliko ya mfumo wa AI  

Mazoezi haya ya msingi huunda msingi imara wa usalama unaoongeza ufanisi wa udhibiti maalum wa usalama wa MCP na kutoa ulinzi kamili kwa programu zinazoendeshwa na AI.  

## Muhimu wa Usalama Muhimu
- **Mbinu za Usalama Zenye Tabaka**: Changanya mbinu za msingi za usalama (kuandika msimbo salama, ruhusa ndogo kabisa, uhakiki wa mnyororo wa ugavi, ufuatiliaji endelevu) na udhibiti maalum wa AI kwa ulinzi kamili

- **Mazingira Mahususi ya Vitisho vya AI**: Mifumo ya MCP inakabiliwa na hatari za kipekee ikiwa ni pamoja na kuingizwa kwa maagizo, sumu ya zana, uiba wa vikao, matatizo ya msaidizi mchanganyiko, udhaifu wa kupitisha tokeni, na ruhusa nyingi sana zinazohitaji tiba maalum

- **Ubora wa Uthibitishaji na Idhini**: Tekeleza uthibitishaji thabiti kwa kutumia watoa huduma wa utambulisho wa nje (Microsoft Entra ID), sikiliza uthibitishaji sahihi wa tokeni, na usikubali tokeni ambazo hazikutolewa wazi kwa seva yako ya MCP

- **Kuzuia Shambulio la AI**: Tumia Microsoft Prompt Shields na Azure Content Safety kulinda dhidi ya kuingizwa kwa maagizo kwa njia isiyo ya moja kwa moja na mashambulio ya sumu ya zana, huku ukihakiki metadata ya zana na kufuatilia mabadiliko ya mabadiliko

- **Usalama wa Vikao na Usafirishaji**: Tumia IDs za kikao salama kwa kificho, zisizo na utabiri na zifungwa kwa utambulisho wa mtumiaji, ingiza usimamizi sahihi wa mzunguko wa maisha ya kikao, na usitumie vikao kuthibitisha

- **Mbinu Bora za Usalama za OAuth**: Zuia mashambulio ya msaidizi mchanganyiko kupitia idhini ya wazi ya mtumiaji kwa wateja waliosajiliwa kwa nguvu, utekelezaji sahihi wa OAuth 2.1 na PKCE, na uthibitishaji mkali wa URI wa marejeleo  

- **Misingi ya Usalama wa Tokeni**: Epuka mifumo ya kuzuia kupitisha tokeni isiyo sahihi, hakiki madai ya hadhira ya tokeni, tumia tokeni za muda mfupi zenye mzunguko salama, na hifadhi mipaka wazi ya uaminifu

- **Usalama Kamili wa Mnyororo wa Ugavi**: Tibu vipengele vyote vya ikolojia ya AI (miundo, embeddings, wazalishaji wa muktadha, API za nje) kwa ukali sawa wa usalama kama bidhaa za kawaida za programu

- **Mabadiliko Endelevu**: Endelea kuwa wa kisasa na maalum wa sifa za MCP zinazobadilika kwa kasi, changia viwango vya jumuiya ya usalama, na hifadhi mwelekeo wa usalama unaobadilika kadri itakavyokuwa na maendeleo ya itifaki

- **Uunganisho wa Usalama wa Microsoft**: Tumia mfumo kamili wa usalama wa Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) kwa ulinzi bora wa utekelezaji wa MCP

## Rasilimali Kamili

### **Nyaraka Rasmi za Usalama za MCP**
- [MCP Specification (Sasa: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **Rasilimali za Usalama za OWASP MCP**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 kamili kwa mwongozo wa utekelezaji wa Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hatari rasmi za usalama za OWASP MCP
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Mafunzo ya vitendo ya usalama kwa MCP kwenye Azure

### **Viwango na Mbinu Bora za Usalama**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 kwa Miundo Mikubwa ya Lugha](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Ripoti ya Ulinzi wa Dijitali ya Microsoft](https://aka.ms/mddr)

### **Utafiti na Uchambuzi wa Usalama wa AI**
- [Kuingizwa kwa Maagizo katika MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Mashambulio ya Sumu ya Zana (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Ripoti ya Utafiti wa Usalama wa MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Suluhisho za Usalama za Microsoft**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Huduma ya Usalama wa Maudhui ya Azure](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Mwongozo wa Utekelezaji na Mafunzo**
- [Usimamizi wa API za Azure kama Mlango wa Uthibitishaji wa MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Uthibitishaji wa Microsoft Entra ID na Seva za MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Uhifadhi Salama wa Tokeni na Usimbaji (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **Usalama wa DevOps na Mnyororo wa Ugavi**
- [Usalama wa Azure DevOps](https://azure.microsoft.com/products/devops)
- [Usalama wa Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Safari ya Usalama wa Mnyororo wa Ugavi wa Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Nyaraka Zaidi za Usalama**

Kwa mwongozo wa kina wa usalama, rejea nyaraka maalum hapa katika sehemu hii:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Mbinu kamili bora za usalama kwa utekelezaji wa MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Mifano ya utekelezaji wa vitendo kwa kuingiza Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Udhibiti na mbinu mpya za usalama kwa utekelezaji wa MCP
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Mwongozo wa rejea haraka kwa mbinu muhimu za usalama za MCP
- **[BlueHat 2026: Usalama wa ndani wa AI: Usalama wa MCP kwa mifumo ya ulinzi kwa kina](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Mifumo ya ulinzi kwa kina kutoka Microsoft Security Response Center (MSRC)

### **Mafunzo ya Vitendo ya Usalama**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Warsha kamili ya vitendo za usalama kwa seva za MCP katika Azure na kambi za maendeleo kutoka Base Camp hadi Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Miundo ya rejea na mwongozo wa utekelezaji kwa hatari zote 10 za juu za OWASP MCP

---

## Ifuatayo

Ifuatayo: [Sura 3: Kuanzia](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->