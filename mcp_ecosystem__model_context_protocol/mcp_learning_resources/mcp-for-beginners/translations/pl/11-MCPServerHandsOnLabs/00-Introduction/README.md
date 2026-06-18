# Wprowadzenie do integracji bazy danych MCP

## 🎯 Czego dotyczy to laboratorium

To wprowadzenie zapewnia kompleksowy przegląd budowania serwerów Model Context Protocol (MCP) z integracją bazy danych. Poznasz przypadek biznesowy, architekturę techniczną oraz rzeczywiste zastosowania na przykładzie analityki detalicznej Zava Retail dostępnej pod adresem https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Przegląd

**Model Context Protocol (MCP)** umożliwia asystentom AI bezpieczny dostęp do zewnętrznych źródeł danych i interakcję z nimi w czasie rzeczywistym. W połączeniu z integracją bazy danych MCP otwiera potężne możliwości dla aplikacji AI opartych na danych.

Ten kurs nauczy Cię budować produkcyjne serwery MCP, które łączą asystentów AI z danymi sprzedaży detalicznej poprzez PostgreSQL, wdrażając przedsiębiorcze wzorce takie jak Row Level Security, wyszukiwanie semantyczne i dostęp wielo-najemny do danych.

## Cele nauki

Po ukończeniu tego laboratorium będziesz potrafił:

- **Zdefiniować** Model Context Protocol i jego kluczowe korzyści dla integracji z bazą danych  
- **Zidentyfikować** kluczowe elementy architektury serwera MCP z bazami danych  
- **Zrozumieć** przypadek biznesowy Zava Retail i jego wymagania  
- **Rozpoznać** wzorce biznesowe dla bezpiecznego i skalowalnego dostępu do bazy danych  
- **Wypisać** narzędzia i technologie używane w tym kursie  

## 🧭 Wyzwanie: AI spotyka dane ze świata rzeczywistego

### Ograniczenia tradycyjnej AI

Współczesne asystenty AI są niezwykle potężne, lecz napotykają znaczące ograniczenia podczas pracy z rzeczywistymi danymi biznesowymi:

| **Wyzwanie** | **Opis** | **Wpływ biznesowy** |
|--------------|-----------|---------------------|
| **Statyczna wiedza** | Modele AI trenowane na stałych zbiorach danych nie mają dostępu do aktualnych danych biznesowych | Przestarzałe informacje, utracone okazje |
| **Silosy danych** | Informacje zamknięte w bazach danych, API i systemach niedostępnych dla AI | Niepełne analizy, rozfragmentowane procesy |
| **Ograniczenia bezpieczeństwa** | Bezpośredni dostęp do bazy danych budzi obawy o bezpieczeństwo i zgodność | Ograniczona implementacja, manualne przygotowanie danych |
| **Złożone zapytania** | Użytkownicy biznesowi potrzebują wiedzy technicznej, by wydobyć dane i wnioski | Mniejsza adopcja, nieefektywne procesy |

### Rozwiązanie MCP

Model Context Protocol radzi sobie z tymi wyzwaniami oferując:

- **Dostęp do danych w czasie rzeczywistym**: asystenci AI zapytują aktywne bazy danych i API  
- **Bezpieczną integrację**: kontrolowany dostęp z uwierzytelnianiem i uprawnieniami  
- **Interfejs w języku naturalnym**: użytkownicy biznesowi zadają pytania po angielsku  
- **Standardowy protokół**: działa na różnych platformach i narzędziach AI  

## 🏪 Poznaj Zava Retail: nasze studium przypadku https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

W trakcie tego kursu zbudujemy serwer MCP dla **Zava Retail**, fikcyjnej sieci detalicznej DIY z wieloma lokalizacjami sklepów. Ta realistyczna sytuacja demonstruje implementację MCP na poziomie przedsiębiorstwa.

### Kontekst biznesowy

**Zava Retail** prowadzi:  
- **8 sklepów fizycznych** w stanie Waszyngton (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 sklep internetowy** do sprzedaży e-commerce  
- **Zróżnicowany katalog produktów** obejmujący narzędzia, sprzęt, artykuły ogrodnicze i materiały budowlane  
- **Wielopoziomowe zarządzanie** z kierownikami sklepów, menedżerami regionalnymi i kadrą zarządzającą  

### Wymagania biznesowe

Kierownicy sklepów i zarząd potrzebują analityki zasilanej AI, aby:  

1. **Analizować wyniki sprzedaży** w poszczególnych sklepach i okresach  
2. **Śledzić poziomy zapasów** i określać potrzeby uzupełnień  
3. **Rozumieć zachowania klientów** i wzorce zakupowe  
4. **Odkrywać informacje o produktach** poprzez wyszukiwanie semantyczne  
5. **Generować raporty** za pomocą zapytań w języku naturalnym  
6. **Zapewniać bezpieczeństwo danych** przez kontrolę dostępu opartego na rolach  

### Wymagania techniczne

Serwer MCP musi zapewniać:

- **Wielo-najemny dostęp do danych**, gdzie kierownicy widzą dane tylko swojego sklepu  
- **Elastyczne zapytania** obsługujące złożone operacje SQL  
- **Wyszukiwanie semantyczne** do odkrywania produktów i rekomendacji  
- **Dane w czasie rzeczywistym** odzwierciedlające aktualny stan biznesu  
- **Bezpieczne uwierzytelnianie** z bezpieczeństwem na poziomie wiersza  
- **Skalowalną architekturę** obsługującą wielu równoczesnych użytkowników  

## 🏗️ Przegląd architektury serwera MCP

Nasz serwer MCP implementuje warstwową architekturę zoptymalizowaną pod integrację z bazą danych:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Kluczowe elementy

#### **1. Warstwa serwera MCP**
- **FastMCP Framework**: nowoczesna implementacja serwera MCP w Pythonie  
- **Rejestracja narzędzi**: deklaratywna definicja narzędzi z bezpieczeństwem typów  
- **Kontekst zapytania**: tożsamość użytkownika i zarządzanie sesją  
- **Obsługa błędów**: solidne zarządzanie błędami i logowanie  

#### **2. Warstwa integracji bazy danych**
- **Pooling połączeń**: efektywne zarządzanie połączeniami asyncpg  
- **Dostawca schematu**: dynamiczne wykrywanie schematów tabel  
- **Egzekutor zapytań**: bezpieczne wykonywanie SQL z kontekstem RLS  
- **Zarządzanie transakcjami**: zgodność ACID i obsługa rollback  

#### **3. Warstwa bezpieczeństwa**
- **Row Level Security**: PostgreSQL RLS dla izolacji danych wielo-najemnych  
- **Tożsamość użytkownika**: uwierzytelnianie i autoryzacja kierowników sklepów  
- **Kontrola dostępu**: drobiazgowe uprawnienia i audyt  
- **Walidacja danych wejściowych**: zapobieganie SQL injection i weryfikacja zapytań  

#### **4. Warstwa ulepszeń AI**
- **Wyszukiwanie semantyczne**: wektorowe osadzenia do odkrywania produktów  
- **Integracja Azure OpenAI**: generowanie osadzeń tekstowych  
- **Algorytmy podobieństwa**: wyszukiwanie kosinusowe pgvector  
- **Optymalizacja wyszukiwania**: indeksowanie i tuning wydajności  

## 🔧 Stos technologiczny

### Technologie bazowe

| **Komponent** | **Technologia** | **Cel** |
|---------------|-----------------|---------|
| **Framework MCP** | FastMCP (Python) | Nowoczesna implementacja serwera MCP |
| **Baza danych** | PostgreSQL 17 + pgvector | Dane relacyjne z wyszukiwaniem wektorowym |
| **Usługi AI** | Azure OpenAI | Osadzenia tekstowe i modele językowe |
| **Konteneryzacja** | Docker + Docker Compose | Środowisko deweloperskie |
| **Chmura** | Microsoft Azure | Wdrożenie produkcyjne |
| **Integracja IDE** | VS Code | Chat AI i workflow programistyczny |

### Narzędzia programistyczne

| **Narzędzie** | **Cel** |
|---------------|---------|
| **asyncpg** | Wydajny sterownik PostgreSQL |
| **Pydantic** | Walidacja i serializacja danych |
| **Azure SDK** | Integracja usług chmurowych |
| **pytest** | Framework testowy |
| **Docker** | Konteneryzacja i wdrożenie |

### Stos produkcyjny

| **Usługa** | **Zasób Azure** | **Cel** |
|------------|-----------------|---------|
| **Baza danych** | Azure Database for PostgreSQL | Zarządzana usługa bazodanowa |
| **Kontener** | Azure Container Apps | Hostowanie kontenerów bezserwerowych |
| **Usługi AI** | Microsoft Foundry | Modele i endpointy OpenAI |
| **Monitorowanie** | Application Insights | Obserwowalność i diagnostyka |
| **Bezpieczeństwo** | Azure Key Vault | Zarządzanie sekretami i konfiguracją |

## 🎬 Scenariusze użycia w rzeczywistości

Zobaczmy, jak różni użytkownicy wchodzą w interakcję z naszym serwerem MCP:

### Scenariusz 1: Przegląd wyników kierownika sklepu

**Użytkownik**: Sarah, kierownik sklepu w Seattle  
**Cel**: Analiza wyników sprzedaży za ostatni kwartał

**Zapytanie w języku naturalnym**:
> „Pokaż top 10 produktów według przychodu dla mojego sklepu w Q4 2024”

**Co się dzieje**:  
1. VS Code AI Chat wysyła zapytanie do serwera MCP  
2. Serwer MCP identyfikuje kontekst sklepu Sarah (Seattle)  
3. Polityki RLS filtrują dane tylko dla sklepu Seattle  
4. Generowane i wykonywane jest zapytanie SQL  
5. Wyniki formatowane i zwracane do AI Chat  
6. AI dostarcza analizę i wnioski  

### Scenariusz 2: Odkrywanie produktów przy pomocy wyszukiwania semantycznego

**Użytkownik**: Mike, menedżer zapasów  
**Cel**: Znaleźć produkty podobne do zapytania klienta

**Zapytanie w języku naturalnym**:
> „Jakie produkty sprzedajemy, które są podobne do ‚wodoodpornych złącz elektrycznych do użytku zewnętrznego’?”

**Co się dzieje**:  
1. Zapytanie przetwarzane przez narzędzie wyszukiwania semantycznego  
2. Azure OpenAI generuje wektor osadzenia  
3. pgvector wykonuje wyszukiwanie podobieństwa  
4. Produkty powiązane klasyfikowane wg trafności  
5. Wyniki zawierają szczegóły produktów i dostępność  
6. AI sugeruje alternatywy i pakiety produktów  

### Scenariusz 3: Analiza między sklepami

**Użytkownik**: Jennifer, menedżer regionalny  
**Cel**: Porównać wyniki we wszystkich sklepach

**Zapytanie w języku naturalnym**:
> „Porównaj sprzedaż według kategorii dla wszystkich sklepów w ostatnich 6 miesiącach”

**Co się dzieje**:  
1. Kontekst RLS ustawiany dla dostępu menedżera regionalnego  
2. Generowane jest złożone zapytanie wielosklepowe  
3. Dane agregowane ze wszystkich lokalizacji  
4. Wyniki zawierają trendy i porównania  
5. AI identyfikuje spostrzeżenia i rekomendacje  

## 🔒 Szczegóły dotyczące bezpieczeństwa i wielo-najemności

Nasza implementacja kładzie nacisk na bezpieczeństwo na poziomie przedsiębiorstwa:

### Row Level Security (RLS)

PostgreSQL RLS zapewnia izolację danych:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Zarządzanie tożsamością użytkownika

Każde połączenie MCP zawiera:  
- **ID kierownika sklepu**: unikalny identyfikator dla kontekstu RLS  
- **Przypisanie roli**: uprawnienia i poziomy dostępu  
- **Zarządzanie sesją**: bezpieczne tokeny uwierzytelniające  
- **Logowanie audytu**: pełna historia dostępu  

### Ochrona danych

Wiele warstw bezpieczeństwa:  
- **Szyfrowanie połączeń**: TLS dla wszystkich połączeń z bazą danych  
- **Zapobieganie SQL injection**: tylko zapytania parametryzowane  
- **Walidacja danych wejściowych**: kompleksowa weryfikacja zapytań  
- **Obsługa błędów**: brak ujawniania danych w komunikatach o błędach  

## 🎯 Kluczowe wnioski

Po ukończeniu wprowadzenia powinieneś rozumieć:

✅ **Wartość MCP**: jak MCP łączy asystentów AI z danymi rzeczywistymi  
✅ **Kontekst biznesowy**: wymagania i wyzwania Zava Retail  
✅ **Przegląd architektury**: kluczowe komponenty i ich interakcje  
✅ **Stos technologiczny**: narzędzia i frameworki używane w kursie  
✅ **Model bezpieczeństwa**: wielo-najemny dostęp i ochrona danych  
✅ **Wzorce użycia**: rzeczywiste scenariusze zapytań i procesy  

## 🚀 Co dalej

Gotowy na dalszą naukę? Kontynuuj z:

**[Lab 01: Core Architecture Concepts](../01-Architecture/README.md)**

Poznasz wzorce architektury serwera MCP, zasady projektowania baz danych oraz szczegółową implementację techniczną stojącą za rozwiązaniem analityki detalicznej.

## 📚 Dodatkowe zasoby

### Dokumentacja MCP
- [MCP Specification](https://modelcontextprotocol.io/docs/) - Oficjalna dokumentacja protokołu  
- [MCP for Beginners](https://aka.ms/mcp-for-beginners) - Kompletny przewodnik po MCP  
- [FastMCP Documentation](https://github.com/modelcontextprotocol/python-sdk) - Dokumentacja SDK Pythona  

### Integracja bazy danych
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Kompletny przewodnik PostgreSQL  
- [pgvector Guide](https://github.com/pgvector/pgvector) - Dokumentacja rozszerzenia wektorowego  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Przewodnik po RLS PostgreSQL  

### Usługi Azure
- [Azure OpenAI Documentation](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integracja usług AI  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Zarządzana usługa bazodanowa  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Kontenery bezserwerowe  

---

**Zastrzeżenie**: To ćwiczenie edukacyjne wykorzystuje fikcyjne dane detaliczne. Zawsze przestrzegaj polityk zarządzania danymi i bezpieczeństwa Twojej organizacji podczas wdrażania podobnych rozwiązań w środowiskach produkcyjnych.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->