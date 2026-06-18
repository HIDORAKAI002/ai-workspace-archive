# AGENTS.md

## Pregled projekta

**MCP za začetnike** je odprtokurni izobraževalni učni načrt za učenje Model Context Protocol (MCP) - standardiziranega okvira za interakcije med AI modeli in odjemalskimi aplikacijami. Ta repozitorij zagotavlja obsežne učne materiale z praktičnimi primeri kode v več programskih jezikih.

### Ključne tehnologije

- **Programski jeziki**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Okviri in SDK-ji**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Baze podatkov**: PostgreSQL z razširitvijo pgvector
- **Oblačne platforme**: Azure (Container Apps, OpenAI, Vsebinski varnostni mehanizmi, Application Insights)
- **Orodja za zgradbo**: npm, Maven, pip, Cargo
- **Dokumentacija**: Markdown z avtomatiziranim večjezičnim prevajanjem (več kot 48 jezikov)

### Arhitektura

- **11 osnovnih modulov (00-11)**: Zaporedna učna pot od osnov do naprednih tem
- **Praktične vaje**: Praktične naloge s celotno rešitveno kodo v več jezikih
- **Primeri projektov**: Delujoče implementacije MCP strežnika in odjemalca
- **Sistem za prevajanje**: Avtomatiziran GitHub Actions delovni tok za podporo več jezikom
- **Slike**: Centraliziran imenik slik z prevedenimi različicami

## Ukazi za nastavitev

To je repozitorij osredotočen na dokumentacijo. Večina nastavitev poteka znotraj posameznih vzorčnih projektov in vaj.

### Nastavitev repozitorija

```bash
# Klonirajte repozitorij
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Delo z vzorčnimi projekti

Vzorčni projekti se nahajajo v:
- `03-GettingStarted/samples/` - primeri po jezikih
- `03-GettingStarted/01-first-server/solution/` - prve implementacije strežnika
- `03-GettingStarted/02-client/solution/` - implementacije odjemalca
- `11-MCPServerHandsOnLabs/` - obsežne vaje za integracijo z bazo podatkov

Vsak vzorčni projekt ima svoje navodila za nastavitev:

#### Projekti v TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Projekti v Pythonu
```bash
cd <project-directory>
pip install -r requirements.txt
# ali
pip install -e .
python main.py
```

#### Projekti v Javi
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Razvojni delovni tok

### Struktura dokumentacije

- **Moduli 00-11**: Vsebina osnovnega učnega načrta v zaporednem vrstnem redu
- **translations/**: Jezikovno specifične različice (avtomatsko generirane, ne urejajte neposredno)
- **translated_images/**: Lokalizirane različice slik (avtomatsko generirane)
- **images/**: Izvorne slike in diagrami

### Spreminjanje dokumentacije

1. Urejajte samo angleške markdown datoteke v korenskih imenikih modulov (00-11)
2. Po potrebi posodobite slike v imeniku `images/`
3. GitHub Action co-op-translator bo samodejno ustvaril prevode
4. Prevodi se znova generirajo ob potisku na glavno vejo

### Delo s prevodi

- **Avtomatizirano prevajanje**: Delovni tok GitHub Actions upravlja vse prevode
- **Ne urejajte ročno** datotek v imeniku `translations/`
- Metapodatki o prevodu so vgrajeni v vsako prevedeno datoteko
- Podprti jeziki: več kot 48, vključno z arabščino, kitajščino, francoščino, nemščino, hindijščino, japonščino, korejščino, portugalščino, ruščino, španščino in mnogimi drugimi

## Navodila za testiranje

### Validacija dokumentacije

Ker je to predvsem repozitorij za dokumentacijo, se testiranje osredotoča na:

1. **Preverjanje povezav**: Preverite, da vse notranje povezave delujejo
```bash
# Preverite za pokvarjene markdown povezave
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validacija primerov kode**: Preverite, da se primeri kode sestavijo/izvedejo
```bash
# Pomaknite se do določenega vzorca in zaženite njegove teste
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Preverjanje markdown standardov**: Pregled skladnosti oblikovanja
```bash
# Po potrebi uporabite markdownlint
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Testiranje vzorčnih projektov

Vsak vzorčni projekt po jeziku ima svoj pristop k testiranju:

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

## Smernice za slog kode

### Slog dokumentacije

- Uporabljajte jasen jezik, primeren za začetnike
- Vključite primere kode v več jezikih, kjer je to mogoče
- Upoštevajte najboljše prakse za markdown:
  - Naslovi v ATX stilu (`#` sintaksa)
  - Bloki kode z določitvijo jezika
  - Vključite opisno alt besedilo za slike
  - Ohranite razumne dolžine vrstic (brez stroge omejitve, vendar smiselno)

### Slog primerov kode

#### TypeScript/JavaScript
- Uporabljajte ES module (`import`/`export`)
- Upoštevajte strogi način TypeScript-a
- Vključite tipizacije
- Ciljajte na ES2022

#### Python
- Upoštevajte PEP 8 slogovne smernice
- Uporabljajte tipne namige, kjer je ustrezno
- Vključite docstringe za funkcije in razrede
- Uporabljajte sodobne Python funkcionalnosti (3.8+)

#### Java
- Upoštevajte smernice Spring Boot-a
- Uporabljajte funkcije Jave 21
- Upoštevajte standardno strukturo Maven projektov
- Vključite Javadoc komentarje

### Organizacija datotek

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

## Zgradba in uvajanje

### Uvajanje dokumentacije

Repozitorij uporablja GitHub Pages ali podobno za gostovanje dokumentacije (če je primerno). Spremembe na glavni veji sprožijo:

1. Delovni tok prevajanja (`.github/workflows/co-op-translator.yml`)
2. Avtomatsko prevajanje vseh angleških markdown datotek
3. Lokalizacijo slik po potrebi

### Ni potrebno sestavljanje

Ta repozitorij vsebuje predvsem markdown dokumentacijo. Za osnovno vsebino učnega načrta ni potreben postopek prevajanja ali sestavljanja.

### Uvajanje vzorčnih projektov

Posamezni vzorčni projekti imajo lahko lastna navodila za uvajanje:
- Oglejte si `03-GettingStarted/09-deployment/` za navodila uvajanja MCP strežnika
- Primeri uvajanja Azure Container Apps v `11-MCPServerHandsOnLabs/`

## Smernice za prispevanje

### Postopek za pull request

1. **Forkajte in klonirajte**: Forkajte repozitorij in klonirajte svoj fork lokalno
2. **Ustvarite vejo**: Uporabljajte opisna imena vej (npr. `fix/typo-module-3`, `add/python-example`)
3. **Naredite spremembe**: Urejajte samo angleške markdown datoteke (ne prevodov)
4. **Testirajte lokalno**: Preverite pravilno prikazovanje markdowna
5. **Oddajte PR**: Uporabljajte jasne naslove in opise PR-jev
6. **CLA**: Podpišite Microsoft Contributor License Agreement, ko boste pozvani

### Oblika naslova PR

Uporabljajte jasne, opisne naslove:
- `[Module XX] Kratek opis` za spremembe glede modulov
- `[Samples] Opis` za spremembe primerov kode
- `[Docs] Opis` za splošne posodobitve dokumentacije

### Kaj prispevati

- Popravke hroščev v dokumentaciji ali primerih kode
- Nove primere kode v dodatnih jezikih
- Poenostavitve in izboljšave obstoječe vsebine
- Nove primere primerov uporabe ali praktične vaje
- Poročila o težavah za nejasno ali napačno vsebino

### Česa NE storiti

- Ne urejajte datotek neposredno v imeniku `translations/`
- Ne urejajte imenika `translated_images/`
- Ne dodajajte velikih binarnih datotek brez dogovora
- Ne spreminjajte datotek delovnega toka prevajanja brez usklajevanja

## Dodatne opombe

### Vzdrževanje repozitorija

- **Changelog**: Vse pomembne spremembe so dokumentirane v `changelog.md`
- **Vodnik za učenje**: Uporabite `study_guide.md` za pregled navigacije učnega načrta
- **Predloge za težave**: Uporabljajte GitHub predloge za poročanje hroščev in predlogov
- **Kodeks ravnanja**: Vsi prispevki morajo slediti Microsoft Opensource Code of Conduct

### Učna pot

Sledite modulom v zaporedju (00-11) za optimalno učenje:
1. **00-02**: Osnove (Uvod, osnovni koncepti, varnost)
2. **03**: Začetek dela s praktično izvedbo
3. **04-05**: Praktična izvedba in napredne teme
4. **06-10**: Skupnost, najboljše prakse in resnične aplikacije
5. **11**: Obsežne vaje za integracijo z bazo podatkov (13 zaporednih vaj)

### Podporni viri

- **Dokumentacija**: https://modelcontextprotocol.io/
- **Specifikacija**: https://spec.modelcontextprotocol.io/
- **Skupnost**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord strežnik
- **Sorodni tečaji**: Glejte README.md za druge Microsoft učne poti

### Pogoste težave in rešitve

**V: Moj PR ne uspe na preverjanju prevoda**  
O: Preverite, da ste uredili samo angleške markdown datoteke v korenskih imenikih modulov, ne prevedenih.

**V: Kako dodam nov jezik?**  
O: Podporo jezikom upravlja delovni tok co-op-translator. Odprite zadevo za razpravo o dodajanju novih jezikov.

**V: Primeri kode ne delujejo**  
O: Preverite, da ste sledili navodilom za nastavitev v README vzorčnega projekta. Preverite pravilne različice odvisnosti.

**V: Slike se ne prikazujejo**  
O: Preverite, da so poti do slik relativne in uporabljajo naprej nagnjene poševnice. Slike morajo biti v imeniku `images/` ali `translated_images/` za lokalizirane različice.

### Premisleki glede zmogljivosti

- Delovni tok prevajanja lahko traja nekaj minut
- Velike slike naj bodo optimizirane pred potrditvijo
- Posamezne markdown datoteke naj bodo osredotočene in primernih velikosti
- Uporabljajte relativne povezave za boljšo prenosljivost

### Upravljanje projekta

Ta projekt sledi Microsoft odprtokodnim praksam:  
- Licenca MIT za kodo in dokumentacijo  
- Microsoft Open Source Code of Conduct  
- Za prispevke je potreben CLA  
- Varnostne težave: sledite smernicam SECURITY.md  
- Podpora: glejte SUPPORT.md za vire pomoči

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->