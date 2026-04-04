# Implementarea Azure Content Safety cu MCP

> **Risc MCP OWASP Abordat**: [MCP06 - Injecție Promptă prin Payload-uri Contextuale](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Pentru a întări securitatea MCP împotriva injecției prompte, otrăvirii uneltelor și altor vulnerabilități specifice AI, se recomandă puternic integrarea Azure Content Safety. Acest ghid de implementare este aliniat cu [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Securitatea I/O.

## Integrare cu serverul MCP

Pentru a integra Azure Content Safety cu serverul dvs. MCP, adăugați filtrul de siguranță a conținutului ca middleware în fluxul de procesare a cererilor:

1. Inițializați filtrul la pornirea serverului
2. Validați toate cererile uneltelor primite înainte de procesare
3. Verificați toate răspunsurile trimise înainte de a le returna clienților
4. Înregistrați și alertați în caz de încălcări ale siguranței
5. Implementați tratarea erorilor adecvată pentru verificările de siguranță a conținutului eșuate

Aceasta oferă o apărare robustă împotriva:
- Atacurilor de injecție promptă
- Tentativelor de otrăvire a uneltelor
- Exfiltrării de date prin inputuri malițioase
- Generării de conținut dăunător

## Cele mai bune practici pentru integrarea Azure Content Safety

1. **Liste de blocare personalizate**: Creați liste de blocare personalizate specific pentru tipare de injecție MCP
2. **Ajustarea severității**: Modificați pragurile de severitate în funcție de scenariul dvs. specific și toleranța la risc
3. **Acoperire completă**: Aplicați verificări de siguranță a conținutului tuturor inputurilor și outputurilor
4. **Optimizare performanță**: Luați în considerare implementarea caching-ului pentru verificările repetate ale siguranței conținutului
5. **Mecanisme de rezervă**: Definiți comportamente clare de fallback când serviciile de siguranță a conținutului nu sunt disponibile
6. **Feedback utilizator**: Oferiți feedback clar utilizatorilor când conținutul este blocat din motive de siguranță
7. **Îmbunătățire continuă**: Actualizați regulat listele de blocare și tiparele bazate pe amenințări noi

## Resurse suplimentare

### Ghidul de securitate MCP OWASP
- [Ghidul de securitate MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 MCP OWASP detaliat cu implementare Azure
- [MCP06 - Injecție promptă](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Tipare detaliate pentru atenuarea injecției prompte
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Camp 3: Securitatea I/O include siguranța conținutului

### Documentație Azure
- [Prezentare generală Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Documentația Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Ce urmează

- Revenire la: [Prezentare modul securitate](./README.md)
- Continuare la: [Modul 3: Primii pași](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autoritară. Pentru informații critice, se recomandă o traducere profesională realizată de un traducător uman. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->