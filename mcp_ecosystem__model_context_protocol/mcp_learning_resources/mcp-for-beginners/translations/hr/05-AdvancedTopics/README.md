# Napredne teme u MCP-u

[![Napredni MCP: Sigurni, skalabilni i multimodalni AI agenti](../../../translated_images/hr/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknite na sliku gore za pregled videa ove lekcije)_

Ovo poglavlje pokriva niz naprednih tema u implementaciji Model Context Protocola (MCP), uključujući multimodalnu integraciju, skalabilnost, najbolje prakse za sigurnost i integraciju u poduzeća. Ove teme su ključne za izgradnju robusnih i spremnih za proizvodnju MCP aplikacija koje mogu zadovoljiti zahtjeve modernih AI sustava.

## Pregled

Ova lekcija istražuje napredne koncepte u implementaciji Model Context Protocola, fokusirajući se na multimodalnu integraciju, skalabilnost, najbolje sigurnosne prakse i integraciju u poduzeća. Ove teme su ključne za izgradnju MCP aplikacija proizvodne klase koje mogu upravljati složenim zahtjevima u poslovnim okruženjima.

> **Gledajući unaprijed:** nekoliko tema ispod pogođeno je kandidatima za izdanje MCP specifikacije `2026-07-28` — Root Contexts (5.4) i Sampling (5.6) temelje se na primitivima za koje kandidat za izdanje označava kao zastarjele, a eksperimentalna značajka Tasks navedena u Protocol Features (5.16) prelazi u zasebno proširenje za Tasks. Pogledajte [Što se mijenja u MCP-u: Kandidat za izdanje 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) za detalje.

## Ciljevi učenja

Do kraja ove lekcije moći ćete:

- Implementirati multimodalne mogućnosti unutar MCP okvira
- Dizajnirati skalabilne MCP arhitekture za scenarije visokih zahtjeva
- Primijeniti najbolje sigurnosne prakse u skladu s sigurnosnim principima MCP-a
- Integrirati MCP s poslovnim AI sustavima i okvirima
- Optimizirati performanse i pouzdanost u produkcijskim okruženjima

## Lekcije i uzorci projekata

| Link | Naslov | Opis |
|------|--------|-------|
| [5.1 Integracija s Azure](./mcp-integration/README.md) | Integracija s Azure | Naučite kako integrirati svoj MCP Server na Azure |
| [5.2 Multimodalni uzorak](./mcp-multi-modality/README.md) | MCP Multimodalni uzorci | Uzorci za audio, sliku i multimodalni odgovor |
| [5.3 MCP OAuth2 uzorak](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimalna Spring Boot aplikacija koja pokazuje OAuth2 s MCP-om, kao Authorization i Resource Server. Demonstrira sigurnu izdavanje tokena, zaštićene krajnje točke, implementaciju u Azure Container Apps te integraciju s API Managementom. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root konteksti | Saznajte više o root kontekstu i kako ih implementirati (zastarjelo u kandidatu za izdanje `2026-07-28`; još uvijek valjano za `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Usmjeravanje | Saznajte o različitim vrstama usmjeravanja |
| [5.6 Sampling](./mcp-sampling/README.md) | Uzorkovanje | Saznajte kako raditi s uzorkovanjem (zastarjelo u kandidatu za izdanje `2026-07-28`; još uvijek valjano za `2025-11-25`) |
| [5.7 Skaliranje](./mcp-scaling/README.md) | Skaliranje | Saznajte o skaliranju |
| [5.8 Sigurnost](./mcp-security/README.md) | Sigurnost | Osigurajte svoj MCP Server |
| [5.9 Web Search uzorak](./web-search-mcp/README.md) | Web pretraživanje MCP | Python MCP server i klijent koji se integriraju sa SerpAPI za pretraživanje weba, vijesti, proizvoda i Q&A u stvarnom vremenu. Demonstrira orkestraciju više alata, integraciju eksternih API-ja i robusno upravljanje greškama. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Streaming podataka u stvarnom vremenu postao je neophodan u današnjem svijetu vođenom podacima, gdje poslovanja i aplikacije zahtijevaju neposredan pristup informacijama radi pravovremenih odluka.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web pretraživanje | Kako MCP transformira pretraživanje weba u stvarnom vremenu pružajući standardizirani pristup upravljanju kontekstom preko AI modela, tražilica i aplikacija.|
| [5.12 Entra ID autentikacija za Model Context Protocol servere](./mcp-security-entra/README.md) | Entra ID autentikacija | Microsoft Entra ID pruža robusno rješenje za upravljanje identitetom i pristupom u oblaku, pomažući osigurati da samo ovlašteni korisnici i aplikacije mogu komunicirati s vašim MCP serverom.|
| [5.13 Microsoft Foundry Agent integracija](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integracija | Naučite kako integrirati Model Context Protocol servere s Microsoft Foundry agentima, omogućujući moćnu orkestraciju alata i poslovne AI mogućnosti sa standardiziranim povezivanjem vanjskih izvora podataka.|
| [5.14 Kontekst inženjering](./mcp-contextengineering/README.md) | Kontekst inženjering | Buduća prilika tehnika inženjeringa konteksta za MCP servere, uključujući optimizaciju konteksta, dinamičko upravljanje kontekstom i strategije za učinkovito prompt inženjerstvo unutar MCP okvira.|
| [5.15 MCP prilagođeni transport](./mcp-transport/README.md) | Prilagođeni transport | Naučite kako implementirati prilagođene mehanizme transporta za specijalizirane scenarije MCP komunikacije.|
| [5.16 Dubinska analiza protokolnih značajki](./mcp-protocol-features/README.md) | Protokolne značajke | Ovladavanje naprednim značajkama protokola uključujući obavijesti o napretku, otkazivanje zahtjeva, predloške resursa i obrasce upravljanja greškama.|
| [5.17 Adversarijalno razmišljanje više agenata](./mcp-adversarial-agents/README.md) | Adversarijalni agenti | Upotrijebite dva agenta s suprotnim stavovima, dijeleći jedinstveni MCP skup alata, za hvatanje halucinacija, isticanje rubnih slučajeva i proizvodnju bolje kalibriranih izlaza kroz strukturiranu debatu.|

> **Novo u MCP specifikaciji 2025-11-25**: Specifikacija sada uključuje eksperimentalnu podršku za **Tasks** (dugotrajne operacije s praćenjem napretka), **Tool Annotations** (metapodatke o ponašanju alata zbog sigurnosti), **URL Mode Elicitation** (zahtjevanje specifičnog sadržaja URL-a od klijenata) i poboljšane **Roots** (za upravljanje kontekstom radnog prostora). Pogledajte [MCP specifikacijski changelog](https://spec.modelcontextprotocol.io/) za potpune detalje.

## Dodatne reference

Za najnovije informacije o naprednim MCP temama, pogledajte:
- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitorij](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sigurnosni rizici i mitigacije
- [MCP Security Summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična sigurnosna obuka

## Ključne spoznaje

- Multimodalne MCP implementacije proširuju AI kapacitete izvan obrade teksta
- Skalabilnost je ključna za implementacije u poduzećima i može se riješiti horizontalnim i vertikalnim skaliranjem
- Sveobuhvatne sigurnosne mjere štite podatke i osiguravaju pravilnu kontrolu pristupa
- Integracija u poduzeća s platformama poput Azure OpenAI i Microsoft AI Foundry pojačava MCP mogućnosti
- Napredne MCP implementacije koriste optimizirane arhitekture i pažljivo upravljanje resursima

## Vježba

Dizajnirajte MCP implementaciju proizvodne klase za specifični slučaj upotrebe:

1. Identificirajte multimodalne zahtjeve za vaš slučaj upotrebe
2. Nacrtajte sigurnosne kontrole potrebne za zaštitu osjetljivih podataka
3. Dizajnirajte skalabilnu arhitekturu koja može podnijeti varijabilno opterećenje
4. Planirajte točke integracije s poslovnim AI sustavima
5. Dokumentirajte potencijalne uska grla u performansama i strategije ublažavanja

## Dodatni resursi

- [Azure OpenAI dokumentacija](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentacija](https://learn.microsoft.com/en-us/ai-services/)

---

## Što slijedi

Istražite lekcije u ovom modulu počevši s: [5.1 MCP integracija](./mcp-integration/README.md)

Nakon što završite ovaj modul, nastavite na: [Modul 6: Zajednički doprinosi](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->