## Početak  

[![Izgradite svoj prvi MCP poslužitelj](../../../translated_images/hr/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Kliknite na gornju sliku za prikaz videa ove lekcije)_

Ovaj odjeljak se sastoji od nekoliko lekcija:

- **1 Vaš prvi poslužitelj**, u ovoj prvoj lekciji naučit ćete kako stvoriti svoj prvi poslužitelj i pregledati ga pomoću inspekcijskog alata, vrijednog načina za testiranje i otklanjanje pogrešaka u vašem poslužitelju, [na lekciju](01-first-server/README.md)

- **2 Klijent**, u ovoj lekciji naučit ćete kako napisati klijenta koji se može povezati s vašim poslužiteljem, [na lekciju](02-client/README.md)

- **3 Klijent s LLM-om**, još bolji način pisanja klijenta je dodavanje LLM-a tako da može "pregovarati" s vašim poslužiteljem što treba učiniti, [na lekciju](03-llm-client/README.md)

- **4 Korištenje GitHub Copilot agent moda poslužitelja u Visual Studio Code-u**. Ovdje gledamo kako pokrenuti naš MCP poslužitelj unutar Visual Studio Code-a, [na lekciju](04-vscode/README.md)

- **5 stdio Transport Poslužitelj** stdio transport je preporučeni standard za lokalnu MCP komunikaciju između poslužitelja i klijenta, pružajući sigurnu komunikaciju zasnovanu na potprocesima s ugrađenom izolacijom procesa [na lekciju](05-stdio-server/README.md)

- **6 HTTP Streaming s MCP-om (Streamable HTTP)**. Naučite o modernom HTTP streaming transportu (preporučeni pristup za udaljene MCP poslužitelje prema [MCP specifikaciji 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), obavijestima o napretku, i kako implementirati skalabilne, stvarno-vremenske MCP poslužitelje i klijente koristeći Streamable HTTP. [na lekciju](06-http-streaming/README.md)

- **7 Korištenje AI Toolkit za VSCode** za korištenje i testiranje vaših MCP klijenata i poslužitelja [na lekciju](07-aitk/README.md)

- **8 Testiranje**. Ovdje ćemo se posebno fokusirati na to kako možemo testirati naš poslužitelj i klijenta na različite načine, [na lekciju](08-testing/README.md)

- **9 Implementacija**. Ovo poglavlje će pogledati različite načine implementacije vaših MCP rješenja, [na lekciju](09-deployment/README.md)

- **10 Napredna uporaba poslužitelja**. Ovo poglavlje pokriva naprednu uporabu poslužitelja, [na lekciju](./10-advanced/README.md)

- **11 Autentifikacija**. Ovo poglavlje pokriva kako dodati jednostavnu autentifikaciju, od Basic Auth do korištenja JWT-a i RBAC-a. Preporučuje se da započnete ovdje, a zatim pogledate Napredne teme u poglavlju 5 i provedete dodatno pojačavanje sigurnosti prema preporukama u poglavlju 2, [na lekciju](./11-simple-auth/README.md)

- **12 MCP Hostovi**. Konfigurirajte i koristite popularne MCP host klijente uključujući Claude Desktop, Cursor, Cline, i Windsurf. Naučite o vrstama transporta i otklanjanju problema, [na lekciju](./12-mcp-hosts/README.md)

- **13 MCP Inspektor**. Interaktivno otklanjajte greške i testirajte vaše MCP poslužitelje pomoću MCP Inspektor alata. Naučite kako rješavati probleme alata, resursa i protokol poruka, [na lekciju](./13-mcp-inspector/README.md)

- **14 Uzorkovanje**. Kreirajte MCP poslužitelje koji surađuju s MCP klijentima na zadacima povezanima s LLM-om (zastarjelo u `2026-07-28` kandidatu za izdanje; još uvijek važeće za `2025-11-25`). [na lekciju](./14-sampling/README.md)

- **15 MCP Aplikacije**. Izgradite MCP poslužitelje koji također odgovaraju uputama za korisničko sučelje, [na lekciju](./15-mcp-apps/README.md)

Model Context Protocol (MCP) je otvoreni protokol koji standardizira kako aplikacije pružaju kontekst LLM-ovima. Zamislite MCP kao USB-C priključak za AI aplikacije - pruža standardizirani način povezivanja AI modela s različitim izvorima podataka i alatima.

## Ciljevi učenja

Do kraja ove lekcije bit ćete u mogućnosti:

- Postaviti razvojna okruženja za MCP u C#, Javi, Pythonu, TypeScriptu i JavaScriptu
- Izgraditi i implementirati osnovne MCP poslužitelje s prilagođenim značajkama (resursi, podsticaji i alati)
- Kreirati host aplikacije koje se povezuju s MCP poslužiteljima
- Testirati i otklanjati pogreške MCP implementacija
- Razumjeti uobičajene izazove postavljanja i njihova rješenja
- Povezati vaše MCP implementacije s popularnim LLM servisima

## Postavljanje vašeg MCP okruženja

Prije nego počnete raditi s MCP-om, važno je pripremiti razvojno okruženje i razumjeti osnovni tijek rada. Ovaj odjeljak će vas voditi kroz početne korake postavljanja kako biste osigurali glatki početak s MCP-om.

### Preduvjeti

Prije nego što zaronite u MCP razvoj, osigurajte da imate:

- **Razvojno okruženje**: za vaš odabrani jezik (C#, Java, Python, TypeScript ili JavaScript)
- **IDE/Uređivač**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm ili bilo koji moderan uređivač koda
- **Upravitelji paketa**: NuGet, Maven/Gradle, pip ili npm/yarn
- **API ključevi**: za bilo koje AI servise koje planirate koristiti u vašim host aplikacijama


### Službeni SDK-ovi

U nadolazećim poglavljima vidjet ćete rješenja napravljena korištenjem Pythona, TypeScripta, Jave i .NET-a. Evo svih službeno podržanih SDK-ova.

MCP pruža službene SDK-ove za više jezika (usklađeno s [MCP specifikacijom 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Održava se u suradnji s Microsoftom
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Održava se u suradnji sa Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Službena TypeScript implementacija
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Službena Python implementacija (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Službena Kotlin implementacija
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Održava se u suradnji s Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Službena Rust implementacija
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Službena Go implementacija

## Ključne točke

- Postavljanje razvojног okruženja za MCP je jednostavno uz specifične SDK-ove za jezik
- Izgradnja MCP poslužitelja uključuje kreiranje i registraciju alata s jasnim shemama
- MCP klijenti se povezuju s poslužiteljima i modelima kako bi iskoristili proširene mogućnosti
- Testiranje i otklanjanje pogrešaka su ključni za pouzdane MCP implementacije
- Opcije implementacije variraju od lokalnog razvoja do rješenja u oblaku

## Vježbanje

Imamo niz primjera koji nadopunjuju vježbe koje ćete vidjeti u svim poglavljima ovog odjeljka. Osim toga, svako poglavlje ima i svoje vježbe i zadatke

- [Java Kalkulator](./samples/java/calculator/README.md)
- [.Net Kalkulator](../../../03-GettingStarted/samples/csharp)
- [JavaScript Kalkulator](./samples/javascript/README.md)
- [TypeScript Kalkulator](./samples/typescript/README.md)
- [Python Kalkulator](../../../03-GettingStarted/samples/python)

## Dodatni resursi

- [Izgradnja agenata koristeći Model Context Protocol na Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Udaljeni MCP s Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Što slijedi

Započnite s prvom lekcijom: [Kreiranje vašeg prvog MCP poslužitelja](01-first-server/README.md)

Nakon što završite ovaj modul, nastavite na: [Modul 4: Praktična implementacija](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->