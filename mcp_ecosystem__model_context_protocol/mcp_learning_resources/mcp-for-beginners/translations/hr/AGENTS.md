# AGENTS.md

## Pregled Projekta

**MCP za početnike** je edukativni kurikulum otvorenog koda za učenje Model Context Protocola (MCP) - standardiziranog okvira za interakcije između AI modela i klijentskih aplikacija. Ovaj repozitorij pruža sveobuhvatne materijale za učenje s praktičnim primjerima koda na više programskih jezika.

### Ključne Tehnologije

- **Programski jezici**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Okviri i SDK-ovi**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Baze podataka**: PostgreSQL s pgvector ekstenzijom
- **Cloud platforme**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Alati za izgradnju**: npm, Maven, pip, Cargo
- **Dokumentacija**: Markdown s automatskim prevođenjem na više jezika (48+ jezika)

### Arhitektura

- **11 osnovnih modula (00-11)**: Sekvencijalni put učenja od osnova do naprednih tema
- **Praktične radionice**: Vježbe s kompletnim kodom rješenja na više jezika
- **Primjerni projekti**: Funkcionalni MCP server i klijentske implementacije
- **Sustav prijevoda**: Automatizirani GitHub Actions tijek za podršku više jezika
- **Slike**: Centralizirani direktorij slika s prevedenim verzijama

## Komande za Postavljanje

Ovo je repozitorij fokusiran na dokumentaciju. Većina postavljanja odvija se unutar pojedinačnih primjera i radionica.

### Postavljanje Repozitorija

```bash
# Klonirajte spremište
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Rad s Primjernim Projektima

Primjerni projekti nalaze se u:
- `03-GettingStarted/samples/` - Primjeri specifični za jezik
- `03-GettingStarted/01-first-server/solution/` - Prve implementacije servera
- `03-GettingStarted/02-client/solution/` - Implementacije klijenata
- `11-MCPServerHandsOnLabs/` - Sveobuhvatne radionice integracije baza podataka

Svaki primjerni projekt sadrži vlastite upute za postavljanje:

#### TypeScript/JavaScript Projekti
```bash
cd <project-directory>
npm install
npm start
```

#### Python Projekti
```bash
cd <project-directory>
pip install -r requirements.txt
# ili
pip install -e .
python main.py
```

#### Java Projekti
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Razvojni Radni Tok

### Struktura Dokumentacije

- **Moduli 00-11**: Osnovni sadržaj kurikuluma u sekvencijalnom redu
- **translations/**: Verzije po jezicima (auto-generirane, nemojte uređivati izravno)
- **translated_images/**: Lokalizirane verzije slika (auto-generirane)
- **images/**: Izvorne slike i dijagrami

### Izmjene u Dokumentaciji

1. Uređujte samo engleske markdown datoteke u korijenskim direktorijima modula (00-11)
2. Po potrebi ažurirajte slike u `images/` direktoriju
3. co-op-translator GitHub Action će automatski generirati prijevode
4. Prijevodi se ponovno generiraju pri pushu na glavnu granu

### Rad s Prijevodima

- **Automatski prijevod**: GitHub Actions rukuje svim prijevodima
- **NE uređujte ručno** datoteke u `translations/` direktoriju
- Metapodaci prijevoda ugrađeni su u svaku prevedenu datoteku
- Podržani jezici: 48+ jezika uključujući arapski, kineski, francuski, njemački, hindi, japanski, korejski, portugalski, ruski, španjolski i mnoge druge

## Upute za Testiranje

### Validacija Dokumentacije

Budući da je ovo prvenstveno repozitorij za dokumentaciju, testiranje se fokusira na:

1. **Validacija poveznica**: Provjerite da sve interne poveznice rade
```bash
# Provjerite postoje li pokvarene markdown poveznice
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validacija primjera koda**: Testirajte da se primjeri koda kompajliraju/izvršavaju
```bash
# Navigirajte do određenog uzorka i pokrenite njegove testove
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown linting**: Provjerite dosljednost formatiranja
```bash
# Koristite markdownlint ako je potrebno
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testiranje Primjernih Projekata

Svaki primjerni projekt za odgovarajući jezik sadrži vlastiti pristup testiranju:

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

## Smjernice za Stil Koda

### Stil Dokumentacije

- Koristite jasan jezik prilagođen početnicima
- Uključite primjere koda na više jezika gdje je primjenjivo
- Slijedite najbolje prakse markdowna:
  - Koristite ATX zaglavlja (`#` sintaksa)
  - Koristite ograničene blokove koda s oznakama jezika
  - Dodajte opisni alt tekst za slike
  - Držite duljinu linija razumnom (bez stroge granice, ali razumno)

### Stil Primjera Koda

#### TypeScript/JavaScript
- Koristite ES module (`import`/`export`)
- Slijedite TypeScript strogi način rada
- Uključite anotacije tipova
- Ciljajte ES2022

#### Python
- Slijedite PEP 8 smjernice za stil
- Koristite tipne naznake gdje je prikladno
- Uključite docstringove za funkcije i klase
- Koristite moderne Python značajke (3.8+)

#### Java
- Slijedite Spring Boot konvencije
- Koristite Java 21 značajke
- Slijedite standardnu Maven strukturu projekta
- Uključite Javadoc komentare

### Organizacija Datoteka

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

## Izgradnja i Implementacija

### Implementacija Dokumentacije

Repozitorij koristi GitHub Pages ili slično za hosting dokumentacije (ako je primjenjivo). Promjene na glavnoj grani pokreću:

1. Tijek prijevoda (`.github/workflows/co-op-translator.yml`)
2. Automatski prijevod svih engleskih markdown datoteka
3. Lokalizaciju slika po potrebi

### Nije Potreban Proces Izgradnje

Ovaj repozitorij prvenstveno sadrži markdown dokumentaciju. Za osnovni sadržaj kurikuluma nije potreban korak kompajliranja ili izgradnje.

### Implementacija Primjernih Projekata

Pojedinačni primjerni projekti mogu imati upute za implementaciju:
- Pogledajte `03-GettingStarted/09-deployment/` za upute o implementaciji MCP servera
- Primjeri implementacije Azure Container Apps u `11-MCPServerHandsOnLabs/`

## Smjernice za Doprinos

### Proces Pull Requesta

1. **Fork i kloniranje**: Forkajte repozitorij i lokalno klonirajte svoj fork
2. **Kreirajte granu**: Koristite opisne nazive grana (npr. `fix/typo-module-3`, `add/python-example`)
3. **Napravite izmjene**: Uređujte samo engleske markdown datoteke (ne prijevode)
4. **Testirajte lokalno**: Provjerite da se markdown ispravno prikazuje
5. **Pošaljite PR**: Koristite jasne naslove i opise PR-a
6. **CLA**: Potpišite Microsoft Contributor License Agreement kad se zatraži

### Format Naslova PR-a

Koristite jasne, opisne naslove:
- `[Module XX] Kratak opis` za promjene specifične za modul
- `[Samples] Opis` za izmjene primjera koda
- `[Docs] Opis` za opća ažuriranja dokumentacije

### Što Doprinijeti

- Ispravke grešaka u dokumentaciji ili primjerima koda
- Novi primjeri koda na dodatnim jezicima
- Pojašnjenja i poboljšanja postojećeg sadržaja
- Novi studiji slučaja ili praktični primjeri
- Izvještaji o problemima za nejasan ili netočan sadržaj

### Što NE Raditi

- Nemojte direktno uređivati datoteke u `translations/` direktoriju
- Nemojte uređivati `translated_images/` direktorij
- Nemojte dodavati velike binarne datoteke bez prethodne rasprave
- Nemojte mijenjati datoteke tijeka prijevoda bez koordinacije

## Dodatne Napomene

### Održavanje Repozitorija

- **Dnevnik promjena**: Sve značajne promjene dokumentirane u `changelog.md`
- **Vodič kroz učenje**: Koristite `study_guide.md` za pregled navigacije kurikulumom
- **Predlošci za probleme**: Koristite GitHub predloške za prijave grešaka i zahtjeve za značajke
- **Kodeks ponašanja**: Svi suradnici moraju slijediti Microsoft Open Source Kodeks Ponašanja

### Put Učenja

Slijedite module u sekvencijalnom redoslijedu (00-11) za optimalno učenje:
1. **00-02**: Osnove (Uvod, osnovni koncepti, sigurnost)
2. **03**: Početak s praktičnom implementacijom
3. **04-05**: Praktična implementacija i napredne teme
4. **06-10**: Zajednica, najbolje prakse i stvarne primjene
5. **11**: Sveobuhvatne radionice integracije baza podataka (13 uzastopnih radionica)

### Resursi za Podršku

- **Dokumentacija**: https://modelcontextprotocol.io/
- **Specifikacija**: https://spec.modelcontextprotocol.io/
- **Zajednica**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord server
- **Povezani tečajevi**: Pogledajte README.md za ostale Microsoft staze učenja

### Uobičajeni Problemi i Rješenja

**P: Moj PR ne prolazi provjeru prijevoda**  
O: Provjerite jeste li uređivali samo engleske markdown datoteke u korijenskim direktorijima modula, a ne prevedene verzije.

**P: Kako dodati novi jezik?**  
O: Podrška jezicima upravlja se kroz co-op-translator tijek rada. Otvorite issue za razgovor o dodavanju novih jezika.

**P: Primjeri koda ne rade**  
O: Provjerite jeste li slijedili upute za postavljanje u README-u specifičnog primjera. Provjerite imate li ispravne verzije ovisnosti.

**P: Slike se ne prikazuju**  
O: Provjerite da su putanje do slika relativne i koriste kosu crtu. Slike trebaju biti u `images/` direktoriju ili u `translated_images/` za lokalizirane verzije.

### Razmatranja Performansi

- Tijek prijevoda može trajati nekoliko minuta
- Velike slike treba optimizirati prije commita
- Držite pojedinačne markdown datoteke fokusiranima i razumnog opsega
- Koristite relativne poveznice za bolju prenosivost

### Upravljanje Projektom

Ovaj projekt slijedi Microsoft prakse otvorenog koda:
- MIT licenca za kod i dokumentaciju
- Microsoft Open Source Kodeks ponašanja
- Naznačena CLA za doprinos
- Sigurnosna pitanja: slijedite upute u SECURITY.md
- Podrška: pogledajte SUPPORT.md za izvore pomoći

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->