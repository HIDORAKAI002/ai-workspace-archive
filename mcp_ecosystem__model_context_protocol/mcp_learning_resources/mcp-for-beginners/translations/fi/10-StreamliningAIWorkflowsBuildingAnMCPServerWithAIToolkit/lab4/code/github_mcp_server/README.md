# Weather MCP Server

Tämä on esimerkkimallinen MCP-palvelin Pythonilla, joka toteuttaa säätyökaluja mallinnetuilla vastauksilla. Sitä voi käyttää oman MCP-palvelimesi rungoksi. Se sisältää seuraavat ominaisuudet:

- **Weather Tool**: Työkalu, joka tarjoaa mallinnettua sääinformaatiota annetun paikan perusteella.
- **Git Clone Tool**: Työkalu, joka kloonaa git-repositorion määritettyyn kansioon.
- **VS Code Open Tool**: Työkalu, joka avaa kansion VS Codessa tai VS Code Insidersissa.
- **Connect to Agent Builder**: Ominaisuus, joka mahdollistaa MCP-palvelimen yhdistämisen Agent Builderiin testausta ja virheenkorjausta varten.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Ominaisuus, joka mahdollistaa MCP-palvelimen virheenkorjauksen MCP Inspectorin avulla.

## Aloitus Weather MCP Server -mallipohjalla

> **Esivaatimukset**
>
> Jotta voit ajaa MCP-palvelinta paikallisessa kehitysympäristössä, tarvitset:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (vaaditaan git_clone_repo-työkalua varten)
> - [VS Code](https://code.visualstudio.com/) tai [VS Code Insiders](https://code.visualstudio.com/insiders/) (vaaditaan open_in_vscode-työkalua varten)
> - (*Valinnainen - jos haluat käyttää uv:tä*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Ympäristön valmistelu

Tälle projektille on kaksi tapaa alustaa ympäristö. Voit valita haluamasi tavan.

> Huomautus: Käynnistä VSCode tai komentorivi uudelleen varmistaaksesi, että virtuaaliympäristön python otetaan käyttöön ympäristön luomisen jälkeen.

| Tapa | Vaiheet |
| -------- | ----- |
| Käyttämällä `uv` | 1. Luo virtuaaliympäristö: `uv venv` <br>2. Suorita VSCode-komento "***Python: Select Interpreter***" ja valitse luodun virtuaaliympäristön python <br>3. Asenna riippuvuudet (sisältäen kehitysriippuvuudet): `uv pip install -r pyproject.toml --extra dev` |
| Käyttämällä `pip` | 1. Luo virtuaaliympäristö: `python -m venv .venv` <br>2. Suorita VSCode-komento "***Python: Select Interpreter***" ja valitse luodun virtuaaliympäristön python <br>3. Asenna riippuvuudet (sisältäen kehitysriippuvuudet): `pip install -e .[dev]` |

Ympäristön asettamisen jälkeen voit ajaa palvelimen paikallisessa kehityskoneessasi Agent Builderin kautta MCP Clientinä aloittamista varten:
1. Avaa VS Code Debug-paneeli. Valitse `Debug in Agent Builder` tai paina `F5` aloittaaksesi MCP-palvelimen virheenkorjauksen.
2. Käytä AI Toolkit Agent Builderia testataksesi palvelinta [tällä kehotteella](../../../../../../../../../../../open_prompt_builder). Palvelin yhdistyy automaattisesti Agent Builderiin.
3. Klikkaa `Run` testataksesi palvelinta kehotteella.

**Onnittelut**! Olet onnistuneesti ajanut Weather MCP Server -palvelimen paikallisessa kehityskoneessasi Agent Builderin kautta MCP Clientinä.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Mitä mallipohja sisältää

| Kansio / Tiedosto | Sisältö |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode-tiedostot virheenkorjausta varten      |
| `.aitk`      | Asetukset AI Toolkitille                      |
| `src`        | Weather MCP -palvelimen lähdekoodi            |

## Kuinka virheenkorjata Weather MCP Server

> Huomautuksia:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) on visuaalinen kehitystyökalu MCP-palvelimien testaamiseen ja virheenkorjaukseen.
> - Kaikki virheenkorjaustilat tukevat breakpointteja, joten voit lisätä breakpointteja työkalun toteutuskoodiin.

## Saatavilla olevat työkalut

### Weather Tool
`get_weather`-työkalu tarjoaa mallinnettua sääinformaatiota määritellylle paikalle.

| Parametri | Tyyppi | Kuvaus |
| --------- | ---- | ----------- |
| `location` | merkkijono | Paikka, jolle säätiedot haetaan (esim. kaupungin nimi, osavaltio, tai koordinaatit) |

### Git Clone Tool
`git_clone_repo`-työkalu kloonaa git-repositorion määritettyyn kansioon.

| Parametri | Tyyppi | Kuvaus |
| --------- | ---- | ----------- |
| `repo_url` | merkkijono | Git-repositorion URL, joka halutaan kloonata |
| `target_folder` | merkkijono | Polku kansioon, johon repositorio kloonataan |

Työkalu palauttaa JSON-objektin, jossa on:
- `success`: Boolean, joka ilmoittaa onnistuiko operaatio
- `target_folder` tai `error`: Kloonatun repositorion polku tai virheilmoitus

### VS Code Open Tool
`open_in_vscode`-työkalu avaa kansion VS Code- tai VS Code Insiders -sovelluksessa.

| Parametri | Tyyppi | Kuvaus |
| --------- | ---- | ----------- |
| `folder_path` | merkkijono | Polku avattavaan kansioon |
| `use_insiders` | boolean (valinnainen) | Käytetäänkö VS Code Insidersia tavallisen VS Coden sijaan |

Työkalu palauttaa JSON-objektin, jossa on:
- `success`: Boolean, joka ilmoittaa onnistuiko operaatio
- `message` tai `error`: Vahvistusviesti tai virheilmoitus

| Virheenkorjaustila | Kuvaus | Vaiheet virheenkorjaukseen |
| ---------- | ----------- | --------------- |
| Agent Builder | Virheenkorjaa MCP-palvelin Agent Builderissa AI Toolkitin kautta. | 1. Avaa VS Code Debug-paneeli. Valitse `Debug in Agent Builder` ja paina `F5` aloittaaksesi MCP-palvelimen virheenkorjauksen.<br>2. Käytä AI Toolkit Agent Builderia testataksesi palvelinta [tällä kehotteella](../../../../../../../../../../../open_prompt_builder). Palvelin yhdistyy automaattisesti Agent Builderiin.<br>3. Klikkaa `Run` testataksesi palvelinta kehotteella. |
| MCP Inspector | Virheenkorjaa MCP-palvelin MCP Inspectorilla. | 1. Asenna [Node.js](https://nodejs.org/)<br> 2. Valmistele Inspector: `cd inspector` && `npm install` <br> 3. Avaa VS Code Debug-paneeli. Valitse `Debug SSE in Inspector (Edge)` tai `Debug SSE in Inspector (Chrome)`. Paina F5 aloittaaksesi virheenkorjauksen.<br> 4. Kun MCP Inspector käynnistyy selaimessa, klikkaa `Connect` yhdistääksesi tämän MCP-palvelimen.<br> 5. Tämän jälkeen voit `List Tools`, valita työkalun, syöttää parametrit ja `Run Tool` virheenkorjauksen tekemiseksi palvelimen koodiin.<br> |

## Oletusportit ja mukautukset

| Virheenkorjaustila | Portit | Määritelmät | Mukautukset | Huomautus |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Muokkaa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) muuttaaksesi yllä olevia portteja. | Ei käytössä |
| MCP Inspector | 3001 (palvelin); 5173 ja 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Muokkaa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) muuttaaksesi yllä olevia portteja.| Ei käytössä |

## Palaute

Jos sinulla on palautetta tai ehdotuksia tästä mallipohjasta, avaa issue [AI Toolkit GitHub -varastossa](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta huomioithan, että automaattikäännöksissä saattaa esiintyä virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on voimassa oleva lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä johtuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->