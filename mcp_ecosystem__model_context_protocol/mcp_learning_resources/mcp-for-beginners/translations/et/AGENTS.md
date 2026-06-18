# AGENTS.md

## Projekti ülevaade

**MCP algajatele** on avatud lähtekoodiga õppekava Model Context Protocoli (MCP) õppimiseks – standardiseeritud raamistik AI mudelite ja kliendirakenduste vahelisteks suhtlusteks. See hoidla pakub terviklikke õppematerjale praktiliste koodinäidete abil mitmes programmeerimiskeeles.

### Põhitehnoloogiad

- **Programmeermiskeeled**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Raamistikud ja SDK-d**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Andmebaasid**: PostgreSQL koos pgvector laiendusega
- **Pilveplatvormid**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Build-tööriistad**: npm, Maven, pip, Cargo
- **Dokumentatsioon**: Markdown koos automatiseeritud mitmekeelse tõlkega (48+ keelt)

### Arhitektuur

- **11 põhimoodulit (00-11)**: Järjestikune õppeteek fundamentidest edasijõudnuteni
- **Praktilised laborid**: Praktikaharjutused täielike lahendustega mitmes keeles
- **Näidisprojektid**: Töötav MCP serveri ja kliendi rakendused
- **Tõlkesüsteem**: Automatiseeritud GitHub Actions töövoog mitmekeelse toe jaoks
- **Pildifailid**: Keskne kaust piltidega, millel on tõlgitud versioonid

## Seadistamise käsud

See hoidla keskendub dokumentatsioonile. Enamus seadistust toimub individuaalsetes näidisprojektides ja laborites.

### Hoidla seadistamine

```bash
# Kopeeri hoidla
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Töötamine näidisprojektidega

Näidisprojektid asuvad:
- `03-GettingStarted/samples/` - keelespetsiifilised näited
- `03-GettingStarted/01-first-server/solution/` - esimese serveri rakendused
- `03-GettingStarted/02-client/solution/` - kliendi rakendused
- `11-MCPServerHandsOnLabs/` - põhjalikud andmebaasi integreerimise laborid

Igal näidisprojektil on enda seadistusjuhised:

#### TypeScript/JavaScript projektid
```bash
cd <project-directory>
npm install
npm start
```

#### Python projektid
```bash
cd <project-directory>
pip install -r requirements.txt
# või
pip install -e .
python main.py
```

#### Java projektid
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Arendustöövoog

### Dokumentatsiooni struktuur

- **Moodulid 00-11**: Põhikursuse sisu järjestatult
- **translations/**: Keeleteemalised versioonid (automaatselt genereeritud, mitte redigeerida)
- **translated_images/**: Lokaliseeritud pildiversioonid (automaatselt genereeritud)
- **images/**: Algallikaga pildid ja skeemid

### Dokumentatsiooni muudatuste tegemine

1. Muutke ainult ingliskeelseid markdown-faile juurmoodulite kataloogides (00-11)
2. Vajadusel uuendage pilte kaustas `images/`
3. co-op-translator GitHub Action genereerib tõlked automaatselt
4. Tõlked uuendatakse iga pushi korral main harusse

### Tõlgetega töötamine

- **Automaatne tõlge**: GitHub Actions töövoog haldab kõiki tõlkeid
- **Ärge käsitsi muutke** faile kaustas `translations/`
- Tõlgetes on arhiivitud metaandmed sees
- Toetatud keeled: 48+ keelt, nagu araabia, hiina, prantsuse, saksa, hindi, jaapani, korea, portugali, vene, hispaania jt

## Testimise juhised

### Dokumentatsiooni valideerimine

Kuna tegemist on peamiselt dokumentatsiooni hoidla, keskendub testimine:

1. **Lingivalideerimine**: Kontrollige, et kõik siselingid toimivad
```bash
# Kontrolli katkiseid markdowni linke
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Koodinäidete valideerimine**: Testida, et koodinäited kompileeruvad/jooksevad
```bash
# Liigu konkreetse proovini ja käivita selle testid
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdowni stiililintimine**: Kontrolli vormingu järjepidevust
```bash
# Kasutage vajadusel markdownlinti
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Näidisprojektide testimine

Igal keelespetsiifilisel näidisel on oma testimismeetod:

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

## Koodi stiilijuhised

### Dokumentatsiooni stiil

- Kasutage selget, algajatele sobilikku keelt
- Lisage koodinäiteid mitmes keeles, kui võimalik
- Järgige markdowni parimaid tavasid:
  - Kasutage ATX stiilis päiseid (`#` süntaks)
  - Kasutage sulgudega kodeblokke koos keelesildiga
  - Lisage piltidele kirjeldav alternatiivtekst
  - Hoidke ridade pikkus mõistlik (vaikset piiri pole, aga olge mõistlikud)

### Koodinäidete stiil

#### TypeScript/JavaScript
- Kasutage ES mooduleid (`import`/`export`)
- Järgige TypeScript ranget režiimi
- Lisage tüübimärkused
- Sihtige ES2022

#### Python
- Järgige PEP 8 stiilijuhiseid
- Kasutage tüübi vihjeid vastavalt vajadusele
- Lisage funktsioonidele ja klassidele docstringid
- Kasutage kaasaegseid Pythoni funktsioone (3.8+)

#### Java
- Järgige Spring Booti juhiseid
- Kasutage Java 21 võimalusi
- Järgige tavapärast Maven projekti struktuuri
- Lisage Javadoc kommentaarid

### Failide korraldus

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

## Build ja paigaldus

### Dokumentatsiooni avaldamine

Hoidla kasutab dokumentatsiooni hostimiseks GitHub Pages või sarnast lahendust (kui rakendub). Muudatused päästavad käivitama:

1. Tõlketöövoo (`.github/workflows/co-op-translator.yml`)
2. Kõigi ingliskeelsete markdown-failide automaatse tõlke
3. Piltide lokaliseerimise vastavalt vajadusele

### Ehitusprotsess pole vajalik

See hoidla sisaldab peamiselt markdown dokumentatsiooni. Tuuma õppekava jaoks pole vajalik kompileerimis- ega build-faas.

### Näidisprojektide kasutuselevõtt

Individuaalsetel näidisprojektidel võivad olla implanteerimisjuhised:
- Vaata `03-GettingStarted/09-deployment/` MCP serveri juurutamise juhendit
- Azure Container Apps näited kaustas `11-MCPServerHandsOnLabs/`

## Panustamise juhised

### Pull Request'i protsess

1. **Fork ja klooni**: Forkige hoidla ja kloonige oma isiklik koopia lokaalselt
2. **Looge haru**: Kasutage kirjeldavaid harunimesid (nt `fix/typo-module-3`, `add/python-example`)
3. **Tee muudatusi**: Muutke ainult ingliskeelseid markdown-faile (mitte tõlkeid)
4. **Testi lokaalselt**: Kontrolli markdowni korrektset renderdamist
5. **Esita PR**: Kasuta selgeid PR pealkirju ja kirjeldusi
6. **CLA**: Kui küsitakse, allkirjasta Microsofti kaasautorite litsentsileping

### PR pealkirjade vorming

Kasuta selgeid ja kirjeldavaid tiitleid:
- `[Module XX] Lühikirjeldus` moodulispetsiifiliste muudatuste jaoks
- `[Samples] Kirjeldus` näidiskoodimuudatuste jaoks
- `[Docs] Kirjeldus` üldise dokumentatsiooni uuenduste jaoks

### Mida panustada

- Veaparandused dokumentatsioonis või koodinäidetes
- Uued koodinäited täiendavates keeltes
- Selgitused ja täiustused olemasolevatele sisudele
- Uued juhtumiuuringud või praktikad
- Probleemiaruanded ebaselge või valesti esitatud sisu kohta

### Mida MITTE teha

- Ärge redigeerige otseselt faile kaustas `translations/`
- Ärge muutke faile kaustas `translated_images/`
- Ärge lisage suuri binaarfailisid ilma eelneva aruteluta
- Ärge muutke tõlketöövoo faile ilma koordineerimiseta

## Lisamärkused

### Hoidla hooldus

- **Muudatuste logi**: Kõik olulised muudatused on dokumenteeritud failis `changelog.md`
- **Õppejuhend**: Kasutage `study_guide.md` õppekava navigeerimiseks
- **Probleemimallid**: Kasutage GitHubi issue-malle vigade ja funktsioonisoovide jaoks
- **Käitumisreeglid**: Kõik panustajad peavad järgima Microsofti avatud lähtekoodi käitumisreegleid

### Õppeteek

Järgige mooduleid järjekorras (00-11) parima õppimise jaoks:
1. **00-02**: Põhitõed (Sissejuhatus, põhikontseptsioonid, turvalisus)
2. **03**: Käed-külge esmane rakendamine
3. **04-05**: Praktiline rakendamine ja edasijõudnud teemad
4. **06-10**: Kogukond, parimad praktikad ja reaalse maailma rakendused
5. **11**: Põhjalikud andmebaaside integreerimise laborisessioonid (13 järjestikust laborit)

### Tugiteenused

- **Dokumentatsioon**: https://modelcontextprotocol.io/
- **Spetsifikatsioon**: https://spec.modelcontextprotocol.io/
- **Kogukond**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord server
- **Seotud kursused**: Vaata README.md teisi Microsofti õpiteid

### Levinumad tõrkeotsingu küsimused

**K: Minu PR ei läbi tõlke kontrolli**  
V: Veenduge, et muutsite ainult ingliskeelseid markdown-faile juurmoodulites, mitte tõlgitud versioone.

**K: Kuidas lisada uut keelt?**  
V: Keeletuge hallatakse co-op-translator töövoo kaudu. Avage teema, et arutada uute keelete lisamist.

**K: Koodinäited ei tööta**  
V: Järgige konkreetse näidise README seadistusjuhiseid. Kontrollige, et sõltuvuste versioonid on korrektsed.

**K: Pildid ei kuvata**  
V: Kontrollige, et pilditeed on suhtelised ja kasutavad kaldkriipse. Pildid peaksid asuma kaustas `images/` või `translated_images/` lokaliseeritud versioonidena.

### Jõudluse kaalutlused

- Tõlketöövoog võib võtta mitu minutit
- Suured pildid optimeerida enne commiti
- Hoidke markdown failid fookuses ja mõõduka suurusega
- Kasutage suhtelisi linke parema kaasaskantavuse jaoks

### Projekti juhtimine

See projekt järgib Microsofti avatud lähtekoodi praktikaid:  
- MIT litsents koodi ja dokumentatsiooni jaoks  
- Microsofti avatud lähtekoodi käitumisreeglid  
- CLA nõutav panustamiseks  
- Turvaprobleemid: järgige juhiseid failist SECURITY.md  
- Tugi: vaata SUPPORT.md abiressursside jaoks

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->