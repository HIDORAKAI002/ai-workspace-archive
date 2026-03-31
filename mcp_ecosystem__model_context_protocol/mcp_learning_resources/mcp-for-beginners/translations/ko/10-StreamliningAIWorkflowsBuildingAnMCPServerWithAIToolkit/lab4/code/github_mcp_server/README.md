# Weather MCP 서버

이것은 모의 응답으로 날씨 도구를 구현한 Python 샘플 MCP 서버입니다. 자체 MCP 서버의 템플릿으로 사용할 수 있습니다. 다음 기능이 포함되어 있습니다:

- **Weather Tool**: 주어진 위치에 기반한 모의 날씨 정보를 제공하는 도구입니다.
- **Git Clone Tool**: git 저장소를 지정된 폴더로 복제하는 도구입니다.
- **VS Code Open Tool**: VS Code 또는 VS Code Insiders에서 폴더를 여는 도구입니다.
- **Agent Builder에 연결**: 테스트 및 디버깅을 위해 MCP 서버를 Agent Builder에 연결할 수 있는 기능입니다.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector)에서 디버깅**: MCP Inspector를 사용하여 MCP 서버를 디버깅할 수 있는 기능입니다.

## Weather MCP 서버 템플릿 시작하기

> **필수 조건**
>
> 로컬 개발 머신에서 MCP 서버를 실행하려면 다음이 필요합니다:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo 도구 사용 시 필요)
> - [VS Code](https://code.visualstudio.com/) 또는 [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode 도구 사용 시 필요)
> - (*선택 사항 - uv를 선호하는 경우*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 환경 준비

이 프로젝트의 환경 설정에는 두 가지 방법이 있습니다. 취향에 따라 하나를 선택할 수 있습니다.

> 참고: 가상 환경을 생성한 후 VSCode나 터미널을 다시 로드하여 가상 환경의 Python이 사용되도록 하세요.

| 방법 | 단계 |
| -------- | ----- |
| `uv` 사용 | 1. 가상 환경 생성: `uv venv` <br>2. VSCode 명령 "***Python: Select Interpreter***" 실행 후 생성한 가상 환경의 Python 선택 <br>3. 의존성 설치 (개발 의존성 포함): `uv pip install -r pyproject.toml --extra dev` |
| `pip` 사용 | 1. 가상 환경 생성: `python -m venv .venv` <br>2. VSCode 명령 "***Python: Select Interpreter***" 실행 후 생성한 가상 환경의 Python 선택 <br>3. 의존성 설치 (개발 의존성 포함): `pip install -e .[dev]` |

환경 설정 후, MCP 클라이언트로서 Agent Builder를 통해 로컬 개발 머신에서 서버를 실행할 수 있습니다:
1. VS Code 디버그 패널을 엽니다. `Debug in Agent Builder`를 선택하거나 `F5` 키를 눌러 MCP 서버 디버깅을 시작합니다.
2. AI Toolkit Agent Builder를 사용하여 [이 프롬프트](../../../../../../../../../../../open_prompt_builder)로 서버를 테스트합니다. 서버가 Agent Builder에 자동 연결됩니다.
3. `Run`을 클릭하여 프롬프트로 서버를 테스트합니다.

**축하합니다!** Agent Builder를 MCP 클라이언트로 사용하여 로컬 개발 머신에서 Weather MCP 서버를 성공적으로 실행했습니다.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 템플릿에 포함된 내용

| 폴더 / 파일 | 내용                                      |
| ------------ | ------------------------------------------ |
| `.vscode`    | 디버깅을 위한 VSCode 파일들                |
| `.aitk`      | AI Toolkit 설정                           |
| `src`        | 날씨 MCP 서버의 소스 코드                  |

## Weather MCP 서버 디버깅 방법

> 참고:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector)는 MCP 서버 테스트 및 디버깅을 위한 시각적 개발 도구입니다.
> - 모든 디버깅 모드는 중단점(breakpoint)을 지원하므로 도구 구현 코드에 중단점을 추가할 수 있습니다.

## 사용 가능한 도구들

### Weather Tool
`get_weather` 도구는 지정된 위치의 모의 날씨 정보를 제공합니다.

| 매개변수 | 유형 | 설명 |
| --------- | ---- | ----------- |
| `location` | 문자열 | 날씨 정보를 가져올 위치 (예: 도시 이름, 주, 좌표 등) |

### Git Clone Tool
`git_clone_repo` 도구는 git 저장소를 지정된 폴더로 복제합니다.

| 매개변수 | 유형 | 설명 |
| --------- | ---- | ----------- |
| `repo_url` | 문자열 | 복제할 git 저장소의 URL |
| `target_folder` | 문자열 | 저장소를 복제할 폴더 경로 |

도구는 JSON 객체를 반환합니다:
- `success`: 작업 성공 여부를 나타내는 불리언
- `target_folder` 또는 `error`: 복제한 저장소의 경로 또는 오류 메시지

### VS Code Open Tool
`open_in_vscode` 도구는 폴더를 VS Code 또는 VS Code Insiders 애플리케이션에서 엽니다.

| 매개변수 | 유형 | 설명 |
| --------- | ---- | ----------- |
| `folder_path` | 문자열 | 열 폴더의 경로 |
| `use_insiders` | 불리언 (선택사항) | 일반 VS Code 대신 VS Code Insiders 사용 여부 |

도구는 JSON 객체를 반환합니다:
- `success`: 작업 성공 여부를 나타내는 불리언
- `message` 또는 `error`: 확인 메시지 또는 오류 메시지

| 디버그 모드 | 설명 | 디버깅 단계 |
| ---------- | ----------- | --------------- |
| Agent Builder | AI Toolkit을 통해 Agent Builder에서 MCP 서버를 디버깅합니다. | 1. VS Code 디버그 패널을 엽니다. `Debug in Agent Builder` 선택 후 `F5`를 눌러 MCP 서버 디버깅 시작<br>2. AI Toolkit Agent Builder에서 [이 프롬프트](../../../../../../../../../../../open_prompt_builder)로 서버 테스트. 서버가 Agent Builder에 자동 연결됨.<br>3. `Run` 클릭하여 프롬프트로 서버 테스트. |
| MCP Inspector | MCP Inspector를 사용해 MCP 서버를 디버깅합니다. | 1. [Node.js](https://nodejs.org/) 설치<br>2. Inspector 설정: `cd inspector` && `npm install` <br>3. VS Code 디버그 패널 열기. `Debug SSE in Inspector (Edge)` 또는 `Debug SSE in Inspector (Chrome)` 선택 후 `F5`로 디버깅 시작<br>4. 브라우저에서 MCP Inspector가 실행되면 `Connect` 버튼을 눌러 MCP 서버 연결<br>5. `List Tools` 후 도구 선택, 매개변수 입력, `Run Tool`을 눌러 서버 코드 디버깅 가능<br> |

## 기본 포트 및 커스터마이징

| 디버그 모드 | 포트 | 정의 파일 | 커스터마이징 | 비고 |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) 에서 위 포트 변경 가능 | 해당 없음 |
| MCP Inspector | 3001 (서버); 5173, 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) 에서 위 포트 변경 가능 | 해당 없음 |

## 피드백

이 템플릿에 대한 의견이나 제안이 있으면 [AI Toolkit GitHub 저장소](https://github.com/microsoft/vscode-ai-toolkit/issues)에 이슈를 등록해 주세요.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 노력하고 있으나, 자동 번역에는 오류나 부정확한 부분이 포함될 수 있음을 유의하시기 바랍니다. 원본 문서는 해당 언어로 작성된 원문이 권위 있는 출처로 간주되어야 합니다. 중요한 정보의 경우 전문적인 인간 번역을 권장합니다. 본 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해서는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->