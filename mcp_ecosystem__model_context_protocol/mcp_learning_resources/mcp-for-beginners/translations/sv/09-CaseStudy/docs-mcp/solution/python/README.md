# Studieplan-generator med Chainlit & Microsoft Learn Docs MCP

## Förutsättningar

- Python 3.8 eller högre  
- pip (Python-pakethanterare)  
- Internetåtkomst för att ansluta till Microsoft Learn Docs MCP-servern

## Installation

1. Klona detta arkiv eller ladda ner projektfilerna.  
2. Installera de nödvändiga beroenden:

   ```bash
   pip install -r requirements.txt
   ```

## Användning

### Scenario 1: Enkel fråga till Docs MCP
En kommandoradsklient som ansluter till Docs MCP-servern, skickar en fråga och skriver ut resultatet.

1. Kör skriptet:  
   ```bash
   python scenario1.py
   ```
2. Skriv in din dokumentationsfråga vid prompten.

### Scenario 2: Studieplan-generator (Chainlit webapp)
Ett webbaserat gränssnitt (med Chainlit) som låter användare skapa en personlig, veckovis studieplan för vilket tekniskt ämne som helst.

1. Starta Chainlit-appen:  
   ```bash
   chainlit run scenario2.py
   ```
2. Öppna den lokala URL som visas i din terminal (t.ex. http://localhost:8000) i din webbläsare.  
3. Skriv in ditt studieämne och antal veckor du vill studera i chattfönstret (t.ex. "AI-900 certification, 8 weeks").  
4. Appen svarar med en veckovis studieplan, inklusive länkar till relevant Microsoft Learn-dokumentation.

**Nödvändiga miljövariabler:**

För att använda Scenario 2 (Chainlit-webappen med Azure OpenAI) måste du sätta följande miljövariabler i en `.env`-fil i `python`-katalogen:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```
  
Fyll i dessa värden med dina Azure OpenAI-resursuppgifter innan du kör appen.

> [!TIP]  
> Du kan enkelt distribuera egna modeller med [Microsoft Foundry](https://ai.azure.com/).

### Scenario 3: In-Editor Docs med MCP-server i VS Code

Istället för att byta webbläsarflikar för att söka dokumentation kan du hämta Microsoft Learn Docs direkt in i VS Code med MCP-servern. Detta gör att du kan:  
- Söka och läsa dokumentation direkt i VS Code utan att lämna din kodmiljö.  
- Referera till dokumentation och infoga länkar direkt i din README eller kursfiler.  
- Använda GitHub Copilot och MCP tillsammans för ett sömlöst, AI-drivet dokumentationsflöde.

**Exempel på användningsområden:**  
- Lägg snabbt till referenslänkar i en README medan du skriver kurs- eller projektdokumentation.  
- Använd Copilot för att generera kod och MCP för att omedelbart hitta och citera relevanta dokument.  
- Håll fokus i din editor och öka produktiviteten.

> [!IMPORTANT]  
> Säkerställ att du har en giltig [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json)-konfiguration i din arbetsyta (plats är `.vscode/mcp.json`).

## Varför Chainlit för Scenario 2?

Chainlit är ett modernt open source-ramverk för att bygga konversationsbaserade webbapplikationer. Det gör det enkelt att skapa chattbaserade användargränssnitt som ansluter till bakgrundstjänster som Microsoft Learn Docs MCP-servern. Detta projekt använder Chainlit för att erbjuda ett enkelt, interaktivt sätt att generera personliga studieplaner i realtid. Genom att använda Chainlit kan du snabbt bygga och distribuera chattbaserade verktyg som förbättrar produktivitet och lärande.

## Vad detta gör

Den här appen låter användare skapa en personlig studieplan genom att bara skriva in ett ämne och en tidsperiod. Appen tolkar din inmatning, frågar Microsoft Learn Docs MCP-servern efter relevant innehåll och organiserar resultaten i en strukturerad, veckovis plan. Varje veckas rekommendationer visas i chatten, vilket gör det enkelt att följa och hålla koll på din framsteg. Integrationen säkerställer att du alltid får de senaste och mest relevanta lärresurserna.

## Exempel på frågor

Prova dessa frågor i chattfönstret för att se hur appen svarar:

- `AI-900 certification, 8 weeks`  
- `Learn Azure Functions, 4 weeks`  
- `Azure DevOps, 6 weeks`  
- `Data engineering on Azure, 10 weeks`  
- `Microsoft security fundamentals, 5 weeks`  
- `Power Platform, 7 weeks`  
- `Azure AI services, 12 weeks`  
- `Cloud architecture, 9 weeks`

Dessa exempel visar appens flexibilitet för olika lärandemål och tidsramar.

## Referenser

- [Chainlit Documentation](https://docs.chainlit.io/)  
- [MCP Documentation](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->