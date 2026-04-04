# Studija slučaja: Izložite REST API u API Managementu kao MCP poslužitelj

Azure API Management je usluga koja pruža Gateway na vrhu vaših API krajnjih točaka. Način na koji funkcionira je da Azure API Management djeluje kao proxy ispred vaših API-ja i može odlučiti što učiniti s dolaznim zahtjevima.

Korištenjem ove usluge dodajete niz značajki poput:

- **Sigurnosti**, možete koristiti sve od API ključeva, JWT do upravljanog identiteta.
- **Ograničenja brzine**, sjajna značajka je mogućnost odlučivanja koliko poziva može proći u određenoj vremenskoj jedinici. Ovo pomaže osigurati da svi korisnici imaju izvrsno iskustvo i da vaša usluga nije preplavljena zahtjevima.
- **Skaliranja i balansiranja opterećenja**. Možete postaviti nekoliko krajnjih točaka za balansiranje opterećenja, a također možete odlučiti kako "balansirati opterećenje".
- **AI značajke poput semantičkog keširanja**, ograničenja tokena i praćenja tokena i još mnogo toga. To su izvrsne značajke koje poboljšavaju odzivnost kao i pomažu vam da imate kontrolu nad potrošnjom tokena. [Pročitajte više ovdje](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Zašto MCP + Azure API Management?

Model Context Protocol brzo postaje standard za agentne AI aplikacije i način izlaganja alata i podataka na dosljedan način. Azure API Management je prirodan izbor kad trebate "upravljati" API-jima. MCP poslužitelji često se integriraju s drugim API-jima radi rješavanja zahtjeva prema nekom alatu, na primjer. Stoga kombinacija Azure API Managementa i MCP-a ima puno smisla.

## Pregled

U ovom konkretnom slučaju korištenja naučit ćemo kako izložiti API krajnje točke kao MCP poslužitelj. Time ćemo ove krajnje točke lako učiniti dijelom agentne aplikacije te također iskoristiti značajke Azure API Managementa.

## Ključne značajke

- Odaberete metode krajnjih točaka koje želite izložiti kao alate.
- Dodatne značajke koje dobivate ovise o tome što konfigurirate u odjeljku pravila (policy) za vaš API. Ovdje ćemo vam pokazati kako dodati ograničenje brzine.

## Prethodni korak: uvoz API-ja

Ako već imate API u Azure API Managementu, super, tada ovaj korak možete preskočiti. Ako ne, pogledajte ovaj link, [uvođenje API-ja u Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Izložite API kao MCP poslužitelj

Da biste izložili API krajnje točke, slijedite ove korake:

1. Prijavite se u Azure Portal i idite na sljedeću adresu <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>.  
   Idite na svoju instancu API Managementa.

1. U lijevom izborniku odaberite APIs > MCP Servers > + Create new MCP Server.

1. U API odaberite REST API koji želite izložiti kao MCP poslužitelj.

1. Odaberite jednu ili više API Operacija koje želite izložiti kao alate. Možete odabrati sve operacije ili samo određene operacije.

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Odaberite **Create**.

1. Idite na izbornik **APIs** i **MCP Servers**, trebali biste vidjeti sljedeće:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP poslužitelj je stvoren, a API operacije su izložene kao alati. MCP poslužitelj je naveden u panelu MCP Servers. Stupac URL prikazuje krajnju točku MCP poslužitelja koju možete koristiti za testiranje ili unutar klijentske aplikacije.

## Opcionalno: Konfigurirajte pravila (policies)

Azure API Management ima osnovni koncept pravila u kojima postavljate različite uvjete za svoje krajnje točke, poput npr. ograničenja brzine ili semantičkog keširanja. Ta se pravila definiraju u XML-u.

Evo kako možete postaviti pravilo za ograničenje brzine MCP poslužitelja:

1. U portalu, pod APIs, odaberite **MCP Servers**.

1. Odaberite MCP poslužitelj koji ste kreirali.

1. U lijevom izborniku, pod MCP, odaberite **Policies**.

1. U uređivaču pravila dodajte ili uredite pravila koja želite primijeniti na alate MCP poslužitelja. Pravila su definirana u XML formatu. Na primjer, možete dodati pravilo za ograničenje poziva prema alatima MCP poslužitelja (u ovom primjeru, 5 poziva na 30 sekundi po IP adresi klijenta). Evo XML-a koji će uzrokovati ograničenje brzine:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Evo slike uređivača pravila:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)

## Isprobajte to

Provjerimo radi li naš MCP poslužitelj kako je zamišljeno.

Za to ćemo koristiti Visual Studio Code i GitHub Copilot u Agent načinu rada. Dodati ćemo MCP poslužitelj u *mcp.json*. Time će Visual Studio Code djelovati kao klijent s agentnim mogućnostima, a krajnji korisnici će moći unositi upite i komunicirati s tim poslužiteljem.

Pogledajmo kako dodati MCP poslužitelj u Visual Studio Code:

1. Koristite MCP: **Add Server naredbu iz Command Palettea**.

1. Kad se zatraži, odaberite vrstu poslužitelja: **HTTP (HTTP ili Server Sent Events)**.

1. Unesite URL MCP poslužitelja u API Managementu. Na primjer: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (za SSE krajnju točku) ili **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (za MCP krajnju točku), obratite pozornost na razliku u transportu `/sse` ili `/mcp`.

1. Unesite ID poslužitelja po želji. Ovo nije važna vrijednost, ali će vam pomoći da zapamtite što ta instanca poslužitelja predstavlja.

1. Odaberite želite li spremiti konfiguraciju u postavke radnog prostora ili korisnika.

  - **Workspace settings** - Konfiguracija poslužitelja sprema se u .vscode/mcp.json datoteku koja je dostupna samo u trenutnom radnom prostoru.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    ili, ako odaberete streaming HTTP kao transport, izgledat će malo drugačije:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **User settings** - Konfiguracija poslužitelja dodaje se u globalnu *settings.json* datoteku i dostupna je u svim radnim prostorima. Konfiguracija izgleda ovako:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Također trebate dodati konfiguraciju, zaglavlje da biste se pravilno autentificirali prema Azure API Managementu. Koristi zaglavlje pod nazivom **Ocp-Apim-Subscription-Key**.

    - Evo kako ga možete dodati u postavke:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), zbog čega će se prikazati upit za unos vrijednosti API ključa koji možete pronaći u Azure Portalu za vašu Azure API Management instancu.

   - Za dodavanje u *mcp.json* umjesto toga, možete ga dodati ovako:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Koristite Agent način rada

Sada smo postavljeni ili u postavkama ili u *.vscode/mcp.json*. Isprobajmo.

Trebao bi biti dostupan ikona Alata (Tools) poput ove, gdje su izloženi alati vašeg poslužitelja:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Kliknite na ikonu alata i trebali biste vidjeti popis alata kao na slici:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Unesite upit u chat za pozivanje alata. Na primjer, ako ste odabrali alat za dobivanje informacija o narudžbi, možete pitati agenta o narudžbi. Evo primjera upita:

    ```text
    get information from order 2
    ```

    Sada ćete vidjeti ikonu alata koja će zatražiti da nastavite pozivati alat. Odaberite da nastavite s izvršavanjem alata i trebali biste vidjeti izlaz kao na slici:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **ono što vidite ovisi o alatima koje ste postavili, ali ideja je da dobijete tekstualni odgovor kao gore**

## Reference

Evo kako možete saznati više:

- [Tutorial o Azure API Managementu i MCP-u](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python primjer: Sigurni udaljeni MCP poslužitelji koristeći Azure API Management (eksperimentalno)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP laboratorij za autorizaciju klijenata](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Koristite Azure API Management ekstenziju za VS Code za uvoz i upravljanje API-jima](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registrirajte i otkrijte udaljene MCP poslužitelje u Azure API Centru](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Izvrsni repozitorij koji prikazuje mnoge AI mogućnosti uz Azure API Management
- [AI Gateway radionice](https://azure-samples.github.io/AI-Gateway/) Sadrži radionice koristeći Azure Portal, što je sjajan način za početak evaluacije AI mogućnosti.

## Što je sljedeće

- Natrag na: [Pregled studija slučaja](./README.md)
- Sljedeće: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o odricanju**:
Ovaj je dokument preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvorom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->