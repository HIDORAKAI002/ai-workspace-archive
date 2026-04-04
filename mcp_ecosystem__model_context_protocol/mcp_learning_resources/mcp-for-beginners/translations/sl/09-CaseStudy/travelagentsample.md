# Študija primera: Azure AI potovalni agenti – referenčna implementacija

## Pregled

[Azure AI potovalni agenti](https://github.com/Azure-Samples/azure-ai-travel-agents) so obsežna referenčna rešitev, ki jo je razvil Microsoft, in prikazuje, kako zgraditi večagentno, z umetno inteligenco podprto aplikacijo za načrtovanje potovanj z uporabo Model Context Protocol (MCP), Azure OpenAI in Azure AI Search. Ta projekt prikazuje najboljše prakse za usklajevanje več AI agentov, integracijo podatkov podjetja in zagotavljanje varne, razširljive platforme za resnične scenarije.

## Ključne značilnosti
- **Usklajevanje več agentov:** Uporablja MCP za koordinacijo specializiranih agentov (npr. agent za lete, hotele in itinerarje), ki sodelujejo pri izpolnjevanju zahtevnih nalog načrtovanja potovanj.
- **Integracija podatkov podjetja:** Povezuje se z Azure AI Search in drugimi viri podatkov podjetja za zagotavljanje ažurnih, relevantnih informacij za priporočila glede potovanj.
- **Varna, razširljiva arhitektura:** Izrablja Azure storitve za preverjanje pristnosti, pooblastila in razširljivo uvajanje, sledenje najboljšim varnostnim praksam podjetij.
- **Razširljiva orodja:** Implementira ponovno uporabna MCP orodja in predloge pozivov, kar omogoča hitro prilagajanje novim domenam ali poslovnim zahtevam.
- **Uporabniška izkušnja:** Zagotavlja pogovorni vmesnik za interakcijo uporabnikov z agenti za potovanja, ki ga poganja Azure OpenAI in MCP.

## Arhitektura
![Arhitektura](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Opis diagrame arhitekture

Rešitev Azure AI potovalni agenti je zasnovana za modularnost, razširljivost in varno integracijo več AI agentov in virov podatkov podjetja. Glavni sestavni deli in potek podatkov so naslednji:

- **Uporabniški vmesnik:** Uporabniki komunicirajo s sistemom prek pogovornega UI (kot je spletni klepet ali bot Teams), ki pošilja uporabniške poizvedbe in prejema priporočila glede potovanj.
- **MCP strežnik:** Deluje kot osrednji koordinator, sprejema uporabniški vhod, upravlja kontekst in usklajuje ukrepe specializiranih agentov (npr. FlightAgent, HotelAgent, ItineraryAgent) preko Model Context Protocol.
- **AI agenti:** Vsak agent je odgovoren za specifično področje (leti, hoteli, itinerariji) in je implementiran kot MCP orodje. Agenti uporabljajo predloge pozivov in logiko za obdelavo zahtev in generiranje odgovorov.
- **Azure OpenAI storitev:** Omogoča napredno razumevanje in generiranje naravnega jezika, kar agentom omogoča, da interpretirajo uporabnikove namene in generirajo pogovorne odgovore.
- **Azure AI Search & podatki podjetja:** Agenti poizvedujejo Azure AI Search in druge vire podatkov podjetja za pridobitev ažurnih podatkov o letih, hotelih in možnostih potovanj.
- **Preverjanje pristnosti in varnost:** Integracija z Microsoft Entra ID za varno preverjanje pristnosti in uporaba najmanjših privilegijev za dostop do vseh virov.
- **Uvajanje:** Zasnovano za uvajanje na Azure Container Apps, kar zagotavlja razširljivost, spremljanje in operativno učinkovitost.

Ta arhitektura omogoča tekoče usklajevanje več AI agentov, varno integracijo s podatki podjetja in robustno, razširljivo platformo za gradnjo industrijsko specializiranih AI rešitev.

## Korak za korakom razlaga diagrame arhitekture
Predstavljajte si, da načrtujete veliko potovanje in imate ekipo strokovnih pomočnikov, ki vam pomagajo pri vsakem podrobnosti. Sistem Azure AI potovalni agenti deluje podobno, uporablja različne dele (kot člane ekipe), ki imajo vsak svojo posebno nalogo. Tako vse skupaj deluje:

### Uporabniški vmesnik (UI):
Pomislite na to kot na recepcijo vašega potovalnega agenta. Tam vi (uporabnik) postavite vprašanja ali zahtevate nekaj, na primer: "Najdi mi let v Pariz." To je lahko klepetalno okno na spletni strani ali aplikacija za sporočanje.

### MCP strežnik (koordinator):
MCP strežnik je kot manager, ki na recepciji posluša vašo zahtevo in odloči, kateri specialist naj obravnava posamezni del. Sledi vašemu pogovoru in poskrbi, da vse poteka gladko.

### AI agenti (strokovni pomočniki):
Vsak agent je strokovnjak na določenem področju – eden pozna vse o letih, drug o hotelih, tretji o načrtovanju itinerarija. Ko zahtevate potovanje, MCP strežnik pošlje vašo zahtevo pravim agentom. Ti agenti uporabljajo svoje znanje in orodja za iskanje najboljših možnosti za vas.

### Azure OpenAI storitev (jezikovni strokovnjak):
To je kot imeti jezikovnega strokovnjaka, ki razume natanko, kaj sprašujete, ne glede na to, kako vprašanje postavite. Pomaga agentom razumeti vaše zahteve in odgovarjati v naravnem, pogovornem jeziku.

### Azure AI Search & podatki podjetja (informacijska knjižnica):
Predstavljajte si ogromno, ažurno knjižnico z vsemi najnovejšimi informacijami o potovanjih – urniki letov, razpoložljivost hotelov in več. Agenti iščejo v tej knjižnici, da vam zagotovijo najbolj natančne odgovore.

### Preverjanje pristnosti in varnost (varnostnik):
Tako kot varnostnik preverja, kdo lahko vstopi v določena območja, ta del zagotavlja, da do občutljivih informacij dostopajo le pooblaščeni uporabniki in agenti. Varuje vaše podatke in zasebnost.

### Uvajanje na Azure Container Apps (stavba):
Vsi ti pomočniki in orodja delujejo skupaj znotraj varne, razširljive stavbe (oblaka). To pomeni, da sistem lahko hkrati podpira veliko uporabnikov in je vedno na voljo, ko ga potrebujete.

## Kako vse skupaj deluje:

Začnete z vprašanjem na "recepciji" (UI).
Manager (MCP strežnik) ugotovi, kateri specialist (agent) vam lahko pomaga.
Specialist uporabi jezikovnega strokovnjaka (OpenAI), da razume vašo zahtevo, in knjižnico (AI Search), da najde najboljši odgovor.
Varnostnik (preverjanje pristnosti) poskrbi, da je vse varno.
Vse se to dogaja znotraj zanesljive, razširljive stavbe (Azure Container Apps), zato je vaša izkušnja gladka in varna.
To sodelovanje omogoča sistemu, da vam hitro in varno pomaga načrtovati potovanje, kot bi delala ekipa strokovnih potovalnih agentov v sodobni pisarni!

## Tehnična implementacija
- **MCP strežnik:** Gosti osnovno logiko usklajevanja, izpostavlja orodja agentov in upravlja kontekst za večstopenjske delovne tokove načrtovanja potovanj.
- **Agenti:** Vsak agent (npr. FlightAgent, HotelAgent) je implementiran kot MCP orodje s svojimi predlogami pozivov in logiko.
- **Azure integracija:** Uporablja Azure OpenAI za razumevanje naravnega jezika in Azure AI Search za pridobivanje podatkov.
- **Varnost:** Integracija z Microsoft Entra ID za preverjanje pristnosti in uporaba najmanjših privilegijev za dostop do vseh virov.
- **Uvajanje:** Podpira uvajanje na Azure Container Apps za razširljivost in operativno učinkovitost.

## Rezultati in vpliv
- Prikazuje, kako lahko MCP uporabi za usklajevanje več AI agentov v resničnem, proizvodnem scenariju.
- Pospešuje razvoj rešitev z zagotavljanjem ponovno uporabnih vzorcev za koordinacijo agentov, integracijo podatkov in varno uvajanje.
- Služi kot načrt za gradnjo industrijsko specializiranih aplikacij, podprtih z AI, z uporabo MCP in Azure storitev.

## Reference
- [Azure AI Travel Agents GitHub repozitorij](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Kaj sledi

- Nazaj na: [Pregled študij primerov](./README.md)
- Naprej: [Posodabljanje ADO elementov iz YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo storitve AI prevajanja [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, prosimo, upoštevajte, da lahko avtomatski prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovi izvorni jezikovni različici velja za avtoritativni vir. Za kritične informacije priporočamo strokovni človeški prevod. Nismo odgovorni za morebitne nesporazume ali napačne razlage, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->