# Vytváření agentů pro používání počítače (CUA)

Agentů pro používání počítače mohou interagovat s webovými stránkami stejným způsobem jako člověk: otevřením prohlížeče, prohlížením stránky a vykonáním nejlepšího možného kroku na základě toho, co vidí. V této lekci vytvoříte automatizačního agenta, který vyhledá na Airbnb, extrahuje strukturovaná data o nabídkách a identifikuje nejlevnější ubytování ve Stockholmu.

Lekce kombinuje Browser-Use pro navigaci řízenou AI, Playwright a Chrome DevTools Protocol (CDP) pro ovládání prohlížeče, Azure OpenAI pro viděním podmíněné uvažování a Pydantic pro strukturovanou extrakci.

## Úvod

V této lekci se naučíte:

- Kdy jsou agenti používající počítač vhodnější než automaty založené pouze na API
- Kombinaci Browser-Use s Playwright a CDP pro spolehlivou správu životního cyklu prohlížeče
- Použití Azure OpenAI vidění a strukturovaného výstupu Pydantic pro extrakci dat o nabídkách z dynamických webových stránek
- Rozhodování, kdy použít workflow orientované na agenta, na aktora, nebo hybridní automatizaci prohlížeče

## Cíle učení

Po dokončení této lekce budete umět:

- Nakonfigurovat Browser-Use s Azure OpenAI a Playwright
- Vytvořit workflow automatizace prohlížeče, který prochází skutečnou webovou stránku a zvládá dynamické prvky UI
- Extrahovat typované výsledky z viditelného obsahu stránky a převádět je do následující obchodní logiky
- Vybrat mezi vzory agent a aktor podle toho, jak předvídatelný je úkol v prohlížeči

## Ukázka kódu

Tato lekce obsahuje jeden tutoriál ve formě notebooku:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Spouští Chrome se zapnutým CDP, vyhledává na Airbnb nabídky ve Stockholmu, extrahuje ceny pomocí Browser-Use vidění a vrací nejlevnější možnost jako strukturovaná data.

## Požadavky

- Python 3.12+
- Konfigurované nasazení Azure OpenAI ve vašem prostředí
- Lokálně nainstalovaný Chrome nebo Chromium
- Nainstalované závislosti Playwright
- Základní znalost asynchronního Pythonu

## Nastavení

Nainstalujte balíčky použité v notebooku:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Nastavte proměnné prostředí Azure OpenAI, které používá notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Volitelné: pokud není zadáno, použije se nejnovější verze API
AZURE_OPENAI_API_VERSION=...
```

## Přehled architektury

Notebook demonstruje hybridní workflow automatizace prohlížeče:

1. Chrome je spuštěn s povoleným CDP, aby mohly Playwright i Browser-Use sdílet stejnou relaci prohlížeče.
2. Agent Browser-Use zpracovává úkoly otevřené navigace, jako je otevření Airbnb, zavření vyskakovacích oken a vyhledání Stockholmu.
3. Aktivní stránka je prozkoumána pomocí strukturované schématu Pydantic pro extrakci názvů nabídek, cen za noc, hodnocení a URL.
4. Pythonová logika porovná extrahované nabídky a zvýrazní nejlevnější výsledek.

Tento přístup zachovává flexibilní, vizí založené uvažování Browser-Use a zároveň poskytuje deterministickou kontrolu prohlížeče, když ji potřebujete.

## Klíčové poznatky a osvědčené postupy

### Kdy použít agenta vs aktora

| Scénář | Použít agenta | Použít aktora |
|----------|-----------|-----------|
| Dynamické rozvržení | Ano, AI se dokáže přizpůsobit změnám stránky | Ne, křehké selektory mohou selhat |
| Známá struktura | Ne, agent je pomalejší než přímá kontrola | Ano, rychlé a přesné |
| Hledání prvků | Ano, funguje přirozený jazyk | Ne, jsou potřeba přesné selektory |
| Řízení času | Ne, méně předvídatelné | Ano, plná kontrola nad čekáním a opakováním |
| Komplexní workflow | Ano, zvládá neočekávané stavy UI | Ne, vyžaduje explicitní větvení |

### Osvědčené postupy Browser-Use

1. Začněte s agentem pro průzkum a dynamickou navigaci.
2. Přejděte na přímou kontrolu stránky, když se interakce stane předvídatelnou.
3. Používejte strukturované výstupní modely, aby byla extrahovaná data validována a typově bezpečná.
4. Přidávejte zpoždění strategicky po akcích, které způsobují viditelné změny v uživatelském rozhraní.
5. Pořiďte snímky obrazovky během iterací, aby bylo snazší ladit chyby.
6. Počítejte s tím, že se webové stránky mění a navrhujte záložní strategie pro vyskakovací okna a posuny rozvržení.
7. Kombinujte vzory agent a aktor, abyste získali flexibilitu i přesnost.

### Reálné aplikace

- Rezervace cest a sledování cen
- Porovnání cen a dostupnosti e-shopů
- Strukturovaná extrakce z dynamických webů
- Testování a ověřování UI s podporou vidění
- Monitorování a upozornění na webu
- Inteligentní vyplňování formulářů v multi-krokových procesech

## Další zdroje

- [Browser-Use šablona integrace Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Parametry aktorů a extrakce obsahu Browser-Use](https://docs.browser-use.com/customize/actor/all-parameters)
- [Nastavení kurzu](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o odmítnutí odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). I když se snažíme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho rodném jazyce by měl být považován za autoritativní zdroj. Pro důležité informace se doporučuje profesionální lidský překlad. Nepřebíráme odpovědnost za jakékoliv nedorozumění nebo nesprávné interpretace vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->