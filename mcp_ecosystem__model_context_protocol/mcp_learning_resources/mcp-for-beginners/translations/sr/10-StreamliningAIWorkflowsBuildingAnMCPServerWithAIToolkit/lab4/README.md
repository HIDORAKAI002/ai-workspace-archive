# 🐙 Модул 4: Практични MCP развој - Прилагођени GitHub клон сервер

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Брзи почетак:** Направите MCP сервер спреман за производњу који аутоматизује клонирање GitHub репозиторијума и интеграцију са VS Code за само 30 минута!

## 🎯 Циљеви учења

На крају ове лабораторије, моћи ћете да:

- ✅ Креирате прилагођени MCP сервер за развојне токове из стварног света
- ✅ Имплементирате функционалност клонирања GitHub репозиторијума преко MCP-а
- ✅ Интегришете прилагођене MCP сервере са VS Code-ом и Agent Builder-ом
- ✅ Користите GitHub Copilot Agent Mode са прилагођеним MCP алатима
- ✅ Тестирате и постављате прилагођене MCP сервере у продукцијска окружења

## 📋 Предуслови

- Завршетак лабораторија 1-3 (MCP основе и напредни развој)
- Претплата на GitHub Copilot ([доступна бесплатна регистрација](https://github.com/github-copilot/signup))
- VS Code са Microsoft Foundry Toolkit и GitHub Copilot екстензијама
- Инсталиран и конфигурисан Git CLI

## 🏗️ Преглед пројекта

### **Изазов развоја из стварног света**
Као развијачи, често користимо GitHub за клонирање репозиторијума и отварање у VS Code или VS Code Insiders. Овај ручни процес подразумева:
1. Отварање терминала/командне линије
2. Навигацију до жељеног директоријума
3. Покретање `git clone` команде
4. Отварање VS Code у клонираном директоријуму

**Наш MCP решење ове кораке своди на једну интелигентну команду!**

### **Шта ћете направити**
**GitHub Clone MCP Server** (`git_mcp_server`) који нуди:

| Карактеристика | Опис | Корист |
|---------|-------------|---------|
| 🔄 **Паметно клонирање репозиторијума** | Клонира GitHub репозиторијуме са валидацијом | Аутоматска проверa грешака |
| 📁 **Интелигентно управљање директоријумима** | Провера и сигурно креирање директоријума | Спадање преуписивања |
| 🚀 **Крос-платформска интеграција са VS Code-ом** | Отварање пројеката у VS Code/Insiders | Беспрекоран прелазак у радни ток |
| 🛡️ **Отпорно руковање грешкама** | Обрада мрежних, дозволних и путних проблема | Поузданост за продукцију |

---

## 📖 Имплементација корак по корак

### Корак 1: Креирање GitHub агента у Agent Builder-у

1. **Покрените Agent Builder** кроз Microsoft Foundry Toolkit екстензију
2. **Креирајте новог агента** са следећом конфигурацијом:
   ```
   Agent Name: GitHubAgent
   ```

3. **Иницијализујте прилагођени MCP сервер:**
   - Идите на **Tools** → **Add Tool** → **MCP Server**
   - Изаберите **"Create A new MCP Server"**
   - Изаберите **Python шаблон** за максималну флексибилност
   - **Име сервера:** `git_mcp_server`

### Корак 2: Конфигуришите GitHub Copilot Agent Mode

1. **Отворите GitHub Copilot** у VS Code-у (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Изаберите Agent Mode** у Copilot интерфејсу
3. **Одаберите Claude 3.7 модел** за побољшане могућности резоновања
4. **Омогућите MCP интеграцију** за приступ алатима

> **💡 Професионални савет:** Claude 3.7 пружа одлично разумевање развојних токова и образаца руковања грешкама.

### Корак 3: Имплементирајте основну функционалност MCP сервера

**Користите следећи детаљни упит са GitHub Copilot Agent Mode:**

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

### Корак 4: Тестирајте свој MCP сервер

#### 4a. Тестирање у Agent Builder-у

1. **Покрените debug конфигурацију** за Agent Builder
2. **Конфигуришите свог агента овим системским упитом:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Тестирајте са реалистичним корисничким сценаријима:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/sr/DebugAgent.81d152370c503241.webp)

**Очекују се резултати:**
- ✅ Успешно клонирање са потврдом путање
- ✅ Аутоматско покретање VS Code-а
- ✅ Јасне поруке о грешкама за неважеће сценарије
- ✅ Исправна обрада рубних случајева

#### 4b. Тестирање у MCP Inspector-у

![MCP Inspector Testing](../../../../translated_images/sr/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Честитамо!** Успешно сте направили практичан MCP сервер спреман за производњу који решава стварне изазове развојних токова. Ваш прилагођени GitHub клон сервер демонстрира снагу MCP-а за аутоматизацију и побољшање продуктивности програмера.

### 🏆 Достигнуће:
- ✅ **MCP Developer** - Креиран прилагођени MCP сервер
- ✅ **Workflow Automator** - Поједностављени развојни процеси  
- ✅ **Integration Expert** - Повезани бројни развојни алати
- ✅ **Production Ready** - Направљена решења спремна за постављање

---

## 🎓 Завршетак радионице: Ваш пут са Model Context Protocol

**Поштовани учесниче радионице,**

Честитамо на завршетку свих четири модула радионице Model Context Protocol! Прешли сте дуг пут од разумевања основа Microsoft Foundry Toolkit-а, преко изградње првих AI агената, до креирања серверa спремних за производњу који решавају стварне развојне изазове.

### 🚀 Преглед вашег пута учења:

**[Модул 1](../lab1/README.md)**: Започели сте упознавањем основа Microsoft Foundry Toolkit-а, тестирањем модела и креирањем првог AI агента.

**[Модул 2](../lab2/README.md)**: Научили сте MCP архитектуру, интегрисали Playwright MCP, и направили првог агента за аутоматизацију прегледача.

**[Модул 3](../lab3/README.md)**: Напредовали сте ка развоју прилагођених MCP сервера са Weather MCP сервером и овладали алатима за дебаговање.

**[Модул 4](../lab4/README.md)**: Сада сте применили све за прављење практичног алата за аутоматизацију GitHub репозиторијума.

### 🌟 Шта сте савладали:

- ✅ **Екосистем Microsoft Foundry Toolkit-а**: Модели, агенти и интеграциони обрасци
- ✅ **MCP архитектуру**: Клијент-серверски дизајн, транспортни протоколи и безбедност
- ✅ **Развојне алате**: Од Playground-а до Inspektora и продукцијских окружења
- ✅ **Прилагођени развој**: Изградњу, тестирање и постављање сопствених MCP сервера
- ✅ **Практичне примене**: Решавање изазова стварних развојних токова помоћу AI

### 🔮 Ваши наредни кораци:

1. **Направите свој MCP сервер**: Примените ове вештине да аутоматизујете своје јединствене токове рада
2. **Придружите се MCP заједници**: Делите своје пројекте и учите од других
3. **Истражите напредну интеграцију**: Повежите MCP сервере са системима у предузећу
4. **Учествујте у open source-у**: Помозите у побољшању MCP алата и документације

Запамтите, ова радионица је само почетак. Екосистем Model Context Protocol-а брзо се развија, а ви сте сада спремни да будете на челу алата за развој подржаних вештачком интелигенцијом.

**Хвала вам на учешћу и посвећености учењу!**

Надамо се да је ова радионица покренула идеје које ће претворити начин на који кодирате и сарађујете са AI алатима током вашег развојног пута.

**Срећно програмирање!**

---

## Шта следи

Честитамо на завршетку свих лабораторија у Модулу 10!

- Назад на: [Преглед Модула 10](../README.md)
- Наставите ка: [Модул 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->