# 运行示例

## 创建虚拟环境

```sh
python -m venv venv
source ./venv/bin/activate
```

## 安装依赖

```sh
pip install "mcp[cli]"
```

## 运行服务器

```sh
uvicorn server:app --port 8000
```

## 使用 GitHub Copilot 和 VS Code 测试服务器

将条目添加到 mcp.json，如下所示：

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

确保你点击服务器的“start”。

在 GitHub Copilot 中粘贴以下提示：

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

第一次会询问你是否接受一个采样操作，然后会要求你接受运行“create_blog”工具。你应该会看到类似如下的响应：

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件使用 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 进行翻译。虽然我们力求准确，但请注意自动翻译可能包含错误或不准确之处。原始语言版本的文件应被视为权威来源。对于关键信息，建议采用专业人工翻译。对于因使用本翻译而产生的任何误解或误释，我们不承担任何责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->