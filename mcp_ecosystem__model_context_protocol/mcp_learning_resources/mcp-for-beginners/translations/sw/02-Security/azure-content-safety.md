# Usalama wa Juu wa MCP kwa Azure Content Safety

> **Hatari ya OWASP MCP Iliyoshughulikiwa**: [MCP06 - Injection ya Prompt kupitia Payloads za Muktadha](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety inatoa zana kadhaa zenye nguvu ambazo zinaweza kuongeza usalama wa utekelezaji wako wa MCP. Kwa uzoefu wa utekelezaji wa vitendo, angalia [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Usalama wa I/O.

## Mizinga ya Prompt

Mizinga ya Microsoft ya AI Prompt Shields hutoa ulinzi thabiti dhidi ya mashambulizi ya sindano ya prompt ya moja kwa moja na isiyo ya moja kwa moja kupitia:

1. **Ugunduzi wa Juu**: Inatumia ujifunzaji wa mashine kutambua maagizo mabaya yaliyowekwa ndani ya yaliyomo.
2. **Kuweka Mwanga**: Hubadilisha maandishi ya ingizo kusaidia mifumo ya AI kutofautisha kati ya maagizo halali na ingizo za nje.
3. **Viwango na Alama za Data**: Naonyesha mipaka kati ya data inayotegemewa na isiyotegemewa.
4. **Uunganisho wa Content Safety**: Hufanya kazi na Azure AI Content Safety kugundua jaribio la kutoroka na yaliyomo hatarishi.
5. **Sasisho Endelevu**: Microsoft huweka mara kwa mara mekanisimu za ulinzi dhidi ya tishio jipya.

## Kutekeleza Azure Content Safety na MCP

Mbinu hii hutoa ulinzi wa tabaka nyingi:
- Kuskana ingizo kabla ya kuchakata
- Kuhakiki matokeo kabla ya kurudisha
- Kutumia orodha za kuzuia kwa mifumo hatarishi inayojulikana
- Kutumia modeli za usalama wa yaliyomo zinazosasishwa mara kwa mara za Azure

## Rasilimali za Azure Content Safety

Ili kujifunza zaidi kuhusu kutekeleza Azure Content Safety na seva zako za MCP, tafuta rasilimali rasmi hizi:

1. [Nyaraka za Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Nyaraka rasmi za Azure Content Safety.
2. [Nyaraka za Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Jifunze jinsi ya kuzuia mashambulizi ya sindano ya prompt.
3. [Marejeleo ya API ya Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Marejeleo ya API kwa undani wa kutekeleza Content Safety.
4. [Mwongozo wa Haraka: Azure Content Safety kwa C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Mwongozo wa utekelezaji haraka kwa kutumia C#.
5. [Makusanyo ya Maktaba za Mteja wa Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Maktaba za wateja kwa lugha mbalimbali za programu.
6. [Kugundua Jaribio za Kutoroka](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Mwongozo maalum wa kugundua na kuzuia jaribio za kutoroka.
7. [Mbinu Bora za Usalama wa Yaliyomo](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Mbinu bora za kutekeleza usalama wa yaliyomo kwa ufanisi.

Kwa utekelezaji wa kina zaidi, tazama mwongozo wetu wa [Azure Content Safety Implementation](./azure-content-safety-implementation.md).

## Nini Kingojea

- Soma: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Rudi kwa: [Muhtasari wa Moduli ya Usalama](./README.md)
- Endelea kwa: [Moduli 3: Kuanza](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kiarifa cha kutokuwajibika**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kuhakikisha usahihi, tafadhali fahamu kuwa tafsiri za automatiska zinaweza kuwa na makosa au kasoro. Hati ya asili katika lugha yake ya asili inapaswa kuzingatiwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu ya binadamu inapendekezwa. Hatuwajibiki kwa maelewano au tafsiri potofu yoyote inayotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->