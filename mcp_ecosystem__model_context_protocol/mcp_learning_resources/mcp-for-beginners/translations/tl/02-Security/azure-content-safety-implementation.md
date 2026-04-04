# Pagpapatupad ng Azure Content Safety gamit ang MCP

> **OWASP MCP Risk na Tinatarget**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Upang mapalakas ang seguridad ng MCP laban sa prompt injection, tool poisoning, at iba pang AI-specific na mga kahinaan, lubos na inirerekomenda ang pagsasama ng Azure Content Safety. Ang gabay na ito sa pagpapatupad ay naaayon sa [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Pagsasama sa MCP Server

Upang isama ang Azure Content Safety sa iyong MCP server, idagdag ang content safety filter bilang middleware sa iyong request processing pipeline:

1. I-initialize ang filter habang nagsisimula ang server
2. I-validate ang lahat ng papasok na tool requests bago iproseso
3. Suriin ang lahat ng papalabas na responses bago ibalik sa mga kliyente
4. Mag-log at mag-alerto sa mga paglabag sa kaligtasan
5. Magpatupad ng angkop na error handling para sa mga nabigong content safety checks

Nagbibigay ito ng matibay na depensa laban sa:
- Mga prompt injection attack
- Mga pagtatangkang tool poisoning
- Pag-exfiltrate ng datos gamit ang malisyosong input
- Pagbuo ng nakakapinsalang nilalaman

## Mga Pinakamahusay na Praktis para sa Pagsasama ng Azure Content Safety

1. **Custom Blocklists**: Gumawa ng mga custom blocklists na partikular para sa MCP injection patterns
2. **Severity Tuning**: I-adjust ang severity thresholds base sa iyong partikular na gamit at pagtanggap sa panganib
3. **Comprehensive Coverage**: Ilapat ang content safety checks sa lahat ng inputs at outputs
4. **Performance Optimization**: Isaalang-alang ang pag-implement ng caching para sa paulit-ulit na content safety checks
5. **Fallback Mechanisms**: Tukuyin ang malinaw na fallback behaviors kapag hindi magagamit ang content safety services
6. **User Feedback**: Magbigay ng malinaw na feedback sa mga gumagamit kapag na-block ang nilalaman dahil sa mga alalahanin sa kaligtasan
7. **Continuous Improvement**: Regular na i-update ang mga blocklists at patterns base sa mga bagong banta

## Karagdagang Mga Mapagkukunan

### OWASP MCP Security Guidance
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komprehensibong OWASP MCP Top 10 na may Azure na pagpapatupad
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detalyadong mga pattern para sa mitigation ng prompt injection
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Hands-on Camp 3: I/O Security na sumasaklaw sa content safety

### Azure Documentation
- [Azure Content Safety Overview](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Ano ang Susunod

- Bumalik sa: [Security Module Overview](./README.md)
- Magpatuloy sa: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagsubok sa Pananagutan**:  
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI na pagsasalin na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't aming pinagsisikapan ang katumpakan, mangyaring tandaan na ang mga awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na maaaring magmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->