# Mazoezi Bora ya Usalama wa MCP - Sasisho la Februari 2026

> **Muhimu**: Hati hii inaonyesha mahitaji ya usalama ya hivi karibuni ya [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) na [Mazoezi Bora ya Usalama ya MCP Rasmi](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Kila mara rejelea mwongozo wa sasa kwa mwongozo wa hivi karibuni zaidi.

## 🏔️ Mafunzo ya Vitendo ya Usalama

Kwa uzoefu wa utekelezaji wa vitendo, tunapendekeza **[Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - safari ya kina ya kuongoza usalama wa seva za MCP katika Azure. Warsha inashughulikia hatari zote za OWASP MCP Top 10 kupitia mbinu ya "dhaifu → shambulizi → tafutia → thibitisha".

Mazoezi yote katika hati hii yanaendana na **[Mwongozo wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** kwa mwongozo wa utekelezaji maalum wa Azure.

## Mazoezi Muhimu ya Usalama kwa Utekelezaji wa MCP

Model Context Protocol inaleta changamoto za kipekee za usalama zinazozidi usalama wa kawaida wa programu. Mazoezi haya yanashughulikia mahitaji ya msingi ya usalama na vitisho maalum vya MCP ikiwemo sindano ya maagizo, sumu ya zana, udukuzi wa kikao, matatizo ya msaidizi mchafu, na udhaifu wa kupitisha tokeni.

### **Mahitaji ya Usalama YANAYOLOZWA KUBWA**

**Mahitaji Muhimu Kutoka MCP Specification:**

### **Mahitaji ya Usalama YANAYOLOZWA KUBWA**

**Mahitaji Muhimu Kutoka MCP Specification:**

> **HAIPASWI**: Seva za MCP **haipaswi** kukubali tokeni zozote ambazo hazikutolewa wazi kwa seva ya MCP  
>  
> **LAZIMU**: Seva za MCP zinapotekeleza mamlaka **lazimu** kuthibitisha maombi yote yanayoingia  
>  
> **HAIPASWI**: Seva za MCP **haipaswi** kutumia vikao kwa uthibitishaji  
>  
> **LAZIMU**: Seva za wakala za MCP zinazotumia vitambulisho vya mteja vya kudumu **lazimu** kupata idhini ya mtumiaji kwa kila mteja aliyesajiliwa kwa nguvu

---

## 1. **Usalama wa Tokeni & Uthibitishaji**

**Dhibiti za Uthibitishaji & Ruhusa:**
   - **Uhakiki Mkali wa Ruhusa**: Fanya ukaguzi kamili wa mantiki ya ruhusa ya seva ya MCP kuhakikisha ni watumiaji na wateja waliokusudiwa tu wanaoweza kufikia rasilimali
   - **Muungano wa Mtoa Utambulisho wa Nje**: Tumia watoa utambulisho waliobainishwa kama Microsoft Entra ID badala ya kutekeleza uthibitishaji maalum
   - **Uthibitishaji wa Hadhira ya Tokeni**: Kila mara thibitisha kuwa tokeni zilitolewa wazi kwa seva yako ya MCP - kamwe usikubali tokeni za ngazi ya juu
   - **Mzunguko Sahihi wa Tokeni**: Tekeleza mzunguko salama wa tokeni, sera za kuzidi muda, na zuia mashambulizi ya kurudia tokeni

**Uhifadhi Salama wa Tokeni:**
   - Tumia Azure Key Vault au maduka salama ya siri kwa funguo zote  
   - Tekeleza usimbaji fiche kwa tokeni wakati wako na wakati wa kusafirishwa  
   - Mzunguko wa kawaida wa funguo na ufuatiliaji wa upatikanaji usioidhinishwa  

## 2. **Usimamizi wa Kikao & Usalama wa Usafirishaji**

**Mazoezi Salama ya Kikao:**
   - **Vitambulisho vya Kikao Salama Ki-isiri**: Tumia vitambulisho vya kikao visivyoweza kubashiri vikiwa vimetengenezwa kwa jenereta salama ya nambari nasibu  
   - **Ufungamanishi wa Mtumiaji Mmoja kwa Moja**: Funga vitambulisho vya kikao kwa vitambulisho vya watumiaji kwa kutumia fomati kama `<user_id>:<session_id>` kuzuia matumizi mabaya baina ya watumiaji  
   - **Usimamizi wa Mzunguko wa Kikao**: Tekeleza kuisha, mzunguko, na kuharibu kwa usahihi ili kupunguza mazingira ya hatari  
   - **Utekelezaji wa HTTPS/TLS**: HTTPS ni lazima kwa mawasiliano yote kuzuia wizi wa vitambulisho vya kikao  

**Usalama wa Tabaka la Usafirishaji:**
   - Sanidi TLS 1.3 pale inapowezekana kwa usimamizi sahihi wa vyeti  
   - Tekeleza kuweka ngumu kwa vyeti kwa miunganisho muhimu  
   - Mzunguko wa kawaida wa vyeti na uhakiki wa uhalali  

## 3. **Ulinzi Maalum wa Vitisho vya AI** 🤖

**King’amuzi cha Sindano ya Maagizo:**
   - **Microsoft Prompt Shields**: Tumia AI Prompt Shields kwa utambuzi wa hali ya juu na uchujaji wa maagizo hatari  
   - **Usafishaji wa Ingizo**: Thibitisha na safisha viingizo vyote kuzuia mashambulizi ya sindano na matatizo ya msaidizi mchafu  
   - **Mikataba ya Yaliyomo**: Tumia mfumo wa delimiters na datamarking kutofautisha maagizo ya kuaminika na yaliyomo ya nje  

**Kuzuia Sumu ya Zana:**
   - **Uhakiki wa Meta-data ya Zana**: Tekeleza ukaguzi wa uadilifu kwa maelezo ya zana na fuatilia mabadiliko yasiyotarajiwa  
   - **Ufuatiliaji wa Muda wa Kujitokeza kwa Zana**: Fuatilia tabia za wakati wa utekelezaji na anzisha arifa kwa mfano wa utekelezaji usiotarajiwa  
   - **Mchakato wa Idhini**: Hitaji idhini wazi ya mtumiaji kwa mabadiliko ya zana na uwezo  

## 4. **Udhibiti wa Upatikanaji & Vibali**

**Kanuni ya Udhibiti wa Upatikanaji wa Dutu Ndogo:**
   - Toa seva za MCP vibali vya chini kabisa vinavyohitajika kwa utendakazi uliokusudiwa  
   - Tekeleza udhibiti wa upatikanaji kulingana na majukumu (RBAC) yenye vibali vyenye usahihi wa hali ya juu  
   - Hakiki za mara kwa mara za vibali na ufuatiliaji wa kuongezeka kwa vibali  

**Dhibiti za Vibali Wakati wa Kutekeleza:**
   - Weka mipaka ya rasilimali kuzuia mashambulizi ya upotezaji rasilimali  
   - Tumia upunguzaji wa kontena kwa mazingira ya utekelezaji wa zana  
   - Tekeleza upatikanaji wa wakati halisi kwa kazi za usimamizi  

## 5. **Usalama wa Yaliyomo & Ufuatiliaji**

**Utekelezaji wa Usalama wa Yaliyomo:**
   - **Muungano wa Azure Content Safety**: Tumia Azure Content Safety kugundua yaliyomo hatari, jaribio la kuvunja ulinzi, na ukiukaji wa sera  
   - **Uchambuzi wa Tabia**: Tekeleza ufuatiliaji wa tabia wakati wa utekelezaji kugundua mambo yasiyo ya kawaida katika seva ya MCP na zana  
   - **Kufuatilia Kwa Kina**: Rekodi jaribio zote za kuthibitisha, kuitisha zana, na matukio ya usalama kwa uhifadhi salama usiovunjika  

**Ufuatiliaji Endelevu:**
   - Arifa za moja kwa moja kwa mifumo ya kutiliwa shaka na jaribio la upatikanaji usioruhusiwa  
   - Muungano na mifumo ya SIEM kwa usimamizi wa matukio ya usalama kwa makao makuu  
   - Ukaguzi wa usalama wa mara kwa mara na majaribio ya mikwaruzo kwa utekelezaji wa MCP  

## 6. **Usalama wa Mnyororo wa Ugavi**

**Uhakiki wa Vipengele:**
   - **Uchunguzi wa Kutegemea**: Tumia skani za kiotomatiki kugundua udhaifu kwa zote tegemezi za programu na vipengele vya AI  
   - **Uthibitishaji wa Asili**: Hakiki asili, leseni, na uadilifu wa mifumo, vyanzo vya data, na huduma za nje  
   - **Vifurushi Vilivyotiwa Sahihi**: Tumia vifurushi vilivyo na sahihi za kidijitali na hakiki sahihi kabla ya usambazaji  

**Mtiririko Salama wa Maendeleo:**
   - **GitHub Advanced Security**: Tekeleza ukaguzi wa siri, uchambuzi wa tegemezi, na uchambuzi wa CodeQL wa statiki  
   - **Usalama wa CI/CD**: Jumuisha uthibitishaji wa usalama katika njia za usambazaji za kiotomatiki  
   - **Uadilifu wa Kifaa**: Tekeleza uhakiki wa kidijitali kwa vifaa vilivyotolewa na usanidi  

## 7. **Usalama wa OAuth & Kuzuia Msaidizi Mchafu**

**Utekelezaji wa OAuth 2.1:**
   - **Utekelezaji wa PKCE**: Tumia Proof Key for Code Exchange (PKCE) kwa maombi yote ya ruhusa  
   - **Idhini ya Wazi**: Pata idhini ya mtumiaji kwa kila mteja aliyesajiliwa kwa nguvu kuzuia mashambulizi ya msaidizi mchafu  
   - **Uthibitishaji wa Redirect URI**: Tekeleza uthibitishaji mkali wa redirect URIs na kitambulisho cha mteja  

**Usalama wa Wakala:**
   - Zuia kupita upatikanaji kwa kutumia vitambulisho vya mteja vya kudumu  
   - Tekeleza mchakato sahihi wa idhini kwa upatikanaji wa API wa pande za tatu  
   - Fuatilia wizi wa msimbo wa ruhusa na upatikanaji usioidhinishwa wa API  

## 8. **Majibu ya Tukio & Urejeshaji**

**Uwezo wa Kujibu Haraka:**
   - **Majibu ya Kiotomatiki**: Tekeleza mifumo ya kiotomatiki kwa mzunguko wa funguo na udhibiti wa vitisho  
   - **Taratibu za Kurudisha Nyuma**: Uwezo wa kurudisha haraka usanidi na vipengele vilivyo salama  
   - **Uwezo wa Uchunguzi wa Kisheria**: Mfuatano wa kina wa ukaguzi na kumbukumbu kwa uchunguzi wa tukio  

**Mawasiliano & Uratibu:**
   - Taratibu wazi za kuinua taratibu za usalama  
   - Muungano na timu za majibu ya tukio za shirika  
   - Mazoezi ya mara kwa mara ya mazoezi ya matukio ya usalama  

## 9. **Ufuataji wa Sheria & Utawala**

**Uzingatiaji wa Sheria:**
   - Hakikisha utekelezaji wa MCP unakidhi mahitaji maalum ya sekta (GDPR, HIPAA, SOC 2)  
   - Tekeleza upangaji wa data na udhibiti wa faragha kwa usindikaji wa data za AI  
   - Hifadhi nyaraka kamili kwa ukaguzi wa ufuataji  

**Usimamizi wa Mabadiliko:**
   - Taratibu za ukaguzi rasmi wa usalama kwa mabadiliko yote ya mfumo wa MCP  
   - Udhibiti wa toleo na mchakato wa idhini kwa mabadiliko ya usanidi  
   - Tathmini za mara kwa mara za ufuataji na uchambuzi wa mapungufu  

## 10. **Dhibiti za Usalama Zinazoendelea**

**Muktadha wa Hakika Sifuri:**
   - **Usiamini Kamwe, Hakikisha Kila Mara**: Thibitisho endelevu za watumiaji, vifaa, na miunganisho  
   - **Ugawaji Mdogo**: Dhibiti mitandao ikiwa mikataba kwa vipengele binafsi vya MCP  
   - **Upatikanaji wa Masharti**: Udhibiti wa upatikanaji unaotegemea hatari unaobadilika kulingana na muktadha na tabia  

**Ulinzi wa Programu Wakati wa Kutekeleza:**
   - **Ulinzi wa Programu Maisha Wakati wa Kutekeleza (RASP)**: Tumia mbinu za RASP kwa utambuzi wa vitisho kwa wakati halisi  
   - **Ufuatiliaji wa Utendaji wa Programu**: Fuatilia mifano isiyo ya kawaida ya utendaji inayoweza kuashiria mashambulizi  
   - **Sera za Usalama Zinazobadilika**: Tekeleza sera za usalama zinazobadilika kulingana na mazingira ya hatari ya sasa  

## 11. **Muungano wa Mfumo wa Usalama wa Microsoft**

**Usalama Kamili wa Microsoft:**
   - **Microsoft Defender for Cloud**: Usimamizi wa muktadha wa usalama wa wingu kwa mzigo wa kazi za MCP  
   - **Azure Sentinel**: SIEM na uwezo wa SOAR wa asili wa wingu kwa utambuzi wa vitisho vya hali ya juu  
   - **Microsoft Purview**: Utawala wa data na ufuataji wa AI kwa mchakato wa data na vyanzo vya data  

**Utawala wa Utambulisho & Upatikanaji:**
   - **Microsoft Entra ID**: Usimamizi wa utambulisho wa taasisi na sera za upatikanaji masharti  
   - **Usimamizi wa Utambulisho wa Kipekee (PIM)**: Upatikanaji wa wakati halisi na mchakato wa idhini kwa kazi za usimamizi  
   - **Ulinzi wa Utambulisho**: Upatikanaji wa masharti kulingana na hatari na majibu ya kiotomatiki kwa vitisho  

## 12. **Mabadiliko Endelevu ya Usalama**

**Kuwa wa Kisasa:**
   - **Ufuatiliaji wa Maelezo ya Maelezo**: Mapitio ya mara kwa mara ya sasisho za MCP na mabadiliko ya miongozo ya usalama  
   - **Ujasusi wa Vitisho**: Muungano wa taarifa maalum za vitisho vya AI na viashiria vya ukiukaji  
   - **Ushiriki wa Jamii ya Usalama**: Ushiriki hai katika jamii ya usalama ya MCP na programu za kufichua udhaifu  

**Usalama unaobadilika:**
   - **Usalama wa Kujifunza Mashine**: Tumia utambuzi wa mifumo ya ML kwa kutambua mifumo mipya ya mashambulizi  
   - **Uchanganuzi wa Usalama unaotabirika**: Tekeleza mifano ya utabiri kwa utambuzi wa hatari za mapema  
   - **Mifumo ya Kiotomatiki ya Usalama**: Sasisho za sera za usalama kiotomatiki kulingana na taarifa za vitisho na mabadiliko ya maelezo  

---

## **Rasilimali Muhimu za Usalama**

### **Hati Rasmi za MCP**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Mazoezi Bora ya Usalama ya MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Rasilimali za Usalama za OWASP MCP**
- [Mwongozo wa Usalama wa MCP Azure wa OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 kamili na utekelezaji wa Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Hatari rasmi za usalama wa OWASP MCP  
- [Warsha ya Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Mafunzo ya vitendo ya usalama kwa MCP kwenye Azure  

### **Suluhisho za Usalama za Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Usalama wa Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Viwango vya Usalama**
- [Mazoezi Bora ya Usalama ya OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 kwa Mifumo Mikubwa ya Lugha](https://genai.owasp.org/)
- [Mfumo wa Usimamizi wa Hatari wa AI wa NIST](https://www.nist.gov/itl/ai-risk-management-framework)

### **Mwongozo wa Utekelezaji**
- [Menyu ya Uthibitishaji ya Azure API Management MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID na Seva za MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Taarifa za Usalama**: Mazoezi ya usalama ya MCP yanabadilika kwa kasi. Daima hakikisha dhidi ya [maelezo ya MCP](https://spec.modelcontextprotocol.io/) ya sasa na [nyaraka rasmi za usalama](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) kabla ya utekelezaji.

## Nini Kifuatacho

- Soma: [Dhibiti za Usalama za MCP 2025](./mcp-security-controls-2025.md)
- Rudi kwa: [Muhtasari wa Moduli ya Usalama](./README.md)
- Endelea na: [Moduli 3: Anza](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kielelezo cha msamaha**:
Nyaraka hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kuhakikisha usahihi, tafadhali fahamu kuwa tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Nyaraka asili katika lugha yake ya asili inapaswa kuzingatiwa kama chanzo cha mamlaka. Kwa habari muhimu, tafsiri ya kitaalamu na ya binadamu inashauriwa. Hatubebwi jukumu la kutoelewana au tafsiri isiyo sahihi inayotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->