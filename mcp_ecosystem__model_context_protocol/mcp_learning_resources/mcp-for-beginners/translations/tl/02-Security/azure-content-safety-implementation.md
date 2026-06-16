# Pagpapatupad ng Azure Content Safety sa MCP

> **Tinugunang Panganib ng OWASP MCP**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Para patibayin ang seguridad ng MCP laban sa prompt injection, tool poisoning, at iba pang partikular na kahinaan ng AI, lubos na inirerekomenda ang pagsasama ng Azure Content Safety. Ang gabay na ito sa pagpapatupad ay nakaayon sa [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Pagsasama sa MCP Server

Para isama ang Azure Content Safety sa iyong MCP server, idagdag ang content safety filter bilang middleware sa iyong request processing pipeline:

1. I-initialize ang filter sa pagsisimula ng server  
2. I-validate ang lahat ng papasok na tool requests bago iproseso  
3. Suriin ang lahat ng papalabas na responses bago ibalik sa mga kliyente  
4. Mag-log at mag-alerto sa mga paglabag sa kaligtasan  
5. Magpatupad ng angkop na error handling para sa mga nabigong content safety checks  

Nagbibigay ito ng matibay na depensa laban sa:  
- Mga pag-atake ng prompt injection  
- Mga pagtatangkang tool poisoning  
- Data exfiltration sa pamamagitan ng malisyosong inputs  
- Pagbuo ng mapanganib na nilalaman  

## Mga Pinakamahusay na Praktis para sa Pagsasama ng Azure Content Safety

1. **Custom Blocklists**: Gumawa ng mga custom blocklists na partikular para sa mga pattern ng MCP injection  
2. **Severity Tuning**: I-adjust ang severity thresholds base sa iyong partikular na kaso ng paggamit at ang pagtanggap sa panganib  
3. **Comprehensive Coverage**: I-apply ang content safety checks sa lahat ng inputs at outputs  
4. **Performance Optimization**: Isaalang-alang ang pagpapatupad ng caching para sa paulit-ulit na content safety checks  
5. **Fallback Mechanisms**: Magbigay ng malinaw na fallback behaviors kapag hindi available ang content safety services  
6. **User Feedback**: Magbigay ng malinaw na feedback sa mga user kapag na-block ang nilalaman dahil sa mga isyu sa kaligtasan  
7. **Continuous Improvement**: Regular na i-update ang mga blocklists at pattern base sa mga umuusbong na banta  

## Karagdagang Mga Mapagkukunan

### Gabay sa Seguridad ng OWASP MCP
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komprehensibong OWASP MCP Top 10 na may Azure implementation  
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detalyadong mga pattern ng prompt injection mitigation  
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Hands-on Camp 3: I/O Security na sumasaklaw sa content safety  

### Dokumentasyon ng Azure
- [Azure Content Safety Overview](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Ano ang Susunod

- Bumalik sa: [Security Module Overview](./README.md)  
- Magpatuloy sa: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->