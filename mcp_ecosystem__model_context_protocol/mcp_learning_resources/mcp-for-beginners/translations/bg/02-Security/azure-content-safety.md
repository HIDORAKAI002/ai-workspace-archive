# Разширена сигурност на MCP с Azure Content Safety

> **Адресиран риск в OWASP MCP**: [MCP06 - Нарушаване на потока на намерение](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety предоставя няколко мощни инструмента, които могат да подобрят сигурността на вашите реализации на MCP. За практически опит с имплементация, вижте [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) лагер 3: I/O сигурност.

## Защити на подсказките (Prompt Shields)

Prompt Shields на Microsoft за AI осигуряват здрава защита срещу директни и косвени атаки чрез инжектиране на подсказки, чрез:

1. **Напреднало откриване**: Използва машинно обучение за идентифициране на злонамерени инструкции, вложени в съдържанието.
2. **Подчертаване**: Преобразува входния текст, за да помогне на AI системите да различават валидни инструкции от външни входове.
3. **Разделители и маркиране на данни**: Отбелязва границите между доверени и недоверени данни.
4. **Интеграция с Content Safety**: Работи с Azure AI Content Safety за откриване на опити за jailbreak и вредно съдържание.
5. **Постоянни актуализации**: Microsoft редовно обновява механизмите за защита срещу нововъзникващи заплахи.

## Имплементиране на Azure Content Safety с MCP

Този подход осигурява многостепенна защита:
- Сканиране на входните данни преди обработка
- Валидиране на изходните данни преди връщане
- Използване на блоклистове за известни вредни модели
- Използване на непрекъснато обновявани модели за безопасност на съдържанието на Azure

## Ресурси за Azure Content Safety

За да научите повече за имплементирането на Azure Content Safety с вашите MCP сървъри, консултирайте се с тези официални ресурси:

1. [Документация за Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Официална документация за Azure Content Safety.
2. [Документация за Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Научете как да предотвратите атаки чрез инжектиране на подсказки.
3. [Справочник на Content Safety API](https://learn.microsoft.com/rest/api/contentsafety/) - Подробен справочник на API за имплементиране на Content Safety.
4. [Quickstart: Azure Content Safety с C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Бързо ръководство за имплементация с C#.
5. [Клиентски библиотеки за Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Клиентски библиотеки за различни програмни езици.
6. [Откриване на опити за jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Специфични указания за откриване и предотвратяване на опити за jailbreak.
7. [Най-добри практики за Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Най-добри практики за ефективно прилагане на сигурността на съдържанието.

За по-задълбочена имплементация вижте нашето [Ръководство за имплементиране на Azure Content Safety](./azure-content-safety-implementation.md).

## Какво следва

- Прочетете: [Имплементиране на Azure Content Safety](./azure-content-safety-implementation.md)
- Върнете се към: [Преглед на модул Сигурност](./README.md)
- Продължете към: [Модул 3: Започване](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->