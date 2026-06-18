# Study Plan Generator with Chainlit & Microsoft Learn Docs MCP

## Mga Kinakailangan

- Python 3.8 o mas mataas
- pip (Python package manager)
- Access sa Internet para kumonekta sa Microsoft Learn Docs MCP server

## Pag-install

1. I-clone ang repository na ito o i-download ang mga file ng proyekto.
2. I-install ang mga kinakailangang dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Paggamit

### Senaryo 1: Simpleng Query sa Docs MCP
Isang command-line client na kumokonekta sa Docs MCP server, nagpapadala ng query, at ipiniprint ang resulta.

1. Patakbuhin ang script:
   ```bash
   python scenario1.py
   ```
2. Ilagay ang iyong tanong tungkol sa dokumentasyon sa prompt.

### Senaryo 2: Study Plan Generator (Chainlit Web App)
Isang web-based na interface (gamit ang Chainlit) na nagpapahintulot sa mga user na gumawa ng isang personalisadong plano sa pag-aaral kada linggo para sa anumang teknikal na paksa.

1. Simulan ang Chainlit app:
   ```bash
   chainlit run scenario2.py
   ```
2. Buksan ang lokal na URL na ibinigay sa iyong terminal (halimbawa, http://localhost:8000) sa iyong browser.
3. Sa chat window, ilagay ang iyong paksa ng pag-aaral at ang bilang ng linggo na nais mong mag-aral (halimbawa, "AI-900 certification, 8 weeks").
4. Tutugon ang app ng isang linggo-linggong plano sa pag-aaral, kabilang ang mga link sa kaugnay na Microsoft Learn documentation.

**Mga Kinakailangang Environment Variables:**

Para gamitin ang Senaryo 2 (ang Chainlit web app na may Azure OpenAI), kailangan mong itakda ang mga sumusunod na environment variables sa `.env` file sa `python` na direktoryo:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Punan ang mga halagang ito gamit ang mga detalye ng iyong Azure OpenAI resource bago patakbuhin ang app.

> [!TIP]
> Madaling i-deploy ang sarili mong mga modelo gamit ang [Microsoft Foundry](https://ai.azure.com/).

### Senaryo 3: In-Editor Docs gamit ang MCP Server sa VS Code

Sa halip na magpalipat-lipat sa browser tabs para maghanap ng dokumentasyon, maaari mong dalhin ang Microsoft Learn Docs nang direkta sa iyong VS Code gamit ang MCP server. Pinapahintulutan ka nitong:
- Maghanap at magbasa ng docs sa loob ng VS Code nang hindi umaalis sa iyong coding environment.
- Mag-refer ng dokumentasyon at magpasok ng mga link nang direkta sa iyong README o mga file ng kurso.
- Gamitin ang GitHub Copilot at MCP nang magkasama para sa isang seamless, AI-powered na workflow ng dokumentasyon.

**Mga Halimbawa ng Paggamit:**
- Mabilis na magdagdag ng mga reference link sa isang README habang nagsusulat ng kurso o dokumentasyon ng proyekto.
- Gamitin ang Copilot para gumawa ng code at MCP para agad makahanap at mag-sitasyon ng mga kaugnay na docs.
- Manatiling naka-focus sa iyong editor at pataasin ang produktibidad.

> [!IMPORTANT]
> Tiyaking mayroon kang valid na [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) configuration sa iyong workspace (ang lokasyon ay `.vscode/mcp.json`).

## Bakit Chainlit para sa Senaryo 2?

Ang Chainlit ay isang modernong open-source na framework para sa paggawa ng mga conversational web application. Pinapadali nito ang paglikha ng mga chat-based na user interface na kumokonekta sa mga backend services tulad ng Microsoft Learn Docs MCP server. Ginagamit ng proyektong ito ang Chainlit upang magbigay ng isang simple at interactive na paraan para makagawa ng personalisadong mga plano sa pag-aaral nang real time. Sa pamamagitan ng pag-leverage sa Chainlit, mabilis kang makakagawa at makakapag-deploy ng chat-based tools na nagpapahusay sa produktibidad at pagkatuto.

## Ano ang Ginagawa Nito

Pinapayagan ng app na ito ang mga user na gumawa ng personalisadong plano sa pag-aaral sa pamamagitan lamang ng paglagay ng paksa at haba ng oras. Pinoproseso ng app ang iyong input, nagtatanong sa Microsoft Learn Docs MCP server para sa kaugnay na nilalaman, at inaayos ang mga resulta sa isang istrukturadong linggo-linggong plano. Ipinapakita ang mga rekomendasyon sa bawat linggo sa chat, na nagpapadali upang sundan at subaybayan ang progreso mo. Tinitiyak ng integrasyon na palagi kang nakakakuha ng pinakabago at pinaka-kaugnay na mga learning resources.

## Mga Halimbawang Query

Subukan ang mga query na ito sa chat window upang makita kung paano tumugon ang app:

- `AI-900 certification, 8 weeks`
- `Learn Azure Functions, 4 weeks`
- `Azure DevOps, 6 weeks`
- `Data engineering on Azure, 10 weeks`
- `Microsoft security fundamentals, 5 weeks`
- `Power Platform, 7 weeks`
- `Azure AI services, 12 weeks`
- `Cloud architecture, 9 weeks`

Ipinapakita ng mga halimbawang ito ang kakayahang mag-adjust ng app para sa iba't ibang layunin sa pagkatuto at mga timeframe.

## Mga Sanggunian

- [Chainlit Documentation](https://docs.chainlit.io/)
- [MCP Documentation](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->