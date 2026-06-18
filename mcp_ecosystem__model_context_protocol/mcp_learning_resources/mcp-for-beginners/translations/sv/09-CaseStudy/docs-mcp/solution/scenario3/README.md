# Scenario 3: In-Editor Docs med MCP-server i VS Code

## Översikt

I detta scenario kommer du att lära dig hur du kan integrera Microsoft Learn Docs direkt i din Visual Studio Code-miljö med hjälp av MCP-servern. Istället för att ständigt växla flikar i webbläsaren för att söka efter dokumentation kan du få åtkomst till, söka i och referera till officiell dokumentation direkt i din editor. Detta angreppssätt effektiviserar ditt arbetsflöde, håller dig fokuserad och möjliggör sömlös integration med verktyg som GitHub Copilot.

- Sök och läs dokumentation inne i VS Code utan att lämna kodmiljön.
- Referera dokumentation och infoga länkar direkt i din README eller kursfiler.
- Använd GitHub Copilot och MCP tillsammans för ett sömlöst, AI-drivet dokumentationsarbetsflöde.

## Lärandemål

I slutet av detta kapitel kommer du att förstå hur du ställer in och använder MCP-servern inom VS Code för att förbättra ditt dokumentations- och utvecklingsarbete. Du kommer att kunna:

- Konfigurera din arbetsyta för att använda MCP-servern för dokumentationssökning.
- Söka och infoga dokumentation direkt från VS Code.
- Kombinera kraften i GitHub Copilot och MCP för ett mer produktivt, AI-förstärkt arbetsflöde.

Dessa färdigheter hjälper dig att hålla fokus, förbättra dokumentationskvaliteten och öka din produktivitet som utvecklare eller teknisk skribent.

## Lösning

För att uppnå dokumentationstillgång direkt i editorn kommer du att följa en steg-för-steg-process som integrerar MCP-servern med VS Code och GitHub Copilot. Denna lösning är idealisk för kursförfattare, dokumentationsskrivare och utvecklare som vill behålla fokus i editorn samtidigt som de arbetar med dokumentation och Copilot.

- Lägg snabbt till referenslänkar i en README medan du skriver en kurs eller projektdokumentation.
- Använd Copilot för att generera kod och MCP för att snabbt hitta och citera relevant dokumentation.
- Behåll fokus i din editor och öka produktiviteten.

### Steg-för-steg-guide

För att komma igång, följ dessa steg. För varje steg kan du lägga till en skärmdump från assets-mappen för att visuellt illustrera processen.

1. **Lägg till MCP-konfigurationen:**
   Skapa en `.vscode/mcp.json`-fil i din projektrot och lägg till följande konfiguration:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Denna konfiguration berättar för VS Code hur man ansluter till [`Microsoft Learn Docs MCP servern`](https://github.com/MicrosoftDocs/mcp).
   
   ![Steg 1: Lägg till mcp.json i .vscode-mappen](../../../../../../translated_images/sv/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Öppna GitHub Copilot Chat-panelen:**
   Om du inte redan har GitHub Copilot-tillägget installerat, gå till Extensions-vyn i VS Code och installera det. Du kan ladda ner det direkt från [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Öppna sedan Copilot Chat-panelen från sidofältet.

   ![Steg 2: Öppna Copilot Chat-panelen](../../../../../../translated_images/sv/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Aktivera agentläge och verifiera verktyg:**
   I Copilot Chat-panelen, aktivera agentläge.

   ![Steg 3: Aktivera agentläge och verifiera verktyg](../../../../../../translated_images/sv/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Efter att agentläget har aktiverats, verifiera att MCP-servern listas som ett av de tillgängliga verktygen. Detta säkerställer att Copilot-agenten kan få åtkomst till dokumentationsservern för att hämta relevant information.
   
   ![Steg 3: Verifiera MCP-serververktyget](../../../../../../translated_images/sv/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Starta en ny chatt och ge agenten en prompt:**
   Öppna en ny chatt i Copilot Chat-panelen. Du kan nu ge agenten dina dokumentationsfrågor. Agenten kommer använda MCP-servern för att hämta och visa relevant Microsoft Learn-dokumentation direkt i din editor.

   - *"Jag försöker skriva en studieplan för ämnet X. Jag ska studera det i 8 veckor, för varje vecka, föreslå innehåll jag bör ta."*

   ![Steg 4: Ge agenten en prompt i chatten](../../../../../../translated_images/sv/step4-prompt-chat.12187bb001605efc.webp)

5. **Livefrågor:**

   > Låt oss ta en livefråga från [#get-help](https://discord.gg/D6cRhjHWSC)-sektionen i Microsoft Foundry Discord ([se ursprungligt meddelande](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Jag söker svar på hur man distribuerar en multi-agentlösning med AI-agenter utvecklade på Azure AI Foundry. Jag ser att det inte finns någon direkt distributionsmetod, som Copilot Studio-kanaler. Så, vilka är de olika sätten att göra denna distribution för företagsanvändare att interagera och få jobbet gjort?
Det finns ett flertal artiklar/bloggar som säger att vi kan använda Azure Bot-tjänsten för detta jobb vilket kan verka som en brygga mellan MS teams och Azure AI Foundry-agenterna, fungerar det om jag sätter upp en Azure-bot som ansluter till Orchestrator Agent på Azure AI Foundry via Azure Function för att utföra orkestreringen eller behöver jag skapa en Azure Function för varje AI-agent som är en del av multi-agentlösningen för att göra orkestreringen i Bot Framework? Andra förslag tas tacksamt emot.
"*

   ![Steg 5: Livefrågor](../../../../../../translated_images/sv/step5-live-queries.49db3e4a50bea273.webp)

   Agenten kommer svara med relevanta dokumentationslänkar och sammanfattningar, som du sedan kan infoga direkt i dina markdown-filer eller använda som referenser i din kod.

### Exempel på frågor

Här är några exempel på frågor du kan prova. Dessa frågor visar hur MCP-servern och Copilot kan samarbeta för att tillhandahålla omedelbar, kontextmedveten dokumentation och referenser utan att lämna VS Code:

- "Visa mig hur man använder Azure Functions triggers."
- "Infoga en länk till den officiella dokumentationen för Azure Key Vault."
- "Vilka är bästa praxis för att säkra Azure-resurser?"
- "Hitta en snabbstartsguide för Azure AI-tjänster."

Dessa frågor demonstrerar hur MCP-servern och Copilot kan arbeta tillsammans för att tillhandahålla omedelbar, kontextmedveten dokumentation och referenser utan att lämna VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->