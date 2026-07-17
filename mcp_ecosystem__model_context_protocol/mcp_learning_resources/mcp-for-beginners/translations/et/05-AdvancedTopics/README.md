# Täiustatud teemad MCP-s

[![Täiustatud MCP: Turvalised, skaleeritavad ja multimodaalsed tehisintellekti agendid](../../../translated_images/et/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klõpsa ülaloleval pildil selle õppetunni video vaatamiseks)_

Selles peatükis käsitletakse Model Context Protocol (MCP) rakendamise mitmeid täiustatud teemasid, sealhulgas multimodaalset integratsiooni, skaleeritavust, turvalisi parimaid tavasid ja ettevõtte integratsiooni. Need teemad on olulised tugeva ja tootmisvalmis MCP rakenduste ehitamiseks, mis suudavad rahuldada kaasaegsete tehisintellekti süsteemide nõudmisi.

## Ülevaade

See õppetund uurib MCP rakendamise täiustatud mõisteid, keskendudes multimodaalsele integratsioonile, skaleeritavusele, turvalistele parimatele tavadele ja ettevõtte integratsioonile. Need teemad on olulised tootmisklassi MCP rakenduste loomisel, mis suudavad toime tulla keerukate nõudmistega ettevõtte keskkondades.

> **Vaatame tulevikku:** mitmed allpool toodud teemad on mõjutatud `2026-07-28` MCP spetsifikatsiooni vabastusversiooni kandidaat - Root Contextid (5.4) ja Valimine (5.6) põhinevad põhiprimitiiivil, mida vabastusversiooni kandidaat märgib aegunuks, ning eksperimentaalne Tööde funktsioon, mis on mainitud Protokolli funktsioonides (5.16), liigub eraldi Tööde laiendusena. Täpsemat teavet vaatake [Mis muutub MCP-s: 2026-07-28 vabastusversiooni kandidaat](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Õpieesmärgid

Selle õppetunni lõpuks oskad:

- Rakendada multimodaalseid võimeid MCP raamistikes
- Kujundada skaleeritavaid MCP arhitektuure kõrge nõudlusega stsenaariumide jaoks
- Rakendada MCP turvapõhimõtetega kooskõlas olevaid turvaparimaid tavasid
- Integreerida MCP ettevõtte tehisintellekti süsteemide ja raamistikega
- Optimeerida jõudlust ja töökindlust tootmiskeskkondades

## Õppetunnid ja näidisprojektid

| Link | Pealkiri | Kirjeldus |
|------|-------|-------------|
| [5.1 Integratsioon Azure'iga](./mcp-integration/README.md) | Integratsioon Azure'iga | Õpi, kuidas integreerida oma MCP server Azure'is |
| [5.2 Multimodaalne näide](./mcp-multi-modality/README.md) | MCP multimodaalsed näited | Näited heli, pildi ja multimodaalse vastuse jaoks |
| [5.3 MCP OAuth2 näide](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demo | Minimalistlik Spring Boot rakendus, mis näitab OAuth2 kasutamist MCP-ga nii autoriseerimis- kui ka ressursiserverina. Demonstreerib turvalist tokeni väljastamist, kaitstud otspunktide kasutamist, Azure Container Apps juurutamist ja API halduse integratsiooni. |
| [5.4 Root Contextid](./mcp-root-contexts/README.md) | Root contextid | Õpi rohkem root contextide kohta ja kuidas neid rakendada (aegunud `2026-07-28` vabastusversiooni kandidaadis; kehtib endiselt `2025-11-25` puhul) |
| [5.5 Marsruutimine](./mcp-routing/README.md) | Marsruutimine | Õpi erinevaid marsruutimise tüüpe |
| [5.6 Valimine](./mcp-sampling/README.md) | Valimine | Õpi, kuidas töötada valimisega (aegunud `2026-07-28` vabastusversiooni kandidaadis; kehtib endiselt `2025-11-25` puhul) |
| [5.7 Skaleerimine](./mcp-scaling/README.md) | Skaleerimine | Õpi skaleerimise kohta |
| [5.8 Turvalisus](./mcp-security/README.md) | Turvalisus | Kaitse oma MCP serverit |
| [5.9 Veebiotsingu näide](./web-search-mcp/README.md) | Veebiotsingu MCP | Python MCP server ja klient, mis integreerub SerpAPI-ga reaalajas veebipõhise, uudiste-, toodete otsingu ja Q&A jaoks. Demonstreerib mitme tööriista orkestreerimist, väliste API-de integratsiooni ja tugevat veahaldust. |
| [5.10 Reaalajas voogedastus](./mcp-realtimestreaming/README.md) | Voogedastus | Reaalajas andmevoog on tänapäeva andmepõhises maailmas muutunud hädavajalikuks, kus ettevõtted ja rakendused vajavad otsest juurdepääsu infole õigeaegsete otsuste tegemiseks. |
| [5.11 Reaalajas veebiotsing](./mcp-realtimesearch/README.md) | Veebiotsing | Kuidas MCP muudab reaalajas veebiotsingut, pakkudes standardiseeritud lähenemist konteksti haldamiseks tehisintellekti mudelite, otsingumootorite ja rakenduste vahel. |
| [5.12 Entra ID autentimine Model Context Protocol serveritele](./mcp-security-entra/README.md) | Entra ID autentimine | Microsoft Entra ID pakub tugevat pilvepõhist identiteedi ja juurdepääsu halduse lahendust, mis aitab tagada, et ainult volitatud kasutajad ja rakendused saavad suhelda teie MCP serveriga. |
| [5.13 Microsoft Foundry agendi integratsioon](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integratsioon | Õpi, kuidas integreerida Model Context Protocol serverid Microsoft Foundry agentidega, võimaldades võimsat tööriistade orkestreerimist ja ettevõtte tehisintellekti võimekust standardiseeritud väliste andmeallikate ühenduste kaudu. |
| [5.14 Konteksti inseneriteadus](./mcp-contextengineering/README.md) | Konteksti inseneriteadus | Tuleviku võimalused konteksti inseneritehnika jaoks MCP serveritele, sealhulgas konteksti optimeerimine, dünaamiline konteksti haldamine ja strateegiad efektiivseks prompt inseneritööks MCP raamistikus. |
| [5.15 MCP kohandatud transport](./mcp-transport/README.md) | Kohandatud transport | Õpi, kuidas rakendada kohandatud transpordimehhanisme spetsiaalsete MCP kommunikatsioonistsenaariumite jaoks. |
| [5.16 Protokolli funktsioonide süvaanalüüs](./mcp-protocol-features/README.md) | Protokolli funktsioonid | Valda täiustatud protokolli funktsioone, sh edenemise teavitused, päringu tühistamine, ressursimallid ja veakäsitluse mustrid. |
| [5.17 Vastanduv mitme agendi mõtlemine](./mcp-adversarial-agents/README.md) | Vastanduvad agendid | Kasuta kahte vastandlikku agenti, kes jagavad ühte MCP tööriistakomplekti, et tabada hallutsinatsioone, esile tuua servjuhtumeid ja toota paremini kalibreeritud väljundit struktureeritud debati kaudu. |

> **Uus MCP spetsifikatsioonis 2025-11-25**: Spetsifikatsioon sisaldab nüüd eksperimentaalset tuge **Töödele** (pikalt kestvad toimingud edenemise jälgimisega), **Tööriista märgistused** (metainfo tööriista käitumise kohta ohutuse tagamiseks), **URL-režiimi esilekutsumine** (spetsiifilise URL-sisu pärimine klientidelt) ja täiustatud **Root-e** (tööruumi konteksti haldamiseks). Täpsema info saamiseks vaata [MCP spetsifikatsiooni muudatuste logi](https://spec.modelcontextprotocol.io/).

## Lisaviited

Kõige värskema info saamiseks täiustatud MCP teemade kohta viita:
- [MCP dokumentatsioon](https://modelcontextprotocol.io/)
- [MCP spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub hoidla](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turvariskid ja leevendused
- [MCP turvasumma töötoa Sherpa](https://azure-samples.github.io/sherpa/) - Praktiline turvakoolitus

## Peamised järeldused

- Multimodaalsed MCP rakendused laiendavad tehisintellekti võimekust tekstist kaugemale
- Skaleeritavus on ettevõtte juurutustele hädavajalik ja seda saab lahendada horisontaalse ja vertikaalse skaleerimisega
- Ulatuslikud turvameetmed kaitsevad andmeid ja tagavad nõuetekohase juurdepääsu kontrolli
- Ettevõtte integratsioon platvormidega nagu Azure OpenAI ja Microsoft AI Foundry parandab MCP võimekust
- Täiustatud MCP rakendused saavad kasu optimeeritud arhitektuuridest ja hoolikast ressursihaldusest

## Harjutus

Kujunda ettevõtte tasemel MCP rakendus konkreetse kasutusjuhtumi jaoks:

1. Määratle oma kasutusjuhtumi multimodaalsed nõudmised
2. Kaardista turvakontrollid tundlike andmete kaitseks
3. Kujunda skaleeritav arhitektuur, mis suudab toime tulla muutuvate koormustega
4. Plaani integratsioonipunktid ettevõtte tehisintellekti süsteemidega
5. Dokumenteeri võimalikud jõudluspiirangud ja leevendusstrateegiad

## Lisamaterjalid

- [Azure OpenAI dokumentatsioon](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentatsioon](https://learn.microsoft.com/en-us/ai-services/)

---

## Mis järgmiseks

Uuri selle mooduli õppetunde alates: [5.1 MCP integratsioon](./mcp-integration/README.md)

Kui oled selle mooduli lõpetanud, jätka: [Moodul 6: Kogukonna panused](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->