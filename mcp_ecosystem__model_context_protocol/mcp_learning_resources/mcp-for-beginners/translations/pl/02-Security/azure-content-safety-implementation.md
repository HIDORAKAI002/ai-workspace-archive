# Implementacja Azure Content Safety z MCP

> **Adresowane ryzyko MCP OWASP**: [MCP06 - Wstrzyknięcie prompta przez ładunki kontekstowe](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Aby wzmocnić zabezpieczenia MCP przeciwko wstrzyknięciom prompta, zatruciu narzędzi oraz innym specyficznym dla AI podatnościom, zdecydowanie zaleca się integrację z Azure Content Safety. Ten przewodnik implementacji jest zgodny z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integracja z serwerem MCP

Aby zintegrować Azure Content Safety z Twoim serwerem MCP, dodaj filtr content safety jako middleware w potoku przetwarzania żądań:

1. Zainicjalizuj filtr podczas uruchamiania serwera
2. Waliduj wszystkie przychodzące żądania narzędzi przed przetwarzaniem
3. Sprawdzaj wszystkie wychodzące odpowiedzi przed zwróceniem ich do klientów
4. Rejestruj i wysyłaj alerty w przypadku naruszeń bezpieczeństwa
5. Zaimplementuj odpowiednie obsłużenie błędów dla nieudanych kontroli content safety

Zapewnia to solidną obronę przed:
- Atakami wstrzyknięcia prompta
- Próbami zatrucia narzędzi
- Eksfiltrowaniem danych przez złośliwe wejścia
- Generowaniem szkodliwych treści

## Najlepsze praktyki integracji Azure Content Safety

1. **Niesteandardowe listy blokad**: Twórz niestandardowe listy blokad dedykowane wzorcom wstrzyknięć MCP
2. **Dostosowanie poziomu ważności**: Reguluj progi ważności w zależności od konkretnego zastosowania i tolerancji ryzyka
3. **Kompleksowe pokrycie**: Stosuj kontrole content safety do wszystkich danych wejściowych i wyjściowych
4. **Optymalizacja wydajności**: Rozważ implementację pamięci podręcznej przy powtarzających się kontrolach content safety
5. **Mechanizmy awaryjne**: Określ jasne zachowania awaryjne, gdy usługi content safety są niedostępne
6. **Informowanie użytkownika**: Zapewnij wyraźne informacje zwrotne dla użytkowników, gdy treść zostanie zablokowana z powodów bezpieczeństwa
7. **Ciągłe ulepszanie**: Regularnie aktualizuj listy blokad i wzorce na podstawie pojawiających się zagrożeń

## Dodatkowe zasoby

### Wskazówki bezpieczeństwa OWASP MCP
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Kompleksowy OWASP MCP Top 10 z implementacją Azure
- [MCP06 - Wstrzyknięcie prompta](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Szczegółowe wzorce łagodzenia wstrzyknięć prompta
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Warsztat praktyczny Camp 3: I/O Security obejmuje content safety

### Dokumentacja Azure
- [Azure Content Safety Overview](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentacja Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Co dalej

- Powrót do: [Przegląd modułu bezpieczeństwa](./README.md)
- Kontynuuj do: [Moduł 3: Pierwsze kroki](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Oświadczenie o wyłączeniu odpowiedzialności**:
Dokument ten został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo że dążymy do jak największej dokładności, prosimy pamiętać, że tłumaczenia automatyczne mogą zawierać błędy lub nieścisłości. Oryginalny dokument w języku źródłowym należy uznać za źródło autorytatywne. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->