# Weather MCP 서버

이것은 Python으로 작성된 샘플 MCP 서버로, 모의 응답과 함께 날씨 도구를 구현합니다. 이를 자신의 MCP 서버의 기본 틀로 사용할 수 있습니다. 다음 기능들이 포함되어 있습니다:

- **Weather Tool**: 주어진 위치를 기반으로 모의된 날씨 정보를 제공하는 도구입니다.
- **Agent Builder와 연결**: MCP 서버를 Agent Builder에 연결하여 테스트 및 디버깅할 수 있는 기능입니다.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector)에서 디버깅**: MCP Inspector를 사용하여 MCP 서버를 디버그할 수 있는 기능입니다.

## Weather MCP 서버 템플릿 시작하기

> **사전 요구사항**
>
> 로컬 개발 머신에서 MCP 서버를 실행하려면 다음이 필요합니다:
>
> - [Python](https://www.python.org/)
> - (*선택 사항 - uv를 선호하는 경우*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger 확장](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 환경 준비

이 프로젝트의 환경 설정에는 두 가지 방법이 있습니다. 원하는 방법을 선택할 수 있습니다.

> 참고: 가상 환경을 생성한 후에는 VSCode 또는 터미널을 다시 로드하여 가상 환경의 Python이 사용되도록 하십시오.

| 방법 | 단계 |
| -------- | ----- |
| `uv` 사용 | 1. 가상 환경 생성: `uv venv` <br>2. VSCode 명령어 "***Python: Select Interpreter***"를 실행하여 생성한 가상 환경의 Python을 선택<br>3. 의존성 설치 (개발 의존성 포함): `uv pip install -r pyproject.toml --extra dev` |
| `pip` 사용 | 1. 가상 환경 생성: `python -m venv .venv` <br>2. VSCode 명령어 "***Python: Select Interpreter***"를 실행하여 생성한 가상 환경의 Python을 선택<br>3. 의존성 설치 (개발 의존성 포함): `pip install -e .[dev]` |

환경 설정이 완료되면 로컬 개발 머신에서 Agent Builder를 MCP 클라이언트로 사용하여 서버를 실행할 수 있습니다:
1. VS Code 디버그 패널을 엽니다. `Debug in Agent Builder`를 선택하거나 `F5`를 눌러 MCP 서버 디버깅을 시작합니다.
2. AI Toolkit Agent Builder를 사용하여 [이 프롬프트](../../../../../../../../../../../open_prompt_builder)로 서버를 테스트합니다. 서버가 자동으로 Agent Builder에 연결됩니다.
3. `Run`을 클릭하여 프롬프트로 서버를 테스트합니다.

**축하합니다!** Agent Builder를 MCP 클라이언트로 사용하여 로컬 개발 머신에서 Weather MCP 서버를 성공적으로 실행했습니다.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 템플릿에 포함된 내용

| 폴더 / 파일 | 내용                                                    |
| ------------ | ------------------------------------------------------- |
| `.vscode`    | 디버깅을 위한 VSCode 파일                                |
| `.aitk`      | AI Toolkit 구성을 포함                                   |
| `src`        | Weather MCP 서버의 소스 코드                             |

## Weather MCP 서버 디버깅 방법

> 참고:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector)는 MCP 서버 테스트 및 디버깅을 위한 시각적 개발 도구입니다.
> - 모든 디버깅 모드는 브레이크포인트를 지원하므로 도구 구현 코드에 브레이크포인트를 추가할 수 있습니다.

| 디버그 모드 | 설명 | 디버깅 단계 |
| ---------- | ------ | ------------ |
| Agent Builder | AI Toolkit을 통해 Agent Builder 내에서 MCP 서버를 디버깅합니다. | 1. VS Code 디버그 패널을 엽니다. `Debug in Agent Builder`를 선택하고 `F5`를 눌러 MCP 서버 디버깅을 시작합니다.<br>2. AI Toolkit Agent Builder를 사용하여 [이 프롬프트](../../../../../../../../../../../open_prompt_builder)로 서버를 테스트합니다. 서버가 자동으로 Agent Builder에 연결됩니다.<br>3. `Run`을 클릭하여 프롬프트로 서버를 테스트합니다. |
| MCP Inspector | MCP Inspector를 사용하여 MCP 서버를 디버깅합니다. | 1. [Node.js](https://nodejs.org/)를 설치합니다.<br>2. Inspector 설치: `cd inspector` && `npm install` <br>3. VS Code 디버그 패널을 엽니다. `Debug SSE in Inspector (Edge)` 또는 `Debug SSE in Inspector (Chrome)`을 선택하고 `F5`를 눌러 디버깅을 시작합니다.<br>4. 브라우저에서 MCP Inspector가 실행되면 `Connect` 버튼을 눌러 MCP 서버에 연결합니다.<br>5. `List Tools`를 클릭하고 도구를 선택한 뒤, 파라미터를 입력하고 `Run Tool`을 클릭하여 서버 코드를 디버깅합니다.<br> |

## 기본 포트 및 사용자 지정

| 디버그 모드 | 포트 | 정의 | 사용자 지정 | 비고 |
| ---------- | ----- | --------- | ------------ | ------ |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 파일에서 위 포트 변경 가능 | 해당 없음 |
| MCP Inspector | 3001 (서버); 5173 및 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 파일에서 위 포트 변경 가능 | 해당 없음 |

## 피드백

이 템플릿에 대한 피드백이나 제안이 있다면 [AI Toolkit GitHub 저장소](https://github.com/microsoft/vscode-ai-toolkit/issues)에 이슈를 열어주세요.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원문 문서는 권위 있는 출처로 간주되어야 합니다. 중요한 정보의 경우 전문적인 인간 번역을 권장합니다. 본 번역 사용으로 인한 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->