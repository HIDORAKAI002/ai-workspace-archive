# 샘플 실행하기

여기서는 이미 작동하는 서버 코드가 있다고 가정합니다. 이전 장 중 하나에서 서버를 찾아보세요.

## mcp.json 설정하기

참조용 파일이 여기에 있습니다, [mcp.json](../../../../../03-GettingStarted/04-vscode/solution/mcp.json).

서버 항목을 필요에 따라 절대 경로와 서버 실행에 필요한 전체 명령을 포함하도록 변경하세요.

위에서 참조한 예제 파일에서 서버 항목은 다음과 같습니다:

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

GitHub 리포지토리 루트를 입력해야 할 수도 있으며, 이는 `git rev-parse --show-toplevel` 명령어로 확인할 수 있습니다.

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

이는 `node build/index.js` 같은 명령을 실행하는 것에 해당합니다.

- 서버 파일 위치나 선택한 런타임 및 서버 위치에 맞게 서버 항목을 변경하세요.

## 서버 기능 사용하기

- *mcp.json* 파일을 *./vscode* 폴더에 추가한 후, `play` 아이콘을 클릭하세요.

    GitHub Copilot에서 채팅 필드 바로 위에 있는 도구 아이콘이 변화하여 사용 가능한 도구 수가 늘어난 것을 확인할 수 있습니다.

## 도구 실행하기

- 도구 설명에 맞는 프롬프트를 채팅 창에 입력하세요. 예를 들어 `add` 도구를 실행하려면 "add 3 to 20" 같이 입력합니다.

    채팅 텍스트 상자 위에 도구가 표시되어 선택하여 실행할 수 있음을 알 수 있습니다.

    ![도구 실행을 표시하는 VS Code](../../../../../translated_images/ko/vscode-agent.d5a0e0b897331060.webp)

    도구를 선택하면 앞서 입력한 프롬프트에 따라 "23"과 같은 숫자 결과가 나타납니다.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->