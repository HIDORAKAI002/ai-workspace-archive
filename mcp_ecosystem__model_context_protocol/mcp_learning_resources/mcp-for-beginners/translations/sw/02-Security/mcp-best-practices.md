# MCP Mbinu Bora za Usalama 2025

Mwongozo huu wa kina unaelezea mbinu muhimu za usalama kwa ajili ya kutekeleza mifumo ya Model Context Protocol (MCP) kulingana na **MCP Specification 2025-11-25** ya hivi karibuni na viwango vya tasnia vya sasa. Mbinu hizi zinashughulikia masuala ya usalama ya jadi pamoja na vitisho maalum vya AI vinavyotokana na matumizi ya MCP.

## Mahitaji Muhimu ya Usalama

### Vizuizi Vinavyopaswa Kutekelezwa (MUST Mahitaji)

1. **Uthibitishaji wa Tokeni**: Seva za MCP **HAZITAKUBALI** tokeni zozote ambazo hazikutolewa wazi kwa seva ya MCP yenyewe  
2. **Uthibitishaji wa Idhini**: Seva za MCP zinazotekeleza idhini **HUTAHTIHARISHA** MAOMBI YOTE YA KUINGIA NA **HAZITUMII** kikao kwa ajili ya uthibitishaji  
3. **Ruhusa ya Mtumiaji**: Seva za wakala wa MCP zinazotumia nambari za mteja za kudumu **HUTAHITAJI** kupata ruhusa wazi ya mtumiaji kwa kila mteja anayejiandikisha kwa wakati halisi  
4. **Kitambulisho Salama cha Kikao**: Seva za MCP **HUTUMIA** vitambulisho vya kikao vinavyotengenezwa kwa usalama wa kihasishi, isiyotabirika, kwa kutumia jenereta salama za nambari za nasibu  

## Mbinu Muhimu za Usalama

### 1. Uthibitishaji wa Ingizo & Usafi  
- **Uthibitishaji Kamili wa Ingizo**: Thibitisha na safisha ingizo zote ili kuzuia mashambulizi ya kuingiza, matatizo ya mpelelezi aliyekosewa, na udhaifu wa kuingiza maelekezo  
- **Utekelezaji wa Mipangilio ya Vigezo**: Tekeleza uthibitishaji mkali wa muundo wa JSON kwa vigezo vyote vya zana na ingizo za API  
- **Uchakavu wa Maudhui**: Tumia Microsoft Prompt Shields na Azure Content Safety kuchuja maudhui hatarishi katika maelekezo na majibu  
- **Usafi wa Matokeo**: Thibitisha na safisha matokeo yote ya mfano kabla ya kuwasilisha kwa watumiaji au mifumo mingine  

### 2. Ubora wa Uthibitishaji & Idhini  
- **Watoa Utambulisho wa Nje**: Wekeza uthibitishaji kwa watoa huduma waliothibitishwa wa utambulisho (Microsoft Entra ID, watoa huduma wa OAuth 2.1) badala ya kutekeleza uthibitishaji wa desturi  
- **Idhini za Undani**: Tekeleza ruhusa za undani kwa zana kando ya kanuni ya udogo wa ruhusa  
- **Usimamizi wa Mzunguko wa Tokeni**: Tumia tokeni za muda mfupi na mzunguko salama na uthibitishaji sahihi wa walengwa  
- **Uthibitishaji wa Vipengele Vingi**: Hitaji MFA kwa ufikiaji wote wa kiutawala na shughuli nyeti  

### 3. Itifaki za Mawasiliano Salama  
- **Usalama wa Tabaka la Usafiri**: Tumia HTTPS/TLS 1.3 kwa mawasiliano yote ya MCP kwa uthibitishaji sahihi wa cheti  
- **Usimbaji End-to-End**: Tekeleza tabaka za ziada za usimbaji kwa data nyeti sana inayopeperushwa na kuhifadhiwa  
- **Usimamizi wa Vyeti**: Thibitisha usimamizi wa mzunguko wa vyeti kwa michakato ya upya wa moja kwa moja  
- **Utekelezaji wa Toleo la Itifaki**: Tumia toleo la itifaki la MCP linalotumika (2025-11-25) kwa utaratibu sahihi wa mazungumzo ya toleo  

### 4. Usimamizi wa Kuzuia Mipaka ya Kasi & Rasilimali  
- **Kuzuia Mipaka ya Kasi kwa Tabaka Nyingi**: Tekeleza mipaka ya kasi kwa watumiaji, vikao, zana, na rasilimali ili kuzuia matumizi mabaya  
- **Kuzuia Mipaka ya Kasi Inayojibika**: Tumia kuzuia mipaka ya kasi kwa msingi wa kujifunza kwa mashine inayobadilika kulingana na matumizi na viashiria vya vitisho  
- **Usimamizi wa Kiasi cha Rasilimali**: Weka mipaka inayofaa kwa rasilimali za kompyuta, matumizi ya kumbukumbu, na muda wa utekelezaji  
- **Ulinzi dhidi ya DDoS**: Tekeleza mfumo kamili wa ulinzi wa DDoS na uchambuzi wa trafiki  

### 5. Kumbukumbu Kamili na Ufuatiliaji  
- **Kumbukumbu Zilizopangwa kwa Undani**: Tekeleza kumbukumbu za kina, zinazotafutika kwa shughuli zote za MCP, utekelezaji wa zana, na matukio ya usalama  
- **Ufuatiliaji wa Usalama wa Muda Halisi**: Tekeleza mifumo ya SIEM yenye ugunduzi wa utofauti wa AI kwa mzigo wa MCP  
- **Kumbukumbu Zinazofuata Faragha**: Fanya kumbukumbu za matukio ya usalama huku ukiheshimiwa vigezo vya faragha na kanuni  
- **Uunganisho wa Kujibu Matukio**: Unganisha mifumo ya kumbukumbu na michakato ya moja kwa moja ya kujibu matukio  

### 6. Mbinu Bora za Uhifadhi Salama  
- **Moduli za Usalama wa Vifaa**: Tumia kuhifadhi funguo kulingana na HSM (Azure Key Vault, AWS CloudHSM) kwa shughuli muhimu za kihasishi  
- **Usimamizi wa Funguo za Usimbaji**: Tekeleza mzunguko mzuri wa funguo, mgawanyo, na udhibiti wa ufikiaji kwa funguo za usimbaji  
- **Usimamizi wa Siri**: Hifadhi funguo zote za API, tokeni, na cheti katika mifumo maalum ya usimamizi wa siri  
- **Uainishaji wa Data**: Aina data kulingana na viwango vya unyeti na tumia hatua sahihi za ulinzi  

### 7. Usimamizi wa Tokeni Bora  
- **Kuzuia Kupitisha Tokeni Bila Ruhusa**: Zuia wazi mifumo ya kupitisha tokeni inayopotoka kwenye vizuizi vya usalama  
- **Uthibitishaji wa Walengwa wa Tokeni**: Hakikisha daima madai ya walengwa wa tokeni yanaendana na utambulisho sahihi wa seva ya MCP  
- **Idhini Kwa Misingi ya Madai**: Tekeleza idhini za undani zinazotegemea madai ya tokeni na sifa za mtumiaji  
- **Ufungaji wa Tokeni**: Funga tokeni kwa vikao maalum, watumiaji, au vifaa inapofaa  

### 8. Usimamizi wa Vikao Salama  
- **Vitambulisho vya Kikao vya Kihasishi**: Tengeneza vitambulisho vya kikao kwa kutumia jenereta salama za nambari za nasibu (si mfuatano unaoweza kutabirika)  
- **Ufungaji wa Kwa Mtumiaji Maalum**: Funga vitambulisho vya kikao kwa taarifa za mtumiaji kwa kutumia miundo salama kama `<user_id>:<session_id>`  
- **Dhibiti Mzunguko wa Kikao**: Tekeleza kumaliza, mzunguko, na kuharibu kikao kwa usahihi  
- **Vichwa vya Usalama vya Kikao**: Tumia vichwa vya usalama vya HTTP vinavyofaa kwa ulinzi wa kikao  

### 9. Vizuizi Maalum vya Usalama kwa AI  
- **Ulinzi wa Kuingiza Maelekezo**: Tekeleza Microsoft Prompt Shields kwa matumizi ya spotlighting, delimiters, na tekniki za datamarking  
- **Kuzuia Kuchafua Zana**: Thibitisha metadata ya zana, fuatilia mabadiliko ya wakati halisi, na hakiki uadilifu wa zana  
- **Uthibitishaji wa Matokeo ya Mfano**: Chunguza matokeo ya mfano kwa uwezekano wa kutoa data, maudhui yenye madhara, au ukiukaji wa sera za usalama  
- **Ulinzi wa Dirisha la Muktadha**: Tekeleza vizuizi kuzuia uchafuzi wa dirisha la muktadha na mashambulizi ya udanganyifu  

### 10. Usalama wa Utekelezaji wa Zana  
- **Kutekeleza Katika Enviroments Isiyozunguka**: Endesha utekelezaji wa zana kwenye mazingira ya kontena yaliyotenganishwa na mipaka ya rasilimali  
- **Utofauti wa Madaraka**: Endesha zana kwa madaraka kidogo zinazohitajika na akaunti tofauti za huduma  
- **Kutenganisha Mtandao**: Tekeleza mgawanyiko wa mtandao kwa mazingira ya utekelezaji wa zana  
- **Ufuatiliaji wa Utekelezaji**: Fuatilia utekelezaji wa zana kwa mwenendo usio wa kawaida, matumizi ya rasilimali, na ukiukaji wa usalama  

### 11. Uthibitishaji Endelevu wa Usalama  
- **Upimaji wa Usalama wa Moja kwa Moja**: Unganisha upimaji wa usalama katika mipaka ya CI/CD kwa zana kama GitHub Advanced Security  
- **Usimamizi wa Udhaifu**: Fanya uangalizi wa mara kwa mara kwa vitunguu vyote, ikiwa ni pamoja na mifano ya AI na huduma za nje  
- **Upimaji wa Uvunjaji**: Fanya tathmini za usalama za mara kwa mara hasa zinazoangazia utekelezaji wa MCP  
- **Mapitio ya Msimbo wa Usalama**: Tekeleza mapitio ya lazima ya usalama kwa mabadiliko yote ya msimbo yanayohusiana na MCP  

### 12. Usalama wa Mnyororo wa Ugavi kwa AI  
- **Uthibitishaji wa Vipengele**: Hakiki asili, uadilifu, na usalama wa vipengele vyote vya AI (mifano, embeddings, API)  
- **Usimamizi wa Mategemeo**: Dumisha hesabu za sasa za programu zote na mategemeo ya AI zikiwa na ufuatiliaji wa udhaifu  
- **Hifadhidata za Kuaminika**: Tumia vyanzo vilivyothibitishwa na vya kuaminika kwa mifano yote ya AI, maktaba, na zana  
- **Ufuatiliaji wa Mnyororo wa Ugavi**: Fuatilia mara kwa mara kasoro katika watoa huduma za AI na maktaba za mifano  

## Mifumo ya Usalama ya Juu

### Muundo wa Kuamini Sifuri kwa MCP  
- **Kamwe Usiamini, Daima Thibitisha**: Tekeleza uthibitishaji wa kila wakati kwa washiriki wote wa MCP  
- **Ugawanyaji Mdogo**: Tengeneza sehemu za MCP kwa udhibiti wa undani wa mtandao na utambulisho  
- **Ufikiaji wa Mara kwa Mara wa Masharti**: Tekeleza udhibiti wa ufikiaji unaotegemea hatari unaobadilika kulingana na muktadha na tabia  
- **Tathmini Endelevu ya Hatari**: Tathmini kwa nguvu hali ya usalama kulingana na viashiria vya vitisho vya sasa  

### Utekelezaji wa AI unaohifadhi Faragha  
- **Kupunguza Data**: Toa tu data ndogo zinazohitajika kwa kila shughuli ya MCP  
- **Faragha ya Tofauti**: Tekeleza mbinu za kuhifadhi faragha katika usindikaji wa data nyeti  
- **Usimbaji wa Homomorphic**: Tumia mbinu za usimbaji wa hali ya juu kwa kompyuta salama juu ya data iliyosimbwa  
- **Kujifunza kwa Ushirikiano**: Tekeleza mbinu za kujifunza zinazogawanyika zinazohifadhi mahali na faragha ya data  

### Majibu ya Matukio kwa Mifumo ya AI  
- **Taratiibu Maalum za AI kwa Majibu ya Matukio**: Tengeneza taratibu za majibu kwa matukio kulingana na vitisho vya AI na MCP  
- **Majibu ya Moja kwa Moja**: Tekeleza udhibiti wa moja kwa moja wa kuzuwia na kurekebisha matukio ya usalama ya AI  
- **Uwezo wa Uchunguzi**: Dumisha usambazaji wa uchunguzi wa uharibifu wa mifumo ya AI na uvujaji wa data  
- **Taratiibu za Urejeshaji**: Weka taratibu za kurejesha kutokana na uchafuzi wa mfano wa AI, mashambulizi ya kuingiza maelekezo, na kasoro za huduma  

## Rasilimali za Utekelezaji & Viwango

### 🏔️ Mafunzo ya Vitendo ya Usalama  
- **[Warsha ya MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Warsha kamili ya vitendo kwa usalama wa seva za MCP katika Azure  
- **[Mwongozo wa Usalama wa MCP wa OWASP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Muktadha wa usanifu na mwongozo wa utekelezaji wa OWASP MCP Top 10  

### Nyaraka Rasmi za MCP  
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Maelezo ya sasa ya itifaki ya MCP  
- [Mbinu Bora za Usalama za MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Mwongozo rasmi wa usalama  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Mifumo ya uthibitishaji na idhini  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Mahitaji ya usalama wa tabaka la usafiri  

### Suluhisho za Usalama za Microsoft  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Ulinzi wa kuingiza maelekezo wa hali ya juu  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Kuchuja maudhui kamili ya AI  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Usimamizi wa utambulisho na ufikiaji wa kampuni  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Usimamizi salama wa siri na vyeti  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Uchunguzi wa usalama wa mnyororo wa ugavi na msimbo  

### Viwango & Mifumo ya Usalama  
- [Mbinu Bora za Usalama za OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Mwongozo wa usalama wa OAuth wa sasa  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Hatari za usalama wa programu za wavuti  
- [OWASP Top 10 kwa LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Hatari mahususi za usalama wa AI  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Utawala kamili wa hatari za AI  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Mifumo ya usimamizi wa usalama wa habari  

### Mwongozo wa Utekelezaji & Mafunzo  
- [Azure API Management kama Lango la Uthibitishaji MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Mifumo ya uthibitishaji wa kampuni  
- [Microsoft Entra ID na Seva za MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Muunganiko wa mtoa utambulisho  
- [Utekelezaji wa Uhifadhi wa Tokeni Salama](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Mbinu bora za usimamizi wa tokeni  
- [Usimbaji End-to-End kwa AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Mifumo ya usimbaji wa hali ya juu  

### Rasilimali za Usalama za Juu  
- [Mzunguko wa Maendeleo wa Usalama wa Microsoft](https://www.microsoft.com/sdl) - Mbinu za maendeleo salama  
- [Mwongozo wa AI Red Team](https://learn.microsoft.com/security/ai-red-team/) - Upimaji wa usalama wa AI  
- [Mfano wa Vitisho kwa Mifumo ya AI](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Mbinu ya kutambua vitisho vya AI  
- [Uhandisi wa Faragha kwa AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Mbinu za kuhifadhi faragha kwa AI  

### Uzingatiaji na Utawala  
- [Uzifuaji wa GDPR kwa AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Uzingatiaji wa faragha katika mifumo ya AI  
- [Mfumo wa Utawala wa AI](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Utekelezaji wa AI unaowajibika  
- [SOC 2 kwa Huduma za AI](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Vizuizi vya usalama kwa watoa huduma za AI  
- [Uzifuaji wa HIPAA kwa AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Mahitaji ya uzingatiaji wa AI ya afya  

### DevSecOps & Otomesheni  
- [Mizunguko ya DevSecOps kwa AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Mizunguko salama ya maendeleo ya AI  
- [Upimaji wa Usalama wa Moja kwa Moja](https://learn.microsoft.com/security/engineering/devsecops) - Uthibitishaji endelevu wa usalama  
- [Usalama wa Miundombinu kama Msimbo](https://learn.microsoft.com/security/engineering/infrastructure-security) - Utekelezaji salama wa miundombinu  
- [Usalama wa Kontena kwa AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Usalama wa kontena za mzigo wa AI  

### Ufuatiliaji & Majibu ya Matukio  
- [Azure Monitor kwa Mzigo wa AI](https://learn.microsoft.com/azure/azure-monitor/overview) - Suluhisho kamili za ufuatiliaji  
- [Majibu ya Matukio ya Usalama ya AI](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Taratibu maalum za AI za majibu ya matukio  
- [SIEM kwa Mifumo ya AI](https://learn.microsoft.com/azure/sentinel/overview) - Usimamizi wa habari na matukio ya usalama  
- [Ujasusi wa Vitisho kwa AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Vyanzo vya ujasusi wa vitisho vya AI  

## 🔄 Kuimarisha Endelevu

### Kuwa na Habari za Kisasa na Viwango Vinavyobadilika  
- **Mabadiliko ya Maelezo ya MCP**: Fuata mabadiliko rasmi ya maelezo ya MCP na tahadhari za usalama  
- **Ujasusi wa Vitisho**: Jiunge na vituo vya ujasusi wa vitisho vya usalama vya AI na hifadhidata za udhaifu  
- **Kushiriki Jamii**: Shiriki katika mijadala ya jamii ya usalama ya MCP na makundi ya kazi
- **Tathmini ya Mara kwa Mara**: Fanya tathmini za hali ya usalama kila robo mwaka na sasisha mbinu ipasavyo

### Kuchangia Usalama wa MCP
- **Utafiti wa Usalama**: Changia katika utafiti wa usalama wa MCP na programu za kufichua udhaifu
- **Kushirikiana Mbinu Bora**: Shiriki utekelezaji wa usalama na mafunzo yaliyopatikana na jamii
- **Utengenezaji wa Viwango**: Shiriki katika utengenezaji wa vipimo vya MCP na kuunda viwango vya usalama
- **Maendeleo ya Zana**: Tengeneza na shiriki zana na maktaba za usalama kwa mfumo wa MCP

---

*Hati hii inaonyesha mbinu bora za usalama za MCP kuanzia Desemba 18, 2025, zilizotegemea Vipimo vya MCP 2025-11-25. Mbinu za usalama zinapaswa kukaguliwa na kusasishwa mara kwa mara kama itakavyo kufuatana na mabadiliko ya itifaki na mazingira ya vitisho.*

## Ifuatayo

- Soma: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)
- Rudi kwa: [Security Module Overview](./README.md)
- Endelea na: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**HATUA YA KUJITENGENEZA**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kufanikisha usahihi, tafadhali fahamu kwamba tafsiri za moja kwa moja zinaweza kuwa na makosa au kasoro. Hati ya asili katika lugha yake ya mama inapaswa kuchukuliwa kuwa chanzo cha kuaminika. Kwa taarifa muhimu, tafsiri ya mtaalamu wa binadamu inashauriwa. Hatuna dhamana kwa uelewa au tafsiri potofu zitokanazo na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->