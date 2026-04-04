# Расширенная безопасность MCP с Azure Content Safety

> **Угроза OWASP MCP, решаемая этим методом**: [MCP06 - Инъекция подсказок через контекстные полезные нагрузки](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety предоставляет несколько мощных инструментов, которые могут усилить безопасность ваших реализаций MCP. Для получения практического опыта реализации смотрите [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

AI Prompt Shields от Microsoft обеспечивают надежную защиту от прямых и косвенных атак с инъекцией подсказок за счет:

1. **Продвинутого обнаружения**: Использует машинное обучение для выявления вредоносных инструкций, встроенных в контент.
2. **Выделения**: Преобразует вводимый текст, помогая системам ИИ отличать допустимые инструкции от внешних вводов.
3. **Разделителей и отметок данных**: Отмечает границы между доверенными и недоверенными данными.
4. **Интеграции с Content Safety**: Работает с Azure AI Content Safety для обнаружения попыток взлома и вредоносного контента.
5. **Непрерывных обновлений**: Microsoft регулярно обновляет механизмы защиты от новых угроз.

## Реализация Azure Content Safety с MCP

Этот подход обеспечивает многоуровневую защиту:
- Сканирование входных данных до обработки
- Проверка выходных данных перед возвратом
- Использование черных списков для известных вредоносных шаблонов
- Использование постоянно обновляемых моделей безопасности контента Azure

## Ресурсы Azure Content Safety

Чтобы узнать больше о реализации Azure Content Safety с вашими серверами MCP, обратитесь к этим официальным ресурсам:

1. [Документация Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) — официальная документация по Azure Content Safety.
2. [Документация по Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) — узнайте, как предотвратить атаки с инъекцией подсказок.
3. [Справочник по Content Safety API](https://learn.microsoft.com/rest/api/contentsafety/) — подробный справочник API для реализации Content Safety.
4. [Быстрый старт: Azure Content Safety с C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) — руководство по быстрой реализации с использованием C#.
5. [Клиентские библиотеки Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) — клиентские библиотеки для различных языков программирования.
6. [Обнаружение попыток взлома (jailbreak)](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) — специальные рекомендации по обнаружению и предотвращению попыток взлома.
7. [Лучшие практики для Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) — лучшие практики эффективной реализации безопасности контента.

Для более углубленной реализации см. наше [Руководство по реализации Azure Content Safety](./azure-content-safety-implementation.md).

## Что дальше

- Читайте: [Реализация Azure Content Safety](./azure-content-safety-implementation.md)
- Возврат к: [Обзор модуля безопасности](./README.md)
- Продолжить к: [Модуль 3: Начало работы](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:  
Этот документ был переведен с использованием сервиса автоматического перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, просим учитывать, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обращаться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильное толкование, возникшие в результате использования данного перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->