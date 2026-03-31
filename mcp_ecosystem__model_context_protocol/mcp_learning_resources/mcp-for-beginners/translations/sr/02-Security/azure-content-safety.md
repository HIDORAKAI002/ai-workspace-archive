# Напредна MCP безбедност уз Azure Content Safety

> **OWASP MCP Ризик који се решава**: [MCP06 - Убацивање упита путем контекстуалних података](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety пружа неколико моћних алата који могу појачати безбедност ваших MCP имплементација. За практично искуство у имплементацији, погледајте [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) камп 3: И/О Безбедност.

## Заштита упита

Microsoft-ове AI заштите упита пружају робусну заштиту од директних и индиректних напада убацивањем упита кроз:

1. **Напредна детекција**: Користи машинско учење за идентификацију злонамерних упутстава уграђених у садржај.
2. **Истакнути приказ**: Трансформише улазни текст како би системи вештачке интелигенције лакше разликовали важећа упутства од спољашњих уноса.
3. **Ограничавачи и означавање података**: Означава границе између поузданих и непоузданих података.
4. **Интеграција Content Safety**: Ради са Azure AI Content Safety како би открио покушаје заобиђања и штетни садржај.
5. **Континуирана ажурирања**: Microsoft редовно ажурира заштитне механизме против нових претњи.

## Имплементација Azure Content Safety са MCP

Овај приступ пружа заштиту на више нивоа:
- Скенирање уноса пре обраде
- Валидација излаза пре враћања
- Коришћење блок-листа за познате штетне обрасце
- Коришћење континуирано ажурираних модела Content Safety из Azure-а

## Ресурси за Azure Content Safety

За више информација о имплементацији Azure Content Safety са вашим MCP серверима, консултујте ове званичне ресурсе:

1. [Azure AI Content Safety документација](https://learn.microsoft.com/azure/ai-services/content-safety/) - Званична документација за Azure Content Safety.
2. [Документација за Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Сазнајте како спречити нападе убацивања упита.
3. [Content Safety API референтни водич](https://learn.microsoft.com/rest/api/contentsafety/) - Детаљан API референтни водич за имплементацију Content Safety.
4. [Брзи почетак: Azure Content Safety са C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Брз водич за имплементацију користећи C#.
5. [Content Safety клиентске библиотеке](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Клијентске библиотеке за различите програмске језике.
6. [Откривање покушаја заобиђања](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Специфична упутства за откривање и спречавање покушаја заобиђања.
7. [Најбоље праксе за Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Најбоље праксе за ефикасну имплементацију content safety.

За детаљнију имплементацију, погледајте наш [водич за имплементацију Azure Content Safety](./azure-content-safety-implementation.md).

## Шта следи

- Прочитајте: [Имплементација Azure Content Safety](./azure-content-safety-implementation.md)
- Вратите се на: [Преглед модула безбедности](./README.md)
- Наставите са: [Модул 3: Почетак рада](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Одрицање одговорности**:
Овај документ је преведен коришћењем АИ услуге за превођење [Co-op Translator](https://github.com/Azure/co-op-translator). Иако се трудимо да превод буде тачан, молимо вас да имате у виду да аутоматизовани преводи могу садржати грешке или нетачности. Изворни документ на његовом изворном језику треба сматрати ауторитетом. За критичне информације препоручује се професионални људски превод. Не сносимо одговорност за било какве неспоразуме или погрешна тумачења настала коришћењем овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->