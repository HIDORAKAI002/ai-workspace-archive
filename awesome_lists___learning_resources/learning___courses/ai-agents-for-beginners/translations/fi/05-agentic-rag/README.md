[![Agentic RAG](../../../translated_images/fi/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Napsauta yllä olevaa kuvaa nähdäksesi videon tästä oppitunnista)_

# Agentic RAG

Tämä oppitunti tarjoaa kokonaisvaltaisen yleiskatsauksen Agentic Retrieval-Augmented Generationista (Agentic RAG), uudesta tekoälyparadigmasta, jossa suuret kielimallit (LLM) suunnittelevat itsenäisesti seuraavia askeleitaan samalla kun ne hakevat tietoa ulkoisista lähteistä. Toisin kuin staattiset hakemista ja sitten lukemista seuraavat mallit, Agentic RAG sisältää iteratiivisia kutsuja LLM:lle työkalu- tai funktiokutsujen välissä ja rakenteellisia tulosteita. Järjestelmä arvioi tulokset, tarkentaa kyselyjä, kutsuu tarvittaessa lisätyökaluja ja jatkaa tätä sykliä, kunnes tyydyttävä ratkaisu on saavutettu.

## Johdanto

Tämä oppitunti kattaa

- **Agentic RAG:n ymmärtäminen:** Opit tuntemaan tekoälyn uuden paradigman, jossa suuret kielimallit suunnittelevat itsenäisesti seuraavat askeleensa samalla kun ne hakevat tietoa ulkoisista tietolähteistä.
- **Iteratiivisen Maker-Checker-tyylin hallinta:** Ymmärrät iteratiivisten LLM-kutsujen silmukan, johon on kytketty työkalu- tai funktiokutsuja ja rakenteellisia tulosteita, joiden tarkoituksena on parantaa oikeellisuutta ja käsitellä virheellisiä kyselyjä.
- **Käytännön sovellusten tutkiminen:** Tunnistat tilanteet, joissa Agentic RAG loistaa, kuten oikeellisuuteen painottuvissa ympäristöissä, monimutkaisissa tietokantaintegraatioissa ja laajemmissa työnkuluissa.

## Oppimistavoitteet

Oppitunnin suoritettuasi osaat/ymmärrät:

- **Agentic RAG:n ymmärtäminen:** Opit tekoälyn uuden paradigman, jossa suuret kielimallit suunnittelevat itsenäisesti seuraavat askeleensa samalla kun ne hakevat tietoa ulkoisista tietolähteistä.
- **Iteratiivinen Maker-Checker-tyyli:** Hallitset idean, jossa on iteratiivisten LLM-kutsujen silmukka, johon sisältyy työkalu- tai funktiokutsuja ja rakenteellisia tulosteita, jotka on suunniteltu parantamaan oikeellisuutta ja käsittelemään virheellisiä kyselyjä.
- **Päättelyprosessin hallinta:** Ymmärrät järjestelmän kyvyn omistaa päättelyprosessinsa, tehdä päätöksiä ongelmien lähestymistavasta ilman ennalta määriteltyjä polkuja.
- **Työnkulku:** Ymmärrät, miten agenttimalli itsenäisesti päättää hakea markkinatrendiraportteja, tunnistaa kilpailijatiedot, korreloida sisäisiä myyntimittareita, yhdistää löydökset ja arvioida strategiaa.
- **Iteratiiviset silmukat, työkalujen integrointi ja muisti:** Opit järjestelmän nojaavan silmukkamalliseen vuorovaikutukseen, joka ylläpitää tilaa ja muistia vaiheiden välillä välttääkseen toistuvat silmukat ja tehdäkseen harkittuja päätöksiä.
- **Virhetilanteiden käsittely ja itsekorjaus:** Tutkit järjestelmän vahvoja itsekorjausmekanismeja, mukaan lukien iterointi ja uudelleenkyselyt, diagnostiikkatyökalujen käyttö ja ihmisen valvontaan tukeutuminen.
- **Agenttisuuden rajat:** Ymmärrät Agentic RAG:n rajoitteet, keskittyen toimialakohtaiseen autonomiaan, infrastruktuuririippuvuuteen ja valvontasääntöjen kunnioittamiseen.
- **Käytännön käyttötapaukset ja arvon tuotto:** Tunnistat tilanteet, joissa Agentic RAG on erityisen hyödyllinen, kuten oikeellisuuteen painottuvissa ympäristöissä, monimutkaisissa tietokantaintegraatioissa ja laajemmissa työnkuluissa.
- **Hallinnointi, läpinäkyvyys ja luottamus:** Opit hallinnon ja läpinäkyvyyden tärkeydestä, mukaan lukien selitettävä päättely, puolueettomuuden hallinta ja ihmisen valvonta.

## Mikä on Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) on uusi tekoälyparadigma, jossa suuret kielimallit (LLM) suunnittelevat itsenäisesti seuraavat askeleensa samalla kun ne hakevat tietoa ulkoisista lähteistä. Toisin kuin staattiset hakemista ja sitten lukemista seuraavat mallit, Agentic RAG sisältää iteratiivisia LLM-kutsuja, jotka vuorottelevat työkalu- tai funktiokutsujen ja rakenteellisten tulosteiden kanssa. Järjestelmä arvioi saadut tulokset, tarkentaa kyselyjä, kutsuu tarvittaessa lisätyökaluja ja jatkaa tätä sykliä, kunnes saadaan tyydyttävä ratkaisu. Tämä iteratiivinen ”maker-checker” -tyyli parantaa oikeellisuutta, käsittelee virheellisiä kyselyjä ja varmistaa korkealaatuiset tulokset.

Järjestelmä omistaa aktiivisesti päättelyprosessinsa, kirjoittaa uudelleen epäonnistuneet kyselyt, valitsee erilaisia hakumenetelmiä ja integroi useita työkaluja — kuten vektorihakua Azure AI Searchissa, SQL-tietokantoja tai räätälöityjä API-rajapintoja — ennen vastauksen lopullista muotoilua. Agenttijärjestelmän erottaava ominaisuus on kyky omistaa päättelyprosessinsa. Perinteiset RAG-ratkaisut luottavat ennalta määriteltyihin polkuihin, mutta agenttijärjestelmä määrittelee itsenäisesti vaiheiden järjestyksen löydetyn tiedon laadun perusteella.

## Agentic Retrieval-Augmented Generationin (Agentic RAG) määrittely

Agentic Retrieval-Augmented Generation (Agentic RAG) on uusi tekoälyn kehitysparadigma, jossa suurikokoiset kielimallit eivät vain hae tietoa ulkoisista tietolähteistä, vaan myös suunnittelevat itsenäisesti seuraavat askeleensa. Toisin kuin staattiset hakemista ja sitten lukemista seuraavat kuviot tai huolellisesti skriptatut kehotteet, Agentic RAG sisältää iteratiivisten LLM-kutsujen silmukan, johon sisältyy työkalu- tai funktiokutsuja ja rakenteellisia tulosteita. Joka kierroksella järjestelmä arvioi saatuja tuloksia, päättää, pitääkö kyselyjä tarkentaa, kutsuu lisätyökaluja tarvittaessa ja jatkaa tätä sykliä, kunnes tyydyttävä ratkaisu saavutetaan.

Tämä iteratiivinen ”maker-checker” -tyylinen toiminta on suunniteltu parantamaan oikeellisuutta, käsittelemään virheellisiä kyselyjä rakenteellisiin tietokantoihin (kuten NL2SQL) ja varmistamaan tasapainoiset, korkealaatuiset tulokset. Sen sijaan, että luotettaisiin pelkästään huolellisesti laadittuihin kehotteisiin, järjestelmä omistaa aktiivisesti päättelyprosessinsa. Se voi kirjoittaa uudelleen epäonnistuneet kyselyt, valita erilaisia hakutapoja ja yhdistää useita työkaluja — kuten vektorihaku Azure AI Searchissa, SQL-tietokantoja tai räätälöityjä API-rajapintoja — ennen vastauksen lopullista tuottoa. Tämä poistaa tarpeen monimutkaisille orkestrointikehyksille. Sen sijaan suhteellisen yksinkertainen silmukka ”LLM-kutsu → työkalun käyttö → LLM-kutsu → …” voi tuottaa edistyneitä ja hyvin perusteltuja tuloksia.

![Agentic RAG Core Loop](../../../translated_images/fi/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Päättelyprosessin omistaminen

Erottava ominaisuus, joka tekee järjestelmästä ”agenttisen”, on sen kyky omistaa päättelyprosessinsa. Perinteiset RAG-toteutukset usein riippuvat ihmisistä, jotka määrittelevät mallille ennalta polun: ajatteluketjun, joka kuvaa, mitä haetaan ja milloin.
Mutta kun järjestelmä on todella agenttinen, se päättää sisäisesti, miten ongelmaan lähestytään. Se ei vain suorita skriptiä; se määrittää itsenäisesti askelien järjestyksen löydetyn tiedon laadun perusteella.
Esimerkiksi jos siltä pyydetään luomaan tuotteen lanseerausstrategia, se ei nojaa pelkästään kehotteeseen, joka kuvaa koko tutkimus- ja päätöksentekoprosessin. Sen sijaan agenttinen malli päättää itsenäisesti:

1. Hakea ajantasaiset markkinatrendiraportit käyttäen Bing Web Groundingia
2. Tunnistaa relevantit kilpailijatiedot käyttäen Azure AI Searchia
3. Korreloida historiallisia sisäisiä myyntimittareita käyttäen Azure SQL Databasea
4. Yhdistää löydökset yhtenäiseksi strategiaksi Azure OpenAI Servicea hyödyntäen
5. Arvioida strategia aukkojen tai ristiriitojen varalta ja tarvittaessa käynnistää toinen hakukierros.
Kaikki nämä vaiheet — kyselyjen tarkentaminen, lähteiden valinta, iterointi kunnes vastaus on ”tyydyttävä” — päätetään mallin toimesta, ei ihmisen ennalta skriptaamina.

## Iteratiiviset silmukat, työkalujen integrointi ja muisti

![Tool Integration Architecture](../../../translated_images/fi/tool-integration.0f569710b5c17c10.webp)

Agenttinen järjestelmä perustuu silmukkamalliseen vuorovaikutukseen:

- **Alkukutsu:** Käyttäjän tavoite (eli käyttäjän kehotus) esitetään LLM:lle.
- **Työkalujen kutsuminen:** Jos malli tunnistaa puuttuvaa tietoa tai epäselviä ohjeita, se valitsee työkalun tai hakumenetelmän — kuten vektoritietokantakyselyn (esim. Azure AI Search Hybrid -haku yksityisille datoille) tai rakenteellisen SQL-kutsun — kerätäkseen lisäkontekstia.
- **Arviointi ja tarkentaminen:** Saatuaan tietoja malli arvioi, onko tieto riittävä. Jos ei, se tarkentaa kyselyä, kokeilee eri työkalua tai muuttaa lähestymistapaansa.
- **Toistaminen, kunnes tyydyttävä:** Tätä sykliä jatketaan, kunnes malli katsoo, että sillä on tarpeeksi selkeyttä ja näyttöä antaakseen lopullisen, hyvin perustellun vastauksen.
- **Muisti ja tila:** Koska järjestelmä ylläpitää tilaa ja muistia vaiheiden välillä, se voi muistaa aiemmat yritykset ja niiden tulokset, välttäen toistuvia silmukoita ja tehdessään harkitumpia päätöksiä eteenpäin mentäessä.

Ajan myötä tämä luo kehittyvän ymmärryksen, jonka avulla malli voi navigoida monimutkaisissa, monivaiheisissa tehtävissä ilman, että ihmisen tarvitsee jatkuvasti puuttua peliin tai muokata kehotetta.

## Virhetilanteiden käsittely ja itsekorjaus

Agentic RAG:n autonomiaan kuuluvat myös vahvat itsekorjausmekanismit. Kun järjestelmä kohtaa umpikujaan, kuten epäolennaisten dokumenttien haun tai virheelliset kyselyt, se voi:

- **Iteroida ja uudelleenhakea:** Palauttamisen sijaan vähäarvoisia vastauksia malli kokeilee uusia hakustrategioita, kirjoittaa uudelleen tietokantakyselyt tai etsii vaihtoehtoisia aineistoja.
- **Käyttää diagnostiikkatyökaluja:** Järjestelmä voi kutsua lisätoimintoja, jotka auttavat virheiden jäljityksessä tai haettujen tietojen oikeellisuuden varmistamisessa. Työkaluja, kuten Azure AI Tracing, on tärkeää käyttää, jotta vahva valvonta ja havainnointi onnistuvat.
- **Tukeutua ihmisen valvontaan:** Korkean panoksen tai toistuvasti epäonnistuvissa tilanteissa malli saattaa ilmoittaa epävarmuudesta ja pyytää ihmisen ohjausta. Kun ihminen antaa korjaavaa palautetta, malli voi sisäistää oppimansa jatkokäyttöä varten.

Tämä iteratiivinen ja dynaaminen lähestymistapa mahdollistaa mallille jatkuvan parantumisen, varmistaen, että se ei ole vain kertakäyttöinen järjestelmä, vaan oppiva järjestelmä, joka oppii virheistään kulloisenkin istunnon aikana.

![Self Correction Mechanism](../../../translated_images/fi/self-correction.da87f3783b7f174b.webp)

## Agenttisuuden rajat

Vaikka Agentic RAG toimii tehtävän sisällä itsenäisesti, se ei vastaa yleisälykkyyttä (Artificial General Intelligence). Sen ”agenttiset” kyvyt rajoittuvat ihmisten kehittämiin työkaluihin, tietolähteisiin ja toimintaperiaatteisiin. Se ei voi keksiä omia työkalujaan tai toimia rajojen ulkopuolella. Sen sijaan se loistaa hallinnoimalla dynaamisesti käytettävissä olevia resursseja.
Keskeisiä eroavaisuuksia kehittyneempiin tekoälymuotoihin ovat:

1. **Toimialakohtainen autonomia:** Agentic RAG -järjestelmät keskittyvät saavuttamaan käyttäjän määrittelemiä tavoitteita tunnetussa toimialassa, käyttämällä strategioita kuten kyselyjen uudelleenkirjoitus tai työkalujen valinta tulosten parantamiseksi.
2. **Infrastruktuuririippuvuus:** Järjestelmän kyvyt perustuvat kehittäjien integroimiin työkaluihin ja tietoihin. Se ei voi ylittää näitä rajoja ilman ihmisen puuttumista.
3. **Valvontasääntöjen kunnioitus:** Eettiset ohjeet, sääntelyvaatimukset ja liiketoimintapolitiikat ovat erittäin tärkeitä. Agentin vapaus on aina sidottu turvallisuustoimiin ja valvontamekanismeihin (toivottavasti).

## Käytännön käyttötapaukset ja arvo

Agentic RAG loistaa tilanteissa, joissa tarvitaan iteratiivista tarkennusta ja tarkkuutta:

1. **Oikeellisuuteen painottuvat ympäristöt:** Vaatimustenmukaisuustarkastuksissa, sääntelyanalyysissä tai oikeudellisessa tutkimuksessa agenttimalli voi toistuvasti varmistaa faktat, konsultoida useita lähteitä ja kirjoittaa kyselyjä uudelleen, kunnes vastaukset on perusteellisesti validoitu.
2. **Monimutkaiset tietokantaintegraatiot:** Kun käsitellään rakenteellista dataa, jossa kyselyt voivat usein epäonnistua tai vaatia säätöä, järjestelmä voi itsenäisesti hioa kyselyitään Azure SQL:n tai Microsoft Fabric OneLaken avulla varmistaen, että lopullinen haku vastaa käyttäjän tarkoitusta.
3. **Laajennetut työnkulut:** Pidemmät istunnot voivat kehittyä uusien tietojen ilmaantuessa. Agentic RAG voi jatkuvasti sisällyttää uutta dataa, muuttaen strategioita oppiessaan lisää ongelmasta.

## Hallinnointi, läpinäkyvyys ja luottamus

Näiden järjestelmien itsenäistymisen myötä hallinnointi ja läpinäkyvyys ovat ratkaisevia:

- **Selitettävä päättely:** Malli voi tarjota auditointijäljen tekemiensä kyselyjen, konsultoitujen lähteiden ja päättelyaskelten osalta, jotka se käytti johtopäätökseen pääsemiseksi. Työkalut, kuten Azure AI Content Safety ja Azure AI Tracing / GenAIOps, voivat auttaa ylläpitämään läpinäkyvyyttä ja vähentämään riskejä.
- **Harhaisuuden hallinta ja tasapainoinen haku:** Kehittäjät voivat säätää hakustrategioita varmistaakseen, että tiedonlähteet ovat tasapainoisia ja edustavia, sekä suorittaa säännöllisiä auditointeja puolueellisuuden ja vinoutuneiden kuvioiden havaitsemiseksi käyttäen räätälöityjä malleja edistyneille data science -organisaatioille Azure Machine Learningin avulla.
- **Ihmisen valvonta ja vaatimustenmukaisuus:** Herkissä tehtävissä ihmisen arviointi on edelleen välttämätöntä. Agentic RAG ei korvaa ihmisen arvostelukykyä suuren panoksen päätöksissä — se täydentää sitä tarjoamalla perusteellisesti validoituja vaihtoehtoja.

On välttämätöntä, että käytössä on työkalut, jotka tarjoavat selkeän toimintalokin. Ilman niitä monivaiheisen prosessin virheenkorjaus voi olla erittäin vaikeaa. Katso seuraava esimerkki Literal AI:ltä (Chainlitin takana oleva yritys) agentin suorituksesta:

![AgentRunExample](../../../translated_images/fi/AgentRunExample.471a94bc40cbdc0c.webp)

## Yhteenveto

Agentic RAG edustaa luonnollista kehitystä siinä, miten tekoälyjärjestelmät käsittelevät monimutkaisia, datarikkaita tehtäviä. Ottamalla käyttöön silmukkamallisen vuorovaikutuksen, itsenäisesti valiten työkaluja ja tarkentamalla kyselyjä, kunnes saavutetaan korkealaatuinen tulos, järjestelmä siirtyy staattisesta kehotteiden seuraamisesta kohti adaptiivisempaa, kontekstia ymmärtävää päätöksentekijää. Ihmisten määrittämien infrastruktuurien ja eettisten ohjeiden rajoissa nämä agenttikyvyt mahdollistavat rikkaampia, dynaamisempia ja lopulta hyödyllisempiä tekoälyvuorovaikutuksia sekä yrityksille että loppukäyttäjille.

### Haluatko lisäkysymyksiä Agentic RAG:sta?

Liity [Microsoft Foundry Discordiin](https://aka.ms/ai-agents/discord) tapaamaan muita oppijoita, osallistumaan toimistoaikoihin ja saamaan vastauksia AI Agents -kysymyksiisi.

## Lisäresurssit
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Hanki RAG-ratkaisu käyttöön Azure OpenAI -palvelun avulla: Opi käyttämään omia tietojasi Azure OpenAI -palvelussa. Tämä Microsoft Learn -moduuli tarjoaa kattavan oppaan RAG:n toteuttamiseen</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Generatiivisten tekoälysovellusten arviointi Microsoft Foundrylla: Tässä artikkelissa käsitellään mallien arviointia ja vertailua julkisilla tietojoukoilla, mukaan lukien agenttipohjaiset tekoälysovellukset ja RAG-arkkitehtuurit</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Mikä on Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Täydellinen opas agenttipohjaiseen Retrieval Augmented Generationiin – Uutisia generatiivisesta RAG:sta</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: tehosta RAG:tasi kyselymuokkauksella ja itsehakemisella! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Agenttipohjaisten kerrosten lisääminen RAG:iin</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Tulevaisuuden tietoavustajat: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Kuinka rakentaa agenttipohjaiset RAG-järjestelmät</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Microsoft Foundry Agent -palvelun käyttö tekoälyagenttien skaalaamiseen</a>

### Akateemiset artikkelit

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iteratiivinen hienosäätö itsepalautteen avulla</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Kielelliset agentit verbaalisella vahvistusoppimisella</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Suuret kielimallit voivat itsekorjata työkalu-interaktiivisella kritiikillä</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agenttipohjainen Retrieval-Augmented Generation: Katsaus Agentic RAG:iin</a>

## Edellinen oppitunti

[Työkalujen käyttötapa](../04-tool-use/README.md)

## Seuraava oppitunti

[Luotettavien tekoälyagenttien rakentaminen](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Pyrimme tarkkuuteen, mutta ota huomioon, että automaattikäännöksissä saattaa esiintyä virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen omalla kielellä on virallinen lähde. Tärkeiden tietojen osalta suositellaan ammattilaisen tekemää ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käyttämisestä aiheutuvista väärinkäsityksistä tai virhetulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->