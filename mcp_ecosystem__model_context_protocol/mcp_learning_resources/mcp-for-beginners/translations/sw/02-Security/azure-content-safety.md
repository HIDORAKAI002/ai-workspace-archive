# Usalama wa Juu wa MCP na Azure Content Safety

> **Hatari ya OWASP MCP Iliyoshughulikiwa**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety hutoa zana kadhaa zenye nguvu ambazo zinaweza kuongeza usalama wa utekelezaji wako wa MCP. Kwa uzoefu wa utekelezaji wa vitendo, tazama [Mkutano wa Usalama wa MCP (Sherpa)](https://azure-samples.github.io/sherpa/) Kambi 3: Usalama wa I/O.

## Vizuiaji vya Prompt

Vizuiaji vya AI Prompt vya Microsoft hutoa ulinzi imara dhidi ya mashambulizi ya sindano ya prompt ya moja kwa moja na isiyo ya moja kwa moja kupitia:

1. **Utambuzi wa Juu**: Inatumia ujifunzaji wa mashine kutambua maelekezo mabaya yaliyopachikwa kwenye maudhui.
2. **Kuweka Mwanga**: Hubadilisha maandishi ya ingizo kusaidia mifumo ya AI kutofautisha kati ya maelekezo halali na pembejeo za nje.
3. **Miazi na Uwekaji Alama wa Taarifa**: Huweka mipaka kati ya data ya kuaminika na isiyoaminika.
4. **Uunganisho wa Azure AI Content Safety**: Hufanya kazi na Azure AI Content Safety kugundua jaribio la kukatiza mfumo na maudhui hatarishi.
5. **Mabadiliko Endelevu**: Microsoft huboresha mara kwa mara mbinu za ulinzi dhidi ya vitisho vinavyoibuka.

## Utekelezaji wa Azure Content Safety na MCP

Njia hii hutoa ulinzi wa tabaka nyingi:
- Kuchambua pembejeo kabla ya kusindika
- Kukagua matokeo kabla ya kurudisha
- Kutumia orodha za kuzuia kwa mifumo hatarishi inayojulikana
- Kutumia mifano ya usalama wa maudhui ya Azure inayosasishwa mara kwa mara

## Rasilimali za Azure Content Safety

Ili kujifunza zaidi kuhusu utekelezaji wa Azure Content Safety na seva zako za MCP, tumia rasilimali rasmi hizi:

1. [Nyaraka za Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Nyaraka rasmi za Azure Content Safety.
2. [Nyaraka za Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Jifunze jinsi ya kuzuia mashambulizi ya sindano ya prompt.
3. [Rejeleo la API la Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Rejeleo la API kwa undani kwa ajili ya utekelezaji wa Content Safety.
4. [Mwongozo wa Haraka: Azure Content Safety na C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Mwongozo wa utekelezaji wa haraka kwa kutumia C#.
5. [Maktaba za Mteja wa Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Maktaba za wateja kwa lugha mbalimbali za programu.
6. [Kugundua Jaribio za Kukatiza Mfumo](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Mwongozo maalum wa kugundua na kuzuia jaribio la kukatiza mfumo.
7. [Mbinu Bora za Usalama wa Maudhui](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Mbinu bora za utekelezaji wa usalama wa maudhui kwa ufanisi.

Kwa utekelezaji wa kina zaidi, tazama [Mwongozo wa Utekelezaji wa Azure Content Safety](./azure-content-safety-implementation.md).

## Ifuatayo

- Soma: [Utekelezaji wa Azure Content Safety](./azure-content-safety-implementation.md)
- Rudi kwa: [Muhtasari wa Moduli ya Usalama](./README.md)
- Endelea kwa: [Moduli 3: Kuanza](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->