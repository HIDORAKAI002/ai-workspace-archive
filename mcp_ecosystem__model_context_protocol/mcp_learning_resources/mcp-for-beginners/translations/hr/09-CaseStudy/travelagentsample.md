# Studija slučaja: Azure AI Putnički agenti – Referentna implementacija

## Pregled

[Azure AI Putnički agenti](https://github.com/Azure-Samples/azure-ai-travel-agents) je sveobuhvatno referentno rješenje razvijeno od strane Microsofta koje demonstrira kako izgraditi aplikaciju za planiranje putovanja s više agenata, podržanu umjetnom inteligencijom, koristeći Model Context Protocol (MCP), Azure OpenAI i Azure AI Search. Ovaj projekt prikazuje najbolje prakse za orkestraciju više AI agenata, integraciju podataka poduzeća i pružanje sigurne, proširive platforme za stvarne scenarije.

## Ključne značajke
- **Orkestracija više agenata:** Koristi MCP za koordinaciju specijaliziranih agenata (npr. agenti za letove, hotele i itinerere) koji surađuju kako bi ispunili kompleksne zadatke planiranja putovanja.
- **Integracija podataka poduzeća:** Povezuje se na Azure AI Search i druge izvore podataka poduzeća kako bi pružio ažurirane i relevantne informacije za preporuke putovanja.
- **Sigurna, skalabilna arhitektura:** Iskorištava Azure servise za autentikaciju, autorizaciju i skalabilnu implementaciju, slijedeći najbolje sigurnosne prakse poduzeća.
- **Proširivi alati:** Implementira višekratno upotrebljive MCP alate i predloške upita, omogućujući brzu prilagodbu novim domenama ili poslovnim zahtjevima.
- **Korisničko iskustvo:** Pruža konverzacijsko sučelje za korisnike za interakciju s putničkim agentima, pokretano Azure OpenAI-jem i MCP-om.

## Arhitektura
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Opis dijagrama arhitekture

Rješenje Azure AI Putnički agenti dizajnirano je za modularnost, skalabilnost i sigurnu integraciju više AI agenata i izvora podataka poduzeća. Glavne komponente i tok podataka su:

- **Korisničko sučelje:** Korisnici komuniciraju sa sustavom kroz konverzacijsko korisničko sučelje (poput web chata ili Teams bota), koje šalje upite korisnika i prima preporuke za putovanja.
- **MCP Server:** Djeluje kao centralni orkestrator, prima unos korisnika, upravlja kontekstom i koordinira rad specijaliziranih agenata (npr. FlightAgent, HotelAgent, ItineraryAgent) putem Model Context Protocol-a.
- **AI Agenti:** Svaki agent odgovoran je za određenu domenu (letove, hotele, itinerere) i implementiran je kao MCP alat. Agenti koriste predloške upita i logiku za obradu zahtjeva i generiranje odgovora.
- **Azure OpenAI servis:** Pruža napredno razumijevanje i generiranje prirodnog jezika, omogućujući agentima da interpretiraju korisničke namjere i generiraju konverzacijske odgovore.
- **Azure AI Search & podaci poduzeća:** Agenti pretražuju Azure AI Search i druge izvore podataka poduzeća da bi dohvatili ažurirane informacije o letovima, hotelima i opcijama putovanja.
- **Autentikacija i sigurnost:** Integriran s Microsoft Entra ID za sigurnu autentikaciju i primjenjuje kontrolu pristupa s najmanjim mogućim privilegijama na sve resurse.
- **Implementacija:** Dizajnirano za implementaciju na Azure Container Apps, osiguravajući skalabilnost, nadzor i operativnu učinkovitost.

Ova arhitektura omogućuje besprijekornu orkestraciju više AI agenata, sigurnu integraciju s podacima poduzeća i snažnu, proširivu platformu za izgradnju AI rješenja specifičnih za domenu.

## Korak-po-korak objašnjenje dijagrama arhitekture
Zamislite da planirate veliko putovanje i imate tim stručnih asistenata koji vam pomažu sa svakim detaljem. Sustav Azure AI Putnički agenti radi na sličan način, koristeći različite dijelove (kao članove tima), od kojih svaki ima posebnu ulogu. Evo kako se sve uklapa:

### Korisničko sučelje (UI):
Zamislite to kao recepciju vašeg putničkog agenta. Tu vi (korisnik) postavljate pitanja ili izražavate zahtjeve, poput "Pronađi mi let za Pariz." To može biti prozor za chat na web stranici ili aplikaciji za poruke.

### MCP Server (Koordinator):
MCP Server je kao menadžer koji sluša vaš zahtjev na recepciji i odlučuje koji će specijalist obraditi svaki dio. Prati vašu konverzaciju i osigurava da sve teče glatko.

### AI Agenti (Specijalistički asistenti):
Svaki agent je stručnjak za određeno područje – jedan poznaje letove, drugi hotele, a treći planira itinerere. Kad zatražite putovanje, MCP Server šalje vaš zahtjev pravom agentu ili agentima. Ti agenti koriste svoje znanje i alate da pronađu najbolje opcije za vas.

### Azure OpenAI servis (Jezični stručnjak):
To je kao da imate stručnjaka za jezik koji razumije točno što tražite, bez obzira kako to sročite. Pomaže agentima da razumiju vaše zahtjeve i odgovore na prirodan, konverzacijski način.

### Azure AI Search & podaci poduzeća (Informacijska knjižnica):
Zamislite ogromnu, ažuriranu knjižnicu sa svim najnovijim informacijama o putovanjima – rasporedima letova, dostupnosti hotela i još mnogo toga. Agenti pretražuju ovu knjižnicu da bi pronašli najtočnije odgovore za vas.

### Autentikacija i sigurnost (Sigurnosni čuvar):
Baš kao što sigurnosni čuvar kontrolira tko može ući u određene prostorije, ovaj dio osigurava da samo ovlašteni ljudi i agenti imaju pristup povjerljivim informacijama. Čuva vaše podatke sigurnima i privatnima.

### Implementacija na Azure Container Apps (Zgrada):
Svi ovi asistenti i alati rade zajedno unutar sigurne, skalabilne zgrade (oblak). To znači da sustav može istovremeno služiti mnogo korisnika i uvijek je dostupan kad vam treba.

## Kako sve to funkcionira zajedno:

Počinjete postavljanjem pitanja na recepciji (UI).
Menadžer (MCP Server) utvrđuje koji će specijalist (agent) pomoći.
Specijalist koristi jezičnog stručnjaka (OpenAI) da razumije vaš zahtjev i knjižnicu (AI Search) da pronađe najbolji odgovor.
Sigurnosni čuvar (autentikacija) osigurava da je sve sigurno.
Sve se odvija unutar pouzdane, skalabilne zgrade (Azure Container Apps), kako bi vaše iskustvo bilo glatko i sigurno.
Ova timska suradnja omogućava sustavu da brzo i sigurno pomogne u planiranju vašeg putovanja, baš kao tim stručnih putničkih agenata koji rade zajedno u modernom uredu!

## Tehnička implementacija
- **MCP Server:** Domaćin je osnovne logike orkestracije, izlaže alate agenata i upravlja kontekstom za višekorake tijekove planiranja putovanja.
- **Agenti:** Svaki agent (npr. FlightAgent, HotelAgent) implementiran je kao MCP alat sa svojim predlošcima upita i logikom.
- **Azure integracija:** Koristi Azure OpenAI za razumijevanje prirodnog jezika i Azure AI Search za dohvat podataka.
- **Sigurnost:** Integriran je s Microsoft Entra ID za autentikaciju i primjenjuje kontrolu pristupa s najmanjim mogućim privilegijama na sve resurse.
- **Implementacija:** Podržava implementaciju na Azure Container Apps za skalabilnost i operativnu učinkovitost.

## Rezultati i utjecaj
- Pokazuje kako se MCP može koristiti za orkestraciju više AI agenata u stvarnom, proizvodnom scenariju.
- Ubrzava razvoj rješenja pružajući višekratno upotrebljive obrasce za koordinaciju agenata, integraciju podataka i sigurnu implementaciju.
- Služi kao nacrt za izgradnju domena-specifičnih, AI-pokretanih aplikacija koristeći MCP i Azure servise.

## Reference
- [Azure AI Putnički agenti GitHub repozitorij](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI servis](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Što slijedi

- Natrag na: [Pregled studija slučaja](./README.md)
- Sljedeće: [Ažuriranje ADO stavki s YouTubea](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o odricanju od odgovornosti**:
Ovaj dokument preveden je pomoću AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba se smatrati autoritativnim izvorom. Za ključne informacije preporučuje se profesionalni prijevod od strane ljudskog stručnjaka. Ne odgovaramo za bilo kakva nesporazuma ili pogrešna tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->