# Scenariusz 3: Dokumentacja w edytorze z serwerem MCP w VS Code

## Przegląd

W tym scenariuszu nauczysz się, jak wprowadzić dokumentację Microsoft Learn bezpośrednio do środowiska Visual Studio Code za pomocą serwera MCP. Zamiast ciągłego przełączania się między kartami przeglądarki, aby szukać dokumentacji, możesz uzyskać do niej dostęp, wyszukiwać ją i odwoływać się do oficjalnych materiałów bezpośrednio w swoim edytorze. Takie podejście usprawnia Twój workflow, pomaga utrzymać koncentrację i umożliwia płynną integrację z narzędziami takimi jak GitHub Copilot.

- Wyszukuj i czytaj dokumentację w VS Code bez opuszczania środowiska kodowania.
- Odwołuj się do dokumentacji i wstawiaj linki bezpośrednio do plików README lub kursów.
- Korzystaj z GitHub Copilot i MCP razem, by mieć bezproblemowy, wspomagany AI workflow dokumentacyjny.

## Cele nauki

Pod koniec tego rozdziału będziesz rozumieć, jak skonfigurować i używać serwera MCP w VS Code, aby wzbogacić swój workflow dokumentacyjny i deweloperski. Będziesz potrafił:

- Skonfigurować swoje środowisko pracy, by korzystać z serwera MCP do przeszukiwania dokumentacji.
- Wyszukiwać i wstawiać dokumentację bezpośrednio z poziomu VS Code.
- Łączyć siły GitHub Copilot i MCP dla bardziej produktywnego, wspomaganego AI workflow.

Te umiejętności pomogą Ci zachować koncentrację, poprawić jakość dokumentacji oraz zwiększyć produktywność jako deweloper lub autor techniczny.

## Rozwiązanie

Aby uzyskać dostęp do dokumentacji w edytorze, wykonasz serię kroków integrujących serwer MCP z VS Code i GitHub Copilot. To rozwiązanie jest idealne dla autorów kursów, pisarzy dokumentacji i deweloperów, którzy chcą zachować skupienie w edytorze, pracując z dokumentacją i Copilotem.

- Szybko dodawaj linki odniesienia do README podczas pisania kursu lub dokumentacji projektu.
- Korzystaj z Copilota do generowania kodu, a MCP do natychmiastowego znajdowania i cytowania odpowiednich dokumentów.
- Zachowaj skupienie w edytorze i zwiększ produktywność.

### Przewodnik krok po kroku

Aby zacząć, postępuj według tych kroków. Dla każdego kroku możesz dodać zrzut ekranu z folderu assets, aby wizualnie zobrazować proces.

1. **Dodaj konfigurację MCP:**  
   W katalogu głównym projektu utwórz plik `.vscode/mcp.json` i dodaj następującą konfigurację:  
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Ta konfiguracja mówi VS Code, jak połączyć się z [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Krok 1: Dodaj mcp.json do folderu .vscode](../../../../../../translated_images/pl/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Otwórz panel GitHub Copilot Chat:**  
   Jeśli nie masz jeszcze zainstalowanego rozszerzenia GitHub Copilot, przejdź do widoku rozszerzeń w VS Code i zainstaluj je. Możesz pobrać je bezpośrednio z [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Następnie otwórz panel Copilot Chat z paska bocznego.

   ![Krok 2: Otwórz panel Copilot Chat](../../../../../../translated_images/pl/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Włącz tryb agenta i zweryfikuj narzędzia:**  
   W panelu Copilot Chat włącz tryb agenta.

   ![Krok 3: Włącz tryb agenta i zweryfikuj narzędzia](../../../../../../translated_images/pl/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Po włączeniu trybu agenta upewnij się, że serwer MCP jest wymieniony jako jedno z dostępnych narzędzi. Zapewnia to, że agent Copilot ma dostęp do serwera dokumentacji, by pobierać odpowiednie informacje.
   
   ![Krok 3: Zweryfikuj narzędzie serwera MCP](../../../../../../translated_images/pl/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Rozpocznij nową rozmowę i zadaj pytanie agentowi:**  
   Otwórz nową rozmowę w panelu Copilot Chat. Teraz możesz zadawać agentowi pytania dotyczące dokumentacji. Agent użyje serwera MCP, aby pobrać i wyświetlić odpowiednią dokumentację Microsoft Learn bezpośrednio w Twoim edytorze.

   - *„Próbuję napisać plan nauki na temat X. Będę się uczyć tego przez 8 tygodni, dla każdego tygodnia zaproponuj materiał, który powinienem przerobić.”*

   ![Krok 4: Zadaj pytanie agentowi w czacie](../../../../../../translated_images/pl/step4-prompt-chat.12187bb001605efc.webp)

5. **Zapytanie na żywo:**

   > Weźmy zapytanie „na żywo” z sekcji [#get-help](https://discord.gg/D6cRhjHWSC) na Discordzie Microsoft Foundry ([zobacz oryginalną wiadomość](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *„Szukam odpowiedzi na temat wdrożenia rozwiązania wieloagentowego z agentami AI stworzonymi na platformie Azure AI Foundry. Widzę, że nie ma bezpośredniej metody wdrożenia, takiej jak kanały Copilot Studio. Jakie są więc różne sposoby wdrożenia dla użytkowników korporacyjnych, by mogli współpracować i skończyć zadanie?  
Jest wiele artykułów/blogów, które mówią, że można użyć usługi Azure Bot, która może działać jako pomost między MS Teams a agentami Azure AI Foundry. Czy to będzie działać, jeśli skonfiguruję bota Azure łączącego się z agentem Orchestrator na Azure AI Foundry przez Azure Function, aby wykonać orkiestrację, czy muszę tworzyć Azure Function dla każdego agenta AI w ramach rozwiązania wieloagentowego, by wykonać orkiestrację w Bot framework? Inne sugestie mile widziane.”*

   ![Krok 5: Zapytania na żywo](../../../../../../translated_images/pl/step5-live-queries.49db3e4a50bea273.webp)

   Agent odpowie odpowiednimi linkami do dokumentacji i podsumowaniami, które możesz bezpośrednio wstawić do swoich plików markdown lub wykorzystać jako odniesienia w kodzie.
   
### Przykładowe zapytania

Oto kilka przykładowych zapytań, które możesz wypróbować. Pokażą one, jak serwer MCP i Copilot mogą współpracować, aby dostarczać natychmiastową, kontekstową dokumentację i odniesienia bez opuszczania VS Code:

- „Pokaż mi, jak używać wyzwalaczy Azure Functions.”
- „Wstaw link do oficjalnej dokumentacji Azure Key Vault.”
- „Jakie są najlepsze praktyki zabezpieczania zasobów Azure?”
- „Znajdź szybki start dla usług Azure AI.”

Te zapytania pokażą, jak serwer MCP i Copilot współpracują, aby dostarczać natychmiastową, kontekstową dokumentację i odniesienia bez opuszczania VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->