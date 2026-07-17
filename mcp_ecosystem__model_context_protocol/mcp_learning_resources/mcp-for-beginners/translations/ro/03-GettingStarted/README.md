## Începutul  

[![Build Your First MCP Server](../../../translated_images/ro/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Clic pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_

Această secțiune cuprinde mai multe lecții:

- **1 Primul tău server**, în această prima lecție vei învăța cum să creezi primul tău server și să îl inspectezi cu instrumentul inspector, o metodă valoroasă de a testa și depana serverul, [la lecție](01-first-server/README.md)

- **2 Client**, în această lecție vei învăța cum să scrii un client care se poate conecta la serverul tău, [la lecție](02-client/README.md)

- **3 Client cu LLM**, o metodă și mai bună de a scrie un client este adăugând un LLM pentru a "negocia" cu serverul tău ce să facă, [la lecție](03-llm-client/README.md)

- **4 Consumând un modul GitHub Copilot Agent pentru server în Visual Studio Code**. Aici vom arăta rularea Serverului MCP din Visual Studio Code, [la lecție](04-vscode/README.md)

- **5 Server Transport stdio** transportul stdio este standardul recomandat pentru comunicarea locală server-client MCP, oferind comunicare securizată bazată pe subprocess și izolare integrată a proceselor [la lecție](05-stdio-server/README.md)

- **6 Streaming HTTP cu MCP (HTTP Streamabil)**. Află despre transportul modern HTTP streaming (abordarea recomandată pentru servere MCP la distanță conform [Specificației MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), notificări de progres și cum să implementezi servere și clienți MCP scalabili, în timp real, folosind HTTP Streamabil. [la lecție](06-http-streaming/README.md)

- **7 Utilizarea AI Toolkit pentru VSCode** pentru a consuma și testa Clienții și Serverele MCP [la lecție](07-aitk/README.md)

- **8 Testare**. Aici ne vom concentra în special pe cum putem testa serverul și clientul în diferite moduri, [la lecție](08-testing/README.md)

- **9 Implementare**. Acest capitol privește diferite moduri de a implementa soluțiile MCP, [la lecție](09-deployment/README.md)

- **10 Utilizare avansată a serverului**. Acest capitol acoperă utilizarea avansată a serverului, [la lecție](./10-advanced/README.md)

- **11 Autentificare**. Acest capitol acoperă cum să adaugi autentificare simplă, de la Basic Auth la folosirea JWT și RBAC. Se recomandă să începi aici și apoi să consulți Subiecte Avansate în Capitolul 5 și să aplici întăriri suplimentare de securitate prin recomandările din Capitolul 2, [la lecție](./11-simple-auth/README.md)

- **12 Gazde MCP**. Configurează și folosește clienți populari MCP gazdă, inclusiv Claude Desktop, Cursor, Cline, și Windsurf. Învață tipurile de transport și depanare, [la lecție](./12-mcp-hosts/README.md)

- **13 Inspector MCP**. Depanează și testează serverele MCP interactiv, folosind instrumentul Inspector MCP. Învață să depanezi uneltele, resursele și mesajele de protocol, [la lecție](./13-mcp-inspector/README.md)

- **14 Eșantionare**. Creează Servere MCP care colaborează cu clienții MCP pe sarcini legate de LLM (depreciat în candidatul de lansare `2026-07-28`; încă valabil pentru `2025-11-25`). [la lecție](./14-sampling/README.md)

- **15 Aplicații MCP**. Construiește Servere MCP care răspund și cu instrucțiuni UI, [la lecție](./15-mcp-apps/README.md)

Protocolul Model Context (MCP) este un protocol deschis care standardizează modul în care aplicațiile furnizează context pentru LLM-uri. Gândește-te la MCP ca la un port USB-C pentru aplicații AI - oferă o metodă standardizată pentru a conecta modelele AI la diferite surse de date și unelte.

## Obiective de Învățare

La finalul acestei lecții vei putea să:

- Configurezi medii de dezvoltare pentru MCP în C#, Java, Python, TypeScript și JavaScript
- Construiești și implementezi servere MCP de bază cu caracteristici personalizate (resurse, prompturi și unelte)
- Creezi aplicații gazdă care se conectează la serverele MCP
- Testezi și depanezi implementările MCP
- Înțelegi provocările comune de configurare și soluțiile acestora
- Conectezi implementările MCP la servicii LLM populare

## Configurarea Mediului MCP

Înainte de a începe să lucrezi cu MCP, este important să-ți pregătești mediul de dezvoltare și să înțelegi fluxul de lucru de bază. Această secțiune te va ghida prin pașii inițiali de configurare pentru a asigura un început lin cu MCP.

### Cerințe preliminare

Înainte de a începe dezvoltarea MCP, asigură-te că ai:

- **Mediu de dezvoltare**: Pentru limbajul ales (C#, Java, Python, TypeScript sau JavaScript)
- **IDE/Editor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm sau orice editor de cod modern
- **Gestionare pachete**: NuGet, Maven/Gradle, pip sau npm/yarn
- **Chei API**: Pentru orice servicii AI pe care intenționezi să le folosești în aplicațiile tale gazdă


### SDK-uri Oficiale

În capitolele următoare vei vedea soluții construite folosind Python, TypeScript, Java și .NET. Iată toate SDK-urile oficiale suportate.

MCP oferă SDK-uri oficiale pentru multiple limbaje (aliniate cu [Specificația MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [SDK C#](https://github.com/modelcontextprotocol/csharp-sdk) - Menținută în colaborare cu Microsoft
- [SDK Java](https://github.com/modelcontextprotocol/java-sdk) - Menținută în colaborare cu Spring AI
- [SDK TypeScript](https://github.com/modelcontextprotocol/typescript-sdk) - Implementarea oficială TypeScript
- [SDK Python](https://github.com/modelcontextprotocol/python-sdk) - Implementarea oficială Python (FastMCP)
- [SDK Kotlin](https://github.com/modelcontextprotocol/kotlin-sdk) - Implementarea oficială Kotlin
- [SDK Swift](https://github.com/modelcontextprotocol/swift-sdk) - Menținută în colaborare cu Loopwork AI
- [SDK Rust](https://github.com/modelcontextprotocol/rust-sdk) - Implementarea oficială Rust
- [SDK Go](https://github.com/modelcontextprotocol/go-sdk) - Implementarea oficială Go

## Puncte Cheie

- Configurarea unui mediu de dezvoltare MCP este simplă cu SDK-uri specifice limbajelor
- Construirea serverelor MCP implică crearea și înregistrarea unor unelte cu scheme clare
- Clienții MCP se conectează la servere și modele pentru a folosi capabilități extinse
- Testarea și depanarea sunt esențiale pentru implementări MCP fiabile
- Opțiunile de implementare variază de la dezvoltare locală la soluții cloud

## Practică

Avem un set de exemple care completează exercițiile pe care le vei vedea în toate capitolele din această secțiune. În plus, fiecare capitol are propriile exerciții și teme

- [Calculator Java](./samples/java/calculator/README.md)
- [Calculator .Net](../../../03-GettingStarted/samples/csharp)
- [Calculator JavaScript](./samples/javascript/README.md)
- [Calculator TypeScript](./samples/typescript/README.md)
- [Calculator Python](../../../03-GettingStarted/samples/python)

## Resurse Suplimentare

- [Construirea Agenților folosind Model Context Protocol pe Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [MCP la distanță cu Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [Agent MCP .NET OpenAI](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Ce urmează

Începe cu prima lecție: [Crearea primului tău Server MCP](01-first-server/README.md)

Odată ce ai terminat acest modul, continuă la: [Modulul 4: Implementare Practică](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->