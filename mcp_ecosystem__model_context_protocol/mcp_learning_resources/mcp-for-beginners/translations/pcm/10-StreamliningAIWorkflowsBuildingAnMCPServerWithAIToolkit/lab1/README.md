# 🚀 Module 1: Microsoft Foundry Toolkit Fundamentals

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Learning Objectives

By the end of this module, you go fit:
- ✅ Install and configure Microsoft Foundry Toolkit Extension for VS Code
- ✅ Navigate the Model Catalog and understand different model sources
- ✅ Use the Playground for model testing and experimentation
- ✅ Create custom AI agents using Agent Builder
- ✅ Compare model performance across different providers
- ✅ Apply best practices for prompt engineering

## 🧠 Introduction to Microsoft Foundry Toolkit

The **Microsoft Foundry Toolkit Extension for VS Code** na Microsoft's main extension wey dey change VS Code to full AI development environment. E dey bridge gap between AI research and real-world app development, to make generative AI easy for developers at all levels.

### 🌟 Key Capabilities

| Feature | Description | Use Case |
|---------|-------------|----------|
| **🗂️ Model Catalog** | Access 100+ models from GitHub, ONNX, OpenAI, Anthropic, Google | Model finding and selection |
| **🔌 BYOM Support** | Add your own models (local or remote) | Custom model deployment |
| **🎮 Interactive Playground** | Real-time model testing plus chat interface | Quick prototyping and testing |
| **📎 Multi-Modal Support** | Handle text, pictures, and attachments | Complex AI apps |
| **⚡ Batch Processing** | Run many prompts at once | Efficient testing workflows |
| **📊 Model Evaluation** | Built-in metrics (F1, relevance, similarity, coherence) | Performance checking |

### 🎯 Why Microsoft Foundry Toolkit Matters

- **🚀 Accelerated Development**: From idea to prototype in minutes
- **🔄 Unified Workflow**: One interface for plenty AI providers
- **🧪 Easy Experimentation**: Compare models without wahala
- **📈 Production Ready**: Smooth change from prototype to deployment

## 🛠️ Prerequisites & Setup

### 📦 Install Microsoft Foundry Toolkit Extension

**Step 1: Access Extensions Marketplace**
1. Open Visual Studio Code
2. Go Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search "Microsoft Foundry Toolkit"

**Step 2: Choose Your Version**
- **🟢 Release**: Recommended for production use
- **🔶 Pre-release**: Early access to new features

**Step 3: Install and Activate**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/pcm/aitkext.d28945a03eed003c.webp)

### ✅ Verification Checklist
- [ ] Microsoft Foundry Toolkit icon dey for VS Code sidebar
- [ ] Extension dey enabled and activated
- [ ] No installation errors for output panel

## 🧪 Hands-on Exercise 1: Exploring GitHub Models

**🎯 Objective**: Master the Model Catalog and test your first AI model

### 📊 Step 1: Navigate the Model Catalog

The Model Catalog na your entrance go the AI ecosystem. E dey gather models from plenty providers, make am easy to find and compare.

**🔍 Navigation Guide:**

Click **MODELS - Catalog** for Microsoft Foundry Toolkit sidebar

![Model Catalog](../../../../translated_images/pcm/aimodel.263ed2be013d8fb0.webp)

**💡 Pro Tip**: Look for models wey get specific features wey match your use case (e.g., code generation, creative writing, analysis).

**⚠️ Note**: GitHub-hosted models (GitHub Models) free to use but dem get rate limits on requests and tokens. If you want use non-GitHub models (external models hosted on Azure AI or other endpoints), you go need give correct API key or authentication.

### 🚀 Step 2: Add and Configure Your First Model

**Model Selection Strategy:**
- **GPT-4.1**: Best for complex reasoning and analysis
- **Phi-4-mini**: Lightweight, quick responses for simple tasks

**🔧 Configuration Process:**
1. Select **OpenAI GPT-4.1** from catalog
2. Click **Add to My Models** - this one go register model for use
3. Choose **Try in Playground** to open testing environment
4. Wait make model start (first-time setup fit take small time)

![Playground Setup](../../../../translated_images/pcm/playground.dd6f5141344878ca.webp)

**⚙️ Understanding Model Parameters:**
- **Temperature**: Controls creativity (0 = fixed, 1 = creative)
- **Max Tokens**: Max length of response
- **Top-p**: Nucleus sampling for variation in response

### 🎯 Step 3: Master the Playground Interface

The Playground na your AI experiment lab. See how to make am useful:

**🎨 Prompt Engineering Best Practices:**
1. **Be Specific**: Clear and detailed instructions give better results
2. **Provide Context**: Add relevant background information
3. **Use Examples**: Show model wetin you want with samples
4. **Iterate**: Refine prompts based on first results

**🧪 Testing Scenarios:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/pcm/result.1dfcf211fb359cf6.webp)

### 🏆 Challenge Exercise: Model Performance Comparison

**🎯 Goal**: Compare different models with same prompts to know their strong points

**📋 Instructions:**
1. Add **Phi-4-mini** to your workspace
2. Use same prompt for GPT-4.1 and Phi-4-mini

![set](../../../../translated_images/pcm/set.88132df189ecde2c.webp)

3. Check response quality, speed, and accuracy
4. Write your findings inside results section

![Model Comparison](../../../../translated_images/pcm/compare.97746cd0f9074955.webp)

**💡 Key Insights to Discover:**
- When to use LLM vs SLM
- Cost vs. performance trade-offs
- Special features of different models

## 🤖 Hands-on Exercise 2: Building Custom Agents with Agent Builder

**🎯 Objective**: Make specialized AI agents just for specific tasks and workflows

### 🏗️ Step 1: Understanding Agent Builder

Agent Builder na where Microsoft Foundry Toolkit really dey shine. E let you create AI assistants wey be purpose-built, combine power of big language models with custom instructions, parameters, and special knowledge.

**🧠 Agent Architecture Components:**
- **Core Model**: Main LLM (GPT-4, Groks, Phi, etc.)
- **System Prompt**: Define agent personality and behavior
- **Parameters**: Tuned settings for best performance
- **Tools Integration**: Connect external APIs and MCP services
- **Memory**: Conversation context and session keeping

![Agent Builder Interface](../../../../translated_images/pcm/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Step 2: Agent Configuration Deep Dive

**🎨 Creating Effective System Prompts:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*You fit also use Generate System Prompt to make AI help you create and improve prompts*

**🔧 Parameter Optimization:**
| Parameter | Recommended Range | Use Case |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Technical/factual answers |
| **Temperature** | 0.7-0.9 | Creative/brainstorming tasks |
| **Max Tokens** | 500-1000 | Short answers |
| **Max Tokens** | 2000-4000 | Detailed explanations |

### 🐍 Step 3: Practical Exercise - Python Programming Agent

**🎯 Mission**: Make specialized Python coding assistant

**📋 Configuration Steps:**

1. **Model Selection**: Pick **Claude 3.5 Sonnet** (perfect for code)

2. **System Prompt Design**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Parameter Configuration**:
   - Temperature: 0.2 (steady, reliable code)
   - Max Tokens: 2000 (detailed explanations)
   - Top-p: 0.9 (balanced creativity)

![Python Agent Configuration](../../../../translated_images/pcm/pythonagent.5e51b406401c165f.webp)

### 🧪 Step 4: Testing Your Python Agent

**Test Scenarios:**
1. **Basic Function**: "Create function to find prime numbers"
2. **Complex Algorithm**: "Build binary search tree with insert, delete, and search"
3. **Real-world Problem**: "Make web scraper wey handle rate limiting and retries"
4. **Debugging**: "Fix this code [paste buggy code]"

**🏆 Success Criteria:**
- ✅ Code dey run without mistake
- ✅ Get proper documentation
- ✅ Follow Python best practices
- ✅ Clear explanations
- ✅ Give improvement suggestions

## 🎓 Module 1 Wrap-Up & Next Steps

### 📊 Knowledge Check

Test your understanding:
- [ ] You fit explain difference between models for catalog?
- [ ] You don create and test custom agent?
- [ ] You sabi how to optimize parameters for different uses?
- [ ] You fit design good system prompts?

### 📚 Additional Resources

- **Microsoft Foundry Toolkit Documentation**: [Official Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Prompt Engineering Guide**: [Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- **Models in Microsoft Foundry Toolkit**: [Models in Develpment](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Congrats!** You don master Microsoft Foundry Toolkit fundamentals and ready to build advanced AI apps!

### 🔜 Continue to Next Module

Ready for more advanced features? Continue to **[Module 2: MCP with Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** where you go learn how to:
- Connect your agents to outside tools using Model Context Protocol (MCP)
- Build browser automation agents with Playwright
- Integrate MCP servers with your Microsoft Foundry Toolkit agents
- Supercharge your agents with outside data and features

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->