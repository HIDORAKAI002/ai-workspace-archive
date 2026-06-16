# Расширенная безопасность MCP с Azure Content Safety

> **Риск OWASP MCP, который устраняется**: [MCP06 - Подмена потока намерений](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety предоставляет несколько мощных инструментов, которые могут повысить безопасность ваших реализаций MCP. Для практического опыта реализации смотрите [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Лагерь 3: Безопасность ввода/вывода.

## Щиты подсказок

AI Prompt Shields от Microsoft обеспечивают надежную защиту как от прямых, так и от косвенных атак с помощью внедрения подсказок через:

1. **Расширенное обнаружение**: использует машинное обучение для выявления вредоносных инструкций, встроенных в контент.
2. **Подсветка**: преобразует входящий текст, помогая AI системам различать допустимые инструкции и внешние данные.
3. **Разделители и метки данных**: обозначают границы между доверенными и недоверенными данными.
4. **Интеграция с Content Safety**: работает с Azure AI Content Safety для обнаружения попыток взлома (jailbreak) и вредоносного контента.
5. **Постоянные обновления**: Microsoft регулярно обновляет механизмы защиты от новых угроз.

## Реализация Azure Content Safety с MCP

Этот подход обеспечивает многоуровневую защиту:
- сканирование входных данных перед обработкой
- проверка выходных данных перед возвратом
- использование блок-листов для известных вредоносных паттернов
- использование постоянно обновляемых моделей Azure Content Safety

## Ресурсы Azure Content Safety

Чтобы узнать больше о реализации Azure Content Safety с вашими MCP серверами, ознакомьтесь с этими официальными ресурсами:

1. [Документация Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Официальная документация по Azure Content Safety.
2. [Документация Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Узнайте, как предотвращать атаки с помощью внедрения подсказок.
3. [Справочник API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Подробное описание API для реализации Content Safety.
4. [Быстрый старт: Azure Content Safety с C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Руководство по быстрой реализации с использованием C#.
5. [Клиентские библиотеки Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Клиентские библиотеки для различных языков программирования.
6. [Обнаружение попыток взлома (jailbreak)](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Специфические рекомендации по обнаружению и предотвращению попыток взлома.
7. [Лучшие практики для Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Лучшие практики для эффективной реализации контентной безопасности.

Для более глубокого понимания реализации смотрите наше [Руководство по реализации Azure Content Safety](./azure-content-safety-implementation.md).

## Что дальше

- Читайте: [Реализация Azure Content Safety](./azure-content-safety-implementation.md)
- Вернуться к: [Обзор модуля безопасности](./README.md)
- Продолжить к: [Модуль 3: Начало работы](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->