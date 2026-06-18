# 🐙 Module 4: ਪ੍ਰੈਕਟਿਕਲ MCP ਵਿਕਾਸ - ਕਸਟਮ GitHub ਕਲੋਨ ਸਰਵਰ

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ ਤੇਜ਼ ਸ਼ੁਰੂਆਤ:** ਸਿਰਫ 30 ਮਿੰਟਾਂ ਵਿੱਚ ਇੱਕ ਪ੍ਰੋਡਕਸ਼ਨ-ਤਿਆਰ MCP ਸਰਵਰ ਬਣਾਓ ਜੋ GitHub ਰਿਪੋਜ਼ਟਰੀ ਕਲੋਨਿੰਗ ਅਤੇ VS ਕੋਡ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਨੂੰ ਆਟੋਮੈਟ ਕਰਦਾ ਹੈ!

## 🎯 ਸਿਖਲਾਈ ਦੇ ਲਕੜੇ

ਇਸ ਲੈਬ ਦੇ ਅੰਤ ਤੱਕ, ਤੁਸੀਂ ਸਮਰੱਥ ਹੋਵੋਗੇ:

- ✅ ਅਸਲੀ ਦੁਨੀਆ ਦੇ ਵਿਕਾਸ ਕਰਵਾਈ ਲਈ ਇੱਕ ਕਸਟਮ MCP ਸਰਵਰ ਬਣਾਉਣਾ
- ✅ MCP ਰਾਹੀਂ GitHub ਰਿਪੋਜ਼ਟਰੀ ਕਲੋਨਿੰਗ ਫੰਕਸ਼ਨਾਲਿਟੀ ਲਾਗੂ ਕਰਨਾ
- ✅ কਸਟਮ MCP ਸਰਵਰਾਂ ਨੂੰ VS ਕੋਡ ਅਤੇ ਏਜੰਟ ਬਿਲਡਰ ਨਾਲ ਇੰਟੀਗ੍ਰੇਟ ਕਰਨਾ
- ✅ GitHub Copilot ਏਜੰਟ ਮੋਡ ਨੂੰ ਕਸਟਮ MCP ਟੂਲਜ਼ ਨਾਲ ਵਰਤਣਾ
- ✅ ਪ੍ਰੋਡਕਸ਼ਨ ਵਾਤਾਵਰਣ ਵਿੱਚ ਕਸਟਮ MCP ਸਰਵਰਾਂ ਦੀ ਜਾਂਚ ਅਤੇ ਡਿਪਲੋਇਮੈਂਟ ਕਰਨਾ

## 📋 ਜ਼ਰੂਰੀਆਂ

- ਲੈਬ 1-3 (MCP ਬੁਨਿਆਦੀ ਅਤੇ ਐਡਵਾਂਸਡ ਵਿਕਾਸ) ਦੀ ਪੂਰੀ ਹੋਣੀ
- GitHub Copilot ਸਬਸਕ੍ਰਿਪਸ਼ਨ ([ਮੁਫਤ ਸਾਈਨਅਪ ਉਪਲਬਧ](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit ਅਤੇ GitHub Copilot ਐਕਸਟੈਂਸ਼ਨ ਸਮੇਤ VS ਕੋਡ
- Git CLI ਇੰਸਟਾਲਡ ਅਤੇ ਕਨਫਿਗਰਡ ਹੋਣਾ

## 🏗️ ਪ੍ਰੋਜੈਕਟ ਓਵਰਵਿਊ

### **ਅਸਲੀ ਦੁਨੀਆ ਦੇ ਵਿਕਾਸ ਚੈਲੈਂਜ**
ਵਿਕਾਸਕਾਰਾਂ ਵਜੋਂ ਅਸੀਂ ਅਕਸਰ GitHub ਤੋਂ ਰਿਪੋਜ਼ਟਰੀਜ਼ ਕਲੋਨ ਕਰਕੇ ਉਹਨਾਂ ਨੂੰ VS ਕੋਡ ਜਾਂ VS ਕੋਡ ਇੰਸਾਈਡਰ ਵਿੱਚ ਖੋਲ੍ਹਦੇ ਹਾਂ। ਇਹ ਹੱਥੋਂ ਕੀਤਾ ਜਾਣ ਵਾਲਾ ਪ੍ਰਕਿਰਿਆ ਇਨ੍ਹਾਂ ਕਦਮਾਂ 'ਚ ਹੁੰਦੀ ਹੈ:
1. ਟਰਮੀਨਲ/ਕਮਾਂਡ ਪ੍ਰੋੰਪਟ ਖੋਲ੍ਹਣਾ
2. ਲੋੜੀਂਦੇ ਡਾਇਰੈਕਟਰੀ ਨੂੰ ਜਾਣਾ
3. `git clone` ਕਮਾਂਡ ਚਲਾਣਾ
4. ਕਲੋਨ ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ VS ਕੋਡ ਖੋਲ੍ਹਣਾ

**ਸਾਡਾ MCP ਹੱਲ ਇਹ ਸਾਰੇ ਕਦਮ ਇੱਕ ਇੰਟੈਲੀਜੈਂਟ ਕਮਾਂਡ ਵਿੱਚ ਸਾਂਝਾ ਕਰਦਾ ਹੈ!**

### **ਤੁਸੀਂ ਜੋ ਬਣਾਓਗੇ**
ਇੱਕ **GitHub ਕਲੋਨ MCP ਸਰਵਰ** (`git_mcp_server`) ਜੋ ਇਹ ਮੁਹੱਈਆ ਕਰਦਾ ਹੈ:

| ਫੀਚਰ | ਵੇਰਵਾ | ਲਾਭ |
|---------|-------------|---------|
| 🔄 **ਸਮਾਰਟ ਰਿਪੋਜ਼ਟਰੀ ਕਲੋਨਿੰਗ** | GitHub ਰਿਪੋਜ਼ ਕਲੋਨ ਕਰੋ ਵੈਰੀਫਿਕੇਸ਼ਨ ਨਾਲ | ਆਟੋਮੇਟਿਕ ਏਰਰ ਚੈਕਿੰਗ |
| 📁 **ਸਮਝਦਾਰ ਡਾਇਰੈਕਟਰੀ ਪਰਬੰਧਨ** | ਸੁਰੱਖਿਅਤ ਤੌਰ ਤੇ ਡਾਇਰੈਕਟਰੀਜ਼ ਚੈੱਕ ਅਤੇ ਤਿਆਰ ਕਰੋ | ਓਵਰਰਾਈਟਿੰਗ ਤੋਂ ਬਚਾਓ |
| 🚀 **ਕ੍ਰਾਸ-ਪਲੇਟਫਾਰਮ VS ਕੋਡ ਇੰਟੀਗ੍ਰੇਸ਼ਨ** | ਪ੍ਰੋਜੈਕਟ VS ਕੋਡ/ਇੰਸਾਈਡਰ ਵਿੱਚ ਹਲ ਕਰੋ | ਬਿਨਾਂ ਰੁਕਾਵਟ ਕੰਮ ਦੇ ਜਾਰੀ ਕਰਨ ਦੀ ਸੁਵਿਧਾ |
| 🛡️ **ਮਜ਼ਬੂਤ ਏਰਰ ਹੈਂਡਲਿੰਗ** | ਨੈਟਵਰਕ, ਅਨੁਮਤੀ ਅਤੇ ਪਾਥ ਸਮੱਸਿਆਵਾਂ ਨੂੰ ਸੰਭਾਲੋ | ਪ੍ਰੋਡਕਸ਼ਨ-ਤਿਆਰ ਭਰੋਸੇਯੋਗਤਾ |

---

## 📖 ਕਦਮ-ਦਰ-ਕਦਮ ਲਾਗੂ ਕਰਨ ਦੀ ਪ੍ਰਕਿਰਿਆ

### ਕਦਮ 1: ਏਜੰਟ ਬਿਲਡਰ ਵਿੱਚ GitHub ਏਜੰਟ ਬਣਾਓ

1. Microsoft Foundry Toolkit ਐਕਸਟੈਂਸ਼ਨ ਰਾਹੀਂ **Agent Builder ਲਾਂਚ ਕਰੋ**
2. ਹੇਠਾਂ ਦਿੱਤੀ ਸੰਰਚਨਾ ਸਮੇਤ **ਨਵਾਂ ਏਜੰਟ ਬਣਾਓ:**
   ```
   Agent Name: GitHubAgent
   ```

3. **ਕਸਟਮ MCP ਸਰਵਰ ਸ਼ੁਰੂ ਕਰੋ:**
   - **Tools** → **Add Tool** → **MCP Server** 'ਤੇ ਜਾਓ
   - **"Create A new MCP Server"** ਚੁਣੋ
   - ਜ਼ਿਆਦਾ ਲਚਕੀਲਾਪਣ ਲਈ **Python ਟੈਂਪਲੇਟ** ਚੁਣੋ
   - **ਸਰਵਰ ਦਾ ਨਾਮ:** `git_mcp_server`

### ਕਦਮ 2: GitHub Copilot Agent Mode ਨੂੰ ਸੈਟ ਕਰੋ

1. VS ਕੋਡ ਵਿੱਚ **GitHub Copilot ਖੋਲ੍ਹੋ** (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. Copilot ਇੰਟਰਫੇਸ ਵਿੱਚ **ਏਜੰਟ ਮਾਡਲ ਚੁਣੋ**
3. ਬਿਹਤਰ ਤਰਕਸ਼ਕਤੀ ਲਈ **Claude 3.7 ਮਾਡਲ** ਚੁਣੋ
4. ਆਈ-ਟੂਲ ਪਹੁੰਚ ਲਈ **MCP ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਯੋਗ ਕਰੋ**

> **💡 ਪ੍ਰੋ ਟਿਪ:** Claude 3.7 ਵਿਕਾਸ ਕੰਮ ਅਤੇ ਏਰਰ ਹੈਂਡਲਿੰਗ ਪੈਟਰਨਾਂ ਦੀ ਬਿਹਤਰ ਸਮਝ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

### ਕਦਮ 3: ਮੁੱਖ MCP ਸਰਵਰ ਫੰਕਸ਼ਨਾਲਿਟੀ ਲਾਗੂ ਕਰੋ

**GitHub Copilot ਏਜੰਟ ਮੋਡ ਨਾਲ ਹੇਠ ਲਿਖਿਆ ਵਿਸਤ੍ਰਿਤ ਪ੍ਰਾਂਪਟ ਵਰਤੋਂ:**

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

### ਕਦਮ 4: ਆਪਣੇ MCP ਸਰਵਰ ਦੀ ਜਾਂਚ ਕਰੋ

#### 4a. Agent Builder ਵਿੱਚ ਟੈਸਟ ਕਰੋ

1. Agent Builder ਲਈ **ਡਿਬੱਗ ਸੰਰਚਨਾ ਚਾਲੂ ਕਰੋ**
2. ਇਸ ਸਿਸਟਮ ਪ੍ਰਾਂਪਟ ਨਾਲ ਆਪਣੇ ਏਜੰਟ ਨੂੰ ਕਨਫਿਗਰ ਕਰੋ:

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. ਹਕੀਕਤੀ ਵਰਤੋਂਕਾਰ ਸਿੱਧਾਂਤਾਂ ਨਾਲ ਟੈਸਟ ਕਰੋ:

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/pa/DebugAgent.81d152370c503241.webp)

**ਉਮੀਦ ਦੇ ਨਤੀਜੇ:**
- ✅ ਰਸਤੇ ਦੀ ਪੁਸ਼ਟੀ ਨਾਲ ਕਲੋਨਿੰਗ ਸਫਲ
- ✅ ਆਟੋਮੈਟਿਕ VS ਕੋਡ ਖੋਲ੍ਹਣਾ
- ✅ ਗਲਤ ਸਥਿਤੀਆਂ ਲਈ ਸਾਫ਼ ਏਰਰ ਸੁਨੇਹੇ
- ✅ ਖਾਸ ਮਾਮਲਿਆਂ ਦੀ ਸਹੀ ਸੰਭਾਲ

#### 4b. MCP ਇੰਸਪੈਕਟਰ ਵਿੱਚ ਟੈਸਟ ਕਰੋ


![MCP Inspector Testing](../../../../translated_images/pa/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 ਮੁਬਾਰਕਾਂ!** ਤੁਸੀਂ ਇੱਕ ਪ੍ਰੈਕਟਿਕਲ, ਪ੍ਰੋਡਕਸ਼ਨ-ਤਿਆਰ MCP ਸਰਵਰ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਇਆ ਹੈ ਜੋ ਅਸਲੀ ਵਿਕਾਸ ਕਾਰਜਵਾਹੀ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦਾ ਹੱਲ ਕਰਦਾ ਹੈ। ਤੁਹਾਡਾ ਕਸਟਮ GitHub ਕਲੋਨ ਸਰਵਰ MCP ਦੀ ਸ਼ਕਤੀ ਨੂੰ ਵਿਕਾਸਕਾਰ ਉਤਪਾਦਕਤਾ ਆਟੋਮੈਟ ਕਰਨ ਅਤੇ ਸੁਧਾਰਨ ਲਈ ਦਰਸਾਉਂਦਾ ਹੈ।

### 🏆 ਪ੍ਰਾਪਤੀ ਖੁਲ੍ਹ ਗਈ:
- ✅ **MCP ਵਿਕਾਸਕਾਰ** - ਕਸਟਮ MCP ਸਰਵਰ ਬਣਾਇਆ
- ✅ **ਵਰਕਫਲੋ ਆਟੋਮੈਟਰ** - ਵਿਕਾਸ ਪ੍ਰਕਿਰਿਆਵਾਂ ਕੋ ਸਿਰਲਤਾ ਦਿੱਤੀ  
- ✅ **ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਮਾਹਿਰ** - ਕਈ ਵਿਕਾਸ ਟੂਲਾਂ ਨੂੰ ਜੋੜਿਆ
- ✅ **ਪ੍ਰੋਡਕਸ਼ਨ ਤਿਆਰ** - ਡਿਪਲੋਇਯੋਗ ਹੱਲ ਬਣਾਏ

---

## 🎓 ਵਰਕਸ਼ਾਪ ਪੂਰਨਤਾ: ਤੁਹਾਡੇ ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ ਦੇ ਨਾਲ ਯਾਤਰਾ

**ਪਿਆਰੇ ਵਰਕਸ਼ਾਪ ਭਾਗੀਦਾਰ,**

ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ ਵਰਕਸ਼ਾਪ ਦੇ ਸਾਰੇ ਚਾਰ ਮੋਡਿਊਲ ਪੂਰੇ ਕਰਨ ’ਤੇ ਤੁਹਾਨੂੰ ਵਧਾਈਆਂ! ਤੁਸੀਂ ਮੁੱਢਲੀ Microsoft Foundry Toolkit ਸੰਕਲਪਾਂ ਨੂੰ ਸਮਝਣ ਤੋਂ ਲੈਕੇ ਪ੍ਰੋਡਕਸ਼ਨ-ਤਿਆਰ MCP ਸਰਵਰ ਬਣਾਉਣ ਤੱਕ ਲੰਮਾ ਸਫਰ ਤੈਅ ਕੀਤਾ ਹੈ ਜੋ ਅਸਲੀ ਦੁਨੀਆ ਦੇ ਵਿਕਾਸ ਚੈਲੈਂਜਾਂ ਦਾ ਹੱਲ ਕਰਦੇ ਹਨ।

### 🚀 ਤੁਹਾਡਾ ਸਿੱਖਿਆ ਮਾਰਗ ਸਾਰ:

**[ਮੋਡਿਊਲ 1](../lab1/README.md)**: Microsoft Foundry Toolkit ਦੇ ਮੁੱਢਲੀ ਅਸੂਲਾਂ ਦੀ ਪਹਿਚਾਣ, ਮਾਡਲ ਟੈਸਟਿੰਗ ਅਤੇ ਆਪਣਾ ਪਹਿਲਾ AI ਏਜੰਟ ਬਣਾਉਣਾ।

**[ਮੋਡਿਊਲ 2](../lab2/README.md)**: MCP ਆਰਕੀਟੈਕਚਰ ਸਿੱਖਣਾ, Playwright MCP ਇੰਟੀਗ੍ਰੇਸ਼ਨ, ਅਤੇ ਪਹਿਲਾ ਬ੍ਰਾਉਜ਼ਰ ਆਟੋਮੇਸ਼ਨ ਏਜੰਟ ਤੈਯਾਰ ਕਰਨਾ।

**[ਮੋਡਿਊਲ 3](../lab3/README.md)**: Weather MCP ਸਰਵਰ ਸਹਿਤ ਕਸਟਮ MCP ਸਰਵਰ ਵਿਕਾਸ ਤੇ ਅਡਵਾਂਸਡ ਡਿਬੱਗਿੰਗ ਵਿਧੀਆਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕੀਤੀ।

**[ਮੋਡਿਊਲ 4](../lab4/README.md)**: ਹੁਣ ਤੁਸੀਂ ਸਭ ਕੁਝ ਲਾਗੂ ਕਰਕੇ ਇੱਕ ਪ੍ਰੈਕਟਿਕਲ GitHub ਰਿਪੋਜ਼ਟਰੀ ਵਰਕਫਲੋ ਆਟੋਮੇਸ਼ਨ ਟੂਲ ਬਣਾਇਆ ਹੈ।

### 🌟 ਤੁਸੀਂ ਕੀ ਕਾਬਲ ਬਣੇ:

- ✅ **Microsoft Foundry Toolkit ਈਕੋਸਿਸਟਮ**: ਮਾਡਲ, ਏਜੰਟ, ਅਤੇ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਪੈਟਰਨ
- ✅ **MCP ਆਰਕੀਟੈਕਚਰ**: ਕਲਾਇੰਟ-ਸਰਵਰ ਡਿਜ਼ਾਈਨ, ਟ੍ਰਾਂਸਪੋਰਟ ਪ੍ਰੋਟੋਕੌਲ, ਅਤੇ ਸੁਰੱਖਿਆ
- ✅ **ਵਿਕਾਸ ਕਾਰਜ ਟੂਲਜ਼**: ਪਲੇਗ੍ਰਾਊਂਡ ਤੋਂ ਇੰਸਪੈਕਟਰ ਤੱਕ ਪ੍ਰੋਡਕਸ਼ਨ ਡਿਪਲੋਇਮੈਂਟ
- ✅ **ਕਸਟਮ ਵਿਕਾਸ**: ਆਪਣੇ MCP ਸਰਵਰ ਬਨਾਉਣਾ, ਟੈਸਟ ਕਰਨਾ ਅਤੇ ਡਿਪਲੋਇ ਕਰਨਾ
- ✅ **ਪ੍ਰੈਕਟਿਕਲ ਐਪਲੀਕੇਸ਼ਨਜ਼**: AI ਨਾਲ ਅਸਲੀ ਦੁਨੀਆ ਦੇ ਵਰਕਫਲੋ ਚੈਲੈਂਜਾਂ ਨੂੰ ਹੱਲ ਕਰਨਾ

### 🔮 ਤੁਹਾਡੇ ਅਗਲੇ ਕਦਮ:

1. **ਆਪਣਾ MCP ਸਰਵਰ ਬਣਾਓ**: ਆਪਣੇ ਵਿਅਕਤੀਗਤ ਵਰਕਫਲੋਜ਼ ਆਟੋਮੇਟ ਕਰਨ ਲਈ ਇਹ ਹੁਨਰ ਵਰਤੋ  
2. **MCP ਕਮਿਊਨਿਟੀ ਵਿੱਚ ਸ਼ਾਮਿਲ ਹੋਵੋ**: ਆਪਣੇ ਬਣਾਏ ਗਏ ਤਜਰਬੇ ਸਾਂਝੇ ਕਰੋ ਅਤੇ ਦੂਜਿਆਂ ਤੋਂ ਸਿੱਖੋ  
3. **ਅਡਵਾਂਸਡ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਖੋਜੋ**: MCP ਸਰਵਰਾਂ ਨੂੰ ਐਂਟਰਪ੍ਰਾਈਜ਼ ਸਿਸਟਮਾਂ ਨਾਲ ਜੋੜੋ  
4. **ਓਪਨ ਸੋర్స్ ਵਿਚ ਯੋਗਦਾਨ ਦਿਓ**: MCP ਟੂਲਿੰਗ ਅਤੇ ਦਸਤਾਵੇਜ਼ ਨੂੰ ਸੁਧਾਰਨ ਵਿੱਚ ਮਦਦ ਕਰੋ

ਯਾਦ ਰੱਖੋ, ਇਹ ਵਰਕਸ਼ਾਪ ਸਿਰਫ਼ ਸ਼ੁਰੂਆਤ ਹੈ। ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕਾਲ ਈਕੋਸਿਸਟਮ ਤੇਜ਼ੀ ਨਾਲ ਵਿਕਸਿਤ ਹੋ ਰਿਹਾ ਹੈ, ਅਤੇ ਤੁਸੀਂ ਹੁਣ AI-ਚਲਿਤ ਵਿਕਾਸ ਟੂਲਾਂ ਦੇ ਮੂਹਰੇ ਹੋ।

**ਸਿੱਖਣ ਅਤੇ ਭਾਗੀਦਾਰੀ ਲਈ ਤੁਹਾਡਾ ਧੰਨਵਾਦ!**

ਅਸੀਂ ਉਮੀਦ ਕਰਦੇ ਹਾਂ ਇਹ ਵਰਕਸ਼ਾਪ ਤੁਹਾਡੇ ਵਿਚ ਸਿੱਖਣ ਅਤੇ ਵਿਕਾਸ ਟੂਲਾਂ ਨਾਲ ਇੰਟਰੈਕਟ ਕਰਨ ਦੇ ਨਵੇਂ ਵਿਚਾਰ ਜਾਗਰੂਕ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇਗੀ।

**ਕੋਡਿੰਗ ਮੁਬਾਰਕ!**

---

## ਅਗਲਾ ਕੀ ਹੈ

ਮੋਡਿਊਲ 10 ਵਿੱਚ ਸਾਰੀ ਲੈਬਾਂ ਪੂਰੀਆਂ ਕਰਨ ਲਈ ਵਧਾਈਆਂ!

- ਵਾਪਸ ਜਾਓ: [ਮੋਡਿਊਲ 10 ਓਵਰਵਿਊ](../README.md)
- ਜਾਰੀ ਰੱਖੋ: [ਮੋਡਿਊਲ 11: MCP ਸਰਵਰ ਹੈਂਡਸ-ਆਨ ਲੈਬਜ਼](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->