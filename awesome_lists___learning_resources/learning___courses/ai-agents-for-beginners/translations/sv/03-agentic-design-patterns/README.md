[![Hur man utformar bra AI-agenter](../../../translated_images/sv/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Klicka på bilden ovan för att se videon till den här lektionen)_
# Principer för agentisk AI-design

## Introduktion

Det finns många sätt att tänka kring uppbyggnaden av agentiska AI-system. Eftersom tvetydighet är en egenskap snarare än ett fel i design av generativ AI kan det ibland vara svårt för ingenjörer att veta var de ska börja. Vi har skapat en uppsättning människocentrerade UX-designprinciper för att möjliggöra för utvecklare att bygga kundcentrerade agentiska system för att lösa deras affärsbehov. Dessa designprinciper är inte en föreskrivande arkitektur utan snarare en startpunkt för team som definierar och bygger agentupplevelser.

Generellt bör agenter:

- Utvidga och skala mänskliga förmågor (idéutveckling, problemlösning, automatisering osv.)
- Fyll i kunskapsluckor (ge mig snabb uppdatering om kunskapsdomäner, översättning osv.)
- Underlätta och stödja samarbete på de sätt vi som individer föredrar att arbeta med andra
- Göra oss till bättre versioner av oss själva (t.ex. livscoach/uppgiftsledare, hjälpa oss att lära oss emotionell reglering och mindfulness-färdigheter, bygga resiliens osv.)

## Den här lektionen kommer att täcka

- Vad Agentiska designprinciper är
- Vilka riktlinjer som bör följas vid implementering av dessa designprinciper
- Några exempel på att använda designprinciperna

## Lärandemål

Efter att ha slutfört den här lektionen kommer du att kunna:

1. Förklara vad de agentiska designprinciperna är
2. Förklara riktlinjerna för att använda de agentiska designprinciperna
3. Förstå hur man bygger en agent med hjälp av de agentiska designprinciperna

## De agentiska designprinciperna

![Agentic Design Principles](../../../translated_images/sv/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Space)

Detta är miljön där agenten verkar. Dessa principer informerar hur vi designar agenter för att engagera sig i den fysiska och digitala världen.

- **Connecting, not collapsing** – hjälp till att koppla samman människor med andra människor, händelser och handlingsbar kunskap för att möjliggöra samarbete och kontakt.
- Agenter hjälper till att koppla samman händelser, kunskap och människor.
- Agenter för människor närmare varandra. De är inte utformade för att ersätta eller förminska människor.
- **Easily accessible yet occasionally invisible** – agenten fungerar i stort sett i bakgrunden och ger bara en knuff när det är relevant och lämpligt.
  - Agenten är lätt att hitta och komma åt för auktoriserade användare på vilken enhet eller plattform som helst.
  - Agenten stödjer multimodala in- och utdata (ljud, röst, text osv.).
  - Agenten kan sömlöst växla mellan förgrund och bakgrund; mellan proaktiv och reaktiv, beroende på dess uppfattning av användarens behov.
  - Agenten kan fungera i osynlig form, men dess bakgrundsprocessväg och samarbete med andra agenter är transparenta för och kontrollerbara av användaren.

### Agent (Time)

Detta är hur agenten fungerar över tid. Dessa principer informerar hur vi designar agenter som interagerar över dåtid, nutid och framtid.

- **Past**: Reflektera över historia som inkluderar både tillstånd och kontext.
  - Agenten ger mer relevanta resultat baserat på analys av rikare historiska data bortom endast händelsen, människorna eller tillstånden.
  - Agenten skapar kopplingar från tidigare händelser och reflekterar aktivt över minnet för att engagera sig i nuvarande situationer.
- **Now**: Knuffa mer än att bara notifiera.
  - Agenten förkroppsligar ett omfattande tillvägagångssätt för att interagera med människor. När en händelse inträffar går agenten bortom statisk avisering eller annan statisk formalitet. Agenten kan förenkla flöden eller dynamiskt generera ledtrådar för att rikta användarens uppmärksamhet vid rätt tillfälle.
  - Agenten levererar information baserat på kontextuell miljö, sociala och kulturella förändringar och anpassad efter användarens avsikt.
  - Agentinteraktionen kan vara gradvis och utvecklas/växa i komplexitet för att stärka användare över tid.
- **Future**: Anpassa sig och utvecklas.
  - Agenten anpassar sig till olika enheter, plattformar och modaliteter.
  - Agenten anpassar sig efter användarbeteende, tillgänglighetsbehov och är fritt anpassningsbar.
  - Agenten formas av och utvecklas genom kontinuerlig användarinteraktion.

### Agent (Core)

Detta är nyckelelementen i kärnan av en agents design.

- **Embrace uncertainty but establish trust**.
  - En viss nivå av agentosäkerhet är förväntad. Osäkerhet är ett nyckelelement i agentdesign.
  - Förtroende och transparens är grundläggande lager i agentdesign.
  - Människor kontrollerar när agenten är på/av och agentens status är tydligt synlig hela tiden.

## Riktlinjer för att implementera dessa principer

När du använder de tidigare designprinciperna, använd följande riktlinjer:

1. **Transparens**: Informera användaren om att AI är involverat, hur det fungerar (inklusive tidigare åtgärder) och hur man ger feedback och modifierar systemet.
2. **Kontroll**: Möjliggör för användaren att anpassa, ange preferenser och personalisera, samt ha kontroll över systemet och dess attribut (inklusive möjligheten att "glömma").
3. **Konsistens**: Sträva efter konsekventa, multimodala upplevelser över enheter och slutpunkter. Använd välkända UI/UX-element där det är möjligt (t.ex. mikrofonikonen för röstinteraktion) och minska kundens kognitiva belastning så mycket som möjligt (t.ex. sikta på kortfattade svar, visuella hjälpmedel och "Läs mer"-innehåll).

## Hur man designar en reseagent med dessa principer och riktlinjer

Föreställ dig att du designar en reseagent, så här skulle du kunna tänka kring användningen av designprinciperna och riktlinjerna:

1. **Transparens** – Låt användaren veta att reseagenten är en AI-aktiverad agent. Ge några grundläggande instruktioner om hur man kommer igång (t.ex. ett "Hej"-meddelande, exempelpromptar). Dokumentera detta tydligt på produktsidan. Visa listan över prompts som en användare har efterfrågat tidigare. Gör det tydligt hur man ger feedback (tummen upp och tummen ner, Knappen Skicka feedback osv.). Redogör tydligt om agenten har användnings- eller ämnesbegränsningar.
2. **Kontroll** – Se till att det är tydligt hur användaren kan modifiera agenten efter att den skapats med saker som Systemprompt. Gör det möjligt för användaren att välja hur utförlig agenten är, dess skrivstil och eventuella förbehåll för vad agenten inte bör prata om. Tillåt användaren att visa och ta bort associerade filer eller data, prompts och tidigare konversationer.
3. **Konsistens** – Se till att ikonerna för Dela prompt, lägga till en fil eller ett foto och att tagga någon eller något är standardiserade och igenkännbara. Använd gem-ikonen för att indikera filuppladdning/delning med agenten, och en bildikon för att indikera grafikuppladdning.

## Kodexempel

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Har du fler frågor om agentiska designmönster för AI?

Gå med i [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) för att träffa andra deltagare, delta i kontorstider och få dina frågor om AI-agenter besvarade.

## Ytterligare resurser

- <a href="https://openai.com" target="_blank">Riktlinjer för styrning av agentiska AI-system | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">HAX Toolkit-projektet - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Ansvarsfull AI-verktygslåda</a>

## Föregående lektion

[Utforska agentiska ramverk](../02-explore-agentic-frameworks/README.md)

## Nästa lektion

[Designmönster för verktygsanvändning](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Ansvarsfriskrivning:
Detta dokument har översatts med hjälp av AI-översättningstjänsten Co-op Translator (https://github.com/Azure/co-op-translator). Vi strävar efter noggrannhet, men var medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet i dess ursprungliga språkversion bör anses vara den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för eventuella missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->