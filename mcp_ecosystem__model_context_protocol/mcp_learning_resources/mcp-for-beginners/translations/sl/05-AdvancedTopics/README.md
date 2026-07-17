# Napredne teme v MCP

[![Napredni MCP: Varni, razširljivi in multimodalni AI agenti](../../../translated_images/sl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknite na zgornjo sliko za ogled videa te lekcije)_

To poglavje zajema vrsto naprednih tem pri implementaciji Protokola konteksta modela (MCP), vključno z multimodalno integracijo, razširljivostjo, varnostnimi najboljšimi praksami in integracijo v podjetja. Te teme so ključne za gradnjo robustnih in za produkcijo pripravljenih MCP aplikacij, ki lahko izpolnijo zahteve sodobnih AI sistemov.

## Pregled

Ta lekcija raziskuje napredne koncepte implementacije Protokola konteksta modela, s poudarkom na multimodalni integraciji, razširljivosti, varnostnih najboljših praksah in integraciji v podjetja. Te teme so bistvene za ustvarjanje MCP aplikacij proizvodne kakovosti, ki lahko obvladujejo zahtevne zahteve v poslovnih okoljih.

> **Pogled v prihodnost:** več tem spodaj je vplivanih z izdajo kandidata specifikacije MCP `2026-07-28` — korenski konteksti (5.4) in vzorčenje (5.6) temeljita na primitivih, ki jih izdaja kandidat razglasi za zastarele, medtem ko se eksperimentalna funkcija Opravila iz Protokolnih funkcij (5.16) premakne v namenski razširitveni modul Opravila. Za podrobnosti glejte [Kaj se spreminja v MCP: Izdajni kandidat 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Cilji učenja

Ob koncu te lekcije boste lahko:

- Implementirali multimodalne zmogljivosti v okviru MCP
- Načrtovali razširljive MCP arhitekture za zahteve z visoko obremenitvijo
- Uporabili varnostne najboljše prakse v skladu s varnostnimi načeli MCP
- Integrirali MCP s poslovnimi AI sistemi in ogrodji
- Optimizirali zmogljivost in zanesljivost v proizvodnih okoljih

## Lekcije in vzorčni projekti

| Povezava | Naslov | Opis |
|------|-------|-------------|
| [5.1 Integracija z Azure](./mcp-integration/README.md) | Integracija z Azure | Naučite se, kako integrirati svoj MCP strežnik z Azure |
| [5.2 Primer multimodalnega](./mcp-multi-modality/README.md) | Vzorci MCP multimodalnosti | Vzorci za zvok, sliko in multimodalni odziv |
| [5.3 MCP OAuth2 primer](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demo | Minimalna Spring Boot aplikacija, ki prikazuje OAuth2 z MCP kot avtorizacijski in strežnik virov. Prikazuje varno izdajo žetonov, zaščitene končne točke, uvajanje v Azure Container Apps in integracijo upravljanja API. |
| [5.4 Korenski konteksti](./mcp-root-contexts/README.md) | Korenski konteksti | Več o korenskih kontekstih in njihovi implementaciji (zastarelo v izdajnem kandidatu `2026-07-28`; veljavno še za `2025-11-25`) |
| [5.5 Usmerjanje](./mcp-routing/README.md) | Usmerjanje | Spoznajte različne vrste usmerjanja |
| [5.6 Vzorčenje](./mcp-sampling/README.md) | Vzorčenje | Naučite se dela z vzorčenjem (zastarelo v izdajnem kandidatu `2026-07-28`; še vedno veljavno za `2025-11-25`) |
| [5.7 Razširjanje](./mcp-scaling/README.md) | Razširjanje | Spoznajte razširjanje |
| [5.8 Varnost](./mcp-security/README.md) | Varnost | Zaščitite svoj MCP strežnik |
| [5.9 Vzorčni spletni iskalnik](./web-search-mcp/README.md) | MCP spletno iskanje | Python MCP strežnik in odjemalec, ki integrirata SerpAPI za spletno, novičarsko, produktno iskanje in vprašanja in odgovore v realnem času. Prikazuje večorodno orkestracijo, integracijo zunanjih API-jev in robustno obravnavo napak. |
| [5.10 Pretakanje v realnem času](./mcp-realtimestreaming/README.md) | Pretakanje | Pretakanje podatkov v realnem času je postalo bistveno v današnjem svetu, ki temelji na podatkih, kjer podjetja in aplikacije potrebujejo takojšen dostop do informacij za pravočasne odločitve.|
| [5.11 Iskanje v realnem času](./mcp-realtimesearch/README.md) | Spletno iskanje | Iskanje v realnem času kako MCP preoblikuje spletno iskanje v realnem času z zagotavljanjem standardiziranega pristopa k upravljanju konteksta med AI modeli, iskalniki in aplikacijami.| 
| [5.12 Avtentikacija Entra ID za Model Context Protocol strežnike](./mcp-security-entra/README.md) | Avtentikacija Entra ID | Microsoft Entra ID ponuja robustno rešitev za upravljanje identitete in dostopa v oblaku, ki pomaga zagotoviti, da lahko z vašim MCP strežnikom komunicirajo le pooblaščeni uporabniki in aplikacije.|
| [5.13 Integracija Microsoft Foundry agentov](./mcp-foundry-agent-integration/README.md) | Integracija Microsoft Foundry | Naučite se, kako integrirati Protokol konteksta modela strežnike z Microsoft Foundry agenti, kar omogoča močno orodjsko orkestracijo in zmogljivosti podjetniške AI s standardiziranimi povezavami zunanjih virov podatkov.|
| [5.14 Inženiring konteksta](./mcp-contextengineering/README.md) | Inženiring konteksta | Prihodnje priložnosti tehnik inženiringa konteksta za MCP strežnike, vključno z optimizacijo konteksta, dinamičnim upravljanjem konteksta in strategijami za učinkovito inženirstvo pozivov znotraj MCP okvirov.|
| [5.15 MCP prilagojeni prenos](./mcp-transport/README.md) | Prilagojeni prenos | Naučite se, kako implementirati prilagojene mehanizme prenosa za specializirane MCP komunikacijske scenarije.|
| [5.16 Podrobno o protokolnih funkcijah](./mcp-protocol-features/README.md) | Protokolne funkcije | Obladujte napredne protokolne funkcije, vključno z obvestili o napredku, prekinitvijo zahtev, predlogami virov in vzorci obdelave napak.|
| [5.17 Nasprotno večagentno razmišljanje](./mcp-adversarial-agents/README.md) | Nasprotni agenti | Uporabite dva agenta z nasprotnimi stališči, ki delita en sklop MCP orodij, za odkrivanje halucinacij, pojavljanje robnih primerov in ustvarjanje bolje kalibriranih izhodov preko strukturiranega spora.|

> **Novo v MCP specifikaciji 2025-11-25**: Specifikacija zdaj vključuje eksperimentalno podporo za **Opravila** (dolgotrajne operacije s sledenjem napredka), **Oznake orodij** (metapodatki o vedenju orodij za varnost), **Način pridobivanja URL-jev** (zahtevanje specifične vsebine URL-ja od odjemalcev) in izboljšane **korene** (za upravljanje konteksta delovnega prostora). Za popolne podrobnosti glejte [Dnevnik sprememb MCP specifikacije](https://spec.modelcontextprotocol.io/).

## Dodatni viri

Za najnovejše informacije o naprednih temah MCP se sklicujte na:
- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitorij](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Varnostna tveganja in ukrepi
- [Delavnica MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktično usposabljanje o varnosti

## Ključne ugotovitve

- Multimodalne implementacije MCP razširjajo AI zmogljivosti prek obdelave besedila
- Razširljivost je bistvena za poslovne namestitve in jo je mogoče doseči s horizontalnim in vertikalnim razširjanjem
- Celoviti varnostni ukrepi ščitijo podatke in zagotavljajo ustrezno kontrola dostopa
- Poslovna integracija s platformami, kot sta Azure OpenAI in Microsoft AI Foundry, izboljšuje zmogljivosti MCP
- Napredne MCP implementacije koristijo optimizirane arhitekture in skrbno upravljanje virov

## Vaja

Oblikujte proizvodno MCP implementacijo za določen primer uporabe:

1. Prepoznajte multimodalne zahteve za vaš primer uporabe
2. Opišite varnostne kontrole potrebne za zaščito občutljivih podatkov
3. Načrtujte razširljivo arhitekturo, ki lahko obvladuje spreminjajočo se obremenitev
4. Načrtujte integracijske točke s poslovnimi AI sistemi
5. Dokumentirajte potencialne ozka grla zmogljivosti in strategije za njihovo omilitev

## Dodatni viri

- [Dokumentacija Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Dokumentacija Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Kaj sledi

Raziščite lekcije v tem modulu, začenši z: [5.1 MCP integracija](./mcp-integration/README.md)

Ko končate ta modul, nadaljujte z: [Modul 6: Prispevki skupnosti](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->