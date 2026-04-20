# Creazione di Agenti per l'Uso del Computer (CUA)

Gli agenti per l'uso del computer possono interagire con i siti web nello stesso modo di una persona: aprendo un browser, ispezionando la pagina e prendendo la migliore azione successiva da ciò che vedono. In questa lezione, costruirai un agente di automazione del browser che cerca su Airbnb, estrae dati strutturati degli annunci e identifica il soggiorno più economico a Stoccolma.

La lezione combina Browser-Use per la navigazione guidata dall'IA, Playwright e il Chrome DevTools Protocol (CDP) per il controllo del browser, Azure OpenAI per il ragionamento abilitato alla visione e Pydantic per l'estrazione strutturata.

## Introduzione

Questa lezione tratterà:

- Comprendere quando gli agenti per l'uso del computer sono più adatti rispetto all'automazione basata solo su API
- Combinare Browser-Use con Playwright e CDP per una gestione affidabile del ciclo di vita del browser
- Usare la visione Azure OpenAI e l'output strutturato di Pydantic per estrarre dati degli annunci da pagine web dinamiche
- Decidere quando utilizzare un flusso di lavoro di automazione del browser basato su agenti, attori o ibrido

## Obiettivi di Apprendimento

Dopo aver completato questa lezione, saprai come:

- Configurare Browser-Use con Azure OpenAI e Playwright
- Creare un flusso di lavoro di automazione del browser che navighi un sito reale e gestisca elementi UI dinamici
- Estrarre risultati tipizzati dal contenuto visibile della pagina e convertirli in logica aziendale downstream
- Scegliere tra i modelli agent e attore in base a quanto è prevedibile il compito nel browser

## Esempio di Codice

Questa lezione include un tutorial in notebook:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Avvia una sessione Chrome tramite CDP, cerca annunci a Stoccolma su Airbnb, estrae i prezzi con la visione Browser-Use e restituisce l'opzione più economica come dati strutturati.

## Prerequisiti

- Python 3.12+
- Distribuzione Azure OpenAI configurata nel tuo ambiente
- Chrome o Chromium installati localmente
- Dipendenze Playwright installate
- Familiarità di base con Python asincrono

## Setup

Installa i pacchetti usati nel notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Imposta le variabili d'ambiente Azure OpenAI usate dal notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Facoltativo: usa per default l'ultima versione dell'API quando viene omesso
AZURE_OPENAI_API_VERSION=...
```

## Panoramica dell'Architettura

Il notebook dimostra un flusso di lavoro ibrido di automazione del browser:

1. Chrome si avvia con CDP abilitato così sia Playwright sia Browser-Use possono condividere la stessa sessione del browser.
2. Un agente Browser-Use gestisce compiti di navigazione aperti come aprire Airbnb, chiudere pop-up e cercare Stoccolma.
3. La pagina attiva viene ispezionata con uno schema Pydantic strutturato per estrarre titoli degli annunci, prezzi per notte, valutazioni e URL.
4. La logica Python confronta gli annunci estratti e evidenzia il risultato più economico.

Questo approccio mantiene il ragionamento flessibile basato sulla visione, per cui Browser-Use è efficace, garantendo comunque un controllo deterministico del browser quando necessario.

## Punti Chiave e Best Practice

### Quando Usare Agent vs Actor

| Scenario | Usa Agent | Usa Actor |
|----------|-----------|-----------|
| Layout dinamici | Sì, l'IA si adatta ai cambiamenti della pagina | No, i selettori fragili possono rompersi |
| Struttura nota | No, un agente è più lento del controllo diretto | Sì, veloce e preciso |
| Trovare elementi | Sì, il linguaggio naturale funziona bene | No, servono selettori esatti |
| Controllo temporale | No, meno prevedibile | Sì, controllo completo di attese e ritentativi |
| Flussi complessi | Sì, gestisce stati UI imprevisti | No, richiede ramificazioni esplicite |

### Best Practice per Browser-Use

1. Inizia con un agente per esplorazione e navigazione dinamica.
2. Passa al controllo diretto della pagina quando l'interazione diventa prevedibile.
3. Usa modelli di output strutturati così i dati estratti sono validati e tipizzati.
4. Aggiungi ritardi strategici dopo azioni che attivano cambiamenti UI visibili.
5. Cattura screenshot mentre iteri così gli errori sono più facili da debug.
6. Aspettati che i siti cambino e progetta strategie di fallback per pop-up e cambi di layout.
7. Combina pattern agent e actor per ottenere flessibilità e precisione.

### Applicazioni nel Mondo Reale

- Prenotazioni di viaggi e monitoraggio prezzi
- Confronto prezzi e verifica disponibilità e-commerce
- Estrazione strutturata da siti web dinamici
- Test e verifica UI con consapevolezza della visione
- Monitoraggio e allerta siti web
- Compilazione intelligente di form attraverso flussi multi-step

## Risorse Aggiuntive

- [Template integrazione Browser-Use Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parametri actor Browser-Use ed estrazione contenuti](https://docs.browser-use.com/customize/actor/all-parameters)
- [Setup del Corso](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per l'accuratezza, si prega di essere consapevoli che le traduzioni automatiche possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, è consigliata una traduzione professionale umana. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall'uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->