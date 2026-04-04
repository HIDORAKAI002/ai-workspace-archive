# Securitate avansată MCP cu Azure Content Safety

> **Risc MCP OWASP adresat**: [MCP06 - Injecție de prompt prin încărcături contextuale](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety oferă mai multe instrumente puternice care pot îmbunătăți securitatea implementărilor MCP. Pentru experiență practică, consultați [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Securitate I/O.

## Scuturi de prompt

Scuturile Microsoft AI Prompt Shields oferă protecție robustă împotriva atacurilor de injecție de prompt atât directe cât și indirecte prin:

1. **Detectare avansată**: Folosește învățarea automată pentru a identifica instrucțiuni malițioase încorporate în conținut.
2. **Evidențiere**: Transformă textul de intrare pentru a ajuta sistemele AI să distingă între instrucțiuni valide și intrări externe.
3. **Delimitatori și marcarea datelor**: Marchează granițele între datele de încredere și cele neîncredere.
4. **Integrare Content Safety**: Colaborează cu Azure AI Content Safety pentru a detecta încercările de jailbreak și conținutul dăunător.
5. **Actualizări continue**: Microsoft actualizează regulat mecanismele de protecție împotriva amenințărilor emergente.

## Implementarea Azure Content Safety cu MCP

Această abordare asigură protecție stratificată:
- Scanarea intrărilor înainte de procesare
- Validarea rezultatelor înainte de returnare
- Folosirea listelor de blocare pentru tipare cunoscute dăunătoare
- Exploatarea modelelor Azure de content safety actualizate continuu

## Resurse Azure Content Safety

Pentru a afla mai multe despre implementarea Azure Content Safety cu serverele MCP, consultați aceste resurse oficiale:

1. [Documentația Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentația oficială pentru Azure Content Safety.
2. [Documentația Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Aflați cum să preveniți atacurile de injecție de prompt.
3. [Referință API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Referință API detaliată pentru implementarea Content Safety.
4. [Pornire rapidă: Azure Content Safety cu C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Ghid rapid de implementare folosind C#.
5. [Biblioteci client Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Biblioteci client pentru diverse limbaje de programare.
6. [Detectarea încercărilor de jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Ghid specific pentru detectarea și prevenirea încercărilor de jailbreak.
7. [Cele mai bune practici pentru Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Cele mai bune practici pentru implementarea eficientă a content safety.

Pentru o implementare mai detaliată, consultați ghidul nostru [Azure Content Safety Implementation](./azure-content-safety-implementation.md).

## Ce urmează

- Citiți: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Revenire la: [Prezentare generală modul securitate](./README.md)
- Continuați la: [Modul 3: Începere](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinarea responsabilității**:  
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să fiți conștienți că traducerile automate pot conține erori sau inexactități. Documentul original, în limba sa nativă, trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm responsabilitatea pentru eventuale neînțelegeri sau interpretări eronate care pot rezulta din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->