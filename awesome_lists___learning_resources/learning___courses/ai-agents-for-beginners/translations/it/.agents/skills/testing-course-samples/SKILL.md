---
name: testing-course-samples
---
# Testare gli Esempi del Corso

Verifica che i quaderni delle lezioni e gli esempi di codice funzionino con una configurazione Microsoft Foundry / Azure OpenAI attiva.
Il repository include un esecutore in
[`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1) che
esegue ogni quaderno Python senza interfaccia utente e stampa una matrice PASS/FAIL.

## Quando usarlo
- "Verificare tutti i quaderni / esempi con il mio abbonamento Azure."
- "Effettuare un test rapido del corso dopo l'aggiornamento dei pacchetti o la modifica dei modelli."
- "Quali lezioni superano ancora / falliscono in tempo reale?"

**Non** usare questo per l'AI Smoke Test GitHub Action (che valida gli agenti *distribuiti*
ospitati — vedi [`tests/README.md`](../../../tests/README.md)). Questa skill
esegue i quaderni in locale.

## Prerequisiti (verificare prima)
1. **Python 3.12+** con dipendenze del corso: `python -m pip install -r requirements.txt`
   più l'esecutore: `python -m pip install nbconvert ipykernel`.
2. **`.env` nella root del repository** (copia da [`.env.example`](../../../../../.env.example)) con almeno:
   - `AZURE_AI_PROJECT_ENDPOINT` — endpoint del progetto Foundry
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — un deployment non deprecato (es. `gpt-4.1-mini`)
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) e `AZURE_OPENAI_DEPLOYMENT`
     per lezioni che chiamano Azure OpenAI direttamente (Lezione 06, 02-azure-openai, 14 handoff/human-loop).
3. **`az login`** completato — gli esempi si autenticano con `AzureCliCredential` (Entra ID, senza chiave).
4. Verificare che il deployment del modello esista:
   `az cognitiveservices account deployment list -g <rg> -n <account> -o table`.

## Esecuzione della validazione
```powershell
# Tutti i notebook Python (esclude .NET, .venv, site-packages, traduzioni, risorse delle skill)
pwsh scripts/validate-notebooks.ps1

# Una singola lezione, con un timeout più lungo per cella
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# Elenca solo cosa verrebbe eseguito (nessuna esecuzione)
pwsh scripts/validate-notebooks.ps1 -List

# Interprete esplicito (se `python` non è nel PATH, ad esempio alias di Windows Store)
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
Lo script scrive copie eseguite, log per ogni quaderno e `results.json` in
`$env:TEMP\aiab-nbval` e termina con il numero di fallimenti.

## Interpretazione dei risultati
- `PASS` — il quaderno è stato eseguito dall'inizio alla fine senza errori nelle celle.
- `FAIL` — viene mostrata la prima riga `*Error` / `*Exception`; aprire il corrispondente
  `log_*.txt` nella directory di output per la traccia completa.
- Il fallimento di un singolo quaderno è limitato da un `-Timeout` (per cella), quindi una cella
  human-in-the-loop bloccata si presenta come `StdinNotImplementedError` invece di bloccare.

## Lezioni che richiedono risorse aggiuntive (si prevede che falliscano senza di esse)
| Lezione | Requisito extra |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search (`AZURE_SEARCH_SERVICE_ENDPOINT`, chiave) — ha un percorso di fallback in memoria |
| 11 MCP / GitHub | Server MCP GitHub + PAT |
| 13 memoria (cognee) | `cognee` configurato con un provider di modelli |
| 15 browser-use | Browser Playwright installati (`playwright install`) + `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 local agent | Runtime Foundry Local + modello Qwen scaricato (su dispositivo, senza cloud) |
| quaderni `*-dotnet-*` | Kernel .NET Interactive (escluso di default; usa `-IncludeDotnet`) |

## Segnalazione
Riassumi in una tabella PASS/FAIL raggruppata per lezione. Separa regressioni genuine
(bug di codice/config da correggere) dalle lacune ambientali (mancanza di Search/Foundry Local/PAT),
e cita il `log_*.txt` che fallisce per ogni errore reale.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->