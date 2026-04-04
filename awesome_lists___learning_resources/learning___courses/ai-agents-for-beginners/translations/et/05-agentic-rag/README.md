[![Agentic RAG](../../../translated_images/et/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Klikka ülaloleval pildil, et vaadata selle õppetunni videot)_

# Agentic RAG

See õppetund annab põhjaliku ülevaate Agentic Retrieval-Augmented Generationist (Agentic RAG), uuest tehisintellekti paradigmast, kus suured keelemudelid (LLMid) planeerivad iseseisvalt oma järgmisi samme, samal ajal kui nad tõmbavad teavet välisallikatest. Erinevalt staatilistest päringupõhistest mustritest hõlmab Agentic RAG iteratiivseid LLM-kõnesid, vaheldumisi tööriista- või funktsiooniüleskutsete ning struktureeritud väljunditega. Süsteem hindab tulemusi, täpsustab päringuid, kutsub vajadusel täiendavaid tööriistu ning jätkab seda tsüklit, kuni saavutatakse rahuldav lahendus.

## Introduction

See õppetund käsitleb

- **Understand Agentic RAG:**  Õpi tundma uut AI-paradigmat, kus suured keelemudelid (LLMid) planeerivad iseseisvalt oma järgmisi samme, tõmmates teavet välisandmeallikatest.
- **Grasp Iterative Maker-Checker Style:** Mõista iteratiivsete LLM-kõnede tsükli kontseptsiooni, mis vaheldub tööriista- või funktsioonikõnede ning struktureeritud väljunditega, et parandada korrektseid tulemusi ja käsitleda valesti vormistatud päringuid.
- **Explore Practical Applications:** Tuvasta olukorrad, kus Agentic RAG paistab silma, nagu korrektsele tulemusele keskenduvad keskkonnad, keerukad andmebaasiinteraktsioonid ja pikemaajalised töövood.

## Learning Goals

Pärast selle õppetunni läbimist tead/saavutad:

- **Understanding Agentic RAG:** Õpi tundma uut AI-paradigmat, kus suured keelemudelid (LLMid) planeerivad iseseisvalt oma järgmisi samme, tõmmates teavet välisandmeallikatest.
- **Iterative Maker-Checker Style:** Mõista iteratiivsete LLM-kõnede tsükli kontseptsiooni, mis vaheldub tööriista- või funktsioonikõnede ning struktureeritud väljunditega, et parandada korrektseid tulemusi ja käsitleda valesti vormistatud päringuid.
- **Owning the Reasoning Process:** Mõista süsteemi suutlikkust omada oma põhjendusprotsessi, tehes otsuseid selle kohta, kuidas probleemidega tegeleda, ilma et tugineks eelmääratletud radadele.
- **Workflow:** Mõista, kuidas agentne mudel iseseisvalt otsustab pärida turusuundumuste raportid, tuvastada konkurentide andmed, korreleerida sisemisi müügimõõdikuid, sünteesida leidmisi ja hinnata strateegiat.
- **Iterative Loops, Tool Integration, and Memory:** Õpi süsteemi sõltuvust silmusepõhisest interaktiivsest mustrist, säilitades seisundi ja mälurekordeid sammude vahel, et vältida korduvaid silmuseid ja teha teadlikumaid otsuseid.
- **Handling Failure Modes and Self-Correction:** Uuri süsteemi tugevaid enesekorrektsiooni mehhanisme, sealhulgas iteratsiooni ja uuesti päringute tegemist, diagnostiliste tööriistade kasutamist ning vajadusel inimjärelevalvele tuginemist.
- **Boundaries of Agency:** Mõista Agentic RAG piiranguid, keskendudes domeenispetsiifilisele autonoomiale, infrastruktuurisõltuvusele ja piirangute austamisele.
- **Practical Use Cases and Value:** Tuvasta olukorrad, kus Agentic RAG paistab silma, nagu korrektsele tulemusele keskenduvad keskkonnad, keerukad andmebaasiinteraktsioonid ja pikemaajalised töövood.
- **Governance, Transparency, and Trust:** Õpi halduse ja läbipaistvuse tähtsusest, sealhulgas seletatavast põhjendusest, eelarvamuste kontrollist ja inimjärelevalvest.

## What is Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) on uus AI-paradigm, kus suured keelemudelid (LLMid) mitte ainult ei tõmba andmeid välisallikatest, vaid planeerivad ka iseseisvalt järgmisi samme. Erinevalt staatilistest „päringu-then-lugemine“ mustritest või hoolikalt skriptitud prompt-sektsioonidest hõlmab Agentic RAG iteratiivset LLM-kõnede tsüklit, mis vaheldub tööriista- või funktsiooniüleskutsete ning struktureeritud väljunditega. Igal sammul hindab süsteem saadud tulemusi, otsustab, kas täpsustada päringuid, kutsub vajadusel täiendavaid tööriistu ja jätkab seda protsessi, kuni saavutatakse rahuldav lahendus.

See iteratiivne „maker-checker“ tööstiil on loodud korrektuse parandamiseks, struktureeritud andmebaaside (nt NL2SQL) valesti vormistatud päringute käsitlemiseks ning tasakaalustatud, kvaliteetsete tulemuste tagamiseks. Selle asemel, et tugineda üksnes hoolikalt välja töötatud prompt-ahelatele, omab süsteem aktiivselt oma põhjendusprotsessi. See võib ümber kirjutada ebaõnnestunud päringuid, valida erinevaid päringumeetodeid ja integreerida mitmeid tööriistu—näiteks vektorotsing Azure AI Searchis, SQL-andmebaasid või kohandatud API-d—enne lõpliku vastuse andmist. See eemaldab vajaduse ülekomplekseeritud orkestreerimisraamistike järele. Selle asemel võib suhteliselt lihtne tsükkel „LLM call → tool use → LLM call → …“ toota keerukaid ja hästi põhjendatud väljundeid.

![Agentic RAG Core Loop](../../../translated_images/et/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Owning the Reasoning Process

Erinevus, mis muudab süsteemi „agentseks“, on selle võime omada oma põhjendusprotsessi. Traditsioonilised RAG-implementatsioonid tuginevad sageli inimeste poolt eelnevalt määratletud teekonnale: mõttekäiguahelale, mis määratleb, mida ja millal pärida.
Aga kui süsteem on tõeliselt agentne, otsustab see sisemiselt, kuidas probleemi läheneda. See ei täida lihtsalt skripti; see määrab autonoomselt sammude järjekorra vastavalt leiutud info kvaliteedile.
Näiteks, kui temalt küsitakse tootega turuletoomise strateegia loomist, ei tugine see üksnes promptile, mis kirjeldab kogu uurimis- ja otsustusprotsessi. Selle asemel otsustab agentne mudel iseseisvalt:

1. Retrieve current market trend reports using Bing Web Grounding
2. Identify relevant competitor data using Azure AI Search.
3.	Correlate historical internal sales metrics using Azure SQL Database.
4. Synthesize the findings into a cohesive strategy orchestrated via Azure OpenAI Service.
5. Evaluate the strategy for gaps or inconsistencies, prompting another round of retrieval if necessary.
Kõik need sammud—päringute täpsustamine, allikate valimine, iteratsioon kuni vastuse „rahuloluni“—otsustab mudel, mitte inimene, kes seda ette skriptis.

## Iterative Loops, Tool Integration, and Memory

![Tool Integration Architecture](../../../translated_images/et/tool-integration.0f569710b5c17c10.webp)

Agentne süsteem tugineb silmusepõhisele interaktsioonimustrile:

- **Initial Call:** Kasutaja eesmärk (nn kasutaja prompt) esitatakse LLMile.
- **Tool Invocation:** Kui mudel tuvastab puuduvat infot või ebamääraseid juhiseid, valib ta tööriista või päringumeetodi—näiteks vektorandmebaasi päringu (nt Azure AI Search Hybrid search üle privaatsete andmete) või struktureeritud SQL-kutse—et koguda rohkem konteksti.
- **Assessment & Refinement:** Pärast tagastatud andmete ülevaatamist otsustab mudel, kas informatsioon on piisav. Kui ei, täpsustab ta päringut, proovib erinevat tööriista või kohandab oma lähenemist.
- **Repeat Until Satisfied:** See tsükkel jätkub, kuni mudel määrab, et tal on piisav selgus ja tõendusmaterjal lõpliku ja hästi põhjendatud vastuse andmiseks.
- **Memory & State:** Kuna süsteem säilitab oleku ja mälu sammude vahel, suudab see meenutada varasemaid katseid ja nende tulemusi, vältides korduvaid silmuseid ning tehes sammude kaupa paremini informeeritud otsuseid.

Aja jooksul loob see areneva arusaamise tunde, võimaldades mudelil navigeerida keerukate, mitmeastmeliste ülesannete läbi ilma, et inimene peaks pidevalt sekkuma või prompti ümber kujundama.

## Handling Failure Modes and Self-Correction

Agentic RAG autonoomia hõlmab ka tugevaid enesekorrektsiooni mehhanisme. Kui süsteem satub ummikseisu—näiteks tõmbab ebaolulisi dokumente või kohtub valesti vormistatud päringutega—siis ta võib:

- **Iterate and Re-Query:** Selle asemel, et tagastada madala väärtusega vastuseid, proovib mudel uusi otsingustrateegiaid, kirjutab andmebaasipäringuid ümber või vaatab alternatiivseid andmekogumeid.
- **Use Diagnostic Tools:** Süsteem võib kutsuda täiendavaid funktsioone, mis aitavad tal oma põhjendusastmeid siluda või kontrollida tõlgendatud andmete õigsust. Tööriistad nagu Azure AI Tracing on olulised tugeva jälgitavuse ja monitooringu võimaldamiseks.
- **Fallback on Human Oversight:** Kõrge panusega või korduvalt ebaõnnestuvate stsenaariumite korral võib mudel märgata ebakindlust ja paluda inimjuhendamist. Kui inimene annab parandava tagasiside, saab mudel selle õppetunni edaspidiseks kasutamiseks integreerida.

See iteratiivne ja dünaamiline lähenemine võimaldab mudelil pidevalt paraneda, tagades, et see pole lihtsalt ühekordne süsteem, vaid õpib antud seansi jooksul tehtud eksimustest.

![Self Correction Mechanism](../../../translated_images/et/self-correction.da87f3783b7f174b.webp)

## Boundaries of Agency

Vaatamata autonoomiale ülesande piires ei ole Agentic RAG sarnane üldintellektiga (Artificial General Intelligence). Selle „agentne“ suutlikkus piirneb inimarendajate poolt pakutavate tööriistade, andmeallikate ja poliitikatega. See ei saa välja mõelda oma tööriistu ega astuda väljapoole määratletud domeenipiire. Selle asemel on ta tugev olemasolevate ressursside dünaamilisel orkestreerimisel.
Peamised erinevused võrreldes arenenumate AI-vormidega hõlmavad:

1. **Domain-Specific Autonomy:** Agentic RAG süsteemid keskenduvad kasutaja määratletud eesmärkide saavutamisele teadaolevas domeenis, kasutades strateegiaid nagu päringu ümberkirjutamine või tööriista valik tulemuste parandamiseks.
2. **Infrastructure-Dependent:** Süsteemi võimekus sõltub arendajate integreeritud tööriistadest ja andmetest. See ei saa neid piire ületada ilma inimsekkumiseta.
3. **Respect for Guardrails:** Eetilised juhised, vastavusreeglid ja äripoliitikad jäävad väga oluliseks. Agendi vabadus on alati piiratud turvameetmete ja järelevalvega (loodetavasti?)

## Practical Use Cases and Value

Agentic RAG paistab silma olukordades, mis nõuavad iteratiivset täpsustamist ja täpsust:

1. **Correctness-First Environments:** Vastavuskontrollide, regulatiivsete analüüside või õigusuurimuste puhul saab agentne mudel korduvalt faktilisi väiteid kontrollida, konsulteerida mitme allikaga ja ümber kirjutada päringuid, kuni ta toodab põhjalikult kontrollitud vastuse.
2. **Complex Database Interactions:** Töötades struktureeritud andmetega, kus päringud võivad sageli ebaõnnestuda või vajada kohandamist, saab süsteem iseseisvalt täpsustada päringuid, kasutades Azure SQLi või Microsoft Fabric OneLake’i, tagamaks, et lõplik päring vastab kasutaja kavatsusele.
3. **Extended Workflows:** Pikemaajalised sessioonid võivad areneda, kui ilmneb uut infot. Agentic RAG suudab pidevalt integreerida uusi andmeid ja muuta strateegiaid, kui ta probleemi kohta rohkem teada saab.

## Governance, Transparency, and Trust

Nende süsteemide muutudes mõistuspärasemaks oma põhjenduses on haldus ja läbipaistvus olulised:

- **Explainable Reasoning:** Mudel saab anda auditeerimise jälje tehtud päringutest, kasutatud allikatest ja sammudest, mis viisid järelduseni. Tööriistad nagu Azure AI Content Safety ja Azure AI Tracing / GenAIOps aitavad säilitada läbipaistvust ja vähendada riske.
- **Bias Control and Balanced Retrieval:** Arendajad saavad häälestada päringustrateegiaid, et tagada tasakaalustatud ja esinduslike andmeallikate kaasamine, ning regulaarselt auditeerida väljundeid eelarvamuste või kallutatud mustrite avastamiseks, kasutades kohandatud mudeleid edasijõudnud andmeteaduse organisatsioonidele Azure Machine Learningi abil.
- **Human Oversight and Compliance:** Tundlike ülesannete puhul jääb inimkontroll hädavajalikuks. Agentic RAG ei asenda inimotsust kõrge panusega olukordades—see täiendab seda, pakkudes põhjalikumalt kontrollitud valikuid.

Oluline on omada tööriistu, mis pakuvad tegevuste selget kirjet. Ilma nendeta võib mitmeastmelise protsessi silumine olla väga raske. Vaata järgmist näidet ettevõttelt Literal AI (Chainliti taga olev ettevõte) Agent-runist:

![AgentRunExample](../../../translated_images/et/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusion

Agentic RAG esindab loomulikku evolutsiooni selles, kuidas AI-süsteemid käsitlevad keerukaid ja andmerohkeid ülesandeid. Võttes kasutusele silmusepõhise interaktsioonimustri, valides autonoomselt tööriistu ja täpsustades päringuid kuni kõrgekvaliteedilise tulemuse saavutamiseni, liigub süsteem edasi staatilisest prompti järgimisest kohanduvama ja kontekstiteadlikuma otsustajani. Kuigi see on endiselt inimmääratletud infrastruktuuri ja eetiliste juhiste piiratud, võimaldavad need agentse võimekuse kujunemised rikkalikumaid, dünaamilisemaid ja lõppkokkuvõttes kasulikumaid AI-interaktsioone nii ettevõtetele kui ka lõppkasutajatele.

### Got More Questions about Agentic RAG?

Liitu [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), et kohtuda teiste õppuritega, osaleda „office hours“ sessioonidel ja saada vastuseid oma AI Agents küsimustele.

## Additional Resources
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Retrieval Augmented Generationi (RAG) rakendamine Azure OpenAI teenusega: Õpi, kuidas kasutada oma andmeid Azure OpenAI teenusega. See Microsoft Learn moodul annab põhjaliku juhendi RAG-i elluviimiseks</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Generatiivsete tehisintellekti rakenduste hindamine Microsoft Foundry abil: See artikkel käsitleb mudelite hindamist ja võrdlust avalikult kättesaadavate andmestike põhjal, sealhulgas agentsete tehisintellekti rakenduste ja RAG-arsitektuuride puhul</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Mis on agentne RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentne RAG: täielik juhend agentide-põhise Retrieval Augmented Generationi kohta – News from generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentne RAG: kiirenda oma RAG-i päringute ümbervormistamise ja enese-päringu abil! Hugging Face'i avatud lähtekoodiga AI-retseptiraamat</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Agentsete kihtide lisamine RAG-ile</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Teadmiste assistentide tulevik: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Kuidas ehitada agentseid RAG-süsteeme</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Microsoft Foundry Agent Service'i kasutamine oma tehisintellekti agentide skaleerimiseks</a>

### Akadeemilised artiklid

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: iteratiivne täiustamine enesetagasiside abil</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: keeleagendid verbaalse tugevdamisõppega</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: suured keelemudelid võivad iseennast parandada tööriistade interaktiivse kriitika abil</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: ülevaade agentse RAG-i kohta</a>

## Eelmine õppetund

[Tööriista kasutamise disainimuster](../04-tool-use/README.md)

## Järgmine õppetund

[Usaldusväärsete tehisintellekti agentide loomine](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Lahtiütlus:
See dokument on tõlgitud tehisintellekti tõlketeenuse Co-op Translator (https://github.com/Azure/co-op-translator) abil. Kuigi me püüdleme täpsuse poole, palun arvestage, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Algset dokumenti selle algkeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tulenevate arusaamatuste ega väärtõlgenduste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->