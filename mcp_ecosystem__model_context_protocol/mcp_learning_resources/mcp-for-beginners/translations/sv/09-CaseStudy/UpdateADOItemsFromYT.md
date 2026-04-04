# Fallstudie: Uppdatering av Azure DevOps-objekt från YouTube-data med MCP

> **Ansvarsfriskrivning:** Det finns befintliga onlineverktyg och rapporter som kan automatisera processen att uppdatera Azure DevOps-objekt med data från plattformar som YouTube. Följande scenario tillhandahålls enbart som ett exempel för att illustrera hur MCP-verktyg kan användas för automatiserings- och integrationsuppgifter.

## Översikt

Denna fallstudie visar ett exempel på hur Model Context Protocol (MCP) och dess verktyg kan användas för att automatisera processen att uppdatera Azure DevOps (ADO) arbetsobjekt med information hämtad från onlineplattformar, såsom YouTube. Det beskrivna scenariot är bara en illustration av de bredare möjligheterna med dessa verktyg, vilka kan anpassas till många liknande automatiseringsbehov.

I detta exempel spårar en Advocate online-sessioner med hjälp av ADO-objekt, där varje objekt innehåller en YouTube-video-URL. Genom att använda MCP-verktyg kan Advocaten hålla ADO-objekten uppdaterade med de senaste videostatistikerna, såsom visningsantal, på ett upprepbart och automatiserat sätt. Denna metod kan generaliseras till andra användningsfall där information från onlinekällor behöver integreras i ADO eller andra system.

## Scenario

En Advocate är ansvarig för att följa upp effekten av online-sessioner och community-engagemang. Varje session loggas som ett ADO-arbetsobjekt i projektet 'DevRel', och arbetsobjektet innehåller ett fält för YouTube-video-URL. För att noggrant rapportera sessionens räckvidd behöver Advocaten uppdatera ADO-objektet med det aktuella antalet videovisningar och datum då denna information hämtades.

## Använda verktyg

- [Azure DevOps MCP](https://github.com/microsoft/azure-devops-mcp): Möjliggör programmatisk åtkomst och uppdatering av ADO-arbetsobjekt via MCP.
- [Playwright MCP](https://github.com/microsoft/playwright-mcp): Automatiserar webbläsaråtgärder för att extrahera live-data från webbsidor, såsom YouTube-videostatistik.

## Steg-för-steg-arbetsflöde

1. **Identifiera ADO-objektet**: Börja med ADO-arbetsobjektets ID (t.ex. 1234) i projektet 'DevRel'.
2. **Hämta YouTube-URL**: Använd Azure DevOps MCP-verktyget för att få YouTube-URL från arbetsobjektet.
3. **Extrahera videovisningar**: Använd Playwright MCP-verktyget för att navigera till YouTube-URL:en och extrahera det aktuella visningsantalet.
4. **Uppdatera ADO-objektet**: Skriv det senaste visningsantalet och datum för hämtningen i avsnittet 'Impact and Learnings' i ADO-arbetsobjektet med Azure DevOps MCP-verktyget.

## Exempel på uppmaning

```bash
- Work with the ADO Item ID: 1234
- The project is '2025-Awesome'
- Get the YouTube URL for the ADO item
- Use Playwright to get the current views from the YouTube video
- Update the ADO item with the current video views and the updated date of the information
```

## Mermaid-flödesschema

```mermaid
flowchart TD
    A[Start: Advocate identifies ADO Item ID] --> B[Hämta YouTube-URL från ADO-objekt med Azure DevOps MCP]
    B --> C[Extrahera aktuella videovisningar med Playwright MCP]
    C --> D[Uppdatera ADO-objektets avsnitt för Påverkan och Lärdomar med visningsantal och datum]
    D --> E[Slut]
```
## Teknisk implementering

- **MCP-orkestrering**: Arbetsflödet orkestreras av en MCP-server som koordinerar användningen av både Azure DevOps MCP och Playwright MCP-verktygen.
- **Automatisering**: Processen kan triggas manuellt eller schemaläggas för att köras med jämna mellanrum för att hålla ADO-objekten uppdaterade.
- **Utbyggbarhet**: Samma mönster kan utvidgas för att uppdatera ADO-objekt med andra online-mått (t.ex. likes, kommentarer) eller från andra plattformar.

## Resultat och påverkan

- **Effektivitet**: Minskar manuellt arbete för Advocates genom att automatisera hämtning och uppdatering av videostatistik.
- **Noggrannhet**: Säkerställer att ADO-objekt speglar den mest aktuella data som finns tillgänglig från onlinekällor.
- **Upprepbarhet**: Tillhandahåller ett återanvändbart arbetsflöde för liknande scenarier som involverar andra datakällor eller mått.

## Referenser

- [Azure DevOps MCP](https://github.com/microsoft/azure-devops-mcp)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Vad händer härnäst

- Tillbaka till: [Fallstudier Översikt](./README.md)
- Nästa: [Dokumenthämtning i realtid med MCP](./docs-mcp/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, bör du vara medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål ska betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår från användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->