# AGENTS.md

## Přehled projektu

**MCP pro začátečníky** je open-source vzdělávací kurz pro výuku Model Context Protocol (MCP) - standardizovaný rámec pro interakce mezi AI modely a klientskými aplikacemi. Tento repozitář poskytuje komplexní výukové materiály s praktickými ukázkami kódu ve více programovacích jazycích.

### Klíčové technologie

- **Programovací jazyky**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworky a SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Databáze**: PostgreSQL s rozšířením pgvector
- **Cloudové platformy**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Nástroje pro sestavení**: npm, Maven, pip, Cargo
- **Dokumentace**: Markdown s automatizovaným překladem do více jazyků (48+ jazyků)

### Architektura

- **11 klíčových modulů (00-11)**: Postupná cesta učením od základů po pokročilá témata
- **Praktické laboratoře**: Praktická cvičení s kompletním řešením v několika jazycích
- **Ukázkové projekty**: Funkční implementace MCP serveru a klienta
- **Překladový systém**: Automatizovaný GitHub Actions workflow pro podporu více jazyků
- **Obrazové zdroje**: Centralizovaný adresář s obrázky s překlady

## Příkazy pro nastavení

Toto je repozitář zaměřený na dokumentaci. Většina nastavení probíhá v jednotlivých ukázkových projektech a laboratořích.

### Nastavení repozitáře

```bash
# Naklonujte repozitář
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Práce s ukázkovými projekty

Ukázkové projekty jsou umístěny v:
- `03-GettingStarted/samples/` - Příkladové kódy pro jednotlivé jazyky
- `03-GettingStarted/01-first-server/solution/` - První implementace serveru
- `03-GettingStarted/02-client/solution/` - Implementace klienta
- `11-MCPServerHandsOnLabs/` - Rozsáhlé laboratoře s integrací databáze

Každý ukázkový projekt obsahuje vlastní instrukce pro nastavení:

#### Projekty v TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Projekty v Pythonu
```bash
cd <project-directory>
pip install -r requirements.txt
# nebo
pip install -e .
python main.py
```

#### Projekty v Javě
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Vývojový proces

### Struktura dokumentace

- **Moduly 00-11**: Hlavní obsah kurzu v postupném pořadí
- **translations/**: Verze pro jednotlivé jazyky (automaticky generované, neupravovat ručně)
- **translated_images/**: Lokalizované verze obrázků (automaticky generované)
- **images/**: Zdrojové obrázky a diagramy

### Provádění změn v dokumentaci

1. Upravujte pouze anglické markdown soubory v hlavních složkách modulů (00-11)
2. V případě potřeby aktualizujte obrázky v adresáři `images/`
3. GitHub Action co-op-translator automaticky vygeneruje překlady
4. Překlady jsou automaticky znovu generovány při pushi do hlavní větve

### Práce s překlady

- **Automatizovaný překlad**: Workflow GitHub Actions spravuje všechny překlady
- **NEUpravovat ručně** soubory v adresáři `translations/`
- Metadata o překladu jsou vložena v každém přeloženém souboru
- Podporované jazyky: 48+ jazyků včetně arabštiny, čínštiny, francouzštiny, němčiny, hindštiny, japonštiny, korejštiny, portugalštiny, ruštiny, španělštiny a dalších

## Instrukce pro testování

### Validace dokumentace

Jelikož se jedná především o repozitář dokumentace, testování zahrnuje:

1. **Kontrola odkazů**: Zajistit funkčnost všech interních odkazů
```bash
# Zkontrolujte nefunkční markdown odkazy
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validace ukázek kódu**: Otestovat, že ukázky kódu kompilují a běží
```bash
# Přejděte k určitému vzorku a spusťte jeho testy
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Lintování markdownu**: Kontrola konzistence formátování
```bash
# Použijte markdownlint, pokud je to potřeba
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testování ukázkových projektů

Každý jazykový vzorový projekt obsahuje vlastní testovací postup:

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

## Pravidla stylu kódu

### Styl dokumentace

- Používejte jasný, přívětivý jazyk pro začátečníky
- Zahrnujte ukázky kódu ve více jazycích, kde je to vhodné
- Dodržujte osvědčené postupy markdownu:
  - Používejte ATX hlavičky (`#` syntax)
  - Používejte ohraničené bloky kódu s označením jazyka
  - Přidávejte popisný alt text k obrázkům
  - Udržujte rozumnou délku řádků (žádné tvrdé limity, ale rozumně)

### Styl ukázek kódu

#### TypeScript/JavaScript
- Používejte ES moduly (`import`/`export`)
- Dodržujte režim přísného TypeScriptu
- Používejte typové anotace
- Cílová verze ES2022

#### Python
- Dodržujte stylové doporučení PEP 8
- Používejte typové hinty, kde vhodné
- Přidávejte docstringy pro funkce a třídy
- Používejte moderní funkce Pythonu (3.8+)

#### Java
- Dodržujte konvence Spring Boot
- Používejte vlastnosti Javy 21
- Dodržujte standardní strukturu Maven projektu
- Přidávejte komentáře Javadoc

### Organizace souborů

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

## Sestavení a nasazení

### Nasazení dokumentace

Repozitář používá GitHub Pages nebo podobné pro hostování dokumentace (pokud je to relevantní). Změny v hlavní větvi spouštějí:

1. Workflow překladu (`.github/workflows/co-op-translator.yml`)
2. Automatický překlad všech anglických markdown souborů
3. Lokalizaci obrázků dle potřeby

### Není potřeba sestavení

Repozitář obsahuje především markdownové dokumenty. Pro hlavní obsah kurzu není nutný žádný krok sestavení nebo kompilace.

### Nasazení ukázkových projektů

Jednotlivé ukázkové projekty mohou mít vlastní instrukce pro nasazení:
- Viz `03-GettingStarted/09-deployment/` pro nasazení MCP serveru
- Příklady nasazení Azure Container Apps v `11-MCPServerHandsOnLabs/`

## Pravidla přispívání

### Proces Pull Requestů

1. **Rozvětvit a klonovat**: Vytvořte fork repozitáře a klonujte ho lokálně
2. **Vytvořit větev**: Používejte popisné názvy větví (např. `fix/typo-module-3`, `add/python-example`)
3. **Provést změny**: Upravujte pouze anglické markdown soubory (ne překlady)
4. **Otestovat lokálně**: Ověřte správné vykreslení markdownu
5. **Odeslat PR**: Používejte jasné názvy a popisy PR
6. **CLA**: Podepište Microsoft Contributor License Agreement, až budete vyzváni

### Formát názvu PR

Používejte jasné a popisné názvy:
- `[Module XX] Stručný popis` pro změny v konkrétním modulu
- `[Samples] Popis` pro změny v ukázkovém kódu
- `[Docs] Popis` pro obecné aktualizace dokumentace

### Co přispívat

- Opravy chyb v dokumentaci nebo ukázkách kódu
- Nové ukázky kódu v dalších jazycích
- Upřesnění a vylepšení stávajícího obsahu
- Nové případové studie nebo praktické příklady
- Hlásení problémů s nejasným nebo nesprávným obsahem

### Co nedělat

- Neupravovat přímo soubory v adresáři `translations/`
- Neupravovat adresář `translated_images/`
- Nepřidávat velké binární soubory bez domluvy
- Neměnit workflow soubory pro překlad bez koordinace

## Další poznámky

### Údržba repozitáře

- **Změnový log**: Všechny významné změny jsou dokumentovány v `changelog.md`
- **Studijní průvodce**: Použijte `study_guide.md` pro přehled orientace v kurzu
- **Šablony issue**: Používejte GitHub issue šablony pro hlášení chyb a požadavky na funkce
- **Kodex chování**: Všichni přispěvatelé musí dodržovat Microsoft Open Source Code of Conduct

### Cesta učením

Postupujte moduly v pořadí (00-11) pro optimální učení:
1. **00-02**: Základy (Úvod, klíčové koncepty, bezpečnost)
2. **03**: Začínáme s praktickou implementací
3. **04-05**: Praktická implementace a pokročilá témata
4. **06-10**: Komunita, osvědčené postupy a reálné aplikace
5. **11**: Komplexní laboratoře s databázovou integrací (13 po sobě jdoucích laboratoří)

### Zdroje podpory

- **Dokumentace**: https://modelcontextprotocol.io/
- **Specifikace**: https://spec.modelcontextprotocol.io/
- **Komunita**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord server
- **Související kurzy**: Viz README.md pro další Microsoft learning paths

### Běžné potíže a řešení

**Q: Můj PR neprojde kontrolou překladu**  
A: Ujistěte se, že jste upravovali pouze anglické markdown soubory v hlavních složkách modulů, nikoli přeložené verze.

**Q: Jak přidat nový jazyk?**  
A: Podpora jazyků je řízena workflow co-op-translator. Otevřete issue pro diskuzi o přidání nového jazyka.

**Q: Ukázky kódu nefungují**  
A: Zkontrolujte, zda jste postupovali podle instalačních instrukcí v README konkrétní ukázky. Zajistěte správné verze závislostí.

**Q: Obrázky se nezobrazují**  
A: Ověřte, že cesty k obrázkům jsou relativní a používají lomítka dopředu. Obrázky by měly být v adresáři `images/` nebo `translated_images/` pro lokalizované verze.

### Výkonnostní úvahy

- Workflow překladu může trvat několik minut
- Velké obrázky optimalizujte před commitem
- Udržujte jednotlivé markdown soubory přehledné a rozumně velké
- Používejte relativní odkazy pro lepší přenositelnost

### Správa projektu

Tento projekt dodržuje otevřené postupy Microsoftu:  
- MIT licence pro kód a dokumentaci  
- Microsoft Open Source Code of Conduct  
- Pro příspěvky vyžadována CLA  
- Bezpečnostní záležitosti: Řiďte se pokyny v SECURITY.md  
- Podpora: Viz SUPPORT.md pro zdroje pomoci

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->