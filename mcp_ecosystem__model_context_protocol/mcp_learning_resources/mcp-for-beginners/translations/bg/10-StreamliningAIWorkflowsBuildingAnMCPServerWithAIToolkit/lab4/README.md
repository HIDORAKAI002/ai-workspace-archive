# 🐙 Модул 4: Практическо разработване на MCP - Персонализиран GitHub Clone сървър

![Продължителност](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Трудност](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Бърз старт:** Създайте продукционно готов MCP сървър, който автоматизира клонирането на GitHub хранилища и интеграцията с VS Code само за 30 минути!

## 🎯 Учебни цели

Към края на този лабораторен упражнение ще можете да:

- ✅ Създавате персонализиран MCP сървър за реални разработвачески работни процеси
- ✅ Имплементирате функционалност за клониране на GitHub хранилища чрез MCP
- ✅ Интегрирате персонализирани MCP сървъри с VS Code и Agent Builder
- ✅ Използвате GitHub Copilot Agent Mode с персонализирани MCP инструменти
- ✅ Тествате и разгръщате персонализирани MCP сървъри в продукционни среди

## 📋 Предварителни изисквания

- Завършени лаборатории 1-3 (Основи на MCP и напреднала разработка)
- Абонамент за GitHub Copilot ([налично безплатно регистриране](https://github.com/github-copilot/signup))
- VS Code с разширения Microsoft Foundry Toolkit и GitHub Copilot
- Инсталиран и конфигуриран Git CLI

## 🏗️ Преглед на проекта

### **Реално предизвикателство при разработка**
Като разработчици често използваме GitHub за клониране на хранилища и отварянето им във VS Code или VS Code Insiders. Този ръчен процес включва:
1. Отваряне на терминал/команден прозорец
2. Преминаване към желаната директория
3. Изпълнение на командата `git clone`
4. Отваряне на VS Code в клонираната директория

**Нашето MCP решение оптимизира това в една интелигентна команда!**

### **Какво ще създадете**
**GitHub Clone MCP сървър** (`git_mcp_server`), който предоставя:

| Функция | Описание | Полза |
|---------|-------------|---------|
| 🔄 **Интелигентно клониране на хранилища** | Клонира GitHub хранилища с валидация | Автоматична проверка за грешки |
| 📁 **Интелигентно управление на директории** | Проверява и създава директории безопасно | Предотвратява презаписване |
| 🚀 **Кросплатформена интеграция с VS Code** | Отваря проекти във VS Code/Insiders | Безпроблемен преход в работния процес |
| 🛡️ **Здраво обработване на грешки** | Обработва мрежови, права и път проблеми | Продукционно надеждна работа |

---

## 📖 Стъпка по стъпка имплементация

### Стъпка 1: Създайте GitHub агент в Agent Builder

1. **Стартирайте Agent Builder** през разширението Microsoft Foundry Toolkit
2. **Създайте нов агент** с следната конфигурация:
   ```
   Agent Name: GitHubAgent
   ```

3. **Инициирайте персонализиран MCP сървър:**
   - Отидете в **Tools** → **Add Tool** → **MCP Server**
   - Изберете **"Create A new MCP Server"**
   - Изберете **Python шаблон** за максимална гъвкавост
   - **Име на сървъра:** `git_mcp_server`

### Стъпка 2: Конфигурирайте GitHub Copilot Agent Mode

1. **Отворете GitHub Copilot** в VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Изберете модел на агента** в Copilot интерфейса
3. **Изберете модела Claude 3.7** за подобрени способности за разсъждение
4. **Включете MCP интеграция** за достъп до инструменти

> **💡 Професионален съвет:** Claude 3.7 предоставя по-добро разбиране на разработвачески работни процеси и модели за обработка на грешки.

### Стъпка 3: Имплементирайте основната функционалност на MCP сървъра

**Използвайте следния подробен промпт с GitHub Copilot Agent Mode:**

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

### Стъпка 4: Тествайте вашия MCP сървър

#### 4а. Тествайте в Agent Builder

1. **Стартирайте конфигурацията за дебъгване** в Agent Builder
2. **Конфигурирайте вашия агент със следния системен промпт:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Тествайте с реалистични потребителски сценарии:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Тестване в Agent Builder](../../../../translated_images/bg/DebugAgent.81d152370c503241.webp)

**Очаквани резултати:**
- ✅ Успешно клониране с потвърждение на пътя
- ✅ Автоматично стартиране на VS Code
- ✅ Ясни съобщения за грешки при невалидни сценарии
- ✅ Правилна обработка на гранични случаи

#### 4б. Тествайте в MCP Inspector


![Тестване в MCP Inspector](../../../../translated_images/bg/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Поздравления!** Успешно създадохте практичен, продукционно готов MCP сървър, който решава реални предизвикателства в разработването. Вашият персонализиран GitHub clone сървър демонстрира силата на MCP за автоматизиране и повишаване на продуктивността на разработчиците.

### 🏆 Постигнати успехи:
- ✅ **MCP разработчик** - Създаден персонализиран MCP сървър
- ✅ **Автоматизатор на работни процеси** - Оптимизирани разработки  
- ✅ **Експерт по интеграция** - Свързани множество разработки инструменти
- ✅ **Готов за продукция** - Изградени решения за внедряване

---

## 🎓 Завършване на работилницата: Вашето пътуване с Model Context Protocol

**Уважаеми участник в работилницата,**

Поздравления за завършването на всички четири модула от работилницата Model Context Protocol! Вече сте преминали дълъг път от разбирането на основните концепции на Microsoft Foundry Toolkit до създаването на продукционно готови MCP сървъри, които решават реални предизвикателства при разработката.

### 🚀 Резюме на пътя на вашето обучение:

**[Модул 1](../lab1/README.md)**: Започнахте с изучаване на основите на Microsoft Foundry Toolkit, тестване на модели и създаване на първия AI агент.

**[Модул 2](../lab2/README.md)**: Научихте архитектурата на MCP, интегрирахте Playwright MCP и създадохте първия си агент за автоматизация на браузър.

**[Модул 3](../lab3/README.md)**: Развихте се в персонализирана разработка на MCP сървъри с Weather MCP сървъра и овладяхте инструментите за дебъгване.

**[Модул 4](../lab4/README.md)**: Сега приложихте всичко, за да създадете практичен инструмент за автоматизация на работен процес с GitHub хранилища.

### 🌟 Какво сте усвоили:

- ✅ **Екосистема Microsoft Foundry Toolkit**: Модели, агенти и интеграционни шаблони
- ✅ **Архитектура MCP**: Клиент-сървър дизайн, транспортни протоколи и сигурност
- ✅ **Инструменти за разработчици**: От Playground до Inspector и продукционно разгръщане
- ✅ **Персонализирана разработка**: Създаване, тестване и разгръщане на ваши MCP сървъри
- ✅ **Практически приложения**: Решаване на реални работни процеси чрез AI

### 🔮 Следващи стъпки:

1. **Създайте свой собствен MCP сървър**: Прилагайте тези умения за автоматизиране на уникални работни процеси
2. **Присъединете се към MCP общността**: Споделяйте създаденото и учете от други
3. **Изследвайте напреднала интеграция**: Свържете MCP сървъри с корпоративни системи
4. **Допринасяйте в Open Source**: Помагайте за подобряване на MCP инструментите и документацията

Запомнете, че тази работилница е само началото. Екосистемата на Model Context Protocol се развива бързо и вие вече сте оборудвани да бъдете на предната линия на AI-базирани инструменти за разработка.

**Благодарим ви за участието и отдадеността към ученето!**

Надяваме се тази работилница да е събудила идеи, които ще трансформират начина, по който създавате и взаимодействате с AI инструменти в своя разработвачески път.

**Приятно програмиране!**

---

## Какво следва

Поздравления за успешно завършване на всички лаборатории в Модул 10!

- Обратно към: [Преглед на Модул 10](../README.md)
- Продължете към: [Модул 11: Практически лаборатории за MCP сървъри](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->