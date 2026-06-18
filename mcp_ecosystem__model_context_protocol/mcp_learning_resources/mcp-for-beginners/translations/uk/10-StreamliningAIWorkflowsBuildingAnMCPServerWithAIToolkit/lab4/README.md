# 🐙 Модуль 4: Практична розробка MCP — Спеціалізований сервер клонування GitHub

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Швидкий старт:** Створіть MCP сервер, готовий до продакшну, який автоматизує клонування репозиторіїв GitHub та інтеграцію у VS Code за 30 хвилин!

## 🎯 Мета навчання

Наприкінці цієї лабораторної роботи ви зможете:

- ✅ Створити спеціалізований MCP сервер для реальних робочих процесів розробки
- ✅ Реалізувати функціонал клонування репозиторіїв GitHub через MCP
- ✅ Інтегрувати власні MCP сервери з VS Code та Agent Builder
- ✅ Використовувати GitHub Copilot в режимі агента з кастомними MCP інструментами
- ✅ Тестувати та розгортати власні MCP сервери у продакшн середовищах

## 📋 Вимоги

- Завершення лабораторних робіт 1-3 (фундаментальні знання MCP та розробка просунутого рівня)
- Підписка на GitHub Copilot ([доступна безкоштовна реєстрація](https://github.com/github-copilot/signup))
- VS Code з розширеннями Microsoft Foundry Toolkit та GitHub Copilot
- Встановлений та налаштований Git CLI

## 🏗️ Огляд проєкту

### **Реальна задача розробника**
Розробники часто використовують GitHub для клонування репозиторіїв та відкриття їх у VS Code або VS Code Insiders. Цей ручний процес включає:
1. Відкриття терміналу/командного рядка
2. Перехід у потрібну директорію
3. Виконання команди `git clone`
4. Відкриття VS Code у директорії репозиторію

**Наш MCP розв’язок спрощує це до однієї розумної команди!**

### **Що ви створите**
**GitHub Clone MCP Server** (`git_mcp_server`), який надає:

| Функція | Опис | Перевага |
|---------|-------------|---------|
| 🔄 **Інтелектуальне клонування репозиторіїв** | Клонування репозиторіїв GitHub з перевіркою | Автоматична перевірка помилок |
| 📁 **Розумне керування директоріями** | Перевірка та безпечне створення папок | Запобігає перезапису |
| 🚀 **Кросплатформна інтеграція з VS Code** | Відкриття проєктів у VS Code/Insiders | Безперервний робочий процес |
| 🛡️ **Надійна обробка помилок** | Обробка мережевих, дозвільних та шляхо-мінливих проблем | Готовність до продакшн |

---

## 📖 Покрокова реалізація

### Крок 1: Створення агента GitHub у Agent Builder

1. **Запустіть Agent Builder** через розширення Microsoft Foundry Toolkit
2. **Створіть нового агента** з такою конфігурацією:
   ```
   Agent Name: GitHubAgent
   ```

3. **Ініціалізуйте власний MCP сервер:**
   - Перейдіть у **Інструменти** → **Додати інструмент** → **MCP Server**
   - Оберіть **"Create A new MCP Server"**
   - Виберіть **шаблон на Python** для максимальної гнучкості
   - **Назва сервера:** `git_mcp_server`

### Крок 2: Налаштування GitHub Copilot в режимі агента

1. **Відкрийте GitHub Copilot** у VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Виберіть модель агента** в інтерфейсі Copilot
3. **Оберіть модель Claude 3.7** для покращеної логіки та розуміння
4. **Увімкніть інтеграцію MCP** для доступу до інструментів

> **💡 Професійна порада:** Claude 3.7 забезпечує глибше розуміння робочих процесів розробки та шаблонів обробки помилок.

### Крок 3: Реалізація основного функціоналу MCP сервера

**Використовуйте цей детальний запит у GitHub Copilot у режимі агента:**

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

### Крок 4: Тестування MCP сервера

#### 4a. Тестування в Agent Builder

1. **Запустіть конфігурацію налагодження** для Agent Builder
2. **Сконфігуруйте агента з цим системним запитом:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Перевірте на реалістичних сценаріях користувача:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/uk/DebugAgent.81d152370c503241.webp)

**Очікувані результати:**
- ✅ Успішне клонування з підтвердженням шляху
- ✅ Автоматичний запуск VS Code
- ✅ Чіткі повідомлення про помилки у недопустимих випадках
- ✅ Коректна обробка граничних ситуацій

#### 4b. Тестування в MCP Inspector


![MCP Inspector Testing](../../../../translated_images/uk/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Вітаємо!** Ви успішно створили практичний MCP сервер, готовий до застосування у виробництві, що вирішує реальні проблеми робочих процесів розробки. Ваш сервер клонування GitHub демонструє потужність MCP для автоматизації та підвищення продуктивності розробників.

### 🏆 Досягнення:
- ✅ **Розробник MCP** — створили власний MCP сервер
- ✅ **Автоматизатор робочих процесів** — оптимізували процеси розробки  
- ✅ **Експерт інтеграції** — підключили кілька інструментів розробки
- ✅ **Готовність до продакшн** — створили рішення для розгортання

---

## 🎓 Завершення воркшопу: Ваша подорож з Model Context Protocol

**Шановний учаснику воркшопу,**

Вітаємо з проходженням усіх чотирьох модулів воркшопу Model Context Protocol! Ви пройшли великий шлях від ознайомлення з основами Microsoft Foundry Toolkit до створення MCP серверів, готових до продакшн, які розв’язують реальні завдання розробки.

### 🚀 Підсумок вашого шляху навчання:

**[Модуль 1](../lab1/README.md)**: Ви розпочали з вивчення основ Microsoft Foundry Toolkit, тестування моделей і створення першого AI агента.

**[Модуль 2](../lab2/README.md)**: Вивчили архітектуру MCP, інтегрували Playwright MCP та створили першого агента для автоматизації браузера.

**[Модуль 3](../lab3/README.md)**: Поглибилися у розробку власних MCP серверів на прикладі Weather MCP server і оволоділи інструментами налагодження.

**[Модуль 4](../lab4/README.md)**: Застосували все набуте, щоб створити практичний інструмент автоматизації workflow клонування GitHub репозиторіїв.

### 🌟 Що ви освоїли:

- ✅ **Екосистема Microsoft Foundry Toolkit**: Моделі, агенти та патерни інтеграції
- ✅ **Архітектура MCP**: Клієнт-серверна розробка, транспортні протоколи та безпека
- ✅ **Інструменти розробника**: Від Playground до Inspector та продакшн-деплойменту
- ✅ **Кастомна розробка**: Створення, тестування та розгортання власних MCP серверів
- ✅ **Практичні застосування**: Вирішення реальних завдань робочих процесів за допомогою AI

### 🔮 Ваші наступні кроки:

1. **Створіть власний MCP сервер**: Автоматизуйте унікальні робочі процеси
2. **Приєднайтесь до спільноти MCP**: Діліться своїми напрацюваннями та вчіться у інших
3. **Досліджуйте розширену інтеграцію**: Підключайте MCP сервери до корпоративних систем
4. **Внесіть внесок в Open Source**: Допомагайте покращувати інструменти та документацію MCP

Пам’ятайте, що цей воркшоп — лише початок. Екосистема Model Context Protocol швидко розвивається, і ви тепер маєте всі засоби, щоб бути в авангарді інструментів для розробки на базі AI.

**Дякуємо за вашу участь і прагнення до навчання!**

Сподіваємося, цей воркшоп надихнув вас на ідеї, які змінять ваш підхід до створення та роботи з AI-інструментами у розробці.

**Щасливого кодування!**

---

## Що далі

Вітаємо з завершенням усіх лабораторних робіт Модуля 10!

- Назад до: [Огляд Модуля 10](../README.md)
- Продовжити до: [Модуль 11: Практичні лабораторії MCP Server](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->