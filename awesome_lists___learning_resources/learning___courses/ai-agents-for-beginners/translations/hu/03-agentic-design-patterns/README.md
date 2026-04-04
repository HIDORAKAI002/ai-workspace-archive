[![Hogyan tervezzünk jó AI ügynököket](../../../translated_images/hu/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Kattintson a fenti képre a lecke videójának megtekintéséhez)_
# AI Ügynöki Tervezési Elvek

## Bevezetés

Számos módon lehet gondolkodni AI ügynöki rendszerek építéséről. Tekintettel arra, hogy a bizonytalanság a Generatív AI tervezésének jellemzője, nem pedig hibája, néha nehéz a mérnököknek eldönteni, hol kezdjék el. Létrehoztunk egy emberközpontú UX-tervezési elveket tartalmazó csomagot, amely lehetővé teszi a fejlesztők számára, hogy ügyfélközpontú ügynöki rendszereket építsenek üzleti igényeik kielégítésére. Ezek a tervezési elvek nem előíró architektúrák, hanem inkább kiindulópontok a csapatok számára, amelyek meghatározzák és fejlesztik az ügynöki élményeket.

Általánosságban az ügynököknek:

- Szélesíteniük és skálázniuk kell az emberi képességeket (ötletelés, problémamegoldás, automatizálás stb.)
- Ki kell tölteniük a tudáshiányokat (tájékoztatás a tudásdoménekről, fordítás stb.)
- Támogatniuk és elősegíteniük kell az együttműködést abban a módon, ahogy egyénileg a legszívesebben dolgozunk másokkal
- Jobbá kell tenniük minket magunknál (pl. életvezetési tanácsadó/feladatvezető, segítve érzelmi szabályozás és tudatosság fejlesztését, reziliencia építése stb.)

## Ez a lecke lefedi

- Mik az Ügynöki Tervezési Elvek
- Milyen irányelveket érdemes követni ezen elvek alkalmazása során
- Néhány példa az elvek használatára

## Tanulási célok

A lecke elvégzése után képes lesz:

1. Elmagyarázni, mik az Ügynöki Tervezési Elvek
2. Elmagyarázni az irányelveket az Ügynöki Tervezési Elvek alkalmazásához
3. Megérteni, hogyan lehet ügynököt építeni az Ügynöki Tervezési Elvek segítségével

## Az Ügynöki Tervezési Elvek

![Ügynöki Tervezési Elvek](../../../translated_images/hu/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Ügynök (Tér)

Ez az a környezet, amelyben az ügynök működik. Ezek az elvek informálják, hogyan tervezzünk ügynököket fizikai és digitális világokban való részvételhez.

- **Kapcsolódás, nem összeolvadás** – segítsük az embereket más emberekhez, eseményekhez és cselekvési tudáshoz kapcsolódni az együttműködés és kapcsolat elősegítéséhez.
- Az ügynökök segítenek összekapcsolni eseményeket, tudást és embereket.
- Az ügynökök közelebb hozzák egymáshoz az embereket. Nem arra tervezték őket, hogy helyettesítsék vagy leértékeljék az embereket.
- **Könnyen hozzáférhető, mégis időnként láthatatlan** – az ügynök nagyrészt a háttérben működik, és csak akkor emlékeztet minket, ha releváns és megfelelő.
  - Az ügynök könnyen felfedezhető és elérhető a jogosult felhasználók számára bármilyen eszközön vagy platformon.
  - Az ügynök támogatja a multimodális bemeneteket és kimeneteket (hang, beszéd, szöveg stb.).
  - Az ügynök zökkenőmentesen vált a háttér és előtér között; proaktív és reaktív mód között, a felhasználó igényeinek észlelése alapján.
  - Az ügynök működhet láthatatlan formában, mégis a háttérben futó folyamata és más ügynökökkel való együttműködése átlátható és a felhasználó által szabályozható.

### Ügynök (Idő)

Ez az, ahogyan az ügynök az idő során működik. Ezek az elvek informálják, hogyan tervezzünk ügynököket, amelyek a múlt, jelen és jövő között lépnek kapcsolatba.

- **Múlt**: a múlt tükrözése, amely magában foglalja az állapotot és a kontextust.
  - Az ügynök relevánsabb eredményeket nyújt a gazdagabb történelmi adatok elemzésén alapulóan, túlmutatva az eseményen, személyeken vagy állapotokon.
  - Az ügynök kapcsolatokat hoz létre múltbéli eseményekből és aktívan reflektál a memóriára a jelenlegi helyzetek kezeléséhez.
- **Jelen**: ösztönzés a puszta értesítés helyett.
  - Az ügynök átfogó megközelítést testesít meg az emberekkel való interakcióban. Amikor egy esemény történik, az ügynök túlmegy a statikus értesítés vagy más statikus formalitás keretein. Az ügynök leegyszerűsítheti a folyamatokat vagy dinamikusan generálhat figyelmeztetéseket, hogy megfelelő pillanatban irányítsa a felhasználó figyelmét.
  - Az ügynök információt nyújt a kontextuális környezet, társadalmi és kulturális változások alapján, valamint a felhasználó szándékára szabva.
  - Az ügynök interakciója fokozatos lehet, komplexitásában fejlődő/növekvő, hogy hosszú távon empowermentet nyújtson a felhasználóknak.
- **Jövő**: alkalmazkodás és fejlődés.
  - Az ügynök alkalmazkodik különféle eszközökhöz, platformokhoz és modalitásokhoz.
  - Az ügynök alkalmazkodik a felhasználói viselkedéshez, az akadálymentességi igényekhez, és szabadon testreszabható.
  - Az ügynök folyamatos felhasználói interakción keresztül formálódik és fejlődik.

### Ügynök (Mag)

Ezek a kulcselemek az ügynök tervezésének magjában.

- **Fogadja el a bizonytalanságot, de építsen bizalmat**.
  - Az ügynöknél bizonyos szintű bizonytalanság várható. A bizonytalanság az ügynöki tervezés kulcseleme.
  - A bizalom és az átláthatóság az ügynöki tervezés alapvető rétegei.
  - Az emberek irányítják, mikor van az ügynök be- vagy kikapcsolva, és az ügynök állapota mindig jól látható.

## Az irányelvek ezeknek az elveknek az alkalmazásához

Amikor a fenti tervezési elveket használja, alkalmazza a következő irányelveket:

1. **Átláthatóság**: Tájékoztassa a felhasználót, hogy AI érintett, hogyan működik (beleértve a múltbéli tevékenységeket is), valamint hogyan lehet visszajelzést adni és módosítani a rendszert.
2. **Irányítás**: Tegye lehetővé a felhasználó számára a testreszabást, preferenciák megadását és személyre szabást, valamint a rendszer és attribútumai feletti irányítást (beleértve az elfelejtés lehetőségét is).
3. **Konszisztencia**: Törekedjen következetes, multimodális élményre különböző eszközökön és végpontokon. Használjon ismerős UI/UX elemeket ahol lehet (pl. mikrofon ikon a hangalapú interakcióhoz), csökkentse a felhasználó kognitív terhelését a lehető legjobban (pl. tömör válaszokat, vizuális segédeszközöket és 'Tudj meg többet' tartalmakat alkalmazva).

## Hogyan tervezzünk utazási ügynököt ezekkel az elvekkel és irányelvekkel

Képzelje el, hogy egy utazási ügynököt tervez, így gondolhat az Ügynöki Tervezési Elvek és irányelvek alkalmazására:

1. **Átláthatóság** – Tudassa a felhasználóval, hogy az Utazási Ügynök AI-támogatott agent. Adjon néhány alapvető útmutatást a kezdéshez (pl. „Helló” üzenet, mintapéldák). Egyértelműen dokumentálja ezt a termékoldalon. Mutassa meg a felhasználó korábbi kérdéseinek listáját. Tegye világossá, hogyan lehet visszajelzést adni (fel és lefelé mutató hüvelykujj, Visszajelzés küldése gomb stb.). Egyértelműen jelezze, ha az ügynöknek használati vagy témabeli korlátai vannak.
2. **Irányítás** – Tegye világossá, hogyan módosíthatja a felhasználó az Ügynököt létrehozás után például a Rendszer Prompt segítségével. Tegye lehetővé a felhasználónak, hogy válassza meg az ügynök terjengőségének mértékét, írásstílusát és bármilyen kikötést arról, miről ne beszéljen. Engedje meg a felhasználónak, hogy megtekinthesse és törölhesse a kapcsolódó fájlokat vagy adatokat, promptokat és korábbi beszélgetéseket.
3. **Konszisztencia** – Győződjön meg róla, hogy az ikonok a "Prompt megosztása", fájl vagy kép hozzáadása és valaki vagy valami megjelölése szabványosak és felismerhetők. Használja a gemkapocs ikont a fájl feltöltés vagy megosztás jelzésére az ügynökké, és kép ikont a grafikus feltöltéshez.

## Minta kódok

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## További kérdések az AI ügynöki tervezési mintákról?

Csatlakozzon a [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) közösséghez, hogy találkozzon más tanulókkal, részt vegyen konzultációkon, és választ kapjon AI ügynöki kérdéseire.

## További erőforrások

- <a href="https://openai.com" target="_blank">Az ügynöki AI rendszerek irányításának gyakorlati útmutatója | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">A HAX Toolkit Projekt - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Felelős AI Eszköztár</a>

## Előző lecke

[Az ügynöki keretrendszerek felfedezése](../02-explore-agentic-frameworks/README.md)

## Következő lecke

[Eszközhasználati tervezési minta](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felmentés**:
Ezt a dokumentumot az AI fordító szolgáltatás [Co-op Translator](https://github.com/Azure/co-op-translator) használatával fordítottuk le. Bár a pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások tartalmazhatnak hibákat vagy pontatlanságokat. Az eredeti dokumentum az eredeti nyelvén tekintendő hiteles forrásnak. Kiemelten fontos információk esetén szakmai emberi fordítást javasolunk. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->