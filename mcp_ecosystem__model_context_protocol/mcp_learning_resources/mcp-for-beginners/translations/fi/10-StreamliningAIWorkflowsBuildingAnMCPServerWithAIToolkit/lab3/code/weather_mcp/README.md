# Weather MCP Server

Tämä on esimerkkimallinen MCP-palvelin Pythonilla, joka toteuttaa säätyökaluja mallivastauksilla. Sitä voidaan käyttää pohjana omalle MCP-palvelimellesi. Se sisältää seuraavat ominaisuudet:

- **Säätyökalu**: Työkalu, joka tarjoaa mallinnettua sääinformaatiota annetun sijainnin perusteella.
- **Yhdistä Agent Builderiin**: Ominaisuus, jonka avulla MCP-palvelin voidaan yhdistää Agent Builderiin testauksen ja virheenkorjauksen varten.
- **Virheenkorjaa [MCP Inspectorissa](https://github.com/modelcontextprotocol/inspector)**: Ominaisuus, jonka avulla MCP-palvelinta voi virheenkorjata MCP Inspectorin avulla.

## Aloita Weather MCP Server -mallilla

> **Esivaatimukset**
>
> Jotta voit suorittaa MCP-palvelimen paikallisella kehityskoneellasi, tarvitset:
>
> - [Python](https://www.python.org/)
> - (*Valinnainen - jos haluat käyttää uv:tä*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Valmistele ympäristö

Tämän projektin ympäristön asettamiseen on kaksi lähestymistapaa. Voit valita mieltymyksesi mukaisesti jommankumman.

> Huom: Lataa VSCode tai terminaali uudelleen varmistaaksesi, että virtuaaliympäristön python on käytössä sen luomisen jälkeen.

| Lähestymistapa | Vaiheet |
| -------- | ----- |
| Käyttäen `uv` | 1. Luo virtuaaliympäristö: `uv venv` <br>2. Suorita VSCode-komento "***Python: Select Interpreter***" ja valitse virtuaaliympäristöstä luotu python <br>3. Asenna riippuvuudet (sisältäen kehitysriippuvuudet): `uv pip install -r pyproject.toml --extra dev` |
| Käyttäen `pip` | 1. Luo virtuaaliympäristö: `python -m venv .venv` <br>2. Suorita VSCode-komento "***Python: Select Interpreter***" ja valitse virtuaaliympäristöstä luotu python<br>3. Asenna riippuvuudet (sisältäen kehitysriippuvuudet): `pip install -e .[dev]` |

Ympäristön valmistelun jälkeen voit suorittaa palvelimen paikallisella kehityskoneellasi Agent Builderin kautta MCP-asiakkaana aloittaaksesi:
1. Avaa VS Code Debug-paneeli. Valitse `Debug in Agent Builder` tai paina `F5` aloittaaksesi MCP-palvelimen virheenkorjauksen.
2. Käytä Microsoft Foundry Toolkit Agent Builderia testataksesi palvelinta [tällä kehotteella](../../../../../../../../../../../open_prompt_builder). Palvelin yhdistetään automaattisesti Agent Builderiin.
3. Klikkaa `Run` testataksesi palvelinta kehotteella.

**Onnittelut**! Olet onnistuneesti suorittanut Weather MCP Serverin paikallisella kehityskoneellasi Agent Builderin kautta MCP-asiakkaana.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Mitä malli sisältää

| Kansio / Tiedosto | Sisältö                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode-tiedostot virheenkorjausta varten                   |
| `.aitk`      | Microsoft Foundry Toolkitin asetukset                |
| `src`        | Weather MCP -palvelimen lähdekoodi   |

## Kuinka virheenkorjata Weather MCP Serveriä

> Huomautuksia:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) on visuaalinen kehittäjätyökalu MCP-palvelinten testaamiseen ja virheenkorjaukseen.
> - Kaikki virheenkorjaustilat tukevat taukokohtia, joten voit lisätä taukokohtia työkalun toteutuskoodiin.

| Virheenkorjaustila | Kuvaus | Virheenkorjauksen vaiheet |
| ---------- | ----------- | --------------- |
| Agent Builder | Virheenkorjaa MCP-palvelinta Agent Builderissa Microsoft Foundry Toolkitin kautta. | 1. Avaa VS Code Debug-paneeli. Valitse `Debug in Agent Builder` ja paina `F5` aloittaaksesi MCP-palvelimen virheenkorjauksen.<br>2. Käytä Microsoft Foundry Toolkit Agent Builderia testataksesi palvelinta [tällä kehotteella](../../../../../../../../../../../open_prompt_builder). Palvelin yhdistetään automaattisesti Agent Builderiin.<br>3. Klikkaa `Run` testataksesi palvelinta kehotteella. |
| MCP Inspector | Virheenkorjaa MCP-palvelinta käyttäen MCP Inspectoria. | 1. Asenna [Node.js](https://nodejs.org/)<br> 2. Valmistele Inspector: `cd inspector` && `npm install` <br> 3. Avaa VS Code Debug-paneeli. Valitse `Debug SSE in Inspector (Edge)` tai `Debug SSE in Inspector (Chrome)`. Paina F5 aloittaaksesi virheenkorjauksen.<br> 4. Kun MCP Inspector käynnistyy selaimessa, napsauta `Connect`-painiketta yhdistääksesi tämän MCP-palvelimen.<br> 5. Tämän jälkeen voit `List Tools`, valita työkalun, syöttää parametrit ja `Run Tool` virheenkorjataksesi palvelimesi koodia.<br> |

## Oletusportit ja muokkaukset

| Virheenkorjaustila | Portit | Määritelmät | Mukautukset | Huomautus |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Muokkaa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) vaihtaaksesi yllä olevia portteja. | Ei sovellettavissa |
| MCP Inspector | 3001 (Palvelin); 5173 ja 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Muokkaa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) vaihtaaksesi yllä olevia portteja. | Ei sovellettavissa |

## Palaute

Jos sinulla on palautetta tai ehdotuksia tähän malliin liittyen, avaa ongelma [Microsoft Foundry Toolkitin GitHub-repositoriossa](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->