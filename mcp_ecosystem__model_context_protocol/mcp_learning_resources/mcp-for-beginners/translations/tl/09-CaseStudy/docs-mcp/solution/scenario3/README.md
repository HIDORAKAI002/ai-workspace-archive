# Scenario 3: In-Editor Docs with MCP Server in VS Code

## Overview

Sa scenario na ito, matututuhan mo kung paano dalhin ang Microsoft Learn Docs nang diretso sa iyong Visual Studio Code environment gamit ang MCP server. Sa halip na palagiang magpalipat-lipat ng tab sa browser para maghanap ng dokumentasyon, maaari mong ma-access, mahanap, at mareferensiya ang opisyal na docs mismo sa loob ng iyong editor. Pinapadali ng pamamaraang ito ang iyong workflow, pinananatiling nakatuon, at nagbibigay-daan sa seamless na integrasyon kasama ang mga tool tulad ng GitHub Copilot.

- Maghanap at magbasa ng docs sa loob ng VS Code nang hindi umaalis sa iyong coding environment.
- Mag-referensiya ng dokumentasyon at maglagay ng mga link nang direkta sa iyong README o mga file ng kurso.
- Gamitin ang GitHub Copilot at MCP nang sabay para sa seamless, AI-powered na workflow ng dokumentasyon.

## Learning Objectives

Pagsapit ng dulo ng kabanatang ito, mauunawaan mo kung paano i-set up at gamitin ang MCP server sa loob ng VS Code upang mapahusay ang iyong workflow sa dokumentasyon at development. Magagawa mong:

- I-configure ang iyong workspace upang gamitin ang MCP server para sa paghahanap ng dokumentasyon.
- Maghanap at maglagay ng dokumentasyon nang direkta mula sa loob ng VS Code.
- Pagsamahin ang kapangyarihan ng GitHub Copilot at MCP para sa mas produktibong workflow na may AI.

Makakatulong ang mga kasanayang ito upang manatili kang nakatuon, mapabuti ang kalidad ng dokumentasyon, at mapalakas ang iyong produktibidad bilang developer o teknikal na manunulat.

## Solution

Para makamit ang access sa dokumentasyon sa loob ng editor, susundan mo ang mga hakbang na nagsasama ng MCP server sa VS Code at GitHub Copilot. Ang solusyong ito ay perpekto para sa mga may-akda ng kurso, mga manunulat ng dokumentasyon, at mga developer na nais manatiling nakatuon sa editor habang nagtatrabaho gamit ang docs at Copilot.

- Mabilis na magdagdag ng reference links sa isang README habang nagsusulat ng kurso o dokumentasyon ng proyekto.
- Gamitin ang Copilot upang gumawa ng code at ang MCP upang agad na mahanap at mai-cite ang mga kaugnay na docs.
- Manatiling nakatuon sa iyong editor at pataasin ang produktibidad.

### Step-by-Step Guide

Para makapagsimula, sundin ang mga hakbang na ito. Para sa bawat hakbang, maaari kang maglagay ng screenshot mula sa assets folder upang ipakita nang malinaw ang proseso.

1. **Idagdag ang MCP configuration:**
   Sa root ng iyong proyekto, gumawa ng `.vscode/mcp.json` file at ilagay ang sumusunod na configuration:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Ipinapakita ng configuration na ito kung paano ikokonekta ng VS Code sa [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Step 1: Add mcp.json to .vscode folder](../../../../../../translated_images/tl/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Buksan ang GitHub Copilot Chat panel:**
   Kung wala ka pang naka-install na GitHub Copilot extension, pumunta sa Extensions view ng VS Code at i-install ito. Maaari mo itong i-download direkta mula sa [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Pagkatapos, buksan ang Copilot Chat panel mula sa sidebar.

   ![Step 2: Open Copilot Chat panel](../../../../../../translated_images/tl/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **I-enable ang agent mode at kumpirmahin ang mga tools:**
   Sa Copilot Chat panel, i-enable ang agent mode.

   ![Step 3: Enable agent mode and verify tools](../../../../../../translated_images/tl/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Pagkatapos i-enable ang agent mode, tiyakin na ang MCP server ay nakalista sa mga available na tools. Sinisigurado nito na maaaring ma-access ng Copilot agent ang documentation server upang kunin ang kaugnay na impormasyon.
   
   ![Step 3: Verify MCP server tool](../../../../../../translated_images/tl/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Magsimula ng bagong chat at tanungin ang agent:**
   Magbukas ng bagong chat sa Copilot Chat panel. Maaari mo nang i-prompt ang agent gamit ang iyong mga tanong tungkol sa dokumentasyon. Gagamitin ng agent ang MCP server upang kuhanin at ipakita ang kaugnay na Microsoft Learn documentation direkta sa iyong editor.

   - *"Sinusubukan kong gumawa ng study plan para sa topic X. Mag-aaral ako nito ng 8 linggo, para sa bawat linggo, magmungkahi ng mga nilalaman na dapat kong kunin."*

   ![Step 4: Prompt the agent in chat](../../../../../../translated_images/tl/step4-prompt-chat.12187bb001605efc.webp)

5. **Live Query:**

   > Kumuha tayo ng live query mula sa [#get-help](https://discord.gg/D6cRhjHWSC) section sa Microsoft Foundry Discord ([tingnan ang orihinal na mensahe](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Naghahanap ako ng mga sagot kung paano mag-deploy ng multi-agent solution gamit ang AI agents na binuo sa Azure AI Foundry. Nakikita ko na walang direktang paraan ng deployment, tulad ng Copilot Studio channels. Ano ang mga iba't ibang paraan para gawin itong deployment para sa mga enterprise users upang makipag-interact at matapos ang trabaho?
Maraming mga artikulo/blog ang nagsasabi na maaari naming gamitin ang Azure Bot service upang gawin ang trabahong ito na maaaring magsilbing tulay sa pagitan ng MS teams at Azure AI Foundry Agents, pero gagana ba ito kung magse-set up ako ng Azure bot na nakakonekta sa Orchestrator Agent sa Azure AI foundry sa pamamagitan ng Azure function upang isagawa ang orchestration o kailangan kong gumawa ng Azure function para sa bawat AI agent na bahagi ng multi-agent solution upang gawin ang orchestration sa Bot framework? Malugod na tinatanggap ang iba pang mga suhestyon."*

   ![Step 5: Live queries](../../../../../../translated_images/tl/step5-live-queries.49db3e4a50bea273.webp)

   Sasagutin ng agent ang mga ito gamit ang mga kaugnay na link ng dokumentasyon at mga buod, na maaari mong ilagay nang direkta sa iyong mga markdown file o gamitin bilang mga reference sa iyong code.
   
### Sample Queries

Narito ang ilang halimbawa ng mga query na maaari mong subukan. Ipapakita ng mga query na ito kung paano nagtutulungan ang MCP server at Copilot upang agad na makapagbigay ng dokumentasyon at mga reference na may kaugnayan sa konteksto nang hindi umaalis sa VS Code:

- "Ipakita sa akin kung paano gamitin ang Azure Functions triggers."
- "Maglagay ng link sa opisyal na dokumentasyon para sa Azure Key Vault."
- "Ano ang mga best practices para sa pag-secure ng Azure resources?"
- "Maghanap ng quickstart para sa Azure AI services."

Ipinapakita ng mga query na ito kung paano nagtutulungan ang MCP server at Copilot upang agad na makapagbigay ng dokumentasyon at mga reference na may kaugnayan sa konteksto nang hindi umaalis sa VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->