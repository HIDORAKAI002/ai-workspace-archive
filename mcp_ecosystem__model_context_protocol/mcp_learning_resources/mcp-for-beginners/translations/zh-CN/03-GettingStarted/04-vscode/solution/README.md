# 运行示例

这里假设你已经有一个可工作的服务器代码。请从前面的章节中找到一个服务器。

## 设置 mcp.json

这是你用作参考的文件，[mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json)。

根据需要更改服务器条目，以指向你的服务器的绝对路径，包括运行所需的完整命令。

在前面提到的示例文件中，服务器条目看起来如下：

<details>
<summary>node.js</summary>
```json
"hello-mcp": {
    "command": "node",
    "args": [
        "build/index.js"
    ]
}
```
</details>

<details>
<summary>.NET</summary>

你可能需要输入 GitHub 仓库根目录，可以通过命令 `git rev-parse --show-toplevel` 获取。

```jsonc
{
  "inputs": [
    {
      "type": "promptString",
      "id": "repository-root",
      "description": "The absolute path to the repository root"
    }
  ],
  "servers": {
    "calculator-mcp-dotnet": {
      "type": "stdio",
      "command": "dotnet",
      "args": [
        "run",
        "--project",
        "${input:repository-root}/03-GettingStarted/02-client/solution/server/server.csproj"
      ]
    }
  }
}
```

</details>

这相当于运行如下命令：`node build/index.js`。

- 根据你所选择的运行时和服务器位置，修改此服务器条目以匹配你的服务器文件位置或启动服务器所需的内容。

## 使用服务器中的功能

- 一旦你将 *mcp.json* 添加到 *./vscode* 文件夹中，点击 `播放` 图标，

    观察工具图标变化，显示可用工具数量增加。工具图标位于 GitHub Copilot 的聊天字段正上方。

## 运行工具

- 在聊天窗口中输入匹配你的工具描述的提示。例如，要触发工具 `add` ，输入类似 “add 3 to 20”。

    你应该会看到一个工具显示在聊天文本框上方，提示你选择运行该工具，如下图所示：

    ![VS Code indicating it wanting to run a tool](../../../../../translated_images/zh-CN/vscode-agent.d5a0e0b897331060.webp)

    如果你的提示如前所述，选择该工具应生成一个数值结果 "23"。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->