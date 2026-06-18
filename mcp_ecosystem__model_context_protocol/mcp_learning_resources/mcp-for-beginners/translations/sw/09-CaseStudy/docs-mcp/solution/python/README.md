# Kizazi cha Mpango wa Kujifunza kwa Chainlit & Microsoft Learn Docs MCP

## Masharti ya Awali

- Python 3.8 au zaidi
- pip (msimamizi wa pakiti za Python)
- Mwangaza wa mtandao kuunganishwa na seva ya Microsoft Learn Docs MCP

## Usakinishaji

1. Nakili hifadhi hii au pakua faili za mradi.
2. Seti tegemezi zinazohitajika:

   ```bash
   pip install -r requirements.txt
   ```

## Matumizi

### Hali ya 1: Uchunguzi Rahisi kwa Docs MCP
Mteja wa amri ambao unaunganishwa na seva ya Docs MCP, hutuma swali, na kuonyesha matokeo.

1. Endesha script:
   ```bash
   python scenario1.py
   ```
2. Weka swali lako la nyaraka kwenye sehemu ya kuandika.

### Hali ya 2: Kizazi cha Mpango wa Kujifunza (Chainlit Web App)
Kiolesura cha wavuti (kutumia Chainlit) kinachowezesha watumiaji kuunda mpango wa kujifunza wa kibinafsi, wiki kwa wiki kwa mada yoyote ya kiufundi.

1. Anzisha app ya Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Fungua URL ya ndani iliyoonyeshwa kwenye terminal yako (mfano, http://localhost:8000) katika kivinjari chako.
3. Kwenye dirisha la mazungumzo, ingiza mada yako ya kujifunza na idadi ya wiki unayotaka kujifunza (mfano, "AI-900 certification, 8 weeks").
4. App itajibu na mpango wa kujifunza wiki kwa wiki, pamoja na viungo vya nyaraka muhimu za Microsoft Learn.

**Mazingira Yanayohitajika:**

Ili kutumia Hali ya 2 (app ya wavuti ya Chainlit na Azure OpenAI), lazima uwe umeweka mabadiliko ya mazingira yafuatayo katika faili `.env` kwenye saraka ya `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Jaza thamani hizi na maelezo ya rasilimali yako ya Azure OpenAI kabla ya kuendesha app.

> [!TIP]
> Unaweza kwa urahisi kuanzisha mifano yako mwenyewe ukitumia [Microsoft Foundry](https://ai.azure.com/).

### Hali ya 3: Nyaraka Ndani ya Hariri na Seva ya MCP katika VS Code

Badala ya kubadili tabo za kivinjari kutafuta nyaraka, unaweza kuleta Microsoft Learn Docs moja kwa moja katika VS Code yako kwa kutumia seva ya MCP. Hii inakuwezesha:
- Kutafuta na kusoma nyaraka ndani ya VS Code bila kuondoka kwenye mazingira ya kuandika msimbo.
- Rejelea nyaraka na kuingiza viungo moja kwa moja ndani ya README yako au faili za kozi.
- Tumia GitHub Copilot na MCP pamoja kwa mtiririko wa kazi wa nyaraka unaotumia AI bila matatizo.

**Matumizi ya Mfano:**
- Kuongeza haraka viungo vya rejeleo kwenye README wakati wa kuandika nyaraka za kozi au mradi.
- Tumia Copilot kuandaa msimbo na MCP kupata na kutaja nyaraka zinazofaa mara moja.
- Kaa makini ndani ya mhariri wako na ongeza ufanisi.

> [!IMPORTANT]
> Hakikisha una usanidi halali wa [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) katika sehemu yako ya kazi (mahali ni `.vscode/mcp.json`).

## Kwa Nini Chainlit kwa Hali ya 2?

Chainlit ni mfumo wa kisasa wa chanzo huria wa kujenga programu za wavuti za mazungumzo. Hufanya iwe rahisi kuunda violesura vinavyoegemea mazungumzo vinavyounganishwa na huduma za nyuma kama seva ya Microsoft Learn Docs MCP. Mradi huu unatumia Chainlit kutoa njia rahisi na ya mwingiliano ya kuunda mipango ya kujifunza binafsi kwa wakati halisi. Kwa kutumia Chainlit, unaweza kuunda na kuanzisha zana za mazungumzo zinazoongeza ufanisi na kujifunza.

## Kile Kinachofanywa Hiki

App hii inaruhusu watumiaji kuunda mpango wa kujifunza binafsi kwa kuingiza mada na muda. Programu huchambua maingizo yako, huuliza seva ya Microsoft Learn Docs MCP kwa maudhui yanayohusiana, na kupanga matokeo kuwa mpango uliopangwa wiki kwa wiki. Mapendekezo ya kila wiki yanaonyeshwa katika mazungumzo, kuwafanya rahisi kufuata na kufuatilia maendeleo yako. Muungano huu unahakikisha unapata rasilimali za kisomo za hivi karibuni na zinazofaa kila wakati.

## Maswali ya Mfano

Jaribu maswali haya katika dirisha la mazungumzo kuona jinsi app inavyotokea:

- `AI-900 certification, 8 weeks`
- `Learn Azure Functions, 4 weeks`
- `Azure DevOps, 6 weeks`
- `Data engineering on Azure, 10 weeks`
- `Microsoft security fundamentals, 5 weeks`
- `Power Platform, 7 weeks`
- `Azure AI services, 12 weeks`
- `Cloud architecture, 9 weeks`

Mifano hii inaonyesha unyumbufu wa app kwa malengo tofauti ya kujifunza na muda wa kujifunza.

## Marejeleo

- [Chainlit Documentation](https://docs.chainlit.io/)
- [MCP Documentation](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->