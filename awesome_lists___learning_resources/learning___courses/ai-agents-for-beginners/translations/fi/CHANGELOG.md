# Muutosloki

Kaikki merkittävät muutokset **AI Agents for Beginners** -kurssilla on dokumentoitu tässä tiedostossa.

## [Julkaistu] — 2026-07-13

Tämä julkaisu lisää kaksi uutta oppituntia, jotka täydentävät käyttöönoton kokonaisuuden — agenteista Microsoft Foundryyn skaalaamisen ja takaisin yhdelle työasemalle — sekä savutestausputkiston, päivitetyn kurssin navigaation, uusia oppijan taitoja ja päivitetyn brändäyksen.

### Lisätty

- **Oppitunti 16 — Skaalautuvien agenttien käyttöönotto Microsoft Foundryn avulla.** Uusi oppitunti [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) ja ajettava muistikirja [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb), jossa rakennetaan tuotantotason asiakastukiedustaja (työkalut, RAG, muisti, mallin reititys, vastauksen välimuistitus, ihmisen hyväksyntä, arviointiloukku ja OpenTelemetry-jäljitys), kehitys/käyttöönotto/aikakäyttö Mermaid-kaavioiden kanssa, osaamistesti, tehtävä ja haaste.
- **Oppitunti 17 — Paikallisten tekoälyagenttien luominen Foundry Localin ja Qwenin avulla.** Uusi oppitunti [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) ja muistikirja [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb), jossa rakennetaan täysin laitteella toimiva insinööri-assistentti (Qwen-funktion kutsu Foundry Localin kautta, hiekkalaatikon tiedostotyökalut, paikallinen RAG Chroman kanssa, valinnainen paikallinen MCP), paikallisalueen-/paikallinen RAG-/työkalukutsu-kaaviot, osaamistesti, tehtävä ja haaste.
- **Savutestausputkisto.** Uusi [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) -työnkulku [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) sekä oppituntikohtaiset luettelot kansiossa [tests/](./tests/README.md) käyttöön otettaville agenteille oppitunneilla 01, 04, 05 ja 16. Indeksin README liittää kukin luettelo omalle oppitunnilleen ja ylläpidetylle agentin nimelle. Oppitunnille 16 on lisätty osio "Validoidaan käyttöönotettu agentti savutestillä"; oppitunneille 01/04/05 on lisätty valinnainen savutestauslinkki.
- **Oppijan taidot.** Uudet Agent Skills `.agents/skills/` alla: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (paketoitu oppituntien 16 ja 17 ohjeistuksen mukaan), ja [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (miten validoida muistikirjan näytteet live Microsoft Foundry / Azure OpenAI -ympäristöä vastaan).
- **Muistikirjan validointiajo.** Uusi [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1), joka suorittaa kaikki Python-muistikirjat ilman GUI:ta `nbconvert`-työkalulla ja tulostaa läpäisy-/epäonnistumistulokset taulukkona (sekä `results.json`). Se tunnistaa automaattisesti repohakemiston juuren ja Pythonin, jättää pois ei-kurssiin liittyvät muistikirjat (`.venv`, `site-packages`, `translations`, taitopohjan resurssit) ja oletuksena myös `.NET`-muistikirjat. Tukee parametreja `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` ja `-Python`.
- **Kurssin navigaatio.** Lisätty Edellinen/Seuraava oppitunti -linkit oppitunneille 11–15 (joilta puuttui aiemmin), jotta koko kurssi ketjuttaa 00 → 18 molempiin suuntiin.
- **Uudet pikkukuvat.** Oppituntien 16 ja 17 pikkukuvat sekä päivitetty repoviestin sosiaalinen kuva [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (mainostaa nyt kahta uutta oppituntia ja linkkiä `aka.ms/ai-agents-beginners`).
- **Riippuvuudet** ([requirements.txt](../../requirements.txt)): lisätty `foundry-local-sdk` ja `chromadb` oppituntia 17 varten.

### Muutettu

- **Pääasiallinen [README.md](./README.md) oppitantataulukko:** Oppitunneille 16 ja 17 lisätty linkit niiden sisältöön (aiemmin "Tulossa pian"); repossa kuva vaihdettu tiedostoon `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md):** Lisätty oppitunnit 16 ja 17 oppi- ja polkuoppaaseen ja osio "Käyttöönotettujen agenttien validoiminen savutesteillä".
- **[AGENTS.md](./AGENTS.md):** Päivitetty oppituntimäärä/kuvaus (00–18), lisätty savutestausvalidaation osio ja esimerkit oppituntien 16 ja 17 näytteiden nimet.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md):** "Edellinen oppitunti" -linkki osoittaa nyt oppitunnille 17 (aiemmin 15), ketju sulkeutuu.
- **Malliviittaukset yhtenäistetty ei-deprekoiduissa malleissa.** Kaikki kurssin osalta löytyneet `gpt-4o` / `gpt-4o-mini` -viittaukset (dokumentaatio, `.env.example`, Python/.NET muistikirjat ja näytteet) korvattu `gpt-4.1-mini`:llä — `gpt-4o` (kaikki versiot) poistuu käytöstä vuonna 2026. Oppitunnissa 16 mallin reitityksen esimerkissä pidetty pieni/suuri-kontrasti mallien välillä: `gpt-4.1-mini` (pieni) ja `gpt-4.1` (iso). Python-muistikirjat valitsevat nyt mallin ympäristömuuttujista (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) kovakoodatun mallin nimen sijaan.

### Huomioita ja tunnettuja rajoituksia

- **Ei suoraa ajamista live Azurea vastaan.** Uusien oppituntien muistikirjat ovat opetusnäytteitä; suorita ja validoi ne omassa Microsoft Foundry / Foundry Local -ympäristössäsi. Savutestaus-työnkulku vaatii, että agentti on otettu käyttöön ja Azure OIDC -salaisuudet (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) on asetettu Foundryn projektitasolla **Azure AI User** -roolilla.
- **Oppitunti 17 on vain paikallinen.** Siinä ei ole Foundry Responses -päätettä, joten savutestaustoiminto ei koske sitä; validoi suorittamalla muistikirja työasemallasi.

## [Julkaistu] — 2026-07-06

Tämä julkaisu siirtää kurssin käyttämään **Azure OpenAI Responses API:a**, yhdenmukaistaa tuotenimet **Microsoft Foundryksi** ja **Microsoft Agent Frameworkiksi (MAF)**, poistaa GitHub Modelsin käytöstä, päivittää SDK-versiot ja lisää uutta sisältöä paikallisista malleista sekä muiden frameworkien ajamisesta Foundryssä.

### Lisätty

- **Migraatiotaito** — Asennettu [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Agent Skill (lähteestä [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) kansioon `.agents/skills/`, mukaan lukien viittaukset ja skanneriskripti.
- **Foundry Local (mallien ajaminen laitteella)** — Uusi "Vaihtoehtoinen tarjoaja: Foundry Local" osio [00-course-setup/README.md](./00-course-setup/README.md) -tiedostossa, kattaa asennuksen (`winget` / `brew`), `foundry model run` -komennon, `foundry-local-sdk`:n ja `FoundryLocalManager`in yhdistämisen Microsoft Agent Frameworkiin `OpenAIChatClient`in kautta.
- **LangChain/LangGraph-agenttien hostaaminen Microsoft Foundryssä** — Uusi osio [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) ja ajettava näyte [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py), joka käyttää `langchain-azure-ai[hosting]` ja `ResponsesHostServer` (vastaanottaa `/responses` -protokollaa), perustuu [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) -materiaaliin.
- **Microsoft Project Opal** — Uusi "Todellinen esimerkki: Microsoft Project Opal" -osio [15-browser-use/README.md](./15-browser-use/README.md), jossa Opal kuvataan yritystason tietokoneen käyttöagentiksi ja yhdistetään kurssin käsitteisiin (human-in-the-loop, luottamus/turvallisuus, suunnittelu, taidot).
- **Toinen oppitunnin 02 Python-näyte** — Lisätty [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (katso "Muutokset" — siirretty aiemmasta Semantic Kernel -muistikirjasta) ja linkitetty oppitunnin READMEssä.
- Lisätty malli- ja tarjoajaosio [STUDY_GUIDE.md](./STUDY_GUIDE.md) -tiedostoon.

### Muutettu

- **Chat Completions → Responses API (Python).** Esimerkit, jotka kutsuivat mallia suoraan, on migroitu Chat Completionsista Responses API:in (`client.responses.create(input=..., store=False)`, `resp.output_text`), käyttämällä `OpenAI`-asiakasta vakaassa Azure OpenAI `/openai/v1/` päätepisteessä (ilman `api_version`). Vaikutetut esimerkit:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — koko funktiokutsun läpikäynti (työkalun skeema muutettu Responses-muotoon, tulokset palautettu `function_call_output`, `max_output_tokens` jne.).
- **GitHub Models → Azure OpenAI.** GitHub Models on deprekoitu (poistuu **heinäkuussa 2026**) eikä tue Responses API:a. Kaikki GitHub Models -koodipolut on muutettu Azure OpenAI / Microsoft Foundryksi Python- ja .NET-esimerkeissä:
  - Python: Oppitunnin 08 työnkulun muistikirjat (`01`–`03`), oppitunti 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + rinnakkaiset `.md` dokumentit, ja oppitunnin 08 dotNET työnkulun muistikirjat/`.md` (`01`–`03`) käyttävät nyt `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` `AzureCliCredential`-tunnuksella.
- **Semantic Kernel → Microsoft Agent Framework.** Aiempi `02-semantic-kernel.ipynb` on kirjoitettu uudelleen käyttämään Microsoft Agent Frameworkia Azure OpenAI:n kanssa (Responses API) ja nimetty uudelleen `02-python-agent-framework-azure-openai.ipynb`:ksi.
- **Yhtenäistetty `FoundryChatClient` + `as_agent` käyttöön.** README- ja muistikirjakoodit, jotka käyttivät `AzureAIProjectAgentProvider`-instanssia, siirrettiin käyttämään oppitunnin 01 ja frameworkin omissa esimerkeissä käytettyä kaavaa: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` ja `provider.as_agent(...)`. Päivitetty oppituntien 02–14 READMEt ja muistikirjat (esim. oppitunti 13 muisti, kaikki oppitunnin 14 muistikirjat, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Tuotenimet.** Nimimuutokset englanninkielisessä sisällössä:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Ei muutoksia: "Azure OpenAI", "Azure AI Search", "Azure AI Inference" ja ympäristömuuttujien nimet.)
- **Riippuvuudet** ([requirements.txt](../../requirements.txt)):
  - Lukittu `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Lukittu `openai>=1.108.1` (Responses API:n vaatimus).
  - Poistettu `azure-ai-inference` (käytettiin vain migroiduissa GitHub Models -näytteissä).
- **Ympäristöasetukset** ([.env.example](../../.env.example)): poistettu GitHub Models -muuttujat (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); lisätty `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` ja valinnainen `AZURE_OPENAI_API_KEY`; nimetty uudelleen Microsoft Foundryn mukaisesti.
- **Dokumentaatio** — Päivitetty [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md) ja [STUDY_GUIDE.md](./STUDY_GUIDE.md) ylläolevien muutosten mukaisesti (asetukset ympäristömuuttujiin, varmistuskoodinpätkä, tarjoajaneuvonta, nimistö).

### Poistettu

- GitHub Modelsin käyttöönotto-ohjeet ja ympäristömuuttujat poistettu asetusdokumenteista (korvattu Azure OpenAI / Microsoft Foundrylla).

### Turvallisuus / Yksityisyys (julkinen jakamisen siivous)

- Tyhjennetty Jupyter-muistikirjan tulosteet, jotka vuotasivat todellisen **Azure-tilauksen tunnuksen**, resurssi-ryhmän / resurssien nimet ja Bingin yhteystunnuksen sekä kehittäjän **paikalliset tiedostopolut ja käyttäjänimet** tiedostossa:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Varmistettu, että seuratussa englanninkielisessä sisällössä ei ole jäljellä API-avaimia, tunnuksia, tilaustunnuksia tai henkilökohtaisia polkuja (jäljelle jäävät `GITHUB_TOKEN`-viittaukset liittyvät GitHub Actions -tokeniin työnkuluissa ja GitHub MCP -palvelimen PAT:iin Oppitunnin 11 asennuksessa — molemmat ovat laillisia eikä liity GitHub-malleihin).

### Huomautuksia ja tunnettuja rajoituksia

- **Ei suoritettu/käännetty.** Nämä ovat opetusnäytteitä, jotka on päivitetty API-/nimistövirheiden korjaamiseksi; niitä ei ole ajettu elävillä Azure-resursseilla, ja .NET-näytteitä ei ole käännetty tässä ympäristössä. Varmista toimivuus oman Microsoft Foundry / Azure OpenAI -asennuksesi kanssa.
- **Mallin käyttöönoton tulee tukea Responses API:a.** Käytä käyttöönottoa, kuten `gpt-4.1-mini`, `gpt-4.1` tai `gpt-5.x` -mallia. Vanhemmat mallit tukevat Responses-ydintoimintoja, mutta eivät kaikkia ominaisuuksia.
- **Agent-frameworkin versio.** Näytteet on kohdistettu uusimpaan MAF-versioon (`>=1.10.0`). Kanoninen agentin luontikutsu on `client.as_agent(...)`; API:t on validoitu kehysdokumentaation ja asennetun buildin perusteella. Jos käytät eri versiota, tarkista metodin saatavuus (`as_agent` vs `create_agent`).
- **Oppitunti 08 työnkulku-notebook 04** säilyttää tarkoituksella `AzureAIAgentClient` -luokan (`agent-framework-azure-ai`), koska se käyttää Microsoft Foundry Agent Service -palvelun työkaluja (Bing grounding, koodintulkki); se perustuu jo Responses-rajapintaan.
- **.NET:n oletuskäyttöönotto.** Kaksi Oppitunti 08 dotNET-työnkulkunäytettä kovakoodasivat aiemmin tietyn mallin; nyt ne käyttävät oletuksena `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Jos näyte käyttää multimodaalista/visuaalista syötettä, aseta `AZURE_OPENAI_DEPLOYMENT` sopivaan malliin.
- **Foundry Local** tarjoaa OpenAI-yhteensopivan **Chat Completions** -päätepisteen, ja on tarkoitettu paikalliseen kehitykseen; käytä Azure OpenAI:ta / Microsoft Foundrya saadaksesi täydet Responses API -ominaisuudet.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->