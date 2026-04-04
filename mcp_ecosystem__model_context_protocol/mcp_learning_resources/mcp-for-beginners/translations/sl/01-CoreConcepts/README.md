# Osnovni koncepti MCP: Obvladovanje protokola Model Context za integracijo AI

[![MCP Core Concepts](../../../translated_images/sl/02.8203e26c6fb5a797.webp)](https://youtu.be/earDzWGtE84)

_(Kliknite zgornjo sliko za ogled videa te lekcije)_

[Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) je zmogljiv, standardiziran okvir, ki optimizira komunikacijo med velikimi jezikovnimi modeli (LLM) in zunanjimi orodji, aplikacijami ter viri podatkov.  
Ta vodič vas bo popeljal skozi osnovne koncepte MCP. Naučili se boste o njegovi arhitekturi klient-server, ključnih komponentah, mehanizmih komunikacije in najboljših praksah za implementacijo.

- **Izrecno soglasje uporabnika**: Za dostop do vseh podatkov in izvajanje operacij je potrebno izrecno dovoljenje uporabnika pred izvedbo. Uporabniki morajo jasno razumeti, do katerih podatkov bo dostopano in katere ukrepe bo sistem izvedel, z drobnozrnato kontrolo nad dovoljenji in pooblastili.

- **Zaščita zasebnosti podatkov**: Podatki uporabnikov so razkriti le z izrecnim dopuščanjem in morajo biti zaščiteni z robustnimi dostopnimi kontrolami skozi celoten življenjski cikel interakcije. Implementacije morajo preprečiti nepooblaščeno prenos podatkov in ohranjati stroge meje zasebnosti.

- **Varnost izvajanja orodij**: Vsako sprožitev orodja je potrebno potrditi z uporabnikom, ki mora imeti jasno razumevanje funkcionalnosti orodja, parametrov in možnih posledic. Robustne varnostne meje preprečujejo nenamerno, nevarno ali zlonamerno izvajanje orodij.

- **Varnost plasti transporta**: Vsi komunikacijski kanali morajo uporabljati ustrezne mehanizme šifriranja in avtentikacije. Oddaljene povezave morajo uporabljati varne protokole prenosa in primerno upravljanje poverilnic.

#### Smernice za implementacijo:

- **Upravljanje dovoljenj**: Implementirajte drobnozrnate sisteme dovoljenj, ki omogočajo uporabnikom nadzor nad strežniki, orodji in viri do katerih imajo dostop  
- **Avtentikacija in pooblastilo**: Uporabljajte varne metode avtentikacije (OAuth, API ključi) z ustreznim upravljanjem žetonov in potekom  
- **Validacija vhodov**: Validirajte vse parametre in podatkovne vhode skladno z definiranimi shemami, da preprečite napade z injekcijo  
- **Evidentiranje**: Ohranjajte celovite zapise vseh operacij za varnostno spremljanje in skladnost

## Pregled

Ta lekcija raziskuje osnovno arhitekturo in komponente, ki sestavljajo ekosistem Model Context Protocol (MCP). Naučili se boste o arhitekturi klient-server, ključnih komponentah in komunikacijskih mehanizmih, ki poganjajo interakcije MCP.

## Ključni cilji učenja

Ob zaključku te lekcije boste:

- Razumeli arhitekturo klient-server MCP.  
- Prepoznali vloge in odgovornosti gostiteljev, klientov in strežnikov.  
- Analizirali osnovne funkcije, ki MCP naredijo prilagodljivo integracijsko plast.  
- Spoznali, kako poteka pretok informacij znotraj ekosistema MCP.  
- Pridobili praktične vpoglede prek primerov kode v .NET, Javi, Pythonu in JavaScriptu.

## Arhitektura MCP: Podrobnejši pogled

Ekosistem MCP temelji na modelu klient-server. Ta modularna struktura omogoča AI aplikacijam učinkovito interakcijo z orodji, podatkovnimi bazami, API-ji in kontekstualnimi viri. Razčlenimo to arhitekturo na njene osnovne komponente.

V jedru MCP sledi arhitekturi klient-server, kjer gostiteljska aplikacija lahko poveže več strežnikov:

```mermaid
flowchart LR
    subgraph "Vaš računalnik"
        Host["Gostitelj z MCP (Visual Studio, VS Code, IDE, Orodja)"]
        S1["MCP Strežnik A"]
        S2["MCP Strežnik B"]
        S3["MCP Strežnik C"]
        Host <-->|"MCP Protokol"| S1
        Host <-->|"MCP Protokol"| S2
        Host <-->|"MCP Protokol"| S3
        S1 <--> D1[("Lokalni\Vir podatkov A")]
        S2 <--> D2[("Lokalni\Vir podatkov B")]
    end
    subgraph "Internet"
        S3 <-->|"Spletni API-ji"| D3[("Oddaljene\Storitve")]
    end
```
- **Gostitelji MCP**: Programi kot so VSCode, Claude Desktop, IDE-ji ali AI orodja, ki želijo dostopati do podatkov preko MCP  
- **Klienti MCP**: Protokolni klienti, ki vzdržujejo 1:1 povezave s strežniki  
- **Strežniki MCP**: Lahki programi, ki vsak razkrivajo specifične zmogljivosti preko standardiziranega Model Context Protocol  
- **Lokalni viri podatkov**: Datoteke, baze podatkov in storitve na vašem računalniku, do katerih lahko strežniki MCP varno dostopajo  
- **Oddaljene storitve**: Zunanji sistemi, dostopni prek interneta, s katerimi se strežniki MCP povezujejo preko API-jev.

Protokol MCP je razvijajoči se standard z verzioniranjem na podlagi datuma (format LLLL-MM-DD). Trenutna verzija protokola je **2025-11-25**. Najnovejše posodobitve lahko vidite v [specifikaciji protokola](https://modelcontextprotocol.io/specification/2025-11-25/)

### 1. Gostitelji

V Model Context Protocol (MCP) so **Gostitelji** AI aplikacije, ki služijo kot primarni vmesnik, preko katerega uporabniki komunicirajo s protokolom. Gostitelji koordinirajo in upravljajo povezave do več MCP strežnikov s tem, da za vsako povezavo ustvarijo namenski MCP klient. Primeri gostiteljev so:

- **AI aplikacije**: Claude Desktop, Visual Studio Code, Claude Code  
- **Razvojna okolja**: IDE-ji in urejevalniki kode z integracijo MCP  
- **Prilagojene aplikacije**: Namenjeni AI agenti in orodja

**Gostitelji** so aplikacije, ki koordinirajo interakcije z AI modeli. Oni:

- **Orkestrirajo AI modele**: Izvajajo ali sodelujejo z LLM za generiranje odgovorov in koordinacijo AI potekov dela  
- **Upravljajo klientske povezave**: Ustvarjajo in vzdržujejo po en MCP klient na povezavo s strežnikom MCP  
- **Nadzorujejo uporabniški vmesnik**: Upravljajo tok pogovora, uporabniške interakcije in predstavitev odgovorov  
- **Uveljavljajo varnost**: Nadzorujejo dovoljenja, varnostne omejitve in avtentikacijo  
- **Obravnavajo uporabnikovo soglasje**: Upravljajo uporabnikova dovoljenja za deljenje podatkov in izvajanje orodij

### 2. Klienti

**Klienti** so ključne komponente, ki vzdržujejo namensko ena-na-ena povezavo med gostitelji in strežniki MCP. Vsak MCP klient je ustvarjen s strani gostitelja za povezavo na določen MCP strežnik, kar zagotavlja organizirane in varne komunikacijske kanale. Več klientov omogoča gostiteljem hkratno povezavo s več strežniki.

**Klienti** so konektorske komponente znotraj gostiteljske aplikacije. Oni:

- **Protokolska komunikacija**: Pošiljajo JSON-RPC 2.0 zahtevke strežnikom z vprašanji in navodili  
- **Pogajanja o zmogljivostih**: Pogajajo se o podprtih funkcijah in verzijah protokola s strežniki ob inicializaciji  
- **Izvajanje orodij**: Upravljajo zahteve za izvajanje orodij iz modelov in obdelujejo odzive  
- **Posodobitve v realnem času**: Obravnavajo obvestila in posodobitve v realnem času s strežnikov  
- **Obdelava odzivov**: Procesirajo in oblikujejo odgovore strežnika za prikaz uporabnikom

### 3. Strežniki

**Strežniki** so programi, ki zagotavljajo kontekst, orodja in zmogljivosti MCP klientom. Lahko se izvajajo lokalno (na istem računalniku kot gostitelj) ali oddaljeno (na zunanjih platformah) ter so odgovorni za obdelavo zahtev klientov in zagotavljanje strukturiranih odgovorov. Strežniki razkrivajo specifične funkcionalnosti preko standardiziranega Model Context Protocol.

**Strežniki** so storitve, ki zagotavljajo kontekst in zmogljivosti. Oni:

- **Registracija funkcij**: Registrirajo in razkrivajo razpoložljive primitivne elemente (viri, pozivi, orodja) klientom  
- **Obdelava zahtev**: Prejemajo in izvajajo klice orodij, zahteve za vire in pozive klientov  
- **Zagotavljanje konteksta**: Nudi kontekstualne informacije in podatke za izboljšanje odgovorov modela  
- **Upravljanje stanja**: Ohranjajo stanje seje in obravnavajo stanje, kadar je potrebno  
- **Obvestila v realnem času**: Pošiljajo obvestila o spremembah zmogljivosti in posodobitvah priključenim klientom

Strežnike lahko razvija kdorkoli za razširitev zmogljivosti modela s specializiranimi funkcijami in podpirajo tako lokalne kot oddaljene scenarije uvedbe.

### 4. Primitivi strežnika

Strežniki v Model Context Protocol (MCP) zagotavljajo tri osnovne **primitivne elemente**, ki definirajo temeljne gradnike za bogate interakcije med klienti, gostitelji in jezikovnimi modeli. Ti primitivni elementi določajo vrste kontekstualnih informacij in dejanj, ki so na voljo preko protokola.

MCP strežniki lahko razkrijejo katerokoli kombinacijo naslednjih treh osnovnih primitivov:

#### Viri

**Viri** so podatkovni viri, ki AI aplikacijam zagotavljajo kontekstualne informacije. Predstavljajo statično ali dinamično vsebino, ki lahko izboljša razumevanje modela in odločanje:

- **Kontekstualni podatki**: Strukturirane informacije in kontekst za porabo AI modela  
- **Baze znanja**: Dokumentni repozitoriji, članki, priročniki in raziskovalni članki  
- **Lokalni viri podatkov**: Datoteke, baze podatkov in lokalne sistemske informacije  
- **Zunanji podatki**: Odzivi API-jev, spletne storitve in podatki oddaljenih sistemov  
- **Dinamična vsebina**: Podatki v realnem času, ki se posodabljajo glede na zunanje pogoje

Viri so identificirani z URI-ji in podpirajo iskanje preko metod `resources/list` in pridobivanje preko `resources/read`:

```text
file://documents/project-spec.md
database://production/users/schema
api://weather/current
```

#### Pozivi

**Pozivi** so ponovno uporabni predlogi, ki pomagajo strukturirati interakcije z jezikovnimi modeli. Nudijo standardizirane vzorce interakcije in predtemplirane delovne tokove:

- **Predloge za interakcije**: Vnaprej strukturirana sporočila in začetki pogovorov  
- **Predloge potekov dela**: Standardizirani zaporedji za pogoste naloge in interakcije  
- **Primeri "few-shot"**: Primeri-predloge za navodila modelu  
- **Sistemski pozivi**: Temeljni pozivi, ki definirajo obnašanje in kontekst modela  
- **Dinamične predloge**: Parametrizirani pozivi, ki se prilagajajo specifičnim kontekstom

Pozivi podpirajo zamenjavo spremenljivk in jih je mogoče odkristi z `prompts/list` in pridobiti z `prompts/get`:

```markdown
Generate a {{task_type}} for {{product}} targeting {{audience}} with the following requirements: {{requirements}}
```

#### Orodja

**Orodja** so izvršljive funkcije, ki jih lahko AI modeli pokličejo za izvedbo specifičnih dejanj. Predstavljajo "glagole" ekosistema MCP, ki omogočajo modelom interakcijo z zunanjimi sistemi:

- **Izvršljive funkcije**: Diskretne operacije, ki jih modeli lahko pokličejo z določenimi parametri  
- **Integracija z zunanjimi sistemi**: Klici API-jev, poizvedbe baz podatkov, upravljanje datotek, izračuni  
- **Edinstvena identiteta**: Vsako orodje ima svoje ime, opis in shemo parametrov  
- **Strukturiran vhod/izhod**: Orodja sprejemajo validirane parametre in vračajo strukturirane, tipizirane odgovore  
- **Zmogenja dejanj**: Omogočajo modelom izvajanje dejanj v resničnem svetu in pridobivanje živih podatkov

Orodja so definirana z JSON Shemo za validacijo parametrov, odkrivajo pa se preko `tools/list` in izvajajo preko `tools/call`. Orodja lahko vključujejo tudi **icone** kot dodatne metapodatke za boljšo predstavitev v UI.

**Oznake orodij**: Orodja podpirajo vedenjske oznake (npr. `readOnlyHint`, `destructiveHint`), ki opisujejo, ali je orodje samo za branje ali destruktivno, in pomagajo klientom sprejemati informirane odločitve glede izvajanja orodij.

Primer definicije orodja:

```typescript
server.tool(
  "search_products", 
  {
    query: z.string().describe("Search query for products"),
    category: z.string().optional().describe("Product category filter"),
    max_results: z.number().default(10).describe("Maximum results to return")
  }, 
  async (params) => {
    // Izvedi iskanje in vrni strukturirane rezultate
    return await productService.search(params);
  }
);
```

## Primitivi klienta

V Model Context Protocol (MCP) lahko **klienti** razkrijejo primitivne elemente, ki omogočajo strežnikom zahtevo po dodatnih zmogljivostih gostiteljske aplikacije. Ti primitivni elementi na strani klienta omogočajo bogatejše, interaktivnejše implementacije strežnikov, ki lahko dostopajo do zmogljivosti modela in uporabniških interakcij.

### Vzorec

**Vzorec** omogoča strežnikom, da zahtevajo zaključke jezikovnega modela iz AI aplikacije klienta. Ta primitiv omogoča strežnikom dostop do LLM zmogljivosti brez potrebe po vključitvi lastnih modelskih odvisnosti:

- **Dostop neodvisen od modela**: Strežniki lahko zahtevajo zaključke brez vključevanja LLM SDK-jev ali upravljanja dostopa do modela  
- **Izvorni AI strežnika**: Omogoča strežnikom samostojno generiranje vsebine z uporabo modela AI klienta  
- **Rekurzivne interakcije LLM**: Podpira kompleksne scenarije, kjer strežniki potrebujejo asistenco AI za obdelavo  
- **Dinamična generacija vsebine**: Omogoča strežnikom ustvarjanje kontekstualnih odgovorov z uporabo modela gostitelja  
- **Podpora klicev orodij**: Strežniki lahko vključijo parametra `tools` in `toolChoice` za omogočanje modela klienta klic orodij med vzorčenjem

Vzorec se sproži preko metode `sampling/complete`, kjer strežniki pošljejo zahteve za zaključke klientom.

### Koreni

**Koreni** zagotavljajo standardiziran način za kliente, da strežnikom razkrijejo omejitve datotečnega sistema, kar pomaga strežnikom razumeti, do katerih imenikov in datotek imajo dostop:

- **Omejitve datotečnega sistema**: Določajo meje, kjer lahko strežniki delujejo znotraj datotečnega sistema  
- **Nadzor dostopa**: Pomagajo strežnikom razumeti, do katerih imenikov in datotek imajo dovoljenje za dostop  
- **Dinamične posodobitve**: Klienti lahko obveščajo strežnike, kadar se seznam korenov spremeni  
- **Identifikacija na osnovi URI-jev**: Koreni uporabljajo `file://` URI-je za identifikacijo dostopnih imenikov in datotek

Koreni se odkrijejo z metodo `roots/list`, kliente pa pošljejo `notifications/roots/list_changed`, ko se koreni spremenijo.

### Povpraševanje

**Povpraševanje** omogoča strežnikom, da zahtevajo dodatne informacije ali potrditev od uporabnikov preko klientovega vmesnika:

- **Zahteve po vhodu uporabnika**: Strežniki lahko zahtevajo dodatne informacije, kadar so potrebne za izvedbo orodij  
- **Potrdilni dialogi**: Zahtevajo uporabniško odobritev za občutljive ali pomembne operacije  
- **Interaktivni poteki**: Omogočajo strežnikom ustvarjanje korak-po-korak uporabniških interakcij  
- **Dinamično zbiranje parametrov**: Zbirajo manjkajoče ali opcijske parametre med izvajanjem orodij

Povpraševanje se izvaja z metodo `elicitation/request` za zbiranje uporabniških informacij preko klientovega vmesnika.

**Povpraševanje v načinu URL**: Strežniki lahko zahtevajo tudi interakcije z uporabniki preko URL-jev, kar omogoča preusmerjanje uporabnikov na zunanje spletne strani za avtorizacijo, potrditev ali vnos podatkov.

### Dnevnik

**Dnevnik** omogoča strežnikom pošiljanje strukturiranih sporočil dnevnika klientom za odpravljanje napak, spremljanje in operativno preglednost:

- **Podpora za odpravljanje napak**: Omogoča strežnikom podrobne dnevnike izvajanja za odpravljanje težav  
- **Operativno spremljanje**: Pošilja stanje in metrike zmogljivosti klientom  
- **Poročanje o napakah**: Zagotavlja podrobne kontekste napak in diagnostične informacije  
- **Revizijski sled**: Ustvarja celovite dnevnike strežniških operacij in odločitev

Sporočila dnevnika se pošiljajo klientom za zagotavljanje preglednosti strežniških operacij in olajšanje odpravljanja napak.

## Pretok informacij v MCP

Model Context Protocol (MCP) definira strukturiran pretok informacij med gostitelji, klienti, strežniki in modeli. Razumevanje tega pretoka pomaga pojasniti, kako se obdelujejo zahteve uporabnikov in kako se zunanja orodja ter podatki integrirajo v odgovore modela.
- **Gostitelj vzpostavi povezavo**  
  Gostiteljska aplikacija (kot je IDE ali klepetalni vmesnik) vzpostavi povezavo s strežnikom MCP, običajno prek STDIO, WebSocket ali drugega podprtega transporta.

- **Pogajanje o zmožnostih**  
  Odjemalec (vgrajen v gostitelja) in strežnik si izmenjata informacije o svojih podprtih funkcijah, orodjih, virih in različicah protokola. To zagotavlja, da obe strani razumeta, katere zmožnosti so na voljo za sejo.

- **Zahteva uporabnika**  
  Uporabnik sodeluje z gostiteljem (npr. vnese poziv ali ukaz). Gostitelj zbere ta vnos in ga posreduje odjemalcu v obdelavo.

- **Uporaba vira ali orodja**  
  - Odjemalec lahko zahteva dodatni kontekst ali vire od strežnika (kot so datoteke, vnosi v bazi podatkov ali članki iz znanstvene baze) za izboljšanje razumevanja modela.  
  - Če model ugotovi, da je potrebno orodje (npr. pridobivanje podatkov, izvedba izračuna ali klic API-ja), odjemalec pošlje strežniku zahtevo za uporabo orodja, pri čemer navede ime orodja in parametre.

- **Izvedba na strežniku**  
  Strežnik prejme zahtevo za vire ali orodja, izvede potrebne operacije (kot so zaganjanje funkcije, poizvedba podatkovne baze ali pridobitev datoteke) in pošlje rezultate nazaj odjemalcu v strukturirani obliki.

- **Generiranje odgovora**  
  Odjemalec vključi odzive strežnika (podatke virov, izhode orodij itd.) v tekočo interakcijo z modelom. Model uporabi te informacije za ustvarjanje obsežnega in kontekstualno relevantnega odgovora.

- **Predstavitev rezultata**  
  Gostitelj prejme končni izhod od odjemalca in ga predstavi uporabniku, pogosto vključno z modeliranim generiranim besedilom in morebitnimi rezultati izvajanja orodij ali iskanja virov.

Ta potek omogoča MCP podporo naprednim, interaktivnim in kontekstno zavednim AI aplikacijam z brezhibno povezavo modelov z zunanjimi orodji in viri podatkov.

## Arhitektura in plasti protokola

MCP sestavljata dve ločeni arhitekturni plasti, ki skupaj zagotavljata celovit komunikacijski okvir:

### Podatkovna plast

**Podatkovna plast** izvaja osnovni MCP protokol z uporabo **JSON-RPC 2.0** kot osnovo. Ta plast določa strukturo sporočil, semantiko in vzorce interakcije:

#### Osnovne komponente:

- **JSON-RPC 2.0 protokol**: Vsa komunikacija uporablja standardiziran format sporočil JSON-RPC 2.0 za klice metod, odzive in obvestila  
- **Upravljanje življenjskega cikla**: Upravlja inicializacijo povezave, pogajanje o zmožnostih in prekinitev seje med odjemalci in strežniki  
- **Primitivi strežnika**: Omogoča strežnikom zagotavljanje osnovne funkcionalnosti prek orodij, virov in pozivov  
- **Primitivi odjemalca**: Omogoča strežnikom zahtevanje vzorčenja iz velikih jezikovnih modelov (LLM), priklic uporabniškega vnosa in pošiljanje dnevniških sporočil  
- **Obvestila v realnem času**: Podpira asinhrona obvestila za dinamične posodobitve brez povpraševanja

#### Ključne lastnosti:

- **Pogajanje o različici protokola**: Uporablja verzioniranje na podlagi datuma (LLLL-MM-DD) za zagotavljanje združljivosti  
- **Odkritje zmožnosti**: Odjemalci in strežniki izmenjajo informacije o podprtih funkcijah med inicializacijo  
- **Sesije z ohranitvijo stanja**: Ohranja stanje povezave skozi več interakcij za kontinuiteto konteksta

### Transportna plast

**Transportna plast** upravlja komunikacijske kanale, oblikovanje sporočil in overjanje med udeleženci MCP:

#### Podprti transportni mehanizmi:

1. **STDIO transport**:  
   - Uporablja standardne vhodno/izhodne tokove za neposredno komunikacijo procesov  
   - Optimalno za lokalne procese na istem računalniku brez omrežnega režija  
   - Pogosto se uporablja za lokalne implementacije MCP strežnikov

2. **HTTP transport s pretočnostjo**:  
   - Uporablja HTTP POST za sporočila od odjemalca do strežnika  
   - Neobvezni Server-Sent Events (SSE) za pretočno komunikacijo od strežnika do odjemalca  
   - Omogoča komunikacijo z oddaljenimi strežniki prek omrežij  
   - Podpira standardno HTTP overjanje (nosilne žetone, API ključe, prilagojene glave)  
   - MCP priporoča OAuth za varen overiteljski sistem, temelječ na žetonih

#### Transportna abstrakcija:

Transportna plast abstraktno loči podrobnosti komunikacije od podatkovne plasti, kar omogoča uporabo istega formata sporočil JSON-RPC 2.0 prek vseh transportnih mehanizmov. Ta abstrakcija omogoča brezhibno preklapljanje med lokalnimi in oddaljenimi strežniki.

### Varnostni premisleki

Implementacije MCP morajo upoštevati več ključnih varnostnih načel za zagotavljanje varnih, zaupanja vrednih in varovanih interakcij v vseh protokolskih operacijah:

- **Soglasje in nadzor uporabnika**: Uporabniki morajo pred dostopom do podatkov ali izvajanjem operacij dati izrecno soglasje. Imajo jasen nadzor, kateri podatki so deljeni in katere akcije so odobrene, podprto z intuitivnimi uporabniškimi vmesniki za pregledovanje in odobritve aktivnosti.  
- **Zasebnost podatkov**: Podatki uporabnika smejo biti razkriti le z izrecnim soglasjem in morajo biti varovani z ustreznimi kontrolami dostopa. Implementacije MCP morajo varovati pred nepooblaščenim prenosom podatkov in zagotavljati zasebnost skozi vse interakcije.  
- **Varnost orodij**: Pred klicem kateregakoli orodja je potrebno izrecno soglasje uporabnika. Uporabniki morajo imeti jasno razumevanje funkcionalnosti vsakega orodja, hkrati pa morajo biti vzpostavljene robustne varnostne meje, ki preprečujejo neželeno ali nevarno izvajanje orodij.

S spoštovanjem teh varnostnih načel MCP zagotavlja zaupanje uporabnikov, zasebnost in varnost po vsem procesu komunikacije, hkrati pa omogoča zmogljive AI integracije.

## Primeri kode: Ključne komponente

Spodaj so primeri kode v več priljubljenih programskih jezikih, ki prikazujejo, kako implementirati ključne komponente in orodja MCP strežnika.

### .NET primer: Ustvarjanje preprostega MCP strežnika z orodji

Tukaj je praktičen .NET primer kode, ki prikazuje, kako implementirati preprost MCP strežnik s prilagojenimi orodji. Primer prikazuje, kako definirati in registrirati orodja, upravljati zahteve in povezati strežnik prek Model Context Protocol.

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

### Java primer: Komponente MCP strežnika

Ta primer prikazuje isti MCP strežnik in registracijo orodij kot zgornji .NET primer, vendar izveden v Javi.

```java
import io.modelcontextprotocol.server.McpServer;
import io.modelcontextprotocol.server.McpToolDefinition;
import io.modelcontextprotocol.server.transport.StdioServerTransport;
import io.modelcontextprotocol.server.tool.ToolExecutionContext;
import io.modelcontextprotocol.server.tool.ToolResponse;

public class WeatherMcpServer {
    public static void main(String[] args) throws Exception {
        // Ustvari MCP strežnik
        McpServer server = McpServer.builder()
            .name("Weather MCP Server")
            .version("1.0.0")
            .build();
            
        // Registriraj orodje za vreme
        server.registerTool(McpToolDefinition.builder("weatherTool")
            .description("Gets current weather for a location")
            .parameter("location", String.class)
            .execute((ToolExecutionContext ctx) -> {
                String location = ctx.getParameter("location", String.class);
                
                // Pridobi podatke o vremenu (poenostavljeno)
                WeatherData data = getWeatherData(location);
                
                // Vrni formatiran odgovor
                return ToolResponse.content(
                    String.format("Temperature: %.1f°F, Conditions: %s, Location: %s", 
                    data.getTemperature(), 
                    data.getConditions(), 
                    data.getLocation())
                );
            })
            .build());
        
        // Poveži strežnik z uporabo stdio prenosa
        try (StdioServerTransport transport = new StdioServerTransport()) {
            server.connect(transport);
            System.out.println("Weather MCP Server started");
            // Pusti strežnik delujočega, dokler proces ni zaključen
            Thread.currentThread().join();
        }
    }
    
    private static WeatherData getWeatherData(String location) {
        // Implementacija bi poklicala vremenski API
        // Poenostavljeno za namene primera
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

### Python primer: Gradnja MCP strežnika

Ta primer uporablja fastmcp, zato ga prosim najprej namestite:

```python
pip install fastmcp
```
Primer kode:

```python
#!/usr/bin/env python3
import asyncio
from fastmcp import FastMCP
from fastmcp.transports.stdio import serve_stdio

# Ustvari FastMCP strežnik
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

# Alternativni pristop z uporabo razreda
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

# Registriraj razred orodij
weather_tools = WeatherTools()

# Zaženi strežnik
if __name__ == "__main__":
    asyncio.run(serve_stdio(mcp))
```

### JavaScript primer: Ustvarjanje MCP strežnika

Ta primer prikazuje ustvarjanje MCP strežnika v JavaScriptu in kako registrirati dve orodji povezani z vremensko napovedjo.

```javascript
// Uporaba uradnega Model Context Protocol SDK
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // Za preverjanje parametrov

// Ustvarite MCP strežnik
const server = new McpServer({
  name: "Weather MCP Server",
  version: "1.0.0"
});

// Določite vremensko orodje
server.tool(
  "weatherTool",
  {
    location: z.string().describe("The location to get weather for")
  },
  async ({ location }) => {
    // To bi običajno klical vremenski API
    // Poenostavljeno za demonstracijo
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

// Določite orodje za napoved
server.tool(
  "forecastTool",
  {
    location: z.string(),
    days: z.number().default(3).describe("Number of days for forecast")
  },
  async ({ location, days }) => {
    // To bi običajno klical vremenski API
    // Poenostavljeno za demonstracijo
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

// Pomožne funkcije
async function getWeatherData(location) {
  // Simuliraj klic API-ja
  return {
    temperature: 72.5,
    conditions: "Sunny",
    location: location
  };
}

async function getForecastData(location, days) {
  // Simuliraj klic API-ja
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    temperature: 70 + Math.floor(Math.random() * 10),
    conditions: i % 2 === 0 ? "Sunny" : "Partly Cloudy"
  }));
}

// Povežite strežnik z uporabo stdio transporta
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);

console.log("Weather MCP Server started");
```

Ta JavaScript primer pokaže, kako ustvariti MCP strežnik z uporabo Model Context Protocol SDK. Pokaže, kako registrirati dve orodji imenovani `weatherTool` in `forecastTool` ter jih narediti dostopni MCP odjemalcem prek `StdioServerTransport`.

## Varnost in pooblastila

MCP vključuje več vgrajenih konceptov in mehanizmov za upravljanje varnosti in pooblastil v celotnem protokolu:

1. **Nadzor dovoljenj za orodja**:  
   Odjemalci lahko določijo, katera orodja lahko model uporablja med sejo. To zagotavlja, da so dostopna le eksplicitno pooblaščena orodja, kar zmanjšuje tveganje neželenih ali nevarnih operacij. Dovoljenja je mogoče dinamično konfigurirati glede na uporabniške preference, organizacijske politike ali kontekst interakcije.

2. **Overjanje**:  
   Strežniki lahko zahtevajo overjanje pred dodelitvijo dostopa do orodij, virov ali občutljivih operacij. To lahko vključuje API ključe, OAuth žetone ali druge sheme overjanja. Pravilno overjanje zagotavlja, da le zaupanja vredni odjemalci in uporabniki lahko kličejo zmogljivosti strežnika.

3. **Validacija**:  
   Velja za vse klice orodij preverjanje parametrov. Vsako orodje definira pričakovane tipe, formate in omejitve za svoje parametre, strežnik pa ustrezno preveri dohodne zahteve. Tako se prepreči, da bi neveljavne ali zlonamerne vhodne podatke dosegli implementacije orodij in pripomore k ohranjanju integritete operacij.

4. **Omejevanje hitrosti**:  
   Za preprečevanje zlorab in zagotavljanje pravične rabe strežniških virov lahko MCP strežniki uvedejo omejevanje hitrosti za klice orodij in dostop do virov. Omejitve se lahko uporabijo na uporabnika, sej ali globalno ter pomagajo zaščititi pred napadi zavrnitev storitve ali pretirano porabo virov.

S kombinacijo teh mehanizmov MCP zagotavlja varno osnovo za integracijo jezikovnih modelov z zunanjimi orodji in viri podatkov, hkrati pa uporabnikom in razvijalcem nudi natančen nadzor nad dostopom in uporabo.

## Protokolska sporočila in komunikacijski potek

Komunikacija MCP uporablja strukturirana **JSON-RPC 2.0** sporočila za jasne in zanesljive interakcije med gostitelji, odjemalci in strežniki. Protokol določa specifične vzorce sporočil za različne vrste operacij:

### Osnovne vrste sporočil:

#### **Inicializacijska sporočila**  
- **`initialize` zahteva**: Vzpostavi povezavo in se pogaja o verziji protokola ter zmožnostih  
- **`initialize` odgovor**: Potrdi podprte funkcije in informacije o strežniku  
- **`notifications/initialized`**: Signalizira, da je inicializacija končana in seja pripravljena

#### **Sporočila za odkrivanje**  
- **`tools/list` zahteva**: Odkrije na voljo stojna orodja na strežniku  
- **`resources/list` zahteva**: Prikaže na voljo vire (podatkovne vire)  
- **`prompts/list` zahteva**: Pridobi na voljo predloge pozivov

#### **Sporočila za izvajanje**  
- **`tools/call` zahteva**: Izvede določeno orodje z dano parametri  
- **`resources/read` zahteva**: Prenese vsebino določenega vira  
- **`prompts/get` zahteva**: Pridobi predlogo poziva z neobveznimi parametri

#### **Sporočila na strani odjemalca**  
- **`sampling/complete` zahteva**: Strežnik zahteva LLM dopolnitev od odjemalca  
- **`elicitation/request`**: Strežnik zahteva uporabniški vnos skozi odjemalski vmesnik  
- **Dnevniki**: Strežnik pošilja strukturirana dnevniška sporočila odjemalcu

#### **Obvestila**  
- **`notifications/tools/list_changed`**: Strežnik obvesti odjemalca o spremembah orodij  
- **`notifications/resources/list_changed`**: Strežnik obvesti odjemalca o spremembah virov  
- **`notifications/prompts/list_changed`**: Strežnik obvesti odjemalca o spremembah pozivov

### Struktura sporočil:

Vsa MCP sporočila sledijo formatu JSON-RPC 2.0 z:  
- **Zahteve**: vsebujejo `id`, `method` in neobvezne `params`  
- **Odgovori**: vsebujejo `id` in bodisi `result` ali `error`  
- **Obvestila**: vsebujejo `method` in neobvezne `params` (brez `id` in pričakovanega odgovora)

Ta strukturirana komunikacija zagotavlja zanesljive, sledljive in razširljive interakcije, ki podpirajo napredne scenarije, kot so posodobitve v realnem času, verižna uporaba orodij in robustno rokovanje z napakami.

### Naloge (eksperimentalno)

**Naloge** so eksperimentalna funkcionalnost, ki zagotavlja vzdržne ovojnice za izvajanje, omogoča odloženo pridobivanje rezultatov in spremljanje stanja MCP zahtev:

- **Dolgotrajne operacije**: Spremljajo zahtevne izračune, avtomatizacijo potekov dela in obdelavo serij  
- **Odloženi rezultati**: Omogočajo povpraševanje po stanju naloge in pridobitev rezultatov, ko so operacije zaključene  
- **Spremljanje stanja**: Nadzira napredek nalog prek definiranih življenjskih faz  
- **Večstopenjske operacije**: Podpira kompleksne poteke, ki obsegajo več interakcij

Naloge ovijajo standardne MCP zahteve za omogočanje asinhronih vzorcev izvajanja za operacije, ki se ne morejo zaključiti takoj.

## Ključne ugotovitve

- **Arhitektura**: MCP uporablja arhitekturo odjemalec-strežnik, kjer gostitelji upravljajo več odjemalskih povezav do strežnikov  
- **Udeleženci**: Ekosistem vključuje gostitelje (AI aplikacije), odjemalce (protokolske povezave) in strežnike (ponudnike zmožnosti)  
- **Transportni mehanizmi**: Komunikacija podpira STDIO (lokalni) in HTTP s pretočnostjo z neobveznim SSE (oddaljeni)  
- **Osnovni primitivi**: Strežniki nudijo orodja (izvedljive funkcije), vire (podatkovne izvore) in pozive (predloge)  
- **Primitivi odjemalca**: Strežniki lahko zahtevajo vzorčenje (doplnitve LLM z podporo klicu orodij), elicitation (uporabniški vnos vključno z URL načinom), roots (meje datotečnega sistema) in beleženje od odjemalcev  
- **Eksperimentalne funkcije**: Naloge zagotavljajo vzdržne ovojnice izvajanja za dolgotrajne operacije  
- **Osnova protokola**: Zgrajen na JSON-RPC 2.0 z verzioniranjem na podlagi datuma (trenutno: 2025-11-25)  
- **Zmožnosti v realnem času**: Podpira obvestila za dinamične posodobitve in sinhronizacijo v realnem času  
- **Varnost na prvem mestu**: Izrecno soglasje uporabnika, zaščita zasebnosti podatkov in varen transport so osnovni zahtevi

## Vaja

Oblikujte preprosto MCP orodje, ki bi bilo uporabno v vašem področju. Določite:  
1. Kako bi se orodje imenovalo  
2. Katere parametre bi sprejemalo  
3. Kakšen izhod bi vrnilo  
4. Kako bi model lahko uporabil to orodje za reševanje uporabniških problemov

---

## Kaj sledi

Naslednje: [Poglavje 2: Varnost](../02-Security/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo storitve za avtomatski prevod AI [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvorno jeziku velja za verodostojen vir. Za kritične informacije priporočamo strokovni prevod opravil človeški prevajalec. Ne odgovarjamo za morebitne nesporazume ali napačne razlage, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->