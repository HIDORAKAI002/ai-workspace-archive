[![Jak projektować dobre agent AI](../../../translated_images/pl/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Kliknij powyższy obraz, aby obejrzeć wideo z tej lekcji)_
# Zasady projektowania agentów AI

## Wprowadzenie

Istnieje wiele sposobów myślenia o budowaniu agentowych systemów AI. Biorąc pod uwagę, że niejasność jest cechą, a nie błędem w projektowaniu Generatywnej AI, czasami inżynierom trudno jest nawet zacząć. Stworzyliśmy zestaw zorientowanych na człowieka zasad projektowania UX, które umożliwiają programistom tworzenie systemów agentowych skoncentrowanych na kliencie, aby rozwiązywać ich potrzeby biznesowe. Te zasady projektowania nie są narzuconą architekturą, lecz raczej punktem wyjścia dla zespołów definiujących i budujących doświadczenia agentowe.

Ogólnie rzecz biorąc, agenci powinni:

- Poszerzać i skalować ludzkie zdolności (burza mózgów, rozwiązywanie problemów, automatyzacja itp.)
- Wypełniać luki wiedzy (zapoznać mnie z dziedzinami wiedzy, tłumaczenia itp.)
- Ułatwiać i wspierać współpracę w sposób, w jaki jako indywidualni użytkownicy wolimy pracować z innymi
- Czynić nas lepszymi wersjami samych siebie (np. trener życia/mistrz zadań, pomagający nam uczyć się regulacji emocji i uważności, budować odporność itp.)

## Ta lekcja obejmie

- Czym są zasady projektowania agentowego
- Jakie wytyczne należy stosować podczas wdrażania tych zasad projektowania
- Przykłady wykorzystania zasad projektowych

## Cele nauki

Po ukończeniu tej lekcji będziesz w stanie:

1. Wyjaśnić, czym są zasady projektowania agentowego
2. Wyjaśnić wytyczne dotyczące stosowania zasad projektowania agentowego
3. Zrozumieć, jak zbudować agenta przy użyciu zasad projektowania agentowego

## Zasady projektowania agentowego

![Zasady projektowania agentowego](../../../translated_images/pl/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Przestrzeń)

To jest środowisko, w którym agent działa. Te zasady informują, jak projektujemy agentów do angażowania się w światy fizyczne i cyfrowe.

- **Łączenie, a nie zlewanie** – pomagaj łączyć ludzi z innymi ludźmi, wydarzeniami i użyteczną wiedzą, aby umożliwić współpracę i nawiązywanie kontaktów.
- Agenci pomagają łączyć wydarzenia, wiedzę i ludzi.
- Agenci zbliżają ludzi do siebie. Nie są projektowani, aby zastępować lub umniejszać ludzi.
- **Łatwo dostępny, lecz czasem niewidoczny** – agent działa w dużej mierze w tle i tylko delikatnie zachęca, gdy jest to istotne i stosowne.
  - Agent jest łatwo odnajdywalny i dostępny dla uprawnionych użytkowników na dowolnym urządzeniu lub platformie.
  - Agent obsługuje multimodalne wejścia i wyjścia (dźwięk, głos, tekst itp.).
  - Agent może płynnie przechodzić między pierwszym planem a tłem; między trybem proaktywnym a reaktywnym, w zależności od odczuwanych potrzeb użytkownika.
  - Agent może działać w formie niewidocznej, lecz jego ścieżka procesu w tle i współpraca z innymi Agentami są przejrzyste i kontrolowane przez użytkownika.

### Agent (Czas)

To sposób, w jaki agent działa w czasie. Te zasady informują, jak projektujemy agentów współdziałających z przeszłością, teraźniejszością i przyszłością.

- **Przeszłość**: Refleksja nad historią, która obejmuje stan i kontekst.
  - Agent dostarcza bardziej trafne wyniki na podstawie analizy bogatszych danych historycznych wykraczających poza samo zdarzenie, ludzi czy stany.
  - Agent tworzy połączenia z przeszłych wydarzeń i aktywnie reflektuje nad pamięcią, aby angażować się w bieżące sytuacje.
- **Teraz**: Zachęcanie bardziej niż powiadamianie.
  - Agent reprezentuje kompleksowe podejście do interakcji z ludźmi. Gdy zdarzenie się zdarzy, agent wykracza poza statyczne powiadomienie lub inną statyczną formalność. Agent może uprościć procesy lub dynamicznie generować wskazówki, by skierować uwagę użytkownika w odpowiednim momencie.
  - Agent dostarcza informacji na podstawie kontekstu środowiskowego, zmian społecznych i kulturowych oraz dostosowuje się do intencji użytkownika.
  - Interakcja z agentem może być stopniowa, ewoluująca/rosnąca w złożoności, aby wzmacniać użytkowników na dłuższą metę.
- **Przyszłość**: Adaptacja i ewolucja.
  - Agent dostosowuje się do różnych urządzeń, platform i modalności.
  - Agent dostosowuje się do zachowań użytkownika, potrzeb dostępności i jest dowolnie konfigurowalny.
  - Agent jest kształtowany i ewoluuje poprzez ciągłą interakcję z użytkownikiem.

### Agent (Rdzeń)

To kluczowe elementy w rdzeniu projektu agenta.

- **Akceptuj niepewność, ale ustanów zaufanie**.
  - Oczekuje się pewnego poziomu niepewności agenta. Niepewność jest kluczowym elementem projektu agenta.
  - Zaufanie i przejrzystość to podstawowe warstwy projektowania agenta.
  - Ludzie kontrolują, kiedy agent jest włączony/wyłączony, a status agenta jest zawsze wyraźnie widoczny.

## Wytyczne do wdrażania tych zasad

Kiedy używasz powyższych zasad projektowania, stosuj następujące wytyczne:

1. **Przejrzystość**: Informuj użytkownika, że AI jest zaangażowane, jak działa (w tym działania z przeszłości) oraz jak udzielać opinii i modyfikować system.
2. **Kontrola**: Umożliw użytkownikowi dostosowanie, określenie preferencji i personalizację oraz kontrolę nad systemem i jego cechami (w tym możliwość zapominania).
3. **Spójność**: Dąż do spójnych, multimodalnych doświadczeń na różnych urządzeniach i punktach końcowych. Stosuj znajome elementy UI/UX tam, gdzie to możliwe (np. ikona mikrofonu do interakcji głosowej) i minimalizuj obciążenie poznawcze klienta (np. dąż do zwięzłych odpowiedzi, pomocy wizualnej i treści „Dowiedz się więcej”).

## Jak zaprojektować agenta podróży, korzystając z tych zasad i wytycznych

Wyobraź sobie, że projektujesz agenta podróży, oto jak możesz rozważyć użycie zasad i wytycznych:

1. **Przejrzystość** – Poinformuj użytkownika, że agent podróży to agent wspierany AI. Zapewnij podstawowe wskazówki, jak zacząć (np. wiadomość „Witaj”, przykładowe zapytania). Wyraźnie udokumentuj to na stronie produktu. Pokaż listę zapytań, które użytkownik zadał wcześniej. Wyraźnie zaznacz, jak udzielać opinii (kciuki w górę i w dół, przycisk Wyślij opinię itp.). Wyraźnie zaznacz, jeśli agent ma ograniczenia dotyczące korzystania lub tematów.
2. **Kontrola** – Upewnij się, że jest jasne, jak użytkownik może modyfikować agenta po jego utworzeniu, na przykład za pomocą komunikatów systemowych. Pozwól użytkownikowi wybrać, jak bardzo rozbudowany jest agent, jego styl pisania oraz wszelkie zastrzeżenia dotyczące tematów, o których agent nie powinien rozmawiać. Pozwól użytkownikowi przeglądać i usuwać powiązane pliki lub dane, zapytania i wcześniejsze rozmowy.
3. **Spójność** – Upewnij się, że ikony Udostępnij zapytanie, dodaj plik lub zdjęcie oraz oznacz kogoś lub coś są standardowe i rozpoznawalne. Używaj ikony spinacza, aby wskazać przesyłanie/udostępnianie plików agentowi, a ikony obrazu do wskazania przesyłania grafik.

## Przykładowe kody

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Masz więcej pytań dotyczących wzorców projektowych agentów AI?

Dołącz do [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), aby spotkać innych uczących się, uczestniczyć w godzinach konsultacji i uzyskać odpowiedzi na pytania dotyczące agentów AI.

## Dodatkowe zasoby

- <a href="https://openai.com" target="_blank">Praktyki zarządzania systemami AI agentowymi | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Projekt narzędzi HAX - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Zestaw narzędzi odpowiedzialnej AI</a>

## Poprzednia lekcja

[Badanie agentowych frameworków](../02-explore-agentic-frameworks/README.md)

## Następna lekcja

[Wzorzec projektowy użycia narzędzi](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Pomimo naszych starań o dokładność, prosimy pamiętać, że tłumaczenia automatyczne mogą zawierać błędy lub niedokładności. Oryginalny dokument w języku źródłowym należy uważać za źródło wiarygodne. W przypadku informacji o istotnym znaczeniu zaleca się skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->