# Zaawansowane zabezpieczenia MCP z Azure Content Safety

> **Adresowane zagrożenie OWASP MCP**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety oferuje kilka potężnych narzędzi, które mogą zwiększyć bezpieczeństwo Twoich implementacji MCP. Aby zdobyć praktyczne doświadczenie z implementacją, zobacz [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsoft AI Prompt Shields zapewnia solidną ochronę przed zarówno bezpośrednimi, jak i pośrednimi atakami wstrzyknięcia podpowiedzi poprzez:

1. **Zaawansowane wykrywanie**: Wykorzystuje uczenie maszynowe do identyfikowania złośliwych instrukcji osadzonych w treści.
2. **Wyróżnianie**: Przekształca tekst wejściowy, aby pomóc systemom AI rozróżnić między poprawnymi instrukcjami a danymi zewnętrznymi.
3. **Separatory i oznaczanie danych**: Oznacza granice między zaufanymi a niezaufanymi danymi.
4. **Integracja z Content Safety**: Współpracuje z Azure AI Content Safety w celu wykrywania prób jailbreaku i szkodliwej zawartości.
5. **Ciągłe aktualizacje**: Microsoft regularnie aktualizuje mechanizmy ochronne przeciw nowym zagrożeniom.

## Implementacja Azure Content Safety z MCP

To podejście zapewnia ochronę wielowarstwową:
- Skanowanie danych wejściowych przed przetwarzaniem
- Weryfikowanie wyników przed zwróceniem
- Używanie list blokujących dla znanych szkodliwych wzorców
- Wykorzystanie stale aktualizowanych modeli bezpieczeństwa zawartości Azure

## Zasoby Azure Content Safety

Aby dowiedzieć się więcej o implementacji Azure Content Safety z serwerami MCP, zapoznaj się z oficjalnymi zasobami:

1. [Dokumentacja Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Oficjalna dokumentacja Azure Content Safety.
2. [Dokumentacja Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Dowiedz się, jak zapobiegać atakom wstrzyknięcia podpowiedzi.
3. [Referencja API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Szczegółowa referencja API do implementacji Content Safety.
4. [Szybki start: Azure Content Safety z C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Przewodnik szybkiej implementacji w C#.
5. [Biblioteki klienckie Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Biblioteki klienckie dla różnych języków programowania.
6. [Wykrywanie prób jailbreaku](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specyficzne wskazówki dotyczące wykrywania i zapobiegania próbom jailbreaku.
7. [Najlepsze praktyki dla Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Zalecenia dotyczące skutecznej implementacji bezpieczeństwa zawartości.

Dla bardziej szczegółowej implementacji zobacz nasz [Przewodnik po implementacji Azure Content Safety](./azure-content-safety-implementation.md).

## Co dalej

- Przeczytaj: [Implementacja Azure Content Safety](./azure-content-safety-implementation.md)
- Wróć do: [Przegląd modułu bezpieczeństwa](./README.md)
- Kontynuuj do: [Moduł 3: Pierwsze kroki](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->