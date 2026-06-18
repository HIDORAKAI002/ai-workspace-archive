# 🚀 Moduł 1: Podstawy Microsoft Foundry Toolkit

[![Czas trwania](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Poziom trudności](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Wymagania wstępne](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Cele nauczania

Na koniec tego modułu będziesz potrafić:
- ✅ Zainstalować i skonfigurować rozszerzenie Microsoft Foundry Toolkit dla VS Code
- ✅ Poruszać się po katalogu modeli i rozumieć różne źródła modeli
- ✅ Korzystać z Playground do testowania i eksperymentowania z modelami
- ✅ Tworzyć własnych agentów AI za pomocą Agent Builder
- ✅ Porównywać wydajność modeli różnych dostawców
- ✅ Stosować najlepsze praktyki inżynierii promptów

## 🧠 Wprowadzenie do Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit Extension for VS Code** to flagowe rozszerzenie Microsoft, które przekształca VS Code w kompleksowe środowisko do tworzenia AI. Łączy badania AI z praktycznym tworzeniem aplikacji, czyniąc generatywną AI dostępną dla programistów na każdym poziomie zaawansowania.

### 🌟 Kluczowe możliwości

| Funkcja | Opis | Przykład użycia |
|---------|-------------|----------|
| **🗂️ Katalog modeli** | Dostęp do ponad 100 modeli z GitHub, ONNX, OpenAI, Anthropic, Google | Odkrywanie i wybór modeli |
| **🔌 Obsługa BYOM** | Integracja własnych modeli (lokalnych/zdalnych) | Wdrażanie własnych modeli |
| **🎮 Interaktywny Playground** | Testowanie modeli w czasie rzeczywistym z interfejsem czatu | Szybkie prototypowanie i testowanie |
| **📎 Obsługa multimodalna** | Przetwarzanie tekstu, obrazów i załączników | Złożone aplikacje AI |
| **⚡ Przetwarzanie wsadowe** | Uruchamianie wielu promptów jednocześnie | Efektywne przepływy pracy testowania |
| **📊 Ocena modeli** | Wbudowane metryki (F1, trafność, podobieństwo, spójność) | Ocena wydajności |

### 🎯 Dlaczego Microsoft Foundry Toolkit jest ważny

- **🚀 Przyspieszenie rozwoju**: Od pomysłu do prototypu w kilka minut
- **🔄 Zunifikowany przepływ pracy**: Jeden interfejs dla wielu dostawców AI
- **🧪 Łatwa eksperymentacja**: Porównaj modele bez skomplikowanej konfiguracji
- **📈 Gotowość do produkcji**: Płynne przejście od prototypu do wdrożenia

## 🛠️ Wymagania wstępne i konfiguracja

### 📦 Instalacja rozszerzenia Microsoft Foundry Toolkit

**Krok 1: Otwórz Marketplace rozszerzeń**
1. Otwórz Visual Studio Code
2. Przejdź do widoku rozszerzeń (`Ctrl+Shift+X` lub `Cmd+Shift+X`)
3. Wyszukaj "Microsoft Foundry Toolkit"

**Krok 2: Wybierz swoją wersję**
- **🟢 Wersja stabilna**: Rekomendowana do użytku produkcyjnego
- **🔶 Wersja przedpremierowa**: Wczesny dostęp do najnowszych funkcji

**Krok 3: Zainstaluj i aktywuj**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/pl/aitkext.d28945a03eed003c.webp)

### ✅ Lista kontrolna weryfikacji
- [ ] Ikona Microsoft Foundry Toolkit widoczna w pasku bocznym VS Code
- [ ] Rozszerzenie jest włączone i aktywne
- [ ] Brak błędów instalacji w panelu wyjścia

## 🧪 Ćwiczenie praktyczne 1: Eksploracja modeli GitHub

**🎯 Cel**: Opanuj katalog modeli i przetestuj swój pierwszy model AI

### 📊 Krok 1: Poruszanie się po katalogu modeli

Katalog modeli to twoja brama do ekosystemu AI. Agreguje modele od wielu dostawców, ułatwiając odkrywanie i porównywanie opcji.

**🔍 Przewodnik po nawigacji:**

Kliknij **MODELS - Catalog** w pasku Microsoft Foundry Toolkit

![Katalog modeli](../../../../translated_images/pl/aimodel.263ed2be013d8fb0.webp)

**💡 Przydatna wskazówka**: Szukaj modeli z konkretnymi możliwościami pasującymi do twojego przypadku użycia (np. generowanie kodu, twórcze pisanie, analiza).

**⚠️ Uwaga**: Modele hostowane na GitHub (tzw. modele GitHub) są bezpłatne, ale obowiązują ograniczenia liczby zapytań i tokenów. Aby uzyskać dostęp do modeli spoza GitHub (np. modeli z Azure AI lub innych punktów końcowych), musisz podać odpowiedni klucz API lub uwierzytelnienie.

### 🚀 Krok 2: Dodaj i skonfiguruj swój pierwszy model

**Strategia wyboru modelu:**
- **GPT-4.1**: Najlepszy do złożonych rozumowań i analiz
- **Phi-4-mini**: Lekki, szybkie odpowiedzi dla prostych zadań

**🔧 Proces konfiguracji:**
1. Wybierz **OpenAI GPT-4.1** z katalogu
2. Kliknij **Add to My Models** - dodaje model do twoich modeli
3. Wybierz **Try in Playground**, aby uruchomić środowisko testowe
4. Poczekaj na inicjalizację modelu (pierwsze uruchomienie może chwilę potrwać)

![Konfiguracja Playground](../../../../translated_images/pl/playground.dd6f5141344878ca.webp)

**⚙️ Parametry modelu:**
- **Temperature**: Kontroluje kreatywność (0 = deterministyczny, 1 = kreatywny)
- **Max Tokens**: Maksymalna długość odpowiedzi
- **Top-p**: Próbkowanie jądrowe dla różnorodności odpowiedzi

### 🎯 Krok 3: Opanuj interfejs Playground

Playground to twoje laboratorium eksperymentów AI. Oto jak maksymalnie wykorzystać jego możliwości:

**🎨 Najlepsze praktyki inżynierii promptów:**
1. **Bądź konkretny**: Jasne, szczegółowe instrukcje dają lepsze efekty
2. **Dostarczaj kontekst**: Uwzględnij istotne informacje tła
3. **Używaj przykładów**: Pokaż modelowi, czego oczekujesz na przykładach
4. **Iteruj**: Ulepszaj prompt na podstawie pierwszych wyników

**🧪 Scenariusze testowe:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Wyniki testów](../../../../translated_images/pl/result.1dfcf211fb359cf6.webp)

### 🏆 Wyzwanie: Porównanie wydajności modeli

**🎯 Cel**: Porównaj różne modele z identycznymi promptami, aby zrozumieć ich mocne strony

**📋 Instrukcje:**
1. Dodaj **Phi-4-mini** do swojego środowiska pracy
2. Użyj tego samego promptu zarówno dla GPT-4.1, jak i Phi-4-mini

![zestaw](../../../../translated_images/pl/set.88132df189ecde2c.webp)

3. Porównaj jakość odpowiedzi, szybkość i dokładność
4. Zanotuj swoje obserwacje w sekcji wyników

![Porównanie modeli](../../../../translated_images/pl/compare.97746cd0f9074955.webp)

**💡 Kluczowe wnioski do odkrycia:**
- Kiedy używać LLM vs SLM
- Koszt vs wydajność
- Specjalistyczne możliwości różnych modeli

## 🤖 Ćwiczenie praktyczne 2: Tworzenie własnych agentów z Agent Builder

**🎯 Cel**: Twórz wyspecjalizowanych agentów AI dopasowanych do konkretnych zadań i przepływów pracy

### 🏗️ Krok 1: Poznaj Agent Builder

Agent Builder to miejsce, gdzie Microsoft Foundry Toolkit naprawdę błyszczy. Pozwala tworzyć dedykowanych asystentów AI, którzy łączą moc dużych modeli językowych z indywidualnymi instrukcjami, konkretnymi parametrami i specjalistyczną wiedzą.

**🧠 Komponenty architektury agenta:**
- **Model bazowy**: podstawowy LLM (GPT-4, Groks, Phi itd.)
- **Systemowy prompt**: definiuje osobowość i zachowanie agenta
- **Parametry**: ustawienia dostrojone dla optymalnej wydajności
- **Integracja narzędzi**: łączenie z zewnętrznymi API i usługami MCP
- **Pamięć**: kontekst rozmowy i utrzymanie sesji

![Interfejs Agent Builder](../../../../translated_images/pl/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Krok 2: Głębokie zanurzenie w konfigurację agenta

**🎨 Tworzenie skutecznych systemowych promptów:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Oczywiście, możesz też użyć Generate System Prompt, by AI pomógł wygenerować i zoptymalizować prompt*

**🔧 Optymalizacja parametrów:**
| Parametr | Zalecany zakres | Przypadek użycia |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Odpowiedzi techniczne/faktyczne |
| **Temperature** | 0.7-0.9 | Kreatywne/zadania burzy mózgów |
| **Max Tokens** | 500-1000 | Konkretne odpowiedzi |
| **Max Tokens** | 2000-4000 | Szczegółowe wyjaśnienia |

### 🐍 Krok 3: Ćwiczenie praktyczne - agent programujący w Pythonie

**🎯 Misja**: Stwórz wyspecjalizowanego asystenta kodowania w Pythonie

**📋 Kroki konfiguracji:**

1. **Wybór modelu**: Wybierz **Claude 3.5 Sonnet** (świetny do kodu)

2. **Projekt systemowego promptu:**
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Konfiguracja parametrów:**
   - Temperature: 0.2 (dla spójnego i niezawodnego kodu)
   - Max Tokens: 2000 (szczegółowe wyjaśnienia)
   - Top-p: 0.9 (równowaga kreatywności)

![Konfiguracja agenta Python](../../../../translated_images/pl/pythonagent.5e51b406401c165f.webp)

### 🧪 Krok 4: Testowanie agenta Python

**Scenariusze testowe:**
1. **Prosta funkcja**: "Utwórz funkcję do znajdowania liczb pierwszych"
2. **Złożony algorytm**: "Zaimplementuj drzewo wyszukiwań binarnych z metodami wstawiania, usuwania i wyszukiwania"
3. **Problem z prawdziwego świata**: "Zbuduj scraper internetowy obsługujący ograniczenia liczby zapytań i ponawianie"
4. **Debugowanie**: "Napraw ten kod [wklej błędny kod]"

**🏆 Kryteria sukcesu:**
- ✅ Kod działa bez błędów
- ✅ Zawiera odpowiednią dokumentację
- ✅ Stosuje najlepsze praktyki Pythona
- ✅ Daje klarowne wyjaśnienia
- ✅ Proponuje ulepszenia

## 🎓 Podsumowanie modułu 1 i dalsze kroki

### 📊 Sprawdzenie wiedzy

Sprawdź swoje zrozumienie:
- [ ] Czy potrafisz wyjaśnić różnice między modelami w katalogu?
- [ ] Czy udało ci się stworzyć i przetestować własnego agenta?
- [ ] Czy rozumiesz, jak optymalizować parametry dla różnych zastosowań?
- [ ] Czy potrafisz zaprojektować efektywne systemowe prompty?

### 📚 Dodatkowe materiały

- **Dokumentacja Microsoft Foundry Toolkit**: [Oficjalne Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Przewodnik po inżynierii promptów**: [Najlepsze praktyki](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modele w Microsoft Foundry Toolkit**: [Modele w trakcie rozwoju](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Gratulacje!** Opanowałeś podstawy Microsoft Foundry Toolkit i jesteś gotów tworzyć bardziej zaawansowane aplikacje AI!

### 🔜 Kontynuuj do kolejnego modułu

Gotowy na bardziej zaawansowane funkcje? Przejdź do **[Moduł 2: MCP z Microsoft Foundry Toolkit – podstawy](../lab2/README.md)**, gdzie nauczysz się:
- Łączenia agentów z zewnętrznymi narzędziami za pomocą Model Context Protocol (MCP)
- Tworzenia agentów automatyzacji przeglądarki z Playwright
- Integracji serwerów MCP z agentami Microsoft Foundry Toolkit
- Zasilania agentów zewnętrznymi danymi i możliwościami

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->