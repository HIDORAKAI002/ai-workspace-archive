# Studiu de caz: Conectarea la serverul Microsoft Learn Docs MCP de pe un client

Ți s-a întâmplat vreodată să te descurci între site-uri de documentație, Stack Overflow și filele nesfârșite ale motorului de căutare, în timp ce încerci să rezolvi o problemă în codul tău? Poate că ții un al doilea monitor doar pentru documentație sau faci constant alt-tab între IDE și un browser. Nu ar fi mai bine dacă ai putea aduce documentația direct în fluxul tău de lucru — integrată în aplicațiile tale, în IDE-ul tău sau chiar în propriile tale unelte personalizate? În acest studiu de caz, vom explora cum să faci exact asta, conectându-te direct la serverul Microsoft Learn Docs MCP de pe propria ta aplicație client.

## Prezentare generală

Dezvoltarea modernă nu înseamnă doar să scrii cod — este vorba despre găsirea informației potrivite la momentul potrivit. Documentația este peste tot, dar rareori acolo unde ai cea mai mare nevoie: în interiorul uneltelor și al fluxurilor tale de lucru. Prin integrarea preluării documentației direct în aplicațiile tale, poți economisi timp, reduce schimbările de context și crește productivitatea. În această secțiune, îți vom arăta cum să conectezi un client la serverul Microsoft Learn Docs MCP, astfel încât să poți accesa documentație în timp real, conștientă de context, fără să părăsești aplicația.

Vom parcurge procesul de stabilire a conexiunii, trimiterea unei cereri și gestionarea răspunsurilor în flux într-un mod eficient. Această abordare nu doar că-ți simplifică fluxul de lucru, dar deschide și ușa pentru construirea unor unelte de dezvoltare mai inteligente și mai utile.

## Obiective de învățare

De ce facem asta? Pentru că cele mai bune experiențe pentru dezvoltatori sunt cele care elimină fricțiunile. Imaginează-ți o lume în care editorul tău de cod, chatbot-ul sau aplicația web pot răspunde instantaneu întrebărilor tale de documentație, folosind conținutul cel mai nou de pe Microsoft Learn. La finalul acestui capitol, vei ști să:

- Înțelegi bazele comunicării server-client MCP pentru documentație
- Implementezi o aplicație de consolă sau web pentru conectarea la serverul Microsoft Learn Docs MCP
- Folosești clienți HTTP streaming pentru preluarea documentației în timp real
- Înregistrezi și interpretezi răspunsurile de documentație în aplicația ta

Vei vedea cum aceste abilități te pot ajuta să construiești unelte care să fie nu doar reactive, ci cu adevărat interactive și conștiente de context.

## Scenariul 1 - Preluarea documentației în timp real cu MCP

În acest scenariu, îți vom arăta cum să conectezi un client la serverul Microsoft Learn Docs MCP, astfel încât să poți accesa documentație în timp real, conștientă de context, fără să părăsești aplicația.

Să punem asta în practică. Sarcina ta este să scrii o aplicație care se conectează la serverul Microsoft Learn Docs MCP, invocă uneltele `microsoft_docs_search` și înregistrează răspunsul în flux în consolă.

### De ce această abordare?
Pentru că este baza pentru construirea unor integrări mai avansate — fie că vrei să alimentezi un chatbot, o extensie IDE sau un panou web.

Veți găsi codul și instrucțiunile pentru acest scenariu în folderul [`solution`](./solution/README.md) din cadrul acestui studiu de caz. Pașii te vor ghida prin configurarea conexiunii:
- Folosește SDK-ul oficial MCP și clientul HTTP cu streaming pentru conectare
- Apelează unealta `microsoft_docs_search` cu un parametru de interogare pentru a prelua documentația
- Implementează logare corectă și tratarea erorilor
- Creează o interfață interactivă de consolă care să permită utilizatorilor să introducă mai multe interogări de căutare

Acest scenariu demonstrează cum să:
- Te conectezi la serverul Docs MCP
- Trimiți o interogare
- Analizezi și afișezi rezultatele

Iată cum poate arăta rularea soluției:

```
Prompt> What is Azure Key Vault?
Answer> Azure Key Vault is a cloud service for securely storing and accessing secrets. ...
```

Mai jos este o soluție minimă exemplu. Codul complet și detaliile sunt disponibile în folderul de soluție.

<details>
<summary>Python</summary>

```python
import asyncio
from mcp.client.streamable_http import streamablehttp_client
from mcp import ClientSession

async def main():
    async with streamablehttp_client("https://learn.microsoft.com/api/mcp") as (read_stream, write_stream, _):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()
            result = await session.call_tool("microsoft_docs_search", {"query": "Azure Functions best practices"})
            print(result.content)

if __name__ == "__main__":
    asyncio.run(main())
```

- Pentru implementarea completă și logare, vezi [`scenario1.py`](../../../../09-CaseStudy/docs-mcp/solution/python/scenario1.py).
- Pentru instrucțiuni de instalare și utilizare, vezi fișierul [`README.md`](./solution/python/README.md) din același folder.
</details>


## Scenariul 2 - Aplicație web interactivă pentru generator de plan de studiu cu MCP

În acest scenariu, vei învăța cum să integrezi Docs MCP într-un proiect de dezvoltare web. Obiectivul este să permiți utilizatorilor să caute documentația Microsoft Learn direct dintr-o interfață web, făcând documentația instant accesibilă în cadrul aplicației sau site-ului tău.

Vei vedea cum să:
- Configurezi o aplicație web
- Te conectezi la serverul Docs MCP
- Gestionezi input-ul utilizatorului și afișezi rezultatele

Iată cum poate arăta rularea soluției:

```
User> I want to learn about AI102 - so suggest the roadmap to get it started from learn for 6 weeks

Assistant> Here’s a detailed 6-week roadmap to start your preparation for the AI-102: Designing and Implementing a Microsoft Azure AI Solution certification, using official Microsoft resources and focusing on exam skills areas:

---
## Week 1: Introduction & Fundamentals
- **Understand the Exam**: Review the [AI-102 exam skills outline](https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-102/).
- **Set up Azure**: Sign up for a free Azure account if you don't have one.
- **Learning Path**: [Introduction to Azure AI services](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-ai/)
- **Focus**: Get familiar with Azure portal, AI capabilities, and necessary tools.

....more weeks of the roadmap...

Let me know if you want module-specific recommendations or need more customized weekly tasks!
```

Mai jos este o soluție minimă exemplu. Codul complet și detaliile sunt disponibile în folderul de soluție.

![Scenario 2 Overview](../../../../translated_images/ro/scenario2.0c92726d5cd81f68.webp)

<details>
<summary>Python (Chainlit)</summary>

Chainlit este un cadru pentru construirea aplicațiilor web AI conversaționale. Face ușoară crearea de chatbots interactive și asistenți care pot apela uneltele MCP și afișa rezultatele în timp real. Este ideal pentru prototipare rapidă și interfețe prietenoase cu utilizatorul.

```python
import chainlit as cl
import requests

MCP_URL = "https://learn.microsoft.com/api/mcp"

@cl.on_message
def handle_message(message):
    query = {"question": message}
    response = requests.post(MCP_URL, json=query)
    if response.ok:
        result = response.json()
        cl.Message(content=result.get("answer", "No answer found.")).send()
    else:
        cl.Message(content="Error: " + response.text).send()
```

- Pentru implementarea completă, vezi [`scenario2.py`](../../../../09-CaseStudy/docs-mcp/solution/python/scenario2.py).
- Pentru instrucțiuni de setup și rulare, vezi [`README.md`](./solution/python/README.md).
</details>


## Scenariul 3: Documentația în editor cu serverul MCP în VS Code

Dacă vrei să obții documentația Microsoft Learn direct în VS Code-ul tău (în loc să schimbi filele browserului), poți folosi serverul MCP în editorul tău. Acest lucru îți permite să:
- Cauți și să citești documentația în VS Code fără să părăsești mediul de programare.
- Referențiezi documentația și inserezi linkuri direct în fișierele README sau de curs.
- Folosești GitHub Copilot și MCP împreună pentru un flux de lucru AI pentru documentație, fluent.

**Veți vedea cum să:**
- Adaugi un fișier valid `.vscode/mcp.json` în rădăcina spațiului tău de lucru (vezi exemplul de mai jos).
- Deschizi panoul MCP sau folosești paleta de comenzi în VS Code pentru a căuta și insera documentația.
- Referențiezi documentația direct în fișierele tale markdown pe măsură ce lucrezi.
- Combi acest flux cu GitHub Copilot pentru productivitate și mai mare.

Iată un exemplu despre cum să configurezi serverul MCP în VS Code:

```json
{
  "servers": {
    "LearnDocsMCP": {
      "url": "https://learn.microsoft.com/api/mcp"
    }
  }
}
```

</details>

> Pentru un ghid detaliat cu capturi de ecran și instrucțiuni pas cu pas, vezi [`README.md`](./solution/scenario3/README.md).

![Scenario 3 Overview](../../../../translated_images/ro/step4-prompt-chat.12187bb001605efc.webp)

Această abordare este ideală pentru oricine construiește cursuri tehnice, scrie documentație sau dezvoltă cod cu necesități frecvente de referință.

## Concluzii cheie

Integrarea documentației direct în uneltele tale nu este doar un confort — este o schimbare majoră pentru productivitate. Prin conectarea la serverul Microsoft Learn Docs MCP din clientul tău, poți:

- Elimina schimbările dese de context între cod și documentație
- Prelua documentație actualizată și conștientă de context în timp real
- Construi unelte de dezvoltare mai inteligente și interactive

Aceste abilități te vor ajuta să creezi soluții nu doar eficiente, ci și plăcute la utilizare.

## Resurse suplimentare

Pentru a-ți aprofunda înțelegerea, explorează aceste resurse oficiale:

- [Microsoft Learn Docs MCP Server (GitHub)](https://github.com/MicrosoftDocs/mcp)
- [Începe cu Azure MCP Server (mcp-python)](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started#create-the-python-app)
- [Ce este Azure MCP Server?](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/)
- [Introducere în Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)
- [Adăugarea de plugin-uri de pe un server MCP (Python)](https://learn.microsoft.com/en-us/semantic-kernel/concepts/plugins/adding-mcp-plugins)

## Ce urmează

- Înapoi la: [Prezentare generală a studiilor de caz](../README.md)
- Continuă către: [Modulul 10: Optimizarea fluxurilor AI cu AI Toolkit](../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm răspunderea pentru eventualele neînțelegeri sau interpretări greșite care pot apărea în urma utilizării acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->