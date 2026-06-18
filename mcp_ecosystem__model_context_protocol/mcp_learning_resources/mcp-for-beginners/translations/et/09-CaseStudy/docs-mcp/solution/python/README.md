# Õppimisplaani generaator koos Chainlit & Microsoft Learn Docs MCP-ga

## Eeltingimused

- Python 3.8 või uuem
- pip (Python pakihaldur)
- Internetiühendus, et ühendada Microsoft Learn Docs MCP serveriga

## Paigaldus

1. Klooni see hoidla või laadi projektifailid alla.
2. Paigalda vajalikud sõltuvused:

   ```bash
   pip install -r requirements.txt
   ```

## Kasutamine

### Stsenaarium 1: Lihtne päring Docs MCP-le
Käsurea klient, mis ühendub Docs MCP serveriga, saadab päringu ja prindib tulemuse.

1. Käivita skript:
   ```bash
   python scenario1.py
   ```
2. Sisesta oma dokumentatsiooni küsimus käsureale.

### Stsenaarium 2: Õppimisplaani generaator (Chainlit veebirakendus)
Veebipõhine liides (kasutades Chainlit), mis võimaldab kasutajatel genereerida isikupärastatud, nädal-nädala haaval õppimisplaani mis tahes tehnilisele teemal.

1. Käivita Chainlit rakendus:
   ```bash
   chainlit run scenario2.py
   ```
2. Ava brauseris terminalis pakutud kohalik URL (nt http://localhost:8000).
3. Vestlusaknas sisesta oma õppe teema ja nädalate arv, mille jooksul soovid õppida (nt "AI-900 sertifikaat, 8 nädalat").
4. Rakendus vastab nädal-nädala haaval õppimisplaaniga, hõlmates linke asjakohasele Microsoft Learn dokumentatsioonile.

**Nõutavad keskkonnamuutujad:**

Stsenaariumi 2 (Chainlit veebirakendus Azure OpenAI-ga) kasutamiseks tuleb määrata järgmised keskkonnamuutujad `.env` failis `python` kataloogis:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Täida need väärtused oma Azure OpenAI ressursside andmetega enne rakenduse käivitamist.

> [!TIP]
> Oma mudelite kiireks kasutuselevõtuks võid kasutada [Microsoft Foundry](https://ai.azure.com/).

### Stsenaarium 3: Dokumentatsioon otse VS Code MCP serveriga

Selle asemel, et otsida dokumentatsiooni brauseri vahelehtedelt, saad tuua Microsoft Learn Docs otse oma VS Code’i MCP serveri kaudu. See võimaldab sul:
- Otsida ja lugeda dokumente VS Code’is lahkumata oma koodikeskkonnast.
- Viidata dokumentatsioonile ja lisada linke otse oma README või kursuse failidesse.
- Kasutada GitHub Copiloti ja MCP-d koos sujuvaks, AI-põhiseks dokumentatsiooni töövooguks.

**Näited kasutusjuhtudest:**
- Lisa kursuse või projekti dokumentatsiooni kirjutamisel kiirelt viitelinke README faili.
- Kasuta Copiloti koodi genereerimiseks ja MCP-d asjakohaste dokumentide kiireks leidmiseks ja tsitaatimiseks.
- Säilita fookus redaktoris ja suurenda tootlikkust.

> [!IMPORTANT]
> Veendu, et sul on töökeskkonnas kehtiv [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) konfiguratsioon (asukoht on `.vscode/mcp.json`).

## Miks Chainlit stsenaariumi 2 jaoks?

Chainlit on kaasaegne avatud lähtekoodiga raamistik vestlusveebirakenduste loomiseks. See teeb lihtsaks vestluspõhiste kasutajaliideste loomise, mis ühenduvad taustateenustega nagu Microsoft Learn Docs MCP server. See projekt kasutab Chainlit’i, et pakkuda lihtsat ja interaktiivset viisi isikupärastatud õppimisplaanide reaalajas genereerimiseks. Chainlit’i abil saad kiiresti ehitada ja juurutada vestlusvahendeid, mis parandavad tootlikkust ja õppimist.

## Mida see teeb

See rakendus võimaldab kasutajatel luua isikupärastatud õppimisplaani, sisestades lihtsalt teema ja kestuse. Rakendus töötleb sinu sisendi, küsib Microsoft Learn Docs MCP serverilt asjakohast sisu ja korraldab tulemused struktuurses nädal-nädala haaval plaanis. Iga nädala soovitused kuvatakse vestluses, nii on lihtne jälgida ja edeneda. Integratsioon tagab, et saad alati uusimad ja asjakohasemad õppematerjalid.

## Näited päringutest

Proovi neid päringuid vestlusaknas, et näha, kuidas rakendus vastab:

- `AI-900 sertifikaat, 8 nädalat`
- `Õpi Azure Functions, 4 nädalat`
- `Azure DevOps, 6 nädalat`
- `Andmetöötlus Azure’is, 10 nädalat`
- `Microsofti turvalisuse alused, 5 nädalat`
- `Power Platform, 7 nädalat`
- `Azure AI teenused, 12 nädalat`
- `Pilvearhitektuur, 9 nädalat`

Need näited demonstreerivad rakenduse paindlikkust erinevate õppimiseesmärkide ja -ajavahemike jaoks.

## Viited

- [Chainlit dokumentatsioon](https://docs.chainlit.io/)
- [MCP dokumentatsioon](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->