## Pagsisimula  

[![Build Your First MCP Server](../../../translated_images/tl/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(I-click ang larawan sa itaas upang mapanood ang video ng araling ito)_

Binubuo ang seksyong ito ng ilang mga aralin:

- **1 Ang iyong unang server**, sa unang araling ito, matutunan mo kung paano gumawa ng iyong unang server at suriin ito gamit ang inspector tool, isang mahalagang paraan upang subukan at i-debug ang iyong server, [sa aralin](01-first-server/README.md)

- **2 Kliyente**, sa araling ito, matutunan mo kung paano magsulat ng kliyente na maaaring kumonekta sa iyong server, [sa aralin](02-client/README.md)

- **3 Kliyente na may LLM**, isang mas mahusay na paraan ng pagsulat ng kliyente ay sa pamamagitan ng pagdagdag ng LLM dito upang "makipagnegosasyon" sa iyong server kung ano ang gagawin, [sa aralin](03-llm-client/README.md)

- **4 Paggamit ng server mode ng GitHub Copilot Agent sa Visual Studio Code**. Dito, titingnan natin ang pagpapatakbo ng ating MCP Server mula sa loob ng Visual Studio Code, [sa aralin](04-vscode/README.md)

- **5 stdio Transport Server** ang stdio transport ay ang inirerekomendang pamantayan para sa lokal na komunikasyon ng MCP server-sa-kliyente, na nagbibigay ng secure na komunikasyon gamit ang subprocess na may built-in na isolation ng proseso [sa aralin](05-stdio-server/README.md)

- **6 HTTP Streaming gamit ang MCP (Streamable HTTP)**. Alamin ang tungkol sa modernong HTTP streaming transport (ang inirerekomendang paraan para sa remote MCP servers ayon sa [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), mga notification ng progreso, at kung paano magpatupad ng scalable, real-time MCP servers at clients gamit ang Streamable HTTP. [sa aralin](06-http-streaming/README.md)

- **7 Paggamit ng AI Toolkit para sa VSCode** upang gamitin at subukan ang iyong MCP Clients at Servers [sa aralin](07-aitk/README.md)

- **8 Pagsubok**. Dito ay magtutuon tayo kung paano natin masusubukan ang ating server at client sa iba't ibang paraan, [sa aralin](08-testing/README.md)

- **9 Deployment**. Tatalakayin ng kabanatang ito ang iba't ibang paraan ng pag-deploy ng iyong mga solusyon sa MCP, [sa aralin](09-deployment/README.md)

- **10 Advanced na paggamit ng server**. Saklaw ng kabanatang ito ang advanced na paggamit ng server, [sa aralin](./10-advanced/README.md)

- **11 Auth**. Saklaw ng kabanatang ito kung paano magdagdag ng simpleng auth, mula sa Basic Auth hanggang sa paggamit ng JWT at RBAC. Hinihikayat kang magsimula dito at pagkatapos ay tingnan ang Advanced Topics sa Kabanata 5 at magsagawa ng karagdagang seguridad ayon sa mga rekomendasyon sa Kabanata 2, [sa aralin](./11-simple-auth/README.md)

- **12 MCP Hosts**. I-configure at gamitin ang mga popular na MCP host clients kabilang ang Claude Desktop, Cursor, Cline, at Windsurf. Alamin ang mga uri ng transport at troubleshooting, [sa aralin](./12-mcp-hosts/README.md)

- **13 MCP Inspector**. I-debug at subukan ang iyong MCP servers nang interactive gamit ang MCP Inspector tool. Matutunan ang troubleshooting ng mga tools, resources, at mga protocol message, [sa aralin](./13-mcp-inspector/README.md)

- **14 Sampling**. Gumawa ng MCP Servers na nakikipagtulungan sa mga MCP clients sa mga gawain na may kinalaman sa LLM (deprecated sa `2026-07-28` release candidate; valid pa rin para sa `2025-11-25`). [sa aralin](./14-sampling/README.md)

- **15 MCP Apps**. Bumuo ng MCP Servers na sumusagot din gamit ang UI instructions, [sa aralin](./15-mcp-apps/README.md)

Ang Model Context Protocol (MCP) ay isang bukas na protocol na nagsisiguro kung paano nagbibigay ang mga aplikasyon ng konteksto sa LLMs. Isipin ang MCP na parang USB-C port para sa mga AI application - nagbibigay ito ng standardisadong paraan upang ikonekta ang mga AI model sa iba't ibang mga pinagmumulan ng data at mga tool.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng araling ito, magagawa mong:

- Mag-set up ng mga environment sa pag-develop para sa MCP sa C#, Java, Python, TypeScript, at JavaScript
- Magtayo at mag-deploy ng mga basic MCP servers na may custom na tampok (resources, prompts, at tools)
- Gumawa ng mga host application na kumokonekta sa MCP servers
- Subukan at i-debug ang mga implementasyon ng MCP
- Maunawaan ang karaniwang mga hamon sa setup at ang mga solusyon nito
- Ikonekta ang iyong mga implementasyon ng MCP sa mga popular na serbisyo ng LLM

## Pag-set Up ng Iyong MCP Environment

Bago ka magsimulang magtrabaho gamit ang MCP, mahalagang ihanda ang iyong development environment at maintindihan ang pangunahing workflow. Gabay ka ng seksyong ito sa mga unang hakbang ng setup upang matiyak ang maayos na pagsisimula ng paggamit ng MCP.

### Mga Kinakailangan

Bago sumabak sa pag-develop ng MCP, siguraduhing mayroon kang:

- **Development Environment**: Para sa napiling wika (C#, Java, Python, TypeScript, o JavaScript)
- **IDE/Editor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm, o kahit anong modernong code editor
- **Package Managers**: NuGet, Maven/Gradle, pip, o npm/yarn
- **API Keys**: Para sa anumang AI services na balak mong gamitin sa iyong mga host application


### Opisyal na SDKs

Sa mga susunod na kabanata makikita mo ang mga solusyon na ginawa gamit ang Python, TypeScript, Java at .NET. Narito ang lahat ng opisyal na suportadong SDKs.

Nagbibigay ang MCP ng opisyal na SDKs para sa iba't ibang wika (ayon sa [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Pinapanatili sa pakikipagtulungan sa Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Pinapanatili sa pakikipagtulungan sa Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Ang opisyal na implementasyon ng TypeScript
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Ang opisyal na implementasyon ng Python (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Ang opisyal na implementasyon ng Kotlin
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Pinapanatili sa pakikipagtulungan sa Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Ang opisyal na implementasyon ng Rust
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Ang opisyal na implementasyon ng Go

## Pangunahing Mga Punto

- Ang pag-set up ng MCP development environment ay diretso gamit ang mga language-specific na SDKs
- Ang paggawa ng MCP servers ay kinabibilangan ng paglikha at pagrerehistro ng mga tools na may malinaw na mga schema
- Kumokonekta ang MCP clients sa mga server at modelo upang gamitin ang pinalawak na mga kakayahan
- Mahalagang subukan at i-debug para sa maaasahan na implementasyon ng MCP
- Ang mga opsyon sa deployment ay mula lokal na pag-develop hanggang sa mga cloud-based na solusyon

## Pagsasanay

Mayroon kaming mga set ng mga halimbawa na pumapantay sa mga ehersisyo na makikita mo sa lahat ng kabanata sa seksyong ito. Bukod pa rito bawat kabanata ay may sarili ring mga ehersisyo at asignatura

- [Java Calculator](./samples/java/calculator/README.md)
- [.Net Calculator](../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](./samples/javascript/README.md)
- [TypeScript Calculator](./samples/typescript/README.md)
- [Python Calculator](../../../03-GettingStarted/samples/python)

## Karagdagang Mga Mapagkukunan

- [Pagbuo ng Mga Agent gamit ang Model Context Protocol sa Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Remote MCP gamit ang Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Ano ang susunod

Magsimula sa unang aralin: [Paglikha ng iyong unang MCP Server](01-first-server/README.md)

Kapag natapos mo na ang module na ito, magpatuloy sa: [Module 4: Praktikal na Pagpapatupad](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->