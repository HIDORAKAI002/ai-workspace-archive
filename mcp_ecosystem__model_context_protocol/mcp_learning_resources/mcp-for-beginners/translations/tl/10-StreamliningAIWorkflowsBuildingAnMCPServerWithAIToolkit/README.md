# Pagpapadali ng AI Workflows: Paggawa ng MCP Server gamit ang Microsoft Foundry Toolkit

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/tl/logo.ec93918ec338dadd.webp)

## 🎯  Pangkalahatang-ideya

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/tl/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(I-click ang larawan sa itaas upang makita ang video ng lektyon na ito)_

Maligayang pagdating sa **Model Context Protocol (MCP) Workshop**! Ang komprehensibong hands-on workshop na ito ay pinagsasama ang dalawang makabagong teknolohiya upang baguhin ang pagbuo ng AI application:

- **🔗 Model Context Protocol (MCP)**: Isang bukas na pamantayan para sa tuloy-tuloy na AI-tool integration
- **🛠️ Microsoft Foundry Toolkit Extension para sa VS Code**: Malakas na extension ng Microsoft para sa pagbuo ng AI

### 🎓 Ano ang Iyong Matututunan

Pagkatapos ng workshop na ito, magiging bihasa ka sa paggawa ng mga matatalinong aplikasyong nag-uugnay sa mga AI model sa totoong mga tool at serbisyo. Mula sa awtomatikong pagsusuri hanggang sa custom API integrations, magkakaroon ka ng praktikal na kasanayan para lutasin ang komplikadong mga hamon sa negosyo.

## 🏗️ Teknolohiyang Ginamit

### 🔌 Model Context Protocol (MCP)

Ang MCP ang **"USB-C para sa AI"** - isang unibersal na pamantayan na nag-uugnay ng mga AI model sa mga panlabas na tool at pinagkukunan ng data.

**✨ Mga Pangunahing Katangian:**

- 🔄 **Standardisadong Integrasyon**: Unibersal na interface para sa koneksyon ng AI-tool
- 🏛️ **Flexible na Arkitektura**: Lokal at remote na mga server gamit ang stdio/SSE transport
- 🧰 **Mayamang Ecosystem**: Mga tool, prompt, at resources sa isang protocol
- 🔒 **Handa sa Enterprise**: May integradong seguridad at pagiging maaasahan

**🎯 Bakit Mahalaga ang MCP:**
Parang kung paano inalis ng USB-C ang kalat ng mga kable, inaalis ng MCP ang kumplikasyon ng AI integrations. Isang protocol, walang katapusang posibilidad.

### 🤖 Microsoft Foundry Toolkit Extension para sa VS Code

Ang flaghsip na AI development extension ng Microsoft na ginagawang powerhouse ang VS Code para sa AI.

**🚀 Mga Pangunahing Kakayahan:**

- 📦 **Model Catalog**: Access sa mga modelo mula sa Azure AI, GitHub, Hugging Face, Ollama
- ⚡ **Local Inference**: ONNX-optimized na CPU/GPU/NPU execution
- 🏗️ **Agent Builder**: Visual na pagbuo ng AI agent na may MCP integration
- 🎭 **Multi-Modal**: Suporta para sa teksto, bisyon, at istrukturadong output

**💡 Mga Benepisyo sa Pag-develop:**

- Zero-config na pag-deploy ng modelo
- Visual prompt engineering
- Real-time na testing playground
- Tuloy-tuloy na MCP server integration

## 📚 Paglalakbay sa Pagkatuto

### [🚀 Module 1: Microsoft Foundry Toolkit Fundamentals](./lab1/README.md)

**Tagal**: 15 minuto

- 🛠️ Mag-install at mag-configure ng Microsoft Foundry Toolkit para sa VS Code
- 🗂️ Tuklasin ang Model Catalog (100+ na mga modelo mula sa GitHub, ONNX, OpenAI, Anthropic, Google)
- 🎮 Mag-master ng Interactive Playground para sa real-time na pagsusuri ng mga modelo
- 🤖 Gumawa ng iyong unang AI agent gamit ang Agent Builder
- 📊 Suriin ang performance ng modelo gamit ang built-in metrics (F1, relevance, similarity, coherence)
- ⚡ Matutunan ang batch processing at multi-modal na mga kakayahan

**🎯 Resulta ng Pagkatuto**: Gumawa ng funksyonal na AI agent na may malawak na kaalaman sa kakayahan ng Microsoft Foundry Toolkit

### [🌐 Module 2: MCP with Microsoft Foundry Toolkit Fundamentals](./lab2/README.md)

**Tagal**: 20 minuto

- 🧠 Masterhin ang arkitektura at mga konsepto ng Model Context Protocol (MCP)
- 🌐 Tuklasin ang MCP server ecosystem ng Microsoft
- 🤖 Gumawa ng browser automation agent gamit ang Playwright MCP server
- 🔧 I-integrate ang MCP servers sa Microsoft Foundry Toolkit Agent Builder
- 📊 I-configure at subukan ang MCP tools sa loob ng iyong mga agent
- 🚀 I-export at ideploy ang MCP-powered agents para sa production gamit

**🎯 Resulta ng Pagkatuto**: Ideploy ang AI agent na pinalakas ng panlabas na mga tool sa pamamagitan ng MCP

### [🔧 Module 3: Advanced MCP Development with Microsoft Foundry Toolkit](./lab3/README.md)

**Tagal**: 20 minuto

- 💻 Gumawa ng custom MCP servers gamit ang Microsoft Foundry Toolkit
- 🐍 I-configure at gamitin ang pinakabagong MCP Python SDK (v1.9.3)
- 🔍 I-set up at gamitin ang MCP Inspector para sa debugging
- 🛠️ Bumuo ng Weather MCP Server na may propesyonal na mga workflow sa debugging
- 🧪 I-debug ang MCP servers sa parehong Agent Builder at Inspector environments

**🎯 Resulta ng Pagkatuto**: Mag-develop at mag-debug ng custom MCP servers gamit ang modernong mga tooling

### [🐙 Module 4: Practical MCP Development - Custom GitHub Clone Server](./lab4/README.md)

**Tagal**: 30 minuto

- 🏗️ Gumawa ng totoong GitHub Clone MCP Server para sa development workflows
- 🔄 Magpatupad ng smart repository cloning na may validation at error handling
- 📁 Lumikha ng intelligent directory management at VS Code integration
- 🤖 Gamitin ang GitHub Copilot Agent Mode na may custom MCP tools
- 🛡️ Mag-apply ng production-ready na pagiging maaasahan at cross-platform compatibility

**🎯 Resulta ng Pagkatuto**: Ideploy ang production-ready na MCP server na nagpapadali sa tunay na mga development workflows

## 💡 Mga Totoong Aplikasyon at Epekto

### 🏢 Mga Use Case sa Enterprise

#### 🔄 DevOps Automation

Baguhin ang iyong development workflow gamit ang matalinong automation:

- **Smart Repository Management**: AI-driven na pagsusuri ng code at mga desisyong pag-merge
- **Intelligent CI/CD**: Awtomatiko na pag-optimize ng pipeline base sa mga pagbabago ng code
- **Issue Triage**: Awtomatikong klasipikasyon at pagtatalaga ng bugs

#### 🧪 Rebolusyon sa Quality Assurance

Iangat ang testing gamit ang AI-powered na automation:

- **Intelligent Test Generation**: Gumawa ng komprehensibong test suites nang awtomatiko
- **Visual Regression Testing**: AI-powered na pagtuklas ng pagbabago sa UI
- **Performance Monitoring**: Proaktibong pagtukoy at pagresolba ng mga isyu

#### 📊 Data Pipeline Intelligence

Lumikha ng mas matatalinong data processing workflows:

- **Adaptive ETL Processes**: Self-optimizing na mga data transformations
- **Anomaly Detection**: Real-time na pagsubaybay sa kalidad ng data
- **Intelligent Routing**: Smart na pamamahala ng daloy ng data

#### 🎧 Pagpapahusay ng Customer Experience

Gumawa ng natatanging pakikipag-ugnayan sa mga customer:

- **Context-Aware Support**: AI agents na may access sa kasaysayan ng customer
- **Proactive Issue Resolution**: Prediktibong serbisyo sa customer
- **Multi-Channel Integration**: Pinagsanib na karanasan ng AI sa iba't ibang platform

## 🛠️ Mga Kinakailangan at Setup

### 💻 Mga Kinakailangan sa Sistema

| Komponent | Kinakailangan | Mga Tala |
|-----------|---------------|----------|
| **Operating System** | Windows 10+, macOS 10.15+, Linux | Anumang modernong OS |
| **Visual Studio Code** | Pinakabagong stable na bersyon | Kinakailangan para sa Microsoft Foundry Toolkit |
| **Node.js** | v18.0+ at npm | Para sa pagbuo ng MCP server |
| **Python** | 3.10+ | Opsyonal para sa Python MCP servers |
| **Memory** | Minimum na 8GB RAM | 16GB inirerekomenda para sa lokal na mga modelo |

### 🔧 Development Environment

#### Inirerekomendang VS Code Extensions

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - Opsyonal ngunit kapaki-pakinabang

#### Opsyonal na Mga Tool

- **uv**: Makabagong Python package manager
- **MCP Inspector**: Visual na tool para sa pag-debug ng MCP servers
- **Playwright**: Para sa mga halimbawa ng web automation

## 🎖️ Mga Resulta ng Pagkatuto at Landas ng Sertipikasyon

### 🏆 Checklist ng Mastery ng Kasanayan

Sa pagkompleto ng workshop na ito, makakamit mo ang kadalubhasaan sa:

#### 🎯 Pangunahing Kasanayan

- [ ] **MCP Protocol Mastery**: Malalim na pag-unawa sa arkitektura at mga implementation pattern
- [ ] **Microsoft Foundry Toolkit Proficiency**: Ekspertong paggamit ng Microsoft Foundry Toolkit para sa mabilisang pag-develop
- [ ] **Paggawa ng Custom Server**: Gumawa, mag-deploy, at magpanatili ng production MCP servers
- [ ] **Ekselenteng Tool Integration**: Tuloy-tuloy na pagkonekta ng AI sa umiiral na development workflows
- [ ] **Aplikasyon sa Pagsosolusyon ng Problema**: Ipatupad ang mga natutunang kasanayan sa totoong mga hamon sa negosyo

#### 🔧 Teknikal na Kasanayan

- [ ] Mag-setup at mag-configure ng Microsoft Foundry Toolkit sa VS Code
- [ ] Magdisenyo at mag-implementa ng custom MCP servers
- [ ] I-integrate ang GitHub Models sa MCP arkitektura
- [ ] Gumawa ng automated testing workflows gamit ang Playwright
- [ ] Mag-deploy ng AI agents para sa production
- [ ] I-debug at i-optimize ang performance ng MCP server

#### 🚀 Advanced na Kakayahan

- [ ] Magsagawa ng arkitektura para sa enterprise-scale AI integrations
- [ ] Magpatupad ng pinakamahusay na mga kasanayan sa seguridad para sa AI applications
- [ ] Magdisenyo ng scalable MCP server architectures
- [ ] Gumawa ng custom tool chains para sa mga tiyak na domain
- [ ] Magsanay ng iba sa AI-native na pag-develop

## 📖 Karagdagang Mga Mapagkukunan

- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHub Repository](https://github.com/microsoft/vscode-ai-toolkit)
- [Sample MCP Servers Collection](https://github.com/modelcontextprotocol/servers)
- [Best Practices Guide](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Pinakamahusay na kasanayan sa seguridad

---

**🚀 Handang baguhin ang iyong AI development workflow?**

Tara, itayo ang kinabukasan ng matatalinong aplikasyon kasama ang MCP at Microsoft Foundry Toolkit!

## Ano ang Susunod

Magpatuloy sa: [Module 11: MCP Server Hands-On Labs](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->