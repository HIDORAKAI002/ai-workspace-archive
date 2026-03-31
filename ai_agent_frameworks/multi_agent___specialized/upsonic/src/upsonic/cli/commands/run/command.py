import asyncio
import importlib.util
import inspect
import sys
from pathlib import Path
from typing import Any, Callable, Optional

from upsonic.cli.commands.shared.config import load_config
from upsonic.cli.commands.shared.fastapi_imports import get_fastapi_imports
from upsonic.cli.commands.shared.openapi import modify_openapi_schema


def _is_interface_mode(source_path: Path) -> bool:
    """
    Determine if the entrypoint file is an interface project.

    Performs a static source-level check for InterfaceManager usage.
    This avoids executing user code for detection and has no side effects.

    Args:
        source_path: Path to the entrypoint Python file.

    Returns:
        True if the file contains InterfaceManager usage, False otherwise.
    """
    try:
        source: str = source_path.read_text(encoding="utf-8")
        return "InterfaceManager" in source
    except Exception:
        return False


def _resolve_interface_manager(main_func: Callable[..., Any]) -> Optional[object]:
    """
    Call the main function with empty inputs to obtain an InterfaceManager.

    For interface projects, main() creates and returns an InterfaceManager instance.
    If main() raises or returns a non-InterfaceManager value, returns None.

    Args:
        main_func: The async main function from the loaded entrypoint module.

    Returns:
        The InterfaceManager instance if main() returned one, None otherwise.
    """
    try:
        if inspect.iscoroutinefunction(main_func):
            result: Any = asyncio.run(main_func({}))
        else:
            result = main_func({})
    except Exception:
        return None

    try:
        from upsonic.interfaces.manager import InterfaceManager
        if isinstance(result, InterfaceManager):
            return result
    except ImportError:
        pass

    return None


def run_command(host: str = "0.0.0.0", port: int = 8000) -> int:
    """
    Run the agent as a FastAPI server or as an InterfaceManager server.

    Loads the entrypoint module specified in upsonic_configs.json and:
    1. If main() returns an InterfaceManager, starts it with serve().
    2. Otherwise, dynamically builds a FastAPI app with OpenAPI from config schemas.
    """
    try:
        from upsonic.cli.printer import (
            print_config_not_found,
            print_error,
            print_success,
            print_info,
        )

        current_dir: Path = Path.cwd()
        config_json_path: Path = current_dir / "upsonic_configs.json"

        if not config_json_path.exists():
            print_config_not_found()
            return 1

        config_data: Optional[dict[str, Any]] = load_config(config_json_path)
        if config_data is None:
            print_error("Invalid JSON in upsonic_configs.json")
            return 1

        agent_name: str = config_data.get("agent_name", "Upsonic Agent")
        description: str = config_data.get("description", "An Upsonic AI agent")

        entrypoints: dict[str, Any] = config_data.get("entrypoints", {})
        agent_py_file: Optional[str] = entrypoints.get("api_file")

        if not agent_py_file:
            print_error("entrypoints.api_file not found in upsonic_configs.json")
            return 1

        agent_py_path: Path = current_dir / agent_py_file
        if not agent_py_path.exists():
            print_error(f"Agent file not found: {agent_py_path}")
            return 1

        agent_dir: Path = agent_py_path.parent.absolute()
        project_root: Path = current_dir.absolute()

        agent_dir_str: str = str(agent_dir)
        if agent_dir_str not in sys.path:
            sys.path.insert(0, agent_dir_str)

        project_root_str: str = str(project_root)
        if project_root_str not in sys.path:
            sys.path.insert(0, project_root_str)

        module_package: Optional[str] = None
        try:
            relative_path = agent_py_path.relative_to(project_root)
            package_parts = relative_path.parts[:-1]
            module_package = ".".join(package_parts) if package_parts else None
        except ValueError:
            module_package = None

        spec = importlib.util.spec_from_file_location("main", agent_py_path)
        if spec is None or spec.loader is None:
            print_error(f"Failed to load agent module from {agent_py_path}")
            return 1

        agent_module = importlib.util.module_from_spec(spec)

        if module_package:
            agent_module.__package__ = module_package
        else:
            agent_module.__package__ = ""

        agent_module.__name__ = "main"
        sys.modules["main"] = agent_module

        spec.loader.exec_module(agent_module)

        # Require main function in the entrypoint
        if not hasattr(agent_module, "main"):
            print_error(f"main function not found in {agent_py_file}")
            return 1

        main_func: Callable[..., Any] = agent_module.main

        # Detect interface mode: static source check then call main()
        if _is_interface_mode(agent_py_path):
            interface_manager = _resolve_interface_manager(main_func)
            if interface_manager is not None:
                interface_names: str = ", ".join(
                    iface.get_name() for iface in interface_manager.interfaces
                )
                print_success(f"Interface detected! Starting {agent_name} with InterfaceManager...")
                print_info(f"Interfaces: {interface_names}")
                display_host: str = "localhost" if host == "0.0.0.0" else host
                print_info(f"Server will be available at http://{display_host}:{port}")
                print_info("Press CTRL+C to stop the server")
                print()

                try:
                    interface_manager.serve(host=host, port=port)
                except KeyboardInterrupt:
                    print()
                    print_info("Server stopped by user")

                return 0

        # Default API mode — requires FastAPI
        fastapi_imports = get_fastapi_imports()
        if fastapi_imports is None:
            print_error("FastAPI dependencies not found. Please run: upsonic install")
            return 1

        FastAPI = fastapi_imports["FastAPI"]
        JSONResponse = fastapi_imports["JSONResponse"]
        uvicorn = fastapi_imports["uvicorn"]
        request_fastapi = fastapi_imports["Request"]

        input_schema_dict: dict[str, Any] = config_data.get("input_schema", {}).get("inputs", {}) or {}
        inputs_schema: list[dict[str, Any]] = []
        for field_name, field_config in input_schema_dict.items():
            inputs_schema.append({
                "name": field_name,
                "type": field_config.get("type", "string"),
                "required": bool(field_config.get("required", False)),
                "default": field_config.get("default"),
                "description": field_config.get("description", "") or "",
            })

        output_schema_dict: dict[str, Any] = config_data.get("output_schema", {}) or {}

        app = FastAPI(title=f"{agent_name} - Upsonic", description=description, version="0.1.0")

        @app.post("/call", summary="Call Main", operation_id="call_main_call_post", tags=["jobs"])
        async def call_endpoint_unified(request: request_fastapi):
            """
            Unified endpoint - accepts BOTH:
            - multipart/form-data (for forms and files)
            - application/json (for JSON APIs)
            """
            try:
                content_type: str = request.headers.get("content-type", "").lower()

                if "application/json" in content_type:
                    inputs = await request.json()
                elif "multipart/form-data" in content_type:
                    form_data = await request.form()
                    inputs = {}
                    for key, value in form_data.items():
                        if value is None:
                            continue
                        if hasattr(value, "read"):
                            try:
                                inputs[key] = await value.read()
                            except Exception:
                                inputs[key] = None
                        else:
                            inputs[key] = value
                else:
                    form_data = await request.form()
                    inputs = {k: v for k, v in form_data.items() if v is not None}

                if inspect.iscoroutinefunction(main_func):
                    result = await main_func(inputs)
                else:
                    result = main_func(inputs)
                return JSONResponse(content=result)

            except Exception as e:
                return JSONResponse(
                    status_code=500,
                    content={"error": str(e), "type": type(e).__name__},
                )

        original_openapi = app.openapi

        def custom_openapi():
            if app.openapi_schema:
                return app.openapi_schema
            schema = original_openapi()
            schema = modify_openapi_schema(schema, inputs_schema, output_schema_dict, "/call")
            app.openapi_schema = schema
            return app.openapi_schema

        app.openapi = custom_openapi

        print_success(f"Starting {agent_name} server...")
        display_host = "localhost" if host == "0.0.0.0" else host
        print_info(f"Server will be available at http://{display_host}:{port}")
        print_info(f"API documentation: http://{display_host}:{port}/docs")
        print_info("Press CTRL+C to stop the server")
        print()

        try:
            uvicorn.run(app, host=host, port=port, log_level="info")
        except KeyboardInterrupt:
            from upsonic.cli.printer import print_info
            print()
            print_info("Server stopped by user")

        return 0

    except KeyboardInterrupt:
        from upsonic.cli.printer import print_info
        print()
        print_info("Server stopped by user")
        return 0
    except Exception as e:
        from upsonic.cli.printer import print_error
        print_error(f"An error occurred: {str(e)}")
        import traceback
        traceback.print_exc()
        return 1
