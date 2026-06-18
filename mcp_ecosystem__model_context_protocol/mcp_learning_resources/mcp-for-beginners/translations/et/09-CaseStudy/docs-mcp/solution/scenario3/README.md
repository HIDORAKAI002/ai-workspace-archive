# Stsenaarium 3: Toimetajasisesed dokumendid MCP serveriga VS Codes

## Ülevaade

Selles stsenaariumis õpid, kuidas tuua Microsoft Learn Docs otse oma Visual Studio Code’i keskkonda, kasutades MCP serverit. Selle asemel, et pidevalt brauseri vahekaarte dokumentatsiooni otsimiseks vahetada, saad ametlikke dokumente otsida, lugeda ja viidata otse oma redaktoris. See lähenemine lihtsustab sinu töövoogu, hoiab sind keskendununa ja võimaldab sujuvat integreerimist tööriistadega nagu GitHub Copilot.

- Otsi ja loe dokumente VS Codes ilma koodimiskeskkonnast lahkumata.
- Viita dokumentatsioonile ja sisesta linke otse oma README või kursuse failidesse.
- Kasuta GitHub Copilotit ja MCP-d koos sujuvaks, tehisintellektipõhiseks dokumentatsiooni töövooks.

## Õpieesmärgid

Selle peatüki lõpuks mõistad, kuidas seadistada ja kasutada MCP serverit VS Codes, et parandada oma dokumentatsiooni ja arendustöövoogu. Sa oskad:

- Konfigureerida oma tööruumi, et kasutada MCP serverit dokumentatsiooni otsimiseks.
- Otsida ja sisestada dokumentatsiooni otse VS Codes.
- Ühendada GitHub Copiloti ja MCP jõud ühtseks produktiivseks, tehisintellektiga täiustatud töövooguks.

Need oskused aitavad sul hoida keskendumist, parandada dokumentatsiooni kvaliteeti ja suurendada oma tootlikkust arendaja või tehnilise kirjutajana.

## Lahendus

Toimetajasise dokumentatsiooni ligipääsu saavutamiseks järgibid samme, mis integreerivad MCP serveri VS Code’i ja GitHub Copilotiga. See lahendus sobib ideaalselt kursuse autoritele, dokumentatsiooni kirjutajatele ja arendajatele, kes soovivad keskenduda redaktoris olles dokumentide ja Copilotiga töötamisel.

- Lisa kiiresti viitelinke README faili kursuse- või projektdokumentatsiooni kirjutamise ajal.
- Kasuta Copilotit koodi genereerimiseks ja MCP-d, et viivitamatult leida ja viidata asjakohastele dokumentidele.
- Hoia fookus toimetajas ja suurenda tootlikkust.

### Samm-sammult juhend

Alustamiseks järgi neid samme. Iga sammu juurde võid lisada ka ekraanipildi `assets` kaustast, mis illustreerib protsessi visuaalselt.

1. **Lisa MCP konfiguratsioon:**
   Oma projekti juurkataloogis loo `.vscode/mcp.json` fail ja lisa järgmine konfiguratsioon:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   See konfiguratsioon ütleb VS Code’ile, kuidas ühenduda [`Microsoft Learn Docs MCP serveriga`](https://github.com/MicrosoftDocs/mcp).
   
   ![Samm 1: Lisa mcp.json .vscode kausta](../../../../../../translated_images/et/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Ava GitHub Copilot Chat paneel:**
   Kui sul pole veel GitHub Copiloti laiendust installitud, ava VS Code’i Laienduste vaade ja installi see. Võid selle alla laadida otse [Visual Studio Code Marketplace’ilt](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Siis ava vasakpoolsest küljeribalt Copilot Chat paneel.

   ![Samm 2: Ava Copilot Chat paneel](../../../../../../translated_images/et/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Luba agendi režiim ja kontrolli tööriistu:**
   Copilot Chat paneelis luba agendi režiim.

   ![Samm 3: Luba agendi režiim ja kontrolli tööriistu](../../../../../../translated_images/et/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Pärast agendi režiimi lubamist kontrolli, kas MCP server on saadaval tööriistana. See tagab, et Copiloti agent pääseb dokumentatsiooniserverile ligi asjakohase info toomiseks.
   
   ![Samm 3: Kontrolli MCP serveri tööriista](../../../../../../translated_images/et/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Alusta uut vestlust ja esita agendile päring:**
   Ava Copilot Chat paneelis uus vestlus. Nüüd saad esitada agendile dokumentatsiooniga seotud küsimusi. Agent kasutab MCP serverit, et tuua ja kuvada asjakohast Microsoft Learn dokumentatsiooni otse redaktoris.

   - *"Püüan kirjutada õppimiskava teemal X. Kavatsen seda uurida 8 nädala jooksul, palun soovita iga nädala kohta sisu, mida peaksin võtma."*

   ![Samm 4: Esita agendile päring vestluses](../../../../../../translated_images/et/step4-prompt-chat.12187bb001605efc.webp)

5. **Otsepäring:**

   > Võtame otsepäringu Microsoft Foundry Discordi [#get-help](https://discord.gg/D6cRhjHWSC) sektsioonist ([originaalsõnum](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Ma otsin vastuseid, kuidas paigaldada mitmeagendiline lahendus Azure AI Foundryl arendatud AI agentidega. Näen, et puudub otsene juurutusmeetod, näiteks Copilot Studio kanalid. Millised on erinevad võimalused selle juurutamiseks ettevõtte kasutajatele, kes soovivad suhelda ja töö ära teha?
On palju artikleid/blogisid, mis väidavad, et selle töö jaoks saab kasutada Azure Bot teenust, mis võiks olla sild Microsoft Teamsi ja Azure AI Foundry agendite vahel. Kas see töötab, kui ma seadistan Azure boti, mis ühendub Azure AI Foundry Orchestrator agendiga Azure funktsiooni kaudu orkestreerimiseks, või pean ma looma eraldi Azure funktsioonid iga AI agendi jaoks, mis on mitmeagendilise lahenduse osa, et orkestreerida Bot Frameworki tasandil? Muud soovitused on väga teretulnud."*

   ![Samm 5: Otsepäringud](../../../../../../translated_images/et/step5-live-queries.49db3e4a50bea273.webp)

   Agent vastab asjakohaste dokumentatsioonilinkide ja kokkuvõtetega, mida saad otse oma markdown failidesse sisestada või koodis viidetena kasutada.
   
### Näidispäringud

Siin on mõned näited päringutest, mida saad proovida. Need päringud demonstreerivad, kuidas MCP server ja Copilot saavad koos töötada, et pakkuda koheseid, kontekstiteadlikke dokumentatsiooni ja viiteid ilma VS Code’i lahkumata:

- "Näita, kuidas kasutada Azure Functions trigger’eid."
- "Lisa link ametlikule Azure Key Vault dokumentatsioonile."
- "Millised on parimad praktikad Azure ressursside turvamiseks?"
- "Leia Azure AI teenuste alustusjuhend."

Need päringud näitavad, kuidas MCP server ja Copilot võivad koos töötades pakkuda hetkelisi, kontekstiteadlikke dokumente ja viiteid VS Code’i keskkonnas.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->