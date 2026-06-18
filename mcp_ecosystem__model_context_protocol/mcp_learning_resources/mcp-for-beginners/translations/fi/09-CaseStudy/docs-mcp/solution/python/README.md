# Opintosuunnitelman generaattori Chainlitillä & Microsoft Learn Docs MCP:llä

## Vaatimukset

- Python 3.8 tai uudempi
- pip (Python-paketinhallinta)
- Internet-yhteys Microsoft Learn Docs MCP -palvelimeen yhdistämistä varten

## Asennus

1. Kloonaa tämä repositorio tai lataa projektin tiedostot.
2. Asenna vaaditut riippuvuudet:

   ```bash
   pip install -r requirements.txt
   ```

## Käyttö

### Tapaus 1: Yksinkertainen kysely Docs MCP:lle
Komentoriviasiakas, joka yhdistää Docs MCP -palvelimeen, lähettää kyselyn ja tulostaa tuloksen.

1. Suorita skripti:
   ```bash
   python scenario1.py
   ```
2. Kirjoita dokumentaatiokysymyksesi kehotteeseen.

### Tapaus 2: Opintosuunnitelman generaattori (Chainlit-verkkosovellus)
Selainpohjainen käyttöliittymä (Chainlitillä), joka mahdollistaa käyttäjien luoda henkilökohtaisen, viikoittain etenevän opintosuunnitelman mille tahansa tekniselle aiheelle.

1. Käynnistä Chainlit-sovellus:
   ```bash
   chainlit run scenario2.py
   ```
2. Avaa terminaalissa annettu paikallinen URL-osoite (esim. http://localhost:8000) selaimessasi.
3. Kirjoita chat-ikkunaan opiskeluaiheesi ja opiskeluviikkojen määrä (esim. "AI-900 sertifiointi, 8 viikkoa").
4. Sovellus vastaa viikkoa kohden jaetulla opintosuunnitelmalla, sisältäen linkkejä asiaankuuluviin Microsoft Learn -dokumentaatioihin.

**Vaaditut ympäristömuuttujat:**

Käyttääksesi Tapausta 2 (Chainlit-verkkosovellus ja Azure OpenAI), sinun tulee asettaa seuraavat ympäristömuuttujat `.env`-tiedostoon `python`-hakemistossa:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Täytä nämä tiedot Azure OpenAI -resurssisi tiedoilla ennen sovelluksen ajamista.

> [!TIP]
> Voit helposti ottaa omia mallejasi käyttöön käyttämällä [Microsoft Foundry](https://ai.azure.com/).

### Tapaus 3: Docs MCP -palvelin suoraan VS Codessa

Sen sijaan, että vaihtaisit selainvälilehtiä dokumentaation etsimiseksi, voit tuoda Microsoft Learn Docsin suoraan VS Code -editoriin MCP-palvelimen avulla. Tämä mahdollistaa:
- Dokumentaation etsimisen ja lukemisen VS Codessa ilman, että sinun tarvitsee poistua koodausympäristöstä.
- Dokumentaation viittausten lisäämisen ja linkkien upottamisen suoraan README- tai kurssitiedostoihin.
- GitHub Copilotin ja MCP:n käytön yhdessä saumattomaan, tekoälyä hyödyntävään dokumentaatioiden työstöön.

**Esimerkkitapauksia:**
- Lisää nopeasti viittauslinkkejä README-tiedostoon kirjoittaessasi kurssi- tai projektidokumentaatiota.
- Käytä Copilotia koodin generoimiseen ja MCP:tä löytämään ja viittaamaan olennaisiin dokumentaatioihin välittömästi.
- Pysy keskittyneenä editorissasi ja paranna tuottavuutta.

> [!IMPORTANT]
> Varmista, että sinulla on voimassa oleva [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) -konfiguraatio työtilassasi (sijainti on `.vscode/mcp.json`).

## Miksi käyttää Chainlitia Tapaus 2:ssa?

Chainlit on moderni avoimen lähdekoodin kehys keskustelupohjaisten verkkosovellusten rakentamiseen. Sen avulla on helppo luoda chat-pohjaisia käyttöliittymiä, jotka yhdistävät taustapalveluihin kuten Microsoft Learn Docs MCP -palvelimeen. Tämä projekti käyttää Chainlitia tarjotakseen yksinkertaisen, interaktiivisen tavan luoda henkilökohtaisia opintosuunnitelmia reaaliajassa. Chainlitin avulla voit nopeasti rakentaa ja ottaa käyttöön chat-pohjaisia työkaluja, jotka edistävät tuottavuutta ja oppimista.

## Mitä tämä tekee

Tämä sovellus mahdollistaa käyttäjien luoda henkilökohtainen opintosuunnitelma syöttämällä vain aiheen ja keston. Sovellus analysoi syötteesi, kysyy Microsoft Learn Docs MCP -palvelimelta asiaankuuluvaa sisältöä ja järjestää tulokset rakenteelliseen, viikoittain etenevään suunnitelmaan. Jokaisen viikon suositukset näytetään chatissa, mikä helpottaa etenemisen seuraamista. Integraatio varmistaa, että saat aina uusimmat ja merkityksellisimmät oppimateriaalit.

## Esimerkkikyselyt

Kokeile näitä kyselyjä chat-ikkunassa nähdäksesi, miten sovellus vastaa:

- `AI-900 sertifiointi, 8 viikkoa`
- `Opiskele Azure Functions, 4 viikkoa`
- `Azure DevOps, 6 viikkoa`
- `Data engineering Azurella, 10 viikkoa`
- `Microsoftin tietoturvan perusteet, 5 viikkoa`
- `Power Platform, 7 viikkoa`
- `Azure AI -palvelut, 12 viikkoa`
- `Pilviarkkitehtuuri, 9 viikkoa`

Nämä esimerkit osoittavat sovelluksen joustavuuden erilaisiin oppimistavoitteisiin ja aikatauluihin.

## Viitteet

- [Chainlit-dokumentaatio](https://docs.chainlit.io/)
- [MCP-dokumentaatio](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->