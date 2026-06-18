# AGENTS.md

## Visão Geral do Projeto

**MCP para Iniciantes** é um currículo educacional open-source para aprender o Model Context Protocol (MCP) - um framework padronizado para interações entre modelos de IA e aplicações clientes. Este repositório oferece materiais de aprendizado abrangentes com exemplos práticos de código em múltiplas linguagens de programação.

### Tecnologias Principais

- **Linguagens de Programação**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworks e SDKs**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Bancos de Dados**: PostgreSQL com extensão pgvector
- **Plataformas em Nuvem**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Ferramentas de Build**: npm, Maven, pip, Cargo
- **Documentação**: Markdown com tradução automática para múltiplos idiomas (48+ idiomas)

### Arquitetura

- **11 Módulos Principais (00-11)**: Caminho de aprendizado sequencial do fundamental ao avançado
- **Laboratórios Práticos**: Exercícios práticos com código completo de solução em várias linguagens
- **Projetos de Exemplo**: Implementações funcionais de servidor e cliente MCP
- **Sistema de Tradução**: Workflow automático GitHub Actions para suporte multilíngue
- **Recursos de Imagem**: Diretório centralizado de imagens com versões traduzidas

## Comandos de Configuração

Este é um repositório focado em documentação. A maior parte da configuração ocorre dentro dos projetos de exemplo e laboratórios individuais.

### Configuração do Repositório

```bash
# Clone o repositório
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Trabalhando com Projetos de Exemplo

Os projetos de exemplo estão localizados em:
- `03-GettingStarted/samples/` - Exemplos específicos por linguagem
- `03-GettingStarted/01-first-server/solution/` - Implementações do primeiro servidor
- `03-GettingStarted/02-client/solution/` - Implementações do cliente
- `11-MCPServerHandsOnLabs/` - Laboratórios abrangentes de integração com banco de dados

Cada projeto de exemplo contém suas próprias instruções de configuração:

#### Projetos TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Projetos Python
```bash
cd <project-directory>
pip install -r requirements.txt
# ou
pip install -e .
python main.py
```

#### Projetos Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Fluxo de Trabalho de Desenvolvimento

### Estrutura da Documentação

- **Módulos 00-11**: Conteúdo central do currículo em ordem sequencial
- **translations/**: Versões específicas por idioma (geradas automaticamente, não editar manualmente)
- **translated_images/**: Versões localizadas de imagens (geradas automaticamente)
- **images/**: Imagens e diagramas fonte

### Fazendo Alterações na Documentação

1. Edite apenas os arquivos markdown em inglês nos diretórios raiz dos módulos (00-11)
2. Atualize imagens na pasta `images/` se necessário
3. A GitHub Action co-op-translator gerará automaticamente as traduções
4. Traduções são regeneradas ao realizar push para o branch main

### Trabalhando com Traduções

- **Tradução Automática**: Workflow GitHub Actions gerencia todas as traduções
- **Não edite manualmente** os arquivos dentro da pasta `translations/`
- Metadados de tradução são incorporados em cada arquivo traduzido
- Idiomas suportados: mais de 48 idiomas incluindo Árabe, Chinês, Francês, Alemão, Hindi, Japonês, Coreano, Português, Russo, Espanhol e muitos outros

## Instruções de Teste

### Validação da Documentação

Como este é principalmente um repositório de documentação, os testes focam em:

1. **Validação de Links**: Garantir que todos os links internos funcionem
```bash
# Verifique links markdown quebrados
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validação de Exemplos de Código**: Testar se os exemplos de código compilam/executam
```bash
# Navegue para a amostra específica e execute seus testes
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Linting de Markdown**: Verificar consistência de formatação
```bash
# Use markdownlint se necessário
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Teste de Projeto de Exemplo

Cada exemplo específico por linguagem inclui seu próprio método de teste:

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

## Diretrizes de Estilo de Código

### Estilo da Documentação

- Use linguagem clara e acessível para iniciantes
- Inclua exemplos de código em várias linguagens quando aplicável
- Siga as melhores práticas do markdown:
  - Use cabeçalhos estilo ATX (`#` syntax)
  - Use blocos de código delimitados com identificação da linguagem
  - Inclua texto alternativo descritivo para imagens
  - Mantenha um tamanho de linha razoável (sem limite rígido, mas com bom senso)

### Estilo dos Exemplos de Código

#### TypeScript/JavaScript
- Use módulos ES (`import`/`export`)
- Siga as convenções do modo estrito do TypeScript
- Inclua anotações de tipo
- Alvo ES2022

#### Python
- Siga as diretrizes de estilo PEP 8
- Use dicas de tipo quando apropriado
- Inclua docstrings para funções e classes
- Utilize recursos modernos do Python (3.8+)

#### Java
- Siga convenções do Spring Boot
- Use recursos do Java 21
- Siga estrutura padrão de projetos Maven
- Inclua comentários Javadoc

### Organização de Arquivos

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

## Build e Deploy

### Deploy da Documentação

O repositório usa GitHub Pages ou similares para hospedagem da documentação (se aplicável). Mudanças no branch main disparam:

1. Workflow de tradução (`.github/workflows/co-op-translator.yml`)
2. Tradução automatizada de todos os arquivos markdown em inglês
3. Localização das imagens conforme necessário

### Nenhum Processo de Build Necessário

Este repositório contém principalmente documentação em markdown. Nenhuma etapa de compilação ou build é necessária para o conteúdo principal do currículo.

### Deploy de Projetos de Exemplo

Projetos de exemplo individuais podem conter instruções de deploy:
- Veja `03-GettingStarted/09-deployment/` para orientações de deploy de servidores MCP
- Exemplos de deploy no Azure Container Apps em `11-MCPServerHandsOnLabs/`

## Diretrizes para Contribuições

### Processo de Pull Request

1. **Fork e Clone**: Faça fork do repositório e clone seu fork localmente
2. **Crie um Branch**: Use nomes descritivos para branches (ex: `fix/typo-module-3`, `add/python-example`)
3. **Faça as Alterações**: Edite somente arquivos markdown em inglês (não traduções)
4. **Teste Localmente**: Verifique a renderização correta do markdown
5. **Submeta o PR**: Use títulos e descrições claras para o PR
6. **CLA**: Assine o Contrato de Licença de Contribuidor da Microsoft quando solicitado

### Formato dos Títulos dos PRs

Use títulos claros e descritivos:
- `[Module XX] Breve descrição` para alterações específicas de módulos
- `[Samples] Descrição` para mudanças em exemplos de código
- `[Docs] Descrição` para atualizações gerais na documentação

### O Que Contribuir

- Correções de bugs na documentação ou exemplos de código
- Novos exemplos de código em outras linguagens
- Esclarecimentos e melhorias no conteúdo existente
- Novos estudos de caso ou exemplos práticos
- Relatórios de problemas sobre conteúdo pouco claro ou incorreto

### O Que NÃO Fazer

- Não edite diretamente arquivos na pasta `translations/`
- Não edite a pasta `translated_images/`
- Não adicione arquivos binários grandes sem discussão prévia
- Não modifique arquivos do workflow de tradução sem coordenação

## Notas Adicionais

### Manutenção do Repositório

- **Changelog**: Todas as mudanças significativas são documentadas em `changelog.md`
- **Guia de Estudo**: Use `study_guide.md` para visão geral da navegação do currículo
- **Templates de Issue**: Use os templates do GitHub para relatórios de bugs e pedidos de funcionalidades
- **Código de Conduta**: Todos os colaboradores devem seguir o Código de Conduta de Código Aberto da Microsoft

### Caminho de Aprendizagem

Siga os módulos em ordem sequencial (00-11) para aprendizado ideal:
1. **00-02**: Fundamentos (Introdução, Conceitos Principais, Segurança)
2. **03**: Primeiros passos com implementação prática
3. **04-05**: Implementação prática e tópicos avançados
4. **06-10**: Comunidade, melhores práticas e aplicações reais
5. **11**: Laboratórios completos de integração com banco de dados (13 laboratórios sequenciais)

### Recursos de Suporte

- **Documentação**: https://modelcontextprotocol.io/
- **Especificação**: https://spec.modelcontextprotocol.io/
- **Comunidade**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Servidor Microsoft Foundry Discord
- **Cursos Relacionados**: Veja README.md para outros caminhos de aprendizado da Microsoft

### Problemas Comuns

**P: Meu PR está falhando na verificação de tradução**  
R: Verifique se você editou somente arquivos markdown em inglês nos diretórios raiz dos módulos, não as versões traduzidas.

**P: Como adicionar um novo idioma?**  
R: O suporte a idiomas é gerenciado pelo workflow co-op-translator. Abra uma issue para discutir a inclusão de novos idiomas.

**P: Os exemplos de código não estão funcionando**  
R: Verifique se você seguiu as instruções de configuração no README do exemplo específico. Confirme se as versões corretas das dependências estão instaladas.

**P: As imagens não estão aparecendo**  
R: Verifique se os caminhos das imagens são relativos e usam barras normais. As imagens devem estar no diretório `images/` ou `translated_images/` para versões localizadas.

### Considerações de Performance

- O workflow de tradução pode levar vários minutos para ser concluído
- Imagens grandes devem ser otimizadas antes do commit
- Mantenha os arquivos markdown individuais focados e com tamanho razoável
- Use links relativos para maior portabilidade

### Governança do Projeto

Este projeto segue práticas open source da Microsoft:
- Licença MIT para código e documentação
- Código de Conduta Open Source da Microsoft
- CLA obrigatório para contribuições
- Problemas de segurança: siga as diretrizes do SECURITY.md
- Suporte: consulte o SUPPORT.md para recursos de ajuda

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->