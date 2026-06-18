# 🚀 10 serwerów Microsoft MCP, które zwiększają produktywność programistów

## 🎯 Czego nauczysz się w tym przewodniku

Ten praktyczny przewodnik przedstawia dziesięć serwerów Microsoft MCP, które aktywnie zmieniają sposób pracy programistów z asystentami AI. Zamiast tylko tłumaczyć, co serwery MCP *mogą* robić, pokażemy ci serwery, które już mają realny wpływ na codzienne przepływy pracy deweloperskiej w Microsoft i poza nim.

Każdy serwer w tym przewodniku został wybrany na podstawie rzeczywistego zastosowania i opinii programistów. Dowiesz się nie tylko, co robi każdy serwer, ale dlaczego ma to znaczenie i jak najlepiej go wykorzystać w swoich projektach. Niezależnie od tego, czy jesteś zupełnie nowy w MCP, czy chcesz rozbudować istniejącą konfigurację, te serwery reprezentują jedne z najbardziej praktycznych i wpływowych narzędzi dostępnych w ekosystemie Microsoft.

> **💡 Porada na szybki start**
> 
> Jesteś nowicjuszem w MCP? Nie martw się! Ten przewodnik został zaprojektowany tak, aby był przyjazny dla początkujących. Wyjaśnimy pojęcia w trakcie, a zawsze możesz wrócić do naszych modułów [Wprowadzenie do MCP](../00-Introduction/README.md) i [Podstawowe koncepcje](../01-CoreConcepts/README.md) dla głębszego tła.

## Przegląd

Ten kompleksowy przewodnik bada dziesięć serwerów Microsoft MCP, które rewolucjonizują sposób, w jaki programiści współdziałają z asystentami AI i zewnętrznymi narzędziami. Od zarządzania zasobami Azure po przetwarzanie dokumentów — te serwery demonstrują moc Model Context Protocol w tworzeniu płynnych, produktywnych przepływów pracy deweloperskiej.

## Cele nauki

Pod koniec tego przewodnika będziesz:  
- Rozumieć, jak serwery MCP zwiększają produktywność programistów  
- Poznasz najważniejsze implementacje serwerów MCP Microsoft  
- Odkryjesz praktyczne zastosowania dla każdego serwera  
- Dowiesz się, jak skonfigurować i ustawić te serwery w VS Code i Visual Studio  
- Zbadacie szerszy ekosystem MCP i kierunki rozwoju  

## 🔧 Zrozumienie serwerów MCP: przewodnik dla początkujących

### Czym są serwery MCP?

Jako początkujący w Model Context Protocol (MCP) możesz się zastanawiać: „Czym dokładnie jest serwer MCP i dlaczego mam się nim interesować?” Zacznijmy od prostego porównania.

Pomyśl o serwerach MCP jak o wyspecjalizowanych asystentach, którzy pomagają twojemu asystentowi AI do kodowania (takim jak GitHub Copilot) łączyć się z zewnętrznymi narzędziami i usługami. Tak jak na telefonie używasz różnych aplikacji do różnych zadań — jednej do pogody, jednej do nawigacji, jednej do bankowości — serwery MCP dają twojemu asystentowi AI możliwość interakcji z różnymi narzędziami i usługami programistycznymi.

### Problem, który rozwiązują serwery MCP

Przed serwerami MCP, gdy chciałeś:  
- Sprawdzić zasoby Azure  
- Utworzyć issue na GitHub  
- Wykonać zapytanie do bazy danych  
- Przeszukać dokumentację  

Musiałeś przerwać kodowanie, otworzyć przeglądarkę, przejść na odpowiednią stronę i wykonać te zadania ręcznie. To ciągłe zmienianie kontekstu przerywa twój flow i zmniejsza produktywność.

### Jak serwery MCP zmieniają twoje doświadczenie programistyczne

Z serwerami MCP możesz pozostać w środowisku programistycznym (VS Code, Visual Studio itp.) i po prostu poprosić asystenta AI o wykonanie tych zadań. Na przykład:

**Zamiast tego tradycyjnego przepływu pracy:**  
1. Przestań kodować  
2. Otwórz przeglądarkę  
3. Przejdź do portalu Azure  
4. Sprawdź szczegóły konta magazynu  
5. Wróć do VS Code  
6. Kontynuuj kodowanie  

**Możesz teraz zrobić tak:**  
1. Zapytaj AI: „Jaki jest status moich kont magazynu Azure?”  
2. Kontynuuj kodowanie z uzyskanymi informacjami  

### Kluczowe korzyści dla początkujących

#### 1. 🔄 **Pozostań w stanie flow**  
- Koniec ze zmienianiem między aplikacjami  
- Skoncentruj się na pisanym kodzie  
- Zmniejsz obciążenie mentalne związane z zarządzaniem różnymi narzędziami  

#### 2. 🤖 **Używaj języka naturalnego zamiast skomplikowanych poleceń**  
- Zamiast pamiętać składnię SQL, opisz potrzebne dane  
- Zamiast pamiętać polecenia Azure CLI, wyjaśnij, co chcesz osiągnąć  
- Pozwól AI zająć się technicznymi szczegółami, a ty skup się na logice  

#### 3. 🔗 **Łącz wiele narzędzi ze sobą**  
- Twórz potężne przepływy pracy, łącząc różne usługi  
- Przykład: „Pobierz wszystkie ostatnie zgłoszenia GitHub i utwórz odpowiadające im work itemy w Azure DevOps”  
- Buduj automatyzacje bez pisania skomplikowanych skryptów  

#### 4. 🌐 **Dostęp do rozrastającego się ekosystemu**  
- Korzystaj z serwerów tworzonych przez Microsoft, GitHub i inne firmy  
- Łącz narzędzia od różnych dostawców bez zakłóceń  
- Dołącz do ustandaryzowanego ekosystemu działającego z różnymi asystentami AI  

#### 5. 🛠️ **Ucz się przez działanie**  
- Zacznij od gotowych serwerów, by zrozumieć koncepcje  
- Stopniowo twórz własne serwery, gdy poczujesz się pewniej  
- Korzystaj z dostępnych SDK i dokumentacji jako przewodnika  

### Przykład z życia dla początkujących

Załóżmy, że dopiero zaczynasz z web developmentem i pracujesz nad pierwszym projektem. Oto jak serwery MCP mogą pomóc:

**Tradycyjne podejście:**  
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```
  
**Z serwerami MCP:**  
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```
  

### Przewaga jako standard korporacyjny

MCP staje się standardem branżowym, co oznacza:  
- **Spójność**: Podobne doświadczenie w różnych narzędziach i firmach  
- **Współoperacyjność**: Serwery od różnych dostawców współpracują razem  
- **Przyszłościowość**: Umiejętności i konfiguracje przenoszą się między różnymi asystentami AI  
- **Społeczność**: Duży ekosystem dzielonej wiedzy i zasobów  

### Od czego zacząć: czego się nauczysz

W tym przewodniku będziemy odkrywać 10 serwerów Microsoft MCP szczególnie przydatnych dla programistów na każdym poziomie. Każdy serwer został zaprojektowany, aby:  
- Rozwiązywać typowe problemy rozwojowe  
- Redukować powtarzalne zadania  
- Poprawiać jakość kodu  
- Zwiększać możliwości nauki  

> **💡 Porada naukowa**  
> 
> Jeśli jesteś całkowicie nowy w MCP, zacznij od naszych modułów [Wprowadzenie do MCP](../00-Introduction/README.md) i [Podstawowe koncepcje](../01-CoreConcepts/README.md). Następnie wróć tutaj, aby zobaczyć te koncepcje w praktyce z realnymi narzędziami Microsoft.  
>
> Dla dodatkowego kontekstu o ważności MCP, zobacz post Marii Naggaga: [Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).  

## Rozpoczęcie pracy z MCP w VS Code i Visual Studio 🚀

Konfiguracja tych serwerów MCP jest prosta, jeśli używasz Visual Studio Code lub Visual Studio 2022 wraz z GitHub Copilot.

### Konfiguracja VS Code

Podstawowy proces dla VS Code:

1. **Włącz tryb agenta**: W VS Code przełącz się na tryb Agent w oknie Copilot Chat  
2. **Skonfiguruj serwery MCP**: Dodaj konfiguracje serwerów do pliku settings.json VS Code  
3. **Uruchom serwery**: Kliknij przycisk „Start” dla każdego serwera, którego chcesz używać  
4. **Wybierz narzędzia**: Wybierz, które serwery MCP mają być aktywne w bieżącej sesji  

Szczegółowe instrukcje konfiguracji znajdziesz w [dokumentacji VS Code MCP](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 Porada profesjonalisty: zarządzaj serwerami MCP jak ekspert!**  
> 
> Widok rozszerzeń VS Code teraz zawiera [wygodny nowy interfejs do zarządzania zainstalowanymi serwerami MCP](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! Masz szybki dostęp do uruchamiania, zatrzymywania i zarządzania dowolnymi zainstalowanymi serwerami MCP za pomocą przejrzystego, prostego interfejsu. Wypróbuj sam!

### Konfiguracja Visual Studio 2022

Dla Visual Studio 2022 (wersja 17.14 lub nowsza):

1. **Włącz tryb agenta**: Kliknij rozwijane menu „Ask” w oknie GitHub Copilot Chat i wybierz „Agent”  
2. **Utwórz plik konfiguracji**: Utwórz plik `.mcp.json` w katalogu rozwiązania (zalecane miejsce: `<SOLUTIONDIR>\.mcp.json`)  
3. **Skonfiguruj serwery**: Dodaj konfigurację serwerów MCP zgodnie ze standardowym formatem MCP  
4. **Zatwierdzenie narzędzi**: Po wyświetleniu monitu zatwierdź narzędzia, które chcesz używać, z odpowiednimi uprawnieniami zakresu  

Szczegółowe instrukcje konfiguracji dla Visual Studio znajdziesz w [dokumentacji Visual Studio MCP](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

Każdy serwer MCP ma swoje wymagania konfiguracyjne (łańcuchy połączeń, uwierzytelnianie itd.), ale wzorzec konfiguracji jest spójny w obu środowiskach IDE.

## Wnioski z doświadczeń z serwerami Microsoft MCP 🛠️

### 1. 📚 Serwer Microsoft Learn Docs MCP

[![Zainstaluj w VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Zainstaluj w VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Co robi**: Serwer Microsoft Learn Docs MCP to usługa hostowana w chmurze, która zapewnia asystentom AI dostęp w czasie rzeczywistym do oficjalnej dokumentacji Microsoft za pośrednictwem Model Context Protocol. Łączy się z `https://learn.microsoft.com/api/mcp` i umożliwia semantyczne wyszukiwanie w Microsoft Learn, dokumentacji Azure, dokumentacji Microsoft 365 i innych oficjalnych źródłach Microsoft.

**Dlaczego jest użyteczny**: Choć może się wydawać, że to „tylko dokumentacja”, ten serwer jest w rzeczywistości kluczowy dla każdego programisty korzystającego z technologii Microsoft. Jedną z największych skarg programistów .NET na asystentów AI do kodowania jest brak aktualizacji do najnowszych wydań .NET i C#. Serwer Microsoft Learn Docs MCP rozwiązuje ten problem, zapewniając dostęp w czasie rzeczywistym do najnowszej dokumentacji, referencji API i najlepszych praktyk. Niezależnie od tego, czy pracujesz z najnowszymi SDK Azure, eksplorujesz nowe funkcje C# 13, czy wdrażasz nowoczesne wzorce .NET Aspire, ten serwer gwarantuje, że twój asystent AI ma dostęp do autorytatywnych, aktualnych informacji potrzebnych do generowania dokładnego, nowoczesnego kodu.

**Zastosowanie w praktyce**: „Jakie są polecenia az cli do tworzenia Azure container app zgodnie z oficjalną dokumentacją Microsoft Learn?” albo „Jak skonfigurować Entity Framework z dependency injection w ASP.NET Core?” A może „Przejrzyj ten kod, aby upewnić się, że spełnia zalecenia dotyczące wydajności w dokumentacji Microsoft Learn.” Serwer zapewnia kompleksowe pokrycie dokumentacji Microsoft Learn, Azure i Microsoft 365, korzystając z zaawansowanego semantycznego wyszukiwania, aby znaleźć najbardziej kontekstowo odpowiednie informacje. Zwraca do 10 wysokiej jakości fragmentów treści z tytułami artykułów i URL-ami, zawsze korzystając z najnowszej dokumentacji Microsoft, gdy tylko się pojawia.

**Przykład na wyróżnienie**: Serwer udostępnia narzędzie `microsoft_docs_search`, które wykonuje semantyczne wyszukiwanie w oficjalnej dokumentacji technicznej Microsoft. Po konfiguracji możesz zadawać pytania takie jak „Jak zaimplementować uwierzytelnianie JWT w ASP.NET Core?” i otrzymywać szczegółowe, oficjalne odpowiedzi ze źródłami. Jakość wyszukiwania jest wyjątkowa, ponieważ rozumie kontekst – pytanie o „kontenery” w kontekście Azure zwróci dokumentację Azure Container Instances, podczas gdy to samo słowo w kontekście .NET zwróci informacje o kolekcjach w C#.

To szczególnie przydatne dla szybko zmieniających się lub niedawno zaktualizowanych bibliotek i przypadków użycia. Na przykład w kilku niedawnych projektach kodowania chciałem wykorzystać funkcje najnowszych wydań .NET Aspire i Microsoft.Extensions.AI. Dodając serwer Microsoft Learn Docs MCP, mogłem skorzystać nie tylko z dokumentacji API, ale też z przewodników i instrukcji, które dopiero co zostały opublikowane.

> **💡 Porada profesjonalisty**  
> 
> Nawet modele przyjazne narzędziom potrzebują zachęty do używania narzędzi MCP! Rozważ dodanie systemowego promptu lub [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) takiego jak: „Masz dostęp do `microsoft.docs.mcp` – używaj tego narzędzia do wyszukiwania najnowszej oficjalnej dokumentacji Microsoft podczas odpowiadania na pytania dotyczące technologii Microsoft, takich jak C#, Azure, ASP.NET Core lub Entity Framework.”  
>
> Doskonały przykład takiego podejścia znajdziesz w trybie czatu [C# .NET Janitor](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md) z repozytorium Awesome GitHub Copilot. Ten tryb wykorzystuje serwer Microsoft Learn Docs MCP do pomocy w oczyszczaniu i modernizacji kodu C# z użyciem najnowszych wzorców i najlepszych praktyk.  

### 2. ☁️ Azure MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Co robi**: Azure MCP Server to kompleksowy zestaw ponad 15 specjalistycznych konektorów usług Azure, które integrują cały ekosystem Azure z Twoim przepływem pracy AI. To nie jest tylko pojedynczy serwer – to potężna kolekcja obejmująca zarządzanie zasobami, łączność z bazami danych (PostgreSQL, SQL Server), analizę logów Azure Monitor za pomocą KQL, integrację Cosmos DB i wiele więcej.

**Dlaczego jest użyteczny**: Poza samym zarządzaniem zasobami Azure, ten serwer znacznie poprawia jakość kodu podczas pracy z Azure SDK. Korzystając z Azure MCP w trybie Agent, nie tylko pomaga pisać kod – pomaga pisać *lepszy* kod Azure, który przestrzega aktualnych wzorców uwierzytelniania, najlepszych praktyk obsługi błędów i wykorzystuje najnowsze funkcje SDK. Zamiast otrzymać ogólny kod, który może działać, otrzymujesz kod zgodny z zalecanymi przez Azure wzorcami dla zastosowań produkcyjnych.

**Kluczowe moduły obejmują**:
- **🗄️ Konektory baz danych**: Bezpośredni dostęp w naturalnym języku do Azure Database dla PostgreSQL i SQL Server
- **📊 Azure Monitor**: Analiza logów i wgląd operacyjny napędzony KQL
- **🌐 Zarządzanie zasobami**: Pełny cykl życia zasobów Azure
- **🔐 Uwierzytelnianie**: Wzorce DefaultAzureCredential i tożsamości zarządzanej
- **📦 Usługi magazynowania**: Operacje na Blob Storage, Queue Storage i Table Storage
- **🚀 Usługi kontenerowe**: Zarządzanie Azure Container Apps, Container Instances i AKS
- **I wiele innych specjalistycznych konektorów**

**Zastosowanie w praktyce**: "Wypisz moje konta magazynowe Azure", "Przeanalizuj mój Log Analytics workspace pod kątem błędów z ostatniej godziny" lub "Pomóż mi stworzyć aplikację Azure w Node.js z właściwym uwierzytelnianiem"

**Pełny scenariusz demonstracyjny**: Oto pełne przejście, które pokazuje moc połączenia Azure MCP z rozszerzeniem GitHub Copilot for Azure w VS Code. Kiedy masz oba zainstalowane i wpisujesz:

> "Utwórz skrypt Pythona, który przesyła plik do Azure Blob Storage, używając uwierzytelniania DefaultAzureCredential. Skrypt powinien połączyć się z moim kontem magazynowym Azure o nazwie 'mycompanystorage', przesłać do kontenera o nazwie 'documents', utworzyć plik testowy z aktualnym znacznikiem czasu do przesłania, obsługiwać błędy w sposób łagodny i zapewnić informacyjne wyjście, stosować się do najlepszych praktyk Azure dotyczących uwierzytelniania i obsługi błędów, zawierać komentarze wyjaśniające działanie uwierzytelniania DefaultAzureCredential oraz być dobrze zorganizowany z odpowiednimi funkcjami i dokumentacją."

Azure MCP Server wygeneruje kompletny, gotowy do produkcji skrypt Pythona, który:
- Używa najnowszego SDK Azure Blob Storage z odpowiednimi wzorcami asynchronicznymi
- Implementuje DefaultAzureCredential z kompleksowym wyjaśnieniem łańcucha zapasowego
- Zawiera solidną obsługę błędów z konkretnymi typami wyjątków Azure
- Stosuje najlepsze praktyki Azure SDK do zarządzania zasobami i obsługi połączeń
- Zapewnia szczegółowe logowanie i informacyjne wyjście na konsolę
- Tworzy poprawnie zorganizowany skrypt z funkcjami, dokumentacją i wskazówkami typów

Co czyni to niezwykłym, to fakt, że bez Azure MCP mógłbyś dostawać ogólny kod dla Blob Storage, który działa, ale nie podąża za aktualnymi wzorcami Azure. Z Azure MCP otrzymujesz kod, który wykorzystuje najnowsze metody uwierzytelniania, obsługuje scenariusze błędów specyficzne dla Azure i stosuje zalecane przez Microsoft praktyki dla aplikacji produkcyjnych.

**Przykład na czasie**: Miałem problem z zapamiętaniem konkretnych poleceń dla CLI `az` i `azd` do ad-hoc użycia. Zawsze był to dla mnie proces dwustopniowy: najpierw szukam składni, potem wywołuję polecenie. Często po prostu wchodziłem na portal i tam klikając załatwiałem, bo nie chciałem przyznać, że nie pamiętam składni CLI. Możliwość opisania tego, co chcę, jest niesamowita, a jeszcze lepsze jest to, że mogę to zrobić bez wychodzenia z IDE!

Na dobry start polecam świetną listę zastosowań w [repozytorium Azure MCP](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server). Aby uzyskać kompleksowe przewodniki instalacyjne i zaawansowane opcje konfiguracji, sprawdź [oficjalną dokumentację Azure MCP](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**Co robi**: Oficjalny GitHub MCP Server zapewnia bezproblemową integrację z całym ekosystemem GitHub, oferując zarówno zdalny dostęp hostowany, jak i opcje lokalnego wdrożenia przez Docker. To nie tylko podstawowe operacje na repozytoriach – to kompleksowy zestaw narzędzi obejmujący zarządzanie GitHub Actions, przepływy pracy pull requestów, śledzenie zgłoszeń, skanowanie bezpieczeństwa, powiadomienia i zaawansowane możliwości automatyzacji.

**Dlaczego jest użyteczny**: Ten serwer zmienia sposób interakcji z GitHub, przenosząc pełne doświadczenie platformy bezpośrednio do środowiska deweloperskiego. Zamiast ciągłego przełączania się między VS Code a GitHub.com w celu zarządzania projektem, przeglądu kodu czy monitorowania CI/CD, możesz obsługiwać wszystko za pomocą poleceń w naturalnym języku, pozostając skupionym na kodzie.

> **ℹ️ Uwagi: różne typy 'Agentów'**
> 
> Nie myl tego GitHub MCP Server z GitHub Coding Agent (agenta AI, któremu można przypisać zgłoszenia do automatycznych zadań kodowania). GitHub MCP Server działa w trybie agenta VS Code, zapewniając integrację API GitHub, podczas gdy GitHub Coding Agent to osobna funkcja tworząca pull requesty po przypisaniu do zgłoszeń GitHub.

**Kluczowe możliwości to**:
- **⚙️ GitHub Actions**: Pełne zarządzanie pipeline’ami CI/CD, monitorowanie workflowów i obsługa artefaktów
- **🔀 Pull Requests**: Tworzenie, przegląd, scalanie i zarządzanie PR z kompleksowym śledzeniem statusu
- **🐛 Zgłoszenia (Issues)**: Pełne zarządzanie cyklem życia zgłoszeń, komentowanie, etykietowanie i przypisywanie
- **🔒 Bezpieczeństwo**: Alerty skanowania kodu, wykrywanie sekretów i integracja z Dependabot
- **🔔 Powiadomienia**: Inteligentne zarządzanie powiadomieniami i kontrola subskrypcji repozytoriów
- **📁 Zarządzanie repozytoriami**: Operacje na plikach, zarządzanie gałęziami i administracja repozytoriami
- **👥 Współpraca**: Wyszukiwanie użytkowników i organizacji, zarządzanie zespołami oraz kontrola dostępu

**Zastosowanie w praktyce**: "Utwórz pull request z mojej gałęzi funkcji", "Pokaż mi wszystkie nieudane uruchomienia CI w tym tygodniu", "Wypisz otwarte alerty bezpieczeństwa dla moich repozytoriów" lub "Znajdź wszystkie zgłoszenia przypisane do mnie w moich organizacjach"

**Pełny scenariusz demonstracyjny**: Oto potężny workflow demonstrujący możliwości GitHub MCP Server:

> "Muszę przygotować się do przeglądu sprintu. Pokaż mi wszystkie pull requesty, które utworzyłem w tym tygodniu, sprawdź status naszych pipeline’ów CI/CD, stwórz podsumowanie alertów bezpieczeństwa, które musimy rozwiązać, i pomóż mi przygotować notatki z wydania na podstawie scalonych PR z etykietą 'feature'."

GitHub MCP Server:
- Pobierze Twoje ostatnie pull requesty z szczegółowymi informacjami o statusie
- Przeanalizuje uruchomienia workflow i wyróżni wszelkie niepowodzenia lub problemy z wydajnością
- Skompiluje wyniki skanowania bezpieczeństwa i nada priorytet krytycznym alertom
- Wygeneruje kompleksowe notatki z wydania, wyciągając informacje ze scalonych PR
- Zaproponuje kolejne kroki do planowania sprintu i przygotowania wydania

**Przykład na czasie**: Uwielbiam korzystać z tego do przeglądów kodu. Zamiast przeskakiwać między VS Code, powiadomieniami GitHub i stronami pull requestów, mogę powiedzieć "Pokaż mi wszystkie PR czekające na moją recenzję" a potem "Dodaj komentarz do PR #123 pytając o obsługę błędów w metodzie uwierzytelniania." Serwer zajmuje się wywołaniami API GitHub, utrzymuje kontekst dyskusji i nawet pomaga tworzyć bardziej konstruktywne komentarze recenzenckie.

**Opcje uwierzytelniania**: Serwer obsługuje zarówno OAuth (bezproblemowe w VS Code), jak i tokeny dostępu osobistego, z konfigurowalnym zestawem narzędzi pozwalającym włączyć tylko potrzebną funkcjonalność GitHub. Możesz uruchomić go jako usługę zdalną hostowaną dla szybkiej konfiguracji lub lokalnie przez Docker, by mieć pełną kontrolę.

> **💡 Porada ekspertów**
> 
> Włączaj tylko te zestawy narzędzi, których potrzebujesz, konfigurując parametr `--toolsets` w ustawieniach serwera MCP, aby zmniejszyć rozmiar kontekstu i poprawić wybór narzędzi AI. Na przykład dodaj `"--toolsets", "repos,issues,pull_requests,actions"` do argumentów konfiguracyjnych MCP dla podstawowych workflowów developerskich lub użyj `"--toolsets", "notifications, security"`, jeśli głównie zależy Ci na monitoringu GitHub.
### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**Co robi**: Łączy się z usługami Azure DevOps dla kompleksowego zarządzania projektami, śledzenia zadań, zarządzania pipeline’ami budowy i operacji na repozytoriach.

**Dlaczego jest użyteczny**: Dla zespołów korzystających z Azure DevOps jako głównej platformy DevOps, ten serwer MCP eliminuje konieczność ciągłego przełączania zakładek między środowiskiem deweloperskim a interfejsem web Azure DevOps. Możesz zarządzać zadaniami, sprawdzać statusy buildów, zapytywać repozytoria i wykonywać zadania zarządzania projektami bezpośrednio z poziomu asystenta AI.

**Zastosowanie w praktyce**: "Pokaż mi wszystkie aktywne zadania w bieżącym sprincie dla projektu WebApp", "Utwórz zgłoszenie błędu dla problemu z logowaniem, który właśnie znalazłem" lub "Sprawdź status naszych pipeline’ów build i pokaż ostatnie niepowodzenia"

**Przykład na czasie**: Łatwo sprawdzisz status bieżącego sprintu zespołu prostym zapytaniem, na przykład "Pokaż mi wszystkie aktywne zadania w bieżącym sprincie dla projektu WebApp" albo "Utwórz zgłoszenie błędu dla problemu z logowaniem, który właśnie znalazłem" bez opuszczania środowiska deweloperskiego.

### 5. 📝 MarkItDown MCP Server
[![Zainstaluj w VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Zainstaluj w VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**Co to robi**: MarkItDown to kompleksowy serwer konwersji dokumentów, który przekształca różne formaty plików na wysokiej jakości Markdown, zoptymalizowany pod kątem przetwarzania przez LLM oraz procesy analizy tekstu.

**Dlaczego jest przydatny**: Niezbędny dla nowoczesnych przepływów pracy dokumentacji! MarkItDown obsługuje imponujący zakres formatów plików, zachowując jednocześnie ważną strukturę dokumentu, taką jak nagłówki, listy, tabele i linki. W przeciwieństwie do prostych narzędzi do ekstrakcji tekstu, skupia się na zachowaniu znaczenia semantycznego i formatowania, które są cenne zarówno dla przetwarzania AI, jak i czytelności dla człowieka.

**Obsługiwane formaty plików**:
- **Dokumenty biurowe**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **Pliki multimedialne**: Obrazy (z metadanymi EXIF i OCR), Audio (z metadanymi EXIF i transkrypcją mowy)
- **Zawartość sieciowa**: HTML, kanały RSS, adresy URL YouTube, strony Wikipedii
- **Formaty danych**: CSV, JSON, XML, pliki ZIP (rekursywnie przetwarza zawartość)
- **Formaty publikacyjne**: EPub, notatniki Jupyter (.ipynb)
- **E-mail**: wiadomości Outlook (.msg)
- **Zaawansowane**: integracja Azure Document Intelligence dla ulepszonego przetwarzania PDF

**Zaawansowane możliwości**: MarkItDown wspiera opisy obrazów generowane przez LLM (gdy dostępny jest klient OpenAI), Azure Document Intelligence do ulepszonego przetwarzania PDF, transkrypcję audio dla zawartości mowy oraz system wtyczek do rozszerzania obsługi dodatkowych formatów plików.

**Zastosowanie w praktyce**: „Przekonwertuj tę prezentację PowerPoint do Markdown na naszą stronę dokumentacji”, „Wyciągnij tekst z tego PDF-a z zachowaniem odpowiedniej struktury nagłówków” lub „Przekształć ten arkusz Excel w czytelny format tabeli”.

**Przykład wyróżniony**: Cytując [dokumentację MarkItDown](https://github.com/microsoft/markitdown#why-markdown):

> Markdown jest niezwykle bliski czystemu tekstowi, z minimalnym markupem lub formatowaniem, ale nadal umożliwia reprezentację ważnej struktury dokumentu. Popularne LLM, takie jak GPT-4o od OpenAI, natywnie „mówią” Markdownem i często włączają Markdown do swoich odpowiedzi bez wyraźnego wywołania. Wskazuje to, że były trenowane na ogromnych ilościach tekstu sformatowanego w Markdown i dobrze go rozumieją. Dodatkowo, konwencje Markdown są bardzo oszczędne pod względem tokenów.

MarkItDown świetnie zachowuje strukturę dokumentu, co jest ważne dla przepływów pracy AI. Na przykład podczas konwersji prezentacji PowerPoint, zachowuje organizację slajdów z właściwymi nagłówkami, wyodrębnia tabele jako tabele Markdown, dodaje tekst alternatywny do obrazów, a nawet przetwarza notatki prelegenta. Wykresy są konwertowane na czytelne tabele danych, a wynikowy Markdown zachowuje logiczny ciąg oryginalnej prezentacji. To czyni go idealnym do wprowadzania treści prezentacji do systemów AI lub tworzenia dokumentacji ze slajdów.

### 6. 🗃️ SQL Server MCP Server

[![Zainstaluj w VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Zainstaluj w VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Co to robi**: Zapewnia konwersacyjny dostęp do baz danych SQL Server (lokalnych, Azure SQL lub Fabric)

**Dlaczego jest przydatny**: Podobnie jak serwer PostgreSQL, ale dla ekosystemu Microsoft SQL. Łącz się za pomocą prostego connection string i zaczynaj zapytania w języku naturalnym – bez konieczności zmiany kontekstu!

**Zastosowanie w praktyce**: „Znajdź wszystkie zamówienia, które nie zostały zrealizowane w ciągu ostatnich 30 dni” jest tłumaczone na właściwe zapytania SQL i zwraca sformatowane wyniki.

**Przykład wyróżniony**: Po skonfigurowaniu połączenia z bazą danych możesz od razu prowadzić rozmowy z danymi. W poście na blogu pokazano to na prostym pytaniu: „Do której bazy danych jesteś połączony?” Serwer MCP odpowiada, wywołując odpowiednie narzędzie bazodanowe, łącząc się z instancją SQL Server i zwracając szczegóły obecnego połączenia – wszystko bez pisania ani jednej linijki SQL. Serwer obsługuje kompleksowe operacje bazodanowe, od zarządzania schematem po manipulację danymi, wszystko za pomocą naturalnych zapytań. Pełne instrukcje konfiguracji i przykłady dla VS Code i Claude Desktop znajdziesz w: [Introducing MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).

### 7. 🎭 Playwright MCP Server

[![Zainstaluj w VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Zainstaluj w VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**Co to robi**: Umożliwia agentom AI interakcję ze stronami internetowymi w celach testowania i automatyzacji

> **ℹ️ Napędza GitHub Copilot**
> 
> Playwright MCP Server zasila Agenta Kodującego GitHub Copilot, dając mu możliwości przeglądania stron! [Dowiedz się więcej o tej funkcji](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**Dlaczego jest przydatny**: Idealny do automatycznego testowania sterowanego opisami w języku naturalnym. AI może nawigować po witrynach, wypełniać formularze i ekstraktować dane za pomocą ustrukturyzowanych zrzutów dostępności – to niesamowicie potężne!

**Zastosowanie w praktyce**: „Przetestuj proces logowania i sprawdź, czy pulpit ładuje się poprawnie” lub „Wygeneruj test wyszukujący produkty i weryfikujący stronę wyników” – wszystko bez konieczności posiadania kodu źródłowego aplikacji.

**Przykład wyróżniony**: Moja koleżanka Debbie O'Brien ostatnio wykonuje niesamowitą pracę z Playwright MCP Server! Na przykład niedawno pokazała, jak generować kompletne testy Playwright bez dostępu do kodu aplikacji. W swoim scenariuszu poprosiła Copilota o stworzenie testu dla aplikacji wyszukiwania filmów: przejdź na stronę, wyszukaj „Garfield” i zweryfikuj, czy film pojawia się w wynikach. MCP uruchomił sesję przeglądarki, zbadał strukturę strony korzystając ze zrzutów DOM, odnalazł odpowiednie selektory i wygenerował w pełni działający test w TypeScript, który przeszedł za pierwszym razem.

To, co jest naprawdę mocne, to to, że łączy naturalne instrukcje językowe z wykonalnym kodem testowym. Tradycyjne podejścia wymagają ręcznego pisania testów lub dostępu do kodu dla kontekstu. Ale dzięki Playwright MCP możesz testować zewnętrzne strony, aplikacje klienckie lub pracować w scenariuszach testów typu black-box, gdzie nie ma dostępu do kodu.

### 8. 💻 Dev Box MCP Server

[![Zainstaluj w VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Zainstaluj w VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Co to robi**: Zarządza środowiskami Microsoft Dev Box za pomocą języka naturalnego

**Dlaczego jest przydatny**: Znacznie upraszcza zarządzanie środowiskami deweloperskimi! Twórz, konfiguruj i zarządzaj środowiskami bez pamiętania konkretnych poleceń.

**Zastosowanie w praktyce**: „Skonfiguruj nowy Dev Box z najnowszym SDK .NET i przygotuj go do naszego projektu”, „Sprawdź stan wszystkich moich środowisk deweloperskich” lub „Utwórz standaryzowane środowisko demo na prezentacje zespołowe”.

**Przykład wyróżniony**: Jestem wielkim fanem używania Dev Box do osobistego rozwoju. Momentem olśnienia było dla mnie, gdy James Montemagno wyjaśnił, jak świetny jest Dev Box do pokazów na konferencjach, ponieważ ma super szybkie połączenie ethernet bez względu na sieć konferencji/hotelu/samolotu, której akurat używam. W rzeczywistości ostatnio ćwiczyłem prezentacje konferencyjne, mając laptop podłączony do hotspotu telefonu podczas jazdy autobusem z Brugii do Antwerpii! Kolejnym krokiem jest teraz praca z zespołem nad zarządzaniem wieloma środowiskami deweloperskimi i standaryzowanymi środowiskami demo. Kolejnym ważnym przypadkiem użycia, o którym słyszę od klientów i współpracowników, jest używanie Dev Box do prekonfigurowanych środowisk deweloperskich. W obu przypadkach wykorzystanie MCP do konfiguracji i zarządzania Dev Boxami pozwala używać interakcji w języku naturalnym, pozostając cały czas w środowisku deweloperskim.

### 9. 🤖 Microsoft Foundry MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**Co to robi**: Serwer Microsoft Foundry MCP zapewnia programistom kompleksowy dostęp do ekosystemu AI Azure, w tym katalogów modeli, zarządzania wdrożeniami, indeksowania wiedzy za pomocą Azure AI Search oraz narzędzi do ewaluacji. Ten eksperymentalny serwer tworzy most między rozwojem AI a potężną infrastrukturą AI Azure, ułatwiając budowanie, wdrażanie i ocenianie aplikacji AI.

**Dlaczego jest przydatny**: Serwer ten zmienia sposób pracy z usługami Azure AI, wprowadzając zaawansowane możliwości AI bezpośrednio do twojego środowiska programistycznego. Zamiast przełączać się między portalem Azure, dokumentacją i IDE, możesz odkrywać modele, wdrażać usługi, zarządzać bazami wiedzy i oceniać wydajność AI za pomocą poleceń w języku naturalnym. Jest szczególnie potężny dla programistów tworzących aplikacje RAG (Retrieval-Augmented Generation), zarządzających wielomodelowymi wdrożeniami lub implementujących kompleksowe ramy ewaluacji AI.

**Kluczowe możliwości dla programistów**:
- **🔍 Odkrywanie i wdrażanie modeli**: Przeglądaj katalog modeli Microsoft Foundry, uzyskuj szczegółowe informacje o modelu wraz z przykładami kodu i wdrażaj modele do usług Azure AI
- **📚 Zarządzanie wiedzą**: Twórz i zarządzaj indeksami Azure AI Search, dodawaj dokumenty, konfiguruj indeksatory i twórz zaawansowane systemy RAG
- **⚡ Integracja agentów AI**: Łącz się z agentami Azure AI, wyszukuj istniejących agentów i oceniaj ich wydajność w scenariuszach produkcyjnych
- **📊 Ramy ewaluacji**: Przeprowadzaj kompleksowe oceny tekstowe i agentów, generuj raporty w formacie markdown oraz wdrażaj kontrolę jakości aplikacji AI
- **🚀 Narzędzia prototypowania**: Otrzymuj instrukcje konfiguracji prototypowania na bazie GitHub oraz dostęp do Microsoft Foundry Labs z najnowocześniejszymi modelami badawczymi

**Przykładowe zastosowanie przez programistów w praktyce**: "Wdrażam model Phi-4 do usług Azure AI dla mojej aplikacji", "Tworzę nowy indeks wyszukiwania dla mojego systemu RAG dokumentacji", "Oceniam odpowiedzi mojego agenta w odniesieniu do metryk jakości", lub "Znajdź najlepszy model rozumowania do moich skomplikowanych zadań analitycznych".

**Pełny scenariusz demonstracyjny**: Oto potężny przepływ pracy w rozwoju AI:

> "Buduję agenta obsługi klienta. Pomóż mi znaleźć dobry model rozumowania z katalogu, wdrożyć go do usług Azure AI, stworzyć bazę wiedzy z naszej dokumentacji, skonfigurować ramy ewaluacji do testowania jakości odpowiedzi, a następnie pomóż mi z prototypowaniem integracji z tokenem GitHub do testów."

Serwer Microsoft Foundry MCP:
- Przeszuka katalog modeli, aby polecić optymalne modele rozumowania na podstawie twoich wymagań
- Dostarczy polecenia wdrożenia oraz informacje o limitach dla wybranego regionu Azure
- Skonfiguruje indeksy Azure AI Search z odpowiednim schematem dla twojej dokumentacji
- Skonfiguruje potoki ewaluacyjne z metrykami jakości i kontrolami bezpieczeństwa
- Wygeneruje kod do prototypowania z uwierzytelnianiem GitHub do natychmiastowego testowania
- Zapewni szczegółowe przewodniki konfiguracyjne dostosowane do twojego stosu technologicznego

**Prezentowany przykład**: Jako programista miałem trudności z nadążaniem za różnorodnością dostępnych modeli LLM. Znam kilka głównych, ale czułem, że tracę szansę na wzrost produktywności i efektywności. Zarządzanie tokenami i limitami jest stresujące i trudne — nigdy nie wiem, czy wybieram właściwy model do odpowiedniego zadania, czy marnuję budżet. Dopiero co usłyszałem o tym serwerze MCP od Jamesa Montemagno, gdy pytałem kolegów o rekomendacje MCP Server do tego wpisu i jestem podekscytowany, by go wykorzystać! Możliwości odkrywania modeli wyglądają szczególnie imponująco dla kogoś takiego jak ja, kto chce wyjść poza utarte schematy i znaleźć modele zoptymalizowane do konkretnych zadań. Ramy ewaluacji powinny pomóc mi potwierdzić, że faktycznie uzyskuję lepsze wyniki, a nie tylko eksperymentuję dla samej zmiany.

> **ℹ️ Status eksperymentalny**
> 
> Ten serwer MCP jest eksperymentalny i jest aktywnie rozwijany. Funkcje i API mogą ulec zmianie. Idealny do eksploracji możliwości Azure AI i budowy prototypów, ale wymaga sprawdzenia stabilności do użytku produkcyjnego.
### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**Co to robi**: Zapewnia programistom niezbędne narzędzia do tworzenia agentów AI i aplikacji integrujących się z Microsoft 365 i Microsoft 365 Copilot, w tym walidację schematów, pobieranie przykładowego kodu oraz pomoc w rozwiązywaniu problemów.

**Dlaczego jest przydatny**: Tworzenie rozwiązań dla Microsoft 365 i Copilot wymaga pracy z złożonymi schematami manifestów oraz specyficznymi wzorcami programistycznymi. Ten serwer MCP wprowadza kluczowe zasoby rozwojowe bezpośrednio do twojego środowiska kodowania, pomagając walidować schematy, znajdować przykładowy kod i rozwiązywać typowe problemy bez konieczności nieustannego odwoływania się do dokumentacji.

**Praktyczne zastosowanie**: "Zweryfikuj manifest deklaratywnego agenta i napraw błędy schematu", "Pokaż przykładowy kod implementacji wtyczki Microsoft Graph API" lub "Pomóż mi rozwiązać problemy z uwierzytelnianiem aplikacji Teams".

**Prezentowany przykład**: Skontaktowałem się z moim przyjacielem Johnem Millerem po rozmowie na konferencji Build o M365 Agents i polecił mi ten MCP. To może być świetne dla programistów, którzy dopiero zaczynają z M365 Agents, ponieważ dostarcza szablony, kod przykładowy i szkielet aplikacji, aby zacząć bez zagłębiania się w dokumentację. Funkcje walidacji schematów wyglądają szczególnie przydatnie, by unikać błędów strukturalnych w manifestach, które potrafią spowodować godziny debugowania.

> **💡 Profesjonalna wskazówka**
> 
> Używaj tego serwera razem z serwerem Microsoft Learn Docs MCP, aby uzyskać wszechstronne wsparcie w rozwoju dla M365 – jeden dostarcza oficjalną dokumentację, a ten drugi oferuje praktyczne narzędzia programistyczne i pomoc w rozwiązywaniu problemów.


## Co dalej? 🔮

## 📋 Podsumowanie

Model Context Protocol (MCP) rewolucjonizuje sposób, w jaki programiści współpracują z asystentami AI i zewnętrznymi narzędziami. Te 10 serwerów MCP od Microsoft pokazują potęgę standaryzowanej integracji AI, umożliwiając płynne przepływy pracy, które pozwalają programistom pozostać w stanie pełnego zaangażowania, korzystając z potężnych zewnętrznych funkcjonalności.

Od kompleksowej integracji z ekosystemem Azure po specjalistyczne narzędzia jak Playwright do automatyzacji przeglądarki i MarkItDown do przetwarzania dokumentów — te serwery pokazują, jak MCP może zwiększyć produktywność w różnorodnych scenariuszach rozwojowych. Standaryzowany protokół zapewnia, że te narzędzia współpracują ze sobą bezproblemowo, tworząc spójną i efektywną przestrzeń pracy.

W miarę jak ekosystem MCP ewoluuje, aktywne zaangażowanie się w społeczność, eksplorowanie nowych serwerów i budowanie własnych rozwiązań będzie kluczem do maksymalizacji produktywności. Otwarty standard MCP pozwala na dowolne łączenie narzędzi od różnych dostawców, tworząc idealny przepływ pracy dopasowany do twoich specyficznych potrzeb.

## 🔗 Dodatkowe zasoby

- [Oficjalne repozytorium Microsoft MCP](https://github.com/microsoft/mcp)
- [Społeczność i dokumentacja MCP](https://modelcontextprotocol.io/introduction)
- [Dokumentacja MCP dla VS Code](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Dokumentacja MCP dla Visual Studio](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Dokumentacja Azure MCP](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – wydarzenia MCP](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot Customizations](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days na żywo 29/30 lipca lub na żądanie](https://aka.ms/mcpdevdays)

## 🎯 Ćwiczenia

1. **Instalacja i konfiguracja**: Skonfiguruj jeden z serwerów MCP w swoim środowisku VS Code i przetestuj podstawową funkcjonalność.
2. **Integracja przepływu pracy**: Zaprojektuj przepływ pracy rozwojowej, który łączy co najmniej trzy różne serwery MCP.
3. **Planowanie serwera niestandardowego**: Zidentyfikuj zadanie w codziennej pracy programistycznej, które mogłoby skorzystać z niestandardowego serwera MCP i stwórz jego specyfikację.
4. **Analiza wydajności**: Porównaj efektywność korzystania z serwerów MCP z tradycyjnymi metodami dla typowych zadań programistycznych.
5. **Ocena bezpieczeństwa**: Oceń implikacje bezpieczeństwa związane z używaniem serwerów MCP w twoim środowisku programistycznym i zaproponuj najlepsze praktyki.


Następny:[Najlepsze praktyki](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->