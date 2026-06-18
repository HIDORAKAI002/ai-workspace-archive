# AGENTS.md

## Prehľad projektu

**MCP pre začiatočníkov** je open-source vzdelávacia osnova na učenie Model Context Protocol (MCP) – štandardizovaný rámec pre interakcie medzi AI modelmi a klientskymi aplikáciami. Tento repozitár poskytuje komplexné vzdelávacie materiály s praktickými príkladmi kódu v rôznych programovacích jazykoch.

### Kľúčové technológie

- **Programovacie jazyky**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworky a SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Databázy**: PostgreSQL s rozšírením pgvector
- **Cloudové platformy**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Nástroje pre build**: npm, Maven, pip, Cargo
- **Dokumentácia**: Markdown s automatizovaným prekladom do viacerých jazykov (48+ jazykov)

### Architektúra

- **11 hlavních modulov (00-11)**: Sekvenčná učebná cesta od základov po pokročilé témy
- **Praktické laboratóriá**: Praktické cvičenia s kompletným riešením v rôznych jazykoch
- **Ukážkové projekty**: Funkčné implementácie MCP servera a klienta
- **Prekladový systém**: Automatizovaný GitHub Actions workflow na podporu viacerých jazykov
- **Obrázkové zdroje**: Centralizovaný adresár pre obrázky s preloženými verziami

## Príkazy na nastavenie

Toto je repozitár zameraný na dokumentáciu. Väčšina nastavení prebieha v jednotlivých ukážkových projektoch a laboratóriách.

### Nastavenie repozitára

```bash
# Naklonujte repozitár
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Práca s ukážkovými projektmi

Ukážkové projekty sa nachádzajú v:
- `03-GettingStarted/samples/` - Príklady podľa jazyka
- `03-GettingStarted/01-first-server/solution/` - Prvé implementácie servera
- `03-GettingStarted/02-client/solution/` - Implementácie klienta
- `11-MCPServerHandsOnLabs/` - Komplexné laboratóriá integrácie databázy

Každý ukážkový projekt obsahuje vlastné inštrukcie na nastavenie:

#### Projekty v TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Projekty v Pythone
```bash
cd <project-directory>
pip install -r requirements.txt
# alebo
pip install -e .
python main.py
```

#### Projekty v Jave
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Vývojový proces

### Štruktúra dokumentácie

- **Moduly 00-11**: Základný obsah osnovy v sekvenčnom poradí
- **translations/**: Verzie podľa jazyka (automaticky generované, neupravujte priamo)
- **translated_images/**: Lokalizované verzie obrázkov (automaticky generované)
- **images/**: Zdrojové obrázky a diagramy

### Úprava dokumentácie

1. Upraviť iba anglické markdown súbory v koreňových adresároch modulov (00-11)
2. Ak treba, aktualizovať obrázky v adresári `images/`
3. GitHub Action co-op-translator automaticky vygeneruje preklady
4. Preklady sa znovu generujú pri pushnutí do hlavnej vetvy

### Práca s prekladmi

- **Automatizovaný preklad**: Workflow v GitHub Actions spravuje všetky preklady
- **NEUPRAVUJTE ručne** súbory v adresári `translations/`
- Metadata prekladu sú vložené do každého preloženého súboru
- Podporované jazyky: 48+ jazykov vrátane arabčiny, čínštiny, francúzštiny, nemčiny, hindčiny, japončiny, kórejčiny, portugalčiny, ruštiny, španielčiny a ďalších

## Inštrukcie na testovanie

### Validácia dokumentácie

Keďže ide predovšetkým o repozitár dokumentácie, testovanie sa sústreďuje na:

1. **Validáciu odkazov**: Overiť funkčnosť všetkých interných odkazov
```bash
# Skontrolujte poškodené markdown odkazy
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validáciu ukážok kódu**: Overiť, či sa príklady kódu kompilujú/spúšťajú
```bash
# Prejdite na konkrétny príklad a spustite jeho testy
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown linting**: Skontrolovať formátovaciu konzistentnosť
```bash
# Použite markdownlint podľa potreby
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testovanie ukážkových projektov

Každý ukážkový projekt podľa jazyka má vlastný spôsob testovania:

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

## Pravidlá štýlu kódu

### Štýl dokumentácie

- Používajte jasný, zrozumiteľný jazyk pre začiatočníkov
- Zahrňte príklady kódu v rôznych jazykoch, kde je to vhodné
- Dodržiavajte najlepšie markdown praktiky:
  - Používajte hlavičky štýlu ATX (`#` syntax)
  - Používajte ohraničené bloky kódu s identifikátormi jazyka
  - Pridajte popisné alt texty pre obrázky
  - Udržujte primeranú dĺžku riadkov (nie je pevne stanovený limit, ale buďte rozumní)

### Štýl ukážkových kódov

#### TypeScript/JavaScript
- Používajte ES moduly (`import`/`export`)
- Dodržiavajte prísny režim TypeScriptu
- Používajte anotácie typov
- Cieľová verzia ES2022

#### Python
- Dodržiavajte konvencie PEP 8
- Používajte typové náznaky, kde je to vhodné
- Pridajte docstringy pre funkcie a triedy
- Používajte moderné Python vlastnosti (3.8+)

#### Java
- Dodržiavajte konvencie Spring Boot
- Používajte vlastnosti Javy 21
- Dodržiavajte štandardnú štruktúru projektu Maven
- Pridajte Javadoc komentáre

### Organizácia súborov

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

## Build a nasadenie

### Nasadenie dokumentácie

Repozitár používa GitHub Pages alebo podobné služby pre hostovanie dokumentácie (ak sa uplatňuje). Zmeny v hlavnej vetve spustia:

1. Prekladový workflow (`.github/workflows/co-op-translator.yml`)
2. Automatizovaný preklad všetkých anglických markdown súborov
3. Lokalizáciu obrázkov podľa potreby

### Nie je potrebný build proces

Tento repozitár obsahuje predovšetkým markdown dokumentáciu. Nie je potrebné žiadne kompilovanie alebo buildovanie pre obsah osnovy.

### Nasadenie ukážkových projektov

Jednotlivé ukážkové projekty môžu obsahovať inštrukcie na nasadenie:
- Pozrite `03-GettingStarted/09-deployment/` pre návod na nasadenie MCP servera
- Príklady nasadenia Azure Container Apps v `11-MCPServerHandsOnLabs/`

## Pravidlá pre príspevky

### Proces pull requestov

1. **Fork a klonovanie**: Urobte fork repozitára a klonujte váš fork lokálne
2. **Vytvorte vetvu**: Používajte zrozumiteľné názvy vetiev (napr. `fix/typo-module-3`, `add/python-example`)
3. **Urobte zmeny**: Upraviť iba anglické markdown súbory (nie preklady)
4. **Testujte lokálne**: Overte správne zobrazenie markdownu
5. **Odošlite PR**: Používajte jasné názvy a popisy PR
6. **CLA**: Podpíšte Microsoft Contributor License Agreement, keď budete vyzvaní

### Formát názvov PR

Používajte jasné a popisné titulky:
- `[Module XX] Stručný popis` pre zmeny špecifické pre modul
- `[Samples] Popis` pre zmeny v ukážkovom kóde
- `[Docs] Popis` pre všeobecné aktualizácie dokumentácie

### Čo prispieť

- Opravy chýb v dokumentácii alebo ukážkovej kóde
- Nové ukážky kódu v ďalších jazykoch
- Vysvetlenia a zlepšenia existujúceho obsahu
- Nové prípadové štúdie alebo praktické príklady
- Hlásenia problémov s nejasným alebo nesprávnym obsahom

### Čo nerobiť

- Neupravujte priamo súbory v `translations/`
- Neupravujte adresár `translated_images/`
- Nepřidávajte veľké binárne súbory bez konzultácie
- Nezmeňte súbory prekladového workflow bez dohody

## Ďalšie poznámky

### Údržba repozitára

- **Zoznam zmien**: Všetky významné zmeny sú zdokumentované v `changelog.md`
- **Študijný sprievodca**: Používajte `study_guide.md` na prehľad navigácie kurikula
- **Šablóny issues**: Používajte GitHub šablóny issues pre hlásenia chýb a požiadavky na funkcie
- **Kód správania**: Všetci prispievatelia musia dodržiavať Microsoft Open Source Code of Conduct

### Učebná cesta

Pre optimálne učenie postupujte podľa modulov v sekvenčnom poradí (00-11):
1. **00-02**: Základy (Úvod, základné koncepty, bezpečnosť)
2. **03**: Začiatky s praktickou implementáciou
3. **04-05**: Praktická implementácia a pokročilé témy
4. **06-10**: Komunita, najlepšie praktiky a reálne aplikácie
5. **11**: Komplexné laboratóriá integrácie databázy (13 sekvenčných laboratórií)

### Podporné zdroje

- **Dokumentácia**: https://modelcontextprotocol.io/
- **Špecifikácia**: https://spec.modelcontextprotocol.io/
- **Komunita**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord server
- **Súvisiace kurzy**: Pozrite README.md pre ďalšie vzdelávacie cesty Microsoftu

### Bežné riešenie problémov

**Otázka: Môj PR neprejde kontrolou prekladu**  
Odpoveď: Uistite sa, že ste upravovali iba anglické markdown súbory v koreňových adresároch modulov, nie preložené verzie.

**Otázka: Ako pridám nový jazyk?**  
Odpoveď: Podpora jazykov je riadená workflow co-op-translator. Otvorte issue pre diskusiu o pridaní nového jazyka.

**Otázka: Ukážkové kódy nefungujú**  
Odpoveď: Skontrolujte, že ste dodržali inštrukcie na nastavenie v README konkrétnej ukážky. Overte, že máte správne verzie závislostí.

**Otázka: Obrázky sa nezobrazujú**  
Odpoveď: Overte, či sú cesty k obrázkom relatívne a používajú lomky dopredu. Obrázky by mali byť v adresári `images/` alebo `translated_images/` pre lokalizované verzie.

### Výkonové úvahy

- Prekladový workflow môže trvať niekoľko minút
- Veľké obrázky by sa mali optimalizovať pred commitom
- Udržujte jednotlivé markdown súbory prehľadné a primerane veľké
- Používajte relatívne odkazy pre lepšiu prenositeľnosť

### Správa projektu

Tento projekt dodržiava Microsoft open source praktiky:  
- MIT licencia pre kód a dokumentáciu  
- Microsoft Open Source Code of Conduct  
- Vyžaduje sa CLA pre príspevky  
- Bezpečnostné problémy: riadiť sa SECURITY.md usmerneniami  
- Podpora: pozrite SUPPORT.md pre zdroje pomoci

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->