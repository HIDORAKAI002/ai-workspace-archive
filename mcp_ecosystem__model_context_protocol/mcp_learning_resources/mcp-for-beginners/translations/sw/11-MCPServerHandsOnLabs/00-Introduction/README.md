# Utangulizi kwa Uunganishaji wa Hifadhidata wa MCP

## 🎯 Kile Kile Kiwalabu Hiki Kinashughulikia

Kiwalabu hiki cha utangulizi kinatoa muhtasari wa kina wa jinsi ya kujenga seva za Model Context Protocol (MCP) zenye uunganishaji na hifadhidata. Utakuwa na uelewa wa kesi ya biashara, usanifu wa kiufundi, na matumizi halisi kupitia kesi ya matumizi ya uchambuzi wa mauzo ya Zava Retail kwenye https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Muhtasari

**Model Context Protocol (MCP)** inawezesha wasaidizi wa AI kupata na kuingiliana salama na vyanzo vya data vya nje kwa wakati halisi. Inapounganishwa na hifadhidata, MCP hutoa uwezo mkubwa kwa matumizi ya AI yanayotegemea data.

Njia hii ya kujifunza inakufundisha jinsi ya kujenga seva za MCP zinazoweza kutumiwa uzalishaji zinazounganisha wasaidizi wa AI na data za mauzo ya rejareja kupitia PostgreSQL, zikitekeleza mifumo ya biashara kama Row Level Security, utafutaji wa maana, na ufikiaji wa data kwa wamiliki wengi.

## Malengo ya Kujifunza

Mwisho wa kiwalabu hiki, utaweza:

- **Fafanua** Model Context Protocol na faida zake kuu kwa uunganishaji wa hifadhidata  
- **Tambua** vipengele muhimu vya usanifu wa seva ya MCP na hifadhidata  
- **Elewa** kesi ya matumizi ya Zava Retail na mahitaji yake ya biashara  
- **Tambua** mifumo ya biashara kwa ufikiaji salama na wenye upanuzi wa hifadhidata  
- **Orodhesha** zana na teknolojia zilizotumika katika njia hii ya kujifunza  

## 🧭 Changamoto: AI Inakutana na Data Halisi

### Mipaka ya AI ya Kihistoria

Masaidizi wa kisasa wa AI ni wenye nguvu sana lakini wanakumbana na mipaka mikubwa wakati wakifanya kazi na data halisi za biashara:

| **Changamoto** | **Maelezo** | **Athari za Biashara** |
|---------------|-------------|----------------------|
| **Maarifa Yaliyosimama** | Mifano ya AI iliyofunzwa kwa seti za data zilizowekwa haiwezi kupata data za sasa za biashara | Maarifa yaliyotimia, fursa zilizokosa |
| **Data Zilizotengwa** | Taarifa zimefungwa katika hifadhidata, API, na mifumo ambayo AI haiwezi kufikia | Uchambuzi usio kamili, mtiririko wa kazi uliovunjika |
| **Vizuizi vya Usalama** | Ufikiaji wa moja kwa moja wa hifadhidata unaibua wasiwasi wa usalama na ufuataji | Usambazaji mdogo, maandalizi ya data kwa mikono |
| **Maswali Magumu** | Watumiaji wa biashara wanahitaji ujuzi wa kiufundi kutoa maarifa ya data | Kupungua kwa matumizi, michakato isiyotegemeka |

### Suluhisho la MCP

Model Context Protocol inashughulikia changamoto hizi kwa kutoa:

- **Ufikiaji wa Data kwa Wakati Halisi**: Wasaidizi wa AI huuliza hifadhidata na API hai  
- **Uunganishaji Salama**: Ufikiaji uliodhibitiwa kwa uthibitisho na vibali  
- **Kiolesura cha Lugha Asilia**: Watumiaji wa biashara huuliza maswali kwa Kiingereza cha kawaida  
- **Itifaki Iliyosanifishwa**: Inafanya kazi kwenye majukwaa na zana tofauti za AI  

## 🏪 Kutana na Zava Retail: Kesi Yetu ya Kujifunza https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Katika njia hii ya kujifunza, tutajenga seva ya MCP kwa **Zava Retail**, mnyororo wa rejareja wa DIY wa kubuniwa mwenye maduka mengi. Hali halisi hii inaonyesha utekelezaji wa MCP wa daraja la kampuni.

### Muktadha wa Biashara

**Zava Retail** inafanya kazi:
- **Maduka 8 halisi** kote katika jimbo la Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **Duka 1 mtandaoni** kwa mauzo ya e-commerce  
- **Katalogi ya bidhaa mbalimbali** ikiwa ni zana, vifaa vya nyumbani, vifaa vya bustani, na vifaa vya ujenzi  
- **Usimamizi wa ngazi nyingi** kwa wasimamizi wa maduka, wasimamizi wa mikoa, na wakurugenzi  

### Mahitaji ya Biashara

Wasimamizi wa maduka na wakurugenzi wanahitaji uchambuzi unaoendeshwa na AI ili:

1. **Kuchambua utendakazi wa mauzo** kote madukani na katika vipindi vya muda  
2. **Kufuata viwango vya hesabu** na kubaini mahitaji ya upandaji tena  
3. **Kuelewa tabia za wateja** na mifumo ya ununuzi  
4. **Kubaini maarifa ya bidhaa** kupitia utafutaji wa maana  
5. **Kutengeneza ripoti** kwa maswali ya lugha ya asili  
6. **Kudumisha usalama wa data** kwa udhibiti wa ufikiaji kulingana na majukumu  

### Mahitaji ya Kiufundi

Seva ya MCP lazima itoe:

- **Ufikiaji wa data kwa wamiliki wengi** ambapo wasimamizi wa maduka wanaona data za duka lao tu  
- **Utafutaji wa kubadilika** unaounga mkono shughuli ngumu za SQL  
- **Utafutaji wa maana** kwa kugundua bidhaa na mapendekezo  
- **Data kwa wakati halisi** inayowakilisha hali ya sasa ya biashara  
- **Uthibitishaji salama** kwa usalama wa ngazi ya mstari (row-level security)  
- **Usanifu wenye upanuzi** unaounga mkono watumiaji wengi kwa wakati mmoja  

## 🏗️ Muhtasari wa Usanifu wa Seva ya MCP

Seva yetu ya MCP ina utekelezaji wa usanifu wa tabaka uliohifadhiwa kwa ajili ya uunganishaji wa hifadhidata:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Vipengele Muhimu

#### **1. Tabaka la Seva ya MCP**
- **Freimu ya FastMCP**: Utekelezaji wa seva ya MCP wa kisasa katika Python  
- **Usajili wa Zana**: Ufafanuzi wa zana kwa kutumia mbinu za mfano salama  
- **Muktadha wa Ombi**: Utambuzi wa mtumiaji na usimamizi wa vikao  
- **Udhibiti wa Makosa**: Usimamizi mzuri wa makosa na ufuatiliaji  

#### **2. Tabaka la Uunganishaji wa Hifadhidata**
- **Usimamizi wa Mifumo ya Muunganisho**: Usimamizi bora wa muunganisho wa asyncpg  
- **Mtoa Mfumo wa Jedwali**: Ugundaji wa mizunguko ya jedwali kwa njia ya kiotomatiki  
- **Mtendaji wa Maswali**: Utekelezaji salama wa SQL kwa muktadha wa RLS  
- **Usimamizi wa Miamala**: Uzingatiaji wa ACID na usimamizi wa kurudisha nyuma  

#### **3. Tabaka la Usalama**
- **Usalama wa Ngazi ya Mstari**: PostgreSQL RLS kwa kutenganisha data za wamiliki wengi  
- **Utambulisho wa Mtumiaji**: Uthibitishaji na ruhusa za msimamizi wa duka  
- **Udhibiti wa Ufikiaji**: Vibali vya kina na kumbukumbu za ukaguzi  
- **Uthibitishaji wa Ingizo**: Kuzuia sindano ya SQL na uthibitishaji wa maswali  

#### **4. Tabaka la Uboreshaji wa AI**
- **Utafutaji wa Maana**: Kufanyia kazi viganja vya alama za vekta kwa kugundua bidhaa  
- **Uunganishaji wa Azure OpenAI**: Uzalishaji wa viganja vya maandishi  
- **Algoriti za Ulinganisho**: Utafutaji wa ugumu kwa kutumia pgvector cosine similarity  
- **Uboreshaji wa Utafutaji**: Kuweka viashiria na tuning ya utendaji  

## 🔧 Teknohama Mtambuka

### Teknolojia za Msingi

| **Sehemu** | **Teknolojia** | **Madhumuni** |
|------------|----------------|---------------|
| **Freimu ya MCP** | FastMCP (Python) | Utekelezaji wa seva ya MCP wa kisasa |
| **Hifadhidata** | PostgreSQL 17 + pgvector | Data ya mahusiano na utafutaji wa vekta |
| **Huduma za AI** | Azure OpenAI | Viganja vya maandishi na mifano ya lugha |
| **Ufungashaji** | Docker + Docker Compose | Mazingira ya maendeleo |
| **Jukwaa la Wingu** | Microsoft Azure | Usambazaji wa uzalishaji |
| **Uunganisho wa IDE** | VS Code | Mazungumzo ya AI na mtiririko wa maendeleo |

### Zana za Maendeleo

| **Zana** | **Madhumuni** |
|----------|---------------|
| **asyncpg** | Dereva wa PostgreSQL wenye utendaji wa juu |
| **Pydantic** | Uthibitishaji na serialization ya data |
| **Azure SDK** | Uunganisho wa huduma za wingu |
| **pytest** | Mfumo wa upimaji |
| **Docker** | Ufungashaji na usambazaji |

### Mtambuka wa Uzalishaji

| **Huduma** | **Rasilimali ya Azure** | **Madhumuni** |
|------------|------------------------|---------------|
| **Hifadhidata** | Azure Database for PostgreSQL | Huduma inayosimamiwa ya hifadhidata |
| **Kontena** | Azure Container Apps | Uendeshaji wa kontena zisizo na seva |
| **Huduma za AI** | Microsoft Foundry | Mifano na vituo vya OpenAI |
| **Ufuatiliaji** | Application Insights | Uwezo wa kuonekana na uchunguzi |
| **Usalama** | Azure Key Vault | Usimamizi wa siri na usanidi |

## 🎬 Hali Halisi za Matumizi

Hebu tuchunguze jinsi watumiaji tofauti wanavyoshirikiana na seva yetu ya MCP:

### Hali ya 1: Mapitio ya Utendakazi wa Msimamizi wa Duka

**Mtumiaji**: Sarah, Msimamizi wa Duka la Seattle  
**Lengo**: Kuchambua utendakazi wa mauzo wa robo ya mwisho

**Swali la Lugha Asilia**:  
> "Nionyeshe bidhaa 10 bora kwa mapato kwa duka langu katika Robo 4 2024"

**Kinachotokea**:  
1. Mazungumzo ya AI ya VS Code hutuma swali kwa seva ya MCP  
2. Seva ya MCP hutambua muktadha wa duka la Sarah (Seattle)  
3. Sera za RLS huchuja data kwa duka la Seattle tu  
4. Swali la SQL linaandaliwa na kutekelezwa  
5. Matokeo yanapangwa na kurudishwa kwa Mazungumzo ya AI  
6. AI hutoa uchambuzi na maarifa  

### Hali ya 2: Ugunduzi wa Bidhaa kwa Utafutaji wa Maana

**Mtumiaji**: Mike, Msimamizi wa Hesabu  
**Lengo**: Kupata bidhaa zinazofanana na ombi la mteja

**Swali la Lugha Asilia**:  
> "Bidhaa gani tunauza zinazofanana na 'vifungashio vya umeme visivyo na maji kwa matumizi ya nje'?"

**Kinachotokea**:  
1. Swali hulindwa na zana ya utafutaji wa maana  
2. Azure OpenAI huzalisha alama za vekta za maandishi  
3. pgvector hufanya utafutaji wa ugumu wa vekta  
4. Bidhaa zinazohusiana zinaorodheshwa kwa umuhimu  
5. Matokeo yanajumuisha maelezo ya bidhaa na upatikanaji  
6. AI inapendekeza mbadala na fursa za kuunganishwa pamoja  

### Hali ya 3: Uchambuzi kwa Mabara ya Maduka

**Mtumiaji**: Jennifer, Msimamizi wa Mkoa  
**Lengo**: Kulinganisha utendakazi katika maduka yote

**Swali la Lugha Asilia**:  
> "Linganishe mauzo kwa kategoria kwa maduka yote kwa miezi 6 iliyopita"

**Kinachotokea**:  
1. Muktadha wa RLS umewekwa kwa ufikiaji wa msimamizi wa mkoa  
2. Swali tata la maduka mengi linaandaliwa  
3. Data huchanganywa kote maeneo ya maduka  
4. Matokeo yanajumuisha mwelekeo na kulinganisha  
5. AI hutambua maarifa na mapendekezo  

## 🔒 Usalama na Uchambuzi wa Kina wa Multi-Tenancy

Utekelezaji wetu unaweka kipaumbele usalama wa daraja la biashara:

### Usalama wa Ngazi ya Mstari (RLS)

PostgreSQL RLS huhakikisha kutenganishwa kwa data:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Usimamizi wa Utambulisho wa Mtumiaji

Kila muunganisho wa MCP unajumuisha:  
- **Kitambulisho cha msimamizi wa duka**: Kitambulisho cha kipekee kwa muktadha wa RLS  
- **Ugawaji wa Majukumu**: Vibali na ngazi za ufikiaji  
- **Usimamizi wa Vikao**: Tokeni salama za uthibitisho  
- **Ufuatiliaji wa Ukaguzi**: Historia kamili ya ufikiaji  

### Ulinzi wa Data

Tabaka nyingi za usalama:  
- **Ufungaji wa Muunganisho**: TLS kwa muunganisho wote wa hifadhidata  
- **Kuzuia Sindano ya SQL**: Maswali yaliyo na vigezo pekee  
- **Uthibitishaji wa Ingizo**: Uthibitishaji wa kina wa maombi  
- **Udhibiti wa Makosa**: Hakuna data nyeti katika ujumbe wa makosa  

## 🎯 Vidokezo Muhimu

Baada ya kumaliza utangulizi huu, unapaswa kuelewa:

✅ **Thamani ya MCP**: Jinsi MCP inavyounganisha wasaidizi wa AI na data halisi  
✅ **Muktadha wa Biashara**: Mahitaji na changamoto za Zava Retail  
✅ **Muhtasari wa Usanifu**: Vipengele muhimu na mwingiliano wake  
✅ **Teknohama Mtambuka**: Zana na freimu zilizotumika  
✅ **Mfumo wa Usalama**: Ufikiaji na ulinzi wa data za wamiliki wengi  
✅ **Mifumo ya Matumizi**: Hali halisi za maswali na mtiririko wa kazi  

## 🚀 Hatua Ifuatayo

Uko tayari kuingia zaidi? Endelea na:

**[Lab 01: Core Architecture Concepts](../01-Architecture/README.md)**

Jifunze kuhusu mifumo ya usanifu wa seva ya MCP, kanuni za muundo wa hifadhidata, na utekelezaji wa kiufundi wa kina unaochochea suluhisho letu la uchambuzi wa rejareja.

## 📚 Rasilimali Zaidi

### Nyaraka za MCP
- [MCP Specification](https://modelcontextprotocol.io/docs/) - Nyaraka rasmi za itifaki  
- [MCP for Beginners](https://aka.ms/mcp-for-beginners) - Mwongozo kamili wa kujifunza MCP  
- [FastMCP Documentation](https://github.com/modelcontextprotocol/python-sdk) - Nyaraka za SDK ya Python  

### Uunganishaji wa Hifadhidata
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Marejeleo kamili ya PostgreSQL  
- [pgvector Guide](https://github.com/pgvector/pgvector) - Nyaraka za ugani wa vekta  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Mwongozo wa PostgreSQL RLS  

### Huduma za Azure
- [Azure OpenAI Documentation](https://docs.microsoft.com/azure/cognitive-services/openai/) - Uunganisho wa huduma za AI  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Huduma inayosimamiwa ya hifadhidata  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Kontena zisizo na seva  

---

**Tangazo**: Hii ni mazoezi ya kujifunza kwa kutumia data ya rejareja ya kubuniwa. Daima fuata sera za usimamizi wa data na usalama za shirika lako unapoleta suluhisho kama hizi katika mazingira ya uzalishaji.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->