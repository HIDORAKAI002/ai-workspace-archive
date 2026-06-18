# 🐙 Moduł 4: Praktyczny rozwój MCP - Własny serwer klonujący GitHub

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Szybki start:** Zbuduj produkcyjny serwer MCP automatyzujący klonowanie repozytoriów GitHub i integrację z VS Code w zaledwie 30 minut!

## 🎯 Cele nauki

Pod koniec tego laboratorium będziesz potrafił:

- ✅ Utworzyć niestandardowy serwer MCP do rzeczywistych przepływów pracy programistycznej
- ✅ Zaimplementować funkcjonalność klonowania repozytoriów GitHub za pośrednictwem MCP
- ✅ Zintegrować własne serwery MCP z VS Code i Agent Builder
- ✅ Korzystać z trybu agenta GitHub Copilot z niestandardowymi narzędziami MCP
- ✅ Testować i wdrażać niestandardowe serwery MCP w środowiskach produkcyjnych

## 📋 Wymagania wstępne

- Ukończenie laboratoriów 1-3 (podstawy MCP i zaawansowany rozwój)
- Subskrypcja GitHub Copilot ([dostępna darmowa rejestracja](https://github.com/github-copilot/signup))
- VS Code z rozszerzeniami Microsoft Foundry Toolkit oraz GitHub Copilot
- Zainstalowany i skonfigurowany Git CLI

## 🏗️ Przegląd projektu

### **Rzeczywiste wyzwanie developerskie**
Jako programiści często korzystamy z GitHub, aby klonować repozytoria i otwierać je w VS Code lub VS Code Insiders. Ten ręczny proces polega na:
1. Otworzeniu terminala/powłoki poleceń
2. Nawigacji do wybranego katalogu
3. Uruchomieniu polecenia `git clone`
4. Otwarciu VS Code w sklonowanym katalogu

**Nasze rozwiązanie MCP upraszcza to do jednego inteligentnego polecenia!**

### **Co zbudujesz**
**GitHub Clone MCP Server** (`git_mcp_server`), który zapewnia:

| Funkcja | Opis | Korzyść |
|---------|-------------|---------|
| 🔄 **Inteligentne klonowanie repozytorium** | Klonowanie repozytoriów GitHub z walidacją | Zautomatyzowane sprawdzanie błędów |
| 📁 **Inteligentne zarządzanie katalogami** | Bezpieczna kontrola i tworzenie katalogów | Zapobiega nadpisywaniu |
| 🚀 **Wieloplatformowa integracja z VS Code** | Otwieranie projektów w VS Code/Insiders | Płynne przejście w przepływie pracy |
| 🛡️ **Solidna obsługa błędów** | Obsługa problemów z siecią, uprawnieniami i ścieżkami | Gotowość do produkcji |

---

## 📖 Realizacja krok po kroku

### Krok 1: Utwórz agenta GitHub w Agent Builder

1. **Uruchom Agent Builder** za pomocą rozszerzenia Microsoft Foundry Toolkit
2. **Utwórz nowego agenta** z następującą konfiguracją:
   ```
   Agent Name: GitHubAgent
   ```

3. **Zainicjuj niestandardowy serwer MCP:**
   - Przejdź do **Narzędzia** → **Dodaj narzędzie** → **Serwer MCP**
   - Wybierz **„Utwórz nowy serwer MCP”**
   - Wybierz szablon **Python** dla maksymalnej elastyczności
   - **Nazwa serwera:** `git_mcp_server`

### Krok 2: Skonfiguruj tryb agenta GitHub Copilot

1. **Otwórz GitHub Copilot** w VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Wybierz model agenta** w interfejsie Copilot
3. **Wybierz model Claude 3.7** dla lepszych zdolności rozumowania
4. **Włącz integrację MCP** dla dostępu do narzędzi

> **💡 Profesjonalna wskazówka:** Claude 3.7 zapewnia lepsze rozumienie przepływów pracy i wzorców obsługi błędów.

### Krok 3: Zaimplementuj podstawową funkcjonalność serwera MCP

**Użyj poniższego szczegółowego polecenia z trybem agenta GitHub Copilot:**

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

### Krok 4: Przetestuj swój serwer MCP

#### 4a. Test w Agent Builder

1. **Uruchom konfigurację debugowania** w Agent Builder
2. **Skonfiguruj swojego agenta z tym poleceniem systemowym:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Przetestuj na realistycznych scenariuszach użytkownika:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/pl/DebugAgent.81d152370c503241.webp)

**Oczekiwane wyniki:**
- ✅ Pomyślne klonowanie z potwierdzeniem ścieżki
- ✅ Automatyczne uruchomienie VS Code
- ✅ Jasne komunikaty o błędach dla nieprawidłowych scenariuszy
- ✅ Poprawna obsługa nietypowych przypadków

#### 4b. Test w MCP Inspector


![MCP Inspector Testing](../../../../translated_images/pl/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Gratulacje!** Udało Ci się stworzyć praktyczny, produkcyjny serwer MCP, który rozwiązuje rzeczywiste wyzwania developerskie. Twój własny serwer do klonowania GitHub pokazuje moc MCP w automatyzacji i zwiększaniu produktywności programistów.

### 🏆 Odblokowane osiągnięcia:
- ✅ **Programista MCP** - Utworzono niestandardowy serwer MCP
- ✅ **Automator przepływów pracy** - Uproszczone procesy rozwojowe  
- ✅ **Ekspert integracji** - Połączono wiele narzędzi developerskich
- ✅ **Gotowość produkcyjna** - Zbudowano rozwiązania gotowe do wdrożenia

---

## 🎓 Zakończenie warsztatów: Twoja podróż z Model Context Protocol

**Drogi Uczestniku Warsztatów,**

Gratulacje z okazji ukończenia wszystkich czterech modułów warsztatów Model Context Protocol! Przeszedłeś długą drogę, od poznania podstaw Microsoft Foundry Toolkit po budowę produkcyjnych serwerów MCP, które rozwiązują rzeczywiste wyzwania deweloperskie.

### 🚀 Podsumowanie ścieżki nauki:

**[Moduł 1](../lab1/README.md)**: Zacząłeś od poznawania podstaw Microsoft Foundry Toolkit, testowania modeli i tworzenia pierwszego agenta AI.

**[Moduł 2](../lab2/README.md)**: Poznałeś architekturę MCP, zintegrowałeś Playwright MCP i stworzyłeś pierwszego agenta do automatyzacji przeglądarki.

**[Moduł 3](../lab3/README.md)**: Przeszedłeś do zaawansowanego rozwoju niestandardowych serwerów MCP z Weather MCP i opanowałeś narzędzia debugowania.

**[Moduł 4](../lab4/README.md)**: Teraz zastosowałeś wszystko, tworząc praktyczne narzędzie automatyzujące przepływ pracy z repozytoriami GitHub.

### 🌟 Co opanowałeś:

- ✅ **Ekosystem Microsoft Foundry Toolkit**: Modele, agenci i wzorce integracji
- ✅ **Architektura MCP**: Projekt klient-serwer, protokoły transportowe i bezpieczeństwo
- ✅ **Narzędzia developerskie**: Od Playground do Inspector i wdrożeń produkcyjnych
- ✅ **Niestandardowy rozwój**: Tworzenie, testowanie i wdrażanie własnych serwerów MCP
- ✅ **Praktyczne zastosowania**: Rozwiązywanie rzeczywistych problemów workflow za pomocą AI

### 🔮 Twoje następne kroki:

1. **Zbuduj własny serwer MCP**: Wykorzystaj te umiejętności, aby zautomatyzować swoje unikalne procesy pracy
2. **Dołącz do społeczności MCP**: Dziel się swoimi projektami i ucz się od innych
3. **Eksploruj zaawansowaną integrację**: Połącz serwery MCP z systemami korporacyjnymi
4. **Wspieraj open source**: Pomóż ulepszać narzędzia i dokumentację MCP

Pamiętaj, że ten warsztat to dopiero początek. Ekosystem Model Context Protocol szybko się rozwija, a Ty masz teraz narzędzia, by być na czele rozwoju narzędzi programistycznych wspieranych AI.

**Dziękujemy za udział i zaangażowanie w naukę!**

Mamy nadzieję, że ten warsztat zainspirował Cię do nowych pomysłów, które zmienią sposób budowania i wykorzystywania narzędzi AI w Twojej pracy programistycznej.

**Szczęśliwego kodowania!**

---

## Co dalej

Gratulacje z ukończenia wszystkich laboratoriów w Module 10!

- Wróć do: [Przegląd Modułu 10](../README.md)
- Kontynuuj do: [Moduł 11: Laboratoria MCP Server Hands-On](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->