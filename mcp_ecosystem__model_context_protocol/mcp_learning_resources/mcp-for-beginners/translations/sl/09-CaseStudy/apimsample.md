# Študija primera: Razkritje REST API v upravljanju API kot MCP strežnik

Azure API Management je storitev, ki zagotavlja prehod (Gateway) nad vašimi API končnimi točkami. Deluje tako, da Azure API Management deluje kot proxy pred vašimi API-ji in lahko odloča, kaj narediti z dohodnimi zahtevki.

Z uporabo te storitve dodate številne funkcije, kot so:

- **Varnost**, lahko uporabite vse od API ključev, JWT do upravljanih identitet.
- **Omejitev hitrosti**, odličen funkcija je možnost odločanja, koliko klicev gre skozi v določenem časovnem enoti. To pomaga zagotoviti odlično uporabniško izkušnjo in tudi, da vaša storitev ni preobremenjena z zahtevki.
- **Razširljivost in uravnoteženje obremenitve**. Lahko nastavite število končnih točk za uravnoteženje obremenitve in lahko odločite, kako "uravnotežiti obremenitev".
- **AI funkcije, kot so semantični cache, omejitev tokenov in spremljanje tokenov ter druge.** Te funkcije izboljšujejo odzivnost in vam pomagajo imeti nadzor nad porabo tokenov. [Preberite več tukaj](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Zakaj MCP + Azure API Management?

Model Context Protocol hitro postaja standard za agentne AI aplikacije in način razkrivanja orodij ter podatkov na dosleden način. Azure API Management je naravna izbira, ko morate "upravljati" API-je. MCP strežniki se pogosto integrirajo z drugimi API-ji za reševanje zahtevkov do orodja, na primer. Zato ima smisel združevanje Azure API Management in MCP.

## Pregled

V tem specifičnem primeru bomo izvedeli, kako razkriti API končne točke kot MCP strežnik. S tem lahko enostavno vključimo te končne točke kot del agentne aplikacije ter hkrati izkoristimo funkcije Azure API Management.

## Ključne funkcije

- Izberete metode končne točke, ki jih želite razkriti kot orodja.
- Dodatne funkcije, ki jih dobite, so odvisne od tega, kaj konfigurirate v odseku pravil (policy) za svoj API. Tukaj vam bomo pokazali, kako lahko dodate omejitev hitrosti.

## Predkorak: uvoz API-ja

Če že imate API v Azure API Management, super, lahko ta korak preskočite. Če ne, preverite ta povezavo, [uvoz API v Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Razkritje API kot MCP strežnik

Za razkritje API končnih točk sledite tem korakom:

1. Pojdite na Azure Portal in na naslednji naslov <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Pojdite na vaš API Management primerek.

1. V levem meniju izberite APIs > MCP Servers > + Create new MCP Server.

1. V API izberite REST API, ki ga želite razkriti kot MCP strežnik.

1. Izberite eno ali več API operacij za razkritje kot orodja. Lahko izberete vse operacije ali le določene.

    ![Izberite metode za razkritje](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Izberite **Ustvari**.

1. Pojdite v meni **APIs** in **MCP Servers**, videti bi morali naslednje:

    ![Pogled MCP strežnika v glavnem prikazu](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP strežnik je ustvarjen in API operacije so razkrite kot orodja. MCP strežnik je naveden v prikazu MCP Servers. Stolpec URL prikazuje končno točko MCP strežnika, na katero lahko kličete za testiranje ali znotraj odjemalske aplikacije.

## Izbirno: konfiguracija pravil (policies)

Azure API Management ima osnovni koncept pravil, kjer nastavljate različna pravila za končne točke, npr. omejitev hitrosti ali semantični cache. Ta pravila so zapisana v XML-ju.

Tukaj je, kako lahko nastavite pravilo za omejitev hitrosti na vašem MCP strežniku:

1. V portalu, pod APIs, izberite **MCP Servers**.

1. Izberite MCP strežnik, ki ste ga ustvarili.

1. V levem meniju, pod MCP, izberite **Policies**.

1. V urejevalniku pravil dodajte ali uredite pravila, ki jih želite uveljaviti za orodja MCP strežnika. Pravila so definirana v XML formatu. Na primer, lahko dodate pravilo za omejitev klicev na orodja MCP strežnika (v tem primeru 5 klicev na 30 sekund za vsak IP naslov odjemalca). Tukaj je XML, ki bo omejil hitrost:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Tukaj je slika urejevalnika pravil:

    ![Urejevalnik pravil](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Preizkusite

Preverimo, ali naš MCP strežnik deluje, kot je bilo načrtovano.

Za to bomo uporabili Visual Studio Code in GitHub Copilot z načinom agenta. MCP strežnik bomo dodali v datoteko *mcp.json*. S tem bo Visual Studio Code deloval kot odjemalec z agentnimi zmožnostmi, končni uporabniki pa bodo lahko vnesli poziv (prompt) in komunicirali s strežnikom.

Poglejmo, kako MCP strežnik dodati v Visual Studio Code:

1. Uporabite ukaz MCP: **Add Server iz ukazne palete**.

1. Ko vas vpraša, izberite tip strežnika: **HTTP (HTTP ali Server Sent Events)**.

1. Vnesite URL MCP strežnika v API Management. Primer: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (za SSE končno točko) ali **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (za MCP končno točko), opazite razliko v prenosih: `/sse` ali `/mcp`.

1. Vnesite poljuben ID strežnika po vaši izbiri. Ni zelo pomembna vrednost, a vam bo pomagala zapomniti si ta primerek strežnika.

1. Izberite, ali shranite konfiguracijo v nastavitve delovnega prostora ali uporabniške nastavitve.

  - **Nastavitve delovnega prostora** - konfiguracija strežnika je shranjena v datoteko .vscode/mcp.json, ki je na voljo samo v trenutnem delovnem prostoru.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    ali če izberete prenos HTTP streaminga, je nekoliko drugače:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Uporabniške nastavitve** - konfiguracija strežnika je dodana v globalno *settings.json* datoteko in je na voljo v vseh delovnih prostorih. Konfiguracija izgleda podobno kot spodaj:

    ![Uporabniške nastavitve](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Morate dodati tudi glavo (header), da se zagotovi pravilna avtentikacija do Azure API Management. Uporablja se glava z imenom **Ocp-Apim-Subscription-Key**.

    - Tukaj je, kako jo lahko dodate v nastavitve:

    ![Dodajanje glave za avtentikacijo](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), kar bo prikazalo poziv za vnos vrednosti API ključa, ki ga najdete v Azure Portalu za vaš primerek Azure API Management.

   - Če jo želite dodati raje v *mcp.json*, jo lahko dodate tako:

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

### Uporaba načina agenta

Zdaj smo nastavljeni bodisi v nastavitvah ali v *.vscode/mcp.json*. Preizkusimo.

Morala bi biti vidna ikona Orodij, kjer so našteta razkrita orodja iz vašega strežnika:

![Orodja s strežnika](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Kliknite ikono orodij in videli boste seznam orodij, kot je spodaj:

    ![Orodja](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Vnesite poziv v klepet, da aktivirate orodje. Na primer, če ste izbrali orodje za pridobitev informacij o naročilu, lahko agenta vprašate o naročilu. Tukaj je primer poziva:

    ```text
    get information from order 2
    ```

    Sedaj boste videli ikono orodij, ki vas bo vprašala, ali želite nadaljevati z uporabo orodja. Izberite nadaljevanje uporabe orodja, videli boste izhod kot spodaj:

    ![Rezultat poziva](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **kar vidite zgoraj, je odvisno od tega, katera orodja ste nastavili, vendar ideja je, da dobite besedilni odgovor, kot je zgoraj**


## Reference

Tukaj se lahko naučite več:

- [Vadnica o Azure API Management in MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Primer v Pythonu: Zavarovani oddaljeni MCP strežniki z Azure API Management (eksperimentalno)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP klient laboratorij za avtorizacijo](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Uporaba razširitve Azure API Management za VS Code za uvoz in upravljanje API-jev](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registracija in odkrivanje oddaljenih MCP strežnikov v Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Odličen repo, ki prikazuje veliko AI funkcij z Azure API Management
- [Delavnice AI Gateway](https://azure-samples.github.io/AI-Gateway/) Vsebuje delavnice z uporabo Azure Porta, kar je odličen način za začetek ocenjevanja AI funkcij.

## Kaj sledi

- Nazaj na: [Pregled študij primerov](./README.md)
- Naslednje: [Azure AI Potovalni agenti](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o omejitvi odgovornosti**:  
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku velja za avtoritativni vir. Za ključne informacije je priporočljiv strokovni človeški prevod. Za kakršnekoli nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda, ne prevzemamo odgovornosti.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->