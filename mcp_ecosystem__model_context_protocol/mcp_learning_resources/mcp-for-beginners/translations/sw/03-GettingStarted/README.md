## Kuanzisha  

[![Jenga Seva Yako ya Kwanza ya MCP](../../../translated_images/sw/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Bonyeza picha hapo juu kutazama video ya somo hili)_

Sehemu hii ina masomo kadhaa:

- **1 Seva yako ya kwanza**, katika somo hili la kwanza, utajifunza jinsi ya kuunda seva yako ya kwanza na kuichunguza kwa kutumia chombo cha mkaguzi, njia muhimu ya kujaribu na kutatua matatizo ya seva yako, [kwenda somo](01-first-server/README.md)

- **2 Mteja**, katika somo hili, utajifunza jinsi ya kuandika mteja anaayeweza kuungana na seva yako, [kwenda somo](02-client/README.md)

- **3 Mteja na LLM**, njia bora zaidi ya kuandika mteja ni kwa kuongeza LLM ili uweze "kujadiliana" na seva yako kuhusu nini cha kufanya, [kwenda somo](03-llm-client/README.md)

- **4 Kutumia hali ya Wakala wa GitHub Copilot katika Visual Studio Code**. Hapa, tunaangalia kuendesha Seva yetu ya MCP kutoka ndani ya Visual Studio Code, [kwenda somo](04-vscode/README.md)

- **5 Seva ya Usafirishaji wa stdio** usafirishaji wa stdio ni normu inayopendekezwa kwa mawasiliano ya seva kwa mteja wa MCP wa ndani, ikitoa mawasiliano salama ya mchakato mdogo kwa kutumia upungufu wa mchakato uliojengwa ndani, [kwenda somo](05-stdio-server/README.md)

- **6 Kutiririsha HTTP na MCP (HTTP Inayotiririka)**. Jifunze kuhusu usafirishaji wa kisasa wa kutiririsha HTTP (njia inayopendekezwa kwa seva za MCP za mbali kulingana na [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), arifa za maendeleo, na jinsi ya kutekeleza seva na wateja wa MCP wa wakati halisi wenye uwezo wa kupanuka kwa kutumia HTTP Inayotiririka. [kwenda somo](06-http-streaming/README.md)

- **7 Kutumia Zana ya AI kwa VSCode** kwa kutumia na kujaribu Wateja na Seva zako za MCP [kwenda somo](07-aitk/README.md)

- **8 Upimaji**. Hapa tutazingatia hasa jinsi tunavyoweza kujaribu seva na mteja wetu kwa njia tofauti, [kwenda somo](08-testing/README.md)

- **9 Kuanzisha huduma**. Sura hii itaangalia njia mbalimbali za kuuzindua suluhisho zako za MCP, [kwenda somo](09-deployment/README.md)

- **10 Matumizi ya juu ya seva**. Sura hii inahusu matumizi ya juu ya seva, [kwenda somo](./10-advanced/README.md)

- **11 Uthibitishaji**. Sura hii inaelezea jinsi ya kuongeza uthibitishaji rahisi, kutoka kwa Basic Auth hadi kutumia JWT na RBAC. Unahimizwa kuanza hapa kisha uangalie Mada za Juu katika Sura ya 5 na kufanya kuimarisha usalama zaidi kupitia mapendekezo ya Sura ya 2, [kwenda somo](./11-simple-auth/README.md)

- **12 Wageni wa MCP**. Sanidi na tumia wateja maarufu wa mwenyeji wa MCP ikiwa ni pamoja na Claude Desktop, Cursor, Cline, na Windsurf. Jifunze aina za usafirishaji na utatuzi wa matatizo, [kwenda somo](./12-mcp-hosts/README.md)

- **13 Mkaguzi wa MCP**. Tatua matatizo na jaribu seva zako za MCP kwa njia ya kuingiliana ukitumia chombo cha Mkaguzi wa MCP. Jifunze jinsi ya kutatua matatizo ya zana, rasilimali, na ujumbe wa itifaki, [kwenda somo](./13-mcp-inspector/README.md)

- **14 Sampuli**. Tengeneza Seva za MCP zinazoshirikiana na wateja wa MCP katika kazi zinazohusiana na LLM (imeachwa rasmi katika mwitikio wa toleo la `2026-07-28`; bado ni halali kwa toleo la `2025-11-25`). [kwenda somo](./14-sampling/README.md)

- **15 Programu za MCP**. Jenga Seva za MCP ambazo pia hutoa maagizo ya UI, [kwenda somo](./15-mcp-apps/README.md)

Itifaki ya Muktadha wa Mfano (MCP) ni itifaki wazi inayoweka viwango vya jinsi programu zinavyotoa muktadha kwa LLMs. Fikiria MCP kama bandari ya USB-C kwa programu za AI - hutoa njia ya kawaida ya kuunganisha mifano ya AI na vyanzo tofauti vya data na zana.

## Malengo ya Kujifunza

Mwisho wa somo hili, utaweza:

- Kuandaa mazingira ya maendeleo kwa MCP katika C#, Java, Python, TypeScript, na JavaScript
- Kujenga na kuanzisha seva za msingi za MCP zenye vipengele maalum (rasilimali, maelezo, na zana)
- Kuunda programu mwenyeji zinazounganika na seva za MCP
- Kupima na kutatua matatizo ya utekelezwaji wa MCP
- Kuelewa changamoto za kawaida za usanidi na suluhisho zake
- Kuunganisha utekelezaji wako wa MCP na huduma maarufu za LLM

## Kuweka Mazingira Yako ya MCP

Kabla ya kuanza kufanya kazi na MCP, ni muhimu kuandaa mazingira yako ya maendeleo na kuelewa mtiririko wa msingi wa kazi. Sehemu hii itakuongoza kupitia hatua za awali za usanidi kuhakikisha kuanza laini na MCP.

### Masharti ya awali

Kabla ya kuingia katika maendeleo ya MCP, hakikisha una:

- **Mazingira ya Maendeleo**: Kwa lugha uliyochagua (C#, Java, Python, TypeScript, au JavaScript)
- **IDE/Mhariri**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm, au mhariri wa msimbo wa kisasa wowote
- **Wasimamizi wa Pakiti**: NuGet, Maven/Gradle, pip, au npm/yarn
- **Vifunguo vya API**: Kwa huduma yoyote ya AI unayopanga kutumia katika programu zako mwenyeji


### SDK Rasmi

Katika sura zijazo utaona suluhisho zilizojengwa kwa kutumia Python, TypeScript, Java, na .NET. Hapa kuna SDK zote rasmi zinazotegemewa.

MCP hutoa SDK rasmi kwa lugha mbalimbali (zinalingana na [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Inasimamiwa kwa ushirikiano na Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Inasimamiwa kwa ushirikiano na Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Utekelezaji rasmi wa TypeScript
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Utekelezaji rasmi wa Python (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Utekelezaji rasmi wa Kotlin
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Inasainimiwa kwa ushirikiano na Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Utekelezaji rasmi wa Rust
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Utekelezaji rasmi wa Go

## Muhimu wa Kumbuka

- Kuanzisha mazingira ya maendeleo ya MCP ni rahisi kutumia SDK zinazolingana na lugha husika
- Kujenga seva za MCP kunahusisha kuunda na kusajili zana zenye ramani za wazi
- Wateja wa MCP huungana na seva na mifano ili kutumia uwezo uliopanuliwa
- Kupima na kutatua matatizo ni muhimu kwa utekelezaji thabiti wa MCP
- Chaguzi za uanzishaji ni kutoka maendeleo ya ndani hadi suluhisho linalotegemea anga za wingu

## Mazoezi

Tuna seti ya sampuli zinazojumuisha mazoezi utakayoyaona katika sura zote katika sehemu hii. Zaidi ya hayo sura kila moja pia ina mazoezi na kazi zake

- [Kalkuleta ya Java](./samples/java/calculator/README.md)
- [Kalkuleta ya .Net](../../../03-GettingStarted/samples/csharp)
- [Kalkuleta ya JavaScript](./samples/javascript/README.md)
- [Kalkuleta ya TypeScript](./samples/typescript/README.md)
- [Kalkuleta ya Python](../../../03-GettingStarted/samples/python)

## Rasilimali Zaidi

- [Jenga Wakala kwa kutumia Itifaki ya Muktadha wa Mfano kwenye Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [MCP ya Mbali na Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [Wakala wa MCP wa .NET OpenAI](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Nini Kifuatacho

Anza na somo la kwanza: [Kuunda Seva yako ya MCP ya Kwanza](01-first-server/README.md)

Mara tu unapomaliza moduli hii, endelea: [Moduli 4: Utekelezaji wa Vitendo](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->