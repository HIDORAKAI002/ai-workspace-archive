[![Exploring AI Agent Frameworks](../../../translated_images/pl/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Kliknij obraz powyżej, aby obejrzeć wideo z tej lekcji)_

# Poznaj frameworki agentów AI

Frameworki agentów AI to platformy programistyczne zaprojektowane, aby uprościć tworzenie, wdrażanie i zarządzanie agentami AI. Frameworki te dostarczają programistom gotowe komponenty, abstrakcje i narzędzia, które usprawniają rozwój złożonych systemów AI.

Frameworki te pomagają deweloperom skoncentrować się na unikalnych aspektach ich aplikacji, dostarczając ustandaryzowane podejścia do powszechnych wyzwań w rozwoju agentów AI. Zwiększają skalowalność, dostępność i efektywność budowania systemów AI.

## Wprowadzenie 

Ta lekcja obejmie:

- Czym są frameworki agentów AI i co umożliwiają deweloperom?
- Jak zespoły mogą ich używać do szybkiego prototypowania, iteracji i ulepszania możliwości swoich agentów?
- Jakie są różnice między frameworkami i narzędziami stworzonymi przez Microsoft (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> oraz <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Czy mogę bezpośrednio zintegrować moje istniejące narzędzia ekosystemu Azure, czy potrzebuję samodzielnych rozwiązań?
- Co to jest Microsoft Foundry Agent Service i jak mi pomaga?

## Cele nauki

Celem tej lekcji jest pomóc Ci zrozumieć:

- Rola frameworków agentów AI w rozwoju AI.
- Jak wykorzystać frameworki agentów AI do budowy inteligentnych agentów.
- Kluczowe możliwości udostępnione przez frameworki agentów AI.
- Różnice między Microsoft Agent Framework a Microsoft Foundry Agent Service.

## Czym są frameworki agentów AI i co pozwalają deweloperom zrobić?

Tradycyjne frameworki AI mogą pomóc w integracji AI z Twoimi aplikacjami i poprawić je na następujące sposoby:

- **Personalizacja**: AI może analizować zachowania i preferencje użytkowników, aby oferować spersonalizowane rekomendacje, treści i doświadczenia.
Przykład: Serwisy streamingowe jak Netflix używają AI, by sugerować filmy i programy na podstawie historii oglądania, zwiększając zaangażowanie i satysfakcję użytkowników.
- **Automatyzacja i efektywność**: AI może automatyzować powtarzalne zadania, usprawniać przepływy pracy i poprawiać efektywność operacyjną.
Przykład: Aplikacje obsługi klienta wykorzystują chatboty oparte na AI, by obsługiwać typowe zapytania, skracając czas reakcji i uwalniając pracowników do bardziej złożonych spraw.
- **Ulepszone doświadczenie użytkownika**: AI może poprawić ogólne doświadczenia użytkownika oferując inteligentne funkcje takie jak rozpoznawanie głosu, przetwarzanie języka naturalnego czy przewidywanie tekstu.
Przykład: Wirtualni asystenci jak Siri i Google Assistant wykorzystują AI do rozumienia i odpowiadania na polecenia głosowe, ułatwiając interakcję z urządzeniami.

### To wszystko brzmi świetnie, więc dlaczego potrzebujemy frameworku agenta AI?

Frameworki agentów AI to coś więcej niż tylko frameworki AI. Są zaprojektowane, aby umożliwić tworzenie inteligentnych agentów, którzy mogą wchodzić w interakcje z użytkownikami, innymi agentami i środowiskiem, aby osiągać konkretne cele. Agenci ci mogą przejawiać autonomiczne zachowanie, podejmować decyzje i dostosowywać się do zmieniających się warunków. Spójrzmy na kluczowe możliwości frameworków agentów AI:

- **Współpraca i koordynacja agentów**: Umożliwiają tworzenie wielu agentów AI, którzy mogą ze sobą współdziałać, komunikować się i koordynować rozwiązanie złożonych zadań.
- **Automatyzacja i zarządzanie zadaniami**: Zapewniają mechanizmy automatyzacji wieloetapowych przepływów pracy, delegowania zadań i dynamicznego zarządzania zadaniami między agentami.
- **Zrozumienie kontekstu i adaptacja**: Wyposaża agentów w zdolność rozumienia kontekstu, adaptacji do zmiennych warunków oraz podejmowania decyzji na podstawie informacji w czasie rzeczywistym.

Podsumowując, agenci pozwalają na więcej, przenosząc automatyzację na wyższy poziom, tworząc inteligentniejsze systemy, które mogą się dostosowywać i uczyć ze swojego otoczenia.

## Jak szybko prototypować, iterować i ulepszać możliwości agenta?

To dynamicznie zmieniający się obszar, ale istnieją pewne wspólne elementy większości frameworków agentów AI, które pomagają szybko prototypować i iterować, mianowicie: modułowe komponenty, narzędzia do współpracy i uczenie w czasie rzeczywistym. Przyjrzyjmy się im bliżej:

- **Korzystaj z modułowych komponentów**: SDK AI oferują gotowe komponenty takie jak złącza AI i pamięci, wywoływanie funkcji za pomocą języka naturalnego lub wtyczek kodu, szablony promptów i inne.
- **Wykorzystuj narzędzia współpracy**: Projektuj agentów z określonymi rolami i zadaniami, umożliwiając im testowanie i doskonalenie współdziałających przepływów pracy.
- **Ucz się w czasie rzeczywistym**: Wdrażaj pętle informacji zwrotnych, gdzie agenci uczą się na podstawie interakcji i dynamicznie dostosowują swoje zachowanie.

### Korzystaj z modułowych komponentów

SDK takie jak Microsoft Agent Framework oferują gotowe komponenty, takie jak złącza AI, definicje narzędzi i zarządzanie agentami.

**Jak zespoły mogą ich używać**: Zespoły mogą szybko złożyć te komponenty, aby stworzyć funkcjonalny prototyp bez konieczności zaczynania od zera, co pozwala na szybkie eksperymentowanie i iterację.

**Jak to działa w praktyce**: Możesz użyć gotowego parsera do wyciągania informacji z danych wejściowych użytkownika, modułu pamięci do przechowywania i pobierania danych oraz generatora promptów do interakcji z użytkownikami, wszystko bez konieczności tworzenia tych komponentów od podstaw.

**Przykład kodu**. Spójrzmy na przykład, jak można użyć Microsoft Agent Framework z `FoundryChatClient`, aby model odpowiadał na dane wejściowe użytkownika z wywoływaniem narzędzi:

``` python
# Przykład użycia Microsoft Agent Framework w Pythonie

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Zdefiniuj przykładową funkcję narzędziową do rezerwacji podróży
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # Przykładowy wynik: Twój lot do Nowego Jorku 1 stycznia 2025 został pomyślnie zarezerwowany. Bezpiecznej podróży! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Z tego przykładu można zobaczyć, jak można wykorzystać gotowy parser do wyodrębnienia kluczowych informacji z danych wejściowych użytkownika, takich jak miejsce rozpoczęcia, miejsce docelowe i data rezerwacji lotu. Takie modułowe podejście pozwala skupić się na logice wysokiego poziomu.

### Wykorzystuj narzędzia współpracy

Frameworki takie jak Microsoft Agent Framework ułatwiają tworzenie wielu agentów, którzy mogą współpracować.

**Jak zespoły mogą ich używać**: Zespoły mogą projektować agentów z określonymi rolami i zadaniami, co pozwala im testować i ulepszać wspólne przepływy pracy oraz poprawiać ogólną efektywność systemu.

**Jak to działa w praktyce**: Możesz stworzyć zespół agentów, gdzie każdy z nich ma specjalistyczną funkcję, na przykład pozyskiwanie danych, analizę lub podejmowanie decyzji. Agenci mogą się komunikować i dzielić informacjami, aby osiągnąć wspólny cel, taki jak odpowiedź na zapytanie użytkownika lub wykonanie zadania.

**Przykład kodu (Microsoft Agent Framework)**:

```python
# Tworzenie wielu agentów współpracujących ze sobą za pomocą Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Agent do pobierania danych
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Agent do analizy danych
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Uruchom agentów kolejno na zadaniu
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

W powyższym kodzie widać, jak można stworzyć zadanie angażujące wielu agentów współpracujących nad analizą danych. Każdy agent wykonuje określoną funkcję, a zadanie jest realizowane przez koordynację agentów, aby osiągnąć zamierzony efekt. Tworząc dedykowanych agentów z wyspecjalizowanymi rolami, można zwiększyć efektywność i wydajność zadania.

### Ucz się w czasie rzeczywistym

Zaawansowane frameworki oferują możliwości rozumienia kontekstu i adaptacji w czasie rzeczywistym.

**Jak zespoły mogą ich używać**: Zespoły mogą wdrażać pętle informacji zwrotnej, gdzie agenci uczą się na podstawie interakcji i dynamicznie dostosowują swoje zachowanie, prowadząc do ciągłego doskonalenia i poprawy funkcji.

**Jak to działa w praktyce**: Agenci mogą analizować opinie użytkowników, dane środowiskowe oraz wyniki zadań, aby aktualizować swoją bazę wiedzy, dostosowywać algorytmy podejmowania decyzji i poprawiać wydajność w czasie. Ten iteracyjny proces uczenia pozwala agentom przystosować się do zmieniających się warunków i preferencji użytkowników, poprawiając skuteczność całego systemu.

## Jakie są różnice między Microsoft Agent Framework a Microsoft Foundry Agent Service?

Istnieje wiele sposobów porównania tych podejść, ale spójrzmy na kluczowe różnice pod względem ich projektowania, możliwości i docelowych zastosowań:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework to uproszczone SDK do budowania agentów AI wykorzystujących `FoundryChatClient`. Pozwala deweloperom tworzyć agentów korzystających z modeli Azure OpenAI z wbudowanym wywoływaniem narzędzi, zarządzaniem konwersacją oraz bezpieczeństwem klasy korporacyjnej przez tożsamość Azure.

**Zastosowania**: Budowa agentów AI gotowych do produkcji z użyciem narzędzi, wieloetapowymi przepływami pracy oraz scenariuszami integracji korporacyjnej.

Oto kilka ważnych podstawowych pojęć Microsoft Agent Framework:

- **Agenci**. Agent jest tworzony za pomocą `FoundryChatClient` i konfigurowany z nazwą, instrukcjami i narzędziami. Agent może:
  - **Przetwarzać wiadomości użytkownika** i generować odpowiedzi przy użyciu modeli Azure OpenAI.
  - **Wywoływać narzędzia** automatycznie na podstawie kontekstu rozmowy.
  - **Utrzymywać stan konwersacji** przez wiele interakcji.

  Oto fragment kodu pokazujący, jak stworzyć agenta:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **Narzędzia**. Framework obsługuje definiowanie narzędzi jako funkcji Pythona, które agent może automatycznie wywołać. Narzędzia rejestruje się podczas tworzenia agenta:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **Koordynacja wielu agentów**. Możesz tworzyć wielu agentów o różnych specjalizacjach i koordynować ich pracę:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Integracja tożsamości Azure**. Framework używa `AzureCliCredential` (lub `DefaultAzureCredential`) do bezpiecznej, bezkluczowej autoryzacji, eliminując potrzebę zarządzania kluczami API bezpośrednio.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service to nowsze rozwiązanie, zaprezentowane podczas Microsoft Ignite 2024. Pozwala na rozwój i wdrażanie agentów AI z bardziej elastycznymi modelami, takimi jak bezpośrednie wywoływanie open-source’owych LLM, np. Llama 3, Mistral i Cohere.

Microsoft Foundry Agent Service oferuje silniejsze mechanizmy bezpieczeństwa korporacyjnego i metody przechowywania danych, co czyni go odpowiednim dla aplikacji korporacyjnych.

Działa bezpośrednio z Microsoft Agent Framework do budowy i wdrażania agentów.

Usługa ta jest obecnie w Public Preview i obsługuje Pythona oraz C# do tworzenia agentów.

Korzystając z Microsoft Foundry Agent Service Python SDK, możemy stworzyć agenta z narzędziem zdefiniowanym przez użytkownika:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Zdefiniuj funkcje narzędziowe
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### Podstawowe pojęcia

Microsoft Foundry Agent Service posiada następujące podstawowe pojęcia:

- **Agent**. Microsoft Foundry Agent Service integruje się z Microsoft Foundry. W ramach Microsoft Foundry agent AI działa jako "inteligentna" mikroserwis, który może odpowiadać na pytania (RAG), wykonywać działania lub w pełni automatyzować przepływy pracy. Osiąga to dzięki połączeniu mocy generatywnych modeli AI z narzędziami pozwalającymi na dostęp i interakcję z rzeczywistymi źródłami danych. Oto przykład agenta:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    W tym przykładzie agent jest tworzony z modelem `gpt-4.1-mini`, nazwą `my-agent` oraz instrukcjami `You are helpful agent`. Agent wyposażony jest w narzędzia i zasoby do wykonywania zadań interpretacji kodu.

- **Wątek i wiadomości**. Wątek to kolejne ważne pojęcie. Reprezentuje on rozmowę lub interakcję między agentem a użytkownikiem. Wątki mogą służyć do śledzenia postępu rozmowy, przechowywania informacji kontekstowych oraz zarządzania stanem interakcji. Oto przykład wątku:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Poproś agenta o wykonanie pracy na wątku
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Pobierz i zaloguj wszystkie wiadomości, aby zobaczyć odpowiedź agenta
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    W powyższym kodzie tworzony jest wątek. Następnie do wątku wysyłana jest wiadomość. Wywołanie `create_and_process_run` powoduje, że agent wykonuje pracę na wątku. Na koniec pobierane i logowane są wiadomości, aby zobaczyć odpowiedź agenta. Wiadomości pokazują postęp rozmowy między użytkownikiem a agentem. Ważne jest też zrozumienie, że wiadomości mogą mieć różne typy, takie jak tekst, obraz czy plik; oznacza to, że praca agenta może skutkować na przykład obrazem lub odpowiedzią tekstową. Jako programista możesz następnie użyć tych informacji do dalszego przetwarzania odpowiedzi lub przedstawienia jej użytkownikowi.

- **Integracja z Microsoft Agent Framework**. Microsoft Foundry Agent Service działa płynnie z Microsoft Agent Framework, co oznacza, że możesz budować agentów za pomocą `FoundryChatClient` i wdrażać ich przez Agent Service do produkcyjnych scenariuszy.

**Zastosowania**: Microsoft Foundry Agent Service jest zaprojektowany dla aplikacji korporacyjnych wymagających bezpiecznego, skalowalnego i elastycznego wdrażania agentów AI.

## Jaka jest różnica między tymi podejściami?
 
Wygląda na to, że istnieje nakładanie się funkcji, ale są też kluczowe różnice w zakresie ich projektowania, możliwości i docelowych zastosowań:
 
- **Microsoft Agent Framework (MAF)**: To gotowe do produkcji SDK do budowania agentów AI. Zapewnia uproszczone API do tworzenia agentów z wywoływaniem narzędzi, zarządzaniem konwersacjami i integracją tożsamości Azure.
- **Microsoft Foundry Agent Service**: To platforma i usługa wdrożeniowa w Microsoft Foundry dla agentów. Oferuje wbudowane połączenia z usługami takimi jak Azure OpenAI, Azure AI Search, Bing Search oraz wykonywanie kodu.
 
Wciąż nie wiesz, który wybrać?

### Zastosowania
 
Sprawdźmy, czy pomożemy Ci, przedstawiając kilka powszechnych przypadków użycia:
 
> Pytanie: Buduję produkcyjne aplikacje agentów AI i chcę szybko zacząć
>

>Odpowiedź: Microsoft Agent Framework to świetny wybór. Udostępnia proste, Pythonowe API przez `FoundryChatClient`, które pozwala definiować agentów z narzędziami i instrukcjami za pomocą kilku linijek kodu.

>Pytanie: Potrzebuję wdrożenia klasy korporacyjnej z integracjami Azure, takimi jak Search i wykonywanie kodu
>
> Odpowiedź: Microsoft Foundry Agent Service jest najlepszym rozwiązaniem. To platforma usługowa, oferująca wbudowane możliwości dla wielu modeli, Azure AI Search, Bing Search i Azure Functions. Umożliwia łatwe budowanie agentów w Foundry Portal i wdrażanie ich na dużą skalę.
 
> Pytanie: Nadal mam wątpliwości, podaj mi jedną opcję
>
> Odpowiedź: Zacznij od Microsoft Agent Framework, by budować swoich agentów, a potem użyj Microsoft Foundry Agent Service, gdy będziesz potrzebować wdrożyć ich i skalować w produkcji. Takie podejście pozwala szybko iterować logikę agenta, mając jasną ścieżkę do wdrożenia korporacyjnego.
 
Podsumujmy kluczowe różnice w tabeli:

| Framework | Skupienie | Podstawowe pojęcia | Zastosowania |
| --- | --- | --- | --- |
| Microsoft Agent Framework | Uproszczone SDK agenta z wywoływaniem narzędzi | Agenci, Narzędzia, Tożsamość Azure | Budowanie agentów AI, użycie narzędzi, wieloetapowe przepływy pracy |
| Microsoft Foundry Agent Service | Elastyczne modele, bezpieczeństwo korporacyjne, generowanie kodu, wywoływanie narzędzi | Modułowość, Współpraca, Orkiestracja procesów | Bezpieczne, skalowalne i elastyczne wdrażanie agentów AI |

## Czy mogę bezpośrednio zintegrować moje istniejące narzędzia ekosystemu Azure, czy potrzebuję samodzielnych rozwiązań?


Odpowiedź brzmi tak, możesz bezpośrednio zintegrować swoje istniejące narzędzia ekosystemu Azure z Microsoft Foundry Agent Service, zwłaszcza że zostało ono zbudowane tak, aby bezproblemowo współpracować z innymi usługami Azure. Na przykład możesz zintegrować Bing, Azure AI Search oraz Azure Functions. Istnieje również głęboka integracja z Microsoft Foundry.

Microsoft Agent Framework integruje się także z usługami Azure poprzez `FoundryChatClient` i tożsamość Azure, umożliwiając wywoływanie usług Azure bezpośrednio z narzędzi agenta.

## Przykładowe kody

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Masz więcej pytań o AI Agent Frameworks?

Dołącz do [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D), aby spotkać się z innymi uczącymi się, uczestniczyć w godzinach konsultacji i uzyskać odpowiedzi na pytania dotyczące AI Agentów.

## Źródła

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Poprzednia lekcja

[Wprowadzenie do AI Agents i zastosowań Agentów](../01-intro-to-ai-agents/README.md)

## Następna lekcja

[Zrozumienie wzorców projektowych Agentic](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->