# Weather MCP -palvelin

Tämä on Pythonilla toteutettu esimerkkimalli MCP-palvelimesta, joka tarjoaa säätietotyökaluja mallivastauksilla. Sitä voi käyttää oman MCP-palvelimesi rungoksi. Se sisältää seuraavat ominaisuudet:

- **Weather Tool**: Työkalu, joka tarjoaa mallinnettuja säätietoja annetun sijainnin perusteella.
- **Yhdistä Agent Builderiin**: Ominaisuus, joka mahdollistaa MCP-palvelimen yhdistämisen Agent Builderiin testauksen ja virheenkorjauksen helpottamiseksi.
- **Virheenkorjaus [MCP Inspectorilla](https://github.com/modelcontextprotocol/inspector)**: Ominaisuus, joka mahdollistaa MCP-palvelimen virheenkorjauksen MCP Inspector -työkalulla.

## Aloita Weather MCP -palvelinmallilla

> **Esivaatimukset**
>
> Jotta voit käyttää MCP-palvelinta paikallisella kehityskoneellasi, tarvitset:
>
> - [Python](https://www.python.org/)
> - (*Valinnainen - jos haluat käyttää uv:tä*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger -laajennus](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Valmistele ympäristö

Projektin ympäristön pystyttämiseen on kaksi vaihtoehtoa. Voit valita mieltymyksesi mukaan toisesta.

> Huomautus: Lataa VSCode tai komentorivi uudelleen varmistaaksesi, että virtuaaliympäristön python otetaan käyttöön sen luomisen jälkeen.

| Vaihtoehto | Vaiheet |
| -------- | ----- |
| Käyttämällä `uv`:tä | 1. Luo virtuaaliympäristö: `uv venv` <br>2. Suorita VSCode-komento "***Python: Select Interpreter***" ja valitse juuri luodun virtuaaliympäristön python <br>3. Asenna riippuvuudet (sisältää kehitysriippuvuudet): `uv pip install -r pyproject.toml --extra dev` |
| Käyttämällä `pip`iä | 1. Luo virtuaaliympäristö: `python -m venv .venv` <br>2. Suorita VSCode-komento "***Python: Select Interpreter***" ja valitse juuri luodun virtuaaliympäristön python <br>3. Asenna riippuvuudet (sisältää kehitysriippuvuudet): `pip install -e .[dev]` |

Ympäristön pystytyksen jälkeen voit ajaa palvelinta paikallisella kehityskoneellasi Agent Builderin kautta MCP Clienttina aloittaaksesi:
1. Avaa VS Code -virheenkorjauspaneeli. Valitse `Debug in Agent Builder` tai paina `F5` aloittaaksesi MCP-palvelimen virheenkorjauksen.
2. Käytä AI Toolkit Agent Builderia testataksesi palvelinta [tällä kehotteella](../../../../../../../../../../../open_prompt_builder). Palvelin liitetään automaattisesti Agent Builderiin.
3. Klikkaa `Run` testataksesi palvelinta kehotteella.

**Onneksi olkoon**! Olet onnistuneesti käynnistänyt Weather MCP -palvelimen paikallisella kehityskoneellasi Agent Builderin kautta MCP Clienttina.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Mitä mallipohja sisältää

| Kansio / Tiedosto | Sisältö                                  |
| ----------------- | --------------------------------------- |
| `.vscode`         | VSCode-tiedostot virheenkorjausta varten |
| `.aitk`           | AI Toolkitin konfiguraatiot             |
| `src`             | Lähdekoodi Weather MCP -palvelimelle     |

## Kuinka virheenkorjata Weather MCP -palvelinta

> Huomautukset:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) on visuaalinen kehittäjätyökalu MCP-palvelinten testaamiseen ja virheenkorjaukseen.
> - Kaikki virheenkorjaustilat tukevat taukopisteitä, joten voit lisätä taukopisteitä työkalun toteutuskoodiin.

| Virheenkorjaustila | Kuvaus | Virheenkorjauksen vaiheet |
| ------------------ | ------ | ------------------------- |
| Agent Builder | Virheenkorjaa MCP-palvelinta Agent Builderissa AI Toolkitin kautta. | 1. Avaa VS Code -virheenkorjauspaneeli. Valitse `Debug in Agent Builder` ja paina `F5` aloittaaksesi virheenkorjauksen.<br>2. Käytä AI Toolkit Agent Builderia testataksesi palvelinta [tällä kehotteella](../../../../../../../../../../../open_prompt_builder). Palvelin liitetään automaattisesti Agent Builderiin.<br>3. Klikkaa `Run` testataksesi palvelinta kehotteella. |
| MCP Inspector | Virheenkorjaa MCP-palvelinta MCP Inspectorilla. | 1. Asenna [Node.js](https://nodejs.org/)<br> 2. Valmistele Inspector: `cd inspector` && `npm install` <br> 3. Avaa VS Code -virheenkorjauspaneeli. Valitse `Debug SSE in Inspector (Edge)` tai `Debug SSE in Inspector (Chrome)`. Paina F5 aloittaaksesi virheenkorjauksen.<br> 4. Kun MCP Inspector käynnistyy selaimessa, klikkaa `Connect`-painiketta yhdistääksesi tämän MCP-palvelimen.<br> 5. Voit sitten `List Tools`, valita työkalun, syöttää parametrit ja `Run Tool` virheenkorjataksesi palvelinkoodia.<br> |

## Oletussäikeet ja mukautukset

| Virheenkorjaustila | Portit | Määrittelyt | Mukautukset | Huomautus |
| ------------------ | ------ | ----------- | ----------- | --------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Muokkaa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) muuttaaksesi yllä olevia portteja. | Ei sovellu |
| MCP Inspector | 3001 (palvelin); 5173 ja 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Muokkaa [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) muuttaaksesi yllä olevia portteja. | Ei sovellu |

## Palautetta

Jos sinulla on palautetta tai ehdotuksia tästä mallista, avaa issue [AI Toolkitin GitHub-repositorioon](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:  
Tämä asiakirja on käännetty tekoälykäännöspalvelulla [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta on hyvä ottaa huomioon, että automaattiset käännökset voivat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen omalla kielellä on virallinen ja päätösvaltainen lähde. Tärkeissä tiedoissa suositellaan ammattimaisen ihmiskääntäjän käyttöä. Emme ole vastuussa tästä käännöksestä aiheutuvista väärinymmärryksistä tai virhetulkintojen seurauksista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->