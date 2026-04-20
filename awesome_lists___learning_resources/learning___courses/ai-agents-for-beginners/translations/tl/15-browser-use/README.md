# Pagbuo ng Computer Use Agents (CUA)

Ang mga computer use agents ay maaaring makipag-ugnayan sa mga website tulad ng isang tao: sa pamamagitan ng pagbukas ng browser, pagsisiyasat sa pahina, at pagpili ng pinakamainam na susunod na hakbang batay sa kanilang nakikita. Sa araling ito, gagawa ka ng isang browser automation agent na naghahanap sa Airbnb, kumukuha ng istrukturadong data ng listing, at tinutukoy ang pinakamurang matutuluyan sa Stockholm.

Pinagsasama sa araling ito ang Browser-Use para sa AI-driven navigation, Playwright at Chrome DevTools Protocol (CDP) para sa kontrol ng browser, Azure OpenAI para sa vision-enabled reasoning, at Pydantic para sa istrukturadong pagkuha.

## Panimula

Saklaw ng araling ito ang:

- Pag-unawa kung kailan mas angkop ang computer use agents kaysa API-only automation
- Pagsasama ng Browser-Use sa Playwright at CDP para sa maasahang pamamahala ng lifecycle ng browser
- Paggamit ng Azure OpenAI vision at istrukturadong Pydantic output para kunin ang data ng listing mula sa mga dynamic na web pages
- Pagpapasya kung kailan gagamitin ang agent-first, actor-first, o hybrid na workflow ng browser automation

## Mga Layunin sa Pagkatuto

Pagkatapos makumpleto ang araling ito, malalaman mo kung paano:

- I-configure ang Browser-Use gamit ang Azure OpenAI at Playwright
- Bumuo ng browser automation workflow na nagna-navigate sa isang tunay na website at humahawak sa mga dynamic UI elements
- Kunin ang typed na mga resulta mula sa nakikitang laman ng pahina at gawing downstream business logic
- Pumili sa pagitan ng agent at actor patterns batay sa kung gaano ka-predictable ang browser task

## Halimbawang Code

Kasama sa araling ito ang isang notebook tutorial:

- [15-browser-user.ipynb](./15-browser-user.ipynb): Naglulunsad ng Chrome session sa CDP, naghahanap sa Airbnb ng mga listing sa Stockholm, kumukuha ng mga presyo gamit ang Browser-Use vision, at ibinabalik ang pinakamurang opsyon bilang istrukturadong data.

## Mga Kinakailangan

- Python 3.12+
- Azure OpenAI deployment na naka-configure sa iyong environment
- Chrome o Chromium na naka-install sa lokal
- Playwright dependencies na naka-install
- Pangunahing kaalaman sa async Python

## Setup

I-install ang mga package na ginamit sa notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

I-set ang Azure OpenAI environment variables na ginagamit ng notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Opsyonal: awtomatikong ginagamit ang pinakabagong bersyon ng API kapag hindi inilagay
AZURE_OPENAI_API_VERSION=...
```

## Pangkalahatang Arkitektura

Ipinapakita ng notebook ang isang hybrid na browser automation workflow:

1. Nagsisimula ang Chrome na may CDP enabled upang mapagsaluhan ng Playwright at Browser-Use ang parehong browser session.
2. Ang isang Browser-Use agent ay humahawak sa mga open-ended na gawain ng pag-navigate tulad ng pagbukas ng Airbnb, pagsara ng pop-ups, at paghahanap para sa Stockholm.
3. Sinisiyasat ang aktibong pahina gamit ang istrukturadong Pydantic schema upang kunin ang mga pamagat ng listing, presyo bawat gabi, rating, at mga URL.
4. Tinitingnan ng Python logic ang mga nakuha na listing at itinatampok ang pinakamurang resulta.

Pinapanatili ng ganitong pamamaraan ang flexible, vision-based reasoning na mahusay sa Browser-Use habang binibigyan ka ng deterministic na kontrol sa browser kapag kailangan mo.

## Mga Pangunahing Punto at Pinakamahusay na Mga Praktis

### Kailan Gagamit ng Agent kumpara sa Actor

| Sitwasyon | Gamitin ang Agent | Gamitin ang Actor |
|----------|-------------------|------------------|
| Dynamic na layout | Oo, makaka-adjust ang AI sa pagbabago ng pahina | Hindi, madali masira ng mga brittle selector |
| Kilalang estruktura | Hindi, mas mabagal ang agent kaysa sa direktang kontrol | Oo, mabilis at tumpak |
| Paghahanap ng mga elemento | Oo, mahusay ang natural language | Hindi, kailangan ang eksaktong selectors |
| Kontrol sa timing | Hindi, hindi gaanong predictable | Oo, buong kontrol sa paghihintay at retries |
| Kumplikadong workflows | Oo, humahawak sa mga di inaasahang UI state | Hindi, kailangan ang malinaw na branching |

### Pinakamahusay na Mga Praktis sa Browser-Use

1. Magsimula gamit ang isang agent para sa eksplorasyon at dynamic na pag-navigate.
2. Lumipat sa direktang kontrol ng pahina kapag naging predictable na ang interaksyon.
3. Gumamit ng istrukturadong output models para sa validated at type-safe na data.
4. Magdagdag ng mga delay nang matalino pagkatapos ng mga aksyon na nag-trigger ng nakikitang pagbabago sa UI.
5. Mag-capture ng screenshots habang nagpapatuloy ang pag-iterasyon upang mas madali i-debug ang mga pagkabigo.
6. Asahan ang pagbabago ng mga website at magdisenyo ng fallback strategies para sa pop-ups at pagbabago ng layout.
7. Pagsamahin ang agent at actor patterns upang makuha ang parehong flexibility at precision.

### Mga Totoong Gamit

- Pagbu-book ng biyahe at monitoring ng presyo
- Paghahambing ng presyo sa e-commerce at pagsuri sa availability
- Istrakturadong pagkuha mula sa mga dynamic na website
- Vision-aware UI testing at verification
- Pagmomonitor at alerto ng website
- Matalinong pag-fill ng form sa mga multi-step na proseso

## Karagdagang Mga Mapagkukunan

- [Browser-Use Playwright integration template](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use actor parameters and content extraction](https://docs.browser-use.com/customize/actor/all-parameters)
- [Course Setup](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagsusuri**:  
Ang dokumentong ito ay isinalin gamit ang AI translation service na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat nagsusumikap kami para sa katumpakan, pakitandaan na ang mga awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o di-tiyak na impormasyon. Ang orihinal na dokumento sa kanyang sariling wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na nagmumula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->