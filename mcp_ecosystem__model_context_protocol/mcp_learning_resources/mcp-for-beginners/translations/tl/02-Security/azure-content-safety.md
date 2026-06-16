# Advanced MCP Security with Azure Content Safety

> **OWASP MCP Risk Addressed**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Nagbibigay ang Azure Content Safety ng ilang makapangyarihang kasangkapan na maaaring magpahusay sa seguridad ng iyong mga implementasyon ng MCP. Para sa hands-on na karanasan sa implementasyon, tingnan ang [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Nagbibigay ang AI Prompt Shields ng Microsoft ng matibay na proteksyon laban sa parehong direktang at di-direktang mga pag-atake ng prompt injection sa pamamagitan ng:

1. **Advanced Detection**: Gumagamit ng machine learning upang tuklasin ang mga malisyosong instruksyon na nakabaon sa nilalaman.
2. **Spotlighting**: Binabago ang input na teksto upang makatulong sa mga AI system na makilala ang mga wastong instruksyon at panlabas na input.
3. **Delimiters and Datamarking**: Nagmamarka ng mga hangganan sa pagitan ng pinagkakatiwalaan at di-pinagkakatiwalaang data.
4. **Content Safety Integration**: Nakikipagtulungan sa Azure AI Content Safety upang matukoy ang mga pagtatangkang jailbreak at mapanganib na nilalaman.
5. **Continuous Updates**: Regular na ina-update ng Microsoft ang mga mekanismo ng proteksyon laban sa mga bagong banta.

## Implementing Azure Content Safety with MCP

Nagbibigay ang pamamaraang ito ng maraming layer ng proteksyon:
- Sinusuri ang mga input bago iproseso
- Vinedib ang mga output bago ibalik
- Gumagamit ng blocklists para sa kilalang mapanganib na mga pattern
- Sinasamantala ang patuloy na ina-update na mga modelong pangseguridad ng nilalaman ng Azure

## Azure Content Safety Resources

Upang matuto nang higit pa tungkol sa pag-implementa ng Azure Content Safety sa iyong MCP servers, sumangguni sa mga opisyal na resources na ito:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Opisyal na dokumentasyon para sa Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Alamin kung paano maiwasan ang mga pag-atake sa prompt injection.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detalyadong API reference para sa pag-implementa ng Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Mabilisang gabay sa implementasyon gamit ang C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Mga client library para sa iba't ibang programming languages.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Tiyak na patnubay sa pagtukoy at pag-iwas sa mga pagtatangkang jailbreak.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Mga pinakamahusay na kasanayan para sa epektibong pag-implementa ng content safety.

Para sa mas malalim na implementasyon, tingnan ang aming [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## What's Next

- Read: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Return to: [Security Module Overview](./README.md)
- Continue to: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->