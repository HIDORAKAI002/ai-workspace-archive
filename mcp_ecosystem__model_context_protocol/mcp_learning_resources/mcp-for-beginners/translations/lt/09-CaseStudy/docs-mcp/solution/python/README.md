# Mokymosi plano generatorius su Chainlit ir Microsoft Learn Docs MCP

## Reikalavimai

- Python 3.8 arba naujesnė versija
- pip (Python paketų tvarkytuvė)
- Interneto prieiga jungimuisi prie Microsoft Learn Docs MCP serverio

## Diegimas

1. Nuklonuokite šį saugyklą arba atsisiųskite projekto failus.
2. Įdiekite reikiamas priklausomybes:

   ```bash
   pip install -r requirements.txt
   ```

## Naudojimas

### Scena 1: Paprastas užklausimas į Docs MCP
Komandinės eilutės klientas, jungiantis prie Docs MCP serverio, siunčiantis užklausą ir atspausdinantis rezultatą.

1. Paleiskite skriptą:
   ```bash
   python scenario1.py
   ```
2. Įveskite savo dokumentacijos klausimą komandų eilutėje.

### Scena 2: Mokymosi plano generatorius (Chainlit svetainės programa)
Tinklo sąsaja (naudojant Chainlit), leidžianti vartotojams generuoti individualų, savaitė po savaitės sudarytą mokymosi planą bet kuriai techninei temai.

1. Paleiskite Chainlit programą:
   ```bash
   chainlit run scenario2.py
   ```
2. Atidarykite vietinį URL, pateiktą terminale (pvz., http://localhost:8000) savo naršyklėje.
3. Pokalbio lange įveskite savo mokymosi temą ir norimų studijuoti savaičių skaičių (pvz., „AI-900 sertifikavimas, 8 savaitės“).
4. Programa atsakys savaitė po savaitės sudarytu mokymosi planu, įskaitant nuorodas į susijusią Microsoft Learn dokumentaciją.

**Reikalingi aplinkos kintamieji:**

Norėdami naudoti 2 scenarijų (Chainlit tinklo programą su Azure OpenAI), turite nustatyti šiuos aplinkos kintamuosius `.env` faile `python` kataloge:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Užpildykite šias reikšmes savo Azure OpenAI išteklių duomenimis prieš paleidžiant programą.

> [!TIP]
> Galite lengvai diegti savo modelius naudodami [Microsoft Foundry](https://ai.azure.com/).

### Scena 3: Dokumentacijos redaktoriaus viduje su MCP serveriu VS Code

Vietoj to, kad perjungtumėte naršyklės skirtukus dokumentacijos paieškai, galite tiesiogiai įtraukti Microsoft Learn Docs į savo VS Code naudodami MCP serverį. Tai leidžia:
- Ieškoti ir skaityti dokumentaciją tiesiog VS Code, neišeinant iš kodavimo aplinkos.
- Nuorodų ir dokumentacijos įterpimas tiesiogiai į README arba kurso failus.
- Naudoti GitHub Copilot ir MCP kartu sklandžiam AI palaikomam dokumentacijų darbo procesui.

**Pavyzdinės naudojimo situacijos:**
- Greitai pridėti nuorodas į README rašant kurso ar projekto dokumentaciją.
- Naudoti Copilot kodui generuoti ir MCP greitai rasti bei cituoti susijusią dokumentaciją.
- Išlikti susikoncentravus redaktoriuje ir padidinti produktyvumą.

> [!IMPORTANT]
> Įsitikinkite, kad jūsų darbo aplinkoje yra galiojanti [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) konfigūracija (vietoje `.vscode/mcp.json`).

## Kodėl Chainlit 2 scenarijui?

Chainlit yra moderni atviro kodo sistema pokalbių tinklo programoms kurti. Ji leidžia lengvai kurti pokalbio pagrindo naudotojo sąsajas, jungiančias su tokiomis paslaugomis kaip Microsoft Learn Docs MCP serveris. Šis projektas naudoja Chainlit, kad realiu laiku suteiktų paprastą ir interaktyvų būdą generuoti personalizuotus mokymosi planus. Pasinaudodami Chainlit galite greitai kurti ir diegti pokalbių pagrindo įrankius, kurie didina produktyvumą ir mokymąsi.

## Kas tai daro

Ši programa leidžia vartotojams sukurti individualų mokymosi planą įvedant temą ir trukmę. Programa analizuoja jūsų įvestį, siunčia užklausą Microsoft Learn Docs MCP serveriui dėl susijusios medžiagos ir suorganizuoja rezultatus į struktūrizuotą, savaitė po savaitės, planą. Kiekvienos savaitės rekomendacijos rodomos pokalbyje, todėl lengva sekti ir stebėti pažangą. Integracija užtikrina, kad visada gaunate naujausius ir tinkamiausius mokymosi išteklius.

## Pavyzdinės užklausos

Išbandykite šias užklausas pokalbio lange, kad pamatytumėte, kaip programa atsako:

- `AI-900 sertifikavimas, 8 savaitės`
- `Išmokite Azure Functions, 4 savaitės`
- `Azure DevOps, 6 savaitės`
- `Duomenų inžinerija Azure, 10 savaičių`
- `Microsoft saugumo pagrindai, 5 savaitės`
- `Power Platform, 7 savaites`
- `Azure AI paslaugos, 12 savaičių`
- `Debesų architektūra, 9 savaitės`

Šie pavyzdžiai demonstruoja programos lankstumą įvairiems mokymosi tikslams ir laikotarpiams.

## Nuorodos

- [Chainlit dokumentacija](https://docs.chainlit.io/)
- [MCP dokumentacija](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->