# 3 scenarijus: dokumentacija redaktoriuje su MCP serveriu VS Code aplinkoje

## Apžvalga

Šiame scenarijuje sužinosite, kaip Microsoft Learn dokumentaciją tiesiogiai integruoti į savo Visual Studio Code aplinką naudojant MCP serverį. Vietoje nuolatinio naršyklės skirtukų perjunginėjimo ieškant dokumentacijos, galėsite ją pasiekti, ieškoti ir naudoti oficialius dokumentus tiesiog savo redaktoriuje. Šis požiūris supaprastina darbo eigą, palaiko jūsų susikaupimą ir leidžia sklandžiai integruotis su įrankiais, tokiais kaip GitHub Copilot.

- Ieškokite ir skaitykite dokumentaciją tiesiog VS Code, neišeidami iš savo kodavimo aplinkos.
- Nurodykite dokumentaciją ir įterpkite nuorodas tiesiai į savo README ar kursų failus.
- Naudokite GitHub Copilot ir MCP kartu sklandžiai, dirbtiniu intelektu pagrįstą dokumentacijos darbo eigą.

## Mokymosi tikslai

Per šią skirsnį išmoksite, kaip nustatyti ir naudoti MCP serverį VS Code, kad pagerintumėte savo dokumentacijos ir kūrimo darbo eigą. Gebėsite:

- Konfigūruoti savo darbo vietą naudoti MCP serverį dokumentacijos paieškai.
- Ieškoti ir įterpti dokumentaciją tiesiai iš VS Code.
- Derinti GitHub Copilot ir MCP galimybes produktyvesnei, dirbtiniu intelektu papildytai darbo eigai.

Šie įgūdžiai padės jums išlikti susikaupusiam, pagerinti dokumentacijos kokybę ir padidinti produktyvumą kaip kūrėjui ar techniniam rašytojui.

## Sprendimas

Norėdami pasiekti dokumentaciją tiesiog redaktoriuje, atliksite keletą veiksmų, integruodami MCP serverį su VS Code ir GitHub Copilot. Šis sprendimas yra idealus kursų autoriams, dokumentacijos rašytojams ir kūrėjams, kurie nori išlikti susikaupę redaktoriuje dirbdami su dokumentais ir Copilot.

- Greitai pridėkite nuorodas į README rašydami kursą ar projekto dokumentaciją.
- Naudokite Copilot kuriant kodą ir MCP greitai surasti bei pacituoti susijusią dokumentaciją.
- Išlaikykite susikaupimą redaktoriuje ir padidinkite produktyvumą.

### Žingsnis po žingsnio vadovas

Norėdami pradėti, atlikite šiuos veiksmus. Kiekvienam žingsniui galite pridėti ekrano kopiją iš assets aplanko, kad vizualiai iliustruotumėte procesą.

1. **Pridėkite MCP konfigūraciją:**
   Savo projekto šaknyje sukurkite `.vscode/mcp.json` failą ir pridėkite šią konfigūraciją:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Ši konfigūracija nurodo VS Code, kaip prisijungti prie [`Microsoft Learn Docs MCP serverio`](https://github.com/MicrosoftDocs/mcp).
   
   ![1 žingsnis: pridėti mcp.json į .vscode aplanką](../../../../../../translated_images/lt/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Atidarykite GitHub Copilot pokalbių skydelį:**
   Jei dar neturite įdiegto GitHub Copilot plėtinio, eikite į VS Code Išplėtinių vaizdą ir įdiekite jį. Galite atsisiųsti tiesiai iš [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Tada atidarykite Copilot Chat skydelį šoniniame meniu.

   ![2 žingsnis: atidaryti Copilot Chat skydelį](../../../../../../translated_images/lt/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Įjunkite agento režimą ir patikrinkite įrankius:**
   Copilot Chat skydelyje įjunkite agento režimą.

   ![3 žingsnis: įjungti agento režimą ir patikrinti įrankius](../../../../../../translated_images/lt/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Įjungus agento režimą, patikrinkite, ar MCP serveris yra įtrauktas į galimų įrankių sąrašą. Tai užtikrina, kad Copilot agentas galės pasiekti dokumentacijos serverį ir gauti aktualią informaciją.
   
   ![3 žingsnis: patikrinti MCP serverio įrankį](../../../../../../translated_images/lt/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Pradėkite naują pokalbį ir užduokite užklausą agentui:**
   Atidarykite naują pokalbį Copilot Chat skydelyje. Dabar galite užduoti agentui klausimus apie dokumentaciją. Agentas naudos MCP serverį, kad gautų ir parodytų aktualią Microsoft Learn dokumentaciją tiesiog jūsų redaktoriuje.

   - *„Bandau sukurti studijų planą temai X. Studijuosiu ją 8 savaites, kiekvienai savaitei pasiūlykite turinį, kurį turėčiau įsisavinti.“*

   ![4 žingsnis: užduokite klausimą agentui pokalbyje](../../../../../../translated_images/lt/step4-prompt-chat.12187bb001605efc.webp)

5. **Gyvos užklausos:**

   > Pažiūrėkime gyvą užklausą iš [#get-help](https://discord.gg/D6cRhjHWSC) skilties Microsoft Foundry Discord ([žiūrėti originalų pranešimą](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *„Ieškau atsakymų, kaip diegti daugiagentinį sprendimą su AI agentais, sukurtais Azure AI Foundry. Pastebiu, kad nėra tiesioginio diegimo metodo, kaip Copilot Studio kanalai. Taigi, kokie yra skirtingi būdai šiam diegimui, kad įmonių vartotojai galėtų bendrauti ir atlikti darbą?
Yra daug straipsnių/tinklaraščių, kuriuose sakoma, kad galima naudoti Azure Bot paslaugą, kuri galėtų veikti kaip tiltas tarp MS Teams ir Azure AI Foundry agentų, bet ar tai veiks, jei nustatysiu Azure botą, jungiantį Orchestrator Agent prie Azure AI Foundry per Azure funkciją orkestracijai atlikti, ar turiu sukurti atskras Azure funkcijas kiekvienam AI agentui, dalyvaujančiam daugiagentiniame sprendime, kad orkestracija būtų atliekama Bot platformoje? Kitos rekomendacijos irgi labai laukiamos.“*

   ![5 žingsnis: gyvos užklausos](../../../../../../translated_images/lt/step5-live-queries.49db3e4a50bea273.webp)

   Agentas atsakys su aktualiomis dokumentacijos nuorodomis ir santraukomis, kurias galėsite tiesiogiai įterpti į savo markdown failus arba naudoti kaip nuorodas savo kode.
   
### Pavyzdinės užklausos

Štai keletas pavyzdinių užklausų, kurias galite išbandyti. Šios užklausos demonstruos, kaip MCP serveris ir Copilot veikia kartu, kad suteiktų momentinę, kontekstinę dokumentaciją ir nuorodas be išeinančio iš VS Code:

- „Parodyk, kaip naudoti Azure Functions trigerius.“
- „Įterpk nuorodą į oficialią Azure Key Vault dokumentaciją.“
- „Kokios yra gerosios praktikos saugant Azure resursus?“
- „Rask greitą pradžios vadovą Azure AI paslaugoms.“

Šios užklausos parodys, kaip MCP serveris ir Copilot veikia kartu, kad suteiktų momentinę, kontekstinę dokumentaciją ir nuorodas be išeinančio iš VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->