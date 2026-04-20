# Kujenga Mawakala wa Matumizi ya Kompyuta (CUA)

Mawakala wa matumizi ya kompyuta wanaweza kuingiliana na tovuti kwa njia ile ile mtu anavyofanya: kwa kufungua kivinjari, kuchunguza ukurasa, na kuchukua hatua inayofuata bora kutokana na wanachokiona. Katika somo hili, utajenga wakala wa otomatiki wa kivinjari anayesaka Airbnb, kutoa data iliyopangwa ya orodha, na kubaini makazi ya bei rahisi zaidi huko Stockholm.

Somo hili linachanganya Browser-Use kwa urambazaji unaotegemea AI, Playwright na Chrome DevTools Protocol (CDP) kwa usimamizi wa kivinjari, Azure OpenAI kwa mawazo yanayotegemea kuona, na Pydantic kwa uchimbaji uliopangwa.

## Utangulizi

Somo hili litahusu:

- Kuelewa ni lini mawakala wa matumizi ya kompyuta ni bora zaidi kuliko otomatiki ya API tu
- Kuchanganya Browser-Use na Playwright na CDP kwa usimamizi wa maisha ya kivinjari unaotegemewa
- Kutumia Azure OpenAI kwa kuona na matokeo yaliyopangwa ya Pydantic kutoa data ya orodha kutoka kwenye kurasa za wavuti zinazobadilika
- Kuamua ni lini kutumia mtiririko wa kazi wa otomatiki wa kivinjari wa wakala-kwa-kwanza, muigizaji-kwa-kwanza, au mchanganyiko

## Malengo ya Kujifunza

Baada ya kumaliza somo hili, utajua jinsi ya:

- Kusanidi Browser-Use na Azure OpenAI na Playwright
- Kujenga mtiririko wa kazi wa otomatiki wa kivinjari unaorambaza tovuti halisi na kushughulikia vipengele vya UI vinavyobadilika
- Kuchimba matokeo yaliyoandikwa kutoka kwenye maudhui yanayoonekana ya ukurasa na kuyageuza kuwa mantiki ya biashara ya chini
- Kuchagua kati ya mifumo ya wakala na muigizaji kulingana na jinsi kazi ya kivinjari inavyoweza kutabirika

## Mfano wa Msimbo

Somo hili linajumuisha darasa moja la daftari la mafunzo:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Huanza kikao cha Chrome kupitia CDP, husaka orodha za Stockholm kwenye Airbnb, hutoa bei kwa msaada wa Browser-Use vision, na hurudisha chaguo la bei ya chini kama data iliyopangwa.

## Mahitaji Kabla ya Kuanza

- Python 3.12+
- Maandalizi ya kuanzisha Azure OpenAI katika mazingira yako
- Chrome au Chromium imewekwa karibu nawe
- Mtegemezo wa Playwright umewekwa
- Uelewa wa msingi wa Python asynchronous

## Usanidi

Sakinisha vifurushi vinavyotumika kwenye daftari la mafunzo:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Weka vigezo vya mazingira vya Azure OpenAI vinavyotumika na daftari la mafunzo:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Hiari: chaguo-msingi ni toleo la API la hivi karibuni linapokosekana
AZURE_OPENAI_API_VERSION=...
```

## Muhtasari wa Miundo

Daftari la mafunzo linaonyesha mtiririko wa kazi wa otomatiki wa kivinjari mchanganyiko:

1. Chrome inaanza na CDP imewezeshwa ili Playwright na Browser-Use wote waweze kutumia kikao kimoja cha kivinjari.
2. Wakala wa Browser-Use hushughulikia kazi za urambazaji zisizo na kikomo kama kufungua Airbnb, kufunga madirisha ya pop-up, na kutafuta Stockholm.
3. Ukurasa unaofanya kazi unachunguzwa kwa kutumia skima iliyopangwa ya Pydantic kuchimba vichwa vya orodha, bei za usiku, tathmini, na URL.
4. Mantiki ya Python inalinganisha orodha zilizochimbwa na kuangazia matokeo ya bei rahisi zaidi.

Mbinu hii inahifadhi mafanikio ya mawazo yanayotegemea kuona ya Browser-Use wakati pia inakupa udhibiti thabiti wa kivinjari unapohitaji.

## Masuala Muhimu na Mbinu Bora

### Ni Lini Utumie Wakala dhidi ya Muigizaji

| Muktadha | Tumia Wakala | Tumia Muigizaji |
|----------|--------------|-----------------|
| Muundo unaobadilika | Ndiyo, AI inaweza kuendana na mabadiliko ya ukurasa | Hapana, wachagualegea wanaweza kuvunjika |
| Muundo unaojulikana | Hapana, wakala ni polepole zaidi kuliko udhibiti wa moja kwa moja | Ndiyo, haraka na sahihi |
| Kupata vipengele | Ndiyo, lugha ya asili hufanya kazi vizuri | Hapana, wachagualegea halisi wanahitajika |
| Udhibiti wa muda | Hapana, hawezi kutabirika | Ndiyo, udhibiti kamili wa kusubiri na jaribio la tena |
| Mtiririko tata wa kazi | Ndiyo, hushughulikia hali zisizotarajiwa za UI | Hapana, inahitaji matawi yaliyo wazi |

### Mbinu Bora za Browser-Use

1. Anza na wakala kwa ajili ya uchunguzi na urambazaji unaobadilika.
2. Badilisha kwa udhibiti wa moja kwa moja wa ukurasa wakati mwingiliano unapotabirika.
3. Tumia mifano ya matokeo yaliyopangwa ili data iliyochimbwa ithibitishwe na iwe salama kuandikwa.
4. Ongeza kuchelewa kwa busara baada ya hatua zinazosababisha mabadiliko ya UI yanayoonekana.
5. Piga picha skrini wakati wa kujaribu ili kutatua matatizo kwa urahisi.
6. Tarajia mabadiliko ya tovuti na buni mikakati ya kujikinga kwa madirisha ya pop-up na mabadiliko ya muundo.
7. Changanya mifumo ya wakala na muigizaji kupata ufanisi na usahihi.

### Matumizi Halisi ya Dunia

- Uhifadhi wa safari na ufuatiliaji wa bei
- Kulinganisha bei na ukaguzi wa upatikanaji wa biashara mtandaoni
- Uchimbaji uliopangwa kutoka kwenye tovuti zinazobadilika
- Upimaji na uthibitishaji wa UI zinazojua kuona
- Ufuatiliaji wa tovuti na arifa
- Kujaza fomu kwa akili katika mchakato wa hatua nyingi

## Rasilimali Zaidi

- [Kiolezo cha muingiliano wa Browser-Use Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Vipengele vya muigizaji na uchimbaji wa maudhui wa Browser-Use](https://docs.browser-use.com/customize/actor/all-parameters)
- [Usanidi wa Kozi](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kiamili**:
Nyaraka hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kwa usahihi, tafadhali fahamu kwamba tafsiri za moja kwa moja zinaweza kuwa na makosa au taharuki. Nyaraka ya asili katika lugha yake halisi inapaswa kuzingatiwa kama chanzo cha mamlaka. Kwa habari muhimu, tafsiri ya kitaalamu na ya binadamu inapendekezwa. Hatuwajibiki kwa kutoelewana au tafsiri potofu zinazotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->