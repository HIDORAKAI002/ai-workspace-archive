# Zaawansowane zabezpieczenia MCP z Azure Content Safety

> **Rozwiązany ryzyko OWASP MCP**: [MCP06 - Wstrzykiwanie poleceń przez kontekstowe ładunki](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety oferuje kilka potężnych narzędzi, które mogą zwiększyć bezpieczeństwo Twoich implementacji MCP. Aby zdobyć praktyczne doświadczenie z wdrożeniem, zobacz [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Tarcze promptów

Tarcze promptów AI Microsoftu zapewniają solidną ochronę przed bezpośrednimi i pośrednimi atakami typu prompt injection poprzez:

1. **Zaawansowane wykrywanie**: Używa uczenia maszynowego do identyfikacji złośliwych instrukcji osadzonych w treści.
2. **Wyróżnianie**: Przekształca tekst wejściowy, pomagając systemom AI rozróżnić prawidłowe instrukcje od zewnętrznych danych.
3. **Delimitery i oznaczanie danych**: Oznacza granice między zaufanymi a niezaufanymi danymi.
4. **Integracja z Content Safety**: Współpracuje z Azure AI Content Safety do wykrywania prób jailbreaku i szkodliwych treści.
5. **Ciągłe aktualizacje**: Microsoft regularnie aktualizuje mechanizmy ochrony przed pojawiającymi się zagrożeniami.

## Implementacja Azure Content Safety z MCP

To podejście zapewnia wielowarstwową ochronę:
- Skanowanie danych wejściowych przed ich przetworzeniem
- Weryfikację wyników przed ich zwróceniem
- Korzystanie z czarnych list znanych szkodliwych wzorców
- Wykorzystanie ciągle aktualizowanych modeli bezpieczeństwa treści Azure

## Zasoby Azure Content Safety

Aby dowiedzieć się więcej o implementacji Azure Content Safety z serwerami MCP, zapoznaj się z tymi oficjalnymi zasobami:

1. [Dokumentacja Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Oficjalna dokumentacja Azure Content Safety.
2. [Dokumentacja tarczy promptów](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Jak zapobiegać atakom typu prompt injection.
3. [Referencja API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Szczegółowa referencja API do implementacji Content Safety.
4. [Szybki start: Azure Content Safety z C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Szybki przewodnik wdrożenia w C#.
5. [Biblioteki klienckie Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Biblioteki klienckie dla różnych języków programowania.
6. [Wykrywanie prób jailbreaku](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Szczegółowe wskazówki dotyczące wykrywania i zapobiegania prób jailbreaku.
7. [Najlepsze praktyki dla Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Najlepsze praktyki skutecznej implementacji bezpieczeństwa treści.

Dla bardziej szczegółowej implementacji zobacz nasz [przewodnik implementacji Azure Content Safety](./azure-content-safety-implementation.md).

## Co dalej

- Przeczytaj: [Implementacja Azure Content Safety](./azure-content-safety-implementation.md)
- Powrót do: [Przegląd modułu bezpieczeństwa](./README.md)
- Kontynuuj: [Moduł 3: Pierwsze kroki](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Ten dokument został przetłumaczony przy użyciu automatycznej usługi tłumaczeniowej AI [Co-op Translator](https://github.com/Azure/co-op-translator). Chociaż dokładamy starań, aby tłumaczenie było jak najdokładniejsze, prosimy mieć na uwadze, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w języku źródłowym powinien być traktowany jako wiarygodne źródło. W przypadku informacji o krytycznym znaczeniu zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->