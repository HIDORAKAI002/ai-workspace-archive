# AGENTS.md

## Projectoverzicht

**MCP voor Beginners** is een open-source educatief curriculum voor het leren van het Model Context Protocol (MCP) - een gestandaardiseerd raamwerk voor interacties tussen AI-modellen en clienttoepassingen. Deze repository biedt uitgebreide leermaterialen met praktische codevoorbeelden in meerdere programmeertalen.

### Belangrijkste Technologieën

- **Programmeertalen**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworks & SDK's**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Databases**: PostgreSQL met pgvector extensie
- **Cloudplatforms**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Build Tools**: npm, Maven, pip, Cargo
- **Documentatie**: Markdown met geautomatiseerde vertaling in meerdere talen (48+ talen)

### Architectuur

- **11 Kernmodules (00-11)**: Opeenvolgend leertraject van basisprincipes tot geavanceerde onderwerpen
- **Hands-on Labs**: Praktische oefeningen met complete oplossingscode in meerdere talen
- **Voorbeeldprojecten**: Werkende MCP server- en clientimplementaties
- **Vertalingssysteem**: Geautomatiseerde GitHub Actions workflow voor meertalige ondersteuning
- **Afbeeldingsbestanden**: Gecentraliseerde map met afbeeldingen en vertaalde versies

## Setup Commando's

Dit is een op documentatie gericht repository. De meeste setup vindt plaats binnen individuele voorbeeldprojecten en labs.

### Repository Setup

```bash
# Clone de repository
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Werken met Voorbeeldprojecten

Voorbeeldprojecten bevinden zich in:
- `03-GettingStarted/samples/` - Taal specifieke voorbeelden
- `03-GettingStarted/01-first-server/solution/` - Eerste serverimplementaties
- `03-GettingStarted/02-client/solution/` - Clientimplementaties
- `11-MCPServerHandsOnLabs/` - Uitgebreide database-integratie labs

Elk voorbeeldproject bevat zijn eigen setup instructies:

#### TypeScript/JavaScript Projecten
```bash
cd <project-directory>
npm install
npm start
```

#### Python Projecten
```bash
cd <project-directory>
pip install -r requirements.txt
# of
pip install -e .
python main.py
```

#### Java Projecten
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Ontwikkelworkflow

### Documentatiestructuur

- **Modules 00-11**: Kerninhoud curriculum in opeenvolgende volgorde
- **translations/**: Taal specifieke versies (automatisch gegenereerd, niet direct bewerken)
- **translated_images/**: Gelokaliseerde afbeeldingsversies (automatisch gegenereerd)
- **images/**: Bronafbeeldingen en diagrammen

### Documentatiewijzigingen Aanbrengen

1. Bewerk alleen de Engelse markdown-bestanden in de hoofddirectories van modules (00-11)
2. Werk afbeeldingen bij in de map `images/` indien nodig
3. De co-op-translator GitHub Action genereert automatisch vertalingen
4. Vertalingen worden opnieuw gegenereerd bij pushen naar de main branch

### Werken met Vertalingen

- **Geautomatiseerde Vertaling**: GitHub Actions workflow verzorgt alle vertalingen
- **Niet handmatig bewerken** van bestanden in de `translations/` map
- Vertaalmetadata is ingebed in elk vertaald bestand
- Ondersteunde talen: 48+ talen inclusief Arabisch, Chinees, Frans, Duits, Hindi, Japans, Koreaans, Portugees, Russisch, Spaans, en vele anderen

## Testinstructies

### Documentatie Validatie

Aangezien dit vooral een documentatierepository is, ligt de focus van testen op:

1. **Linkvalidatie**: Controleer of alle interne links werken
```bash
# Controleren op gebroken markdown-links
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Codevoorbeeldvalidatie**: Test dat codevoorbeelden compileren/draaien
```bash
# Navigeer naar een specifiek voorbeeld en voer de tests uit
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown Linting**: Controleer consistente opmaak
```bash
# Gebruik markdownlint indien nodig
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testen van Voorbeeldprojecten

Elk taal-specifiek voorbeeld bevat zijn eigen testaanpak:

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

## Code Style Richtlijnen

### Documentatiestijl

- Gebruik duidelijke, beginner-vriendelijke taal
- Neem codevoorbeelden op in meerdere talen waar van toepassing
- Volg markdown best practices:
  - Gebruik ATX-koppen (`#` syntaxis)
  - Gebruik fenced codeblocks met taalaanduiding
  - Voeg beschrijvende alt-tekst toe aan afbeeldingen
  - Houd regelbreedtes redelijk (geen harde limiet, maar wees verstandig)

### Codevoorbeeldstijl

#### TypeScript/JavaScript
- Gebruik ES modules (`import`/`export`)
- Volg TypeScript strict mode conventies
- Voeg typeannotaties toe
- Richt op ES2022

#### Python
- Volg PEP 8 stijlrichtlijnen
- Gebruik type hints waar passend
- Voeg docstrings toe aan functies en klassen
- Gebruik moderne Python features (3.8+)

#### Java
- Volg Spring Boot conventies
- Gebruik Java 21 features
- Volg standaard Maven projectstructuur
- Voeg Javadoc commentaar toe

### Bestandsorganisatie

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

## Build en Deployment

### Documentatie Deployment

De repository gebruikt GitHub Pages of soortgelijk voor documentatie hosting (indien van toepassing). Wijzigingen op de main branch triggeren:

1. Vertaalworkflow (`.github/workflows/co-op-translator.yml`)
2. Geautomatiseerde vertaling van alle Engelse markdown-bestanden
3. Lokalisatie van afbeeldingen indien nodig

### Geen Buildproces Vereist

Deze repository bevat voornamelijk markdown-documentatie. Geen compilatie- of buildstap nodig voor de kerninhoud van het curriculum.

### Deployment van Voorbeeldprojecten

Individuele voorbeeldprojecten kunnen deploymentinstructies hebben:
- Zie `03-GettingStarted/09-deployment/` voor MCP server deployment richtlijnen
- Azure Container Apps deployment voorbeelden in `11-MCPServerHandsOnLabs/`

## Bijdrager Richtlijnen

### Pull Request Proces

1. **Fork en Clone**: Fork de repository en clone je fork lokaal
2. **Maak een Branch aan**: Gebruik beschrijvende branchnamen (bijv. `fix/typo-module-3`, `add/python-example`)
3. **Breng Wijzigingen aan**: Bewerk alleen Engelse markdown-bestanden (geen vertalingen)
4. **Test Lokaal**: Controleer dat markdown correct renderen
5. **Dien PR in**: Gebruik duidelijke PR titels en omschrijvingen
6. **CLA**: Onderteken de Microsoft Contributor License Agreement als daarom gevraagd wordt

### PR Titel-formaat

Gebruik duidelijke, beschrijvende titels:
- `[Module XX] Korte beschrijving` voor module-specifieke wijzigingen
- `[Samples] Beschrijving` voor voorbeeldcode wijzigingen
- `[Docs] Beschrijving` voor algemene documentatie updates

### Wat bij te dragen

- Bugfixes in documentatie of codevoorbeelden
- Nieuwe codevoorbeelden in extra talen
- Verduidelijkingen en verbeteringen aan bestaande inhoud
- Nieuwe casestudy's of praktische voorbeelden
- Issue-rapporten voor onduidelijke of onjuiste inhoud

### Wat NIET te doen

- Bewerk niet direct bestanden in de `translations/` map
- Bewerk niet de `translated_images/` map
- Voeg geen grote binaire bestanden toe zonder overleg
- Wijzig de vertaalworkflowbestanden niet zonder afstemming

## Aanvullende Aantekeningen

### Repository Onderhoud

- **Changelog**: Alle belangrijke wijzigingen worden gedocumenteerd in `changelog.md`
- **Studiegids**: Gebruik `study_guide.md` voor overzicht van curriculumnavigatie
- **Issue Templates**: Gebruik GitHub issue templates voor bugmeldingen en feature-verzoeken
- **Gedragscode**: Alle bijdragers moeten de Microsoft Open Source Code of Conduct volgen

### Leertraject

Volg modules in opeenvolgende volgorde (00-11) voor optimale leerervaring:
1. **00-02**: Basisprincipes (Introductie, Kernconcepten, Beveiliging)
2. **03**: Aan de slag met hands-on implementatie
3. **04-05**: Praktische implementatie en geavanceerde onderwerpen
4. **06-10**: Community, beste praktijken en real-world toepassingen
5. **11**: Uitgebreide database-integratie labs (13 opeenvolgende labs)

### Ondersteuningsbronnen

- **Documentatie**: https://modelcontextprotocol.io/
- **Specificatie**: https://spec.modelcontextprotocol.io/
- **Community**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord server
- **Verwante Cursussen**: Zie README.md voor andere Microsoft-leertrajecten

### Veelvoorkomende Problemen

**V: Mijn PR faalt de vertaalcontrole**  
A: Zorg dat je alleen de Engelse markdown-bestanden in de hoofdmaps van de modules hebt bewerkt, niet de vertaalde versies.

**V: Hoe voeg ik een nieuwe taal toe?**  
A: Taalondersteuning wordt beheerd via de co-op-translator workflow. Open een issue om nieuwe talen te bespreken.

**V: Codevoorbeelden werken niet**  
A: Zorg dat je de setupinstructies in de specifieke sample README hebt gevolgd. Controleer of de juiste versies van dependencies zijn geïnstalleerd.

**V: Afbeeldingen worden niet weergegeven**  
A: Controleer of afbeeldingspaden relatief zijn en gebruik forward slashes. Afbeeldingen moeten in de `images/` map of `translated_images/` voor gelokaliseerde versies staan.

### Prestatieoverwegingen

- Vertaalworkflow kan enkele minuten duren om te voltooien
- Grote afbeeldingen moeten worden geoptimaliseerd vóór commit
- Houd individuele markdown-bestanden gefocust en redelijk van omvang
- Gebruik relatieve links voor betere draagbaarheid

### Projectbestuur

Dit project volgt Microsoft open source-praktijken:  
- MIT-licentie voor code en documentatie  
- Microsoft Open Source Code of Conduct  
- CLA vereist voor bijdragen  
- Beveiligingskwesties: volg SECURITY.md richtlijnen  
- Ondersteuning: zie SUPPORT.md voor hulpbronnen

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->