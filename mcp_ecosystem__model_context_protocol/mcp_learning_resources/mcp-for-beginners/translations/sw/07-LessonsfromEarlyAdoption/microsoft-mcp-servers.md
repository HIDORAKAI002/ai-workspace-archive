# 🚀 Servers 10 za Microsoft MCP Zinazobadilisha Uzalishaji wa Mwaendelezaji

## 🎯 Utajifunza Nini Katika Mwongozo Huu

Mwongozo huu wa vitendo unaonyesha seva kumi za Microsoft MCP zinazobadilisha jinsi waendelezaji wanavyofanya kazi na wasaidizi wa AI. Badala ya kueleza tu kile seva za MCP *zinaweza* kufanya, tutajionyesha seva ambazo tayari zinafanya mabadiliko halisi katika workflow za kila siku za maendeleo katika Microsoft na kwingineko.

Kila seva katika mwongozo huu imechaguliwa kwa msingi wa matumizi halisi na maoni ya waendelezaji. Utagundua si tu kazi ya kila seva, bali kwa nini ni muhimu na jinsi ya kupata matumizi bora zaidi yake katika miradi yako mwenyewe. Ikiwa wewe ni mpya kabisa kwa MCP au unatafuta kuongeza setup uliyonayo, seva hizi zinawakilisha baadhi ya zana za vitendo na zenye athari kubwa ndani ya mfumo wa Microsoft.

> **💡 Vidokezo vya Kuanza Haraka**
> 
> Mpya kwa MCP? Usijali! Mwongozo huu umeandaliwa kwa uelewa wa waanzilishi. Tutafafanua dhana tunapokwenda, na unaweza kila wakati kurejea kwenye moduli zetu za [Utangulizi wa MCP](../00-Introduction/README.md) na [Dhana Msingi](../01-CoreConcepts/README.md) kwa historia ya kina.

## Muhtasari

Mwongozo huu kamili unachambua seva kumi za Microsoft MCP zinazobadilisha jinsi waendelezaji wanavyowasiliana na wasaidizi wa AI na zana za nje. Kuanzia usimamizi wa rasilimali za Azure hadi usindikaji wa hati, seva hizi zinaonyesha nguvu ya Model Context Protocol katika kuunda workflow za maendeleo zinazofanya kazi kwa urahisi na ufanisi.

## Malengo ya Kujifunza

Mwisho wa mwongozo huu, utakuwa:
- Umeelewa jinsi seva za MCP zinavyoongeza uzalishaji wa waendelezaji
- Umejifunza kuhusu utekelezaji wenye athari kubwa wa seva za MCP wa Microsoft
- Ugundue matumizi halisi ya kila seva
- Ujue jinsi ya kusanidi na kusanifu seva hizi ndani ya VS Code na Visual Studio
- Kuchambua ekosistimu kubwa ya MCP na mwelekeo wa baadaye

## 🔧 Kuelewa Seva za MCP: Mwongozo wa Mwaanzilishi

### Seva za MCP ni Nini?

Kama mwanzo katika Model Context Protocol (MCP), unaweza kujiuliza: "Seva ya MCP hasa ni nini, na kwa nini ni muhimu kwangu?" Tuzielee mfano rahisi.

Fikiria seva za MCP kama wasaidizi maalum wanaosaidia msaidizi wako wa AI wa kuandika (kama GitHub Copilot) kuunganishwa na zana na huduma za nje. Kama unavyotumia apps tofauti simu yako kwa kazi tofauti—app moja ya hali ya hewa, app moja ya urambazaji, app moja ya benki—seva za MCP zinampa msaidizi wako AI uwezo wa kuingiliana na zana na huduma tofauti za maendeleo.

### Tatizo Ambalo Seva za MCP Zinatatua

Kabla ya seva za MCP, ukitaka:
- Kuangalia rasilimali za Azure zako
- Kuanzisha suala la GitHub 
- Kufanya uchunguzi kwenye database yako
- Kutafuta kati ya nyaraka

Ungetakiwa kuacha kuandika msimbo, kufungua kivinjari, kuingia kwenye tovuti husika, na kufanya kazi hizi kwa mikono. Mabadiliko haya ya mara kwa mara ya mazingira huvunja mtiririko wako na kupunguza uzalishaji.

### Jinsi Seva za MCP Zinavyobadilisha Uzoefu Wako wa Maendeleo

Kwa seva za MCP, unaweza kubaki ndani ya mazingira yako ya maendeleo (VS Code, Visual Studio, nk.) na kumwomba msaidizi wako wa AI kushughulikia kazi hizi. Kwa mfano:

**Badala ya mtiririko huu wa jadi:**
1. Akata kuandika msimbo
2. Fungua kivinjari
3. Nenda kwenye Azure portal
4. Angalia maelezo ya akaunti ya kuhifadhi
5. Rudia VS Code
6. Endelea kuandika msimbo

**Sasa unaweza kufanya hivi:**
1. Muulize AI: "Hali ya akaunti zangu za kuhifadhi Azure ni ipi?"
2. Endelea kuandika msimbo ukitumia taarifa uliyopata

### Faida Muhimu kwa Waanzilishi

#### 1. 🔄 **Kaa Katika Mtiririko Wako**
- Hakuna tena kubadilisha kati ya apps nyingi
- Endelea kuzingatia msimbo unaouandika
- Punguza mzigo wa akili wa kusimamia zana tofauti

#### 2. 🤖 **Tumia Lugha Asilia Badala ya Amri Ngumu**
- Badala ya kukumbuka sintaksia ya SQL, eleza unahitaji data gani
- Badala ya kukumbuka amri za Azure CLI, eleza unataka kufanikisha nini
- Mpe AI maelezo ya kiufundi wakati wewe unaangalia mantiki

#### 3. 🔗 **Unganisha Zana Nyingi Pamoja**
- Tengeneza workflow zenye nguvu kwa kuunganisha huduma tofauti
- Mfano: "Pata masuala yote ya hivi karibuni ya GitHub na tengeneza kazi zinazolingana Azure DevOps"
- Jenga automatisering bila kuandika scripts ngumu

#### 4. 🌐 **Pata Ufikiaji wa Ekosistimu Inayokua**
- Faida kutoka kwa seva zilizojengwa na Microsoft, GitHub, na makampuni mengine
- Changanya na linganisha zana kutoka kwa wauzaji mbalimbali kwa urahisi
- Jiunge na ekosistimu ya kawaida inayofanya kazi kwa wasaidizi wa AI tofauti

#### 5. 🛠️ **Jifunze Kwa Kutekeleza**
- Anza na seva zilizojengwa tayari kuelewa dhana
- Polepole jenga seva zako unapozoea
- Tumia SDK na nyaraka zilizopo kuwaongoza katika mafunzo yako

### Mfano Halisi kwa Waanzilishi

Tuseme uko mwanzo katika uendelezaji wa wavuti na unafanya kazi kwenye mradi wako wa kwanza. Hapa ni jinsi seva za MCP zinavyoweza kusaidia:

**Njia ya jadi:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**Kwa seva za MCP:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### Faida ya Kiwango cha Shirika

MCP inakuwa kiwango cha viwanda, ambayo inamaanisha:
- **Ulinganifu**: Uzoefu sawa kwenye zana na makampuni tofauti
- **Ushirikiano**: Seva kutoka kwa wauzaji tofauti zinaweza kufanya kazi pamoja
- **Kujiandaa kwa Baadaye**: Ujuzi na setup huhamia kati ya wasaidizi tofauti wa AI
- **Jumuiya**: Ekosistimu kubwa ya maarifa na rasilimali zilizoshirikiwa

### Kuanzisha: Utajifunza Nini

Katika mwongozo huu, tutaangalia seva 10 za Microsoft MCP hasa zinazosaidia waendelezaji wa ngazi zote. Kila seva imebuniwa ili:
- Kutatua changamoto za kawaida za maendeleo
- Kupunguza kazi za kurudia
- Kuboresha ubora wa msimbo
- Kuongeza nafasi za kujifunza

> **💡 Kidokezo cha Kujifunza**
> 
> Ikiwa wewe ni mpya kabisa kwa MCP, anzia na moduli zetu za [Utangulizi wa MCP](../00-Introduction/README.md) na [Dhana Msingi](../01-CoreConcepts/README.md). Kisha rudi hapa kuona dhana hizi zikitumika kwa zana halisi za Microsoft.
>
> Kwa muktadha zaidi kuhusu umuhimu wa MCP, angalia chapisho la Maria Naggaga: [Unganisha Mara Moja, Unganisha Kila Mahali Kwa MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).

## Kuanzisha MCP katika VS Code na Visual Studio 🚀

Kusanidi seva hizi za MCP ni rahisi ikiwa unatumia Visual Studio Code au Visual Studio 2022 na GitHub Copilot.

### Setup ya VS Code

Huu ndio mchakato wa msingi kwa VS Code:

1. **Washa Hali ya Agent**: Katika VS Code, badilisha hadi hali ya Agent katika dirisha la Copilot Chat
2. **Sanidi Seva za MCP**: Ongeza usanidi wa seva kwenye faili lako la settings.json la VS Code
3. **Anzisha Seva**: Bonyeza kitufe cha "Anzisha" kwa kila seva unayotaka kutumia
4. **Chagua Zana**: Chagua seva gani za MCP kuanzisha kwa kikao chako cha sasa

Kwa maelezo ya setup, ona [nyaraka za MCP za VS Code](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 Vidokezo vya Mtaalamu: Dhibiti Seva za MCP kama Pro!**
> 
> Mtazamo wa Extensions wa VS Code sasa unajumuisha [UI mpya rahisi ya kusimamia MCP Servers zilizowekwa](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! Una upatikanaji wa haraka wa kuanzisha, kusitisha, na kusimamia MCP Servers yoyote kwa interface wazi na rahisi. Jaribu sasa!

### Seti la Visual Studio 2022

Kwa Visual Studio 2022 (toleo 17.14 au zaidi):

1. **Washa Hali ya Agent**: Bonyeza menyu ya "Ask" katika dirisha la GitHub Copilot Chat na chagua "Agent"
2. **Tengeneza Faili la Usanidi**: Tengeneza faili `.mcp.json` kwenye saraka ya suluhisho lako (mahali pa kupendekezwa: `<SOLUTIONDIR>\.mcp.json`)
3. **Sanidi Seva**: Ongeza usanidi wa seva za MCP kwa kutumia muundo rasmi wa MCP
4. **Idhini ya Zana**: Unapoulizwa, ruhusu zana unazotaka kutumia kwa idhini zinazofaa

Kwa maelekezo ya setup ya Visual Studio, ona [nyaraka za MCP za Visual Studio](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

Kila seva ya MCP ina mahitaji yake ya usanidi binafsi (mzizi wa muunganisho, uthibitishaji, nk.), lakini muundo wa setup ni thabiti katika IDE zote mbili.

## Mafunzo kutoka kwa Seva za Microsoft MCP 🛠️

### 1. 📚 Seva ya Microsoft Learn Docs MCP

[![Sakinisha katika VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Sakinisha katika VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Inafanya Nini**: Seva ya Microsoft Learn Docs MCP ni huduma inayotegemea wingu inayompa wasaidizi wa AI ufikiaji wa muda halisi wa nyaraka rasmi za Microsoft kupitia Model Context Protocol. Inaunganishwa na `https://learn.microsoft.com/api/mcp` na kuwezesha utafutaji wa maana katika Microsoft Learn, nyaraka za Azure, nyaraka za Microsoft 365, na vyanzo vingine rasmi vya Microsoft.

**Kwa Nini Ni Muhimu**: Ingawa inaweza kuonekana kama "tu nyaraka," seva hii ni muhimu kwa kila mendelezaji anayetumia teknolojia za Microsoft. Moja ya malalamiko makubwa kutoka kwa waendelezaji wa .NET kuhusu wasaidizi wa AI ni kuwa hawafuati mabadiliko ya hivi karibuni ya .NET na C#. Seva ya Microsoft Learn Docs MCP inatatua hili kwa kutoa ufikiaji wa muda halisi kwa nyaraka za sasa kabisa, marejeleo ya API, na mbinu bora. Ikiwa unafanya kazi na SDK za Azure za hivi karibuni, kuchunguza vipengele vipya vya C# 13, au kutekeleza mifumo ya kisasa ya .NET Aspire, seva hii inahakikisha msaidizi wako wa AI anapata taarifa sahihi na za kisasa za kuunda msimbo wa kisasa.

**Matumizi halisi**: "Ni amri gani za az cli za kuunda app ya kontena ya Azure kama ilivyo kwenye nyaraka rasmi za Microsoft Learn?" au "Ninawezaje kusanidi Entity Framework na injection ya utegemezi katika ASP.NET Core?" Au labda "Pitia msimbo huu kuhakikisha unalingana na mapendekezo ya utendaji katika Nyaraka za Microsoft Learn." Seva hutoa mwonekano mpana katika Microsoft Learn, nyaraka za Azure, na Microsoft 365 kupitia utafutaji wa maana wa hali ya juu kupata taarifa sahihi kwa muktadha unaofaa. Inarudisha hadi sehemu 10 za maudhui zenye ubora wa juu zenye viandishi vya makala na viungo, ikipata data mpya kila wakati kutoka kwa nyaraka za Microsoft zilizochapishwa hivi karibuni.

**Mfano Maalum**: Seva inaonyesha zana ya `microsoft_docs_search` inayofanya utafutaji wa maana dhidi ya nyaraka rasmi za kiufundi za Microsoft. Mara baada ya kusanidiwa, unaweza kuuliza maswali kama "Ninawezaje kutekeleza uthibitishaji wa JWT katika ASP.NET Core?" na kupata majibu ya kina rasmi yenye viungo vya chanzo. Ubora wa utafutaji ni wa hali ya juu kwa kuwa unaelewa muktadha – kuuliza kuhusu "kontena" katika muktadha wa Azure itarudisha nyaraka za Azure Container Instances, huku neno hilo ndani ya muktadha wa .NET likirejelea taarifa zinazohusiana na mkusanyiko wa C#.

Hii ni muhimu hasa kwa maktaba na matumizi yanayobadilika haraka au yaliyosasishwa hivi karibuni. Kwa mfano, katika miradi ya hivi karibuni ya kuandika msimbo nilitaka kutumia vipengele vipya vya toleo la hivi karibuni la .NET Aspire na Microsoft.Extensions.AI. Kwa kujumuisha seva ya Microsoft Learn Docs MCP, niliweza kutumia sio tu nyaraka za API, bali pia mwongozo na ufafanuzi uliochapishwa hivi karibuni.

> **💡 Vidokezo vya Mtaalamu**
> 
> Hata mifano inayopendelea zana hupaswa kuhamasishwa kutumia zana za MCP! Fikiria kuongeza maagizo ya mfumo au [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) kama: "Una ufikiaji wa `microsoft.docs.mcp` – tumia zana hii kutafuta nyaraka rasmi za hivi karibuni za Microsoft unaposhughulikia maswali kuhusu teknolojia za Microsoft kama C#, Azure, ASP.NET Core, au Entity Framework."
>
> Kwa mfano mzuri wa hili katika utekelezaji, angalia [Hali ya mazungumzo ya C# .NET Janitor](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md) kutoka kwa hazina ya Awesome GitHub Copilot. Hali hii hasa hutumia seva ya Microsoft Learn Docs MCP kusaidia kusafisha na kuendeleza msimbo wa C# kwa kutumia mifumo ya kisasa na mbinu bora.
### 2. ☁️ Seva ya Azure MCP
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Inachofanya**: Azure MCP Server ni kifurushi kamili cha kiunganishi maalum zaidi ya 15 za huduma za Azure zinazokuleta mfumo mzima wa Azure katika mtiririko wako wa AI. Hii siyo seva moja tu – ni mkusanyiko wenye nguvu unaojumuisha usimamizi wa rasilimali, muunganisho wa hifadhidata (PostgreSQL, SQL Server), uchambuzi wa logi wa Azure Monitor kwa KQL, ujumuishaji wa Cosmos DB, na mengi zaidi.

**Kwa nini ni muhimu**: Zaidi ya kusimamia rasilimali za Azure tu, seva hii inaboresha sana ubora wa nambari unapotumia SDK za Azure. Unapotumia Azure MCP katika hali ya Agent, haikuwezi kusaidia tu kuandika nambari – inasaidia kuandika nambari ya *Azure bora* inayofuata mifumo ya sasa ya uthibitishaji, mbinu bora za kushughulikia makosa, na kutumia vipengele vya hivi karibuni vya SDK. Badala ya kupata nambari ya jumla inayoweza kufanya kazi, unapata nambari inayofuata mifumo inayopendekezwa ya Azure kwa kazi za uzalishaji.

**Moduli kuu ni pamoja na**:
- **🗄️ Viunganishi vya Hifadhidata**: Upatikanaji wa moja kwa moja wa lugha asilia kwa Azure Database kwa PostgreSQL na SQL Server
- **📊 Azure Monitor**: Uchambuzi wa logi kwa nguvu ya KQL na maarifa ya kiutendaji
- **🌐 Usimamizi wa Rasilimali**: Usimamizi kamili wa mzunguko wa maisha wa rasilimali za Azure
- **🔐 Uthibitishaji**: Mifumo ya DefaultAzureCredential na utambulisho ulioendeshwa
- **📦 Huduma za Uhifadhi**: Operesheni za Blob Storage, Queue Storage, na Table Storage
- **🚀 Huduma za Kontena**: Usimamizi wa Azure Container Apps, Container Instances, na AKS
- **Na viunganishi vingine maalum vingi**

**Matumizi ya kweli**: "Orodhesha akaunti zangu za uhifadhi wa Azure", "Fanya uchunguzi wa Log Analytics yangu kwa makosa katika saa iliyopita", au "Nisaidie kujenga programu ya Azure kwa kutumia Node.js na uthibitishaji sahihi"

**Hali kamili ya maonyesho**: Hapa kuna mwangaza kamili unaoonyesha nguvu ya kuunganisha Azure MCP na ugani wa GitHub Copilot kwa Azure ndani ya VS Code. Unapokuwa na zote zimewekwa na kuamsha:

> "Tengeneza skripti ya Python inayopakua faili kwenye Azure Blob Storage kwa kutumia uthibitishaji wa DefaultAzureCredential. Skripti inapaswa kuungana na akaunti yangu ya uhifadhi ya Azure iitwayo 'mycompanystorage', kupakia kwenye kontena liitwalo 'documents', tengeneza faili la majaribio lenye alama ya wakati wa sasa kupakia, shughulikia makosa kwa upole na toa matokeo ya taarifa, fuata mbinu bora za uthibitishaji na kushughulikia makosa za Azure, jumuisha maelezo ya jinsi uthibitishaji wa DefaultAzureCredential unavyofanya kazi, na fanya skripti iwe na muundo mzuri na kazi na nyaraka sahihi."

Seva ya Azure MCP itatengeneza skripti kamili ya Python inayotumika kwa uzalishaji ambayo:
- Inatumia SDK ya hivi karibuni ya Azure Blob Storage na mifumo sahihi ya async
- Inaongezea DefaultAzureCredential kwa maelezo kamili ya mchakato wa kufuli ya akiba
- Inashughulikia makosa kwa nguvu kutokana na aina maalum za makosa ya Azure
- Inafuata mbinu bora za SDK ya Azure kwa usimamizi na muunganisho wa rasilimali
- Inatoa uandikishaji wa kina na matokeo ya taarifa katika mfumo wa console
- Inaunda skripti iliyo na muundo mzuri ikiwa na kazi, nyaraka, na vidokezo vya aina

Kinachofanya hili kuwa la ajabu ni kwamba bila Azure MCP, unaweza kupata nambari ya kuhifadhi blob isiyobofya mbinu za sasa za Azure. Kwa Azure MCP, unapata nambari inayotumia mbinu za hivi karibuni za uthibitishaji, inashughulikia hali maalum za makosa za Azure, na inafuata mbinu zilizopendekezwa za Microsoft kwa programu za uzalishaji.

**Mfano maarufu**: Nimetatizika kukumbuka amri maalum za `az` na `azd` za matumizi ya papo kwa papo. Ni mchakato wa hatua mbili kwangu: kwanza tafuta muundo wa amri, kisha endesha amri. Mara nyingi huingia tu kwenye portal na kubofya ili kupata kazi imefanywa kwa sababu sitaki kukiri siwezi kukumbuka muundo wa amri. Kuweza kueleza kile ninachotaka ni ajabu, na bora zaidi ni kuweza kufanya hivyo bila kuondoka kwenye IDE yangu!

Kuna orodha nzuri ya matumizi kwenye [Azure MCP repository](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server) ili kuanza. Kwa mwongozo wa usanidi kamili na chaguzi za usanidi wa hali ya juu, angalia [nyaraka rasmi za Azure MCP](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**Inachofanya**: Seva rasmi ya GitHub MCP huwapa watumiaji muunganisho wa hali ya juu na mfumo mzima wa GitHub, ikiwa ni pamoja na upatikanaji wa mbali unaohudumiwa na pia uchaguzi wa usambazaji wa Docker wa ndani. Hii siyo tu shughuli za msingi za hazina – ni seti kamili ya zana inayojumuisha usimamizi wa GitHub Actions, mtiririko wa kazi za ombi za kuvuta, ufuatiliaji wa maswala, skanning ya usalama, arifa, na uwezo wa otomatiki wa hali ya juu.

**Kwa nini ni muhimu**: Seva hii hubadilisha jinsi unavyoingiliana na GitHub kwa kuleta uzoefu wa jukwaa lote moja kwa moja katika mazingira yako ya maendeleo. Badala ya kubadilishana mara kwa mara kati ya VS Code na GitHub.com kwa usimamizi wa miradi, ukaguzi wa nambari, na ufuatiliaji wa CI/CD, unaweza kushughulikia kila kitu kwa amri za lugha asilia huku ukiendelea kuzingatia nambari yako.

> **ℹ️ Kumbuka: Aina Mbalimbali za ‘Agents’**
> 
> Usichanganye Seva hii ya GitHub MCP na GitHub Coding Agent (wakala wa AI unaoweza kuteuliwa kwa maswala ya kufanya kazi kwa otomatiki). Seva ya GitHub MCP hufanya kazi ndani ya hali ya Agent ya VS Code kutoa muunganisho wa API ya GitHub, wakati GitHub Coding Agent ni kipengele kinachotengenezwa tofauti kinachounda maombi ya kuvuta inapoteuliwa kwa maswala ya GitHub.

**Uwezo mkubwa ni pamoja na**:
- **⚙️ GitHub Actions**: Usimamizi kamili wa mchakato wa CI/CD, ufuatiliaji wa mtiririko wa kazi, na udhibiti wa artifacts
- **🔀 Ombi za Kuvuta (Pull Requests)**: Tengeneza, hakiki, ungana, na usimamishe PRs kwa ufuatiliaji kamili wa hali
- **🐛 Maswala**: Usimamizi kamili wa mzunguko wa maswala, maoni, kuweka lebo, na uteuzi
- **🔒 Usalama**: Arifa za skanning ya nambari, kugundua siri, na ujumuishaji wa Dependabot
- **🔔 Arifa**: Usimamizi mahiri wa arifa na udhibiti wa usajili wa hazina
- **📁 Usimamizi wa Hazina**: Operesheni za faili, usimamizi wa matawi, na utawala wa hazina
- **👥 Ushirikiano**: Utafutaji wa watumiaji na mashirika, usimamizi wa timu, na udhibiti wa upatikanaji

**Matumizi ya kweli**: "Tengeneza ombi la kuvuta kutoka kwenye tawi langu la sifa", "Nionyeshe operesheni zote za CI zilizoanguka wiki hii", "Orodhesha arifa za usalama zilizo wazi kwa hazina zangu", au "Tafuta maswala yote yaliyotengwa kwangu katika mashirika yangu"

**Hali kamili ya maonyesho**: Hapa kuna mtiririko wenye nguvu unaoonyesha uwezo wa Seva ya GitHub MCP:

> "Nahitaji kujiandaa kwa uhakiki wa sprint yetu. Nionyeshe ombi zote za kuvuta niliotengeneza wiki hii, angalia hali za mizunguko ya CI/CD, tengeneza muhtasari wa arifa zozote za usalama tunazohitaji kushughulikia, na nisaidie kuandaa maelezo ya kutolewa kwa misimbo iliyounganishwa yenye lebo ya 'feature'."

Seva ya GitHub MCP itafanya:
- Kufanya uchunguzi wa maombi yako ya kuvuta ya hivi karibuni kwa maelezo ya hali ya kina
- Kuchambua mizunguko ya kazi na kuonyesha kushindwa au matatizo ya utendaji yoyote
- Kukusanya matokeo ya skanning ya usalama na kuweka vipaumbele vya arifa muhimu
- Kutengeneza maelezo kamili ya kutolewa kwa kutoa taarifa kutoka kwa PRs zilizounganishwa
- Kutoa hatua za utekelezaji kwa mipango ya sprint na maandalizi ya kutolewa

**Mfano maarufu**: Napenda kutumia hii kwa mtiririko wa ukaguzi wa nambari. Badala ya kuruka kati ya VS Code, arifa za GitHub, na kurasa za ombi za kuvuta, naweza kusema "Nionyeshe PR zote zinazosubiri ukaguzi wangu" na kisha "Ongeza maoni kwenye PR #123 kuuliza kuhusu kushughulikia makosa katika njia ya uthibitishaji." Seva hushughulikia miito ya API ya GitHub, huendeleza muktadha wa mazungumzo, na hata husaidia kuunda maoni yenye mchango mzuri zaidi.

**Chaguo za Uthibitishaji**: Seva inasaidia OAuth (ambayo inazingatia bila tatizo ndani ya VS Code) na Tokens za Ufikiaji Binafsi, na ina seti za zana zinazoweza kubadilishwa kuwezesha tu kazi za GitHub unazohitaji. Unaweza kuiendesha kama huduma ya mikoani kwa usanidi wa haraka au ndani ya Docker kwa udhibiti kamili.

> **💡 Ushauri wa Mtaalamu**
> 
> Weka tu zana ambazo unahitaji kwa kutumia kipengele cha `--toolsets` katika mipangilio ya seva yako ya MCP kupunguza ukubwa wa muktadha na kuboresha uteuzi wa zana za AI. Kwa mfano, ongeza `"--toolsets", "repos,issues,pull_requests,actions"` kwenye hoja zako za usanidi wa MCP kwa mtiririko wa msingi wa maendeleo, au tumia `"--toolsets", "notifications, security"` ikiwa unataka hasa uwezo wa ufuatiliaji wa GitHub.
### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**Inachofanya**: Inajiunga na huduma za Azure DevOps kwa usimamizi kamili wa miradi, ufuatiliaji wa vitu vya kazi, usimamizi wa mizunguko ya ujenzi, na operesheni za hazina.

**Kwa nini ni muhimu**: Kwa timu zinazotumia Azure DevOps kama jukwaa lao kuu la DevOps, seva hii ya MCP inafuta urudiaji wa kubadili tabo kati ya mazingira yako ya maendeleo na kiolesura cha wavuti cha Azure DevOps. Unaweza kusimamia vitu vya kazi, kuangalia hali za ujenzi, kuchunguza hazina, na kushughulikia kazi za usimamizi wa miradi moja kwa moja kutoka kwa msaidizi wako wa AI.

**Matumizi ya kweli**: "Nionyeshe vitu vyote vya kazi vinavyofanya kazi kwenye sprint ya sasa ya mradi wa WebApp", "Tengeneza ripoti ya hitilafu kwa tatizo la kuingia nililopata hivi punde", au "Angalia hali za mistari yetu ya ujenzi na unioneshe tatizo lolote la hivi majuzi"

**Mfano maarufu**: Unaweza kwa urahisi kuangalia hali ya sprint ya timu yako kwa kuuliza rahisi kama "Nionyeshe vitu vyote vya kazi vinavyofanya kazi kwenye sprint ya sasa ya mradi wa WebApp" au "Tengeneza ripoti ya hitilafu kwa tatizo la kuingia nililopata hivi punde" bila kuondoka katika mazingira yako ya maendeleo.

### 5. 📝 MarkItDown MCP Server
[![Sakinisha katika VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Sakinisha katika VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**Inachofanya**: MarkItDown ni seva kamili ya kubadilisha nyaraka inayobadilisha aina mbalimbali za faili kuwa Markdown ya ubora wa juu, iliyoboreshwa kwa matumizi ya LLM na michakato ya uchambuzi wa maandishi.

**Kwa nini ni muhimu**: Muhimu kwa taratibu za nyaraka za kisasa! MarkItDown hushughulikia aina kubwa za faili huku ikihifadhi muundo muhimu wa nyaraka kama vichwa, orodha, meza, na viungo. Tofauti na zana rahisi za kutoa maandishi, inalenga kuhifadhi maana ya semantiki na muundo unaothaminiwa na AI pamoja na usomeka kwa binadamu.

**Aina za faili zinazoungwa mkono**:
- **Nyaraka za Ofisi**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **Faili za Vyombo vya Habari**: Picha (zikiwa na metadata ya EXIF na OCR), Sauti (ikiwa na metadata ya EXIF na uandishi wa maneno ya hotuba)
- **Yaliyomo Mtandaoni**: HTML, taarifa za RSS, URL za YouTube, kurasa za Wikipedia
- **Aina za Data**: CSV, JSON, XML, faili za ZIP (zinachakatwa mara kwa mara)
- **Aina za Uchapishaji**: EPub, daftari za Jupyter (.ipynb)
- **Barua Pepe**: Ujumbe wa Outlook (.msg)
- **Ya Juu Zaidi**: Mshikamano wa Azure Document Intelligence kwa usindikaji bora wa PDF

**Uwezo wa hali ya juu**: MarkItDown inaongeza maelezo ya picha yanayotokana na LLM (wakati mteja wa OpenAI anapatikana), Azure Document Intelligence kwa usindikaji wa PDF ulioboreshwa, uandishi wa hotuba kwa sauti, na mfumo wa viendelezi kwa kuongeza aina za faili zaidi.

**Matumizi halisi**: "Badilisha utangulizi wa PowerPoint kuwa Markdown kwa ajili ya tovuti yetu ya nyaraka", "Toa maandishi kutoka PDF hii ikiwa na muundo sahihi wa kichwa", au "Badilisha jedwali la Excel hili kuwa muundo wa jedwali linalosomeka"

**Mfano wa kuangazia**: Kama ilivyo kwenye [nyaraka za MarkItDown](https://github.com/microsoft/markitdown#why-markdown):

> Markdown iko karibu sana na maandishi mepesi, ikiwa na alama au muundo mdogo, lakini bado inatoa njia ya kuwakilisha muundo muhimu wa nyaraka. LLM maarufu, kama GPT-4o ya OpenAI, huzungumza Markdown moja kwa moja, na mara nyingi huingiza Markdown katika majibu yao bila kuamriwa. Hii inaonyesha kuwa wamefunzwa kwa maandishi mengi yaliyopangwa kwa Markdown, na kuielewa vizuri. Kama faida mbadala, konvensheni za Markdown pia ni nzuri kwa matumizi ya tokeni.

MarkItDown ni mzuri sana katika kuhifadhi muundo wa nyaraka, jambo muhimu kwa michakato ya AI. Kwa mfano, wakati wa kubadilisha utangulizi wa PowerPoint, huhifadhi mpangilio wa slaidi kwa vichwa sahihi, hutengeneza meza kama meza za Markdown, hujumuisha maandishi ya alt kwa picha, na hata hushughulikia vidokezo vya msemaji. Chati hubadilishwa kuwa meza za data linalosomeka, na Markdown inayotolewa huhifadhi mtiririko wa mantiki wa utangulizi wa awali. Hii inafanya iwe kamili kwa kuingiza maudhui ya utangulizi katika mifumo ya AI au kuunda nyaraka kutoka slaidi zilizopo.
### 6. 🗃️ SQL Server MCP Seva

[![Sakinisha katika VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Sakinisha katika VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Inachofanya**: Huwawezesha upatikanaji wa mazungumzo kwa hifadhidata za SQL Server (za ndani, Azure SQL, au Fabric)

**Kwa nini ni muhimu**: Inafanana na seva ya PostgreSQL lakini kwa mfumo wa Microsoft SQL. Unganisha kwa fudifu kwa mfuatano wa kuunganishwa na anza kuuliza kwa lugha ya kawaida – huna haja ya kubadilisha muktadha tena!

**Matumizi halisi**: "Tafuta oda zote ambazo hazijatimizwa ndani ya siku 30 zilizopita" hubadilishwa kuwa maswali ya SQL na kurudisha matokeo yaliyojipanga vizuri

**Mfano wa kuangazia**: Mara tu unapoweka muunganisho wa hifadhidata yako, unaweza kuanza mazungumzo na data yako papo hapo. Kifungu cha blogu kinaonyesha hili kwa swali rahisi: "Unahusishwa na hifadhidata gani?" Seva ya MCP hurejea kwa kuitisha zana sahihi ya hifadhidata, kuungana na mfano wako wa SQL Server, na kurudisha maelezo kuhusu muunganisho wa sasa wa hifadhidata – yote haya bila kuandika mstari hata mmoja wa SQL. Seva inaunga mkono shughuli kamili za hifadhidata kutoka usimamizi wa schema hadi uendeshaji wa data, yote kupitia maagizo ya lugha ya kawaida. Kwa maelezo kamili ya usanidi na mifano ya usanidi na VS Code na Claude Desktop, angalia: [Kuanzisha MSSQL MCP Seva (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).


### 7. 🎭 Playwright MCP Seva

[![Sakinisha katika VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Sakinisha katika VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**Inachofanya**: Huwezesha maajenti wa AI kuingiliana na kurasa za wavuti kwa ajili ya majaribio na otomatiki

> **ℹ️ Huimarisha GitHub Copilot**
> 
> Playwright MCP Seva huimarisha Mjaaji wa Uandishi wa GitHub Copilot, ikimpa uwezo wa kuvinjari wavuti! [Jifunze zaidi kuhusu kipengele hiki](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**Kwa nini ni muhimu**: Kamili kwa majaribio ya otomatiki yanayoendeshwa na maelezo ya lugha ya asili. AI inaweza kuvinjari tovuti, kujaza fomu, na kutoa data kupitia picha zilizopangwa za ufikiaji wa muundo – hili ni jambo lenye nguvu sana!

**Matumizi halisi**: "Jaribu mtiririko wa kuingia na thibitisha kuwa dashibodi inaonekana vizuri" au "Tengeneza jaribio linalotafuta bidhaa na kuthibitisha ukurasa wa matokeo" – yote haya bila hitaji la kupata msimbo wa programu

**Mfano wa kuangazia**: Mwenza wangu Debbie O'Brien amekuwa akifanya kazi nzuri na Playwright MCP Seva hivi karibuni! Kwa mfano, hivi majuzi alionyesha jinsi unavyoweza kuunda majaribio kamili ya Playwright bila hata kuwa na upatikanaji wa msimbo wa programu. Katika hali yake, aliomba Copilot kuunda jaribio kwa programu ya kutafuta filamu: enda kwenye tovuti, tafuta "Garfield," na thibitisha filamu inaonekana katika matokeo. MCP ilizindua kikao cha kivinjari, ikachunguza muundo wa ukurasa kwa kutumia picha za DOM, ikagundua vichujio sahihi, na kuunda jaribio la TypeScript lililo kamilika ambalo liliendelea kwa mara ya kwanza.

Kinachofanya hili kuwa na nguvu sana ni kwamba kinavuka pengo kati ya maagizo ya lugha ya asili na msimbo wa jaribio unaotekelezeka. Mbinu za kawaida zinahitaji kuandika jaribio kwa mkono au kupata msimbo kwa muktadha. Lakini kwa Playwright MCP, unaweza kujaribu tovuti za nje, programu za mteja, au kufanya majaribio ya sanduku-jeusi ambapo ufikiaji wa msimbo haupatikani.


### 8. 💻 Dev Box MCP Seva

[![Sakinisha katika VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Sakinisha katika VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Inachofanya**: Husimamia mazingira ya Microsoft Dev Box kwa lugha ya asili

**Kwa nini ni muhimu**: Inarahisisha sana usimamizi wa mazingira ya maendeleo! Unda, usanidi, na simamia mazingira ya maendeleo bila kukumbuka amri maalum.

**Matumizi halisi**: "Weka Dev Box mpya na SDK ya .NET ya hivi punde na uiandae kwa mradi wetu", "Kagua hali ya mazingira yangu yote ya maendeleo", au "Unda mazingira ya onyesho yaliyorekebishwa kwa maonyesho ya timu yetu"

**Mfano wa kuangazia**: Mimi ni shabiki mkubwa wa kutumia Dev Box kwa maendeleo binafsi. Wakati wangu wa kuelewa hapa ulikuwa pale James Montemagno aliposema jinsi Dev Box ilivyo nzuri kwa maonyesho ya mikutano, kwa kuwa ina muunganisho wa ethernet wa haraka sana bila kujali mkutano / hoteli / wifi ya ndege niliyokuwa nayo wakati huo. Kwa kweli, hivi karibuni nilifanya mazoezi ya onyesho la mkutano huku laptop yangu ikiwa imeunganishwa kwenye hotspot ya simu yangu nikiwa kwenye basi kutoka Bruges kwenda Antwerp! Hata hivyo hatua yangu inayofuata hapa ni kuangazia zaidi usimamizi wa timu yenye mazingira mengi ya maendeleo na mazingira ya onyesho yaliyorekebishwa. Na matumizi mengine makubwa niliyoyasikia kutoka kwa wateja na wenzangu, bila shaka, ni kutumia Dev Box kwa mazingira ya maendeleo yaliyopangwa awali. Katika matukio yote mawili, kutumia MCP kusanidi na kusimamia Dev Boxes kunakuwezesha kutumia maingiliano ya lugha ya asili, yote ukiwa bado katika mazingira yako ya maendeleo.

### 9. 🤖 Microsoft Foundry MCP Seva
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**Inachofanya**: Microsoft Foundry MCP Server huwapatia waendelezaji upatikanaji wa kina kwa mfumo wa AI wa Azure, ikijumuisha nakala za mifano, usimamizi wa uanzishaji, uorodheshaji wa maarifa kwa kutumia Azure AI Search, na zana za tathmini. Server hii ya majaribio inaunganisha pengo kati ya maendeleo ya AI na miundombinu yenye nguvu ya AI ya Azure, na kufanya iwe rahisi kujenga, kuanzisha, na kutathmini programu za AI.

**Kwa nini ni muhimu**: Server hii inabadilisha jinsi unavyofanya kazi na huduma za Azure AI kwa kuleta uwezo wa kiwango cha biashara wa AI moja kwa moja katika mtiririko wako wa maendeleo. Badala ya kubadili kati ya portal ya Azure, nyaraka, na IDE yako, unaweza kugundua mifano, kuanzisha huduma, kusimamia misingi ya maarifa, na kutathmini utendaji wa AI kupitia amri za lugha ya asili. Ni yenye nguvu hasa kwa waendelezaji wanaojenga programu za RAG (Retrieval-Augmented Generation), kusimamia uanzishaji wa mifano mingi, au kutekeleza mfumo wa tathmini kamili ya AI.

**Uwezo muhimu wa waendelezaji**:
- **🔍 Ugunduzi na Uanzishaji wa Mfano**: Chunguza orodha ya mifano ya Microsoft Foundry, pata maelezo ya kina kuhusu mfano kwa pamoja na sampuli za code, na anzisha mifano kwenye Azure AI Services
- **📚 Usimamizi wa Maarifa**: Unda na simamia misimbo ya kuorodhesha Azure AI Search, ongeza nyaraka, sanidi viorodheshaji, na jenga mifumo ya RAG yenye ustadi
- **⚡ Uunganisho wa Wakala wa AI**: Ungana na Wakala wa Azure AI, uliza kuhusu mawakala waliopo, na tathmini utendaji wa wakala katika hali za uzalishaji
- **📊 Mfumo wa Tathmini**: Endesha tathmini kamili za maandishi na wakala, tengeneza ripoti za markdown, na tekeleza uhakikisho wa ubora kwa programu za AI
- **🚀 Zana za Kuanzisha Prototipu**: Pata maagizo ya usanidi kwa kuanzisha prototipu za GitHub na pata upatikanaji wa Microsoft Foundry Labs kwa mifano ya utafiti wa kisasa

**Matumizi halisi ya waendelezaji**: "Anzisha mfano wa Phi-4 kwenye Azure AI Services kwa programu yangu", "Unda kielekezi kipya cha utafutaji kwa mfumo wangu wa RAG wa nyaraka", "Tathmini majibu ya wakala wangu dhidi ya viwango vya ubora", au "Tafuta mfano bora wa mantiki kwa kazi zangu changamano za uchambuzi"

**Mfano kamili wa maonyesho**: Hapa kuna mtiririko wenye nguvu wa maendeleo ya AI:

> "Ninajenga wakala wa msaada kwa wateja. Nisaidie kupata mfano mzuri wa mantiki kutoka kwenye katalogi, uanzishe kwenye Azure AI Services, unda hifadhidata ya maarifa kutoka kwenye nyaraka zetu, sanidi mfumo wa tathmini wa kujaribu ubora wa majibu, kisha nisaidie kuanzisha muunganisho na tokeni ya GitHub kwa ajili ya majaribio."

Microsoft Foundry MCP Server itafanya:
- Uliza katalogi ya mifano ili kupendekeza mifano bora ya mantiki kulingana na mahitaji yako
- Toa amri za uanzishaji na habari ya makasi kwa eneo lako unalotaka Azure
- Sanidi misimbo ya Azure AI Search kwa mfumo sahihi kwa nyaraka zako
- Sanidi mifumo ya tathmini yenye viwango vya ubora na ukaguzi wa usalama
- Tengeneza code ya prototipu yenye uthibitishaji wa GitHub kwa majaribio mara moja
- Toa maagizo ya kina ya usanidi yaliyobinafsishwa kwa stack yako ya teknolojia

**Mfano ulioangaziwa**: Kama mwendelezaji, nimekuwa nikikumbana na changamoto za kufuatilia mifano tofauti ya LLM zinazopatikana. Najua baadhi kuu, lakini nimekuwa nikiwaona kama napoteza fursa ya kuongeza uzalishaji na ufanisi. Na tokeni pamoja na makasi ni changamoto na ni vigumu kusimamia – sipati uhakika kama ninachagua mfano sahihi kwa kazi sahihi au nachelewesha matumizi yangu vizuri. Nimesikia kuhusu MCP Server hii kutoka kwa James Montemagno wakati nilipokuwa najiuliza na wenzangu kuhusu mapendekezo ya MCP Server kwa chapisho hili, na nina hamu ya kuitumia! Uwezo wa ugunduzi wa mfano unaonekana wa kushangaza hasa kwa mtu kama mimi anayetaka kuchunguza zaidi ya mifano ya kawaida na kupata mifano iliyoboreshwa kwa kazi maalum. Mfumo wa tathmini utasaidia kuthibitisha kuwa natengeneza matokeo bora, sio tu kujaribu kitu kipya kwa sababu tu.

> **ℹ️ Hali ya Majaribio**
> 
> MCP server hii ni ya majaribio na inaendelezwa kwa kiwango kikubwa. Vipengele na API vinaweza kubadilika. Inafaa kwa kuchunguza uwezo wa Azure AI na kujenga prototipu, lakini hakikisha mahitaji ya utulivu kwa matumizi ya uzalishaji.
### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**Inachofanya**: Inawapa waendelezaji zana muhimu za kujenga mawakala wa AI na programu zinazojumuika na Microsoft 365 na Microsoft 365 Copilot, ikijumuisha uthibitishaji wa muundo, upataji wa code za sampuli, na msaada wa utatuzi wa matatizo.

**Kwa nini ni muhimu**: Kujenga kwa Microsoft 365 na Copilot kunahusisha miundo tata ya maelezo na mifumo maalum ya maendeleo. MCP server hii inaleta rasilimali muhimu za maendeleo moja kwa moja katika mazingira yako ya kuandika code, ikikusaidia kuthibitisha miundo, kupata code za sampuli, na kutatua matatizo ya kawaida bila kuendelea kuangalia nyaraka.

**Matumizi halisi**: "Thibitisha muhtasari wa wakala wangu wa kitaarifu na rekebisha makosa yoyote ya muundo", "Nionyeshe code ya sampuli ya kutekeleza plugin ya Microsoft Graph API", au "Nisaidie kutatua matatizo ya uthibitishaji wa programu ya Teams"

**Mfano ulioangaziwa**: Nilimfikia rafiki yangu John Miller baada ya kuzungumza naye katika Build kuhusu Wakala wa M365, na aliniambia kuhusu MCP hii. Hii inaweza kuwa nzuri kwa waendelezaji wapya wa M365 Agents kwa sababu inatoa templates, code za sampuli, na muundo wa kuanzia bila kuzama kwenye nyaraka nyingi. Vipengele vya uthibitishaji wa muundo vinaonekana kuwa muhimu sana kuepuka makosa ya muundo wa maandishi ambayo yanaweza kusababisha masaa ya kujifuatilia na kutatua matatizo.

> **💡 Ushauri Bora**
> 
> Tumia server hii sambamba na Microsoft Learn Docs MCP Server kwa msaada kamili wa maendeleo ya M365 – moja hutoa nyaraka rasmi wakati hii inatoa zana halisi za maendeleo na msaada wa utatuzi wa matatizo.


## Nini Kinafuata? 🔮

## 📋 Hitimisho

Model Context Protocol (MCP) inabadilisha jinsi waendelezaji wanavyoshirikiana na wasaidizi wa AI na zana za nje. Server hizi 10 za Microsoft MCP zinaonyesha nguvu za muunganisho wa AI uliowekwa kando, na kuwezesha mitiririko laini ya kazi inayoweka waendelezaji katika hali yao ya mtiririko wakati wa kupata uwezo wa nje wenye nguvu.

Kutoka kwa ujumuishaji wa kina wa mfumo wa Azure hadi zana maalum kama Playwright kwa uendeshaji wa vivinjari na MarkItDown kwa usindikaji wa nyaraka, server hizi zinaonyesha jinsi MCP inavyoweza kuongeza uzalishaji katika mazingira tofauti ya maendeleo. Mkataba uliowekwa kando huhakikisha zana hizi zinafanya kazi pamoja kwa ufanisi, kuunda uzoefu wa maendeleo ulioambatana.

Wakati mfumo wa MCP unaendelea kukua, kushiriki na jumuiya, kugundua server mpya, na kujenga suluhisho maalum kutakuwa muhimu kwa kuongeza uzalishaji wa maendeleo yako. Asili ya wazi ya MCP inamaanisha unaweza kuchanganya na kuoanisha zana kutoka kwa wauzaji tofauti kuunda mtiririko mzuri kwa mahitaji yako maalum.

## 🔗 Rasilimali Zaidi

- [Hifadhidata Rasmi ya Microsoft MCP](https://github.com/microsoft/mcp)
- [Jamii na Nyaraka za MCP](https://modelcontextprotocol.io/introduction)
- [Nyaraka za VS Code MCP](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Nyaraka za Visual Studio MCP](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Nyaraka za Azure MCP](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Hebu Jifunze – Matukio ya MCP](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Marekebisho Mazuri ya GitHub Copilot](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days Live 29th/30th July au tazama kwa Mahitaji](https://aka.ms/mcpdevdays)

## 🎯 Mazoezi

1. **Sakinisha na Sanidi**: Weka moja ya server za MCP kwenye mazingira yako ya VS Code na jaribu utendaji wa msingi.
2. **Uunganisho wa Mtiririko wa Kazi**: Tayarisha mtiririko wa kazi wa maendeleo unaochanganya angalau server tatu tofauti za MCP.
3. **Mlipuko wa Server Maalum**: Bainisha kazi katika shughuli zako za kila siku za maendeleo ambazo zinaweza kufaidika na server maalum ya MCP na tengeneza vipimo vyake.
4. **Uchambuzi wa Utendaji**: Linganisha ufanisi wa kutumia server za MCP dhidi ya mbinu za jadi kwa kazi za kawaida za maendeleo.
5. **Tathmini ya Usalama**: Pima athari za usalama za kutumia server za MCP katika mazingira yako ya maendeleo na pendekeza mbinu bora.

Next:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->