# Napredne teme v MCP

[![Napredni MCP: varni, razširljivi in multimodalni AI agenti](../../../translated_images/sl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kliknite zgornjo sliko za ogled videoposnetka te lekcije)_

To poglavje pokriva vrsto naprednih tem v implementaciji Model Context Protocol (MCP), vključno z multimodalno integracijo, razširljivostjo, najboljšimi praksami za varnost in integracijo v podjetja. Te teme so ključnega pomena za gradnjo robustnih in produkcijsko pripravljenih MCP aplikacij, ki lahko zadostijo zahtevam sodobnih AI sistemov.

## Pregled

Ta lekcija raziskuje napredne koncepte v implementaciji Model Context Protocol, osredotoča se na multimodalno integracijo, razširljivost, najboljše prakse za varnost in integracijo v podjetja. Te teme so bistvene za ustvarjanje produkcijskih MCP aplikacij, ki lahko obvladujejo kompleksne zahteve v podjetniškem okolju.

## Cilji učenja

Ob zaključku te lekcije boste lahko:

- Implementirali multimodalne zmogljivosti v MCP ogrodjih
- Oblikovali razširljive MCP arhitekture za scenarije z visokimi zahtevami
- Uporabili najboljše prakse za varnost v skladu s varnostnimi načeli MCP
- Integrirali MCP s podjetniškimi AI sistemi in ogrodji
- Optimizirali zmogljivost in zanesljivost v produkcijskem okolju

## Lekcije in vzorčni projekti

| Povezava | Naslov | Opis |
|------|-------|-------------|
| [5.1 Integracija z Azure](./mcp-integration/README.md) | Integracija z Azure | Naučite se, kako integrirati svoj MCP strežnik na Azure |
| [5.2 Multimodalni vzorec](./mcp-multi-modality/README.md) | MCP multimodalni vzorci  | Vzorci za avdio, sliko in multimodalni odziv |
| [5.3 MCP OAuth2 vzorec](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimalna Spring Boot aplikacija, ki prikazuje OAuth2 z MCP, tako kot strežnik za avtentikacijo kot tudi za vire. Prikazuje varno izdajanje žetonov, zaščitene končne točke, nameščanje Azure Container Apps in integracijo upravljanja API-jev. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root konteksti  | Spoznajte več o root kontekstu in kako jih implementirati |
| [5.5 Usmerjanje](./mcp-routing/README.md) | Usmerjanje | Spoznajte različne vrste usmerjanja |
| [5.6 Vzorcevanje](./mcp-sampling/README.md) | Vzorcevanje | Naučite se dela z vzorcevanjem |
| [5.7 Skaliranje](./mcp-scaling/README.md) | Skaliranje  | Spoznajte skaliranje |
| [5.8 Varnost](./mcp-security/README.md) | Varnost  | Zavarujte svoj MCP strežnik |
| [5.9 Web Search vzorec](./web-search-mcp/README.md) | Web Search MCP | Python MCP strežnik in klient, ki se povezuje s SerpAPI za spletno, novičarsko in produktno iskanje v realnem času ter Q&A. Prikazuje orkestracijo več orodij, integracijo zunanjih API-jev in robustno ravnanje z napakami. |
| [5.10 Pretakanje v realnem času](./mcp-realtimestreaming/README.md) | Pretakanje  | Pretakanje podatkov v realnem času je danes bistveno za podjetja in aplikacije, ki zahtevajo takojšen dostop do informacij za pravočasno odločanje.|
| [5.11 Iskanje v realnem času](./mcp-realtimesearch/README.md) | Iskanje | Kako MCP preoblikuje iskanje v realnem času prek standardiziranega pristopa k upravljanju konteksta med AI modeli, iskalniki in aplikacijami.| 
| [5.12 Entra ID avtorizacija za Model Context Protocol strežnike](./mcp-security-entra/README.md) | Entra ID avtentikacija | Microsoft Entra ID zagotavlja robustno rešitev za upravljanje identitet in dostopa v oblaku, kar pomaga zagotoviti, da lahko z vašim MCP strežnikom komunicirajo le pooblaščeni uporabniki in aplikacije.|
| [5.13 Microsoft Foundry Agent integracija](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integracija | Naučite se, kako integrirati Model Context Protocol strežnike z Microsoft Foundry agenti, kar omogoča močno orkestracijo orodij in zmožnosti podjetniškega AI z uporabo standardiziranih povezav do zunanjih podatkovnih virov.|
| [5.14 Inženiring konteksta](./mcp-contextengineering/README.md) | Inženiring konteksta | Prihodnje možnosti tehnik inženiringa konteksta za MCP strežnike, vključno z optimizacijo konteksta, dinamičnim upravljanjem konteksta in strategijami za učinkovito izdelavo pozivov v MCP ogrodjih.|
| [5.15 MCP prilagojeni transport](./mcp-transport/README.md) | Prilagojeni transport | Naučite se implementirati prilagojene transportne mehanizme za specializirane komunikacijske scenarije MCP.|
| [5.16 Podroben vpogled v funkcije protokola](./mcp-protocol-features/README.md) | Funkcije protokola | Obvladajte napredne funkcije protokola, vključno z obvestili o napredku, preklicem zahtev, predlogi za vire in vzorci ravnanja z napakami.|
| [5.17 Adversarialno večagentno razmišljanje](./mcp-adversarial-agents/README.md) | Adversarialni agenti | Uporabite dva agenta z nasprotnimi stališči, ki delita eno MCP orodje, da ujamete halucinacije, izpostavite robne primere in ustvarite bolje kalibrirane izhode preko strukturiranega razpravljanja.|

> **Novi v MCP specifikaciji 2025-11-25**: Specifikacija zdaj vključuje eksperimentalno podporo za **Naloge** (dolgo trajajoče operacije s sledenjem napredka), **Oznake orodij** (metapodatki o vedenju orodij za varnost), **Način zahtev URL** (zahtevanje specifične vsebine URL od odjemalcev) in izboljšane **Rote** (za upravljanje konteksta delovnega prostora). Za vse podrobnosti glejte [dnevnik sprememb MCP specifikacije](https://spec.modelcontextprotocol.io/).

## Dodatne reference

Za najbolj ažurne informacije o naprednih temah MCP glejte:
- [Dokumentacija MCP](https://modelcontextprotocol.io/)
- [Specifikacija MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub repozitorij](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - varnostni tveganja in zaščite
- [Delavnica MCP varnostnega vrha (Sherpa)](https://azure-samples.github.io/sherpa/) - praktično usposabljanje za varnost

## Ključna spoznanja

- Multimodalne MCP implementacije razširjajo AI zmogljivosti onkraj obdelave besedila
- Razširljivost je ključna za podjetniške uvedbe in jo je mogoče nasloviti z horizontalnim in vertikalnim skaliranjem
- Celoviti varnostni ukrepi ščitijo podatke in zagotavljajo ustrezno kontrolo dostopa
- Podjetniška integracija s platformami, kot so Azure OpenAI in Microsoft AI Foundry, izboljšuje zmogljivosti MCP
- Napredne MCP implementacije imajo koristi od optimiziranih arhitektur in skrbnega upravljanja virov

## Naloga

Oblikujte MCP implementacijo za podjetniško uporabo za določen primer:

1. Opredelite multimodalne potrebe za vaš primer uporabe
2. Načrtujte varnostne ukrepe za zaščito občutljivih podatkov
3. Oblikujte razširljivo arhitekturo, ki lahko obvladuje različne obremenitve
4. Načrtujte točke integracije s podjetniškimi AI sistemi
5. Dokumentirajte potencialne ozka grla zmogljivosti in strategije za njihovo omilitev

## Dodatni viri

- [Azure OpenAI dokumentacija](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentacija](https://learn.microsoft.com/en-us/ai-services/)

---

## Kaj sledi

Raziščite lekcije v tem modulu, začnite z: [5.1 Integracija MCP](./mcp-integration/README.md)

Ko zaključite ta modul, nadaljujte z: [Modul 6: Skupnostni prispevki](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->