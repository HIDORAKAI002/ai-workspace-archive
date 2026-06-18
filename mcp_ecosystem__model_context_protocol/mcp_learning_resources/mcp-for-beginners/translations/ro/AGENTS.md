# AGENTS.md

## Prezentare Generală a Proiectului

**MCP pentru Începători** este un curriculum educațional open-source pentru învățarea Model Context Protocol (MCP) - un cadru standardizat pentru interacțiuni între modele AI și aplicații client. Acest depozit oferă materiale de învățare cuprinzătoare cu exemple practice de cod în mai multe limbaje de programare.

### Tehnologii Cheie

- **Limbaje de Programare**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Framework-uri & SDK-uri**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Baze de Date**: PostgreSQL cu extensia pgvector
- **Platforme Cloud**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Unelte de Build**: npm, Maven, pip, Cargo
- **Documentație**: Markdown cu traducere automată multi-limbaj (peste 48 de limbi)

### Arhitectură

- **11 Module de Bază (00-11)**: Parcurs de învățare secvențială de la concepte fundamentale la subiecte avansate
- **Lab-uri Practice**: Exerciții practice cu soluții complete în mai multe limbaje
- **Proiecte Exemplu**: Implementări funcționale ale serverului și clientului MCP
- **Sistem de Traducere**: Flux de lucru automatizat cu GitHub Actions pentru suport multi-limbaj
- **Resurse Grafice**: Director centralizat de imagini cu versiuni traduse

## Comenzi de Configurare

Acesta este un depozit axat pe documentație. Majoritatea configurărilor au loc în proiectele exemplu și laboratoare individuale.

### Configurarea Depozitului

```bash
# Clonează depozitul
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Lucrul cu Proiectele Exemplu

Proiectele exemplu se găsesc în:
- `03-GettingStarted/samples/` - Exemple specifice limbajului
- `03-GettingStarted/01-first-server/solution/` - Implementări ale primului server
- `03-GettingStarted/02-client/solution/` - Implementări ale clientului
- `11-MCPServerHandsOnLabs/` - Laboratoare complete de integrare cu baza de date

Fiecare proiect exemplu conține instrucțiuni proprii de configurare:

#### Proiecte TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Proiecte Python
```bash
cd <project-directory>
pip install -r requirements.txt
# sau
pip install -e .
python main.py
```

#### Proiecte Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Flux de Lucru pentru Dezvoltare

### Structura Documentației

- **Modulele 00-11**: Conținutul curriculum-ului de bază în ordine secvențială
- **translations/**: Versiuni specifice limbajelor (generate automat, nu editați direct)
- **translated_images/**: Versiuni localizate ale imaginilor (generate automat)
- **images/**: Imagini și diagrame sursă

### Modificarea Documentației

1. Editați doar fișierele markdown în limba engleză din directoarele modulului rădăcină (00-11)
2. Actualizați imaginile din directorul `images/` dacă este necesar
3. Acțiunea co-op-translator de pe GitHub generează automat traducerile
4. Traducerile sunt regenerate la fiecare push în ramura main

### Lucrul cu Traducerile

- **Traducere Automată**: Fluxul de lucru GitHub Actions gestionează toate traducerile
- **NU editați manual** fișierele din directorul `translations/`
- Metadatele traducerii sunt încorporate în fiecare fișier tradus
- Limbi suportate: peste 48 de limbi, inclusiv arabă, chineză, franceză, germană, hindi, japoneză, coreeană, portugheză, rusă, spaniolă și multe altele

## Instrucțiuni de Testare

### Validarea Documentației

Deoarece acesta este în principal un depozit de documentație, testarea se concentrează pe:

1. **Validarea Link-urilor**: Asigurați-vă că toate link-urile interne funcționează
```bash
# Verifică dacă există linkuri markdown rupte
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validarea Exemplelor de Cod**: Testați dacă exemplele de cod compilează/rulează
```bash
# Navighează către un eșantion specific și rulează testele acestuia
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Linting Markdown**: Verificați consistența formatării
```bash
# Folosește markdownlint dacă este necesar
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testarea Proiectelor Exemplu

Fiecare exemplu specific limbajului are propria metodă de testare:

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

## Ghid de Stil pentru Cod

### Stil Documentație

- Folosiți un limbaj clar, prietenos pentru începători
- Includeți exemple de cod în mai multe limbaje unde este cazul
- Urmați bune practici markdown:
  - Folosiți antete stil ATX (`#` sintaxă)
  - Folosiți blocuri de cod delimitate cu specificatori de limbaj
  - Includeți text alternativ descriptiv pentru imagini
  - Mențineți o lungime rezonabilă a liniilor (fără limite stricte, dar fiți rezonabili)

### Stil Exemplu de Cod

#### TypeScript/JavaScript
- Folosiți module ES (`import`/`export`)
- Urmați convențiile modului strict TypeScript
- Includeți adnotări de tip
- Țintiți ES2022

#### Python
- Urmați ghidul de stil PEP 8
- Folosiți tipuri sugestive acolo unde este cazul
- Includeți docstring-uri pentru funcții și clase
- Folosiți caracteristici moderne Python (3.8+)

#### Java
- Urmați convențiile Spring Boot
- Folosiți facilitățile Java 21
- Urmați structura standard Maven pentru proiecte
- Includeți comentarii Javadoc

### Organizarea Fișierelor

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

## Build și Implementare

### Implementarea Documentației

Depozitul folosește GitHub Pages sau un serviciu similar pentru găzduirea documentației (dacă este cazul). Modificările în ramura main declanșează:

1. Fluxul de traducere (`.github/workflows/co-op-translator.yml`)
2. Traducerea automată a tuturor fișierelor markdown în limba engleză
3. Localizarea imaginilor după necesitate

### Nu este Necesară o Procedură de Build

Acest depozit conține în principal documentație markdown. Nu este nevoie de compilare sau build pentru conținutul principal al curriculumului.

### Implementarea Proiectelor Exemplu

Proiectele exemplu individuale pot avea instrucțiuni de implementare:
- Consultați `03-GettingStarted/09-deployment/` pentru ghid de implementare server MCP
- Exemple Azure Container Apps în `11-MCPServerHandsOnLabs/`

## Ghid de Contribuire

### Procesul Pull Request

1. **Fork și Clone**: Faceți fork la depozit și clonați fork-ul local
2. **Creați o Ramură**: Folosiți nume descriptive pentru ramuri (ex. `fix/typo-module-3`, `add/python-example`)
3. **Faceți Modificări**: Editați doar fișierele markdown în limba engleză (nu traducerile)
4. **Testați Local**: Verificați redarea corectă a markdown-ului
5. **Trimiteți PR**: Folosiți titluri și descrieri clare pentru PR
6. **CLA**: Semnați Acordul de Licență pentru Contribuitori Microsoft când vi se solicită

### Formatul Titlului PR

Folosiți titluri clare și descriptive:
- `[Module XX] Descriere scurtă` pentru modificări specifice modulului
- `[Samples] Descriere` pentru modificări în codul exemplu
- `[Docs] Descriere` pentru actualizări generale de documentație

### Ce să Contribuiți

- Corecții de erori în documentație sau exemple de cod
- Exemple noi de cod în limbaje suplimentare
- Clarificări și îmbunătățiri ale conținutului existent
- Studii de caz noi sau exemple practice
- Raportări de probleme pentru conținut neclar sau incorect

### Ce NU Să Faceți

- Nu editați direct fișierele din directorul `translations/`
- Nu editați directorul `translated_images/`
- Nu adăugați fișiere binare mari fără discuție prealabilă
- Nu modificați fișierele fluxului de traducere fără coordonare

## Note Suplimentare

### Mentenanța Depozitului

- **Jurnal de Modificări**: Toate modificările semnificative sunt documentate în `changelog.md`
- **Ghid de Studiu**: Folosiți `study_guide.md` pentru orientare în curriculum
- **Template-uri pentru Issue**: Folosiți template-uri GitHub pentru rapoarte de erori și cereri de funcționalități
- **Cod de Conduită**: Toți contribuitorii trebuie să respecte Codul de Conduită Open Source Microsoft

### Calea de Învățare

Parcurgeți modulele în ordine secvențială (00-11) pentru o învățare optimă:
1. **00-02**: Fundamente (Introducere, Concepte de bază, Securitate)
2. **03**: Primii pași cu implementare practică
3. **04-05**: Implementare practică și subiecte avansate
4. **06-10**: Comunitate, bune practici și aplicații reale
5. **11**: Laboratoare comprehensive de integrare cu baza de date (13 laboratoare secvențiale)

### Resurse de Suport

- **Documentație**: https://modelcontextprotocol.io/
- **Specificație**: https://spec.modelcontextprotocol.io/
- **Comunitate**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Serverul Microsoft Foundry Discord
- **Cursuri Asociate**: Consultați README.md pentru alte căi de învățare Microsoft

### Probleme Comune și Soluții

**Î: PR-ul meu eșuează la verificarea traducerii**  
R: Asigurați-vă că ați editat numai fișierele markdown în engleză din directoarele modulului rădăcină, nu versiunile traduse.

**Î: Cum adaug o limbă nouă?**  
R: Suportul pentru limbi este gestionat prin fluxul de lucru co-op-translator. Deschideți un issue pentru a discuta adăugarea de limbi noi.

**Î: Exemplele de cod nu funcționează**  
R: Asigurați-vă că ați urmat instrucțiunile de configurare din README-ul exemplului specific. Verificați dacă aveți versiunile corecte ale dependențelor instalate.

**Î: Imaginile nu se afișează**  
R: Verificați că căile către imagini sunt relative și folosesc slash-uri înainte (forward slashes). Imaginile ar trebui să fie în directorul `images/` sau în `translated_images/` pentru versiunile localizate.

### Considerații de Performanță

- Fluxul de traducere poate dura câteva minute să se finalizeze
- Imaginile mari trebuie optimizate înainte de a fi comise
- Mențineți fișierele markdown individuale concentrate și de dimensiune rezonabilă
- Folosiți link-uri relative pentru o portabilitate mai bună

### Guvernanța Proiectului

Acest proiect urmează practicile open source Microsoft:  
- Licență MIT pentru cod și documentație  
- Codul de Conduită Open Source Microsoft  
- CLA obligatoriu pentru contribuții  
- Probleme de securitate: urmați indicațiile din SECURITY.md  
- Suport: consultați SUPPORT.md pentru resurse de ajutor

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->