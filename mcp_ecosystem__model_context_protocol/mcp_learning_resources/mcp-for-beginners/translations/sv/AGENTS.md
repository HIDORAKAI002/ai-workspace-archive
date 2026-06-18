# AGENTS.md

## Projektöversikt

**MCP för nybörjare** är en öppen källkods utbildningsplan för att lära sig Model Context Protocol (MCP) - ett standardiserat ramverk för interaktioner mellan AI-modeller och klientapplikationer. Detta arkiv tillhandahåller omfattande läromaterial med praktiska kodexempel på flera programmeringsspråk.

### Nyckelteknologier

- **Programmeringsspråk**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Ramverk & SDKs**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Databaser**: PostgreSQL med pgvector-tillägg
- **Molnplattformar**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Byggverktyg**: npm, Maven, pip, Cargo
- **Dokumentation**: Markdown med automatiserad flerspråkig översättning (48+ språk)

### Arkitektur

- **11 huvudmoduler (00-11)**: Sekventiell lärandeväg från grundläggande till avancerade ämnen
- **Praktiska laborationer**: Praktiska övningar med komplett lösningskod i flera språk
- **Exempelprojekt**: Fungerande MCP-server och klient implementationer
- **Översättningssystem**: Automatiserat GitHub Actions-workflow för flerspråkigt stöd
- **Bildresurser**: Centraliserad bilder-mapp med översatta versioner

## Setup-kommandon

Detta är ett dokumentationsfokuserat arkiv. Det mesta av setup sker inom enskilda exempelprojekt och laborationer.

### Repository-setup

```bash
# Klona förrådet
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Arbeta med exempelprojekt

Exempelprojekt finns i:
- `03-GettingStarted/samples/` - Språkspecifika exempel
- `03-GettingStarted/01-first-server/solution/` - Implementeringar för första servern
- `03-GettingStarted/02-client/solution/` - Klient-implementeringar
- `11-MCPServerHandsOnLabs/` - Omfattande databasintegrationslaborationer

Varje exempelprojekt innehåller sina egna setup-instruktioner:

#### TypeScript/JavaScript-projekt
```bash
cd <project-directory>
npm install
npm start
```

#### Python-projekt
```bash
cd <project-directory>
pip install -r requirements.txt
# eller
pip install -e .
python main.py
```

#### Java-projekt
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Utvecklingsarbetsflöde

### Dokumentationsstruktur

- **Moduler 00-11**: Kärninnehåll i sekventiell ordning
- **translations/**: Språkspecifika versioner (genererade automatiskt, redigera inte direkt)
- **translated_images/**: Lokala bildversioner (genererade automatiskt)
- **images/**: Källbilder och diagram

### Göra dokumentationsändringar

1. Redigera endast de engelska markdown-filerna i root-module-mapperna (00-11)
2. Uppdatera bilder i `images/` mappen vid behov
3. co-op-translator GitHub Action genererar automatiskt översättningar
4. Översättningar genereras om vid push till main-gren

### Arbeta med översättningar

- **Automatisk översättning**: GitHub Actions-workflow hanterar alla översättningar
- **Redigera inte manuellt** filer i `translations/` mappen
- Översättningsmetadata är inbäddad i varje översatt fil
- Stödda språk: 48+ språk inklusive arabiska, kinesiska, franska, tyska, hindi, japanska, koreanska, portugisiska, ryska, spanska och många fler

## Testinstruktioner

### Dokumentationsvalidering

Eftersom detta främst är ett dokumentationsarkiv, fokuserar testning på:

1. **Länkvalidering**: Säkerställ att alla interna länkar fungerar
```bash
# Kontrollera efter brutna markdown-länkar
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Kodexempel-validering**: Testa att kodexemplen kompilerar/körs
```bash
# Navigera till specifikt prov och kör dess tester
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown-lintning**: Kontrollera formateringskonsekvens
```bash
# Använd markdownlint om det behövs
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testning av exempelprojekt

Varje språkspecifikt exempel har sin egen testmetod:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Kodstilriktlinjer

### Dokumentationsstil

- Använd tydligt, nybörjarvänligt språk
- Inkludera kodexempel på flera språk där det är relevant
- Följ markdown bästa praxis:
  - Använd ATX-stil rubriker (`#` syntax)
  - Använd fenced code blocks med språkidentifierare
  - Inkludera beskrivande alt-text för bilder
  - Håll radlängder rimliga (ingen hård gräns, men var förståndig)

### Kodexempelstil

#### TypeScript/JavaScript
- Använd ES-moduler (`import`/`export`)
- Följ TypeScripts strikt-läge konventioner
- Inkludera typanvisningar
- Mål ES2022

#### Python
- Följ PEP 8 stilriktlinjer
- Använd typ-hintar där lämpligt
- Inkludera docstrings för funktioner och klasser
- Använd moderna Python-funktioner (3.8+)

#### Java
- Följ Spring Boot-conventioner
- Använd Java 21-funktioner
- Följ standard Maven-projektstruktur
- Inkludera Javadoc-kommentarer

### Filorganisation

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Bygg och distribution

### Dokumentationsdistribution

Arkivet använder GitHub Pages eller liknande för dokumentationshosting (om tillämpligt). Ändringar i main-gren triggar:

1. Översättnings-workflow (`.github/workflows/co-op-translator.yml`)
2. Automatisk översättning av alla engelska markdown-filer
3. Bildlokalisering vid behov

### Ingen byggprocess krävs

Detta arkiv innehåller främst markdown-dokumentation. Ingen kompilering eller byggsteg krävs för kärnurvals-innehållet.

### Exempelprojekt-distribution

Enskilda exempelprojekt kan ha distributionsinstruktioner:
- Se `03-GettingStarted/09-deployment/` för MCP-serverdistribution
- Azure Container Apps-distributionsexempel i `11-MCPServerHandsOnLabs/`

## Bidragsriktlinjer

### Pull request-process

1. **Fork och klona**: Forka arkivet och klona din fork lokalt
2. **Skapa en gren**: Använd beskrivande grennamn (t.ex. `fix/typo-module-3`, `add/python-example`)
3. **Gör ändringar**: Redigera endast engelska markdown-filer (inte översättningar)
4. **Testa lokalt**: Bekräfta att markdown renderas korrekt
5. **Skicka PR**: Använd tydliga PR-titlar och beskrivningar
6. **CLA**: Signera Microsoft Contributor License Agreement när du uppmanas

### PR-titelformat

Använd tydliga, beskrivande titlar:
- `[Module XX] Kort beskrivning` för modulspecifika ändringar
- `[Samples] Beskrivning` för kodexempeländringar
- `[Docs] Beskrivning` för allmänna dokumentationsuppdateringar

### Vad att bidra med

- Buggfixar i dokumentation eller kodexempel
- Nya kodexempel på ytterligare språk
- Förtydliganden och förbättringar av befintligt innehåll
- Nya fallstudier eller praktiska exempel
- Rapportering av otydligt eller felaktigt innehåll

### Vad att INTE göra

- Redigera inte filer direkt i `translations/` mappen
- Redigera inte `translated_images/` mappen
- Lägg inte till stora binära filer utan diskussion
- Ändra inte översättningsworkflow-filer utan samordning

## Ytterligare anteckningar

### Arkivunderhåll

- **Ändringslogg**: Alla betydande ändringar dokumenteras i `changelog.md`
- **Studieguide**: Använd `study_guide.md` för översikt av läroplan
- **Issue-mallar**: Använd GitHub-issue-mallar för bugg- och funktionsförfrågningar
- **Uppförandekod**: Alla bidragsgivare måste följa Microsofts Open Source Code of Conduct

### Lärandeväg

Följ moduler i sekventiell ordning (00-11) för optimal inlärning:
1. **00-02**: Grundläggande (Introduktion, Kärnkoncept, Säkerhet)
2. **03**: Kom igång med praktisk implementation
3. **04-05**: Praktiska implementeringar och avancerade ämnen
4. **06-10**: Community, bästa praxis och verkliga tillämpningar
5. **11**: Omfattande databasintegrationslaborationer (13 sekventiella labbar)

### Stödresurser

- **Dokumentation**: https://modelcontextprotocol.io/
- **Specifikation**: https://spec.modelcontextprotocol.io/
- **Community**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord-server
- **Relaterade kurser**: Se README.md för andra Microsoft-lärandevägar

### Vanliga felsökningsfrågor

**Q: Min PR misslyckas med översättningskontrollen**  
A: Se till att du bara redigerat engelska markdown-filer i root-module-katalogerna, inte översatta versioner.

**Q: Hur lägger jag till ett nytt språk?**  
A: Språkstödet hanteras via co-op-translator-workflow. Öppna en issue för att diskutera nya språk.

**Q: Kodexempel fungerar inte**  
A: Säkerställ att du följt setup-instruktionerna i den specifika exempelprojekts README. Kontrollera att du har rätt versioner av beroenden installerade.

**Q: Bilder visas inte**  
A: Kontrollera att bildernas sökvägar är relativa och använder snedstreck framåt. Bilder ska finnas i `images/` katalogen eller `translated_images/` för lokaliserade versioner.

### Prestandaöverväganden

- Översättningsworkflow kan ta flera minuter att slutföra
- Stora bilder bör optimeras före commit
- Håll individuella markdown-filer fokuserade och rimligt stora
- Använd relativa länkar för bättre portabilitet

### Projektstyrning

Detta projekt följer Microsofts öppna källkodspraxis:  
- MIT-licens för kod och dokumentation  
- Microsoft Open Source Code of Conduct  
- CLA krävs för bidrag  
- Säkerhetsfrågor: Följ SECURITY.md-riktlinjer  
- Support: Se SUPPORT.md för hjälpresurser

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->