# AGENTS.md

## Project Overview

**MCP for Beginners** ay isang open-source na edukasyonal na kurikulum para sa pag-aaral ng Model Context Protocol (MCP) - isang standardized na balangkas para sa interaksyon sa pagitan ng AI models at mga client applications. Ang repositoryong ito ay nagbibigay ng komprehensibong mga materyales sa pagkatuto kasama ang hands-on na mga halimbawa ng code sa iba't ibang programming languages.

### Key Technologies

- **Programming Languages**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworks & SDKs**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Databases**: PostgreSQL with pgvector extension
- **Cloud Platforms**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Build Tools**: npm, Maven, pip, Cargo
- **Documentation**: Markdown na may automated multi-language translation (48+ na mga wika)

### Architecture

- **11 Core Modules (00-11)**: Sunud-sunod na landas ng pag-aaral mula sa mga pundamental hanggang sa mga advanced na paksa
- **Hands-on Labs**: Praktikal na mga pagsasanay na may kumpleto na solution code sa maraming wika
- **Sample Projects**: Gumaganang MCP server at client implementations
- **Translation System**: Automated GitHub Actions workflow para sa multi-language support
- **Image Assets**: Sentralisadong images directory na may mga isinalin na bersyon

## Setup Commands

Ito ay isang dokumentasyong nakatuon na repository. Karamihan sa setup ay nangyayari sa loob ng mga indibidwal na sample projects at labs.

### Repository Setup

```bash
# Kopyahin ang repositoryo
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Working with Sample Projects

Ang mga sample projects ay matatagpuan sa:
- `03-GettingStarted/samples/` - Mga halimbawa na nakatuon sa partikular na wika
- `03-GettingStarted/01-first-server/solution/` - Mga unang server implementations
- `03-GettingStarted/02-client/solution/` - Mga client implementations
- `11-MCPServerHandsOnLabs/` - Komprehensibong mga database integration labs

Bawat sample project ay may kanya-kanyang setup instructions:

#### TypeScript/JavaScript Projects
```bash
cd <project-directory>
npm install
npm start
```

#### Python Projects
```bash
cd <project-directory>
pip install -r requirements.txt
# o
pip install -e .
python main.py
```

#### Java Projects
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Development Workflow

### Documentation Structure

- **Modules 00-11**: Pangunahing nilalaman ng kurikulum na nakaayos nang sunud-sunod
- **translations/**: Mga bersyong nakatuon sa partikular na wika (auto-generated, huwag direktang baguhin)
- **translated_images/**: Mga lokal na bersyon ng mga larawan (auto-generated)
- **images/**: Mga source images at diagram

### Making Documentation Changes

1. I-edit lamang ang mga English markdown files sa root module directories (00-11)
2. I-update ang mga larawan sa `images/` directory kung kinakailangan
3. Ang co-op-translator GitHub Action ay awtomatikong gagawa ng mga pagsasalin
4. Ang mga pagsasalin ay muling ginagawa kapag may push sa main branch

### Working with Translations

- **Automated Translation**: Pinamamahalaan ng GitHub Actions workflow ang lahat ng pagsasalin
- **Huwag manu-manong i-edit** ang mga file sa `translations/` directory
- Ang metadata ng pagsasalin ay naka-embed sa bawat isinaling file
- Suportadong mga wika: 48+ na mga wika kabilang ang Arabic, Chinese, French, German, Hindi, Japanese, Korean, Portuguese, Russian, Spanish, at marami pa

## Testing Instructions

### Documentation Validation

Dahil ito ay pangunahing dokumentasyong repository, ang pagsubok ay nakatuon sa:

1. **Link Validation**: Tiyakin na gumagana ang lahat ng internal links
```bash
# Suriin ang mga sirang link sa markdown
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Code Sample Validation**: Subukan na ang mga halimbawa ng code ay nagko-compile/nagre-run
```bash
# Mag-navigate sa partikular na sample at patakbuhin ang mga pagsubok nito
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown Linting**: Suriin ang konsistensi ng pag-format
```bash
# Gamitin ang markdownlint kung kinakailangan
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Sample Project Testing

Bawat sample na nakatuon sa partikular na wika ay may kanya-kanyang paraan ng pagsubok:

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

## Code Style Guidelines

### Documentation Style

- Gumamit ng malinaw, madaling maintindihan ng mga nagsisimula na wika
- Isama ang mga halimbawa ng code sa maraming wika kung saan maaari
- Sundin ang pinakamahusay na mga kasanayan sa markdown:
  - Gumamit ng ATX-style headers (`#` syntax)
  - Gumamit ng fenced code blocks na may mga language identifiers
  - Maglagay ng naglalarawang alt text para sa mga larawan
  - Panatilihing makatwiran ang haba ng linya (walang hard limit, ngunit maging makatuwiran)

### Code Sample Style

#### TypeScript/JavaScript
- Gumamit ng ES modules (`import`/`export`)
- Sundin ang TypeScript strict mode na mga convention
- Isama ang type annotations
- Targetin ang ES2022

#### Python
- Sundin ang PEP 8 style guidelines
- Gumamit ng type hints kung kinakailangan
- Isama ang docstrings para sa mga functions at classes
- Gumamit ng mga modernong Python features (3.8+)

#### Java
- Sundin ang Spring Boot conventions
- Gumamit ng Java 21 features
- Sundin ang karaniwang Maven project structure
- Isama ang Javadoc comments

### File Organization

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

## Build and Deployment

### Documentation Deployment

Ang repositoryo ay gumagamit ng GitHub Pages o kaparehong serbisyo para sa pagho-host ng dokumentasyon (kung naaangkop). Ang mga pagbabago sa main branch ay nagpapasimula ng:

1. Translation workflow (`.github/workflows/co-op-translator.yml`)
2. Awtomatikong pagsasalin ng lahat ng English markdown files
3. Lokal na pag-aayos ng mga larawan kung kinakailangan

### No Build Process Required

Ang repositoryong ito ay pangunahing naglalaman ng markdown dokumentasyon. Walang kailangang compilation o build step para sa pangunahing nilalaman ng kurikulum.

### Sample Project Deployment

Ang mga indibidwal na sample projects ay maaaring may mga deployment instructions:
- Tingnan ang `03-GettingStarted/09-deployment/` para sa MCP server deployment guidance
- Mga halimbawa ng Azure Container Apps deployment sa `11-MCPServerHandsOnLabs/`

## Contributing Guidelines

### Pull Request Process

1. **Fork and Clone**: I-fork ang repository at i-clone ang iyong fork locally
2. **Create a Branch**: Gumamit ng mga deskriptibong pangalan ng branch (hal. `fix/typo-module-3`, `add/python-example`)
3. **Make Changes**: I-edit ang English markdown files lamang (hindi ang mga pagsasalin)
4. **Test Locally**: Siguraduhin na tama ang render ng markdown
5. **Submit PR**: Gumamit ng malinaw na mga pamagat at deskripsyon sa PR
6. **CLA**: Pirmahan ang Microsoft Contributor License Agreement kapag hinihingi

### PR Title Format

Gumamit ng malinaw, deskriptibong mga pamagat:
- `[Module XX] Maikling deskripsyon` para sa mga module-specific na pagbabago
- `[Samples] Deskripsyon` para sa mga pagbabago sa sample code
- `[Docs] Deskripsyon` para sa pangkalahatang mga update sa dokumentasyon

### What to Contribute

- Mga pag-aayos ng bug sa dokumentasyon o code samples
- Mga bagong halimbawa ng code sa dagdag na mga wika
- Mga paglilinaw at pagpapabuti sa umiiral na nilalaman
- Mga bagong case studies o praktikal na halimbawa
- Mga ulat ng isyu para sa hindi malinaw o maling nilalaman

### What NOT to Do

- Huwag direktang i-edit ang mga file sa `translations/` directory
- Huwag i-edit ang `translated_images/` directory
- Huwag magdagdag ng malalaking binary files nang walang usapan
- Huwag palitan ang mga translation workflow files nang walang koordinasyon

## Additional Notes

### Repository Maintenance

- **Changelog**: Lahat ng mahahalagang pagbabago ay naitatala sa `changelog.md`
- **Study Guide**: Gumamit ng `study_guide.md` para sa overview ng pag-navigate sa kurikulum
- **Issue Templates**: Gamitin ang GitHub issue templates para sa mga bug report at feature requests
- **Code of Conduct**: Lahat ng kontribyutor ay dapat sumunod sa Microsoft Open Source Code of Conduct

### Learning Path

Sundin ang mga module nang sunud-sunod (00-11) para sa pinakamainam na pagkatuto:
1. **00-02**: Mga pundamental (Panimula, Core Concepts, Security)
2. **03**: Pagsisimula na may hands-on implementation
3. **04-05**: Praktikal na implementasyon at advanced na paksa
4. **06-10**: Komunidad, pinakamahusay na mga kasanayan, at mga totoong aplikasyon
5. **11**: Komprehensibong mga database integration labs (13 sunud-sunod na labs)

### Support Resources

- **Documentation**: https://modelcontextprotocol.io/
- **Specification**: https://spec.modelcontextprotocol.io/
- **Community**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord server
- **Related Courses**: Tingnan ang README.md para sa iba pang Microsoft na learning paths

### Common Troubleshooting

**Q: Ang aking PR ay pumapasa sa translation check**
A: Tiyakin na English markdown files lamang sa root module directories ang inedit mo, hindi ang mga isinalin na bersyon.

**Q: Paano ako makakapagdagdag ng bagong wika?**
A: Pinamamahalaan ang suporta sa wika sa pamamagitan ng co-op-translator workflow. Magbukas ng isyu para talakayin ang pagdagdag ng bagong mga wika.

**Q: Hindi gumagana ang mga code samples**
A: Siguraduhing sinunod mo ang mga setup instructions sa partikular na sample README. Tiyakin na mayroon kang tamang bersyon ng mga dependencies na naka-install.

**Q: Hindi lumalabas ang mga larawan**
A: Siguraduhing ang mga image paths ay relative at gumagamit ng forward slashes. Ang mga larawan ay dapat nasa `images/` directory o `translated_images/` para sa mga lokal na bersyon.

### Performance Considerations

- Maaaring tumagal ng ilang minuto ang translation workflow
- Dapat i-optimize ang malalaking larawan bago mag-commit
- Panatilihing nakatuon at may katamtamang laki ang bawat markdown file
- Gumamit ng relative links para sa mas magandang portability

### Project Governance

Ang proyekto ay sumusunod sa mga open source na kasanayan ng Microsoft:
- MIT License para sa code at dokumentasyon
- Microsoft Open Source Code of Conduct
- Kailangan ang CLA para sa mga kontribusyon
- Security issues: Sundin ang mga gabay sa SECURITY.md
- Support: Tingnan ang SUPPORT.md para sa mga resources ng tulong

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->