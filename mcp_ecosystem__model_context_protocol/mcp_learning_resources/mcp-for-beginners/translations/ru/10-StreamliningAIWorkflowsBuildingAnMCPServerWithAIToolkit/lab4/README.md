# 🐙 Модуль 4: Практическая разработка MCP — Пользовательский сервер клонирования GitHub

![Время](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Сложность](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Быстрый старт:** Создайте промышленный MCP сервер, который автоматизирует клонирование репозиториев GitHub и интеграцию с VS Code всего за 30 минут!

## 🎯 Цели обучения

К концу этой лабораторной работы вы сможете:

- ✅ Создавать пользовательский MCP сервер для реальных рабочих процессов разработчиков
- ✅ Реализовывать функциональность клонирования репозиториев GitHub через MCP
- ✅ Интегрировать пользовательские MCP серверы с VS Code и Agent Builder
- ✅ Использовать режим агента GitHub Copilot с пользовательскими MCP инструментами
- ✅ Тестировать и развертывать пользовательские MCP серверы в продуктивных средах

## 📋 Необходимые знания и инструменты

- Завершение лабораторий 1-3 (основы MCP и продвинутую разработку)
- Подписка на GitHub Copilot ([доступна бесплатная регистрация](https://github.com/github-copilot/signup))
- VS Code с расширениями Microsoft Foundry Toolkit и GitHub Copilot
- Установленный и настроенный Git CLI

## 🏗️ Обзор проекта

### **Реальная задача разработки**
Разработчики часто используют GitHub для клонирования репозиториев и открытия их в VS Code или VS Code Insiders. Этот ручной процесс включает:
1. Открытие терминала/командной строки
2. Переход в нужную директорию
3. Выполнение команды `git clone`
4. Открытие VS Code в склонированной папке

**Наш MCP решает эту задачу одной интеллектуальной командой!**

### **Что вы создадите**
**GitHub Clone MCP Server** (`git_mcp_server`), который предлагает:

| Функция | Описание | Польза |
|---------|----------|--------|
| 🔄 **Умное клонирование репозиториев** | Клонирование репозиториев GitHub с проверкой | Автоматическая проверка ошибок |
| 📁 **Интеллектуальное управление директориями** | Безопасная проверка и создание каталогов | Предотвращает перезапись |
| 🚀 **Кроссплатформенная интеграция с VS Code** | Открытие проектов в VS Code/Insiders | Плавный переход в рабочий процесс |
| 🛡️ **Надежная обработка ошибок** | Обработка сетевых, прав доступа и проблем с путями | Надежность для продакшена |

---

## 📖 Пошаговая реализация

### Шаг 1: Создайте агента GitHub в Agent Builder

1. **Запустите Agent Builder** через расширение Microsoft Foundry Toolkit
2. **Создайте нового агента** с следующей конфигурацией:
   ```
   Agent Name: GitHubAgent
   ```

3. **Инициализируйте пользовательский MCP сервер:**
   - Перейдите в **Tools** → **Add Tool** → **MCP Server**
   - Выберите **«Create A new MCP Server»**
   - Выберите **Python шаблон** для максимальной гибкости
   - **Имя сервера:** `git_mcp_server`

### Шаг 2: Настройте режим агента GitHub Copilot

1. **Откройте GitHub Copilot** в VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Выберите модель агента** в интерфейсе Copilot
3. **Выберите модель Claude 3.7** для улучшенной логики рассуждений
4. **Включите интеграцию MCP** для доступа к инструментам

> **💡 Полезный совет:** Claude 3.7 обеспечивает лучшее понимание рабочих процессов разработки и шаблонов обработки ошибок.

### Шаг 3: Реализуйте основную функциональность MCP сервера

**Используйте следующий подробный промпт с режимом агента GitHub Copilot:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Шаг 4: Протестируйте ваш MCP сервер

#### 4a. Тестирование в Agent Builder

1. **Запустите конфигурацию отладки** в Agent Builder
2. **Настройте вашего агента с помощью этой системной подсказки:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Проведите тестирование с реалистичными сценариями использования:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/ru/DebugAgent.81d152370c503241.webp)

**Ожидаемые результаты:**
- ✅ Успешное клонирование с подтверждением пути
- ✅ Автоматический запуск VS Code
- ✅ Чёткие сообщения об ошибках в некорректных ситуациях
- ✅ Корректная обработка граничных случаев

#### 4b. Тестирование в MCP Inspector


![MCP Inspector Testing](../../../../translated_images/ru/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Поздравляем!** Вы успешно создали практичный, промышленный MCP сервер, который решает реальные задачи разработки. Ваш пользовательский сервер клонирования GitHub демонстрирует возможности MCP для автоматизации и повышения продуктивности разработчиков.

### 🏆 Достижения:
- ✅ **Разработчик MCP** — Создан пользовательский MCP сервер
- ✅ **Автоматизатор рабочих процессов** — Оптимизация процессов разработки  
- ✅ **Эксперт по интеграции** — Связь нескольких инструментов разработки
- ✅ **Готовность к продакшену** — Созданы решения для развёртывания

---

## 🎓 Завершение воркшопа: Ваш путь с Model Context Protocol

**Уважаемый участник воркшопа,**

Поздравляем с завершением всех четырёх модулей воркшопа Model Context Protocol! Вы проделали большой путь — от изучения основ Microsoft Foundry Toolkit до создания промышленных MCP серверов, решающих реальные задачи разработки.

### 🚀 Краткий обзор пройденного пути:

**[Модуль 1](../lab1/README.md)**: Вы изучили основы Microsoft Foundry Toolkit, тестировали модели и создали первого AI агента.

**[Модуль 2](../lab2/README.md)**: Изучили архитектуру MCP, интегрировали Playwright MCP и создали первого агента для автоматизации браузера.

**[Модуль 3](../lab3/README.md)**: Погрузились в разработку пользовательских MCP серверов на примере сервера погоды, освоили инструменты отладки.

**[Модуль 4](../lab4/README.md)**: Применили всё на практике, создав автоматизированный инструмент работы с репозиториями GitHub.

### 🌟 Что вы освоили:

- ✅ **Экосистема Microsoft Foundry Toolkit**: модели, агенты и паттерны интеграции
- ✅ **Архитектура MCP**: клиент-серверный дизайн, транспортные протоколы и безопасность
- ✅ **Инструменты разработчика**: от Playground до Inspector и продакшн-развёртывания
- ✅ **Пользовательская разработка**: создание, тестирование и развёртывание MCP серверов
- ✅ **Практические применения**: решение реальных задач рабочих процессов с помощью AI

### 🔮 Ваши следующие шаги:

1. **Создайте свой собственный MCP сервер**: применяйте навыки для автоматизации уникальных процессов
2. **Присоединяйтесь к сообществу MCP**: делитесь своими разработками и учитесь у других
3. **Изучайте продвинутую интеграцию**: связывайте MCP с корпоративными системами
4. **Вносите вклад в Open Source**: помогайте улучшать инструменты и документацию MCP

Помните, этот воркшоп — только начало. Экосистема Model Context Protocol быстро развивается, и теперь вы готовы стоять в авангарде инструментов разработки с AI.

**Спасибо за участие и стремление к обучению!**

Надеемся, этот воркшоп вдохновит вас на преобразование способов создания и взаимодействия с AI инструментами в вашей разработке.

**Удачного кодинга!**

---

## Что дальше

Поздравляем с завершением всех лабораторий модуля 10!

- Вернуться: [Обзор модуля 10](../README.md)
- Продолжить: [Модуль 11: Практические лаборатории MCP Server](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->