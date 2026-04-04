[![Kuinka suunnitella hyviä tekoälyagentteja](../../../translated_images/fi/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Napsauta ylläolevaa kuvaa katsoaksesi tämän oppitunnin videon)_
# AI-agenttien suunnitteluperiaatteet

## Johdanto

On monia tapoja ajatella agenttisten tekoälyjärjestelmien rakentamista. Koska epäselvyys on ominaisuus eikä virhe generatiivisen tekoälyn suunnittelussa, insinööreille voi joskus olla vaikeaa tietää, mistä edes aloittaa. Olemme luoneet joukko ihmiskeskeisiä käyttökokemuksen suunnitteluperiaatteita, jotka mahdollistavat kehittäjien rakentaa asiakaskeskeisiä agenttijärjestelmiä liiketoimintatarpeidensa ratkaisemiseksi. Nämä suunnitteluperiaatteet eivät ole määräilevä arkkitehtuuri, vaan lähtökohta tiimeille, jotka määrittelevät ja rakentavat agenttikokemuksia.

Yleisesti ottaen agenttien pitäisi:

- Laajentaa ja skaalata inhimillisiä kykyjä (ideointi, ongelmanratkaisu, automaatio jne.)
- Täyttää tietovajeita (tuoda minut ajan tasalle tietämysalueilla, käännökset jne.)
- Mahdollistaa ja tukea yhteistyötä tavoilla, joilla yksilöinä haluamme työskennellä muiden kanssa
- Tehdä meistä parempia versioita itsestämme (esim. elämänohjaaja/tehtävien käskijä, auttaen oppimaan tunnesäätelyn ja tietoisuustaitoja, rakentamaan resilienssiä jne.)

## Tämä oppitunti käsittelee

- Mitä agenttisen suunnittelun periaatteet ovat
- Mitä ohjeita noudattaa näitä suunnitteluperiaatteita toteutettaessa
- Joitakin esimerkkejä suunnitteluperiaatteiden käytöstä

## Oppimistavoitteet

Oppitunnin suorittamisen jälkeen osaat:

1. Selittää, mitä agenttisen suunnittelun periaatteet ovat
2. Selittää ohjeet agenttisen suunnittelun periaatteiden käyttämiseen
3. Ymmärtää, miten rakentaa agentti käyttäen agenttisen suunnittelun periaatteita

## Agenttisen suunnittelun periaatteet

![Agenttisen suunnittelun periaatteet](../../../translated_images/fi/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agentti (tila)

Tämä on ympäristö, jossa agentti toimii. Nämä periaatteet ohjaavat, miten suunnittelemme agentteja osallistumaan fyysisiin ja digitaalisiin maailmoihin.

- **Yhdistäminen, ei korvaaminen** – auta yhdistämään ihmiset toisiin ihmisiin, tapahtumiin ja toiminnalliseen tietoon yhteistyön ja yhteyksien mahdollistamiseksi.
- Agentit auttavat yhdistämään tapahtumia, tietoa ja ihmisiä.
- Agentit tuovat ihmisiä lähemmäs toisiaan. Niitä ei ole suunniteltu korvaamaan tai vähättelemään ihmisiä.
- **Helposti saatavilla mutta ajoittain näkymätön** – agentti toimii suurelta osin taustalla ja huomauttaa meitä vain silloin, kun se on merkityksellistä ja sopivaa.
  - Agentti on helposti löydettävissä ja saatavilla valtuutetuille käyttäjille millä tahansa laitteella tai alustalla.
  - Agentti tukee multimodaalisia syötteitä ja tulosteita (ääni, puhe, teksti jne.).
  - Agentti voi saumattomasti siirtyä etualan ja taustakäytön välillä; proaktiivisen ja reaktiivisen välillä riippuen sen havaitsemista käyttäjän tarpeista.
  - Agentti voi toimia näkymättömässä muodossa, mutta sen taustaprosessin polku ja yhteistyö muiden agenttien kanssa ovat käyttäjän kannalta läpinäkyviä ja hallittavissa.

### Agentti (aika)

Tämä kuvaa, miten agentti toimii ajan kuluessa. Nämä periaatteet ohjaavat agenttien suunnittelua, jotka vuorovaikuttavat menneisyyden, nykyisyyden ja tulevaisuuden kanssa.

- **Menneisyys**: Heijastelua historiasta, joka sisältää sekä tilan että kontekstin.
  - Agentti tarjoaa relevantimpia tuloksia analysoimalla rikkaampia historiallisia tietoja pelkän tapahtuman, ihmisten tai tilojen sijaan.
  - Agentti luo yhteyksiä menneistä tapahtumista ja peilaa muistia aktiivisesti osallistuakseen nykytilanteisiin.
- **Nyt**: Kehoittaa enemmän kuin ilmoittaa.
  - Agentti edustaa kokonaisvaltaista lähestymistapaa ihmisten kanssa vuorovaikutukseen. Kun tapahtuma tapahtuu, agentti ylittää staattisen ilmoituksen tai muun muodollisuuden. Agentti voi yksinkertaistaa kulkuja tai dynaamisesti luoda vihjeitä ohjatakseen käyttäjän huomion oikeaan aikaan.
  - Agentti toimittaa tietoa kontekstuaalisen ympäristön, sosiaalisten ja kulttuuristen muutosten sekä käyttäjän tarkoituksen mukaisesti.
  - Agentin vuorovaikutus voi olla asteittaista, kehittyvää/monimutkaistuvaa voimaannuttaakseen käyttäjiä pitkällä aikavälillä.
- **Tulevaisuus**: Sopeutuminen ja kehittyminen.
  - Agentti sopeutuu erilaisiin laitteisiin, alustoihin ja modaliteetteihin.
  - Agentti mukautuu käyttäjän käyttäytymiseen, saavutettavuustarpeisiin ja on vapaasti muokattavissa.
  - Agentti muotoutuu ja kehittyy jatkuvan käyttäjävuorovaikutuksen kautta.

### Agentti (ydin)

Nämä ovat agentin suunnittelun ydinosa-alueita.

- **Hyväksy epävarmuus mutta rakenna luottamus**.
  - Tietty epävarmuuden taso agentissa on odotettavissa. Epävarmuus on keskeinen osa agentin suunnittelua.
  - Luottamus ja läpinäkyvyys ovat agentin suunnittelun perustavia kerroksia.
  - Ihmiset hallitsevat, milloin agentti on päällä/pois, ja agentin tila on selvästi nähtävissä koko ajan.

## Ohjeet näiden periaatteiden toteuttamiseksi

Kun käytät edellä mainittuja suunnitteluperiaatteita, noudata seuraavia ohjeita:

1. **Läpinäkyvyys**: Ilmoita käyttäjälle, että tekoäly on mukana, miten se toimii (mukaan lukien aiemmat toimet) ja miten antaa palautetta ja muokata järjestelmää.
2. **Hallinta**: Mahdollista käyttäjän mukauttaa, määrittää mieltymyksiä ja personoida sekä hallita järjestelmää ja sen ominaisuuksia (mukaan lukien mahdollisuus unohtaa).
3. **Johdonmukaisuus**: Tavoittele johdonmukaisia, monimodaalisia kokemuksia laitteiden ja päätelaitteiden välillä. Käytä mahdollisuuksien mukaan tuttuja UI/UX-elementtejä (esim. mikrofonikuvake puhevuorovaikutusta varten) ja vähennä asiakkaan kognitiivista kuormitusta mahdollisimman paljon (esim. pyri ytimekkäisiin vastauksiin, visuaalisiin apuihin ja Lisätietoja-sisältöön).

## Miten suunnitella matkatoimistoagentti käyttäen näitä periaatteita ja ohjeita

Kuvittele, että suunnittelet Matka-agenttia; näin voit ajatella suunnitteluperiaatteiden ja ohjeiden soveltamista:

1. **Läpinäkyvyys** – Kerro käyttäjälle, että Matka-agentti on tekoälyllä varustettu agentti. Tarjoa perustason ohjeet aloittamiseen (esim. tervehdysviesti, esimerkkikehotteita). Dokumentoi tämä selkeästi tuotesivulla. Näytä luettelo kehotteista, joita käyttäjä on pyytänyt aiemmin. Kerro selkeästi, miten antaa palautetta (peukku ylös ja alas, Send Feedback -painike jne.). Ilmoita selkeästi, onko agentilla käytön tai aiheiden rajoituksia.
2. **Hallinta** – Varmista, että on selvää, miten käyttäjä voi muokata agenttia sen luomisen jälkeen esimerkiksi System Promptin kaltaisilla asetuksilla. Mahdollista käyttäjän valita, kuinka sanallinen agentin tulee olla, sen kirjoitustyyli ja mitkäkin rajoitukset siitä, mistä agentti ei saa keskustella. Salli käyttäjän tarkastella ja poistaa kaikki siihen liittyvät tiedostot tai tiedot, kehotteet ja aiemmat keskustelut.
3. **Johdonmukaisuus** – Varmista, että kuvakkeet kuten Share Prompt, tiedoston tai valokuvan lisääminen sekä jonkun merkitseminen ovat standardoituja ja tunnistettavia. Käytä paperiliitin-kuvaketta ilmaistaaksesi tiedoston latauksen/jakamisen agentin kanssa ja kuva-kuvaketta ilmaistaaksesi grafiikan latauksen.

## Esimerkkikoodit

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Onko sinulla lisää kysymyksiä AI-agenttien suunnittelumalleista?

Liity [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) -kanavalle tapaamaan muita oppijoita, osallistumaan office hourseihin ja saamaan vastauksia AI-agentteja koskeviin kysymyksiisi.

## Lisäresurssit

- <a href="https://openai.com" target="_blank">Agenttisten tekoälyjärjestelmien hallinnan käytännöt | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">HAX Toolkit Project - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Responsible AI Toolbox</a>

## Edellinen oppitunti

[Exploring Agentic Frameworks](../02-explore-agentic-frameworks/README.md)

## Seuraava oppitunti

[Tool Use Design Pattern](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Vastuuvapauslauseke:
Tämä asiakirja on käännetty käyttämällä tekoälykäännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta huomioithan, että automaattikäännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja alkuperäisellä kielellään on pidettävä ensisijaisena lähteenä. Kriittisten tietojen osalta suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä johtuvista väärinymmärryksistä tai virheellisistä tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->