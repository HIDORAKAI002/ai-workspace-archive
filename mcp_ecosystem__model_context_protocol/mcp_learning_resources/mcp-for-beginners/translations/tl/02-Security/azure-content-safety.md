# Advanced MCP Security with Azure Content Safety

> **OWASP MCP Risk Addressed**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Nagbibigay ang Azure Content Safety ng ilang makapangyarihang mga kasangkapan na maaaring magpahusay sa seguridad ng iyong mga pagpapatupad ng MCP. Para sa praktikal na karanasan sa pagpapatupad, tingnan ang [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Nagbibigay ang AI Prompt Shields ng Microsoft ng matibay na proteksyon laban sa parehong direktang at di-direktang mga pag-atake ng prompt injection sa pamamagitan ng:

1. **Advanced Detection**: Gumagamit ng machine learning upang matukoy ang mga malisyosong instruksiyon na nakapaloob sa nilalaman.
2. **Spotlighting**: Binabago ang input na teksto upang matulungan ang mga sistema ng AI na makilala ang tamang mga instruksiyon mula sa mga panlabas na input.
3. **Delimiters and Datamarking**: Nagtatakda ng mga hangganan sa pagitan ng pinagkakatiwalaang at hindi pinagkakatiwalaang datos.
4. **Content Safety Integration**: Nakikipagtulungan sa Azure AI Content Safety upang matukoy ang mga pagtatangkang jailbreak at nakakasamang nilalaman.
5. **Continuous Updates**: Regular na ina-update ng Microsoft ang mga mekanismo ng proteksyon laban sa mga umuusbong na banta.

## Implementing Azure Content Safety with MCP

Nagbibigay ang pamamaraang ito ng multi-layered na proteksyon:
- Pagsusuri ng mga input bago iproseso
- Pagpapatunay ng mga output bago ibalik
- Paggamit ng blocklists para sa kilalang nakasasamang mga pattern
- Paggamit ng mga patuloy na ina-update na mga modelo ng content safety ng Azure

## Azure Content Safety Resources

Para matuto nang higit pa tungkol sa pagpapatupad ng Azure Content Safety kasama ang iyong mga MCP server, sumangguni sa mga opisyal na sanggunian:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Opisyal na dokumentasyon para sa Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Matutong pigilan ang mga pag-atake ng prompt injection.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detalyadong sanggunian sa API para sa pagpapatupad ng Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Mabilisan na gabay sa pagpapatupad gamit ang C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Mga client library para sa iba't ibang wika sa pagpo-programa.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Partikular na gabay sa pagtuklas at pagpigil ng mga pagtatangkang jailbreak.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Pinakamahuhusay na kasanayan para sa mabisang pagpapatupad ng content safety.

Para sa mas malawak na pagpapatupad, tingnan ang aming [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## What's Next

- Basahin: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Bumitaw sa: [Security Module Overview](./README.md)
- Ipagpatuloy sa: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:
Ang dokumentong ito ay isinalin gamit ang AI na serbisyo ng pagsasalin na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring may mga pagkakamali o di-tumpak na bahagi. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pinagmumulan ng tama at opisyal na impormasyon. Para sa mahahalagang impormasyon, ipinapayo ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaintindihan o maling interpretasyon na resulta ng paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->