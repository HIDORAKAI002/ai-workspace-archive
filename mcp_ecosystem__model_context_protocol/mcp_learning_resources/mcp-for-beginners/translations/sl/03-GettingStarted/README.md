## Začetek  

[![Zgradi svoj prvi MCP strežnik](../../../translated_images/sl/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Kliknite na zgornjo sliko za ogled videoposnetka tega lekcijskega gradiva)_

Ta razdelek vsebuje več lekcij:

- **1 Tvoj prvi strežnik**, v tej prvi lekciji se boste naučili, kako ustvariti svoj prvi strežnik in ga pregledati z orodjem za inšpekcijo, koristnim za testiranje in odpravljanje napak na strežniku, [do lekcije](01-first-server/README.md)

- **2 Odjemalec**, v tej lekciji se boste naučili pisati odjemalca, ki se lahko poveže z vašim strežnikom, [do lekcije](02-client/README.md)

- **3 Odjemalec z LLM**, še boljši način pisanja odjemalca je dodajanje LLM, da lahko "pogaja" s strežnikom, kaj storiti, [do lekcije](03-llm-client/README.md)

- **4 Uporaba načina GitHub Copilot agent za strežnik znotraj Visual Studio Code**. Tukaj si bomo ogledali zaganjanje našega MCP strežnika znotraj Visual Studio Code, [do lekcije](04-vscode/README.md)

- **5 stdio transportni strežnik** stdio transport je priporočeni standard za lokalno komunikacijo med MCP strežnikom in odjemalcem, ki zagotavlja varno komunikacijo s podsistemom z vgrajeno izolacijo procesov [do lekcije](05-stdio-server/README.md)

- **6 HTTP pretakanje z MCP (Streamable HTTP)**. Spoznajte sodoben prenosni protokol HTTP pretakanja (priporočeni pristop za oddaljene MCP strežnike po [MCP specifikaciji 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), obvestila o napredku in kako implementirati razširljive, realne MCP strežnike in odjemalce z uporabo Streamable HTTP. [do lekcije](06-http-streaming/README.md)

- **7 Uporaba AI orodij za VSCode** za uporabo in testiranje MCP odjemalcev in strežnikov [do lekcije](07-aitk/README.md)

- **8 Testiranje**. Tukaj se bomo osredotočili na različne načine, kako lahko preizkusimo naš strežnik in odjemalca, [do lekcije](08-testing/README.md)

- **9 Razmestitev**. Ta poglavje bo predstavilo različne načine razmestitve vaših MCP rešitev, [do lekcije](09-deployment/README.md)

- **10 Napredna uporaba strežnika**. To poglavje pokriva napredno uporabo strežnika, [do lekcije](./10-advanced/README.md)

- **11 Avtentikacija**. To poglavje zajema dodajanje preproste avtentikacije, od osnovne avtentikacije do uporabe JWT in RBAC. Priporočamo, da začnete tukaj, nato pa si ogledate Napredne teme v 5. poglavju in naredite dodatno krepitev varnosti po priporočilih iz drugega poglavja, [do lekcije](./11-simple-auth/README.md)

- **12 MCP gostitelji**. Konfigurirajte in uporabljajte priljubljene MCP gostiteljske odjemalce vključno z Claude Desktop, Cursor, Cline in Windsurf. Spoznajte vrste transportov in odpravljanje težav, [do lekcije](./12-mcp-hosts/README.md)

- **13 MCP inšpektor**. Interaktivno odpravljanje napak in testiranje MCP strežnikov z orodjem MCP inšpektor. Naučite se odpravljanja težav, virov in protokolnih sporočil, [do lekcije](./13-mcp-inspector/README.md)

- **14 Vzorcevanje**. Ustvarjanje MCP strežnikov, ki sodelujejo z MCP odjemalci pri nalogah, povezanih z LLM (ukinjeno v kandidatni različici `2026-07-28`; še vedno veljavno za `2025-11-25`). [do lekcije](./14-sampling/README.md)

- **15 MCP aplikacije**. Gradnja MCP strežnikov, ki prav tako odgovarjajo z UI navodili, [do lekcije](./15-mcp-apps/README.md)

Model Context Protocol (MCP) je odprt protokol, ki standardizira, kako aplikacije zagotavljajo kontekst LLM-om. MCP lahko primerjate z USB-C vhodom za AI aplikacije - zagotavlja standardiziran način povezovanja AI modelov s različnimi viri podatkov in orodji.

## Cilji učenja

Po zaključku te lekcije boste znali:

- Nastaviti razvojna okolja za MCP v C#, Javi, Pythonu, TypeScriptu in JavaScriptu
- Zgraditi in razmestiti osnovne MCP strežnike z lastnimi funkcijami (viri, pozivi in orodja)
- Ustvariti gostiteljske aplikacije, ki se povezujejo z MCP strežniki
- Testirati in odpravljati napake MCP implementacij
- Razumeti pogoste težave pri nastavitvi in njihove rešitve
- Povezati vaše MCP implementacije s priljubljenimi LLM storitvami

## Nastavitev vašega MCP okolja

Preden začnete delati z MCP, je pomembno pripraviti razvojno okolje in razumeti osnovni potek dela. Ta razdelek vas bo vodil skozi začetne korake nastavitve, da boste z MCP začeli gladko.

### Predpogoji

Preden se lotite razvoja MCP, poskrbite, da imate:

- **Razvojno okolje**: Za izbrani programski jezik (C#, Java, Python, TypeScript ali JavaScript)
- **IDE/Urejevalnik**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm ali kateri koli moderni urejevalnik kode
- **Upravitelji paketov**: NuGet, Maven/Gradle, pip ali npm/yarn
- **API ključi**: Za katero koli AI storitev, ki jih nameravate uporabiti v vaših gostiteljskih aplikacijah


### Uradni SDK-ji

V prihajajočih poglavjih boste videli rešitve, zgrajene z uporabo Python, TypeScript, Java in .NET. Tukaj so vsi uradno podprti SDK-ji.

MCP nudi uradne SDK-je za več jezikov (usklajene z [MCP Specifikacijo 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Vzdrževan v sodelovanju z Microsoftom
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Vzdrževan v sodelovanju s Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Uradna TypeScript implementacija
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Uradna Python implementacija (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Uradna Kotlin implementacija
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Vzdrževan v sodelovanju z Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Uradna Rust implementacija
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Uradna Go implementacija

## Glavne ugotovitve

- Nastavitev MCP razvojnega okolja je enostavna z jezikovno specifičnimi SDK-ji
- Gradnja MCP strežnikov vključuje ustvarjanje in registracijo orodij z jasnimi shemami
- MCP odjemalci se povezujejo s strežniki in modeli za izkoriščanje razširjenih zmogljivosti
- Testiranje in odpravljanje napak so ključni za zanesljive MCP implementacije
- Možnosti razmestitve segajo od lokalnega razvoja do rešitev v oblaku

## Praksa

Imamo nabor vzorcev, ki dopolnjujejo vajo, ki jo boste videli v vseh poglavjih tega razdelka. Poleg tega ima vsako poglavje tudi svoje vaje in naloge

- [Java Kalkulator](./samples/java/calculator/README.md)
- [.Net Kalkulator](../../../03-GettingStarted/samples/csharp)
- [JavaScript Kalkulator](./samples/javascript/README.md)
- [TypeScript Kalkulator](./samples/typescript/README.md)
- [Python Kalkulator](../../../03-GettingStarted/samples/python)

## Dodatni viri

- [Gradnja agentov z Model Context Protocol na Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Oddaljeni MCP z Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Kaj sledi

Začnite s prvo lekcijo: [Ustvarjanje vašega prvega MCP strežnika](01-first-server/README.md)

Ko zaključite ta modul, nadaljujte z: [Modul 4: Praktična implementacija](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->