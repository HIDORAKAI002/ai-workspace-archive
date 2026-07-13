# Napredne teme v MCP

[![Napredni MCP: Varni, razširljivi in multimodalni AI agenti](../../../translated_images/sl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknite zgornjo sliko za ogled videoposnetka te lekcije)_

To poglavje obravnava vrsto naprednih tem v implementaciji Protokola modelnih kontekstov (MCP), vključno z multimodalno integracijo, razširljivostjo, najboljšimi praksami za varnost in integracijo v podjetja. Te teme so ključne za gradnjo robustnih in produkcijsko pripravljenih MCP aplikacij, ki lahko zadovoljijo zahteve sodobnih AI sistemov.

## Pregled

Ta lekcija raziskuje napredne koncepte v implementaciji Protokola modelnih kontekstov, s poudarkom na multimodalni integraciji, razširljivosti, najboljših praksah za varnost in integraciji v podjetja. Te teme so bistvene za gradnjo MCP aplikacij produkcijske kakovosti, ki lahko obvladujejo kompleksne zahteve v poslovnih okoljih.

> **Pogled naprej:** več tem spodaj je prizadetih z izdajo kandidata za specifikacijo MCP 2026-07-28 — Root Contexts (5.4) in Sampling (5.6) gradita na primitivih, ki jih kandidat za izdajo označuje kot zastarele, eksperimentalna funkcija Tasks, omenjena pri Protocol Features (5.16), pa se seli v namensko razširitev Tasks. Za podrobnosti glejte [Kaj se spreminja v MCP: Kandidat izdaje 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Cilji učenja

Do konca te lekcije boste znali:

- Implementirati multimodalne zmožnosti znotraj MCP ogrodij
- Načrtovati razširljive MCP arhitekture za scenarije z velikim povpraševanjem
- Uporabiti najboljše varnostne prakse skladne z varnostnimi načeli MCP
- Integrirati MCP s sistemih in okviri za podjetniško AI
- Optimizirati delovanje in zanesljivost v produkcijskih okoljih

## Lekcije in vzorčni projekti

| Povezava | Naslov | Opis |
|------|-------|-------------|
| [5.1 Integracija z Azure](./mcp-integration/README.md) | Integracija z Azure | Naučite se, kako integrirati vaš MCP strežnik na Azure |
| [5.2 Vzorec za multimodalnost](./mcp-multi-modality/README.md) | MCP multimodalni vzorci | Vzorci za avdio, sliko in multimodalne odzive |
| [5.3 MCP OAuth2 vzorec](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimalna Spring Boot aplikacija, ki prikazuje OAuth2 z MCP, tako kot Avtorizacijski kot Virni strežnik. Predstavlja varno izdajo žetonov, zaščitene končne točke, namestitev Azure Container Apps in integracijo upravljanja API-jev. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root konteksti | Naučite se več o root context in kako jih implementirati |
| [5.5 Usmerjanje](./mcp-routing/README.md) | Usmerjanje | Spoznajte različne tipe usmerjanja |
| [5.6 Vzorčenje](./mcp-sampling/README.md) | Vzorčenje | Naučite se, kako delati z vzorčenjem |
| [5.7 Skaliranje](./mcp-scaling/README.md) | Skaliranje | Naučite se o skaliranju |
| [5.8 Varnost](./mcp-security/README.md) | Varnost | Zavarujte svoj MCP strežnik |
| [5.9 Vzorec spletnega iskanja](./web-search-mcp/README.md) | Spletno iskanje MCP | Python MCP strežnik in odjemalec, ki integrira SerpAPI za iskanje v spletu, novicah, izdelkih in Q&A v realnem času. Predstavlja orkestracijo več orodij, integracijo zunanjih API-jev in robustno ravnanje z napakami. |
| [5.10 Pretakanje v realnem času](./mcp-realtimestreaming/README.md) | Pretakanje | Pretakanje podatkov v realnem času je postalo bistveno v današnjem svetu, ki ga poganjajo podatki, kjer podjetja in aplikacije potrebujejo takojšen dostop do informacij za pravočasne odločitve.|
| [5.11 Spletno iskanje v realnem času](./mcp-realtimesearch/README.md) | Spletno iskanje | Kako MCP preoblikuje spletno iskanje v realnem času z zagotavljanjem standardiziranega pristopa k upravljanju kontekstov med AI modeli, iskalniki in aplikacijami.|
| [5.12 Avtentikacija Entra ID za MCP strežnike](./mcp-security-entra/README.md) | Avtentikacija Entra ID | Microsoft Entra ID zagotavlja robustno oblačno rešitev za upravljanje identitete in dostopa, ki pomaga zagotoviti, da lahko interakcijo z vašim MCP strežnikom izvajajo le pooblaščeni uporabniki in aplikacije.|
| [5.13 Integracija Microsoft Foundry agenta](./mcp-foundry-agent-integration/README.md) | Integracija Microsoft Foundry | Naučite se, kako integrirati MCP strežnike z Microsoft Foundry agenti, kar omogoča zmogljivo orkestracijo orodij in zmogljivosti podjetniške AI z uporabo standardiziranih povezav z zunanjimi viri podatkov.|
| [5.14 Kontekstna inženiring](./mcp-contextengineering/README.md) | Kontextni inženiring | Prihodnost tehnik kontekstnega inženiringa za MCP strežnike, vključno z optimizacijo konteksta, dinamičnim upravljanjem konteksta in strategijami za učinkovito inženiring pozivov znotraj MCP ogrodij.|
| [5.15 Prilagojeni prenos MCP](./mcp-transport/README.md) | Prilagojeni prenos | Naučite se implementirati prilagojene prenosne mehanizme za specializirane komunikacijske scenarije MCP.|
| [5.16 Poglobljen pregled protokolskih funkcij](./mcp-protocol-features/README.md) | Funkcije protokola | Obvladajte napredne protokolske funkcije, vključno s spodbudami o napredku, prekinitvami zahtev, predlogami za vire in vzorci za ravnanje z napakami.|
| [5.17 Adversarialno večagentno sklepanje](./mcp-adversarial-agents/README.md) | Adversarialni agenti | Uporabite dva agenta z nasprotnimi stališči, ki delita en MCP nabor orodij, da ujamete halucinacije, izpostavite robne primere in ustvarite bolje kalibrirane izhode skozi strukturiran debatni proces.|

> **Novo v MCP specifikaciji 2025-11-25**: Specifikacija zdaj vključuje eksperimentalno podporo za **Naloge** (dolgo trajajoče operacije s sledenjem napredka), **Oznake orodij** (metapodatki o vedenju orodij za varnost), **Način zahtevkov URL** (zahteva določeno vsebino URL od odjemalcev) in izboljšane **Korene** (za upravljanje delovnega prostora konteksta). Za podrobnosti glejte [zapis sprememb MCP specifikacije](https://spec.modelcontextprotocol.io/).

## Dodatne reference

Za najnovejše informacije o naprednih temah MCP, glejte:
- [MCP dokumentacija](https://modelcontextprotocol.io/)
- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitorij](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Varnostna tveganja in ublažitve
- [Delavnica MCP varnostnega vrha (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktično varnostno usposabljanje

## Ključne ugotovitve

- Multimodalne MCP implementacije razširijo AI zmožnosti preko le upravljanja besedil
- Razširljivost je bistvena za podjetniške namestitve in jo je mogoče nasloviti z horizontalnim in vertikalnim skaliranjem
- Celoviti varnostni ukrepi ščitijo podatke in zagotavljajo ustrezno nadzor dostopa
- Podjetniška integracija s platformami, kot sta Azure OpenAI in Microsoft AI Foundry, krepi MCP sposobnosti
- Napredne MCP implementacije imajo koristi od optimiziranih arhitektur in skrbnega upravljanja virov

## Vaja

Oblikujte produkcijsko MCP implementacijo za specifičen primer uporabe:

1. Določite multimodalne zahteve za vaš primer uporabe
2. Opredelite varnostne kontrole, potrebne za zaščito občutljivih podatkov
3. Načrtujte razširljivo arhitekturo, ki lahko obvladuje različne obremenitve
4. Načrtujte integracijske točke s sistemi podjetniške AI
5. Dokumentirajte potencialne ozka grla pri zmogljivosti in strategije za ublažitev

## Dodatni viri

- [Azure OpenAI dokumentacija](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentacija](https://learn.microsoft.com/en-us/ai-services/)

---

## Kaj sledi

Raziskujte lekcije v tem modulu, začnite z: [5.1 MCP integracija](./mcp-integration/README.md)

Ko zaključite ta modul, nadaljujte z: [Modul 6: Prispevki skupnosti](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->