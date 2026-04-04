# Atvejo analizė: REST API pateikimas API valdyme kaip MCP serveris

Azure API Management yra paslauga, kuri suteikia vartus virš jūsų API galinių taškų. Azure API Management veikia kaip tarpinis serveris jūsų API priekyje ir gali nuspręsti, ką daryti su gaunamais užklausimais.

Naudodami šią paslaugą, gaunate daug funkcijų, tokių kaip:

- **Saugumas**, galite naudoti viską nuo API raktų, JWT iki valdomos tapatybės.
- **Ribojimas pagal užklausų dažnį**, puiki funkcija, leidžianti nuspręsti, kiek užklausų praleidžiama per tam tikrą laikotarpį. Tai padeda užtikrinti, kad visi vartotojai turėtų puikią patirtį ir kad jūsų paslauga nebūtų perkrauta užklausomis.
- **Mastelio keitimas ir apkrovos balansavimas**. Galite nustatyti kelis galinius taškus apkrovos balansavimui ir taip pat pasirinkti, kaip vykdyti apkrovos balansavimą.
- **Dirbtinio intelekto funkcijos, tokios kaip semantinė talpykla, žetonų limitas ir stebėjimas** bei daugiau. Tai puikios funkcijos, kurios pagerina reakcijos greitį ir padeda valdyti savo žetonų išlaidų kontrolę. [Skaitykite daugiau čia](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Kodėl MCP + Azure API Management?

Modelio konteksto protokolas (Model Context Protocol) greitai tampa standartu agentinėms DI programoms ir būdu nuosekliai pateikti įrankius bei duomenis. Azure API Management yra natūralus pasirinkimas, kai reikia „valdyti“ API. MCP serveriai dažnai susijungia su kitais API siekiant spręsti užklausas įrankiams, pavyzdžiui. Todėl Azure API Management ir MCP derinys yra visiškai prasmingas.

## Apžvalga

Šiame konkrečiame atvejyje sužinosime, kaip pateikti API galinius taškus kaip MCP serverį. Tai leis patogiai įtraukti šiuos galinius taškus į agentinę programą, tuo pačiu pasinaudojant Azure API Management funkcijomis.

## Pagrindinės funkcijos

- Pasirenkate galinių taškų metodus, kuriuos norite pateikti kaip įrankius.
- Papildomos funkcijos priklauso nuo to, ką sukonfigūruosite politikos skiltyje savo API. Čia parodysime, kaip pridėti užklausų dažnio ribojimą.

## Paruošiamasis žingsnis: importuoti API

Jei jau turite API Azure API Management, puiku, galite praleisti šį žingsnį. Jei ne, patikrinkite šią nuorodą, [importuoti API į Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## API pateikimas kaip MCP serverio

Pateikdami API galinius taškus, laikykitės šių žingsnių:

1. Eikite į Azure portalą adresu <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
   Pasirinkite savo API valdymo instanciją.

1. Kairiajame meniu pasirinkite APIs > MCP Servers > + Create new MCP Server.

1. API skiltyje pasirinkite REST API, kurį norite pateikti kaip MCP serverį.

1. Pasirinkite vieną ar daugiau API operacijų, kurias norite pateikti kaip įrankius. Galite pasirinkti visas operacijas arba tik konkrečias.

    ![Pasirinkite metodus pateikimui](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Paspauskite **Create**.

1. Meniu pasirinkite **APIs** ir **MCP Servers**, turėtumėte matyti štai ką:

    ![MCP serveris pagrindiniame lange](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP serveris sukurtas, o API operacijos pateiktos kaip įrankiai. MCP serveris rodomas MCP Servers skiltyje. URL stulpelis rodo MCP serverio galinį tašką, kurį galite naudoti testavimui arba kliento aplikacijoje.

## Pasirinktinai: Politikų konfigūravimas

Azure API Management turi pagrindinę sąvoką – politikas, kuriose nustatote įvairias taisykles savo galiniams taškams, pavyzdžiui, užklausų ribojimą ar semantinę talpyklą. Šios politikos rašomos XML kalba.

Štai kaip galite nustatyti politiką, ribojančią užklausas į MCP serverį:

1. Portale, po APIs, pasirinkite **MCP Servers**.

1. Pasirinkite sukurtą MCP serverį.

1. Kairiajame meniu, po MCP, pasirinkite **Policies**.

1. Politikų redaktoriuje pridėkite arba redaguokite norimas taikyti politikos MCP serverio įrankiams. Politikos aprašytos XML formatu. Pavyzdžiui, galite pridėti politiką, kuri riboja MCP serverio įrankių užklausų skaičių (šiame pavyzdyje – 5 užklausos per 30 sekundžių kiekvienam kliento IP adresui). Štai XML, kuris taikys užklausų ribojimą:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```
  
    Štai politikos redaktoriaus vaizdas:

    ![Politikos redaktorius](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Išbandykite

Įsitikinkime, kad mūsų MCP serveris veikia tinkamai.

Tam naudosime Visual Studio Code ir GitHub Copilot agento režimą. Į *mcp.json* pridėsime MCP serverį. Taip Visual Studio Code veiks kaip klientas su agentinėmis galimybėmis, o galutiniai vartotojai galės įrašyti užklausą ir bendrauti su serveriu.

Štai kaip pridėti MCP serverį Visual Studio Code:

1. Naudokite komandą MCP: **Add Server** iš komandos paletės.

1. Kai bus prašoma, pasirinkite serverio tipą: **HTTP (HTTP arba Server Sent Events)**.

1. Įveskite MCP serverio URL Azure API Management. Pavyzdžiui: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE galiniam taškui) arba **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP galiniam taškui), atkreipkite dėmesį į skirtingus transporto tipus: `/sse` arba `/mcp`.

1. Įveskite serverio ID pagal savo pasirinkimą. Tai nėra svarbi reikšmė, bet padės prisiminti, kas tai per serverio instancija.

1. Pasirinkite, ar išsaugoti konfigūraciją savo darbo erdvės nustatymuose, ar vartotojo nustatymuose.

  - **Darbo erdvės nustatymai** – serverio konfigūracija išsaugoma .vscode/mcp.json faile, kuris galioja tik dabartinėje darbo erdvėje.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```
  
    arba, jei pasirinksite srautinį HTTP transportą, tai atrodys šiek tiek kitaip:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```
  
  - **Vartotojo nustatymai** – serverio konfigūracija pridedama prie globalaus *settings.json* failo ir galioja visose darbo erdvėse. Konfigūracija atrodo maždaug taip:

    ![Vartotojo nustatymai](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Taip pat reikės pridėti konfigūraciją – antraštę, užtikrinančią tinkamą autentifikavimą prieš Azure API Management. Naudojama antraštė **Ocp-Apim-Subscription-Key**.

    - Štai kaip ją pridėti į nustatymus:

    ![Antraštės pridėjimas autentifikavimui](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), tai sukels užklausą nurodyti API rakto reikšmę, kurią rasite Azure portale savo API Management instancijoje.

   - Norėdami pridėti į *mcp.json*, galite pridėti taip:

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

### Naudojimas agento režimu

Dabar viskas paruošta tiek nustatymuose, tiek *.vscode/mcp.json*. Išbandykime.

Turėtų būti Įrankių piktograma, kurioje pateikti jūsų serverio išeksportuoti įrankiai:

![Serverio įrankiai](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Spustelėkite įrankių piktogramą, turėtumėte matyti įrankių sąrašą:

    ![Įrankiai](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Įveskite užklausą pokalbiui, kad iškvietumėte įrankį. Pavyzdžiui, jei pasirinktą įrankį, kuris pateikia informaciją apie užsakymą, galite paklausti agento apie konkretų užsakymą. Štai pavyzdinė užklausa:

    ```text
    get information from order 2
    ```
  
    Jums bus parodyta įrankių piktograma, klausianti toliau tęsti įrankio kvietimą. Pasirinkite tęsti, turėtumėte matyti tokį atsakymą:

    ![Atsakymas iš užklausos](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **tai, ką matote aukščiau, priklauso nuo nustatytų įrankių, bet esmė, kad gaunate tekstinį atsakymą, kaip parodyta**

## Nuorodos

Štai kur galite sužinoti daugiau:

- [Pamoka apie Azure API Management ir MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python pavyzdys: saugūs nuotoliniai MCP serveriai naudojant Azure API Management (eksperimentinis)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP kliento autorizacijos laboratorija](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Naudokite Azure API Management plėtinį VS Code, kad importuotumėte ir valdytumėte API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Registruokite ir raskite nuotolinius MCP serverius Azure API Centre](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Puikus repozitorijus, kuris demonstruoja daugelį DI galimybių su Azure API Management
- [AI Gateway dirbtuvės](https://azure-samples.github.io/AI-Gateway/) Apima dirbtuves naudojant Azure portalą, puikus būdas pradėti vertinti DI galimybes.

## Kas toliau

- Grįžti į: [Atvejo analizės apžvalga](./README.md)
- Toliau: [Azure DI kelionių agentai](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome atkreipti dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojamas profesionalus žmogaus atliktas vertimas. Mes neatsakome už jokius nesusipratimus ar neteisingus interpretavimus, atsiradusius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->