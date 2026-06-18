# 🐙 Module 4: Practical MCP Development - Custom GitHub Clone Server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Quick Start:** Build one production-ready MCP server wey dey automate GitHub repository cloning and VS Code integration for just 30 minutes!

## 🎯 Learning Objectives

By the end of this lab, you go fit:

- ✅ Create one custom MCP server for real-world development workflows
- ✅ Implement GitHub repository cloning work through MCP
- ✅ Integrate custom MCP servers with VS Code and Agent Builder
- ✅ Use GitHub Copilot Agent Mode with custom MCP tools
- ✅ Test and deploy custom MCP servers for production environments

## 📋 Prerequisites

- Finish Labs 1-3 (MCP fundamentals and advanced development)
- GitHub Copilot subscription ([free signup available](https://github.com/github-copilot/signup))
- VS Code with Microsoft Foundry Toolkit and GitHub Copilot extensions
- Git CLI installed and set up

## 🏗️ Project Overview

### **Real-World Development Challenge**
As developers, we dey often use GitHub to clone repositories and open dem for VS Code or VS Code Insiders. Dis manual process na:

1. Open terminal/command prompt
2. Move go the directory wey you want
3. Run `git clone` command
4. Open VS Code inside the cloned directory

**Our MCP solution simplify dis to one smart command!**

### **Wetyn You Go Build**
One **GitHub Clone MCP Server** (`git_mcp_server`) wey provide:

| Feature | Description | Benefit |
|---------|-------------|---------|
| 🔄 **Smart Repository Cloning** | Clone GitHub repos with validation | Automated error checking |
| 📁 **Intelligent Directory Management** | Check and create directories safely | Make e no go overwrite anything |
| 🚀 **Cross-Platform VS Code Integration** | Open projects for VS Code/Insiders | Smooth workflow transition |
| 🛡️ **Robust Error Handling** | Handle network, permission, and path wahala | Production-ready reliability |

---

## 📖 Step-by-Step Implementation

### Step 1: Create GitHub Agent for Agent Builder

1. **Open Agent Builder** through the Microsoft Foundry Toolkit extension
2. **Create new agent** with the following configuration:
   ```
   Agent Name: GitHubAgent
   ```

3. **Start the custom MCP server:**
   - Go **Tools** → **Add Tool** → **MCP Server**
   - Choose **"Create A new MCP Server"**
   - Choose **Python template** for best flexibility
   - **Server Name:** `git_mcp_server`

### Step 2: Configure GitHub Copilot Agent Mode

1. **Open GitHub Copilot** inside VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Select Agent Model** inside the Copilot interface
3. **Choose Claude 3.7 model** for better reasoning skill
4. **Turn on MCP integration** for tool access

> **💡 Pro Tip:** Claude 3.7 dey give better understanding of development workflows and error handling styles.

### Step 3: Implement Core MCP Server Functionality

**Use the following detailed prompt with GitHub Copilot Agent Mode:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Step 4: Test Your MCP Server

#### 4a. Test inside Agent Builder

1. **Start the debug configuration** for Agent Builder
2. **Set up your agent with this system prompt:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Test with realistic user cases:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/pcm/DebugAgent.81d152370c503241.webp)

**Expected Results:**
- ✅ Cloning go successful with path confirmation
- ✅ VS Code go open automatically
- ✅ Correct error messages if any problem
- ✅ Good handling of edge cases

#### 4b. Test inside MCP Inspector


![MCP Inspector Testing](../../../../translated_images/pcm/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Congratulations!** You don create one practical, production-ready MCP server wey solve real development workflow wahala. Your custom GitHub clone server dey show how MCP fit automate and boost developer productivity.

### 🏆 Achievement Unlocked:
- ✅ **MCP Developer** - You create custom MCP server
- ✅ **Workflow Automator** - You streamline development processes  
- ✅ **Integration Expert** - You connect many development tools
- ✅ **Production Ready** - You build deployable solutions

---

## 🎓 Workshop Completion: Your Journey with Model Context Protocol

**Dear Workshop Participant,**

Congrats for finishing all four modules of the Model Context Protocol workshop! You don waka well well from understanding Microsoft Foundry Toolkit basics to building production-ready MCP servers wey solve real-world development palava.

### 🚀 Your Learning Path Recap:

**[Module 1](../lab1/README.md)**: You start by exploring Microsoft Foundry Toolkit fundamentals, model testing, and creating your first AI agent.

**[Module 2](../lab2/README.md)**: You learn MCP architecture, join Playwright MCP, and build your first browser automation agent.

**[Module 3](../lab3/README.md)**: You enter advanced custom MCP server development with the Weather MCP server and sabi debugging tools well well.

**[Module 4](../lab4/README.md)**: Now you don apply everything to build practical GitHub repository workflow automation tool.

### 🌟 Wetin You Don Master:

- ✅ **Microsoft Foundry Toolkit Ecosystem**: Models, agents, and integration patterns
- ✅ **MCP Architecture**: Client-server design, transport protocols, and security
- ✅ **Developer Tools**: From Playground to Inspector to production deployment
- ✅ **Custom Development**: Building, testing, and deploying your own MCP servers
- ✅ **Practical Applications**: Solve real-world workflow challenges with AI

### 🔮 Your Next Steps:

1. **Build Your Own MCP Server**: Use these skills to automate your own unique workflows
2. **Join the MCP Community**: Share your work and learn from others
3. **Explore Advanced Integration**: Connect MCP servers to enterprise systems
4. **Contribute to Open Source**: Help improve MCP tooling and documentation

Remember, dis workshop na just di beginning. The Model Context Protocol ecosystem dey quickly evolve, and you don ready to dey front for AI-powered development tools.

**Thank you for your participation and dedication to learning!**

We hope this workshop don inspire ideas wey go change how you build and use AI tools for your development journey.

**Happy coding!**

---

## What's Next

Congrats for finishing all labs for Module 10!

- Back to: [Module 10 Overview](../README.md)
- Continue to: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->