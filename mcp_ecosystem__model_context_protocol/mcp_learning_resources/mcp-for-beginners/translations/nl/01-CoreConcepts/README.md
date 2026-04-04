# MCP Kernconcepten: Beheersing van het Model Context Protocol voor AI-integratie

[![MCP Kernconcepten](../../../translated_images/nl/02.8203e26c6fb5a797.webp)](https://youtu.be/earDzWGtE84)

_(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

Het [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) is een krachtig, gestandaardiseerd raamwerk dat de communicatie optimaliseert tussen grote taalmodellen (LLM's) en externe hulpmiddelen, applicaties en databronnen.  
Deze gids leidt je door de kernconcepten van MCP. Je leert over de client-serverarchitectuur, essentiële componenten, communicatiemechanismen en beste praktijken voor implementatie.

- **Expliciete Gebruikers-toestemming**: Alle gegevenstoegang en bewerkingen vereisen expliciete goedkeuring van de gebruiker vóór uitvoering. Gebruikers moeten duidelijk begrijpen welke gegevens worden geraadpleegd en welke acties worden uitgevoerd, met fijne controle over machtigingen en autorisaties.

- **Bescherming van Gegevensprivacy**: Gebruikersgegevens worden alleen gedeeld met expliciete toestemming en moeten worden beschermd door robuuste toegangscontroles gedurende de gehele interactielifecycle. Implementaties moeten ongeautoriseerde gegevensoverdracht voorkomen en strikte privacygrenzen handhaven.

- **Veiligheid bij Tool-uitvoering**: Elke aanroep van een tool vereist expliciete gebruikersgoedkeuring met duidelijke kennis van functionaliteit, parameters en mogelijke gevolgen. Robuuste beveiligingsgrenzen voorkomen ongewenste, onveilige of kwaadaardige tool-uitvoering.

- **Transportlaagbeveiliging**: Alle communicatiekanalen moeten gebruikmaken van passende versleutelings- en authenticatiemechanismen. Externe verbindingen dienen beveiligde transportprotocollen en correcte inlogbeheer toe te passen.

#### Implementatierichtlijnen:

- **Machtigingsbeheer**: Implementeer fijnmazige machtigingssystemen waarmee gebruikers kunnen bepalen welke servers, tools en bronnen toegankelijk zijn  
- **Authenticatie & Authorisatie**: Gebruik veilige authenticatiemethoden (OAuth, API-sleutels) met correct tokenbeheer en vervaltijden  
- **Invoervalidatie**: Valideer alle parameters en gegevensinvoer volgens gedefinieerde schema's om injectieaanvallen te voorkomen  
- **Auditlogging**: Houd uitvoerige logs bij van alle operaties voor beveiligingsmonitoring en naleving  

## Overzicht

Deze les behandelt de fundamentele architectuur en componenten die het Model Context Protocol (MCP) ecosysteem vormen. Je leert over de client-serverarchitectuur, de belangrijkste componenten en de communicatieprocessen die MCP-interacties aandrijven.

## Belangrijkste Leerdoelen

Aan het einde van deze les zul je:

- De MCP client-serverarchitectuur begrijpen.  
- De rollen en verantwoordelijkheden van Hosts, Clients en Servers kunnen identificeren.  
- De kernkenmerken analyseren die MCP tot een flexibele integratielaag maken.  
- Begrijpen hoe informatie binnen het MCP-ecosysteem stroomt.  
- Praktische inzichten opdoen via codevoorbeelden in .NET, Java, Python en JavaScript.

## MCP Architectuur: Een Diepere Kijk

Het MCP-ecosysteem is gebouwd op een client-servermodel. Deze modulaire structuur stelt AI-toepassingen in staat efficiënt te communiceren met tools, databases, API's en contextuele bronnen. Laten we deze architectuur opsplitsen in de kerncomponenten.

In essentie volgt MCP een client-serverarchitectuur waarbij een hostapplicatie met meerdere servers kan verbinden:

```mermaid
flowchart LR
    subgraph "Uw Computer"
        Host["Host met MCP (Visual Studio, VS Code, IDE's, Hulpmiddelen)"]
        S1["MCP Server A"]
        S2["MCP Server B"]
        S3["MCP Server C"]
        Host <-->|"MCP Protocol"| S1
        Host <-->|"MCP Protocol"| S2
        Host <-->|"MCP Protocol"| S3
        S1 <--> D1[("Lokaal\Data Bron A")]
        S2 <--> D2[("Lokaal\Data Bron B")]
    end
    subgraph "Internet"
        S3 <-->|"Web API's"| D3[("Externe\Diensten")]
    end
```
- **MCP Hosts**: Programma’s zoals VSCode, Claude Desktop, IDE’s of AI-tools die via MCP toegang willen tot data  
- **MCP Clients**: Protocolclients die één-op-één verbindingen met servers onderhouden  
- **MCP Servers**: Lichtgewicht programma’s die elk specifieke mogelijkheden via het gestandaardiseerde Model Context Protocol aanbieden  
- **Lokale Databronnen**: Bestanden, databases en diensten op jouw computer die MCP-servers veilig kunnen benaderen  
- **Externe Diensten**: Externe systemen via internet beschikbaar waarop MCP-servers via API's kunnen aansluiten.

Het MCP-protocol is een evoluerende standaard met datumgebaseerde versiebeheer (in formaat JJJJ-MM-DD). De huidige protocolversie is **2025-11-25**. De nieuwste updates zijn zichtbaar in de [protocollspecificatie](https://modelcontextprotocol.io/specification/2025-11-25/)

### 1. Hosts

In het Model Context Protocol (MCP) zijn **Hosts** AI-toepassingen die als primaire interface dienen waar gebruikers via het protocol mee interacteren. Hosts coördineren en beheren verbindingen met meerdere MCP-servers door dedicated MCP-clients te creëren voor elke serververbinding. Voorbeelden van Hosts zijn:

- **AI-toepassingen**: Claude Desktop, Visual Studio Code, Claude Code  
- **Ontwikkelomgevingen**: IDE’s en code-editors met MCP-integratie  
- **Aangepaste Toepassingen**: Speciaal gebouwde AI-agents en tools  

**Hosts** zijn applicaties die interacties met AI-modellen coördineren. Ze:

- **Orkestreren AI-modellen**: Voeren uit of communiceren met LLM’s om reacties te genereren en AI-workflows te coördineren  
- **Beheren Clientverbindingen**: Creëren en onderhouden één MCP-client per MCP-serververbinding  
- **Controleren Gebruikersinterface**: Beheren gespreksstromen, gebruikersinteracties en weergave van reacties  
- **Handhaven Beveiliging**: Beheer van permissies, beveiligingsrestricties en authenticatie  
- **Beheren Gebruikers-toestemming**: Regelen goedkeuring voor datadeling en tool-uitvoering

### 2. Clients

**Clients** zijn essentiële componenten die dedicated één-op-één verbindingen onderhouden tussen Hosts en MCP-servers. Elke MCP-client wordt door de Host geïnstantieerd om verbinding te maken met een specifieke MCP-server, waarmee georganiseerde en beveiligde communicatiekanalen gewaarborgd zijn. Meerdere clients maken simultane verbinding met diverse servers mogelijk.

**Clients** zijn connectorcomponenten binnen de hostapplicatie. Ze:

- **Protocolcommunicatie**: Verzenden JSON-RPC 2.0-verzoeken naar servers met prompts en instructies  
- **Mogelijkhedentonderhandeling**: Onderhandelen over ondersteunde functies en protocolversies met servers bij initialisatie  
- **Tooluitvoering**: Beheren tool-uitvoeringsverzoeken van modellen en verwerken de antwoorden  
- **Real-time Updates**: Handelen notificaties en realtime-updates van servers af  
- **Responsverwerking**: Verwerken en formatteren serverantwoorden voor weergave aan gebruikers  

### 3. Servers

**Servers** zijn programma’s die context, tools en mogelijkheden aan MCP-clients bieden. Ze kunnen lokaal draaien (op dezelfde machine als de Host) of op afstand (externe platforms), en zijn verantwoordelijk voor het verwerken van clientverzoeken en het leveren van gestructureerde reacties. Servers bieden specifieke functionaliteit via het gestandaardiseerde Model Context Protocol.

**Servers** zijn diensten die context en capabilities leveren. Ze:

- **Functieregistratie**: Registreren en bieden beschikbare primitives (middelen, prompts, tools) aan clients aan  
- **Verzoekverwerking**: Ontvangen en voeren toolcalls, resourcevragen en prompt-aanvragen van clients uit  
- **Contextvoorziening**: Bieden contextuele informatie en data voor betere modelantwoorden  
- **Statusbeheer**: Beheren sessiestatus en ondersteunen stateful interacties indien nodig  
- **Realtime Notificaties**: Verzenden meldingen over verandering in mogelijkheden en updates aan verbonden clients

Servers kunnen door iedereen ontwikkeld worden om modelmogelijkheden uit te breiden met gespecialiseerde functionaliteit, en ondersteunen zowel lokale als remote deployment scenarios.

### 4. Server Primitives

Servers in het Model Context Protocol (MCP) bieden drie kern-**primitives** die de fundamentele bouwstenen definiëren voor rijke interacties tussen clients, hosts en taalmodellen. Deze primitives specificeren het type contextuele informatie en acties die via het protocol beschikbaar zijn.

MCP-servers kunnen elke combinatie van de volgende drie kernprimitives aanbieden:

#### Bronnen (Resources)

**Resources** zijn databronnen die contextuele informatie aan AI-toepassingen leveren. Ze vertegenwoordigen statische of dynamische inhoud die de modelbegrip en besluitvorming kunnen verbeteren:

- **Contextuele Data**: Gestructureerde informatie en context voor consumptie door AI-modellen  
- **Kennisdatabases**: Documentenarchieven, artikelen, handleidingen en wetenschappelijke papers  
- **Lokale Databronnen**: Bestanden, databases en lokale systeeminformatie  
- **Externe Data**: API-responses, webservices en externe systeemgegevens  
- **Dynamische Inhoud**: Real-time data die bijgewerkt wordt op basis van externe omstandigheden

Resources worden geïdentificeerd met URI’s en ondersteunen ontdekking via `resources/list` en ophalen via `resources/read` methoden:

```text
file://documents/project-spec.md
database://production/users/schema
api://weather/current
```

#### Prompts

**Prompts** zijn herbruikbare sjablonen die helpen interacties met taalmodellen te structureren. Ze bieden gestandaardiseerde interactiepatronen en templates voor workflows:

- **Sjabloongebaseerde Interacties**: Vooraf gestructureerde berichten en gespreksstarters  
- **Workflowtemplates**: Gestandaardiseerde reeksen voor algemene taken en interacties  
- **Few-shot Voorbeelden**: Voorbeelden-gebaseerde sjablonen voor modelinstructie  
- **Systeem Prompts**: Fundamentele prompts die modelgedrag en context definiëren  
- **Dynamische Sjablonen**: Parameteriseerbare prompts die zich aanpassen aan specifieke contexten

Prompts ondersteunen variabele substitutie en kunnen worden ontdekt via `prompts/list` en opgehaald met `prompts/get`:

```markdown
Generate a {{task_type}} for {{product}} targeting {{audience}} with the following requirements: {{requirements}}
```

#### Tools

**Tools** zijn uitvoerbare functies die AI-modellen kunnen aanroepen om specifieke handelingen uit te voeren. Ze zijn de "werkwoorden" van het MCP-ecosysteem en stellen modellen in staat met externe systemen te interacteren:

- **Uitvoerbare Functies**: Afgebakende operaties die modellen kunnen oproepen met specifieke parameters  
- **Integratie Externe Systemen**: API-aanroepen, databasequeries, bestandsbewerkingen, berekeningen  
- **Unieke Identiteit**: Elke tool heeft een aparte naam, beschrijving en parameterschema  
- **Gestructureerde I/O**: Tools accepteren gevalideerde parameters en retourneren gestructureerde, getypeerde antwoorden  
- **Actie-mogelijkheden**: Stelt modellen in staat om acties uit te voeren in de echte wereld en live data op te halen

Tools worden gedefinieerd met JSON Schema voor parameter-validatie en ontdekt via `tools/list` en uitgevoerd via `tools/call`. Tools kunnen ook **iconen** als extra metadata bevatten voor betere UI-weergave.

**Tool Annotaties**: Tools ondersteunen gedragsannotaties (zoals `readOnlyHint`, `destructiveHint`) die aangeven of een tool alleen-lezen is of destructief, waardoor clients weloverwogen beslissingen kunnen nemen over tooluitvoering.

Voorbeeld tooldefinitie:

```typescript
server.tool(
  "search_products", 
  {
    query: z.string().describe("Search query for products"),
    category: z.string().optional().describe("Product category filter"),
    max_results: z.number().default(10).describe("Maximum results to return")
  }, 
  async (params) => {
    // Voer een zoekopdracht uit en retourneer gestructureerde resultaten
    return await productService.search(params);
  }
);
```

## Client Primitives

In het Model Context Protocol (MCP) kunnen **clients** primitives aanbieden waarmee servers aanvullende mogelijkheden kunnen aanvragen bij de hostapplicatie. Deze client-side primitives stellen rijkere, interactievere serverimplementaties in staat die AI-modelmogelijkheden en gebruikersinteracties kunnen benutten.

### Sampling

**Sampling** stelt servers in staat taalmodel-completions op te vragen van de AI-applicatie van de client. Deze primitive maakt het servers mogelijk modelcapabilities te gebruiken zonder eigen modeldependencies in te bouwen:

- **Modelonafhankelijke Toegang**: Servers kunnen completions aanvragen zonder LLM-SDK's of direct modelbeheer  
- **Server-geïnitieerde AI**: Stelt servers in staat autonoom inhoud te genereren met het model van de client  
- **Recursieve LLM-interacties**: Ondersteunt complexe scenario’s waarin servers AI-hulp nodig hebben voor verwerking  
- **Dynamische Contentgeneratie**: Laat servers contextuele reacties creëren via het model van de host  
- **Toolaanroepondersteuning**: Servers kunnen `tools` en `toolChoice` parameters gebruiken om het model van de client tools te laten aanroepen tijdens sampling

Sampling wordt gestart via de `sampling/complete` methode waarbij servers completieverzoeken naar clients sturen.

### Roots

**Roots** bieden een gestandaardiseerde manier voor clients om bestandssysteemgrenzen aan servers bloot te leggen, zodat servers weten tot welke mappen en bestanden ze toegang hebben:

- **Bestandssysteemgrenzen**: Definiëren de toegangsgebieden voor servers binnen het bestandssysteem  
- **Toegangsbeheer**: Helpen servers begrijpen welke mappen en bestanden toegankelijk zijn  
- **Dynamische Updates**: Clients kunnen servers informeren als de lijst van roots verandert  
- **URI-gebaseerde Identificatie**: Roots worden met `file://` URI’s geïdentificeerd, wat toegankelijke directory’s en bestanden aanwijst

Roots worden ontdekt via de `roots/list` methode, waarbij clients `notifications/roots/list_changed` verzenden bij wijzigingen.

### Elicitation

**Elicitation** stelt servers in staat aanvullende informatie of bevestiging van gebruikers te vragen via de clientinterface:

- **Gebruikersinvoer Verzoeken**: Servers kunnen om extra informatie vragen die nodig is voor tooluitvoering  
- **Bevestigingsdialogen**: Vragen gebruikersgoedkeuring voor gevoelige of impactvolle handelingen  
- **Interactieve Workflows**: Stellen servers in staat stapsgewijze gebruikersinteracties te creëren  
- **Dynamische Parameterverzameling**: Verzamelen ontbrekende of optionele parameters tijdens tooluitvoering

Elicitation-verzoeken worden gedaan met de `elicitation/request` methode om gebruikersinvoer via de clientinterface te verzamelen.

**URL Mode Elicitation**: Servers kunnen ook URL-gebaseerde gebruikersinteracties aanvragen, waarmee ze gebruikers naar externe webpagina’s sturen voor authenticatie, bevestiging of gegevensinvoer.

### Logging

**Logging** stelt servers in staat gestructureerde logberichten naar clients te sturen voor debugging, monitoring en operationele zichtbaarheid:

- **Ondersteuning voor Debugging**: Servers kunnen gedetailleerde uitvoeringslogs voor probleemoplossing leveren  
- **Operationele Monitoring**: Verzend statusupdates en prestatiestatistieken naar clients  
- **Foutmelding**: Biedt gedetailleerde foutcontext en diagnostische informatie  
- **Audit Trails**: Creëert uitgebreide logs van serveractiviteiten en beslissingen

Logging-berichten worden naar clients gestuurd om transparantie van serveroperaties te verhogen en debugging te faciliteren.

## Informatiestroom in MCP

Het Model Context Protocol (MCP) definieert een gestructureerde stroom van informatie tussen hosts, clients, servers en modellen. Inzicht in deze stroom verduidelijkt hoe gebruikersverzoeken worden verwerkt en hoe externe tools en data geïntegreerd worden in modelantwoorden.
- **Host start verbinding**  
  De hostapplicatie (zoals een IDE of chatinterface) maakt een verbinding met een MCP-server, meestal via STDIO, WebSocket of een ander ondersteund transport.

- **Capaciteitenonderhandeling**  
  De client (ingebed in de host) en de server wisselen informatie uit over hun ondersteunde functies, tools, bronnen en protocolversies. Dit zorgt ervoor dat beide zijden begrijpen welke mogelijkheden beschikbaar zijn voor de sessie.

- **Gebruikersverzoek**  
  De gebruiker interageert met de host (bijv. voert een prompt of commando in). De host verzamelt deze invoer en geeft deze door aan de client voor verwerking.

- **Gebruik van bron of tool**  
  - De client kan extra context of bronnen van de server opvragen (zoals bestanden, database-items of kennisbankartikelen) om het begrip van het model te verrijken.  
  - Als het model bepaalt dat een tool nodig is (bijv. om gegevens op te halen, een berekening uit te voeren of een API aan te roepen), stuurt de client een tool-aanroepverzoek naar de server, met specificatie van de toolnaam en parameters.

- **Serveruitvoering**  
  De server ontvangt het bron- of toolverzoek, voert de noodzakelijke operaties uit (zoals het uitvoeren van een functie, het opvragen van een database of het ophalen van een bestand) en retourneert de resultaten aan de client in een gestructureerd formaat.

- **Antwoordgeneratie**  
  De client integreert de serverresponsen (brongegevens, tooluitvoer, enz.) in de lopende modelinteractie. Het model gebruikt deze informatie om een uitgebreid en contextueel relevant antwoord te genereren.

- **Resultaatpresentatie**  
  De host ontvangt de definitieve output van de client en presenteert deze aan de gebruiker, vaak inclusief zowel de door het model gegenereerde tekst als eventuele resultaten van tooluitvoeringen of bronopvragingen.

Deze flow maakt het MCP mogelijk om geavanceerde, interactieve en contextbewuste AI-toepassingen te ondersteunen door modellen naadloos te verbinden met externe tools en databronnen.

## Protocolarchitectuur & lagen

MCP bestaat uit twee onderscheiden architectuurlagen die samenwerken om een compleet communicatieframework te bieden:

### Datalayer

De **Datalayer** implementeert het kern-MCP-protocol met **JSON-RPC 2.0** als fundament. Deze laag definieert de berichtenstructuur, semantiek en interactiepatronen:

#### Kerncomponenten:

- **JSON-RPC 2.0 Protocol**: Alle communicatie gebruikt het gestandaardiseerde JSON-RPC 2.0 berichtformaat voor methodeaanroepen, antwoorden en notificaties  
- **Levenscyclusbeheer**: Behandelt verbindinginitialisatie, capaciteitenonderhandeling en sessiebeëindiging tussen clients en servers  
- **Serverprimitieven**: Stelt servers in staat kernfunctionaliteit te bieden via tools, bronnen en prompts  
- **Clientprimitieven**: Stelt servers in staat sampling van LLM’s te vragen, gebruikersinput uit te lokken en logberichten te verzenden  
- **Real-time notificaties**: Ondersteunt asynchrone meldingen voor dynamische updates zonder polling

#### Belangrijke kenmerken:

- **Protocolversieonderhandeling**: Gebruikt datumbased versiebeheer (JJJJ-MM-DD) om compatibiliteit te waarborgen  
- **Capabiliteitsontdekking**: Clients en servers wisselen ondersteunde functie-informatie uit tijdens initialisatie  
- **Stateful sessies**: Onderhoudt verbindingsstatus over meerdere interacties voor contextcontinuïteit

### Transportlayer

De **Transportlayer** beheert communicatiekanalen, berichtenkadering en authenticatie tussen MCP-deelnemers:

#### Ondersteunde transportmechanismen:

1. **STDIO Transport**:  
   - Gebruikt standaardinvoer/-uitvoer streams voor directe procescommunicatie  
   - Optimaal voor lokale processen op dezelfde machine zonder netwerkoverhead  
   - Veelgebruikt voor lokale MCP-serverimplementaties

2. **Streamable HTTP Transport**:  
   - Gebruikt HTTP POST voor client-naar-server berichten  
   - Optionele Server-Sent Events (SSE) voor server-naar-client streaming  
   - Staat communicatie met externe servers toe over netwerken  
   - Ondersteunt standaard HTTP-authenticatie (bearer tokens, API-sleutels, aangepaste headers)  
   - MCP raadt OAuth aan voor veilige token-gebaseerde authenticatie

#### Transportabstrahering:

De transportlaag abstraheert communicatiedetails van de datalaag, waardoor hetzelfde JSON-RPC 2.0 berichtformaat over alle transportmechanismen gebruikt kan worden. Deze abstractie maakt het mogelijk om naadloos te wisselen tussen lokale en externe servers.

### Beveiligingsoverwegingen

MCP-implementaties moeten aan verschillende kritieke beveiligingsprincipes voldoen om veilige, betrouwbare en beveiligde interacties over alle protocoloperaties te waarborgen:

- **Toestemming en controle van de gebruiker**: Gebruikers moeten expliciete toestemming geven voordat gegevens worden geraadpleegd of operaties worden uitgevoerd. Ze moeten duidelijke controle hebben over welke data gedeeld wordt en welke acties geautoriseerd zijn, ondersteund door intuïtieve gebruikersinterfaces om activiteiten te bekijken en goed te keuren.

- **Privacy van data**: Gebruikersgegevens mogen alleen beschikbaar worden gesteld met expliciete toestemming en moeten worden beschermd door passende toegangscontroles. MCP-implementaties moeten beschermen tegen ongeautoriseerde gegevensoverdracht en garanderen dat privacy behouden blijft tijdens alle interacties.

- **Veiligheid van tools**: Voor het aanroepen van een tool is expliciete gebruikersinstemming vereist. Gebruikers moeten helder inzicht hebben in de functionaliteit van elke tool, en robuuste beveiligingsgrenzen moeten gehandhaafd worden om onbedoelde of onveilige uitvoering van tools te voorkomen.

Door het opvolgen van deze beveiligingsprincipes waarborgt MCP gebruikersvertrouwen, privacy en veiligheid over alle protocolinteracties terwijl krachtige AI-integraties mogelijk worden gemaakt.

## Codevoorbeelden: kerncomponenten

Hieronder bevinden zich codevoorbeelden in verschillende populaire programmeertalen die illustreren hoe belangrijke MCP-servercomponenten en tools geïmplementeerd kunnen worden.

### .NET Voorbeeld: Een eenvoudige MCP-server maken met tools

Hier is een praktisch .NET codevoorbeeld dat laat zien hoe een eenvoudige MCP-server met aangepaste tools geïmplementeerd kan worden. Dit voorbeeld toont hoe tools te definiëren en registreren, verzoeken af te handelen en de server te verbinden met het Model Context Protocol.

```csharp
using System;
using System.Threading.Tasks;
using ModelContextProtocol.Server;
using ModelContextProtocol.Server.Transport;
using ModelContextProtocol.Server.Tools;

public class WeatherServer
{
    public static async Task Main(string[] args)
    {
        // Create an MCP server
        var server = new McpServer(
            name: "Weather MCP Server",
            version: "1.0.0"
        );
        
        // Register our custom weather tool
        server.AddTool<string, WeatherData>("weatherTool", 
            description: "Gets current weather for a location",
            execute: async (location) => {
                // Call weather API (simplified)
                var weatherData = await GetWeatherDataAsync(location);
                return weatherData;
            });
        
        // Connect the server using stdio transport
        var transport = new StdioServerTransport();
        await server.ConnectAsync(transport);
        
        Console.WriteLine("Weather MCP Server started");
        
        // Keep the server running until process is terminated
        await Task.Delay(-1);
    }
    
    private static async Task<WeatherData> GetWeatherDataAsync(string location)
    {
        // This would normally call a weather API
        // Simplified for demonstration
        await Task.Delay(100); // Simulate API call
        return new WeatherData { 
            Temperature = 72.5,
            Conditions = "Sunny",
            Location = location
        };
    }
}

public class WeatherData
{
    public double Temperature { get; set; }
    public string Conditions { get; set; }
    public string Location { get; set; }
}
```
  
### Java Voorbeeld: MCP-servercomponenten

Dit voorbeeld demonstreert dezelfde MCP-server en toolregistratie als het .NET-voorbeeld hierboven, maar geïmplementeerd in Java.

```java
import io.modelcontextprotocol.server.McpServer;
import io.modelcontextprotocol.server.McpToolDefinition;
import io.modelcontextprotocol.server.transport.StdioServerTransport;
import io.modelcontextprotocol.server.tool.ToolExecutionContext;
import io.modelcontextprotocol.server.tool.ToolResponse;

public class WeatherMcpServer {
    public static void main(String[] args) throws Exception {
        // Maak een MCP-server
        McpServer server = McpServer.builder()
            .name("Weather MCP Server")
            .version("1.0.0")
            .build();
            
        // Registreer een weerhulpmiddel
        server.registerTool(McpToolDefinition.builder("weatherTool")
            .description("Gets current weather for a location")
            .parameter("location", String.class)
            .execute((ToolExecutionContext ctx) -> {
                String location = ctx.getParameter("location", String.class);
                
                // Haal weergegevens op (vereenvoudigd)
                WeatherData data = getWeatherData(location);
                
                // Geef geformatteerde respons terug
                return ToolResponse.content(
                    String.format("Temperature: %.1f°F, Conditions: %s, Location: %s", 
                    data.getTemperature(), 
                    data.getConditions(), 
                    data.getLocation())
                );
            })
            .build());
        
        // Verbind de server met behulp van stdio-transport
        try (StdioServerTransport transport = new StdioServerTransport()) {
            server.connect(transport);
            System.out.println("Weather MCP Server started");
            // Houd de server draaiende totdat het proces wordt beëindigd
            Thread.currentThread().join();
        }
    }
    
    private static WeatherData getWeatherData(String location) {
        // Implementatie zou een weer-API aanroepen
        // Vereenvoudigd voor voorbeelddoeleinden
        return new WeatherData(72.5, "Sunny", location);
    }
}

class WeatherData {
    private double temperature;
    private String conditions;
    private String location;
    
    public WeatherData(double temperature, String conditions, String location) {
        this.temperature = temperature;
        this.conditions = conditions;
        this.location = location;
    }
    
    public double getTemperature() {
        return temperature;
    }
    
    public String getConditions() {
        return conditions;
    }
    
    public String getLocation() {
        return location;
    }
}
```
  
### Python Voorbeeld: Een MCP-server bouwen

Dit voorbeeld gebruikt fastmcp, zorg er eerst voor dat je deze installeert:

```python
pip install fastmcp
```
Codevoorbeeld:

```python
#!/usr/bin/env python3
import asyncio
from fastmcp import FastMCP
from fastmcp.transports.stdio import serve_stdio

# Maak een FastMCP-server
mcp = FastMCP(
    name="Weather MCP Server",
    version="1.0.0"
)

@mcp.tool()
def get_weather(location: str) -> dict:
    """Gets current weather for a location."""
    return {
        "temperature": 72.5,
        "conditions": "Sunny",
        "location": location
    }

# Alternatieve benadering met behulp van een klasse
class WeatherTools:
    @mcp.tool()
    def forecast(self, location: str, days: int = 1) -> dict:
        """Gets weather forecast for a location for the specified number of days."""
        return {
            "location": location,
            "forecast": [
                {"day": i+1, "temperature": 70 + i, "conditions": "Partly Cloudy"}
                for i in range(days)
            ]
        }

# Registreer klassehulpmiddelen
weather_tools = WeatherTools()

# Start de server
if __name__ == "__main__":
    asyncio.run(serve_stdio(mcp))
```
  
### JavaScript Voorbeeld: Een MCP-server creëren

Dit voorbeeld toont het aanmaken van een MCP-server in JavaScript en hoe twee tools met betrekking tot het weer geregistreerd worden.

```javascript
// Gebruik van de officiële Model Context Protocol SDK
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // Voor parametervalidatie

// Maak een MCP-server aan
const server = new McpServer({
  name: "Weather MCP Server",
  version: "1.0.0"
});

// Definieer een weerhulpmiddel
server.tool(
  "weatherTool",
  {
    location: z.string().describe("The location to get weather for")
  },
  async ({ location }) => {
    // Dit zou normaal gesproken een weer-API aanroepen
    // Vereenvoudigd voor demonstratiedoeleinden
    const weatherData = await getWeatherData(location);
    
    return {
      content: [
        { 
          type: "text", 
          text: `Temperature: ${weatherData.temperature}°F, Conditions: ${weatherData.conditions}, Location: ${weatherData.location}` 
        }
      ]
    };
  }
);

// Definieer een voorspellingshulpmiddel
server.tool(
  "forecastTool",
  {
    location: z.string(),
    days: z.number().default(3).describe("Number of days for forecast")
  },
  async ({ location, days }) => {
    // Dit zou normaal gesproken een weer-API aanroepen
    // Vereenvoudigd voor demonstratiedoeleinden
    const forecast = await getForecastData(location, days);
    
    return {
      content: [
        { 
          type: "text", 
          text: `${days}-day forecast for ${location}: ${JSON.stringify(forecast)}` 
        }
      ]
    };
  }
);

// Hulpfuncties
async function getWeatherData(location) {
  // Simuleer API-aanroep
  return {
    temperature: 72.5,
    conditions: "Sunny",
    location: location
  };
}

async function getForecastData(location, days) {
  // Simuleer API-aanroep
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    temperature: 70 + Math.floor(Math.random() * 10),
    conditions: i % 2 === 0 ? "Sunny" : "Partly Cloudy"
  }));
}

// Verbind de server met behulp van stdio-transport
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);

console.log("Weather MCP Server started");
```
  
Dit JavaScript-voorbeeld laat zien hoe een MCP-server te maken met behulp van de Model Context Protocol SDK. Het laat zien hoe twee tools genaamd `weatherTool` en `forecastTool` worden geregistreerd en beschikbaar gemaakt voor MCP-clients via de `StdioServerTransport`.

## Beveiliging en autorisatie

MCP bevat meerdere ingebouwde concepten en mechanismen voor het beheren van beveiliging en autorisatie binnen het protocol:

1. **Tooltoestemmingscontrole**:  
  Clients kunnen specificeren welke tools een model mag gebruiken tijdens een sessie. Dit zorgt ervoor dat alleen expliciet geautoriseerde tools toegankelijk zijn, wat het risico op onbedoelde of onveilige handelingen vermindert. Toestemmingen kunnen dynamisch worden geconfigureerd op basis van gebruikersvoorkeuren, organisatorisch beleid of de context van de interactie.

2. **Authenticatie**:  
  Servers kunnen authenticatie vereisen vóór toegang wordt verleend tot tools, bronnen of gevoelige handelingen. Dit kan API-sleutels, OAuth-tokens of andere authenticatieschema’s omvatten. Correcte authenticatie zorgt dat alleen vertrouwde clients en gebruikers servercapaciteiten mogen aanroepen.

3. **Validatie**:  
  Parametervalidatie wordt afgedwongen voor alle toolaanroepen. Elke tool definieert verwachte types, formaten en beperkingen voor zijn parameters, en de server valideert binnenkomende verzoeken dienovereenkomstig. Dit voorkomt dat onjuist of kwaadaardig invoer naar toolimplementaties doordringt en helpt de integriteit van operaties te behouden.

4. **Rate limiting**:  
  Om misbruik te voorkomen en eerlijk gebruik van serverbronnen te verzekeren, kunnen MCP-servers rate limiting implementeren voor toolaanroepen en bron-toegang. Rate limits kunnen per gebruiker, per sessie of globaal worden toegepast en helpen tegen denial-of-service aanvallen of overmatig resourcegebruik.

Door deze mechanismen te combineren biedt MCP een veilige basis voor integratie van taalmodellen met externe tools en databronnen, terwijl gebruikers en ontwikkelaars nauwkeurige controle krijgen over toegang en gebruik.

## Protocolberichten & communicatieflow

MCP-communicatie gebruikt gestructureerde **JSON-RPC 2.0**-berichten om heldere en betrouwbare interacties tussen hosts, clients en servers te faciliteren. Het protocol definieert specifieke berichtpatronen voor verschillende soorten operaties:

### Kernberichttypen:

#### **Initialisatieberichten**  
- **`initialize` Verzoek**: Stelt verbinding vast en onderhandelt protocolversie en capaciteiten  
- **`initialize` Antwoord**: Bevestigt ondersteunde functies en serverinformatie  
- **`notifications/initialized`**: Geeft aan dat initialisatie voltooid is en de sessie gereed is

#### **Ontdekkingsberichten**  
- **`tools/list` Verzoek**: Ontdekt beschikbare tools van de server  
- **`resources/list` Verzoek**: Lijst met beschikbare bronnen (datasources)  
- **`prompts/list` Verzoek**: Haalt beschikbare promptsjablonen op

#### **Uitvoeringsberichten**  
- **`tools/call` Verzoek**: Voert een specifieke tool uit met meegegeven parameters  
- **`resources/read` Verzoek**: Haalt content op van een specifieke bron  
- **`prompts/get` Verzoek**: Haalt een promptsjabloon op met optionele parameters

#### **Client-side berichten**  
- **`sampling/complete` Verzoek**: Server vraagt LLM-completie van de client  
- **`elicitation/request`**: Server vraagt gebruikersinput via clientinterface  
- **Loggingberichten**: Server verzendt gestructureerde logberichten aan client

#### **Notificatieberichten**  
- **`notifications/tools/list_changed`**: Server meldt toolwijzigingen aan client  
- **`notifications/resources/list_changed`**: Server meldt bronwijzigingen aan client  
- **`notifications/prompts/list_changed`**: Server meldt promptwijzigingen aan client

### Berichtstructuur:

Alle MCP-berichten volgen het JSON-RPC 2.0 formaat, met:  
- **Verzoekberichten**: bevatten `id`, `method` en optionele `params`  
- **Antwoordberichten**: bevatten `id` en ofwel `result` of `error`  
- **Notificatieberichten**: bevatten `method` en optionele `params` (geen `id` en geen antwoord verwacht)

Deze gestructureerde communicatie zorgt voor betrouwbare, traceerbare en uitbreidbare interacties die geavanceerde scenario’s ondersteunen zoals realtime updates, tool chaining en robuuste foutafhandeling.

### Taken (experimenteel)

**Taken** zijn een experimentele functie die duurzame uitvoerings-wrappers biedt, waarmee uitgestelde resultaatopvraging en statusbewaking van MCP-verzoeken mogelijk worden:

- **Langlopende operaties**: Tracken van kostbare berekeningen, workflowautomatisering en batchverwerking  
- **Uitgestelde resultaten**: Poll voor taakstatus en haal resultaten op wanneer operaties voltooid zijn  
- **Statusbewaking**: Volg taakvoortgang via gedefinieerde levenscyclusstaten  
- **Meerdere-stappen operaties**: Ondersteuning voor complexe workflows die meerdere interacties beslaan

Taken wikkelen standaard MCP-verzoeken in om asynchrone uitvoeringspatronen mogelijk te maken voor operaties die niet direct afgerond kunnen worden.

## Belangrijke conclusies

- **Architectuur**: MCP gebruikt een client-serverarchitectuur waarin hosts meerdere clientverbindingen naar servers beheren  
- **Deelnemers**: Het ecosysteem bevat hosts (AI-applicaties), clients (protocolconnectors) en servers (capaciteitsaanbieders)  
- **Transportmechanismen**: Communicatie ondersteunt STDIO (lokaal) en Streamable HTTP met optionele SSE (extern)  
- **Kernprimitieven**: Servers bieden tools (uitvoerbare functies), bronnen (datasources) en prompts (sjablonen)  
- **Clientprimitieven**: Servers kunnen sampling (LLM-completions met toolaanroepsondersteuning), elicitation (gebruikersinvoer inclusief URL-modus), roots (bestandssysteemgrenzen) en logging vragen aan clients  
- **Experimentele functies**: Taken bieden duurzame wrappings voor langlopende operaties  
- **Protocolfundament**: Gebaseerd op JSON-RPC 2.0 met datumbased versiebeheer (huidig: 2025-11-25)  
- **Realtime mogelijkheden**: Ondersteunt notificaties voor dynamische updates en realtime synchronisatie  
- **Beveiliging eerst**: Expliciete gebruikersinstemming, dataprivacybescherming en veilig transport zijn kernvereisten

## Oefening

Ontwerp een eenvoudige MCP-tool die nuttig zou zijn in jouw domein. Definieer:  
1. Hoe de tool genoemd wordt  
2. Welke parameters hij accepteert  
3. Welke output hij teruggeeft  
4. Hoe een model deze tool zou kunnen gebruiken om gebruikersproblemen op te lossen


---

## Wat vervolgens

Volgende: [Hoofdstuk 2: Beveiliging](../02-Security/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het oorspronkelijke document in de oorspronkelijke taal dient als de gezaghebbende bron te worden beschouwd. Voor cruciale informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->