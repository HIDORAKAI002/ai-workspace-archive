# AGENTS.md

## Muhtasari wa Mradi

**MCP kwa Waanzilishi** ni mtaala wa elimu huria kwa ajili ya kujifunza Model Context Protocol (MCP) - mfumo uliosawazishwa kwa mwingiliano kati ya mifano ya AI na programu za wateja. Hifadhi hii hutoa vifaa vya elimu kamili pamoja na mifano ya nambari ya vitendo katika lugha mbalimbali za programu.

### Teknolojia Muhimu

- **Lugha za Programu**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Mfumo na SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Hifadhidata**: PostgreSQL na ugani wa pgvector
- **Majukwaa ya Wingu**: Azure (Container Apps, OpenAI, Usalama wa Maudhui, Application Insights)
- **Zana za Ujenzi**: npm, Maven, pip, Cargo
- **Nyaraka**: Markdown na tafsiri ya lugha nyingi kwa njia ya moja kwa moja (lugha 48+)

### Mimarishano

- **Moduli 11 Za Msingi (00-11)**: Njia ya kujifunza mfululizo kutoka misingi hadi mada za juu
- **Maabara za Vitendo**: Mazoezi ya vitendo na msimbo kamili katika lugha nyingi
- **Miradi ya Mfano**: Utekelezaji wa seva na mteja wa MCP unaofanya kazi
- **Mfumo wa Tafsiri**: Kazi ya GitHub Actions kwa usaidizi wa lugha nyingi
- **Maktaba ya Picha**: Saraka ya picha iliyojumuishwa pamoja na matoleo yaliyotafsiriwa

## Amri za Kuanzisha

Hii ni hifadhi inayolenga nyaraka. Uanzishaji mwingi hufanyika ndani ya miradi ya mfano na maabara binafsi.

### Kuanzisha Hifadhi

```bash
# Nakili hazina
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Kufanya kazi na Miradi ya Mfano

Miradi ya mfano iko katika:
- `03-GettingStarted/samples/` - Mifano maalum kwa lugha
- `03-GettingStarted/01-first-server/solution/` - Utekelezaji wa seva ya kwanza
- `03-GettingStarted/02-client/solution/` - Utekelezaji wa mteja
- `11-MCPServerHandsOnLabs/` - Maabara za muingiliano wa hifadhidata kamili

Kila mradi wa mfano una maelekezo yake ya kuanzisha:

#### Miradi ya TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Miradi ya Python
```bash
cd <project-directory>
pip install -r requirements.txt
# au
pip install -e .
python main.py
```

#### Miradi ya Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Mtiririko wa Maendeleo

### Muundo wa Nyaraka

- **Moduli 00-11**: Yaliyomo ya mtaala wa msingi kwa mfuatano
- **translations/**: Toleo la lugha maalum (limezalishwa moja kwa moja, usibadilishe moja kwa moja)
- **translated_images/**: Toleo la picha lililocomezwa (limezalishwa moja kwa moja)
- **images/**: Picha na michoro ya asili

### Kufanya Mabadiliko ya Nyaraka

1. Hariri tu faili za markdown za Kiingereza katika saraka kuu za moduli (00-11)
2. Sasisha picha katika saraka `images/` ikiwa inahitajika
3. Kazi ya co-op-translator GitHub Action itaandaa tafsiri moja kwa moja
4. Tafsiri zitatengenezwa upya pindi mabadiliko yapatikane kwenye tawi kuu

### Kufanya Kazi na Tafsiri

- **Tafsiri ya Moja kwa Moja**: Mtiririko wa GitHub Actions hutekeleza tafsiri zote
- **Usihariri Moja kwa Moja** faili katika saraka `translations/`
- Metadata ya tafsiri imejumuishwa katika kila faili iliyotafsiriwa
- Lugha zinazoungwa mkono: Zaidi ya lugha 48 zikiwemo Kiarabu, Kichina, Kifaransa, Kijerumani, Kihindi, Kijapani, Kikorea, Kireno, Kirusi, Kihispania, na nyingine nyingi

## Maelekezo ya Kupima

### Uthibitishaji wa Nyaraka

Kwa kuwa hii ni hifadhi inayolenga nyaraka, upimaji unalenga:

1. **Uthibitishaji wa Viungo**: Hakikisha viungo vyote vya ndani vinafanya kazi
```bash
# Angalia viungo vyovyovyovy ya markdown
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Uthibitishaji wa Mifano ya Nambari**: Jaribu mifano ya nambari ikiwa inaendeshwa/sikomeshwa
```bash
# Elekeza kwenye sampuli maalum na fanya majaribio yake
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Kukagua Muundo wa Markdown**: Angalia muafaka wa muundo
```bash
# Tumia markdownlint ikiwa inahitajika
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Kupima Miradi ya Mfano

Kila mfano wa lugha una mbinu yake ya upimaji:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Miongozo ya Mtindo wa Nambari

### Mtindo wa Nyaraka

- Tumia lugha wazi, rafiki kwa waanzilishi
- Jumuisha mifano ya nambari katika lugha nyingi inapowezekana
- Fuata taratibu bora za markdown:
  - Tumia vichwa vya ATX (`#` mtindo)
  - Tumia vifunga vya msimbo vilivyo na kitambulisho cha lugha
  - Jumuisha maelezo ya alt kwa picha
  - Dumisha urefu wa mistari kwa kiasi kinachofaa (hakuna kikomo kigumu, lakini kuwa na busara)

### Mtindo wa Mfano wa Nambari

#### TypeScript/JavaScript
- Tumia moduli za ES (`import`/`export`)
- Fuata kanuni za hali ngumu za TypeScript
- Jumuisha maelezo ya aina
- Lenga ES2022

#### Python
- Fuata miongozo ya mtindo ya PEP 8
- Tumia vidokezo vya aina inapofaa
- Jumuisha docstrings kwa kazi na madarasa
- Tumia sifa mpya za Python (3.8+)

#### Java
- Fuata kanuni za Spring Boot
- Tumia sifa za Java 21
- Fuata muundo wa kawaida wa mradi wa Maven
- Jumuisha maelezo ya Javadoc

### Mpangilio wa Faili

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Ujenzi na Ueneaji

### Ueneaji wa Nyaraka

Hifadhi inatumia GitHub Pages au sawa kwa hosting ya nyaraka (ikiwa inahitajika). Mabadiliko kwenye tawi kuu hutuma:

1. Mtiririko wa tafsiri (`.github/workflows/co-op-translator.yml`)
2. Tafsiri ya moja kwa moja ya faili zote za markdown za Kiingereza
3. Uhamishaji wa picha mahali inapohitajika

### Hakuna Mchakato wa Ujenzi Unahitajika

Hifadhi hii hasa ina nyaraka za markdown. Hakuna hatua ya kukusanya au kujenga inahitajika kwa mtaala mkuu.

### Ueneaji wa Miradi ya Mfano

Miradi binafsi ya mfano inaweza kuwa na maelekezo ya kueneza:
- Angalia `03-GettingStarted/09-deployment/` kwa mwongozo wa ueneaji seva ya MCP
- Mifano ya ueneaji ya Azure Container Apps katika `11-MCPServerHandsOnLabs/`

## Miongozo ya Kuchangia

### Mchakato wa Ombi la Kutoa

1. **Fungua Tawi na Nakili**: Fikia hifadhi na nakili tawi lako mahali pako
2. **Tengeneza Tawi**: Tumia majina ya tawi yanayoelezea (mfano, `fix/typo-module-3`, `add/python-example`)
3. **Fanya Mabadiliko**: Hariri tu faili za markdown za Kiingereza (si tafsiri)
4. **Jaribu Kwenye Kiasili**: Hakiki kuwa markdown inaonekana vyema
5. **Wasilisha PR**: Tumia vichwa na maelezo ya PR kwa uwazi
6. **Saini CLA**: Saini Makubaliano ya Mtoaji wa Microsoft ikipotakiwa

### Muundo wa Kichwa cha PR

Tumia vichwa vya wazi, vinavyoelezea:
- `[Module XX] Maelezo ya kifupi` kwa mabadiliko ya moduli
- `[Samples] Maelezo` kwa mabadiliko ya kodi za mfano
- `[Docs] Maelezo` kwa masasisho ya nyaraka kwa ujumla

### Unachochangia

- Marekebisho ya makosa katika nyaraka au mifano ya nambari
- Mifano ya nambari mpya katika lugha za ziada
- Ufafanuzi na maboresho kwa yaliyomo tayari
- Masomo mapya au mifano ya vitendo
- Ripoti za matatizo kwa yaliyomo yasiyo wazi au yenye makosa

### Usifanye Haya

- Usihariri moja kwa moja faili katika saraka `translations/`
- Usihariri saraka `translated_images/`
- Usiongeze faili kubwa za binary bila majadiliano
- Usibadilishe faili za mtiririko wa tafsiri bila uratibu

## Maelezo Zaidi

### Utunzaji wa Hifadhi

- **Changelog**: Mabadiliko yote makubwa yameandikwa katika `changelog.md`
- **Mwongozo wa Kusoma**: Tumia `study_guide.md` kwa muhtasari wa mtaala
- **Violezo vya Masuala**: Tumia violezo vya masuala ya GitHub kwa ripoti za makosa na maombi ya vipengele
- **Kanuni za Maadili**: Washiriki wote lazima wafuate Kanuni za Maadili ya Chanzo Huria ya Microsoft

### Njia ya Kujifunza

Fuata moduli kwa mpangilio mfululizo (00-11) kwa kujifunza bora:
1. **00-02**: Misingi (Utangulizi, Dhahania Muhimu, Usalama)
2. **03**: Kuanzishwa na utekelezaji wa vitendo
3. **04-05**: Utekelezaji wa vitendo na mada za juu
4. **06-10**: Jamii, mbinu bora, na matumizi halisi
5. **11**: Maabara kamili za muingiliano wa hifadhidata (maabara 13 mfululizo)

### Vyanzo vya Msaada

- **Nyaraka**: https://modelcontextprotocol.io/
- **Maelezo ya Kiufundi**: https://spec.modelcontextprotocol.io/
- **Jumuiya**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Seva ya Microsoft Foundry Discord
- **Kozi Zinazohusiana**: Angalia README.md kwa njia nyingine za kujifunza Microsoft

### Changamoto Za Kawaida

**Q: PR yangu inashindwa katika ukaguzi wa tafsiri**  
A: Hakikisha umehariri tu faili za markdown za Kiingereza katika saraka kuu za moduli, si matoleo yaliyotafsiriwa.

**Q: Ninawezaje kuongeza lugha mpya?**  
A: Usaidizi wa lugha husimamiwa kupitia mtiririko wa co-op-translator. Fungua suala ili kujadili kuongeza lugha mpya.

**Q: Mifano ya nambari haitoendi kazi**  
A: Hakikisha umefuata maelekezo ya kuanzisha katika README ya mfano husika. Angalia kuwa una toleo sahihi la utegemezi.

**Q: Picha hazionekani**  
A: Hakikisha njia za picha ni za jamaa na tumia slashi ya mbele. Picha zinapaswa kuwa katika saraka `images/` au `translated_images/` kwa matoleo ya lokaliza.

### Mambo ya Kufikiria Kuhusu Utendaji

- Mtiririko wa tafsiri unaweza kuchukua dakika kadhaa kukamilika
- Picha kubwa zitakuwa bora zigawanywe kabla ya kujitolea
- Dumisha faili za markdown zinazojikita na za ukubwa unaofaa
- Tumia viungo vya jamaa kwa kubebeka bora

### Udhibiti wa Mradi

Mradi huu hufuata taratibu za chanzo huria za Microsoft:  
- Leseni ya MIT kwa msimbo na nyaraka  
- Kanuni za Maadili ya Chanzo Huria ya Microsoft  
- CLA inahitajika kwa michango  
- Matatizo ya Usalama: Fuata miongozo ya SECURITY.md  
- Msaada: Angalia SUPPORT.md kwa vyanzo vya msaada

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->