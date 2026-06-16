# Implementacja Azure Content Safety z MCP

> **Zagrożenie OWASP MCP adresowane**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Aby wzmocnić bezpieczeństwo MCP przed wstrzyknięciem promptów, zatruwaniem narzędzi i innymi specyficznymi dla AI lukami, zaleca się integrację Azure Content Safety. Ten przewodnik implementacji jest zgodny z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integracja z serwerem MCP

Aby zintegrować Azure Content Safety z serwerem MCP, dodaj filtr bezpieczeństwa treści jako middleware w potoku przetwarzania żądań:

1. Zainicjuj filtr podczas uruchamiania serwera
2. Zweryfikuj wszystkie przychodzące żądania narzędzi przed przetwarzaniem
3. Sprawdź wszystkie wychodzące odpowiedzi przed zwróceniem ich klientom
4. Loguj i generuj alerty w przypadku naruszeń bezpieczeństwa
5. Wdróż odpowiednie obsługi błędów w przypadku nieudanych kontroli bezpieczeństwa treści

Zapewnia to solidną ochronę przed:
- Atakami wstrzyknięcia promptów
- Próbami zatruwania narzędzi
- Eksfiltrowaniem danych za pomocą złośliwych wejść
- Generowaniem szkodliwych treści

## Najlepsze praktyki integracji Azure Content Safety

1. **Niestandardowe listy blokujące**: Twórz niestandardowe listy blokujące specjalnie dla wzorców wstrzyknięć MCP
2. **Dopasowanie stopnia zagrożenia**: Dostosuj progi nasilenia na podstawie konkretnego zastosowania i tolerancji ryzyka
3. **Kompleksowe pokrycie**: Stosuj kontrole bezpieczeństwa treści do wszystkich wejść i wyjść
4. **Optymalizacja wydajności**: Rozważ implementację pamięci podręcznej do powtarzających się kontroli bezpieczeństwa treści
5. **Mechanizmy awaryjne**: Zdefiniuj jasne zachowania zapasowe, gdy usługi bezpieczeństwa treści są niedostępne
6. **Informacje zwrotne dla użytkowników**: Zapewnij jasną informację dla użytkowników, gdy treść jest blokowana z powodu obaw o bezpieczeństwo
7. **Ciągłe doskonalenie**: Regularnie aktualizuj listy blokujące i wzorce w oparciu o nowe zagrożenia

## Dodatkowe zasoby

### Wytyczne bezpieczeństwa OWASP MCP
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kompleksowy OWASP MCP Top 10 z implementacją Azure
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Szczegółowe wzorce ograniczania wstrzyknięcia promptów
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktyczny Camp 3: I/O Security obejmuje bezpieczeństwo treści

### Dokumentacja Azure
- [Przegląd Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentacja Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Co dalej

- Wróć do: [Przegląd modułu bezpieczeństwa](./README.md)
- Kontynuuj do: [Moduł 3: Pierwsze kroki](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->