# Разширена защита на MCP с Azure Content Safety

> **OWASP MCP адресиран риск**: [MCP06 - Инжектиране на подсказки чрез контекстуални натоварвания](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety предоставя няколко мощни инструмента, които могат да подобрят сигурността на вашите реализации на MCP. За практически опит с имплементацията, вижте [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Защити на подсказки (Prompt Shields)

AI защитите на Microsoft за подсказки предоставят здрава защита срещу директни и индиректни атаки чрез инжектиране на подсказки чрез:

1. **Разширено откриване**: Използва машинно обучение за идентифициране на злонамерени инструкции, вградени в съдържанието.
2. **Отбелязване**: Трансформира входния текст, за да помогне на AI системите да различават валидни инструкции от външни входове.
3. **Разделители и маркиране на данни**: Отбелязва границите между доверени и недоверени данни.
4. **Интеграция с Content Safety**: Работи с Azure AI Content Safety за откриване на опити за jailbreak и вредно съдържание.
5. **Постоянни актуализации**: Microsoft редовно обновява защитните механизми срещу нововъзникващи заплахи.

## Имплементиране на Azure Content Safety с MCP

Този подход предоставя многостепенна защита:
- Сканиране на входните данни преди обработка
- Валидиране на изхода преди връщане
- Използване на черни списъци за известни вредни модели
- Използване на непрекъснато обновявани модели за сигурност на съдържанието от Azure

## Ресурси за Azure Content Safety

За да научите повече за имплементирането на Azure Content Safety с вашите MCP сървъри, разгледайте тези официални ресурси:

1. [Документация за Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Официална документация за Azure Content Safety.
2. [Документация за Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Научете как да предотвратите атаки чрез инжектиране на подсказки.
3. [API справочник за Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Подробен API справочник за внедряване на Content Safety.
4. [Бърз старт: Azure Content Safety с C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Ръководство за бързо внедряване с C#.
5. [Клиентски библиотеки за Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Клиентски библиотеки за различни програмни езици.
6. [Откриване на опити за jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Конкретни указания за откриване и предотвратяване на опити за jailbreak.
7. [Добри практики за Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Най-добри практики за ефективно внедряване на сигурност на съдържанието.

За по-задълбочено внедряване вижте нашето [Ръководство за внедряване на Azure Content Safety](./azure-content-safety-implementation.md).

## Какво следва

- Прочетете: [Внедряване на Azure Content Safety](./azure-content-safety-implementation.md)
- Върнете се в: [Обзор на модул Сигурност](./README.md)
- Продължете към: [Модул 3: Започване](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводаческа услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматичните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия оригинален език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Не носим отговорност за каквито и да е недоразумения или погрешни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->