# Täiustatud teemad MCP-s

[![Täiustatud MCP: turvalised, skaleeritavad ja multimodaalsed tehisintellekti agendid](../../../translated_images/et/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klõpsa ülalolevale pildile, et vaadata selle tunni videot)_

See peatükk käsitleb mitmeid täiustatud teemasid Model Context Protokolli (MCP) rakendamisel, sealhulgas multimodaalseid integratsioone, skalaarvust, turbe parimaid tavasid ja ettevõtte integratsiooni. Need teemad on olulised vastupidavate ja tootmiskõlblike MCP rakenduste loomiseks, mis suudavad täita kaasaegsete tehisintellekti süsteemide nõudmisi.

## Ülevaade

See tund uurib MCP rakendamise täiustatud kontseptsioone, keskendudes multimodaalsele integratsioonile, skalaarvusele, turbe parimatele tavadele ja ettevõtte integratsioonile. Need teemad on olulised, et ehitada tootmiskõlblikke MCP rakendusi, mis suudavad toime tulla keerukate nõudmistega ettevõttekeskkondades.

> **Vaatame ette:** alljärgnevaid teemasid mõjutab `2026-07-28` MCP spetsifikatsiooni väljalaske kandidaat — Root Contextid (5.4) ja Sampling (5.6) põhinevad primitiividel, mida väljalaske kandidaat märgib aegunud olevat, ja eksperimenteeriv Tasks funktsioon, mis on mainitud Protokolli funktsioonides (5.16), liigub pühendatud Tasks laiendusse. Vaata üksikasju [Mis muutub MCP-s: 2026-07-28 väljaande kandidaat](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Õpieesmärgid

Selle tunni lõpuks oskad sa:

- Rakendada multimodaalseid võimeid MCP raamistikus
- Kujundada skaleeritavaid MCP arhitektuure kõrge nõudluse olukordade jaoks
- Rakendada turbe parimaid tavasid, mis on kooskõlas MCP turbepõhimõtetega
- Integreerida MCP ettevõtte tehisintellekti süsteemidega ja raamistikud
- Optimeerida jõudlust ja töökindlust tootmiskeskkondades

## Tunnid ja näidistööprojektid

| Link | Pealkiri | Kirjeldus |
|------|----------|-----------|
| [5.1 Integratsioon Azure’iga](./mcp-integration/README.md) | Integreeru Azure’iga | Õpi, kuidas integreerida oma MCP server Azuresse |
| [5.2 Multimodaalne näidis](./mcp-multi-modality/README.md) | MCP multimodaalsed näited | Näited heli, pildi ja multimodaalsete vastuste jaoks |
| [5.3 MCP OAuth2 näidis](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demo | Minimalistlik Spring Boot rakendus, mis näitab OAuth2 kasutamist MCP-ga nii autorisatsiooni kui ressursiserverina. Demonstreerib turvalist tokenite väljastamist, kaitstud lõpp-punkte, Azure Container Apps deploy’d ja API haldamise integratsiooni. |
| [5.4 Root Contextid](./mcp-root-contexts/README.md) | Root kontekstid | Õpi rohkem root kontekstidest ja nende rakendamisest |
| [5.5 Marsruutimine](./mcp-routing/README.md) | Marsruutimine | Õpi erinevatest marsruutimise tüüpides |
| [5.6 Proovivõtt](./mcp-sampling/README.md) | Proovivõtt | Õpi, kuidas proovivõtuga töötada |
| [5.7 Skaleerimine](./mcp-scaling/README.md) | Skaleerimine | Õpi skaleerimise kohta |
| [5.8 Turve](./mcp-security/README.md) | Turve | Kaitse oma MCP serverit |
| [5.9 Veebipõhine otsing MCP-s](./web-search-mcp/README.md) | Veebipäring MCP | Python MCP server ja klient, mis integreerub SerpAPI-ga reaalajas veebipäringuks, uudiste, toodete otsinguks ja küsimuste-vastuste jaoks. Demonstreerib mitme tööriista orkestreerimist, väliste API-de integratsiooni ja tugevat vigade käsitlemist. |
| [5.10 Reaalajas voogedastus](./mcp-realtimestreaming/README.md) | Voogedastus | Reaalajas andmete voogedastus on tänapäeva andmepõhises maailmas muutunud hädavajalikuks, kus ettevõtted ja rakendused vajavad infot viivitamatult otsuste tegemiseks.|
| [5.11 Reaalajas veebipäring](./mcp-realtimesearch/README.md) | Veebipäring | Kuidas MCP muudab reaalajas veebipäringu, pakkudes standarditud lähenemisviisi konteksi haldamiseks tehisintellekti mudelite, otsingumootorite ja rakenduste vahel.| 
| [5.12 Entra ID autentimine Model Context Protocol serveritele](./mcp-security-entra/README.md) | Entra ID autentimine | Microsoft Entra ID pakub tugevat pilvepõhist identiteedi ja juurdepääsu haldust, tagades, et ainult volitatud kasutajad ja rakendused saavad suhelda sinu MCP serveriga.|
| [5.13 Microsoft Foundry agendi integratsioon](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integratsioon | Õpi, kuidas integreerida Model Context Protocol servereid Microsoft Foundry agentidega, võimaldades võimsat tööriistade orkestreerimist ja ettevõtte tehisintellekti võimekust standardiseeritud väliste andmeallikate ühendustega.|
| [5.14 Konteksti inseneriteadus](./mcp-contextengineering/README.md) | Konteksti inseneriteadus | Tuleviku võimalused konteksti inseneriteaduse tehnikate osas MCP serveritele, sealhulgas konteksti optimeerimine, dünaamiline konteksti haldus ja tõhusad prompti insenertehnika strateegiad MCP raamistikus.|
| [5.15 MCP kohandatud transport](./mcp-transport/README.md) | Kohandatud transport | Õpi, kuidas rakendada kohandatud transpordimeetodeid spetsiaalseteks MCP kommunikatsiooni stsenaariumiteks.|
| [5.16 Protokolli omaduste süvaanalüüs](./mcp-protocol-features/README.md) | Protokolli omadused | Valda täiustatud protokolli funktsioone, sealhulgas edenemise teavitusi, päringu tühistamist, ressursimalle ja vigade käsitlemise mustreid.|
| [5.17 Vasturündavad mitme agendi põhjendused](./mcp-adversarial-agents/README.md) | Vasturündavad agendid | Kasuta kahte agenti, kelle positsioonid on vastandlikud ja kes jagavad üht MCP tööriistakomplekti, et tabada hallutsinatsioone, tuua välja erandid ja toota paremini kalibreeritud väljundeid struktureeritud debati kaudu.|

> **Uuendused MCP spetsifikatsioonis 2025-11-25**: Spetsifikatsioon sisaldab nüüd eksperimenteeritavat tuge **Tasks’ile** (pikaajalised toimingud edenemise jälgimisega), **Tööriistade annotatsioonidele** (metainfo tööriista käitumise kohta turvalisuse tagamiseks), **URL mode väljakutsumisele** (konkreetse URL sisu päring klientidelt) ja täiustatud **Root‘idele** (tööala konteksti halduseks). Täpsema info leiab [MCP spetsifikatsiooni muudatuste logist](https://spec.modelcontextprotocol.io/).

## Täiendavad viited

Kõige värskema info saamiseks täiustatud MCP teemadel vaata:
- [MCP dokumentatsioon](https://modelcontextprotocol.io/)
- [MCP spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHubi hoidla](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turveriskid ja leevendusmeetmed
- [MCP turbesummiti töötuba (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktiline turbekoolitus

## Peamised järeldused

- Multimodaalsed MCP rakendused laiendavad tehisintellekti võimekust tekstist kaugemale
- Skalaarvus on ettevõtte juurutuste jaoks hädavajalik ja seda saab lahendada horisontaalse ja vertikaalse skaleerimisega
- Ulatuslikud turvameetmed kaitsevad andmeid ja tagavad korrektsed ligipääsuõigused
- Ettevõtte integratsioon platvormidega nagu Azure OpenAI ja Microsoft AI Foundry suurendab MCP võimalusi
- Täiustatud MCP rakendused saavad kasu optimeeritud arhitektuuridest ja hoolikast ressursside haldusest

## Harjutus

Kujunda ettevõtte tasemel MCP rakendus konkreetse kasutusjuhtumi jaoks:

1. Määratle oma kasutusjuhtumi multimodaalsed nõuded
2. Kirjuta üles turbekontrollid tundlike andmete kaitseks
3. Kujunda skaleeritav arhitektuur, mis suudab hallata erinevat koormust
4. Plaani integratsioonipunktid ettevõtte tehisintellekti süsteemidega
5. Dokumenteeri võimalikud jõudluspiirangud ja nende leevendusstrateegiad

## Täiendavad ressursid

- [Azure OpenAI dokumentatsioon](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentatsioon](https://learn.microsoft.com/en-us/ai-services/)

---

## Mis saab edasi

Uuri selle mooduli tunde alustades teemaga: [5.1 MCP integratsioon](./mcp-integration/README.md)

Kui oled selle mooduli lõpetanud, jätka: [Moodul 6: Kogukonna panused](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->