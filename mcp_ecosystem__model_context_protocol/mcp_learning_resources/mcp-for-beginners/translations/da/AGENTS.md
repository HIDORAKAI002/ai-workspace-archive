# AGENTS.md

## Projektoversigt

**MCP for Beginners** er en open-source uddannelsesplan til læring af Model Context Protocol (MCP) - en standardiseret ramme for interaktioner mellem AI-modeller og klientapplikationer. Dette repository tilbyder omfattende læringsmaterialer med praktiske kodeeksempler på tværs af flere programmeringssprog.

### Centrale teknologier

- **Programmeringssprog**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworks & SDK'er**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Databaser**: PostgreSQL med pgvector-udvidelse
- **Cloud-platforme**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Build-værktøjer**: npm, Maven, pip, Cargo
- **Dokumentation**: Markdown med automatiseret flersproget oversættelse (48+ sprog)

### Arkitektur

- **11 kerne-moduler (00-11)**: Sekventiel læringssti fra grundlæggende til avancerede emner
- **Hands-on labs**: Praktiske øvelser med komplet løsningskode på flere sprog
- **Sampleprojekter**: Fungerende MCP server- og klientimplementeringer
- **Oversættelsessystem**: Automatiseret GitHub Actions workflow til flersproget understøttelse
- **Billedressourcer**: Centrale billedmapper med oversatte versioner

## Opsætningskommandoer

Dette er et dokumentationsfokuseret repository. Mest opsætning sker inden for de enkelte sampleprojekter og labs.

### Repository-opsætning

```bash
# Klon repositoryet
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Arbejde med sampleprojekter

Sampleprojekter er placeret i:
- `03-GettingStarted/samples/` - Sprog-specifikke eksempler
- `03-GettingStarted/01-first-server/solution/` - Første serverimplementeringer
- `03-GettingStarted/02-client/solution/` - Klientimplementeringer
- `11-MCPServerHandsOnLabs/` - Omfattende databaseintegrationslabs

Hvert sampleprojekt indeholder egne opsætningsinstruktioner:

#### TypeScript/JavaScript-projekter
```bash
cd <project-directory>
npm install
npm start
```

#### Python-projekter
```bash
cd <project-directory>
pip install -r requirements.txt
# eller
pip install -e .
python main.py
```

#### Java-projekter
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Udviklingsworkflow

### Dokumentationsstruktur

- **Moduler 00-11**: Kernestof i sekventiel rækkefølge
- **translations/**: Sprog-specifikke versioner (auto-genereret, redigeres ikke direkte)
- **translated_images/**: Lokaliserede billedversioner (auto-genereret)
- **images/**: Kildebilleder og diagrammer

### Ændring af dokumentation

1. Rediger kun de engelske markdown-filer i rodmodulmapperne (00-11)
2. Opdater billeder i `images/`-mappen, hvis nødvendigt
3. co-op-translator GitHub Action genererer automatisk oversættelser
4. Oversættelser regenereres ved push til main-branch

### Arbejde med oversættelser

- **Automatiseret oversættelse**: GitHub Actions workflow håndterer alle oversættelser
- Rediger IKKE manuelt filer i `translations/` mappen
- Oversættelsesmetadata er indlejret i hver oversat fil
- Understøttede sprog: 48+ sprog, inkl. arabisk, kinesisk, fransk, tysk, hindi, japansk, koreansk, portugisisk, russisk, spansk og mange flere

## Testinstruktioner

### Validering af dokumentation

Da dette primært er et dokumentationsrepository, fokuserer test på:

1. **Linkvalidering**: Sikre at alle interne links virker
```bash
# Tjek for ødelagte markdown-links
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validering af kodeeksempler**: Test at kodeeksempler kompilerer/kører
```bash
# Naviger til en specifik prøve og kør dens tests
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown-linting**: Kontrollér formateringskonsistens
```bash
# Brug markdownlint om nødvendigt
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Test af sampleprojekter

Hvert sprog-specifikt sample inkluderer sin egen testmetode:

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

## Kode-stil retningslinjer

### Dokumentationsstil

- Brug klart og begynder-venligt sprog
- Inkluder kodeeksempler på flere sprog, hvor relevant
- Følg markdown-best practices:
  - Brug ATX-style overskrifter (`#` syntaks)
  - Brug fenced code blocks med sprog-identifier
  - Inkluder beskrivende alt-tekst for billeder
  - Hold linjelængder fornuftige (ingen hård grænse, men vær rimelig)

### Kodeeksempelstil

#### TypeScript/JavaScript
- Brug ES-moduler (`import`/`export`)
- Følg TypeScript strict mode konventioner
- Inkluder typeannoteringer
- Målret ES2022

#### Python
- Følg PEP 8 stilretningslinjer
- Brug type hints hvor passende
- Inkluder docstrings for funktioner og klasser
- Brug moderne Python-funktioner (3.8+)

#### Java
- Følg Spring Boot konventioner
- Brug Java 21 funktioner
- Følg standard Maven projektstruktur
- Inkluder Javadoc-kommentarer

### Filer og mapper

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

## Byg og udrulning

### Udrulning af dokumentation

Repositoryet bruger GitHub Pages eller lignende til dokumentationshosting (hvis relevant). Ændringer til main-branch udløser:

1. Oversættelsesworkflow (`.github/workflows/co-op-translator.yml`)
2. Automatisk oversættelse af alle engelske markdown-filer
3. Lokaliserede billeder efter behov

### Ingen build-proces krævet

Dette repository indeholder primært markdown-dokumentation. Ingen kompilerings- eller build-trin er nødvendigt for kernestoffet.

### Udrulning af sampleprojekter

Enkelte sampleprojekter kan have udrulningsinstruktioner:
- Se `03-GettingStarted/09-deployment/` for MCP server-udrulningsvejledning
- Azure Container Apps udrulningseksempler i `11-MCPServerHandsOnLabs/`

## Bidragsvejledning

### Pull Request proces

1. **Fork og klon**: Fork repositoryet og klon fork lokalt
2. **Opret branch**: Brug beskrivende branchnavne (fx `fix/typo-module-3`, `add/python-example`)
3. **Foretag ændringer**: Rediger kun engelske markdown-filer (ikke oversættelser)
4. **Test lokalt**: Bekræft markdown rendres korrekt
5. **Indsend PR**: Brug klare PR-titler og beskrivelser
6. **CLA**: Underskriv Microsoft Contributor License Agreement, når du bliver bedt om det

### Format på PR-titel

Brug klare, beskrivende titler:
- `[Module XX] Kort beskrivelse` for modul-specifikke ændringer
- `[Samples] Beskrivelse` for samplekodeændringer
- `[Docs] Beskrivelse` for generelle dokumentationsopdateringer

### Hvad man kan bidrage med

- Fejlrettelser i dokumentation eller kodeeksempler
- Nye kodeeksempler i flere sprog
- Klargøringer og forbedringer til eksisterende indhold
- Nye case-studier eller praktiske eksempler
- Fejlrapporter ved uklart eller forkert indhold

### Hvad man IKKE skal gøre

- Rediger ikke filer direkte i `translations/` mappen
- Rediger ikke `translated_images/` mappen
- Tilføj ikke store binære filer uden diskussion
- Ændr ikke oversættelsesworkflow-filer uden koordinering

## Yderligere noter

### Repository-vedligeholdelse

- **Changelog**: Alle væsentlige ændringer dokumenteres i `changelog.md`
- **Studieguide**: Brug `study_guide.md` til overblik over læseplanen
- **Issue-templates**: Brug GitHub issue-templates til fejlrapportering og feature-forespørgsler
- **Adfærdskodeks**: Alle bidragsydere skal følge Microsoft Open Source Code of Conduct

### Læringssti

Følg moduler i sekventiel rækkefølge (00-11) for optimal læring:
1. **00-02**: Grundlæggende (Introduktion, Kernekoncepter, Sikkerhed)
2. **03**: Kom godt i gang med hands-on implementering
3. **04-05**: Praktisk implementering og avancerede emner
4. **06-10**: Fællesskab, best practices og virkelige anvendelser
5. **11**: Omfattende databaseintegrationslabs (13 sekventielle labs)

### Supportressourcer

- **Dokumentation**: https://modelcontextprotocol.io/
- **Specifikation**: https://spec.modelcontextprotocol.io/
- **Fællesskab**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord-server
- **Relaterede kurser**: Se README.md for andre Microsoft læringsstier

### Almindelig fejlretning

**Q: Min PR fejler oversættelsestjekket**  
A: Sørg for kun at have redigeret engelske markdown-filer i rodmodulmapperne, ikke oversatte versioner.

**Q: Hvordan tilføjer jeg et nyt sprog?**  
A: Sprogunderstøttelse styres via co-op-translator workflow. Åbn en issue for at diskutere tilføjelse af nye sprog.

**Q: Kodeeksempler virker ikke**  
A: Sørg for at du har fulgt opsætningsinstruktionerne i den specifikke samples README. Tjek at de korrekte afhængighedsversioner er installeret.

**Q: Billeder vises ikke**  
A: Bekræft at billedstier er relative og bruger skråstreger. Billeder skal være i `images/` mappen eller `translated_images/` for lokaliserede versioner.

### Ydeevneovervejelser

- Oversættelsesworkflow kan tage flere minutter
- Store billeder bør optimeres før commit
- Hold individuelle markdown-filer fokuserede og rimeligt store
- Brug relative links for bedre portabilitet

### Projektstyring

Dette projekt følger Microsoft open source praksis:  
- MIT-licens for kode og dokumentation  
- Microsoft Open Source Code of Conduct  
- CLA kræves for bidrag  
- Sikkerhedsproblemer: Følg SECURITY.md retningslinjer  
- Support: Se SUPPORT.md for hjælperessourcer

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->