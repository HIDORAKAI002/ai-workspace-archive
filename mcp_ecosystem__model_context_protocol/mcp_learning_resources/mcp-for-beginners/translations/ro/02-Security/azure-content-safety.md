# Securitate Avansată MCP cu Azure Content Safety

> **Risc MCP OWASP Abordat**: [MCP06 - Subversiunea Fluxului de Intent](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety oferă mai multe instrumente puternice care pot spori securitatea implementărilor tale MCP. Pentru experiență practică în implementare, vezi [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Securitatea I/O.

## Scuturi Prompt

AI Prompt Shields de la Microsoft oferă o protecție solidă împotriva atacurilor de injecție de prompturi atât directe, cât și indirecte prin:

1. **Detectare Avansată**: Folosește învățarea automată pentru a identifica instrucțiuni malițioase ascunse în conținut.
2. **Evidențiere**: Transformă textul de intrare pentru a ajuta sistemele AI să distingă între instrucțiuni valide și intrări externe.
3. **Delimitatori și Marcarea Datelor**: Marchează limitele dintre date de încredere și cele neîncrezătoare.
4. **Integrarea Content Safety**: Lucrează împreună cu Azure AI Content Safety pentru a detecta încercările de jailbreak și conținutul dăunător.
5. **Actualizări Continue**: Microsoft actualizează regulat mecanismele de protecție împotriva amenințărilor emergente.

## Implementarea Azure Content Safety cu MCP

Această abordare oferă o protecție stratificată:
- Scanarea intrărilor înainte de procesare
- Validarea ieșirilor înainte de returnare
- Utilizarea listelor de blocare pentru modele cunoscute ca periculoase
- Folosirea modelelor Azure actualizate continuu pentru siguranța conținutului

## Resurse Azure Content Safety

Pentru a afla mai multe despre implementarea Azure Content Safety cu serverele tale MCP, consultă aceste resurse oficiale:

1. [Documentația Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentația oficială pentru Azure Content Safety.
2. [Documentația Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Află cum să previi atacurile de injecție de prompturi.
3. [Referința API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Referință detaliată API pentru implementarea Content Safety.
4. [Pornire Rapidă: Azure Content Safety cu C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Ghid rapid de implementare folosind C#.
5. [Biblioteci Client Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Biblioteci client pentru diverse limbaje de programare.
6. [Detectarea Încercărilor de Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Ghid specific pentru detectarea și prevenirea încercărilor de jailbreak.
7. [Cele Mai Bune Practici pentru Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Cele mai bune practici pentru implementarea eficientă a siguranței conținutului.

Pentru o implementare mai detaliată, vezi ghidul nostru [Azure Content Safety Implementation](./azure-content-safety-implementation.md).

## Ce Urmează

- Citește: [Implementarea Azure Content Safety](./azure-content-safety-implementation.md)
- Întoarce-te la: [Prezentarea Modulului de Securitate](./README.md)
- Continuă la: [Modulul 3: Începerea lucrului](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->