# Napredne teme u MCP-u

[![Napredni MCP: Sigurni, skalabilni i multimodalni AI agenti](../../../translated_images/hr/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknite na sliku iznad za pregled videa ove lekcije)_

Ovo poglavlje pokriva niz naprednih tema u implementaciji Model Context Protola (MCP), uključujući multimodalnu integraciju, skalabilnost, najbolje sigurnosne prakse i integraciju u poduzećima. Ove teme su ključne za izgradnju robusnih i proizvodno spremnih MCP aplikacija koje mogu zadovoljiti zahtjeve suvremenih AI sustava.

## Pregled

Ova lekcija istražuje napredne koncepte u implementaciji Model Context Protola, fokusirajući se na multimodalnu integraciju, skalabilnost, najbolje sigurnosne prakse i integraciju u poduzećima. Ove teme su bitne za izgradnju MCP aplikacija proizvodne razine koje mogu podnijeti složene zahtjeve u okruženjima poduzeća.

> **Pogled unaprijed:** nekoliko tema ispod pogođeno je kandidatom za izdanje specifikacije MCP-a `2026-07-28` — Root Contexts (5.4) i Sampling (5.6) nadograđuju se na primitivima koje kandidat za izdanje označava kao zastarjele, a eksperimentalna značajka Tasks spomenuta u Protocol Features (5.16) prelazi u posvećeno proširenje Tasks. Pogledajte [Što se mijenja u MCP-u: Kandidat za izdanje 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) za detalje.

## Ciljevi učenja

Na kraju ove lekcije moći ćete:

- Implementirati multimodalne mogućnosti unutar MCP okvira
- Dizajnirati skalabilne MCP arhitekture za scenarije velike potražnje
- Primijeniti najbolje sigurnosne prakse usklađene s principima sigurnosti MCP-a
- Integrirati MCP s AI sustavima i okvirima u poduzećima
- Optimizirati performanse i pouzdanost u proizvodnim okruženjima

## Lekcije i primjeri projekata

| Link | Naslov | Opis |
|------|--------|--------|
| [5.1 Integracija s Azure](./mcp-integration/README.md) | Integracija s Azureom | Naučite kako integrirati svoj MCP server na Azureu |
| [5.2 Primjer multimodalnosti](./mcp-multi-modality/README.md) | MCP multimodalni primjeri  | Primjeri za zvuk, sliku i multimodalni odgovor |
| [5.3 MCP OAuth2 primjer](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimalna Spring Boot aplikacija koja prikazuje OAuth2 s MCP-om, i kao Authorization i Resource Server. Demonstrira sigurnu izdaju tokena, zaštićene krajnje točke, implementaciju u Azure Container Apps i integraciju s API upravljanjem. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root konteksti  | Saznajte više o root kontekstu i kako ih implementirati |
| [5.5 Routing](./mcp-routing/README.md) | Usmjeravanje | Naučite različite vrste usmjeravanja |
| [5.6 Sampling](./mcp-sampling/README.md) | Uzorak | Naučite kako raditi s uzorkovanjem |
| [5.7 Scaling](./mcp-scaling/README.md) | Skaliranje  | Naučite o skaliranju |
| [5.8 Security](./mcp-security/README.md) | Sigurnost  | Osigurajte svoj MCP Server |
| [5.9 Web Search primjer](./web-search-mcp/README.md) | Web pretraživanje MCP | Python MCP server i klijent integrirani sa SerpAPI za pretraživanje weba u stvarnom vremenu, vijesti, proizvode i pitanja i odgovore. Demonstrira orkestraciju više alata, integraciju vanjskih API-ja i robusno upravljanje pogreškama. |
| [5.10 Streaming u stvarnom vremenu](./mcp-realtimestreaming/README.md) | Streaming  | Streaming podataka u stvarnom vremenu postao je nužnost u današnjem svijetu vođenom podacima, gdje tvrtke i aplikacije zahtijevaju trenutni pristup informacijama za pravovremene odluke.|
| [5.11 Web pretraživanje u stvarnom vremenu](./mcp-realtimesearch/README.md) | Web pretraživanje | Pretraživanje weba u stvarnom vremenu - kako MCP transformira pretraživanje weba u stvarnom vremenu pružajući standardizirani pristup upravljanju kontekstom preko AI modela, tražilica i aplikacija.| 
| [5.12 Autentifikacija Entra ID za Model Context Protocol servere](./mcp-security-entra/README.md) | Autentifikacija Entra ID | Microsoft Entra ID pruža robusno rješenje za upravljanje identitetom i pristupom u oblaku, pomažući osigurati da samo ovlašteni korisnici i aplikacije mogu komunicirati s vašim MCP serverom.|
| [5.13 Integracija Microsoft Foundry agenta](./mcp-foundry-agent-integration/README.md) | Integracija Microsoft Foundry | Naučite kako integrirati Model Context Protocol servere s Microsoft Foundry agentima, omogućujući snažnu orkestraciju alata i AI mogućnosti za poduzeća sa standardiziranim vezama za vanjske izvore podataka.|
| [5.14 Inženjerstvo konteksta](./mcp-contextengineering/README.md) | Inženjerstvo konteksta | Buduće prilike tehnika inženjerstva konteksta za MCP servere, uključujući optimizaciju konteksta, dinamičko upravljanje kontekstom i strategije za učinkovito konstruiranje promptova unutar MCP okvira.|
| [5.15 MCP prilagođeni transport](./mcp-transport/README.md) | Prilagođeni transport | Naučite kako implementirati prilagođene transportne mehanizme za specijalizirane situacije MCP komunikacije.|
| [5.16 Detaljan pregled protokolskih značajki](./mcp-protocol-features/README.md) | Protokolske značajke | Ovladavanje naprednim protokolskim značajkama uključujući obavijesti o napretku, otkazivanje zahtjeva, predloške resursa i obrasce upravljanja pogreškama.|
| [5.17 Adversarijalno razmišljanje s više agenata](./mcp-adversarial-agents/README.md) | Adversarijalni agenti | Koristite dva agenta s suprotnim stavovima, dijeleći jedan skup MCP alata, za hvatanje halucinacija, izlaganje rubnih slučajeva i proizvodnju bolje kalibriranih izlaza kroz strukturirani debatni proces.|

> **Novo u MCP specifikaciji 2025-11-25**: Specifikacija sada uključuje eksperimentalnu podršku za **Tasks** (dugotrajne operacije s praćenjem napretka), **Tool Annotations** (metapodaci o ponašanju alata za sigurnost), **URL Mode Elicitation** (zahtijevanje određenog URL sadržaja od klijenata) i poboljšane **Rootse** (za upravljanje kontekstom radnog prostora). Pogledajte [MCP changelog specifikacije](https://spec.modelcontextprotocol.io/) za potpune detalje.

## Dodatne reference

Za najažurnije informacije o naprednim MCP temama, pogledajte:
- [MCP Dokumentaciju](https://modelcontextprotocol.io/)
- [MCP Specifikaciju (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repozitorij](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sigurnosni rizici i mjere zaštite
- [MCP Security Summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična sigurnosna obuka

## Ključne spoznaje

- Multimodalne MCP implementacije proširuju AI mogućnosti izvan obrade teksta
- Skalabilnost je ključna za primjene u poduzećima i može se riješiti horizontalnim i vertikalnim skaliranjem
- Sveobuhvatne sigurnosne mjere štite podatke i osiguravaju pravilnu kontrolu pristupa
- Integracija u poduzećima s platformama poput Azure OpenAI i Microsoft AI Foundry povećava MCP mogućnosti
- Napredne MCP implementacije imaju koristi od optimiziranih arhitektura i pažljivog upravljanja resursima

## Vježba

Dizajnirajte MCP implementaciju razine poduzeća za specifični slučaj uporabe:

1. Identificirajte multimodalne zahtjeve za svoj slučaj uporabe
2. Opišite sigurnosne mjere potrebne za zaštitu osjetljivih podataka
3. Dizajnirajte skalabilnu arhitekturu koja može podnijeti promjenjivo opterećenje
4. Planirajte točke integracije s AI sustavima u poduzećima
5. Dokumentirajte potencijalna uska grla u izvedbi i strategije za ublažavanje

## Dodatni resursi

- [Azure OpenAI dokumentacija](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentacija](https://learn.microsoft.com/en-us/ai-services/)

---

## Što je sljedeće

Istražite lekcije u ovom modulu započinjući s: [5.1 MCP integracija](./mcp-integration/README.md)

Nakon što završite ovaj modul, nastavite na: [Modul 6: Zajednički doprinosi](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->