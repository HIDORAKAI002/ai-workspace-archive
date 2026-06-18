# Napredne teme u MCP-u

[![Napredni MCP: Sigurni, skalabilni i multimodalni AI agenti](../../../translated_images/hr/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknite gornju sliku za video ove lekcije)_

Ovo poglavlje pokriva niz naprednih tema u implementaciji Model Context Protocola (MCP), uključujući multimodalnu integraciju, skalabilnost, najbolje sigurnosne prakse i integraciju u poduzeća. Ove teme su ključne za izgradnju robusnih i proizvodno spremnih MCP aplikacija koje mogu zadovoljiti zahtjeve suvremenih AI sustava.

## Pregled

Ova lekcija istražuje napredne koncepte u implementaciji Model Context Protocola s fokusom na multimodalnu integraciju, skalabilnost, najbolje sigurnosne prakse i integraciju u poduzeća. Ove teme su bitne za izgradnju proizvodno spremnih MCP aplikacija koje mogu podnijeti složene zahtjeve u korporativnim okruženjima.

## Ciljevi učenja

Na kraju ove lekcije moći ćete:

- Implementirati multimodalne mogućnosti unutar MCP okvira
- Dizajnirati skalabilne MCP arhitekture za visokorazinske zahtjeve
- Primijeniti najbolje sigurnosne prakse usklađene s principima sigurnosti MCP-a
- Integrirati MCP s korporativnim AI sustavima i okvirima
- Optimizirati performanse i pouzdanost u proizvodnim okruženjima

## Lekcije i primjeri projekata

| Link | Naslov | Opis |
|------|--------|-------|
| [5.1 Integracija s Azur](./mcp-integration/README.md) | Integracija s Azureom | Naučite kako integrirati svoj MCP Server na Azureu |
| [5.2 Multimodalni primjer](./mcp-multi-modality/README.md) | MCP multimodalni primjeri | Primjeri za zvuk, sliku i multimodalni odgovor |
| [5.3 MCP OAuth2 primjer](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demo | Minimalna Spring Boot aplikacija koja prikazuje OAuth2 s MCP-om, i kao Authorization i Resource Server. Demonstrira sigurno izdavanje tokena, zaštićene krajnje točke, implementaciju Azure Container Apps i integraciju upravljanja API-jima. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root konteksti | Naučite više o root kontekstu i kako ih implementirati |
| [5.5 Ruting](./mcp-routing/README.md) | Ruting | Naučite različite vrste rutinga |
| [5.6 Uzorkovanje](./mcp-sampling/README.md) | Uzorkovanje | Naučite kako raditi s uzorkovanjem |
| [5.7 Skaliranje](./mcp-scaling/README.md) | Skaliranje | Naučite o skaliranju |
| [5.8 Sigurnost](./mcp-security/README.md) | Sigurnost | Osigurajte svoj MCP Server |
| [5.9 Web pretraživanje MCP](./web-search-mcp/README.md) | Web pretraživanje MCP | Python MCP server i klijent koji integriraju SerpAPI za real-time web, vijesti, pretragu proizvoda i Q&A. Demonstrira orkestraciju višestrukih alata, integraciju vanjskih API-ja i robusno upravljanje pogreškama. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Streaming podataka u stvarnom vremenu postao je ključan u današnjem podatkovno vođenom svijetu, gdje tvrtke i aplikacije zahtijevaju trenutni pristup informacijama za pravovremene odluke. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web pretraživanje | Real-time web pretraživanje – kako MCP transformira real-time web pretragu pružajući standardiziran pristup upravljanju kontekstom kroz AI modele, tražilice i aplikacije. | 
| [5.12 Entra ID autentifikacija za Model Context Protocol servere](./mcp-security-entra/README.md) | Entra ID autentifikacija | Microsoft Entra ID pruža robusno cloud-temeljeno rješenje za upravljanje identitetima i pristupom, pomažući osigurati da samo ovlašteni korisnici i aplikacije mogu komunicirati s vašim MCP serverom. |
| [5.13 Microsoft Foundry agent integracija](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integracija | Naučite kako integrirati Model Context Protocol servere s Microsoft Foundry agentima, omogućujući snažnu orkestraciju alata i korporativne AI mogućnosti s standardiziranim vezama na vanjske izvore podataka. |
| [5.14 Inženjerstvo konteksta](./mcp-contextengineering/README.md) | Inženjerstvo konteksta | Buduće mogućnosti tehnika inženjerstva konteksta za MCP servere, uključujući optimizaciju konteksta, dinamičko upravljanje kontekstom i strategije za učinkovito prompt inženjerstvo unutar MCP okvira. |
| [5.15 MCP vlastiti transport](./mcp-transport/README.md) | Vlastiti transport | Naučite kako implementirati vlastite transportne mehanizme za specijalizirane MCP komunikacijske scenarije. |
| [5.16 Dubinska analiza protokolnih značajki](./mcp-protocol-features/README.md) | Protokolne značajke | Ovladavanje naprednim protokolnim značajkama uključujući notifikacije o napretku, otkazivanje zahtjeva, predloške resursa i obrasce za rukovanje pogreškama. |
| [5.17 Adversarialni višestruki agenti](./mcp-adversarial-agents/README.md) | Adversarialni agenti | Koristite dva agenta s protivstavljenim položajima, dijeleći jedinstveni MCP skup alata, za hvatanje halucinacija, isticanje rubnih slučajeva i stvaranje bolje kalibriranih izlaza kroz strukturirani dijalog. |

> **Novo u MCP specifikaciji 2025-11-25**: specifikacija sada uključuje eksperimentalnu podršku za **Zadatke** (dugotrajne operacije s praćenjem napretka), **Anotacije alata** (metapodaci o ponašanju alata za sigurnost), **Elicitirane URL načine** (zahtjevi klijentima za specifičan URL sadržaj) i poboljšane **Rootove** (za upravljanje kontekstom radnih prostora). Pogledajte [dnevnik promjena MCP specifikacije](https://spec.modelcontextprotocol.io/) za potpune detalje.

## Dodatne reference

Za najnovije informacije o naprednim MCP temama, pogledajte:
- [MCP Dokumentacija](https://modelcontextprotocol.io/)
- [MCP Specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub spremište](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sigurnosni rizici i mjere ublažavanja
- [MCP Sigurnosni summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična sigurnosna obuka

## Ključni zaključci

- Multimodalne MCP implementacije proširuju AI mogućnosti izvan obrade teksta
- Skalabilnost je nužna za korporativne implementacije i može se adresirati horizontalnim i vertikalnim skaliranjem
- Sveobuhvatne sigurnosne mjere štite podatke i osiguravaju pravilnu kontrolu pristupa
- Korporativna integracija s platformama poput Azure OpenAI i Microsoft AI Foundry unapređuje mogućnosti MCP-a
- Napredne MCP implementacije imaju koristi od optimiziranih arhitektura i pažljivog upravljanja resursima

## Vježba

Dizajnirajte MCP implementaciju razine poduzeća za specifičan slučaj upotrebe:

1. Identificirajte multimodalne zahtjeve za svoj slučaj upotrebe
2. Nacrtajte sigurnosne kontrole potrebne za zaštitu osjetljivih podataka
3. Dizajnirajte skalabilnu arhitekturu koja može podnijeti varirajuća opterećenja
4. Izradite plan integracijskih točaka s korporativnim AI sustavima
5. Dokumentirajte potencijalna uska grla performansi i strategije za njihovo ublažavanje

## Dodatni resursi

- [Azure OpenAI dokumentacija](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentacija](https://learn.microsoft.com/en-us/ai-services/)

---

## Što slijedi

Istražite lekcije u ovom modulu počevši s: [5.1 MCP integracija](./mcp-integration/README.md)

Nakon što dovršite ovaj modul, nastavite na: [Modul 6: Doprinosi zajednice](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->