# Напредна MCP Безбедност са Azure Content Safety

> **ОВАСП MCP Ризик који се решава**: [MCP06 - Намерана превара током уноса](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety пружа неколико моћних алата који могу побољшати безбедност ваших MCP имплементација. За практично искуство у имплементацији, погледајте [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Камп 3: I/O Безбедност.

## Prompt Shields

Microsoft-ови AI Prompt Shields пружају робусну заштиту против директних и индиректних напада убризгавања упита кроз:

1. **Напредно откривање**: Користи машинско учење да идентификује злонамерна упутства уграђена у садржај.
2. **Истакнуће**: Претвара уносе текста да помогне AI системима да разликују важећа упутства од спољних уноса.
3. **Делимитери и обележавање података**: Обележава границе између поузданих и непоузданих података.
4. **Интеграција са Content Safety**: Рад са Azure AI Content Safety за откривање покушаја јаилбрејка и штетног садржаја.
5. **Континуирана ажурирања**: Microsoft редовно ажурира механизме заштите против нових претњи.

## Имплементација Azure Content Safety са MCP

Овај приступ пружа вишеслојну заштиту:
- Скенирање уноса пре обраде
- Валидацију излаза пре враћања
- Коришћење блок-листа за познате штетне обрасце
- Коришћење континуирано ажурираних модела за Content Safety из Azure

## Ресурси за Azure Content Safety

Да бисте сазнали више о имплементацији Azure Content Safety са вашим MCP серверима, консултујте ове званичне ресурсе:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Званична документација за Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Како спречити нападе убризгавања упита.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Детаљан API референт за имплементацију Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Брз водич за имплементацију коришћењем C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Клијент библиотеке за различите програмске језике.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Конкретне смернице за откривање и спречавање покушаја јаилбрејка.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Најбоље праксе за ефикасну имплементацију безбедности садржаја.

За детаљнију имплементацију, погледајте наш [Водич за имплементацију Azure Content Safety](./azure-content-safety-implementation.md).

## Шта следи

- Прочитајте: [Имплементација Azure Content Safety](./azure-content-safety-implementation.md)
- Вратите се на: [Преглед Безбедносног Модула](./README.md)
- Наставите на: [Модул 3: Почетак рада](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->