# Mada za Juu katika MCP

[![MCP ya Juu: Mawakala wa AI Waliojumuishwa, Yanayoweza Kupandishwa Kiwango, na Yanayotumia Mbinu Nyingi](../../../translated_images/sw/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Bonyeza picha iliyopo juu kutazama video ya somo hili)_

Sura hii inaangazia mfululizo wa mada za juu katika utekelezaji wa Itifaki ya Muktadha wa Mfano (MCP), ikijumuisha ujumuishaji wa mbinu nyingi, ukubwa wa mfumo, mbinu bora za usalama, na ujumuishaji wa biashara. Mada hizi ni muhimu kwa kujenga programu madhubuti na tayari kwa matumizi ya uzalishaji ya MCP zinazoweza kukidhi mahitaji ya mifumo ya kisasa ya AI.

## Muhtasari

Somo hili linaangazia dhana za juu katika utekelezaji wa Itifaki ya Muktadha wa Mfano, likilenga ujumuishaji wa mbinu nyingi, ukubwa wa mfumo, mbinu bora za usalama, na ujumuishaji wa biashara. Mada hizi ni muhimu kwa kujenga programu za kiwango cha uzalishaji za MCP zinazoweza kushughulikia mahitaji changamano katika mazingira ya biashara.

> **Kuangalia mbele:** mada kadhaa hapa chini zinaathiriwa na mwitikio wa awamu ya majaribio ya sifa ya MCP ya `2026-07-28` — Muktadha Mizuizi (5.4) na Sampuli (5.6) zinajenga juu ya misingi ambayo mwitikio wa awamu ya majaribio unaonyesha kama umeachwa, na kipengele cha majaribio cha Kazi kinachoangaziwa kwenye Sifa za Itifaki (5.16) kinahamia kwenye ugani maalum wa Kazi. Angalia [Nini Kinabadilika MCP: Mwitikio wa Awamu ya Maajaribio 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) kwa maelezo zaidi.

## Malengo ya Kujifunza

Mwisho wa somo hili, utaweza:

- Tekeleza uwezo wa mbinu nyingi ndani ya mifumo ya MCP
- Buni usanifu unaoweza kupanuka wa MCP kwa hali za mahitaji makubwa
- Tumia mbinu bora za usalama zinazolingana na kanuni za usalama za MCP
- Jumuisha MCP na mifumo na mifumo ya AI ya biashara
- Boreshaji utendaji na uaminifu katika mazingira ya uzalishaji

## Masomo na Miradi ya Mfano

| Kiungo | Kichwa | Maelezo |
|------|-------|-------------|
| [5.1 Ujumuishaji na Azure](./mcp-integration/README.md) | Jumuisha na Azure | Jifunze jinsi ya kuunganisha Server ya MCP kwenye Azure |
| [5.2 Mfano wa mbinu nyingi](./mcp-multi-modality/README.md) | Sampuli za MCP za mbinu nyingi | Sampuli za sauti, picha na majibu ya mbinu nyingi |
| [5.3 Sampuli ya MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Onyesho la MCP OAuth2 | Programu ndogo ya Spring Boot inaonyesha OAuth2 na MCP, zote kama Seva ya Uidhinishaji na Rasilimali. Inaonyesha utoaji salama wa tokeni, vituo vilivyolindwa, uenezaji wa Azure Container Apps, na ujumuishaji wa Usimamizi wa API. |
| [5.4 Muktadha Mizuizi](./mcp-root-contexts/README.md) | Muktadha mizizi | Jifunze zaidi kuhusu muktadha mizizi na jinsi ya kuitekeleza |
| [5.5 Uelekeaji](./mcp-routing/README.md) | Uelekezaji | Jifunze aina mbalimbali za uelekeaji |
| [5.6 Sampuli](./mcp-sampling/README.md) | Sampuli | Jifunze jinsi ya kufanya kazi na sampuli |
| [5.7 Kupandisha Kiwango](./mcp-scaling/README.md) | Kupandisha | Jifunze kuhusu kupandisha kiwango |
| [5.8 Usalama](./mcp-security/README.md) | Usalama | Linda Server yako ya MCP |
| [5.9 Sampuli ya Utafutaji wa Wavuti](./web-search-mcp/README.md) | Utafutaji Wavuti MCP | Server na mteja wa Python MCP wanaojumuisha na SerpAPI kwa utafutaji wa wavuti, habari, bidhaa kwa wakati halisi, na Maswali na Majibu. Inaonyesha uongozaji wa zana nyingi, ujumuishaji wa API za nje, na utunzaji thabiti wa makosa. |
| [5.10 Uenezaji wa Wakati Halisi](./mcp-realtimestreaming/README.md) | Uenezaji | Uenezaji wa data kwa wakati halisi umekuwa muhimu katika dunia ya leo inayotegemea data, ambapo biashara na programu zinahitaji upatikanaji wa haraka wa taarifa kufanya maamuzi kwa wakati.|
| [5.11 Utafutaji wa Wavuti wa Wakati Halisi](./mcp-realtimesearch/README.md) | Utafutaji Wavuti | Utafutaji wa wavuti kwa wakati halisi jinsi MCP inavyobadilisha utafutaji wa wavuti wa wakati halisi kwa kutoa njia iliyosanifishwa ya usimamizi wa muktadha katika mifano ya AI, injini za utafutaji, na programu.| 
| [5.12 Uthibitishaji wa Entra ID kwa Server za Itifaki ya Muktadha wa Mfano](./mcp-security-entra/README.md) | Uthibitishaji wa Entra ID | Microsoft Entra ID hutoa suluhisho thabiti la utambulisho na usimamizi wa upatikanaji linalotegemea wingu, kusaidia kuhakikisha kwamba ni watumiaji na programu zilizoidhinishwa tu zinaweza kuingiliana na seva yako ya MCP.|
| [5.13 Ujumuishaji wa Wakala wa Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Ujumuishaji wa Microsoft Foundry | Jifunze jinsi ya kuunganisha server za Itifaki ya Muktadha wa Mfano na mawakala wa Microsoft Foundry, kuwezesha uongozaji wa zana zenye nguvu na uwezo wa AI wa biashara kwa kutumia muunganisho sanifu wa vyanzo vya data vya nje.|
| [5.14 Uhandisi wa Muktadha](./mcp-contextengineering/README.md) | Uhandisi wa Muktadha | Fursa ya baadaye ya mbinu za uhandisi wa muktadha kwa server za MCP, ikiwa ni pamoja na uboreshaji wa muktadha, usimamizi wa muktadha unaobadilika, na mbinu za uhandisi wa maelekezo madhubuti ndani ya mifumo ya MCP.|
| [5.15 Usafirishaji Maalum wa MCP](./mcp-transport/README.md) | Usafirishaji Maalum | Jifunze jinsi ya kutekeleza mbinu za usafirishaji maalum kwa hali za mawasiliano maalum za MCP.|
| [5.16 Uchunguzi wa Kina wa Sifa za Itifaki](./mcp-protocol-features/README.md) | Sifa za Itifaki | Jifunze sifa za juu za itifaki ikiwa ni pamoja na taarifa za maendeleo, kughairi maombi, tempele za rasilimali, na mifumo ya utunzaji wa makosa.|
| [5.17 Ufikiri wa Mawakala Wenye Migongano](./mcp-adversarial-agents/README.md) | Mawakala Wenye Migongano | Tumia mawakala wawili wenye nafasi zinapingana, wakishirikisha seti moja ya zana za MCP, kugundua mawazo potofu, kuibua kesi za kipekee, na kutoa matokeo yaliyoimarishwa kupitia mijadala iliyopangwa.|

> **Mpya katika Sifa za MCP 2025-11-25**: Sifa sasa zinaunga mkono kwa majaribio **Kazi** (operesheni za muda mrefu zenye ufuatiliaji wa maendeleo), **Manukuu ya Zana** (metadata kuhusu tabia ya zana kwa usalama), **Hali ya Kuomba URL** (kuomba maudhui maalum ya URL kutoka kwa wateja), na **Mizizi** iliyoboreshwa (kwa usimamizi wa muktadha wa eneo la kazi). Angalia [rekodi ya mabadiliko ya Sifa za MCP](https://spec.modelcontextprotocol.io/) kwa maelezo kamili.

## Marejeleo Zaidi

Kwa habari za kisasa zaidi kuhusu mada za juu za MCP, rejea:
- [Nyaraka za MCP](https://modelcontextprotocol.io/)
- [Sifa za MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Hifadhi ya GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Hatari za usalama na njia za kuzirekebisha
- [Warsha ya Mkutano wa Usalama MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Mafunzo ya usalama ya mikono-katika-mikono

## Muhimu Kusoma

- Utekelezaji wa MCP wa mbinu nyingi unapanua uwezo wa AI zaidi ya usindikaji wa maandishi
- Ukuaji wa mfumo ni muhimu kwa usambazaji wa biashara na unaweza kushughulikiwa kupitia kupanuliwa wima na usawa
- Hatua kamili za usalama hulinda data na kuhakikisha udhibiti sahihi wa upatikanaji
- Ujumuishaji wa biashara na majukwaa kama Azure OpenAI na Microsoft AI Foundry huongeza uwezo wa MCP
- Utekelezaji wa juu wa MCP unafaidika na usanifu ulioboreshwa na usimamizi makini wa rasilimali

## Zoekamo

Buni utekelezaji wa kiwango cha biashara wa MCP kwa matumizi maalum:

1. Tambua mahitaji ya mbinu nyingi kwa matumizi yako
2. Eleza udhibiti wa usalama unaohitajika kulinda data nyeti
3. Buni usanifu unaoweza kupanuka unaoshughulikia mzigo unaobadilika
4. Panga maeneo ya ujumuishaji na mifumo ya AI ya biashara
5. Andika matatizo yanayoweza kutokea kwa utendaji na mbinu za kuzitatua

## Rasilimali Zaidi

- [Nyaraka za Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Nyaraka za Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Nini Kifuatacho

Chunguza masomo katika moduli hii kuanzia na: [5.1 Ujumuishaji wa MCP](./mcp-integration/README.md)

Baada ya kukamilisha moduli hii, endelea na: [Moduli 6: Michango ya Jamii](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->