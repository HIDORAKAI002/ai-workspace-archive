# Implementarea Azure Content Safety cu MCP

> **Risc MCP OWASP abordat**: [MCP06 - Subversiunea fluxului de intenție](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Pentru a întări securitatea MCP împotriva injecției de prompturi, otrăvirii uneltelor și altor vulnerabilități specifice AI, este recomandată integrarea Azure Content Safety. Acest ghid de implementare este aliniat cu [Atelierul Summiturilor de Securitate MCP (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Securitatea I/O.

## Integrarea cu serverul MCP

Pentru a integra Azure Content Safety cu serverul MCP, adăugați filtrul de siguranță a conținutului ca middleware în procesul dvs. de procesare a cererilor:

1. Inițializați filtrul în timpul pornirii serverului
2. Validați toate cererile uneltelor care sosesc înainte de procesare
3. Verificați toate răspunsurile care ies înainte de a le returna clienților
4. Înregistrați și alertați în caz de încălcări de siguranță
5. Implementați gestionarea erorilor corespunzătoare pentru verificările eșuate de siguranță a conținutului

Acest lucru oferă o apărare robustă împotriva:
- Atacurilor de injecție de prompturi
- Tentativelor de otrăvire a uneltelor
- Exfiltrării de date prin intrări malițioase
- Generării de conținut dăunător

## Cele mai bune practici pentru integrarea Azure Content Safety

1. **Liste negre personalizate**: Creați liste negre personalizate specifice pentru tipare de injecție MCP
2. **Ajustarea severității**: Reglați pragurile de severitate în funcție de cazul dvs. specific și toleranța la risc
3. **Acoperire completă**: Aplicați verificări de siguranță a conținutului pentru toate intrările și ieșirile
4. **Optimizarea performanței**: Luați în considerare implementarea caching-ului pentru verificări repetate de siguranță a conținutului
5. **Mecanisme de rezervă**: Definiți comportamente clare de rezervă când serviciile de siguranță a conținutului nu sunt disponibile
6. **Feedback pentru utilizatori**: Oferiți feedback clar utilizatorilor când conținutul este blocat din motive de siguranță
7. **Îmbunătățire continuă**: Actualizați regulat listele negre și tiparele pe baza noilor amenințări emergente

## Resurse suplimentare

### Ghid de securitate MCP OWASP
- [Ghidul de securitate MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 complet OWASP MCP cu implementare Azure
- [MCP06 - Injecția de prompturi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Modele detaliate de atenuare a injecției de prompturi
- [Atelierul Summitului de Securitate MCP](https://azure-samples.github.io/sherpa/) - Camp 3 hands-on: Securitatea I/O acoperă siguranța conținutului

### Documentație Azure
- [Prezentare generală Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Documentația Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Quickstart Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Ce urmează

- Revenire la: [Prezentarea modulului de securitate](./README.md)
- Continuare la: [Modul 3: Început](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->