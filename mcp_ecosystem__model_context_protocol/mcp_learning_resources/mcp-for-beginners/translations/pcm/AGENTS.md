# AGENTS.md

## Project Overview

**MCP for Beginners** na open-source educational curriculum wey dey teach Model Context Protocol (MCP) - na standardized framework wey dey arrange how AI models and client applications go take interact. Dis repository get full learning materials plus code examples wey you fit try for plenty programming languages.

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
- **Documentation**: Markdown with automated multi-language translation (48+ languages)

### Architecture

- **11 Core Modules (00-11)**: Sequential learning path from fundamentals to advanced topics
- **Hands-on Labs**: Practical exercises with complete solution code in multiple languages
- **Sample Projects**: Working MCP server and client implementations
- **Translation System**: Automated GitHub Actions workflow for multi-language support
- **Image Assets**: Centralized images directory with translated versions

## Setup Commands

Dis na documentation-focused repository. Most setup dey happen inside individual sample projects and labs.

### Repository Setup

```bash
# Make you copy di repository
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Working with Sample Projects

Sample projects dey for:
- `03-GettingStarted/samples/` - Language-specific examples
- `03-GettingStarted/01-first-server/solution/` - First server implementations
- `03-GettingStarted/02-client/solution/` - Client implementations
- `11-MCPServerHandsOnLabs/` - Comprehensive database integration labs

Every sample project get im own setup instructions:

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
# or
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

- **Modules 00-11**: Core curriculum content in sequential order
- **translations/**: Language-specific versions (auto-generated, no modify direct)
- **translated_images/**: Localized image versions (auto-generated)
- **images/**: Source images and diagrams

### Making Documentation Changes

1. Edit only the English markdown files wey dey for the root module directories (00-11)
2. Update images for `images/` directory if you need
3. The co-op-translator GitHub Action go automatically generate translations
4. Translations go regenerate anytime you push to main branch

### Working with Translations

- **Automated Translation**: GitHub Actions workflow dey handle all translations
- **No touch** files for `translations/` directory manually
- Translation metadata dey waka inside each translated file
- Supported languages: 48+ languages including Arabic, Chinese, French, German, Hindi, Japanese, Korean, Portuguese, Russian, Spanish, and many more

## Testing Instructions

### Documentation Validation

Because na documentation repository dis one be, testing dey focus on:

1. **Link Validation**: Check say all internal links dey work
```bash
# Check for broken markdown link dem
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Code Sample Validation**: Test say code examples fit compile/run
```bash
# Go go particular sample and run dia tests
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown Linting**: Check formatting consistency
```bash
# Use markdownlint if yu need am
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Sample Project Testing

Every language-specific sample get im own testing style:

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

- Use clear, beginner-friendly language
- Include code examples for many languages where e dey fit
- Follow markdown best practices:
  - Use ATX-style headers (`#` syntax)
  - Use fenced code blocks with language identifiers
  - Include descriptive alt text for images
  - Keep line lengths reasonable (no hard limit, but make sense)

### Code Sample Style

#### TypeScript/JavaScript
- Use ES modules (`import`/`export`)
- Follow TypeScript strict mode rules
- Include type annotations
- Target ES2022

#### Python
- Follow PEP 8 style guides
- Use type hints where e good
- Include docstrings for functions and classes
- Use modern Python features (3.8+)

#### Java
- Follow Spring Boot rules
- Use Java 21 features
- Follow standard Maven project structure
- Include Javadoc comments

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

Di repository dey use GitHub Pages or something like dat for documentation hosting (if e dey). Any change for main branch go trigger:

1. Translation workflow (`.github/workflows/co-op-translator.yml`)
2. Automated translation of all English markdown files
3. Image localization as needed

### No Build Process Required

Dis repository mainly get markdown documentation. No need compile or build step for the core curriculum content.

### Sample Project Deployment

Individual sample projects fit get deployment instructions:
- See `03-GettingStarted/09-deployment/` for MCP server deployment guide
- Azure Container Apps deployment samples for `11-MCPServerHandsOnLabs/`

## Contributing Guidelines

### Pull Request Process

1. **Fork and Clone**: Fork di repository and clone your fork for your machine
2. **Create a Branch**: Use descriptive branch names (like `fix/typo-module-3`, `add/python-example`)
3. **Make Changes**: Edit only English markdown files (no touch translations)
4. **Test Locally**: Check say markdown render well
5. **Submit PR**: Use clear PR titles and descriptions
6. **CLA**: Sign Microsoft Contributor License Agreement when dem ask you

### PR Title Format

Use clear, descriptive titles:
- `[Module XX] Brief description` for module-specific changes
- `[Samples] Description` for sample code changes
- `[Docs] Description` for general documentation updates

### What to Contribute

- Bug fixes for documentation or code samples
- New code examples for different languages
- Clarifications and improvements to existing content
- New case studies or practical examples
- Issue reports for unclear or wrong content

### What NOT to Do

- No dey edit files for `translations/` directory directly
- No dey edit `translated_images/` directory
- No dey add big binary files without talk first
- No dey change translation workflow files without agreement

## Additional Notes

### Repository Maintenance

- **Changelog**: All important changes dey for `changelog.md`
- **Study Guide**: Use `study_guide.md` for curriculum navigation overview
- **Issue Templates**: Use GitHub issue templates for bugs and feature requests
- **Code of Conduct**: All contributors gats follow Microsoft Open Source Code of Conduct

### Learning Path

Follow modules one-by-one (00-11) for better learning:
1. **00-02**: Fundamentals (Introduction, Core Concepts, Security)
2. **03**: Getting Started with hands-on implementation
3. **04-05**: Practical implementation and advanced topics
4. **06-10**: Community, best practices, and real-world applications
5. **11**: Full database integration labs (13 labs wey dey sequence)

### Support Resources

- **Documentation**: https://modelcontextprotocol.io/
- **Specification**: https://spec.modelcontextprotocol.io/
- **Community**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord server
- **Related Courses**: See README.md for other Microsoft learning paths

### Common Troubleshooting

**Q: My PR dey fail translation check**  
A: Make sure say you only change English markdown files for root module directories, no touch translated files.

**Q: How I go add new language?**  
A: Language support dey managed by co-op-translator workflow. Open issue to talk about adding new languages.

**Q: Code samples no dey work**  
A: Make sure say you follow setup instructions for the sample’s README. Check say dependencies get correct versions.

**Q: Images no dey display**  
A: Check say image paths correct and dem dey use forward slashes. Images suppose dey `images/` folder or `translated_images/` for translated versions.

### Performance Considerations

- Translation workflow fit take few minutes to finish
- Big images suppose optimize before you commit
- Keep markdown files focused and reasonable size
- Use relative links for portability

### Project Governance

Dis project dey follow Microsoft open source rules:
- MIT License for code and docs
- Microsoft Open Source Code of Conduct
- CLA mandatory for contributions
- Security issues: Follow SECURITY.md guidelines
- Support: See SUPPORT.md for help resources

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->