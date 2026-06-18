# AGENTS.md

## Prosjektoversikt

**MCP for nybegynnere** er et åpen kildekode utdanningsprogram for å lære Model Context Protocol (MCP) - et standardisert rammeverk for interaksjoner mellom AI-modeller og klientapplikasjoner. Dette arkivet tilbyr omfattende læringsmateriell med praktiske kodeeksempler på flere programmeringsspråk.

### Nøkkelteknologier

- **Programmeringsspråk**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Rammeverk og SDK-er**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Databaser**: PostgreSQL med pgvector-utvidelse
- **Skyplattformer**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Byggeverktøy**: npm, Maven, pip, Cargo
- **Dokumentasjon**: Markdown med automatisk flerspråklig oversettelse (48+ språk)

### Arkitektur

- **11 kjernermoduler (00-11)**: Sekvensiell læringssti fra grunnleggende til avanserte emner
- **Praktiske laboratorier**: Øvelser med komplett løsningskode i flere språk
- **Eksempelsprosjekter**: Funksjonelle MCP-server og klientimplementeringer
- **Oversettelsessystem**: Automatisk GitHub Actions arbeidsflyt for flerspråklig støtte
- **Bildegjenstander**: Sentralisert bildekatalog med oversatte versjoner

## Oppsettkommandoer

Dette er et dokumentasjonsfokusert arkiv. Det meste av oppsett skjer i individuelle eksempler og laboratorier.

### Arkivoppsett

```bash
# Klon depotet
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Arbeide med eksempelsprosjekter

Eksempelsprosjekter finnes i:
- `03-GettingStarted/samples/` - Språkspesifikke eksempler
- `03-GettingStarted/01-first-server/solution/` - Første serverimplementasjoner
- `03-GettingStarted/02-client/solution/` - Klientimplementeringer
- `11-MCPServerHandsOnLabs/` - Omfattende laboratorier for databaseintegrasjon

Hvert eksempelsprosjekt inneholder egne oppsettinstruksjoner:

#### TypeScript/JavaScript-prosjekter
```bash
cd <project-directory>
npm install
npm start
```

#### Python-prosjekter
```bash
cd <project-directory>
pip install -r requirements.txt
# eller
pip install -e .
python main.py
```

#### Java-prosjekter
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Utviklingsarbeidsflyt

### Dokumentasjonsstruktur

- **Moduler 00-11**: Kjernekursinnhold i sekvensiell rekkefølge
- **translations/**: Språkspesifikke versjoner (auto-generert, ikke rediger direkte)
- **translated_images/**: Lokalisert bildeversjoner (auto-generert)
- **images/**: Kildebilder og diagrammer

### Gjøre endringer i dokumentasjon

1. Rediger kun engelske markdown-filer i rotmodulkatalogene (00-11)
2. Oppdater bilder i `images/` katalogen om nødvendig
3. co-op-translator GitHub Action genererer automatisk oversettelser
4. Oversettelser regenereres ved push til main-branchen

### Arbeide med oversettelser

- **Automatisk oversettelse**: GitHub Actions håndterer alle oversettelser
- **Ikke rediger manuelt** filer i `translations/` katalogen
- Oversettelsesmetadata er innebygd i hver oversatte fil
- Støttede språk: 48+ språk inkludert arabisk, kinesisk, fransk, tysk, hindi, japansk, koreansk, portugisisk, russisk, spansk og flere

## Testinstruksjoner

### Validering av dokumentasjon

Siden dette primært er et dokumentasjonsarkiv, fokuserer testing på:

1. **Lenkevalidering**: Sørg for at alle interne lenker fungerer
```bash
# Sjekk etter ødelagte markdown-lenker
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Kodeeksempelsvalidering**: Test at kodeeksempler kompileres/kjører
```bash
# Naviger til spesifikk prøve og kjør testene dens
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown-linting**: Sjekk formateringskonsistens
```bash
# Bruk markdownlint om nødvendig
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testing av eksempelsprosjekter

Hvert språkspesifikt eksempel har sin egen testmetode:

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

## Kodeleggingsretningslinjer

### Dokumentasjonsstil

- Bruk klart, nybegynnervennlig språk
- Inkluder kodeeksempler på flere språk der det er aktuelt
- Følg markdown beste praksis:
  - Bruk ATX-stil overskrifter (`#` syntaks)
  - Bruk avgrensede kodeblokker med språkendikatorer
  - Inkluder beskrivende alt-tekst for bilder
  - Hold linjelengde rimelig (ingen hard grense, men vær fornuftig)

### Kodeeksempelstil

#### TypeScript/JavaScript
- Bruk ES-moduler (`import`/`export`)
- Følg TypeScript streng modus konvensjoner
- Inkluder typeannotasjoner
- Målrett ES2022

#### Python
- Følg PEP 8 stilretningslinjer
- Bruk typehint der hensiktsmessig
- Inkluder docstrings for funksjoner og klasser
- Bruk moderne Python-funksjoner (3.8+)

#### Java
- Følg Spring Boot konvensjoner
- Bruk Java 21-funksjoner
- Følg standard Maven prosjektstruktur
- Inkluder Javadoc-kommentarer

### Filorganisering

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

## Bygg og distribusjon

### Dokumentasjons-distribusjon

Arkivet bruker GitHub Pages eller lignende for hosting av dokumentasjon (dersom aktuelt). Endringer i main-branchen utløser:

1. Oversettelsesarbeidsflyt (`.github/workflows/co-op-translator.yml`)
2. Automatisk oversettelse av alle engelske markdown-filer
3. Bilde-lokalisering ved behov

### Ingen byggeprosess nødvendig

Dette arkivet inneholder primært markdown-dokumentasjon. Det kreves ikke kompilering eller byggeprosess for kjernekursinnholdet.

### Distribusjon av eksempelsprosjekter

Enkeltstående eksempelsprosjekter kan ha egne distribusjonsinstruksjoner:
- Se `03-GettingStarted/09-deployment/` for MCP server distribusjonsveiledning
- Azure Container Apps distribusjonseksempler i `11-MCPServerHandsOnLabs/`

## Bidragsretningslinjer

### Pull request-prosess

1. **Fork og klon**: Fork repoet og klon ditt fork lokalt
2. **Lag en branch**: Bruk beskrivende branchnavn (f.eks. `fix/typo-module-3`, `add/python-example`)
3. **Gjør endringer**: Rediger kun engelske markdown-filer (ikke oversettelser)
4. **Test lokalt**: Verifiser at markdown rendres riktig
5. **Send PR**: Bruk klare PR-titler og beskrivelser
6. **CLA**: Signer Microsoft Contributor License Agreement når etterspurt

### Format for PR-titler

Bruk klare, beskrivende titler:
- `[Module XX] Kort beskrivelse` for modulspesifikke endringer
- `[Samples] Beskrivelse` for endringer i kodeeksempler
- `[Docs] Beskrivelse` for generell dokumentasjonsoppdatering

### Hva å bidra med

- Feilrettinger i dokumentasjon eller kodeeksempler
- Nye kodeeksempler på flere språk
- Presiseringer og forbedringer av eksisterende innhold
- Nye casestudier eller praktiske eksempler
- Problemrapporter for uklar eller feilaktig innhold

### Hva IKKE å gjøre

- Ikke rediger filer direkte i `translations/` katalogen
- Ikke rediger `translated_images/` katalogen
- Ikke legg til store binærfiler uten diskusjon
- Ikke endre oversettelsesarbeidsflyt-filer uten koordinering

## Ytterligere notater

### Vedlikehold av arkiv

- **Endringslogg**: Alle vesentlige endringer dokumenteres i `changelog.md`
- **Studieveiledning**: Bruk `study_guide.md` for oversikt over kursnavigasjon
- **Issue-maler**: Bruk GitHub issue-maler for feilrapporter og funksjonsforespørsler
- **Adferdskodeks**: Alle bidragsytere må følge Microsoft Open Source Code of Conduct

### Læringssti

Følg modulene sekvensielt (00-11) for optimal læring:
1. **00-02**: Grunnleggende (Introduksjon, kjernkonsepter, sikkerhet)
2. **03**: Komme i gang med praktisk implementering
3. **04-05**: Praktisk implementering og avanserte emner
4. **06-10**: Fellesskap, beste praksis og reelle applikasjoner
5. **11**: Omfattende laboratorier for databaseintegrasjon (13 sekvensielle laboratorier)

### Støtteressurser

- **Dokumentasjon**: https://modelcontextprotocol.io/
- **Spesifikasjon**: https://spec.modelcontextprotocol.io/
- **Fellesskap**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord-server
- **Beslektede kurs**: Se README.md for andre Microsoft læringsstier

### Vanlige feilsøkingstips

**Q: Min PR feiler oversettelseskontrollen**  
A: Sørg for at du kun har redigert engelske markdown-filer i rotmodulene, ikke oversatte versjoner.

**Q: Hvordan legger jeg til et nytt språk?**  
A: Språkstøtte styres gjennom co-op-translator arbeidsflyten. Åpne en issue for å diskutere nye språk.

**Q: Kodeeksemplene virker ikke**  
A: Sørg for at du har fulgt oppsettsinstruksjonene i den spesifikke eksempels README. Sjekk at riktige versjoner av avhengigheter er installert.

**Q: Bilder vises ikke**  
A: Kontroller at bildefilbaner er relative og bruker skråstreker. Bildene skal være i `images/` eller `translated_images/` for lokaliserte versjoner.

### Ytelseshensyn

- Oversettelsesarbeidsflyten kan ta flere minutter å fullføre
- Store bilder bør optimaliseres før innsjekk
- Hold individuelle markdown-filer fokuserte og rimelig store
- Bruk relative lenker for bedre portabilitet

### Prosjektstyring

Dette prosjektet følger Microsoft åpne kildekode-praksiser:  
- MIT-lisens for kode og dokumentasjon  
- Microsoft Open Source Code of Conduct  
- CLA kreves for bidrag  
- Sikkerhetsproblemer: Følg retningslinjene i SECURITY.md  
- Support: Se SUPPORT.md for hjelp-ressurser

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->