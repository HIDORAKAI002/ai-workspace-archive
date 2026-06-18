# Hali ya 3: Nyaraka ndani ya Mhariri na Server ya MCP katika VS Code

## Muhtasari

Katika hali hii, utajifunza jinsi ya kuleta Microsoft Learn Docs moja kwa moja katika mazingira yako ya Visual Studio Code kwa kutumia server ya MCP. Badala ya kubadilisha tabs za kivinjari kila mara kutafuta nyaraka, unaweza kufikia, kutafuta, na kutaja nyaraka rasmi moja kwa moja ndani ya mhariri wako. Njia hii huongeza ufanisi wa kazi yako, inakuwekea umakini, na inaruhusu muunganisho rahisi na zana kama GitHub Copilot.

- Tafuta na soma nyaraka ndani ya VS Code bila kuondoka katika mazingira yako ya kuandika msimbo.
- Taja nyaraka na weka viungo moja kwa moja katika README yako au faili za kozi.
- Tumia GitHub Copilot na MCP pamoja kwa mtiririko wa nyaraka ulio na nguvu ya AI usio na shida.

## Malengo ya Kujifunza

Mwisho wa sura hii, utaelewa jinsi ya kusanidi na kutumia server ya MCP ndani ya VS Code ili kuboresha mtiririko wako wa nyaraka na maendeleo. Utaweza:

- Sanidi mazingira yako ya kazi kutumia server ya MCP kwa ajili ya kutafuta nyaraka.
- Tafuta na weka nyaraka moja kwa moja kutoka ndani ya VS Code.
- Changanya nguvu za GitHub Copilot na MCP kwa mtiririko wa kazi wenye tija zaidi, ulioboreshwa na AI.

Ujuzi huu utakusaidia kubaki na umakini, kuboresha ubora wa nyaraka, na kuongeza tija yako kama msanidi au mwandishi wa kiufundi.

## Suluhisho

Ili kufanikisha upatikanaji wa nyaraka ndani ya mhariri, utafuata mfululizo wa hatua zinazounganisha server ya MCP na VS Code pamoja na GitHub Copilot. Suluhisho hili ni bora kwa waandishi wa kozi, waandishi wa nyaraka, na waendelezaji wanaotaka kubaki na umakini ndani ya mhariri wakati wakifanya kazi na nyaraka na Copilot.

- Ongeza viungo vya rejea haraka katika README wakati wa kuandika kozi au nyaraka za mradi.
- Tumia Copilot kuzalisha msimbo na MCP kupata na kutaja nyaraka zinazofaa mara moja.
- Bakia na umakini ndani ya mhariri wako na ongeza tija.

### Mwongozo wa Hatua kwa Hatua

Ili kuanza, fuata hatua hizi. Kwa kila hatua, unaweza kuongeza picha ya skrini kutoka kwenye folda ya mali kuonyesha mchakato kwa njia ya kuona.

1. **Ongeza usanidi wa MCP:**
   Katika mzizi wa mradi wako, tengeneza faili `.vscode/mcp.json` na ongeza usanidi ufuatao:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Usanidi huu unamwambia VS Code jinsi ya kuunganishwa na [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Hatua 1: Ongeza mcp.json kwenye folda ya .vscode](../../../../../../translated_images/sw/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Fungua jopo la mazungumzo la GitHub Copilot:**
   Ikiwa bado huna kiendelezi cha GitHub Copilot kilichosakinishwa, nenda katika mtazamo wa Viendelezi (Extensions) ndani ya VS Code na ukisakinishe. Unaweza kupakua moja kwa moja kutoka [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Kisha, fungua jopo la Copilot Chat kutoka upau wa pembeni.

   ![Hatua 2: Fungua jopo la mazungumzo la Copilot](../../../../../../translated_images/sw/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Zimezesha mtindo wa wakala na thibitisha zana:**
   Katika jopo la Copilot Chat, zima mtindo wa wakala.

   ![Hatua 3: Zimezesha mtindo wa wakala na thibitisha zana](../../../../../../translated_images/sw/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Baada ya kuzima mtindo wa wakala, thibitisha kwamba server ya MCP imeorodheshwa kuwa moja ya zana zinazopatikana. Hii inahakikisha kuwa wakala wa Copilot anaweza kufikia server ya nyaraka kupata taarifa muhimu.
   
   ![Hatua 3: Thibitisha zana ya server ya MCP](../../../../../../translated_images/sw/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Anza mazungumzo mapya na muulize wakala:**
   Fungua mazungumzo mapya katika jopo la Copilot Chat. Sasa unaweza kumuuliza wakala maswali yako ya nyaraka. Wakala atatumia server ya MCP kupata na kuonyesha nyaraka zinazohusiana za Microsoft Learn moja kwa moja ndani ya mhariri wako.

   - *"Najaribu kuandika mpango wa masomo kwa mada X. Nitaisoma kwa wiki 8, kwa kila wiki, pendekeza maudhui ninayopaswa kuchukua."*

   ![Hatua 4: Muulize wakala katika mazungumzo](../../../../../../translated_images/sw/step4-prompt-chat.12187bb001605efc.webp)

5. **Uli wa Moja kwa Moja:**

   > Hebu tuchukue swali moja kwa moja kutoka sehemu ya [#get-help](https://discord.gg/D6cRhjHWSC) kwenye Microsoft Foundry Discord ([tazama ujumbe wa awali](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Natafuta majibu kuhusu jinsi ya kuweka suluhisho la mawakala wengi lenye mawakala wa AI waliotengenezwa kwenye Azure AI Foundry. Naona hakuna njia ya moja kwa moja ya kuweka, kama vile njia za Copilot Studio. Basi, ni njia gani tofauti za kufanya utekelezaji huu kwa watumiaji wa biashara kushirikiana na kumaliza kazi?
Kuna makala/mitandao mingi inayosema tunaweza kutumia huduma ya Azure Bot kufanya kazi hii ambayo inaweza kuwa daraja kati ya MS teams na Azure AI Foundry Agents, basi je, hili litaendelea vipi kama nitasanidi bot ya Azure inayounganisha na Orchestrator Agent kwenye Azure AI Foundry kupitia Azure function kufanya uratibu au nahitaji kuunda Azure function kwa kila sehemu ya mawakala wa AI katika suluhisho la mawakala wengi kufanya uratibu kwenye mfumo wa Bot? Mapendekezo mengine yakaribishwa sana.
"*

   ![Hatua 5: Maswali ya moja kwa moja](../../../../../../translated_images/sw/step5-live-queries.49db3e4a50bea273.webp)

   Wakala atajibu na viungo na muhtasari wa nyaraka zinazohusiana, ambavyo unaweza kisha kuingiza moja kwa moja katika faili zako za markdown au kutumia kama rejea katika msimbo wako.
   
### Maswali ya Mfano

Hapa kuna baadhi ya maswali ya mfano unaweza kujaribu. Maswali haya yataonyesha jinsi server ya MCP na Copilot wanavyoweza kufanya kazi pamoja kutoa nyaraka na rejea zinazojibu kwa muktadha papo hapo bila kuondoka VS Code:

- "Nionyeshe jinsi ya kutumia vichocheo vya Azure Functions."
- "Weka kiungo cha nyaraka rasmi za Azure Key Vault."
- "Ni mbinu gani bora za kulinda rasilimali za Azure?"
- "Tafuta mwongozo wa kuanza haraka kwa huduma za Azure AI."

Maswali haya yataonyesha jinsi server ya MCP na Copilot wanavyoweza kufanya kazi pamoja kutoa nyaraka na rejea zinazojibu kwa muktadha papo hapo bila kuondoka VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->